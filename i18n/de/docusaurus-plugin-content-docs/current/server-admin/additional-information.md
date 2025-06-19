---
sidebar_position: 4
---
# Weitere Informationen

## Dinge, die Sie wissen müssen{#things-you-need-to-know} 
     
###    **[Proxy-Fehler](#proxy-errors)**  {#proxy-errors} 
Manchmal eine Anfrage anERDDAP™wird einen Proxy Error, einen HTTP 502 Bad Gateway Error oder einen ähnlichen Fehler zurückgeben. Diese Fehler werden von Apache oder Tomcat geworfen, nichtERDDAP™selbst.
* Wenn jede Anfrage diese Fehler generiert, insbesondere wenn Sie Ihre erste EinrichtungERDDAP™, dann ist es wahrscheinlich ein Proxy oder schlechte Gateway-Fehler, und die Lösung ist wahrscheinlich zu beheben[ERDDAP's Proxy-Einstellungen](/docs/server-admin/deploy-install#proxypass). Dies kann auch das Problem sein, wennERDDAP™plötzlich beginnt, diese Fehler für jede Anfrage zu werfen.
* Ansonsten sind "proxy" Fehler in der Regel Zeit aus Fehlern, die von Apache oder Tomcat geworfen werden. Auch wenn sie relativ schnell passieren, ist es eine Art Antwort von Apache oder Tomcat, die auftritt, wennERDDAP™ist sehr beschäftigt, speicherbegrenzt oder begrenzt durch eine andere Ressource. In diesen Fällen siehe unten die Beratung, um mit[ERDDAP™langsam reagieren](#responding-slowly).
        
Anfragen für einen langen Zeitbereich (&gt;30 Zeitpunkte) von einem netzgebundenen Datensatz sind anfällig für Zeitausfälle, die oft als Proxy-Fehler erscheinen, weil es fürERDDAP™alle Datendateien einzeln zu öffnen. wennERDDAP™ist sonst während der Anfrage beschäftigt, das Problem ist wahrscheinlicher auftreten. Wenn die Dateien des Datensatzes komprimiert werden, wird das Problem wahrscheinlicher auftreten, obwohl es für einen Benutzer schwer ist festzustellen, ob die Dateien eines Datensatzes komprimiert werden.
Die Lösung besteht darin, mehrere Anforderungen zu stellen, die jeweils einen geringeren Zeitbereich aufweisen. Wie klein ein Zeitbereich? Ich schlage vor, wirklich klein zu beginnen (- 30 Zeitpunkte?) , dann (etwa) verdoppeln Sie den Zeitbereich, bis die Anforderung ausfällt, dann gehen Sie zurück eine Verdoppelung. Dann stellen Sie alle Anfragen (jeder für ein anderes Stück Zeit) benötigt, um alle Daten zu erhalten.
EineERDDAP™Administrator kann dieses Problem durch die Erhöhung der[Apache Timeout Einstellungen](/docs/server-admin/deploy-install#apache-timeout).
        
### Überwachung{#monitoring} 
Wir alle wollen, dass unsere Datendienste ihr Publikum finden und umfassend genutzt werden, aber manchmal IhrERDDAP™kann zu viel verwendet werden, Probleme verursachen, einschließlich super langsame Antworten für alle Anfragen. Unser Plan zur Vermeidung von Problemen ist:

* MonitorERDDAP™über die[Status.html Webseite](#status-page).
Es hat Tonnen nützlicher Informationen. Wenn Sie sehen, dass eine große Anzahl von Anfragen kommen, oder Tonnen von Speicher verwendet werden, oder Tonnen von fehlgeschlagenen Anfragen, oder jeder Major LoadDatasets nimmt eine lange Zeit, oder sehen Sie jedes Zeichen von Dingen, die nach unten gedrängt werden und langsam reagieren, dann schauen Sie inERDDAP'[log.txt Datei](#log)um zu sehen, was los ist.
    
Es ist auch nützlich, einfach zu beachten, wie schnell die Statusseite reagiert. Wenn es langsam reagiert, ist das ein wichtiger Indikator, dassERDDAP™ist sehr beschäftigt.
    
* MonitorERDDAP™über die[Tagesbericht](#daily-report)E-Mail.
     
* Uhr für aktuelle Datensätze über die *BasisUrl* /erddap/outOfDateDatasets.htmlWebseite, die auf der optionalen[testOutOfDate](/docs/server-admin/datasets#testoutofdate)Globales Attribut.
     
#### Externe Monitore{#external-monitors} 
Die oben aufgeführten Methoden sindERDDAP's Möglichkeiten, sich selbst zu überwachen. Es ist auch möglich, externe Systeme zur Überwachung IhrerERDDAP. Ein Projekt dazu ist[Axioms Erddap-Metriken-Projekt](https://github.com/axiom-data-science/erddap-metrics). Solche externen Systeme haben einige Vorteile:
* Sie können angepasst werden, um die Informationen, die Sie wollen, in der Weise angezeigt werden, wie Sie wollen.
* Sie können Informationen überERDDAP™dassERDDAP™kann nicht einfach oder überhaupt zugreifen (z.B. CPU-Nutzung, Festplattenfreiraum,ERDDAP™Antwortzeit aus Sicht des Benutzers,ERDDAP™Zeit,
* Sie können Alarme bereitstellen (E-Mails, Telefonanrufe, Texte) an Administratoren, wenn Probleme eine Schwelle überschreiten.
             
### Mehrere gleichzeitige Anträge{#multiple-simultaneous-requests} 
*    **Blacklist-Benutzer, die mehrere gleichzeitige Anfragen machen&#33;** 
Wenn klar ist, dass einige Benutzer mehr als eine gleichzeitige Anfrage, wiederholt und kontinuierlich, dann fügen Sie ihre IP-Adresse zuERDDAP's [&lt;AnfrageBlacklist&gt; (/docs/server-admin/datasets#requestblacklist) in deinerdatasets.xmlDatei. Manchmal sind die Anfragen alle von einer IP-Adresse. Manchmal sind sie von mehreren IP-Adressen, aber klar den gleichen Benutzer. Sie können auch Blacklist Menschen machen Tonnen von ungültigen Anfragen oder Tonnen von mind-numbingly ineffizienten Anfragen.
    
Dann, für jede Anfrage, die sie machen,ERDDAP™zurück:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Hoffentlich wird der Benutzer diese Nachricht sehen und kontaktieren Sie, um herauszufinden, wie das Problem zu beheben und aus der Blacklist. Manchmal wechseln sie nur IP-Adressen und versuchen es erneut.
    
Es ist wie das Gleichgewicht der Macht zwischen offensiven und defensiven Waffen im Krieg. Hier die Verteidigungswaffen (ERDDAP) haben eine feste Kapazität, begrenzt durch die Anzahl der Kerne in der CPU, die Datenträgerzugriffsbandbreite und die Netzwerkbandbreite. Aber die beleidigenden Waffen (Benutzer, insbesondere Skripte) haben unbegrenzte Kapazität:
    
    * Eine einzige Anforderung an Daten aus vielen Zeitpunkten kann dazu führen, dassERDDAPeine große Anzahl von Dateien zu öffnen (in Sequenz oder teilweise mehrgängig) . In extremen Fällen kann eine "einfache" Anfrage leicht die RAID anschließenERDDAP™für eine Minute, effektiv die Handhabung anderer Anfragen zu blockieren.
         
    * Eine einzige Anfrage kann einen großen Speicher verbrauchen (auch wennERDDAP™wird codiert, um den Speicher zu minimieren, der benötigt wird, um große Anfragen zu behandeln) .
         
    * Parallelisierung - Ja.
Es ist einfach für einen cleveren Benutzer, eine große Aufgabe zu parallelisieren, indem viele Threads generiert werden, die jeweils eine separate Anfrage einreichen (die groß oder klein sein können) . Dieses Verhalten wird von der Informatik-Gemeinschaft als eine effiziente Art und Weise gefördert, mit einem großen Problem umzugehen (und Parallelisierung ist unter anderen Umständen effizient) . Zurück in die Kriegsanalogik: Benutzer können eine im Wesentlichen unbegrenzte Anzahl von gleichzeitigen Anfragen mit den Kosten jeder im Wesentlichen Null, aber die Kosten jeder Anfrage kommen inERDDAP™kann groß sein undERDDAP's Antwortfähigkeit ist endlich. Klar,ERDDAP™wird diese Schlacht verlieren, es sei dennERDDAP™Administrator Blacklists Benutzer, die mehrere gleichzeitige Anfragen machen, die ungerechterweise andere Benutzer ausdrängen.
         
    * Mehrere Skripte -
Denken Sie nun darüber nach, was passiert, wenn es mehrere clevere Benutzer gibt, die parallelisierte Skripte laufen. Wenn ein Benutzer so viele Anfragen generieren kann, dass andere Benutzer ausgeladen werden, können mehrere solcher Benutzer so viele Anfragen generieren, dassERDDAP™wird überwältigt und scheinbar unverantwortlich. Es ist effektiv ein[DDOS-Angriff](https://en.wikipedia.org/wiki/Denial-of-service_attack)Wieder die einzige Verteidigung fürERDDAP™is to blacklist user making multiple gleichzeitig Requests that are unfairly Crowding out other user.
         
    * Aufgeblasene Erwartungen -
In dieser Welt von massiven Tech-Unternehmen (Amazon, Google, Facebook, ...) , Benutzer haben zu erwarten, dass im Wesentlichen unbegrenzte Fähigkeiten von den Anbietern. Da diese Unternehmen Geld verdienen Operationen, je mehr Nutzer sie haben, desto mehr Einnahmen müssen sie ihre IT-Infrastruktur erweitern. So können sie sich eine massive IT-Infrastruktur leisten, um Anfragen zu bearbeiten. Und sie begrenzen die Anzahl der Anfragen und Kosten jeder Anfrage von den Benutzern durch Einschränkung der Arten von Anfragen, die Benutzer können, so dass keine einzige Anfrage ist belastend, und es gibt nie einen Grund (oder einen Weg) für Benutzer, um mehrere gleichzeitige Anfragen zu machen. So können diese riesigen Tech-Unternehmen weit mehr Benutzer alsERDDAP™, aber sie haben massiv mehr Ressourcen und clevere Möglichkeiten, die Anfragen von jedem Benutzer zu begrenzen. Es ist eine überschaubare Situation für die großen IT-Unternehmen (und sie werden reich&#33;) aber nichtERDDAP™Anlagen. Wieder die einzige Verteidigung fürERDDAP™is to blacklist user making multiple gleichzeitig Requests that are unfairly Crowding out other user.
         
    
So Benutzer: Machen Sie nicht mehrere gleichzeitige Anfragen oder Sie werden schwarz aufgeführt&#33;
     

Offensichtlich ist es am besten, wenn Ihr Server eine Menge Kerne hat, viel Speicher (so können Sie viel Gedächtnis zuordnenERDDAP™, mehr als es je braucht) , und eine hohe Bandbreite Internet-Verbindung. Dann ist der Speicher selten oder nie ein begrenzender Faktor, aber die Netzwerkbandbreite wird der häufigere Begrenzungsfaktor. Grundsätzlich, da es immer mehr gleichzeitige Anfragen gibt, verringert sich die Geschwindigkeit auf jeden einzelnen Benutzer. Das verlangsamt natürlich die Anzahl der Anfragen, die eintreffen, wenn jeder Benutzer nur eine Anfrage zu einem Zeitpunkt einreicht.
    
### ERDDAP™Daten von THREDDS bekommen{#erddap-getting-data-from-thredds} 
Wenn SieERDDAP™bekommt einige seiner Daten von einem THREDDS auf Ihrer Website, es gibt einige Vorteile, eine Kopie der THREDDS-Datendateien zu machen (zumindest für die beliebtesten Datensätze) auf einem anderen RAID,ERDDAP™Zugang hat, so dassERDDAP™kann Daten aus den Dateien direkt bedienen. ImERD, wir tun das für unsere beliebtesten Datensätze.

*   ERDDAP™kann die Daten direkt erhalten und müssen nicht warten, bis THREDDS den Datensatz neu laden oder ...
*   ERDDAP™kann sofort neue Datendateien erkennen und einbinden, so dass es nicht häufig THREDDS pesteren muss, um zu sehen, ob sich der Datensatz geändert hat. Siehe&lt;UpdateEveryNMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis) .
* Die Last wird zwischen 2 RAIDS und 2 Servern aufgeteilt, anstatt dass die Anfrage auf beiden hart istERDDAP™und THREDDS.
* Sie vermeiden das Fehlanpassungsproblem durch THREDDS mit einem kleinen (Standardmäßig) Maximale Anforderungsgröße.ERDDAP™hat ein System, um die Fehlanpassung zu bewältigen, aber das Problem zu vermeiden ist besser.
* Sie haben eine Sicherungskopie der Daten, die immer eine gute Idee ist.

In jedem Fall, führen Sie nie THREDDS undERDDAP™im gleichen Tomcat. Führen Sie sie in separaten Tomcats, oder besser, auf separaten Servern.

Wir finden, dass THREDDS in regelmäßigen Abständen in einem Zustand kommt, in dem Anfragen einfach hängen. Wenn SieERDDAP™Daten von einem THREDDS erhalten und die THREDDS in diesem Zustand sind,ERDDAP™hat eine Verteidigung (der THREDDS-basierte Datensatz ist nicht verfügbar) , aber es ist immer noch beunruhigend fürERDDAP™weilERDDAP™muss warten, bis das Timeout jedes Mal, wenn es versucht, einen Datensatz von einem aufgehängten THREDDS neu zu laden. Einige Gruppen (einschließlichERD) Vermeiden Sie dies durch proaktiven Wiederstart von THREDDS häufig (z.B. nächtlich in einem Cron Job) .

### Antwort langsam{#responding-slowly} 
*    **wennERDDAP™reagiert langsam** oder wenn nur bestimmte Anträge langsam reagieren,
Sie können herausfinden, ob die Langsamkeit angemessen und vorübergehend ist (z.B. wegen vieler Anfragen von Skripten oderWMSBenutzer) , oder wenn etwas unerklärlich falsch ist und Sie müssen[abschalten und Tomcat neu starten undERDDAP™](#shut-down-and-restart).
    
wennERDDAP™antwortet langsam, siehe die Beratung unten, um die Ursache zu bestimmen, die hoffentlich ermöglicht Ihnen, das Problem zu beheben.
Sie können einen bestimmten Ausgangspunkt haben (z.B. eine spezifische Anfrage-URL) oder einen vagen Ausgangspunkt (z.B.,ERDDAP™ist langsam) .
Sie können den Benutzer kennen (z.B., weil sie Ihnen per E-Mail) oder nicht.
Sie können andere Hinweise haben, oder nicht.
Da all diese Situationen und alle möglichen Ursachen der Probleme zusammen verschwimmen, versucht die nachstehende Beratung, alle möglichen Ausgangspunkte und alle möglichen Probleme im Zusammenhang mit langsamen Reaktionen zu behandeln.
    
    *    **Schau nach Hinweisen in[ERDDAPProtokolldatei](#log)**   ( *BigParentDirectory* /logs/log.txt) .
        \\[Bei seltenen Gelegenheiten gibt es Hinweise in[Die Protokolldatei von Tomcat](#tomcat-logs)  ( *Tomcat* /logs/catalina.out) .\\]  
Suchen Sie nach Fehlermeldungen.
Suchen Sie nach einer großen Anzahl von Anfragen aus einer (oder ein paar) Benutzer und vielleicht eine Menge der Ressourcen Ihres Servers (Speicher, CPU-Zeit, Festplattenzugriff, Internet-Band) .
        
Wenn das Problem angebunden ist **ein Benutzer** , Sie können oft einen Hinweis bekommen, wer der Benutzer über Webdienste wie[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)die Ihnen Informationen zur IP-Adresse des Nutzers geben kann (die Sie findenERDDAP'[Pressemitteilung](#log)Datei) .
        
        * Wenn der Benutzer scheint ein **Botanik** schlecht verhalten (insbesondere eine Suchmaschine, die versucht, dieERDDAP™Formen mit jeder möglichen Permutation von Eingangswerten) , stellen Sie sicher, dass Sie Ihren Server richtig eingerichtet haben[Roboter.txt](#robotstxt)Datei.
        * Wenn der Benutzer scheint ein **Skript (S) ** das mehrere gleichzeitige Anfragen macht, den Benutzer kontaktieren, erklären Sie, dass SieERDDAP™begrenzte Ressourcen (z.B. Speicher, CPU-Zeit, Festplattenzugriff, Internetbandbreite) , und bitten sie, überlegt von anderen Benutzern und nur eine Anfrage zu einer Zeit. Du könntest auch erwähnen, dass du sie verdunkelst, wenn sie nicht zurück sind.
        * Wenn der Benutzer scheint ein **Skript** eine große Anzahl von zeitraubenden Anfragen zu stellen, bitten Sie den Benutzer, überlegt von anderen Benutzern, indem eine kleine Pause (2 Sekunden?) im Skript zwischen Anfragen.
        *    **WMSKundensoftware** kann sehr anspruchsvoll sein. Ein Kunde fragt oft nach 6 benutzerdefinierten Bildern zu einer Zeit. Wenn der Benutzer scheint einWMSClient, der legitime Anfragen macht, können Sie:
            * Ignorieren Sie es. (empfohlen, weil sie sich bald bewegen) 
            * Schalten Sie die Server ausWMSService überERDDAP's setup.html-Datei. (nicht empfohlen) 
        * Wenn die Anträge erscheinen **dumm, verrückt, übertrieben oder schädlich,** oder wenn Sie das Problem nicht auf andere Weise lösen können, betrachten Sie vorübergehend oder dauerhaft die IP-Adresse des Benutzers an die [&lt;AnfrageBlacklist&gt; in Ihremdatasets.xmlDatei: (/docs/server-admin/datasets#requestblacklist) .
             
    *    **Versuchen Sie, das Problem selbst zu duplizieren, von Ihrem Computer.**   
Finde heraus, ob das Problem mit einem Datensatz oder allen Datensätzen, für einen Benutzer oder alle Benutzer, für nur bestimmte Arten von Anfragen, etc. ist.
Wenn Sie das Problem duplizieren können, versuchen Sie, das Problem einzuschränken.
Wenn Sie das Problem nicht duplizieren können, kann das Problem an den Computer des Benutzers, die Internetverbindung des Benutzers oder die Internetverbindung Ihrer Institution gebunden werden.
         
    * Wenn nur **ein Datensatz** wird langsam reagieren (vielleicht nur für **eine Art von Anfrage** von einem Benutzer) Das Problem kann sein:
        *   ERDDAPZugriff auf die Quelldaten des Datensatzes (insbesondere aus relationalen Datenbanken, Cassandra und Remote-Datensätzen) kann vorübergehend oder dauerhaft langsam sein. Versuchen Sie, die Geschwindigkeit der Quelle unabhängig vonERDDAP. Wenn es langsam ist, können Sie es vielleicht verbessern.
        * Ist das Problem mit der spezifischen Anfrage oder der allgemeinen Art der Anfrage?
Je größer die angeforderte Untermenge eines Datensatzes ist, desto wahrscheinlicher wird die Anfrage ausfallen. Wenn der Benutzer riesige Anfragen macht, bitten Sie den Benutzer, kleinere Anfragen zu machen, die eher eine schnelle und erfolgreiche Antwort erhalten.
            
Fast alle Datensätze sind besser bei der Bearbeitung einiger Arten von Anfragen als andere Arten von Anfragen. Zum Beispiel, wenn ein Datensatz in verschiedenen Dateien unterschiedliche Zeit-Chunks speichert, können Anfragen für Daten aus einer großen Anzahl von Zeitpunkten sehr langsam sein. Wenn die aktuellen Anforderungen schwierig sind, beachten Sie, eine für diese Anforderungen optimierte Variante des Datensatzes anzubieten. Oder erklären Sie dem Benutzer einfach, dass diese Art der Anfrage schwierig und zeitraubend ist, und fragen Sie nach ihrer Geduld.
            
        * Der Datensatz kann nicht optimal konfiguriert werden. Sie können Änderungen am Datensatz vornehmendatasets.xmlchunk to helpERDDAP™den Datensatz besser handhaben. Zum Beispiel
            
            *   EDDGridFromNcFiles-Datensätze, die auf Daten aus komprimierten nc4/hdf5-Dateien zugreifen, sind langsam, wenn Daten für den gesamten geographischen Bereich (z.B. für eine Weltkarte) weil die gesamte Datei dekomprimiert werden muss. Sie könnten die Dateien in unkomprimierte Dateien konvertieren, aber dann wird die Festplatten-Speicherbedarf viel, viel größer. Es ist wahrscheinlich besser, nur zu akzeptieren, dass solche Datensätze unter bestimmten Umständen langsam sind.
            * Die Konfiguration der [&lt;subsetVariables&gt; (/docs/server-admin/datasets#subsetvariables) tag hat einen großen Einfluss auf wieERDDAP™behandelt EDDTable-Datensätze.
            * Sie können die[Geschwindigkeit einer EDDTableFromDatabase](/docs/server-admin/datasets#database-speed)Datensatz.
            * Viele EDDTable-Datensätze können von[Speichern einer Kopie der Daten inNetCDFContiguous Ragged Array Dateien](/docs/server-admin/datasets#eddtablefromfiles), dieERDDAP™kann sehr schnell lesen.
            
Wenn Sie helfen möchten, einen bestimmten Datensatz zu beschleunigen, beinhalten Sie eine Beschreibung des Problems und der Datenmenge des Datensatzesdatasets.xmlund unsere[Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support).
             
    * wenn **alles** inERDDAP™ist **immer** langsam, das Problem kann sein:
        * Der Computer, der läuftERDDAP™kann nicht genug Speicher oder Verarbeitungsleistung haben. Es ist gut zu laufenERDDAP™auf einem modernen Multicore-Server. Für den schweren Einsatz sollte der Server ein 64-Bit-Betriebssystem und 8 GB oder mehr Speicher haben.
        * Der Computer, der läuftERDDAP™kann auch andere Anwendungen laufen, die viele Systemressourcen kosten. Wenn ja, können Sie einen dedizierten Server fürERDDAP? Zum Beispiel (das ist keine Bestätigung) , Sie können einen Quad-Core Mac Mini Server mit 8 GB Speicher für ~$1100.
             
    * wenn **alles** inERDDAP™ist **vorübergehend** langsam, sehen Sie IhreERDDAP'[ **/erddap/status.htmlSeite** ](#status-page)in Ihrem Browser.
        * Hat dieERDDAP™Statusseite nicht geladen?
Wenn ja,[NeustartERDDAP™](#shut-down-and-restart).
        * HatteERDDAP™Statusseite laden langsam (z.B. &gt;5 Sekunden) ?
Das ist ein Zeichen, dass alles inERDDAP™wird langsam laufen, aber es ist nicht unbedingt Ärger.ERDDAP™kann einfach wirklich beschäftigt sein.
        * Für "Response Failed Time (seit letzten großen LoadDatasets) ", ist n= eine große Zahl?
Das deutet darauf hin, dass es in letzter Zeit viele fehlgeschlagene Anträge gab. Das kann Ärger oder Ärger sein. Die mediane Zeit für die Fehler ist oft groß (z.B. 210000 ms) ,
was bedeutet, dass es (werden?) viele aktive Fäden.
die viele Ressourcen bündelten (wie Speicher, offene Dateien, offene Steckdosen, ...) ,
was nicht gut ist.
        * Für "Response Succeed Time (seit letzten großen LoadDatasets) ", ist n= eine große Zahl?
Das deutet darauf hin, dass es in letzter Zeit viele erfolgreiche Anträge gab. Das ist kein Problem. Es bedeutet nur, dass duERDDAP™wird schwer gebrauchen.
        * Ist die "Number of non-Tomcat-waiting threads" einen typischen Wert?
Dies ist oft ernste Probleme, die verursachenERDDAP™zu verlangsamen und schließlich zu frieren. Wenn dies stundenlang anhält, können Sie proaktiv sein[NeustartERDDAP™](#shut-down-and-restart).
        * Am unteren Ende der Liste "Memory Use Zusammenfassung" ist der letzte "Memory: aktuell verwenden" Wert sehr hoch?
Das kann nur eine hohe Nutzung angeben, oder es kann ein Zeichen von Schwierigkeiten sein.
        * Sehen Sie sich die Liste der Threads und ihren Status an. Ist eine ungewöhnliche Zahl von ihnen etwas ungewöhnliches?
             
    * I **Internetverbindung Ihrer Institution** aktuell langsam?
Suchen Sie das Internet nach "internet speed test" und verwenden Sie eine der kostenlosen Online-Tests, wie[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Wenn die Internetverbindung Ihrer Institution langsam ist, dann Verbindungen zwischenERDDAP™und Remote-Datenquellen werden langsam sein, und Verbindungen zwischenERDDAP™und der Benutzer wird langsam sein. Manchmal können Sie dies lösen, indem Sie unnötige Internetnutzung stoppen (z.B. Personen, die Streaming-Videos oder Videokonferenzanrufe beobachten) .
         
    * I **Internetverbindung des Benutzers** aktuell langsam?
Lassen Sie den Benutzer das Internet nach "internet speed test" suchen und nutzen Sie einen der kostenlosen Online-Tests, wie[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Wenn die Internetverbindung des Benutzers langsam ist, verlangsamt es den Zugriff aufERDDAP. Manchmal können sie dies lösen, indem sie unnötige Internetnutzung an ihrer Institution stoppen (z.B. Personen, die Streaming-Videos oder Videokonferenzanrufe beobachten) .
         
    *    **Stuck?**   
Sehen Sie uns[Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support).

### Halt die Klappe und Restart{#shut-down-and-restart} 
*    **Wie schalte ich die Klappe und stelle Tomcat undERDDAP™**   
Du musst Tomcat nicht abschalten und neu starten undERDDAPwennERDDAP™vorübergehend langsam ist, aus einem bekannten Grund langsam (wie viele Anfragen von Skripten oderWMSBenutzer) , oder Änderungen andatasets.xmlDatei.
    
Sie müssen abschalten und Tomcat neu starten undERDDAP™wenn Sie Änderungen in der setup.xml-Datei anwenden müssen, oder wennERDDAP™friert, hängt oder verriegelt. Unter extremen UmständenJavakann für eine Minute oder zwei einfrieren, während es eine vollständige Müllsammlung, aber dann wiederherstellen. So ist es gut, eine Minute oder zwei zu warten, um zu sehen, obJava/ERDDAP™ist wirklich gefroren oder wenn es nur eine lange Müllsammlung tut. (Wenn Müllsammlung ein häufiges Problem ist,[Tomcat mehr Speicher zuweisen](/docs/server-admin/deploy-install#memory).) 
    
Ich empfehle nicht, den Tomcat Web Application Manager zum Starten oder Abschalten von Tomcat zu verwenden. Wenn Sie nicht vollständig abschalten und starten Tomcat, früher oder später haben Sie PermGen Speicherprobleme.
    
Zum Abschalten und Neustart von Tomcat undERDDAP:
    
    * Wenn Sie Linux oder einen Mac verwenden:
         (Wenn Sie einen speziellen Benutzer erstellt haben, um Tomcat auszuführen, z.B. tomcat, erinnern Sie sich, die folgenden Schritte als dieser Benutzer zu tun.)   
         
        1. Verwendung cd *Tomcat* /bin
             
        2. Verwendung ps -ef|grep tomcat finden die java/tomcat-Prozess Ausweis (hoffentlich wird nur ein Prozess aufgeführt) , die wir rufen *JavaProcessid* unten.
             
        3. wennERDDAP™wird eingefroren/aufgehängt/verriegelt, töten -3 *JavaProcessid* zu sagenJava  (die Tomcat läuft) um einen Thread-Dump in die Tomcat-Log-Datei zu tun: *Tomcat* /logs/catalina.out . Nach dem Neustart können Sie das Problem diagnostizieren, indem Sie die Thread-Dump-Informationen finden (und alle anderen nützlichen Informationen darüber) in *Tomcat* /logs/catalina.out und auch durch Lesen relevanter Teile der[ERDDAP™archivieren](#log). Wenn Sie wollen, können Sie diese Informationen einschließen und unsere[Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support).
             
        4. Verwenden Sie ./shutdown. &#33;
             
        5. Verwendung ps -ef|grep tomcat wiederholt, bis der java/tomcat-Prozess nicht aufgeführt ist.
            
Manchmal dauert der Java/Tromat-Prozess bis zu zwei Minuten, um vollständig abzuschalten. Der Grund ist:ERDDAP™sendet eine Nachricht an ihre Hintergrundfäden, um sie zu stoppen, aber manchmal nimmt es diese Fäden eine lange Zeit, um zu einem guten Stoppplatz zu gelangen.
            
        6. Wenn nach einer Minute oder so, java/tomcat ist nicht von selbst stoppen, können Sie verwenden
Kill -9 *JavaProcessid*   
den Java/Ton-Prozess zu zwingen, sofort zu stoppen. Wenn möglich, verwenden Sie dies nur als letztes Resort. Der -9-Schalter ist leistungsstark, kann aber verschiedene Probleme verursachen.
             
        7. Um neu zu startenERDDAP™, verwenden ./startup.sh
             
        8. BlickERDDAP™in Ihrem Browser überprüfen, ob der Neustart erfolgreich ist. (Manchmal müssen Sie 30 Sekunden warten und versuchen, ladenERDDAP™wieder in Ihrem Browser, damit es gelingt.)   
             
    * Wenn Sie Windows verwenden:
         
        1. Verwendung cd *Tomcat* /bin
             
        2. Verwendungshutdown.bat  
             
        3. Sie können den Windows Task Manager verwenden möchten/bedürftig (erreichbar über Ctrl Alt Del) daßJava/Tomcat/ERDDAP™Prozess/Anwendung hat vollständig gestoppt.
Manchmal dauert die Prozess/Anwendung bis zu zwei Minuten, um abzuschalten. Der Grund ist:ERDDAP™sendet eine Nachricht an ihre Hintergrundfäden, um sie zu stoppen, aber manchmal nimmt es diese Fäden eine lange Zeit, um zu einem guten Stoppplatz zu gelangen.
             
        4. Um neu zu startenERDDAP™, verwenden Sie start.bat
             
        5. BlickERDDAP™in Ihrem Browser überprüfen, ob der Neustart erfolgreich ist. (Manchmal müssen Sie 30 Sekunden warten und versuchen, ladenERDDAP™wieder in Ihrem Browser, damit es gelingt.)   
             
### Häufige Ausschläge oder Einfrieren{#frequent-crashes-or-freezes} 
wennERDDAP™wird langsam, stürzt oder friert, etwas ist falsch. Sieh mal.[ERDDAPProtokolldatei](#log)die Sache herauszufinden. Wenn Sie nicht können, bitte die Details und sehen Sie unsere[Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support).

Das häufigste Problem ist ein mühsamer Benutzer, der mehrere Skripte gleichzeitig und/oder jemand, der eine große Anzahl von ungültigen Anfragen macht. Wenn dies geschieht, sollten Sie wahrscheinlich Blacklist dieser Benutzer. Wenn ein schwarzer Benutzer eine Anfrage macht, ermutigt die Fehlermeldung in der Antwort sie per E-Mail, um die Probleme zu bearbeiten. Dann können Sie sie ermutigen, nur ein Skript zu einer Zeit laufen und die Probleme in ihrem Skript zu beheben (z.B. das Anfordern von Daten von einem Remote-Datensatz, der vor dem Zeitpunkt nicht reagieren kann) . Siehe&lt;AnfrageBlacklist&gt; in Ihremdatasets.xmlDatei: (/docs/server-admin/datasets#requestblacklist) .

Unter extremen UmständenJavakann für eine Minute oder zwei einfrieren, während es eine vollständige Müllsammlung, aber dann wiederherstellen. So ist es gut, eine Minute oder zwei zu warten, um zu sehen, obJava/ERDDAP™ist wirklich gefroren oder wenn es nur eine lange Müllsammlung tut. (Wenn Müllsammlung ein häufiges Problem ist,[Tomcat mehr Speicher zuweisen](/docs/server-admin/deploy-install#memory).) 

wennERDDAP™wird langsam oder friert und das Problem ist nicht ein störender Benutzer oder eine lange Müllsammlung, Sie können das Problem in der Regel lösen, indem[NeustartERDDAP™](#shut-down-and-restart). Meine Erfahrung ist, dassERDDAP™kann monatelang laufen, ohne einen Neustart zu benötigen.
     

### Monitor{#monitor} 
Sie können IhreERDDAPStatus, indem man die[/erddap/status.htmlSeite](#status-page), insbesondere die Statistiken in der Hauptsache. wennERDDAP™wird langsam oder friert und das Problem ist nicht nur extrem schwer, Sie können das Problem in der Regel lösen, indem[NeustartERDDAP™](#shut-down-and-restart). Durch die Prometheus-Integration bei /erddap/metrics gibt es zusätzliche Metriken.

Meine Erfahrung ist, dassERDDAP™kann monatelang laufen, ohne einen Neustart zu benötigen. Sie sollten es nur neu starten müssen, wenn Sie einige Änderungen anwenden möchten, die Sie vorgenommen haben,ERDDAP's setup.xml oder wenn Sie neue Versionen vonERDDAP™,Java, Tomcat oder das Betriebssystem. Wenn Sie neu starten müssenERDDAP™häufig ist etwas falsch. Sieh mal.[ERDDAPProtokolldatei](#log)die Sache herauszufinden. Wenn Sie nicht können, bitte die Details und sehen Sie unsere[Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support). Als temporäre Lösung können Sie versuchen,[Monit](https://mmonit.com/monit/)um IhreERDDAP™und bei Bedarf neu starten. Oder Sie könnten einen Cron Job machen, um neu zu startenERDDAP™  (proaktiv) periodisch. Es kann eine kleine Herausforderung sein, ein Skript zu schreiben, um die Überwachung und Neustart zu automatisierenERDDAP. Einige Tipps, die helfen könnten:

* Sie können die Tests vereinfachen, wenn der Tomcat-Prozess noch mit dem -c-Schalter mit grep läuft:
ps -u *Tomcat Benutzer*  |grep -c java
Dadurch wird die Leistung auf "1" reduziert, wenn der Tomcat-Prozess noch am Leben ist, oder "0", wenn der Prozess gestoppt ist.
     
* Wenn Sie gut mit Gawk sind, können Sie die ProcessID aus den Ergebnissen der
ps -u *Tomcat Benutzer*  |grep java, und verwenden Sie die ProcessID in anderen Zeilen des Skripts.
     

Wenn Sie Monit oder einen Cron-Job einrichten, wäre es toll, wenn Sie die Details teilen könnten, damit andere unsere Vorteile sehen könnten.[Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support)wo man teilen kann.

#### Perg.{#permgen} 
Wenn Sie Tomcat Manager wiederholt zum Nachladen verwenden (oder stoppen und starten)  ERDDAP™,ERDDAP™kann nicht starten und java.lang werfen. OutOfMemoryError: PermGen. Die Lösung ist periodisch (oder jedes Mal?)  [Abschalten und Neustart tomcat undERDDAP™](#shut-down-and-restart), statt einfach neu zu ladenERDDAP.
\\[Update: Dieses Problem wurde erheblich minimiert oder behobenERDDAP™Version 1.24.\\]  
     
#### Protokoll{#log} 
*    **[Pressemitteilung](#log)**   
wennERDDAP™startet nicht oder wenn etwas nicht wie erwartet funktioniert, ist es sehr nützlich, die Fehler und Diagnose-Nachrichten in derERDDAP™Logfile.
    * Die Protokolldatei ist *BigParentDirectory* /logs/log.txt
         ( *BigParentDirectory* wird angegeben in[Setup.xml](/docs/server-admin/deploy-install#setupxml)) . Wenn es kein Protokoll gibt. txt-Datei oder wenn das Protokoll. txt-Datei wurde seit dem Neustart nicht aktualisiertERDDAP™, sieh in die[Tomcat Log Files](#tomcat-logs)um zu sehen, ob es dort eine Fehlermeldung gibt.
    * Arten von Diagnosenachrichten in der Log-Datei:
        * Das Wort "Error" wird verwendet, wenn etwas so falsch ging, dass das Verfahren nicht abgeschlossen. Obwohl es ärgerlich ist, einen Fehler zu bekommen, zwingt der Fehler, sich mit dem Problem zu befassen. Unser Denken ist, dass es besser ist, einen Fehler zu werfen als zu habenERDDAP™Sie haben sich auf eine Art und Weise entwickelt, die Sie nicht erwartet haben.
        * Das Wort "Warnung" wird verwendet, wenn etwas schief ging, aber das Verfahren konnte abgeschlossen werden. Das sind ziemlich selten.
        * Alles andere ist nur eine informative Nachricht. Sie können kontrollieren, wie viel Informationen mit [&lt;logLevel&gt; (/docs/server-admin/datasets#loglevel)  datasets.xml.
        * Datensatz-Reloads und Benutzer-Antworten, die &gt;10 Sekunden benötigen, um zu beenden (erfolgreich oder erfolglos) sind mit " gekennzeichnet (10er&#33;) ". So können Sie die log.txt-Datei für diesen Satz suchen, um die Datensätze zu finden, die langsam zu laden waren oder die Anforderungsnummer der Anfragen, die langsam zu beenden waren. Sie können dann in der log.txt-Datei höher aussehen, um zu sehen, was das dataset Problem war oder was die Benutzeranfrage war und von wem es war. Diese langsamen Datensatzbelastungen und Benutzerwünsche besteuern sich manchmal aufERDDAP. Damit Sie mehr über diese Anfragen wissen, können Sie helfen, Probleme zu identifizieren und zu lösen.
    * Informationen werden in der Log-Datei auf dem Laufwerk in ziemlich großen Stücken geschrieben. Der Vorteil ist, dass dies sehr effizient ist --ERDDAP™wird niemals verhindern, dass Informationen in die Protokolldatei geschrieben werden. Nachteilig ist, dass das Log fast immer mit einer Teilnachricht endet, die erst dann abgeschlossen werden wird, wenn der nächste Block geschrieben wird. Sie können es aktuell machen (für einen Augenblick) indem Sie IhreERDDAPStatus-Webseite auf https://*your.domain.org*/erddap/status.html   (oderhttp://wennhttpsist nicht aktiviert) .
    * Wenn die log.txt-Dateien auf 20 MB,
die Datei wird umbenannt log. txt.previous und eine neue log.txt-Datei wird erstellt. Log-Dateien sammeln sich also nicht an.
        
In setup.xml können Sie eine andere maximale Größe für die Log-Datei in MegaBytes angeben. Mindestens 1 (MB) . Höchstbetrag: 2000 (MB) . Der Standard ist 20 (MB) . Zum Beispiel:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Wann immer Sie neu startenERDDAP™,
        ERDDAP™macht eine Archivkopie von log.txt und log. txt.previous Dateien mit einem Zeitstempel im Namen der Datei. Wenn es Probleme vor dem Neustart gab, kann es nützlich sein, diese archivierten Dateien für Hinweise zu analysieren, was das Problem war. Sie können die Archivdateien löschen, wenn sie nicht mehr benötigt werden.
         
##### Parsing log.txt{#parsing-logtxt} 
ERDDAPDas Protokoll. txt-Datei ist nicht für Parsing konzipiert (obwohl Sie in der Lage sein, regelmäßige Ausdrücke zu erstellen, die gewünschte Informationen extrahieren) . Es ist entworfen, um einem Menschen zu helfen herauszufinden, was falsch läuft, wenn etwas schief geht. Wenn Sie einen Fehler oder Problembericht einreichen,ERDDAP™Entwickler, wenn möglich, enthalten Sie bitte alle Informationen aus der log.txt-Datei, die mit der mühsamen Anfrage verbunden ist.

Aus EffizienzgründenERDDAP™schreibt nur Informationen zum Log. txt nach einem großen Informationsbruch angesammelt. Also, wenn Sie log besuchen. txt, nachdem ein Fehler aufgetreten ist, dürfen Informationen über den Fehler noch nicht in log.txt geschrieben worden sein. Um aktuelle Informationen von log.txt zu erhalten, besuchen Sie IhreERDDAP'[Status.html Seite](#status-page). WannERDDAP™Prozesse, die verlangen, spült es alle anhängigen Informationen log.txt.

FürERDDAP™Nutzungsstatistik, bitte nutzen Sie die[Apache und/oder Tomcat Protokolldateien](#tomcat-logs)anstattERDDAPlog.txt. Anmerkung:ERDDAP'[Status.html Seite](#status-page)  (einige) und[Tagesbericht](#daily-report)  (mehr) eine große Anzahl von Nutzungsstatistiken für Sie vorkalkuliert haben.
    
### Tomcat Logs{#tomcat-logs} 
wennERDDAP™beginnt nicht, weil ein Fehler sehr früh aufgetreten istERDDAP's Start, die Fehlermeldung wird in Tomcat's Protokolldateien angezeigt ( *Tomcat* /logs/catalina. *heute* .log oder *Tomcat* /logs/catalina.out) , nicht in[ERDDAP's log.txt Datei](#log).

Nutzungsstatistik: Für die meisten Informationen, die Menschen aus einer Log-Datei sammeln möchten (z.B. Nutzungsstatistiken) , benutzen Sie bitte die Apache- und/oder Tomcat-Log-Dateien. Sie sind schön formatiert und haben diese Art von Informationen. Es gibt zahlreiche Werkzeuge, um sie beispielsweise zu analysieren.[AWStats](https://www.awstats.org),[ElasticSearch's Kibana](https://www.elastic.co/products/kibana), und[JMeter](https://jmeter.apache.org), aber suchen Sie das Web, um das richtige Werkzeug für Ihre Zwecke zu finden.

Beachten Sie, dass die Log-Dateien nur Benutzer als IP-Adressen identifizieren. Es gibt Webseiten, um Ihnen zu helfen, Informationen über eine bestimmte IP-Adresse zu erhalten, z.[Was ist meinIPAdresse](https://whatismyipaddress.com/ip-lookup), aber Sie werden normalerweise nicht in der Lage sein, den Namen des Benutzers zu finden.

Auch wegen[DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol), die IP-Adresse eines bestimmten Benutzers kann an verschiedenen Tagen unterschiedlich sein, oder verschiedene Benutzer können die gleiche IP-Adresse zu verschiedenen Zeiten haben.

Alternativ können Sie etwas wie[Google Analytics](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision). Aber Vorsicht: Wenn Sie externe Dienste wie Google Analytics verwenden, geben Sie die Privatsphäre Ihrer Nutzer auf, indem Sie Google vollen Zugriff auf ihre Aktivitäten auf Ihrer Website, die Google (Und andere?) kann für immer und jeden Zweck (vielleicht nicht technisch, aber wahrscheinlich in der Praxis) . Ihre Nutzer haben sich dazu nicht eingewilligt und sind sich wahrscheinlich nicht bewusst, dass sie auf Ihrer Website verfolgt werden, da sie wahrscheinlich nicht wissen, wie weit sie auf fast allen Websites verfolgt werden. In diesen Tagen sind viele Nutzer sehr besorgt, dass alles, was sie im Internet tun, von diesen großen Unternehmen überwacht wird (Google, Facebook, etc.) und von der Regierung, und finden Sie dies ein unbewährtes Eindringen in ihr Leben (wie im Buch, 1984) . Dies hat viele Benutzer zu installieren Produkte wie[Datenschutz Badger](https://www.eff.org/privacybadger/faq)um Tracking zu minimieren, alternative Browser wie[Tor Browser](https://www.torproject.org/)  (oder das Tracking in traditionellen Browsern ausschalten) , und alternative Suchmaschinen wie[Duck Duck Go](https://duckduckgo.com/). Wenn Sie einen Dienst wie Google Analytics verwenden, dokumentieren Sie bitte zumindest seine Nutzung und die Folgen durch Änderung der&lt;StandardPrivacyPolicy&gt; tag inERDDAP'
\\[Tomcat\\]/webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml Datei.
    
### E-Mail Log{#e-mail-log} 
*    **E-Mail Login-MM-DD.txt**   
    ERDDAP™schreibt immer den Text aller abgehenden E-Mail-Nachrichten in der aktuellen E-Mail LogYEAR-MM-DD.txt Datei in *BigParentDirectory* /logs ( *BigParentDirectory* wird angegeben in[Setup.xml](/docs/server-admin/deploy-install#setupxml)) .
    * Wenn der Server keine E-Mail-Nachrichten senden kann, oder wenn Sie konfiguriert habenERDDAP™nicht um E-Mail-Nachrichten auszusenden, oder wenn Sie nur neugierig sind, ist diese Datei eine bequeme Möglichkeit, alle E-Mail-Nachrichten zu sehen, die ausgesandt wurden.
    * Sie können die E-Mail-Log-Dateien früherer Tage löschen, wenn sie nicht mehr benötigt werden.
         
### Tagesbericht{#daily-report} 
Der Daily Report hat viele nützliche Informationen -- alle Informationen von IhremERDDAP'[/erddap/status.htmlSeite](#status-page)und mehr.
    * Es ist die vollständigste Zusammenfassung IhrerERDDAPStatus.
    * Unter anderen Statistiken enthält es eine Liste von Datensätzen, die nicht geladen wurden und die von ihnen generierten Ausnahmen.
    * Es wird erzeugt, wenn Sie startenERDDAP™  (nach obenERDDAP™versucht, alle Datensätze zu laden) und bald nach 7 Uhr Ortszeit jeden Morgen erzeugt.
    * Wenn es erzeugt wird, wird es geschrieben,[ERDDAP's log.txt Datei](#log).
    * Wenn es generiert wird, wird es per E-Mail an&lt;E-MailDailyReportsTo&gt; und&lt;E-Mail senden &gt; (die in[Setup.xml](/docs/server-admin/deploy-install#setupxml)) vorausgesetzt, Sie haben das E-Mail-System eingerichtet (in setup.xml) .

### Statusseite{#status-page} 
Sie können den Status IhresERDDAP™von jedem Browser durch gehen&lt;BasisUrl&gt;/erddap/status.html
* Diese Seite wird dynamisch generiert, so dass sie immer aktuelle Statistiken für IhreERDDAP.
* Es enthält Statistiken über die Anzahl der Anfragen, Speichernutzung, Fadenstapelspuren, die AufgabeThread, etc.
* Da die Statusseite von jedem betrachtet werden kann, enthält sie nicht so viele Informationen wie die[Tagesbericht](#daily-report).
         
### Hinzufügen/Ändern von Datensätzen{#addingchanging-datasets} 
ERDDAP™in der Regel rereadsdatasets.xmlalle *lastDatasetsMinutes*   (spezifiziert[Setup.xml](/docs/server-admin/deploy-install#setupxml)) . So können Sie Änderungen vornehmendatasets.xmljederzeit, sogar währendERDDAP™läuft.
Ein neuer Datensatz wird bald erkannt, in der Regel innerhalb *lastDatasetsMinutes* .
Ein geänderter Datensatz wird neu geladen, wenn er *reloadEveryNMinutes* alt (wie angegebendatasets.xml) .
    
#### Flagge{#flag} 
*    **[A Flag File](#flag)AngabenERDDAP™um zu versuchen, einen Datensatz so bald wie möglich zu laden** 
    
    *   ERDDAP™wird keine Änderungen am Setup eines Datensatzes bemerkendatasets.xmlbisERDDAP™den Datensatz neu laden.
         
    * Um es zu sagenERDDAP™einen Datensatz so schnell wie möglich neu laden (vor dem Datensatz&lt;reloadEveryNMinutes&gt; würde dazu führen, dass es neu geladen wird), setzen Sie eine Datei in *BigParentDirectory* /Flag ( *BigParentDirectory* wird angegeben in[Setup.xml](/docs/server-admin/deploy-install#setupxml)) der den gleichen Namen wie der Datensatz hatdatasetID.
Das sagt:ERDDAP™um den Datensatz ASAP neu zu laden.
Die alte Version des Datensatzes bleibt den Benutzern solange zur Verfügung, bis die neue Version verfügbar ist und atomar in Platz genommen wird.
FürEDDGridVonFiles und EDDTable FromFiles, der Reloading-Datensatz wird nach neuen oder geänderten Dateien suchen, diese lesen und in den Datensatz integrieren. So ist die Zeit zum Nachladen abhängig von der Anzahl der neuen oder geänderten Dateien.
Hat der Datensatz aktiv="false",ERDDAP™wird den Datensatz entfernen.
         
##### Fahne mit fehlerhaften Dateien{#bad-files-flag} 
* Eine Variante des /flag-Verzeichnisses ist das Verzeichnis /badFilesFlag. (ZusätzlichERDDAP™V2.12.)   
Wenn Sie eine Datei in die *BigParentDirectory* /badFilesFlag Verzeichnis mitdatasetIDals Dateiname (der Dateiinhalt spielt keine Rolle) , dann sobaldERDDAP™sieht die schlechtFiles Flaggendatei,ERDDAP™werden:
    
    1. Löschen Sie die badFilesFlag-Datei.
    2. Löschen Sie die BadFiles.ncDatei (wenn es eine gibt) , die die Liste der schlechten Dateien für diesen Datensatz hat.
Für Datensätze wieEDDGridSideBySide, die ChildDatasets haben, dies löscht auch die badFiles.ncDatei für alle Kinderdatensätze.
    3. Laden Sie den Datensatz ASAP neu.
    
So, diese UrsachenERDDAP™erneut versuchen, mit den Dateien vorher zu arbeiten (irrtümlich?) als schlecht markiert.
         
##### Hard Flag{#hard-flag} 
* Eine weitere Variante des /flag-Verzeichnisses ist das /hardFlag-Verzeichnis. (ZusätzlichERDDAP™V1.74.)   
Wenn Sie eine Datei in *BigParentDirectory* /hardFlag mitdatasetIDals Dateiname (der Dateiinhalt spielt keine Rolle) , dann sobaldERDDAP™sieht die hart Flaggendatei,ERDDAP™werden:
    
    1. Löschen Sie die HardFlag-Datei.
    2. Entfernen Sie den Datensatz vonERDDAP.
    3. Löschen Sie alle Informationen, dieERDDAP™über diesen Datensatz gespeichert ist.
FürEDDGridVonFiles und EDDTable FromFiles-Unterklassen, dies löscht die interne Datenbank der Dateien und deren Inhalte.
Für Datensätze wieEDDGridSideBySide, die ChildDatasets haben, löscht dies auch die interne Datenbank von Datendateien und deren Inhalte für alle Kinderdatensätze.
    4. Laden Sie den Datensatz neu.
FürEDDGridVonFiles und EDDTable AusFiles Unterklassen, diese UrsachenERDDAP™umzukehren **alle** der Datendateien. Somit ist die Nachladezeit von der Gesamtzahl der Datendateien im Datensatz abhängig. Weil der Datensatz entfernt wurdeERDDAP™wenn die hardFlag bemerkt wurde, wird der Datensatz nicht verfügbar sein, bis der Datensatz das Nachladen beendet. Sei geduldig. Schaut euch das an[Pressemitteilung](#log)Datei, wenn Sie sehen wollen, was los ist.
    
Die HardFlag-Variante löscht die gespeicherten Informationen des Datensatzes auch dann, wenn der Datensatz aktuell nicht geladen wirdERDDAP.
    
Hart Flaggen sind sehr nützlich, wenn Sie etwas tun, das eine Veränderung in der Art verursachtERDDAP™liest und interpretiert beispielsweise die Quelldaten, wenn Sie eine neue Version vonERDDAP™oder wenn Sie eine Änderung der Definition eines Datensatzes vorgenommen habendatasets.xml
    
* Der Inhalt der Flagge, badFilesFlag und hardFlag Dateien sind irrelevant.ERDDAP™Sieh nur den Dateinamen an, um diedatasetID.
     
* Zwischen großen Datensatz-Reloads,ERDDAP™sucht kontinuierlich nach Flagge, BadFilesFlag und HardFlag Dateien.
     
* Beachten Sie, dass, wenn ein Datensatz neu geladen wird, alle Dateien in der *BigParentDirectory* /[Cache](#cached-responses)/ *datasetID* Verzeichnis wird gelöscht. Dies schließt ein.ncund Bilddateien, die normalerweise cached für ~15 Minuten.
     
* Beachten Sie, dass, wenn der Datensatz xml enthält[active="false"](/docs/server-admin/datasets#active), ein Flag wird dazu führen, dass der Datensatz inaktiv gemacht wird (wenn es aktiv ist) , und in jedem Fall nicht neu geladen.
     
* ZeitERDDAP™führt LoadDatasets zu einem großen Nachladen (die von&lt;loadDatasetsMinutes&gt;) oder eine kleinere Nachladung (durch eine externe oder interne Flagge) ,ERDDAP™liest alle&lt;dekomprimiertCacheMaxGB&gt;,&lt;dekomprimiertCacheMaxMinutesAlt&gt;,&lt;Benutzer&lt;AnfrageBlacklist&gt;,&lt;langsamDownTroubleMillis&gt;, und&lt;AboEmailBlacklist&gt; Tags und schaltet die neuen Einstellungen. So können Sie eine Flagge als Weg zu bekommenERDDAP™Änderungen an diesen Tags zu bemerken ASAP.

##### Dataset Flag{#set-dataset-flag} 
*  ERDDAP™hat einen Webservice, damit die Fahnen über URLs eingestellt werden können.
    
    * Zum Beispiel
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (Das ist eine gefälschte Flagge Schlüssel) wird eine Flagge für den rPmelTao-Datensatz gesetzt.
    * Es gibt eine andere FlaggeKey für jededatasetID.
    * Administratoren können eine Liste von Fahnen-URLs für alle Datensätze sehen, indem sie auf der Unterseite ihrer[Tagesbericht](#daily-report)E-Mail.
    * Administratoren sollten diese URLs als vertraulich behandeln, da sie jemandem das Recht geben, einen Datensatz beliebig zurückzusetzen.
    * Wenn Sie glauben, dass die FlagKeys in die Hände von jemandem gefallen sind, der sie misst, können Sie ändern&lt;flagKeyKey&gt;[Setup.xml](/docs/server-admin/deploy-install#setupxml)und NeustartERDDAPin KraftERDDAP™zur Erzeugung und Verwendung eines anderen Satzes von flagKeys.
    * Wenn Sie sich ändern&lt;flagKeyKey&gt;, alle alten Abonnements löschen (die Liste in Ihrem Daily Report anzeigen) und erinnern Sie sich daran, die neuen URLs an die Leute zu senden, die Sie tun wollen, um sie zu haben.
    
Das Flag-System kann als Grundlage für einen effizienteren Mechanismus dienen, um zu sagenERDDAP™wenn Sie einen Datensatz neu laden. Zum Beispiel könnten Sie einen Datensatz festlegen&lt;reloadEveryNMinutes&gt; auf eine große Anzahl (z.B. 10080 = 1 Woche) . Dann, wenn Sie wissen, dass sich der Datensatz geändert hat (vielleicht, weil Sie eine Datei in das Datenverzeichnis des Datensatzes hinzugefügt) , ein Flag so einstellen, dass der Datensatz so schnell wie möglich neu geladen wird. Flaggen werden in der Regel schnell gesehen. Aber wenn der LoadDatasets Faden bereits beschäftigt ist, kann es eine Weile dauern, bis es auf der Flagge zu handeln ist. Aber das Flag-System ist viel ansprechender und viel effizienter als die Einstellung&lt;reloadEveryNMinutes&gt; auf eine kleine Zahl.
    
#### Datensätze entfernen{#removing-datasets} 
Wenn ein Datensatz aktiv istERDDAP™und Sie möchten es vorübergehend oder dauerhaft deaktivieren:
1. Indatasets.xmlfür den Datensatz, gesetzt[active="false"](/docs/server-admin/datasets#active)im Datensatz-Tag.
2. Warte aufERDDAP™zum Entfernen des Datensatzes während des nächsten großen Nachladens oder[eine Flagge setzen](#flag)für den Datensatz zu sagenERDDAP™diese Änderung so schnell wie möglich zu bemerken. Wenn du das tust,ERDDAP™wirft keine Informationen heraus, die sie über den Datensatz gespeichert haben kann und macht sicherlich nichts mit den tatsächlichen Daten.
3. Dann können Sie den aktiven="false" Datensatz indatasets.xmloder sie entfernen.
         
#### Wann werden Datasets wieder geladen?{#when-are-datasets-reloaded} 
Ein Thread namens RunLoadDatasets ist der Hauptfaden, der steuert, wenn Datensätze wieder geladen werden. Die Welt Datasets Schleifen für immer:

1. RunLoadDatasets stellt die aktuelle Zeit fest.
2. RunLoadDatasets startet einen LoadDatasets Thread, um einen "majorLoad" zu machen. Sie können Informationen über die aktuelle / previous MajorLoad an der Spitze IhrerERDDAP'
    [/erddap/status.htmlSeite](#status-page)  (zum Beispiel,[Statusseite Beispiel](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) .
    
    1. LoadDatasets macht eine Kopie vondatasets.xml.
    2. LoadDatasets liest durch die Kopie vondatasets.xmlund für jeden Datensatz sieht, ob der Datensatz sein muss (Wiederholen) geladen oder entfernt.
        * Wenn[Flagge](#flag)Datei existiert für diesen Datensatz, die Datei wird gelöscht und der Datensatz wird entfernt, wenn active="false" oder (Wiederholen) wenn aktiv="true" geladen (unabhängig vom Alter des Datensatzes) .
        * Wenn der dataset dataset.xml chunk des datasets active="false" hat und der Datensatz aktuell geladen wird (Wirkstoff) , es ist entladen (entfernt) .
        * Wenn der Datensatz aktiv="true" ist und der Datensatz nicht bereits geladen ist, wird er geladen.
        * Wenn der Datensatz aktiv="true" ist und der Datensatz bereits geladen ist, wird der Datensatz erneut geladen, wenn das Alter des Datensatzes (Zeit seit der letzten Last) größer als sein&lt;Nachladen AllNMinutes&gt; (Standard = 10080 Minuten) , ansonsten wird der Datensatz allein gelassen.
    3. LoadDatasets beendet.
    
Der RunLoadDatasets Faden wartet auf den LoadDatasets Faden zu beenden. Wenn LoadDatasets länger dauert als loadDatasets Minuten (wie in setup.xml angegeben) , RunLoadDatasets unterbricht den LoadDatasets Thread. Idealerweise bemerkt LoadDatasets den Interrupt und beendet. Aber wenn es den Interrupt innerhalb einer Minute nicht bemerkt, nennt RunLoadDatasets LoadDatasets. Stopp () , was unerwünscht ist.
3. Während die Zeit seit dem Start der letzten MajorLoad ist weniger als ladenDatasets Minuten (wie in setup.xml angegeben, z.B. 15 Minuten) , RunLoadDatasets sucht wiederholt nach[Flagge](#flag)Dateien in der *BigParentDirectory* /Flag Verzeichnis. Wenn eine oder mehrere Flag-Dateien gefunden werden, werden sie gelöscht, und RunLoadDatasets startet einen LoadDatasets Thread, um einen "minorLoad" zu tun (MajorLoad=false) . Sie können nicht sehen kleinereLoad Informationen auf IhrerERDDAP'[/erddap/status.htmlSeite](#status-page).
    1. LoadDatasets macht eine Kopie vondatasets.xml.
    2. LoadDatasets liest durch die Kopie vondatasets.xmlund für jeden Datensatz, für den es eine Flag-Datei gab:
        * Wenn der dataset dataset.xml chunk des datasets active="false" hat und der Datensatz aktuell geladen wird (Wirkstoff) , es ist entladen (entfernt) .
        * Hat der Datensatz aktiv="true", so ist der Datensatz (Wiederholen) beladen, unabhängig von seinem Alter. Nicht geflaggte Datensätze werden ignoriert.
    3. LoadDatasets beendet.
4. Die Welt Datasets geht auf Schritt 1 zurück.

Anmerkungen:
* Start
Wenn Sie neu startenERDDAP™, jeder Datensatz mit active="true" wird geladen.
* Cache
Wenn ein Datensatz (Wiederholen) geladen, sein Cache (einschließlich aller Datenantwortdateien und/oder Bilddateien) wird geleert.
* Viele Datensätze
Wenn Sie viele Datensätze haben und/oder ein oder mehrere Datensätze langsam sind (Wiederholen) laden, ein LoadDatasets Gewinde kann eine lange Zeit dauern, um seine Arbeit zu beenden, vielleicht sogar länger als ladenDatasets Minutes.
* Ein LoadDatasets Thread
Es gibt nie mehr als einen LoadDatasets Faden auf einmal laufen. Wenn beim Starten von LoadDatasets eine Flagge gesetzt wird, wird die Flagge wahrscheinlich nicht bemerkt oder aktiviert, bis der Thread LoadDatasets läuft. Man könnte sagen: "Das ist dumm. Warum starten Sie nicht einfach einen Haufen neuer Threads, um Datensätze zu laden?" Aber wenn Sie viele Datensätze haben, die Daten von einem Remote-Server erhalten, wird sogar ein LoadDatasets-Thread erhebliche Belastung auf dem Remote-Server setzen. Dasselbe gilt, wenn Sie viele Datensätze haben, die Daten von Dateien auf einem RAID erhalten. Es gibt schnell abnehmende Rücksendungen von mehr als einem LoadDatasets Thread.
* Flagge = ASAP
Setzen einer Flagge nur Signale, die der Datensatz sollte (Wiederholen) so schnell wie möglich geladen, nicht unbedingt sofort. Wenn aktuell kein LoadDatasets Thread läuft, wird der Datensatz innerhalb weniger Sekunden neu geladen. Wenn jedoch aktuell ein LoadDatasets-Gewinde läuft, wird der Datensatz wahrscheinlich erst nach Fertigstellung des LoadDatasets-Gewindes neu geladen.
* Flag File Gelöscht
Im Allgemeinen, wenn Sie eine Flag-Datei in die *BigParentDirectory* /erddap/flag Verzeichnis (durch den Besuch der Flagge des Datasets Url oder eine tatsächliche Datei dort setzen) , der Datensatz wird in der Regel sehr bald nach dem Löschen der Flag-Datei neu geladen.
* Flagge versus Kleine Nachladung AllNMinutes
Wenn Sie eine externe Möglichkeit haben, zu wissen, wann ein Datensatz neu geladen werden muss und ob es für Sie bequem ist, ist der beste Weg, um sicherzustellen, dass ein Datensatz immer aktuell ist, um seine Nachladung einzustellen EveryNMinutes zu einer großen Zahl (10080?) und eine Flagge setzen (über ein Skript?) wann immer es neu geladen werden muss. Das ist das System.EDDGridVonErddap und EDDTableFromErdap erhalten Nachrichten, die der Datensatz neu geladen werden muss.
* Sieh in log.txt
Viele relevante Informationen sind an die *BigParentDirectory* /logs/log.txt Datei. Wenn die Dinge nicht funktionieren, wie Sie erwarten, schauen Sie sich Log an. txt lässt Sie das Problem diagnostizieren, indem Sie genau herausfinden, wasERDDAP™tat.
    
    * Suche nach "majorLoad=true" für den Start von großen LoadDataset Threads.
    * Suche nach "majorLoad=false" für den Start von kleinen LoadDatasets Threads.
    * Suche nach einem bestimmten DatensatzdatasetIDfür Informationen darüber, (Wiederholen) geladen oder abgefragt.
        
          
         
#### Gepflegte Antworten{#cached-responses} 
Im Allgemeinen,ERDDAP™nicht kache (Laden) Antworten auf Nutzeranfragen. Die Begründung war, dass die meisten Anträge etwas anders wären, so dass der Cache nicht sehr effektiv wäre. Die größten Ausnahmen sind Anträge auf Bilddateien (die seit Browsern und Programmen wieGoogle Earthoft re-request Bilder) und Anfragen.ncDateien (weil sie nicht auf-the-fly erstellt werden können) .ERDDAP™speichert die zwischengespeicherten Dateien jedes Datensatzes in einem anderen Verzeichnis: *BigParentDirectory* /cache/ *datasetID* da ein einziges Cache-Verzeichnis eine große Anzahl von Dateien haben könnte, die langsam auf den Zugriff werden.
Dateien werden aus einem der drei Gründe aus dem Cache entfernt:
* Alle Dateien in diesem Cache werden gelöscht, wennERDDAP™wird neu gestartet.
* Regelmäßig jede Datei mehr als&lt;cacheMinutes&gt; alt (wie angegeben[Setup.xml](/docs/server-admin/deploy-install#setupxml)) wird gelöscht. Entfernen von Dateien im Cache basierend auf Alter (nicht Least-Recently-Used) sorgt dafür, dass Dateien nicht sehr lange im Cache bleiben. Obwohl es scheint, als sollte eine bestimmte Anfrage immer die gleiche Antwort zurückgeben, das ist nicht wahr. Zum Beispiel atabledapAnfrage, die u.a. *einige Zeit* wird ändern, wenn neue Daten für den Datensatz ankommen. Und eine Gridap-Anforderung, die beinhaltet\\[Letzter Beitrag\\]für die Zeitdimension wird sich ändern, wenn neue Daten für den Datensatz ankommen.
* Bilder, die Fehlerbedingungen zeigen, werden geätzt, aber nur für ein paar Minuten (es ist eine schwierige Situation) .
* Jedes Mal, wenn ein Datensatz neu geladen wird, werden alle Dateien in dem Datensatz Cache gelöscht. Weil Anträge für die"last"In einem netzgebundenen Datensatz können Dateien im Cache ungültig werden, wenn ein Datensatz wieder geladen wird.
         
#### Gespeicherte Datensatzinformationen{#stored-dataset-information} 
Für alle Arten von Datensätzen,ERDDAP™sammelt viele Informationen, wenn ein Datensatz geladen ist und dies im Speicher hält. Dies ermöglichtERDDAP™sehr schnell auf Suchanfragen, Listen von Datensätzen und Informationsanfragen über einen Datensatz reagieren.

Für einige Arten von Datensätzen (insbesondereEDDGridKopieren, EDDTableCopy,EDDGridVon *Xxx* Dateien und EDDTableFrom *Xxx* Dateien) ,ERDDAP™speichert auf der Festplatte einige Informationen über den Datensatz, der wieder verwendet wird, wenn der Datensatz neu geladen wird. Dadurch wird der Nachladevorgang stark beschleunigt.

* Einige der Datensatz-Informationsdateien sind menschlesbar.jsonDateien und werden in *BigParentDirectory* /Datensatz/ *last2LettersOfDatasetID/datasetID* .
*   ERDDAP™löscht diese Dateien nur in ungewöhnlichen Situationen, z.B. wenn Sie eine Variable aus dem Datensatz hinzufügen oder löschendatasets.xmlBlödsinn.
* Die meisten Änderungen an einem Datensatzdatasets.xmlSchrott (z.B. Änderung eines globalen Attributs oder eines variablen Attributs) nicht erforderlich, dass Sie diese Dateien löschen. Ein regelmäßiges Datensatz-Reload behandelt diese Arten von Änderungen. Du kannst es sagen.ERDDAP™um einen Datensatz ASAP neu zu laden[Flagge](#flag)für den Datensatz.
* Ebenso wird die Addition, Löschung oder Änderung von Datendateien behandelt, wennERDDAP™einen Datensatz neu lädt. Aber...ERDDAP™wird diese Art von Änderung bald und automatisch bemerken, wenn der Datensatz die [&lt;UpdateEveryNMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis) System.
* Es sollte nur selten notwendig sein, dass Sie diese Dateien löschen. Die häufigste Situation, in der Sie zwingen müssenERDDAP™um die gespeicherten Informationen zu löschen (weil es nicht aktuell/unrichtig ist und nicht automatisch durchERDDAP) ist, wenn Sie Änderungen am Datensatz vornehmendatasets.xmlchunk, die beeinflussen,ERDDAP™interpretiert Daten in den Quelldatendateien, z.B. das Ändern der Formatfolge der Zeitvariable.
* Um die gespeicherten Informationsdateien eines Datensatzes aus einemERDDAP™das läuft (auch wenn der Datensatz aktuell nicht geladen wird) , set a[hart Flagge](#hard-flag)für diesen Datensatz. Denken Sie daran, dass, wenn ein Datensatz eine Aggregation einer großen Anzahl von Dateien ist, das Nachladen des Datensatzes erhebliche Zeit dauern kann.
* Um die gespeicherten Informationsdateien eines Datensatzes zu löschen, wennERDDAP™wird nicht laufen, laufen[DasDds](/docs/server-admin/datasets#dasdds)für diesen Datensatz (die einfacher ist als die Konfiguration, in der die Informationen sich befinden und die Dateien per Hand löschen) . Denken Sie daran, dass, wenn ein Datensatz eine Aggregation einer großen Anzahl von Dateien ist, das Nachladen des Datensatzes erhebliche Zeit dauern kann.
         
### Status{#memory-status} 
ERDDAP™sollte nie abstürzen oder auffrieren. Wenn das der Fall ist, ist eine der wahrscheinlichsten Ursachen nicht ausreichend Speicher. Sie können die Speichernutzung überwachen, indem Sie auf die status.html Webseite, die eine Zeile wie

0 gc Anrufe, 0 Anfragen vergossen und 0 gefährlich MemoryEmails seit letzten großen LoadDatasets

 (das sind immer ernstere Ereignisse)   
und MB inUse und gc Calls Spalten in der Statistiktabelle. Sie können sagen, wie Erinnerungen IhreERDDAP™wird, indem man diese Zahlen beobachtet. Höhere Zahlen geben mehr Stress an.

* MB inUse sollte immer weniger als die Hälfte der[\\-Xmx Speichereinstellung](/docs/server-admin/deploy-install#memory). Größere Zahlen sind ein schlechtes Zeichen.
* gc ruft die Anzahl der Zeiten anERDDAP™nannte den Müllsammler, um zu versuchen, hohe Speichernutzung zu lindern. Das ist ein Zeichen ernster Probleme.
* shed zeigt die Anzahl der eingehenden Anfragen, die vergossen wurden (mit HTTP-Fehlernummer 503, Service Nicht verfügbar) weil der Speichereinsatz bereits zu hoch war. Im Idealfall sollten keine Anträge gestellt werden. Es ist okay, wenn ein paar Anträge vergossen werden, aber ein Zeichen ernster Probleme, wenn viele vergossen sind.
* gefährlich MemoryEmails - Wenn der Speichereinsatz gefährlich hoch wird,ERDDAP™sendet eine E-Mail an die in&lt;E-Mail senden &gt; (in setup.xml) mit einer Liste der aktiven Nutzeranfragen. Wie die E-Mail sagt, übermitteln Sie diese E-Mails bitte an Chris. John bei Noaa. gov so können wir die Informationen verwenden, um zukünftige Versionen zu verbessernERDDAP.
     

Wenn SieERDDAP™ist speicherbelastet:
* Überlegen Sie, mehr Speicher Ihres Servers zuzuordnenERDDAP™durch Änderung der Tomcat[‐Xmx Speichereinstellung](/docs/server-admin/deploy-install#memory).
* Wenn Sie bereits so viel Speicher wie möglich zugewiesen habenERDDAP™via -Xmx, kaufen Sie mehr Speicher für Ihren Server. Speicher ist billig (verglichen mit dem Preis eines neuen Servers oder Ihrer Zeit) &#33; Dann erhöhen -Xmx.
* Indatasets.xml, gesetzt&lt;nGridThreads&gt; bis 1, eingestellt&lt;nTableThreads&gt; bis 1 und eingestellt&lt;ipAddressMaxRequestsActive&gt; bis 1.
* Sehen Sie sich die Anfragen log.txt an, um ineffizient oder störend zu sein (aber legitim) Anträge. Ihre IP-Adressen hinzufügen&lt;AnfrageBlacklist&gt; indatasets.xml. Die Blacklist-Fehlermeldung enthält dieERDDAP™Administrator-E-Mail-Adresse mit der Hoffnung, dass diese Benutzer Sie kontaktieren, damit Sie mit ihnen arbeiten können, um zu verwendenERDDAP™effizienter. Es ist gut, eine Liste von IP-Adressen, die Sie Blacklist halten und warum, so dass Sie mit den Benutzern arbeiten können, wenn sie Sie kontaktieren.
* Schauen Sie sich die Anfragen in log.txt an, um Anfragen von schädlichen Benutzern. Ihre IP-Adressen hinzufügen&lt;AnfrageBlacklist&gt; indatasets.xml. Wenn ähnliche Anfragen von mehreren ähnlichen IP-Adresse kommen, können Sie einige Who-is-Dienste nutzen (z.B.,[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) um den Bereich der IP-Adressen von dieser Quelle zu erfahren und den gesamten Bereich zu Blacklist zu finden. Siehe die [&lt;AnfrageBlacklist&gt; Dokumentation (/docs/server-admin/datasets#requestblacklist) .
         
#### Ausgewählt{#outofmemoryerror} 
Wenn Sie sich einrichtenERDDAP™, Sie geben die maximale Speichermenge an, dieJavaüber die[\\-Xmx Einstellung](/docs/server-admin/deploy-install#memory). wennERDDAP™je braucht mehr Erinnerung als das, es wird eine Java werfen. Lang. OutOfMemoryError.ERDDAP™macht eine Menge Überprüfung, um es zu ermöglichen, diesen Fehler anmutig zu handhaben (z.B., so dass eine beunruhigende Anfrage scheitern wird, aber das System behält seine Integrität) . Aber manchmal schädigt der Fehler die Systemintegrität und Sie müssen neu startenERDDAP. Hoffentlich ist das selten.

Die schnelle und einfache Lösung für einen OutOfMemoryError ist, die[\\-Xmx Einstellung](/docs/server-admin/deploy-install#memory), aber Sie sollten nie die -Xmx-Einstellung auf mehr als 80% des physischen Speichers im Server erhöhen (z.B. für einen 10GB-Server nicht -Xmx über 8GB einstellen) . Speicher ist relativ billig, so kann es eine gute Möglichkeit sein, den Speicher im Server zu erhöhen. Aber wenn Sie den Speicher im Server maxed oder aus anderen Gründen nicht erhöhen können, müssen Sie direkter mit der Ursache des OutOfMemoryError umgehen.

Wenn Sie in der[Pressemitteilung](#log)um zu sehen, wasERDDAP™was tat, wenn der Fehler auftrat, können Sie in der Regel einen guten Hinweis auf die Ursache des OutOfMemoryError bekommen. Es gibt viele mögliche Ursachen, einschließlich:

* Eine einzige riesige Datendatei kann den OutOfMemoryError verursachen, insbesondere riesige ASCII-Datendateien. Wenn dies das Problem ist, sollte es offensichtlich sein, weilERDDAP™wird den Datensatz nicht laden (für tabellarische Datensätze) oder Daten aus dieser Datei lesen (für gegitterte Datensätze) . Die Lösung, wenn möglich, ist, die Datei in mehrere Dateien zu teilen. Idealerweise können Sie die Datei in logische Stücke teilen. Zum Beispiel, wenn die Datei 20 Monate Wert von Daten hat, teilen Sie sie in 20 Dateien, jeweils mit 1 Monat Wert von Daten. Aber es gibt Vorteile, auch wenn die Hauptdatei willkürlich aufgeteilt wird. Dieser Ansatz hat mehrere Vorteile: a) Dies reduziert den Speicher, der benötigt wird, um die Datendateien auf 1/20th zu lesen, da nur eine Datei zu einem Zeitpunkt gelesen wird. b) Oft,ERDDAP™kann mit Anfragen viel schneller umgehen, weil es nur in einem oder einigen Dateien suchen muss, um die Daten für eine bestimmte Anfrage zu finden. c) Wenn die Datenerfassung fortgesetzt wird, können die vorhandenen 20 Dateien unverändert bleiben, und Sie müssen nur eine, kleine, neue Datei ändern, um den Datenwert des nächsten Monats zum Datensatz hinzuzufügen.
* Eine einzige riesige Anfrage kann den OutOfMemoryError verursachen. Insbesondere einige derorderByOptionen haben die gesamte Antwort im Speicher für eine zweite (z.B. eine Art zu tun) . Wenn die Antwort groß ist, kann es zu dem Fehler führen. Es wird immer einige Anträge geben, die auf verschiedene Weise zu groß sind. Sie können das Problem lösen, indem Sie die -Xmx-Einstellung erhöhen. Oder Sie können den Benutzer ermutigen, eine Reihe von kleineren Anfragen zu machen.
* Es ist unwahrscheinlich, dass eine große Anzahl von Dateien den Dateiindex verursachen würde, dassERDDAP™erzeugt so groß zu sein, dass diese Datei den Fehler verursachen würde. Wenn wir davon ausgehen, dass jede Datei 300 Bytes verwendet, dann würden 1.000.000 Dateien nur 300MB aufnehmen. Aber Datensätze mit einer großen Anzahl von Datendateien verursachen andere Probleme fürERDDAP, vor allem dauert es langeERDDAP™alle diese Datendateien zu öffnen, wenn sie auf eine Benutzeranfrage für Daten antworten. In diesem Fall kann die Lösung sein, die Dateien so zu aggregieren, dass es weniger Dateien. Für tabellarische Datensätze ist es oft toll, wenn Sie die Daten aus dem aktuellen Datensatz speichern[CF Diskrete Sampling Geometrien (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged Array Datendateien (Anfrage senden.ncCF-Dateien vonERDDAP) und dann einen neuen Datensatz erstellen. Diese Dateien können sehr effizient mitERDDAP'[EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles). Wenn sie logisch organisiert sind (jeder mit Daten für ein Stück Raum und Zeit) ,ERDDAP™kann Daten sehr schnell aus ihnen extrahieren.
* Für tabellarische Datensätze, die die [&lt;subsetVariables&gt; (/docs/server-admin/datasets#subsetvariables) Attribute,ERDDAP™macht eine Tabelle von einzigartigen Kombinationen der Werte dieser Variablen. Für große Datensätze oder wann&lt;subsetVariables&gt; ist falsch konfiguriert, diese Tabelle kann groß genug sein, um OutOfMemoryErrors zu verursachen. Die Lösung besteht darin, Variablen aus der Liste zu entfernen&lt;subsetVariables&gt; für die eine große Anzahl von Werten vorliegt oder Variablen nach Bedarf entfernt werden, bis die Größe dieser Tabelle angemessen ist. Die TeileERDDAP™dass diesubsetVariablesSystem funktioniert nicht gut (z.B. Webseiten laden sehr langsam) wenn es mehr als 100.000 Zeilen in dieser Tabelle gibt.
* Es ist immer möglich, dass mehrere gleichzeitig große Anfragen (auf einem wirklich beschäftigtERDDAP) kann kombinieren, um Gedächtnisprobleme zu verursachen. Zum Beispiel würden 8 Anfragen, die jeweils 1GB verwenden, Probleme für ein -Xmx=8GB-Setup verursachen. Aber es ist selten, dass jede Anfrage auf dem Höhepunkt ihrer Speichernutzung gleichzeitig sein würde. Und Sie könnten leicht sehen, dass SieERDDAP™ist wirklich beschäftigt mit großen Anfragen. Aber es ist möglich. Es ist schwer, mit diesem Problem außer durch die Erhöhung der -Xmx-Einstellung umzugehen.
* Es gibt andere Szenarien. Wenn Sie sich die[Pressemitteilung](#log)um zu sehen, wasERDDAP™was tat, wenn der Fehler auftrat, können Sie in der Regel einen guten Hinweis auf die Ursache erhalten. In den meisten Fällen gibt es eine Möglichkeit, dieses Problem zu minimieren (siehe oben) , aber manchmal brauchen Sie nur mehr Speicher und eine höhere -Xmx-Einstellung.
         
### Zu viele offene Dateien{#too-many-open-files} 
Beginnen mitERDDAP™V2.12,ERDDAP™hat ein System, um die Anzahl der offenen Dateien zu überwachen (die Steckdosen und andere Dinge enthält, nicht nur Dateien) in Tomcat auf Linux-Computern. Wenn einige Dateien irrtümlich nie geschlossen werden (ein "Ressourcenleck") , die Anzahl der offenen Dateien kann erhöhen, bis es das Maximum durch das Betriebssystem erlaubt überschreitet und viele wirklich schlechte Dinge passieren. Also jetzt auf Linux-Computern (weil die Informationen nicht für Windows verfügbar sind) :

* Es gibt eine "Open Files" Spalte auf der rechten Seite der status.html-Webseite, die die Prozent der max-Dateien offen zeigt. Unter Windows zeigt es nur "?".
* WannERDDAP™generiert diese Informationen am Ende jedes großen Datensatzes, es wird auf das Protokoll gedruckt. txt Datei:
openFileCount= *Strom* von max= *max.* % = *Prozent* 
* Wenn der Prozentsatz &gt; 50 % beträgt, wird eine E-Mail an dieERDDAP™Administrator und E-Mail Alles An E-Mail-Adressen.

Wenn der Prozentsatz 100 % beträgt,ERDDAP™ist in schrecklichen Schwierigkeiten. Lass das nicht passieren.
Wenn der Prozentsatz &gt; 75% beträgt,ERDDAP™ist nah an schrecklichen Schwierigkeiten. Das ist nicht okay.
Wenn der Prozentsatz &gt; 50 % beträgt, ist es sehr möglich, dass ein Spieß den Prozentsatz auf 100 trifft.
Wenn der Prozentsatz je &gt; 50 % beträgt, sollten Sie:
* Erhöhen Sie die maximale Anzahl von offenen Dateien, die entweder erlaubt sind:
    * Erstellen Sie diese Änderungen jedes Mal, bevor Sie beginnen tomcat (sie in die Tomcat startup.sh-Datei setzen?) :
Ulimit -Hn 16384
Ulimit -Sn 16384
    * Oder eine permanente Änderung durch Bearbeitung (als Wurzel) /etc/security/limits.conf und Hinzufügen der Zeilen:
tomcat soft nofile 16384
tomcat hard nofile 16384
Diese Befehle nehmen an, dass der Benutzer mit Tomcat "tomcat" genannt wird.
Bei vielen Linux-Varianten müssen Sie den Server neu starten, um diese Änderungen anzuwenden. Für beide Optionen ist das obenstehende "16384" ein Beispiel. Sie wählen die Nummer, die Sie denken, ist am besten.
* RestERDDAP. Das Betriebssystem schließt alle offenen Dateien.
         
### Nicht gestellte Anfragen{#failed-requests} 
*    **Ungewöhnliche Tätigkeit: &gt;25% der Anträge scheiterten**   
Als Teil aller reloadDatasets, die in der Regel alle 15 Minuten sind,ERDDAP™den Prozentsatz der Anträge, die seit dem letzten reloadDatasets ausgefallen sind. wenn es &gt; 25 % ist,ERDDAP™sendet eine E-Mail an dieERDDAP™Administrator mit dem Thema "Ungewöhnliche Aktivität: &gt;25% der Anträge gescheitert". Diese E-Mail enthält eine Tally in der Nähe des unteren "Requesters IP Adresse (Versäumt)   (seit letztem Major LoadDatasets) ". Such das. Es sagt Ihnen die IP-Adresse der Computer, die die fehlgeschlagensten Anfragen machen. Sie können dann nach diesen IP-Adressen in der\\[BigParentDirectory\\]/logs/[Pressemitteilung](#log)Datei und sehen, welche Art von Anfragen sie machen.
    
Sie können die IP-Nummer des Benutzers verwenden (beispielsweise mit[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) um herauszufinden, wer oder was der Benutzer ist. Manchmal wird das Ihnen ziemlich genau sagen, wer der Benutzer ist (z.B. ist es ein Web-Crawler der Suchmaschine) . Die meiste Zeit gibt es nur einen Hinweis (z.B., es ist ein Amazonaws-Computer, es ist von einer Universität, es ist jemand in einer bestimmten Stadt) .
    
Durch die Betrachtung der tatsächlichen Anfrage, der IP-Nummer und der Fehlermeldung (alle von[Pressemitteilung](#log)) für eine Reihe von Fehlern, können Sie in der Regel herausfinden, was falsch läuft. In meiner Erfahrung gibt es vier häufige Ursachen für viele fehlgeschlagene Anträge:
    
1) Die Anfragen sind schädlich (z.B. auf der Suche nach Sicherheitsschwächen oder auf Anfrage und dann aufheben, bevor sie abgeschlossen sind) . Sie sollten verwenden&lt;AnfrageBlacklist&gt; indatasets.xmlum diese IP-Adressen zu Blacklist.
    
2) Eine Suchmaschine versucht naiv die inERDDAP™Webseiten und ISO 19115 Dokumente. Zum Beispiel gibt es viele Orte, die die Basis auflistenOPeNDAPURL zum Beispiel, https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST , dem der Benutzer einen Dateityp hinzufügen soll (z.B. .das, .dds, .html) . Aber die Suchmaschine weiß das nicht. Und die Anfrage an die Basis-URL scheitert. Eine damit verbundene Situation ist, wenn die Suchmaschine bizarre Anfragen generiert oder versucht, Formulare auszufüllen, um auf "versteckte" Webseiten zu gelangen. Aber die Suchmaschinen tun oft einen schlechten Job, was zu Misserfolgen führt. Die Lösung ist:[Roboter.txt](#robotstxt)Datei.
    
3) Einige Benutzer führen ein Skript, das wiederholt nach etwas fragt, das nicht da ist. Vielleicht ist es ein Datensatz, der früher existierte, aber jetzt weg ist (vorübergehend oder dauerhaft) . Skripte erwarten das oft nicht und kümmern sich darum nicht intelligent. Das Skript stellt also immer wieder Anfragen und die Anfragen scheitern. Wenn Sie raten können, wer der Benutzer ist (aus der IP-Nummer oben) , kontaktieren Sie sie und sagen Sie ihnen, dass der Datensatz nicht mehr verfügbar ist und Sie bitten, ihr Skript zu ändern.
    
4) Etwas stimmt mit einem Datensatz wirklich nicht. Normalerweise,ERDDAP™wird den gestörten Datensatz inaktiv machen. Manchmal nicht, also führen alle Anfragen zu Fehlern. Wenn ja, fixieren Sie das Problem mit dem Datensatz oder (wenn du nicht kannst) den Datensatz einstellen[active="false"](/docs/server-admin/datasets#active). Natürlich kann dies zu Problem #2 führen.
    
Manchmal sind die Fehler nicht so schlecht, vor allem, wennERDDAP™kann den Fehler erkennen und sehr schnell reagieren (&lt;= 1ms). So können Sie entscheiden, keine Maßnahmen zu ergreifen.
    
Wenn alle anderen scheitern, gibt es eine universelle Lösung: fügen Sie die IP-Nummer des Benutzers in die [&lt;AnfrageBlacklist&gt; (/docs/server-admin/datasets#requestblacklist) . Dies ist nicht so schlimm oder als drastisch eine Option, wie es scheinen könnte. Der Benutzer wird dann eine Fehlermeldung erhalten, dass s/he schwarz aufgeführt wurde und ihnen Ihre (dieERDDAP™Administrator) E-Mail-Adresse. Manchmal wird der Benutzer Sie kontaktieren und Sie können das Problem lösen. Manchmal kontaktiert der Benutzer Sie nicht und Sie sehen das exakt gleiche Verhalten aus einer anderen IP-Nummer am nächsten Tag. Blacklist die neue IP-Nummer und hoffen, dass sie schließlich die Nachricht erhalten. (Oder das ist dein Groundhog Day, von dem du niemals entkommen wirst. Tut mir leid.) 
    
### Roboter.txt{#robotstxt} 
Die Suchmaschinen-Unternehmen nutzen Web-Crawler (z.B. Google Botsuana) alle Seiten im Web zu untersuchen, um den Inhalt den Suchmaschinen hinzuzufügen. FürERDDAP™Das ist im Grunde gut.ERDDAP™hat viele Links zwischen Seiten, so dass die Raupen finden alle Webseiten und fügen sie zu den Suchmaschinen. Dann werden Benutzer der Suchmaschinen in der Lage sein, Datensätze auf IhremERDDAP.
    
Leider einige Web-Crawler (z.B. Google Botsuana) werden nun Formulare ausfüllen und einreichen, um zusätzliche Inhalte zu finden. Für Web-Commerce-Seiten ist dies großartig. Aber das ist schrecklich fürERDDAP™weil es nur zu einem führt **unendlich** Anzahl unerwünschter und punktloser Versuche, die tatsächlichen Daten zu kriechen. Dies kann zu mehr Datenanforderungen führen als von allen anderen Nutzern kombiniert. Und es füllt die Suchmaschine mit goofy, sinnlose Teilmengen der tatsächlichen Daten.
    
Um den Web-Crawlern zu sagen, das Ausfüllen von Formularen zu stoppen und einfach in der Regel nicht auf Webseiten, die sie nicht sehen müssen, müssen Sie eine Textdatei erstellen, die aufgerufen wird[Roboter.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)im Root-Verzeichnis der Dokumentenhierarchie Ihrer Webseite, so dass sie von jedem als z. http://*www.your.domain*/robots.txt .
Wenn Sie einen neuen Roboter erstellen. txt-Datei, dies ist ein guter Start:
```
    User-Agent: \\*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\\*?
    Disallow: /\\*?\\*
    Disallow: /\\*.asc\\*
    Disallow: /\\*.csv\\*
    Disallow: /\\*.dods\\*
    Disallow: /\\*.esriAscii\\*
    Disallow: /\\*.esriCsv\\*
    Disallow: /\\*.geoJson\\*
    Disallow: /\\*.htmlTable\\*
    Disallow: /\\*.json\\*
    Disallow: /\\*.mat\\*
    Disallow: /\\*.nc\\*
    Disallow: /\\*.odvTxt\\*
    Disallow: /\\*.tsv\\*
    Disallow: /\\*.xhtml\\*
    Disallow: /\\*.geotif\\*
    Disallow: /\\*.itx\\*
    Disallow: /\\*.kml\\*
    Disallow: /\\*.pdf\\*
    Disallow: /\\*.png\\*
    Disallow: /\\*.large\\*
    Disallow: /\\*.small\\*
    Disallow: /\\*.transparentPng\\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
     (Aber ersetzen *Ihre.Institutionen.url* mit dirERDDAPBasis-URL.)   
Es kann ein paar Tage dauern, bis die Suchmaschinen bemerken und die Änderungen wirksam werden.
     
### Sitemap.xml{#sitemapxml} 
Als[ https://www.sitemaps.org ](https://www.sitemaps.org/)Website sagt:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

Tatsächlich, seitERDDAP™istRESTful, Suchmaschine Spinnen können Sie leicht kriechenERDDAP. Aber sie neigen dazu, es öfter zu tun (täglich&#33;) als notwendig (monatlich?) .

* Da jede Suchmaschine Ihre gesamteERDDAP™Jeden Tag kann dies zu einer Menge unnötiger Anfragen führen.
* So.ERDDAP™erzeugt eine Sitemap.xml-Datei für IhreERDDAP™die Suchmaschinen sagt, dass SieERDDAP™nur muss jeden Monat gekrochen werden.
* Sie sollten eine Referenz hinzufügenERDDAP's sitemap.xml zu Ihrem[Roboter.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)Datei:
Sitemap: http://**www.yoursite.org**/erddap/sitemap.xml
 
* Wenn das nicht scheint, die Nachricht an die Crawler zu bekommen, können Sie den verschiedenen Suchmaschinen über die sitemap.xml-Datei durch den Besuch dieser URLs erzählen (aber ändern **Ihr Institut** dem Akronym Ihrer Institution oder Abkürzung und **www.yoursite.org** zu dirERDDAPURL) :
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I Denken) Sie müssen nur einmal ping jede Suchmaschine, für die ganze Zeit. Die Suchmaschinen werden dann Änderungen an sitemap.xml periodisch erkennen.
     
### Daten Verbreitung / Datenverteilung Netzwerke:PushundPullTechnologie{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* Normalerweise,ERDDAP™fungiert als Vermittler: Er nimmt eine Anfrage von einem Benutzer; erhält Daten von einer entfernten Datenquelle; reformiert die Daten und sendet sie an den Benutzer.
*   [PullTechnologie](https://en.wikipedia.org/wiki/Pull_technology):ERDDAP™hat auch die Fähigkeit, aktiv alle verfügbaren Daten von einer entfernten Datenquelle zu erhalten und[eine lokale Kopie der Daten speichern](/docs/server-admin/datasets#eddgridcopy).
*   [PushTechnologie](https://en.wikipedia.org/wiki/Push_technology): VerwendungERDDAP'[Abonnements](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions), andere Datenserver können gemeldet werden, sobald neue Daten verfügbar sind, damit sie die Daten anfordern können (durch Ziehen der Daten) .
*   ERDDAP'[EDDGridVon Erddap](/docs/server-admin/datasets#eddfromerddap)und[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap)VerwendungERDDAP„Abonnementdienste und[Flaggensystem](#flag)so dass sie sofort gemeldet werden, wenn neue Daten verfügbar sind.
* Sie können diese zu einem tollen Effekt kombinieren: wenn Sie einpackenEDDGridKopieren um einEDDGridVonErddap-Datensatz (oder wickeln Sie einen EDDTableCopy um einen EDDTableFromErddap Datensatz) ,ERDDAP™wird automatisch eine lokale Kopie eines anderen erstellen und pflegenERDDAP's Datensatz.
* Da die Abonnement-Dienste arbeiten, sobald neue Daten verfügbar sind, gibt Push-Technologie sehr schnell Daten (innerhalb von Sekunden) .

Diese Architektur setzt jedeERDDAP™Administrator, der für die Bestimmung zuständig ist, wo die Daten für seine/ihreERDDAP™kommt aus.

* SonstigeERDDAP™Administratoren können das gleiche tun. Es besteht kein Bedarf an Koordination zwischen Administratoren.
* Wenn vieleERDDAP™Verwalter verlinken miteinanderERDDAPs wird ein Datenverteilungsnetz gebildet.
* Daten werden schnell, effizient und automatisch aus Datenquellen verbreitet (ERDDAPs und andere Server) zu Datenumverteilung Websites (ERDDAPS) irgendwo im Netzwerk.
* A gegebenERDDAP™kann sowohl eine Datenquelle für einige Datensätze als auch eine Redistribution-Website für andere Datensätze sein.
* Das resultierende Netzwerk ähnelt etwa den mit Programmen wie[UnidataIDD/IDM](https://www.unidata.ucar.edu/projects/index.html#idd), aber weniger starr strukturiert.
         
### Sicherheit, Authentifizierung und Zulassung{#security-authentication-and-authorization} 
Standardmäßig,ERDDAP™als vollständig öffentlicher Server (Verwendunghttpund/oderhttps) ohne Anmeldung ([Authentisierung](https://en.wikipedia.org/wiki/Authentication)) System und keine Einschränkungen des Datenzugriffs ([Genehmigung](https://en.wikipedia.org/wiki/Authorization)) .

#### Sicherheit{#security} 
Wenn Sie den Zugriff auf einige oder alle Datensätze auf einige Benutzer beschränken möchten, können SieERDDAPDas integrierte Sicherheitssystem. Wenn das Sicherheitssystem im Einsatz ist:

*   ERDDAP™Verwendung[Rollenbasierte Zugriffskontrolle](https://en.wikipedia.org/wiki/Role-based_access_control).
    * DieERDDAP™Administrator definiert Benutzer mit dem [&lt;Benutzer (/docs/server-admin/datasets#user) in den Warenkorbdatasets.xml. Jeder Benutzer hat einen Benutzernamen, ein Passwort (wenn Authentifizierung = kunden) , und eine oder mehrere Rollen.
    * DieERDDAP™Administrator definiert, welche Rollen über den [&lt;zugänglichzu&gt; (/docs/server-admin/datasets#accessibleto) in den Warenkorbdatasets.xmlfür jeden Datensatz, der keinen öffentlichen Zugriff haben sollte.
* Anmeldestatus des Benutzers (und einen Link zum Ein- und Ausloggen) wird oben auf jeder Webseite angezeigt. (Aber ein angemeldeter Benutzer erscheintERDDAP™nicht eingeloggt werden, wenn er einehttpURL.) 
* Wenn&lt;baseUrl&gt;, dass Sie in Ihrem setup.xml angeben **http** URL, Benutzer, die nicht eingeloggt sind, könnenERDDAP' **http** URLs. wenn&lt;baseHttpsUrl&gt; wird auch spezifiziert, Benutzer, die nicht angemeldet sind, können auch verwendenhttpsURLs.
* Nur HTTPS -- Wenn&lt;baseUrl&gt;, dass Sie in Ihrem setup.xml angeben **https** URL, Benutzer, die nicht eingeloggt sind, werden gefördert (nicht erzwungen) zu verwendenERDDAP' **https** URLs -- alle Links aufERDDAP™Webseiten werden sich aufhttpsURLs.
    
Wenn Sie Benutzer zwingen möchten, zu verwendenhttpsURL, fügen Sie eine Redirect permanente Zeile innerhalb der&lt;VirtualHost \\*:80&gt; Abschnitt in der Datei Apache (inhttpd.conf) , z.
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Wenn Sie wollen, gibt es eine zusätzliche Methode, um die Verwendung vonhttps: [HTTP Strict Transport Security (HS) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security). Um es zu benutzen:
    
    1. Das Apache Headers Modul aktivieren: a2enmod headers
    2. Fügen Sie den zusätzlichen Header zur HTTPS VirtualHost-Richtlinie hinzu. Max-Age wird in Sekunden gemessen und kann auf einen langen Wert eingestellt werden.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Bitte beachten Sie, dass dieser Header nur auf einem HTTPS VirtualHost gültig ist.
    
Ein Grund, die Nutzer nicht zu zwingen, zu verwendenhttpsURLs sind: Der zugrunde liegende SSL/TLS-Link nimmt Zeit, um zu ermitteln und nimmt dann Zeit, um alle zwischen dem Benutzer und dem Server übertragenen Informationen zu verschlüsseln und zu entschlüsseln. Aber einige Institutionen erfordernhttpsNur.
    
* Benutzer, die in MUST angemeldet sindERDDAP' **https** URLs. Wenn siehttpURLs, sie scheinenERDDAP™nicht eingeloggt werden. Dadurch wird die Privatsphäre der Kommunikation gewährleistet und verhindert[Sitzung Entführung und Sidejacking](https://en.wikipedia.org/wiki/Session_hijacking).
* Wer nicht eingeloggt ist, kann auf die öffentlichen Datensätze zugreifen und nutzen. Standardmäßig erscheinen private Datensätze nicht in Listen von Datensätzen, wenn ein Benutzer nicht eingeloggt ist. Wenn der Administrator setup.xml's gesetzt hat&lt;listPrivateDatasets&gt; zu true, sie werden angezeigt. Versuche, Daten von privaten Datensätzen zu verlangen (wenn der Benutzer die URL kennt) wird auf die Anmeldeseite umgeleitet.
* Jeder, der eingeloggt ist, wird in der Lage sein, Daten von jedem öffentlichen Datensatz und jedem privaten Datensatz zu sehen und anzufordern, auf den seine Rolle sie zugreifen kann. Standardmäßig erscheinen private Datensätze, auf die ein Benutzer keinen Zugriff hat, nicht in Listen von Datensätzen. Wenn der Administrator setup.xml's gesetzt hat&lt;listPrivateDatasets&gt; zu true, sie werden angezeigt. Versuche, Daten von privaten Datensätzen zu verlangen, auf die der Benutzer keinen Zugriff hat, werden auf die Anmeldeseite umgeleitet.
* DieRSSInformationen für vollständig private Datensätze sind nur für Benutzer verfügbar (undRSSLeser) die eingeloggt und berechtigt sind, diesen Datensatz zu verwenden. Das machtRSSnicht sehr nützlich für vollständig private Datensätze.
    
Wenn ein Datensatz privat ist, aber seine [&lt;graphsAccessibleTo&gt;] (/docs/server-admin/datasets#graphsaccessibleto) ist öffentlich, der DatensatzRSSist für jeden zugänglich.
    
* E-Mail-Abonnements können nur eingerichtet werden, wenn ein Benutzer Zugriff auf einen Datensatz hat. Wenn ein Benutzer einen privaten Datensatz abonniert, funktioniert das Abonnement nach dem Login des Benutzers weiter.

##### Setup Security{#setup-security} 
Zur Einrichtung des Sicherheits-/Authentifizierungs-/Berechtigungssystems:

* Den Standard tunERDDAP™ [Erster Setup](/docs/server-admin/deploy-install).
* In[Setup.xml](/docs/server-admin/deploy-install#setupxml),
    * Hinzufügen / Ändern der&lt;Authentizität&gt; Wert von nichts nach Maß (das nicht benutzen) , E-Mail (das nicht benutzen) , google (empfohlen) , orcid (empfohlen) , oauth2 (das ist google+orcid, empfohlen) . Sehen Sie die Kommentare zu diesen Optionen unten.
    * Hinzufügen / Ändern der&lt;baseHttpsUrl&gt; Wert.
    * Ein-/Ausgang&loginInfo;in&lt;startBodyHtml&gt;, um das Log-in/out-Info des Benutzers an der Spitze jeder Webseite anzuzeigen.
* Für Testzwecke auf Ihrem persönlichen Computer,[folgen Sie diesen Anweisungen, um tomcat zu konfigurieren, um SSL zu unterstützen](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (die Grundlage fürhttpsVerbindungen) durch die Erstellung einer Keystore mit[Selbstsignierte Bescheinigung](https://en.wikipedia.org/wiki/Self-signed_certificate)und durch Änderung *Tomcat* /conf/server.xml, um den Anschluss für Port 8443 zu deaktivieren. Unter Windows können Sie .keystore von "c:\\Users\\ verschieben müssen *du* \\.keystore" zu "c:\\Users\\Default User\\.keystore" oder "c:\\.keystore" (siehe *Tomcat* /logs/catalina. *heute* .log, wenn die Anwendung nicht geladen wird oder Benutzer das Log in Seite nicht sehen können) . Sie können sehen, wann das .keystore-Zertifikat durch Prüfung des Zertifikats abläuft, wenn Sie sich anmelden.
    
Für einen öffentlich zugänglichen Server, anstelle eines selbstsignierten Zertifikats, wird dringend empfohlen, ein von einem[Bescheinigungsbehörde](https://en.wikipedia.org/wiki/Certificate_authority), weil es Ihren Kunden mehr Sicherheit gibt, dass sie tatsächlich mit Ihrem verbindenERDDAP™, kein Mann-in-the-Middle's Version deinesERDDAP. Viele Anbieter verkaufen digitale Zertifikate. (Suche nach Web.) Sie sind nicht teuer.
    
* Auf Linux-Computern, wenn Tomcat in Apache läuft, ändern Sie die /etc/httpd/conf.d/ssl.conf-Datei, um HTTPS-Verkehr auf / vonERDDAP™ohne die :8443 Portnummer in der URL:
    1. Ändern der bestehenden&lt;VirtualHost&gt; tag (wenn es eine gibt) , oder fügen Sie eine am Ende der Datei, so dass sie zumindest diese Zeilen hat:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Dann neu starten Apache: /usr/sbin/apachectl -k anmutig (aber manchmal ist es in einem anderen Verzeichnis) .
* In *Tomcat* /conf/server.xml, ohne den Port=8443&lt;Connector&gt; tag:
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
und den Standort des Zertifikats ändernKeystoreFile.
##### Genehmigung{#authorization} 
*   [Indatasets.xml, eine](#authorization)(&lt;Benutzer (/docs/server-admin/datasets#user) tag für jeden Benutzer mit Benutzername, Passwort (wenn autorisiert wird) , und Rollen Informationen. Dies ist der Autorisierungsteil vonERDDAPDas Sicherheitssystem.
     
* Indatasets.xml, fügen Sie ein [&lt;zugänglichzu&gt; (/docs/server-admin/datasets#accessibleto) tag zu jedem Datensatz, der keinen öffentlichen Zugriff haben sollte.&lt;accessTo&gt; können Sie festlegen, welche Rollen Zugriff auf diesen Datensatz haben.
     
* Mach Tomcat neu. Ärger? Überprüfen Sie die Tomcat Protokolle.
     
* - Was? Jeder Fehler könnte zu einem Sicherheitsfehler führen.
     
* Überprüfen Sie, ob die Login-Seite verwendet wirdhttps  (nichthttp) . Versuche, sich überhttpsollte automatisch umgeleitet werdenhttpsund Hafen 8443 (obwohl die Portnummer über einen Apache Proxy versteckt werden kann) . Sie können mit Ihrem Netzwerkadministrator arbeiten, um externe Web-Anfragen auf den Port 8443 auf Ihrem Server zugreifen zu können.
     
* Sie können die&lt;Benutzer und&lt;barrierTo&gt; tags zu jeder Zeit. Die Änderungen werden beim nächsten regelmäßigen Nachladen eines Datensatzes oder ASAP angewendet, wenn Sie einen[Flagge](#flag).

##### Authentication{#authentication} 
[ **Authentication (Einloggen) ** ](#authentication)  
Wenn Sie nicht zulassen möchten, dass sich Benutzer einloggen, geben Sie keinen Wert für&lt;Authentifizierung in setup.xml.
Wenn Sie die Registrierung von Benutzern erlauben möchten, müssen Sie einen Wert für&lt;Authentifizierung Derzeit,ERDDAP™Stützen
[benutzerdefinierte](#custom)  (das nicht benutzen) ,
[E-Mail senden](#email)  (das nicht benutzen) ,
[Kohl](#google)  (empfohlen) ,
[Orcid](#orcid)  (empfohlen) , und
[Oauth2](#oauth2)  (empfohlen) für die Authentifizierungsmethode.
Wenn Sie die Anmeldung aktivieren möchten, empfehlen wir dringend die Optionen Google, orcid oder oauth2, da sie Sie von der Speicherung und Handhabung der Passwörter der Benutzer befreien. (erforderlich für benutzerdefinierte) und sind sicherer als die E-Mail-Option. Denken Sie daran, dass Benutzer oft das gleiche Passwort an verschiedenen Seiten verwenden. So können sie das gleiche Passwort für Sie verwendenERDDAP™wie sie an ihrer Bank tun. Das macht ihr Passwort sehr wertvoll -- viel wertvoller für den Benutzer als nur die Daten, die sie anfordern. So müssen Sie so viel tun, wie Sie können, um die Passwörter privat zu halten. Das ist eine große Verantwortung. Die E-Mail-, Google-, Orcid- und oauth2-Optionen kümmern sich um Passwörter, so dass Sie nicht zu sammeln, zu speichern oder mit ihnen arbeiten müssen. Sie sind also von dieser Verantwortung befreit.

Alle&lt;Authentifizierungsoptionen verwenden[Cookies](https://en.wikipedia.org/wiki/HTTP_cookie)auf dem Computer des Nutzers, so dass der Browser des Nutzers gesetzt werden muss, um Cookies zu ermöglichen. Wenn ein Benutzer machtERDDAP™Anfragen von einem Computerprogramm (kein Browser) , Cookies und Authentifizierung sind schwer zu bedienen. Das ist ein häufiges Problem mit allen Authentifizierungssystemen. Tut mir leid.

Die Einzelheiten der&lt;VERFAHREN Optionen sind:

###### Zoll{#custom} 
benutzerdefinierteERDDAP's benutzerdefinierte System für die Anmeldung von Benutzern durch Eingabe ihres Benutzernamens und Passworts in einem Formular auf einer Webseite. Wenn ein Benutzer versucht und nicht einloggt 3 mal innerhalb von 10 Minuten, wird der Benutzer blockiert, um 10 Minuten einzuloggen. Dies verhindert, dass Hacker einfach Millionen von Passwörtern versuchen, bis sie die richtige finden.

Dies ist etwas sicher, da der Benutzername und das Passwort überhttps  (nichthttp) , aber Authentisierung=google, orcid, oder oauth2 sind besser, weil sie Sie frei, um Passwörter zu handhaben. Der benutzerdefinierte Ansatz erfordert, dass Sie den Namen eines Benutzers und eine Hash-Verdauung ihres Passworts sammeln (telefonieren&#33; E-Mail ist nicht sicher&#33;) und sie indatasets.xmlin [&lt;Benutzer (/docs/server-admin/datasets#user) tags.

Mit der benutzerdefinierten Option kann sich niemand einloggen, bis Sie (dieERDDAP™Administrator) erstellen&lt;Benutzer-Tag für den Benutzer, die Angabe des Namens des Benutzers als Benutzername, die Hash-Dauung ihres Passworts als Passwort, und ihre Rollen.

Nicht empfohlen
Aufgrund der Schwere des Generierens und Sendens des Hash-Verdaus des Passworts des Benutzers und wegen der Risiken, die mitERDDAP™Halten der Hash-Verdauungen der Passwörter, diese Option wird nicht empfohlen.

Um die Sicherheit dieser Option zu erhöhen:

* Sie müssen sicherstellen, dass andere Benutzer auf dem Server (d.h. Linux-Benutzer, nichtERDDAP™Benutzer) Dateien im Tomcat Verzeichnis nicht lesen (vor allemdatasets.xmlDatei&#33;) oderERDDAP's bigParentDirectory.
Verwenden Sie unter Linux als user=tomcat:
chmod -R g-rwx *BigParentDirectory*   
chmod -R o-rwx *BigParentDirectory*   
chmod -R g-rwx *ZumcatDirectory*   
chmod -R o-rwx *ZumcatDirectory*   
     
* Verwenden Sie UEPSHA256 für&lt;passwortEncoding&gt; in setup.xml.
     
* Verwenden Sie eine as-secure-as-possible Methode, um die Hash-Verdauung des Passworts des Benutzers vom Benutzer zumERDDAP™Administrator (Telefon?) .
         
###### E-Mail senden{#email} 
Die E-Mail-Authentifizierungsoption verwendet das E-Mail-Konto eines Benutzers, um den Benutzer zu authentifizieren (indem Sie ihnen eine E-Mail mit einem speziellen Link senden, auf den sie zugreifen müssen, um sich einzuloggen) . Im Gegensatz zu anderen E-Mails, dieERDDAP™sendet,ERDDAP™schreibt diese Einladungs-E-Mails nicht an die E-Mail-Log-Datei, weil sie vertrauliche Informationen enthalten.
In der Theorie ist dies nicht sehr sicher, weil E-Mails nicht immer verschlüsselt sind, so dass ein böser Kerl mit der Fähigkeit, E-Mails abzufangen, dieses System missbrauchen könnte, indem eine gültige E-Mail-Adresse des Benutzers verwendet und die Einladungs-E-Mail abgefangen wird.
In der Praxis, wenn Sie einrichtenERDDAP™um ein Google-E-Mail-Konto zu verwenden, um E-Mails zu senden, und wenn Sie es einrichten, um eine der TLS-Optionen für die Verbindung zu verwenden, und wenn der Benutzer ein Google-E-Mail-Konto hat, ist dies etwas sicher, weil die E-Mails vollständig verschlüsselt sind vonERDDAP™an den Benutzer.

Um die Sicherheit dieser Option zu erhöhen:

* Stellen Sie sicher, dass andere Benutzer auf dem Server (d.h. Linux-Benutzer, nichtERDDAP™Benutzer) Dateien im Tomcat-Verzeichnis nicht lesen können oderERDDAP's bigParentDirectory.
Verwenden Sie unter Linux als user=tomcat:
chmod -R g-rwx *BigParentDirectory*   
chmod -R o-rwx *BigParentDirectory*   
chmod -R g-rwx *ZumcatDirectory*   
chmod -R o-rwx *ZumcatDirectory*   
     
* Stellen Sie die Dinge auf, um die Sicherheit für die E-Mails vonERDDAP™an die Benutzer. Zum Beispiel, Sie könnten ein Google-zentriertes System, indem nur erstellen&lt;Benutzer-Tags für Google-managed E-Mail-Adressen und durch die Einrichtung IhrerERDDAP™Verwendung eines Google-E-Mail-Servers über eine sichere/TLS-Verbindung: in Ihrem setup.xml, z.B.
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Nicht empfohlen
Die E-Mail-Authentifizierungsoption wird nicht empfohlen. Bitte verwenden Sie stattdessen die Google, orcid oder oauth2 Option.

Wie bei den google, orcid und oauth2 Optionen, E-Mail ist sehr praktisch fürERDDAP™Administratoren -- Sie müssen nie mit Passwörtern oder ihren Hash-Dauungen umgehen. Alles, was Sie erstellen müssen, ist ein [&lt;Benutzer (/docs/server-admin/datasets#user) tag für einen Benutzer indatasets.xmlist die E-Mail-Adresse des Benutzers, dieERDDAP™verwendet als Name des Benutzers. (Das Passwort-Attribut wird nicht verwendet, wenn Authentifizierung=E-Mail, Google, orcid oder oauth2.) 

Mit der E-Mail-Option, nur Benutzer, die eine&lt;Benutzer-Tag indatasets.xmlkann versuchen, sich einzuloggenERDDAP™indem Sie ihre E-Mail-Adresse und klicken Sie auf den Link in der E-Mail,ERDDAP™schickt sie.

ERDDAP™behandelt E-Mail-Adressen als case-insensitive. Es tut dies, indem Sie E-Mail-Adressen, die Sie eingeben (in&lt;Benutzer-Tags) oder Benutzer geben (im Anmeldeformular) auf ihre gesamte Kleinbuchversion.

Um die Authentifizierung=email einzurichten:

1. In Ihrem setup.xml ändern Sie die&lt;baseHttpsUrl&gt; Tag's Wert.
Zum Experimentieren/Bearbeiten auf Ihrem persönlichen Computer verwenden
     https://localhost:8443   
Für Ihre ÖffentlichkeitERDDAP™, Verwendung
     https://*your.domain.org*:8443   
oder ohne die :8443 wenn Sie einen Apache verwenden[Proxypass](/docs/server-admin/deploy-install#proxypass)so dass die Hafennummer nicht benötigt wird.
     
2. In Ihrem setup.xml ändern Sie die&lt;VERFAHREN Der Wert von Tag zu E-Mail:
```
    <authentication>email</authentication>  
```

3. In Ihrem setup.xml stellen Sie sicher, dass das E-Mail-System über alle der&lt;E-Mail...&gt; Tags, so dassERDDAP™kann E-Mails senden. Wenn möglich, setzen Sie diese auf eine sichere Verbindung (SSL / TLS) an den E-Mail-Server.
     
4. In deinemdatasets.xml, erstellen [&lt;Benutzer (/docs/server-admin/datasets#user) tags für jeden Benutzer, der Zugriff auf private Datensätze hat.
Verwenden Sie die E-Mail-Adresse des Benutzers als Benutzername im Tag.
Geben Sie das Passwort-Attribut im Benutzer-Tag nicht an.
     
5. RestERDDAP™so dass die Änderungen an setup.xml unddatasets.xmlWirkung nehmen.
         
###### Google, orcid, oauth2{#google-orcid-oauth2} 
*   [ **Kohl** ](#google),[ **Orcid** ](#orcid), und[ **Oauth2** ](#oauth2)   (empfohlen)   
Alle drei dieser Optionen sind die empfohlenERDDAP™Authentifizierungsoptionen. Sie sind alle die sichersten Optionen. Die anderen Optionen haben deutlich schwächere Sicherheit.
     
###### Google{#google} 
* Die Google-Authentifizierungsoption verwendet[Unterschrift Mit Google](https://developers.google.com/identity/gsi/web/guides/overview), die eine Umsetzung der[OAuth 2.0 Authentifizierungsprotokoll](https://oauth.net/2/).ERDDAP™Benutzer melden sich in ihr Google-E-Mail-Konto, einschließlich Google-managed-Konten wie@noaa.govKonten. Dies ermöglichtERDDAP™um die Identität des Benutzers zu überprüfen (Name und E-Mail Adresse) und auf ihr Profilbild zugreifen, aber nicht gebenERDDAP™Zugriff auf ihre E-Mails, ihr Google Drive oder andere private Informationen.
    
FürERDDAP™V2.22 und unten,ERDDAP™verwendet "Google Sign-In". Google sagt, dass das System nach dem 31. März 2023 abgeschrieben wird. Wenn Sie das nicht schon getan haben, wechseln Sie bitte zuERDDAP™v2.23+ verwendet das neue "Sign In with Google"-basierte Authentifizierungssystem.
    
FürERDDAP™v2.23 Instanzen mit einer Content-Security-Policy konfiguriert und mit Google Authentication, müssen Sie hinzufügen https://accounts.google.com in die Liste der erlaubten Skript-Src (oder Script-src-elem) .ERDDAP™nicht mehr verwendet https://apis.google.com , so wenn Sie das erlaubt haben, können Sie es jetzt entfernen.
    
FürERDDAP™v2.24+ Sie können auch hinzufügen https://accounts.google.com/gsi/style zu stlye-src und https://accounts.google.com/gsi/ zu verbinden-src. Für den Skript-Src können Sie jetzt https://accounts.google.com/gsi/client.
 
    
Für weitere Informationen können Sie die[Google-Seite](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)über CSP-Konfiguration. Wenn Sie Fragen haben, kontaktieren Sie chris.john bei noaa.gov.
         
###### Orcid{#orcid} 
* Die orcid Authentifizierungsoption verwendet[Orcid Authentifizierung](https://members.orcid.org/api/integrate/orcid-sign-in), die eine Umsetzung der[OAuth 2.0 Authentifizierungsprotokoll](https://oauth.net/2/).ERDDAP™Benutzer melden sich in ihre[Orcid Konto](https://members.orcid.org/api/integrate/orcid-sign-in), die von Forschern häufig verwendet wird, um sich zu identifizieren. Dies ermöglichtERDDAP™die Orcid-Identität des Benutzers zu überprüfen und seine Orcid-Kontonummer zu erhalten, aber nicht gebenERDDAP™Zugriff auf ihre anderen Orcid-Kontoinformationen.

###### Oauth2{#oauth2} 
* Mit der oauth2 Option können Benutzer sich entweder mit ihrem Google-Konto oder ihrem Orcid-Konto anmelden.

Die google, orcid und oauth2 Optionen sind die Nachfolger der openid Option, die nachERDDAP™Version 1.68, die auf einer Version von open basiert ID, die jetzt nicht aktuell ist. Bitte wechseln Sie zum Google, orcid oder oauth2 Option.

Diese Optionen sind sehr bequem fürERDDAP™Administratoren -- Sie müssen nie mit Passwörtern oder ihren Hash-Dauungen umgehen. Alles, was Sie erstellen müssen, ist ein [&lt;Benutzer (/docs/server-admin/datasets#user) tag für einen Benutzer indatasets.xmldie die Google-E-Mail-Adresse des Nutzers oder die Orcid-Kontonummer als Benutzername-Attribut angibt. (Das Passwort-Attribut wird nicht verwendet, wenn Authentifizierung = E-Mail, Google, orcid oder oauth2.) 

Mit diesen Optionen kann sich jeder anmelden, umERDDAP™durch die Anmeldung in ihr Google-E-Mail-Konto oder Orcid-Konto, aber niemand hat das Recht auf Zugriff auf private Datensätze, bis Sie (dieERDDAP™Administrator) erstellen&lt;Benutzername, Angabe ihrer Google-E-Mail-Adresse oder Orcid-Kontonummer als Benutzername und Angabe ihrer Rollen.

ERDDAP™behandelt E-Mail-Adressen als case-insensitive. Es tut dies, indem Sie E-Mail-Adressen, die Sie eingeben (in&lt;Benutzer-Tags) oder Benutzer geben (im Anmeldeformular) auf ihre gesamte Kleinbuchversion.

Zur Einrichtung von Google, orcid oder oauth2 Authentifizierung:

* In Ihrem setup.xml ändern Sie die&lt;baseHttpsUrl&gt; Tag's Wert.
Zum Experimentieren/Bearbeiten auf Ihrem persönlichen Computer verwenden
     https://localhost:8443   
Für Ihre ÖffentlichkeitERDDAP™, Verwendung
     https://*your.domain.org*:8443   
oder, besser, ohne die :8443 wenn Sie einen Apache verwenden[Proxypass](/docs/server-admin/deploy-install#proxypass)so dass die Hafennummer nicht benötigt wird.
     
* In Ihrem setup.xml ändern Sie die&lt;VERFAHREN zum Beispiel:
```
    <authentication>oauth2</authentication>  
```
###### Google-Setup{#google-setup} 
* Für die google und oauth2 Optionen:
Folgen Sie den folgenden Anweisungen, um die Google-Authentifizierung für IhreERDDAP.
     
    1. Wenn Sie kein Google-E-Mail-Konto haben,[erstellen](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. Folgen[Diese Anweisungen](https://developers.google.com/identity/sign-in/web/devconsole-project)um ein Google Developers Console-Projekt zu erstellen und eine Client-ID zu erhalten.
        
Wenn das Google-Formular nach autorisiert fragtJavaScript-Ursprünge, geben Sie den Wert aus&lt;baseHttpsUrl&gt; von Ihrem persönlichen ComputerERDDAP™setup.xml, z.
         https://localhost:8443   
Auf einer zweiten Zeile, fügen Sie die&lt;baseHttpsUrl&gt; von Ihrer öffentlichenERDDAP™setup.xml, z.
         https://*your.domain.org*:8443
 
        
Geben Sie keine autorisierten URIs an.
        
Wenn Sie Ihre Client-ID für dieses Projekt sehen, kopieren und in Ihr setup.xml einfügen (in der Regel nur unterhalb&lt;authentisierung&gt; geordnet sein, aber Platzierung spielt eigentlich keine Rolle), in der&lt;googleClientID&gt; tag, z.
        &lt;) *IhreClientID* &lt;/googleClientID&gt;
Die Client-ID wird eine Reihe von etwa 75 Zeichen sein, wahrscheinlich beginnend mit mehreren Ziffern und enden mit .apps.googleusercontent.com .
         
        
    3. In deinemdatasets.xml, erstellen Sie ein [&lt;Benutzer (/docs/server-admin/datasets#user) tag für jeden Benutzer, der Zugriff auf private Datensätze hat. Für das Attribut Benutzername im Tag:
        
        * Für Benutzer, die sich mit Google anmelden, verwenden Sie die Google-E-Mail-Adresse des Nutzers.
        * Für Benutzer, die sich mit orcid anmelden, verwenden Sie die Orcid-Kontonummer des Benutzers (mit Bindestrichen) .
        
Geben Sie nicht das Passwort-Attribut für das Benutzer-Tag an.
         
    4. RestERDDAP™so dass die Änderungen an setup.xml unddatasets.xmlWirkung nehmen.
         
###### Orcid Setup{#orcid-setup} 
* Für die orcid und oauth2 Optionen:
Folgen Sie den Anweisungen unten, um Orcid-Authentifizierung für IhreERDDAP.
     (Für Details siehe[Orcid's Authentifizierung API Dokumentation](https://members.orcid.org/api/integrate/orcid-sign-in).)   
     
    1. Wenn Sie kein Orcid-Konto haben,[erstellen](https://orcid.org/signin)  
         
    2. Einloggen in Orcid[ https://orcid.org/signin ](https://orcid.org/signin)Ihr persönliches Orcid-Konto verwenden.
         
    3. Klicken Sie auf "Developer Tools" (unter "For Researchers" an der Spitze) .
         
    4. Klicken Sie auf "Register für die kostenlose ORCID Public API". Geben Sie diese Informationen ein:
Name:ERDDAP™bei\\[Ihre Organisation\\]  
Website:\\[IhrERDDAP's Domain\\]  
Beschreibung:ERDDAP™ist ein wissenschaftlicher Datenserver. Benutzer müssen mit Google oder Orcid authentifizieren, um auf nicht-öffentliche Datensätze zuzugreifen.
Redirect URIs:\\[IhrERDDAP's Domain\\]/erddap/loginOrcid.html
         
    5. Klicken Sie auf das Symbol speichern (Es sieht aus wie eine 3,5-Zoll-Disk&#33;) .
Sie können dann Ihre ORCID APP Client ID und ORCID Client Secret sehen.
         
    6. Kopieren und Einfügen der ORCID APP Client ID (die mit "APP-" beginnen wird) in setup.xml in der&lt;orcidClientID&gt; tag, z.
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Kopieren und Einfügen des ORCID Client Secret (alpha-numerische Zeichen im Kleinbuchstaben) in setup.xml in der&lt;orcidClientSecret&gt; tag, z.
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. In deinemdatasets.xml, erstellen Sie ein [&lt;Benutzer (/docs/server-admin/datasets#user) tag für jeden Benutzer, der Zugriff auf private Datensätze hat. Für das Attribut Benutzername im Tag:
        
        * Für Benutzer, die sich mit Google anmelden, verwenden Sie die Google-E-Mail-Adresse des Nutzers.
        * Für Benutzer, die sich mit orcid anmelden, verwenden Sie die Orcid-Kontonummer des Benutzers (mit Bindestrichen) .
        
Geben Sie nicht das Passwort-Attribut für das Benutzer-Tag an.
         
    9. RestERDDAP™so dass die Änderungen an setup.xml unddatasets.xmlWirkung nehmen.
             

###### Melden Sie sich an{#log-in-either-way} 
Wenn Sie die Google-, orcid- oder oauth2-Authentifizierungsoptionen verwenden, und Google Sign-In oder Orcid's Authentication API plötzlich aufhört zu arbeiten (aus welchem Grund) oder nicht mehr alsERDDAP™erwartet, Benutzer werden nicht in der Lage sein, sich an IhreERDDAP. Als vorübergehend (oder dauerhaft) Lösung, Sie können Benutzer fragen, sich mit dem anderen System anmelden (ein Google-E-Mail-Konto erhalten oder ein Orcid-Konto erhalten) . Dazu:

1. Änderung der&lt;authentifizierungs-Tag so, dass es das andere Authentifizierungssystem erlaubt. Die oauth2 Option ermöglicht es Benutzern, sich mit einem System anzumelden.
2. Duplikat jeder der&lt;Benutzer-Tags und ändern Sie das Benutzername-Attribut von der Google-E-Mail-Adresse auf die entsprechende Orcid-Kontonummer (oder umgekehrt) , aber halten Sie die Rollen Attribut gleich.

###### OpenId{#openid} 
ERDDAP™unterstützt nicht mehr die openid-Authentifizierungsoption, die auf einer Version von open ID, die jetzt nicht aktuell ist. Bitte verwenden Sie stattdessen die Google, orcid oder oauth2 Optionen.

###### BAS{#basic} 
ERDDAP™unterstützt BASIC-Authentifizierung nicht, weil:
* BASIC scheint auf vordefinierte Webseiten ausgerichtet, die einen sicheren Zugriff oder eine Decke auf/aus Zugriff auf die gesamte Website benötigen, aberERDDAP™erlaubt (eingeschränkter Zugang) Datensätze, die auf dem Flugplatz hinzugefügt werden sollen.
* BASIC-Authentifizierung bietet keine Möglichkeit für Benutzer, sich auszuloggen&#33;
* BASIC-Authentifizierung ist bekanntermaßen nicht sicher.

##### Sichere Datenquellen{#secure-data-sources} 
Wenn ein Datensatz eingeschränkten Zugriff aufERDDAP™Benutzer, die Datenquelle (von woERDDAP™erhält die Daten) nicht öffentlich zugänglich sein. So wie kannERDDAP™die Daten für eingeschränkte Zugriffsdatensätze erhalten? Einige Optionen sind:

*   ERDDAP™können Daten von lokalen Dateien dienen (beispielsweise über EDDTable VonFiles oderEDDGridVonFiles) .
     
*   ERDDAP™kann in einem[DMZ](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing)) und die Datenquelle (z.B. einOPeNDAPServer oder Datenbank) kann hinter einem[Firewall](https://en.wikipedia.org/wiki/Firewall), wo es zugänglich istERDDAP™aber nicht der Öffentlichkeit.
     
* Die Datenquelle kann auf einer öffentlichen Website sein, erfordert aber einen Login, um die Daten zu erhalten. Die beiden Arten von Datensatz, dassERDDAP™kann sich anmelden, um zuzugreifen[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)und[EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra). Diese Datensätze unterstützen (und sollte immer verwenden) Benutzernamen (erstellenERDDAP™Benutzer, die nur Leserechte haben) , Passwörter, SSL-Verbindungen und andere Sicherheitsmaßnahmen.
    
Aber im Allgemeinen, derzeit,ERDDAP™Diese Datenquellen können nicht behandelt werden, da sie keine Bestimmungen zur Anmeldung an die Datenquelle haben. Dies ist der Grund, warum der Zugang zu[EDDGridVonErddap und EDDTable Von Erddap](/docs/server-admin/datasets#eddfromerddap)Datensätze können nicht eingeschränkt werden. Aktuell, die lokaleERDDAP™hat keine Möglichkeit, sich anzumelden und die Metadaten-Informationen von der Fernbedienung zuzugreifenERDDAP. Und die "Entfernung" setzenERDDAP™hinter der Firewall und das Entfernen des Datensatzes Zu Einschränkungen löst das Problem nicht: da Benutzeranfragen für EDDXxx FromErddap-Daten müssen in die Fernbedienung umgeleitet werdenERDDAP™, die FernbedienungERDDAP™muss zugänglich sein.
    
#### Verteidigung gegen Hacker{#defenses-against-hackers} 
Es gibt schlechte Kerl Hacker, die versuchen, Sicherheitsschwächen in Server-Software wie zu nutzenERDDAP.ERDDAP™folgt der gemeinsamen Sicherheitsberatung, um mehrere Verteidigungsschichten zu haben:

* Eingeschränkte Privilegien -- Eine der wichtigsten Verteidigungen ist, Tomcat über einen Benutzer namens tomcat laufen, der kein Passwort hat (so kann sich niemand einloggen als dieser Benutzer) und hat eingeschränkte Dateisystem Privilegien (z.B. nur lesbarer Zugriff auf die Daten) . Vgl.ERDDAPInstruktionen für[Einrichten von](/docs/server-admin/deploy-install#tomcat).
* Schwere Verwendung - Im Allgemeinen,ERDDAP™wird für den schweren Gebrauch gebaut, einschließlich durch Skripte, die zehntausende von Anfragen machen, nacheinander. Es ist schwer fürERDDAP™gleichzeitig sich zu einer schweren legitimen Nutzung zu öffnen und sich vor Missbrauch zu schützen. Es ist manchmal schwer, schwere legitime Verwendung, übermäßige legitime Verwendung und illegitime Verwendung zu unterscheiden (und manchmal ist es wirklich einfach) . Unter anderem Verteidigung,ERDDAP™Eine einzige Aufforderung, einen inordinierten Anteil der Ressourcen des Systems zu verwenden, ist bewusst nicht möglich. (wenn das System sonst nicht aktiv ist) .
* Fehlerhafte Benutzer identifizieren - WennERDDAP™verlangsamt oder eisfriert (vielleicht, weil ein naiver Benutzer oder ein Bot mehrere Skripte läuft, um mehrere Anfragen gleichzeitig oder vielleicht wegen eines schlechten Kerls einzureichen[Dienstleistungen](https://en.wikipedia.org/wiki/Denial-of-service_attack)Angriff) , Sie können die[Tägliche Berichte E-Mail](#daily-report)  (und häufiger identische Informationen in der[ERDDAP™Logfile](#log)) die die Anzahl der von den aktivsten Nutzern gestellten Anfragen anzeigt (siehe "Requester's IP Adresse (Erlaubt) ") .ERDDAP™sendet auch E-Mails an den Administrator, wenn es["Ungewöhnliche Tätigkeit: &gt;25% der Anträge scheiterten"](#failed-requests). Sie können dann in derERDDAP™log-Datei, um die Art ihrer Anfragen zu sehen. Wenn Sie das Gefühl haben, dass jemand zu viele Anfragen macht, bizarre Anfragen (Du würdest nicht glauben, was ich gesehen habe.) , oder Angriffswünsche, können Sie ihre IP-Adresse der Blacklist hinzufügen.
* Blacklist -- Sie können die IP-Adresse der störenden Benutzer, Bots, und[Dienstleistungen](https://en.wikipedia.org/wiki/Denial-of-service_attack)Angreifer zu denERDDAP [Schwarze Liste](/docs/server-admin/datasets#requestblacklist), so dass zukünftige Anträge von ihnen sofort abgelehnt werden. Diese Einstellung ist indatasets.xmlso dass Sie schnell eine IP-Adresse zur Liste hinzufügen können und dann[Flagge](#flag)einen Datensatz, so dassERDDAP™sofort bemerkt und wendet die Änderung an. Die Fehlermeldung, die an Blacklist-Benutzer gesendet wird, ermutigt sie, sich an dieERDDAP™Administrator, wenn sie das Gefühl haben, dass sie falsch auf die Blacklist gesetzt wurden. (In unserer Erfahrung haben sich mehrere Benutzer nicht bewusst, dass sie mehrere Skripte gleichzeitig ausgeführt haben, oder dass ihre Skripte Unsinn-Anfragen machten.) 
* Dataset Security - Einige Arten von Datensätzen (insbesondere, EDDTableFromDatabase) zusätzliche Sicherheitsrisiken (z.B. SQL-Injektion) und haben ihre eigenen Sicherheitsmaßnahmen. Siehe die Informationen für diese Arten von Datensätzen in[Arbeiten mit demdatasets.xmlDatei](/docs/server-admin/datasets), insbesondere[EDDTableFromDatenbanksicherheit](/docs/server-admin/datasets#database-security).
* Sicherheitsaudit -- ObwohlNOAADie IT-Sicherheit lehnte unsere Scan-Anforderungen seit Jahren ab, sie scannen meine (Bobs)  ERDDAP™Installation. Obwohl die ersten Scans einige Probleme gefunden haben, die ich dann behoben habe, haben die nachfolgenden Scans keine Probleme mitERDDAP. Die Scans sorgen sich um viele Dinge: vor allem, seittabledapAnfragen aussehen wie SQL-Anfragen, sie sorgen sich um SQL-Injection Schwachstellen. Aber diese Bedenken sind unbegründet, weilERDDAP™speichert und validiert Abfragen und baut dann separat die SQL-Abfrage auf eine Art und Weise auf, die Injektionslücken vermeidet. Das andere, was sie manchmal beschweren, ist, dass unsereJavaVersion oder Tomcat Versionen sind nicht so aktuell wie sie wollen, so dass wir sie in Reaktion aktualisieren. Ich habe vorher angeboten, den Leuten die Sicherheitsberichte zu zeigen, aber ich sage jetzt, dass ich das nicht kann.

#### Fragen? Vorschläge?{#questions-suggestions} 
Wenn Sie Fragen zuERDDAP"Sicherheitssystem" oder haben Fragen, Zweifel, Bedenken oder Vorschläge, wie es eingerichtet wird, siehe unsere[Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support).
    

## Dinge, die Sie nicht wissen müssen{#things-you-dont-need-to-know} 

Dies sind Details, die Sie nicht wissen müssen, bis eine Notwendigkeit entsteht.

### ZweiERDDAP™ {#second-erddap} 
*    **Eine Sekunde einrichtenERDDAP™zur Prüfung/Entwicklung**   
Wenn Sie dies tun möchten, gibt es zwei Ansätze:
    *    (Best) Tomcat installieren undERDDAP™auf einem anderen Computer als dem Computer, der Ihre Öffentlichkeit hatERDDAP. Wenn Sie Ihren persönlichen Computer verwenden:
        1. Machen Sie die Installation einen Schritt zu einem Zeitpunkt. Holen Sie Tomcat und fahren Sie zuerst.
Wenn Tomcat läuft, sollte der Tomcat Manager bei
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (oder vielleicht[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. InstallierenERDDAP.
        3. Verwenden Sie ProxyPass nicht, um die Hafennummer von derERDDAP™URL.
        4. In[Setup.xml](/docs/server-admin/deploy-install#setupxml), set baseUrl to http://127.0.0.1:8080
 
        5. Nach dem StartERDDAP™, Sie sollten es sehen können
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (oder vielleicht[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### Zweiter Tomcat{#second-tomcat} 
*    (Das Beste) Installieren Sie einen anderen Tomcat auf dem gleichen Computer wie Ihr PublikumERDDAP.
    1. Machen Sie die Installation einen Schritt zu einem Zeitpunkt. Holen Sie Tomcat und fahren Sie zuerst.
Alle mit dem zweiten Tomcat verbundenen Portnummern ändern (z.B. Änderung 8080 bis 8081)   (siehe[Viel Spaß&#33; Sachgebiet](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)halbwegs durch dieses Dokument) .
    2. InstallierenERDDAP™im neuen Tomcat.
    3. Verwenden Sie ProxyPass nicht, um die Hafennummer von derERDDAP™URL.
    4. In[Setup.xml](/docs/server-admin/deploy-install#setupxml), set baseUrl to http://www.*yourDomainName*:8081
 
    5. Nach dem StartERDDAP™, Sie sollten es sehen können
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### Solid State Drives{#solid-state-drives} 
*    **Solid State Drives (SSDs) sind toll&#33;**   
Der schnellste, einfachste und günstigste Weg, um zu beschleunigenERDDAPDer Zugriff auf tabellarische Daten besteht darin, die Datendateien auf einem Solid State Drive zu setzen (SSD) . Die meisten tabellarischen Datensätze sind relativ klein, so dass ein 1 oder 2 TB SSD wahrscheinlich ausreicht, um alle Datendateien für alle Ihre tabellarischen Datensätze zu halten. SSD ist schließlich verschleißen, wenn Sie Daten an eine Zelle schreiben, löschen und neue Daten zu oft an diese Zelle schreiben. Also, wenn Sie nur Ihre SSD verwenden, um die Daten einmal zu schreiben und es viele Male zu lesen, auch eine verbraucher-grade SSD sollte eine sehr lange Zeit, wahrscheinlich viel länger als jede Festplatte Laufwerk (HDD) . Consumer-grade SSD's sind jetzt billig (2018, ~$200 für 1 TB oder ~$400 für 2 TB) und die Preise fallen immer noch schnell. WannERDDAP™Zugriff auf eine Datendatei, eine SSD bietet sowohl kürzere Latenz (~0.1ms, versus ~3ms for an HDD, versus ~10 (?) ms for a RAID, versus ~55ms for Amazon S3) und höherer Durchsatz (~500 MB/S, versus ~75 MB/s für eine HDD, versus ~500 MB/s für eine RAID) . So können Sie eine große Leistungssteigerung erhalten (bis zu 10X gegen eine HDD) für $200&#33; Im Vergleich zu den meisten anderen möglichen Änderungen an Ihrem System (einen neuen Server für $10.000? eine neue RAID für $35.000? einen neuen Netzwerkschalter für $5000? usw.) , dies ist bei weitem die beste Return on Investment (ROI) . Wenn/wenn die SSD stirbt (in 1, 2, 8 Jahren) ersetzen. Beschränken Sie sich nicht auf sie, wie langfristig, Archivspeicherung der Daten, nur für die Frontendkopie der Daten.\\[SSD wäre auch für netzgebundene Daten großartig, aber die meisten netzgebundenen Datensätze sind viel größer, was die SSD sehr teuer macht.\\]
    
Wenn Ihr Server nicht mit Speicher geladen wird, ist ein zusätzlicher Speicher für Ihren Server auch eine großartige und relativ kostengünstige Möglichkeit, alle Aspekte zu beschleunigenERDDAP.
     
    
### [Schwere Lasten / Einschränkungen](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
Mit schwerem Einsatz, StandaloneERDDAP™kann durch verschiedene Probleme eingeschränkt werden. Weitere Informationen finden Sie in der[Liste der Einschränkungen und Lösungen](/docs/server-admin/scaling#heavy-loads--constraints).
     
### Gitter, Cluster und Föderationen{#grids-clusters-and-federations} 
Unter sehr schweren Einsatz, ein einziges StandaloneERDDAP™wird zu einem oder mehreren Einschränkungen führen und sogar die vorgeschlagenen Lösungen werden unzureichend sein. Für solche SituationenERDDAP™verfügt über Funktionen, die es einfach machen skalierbare Gitter zu konstruieren (auch Cluster oder Verbände genannt) vonERDDAPs, die es erlauben, das System sehr schwer zu handhaben (z.B. für ein großes Rechenzentrum) . Für weitere Informationen siehe[Netze, Cluster und Verbände vonERDDAPS](/docs/server-admin/scaling).
     
### Cloud Computing{#cloud-computing} 
Mehrere Unternehmen beginnen zu bieten[Cloud Computing Services](https://en.wikipedia.org/wiki/Cloud_computing)  (z.B.,[Amazon Web Services](https://aws.amazon.com/)) .[Webhosting-Unternehmen](https://en.wikipedia.org/wiki/Web_hosting_service)Seit Mitte der 1990er Jahre haben einfachere Dienstleistungen angeboten, aber die "Cloud"-Dienste haben die Flexibilität der Systeme und das Angebotsspektrum erheblich erweitert. Sie können diese Dienste nutzen, um eine einzelneERDDAP™oder ein Raster/Kluster vonERDDAPs sehr schwer zu bedienen. Für weitere Informationen siehe[Cloud Computing mitERDDAP™](/docs/server-admin/scaling#cloud-computing).

### Amazon{#amazon} 
*    **[Amazon Web Services (AWS) EC2 Installation Übersicht](#amazon)**   
    [Amazon Web Services (AWS) ](https://aws.amazon.com/)ein[Cloud Computing Service](https://en.wikipedia.org/wiki/Cloud_computing)die eine breite Palette von Computer-Infrastruktur bietet, die Sie nach der Stunde mieten können. Sie können installierenERDDAP™auf einem[Elastic Compute Cloud (EG2) ](https://aws.amazon.com/ec2/)Beispiel (ihr Name für einen Computer, den Sie mit der Stunde mieten können) . AWS hat eine ausgezeichnete[AWS Benutzerhandbuch](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)und Sie können Google verwenden, um Antworten auf bestimmte Fragen zu finden, die Sie haben könnten. Halte dich fest -- es ist eine faire Menge an Arbeit zu beginnen. Aber sobald Sie einen Server auf und läuft, können Sie einfach so viele zusätzliche Ressourcen mieten (Server, Datenbanken, SSD-Raum, etc.) wie Sie brauchen, zu einem angemessenen Preis.\\[Dies ist keine Empfehlung oder Billigung von Amazon Web Services. Es gibt andere Cloud-Anbieter.\\]
    
Eine Übersicht der Dinge, die Sie tun müssen, um zu erhaltenERDDAP™auf AWS läuft:
    
    * Im Allgemeinen werden Sie alles tun, was in der[AWS Benutzerhandbuch](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).
    * Ein AWS-Konto einrichten.
    * Erstellen Sie einen AWS-Benutzer innerhalb dieses Kontos mit Administratorrechten. Melden Sie sich als dieser Benutzer an, um alle folgenden Schritte zu tun.
    * Elastischer Blockspeicher (EBS) ist das AWS-Äquivalent einer Festplatte, die auf Ihrem Server angebracht ist. Einige EBS-Raum werden zugewiesen, wenn Sie zuerst eine EC2 Instanz erstellen. Es ist persistente Speicherung -- die Informationen sind nicht verloren, wenn Sie Ihre EC2 Instanz stoppen. Und wenn Sie Instanztypen ändern, wird Ihr EBS-Raum automatisch an die neue Instanz angeschlossen.
    * Erstellen Sie eine Elastische IP-Adresse, damit Ihre EC2-Instanz eine stabile, öffentliche URL hat (im Gegensatz zu nur einer privaten URL, die jedes Mal ändert, wenn Sie Ihre Instanz neu starten) .
    * Erstellen und starten Sie eine EC2 Instanz (Computer) . Es gibt eine breite Palette von[Beispieltypen](https://aws.amazon.com/ec2/instance-types/), jeweils zu einem anderen Preis. Eine m4.large oder m4.xlarge Instanz ist leistungsstark und ist wahrscheinlich für die meisten Anwendungen geeignet, aber wählen Sie, was Ihren Bedürfnissen entspricht. Sie werden wahrscheinlich Amazons Linux als Betriebssystem verwenden wollen.
    * Wenn Ihr Desktop / Laptop-Computer ein Windows-Computer ist, können Sie verwenden[PuTT](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html), ein kostenloses SSH-Client für Windows, um Zugriff auf die Befehlszeile Ihrer EC2 Instanz zu erhalten. Oder Sie haben vielleicht ein anderes SSH-Programm, das Sie bevorzugen.
    * Wenn Sie sich in Ihre EC2-Instanz einloggen, werden Sie als administrativer Benutzer mit dem Benutzernamen "ec2-user" eingeloggt. ec2-user hat sudo Privilegien. Also, wenn Sie etwas als root-Benutzer tun müssen, verwenden Sie: sudo *EinigeCommand* 
    * Wenn Ihr Desktop / Laptop-Computer ein Windows-Computer ist, können Sie verwenden[DateiZilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp), ein kostenloses SFTP-Programm, um Dateien auf / von Ihrer EC2 Instanz zu übertragen. Oder Sie haben vielleicht ein anderes SFTP-Programm, das Sie bevorzugen.
    *   [Apache installieren](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)über Ihre EC2-Instanz.
    * Folgen Sie der Norm[ERDDAP™Installationsanleitung](/docs/server-admin/deploy-install).
         
### WarteThenTryAgain Ausnahme{#waitthentryagain-exception} 
Ein Benutzer kann eine Fehlermeldung wie
WarteThenTryAgainException:
Es gab eine (vorübergehend?) Problem. Warte mal, dann versuche es noch mal. (Klicken Sie in einem Browser auf die Schaltfläche Nachladen.)   
Details: GridDataAccessor.increment: partiellErgebnisse\\[0)\\]= "123542730" wurde erwartet "123532800".

Die allgemeine Erklärung der WaitThenTryAgainException ist:
WannERDDAP™wird auf eine Benutzeranfrage reagiert, es kann einen unerwarteten Fehler mit dem Datensatz geben (z.B. einen Fehler beim Lesen von Daten aus der Datei oder einen Fehler auf einen Remote-Datensatz) . WaitThenTryAgain signalisiertERDDAP™dass die Anfrage fehlgeschlagen ist (bis) aberERDDAP™sollte versuchen, den Datensatz schnell neu zu laden (es ruft[Anfrage sendenReloadASAP](#requestreloadasap)) und die Anfrage wieder einholen. Oft gelingt dies, und der Benutzer sieht nur, dass die Antwort auf die Anfrage war langsam. Andere Zeiten, die Nachladung fehlschlägt oder zu langsam ist, oder der anschließende Versuch, mit der Anfrage zu umgehen, scheitert auch und wirft einen anderen WaitThenTryAgain. Wenn das passiert,ERDDAP™markiert den Datensatz zum Nachladen, sagt aber der Benutzer (über eine WarteThenTryAgain Ausnahme) dass es einen Fehler gab, während auf die Anfrage reagierte.

Das ist das normale Verhalten. Dieses System kann mit vielen gemeinsamen Problemen umgehen.
Aber es ist möglich, dass dieses System übermäßig ausgelöst wird. Die häufigste Ursache ist, dassERDDAP's Laden des Datensatzes sieht kein Problem, aberERDDAPDie Antwort auf eine Anforderung von Daten sieht das Problem. Egal, was die Ursache ist, die Lösung ist, dass Sie mit dem Datensatz umgehen, was falsch ist. Schauen Sie log.txt ein, um die tatsächlichen Fehlermeldungen zu sehen und mit den Problemen zu umgehen. Wenn viele Dateien gültige Header haben, aber ungültige Daten (eine beschädigte Datei) , ersetzen Sie die Dateien durch unkorrupte Dateien. Wenn die Verbindung zu einem RAID flakey ist, reparieren Sie es. Wenn die Verbindung zu einem Remote-Service ist flakey, finden Sie einen Weg, um es nicht flakey zu machen oder laden Sie alle Dateien aus der Remote-Quelle und dienen die Daten aus den lokalen Dateien.

Die detaillierte Erläuterung dieses spezifischen Fehlers (oben) ist:
Für jedenEDDGridDatensatz,ERDDAP™hält die Achsengrößenwerte im Speicher. Sie werden beispielsweise verwendet, um angeforderte Achswerte zu konvertieren, die die " () " Format in Indexzahlen. Wenn die Achswerte beispielsweise "10, 15, 20, 25" sind, ist eine Anforderung für (20) wird als Anforderung für Index #2 interpretiert (0basierte Indizes) . WannERDDAP™erhält eine Anforderung an Daten und holt die Daten aus der Quelle, es verifiziert, dass die Achsenwerte, die sie von der Quelle erhalten, den Achsenwerten im Speicher entsprechen. Normalerweise tun sie das. Aber manchmal hat sich die Datenquelle signifikant geändert: beispielsweise können Indexwerte von Beginn der Achsgröße entfernt worden sein. (z.B. "10, 15, 20, 25" kann "20, 25, 30" geworden sein) . Wenn das passiert, ist klar, dassERDDAPAuslegung des Antrags (z.B. " (20) " ist der Index #2) ist jetzt falsch. So.ERDDAP™wirft eine Ausnahme und ruft RequestReloadASAP.ERDDAP™wird den Datensatz bald aktualisieren (oft in ein paar Sekunden, in der Regel innerhalb einer Minute) . Andere, ähnliche Probleme werfen auch die WaitThenTryAgain Ausnahme.
    
#### Anfrage sendenReloadASAP{#requestreloadasap} 
Sie können RequestReloadASAP in der log.txt-Datei direkt nach einer Fehlermeldung und oft in der Nähe einer[WarteThenTryAgain Ausnahme](#waitthentryagain-exception). Es ist im Grunde eine interne, programmatische Weise fürERDDAP™eine[Flagge](#flag)um zu signalisieren, dass der Datensatz ASAP neu geladen werden sollte.
     
### Dateien nicht gelöscht werden{#files-not-being-deleted} 
Für ein paarERDDAP™Installationen, es gab ein Problem mit einigen temporären Dateien erstellt vonERDDAP™offen bleiben (Fehler) und damit nicht gelöscht werden. In einigen Fällen haben sich viele dieser Dateien angesammelt und eine beträchtliche Menge Speicherplatz aufgenommen.

Hoffentlich sind diese Probleme behoben (alsERDDAP™2.00 Uhr) . Wenn Sie dieses Problem sehen, mailen Sie bitte das Verzeichnis+Namen der abgehenden Dateien an Chris. John bei noaa.gov. Sie haben einige Möglichkeiten, sich mit dem Problem zu befassen:

* Wenn die Dateien nicht groß sind und nicht dazu führen, dass Sie aus dem Speicherplatz laufen, können Sie das Problem ignorieren.
* Die einfachste Lösung ist die Abschaltung von Tomcat/ERDDAP™  (nach Stunden so weniger Benutzer betroffen) . Beim Abschalten, wenn das Betriebssystem die Dateien nicht gelöscht, löschen Sie sie per Hand. Dann neu startenERDDAP.
         
### JSON-ld{#json-ld} 
*    **[Semantische Markierung von Datensätzen mit json-ld (JSON Linked Data) ](#json-ld)**   
    ERDDAP™jetzt verwendet[json-ld (JSON Linked Data) ](https://json-ld.org)um Ihren Datenkatalog und Ihre Datensätze zum Teil zu machen[semantisches Web](https://en.wikipedia.org/wiki/Semantic_Web), das ist Tim Berners-Lees Idee, Webinhalte mehr maschinell lesbar und Maschine "verstanden" zu machen. Der json-ld-Inhalt verwendet[schema.org](https://schema.org/)Begriffe und Definitionen. Suchmaschinen ([insbesondere Google](https://developers.google.com/search/docs/data-types/datasets)) und andere semantische Werkzeuge können diese strukturierte Markierung verwenden, um die Entdeckung und Indexierung zu erleichtern. Das json-ld strukturierte Markup erscheint als unsichtbar-zu-Menschen&lt;&#33; Code auf der https://.../erddap/info/index.html Seite (das eine semantische Bahn ist[Datenschutzerklärung](https://schema.org/DataCatalog)) und auf jeder https://.../erddap/info/*datasetID*/index.html Seite (das eine semantische Bahn ist[Datensatz](https://schema.org/Dataset)) . (Speziell dank Adam Leadbetter und Rob Fuller vom Marine Institute in Irland für die harten Teile der Arbeit, um diesen Teil derERDDAP.)   
     
### Out-Of-Date URLs{#out-of-date-urls} 
Langsam aber sicher werden die URLs, die Datenanbieter in Datendateien geschrieben haben, nicht aktuell. (zum Beispiel,httpwirdhttps, Websites werden neu angeordnet und Organisationen wie NODC/NGDC/NCDC werden in NCEI neu organisiert) . Die daraus resultierenden gebrochenen Links sind ein ständiges Problem, mit dem alle Webseiten konfrontiert sind. Um damit zu umgehen,ERDDAP™hat nun ein System, um aus-of-date URLs automatisch zu aktualisieren. Wenn Sie Datasets generieren Xml sieht eine out-of-date URL, es fügt die aktuelle URL zu&lt;addAttributes&gt;. Auch, wenn ein Datensatz lädt, wennERDDAP™sieht eine Off-of-date URL, sie ändert sie stumm auf die aktuelle URL. Die Änderungen werden durch eine Reihe von Such-für/Ersatz-mit in&lt;updateUrls&gt; inERDDAP'
\\[Tomcat\\]/webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml Datei. Sie können dort Veränderungen vornehmen. Wenn Sie Änderungen vorschlagen, oder wenn Sie denken, dass dies in einen Dienst umgewandelt werden sollte (wie die Konverter) E-Mail an Chris. John bei noaa.gov.
     
### CORS{#cors} 
* CORS ([Übergeordnete Ressourcenteilung](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
"ist ein Mechanismus, der begrenzte Ressourcen erlaubt (z.B. Schriften oderERDDAP™Daten) auf einer Webseite, die von einer anderen Domain außerhalb der Domain angefordert werden soll, aus der die erste Ressource bedient wurde" (Arun Ranganathan) . Grundsätzlich ist CORS eine Nachricht, die in den HTTP Header einer Antwort gesetzt werden kann und im Wesentlichen sagt: "Es ist okay mit dieser Website, wenn bestimmte andere Websites (spezifische oder alle) Ressourcen nutzen (z.B. Daten) von dieser Seite und machen es auf ihrer Website zur Verfügung". So ist es eine Alternative zu[JSONP](https://en.wikipedia.org/wiki/JSONP).
    
Die Entwickler vonERDDAP™nicht Anspruch auf Sicherheitsexperten. Wir sind nicht ganz klar über die Sicherheitsprobleme im Zusammenhang mit CORS. Wir wollen keine Aussage machen, die eine Aktion ausschließt, die die Sicherheit verringert. Also bleiben wir neutral und lassen es zu jedemERDDAP™admin zu entscheiden, ob die Vorteile oder die Freigabe eines CORS-Headers die Risiken wert sind. Wie immer, wenn SieERDDAP™hat alle privaten Datensätze, es ist eine gute Idee, um besonders vorsichtig mit der Sicherheit zu sein.
    
Wenn Sie CORS für Ihre aktivieren möchtenERDDAP™, gibt es[leicht zugängliche Anleitungen](https://enable-cors.org/index.html)beschreiben, wie Website-Administratoren einen CORS-Header über ihre Server-Software auf niedriger Ebene aktivieren können (z.B., Apache oder nginx) .
    
### Paletten{#palettes} 
* Paletten werden vonERDDAP™um eine Reihe von Datenwerten in eine Reihe von Farben bei der Erstellung von Grafiken und Karten zu konvertieren.
    
Jede Palette wird in einer .cpt-Stil-Palette definiert, wie sie von[GMT](https://www.soest.hawaii.edu/gmt/). AlleERDDAP™.cpt-Dateien sind gültige GMT .cpt-Dateien, aber das Gegenteil ist nicht wahr. Für den Einsatz inERDDAP™, .cpt-Dateien haben:
    
    * Optionale Kommentarzeilen am Start der Datei, beginnend mit "#".
    * Ein Hauptteil mit einer Beschreibung der Segmente der Palette, ein Segment pro Linie. Jede Segmentbeschreibungszeile hat 8 Werte:
Start Wert, startRed, start Grün, Start Blau, EndValue, endRed, endGreen, endBlue.
Es kann jede Anzahl von Segmenten geben.ERDDAP™verwendet lineare Interpolation zwischen startRed/Green/Blue und endRed/Green/Blue jedes Segments.
        
Wir empfehlen, dass jedes Segment eine unterschiedliche Start- und Endfarbe angibt und dass die Startfarbe jedes Segments gleich der Endfarbe des vorherigen Segments ist, so dass die Palette eine kontinuierliche Mischung von Farben beschreibt.ERDDAP™hat ein System für die Erstellung von on-the-fly eine Palette von diskreten Farben aus einer Palette mit einer kontinuierlichen Mischung von Farben. EineERDDAP™Benutzer kann angeben, ob sie wollen, dass die Palette kontinuierlich ist (das Original) oder diskret (aus dem Original) . Aber es gibt legitime Gründe, diese Empfehlungen für einige Paletten nicht zu folgen.
        
    * Die startValue und endValues müssen ganze Zahlen sein.
Das erste Segment muss startValue=0 und endValue=1 haben.
Das zweite Segment muss startValue=1 und endValue=2 haben.
Etc.
    * Die roten, grünen und blauen Werte müssen ganze Zahlen von 0 sein (keine) ... 255 (Vollständig) .
    * Das Ende der Datei muss 3 Zeilen mit:
        1. Hintergrund rgb Farbe für Datenwerte kleiner als das Farbbarminimum, z.B.: B 128 128 128 128
Es ist oft die startRed, startGreen und startBlue des ersten Segments.
        2. Eine Vordergrund rgb Farbe für Datenwerte mehr als das Farbbar Maximum, z.B.: F 128 0
Es ist oft das endRed, endGreen und endBlue des letzten Segments.
        3. Eine rgb-Farbe für NaN-Datenwerte, z.B. N 128 128 128 128
Es ist oft mittelgrau (128 128) .
    * Die Werte auf jeder Zeile müssen durch Tabs getrennt werden, ohne fremde Leerzeichen.
    
Eine .cpt-Datei ist BlueWhiteRed.cpt:
    
# Das ist BlueWhiteRed.cpt.
0 0 0 128 1 0 255
1 0 0 255 2 0 255 255 255
2 0 255 255 3 255 255 255 255 255
255 255 255 4 255 255 255 255 0
4 255 255 0 5 255 0 0 0 0
5 255 0 0 6 128 0 0 0
B 0 0 128
F 128 0 0
N 128 128 128 128
    
Siehe die vorhandenen .cpt-Dateien für andere Beispiele. Wenn es Probleme mit einer .cpt-Datei gibt,ERDDAP™wird wahrscheinlich einen Fehler werfen, wenn die .cpt-Datei parsed (das besser ist als die Nutzung der Informationen) .
    
Sie können zusätzliche Paletten hinzufügenERDDAP. Sie können sie selbst machen oder sie im Internet finden (z.B. bei[cpt-city](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) obwohl Sie wahrscheinlich ihr Format leicht bearbeiten müssen, umERDDAP's .cpt Anforderungen. Zu bekommenERDDAP™zur Verwendung einer neuen .cpt-Datei, speichern Sie die Datei in *Tomcat* /webapps/erdap/WEB-INF/cptfiles (Sie müssen dies für jede neue Version vonERDDAP) und auch:
    
    * Wenn Sie die Standard-Nachrichten.xml-Datei verwenden: Fügen Sie den Dateinamen in die Datei&lt;paletten&gt; tag in
         *Tomcat* /webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
Wenn Sie dies tun, müssen Sie es jedes Mal tun, wenn Sie UpgradeERDDAP.
    * Wenn Sie eine benutzerdefinierte Nachrichten.xml-Datei verwenden: Fügen Sie den Dateinamen in die&lt;paletten&gt; tag in Ihrer benutzerdefinierte message.xml-Datei: *Tomcat* /content/erddap/messages.xml . Wenn Sie dies tun, müssen Sie es nur einmal tun (aber es gibt andere Arbeiten, um eine benutzerdefinierte Messages.xml-Datei zu pflegen) .
    
Dann neu startenERDDAP™alsoERDDAP™merkt die Änderungen. Ein Vorteil dieses Ansatzes ist, dass Sie die Reihenfolge der Paletten in der Liste an Benutzern festlegen können. Wenn Sie eine Sammlung hinzufügen, empfehlen wir Ihnen, ein Präfix mit den Autoren Initialen hinzuzufügen (z.B. "KT\\_") auf den Namen jeder Palette, um die Sammlung zu identifizieren und so dass es mehrere Paletten, die sonst den gleichen Namen haben würde.
    
Bitte entfernen oder ändern Sie keine der Standardpaletten. Sie sind ein Standardmerkmal von allenERDDAP™Anlagen. Wenn Sie denken, eine Palette oder Palette von Paletten sollte in der Standard enthalten seinERDDAP™Verteilung, weil es / sie von allgemeinem Gebrauch wäre, bitte mailen Sie sie an Chris. John bei noaa.gov.
    
### Farbbarren{#colorbars} 
*    **Wie funktioniert das?ERDDAP™die Farben in einer Farbleiste erzeugen?** 
    
    1. Der Benutzer wählt einen der vordefinierten[Paletten](#palettes)oder verwendet den Standard, z.B. Rainbow. Paletten werden in GMT-style .cpt Color Palette Tabellendateien gespeichert/definiert. JedesERDDAP's vordefinierte Paletten hat einen einfachen Ganzzahlbereich, z.B. 0 bis 1 (wenn es nur einen Abschnitt in der Palette gibt) oder 0 bis 4 (wenn es vier Abschnitte in der Palette gibt) . Jedes Segment in der Datei deckt n bis n+1 ab, beginnend bei n = 0.
    2.  ERDDAP™generiert eine neue .cpt-Datei auf der-fly, indem Sie die vordefinierte Palette skalieren (z.B. 0 bis 4) bis zur Palette, die vom Benutzer benötigt wird (z.B. 0,1 bis 50) und dann einen Abschnitt in der neuen Palette für jeden Abschnitt der neuen Palette generieren (z.B. eine log Skala mit Zecken bei 0,1, 0,5, 1, 5, 10, 50 hat 5 Abschnitte) . Die Farbe für den Endpunkt jedes Abschnitts wird erzeugt, indem der jeweilige Abschnitt der Palette in der .cpt-Datei gefunden wird, dann die R-, G- und B-Werte linear interpoliert. (Das ist dasselbe, wie GMT Farben aus seinen Color Palette Tabellendateien generiert.) Dieses System ermöglichtERDDAP™mit generischen Paletten beginnen (z.B. Rainbow mit 8 Segmenten, insgesamt über 0 bis 8) und erstellen Sie benutzerdefinierte Paletten on-the-fly (z.B. ein benutzerdefinierter Regenbogen, der 0,1 bis 50 mg/L auf die Regenbogenfarben abbildet) .
    3.  ERDDAP™dann verwendet die neue .cpt-Datei, um die Farbe für jedes verschiedene farbige Pixel in der Farbleiste zu erzeugen (und später für jeden Datenpunkt beim Aufzeichnen von Daten auf einem Diagramm oder einer Karte) , wiederum indem Sie den entsprechenden Abschnitt der Palette in der .cpt-Datei finden, dann die R-, G- und B-Werte linear interpolieren.
    
Dieser Prozess mag unnötig kompliziert erscheinen. Aber es löst Probleme im Zusammenhang mit Log-Skalen, die schwer sind, andere Wege zu lösen.
    
So wie können Sie dasERDDAP™tut es? Das ist nicht einfach. Grundsätzlich müssen Sie den Prozess duplizieren, dassERDDAP™wird verwendet. Wenn Sie einJavaProgrammierer, Sie können das gleiche verwendenJavaKlasse, dieERDDAP™verwendet, um alles zu tun:
     *Tomcat* /webapps/erdap/WEB-INF/classes/gov/noaa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### Leitlinien für Datenverteilungssysteme{#guidelines-for-data-distribution-systems} 
Weitere allgemeine Meinungen zur Gestaltung und Auswertung von Datenverteilungssystemen finden Sie hier[Hier.](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html).
     
### ArchivADataset{#archiveadataset} 
In IhremERDDAP™Installation ist ein Kommandozeilen-Tool namens ArchiveADataset, das Ihnen helfen kann, ein Archiv zu erstellen (eine.zipoder.tar.gzDatei) mit einem Teil oder einem ganzen Datensatz, der in einer Reihe von netcdf-3 gespeichert ist.ncDatendateien in einem Dateiformat, das für die Einreichung vonNOAANCEI-Archiv (.ncfür gegitterte Datensätze oder[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)für tabellarische Datensätze, wie durch die[NZEINetCDFVorlagen v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) .

Archiv Dataset kann zwei verschiedene Archivformate machen:

* Das "originale" Format folgt diesen[NCEI Archivierungsrichtlinien](https://www.ncdc.noaa.gov/atrac/guidelines.html), diese Führung für[Archivierung Ihrer Daten bei NCEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1), und[Praktiken zur Sicherstellung der Datenintegrität](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity).
* Das Format "BagIt" macht[BagIt Dateien](https://en.wikipedia.org/wiki/BagIt), ein standardisiertes Archivformat, das von der U.S. Library of Congress, wie von der[BagIt v0.97 Spezifikation](https://tools.ietf.org/html/draft-kunze-bagit-14).NOAA's NCEI kann auf BagIt-Dateien für Einreichungen in das Archiv standardisieren.

Nicht überraschend, die[globale und variable Metadaten](/docs/server-admin/datasets#global-attributes)dassERDDAP™fördert/erfordert fast genau die gleichen in-file CF- und ACDD-Metadaten, die NCEI ermutigt/erfordert, so dass alle Ihre Datensätze bereit sein sollten, NCEI über[Senden2NCEI](https://www.nodc.noaa.gov/s2n/)oder[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI's Advanced Tracking and Resource Tool für Archive Collections) .

Wenn Sie (dieERDDAP™Administrator) verwenden ArchiveADataset, um Daten an NCEI zu übermitteln, dann Sie (nicht NCEI) wird bestimmen, wann ein Datenbruch an NCEI übermittelt wird und was dieser Bruch sein wird, denn Sie werden wissen, wann es neue Daten gibt und wie Sie diesen Bruch angeben (und NCEI nicht) . So ist ArchiveADataset ein Werkzeug für Sie, um ein Paket zu erstellen, um NCEI einzureichen.

Archiv Datensatz kann beispielsweise in anderen Situationen nützlich sein, z.ERDDAP™Administratoren, die eine Teilmenge eines Datensatzes konvertieren müssen (auf einem privatenERDDAP) aus seinem nativen Dateiformat in eine Reihe von[.ncCF-Dateien](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA), so dass eine ÖffentlichkeitERDDAP™die Daten aus dem.ncCF-Dateien statt der Originaldateien.

Sobald Sie eingerichtet habenERDDAP™und lauf es (mindestens ein Mal) , Sie können ArchiveADataset im *Tomcat* /webapps/erdap/WEB-INF-Verzeichnis. Es gibt ein Shell-Script (ArchiveADataset.sh) für Linux/Unix und eine Batchdatei (ArchiveADataset.bat) für Windows.

Unter Windows, das erste Mal, wenn Sie ArchiveADataset ausführen, müssen Sie den ArchiveADataset bearbeiten. bat-Datei mit einem Text-Editor, um den Pfad zur Java zu ändern. exe Datei, so dass WindowsJava.

Wenn Sie ArchiveADataset ausführen, wird es Ihnen eine Reihe von Fragen stellen. Geben Sie für jede Frage eine Antwort ein und drücken Sie dann Enter. Oder drücken Sie ^C, um ein Programm jederzeit zu verlassen.

Oder Sie können die Antworten auf die Fragen auf die Befehlszeile legen. Führen Sie das Programm einmal aus und geben Sie ein und schreiben Sie Ihre Antworten auf. Dann können Sie eine einzelne Befehlszeile erstellen (mit den Antworten als Parameter) die das Programm betreibt und alle Fragen beantwortet.
Verwenden Sie den Word-Standard, wenn Sie den Standardwert für einen bestimmten Parameter verwenden möchten.
Verwendung "" (zwei doppelte Zitate) als Platzhalter für eine leere Saite.
Die Angabe von Parametern auf der Befehlszeile kann sehr bequem sein, zum Beispiel, wenn Sie ArchiveADataset einmal im Monat verwenden, um einen Datenwert eines Monats zu archivieren. Sobald Sie die Befehlszeile mit Parametern generiert und gespeichert haben, dass Sie in Ihren Notizen oder in einem Shell-Skript nur kleine Änderungen jeden Monat vornehmen müssen, um das Archiv dieses Monats zu erstellen.

Die Fragen, die ArchiveADataset stellt, erlauben Ihnen:

* Geben Sie die Original- oder Bagit-Dateiverpackung an. Für NCEI verwenden Sie Bagit.
* Reißverschluss oder Teer angeben.gzKompression für das Paket. Für NCEI verwenden Sie Teer.gz.
* Angabe einer Kontakt-E-Mail-Adresse für dieses Archiv (es wird in der Datei READ\\_ME.txt im Archiv geschrieben) .
* Angabe derdatasetIDdes Datensatzes, den Sie archivieren möchten.
* Geben Sie an, welche Datenvariablen Sie archivieren möchten (in der Regel alle) .
* Geben Sie an, welche Untermenge des Datensatzes Sie archivieren möchten. Sie müssen die Untermenge in der gleichen Weise formatieren Sie eine Untermenge für eine Datenanforderung, so wird es anders für gerastet als für tabellarische Datensätze.
    * Bei netzgebundenen Datensätzen können Sie einen Wertebereich der linken Dimension angeben, in der Regel ist das ein Zeitbereich. ArchiveADataset stellt eine separate Anforderung vor und erzeugt für jeden Wert eine separate Datendatei im Wertebereich. Da gegitterte Datensätze in der Regel groß sind, müssen Sie fast immer eine kleine Teilmenge relativ zur Größe des gesamten Datensatzes angeben.
Zum Beispiel\\[ (2015-12-01) : (2015-12-31) \\]\\[\\]\\[\\]\\[\\]
    * Für tabellarische Datensätze können Sie jede Sammlung von Einschränkungen angeben, aber es ist oft eine Reihe von Zeit. Da tabellarische Datensätze in der Regel klein sind, ist es oft möglich, keine Einschränkungen festzulegen, so dass der gesamte Datensatz archiviert wird.
Beispiel: &time&gt;=2015-12-01&time&lt;2016-01
* Für tabellarische Datensätze: Geben Sie eine komma getrennte Liste von 0 oder mehr Variablen an, die bestimmen, wie die archivierten Daten in verschiedene Datendateien weiter unterteilt werden. Für Datensätze, die
    [cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)\\=Zeitreihen|Zeitreihenprofil|Trajektive|Trajektorienprofil
Sie sollten fast immer die Variable angeben, die die cf\\_role=timeseries\\_id hat (z.B.,stationID) oder cf\\_role=trajectory\\_id Attribut. ArchiveADataset stellt eine separate Anfrage und erzeugt für jede Kombination der Werte dieser Variablen eine separate Datendatei, z.B. für jedestationID.
Für alle anderen tabellarischen Datensätze werden Sie wahrscheinlich keine Variablen zu diesem Zweck angeben.
Warnung: Wenn die Untermenge des Datensatzes, die Sie archivieren, sehr groß ist (&gt;2GB) und es gibt hierfür keine geeignete Variable, dann ist ArchiveADataset mit diesem Datensatz nicht verwendbar. Das sollte selten sein.
* Geben Sie das Dateiformat für die Datendateien an, die erstellt werden.
Für netzgebundene Datensätze, für NCEI, Verwendung.nc.
Für tabellarische Datensätze, für NCEI, verwenden[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)wenn es eine Option ist; andernfalls verwenden.nc.
* Geben Sie die Art der Dateiverdau für jede Datendatei und für das gesamte Archivpaket an: MD5, SHA-1 oder SHA-256. Der Dateiverdau bietet einen Weg für den Client (z.B. NCEI) zu testen, ob die Datendatei beschädigt wurde. Traditionell waren dies[.md5 Dateien](https://en.wikipedia.org/wiki/MD5), aber jetzt gibt es bessere Optionen. Für NCEI verwenden Sie SHA-256 .

Nachdem Sie alle Fragen beantwortet haben, wird ArchiveADataset:

1. Erstellen Sie eine Reihe von Anfragen an den Datensatz und die daraus resultierenden Datendateien in *BigParentDirectory* /ArchiveADataset/ *datasetID\\_Zeitstempel* /.
Für gegitterte Datensätze wird für jeden Wert der linken Dimension eine Datei vorhanden sein (z.B. Zeit) . Der Name der Datei wird dieser Wert sein (z.B. der Zeitwert) .
Für tabellarische Datensätze gibt es eine Datei für jeden Wert der ... Variable (S) . Der Name der Datei wird dieser Wert sein. Wenn es mehr als eine Variable gibt, werden die linken Variablen verwendet, um Unterverzeichnis-Namen zu machen, und die rechteste Variable wird verwendet, um die Dateinamen zu machen.
Jede Datendatei muss&lt;2GB (maximal zulässig.ncVersion 3 Dateien) .
2. Machen Sie eine Datei, die mit jeder Datendatei zusammenhängt, mit dem Verdau der Datendatei. Zum Beispiel, wenn die Datendatei 46088 ist.ncund der Verdauungstyp ist .sha256, dann wird die Verdauungsdatei den Namen 46088 haben.nc.sha256 .
3. Machen Sie eine READ\\_ME.txt-Datei mit Informationen über das Archiv, einschließlich einer Liste aller Einstellungen, die Sie für die Erstellung dieses Archivs spezifiziert.
4. Machen Sie 3 Dateien in *BigParentDirectory* /ArchiveADataset/ :
    
    * A.zipoder.tar.gzArchivdatei benannt *datasetID\\_Zeitstempel* .zip  (oder.tar.gz) mit allen inszenierten Datendateien und Verdauungsdateien. Diese Datei kann jede Größe sein, nur durch Speicherplatz begrenzt.
    * Eine Verdauungsdatei für die Archivdatei, zum Beispiel *datasetID\\_Zeitstempel* .zip.sha256.txt
    * Für den "originalen" Archivtyp, eine Textdatei benannt *datasetID\\_Zeitstempel* .zip.listOfFiles.txt (oder.tar.gz) die alle Dateien in der.zip  (oder.tar.gz) Datei.
    
Wenn Sie das Archiv für NCEI vorbereiten, sind dies die Dateien, die Sie an NCEI senden, vielleicht über[Senden2NCEI](https://www.nodc.noaa.gov/s2n/)oder[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI's Advanced Tracking and Resource Tool für Archive Collections) .
5. Löschen Sie alle inszenierten Dateien, so dass nur die Archivdatei (z.B.,.zip) , der Verdauung (z.B. .sha256.txt) des Archivs und (optional) die .listOfFiles.txt Dateien bleiben.

#### ISO 19115 .xml Metadatendateien{#iso-19115-xml-metadata-files} 
Das Archivpaket ArchiveADataset enthält nicht die Metadatendatei ISO 19115 .xml für den Datensatz. Wenn Sie eine ISO 19115-Datei für Ihren Datensatz an NCEI senden möchten, können Sie diese mit der ISO 19115 .xml-Metadatendatei senden, dieERDDAP™erstellt für den Datensatz (aberNMFSMenschen sollten die ISO 19115-Datei für ihre Datensätze von InPort erhalten, wennERDDAP™wird diese Datei nicht bereits bedienen) .

Probleme? Vorschläge? ArchiveADataset ist neu. Wenn Sie Probleme oder Vorschläge haben,[Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support).
     
