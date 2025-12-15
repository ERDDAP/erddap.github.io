# Remerciements

Le contributeur [créditeurs](https://github.com/erddap/erddap/blob/main/CREDITS.md) pour ERDDAP™ est maintenant sur une page séparée. ERDDAP™ est un produit de la [ NOAA ](https://www.noaa.gov "National Oceanic and Atmospheric Administration")   [ NMFS ](https://www.fisheries.noaa.gov "National Marine Fisheries Service")   [ SWFSC ](https://swfsc.noaa.gov "Southwest Fisheries Science Center")   [ ERD ](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division") .

Bob Simons est l'auteur principal original de ERDDAP™   (le concepteur et développeur de logiciels qui a écrit le ERDDAP -code spécifique) . Le point de départ était celui de Roy Mendelssohn (Le patron de Bob) suggestion que Bob tourne son programme ConvertTable (un petit utilitaire qui convertit les données tabulaires d'un format à un autre et qui était en grande partie le code de Bob pré- NOAA travail que Bob a re-permis d'être open source) dans un service web.

C'était et c'est les idées de Roy Mendelssohn sur les systèmes de données distribués, sa suggestion initiale à Bob, et son soutien continu (incluant le matériel, le réseau et d'autres supports logiciels, et en libérant le temps de Bob pour qu'il puisse passer plus de temps sur le ERDDAP™ code) qui a rendu ce projet possible et permis sa croissance.

Les ERDDAP -code spécifique est autorisé en tant que source ouverte protégée, avec [ NOAA ](https://www.noaa.gov) de détenir le droit d'auteur. Voir [ ERDDAP™ licence](/license) .
 ERDDAP™ utilise des sources ouvertes protégées, Apache, LGPL, MIT/X, Mozilla et des bibliothèques et données de domaine public.
 ERDDAP™ n'exige aucun code GPL ou programme commercial.

La majeure partie du financement des travaux ERDDAP™ vient de NOAA Ça a payé le salaire de Bob Simons. Pour la première année ERDDAP™ , alors qu'il était entrepreneur du gouvernement, le financement provient de [ NOAA Garde côtière](https://coastwatch.noaa.gov/) programme, le [ NOAA IOOS](https://ioos.noaa.gov/) et le suivi de la plate-forme de l'océan Pacifique, aujourd'hui disparu (POSTE) programme.

Beaucoup de crédit va aux nombreux ERDDAP™ les administrateurs et les utilisateurs qui ont fait des suggestions et des commentaires qui ont conduit à de nombreuses améliorations ERDDAP . Beaucoup sont mentionnés par nom dans le [Liste des modifications](/changes) . Merci à tous (Nom et sans nom) Très. Ainsi, ERDDAP™ est un excellent exemple de [Innovation axée sur l'utilisateur](https://en.wikipedia.org/wiki/User_innovation) , où l'innovation des produits provient souvent des consommateurs ( ERDDAP™ utilisateurs) , pas seulement les producteurs ( ERDDAP™ développeurs) .

Voici la liste des logiciels et des ensembles de données ERDDAP™ la distribution. Nous en sommes très reconnaissants. Merci beaucoup.
 \\[ À partir de 2021, il est devenu presque impossible d'énumérer correctement toutes les sources de code pour ERDDAP™ parce que quelques-unes des bibliothèques que nous utilisons (notamment netcdf-java et surtout AWS) à son tour, utilisez beaucoup, beaucoup d'autres bibliothèques. Toutes les bibliothèques qui ERDDAP™ les appels de code sont inclus directement ci-dessous, tout comme nombre des bibliothèques que les autres bibliothèques appellent à leur tour. Si vous voyez que nous avons omis un projet ci-dessous, s'il vous plaît nous le faire savoir afin que nous puissions ajouter le projet ci-dessous et donner crédit où le crédit est dû. \\] 

## Aperçu général{#overview} 
 ERDDAP™ est [ Java Servante](https://www.oracle.com/technetwork/java/javaee/servlet/index.html) programme. À ERD , il court à l'intérieur d'un [Tomcat](https://tomcat.apache.org/) serveur d'application (licence & #160;: [Apache](https://www.apache.org/licenses/) ) , avec [Apache](https://httpd.apache.org/) serveur web (licence & #160;: [Apache](https://www.apache.org/licenses/) ) , fonctionnant sur un ordinateur utilisant [Red Hat Linux](https://www.redhat.com/) système d'exploitation (licence & #160;: [GPL](https://www.gnu.org/licenses/gpl-3.0.html) ) .
     
## Données{#datasets} 
Les ensembles de données proviennent de diverses sources. Voir les métadonnées (en particulier les sourceUrl ", " infoUrl ", "institution" , et "licence") pour chaque ensemble de données. De nombreux ensembles de données ont une restriction sur leur utilisation qui vous oblige à citer/créditer le fournisseur de données chaque fois que vous utilisez les données. Il est toujours bon de citer/créditer le fournisseur de données. Voir [Comment citer un ensemble de données dans un document](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset) .
     
## Logiciel CoHort{#cohort-software} 
 [Les classes com/cohorte](#cohort-software) sont de CoHort Software (https://www.cohortsoftware.com) qui rend ces classes disponibles avec une licence de type MIT/X (Voir classes/com/cohort/util/LICENSE.txt) .
     
## Navigateur CoastWatch{#coastwatch-browser} 
 ERDDAP™ utilise le code du projet CoastWatch Browser (maintenant déclassé) des [ NOAA Garde côtière](https://coastwatch.noaa.gov)   [Node régional de la côte ouest](https://coastwatch.pfeg.noaa.gov/)   (licence: copyrighted open source) . Ce projet a été lancé et géré par Dave Foley, ancien coordonnateur de la NOAA CôteWatch Node régional de la côte Ouest. Tout le code du navigateur CoastWatch a été écrit par Bob Simons.
     
##  OPeNDAP  {#opendap} 
Données [ OPeNDAP ](https://www.opendap.org) les serveurs sont lus avec [ Java   DAP 1.1.7](https://www.opendap.org/deprecated-software/java-dap)   (licence: LGPL) .
     
##  NetCDF -Java{#netcdf-java} 
 NetCDF fichiers ( .nc ) , mode GMT NetCDF fichiers (.grd) , GRIB et BUFR sont lus et écrits avec le code dans le [ NetCDF   Java Bibliothèque](https://www.unidata.ucar.edu/software/netcdf-java/)   (licence & #160;: [BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE) ) de [ Unidata ](https://www.unidata.ucar.edu/) .

Logiciel inclus dans le NetCDF   Java - Oui.

* Slf4j
Les NetCDF   Java Bibliothèque et Cassandra besoin [slf4j de la Simple Logging Facade pour Java ](https://www.slf4j.org/) Projet. Actuellement, ERDDAP™ utilise le slf4j-simple-xxx.jar rebaptisé slf4j.jar pour répondre à ce besoin. (licence & #160;: [MIT/X](https://www.slf4j.org/license.html) ) .
     
* JDOM
Les NetCDF   Java .jar inclut le code de traitement XML de [JDOM](http://www.jdom.org/)   (licence & #160;: [Apache](http://www.jdom.org/docs/faq.html#a0030) ) , qui est inclus dans le netcdfAll.jar.
     
* Joda
Les NetCDF   Java .jar comprend [Joda](https://www.joda.org/joda-time/) pour les calculs du calendrier (qui ne sont probablement pas utilisés par ERDDAP ) . (licence & #160;: [Apache 2.0](https://www.joda.org/joda-time/licenses.html) ) .
     
* Apache
Les NetCDF   Java .jar comprend des fichiers .jar de plusieurs [Projets Apache](https://www.apache.org/) :
     [commons-codec](https://commons.apache.org/proper/commons-codec/) ,
     [commons-découverte](https://commons.apache.org/discovery/) ,
     [commune- http client](https://hc.apache.org/httpcomponents-client-ga/) ,
     [l'enregistrement des commons](https://commons.apache.org/proper/commons-logging/)   
     [HttpComposants](https://hc.apache.org) ,
     (Pour tous : licence : [Apache](https://www.apache.org/licenses/LICENSE-2.0) )   
Ils sont inclus dans le netcdfAll.jar.
     
* Autres
Les NetCDF   Java .jar comprend également le code de: com.google.code.findbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, org.codehaus.mojo, com.beust.jcommander, com.google.common, com.google.re2j et com.google.tiers. (Google utilise les licences Apache et BSD.)   
         
## SGT{#sgt} 
Les graphiques et les cartes sont créés à la volée avec une version modifiée de NOAA La SGT (était àhttps://www.pmel.noaa.gov/epic/java/sgt/, maintenant arrêté) version 3 (a Java -based Scientific Graphics Toolkit écrit par Donald Denbo à [ NOAA PMEL](https://www.pmel.noaa.gov/) )   (licence: copyrighted open source (était àhttps://www.pmel.noaa.gov/epic/java/license.html) ) .
     
## Walter Zorn{#walter-zorn} 
Gros, tooltips HTML sur ERDDAP Les pages HTML sont créées avec le wz\\_tooltip de Walter Zorn. js (licence: LGPL) .
Les sliders et la fonction glisser-déposer du slide Sorter sont créés avec wz\\_dragdrop.js de Walter Zorn. (licence: LGPL) .
     
## ouvrirPDF{#openpdf} 
Les fichiers .pdf sont créés avec [openpdf](https://github.com/LibrePDF/OpenPDF) , une Java - Bibliothèque PDF.
     
## GSHHS{#gshhs} 
Les données sur les rives et les lacs proviennent de [GSHHS](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html) -- Une base de données mondiale autocohérente, hiérarchique et à haute résolution (licence & #160;: [GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT) ) et créé par Paul Wessel et Walter Smith.

Nous n'avons pas de réclamation concernant la correspondance des données de la SHORELINE ERDDAP™ -- Ne l'utilisez pas pour les pompes routières.
     
    
## GMT pscoast{#gmt-pscoast} 
La frontière politique et les données fluviales proviennent de [pscoast](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html) programme en [GMT](https://www.soest.hawaii.edu/gmt/) , qui utilise les données [CIA Banque mondiale de données II](https://www.evl.uic.edu/pape/data/WDB/)   (licence: domaine public) .

Nous n'avons pas de réclamation sur la correspondance des données biologiques politiques avec lesquelles nous nous trouvons ERDDAP .
    
## ETOPO{#etopo} 
Les données bathymétriques/topographiques utilisées en arrière-plan de certaines cartes sont les suivantes: [ETOPO1 Ensemble de données mondiales sur l'élévation des mailles de 1 minute](https://www.ngdc.noaa.gov/mgg/global/global.html)   (Surface de glace, grille enregistrée, binaire, 2 octets int: Etopo1\\_ice\\_g\\_i2 .zip )   (licence & #160;: [domaine public](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright) ) , qui est distribué gratuitement [ NOAA NGDC](https://www.ngdc.noaa.gov) .

Nous n'avons pas de réclamation concernant la correspondance entre les données de la BATHYMÉTRIE/TOPOGRAPHIE ERDDAP . NE L'UTILISEZ PAS POUR LES FINS NAVIGATIONNELLES.
    
##  Java Courriel{#javamail} 
Les courriels sont envoyés en utilisant le code dans le courrier. bocal de Oracle 's [ Java API du courriel](https://javaee.github.io/javamail/)   (licence & #160;: [DÉVELOPPEMENT COMMUN ET LICENCE DE DISTRIBUTION (CDDL) Version 1.1](https://javaee.github.io/javamail/LICENSE) ) .
     
## JSON{#json} 
 ERDDAP™ Utilisations [Json.org's Java - bibliothèque JSON](https://www.json.org/index.html) à analyser [JSON](https://www.json.org/) données (licence & #160;: [droit d'auteur source ouverte](https://www.json.org/license.html) ) .
     

## PostgrSQL{#postgrsql} 
 ERDDAP™ comprend [Groupe de travail sur l ' aprèsGres](https://mvnrepository.com/artifact/org.postgresql/postgresql) conducteur (licence & #160;: [BSD](https://www.postgresql.org/about/licence/) ) . Le conducteur est Copyright (c) 1997-2010, PostgreSQL Global Development Group. Tous droits réservés.
     
## Lucene{#lucene} 
 ERDDAP™ utiliser le code depuis Apache [Lucene](https://lucene.apache.org/) . (licence & #160;: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) pour l'option moteur de recherche "lucène" (mais pas pour le moteur de recherche "original" par défaut) .
     
## commune-compress{#commons-compress} 
 ERDDAP™ utiliser le code depuis Apache [commune-compress](https://commons.apache.org/compress/) . (licence & #160;: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## JEXL{#jexl} 
 ERDDAP™ support pour l'évaluation des expressions et des scripts dans&lt; sourceName s&gt; s'appuie sur le [Projet Apache](https://www.apache.org/) : [ Java Langue d'expression (JEXL) ](https://commons.apache.org/proper/commons-jexl/)   (licence & #160;: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## Cassandra{#cassandra} 
 ERDDAP™ comprend Apache [Chez Cassandra](https://cassandra.apache.org/)   [Cassandra-driver-core.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)   (licence & #160;: [Apache 2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE) ) .
Le cassandra-driver-core.jar de Cassandra nécessite (et ainsi ERDDAP™ comprend) :
*    [Goyava.jar](https://github.com/google/guava)   (licence & #160;: [Apache 2.0](https://github.com/google/guava/blob/master/LICENSE) ) .
*    [Lz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)   (licence & #160;: [Apache 2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt) ) .
*    [métriques-core.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)   (licence & #160;: [MIT](https://github.com/codahale/metrics/blob/master/LICENSE) ) .
*    [tous.jar](https://netty.io/downloads.html)   (licence & #160;: [Apache 2.0](https://netty.io/downloads.html) ) .
*    [snappy-java.jar](https://xerial.org/snappy-java/)   (licence & #160;: [Apache 2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE) ) .
         
##  KT\\_ palettes{#kt_-palettes} 
Les palettes de couleurs qui ont le préfixe " KT\\_ " sont [collection de palettes .cpt par Kristen Tyng](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)   (licence & #160;: [MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html) ) , mais légèrement reformaté par Jennifer Sevadjian de NOAA pour qu'ils se conforment à ERDDAP Les prescriptions du .cpt.
     
##  Leaflet  {#leaflet} 
 ERDDAP™ utilise les Java Bibliothèque de scripts [ Leaflet ](https://leafletjs.com/)   (licence & #160;: [BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) ) en tant que WMS client sur WMS pages web dans ERDDAP . C'est un excellent logiciel (bien conçu, facile à utiliser, rapide et gratuit) de Vladimir Agafonkin.
     
## AWS{#aws} 
Pour travailler avec Amazon AWS (y compris S3) , ERDDAP™ utilise v2 de la [AWS SDK pour Java ](https://aws.amazon.com/sdk-for-java/)   (licence & #160;: [Apache](https://www.apache.org/licenses/) ) .

AWS exige que Maven tire dans les dépendances. Ils incluent les fichiers .jar suivants (où xxx est le numéro de version, qui change au fil du temps, et le type de licence est entre parenthèses) : annotations-xxx.jar (Apache) , apache-client-xxx.jar (Apache) , ams-xxx.jar (BSD) , asm-xxx.jar (BSD) , asm-analyse-xxx.jar (BSD) , asm-commons-xxx.jar (BSD) , asm-tree-xxx.jar (BSD) , asm-util-xxx.jar (BSD) , auth-xxx.jar (?) , aws-core-xxx.jar (Apache) , aws-query-protocol-xxx.jar (Apache) , aws-xml-protocol-xxx.jar (Apache) , checker-qual-xxx.jar (MIT) , erreur\\_prone\\_annotations-xxx.jar (Apache) , eventstream-xxx.jar (Apache) , échecaccès-xxx.jar (Apache) , http core-xxx.jar (Apache) , j2objc-annotations-xxx.jar (Apache) , Jackson-annotations-xxx.jar (Apache) , Jackson-core-xxx.jar (Apache) , Jackson-databind-xxx.jar (Apache) , jaxen-xxx.jar (BSD) Jffi-xxx.jar (Apache) , jffi-xxx.natif. pot (Apache) JNR-constants-xxx.jar (Apache) , jnr-ffi-xxx.jar (Apache) , jnr-posix-xxx.jar (Apache) , jnr-x86asm-xxx.jar (Apache) Json-xxx.jar (Droit d'auteur source ouverte) , jsr305-xxx.jar (Apache) , écouteablefutur-xxx.jar (Apache) , une douzaine de netty . jar's (Apache) , profils-xxx.jar (Apache) , protocole-core-xxx.jar (Apache) , flux réactifs-xxx.jar (CCO 1,0) , régions-xxx.jar (Apache) , s3-xxx.jar (Apache) , sdk-core-xxx.jar (Apache) , utils-xxx.jar (?) . Pour voir les licences réelles, recherchez le nom .jar dans le [Dépôt de fonds](https://mvnrepository.com/) puis fouiller dans les fichiers du projet pour trouver la licence.
    

Nous sommes également très reconnaissants pour tous les logiciels et sites Web que nous utilisons lors du développement ERDDAP , y compris
 [Chrome](https://www.google.com/chrome/browser/desktop/) ,
 [ curl ](https://curl.haxx.se/) ,
 [DuckDuckGo](https://duckduckgo.com/?q=) ,
 [ÉditionPlus](https://www.editplus.com/) ,
 [FichierZilla](https://filezilla-project.org/) .
 [GitHub](https://github.com/) ,
 [Recherche Google](https://www.google.com/webhp) ,
 [PUTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) ,
 [débordement de la pile](https://stackoverflow.com/) ,
 [todoist](https://todoist.com/?lang=en) ,
 [ Wikipedia ](https://www.wikipedia.org/) ,
l'Internet, le World Wide Web, et tous les autres, grands, sites Web utiles.
Merci beaucoup.
