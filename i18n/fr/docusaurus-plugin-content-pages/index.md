---
title: "ERDDAP™ Documentation"
---

## ERDDAP™Informations{#erddap-information} 

ERDDAP™est un serveur de données scientifiques qui donne aux utilisateurs un moyen simple et cohérent de télécharger des sous-ensembles de
les ensembles de données scientifiques maillés et tabulaires dans des formats de fichiers communs et de faire des graphiques et des cartes.
ERDDAP™est une source libre et ouverte (Apache et comme Apache)  JavaServette deNOAA NMFS SWFSCDivision de la recherche environnementale (ERD) .

* Pour voir/utiliser unERDDAP™installation:[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* Pour commencer avec une installation lire[le guide d'installation de déploiement](/docs/server-admin/deploy-install).
* Pour contribuer code voir la[guide du programmeur](/docs/contributing/programmer-guide).


Vous trouverez ci-dessous des liens pertinents pour poser des questions et comment contribuer.
* Examiner les conversations et poser des questions à[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)ou à[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* Examiner et soumettre les questions[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* Pour proposer des demandes de fonctionnalités, suivez les directives suivantes :[ERDDAPDébat n° 93 (commentaire) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## Recherche multipleERDDAP™s
Il y a deux façons de rechercher plusieursERDDAP™s pour les ensembles de données:[Recherche multipleERDDAP™s](/SearchMultipleERDDAPs.html)et[ERDDAP™Découverte des données](http://erddap.com/).


## Mettez en place votre propreERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™est[Source libre et ouverte](https://en.wikipedia.org/wiki/Free_and_open-source_software)Tous...Java  (servette) , application web qui fonctionne dans un serveur d'application web (Par exemple, Tomcat (recommandé) , ou Jetty (Ça marche, mais on ne le soutient pas.) ) . Cette page Web est principalement pour les gens ("ERDDAP™administrateurs") qui veulent créer leur propreERDDAP™installation sur leur propre site Web.

### Pourquoi utiliserERDDAP™pour distribuer vos données?{#why-use-erddap-to-distribute-your-data} 

Parce que le petit effort de mise en placeERDDAP™apporte de nombreux avantages.

* Si vous avez déjà un service web pour la distribution de vos données,
Vous pouvez configurerERDDAP™pour accéder à vos données via le service existant.
Ou, vous pouvez installerERDDAP™pour accéder à vos données directement à partir de fichiers locaux.
* Pour chaque jeu de données, vous n'avez qu'à écrire un petit morceau de XML à direERDDAP™comment accéder à l'ensemble de données.
* Une fois que vous avezERDDAP™au service de vos données, les utilisateurs finaux peuvent:
    * Demander les données de différentes manières (DAP,WMS, et plus dans le futur) .
    * Obtenez la réponse de données dans différents formats de fichiers. (C'est probablement la plus grande raison &#33;) 
    * Faire des graphiques et des cartes. (Tout le monde aime les jolies photos.) 
    * Construire d'autres choses utiles et intéressantes sur le dessus deERDDAPles services web - voir[Awesome ERDDAPTM](https://github.com/IrishMarineInstitute/awesome-erddap)liste de génialERDDAP- les projets liés.

Vous pouvez[Personnaliser](/docs/server-admin/deploy-install#customize)VotreERDDAPl'apparence siERDDAP™reflète votre organisation et s'intègre avec le reste de votre site Web.

## La procédure d'installation est-elle dure? Je peux le faire ?{#is-the-installation-procedure-hard-can-i-do-it} 

L'installation initiale prend un certain temps, mais ce n'est pas très difficile. Tu peux le faire. Si vous êtes coincé, envoyez-moi un mail àerd dot data at noaa dot gov. Je vais t'aider.
Ou, vous pouvez rejoindre le[ERDDAP™Groupe Google / Liste d'envoi](https://groups.google.com/g/erddap)et postez votre question là.

## Qui utiliseERDDAP™ {#who-uses-erddap} 

ERDDAP™a été installé par environ 100 organisations dans au moins 17 pays

 (Afrique du Sud, Australie, Belgique, Canada, Chine, Espagne, France, Inde, Irlande, Italie, Nouvelle-Zélande, Russie, Sri Lanka, Suède, Thaïlande, Royaume-Uni, États-Unis) , y compris:

*   [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)  (Centre de recherche sur les données Asie-Pacifique, Centre international de recherche du Pacifique) à l ' Université d ' Hawaii (UH)  
*   [BCO-DMO à WHI](https://erddap.bco-dmo.org/erddap/index.html)  (Océanographie biologique et chimique Bureau de gestion des données à Woods Hole Établissement)  
*   [CanWINERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (Réseau canadien d'information sur les bassins hydrographiques) au Centre pour les sciences de l ' observation de la Terre (CEOS) , Université du Manitoba
*   [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)  (Programme d'information sur les données côtières à l'UCSD)  
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)  (Conseil national de recherches d'Italie, Institut des sciences polaires)  
* CSIRO et IMOS (L'Organisation australienne de recherche scientifique et industrielle du Commonwealth et le Système intégré d'observation marine) 
*   [DIVER (NOAAORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAABureau des interventions et de la restauration)  
*   [EMODnet Physique](https://erddap.emodnet-physics.eu/erddap/index.html)  (Le Réseau européen d'observation et de données marines -- Physique)  
*   [GOMRI](https://erddap.griidc.org/erddap/index.html)  (Initiative de recherche sur le golfe du Mexique)  
*   [Institut Hakai](https://catalogue.hakai.org/erddap/index.html)  (Institut Hakai sur la côte centrale de la Colombie-Britannique, Canada) 
*   [Services technologiques des écoles secondaires](https://myhsts.org), qui offre un codage et une formation technologique pour les étudiants et les adultes
*   [ICHEC](https://erddap.ichec.ie/erddap/index.html)  (Centre irlandais de calcul haut de gamme) 
*   [AutresNCODES](https://erddap.incois.gov.in/erddap/index.html)  (Centre national indien des services d ' information océanique)  
* IRD (Institut de Recherche pour le Développement, France)   
CNRS (Centre National de la Recherche Scientifique, France)   
UPMC (Université Pierre et Marie CURIE, Paris, France)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger -- Saint-Louis du Sénégal)   
UFHB (Université Félix HOUPHOUËT-BOIGNY, Abidjan, Côte d'Ivoire)   
IPSL (Institut Pierre Simon Laplace des sciences de l'environnement, Paris, France)   
LMI ECLAIRS (Laboratoire Mixte International «Étude du Climat en Afrique de l'Ouest et de ses Interactions avec l'Environnement Régional, et adapté aux services climatiques») 
* CCR (Commission européenne - Centre commun de recherche, Union européenne) 
*   [L'Institut marin](https://erddap.marine.ie/erddap/index.html)  (Belgique)  
* Instruments marins S.A. (Espagne) 
* NIC (L'infrastructure informatique nationale australienne) 
*   [NOAAGarde côtière](https://coastwatch.noaa.gov/erddap/index.html)  (central)  
*   [NOAASurveillance côtière CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (Nœud Caraïbes/Gulf du Mexique)  
*   [NOAACoastWatch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (Node des Grands Lacs)  
*   [NOAACôteWatch Côte Ouest](https://coastwatch.pfeg.noaa.gov/erddap/index.html)qui est co-situé avec et travaille avec
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (Division de la recherche environnementaleSWFSCdesNMFS) 
*   [NOAACapteurs IOOS](https://erddap.sensors.ioos.us/erddap/index.html)  (Système intégré d ' observation des océans)  
*   [NOAACeNCOOS](https://erddap.axiomdatascience.com/erddap/index.html)  (Système central et nord de Californie d'observation des océans, géré par Axiom Data Science)  
*   [NOAAIOOS GCOOS Données atmosphériques et océanographiques : Système d'observation](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOOS Données atmosphériques et océanographiques : Collections historiques](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAOOS GCOOS Biologique et socio-économique](https://gcoos4.tamu.edu/erddap/index.html)  (Système d'observation de l'océan de la côte du Golfe) 
*   [NOAAOOOS NERACOOS](http://www.neracoos.org/erddap/index.html)  (Association régionale des systèmes côtiers et océaniques du Nord-Est)  
*   [NOAAIOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)  (Glider national Centre d'assemblage de données)  
*   NOAANANOOS (Association des systèmes d'observation des océans en réseau du Nord-Ouest) 
*   [NOAAOOOS PacIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (Système d ' observation des océans des îles du Pacifique) à l ' Université d ' Hawaii (UH)  
*   NOAAOOOS SCCOOS (Système d'observation des océans côtiers de Californie méridionale) 
*   [NOAAIOOS SECOORA](https://erddap.secoora.org/erddap/index.html)  (Association régionale d'observation de l'océan côtier du Sud-Est)  
*   [NOAANCEI](https://www.ncei.noaa.gov/erddap/index.html)  (Centres nationaux d ' information sur l ' environnement)    
*   NOAANGDC STP (Géophysique nationale Centre de données, solaire -- Physique terrestre) 
*   NOAA NMFSNEFSC (Centre des sciences halieutiques du Nord-Est) 
*   [NOAACOOPS NOS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (Centre des produits et services océanographiques opérationnels)  
*   [NOAAOSMC](http://osmc.noaa.gov/erddap/index.html)  (Centre de surveillance du système d'observation)  
*   [NOAAPIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (Centre des sciences halieutiques des îles du Pacifique)  
*   [NOAAPMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAAPolarWatch](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAUAF](https://upwell.pfeg.noaa.gov/erddap/index.html)  (Cadre d'accès unifié)  
*   [Réseaux océaniques Canada](http://dap.onc.uvic.ca/erddap/index.html) 
*   [Réseau de suivi des océans](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / Toutes les données](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (Initiative des observatoires des océans)   
OOI / Données non disponibles
* Princeton, Groupe de recherche en hydrométéorologie
* R.Tech Engineering, France
*   [Université Rutgers, Département des sciences marines et côtières](https://tds.marine.rutgers.edu/erddap/index.html)  
* Institut de l'estuaire de San Francisco
*   [Scripps Institution of Oceanography, Sprays sous-marins](https://spraydata.ucsd.edu/erddap/index.html) 
*   [Une Atlantique intelligente](https://www.smartatlantic.ca/erddap/index.html)Université Memorial de Terre-Neuve
* Réseau sud-africain d ' observation de l ' environnement
* Technologies Spyglass
* Université Stanford, Station maritime Hopkins
*   [IODE de l'UNESCO](https://erddap.oa.iode.org/erddap/index.html)  (International océanographique et information Échange de données)  
*   [Université de la Colombie-Britannique, Terre, océan et atmosphère Département des sciences](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [Université de Californie à Davis, Laboratoire marin de Bodega](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [Université du Delaware, station de réception par satellite](https://basin.ceoe.udel.edu/erddap/index.html) 
* Université de Washington, Laboratoire de physique appliquée
*   [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)  (Programme de géologie côtière et marine)  
*   [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (Voix de l'océan, Suède)  

Voici une liste de quelques-unes des organisations oùERDDAP™a été installé par un individu ou un groupe. Cela ne signifie pas que l'individu, le groupe ou l'organisation recommande ou approuveERDDAP.

### ERDDAP™est recommandé dansNOAAet CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAADirective procédurale sur l'accès aux données](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)comprendERDDAP™dans sa liste de serveurs de données recommandés pour les groupesNOAA.ERDDAP™est favorablement mentionné à la section 4.2.3 de la
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Recherche Gestion des données Guide des pratiques exemplaires) - Oui. ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) du Centre National de la Recherche Scientifique (CNRS) en France.

## Diaporamas{#slide-shows} 

Voici quelques diaporamas PowerPoint et documents que Bob Simons a créés liés àERDDAP.

 **DISCLAIMER: Le contenu et les opinions exprimés dans ces documents sont les opinions personnelles de Bob Simons et ne reflètent pas nécessairement une position du gouvernement ou duNational Oceanic and Atmospheric Administration.** 

Les quatre documents principaux:

*   [La principale introductionERDDAP™  (version 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx).
Vous pouvez aussi[Regardez cette vidéo de Bob donnant ce discours![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4).
*   [Description d'une pageERDDAP™  (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAP: Charges lourdes, Grilles, Clusters, Fédérations et Cloud Computing](/docs/server-admin/scaling)
*   [Lignes directrices de Bob pour les systèmes de distribution de données](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

Autres présentations:

*   [EDM 2020: Nouvelles fonctionnalitésERDDAP™v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 DMIT: ingérer les données](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (Ou[Regardez cette vidéo de Bob donnant ce discours](https://www.youtube.com/watch?v=9ArYxgwON2k).) 
*   [2019 IOOS DMAC: Nouvelles fonctionnalités enERDDAP™v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 Été ESIP: Subsetting inERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 Été ESIP: JSON Support InERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: Un système de services Web distribué (Plus rapide, plus facile, moins cher)   (Ou pourquoi j'étais heureuse il y a 4 ans.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [EDM 2018:ERDDAP™en 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: Nouvelles fonctionnalités dansERDDAP™pour les données d'image, audio et vidéo](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [EDM 2018: UAF etERDDAP™Solutions pour l'intégration des données](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: une introduction rapide àERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM et IOOS 2017 : nouveaux ou peu connusERDDAP™Caractéristiques (pour les utilisateurs) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM et IOOS 2017 : nouveaux ou peu connusERDDAP™Caractéristiques (pour les administrateurs) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [EDM 2017: EML, KNB, etERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 EDM: Comment les données passent-elles de la source à l'utilisateur final? Vieille école contre Nouvelle école](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 Été ESIP: La Grande Photo: PARR,OPeNDAP,ERDDAP™, et distribution des données](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016 EDM: Un et fait](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 API Gov : Nouvelle génération Serveurs de données](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015 ESIP d'été: Agrégation des tableaux](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 EDM : Bob fait et ne fait pas pour les données tabulaires](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM : l'interface utilisateur idéale](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014 Été ESIP: Données tabulaires](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: Ne traitez pas les données in situ et tabulaires comme des données broyées](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDM: Plus avec moins](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [EDM 2012: Lignes directrices pour les systèmes de distribution de données](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

Présentations par d'autres personnes :

*   [Un outil basé sur FAIR pour améliorer le partage mondial des données![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
par Kevin O'Brien au Système mondial d'observation des océans (OBJET) Webinaire / Groupe de coordination de l'observation (OCG) Série / 1, 12 novembre 2020.
*   [Construire votre propre application météo en utilisantNOAAOuvrir les carnets de données et de Jupyter![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
par Filipe Fernandes et Rich Signell à SciPy 2018, le 13 juillet 2018.
*   [Utilisation de l'OIERDDAP![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
par Rich Signell, février 2018.
*   [ESIP Plongée technique: "ERDDAPLa foudre parle"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
Huit discours de cinq minutes sur les choses intéressantes que les gens font avecERDDAPpar Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton et Eli Hunter présentés comme une plongée technique ESIP le 31 août 2017.
*   [UtilisationERDDAP™pour accéder aux données tabulaires![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
par Rich Signell, août 2015.
*   [EssaiERDDAP™pour les données sur le carbone bleu![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
par Rich Signell, août 2015.
*   [Utilisation des donnéesERDDAP™enNOAA'sGNOMELogiciels![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM).
Dans cette vidéo, Rich Signell télécharge des données de prévision des courants océaniquesERDDAP™pour modéliser un déversement toxique dans l'océan en utilisant[NOAA'sGNOMElogiciel](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (dans 5 minutes &#33;) . (Une petite erreur dans la vidéo : lorsque vous recherchez des ensembles de données, n'utilisez pas ET entre les termes de recherche. C'est implicite.) Par Rich Signell, le 8 avril 2011.
