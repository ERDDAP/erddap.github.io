---
title: "ERDDAP™ Documentation"
---
## Letzter Beitrag ERDDAP™ Version{#latest-erddap-version} 

2.29.0, siehe die [Änderungen der Dokumentation](/changes#version-2290) und [Sie können](https://github.com/ERDDAP/erddap/releases/tag/v2.29.0) .

##  ERDDAP™ Informationen{#erddap-information} 

 ERDDAP™ ist ein wissenschaftlicher Datenserver, der den Benutzern eine einfache, konsequente Möglichkeit gibt, Untergruppen von
gegitterte und tabellarische wissenschaftliche Datensätze in gemeinsamen Dateiformaten und Grafiken und Karten.
 ERDDAP™ ist eine freie und offene Quelle (Apache und Apache)   Java Servlet von NOAA   NMFS   SWFSC Abteilung Umweltforschung ( ERD ) .

* Zu sehen/verwenden ERDDAP™ Installation: [https://coastwatch.pfeg.noaa.gov/erddap/index.html](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 
* Mit einer Installation starten [die Installationsanleitung bereitstellen](/docs/server-admin/deploy-install) .
* Um Code beizutragen, siehe [Leitfaden für Programmierer](/docs/contributing/programmer-guide) .


Im Folgenden finden Sie relevante Links für Fragen und wie Sie beitragen können.
* Gesprächsrunden überprüfen und Fragen stellen [https://groups.google.com/g/erddap](https://groups.google.com/g/erddap) oder [https://github.com/erddap/erddap/discussions](https://github.com/erddap/erddap/discussions) 
* Überprüfung und Einreichung von Fragen [https://github.com/erddap/erddap/issues](https://github.com/erddap/erddap/issues) 
* Um Feature-Anfragen vorzuschlagen, folgen Sie dieser Anleitung: [ ERDDAP Diskussionen #93 (Kommentare) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427) 


## Suche mehrere ERDDAP™ S
Es gibt zwei Möglichkeiten, mehrere zu suchen ERDDAP™ s für Datensätze: [Suche mehrere ERDDAP™ S](/SearchMultipleERDDAPs.html) und [ ERDDAP™ Datensatz entdecken](http://erddap.com/) .


## Stellen Sie Ihre eigenen ERDDAP™  {#set-up-your-own-erddap} 

 ERDDAP™ ein [Freie und offene Quelle](https://en.wikipedia.org/wiki/Free_and_open-source_software) Alles... Java   (servlet) , Web-Anwendung, die in einem Web-Anwendungsserver läuft (zum Beispiel Tomcat (empfohlen) , oder Jetty (es funktioniert, aber wir unterstützen es nicht) ) . Diese Seite ist meist für Menschen (" ERDDAP™ Administratoren") die sich selbst einrichten wollen ERDDAP™ Installation auf ihrer eigenen Website.

Mit einer Installation starten [die Installationsanleitung bereitstellen](/docs/server-admin/deploy-install) .

### Warum verwenden ERDDAP™ Ihre Daten zu verbreiten?{#why-use-erddap-to-distribute-your-data} 

Weil der kleine Aufwand zu schaffen ERDDAP™ bringt viele Vorteile.

* Wenn Sie bereits einen Webservice zur Verteilung Ihrer Daten haben,
du kannst einrichten ERDDAP™ Zugriff auf Ihre Daten über den vorhandenen Service.
Oder Sie können einrichten ERDDAP™ Zugriff auf Ihre Daten direkt von lokalen Dateien.
* Für jeden Datensatz müssen Sie nur einen kleinen Teil von XML schreiben, um zu sagen ERDDAP™ Zugriff auf den Datensatz.
* Sobald Sie ERDDAP™ Ihre Daten bedienen, können Endbenutzer:
    * Fordern Sie die Daten auf verschiedene Weise an ( DAP , WMS , und mehr in Zukunft) .
    * Erhalten Sie die Datenantwort in verschiedenen Dateiformaten. (Das ist wahrscheinlich der größte Grund&#33;) 
    * Grafiken und Karten erstellen. (Jeder mag schöne Bilder.) 
    * Erstellen Sie andere nützliche und interessante Dinge oben auf ERDDAP Webdienste -- siehe die [ Awesome ERDDAP TM](https://github.com/IrishMarineInstitute/awesome-erddap) Liste der großartigen ERDDAP -bezogene Projekte.

Sie können [Anpassung](/docs/server-admin/deploy-install#customize) Ihr ERDDAP 's Aussehen so ERDDAP™ reflektiert Ihre Organisation und passt in den Rest Ihrer Website.

## Ist das Installationsverfahren hart? Kann ich das tun?{#is-the-installation-procedure-hard-can-i-do-it} 

Die erste Installation dauert einige Zeit, aber es ist nicht sehr schwer. Du kannst es tun. Wenn du feststeckst, melde mich an erd dot data at noaa dot gov . Ich werde dir helfen.
Oder du kannst mitmachen [ ERDDAP™ Google Group / Mailingliste](https://groups.google.com/g/erddap) und posten Sie Ihre Frage dort.

## Wer benutzt ERDDAP™  {#who-uses-erddap} 

 ERDDAP™ wurde von etwa 100 Organisationen in mindestens 17 Ländern installiert

 (Australien, Belgien, Kanada, China, Frankreich, Indien, Irland, Italien, Neuseeland, Russland, Südafrika, Spanien, Sri Lanka, Schweden, Thailand, UK, USA) , einschließlich:

*    [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)   (Asia-Pacific Data-Research Center, International Pacific Research Center) an der Universität Hawaii (UH)  
*    [BCO-DMO bei WHOI](https://erddap.bco-dmo.org/erddap/index.html)   (Biologische und chemische Ozeanographie Datenverwaltung bei Woods Hole Oceanographic Institution)  
*    [Kaninchen ERDDAP™ ](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)   (Canadian Watershed Information Network) im Zentrum für Erdbeobachtung Wissenschaft (CEOS) , Universität Manitoba
*    [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)   (Coastal Data Information Program bei UCSD)  
*    [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)   (Nationaler Forschungsrat von Italien, Institut für Polarwissenschaften)  
* CSIRO und IMOS (Australiens Organisation für wissenschaftliche und industrielle Forschung und das integrierte Meeresbeobachtungssystem) 
*    [DIVER ( NOAA ODER) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)   ( NOAA Büro für Antwort und Wiederherstellung)  
*    [EMODnet Physik](https://erddap.emodnet-physics.eu/erddap/index.html)   (Das Europäische Meeresbeobachtungs- und Datennetz -- Physik)  
*    [GoMRI](https://erddap.griidc.org/erddap/index.html)   (Golf von Mexiko Forschungsinitiative)  
*    [Hakai Institut](https://catalogue.hakai.org/erddap/index.html)   (Das Hakai Institut an der Zentralküste von British Columbia, Kanada) 
*    [High School Technology Services](https://myhsts.org) , die Codierung und Technologie-Ausbildung für Studenten und Erwachsene bietet
*    [ICHE](https://erddap.ichec.ie/erddap/index.html)   (Irisches Zentrum für High-End Computing) 
*    [I NCO IS](https://erddap.incois.gov.in/erddap/index.html)   (Indian National Centre for Ocean Information Services)  
* IRD (Institut de Recherche pour le Développement, Frankreich)   
KN-Code (Centre National de la Recherche Scientifique, Frankreich)   
HERSTELLUNG (Universität Pierre und Marie CURIE, Paris, Frankreich)   
UCAD (Universität Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger -- Saint-Louis du Sénégal)   
UFHB (Universität Félix HOUPHOUËT-BOIGNY, Abidjan, Côte d'Ivoire)   
IPSL (Institut Pierre Simon Laplace des sciences de l'environnement, Paris, Frankreich)   
LMI ECLAIRS (Laboratoire Mixing International «Etude du Climat en Afrique de l’Ouest et de ses Interactions avec l’Environnement Régional, et appui aux services climatiques») 
* GFS (Europäische Kommission - Gemeinsame Forschungsstelle, Europäische Union) 
*    [Das Meeresinstitut](https://erddap.marine.ie/erddap/index.html)   (Irland)  
* Marine Instruments S.A. (Spanien) 
* NGI (National Computational Infrastructure von Australien) 
*    [ NOAA Küstenwache](https://coastwatch.noaa.gov/erddap/index.html)   (Zentral)  
*    [ NOAA Küstenwache CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)   (Karibik/ Golf von Mexiko Node)  
*    [ NOAA Côte-Watch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)   (Große Seen Node)  
*    [ NOAA KüsteWatch Westküste](https://coastwatch.pfeg.noaa.gov/erddap/index.html) die mit und mit
     [ NOAA   ERD ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (Abteilung Umweltforschung SWFSC von NMFS ) 
*    [ NOAA IOOS Sensoren](https://erddap.sensors.ioos.us/erddap/index.html)   (Integriertes Ozeanbeobachtungssystem)  
*    [ NOAA IOOS Ce NCO Sicherheit](https://erddap.axiomdatascience.com/erddap/index.html)   (Zentral- und Nordkalifornien Ozeanbeobachtungssystem, betrieben von Axiom Data Science)  
*    [ NOAA IOOS GCOOS Atmosphärische und ozeanographische Daten: Beobachtungssystem](https://erddap.gcoos.org/erddap/index.html)   
     [ NOAA IOOS GCOOS Atmosphärische und ozeanographische Daten: Historische Sammlungen](https://gcoos5.geos.tamu.edu/erddap/index.html)   
     [ NOAA IOOS GCOOS Biologische und Sozioökonomie](https://gcoos4.tamu.edu/erddap/index.html)   (Golf Coast Ocean Observing System) 
*    [ NOAA IOOS NERACOOS](http://www.neracoos.org/erddap/index.html)   (Northeastern Regional Association of Coastal and Ocean Observing Systems)  
*    [ NOAA IOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)   (National Glider Rechenzentrum)  
*    NOAA IOOS NANOOS (Northwest Association of Networked Ocean Observing Systems) 
*    [ NOAA IOOS PacIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)   (Pazifische Inseln Ozean Beobachtungssystem) an der Universität Hawaii (UH)  
*    NOAA IOOS SCCOOS (Southern California Coastal Ocean Observing System) 
*    [ NOAA IOOS SECOORA](https://erddap.secoora.org/erddap/index.html)   (Südostküsten-Ozean mit regionaler Assoziation)  
*    [ NOAA NZEI](https://www.ncei.noaa.gov/erddap/index.html)   (Nationale Zentren für Umweltinformationen)    
*    NOAA NGDC STP (National Geophysikalisch Datenzentrum, Solar -- Terrestrische Physik) 
*    NOAA   NMFS NEFSC (Forschungszentrum für Fischerei im Nordosten) 
*    [ NOAA NOS CO-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)   (Zentrum für Operationelle ozeanographische Produkte und Dienstleistungen)  
*    [ NOAA OSMC](http://osmc.noaa.gov/erddap/index.html)   (Beobachtungssystem Monitoring Center)  
*    [ NOAA ZIELE](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)   (Fischereiwissenschaftliches Zentrum für Pazifik)  
*    [ NOAA TEIL](https://data.pmel.noaa.gov/pmel/erddap/index.html) 
*    [ NOAA PolarWatch](https://polarwatch.noaa.gov/erddap/index.html) 
*    [ NOAA UAF](https://upwell.pfeg.noaa.gov/erddap/index.html)   (Einheitlicher Zugriffsrahmen)  
*    [Ocean Networks Kanada](http://dap.onc.uvic.ca/erddap/index.html)  
*    [Ocean Tracking Network](https://members.oceantrack.org/erddap/index.html)  
*    [OOI / Alle Daten](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)   (Ocean Observatories Initiative)   
OOI / Unfähige Daten
* Princeton, Hydrometeorologie Forschungsgruppe
* R.Tech Engineering, Frankreich
*    [Rutgers University, Institut für Meeres- und Küstenwissenschaften](https://tds.marine.rutgers.edu/erddap/index.html)   
* San Francisco Estuary Institute
*    [Scripps Institution der Ozeanographie, Spray Unterwasser Gliders](https://spraydata.ucsd.edu/erddap/index.html)  
*    [Smart Atlantic](https://www.smartatlantic.ca/erddap/index.html) Gedenkuniversität Neufundland
* Südafrikanisches Umweltbeobachtungsnetz
* Spyglass Technologies
* Stanford University, Hopkins Marine Station
*    [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html)   (International Oceanographic und Information Datenaustausch)  
*    [University of British Columbia, Erde, Ozean & Atmosphärische Abteilung Wissenschaft](https://salishsea.eos.ubc.ca/erddap/index.html)  
*    [University of California in Davis, Bodega Marine Laboratory](http://bmlsc.ucdavis.edu:8080/erddap/index.html)  
*    [Universität Delaware, Satellitenempfangsstation](https://basin.ceoe.udel.edu/erddap/index.html)  
* Universität Washington, Angewandtes Physiklabor
*    [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)   (Küsten- und Meeresgeologieprogramm)  
*    [VORT](https://erddap.observations.voiceoftheocean.org/erddap/index.html)   (Stimme des Ozeans, Schweden)  

Dies ist eine Liste von nur einigen der Organisationen, wo ERDDAP™ wurde von einer einzelnen oder einer Gruppe installiert. Es bedeutet nicht, dass die Person, die Gruppe oder die Organisation empfiehlt oder unterstützt ERDDAP .

###  ERDDAP™ wird empfohlen NOAA und CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
 [ NOAA Datenschutzrichtlinie](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) einschließlich ERDDAP™ in seiner Liste der empfohlenen Datenserver für die Nutzung durch Gruppen innerhalb NOAA . ERDDAP™ in Abschnitt 4.2.3 der
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Forschungsdatenmanagement Best Practices Guide) &#33; (https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales) vom Centre National de la Recherche Scientifique (KN-Code) in Frankreich.

## Slide Shows{#slide-shows} 

Hier sind einige PowerPoint-Diagramme und Dokumente, die Bob Simons erstellt hat bezogen auf ERDDAP .

 **DISCLAIMER: Die in diesen Dokumenten geäußerten Inhalte und Meinungen sind die persönlichen Meinungen von Bob Simons und spiegeln nicht unbedingt jede Position der Regierung oder der Regierung wider. National Oceanic and Atmospheric Administration .** 

Die vier wichtigsten Dokumente:

*    [Die Haupteinleitung ERDDAP™   (Version 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx) .
Sie können auch [Dieses Video von Bob gibt dieses Gespräch![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4) .
*    [A One Page Beschreibung ERDDAP™   (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf) 
*    [ ERDDAP : Schwere Lasten, Gitter, Cluster, Föderationen und Cloud Computing](/docs/server-admin/scaling) 
*    [Bobs Richtlinien für Datenverteilungssysteme](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) 

Weitere Präsentationen:

*    [2020 EDM: Neue Features in ERDDAP™ V2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx) 
*    [2020-05-19 DMIT: Datenaufnahme](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)   (Oder [Dieses Video von Bob gibt dieses Gespräch](https://www.youtube.com/watch?v=9ArYxgwON2k) .) 
*    [2019 IOOS DMAC: Neue Features ERDDAP™ V2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx) 
*    [2018 Sommer ESIP: Einsetzen ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx) 
*    [2018 Sommer ESIP: JSON-Unterstützung im ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx) 
*    [2018 EDM: Ein verteiltes System von Web Services (Schneller, einfacher, weniger teuer)   (Oder warum ich vor 4 Jahren glücklich war.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx) 
*    [2018 EDM: ERDDAP™ 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx) 
*    [2018 EDM: Neue Features in ERDDAP™ für Bild-, Audio- und Videodaten](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx) 
*    [2018 EDM: UAF und ERDDAP™ Lösungen für die Datenintegration](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx) 
*    [2017 EDM: Eine schnelle Einführung ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx) 
*    [2017 EDM und 2017 IOOS: Neu oder wenig bekannt ERDDAP™ Eigenschaften (für Benutzer) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx) 
*    [2017 EDM und 2017 IOOS: Neu oder wenig bekannt ERDDAP™ Eigenschaften (für Administratoren) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx) 
*    [2017 EDM: EML, KNB und ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx) 
*    [2017 EDM: Wie gelangen Daten von der Quelle zum Endbenutzer? Alte Schule gegen New School](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx) 
*    [2016 Sommer ESIP: Das große Bild: PARR, OPeNDAP , ERDDAP™ , und Datenverteilung](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx) 
*    [2016 EDM: Eins und Fertig](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx) 
*    [2016 Gov API: Nächste Generation Datenserver](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx) 
*    [2015 Sommer ESIP: Tabular Aggregation](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx) 
*    [2014 EDM: Bob's Do's and Don't for Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx) 
*    [2014 EDM: Die ideale Benutzeroberfläche](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx) 
*    [2014 Sommer ESIP: Tabellendaten](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx) 
*    [2013: Behandeln Sie nicht In-Situ und Tabular-Daten wie Gridded Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html) 
*    [2013 EDM: Mehr mit weniger tun](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt) 
*    [2012 EDM: Richtlinien für Datenverteilungssysteme](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt) 

Präsentationen von anderen Menschen:

*    [Ein FAIR-basiertes Tool zur Verbesserung des globalen Datenaustauschs![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)   
von Kevin O'Brien im globalen Ozeanbeobachtungssystem (ZUSAMMENFASSUNG) Webinar / Koordinationsgruppe Beobachtung (OCG) Serie / 1, 12. November 2020.
*    [Erstellen Sie Ihre eigene Weather App NOAA Open Data und Jupyter Notebooks![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)   
von Filipe Fernandes und Rich Signell auf der SciPy 2018, 13. Juli 2018.
*    [Verwendung des OOI ERDDAP ![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)   
von Rich Signell, Februar 2018.
*    [ESIP Tech Dive: " ERDDAP Blitzgespräche"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)   
Acht 5-Minute Gespräche über interessante Dinge, die Menschen mit ERDDAP von Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton und Eli Hunter präsentierten als ESIP Tech Dive am 31. August 2017.
*    [Verwendung ERDDAP™ Zugriff auf Tabulardaten![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)   
von Rich Signell, August 2015.
*    [Test mit ERDDAP™ für Blue Carbon Daten![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)   
von Rich Signell, August 2015.
*    [Verwendung von Daten aus ERDDAP™ in NOAA ' GNOME Software![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM) .
In diesem Video, Rich Signell Downloads Ozeanströme Prognosedaten von ERDDAP™ eine toxische Verschüttung im Ozean mit [ NOAA ' GNOME Software](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)   (in 5 Minuten&#33;) . (Ein winziger Fehler im Video: bei der Suche nach Datensätzen verwenden Sie nicht UND zwischen Suchbegriffen. Es ist implizit.) Von Rich Signell, 8. April 2011.
