---
title: "ERDDAP™ - Changes"
---
# ERDDAP™Änderungen

ERDDAP™ist ein großes Beispiel[Benutzergetriebene Innovation](https://en.wikipedia.org/wiki/User_innovation), wo Produktinnovation oft von den Verbrauchern kommt (ERDDAP™Benutzer) , nicht nur die Erzeuger (ERDDAP™Entwickler) . Im Laufe der Jahre, die meisten Ideen für neue Features und Änderungen inERDDAP™haben von den Benutzern kommen. Diese Benutzer werden unten für ihre großen Ideen gutgeschrieben. Danke&#33; Bitte halten Sie diese großen Vorschläge kommen&#33;

Hier sind die Änderungen, die jederERDDAP™Veröffentlichung.

## Version 2.27.0{#version-2270} 
 (veröffentlicht 2025-06-11) 

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    * Neue Daten zum Colorbar-Konverter auf Servern bei /erddap/convert/color.html

*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * Default behavoir ist, dass der Cache jetzt unabhängig von der großen Lastdatensätze Aufgabe gelöscht wird. Dies ermöglicht eine zuverlässigere und regelmäßige Clearing von alten Cache-Dateien. Es gibt zusätzliche Arbeit, um Server-Behavoir zu verbessern, wenn niedrig auf Festplattenspeicherplatz (Rückgabe eines Fehlers für Anfragen, die den Server möglicherweise aus dem Raum ausführen, und das Löschen des Caches häufiger unter niedrigen Festplattenbedingungen, um Fehler zu verhindern) . Indatasets.xml  (oder Setup.xml) Sie können den neuen Cache hinzufügen/einfügen ClearMinutes-Parameter, um zu steuern, wie häufig der Server überprüft, um den Cache zu löschen. Hinweis, der vorhandene Parameter cacheMinutes steuert das Alter der zu haltenden Dateien, den neuen Cache ClearMinutes ist, wie oft eine Chache klar zu machen.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
Sie können die neuen Cache klare Kontrollen deaktivieren, indem TaskCacheClear auf false in setup.xml, obwohl das nicht empfohlen wird.
Cache ClearMinutes ist auch in der[Datensätze Dokumentation](/docs/server-admin/datasets#cacheclearminutes).
    
    * Lokalisierte Datensatz-Metadatenunterstützung. Es unterstützt die Lokalisierung von Werten in einemaddAttributesAbschnitt. Fügen Sie einfach ein Attribut mit dem zusätzlichen xml:lang-Tag hinzu. Zum Beispiel einen französischen Titel zu einem Datensatz hinzufügenaddAttributesAbschnitt würde beinhalten:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
Weitere Details in der[lokalisierte Metadatendokumentation](/docs/server-admin/localized-metadata).

    * Neues Docker Erfassen Sie die Datei mit Optionen für SSL und einen Barebones Prometheus Server. Dank Shane St. Savage für die SSL und Jiahui Hu für die Prometheus.

    * Unterstützung für die Verwendung von Informationen in den Headern, um die Server-URL zu bestimmen, anstatt sich auf die config-Datei zu verlassen. Auf diese Weise kann ein Server mit mehreren Namen aufgerufen werden und bestimmte Konfigurationen vereinfachen. Bitte aktivieren Sie es und senden Sie Feedback.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * Einige kleine Änderungen, Fehlerbehebungen und Optimierungen.

*    **FürERDDAP™Entwickler:** 
    * Refactor, wie Ausgabedateitypen in Code definiert sind. Dies sollte es so machen, dass Dateitypen hinzugefügt werden können, ohne viele Code-Stellen berühren müssen.

## Version 2.26{#version-226} 
 (veröffentlicht 2025-03-31) 

*    **Für alle:** 
    * Großes Update auf unserer Dokumentationsseite: https://erddap.github.io/
 
Neben dem aktualisierten Erscheinungsbild gibt es eine verbesserte Navigation, Suche, Übersetzung und es sollte einfacher sein, weiter zu warten&#33;

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    * Abonnements undRSSUpdates sollten für Datensätze, die häufig von Dateiänderungen aktualisiert werden, zuverlässiger geschehen.

*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * Die Standardauslösung erfordert/unterstütztJavaVersion 21. Zurück in dieser Veröffentlichung ist in der Lage, eineJava17 kompatibel binär.

    * Neue Funktion, um die Informationen, die über Datensätze in der UI angezeigt werden, anzupassen. Wir erwarten, dass dies besonders nützlich ist, um Dinge wie Dataset Zitate hinzuzufügen. Für weitere Details können Sie die[neue Dokumentation](/docs/server-admin/display-info). Dank Ayush Singh für den Beitrag&#33;

    * Zusätzliche Prometheus Metriken. Der größte ist `http_request_duration_seconds`, die Anforderungs-Antwortzeiten nach unten durch: "request_type", "dataset_id", "dataset_type", "file_type", "lang_code", "status_code" umfasst
Dieses maschinenlesbare Format ermöglicht eine bessere Sammlung von Metriken, um zu verstehen, wie Benutzer den Server verwenden.

    * Neue Art, ISO19115 XML-Dateien zu generieren. Es verwendet Apache SIS und ist eine neue Option in dieser Veröffentlichung. Bitte aktivieren Sie es und senden Sie Feedback.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * Die UI wird nun einzelne Links für jeden URL in Feldern wieinfoUrlund Zusammenfassung.

    * Abonnements undRSSUpdates sollten bei Datensätzen, die häufig von Dateiänderungen aktualisiert werden, zuverlässiger geschehen. Wenn dies Probleme verursacht, erreichen Sie bitte auf GitHub und deaktivieren Sie die Funktionalität, indem Sie die untere Flagge zu Ihrem setup.xml hinzufügen.
NICHT EMPFEHLEN
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Subset-Variablen werden nicht mehr automatisch für den Datensatz Typ EDDTableFromNcCFFiles generiert. Wenn Sie sich auf das Verhalten verlassen, können Sie entweder (bevorzugte Lösung) fügen Sie diesubsetVariableszur Datensatzdefinition in Ihrerdatasets.xml, oder fügen Sie die untere Flagge zu Ihrem setup.xml. Wenn Sie das Bedürfnis haben, dies einzuschalten, kommen Sie bitte auf GitHub, damit wir Ihren Anwendungsfall besser unterstützen können.
NICHT EMPFEHLEN
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Der Server wird nun Dokumentationsanfragen umleiten (unter Downloads/ die Dokumentation, die migriert wurde) zur neuen Dokumentationsseite. Bei Bedarf können Sie dies mit einer Flagge in setup.xml deaktivieren:
NICHT EMPFEHLEN
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Einige kleine Änderungen und Fehlerbehebungen.

*    **FürERDDAP™Entwickler:** 
    * Mehr Codequalität Verbesserungen und tote Code-Reinigung. Dazu gehören kleinere Optimierungen, eine bessere Handhabung von verschließbaren Ressourcen und die Entfernung von langen veralteten Datentypen (wie Vector) .

    * Große Refactoring an EDStatic, um die meisten der config, Nachricht und metrischen Code auszuziehen. Es verkapselt auch die Initialisierung und Handhabung von Verzeichnispfaden besser (Diese letzten 2 müssen mehr getan werden.) 

    * Viele Fortschritte bei einem offiziell unterstützten Docker Image. Der Plan ist, nach demERDDAP™2.26 Release ist verfügbar.

## Version 2.25{#version-225} 
 (veröffentlicht 2024-10-31) 

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    * EDDTableFromFiles kann nun Abfragen mit nur abgeleiteten Ausgängen unterstützen (global, jexl Script oder Variablen) .
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * Version 2.25 erfordertJava21 oder neuer. Dies ist die LTS-Version und ist seit über einem Jahr erhältlich.
         
    * Der SharedWatchService ist jetzt der Standard. Wenn Sie es deaktivieren müssen, wenden Sie sich bitte an chris. john at noaa.gov, um mich wissen zu lassen, so kann ich es in zukünftigen Versionen verbessern und hinzufügen:
        &lt;nutzenSharedWatchService&gt;false&lt;/useSharedWatchService&gt; zu Ihrem setup.xml.
         
    * DieERDDAP™servlet startet nun beim Server-Start. Das bedeutet, dass Datensätze sofort geladen werden, anstatt zu warten, bis eine Anfrage gestellt wird.
         
    * Der removeMVRows-Parameter in EDDTableFromMultidimNcFiles wird nun einen Effekt haben. Die Einstellung auf false kann einige Abfragen erheblich beschleunigen, dies kann jedoch nicht für alle Datensätze geeignet sein. Für weitere Informationen siehe[Beschreibung des Parameters](/docs/server-admin/datasets#removemvrows).
         
    * Datensätze (EDDTableFromNcFiles undEDDGridVon NcFiles) Verwendung von zarr-Dateien werden nun unterstützt. Sie müssen "zarr" in der DateiNameRegex oder pathRegex enthalten. Siehe[zarr secion in den Datensätzen Dokumentation](/docs/server-admin/datasets#zarr)für weitere Details.
         
    * Neuer Datensatztyp, EDDTableFromParquetFiles wird nun unterstützt. Siehe[EDDTableFromParquetFiles secion in den Datensätzen Dokumentation](/docs/server-admin/datasets#eddtablefromparquetfiles)für weitere Details.
         
    *   [Prometheus Metriken](https://prometheus.io/)sind jetzt bei /erddap/metrics erhältlich.
         
    * Eine neue XML-Parser-Implementierung ist verfügbar. Dieser neue Parser ermöglicht die Verwendung von XInclude indatasets.xml. Dank Ayush Singh für die Funktion.
         
    * Neue Parameter indatasets.xmlum ungewöhnliche Aktivitäts-E-Mails zu kontrollieren. Ungewöhnliche Wirksamkeit FailPercent verfällt auf den alten Wert von 25%. Dank Ayush Singh für die Funktion.
         
    * Neuer Parameter in setup.xml, der kontrolliert, ob Datensatz-Ladefehler auf der status.html-Seite angezeigt werden. Es ist standardmäßig wahr, um Datensatzfehler auf der Statusseite zu deaktivieren, set showLoadErrorsOnStatusPage auf false:&lt;showLoadErrorsOnStatusPage&gt;false&lt;/showLoadErrorsOnStatusPage&gt;
         
    * Einige kleine Änderungen und Fehlerbehebungen.
         
*    **FürERDDAP™Entwickler:** 
    * Prüfung auf Einheit und Integration getrennt (langsam) Tests. Auch mehr Tests ermöglicht und Tests wurden weniger flaky gemacht.
         
    * Fehler in der Vergangenheit (einige Kontrollen noch behindert) und Spot Bugs durch Maven integriert.
         
    * Vollständige Codebasis formatiert, um die Google Style Guide.
         

## Version 2.24{#version-224} 
 (veröffentlicht 2024-06-07) 

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    * Neue Farbpalette EK80 für akustische Datensätze verfügbar. Danke an Rob Cermak.
         
    * Behebt ein Problem, bei dem EDDTableAggregateRows keine richtigen Reichweiten von allen Kindern gezeigt hat. Dank Marco Alba für den Fix- und Bugbericht.
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * TO DO: SECURITY CHANGE: Google Authentication könnte Änderungen an Ihrem CSP erfordern.
        
Konkret müssen Sie auch hinzufügen https://accounts.google.com/gsi/style zu stlye-src und https://accounts.google.com/gsi/ zu verbinden-src. Für den Skript-Src können Sie jetzt https://accounts.google.com/gsi/client.
 
        
Für weitere Informationen können Sie die[Google-Seite](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)über CSP-Konfiguration.
         
        
    * New Shared Watch Service. Dies ist eine neue Option, um Verzeichnisse für Updates zu sehen. Es hat für jedes Dateisystem anstelle eines Threads pro Datensatz einen Thread. Am wahrscheinlichsten wird dies die Anzahl der Fäden drastisch reduzieren, die für Veränderungen verwendet werden. Es bedeutet, dass alle Datensätze zusammen aktualisiert werden, anstatt jeder Datensatz mit einer eigenen Updatefrequenz. Wahrscheinlich wird dies häufigere Updates für die meisten Datensätze bedeuten.
        
Um dieses Add zu aktivieren&lt;nutzenSharedWatchService&gt;true&lt;/useSharedWatchService&gt; zu Ihrem setup.xml.
        
          
Bitte versuchen Sie das und melden Sie sich zurück, wie es für Sie funktioniert zu chris. john bei noaa.gov.
         
    * Fix für falsche Var-Namen in Protokollen. Dank Ayush Singh für die Reparatur.
         
    * Einige kleine Änderungen und Fehlerbehebungen.
         
*    **Verbesserungen fürERDDAP™Entwickler:** 
    * Unterstützung für die lokale Entwicklung mit Docker. Danke Matt Hopson und Roje.
         
    * Unterstützung für die lokale Entwicklung mithilfe von Jetty und Dokumentationsverbesserungen. Danke Micah Wengren.
         
    * Änderungen an Tests zur Reduzierung von Problemen über Plattform. Danke. Shane St. Savage.
         

## Version 2.23{#version-223} 
 (veröffentlicht 2023-02-27) 

Beachten Sie, dass diese Veröffentlichung von Bob Simons gemacht wurde, und zeigen, dass er während des Übergangs zu Chris John, seinem Nachfolger, immer noch um und aktiv ist. Bei dieser Veröffentlichung werden alle Codeänderungen von Chis John vorgenommen, sofern nicht anders angegeben.

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    *    (Keine)   
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * TO DO: SECURITY CHANGE: Google Authentication erfolgt nun über die neue Google Identity Services Bibliothek, die Teil von "Sign In with Google" ist. Googles Unterstützung für das alte "Google Sign In"-System wird 2023-03-31 eingestellt. Also, wenn Sie Google Authentication in IhremERDDAP™Installation, Sie müssen aktualisierenERDDAP™v2.23+ vorher. (Bob tut mir leid. Es ist Bobs Schuld.)   
         
    * VERBESSERT: NCCSV ist jetzt v1.2. Die Änderung ist, dass die Dateien jetzt UTF-8-codierte Dateien sind (sie/Sie waren aSCII) und so kann jetzt jedes Unicode-Zeichen enthalten, wie es ist, ohne kodieren als \\u_hhh_, obwohl das noch erlaubt ist.
Beim Schreiben von NCCSV-Dateien,ERDDAP™schreibt jetzt v1.2 Dateien.
        ERDDAP™wird immer noch NCCSV-Dateien lesen, die der v1.0 und v1.1 Spezifikation folgen.
Dank Pauline-Chauvet, n-a-t-e und thogar-computer für dies und die Tests zu tun, um sicherzustellen, dass verschiedene Tabellenkalkulation Programme können UTF-8 Dateien importieren. Dank Bob Simons für diesen Codewechsel.
         
    * NEU: Die status.html-Webseite hat nun eine Zeile in der Nähe von oben, die angibt, welcher Datensatz loadDatasets aktuell geladen und verwandte Statistiken, oder keine, wenn kein Datensatz geladen wird. Dies kann sehr hilfreich seinERDDAP™Administratoren versuchen herauszufinden, warum laden Datasets dauert so lange. Auch die nGridDatasets, nTableDatasets und nTotalDatasets zählen unten, die jetzt momentan sind (zuvor waren sie am Ende der letzten großen Last Datensätze) .
Diese Änderung ist für Roy Mendelssohn. Dank Bob Simons für diesen Codewechsel.
         
    * VERPROVED: Datensätze generieren Xml ändert sich nun an CF-1.10 (war CF-1.6) in den Attributen "Konventionen".
Dank Bob Simons für diesen Codewechsel.
         
    * Einige kleine Änderungen und Fehlerbehebungen.
         

## Artikel 2.22{#version-222} 
 (veröffentlicht 2022-12-08) 

Beachten Sie, dass diese Veröffentlichung von Bob Simons durchgeführt wurde und zeigen, dass er während des Übergangs zu seinem Nachfolger immer noch aktiv ist.

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    *    (Keine)   
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * Nichts.
         
    * SICHERHEIT BUG FIX: Es gab einen Cross Site Scripting-bezogenen Fehler in dem Code für die Sprachauswahl Dropdown. DankNOAASicherheitsscans, um das zu fangen. Dies zeigt, dassNOAASicherheit ist aktiv und routinemäßig auf der Suche nach Sicherheitsschwächen inERDDAP.
         
    * SICHERHEIT FIX: Die vielen Bibliotheken vonERDDAP™wurden, wie üblich, als Teil dieser Veröffentlichung aktualisiert. Diesmal wurde der PostgreSQL Treiber aktualisiert. (die einen Sicherheitsfehler hatte) bis 42.5.1.
         
    * VERBESSERT: Mehr kleine Änderungen anERDDAPDas Speichermanagementsystem sollte die Chance auf eine bestimmte Anforderung reduzieren, die aufgrund fehlender verfügbarer Speicher ausfällt.
         
    * Einige kleine Änderungen und Fehlerbehebungen.
         

## Artikel 2.21{#version-221} 
 (veröffentlicht 2022-10-09) 

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    *    (Keine)   
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * TO DO: FürJava17, Sie sollten nicht \\-d64 in JAVA\\_OPTS in setenv.bat oder setenv.sh verwenden. Also, wenn es da ist, entfernen Sie es bitte. Ich denke, dass 64 Bit Modus jetzt ausgewählt wird, wenn Sie eine 64-Bit-Version herunterladenJava. Danke an Sam Woodman.
         
    * BUG FIX: Manchmal versuchte das neue E-Mail-System zu oft einzuloggen, was Google E-Mail-Server verursachte, alle zukünftigen Protokolle in Versuchen abzulehnen. Nun, das E-Mail-System vermeidet diese und verwandte Probleme.
         

## Version 2.20{#version-220} 
 (veröffentlicht 2022-09-30) 

*    **Verwenden Sie v2.20 nicht. Es ist fehlerhaft.** Aber Administratoren müssen immer noch die TO DO-Elemente tun, die unten aufgeführt sind, wenn Sie auf v2.21+ upgraden.
     
*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    *    (Keine)   
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * IMPROVED: Wir haben das alte Speicherverwaltungssystem wieder aktiviert (Math2.ensureMemoryVerfügbar) und das neue Speichermanagementsystem modifiziert (EDStatic.shedThisRequest) besser damit zu arbeiten. Vgl.[Status](/docs/server-admin/additional-information#memory-status)für Details.
         
    * CHANGED: Der Standard für&lt;ipAddressMaxRequests&gt; indatasets.xmlwurde von 7 auf 15 erhöht. Es ist klar, dass einige legitimWMSKunden können mehr als 7 gleichzeitige Anfragen generieren.
         

## Version 2.19{#version-219} 
 (veröffentlicht 2022-09-01) 

*    **Verwenden Sie v2.19 nicht. Es ist fehlerhaft.** Aber Administratoren müssen immer noch die TO DO-Elemente tun, die unten aufgeführt sind, wenn Upgrade auf v2.20+.
     
*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    * NEU: Es gibt eine neue serverseitige Funktion,orderByDescending, das funktioniert wieorderBy, aber sortiert in absteigender Reihenfolge. Dank Adam Leadbetter.
         
    * IMPROVED: Jetzt, Graphen (aber keine Karten) erweitert wird, um den verfügbaren Raum auf der Leinwand zu füllen, d.h., Raum nicht von der Legende verwendet. Sie können hohe Grafiken, quadratische Grafiken oder breite Grafiken erhalten, indem Sie die &.size=_width_ addieren und manipulieren|_height_ Parameter (wobei Breite und Höhe die Größe der Leinwand angeben, in Pixeln) auf der Anfrage URL. (Dies ist keine Option auf der .graph Webseite. Sie müssen es manuell der URL hinzufügen.) Wenn Sie den &.size-Parameter nicht angeben, haben Anfragen für .smallPng, .png, .largePng, .smallPdf, .pdf und .large.pdf vorgegebene Canvas-Größen, so dass Ihr Diagramm erweitert wird, um den verfügbaren Raum zu füllen, aber wird in der Regel ungefähr quadratisch sein. Danke an Bob Fleming.
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * TO DO:ERDDAP™jetzt erfordertJava17 und der dazugehörige Tomcat 10. Sie müssen folgenERDDAP™Installationsanleitung (oder das Äquivalent z.B. für Docker) zu installierenJava17 und Tomcat 10 und kopieren Sie Ihre\\[Tomcat\\]/Content-Verzeichnis von Ihrer Tomcat 8-Installation in die neue\\[Tomcat\\]Verzeichnis. Es gibt keine anderen Änderungen, die Sie an IhreERDDAPInstallation im Zusammenhang mit dieser Änderung. Mit anderen Worten:ERDDAP™funktioniert wie vorher.
        
Vergessen Sie nicht, dieERDDAP-verwandte Änderungen an Tomcats Server.xml und context.xml beim Upgrade von Tomcat. Vgl.ERDDAP'[Installationsanweisungen von Tomcat](/docs/server-admin/deploy-install#tomcat).
        
Mein Eindruck vonJava17 ist, dass es mehr Verarbeitungsleistung und Speicher für langlaufende, größere Anwendungen wieERDDAP™, so funktioniert es etwas langsamer alsJava8 mit niedrigen Leistungsrechnern (z.B. 2 Kerne und minimaler RAM) und arbeitet etwas schneller alsJava8 mit höheren Leistungsrechnern (z.B. 4+ Kerne und reichlich RAM) . Wenn Sie schlechte Leistung sehen, verwenden Sie Programme wie Linux's[Kopf](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)um die Ressourcennutzung zu überprüfen und zu berücksichtigenERDDAP™mehr Ressourcen, insbesondere mehr Speicher. Die Erinnerung ist billig&#33; Die meisten Telefone haben mehr Prozessoren und Speicher als die Server, die einige von Ihnen verwenden, um zu laufenERDDAP&#33;
Danke an Erin Turnbull.
         
        
    * TO DO: Wenn SieERDDAP™auf Cassandra zuzugreifen, für Cassandra, müssen Sie die Version derJavadass du die Cassandra benutzt hast. Nur zu wechselnJava17 zum Laufen von Tomcat+ERDDAP.
         
    * TO DO: Empfohlen: Wenn die CPU Ihres Servers 4+ Kerne und 8+ GB RAM hat, sollten Sie diese Einstellungen in Ihren Einstellungen ändern.datasets.xmlDatei:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Wenn Ihr Server weniger Ressourcen hat, halten Sie sich an "1" für beide Einstellungen.
Die nThreads Systeme fürEDDGridVonFiles und EDDTable VonFiles wurden deutlich verbessert. Diese Veränderungen führten zu einer enormen Geschwindigkeitsverbesserung (z.B. 2X Beschleunigung, wenn nThreads auf 2 oder mehr eingestellt ist) für die anspruchsvollsten Anfragen (wenn eine große Anzahl von Dateien verarbeitet werden muss, um die Ergebnisse zu sammeln) . Einige verwandte Veränderungen von Chris John werden auch zu einer allgemeinen Beschleunigung während führenERDDAP. Der Code für diese Änderungen wurde von Chris John beigetragen. Danke. Chris&#33;
         
    * WARNING: hyphen indatasetID's werden abgeschrieben und nicht mehr unterstützt (obwohl technisch noch erlaubt) . Sie werden wahrscheinlich in der nächsten Veröffentlichung deaktiviert werden. Wenn Sie Bindestriche verwenden, wechseln Sie zu Unterstrichen jetzt, um Probleme zu vermeiden. Wenn Sie die Änderung jetzt machen, ist es mit Ihrer eigenen Geschwindigkeit. Wenn Sie bis zur nächsten Veröffentlichung warten, werden Sie in einer Panik sein und müssen damit an diesem Tag umgehen.
         
    * NEU: Jetzt, für.htmlTableDatenantworten, wenn die Daten in einer String-Zelle Daten enthalten:Bild/png;base64, gefolgt von einem base64 codierten .png-Bild,ERDDAP™wird ein Symbol anzeigen (so kann der Benutzer das Bild sehen, wenn sie darüber schweben) und Tasten, um den Text oder das Bild in der Zwischenablage zu speichern. Dank Marco Alba (wer hat den Code beigetragen) und Bob Simons (die sich leicht verändert haben) .
         
    * NEU: -doNotAddStandardNames
Wenn Sie \\-doNotAddStandardNames als Befehlszeilenparameter einschließen, wenn Sie ausführen Datensätze Xml, erzeugen Datensätze Xml wird nicht hinzugefügtstandard\\_namein deraddAttributesfür andere Variablen als Variablen, genannt Breite, Länge, Höhe, Tiefe oder Zeit (die offensichtlich sindstandard\\_nameS) . Dies kann nützlich sein, wenn Sie die Ausgabe aus der Erzeugung verwenden Datensätze Xml direkt inERDDAP™ohne die Ausgabe zu bearbeiten, weil Datensätze Xml erraten oftstandard\\_names falsch. (Beachten Sie, dass wir immer empfehlen, dass Sie die Ausgabe bearbeiten, bevor Sie sie inERDDAP.) Mit diesem Parameter werden andere kleinere verwandte Effekte haben, weil die erratenstandard\\_namehäufig für andere Zwecke verwendet wird, z.B. um ein neues zu schaffenlong\\_name, und die colorBar-Einstellungen zu erstellen. Danke an Kevin O'Brien.
         
    * NEU: Sie können jetzt setzen&lt;updateMaxEvents&gt;10&lt;/updateMaxEvents&gt; indatasets.xml  (mit den anderen Einstellungen in der Nähe von oben) um die maximale Anzahl von Dateiänderungen zu ändern (Standardeinstellungen) die vom updateEveryNMillis-System verarbeitet werden. Eine größere Zahl (100?) kann nützlich sein, wenn es sehr wichtig ist, dass der Datensatz immer aktuell gehalten wird. Siehe[updateMaxEvents Dokumentation](/docs/server-admin/datasets#updatemaxevents). Danke an John Maurer.
         
    * NEU: Unterstützung für global "real\\_time=wahr|false" String-Attribut.
Wenn das falsch ist (Der Standard) und wenn der Datensatz kein Update verwendet AllNMillis,ERDDAP™wird Antworten auf Anfragen für Dateitypen, in denen die gesamte Datei erstellt werden muss, bevorERDDAP™kann beginnen, die Antwort auf den Benutzer zu senden und sie für bis zu 15 Minuten wiederverwenden (z.B.,.nc, .png) .
Wenn dies auf true gesetzt wird oder der Datensatz das Update verwendet AllNMillis,ERDDAP™wird nie die Antwortdateien sperren und immer neu erstellte Dateien zurückgeben.
Danke an John Maurer.
         
    * NEU: E-Mails werden jetzt in einer separaten E-Mail geschicktThread. Dies macht das Laden von Datensätzen und anderen Aktionen, die E-Mails schneller generieren, weil loadDatasets nicht auf die zu sendende E-Mail warten muss, was manchmal eine lange Zeit dauert. Das neue System kann mehrere E-Mails pro E-Mail-Sitzung senden, wodurch die Anzahl der E-Mail-Server-Anmeldungen reduziert und das Risiko für diejenigen, die scheitern, weil sie zu häufig sind. Es gibt Statistiken für die E-Mail Lesen Sie auf der status.html Seite und Diagnose-Nachrichten in log.txt -- suchen Sie nach "emailThread". Beachten Sie, dass eine Tally von nEmailsPerSession=0, zeigt Probleme, d.h. eine E-Mail-Sitzung konnte keine E-Mails senden.
Danke an Bob Simons.
         
    * CHANGED: E-Mails werden jetzt mit etwas unterschiedlichem Code gesendet (wegenJava17 und die Änderung der E-Mail) . Wenn Sie Probleme haben, E-Mails zu senden, bitte E-Mailerd.data at noaa.gov.
         
    * NEU: Abonnement-Aktionen, die "touch" eine Remote-URL jetzt in einem separaten touchThread behandelt werden. Dies macht das Laden von Datensätzen und anderen Aktionen, die URLs schneller berühren, weil loadDatasets nicht warten muss, bis die Berührung abgeschlossen ist, was manchmal eine lange Zeit dauert. Es gibt Statistiken für die touchThread auf der status.html Seite und Diagnose-Nachrichten in log.txt -- suchen Sie nach "touchThread".
Danke an Bob Simons.
         
    * NEU: Auf der status.html-Seite gibt es in der "Major LoadDatasets Time Series" eine neue "shed"-Spalte, die die Anzahl der Anfragen angibt, die wegen der aktuellenERDDAP™Der Speichereinsatz war zu hoch. Anfragen, die vergossen werden, werden den HTTP-Statuscode 503 "Service Available" zurückgeben. Diese Anträge waren nicht unbedingt ein Problem. Sie kamen gerade zu einer geschäftigen Zeit an. Dies war Teil einer Revision, wieERDDAP™mit hoher Speichernutzung.
         
    * NEU: Auf Unix/Linux-Computern gibt es jetzt eine "OS Info"-Linie auf der status.html-Webseite mit aktuellen Betriebssysteminformationen einschließlich CPU-Last und Speichernutzung.
         
    * VERBESSERT: Jetzt, wennERDDAP™wird neu gestartet und quickRestart=true, EDDTableFromFiles-Datensätze werden Subset wiederverwenden.ncund deutlich.nc. Für einige Datensätze verringert dies die Zeit, um den Datensatz zu laden (z.B. 60 Sekunden bis 0,3s) . Zusammen mit der neuen E-MailThread und TaskThread (siehe oben) , dies sollte sehr beschleunigen NeustartERDDAP™für vieleERDDAP™Anlagen. Dank an Ben Adams und John Kerfoot.
         
    * VERÄNDERUNG: Zuvor Waisendatensätze (Datensätze, die inERDDAP™aber nichtdatasets.xml) wurden einfach auf den Status hingewiesen. html und in log.txt nach jedem großen ladenDatasets. Jetzt werden sie automatisch vonERDDAP™und auf status.html und log.txt angemerkt, und per E-Mail Alles zu. Wenn Sie also einen Datensatz entfernen möchtenERDDAP™, jetzt alles, was Sie zu tun haben, ist entfernen Sie sein Stück xml indatasets.xmlund es wird in den nächsten großen ladenDatasets entfernt. Danke an Bob Simons.
         
    * KNOWN BUG in netcdf-java v5.2 und v5.5.3: DieEDDGridVonThredds Katalogoption in GenerateDatasets Xml verwendet, um für THREDDS Kataloge zu arbeiten, die Referenzen auf Datensätze in entfernten THREDDS Katalogen enthalten. Jetzt nicht. Ich habe das Problem den netcdf-java Entwicklern gemeldet.
         
    * BUG FIX: Für Docker Benutzer Einstellung setup.xml Parameter überERDDAP\\__paramName_: für int und boolean Parameter (z.B. E-Mail SmtpPort) ,ERDDAP™war falsch auf der Suche nach nur _paramName_. Jetzt sucht es nach _ERDDAP\\_paramName_. Dank Alessandro De Donno.
         
    * ÄNDERUNG: DieERDDAP™Das Testsystem nutzt nun ein automatisiertes System, um zu überprüfen, ob neu erstellte Testbilder genau wie erwartet sind. Danke an Chris John für den Vorschlag und Bob Simons für die Umsetzung.
         

## Version 2.18{#version-218} 
 (veröffentlicht 2022-02-23) 

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    * EIN
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * BUG FIX:.ncDateien wurden unter Umständen nicht geschlossen. Jetzt sind sie es. Dank Marco Alba, Roland Schweitzer, John Maurer und anderen.
         

## Version 2.17{#version-217} 
 (veröffentlicht 2022-02-16) 

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    * BUG FIX: Nach Änderungen derorderBySystem vor ein paar Jahren, Tabledap's Make A Graph nicht richtig behandelt viele Fragen, die verwendetorderBy_Xxx_. Jetzt schon. Dank Maurice Libes.
         
    * CHANGE: Zuvor,ERDDAP™zurückgewiesene Anträge . transparent Png's, wenn die Breiten- und/oder Längenwerte teilweise oder vollständig außerhalb der Reichweite waren. (ERDDAP™GitHub Issues #19, gepostet von Rob Fuller -- danke für das posting that Rob) Jetzt gibt es transparente Pixel für alle außer Reichweitenbereiche des Bildes zurück. Dies ist für viele Client-Anwendungen nützlich. Die Codeänderungen, um diese Änderung zu machen, wurden vollständig von Chris John durchgeführt. Vielen Dank, Chris&#33;
         
    * CHANGE: Zuvor,ERDDAP™zurückgewiesene Gridap-Anforderungen, bei denen die Indexwerte für eine bestimmte Dimension\\[hoch: langsam\\]. Nun macht es diese Anträge gültig, indem die niedrigen und hohen Werte getauscht werden. Dies löst ein langjähriges Problem für Benutzer und für externe Programme wie xtracto, die die wenigen Datensätze verfolgen mussten, die Breitenwerte haben, die von hoch bis niedrig reichen, um Anfrage wie\\[ (50) : (20) \\]so dass die Anfrage im Indexraum\\[niedrig:hoch\\]. Vgl. https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Eine Anfrage wie\\[ (20) : (50) \\]für einen dieser Datensätze automatisch als\\[ (50) : (20) \\].
         
    * ÄNDERUNG: .esriAscii-Anfragen lösen nun ein Dialogfeld "Datei: Speichern als" im Browser des Benutzers aus. Dank Joel Van Noord.
         
    * BUG FIX: Nun, wenn die Längenvariable eines Kinderdatensatzes einesEDDGridLonPM180 oderEDDGridLon0360 Datensatz hat einevalid\\_minund/odervalid\\_maxAttribut, sie werden in derEDDGridLonPM180 oderEDDGridLon0360 Datensatz. Dank Roy Mendelssohn.
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * TO DO: Wenn du gesetzt hättest&lt;dataProviderFormActive&gt; zu falsch, um vorübergehend mit der XSS-Schwachstelle umzugehen, bitte setzen Sie es wieder auf wahr.
         
    * SECURITY BUG FIX: Behobene XSS Sicherheitslücke in Data Provider Form. Dank Genaro Contreras Gutiérrez.
         
    * BUG FIX: Als ein AWS S3 Dirctory mehr als 10000 Dateien hatte,ERDDAP™"Internal Error" warf. Das ist jetzt behoben. Dank Andy Ziegler.
         
    * BUG FIX:EDDGridSideBySide erlaubte es nicht, die VariablensourceNames in verschiedenen Kinderdatensätzen gleich sein. Jetzt schon. Danke an Joshua Stanford.
         

## Version 2.16{#version-216} 
 (veröffentlicht 2021-12-17) 

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    * ÄNDER/BUG FIXES: Zahlreiche kleine Änderungen des Übersetzungssystems dank Vorschlägen von sprachspezifischen Editoren. Dank Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian und Mike Smit.
         
    * ADDED einen richtigen Disclaimer und Zuschreibung für Google Translate, wie es von den Bedingungen von Google Translate verlangt. Auch, die&lt;html&gt; tag im HTML für jede Webseite identifiziert nun nicht-englische Webseiten als maschinell übersetzt. Danke an Mike Smit.
         
    * BUG FIX: Die Login-Webseiten arbeiten nun mit unterschiedlichen Spracheinstellungen richtig. Danke an Mike Smit.
         
    * NEUorderBySummenfilter. Und neue Check All and Uncheck Alle Tasten aufEDDGridSeite des Data Access Formulars. Dank des Codebeitrags von Marco Alba.
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * TO DO: Wenn Sie
        &lt;FrageMarkImageFile&gt;QuestionMark.jpg&lt;/questionMarkImageFile&gt;
in Ihrer setup.xml-Datei, Sie müssen entweder das ganze Tag entfernen (empfohlen, so dass die Standarddatei verwendet wird) oder zu ändern:
        &lt;FrageMarkImageFile&gt;QuestionMark.png&lt;/questionMarkImageFile&gt;
         
    * WANDEL: Nur so wissen Sie,[Adoptiv](https://adoptium.net/?variant=openjdk8)hat AdoptOpenJDK als Haupt/Empfohlene Quelle ersetztJava  (OpenJDK) .
         
    * CHANGE: Die Protokolldateien vonERDDAP™, GenerateDatasets Xml und DasDds sind jetzt UTF-8, nicht die Standard-Zeichen des Computers. Ich habe viel überprüft und einige Änderungen vorgenommen, um sicherzustellen, dassERDDAP™immer das richtige Zeichen beim Lesen oder Schreiben aller Arten von Dateien, und nicht mehr (in mehreren Fällen) basiert auf dem Standard-Zeichen des Computers. Dies korrigierte einige Fehler und zog so nah wie ich konnte, um das Ziel, UTF-8 für so viele Dateitypen wie möglich zu verwenden (z.B. .log, .xml, .html,.json,.jsonl,.ncKopf) . Beachten Sie, dass viele ältere Dateitypen erforderlich sind, um ISO-8859-1 zu verwenden (z.B.,OPeNDAP.das, .ddds, .csv,.tsv,.nc3.nccsv, .cpt) . Ich habe zuvor versucht, mit der CF-Gruppe und mitUnidataUnterstützung für UTF-8 in.nc3 Dateien; beide waren resistent.
         
    * NEU: Beim Herunterladen von Dateien von AWS S3,ERDDAP' s Cache VonUrl System inEDDGridVonFiles und EDDTable FromFiles nutzt nun den neuen AWS Transfer Manager, um Dateien über parallelisierte Stücke herunterzuladen. (also sehr schnell) . Der Zieldurchsatz wird auf 20 Gbps pro Datei eingestellt, so funktioniert dies gut mit allen AWS-Instanztypen, vor allem aber mit hervorragender "Networking Performance". Mit dieser VeränderungERDDAP' s Cache FromUrl-System bietet jetzt vergleichbare Geschwindigkeiten, um die Annäherung von Röntgenbildern von parallelisierten Downloads von vor-gekunketen Dateien, aber ohne die Notwendigkeit, die Quelldateien von.ncund.hdfin zerklüftete Röntgendateien. Tatsächlich,ERDDAP's System ist besser, wenn es eine spätere Anfrage von der gleichen Datei zu lesen, weilERDDAP™hat jetzt eine lokale Kopie der Datei. Unsere Gemeinschaft hat seit Jahren Standardisierung auf.ncund.hdfDateien. Jetzt müssen wir nicht, dass alles raus, um gute Leistung bei der Speicherung von Daten in AWS S3. Dank Rich Signell.
         
    * CHANGE: searchEngine=Lucene ist, für jetzt, deprecated. Es ist ein komplexes System, das oft Ergebnisse liefert, die sich geringfügig von dem wünschenswerteren Verhalten von searchEngine=original unterscheiden. Für fast alleERDDAP™Installationen, die Zeitersparnis von Lucene nicht die Unterschiede in den Ergebnissen ausgleichen. Bitte verwenden Sie searchEngine=original, wenn möglich. Wenn das Probleme verursacht, mailen Sie bitte Bob.
         
    * CHANGE: Die Lucene searchEngine verhält sich jetzt mehr wie die ursprüngliche SucheEngine. Es gibt keine Fälle mehr, in denen lucene denkt, dass ein Datensatz passt und originell nicht. Auch, lucene's Rankings jetzt gleich original's Rankings (weil das Original jetzt immer verwendet wird, um die Rankings zu berechnen) .
         
    * BUG FIX: Beginnend in einer kürzlich veröffentlichten,ERDDAP™hörte auf, mehr als die ersten 1000 Objekte in einem gegebenen AWS S3 Eimer zu sehen. Jetzt.ERDDAP™sieht wieder alle Objekte. Dank Andy Ziegler.
         
    * BUG FIX: Jetzt EDDTableAggregate Rows entfernt dieactual\\_rangeAttribut, wenn ein oder mehrere der Kinderdatensätze ihre Variablen nie kennen 'actual\\_range  (z.B. EDDTableFromDatabase) . Dank Erik Geletti.
         

## Version 2.15{#version-215} 
 (veröffentlicht 2021-11-19) 

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    *   ERDDAP™hat ein neues System, um die Sprache, die für alle Webseiten verwendet werden soll, anzugeben. WennERDDAP™Installation ist eingerichtet, um es zu verwenden, die Liste der Sprachen erscheint in der oberen rechten Ecke jeder Webseite.ERDDAP™URL's von vor, diese Version weiter zu arbeiten und immer wieder englische Inhalte, wie vorher.
        
Nicht alle Texte oder alle Webseiten wurden übersetzt. Es gab Zeitbeschränkungen für dieses Projekt, das verhinderte, dass Qi und Bob auf 100%.
        
Die offensichtliche Frage ist: Warum haben wir so viel Mühe in dies gesetzt, wenn Chrome wird übersetzen Webseiten auf-the-fly? Die Antwort ist: so bekommen wir viel mehr Kontrolle darüber, wie die Übersetzung erfolgt. Insbesondere gibt es viele Wörter, die nicht auf den Webseiten übersetzt werden sollten, z.B. die Titel und Zusammenfassungen von Datensätzen, die Namen von Variablen, Parametern, Einheiten und Organisationen. Ein Großteil des Übersetzungsaufwands war die Identifizierung von Wörtern und Phrasen, die nicht übersetzt werden sollten. Auch die maschinellen Übersetzungen neigten dazu, bestimmte Arten von HTML-Markup zu manipulieren. Mit der Übersetzung konnten wir dieses Problem minimieren.
        
Das Übersetzungsprojekt wurde von Qi Zeng durchgeführt (ein Google Summer of Code intern) und Bob Simons mit Googles Übersetzung Webservice. Es war ein großes Projekt. Danke. Qi&#33;
        
    * BUG FIX:ERDDAP™jetzt erlaubt ORCID ID X als letzte Ziffer zu haben. Dank Maurice Libes.
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * TO DO:
        
        * Sie müssen ein paar Änderungen im Zusammenhang mitERDDAP's neues System, um Benutzer die Sprache für Webseiten angeben zu lassen.
            * Auf der ersten Zeile Ihrer setup.xml unddatasets.xmlDateien, ändern sich zu: encoding="UTF-8" und ändern Sie die kodierung des Dokuments in Ihrem Texteditor, so dass es als UTF-8-Datei gespeichert wird. Datensätze generieren Xml nimmt nun an, dass diedatasets.xmlist eine UTF-8-Datei.
            * Programmierer, die kompilierenERDDAP: AlleERDDAP™.java-Dateien sollten standardmäßig als UTF-8-Dateien behandelt werden. Sie müssen möglicherweise "-codieren UTF-8" in die Java-Befehlszeile hinzufügen. (Ja.) 
            * Um dieses System zu aktivieren (stark empfohlen) in der&lt;startBodyHtml5&gt; tag, die Sie indatasets.xml, ändern Sie "&amp&#33;loginInfo" in "&amp&#33;loginInfo;|&amp; Sprache;" so dass die Liste der Sprachen erscheint in der oberen rechten Ecke jederERDDAP™Seite.
            *   ERDDAP™nur verwendet&lt;startBodyHtml5&gt; tag, die Sie indatasets.xmldie HTML-Inhalte für das Banner an der Spitze jedesERDDAP™Webseite, egal welche Sprache der Benutzer wählt. Wenn Sie diesen Tag ändern,
"&EasierAccessToScientificData;" statt "Ein einfacherer Zugang zu wissenschaftlichen Daten" und
"&BroughtToYouBy;" anstelle von "Brought to you by",ERDDAP™wird übersetzte Versionen dieser Phrasen im Banner verwenden.
            * Auch der neue Standard&lt;TheShortDescriptionHtml&gt; indatasets.xmlist
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
Die letzten 3 Inhaltszeilen sind Dinge, die mit übersetztem Text ersetzt werden. Wenn Sie einen von ihnen konvertieren (vor allem BesondersErddap;) oder alle von ihnen zum expliziten Text indatasets.xml  (die Priorität hat, wenn vorhanden) oder message.xml, wird dieser Text angezeigt, egal, welche Sprache der Benutzer wählt. Dies ist nicht perfekt, aber ich dachte, dass nur wenige Administratoren bearbeiten möchten&lt;theShortDescriptionHtml&gt; in 35 verschiedenen Dateien, um 35 verschiedene übersetzte Versionen dieses Tags zur Verfügung zu stellen.
        
          
         
    * ÄNDERUNG: Einige Fehler werden nun etwas anders behandelt und so kann die Tallye der "Failed Requests" auf status.html und in der Daily Report Email hinzugefügt werden. Diese Zahlen können also etwas größer sein als vorher.
         
    * BUG FIX: Datensätze generieren Xml fürEDDGridLon0360 undEDDGridLonPM180 schließt nun Quelldatensätze mitdatasetID=~".\\*\\_LonPM180" unddatasetID=~".\\*\\_Lon0360" bzw.
         

## Version 2.14{#version-214} 
 (veröffentlicht 2021-07-02) 

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    *    (keine)   
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * NEU:EDDGridLon0360, die einen gegitterten Datensatz mit Längenwerten &gt;=0 und&lt;=360 aus einem gitterierten Datensatz mit Längenwerten &gt;=-180 und&lt;= 180. Siehe[EDDGridLon0360 Dokumentation](/docs/server-admin/datasets#eddgridlon0360). Danke an Dale Robinson.
         
    * NEU:ERDDAP™Administratoren können nun jeden Wert in setup.xml über eine Umgebungsvariable namensERDDAP\\__valueName_ vor dem LaufenERDDAP. Zum Beispiel, verwendenERDDAP\\_baseUrl überwiegt die&lt;baseUrl&gt; Wert. Dies kann bei der Bereitstellung hilfreich seinERDDAP™mit einem Container, wie Sie Standardeinstellungen in setup.xml setzen können und dann spezielle Einstellungen über Umgebungsvariablen liefern. Wenn Sie geheime Informationen angebenERDDAP™über diese Methode überprüfen Sie sicher, ob die Informationen geheim bleiben.ERDDAP™nur liest die Umgebungsvariablen einmal pro Start, in der ersten Sekunde des Starts, so ist eine Möglichkeit, dies zu verwenden: setzen Sie die Umgebungsvariablen, startenERDDAP™, warte bisERDDAP™wird gestartet, dann die Umgebungsvariablen nicht mehr. Danke an Marc Portier.
         
    * VERBESSERT: Nun, wenn einige Dateien in einem EDDTableFrom... Dateien-Datensatz mit vielen Dateien haben einige sehr lange String-Werte, der Datensatz wird viel schneller laden und auf Anfragen viel schneller reagieren. Zuvor,ERDDAP™würde eine Menge Platz für die min und max String Werte in den Dateien zuordnen, die mit Dateiinformationen für solche Datensätze gespeichert werden. Die resultierende Datei war riesig, wodurch sie geschrieben und langsam gelesen wird. Danke an OBIS.
         
    * VERBESSERT: Jetzt,ERDDAP™eine bessere Aufgabe, ungewöhnliche und ungültige Zeichenfolgen in CSV-Dateien zu interpretieren. Danke an OBIS.
         
    * FIX: Nach einem Jahr Ärger mit Cassandra habe ich schließlich Cassandra erfolgreich installiert (V2) wieder und so konnte die Tests mit Cassandra v2. So kann ich jetzt sicherer sagen, dassERDDAP™arbeitet mit Cassandra v2 und v3. Danke an ONC.
         

## Version 2.12{#version-212} 
 (veröffentlicht 2021-05-14) 

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    * BUG FIX: Wenn Sie auf der Abonnement Blacklist sind, können Sie jetzt keine Liste Ihrer Abonnements anfordern.
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * TO DO: NEU: System, um die Fähigkeit von böswilligen Benutzern und übermäßig aggressive legitime Benutzer automatisch zu begrenzen, um eine große Anzahl von gleichzeitigen Anfragen zu machen, die Systemleistung für andere Benutzer abbauen würde. Es gibt 3 neue optionale Tags indatasets.xmldie Sie direkt nach&lt;graphBackgroundColor&gt;:
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Für weitere Informationen siehe[ipAddressMaxRequests](/docs/server-admin/datasets#ipaddressmaxrequests).ERDDAP™auch jetzt druckt die "Anzahl der einzigartigen Benutzer (seit Start) " auf der status.html-Seite.
Dank der Person in China angreifen meineERDDAP™Installation.
         
    * CHANGE zu Postgresql Fahrerverhalten: Als ich den Postgresql-Treiber aktualisierte, kamen die Spaltennamen in der von Postgresql und GenerateDatasetsXml generierten Tabellenliste wie bisher in allen Großbuchstaben zurück. Ich weiß nicht, ob das andere Dinge beeinflussen wird, da Datenbanken oft diese Namen für unempfindlich halten. Mein Testdatensatz funktioniert immer noch richtig. Aber wenn Ihr Datensatz damit nicht mehr funktioniertERDDAP™update, dies ist der mögliche Grund, zuerst zu verfolgen.
         
    * BUG FIX:ERDDAP™behandelt jetzt auch private AWS S3 Dateien richtig. Es gab andere verwandte Verbesserungen beim Umgang mit AWS S3 Dateien. Dank Michael Gangl und Dylan Pugh.
         
    * NEU:EDDGridVonNcFiles undEDDGridVon NcFiles Entpackt können jetzt Daten von "Strukturen" in.nc4 und.hdf4 Dateien. Um eine Variable zu identifizieren, die von einer Struktur stammt,&lt;sourceName&gt; muss das Format verwenden: _fullStructureName_|_memberName_, zum Beispiel group1/myStruct|myMember . Danke an NRL.
         
    * VERÄNDERUNG: Nun, wenn die aktuelle Speichernutzung plus diese Anfrage noch etwas hoch ist, Rastersätze nThreads für diese Anfrage an 1. SoERDDAP™speichert Speicher, wenn Speicher knapp ist. Dank der Person in China angreifen meineERDDAP™Installation.
         
    * NEUE System zur Überwachung der Anzahl der offenen Dateien (die Steckdosen und andere Dinge enthält, nicht nur Dateien) in Tomcat auf Linux-Computern. Wenn einige Dateien irrtümlich nie geschlossen werden, kann die Anzahl der offenen Dateien erhöhen, bis es das Maximum erlaubt überschreitet und viele wirklich schlechte Dinge passieren. Also jetzt auf Linux-Computern (die Informationen sind nicht für Windows verfügbar) :
        
        * Es gibt eine neue Spalte "Open Files" auf der rechten Seite der status.html-Webseite, die die Prozent der max-Dateien offen zeigt. Unter Windows zeigt es nur "?".
        * WannERDDAP™generiert diese Informationen am Ende jedes großen Datensatzes, es wird auf das Protokoll gedruckt. txt Datei:
openFileCount=_current_ von max=_max_ %=_percent_
        * Wenn der Prozentsatz &gt; 50 % beträgt, wird eine E-Mail an dieERDDAP™Administrator und E-Mail Alles An E-Mail-Adressen.
        
Um mehr herauszufinden, oder wenn Sie dieses Problem auf IhremERDDAP™, siehe[Zu viele offene Dateien](/docs/server-admin/additional-information#too-many-open-files).
Dank der Person in China angreifen meineERDDAP™Installation.
         
    * NEU: Ich habe eine Menge Überprüfung und Handhabung von "Zu vielen offenen Dateien" hinzugefügt, so dass die Aufgabe einfach aufhört und der Benutzer die Fehlermeldung sieht. Datendateien werden nicht mehr als schlecht markiert, wenn sie Ergebnisse in einem "Zu viele offene Dateien" Fehler lesen.
         
    * NEU\\[BigParentDirectory\\]/badFilesFlag Verzeichnis:
Wenn Sie eine Datei in diesem Verzeichnis mit einerdatasetIDals Dateiname (der Dateiinhalt spielt keine Rolle) ,ERDDAP™löscht die badFiles.ncDatei für diesen Datensatz (wenn) und den Datensatz ASAP neu laden. Diese UrsachenERDDAP™erneut versuchen, mit den Dateien vorher zu arbeiten (irrtümlich?) als schlecht markiert. Dank Marco Alba.
         
    * CHANGED: Beim Start, wenn einEDDGridVon...Files oder EDDTableFrom... Files dataset hat zunächst 0 Dateien in seiner Liste der bekannten gültigen Dateien (z.B. ein neuer Datensatz) , dannERDDAP™defers laden es und setzt eine Flagge, so dass es ASAP geladen wird, nachdem die wichtigsten ladenDatasets beendet ist. Dies beschleunigt das erste Startup, wenn es neue Datensätze gibt.
         
    * ÄNDERUNG: FileVisitorDNLS.testAWSS3 () und FileVisitorSubdir.testAWSS3 () ; jetzt verwenden Sie die AWS v2 (nicht v1) SDK. Also jetzt der GitERDDAP™Distribution enthält jetzt alle benötigten Dateien und Sie müssen nicht mehr manuell die massive v1 AWS SDK Jar-Datei hinzufügen.
         
    * ÄNDERUNG: Ich habe mit Maven umgeschaltet, um Abhängigkeiten zu erkennen/zu gewinnen (die .jar Dateien in /lib) . Die Änderung auf v2 des AWS SDK erforderte dies. Es wird für andere importierte Code in der Zukunft benötigt werden. Ein großer Dank an Kyle Wilcox, der die pom.xml, die er erstellt und verwendet, zur Verfügung stellte, die mehrere Probleme für mich gelöst.
         
    * CHANGED: Der Klassenpfad-Parameter (- cp) verwendet in GenerateDatasetXml, DasDds und anderen kleinen Programmen, die mitERDDAP™, und in der Beratung zu Programmierern ist jetzt viel einfacher und sollte sich nie wieder ändern, da es auf das Verzeichnis bezieht, nicht die einzelnen Dateien:
\\-cp Klassen;C:\\Programme\\\_tomcat\\lib\\servlet-api.jar;lib\\\\\*
         (oder ':' statt ';' für Linux und Macs) .
         (Ich hätte das vor Jahren tun sollen, als es eine Option wurde.)   
         
    * NEU: Datasets generieren Xml hat eine neue Dienstprogramm-Option: findenDuplicateTime, die durch eine Sammlung von gegitterten suchen wird.nc  (und verwandt) Dateien, um Dateien mit doppelten Zeitwerten zu finden. Vgl.[findenDuplicate Zeit](/docs/server-admin/datasets#findduplicatetime)  
         
    * NEU:datasets.xmlkann jetzt ein&lt;paletten&gt; tag, die die&lt;paletten&gt; tag Wert von messages.xml (oder revertiert auf den Nachrichten.xml-Wert, wenn er leer ist) . Damit können Sie die Liste der verfügbaren Paletten ändern, währendERDDAP™läuft. Auch, wenn Sie eine cptfiles Unterverzeichnis imERDDAP™Inhaltsverzeichnis,ERDDAP™alle \\*.cpt-Dateien in diesem Verzeichnis in das Verzeichnis kopieren\\[Tomcat\\]/webapps/erdap/WEB-INF/cptfiles Verzeichnis jedes MalERDDAP™beginnt. Mit diesen Änderungen können Sie Paletten hinzufügen und die Änderungen bestehen bleiben, wenn Sie eine neue Version installierenERDDAP. Siehe[Dokumentation der Paletten](/docs/server-admin/datasets#palettes)  
Dank Jennifer Sevadjian, Melanie Abecassis und vielleicht anderen CoastWatch Menschen.
         
    * ÄNDERUNG: [&lt;langsamDownTroubleMillis&gt;] (/docs/server-admin/datasets#slowdowntroublemillis) wird jetzt für alle fehlgeschlagenen Anträge verwendet, nicht nur ein paar Arten.
         
    * CHANGED: Der RunLoadDatasets Thread unterbricht nun den LoadDatasets Thread bei 3/4 LoadDatasets MaxMinutes, so gibt es mehr Zeit für LoadDatasets, um die Unterbrechung zu bemerken und zu verlassen. Dafür gibt es immer mehr Diagnosenachrichten.
         
    * VERÄNDERUNG von der alten Version von Lucene zu v8.7.0.
         
    * CHANGE: E-Mails gesendetERDDAP™jetzt mit einer festen Breite Schrift erscheinen.
         
    * CHANGE:EDDGridFromFiles erhält nun die Achsenwerte sowie Attribute von FIRST|LAST-Datei, wie in&lt;metadataFrom&gt;. Danke. (nicht) zu Ken Casey, et al.
         
    * ADDED-Unterstützung für die ungültigen Einheiten "degree\\_North" und "degree\\_East", die von den jüngsten Dateien falsch verwendet werden (seit 2020-10-01) in der AVHRR Pathfinder Version 5.3 L3-Collated (L3C) SST-Datensätze (nceiPH53sstd1day und nceiPH53sstn1day) .ERDDAP™kann sie nun auf gültige Einheiten standardisieren. Danke. (nicht) zu Ken Casey, et al.
         

## Artikel 2.11{#version-211} 
 (veröffentlicht 2020-12-04) 

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    * BUG FIX: OrderByMean warf eine NullPointerException, wenn eine Variable nur eine von \\_FillValue oder fehlende\\_ Wert definiert. Jetzt geht es richtig um die Situation. Dank Marco Alba.
         
    * BUG FIX: Es gab Probleme mit den ODV Textdateien erstellt vonERDDAP™in v2.10. Diese Probleme sind behoben. Danke an Shaun Bell.
         
    * BUG FIX: Nur inERDDAP™v2.10: Wenn die Lat-lon-Füllungen in der URL angegeben wurden, wurde die Begrenzungsbox nicht auf der Weltkarte gezeichnet. Jetzt ist es wieder. Danke an John Maurer.
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * BUG FIX: Nur inERDDAP™v2.10: Die Skriptdateien für ArchiveADataset, GenerateDatasets Xml und DasDds funktionierten nicht, weil sie nicht die Änderungen an dem Klassenpfad hatten, der mitERDDAP™v2.10. Jetzt tun sie es. Dank Marco Alba.
         
    * NEU: Indatasets.xml, you may now have the tag:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Derzeit, wenn wahr (oder wenn der Tag leer ist, oder wenn der Tag nicht in der Datei ist) , wenn die Anfrage eines Benutzers zu einer NullPointerException führt,ERDDAP™wird E-Mail an den Stackerd.data at noaa.gov  (dieERDDAP™Entwicklungsteam) . Dies sollte sicher und sicher sein, da keine vertraulichen Informationen (z.B. die AnfrageUrl) ist in der E-Mail enthalten. Dies sollte es ermöglichen, alle unsicheren, völlig unerwarteten Fehler zu fangen, die zu NullPointerExceptions führen. Ansonsten sieht der Benutzer die Ausnahmen, aber dieERDDAP™Wir wissen nicht, dass ein Problem behoben werden muss.
        
Es ist möglich, dass dieser Tag zu anderen, ähnlichen diagnostischen Informationen führen wird, die anerd.data at noaa.govin der Zukunft. Der Inhalt der E-Mail wird immer minimal und mit Fehlern verwandt sein, und nicht zum Beispiel Nutzungsinformationen. Dank Marco Alba.
         
        
    * CHANGED: Jetzt, häufig komprimierte Dateitypen (.bz2,.gz,.gzip,.tar,.tgz,.z,.zip) sind auch für Byte-Range-Anfragen verboten. Dies wird über&lt;ErweiterungenNoRangeRequests&gt; in message.xml.
         
    * KNOWN PROBLEM: Wie beiERDDAP™2.10,.ncml Dateien, die versuchen, ein Attribut zu ändern, ändern Sie das Attribut nicht. Dies ist ein bekannter Fehler in netcdf-java, den ich berichtet habe und sie sagen, wird in der nächsten Version von netcdf-java behoben werden.
         

## Version 2.10{#version-210} 
 (veröffentlicht 2020-11-05) 

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    * NEU: Das neue[Interpolation](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)Umsetzer interpoliert Werte aus den Werten eines netzgebundenen Datensatzes effizient. Als solche ist es besonders für Forscher geeignet, die mit Tierspurdaten arbeiten. Dieser Konverter nimmt eine Tabelle mit Breite, Länge und Zeitspalten (und vielleicht andere Spalten) und gibt eine Tabelle mit zusätzlichen Spalten mit interpolierten Werten zurück. So ist dies ähnlich dem beliebten[Xtractomatic](https://coastwatch.pfeg.noaa.gov/xtracto)Skript ursprünglich von Dave Foley erstellt, bietet aber den Vorteil der Verarbeitung bis zu 100 Punkte pro Anfrage. Dank Dave Foley und Jordan Watson (NMFS) .
         
    * IMPROVED: Erweiterte Suche ist jetzt streng für nicht-.html-Anfragen. Es wird jetzt Ausnahmen für Anträge werfen, die dauerhafte Fehler haben (z.B. Anfragen, bei denen minLat &gt; maxLat) oder vorübergehende Fehler (z.B. Anträge auf einstandard\\_namedas existiert nicht) . Für .html-Anfragen ist Advanced Search unverändert: Wie bei Google-Suches, wird es seine besten und stillen Fehler beheben oder ignorieren. Dank Rich Signell.
         
    * IMPROVED: Die Karte auf der Seite Erweiterte Suche ist jetzt größer (Sie müssen noch squintieren, aber weniger) und deutlich genauer (aber immer noch nicht perfekt) . Danke an John Maurer.
         
    * IMPROVED: Die "Draw Landmaske"-Einstellung auf Make A Graph Webseiten und die &.land=...-Einstellung in URLs, die eine Karte anfordern, unterstützt nun zwei weitere Optionen:
"outline" zieht nur die Landmask-Umriss, politische Grenzen, Seen und Flüsse.
"aus" zieht nichts.
Siehe[&.land=... Dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands).
Danke an John Maurer.
         
    * IMPROVED: Grafiken und Karten erstellt vonERDDAP™können nun drei neue Markertypen verwenden: Borderless Filled Square, Borderless Filled Circle, Borderless Filled Up Triangle. Der Code dafür wurde von Marco Alba von ETT / EMODnet Physics unterstützt. Dank Marco Alba.
         
    * NEU:"files"System unterstützt jetzt Antworten auf den Dateityp (.csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv, oder.xhtml.) , z.[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv).
Dank Kyle Wilcox.
         
    * VERBESSERT: Die URLs, die bei Verwendung eines Data Access Formulars generiert werden (.html) oder ein Make-A-Graph (.graph) Webseite jetzt richtig prozentual kodieren die Zeichen\\[und\\]. Dies macht die URLs ein wenig härter für den Menschen zu lesen, aber ist besser aus einem web-security-Standpunkt. Administratoren haben nun die Möglichkeit, entspanntQueryChars= '\\[\\]|' in der Tomcat Server.xml Datei (weniger sicher) oder (mehr sicher) .
Dank Antoine Queric, Dominic Fuller-Rowell und anderen.
         
    * NEU: Wenn eine Anfrage an einen EDDTable-Datensatz beinhaltet &add Variablen Ort (_attribute Name, Attribut Werte) ,ERDDAP™alle Variablen hinzufügen, die _attribute Name = Beitrag Value_ in die Liste der angeforderten Variablen.
Siehe[&gt; Variablen Wo die Dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere). Dank Aurelie Briand, et al.
         
    * ÄNDERN:ERDDAP™weigert nun Byte-Range-Anforderungen an /files/.ncoder.hdfDateien. Versuchen Sie nicht, mit der Fernbedienung zu verbinden.ncoder.hdfDateien, als wären sie lokale Dateien. Es ist schrecklich ineffizient und verursacht oft andere Probleme. Stattdessen:
        * Verwendung(OPeN)DAPClient-Software zu verbindenERDDAP'DAPDienstleistungen für diesen Datensatz (die /griddap/ odertabledap/ in der URL) . Das ist, wasDAPist für.
        * Verwenden Sie das Datenzugriffsformular des Datensatzes, um eine Teilmenge von Daten anzufordern.
        * Wenn Sie die gesamte Datei oder wiederholten Zugriff über einen langen Zeitraum benötigen, verwenden Siecurl,wget, oder Ihr Browser, um die gesamte Datei herunterzuladen, dann auf die Daten aus Ihrer lokalen Kopie der Datei zugreifen.
             
    * VERBESSERT: die .odv Txt Ausgabeoption wurde neu geschrieben, um die neue Version zu unterstützenODV .txtDateien und die korrekte Darstellung von Trajektorien, Zeitreihen und Profildaten zu unterstützen.
         
    * IMPROVED: Jetzt werden die Suchbegriffe in doppelten Zitaten als json string interpretiert, so dass sie \\ codierte Zeichen haben können. Dies ermöglicht es Ihnen unter anderem, nach einem genauen Match für ein Attribut zu suchen, z.B. "institution=NOAA\\n" passt nicht zu einem Datensatz mit Institution=NOAA NMFS. Danke an Dan Nowacki.
         
    * VERBESSERT: An zusätzlichen Orten, schwimmende Punktzahlen (besonders in Doppel umgewandelte Schwimmer) erscheint nun als etwas abgerundetere Version der Anzahl an zusätzlichen Stellen, z.B. ein zuvor als Doppel gezeigter Schwimmer wie 32.27998779296875, könnte nun als 32.28 erscheinen. Dank Kyle Wilcox.
         
    * BUG FIX: unsignierte ganze Audiodateien wurden leicht falsch gelesen. Jetzt werden sie richtig gelesen.
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * WARNING: Das erste Mal, dass Sie laufenERDDAP™v2.10, einige Datensätze basierend auf lokalen Datendateien laden **sehr** langsam, weilERDDAP™muss die Datenbank der Dateiinformationen neu erstellen. Nach der langsamen anfänglichen Nachladung laden sie schnell wie zuvor. Bitte geduldig sein.
         
    * Du musst es tun:
        * Wenn Sie zunächst v2.10 laufen, können einige Datensätze nicht laden, weilERDDAP™ist nun strenger über einige Metadaten. Wie vorher,ERDDAP™wird Ihnen einen Daily Report per E-Mail senden, wenn er zuerst geladen wird. Dazu gehören die Fehlermeldungen für jeden der Datensätze, die nicht geladen wurden. Lesen Sie die Fehlermeldungen, um die Probleme herauszufinden. In den meisten Fällen müssen Sie nur eine kleine Änderung der Metadaten des Datensatzes vornehmen, um das Problem zu lösen.
             
        * Indatasets.xml, suche nach&lt;sourceName&gt;= (merken, dass'='Zeichen, das eine[FestwertsourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) . Für die meistenERDDAP™Setups, die sind selten. Wenn eine der Werte nach'='sind Strings (nicht Zahlen) , Sie müssen jetzt den String in doppelte Zitate einschließen. Zum Beispiel
Vorher:&lt;sourceName&gt;=KZ401&lt;/sourceName&gt;
Nach:&lt;sourceName&gt;="KZ401"&lt;/sourceName&gt;
             
        * NEU: Es gibt eine neue optionale Einstellung in setup.xml,&lt;defaultAccessibleViaFiles&gt;, die den Standard festlegt&lt;zugänglichViaFiles&gt; für jeden der Datensätze. Der Standard für dieses neue Tag ist falsch, was die vorherigeERDDAP™Verhalten. Diese niedrigere Pegeleinstellung kann durch einen bestimmten Datensatz übersteuert werden&lt;zugänglichViaFiles&gt; Einstellung.
            
EMPFEHLUNGEN (weil es Benutzer gibt, die dies wollen) :
Wenn Sie alle EDD machen wollen... FromFiles-Datensätze über das Dateisystem zugänglich, dann
            
            1. Fügen Sie diesen Tag zu Ihrer setup.xml-Datei hinzu:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Optional) Alle entfernen
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
indatasets.xmlda der Standard jetzt wahr ist.
                 
        * \\_FillValue Attribute hinzufügen:
            ERDDAP™verwendet, um einen Standard \\_FillValue für alle Ganzzahlvariablen zu haben: den Maximalwert des Datentyps (z.B. 127 für Byte-Variablen) . Jetzt nicht. Um zu vermeiden, dass diese Werte als Datenwerte dargestellt werden (nicht fehlende Werte) , Sie müssen diese über \\_FillValue Attribute explizit angeben. Ab jetzt, jedes Mal, wenn Sie beginnenERDDAP™, es sendet dem Administrator eine E-Mail mit einer .csv-Tabelle mit einer Liste von ganzzahligen Quellvariablen, die nicht \\_FillValue odermissing\\_valueAttribute und die vorgeschlagenen neuen \\_FillValue Attribute. Vgl.[In den Warenkorb Wert Attribute](/docs/server-admin/datasets#add-_fillvalue-attributes)für weitere Informationen und Anweisungen.
             
        * Wenn Sie kompilierenERDDAP™, Sie müssen den Classpath-Parameter auf den Javac-Befehlszeilen ändern, um einen Verweis auf diese neuen jar 's hinzuzufügen: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar .
             
    * CHANGED: Tomcat 9 ist jetzt die empfohlene Version von Tomcat fürERDDAP. Die neueste Version von Tomcat 8.5+ ist jetzt auch in Ordnung. Wir haben aufgeräumtERDDAP'[Installationsanweisungen von Tomcat](/docs/server-admin/deploy-install#tomcat).
        
Die neueste Version vonJava8) (nichtJava9, 10, 11, ...) von[AdoptOpenJDK](https://adoptopenjdk.net/)bleibt die empfohlene VersionJavafürERDDAP.Java8 hat Long Term Support von AdoptOpenJDK, so dass es sicher zu bedienen ist, aber denken Sie daran, die neueste Version von ihm periodisch aus Sicherheitsgründen zu erhalten.
        
    * NEU: Script SourceNames / Abgeleitete Variablen in Tabular Datasets
EDDTableFromFiles, EDDTableFromDatabase und EDDTableFromFileNames-Datensätze können jetzt Ausdrücke und Skripte in densourceName. Damit können Sie neue Variablen basierend auf vorhandenen Variablen in den Quelldateien erstellen. Die Berechnung für eine bestimmte neue Variable erfolgt innerhalb einer Zeile der Ergebnisse, wiederholt für alle Zeilen. Zum Beispiel, um eine Längenvariable mit Werten im Bereich -180 - 180° von einer Größe mit Werten im Bereich 0 - 360° zu machen:
        &lt;sourceName&gt;=Math2.anglePM180 (Zeile.columnDouble ("lon") ) &lt;/sourceName&gt;
Für Details siehe[Script SourceNames](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
Danke an Bob Simons (die das vorher geplant habenERDDAP™v1.0 und endlich einen Weg gefunden, es umzusetzen) , Kevin O'Brien, Roland Schweitzer, John Maurer, und die Apache JEXL-Bibliothek für den wirklich harten Teil (und es gut machen) .
         
    * NEU: Nicht zugeordnete ganze Datentypen (ubyte, ushort, uint, ulong) werden unterstützt. Beachten Sie, dass viele Dateitypen (z.B. .das, .dds,.nc3) nicht alle diese neuen Datentypen unterstützen. Siehe[Daten Typdokumentation](/docs/server-admin/datasets#data-types)für Details wieERDDAP™sich mit diesen Unterschieden auseinandersetzt. Besonders, seit(OPeN)DAP, vor allem die .dds Antwort, unterstützt nicht unterzeichnete Bytes, Longs oder Ulongs, Sie können verwenden möchtenERDDAP's tabellarische Darstellung von .das und .das, wie in derhttp.../erdap/ **Informationen** /datasetID_.html Webseite (zum Beispiel,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) die Sie auch in anderen Dateitypen oder.nccsvAntwort von Metadaten (zum Beispiel,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) , die beide alle Datentypen in allen Situationen unterstützen.
        
WARNING: Für Datensätze, die von dieser Änderung betroffen sind, ist es möglich, dass Sie Probleme mit dem Datensatz sehen, weil die Daten, dieERDDAP™Auslesungen aus der Quelle können unterschiedlich sein (z.B. Variablen, die zuvor als signierte ganze Zahlen gelesen wurden, können nun als unsignierte ganze Zahlen gelesen werden) . Die daraus resultierenden Probleme beinhalten: neue Dateien, die nicht zum Datensatz hinzugefügt werden, und/oder Fehler, wenn Sie versuchen, auf die Daten zuzugreifen. Wenn ein Datensatz Probleme hat, ist das erste, was zu versuchen ist,[eine harte Flagge](/docs/server-admin/additional-information#hard-flag)für den Datensatz. Wenn das das Problem nicht löst, dann müssen Sie sich log ansehen. txt, um die Fehlermeldungen zu sehen, in diedatasets.xmlfür den Datensatz und/oder vielleicht rerun generierenDatasets.xml für den Datensatz.
Dank netcdf-java 5.x (die das Problem zwang) und die bevorstehende CF 1.9.
        
    * IMPROVED: Es gibt jetzt[bessere Dokumentation / Beratung](/docs/server-admin/datasets#s3-buckets)wie man einen Datensatz aus Dateien in AWS S3 Buckets erstellt. Danke an Micah Wengren.
         
    * ÄNDERUNG: Es gibt mehrere Änderungen im Zusammenhang mit dem"files"System.
        * Der Code, um dies zu handhaben, wurde neu geschrieben, um von mehr Klassen nutzbar zu sein.
             
        * NEU: Benutzeranfragen für Verzeichnislisten können nun anfordern, dass die Antwort eines der Standard-Einzeltabellentypen ist, indem Sie die gewünschte Dateierweiterung anwenden: .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv, oder.xhtml) Zum Beispiel
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
Dank Kyle Wilcox und Shane St Savage.
             
        * IMPROVED: Jetzt generieren Datensätze Xml enthält keine&lt;zugänglichViaFiles&gt; tag in der Ausgabe. Die Annahme ist, dass der Datensatz auf den Wert des neuen&lt;defaultAccessibleViaFiles&gt; tag in setup.xml. Vgl.[zugänglich ViaFis](/docs/server-admin/datasets#accessibleviafiles).
             
        * IMPROVED: Zusätzliche Datensätze unterstützen jetzt zugänglich ViaFiles:EDDGridSideBySide,EDDGridGesamtexistenteDimension,EDDGridAus Erddap, EDDTableFromErddap,EDDGridVonEDDTable, EDDTableFromEDDGrid, undEDDGridVon Etopo. Dazu werden die Dateien eines bestimmten Remote/Kind-Datensatzes nur dann zugänglich sein, wenn sowohl der Elternteil als auch der Fern-/Kind-Datensatz zugänglich sind. ViaFiles auf true gesetzt (perhaps via&lt;defaultAccessibleViaFiles&gt;). Dank Damian Smyth und Rob Fuller.
             
        * TO DO / EMPFEHLUNG: Wir empfehlen, alle relevanten Datensätze über das Dateisystem zugänglich zu machen, indem wir&lt;defaultAccessibleViaFiles&gt; to true in setup.xml weil es eine Gruppe von Benutzern gibt, für die dies der bevorzugte Weg ist, um die Daten zu erhalten. Unter anderem"files"system macht es für Benutzer leicht, zu sehen, welche Dateien zur Verfügung stehen und wann sie zuletzt geändert werden, so dass es für einen Benutzer leicht ist, seine eigene Kopie des gesamten Datensatzes zu erhalten. Wenn Sie im Allgemeinen keine Datensätze über das Dateisystem zugänglich machen möchten, setzen&lt;defaultAccessibleViaFiles&gt; auf false. In jedem Fall nur verwenden&lt;zugänglichViaFiles&gt; für die wenigen Datensätze, die Ausnahmen von der von&lt;defaultAccessibleViaFiles&gt; (zum Beispiel, wenn der Datensatz verwendet.ncml-Dateien, die für Benutzer nicht wirklich nützlich sind) .
             
    * IMPROVED: Wenn nun ein Quelldatensatz CF-Gitter\\_Mapping-Informationen hat, erzeugen Sie Datensätze Xml für Grid Datasets wird die Informationen zur globalen&lt;addAtts&gt;, und die Informationen werden global hinzugefügt&lt;sourceAtts&gt; Jedes Mal werden Daten aus der Datei gelesen. Die Informationen werden in den globalen Attributen des Datensatzes als eine Reihe von Attributen mit dem Präfix Grid\\_mapping\\_ angezeigt.
         
    * IMPROVED: Unterstützung von Gruppen beim Lesen.ncANHANG (und in gewissem Maße.hdf5.) Dateien. Generell eineERDDAP™Der Datensatz wird aus den Variablen in einer der Gruppen der Datei aufgebaut. Auch, GenerateDatasets Xml fürEDDGridVonNcFiles undEDDGridVon NcFiles Entpackt fragt jetzt nach einer "Gruppe" (z.B. "" für alle/alle Gruppen, "someGroup", "someGroup/someSubGroup", oder "\\[Wurzeln\\]"für nur die Wurzelgruppe) . Dank Charles Carleton und Jessica Hausman.
         
    * VERPROVED: Datensätze generieren Xml fürEDDGridVonNcFiles undEDDGridVon NcFiles Entpackt unterstützt nun einen optionalen "DimensionsCSV"-Parameter, mit dem Sie die Quellnamen der Dimensionen angeben können, die Sie diesen Datensatz verwenden möchten. Verwenden Sie "", um die Variablen, die die meisten Dimensionen verwenden, wie zuvor. Auch ein verwandter kleiner Fehler, der mit dieser Art von Datei aufgetreten ist, ist jetzt behoben. Danke an Sujal Manandhar.
         
    * BUG FIX: Datensätze generieren Xml listet jetzt richtig "EDDTableFromJsonlCSVFiles" auf (nicht "EDDTableFromJsonlCSV") als eine der EDDType Optionen. Dank Andy Ziegler.
         
    * VERBESSERT:EDDGridVon NcFiles Entpackt standardisiert jetzt "Einheiten" Attribute auf Standard-/"kanonische" Euter (das gleiche Verfahren wie der Units-Wandler) . Zum Beispiel"meter per second","meters/second","m.s^-1", und"m s-1"alle werden"m s-1". Dank Andy Ziegler.
        
WARNING: Es ist möglich, dass dies Probleme für einige bestehende Datensätze verursacht (z.B. dazu führen, dass neue Dateien mit "schlecht" gekennzeichnet werden) . Wenn ja,[eine harte Flagge](/docs/server-admin/additional-information#hard-flag)für den Datensatz, so dass alle Quelldateien mit dem neuen System wieder gelesen werden.
        
    * IMPROVED: Jetzt eine Variable&lt;sourceName&gt; kann einen festen Wert von =NaN angeben und die Variable kann eineactual\\_rangeAttribut, das einen endlichen Bereich angibt. Dies ist manchmal nützlich, so dass ein Datensatz (insbesondere ein EDDTableFromFileNames-Datensatz) kann Dummy Variable (S)   (z.B. Breite, Länge, Zeit) mit festen Werten von NaN, jedoch mit einem gültigenactual\\_range  (wie durch das Attribut festgelegt) . Dann, in Advanced Search kann ein Benutzer nach Datensätzen suchen, die Daten in einem bestimmten Breiten-, Längen-, Zeitbereich haben und dieser Datensatz wird sagen können, dass es relevante Daten hat (obwohl alle tatsächlichen Datenreihen NaN zeigen) . Siehe[Festwertdokumentation](/docs/server-admin/datasets#fixed-value-sourcenames).
Dank Mathew Biddle.
         
    * NEU: Jetzt, diedatasets.xmlchunk für einen EDDTableFromAsciiFiles oder EDDTableFromColumnarAsciiFiles Datensatz kann einen Tag umfassen, der sagt,ERDDAP™ignorieren alle Zeilen an der Spitze der Datei bis und einschließlich der Zeile, die dem angegebenen regulären Ausdruck entspricht. Zum Beispiel
        &lt;Über uns\\*\\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*END DER HEADER.\\*&lt;/SkipHeaderToRegex&gt;
ignoriert alle Zeilen bis und einschließlich einer Zeile, die mit "\\*\\*\\* END DER HEADER". Siehe die [&lt;skipHeaderToRegex&gt; Dokumentation] (/docs/server-admin/datasets#skipheadertoregex) .
Danke an Eli Hunter
         
    * NEU: Jetzt, diedatasets.xmlchunk für ein EDDTableFromAsciiFiles oder EDDTableFromColumnarAsciiFilesdataset kann einen Tag umfassen, der sagt,ERDDAP™alle Zeilen in der Datei zu ignorieren, die dem angegebenen regulären Ausdruck entsprechen. Zum Beispiel
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

wird alle Linien überspringen, die mit "#" beginnen. Siehe die [&lt;skipLinesRegex&gt; Dokumentation] (/docs/server-admin/datasets#skiplinesregex) .
Danke an Eli Hunter.
         
    * NEU: Diedatasets.xmlchunk für jeden EDDTable Datensatz kann jetzt enthalten &add Variablen Ort (_attributeNamesCSV_) . Wenn es das tut,ERDDAP™wird ein Widget für jedes der angegebenen Attribute hinzufügen Namen des Data Access Formulars des Datensatzes (.html Webseite) um es Benutzern zu erleichtern, hinzufügen &add Variablen Ort (_attribute Name, Attribut Werte) auf die Anfrage.
Siehe[&gt; Variablen Wo die Dokumentation](/docs/server-admin/datasets#addvariableswhere).
Dank Aurelie Briand, et al.
         
    * NEU Drittanbieter-Tool:ERDDAP- Lint
        ERDDAP-lint ist ein Programm von Rob Fuller und Adam Leadbetter des Irish Marine Institute, das Sie verwenden können, um die Metadaten IhrerERDDAP™Datensätze.ERDDAP-lint "enthält Regeln und eine einfache statische Web-Anwendung für die Durchführung einiger Überprüfungstests gegen IhreERDDAP™Server. Alle Tests werden im Webbrowser durchgeführt." Wie die[Unix/Linux Lint Tool](https://en.wikipedia.org/wiki/Lint_(software)), Sie können die bestehenden Regeln bearbeiten oder neue Regeln hinzufügen. Vgl.[ERDDAP- Lint](https://github.com/IrishMarineInstitute/erddap-lint)für weitere Informationen.
        
Dieses Tool ist besonders nützlich für Datensätze, die Sie vor einiger Zeit erstellt haben und jetzt mit Ihren aktuellen Metadatenpräferenzen aktualisiert werden wollen. Zum Beispiel frühe Versionen von GenerateDatasets Xml hat sich nicht darum bemüht, weltweit zu schaffencreator\\_name,creator\\_email, creator\\_type odercreator\\_urlMetadaten. Sie könnten benutzenERDDAP-die Datensätze zu identifizieren, die diesen Metadaten-Attributen fehlen.
        
Dank Rob und Adam für die Erstellung dieses Tools und die BereitstellungERDDAP™Gemeinschaft.
        
    * NEU: Jetzt ist es okay, wenn einige der Dateien in einemEDDGridFromFiles dataset hat nicht alle Variablen des Datensatzes. Die Dateien werden enthalten, als hätten sie die Variablen (mit allen fehlenden Werten) .
Dank Dale Robinson und Doug Latornell.
         
    * NEU: Es gibt neue Nutzungsstatistiken in der Log-Datei und im Daily Report, um Administratoren zu helfen, die Benutzer zu identifizieren, die Speicherprobleme verursachen. Die Statistiken werden "OutOfMemory" genannt (Array Größe) "OutOfMemory (Zu groß) ", und "OutOfMemory (Zu groß) ". Sie zeigen die IP-Adressen der Nutzer, die in diesen Kategorien Anfragen gestellt haben, und die Anzahl der von ihnen gestellten Anfragen. Wenn es keine beunruhigenden Anträge gab, werden diese Statistiken nicht angezeigt. "Außenansicht (Array Größe) " und "OutOfMemory (Zu groß) " Anträge sind in der Regel kein Problem, weil die Anträge so groß waren, dassERDDAP™schnell erwischt und eine Fehlermeldung zurückgegeben. Das "OutOfMemory (Zu groß) " Anträge sind gefährlicher, weilERDDAP™machte einige Mühe, bevor es erkannte, es gab nicht genug Speicher zur Verfügung, um die Anfrage zu handhaben (obwohl das Problem unmittelbar vor diesen Anträgen andere Anfragen sein kann) .
        
Es gibt auch neue Statistiken namens "Large Request, IP-Adresse", die die IP-Adressen der Benutzer, die große Anfragen gemacht (aktuell, gerastet.ncWaren &gt; 1GB) .
        
Auch die Zeitreihentabelle auf der status.html Seite enthält jetzt eine "memFail" Spalte, die die Anzahl der Anfragen zeigt, die mit "OutOfMemory gescheitert sind. (Zu groß) " Fehler seit den letzten großen Load Datasets. Jede andere Zahl als 0 ist hier zumindest ein Grund zur Sorge.
Danke an Bob Simons.
        
    * NEU: Die neue Version vonHyraxzeigt Verzeichnislisten anders als zuvor an.ERDDAP™kann nun die alten und neuen Verzeichnislisten lesen.
         
    * NEU: Datensatz-Reloads und Nutzer-Antworten, die &gt;10 Sekunden dauern, bis Sie fertig sind (erfolgreich oder erfolglos) sind mit " gekennzeichnet (10er&#33;) ". So können Sie die log.txt-Datei für diesen Satz suchen, um die Datensätze zu finden, die langsam zu laden waren oder die Anforderungsnummer der Anfragen, die langsam zu beenden waren. Sie können dann in der log.txt-Datei höher aussehen, um zu sehen, was das dataset Problem war oder was die Benutzeranfrage war und von wem es war. Diese langsamen Datensatzbelastungen und Benutzerwünsche besteuern sich manchmal aufERDDAP. Damit Sie mehr über diese Anfragen wissen, können Sie helfen, Probleme zu identifizieren und zu lösen.
    * VERBESSERT: Bei der Validierung eines CF DSG-Datensatzes,ERDDAP™stellt nun sicher, dass Variablen mit cf\\_role-Attributen in der entsprechenden cdm\\_...\\_variables-Liste sind und nicht in anderen cdm\\_...\\_variables-Listen sind. Wenn zum Beispiel ein TimeseriesProfile-Datensatz eine "station\\_id"-Variable hat, die das cf\\_role=timeseries\\_id-Attribut hat, dann muss "station\\_id" in der cf\\_timeseries\\_variables-Liste sein, muss aber nicht in der cf\\_profile\\_variables-Liste sein.
Danke an Micah Wengren.
         
    * VERBESSERT: 'Simplify' ist jetzt schneller, verwendet weniger Speicher und kann LongArray zurückgeben. DankUnidata.
         
    * IMPROVED: QuickRestart ist jetzt deutlich schneller für EDDTableFrom (nc-bezogen) Dateien (außer EDDTableFromNcCFFiles und EDDTableFromInvalidCRAFiles) weil machen Voraussichtlich (und einen anderen Ort) jetzt liest einfach die Metadaten der Sampledatei statt alle Daten zu lesen. Danke an Jessica Austin.
         
    * IMPROVED: Es gibt jetzt Unterstützung für Zeitketten mit Präzision größer als To-the-Millisekunden, wenn die zusätzlichen Ziffern alle 0's sind, z.B. "2020-05-22T01:02:03.456000000Z". Danke an Yibo Jiang.
         
    * IMPROVED: GenerateDatasetsXml's EDD.suggestDestinationName verwendet, um '(') und alles nachher zu entfernen. Jetzt entfernt es (.\\*) nur, wenn dies das Ende dersourceName. Jetzt entfernt es auch\\[.\\*\\]nur, wenn dies das Ende dersourceName. Danke an Julien Paul.
         
    * VERPROVED: Datensätze generieren Xml macht jetzt die VariabledestinationNames einzigartig durch hinzugefügt \\_2, \\_3, ..., nach Bedarf. Danke an Julien Paul.
         
    * VERBESSERT: Wenn Calendar2.parseDateTime parses dd, hh, oder HH, kann das erste 'digit' jetzt ein Raum sein.
    * KNOWN PROBLEM: Beginnen mitERDDAP™2.10,.ncml Dateien, die versuchen, ein Attribut zu ändern, ändern Sie das Attribut nicht. Dies ist ein bekannter Fehler in netcdf-java, den ich berichtet habe und sie sagen, wird in der nächsten Version von netcdf-java behoben werden.
         
    * BROKEN LINKS FIX: Ich habe ein richtiges System für die Prüfung von gebrochenen Links inERDDAP™Web-Seiten, so sollte es jetzt sehr wenige gebrochene Links (zumindest ab jedem Release-Datum -- neue kaputte Links entstehen oft) .
         
    * BUG FIX: EDDTableFromHtpGet scheiterte mit bestimmten Arten von Anfragen. Jetzt nicht. Danke an Emma bei BODC.
         
    * BUG FIX: Um einige Anfragen zu bearbeiten, machte EDDTable eine temporäre Datei für jede gewünschte Variable, wobei ein Dateiname im Namen der Variable endet. Wenn der Name der Variable auch eine Art Komprimierung war (z.B. .Z) ,ERDDAPwürde versuchen (und scheitern) um die temporäre Datei zu dekomprimieren. Jetzt enden die temporären Dateinamen in ".temp". Dank Mathew Biddle.
         
    * BUG FIX: GenerateDatasetsXml und Calendar2.convertToJavaDatum Format sind jetzt viel weniger wahrscheinlich, eine falsche Änderung zu machen, wenn Sie versuchen, ein möglicherweise ungültiges Datum Zeitformat zu beheben. Insbesondere wird kein automatisch empfohlenes DateTime-Format geändert. Dank Mathew Biddle.
         
    * BUG FIX: Wenn es einen Fehler gab, während Inhalte von einer entfernten URL erhalten wurden, und wenn der ErrorStream-Inhalte komprimiert wird,ERDDAP™jetzt die Fehlermeldung richtig dekomprimiert. Danke an Bob Simons.
         
    * BUG FIX:&lt;abonnierenToRemoteErdddapDataset&gt; wurde nicht angewendet, wenn... FromErddap Dataset war ein Kinderdatensatz. Jetzt ist es. Danke an Chris Romsos.
         
    * BUG FIX: Datensätze generieren Xml denkt nicht mehr, dass ein Quell-Variable-Name beginnend mit "latin" kann Breite sein. Dank Vincent Luzzo.
         
    * BUG FIX: Nun, ein OutOfMemoryError beim Lesen einer Datendatei während der Bearbeitung der Anfrage eines Benutzers ist kein Grund, eine Datei in die BadFiles-Liste hinzuzufügen. Danke an Bob Simons.
         

## Version 2.02{#version-202} 
 (veröffentlicht 2019-08-21) 

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    * NEU: Es gibt jetzt zwei Möglichkeiten, um nach Datensätzen auf mehreren zu suchenERDDAPS. Sie arbeiten etwas anders und haben verschiedene Schnittstellen und Optionen.
        
        *   [SearchMultipleERDDAPS.html](/SearchMultipleERDDAPs.html)von Bob Simons/NOAA NMFS SWFSC ERD.
        *   [ http://erddap.com ](http://erddap.com)von Rob Fuller/The Marine Institute of Ireland.
        
Dank Tylar Murray für die ursprüngliche Anfrage.
         
    * VERBESSER: eine Anfrage an die"files"System zum Herunterladen einer Datei, die tatsächlich auf einer Remote-Website (z.B. AWS S3) führt nun zu einer Umleitung, so dass der Benutzer tatsächlich die Daten aus der Quelle herunterladen wird, anstatt zu verwendenERDDAP™als Vermittler. Dank Andy Ziegler undNOAA.
         
    * NEU: Als Beispiel für die neuen AWS S3-bezogenen Funktionen und um es jedem zu erleichtern, Dateien aus öffentlichen AWS S3-Buckets zu durchsuchen und herunterzuladen, haben wir erstellt
        [~110 Probendatensätze](https://registry.opendata.aws/)die es jedem erlauben, den Inhalt von fast allen
        [AWS S3 Open Data Eimer](https://registry.opendata.aws/). Wenn Sie auf die"files"Link für jede dieser Sample-Datensätze, Sie können den Verzeichnisbaum und Dateien in diesem S3 Bucket durchsuchen. Aufgrund der Art, wie diese Datensätze funktionieren, sind diese Verzeichnislisten immer perfekt aktuell, weilERDDAP™sie auf-die-fly. Wenn Sie den Verzeichnisbaum auf einen tatsächlichen Dateinamen klicken und auf den Dateinamen klicken,ERDDAP™wird Ihre Anfrage an AWS S3 umleiten, damit Sie die Datei direkt von AWS herunterladen können.ERDDAP™Administratoren können
        [Lesen Sie die Anweisungen, wie Sie dies für andere S3 Eimer tun](/docs/server-admin/datasets#working-with-aws-s3-files). Dank Andy Ziegler undNOAA.
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * Sie brauchten, um zu tun: keine
         
    * VERBESSERT:ERDDAP's Methode zum Speichern von Arrays von Strings (StringArray) ist jetzt viel mehr Speicher effizient. Streichung Arrays werden überall verwendetERDDAP™, insbesondere beim Lesen tabellarischer ASCII-Datendateien. Auch andere Änderungen machen das Lesen von CSV/TSV/SSV ASCII, Kolumnar ASCII und jsonlCSV tabular Dateien schneller und viel mehr Speicher effizient. Das Ergebnis ist: für eine 764 MB ASCII Daten-Testdatei (aber zu einem 52MB komprimiert.gzDatei) mit 3,503,266 Zeilen und 33 Spalten, die maximale Speichernutzung ging von 10GB bis 0,6GB (am Gipfel) . Die Zeit, es zu lesen, ging von ~7 Minuten (aber variiert stark, wie viel physischer Speicher im Computer ist) bis zu ~36 Sekunden (einschließlich 10er für die Vereinfachung () die nur von GenerateDatasets verwendet wird Xml) . Viele andere Orte inERDDAP™wird von dieser erhöhten Speichereffizienz profitieren. Dank Tylar Murray und Mathew Biddle.
        
Ich habe eine andere Lösung erforscht (Speichern von StringArray als UTF-8-codierte Byte-Arrays) . Das reduziert die Speichernutzung weitere ~33%, aber zu den Kosten von ~33% Verlangsamung. Im Vergleich zu dem System, das jetzt verwendet wird, schien das wie ein schlechter Handel ab. Es ist einfacher, einen Computer mehr Speicher zu geben (Mehr Speicher für ~$200 kaufen) als schneller zu machen (einen neuen Computer kaufen) .
        
Wenn es bequem ist, ist es immer noch eine gute Idee, riesige tabellarische Dateien in mehrere kleinere Dateien basierend auf einigen Kriterien wiestationIDund/oder Zeit.ERDDAP™muss oft nur eine der kleinen Dateien als Antwort auf die Anfrage eines Benutzers öffnen und so viel schneller reagieren können.
        
    * IMPROVED: Es gibt jetzt[ERDDAP™AWS S3 Dokumentation](/docs/server-admin/datasets#working-with-aws-s3-files), die beschreibt, wie manERDDAP™mit Datendateien in AWS S3 Eimer arbeiten.
Auch,ERDDAP™nutzt nun neue Features im AWS S3JavaAPI.
Auch,ERDDAP™jetzt können AWS S3 URLs zusätzliche Zeichen enthalten (Zeitraum, Bindestrich, Unterstrich) in Eimernamen.
Auch,ERDDAP™erfordert nun, dass AWS S3 Bucket URLs auf eine bestimmte Weise identifiziert werden:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
wo Präfix optional ist.
Dank Andy Ziegler undNOAA.
         
    * VERPROVED: Datensätze generieren Xml behandelt jetzt zusätzliche häufigmissing\\_values steht-ins als fehlende Werte und ist daher wahrscheinlicher, eine Spalte in einen numerischen Datentyp umzuwandeln. Auch PrimitiveArray.simplify () protokolliert nun, welchen bestimmten Datenwert es zur Behandlung einer bestimmten Spalte als Spalte von Strings verursacht hat. Dank Mathew Biddle.
         
    * VERBESSERT:&lt;requestBlacklist&gt; unterstützt jetzt .\\*.\\*  (oder\\*:\\*für IPv6) am Ende der IP-Adressen, so dass Sie einen größeren Teil der IP-Adressen, z.B. 110.52, schwarz auflisten können.\\*.\\*  (China Unicom Tianjin) . Siehe die Dokumentation für [&lt;AnfrageBlacklist&gt; (/docs/server-admin/datasets#requestblacklist) Dank China Unicom und China Telecom.
         
    * VERBESSERT: Wenn die Quelle eines Datensatzes keinen Datensatz angibt"institution"Attribute, GenerateDatasets Xml und loadDataset erhalten es jetzt von einem "creator\\_institution" Attribut (wenn verfügbar) . Danke an Micah Wengren.
         
    * BUG FIX: Standardisierung Was nicht immer auf ASCII-Datendateien angewendet wurde.
Auch, EDDTable nicht richtig Umgang mit Einschränkungen auf Zeitwerte, wenn die Quelle hatte String Zeitwerte und Standardisierung Was benutzt wurde.
Dank Paloma de la Vallee.
        
Ich habe nicht klar gesagt: Sie sollten einfach Standardisieren Welche Funktionen, wenn Sie sie tatsächlich benötigen (z.B., wenn verschiedene Quelldateien Zeitwerte auf unterschiedliche Weise speichern) , weil einige Anfragen an Datensätze, die Standardisierung verwenden Was etwas langsamer verarbeitet wird.
        
    * BUG FIX: Ein Fehler in Code verwendet vonEDDGridFromNcFiles verursachte es, mit.nc4 und.hdf5 Dateien, die "long" haben (Int64) Variablen. Das ist jetzt behoben. Dank Friedemann Wobus.
         
    * BUG FIX: Kleine Änderungen an ISO 19115 Dateien, um einen anderen Validator glücklich zu machen. Dank Chris MacDermaid und Anna Milan.
         

## Version 2.01{#version-201} 
 (veröffentlicht 2019-07-02) 

*    **Neue Funktionen und Änderungen (für Benutzer) :** 
    * Keine.
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * BUG FIX: Ein Fehler im Code, der das Data Access Formular fürtabledapdatasets bewirkten, dass die Webseite für einige Datensätze leer ist. Auch habe ich die Handhabung von unerwarteten Fehlern auf allen HTML-Seiten verbessert, so dass sie (in) eine Fehlermeldung anzeigen. Dank Marco Alba.
    * VERPROVED: Datensätze generieren Xml druckt nicht mehr eine lange Warnung an der Spitze der Ausgabe. Stattdessen, bitte siehe[Generierung bearbeiten Datensätze Xml Ausgabe](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better). Danke an Steven Baum.
    * VERPROVED: Datensätze generieren Xml macht nun leicht verschiedene Empfehlungen in verschiedenen Situationen für&lt;updateEveryNMillis&gt; für EDD...Von...Files datasets. Auch, GenerateDatasets Xml entmutigt nun das ursprüngliche "Extrakt"-System für EDDTableFromFiles-Datensätze.

## Version 2.00{#version-200} 
 (veröffentlicht 2019-06-26) 

*    **ERDDAP™v2.00 ist endlich da&#33; Ja&#33;**   
     
    * Wir entschuldigen uns für die lange Verzögerung, die erforderlich ist, um diese Version zu beenden.
Danke für Ihre Geduld.
         
    * Die gute Nachricht ist, dass die zusätzliche Zeit verwendet wurde, um mehr der Funktionen hinzuzufügen, die Benutzer angefordert hatten. Die schlechte Nachricht ist, dass auch mit der Verzögerung, nicht alle angeforderten Funktionen hinzugefügt wurden. Es tut uns leid, aber es schien wichtiger, diese Freilassung herauszuholen, als mehr zu verzögern (Für immer?) immer neue Features hinzufügen. Wir versprechen, in Zukunft zu häufigeren Releases zurückzukehren.
         
    * "Version 2?&#33; Gibt es große Veränderungen und Unvereinbarkeiten?"
Große neue Features? Ja.
Große Inkompatibilitäten oder Änderungen für Administratoren oder Benutzer? Nein.
Wir springen von v1.82 bis v2.00:
        * teils zu feiern 10 Jahre (Jetzt 11) seit der ersten öffentlichen VeröffentlichungERDDAP™  (v1.00 auf 2008-05-06, die nach außen sah bemerkenswert wie v2.00) . In dieser Zeit,ERDDAP™von einer Anlage auf fast 100 Anlagen in mindestens 12 Ländern (Australien, Belgien, Kanada, Frankreich, Indien, Irland, Italien, Südafrika, Spanien, Thailand, UK, USA) .
        * zum Teil eine große Ergänzung in einer völlig neuen Richtung zu markieren:ERDDAP™hat nun ein Daten-Ingest-System, um mit den vorhandenen Datenserver-Diensten zu gehen (siehe[EDDTableFromHtpGet](#eddtablefromhttpget)) ,
        * und zum Teil, weil es kein großer Sprung von 1.82 bis 2.00 numerisch, so schien dies wie die richtige Zeit.
             
    * Die andere gute Nachricht ist, dass es jetzt zwei andere Gruppen, die Code zuERDDAP™  (in dieser Version und mit Indikationen werden sie fortfahren) : Rob Fuller und Adam Leadbetter vom irischen Marine Institute und Roland Schweitzer von PMEL und Weathertop Consulting. Vielen Dank. Es ist wahr, dass sie an Projekten ihrer eigenen Wahl arbeiten, aber das ist das klassische Open-Source-Entwicklungsmodell -- Gruppen tragen Code für die Funktionen, die sie am liebsten hinzufügen möchten. Der zusätzliche Nutzen für die Mitarbeiter: Sie erhalten, um die neuen Funktionen zu nutzen, sobald sie fertig sind; sie müssen nicht auf die nächste Veröffentlichung wartenERDDAP. Ihre Gruppe ist auch gerne beizutragen&#33; Siehe[ERDDAP™Programmer's Guide](/docs/contributing/programmer-guide).
         
    * Wir hoffen, Sie mögenERDDAP™v2.00. Wir freuen uns auf die nächsten 10 JahreERDDAP™Entwicklung und immer mehr Nutzung auf der ganzen Welt.
         
*    **Neue Funktionen und Änderungen (für Benutzer) :**   
     
    * NEU:orderByMeanFilter
fürtabledapdatasets berechnet die Mittel für die angegebenen Gruppen. Auch, alle vonorderByOptionen unterstützen nun eine zusätzliche Möglichkeit, Gruppen zu definieren: _numericVariable\\[/ Nummer\\[ZeitEinstellungen\\]\\[:offset\\]\\]_, z.B. Zeit/Tag oder Tiefe/10:5. Zum BeispielstationID,Zeit, WasserTemp&orderByMean ("stationID,Zeit/1day") würde die Ergebnisse sortierenstationIDund Zeit, dann berechnen und den Mittelwert von WasserTemp für jedestationIDfür jeden Tag. Dies sind bemerkenswert nützliche und leistungsstarke neue Features. Der neue Code für diese Funktionen und die Änderungen des alten Codes wurden von Rob Fuller und Adam Leadbetter vom irischen Marine Institute unterstützt und über Git eingereicht. Danke. Rob und Adam&#33;
         
    * NEU: Ausgabedateityp für tabellarische Datensätze:[.data Tabelle](https://developers.google.com/chart/interactive/docs/reference#dataparam),
eine JSON-Datei formatiert für die Verwendung mitGoogle VisualizationClient-Bibliothek (Google Charts) . Der dafür vorgesehene Code wurde von Roland Schweitzer übernommen und über Git eingereicht. Danke. Roland&#33;
         
    * NEU: Ausgabedateityp für tabellarische Datensätze:[.jsonlCSV1](https://jsonlines.org/examples/),
die wie die bestehende.jsonlCSVOption, aber mit Spaltennamen auf der ersten Zeile. Danke an Eugene Burger.
         
    * NEU: Wenn der Administrator es aktiviert, können sich Benutzer jetzt mit ihrem[ODER](https://orcid.org)Konto.
Es ist ein OAuth 2.0-Authentifizierungssystem, ähnlich wie Google-Authentifizierung. ORCID wird von Forschern weit verbreitet, um sich eindeutig zu identifizieren. ORCID-Konten sind kostenlos und haben nicht die Datenschutzprobleme, die Google-Konten haben. Vgl.ERDDAP'[Orcid Authentifizierungshinweise](/docs/server-admin/additional-information#orcid). Dank an BCO (Adam Shepard, Danie Kinkade, etc.) .
         
    * NEU: Ein neuer URL-Konverter konvertiert aktuelle URLs in aktuelle URLs.
Siehe .../erddap/convert/urls.html auf jederERDDAP™Installation, z.B.
        [diese Verbindung zum Konverter in derERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html). Dies sollte für Datenmanager nützlich sein. Dies wird auch intern von GenerateDatasetsXml verwendet. Dank Bob Simons und Sharon Mesick.
         
    * VERBESSERT: Die[Time Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)hat nun Optionen, um eine gemeinsame Stringzeit in eine ISO8601-Stringzeit umzuwandeln oder einUDUNITS- wie Zeiteinheiten in einer richtigenUDUNITSZeiteinheiten String. Dies sollte auch nützlich sein,ERDDAP™Administratoren, die wissen müssen, welches Format für das Attribut "Einheiten" für String-Zeitvariablen anzugeben ist. Dies wird auch intern von GenerateDatasetsXml und die standardizeWelche Funktion von EDDTableFromFiles verwendet. Danke an Bob Simons.
         
    * NEU: Die[Konverter von Einheiten](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)hat eine neue "Standardize UDUnits" Option.
Zum Beispiel werden "deg\\_C/m" und "degrees\\_C Meter-1" beide in
"degree\\_C m-1". Diese Funktion wird auch von der StandardisierungWelche Funktion von EDDTableFromFiles verwendet. Danke an Bob Simons.
         
    * NEU: Für Grafiken (andere als Oberflächengraphen) undtabledap's Make A Graph-Webseiten, wenn die x-Achse keine Zeitachse ist, wenn nur eine Untermenge des x-Achsen-Variablen-Bereichs sichtbar ist, gibt es jetzt Schaltflächen über dem Graph, um die X-Achse nach links oder nach rechts zu verschieben. Dank Carrie Wall Bell / dem Hydrophone Projekt.
         
    * NEU: Für Graphen kann die X- und/oder Y-Achse nun eine Log-Skala verwenden.
Benutzer können die Y Axis-Skala über ein neues Dropdown-Widget auf dem Raster steuern undtabledapMachen Sie ein Graph-Webseiten. Siehe[.xRange und . yRange Dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange). Dank Carrie Wall Bell / dem Hydrophone Projekt.
         
    * VERBESSERT:ERDDAP™macht nun eine bessere Nutzung verschiedener HTTP-Fehlercodes und gibt nun eine(OPeN)DAPv2.0-formatierte Fehlermeldung Payload. Vgl.[die Details](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors). Dank Antoine Queric und Aurelie Briand.
         
    * IMPROVED: Verwenden Sie nicht Netcdf-java/c oder andere Software-Tools, um eine Verbindung mit.ncoder.hdfDateien serviert vonERDDAP's /files/ system als ob sie lokale Dateien waren.ERDDAP™lehnt nun diese Anträge ab. Es ist schrecklich ineffizient und verursacht oft andere Probleme. Stattdessen:
        
        * Verwendung(OPeN)DAPClient-Software zu verbindenERDDAP'DAPDienstleistungen für den Datensatz (die /griddap/ odertabledap/ in der URL) . Das ist, wasDAPist für und tut so gut.
        * Oder verwenden Sie das Datenzugriffsformular des Datensatzes, um eine Teilmenge von Daten anzufordern.
        * Oder, wenn Sie die gesamte Datei oder wiederholten Zugriff über eine lange Zeit benötigen, verwendencurl,wget, oder Ihr Browser, um die gesamte Datei herunterzuladen, dann auf die Daten aus Ihrer lokalen Kopie der Datei zugreifen.
        
          
         
    * VERBESSERT: Auf derERDDAP™Startseite, Volltextsuche ist jetzt über "Ansicht einer Liste aller Datensätze", da es der beste Ausgangspunkt für die meisten Benutzer ist. Dank Didier Mallarino und Maurice Libes.
         
    * IMPROVED: Auf DataProviderForm3.html gibt es jetzt Dropdown-Listen von Commonstandard\\_nameS. Vielen Dank an jemanden beim IOOS DMAC Meeting.
         
    * IMPROVED: Auf den /files/Webseiten gibt es nun einen Link zum neuen "Was kann ich mit diesen Dateien machen?" Abschnitt der /files/Dokumentation. Dieser Abschnitt beschreibt verschiedene Dateitypen und gibt Vorschläge, wie mit ihnen zu arbeiten. Dank Maurice Libes.
         
    * VERBESSERT: Fast jede Anfrage anERDDAP™sollte mindestens ein bisschen schneller und manchmal viel schneller sein.
         
    * BUG FIX: Unter Umständen, wenn ein EDDTable-Datensatz Daten in einigen Arten gespeichert.ncDateien, das globale "id" Attribut wurde auf den vorgeschlagenen Namen der Datei gesetzt, die einen Hash enthält, um es einzigartig auf diese Anfrage zu machen. Jetzt wird "id" richtig unverändert gelassen (wenn angegeben) oder auf den Datensatz eingestelltdatasetID  (nicht spezifiziert) . Danke an John Maurer.
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:**   
     
    * TO DO: Diese Veröffentlichung wird einige Zeit dauern und von Ihnen arbeiten. Bitte seien Sie geduldig und planen Sie ein paar Stunden, um die erforderlichen Änderungen und ein paar Stunden zu tun, um mit neuen Features zu experimentieren.
         
    * TO DO: Für die Sicherheit, machen Sie eine Sicherungskopie Ihrer aktuellen setup.xml unddatasets.xmlDateien, so dass Sie zu ihnen in dem unwahrscheinlichen Fall, wo Sie müssen wieder inERDDAP™v1.82.
         
    * TO DO: Die EmpfehlungJavaist jetzt AdoptOpenJDK's OpenJDK 8) (LTS) + HotSpot.
Dies ist eine Open Source-VarianteJavadie keine Einschränkungen ihrer Verwendung hat (nichtOracle'JavaVerteilung) . Es wird vonOracle'Javain einer fortschreitenden Weise, mitOracleSegen. Aus Sicherheitsgründen ist es wichtig, IhreJavaVersion aktuell. Vgl.ERDDAP'[JavaInstallationsanleitung](/docs/server-admin/deploy-install#java).
         
    * TO DO: AdoptOpenJDK'sJavabenötigt eine kleine Ergänzung zu Ihrer Tomcat Installation: siehe[Ressourcen Cache Anleitung](/docs/server-admin/deploy-install#contentxml). Ich denke, das ist ein Ersatz für die -XX:MaxPermSize-Einstellung, die (Adopt) OpenJDK unterstützt nicht mehr.
         
    * TO DO: Der neue Standard und empfehlen&lt;fontFamily&gt; Einstellung in setup.xml ist
DejaVu Sans, die in AdoptOpenJDK gebaut werdenJava. Siehe
        [überarbeitete Anleitung zur Schriftinstallation](/docs/server-admin/deploy-install#fonts).
         
    * TO DO: Viele Tags bewegen sich von setup.xml zudatasets.xml. Der Vorteil ist, dass Sie ihre Werte ändern können, währendERDDAP™läuft, ohne NeustartERDDAP. Bemerkenswert, Sie können leicht ändern&lt;startBodyHtml5&gt; zur Anzeige einer temporären Nachricht auf derERDDAP™Startseite (z.B. "Check out the new JPL MUR SST v4.1 dataset ..." oder "ThisERDDAP™wird offline für die Wartung 2019-05-08T17:00 PDT durch 2019-05-08T20:00 PDT sein.") . Wenn/wenn Sie diese Tags in änderndatasets.xml, die Änderungen werden das nächste Mal wirksamERDDAP™liestdatasets.xml.
         
        
        1. Kopieren Sie diesen Inhalt in Ihredatasets.xmlDatei (wobei in der Nähe des Starts der Datei, nach&lt;erdddapDatasets&gt;:
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. Einmal, kopieren Sie den Wert (wenn) für jeden dieser Tags aus Ihrer setup.xml-Datei in den neuen Tag, den Sie gerade eingefügt haben (oben) indatasets.xml. Zum Beispiel, wenn Sie einen Wert von 30 für&lt;CacheMinutes&gt; in setup.xml, sollten Sie diesen Wert in den neuen&lt;ccheMinutes&gt; tag indatasets.xml  (wenn der Wert gleich dem neuen Standardwert ist, ist es am besten, den Tag einfach indatasets.xmlRohöl) .
            
Wenn Ihr Wert anders ist als der neue vorgeschlagene Standard (außer für&lt;startBodyHtml5&gt; und&lt;theShortDescriptionHtml&gt;, die nützlich sind, um IhreERDDAP™Installation), bitte überlegen, auf die neuen Standardwerte umzuschalten. Dies gilt insbesondere für&lt;partiellRequestMaxBytes&gt; und&lt;partiellRequestMaxCells&gt;, wo sich der Standard-/Suggested-Wert im Laufe der Jahre deutlich geändert hat.
            
Nachdem Sie jeden Wert kopieren, löschen Sie das Tag und seine Beschreibung von setup.xml. Es ist besser, diese Tags indatasets.xml. Und es gibt jetzt bessere Beschreibungen in[setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file).
            
        
Ein Quirk des neuen Systems ist, dass die erste Webseite, wenn Sie startenERDDAPwird der StandardERDDAP™Seite. Jede nachfolgende Webseite verwendet den ...Html-Inhalt, den Sie indatasets.xml.
        
    * WARNING: Das erste Mal, dass Sie laufenERDDAP™v2.0, Datensätze basierend auf lokalen Datendateien laden **sehr** langsam, weilERDDAP™muss die Datenbank der Dateien in einem etwas anderen Format neu erstellen. Nach der langsamen anfänglichen Nachladung laden sie schnell wie zuvor. Bitte geduldig sein.
         
#### EDDTableFromHtpGet{#eddtablefromhttpget} 
    *   [BIG NEW FEATURE: EDDTableFromHtpGet](#eddtablefromhttpget)  
Bis jetzt,ERDDAP™Lesen Sie einfach Daten und haben es den Benutzern zur Verfügung gestellt. Jetzt.ERDDAP™verfügt über ein einfaches, effizientes System zur Erfassung von Echtzeitdaten von Sensoren. Unter anderem bietet dieser Datensatz eine feinkörnige Versionierung: er erinnert sich an jede Änderung, die zum Datensatz gemacht wurde, wenn er gemacht wurde, und von wem. In der Regel wollen die Benutzer nur die neueste Version des Datensatzes, mit allen Änderungen angewendet. Aber es gibt die Möglichkeit, dass Benutzer Daten aus dem Datensatz anfordern, wie es zu jedem Zeitpunkt war. Dies erleichtert reproduzierbare Wissenschaft. Im Gegensatz zu den meisten anderen Echtzeit-Datensätzen sind diese Datensätze daher für[DOIS](https://en.wikipedia.org/wiki/Digital_object_identifier). weil sieDOIAnforderung, dass der Datensatz nicht verändert wird, außer durch Aggregation. Vgl.[EDDTableFromHtpGet](/docs/server-admin/datasets#eddtablefromhttpget). Dank an OOI (von vorn und jetzt) um darüber zu reden, was nötig ist und Eugene Burger für die Erinnerung daran, an was wichtig ist.
         
    * BIG NEW FEATURE:ERDDAP™kann nun Daten direkt von extern komprimierten Datendateien bedienen, einschließlich.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, oder .Z. Datasets können eine Mischung von extern komprimierten Dateien enthalten (vielleicht die älteren Datendateien?) und nicht-extern-komprimierte Dateien, und Sie können eine Datei jederzeit komprimieren/dekomprimieren.
        
Das funktioniert großartig&#33;
In den meisten Fällen ist die Verlangsamung im Zusammenhang mit der Dekomprimierung der Dateien geringfügig. Wir ermutigen Sie dringend, dies zu versuchen, insbesondere für Datensätze und/oder Datendateien, die selten verwendet werden.
        
Dies kann Sie sparen $30.000 oder mehr&#33;
Das ist eines der wenigenERDDAP™Funktionen, die Sie viel Geld sparen können -- wenn Sie viele Datendateien komprimieren, benötigen Sie viel weniger RAIDs/Hard-Laufwerke, um die Daten zu speichern, oder umgekehrt, Sie können weit mehr Daten (bis 10x) mit den RAIDs, die Sie bereits haben. Wenn diese Funktion Sie davor spart, eine andere RAID zu kaufen, dann hat es Sie ungefähr $30.000 gespeichert.
        
Siehe[Extern komprimierte Dateien Dokumentation](/docs/server-admin/datasets#externally-compressed-files). Dank Benoit Perrimond und Paloma de la Vallee.
        
    * BIG NEW FEATURE: AlleEDDGridVonFiles und allen EDDTableFromFiles-Datensätzen unterstützen&lt;ccheFromUrl&gt; tag und a&lt;ccheSizeGB&gt; tag. Wenn cacheSizeGB nicht angegeben ist, wird dies eine vollständige Kopie der Dateien eines entfernten Datensatzes herunterladen und erhalten. Wenn cacheSizeGB angegeben ist und &gt;0 ist, wird dies Dateien vom entfernten Datensatz nach Bedarf in einen lokalen Cache mit einer begrenzten Größe herunterladen, der bei der Arbeit mit Cloud-basierten (z.B. S3) Datendateien. Siehe[Cache VonUrl Dokumentation](/docs/server-admin/datasets#cachefromurl)für Details. Dank an Bob Simons und Roy Mendelssohn (die seit Jahren Skripte schreiben, um lokale Kopien von Remote-Datensatz-Dateien zu handhaben) , Lloyd Cotten, Eugene Burger, Conor Delaney (als er bei Amazon Web Services war) , und die Google Cloud Platform.
         
    * NEU: Das neue EDDTableFromJsonlCSV Klasse kann tabellarische Daten auslesen
        [JSON Zeilen CSV-Dateien](https://jsonlines.org/examples/)  ("Better als CSV") . Dank der Menschen am Marine Institute of Ireland, die mir über dieses Format und Eugene Burger und PMEL erzählen, für die Anfrage, es als Eingabetyp zu unterstützen.
         
    * NEU: AlleEDDGridund alle EDDTableFromFiles-Datensätze unterstützen&lt;nThreads&gt; Einstellung, die sagtERDDAP™wie viele Threads zu verwenden, wenn auf eine Anfrage reagiert. Siehe[nThreads Dokumentation](/docs/server-admin/datasets#nthreads)für Details. Dank Rob Bochenek von Axiom Data Science, Eugene Burger, Conor Delaney (als er bei Amazon Web Services war) , und Google Cloud Platform.
         
    * NEU Standardisierung Was für alle EDDTableFromFiles Unterklassen -
Bisher, wenn für eine bestimmte Variable, die Werte der wichtigen Attribute (z.B.,scale\\_factor,add\\_offset,missing\\_value, \\_FillValue, Einheiten) waren nicht konsistent, EDDTableFromFiles würde einen Wert für jedes Attribut "gültig" und markieren Dateien mit anderen Attributwerten als "Bad Files". Jetzt gibt es ein System, um die Dateien zu standardisieren, sobald EDDTableFromFiles die Dateien liest. Vgl.[EDDTableFromFiles Standardisierung Was?](/docs/server-admin/datasets#standardizewhat). Einer vonERDDAPHauptziele sind die Bereitstellung von Datendateien und Datensätzen in konsistenter Weise. Standardisierung Was ist ein wichtiges neues Werkzeug, um diese Realität zu machen. Dank Marco Alba, Margaret O'Brien (und andere EML-Benutzer) , BCO-DMO und InPort Benutzer.
         
    * NEW EDDTableFromInvalidCRAFiles ermöglicht es Ihnen, einen Datensatz aus einer Sammlung vonNetCDF  (v3 oder v4)  .ncDateien, die eine bestimmte, ungültige Variante des CF DSG Contiguous Ragged Array verwenden (CRA) Dateien. Beispieldateien für diesen Datensatztyp finden Sie unter https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Dieser Server ist jetzt nicht zuverlässig verfügbar\\]. ObwohlERDDAP™unterstützt diesen Dateityp, es ist ein ungültiger Dateityp, den niemand verwenden sollte. Gruppen, die derzeit diesen Dateityp verwenden, werden stark ermutigt,ERDDAP™um gültige CF DSG CRA-Dateien zu generieren und mit diesen Dateien zu stoppen. Dank Ajay Krishnan und Tim Boyer.
         
    * EDDTableFromThreddsFiles und EDDTableFromHyraxDateien werden nun depreciert. Bitte wechseln Sie zu EDDTableFromNcFiles (oder eine Variante) plus&lt;ccheFromUrl&gt;. Wenn das aus irgendeinem Grund nicht funktioniert, E-Mailerd.data at noaa.gov. Wenn vor 2020 keine Beschwerden vorliegen, können diese Datensatztypen entfernt werden.
         
    * VERBESSERT -- Das System zur automatischen Umwandlung von nicht-ISO 8601 Zeiten in ISO 8601 Zeiten (eingeführt in v1.82) wurde stark erweitert, um eine Vielzahl von zusätzlichen Formaten zu behandeln. Dies betrifft GenerateDatasetsXml undERDDAP's Umgang mit Quellmetadaten.
         
    * VERBESSERT -- Mit seiner dritten großen Revision des String-Zeitausgleichssystems (und hoffentlich der Letzte) ,ERDDAP™nicht mehr verwendetJava's DateTimeFormatter wegen Bugs, die manchmal extreme Zeiten beeinflussen (Jahre&lt;=0000).ERDDAP™verwendet jetzt ein eigenes System zum Parsing Zeitstrings.
         
    * WARNING: Das neue String Zeitsparsystem ist etwas strenger. Wenn einer Ihrer Datensätze plötzlich nur fehlende Werte für Zeitwerte hat, ist die Ursache fast sicher, dass die Zeitformatkette etwas falsch ist. Es sollten Fehlermeldungen in log sein. txt bezogen auf Zeitwerte, die nicht mit dem Zeitformat übereinstimmen -- das sollte Ihnen helfen, den Zeitformat-String für diesen Datensatz zu fixieren. Wenn Sie Hilfe benötigen, verwenden Sie die Option inERDDAP's Time Converter, die "Convert\\[S\\]jede gemeinsame Stringzeit in eine ISO 8601 String-Zeit" -- es gibt das Format an, das der Konverter verwendet, um den Quellstring zu parsieren.
         
    * EMPFEHLUNG: Der schnellste, einfachste und günstigste Weg, um zu beschleunigenERDDAPDer Zugriff auf tabellarische Daten besteht darin, die Datendateien auf einem Solid State Drive zu setzen (SSD) . Die meisten tabellarischen Datensätze sind relativ klein, so dass eine 1 oder 2 TB SSD wahrscheinlich ausreicht, um alle Datendateien für alle Ihre tabellarischen Datensätze zu halten. SSD ist schließlich verschleißen, wenn Sie Daten an eine Zelle schreiben, löschen und neue Daten zu oft an diese Zelle schreiben. Stattdessen empfehle ich, (wie möglich) Sie verwenden einfach Ihre SSD, um die Daten einmal zu schreiben und es oft zu lesen. Dann sollte sogar eine verbrauchergerechte SSD eine sehr lange Zeit dauern, wahrscheinlich viel länger als irgendein Festplattenlaufwerk (HDD) . Consumer-grade SSD's sind jetzt billig (2018, ~$200 für 1 TB oder ~$400 für 2 TB) und die Preise fallen immer noch schnell. WannERDDAP™Zugriff auf eine Datendatei, eine SSD bietet beide
        
        * kürzere Latenzzeit (~0.1ms, versus ~3ms for an HDD, versus ~10 (?) ms for a RAID, versus ~55ms for Amazon S3) , und
        * höherer Durchsatz (~500 MB/S, versus ~75 MB/s für eine HDD versus ~500 MB/s für eine RAID) .
        
So können Sie bis zu einem ~10X Leistungssteigerung (vs a HDD) für $200&#33; Im Vergleich zu den meisten anderen möglichen Änderungen an Ihrem System (einen neuen Server für $10.000? eine neue RAID für $35.000? einen neuen Netzwerkschalter für $5.000? usw.) , dies ist bei weitem die beste Return on Investment (ROI) . Wenn Ihr Server nicht mit Speicher geladen wird, ist ein zusätzlicher Speicher für Ihren Server auch eine großartige und relativ kostengünstige Möglichkeit, alle Aspekte zu beschleunigenERDDAP.
        \\[SSD wäre auch für netzgebundene Daten großartig, aber die meisten netzgebundenen Datensätze sind viel größer, was die SSD sehr teuer macht.\\]  
         
    * NEU: Jeder, der eingeloggt ist, bekommt roll=\\[Wer ist hier? In\\], auch wenn es nicht&lt;Benutzer-Tag für sie indatasets.xml. Wenn Sie Datasets festlegen&lt;zugänglichTo&gt;\\[Wer ist hier? In\\], dann wer eingeloggt hatERDDAP™  (z.B. über ihr Gmail oder Orcid-Konto) wird autorisiert, auf den Datensatz zuzugreifen, auch wenn Sie noch keine&lt;Benutzer-Tag für sie indatasets.xml. Dank Maurice Libes.
         
    * VERBESSERT: DieUDUNITS/UCUM-Einheiten-Wandler wurde umfassend verbessert.
Es behandelt ungültige Einheiten Strings besser (beginnend mit einem Schwerpunkt auf der Erhaltung von Informationen, anstatt die Gültigkeit) . Auch die Ergebnisse haben jetzt eine standardisierte Syntax.
         
    * NEU: DieUDUNITS/UCUM-Einheiten-Konverter hat eine neue Möglichkeit, eineUDUNITSString.
Dies funktioniert gut für gültigUDUNITSStrings und vernünftigerweise gut für nicht-Standard / ungültigUDUNITSStrings. Zum Beispiel,UDUNITS="Meter pro Sekunde", "Meter/Sekunde","m.s^-1", und"m s-1"wird alle "m.s-1" zurückkehren. Dies war für die neue Standardisierung erforderlich Welches System oben beschrieben. Dank Marco Alba, Margaret O'Brien (und andere EML-Benutzer) , BCO-DMO und InPort Benutzer.
         
    * NEU: EDDTableFromMultidimNcFiles hat jetzt eine[Leckerbissen](/docs/server-admin/datasets#treatdimensionsas)Option, das sagtERDDAP™bestimmte Dimensionen zu behandeln (z.B. LAT und LON) als ob sie andere Dimensionen haben (z.B. TIME) . Dies ist nützlich für einige falsche Dateien, die verschiedene Dimensionen für verschiedene Variablen verwenden, wenn sie nur eine Dimension verwendet haben sollten (z.B. TIME) . Dank Marco Alba und Maurice Libes.
         
    * NEU: Jetzt, alleEDDGridVon...Files-Datensätzen unterstützen eine neue SonderachsesourceNamewas sagtERDDAP™Informationen aus der Datei zu extrahierenName (nur Dateiname.ext) und den Wert zu verwenden **ersetzen** den vorhandenen linken Achswert. Das Format ist
        \\*\\*\\*ersetzenFromFileName,_dataType_,_extractRegex_,_captureGroupNumber_
Vgl.[Diese Dokumentation](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Dank derNOAAPathfinder Tägliche Aggregationsdatensatz.
         
    * NEU: Jetzt, alleEDDGridVon...Files-Datensätzen unterstützen eine neue SonderachsesourceNamewas sagtERDDAP™Informationen aus dem Pfad der Datei zu extrahierenName (Verzeichnisse + Dateiname.ext)   
        \\*\\*\\*pathName,_dataType_,_extractRegex_,_captureGroupNumber_
Dazu verwendet der Pfadname immer'/'als Verzeichniszeichen, nie '\'.
Vgl.[Diese Dokumentation](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Dank Paloma de la Vallee.
         
    * NEU: Jetzt alle EDDTableFrom... Dateien Datensätze unterstützen zusätzliche PseudovariablesourceNames, die Informationen aus der Datei entnehmenName (nur Dateiname.ext)   (siehe[\\*\\*Das ist ein Problem.](/docs/server-admin/datasets#filename-sourcenames)) oder aus dem vollen Pfad der DateiName (/dir1/dir2/Dateiname.ext)   (siehe[\\*\\*Der Name](/docs/server-admin/datasets#pathname-sourcenames)) . Dank Paloma de la Vallee.
         
    * NEU: Wenn einEDDGridDatensatz hat eine oder mehrere sehr große Abmessungen (z.B. Millionen von Werten) die viel Speicher aufnehmen, können Sie das neue [&lt;DimensionValuesInMemory&gt;] (/docs/server-admin/datasets#dimensionvaluesinmemory) Einstellung zu falsch (der Standard ist wahr) , die dazu führt, dass der Datensatz die Werte auf dem Datenträger speichert und bei Bedarf abruft. Dank David Rodriguez und Rich Signell (re:EDDGridVonAudioFiles) .
         
    * VERBESSERT: Zuvor, wenn Sie diedataVariables für einen EDDTableFromFiles-Datensatz und das erneute Laden des Datensatzes, EDDTableFromFiles würde alle Datendateien wieder lesen. Jetzt kann es mit der Neuordnung umgehen, ohne alle Datendateien neu zu lesen. Dank Roland Schweitzer.
         
    * VERBESSERT: Jetzt, wennERDDAP™liest ASCII, NCCSV und JSON Lines CSV tabular data files, wenn es einen Fehler auf einer bestimmten Zeile findet (z.B. falsche Anzahl von Gegenständen) , es protokolliert eine Warnmeldung ("WARNUNG: Skipping line #"... " unerwartete Anzahl von Elementen...") in der[log.txt Datei](/docs/server-admin/additional-information#log)und dann weiter den Rest der Datendatei lesen. So ist es Ihre Verantwortung, regelmäßig zu schauen (oder ein Skript schreiben, um dies zu tun) für diese Nachricht im Protokoll. txt, damit Sie die Probleme in den Datendateien beheben können.ERDDAP™wird so eingerichtet, dass die Benutzer weiterhin alle verfügbaren gültigen Daten lesen können, obwohl einige Zeilen der Datei Fehler haben. Zuvor,ERDDAP™die Datei als "schlecht" markiert und aus dem Datensatz entfernt.
         
    * VERBESSERT: Wenn präzise Zeiten (z.B. zur nächsten Sekunde oder Millisekunde) an der Quelle als "Minuten seit ..." gespeichert werden (oder größere Einheiten) ,ERDDAP™jetzt rundet sie auf die nächste Millisekunde beim Lesen der Werte inERDDAP. Andernfalls werden die Floating-Point-Nummern brutalisiert und Datenanforderungen zu bestimmten Zeiten (z.B., &time=2018-06-15T01:30:00) wird scheitern. Bisher wurde sie so genau wie möglich berechnet. (und tut immer noch, wenn die Einheiten z.B. "Sekunden seit ..." oder "Millisekunden seit ..." sind) . Es ist am besten, dieses Problem zu vermeiden, indem Sie nicht große Einheiten verwenden (z.B. Minuten oder Stunden) präzise Zeitwerte speichern (z.B. Mikrosekunden) -- Computer arbeiten schlecht an der Handhabung von Dezimalstellen. Dank Marco Alba.
         
    * VERÄNDERUNGEN zu EDDTableFromEDDGriddie es viel besser machen. EDDTableFromEDDGridermöglicht es den Benutzern, netzgebundene Datensätze abzufragen, als ob sie tabellarische Datensätze wären ("Quicky by Value") .
        
        * Es unterstützt jetzt&lt;maxAxis0&gt; tag (Standardeinstellungen) die die maximale Anzahl der Achse angibt\\[0)\\]  (in"time") Werte, die sofort abgefragt werden können. Dies verhindert, dass naive Anfragen EDDTableFrom bekommenEDDGridzur Suche durch einen gesamten netzgebundenen Datensatz (was einen Timeout-Fehler versagen würde) .
        * Datensätze generieren Xml hat jetzt eine Option, EDDTableFrom zu generierenEDDGridDatensätze für alle netzgebundenen Datensätze in einem bestimmtenERDDAP™die zu einem bestimmten Regex passen (Verwenden Sie .\\*, um alle Datensätze anzupassen) . Die Datensätze, die sie erstellt, haben zusätzliche Informationen in dem zusammenfassenden Attribut, das angibt, dass es sich um eine tabellarische Version eines netzgebundenen Datensatzes handelt. Und ihredatasetIDist diedatasetIDdes netzgebundenen Datensatzes plus "\\_AsATable".
        * Es gibt eine große Geschwindigkeit für die häufigste Einrichtung: wenn der gegitterte Datensatz einEDDGridAusErddap-Datensatz, der in der gleichenERDDAP.
        
Dank James Gallagher und Ed Armstrong.
         
    * NEU: erzeugen Datensätze Xml für alle Arten von Datensätzen ist jetzt viel wahrscheinlicher, eine \\_FillValue odermissing\\_valueAttribut einer numerischen VariableaddAttributes. Dies geschieht beispielsweise, wenn String fehlende Wertmarker (z.B. "", ".", "?", "NA", "nd", "NaN") für diese Variable in der Sample-Datei inERDDAP's native fehlende Werte (127 in Byte-Säulen, 32767 in kurzen Spalten, 2147483647 in Intsäulen, 9223372036854775807 in langen Spalten und NaN in Float- und Doppelvariablen) . Es tritt auch für NaN-Werte in Float und Doppelvariablen auf. Auch wurde "nd" in der Liste der häufigsten fehlenden Wertmarker in numerischen Datenspalten hinzugefügt, dieERDDAP™sollte suchen. Dank Matt Biddle von BCO-DMO.
         
    * IMPROVED: die ncdump-Option im Generieren Datensätze Xml ist jetzt mehr wie ncdump (aber immer noch verwendet die netcdf-java-Version von ncdump) . Jetzt druckt es eine neue Liste von Optionen. Jetzt, für.ncml Dateien, es druckt die ncdump Ausgabe für das Ergebnis der.ncÄnderungen der Datei in der zugrunde liegenden Datei.ncoder.hdfDatei.
         
    * BUG FIX: Es gab einen Aktengriff Leck (irgendwannERDDAP™zu frieren) bei der Erstellung einiger Arten von Ausgabedateien, z.B. .geotif, verursacht, insbesondere wenn Fehler während der Erstellung aufgetreten sind. Ich glaube, das ist jetzt alles in Ordnung. Wenn Sie noch Probleme sehen, bitte sagen Sie mir die Art von Datensatz (Gitter oder Tisch) und die Art der Datei, die das Problem verursacht. Dank Steven Beale, Lynn DeWitt, Jibei Zhao und anderen.
         
    * BUG FIX: DieWMS Leafletdemo hat die "tiefe" Achse nicht vollständig/properly in "elevation" umgewandelt. Nun, es tut es, und die gebrochenen Legenden-Anfragen werden behoben. Auch alle Achsenoptionen in den Dropdown-Listen sind immer in aufsteigender sortierter Reihenfolge. Dank Antoine Queric und Aurelie Briand.
         
    * BUG FIX: EDDTableFromFiles unterstützt nun korrekt Einschränkungen von String-Variablen, die aus Char-Variablen in den Datendateien erstellt wurden. Dank Antoine Queric und Aurelie Briand.
         
    * BUG FIX: Wenn nun ein Datensatz nicht verfügbar wird, versucht der Datensatz zu benachrichtigen (mit der Nachricht "Dieser Datensatz ist derzeit nicht verfügbar.") seine Teilnehmer, börsennotierte Aktionen, rss und lonPM180 Datensätze, die darauf vertrauen. Dank Roy Mendelssohn und Bob Simons.
         
    * BUG FIX: Zwei Fehler im Zusammenhang mit EDDTableCopy. Danke an Sam McClatchie.
         
    * VERBESSERT: Die Anzahl der auf der status.html Seite angezeigten fehlgeschlagenen Anfragen wird steigen, weil mehr Dinge als bisher als Fehler gezählt werden.
         
    * VERBESSERT:ERDDAP's status.html zeigt jetzt "Requests (mediane Zeiten in ms) " in der Zeitreihe. Früher zeigte es mediane Zeiten, die auf ganzzahlige Sekunden verkürzt wurden.
         
    * IMPROVED: Im jsonld-Ausgang kommt nun der jsonld "name" aus dem Datensatz"title"inERDDAP, und die jsonld "headline" kommt jetzt aus dem Datensatz "datasetID"ERDDAP. Früher wurde es umgekehrt. Das scheint mir falsch zu sein, denn im normalen englischen Gebrauch ist "Name" in der Regel ein kurzer, (ideal) eindeutige Kennung, die sich selten/nicht ändert (z.B. Robert Middlename Simons) , keine Beschreibung, die nicht einzigartig ist und sich leicht und oft ändern kann (z.B. "Ein Kerl, der Software fürNOAA" vs. "Ein großer Kerl, der Software fürNOAA") . Gee, es wäre toll, wenn die schema.org Definition von[Name](https://schema.org/name), im Rahmen eines Datasets, waren spezifischer. Software-Entwickler sollten in der Lage sein, eine Umsetzung einer Spezifikation allein auf der Grundlage der Spezifikation zu schreiben, ohne Anleitung von Experten. Aber ich deferiere Google (vor allem Natasha Nein) , NZEI (John Relph) und Rob Fuller.
         
    * VERBESSERT: Im jsonld-Ausgang sind die vier "spatialCoverage GeoShape Box"-Werte jetzt minLat minLon maxLat maxLon. Bisher wurden die Lat- und lonenpositionen umgekehrt. Gee, es wäre toll, wenn die schema.org Definition von[GeoShare](https://schema.org/GeoShape)die richtige Reihenfolge angegeben. Software-Entwickler sollten in der Lage sein, eine Umsetzung einer Spezifikation allein auf der Grundlage der Spezifikation zu schreiben, ohne Anleitung von Experten. Dank Natasha Noy und Rob Fuller.

## Version 1.82{#version-182} 
 (veröffentlicht 2018-01-26) 

*    **Neue Features (für Benutzer) :**   
     
    * Zahlreiche subtile Veränderungen im Look-and-feelERDDAP™Webseiten.
        * VERBESSERT:ERDDAP™verwendet nun HTML 5 und macht eine bessere Nutzung von CSS.
        * VERBESSERT: Die Webseiten wurden leicht modifiziert, um sie sauberer und weniger "busig" zu machen. (Sie sind noch dicht und es gibt noch Dinge, über die man sich beschweren könnte, aber hoffentlich viel weniger als zuvor.) Vielen Dank an John Kerfoot für einige Kommentare.
        * VERBESSERT: Die Webseiten sehen jetzt auf Mobiltelefonen und anderen kleinen Geräten viel besser aus, besonders wenn Sie sie in der Landschaftsorientierung verwenden. Sie sehen auch in sehr kleinen und sehr großen Fenstern in Desktop-Browsern besser aus.
        * IMPROVED: Um die Sicherheit und andere Gründe zu verbessern, die Verwendung einer aktuellen Openlayers-Version für dieWMSDemonstrationsseiten wurden ersetzt durchLeaflet.
        * NEU: Unterstützung für Vorschauen von Bild-, Audio- und Videodateien in der"files"System (zum Beispiel,[dieser Testdatensatz](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) und in.htmlTableAntworten, wenn eine Zelle die URL einer Bild-, Audio- oder Videodatei hat (zum Beispiel,[Diese Anfrage](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) . Wenn Sie über ein '?'-Symbol schweben, sollten Sie eine Bild-, Audio- oder Videodatei Vorschau sehen. Sie können auch auf den Datei-Link klicken, um den Datei-Vollbildschirm in Ihrem Browser anzuzeigen. Siehe[Dokumentation von Mediendateien](/docs/server-admin/datasets#media-files). Beachten Sie, dass verschiedene Browser verschiedene Dateitypen unterstützen, so dass die Beispiele möglicherweise nicht in Ihrem Browser arbeiten.
Dank dieser Leute/Links für Ideen und Sample-Code für CSS-only image tooltips (wart auf https://codepen.io/electricalbah/pen/eJRLVd ) und abgeleitete Bildbeladung (wart auf https://varvy.com/pagespeed/defer-images.html )   (obwohl der Code vor der Verwendung geändert wurdeERDDAP) .
Dank Cara Wilson, Matthew Austin und Adam Shepherd/BCO-DMO für Anträge auf Bildunterstützung.
Dank Jim Potemra, Rich Signell, OOI und Carrie Wall Bell für Anfragen an Audio/Hydrophone-Datei-Unterstützung.
Dank OOI für die Anzeige der Notwendigkeit für Video-Support.
        * NEU: Eine Untermenge von Daten von allenERDDAP™Datensatz (aber in der Regel ein Datensatz von Audiodateien) kann nun in einer .wav Audiodatei gespeichert werden. ([Dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) Dank Jim Potemra, Rich Signell, OOI und Carrie Wall Bell für Anfragen an Audio/Hydrophone-Datei-Unterstützung.
        * IMPROVED: Das Format für die Web Accessible Folders (WAF)   (z.B. die /files/ Ordner) wurde aktualisiert, um eine HTML-Tabelle zu verwenden. Das neue Format mimiert die neuere Version der Verzeichnisliste, die von neueren Versionen von Apache erstellt wurde. Die Menschen werden feststellen, dass die Änderungen die Informationen leichter lesen lassen. Software, die diese Dokumente teilt (z.B. Software, die ISO 19115 Dokumente ausERDDAP) muss überarbeitet werden, aber das neue Format wird einfacher als das vorherige Format. (Achtung, Anna Milan.) 
        * NEUoutOfDateDatasets.htmlSeite. ([Beispiel](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) Diese Webseite zeigt eine Tabelle mit allen Datensätzen in Echtzeit, die eine&lt;testOutOfDate&gt; tag (siehe unten) , geordnet nach, wie aus dem Datum die Datensätze sind. Dieses Dashboard sollte nützlich sein fürERDDAP™Administratoren und Endbenutzer, wenn sie wissen wollen, welche Datensätze aktuell sind. Für aktuelle Datensätze gibt es vermutlich ein Problem mit der Datenquelle, so dassERDDAP™ist nicht in der Lage, Daten von neueren Zeitpunkten zu sehen / zu vergessen.
Administratoren: Wenn Sie keine Out-Of-Date Datasets Webseite wünschen, fügen Sie diese zu Ihrem setup.xml hinzu:
            &lt;outOfDateDatasetsActive&gt;false&lt;/outOfDateDatasetsActive&gt;
Es gibt jetzttestOutOfDateund raus In derallDatasetsDatensatz.
Dank Bob Simons, der das seit Jahren gewollt hat, und den cleveren Menschen des irischen Marine Institutes, die mir die Inspiration über ihren dedizierten Raspberry Pi und Monitor gab, die immer einen solchen Bildschirm in ihrem Büro zeigt.
        * VERBESSERT:.htmlTableund.xhtmlDie Reaktion wird nun besser formatiert, kompakter und damit schneller geladen. Dank HTML5 und CSS.
    * NEU Ausgabedateityp für Rasterdatensätze: .timeGaps. Es zeigt eine Liste von Lücken in den Zeitwerten, die größer sind als die mediane Lücke. ([Beispiel](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) Dies ist nützlich fürERDDAP™Administratoren und Endbenutzer, wenn sie wissen wollen, ob es unerwartete Lücken in den Zeitwerten für einen Datensatz gibt, der regelmäßig beabstandete Zeitwerte erwartet. Dank Bob Simons und Roy Mendelssohn, die diese Funktion brauchten.
    * IMPROVED: Das Standarddiagramm für dieallDatasetsdataset ist jetzt eine Karte mit x=maxLon und y=maxLat. Dank John Kerfoot, Rich Signell und OOI-CI.
    * NEU:[Erddapy](https://github.com/ioos/erddapy)-- ist keinERDDAP™Funktion, aber wird für viele von Interesse seinERDDAP™Benutzer. Erddapy (ERDDAP™+Python) einPythonBibliothek erstellt von Filipe Fernandes, "nutzt den Vorteil vonERDDAP'RESTfulWeb-Dienste und schafft dieERDDAP™URL für jede Anfrage wie die Suche nach Datensätzen, die Erfassung von Metadaten, das Herunterladen von Daten usw.." Dank an Filipe Fernandes.
    * Ich hätte schon mal sagen sollen: Es gibt ein R-Paket von Drittanbietern, das die Arbeit mitERDDAP™von innerhalb R:[Rerddap](https://github.com/ropensci/rerddap#rerddap). Dank[ROpensci](https://ropensci.org/)und Roy Mendelssohn.
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:**   
     
    * TO DO: In setup.xml, rechts unten&lt;adminInstitution&gt;, bitte einfügen&lt;adminInstitutionUrl&gt; tag, der eine URL für Ihre Institution angibt (oder Gruppe) .
    * TO DO: Diese 3 Tags in setup.xml werden nicht mehr verwendet:
        &lt;Start HeadHtml&gt;&lt;startBodyHtml&gt; und&lt;EndBodyHtml&gt;. Sie ersetzt durch
        &lt;StartHeadHtml5&gt;,&lt;startBodyHtml5&gt; und&lt;endBodyHtml5&gt;, die Standardwerte in Nachrichten angegeben haben.xml (und unten gezeigt) .
        
Wir empfehlen die Verwendung des Standards&lt;startHeadHtml5&gt; und&lt;EndBodyHtml5&gt;.
Wir empfehlen: Wenn Sie Änderungen am Original vorgenommen haben&lt;startBodyHtml&gt; und/oder möchten Sie anpassenERDDAP™jetzt, bitte kopieren Sie das neue&lt;startBodyHtml5&gt; tag (von unten) in Ihre setup.xml und modifizieren Sie es, um IhreERDDAP™undERDDAP's Webseiten reflektieren Ihre Organisation, nichtNOAA ERD. Bemerkenswert, ändern Sie bitte die "Brought to you by" zu Ihrer Organisation (S) . Wenn Sie Hilfe benötigen, bitte E-Mailerd.data at noaa.gov. (Wenn Sie nicht Ihre anpassen wollenERDDAP™jetzt verwenden Sie den Standard&lt;startBodyHtml5&gt;.)
        
Dann löschen Sie die 3 alten Tags in Ihrem setup.xml, die nicht mehr verwendet werden.

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

Es gibt zusätzliche Möglichkeiten, die Sie können[AnpassungERDDAP™](/docs/server-admin/deploy-install#customize)alsoERDDAP's Webseiten reflektieren Ihre Organisation stattNOAA ERD.
        
    * TO DO: Die&lt;EDDGrid...Example&gt; Tags (beginnend mit&lt;EDDGridIdExample&gt;) und&lt;EDDTable... Beispiel &gt; Tags (beginnend mit&lt;EDDTableIdExample&gt;) in Ihrer setup.xml-Datei verwendet werden, um Beispiele im Raster zu erstellen undtabledapDokumentation. html Webseiten in IhremERDDAP.
        
Wenn Sie diese Tags nicht angepasst haben, löschen Sie sie bitte von Ihrer setup.xml-Datei. Jetzt haben sie alle Standardeinstellungen in message.xml, die sich auf Datensätze in Bob's beziehenERDDAP™bei https://coastwatch.pfeg.noaa.gov/erddap/index.html . So müssen Sie nicht mehr bestimmte Datensätze in IhremERDDAP. Wenn Sie die Standardeinstellungen überschreiben möchten, kopieren Sie einige oder alle diese Tags in Ihre setup.xml und ändern Sie ihre Werte.
Wenn Sie möchten, dass die Beispiele auf IhreERDDAP™Die einfachste Methode ist:
        
        1. Fügen Sie diese beiden Datensätze in IhrenERDDAP™durch das Hinzufügen vondatasets.xml:
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Fügen Sie diesen Tag zu Ihrem setup.xml hinzu, aber ändern Sie die URL zu IhremERDDAP' (https?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Wenn Sie diese Tags angepasst haben, lassen Sie sie wie es ist und fügen Sie bitte diese 2 neuen Tags zu Ihrem setup.xml hinzu, um dieERDDAP™URL für diese Datensätze, aber ändern Sie die URL auf IhreERDDAP' (https?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * TO DO:ERDDAP™verwendet nun eine css-Datei namens erddap2.css. Wenn Sie Änderungen vorgenommen haben\\[Tomcat\\]/webapps/erdap/images/erddap.css, betrachten ähnliche Änderungen an erddap2.css (im gleichen Verzeichnis) .
    * NEU:ERDDAP's Webseiten haben jetzt eine große Anzahl von fast unsichtbaren internen Links (der Text ist schwarz und nicht unterstrichen) . Wenn Sie über einen dieser Links schweben (in der Regel die ersten Worte der Überschriften und Absätze) , der Cursor wird eine Hand. Wenn Sie auf den Link klicken, ist die URL der interne Link zu dem Abschnitt des Dokuments. Dies macht es einfach, sich auf bestimmte Abschnitte der Dokumentation zu beziehen. Vielen Dank an Bob Simons, der das seit Jahren wollte.
    * NEU:ERDDAP™jetzt unterstützt[Byte Range / Accept-Ranges](https://en.wikipedia.org/wiki/Byte_serving)Anfragen für Teile von /files/ Dateien. Dies wurde benötigt, um die Audio- und Video-Viewer in Browsern zu unterstützen.
    * TO DO: Jetzt, um die Sicherheit zu verbessern, wenn Sie angegeben&lt;baseHttpsUrl&gt; in setup.xml (und damit unterstützenhttps) , die empfohlene Flagge Url ist einhttpsURL mit einem sichereren FlagKey. Falls ja, wird jede vorherige FlaggeUrls/flagKeys ungültig. Admins: Wenn diese Änderungen für Sie geltenERDDAP™und wenn duERDDAP™hatEDDGridVonErddap und EDDTable VonErddap's abonnieren RemoteERDDAPs, dann, nach dem UpdateERDDAP, duERDDAP™wird automatisch versuchen, mit dem neuen FlagUrl zu abonnieren, so dass Sie die alten Abonnements löschen und die neuen Abonnements validieren sollten, wenn Sie die neuen Abonnement-Validierungs-E-Mails erhalten.
    * TO DO: Wenn SieERDDAP™hatEDDGridFromErddap-Datensätze für erdVH3-Datensätze auf Bob's CoastwatchERDDAP™, Bitte ändern Sie sie, um sich auf die neuen erdVH2018 Datensätze zu beziehen.
    * TO DO: Wenn Sie einen der jplAquariusSSS-Probedatensätze in IhremERDDAP™, Bitte ändern Sie "V4" in derdatasetID"V5".
    * TO DO:actual\\_rangeist jetzt ein CF Standard Attribut (als CF-1.7) und klar sagt, wenn die Variable verwendetadd\\_offsetund/oderscale\\_factordie Datenwerte zu verpacken,actual\\_rangeWerte sollten den ausgepackten Datentyp verwenden und ausgepackt werden. Leider widerspricht dies unserem vorherigen Rat. Datensätze generieren Xml entpackt jetzt verpacktactual\\_rangeWerte, aber das wird keine vorhandenen Datensätze in Ihremdatasets.xmlDatei.
        
So, bitte überprüfen Sie Ihre Datensätze: wenn die Werte einer Variablen verpackt sind und wennactual\\_rangewird als gepackte Datenwerte angegeben, bitte einfügen&lt;addAttributes&gt;actual\\_rangeWert, um die ausgepackten Werte anzugeben. Andernfalls wird der Datensatz nicht geladenERDDAP. Eine einfache und fast perfekte Möglichkeit, dies zu tun ist, um Ihre Suchedatasets.xmlfür die Quelle Attribute, die
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
undscale\\_factorandere als 1,0. Das sind dieactual\\_rangeAttribute, die Sie reparieren müssen.
        
Für Achsgrößen inEDDGridDatensätze,ERDDAP™immer setzt dieactual\\_rangeAttribut ist der tatsächliche Bereich der Werte, da es diese Werte kennt.
        
Für Achsengrößen mit absteigenden Werten (z.B. einige Breitenvariablen) ,ERDDAP™erstelltactual\\_rangemit\\[0)\\]...\\[Letzter Beitrag\\]Werte, die hoch waren. Jetzt verwendet es immer Low-High-Werte, um die neue CF-Definition zu machen.
        
Die Richtigkeit deractual\\_rangefür EDDTable-Datensätze besonders wichtig ist, weilERDDAP™Nutzeranfragen für Datenwerte, die weniger als dieactual\\_rangeMindestwert oder größer als deractual\\_rangeMaximalwert.
        
Verwandt: der eigentliche\\_min, tatsächlich\\_max,data\\_minunddata\\_maxAttribute werden abgeschrieben. Bitte konvertieren Sie Ihre Datensätze zur Nutzungactual\\_rangestatt.
        
    * HINWEIS (optional, aber empfohlen) : Für jeden Echtzeit- und Prognosedatensatz in IhremERDDAP™, bitte fügen Sie ein [&lt;testOutOfDate&gt; (/docs/server-admin/datasets#testoutofdate) tag mit einem Wert im Formularnow-_nUnits_, z.now-2 Tage. Ist der maximale Zeitwert für den Datensatz älter als dieser Wert, wird der Datensatz als aktuell betrachtet und als solcher auf dem[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)Seite. Dies bietet einen einfachen Weg, um zu sehen, wann etwas mit der Quelle eines Datensatzes falsch ist.
    *   [NEU: Semantische Markierung von Datensätzen mit json-ld (JSON Linked Data) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™jetzt verwendet[json-ld (JSON Linked Data) ](https://json-ld.org)um Ihren Datenkatalog und Ihre Datensätze zum Teil zu machen[semantisches Web](https://en.wikipedia.org/wiki/Semantic_Web), das ist Tim Berners-Lees Idee, Webinhalte mehr maschinell lesbar und Maschine "verstanden" zu machen. Suchmaschinen ([insbesondere Google](https://developers.google.com/search/docs/data-types/datasets)) und andere semantische Werkzeuge können diese strukturierte Markierung verwenden, um die Entdeckung und Indexierung zu erleichtern. Das json-ld strukturierte Markup erscheint als unsichtbar-zu-Menschen&lt;&#33; Code auf der http://.../erddap/info/index.html Seite (das eine semantische Bahn ist[Datenschutzerklärung](https://schema.org/DataCatalog)) und auf jeder http://.../erddap/info/_datasetID_/index.html Seite (das eine semantische Bahn ist[Datensatz](https://schema.org/Dataset)) . (Speziell dank Adam Leadbetter und Rob Fuller vom Marine Institute in Irland für die harten Teile der Arbeit, um diesen Teil derERDDAP.) 
    * NEU: Es gibt neue Datensätze, die Daten aus Audiodateien lesen können:
        [EDDGridVonAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), die Audiodaten als Rasterdaten behandelt.
        [EDDTableFromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), die Audiodaten als tabellarische Daten behandelt. Dank Jim Potemra, Rich Signell, OOI und Carrie Wall Bell für Anfragen an Audio/Hydrophone-Datei-Unterstützung.
    * Änderungen an Datasets generieren Xml (und damit verbundene Änderungen) :
        * NEU:ERDDAP™hat jetzt ein System automatisch[Aktualisierung von Off-of-date URLs](/docs/server-admin/additional-information#out-of-date-urls)beide in GenerateDatasets Xml und beim Laden von Datensätzen. Wenn Sie Vorschläge für zusätzliche URLs haben, die erwischt und aktualisiert werden sollten, oder wenn Sie denken, dass dies in einen Dienst umgewandelt werden sollte (wie die Konverter) , bitte E-Mailerd.data at noaa.gov.
        * NEU: Jetzt, wenn GenerateDatasets Xml sieht eine CFstandard\\_name  (Das sollte alles sein) mit einem Großbuchstaben, fügt es die gesamte Kleinbuchversion hinzu&lt;addAttributes&gt;. Auch, wenn ein Datensatz lädt, wennERDDAP™sieht eine CFstandard\\_namemit einem Oberkörper-Charakter, ändert es stillstandard\\_name. Dank Rich Signell.
        * NEU: Jetzt, wenn GenerateDatasets Xml sieht ein Attribut mit einer Zeit, die nicht im ISO 8601 Format ist, es fügt die ISO 8601 formatierte Zeit zu&lt;addAttributes&gt;. wennERDDAP™das Format nicht erkennt, es lässt den Zeitwert unverändert. Wenn Sie ein Format sehen, dasERDDAP™nicht erkennen und beheben, bitte E-Mail es anerd.data at noaa.gov.
        * IMPROVED: Der Low-Level-Code für dieEDDGridVonThredds Katalogoption in GenerateDatasets Xml setzt nun auf dieUnidatanetcdf-java Katalog Raupencode (Drredds. Katalogklassen) so dass es alle THREDDS Kataloge handhaben kann (die überraschenderweise komplex sein kann) . Dank Roland Schweitzer für diesen Wandel und dankUnidatafür den Code.
        * NEU: Datasets generieren Xml fürEDDGridVonDap fügt nun ", startYear-EndYear" zum Titelende basierend auf aktuellen Zeitachsenwerten hinzu. EndYear="präsent", wenn Daten in den letzten 150 Tagen vorhanden sind.
        * NEU: Datasets generieren Xml fürEDDGridFromDap fügt jetzt ",\\[Entschließung\\]°" auf den Titel, wenn der Datensatz gleichmäßig beabstandet ist und das gleiche für Lat und lon.
        * IMPROVED: Der Zeitkonverter hat nun zusätzliche Funktionen, insbesondere die Fähigkeit, Stringzeiten in einer Vielzahl von gängigen Formaten in ISO 8601 Strings oder in eine UDUnits-kompatible Zahl umzuwandeln. Alle zuvor unterstützten Funktionen funktionieren unverändert.
        * BUG FIX: Datensätze generieren Xml und der Schlüsselwörter-Konverter enthalten jetzt "Earth Science &gt; " zu Beginn von GCMD Science Keywords. Wenn ein Datensatz geladen wirdERDDAP™,ERDDAP™korrigiert jetzt alle GCMD-Keywords in dem Keywords-Attribut, die nicht mit "Earth Science &gt; " beginnen oder das alles andere als Titel Fall verwenden (wo der erste Buchstabe jedes Wortes kapitalisiert wird) .
        * VERBESSERT: Wenn Sie vorschlagen&lt;destinationName&gt;'s, GenerateDatasets Xml für EDDTableFromAsciiFiles benutzte gerade das SchwanzendesourceNamemit'/'  (einige waren Dateiname) . Jetzt verwendet es die gesamtesourceName(z.B. "blahblahblah (m/s)". Diese Änderung wird für einige Datensätze gut sein und nicht für andere, aber es ist sicherer Verhalten. Dank Maurice Libes.
        * BUG FIX: Datensätze generieren Xml und die Dataset-Konstrukteure sorgen nun dafür, dass es keine doppelten Spaltennamen gibt. Dank Maurice Libes.
        * BUG FIX: Datensätze generieren Xml für EDDTableFromAsciiFiles hat nicht geschrieben&lt;SpalteSeparator&gt; zum Ausgang. Jetzt schon. Dank Maurice Libes.
    * NEU: Das DasDds-Tool druckt nun Zeitlücke Informationen aus (die[.timeGaps Informationen](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) wenn der Datensatz ein netzgebundener Datensatz ist.
    * NEU: Advanced Search akzeptiert jetzt die Zeitwerte "now_\\-nUnits_". Dank Rich Signell.
    * IMPROVED: Um die Sicherheit zu verbessern, wenn eine E-Mail-Adresse in den Metadaten oder Daten eines Datensatzes auf eine HTML-Webseite geschrieben wird, wird die "@" durch " ersetzt. Dies erfasst nur E-Mail-Adressen, die der gesamte Metadaten- oder Datenwert sind, nicht E-Mail-Adressen, die in längeren Werten eingebettet sind.
    * VERBESSER: Um die Sicherheit zu erhöhen, dieRSSInformationen für private Datensätze sind nun nur den Benutzern zugänglich (undRSSLeser) die eingeloggt und berechtigt sind, diesen Datensatz zu verwenden.
    * NEU: Nun, wenn ein Datensatz geladen wird, wenndate\\_created,date\\_issued,date\\_modified, oder Datum\\_metadata\\_modified Attribut hat einen Zeitwert, der nicht im ISO 8601 Format ist,ERDDAP™ändert es an der ISO 8601 formatierten Zeit. wennERDDAP™das Format nicht erkennt, es lässt den Zeitwert unverändert. Wenn Sie ein Format sehen, dasERDDAP™nicht erkennen und beheben, bitte E-Mail es anerd.data at noaa.gov.
    * IMPROVED: .dods Antworten vonEDDGridDatensätze sollten nun deutlich schneller sein. Dank Rich Signell.
    * Änderungen im Zusammenhang mitERDDAP„Erstellung von ISO 19115-Dokumenten:
        * BUG FIX: bei der Erstellung von ISO 19115-DokumentendataVariableEinheiten wurden nicht HTML Attribut codiert und Prozent kodiert. Jetzt sind sie es. Dank des ISO 19115-Validators von NGDC.
        * BUG FIX: bei der Erstellung von ISO 19115-Dokumentendate\\_createdwie es ist, so oft war das falsche Format. Jetzt wird es in ISO 8601 Z String umgewandelt. Dank des ISO 19115-Validators von NGDC.
        * BUG FIX: bei der Erstellung von ISO 19115-DokumentenERDDAP™jetzt länger schreibt Termine mit Jahr=0000 (wie mit Klimadatensätzen) , weil das ISO 19115 Schema keine Termine mit Jahr=0000 erlaubt. Dank des ISO 19115-Validators von NGDC.
    * NEU: Wie vor einer Anfragehttp.../erddap/version wird nur die Versionsnummer zurückgeben (als Text) , z.B. "ERDDAP\\_version=1.82".
Jetzt eine Anfrage anhttp.../erddap/version\\_string gibt eine Nummer und einen optionalen Suffix von '\\_' plus ASCII Text zurück (keine Leerzeichen oder Kontrollzeichen) , z.B. "ERDDAP\\_version\\_string=1.82\\_JohnsFork". Die Leute, die die Gabel machen, werden dies durch Ändern der EDStatic.erddapVersion festlegen. Diese Art zu tun, es verursacht keine Probleme für frühere Versionen vonERDDAP. Dank Axiom (vor allem Kyle Wilcox) und das irische Meeresinstitut (vor allem Rob Fuller) .
    * BUG FIX: Für wms version=1.3.0, anforderung=GetMap, crs=EPSG:4326 (nicht CRS:84) Anfragen: die bbox Bestellung muss minLat,minLon,maxLat,maxLon sein. Für CRS:84 Anfragen, wie vor, bbox bestellen muss minLon,minLat,maxLon,maxLat sein. Dies kann mitERDDAP'WMS1.3.0 Service inArcGIS  (dank Paola Arce) . Danke. (nicht) bisOGCum das so kompliziert zu machen. DankLeafletum das richtig zu handhaben und mir einen Weg zu geben, das zu testen.
    * IMPROVED: Vorheriger Link fürRSSund E-Mail-Abonnements hat diehttpURL für IhreERDDAP. Jetzt ist eshttpsURL, wenn das aktiv ist.
    * NEU:EDDGridKopieren unterstützt jetzt einen optionalen Tag&lt;nurSince&gt;_someValue&lt;/onlySince&gt;, wobei der Wert eine bestimmte ISO-8601-formatierte Zeit oder einenow-nUnits (z.B.,now-2 Jahre) Zeit. Siehe[nur Seit der Dokumentation](/docs/server-admin/datasets#onlysince). Danke an Drew P.
    * VERBESSERT: Wenn verfügbar,ERDDAP™wird zeigenhttpsURL (aus&lt;baseHttpsUrl&gt;, falls vorhanden) anstelle derhttpURL, wenn es den Benutzern die URL sagt, um ein Abonnement hinzuzufügen/zu validieren/zu löschen/ zu erstellen.
    * BUG FIX:ERDDAP™jetzt erlaubt eine Abonnement-Aktion mit " https://" . (Bob schlägt seine Stirn.) Danke an Jennifer Sevadjian.
    * BUG FIX:.jsonlKVPjetzt verwendet ':' zwischen jedem Schlüssel und Wert, anstatt'='. (Bob schlägt seine Stirn.) Danke an Alexander Barth.
    * BUG FIX: Zuvor, wenn Sie neu gestartetERDDAP™mit quickRestart=true, und wenn, bevor der Datensatz in der Regel neu geladen wurde, haben Sie einen Anruf zu einem EDDTableFromFiles-Datensatz gemacht, der updateEveryNMillis verwendet, und wenn eine Datendatei gerade geändert wurde, würde die Anfrage mit einem Nullzeiger-Fehler scheitern. Jetzt wird die Anfrage erfolgreich sein. Dank John Kerfoot.
    * NEU: Wenn ein Datensatz geladen wirdERDDAP™, die Keywords werden nun in sortierte Reihenfolge umgeordnet und alle neuen Linienzeichen werden entfernt.
    * VERBESSERT: Wenn ein .geoJson,.jsonoder.ncoJson Anfrage hat.jsonp-Parameter, der Antwort-Mime-Typ ist Anwendung / Javascript. Anmerkung:.jsonp wird nicht unterstützt.jsonlCSVoder.jsonlKVP, da es nicht funktioniert. Danke an Rob Fuller.
    * IMPROVED: Der mime-Typ für json lines fileType-Optionen ist jetzt "application/x-jsonlines". Es war Anwendung/Jsonl. Derzeit gibt es keine endgültige richtige Wahl.
    * IMPROVED: Die Anzahl der auf der status.html-Seite angezeigten fehlgeschlagenen Anfragen wird steigen, weil mehr Dinge als zuvor, z.B. ClientAbortException, als Fehler gezählt werden.
    * VERBESSERT: Nun, wenn eine Antwort vonERDDAP™wird nicht komprimiert, dann wird der Header der Antwort "Content-Encoding"="identity" enthalten.
    * VERBESSERT: Das Attribut "license" wurde nicht benötigt. Nun, wenn es nicht spezifiziert ist, der StandardLicense von messages.xml (oder von setup.xml wenn vorhanden) wird als Standard verwendet.
    * NEU: Es gibt jetzt einen optionalen[DateiAccessSuffix Attribut](/docs/server-admin/datasets#fileaccessbaseurl). die mit dem vorhandenen[DateiAccessBaseUrl Attribut](/docs/server-admin/datasets#fileaccessbaseurl).
    * IMPROVED: Um die Sicherheit zu erhöhen, wurde diese Version mit der neuestenJavaJDK v8u162.
    * NEU: Um die Sicherheit zu erhöhen, mehrere gemeinsame Domains, die temporäre E-Mail-Adressen anbieten (z.B. @mailinator.com) sind jetzt auf einer permanenten E-Mail-Blackliste für das Abonnement-System.
    * NEU: Um die Sicherheit zu erhöhen, beinhalten die Höhen im Daily Report jetzt:
Auf den Wunschzettel Flagge IP Adresse nicht verfügbar (seit letztem Tagesbericht)   
Auf den Wunschzettel Flagge IP Adresse nicht verfügbar (seit Start)   
Auf den Wunschzettel Flagge IP Adresse besetzt (seit letztem Tagesbericht)   
Auf den Wunschzettel Flagge IP Adresse besetzt (seit Start)   
Die "Failed" Talies lassen Sie sehen, wer (einen Hacker?) versucht, eine Flagge zu setzen, aber scheitert.
    * IMPROVED: Um die Sicherheit zu erhöhen, E-Mail-Adressen in der&lt;AboEmailBlacklist&gt; in Ihremdatasets.xmlwerden nun als fallunempfindlich angesehen.
         

## Version 1.80{#version-180} 
 (veröffentlicht 2017-08-04) 

*    **Neue Features (für Benutzer) :**   
     
    * NEUorderByCount () filter lässt Sie angeben, wie die Ergebnistabelle sortiert wird (oder) und gibt nur eine Zeile für jede Sortengruppe zurück, wobei die Anzahl der Nicht-Sende-Werte für jede Variable zählt.
Zum BeispielorderByCount ("stationID") wird sortiert habenstationIDund eine Zeile für jedestationID, mit einer Zählung der Anzahl der Nichtzulässigkeitswerte für jede Größe.
Wenn Sie nur angebenorderByCount (") , die Antwort wird nur eine Zeile mit der Anzahl der nicht-missing-Werte für jede Datengröße sein.
Siehe[orderBy... Dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)Danke an Ben Adams.
    * NEU.ncoJson Datei Geben Sie die Option für gegitterte und tabellarische Datensätze ein. Diese Option macht einenNCOlvl=2 "pedantic" JSON-Datei mit allen Informationen, die normalerweise in einer.ncDatei. Vgl.[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)Danke an Charlie Zender.
    * BUG FIX: DieorderBy... () Optionen auf der Make A Graph Webseite werden nun korrekt behandelt.
    * BUG FIX: .geoJson-Ausgang druckt nun keine Zeilen, in denen die Lat- oder lon-Werte fehlen. Auch Höhenwerte (wenn verfügbar) werden nun in die Koordinaten aufgenommen, nicht als Datenwerte. Danke an Jonathan Wilkins.
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:**   
     
    * SICHERHEIT ISSUE: Die Protokolle.js Bibliothek für dieOpenLayersdemo auf demWMSSeiten inERDDAP™ist nicht aktuell und hat einen Fehler, der es möglicherweise erlaubt, missbräuchlich verwendet werden. (Leider aktualisiertOpenLayersund Protokolle. js ist nicht einfach.) Das eröffnet die Möglichkeit, dass die Bibliothek eingerichtet werden könnte, um eine Cross-Site-Verwundbarkeit zu ermöglichen. DaERDDAP™nur VerwendungenOpenLayersspezifisch voreingestellt und nur spezifischERDDAP-basierte Datenquellen, glauben wir, dass es keine Cross-Site-Verwundbarkeit inERDDAPVerwendungOpenLayersund Protocols.js. Aber wenn Sie das nicht glauben, können Sie jetzt die Verwendung derOpenLayersdemo auf demWMSSeiten IhrerERDDAP™durch Hinzufügen
```
        <openLayersActive>false</openLayersActive>  
```
auf Ihre setup.xml-Datei. Der Standard ist "wahr". Dank Charles Carleton und NCEI.
    * SECURITY CHANGES: Unused .jar Dateien und doppelte .jar Dateien (weil sie auch in netcdfAll.jar sind) werden entfernt habenERDDAP™Verteilung. Nicht aktuelle .jar Dateien wurden aktualisiert. Dank Charles Carleton und NCEI.
    * VERÄNDERUNGEN DER SICHERHEIT: Die netcdfAll.jar-Datei mitERDDAP™ist die neueste Version (Derzeit 4.6.10) , aber es enthält immer noch interne jackson .jar Dateien, die bekannt sind, um nicht aktuell zu sein und Sicherheitslücken haben, vor allem die Jackson-Bibliotheken, die nur beim Zugriff auf Amazon S3-Datenquellen verwendet werden. Wenn Sie nicht über Amazon S3 auf Daten zugreifen (du würdest wissen, ob du) Diese Schwachstellen sind nicht relevant.
        
Die netcdf-java-Entwickler behaupten, dass diese Schwachstellen wegen der Art, wie Netcdf-Code diese Bibliotheken verwendet, nicht relevant sind und in jedem Fall nur für den Zugriff auf Amazon S3 relevant wären. Vgl.[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866). Ich glaube ihnen. Wenn Sie noch Bedenken haben, wenden Sie sich bitte an die netcdf-java Entwickler. (Beachten Sie, dass, wenn Sie nicht glauben, die netcdf-java Entwickler und betrachten nicht mitERDDAP™Sie sollten deshalb auch nicht THREDDS verwenden, weil THREDDS Netcdf-java grundsätzlicher und umfassender verwendet alsERDDAP.) 
        
Details: Der störende Code und die Sicherheitswarnungen sind:
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
Vgl. https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- hoch
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
Vgl. https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- hoch
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml
Vgl. https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- hoch
Vgl. https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Kritisch
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Vgl. https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- hoch
Vgl. https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Kritisch
"Für Version 4.6.10 zieht aws-java-sdk-core in Version 2.6.6 von Jackson-\\* Artefakte." (E-Mail von netcdf-java people) .
Dank Charles Carleton und NCEI.
        
    * VERWENDUNGSBEREICH: Wenn Sie recompilierenERDDAP™, beachten Sie, dass der für die Befehlszeile benötigte -cp-Classpath-Parameter jetzt viel kürzer ist als zuvor. Sehen Sie die neue -cp-Einstellung in[Diese Dokumentation](/docs/contributing/programmer-guide#development-environment). Dank Charles Carleton und NCEI.
    * NEUE OPTION in GenerateDatasets Xml: EDDTableFromBcodmo, das ist nur für den internen Gebrauch bei BCO-DMO.
Dank Adam Shepherd und BCODMO.
    * NEUE ATTRIBUTE und FEATURE: Wenn eine EDDTable Spalte Dateinamen von webfähigen Dateien hat (z.B. Bild-, Video- oder Audiodateien) , Sie können hinzufügen
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
zur Angabe der Basis-URL (mit /) benötigt, um die Dateinamen in vollständige URLs zu machen. Dann.htmlTableAntworten,ERDDAP™den Dateinamen als Link zur kombinierten URL anzeigen (die Basis Url plus Dateiname) .
Wenn du willstERDDAP™um die zugehörigen Dateien zu bedienen, machen Sie einen separaten EDDTableFromFileNames-Datensatz für diese Dateien (es kann ein privater Datensatz) .
Dank Adam Shepherd und BCODMO.
    * NEU ATTRIBUTE EMPFEHLUNG: Wenn eine EDDTable Spalte Dateinamen von webfähigen Dateien hat (z.B. Bild-, Video- oder Audiodateien) die über ein Archiv zugänglich sind (z.B.,.zipDatei) über eine URL zugänglich, Nutzung
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
die URL für das Archiv angeben.
Wenn du willstERDDAP™um die Archivdatei zu bedienen, machen Sie einen separaten EDDTableFromFileNames-Datensatz für diese Datei (es kann ein privater Datensatz) .
Dank Adam Shepherd und BCODMO.
    * VERBESSUNGEN zur Generierung von Datensätzen Xml die Ursachen von ungültig/schlecht zu entfernen&lt;subsetVariables&gt; Vorschläge und Duplikat/schlecht vorgeschlagene Variablennamen usw. Dank Rich Signell, Adam Shepherd und BCO-DMO.
    * NEU: Die politische Grenzinformation, die mitERDDAPist von einem Dritten und etwas außerhalb des Datums. Auch gibt es bestrittene Grenzen an mehreren Orten der Welt, wo unterschiedliche Menschen unterschiedliche Vorstellungen darüber haben, was richtig ist. Wir haben kein CLAIM über den KORREKT der POLITIKBEREICH DATEN, die mitERDDAP. Wenn Sie die politischen Grenzinformationen nicht mögen, die mitERDDAP™, Sie können jetzt sagenERDDAP™nie politische Grenzen zu ziehen, indem man
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
auf Ihre setup.xml-Datei. Der Standard ist "wahr". Dank Raju Devender.
    * NEUE METADATA TAG: In derdatasets.xmlfür einen Datensatz können Sie nun die Standardnummer der Farbe angeben Stangenabschnitte für einedataVariableauf Diagrammen und Karten mit
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (default=-1, was sagt zu lassenERDDAP™Entscheidung) . Siehe[Farbe Bareinstellungen](/docs/server-admin/datasets#color-bar-attributes).
    * VERBESSERT: Die Zustandsgrenzfarbe auf Karten war lila (Deep Purple für Sie Baby Boomers) . Jetzt ist es grau (zwischen der nationalen Grenze grau und dem Land grau) .
    * BUG FIX:&lt;iso19115File&gt; und&lt;fgdcFile&gt;datasets.xmlwurden nicht immer korrekt behandelt. Jetzt sind sie es. Dank an BCO-DMO.

## Version 1.78{#version-178} 
 (veröffentlicht 2017-05-27) 

*    **Neue Features (für Benutzer) :**   
     
    *    (keine)   
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:**   
     
    * IMPROVED: Die Reihenfolge der Zeilen in "Major LoadDatasets Time Series" auf der status.html-Seite ist jetzt neu auf oben auf älteste unten.
    * BUG FIX:ERDDAP™jetzt schreibt.nccsvDateien mit der Zeitvariablenactual\\_rangeals ISO-8601 String-Zeit. Das korrigiert den Fehler mit EDDTableFromErddap Parsing-Info von einem Remote-Datensatz und von der QuickRestart-Datei für alle EDDTableFrom...Files-Datensätze. (Die Zeitactual\\_rangewird das erste Mal falsch sein, wenn der Datensatz in v1.78 geladen wird, aber korrekt, nachdem er neu geladen wurde, z.B. wenn Sie den Datensatz markieren.) 

## Version 1.76{#version-176} 
 (veröffentlicht 2017-05-12) 

*    **Neue Features (für Benutzer) :**   
     
    * CHANGE in Tomcat: Für AnfragenERDDAP™aus anderen Software als Webbrowsern kommen (z.B.,curlR,Matlab,Python,Java) :
Wie bei früheren Änderungen in Versionen von Tomcat (die untere Software, die läuftERDDAP) seit Anfang 2016 muss immer mehr der Zeichen im Abfrageteil der Anfrage-URL sein[ **Prozentsatz kodiert** ](/docs/server-admin/datasets#infourl)aus Sicherheitsgründen. Browser kümmern sich um prozentuale Kodierung für Sie. mitERDDAP™in einem Browser wird nicht betroffen, es sei denn, die Anfrage wird auf einen anderen umgeleitetERDDAP.
    * VERBESSERT: Zuvor,ERDDAP™behandelt **Ausgewählte Variablen** mehr wie unsignierte kurze ganze Zahlen als Zeichen. Jetzt behandelt es sie mehr wie 1-Charakter-langes UCS-2 (Unicode) Strings. Siehe[dokumentation](/docs/server-admin/datasets#char). Dank Aurelie Briand und dem Argo-Projekt.
    * VERBESSERT: Zuvor,ERDDAP™kleine Unterstützung für **Unicode Zeichen** über Zeichen #255 in Strings. Jetzt, intern,ERDDAP™voll unterstützt 2-byte UCS-2 Zeichen (Zeichen nummeriert 0 bis 65535) in Strings. Wenn String-Daten in verschiedene Dateitypen geschrieben werden,ERDDAP™macht das Beste, um 2-Byte-Wagen zu unterstützen. Ein weiteres Beispiel sind .csv-Dateien, dieERDDAP™schreibt mit dem ISO-8859-1 Zeichensatz (ein 1-Byte-Charakter) , soERDDAP™schreibt alle Zeichen über Zeichen #255 mit der JSON-like \\u_hhh_ syntax. Vgl.[String-Daten](/docs/server-admin/datasets#string).
    * VERBESSERT: In.ncDateien geschrieben vonERDDAP™, char Variablen, die als Strings interpretiert werden, haben das Attribut
         **\\_Encoding=ISO-8859-1**   
In.ncDateien, die vonERDDAP™, Char-Variablen mit "\\_Encoding" werden als Strings mit dem angegebenen Charset interpretiert.
    * REMINDER:ERDDAP™Stützen **JSON-ähnliche Gegenverschlüsselung** von Sonderzeichen, wenn Sie Einschränkungen von Zeichen- und Zeichenvariablen angeben. So können Sie etwas wie &myString="\\u20ac" anfordern, wenn Sie Datenzeilen wünschen, bei denen myString=€ seit 20ac die hexadezimale Version des Codepunktes für das Euro-Symbol ist. Mehrere Quellen im Web zeigen die Codepunktzahlen für Unicode-Symbole, z.B.[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode).
    * VERBESSERT: Zuvor,ERDDAP™begrenzte Unterstützung für **lange ganze Zahl** Variablen. JetztERDDAP™voll unterstützt intern und tut sein Bestes, wenn Sie lange Daten auf verschiedene Dateitypen schreiben. Siehe[lange Dokumentation](/docs/server-admin/datasets#long). Dank des irischen Marine Institute, Craig Risien, Rich Signell, Christopher Wingard und OOI.
    * NEU: Ausgabedateityp für griddap undtabledap: **.nccsv** , dieNetCDF- wie ASCII, CSV-Datei, die auch alle Metadaten enthält, die in einer vergleichbaren.ncDatei. Siehe[NCCSV Spezifikation](/docs/user/nccsv-1.00). Danke an Steve Hankin.
    * NEU: **orderByClosestFilter** lässt Sie angeben, wie die Ergebnistabelle sortiert wird und ein Intervall (z.B. 2 Stunden) . Innerhalb jeder Sortiergruppe werden nur die dem Intervall am nächsten liegenden Zeilen gehalten. Zum BeispielorderByClosest ("stationID, Zeit, 2 Stunden") wird sortiert habenstationIDund Zeit, aber nur die Zeilen für jedestationIDwo der letzteorderBySpalte (Zeit) am nächsten 2 Stundenintervalle. Das ist das nächstetabledapum Werte in einer Netzabfrage zu streichen. Diese Option kann über jedetabledapdatasets .html-Webseite, .graph-Webseite und von jeder URL, die Sie selbst generieren. Dank des irischen Marine Institute and Ocean Networks Canada.
    * NEU: **orderByLimitFilter** lässt Sie angeben, wie die Ergebnistabelle sortiert wird und eine Limitnummer (z.B. 100) . Innerhalb jeder Sortengruppe werden nur die ersten 'begrenzten' Zeilen aufbewahrt. Zum BeispielorderByMax ("stationID, 100") wird sortiert habenstationID, aber nur die ersten 100 Zeilen für jedestationID. Dies ist ähnlich wie SQLs LIMIT-Klausel. Diese Option kann über jedetabledapdatasets .html-Webseite, .graph-Webseite und von jeder URL, die Sie selbst generieren. Dank des irischen Marine Institute and Ocean Networks Canada.
    * NEU: Zwei neue Antwort-Dateitypen, **.jsonlCSVund.jsonlKVP** für Anfragen an netzgebundene Datensätze, tabellarische Datensätze und viele andere Orte inERDDAP  (z.B. Anfragen an Informationen über Datensätze) . Die Dateien sind JSON Lines Dateien ([ https://jsonlines.org/ ](https://jsonlines.org/)) wobei jede Zeile ein separates JSON-Objekt aufweist..jsonlCSVhat nur die Werte in einem CSV-Format..jsonlKVPhat Schlüssel: Wertepaare. Jede Linie steht auf eigene Faust. Die Leitungen sind nicht in einem größeren JSON-Array oder Objekt eingeschlossen. Zum Beispiel siehe[Diese Musteranforderung](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z). Dank Damian Smyth, Rob Fuller, Adam Leadbetter und Irlands Marine Institute.
    * NEU: Es gibt neue Dokumentationen[ **Zugriff auf private Datensätze inERDDAP™via Scripts** ](/docs/user/AccessToPrivateDatasets). Danke an Lynn DeWitt.
    * VERBESSERT: Das Mindestmaß des **OpenLayers** Karte war 2 Grad und ist jetzt 4 Datenpixel. Danke an Rusty Holleman.
    * VERBESSERT: In einigen Fällen sind Anträge, die eine **regelmäßiger Ausdruck** constraint wird viel schneller verarbeitet.
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:**   
     
    *    **SLOW FIRST STARTUP:** Das erste Mal, wenn Sie diese neue Version starten, dauert es lange fürERDDAP™alle Datensätze laden, weil sie alle Quelldatendateien erneut lesen müssen (obwohl nur der Header für netzgebundene Datendateien) . Wenn Sie die Protokolle betrachten, können Sie Fehlermeldungen sehen, die "alte/ununterstützte erweitertVersion" von einigen internen Dateien sagen -- das ist okay --ERDDAP™die neuen Versionen der internen Dateien. Bitte geduldig sein.
    * ACTION:ERDDAP™jetzt nutzt die neue **java.time** Klassen (auch bekannt als JSR 310) anstatt Joda, String-Zeiten in numerische Zeiten zu parsen. Anmerkungen:
        * wennERDDAP™hat plötzlich Probleme, String-Zeiten für einen bestimmten Datensatz zu parsing und wandelt so einfach die meisten oder alle Zeiten in NaN's um (fehlende Werte) , das Problem ist fast immer mit dem Datum Zeitformat-String, den Sie als "Einheiten" der Variablen angegeben haben. Das neue System benötigt manchmal einen etwas anderen DatumTime Format string.
        * Wenn numerische Monate und Tage im Datum Zeitfolgen nicht 0-gepolstert sind (z.B. "3/7/2016") , stellen Sie sicher, dass das Format nur eine einzelne M und d hat (z.B. "M/d/yyyy", nicht "MM/dd/yyyy") .
        * Ändern Sie alle fraktionierten Sekunden Spezifikation, die Kleinbuchstaben verwendet (z.B. die .ss inyyyy-MM-dd'T'HH:mm:ss.ss) , ins Kapital S's, (z.B.,yyyy-MM-dd'T'HH:mm:ss.SSS) .
        *   ERDDAP™nicht mehr unterstützt string date Zeitformate mit zweistelligen Jahren (y) mit einem impliziten Jahrhundert (z.B. 1900 oder 2000) . Unternehmen verbrachten Milliarden von Dollar, um dieses Problem in den späten 1990er Jahren zu beheben. Wissenschaftler sollten nicht zweistellige Jahre verwenden. Bitte reparieren Sie die Quelldatei (S) durch Umwandeln in 4-stellige Jahre, dann verwenden Sie yyyyy im Datum Zeitformat.
        * Sie können Yyyy oder YYYY verwenden (dieERDDAP™in uuuu umwandelt) 4stellige Jahre, einschließlich negativer Jahre, z.B. -4712 (mit 4713 BC) . Dank SeaDataNet, Thomas Gardner und BODC.
        * Bitte verwenden Sie Z innerhalb eines DateTime-Formats, um zu erhaltenERDDAPeinen Zeitversatz (z.B. Z, +0200, -08, -0800, -08:30) .
        *    **Stellen Sie sicher, dass SieJavaVersion 1.8.0\\_21 oder höher.** 
        * Programmierer -- Wenn Sie schreibenJavaProgramme, die laufenERDDAP™Code, Sie müssen die Referenz auf joda-time entfernen. jar im Klassenpfad-Parameter.
    * NEU:ERDDAP'[Archiv Datensatz-Tool](/docs/server-admin/additional-information#archiveadataset)können jetzt erstellen[ **BagIt Dateien** ](https://en.wikipedia.org/wiki/BagIt). NCEI kann auf diesem Format standardisieren. Dank Scott Cross und John Relph.
    * IMPROVED: Die Links zum Download der erdddap. Krieg gegen dieERDDAP™Web-Seiten zeigen nun **GitHub** . (Sie sind öffentliche Links, also müssen Sie nicht GitHub beitreten.) Dies bedeutet viel schnellere Downloads (bis 12Mb/s gegen 1Mb/s) und wenige Probleme mit Downloads. Dank Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney und Irlands Marine Institute.
    * VERBESSERT: Die **status.html Seite und die tägliche Status Report E-Mail** enthält jetzt einen Abschnitt "Major LoadDatasets Time Series", der Statistiken überERDDAP™ab dem Ende jedes großen LoadDatasets für die letzten 100 großen LoadDatasets. Dank unserer beunruhigenden RAID.
    * NEU: ein neuer, optional (aber empfohlen) Parameter für EDDTableFromCassandra-Datensätze: [ ** &lt;PartitionKeyCSV&gt; ** &#33; (/docs/server-admin/datasets#partitionkeycsv) . Dank Ocean Networks Kanada.
    * NEU: EDDTableFromAsciiFiles unterstützt jetzt ** &lt;SäuleSeparator&gt; ** Parameter. Wenn null oder "", wird die Klasse wie früher, Andernfalls, die erste Zeichen wird als Spaltentrenner beim Lesen der Dateien verwendet. Dank Sky Bristol und Abigail Benson.
    * Neu: der neue Datensatztyp,[ **EDDTableFromNccsvFiles** ](/docs/server-admin/datasets#eddtablefromnccsvfiles), kann einen Datensatz durch Aggregation machen[NCCSV .csv Dateien](/docs/user/nccsv-1.00). Danke an Steve Hankin.
    * VERBESSERT: **EDDTableFromErddap** jetzt verwendet.nccsvum Informationen aus der Ferne zu erhaltenERDDAPs und für das lokale Archiv dieser Metadaten-Info. Dies ermöglicht die volle Unterstützung für die Char und die langen Datentypen und für Unicode (UCS-2) charset für chars und Strings. Dank Rob Fuller und Irlands Marine Institute.
    * VERBESSERT: EDDTableFromErdap undEDDGridFromErddap unterstützt jetzt ** &lt;Umleitung&gt;false&lt;/redirect&gt; ** was sagtERDDAP™niemals die Anfrage an die Fernbedienung umleitenERDDAP. Der Standard ist wahr. Dies ist nützlich, wenn die FernbedienungERDDAP™ist ein privaterERDDAP. Dank Damian Smyth, Rob Fuller und Irlands Marine Institute.
    * VERBESSERT:ERDDAP™jetzt fangen **gelöschte Nutzeranfragen** früher. UndERDDAP™schaltet nun schneller ab, weil die Low-Level-Gewinde schneller abschalten. Dank unserer beunruhigenden RAID.
    *    **Datensätze generieren Xml:** 
        * NEU: Der neue spezielle EDDType "ncdump" druckt ein[ncdump](https://linux.die.net/man/1/ncdump)\\-ähnlicher Ausdruck des Headers eines.ncDatei. Sie können auch die Datenwerte für bestimmte Variablen drucken. (oder geben Sie "Nichts" ein, um keine Datenwerte zu drucken) . Dies ist nützlich, weil, ohne ncdump, es schwer ist zu wissen, was in einer Datei ist und somit welche EDDType Sie für GenerateDatasetsXml festlegen sollten. Dank Craig Risien, Rich Signell, Christopher Wingard und OOI.
        * NEU: Für Seedaten Nettodaten:
Gegebenenfalls generieren Sie Datasets Xml führt nun eine bestimmte semantische Konvertierung mittels einer Remote SPARQL-Abfrage durch: Wenn die Quellmetadaten einer Variable einen sdn\\_parameter\\_urn umfasst, z.B. sdn\\_parameter\\_urn = "SDN:P01::PSLTZZ01", GenerateDatasets Xml wird das entsprechende P02-Attribut hinzufügen, z.B. sdn\\_P02\\_urn = "SDN:P02::PSAL". Wenn Sie Datensätze haben, die diese Attribute verwenden, und wenn SieERDDAP'&lt;categoryAttributes&gt; in setup.xml enthält sdn\\_parameter\\_urn und sdn\\_P02\\_urn, Benutzer können verwendenERDDAP™Kategorie-Suchsystem zur Suche nach Datensätzen mit bestimmten Werten dieser Attribute. Dank BODC und Alexandra Kokkinaki.
        * VERPROVED: Datensätze generieren Xml ändert jetzt vielehttp://Referenzen in den Metadatenhttps://gegebenenfalls.
        * VERPROVED: Datensätze generieren Xml versucht nun, Schöpfer\\_type und Publisher\\_type zu erraten.
        * IMPROVED: Die von GenerateDatasets vorgeschlagenen Daten der Variablen Xml wird jetzt etwas besser. Dank Margaret O'Brien, LTER und EML.
        * VERPROVED: Datensätze generieren Xml ist besser bei der Angabe der&lt;cdm\\_data\\_type&gt; und Hinzufügen der entsprechenden, erforderlichen Attribute (z.&lt;cdm\\_timeseries\\_variables&gt;), so dass Sie diese Informationen liefern können. Dank Rich Signell.
        * VERBESSERT: In GenerateDatasets Xml, für EDDTable-Datensätze, der Vorschlag für&lt;subsetVariables&gt; ist jetzt viel konservativer. Dank John Kerfoot.
        * VERBESSERT: Wenndatasets.xmlfür einen Datensatz spezifiziertfeatureTypeaber nicht cdm\\_data\\_type,featureTypewird als cdm\\_data\\_type verwendet. Dank Rich Signell.
        * BUG FIX: erzeugen Datensätze Xml schlägt jetzt die richtige&lt;dataTyp&gt; für Datengrößen, diescale\\_factor,add\\_offsetund/oder \\_Unsigned Attribute.
    * VERBESSERT: WannERDDAP™öffnet.ncDatei, die **kürzer** als es sein sollte (z.B., es wurde nicht vollständig kopiert) ,ERDDAP™behandelt nun die Datei so schlecht. Zuvor,ERDDAP™zurückgegeben fehlende Werte für einen fehlenden Teil der Datei, weil dies das Standardverhalten für netcdf-java ist.ERDDAP™jetzt nutzt ucar.nc2.iosp.netcdf3.N3header.disallowFileTruncation = true; Dank unserer beunruhigenden RAID und Christian Ward-Garrison.
    * IMPROVED: Der ISO 19115 Schriftsteller nutzt jetzt **Hersteller / Typ** , wenn vorhanden.
    * VERBESSERT:ERDDAP™jetzt nutzt die neueste netcdf-java v4.6.9, die zusätzliche Arten von **netcdf-4 Dateien** . Dank Craig Risien, Rich Signell, Christopher Wingard und OOI.
    * BUG FIX: Probleme vermeiden, wenn verschiedene Quelldateien verschiedene Datentypen für eine bestimmte Variable haben. Dank Roy Mendelssohn und Eugene Burger.
    * BUG FIX: **Umrechnungen des Zeitformats** sind nun besser vor schlechten Zeitwerten geschützt. Dank NDBC.
    * BUG FIX:EDDGridVon NcFiles Ausgepackt behandelt jetzt Zeitwerte mit **"Monate seit ..." und "Jahre seit ..."** richtig (durch Inkrementierung des Monats oder Jahres, nicht durch rohes Hinzufügen z.B. 30days wiederholt) . Dank Soda3.3.1.
    * BUG FIX: nur in v1.74, **Abonnements** eine Aktion erforderlich (z.B.,http://...) , das war und sollte optional sein.
    * BUG FIX:EDDGridVonMergeIRFiles.lowGetSourceMetadata () keine globalen Attribute hinzufügen. Jetzt schon.
         

## Version 1.74{#version-174} 
 (veröffentlicht 2016-10-07) 

*    **Neue Features (für Benutzer) :**   
     
    * Jetzt, wenn eine Liste von Datensätzen (Alle oder von einer Suche) wird auf einer Webseite angezeigt, lange Titel werden auf mehreren Zeilen angezeigt. Bisher wurde die Mitte eines langen Titels durch "... " ersetzt. Dank Margaret O'Brien, LTER und EML.
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:**   
     
    * TO DO: Ändern Sie auf Linux-Computern die Apache-Timeout-Einstellungen, so dass zeitraubende Benutzeranforderungen nicht Timeout (mit dem, was oft als "Proxy" oder "Bad Gateway"-Fehler erscheint) . Als root-Benutzer:
        
        1. Ändern der Apachehttpd.conf Datei (meist in /etc/httpd/conf/) :
Ändern der bestehenden&lt;Timeout&gt; Einstellung (oder eine am Ende der Datei hinzufügen) bis 3600 (Sekunden) , anstatt der Standard 60 oder 120 Sekunden.
Ändern der bestehenden&lt;ProxyTimeout&gt; Einstellung (oder eine am Ende der Datei hinzufügen) bis 3600 (Sekunden) , anstatt der Standard 60 oder 120 Sekunden.
        2. Neuart Apache: /usr/sbin/apachectl -k anmutig (aber manchmal ist es in einem anderen Verzeichnis) .
        
Danke an Thomas Oliver.
         
    * NEU:\\[BigParentDirectory/hard Flaggenverzeichnis
Dies funktioniert wie das Flag-Verzeichnis, aber die HardFlag-Version löscht auch alle Datensatzinformationen. Es gibt keine URLs, um eine hardFlag. Dies kann nur durch das Setzen einer Datei in diesem Verzeichnis verwendet werden.
hart Flaggen sind sehr nützlich, wenn Sie etwas tun, das eine Veränderung in der Art verursachtERDDAP™liest und interpretiert beispielsweise die Quelldaten, wenn Sie eine neue Version vonERDDAP™oder wenn Sie bestimmte Arten von Änderungen an der Definition eines Datensatzes vorgenommen habendatasets.xml. Vgl.[Diese Dokumentation](/docs/server-admin/additional-information#hard-flag). Dank John Kerfoot und allen Argo Gruppen.
         
    * NEU: Datasets generieren Xml hat jetzt eine EDDTableFromEML Option
die eine Datensatzbeschreibung in einer ökologischen Metadatensprache liest (EML) Datei, lädt die zugehörige Datendatei herunter und erzeugt ein Stückdatasets.xmlso dass der Datensatz hinzugefügt werden kannERDDAP. Es gibt auch eine EDDTableFromEMLBatch, die das gleiche für alle EML-Dateien in einem Verzeichnis macht. Dies funktioniert sehr gut, weil EML eine hervorragende Arbeit zur Beschreibung des Datensatzes leistet und weil KNB und LTER die eigentlichen Datendateien zur Verfügung stellen.
EML plusERDDAP™könnte eine tolle Kombination sein, daERDDAP™könnte den Nutzern einen direkten Zugriff auf die Fülle von KNB- und LTER-Daten geben und diesen Projekten helfen, die US-Regierung zu treffen[Öffentlicher Zugang zu Forschungsergebnissen (PARR) Anforderungen](https://nosc.noaa.gov/EDMC/PD.DSP.php)durch Bereitstellung der Daten über einen Webservice.
Vgl.[Diese Dokumentation](/docs/server-admin/EDDTableFromEML). Dank Margaret O'Brien, LTER und EML.
         
    * NEU: Datasets generieren Xml hat jetzt eine EDDTableFromInPort Option
die eine Datensatzbeschreibung in einer InPort XML-Datei liest und versucht, ein Stück vondatasets.xmlso dass der Datensatz hinzugefügt werden kannERDDAP. Dies schafft selten einen gebrauchsfertigen XML-Chunk fürdatasets.xml, aber es wird einen guten groben Entwurf schaffen, der ein guter Ausgangspunkt für die Bearbeitung durch einen Menschen ist.
Es wäre toll, wenn Menschen, die InPort verwenden, um ihre Datensätze zu dokumentieren, auch verwenden würdenERDDAP™die tatsächlichen Daten überERDDAPWebdienste und damit die US-Regierung undNOAA'[Öffentlicher Zugang zu Forschungsergebnissen (PARR) Anforderungen](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)durch Bereitstellung der Daten über einen Webservice. Dies ist eine Lösung, die jetzt verwendet werden könnte. (erd.data at noaa.govist glücklich zu helfen.)   
Vgl.[Diese Dokumentation](/docs/server-admin/datasets#eddtablefrominport). Dank Evan Howell und Melanie Abecassis.
         
    * VERBESSERT:ERDDAP™jetzt nutzt netcdf-java 4.6.6.
Mit früheren Versionen, netcdf-java einige Füllwerte lesen (vielleicht, nur in netcdf-4 Dateien) als 0. Jetzt liest es einige von ihnen als netcdf Standard-Füllwert: -127 für Bytes, -32767 für Shorts, -2147483647 für Ints.Unidatasagt, das neue Verhalten ist das richtige Verhalten. Wenn eine Variable in einem Datensatz anfängt, einen dieser Werte anzuzeigen, wo sie früher 0's zeigen, können Sie z.
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
zu der VariablenaddAttributeszu sagenERDDAP™diesen Wert alsmissing\\_value/\\_Fill Wert. In vielen Fällen ergibt sich jedoch nicht das gewünschte Ergebnis: 0'. Wenn ja, betrachten Sie die Änderung der Dateien mitNCOoder die Dateien neu schreiben. Beschwerden? Bitte kontaktieren Sie unsUnidata;-)
         
    * TO DO: Neue TopographieDepth Palette
Ich ermutige Sie, alle Datensätze zu wechseln, die die OceanDepth-Palette verwenden, um die neue TopographyDepth-Palette zu verwenden, die wie Topographie ist, mit Ausnahme der Farben, die gekippt werden, so dass es für Tiefenwerte geeignet ist (Positiv::down) , statt Höhenwerte (Positiv::up) . Die empfohlenen Einstellungen für diese Palette sind:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * NEUE FEATURE: Streichungmissing\\_valueund/oder \\_FillValue
Wenn eine String-Variable a definiertmissing\\_valueund/oder \\_FillValue,ERDDAP™diese Werte nun aus den Daten entfernen und durch einen leeren String ersetzen, so dass fehlende Werte wie bei anderen Datensätzen als leere Strings angezeigt werdenERDDAP. Dank Margaret O'Brien, LTER und EML.
         
    * NEUE FEATURE: Unterstützung für lokale Zeiten
Zeitstempelvariablen mit Quelldaten von Strings können nun über eine " eine Zeitzone angebentime\\_zone" Attribut, das führtERDDAP™um die lokalen Zeitzonen-Quellenzeiten zu konvertieren (einige in Standardzeit, einige in Tageslicht Sparzeit) inZuluZeiten. Die Liste der gültigen Zeitzonennamen ist wahrscheinlich identisch mit der Liste in der TZ Spalte in[Diese Tabelle](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Der Standard ist "Zulu". Gemeinsame US-Zeitzonen sind: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Eastern. Für Zeitstempelvariablen mit numerischen Quelldaten können Sie die "time\\_zone"Attribut, aber der Wert muss "Zulu" oder "UTC". Dank Margaret O'Brien, LTER und EML.
         
    * NEW FEATURE: EDDTableFromAsciiFiles unterstützt jetzt Semikolon-getrennte Dateien
und ist klüger darüber, den Separator auszugestalten. Dank Margaret O'Brien, LTER und EML.
         
    * NEUE FEATURE: Wenn es einen signifikanten Fehler in loadDatasets gibt (Groß oder Klein, z.B. ein fehlender oder ungültigerdatasets.xmlDokument) ,ERDDAP™wird es jetzt in status.html angeben, direkt unter "n Datasets Failed To Load" als ERROR: während der Verarbeitungdatasets.xml: siehe log.txt für Details.
         
    * NEUE FEATURE:ERDDAP™sucht Waisen.
WannERDDAP™macht eine große Last Datasets, es sucht nun Waisendatensätze (Datensätze, die inERDDAP™aber nichtdatasets.xml) . Wenn gefunden, werden sie in status.html aufgelistet, direkt unter "n Datasets Failed To Load" als ERROR: n Orphan Datasets (Datensätze inERDDAP™aber nichtdatasets.xml) = ...
Wenn Sie entfernen möchten (Entladen) einer Waise ausERDDAP™, Sie müssen hinzufügen
        &lt;dataset type="_anyValidType_"datasetID= "_theDatasetID_" active="false" /&gt;
bisdatasets.xmlbis der Datensatz während der nächsten großen LoadDatasets entladen wird.
         
    * BUG FIX: Wenn ein Datensatz eine numerische Zeitstempelvariable mit anderen Einheiten als"seconds since 1970-01-01T00:00:00Z"und mit&lt;updateEveryNMillis&gt; system active, der Bereich der Zeitstempelvariablen wurde falsch gesetzt, wenn der Datensatz aktualisiert wurde. Dank John Kerfoot.
         
    * BUG FIX: Wenn&lt;quickRestart&gt; war wahr in setup.xml und Sie haben Daten von einem EDDTableFrom... Dateien-Datensatz, der verwendet wird&lt;updateEveryNMillis&gt;, die erste Anfrage an den Datensatz würde scheitern, aber spätere Anfragen würden erfolgreich sein. Jetzt wird die erste Anfrage nicht scheitern. Dank John Kerfoot.
         
    * BUG FIX: Die GenerateDatasetsXml.sh und .bat arbeiteten nicht mit &gt;9 Parametern auf der Kommandozeile. Jetzt schon. Dank John Kerfoot.
         
    * BUG FIX: Die neuen EDDTableFromMultidimNcFiles entfernten nicht konsequent Trailing-Räume von Strings. Jetzt schon. Besonders betroffen waren die ARGO-Dateien. Dank Kevin O'Brien und Roland Schweitzer.
         
    * BUG FIX: Alle Zugriff auf RemoteDAPDie Dienstleistungen werden nun durch moderneren Code initiiert. Dadurch wird der "connection Closed"-Fehler behoben, wenn auf einige EDDTableFromErddap-Datensätze zugegriffen wird. Danke an Kevin O'Brien.
         
    * BUG FIX: Die HandhabungorderBy... () und deutlich () sind nun zurück auf die Art, wie sie vor den jüngsten Änderungen waren: eine bestimmte Anfrage kann mehrereorderBy... () und/oder () Filter;ERDDAP™wird sie in der angegebenen Reihenfolge behandeln. Danke an David Karuga.
         
    * BUG FIX: Ist der Datensatz EDDTableFromDatabase und eine Abfrage hat[SourceCanOrderBy](/docs/server-admin/datasets#sourcecanorderby)und/oder[SourceCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct), dann kann die Datenbank (je nach Einstellungendatasets.xml) teilweise oder vollständig handhabbar **nur die erste**  orderBy. () oder deutlich () . Danke an David Karuga.
         
    * BUG FIX: Die jüngste Extra-Prozent-Kodierung verursachte Probleme mit einigen Abfragen für.ncCF-Dateien, z.B. "HTTP Status 500 - Query-Fehler: vari=station ist zweimal in der Ergebnisvariablenliste aufgeführt." Danke an Kevin O'Brien.
         
    * BUG FIX: EDDTableFromFiles hatte Schwierigkeiten, einen Datensatz neu zu laden, als eine der Spalten eine wahre Zeichenspalte war. Dank Roland Schweitzer.
         
    * BUG FIX:EDDGridVon NcFiles Entpackt jetzt auch Konvertermissing\\_valueund \\_FillValue zu Standardwerten, so dass Dateien mit verschiedenen Werten aggregiert werden können. Aufgrund dieser Änderung, nachdem Sie diese neue Version vonERDDAP™, bitte set a[hart Flagge](/docs/server-admin/additional-information#hard-flag)für jedeEDDGridVon NcFiles Ausgepackter Datensatz in IhremERDDAP.
         
    * VERBESSERT: EDDTableFromNcCFFiles kann nun Dateien behandeln, die mehrere Sample\\_dimensions haben. Ein vorgegebener Datensatz muss nur Variablen verwenden, die eine der Sample\\_Dimensions verwenden. Danke an Ajay Krishnan.
         
    * VERBESSERT: Für EDDTableFrom...Files,&lt;sortFilesBySourceNames&gt; jetzt erlaubt Komma getrennt (empfohlen) oder räumlich getrennte Listen mit variablen Quellnamen. In beiden Fällen können einzelne Variablennamen von doppelten Zitaten umgeben sein, z.B. wenn der Name einen Innenraum aufweist.

## Version 1.72{#version-172} 
 (veröffentlicht 2016-05-12) 

*    **Neue Features (für Benutzer) :** Keine.
     
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * NEU EDDTableFromMultidimNcFiles[EDDTableFromMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles)ist eine neue Alternative zu EDDTableFromNcFiles. Es ist entworfen, um mit Gruppen von Dateien mit mehreren Variablen mit gemeinsamen Dimensionen zu behandeln, z.B. var1\\[eine\\]\\[B.\\], var2\\[eine\\], var3\\[B.\\]ScalarVar. Dank des Argo-Projekts Aurélie Briand und Roland Schweitzer.
    * BUG FIX:ERDDAP™  (über die DateiVisitorDNLS und FileVistorSubdir Klassen) folgt nun symbolischen Links auf Linux.ERDDAP™immer noch nicht folgen .lnk's unter Windows.
    * BUG FIX von Bug in 1.70 eingeführt: deutlich +orderBywurden in einer Anfrage nicht gemeinsam erlaubt. Jetzt sind sie wieder. Sie sind nicht gegenseitig exklusiv/redundant. Danke an David Karuga.
    * VERÄNDERUNGdatasets.xmlschwarze Liste der IP-Adressen:
IP v4 Adressen erscheinenERDDAP™als 4 periodisch getrennte Hexenzahlen.
Ich glaube, IP v6 Adressen erscheinen als 8 kolonengetrennte Hexenzahlen.
So.ERDDAP™unterstützt nun Kolonen in den IP-Adressen in dieser Liste und :\\* am Ende der Liste, um eine Reihe von Adressen zu blockieren.
    * VERBESSERT:ERDDAP™jetzt verwendet NetcdfFileWriter zu schreiben.ncDateien statt der deprecated NetcdfFileWriteable. Es sollte keine erkennbare Änderung der resultierenden Dateien geben. Dies eröffnet die Möglichkeit, groß zu machen.ncDateien, die die.nc3 64bit Erweiterungen. Wenn Sie dies wünschen/benötigen, senden Sie bitte eine Anfrage anerd.data at noaa.gov.
    * IMPROVED: Viele der Links zu Remote-Websites waren nicht aktuell. Jetzt sind sie aktuell und nutzenhttps:anstatthttp: wann immer möglich.
    * Viele kleine Veränderungen.

## Version 1.70{#version-170} 
 (veröffentlicht 2016-04-15) 

*    **Neue Features (für Benutzer) :** Keine.
     
*    **DingeERDDAP™Administratoren müssen wissen und tun:** Im Folgenden gibt es einige empfohlene Änderungen an der Dokumentation in Ihrer setup.xml-Datei.
Bitte machen Sie diese Änderungen jetzt.
30 Minuten Arbeit können Sie jetzt Stunden der Verwirrung in der Zukunft retten.
    * Fehlerbehebung: Das Problem war, dass Anträge, die auf eine Fernbedienung umgeleitet wurdenERDDAPmit einem ungültigen Zeichen '|' Fehlermeldung. Dies geschah nur mit den jüngsten Versionen von Tomcat. Dank Rusty Holleman, Conor Delaney und Roy Mendelssohn.
    * Fehlerbehebung:ERDDAP™jetzt eine aktuelle Version von netcdf-java (Es ist eine lange Geschichte) die aktuelle Unterstützung für NcML beinhaltet, die das Problem mit NcML LogicalReduce behoben, nicht wie erwartet funktioniert. Es kann einige kleine Änderungen der Metadaten geben, dieERDDAP™liest über netcdf-java von.nc,.hdf, .grib und .bufr Dateien. Dank Favio Medrano.
    * Der neue[EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows)ermöglicht es Ihnen, einen zusammengefassten EDDTable-Datensatz aus zwei oder mehr EDDTable-Datensätzen zu erstellen, die dieselben Datenvariablen mit denselben Einheiten aufweisen. Danke an Kevin O'Brien.
    * Neue Optionen für EDDTableFromDatabase ([SourceCanOrderBy](/docs/server-admin/datasets#sourcecanorderby)und[SourceCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)) geben Sie an, obERDDAP™, die Datenbank oder beides klar und deutlich zu handhabenorderBy  (und alle Varianten) Einschränkungen. Danke an David Karuga.
    * Sie können nun die Grafiken und Metadaten eines privaten Datensatzes der Öffentlichkeit über den neuen [&lt;graphsAccessibleTo&gt;public&lt;/graphsZugang zu&gt;] (/docs/server-admin/datasets#graphsaccessibleto) tag. Dank Emanuele Lombardi.
    * Wenn ein String an GenerateDatasets übergeben wird Xml oder DasDds ist von doppelten Zitaten umgeben, es ist nicht zitiert (als ob es ein JSON-String ist) . Dank John Kerfoot und Melanie Abecassis.
    * Datensätze generieren Xml unterstützt jetzt "default" um den Standard und "Nichts" zu erhalten, um einen leeren String zu erhalten (sie arbeiten mit oder ohne Zitate) . Dies löst einige Probleme im Zusammenhang mit leeren Strings.
    * Jetzt in GenerateDatasets Xml, für alleEDDGridVonFiles und EDDTable AusFiles-Datensätze, wenn die Probe FileName, den Sie angeben, ist "" (die leere Saite) , es wird die letzte übereinstimmende DateiName aus dem Verzeichnis + regex + recursive=true.
    * Aktualisiert: Der DisplayInBrowser-Code, der verwendet wird, um die Ergebnisse von GenerateDatasetsXml und DasDds auf Linux-Computern anzuzeigen, war nicht aktuell und gab eine seltsame Nachricht über Netscape. Dies nutzt nun ein modernes Linux-Tool: xdg-open. Dank Melanie Abecassis.
    * DieallDatasetsDatensatz hat nun eine"files"Spalte, die die Basis-URL des /files-Links angibt (wenn es eine gibt) für den Datensatz.
    * Steigern Sie die allgemeine Sicherheit IhresERDDAP™durch Änderung der Berechtigungen, die mit dem tomcat-Verzeichnis und dem bigParentDirectory verbunden sind:
         (Die aktuellen Befehle unten sind für Linux. Für andere Betriebssysteme, machen analoge Änderungen.) 
        * Ändern Sie die "Gruppe" tomcat, Ihren Benutzernamen oder den Namen einer kleinen Gruppe, die tomcat und alle Administratoren von Tomcat/ERDDAP, z.
chgrp -R _yourUserName_ apache-tomcat-_8.0.23_
chgrp -R _your Benutzername bigParentDirectory_
        * Ändern Sie die Berechtigungen, damit Tomcat und die Gruppe Vorrechte gelesen, geschrieben, ausgeführt haben, z.
chmod -R ug+rwx apache-tomcat-_8.0.23_
chmod -R ug+rwx _bigParentDirectory_
        * Entfernen Sie die Berechtigungen von "anderen" Benutzern zum Lesen, Schreiben oder Ausführen:
chmod -R o-rwx apache-tomcat-_8.0.23_
chmod -R o-rwx _bigParentDirectory_
Dies ist wichtig, weil es verhindert, dass andere Benutzer möglicherweise sensible Informationen inERDDAP™Setup-Dateien, Log-Dateien und Dateien mit Informationen über private Datensätze.
    * Das Authentifizierungs-/Loginsystem wurde überarbeitet. Dank Thomas Gardner, Emanuele Lombardi und der neuen US-Regierung[HTTPS-Only Standard](https://home.dotgov.gov/management/preloading/dotgovhttps/).
        * Die Authentifizierung=geöffnete Option wurde entfernt. Es war nicht aktuell.
        * Die neue, empfohlen,[Authentisierung = Google](/docs/server-admin/additional-information#google)Verwendung der Option Google Anmelden (basierend auf OAuth 2.0) um jedem ein Google-E-Mail-Konto zu ermöglichen (einschließlich Google verwaltete Konten wie@noaa.gov) einloggen.
        * Das neue,[Authentisierung = E-Mail](/docs/server-admin/additional-information#email)Option ist ein Back-up für Authentifizierung = Google. Es ermöglicht Benutzern mit einem&lt;Benutzer-Tag indatasets.xmlum sich einzuloggen, indem Sie ihnen eine E-Mail mit einem speziellen Link senden.
        * In Ihrem setup.xml ändern Sie bitte die Beschreibung für&lt;Authentifizierung
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * In Ihrem setup.xml fügen Sie dies bitte direkt unter der&lt;VERFAHREN Tag
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * Benutzer, die nicht angemeldet sind, können jetzt verwendenhttpoderhttpsURLs (falls Sie eingerichtet haben)&lt;baseHttpsUrl&gt; in Ihrem setup.xml). Dank der neuen US-Regierung[HTTPS-Only Standard](https://https.cio.gov/).
        * Jetzt können Sie alle Benutzer ermutigen, zu nutzenhttps  (nichthttp) durch Einstellung&lt;baseUrl&gt; als einhttpsURL. Um die Benutzer nur zu zwingenhttps, Sie müssen auch Änderungen an Ihrem Apache/Tomcat-Setup vornehmen, um nicht-httpsZugang. Dank der neuen US-Regierung[HTTPS-Only Standard](https://https.cio.gov/).
            
In Ihrem setup.xml ändern Sie bitte die Beschreibung für&lt;BasisUrl&gt;
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * Die Optionen&lt;Passwort Encoding&gt; geändert. In Ihrem setup.xml ändern Sie bitte die Beschreibung für&lt;Passwort Encoding&gt; zu sein
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * In Ihrem setup.xml ändern Sie bitte die Beschreibung für&lt;baseHttpsUrl&gt;
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * Nun, wenn listPrivateDatasets=true in setup.xml, noch weniger Informationen werden über Datensätze angezeigt, auf die ein Benutzer keinen Zugriff hat.
    * Jetzt, vor allem, wenn Sie zunächst IhreERDDAP, Sie können jetzt sagenERDDAP™nicht zu versuchen, Remote abonnierenERDDAP™Datensätze. Dank an Filipe Rocha Freire.
In Ihrem Setup.xml, direkt vor&lt;fontFamily&gt;, bitte hinzufügen
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * In Ihrem Setup.xml, in den Anweisungen oben&lt;emailFromAddress&gt;, bitte einfügen:
Wenn möglich, setzen Sie diese auf eine sichere Verbindung (SSL / TLS) an den E-Mail-Server.
Wenn Ihr Setup keine sichere Verbindung zum E-Mail-Server nutzt, machen Sie bitte die Änderungen, um es so zu machen.
    * In deinemdatasets.xml, bitte diese Zeile zur Beschreibung hinzufügen&lt;AboEmailBlacklist&gt; in Ihremdatasets.xml:
Sie können den Namen "\\*" eine ganze Domäne, z.\\*@example.com .
    * Da die Änderung des Protokollierungssystems in v1.66 erfolgt, ist die Protokolldatei nie aktuell. Es gibt immer Nachrichten oder Teile von Nachrichten, die auf die Protokolldatei geschrieben werden. Jetzt können Sie es aktuell machen (für einen Augenblick) indem Sie IhreERDDAPStatus-Webseite auf http://_your.domain.org_/erddap/status.html .
    * HashDigest...
    * Eine kleine Veränderung (zu String2.kanonisch) Das sollte helfen, die Dinge schnell zu bewegen,ERDDAP™ist sehr beschäftigt und auch besser mit einer sehr großen Anzahl von Datensätzen zu behandeln.
    * Stark Empfohlen: Stoppen mit&lt;konvertierenToPublicSourceUrl&gt; indatasets.xmleine IP-Nummer in einem Datensatz umwandeln&lt;sourceUrl&gt; (z.B., http://192.168.#.#/ ) in einen Domainnamen (z.B.,http:my.domain.org/) . Ab sofort neue Abonnements http://localhost , http://127.0.0.1 , und http://192.168.#.# URLS wird aus Sicherheitsgründen nicht erlaubt. So nutzen Sie bitte immer den öffentlichen Domainnamen im&lt;sourceUrl&gt; tag (bei Bedarf aufgrund von DNS-Problemen) , Sie können die[/etc/hosts Tabelle auf Ihrem Server](https://linux.die.net/man/5/hosts)um das Problem zu lösen, indem lokale Domainnamen ohne Verwendung eines DNS-Servers in IP-Nummern umgewandelt werden. Sie können testen, ob ein bestimmter Domain-Name richtig behoben wird, indem Sie
ping _some.domain.name_
    * In generierenDatasets.xml, für Remote-Datensätze (z.B. von einem THREDDS-Server) , die automatisch generiertdatasetIDs sind für die meisten Domains unverändert. Für ein paar Domains, der erste Teil (d.h. der Name) der automatisch generiertendatasetIDwird etwas anders sein. Insbesondere Namen, die einen Teil hatten, sind jetzt wahrscheinlicher, zwei Teile zu haben. Zum Beispiel Datensätze von http://oos.soest.hawaii.edu vorher führtedatasetIDs, die mit hawaii\\_, aber jetzt führen zudatasetIDs, die mit hawaii\\_soest\\_ beginnen. Wenn dies Probleme für Sie verursacht, bitte mailen Sie mir. Es gibt vielleicht eine Arbeit.
    * Der Cassandra Treiber wurde auf cassandra-driver-core-3.0.0.jar und damit für Cassandra v3 aktualisiert. EDDTableFromCassandra nutzt keine neuen Features in Cassandra V3. Indexe in Cassandra können jetzt komplexer sein, aberERDDAP™noch verwendet das Cassandra v2 Indexmodell, das annimmt, dass eine indizierte Spalte direkt mit'='Einschränkungen. Datensätze generieren Xml für EDDTableFromCassandra erkennt Spalten nicht mehr mit Indizes; wenn ein Index einfach ist, müssen Sie es indatasets.xmlvon Hand. Wenn Sie Unterstützung für komplexere Indizes oder andere neue Funktionen benötigen, bitte E-Mailerd.data at noaa.gov.
&#33; Wenn Sie noch Cassandra 2.x verwenden, benutzen Sie bitte weiterERDDAP™v1.68 bis zum Upgrade auf die Verwendung von Cassandra 3.x.
    * Jars und der Classpath -- Fast alle der enthaltenen Drittanbieter .jar Dateien wurden auf ihre neuesten Versionen aktualisiert.
        * slf4j.jar wurde zu /lib und dem Klassenpfad hinzugefügt.
        * Witzig. jar und tsik. jar wurden von /lib und dem Klassenpfad entfernt.
        * Wenn Sie Fehlermeldungen über Klassen erhalten, die nicht gefunden werden, wenn Sie kompilieren oder ausführenERDDAP™oder eines seiner Werkzeuge, vergleichen Sie den Klassenpfad Ihrer Befehlszeile mitERDDAP'[Aktueller Klassenpfad](/docs/contributing/programmer-guide#development-environment)um herauszufinden, welche .jars von Ihrem Klassenpfad fehlt.

## Version 1.68{#version-168} 
 (veröffentlicht 2016-02-08) 

*    **Neue Features (für Benutzer) :** Keine.
     
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    *   [EDDGridFromFiles Aggregation über Dateinamen oder globale Metadaten](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)--
Alle VariationenEDDGridFromFiles kann nun eine Gruppe von Dateien aggregieren, indem eine neue linksste Dimension, in der Regel Zeit, basierend auf einem Wert aus jedem Dateinamen oder aus dem Wert eines globalen Attributs, das in jeder Datei ist.
    * VERBESSER: Wir haben vorhin vorgeschlagen, dass Sie eineEDDGridFromErddap Datensatz in Ihremdatasets.xmldass die jplMU referenziert und reserviertRSST-Datensatz in unseremERDDAP. Da nun eine neuere Version dieses Datensatzes vorliegt, wird dieser Datensatz jetzt depreciert. Wenn Sie diesen Datensatz in IhremERDDAP™, bitte diesen neuen Datensatz hinzufügen
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Wenn Sie den alten jplMU entfernen möchtenRSST-Datensatz von IhremERDDAP™  (Es ist deine Wahl) , ändern Sie seine aktive Einstellung von "wahr" zu "false".
    * Fehlerbehebung: Bitte überprüfen Sie das BigParentDirectory, das Sie in Ihrem setup.xml angegeben haben. Wenn Sie am Ende der&lt;bigParentDirectory&gt; Name, dannERDDAP™wird mehrere Verzeichnisse erstellt haben, indem Wörter direkt auf den Namen, den Sie angegeben haben, anstatt Unterverzeichnisse zu erstellen. Ab Version 1.68,ERDDAP™fügt einen Slash zum Ende des Verzeichnisnamens hinzu, wenn Sie keinen angeben. Also, wenn Sie vorher keine Slash am Ende, dann wenn Sie installierenERDDAP™v1.68 Sie müssen diese Verzeichnisse verschieben und umbenennen **nach** du schaltest die altenERDDAP™und **vor** Sie starten das neueERDDAP. Zum Beispiel, wenn Sie irrtümlich angegeben bigParentDirectory als /home/erddapBPD (kein nachlaufender Wimpern) undERDDAP™hat irrtümlich erstellt Verzeichnisse wie
/home/erddapBPDcache
/home/erddapBPDcopy
/home/erddapBPDdataset
/home/erddapBPDflag
/home/erddapBPDlogs
/home/erddapBPDlucene
und eine Datei namens /home/erddapBPDsubscriptionsV1.txt,
dann müssen Sie bewegen und umbenennen sie zu sein
/home/erddapBPD/cache
/home/erddapBPD/Kopie
/home/erddapBPD/dataset
/home/erddapBPD/flag
/home/erddapBPD/logs
/home/erddapBPD/lucene
und /home/erddapBPD/subscriptionsV1.txt
    * Fehlerbehebung: Es gab Fehler inEDDGridLonPM180 inERDDAP™v1.66, die aufgetreten ist, wenn der Kinderdatensatz einEDDGridVon Erddap.
    * Fehlerbehebung: Es gab einen Fehler inEDDGridVonFiles und EDDTable VonFiles inERDDAP™v1.66, verursacht&lt;updateEveryNMillis&gt;, um das erste Mal ignoriert zu werden, dass der Datensatz nach einem Neustart geladen wurde.
    * Fehlerbehebung/Neues Feature: Wenn ein Kind Daten innerhalbEDDGridGesamtexistenteDimension,EDDGridVerstanden.EDDGridVonEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy oder EDDTableFromEDDGridist ein ...FromErddap-Datensatz, dass Elterndatensatz jetzt abonniertERDDAP™Datensatz. WennERDDAP™Datensatz ist in der gleichenERDDAP™, das Abonnement und seine Validierung erfolgt direkt; Sie erhalten keine E-Mail, die Sie bitten, das Abonnement zu validieren. Andernfalls, wenn das Abonnementsystem für IhreERDDAP™wird ausgeschaltet,&lt;reloadEveryNMinutes&gt; Einstellung für den Stammdatensatz auf eine kleine Zahl (60?) so dass es aktuell bleibt.
    * Fehlerbehebung/Neues Feature: Wenn ein Kind Daten innerhalbEDDGridGesamtexistenteDimension,EDDGridVerstanden.EDDGridVonEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy oder EDDTableFromEDDGridhat active="false", dass Kinderdatensatz jetzt übersprungen ist.

## Version 1.66{#version-166} 
 (veröffentlicht 2016-01-19) 

*    **Neue Features (für Benutzer) :** 
    * Abbildungen (nicht Karten) kann nun Abwärtswerte auf den Achsen haben. Um dies zu erhalten, wenn Sie eine Make A Graph Webseite verwenden, ändern Sie neue Y Axis: aufsteigende Einstellung (Der Standard) zum Absteigen. Oder in einer URL, die ein Diagramm anfordert, verwenden Sie das neue optionale 3. '|' Parameter für die[&lt; Reichweite und/oder &. yRange Schalter](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands), die nichts sein können (Der Standard) , true, oder t, um aufsteigende Werte zu erhalten, oder verwenden Sie falsche oder f, um absteigende Werte zu erhalten. Die Wahrheit|falsche Werte sind unempfindlich. Dank Chris Fullilove, John Kerfoot, Luke Campbell und Cara Wilson.
    * Benutzer können nun die Hintergrundfarbe für Graphen festlegen, indem ein &.bgColor=0x_ AARRGGBB_ schaltet auf die URL, die den Graph anfordert. Siehe .bgColor im Bereich der Graphics Commands[Netzteil](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)und[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)Dokumentation. Dank John Kerfoot und Luke Campbell.
    * Für tabellarische Datensätze können sich die Zwänge jetzt auf min beziehen (_someVariableName_) oder max (_someVariableName_) . Vgl.[min () und max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min). Dank John Kerfoot.
    * Für tabellarische Datensätze, Zeitbeschränkungen, die[Jetzt](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)kann nun Zeiteinheiten von Millisekunden oder Millisekunden angeben.
    * Eine Anfrage für ein Bild eines tabellarischen Datensatzes macht nun eine Karte (nicht ein Diagramm) wenn die x- und y-Variablen Längs- und Breitenvariablen sind (Kompatible Einheiten) . Dank Rich Signell.
    * Fehlerbehebung: Zeitachsen-Etiketten und Zecken hatten manchmal seltsame Unregelmäßigkeiten, wenn Sie mehrere Diagramme gleichzeitig anfordern (z.B. auf einer Webseite) . Das Problem war ein Fehler in der SGT-Grafikbibliothek, dieERDDAP™Verwendung (eine Variable war "statisch", die nicht hätte sein sollen) . Danke an Bradford Butman.
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * Es ist ein Sicherheitsrisiko, um Ihr E-Mail-Passwort in eine einfache Textdatei wie setup.xml zu setzen. Um dieses Problem zu mildern, empfehlen wir Ihnen dringend:
        1. Ein E-Mail-Konto nur einrichtenERDDAPVerwendung, z.B. erddap@yourInstitution.org . Das hat auch andere Vorteile, insbesondere mehr als eineERDDAP™Administrator kann dann Zugang zu diesem E-Mail-Konto erhalten.
        2. Machen Sie die Berechtigungen der setup.xml Datei rw (Lesen Sie mehr) für den Benutzer, der Tomcat undERDDAP™  (User=tomcat?) und keine Berechtigungen (nicht lesen oder schreiben) für die Gruppe und andere Benutzer. Dank an Filipe Rocha Freire.
    * Der neue[ArchivADataset](/docs/server-admin/additional-information#archiveadataset)Werkzeug vereinfacht die Herstellung eines.tar.gzArchiv mit einer Teilmenge eines Datensatzes in einem für die Archivierung geeigneten Format (insbesondere beiNOAANZEI) . Dies sollte für viele nützlich seinERDDAP™Administratoren in vielen Situationen, aber vor allem für Gruppen innerhalbNOAA.
    * Der neue Datensatztyp[EDDGridVonNcFilesUnpacked](/docs/server-admin/datasets#eddgridfromncfilesunpacked)eine Variante vonEDDGridVon NcFiles. Der Unterschied ist, dass diese Klasse jede Datendatei entpackt, bevorEDDGridFromFiles betrachtet die Dateien:
        
        * Es entpackt gepackte Variablen, diescale\\_factorund/oderadd\\_offset.
        * Es fördert ganzzahlige Variablen, die \\_Unsigned=true-Attribute zu einem größeren Ganzzahl-Datentyp haben, so dass die Werte als unbezeichnete Werte erscheinen. Zum Beispiel ein \\_Unsigned=true byte (8 Bit) variabel wird ein signiert kurz (16 Bit) variabel.
        * Es konvertiert \\_FillValue undmissing\\_valueWerte für NaN's (oder MAX\\_VALUE für ganze Datentypen) .
        
Der große Vorteil dieser Klasse ist, dass es eine Möglichkeit bietet, mit verschiedenen Werten vonscale\\_factor,add\\_offset, \\_FillValue odermissing\\_valuein verschiedenen Dateien in einer Sammlung. Ansonsten müsst ihr ein Werkzeug wie[NcML](/docs/server-admin/datasets#ncml-files)oder[NCO](/docs/server-admin/datasets#netcdf-operators-nco)um jede Datei zu ändern, um die Unterschiede zu entfernen, so dass die Dateien vonEDDGridVon NcFiles. Damit diese Klasse richtig funktioniert, müssen die Dateien den CF-Standards für die zugehörigen Attribute folgen. Dank Philippe Makowski.
    * Der neue Datensatztyp[EDDGridLonPM180](/docs/server-admin/datasets#eddgridlonpm180)Sie können Datensätze ändern, die Längenwerte größer als 180 haben (z.B. der Bereich 0 bis 360) in Datensätze mit Längenwerten im Bereich -180 bis 180 (Longitude Plus oder Minus 180, daher der Name) . Der große Vorteil der Bereitstellung von Datensätzen mit Längenwerten im Bereich -180 bis 180 ist, dassOGCDienstleistungen (z.B.,WMS) Längenwerte in diesem Bereich erfordern. Dank Lynne Tablewski, Fabien Guichard, Philippe Makowski und Martin Spel.
2016-01-26 Update: Eeek&#33; Dies hat einen Fehler, der auftritt, wenn der Kinderdatensatz einEDDGridVonErddap, die einen Datensatz in der gleichenERDDAP. Dieser Fehler ist behobenERDDAP™V1.68.
    * In[GenerateDatasetsXml](/docs/server-admin/datasets#generatedatasetsxml), ein neuer Sonderdatensatztyp,EDDGridLonPM180FromErddapCatalog, können Sie diedatasets.xmlfürEDDGridLonPM180 Datensätze aus allenEDDGridDatensätze in einemERDDAPdie alle Längenwerte größer als 180 haben.
    * Für alleEDDGridDatensätze, indatasets.xmlSie können jetzt die optionale
(&lt;zugänglich ViaWMS&gt;wahr|falsch&lt;/erreichbar ViaWMS&gt; (/docs/server-admin/datasets#accessibleviawms)   (Standard=true) . dies auf falsche unzumutbar deaktivieren dieWMSService für diesen Datensatz. Falls zutreffend, kann der Datensatz überWMSaus anderen Gründen (z.B. keine Spitzen- oder Ionenachsen) . Dies ist besonders nützlich für Datensätze, die alleine existieren und vonEDDGridLonPM180, so dass nur die LonPM180-Version überWMS.
    * In setup.xml können Sie eine andere Standardfarbe für den Hintergrund der Grafiken angeben. Die Farbe wird als 8-stelliger hexadezimaler Wert in der Form 0x_AARRGGBB_ angegeben, wobei AA, RR, GG und BB die als 2-stellige hexadezimale Zahl angegebene Opazität, rote, grüne und blaue Komponenten sind. Beachten Sie, dass die Leinwand immer opak weiß ist, so ein (Halbzeug - Ja.) transparente Graph Hintergrundfarbe vermischt sich in die weiße Leinwand. Der Standard ist hellblau:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Dank John Kerfoot und Luke Campbell.
    * In setup.xml können Sie jetzt die maximale Größe für die[Logfile](/docs/server-admin/additional-information#log)  (wenn es umbenannt wird, um sich anzumelden. txt. früher und ein neues Protokoll. txt wird erstellt) in MegaBytes. Das Mindestmaß beträgt 1. Das zulässige Höchstmaß beträgt 2000. Der Standard ist 20 (MB) . Zum Beispiel:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * Indatasets.xml, [&lt;fgdcFile&gt; (/docs/server-admin/datasets#fgdcfile) oder [&lt;iso19115File&gt; (/docs/server-admin/datasets#iso19115file) kann nun eine lokale Datei sein (wie vor) oder eine URL (die heruntergeladen werden, so gibt es eine lokale Kopie) . wennERDDAP™ist nicht in der Lage, die Datei herunterzuladen, das Laden des Datensatzes wird fortgesetzt, aber der Datensatz hat keine fgdc- oder iso19115-Datei.
    *   EDDGridVonFiles und EDDTable FromFiles-Datensätze können jetzt einen schnellen Neustart durchführen (das System,ERDDAP™versucht zu verwenden, wenn die Datensätze zuerst geladen werden,ERDDAP™wird neu gestartet) . Dies beschleunigt NeustartERDDAP.
2016-01-26 Update: Eeek&#33; Dies hat einen Fehler, der Ursachen hat&lt;updateEveryNMillis&gt; wird zum ersten Mal ignoriert, wenn der Datensatz nach einem Neustart geladen wird. Dieser Fehler ist behobenERDDAP™V1.68.
    * Eine allgemeine Verbesserung des QuickRestart-Systems ermöglichtERDDAP™Datensätze schneller laden, wennERDDAP™wird neu gestartet.
    * AlleEDDGridVonFiles und EDDTable FromFiles Subclasses akzeptieren jetzt ein neues&lt;pathRegex&gt; tag, in der Regel direkt unten angegeben&lt;rekursiv&gt;. Wenn rekursiv "wahr" ist, nur volle Unterverzeichnisse, die dem Pfad entsprechenRegex (Standard="\\*") wird angenommen. In ähnlicher Weise a&lt;sourceUrls&gt; tag in einemEDDGridAggregateExistingDimension kann jetzt ein pathRegex Attribut enthalten (Standard="\\*") .
    * Der Standard&lt;partiellRequestMaxBytes&gt; in setup.xml ist jetzt 490000000 (~490 MB) . Dies vermeidet einige Probleme/Timeouts im Zusammenhang mit dem Erhalt von Daten von THREDDS-Datenservern. Danke an Leslie Thorne.
    * Eine kleine Änderung des Log-Systems sollte erlaubenERDDAP™besser reagieren, wenn es sehr, sehr beschäftigt ist. Informationen werden nun in die Log-Datei auf dem Laufwerk in ziemlich großen Stücken geschrieben. Der Vorteil ist, dass dies sehr effizient ist --ERDDAP™wird niemals verhindern, dass Informationen in die Protokolldatei geschrieben werden. Nachteilig ist, dass das Log fast immer mit einer Teilnachricht endet, die erst dann abgeschlossen werden wird, wenn der nächste Block geschrieben wird.
    * Fehlerbehebung im Zusammenhang mit inotify und die [&lt;UpdateEveryNMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis) System fürEDDGridVonFiles und EDDTable AusFiles-Datensätze: Es ist nicht mehr erforderlich, eine große von fs.inotify.max\\_user\\_watches oder fs.inotify.max\\_user\\_instances anzugeben. Es gibt einen Fehler inJavadas einige Teile verursachtJava's inotify/WatchDirectory System nicht Müll gesammelt werden, wenn sie abgeschlossen werden; schließlich würde die Anzahl der Zombie-Inotify-Uhren oder -Instanzen die angegebene maximale Anzahl überschreiten.ERDDAP™funktioniert jetztJavaBug.
Auch die Anzahl der inotify Threads ist auf der status.html Web-Seite aufgeführt, so dass Sie ein Auge auf seine Nutzung behalten können. Typischerweise gibt es 1 inotify Thread proEDDGridVonFiles und EDDTable AusFiles-Datensatz.
    * Fehlerbehebung: An vielen Stellen wurde anstelle eines Fehlers, der neu gezählt wurde, ein neuer Fehler erzeugt, der nur eine kurze Version der ursprünglichen Fehlermeldung und ohne die Stackspur beinhaltete. Wenn nun ein neuer Fehler generiert wird, enthält er die gesamte ursprüngliche Ausnahme, z.B. werfen neue Ausnahme ("einige neue Nachricht", e) ;
Danke an Susan Perkins.
    * Bug fix: bis vor kurzem (v1.64?) , wenn ein .../datasetIDURL wurde angefordert,ERDDAP™würde .html zur URL hinzufügen. In v1.64 scheiterte dies (eine falsch formatierte URL generiert und dann gescheitert) . Jetzt funktioniert das wieder. Danke an Chris Fullilove.

## Version 1.64{#version-164} 
 (veröffentlicht 2015-08-19) 

*    **Neue Features (für Benutzer) :** 
    * Es gibt nun Anleitungen für den Zugriff auf den passwortgeschützten privatenERDDAP™Datensätze (https://) übercurlundPython. Siehe[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)und[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)Anweisungen.
Dank Emilio Mayorga von NANOOS und Paul Janecek von Spyglass Technologies.
         
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    *   ERDDAP™jetzt erfordertJava1.8+.
        Java1.7 erreicht seine[Ende des Lebens](https://www.oracle.com/technetwork/java/eol-135779.html)  (keine Sicherheitsupdates mehr) im April 2015. Diese Version vonERDDAP™wird nicht mit Versionen vonJavaunter 1,8. Wenn Sie vonJava1.7. (oder früher) , Sie sollten auch aktualisieren Tomcat. Siehe[ERDDAP™Anweisungen einrichten](/docs/server-admin/deploy-install)zum Herunterladen von Links und Ratschlägen.
    * Neues Datenträgerformular.
Wenn ein Datenanbieter zu Ihnen kommt, in der Hoffnung, einige Daten zu Ihrem hinzufügenERDDAP™, kann es schwierig und zeitraubend sein, alle Metadaten zu sammeln, die benötigt werden, um den Datensatz inERDDAP. Viele Datenquellen (z.B. .csv-Dateien, Excel-Dateien, Datenbanken) keine internen Metadaten haben, alsoERDDAP™hat ein neues Data Provider-Formular, das Metadaten des Datenanbieters erfasst und dem Datenanbieter eine andere Anleitung gibt, einschließlich umfassender Anleitung für Daten in Datenbanken. Die vorgelegten Informationen werden in diedatasets.xmlFormat und dann an dieERDDAP™Administrator (du) und geschrieben (anhängig) zu bigParentDirectory/logs/dataProviderForm.log . So automatisiert die Form den Prozess der Eingabe eines Datensatzes inERDDAP™, aber dieERDDAP™Der Administrator muss diedatasets.xmlchunk und behandeln Sie die Datendatei (S) vom Anbieter oder der Verbindung zur Datenbank. Weitere Informationen finden Sie in der[Datenanbieter Bezeichnung](/docs/server-admin/datasets#data-provider-form).
    * Neu&lt;MatchAxisNDigits&gt;
kann verwendet werdenEDDGridVonFiles (und damit vonNcFiles und vonMergeIRFiles) ,EDDGridGesamtexistenteDimension,EDDGridKopieren undEDDGridSideBySide-Datensätze, um festzulegen, wie genau die Achsenwerte in verschiedenen Dateien entsprechen müssen (wie viele Ziffern) : 0 = keine Überprüfung (Nicht benutzen&#33;) , 1-18 zur Erhöhung der Präzision oder 20 (Der Standard) für genaue Gleichheit. Für n=1-18,ERDDAP™sorgt dafür, dass die ersten n Ziffern von Doppelwerten (oder (n+1) div 2 für Schwimmerwerte) sind gleich.
        &lt;matchAxisNDigits&gt; ersetzt&lt;sicherstellenAxisValuesAreEqual&gt;, das jetzt abgeschrieben wird. Ein Wert von 'true' wird in MatchAxisNDigits=20 umgewandelt. Ein Wert von „false“ (Tu das nicht&#33;) wird in Übereinstimmung umgewandelt AxisNDigits=0.
    *   EDDGridVonFiles und EDDTable FromFiles wird sehr langsam laden, wenn Sie diese Version verwendenERDDAP.
        ERDDAP™speichert nun die internen Dateiinformationen etwas anders, so dass die interne Dateitabelle für jeden dieser Datensätze neu erstellt werden muss. Keine Sorge. Nichts ist falsch. Es ist eine einmalige Sache.
    * Remote Source Dateien
        EDDGridFromNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles ermöglichen nun die Dateien in einem Verzeichnis, das vonhttp://  (und wahrscheinlichhttps://und ftp://, aber sie sind nicht getestet) wenn der Remoteserver unterstützt[Range Anfragen](https://en.wikipedia.org/wiki/Byte_serving)in der Anfrage Header. THREDDS und Amazon S3 Unterstützung Range Requests,Hyraxnicht. Dieses System ermöglicht es Ihnen, Daten in Remote-Dateien zuzugreifen, ohne die Dateien herunterzuladen (was hilfreich ist, wenn die Remote-Dateien zu voluminös sind) , aber der Zugriff auf diese Dateien wird viel langsamer als der Zugriff auf lokale Dateien oder sogar auf eine RemoteOPeNDAPQuelle.
Dies schließt ein"files"in einem Amazon S3 Eimer, da sie überhttp://. Wenn die S3 Objektnamen wie Dateinamen sind (mit internen /'s wie ein Linux-Verzeichnisbaum) ,ERDDAP™auch die Dateien über zugänglich machenERDDAP'"files"System. Damit dies funktioniert, müssen Ihre S3 Anmeldeinformationen in ~/.aws/credentials sein (auf Linux, OS X oder Unix) , oder C:\\Benutzer\\USERNAME\\.aws\\credentials (auf Windows) auf dem Server mitERDDAP. Siehe[Amazon SDK Dokumentation](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1).
    * Datensätze generieren Xml hat eine neue, ungewöhnliche Option: EDDsFromFiles.
Dies wird durch ein Dateisystem gehen (sogar ein Remote-System wie ein Amazon S3 wenn die Objekte dateiähnliche Namen haben) und diedatasets.xmlchunks für eine Reihe von Datensätzen. Ihre Meilen können variieren. Dies funktioniert gut, wenn die Dateien so organisiert werden, dass alle Datendateien in einem bestimmten Verzeichnis (und seine Unterverzeichnisse) geeignet für einen Datensatz (z.B. alle SST 1-Tage-Verbunde) . Andernfalls (z.B., wenn ein Verzeichnis einige SST-Dateien und einige Chlorophyll-a-Dateien enthält) , dies funktioniert schlecht, kann aber dennoch nützlich sein.
    * Programmierer: neue /lib .jar Dateien.
Wenn Sie kompilierenERDDAP™, bitte beachten Sie die neuen .jar-Dateien in der in derERDDAP™ [Programmer's Guide](/docs/contributing/programmer-guide).
    * Meer\\_Wasser\\_praktisch\\_Salinität
Wenn Sie den CF-Standardnamen sea\\_water\\_salinity für jede Variable verwenden, ermutige ich Sie, auf das Meer zu wechseln\\_water\\_practical\\_salinity, die in[Version 29 der CF-Standard-Namenstabelle](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (und einige frühere Versionen -- ich wusste nicht, dass) . Dieser Name gibt an, dass dies in der Tat ein praktischer Salinity-Wert ist, derPractical Salinity Units  (PSU) , im Gegensatz zu einem älteren g/kg Wert. Die kanonischen Einheiten sind unterschiedlich, aber immer noch unglaublich nicht hilfreich: 1 (vermutlich implizierenPSU/PSS-78) , im Gegensatz zu 1e-3 (vermutlich mit g/kg) für Meer\\_Wasser\\_Salinität.\\[Hey.Unidataund CF: Wir identifizieren Werte, die andere Waagen verwenden, beispielsweise Fahrenheit oder Celsius, über eine Einheitenkette, die der Name der Waage oder irgendeine Variation ist. Warum können wir nicht Salinitätseinheiten über ihre Skala identifizieren, z.B. PSS-78? Ich weiß: PSS-78 Werte sind "einheitlos", aber es gibt eine implizite Skala, nicht wahr? Wenn ich eine neue praktische Salinitätsskala erfinde, in der die Werte 0,875 mal die PSS-78 Werte sind, sollten die kanonischen Einheiten immer noch "1" sein? Wie konnte ein Benutzer sie auseinander erzählen? Einheiten von 1e-3 und 1 sind weder beschreibend noch hilfreich für Benutzer, die versuchen herauszufinden, was die Zahlen zeigen.\\]

## Version 1.62{#version-162} 
 (veröffentlicht 2015-06-08) 

*    **Neue Features (für Benutzer) :** 
    * FürEDDGriddatasets, Benutzer können jetzt Grafik-Typ machen: Oberflächengraphen mit jeder Kombination von numerischen Achsen, nicht nur Länge und Breite. Dies lässt Sie x versus y (Projektiert) Grafiken und verschiedene[Hovmöller Diagramme](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram), z.B. die Versustiefe oder die Zeit gegen Tiefe.\\[Hinweis: Wenn Tiefe auf den Y-Achsen liegt, wird es wahrscheinlich von dem, was Sie wollen, umgelenkt werden. Leider ist es noch keine Option.\\]Dank Cara Wilson und Lynn DeWitt.
    * Es gibt ein neues[Oceanic/Atmospheric Acronym Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)die Sie ein gemeinsames ozeanisches/atmospherisches Akronym zu/aus einem vollständigen Namen konvertieren lässt.
    * Es gibt ein neues[Ozean/Atmospheric Variable Names Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)die Sie einen gemeinsamen ozeanischen/atmospherischen Variablennamen zu/aus einem vollständigen Namen konvertieren lässt.
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    *   Java7/8-1998
        Oraclenicht mehr unterstützt (stellt Sicherheitsfehlerfixe für)  Java7.ERDDAP™noch unterstütztJava7, aber bitte gehen Sie zuJava8. Die nächste VeröffentlichungERDDAP™wird wahrscheinlich erfordernJava8.
    *   valid\\_min/max/range
Zuvor und jetzt, wenndataVariablehattescale\\_factorundadd\\_offsetMetadaten,ERDDAP™entpackt die Datenwerte und entfernt diese Metadaten. Zuvor,ERDDAP™nicht modifiziert/unpackenvalid\\_range,valid\\_min,valid\\_maxMetadaten (die in der Regel/sollten Füllwerte enthalten) vonscale\\_factorundadd\\_offset. Jetzt schon. Bitte suchen Sie IhreERDDAP™für "valid\\_" und sicherstellen, dass alle Variablen, dievalid\\_range,valid\\_min, odervalid\\_maxdie richtigen Werte haben, wenn die Datensätze in der neuen Version erscheinenERDDAP. Vgl.[valid\\_range/min/max Dokumentation](/docs/server-admin/datasets#valid_range).
    * ACDD-1.3
Zuvor,ERDDAP™  (besonders GenerateDatasets Xml) verwendet/verwendet (1,0) Version der[NetCDFAttribut Convention for Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1)die als " bezeichnet wurdeUnidataDataset Discovery v1.0" in den globalen Konventionen undMetadata\\_ConventionsAttribute. Jetzt empfehlen wir[ACDD-Version 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)die Anfang 2015 ratifiziert wurde und als "ACDD-1.3" bezeichnet wird. Glücklicherweise ist ACDD-1.3 sehr rückwärtskompatibel mit Version 1.0. Wir freuen uns, dass Sie[Wechsel in ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13). Es ist nicht schwer.
    * Datensätze generieren Xml Attribute
Es gab eine Vielzahl von Änderungen, um die&lt;addAttributes&gt; Werte vorgeschlagen von GenerateDatasets Xml für die globalen Konventionen,creator\\_name/email/url, Keywords, Zusammenfassung und Titelattribute und für die Variablelong\\_nameAttribut. Einige Änderungen beziehen sich auf die neue Verwendung von ACDD-1.3.
    * EDDTableFromSOSDatensätze
Mit der gelegentlichen Hinzufügung neuer TypenSOSServer und Änderungen an den alten Servern, es wird immer schwieriger fürERDDAP™den Servertyp automatisch aus den Antworten des Servers zu erkennen. Die Verwendung von [&lt;SosServerTyp&gt; (/docs/server-admin/datasets#eddtablefromsos-skeleton-xml)   (mit einem Wert von IOOS\\_NDBC, IOOS\\_NOS,OOSTethys, oder) ist jetzt STRONGLY EMPFEHLEN. Wenn irgendwelche Ihrer Datensätze dieser Art Probleme in der neuen Version habenERDDAP, versuchen, GenerateDatasets neu zu starten Xml für dieSOSServer, um ein neues Stück vondatasets.xmlfür diesen Datensatz. Datensätze generieren Xml lässt Sie ausprobieren&lt;sosServerType&gt; Optionen, bis Sie die richtige für einen bestimmten Server finden. Wenn Sie noch Probleme haben, lassen Sie mich bitte das Problem kennen, das Sie sehen, und die URL des Servers und ich werde versuchen, zu helfen.
    * EDDTableFromFileNames Datensätze
Einige Attribute, die empfohlen wurdenaddAttributessind jetzt SourceAttributes. Sie müssen wahrscheinlich nichts für bestehende Datensätze in Ihrem änderndatasets.xml.
    * Fehlerbehebung im Zusammenhang mit bestimmten Anforderungen an EDDTableFromNcCFFiles-Datensätze.
Ich habe auch eine große Anzahl von Einzeltests zu den bestehenden großen Anzahl von Einzeltests der zugrunde liegenden Methoden hinzugefügt (es gibt 100s von Szenarien) . Danke an Eli Hunter.
    * Fehlerbehebung/kleine Änderungen anEDDGridVon MergeIR.
Dank Jonathan Lafite und Philippe Makowski
    * Fehlerbehebung:EDDGridFromErddap funktioniert jetzt auch, wenn ein Remote-Datensatz nichtioos\\_categoryVariable Attribute.
Danke an Kevin O'Brien.
    * Fehlerbehebung in .graph Webseite fürEDDGridDatensätze, wenn nur eine Achsgröße mit mehr als einem Wert vorhanden ist.
Danke an Charles Carleton.
    * Es gab andere kleine Verbesserungen, Änderungen und Fehlerbehebungen.

## Version 1.60{#version-160} 
 (veröffentlicht 2015-03-12) 

*    **Neue Features (für Benutzer) :** keine
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * STRONGLY RECOMMENDED: Aktualisieren der Server[Roboter.txt](/docs/server-admin/additional-information#robotstxt)Datei zu enthalten:
Unmittelbar: /erddap/files/
    * INotify Problem und Lösung:
Auf Linux-Computern, wenn Sie verwenden&lt;UpdateEveryNMillis&gt; mit Datensätzen mit Typ=EDDGridVonFiles, EDDTableFromFiles,EDDGridKopieren, EDDTableCopy oder deren Unterklassen, können Sie ein Problem sehen, bei dem ein Datensatz nicht geladen wird (gelegentlich oder konsequent) mit der Fehlermeldung: "IOException: Benutzergrenze von inotify Instanzen erreicht oder zu viele offene Dateien". Wenn ja, können Sie dieses Problem beheben, indem Sie (als Wurzel) :
echo fs.inotify.max\\_user\\_watches=65536|tee -a /etc/sysctl.conf
echo fs.inotify.max\\_user\\_instances=1024|tee -a /etc/sysctl.conf
Sekundarbereich
Oder, verwenden Sie höhere Zahlen, wenn das Problem anhält. Der Standard für Uhren ist 8192. Die Standardeinstellung beträgt beispielsweise 128.\\[UPDATE: Es gibt einen Fehler inJavadie verursacht, dass die Fälle nicht Müll gesammelt werden. Dieses Problem wird vermiedenERDDAP™v1.66 und höher. So ist die bessere Lösung, auf die neueste Version zu wechselnERDDAP.\\]
    * NoSuchFileException Fehlerbehebung:
Es gab einen Fehler, der Datensätze von Typ=EDDGridVonFiles, EDDTableFromFiles,EDDGridKopieren, EDDTableCopy oder ihre Unterklassen, um nicht gelegentlich mit dem Fehler "NoSuchFileException: _someFileName_" zu laden. Der Bug ist mit der Verwendung von FileVisitor verwandt und wurde inERDDAP™V1.56. Das Problem ist selten und wird höchstwahrscheinlich Datensätze mit einer Vielzahl von häufig wechselnden Datendateien beeinflussen.
    * Es gab kleine Verbesserungen, Änderungen und Fehlerbehebungen.

## Version 1.58{#version-158} 
 (veröffentlicht 2015-02-25) 

*    **Neue Features (für Benutzer) :** 
    * Der neue["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)system lässt Sie ein virtuelles Dateisystem durchsuchen und Quelldatendateien von vielen herunterladenERDDAP™Datensätze. Die"files"System ist standardmäßig aktiv, aberERDDAP™Administratoren können es deaktivieren, indem Sie
```
        <filesActive>false</filesActive>  
```
in derERDDAP™setup.xml Datei. Ein besonderer Dank an Philippe Makowski, der fortdauerte, als ich langsam die Schönheit dieser Idee zu schätzen wusste.
    * Zeitziel Max... Zuvor hatte die Zeitvariable von EDDTable-Datensätzen mit nahen Echtzeitdaten ein ZielMax von NaN, was darauf hindeutete, dass der maximale Zeitwert für den Datensatz aktuell ist, aber nicht genau bekannt und häufig verändert wird. Jetzt hat das ZielMax einen echten Wert, der das aktuell bekannte letzte Mal anzeigt. Viele Datensätze haben kontinuierlich aktualisierte Daten.ERDDAP™unterstützt den Zugriff auf die neuesten Daten, auch wenn es nach dem aktuell bekannten letzten Mal ist. Beachten Sie, dass das neue [&lt;UpdateEveryNMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis) UnterstützungEDDGridVonFiles und EDDTable FromFiles datasets aktualisiert das Ziel der ZeitvariableMax. Eine weitere Folge dieser Veränderung ist, daßdatasetID=allDatasetsdataset enthält nun das aktuell bekannte letzte Mal in den maxTime Spalten. Dank John Kerfoot.
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * STRONGLY RECOMMENDED: Aktualisieren der Server[Roboter.txt](/docs/server-admin/additional-information#robotstxt)Datei zu enthalten:
Unmittelbar: / Dateien/
Unmittelbar: /erddap/files/
    * Stichprobedatasets.xml-- Letztes Jahr empfehlen wir mehrere ausgezeichnete Datensätze in der KüstenwacheERDDAP™dass du zu deinemERDDAP™nur indem Sie ein paar Zeilen zu Ihremdatasets.xml. Wenn Sie die erdVH-Datensätze hinzugefügt haben, wechseln Sie bitte zu den neueren erdVH2-Datensätzen:
        * Erstellen Sie eine Kopie aller erdVH-Datensätze und ändern Sie die kopiertendatasetID's von erdVH... zu erdVH2... und ändern Sie die ReferenzsourceUrlvon erdVH... zu erdVH2...
        * Setzen Sie die erdVH... Datensätze auf active="false".
    * AlleEDDGridVonFiles und EDDTable FromFiles-Unterklassen unterstützen jetzt [&lt;zugänglichViaFiles&gt;] (/docs/server-admin/datasets#accessibleviafiles) die Quelldatendateien über die"files"Systeme. Standardmäßig ist dieses System für jeden Datensatz deaktiviert. Sie müssen den Tag hinzufügen, um es zu aktivieren. Dank Philippe Makowski.
    * AlleEDDGridVonFiles und EDDTable FromFiles-Unterklassen unterstützen jetzt [&lt;UpdateEveryNMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis) . Standardmäßig ist dieses System für jeden Datensatz deaktiviert. Sie müssen den Tag hinzufügen, um es zu aktivieren. Dank Dominic Fuller-Rowell und NGDC.
    * Der neue[EDDTableFromFileNames](/docs/server-admin/datasets#eddtablefromfilenames)erstellt einen Datensatz aus Informationen über eine Gruppe von Dateien im Dateisystem des Servers, aber es dient nicht Daten aus innerhalb der Dateien. Dies ist zum Beispiel nützlich für die Verteilung von Sammlungen von Bilddateien, Audiodateien, Videodateien, Textverarbeitungsdateien und Tabellenkalkulationsdateien. Das funktioniert Hand in Hand mit dem neuen["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)System, so dass Benutzer die Dateien herunterladen können. Ein besonderer Dank an Philippe Makowski, der fortdauerte, als ich langsam die Schönheit dieser Idee zu schätzen wusste.
    * Der neue[EDDGridVonEDDTable](/docs/server-admin/datasets#eddgridfromeddtable)Sie können einen tabellarischen Datensatz in einen netzgebundenen Datensatz konvertieren. Dank Ocean Networks Kanada.
    * Der neue[EDDGridVonMergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles)aggregierte Daten aus einer Gruppe von lokalen MergeIR.gzDateien.EDDGridVonMergeIRFiles hat die Unterscheidung, das erste Stück Code zu sein, zuERDDAP. Es wurde ganz ohne unsere Hilfe getan. Drei fröhliche und besondere Dank an Jonathan Lafite und Philippe Makowski von R.Tech Engineering.
    * Es gibt ein neues, optionales setup.xml-Tag,&lt;unitTestDataDir&gt;, die das Verzeichnis mit den Unit Testdatendateien angibt, die über ein neues GitHub-Repository verfügbar sind:[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest). Zum Beispiel:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Dies ist noch nicht nützlich, aber ist Teil der Bewegung, um so viele der Einheitstests zu machen, die von anderen Menschen wie möglich durchgeführt werden können. Danke an Terry Rankine.
    * Es gab viele kleine Verbesserungen, Änderungen und Fehlerbehebungen.

## Version 1.56{#version-156} 
 (veröffentlicht 2014-12-16) 

*    **Neue Features (für Benutzer) :**   (Keine) 
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * Sie wissen wahrscheinlich schon,[EDDGridVon Erddap](/docs/server-admin/datasets#eddfromerddap)und[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap)die Sie mit Datensätzen in anderen verknüpfen lassenERDDAPs und sie in deinerERDDAP. Benutzeranfragen für aktuelle Daten aus diesen Datensätzen werden unsichtbar an die Quelle weitergeleitetERDDAP™, so dass die Daten nicht durch Ihr System fließen oder Ihre Bandbreite verwenden. Es gibt jetzt eine große Liste von empfohlenen Datensätzen in der Probedatasets.xmlin erdddapContent.zip. Um sie in IhreERDDAP™, alles, was Sie tun müssen, ist kopieren und einfügen Sie die, die Sie in Ihredatasets.xml. Danke an Conor Delaney.
    * Wenn Sie kompilierenERDDAP™, Sie müssen einige neue hinzufügen . Jar Dateien zu Ihrem[Classpath - cp Schalter](/docs/contributing/programmer-guide#development-environment)für Javac und Java.
    * Der neue[EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra)Daten von[Cassandra](https://cassandra.apache.org/). Dank Ocean Networks Kanada.
    * Der neue[EDDTableFromColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)behandelt Daten von ASCII-Datendateien mit fester Breite Spalten. Dank Philippe Makowski.
    * AlleEDDGridVonFiles und EDDTable FromFiles Subclasses nutzen jetzt eine neue Methode, FileVisitor (hinzugefügtJavain 1.7) Informationen über die Dateien zu sammeln. Dies kann für die erste Sammlung von Dateiinformationen für einen bestimmten Datensatz keinen Nutzen haben, scheint aber einen großen Vorteil für spätere Zusammenkünfte zu haben, wenn es bald geschehen ist, während das Betriebssystem noch die Informationen kached hat. Dank NGDC.
        
Wir empfehlen noch: Wenn ein Datensatz eine große Anzahl von Dateien hat (z.B. &gt; 1.000) , das Betriebssystem (und damitEDDGridVonFiles und EDDTableFromFiles) wird viel effizienter arbeiten, wenn Sie die Dateien in einer Reihe von Unterverzeichnissen speichern (eins pro Jahr, oder eins pro Monat für Datensätze mit sehr häufigen Dateien) , so dass es nie eine große Anzahl von Dateien in einem bestimmten Verzeichnis.
        
    * Mehrere kleine Verbesserungen an EDDTableFromAsciiFiles.
    * Einige Verbesserungen an EDDTableFromAsciiServiceNOS, insbesondere um einige zusätzliche Spalten von Informationen aus der Quelle zu erhalten. Danke an Lynn DeWitt.
    * Einige kleine Fehlerbehebungen im Zusammenhang mit der ISO 19115, dassERDDAP™erzeugt. Danke an Anna Milan.

## Version 1.54{#version-154} 
 (veröffentlicht 2014-10-24) 

*    **Neue Features (für Benutzer) :** 
    * Einige Variablen arbeiten jetzt mit der Zeit an der Millisekunden-Präzision, z.B. 2014-10-24T16:41:22.485Z. Dank Dominic Fuller-Rowell.
*    **Kleine Änderungen/Befestigungen:** 
    * Bugfix: mit einer bestimmten Kombination von Umständen,EDDGridFromNcFile Datasets lieferten Daten mit reduzierter Präzision (z.B. Schwimmer statt Doppel) . Dies könnte nur Datenwerte mit &gt; 8 signifikanten Zahlen beeinflussen. Verzeihung. (Und es war ein klassischer Computerprogrammierfehler: ein falscher Charakter.) Dank Dominic Fuller-Rowell.
    * Viele kleine Veränderungen.
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * Griddap-Datensätze unterstützen nun Zeitstamp-Achsenvariablen und Datenvariablen (d.h. Variablen mit Zeitwerten, jedoch adestinationNameandere"time") . Dank Dominic Fuller-Rowell.
    *   ERDDAP™unterstützt jetzt korrekt Millisekundentime\\_precision"1970-01-01T00:00:00:00.000Z". Ein absichtlicher Quirk: beim Schreiben von Zeiten an humanorientierte Dateien (z.B., .csv,.tsv,.json,.xhtml) ,ERDDAP™Verwendung der angegebenentime\\_precisionwenn es Sekunden und/oder Dezimalsekunden enthält; andernfalls verwendet es Sekundentime\\_precision"1970-01-01T00:00:00Z" (für Konsistenz und Rückwärtskompatibilität) . Dank Dominic Fuller-Rowell.
    *   EDDGridFromNcFiles unterstützt jetzt das Lesen von StringdataVariableS.
    *   .ncDateien, die von griddap geschrieben wurden, können jetzt String habendataVariableS.
    * Datensätze generieren Xml enthält jetzt mehr Flush () ruft, um das Problem der Informationen zu vermeiden, die nicht in die Dateien geschrieben werden. Dank Thierry Valero.
    * Die Dokumentation für GenerateDatasetsXml wurde verbessert, um zu zeigen, dass der -i-Schalter nur funktioniert, wenn Sie alle Antworten auf der Kommandozeile angeben (z.B. Skriptmodus) . Und der Skriptmodus wird erklärt. Dank Thierry Valero.
    *   ERDDAP™zwei Variablen in einem Datensatz nicht mehr die gleichesourceName. (Wenn es jemand zuvor getan hat, hat es wahrscheinlich zu Fehlermeldungen geführt.) Wie vorher,ERDDAP™nicht zulassen, dass zwei Variablen in einem Datensatz die gleichen habendestinationName.

## Version 1.52{#version-152} 
 (veröffentlicht 2014-10-03) 

*    **Neue Features:**   (keine) 
*    **Kleine Änderungen/Befestigungen:** 
    * Ein anderer (kleiner) sich verändernERDDAP™schneller.
    * Verbesserung der ISO 19115-Dateien, die vonERDDAP: neu empfohlen&lt;gmd:protocol&gt; Werte (Informationen, Suche,OPeNDAP:OPeNDAP,ERDDAP:griddap undERDDAP:tabledap) innerhalb&lt;gmd:CI\\_OnlineResource&gt. Dank Derrick Snowden und John Maurer.
    * Viele kleine Veränderungen.
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * Bugfix: GenerateDatasetsXml.sh und DasDds.sh waren nicht in erdddap.war für 1.48 und 1.50. Jetzt sind sie es. Dank Thierry Valero.
    * Kleine Änderungen an einigen Geschwindigkeitstests in TestAll, um sie weniger zufällig anfällig zu machen. Danke an Terry Rankine.

## Version 1.50{#version-150} 
 (veröffentlicht 2014-09-06) 

*    **Neue Features:**   (keine) 
*    **Kleine Änderungen/Befestigungen:** 
    * DasERDDAP™sollte viel schneller sein als die letzten Versionen.
*    **DingeERDDAP™Administratoren müssen wissen und tun:**   (nichts) 

## Version 1.48{#version-148} 
 (veröffentlicht 2014-09-04) 

*    **Neue Features:** 
    *   ERDDAP™jetzt immer einen tabellarischen Datensatz erstellt,datasetID=allDatasets, die eine Informationstabelle über alle darin enthaltenen Datensätze enthältERDDAP. Es kann wie jeder andere tabellarische Datensatz abgefragt werden. Dies ist eine nützliche Alternative zum aktuellen System, um Informationen über Datensätze programmatisch zu erhalten.
    * Es gibt zwei neue Ausgabedateitypen für EDDTable undEDDGrid, .csv0 und.tsv0. Sie sind Komma- und Tab-getrennte-Wert-Dateien, die keine Zeilen mit Spaltennamen oder Einheiten haben. Die Daten beginnen auf der ersten Zeile. Sie sind besonders nützlich für Skripte, die nur ein Stück Informationen vonERDDAP.
*    **Kleine Änderungen/Befestigungen:** 
    * Karten können jetzt auf Längen im Bereich -720 bis 720 gemacht werden.
    * Der neue.ncDateityp ist für alle verfügbarEDDGridDatensätze. Es gibt die[NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)\\-formatierte Beschreibung des Datensatzes (ähnlich zu einer kombinierten .dds + .das) .
    * Fehlerbehebung: Speichern von tabellarischen Daten zu einem.ncDie Datei war auf 100.000 Werte pro Variable beschränkt. Jetzt ist es nur auf 2 GB Gesamtdateigröße beschränkt. Danke an Kevin O'Brien.
    * Fehlerbehebung: die saveAsMatlabMethoden stellen nun sicher,datasetIDs werden in Sicherheit umgewandeltMatlabvariable Namen. Aber ich empfehle immer noch, dass Sie erstellendatasetIDs, die gültige Variablennamen sind: beginnend mit einem Buchstaben und dann nur mit A-Z, a-z, 0-9 und \\_. Vgl.[datasetID](/docs/server-admin/datasets#datasetid). Dank Luke Campbell.
    * Fehlerbehebung in EDDTableFromDatabase: Mit einigen Arten von Datenbanken, ein NO\\_ Die Datenantwort aus der Datenbank führte zu einer punktlosen 30 zweiten VerzögerungERDDAP. Danke an Greg Williams.
    * Fehlerbehebung:EDDGridErstellen Sie ein Diagramm mit Graph-Typ = Linien (oder Marker oder Marker und Linien) erzwungene x-Achsenvariable Zeit zu sein. Jetzt kann es jede Achse sein. Danke an Lynn DeWitt.
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * STRONGLY EMPFEHL: UpdateJava  
Diese Version vonERDDAP™AnforderungenJava7 oder höher, jedochJava7 wird im April 2015 sein Lebensende erreichen (Bald&#33;) , so ist jetzt eine gute Zeit zu wechselnJava8. AlsoJava8 ist STRONGLY EMPFEHL. Ich teste mitJava8. Beachten Sie, dassJava6 erreichte sein Ende im Februar 2013 (keine Sicherheitsfehlerbehebungen mehr&#33;) .
    * STRONGLY EMPFEHL: Update Tomcat
Wenn Sie Tomcat verwenden, wechseln Sie bitte auf die neueste Version von Tomcat. Tomcat 8 ist für die Arbeit mitJava8.
    * "ERDDAP" ist kein Akronym mehr. Jetzt ist es nur ein Name. Ich will nicht, dass der Name hervorhebtERD. Ich willERDDAP™um Ihre Institution und Ihre Daten hervorzuheben.
    * PLEAEN[anpassen Sie das Aussehen IhresERDDAP™Installation zur Hervorhebung Ihrer Institution und Ihrer Daten](/docs/server-admin/deploy-install#customize). Mit einer Stunde Arbeit, können Sie schöne Verbesserungen machen, die für immer dauern wird.
    * In setup.xml, die&lt;displayDiagnosticInfo&gt; Option wird nun immer ignoriert und behandelt, als wäre der Wert falsch.
EMPFEHLUNG: Entfernen Sie die&lt;displayDiagnosticInfo&gt; tag und verwandte Infos von setup.xml.
    * In setup.xml, der Standard für&lt;drawLandMask&gt; war "über", aber jetzt ist es "unter", die eine bessere allgemeine Standard (funktioniert gut mit allen Datensätzen) .
    * Die GenerateDatasetsXml.sh und DadDds.sh Linux-Skripte verwenden jetzt bash anstelle von csh und haben die Erweiterung .sh. Dank Emilio Mayorga
    * Datensätze generieren Xml und DasDds erstellen jetzt eigene Protokolldateien (GenerateDatasetsXml.log und DasDds.log) und Ausgabedateien (GenerateDatasetsXml.out und DadDds.out) in _bigParentDirectory_/logs/, und nie ihre Ergebnisse auf die Zwischenablage setzen.
    * Datensätze generieren Xml unterstützt nun einen -i-Befehlszeilenparameter, der den Ausgang an einem bestimmten Ort in die angegebene Datei einfügt. Siehe[Dokumentation](/docs/server-admin/datasets#generatedatasetsxml). Danke an Terry Rankine.
    * EDDTableFromDatabase unterstützt&lt;SpalteNameQuotes&gt;&lt;/columnNameQuotes&gt;, mit gültigen Werten " (Der Standard) Oder gar nichts. Dieser Charakter (wenn) wird vor und nach Spaltennamen in SQL-Abfragen verwendet. Verschiedene Arten von Datenbanken, die auf unterschiedliche Weise eingerichtet werden, benötigen unterschiedliche Spaltennamen-Zontierungszeichen.
    * Tabulare Breite und Längenvariablen können jetzt angepasst habenlong\\_name's, z.B. Profile Latitude. Bisher konnten sie nur Latitude und Longitude sein.
    * Geben Sie ab sofort "defaultDataQuery" und "defaultGraphQuery" als Attribute in den globalen Metadaten des Datensatzes an (d.h.&lt;addAtts&gt;), nicht als getrennt&lt;defaultDataQuery&gt; und&lt;defaultGraphQuery&gt; Tags. (Obwohl, wenn Sie sie noch über die Tags angeben,ERDDAP™wird automatisch globale Attribute mit den Informationen erstellen.) 

## Version 1.46{#version-146} 
 (veröffentlicht 2013-07-09) 

*    **Neue Features:** 
    *    (Keine) 
*    **Kleine Änderungen/Befestigungen:** 
    * Bugfix: In EDDTableFromDatabase, nur in Version 1.44,ERDDAP™unrichtig zitierte den Tabellennamen der Datenbank in SQL-Anweisungen. Das ist jetzt behoben. Danke an Kevin O'Brien.
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    *    ** Wenn Sie die Standardnachrichten in message.xml nicht ändern,
Löschen\\[Tomcat\\]/content/erddap/messages.xml . **   
Die Standard-Nachrichten.xml-Datei ist jetzt im Erddap. Kriegsakte, nicht erddapContent.zip. Sie müssen also nicht mehr manuell Nachrichten.xml aktualisieren.
    * Wenn Sie die Nachrichten in message.xml ändern, von jetzt an, jedes Mal, wenn Sie aktualisierenERDDAP™, auch:
        * Machen Sie die gleichen Änderungen, die Sie vor dem neuen gemacht haben
            \\[Tomcat\\]/webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
Und dieses eine Mal: löschen\\[Tomcat\\]/content/erddap/messages.xml .
        * Oder herauszufinden, was sich in den neuen Nachrichten geändert hat.xml (via diff) , und ändern Sie Ihre
            \\[Tomcat\\]/content/erddap/messages.xml Datei entsprechend.

## Ausführung 1.44{#version-144} 
 (veröffentlicht 2013-05-30) 

*    **Neue Features:** 
    * Abfragen zu EDDTable-Datensätzen unterstützen &amp;orderByMin. (...) undorderByMinMax (...)   (die zwei Zeilen in jeder Gruppe zurückgibt, mit dem Minimum und dem Maximum der letztenorderByWert) . Danke an Lynn DeWitt.
    * Es gibt zwei neuetabledapDateitypen:.ncCFHeader und.ncCFMAHeader (die den ncdumpartigen Header des entsprechenden.ncCF und.ncCFMA Dateitypen) . Danke an Steve Hankin.
*    **Kleine Änderungen/Befestigungen:** 
    * Bugfix: Laden der .graph und .html-Webseiten für Datensätze mit vielen Zeitwerten war langsam, weilERDDAP™war langsam bei der Generierung der Zeitschieberoptionen. Jetzt ist es immer schnell. Dank Michael Barry, OOICI und Kristian Sebastian Blalid.
    * Fehlerbehebung: Bei einigen EDDTable-Datensatztypen wurden die Zeitzwänge nicht immer korrekt behandelt. Jetzt sind sie es. Dank John Maurer und Kevin O'Brien.
    * Fehlerbehebung: Datensätze würden nicht geladen, wenn allesubsetVariableswurden feste Wertevariablen. Das werden sie. Dank Lynn DeWitt und John Peterson.
    * IMPROVED: Jetzt wirken alle Abfragen für nur Subset-Variablen als ob &distinct () ist Teil der Abfrage.
    * IMPROVED: jetzt für Abfragen, die.jsonp=_functionName_, _Funktion Name_ MUST jetzt eine Serie von 1 oder mehr sein (abschnittsweise getrennt) Wörter. Jedes Wort muss mit einem ISO 8859 Buchstaben oder "\\_" beginnen und mit 0 oder mehr ISO 8859 Buchstaben, Ziffern oder "\\_" verfolgt werden. Ja, das ist restriktiver alsJavaScripts Anforderungen an Funktionsnamen.
    * Die Zeitachse auf Diagrammen funktioniert nun gut für längere Zeitbereiche (80 - 10000 Jahre) und kürzere Zeitbereiche (0,003 - 180 Sekunden) .
    *   ERDDAP™ist nun eher vergeblich, wenn Änderungen von ISO-8601-Format-Zeitdaten abgeglichen werden.
    * Es gab viele andere kleine Änderungen und Fehlerbehebungen.
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    *    **Sie müssen die neueste Version aktualisieren, um sicher zu sein.**   
        ERDDAP™hat eine Sicherheitsprüfung durchgeführt. Es gab einige Fehler und Schwächen. Version 1.44 enthält mehrere wichtige Sicherheitsfehlerbehebungen und mehrere Änderungen zur Erhöhung der Sicherheit und Zugänglichkeit (z.B. für Sehbehinderte) . Version 1.44 hat die Nachfolge-Sicherheitsprüfung bestanden. Dank all der guten Menschen bei USGS und Acunetix, die dies ermöglichten. (Sollte nichtNOAAmacht das?) 
    * Der neue[EDDTableFromWFSDateien](/docs/server-admin/datasets#eddtablefromwfsfiles)eine lokale Kopie aller Daten aus einerArcGISKartenserverWFSServer und so können die Daten schnell reserviert werden, umERDDAP™Benutzer. Dank Christy Caudill.
    * Der neue[EDDTableFromEDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)lässt Sie einen EDDTable-Datensatz aus einemEDDGridDatensatz. Einige häufige Gründe dafür sind:
        * Damit kann der Datensatz mitOPeNDAPAuswahlbeschränkungen (die ein Benutzer angefordert haben kann) .
        * Der Datensatz ist inhärent ein tabellarischer Datensatz. Dank OOICI, Jim Potemra, Roy Mendelssohn.
    * Der variable Name "Tiefe" ist jetzt eine besondere Alternative zu "Höhe". Die Einheiten müssen eine Variante von "Meter" sein. Die Datenwerte müssen positiv=down sein.ERDDAP™ist jetzt voll bewusst, die Bedeutung von "tiefe" und unterstützt es, wo auch immer Höhe unterstützt wird (z.B. als Bestandteil eines CF DSG cdm\\_data\\_type=Profildatensatzes) . Ein Datensatz darf sowohl "tiefe" als auch "Altitude"-Variablen nicht haben.
    * In deinemdatasets.xml, bitte entfernen Sie alle Verwendungen von&lt;att name="cdm\\_altitude\\_proxy"&gt;tiefe&lt;/att&gt; da Tiefe jetzt eine besondere Alternative zur Höhe ist und daher nicht speziell identifiziert werden muss.
    * In deinemdatasets.xml, bitte entfernen Sie alle Verwendungen von&lt;lotMetersPerSourceUnit&gt;, außer EDDTable VonSOS.
Wenn der Wert 1 ist, löschen Sie ihn einfach.
Wenn der Wert -1 ist, sollten Sie den variablen Namen in die Tiefe ändern.
Für andere Werte, addieren&lt;addAttributes&gt; zum Beispiel:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Alle Datensätze unterstützen jetzt
        
        *   &lt;defaultDataQuery&gt;, die verwendet wird, wenn .html ohne Abfrage angefordert wird.
            * Das brauchen Sie wahrscheinlich selten.
            * Bei Gridap-Datensätzen ist es üblich, einen anderen Standardtiefe- oder Höhendimensionswert anzugeben. (z.B.,\\[0)\\]anstatt\\[Letzter Beitrag\\]) .
In jedem Fall sollten Sie immer alle Variablen auflisten, immer dieselben Dimensionswerte für alle Variablen verwenden, und fast immer verwenden\\[0)\\],\\[Letzter Beitrag\\], oder\\[0:last\\]für die Dimensionswerte.
Zum Beispiel:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Fürtabledapdatasets, die häufigste Verwendung dieser ist, einen anderen Standardzeitbereich anzugeben (relativ zu jetzt, z.B. &time&gt;=now-1 Tag) .
Denken Sie daran, dass die Anforderung keine Datenvariablen ist die gleiche wie die Angabe aller Datenvariablen, so dass in der Regel können Sie einfach die neue Zeitkonstrat angeben.
Zum Beispiel:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;defaultGraphQuery&gt;, die verwendet wird, wenn .graph ohne Anfrage angefordert wird.
            * Das brauchen Sie wahrscheinlich selten.
            * Bei Gridap-Datensätzen ist die häufigste Verwendung dieser Daten eine andere Standardtiefe oder Höhendimensionswert anzugeben. (z.B.,\\[0)\\]anstatt\\[Letzter Beitrag\\]) und/oder anzugeben, dass eine bestimmte Variable grafisch dargestellt wird.
In jedem Fall werden Sie fast immer verwenden\\[0)\\],\\[Letzter Beitrag\\], oder\\[0:last\\]für die Dimensionswerte.
Zum Beispiel:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Fürtabledapdatasets, die häufigsten Verwendungen von diesem sind die Angabe unterschiedlicher Variablen, die zu graphieren sind, ein anderer Standardzeitbereich (relativ zu jetzt, z.B. &time&gt;=now-1 Tag) und/oder verschiedene Standardgrafikeinstellungen (z.B. Markertyp) .
Zum Beispiel:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Denken Sie daran, dass Sie XML-Code oder Prozent-Code benötigen (entweder einer, aber nicht beide) die Standardabfragen, da sie in einem XML-Dokument sind. Zum Beispiel wird &amp; ,&lt;wird &amp;lt; und &gt; wird &amp;gt; .
Und bitte überprüfen Sie Ihre Arbeit. Es ist einfach, einen Fehler zu machen und nicht zu bekommen, was Sie wollen.
Dank Charles Carleton, Kevin O'Brien, Luke Campbell und anderen.
    *   EDDGridFromDap,EDDGridVonErddap und EDDTableFromEDDGridhaben ein neues System, um mit Datensätzen zu umgehen, die sich häufig ändern (wie oft alle 0,5 s) . Im Gegensatz zuERDDAP's regelmäßiges, proaktives System zum vollständigen Nachladen jedes Datensatzes, dieses optionale zusätzliche System ist reaktiv (ausgelöst durch eine Benutzeranforderung) und inkremental (nur die Aktualisierung der Informationen, die aktualisiert werden müssen) . Zum Beispiel, wenn eine Anfrage an eineEDDGridFromDap-Datensatz tritt seit dem letzten Update mehr als die angegebene Anzahl von Millisekunden auf,ERDDAP™wird sehen, ob es neue Werte für den linken (in"time") Dimension und, wenn ja, laden Sie diese neuen Werte einfach herunter, bevor Sie die Anfrage des Benutzers bearbeiten. Dieses System ist sehr gut, einen sich schnell ändernden Datensatz aktuell mit minimalen Anforderungen an die Datenquelle zu halten, aber zu den Kosten der leichten Verlangsamung der Verarbeitung einiger Benutzerwünsche. Siehe&lt;UpdateEveryNMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis)   
Dank Michael Barry und OOICI.
    *   EDDGridFromNcFiles, EDDTableFromNcFiles und EDDTableFromNcCFFile unterstützen nun[NcML.ncml](/docs/server-admin/datasets#ncml-files)Quelldateien anstelle von.ncDateien. Dank Jose B Rodriguez Rueda.
    * FürEDDGridGesamtexistenteDimension,ERDDAP™unterstützt eine neue serverType="dodsindex"-Option für das serverType-Attribut der&lt;sourceUrls&gt; tag. Dies funktioniert mit Webseiten, die innerhalb von Dateien Listen haben&lt;Vordruck&lt;/pre&gt; und oft unter einemOPeNDAPLogo. Ein Beispiel ist[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html).
    * Für EDDTableFromSOSjetzt unterstützt einen optionalen Tag
```  
        <sosServerType>_serverType_</sosServerType>  
```
so können Sie den Typ angebenSOSServer (alsoERDDAP™muss es nicht herausfinden) . Gültige Werte&lt;_serverTyp_\\&gt; sind IOOS\\_NDBC, IOOS\\_NOS,OOSTethys, und (ein neu unterstützter Server Typ) . Vgl.[EDDTableFromSOS](/docs/server-admin/datasets#eddtablefromsos). Dank Derrick Snowden und Janet Fredericks.
    * AlleEDDGridVon...Files, EDDTableFrom...Files,EDDGridKopieren und EDDTable Kopieren Sie jetzt einen optionalen Tag
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
was sagen kannERDDAP™um die Datei zu halten Tabelle (mit Informationen über jede Quelldatendatei) im Speicher statt nur auf der Festplatte (Der Standard) . Behalten der DateiTabelle in Speicher beschleunigt Anfragen für Daten (besonders wenn es &gt;1000 Quelldatendateien gibt) , aber verwendet mehr Speicher. Wenn Sie dies für jeden Datensatz festlegen, achten Sie auf den Speicher: derzeit verwenden Sie Zeile _yourDomain_/erddap/status.htmlum sicherzustellen, dassERDDAP™hat noch viel freies Gedächtnis. Danke an Fredrik Stray.
    * EDDTableFromASCIIFile unterstützt jetzt&lt;einsatz&gt;. Die zwei häufigsten Zeichensätze (Case sensitive&#33;) ISO-8859-1 (Der Standard) und UTF-8.
    * Empfohlen: in setup.xml, innerhalb&lt;startHeadHtml&gt;, bitte ändern&lt;html in
        &lt;html lang="en-US"&gt; (oder[Sprachcode](https://www.w3schools.com/tags/ref_language_codes.asp)wenn Sie Nachrichten übersetzt haben.xml) .
    * setup.xml hat neue optionale Tags, um Teile vonERDDAP:
        *   &lt;KonverterActive&gt;false&lt;/convertersActive&gt;&lt;&#33;-- der Standard ist wahr --&gt;
        *   &lt;SlideSorterActive&gt;false&lt;/SlideSorterActive&gt;&lt;&#33;-- der Standard ist wahr --&gt;
        *   &lt;wmsActive&gt;false&lt;/wmsActive&gt;&lt;&#33;-- der Standard ist wahr --&gt; Im Allgemeinen empfehlen wir, diese auf false zu setzen.
    * Datensätze generieren Xml schreibt nun Ergebnisse zu _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, nicht log.txt. Dank Kristian Sebastian Blalid.
    * Datensätze generieren Xml macht jetzt einen guten Vorschlag für die&lt;Nachladen EveryNMinutes&gt;. Dank derNOAAUAF-Projekt.
    * Viele kleine Verbesserungen an GenerateDatasetsXml. Dank derNOAAUAF-Projekt.

## Version 1.42{#version-142} 
 (veröffentlicht 2012-11-26) 

*    **Neue Features:** 
    *    (Keine großen neuen Features.) 
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * Wenn Sie vonERDDAP™1.38 oder 1.40, es gab keine Änderungen, die Sie benötigen, um Änderungen Ihrer Konfigurationsdateien vorzunehmen (aber Sie müssen die neue Nachrichten.xml-Datei verwenden) .
    *   ERDDAP™wieder kann mitJava1.6. (ERDDAP™v1.40 erforderlichJava1.7.) Wir empfehlen immer noch dringend die neueste Version zu verwendenJava1.7.
    * Ein neuer Datensatztyp,[EDDTableFrom AwsXmlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles), kann Daten von einem Satz von Automatischer Wetterstation lesen (AWS) XML-Datendateien. Dank Lynn Dewitt und dem Exploratorium.
*    **Kleine Änderungen/Befestigungen:** 
    * Anpassung an Änderungen des NDBCSOSQuelldatenserver.
    * Anpassung an Änderungen der NOS COOPS ASCII-Dienste.
    * Erstellte einige kleine Änderungen und Fehlerbehebungen.

## Version 1.40{#version-140} 
 (veröffentlicht 2012-10-25) 

*    **Neue Features:** 
    * Es gibt ein neues Ausgabedateiformat fürtabledapDatensätze:.ncCFMA, die die angeforderten Daten in einem.ncDatei, die der CF entspricht[Diskrete Sampling Geometrien](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Multidimensionale Array-Optionen, die daher den NODC-Vorlagen entsprechen\\[2021: Jetzt die[NCEI-Vorlagen](https://www.ncei.noaa.gov/netcdf-templates)\\]zur Speicherung dieser Art von Daten. Dank NODC.
    *   tabledapAnfragen können jetzt Zeitzwänge wie &time&gt;now-5 Tage. Siehe[Dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Danke an James Gosling.
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * Wenn Sie vonERDDAP™1.38, es gab keine Änderungen, die Sie benötigen, um Änderungen Ihrer Konfigurationsdateien vorzunehmen (aber Sie müssen die neue Nachrichten.xml-Datei verwenden) .
    *   ERDDAP™öffentliche Releases und interne Meilensteine sind über[ERDDAP™auf GitHub](https://github.com/ERDDAP). Weitere Informationen finden Sie in der[Das ist mein Name.](https://github.com/ERDDAP/erddap/wiki)für dieERDDAP™Projekt sowie die allgemeinere[ERDDAP™Programmer's Guide](/docs/contributing/programmer-guide). (Dies wurde einige Wochen nach derERDDAP™1.38 Release.) 
    * Datensätze generieren Xml wurde verbessert.
        * Das Skript wurde überarbeitet, damit es korrekt auf allen Linux-Computern funktionieren sollte (nicht nur ein paar) .
        * Es fügt jetzt hinzucreator\\_name,creator\\_email, undcreator\\_urlwann immer möglich.
        * Viele andere kleine Verbesserungen.
    * WieERDDAP™mit der Zeit.
        * Intern,ERDDAP™jetzt behandelt Zeiten bei Millisekundengenauigkeit (nicht Sekunden) .
        * Sie können nun optional die Zeitgenauigkeit für einen bestimmten Datensatz angeben, siehe[time\\_precision](/docs/server-admin/datasets#time_precision). Sie können beispielsweise einen Datensatz festlegen, um Zeitwerte mit Datumsgenauigkeit anzuzeigen (z.B., 1970-01-01) .
        * Ihre aktuellen Datensätze verwenden die Standardeinstellungen, so dass sie durch diese Änderungen nicht beeinflusst werden und die Zeit mit Sekundengenauigkeit weiter anzeigen wird. Dank Servet Cizmeli und Philip Goldstein.
    *   [EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles)ist ein neuer Datensatztyp, den Sie in Ihremdatasets.xmlDatei. Es kann Daten aus einem der zahlreichen Dateiformate lesen, die durch die[CF Diskrete Sampling Geometrien](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Konventionen. Dank NODC und speziellem Dank an Kyle Wilcox für die Herstellung von Sample-Dateien für die große Anzahl der gültigen DSG-Dateiformate und für die Bereitstellung sie öffentlich zugänglich.
*    **Kleine Änderungen/Befestigungen:** 
    * Erweitert die[schnell starten](#quick-restart)System für alle relevantenEDDGridund EDDTable Unterklassen.
    * Verbesserte Dokumentation, insbesondere im Zusammenhang mit der Verwendung[Netzteil](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)und[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)aus verschiedenen Client-Software.
    * Geänderte erweiterte Suche, um minTime und/oder maxTime als epochSeconds ausgedrückt zu unterstützen. Danke an Lynn Dewitt.
    * Geändert.htmlTableausgeben, um URLs und E-Mail-Adressen als Links anzuzeigen.
    * "rel=" und "rev=" hinzugefügt&lt;a href&gt; tags. Dank Pat Cappelaere von derOGC RESTProjekt.
    * Verbesserter Schutz vor unrealistisch großen Datenanforderungen, insbesondere innerhalbtabledap, wo es ein schwierigeres Problem ist.
    * Mehr Nachrichten in Nachrichten.xml verschoben.
    * Hat Geschwindigkeitsverbesserungen gemacht.
    * FestgelegtEDDGridVonFiles zu erlauben absteigenden sortierten Achsen. Dank Maricel Etchegaray.
    * Entfernte Hinweise auf iGoogle, da es eingestellt wird.
    * Erstellte einige kleine Änderungen und Fehlerbehebungen.

## Version 1.38{#version-138} 
 (veröffentlicht 2012-04-21) 

*    **Neue Features:** 
    * ISO 19115 und FGDCERDDAP™kann für jeden Datensatz automatisch ISO 19115 und FGDC XML-Metadatendateien generieren. Links zu den Dateien sind auf jeder Liste von Datensätzen sichtbar (z.B. aus Volltextsuche) und auch in Web Accessible Folders (WAF)   (siehe[FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)und[ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) . Dank Ted Habermann, Dave Neufeld und vielen anderen.
    * Volltextsuche für Datasets jetzt unterstützen \\-_excludedWord_ und \\-"_excluded phras_" . Dank Rich Signell.
    * Suchen nach Datensätzen kehren nun Ergebnisse einer Seite zu einer Zeit zurück. Der Standard verwendet den Parameter string: page=1&itemsPerPage=1000, aber Sie können die Werte in der URL Ihrer Anfrage ändern. Dank Steve Hankin und dem UAF-Projekt.
    *   OpenSearch--ERDDAP™jetzt unterstützt die[OpenSearch1.1.](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)Standard zur Suche nach Datensätzen. Dies ermöglicht unter anderem die Katalog-Aggregation-Websites zu verteilten Suchvorgängen (Durchführen einer Suchanfrage zu jedem Katalog, den er kennt) .
    * Comma getrennt Wert (CSV) Dateien --ERDDAP™erzeugt nun CSV-Dateien mit nur einem Komma zwischen Werten (die Excel bevorzugt) , statt comma+space. Dank Jeff deLaBeaujardiere.
    * Millionen Datensätze -- Es wurden mehrere Änderungen zur Unterstützung vorgenommen.ERDDAPs mit einer großen Anzahl von Datensätzen, vielleicht sogar eine Million. Dank Steve Hankin und dem UAF-Projekt.
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
#### Quick Restart{#quick-restart} 
*   [A](#quick-restart)schnelles Neustart-System ermöglichtERDDAP™viel schneller neu starten.
     **Bitte fügen Sie dies Ihrer setup.xml-Datei hinzu** nach oben&lt;/datasetsRegex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Volltextsuche nach Datensätzen können jetzt mit der Lucene Suchmaschine durchgeführt werden (obwohl wir die ursprüngliche Suchmaschine empfehlen, wenn Sie weniger als 10.000 Datensätze haben) oder das ursprüngliche Suchsystem.
         **Bitte fügen Sie dies Ihrer setup.xml-Datei hinzu** nach oben&lt;/displayDiagnosticInfo&gt;:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * In setup.xml können/sollten Sie nun zwei neue Kategorien in die komma-getrennte Liste einfügen&lt;categoryAttributes&gt;
        * global:keywords (Fügen Sie es direkt nach global:institution) -- ein neuer Sonderfall, der eine komma-separierte Liste von Schlüsselwörtern aus dem globalen Keywords-Attribut enthält, um einen separaten Eintrag für jedes Keyword zu erstellen.
        * Variable Name (Am Ende hinzufügen) -- ein neuer Spezialfall, der jeden derdataVariable destinationNameS.
    * In setup.xml können Sie (Aber warum?) sagen.ERDDAP™keine FGDC- und/oder ISO 19115-Metadaten für jeden Datensatz anbieten, einschließlich
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Die Standardwerte für diese Einstellungen sind zutreffend.
    * Indatasets.xml, Bitte beachten Sie die Verbesserung der Metadaten für Ihre Datensätze.ERDDAP™generiert nun automatisch ISO 19115 und FGDC XML-Metadatendateien für jeden Datensatz basierend auf den Metadaten des Datensatzes.
Also, **gute Datensatz-Metadaten führen zu guterERDDAP-generierte Metadaten nach ISO 19115 und FGDC.**   
         **Sehen Sie die neue Dokumentation für die vielen neuen EMPFEHLEN[Globale Attribute](/docs/server-admin/datasets#global-attributes).** 
    * Indatasets.xml, if you want to tellERDDAP™eine vorgefertigte FGDC- und/oder ISO 19115-Datei zu verwenden, die irgendwo auf dem Dateisystem des Servers liegt, anstatt dassERDDAP™Diese Dateien generieren, verwenden:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Wenn _fullFileName_\\=" oder die Datei nicht gefunden wird, wird der Datensatz keine FGDC und/oder ISO 19115 Metadaten haben. Dies ist also auch dann sinnvoll, wenn Sie die FGDC- und/oder ISO 19115-Metadaten für einen bestimmten Datensatz unterdrücken möchten.
    * Indatasets.xml, für alleEDDGridSideBySide undEDDGridAggregateExistingDimension-Datensätze, stellen sicher, dass Kinderdatensätze unterschiedlich sinddatasetIDs als ihre Elterndatensätze und als die anderen Kinder. (Zum Beispiel könnten Sie George Foremans einfaches, aber effektives System zur Benennung seiner Kinder verfolgen.) Wenn alle Namen in einer Familie genau die gleichen sind, wird der Datensatz nicht geladen (mit der Fehlermeldung, dass die Werte der aggregierten Achse nicht sortiert sind) .
    * Indatasets.xml, es gab einige Änderungen in der Liste der gültigenioos\\_categoryMetadatenwerte:
        * "pCO2" wurde in "CO2" geändert.
        * "Physical Oceanography" wurde hinzugefügt.
        * "Soils" wurde hinzugefügt.
    * Indatasets.xml,ERDDAP™nicht mehr erlaubt.datasetID. Es war erlaubt, aber entmutigt. (Tut mir leid.) 
    * Indatasets.xml, das Setup für EDDTableFromThreddsFiles und EDDTableFromHyraxDateien haben sich leicht geändert, weil beide Klassen nur neu geschrieben wurden, um effizienter zu sein (beide Klassen machen jetzt immer eine lokale Kopie aller Remote-Datendateien) . Siehe die Dokumentation zur Einrichtung dieser Klassen:[EDDTableFromHyraxDateien](/docs/server-admin/datasets#eddtablefromhyraxfiles)und[EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Siehe insbesondere die überarbeiteten Anmerkungen zu&lt;DateiDir&gt; (irrelevant) und&lt;sourceUrl&gt; (jetzt essenziell) . Auch sollten Sie diese Klasse nie in EDDTableCopy für Effizienz einpacken.
    * Indatasets.xml, wenn Sie EDDTableFromDatabase mit einerOracleDatenbank, Sie sollten eine Verbindung enthalten Immobilien wie
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
wie viele Zeilen von Daten zu einem Zeitpunkt abrufen, weil der Standard 10 ist, was schrecklich ineffizient ist. Siehe[OracleDokumentation](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm). MySql und PostgreSQL scheinen bessere Standardeinstellungen für diese Einstellung zu haben. Danke an Kevin O'Brien.
    * Wenn Sie EDDTableFromDatabase verwenden, sehen Sie die verbesserte["Speed" Dokumentation](/docs/server-admin/datasets#eddtablefromdatabase)für zusätzliche Vorschläge zur Verbesserung der Leistung. Danke an Kevin O'Brien.
    * Indatasets.xml, für alle EDDTable... Datensätze, in den Konventionen undMetadata\\_ConventionsGlobale Attribute, siehe CF-1.6 (nicht CF-1.0, 1.1, 1.2, 1.3, 1.4 oder 1.5) , da CF-1.6 die erste Version ist, die die Änderungen im Zusammenhang mit der diskreten Probenahmegeometrie einschließt.
    * Programmierer, die dieERDDAP™Code muss lib/lucene-core.jar in die Liste der Jar-Dateien in ihrem Javac und Java-Befehlszeilenpfade hinzufügen.
    *   ERDDAP™eine[Neuer Service](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)einen CF-Standard-Namen in ein GCMD-Wissenschafts-Schlüsselwort umwandeln. Sie können dies nützlich finden, wenn Sie globale Keywords Metadaten für die Datensätze in IhremERDDAP.
    * Umgang mit Bots -- Bitte lesen Sie diesen Rat[verhindern, dass Bots IhreERDDAP™auf dumme Weise](/docs/server-admin/additional-information#robotstxt).
    * Übersetzung -- Der Text zuERDDAP's Webseiten sind jetzt meist in message.xml und so geeignet für die Übersetzung in verschiedene Sprachen (z.B. Deutsch, Französisch) . Die Nachrichten verwenden nun oft MessageFormat zur Formatierung, auch um Übersetzungen zu erstellen. Wenn Sie an einer Übersetzung interessiert sind, schreiben Sie bitte eine E-Mailerd dot data at noaa dot gov.
    * Stichprobedatasets.xml-- Es gab mehrere kleine, aber signifikante Fehler in der Probedatasets.xml. Wenn Sie diese Datensätze verwenden, erhalten Sie bitte die neueren Versionen aus der neuen Probedatasets.xmlim neuen erddapContent.zipDatei. Danke an James Wilkinson.
    * Git -- Ich werde es schwer machenERDDAP™ein GitHub-Projekt ASAP nach dieser Veröffentlichung.
*    **Kleine Änderungen/Befestigungen:** 
    * Eine neue Palette, OceanDepth, ist nützlich für Tiefenwerte (positiv ist nach unten) , z.B. 0 (Weiden) bis 8000 (tief) .
    * Die.kmlAusgabe vontabledapverwendet ein besseres Markersymbol (es ist nicht fuzzy) . Und das Hovering über einen Marker macht es jetzt größer.
    * EDDTableFromFiles -- Im letzten Upgrade hatte die neue netcdf-java-Bibliothek engere Einschränkungen für variable Namen in.ncDateien. Das verursachte Probleme für EDDTableFromFiles, wenn eine VariablesourceNamehatte bestimmte Pünktlichkeitszeichen. EDDTableFromFiles wird nun geändert, um dieses Problem zu vermeiden. Danke an Thomas Holcomb.
    * Die .subset-Seite unterstützt jetzt 0/10/100/1000/10000/100000 anstelle eines Kontrollkästchens für Verwandte Daten. Der Tooltip warnt, dass 100000 Ihren Browser zum Absturz bringen können. Dank Annette DesRochers, Richard (Ab) Coughlin und das IOOS-Biologische Projekt.
    * .../erddap/info/datasetID_/index.html Webseiten zeigen nun URLs und E-Mail-Adressen als klickbare Links. Danke an Richard (Ab) Coughlin und das IOOS Biological Project.
    * Fehlerbehebung: Intabledap, für Datensätze mit Höhe MessgerätePerSourceUnit&lt;0, Anfragen mit Höhenbeschränkungen wurden falsch behandelt. Dank Kyle Wilcox.
    * Fehlerbehebung:EDDGridAggregateFromExistingDimension unterstützt nun vielfältigere TDS URLs. Danke?

## Version 1.36{#version-136} 
 (veröffentlicht 2011-08-01) 

*    **Neue Features:** 
    * Keine signifikanten Veränderungen aus Sicht eines Benutzers.
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * Der pmelTao-Datensatz, der oft als Stichprobendatensatz für dentabledap  
Dokumentation ist nicht mehr verfügbar.ERDDAP™Administratoren müssen diese Änderungen vornehmen:
        * In deinemdatasets.xml, wenn Sie eindatasetID= "pmelTao" Datensatz, Hinzufügen
active="false" direkt vor der "&gt;" am Ende dieser Linie.
        * In Ihrem Setup.xml, wenn Ihr&lt;EDDTableIdExamping&gt; ist pmelTao dann:
            * Wenn Siedatasets.xmlhat keinen Datensatz mitdatasetID= "erdGlobecBottle"
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * In Ihrem setup.xml ersetzen Sie alle Tags von&lt;EDDTableIdExamping&gt; durch
                &lt;EDDTableMatlabPlotBeispiel&gt; mit
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * Für Datensätze, bei denen der Typ eine Unterklasse von EDDTableFromFiles ist, können Sie jetzt Daten aus Metadaten machen.
Konkret können Sie nun eine Variable aus den Werten eines Attributs einer der ursprünglichen Variablen vornehmen.
Zum Beispiel indatasets.xml, innerhalb einer&lt;dataVariable&gt; tag, wenn Sie
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™wird eine Variable mit den Werten des PI Attributs der Kreuzfahrtvariablen machen.
Danke an WOD.
*    **Änderungen:** 
    * Kleine Veränderungen

## Version 1.34{#version-134} 
 (veröffentlicht 2011-06-15) 

*    **Änderungen:** 
    * Fehlerbehebung: Behoben Sie ein Speicherleck, das auf etwa 64-Bit aufgetreten istJavaAnlagen.
    * Fehlerbehebung:ERDDAP™setzt diese globalen Attribute nun korrekt ein, wenn die Werte der Breitendimension von hoch bis niedrig liegen: geospatial\\_lat\\_min, geospatial\\_lat\\_max, Southernmost\\_Northing, Northernmost\\_Northing.
        
Anmerkung:actual\\_rangeist unverändert: Es kann niedrige, hohe Werte oder hohe, niedrige Werte haben, da es beabsichtigt ist, den Bereich und die Reihenfolge der Speicherung anzuzeigen.
        
    * Kleine Veränderungen.
    *   ERDDAP™Administratoren müssen keine Änderungen an ihrem setup.xml vornehmen oderdatasets.xml.

## Version 1.32{#version-132} 
 (veröffentlicht 2011-05-20) 

*    **Änderungen:** 
    * Unterstützung der neu ratifizierten, CF Discrete Sampling Geometries (die leider noch nicht online verfügbar ist) , die die vorgeschlagenen CF-Punkt-Beobachtungsübereinkommen ersetzt.
        ERDDAP™Benutzer sehen, dass cdm\\_feature\\_type=Station durch TimeSerie ersetzt wird und es kleine Änderungen an den für die.ncCF-Dateityp (flat\\_dimension wird jetzt als Sample\\_dimension bezeichnet) .
        ERDDAP™Administratoren müssen diese Änderungen indatasets.xml:
        * cdm\\_data\\_type=Station sollte in cdm\\_data\\_type=TimeSeries geändert werden.
        * cdm\\_data\\_type=StationProfile sollte in cdm\\_data\\_type=TimeSeriesProfile geändert werden.
        * cdm\\_station\\_variables sollte in cdm\\_timeseries\\_variables geändert werden.
        * cf\\_role=station\\_id sollte in cf\\_role=timeseries\\_id geändert werden.
    * Neuioos\\_categoryOptionen: "Colored Dissolved Organic Matter", "pCO2", "Stream Flow", "Total Supended Matter".
    * Mögliche Lösung zu einem möglichen Speicherleck auf 64-BitJava.\\[Es hat nicht funktioniert.\\]
    * Kleine Veränderungen.

## Version 1.30{#version-130} 
 (veröffentlicht 2011-04-29) 

*    **Neue Features:** 
    * Unterstützung für 64-BitJava. Bei Verwendung mit 64 BitJava,ERDDAP™kann jetzt viel mehr Heap-Speicher verwenden und viele weitere gleichzeitige Anfragen behandeln.
    * Unterstützung für.ncDateianfragen bis 2GB (auch ohne 64-BitJava) über bessere NutzungERDDAP's Umgang mit Daten in Stücken.
    * Viele 2X Geschwindigkeit Verbesserungen im Code und 2X Geschwindigkeit steigt vonJava1.6 makeERDDAP™2X bis 4X schneller als zuvor.
    * Verbesserung der Speicherspeicherung deutlich niedrigerERDDAP's Basisspeichernutzung.
    * Für tabellarische Datensätze,ERDDAP™ist nun voll bewusst, dass der cdm\\_data\\_type eines Datensatzes und wie die Datenkarten zum CDM-Typ sind. Siehe[CF Diskrete Sampling Geometrien Spezifikation](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Vielleicht irgendwann bald wird diese Word-Datei in .html umgewandelt und die aktuellen "OBSOLETE"-Informationen auf dieser Webseite ersetzen. Dank derNOAAUAF-Projekt.
    * Für die meisten EDDTable-Datensätze, eine neue Ausgabedatei-Typ Option,.ncCF, schafft zusammenhängende Ragged Array.ncDateien, die der neuesten Version der[CF Diskrete Sampling Geometrien Konventionen](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Diese Dateien werden strukturiert, um den CDM-Datentyp des Datensatzes zu reflektieren. Da sich die vorgeschlagenen Konventionen gerade geändert haben, unterstützt die netcdf-java-Bibliothek das Lesen der vonERDDAPund als CDM-Datendateien interpretieren. Es wird wahrscheinlich bald. Dank derNOAAUAF-Projekt.
    * Die View : Distinct Data Option auf der .subset Webseite ist jetzt eine Dropdown-Liste, mit der Benutzer die maximale Anzahl von Zeilen von verschiedenen Daten angeben können, die angezeigt werden sollen (Standard = 1000) . Diese Änderung und andere erlaubenERDDAP™mit Datensätzen zu arbeiten, die sehr viele Zeilen von verschiedenen Daten haben. (Die Anzahl der einzigartigen Werte für jede einzelne Variable ist immer noch ein Problem, aber es kann ziemlich hoch sein (20.000?) bevor die .subset und andere Webseiten wirklich langsam laden.) Dank derNOAAUAF-Projekt.
    * .subset Webseiten haben eine neue Option: Zeigen Sie Distinct Data Counts an. Dank des GTOPP Projekts.
    * Um den Benutzern die einzelnen Werte zu helfen (z.B. Stationsnamen) werden nun auf den Formularen Make-A-Graph und Data Access angezeigt. Dank derNOAAUAF-Projekt.
    * .transparent Png-Anfragen unterstützen nun alle Arten von Graphen und Datendarstellungen. Es zieht nur die Daten -- keine Achsen, Legenden, Landmask oder alles andere. Dies ermöglicht es, Bilder als Schichten von transparentPngs zu machen. Wenn &.size=_width_|_height_ wird in der Abfrage angegeben (empfohlen) , es ist geehrt. Standardmäßig sind 360x360 Pixel. Die einzige Ausnahme istEDDGrid&.draw=Oberfläche, wo der Standard (wie vor) ist ein Bild mit ~1/pixel pro Datenpunkt (bis zu 3000 x und y Pixel) . Danke an Fred Hochstaedter.
    * DieWMSWebseiten zeigen nun die Farbleiste für die Variable des Datensatzes (S) . Dank Emilio Mayorga und anderen.
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * Diese Veröffentlichung beinhaltet viele Änderungen. Sie sind alle wichtig. Bitte geduldig sein und durch alle unten aufgeführten Änderungen arbeiten.
    * Diese Version wird früher herausgeschoben als beabsichtigt, mit einigen zu behandelnJavaSicherheitsfehler. Leider sind dafür mehrere Features/Fixe vorgesehenERDDAP™Version ist nicht in dieser Version. Tut mir leid. Hoffentlich wird die nächste Version relativ bald (und viel einfacher zu aktualisieren,) .
    * Um mehrere Sicherheitsfehler zu vermeidenJava6 Update 23 und unten, herunterladen und installieren Sie die neueste VersionJava  (Java6 Update 24 oder höher) . Wenn Sie ein 64-Bit-Betriebssystem haben, erhalten Sie eine 64-Bit-Version vonJava.
    * Wenn Sie Tomcat 5 verwenden, müssen Sie auf Tomcat 6 oder 7 upgraden (bevorzugt) . Wenn Sie Tomcat 6 verwenden, beachten Sie die Upgrade auf Tomcat Version 7.
    * Bitte folgen Sie allen Anweisungen für[eine neueERDDAP™](/docs/server-admin/deploy-install), aber gegebenenfalls werden Sie Dateien von Ihrer alten Installation auf die neue Installation kopieren, insbesondere die\\[Tomcat\\]/content/erddap Verzeichnis und Dateien. Als Teil davon, beachten Sie die[neue Tomcat Setup Empfehlungen](/docs/server-admin/deploy-install#tomcat).
    * Die default erddap.css ist jetzt in der Datei erddap.war enthalten.
        * Um den Standard erdddap.css zu verwenden, **Löschen** dein Alter\\[Tomcat\\]/content/erddap/images/erddap.css .
        * Wenn Sie geändert haben\\[Tomcat\\]/content/erddap/images/erddap.css, und wollen sie weiterhin nutzen: Lassen Sie es einfach an Ort und Stelle und ersetzen Sie die&lt;Eingangsteil mit
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * In deinem\\[Tomcat\\]/content/erddap/setup.xml:
        * Ersetzen Sie die Kommentare und Tags im Zusammenhang mit&lt;partiellRequestMaxBytes&gt; und&lt;TeilRequestMaxZells&gt; mit
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * Ersetzen Sie die Kommentare im Zusammenhang mit&lt;categoryAttributes&gt; und den Wert des Tags ändern:
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

In&lt;categoryAttributes&gt; das sind globale Attribute, die jetzt über das Präfix global identifiziert werden: (z.B. global:institution) . Andere Attribute werden als variable Attribute angenommen (z.B.,standard\\_name) . Auch Institute-Werte (die einzigen) wurden im Originalfall verlassen. Jetzt werden alle Kategoriewerte in Kleinbuchstaben umgewandelt.
    * In deinem\\[Tomcat\\]/Fortsetzung/Erlaubung/datasets.xml:
        * Big IMPROVED:ERDDAP™hat neue Anforderungen im Zusammenhang mit dem cdm\\_data\\_type eines Tabulardatensatzes. Insbesondere hat jeder Datensatz MUST die richtigen Metadaten und Variablen im Zusammenhang mit dem cdm\\_data\\_type. Wenn nicht, wird der Datensatz nicht geladen und einen Fehler werfen. Siehe Dokumentation für[cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type).
        * FYI: Es gibt einen neuen Datensatztyp: EDDTableFromAsciiServiceNOS.
        * FYI: Es gibt drei neu erlaubtioos\\_categoryOptionen: Hydrologie, Qualität (z.B. für Qualitätsfahnen) , und Statistiken (z.B. gemein) .
        * Für EDDTableFrom... Dateien datasets, entfernen Sie alle&lt;nDimensions&gt; tags. Sie werden nicht mehr benötigt oder verwendet.
        * Für Variablen mitdestinationName= Höhe,ERDDAP™nicht mehr drücktlong\\_nameum Altitude zu sein. Bitte gehen Sie durchdatasets.xmlund immer wieder nach&lt;destinationName&gt; Höhe und Ergänzung zu dieser Variablen&lt;addAttributes&gt;
```
              <att name="long\\_name">Altitude</att>  
```
             (oder ein wenig anderslong\\_namein Sonderfällen) .
        * Optional: Alle EDDTableFromFiles Unterklassen unterstützen Variable[sourceName=global:...](/docs/server-admin/datasets#global-sourcenames)um globale Metadaten aus jeder Datei in eine Datenvariable zu konvertieren. Danke an Lynn DeWitt.
    * EDDTableFromDatabase-Benutzer --ERDDAP™kommt mit einem neuen JDBC 4 Treiber für Postgres. Für andere Datenbanken, überprüfen Sie das Web für die neueste JDBC .jar-Datei für Ihre Datenbank. SeitERDDAP™jetzt verwendetJava1.6+, JDBC 4 (nicht 3) wird wahrscheinlich empfohlen.
    * FYI
        *   EDDGridVon...Files und EDDTable Von... Dateien Datensätze speichern jetzt die DateiTabelle Informationen in
            \\[BigParentDirectory\\]/Datensatz Info/\\[datasetID\\]/\\*.ncDateien.
Auch EDDTable-Datensätze speichern jetzt die Subset-Informationen in
            \\[BigParentDirectory\\]/Datensatz Info/\\[datasetID\\]/\\*.ncDateien. Diese Dateien, die verwendet werden
            \\[BigParentDirectory\\]/Datensatz Info/\\[datasetID\\]..jsonDateien.
Die alten Dateien werden automatisch gelöscht, wennERDDAP™beginnt. Oder Sie können alle Dateien löschen (aber die leeren Unterverzeichnisse verlassen) in\\[BigParentDirectory\\]/datasetInfo/.
        * Ich arbeitete an einer neuen EDDTableFromNcCFFiles, die Daten aus lokalen und Remote-Dateien mit den vorgeschlagenen, neuen CF Point Observation Conventions lesen würde. Aber es ist nicht in dieser Veröffentlichung. Es gibt Probleme in den netcdf-java-Bibliotheken mit einigen Methoden zum Lesen dieser Dateien. Und es gab einige sehr jüngste Änderungen an den vorgeschlagenen CF Point Observation Conventions. Wenn die netcdf-java-Bibliothek auf den neuesten Vorschlag festgelegt und aktualisiert wird, werde ich die Arbeit daran wieder aufnehmen.
        * LaufenERDDAP™unter Windows kann Probleme haben: vor allem können Sie im\\[bigParentDirectory/logs/log.txt Datei, dieERDDAP™ist manchmal nicht in der Lage, Dateien schnell zu löschen und/oder umbenennen. Dies ist auf Antivirus-Software zurückzuführen (z.B. von McAfee und Norton) die die Dateien für Viren überprüft. Wenn Sie in dieses Problem laufen (die durch Fehlermeldungen in der log.txt-Datei wie "Unable to delete ..." gesehen werden können) , das Ändern der Antivirus-Software-Einstellungen kann das Problem teilweise lindern.
WennERDDAP™in Windows ist nur ein Test auf Ihrem Desktop, dies ist nur eine ärgerliche.
WennERDDAP™in Windows ist Ihr PublikumERDDAP™, überlegen, auf einen Linux-Server zu wechseln.
    * Slow First Startup -- Das erste Mal, dass Sie laufenERDDAP™nach dem Upgrade,ERDDAP™kann langsam sein, um die Datensätze zu laden. Der WegERDDAP™speichert Informationen über aggregierte Dateien hat sich geändert, soERDDAP™muss einige Informationen aus all diesen Dateien wieder lesen. Das wird Zeit brauchen.
    * Fehler auf Startup -- Angesichts der Änderungen im Zusammenhang mit cdm\\_data\\_type ist es wahrscheinlich, dass einige Ihrer Datensätze nicht laden und Fehler werfen. Lesen Sie die Daily Report E-Mail, dieERDDAP™sendet Sie, wennERDDAP™ist fertig. Es wird eine Liste von Datensätzen, die nicht geladen (an der Spitze) und der Grund, warum sie nicht geladen haben (in der Nähe von unten) .
    * Wenn Sie stecken oder andere Fragen haben, schicken Sie mir die Details:erd.data at noaa.gov.
    * Programmierer -- Wenn Sie schreibenJavaProgramme, die laufenERDDAP™Code, Sie müssen einige der Befehlszeile Parameter Referenzen ändern:
        * Wechseln Sie joda-time1.32.jar zu joda-time. Ja
        * Ändern Sie die Postgres JDBC .jar Referenz auf postgresql.jdbc.jar
*    **Kleine Änderungen und Bugfixes:** 
    
    * Verbesserte Verbindungshandling, um aufgehängte Fäden zu vermeiden.
    * Verbesserte Konkurrenzpraktiken, um nahezu identische Anforderungen effizienter zu handhaben.
    *   ERDDAP™nutzt jetzt netcdfAll-4.2.jar (umbenannt in netcdfAll-latest. Ja) . Dieser Schalter erforderte mehrere interne Änderungen und verursachte einige kleine externe Änderungen, z.B. Änderungen, wie Grib-Dateien gelesen werden und winzige Änderungen an der.ncHeader Ausgang.
    * Neue Funktion:\\[Erdddap\\]/convert/fipscounty.html konvertiertFIPSLandkreiscodes zu/von Landkreisnamen.
    * Auf Karten sind die Staatsgrenzen nun dunkelviolett, so dass sie auf allen Hintergrundfarben besser stehen.
    * Tabelle.kmlAusgabe verwendet erneut ein kreisförmiges Symbol, um Punkte zu markieren (nicht das Flugzeug-Symbol Google vor kurzem umgeschaltet) .
    * Die erdCalcofi-Datensätze wurden umgeordnet und werden nun von lokalen Dateien bedient (schneller) .
    * Datensätze generieren Xml aus Bedrohungen Catalog erstellt jetzt eine Ergebnisdatei:
        \\[Tomcat\\]/webapps/erdap/WEB-INF/temp/EDDGridVonThreddsCatalog.xml . Danke an Kevin O'Brien.
    * Datensätze generieren Xml aus Bedrohungen Katalog versucht nun unnötige Portnummern aus den Quell-URL zu entfernen (z.B.:8080 und :8081 können manchmal entfernt werden) . DankNOAAZentrales Sicherheitsteam.
    * Für .subset-Webseiten hat die Map of Distinct Data nun einen variablen Lat-lon-Bereich.
    * Mehrere Listen inERDDAP™  (z.B. die Tabelle, die alle Datensätze zeigt) wurden so sortiert, dass A.Z vor a sortiert wurde..z. Jetzt sortieren sie auf eine fallunempfindliche Weise.
    * Kleine Änderungen an den .subset-Webseiten, einschließlich: Einheiten werden jetzt angezeigt.
    * Datensätze generieren Xml und DasDds werfen keine Ausnahme mehr, wenn sie die Ergebnisse nicht auf die System-Clipboard oder DisplayInBrowser setzen können. Dank Eric Bridger und Greg Williams.
    * Fehlerbehebung: Wenn Datensätze geladen werden,ERDDAP™entfernt nun die geospatialen globalen Attribute. Danke an Charles Carleton.
    * Fehlerbehebung: String2.getClassPath () jetzt richtig prozentual dekodiert die Klasse Pfad (insbesondere unter Windows, Leerzeichen im Dateinamen erschienen als %20) . Diese BetroffenenERDDAP™EDStatic ruft SSR.getContextDirectory () und Content/erddap finden. Dank Abe Coughlin.
    * Bugfix: in EDDTableFromFiles verwandt mit getDataForDapQuery Handling von verschiedenen () Anträge. Danke an Eric Bridger.
    * Fehlerbehebung:tabledapAnfragen wurden nicht ordnungsgemäß mit Höhenbeschränkungen behandelt, wenn der Datensatz seine Höhenlage MetersPerSourceUnit war -1. Danke an Eric Bridger.
    * Fehlerbehebung: EDDTableFrom... Dateien Datensätze behandeln nun korrekt Anfragen, die =NaN und &#33;=NaN enthalten.
    
## Version 1.28{#version-128} 
 (veröffentlicht 2010-08-27) 

*    **Neue Features:** Keine.
*    **DingeERDDAP™Administratoren müssen wissen und tun:** Keine.
*    **Fehlerbehebung:** Fehler bei der Programmierung behoben (nur in ver 1.26) wird gemacht habenERDDAP™sehr langsam.
     

## Version 1.26{#version-126} 
 (veröffentlicht 2010-08-25) 

*    **Neue Features:** Keine.
*    **DingeERDDAP™Administratoren müssen wissen und tun:** 
    * Von dir\\[Tomcat\\]/content/erddap/setup.xml,
        * In&lt;legal&gt;, auf einer neuen Linie unten\\[Standard Datenlinsen\\], Einsatz\\[StandardKontakt\\].\\[StandardKontakt\\]bezieht sich auf&lt;adminEmail&gt; spezifiziert höher in setup.xml.
        * Entfernen&lt;TabelleCommonBGColor&gt; und&lt;TabelleHighlightBGFarbe&gt;.
        * Empfohlen: Veränderung&lt;EndBodyHtml&gt;
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * Erforderlich: Zu deinem\\[Tomcat\\]/content/erddap/images/erdap.css und erdddapAlt.css, unten hinzufügen:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Fehlerbehebungen und kleine Änderungen:** 
    
    * Bugfix: In einigen Situationen funktionierten Formulare nicht in einigen Versionen des Internet Explorers. Vielen Dank an Greg Williams.
    * Fehlerbehebung: Die Make A Graph-Tasten funktionierten nicht, wenn der Datensatz von einer Fernbedienung warERDDAP.
    * Fehlerbehebung:WMSmanchmal nicht funktionierte, wenn der Datensatz von einer Fernbedienung warERDDAP.
    * Viele kleine Änderungen und Fehlerbehebungen.
    

## Version 1.24{#version-124} 
 (veröffentlicht 2010-08-06) 

*    **Neue Features:** 
    * Neu[Web-Seiten von Subset](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)verwenden Sie facetierte Suche, um Teilmengen von tabellarischen Datensätzen auszuwählen. Danke an POST.
    * Neu[Erweiterte Suche](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)kombiniert alle anderen Suchoptionen und fügt Longitude, Breite und Zeit gebundene Boxen. Dank Ellyn Montgomery. (Tut mir leid für die Verzögerung.) 
    * Neu[Umrechnen von Zeit](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)Web-Seite und Service können Sie numerische Zeiten zu / von ISO-Stringzeiten konvertieren.
    * Neu[Einheiten umrechnen](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)Web-Seite und Service können Sie konvertierenUDUNITSbis/von UCUM-Einheiten. DankNOAAIOOSSOS.
    * WenntabledapAnfrage beinhaltet &units ("UCUM") , die Einheiten Namen werden aus Originalnamen umgewandelt (inUDUNITS) bis[UCUM](https://unitsofmeasure.org/ucum.html)Einheiten Namen. Dies betrifft nur Einheiten\\*Namen\\*, keine Datenwerte. DankNOAAIOOSSOS.
    * Verbesserungen bei der Erstellung von Graph-Webseiten und -graphen:
        * Wenn das Diagramm eine Karte ist, gibt es neue Make A Graph-Tasten zum Zoomen in/out und eine neue Option, um den Mittelpunkt der Karte zu ändern. Danke an POST.
        * Filtereinstellungen in der Nähe von unten hinzugefügt. Danke an Greg Williams.
        * Die eingebauten Küstendatendateien wurden auf GSHHS v2.0 aktualisiert. Danke an POST.
        * Die Karten enthalten jetzt Seen und Flüsse. Danke an POST. (Leider fehlt das Sacramento River Delta, weil sich weder die Küstendaten noch der See/Fluss-Datensatz damit auseinandersetzen.) 
        * Die in pscoast-derived National/state-Dateien gebaut wurden aktualisiert. Danke an POST.
        * Topography.cpt wurde leicht modifiziert. (Tut mir leid, wenn das dich negativ beeinflusst.) Danke an POST.
        * In Gridap's Make A Graph, wenn ein Benutzer eine Variable ändert, wird das Formular automatisch neu übermittelt, so dass dasaxisVariables' showStartAndStop reflektiert immer die Diagrammvariablen. Dank Joaquin Trinanes.
        * Für png und pdf Bild URLs:
            * New &.land=_value_, wo _value_ "unt" sein kann (Topographie) oder "über" (nur zeigen Badmetrie) . Wenn nicht angegeben, wird die Standardeinstellung durch[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)indatasets.xmloder setup.xml. Danke an POST.
            * Neu: Zeilen in der Legende, die zu lang sind, werden automatisch in mehrere Zeilen zerlegt. Danke an POST.
        * Für png image URLs:
            * Neu &.legend=_value_, wo _value_ "Bottom" sein kann (Standard) "Aus" oder "nur". Damit können Sie die Legende einschließen, die Legende ausschließen oder nur die Legende bekommen. Danke an Cara Wilson.
            * Neu &amp; Neu Pixels_ hinterlässt eine Grenze von nPixels (z.B. 10) an der Unterseite des Bildes. Es wird nach .legend=Off angewendet. Danke an Cara Wilson.
            * Neu &.size=_width_|_height_ lässt Sie die Breite und Höhe des Bildes in Pixeln angeben.
    * Neue Ausgabedateiformate:
        * .csvp und.tsvp -- wie .csv und.tsv, aber mit " (_units_) " an die Spaltennamen in der ersten Zeile angehängt.
        * .odvTxt -- macht eine .txt-Datei, die das Erhalten von Daten vereinfacht[Meeresdaten Blick (ODV) ](https://odv.awi.de/).
        * .esriCsv -- macht eine .csv-Datei zum Import in ESRI's geeignetArcGIS. (nur tabellarische Datensätze) Dank Jan Mason, Jeff de La Beaujardiere, undNOAAIOOSSOSProjekt.
    * GUI Verbesserungen der[Kategorie](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)Webseiten. Auch die kategorisieren Werte (andere als Institute) sind jetzt alle Kleinen. Nicht-kleinere Anträge werden akzeptiert (umgeleitet) für Rückwärtskompatibilität. Dank Roy Mendelssohn.
    * Fehlermeldungen sind nun noch kürzer und orientieren sich an den Benutzern. Danke an Greg Williams.
    * Eine interne Änderung, die stark reduziertERDDAP's Basisspeichernutzung.
    * Viele neue Features, die nur für das POST-Projekt relevant sind.
*    **DingeERDDAP™Administratoren müssen wissen und tun:** Es gibt viele Änderungen. Tut mir leid. Aber jeder bringt einige nette Vorteile.
    * Große Änderungen an GenerateDatasetXml -- es stellt jetzt oft mehr Fragen (die relevanten[Datensatz Arten](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)Informationen) und erzeugt nun immer im Wesentlichen gebrauchsfertige Inhalte fürdatasets.xml. Sie sind immer noch verantwortlich für die Einrichtung, so sollten Sie noch überprüfen, diedatasets.xmlInhalt vor der Verwendung. Ein menschlicher Einsatz in das Projekt wird immer besser als ein Computerprogramm. Dank des UAF-Projekts.
    * REQUIRED: In setup.xml müssen Sie dieWMSAbschnitt. Es sollte jetzt diese Tags enthalten (aber fühlen Sie sich frei, die Werte zu ändern) :
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * REQUIRED: In setup.xml, kopieren und einfügen Sie diesen neuen Vorschlag&lt;startHeadHtml&gt;, um Ihre alte Version zu ersetzen. Aber fühlen Sie sich frei, Änderungen für Ihre Präferenzen vorzunehmen.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

Dank POST, Hans Vedo und Rick Blair.
    * REQUIRED: In setup.xml, in&lt;startBodyHtml&gt;, ändern Sie die&lt;Körper&gt;-Tag nur&lt;body&gt;, da der Stil jetzt von erdddap.css gesetzt wird.
    * REQUIRED: In setup.xml ändern Sie dies&lt;EndBodyHatml&gt; (aber ändern Sie die E-Mail-Adresse an Ihre E-Mail-Adresse und fühlen Sie sich frei, andere Änderungen vorzunehmen) :
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * HIGHLY RECOMMENDED: In setup.xml, die empfohlene&lt;theShortDescriptionHtml&gt; ist jetzt
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

Fühlen Sie sich frei, dies zu ändern, insbesondere der letzte Satz im ersten Absatz.
    * In setup.xml, emailEverythingTo und emailDailyReport Um nun komma-separierte Listen von E-Mail-Adressen zu sein. Die erste E-MailAlles Spezielle Abonnements für EDDXxxxFromErddap-Datensätze verwenden diese E-Mail-Adresse. Danke an John Maurer.
    * E-Mail-Fehler sind jetzt bei der\\[BigParentDirectory\\]/logs/emailLogYYYYY-MM-DD.txt Datei.
    * In setup.xml gibt es einen neuen optionalen Parameter, um E-Mail-Account-Eigenschaften (in der Regel direkt nach&lt;E-MailPassword&gt;:
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Der Standard ist nichts. Dank Rich Signell.
    * REQUIRED: Wenn Sie EDDTableCopy oderEDDGridKopieren, Sie müssen alle\\[BigParentDirectory\\]/ Kopieren/ Verzeichnisse und Dateien, die "xh" im Verzeichnis oder Dateinamen enthalten, nachdem die altenERDDAP™und vor dem Starten des neuenERDDAP™so dass diese Dateien wieder kopiert werden. Es tut mir sehr leid, aber es war wichtig, die Änderung zu machen und hoffentlich betrifft es wenige Admins und wenige Dateien.
In Linux finden Sie diese Dateien mit, cd\\[BigParentDirectory\\]/ Kopieren
finden .\\*xh\\*  
In Windows finden Sie diese Dateien mit, Start|Suche
Was suchen Sie nach: Dokumente
Alle oder ein Teil des Dateinamens: xh
Sieh ein: Durchsuchen -&gt;\\[BigParentDirectory\\]/ Kopieren
Klicken Sie auf 'Search'
^A, um alle auszuwählen
Del to delete all
    * REQUIRED: Indatasets.xml, für EDDTableFromDatabase-Datensätze, für Datums- und Zeitstempelvariablen, die Daten ändern Geben Sie doppelt und die Einheiten zu Sekunden seit 1970-01-01T00:00Z. Wir EQUIRE, dass Sie Zeitstempeldaten in der Datenbank speichern\\*mit\\*eine Zeitzone. Ohne Zeitzone Informationen, die Fragen, dieERDDAP™sendet an die Datenbank und die Ergebnisse, dieERDDAP™wird aus der Datenbank über JDBC sind mehrdeutig und werden wahrscheinlich falsch sein. Wir haben versucht, aber keine zuverlässige Möglichkeit gefunden, mit "Zeitstempel ohne Zeitzone" Daten zu umgehen. Wir denken, das ist sowieso gute Praxis. Schließlich hat "Zeitstempel ohne Zeitzone" Daten eine implizierte Zeitzone. Obwohl es großartig ist, dass die Zeitzone für den Datenbank-Admin offensichtlich ist, ist es sinnvoll, diese explizit anzugeben, damit andere Software mit Ihrer Datenbank richtig interagieren kann. Danke, Michael Urzen.
    * EMPFEHLUNG: Indatasets.xml, um .subset-Webseiten für facettierte Suche Ihrer tabellarischen Datensätze zu aktivieren, müssen Sie hinzufügen [&lt;subsetVariables&gt; (/docs/server-admin/datasets#subsetvariables) auf die globalen Attribute des Datensatzes.
    * EMPFEHLUNG: Indatasets.xml, wenn Sie den Datensatz mitdatasetID="pmelGtsppp", bitte ändern Sie es
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * EMPFEHLUNG: Indatasets.xml, es gibt neue gültige Optionen für die [&lt;cdm\\_data\\_type&gt;] (/docs/server-admin/datasets#cdm_data_type) Globales Attribut, so sollten Sie den Wert für Ihre Datensätze überprüfen/ändern.
    * Indatasets.xml, das neue [&lt;sourceNeedsExpandedFP\\_EQ&gt;] (/docs/server-admin/datasets#sourceneedsexpandedfp_eq) ist hilfreich, wenn der Quellserver nicht konsequent mit &_variable_\\=_value_-Tests arbeitet (wegen der[allgemeine Schwierigkeit, die Gleichheit der Floating-Point-Nummern zu testen](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) . sourceNeedsExpandedFP\\_EQ wird standardmäßig auf true gesetzt (die sicherste Einstellung) Sie müssen also keine Änderungen vornehmen.
    * Neu[EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles). Danke an Jerry Yun Pan.
    * Neu[EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Dank Roy Mendelssohn.
    * Änderungen an[EDDTableFromNcFis](/docs/server-admin/datasets#eddtablefromncfiles)lässt es mit einer breiteren Palette von Dateien verwendet werden.
    * EDDTableFromBMDE wurde deaktiviert. Es gibt keine aktiven, angemessenen Datenquellen mehr.
    * In GenerateDatasetXml, das neueEDDGridVonThredds Katalog erntet einen gesamten THREDDS Katalog (oder eine Untermenge) und generiertdatasets.xmlInhalt. Dank des UAF-Projekts.
    * Datensätze generieren Xml und DasDds setzen jetzt auch ihre Ergebnisse in\\[BigParentDirectory\\]/logs/log.txt. Dank Rich Signell und Charles Carleton.
    * Viele Verbesserungen am Login-System. Danke an POST.
*    **DingeERDDAP™Programmierer Notwendigkeit zu wissen und zu tun:** 
    * Im Verzeichnis /WEB-INF/lib/ wurden Änderungen vorgenommen. Bitte ändern Sie Ihre Javac- und Java-Klassenpfad-Einstellungen entsprechend.
    * Es gibt ein neues\\[Ihr Url\\]/erddap/version Service zur Bestimmung der Version einesERDDAP. Die Antwort ist Text, z.ERDDAP\\_version=1.24 Wenn Sie eine HTTP 404 Not-Found Fehlermeldung erhalten, behandeln Sie dieERDDAP™als Version 1.22 oder niedriger. Danke an POST.
*    **Kleine Änderungen und Bugfixes:** 
    
    * EDDTableFrom Sos ändert sich:
        * Abgekürzte Unterstützung beim Lesen von IOOSSOSXML-Antworten.
        * Unterstützung für das Lesen von IOOSSOSText/csv. (Also NOSSOSServer werden derzeit nicht unterstützt.) 
        * Erstellte viele Änderungen im Zusammenhang mit IOOSSOSServerdetails.
        * Unterstützung für BBOX-Abfragen für IOOSSOSundOOSTethys SOSServer. Diese Änderungen führen zu einer großen Beschleunigung für relevante Datenanforderungen. Dank an IOOSSOS.
    * Text in.mattabellarische Datendateien werden nun korrekt gespeichert. Dank Roy Mendelssohn.
    *   WMS
        *   OpenLayerswird nun gebündeltERDDAP™für den Einsatz in derWMSWebseiten. Dies korrigiert das Problem verursacht, wennOpenLayersvor einigen Monaten geändert und zukünftige Probleme verhindert.
        * In derWMS GetCapabilitiesAntwort, die&lt;OnlineResource&gt; Wert ist nun die URL derWMSService. Danke an Charlton Galvarino.
        * Eine Legende wird auf derWMSWebseite, um die Farbleiste anzuzeigen. Dank Emilio Mayorga.
    *   EDDGridAggregateExistingDimension-Konstruktor hatte Probleme, wenn eine Achse Quelle Werte waren nicht gleich ihrem Ziel Werte, z.B. wenn Quellzeit etwas anderes war als"seconds since 1970-01-01". DankToddSpindler.
    * In TabelleWriterGeoJson, der Überschuss ',' nach bbox\\[...\\]wurde entfernt. Danke an Greg Williams.
    * Viele kleine Änderungen und Fehlerbehebungen.
    
## Version 1.22{#version-122} 
 (veröffentlicht 2009-07-05) 

* Der in 1.20 eingeführte SlideSorter Bug ist behoben.
* Der in 1.20 eingeführte OBIS Bug ist behoben.
* Die Hinweise auf Jason-Datensätze auf der Bilder/Gadgets/GoogleGadgets-Seite wurden entfernt.
     
## Version 1.20{#version-120} 
 (veröffentlicht 2009-07-02) 

*   ERDDAP™Administratoren, bitte fügen Sie diese zu Ihrer setup.xml-Datei hinzu:
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* Neue Datensatztypen[EDDGridKopie](/docs/server-admin/datasets#eddgridcopy)und[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy)eine lokale Kopie eines anderen erstellen und pflegenEDDGridoder EDDTable Datensatz und dienen Daten aus der lokalen Kopie. Diese sind sehr einfach zu bedienen und sehr effektiv **Lösungen für einige der größten Probleme mit der Bereitstellung von Daten aus Remote-Datenquellen:** 
    
    * Zugriff auf Daten von einer entfernten Datenquelle kann langsam sein (aus verschiedenen Gründen) .
    * Der Remote-Datensatz ist manchmal nicht verfügbar (wieder, aus verschiedenen Gründen) .
    * Die Wiederherstellung auf einer Quelle für die Daten skaliert nicht gut (z.B., wenn viele Benutzer und vieleERDDAPs nutzen es) .
    
Außerdem ist die lokale Kopie eine Sicherung des Originals, was nützlich ist, wenn etwas mit dem Original passiert.
    
Es gibt nichts Neues über eine lokale Kopie eines Datensatzes. Was hier neu ist, ist, dass diese Klassen es\\*leicht\\*zu erstellen und\\*Pflege\\*eine lokale Kopie von Daten aus einer\\*Sorte\\*von Arten von Remote-Datenquellen und\\*Metadaten hinzufügen\\*beim Kopieren der Daten.
    
Diese Dataset-Typen sind Teil einer kompletten Reihe von Features, die die Erstellung von[Netz/Kunden/FöderationenERDDAPS](/docs/server-admin/scaling)sehr schwere Lasten zu handhaben (z.B. in einem Rechenzentrum) .
    
* Neuer Datensatztyp[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)erhält Daten von einer lokalen oder Remote-Datenbanktabelle.
*   ERDDAP™hat[Sicherheit](/docs/server-admin/additional-information#security)System, das die Authentifizierung unterstützt (Benutzer einloggen lassen) und Autorisierung (den Zugang zu bestimmten privaten Datensätzen zu gewähren) .
* Es gibt[zwei, neue Befehlszeilen-Tools](/docs/server-admin/datasets#tools)zu helfenERDDAP™Administratoren erzeugen das XML für einen neuen Datensatz indatasets.xml:
    * Datensätze generieren Xml kann für nahezu jede Art von Datensätzen einen groben Entwurf des Datensatzes XML erzeugen.
    * DasDds hilft Ihnen, das XML für einen Datensatz wiederholt zu testen und zu verfeinern.ERDDAP's GenerateDatasets Xml Webseiten wurden entfernt. Aus Sicherheitsgründen unterstützten sie nur einige Datensätze. Die neuen Befehlszeilentools sind eine bessere Lösung.
* Der neue[Statusseite](/docs/server-admin/additional-information#status-page)lässt jeder (aber insbesondere Administratoren) den Status einesERDDAP™von jedem Browser durch gehen\\[BasisUrl\\]/erddap/status.html.
* Tabledap unterstützt jetzt[serverseitige Funktionen](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions):
    * &distinkt () entfernt doppelte Zeilen aus der Antworttabelle,
    * undorderBy (...) lässt Sie angeben, wie die Antworttabelle sortiert werden soll,
    * undorderByMax (...) lässt Sie angeben, wie die Antworttabelle sortiert werden soll und entfernt alle Zeilen außer den Zeilen mit den Maximalwerten in der letzten angegebenen Spalte. Dies kann beispielsweise verwendet werden, um die letzten verfügbaren Daten für jede Station zu erhalten.
* Tabular Datasets können nun zusätzliche DateTime-Variablen enthalten, die nicht benannt sind"time". Diese Variablen werden durch ihre Metadaten "Einheiten" erkannt, die enthalten müssen" since "  (für numerisches Datum Zeiten) oder "ja" oder "Y" (für formatierte String DateTimes) . Aber bitte immer noch benutzendestinationName "time"für das Hauptdatum Zeitvariable.
*   ERDDAP™jetzt erzeugt ein[Sitemap.xml](/docs/server-admin/additional-information#sitemapxml)Datei, die Suchmaschinen sagt, dass IhrERDDAPnur muss jeden Monat gekrochen werden.ERDDAP™Administratoren, bitte folgen[Diese Anweisungen](/docs/server-admin/additional-information#sitemapxml)die Suchmaschinen über die neue Sitemap.xml-Datei zu benachrichtigen.
*   ERDDAP's Fehlermeldungen sind jetzt viel kürzer und richtet sich an Kunden (nicht Programmierer) . Danke an Greg Williams.
* (&lt;AnfrageBlacklist&gt; (/docs/server-admin/datasets#requestblacklist) unterstützt nun auch IP-Adressen, bei denen die letzte Nummer durch \\* ersetzt wurde.
* Anträge auf.jsonund .geoJson Dateien können jetzt eine optionale[Jsonat](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)Anfrage durch Hinzufügen von "&.jsonp=_functionName_" zum Ende der Abfrage. Im Grunde sagt das einfach:ERDDAP™"_functionName_ (" zu Beginn der Antwort und ") " bis zum Ende der Antwort. Wenn es ursprünglich keine Abfrage gab, lassen Sie die "&" in Ihrer Anfrage. Danke an Greg Williams.
* Viele neue Statistiken wurden dem[Tagesbericht](/docs/server-admin/additional-information#daily-report).
* Auf den Internetseiten mit Listen von Datensätzen, Institution und id sind jetzt rechts. Dies bewegt Abonnement und andere nützlichere Spalten in Ansicht auf schmale Computer-Bildschirme.
* Auf allen Webseiten, dem Titel der Seite (basierend auf der&lt;Titel in der&lt;startHeadHtml&gt;, die Sie in setup.xml definieren) wird geändert, um eine bessere Beschreibung der Webseite einschließen (z. B. durch Aufnahme des Titels und der Institution des aktuellen Datensatzes) .
* Xmx-Informationen werden nun mit den in log.txt, dem Daily Report und auf status.html gedruckten Speicherinformationen aufgenommen. Dank Ellyn Montgomery.
*   ERDDAP™zusätzlichen universellen Schutz gegen alle Fehler (z.B. OutOfMemoryError) . Danke an Charles Carleton.
* Verbesserungen bei der Fehlerbehandlung, wenn die Antwort bereits begangen wurde.
* VERBESSERT: EDDTableFromFiles undEDDGridVonFiles jetzt nur erlauben&lt;metadataFrom&gt; erste oder letzte. penultimate wird nicht mehr unterstützt. Und erste und letzte basieren jetzt auf den Dateien lastModifiedTime.
* Fehlerbehebung: in EDDTableFromSOS, ungültige Informationen für eine Station warfen eine Ausnahme und ließ den gesamten Datensatz zurückgewiesen werden. Jetzt werden diese Stationen einfach ignoriert (und die Fehlermeldung protokolliert log.txt) . Danke an Rick Blair.
     

## Version 1.18{#version-118} 
 (veröffentlicht 2009-04-08) 

* Fehlerbehebung: Ab 1.14 ging das EDDTable Data Access Formular und Make A Graph Webseite nicht richtig mit zitierten Einschränkungen um.
* Fehlerbehebung: Ab 1.14 hat EDDTableFromDapSequence keine Zeitbeschränkungen korrekt behandelt, wenn die Quellzeiteinheiten nicht "Sekunden seit 1970-01-01T00:00" waren.
     

## Version 1.16{#version-116} 
 (veröffentlicht 2009-03-26) 

*   ERDDAP™Administratoren:
    * Dies ist eine wichtige Veröffentlichung, weil es einen Fehler behoben, der eineERDDAP™Gewindelauf, wenn Sie Tomcat Manager zum Stoppen/Starten oder NachladenERDDAP. Also, wenn Sie 1.16 installieren, verwenden Sie nicht nur Tomcat Manager, um die altenERDDAP™und die neueERDDAP. Stattdessen: **die alteERDDAP™, restart Tomcat (oder der Server) , dann die neueERDDAP.** Es ist immer eine gute Idee, das bei der Installation einer neuen Version zu tun.
    * Bitte hinzufügen [&lt;AnfrageBlacklist&gt;&lt;/RequestBlacklist&gt; (/docs/server-admin/datasets#requestblacklist) zu dirdatasets.xml. Dies kann verwendet werden, um eine Liste der Client-IP-Adressen, die blockiert werden (z.B. um einen Denial of Service-Angriff oder einen übermäßig eisigen Web-Roboter abzuwehren) .
* Es gibt jetzt eine\\[BigParentDirectory\\]/logs-Verzeichnis, um dieERDDAP™Logfiles. Wenn Sie beginnenERDDAP™, es macht eine Archivkopie von log.txt und log. txt.previous Dateien mit einem Zeitstempel. Wenn es Probleme vor dem Neustart gab, kann es nützlich sein, diese Dateien zu analysieren.
*   ERD'ERDDAP™hat nun das Abonnementsystem aktiviert.
*   ERDDAP™wieder erlaubt (aber immer noch nicht empfohlen) die "%26" Kodierung von "&" in Anfrage URLs (siehe[mit v1.14 ändern](#percent26)) .
* Mehrere neue Ergänzungen zum Tally-Bereich der[Tagesbericht](/docs/server-admin/additional-information#daily-report).
* Kleine Fehlerbehebungen in generierenDatasetsXml.
* Ein paar kleine Fehlerbehebungen.
     

## Version 1.14{#version-114} 
 (veröffentlicht 2009-03-17) 

* Änderungen für Benutzer:
    * In Netzdatenanfragen,ERDDAP™unterstützt:[Letztens](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)wobei n eine ganze Zahl von Indizes ist und[ (Letzter Beitrag) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)wobei d ein Zahlenwert ist (für die Zeit, es ist in Sekunden) .
    * In tabellarischen Datenanfragen erfordern String-Zwänge[doppelte Zitate](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)um den Wert, z.B. &id="NDBC40121" Dies erfordert dieDAPProtokoll.
    * In tabellarischen Datenanforderungen,ERDDAP™erfordert jetzt[alle Zwänge richtig prozentual kodiert](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode). Browser machen dies automatisch, so dass dies meistens Auswirkungen auf Computerprogramme / -scripts, auf die ZugriffeERDDAP.
#### Prozent26{#percent26} 
*   [Zuvor,](#percent26)die[eine graphische Webseite einbetten](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)und[ERDDAP™Google Gadget Webseite](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)sagte, die "&" in der Bild-URL mit "%26" zu ersetzen. Ab sofort sollten Sie die "&" in der Bild-URL durch "&amp" ersetzen. So müssen Sie alle "%26" in bestehenden Webseiten und Google Gadgets durch "&amp" ersetzen. (Tut mir leid.) 
*   ERDDAP™Administratoren, bitte:
    * Fügen Sie folgendes hinzu[Setup.xml](/docs/server-admin/deploy-install#setupxml)Datei (und die Flagge ändern Schlüsselwort) :
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * Auf der Linie nach&lt;emailUserName&gt; in Ihrem[Setup.xml](/docs/server-admin/deploy-install#setupxml)Datei, hinzufügen
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
und geben Sie Ihr echtes Passwort ein.
    * Sie können sich ändern&lt;wmsSampleBBox&gt; in Ihrem[Setup.xml](/docs/server-admin/deploy-install#setupxml)Datei, um Längenwerte bis zu 360, z.B.
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * In deinemdatasets.xmlDatei, umbenennen Sie den Datensatz Typ EDDTableFromNc4DFiles in EDDTableFromNcFiles (die nun Dateien mit einer beliebigen Anzahl von Dimensionen unterstützt) . Wenn Sie einen EDDTableFromNc4DFile Datensatz hatten:
        
        1. Sie müssen auf type="EDDTableFromNcFiles" in Ihren Datensätzen wechseln. XML-Datei.
        2. Sie müssen einen&lt;nAbmessungen&gt; ANHANG&lt;/nDimensions&gt; tag zum XML des Datensatzes.
        3. Sie können das neue hinzufügen&lt;sortFilesBySourceNames&gt;-Tag, um die interne Reihenfolge der Dateien anzugeben, die die Gesamtreihenfolge der zurückgegebenen Daten bestimmt.
        
Für Details siehe[EDDTableFromFiles](/docs/server-admin/datasets#eddtablefromfiles).
    * In der Vergangenheit, für EDDTableFromDapSequence, fürOPeNDAPDRDS Server, indatasets.xml, wir haben&lt;sourceCanConstrainStringsRegex&gt;~=&lt;/sourceCanConstrainStringRegex&gt;. Aber wir sehen jetzt, dass die DRDS-Regex-Unterstützung begrenzter ist alsERDDAP's, so empfehlen wir&lt;sourceCanConstrainStringsRegex&gt;&lt;/sourceCanConstrainStringRegex&gt;, so dass Regex-Zwänge nicht an die Quelle weitergegeben werden, sondern vonERDDAP.
    * Überarbeitetes Handling von SourceCanConstrain... indatasets.xmlvon[EDDTableFromDapSequenz](/docs/server-admin/datasets#eddtablefromdapsequence)und (intern) alle EDDTable-Datensatztypen. Das neue System ist einfacher und besser reflektiert die Variabilität verschiedener Datenquellen. Sie können das XML für Ihre Datensätze in änderndatasets.xml.
* Es gibt mehrere neue Features, die von selbst nützlich sind, aber wenn sie kombiniert werden, erleichtern auch die Schaffung[Netz/Kunden/FöderationenERDDAPS](/docs/server-admin/additional-information#grids-clusters-and-federations).
    * Neue Datensatztypen:
        *   [EDDGridVon Erddap](/docs/server-admin/datasets#eddfromerddap)und[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap)die eineERDDAP™einen Datensatz aus einem anderenERDDAP™sehr einfach und sehr effizient.
        *   [EDDGridVonFiles](/docs/server-admin/datasets#eddgridfromfiles)  (und seine Unterklasse,[EDDGridVon NcFiles](/docs/server-admin/datasets#eddgridfromncfiles)das lesen kannNetCDF .nc, GRIB .grb undHDF .hdfDateien) .
        *   [EDDTableFromNcFis](/docs/server-admin/datasets#eddtablefromncfiles)das lesen kannNetCDF .ncdie eine tischartige Struktur aufweisen.
    * RunLoadDatasets und LoadDatasets wurden so überarbeitet, dassERDDAP™ist sehr reaktionsschnell, um Datensätze basierend auf Dateien in den[Flagge](/docs/server-admin/additional-information#flag)Verzeichnis (often)&lt;5 Sekunden, wenn HauptloadDatasets aktuell erledigt ist).
    * Neue Dienstleistung zu ermöglichen[eine URL zur Erstellung einer Flaggendatei](/docs/server-admin/additional-information#set-dataset-flag)für einen bestimmten Datensatz, z.
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
erstellt eine Flag-Datei im Flag-Verzeichnis für rPmelTao (obwohl die Flagge Schlüssel hier ist falsch) .
    * Neu[Abonnement](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)Service, damit jeder Client eine Aktion angeben kann, die bei der Erstellung eines bestimmten Datensatzes durchgeführt wird (wennERDDAP™wird neu gestartet) und wenn sich der Datensatz in irgendeiner Weise ändert. Dieses System kann über&lt;Subskription SystemActive&gt; in Ihrem[Setup.xml](/docs/server-admin/deploy-install#setupxml)Datei. DieERDDAP™ [Tagesbericht](/docs/server-admin/additional-information#daily-report)jetzt listet alle Abonnements auf und beinhaltet die URL, die für die Löschung von jedem erforderlich ist, falls Sie das System missbraucht fühlen. Indatasets.xmlEs gibt eine neue, optionale [&lt;Abonnement EmailBlacklist&gt; (/docs/server-admin/datasets#subscriptionemailblacklist) tag, so dass Administratoren eine komma-separierte Liste von E-Mail-Adressen angeben können, die sofort aus dem Abonnementsystem in schwarz aufgeführt sind.
    * Neu [&lt;onChange&gt; (/docs/server-admin/datasets#onchange) Attributdatasets.xmldieERDDAP™Administrator geben Sie eine Aktion an, die durchgeführt wird, wenn ein bestimmter Datensatz erstellt wird (wennERDDAP™wird neu gestartet) und wenn sich der Datensatz in irgendeiner Weise ändert.
    * Verbesserungen bei der Volltextsuche: Die Speicherung der Suchkette für jeden Datensatz nutzt nun 1/2 den Speicher. Der Suchalgorithmus (Boyer-Moore-like) ist jetzt 3X schneller.
    * Emails vonERDDAP™jetzt immer das Thema und Inhalt\\[Erdddap Url\\], so dass es klar ist,ERDDAP™das kam aus (falls Sie mehrereERDDAPS) .
    * Mehr umfangreiche Statistiken für die[Tagesbericht](/docs/server-admin/additional-information#daily-report)E-Mail.
    * Neue Protokolldatei\\[BigParentDirectory\\]/emailLogYEAR-MM-DD.txt protokolliert alle vonERDDAP™jeden Tag. Dies ist besonders nützlich, wenn Ihr Server tatsächlich keine E-Mails senden kann -- Sie können sie zumindest im Protokoll lesen.
    *   ERDDAP™macht\\[BigParentDirectory\\]/cache/ (datasetID) Verzeichnis für jeden Datensatz, da es viele Dateien kache.
* Neu[RSSTEIL 1](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)für jeden Datensatz (für die orangeRSSIcons auf den Listen von Datensätzen, Datenzugriffsformularen und erstellen Sie eine Graph-Webseiten) .
*   EDDGrid .kmlAntworten verwenden jetzt geflieste Bilder ("superoverlays" -- dynamisch generierte Quadtree-Bilder) . Das erste Bild lädt in GoogleEarth viel schneller als zuvor. Die Auflösung der Karte erhöht sich, wenn Sie einzoomen, bis zur vollständigen Auflösung des Datensatzes. Empfehlen: Benutzer sollten anfordern.kmlfür einen Zeitpunkt, aber der gesamte Längenbereich des Datensatzes. Leider wurde die Unterstützung für Zeitbereiche entfernt (Ich hoffe, es wird zurückkommen) .
*   ERDDAP™Jetzt wird hinzugefügt[Expires und Cache-Control max-age headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)auf alle Dateien aus dem /images-Verzeichnis angefordert. Dies reduziert die Anzahl der statischen Dateianforderungen, die anERDDAPund so stark beschleunigt am meistenERDDAP™Seite lädt. Auch, vieleJavaScript-Datei-Referenzen bewegt sich auf der Unterseite ihrer HTML-Seiten, die auch vieleERDDAP™Seite lädt. Dank des Buches "High Performance Web Sites" von Steve Souders und der ySlow Ergänzung zum FireBug Plugin in FireFox.
*   ERDDAP™von netcdf-java 2.2.22 auf netcdf-java 4.0 umgeschaltet. Dies erlaubt unter anderemEDDGridVonNcFiles zum LesenHDF .hdf, sowie GRIB .grb undNetCDF .ncDateien.
*   EDDGridVonDap undEDDGridVonNcFiles unterstützt nun auch DArray (sowie DGrid)  dataVariableS. Wenn eine Dimension keine entsprechende Koordinatengröße aufweist,ERDDAP™erzeugt eine Achsgröße mit den Indexwerten (z.B. 0, 1, 2, ..., 311, 312) . Also alle anderen AspekteEDDGridbleibt gleich:
) Es dient immer noch allen Datensätzen als Gitter, mit einer für jede Dimension variablen Achse.
) Abfragen können noch Werte aus den Achsengrößen anfordern.
Dank Charles Carleton, Thomas Im, Dorian Raymer und anderen.
* DieWMS OpenLayersSeiten haben nun einen Standard-Längswinkelbereich, der etwas größer ist als der Datensatzbereich (nicht der genaue Bereich, so dass der Kontext der kleinen Datensätze offensichtlicher ist) . Der Standardbereich kann nun auch 0 bis 360 betragen, was die vollständige Reichweite vieler Datensätze jetzt anzeigen lässt. DankToddSpindler.
* Neue Slider auf einigen Datenzugriffsformularen und erstellen Sie eine Graph-Webseiten. Sie vereinfachen (Rohöl) Spezifikation der gewünschten Daten und gutes visuelles Feedback.
* Eine neue Option für die&lt;Datensatz&gt; in den Warenkorbdatasets.xml:[active="false"](/docs/server-admin/datasets#active).
* ReferenzenERD'ERDDAP™von Coastwatch.pfel (noch funktioniert per Proxy) an der Küste beobachten.pfeg (bevorzugt) .
* Neue Unterstützung für[data\\_minunddata\\_max](/docs/server-admin/datasets#data_min-and-data_max)Variable Metadaten-Attribute.
* Eine teilweise Lösung für die[WaitThenTryAgain / Teilergebnisse Ausnahme](/docs/server-admin/additional-information#waitthentryagain-exception): Nun gelingt es einigen Anträgen, die zuvor beim Erkennen einer Datenquellenänderung fehlgeschlagen wurden, weilERDDAP™wird den Datensatz neu laden und die Daten automatisch neu erfragen, alles im Kontext der ursprünglichen Anfrage.
* Fehlerbehebung: erzeugen Datensätze Xml wurde behindertERDDAP™Version 1.12. Danke an Ellyn Montgomery, dass Sie das hier zeigen.
* Kleine Änderungen der Fehlerbehandlung.
* Viele Verbesserungen zur Vermeidung/Deal bei möglichen Race-Bedingungen (d.h. mögliche Probleme, die sich aus der mehrgängigen Natur ergebenERDDAP) die kleine, seltene Probleme verursachten.
* Wenn nun eine Fehlermeldung auf einem Bild geschrieben wird, bleibt das Bild nur für ~5-10 Minuten im Cache. (nicht 60) . Danke an Cara Wilson.
* Die Standard-Nachricht, wenn es keine Daten gibt, ist jetzt "Ihre Abfrage hat keine passenden Ergebnisse erzeugt.", die kürzer, genauer und passtOPeNDAPServer.
*   EDDGridnicht mehr erlaubt gebundene Achswerte.
* Kleine Änderungen an .ver und .help-Anfragen.
* Viele kleine Änderungen und Fehlerbehebungen.
     

## Version 1.12{#version-112} 
 (veröffentlicht 2008-10-31) 

* EDDTableFromSOSwieder arbeitet mit NDBCSOSund arbeitet mit dem neuen NOSSOS.
* EDDTableFromBMDE benötigtERDDAP™Admin zur AngabedataVariableS.
*   EDDGriderfordert nicht mehr, dass Lat und lon gleichmäßig beabstandet sind. transparent Png oder.kml. DankToddSpindler.
* Ein paar kleine Veränderungen.
     

## Version 1.10{#version-110} 
 (veröffentlicht 2008-10-14) 

* Neue "colorBar"-Metadaten für Datenvariablen indatasets.xmldefiniert die Standard-Farbleiste-Einstellungen für Grafiken und Karten. Vgl.[Weitere Informationen](/docs/server-admin/datasets#color-bar-attributes). Dies ist wichtig, weil es das Aussehen der Standard-Diagramme und Karten, die von Make A Graph erstellt werden, erheblich verbessert und weil die Standard-Diagramme und Karten jetzt eine einheitliche Farbleiste haben, auch wenn der Client die gewünschte Zeit oder geographische Reichweite ändert. Auch dies war notwendig fürWMS.
*   ERDDAP™nun die meisten Gitterdaten über eineWMSService. Dies ist wichtig, weil es zeigt, dass, zusätzlich zu Daten von vielen Arten von Datenservern,ERDDAP™Daten über verschiedene Protokolle verteilen (DAP,WMS, ... mehr in Zukunft) . Siehe[Kundendokumentation](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html). Oder[Dokumentation für Administratoren](/docs/server-admin/datasets#wms). Oder[Probieren Sie es aus](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html).
* Neue Unterstützung für Longitude-Werte &gt; 180 in.kmlDateien.
* Neue cdm\\_data\\_type: Andere .
*   ERDDAP™unterstützt jetzt "boolean" QuelldatenType. Vgl.[Weitere Informationen](/docs/server-admin/datasets#boolean-data)Dies wird für die zukünftige EDDTableFromDatabase nützlich sein.
* Neue EDDTableFromBMDE unterstützt Datenquellen von DiGIR/BMDE.
* EDVGridAxis erlaubt absteigende Sortierwerte. Die pmelOscar-Datensätze brauchten dies.
*   ERDDAP™gibt nun HTTP-Fehler zurück (z.B. "404 für Ressource/Seite nicht gefunden") in mehr Situationen statt HTML-Seiten mit Fehlermeldungen.
* Viele Änderungen/Zugaben an dieERDDAP™Dokumentation.
* Viele kleine Veränderungen.
* Ein paar Fehlerbehebungen.
*    **DingeERDDAP™Administratoren sollten diese Version aktualisieren:** 
    * Indatasets.xml, für jedes EDDTableFromSOSdatasets, ändern Sie die Metadaten "observedProperty" auf "sourceObservedProperty".
    * Die Regeln für einaxisVariableoderdataVariable'destinationNamewerde nun[strenger](/docs/server-admin/datasets#datavariable-addattributes). Sie müssen überprüfen, ob Ihre Variablennamen gültig sind. Überprüfen Sie sie entweder von Hand oder laufen SieERDDAP™und schauen Sie sich die Fehlermeldungen in dem Bericht an, der an den Administrator gesendet wird.
    * Indatasets.xml, wenn Sie möchten, dass eine Netzdatenvariable überWMS, Sie müssen hinzufügen colorBar metadata. Zumindest beispielsweise&lt;att name="colorBarMinimum"typ="double"&gt;0&lt;/att&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Vgl.[Weitere Informationen](/docs/server-admin/datasets#wms).
    * Fügen Sie folgendes hinzu[Setup.xml](/docs/server-admin/deploy-install#setupxml)Datei (aber es mit Ihren Informationen anpassen) :

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## Version 1.08{#version-108} 
 (veröffentlicht 2008-07-13) 

* Ein neuer WebserviceERDDAP™, erzeugen Datensätze Xml, hilftERDDAP™Administratoren, indem ein grober Entwurf des XML erstellt wird, der benötigt wird, um einen Datensatz indatasets.xml
* Einige Änderungen/Bug-Behebungen, die darauf abzielen, dass die netcdf-java als Opendap-Server betrachtet werden kann, einschließlich: Globale Metadaten werden jetzt als "NC\\_GLOBAL" bezeichnet. (statt "GLOBAL") .
* DieEDDGridund EDDTable Data Access Formulare nutzen nun Abfrageinformationen in der URL. Wenn beispielsweise ein Benutzer von einem Formular für einen Graph erstellen in ein Datenzugriffsformular geht, werden die Einschränkungen nun ordnungsgemäß übertragen.
*   tabledap's Make A Graph erlaubt jetzt Einschränkungen auf String-Variablen.
* EDDTable's Make A Graph ermöglicht jetzt NaN-Zwänge. Danke an Steve Hankin.
* Fehlerbehebung: EDDTable speichern AsImage hat die .colorbar min und max Werte nicht richtig erkannt. Danke an Steve Hankin
* Viele Verbesserungen an setupDatasetsXml. Dank Ellyn Montgomery.
* Griddap-Anfragen erlauben () -Style fordert etwas außerhalb des tatsächlichen Achsbereichs. Dies ist angemessen, da () -Werte werden auf den nächsten Istwert gerundet. Dank Cindy Bessey
* Ich machte den FloatArray und DoubleArray Test von isEvenlySpaced anspruchsvoller. Es wird immer unvollkommen (weil der Test für jeden Datensatz angepasst werden müsste) Aber es sollte besser sein. Dank Ellyn Montgomery.
* Ich habe setup.html und setupDatasets verschoben Xml.html erddap's /download-Verzeichnis und hart verschlüsselt alle Links zu ihnen. Jetzt kann ich Änderungen vornehmen und die Setup-Informationen sofort aktualisieren.
* Viele kleine Veränderungen. Ein paar kleine Fehlerbehebungen.
*    **DingeERDDAP™Administratoren sollten diese Version aktualisieren:** 
    * Los.&lt;Die Beschreibung Html&gt; von Ihren Nachrichten.xml zu Ihrem[Setup.xml](/docs/server-admin/deploy-install#setupxml)Datei. Es gibt den Text, der in der Mitte der linken Seite derERDDAP™Homepage. Auch, hinzufügen&lt;H1&gt;ERDDAP&lt;/h1&gt; (oder eine andere Überschrift) auf die Spitze. **Oder,** Kopie&lt;theShortDescriptionHtml&gt; in der neuen[Setup.xml](/docs/server-admin/deploy-install#setupxml)Datei (aus dem neuen erddapContent.zip) in Ihre setup.xml.
         

## Version 1.06{#version-106} 
 (veröffentlicht 2008-06-20) 

* Neue Unterstützung fürIOOS DIF SOSDatenquellen.
* Viele kleine Veränderungen. Ein paar kleine Fehlerbehebungen.
     

## Version 1.04{#version-104} 
 (veröffentlicht 2008-06-10) 

* Neue Slide Sorter Funktion.
* Neue Google Gadgets Seite und Beispiele.
* Fehlerbehebung inEDDGrid.saveAsNc für Variable mit Skalen und AddOffset.
     

## Version 1.02{#version-102} 
 (veröffentlicht 2008-05-26) 

* NeuEDDGridSideBySide ermöglicht verschiedeneaxisVariableS\\[0)\\]Quelle Werte.
* Alle Strom- und Winddatensätze wurden inEDDGridSideBySide-Datensätze.
* Bilder aus Bildanfragen werden nun für 1 Stunde geätzt.
     

## Version 1,00{#version-100} 
 (veröffentlicht 2008-05-06) 

* Erstellen Sie ein Graph-Webseiten und Grafikbefehle in URLs.
* Unterstützung für Flag-Dateien, um das Nachladen eines Datensatzes zu zwingen.
* Neuer Datensatztyp: EDDTableFrom4DFiles (die erste Unterklasse von EDDTableFromFiles) .
