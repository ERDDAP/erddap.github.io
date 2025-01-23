---
title: "EDDTableFromEML" 
---
# La table EDDFromEML et la table EDDFromEMLBatch Options dans Générer des ensembles de données Xml

\\[Cette page Web ne sera intéressante que pourERDDAP™administrateurs qui travaillent avec les fichiers EML.
Ce document a été créé à l'origine en 2016. Il a été édité pour la dernière fois en 2020-11-30.\\]

[ **ERDDAP™** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)est un serveur de données qui donne aux utilisateurs une façon simple et cohérente de télécharger des sous-ensembles de données scientifiques maillées et tabulaires dans des formats de fichiers communs et de faire des graphiques et des cartes.ERDDAP™fonctionne avec un ensemble de données donné en tant que groupe de variables multidimensionnelles maillées (Par exemple, données satellitaires ou modèles) ou comme table de base de données (avec une colonne pour chaque type d'information et une ligne pour chaque observation) .ERDDAP™est un logiciel libre et ouvert, donc n'importe qui peut[télécharger et installerERDDAP™](/docs/server-admin/deploy-install)pour servir leurs données.

Pour ajouter un ensemble de données à unERDDAP™installation,ERDDAP™administrateur doit ajouter un morceau de XML décrivant l'ensemble de données à un fichier appelédatasets.xml. (Il y a[documentation approfondie pourdatasets.xml](/docs/server-admin/datasets).) Bien qu'il soit possible de générer le morceau de XML pourdatasets.xmlentièrement à la main,ERDDAP™est livré avec un outil appelé[ **Générer des ensembles de donnéesXml** ](/docs/server-admin/datasets#tools)qui peut générer le brouillon du morceau de XML nécessaire pour un ensemble de données donné basé sur une source d'information sur l'ensemble de données.

La première chose Générer des ensembles de données Xml demande quel type d'ensemble de données vous souhaitez créer. Générer des ensembles de données Xml a une option spéciale, **EDDTableFromEML** , qui utilise les informations[Langue des métadonnées écologiques (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)Fichier XML pour générer le morceau de XML pourdatasets.xmlcréer un[EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles)ensemble de données de chaque table de données dans un fichier EML. Cela fonctionne très bien pour la plupart des fichiers EML, principalement parce que les fichiers EML font un excellent travail de stockage de toutes les métadonnées nécessaires pour un ensemble de données dans un format facile à travailler. L'information qui génèreDatasetsXml doit créer les ensembles de données est dans le fichier EML, y compris l'URL pour le fichier de données, qui génèreDatasetsXml téléchargements, analyse, et compare à la description dans le fichier EML. (De nombreux groupes feraient bien de passer à EML, qui est un excellent système pour documenter tout ensemble de données scientifiques tabulaires, et pas seulement des données écologiques. Et de nombreux groupes qui créent des schémas XML feraient bien d'utiliser EML comme étude de cas pour un schéma XML clair, au point, pas trop profond (C'est-à-dire trop de niveaux) , et facile pour les humains et les ordinateurs à travailler avec.) 

## Questions{#questions} 

Voici toutes les questions Générer des ensembles de données Xml vous demandera, avec des commentaires sur la façon de répondre si vous voulez traiter un seul fichier EML ou un lot de fichiers EML:

* Quel type EDD?
Si vous voulez traiter un seul fichier, répondez : EDDTableFromEML
Si vous voulez traiter un groupe de fichiers, répondez : EDDTableFromEMLBatch
* Répertoire pour stocker les fichiers ?
Entrez le nom du répertoire qui sera utilisé pour stocker les fichiers EML et/ou données téléchargés.
Si le répertoire n'existe pas, il sera créé.
*    (Pour EDDTableFromEML seulement) URL EML ou nom de fichier local ?
Saisissez l'URL ou le nom de fichier local d'un fichier EML.
*    (Pour EDDTableFromEMLBatch seulement) EML dir (URL ou local) ?
Saisissez le nom du répertoire avec les fichiers EML (une URL ou un dir local) .
Par exemple: http://sbc.lternet.edu/data/eml/files/
 
*    (Pour EDDTableFromEMLBatch seulement) Nom de fichier regex ?
Saisissez l'expression régulière qui sera utilisée pour identifier les fichiers EML souhaités dans le répertoire EML.
Par exemple: knb-lter-sbc\\.\\d+
* Utiliser des fichiers locaux s'ils sont présents (vrai|faux) ?
Entrez true pour utiliser les fichiers EML locaux existants et les fichiers de données, s'ils existent.
Saisissez false pour toujours télécharger à nouveau les fichiers EML et/ou les fichiers de données.
* accessible Pour ?
Si vous voulez que les nouveaux ensembles de données soient des ensembles de données privés dansERDDAP, préciser le nom du groupe (s) l'accès sera autorisé.
Recommandé pour les groupes LTER: combiner "Lter" plus le groupe, p.ex. Sbc .
Si vous entrez « null », il n'y aura pas&lt;accessible To&gt; tag dans la sortie.
Voir[accessible Aux](/docs/server-admin/datasets#accessibleto).
* locaux Zone temporelle (États-Unis/Pacifique) ?
Si une variable de temps indique qu'elle a des valeurs de temps locales, ce fuseau horaire sera assigné.
Cela doit être une valeur de la[TZ liste des noms de fuseaux horaires](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
Notez tous les noms "US/..." faciles à utiliser à la fin de la liste.
Si plus tard vous trouvez que c'est incorrect, vous pouvez changer letime\\_zonedans le morceau dedatasets.xml.

EML plusERDDAP™est une grande combinaison, puisqueERDDAP™peut donner aux utilisateurs un accès plus direct à la richesse de[Réseau de connaissances pour la biocomplexité (KNB) ](https://knb.ecoinformatics.org/)et[Recherche écologique à long terme (LTER) ](https://lternet.edu/)et aider ces projets à répondre aux besoins du gouvernement américain[Accès du public aux résultats de la recherche (PARR) exigences](https://nosc.noaa.gov/EDMC/PD.DSP.php)en rendant les données disponibles via un service web. En outre, EML plusERDDAP™semble être un grand pont entre les scientifiques du domaine universitaire et les scientifiques de l'organisme fédéral (NOAA, NASA, USGS) Le royaume.

Voir notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).
 
## Détails de conception{#design-details} 

Voici les détails de conception de l'option EDDTableFromEML dans GenerateDatasetsXml.
Certains sont liés à des différences dans la façon dont EML etERDDAP™faire les choses et comment générer des ensembles de données Xml s'occupe de ces problèmes.

### Une table de données devient uneERDDAP™Ensemble de données{#one-datatable-becomes-one-erddap-dataset} 
Un fichier EML peut avoir plusieurs&lt;données Tableau et annexeERDDAP™en fait uneERDDAP™ensemble de données par données EMLTableau. LesdatasetIDpour l'ensemble de données est
 *Nom EML* \\_t *numéro de tableau*   (lorsque EMLname est un texte) ou
 *système\\_Nom EML* \\_t *numéro de tableau*   (lorsque EMLname est un nombre) .
Par exemple, le tableau #1 dans le fichier knb-lter-sbc.28, devientERDDAP™ datasetID=knb\\_lter\\_sbc\\_28\\_t1,
     
### EML versus CF+ACDD{#eml-versus-cfacdd} 
Presque toutes les métadonnées des fichiers EML entrent dansERDDAP, mais dans un format différent.ERDDAP™utilise les[FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)et[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)les normes relatives aux métadonnées. Il s'agit de systèmes de métadonnées complémentaires qui utilisent des paires clé=valeur pour les métadonnées mondiales et pour les métadonnées de chaque variable.
Oui, la représentation EML des métadonnées est plus agréable que la représentation CF+ACDD. Je ne suggère pas d'utiliser la représentation CF+ACDD pour remplacer le LME. S'il vous plaît pensez à CF+ACDD comme faisant partie du pont du monde EML auOPeNDAP/CF/ACDD monde.
     
### Petits changements{#small-changes} 
ERDDAP™fait beaucoup de petits changements. Par exemple,ERDDAP™utilise le EML non-DOIsuppléant Identificateur plus un nombre de donnéesERDDAP™ datasetID, mais change légèrement Identificateur pour en faire un nom de variable valide dans la plupart des langues de l'ordinateur, par exemple, knb-lter-sbc.33 données Le tableau #1 devient knb\\_lter\\_sbc\\_33\\_t1.
     
### DocBook{#docbook} 
EML utilise le système de balisage de DocBook pour fournir une structure aux blocs de texte dans les fichiers EML. Les FC et l'ACDD exigent que les métadonnées soient en texte clair. Générer des ensembles de données Xml convertit le texte marqué vers le haut en texte simple qui ressemble à la version formatée du texte. Les étiquettes en ligne sont désinfectées avec des crochets, p. ex.,\\[souligné\\], et laissé dans le texte simple.
     
### Fichiers de données{#data-files} 
Puisque la table de données EML inclut l'URL du fichier de données réel, Générer des ensembles de données Xml :
1. Téléchargez le fichier de données.
2. Conservez-le dans le même répertoire que le fichier EML.
3. Lisez les données.
4. Comparer la description des données dans le EML avec les données réelles dans le fichier.
5. Si générer des ensembles de données Xml trouve des différences, il les traite, ou demande à l'opérateur si les différences sont correctes, ou renvoie un message d'erreur. Les détails sont présentés ci-dessous.
         
### .zip'd Fichiers de données{#zipd-data-files} 
Si le fichier de données référencé est un.zipfichier, il doit contenir un seul fichier. Ce fichier sera utilisé pour leERDDAP™ensemble de données. S'il y a plus d'un fichier.ERDDAP™rejettera cet ensemble de données. Si nécessaire, cela pourrait être modifié. (Dans la pratique, tous les fichiers zip SBC LTER n'ont qu'un seul fichier de données.)   
     
### Type de stockage{#storagetype} 
Si une colonne est stockée Le type n'est pas spécifié,ERDDAP™utilise sa meilleure estimation basée sur les données du fichier de données. Ça marche assez bien.
     
### Unités{#units} 
ERDDAP™Utilisations[UDUNITSformatage des unités](https://www.unidata.ucar.edu/software/udunits/). Générer des ensembles de données Xml est capable de convertir des unités EML enUDUNITSenviron 95% du temps. Les 5 % restants donnent une description lisible des unités, p. ex., l'unité de densité de biomasse dans le LEM devient l'unité de densité de biomasse par unité d'abondance.ERDDAP. Techniquement, c'est interdit. Je ne pense pas que ce soit si grave dans les circonstances.\\[Si nécessaire, des unités qui ne peuvent pas être faitesUDUNITScompatible peut être déplacé vers l'attribut commentaire de la variable.\\]  
     
### EML version 2.1.1{#eml-version-211} 
Cette prise en charge des fichiers EML v2.1.1 a été ajoutée à GenerateDatasets Xml en 2016 avec l'espoir qu'il y aurait une certaine appropriation dans la communauté EML. En 2020, cela ne s'est pas produit. LesERDDAP™les développeurs seraient heureux d'ajouter un support pour les versions plus récentes de EML, mais seulement si les nouvelles fonctionnalités seront effectivement utilisées. Courrielerd.data at noaa.govsi vous voulez un support pour des versions plus récentes de EML et utilisera réellement cette fonctionnalité.
     

## Problèmes avec les fichiers EML{#issues-with-the-eml-files} 

Il ya quelques problèmes/problèmes avec les fichiers EML qui causent des problèmes quand un client logiciel (comme l'option EDDTableFromEML dans GenerateDatasetsXML) tente d'interpréter et de traiter les fichiers EML.

* Bien qu'il y ait plusieurs questions énumérées ici, il s'agit surtout de petits problèmes solubles. En général, EML est un excellent système et j'ai eu le plaisir de travailler avec lui.
* Ceux-ci sont approximativement triés du pire / le plus commun au moins mauvais / le moins commun.
* La plupart sont liés à de petits problèmes dans des fichiers EML spécifiques (qui ne sont pas de la faute de EML) .
* La plupart peuvent être corrigés par des modifications simples au fichier EML ou au fichier de données.
* Étant donné que les personnes LTER construisent un vérificateur EML pour tester la validité des fichiers EML, j'ai ajouté quelques suggestions ci-dessous concernant les fonctionnalités qui pourraient être ajoutées au vérificateur.

Voici les enjeux :

### Colonnes séparées de date et d'heure{#separate-date-and-time-columns} 
Certains fichiers de données ont des colonnes séparées pour la date et pour le temps, mais aucune colonne unifiée date + heure. Actuellement, générer des ensembles de données Xml crée un ensemble de données avec ces colonnes séparées, mais il n'est pas idéal parce que:

* Il est préférable que les ensembles de donnéesERDDAP™ont une colonne combinée date + heure appelée"time".
* Souvent, l'ensemble de données ne se charge pas dansERDDAP™parce que les"time"colonne n'a pas de données date+heure.

Il y a deux solutions possibles :
1. Modifier le fichier de données source pour ajouter une nouvelle colonne dans le fichier de données (et de le décrire dans le EML) où les colonnes date et heure sont fusionnées en une seule colonne. Puis recréer les ensembles de données Xml donc il trouve la nouvelle colonne.
2. Utilisez la[Variables dérivées](/docs/server-admin/datasets#script-sourcenamesderived-variables)fonctionnalité dansERDDAP™définir une nouvelle variable dansdatasets.xmlqui est créé en concatérant la date et les colonnes temporelles. L'un des exemples porte spécifiquement sur cette situation.
         
### Noms de colonnes incompatibles{#inconsistent-column-names} 
Les fichiers EML listent les colonnes du fichier de données et leurs noms. Malheureusement, ils sont souvent différents des noms de colonnes dans le fichier de données réel. Normalement, l'ordre des colonnes dans le fichier EML est le même que celui des colonnes dans le fichier de données, même si les noms varient légèrement, mais pas toujours. Générer des ensembles de données Xml essaie de correspondre aux noms des colonnes. Quand il ne peut pas (qui est fréquent) , il s'arrêtera, vous montrera les paires EML/data filename, et vous demandera s'ils sont correctement alignés. Si vous entrez 's' pour sauter une table, GeneratedDatasetsXml va imprimer un message d'erreur et aller à la table suivante.
La solution est de modifier les noms de colonnes erronés dans le fichier EML pour correspondre aux noms de colonnes dans le fichier de données.
     
### Ordre de colonnes différentes{#different-column-order} 
Il y a plusieurs cas où le EML a spécifié les colonnes dans un ordre différent de ce qu'elles existent dans le fichier de données. Générer des ensembles de données Xml s'arrêtera et demandera à l'opérateur si les matchups sont corrects ou si le jeu de données devrait être ignoré. Si elle est ignorée, il y aura un message d'erreur dans le fichier de résultats, par exemple:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
La solution est de fixer l'ordre des colonnes dans ces fichiers EML afin qu'ils correspondent à l'ordre dans les fichiers de données.

Il serait agréable que le vérificateur EML vérifie que les colonnes et l'ordre des colonnes dans le fichier source correspondent aux colonnes et à l'ordre des colonnes dans le fichier EML.
    
### NumHeaderLines incorrectes{#incorrect-numheaderlines} 
Plusieurs données Les tableaux indiquent incorrectement numHeaderLines=1, p.ex. ...sbc.4011. Cela provoqueERDDAP™pour lire la première ligne de données comme les noms de colonne. J'ai essayé de SKIP manuellement toutes ces tables de données. Ils sont évidents parce que les noms de sources non appariés sont tous des valeurs de données. Et s'il y a des fichiers qui ont incorrectement numHeaderLines=0, mon système ne le rend pas évident. Voici un exemple du fichier de défaillances SBC LTER :
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
Donc l'erreur peut apparaître comme si GenerateDatasets Xml pense que la première ligne avec les données dans le fichier (Par exemple, avec 2008-10-01T00:00 etc.) est la ligne avec les noms de colonnes (comme si 2008-10-01T00:00 étaient un nom de colonne) .

Ce serait bien si le vérificateur EML vérifiait la valeur numHeaderLines.
    
### numHeaderLines = 0{#numheaderlines--0} 
Certains fichiers sources n'ont pas de noms de colonnes.ERDDAP™accepte que si le EML décrit le même nombre de colonnes.

À mon avis, cela semble très dangereux. Il pourrait y avoir des colonnes dans un ordre différent ou avec des unités différentes (voir ci-dessous) et il n'y a aucun moyen de rattraper ces problèmes. Il est beaucoup mieux si tous les fichiers de données ASCII ont une ligne avec des noms de colonnes.
    
### DateTime Format Chaînes{#datetime-format-strings} 
EML a une façon standard de décrire les formats de date. mais son utilisation dans les fichiers EML varie considérablement. (J'avais déjà eu tort. Je vois la documentation EML pour formatString qui semble correspondre à la[JavaDateTimeCaractère spécifique](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html), mais qui n'a pas les lignes directrices importantes sur son utilisation, de sorte que formatString est souvent/généralement mal utilisé.) Il y a plusieurs cas où le cas est incorrect, et/ou où il y a duplication incorrecte d'une lettre et/ou un formatage non standard. Cela impose un fardeau déraisonnable aux clients, en particulier aux clients de logiciels comme GenerateDatasetsXml. Générer des ensembles de données Xml tente de convertir les formats mal définis dans les fichiers EML en
[la date/l'heure dans laquelleERDDAP™nécessite](/docs/server-admin/datasets#string-time-units), qui est presque identique à pourJava/Joda spécification de format de temps, mais est légèrement plus clément.

Ce serait bien si le vérificateur EML exigeait une stricte adhésion auJava/Joda/ERDDAPspécification des unités de temps et vérifié que les valeurs de date dans le tableau de données peuvent être analysées correctement avec le format spécifié.
    
### DateHeure mais pas de fuseau horaire{#datetime-but-no-time-zone} 
Générer des ensembles de données Xml recherche une colonne avec date Heure et fuseau horaire spécifiés (soitZulu: à partir d'unités temporelles se terminant par 'Z' ou d'une définition de nom de colonne ou d'attribut qui comprend "gmt" ou "utc", ou local: de "local" dans la définition de nom de colonne ou d'attribut) . Aussi acceptable est un fichier avec une colonne de date mais pas de colonne de temps. Un dossier sans date ni heure est également acceptable.

Générer des ensembles de données Xml traite toutes les heures "locales" comme étant du fuseau horaire que vous pouvez spécifier pour un lot donné de fichiers, par exemple, pour SBC LTER, utilisez US/Pacific. L'information se trouve parfois dans les commentaires, mais pas sous une forme facile à comprendre pour un programme informatique.

Les fichiers qui ne répondent pas à ces critères sont rejetés avec le message "NOUVEAU DATE (HEURE) VARIABLE". Les problèmes courants sont:

* Il y a une colonne avec des dates et une colonne avec des heures, mais pas une date Une colonne temporelle.
* Il y a des unités de temps, mais le fuseau horaire n'est pas spécifié.

Autres observations:
S'il y a une bonne date + heure avec la colonne fuseau horaire, cette colonne sera nommée"time"enERDDAP.ERDDAP™exige que les données de la colonne temporelle soient compréhensibles/convertiblesZulu/UTC/GMT fuseau horaire dateHeures.\\[Ma croyance est : utiliser des heures locales et différents formats date/heure (Des années à deux chiffres &#33; mm/jj/aa vs dd/mm/aa vs ...) dans les fichiers de données force l'utilisateur final à faire des conversions compliquées enZulule temps nécessaire pour comparer les données d'un ensemble de données avec celles d'un autre. AlorsERDDAP™uniformise toutes les données de temps : Pour les temps de cordes,ERDDAP™utilise toujours la norme ISO 8601:2004 (E) format standard, par exemple, 1985-01-02T00:00:00Z. Pour les temps numériques,ERDDAP™utilise toujours"seconds since 1970-01-01T00:00:00Z".ERDDAP™utilise toujoursZulu  (Code postal) fuseau horaire pour supprimer les difficultés de travailler avec différents fuseaux horaires et heure normale par rapport à l'heure avancée. Générer des ensembles de données Xml cherche une colonne de données EMLTable avec date + heureZulu. C'est difficile car EML n'utilise pas de vocabulaire/système formel (comme[Java/Format horaire Joda](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) pour préciser les données Format de temps & #160;:
S'il y a un col avec des valeurs numériques de temps (Par exemple,Matlabheures) etZulufuseau horaire (ou juste des dates, sans colonnes temporelles) , il est utilisé comme"time".
S'il y a un col avec des données sur la date et l'heure,Zulufuseau horaire, il est utilisé comme"time"et toute autre colonne de date ou d'heure est supprimée.
Sinon, si un col avec l'information juste date est trouvé, il est utilisé comme"time"variable (sans fuseau horaire) .
S'il y a une colonne de données et une colonne de temps et aucune date combinée Colonne temporelle, l'ensemble de données est REJETÉ — mais l'ensemble de données pourrait être utilisable en ajoutant une date combinée Colonne temporelle (de préférence,Zulufuseau horaire) dans le fichier de données et en ajoutant sa description dans le fichier EML.
EXEMPLE DE SBC LTER:[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)donnéesTableau 2.

Ce serait bien si EML/LTER exigeait l'inclusion d'une colonne avecZulu  (Code postal) fuseau horaire dans tous les fichiers sources pertinents. Le meilleur suivant est d'ajouter un système à EML pour spécifier untime\\_zoneattribut utilisant des noms standard (des[Colonne TZ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .
    
### Manquemissing\\_value {#missing-missing_value} 
Certaines colonnes utilisent unmissing\\_valuemais ne l'énumérez pas dans les métadonnées EML, par exemple, precipitation\\_mm dans knb-lter-sbc.5011 utilise -999. Si aucune valeur manquante n'est spécifiée dans le EML, GenerateDatasetsXml recherche automatiquement des valeurs manquantes communes (Par exemple, 99, -99, 999, -999, 9999, -9999, etc.) et crée ces métadonnées. Mais d'autres disparusmissing\\_values ne sont pas prises.

Ce serait bien si le vérificateur EML cherchait à manquermissing\\_valuePar.
    
### Petits problèmes{#small-problems} 
Il y a beaucoup de petits problèmes (orthographe, ponctuation) qui ne sera probablement trouvé que par un humain inspectant chaque ensemble de données.

Ce serait bien si le vérificateur EML cherchait des erreurs d'orthographe et de grammaire. C'est un problème difficile parce que les mots en science sont souvent marqués par des vérificateurs de sort. L'édition humaine est probablement nécessaire.
    
### Caractères Unicode non valides{#invalid-unicode-characters} 
Certains contenus EML contiennent des caractères Unicode invalides. Ce sont probablement des caractères du charset Windows qui ont été incorrectement copiés et collés dans les fichiers EML UTF-8. Générer des ensembles de données Xml désinfecte ces caractères par exemple,\\[#128\\], donc ils sont faciles à rechercher dans leERDDAP™ datasets.xmlfichier.

Ce serait bien si le vérificateur EML vérifiait ça. Il est facile à trouver et facile à réparer.
    
### Unités de colonnes différentes] (#Différentes UnitésColonnes)  {#different-column-unitsdifferentcolumnunits} 
Certaines données EMLTables définissent des colonnes qui sont incompatibles avec les colonnes du fichier de données, notamment parce qu'elles ont des unités différentes. Générer des ensembles de données Xml signe ça. Il appartient à l'opérateur de décider si les différences sont bonnes ou non. Celles-ci apparaissent dans le fichier des échecs sous la forme de tables de données "SKIPPED". EXEMPLE dans le fichier de défaillances SBC LTER :
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
Ce serait bien si le vérificateur EML vérifiait que les unités correspondent. Malheureusement, cela est probablement impossible à attraper et ensuite impossible à résoudre sans contacter le créateur de l'ensemble de données, étant donné que le fichier source n'inclut pas d'unités. L'écart pour l'exemple ci-dessus n'a été perceptible que parce que les unités ont été incluses dans le nom de la colonne source et le nom de la colonne EML. Combien d'autres donnéesTables ont ce problème mais sont indétectables?
    
### Différentes versions de EML{#different-versions-of-eml} 
Générer des ensembles de données Xml est conçu pour fonctionner avec EML 2.1.1. D'autres versions de EML fonctionneront dans la mesure où elles correspondent à 2.1.1 ou que GenerateDatasetsXml a un code spécial pour y faire face. C'est un problème rare. Lorsque cela se produit, la solution est de convertir vos fichiers en EML 2.1.1, ou d'envoyer le fichier EML enerd.data at noaa.gov, afin que je puisse apporter des modifications à GenerateDatasets Xml pour traiter les différences.

Bob a ajouté la prise en charge des fichiers EML pour générer des ensembles de données Xml en 2016 avec l'espoir qu'il y aurait une certaine appropriation dans la communauté EML. En 2020, cela ne s'est pas produit. Bob est heureux d'ajouter un support pour les versions plus récentes de EML, mais seulement si les nouvelles fonctionnalités seront effectivement utilisées. Courrielerd.data at noaa.govsi vous voulez un support pour des versions plus récentes de EML et utilisera réellement cette fonctionnalité.
    
### Problème d'analyse du fichier de données{#trouble-parsing-the-data-file} 
Rarement, une table de données peut être rejetée avec l'erreur "nombre inattendu d'éléments à la ligne 120 (observé=52, attendu=50) " Un message d'erreur comme celui-ci signifie qu'une ligne dans le fichier de données avait un nombre de valeurs différent des autres lignes. C'est peut-être un problème.ERDDAP™  (Par exemple, ne pas analyser correctement le fichier) ou dans le dossier. EXEMPLE DE SBC LTER:
[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)donnéesTableau #3, voir fichier de données=LTER\\_mensuel\\_bottledata\\_enregistré\\_stations\\_20140429.txt
