---
sidebar_position: 9
---
# Prometheus

[Prometheus Metriken](https://prometheus.io/)erhältlich bei /erddap/metrics. JVM-Kernmetriken wurden in 2.25 mit vielenERDDAP™Metriken in Version 2.26 hinzugefügt. Wenn Sie die Metriken verwenden möchten, stellen Sie sicher, dass Sie in mindestens Version 2.26 sind. Sie sind standardmäßig aktiviert, Sie können sie deaktivieren, indem Sie
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
auf Ihre setup.xml.

Diese Metriken sind maschinenlesbar ausgebildet. Während Sie die Metriken-Seite manuell überprüfen können, wird für die Tiefenüberwachung empfohlen, einen Prometheus-Server zu verwenden. Ein Prometheus-Server speichert historische Metriken, die mehr in der Tiefenüberwachung ermöglichen (wie Zinsen und Änderungen von früheren Werten) , und auch wird oft mit einem Grafana-Server betrieben. Wir bieten einige vorgefertigte Dashboards, die Admins können nützlich finden, um gestartete Überwachung ihrer Server.

## Prometheus Server

Die beste Dokumentation für den Betrieb des Überwachungsstapels (Prometheus + Grafana) ist im Prometheus[Gefällt mir](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md).

## ERDDAP™Metriken

### JVM

ERDDAP™exportiert eine Reihe von Metriken, die Sie nützlich finden können (AnfangERDDAP™2.2.2.) . Zur allgemeinen Überwachung der Gesundheit des JVM verwenden wir die von dem Prometheus-Client gesammelten Metriken. Dazu gehören Daten über Müllsammlung, Speichernutzung, Threads und mehr. Für weitere Informationen siehe[PrometheusJavaClient JVM Dokumentation](https://prometheus.github.io/client_java/instrumentation/jvm/).

### ERDDAP™spezifische

Wir exportieren auch eine Reihe vonERDDAP™spezifische Metriken (AnfangERDDAP™2.26) . Wenn Sie in den Code graben möchten, können Sie die in[Metrics.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java).

#### ERDDAPIch bin nicht da.

Dies ist die Build-Info für dieERDDAP™Server. Es enthält die Version (Hauptsache) , version_full (Major.minor.patch) , und install_info (verwendet, um anzuzeigen, wie der Server bereitgestellt wird, wie "Docker ') .

#### feature_flags

Dies ist eine Infometrik, die den aktuellen Zustand der Feature-Flags zeigt. Die meisten Boolean Konfigurationsoptionen werden als Feature-Flags betrachtet.

#### gepuffert Bild

Dies ist eine Infometrie, die anzeigt, ob Grafikbeschleunigung verfügbar ist.

#### http_request_duration_Sekunden

Dies ist ein Histogramm der Anforderungsantwortdauern in Sekunden. Die Etiketten sind request_type (z.B. Gridap,tabledap, Dateien, wms) , dataset_id (falls zutreffend, andernfalls wiederholt der Antragstyp) , file_type (Ausgabeformat für Anfrage z.B. '.html', '.csv', '.iso19115 ') , lang_code (Sprache für die Anfrage oder leeren String, wenn Standardeinstellung) , status_code (httpStatuscode der Anfrage z.B. 200, 302, 404) .

Dies kann verwendet werden, um Anfragen von dataset id zu verfolgen, um die beliebten Datensätze des Servers zu ermitteln. Es kann auch helfen zu identifizieren, ob es bestimmte Arten von Anfragen, die langsam auf Ihrem Server sind.

#### touch_thread_duration_Sekunden

Ein Histogramm von Berührungsfaden-Taskdauern. Sie sind mit Erfolg gekennzeichnet (wahr/falsch) .

#### Task_thread_duration_Sekunden

Ein Histogramm der Arbeitsfadendauern. Sie sind mit Erfolg gekennzeichnet (wahr/falsch) und task_type (intetger) .

#### last_datasets_duration_seconds

Ein Histogramm der Dauer für Lastdatensätze. Sie sind mit großen (wahr/falsch) .

#### E-Mail_thread_duration_Sekunden

Ein Histogramm der E-Mail-Gewinde-Aufgabedauern. Sie sind mit Erfolg gekennzeichnet (wahr/falsch) .

#### E-Mail-Adresse

Ein Histogramm von E-Mails pro Aufgabe.

#### Datensatz_count

Ein Messgerät der Datensätze, das nach jedem Lastdatensatz-Aufruf gesetzt wird. Dies ist mit Kategorie gekennzeichnet (Gitter, Tisch) .

#### Datensatz_failed_load_count

Ein Messgerät der Datensätze, die nicht geladen wurden, nach jedem Lastdatensatz-Aufruf gesetzt.

#### shed_requests_total

Anzahl der Anträge, die vergossen wurden. Der Server vergossen eine Anfrage, wenn er glaubt, dass der Server auf dem Speicher niedrig ist (RAM) und die Anfrage würde Probleme verursachen. Dies beinhaltet keine Anfragen, die auf einen geringen RAM- oder Festplattenspeicher während der Bearbeitung der Anfrage zurückzuführen sind.

#### gefährlich_memory_emails_total

Manchmal versucht der Server, eine E-Mail an den Admin zu senden, dass der Speicher gefährlich niedrig ist.

#### gefährlich_memory_failures_total

Anzahl der Anfragen, die aufgrund der Maschine aus dem Speicher gelaufen sind. Oftmals ist dies, weil die Maschine viele teure Anfragen erhält oder die individuelle Anfrage außergewöhnlich groß war.

#### topo_request_total

Anzahl der Anfragen an Topo-Daten. Dieser Cache ist gekennzeichnet (Cache/not_cached) .

#### Kundschaftszähler

Es gibt auch eine Sammlung von Zählern für Anträge auf Grenzen:

 - national_boundaries_request_total
 - State_boundaries_request_total
 - Fluss_boundaries_request_total
 - gshhs_request_total

Diese sind mit Status gekennzeichnet (grob, erfolgreich, gesessen) .
