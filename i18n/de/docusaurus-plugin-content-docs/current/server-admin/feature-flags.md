# Flaggen

Diese Seite dokumentiert die im System verfügbaren Konfigurations-Flags. Diese Fahnen steuern verschiedene Funktionen, experimentelle Fähigkeiten und Vermächtnisse.

##  **Flagge Lifecycle Legend** 

*  **Stabil:** Beabsichtigt als langfristige Fahnen, um Admins die Funktionalität zu ändern. Sicher für die Produktion.
*  **Prüfung:** Eigenschaften, die zum Testen bereit sind. Diese werden entweder auf "Stable" absolvieren oder schließlich auf ihren Zielwert gesetzt und die Flagge entfernt.
*  **Unterbau:** Derzeit hartcodiert, um im Code, unabhängig von der Konfiguration. Die Funktion ist noch nicht gebrauchsfertig.

##  **🚀 Optimierungen im Test** 

Dies sind Fahnen, die in der Zukunft entfernt werden können.

###  **TouchThreadOnlyWhenItems** 

Warenbezeichnung
Optimierungsflagge. Wenn zutreffend, läuft der Berührungsfaden nur, wenn es Gegenstände zu verarbeiten gibt.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | Prüfung | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Hinzugefügt in 2.29.0 | 

###  **AufgabeCacheClear** 

Warenbezeichnung
Ermöglicht die Hintergrundaufgabe, die abgelaufene Elemente aus dem Cache gelöscht.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Hinzugefügt in 2.27.0 | 

###  **NcHeaderMakeFile** 

Warenbezeichnung
Wenn zutreffend, wird der Server die gesamte nc-Datei erzeugen, bevor Sie das ncheader-Ergebnis erstellen. Der neue (bevorzugt) Verhalten, wenn falsch ist, das ncheader-Ergebnis direkt zu erzeugen.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | Prüfung | 
 |   **Aktueller Fehler**   | falsch | 
 |   **Langfristiges Ziel**   | falsch | 
 |   **Geschichte**   | Hinzugefügt in 2.29.0 | 

###  **VerwendungEddReflexion** 

Warenbezeichnung
Ermöglicht die Verwendung von Java Reflexion an Instantiate EDD ( ERDDAP Datensatz) Klassen.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | Prüfung | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Standard geändert in 2.28.0, hinzugefügt in 2.25 | 

###  **HintergrundCreateSubsetTables** 

Warenbezeichnung
Ermöglicht die Erstellung von Subset-Tabellen in Hintergrundfäden, um die Ladezeit von Datensätzen zu verbessern.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | Prüfung | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Hinzugefügt in 2.29.0 | 

###  **NcMetadataForFileTable** 

Warenbezeichnung
Verwendung NetCDF Metadaten, um die Dateitabellenansicht zu bevölkern. Insbesondere, wenn eine nc-Datei die Ist_range für jede Variable enthält, kann die Datensatz-Beladung die gesamte Datei ablesen.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Hinzugefügt in 2.29.0 | 

##  **🛠 System und Kernverhalten** 

###  **E-Mail senden IsActive** 

Warenbezeichnung
Kontrolliert, ob das System versucht, tatsächliche E-Mails zu senden (z.B. für Abonnement-Updates oder Fehlerberichte) über den konfigurierten SMTP-Server.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | falsch | 
 |   **Langfristiges Ziel**   | wahr (Abhängig von admin config)   | 
 |   **Geschichte**   | Vermächtnis | 

::
Dieses Flag wird dynamisch beim Start berechnet. Es ist standardmäßig falsch, es sei denn, alle benötigten SMTP-Anmeldeinformationen (host, port, user, passwort, from-address) werden streng in setup.xml bereitgestellt.
:

###  **ShowLoadErrorsOnStatusPage** 

Warenbezeichnung
Bestimmt, ob detaillierte Datensatzlastfehler auf der Statusseite öffentlich angezeigt werden.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | auf Wunsch | 
 |   **Geschichte**   | Zusätzlich zu 2.25 | 

###  **StandardAccessibleViaFiles** 

Warenbezeichnung
Stellt das Standardverhalten fest, ob die zugrunde liegenden Dateien eines Datensatzes im Dateiendienst aufgerufen werden können.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | falsch | 
 |   **Langfristiges Ziel**   | falsch | 
 |   **Geschichte**   | Hinzugefügt in 2.10 | 

##  **🗃️ Datensätze** 

###  **schnell starten** 

Warenbezeichnung
Wenn aktiviert, versucht das System schneller zu starten, indem bestimmte tiefe Validierungsprüfungen bei Datensätzen während der Initialisierung übersprungen werden.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Hinzugefügt in 1.38 | 

###  **EnvParsing** 

Warenbezeichnung
Ermöglicht die Verarbeitung der datasets.xml Datei mit einer [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Dies hat viele Anwendungen, einschließlich der Einstellung privater Werte (wie Passwörter) Verwendung von Umgebungsvariablen.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | auf Wunsch | 
 |   **Geschichte**   | Hinzugefügt in 2.29.0 | 

###  **VerwendungSaxParser** 

Warenbezeichnung
Schaltet die interne XML-Parasing-Engine um einen SAX zu verwenden (Einfache API für XML) Parser statt des DOM-Parsers. Dies ermöglicht einige neue erweiterte Funktionen wie XInclude und [benutzerdefinierte Anzeige Attribute](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | Prüfung | 
 |   **Aktueller Fehler**   | falsch | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Zusätzlich zu 2.25 | 

###  **ListePrivateDatasets** 

Warenbezeichnung
Bestimmt, ob private Datensätze (die Authentifizierung erfordern) erscheinen in der Hauptdatensatzliste.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | falsch | 
 |   **Langfristiges Ziel**   | falsch | 
 |   **Geschichte**   | Hinzugefügt in 1.20 | 

###  **PolitikBoundariesActive** 

Warenbezeichnung
Kontrolliert, ob politische Grenzen auf Karten gezogen werden können.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Hinzugefügt in 1.80 | 

##  **Metadaten und Standards** 

###  **fgdcActive** 

Warenbezeichnung
Generiert und dient FGDC (Bundesgemeinschaft Informationsausschuss) Metadaten.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Hinzugefügt in 1.38 | 

###  **Iso19115 Aktiv** 

Warenbezeichnung
Erzeugt und dient ISO 19115 Metadaten.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Hinzugefügt in 1.38 | 

###  **VerwendungSisISO19115** 

Warenbezeichnung
Verwenden Sie die Apache SIS-Bibliothek, um ISO 19115 Metadaten anstelle des Legacy-Generators zu erzeugen. Ist dies auf und verwendetSisISO19139 nicht, werden die Standard-IOS 19115-Metadaten im Format ISO19115_3_2016 verwendet. Wenn dies falsch ist, wird das Standardformat im alten ISO19115_2 Format sein.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | Prüfung | 
 |   **Aktueller Fehler**   | falsch | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Zusätzlich zu 2.26 | 

###  **VerwendungSisISO19139** 

Warenbezeichnung
Verwenden Sie die Apache SIS-Bibliothek, um ISO19139_2007 Metadaten zu generieren.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | Prüfung | 
 |   **Aktueller Fehler**   | falsch | 
 |   **Langfristiges Ziel**   | falsch | 
 |   **Geschichte**   | Hinzugefügt in 2.29.0 | 

###  **JsonldActive** 

Warenbezeichnung
Generiert und dient JSON-LD (Linked Data) Metadaten.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Vermächtnis | 

###  **GenerierenCroissantSchema** 

Warenbezeichnung
Erzeugt das "Croissant"-Metadatenschema als Standardschema für maschinelles Lernen.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | Prüfung | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Hinzugefügt in 2.28.0 | 

###  **VariablenMustHaveIoosKategorie** 

Warenbezeichnung
Stellt fest, dass Variablen ein IOOS-Kategorie-Attribut haben müssen.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | auf Wunsch | 
 |   **Geschichte**   | Vermächtnis | 

###  **enthaltenNcCFSubsetVariables** 

Warenbezeichnung
Legacy-Verhalten war es, Subset-Variablen nur für EDDTableFromNcCFFiles-Datensätze zu generieren. Dies wurde zum Standard hinzugefügt, dass das Verhalten für EDDTableFromNcCFFiles mit anderen Datensätzen übereinstimmt. Wenn Sie die Vermächtnisautomatik benötigen subsetVariables Sie können dies aktivieren. Die bessere Lösung wäre, subsetVariables zur Datensatzdefinition.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | Prüfung | 
 |   **Aktueller Fehler**   | falsch | 
 |   **Langfristiges Ziel**   | falsch | 
 |   **Geschichte**   | Zusätzlich zu 2.26 | 

##  **🔔 Abonnements und Anmeldungen** 

###  **Abonnement SystemActive** 

Warenbezeichnung
Ermöglicht das E-Mail-Abonnement-System für Dataset-Updates.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Hinzugefügt in 1.14 | 

###  **abonnierenRemoteErdddapDataset** 

Warenbezeichnung
Erlaubt dies ERDDAP Beispiel, um Remote abonnieren ERDDAP Datensätze für Updates.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Hinzugefügt in 1.70 | 

###  **UpdateSubsRsOnFileChanges** 

Warenbezeichnung
Trigger Abonnement und RSS Aktualisierungen, wenn sich die zugrunde liegenden Dateien ändern. Das Vermächtnisverhalten war nur, um Updates zum Datensatz-Reload durchzuführen (die einige Server so selten wie wöchentlich hatten) .

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Zusätzlich zu 2.26 | 

###  **ermöglichen MqtBroker** 

Warenbezeichnung
Startet einen internen MQTT Broker innerhalb der Anwendung Messaging zu handhaben.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | Prüfung | 
 |   **Aktueller Fehler**   | falsch | 
 |   **Langfristiges Ziel**   | auf Wunsch | 
 |   **Geschichte**   | Hinzugefügt in 2.29.0 | 

###  **veröffentlichenMqtNotif** 

Warenbezeichnung
Ermöglicht die Veröffentlichung von Benachrichtigungen (wie Dataset Änderungen) zum MQTT-Broker.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | Prüfung | 
 |   **Aktueller Fehler**   | falsch | 
 |   **Langfristiges Ziel**   | auf Wunsch | 
 |   **Geschichte**   | Hinzugefügt in 2.29.0 | 

##  **🌐 Web Header/Konfiguration** 

###  **Verwenden SieHeadersForum Url** 

Warenbezeichnung
Ermöglicht die Verwendung von HTTP-Headern, die URL-Details der Anfrage zu ermitteln (nützlich hinter Proxis) .

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Standard geändert auf true in 2.28.0, Hinzugefügt in 2.27.0 | 

###  **ermöglichen Korsen** 

Warenbezeichnung
Ermöglicht Cross-Origin Resource Sharing (CORS) Header auf HTTP-Antworten.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | falsch | 
 |   **Langfristiges Ziel**   | auf Wunsch | 
 |   **Geschichte**   | Zusätzlich zu 2.26 | 

##  **🔍 Suche** 

###  **VerwendungLuceneSearchEngine** 

Warenbezeichnung
Schaltet die interne Suchmaschine, um Apache Lucene zu verwenden.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | Prüfung | 
 |   **Aktueller Fehler**   | falsch | 
 |   **Langfristiges Ziel**   | ? | 
 |   **Geschichte**   | Vermächtnis | 

##  **Dienstleistungen & Protokolle** 

###  **DateienAktiv** 

Warenbezeichnung
Ermöglicht die Browseransicht "Files" für Datensätze, die sie unterstützen.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Hinzugefügt in 1.58 | 

###  **KonverterAktiv** 

Warenbezeichnung
Ermöglicht Umwandlungstools in der UI.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Zusätzlich zu 1.44 | 

###  **SlideSorterActive** 

Warenbezeichnung
Ermöglicht den Slide Sorter.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Zusätzlich zu 1.44 | 

###  **dataProviderFormAktiv** 

Warenbezeichnung
Ermöglicht das Formular, dass Datenanbieter Metadaten eingeben können.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Vermächtnis | 

###  **outOfDateDatasetsAktiv** 

Warenbezeichnung
Ermöglicht die Berichterstattung über aktuelle Datensätze.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Hinzugefügt in 1.82 | 

###  **wmsAktiv** 

Warenbezeichnung
Ermöglicht den Web Map Service ( WMS ) Schnittstelle.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Zusätzlich zu 1.44 | 

###  **wmsClientAktiv** 

Warenbezeichnung
Ermöglicht die interne WMS Client-Funktionen.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | stabil | 
 |   **Aktueller Fehler**   | wahr | 
 |   **Langfristiges Ziel**   | wahr | 
 |   **Geschichte**   | Vermächtnis | 

###  **GeoServicesRestActive** 

Warenbezeichnung
Ermöglicht die RESTful Schnittstelle für Geospatial Services. Nicht vollständig umgesetzt.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | Baugewerbe | 
 |   **Aktueller Fehler**   | falsch (Hardcode)   | 
 |   **Langfristiges Ziel**   | wahr | 

###  **wcsAktiv** 

Warenbezeichnung
Ermöglicht den Web Coverage Service ( WCS ) Schnittstelle. Nicht vollständig umgesetzt.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | Baugewerbe | 
 |   **Aktueller Fehler**   | falsch (Hardcode)   | 
 |   **Langfristiges Ziel**   | wahr | 

###  **SosActive** 

Warenbezeichnung
Ermöglicht den Sensor Observation Service ( SOS ) Schnittstelle.

 | Eigentum | Details | 
 | ---- | ---- | 
 |   **Lebenszyklus**   | Baugewerbe | 
 |   **Aktueller Fehler**   | falsch (Hardcode)   | 
 |   **Langfristiges Ziel**   | wahr | 
