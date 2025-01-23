---
title: "ERDDAP™ Documentation"
---

## ERDDAP™Informationen{#erddap-information} 

ERDDAP™ist ein wissenschaftlicher Datenserver, der den Benutzern eine einfache, konsequente Möglichkeit gibt, Untergruppen von
gegitterte und tabellarische wissenschaftliche Datensätze in gemeinsamen Dateiformaten und Grafiken und Karten.
ERDDAP™ist eine freie und offene Quelle (Apache und Apache)  JavaServlet vonNOAA NMFS SWFSCAbteilung Umweltforschung (ERD) .

* Zu sehen/verwendenERDDAP™Installation:[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* Mit einer Installation starten[die Installationsanleitung bereitstellen](/docs/server-admin/deploy-install).
* Um Code beizutragen, siehe[Leitfaden für Programmierer](/docs/contributing/programmer-guide).


Im Folgenden finden Sie relevante Links für Fragen und wie Sie beitragen können.
* Gesprächsrunden überprüfen und Fragen stellen[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)oder[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* Überprüfung und Einreichung von Fragen[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* Um Feature-Anfragen vorzuschlagen, folgen Sie dieser Anleitung:[ERDDAPDiskussionen #93 (Kommentare) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## Suche mehrereERDDAP™S
Es gibt zwei Möglichkeiten, mehrere zu suchenERDDAP™s für Datensätze:[Suche mehrereERDDAP™S](/SearchMultipleERDDAPs.html)und[ERDDAP™Datensatz entdecken](http://erddap.com/).


## Stellen Sie Ihre eigenenERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™ein[Freie und offene Quelle](https://en.wikipedia.org/wiki/Free_and_open-source_software)Alles...Java  (servlet) , Web-Anwendung, die in einem Web-Anwendungsserver läuft (zum Beispiel Tomcat (empfohlen) , oder Jetty (es funktioniert, aber wir unterstützen es nicht) ) . Diese Seite ist meist für Menschen ("ERDDAP™Administratoren") die sich selbst einrichten wollenERDDAP™Installation auf ihrer eigenen Website.

### Warum verwendenERDDAP™Ihre Daten zu verbreiten?{#why-use-erddap-to-distribute-your-data} 

Weil der kleine Aufwand zu schaffenERDDAP™bringt viele Vorteile.

* Wenn Sie bereits einen Webservice zur Verteilung Ihrer Daten haben,
du kannst einrichtenERDDAP™Zugriff auf Ihre Daten über den vorhandenen Service.
Oder Sie können einrichtenERDDAP™Zugriff auf Ihre Daten direkt von lokalen Dateien.
* Für jeden Datensatz müssen Sie nur einen kleinen Teil von XML schreiben, um zu sagenERDDAP™Zugriff auf den Datensatz.
* Sobald SieERDDAP™Ihre Daten bedienen, können Endbenutzer:
    * Fordern Sie die Daten auf verschiedene Weise an (DAP,WMS, und mehr in Zukunft) .
    * Erhalten Sie die Datenantwort in verschiedenen Dateiformaten. (Das ist wahrscheinlich der größte Grund&#33;) 
    * Grafiken und Karten erstellen. (Jeder mag schöne Bilder.) 
    * Erstellen Sie andere nützliche und interessante Dinge oben aufERDDAPWebdienste -- siehe die[Awesome ERDDAPTM](https://github.com/IrishMarineInstitute/awesome-erddap)Liste der großartigenERDDAP-bezogene Projekte.

Sie können[Anpassung](/docs/server-admin/deploy-install#customize)IhrERDDAP's Aussehen soERDDAP™reflektiert Ihre Organisation und passt in den Rest Ihrer Website.

## Ist das Installationsverfahren hart? Kann ich das tun?{#is-the-installation-procedure-hard-can-i-do-it} 

Die erste Installation dauert einige Zeit, aber es ist nicht sehr schwer. Du kannst es tun. Wenn du feststeckst, melde mich anerd dot data at noaa dot gov. Ich werde dir helfen.
Oder du kannst mitmachen[ERDDAP™Google Group / Mailingliste](https://groups.google.com/g/erddap)und posten Sie Ihre Frage dort.

## Wer benutztERDDAP™ {#who-uses-erddap} 

ERDDAP™wurde von etwa 100 Organisationen in mindestens 17 Ländern installiert

 (Australien, Belgien, Kanada, China, Frankreich, Indien, Irland, Italien, Neuseeland, Russland, Südafrika, Spanien, Sri Lanka, Schweden, Thailand, UK, USA) , einschließlich:

*   [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)  (Asia-Pacific Data-Research Center, International Pacific Research Center) an der Universität Hawaii (UH)  
*   [BCO-DMO bei WHOI](https://erddap.bco-dmo.org/erddap/index.html)  (Biologische und chemische Ozeanographie Datenverwaltung bei Woods Hole Oceanographic Institution)  
*   [KaninchenERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (Canadian Watershed Information Network) im Zentrum für Erdbeobachtung Wissenschaft (CEOS) , Universität Manitoba
*   [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)  (Coastal Data Information Program bei UCSD)  
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)  (Nationaler Forschungsrat von Italien, Institut für Polarwissenschaften)  
* CSIRO und IMOS (Australiens Organisation für wissenschaftliche und industrielle Forschung und das integrierte Meeresbeobachtungssystem) 
*   [DIVER (NOAAODER) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAABüro für Antwort und Wiederherstellung)  
*   [EMODnet Physik](https://erddap.emodnet-physics.eu/erddap/index.html)  (Das Europäische Meeresbeobachtungs- und Datennetz -- Physik)  
*   [GoMRI](https://erddap.griidc.org/erddap/index.html)  (Golf von Mexiko Forschungsinitiative)  
*   [Hakai Institut](https://catalogue.hakai.org/erddap/index.html)  (Das Hakai Institut an der Zentralküste von British Columbia, Kanada) 
*   [High School Technology Services](https://myhsts.org), die Codierung und Technologie-Ausbildung für Studenten und Erwachsene bietet
*   [ICHE](https://erddap.ichec.ie/erddap/index.html)  (Irisches Zentrum für High-End Computing) 
*   [INCOIS](https://erddap.incois.gov.in/erddap/index.html)  (Indian National Centre for Ocean Information Services)  
* IRD (Institut de Recherche pour le Développement, Frankreich)   
KN-Code (Centre National de la Recherche Scientifique, Frankreich)   
HERSTELLUNG (Universität Pierre und Marie CURIE, Paris, Frankreich)   
UCAD (Universität Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger -- Saint-Louis du Sénégal)   
UFHB (Universität Félix HOUPHOUËT-BOIGNY, Abidjan, Côte d'Ivoire)   
IPSL (Institut Pierre Simon Laplace des sciences de l'environnement, Paris, Frankreich)   
LMI ECLAIRS (Laboratoire Mixing International «Etude du Climat en Afrique de l’Ouest et de ses Interactions avec l’Environnement Régional, et appui aux services climatiques») 
* GFS (Europäische Kommission - Gemeinsame Forschungsstelle, Europäische Union) 
*   [Das Meeresinstitut](https://erddap.marine.ie/erddap/index.html)  (Irland)  
* Marine Instruments S.A. (Spanien) 
* NGI (National Computational Infrastructure von Australien) 
*   [NOAAKüstenwache](https://coastwatch.noaa.gov/erddap/index.html)  (Zentral)  
*   [NOAAKüstenwache CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (Karibik/ Golf von Mexiko Node)  
*   [NOAACôte-Watch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (Große Seen Node)  
*   [NOAAKüsteWatch Westküste](https://coastwatch.pfeg.noaa.gov/erddap/index.html)die mit und mit
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (Abteilung UmweltforschungSWFSCvonNMFS) 
*   [NOAAIOOS Sensoren](https://erddap.sensors.ioos.us/erddap/index.html)  (Integriertes Ozeanbeobachtungssystem)  
*   [NOAAIOOS CeNCOSicherheit](https://erddap.axiomdatascience.com/erddap/index.html)  (Zentral- und Nordkalifornien Ozeanbeobachtungssystem, betrieben von Axiom Data Science)  
*   [NOAAIOOS GCOOS Atmosphärische und ozeanographische Daten: Beobachtungssystem](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOOS Atmosphärische und ozeanographische Daten: Historische Sammlungen](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAIOOS GCOOS Biologische und Sozioökonomie](https://gcoos4.tamu.edu/erddap/index.html)  (Golf Coast Ocean Observing System) 
*   [NOAAIOOS NERACOOS](http://www.neracoos.org/erddap/index.html)  (Northeastern Regional Association of Coastal and Ocean Observing Systems)  
*   [NOAAIOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)  (National Glider Rechenzentrum)  
*   NOAAIOOS NANOOS (Northwest Association of Networked Ocean Observing Systems) 
*   [NOAAIOOS PacIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (Pazifische Inseln Ozean Beobachtungssystem) an der Universität Hawaii (UH)  
*   NOAAIOOS SCCOOS (Southern California Coastal Ocean Observing System) 
*   [NOAAIOOS SECOORA](https://erddap.secoora.org/erddap/index.html)  (Südostküsten-Ozean mit regionaler Assoziation)  
*   [NOAANZEI](https://www.ncei.noaa.gov/erddap/index.html)  (Nationale Zentren für Umweltinformationen)    
*   NOAANGDC STP (National Geophysikalisch Datenzentrum, Solar -- Terrestrische Physik) 
*   NOAA NMFSNEFSC (Forschungszentrum für Fischerei im Nordosten) 
*   [NOAANOS CO-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (Zentrum für Operationelle ozeanographische Produkte und Dienstleistungen)  
*   [NOAAOSMC](http://osmc.noaa.gov/erddap/index.html)  (Beobachtungssystem Monitoring Center)  
*   [NOAAZIELE](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (Fischereiwissenschaftliches Zentrum für Pazifik)  
*   [NOAATEIL](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAAPolarWatch](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAUAF](https://upwell.pfeg.noaa.gov/erddap/index.html)  (Einheitlicher Zugriffsrahmen)  
*   [Ocean Networks Kanada](http://dap.onc.uvic.ca/erddap/index.html) 
*   [Ocean Tracking Network](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / Alle Daten](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (Ocean Observatories Initiative)   
OOI / Unfähige Daten
* Princeton, Hydrometeorologie Forschungsgruppe
* R.Tech Engineering, Frankreich
*   [Rutgers University, Institut für Meeres- und Küstenwissenschaften](https://tds.marine.rutgers.edu/erddap/index.html)  
* San Francisco Estuary Institute
*   [Scripps Institution der Ozeanographie, Spray Unterwasser Gliders](https://spraydata.ucsd.edu/erddap/index.html) 
*   [Smart Atlantic](https://www.smartatlantic.ca/erddap/index.html)Gedenkuniversität Neufundland
* Südafrikanisches Umweltbeobachtungsnetz
* Spyglass Technologies
* Stanford University, Hopkins Marine Station
*   [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html)  (International Oceanographic und Information Datenaustausch)  
*   [University of British Columbia, Erde, Ozean & Atmosphärische Abteilung Wissenschaft](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [University of California in Davis, Bodega Marine Laboratory](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [Universität Delaware, Satellitenempfangsstation](https://basin.ceoe.udel.edu/erddap/index.html) 
* Universität Washington, Angewandtes Physiklabor
*   [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)  (Küsten- und Meeresgeologieprogramm)  
*   [VORT](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (Stimme des Ozeans, Schweden)  

Dies ist eine Liste von nur einigen der Organisationen, woERDDAP™wurde von einer einzelnen oder einer Gruppe installiert. Es bedeutet nicht, dass die Person, die Gruppe oder die Organisation empfiehlt oder unterstütztERDDAP.

### ERDDAP™wird empfohlenNOAAund CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAADatenschutzrichtlinie](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)einschließlichERDDAP™in seiner Liste der empfohlenen Datenserver für die Nutzung durch Gruppen innerhalbNOAA.ERDDAP™in Abschnitt 4.2.3 der
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Forschungsdatenmanagement Best Practices Guide) &#33; ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) vom Centre National de la Recherche Scientifique (KN-Code) in Frankreich.

## Slide Shows{#slide-shows} 

Hier sind einige PowerPoint-Diagramme und Dokumente, die Bob Simons erstellt hat bezogen aufERDDAP.

 **DISCLAIMER: Die in diesen Dokumenten geäußerten Inhalte und Meinungen sind die persönlichen Meinungen von Bob Simons und spiegeln nicht unbedingt jede Position der Regierung oder der Regierung wider.National Oceanic and Atmospheric Administration.** 

Die vier wichtigsten Dokumente:

*   [Die HaupteinleitungERDDAP™  (Version 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx).
Sie können auch[Dieses Video von Bob gibt dieses Gespräch![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4).
*   [A One Page BeschreibungERDDAP™  (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAP: Schwere Lasten, Gitter, Cluster, Föderationen und Cloud Computing](/docs/server-admin/scaling)
*   [Bobs Richtlinien für Datenverteilungssysteme](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

Weitere Präsentationen:

*   [2020 EDM: Neue Features inERDDAP™V2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 DMIT: Datenaufnahme](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (Oder[Dieses Video von Bob gibt dieses Gespräch](https://www.youtube.com/watch?v=9ArYxgwON2k).) 
*   [2019 IOOS DMAC: Neue FeaturesERDDAP™V2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 Sommer ESIP: EinsetzenERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 Sommer ESIP: JSON-Unterstützung imERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: Ein verteiltes System von Web Services (Schneller, einfacher, weniger teuer)   (Oder warum ich vor 4 Jahren glücklich war.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EDM:ERDDAP™2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: Neue Features inERDDAP™für Bild-, Audio- und Videodaten](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF undERDDAP™Lösungen für die Datenintegration](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: Eine schnelle EinführungERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM und 2017 IOOS: Neu oder wenig bekanntERDDAP™Eigenschaften (für Benutzer) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM und 2017 IOOS: Neu oder wenig bekanntERDDAP™Eigenschaften (für Administratoren) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017 EDM: EML, KNB undERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 EDM: Wie gelangen Daten von der Quelle zum Endbenutzer? Alte Schule gegen New School](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 Sommer ESIP: Das große Bild: PARR,OPeNDAP,ERDDAP™, und Datenverteilung](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016 EDM: Eins und Fertig](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 Gov API: Nächste Generation Datenserver](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015 Sommer ESIP: Tabular Aggregation](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 EDM: Bob's Do's and Don't for Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM: Die ideale Benutzeroberfläche](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014 Sommer ESIP: Tabellendaten](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: Behandeln Sie nicht In-Situ und Tabular-Daten wie Gridded Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDM: Mehr mit weniger tun](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: Richtlinien für Datenverteilungssysteme](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

Präsentationen von anderen Menschen:

*   [Ein FAIR-basiertes Tool zur Verbesserung des globalen Datenaustauschs![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
von Kevin O'Brien im globalen Ozeanbeobachtungssystem (ZUSAMMENFASSUNG) Webinar / Koordinationsgruppe Beobachtung (OCG) Serie / 1, 12. November 2020.
*   [Erstellen Sie Ihre eigene Weather AppNOAAOpen Data und Jupyter Notebooks![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
von Filipe Fernandes und Rich Signell auf der SciPy 2018, 13. Juli 2018.
*   [Verwendung des OOIERDDAP![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
von Rich Signell, Februar 2018.
*   [ESIP Tech Dive: "ERDDAPBlitzgespräche"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
Acht 5-Minute Gespräche über interessante Dinge, die Menschen mitERDDAPvon Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton und Eli Hunter präsentierten als ESIP Tech Dive am 31. August 2017.
*   [VerwendungERDDAP™Zugriff auf Tabulardaten![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
von Rich Signell, August 2015.
*   [Test mitERDDAP™für Blue Carbon Daten![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
von Rich Signell, August 2015.
*   [Verwendung von Daten ausERDDAP™inNOAA'GNOMESoftware![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM).
In diesem Video, Rich Signell Downloads Ozeanströme Prognosedaten vonERDDAP™eine toxische Verschüttung im Ozean mit[NOAA'GNOMESoftware](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (in 5 Minuten&#33;) . (Ein winziger Fehler im Video: bei der Suche nach Datensätzen verwenden Sie nicht UND zwischen Suchbegriffen. Es ist implizit.) Von Rich Signell, 8. April 2011.
