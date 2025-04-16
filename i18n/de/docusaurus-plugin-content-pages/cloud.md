---
title: "ERDDAP™ and the Cloud"
---
# ERDDAP™und die Cloud

## Was ist die Cloud?

Die einfachste Definition ist nicht lokale Server. Dies ist sehr breit und kann viele verschiedene Setups bedeuten. Es könnte beispielsweise ein dedizierter physischer Server in einem Rechenzentrum, einem Virtual Private Server, einem gemeinsamen Server, serverlos oder etwas anderes sein.

### Warum Cloud?

Es gibt viele Gründe, warum Organisationen sich in die Cloud bewegen wollen. Die wichtigste ist die Flexibilität, die es für Berechnungs- und Speicherbedarf im Vergleich zum Kauf physischer Hardware bietet.

Dies eliminiert die Notwendigkeit, ein Rechenzentrum / Server-Raum zu halten. Es ermöglicht auch die Skalierung von Rechenressourcen auf Ihre aktuellen Bedürfnisse. Ähnlich wie die Cloud kann viele verschiedene Dinge bedeuten, Ihre Ressourcen auch skalieren zu können. Es könnte bedeuten, mehr zu zahlen (oder weniger) Serverlose Ressourcen. Es könnte bedeuten, sich von einem gemeinsamen Server auf einen privaten Server zu bewegen. Es könnte bedeuten, einen größeren dedizierten physischen Server zu aktualisieren.

## KannERDDAP™in der Cloud laufen?

Ja.

ERDDAP™ist entworfen, um innerhalb von Tomcat laufen, die lokal oder in Cloud-Umgebungen ausgeführt werden können. Es gibt Gemeinschaftsunterstützung für das Laufen in Docker und es gibt[Beamte Docker Unterstützung kommt bald](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md).

Das sagte:ERDDAP™wurde zu einer Zeit entwickelt, als dedizierte Server die Norm waren. Es ist nicht serverlos, und wäre extrem schwierig, wenn nicht unmöglich, es serverlos zu machen.

### KannERDDAP™Skala?

SkalierungERDDAP™ist komplizierter als nur mit mehr serverlosen Ressourcen. Wir haben eine tolle Dokumentation[wie man skaliertERDDAP™](https://erddap.github.io/docs/server-admin/scaling). Es einfacher zu skalierenERDDAP™ist etwas, an dem wir interessiert sind.

### Was verhindert Autoskalierung?

ERDDAP™macht viele Dinge, einschließlich der Aktualisierung von Datensätzen auf dem neuesten Stand, die Anmeldung von Abonnenten von Änderungen an Datensätzen, Caching-Daten, Umgang mit Benutzeranfragen und mehr. Für eine ausreichend großeERDDAP™Server wie[Küstenwache](https://coastwatch.pfeg.noaa.gov/erddap/index.html)Das bedeutet, dass es immer etwas tut. Kontinuierliche Nutzung ist eigentlich eine äußerst teure Situation für serverlose Optionen (Sie zahlen eine große Prämie für die Berechnung, wenn Sie serverlos und so der Hauptvorteil ist, wenn Sie nur gelegentlich Anrufe) . Zusätzlich, versuchen, alle zu bewegenERDDAP™’s verschiedene Funktionalität zu serverlosen Versionen würde mit einem wesentlich komplizierteren Setup für Admins erforderlich.

### KannERDDAP™Cloud Storage verwenden?

Ja.

ERDDAP™unterstützt Cloud Storage (inklusive AWS S3) und Verbesserung dieser Unterstützung (z.B. nicht-AWS S3) eine hohe Priorität auf demERDDAP™Entwicklung Roadmap.ERDDAP™ist auch in der Lage, Daten von vielen vorhandenen Online-Diensten zu ziehen. Für weitere Informationen empfehle ich Ihnen unsere[Datensatz Typ Dokumentation](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types).
