---
title: "ERDDAP™ - Working with the datasets.xml File"
sidebar_position: 3
---
# Travailler avec lesdatasets.xmlFichier

\\[Cette page Web ne sera intéressante que pourERDDAP™administrateurs.\\]

Après avoir suiviERDDAP™ [instructions d'installation](/docs/server-admin/deploy-install), vous devez modifier ledatasets.xmlfichier dans *Tomcat* /content/erddap/ pour décrire les ensembles de donnéesERDDAP™l'installation servira.

Vous pouvez voir un exemple[datasets.xmlsur GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).

- - Oui.

## [Présentation](#introduction) {#introduction} 

### Quelques montages nécessaires{#some-assembly-required} 
Configuration d'un ensemble de données dansERDDAP™Il ne s'agit pas seulement de pointer vers le répertoire ou l'URL de l'ensemble de données. Vous devez écrire un morceau de XML pourdatasets.xmlqui décrit l'ensemble de données.

* Pour les ensembles de données maillés, afin de rendre l'ensemble de données conformeERDDAPLa structure des données pour les données maillées, vous devez identifier un sous-ensemble des variables de l'ensemble de données qui partagent les mêmes dimensions. ([Pourquoi ?](#why-just-two-basic-data-structures) [Comment ça ?](#dimensions)) 
* Les métadonnées actuelles de l'ensemble de données sont importées automatiquement. Mais si vous voulez modifier ces métadonnées ou ajouter d'autres métadonnées, vous devez les spécifier dansdatasets.xml. EtERDDAP™a besoin d'autres métadonnées, notamment[attributs globaux](#global-attributes)  (tels queinfoUrl, institution,sourceUrl, résumé et titre) et[attributs variables](#variable-addattributes)  (tels quelong\\_nameet unités) . Tout comme les métadonnées qui sont actuellement dans l'ensemble de données ajoutent des informations descriptives à l'ensemble de données, les métadonnées demandées parERDDAP™ajoute des informations descriptives à l'ensemble de données. Les métadonnées supplémentaires sont un bon ajout à votre ensemble de données et aidentERDDAP™faire un meilleur travail de présentation de vos données aux utilisateurs qui ne sont pas familiers avec elle.
*   ERDDAP™a besoin de vous pour faire des choses spéciales avec le[longitude, latitude, altitude (ou profondeur) , et variables temporelles](#destinationname).

Si vous achetez dans ces idées et dépensez l'effort pour créer le XML pourdatasets.xml, vous obtenez tous les avantages deERDDAP™, y compris:

* Recherche en texte complet pour les ensembles de données
* Rechercher les ensembles de données par catégorie
* Formulaires d'accès aux données ( *datasetID* .html) afin que vous puissiez demander un sous-ensemble de données dans beaucoup de formats de fichiers différents
* Formulaires pour demander des graphiques et des cartes ( *datasetID* Graphique) 
* Service de cartes Web (WMS) pour les ensembles de données maillés
*   RESTfulaccès à vos données

Faire ledatasets.xmldemande des efforts considérables pour les premiers ensembles de données, mais **ça devient plus facile** . Après le premier jeu de données, vous pouvez souvent réutiliser beaucoup de votre travail pour le prochain jeu de données. Heureusement,ERDDAP™vient avec deux[Outils](#tools)pour vous aider à créer le XML pour chaque ensemble de donnéesdatasets.xml.
Si vous êtes coincé, voyez notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).

### Fournisseur de données Formulaire{#data-provider-form} 
Quand un fournisseur de données vient à vous en espérant ajouter quelques données à votreERDDAP, il peut être difficile et long de collecter toutes les métadonnées (informations sur l'ensemble de données) nécessaire pour ajouter l'ensemble de donnéesERDDAP. Nombreuses sources de données (par exemple, fichiers .csv, Fichiers Excel, bases de données) n'ont pas de métadonnées internes, doncERDDAP™a un formulaire de fournisseur de données qui recueille les métadonnées du fournisseur de données et donne au fournisseur de données d'autres orientations, y compris des directives détaillées pour[Données dans les bases de données](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases). Les informations soumises sont converties endatasets.xmlformat puis envoyé par courriel auERDDAP™administrateur (vous) et écrit (Annexe) à *BigParent Directory* /logs/dataProviderForm.log . Ainsi, le formulaire semi-automatise le processus d'obtention d'un ensemble de donnéesERDDAPMais lesERDDAP™administrateur doit encore compléter ledatasets.xmlmorceaux et traiter avec obtenir le fichier de données (s) le fournisseur ou la connexion à la base de données.

La soumission de fichiers de données réels provenant de sources externes est un risque énorme pour la sécurité, doncERDDAP™ne s'occupe pas de ça. Vous devez trouver une solution qui fonctionne pour vous et le fournisseur de données, par exemple, email (pour les petits fichiers) , tirer du nuage (par exemple, DropBox ou Google Drive) , un site sftp (avec mots de passe) ou sneaker Montant net (un lecteur USB ou un disque dur externe) . Vous ne devriez probablement accepter que des fichiers de gens que vous connaissez. Vous devrez analyser les fichiers pour détecter les virus et prendre d'autres précautions de sécurité.

Il n'y a pas de lien.ERDDAP™au formulaire du fournisseur de données (par exemple, surERDDAP™page d'accueil) . Au lieu de cela, quand quelqu'un vous dit qu'ils veulent que leurs données soient servies par votreERDDAP, vous pouvez leur envoyer un email disant quelque chose comme:
Oui, nous pouvons mettre vos données dansERDDAP. Pour commencer, veuillez remplir le formulaire à https://*yourUrl*/erddap/dataProviderForm.html   (ouhttp://sihttps://n'est pas activé) .
Une fois que vous aurez fini, je vous contacterai pour établir les derniers détails.
Si vous voulez juste regarder le formulaire (sans le remplir) , vous pouvez voir le formulaire surERD'sERDDAP:[Présentation](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html),[Première partie](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html),[Deuxième partie](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html),[Troisième partie](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html)et[Quatrième partie](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html). Ces liensERD ERDDAP™envoyer des informations à moi, pas vous, donc ne pas soumettre des informations avec eux à moins que vous voulez réellement ajouter des données à laERD ERDDAP.

Si vous voulez supprimer le formulaire de fournisseur de données de votreERDDAP™, mettre
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
dans votre fichier setup.xml.

L'impulsion pour cela a étéNOAA2014[Accès du public aux résultats de la recherche (PARR) directive](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf), qui exige que tousNOAAles données environnementales financées au moyen de l'argent des contribuables doivent être mises à disposition au moyen d'un service de données; (pas seulement des fichiers) dans les 12 mois suivant la création. Il y a donc un intérêt accru à utiliserERDDAP™de rendre les ensembles de données disponibles par un service dès que possible. Nous avions besoin d'un moyen plus efficace de traiter avec un grand nombre de fournisseurs de données.

Commentaires/suggestions? Ce formulaire est nouveau.erd dot data at noaa dot govsi vous avez des commentaires ou des suggestions pour améliorer cela.

### Outils{#tools} 
ERDDAP™est livré avec deux programmes en ligne de commande qui sont des outils pour vous aider à créer le XML pour chaque jeu de données que vous voulezERDDAP™pour servir. Une fois que vous avez installéERDDAP™et lance-le (au moins une fois) , vous pouvez trouver et utiliser ces programmes dans le *Tomcat* répertoire /webapps/erddap/WEB-INF. Il y a des scripts shell Linux/Unix (avec l'extension .sh) et scripts Windows (avec l'extension .bat) pour chaque programme.\\[Sur Linux, exécutez ces outils comme le même utilisateur (Tomcat ?) qui va diriger Tomcat.\\]Lorsque vous exécutez chaque programme, il vous posera des questions. Pour chaque question, tapez une réponse, puis appuyez sur Entrée. Ou appuyez sur ^C pour quitter un programme à tout moment.

#### Le programme ne fonctionnera pas ?{#program-wont-run} 

* Si vous obtenez un programme inconnu (ou similaires) message d'erreur, le problème est probablement que le système d'exploitation ne pouvait pas trouverJava. Vous devez trouver oùJavaest sur votre ordinateur, puis éditer la référence java dans le fichier .bat ou .sh que vous essayez d'utiliser.
* Si vous obtenez un fichier jar non trouvé ou la classe pas trouvé message d'erreur, alorsJavaImpossible de trouver l'une des classes listées dans le fichier .bat ou .sh que vous essayez d'utiliser. La solution est de déterminer où se trouve ce fichier .jar et de modifier la référence java dans le fichier .bat ou .sh.
* Si vous utilisez une version deJavaqui est trop vieux pour un programme, le programme ne sera pas exécuté et vous verrez un message d'erreur comme
Exception dans le fil "main" java.lang.Non supportéClassVersionErreur:
     *un certain/classe/nom* : Version non supportée major.minor *certains nombres*   
La solution est de mettre à jour la version la plus récente deJavaet assurez-vous que le fichier .sh ou .bat pour le programme l'utilise.

#### Les outils impriment divers messages de diagnostic:{#the-tools-print-various-diagnostic-messages} 

* Le mot «ERROR» est utilisé lorsque quelque chose s'est tellement mal passé que la procédure n'a pas été menée à bien. Bien qu'il soit ennuyeux d'obtenir une erreur, l'erreur vous force à traiter le problème.
* Le mot « WARNING » est utilisé lorsque quelque chose a mal tourné, mais la procédure a pu être terminée. C'est assez rare.
* Tout le reste n'est qu'un message informatif. Vous pouvez ajouter \\-verbose au[Générer des ensembles de donnéesXml](#generatedatasetsxml)ou[DasDds](#dasdds)ligne de commande pour obtenir des messages informatifs supplémentaires, ce qui aide parfois à résoudre les problèmes.

Les deux outils sont une grande aide, mais vous devez toujours lire attentivement toutes ces instructions sur cette page et prendre des décisions importantes vous-même.

### Générer des ensembles de donnéesXml{#generatedatasetsxml} 
*    **Générer des ensembles de donnéesXml** est un programme en ligne de commande qui peut générer une ébauche approximative de l'ensemble de données XML pour presque tout type d'ensemble de données.
    
Nous vous recommandons vivement d'utiliser GenerateDatasets Xml au lieu de créer des morceaux dedatasets.xmlà la main parce que:
    
    * Générer des ensembles de données Xml fonctionne en quelques secondes. Faire ça à la main est au moins une heure de travail, même quand vous savez ce que vous faites.
    * Générer des ensembles de données Xml fait un meilleur travail. Pour ce faire, il faut avoir une connaissance approfondie de la façon dontERDDAP™fonctionne. Il est peu probable que vous fassiez un meilleur travail à la main. (Bob Simons utilise toujours GenerateDatasets Xml pour la première ébauche, et il a écritERDDAP.) 
    * Générer des ensembles de données Xml génère toujours un morceau valide dedatasets.xml. Tout morceau dedatasets.xmlque vous écrivez aura probablement au moins quelques erreurs qui empêchentERDDAP™du chargement de l'ensemble de données. Il faut souvent des heures pour diagnostiquer ces problèmes. Ne perdez pas votre temps. Laisser naître Données Xml fait le dur labeur. Ensuite, vous pouvez affiner le .xml à la main si vous voulez.
    
Lorsque vous utilisez les ensembles de donnéesGénérer Programme Xml :
    
    * Sur Windows, la première fois que vous exécutez GenerateDatasetsXml, vous devez modifier le fichier GenerateDatasetsXml.bat avec un éditeur de texte pour changer le chemin vers le java. exe fichier pour que Windows puisse trouverJava.
    * Générer des ensembles de données Xml vous demande d'abord de spécifier le type EDD (Ensemble de données Erd Dap Type) des données. Voir[Liste des types de données](#list-of-types-datasets)  (dans le présent document) pour déterminer le type approprié pour l'ensemble de données sur lequel vous travaillez. En plus des types EDD réguliers, il ya aussi quelques[Types de données spéciales/de Pseudo](#specialpseudo-dataset-types)  (Par exemple, celui qui rampe un catalogue THREDS pour générer un morceau dedatasets.xmlpour chacun des ensembles de données du catalogue) .
    * Générer des ensembles de données Xml vous pose ensuite une série de questions spécifiques à ce type EDD. Les questions recueillent les informations nécessaires pourERDDAP™pour accéder à la source de l'ensemble de données. Pour comprendreERDDAP™est demandé, voir la documentation pour le type EDD que vous avez spécifié en cliquant sur le même type de données dans le[Liste des types de données](#list-of-types-datasets).
        
Si vous avez besoin d'entrer une chaîne avec des caractères spéciaux (Par exemple, caractères d'espace blanc au début ou à la fin, caractères non ASCII) , entrez une[Chaîne de style JSON](https://www.json.org/json-en.html)  (avec des caractères spéciaux échappés avec des caractères \\) . Par exemple, pour entrer juste un caractère d'onglet, saisissez "\\t" (avec les guillemets doubles qui entourent, qui indiquentERDDAP™que c'est une corde de style JSON.
        
    * Souvent, une de vos réponses ne sera pas ce dont GenerateDatasetsXml a besoin. Vous pouvez alors essayer à nouveau, avec des réponses révisées aux questions, jusqu'à ce que GenerateDatasets Xml peut trouver et comprendre avec succès les données sources.
    * Si vous répondez correctement aux questions (ou suffisamment correctement) , Générer des ensembles de données Xml se connecte à la source de l'ensemble de données et recueille des informations de base (Par exemple, noms variables et métadonnées) .
Pour les ensembles de données qui proviennentNetCDF .ncet fichiers connexes, Générer des ensembles de données Xml va souvent imprimer la structure ncdump-like du fichier après qu'il ait d'abord lu le fichier. Cela peut vous donner des informations pour mieux répondre aux questions sur une boucle ultérieure via GenerateDatasetsXml.
    * Générer des ensembles de données Xml générera ensuite une ébauche de l'ensemble de données XML pour cet ensemble de données.
    * Les informations diagnostiques et l'ébauche approximative de l'ensemble de données XML seront écrites à *BigParent Directory* /logs/GenerateDatasetsXml.log .
    * L'ébauche approximative de l'ensemble de données XML sera écrite à *BigParent Directory* /logs/GenerateDatasetsXml.out .
#### "0 fichiers" Message d'erreur{#0-files-error-message} 
Si vous exécutez GenerateDatasets Xml ou[DasDds](#dasdds), ou si vous essayez de charger unEDDGridDe...Files ou EDDTableDe... FichiersERDDAP™, et vous obtenez un message d'erreur "0 fichiers" indiquant queERDDAP™trouvé 0 fichiers correspondants dans le répertoire (lorsque vous pensez qu'il y a des fichiers correspondants dans ce répertoire) :
* Vérifiez que vous avez spécifié le nom complet du répertoire. Et si vous avez spécifié le nom du fichier, assurez-vous de spécifier le nom complet du fichier, y compris le nom complet du répertoire.
* Vérifiez que les fichiers sont vraiment dans ce répertoire.
* Vérifiez l'orthographe du nom du répertoire.
* Vérifiez le fichierNameRegex. C'est vraiment, vraiment facile de faire des erreurs avec les régexes. Pour le test, essayez le regex .\\* qui doit correspondre à tous les noms de fichiers. (Voir ceci[documentation régex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)et[tutoriel regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
* Vérifiez que l'utilisateur qui exécute le programme (Par exemple, user=tomcat (?) pour Tomcat/ERDDAP) a la permission de lire ces fichiers.
* Dans certains systèmes d'exploitation (par exemple, SELinux) et selon les paramètres du système, l'utilisateur qui a exécuté le programme doit avoir la permission de lire pour toute la chaîne de répertoires menant au répertoire qui possède les fichiers.


* Si vous avez des problèmes que vous ne pouvez pas résoudre,[demande de soutien](/docs/intro#support)avec autant d'informations que possible. De même, s'il semble que le type EDD approprié pour un ensemble de données donné ne fonctionne pas avec cet ensemble de données, ou s'il n'y a pas de type EDD approprié, veuillez déposer un[Numéro sur GitHub](https://github.com/ERDDAP/erddap/issues)avec les détails (et un exemple de fichier le cas échéant) .
         
#### Vous devez modifier la sortie à partir de GenerateDatasets Xml pour le rendre meilleur.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* - Oui.
LE CHUNK DEdatasets.xmlMADE BE Générer des ensembles de données Xml n'est pas parfait. Vous devez lire et éditer le XML avant de l'utiliser dans un publicERDDAP. Générer des ensembles de données Xml se rattache à un tas de règles qui ne se corrompent pas toujours. Vous êtes responsable d'assurer la cohérence du XML auquel vous avez ajoutéERDDAP'Sdatasets.xmlDOSSIER.
    
     (Fait amusant: Je ne crie pas. Pour des raisons juridiques historiques, les avertissements doivent être écrits dans tous les plafonds.) 
    
La sortie de GenerateDatasetsXml est une ébauche grossière.
Vous aurez presque toujours besoin de l'éditer.
Nous avons fait et continuons à faire un énorme effort pour rendre la production aussi prête que possible, mais il y a des limites. Souvent, l'information nécessaire n'est tout simplement pas disponible à partir des métadonnées sources.
    
Un problème fondamental est que nous demandons un programme d'ordinateur (Générer des ensembles de donnéesXml) faire une tâche où, si vous avez donné la même tâche à 100 personnes, vous obtiendrez 100 résultats différents. Il n'y a pas de réponse "juste". Évidemment, le programme vient le plus près de la lecture de l'esprit de Bob (Pas le vôtre) , mais même ainsi, ce n'est pas un programme d'IA tout à fait compris, juste un tas d'heuristiques pavées ensemble pour faire une tâche similaire à l'IA. (Ce jour d'un programme d'IA tout compris peut venir, mais il ne l'a pas encore fait. Si c'est le cas, les humains pourraient avoir de plus gros problèmes. Faites attention à ce que vous voulez.) 
    
* Pour information, la sortie affiche la source globaleAttributes et la source variableAttributes sous forme de commentaires.ERDDAP™combine sourceAttributes etaddAttributes  (qui ont priorité) pour faire le combiné Attributs qui sont affichés à l'utilisateur. (Et d'autres attributs sont automatiquement ajoutés aux variables longitude, latitude, altitude, profondeur et temps lorsqueERDDAP™fait réellement l'ensemble de données) .
     
* Si vous n'aimez pas un sourceAttribute, écrasez-le en ajoutant un addAttribute avec le même nom mais une valeur différente (ou aucune valeur, si vous voulez la supprimer) .
     
* Tous lesaddAttributessont des suggestions générées par ordinateur. Editez-les &#33; Si vous n'aimez pas addAttribute, changez-le.
     
* Si vous voulez ajouter d'autresaddAttributes, ajoutez-les.
     
* Si vous voulez changer undestinationNameÇa change. Mais ne changez passourceNamePar.
     
* Vous pouvez changer l'ordre dudataVariables ou en retirer un.


    * Vous pouvez alors utiliser[DasDds](#dasdds)  (voir ci-dessous) de tester à plusieurs reprises le XML pour cet ensemble de données pour s'assurer que l'ensemble de données résultant apparaît comme vous le souhaitez dansERDDAP.
    * N'hésitez pas à apporter de petits changementsdatasets.xmlun morceau qui a été généré, par exemple, fournit une meilleureinfoUrl, résumé ou titre.
#### Ne pas ajouter de noms standard{#donotaddstandardnames} 
Si vous incluez \\-doNotAddStandardNames comme paramètre de ligne de commande lorsque vous exécutez générer Données Xml, générer Données Xml n'ajoutera passtandard\\_nameauxaddAttributespour toute variable autre que des variables nommées latitude, longitude, altitude, profondeur ou temps (qui sont évidentesstandard\\_names) . Cela peut être utile si vous utilisez la sortie de générer Données Xml directement dansERDDAP™sans modifier la sortie, car générer Données Xml devine souventstandard\\_names incorrectement. (Notez que nous vous recommandons toujours de modifier la sortie avant de l'utiliser dansERDDAP.) L'utilisation de ce paramètre aura d'autres effets mineurs liés parce que le devinéstandard\\_nameest souvent utilisé à d'autres fins, par exemple pour créer une nouvellelong\\_name, et pour créer les paramètres colorBar .
#### Scénario{#scripting} 
Comme alternative à répondre aux questions interactivement au clavier et en boucle pour générer des ensembles de données supplémentaires, vous pouvez fournir des arguments en ligne de commande pour répondre à toutes les questions pour générer un ensemble de données. Générer des ensembles de données Xml traitera ces paramètres, écrira la sortie dans le fichier de sortie et quittera le programme.
        
Pour le configurer, utilisez d'abord le programme en mode interactif et écrivez vos réponses. Voici un exemple partiel :
Disons que vous exécutez le script : ./GenerateDatasetsXml.sh
Puis entrez: EDDTableFromAsciiFiles
Puis entrez: /u00/data/
Puis saisissez: .\\*\\.asc
Puis entrez: /u00/data/sampleFile.asc
Puis entrez: ISO-8859-1
        
Pour l'exécuter de manière non interactive, utilisez cette ligne de commande :
./GenerateDatasetsXml.sh EDDTableFromAsciiFiles /u00/data/ .\\*\\.asc /u00/data/sampleFile.asc ISO-8859-1
Donc, en gros, vous énumérez toutes les réponses sur la ligne de commande.
Ceci devrait être utile pour les ensembles de données qui changent fréquemment d'une manière qui nécessite la ré-exécution de GenerateDatasets Xml (notammentEDDGridDeThreddsCatalog) .
        
Détails:

* Si un paramètre contient un espace ou un caractère spécial, encoder le paramètre comme un[Chaîne de style JSON](https://www.json.org/json-en.html), par exemple, "mon paramètre avec des espaces et deux\\nles lignes".
* Si vous voulez spécifier une chaîne vide comme paramètre, utilisez : rien
* Si vous voulez spécifier la valeur par défaut d'un paramètre, utilisez : par défaut
             
* Générer des ensembles de données Xml supporte a -i *ensembles de données Nom Xml* ♪ *Nom du tag* paramètre ligne de commande qui insère la sortie dans le paramètre spécifiédatasets.xmlfichier (par défaut *Tomcat* /content/erddap/datasets.xml) . Générer des ensembles de données Xml recherche deux lignes dans les ensembles de données Nom Xml :
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
et
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
et remplace tout entre ces lignes par le nouveau contenu, et change le certainDatetime.
* L'interrupteur -i est seulement traité (et changements apportésdatasets.xmlne sont fabriqués que) si vous exécutez GenerateDatasets Xml avec des arguments en ligne de commande qui spécifient toutes les réponses à toutes les questions pour une boucle du programme. (Voir "Scripting" ci-dessus.)   (La pensée est : Ce paramètre est à utiliser avec les scripts. Si vous utilisez le programme en mode interactif (dactylographie des informations sur le clavier) , vous êtes susceptible de générer des morceaux incorrects de XML avant de générer celui que vous voulez.) 
* Si les lignes Begin et Fin ne sont pas trouvées, alors ces lignes et le nouveau contenu sont insérés juste avant&lt;/erddapDatasets&gt;.
* Il y a aussi un -I (capital i) switch à des fins de test qui fonctionne comme -i, mais crée un fichier appelédatasets.xml *DateHeure* et ne modifie pasdatasets.xml.
* N'exécutez pas GenerateDatasets Xml avec -i en deux processus à la fois. Il y a une chance qu'un seul ensemble de changements soit conservé. Il peut y avoir de sérieux problèmes (par exemple, fichiers corrompus) .
    
Si vous utilisez "GenerateDatasetsXml -verbose", il va imprimer plus de messages de diagnostic que d'habitude.
    
#### Types de données spéciales/de Pseudo{#specialpseudo-dataset-types} 
En général, les options EDDType dans GenerateDatasets Match Xml des types EDD décrits dans ce document (voir[Liste des types de données](#list-of-types-datasets)) et générer undatasets.xmlpour créer un ensemble de données à partir d'une source de données spécifique. Il y a quelques exceptions et cas particuliers:
    
##### EDDGridDeErddap{#eddgridfromerddap} 
Cette EDDType génère tous lesdatasets.xmldes morceaux nécessaires pour faire[EDDGridDeErddap](#eddfromerddap)ensembles de données de tous lesEDDGriddatasets dans une télécommandeERDDAP. Vous aurez la possibilité de garder l'originaldatasetIDs (qui peuvent faire double emploidatasetIDS déjà dans votreERDDAP) ou de générer de nouveaux noms qui seront uniques (mais généralement ne sont pas aussi lisibles par l'homme) .
     
##### EDDTableDeErddap{#eddtablefromerddap} 
Cette EDDType génère tous lesdatasets.xmldes morceaux nécessaires pour faire[EDDTableDeErddap](#eddfromerddap)ensembles de données de tous les ensembles de données EDDTable dans une télécommandeERDDAP. Vous aurez la possibilité de garder l'originaldatasetIDs (qui peuvent faire double emploidatasetIDS déjà dans votreERDDAP) ou de générer de nouveaux noms qui seront uniques (mais généralement ne sont pas aussi lisibles par l'homme) .
     
##### EDDGridDeThreddsCatalog{#eddgridfromthreddscatalog} 
Cette EDDType génère tous lesdatasets.xmldes morceaux nécessaires pour tous les[EDDGridDeDap](#eddgridfromdap)ensembles de données qu'il peut trouver en rampant récursivement à travers un THREDS (sous) catalogue. Il existe de nombreuses formes d'URL du catalogue THREDS. Cette option nécessite une URL THREDS .xml avec /catalog/ dedans, par exemple,
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xml ou
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml   
(un catalogue .html associé est à
 https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html , qui n'est pas acceptable pourEDDGridDeThreddsCatalog).
Si vous avez des problèmes avecEDDGridDe Threddes Catalogue :
* Assurez-vous que l'URL que vous utilisez est valide, inclut /catalog/, et se termine par /catalog.xml .
* Si possible, utilisez une adresse IP publique (par exemple, https://oceanwatch.pfeg.noaa.gov ) dans l'URL, pas une adresse IP numérique locale (par exemple, https://12.34.56.78 ) . Si le THREDDS est uniquement accessible via l'adresse IP numérique locale, vous pouvez utiliser [&lt;convertirEnSourcePublicUrl&gt;] (#convertir les ressources publiques) doncERDDAP™les utilisateurs voient l'adresse publique, même siERDDAP™obtient les données de l'adresse numérique locale.
* Si vous avez des problèmes que vous ne pouvez pas résoudre,[vérifier les conseils de dépannage](#troubleshooting-tips).
* Le code de bas niveau pour cela utilise maintenant leUnidatanetcdf-java catalogue code de rampe (Des batteurs. classes de catalogue) afin qu'il puisse gérer tous les catalogues THREDS (qui peut être étonnamment complexe) Grâce àUnidatapour ce code.
         
##### EDDGridLonPM180DeErddapCatalog{#eddgridlonpm180fromerddapcatalog} 
Ce type EDD génère ledatasets.xmlà faire[EDDGridLonPM180](#eddgridlonpm180)ensembles de données de tous lesEDDGridensembles de donnéesERDDAPqui ont des valeurs de longitude supérieures à 180.
* Si possible, utilisez une adresse IP publique (par exemple, https://oceanwatch.pfeg.noaa.gov ) dans l'URL, pas une adresse IP numérique locale (par exemple, https://12.34.56.78 ) . SiERDDAP™est uniquement accessible via l'adresse IP numérique locale, vous pouvez utiliser [&lt;convertirEnSourcePublicUrl&gt;] (#convertir les ressources publiques) doncERDDAP™les utilisateurs voient l'adresse publique, même siERDDAP™obtient les données de l'adresse numérique locale.
         
##### EDDGridLon0360DeErddapCatalog{#eddgridlon0360fromerddapcatalog} 
Ce type EDD génère ledatasets.xmlà faire[EDDGridLon0360](#eddgridlon0360)ensembles de données de tous lesEDDGridensembles de donnéesERDDAPdont la longitude est inférieure à 0.
* Si possible, utilisez une adresse IP publique (par exemple, https://oceanwatch.pfeg.noaa.gov ) dans l'URL, pas une adresse IP numérique locale (par exemple, https://12.34.56.78 ) . SiERDDAP™est uniquement accessible via l'adresse IP numérique locale, vous pouvez utiliser [&lt;convertirEnSourcePublicUrl&gt;] (#convertir les ressources publiques) doncERDDAP™les utilisateurs voient l'adresse publique, même siERDDAP™obtient les données de l'adresse numérique locale.
         
##### EDDFromFiles{#eddsfromfiles} 
Avec un répertoire de démarrage, cela traverse le répertoire et tous les sous-répertoires et tente de créer un ensemble de données pour chaque groupe de fichiers de données qu'il trouve.
* Cela suppose que lorsqu'un ensemble de données est trouvé, l'ensemble de données comprend tous les sous-répertoires.
* Si un ensemble de données est trouvé, des répertoires similaires seront traités comme des ensembles de données séparés. (Par exemple, les répertoires pour les années 1990, les années 2000, les années 2010, généreront des ensembles de données distincts) . Ils devraient être faciles à combiner à la main -- il suffit de changer le premier ensemble de données&lt;fileDir&gt; vers le répertoire parent et supprimer tous les ensembles de données suivants.
* Cela va seulement essayer de générer un morceau dedatasets.xmlpour le type d'extension de fichier le plus courant dans un répertoire (sans compter .md5, qui est ignoré) . Donc, donné un répertoire avec 10.ncfichiers et 5 fichiers .txt, un ensemble de données sera généré pour le.ncfichiers seulement.
* Cela suppose que tous les fichiers d'un répertoire avec la même extension appartiennent au même ensemble de données. Si un répertoire en a.ncfichiers avec des données SST et certains.ncfichiers avec des données de chlorophylle, juste un échantillon.ncfichier sera lu (Ça va ? chlorophylle ?) et un seul jeu de données sera créé pour ce type de fichier. Cet ensemble de données échouera probablement à charger en raison des complications d'essayer de charger deux types de fichiers dans le même ensemble de données.
* S'il y a moins de 4 fichiers avec l'extension la plus courante dans un répertoire, cela suppose qu'ils ne sont pas des fichiers de données et saute simplement le répertoire.
* S'il y a 4 fichiers ou plus dans un répertoire, mais cela ne peut pas générer un morceau dedatasets.xmlpour les fichiers (par exemple, un type de fichier non supporté) , cela générera une[EDDTableFromFileNames](#eddtablefromfilenames)dataset pour les fichiers.
* À la fin des diagnostics que ceci écrit au fichier journal, juste avant ledatasets.xmldes morceaux, cela va imprimer une table avec un résumé des informations recueillies en traversant tous les sous-répertoires. Le tableau listera chaque sous-répertoire et indiquera le type d'extension de fichier le plus courant, le nombre total de fichiers et le type de jeu de données créé pour ces fichiers. (le cas échéant) . Si vous êtes confronté à une structure de fichier complexe et profondément imbriquée, pensez à exécuter GenerateDatasets Xml avec EDDType=EDDsFromFiles juste pour générer cette information,
* Cette option peut ne pas faire un grand travail de deviner le meilleur EDDType pour un groupe donné de fichiers de données, mais il est rapide, facile, et vaut la peine d'essayer. Si les fichiers sources sont appropriés, il fonctionne bien et est une bonne première étape dans la génération de ladatasets.xmlpour un système de fichiers avec beaucoup de sous-répertoires, chacun avec des fichiers de données de différents ensembles de données.
         
##### EDDTableFromEML et EDDTableFromEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
Ces EDDType spéciaux génère ladatasets.xmlpour faire une[EDDTableFromAsciiFiles](#eddtablefromasciifiles)dataset de chacun des tableaux[Langue des métadonnées écologiques](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)Fichier XML. La variante « Lot » fonctionne sur tous les fichiers EML dans un répertoire local ou distant. Veuillez voir les[documentation pour EDDTableFromEML](/docs/server-admin/EDDTableFromEML).
     
##### EDDTableD'InPort{#eddtablefrominport} 
Cette spéciale EDDType génère ladatasets.xmlpour faire une[EDDTableFromAsciiFiles](#eddtablefromasciifiles)l'ensemble des données figurant dans les[inport-xml](https://inport.nmfs.noaa.gov/inport)fichier. Si vous pouvez accéder au fichier de données source (le fichier inport-xml devrait avoir des indices pour le trouver) , vous pouvez faire un ensemble de données de travail dansERDDAP.

Les étapes suivantes décrivent comment utiliser GenerateDatasets Xml avec un fichier inport-xml afin d'obtenir un jeu de données de travail dansERDDAP.

1. Une fois que vous avez accès au fichier inport-xml (soit comme URL ou un fichier local) : exécuter Générer des ensembles de données Xml, spécifiez EDDType=EDDTableFromInPort, spécifiez l'URL inport-xml ou le nom complet du fichier, spécifiez quel enfant=0, et spécifiez les autres informations demandées (si connu) . (À ce stade, vous n'avez pas besoin d'avoir le fichier de données source ou de spécifier son nom.) Le paramètre queChild=0 indique Générer des ensembles de données Xml pour écrire les informations pour **Tous** des&lt;entité-attribut-information&gt;&lt;entity&gt; est dans le fichier inport-xml (s'il y a) . Il imprime également un résumé des informations de fond, y compris tous les téléchargements-url listés dans le fichier inport-xml.
2. Regardez toutes ces informations. (y compris les informations générales qui génèrent des ensembles de données Impressions Xml) et visitez le téléchargement-url (s) pour essayer de trouver le fichier de données source (s) . Si vous pouvez le trouver (eux) , télécharger (eux) dans un répertoire accessible àERDDAP. (Si vous ne trouvez aucun fichier source de données, il n'y a pas de raison de procéder.) 
3. Exécuter Générer Données Encore Xml.
Si le fichier de données source correspond à l'un des fichiers inport-xml&lt;entité-attribut-information&gt;&lt;entity&gt;'s, spécifiez quel enfant= *Numéro de cette entité*   (Par exemple, 1, 2, 3, ...) .ERDDAP™tentera de faire correspondre les noms des colonnes du fichier de données source aux noms des informations de l'entité, et invitera à accepter/rejeter/fixer toute anomalie.
Ou, si le fichier inport-xml n'en a pas&lt;entité-attribut-information&gt;&lt;entity&gt;'s, spécifiez quel enfant=0.
4. Dans la partie dedatasets.xmlqui a été fait par GenerateDatasets Xml, réviser le&lt;addAttributes&gt;] (#attributs globaux) selon les besoins/désirés.
5. Dans la partie dedatasets.xmlqui a été fait par GenerateDatasetsXml, ajouter/réviser le [&lt;dataVariable&gt;] (#donnéesvariables) l'information nécessaire/désirée pour décrire chacune des variables. Assurez-vous d'identifier correctement chaque variable
[&lt;sourceName&gt;] (#Nom de la source)   (comme il apparaît dans la source) ,
[&lt;destinationName&gt;] (Nom de destination)   (qui a plus de limites sur les caractères autorisés quesourceName) ,
[&lt;unités&gt;] (#unités)   (surtout si c'est un[variable temps ou timestamp](#timestamp-variables)où les unités doivent spécifier le format) et
[&lt;missing\\_value&gt;] (#valeur manquante) ,
6. Lorsque vous êtes près de terminer, utilisez[DasDds](#dasdds)outil pour voir rapidement si la description de l'ensemble de données est valide et si l'ensemble de données apparaîtra dansERDDAP™comme tu veux.
     

Il serait bon que les groupes utilisant InPort documentent leurs ensembles de donnéesERDDAP™de rendre disponibles les données réelles:

*   ERDDAP™est une solution qui peut être utilisée dès maintenant afin que vous puissiez remplirNOAA's[Accès du public aux résultats de la recherche (PARR) exigences](https://nosc.noaa.gov/EDMC/PD.DSP.php)en ce moment, pas à un moment vague à l'avenir.
*   ERDDAP™met les données réelles à la disposition des utilisateurs, pas seulement les métadonnées. (À quoi servent les métadonnées sans données?) 
*   ERDDAP™prend en charge les métadonnées (notamment, les unités de variables) , contrairement à d'autres logiciels de serveur de données à l'étude. (À quoi sert les données sans métadonnées?) Utiliser un logiciel qui ne supporte pas les métadonnées est d'inviter les données à être mal comprises et mal utilisées.
*   ERDDAP™est un logiciel libre et open-source contrairement à d'autres logiciels qui sont considérés. Développement en coursERDDAP™est déjà payé. AppuiERDDAP™les utilisateurs sont libres.
*   ERDDAP'l'apparence peut être facilement personnalisé pour refléter et mettre en valeur votre groupe (pasERDouERDDAP) .
*   ERDDAP™offre un moyen cohérent d'accéder à tous les ensembles de données.
*   ERDDAP™peut lire des données de nombreux types de fichiers de données et de bases de données relationnelles.
*   ERDDAP™peut traiter de gros ensembles de données, y compris des ensembles de données où les données sources se trouvent dans de nombreux fichiers de données.
*   ERDDAP™peut écrire des données à de nombreux types de fichiers de données, à la demande de l'utilisateur, y compris des types de fichiers de données scientifiques comme netCDF, ESRI .csv, etODV .txt.
*   ERDDAP™peut faire des graphiques personnalisés et des cartes de sous-ensembles des données, en fonction des spécifications de l'utilisateur.
*   ERDDAP™peut traiter des ensembles de données autres que les données telles que des collections d'images, de vidéos ou de fichiers audio.
*   ERDDAP™a été installé et utilisé à[plus de 60 institutions dans le monde](/#who-uses-erddap).
*   ERDDAP™est listé comme l'un des serveurs de données recommandés pour une utilisation dansNOAAdans le[NOAADirective procédurale sur l'accès aux données](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations), contrairement à d'autres logiciels qui sont considérés.
*   ERDDAP™est un produit deNMFS/NOAA, donc l'utiliser dansNMFSetNOAAdevrait être un point de fierté pourNMFSetNOAA.

Veuillez donnerERDDAP™un essai. Si vous avez besoin d'aide, veuillez poster un message dans leERDDAP™Groupe Google.
     
##### ajouterFillValueAttributes{#addfillvalueattributes} 
Cette option spéciale EDDType n'est pas un type de jeu de données. C'est un outil qui peut ajouter des attributs \\_FillValue à certaines variables de certains ensembles de données. Voir[ajouterFillValueAttributes](#add-_fillvalue-attributes).
     
##### trouverDupliquer Heure{#findduplicatetime} 
Cette option spéciale EDDType n'est pas un type de jeu de données. Au lieu de cela, il indique GenerateDatasets Xml pour rechercher à travers une collection de grilles.nc  (et connexes) fichiers pour trouver et imprimer une liste de fichiers avec des valeurs de temps dupliquées. Quand il regarde les valeurs de temps, il les convertit des unités originales en"seconds since 1970-01-01"dans le cas où différents fichiers utilisent des chaînes d'unités différentes. Vous devez fournir le répertoire de départ (avec ou sans la barre oblique) , le nom du fichier expression régulière (Par exemple,.nc ) , et le nom de la variable de temps dans les fichiers.
     
##### ncdump{#ncdump} 
Cette option spéciale EDDType n'est pas un type de jeu de données. Au lieu de cela, il indique GenerateDatasets Xml pour imprimer[ncdump](https://linux.die.net/man/1/ncdump)\\-comme impression d'un.nc,.ncml, ou.hdffichier. En fait, il utilise le netcdf-java[NCdump](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html), qui est un outil plus limité que la version C de NCdump. Si vous utilisez cette option, GenerateDatasetsXml vous demandera d'utiliser une des options: "-h" (en-tête) , "-c" (coordonnées) "-vall" (par défaut) , "-v var1;var2", "-v var1 (0,010,0:20) ". C'est utile parce que, sans ncdump, il est difficile de savoir ce qui est dans un.nc,.ncml, ou.hdffichier et donc quel EDDType vous devez spécifier pour GenerateDatasets Xml. Pour.ncml fichier, cela va imprimer la sortie ncdump pour le résultat de la.ncml modifications de fichier appliquées au sous-jacent.ncou.hdffichier.
         
### DasDds{#dasdds} 
*   [ **DasDds** ](#dasdds)est un programme en ligne de commande que vous pouvez utiliser après avoir créé une première tentative au XML pour un nouvel ensemble de données dansdatasets.xml. Avec DasDds, vous pouvez tester et affiner le XML à plusieurs reprises. Lorsque vous utilisez le programme DasDds:
    1. Sous Windows, la première fois que vous exécutez DasDds, vous devez modifier les DasDds. fichier bat avec un éditeur de texte pour changer le chemin vers le java. exe fichier pour que Windows puisse trouverJava.
    2. DasDds vous demandedatasetIDpour le jeu de données sur lequel vous travaillez.
    3. DasDds essaie de créer l'ensemble de données avec celadatasetID.
        * DasDds imprime toujours beaucoup de messages diagnostiques.
Si vous utilisez "DasDds -verbose", DasDds va imprimer plus de messages de diagnostic que d'habitude.
        * Pour la sécurité, DasDds supprime toujours toutes les informations de l'ensemble de données en cache (fichiers) pour le jeu de données avant d'essayer de créer le jeu de données. C'est l'équivalent d'un réglage[drapeau dur](/docs/server-admin/additional-information#hard-flag)Ainsi, pour les ensembles de données agrégés, vous pouvez modifier temporairement le fichierNameRegex pour limiter le nombre de fichiers trouvés par le constructeur de données.
        * Si l'ensemble de données ne se charge pas (pour quelque raison que ce soit) , DasDds s'arrêtera et vous montrera le message d'erreur pour la première erreur qu'il trouve.
             **N'essayez pas de deviner le problème. Lisez attentivement le message ERROR.**   
Si nécessaire, lisez les messages de diagnostic précédents pour trouver plus d'indices et d'informations, aussi.
        *    **Modifier le XML de l'ensemble de données pour essayer de résoudre ce problème**   
et laissez DasDds essayer de créer à nouveau le jeu de données.
        *    **Si vous résolvez chaque problème à plusieurs reprises, vous finirez par résoudre tous les problèmes**   
et l'ensemble de données sera chargé.
    4. Toutes les sorties DasDds (diagnostics et résultats) sont écrits à l'écran et à *BigParent Directory* /logs/DasDds.log .
    5. Si DasDds peut créer le jeu de données, DasDds vous montrera[.das (Structure des attributs de données) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das),[.dds (Descripteur de données Structure) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds)et[.timeGaps (Lacunes temporelles) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)informations pour l'ensemble de données sur votre écran et les écrire à *BigParent Directory* /logs/DasDds.out .
    6. Souvent, vous voudrez faire un petit changement au XML de l'ensemble de données pour nettoyer les métadonnées de l'ensemble de données et rediriger DasDds.

### Bonus Outil tiers :ERDDAP-Lint{#bonus-third-party-tool-erddap-lint} 
ERDDAP-lint est un programme de Rob Fuller et Adam Leadbetter de l'Irish Marine Institute que vous pouvez utiliser pour améliorer les métadonnées de votreERDDAP™les ensembles de données.ERDDAP-lint "contient des règles et une simple application web statique pour exécuter certains tests de vérification contre votreERDDAP™serveur. Tous les tests sont exécutés dans le navigateur web." Comme le[Outil de lint Unix/Linux](https://en.wikipedia.org/wiki/Lint_(software)), vous pouvez modifier les règles existantes ou ajouter de nouvelles règles. Voir[ERDDAP-Lint](https://github.com/IrishMarineInstitute/erddap-lint)pour plus d'informations.

Cet outil est particulièrement utile pour les ensembles de données que vous avez créés il y a quelque temps et que vous voulez maintenant mettre à jour avec vos préférences actuelles en matière de métadonnées. Par exemple, les premières versions de GenerateDatasets Xml n'a pas fait d'efforts pour créer un mondecreator\\_name,creator\\_email, type de créateur, oucreator\\_urlmétadonnées. Vous pourriez utiliserERDDAP-Intégrer les ensembles de données qui manquent de ces attributs de métadonnées.

Merci à Rob et Adam pour avoir créé cet outil et l'avoir mis à la disposition duERDDAP™communautaire.
 
## La structure de basedatasets.xmlFichier{#the-basic-structure-of-the-datasetsxml-file} 
Les étiquettes obligatoires et optionnelles autorisées dans unedatasets.xmlfichier (et le nombre de fois qu'ils peuvent apparaître) sont indiqués ci-dessous. En pratique, votredatasets.xmlaura beaucoup de&lt;tags de dataset&gt; et n'utiliser que les autres tags&lt;erddapDatasets&gt; au besoin.

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

Il est possible que d'autres encodages soient autorisés à l'avenir, mais pour l'instant, seul ISO-8859-1 est recommandé.
 
### XInclure{#xinclude} 
Nouveau dans la version 2.25 est le support de XInclude. Cela exige que vous utilisiez l'analyseur SAX&lt;utiliserSaxParser&gt;true&lt;/useSaxParser&gt; dans votre setup.xml. Cela peut vous permettre d'écrire chaque ensemble de données dans son propre fichier, puis les inclure tous dans le principaldatasets.xml, réutiliser des parties des définitions des ensembles de données, ou les deux. Si vous voulez voir un exemple,[EDDTestDataset.java](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java)crée XInclure pour réutiliser les définitions de variables.
 

- - Oui.

## Annexe{#notes} 

Travailler avec lesdatasets.xmlfichier est un projet non-trivial. Veuillez lire attentivement toutes ces notes. Après avoir choisi[type d'ensemble de données](#list-of-types-datasets), veuillez lire attentivement la description détaillée de celui-ci.
     
### Choix du type de données{#choosing-the-dataset-type} 
Dans la plupart des cas, il n'y en a qu'unERDDAP™type d'ensemble de données approprié pour une source de données donnée. Dans quelques cas (Par exemple,.ncfichiers) , il ya quelques possibilités, mais généralement l'un d'entre eux est certainement meilleur. La première et la plus grande décision que vous devez prendre est: est-il approprié de traiter l'ensemble de données comme un groupe de tableaux multidimensionnels (Si oui, voir[EDDGridtypes de données](#eddgrid)) ou comme tableau de données similaire à une base de données (Si oui, voir[Types de données EDDTable](#eddtable)) .
     
### Le service des données{#serving-the-data-as-is} 
Habituellement, il n'est pas nécessaire de modifier la source de données (Par exemple, convertir les fichiers en un autre type de fichier) de sorte queERDDAP™peut le servir. Une des hypothèses deERDDAP™est que la source de données sera utilisée telle quelle. D'habitude, ça marche bien. Voici quelques exceptions:
* Bases de données relationnelles et Cassandra --ERDDAP™peut servir les données directement à partir des bases de données relationnelles et de Cassandra. Mais pour les problèmes de sécurité, d'équilibrage de charge et de performance, vous pouvez choisir de configurer une autre base de données avec les mêmes données ou enregistrer les données àNetCDFv3.ncfichiers et ontERDDAP™servir les données de la nouvelle source de données. Voir[EDDTableFromDatabase](#eddtablefromdatabase)et[EDDTableDeCassandra](#eddtablefromcassandra).
* Sources de données non prises en charge --ERDDAP™peut supporter un grand nombre de types de sources de données, mais le monde est rempli de 1000 (Des millions ?) de différentes sources de données (notamment, les structures des fichiers de données) . SiERDDAP™ne supporte pas votre source de données :
    * Si la source de données estNetCDF .ncfichiers, vous pouvez utiliser[NcML](#ncml-files)pour modifier les fichiers de données à la volée, ou utiliser[NCO](#netcdf-operators-nco)modifier définitivement les fichiers de données.
    * Vous pouvez écrire les données à un type de source de données quiERDDAP™soutien.NetCDF-3.ncfichiers sont une bonne recommandation générale parce qu'ils sont des fichiers binaires quiERDDAP™peut lire très rapidement. Pour les données tabulaires, envisager de stocker les données dans une collection de.ncfichiers qui utilisent les[FC Géométries d'échantillonnage discrètes (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Structures de données d'array contigües et peut être manipulé avecERDDAP's[EDDTableFromNcCFFiles](#eddtablefromnccffiles)) . S'ils sont organisés logiquement (avec des données pour un morceau d'espace et de temps) ,ERDDAP™peut extraire les données très rapidement.
    * Vous pouvez demander que le support de cette source de données soit ajouté àERDDAP™par courriel à Chris. John à noaa.gov.
    * Vous pouvez ajouter le support de cette source de données en écrivant le code pour le gérer vous-même. Voir[desERDDAP™Guide du programmeur](/docs/contributing/programmer-guide)
* Régime...ERDDAP™peut lire les données de certaines sources de données beaucoup plus rapidement que d'autres. Par exemple, lireNetCDFv3.ncfichiers est rapide et la lecture des fichiers ASCII est plus lente. Et s'il y a un grand (&gt; 1000) ou énorme (&gt; 10 000) nombre de fichiers de données sources,ERDDAP™répondra lentement à certaines demandes de données. Habituellement, la différence n'est pas perceptible pour les humains. Cependant, si vous pensezERDDAP™est lent pour un ensemble de données donné, vous pouvez choisir de résoudre le problème en écrivant les données à une configuration plus efficace (généralement: quelques-uns, bien structurés,NetCDFv3.ncfichiers) . Pour les données tabulaires, voir[ce conseil](#millions-of-files).
         
### Conseil{#hint} 
Il est souvent plus facile de générer le XML pour un ensemble de données en faisant une copie de la description d'un ensemble de données de travail dans dataset.xml, puis en la modifiant.
    
### Codage de caractères spéciaux{#encoding-special-characters} 
Depuisdatasets.xmlest un fichier XML, vous DOIT[&-encoder](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML)"&"&lt;", et "&gt;" dans tout contenu comme "&amp;", "&lt;", et "&gt;".
Faux :&lt;titre&gt; Temps & marées&lt;/titre&gt;
À droite :&lt;titre&gt; Marques de &amp; heure&lt;/titre&gt;
     
### XML ne tolère pas les erreurs de syntaxe{#xml-doesnt-tolerate-syntax-errors} 
Après avoir modifié le fichier dataset.xml, il est bon de vérifier que le résultat est[XML bien formé](https://www.w3schools.com/xml/xml_dtd.asp)en collant le texte XML dans un vérificateur XML comme[xmlvalidation](https://www.xmlvalidation.com/).
     
### Conseils de dépannage{#troubleshooting-tips} 
*    **Autres façons de diagnostiquer les problèmes avec les ensembles de données**   
En plus des deux[Outils](#tools),
    *   [Log.txt](/docs/server-admin/additional-information#log)est un fichier journal avec tous lesERDDAPLes messages de diagnostic.
    * Les[Rapport quotidien](/docs/server-admin/additional-information#daily-report)possède plus d'informations que la page d'état, y compris une liste des ensembles de données qui n'ont pas été chargés et les exceptions (erreurs) ils ont généré.
    * Les[Page d'état](/docs/server-admin/additional-information#status-page)est un moyen rapide de vérifierERDDAPl'état de n'importe quel navigateur Web. Il comprend une liste des ensembles de données qui n'ont pas été chargés (mais pas les exceptions connexes) et les statistiques des tâches (montrant les progrès de[EDDGridCopier](#eddgridcopy)et[EDDTableCopy](#eddtablecopy)ensembles de données et[EDDGridFichiers](#eddgridfromfiles)ou[EDDTableFromFiles](#eddtablefromfiles)ensembles de données utilisés[cacheFromUrl](#cachefromurl)  (mais pas cache TailleGB) ) .
    * Si vous êtes coincé, voyez notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).
         
### Variables particulières{#special-variables} 
*    **[longitude, latitude, altitude (ou profondeur) , et heure (LLAT) variable](#destinationname) [destinationName](#destinationname)s sont spéciaux.** 
    * En général:
        * Les variables LLAT sont portées à la connaissanceERDDAP™si la variable d'axe (pourEDDGridensembles de données) ou variable de données (pour les ensembles de données EDDTable)  [destinationName](#destinationname)est "longitude", "latitude", "altitude", "profondeur", ou"time".
        * Nous vous encourageons vivement à utiliser ces noms standard pour ces variables dans la mesure du possible. Aucun d'entre eux n'est requis. Si vous n'utilisez pas ces noms de variables spéciaux,ERDDAP™ne reconnaîtront pas leur signification. Par exemple, les variables LLAT sont traitées spécialement par Make A Graph ( *datasetID* Graphique) : si la variable X Axis est "longitude" et la variable Y Axis est "latitude", vous obtiendrez une carte (utilisant une projection standard, et avec un masque terrestre, des frontières politiques, etc.) au lieu d'un graphique.
        *   ERDDAP™ajoutera automatiquement beaucoup de métadonnées aux variables LLAT (par exemple, "[ioos\\_category](#ioos_category)", "[unités](#units)", et plusieurs attributs liés aux normes comme "\\_CoordonnéAxisType") .
        *   ERDDAP™sera automatiquement, à la volée, ajouter beaucoup de métadonnées globales liées aux valeurs LLAT du sous-ensemble de données sélectionné (Par exemple, "geospatial\\_lon\\_min") .
        * Les clients qui appuient ces normes de métadonnées pourront profiter des métadonnées ajoutées pour positionner les données dans le temps et dans l'espace.
        * Les clients trouveront plus facile de générer des requêtes qui incluent des variables LLAT parce que les noms de la variable sont les mêmes dans tous les ensembles de données pertinents.
    * Pour la variable "longitude" et la variable "latitude":
        * Utilisez la[destinationName](#destinationname)"longitude" et "latitude" seulement si la[unités](#units)sont des degrés\\_est et\\_nord, respectivement. Si vos données ne correspondent pas à ces exigences, utilisez différents noms de variables (Par exemple, x, y, lonRadians, latRadians) .
        * Si vous avez des données de longitude et de latitude exprimées en différentes unités et donc avec différentesdestinationNames, par exemple, lonRadians et latRadians, Make A Graph ( *datasetID* Graphique) fera des graphiques (par exemple, séries chronologiques) au lieu de cartes.
    * Pour la variable "altitude" et la variable "profondeur":
        * Utilisez la[destinationName](#destinationname)"altitude" pour identifier la distance des données au-dessus du niveau de la mer (Valeurs positives) . En option, vous pouvez utiliser "altitude" pour les distances sous le niveau de la mer si les valeurs sont négatives sous la mer (ou si vous utilisez, par exemple,
[&lt;Nom de l'entreprisescale\\_factor"type"int"&gt;- 1&lt;/att&gt;] (#facteur_échelle) pour convertir les valeurs de profondeur en valeurs d'altitude.
        * Utilisez ladestinationName«profondeur» pour identifier la distance entre les données et le niveau de la mer (valeurs positives à la baisse) .
        * Un ensemble de données peut ne pas avoir à la fois des variables d'altitude et de profondeur.
        * Pour ces noms variables,[unités](#units)doit être "m", "mètre" ou "mètres". Si les unités sont différentes (Par exemple, brasses) , vous pouvez utiliser
[&lt;Nom de l'entreprisescale\\_factor"&gt; *certains Valeur* &lt;/att&gt;] (#facteur_échelle) et [&lt;att name="unités"&gt;mètres&lt;/att&gt;] (#unités) pour convertir les unités en compteurs.
        * Si vos données ne correspondent pas à ces exigences, utilisez un autredestinationName  (par exemple, ci-dessusGround, distance Pourbottom) .
        * Si vous connaissez le SIR vertical, veuillez le préciser dans les métadonnées, par exemple "EPSG:5829" (hauteur instantanée au-dessus du niveau de la mer) , "EPSG:5831" (profondeur instantanée sous le niveau de la mer) , ou "EPSG:5703" (Hauteur NAVD88) .
    * Pour"time"variable:
        * Utilisez la[destinationName](#destinationname) "time"seulement pour les variables qui incluent la date + heure entière (ou date, si c'est tout ce qu'il y a) . Si, par exemple, il existe des colonnes séparées pour la date et l'heureOfDay, n'utilisez pas le nom de la variable"time".
        * Voir[unités](#time-units)pour plus d'informations sur l'attribut units pour les variables time et timeStamp.
        * La variable temporelle et[heure Variables des timbres](#timestamp-variables)sont uniques dans la mesure où ils convertissent toujours les valeurs de données à partir du format de temps de la source (Quoi que ce soit) dans une valeur numérique (secondes depuis 1970-01-01T00:00:00Z) ou une valeur de chaîne (ISO 8601:2004 (E) format) , selon la situation.
        * Lorsqu'un utilisateur demande des données temporelles, il peut le demander en spécifiant le temps comme valeur numérique (secondes depuis 1970-01-01T00:00:00Z) ou une valeur de chaîne (ISO 8601:2004 (E) format) .
        *   ERDDAP™a une utilité pour[Convertir un numérique Temps de départ/vers une chaîne](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
        * Voir[CommentERDDAPTraitement du temps](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
            
### Pourquoi seulement deux structures de données de base?{#why-just-two-basic-data-structures} 
* Comme il est difficile pour les clients humains et les clients informatiques de faire face à un ensemble complexe de structures d'ensembles de données possibles,ERDDAP™utilise seulement deux structures de données de base:
    * a[structure des données maillées](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)  (par exemple, pour les données satellitaires et les données modèles) et
    * a[Structure des données tabulaires](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)  (par exemple, pour les données de bouée, de station et de trajectoire in situ) .
* Certes, toutes les données ne peuvent pas être exprimées dans ces structures, mais une grande partie peut l'être. Les tableaux, en particulier, sont des structures de données très flexibles. (examiner le succès des programmes de bases de données relationnelles) .
* Cela facilite la construction des requêtes de données.
* Cela rend les réponses de données ont une structure simple, ce qui facilite le service des données dans une plus grande variété de types de fichiers standard (qui prennent souvent en charge des structures de données simples) . C'est la raison principale pour laquelle nous avons mis en placeERDDAP™Par ici.
* Cela nous facilite la tâche. (ou n'importe qui) pour écrire le logiciel client qui fonctionne avec tousERDDAP™les ensembles de données.
* Cela facilite la comparaison des données provenant de différentes sources.
* Nous sommes très conscients que si vous êtes habitués à travailler avec des données dans d'autres structures de données, vous pouvez d'abord penser que cette approche est simpliste ou insuffisante. Mais toutes les structures de données ont des compromis. Aucun n'est parfait. Même les structures do-it-all ont leurs inconvénients: travailler avec eux est complexe et les fichiers peuvent seulement être écrits ou lus avec des bibliothèques logicielles spéciales. Si vous acceptezERDDAPL'approche assez pour essayer de travailler avec elle, vous pouvez trouver qu'il a ses avantages (notamment le support pour plusieurs types de fichiers qui peuvent contenir les réponses de données) . Les[ERDDAP™Diaporama](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)  (en particulier[glissement des structures de données](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures)) parle beaucoup de ces questions.
* Et même si cette approche vous semble étrange,ERDDAP™les clients ne remarqueront jamais -- ils verront simplement que tous les ensembles de données ont une structure simple agréable et ils seront reconnaissants qu'ils puissent obtenir des données d'une grande variété de sources retournées dans une grande variété de formats de fichiers.
         
### Dimensions{#dimensions} 
*    **Que faire si les variables de la grille dans l'ensemble de données source ne partagent pas les mêmes variables d'axe?**   
EnEDDGridensembles de données, toutes les variables de données DOIVENT être utilisées (part) toutes les variables d'axe. Donc, si un ensemble de données source a certaines variables avec un ensemble de dimensions, et d'autres variables avec un ensemble de dimensions différent, vous devrez faire deux ensembles de données dansERDDAP. Par exemple, vous pourriez en faire uneERDDAP™ensemble de données intitulé "Quelque titre (en surface) " pour tenir des variables qui utilisent simplement\\[heure\\]\\[latitude\\]\\[longitude\\]dimensions et faire une autreERDDAP™ensemble de données intitulé "Quelque titre (en profondeur) " pour tenir les variables qui utilisent\\[heure\\]\\[altitude\\]\\[latitude\\]\\[longitude\\]. Ou peut-être que vous pouvez changer la source de données pour ajouter une dimension avec une seule valeur (Par exemple, altitude=0) de rendre les variables cohérentes.
    
    ERDDAP™ne gère pas des ensembles de données plus complexes (par exemple, des modèles utilisant un maillage de triangles) Et bien. Vous pouvez servir ces ensembles de données dansERDDAP™en créant deux ou plusieurs ensembles de données dansERDDAP™  (pour que toutes les variables de données de chaque nouvel ensemble de données partagent le même ensemble de variables d'axe) , mais ce n'est pas ce que les utilisateurs veulent. Pour certains ensembles de données, vous pourriez envisager de faire une version maillée régulière de l'ensemble de données et de l'offrir en plus des données originales. Certains logiciels clients peuvent seulement traiter avec une grille régulière, donc en faisant cela, vous atteindrez des clients supplémentaires.
     
    
### Données projetées sur les mailles{#projected-gridded-data} 
Certaines données maillées ont une structure complexe. Par exemple, niveau 2 du satellite ("une longue piste") les données n'utilisent pas une projection simple. Modèles (et autres) souvent travailler avec des données maillées sur diverses projections non cylindriques (par exemple, conique, stéréographique polaire, tripolaire) ou dans des grilles non structurées (une structure de données plus complexe) . Certains utilisateurs finaux veulent ces données telles quelles, donc il n'y a pas de perte d'information. Pour ces clients,ERDDAP™ne peut servir les données, comme c'est le cas, que siERDDAP™l'administrateur divise l'ensemble de données d'origine en quelques ensembles de données, chaque partie comprenant des variables qui partagent les mêmes variables d'axe. Oui, cela semble étrange pour les gens impliqués et il est différent de la plupart desOPeNDAPles serveurs. MaisERDDAP™met l'accent sur la diffusion des données dans de nombreux formats. C'est possible parce queERDDAP™utilise/exige une structure de données plus uniforme. Bien que ce soit un peu gênant (c'est-à-dire différents des prévisions) ,ERDDAP™peut distribuer les données projetées.

\\[Oui,ERDDAP™La structure des données pourrait être plus souple, mais conserver les exigences relatives aux formats de sortie. Mais cela conduirait à la confusion parmi de nombreux utilisateurs, en particulier les nouveaux-nés, car de nombreuses requêtes de données apparemment valides avec des structures différentes seraient invalides parce que les données ne correspondraient pas au type de fichier. Nous revenons à la conception actuelle du système.\\]

Certains utilisateurs finals veulent des données dans une projection cylindrique lat lon comme Equirectangular / plate carrée ou Mercator) pour une facilité d'utilisation dans différentes situations. Pour ces situations, nous encourageonsERDDAP™administrateur pour utiliser un autre logiciel (NCO?Matlab? - Oui. Une carte d'identité ? ...?) pour reprojecter les données sur une (Projection equitectangulaire / plaque carrée) ou d'autres projections cylindriques et servir cette forme de donnéesERDDAP™comme un ensemble de données différent. Ceci est semblable à ce que les gens font lorsqu'ils convertissent les données de niveau 2 en données de niveau 3. Un tel outil est[NCO](https://nco.sourceforge.net/nco.html#Regridding)qui offre des options d'extension pour le reconditionnement des données.

#### SIG et données de reprojecting{#gis-and-reprojecting-data} 
Étant donné que le monde des SIG est souvent axé sur la cartographie, les programmes des SIG offrent généralement un soutien pour la reprojection des données, c'est-à-dire la représentation des données sur une carte avec une projection différente.

Actuellement,ERDDAP™n'a pas d'outils pour reprojecter les données. Au lieu de cela, nous vous recommandons d'utiliser un outil externe pour faire une variante de l'ensemble de données, où les données ont été reprojectées de leur forme originale sur une forme rectangulaire (latitude longitude) tableau approprié pourERDDAP.

À notre avis, les FC/DAPLe monde est un peu différent du monde SIG et fonctionne à un niveau légèrement inférieur.ERDDAP™reflète cela. En général,ERDDAP™est conçu pour fonctionner principalement avec les données (pas de cartes) et ne veut pas changer (Par exemple, le projet) Ces données. PourERDDAP™, les données maillées sont souvent/généralement/de préférence associées aux valeurs lat lon et à une projection cylindrique, et non à certaines valeurs x,y de la projection. En tout cas,ERDDAP™ne fait rien avec la projection des données ; il passe simplement les données, comme c'est le cas avec sa projection actuelle, sur la théorie qu'une reprojection est un changement significatif aux données etERDDAP™ne veut pas être impliqué dans des changements importants. En outre, les utilisateurs ultérieurs pourraient naïvement reprojecter les données, ce qui ne serait pas aussi bon que de faire une seule reprojection. (Donc, si leERDDAP™administrateur veut offrir les données dans une projection différente, amende; juste reprojecter les données hors ligne et offrir que comme un ensemble de données différent dansERDDAP. Beaucoup de jeux de données satellitaires sont offerts comme ce que la NASA appelle le niveau 2 (swath) et comme niveau 3 (Projection équitectangulaire) les versions.) QuandERDDAP™fait des cartes (directement ou viaWMSou KML) ,ERDDAP™ne propose actuellement que de faire des cartes avec la projection Equirectangular / plate carrée qui, heureusement, est acceptée par la plupart des programmes de cartographie.

Nous encourageonsERDDAP™administrateurs pour utiliser d'autres logiciels (NCO?Matlab? - Oui. Une carte d'identité ? ...?) pour reprojecter les données sur une (Projection equitectangulaire / plaque carrée) ou d'autres projections cylindriques et servir cette forme de donnéesERDDAP™comme un ensemble de données différent. Ceci est semblable à ce que les gens font lorsqu'ils convertissent les données de niveau 2 en données de niveau 3. Un tel outil est[NCO](https://nco.sourceforge.net/nco.html#Regridding)qui offre des options d'extension pour le reconditionnement des données.

Nous espérons queERDDAP™disposera d'outils intégrés pour proposer des cartes avec d'autres projections à l'avenir. Nous espérons également avoir de meilleurs liens avec le monde SIG à l'avenir (autres que le courantWMSservice) . Il est terrible que dans ce monde « moderne », les liens entre les FC/DAPle monde et le monde SIG sont encore si faibles. Ces deux choses sont sur la liste To Do. (Si vous voulez aider, notamment avec la connexionERDDAP™pour MapServer, veuillez envoyer un courriel à Chris. John à noaa.gov .) 
    
### Types de données{#data-types} 
ERDDAP™prend en charge les types de données suivants
 (les noms sont sensibles à la casse;'u'préfixe signifie "non signé"; le nombre de noms dans d'autres systèmes est le nombre de bits) :

#### octet{#byte} 
*    **octet** a signé des valeurs entières avec une plage de -128 à 127.
Dans d'autres systèmes, cela s'appelle parfois int8.
Ceci est appelé "tinyint" par SQL et Cassandra.
    ERDDAP™convertit[booléen](#boolean-data)de certaines sources (Par exemple, SQL et Cassandra) en octetsERDDAP™avec une valeur de 0 = faux, 1 = vrai et 127 =missing\\_value.
#### uoctet{#ubyte} 
*    **uoctet** a des valeurs entières non signées de 0 à 255.
Dans d'autres systèmes, cela s'appelle parfois uint8.
#### courte{#short} 
*    **courte** a signé des valeurs entieres avec une plage de -32768 à 32767.
Dans d'autres systèmes, cela s'appelle parfois int16.
Ceci est appelé "smallint" par SQL et Cassandra.
#### ucourt{#ushort} 
*    **ucourt** a des valeurs entières non signées de 0 à 65535.
Dans d'autres systèmes, cela s'appelle parfois uint16.
#### Int{#int} 
*    **Int** a signé des valeurs entières avec une plage de -2147483648 à 2147483647.
Dans d'autres systèmes, cela s'appelle parfois int32.
Ceci est appelé "entier"|numérique (?) " par SQL et "int" par Cassandra.
#### uint{#uint} 
*    **uint** a des valeurs entières non signées de 0 à 4294967295.
Dans d'autres systèmes, cela s'appelle parfois uint32.
#### longue{#long} 
*    **longue** a signé des valeurs entières avec une plage de -9223372036854775808 à 9223372036854775807.
Dans d'autres systèmes, cela s'appelle parfois int64.
Ça s'appelle "bigint"|numérique (?) " par SQL et "bigint" par Cassandra.
Parce que de nombreux types de fichiers ne supportent pas les données longues, leur utilisation est découragée. Dans la mesure du possible, utiliser deux fois (voir ci-dessous) .
#### longue{#ulong} 
*    **longue** a des valeurs entières non signées de 0 à 18446744073709551615
Dans d'autres systèmes, cela s'appelle parfois uint64.
Parce que de nombreux types de fichiers ne supportent pas les données ulong, leur utilisation est découragée. Dans la mesure du possible, utiliser deux fois (voir ci-dessous) .
#### flotteur{#float} 
*    **flotteur** est un flotteur IEEE 754 ayant une plage d'environ +/- 3.402823466e+38.
Dans d'autres systèmes, c'est parfois appelé float32.
C'est ce qu'on appelle|flotteur (?) |décimale (?) |numérique (?) "par SQL et "float" par Cassandra.
La valeur spéciale NaN signifie Not-a-Number.
    ERDDAP™convertit les valeurs positives et négatives de l'infini en NaN.
#### double{#double} 
*    **double** est un IEEE 754 double avec une gamme d'environ
+/- 1,7976931348623157E+308.
Dans d'autres systèmes, c'est parfois appelé float64.
Ceci est appelé "double précision"|flotteur (?) |décimale (?) |numérique (?) " par SQL et "double" par Cassandra.
La valeur spéciale NaN signifie Not-a-Number.
    ERDDAP™convertit les valeurs positives et négatives de l'infini en NaN.
#### Char{#char} 
*    **Char** est un seul, 2-octets (16 bits)  [caractère Unicode UCS-2](https://en.wikipedia.org/wiki/UTF-16)allant de\\u0000  (#0) par\\uffff  (#65535) .
    \\uffff'sa définition est non-a-Caracter, analogue à une double valeur de NaN.
L'utilisation de char est découragée parce que de nombreux types de fichiers ne prennent pas en charge les chars ou supportent seulement les chars de 1-octet (voir ci-dessous) . Envisagez plutôt d'utiliser String.
Les utilisateurs peuvent utiliser des variables char pour faire des graphiques.ERDDAP™convertira les caractères en leur numéro de code Unicode, qui peut être utilisé comme données numériques.
#### Chaîne{#string} 
*    **Chaîne** est une séquence de 0 ou plus, 2-octets (16 bits)  [Unicode UCS-2 caractères](https://en.wikipedia.org/wiki/UTF-16).
    ERDDAP™utilise/interprète une chaîne 0-longueur comme une valeur manquante.ERDDAP™ne supporte pas une vraie chaîne null.
La longueur maximale théorique des cordes est de 2147483647 caractères, mais il y a probablement différents problèmes dans différents endroits même avec des cordes un peu plus courtes.
UtilisationERDDAP's String pour le caractère de SQL, varchar, variable de caractère, binaire, varbinaire, intervalle, tableau, multiset, xml, et tout autre type de données de base de données qui ne s'adapte pas proprement à aucun autreERDDAP™type de données.
UtilisationERDDAP's String pour le "texte" de Cassandra et tout autre type de données Cassandra qui ne s'adapte pas proprement à aucun autreERDDAP™type de données.
     

AvantERDDAP™v2.10,ERDDAP™n'a pas supporté les types entiers non signés à l'interne et a offert un soutien limité dans ses lecteurs de données et les auteurs.
    
### Limites des types de données{#data-type-limitations} 
Vous pouvez penser àERDDAP™en tant que système qui possède des ensembles de données virtuels et qui fonctionne en lisant les données de la source d'un ensemble de données dans un modèle de données interne et en écrivant des données à divers services (par exemple,(OPeN)DAP,WMS) et types de fichiers en réponse aux demandes des utilisateurs.

* Chaque lecteur d'entrée prend en charge un sous-ensemble des types de données quiERDDAP™soutien. Donc, lire les données dansERDDAPLes structures de données internes ne posent pas de problème.
* Chaque auteur de sortie prend également en charge un sous-ensemble de types de données. C'est un problème parce queERDDAPdoit presser, par exemple, les données longues dans les types de fichiers qui ne prennent pas en charge les données longues.
     

Voici les explications des limitations (ou aucun) de divers auteurs et commentERDDAP™s'occupe des problèmes. Ces complications font partie intégrante deERDDAPL'objectif de rendre les systèmes disparates interopérables.

#### ASCII{#ascii} 
* ASCII (.csv,.tsv, etc.) fichiers texte -
    * Toutes les données numériques sont écrites via sa représentation en chaîne (avec des valeurs de données manquantes apparaissant comme des chaînes de longueur 0) .
    * Bien queERDDAP™écrit des valeurs longues et ulonges correctement aux fichiers texte ASCII, de nombreux lecteurs (p.ex. programmes de tableurs) ne peut pas traiter correctement les valeurs longues et ulonges et les convertir en double valeurs (avec perte de précision dans certains cas) .
    * Les données Char et String sont écrites via JSON Strings, qui gère tous les caractères Unicode (notamment, les caractères "inhabituels" au-delà de ASCII #127, par exemple, le caractère Euro apparaît comme "\\u20ac") .
    
        
#### JSON{#json} 
* JSON (.json,.jsonlCSV, etc.) fichiers texte -
    * Toutes les données numériques sont écrites via sa représentation en chaîne.
    * Les données Char et String sont écrites sous forme de chaînes JSON, qui gèrent tous les caractères Unicode (notamment, les caractères "inhabituels" au-delà de ASCII #127, par exemple, le caractère Euro apparaît comme "\\u20ac") .
    * Les valeurs manquantes pour tous les types de données numériques apparaissent comme nulles.
         
#### .nc3 fichiers{#nc3-files} 
*   .nc3 fichiers ne supportent pas nativement les types de données entiers non signés. Avant la v1.9 des FC, elles n'appuyaient pas les types entiers non signés. Pour gérer ça,ERDDAP™2.10+ suit la norme NUG et ajoute toujours un attribut "\\_Unsigned" avec une valeur de "true" ou "faux" pour indiquer si les données proviennent d'une variable non signée ou signée. Tous les attributs entiers sont écrits comme attributs signés (Par exemple, octet) avec des valeurs signées (par exemple, un ubyteactual\\_rangeattribut avec des valeurs 0 à 255, apparaît comme un attribut octet avec des valeurs 0 à -1 (l'inverse de la valeur de complément des deux de la valeur hors gamme). Il n'y a pas de moyen facile de savoir quels attributs entiers (signés) doivent être lus comme attributs non signés.ERDDAP™prend en charge l'attribut "\\_Unsigned" lorsqu'il lit.nc3 dossiers.
*   .nc3 fichiers ne supportent pas les types de données longs ou longs.ERDDAP™traite avec cela en les convertissant temporairement en deux variables. Les doubles peuvent représenter exactement toutes les valeurs jusqu'à +/- 9 007,199,254,740,992 C'est-à-dire 253. C'est une solution imparfaite.Unidatarefuse de faire une mise à niveau mineure à.nc3 pour résoudre ce problème et les problèmes connexes, citant.nc4 (un changement majeur) comme la solution.
* La spécification des FC (avant v1.9) dit qu'il prend en charge un type de données char, mais il n'est pas clair si char n'est destiné que comme les éléments de construction de tableaux char, qui sont effectivement des cordes. Les questions posées à leur liste de diffusion n'ont donné que des réponses confuses. En raison de ces complications, il est préférable d'éviter les variables char dansERDDAP™et d'utiliser les variables String dans la mesure du possible.
* Traditionnellement,.nc3 fichiers supportés uniquement les chaînes avec ASCII-encodé (7 bits, #0 - #127) caractères. NUCEAU (etERDDAP) étendre cette (commençant ~2017) en incluant l'attribut "\\_Encoding" avec une valeur de "ISO-8859-1" (une extension d'ASCII qui définit les 256 valeurs de chaque caractère de 8 bits) ou "UTF-8" pour indiquer comment les données de la chaîne sont encodées. D'autres codages peuvent être légaux mais sont découragés.
         
#### .nc4 fichiers{#nc4-files} 
*   .nc4 fichiers supportent tous lesERDDAPles types de données.
    
#### Fichiers CCNSV{#nccsv-files} 
Les fichiers CCNSV 1.0 ne supportent pas les types de données entiers non signés.
[Fichiers NCCSV 1.1+](/docs/user/nccsv-1.00)prend en charge tous les types de données entiers non signés.
     
#### DAP {#dap} 
*   (OPeN)DAP  (.das, .dds, .asc fichiers ASCII, et .dods fichiers binaires) - Oui.
    *   (OPeN)DAPshort, ushort, int, uint, flotteur et double valeurs correctement.
    *   (OPeN)DAPa un type de données "octet" qu'il définit comme non signé, alors que historiquement, THREDS etERDDAP™ont traité "octet" comme signé dans leur(OPeN)DAPservices. Pour mieux gérer ça,ERDDAP™2.10+ suit la norme NUG et ajoute toujours un attribut "\\_Nonsigné" avec une valeur de "vrai" ou "faux" pour indiquer si les données sont ce queERDDAP™appels octet ou ubyte. Tous les attributs d'octet et d'octet sont écrits comme attributs d'octet avec des valeurs signées (p. ex., un octetactual\\_rangeattribut avec des valeurs 0 à 255, apparaît comme un attribut octet avec des valeurs 0 à -1 (l'inverse de la valeur de complément des deux de la valeur hors gamme). Il n'y a pas de moyen facile de savoir quels attributs "octets" doivent être lus comme attributs uoctets.
    *   (OPeN)DAPne supporte pas les longs signés ou non signés.ERDDAP™traite avec cela en les convertissant temporairement en deux variables et attributs. Les doubles peuvent représenter exactement toutes les valeurs jusqu'à 9 007,199,254,740,992 C'est-à-dire 253. C'est une solution imparfaite.OPeNDAP  (l ' organisation) refuse de faire une mise à niveau mineure àDAP2.0 pour résoudre ce problème et les problèmes connexes, citantDAP4 (un changement majeur) comme la solution.
    * Parce que(OPeN)DAPn'a pas de type de données char distinctes et supporte techniquement seulement les caractères ASCII à 1 octet (#0 - #127) dans Strings, les variables de données char apparaîtront comme des Strings 1-caractère-long dans(OPeN)DAP.das, .dds, et .dods réponses.
    * Techniquement,(OPeN)DAPspécification ne prend en charge que les chaînes de caractères codés ASCII (#0 - #127) . NUCEAU (etERDDAP) étendre cette (commençant ~2017) en incluant l'attribut "\\_Encoding" avec une valeur de "ISO-8859-1" (une extension d'ASCII qui définit les 256 valeurs de chaque caractère de 8 bits) ou "UTF-8" pour indiquer comment les données de la chaîne sont encodées. D'autres codages peuvent être légaux mais sont découragés.
         
### Type de données Commentaires{#data-type-comments} 
* En raison de la faible prise en charge des données longues, ulonges et char dans de nombreux types de fichiers, nous décourageons l'utilisation de ces types de données dansERDDAP. Lorsque c'est possible, utilisez le double au lieu du long et du long, et utilisez String au lieu du char.
     
* Métadonnées - Parce que(OPeN)DAPLes réponses .das et .dds ne prennent pas en charge les attributs ou types de données longs ou ulongs (et les montrer en double) , vous pouvez plutôt vouloir utiliserERDDAPLa représentation tabulaire des métadonnées, telle qu'elle est présentée danshttp.../erddap/ **Informations** / *datasetID* Page web .html (par exemple,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) )   (que vous pouvez également obtenir dans d'autres types de fichiers, par exemple, .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv,.xhtml) ou les.nccsvRéponse aux métadonnées (par exemple,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)bien que.nccsvLes métadonnées ne sont disponibles que pour les ensembles de données tabulaires) , qui prennent en charge tous les types de données (notamment, long, long et char) .
         
### Fichiers multimédias{#media-files} 
Toutes les données ne sont pas des tableaux de nombres ou de texte. Certains ensembles de données comprennent des fichiers multimédias, tels que des fichiers d'image, audio et vidéo.ERDDAP™a quelques fonctionnalités spéciales pour faciliter l'accès des utilisateurs aux fichiers multimédias. C'est un processus en deux étapes :
 

1. Rendre chaque fichier accessible via sa propre URL, via un système qui prend en charge les requêtes de plage d'octets.
La façon la plus facile de le faire est de mettre les fichiers dans un répertoire quiERDDAP™a accès à. (Si elles sont dans un conteneur comme un.zipfichier, les décompresser, bien que vous pourriez vouloir offrir.zipfichier pour les utilisateurs aussi.) Alors, faites une[EDDTableFromFileNames](#eddtablefromfilenames)dataset pour rendre ces fichiers accessibles viaERDDAP™, notamment parERDDAP's["files"système](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
    
Tous les fichiers rendus accessibles via EDDTableFromFileNames etERDDAP's"files"appui au système[requêtes de plage d'octets](https://en.wikipedia.org/wiki/Byte_serving). Normalement, quand un client (Par exemple, un navigateur) fait une requête à une URL, il obtient le fichier entier comme la réponse. Mais avec une requête de plage d'octets, la requête spécifie une gamme d'octets du fichier, et le serveur ne renvoie que ces octets. Ceci est pertinent ici parce que les lecteurs audio et vidéo dans les navigateurs ne fonctionnent que si le fichier peut être consulté via des requêtes de plage d'octets.
    
Facultatif: Si vous avez plus d'un ensemble de données avec des fichiers multimédias associés, vous pouvez faire seulement un EDDTableFromFileNames qui a un sous-dossier pour chaque groupe de fichiers. L'avantage est que lorsque vous voulez ajouter de nouveaux fichiers multimédias pour un nouvel ensemble de données, tout ce que vous avez à faire est de créer un nouveau dossier et de mettre les fichiers dans ce dossier. Le dossier et les fichiers seront automatiquement ajoutés à l'ensemble de données EDDTableFromFileNames.
    
2. Facultatif: Si vous avez un ensemble de données qui contient des références à des fichiers multimédias, ajoutez-le àERDDAP.
Par exemple, vous pouvez avoir un fichier .csv avec une ligne pour chaque fois que quelqu'un a vu une baleine et une colonne qui comprend le nom d'un fichier image lié à cette observation. Si le nom du fichier image est juste le nom du fichier, par exemple, Img20141024T192403Z, pas une URL complète, alors vous devez ajouter[fichierAccessBase Url et/ou fichierAccessSuffix](#fileaccessbaseurl)attributs aux métadonnées pour celadataVariablequi spécifie la baseURL et suffixe pour ces noms de fichiers. Si vous avez rendu les fichiers accessibles via EDDTableFromFileNames, l'URL sera dans le formulaire
     *baseUrl* /erddap/files/ *datasetID* /
Par exemple,
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
S'il y a.zipou autre fichier conteneur avec tous les fichiers multimédias liés à une variable de données, nous vous recommandons également de rendre ce fichier accessible aux utilisateurs (Voir étape 1 ci-dessus) et l'identifier avec un[fichierAccessArchive Autres](#fileaccessarchiveurl)attribut.
    

\\[À partir deERDDAP™v1.82\\]Si vous faites la première étape ci-dessus (ou les deux étapes) , alors quand un utilisateur voit leERDDAP™ "files"système pour cet ensemble de données (ou demande de voir un sous-ensemble de données via un.htmlTabledemande, si vous avez fait la deuxième étape) ,ERDDAP™affichera une icône '?' à gauche du nom de fichier. Si l'utilisateur survole cette icône, il verra un popup montrant l'image, un lecteur audio ou un lecteur vidéo. Les navigateurs supportent seulement un nombre limité de types de

* image (habituellement .gif, .jpg et .png) ,
* audio (habituellement .mp3, .ogg et .wav) et
* fichiers vidéo (habituellement .mp4, .ogv, et . webm) .

Le support varie selon les versions de différents navigateurs sur différents systèmes d'exploitation. Donc, si vous avez le choix du type de fichier à offrir, il est logique d'offrir ces types.

Ou, si un utilisateur clique sur le nom de fichier affiché sur unERDDAP™page web, leur navigateur affichera l'image, audio ou fichier vidéo comme une page Web séparée. Ceci est surtout utile pour voir une très grande image ou vidéo à l'échelle de plein écran, au lieu d'un popup.
    
### Travailler avec les fichiers AWS S3{#working-with-aws-s3-files} 
[Service Web Amazon (AWS) ](https://aws.amazon.com)est un vendeur de[calcul en nuage](https://en.wikipedia.org/wiki/Cloud_computing)services.[S3](https://aws.amazon.com/s3/)est un système de stockage d'objets offert par AWS. Au lieu du système hiérarchique des répertoires et des fichiers d'un système de fichiers traditionnel (comme un disque dur dans votre PC) , S3 offre juste des "buckets" qui tiennent des "objets" (Nous les appellerons"files") .

Pour les fichiers ASCII (Par exemple, .csv) ,ERDDAP™peut fonctionner avec les fichiers dans les seaux directement. La seule chose que vous devez faire est de spécifier le&lt;fichierDir&gt; pour l'ensemble de données utilisant un format spécifique pour le seau AWS, p.ex., https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/ . Vous ne devriez pas utiliser&lt;cacheFromUrl&gt; . Voir ci-dessous pour plus de détails.

Mais pour les fichiers binaires (Par exemple,.nc, .grib, .bufr et.hdffichiers) , vous devez utiliser le&lt;cacheFromUrl&gt; système décrit ci-dessous.ERDDAP, netcdf-java (quiERDDAP™utilise pour lire les données de ces fichiers) , et d'autres logiciels de données scientifiques sont conçus pour travailler avec des fichiers dans un système de fichiers traditionnel qui offre[niveau de bloc](https://en.wikipedia.org/wiki/Block-level_storage)accès aux fichiers (qui permet de lire des morceaux d'un fichier) , mais S3 offre seulement[niveau de fichier (objet) ](https://en.wikipedia.org/wiki/Block-level_storage)accès aux fichiers (qui permet seulement de lire le fichier entier) . AWS offre une alternative à S3,[Magasin de blocs élastiques (EBS) ](https://aws.amazon.com/ebs/)), qui prend en charge l'accès de niveau de bloc aux fichiers mais il est plus cher que S3, donc il est rarement utilisé pour le stockage en vrac de grandes quantités de fichiers de données. (Donc quand les gens disent stocker des données dans le cloud (S3) est bon marché, c'est généralement une comparaison pommes-oranges.) 

#### S3 Boucles{#s3-buckets} 
 **Le contenu d'un seau. Les clés. Objets, délimiteurs.**   
Techniquement, les seaux S3 ne sont pas organisés dans une structure hiérarchique de fichiers comme un système de fichiers sur un ordinateur. Au lieu de cela, les seaux ne contiennent que des "objets" (fichiers) , dont chacun a une "clé" (un nom) . Un exemple de clé dans ce seau noaa-goes17 est

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
L'URl correspondant pour cet objet est

[ https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc ](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc)

AWS prend en charge une petite variation dans la façon dont cette URL est construite, maisERDDAP™exige ce format spécifique:
   https://*bucketName*.s3.*region*.amazonaws.com/*key*   
Il est courant, comme dans cet exemple, de faire ressembler les noms de clés à un chemin hiérarchique plus un nom de fichier, mais techniquement ils ne le sont pas. Comme elle est commune et utile,ERDDAP™traite les clés avec /'s comme s'il s'agissait d'un chemin hiérarchique plus nom de fichier, et cette documentation les désignera comme tels. Si les clés d'un seau n'utilisent pas / (par exemple, une clé comme
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s2018052247575), alorsERDDAP™traitera l'ensemble de la clé comme un long nom de fichier.

Buckets privés vs publics -- L'administrateur du seau S3 peut rendre le seau et son contenu public ou privé. Si public, tout fichier dans le seau peut être téléchargé par quiconque utilisant l'URL du fichier. Amazon a une[Ouvrir les données](https://aws.amazon.com/opendata/)programme qui héberge des ensembles de données publics (y compris les donnéesNOAA, NASA, et USGS) gratuitement et ne charge personne de télécharger les fichiers de ces seaux. Si un seau est privé, les fichiers dans le seau ne sont accessibles qu'aux utilisateurs autorisés et AWS facture des frais (généralement payés par le propriétaire du seau) pour télécharger des fichiers sur un ordinateur S3 non-AWS.ERDDAP™peut travailler avec des données dans des seaux publics et privés.

#### Pouvoirs{#aws-credentials} 
Pour faire en sorte queERDDAP™peut lire le contenu des seaux privés, vous avez besoin d'identifiants AWS et vous devez stocker un fichier d'identifiants dans le lieu standard ainsiERDDAP™peut trouver l'information. Voir le SDK AWS pourJava2.x documentation:[Définir les identifiants par défaut](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials). (L'option pour stocker les valeurs commeJavaparamètres de ligne de commande dans\\[Tomcat\\]/bin/setenv.sh peut être une bonne option.) 
#### AWS /files/{#aws-files} 
* /files/ système -- LesERDDAP™ [/files/ système](#accessibleviafiles)permet aux utilisateurs de télécharger les fichiers sources pour un ensemble de données. Nous vous recommandons d'activer cette option pour tous les ensembles de données avec des fichiers source car de nombreux utilisateurs veulent télécharger les fichiers source originaux.
    * Si les fichiers sont dans un seau S3 privé, la demande de l'utilisateur de télécharger un fichier sera traitée parERDDAP™, qui lira les données du fichier puis les transmettra à l'utilisateur, augmentant ainsi la charge sur votreERDDAP™, en utilisant la bande passante entrante et sortante, et en vous rendant (desERDDAP™administrateur) payer les frais d'évacuation des données à AWS.
    * Si les fichiers sont dans un seau public S3, la demande de l'utilisateur de télécharger un fichier sera redirigé vers l'URL S3 AWS pour ce fichier, de sorte que les données ne passeront pas parERDDAP™, réduisant ainsi la charge surERDDAP. Et si les fichiers sont dans une Amazon Open Data (gratuit) Seau public, puis vous (desERDDAP™administrateur) n'aura pas à payer de frais d'évacuation de données à AWS. Ainsi, il y a un grand avantage à servir les données du public (non privés) S3 seaux, et un énorme avantage pour servir les données d'Amazon Open Data (gratuit) Des seaux.

#### ERDDAP™et AWS S3 Buckets{#erddap-and-aws-s3-buckets} 
[ **ERDDAP™et AWS S3 Buckets** ](#erddap-and-aws-s3-buckets)  
Heureusement, après beaucoup d'efforts,ERDDAP™a un certain nombre de fonctionnalités qui lui permettent de traiter les problèmes inhérents à travailler avec l'accès au niveau de bloc de S3 aux fichiers d'une manière raisonnablement efficace:

*   \\[Avertissement : Travailler avec les seaux AWS S3 est beaucoup de travail supplémentaire. AWS est un vaste écosystème de services et de caractéristiques. Il y a beaucoup à apprendre. Il faut du temps et des efforts, mais c'est faisable. Soyez patient et vous allez faire fonctionner les choses. Demander de l'aide
([Documentation relative aux systèmes d'alerte rapide](https://aws.amazon.com/documentation/gettingstarted/), des sites web comme[Dépassement de la pile](https://stackoverflow.com/), et les
    [ERDDAP™Options de soutien](/docs/intro#support)) si / quand vous êtes coincé.\\]  
     
* Il peut même être difficile de trouver la structure du répertoire et les noms des fichiers dans un seau S3.ERDDAP™a une solution pour ce problème: EDDTableFromFileNames a une spéciale[\\*\\*\\*deOnTheFly](#fromonthefly)option qui vous permet de faire un jeu de données EDDTableFromFileNames qui permet aux utilisateurs de parcourir le contenu d'un seau S3 (et télécharger des fichiers) via les ensembles de données"files"option. Il y a une[exemple ci-dessous](#viewing-the-contents-of-a-bucket).
     
*   ERDDAP™peut lire des données de[fichiers de données compressés externes](#externally-compressed-files), donc il est bon si les fichiers sur S3 sont stockés comme.gz,.gzip,.bz2, .Z, ou d'autres types de fichiers de données compressés externes, qui peuvent considérablement (2 - 20 X) réduire les coûts de stockage des fichiers. Il n'y a souvent pas de pénalité pour l'utilisation de fichiers compressés externes, puisque le temps économisé en transférant un fichier plus petit de S3 àERDDAPenviron équilibre le temps supplémentaire nécessaire pourERDDAP™pour décompresser le fichier. Pour utiliser cette fonctionnalité, il suffit de s'assurer que l'ensemble de données&lt;fichierNomRegex&gt; permet le type de fichier compressé (Par exemple, en ajoutant (|.gz) à la fin du régex) .
     
* Pour le cas le plus fréquent, où vous avezERDDAP™installé sur votre PC pour le test / développement et où l'ensemble de données a des fichiers de données binaires qui sont stockés comme objets dans un seau S3, une approche pour obtenir l'ensemble de données dansERDDAP™est:
    1. Créez un répertoire sur votre PC pour tenir quelques fichiers de données de test.
    2. Téléchargez deux fichiers de données depuis la source vers le répertoire que vous venez de créer.
    3. Utilisation[Générer des ensembles de donnéesXml](#generatedatasetsxml)pour générer le morceau dedatasets.xmlpour l'ensemble de données basé sur les deux fichiers de données locaux.
    4. Vérifiez que ce jeu de données fonctionne comme désiré avec[DasDds](#dasdds)et/ou votre localERDDAP.
        
         **Les étapes suivantes font une copie de cet ensemble de données (qui obtiendra les données du seau S3) sur un publicERDDAP.** 
        
    5. Copier le morceau dedatasets.xmlpour l'ensemble de donnéesdatasets.xmlpour le publicERDDAP™qui servira les données.
    6. Créer un répertoire sur le publicERDDAPLe disque dur local pour tenir un cache de fichiers temporaires. Le répertoire n'utilisera pas beaucoup d'espace disque (voir cacheSizeGB ci-dessous) .
    7. Modifier la valeur de l'ensemble de données&lt;tag fileDir&gt; de sorte qu'il pointe vers le répertoire que vous venez de créer (même si le répertoire est vide) .
    8. Ajouter un[cacheFromUrl](#cachefromurl)tag qui spécifie le nom de l'ensemble de données et préfixe optionnel (i.e., répertoire) dans le cas[Aws S3 URL Format queERDDAP™nécessite](#accessing-files-in-an-aws-s3-bucket).
    9. Ajouter un [&lt;cacheSizeGB&gt;] (#cachefromurl) tag vers le xml de l'ensemble de données (Par exemple, 10 est une bonne valeur pour la plupart des ensembles de données) à direERDDAP™pour limiter la taille du cache local (Ne cachez pas tous les fichiers distants) .
    10. Voir si cela fonctionne dans le publicERDDAP. Notez que la première foisERDDAP™charge l'ensemble de données, il faudra beaucoup de temps pour charger, parce queERDDAP™doit télécharger et lire tous les fichiers de données.
        
Si l'ensemble de données est une énorme collection de fichiers de données maillés, cela prendra beaucoup de temps et ne sera pas pratique. Dans certains cas, pour les fichiers de données maillés,ERDDAP™peut extraire les informations nécessaires (Par exemple, le point de temps pour les données dans un fichier de données maillées) du nom du fichier et éviter ce problème. Voir[Agrégation par Noms des fichiers](#aggregation-via-file-names-or-global-metadata).
        
    11. Facultatif (mais surtout pour les ensembles de données EDDTableFromFiles) , vous pouvez ajouter un[nThreads](#nthreads)tag à l'ensemble de données à indiquerERDDAPutiliser plus d'un thread pour répondre à la demande de données d'un utilisateur. Cela minimise les effets du retard qui survient lorsqueERDDAP™lit les fichiers de données (télécommande) AWS S3 godets dans le cache local et (Peut-être) les décompresser.

#### AWS S3 Données ouvertes{#aws-s3-open-data} 
Dans le cadreNOAA's[Programme de Big Data](https://www.noaa.gov/nodd/about),NOAAa des partenariats avec cinq organisations, y compris AWS, «pour explorer les avantages potentiels de stocker des copies d'observations clés et des sorties de modèles dans le Cloud pour permettre l'informatique directement sur les données sans nécessiter de distribution ultérieure». AWS inclut les ensembles de données qu'il obtient deNOAAdans le cadre de son programme d'accès public à une vaste collection de[Ouvrir les données sur AWS S3](https://registry.opendata.aws/)de n'importe quel ordinateur, que ce soit une instance de calcul Amazon (un ordinateur loué) sur le réseau AWS ou votre propre PC sur n'importe quel réseau. L'exemple ci-dessous suppose que vous travaillez avec un ensemble de données accessible au public.

#### Accès aux fichiers dans un seau AWS S3{#accessing-files-in-an-aws-s3-bucket} 
Pour un seau de données S3 privé, le propriétaire du seau doit vous donner accès au seau. (Voir la documentation AWS.) 

Dans tous les cas, vous aurez besoin d'un compte AWS parce que le SDK AWS pourJava  (quiERDDAP™utilise pour récupérer des informations sur le contenu d'un seau) nécessite des identifiants de compte AWS. (plus sur ceci ci-dessous) 

ERDDAP™ne peut accéder aux seaux AWS S3 que si vous spécifiez le [&lt;cacheFromUrl&gt;] (#cachefromurl) (ou&lt;fileDir&gt;) dans un format spécifique:
 https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*   
où

* Le nom du seau est la forme courte du nom du seau, p.ex. noaa-goes17 .
* La région aws, par exemple, nous-est-1, est de la colonne "Région" dans l'un des tableaux de[Points de service AWS](https://docs.aws.amazon.com/general/latest/gr/rande.html)où le seau est situé.
* Le préfixe est facultatif. Si elle est présente, elle doit se terminer par'/'.

Par exemple, https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
Ce format d'URL est l'une des recommandations AWS S3 : voir[Accès à un seau](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)et[cette description des préfixes](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html).ERDDAP™exige que vous combinez l'URL du seau et le préfixe optionnel en une URL afin de spécifier le&lt;cacheFromUrl&gt; (ou&lt;fichierDir&gt;) où les fichiers sont situés.

#### Tester les seauts publics AWS S3{#test-public-aws-s3-buckets} 
Pour les seaux publics, vous pouvez et devriez tester l'URL du seau du répertoire AWS S3 dans votre navigateur, par exemple,
[ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)Si l'URL du seau est correcte et appropriée pourERDDAP, il retournera un document XML qui a (partielle) liste du contenu de ce seau. Malheureusement, l'URL complète (i.e., URL seau plus préfixe) quiERDDAP™veut pour un ensemble de données donné ne fonctionne pas dans un navigateur. AWS n'offre pas de système pour parcourir la hiérarchie d'un seau facilement dans votre navigateur. (Si c'est incorrect, veuillez envoyer un courriel à Chris. John à noaa.gov. Sinon, Amazon, s'il vous plaît ajouter un support pour cela&#33;) 

#### Affichage du contenu d'un seau{#viewing-the-contents-of-a-bucket} 
Les seaux S3 contiennent souvent quelques catégories de fichiers, dans quelques pseudo-sous-répertoires, qui pourraient devenir un couple deERDDAP™les ensembles de données. Pour faire leERDDAP™datasets, vous devez connaître le répertoire de départ pour&lt;cacheFromUrl&gt; (ou&lt;fileDir&gt;) et le format des noms de fichiers qui identifient ce sous-ensemble de fichiers. Si vous essayez de voir l'intégralité du contenu d'un seau dans un navigateur, S3 vous montrera les 1000 premiers fichiers, ce qui est insuffisant. Actuellement, la meilleure façon pour vous de voir tout le contenu d'un seau est de faire un[EDDTableFromFileNames](#eddtablefromfilenames)ensemble de données (sur votre PCERDDAP™et/ou sur votre publicERDDAP) , qui vous permet également de parcourir facilement la structure du répertoire et de télécharger des fichiers. Les&lt;fileDir&gt; pour cela sera l'URL que vous avez faite ci-dessus, par exemple, https://noaa-goes17.s3.us-east-1.amazonaws.com .\\[Pourquoi AWS S3 n'offre-t-il pas un moyen rapide et facile à quiconque de le faire sans compte AWS ?\\]Notez que lorsque je le fais sur mon PC sur un réseau non-Amazon, il semble qu'Amazon ralentisse la réponse à un filet (environ 100 (?) fichiers par morceau) après les premiers morceaux (de 1000 fichiers par morceau) sont téléchargés. Puisque les seaux peuvent avoir un grand nombre de fichiers (noaa-goes17 a 26 millions) , obtenir tout le contenu d'un seau peut prendre EDDTableFromFileNames plusieurs heures (Par exemple, 12 &#33;) pour finir.\\[Amazon, c'est vrai ?&#33;\\]

#### Faire une table EDD FromFileNames Dataset avec un seau AWS S3{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Si vous avez un nom de seau, mais n'avez pas déjà une liste de fichiers dans le seau S3 ou le préfixe qui identifie l'emplacement des fichiers pertinents dans le seau, utilisez les instructions ci-dessous pour faire un jeu de données EDDTableFromFileNames afin que vous puissiez parcourir la hiérarchie de répertoire du seau S3 viaERDDAP's"files"système.

1. Ouvrir un compte AWS
    ERDDAP™utilise les[AWS SDK pourJava](https://docs.aws.amazon.com/sdk-for-java/index.html)pour obtenir des informations de seau de AWS, donc vous devez[créer et activer un compte AWS](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). C'est un gros boulot, avec beaucoup de choses à apprendre.
     
2. Placez vos lettres de créances AWS oùERDDAP™peut les trouver.
Suivez les instructions[Créer des titres de compétence AWS et une région pour le développement](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials)doncERDDAP™  (spécifiquement, le SDK AWS pourJava) sera en mesure de trouver et d'utiliser vos identifiants AWS. SiERDDAP™ne trouve pas les références, vous verrez un
- Oui. Argument illégalException: fichier de profil ne peut pas être une erreur nulle dansERDDAPLe fichier log.txt.
    
Conseil pour Linux et Mac OS: le fichier d'identification doit être dans le répertoire personnel de l'utilisateur qui exécute Tomcat (etERDDAP)   (pour ce paragraphe, nous supposerons user=tomcat) dans un fichier appelé ~/.aws/credentials . Ne supposez pas que ~ est /home/tomcat -- utilise réellement cd ~ pour savoir où le système d'exploitation pense ~ pour user=tomcat est. Créer le répertoire s'il n'existe pas. Aussi, après avoir mis le fichier d'identification en place, assurez-vous que l'utilisateur et le groupe pour le fichier sont tomcat, puis utilisez les identifiants chmod 400 pour vous assurer que le fichier est en lecture seule pour user=tomcat.
    
3. Créer l'URL du seau[format quiERDDAP™nécessite](#accessing-files-in-an-aws-s3-bucket), par exemple,
    [ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)et (pour les seaux publics) testez-le dans un navigateur pour vous assurer qu'il retourne un document XML qui a une liste partielle du contenu de ce seau.
     
4. Utilisation[Générer des ensembles de donnéesXml](#generatedatasetsxml)créer un[EDDTableFromFileNames](#eddtablefromfilenames)ensemble de données:
    * Pour le répertoire de démarrage, utilisez cette syntaxe :
        \\*\\*\\ *deOnTheFly,* votreBucketUrl*
par exemple,
        \\*\\*\\*deOnTheFly, https://noaa-goes17.s3.us-east-1.amazonaws.com/
 
    * Nom du fichier Regex ? .\\*
    * Récursif ? vrai
    * recharger Tous les NMinutes ? 10080
    *   infoUrl? https://registry.opendata.aws/noaa-goes/
 
    * l'institution?NOAA
    * Résumé ? rien (ERDDAP™créera automatiquement un résumé décent.) 
    * titre ? rien (ERDDAP™créera automatiquement un titre décent.) Comme d'habitude, vous devez éditer le XML résultant pour vérifier l'exactitude et faire des améliorations avant le morceau de datasets l'utiliser dansdatasets.xml.
5. Si vous suivez les instructions ci-dessus et chargez l'ensemble de donnéesERDDAP, vous avez créé un jeu de données EDDTableFromFiles. À titre d'exemple, et pour faciliter la navigation et le téléchargement des fichiers à partir des seaux AWS Open Data, nous avons créé des ensembles de données EDDTableFromFileNames (voir la liste à
    [ https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_ ](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_)) pour presque tous les[AWS S3 Seaux de données ouverts](https://registry.opendata.aws/).
    \\[Les quelques seaux que nous n'avons pas inclus non plus ont un grand nombre de fichiers dans le répertoire racine (plus que ce qui peut être téléchargé dans un délai raisonnable) , ou ne permettent pas l'accès public (Ils ne sont pas tous censés être publics ?) , ou sont des seaux de paiement du demandeur (Par exemple, Sentinel) .\\]  
Si vous cliquez sur le"files"lien pour l'un de ces ensembles de données, vous pouvez parcourir l'arborescence de répertoire et les fichiers dans ce seau S3. À cause du chemin\\*\\*\\*fromOnTheFly EDDTableFromFiles fonctionne, ces listes de répertoires sont toujours parfaitement à jour carERDDAP™Je les fais voler. Si vous cliquez sur l'arborescence du répertoire vers un nom de fichier réel et cliquez sur le nom du fichier,ERDDAP™redirigera votre demande vers AWS S3 afin que vous puissiez télécharger le fichier directement depuis AWS. Vous pouvez ensuite inspecter ce fichier.
    
Des problèmes ?
Si votre EDDTableFromFiles ne se charge pas dansERDDAP™  (ou DasDds) , cherchez un message d'erreur dans le fichier log.txt. Si vous voyez un
- Oui. Argument illégalException: fichier de profil ne peut pas être une erreur nulle, le problème est que le SDK AWS pourJava  (utilisés parERDDAP) ne trouve pas le dossier d'identification. Voir les instructions de vérification des pouvoirs ci-dessus.
     

Il est regrettable que AWS ne permet pas simplement aux gens d'utiliser un navigateur pour voir le contenu d'un seau public.

 **Alors tu peux faireERDDAP™ensembles de données qui donnent aux utilisateurs accès aux données dans les fichiers.**   
Voir les instructions[ERDDAP™et S3](#erddap-and-aws-s3-buckets)  (ci-dessus) .
Pour l'échantillon EDDTableFromFileNames datas ensemble que vous avez fait ci-dessus, si vous faites un petit tour avec le répertoire et les noms de fichiers dans l'arborescence des répertoires, il devient clair que les noms de répertoires de haut niveau (Par exemple, ABI-L1b-RadC) correspondent à ceERDDAP™appellerait des ensembles de données séparés. Le seau avec lequel vous travaillez peut être similaire. Vous pourriez ensuite continuer à créer des ensembles de données séparés dansERDDAP™pour chacun de ces ensembles de données, en utilisant, par exemple,
 https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
en tant que&lt;cacheFromUrl&gt;. Malheureusement, pour cet exemple particulier, les ensembles de données du seau semblent tous être des ensembles de données de niveau 1 ou 2, quiERDDAP™ [n'est pas particulièrement bon à](#dimensions), parce que l'ensemble de données est une collection plus compliquée de variables qui utilisent différentes dimensions.
     
    
### Fichiers NcML{#ncml-files} 
Les fichiers NcML vous permettent de spécifier les modifications à la volée à une ou plusieurs sources originalesNetCDF  (v3 ou v4)  .nc, .grib, .bufr, ou.hdf  (v4 ou v5) fichiers, et puis avoirERDDAP™traiter.ncfichiers ml comme les fichiers source.ERDDAP™les ensembles de données accepteront.ncfichiers ml chaque fois.ncles dossiers sont attendus. Les fichiers NcML DOIVENT avoir l'extension.ncml. Voir[UnidataDocumentation sur le NcML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html). NcML est utile parce que vous pouvez faire certaines choses avec elle (par exemple, apporter différentes modifications à différents fichiers dans une collection, y compris l'ajout d'une dimension avec une valeur spécifique à un fichier) Tu ne peux pas faire avecERDDAP'sdatasets.xml.

* Changements à une.ncle dernier temps modifié du fichier ml fera que le fichier sera rechargé chaque fois que l'ensemble de données est rechargé, mais des modifications au sous-jacent.ncles fichiers de données ne seront pas directement remarqués.
* Conseil: NcML est\\*Très\\*sensible à l'ordre de certains éléments du fichier NcML. Pensez à NcML comme spécifiant une série d'instructions dans l'ordre spécifié, dans l'intention de changer les fichiers source (l'état au début/haut du fichier NcML) dans les fichiers de destination (l'état à la fin/au bas du fichier NcML) .

Une alternative au NcML est[NetCDFOpérateurs (NCO) ](#netcdf-operators-nco). La grande différence est que NcML est un système pour faire des changements à la volée (donc les fichiers sources ne sont pas modifiés) , alors queNCOpeut être utilisé pour apporter des modifications à (ou de nouvelles versions) les dossiers. Les deuxNCOet NcML sont très, très flexibles et vous permettent de faire presque tout changement que vous pouvez penser aux fichiers. Pour les deux, il peut être difficile de comprendre exactement comment faire ce que vous voulez faire -- vérifier le web pour des exemples similaires. Les deux sont des outils utiles pour préparer netCDF etHDFfichiers à utiliser avecERDDAP, notamment pour apporter des changementsERDDAPLe système de manipulation peut faire.

Exemple #1: Ajout d'une dimension temporelle avec une valeur unique
Voici un.ncfichier ml qui crée une nouvelle dimension extérieure (durée, avec 1 valeur: 1041379200) et ajoute cette dimension à la variable pic dans le fichier A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc:
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Exemple 2 : Modifier une valeur temporelle existante
Parfois la source.ncfichier a déjà une dimension temporelle et une valeur temporelle, mais la valeur est incorrecte (à vos fins) . Cette.ncfichier ml dit: pour le fichier de données nommé "" 19810825233030-NCEI...", pour la variable dimension"time", définissez l'attribut unit pour être 'secondes depuis 1970-01-01T00:00:00Z' et définissez la valeur temporelle pour être 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
### NetCDFOpérateurs (NCO)  {#netcdf-operators-nco} 
"Les opérateurs netCDF (NCO) comprennent une douzaine de programmes autonomes en ligne de commande qui prennent netCDF\\[v3 ou v4\\],HDF \\[v4 ou v5\\],\\[.grib, .bufr,\\]et/ouDAPfichiers comme entrée, puis actionner (Par exemple, puiser de nouvelles données, calculer des statistiques, imprimer, hyperslab, manipuler des métadonnées) et affiche les résultats à l'écran ou aux fichiers en formats texte, binaire ou netCDF.NCOaide à l'analyse de données scientifiques maillées. Le style shell-command deNCOpermet aux utilisateurs de manipuler et d'analyser les fichiers de façon interactive, ou avec des scripts expressifs qui évitent certains survols d'environnements de programmation de niveau supérieur." (des[NCO](https://nco.sourceforge.net/)page d'accueil) .

Une alternativeNCOest[NcML](#ncml-files). La grande différence est que NcML est un système pour faire des changements à la volée (donc les fichiers sources ne sont pas modifiés) , alors queNCOpeut être utilisé pour apporter des modifications à (ou de nouvelles versions) les dossiers. Les deuxNCOet NcML sont très, très flexibles et vous permettent de faire presque tout changement que vous pouvez penser aux fichiers. Pour les deux, il peut être difficile de comprendre exactement comment faire ce que vous voulez faire -- vérifier le web pour des exemples similaires. Les deux sont des outils utiles pour préparer netCDF etHDFfichiers à utiliser avecERDDAP, notamment pour apporter des changementsERDDAPLe système de manipulation peut faire.

Par exemple, vous pouvez utiliserNCOpour rendre les unités de la variable temporelle cohérente dans un groupe de fichiers où elles n'étaient pas cohérentes à l'origine. Ou, vous pouvez utiliserNCOà appliquerscale\\_factoretadd\\_offsetdans un groupe de fichiers oùscale\\_factoretadd\\_offsetont des valeurs différentes dans différents fichiers sources.
 (Ou, vous pouvez maintenant gérer ces problèmes enERDDAP™par[EDDGridDeNcFilesNon emballé](#eddgridfromncfilesunpacked), qui est une variante deEDDGridDeNcFiles qui déballe les données emballées et standardise les valeurs de temps à un niveau bas afin de traiter avec une collection de fichiers qui ont différentsscale\\_factors etadd\\_offset, ou différentes unités de temps.) 

NCOest un logiciel libre et ouvert qui utilise le[GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html)licence.

Exemple 1 : rendre les unités cohérentes
EDDGridFromFiles et EDDTable Des fichiers insistent pour que les unités d'une variable donnée soient identiques dans tous les fichiers. Si certains fichiers sont triviaux (non fonctionnellement) différent des autres (p. ex.
"secondes depuis 1970-01-01 00:00:00 UTC" versus
"seconds since 1970-01-01T00:00:00Z", tu pourrais utiliserNCO's[ncatté](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor). pour changer les unités de tous les fichiers à être identiques avec
nco/ncatted -a unités,temps,o,c,'secondes depuis 1970-01-01T00:00:00Z' \\*.nc  
\\[Pour de nombreux problèmes comme ça dans EDDTableFrom... Fichiers datasets, vous pouvez maintenant utiliser[uniformiser Quoi ?](#standardizewhat)à direERDDAPpour standardiser les fichiers sources tels qu'ils sont lus dansERDDAP.\\]
    
### Limites à la taille d'un ensemble de données{#limits-to-the-size-of-a-dataset} 
Vous verrez de nombreuses références à "2 milliards" ci-dessous. Plus précisément, c'est une référence à 2 147 483 647 (231-1) , qui est la valeur maximale d'un entier signé 32 bits. Dans certains langages informatiques, par exempleJava  (quiERDDAP™est écrit en) , c'est le type de données le plus important qui peut être utilisé pour de nombreuses structures de données (par exemple, la taille d'un tableau) .

Pour les valeurs de chaîne (par exemple, pour les noms de variables, les noms d'attributs, les valeurs d'attributs de chaîne et les valeurs de données de chaîne) , le nombre maximal de caractères par chaîneERDDAP™est ~2 milliards. Mais dans presque tous les cas, il y aura de petits ou grands problèmes si une corde dépasse une taille raisonnable (Par exemple, 80 caractères pour les noms de variables et les noms d'attributs, et 255 caractères pour la plupart des valeurs d'attributs chaîne et des valeurs de données) . Par exemple, les pages Web qui affichent de longs noms de variables seront maladroitement larges et de longs noms de variables seront tronqués si elles dépassent la limite du type de fichier de réponse.

Pour les ensembles de données maillés:

* Le nombre maximal deaxisVariables est de ~2 milliards.
Le nombre maximal dedataVariables est de ~2 milliards.
Mais si un jeu de données a &gt; 100 variables, il sera lourd pour les utilisateurs à utiliser.
Et si un jeu de données a &gt;1 million de variables, votre serveur aura besoin de beaucoup de mémoire physique et il y aura d'autres problèmes.
* Taille maximale de chaque dimension (axisVariable) est ~2 milliards de valeurs.
* Je pense que le nombre maximal de cellules (le produit de toutes les dimensions) est illimité, mais il peut être ~9e18.

Pour les ensembles de données tabulaires:

* Le nombre maximal dedataVariables est de ~2 milliards.
Mais si un jeu de données a &gt; 100 variables, il sera lourd pour les utilisateurs à utiliser.
Et si un jeu de données a &gt;1 million de variables, votre serveur aura besoin de beaucoup de mémoire physique et il y aura d'autres problèmes.
* Nombre maximal de sources (par exemple, les fichiers) qui peut être agrégée est environ 2 milliards.
* Dans certains cas, le nombre maximal de lignes d'une source (par exemple, un fichier, mais pas une base de données) est ~2 milliards de lignes.
* Je ne pense pas qu'il y ait d'autres limites.

Pour les ensembles de données maillées et tabulaires, il y a des limites internes sur la taille du sous-ensemble qui peuvent être demandées par un utilisateur dans une seule requête (souvent liés à &gt;2 milliards de quelque chose ou ~9e18 de quelque chose) , mais il est beaucoup plus probable qu'un utilisateur touche les limites spécifiques au type de fichier.

*   NetCDFversion 3.ncles fichiers sont limités à 2 Go octets. (Si c'est vraiment un problème pour quelqu'un, prévenez-moi : Je pourrais ajouter le soutien pour leNetCDFversion 3.ncExtension 64 bits ouNetCDFLa version 4, qui augmenterait sensiblement la limite, mais pas infiniment.) 
* Navigateurs planter après seulement ~500 Mo de données, doncERDDAP™limite la réponse à.htmlTabledemande à ~400 Mo de données.
* De nombreux programmes d'analyse de données ont des limites semblables (par exemple, la taille maximale d'une dimension est souvent ~2 milliards de valeurs) , donc il n'y a aucune raison de travailler dur pour contourner les limites spécifiques au type de fichier.
* Les limites spécifiques au type de fichier sont utiles en ce sens qu'elles empêchent les demandes naïves pour des quantités vraiment énormes de données (par exemple, "donnez-moi toutes ces données" lorsque l'ensemble de données a 20 To de données) , qui prendrait des semaines ou des mois à télécharger. Plus le téléchargement est long, plus il risque d'échouer pour diverses raisons.
* Les limites spécifiques au type de fichier sont utiles dans la mesure où elles obligent l'utilisateur à traiter des sous-ensembles de taille raisonnable (par exemple, traiter avec un grand ensemble de données maillées via des fichiers avec des données à partir d'un point de temps chaque) .
         
### Passez à ACDD-1.3{#switch-to-acdd-13} 
Nous (notamment[Générer des ensembles de donnéesXml](#generatedatasetsxml)) actuellement recommandé[ACDD version 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3), qui a été ratifié au début de 2015 et qui est appelé "ACDD-1.3" dans l'attribut conventions mondiales. AvantERDDAP™version 1.62 (publié en juin 2015) ,ERDDAP™l ' original, version 1.0, de la version[NetCDFConvention sur les attributs pour la découverte de données](https://wiki.esipfed.org/ArchivalCopyOfVersion1)qui a été appelé "UnidataDataset Discovery v1.0" dans les conventions mondiales etMetadata\\_Conventionsattributs.

Si vos ensembles de données utilisent des versions antérieures d'ACDD, nous vous recommandons de passer à ACDD-1.3. Ce n'est pas dur. ACDD-1.3 est très rétrocompatible avec la version 1.0. Pour changer, pour tous les ensembles de données (saufEDDGridDeErddap et EDDTable Les ensembles de données d'Erddap) :

1. Supprimer le nouveau déprécié globalMetadata\\_Conventionsattribut en ajoutant (ou en modifiantMetadata\\_Conventionsattribut)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
à l'ensemble de données&lt;addAttributes&gt;.
     
2. Si l'ensemble de données a un attribut Conventions dans le&lt;addAttributes&gt;, tout changer "UnidataDataset Discovery v1.0" fait référence à "ACDD-1.3".
Si l'ensemble de données n'a pas d'attribut Conventions dans le global&lt;addAttributes&gt;, puis ajouter une référence à ACDD-1.3. Par exemple,
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Si l'ensemble de données a unstandard\\_name\\_vocabularyattribut, veuillez modifier le format de la valeur, par exemple,
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Si la référence est à une ancienne version de la[Tableau des noms standard des FC](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). c'est probablement une bonne idée de passer à la version actuelle (65, alors que nous écrivons) , puisque de nouveaux noms standard sont ajoutés à cette table avec des versions ultérieures, mais les anciens noms standard sont rarement dépréciés et jamais supprimés.
     
4. Bien que ACDD-1.0 ait inclus des attributs globaux pourcreator\\_name,creator\\_email,creator\\_url,[Générer des ensembles de donnéesXml](#generatedatasetsxml)ne les a pas automatiquement ajoutés avant un certain tempsERDDAP™v1.50. Cette information est importante :
        
    *   creator\\_namepermet aux utilisateurs de connaître/citer le créateur du jeu de données.
    *   creator\\_emailindique aux utilisateurs l'adresse électronique privilégiée pour contacter le créateur de l'ensemble de données, par exemple s'ils ont des questions sur l'ensemble de données.
    *   creator\\_urldonne aux utilisateurs un moyen d'en savoir plus sur le créateur.
    *   ERDDAP™utilise toutes ces informations lors de la production de documents de métadonnées FGDC et ISO 19115-2/19139 pour chaque ensemble de données. Ces documents sont souvent utilisés par les services de recherche externe.
    
Veuillez ajouter ces attributs à l'ensemble de données&lt;addAttributes&gt;.
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
C'est ça. J'espère que ce n'était pas trop dur.
     
### Zarr{#zarr} 
En date de la version 2.25ERDDAP™peut lire local Fichiers Zarr utilisant[EDDTableFromNcFiles](#eddtablefromncfiles)et[EDDGridDeNcFiles](#eddgridfromncfiles).

 (En août 2019) Nous pourrions facilement nous tromper, mais nous ne sommes pas encore convaincus que[Zarr](https://github.com/zarr-developers/zarr-python), ou des systèmes similaires qui décomposent les fichiers de données en petits morceaux, sont de grandes solutions au problème deERDDAP™lecture de données stockées dans des services cloud comme Amazon AWS S3. Zarr est une grande technologie qui a démontré son utilité dans une variété de situations, nous ne sommes tout simplement pas sûrs queERDDAP+S3 sera l'une de ces situations. La plupart du temps, nous disons: avant de nous précipiter pour faire l'effort de stocker toutes nos données dans Zarr, faisons quelques tests pour voir si c'est en fait une meilleure solution.

Les problèmes d'accès aux données dans le cloud sont latences (le décalage pour obtenir les données) et accès au niveau des fichiers (plutôt que l'accès au niveau des blocs) . Zarr résout le problème d'accès au niveau des fichiers, mais ne fait rien sur la latence. Comparé au téléchargement du fichier (il peut donc être lu comme un fichier local avec un accès au niveau bloc) , Zarr peut même aggraver le problème de latence parce que, avec Zarr, lire un fichier implique maintenant une série de plusieurs appels pour lire différentes parties du fichier (chacun avec son propre décalage) . Le problème de latence peut être résolu en parallélisant les demandes, mais c'est une solution de niveau supérieur, non dépendante de Zarr.

Et avec Zarr (comme pour les bases de données relationnelles) , nous perdons la commodité d'avoir un fichier de données être un fichier simple, unique que vous pouvez facilement vérifier l'intégrité de, ou faire / télécharger une copie de .

ERDDAP™  (en date de v2) dispose d'un système pour maintenir un cache local de fichiers à partir d'une source URL (Par exemple, S3) (voir [&lt;cacheFromUrl&gt; et&lt;cacheMaxGB&gt;] (#cachefromurl) ) . Et le nouveau [&lt;nThreads&gt;] (#Nthreads) devrait minimiser le problème de latence en parallélisant la récupération des données à un niveau élevé.&lt;cacheFromUrl&gt; semble très bien fonctionner pour de nombreux scénarios. (Nous ne savons pas à quel point&lt;nThreads&gt; est sans autres tests.) Nous admettons que nous n'avons pas fait de tests de synchronisation sur une instance AWS avec une bonne connexion réseau, mais nous avons testé avec succès avec diverses sources d'URL distantes de fichiers. EtERDDAP's&lt;cacheFromUrl&gt; fonctionne avec tout type de fichier de données (Par exemple,.nc,.hdf, .csv,.jsonlCSV) , même si comprimé externement (Par exemple,.gz) , sans aucune modification des fichiers (Par exemple, les réécrire comme collections Zarr) .

Il est probable que différents scénarios favoriseront différentes solutions, par exemple, il suffit de lire une partie d'un fichier une fois (Zarr va gagner) , vs. besoin de lire tout un fichier une fois, vs. besoin de lire une partie ou la totalité d'un fichier à plusieurs reprises (&lt;cacheFromUrl&gt; gagnera).

La plupart du temps, nous disons: avant de nous précipiter pour faire l'effort de stocker toutes nos données dans Zarr, faisons quelques tests pour voir si c'est en fait une meilleure solution.

- - Oui.
## Liste des types{#list-of-types-datasets} 
Si vous avez besoin d'aide pour choisir le bon type de données, consultez[Choix du type de données](#choosing-the-dataset-type).

Les types de séries de données se répartissent en deux catégories. ([Pourquoi ?](#why-just-two-basic-data-structures)) 

### EDDGrid {#eddgrid} 
*   [ **EDDGrid** ](#eddgrid)les ensembles de données gèrent les données maillées.
    * EnEDDGridles ensembles de données, les variables de données sont des tableaux multidimensionnels de données.
    * Il DOIT y avoir une variable d'axe pour chaque dimension. Les variables d'axe DOIVENT être spécifiées dans l'ordre où les variables de données les utilisent.
    * EnEDDGridensembles de données, toutes les variables de données DOIVENT être utilisées (part) toutes les variables d'axe.
         ([Pourquoi ?](#why-just-two-basic-data-structures) [Et s'ils ne le font pas ?](#dimensions)) 
    * Valeurs de dimension triées - En toutEDDGridensembles de données, chaque dimension DOIT être triée (ascendant ou descendant) . Chacun peut être irrégulièrement espacé. Il ne peut y avoir de liens. C'est une exigence de la[Norme sur les métadonnées des FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Si les valeurs d'une dimension ne sont pas triées, l'ensemble de données ne sera pas chargé etERDDAP™identifiera la première valeur non triée dans le fichier journal, *BigParent Directory* /logs/log.txt .
        
Quelques sous-classes ont des restrictions supplémentaires (notamment :EDDGridAgrégateExistingDimension exige que la dimension extérieure (la plus gauche, la première) soit ascendante.
        
Les valeurs de dimension non triées indiquent presque toujours un problème avec l'ensemble de données source. Cela se produit le plus souvent lorsqu'un fichier mal nommé ou inapproprié est inclus dans l'agrégation, ce qui conduit à une dimension temporelle non triée. Pour résoudre ce problème, voir le message d'erreurERDDAP™log.txt fichier pour trouver la valeur de temps offensif. Ensuite, regardez dans les fichiers sources pour trouver le fichier correspondant (ou une avant ou une après) Ça n'appartient pas à l'agrégation.
        
    * Voir la description plus complète de la[EDDGridmodèle de données](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel).
    * LesEDDGridles types de données sont:
        *   [EDDGridDepuisAudioFiles](#eddfromaudiofiles)regroupe les données d'un groupe de fichiers audio locaux.
        *   [EDDGridDeDap](#eddgridfromdap)gère les données maillées deDAPles serveurs.
        *   [EDDGridD'EDDTable](#eddgridfromeddtable)vous permet de convertir un ensemble de données tabulaires en un ensemble de données maillées.
        *   [EDDGridDeErddap](#eddfromerddap)gère les données maillées d'une télécommandeERDDAP.
        *   [EDDGridDe Etopo](#eddgridfrometopo)Il suffit de gérer les données de topographie ETOPO intégrées.
        *   [EDDGridFichiers](#eddgridfromfiles)est la superclasse de tousEDDGridDes cours sur les fichiers.
        *   [EDDGridDeMergeIRFiles](#eddgridfrommergeirfiles)données agrégées provenant d'un groupe de MergeIR local.gzfichiers.
        *   [EDDGridDeNcFiles](#eddgridfromncfiles)données agrégées provenant d'un groupeNetCDF  (v3 ou v4)  .ncet les dossiers connexes.
        *   [EDDGridDeNcFilesNon emballé](#eddgridfromncfilesunpacked)est une variante siEDDGridDeNcFiles qui regroupe également des données d'un groupe deNetCDF  (v3 ou v4)  .ncet les fichiers connexes, quiERDDAP™Déballe à un niveau bas.
        *   [EDDGridLonPM180](#eddgridlonpm180)modifie les valeurs de longitude d'un enfantEDDGridde sorte qu'ils soient dans la gamme -180 à 180.
        *   [EDDGridLon0360](#eddgridlon0360)modifie les valeurs de longitude d'un enfantEDDGridde sorte qu'ils se situent entre 0 et 360.
        *   [EDDGridSideBySide](#eddgridsidebyside)agrégats deux ou plusEDDGridles ensembles de données côte à côte.
        *   [EDDGridTotalExistingDimension](#eddgridaggregateexistingdimension)agrégats deux ou plusEDDGridles ensembles de données, dont chacun a une gamme différente de valeurs pour la première dimension, mais des valeurs identiques pour les autres dimensions.
        *   [EDDGridCopier](#eddgridcopy)peut faire une copie locale d'un autreEDDGridles données et sert les données de la copie locale.
             
    * TousEDDGridles ensembles de données prennent en charge un paramètre nThreads, qui indiqueERDDAP™combien de threads à utiliser pour répondre à une demande. Voir[nThreads](#nthreads)documentation pour plus de détails.
         
### Tableau EDD{#eddtable} 
*   [ **Tableau EDD** ](#eddtable)les ensembles de données gèrent les données tabulaires.
    * Les données tabulaires peuvent être représentées comme une table de base de données avec des lignes et des colonnes. Chaque colonne (une variable de données) a un nom, un ensemble d'attributs, et stocke seulement un type de données. Chaque rangée a une observation (ou groupe de valeurs apparentées) . La source de données peut avoir les données dans une structure de données différente, une structure de données plus compliquée et/ou plusieurs fichiers de données, maisERDDAP™doit pouvoir aplatir les données sources dans un tableau semblable à une base de données afin de présenter les données comme un ensemble de données tabulaires aux utilisateurs deERDDAP.
    * Voir la description plus complète de la[Modèle de données EDDTable](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel).
    * Les types de données EDDTable sont:
        *   [EDDTableFromAllDatasets](#eddtablefromalldatasets)est un ensemble de données de niveau supérieur qui a des informations sur tous les autres ensembles de données dans votreERDDAP.
        *   [EDDTableFromAsciiFiles](#eddtablefromasciifiles)agrége les données des fichiers de données ASCII tabulaires séparés par des virgules, des onglets, des point-virgules ou des espaces.
        *   [EDDTableFromAsciiService](#eddtablefromasciiservice)est la superclasse de toutes les classes EDDTableFromAsciiService...
        *   [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos)gère les données de certains desNOAAServices Web NOS.
        *   [EDDTableFromAudioFiles](#eddfromaudiofiles)regroupe les données d'un groupe de fichiers audio locaux.
        *   [Tableau EDD de Fichiers AwsXml](#eddtablefromawsxmlfiles)agrégats de données d'un ensemble de Station météorologique automatique (AWS) Fichiers XML.
        *   [EDDTableDeCassandra](#eddtablefromcassandra)gère les données tabulaires d'une table Cassandra.
        *   [EDDTableDeColumnarAsciiFiles](#eddtablefromcolumnarasciifiles)regroupe les données des fichiers de données ASCII tabulaires avec des colonnes de données à largeur fixe.
        *   [EDDTableFromDapSéquence](#eddtablefromdapsequence)gère les données tabulaires deDAPles serveurs de séquence.
        *   [EDDTableFromDatabase](#eddtablefromdatabase)gère les données tabulaires d'une table de base de données.
        *   [Tableau EDD deEDDGrid](#eddtablefromeddgrid)vous permet de créer un ensemble de données EDDTable à partir d'unEDDGridensemble de données.
        *   [EDDTableDeErddap](#eddfromerddap)gère les données tabulaires d'une télécommandeERDDAP.
        *   [EDDTableFromFileNames](#eddtablefromfilenames)crée un ensemble de données à partir d'informations sur un groupe de fichiers dans le système de fichiers du serveur, mais il ne sert pas de données à partir des fichiers.
        *   [EDDTableFromFiles](#eddtablefromfiles)est la superclasse de toutes les classes EDDTableFrom...Files.
        *   [EDDTableFromHttpGet](#eddtablefromhttpget)estERDDAPLe seul système d'importation de données et d'exportation de données.
        *   [Tableau EDD deHyraxFichiers](#eddtablefromhyraxfiles)  (DÉPREUVE) agrégats données de fichiers avec plusieurs variables avec dimensions partagées desservies par un[Hyrax OPeNDAPserveur](https://www.opendap.org/software/hyrax-data-server).
        *   [EDDTableFromInvalidCRAFiles](#eddtablefrominvalidcrafiles)données agrégéesNetCDF  (v3 ou v4)  .ncfichiers qui utilisent une variante spécifique, non valide, du DSG Contiguous Array (ARC) fichiers. Bien queERDDAP™prend en charge ce type de fichier, c'est un type de fichier invalide que personne ne devrait commencer à utiliser. Les groupes qui utilisent actuellement ce type de fichier sont fortement encouragés à utiliserERDDAP™pour générer des fichiers valides de l'ARC DSG des FC et cesser d'utiliser ces fichiers.
        *   [Tableau EDD deJsonlCSVFiles](#eddtablefromjsonlcsvfiles)données agrégées[JSON Fichiers CSV de lignes](https://jsonlines.org/examples/).
        *   [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)données agrégéesNetCDF  (v3 ou v4)  .ncfichiers avec plusieurs variables avec des dimensions partagées.
        *   [EDDTableFromNcFiles](#eddtablefromncfiles)données agrégéesNetCDF  (v3 ou v4)  .ncfichiers avec plusieurs variables avec des dimensions partagées. Il est bon de continuer à utiliser ce type d'ensemble de données pour les ensembles de données existants, mais pour les nouveaux ensembles de données, nous recommandons plutôt d'utiliser EDDTableFromMultidimNcFiles.
        *   [EDDTableFromNcCFFiles](#eddtablefromnccffiles)données agrégéesNetCDF  (v3 ou v4)  .ncfichiers qui utilisent un des formats de fichiers spécifiés par le[FC Géométries d'échantillonnage discrètes (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Convention. Mais pour les fichiers utilisant une des variantes multidimensionnelles CF DSG, utiliser[EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)à la place.
        *   [EDDTableFromNccsvFiles](#eddtablefromnccsvfiles)données agrégées[NCCSV](/docs/user/nccsv-1.00)Fichiers ASCII .csv.
        *   [EDDTableFromNOS](#eddtablefromnos)  (DÉPREUVE) gère les données tabulaires des serveurs XML NOS.
        *   [EDDTableFromOBIS](#eddtablefromobis)gère les données tabulaires des serveurs OBIS.
        *   [EDDTableFromParquetFiles](#eddtablefromparquetfiles)gère les données de[Parquet](https://parquet.apache.org/).
        *   [Tableau EDD deSOS](#eddtablefromsos)gère les données tabulaires deSOSles serveurs.
        *   [EDDTableFromThreddsFiles](#eddtablefromthreddsfiles)  (DÉPREUVE) agrégats données de fichiers avec plusieurs variables avec dimensions partagées desservies par un[THÉRÈDESOPeNDAPserveur](https://www.unidata.ucar.edu/software/tds/).
        *   [Tableau EDD deWFSFichiers](#eddtablefromwfsfiles)  (DÉPREUVE) fait une copie locale de toutes les données d'unArcGISCarteServeurWFSpour que les données puissent ensuite être ré-servées rapidement àERDDAP™utilisateurs.
        *   [EDDTableAgrégatRows](#eddtableaggregaterows)peut faire un ensemble de données EDDTable à partir d'un groupe de séries de données EDDTable.
        *   [EDDTableCopy](#eddtablecopy)peut faire une copie locale de nombreux types d'ensembles de données EDDTable et ensuite ré-server les données rapidement à partir de la copie locale.

  
- - Oui.

## Descriptions détaillées des types de données{#detailed-descriptions-of-dataset-types} 

### EDDGridDeDap{#eddgridfromdap} 
[ **EDDGridDeDap** ](#eddgridfromdap)gère les variables de grille[DAP](https://www.opendap.org/)les serveurs.

* Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez recueillir les informations dont vous avez besoin pour modifier cela ou créer votre propre XML pour unEDDGridDeDap dataset en regardant les fichiers DDS et DAS de la source dans votre navigateur (en ajoutant .das et .dds ausourceUrl, par exemple,[ https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds ](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds)) .
     
*   EDDGridDeDap peut obtenir des données à partir de n'importe quelle variable multidimensionnelle d'unDAPserveur de données. (Précédemment,EDDGridDeDap était limité aux variables désignées comme « réseau », mais ce n'est plus une exigence.)   
     
* Valeurs de dimension triées - Les valeurs de chaque dimension DOIVENT être triées dans l'ordre (ascendant ou descendant) . Les valeurs peuvent être irrégulièrement espacées. Il ne peut y avoir de liens. C'est une exigence de la[Norme sur les métadonnées des FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Si les valeurs d'une dimension ne sont pas triées, l'ensemble de données ne sera pas chargé etERDDAP™identifiera la première valeur non triée dans le fichier journal, *BigParent Directory* /logs/log.txt .
    
Les valeurs de dimension non triées indiquent presque toujours un problème avec l'ensemble de données source. Cela se produit le plus souvent lorsqu'un fichier mal nommé ou inapproprié est inclus dans l'agrégation, ce qui conduit à une dimension temporelle non triée. Pour résoudre ce problème, voir le message d'erreurERDDAP™log.txt fichier pour trouver la valeur de temps offensif. Ensuite, regardez dans les fichiers sources pour trouver le fichier correspondant (ou une avant ou une après) Ça n'appartient pas à l'agrégation.
    
#### EDDGridA partir du squelette Dap XML{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
### EDDGridD'EDDTable{#eddgridfromeddtable} 
[ **EDDGridD'EDDTable** ](#eddgridfromeddtable)vous permet de convertir un ensemble de données tabulaires EDDTable en unEDDGridensemble de données maillées. Rappelez-vous queERDDAP™traite les ensembles de données comme[ensembles de données maillés (Sous-classesEDDGrid) ou tabulaires (Sous-classes du tableau EDD) ](#why-just-two-basic-data-structures).

* Normalement, si vous avez des données maillées, vous venez de configurer unEDDGriddataset directement. Parfois, ce n'est pas possible, par exemple, lorsque vous avez les données stockées dans une base de données relationnelle quiERDDAP™ne peut accéder qu'avec EDDTableFromDatabase.EDDGridDe la classe EDDTable vous permet de remédier à cette situation.
     
* De toute évidence, les données de l'ensemble de données EDDTable sous-jacent doivent (fondamentalement) données maillées, mais sous forme de tableau. Par exemple, l'ensemble de données EDDTable peut avoir des données CTD : mesures du courant est et nord, à plusieurs profondeurs, à plusieurs reprises. Puisque les profondeurs sont les mêmes à chaque point,EDDGridDe EDDTable peut créer un ensemble de données maillées avec une dimension temps et profondeur qui accède aux données via l'ensemble de données EDDTable sous-jacent.
     
* Générer des ensembles de données Xml -- Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez recueillir l'information dont vous avez besoin pour améliorer le brouillon.
     
* Attributs de source -- Comme pour tous les autres types de ensembles de données,EDDGridDeTable a l'idée qu'il y a des sources mondialesAttributes et[mondialaddAttributes](#global-attributes)  (spécifiée dansdatasets.xml) , qui sont combinés pour faire le Attributs, qui sont ce que les utilisateurs voient. Pour source mondialeAttributes,EDDGridFromEDDTable utilise la combinaison mondiale Attributs de l'ensemble de données EDDTable sous-jacent. (Si vous y réfléchissez une minute, c'est logique.) 
    
De même, pour chaqueaxisVariableetdataVariable's[addAttributes](#addattributes),EDDGridFromEDDTable utilise la combinaison de la variable Attributs de l'ensemble de données EDDTable sous-jacentEDDGridSource de la variable EDDTableAttributes. (Si vous y réfléchissez une minute, c'est logique.) 
    
Par conséquent, si la table EDD a de bonnes métadonnées,EDDGridFromEDDTable a souvent besoin de très peuaddAttributesmétadonnées -- juste quelques modifications ici et là.
    
*   dataVariables versusaxisVariableS... La table EDD sous-jacente n'adataVariablePar. UneEDDGridL'ensemble de données d'EDDTable aura quelquesaxisVariables (créé à partir de certains des EDDTabledataVariables) et certainsdataVariables (créé à partir du reste de la table EDDdataVariables) .[Générer des ensembles de donnéesXml](#generatedatasetsxml)fera une estimation de quel EDDTabledataVariables devrait devenirEDDGridD'EDDTableaxisVariableS, mais c'est juste une supposition. Vous devez modifier la sortie de GenerateDatasetsXml pour spécifierdataVariables deviendraaxisVariables, et dans quel ordre.
     
* AxeValeurs -- Il n'y a rien à dire sur la table EDD sous-jacenteEDDGridD'EDDTableaur les valeurs possibles duaxisVariables dans la version maillée de l'ensemble de données, de sorte que vous DOIVENT fournir ces informations pour chaqueaxisVariablevia l'un de ces attributs:
    
    * axisValues -- vous permet de spécifier une liste de valeurs. Par exemple,
        &lt;att name="axisValues"[type "doubleListe"](#attributetype)\\&gt;2, 2.5, 3, 3.5, 4&lt;/att&gt;
Noter l'utilisation de[type de données](#data-types)plus le mot Liste. Aussi, le type de liste (Par exemple, double) DOIT correspondre aux données Type de variable dans la table EDD etEDDGridLes ensembles de données d'EDDTable.
    * axisValuesStartStrideStop -- permet de spécifier une séquence de valeurs régulièrement espacées en spécifiant les valeurs de début, de marche et d'arrêt. Voici un exemple qui est équivalent à l'axeValues exemple ci-dessus:
        &lt;att name=AxisValuesStartStrideStop"[type "doubleListe"](#attributetype)\\&gt;2, 0,5, 4&lt;/att&gt;
Encore une fois, notez l'utilisation d'un type de données de liste. Aussi, le type de liste (Par exemple, double) DOIT correspondre aux données Type de variable dans la table EDD etEDDGridLes ensembles de données d'EDDTable.
         
    
Mises à jour -- Comme il n'y a aucun moyen pourEDDGridDe la table EDD pour déterminer l'axeValues de la table EDD initialement, il n'y a pas non plus de moyen fiable pourEDDGridDe la table EDD pour déterminer à partir de la table EDD lorsque l'axeValeurs ont changé (notamment quand il y a de nouvelles valeurs pour la variable temps) . Actuellement, la seule solution est de modifier l'attribut axisValues dansdatasets.xmlet recharge l'ensemble de données. Par exemple, vous pouvez écrire un script à
    
    1. Recherchedatasets.xmlpour
        datasetID=" *l'IDDataset* "
donc vous travaillez avec le bon jeu de données.
    2. Recherchedatasets.xmlpour la prochaine
        <sourceName> *leNomSourceVariables* </sourceName>  
donc vous travaillez avec la bonne variable.
    3. Recherchedatasets.xmlpour la prochaine
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
Donc vous connaissez la position de départ de l'étiquette.
    4. Recherchedatasets.xmlpour la prochaine
```
        </att>  
```
pour connaître la position finale des valeurs de l'axe.
    5. Remplacez l'ancienne valeur de départ, marchez, arrêtez les valeurs avec les nouvelles valeurs.
    6. Contactez la[URL du drapeau](/docs/server-admin/additional-information#set-dataset-flag)pour l'ensemble de données à indiquerERDDAP™pour recharger l'ensemble de données.
    
Ce n'est pas idéal, mais ça marche.
     
* précision -- QuandEDDGridD'EDDTable répond à la demande de données d'un utilisateur, il déplace une ligne de données du tableau de réponse EDDTable dans leEDDGridgrille de réponse. Pour ce faire, il faut déterminer si les valeurs "axe" sur une ligne donnée dans le tableau correspondent à une combinaison de valeurs d'axe dans la grille. Pour les types de données entiers, il est facile de déterminer si deux valeurs sont égales. Mais pour les flotteurs et les doubles, cela soulève l'horrible problème des nombres de points flottants[ne correspond pas exactement](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/). (par exemple, 0,2 versus 0.199999999999996) . Aux (essayer de) traiter avec ça,EDDGridDeTable vous permet de spécifier un attribut de précision pour n'importe lequel desaxisVariables, qui spécifie le nombre total de décimales qui doivent être identiques.
    * Par exemple,&lt;nom de l'att"précision" type"int"&gt;5&lt;/att&gt;
    * Pour différents types de variables de données, il existe différentes valeurs de précision par défaut. Les valeurs par défaut sont généralement appropriées. Sinon, vous devez spécifier différentes valeurs.
    * PouraxisVariables qui sont[heure ou heure Variables du timbre](#timestamp-variables), la précision par défaut est pleine (une correspondance exacte) .
    * PouraxisVariables qui sont des flotteurs, la précision par défaut est 5.
    * PouraxisVariables qui sont des doubles, la précision par défaut est 9.
    * PouraxisVariables qui ont des types de données entiers,EDDGridFromEDDTable ignore l'attribut de précision et utilise toujours la pleine précision (une correspondance exacte) .
         
    *    **ATTENTION &#33;** Lors de la conversion d'un morceau de données tabulaires en un morceau de données maillées, siEDDGridD'EDDTable ne peut pas correspondre à une valeur "axe" EDDTable à l'une des valeurs attenduesEDDGridValeurs de l'axe d'EDDTable,EDDGridD'EDDTable silencieusement (pas d'erreur) jette les données de cette ligne de la table. Par exemple, il peut y avoir d'autres données (pas sur la grille) dans l'ensemble de données EDDTable. (Et si stride &gt; 1, ce n'est pas évidentEDDGridDeTable, quelles valeurs d'axe sont souhaitées et lesquelles sont celles qui doivent être ignorées à cause de la foulée.) Ainsi, si les valeurs de précision sont trop élevées, l'utilisateur verra des valeurs manquantes dans la réponse aux données lorsque des valeurs de données valides existent réellement.
        
Inversement, si les valeurs de précision sont trop basses, les valeurs de l'axe EDDTable ne devraient pas correspondreEDDGridLes valeurs de l'axe d'EDDTable (par erreur) C'est égal.
        
Ces problèmes potentiels sont horribles, parce que l'utilisateur obtient les mauvaises données (ou valeurs manquantes) quand ils devraient obtenir les bonnes données (ou au moins un message d'erreur) .
Ce n'est pas un défautEDDGridDe la Table.EDDGridDeTable ne peut pas résoudre ce problème. Le problème est inhérent à la conversion des données tabulaires en données maillées (sauf si d'autres hypothèses peuvent être faites, mais elles ne peuvent pas être faites ici) .
C'est à vous de décider.ERDDAP™administrateur, **testez votreEDDGridDe la table EDD** veiller à ce que les valeurs de précision soient fixées pour éviter ces problèmes potentiels.
        
#### écartSeuil{#gapthreshold} 
*   [écartSeuil](#gapthreshold)-- C'est un type de données très inhabituel. Depuis les types de requêtes qui peuvent être faites à (géré par) uneEDDGridensemble de données (liés aux portées et aux étapes de laaxisVariables) sont très différents des types de requêtes qui peuvent être faites à (géré par) un ensemble de données EDDTable (simplement lié aux plages de certaines variables) , la performance deEDDGridLes ensembles de données d'EDDTable varient considérablement selon la demande exacte qui est faite et la vitesse de l'ensemble de données EDDTable sous-jacent. Pour les requêtes ayant une valeur de marche &gt; 1,EDDGridD'EDDTable peut demander à l'EDDTable sous-jacente une partie relativement importante des données (comme si la marche =1) puis passer en revue les résultats, en gardant les données de certaines lignes et en jetant les données d'autres. S'il doit passer en revue beaucoup de données pour obtenir les données dont il a besoin, la demande prendra plus de temps à remplir.
    
SiEDDGridD'EDDTable peut indiquer qu'il y aura de grandes lacunes (avec des lignes de données indésirables) entre les lignes avec les données souhaitées,EDDGridFromEDDTable peut choisir de faire plusieurs sous-requêtes à la table EDD sous-jacente au lieu d'une grande requête, sauter ainsi les lignes indésirables de données dans les grandes lacunes. La sensibilité pour cette décision est contrôlée par la valeur de seuil d'écart spécifiée dans la&lt;tag gapThreshold&gt; (par défaut=1000 lignes de données sources) . Définir l'écartLe seuil à un nombre plus petit conduira à la création de l'ensemble de données (en général) plus de sous-demandes. Définir l'écartLe seuil à un plus grand nombre conduira à la création de l'ensemble de données (en général) moins de sous-demandes.
    
Si le seuil est trop petit,EDDGridDeEDDTable fonctionnera plus lentement parce que les frais généraux de plusieurs demandes seront plus élevés que le temps économisé en obtenant certaines données excédentaires. Si gapThreshold est trop grand,EDDGridDeEDDTable fonctionnera plus lentement parce que tant de données excédentaires seront récupérées de la table EDD, seulement pour être éliminées. (Comme Goldilocks l'a découvert, le milieu est "juste à droite".) Les frais généraux pour différents types d'ensembles de données EDDTable varient considérablement, de sorte que la seule façon de connaître le meilleur réglage réel pour votre ensemble de données est par expérimentation. Mais vous n'allez pas trop loin vous en tenir au défaut.
    
Un exemple simple est: Imaginez unEDDGridDeTable avec un seulaxisVariable  (durée, avec une taille de 100000) UnedataVariable  (température) , et l'écart par défautSeuil de 1000.
    
    * Si un utilisateur demande une température\\[0&#58;100&#58;5000\\], l'écart est de 100 donc la taille de l'écart est de 99, ce qui est inférieur à l'écartSeuil. AlorsEDDGridDeTable fera une seule demande à EDDTable pour toutes les données nécessaires à la demande (équivalent à la température\\[0:5000\\]) et jetez toutes les lignes de données dont il n'a pas besoin.
    * Si un utilisateur demande une température\\[0:2500:5000\\], cette étape est 2500 donc la taille de l'écart est 2499, ce qui est plus grand que l'écartSeuil. AlorsEDDGridDeTable fera des demandes distinctes à EDDTable qui sont équivalentes à la température\\[0\\], température\\[2500\\], température\\[5000\\].
    
Le calcul de la taille de l'écart est plus compliqué lorsqu'il y a plusieurs axes.
    
Pour chaque demande d'utilisateur,EDDGridDe EDDTable imprime des messages de diagnostic liés à ceci dans le[Log.txt](/docs/server-admin/additional-information#log)fichier.
    
    * Si [&lt;niveau de log&gt;] (Niveau) endatasets.xmlest défini à info, ce message est imprimé comme
\\* nOuterAxes=1 de 4 nOuterRequests=22
Si nOuterAxes=0, gapThreshold n'a pas été dépassé et une seule demande sera faite à EDDTable.
Si nOuterAxes&gt;0, gapThreshold a été dépassé et nOuterRequests sera fait à EDDTable, correspondant à chaque combinaison demandée de nOuterAxes le plus à gauche. Par exemple, si l'ensemble de données a 4axisVariables etdataVariableComme vers l'est\\[heure\\]\\[latitude\\]\\[longitude\\]\\[profondeur\\], le plus à gauche (première) La variable d'axe est le temps.
    * Si&lt;Niveau de log&gt; endatasets.xmlest défini à tous, des informations supplémentaires sont écrites dans le fichier log.txt.
         
#### EDDGridD'EDDTable squelette XML{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### EDD*ERDDAP {#eddfromerddap} 
 **EDDGridDeErddap** gère les données maillées d'une télécommandeERDDAP™serveur.
 **EDDTableDeErddap** gère les données tabulaires d'une télécommandeERDDAP™serveur.

*   EDDGridDeErddap et EDDTableDeErddap se comportent différemment de tous les autres types de ensembles de donnéesERDDAP.
    * Comme d'autres types de ensembles de données, ces ensembles de données obtiennent des informations sur l'ensemble de données de la source et les gardent en mémoire.
    * Comme d'autres types de ensembles de données, lorsqueERDDAP™recherche des ensembles de données, affiche le formulaire d'accès aux données ( *datasetID* .html) , ou affiche le formulaire Make A Graph ( *datasetID* Graphique) ,ERDDAP™utilise les informations sur l'ensemble de données qui est en mémoire.
    *   EDDGridDeErddap et EDDTable FromErddap sont la base pour[quadrillages/clusters/federations](/docs/server-admin/scaling)desERDDAPs, qui distribue efficacement l'utilisation du processeur (principalement pour faire des cartes) , l'utilisation de la mémoire, le stockage des ensembles de données et l'utilisation de la bande passante d'un grand centre de données.
#### Réorienter{#redirect} 
* Contrairement à d'autres types de ensembles de données, lorsqueERDDAP™reçoit une demande de données ou d'images de ces ensembles de données,ERDDAP [redirections](https://en.wikipedia.org/wiki/URL_redirection)la demande à la télécommandeERDDAP™serveur. Le résultat est:
    * C'est très efficace (CPU, mémoire et bande passante) , parce que autrement
        1. Le compositeERDDAP™doit envoyer la demande à l'autreERDDAP™  (qui prend du temps) .
        2. L'autreERDDAP™doit obtenir les données, les reformater et les transmettre au compositeERDDAP.
        3. Le compositeERDDAP™doit recevoir les données (utilisant la bande passante) , reformater (utilisant le processeur et la mémoire) , et transmettre les données à l'utilisateur (utilisant la bande passante) . En redirigeant la requête et en autorisant l'autreERDDAP™pour envoyer la réponse directement à l'utilisateur, le compositeERDDAP™dépense essentiellement aucun temps CPU, mémoire, ou bande passante sur la demande.
    * La redirection est transparente pour l'utilisateur quel que soit le logiciel client (un navigateur ou tout autre logiciel ou outil de ligne de commande) .
*   [Vous pouvez le direERDDAP™](#redirect)ne pas rediriger les requêtes des utilisateurs en paramétrant&lt;redirection&gt;faux&lt;/redirect&gt;, mais cela nie la plupart des avantages du type de données ...FromErddap (notamment en dispersant la charge à l'avantERDDAP™vers la télécommande/arrière-planERDDAP) .
         
     
#### Abonnements{#subscriptions} 
Normalement, lorsqueEDDGridDeErddap et EDDTable D'Erddap sont (re) chargé sur votreERDDAP, ils essaient d'ajouter un abonnement à l'ensemble de données distant via la télécommandeERDDAPLe système d'abonnement email/URL. Ainsi, chaque fois que l'ensemble de données distant change, la distanteERDDAP™contacte le[setDataset URL du drapeau](/docs/server-admin/additional-information#set-dataset-flag)sur votreERDDAP™afin que l'ensemble de données local soit rechargé ASAP et que l'ensemble de données local soit toujours parfaitement à jour et imite l'ensemble de données distant. Donc, la première fois que cela arrive, vous devriez obtenir un email demandant que vous validez l'abonnement. Toutefois, si lesERDDAP™ne peut pas envoyer un email ou si la télécommandeERDDAP's e-mail/URL abonnement système n'est pas actif, vous devriez envoyer la télécommandeERDDAP™administrateur et demander qu'il ajoute manuellement [&lt;surChange&gt;] (#sur le changement) ...&lt;/onChange&gt; tags vers tous les ensembles de données pertinents pour appeler les données de votre ensemble[setDataset URLs d'affichage](/docs/server-admin/additional-information#set-dataset-flag). Voyez votreERDDAP™rapport quotidien pour une liste de setDataset Marquer les URL, mais envoyer celles pourEDDGridDeErddap et EDDTableDe l'ensemble de données d'Erddap à la télécommandeERDDAP™administrateur.
    
Ça ne marche pas ? Vos ensembles de données locaux ne restent-ils pas synchronisés avec les ensembles de données distants?
Plusieurs choses doivent fonctionner correctement pour que ce système fonctionne afin que vos ensembles de données restent à jour. Vérifiez chacune de ces choses dans l'ordre :
    
    1. VotreERDDAP™doit pouvoir envoyer des courriels. Voir les paramètres d'email dans votre setup.xml.
    2. En général (mais pas toujours) , votreERDDAP's&lt;baseUrl&gt; et&lt;baseHttpsUrl&gt;ne doit pas avoir de numéro de port (Par exemple: 8080, 8443) . Si c'est le cas, utilisez une[proxypass](/docs/server-admin/deploy-install#proxypass)pour enlever le port de l'Url.
    3. Dans votre setup.xml,&lt;s'abonnerToRemoteErddapDataset&gt; doit être défini à true.
    4. Quand votre EDD locale... De l'ensemble de données d'Erddap est rechargé, il devrait envoyer une demande à la télécommandeERDDAP™pour vous abonner au jeu de données distant. Regardez dans log.txt pour voir si ça arrive.
    5. Vous devriez recevoir un courriel vous demandant de valider la demande d'abonnement.
    6. Vous devez cliquer sur le lien dans ce courriel pour valider la demande d'abonnement.
    7. La télécommandeERDDAP™devrait dire que la validation a été réussie. A tout moment, vous pouvez demander un email de la télécommandeERDDAP™avec une liste de vos abonnements en cours et valides. Voir le formulaire *distantErddapBase Autres* /erddap/abonnements/list.html .
    8. Lorsque l'ensemble de données distant change (Par exemple, obtenir des données supplémentaires) , la télécommandeERDDAP™devrait essayer de contacter le flagURL sur votreERDDAP. Vous ne pouvez pas vérifier cela, mais vous pouvez demander à l'administrateur de la télécommandeERDDAP™pour vérifier ça.
    9. VotreERDDAP™devrait recevoir une demande pour définir ce flagURL. Recherchez dans votre log.txt pour "setDatasetFlag.txt?" requête (s) et voir s'il y a un message d'erreur associé aux requêtes.
    10. VotreERDDAP™devrait ensuite essayer de recharger cet ensemble de données (Peut-être pas immédiatement, mais au plus vite) .
         
#### Mise à jour max (heure) ?{#up-to-date-maxtime} 
EDDGrid/TableFromErddap datasets ne modifie leurs informations stockées sur chaque dataset source que lorsque le dataset source est["recharger"](#reloadeverynminutes)et quelques modifications de métadonnées (Par exemple, la variable temporelleactual\\_range) , générant ainsi une notification d'abonnement. Si l'ensemble de données source a des données qui changent fréquemment (Par exemple, de nouvelles données chaque seconde) et utilise les["mise à jour"](#updateeverynmillis)système pour remarquer les changements fréquents aux données sous-jacentes,EDDGrid/TableFromErddap ne sera pas informé de ces changements fréquents jusqu'à ce que le prochain jeu de données "recharge", donc leEDDGrid/TableFromErddap ne sera pas parfaitement à jour. Vous pouvez minimiser ce problème en modifiant les données source&lt;recharger chaque NMinutes&gt; à une valeur plus petite (60 ? 15 ?) pour qu'il y ait plus de notifications d'abonnementEDDGrid/TableFromErddap pour mettre à jour ses informations sur l'ensemble de données source.

Ou, si votre système de gestion des données sait quand l'ensemble de données source a de nouvelles données (Par exemple, via un script qui copie un fichier de données en place) , et si ce n'est pas super fréquent (Par exemple, toutes les 5 minutes ou moins) , il y a une meilleure solution:

1. Ne pas utiliser&lt;mettre à jour EveryNMillis&gt; pour tenir l'ensemble de données source à jour.
2. Définir les données de la source&lt;recharger chaque NMinutes&gt; à un nombre plus grand (1440 ?) .
3. Demandez au script de contacter l'ensemble de données source[URL du drapeau](/docs/server-admin/additional-information#set-dataset-flag)juste après avoir copié un nouveau fichier de données en place.
     

Cela permettra à l'ensemble de données source d'être parfaitement à jour et de générer une notification d'abonnement, qui sera envoyée auEDDGrid/TableFromErddap dataset. Cela conduira àEDDGrid/TableFromErddap dataset pour être parfaitement à jour (Eh bien, dans les 5 secondes de l'ajout de nouvelles données) . Et tout ce qui sera fait efficacement (sans recharge de données inutiles) .
     
#### NuméroaddAttributes,axisVariableoudataVariable {#no-addattributes-axisvariable-or-datavariable} 
Contrairement à d'autres types de données, EDDTableFromErddap etEDDGridLes ensembles de données d'Erddap ne permettent pas de&lt;addAttributes&gt;,&lt;axisVariable&gt; ou&lt;dataVariableLes sections de &gt; dans ladatasets.xmlpour cet ensemble de données. Le problème, c'est que le fait de les autoriser entraînerait des incohérences :
    
1. Disons qu'il a été autorisé et vous avez ajouté un nouvel attribut global.
2. Quand un utilisateur vous demandeERDDAP™pour les attributs globaux, le nouvel attribut apparaîtra.
3. Mais quand un utilisateur demandeERDDAP™pour un fichier de données, votreERDDAP™redirige la demande vers la sourceERDDAP. ÇaERDDAP™n'est pas au courant du nouvel attribut. Donc, si elle crée un fichier de données avec des métadonnées, p. ex..ncfichier, les métadonnées n'auront pas le nouvel attribut.

Il y a deux solutions :

1. Convaincre l'administrateur de la sourceERDDAP™pour apporter les modifications que vous voulez aux métadonnées.
2. Au lieu de EDDTableFromErddap, utiliser[EDDTableFromDapSéquence](#eddtablefromdapsequence). Ou au lieu deEDDGridD'Erddap, utiliser[EDDGridDeDap](#eddgridfromdap). Ces types EDD vous permettent de vous connecter efficacement à un jeu de données sur une télécommandeERDDAP™  (mais sans rediriger les requêtes de données) et ils vous permettent d'inclure&lt;addAttributes&gt;,&lt;axisVariable&gt; ou&lt;dataVariableLes sections de &gt; dans ladatasets.xml. Une autre différence: vous devrez vous abonner manuellement à l'ensemble de données distant, de sorte que l'ensemble de données sur votreERDDAP™sera notifié (par[URL du drapeau](/docs/server-admin/additional-information#set-dataset-flag)) quand il y a des changements à l'ensemble de données distant. Ainsi, vous créez un nouvel ensemble de données, au lieu de vous connecter à un ensemble de données distant.
         
#### Autres notes{#other-notes} 
* Pour des raisons de sécurité,EDDGridDeErddap et EDDTable DeErddap ne soutiennent pas le [&lt;accessibleÀ&gt;] (#accessible à) tag et ne peut pas être utilisé avec des ensembles de données distants qui nécessitent une connexion (parce qu'ils utilisent [&lt;accessibleÀ&gt;] (#accessible à) ) .. VoirERDDAP's[système de sécurité](/docs/server-admin/additional-information#security)pour restreindre l'accès à certains ensembles de données à certains utilisateurs.
     
* En commençant parERDDAP™v2.10,EDDGridDeErddap et EDDTableDeErddap soutiennent le [&lt;accèsViaFiles&gt;] (#accessibleviafiles) étiquette. Contrairement à d'autres types de ensembles de données, la valeur par défaut est vraie, mais les fichiers de l'ensemble de données seront accessiblesViaFiles seulement si l'ensemble de données source a également&lt;accessibleViaFiles&gt; défini à true.
     
* Vous pouvez utiliser le[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire ledatasets.xmlmorceaux pour ce type de jeu de données. Mais vous pouvez faire ces types de données facilement à la main.
     
#### EDDGridDu squelette d'Erddap XML{#eddgridfromerddap-skeleton-xml} 
*   EDDGridDu squelette d'Erddap L'ensemble de données XML est très simple, parce que l'intention est simplement d'imiter l'ensemble de données distant qui est déjà adapté à l'utilisation dansERDDAP:
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### EDDTableFromErddap squelette XML{#eddtablefromerddap-skeleton-xml} 
* Le XML squelette pour un ensemble de données EDDTableFromErddap est très simple, car l'intention est juste d'imiter l'ensemble de données distant, qui est déjà adapté pour être utilisé dansERDDAP:
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridDe Etopo{#eddgridfrometopo} 
[ **EDDGridDe Etopo** ](#eddgridfrometopo)sert juste le[ETOPO1 Ensemble de données mondiales sur l'élévation des mailles de 1 minute](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Surface de glace, grille enregistrée, binaire, 2octets int: Etopo1\\_ice\\_g\\_i2.zip) qui est distribué avecERDDAP.

* Seulement deuxdatasetIDs sont supportés pourEDDGridDe Etopo, afin que vous puissiez accéder aux données avec des valeurs de longitude -180 à 180, ou des valeurs de longitude 0 à 360.
* Il n'y a jamais de sous-balises, puisque les données sont déjà décrites dansERDDAP.
* Donc les deux options pourEDDGridLes ensembles de données d'Etopo sont (littéralement) :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

### EDDGridFichiers{#eddgridfromfiles} 
[ **EDDGridFichiers** ](#eddgridfromfiles)est la superclasse de tousEDDGridDes cours sur les fichiers. Vous ne pouvez pas utiliserEDDGridDeFiles directement. Utiliser plutôt une sous-classe deEDDGridFromFiles pour gérer le type de fichier spécifique:

*   [EDDGridDeMergeIRFiles](#eddgridfrommergeirfiles)gère les données de la grille[MergeIR.gz](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)fichiers.
*   [EDDGridDepuisAudioFiles](#eddfromaudiofiles)regroupe les données d'un groupe de fichiers audio locaux.
*   [EDDGridDeNcFiles](#eddgridfromncfiles)gère les données de la grille[GRIB .grb](https://en.wikipedia.org/wiki/GRIB)fichiers,[HDF  (v4 ou v5)  .hdf](https://www.hdfgroup.org/)fichiers,[.ncml](#ncml-files)fichiers, et[NetCDF  (v3 ou v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)fichiers. Cela peut fonctionner avec d'autres types de fichiers (par exemple, BUFR) , nous ne l'avons pas testé -- s'il vous plaît envoyez-nous des exemples de fichiers si vous êtes intéressé.
*   [EDDGridDeNcFilesNon emballé](#eddgridfromncfilesunpacked)est une variante deEDDGridDeNcFiles qui gère les données de la grilleNetCDF  (v3 ou v4)  .ncet les fichiers connexes, quiERDDAP™Déballe à un niveau bas.

Actuellement, aucun autre type de fichier n'est supporté. Mais il est généralement relativement facile d'ajouter une prise en charge pour d'autres types de fichiers. Contactez-nous si vous avez une demande. Ou, si vos données sont dans un ancien format de fichier que vous voudriez déménager, nous vous recommandons de convertir les fichiers pour êtreNetCDFv3.ncfichiers.NetCDFest un format binaire largement pris en charge, permet un accès aléatoire rapide aux données, et est déjà supporté parERDDAP.

#### À partir des détails des fichiers{#from-files-details} 
Les informations suivantes s'appliquent à toutes les sous-classes:EDDGridDeFiles.

##### Agrégation d'une dimension existante{#aggregation-of-an-existing-dimension} 
Toutes les variationsEDDGridFromFiles peut agréger des données à partir de fichiers locaux, où chaque fichier a 1 (ou plus) valeurs différentes pour le plus à gauche (première) dimension, généralement\\[heure\\], qui sera agrégé. Par exemple, les dimensions\\[heure\\]\\[altitude\\]\\[latitude\\]\\[longitude\\], et les fichiers pourraient avoir les données pour un (ou quelques-uns) valeur temporelle (s) par dossier. L'ensemble de données qui en résulte apparaît comme si toutes les données du fichier avaient été combinées. Les grands avantages de l'agrégation sont:

* La taille de l'ensemble de données agrégé peut être beaucoup plus grande qu'un seul fichier peut être commodément (~2 Go) .
* Pour les données en temps quasi réel, il est facile d'ajouter un nouveau fichier avec le dernier morceau de données. Vous n'avez pas à réécrire l'ensemble des données.

Les exigences d'agrégation sont les suivantes:
* Les fichiers locaux n'ont pas besoin de la mêmedataVariables (comme défini dans l'ensemble de donnéesdatasets.xml) . L'ensemble de données auradataVariables définis endatasets.xml. Si un fichier donné n'a pas de fichier donnédataVariable,ERDDAP™ajoutera les valeurs manquantes au besoin.
* Tous lesdataVariableDOIT utiliser la même méthodeaxisVariables/dimensions (comme défini dans l'ensemble de donnéesdatasets.xml) . Les fichiers seront agrégés sur la base du premier (à gauche) dimension, triée dans l'ordre ascendant.
* Chaque fichier PEUT avoir des données pour une ou plusieurs valeurs de la première dimension, mais il ne peut y avoir aucun chevauchement entre les fichiers. Si un fichier a plus d'une valeur pour la première dimension, les valeurs DOIVENT être triées en ordre ascendant, sans liens.
* Tous les fichiers DOIVENT avoir exactement les mêmes valeurs pour toutes les autres dimensions. La précision des essais est déterminée par:[matchAxisNDigits](#matchaxisndigits).
* Tous les fichiers DOIVENT avoir exactement la même[unités](#units)métadonnées pour tousaxisVariables etdataVariablePar. Si c'est un problème, vous pouvez utiliser[NcML](#ncml-files)ou[NCO](#netcdf-operators-nco)pour résoudre le problème.
         
##### Agrégation via les noms de fichiers ou les métadonnées mondiales{#aggregation-via-file-names-or-global-metadata} 
Toutes les variationsEDDGridFromFiles peut également agréger un groupe de fichiers en ajoutant un nouveau fichier à gauche (première) dimension, généralement le temps, basée sur une valeur dérivée de chaque nom de fichier ou de la valeur d'un attribut global qui se trouve dans chaque fichier. Par exemple, le nom du fichier peut inclure la valeur de temps pour les données dans le fichier.ERDDAP™créerait alors une nouvelle dimension temporelle.

Contrairement à la caractéristique similaire de THREDS,ERDDAP™crée toujours unaxisVariableavec valeurs numériques (selon les exigences des FC) , jamais String valeurs (qui ne sont pas autorisés par les FC) . Aussi,ERDDAP™triera les fichiers dans l'agrégation en fonction du numériqueaxisVariablevaleur qui est attribuée à chaque fichier, de sorte que la variable axe aura toujours trié les valeurs comme l'exige CF. L'approche THREDS de faire un tri lexicographique basé sur les noms de fichiers conduit à des agrégations où les valeurs d'axe ne sont pas triées (qui n'est pas autorisé par les FC) lorsque les noms de fichiers trient différemment que les dérivésaxisVariablevaleurs.

Pour mettre en place une de ces agrégations dansERDDAP™, vous définirez une nouvelle gauche (première)  [axisVariable](#axisvariable)avec un pseudo spécial&lt;sourceName&gt;, qui ditERDDAP™où et comment trouver la valeur de la nouvelle dimension de chaque fichier.

* Le format du pseudosourceNamequi obtient la valeur d'un nom de fichier (juste nom de fichier.ext) est
    \\*\\*\\ *Nom du fichier,* [données Type](#data-types) *,* extraitRegex *,* Numéro de groupe de capture*
* Le format du pseudosourceNamequi obtient la valeur du nom de chemin absolu d'un fichier est
    \\*\\*\\ *Nom du chemin,* [données Type](#data-types) *,* extraitRegex *,* Numéro de groupe de capture*
    \\[Pour cela, le nom de chemin utilise toujours'/'comme le caractère de séparateur de répertoire, jamais '\\'.\\]
* Le format du pseudosourceNamequi obtient la valeur d'un attribut global est
    \\*\\*\\ *mondial :* attribut Dénomination *,* [données Type](#data-types) *,* extraitRegex *,* Numéro de groupe de capture*
* Ce pseudosourceNameoption fonctionne différemment des autres: au lieu de créer un nouveau leftmost (première)  axisVariable, ceci remplace la valeur du courantaxisVariableavec une valeur extraite du nom du fichier (juste nom de fichier.ext) . Le format est
    \\*\\*\\ *remplacer DeFileName,* [données Type](#data-types) *,* extraitRegex *,* Numéro de groupe de capture*
     

Voici les descriptions des pièces que vous devez fournir :

*    *attribut Dénomination* -- le nom de l'attribut global qui se trouve dans chaque fichier et qui contient la valeur dimensionnelle.
*    *données Type* -- Ceci spécifie le type de données qui sera utilisé pour stocker les valeurs. Voir la liste standard des[données Types](#data-types)quiERDDAP™prend en charge, sauf que String n'est pas autorisé ici puisque les variables d'axe dansERDDAP™ne peut pas être des variables de chaîne.
    
Il y a un pseudo type de données supplémentaires, timeFormat= *chaîne TimeFormat* , qui ditERDDAP™que la valeur est une chaîne timeStamp[unités adaptées aux temps de cordes](#string-time-units). Dans la plupart des cas, la chaîneTimeFormat dont vous avez besoin sera une variation de l'un de ces formats:
    
    *   yyyy-MM-dd«T'HH:mm:ss.SSZ -- qui est ISO 8601:2004 (E) date format heure. Vous pouvez avoir besoin d'une version abrégée de ceci, par exemple,yyyy-MM-dd'T'HH:mm:ss ouyyyy-MM-dd.
    * ayyyMMddHHmmss.SSS -- qui est la version compacte du format de date ISO 8601. Vous pouvez avoir besoin d'une version abrégée de ceci, p.ex., aayyMMddHHmmss ou aayyMMdd.
    * M/j/aaaa H:mm:ss.SSS -- qui est le format de date slash américain. Vous pouvez avoir besoin d'une version abrégée de ceci, par exemple, M/d/aaaa.
    * yyyyDDDHHmmssSSS -- qui est l'année plus le jour zéro rembourré de l'année (Par exemple, 001 = 1er janvier 365 = 31 décembre d'une année où il n'y a pas de congé; cela s'appelle parfois à tort la date de Julian) . Vous pourriez avoir besoin d'une version abrégée de ceci, par exemple, yyyDDD .
    
Si vous utilisez ce pseudo dataType, ajoutez ceci à la nouvelle variable&lt;addAttributes&gt;:
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Si vous voulez déplacer toutes les valeurs de temps, déplacez la valeur de temps en unités, par exemple,
1970-01-01T12:00:00Z.
*    *extraitRegex* -- C'est la[expression régulière](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutoriel](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) qui comprend un groupe de capture (entre parenthèses) qui décrit comment extraire la valeur du nom de fichier ou de la valeur de l'attribut global. Par exemple, avec un nom de fichier comme S19980011998031.L3b\\_MO\\_CHL.nc, groupe de capture #1, "\\dtutoriel", dans l ' expression régulière S (\\dtutoriel) \\dtutoriel\\.L3b.\\* saisira les 7 premiers chiffres après 'S': 1998001.
*    *Numéro de groupe de capture* -- C'est le numéro du groupe de capture (entre parenthèses) dans l'expression régulière qui contient les informations d'intérêt. C'est habituellement 1, le premier groupe de capture. Parfois, vous devez utiliser des groupes de capture à d'autres fins dans le regex, alors le numéro de groupe de capture important sera 2 (le deuxième groupe de capture) ou 3 (le troisième) , etc.

Un exemple complet d'unaxisVariablequi fait un ensemble de données agrégé avec un nouvel axe de temps qui obtient les valeurs de temps du nom de fichier de chaque fichier est
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
Lorsque vous utilisez les pseudo-données "timeFormat" TypeERDDAP™ajoutera 2 attributs auaxisVariableafin qu'ils semblent provenir de la source:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Donc dans ce cas,ERDDAP™créera un nouvel axe nommé"time"avec deux valeurs (secondes depuis 1970-01-01T00:00:00Z) en extrayant les 7 chiffres après 'S' et avant ".L3m" dans le nom du fichier et en interprétant ceux-ci comme valeurs temporelles formatées en yyyyDDD.

Vous pouvez outrepasser le temps de base par défaut (1970-01-01T00:00:00Z) en ajoutant[addAttribute](#addattributes)qui spécifie un attribut d'unités différentes avec un temps de base différent. Une situation courante est : il y a des groupes de fichiers de données, chacun avec un composite de 1 jour d'un ensemble de données satellite, où vous voulez que la valeur de temps soit midi du jour mentionné dans le nom du fichier (l'heure centrée de chaque jour) et veut la variablelong\\_namepour être "Temps Centré". Un exemple qui fait ceci est:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
Noter heures=12 dans le temps de base, ce qui ajoute 12 heures par rapport au temps de base original de 1970-01-01T00:00:00Z.

Un exemple complet d'unaxisVariablequi fait un ensemble de données agrégé avec un nouvel axe "course" (avec valeurs int) qui obtient les valeurs d'exécution de l'attribut global "runID" dans chaque fichier (avec des valeurs comme "r17\\_global", où 17 est le numéro d'exécution) est
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
Notez l'utilisation du groupe de capture numéro 2 pour capturer les chiffres qui se produisent après 'r' ou 's', et avant "\\_global". Cet exemple montre également comment ajouter des attributs supplémentaires (Par exemple,ioos\\_categoryet unités) à la variable d'axe.
     
#### Fichiers compressés externement{#externally-compressed-files} 
* Les ensembles de données qui sont des sous-ensembles deEDDGridFromFiles et EDDTable FromFiles peut servir des données directement à partir de fichiers de données compressés externes, y compris.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, et les fichiers .Z.
     
*    **Cela fonctionne étonnamment bien&#33;**   
Dans la plupart des cas, le ralentissement lié à la décompression des fichiers de données de petite et moyenne taille est mineur. Si vous avez besoin de conserver l'espace disque, nous encourageons fortement l'utilisation de cette fonctionnalité, en particulier pour les fichiers plus anciens qui sont rarement accessibles.
     
*    **Economisez de l'argent &#33;**   
C'est l'une des rares caractéristiques deERDDAP™qui vous offre une chance d'économiser beaucoup d'argent (Bien qu'au prix d'une légère diminution des performances) . Si le rapport de compression est par exemple 6:1 (parfois il sera beaucoup plus élevé) , alors les fichiers de données de l'ensemble de données n'auront besoin que de 1/6 l'espace disque. Alors peut-être que vous pouvez passer avec 1 RAID (d'une taille donnée) au lieu de 6 (de même taille) . C'est une énorme économie. Espérons que la possibilité de compresser certains fichiers dans une collection (les plus âgés ?) et ne pas comprimer les autres (les plus récents ?) , et pour changer cela à tout moment, minimisons l'inconvénient de compresser certains des fichiers (accès plus lent) . Et si le choix est entre stocker les fichiers sur bande (et uniquement accessible sur demande, après un retard) vs les stocker compressés sur un RAID (et accessibles viaERDDAP) , alors il y a un énorme avantage à utiliser la compression pour que les utilisateurs soient interactifs et (relativement) accès rapide aux données. Et si cela peut vous éviter d'acheter un RAID supplémentaire, cette fonctionnalité peut vous épargner environ 30 000 $.
     
* Pour tousEDDGridFromFiles sous-classes, si les fichiers de données ont une extension indiquant qu'ils sont des fichiers compressés externement (Actuellement:.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2ou Z) ,ERDDAP™décompressera les fichiers vers le répertoire cache de l'ensemble de données lorsqu'il les lira (s'ils ne sont pas déjà dans le cache) . Il en va de même pour le fichier binaire (Par exemple,.nc) Sous-classes de EDDTableFromFiles.
     
* Pour les sous-classes EDDTableFromFiles pour les fichiers non binaires (Par exemple, .csv) , les fichiers de données avec une extension indiquant qu'ils sont des fichiers compressés externement seront décompressés à la volée lorsque le fichier est lu.
     
* EXIGENCE: Si le type de fichier compressé externe utilisé (Par exemple,.tgzou.zip) prend en charge plus d'un fichier dans le fichier compressé, le fichier compressé doit contenir seulement un fichier.
     
* EXIGENCE: Cette fonctionnalité suppose que le contenu des fichiers compressés externes ne change pas, de sorte qu'un fichier décompressé cache peut être réutilisé. Si certains ou la totalité des fichiers de données d'un ensemble de données sont parfois modifiés, ne comprimez pas ces fichiers. Ceci est compatible avec l'utilisation courante, puisque les gens ne compressent pas normalement les fichiers qu'ils ont parfois besoin de changer.
     
*   &lt;fichierNomRegex&gt; Pour que cela fonctionne, l'ensemble de données&lt;fileNameRegex&gt; doit correspondre aux noms des fichiers compressés. Évidemment, les regexes comme .\\*correspondra à tous les noms de fichiers. Si vous spécifiez un type de fichier spécifique, par exemple, .\\*Autres.nc, alors vous devez modifier le regex pour inclure l'extension de compression aussi, par exemple, .\\ *Autres.ncAutres.gz(si tous les fichiers seront* quelque chose*.nc.gzfichiers) .
     
* Il est très bien si votre jeu de données inclut un mélange de fichiers compressés et non compressés. Cela peut être utile si vous croyez que certains fichiers (Par exemple, les anciens fichiers) sera utilisé moins souvent et par conséquent il serait utile d'économiser de l'espace disque en les compresser. Pour que cela fonctionne,&lt;fileNameRegex&gt; doit correspondre aux noms des fichiers compressés et non compressés, p.ex. .\\*ou .\\*Autres.nc (|Autres.gz) (où le groupe de capture à la fin de ce qui précise que.gzest facultatif.
     
* C'est bon si vous compressez ou décompressez des fichiers spécifiques dans la collection à tout moment.
Si l'ensemble de données n'utilise pas [&lt;mise à jour de EveryNMillis&gt;] (#mise à jour de tout le monde) , définir les données[drapeau](/docs/server-admin/additional-information#flag)à direERDDAP™pour recharger l'ensemble de données et ainsi remarquer les modifications. Fait intéressant, vous pouvez utiliser différents algorithmes de compression et paramètres pour différents fichiers dans le même ensemble de données (Par exemple,.bz2pour les fichiers rarement utilisés,.gzpour les fichiers peu utilisés, et aucune compression pour les fichiers fréquemment utilisés) , assurez-vous simplement que le regex prend en charge toutes les extensions de fichiers qui sont en cours d'utilisation, p.ex..nc (|Autres.gz|Autres.bz2) .
     
* Bien sûr, les rapports de compression et les vitesses pour les différents algorithmes de compression varient avec le fichier source et les paramètres (Par exemple, niveau de compression) . Si vous souhaitez optimiser ce système pour vos fichiers, faites un test des différentes méthodes de compression avec vos fichiers et avec une gamme de paramètres de compression. Si vous voulez un bien fiable (Pas nécessairement les meilleurs) configuration, nous recommanderons légèrementgzip  (.gz) .gzipne fait pas le plus petit fichier compressé (C'est assez proche.) , mais il compresse le fichier très rapidement et (plus important pourERDDAP™utilisateurs) décompresse le fichier très rapidement. Plusgziplogiciel est livré standard avec chaque installation Linux et Mac OS et est facilement disponible pour Windows via des outils gratuits comme 7Zip et Linux add-ons comme Git Bash. Par exemple, pour compresser un fichier source dans le.gzversion du fichier (même nom de fichier, mais avec.gzAnnexe) , utiliser (dans Linux, Mac OS et Git Bash)   
    gzip  *sourceName*   
Pour décompresser.gzfichier retour à l'original, utiliser
Accélération *sourceName.gz*   
Pour compresser chacun des fichiers sources dans le répertoire et ses sous-répertoires, récursivement, utiliser
    gzip-r *nom du directeur*   
Pour décompresser chacun des.gzfichiers dans le répertoire et ses sous-répertoires, récursivement, utiliser
-r *nom du directeur*   
     
* ATTENTION: Ne pas compresser extérieurement (gzip) fichiers déjà compressés en interne&#33;
De nombreux fichiers ont déjà compressé les données en interne. Si vousgzipces fichiers, les fichiers résultants ne seront pas beaucoup plus petits (&lt;5%) etERDDAP™va perdre du temps à les décompresser quand il a besoin de les lire. Par exemple:
    
    * fichiers de données: par exemple,.nc4, et.hdf5 dossiers : Certains fichiers utilisent la compression interne, d'autres pas. Comment dire : les variables compressées ont des attributs "\\_ChunkSize". En outre, si un groupe de quadrillés.ncou.hdfLes fichiers sont tous de tailles différentes, ils sont probablement compressés en interne. S'ils sont tous de la même taille, ils ne sont pas compressés en interne.
    * fichiers image: p.ex., .gif, .jpg et .png
    * fichiers audio: p.ex. .mp3 et .ogg.
    * fichiers vidéo: p.ex., .mp4, .ogv, et .webm.
    
        
Un cas étrange malheureux: .wav fichiers audio sont énormes et pas compressés en interne. Ce serait bien de compresser. (gzip) Ils, mais généralement vous ne devriez pas parce que si vous le faites, les utilisateurs ne seront pas en mesure de lire les fichiers compressés dans leur navigateur.
     
* Cas d'essai: compression (avecgzip) un ensemble de données avec 1523 mailles.ncfichiers.
    
    * Les données dans les fichiers sources étaient rares (beaucoup de valeurs manquantes) .
    * L'espace disque total est passé de 57 Go avant compression à 7 Go après.
    * Une demande pour beaucoup de données à partir d'un moment est&lt;1 s avant et après compression.
    * Demande de 1 point de données pour 365 points de temps (la situation la plus défavorable) est passé de 4 s à 71 s.
         
    
Pour moi, c'est un compromis raisonnable pour tout ensemble de données, et certainement pour les ensembles de données qui sont rarement utilisés.
     
* Compression interne ou externe --
Par rapport à la compression de fichier interne offerte par.nc4 et.hdf5 dossiers,ERDDAP'l'approche pour les fichiers binaires compressés externe a des avantages et des inconvénients. L'inconvénient est : pour une lecture d'une petite partie d'un fichier, la compression interne est meilleure parce queEDDGridFromFiles n'a besoin que de décompresser quelques morceaux (s) du fichier, pas du fichier entier. MaisERDDAP'l'approche a quelques avantages:
    
    *   ERDDAP™supporte la compression de tous les types de fichiers de données (binaire et non binaire, p.ex.,.nc3 et .csv) Pas seulement.nc4 et.hdf4.
    * Si la majeure partie d'un fichier doit être lue plus d'une fois dans un court laps de temps, alors il gagne du temps pour décompresser le fichier une fois et le lire plusieurs fois. Cela se produit dansERDDAP™lorsqu'un utilisateur utilise Make-A-Graph pour l'ensemble de données et apporte une série de petites modifications au graphique.
    * La possibilité d'avoir des fichiers compressés et non des fichiers compressés dans la même collection, vous permet de contrôler plus sur quels fichiers sont compressés et qui ne le sont pas. Et ce contrôle ajouté vient sans vraiment modifier le fichier source (puisque vous pouvez compresser un fichier avec par exemple,.gzpuis décompresser pour obtenir le fichier original) .
    * La possibilité de changer à tout moment si un fichier donné est compressé et comment il est compressé (différents algorithmes et paramètres) vous donne plus de contrôle sur les performances du système. Et vous pouvez facilement récupérer le fichier original non compressé à tout moment.
    
Bien qu'aucune des deux approches ne soit gagnante dans toutes les situations, il est clair queERDDAPLa capacité de servir les données de fichiers compressés externes rend la compression externe une alternative raisonnable à la compression interne offerte par.nc4 et.hdf5. Cela est significatif étant donné que la compression interne est l'une des principales raisons pour lesquelles les gens choisissent d'utiliser.nc4 et.hdf5.
     
##### Cache décompressée{#decompressed-cache} 
ERDDAP™fait une version décompressée de tout binaire compressé (Par exemple,.nc) fichier de données quand il doit lire le fichier. Les fichiers décompressés sont conservés dans le répertoire de l'ensemble de données *BigParent Directory* /décompressé/ . Les fichiers décompressés qui n'ont pas été utilisés récemment seront supprimés pour libérer de l'espace lorsque la taille cumulative du fichier est &gt;10 Go. Vous pouvez changer cela en définissant&lt;décompresséCacheMaxGB&gt; (par défaut=10) dans les ensembles de données Xml.xml, par exemple,
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
De plus, les fichiers décompressés qui n'ont pas été utilisés au cours des 15 dernières minutes seront supprimés au début de chaque ensemble de données majeur. Vous pouvez changer cela en définissant&lt;décompresséCacheMaxMinutesOld&gt; (par défaut=15) dans les ensembles de données Xml.xml, par exemple,
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
Les nombres plus grands sont agréables, mais la taille cumulative des fichiers décompressés peut causer *BigParent Directory* à manquer d'espace disque, ce qui provoque de graves problèmes.
     
* Parce que décompresser un fichier peut prendre beaucoup de temps (0,1 à 10 secondes) , les ensembles de données avec fichiers compressés peuvent bénéficier de la configuration de l'ensemble de données [&lt;nThreads&gt;] (#Nthreads) réglage à un nombre plus élevé (Deux ? Trois ? 4 ?) . Les inconvénients à des nombres encore plus élevés (Par exemple, 5 ? 6 ans ? 7 ans ?) sont des retours décroissants et que la demande d'un utilisateur peut alors utiliser un pourcentage élevé des ressources du système, ce qui ralentit considérablement le traitement des demandes d'autres utilisateurs. Ainsi, il n'y a pas de réglage nThreads idéal, juste des conséquences différentes dans différentes situations avec des réglages différents.
         
#### Valeurs de dimension triées{#sorted-dimension-values} 
Les valeurs de chaque dimension DOIVENT être triées dans l'ordre (ascendant ou descendant, à l'exception du premier (à gauche) dimension qui doit être ascendante) . Les valeurs peuvent être irrégulièrement espacées. Il ne peut pas y avoir de liens. C'est une exigence de la[Norme sur les métadonnées des FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Si les valeurs d'une dimension ne sont pas triées, l'ensemble de données ne sera pas chargé etERDDAP™identifiera la première valeur non triée dans le fichier journal, *BigParent Directory* /logs/log.txt .
    
Les valeurs de dimension non triées indiquent presque toujours un problème avec l'ensemble de données source. Cela se produit le plus souvent lorsqu'un fichier mal nommé ou inapproprié est inclus dans l'agrégation, ce qui conduit à une dimension temporelle non triée. Pour résoudre ce problème, voir le message d'erreurERDDAP™log.txt fichier pour trouver la valeur de temps offensif. Ensuite, regardez dans les fichiers sources pour trouver le fichier correspondant (ou une avant ou une après) Ça n'appartient pas à l'agrégation.
    
#### Répertoires{#directories} 
Les fichiers peuvent être dans un répertoire, ou dans un répertoire et ses sous-répertoires (récursivement) . S'il y a un grand nombre de fichiers (par exemple, &gt;1 000) , le système d'exploitation (et ainsiEDDGridFichiers) fonctionnera beaucoup plus efficacement si vous stockez les fichiers dans une série de sous-répertoires (un par an, ou un par mois pour les ensembles de données avec des fichiers très fréquents) , de sorte qu'il n'y a jamais un grand nombre de fichiers dans un répertoire donné.
     
#### &lt;cacheFromUrl&gt;{#cachefromurl} 
TousEDDGridFromFiles et tous les ensembles de données EDDTableFromFiles prennent en charge un ensemble de balises qui indiquentERDDAP™pour télécharger et maintenir une copie de tous les fichiers d'un ensemble de données distant, ou un cache de quelques fichiers (téléchargé au besoin) . Cela peut être incroyablement utile. Voir[cache Documentation d'Url](#cachefromurl).
    
#### Répertoires distants et demandes de portée HTTP{#remote-directories-and-http-range-requests} 
 (Service d'octets AKA, demandes de gamme d'octets, acceptation-rangeshttpen-tête)   
EDDGridDeNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles et EDDTableFromNcCFFiles, peuvent *parfois* servir les données de.ncfichiers sur les serveurs distants et accessibles via HTTP si le serveur prend en charge[Services d'octets](https://en.wikipedia.org/wiki/Byte_serving)via les requêtes de plage HTTP (le mécanisme HTTP pour le service par octet) . C'est possible parce que netcdf-java (quiERDDAP™utilise pour lire.ncfichiers) prend en charge la lecture des données à distance.ncfichiers via des requêtes de plage HTTP.

 **Ne fais pas ça &#33;** C'est horriblement inefficace et lent.
Utilisez plutôt le [&lt;cacheFromUrl&gt; système] (#cachefromurl) .

AccèsERDDAP™les ensembles de données comme fichiers via les requêtes de plage d'octets --
Enfiler ça, vu que tu peux (en théorie) pensez à un ensemble de données dansERDDAP™comme un géant.ncfichier en ajoutant ".nc" à la base OPenDAPURL pour un ensemble de données donné (Par exemple, https://myserver.org/erddap/griddap/datasetID.nc et aussi en ajoutant une ?requête après cela pour spécifier un sous-ensemble) , il est peut-être raisonnable de demander si vous pouvez utiliser netcdf-java,Ferret, ou un autreNetCDFlogiciel client pour lire les données via Demandes de portée HTTP depuisERDDAP. La réponse est non, parce qu'il n'y a pas vraiment un énorme ".nc" dossier. Si vous voulez faire cela, faites plutôt une de ces options:

* Utilisation(OPeN)DAPlogiciel client pour se connecter aux services griddap offerts parERDDAP. C'est ça.DAP  (et ainsiERDDAP) a été conçu pour. C'est très efficace.
* Ou, télécharger le fichier source (s) des"files"système (ou un fichier sous-ensemble via un.nc? requête) à votre ordinateur et utiliser netcdf-java,Ferret, ou un autreNetCDFlogiciel client pour lire le (Maintenant) fichier local (s) .
         
#### Information sur le fichier caché{#cached-file-information} 
LorsqueEDDGridFromFiles dataset est d'abord chargé,EDDGridFromFiles lit les informations de tous les fichiers pertinents et crée des tableaux (une ligne pour chaque fichier) avec des informations sur chaque fichier valide et chaque "mauvais" (différent ou invalide) fichier.
* Les tables sont également stockées sur le disque, commeNetCDFv3.ncfichiers dans *BigParent Directory* /ensemble de données/ *last2CharsOfDatasetID* / *datasetID* / dans les fichiers nommés :
Tableau.nc  (qui contient une liste de noms de répertoires uniques) ,
fichier Tableau.nc  (qui tient le tableau avec les informations de chaque fichier valide) ,
badFiles.nc  (qui tient la table avec les informations de chaque mauvais fichier) .
* Pour accélérer l'accès à uneEDDGridEnsemble de données FromFiles (mais au détriment d'utiliser plus de mémoire) , vous pouvez utiliser
>   [<fileTableInMemory>true</fileTableInMemory>](#filetableinmemory)  
à direERDDAP™conserver une copie des tableaux d'information du fichier en mémoire.
* La copie des tables d'information du fichier sur le disque est également utile lorsqueERDDAP™est arrêté et redémarré: il enregistreEDDGridFromFiles de devoir relire tous les fichiers de données.
* Lorsqu'un ensemble de données est rechargé,ERDDAP™Il suffit de lire les données dans de nouveaux fichiers et fichiers qui ont changé.
* Si un fichier a une structure différente des autres fichiers (Par exemple, un type de données différent pour une des variables, ou une valeur différente pour la variable "[unités](#units)" attribut) ,ERDDAPajoute le fichier à la liste des « mauvais » fichiers. Les informations sur le problème avec le fichier seront écrites au *BigParent Directory* fichier /logs/log.txt.
* Vous ne devriez jamais avoir besoin de supprimer ou de travailler avec ces fichiers. Une exception est : si vous apportez toujours des modifications à un ensemble de donnéesdatasets.xmlconfiguration, vous pouvez vouloir supprimer ces fichiers pour forcerERDDAP™pour relire tous les fichiers puisque les fichiers seront lus/interprétés différemment. Si jamais vous devez supprimer ces fichiers, vous pouvez le faire lorsqueERDDAP™est en train de courir. (Alors définissez un[drapeau](/docs/server-admin/additional-information#set-dataset-flag)pour recharger l'ensemble de données dès que possible.) Toutefois,ERDDAP™En général, on remarque quedatasets.xmlles informations ne correspondent pas au fichier Table d'informations et supprime automatiquement les tables de fichiers.
* Si vous voulez encouragerERDDAP™pour mettre à jour les données stockées (par exemple, si vous venez d'ajouter, de supprimer ou de modifier certains fichiers dans le répertoire de données de l'ensemble de données) , utilisez le[Système de drapeau](/docs/server-admin/additional-information#flag)ForcerERDDAP™mettre à jour les informations du fichier mis en cache.
         
#### Traitement des demandes{#handling-requests} 
Lorsque la demande de données d'un client est traitée,EDDGridFromFiles peut rapidement regarder dans la table avec les informations de fichier valides pour voir quels fichiers ont les données demandées.
     
#### Mise à jour de l'information sur le fichier Cached{#updating-the-cached-file-information} 
Chaque fois que l'ensemble de données est rechargé, les informations du fichier mis en cache sont mises à jour.
    
* L'ensemble de données est rechargé périodiquement comme déterminé par la&lt;recharger chaque NMinutes&gt; dans les informations de l'ensemble de donnéesdatasets.xml.
* L'ensemble de données est rechargé dès que possibleERDDAP™détecte que vous avez ajouté, supprimé,[toucher](https://en.wikipedia.org/wiki/Touch_(Unix)) (pour changer le dernier fichier Heure modifiée) , ou a changé un fichier de données.
* L'ensemble de données est rechargé dès que possible si vous utilisez le[Système de drapeau](/docs/server-admin/additional-information#flag).

Lorsque l'ensemble de données est rechargé,ERDDAP™compare les fichiers actuellement disponibles aux tableaux d'information des fichiers en cache. Les nouveaux fichiers sont lus et ajoutés à la table des fichiers valides. Les fichiers qui n'existent plus sont supprimés de la table des fichiers valides. Les fichiers où l'horodatage a changé sont lus et leurs informations sont mises à jour. Les nouvelles tables remplacent les anciennes tables en mémoire et sur disque.
     
#### Mauvais fichiers{#bad-files} 
La table des mauvais fichiers et les raisons pour lesquelles les fichiers ont été déclarés mauvais (fichier corrompu, variables manquantes, etc.) est envoyé par courriel à l'email Tout Adresse électronique (probablement toi) chaque fois que l'ensemble de données est rechargé. Vous devez remplacer ou réparer ces fichiers dès que possible.
     
#### Variables manquantes{#missing-variables} 
Si certains fichiers n'ont pas certains desdataVariables définis dans l'ensemble de donnéesdatasets.xmlC'est bon. QuandEDDGridFromFiles lit un de ces fichiers, il agira comme si le fichier avait la variable, mais avec toutes les valeurs manquantes.
     
#### FTP Trouble/Conseil{#ftp-troubleadvice} 
Si vous FTP nouveaux fichiers de donnéesERDDAP™serveur pendantERDDAP™est en cours, il y a la chance queERDDAP™va recharger l'ensemble de données pendant le processus FTP. Cela arrive plus souvent que vous ne le pensez &#33; Si cela se produit, le fichier semble être valide (il a un nom valide) , mais le fichier n'est pas encore valide. SiERDDAP™tente de lire les données de ce fichier invalide, l'erreur résultante fera que le fichier sera ajouté à la table des fichiers invalides. Ce n'est pas bon. Pour éviter ce problème, utilisez un nom de fichier temporaire lorsque FTP utilise le fichier, par exemple, ABC2005.nc\\_TEMP . Ensuite, le test fileNameRegex (voir ci-dessous) indiquera qu'il ne s'agit pas d'un dossier pertinent. Une fois le processus FTP terminé, renommer le fichier au bon nom. Le processus de renommage fera en sorte que le fichier devient pertinent en un instant.
     
#### "0 fichiers" Message d'erreur{#0-files-error-message-1} 
Si tu cours[Générer des ensembles de donnéesXml](#generatedatasetsxml)ou[DasDds](#dasdds), ou si vous essayez de charger unEDDGridDe...Files dataset dansERDDAP™, et vous obtenez un message d'erreur "0 fichiers" indiquant queERDDAP™trouvé 0 fichiers correspondants dans le répertoire (lorsque vous pensez qu'il y a des fichiers correspondants dans ce répertoire) :
    * Vérifiez que les fichiers sont vraiment dans ce répertoire.
    * Vérifiez l'orthographe du nom du répertoire.
    * Vérifiez le fichierNameRegex. C'est vraiment, vraiment facile de faire des erreurs avec les régexes. Pour le test, essayez le regex .\\* qui doit correspondre à tous les noms de fichiers. (Voir ceci[documentation régex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)et[tutoriel regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Vérifiez que l'utilisateur qui exécute le programme (Par exemple, user=tomcat (?) pour Tomcat/ERDDAP) a la permission de lire ces fichiers.
    * Dans certains systèmes d'exploitation (par exemple, SELinux) et selon les paramètres du système, l'utilisateur qui a exécuté le programme doit avoir la permission de lire pour toute la chaîne de répertoires menant au répertoire qui possède les fichiers.
         
#### EDDGridsquelette FromFiles XML{#eddgridfromfiles-skeleton-xml} 
*    **Le squelette XML** pour tousEDDGridLes sous-classes FromFiles sont:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD*FromAudioFiles{#eddfromaudiofiles} 
 **EDDGridDepuisAudioFiles** et **EDDTableFromAudioFiles** les données agrégées provenant d'une collection de fichiers audio locaux. (Ces premiersERDDAP™v1.82.) La différence est queEDDGridFromAudioFiles traite les données comme un ensemble de données multidimensionnel (généralement avec 2 dimensions:\\[démarrage du fichier Heure\\]et\\[épuisé Temps dans un fichier\\]) , tandis que EDDTableFromAudioFiles traite les données comme des données tabulaires (habituellement avec des colonnes pour le fichier startTime, le temps écoulé avec le fichier, et les données des canaux audio) .EDDGridFromAudioFiles exige que tous les fichiers aient le même nombre d'échantillons, donc si ce n'est pas vrai, vous devez utiliser EDDTableFromAudioFiles. Sinon, le choix du type EDD à utiliser est entièrement votre choix. Un avantage de EDDTableFromAudioFiles: vous pouvez ajouter d'autres variables avec d'autres informations, par exemple,stationID, station Type. Dans les deux cas, l'absence d'une variable temporelle unifiée rend plus difficile de travailler avec les données de ces types d'EDD, mais il n'y avait pas de bon moyen de configurer une variable temporelle unifiée.

Voyez les superclasses de ces classes,[EDDGridFichiers](#eddgridfromfiles)et[EDDTableFromFiles](#eddtablefromfiles), pour des informations générales sur la façon dont cette classe fonctionne et comment l'utiliser.

Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Puisque les fichiers audio n'ont pas d'autres métadonnées que les informations relatives à l'encodage des données sonores, vous devrez modifier la sortie à partir de GenerateDatasets Xml pour fournir des informations essentielles (Par exemple, titre, résumé,creator\\_name, institution, histoire) .

Détails:

* Il existe un grand nombre de formats de fichiers audio. Actuellement,ERDDAP™peut lire les données de la plupart des fichiers .wav et .au. Il ne peut actuellement pas lire d'autres types de fichiers audio, p.ex. .aiff ou .mp3. Si vous avez besoin de support pour d'autres formats de fichiers audio ou d'autres variantes de .wav et .au, veuillez envoyer votre demande par courriel à Chris. John à noaa.gov . Ou, comme solution de rechange, vous pouvez convertir vos fichiers audio en PCM\\_ SIGNÉ (pour les données entières) ou PCM\\_FLOAT (pour les données flottantes) .wav fichiers de sorte queERDDAP™peut travailler avec eux.
* Actuellement,ERDDAP™peut lire des fichiers audio avec ceJavaLa classe AudioFormat appelle les encodages PCM\\_FLOAT, PCM\\_SIGNED, PCM\\_UNSIGNED, ALAW et ULAW.ERDDAP™convertit les valeurs PCM\\_UNSIGNED (Par exemple, 0 à 255) en valeurs signées (Par exemple, -128 à 128) en réorganisant les bits dans les valeurs de données.ERDDAP™convertit ALAW et ULAW encodés à partir de leur format d'octet natif encodé en court (Int16) valeurs. DepuisJavaveut bigEndian=true data,ERDDAP™réarrange les octets de données stockées avec bigEndian=false (petit endian) pour lire correctement les valeurs. Pour tous les autres codages (PCM) ,ERDDAP™lit les données telles quelles.
* QuandERDDAP™lit les données des fichiers audio, il convertit les métadonnées audio disponibles du fichier en attributs globaux. Cela comprendra toujours (avec les valeurs de l'échantillon indiquées) 
    
Chaîne audioBigEndian "faux"; //vrai ou faux
Int audio les canaux 1;
Chaîne audioEncodage "PCM\\_SIGNED";
float audioFrameRate 96000.0; //par seconde
int audioFrameSize 2; //# d'octets de données par image
float audioSampleRate 96000.0; //par seconde
Int audioSampleSizeInBits 16; //# de bits par canal par échantillon
    
PourERDDAP's fins, un cadre est synonyme d'un échantillon, qui est les données pour un point dans le temps.
Les attributs dansERDDAP™disposera des informations décrivant les données telles qu'elles étaient dans les fichiers sources.ERDDAP™aura souvent changé cela en lisant les données, par exemple, PCM\\_UNSIGNED, ALAW, et ULAW données encodées sont converties en PCM\\_SIGNED, et bigEndian=false données est converti en bigEndian=true data (qui est commentJavaveut le lire) . En fin de compte, les valeurs deERDDAP™sera toujours le[Encodé par PCM](https://en.wikipedia.org/wiki/Pulse-code_modulation)valeurs de données (C'est-à-dire de simples échantillons numérisés de l'onde sonore) .
* QuandERDDAP™lit les données à partir de fichiers audio, il lit le fichier entier.ERDDAP™peut lire jusqu'à environ 2 milliards d'échantillons par canal. Par exemple, si le taux d'échantillonnage est de 44 100 échantillons par seconde, 2 milliards d'échantillons se traduisent par environ 756 minutes de données sonores par fichier. Si vous avez des fichiers audio avec plus de cette quantité de données, vous devez séparer les fichiers en petits morceaux de sorte queERDDAP™peut les lire.
* Parce queERDDAP™lit des fichiers audio entiers,ERDDAP™doit avoir accès à une grande quantité de mémoire pour fonctionner avec de grands fichiers audio. Voir[ERDDAPParamètres de la mémoire](/docs/server-admin/deploy-install#memory). Encore une fois, si c'est un problème, une solution de rechange que vous pouvez utiliser maintenant est de séparer les fichiers en petits morceaux de sorte queERDDAP™peut les lire avec moins de mémoire.
* Certains fichiers audio ont été mal écrits.ERDDAP™fait un petit effort pour traiter ces cas. Mais en général, quand il y a une erreur,ERDDAP™lancera une exception (et de rejeter ce dossier) ou (si l'erreur est indétectable) lire les données (mais les données seront incorrectes) .
*   ERDDAP™ne vérifie pas ou ne modifie pas le volume du son. Idéalement, des données audio entières sont mises à l'échelle pour utiliser toute la gamme du type de données.
* Les fichiers audio et les lecteurs audio n'ont aucun système pour les valeurs manquantes (Par exemple, -999 ou Float.NaN) . Donc les données audio ne devraient pas avoir de valeurs manquantes. S'il manque des valeurs (Par exemple, si vous avez besoin d'allonger un fichier audio) , utilisez une série de 0's qui sera interprétée comme un silence parfait.
* QuandERDDAP™lit les données à partir de fichiers audio, il crée toujours une colonne appelée «dépassement» Temps avec le temps pour chaque échantillon, en secondes (stocké en double) , par rapport au premier échantillon (qui est attribuée Temps=0,0 s) . AvecEDDGridÀ partir d'AudioFiles, cela devient la variable de l'axe du temps.
*   EDDGridFromAudioFiles exige que tous les fichiers aient le même nombre d'échantillons. Donc si ce n'est pas vrai, vous devez utiliser EDDTableFromAudioFiles.
* PourEDDGridDeAudioFiles, nous vous recommandons de définir [&lt;dimensionsValuesInMemory&gt;] (#valeurs de dimension) à faux (comme recommandé par GenerateDatasets Xml) , parce que la dimension temporelle a souvent un grand nombre de valeurs.
* PourEDDGridD'AudioFiles, vous devriez presque toujours utiliser leEDDGridSystème FromFiles pour[Agrégation par Noms des fichiers](#aggregation-via-file-names-or-global-metadata), presque toujours en extrayant la date de début de l'enregistrement Heure des noms de fichiers. Par exemple,
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Générer des ensembles de données Xml va l'encourager et vous aider avec cela.
* Pour EDDTableFromAudioFiles, vous devez presque toujours utiliser le système EDDTableFromFiles pour[\\*\\*\\*fichierNom pseudosourceNames](#filename-sourcenames)pour extraire des informations du nom du fichier (Presque toujours la date de début Heure de l'enregistrement) et de la promouvoir comme une colonne de données. Par exemple,
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Le format de temps devrait alors être spécifié comme l'attribut unit:&lt;Nom de l'entité&lt;/att&gt;
     
### EDDGridDeMergeIRFiles{#eddgridfrommergeirfiles} 
[ **EDDGridDeMergeIRFiles** ](#eddgridfrommergeirfiles)les données des agrégats locaux,[MergeIR](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)fichiers, qui sont de la[Mission de mesure des précipitations tropicales (TRMM) ](https://trmm.gsfc.nasa.gov), qui est une mission conjointe entre la NASA et l'Agence japonaise d'exploration aérospatiale (JAXA) . Fusionner Les fichiers IR peuvent être téléchargés depuis[NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/).

EDDGridDeMergeIRFiles.java a été écrit et contribué auERDDAP™projet de Jonathan Lafite et Philippe Makowski de R.Tech Engineering (licence: copyrighted open source) .

EDDGridDeMergeIRFiles est un peu inhabituel:

*   EDDGridDeMergeIRFiles prend en charge les fichiers de données source compressés ou non compressés, dans toute combinaison, dans le même ensemble de données. Cela vous permet, par exemple, de compresser des fichiers plus anciens qui sont rarement accessibles, mais décompresser de nouveaux fichiers qui sont souvent accessibles. Ou, vous pouvez changer le type de compression de l'original . Z à par exemple,.gz.
* Si vous avez des versions compressées et non compressées des mêmes fichiers de données dans le même répertoire, veuillez vous assurer que&lt;fileNameRegex&gt; pour votre jeu de données correspond aux noms de fichiers que vous voulez qu'il corresponde et ne correspond pas aux noms de fichiers que vous ne voulez pas qu'il corresponde.
* Les fichiers de données source non compressés ne doivent pas avoir d'extension de fichier (i.e., non "." dans le nom du fichier) .
* Les fichiers de données source compressés doivent avoir une extension de fichier, maisERDDAP™détermine le type de compression en inspectant le contenu du fichier, pas en regardant l'extension du fichier (par exemple, ".Z") . Les types de compression pris en charge comprennent "gz", "bzip2", "xz", "lzma", "snappy-raw", "snappy-framed", "pack200" et "z". QuandERDDAP™lit les fichiers compressés, il décompresse à la volée, sans écrire à un fichier temporaire.
* Tous les fichiers de données source doivent utiliser le système de nommage de fichier original : i.e., merg\\_ *AAAAMMJDH* \\_4km-pixel (où *AAAAMMJDH* indique le temps associé aux données dans le fichier) , plus une extension de fichier si le fichier est compressé.

Voir la superclasse de cette classe,[EDDGridFichiers](#eddgridfromfiles), pour des informations générales sur la façon dont cette classe fonctionne et comment l'utiliser.

Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez ensuite modifier cela pour l'ajuster.
 
### EDDGridDeNcFiles{#eddgridfromncfiles} 
[ **EDDGridDeNcFiles** ](#eddgridfromncfiles)les données des agrégats locaux,[GRIB .grb et .grb2](https://en.wikipedia.org/wiki/GRIB)fichiers,[HDF  (v4 ou v5)  .hdf](https://www.hdfgroup.org/)fichiers,[.ncml](#ncml-files)fichiers,[NetCDF  (v3 ou v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)fichiers, et[Zarr](https://github.com/zarr-developers/zarr-python)fichiers (à partir de la version 2.25) . Les fichiers Zarr ont un comportement légèrement différent et nécessitent soit le fichierNameRegex ou le cheminRegex pour inclure "zarr".

Cela peut fonctionner avec d'autres types de fichiers (par exemple, BUFR) Nous ne l'avons pas testé -- envoyez-nous des exemples de fichiers.

* Pour les fichiers GRIB,ERDDAP™fera un fichier d'index .gbx la première fois qu'il lit chaque fichier GRIB. Ainsi, les fichiers GRIB doivent être dans un répertoire où l'utilisateur qui a lancé Tomcat a la permission de lire + écrire.
* Voir la superclasse de cette classe,[EDDGridFichiers](#eddgridfromfiles), pour des informations sur le fonctionnement de cette classe et comment l'utiliser.
* En commençant parERDDAP™v2.12,EDDGridDeNcFiles etEDDGridDeNcFiles Unpacked peut lire les données de "structures" dans.nc4 et.hdf4 dossiers. Pour identifier une variable qui provient d'une structure,&lt;sourceName&gt; doit utiliser le format: *Nom complet de la structure* | *Nom du membre* , par exemple groupe1/myStruct|MonMembre.
* Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez ensuite modifier cela pour l'ajuster.
    
#### Groupes dans les fichiers Nc broyés{#groups-in-gridded-nc-files} 
    [Les fichiers Netcdf4 peuvent contenir des groupes.](#groups-in-gridded-nc-files) ERDDAP™fait juste un ensemble de données à partir des variables d'un groupe et de tous ses groupes parent. Vous pouvez spécifier un nom de groupe spécifique dans GenerateDatasets Xml (omettre la barre oblique) , ou utiliser "" pour avoir GenerateDatasets Xml rechercher tous les groupes pour les variables qui utilisent le plus de dimensions, ou utiliser "\\[racine\\]" pour avoir GenerateDatasets il suffit de chercher des variables dans le groupe racine.
    
La première chose que GenerateDatasetsXml fait pour ce type de données après avoir répondu aux questions est d'imprimer la structure ncdump-like du fichier échantillon. Donc, si vous entrez quelques réponses fâcheuses pour la première boucle à travers GenerateDatasets Xml, au moins tu pourras voir siERDDAP™peut lire le fichier et voir quelles dimensions et variables sont dans le fichier. Ensuite, vous pouvez donner de meilleures réponses pour la deuxième boucle à travers GenerateDatasetsXml.
    

### EDDGridDeNcFilesNon emballé{#eddgridfromncfilesunpacked} 
[ **EDDGridDeNcFilesNon emballé** ](#eddgridfromncfilesunpacked)est une variante de[EDDGridDeNcFiles](#eddgridfromncfiles)qui regroupe les données locales, mailléesNetCDF  (v3 ou v4)  .ncet les dossiers connexes. La différence est que cette classe décompacte chaque fichier de données avantEDDGridFromFiles regarde les fichiers :

* Il déballe les variables qui sont emballées avec[scale\\_factoret/ouadd\\_offset](#scale_factor).
* Il convertit \\_FillValue etmissing\\_valuevaleurs à être de NaN (ou MAX\\_VALUE pour les types de données entiers) .
* Il convertit les valeurs temps et timestamp en"seconds since 1970-01-01T00:00:00Z".

Le grand avantage de cette classe est qu'elle offre un moyen de traiter les différentes valeurs descale\\_factor,add\\_offset, \\_FillValue,missing\\_value, ou des unités de temps dans différents fichiers sources dans une collection. Sinon, vous devrez utiliser un outil comme[NcML](#ncml-files)ou[NCO](#netcdf-operators-nco)modifier chaque fichier pour supprimer les différences afin que les fichiers puissent être traités parEDDGridDe NcFiles. Pour que cette classe fonctionne correctement, les fichiers doivent respecter les normes des FC pour les attributs connexes.

* Si vous essayez de faire uneEDDGridDeNcFiles Déballé à partir d'un groupe de fichiers avec lesquels vous avez précédemment essayé et n'avez pas utiliséEDDGridDeNcFiles, cd à
     *BigParent Directory* /ensemble de données/ *dernier2Lettres* / *datasetID* /
où *dernier2Lettres* est les 2 dernières lettres dudatasetID,
et supprimer tous les fichiers de ce répertoire.
* En commençant parERDDAP™v2.12,EDDGridDeNcFiles etEDDGridDeNcFiles Unpacked peut lire les données de "structures" dans.nc4 et.hdf4 dossiers. Pour identifier une variable qui provient d'une structure,&lt;sourceName&gt; doit utiliser le format: *Nom complet de la structure* | *Nom du membre* , par exemple groupe1/myStruct|MonMembre.
* Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez ensuite modifier cela pour l'ajuster.
    
Les fichiers Netcdf4 peuvent contenir des groupes. Voir[cette documentation](#groups-in-gridded-nc-files).
    
La première chose que GenerateDatasetsXml fait pour ce type de dataset après que vous ayez répondu aux questions est d'imprimer la structure ncdump-like du fichier échantillon **avant** Il est déballé. Donc, si vous entrez quelques réponses fâcheuses pour la première boucle à travers GenerateDatasets Xml, au moins tu pourras voir siERDDAP™peut lire le fichier et voir quelles dimensions et variables sont dans le fichier. Ensuite, vous pouvez donner de meilleures réponses pour la deuxième boucle à travers GenerateDatasetsXml.
    
### EDDGridLonPM180{#eddgridlonpm180} 
[ **EDDGridLonPM180** ](#eddgridlonpm180)modifie les valeurs de longitude d'un enfant (clos)  EDDGriddataset ayant des valeurs de longitude supérieures à 180 (par exemple, 0 à 360) pour qu'ils soient dans la gamme -180 à 180 (Longitude Plus ou moins 180, d'où le nom) .

* Cela permet de rendre les ensembles de données ayant des valeurs de longitude supérieures à 180 conformesOGCservices (par exemple laWMSserveur dansERDDAP) , depuis toutOGCles services exigent des valeurs de longitude comprises entre -180 et 180.
* Travailler près d'une discontinuité pose des problèmes, que la discontinuité soit à 0 ou 180 longitude. Ce type de dataset vous permet d'éviter ces problèmes pour tout le monde, en offrant deux versions du même dataset:
une avec des valeurs de longitude comprises entre 0 et 360 ("Pacificententric" ?) ,
une avec des valeurs de longitude dans la gamme -180 à 180 ("Atlanticentric" ?) .
* Pour les ensembles de données pour enfants ayant toutes les valeurs de longitude supérieures à 180, toutes les nouvelles valeurs de longitude sont tout simplement inférieures de 360 degrés. Par exemple, un ensemble de données avec des valeurs de longitude de 180 à 240 deviendrait un ensemble de données avec des valeurs de longitude de -180 à -120.
* Pour les ensembles de données pour enfants ayant des valeurs de longitude pour l'ensemble du globe (environ 0 à 360) , la nouvelle valeur de longitude sera réaménagée (à peu près) -180 à 180 :
Les valeurs initiales de 0 à près de 180 sont inchangées.
Les valeurs originales de 180 à 360 sont converties en -180 à 0 et déplacées au début du tableau de longitude.
* Pour les jeux de données enfant qui couvrent 180 mais ne couvrent pas le globe,ERDDAP™insère les valeurs manquantes au besoin pour créer un ensemble de données couvrant le globe. Par exemple, un ensemble de données pour enfants avec des valeurs de longitude de 140 à 200 deviendrait un ensemble de données avec des valeurs de longitude de -180 à 180.
Les valeurs enfantines de 180 à 200 deviendraient -180 à -160.
De nouvelles valeurs de longitude seraient insérées de -160 à 140. Les valeurs de données correspondantes seront \\_FillValues.
Les valeurs enfantines de 140 à près de 180 seraient inchangées.
L'insertion de valeurs manquantes peut sembler étrange, mais il évite plusieurs problèmes qui résultent d'avoir des valeurs de longitude qui sautent soudainement (Par exemple, de -160 à 140) .
* En[Générer des ensembles de donnéesXml](#generatedatasetsxml), il y a un "type de données",EDDGridLonPM180FromErddapCatalog, qui vous permet de générer ledatasets.xmlpourEDDGridLonPM180 ensembles de données de chacun desEDDGridensembles de donnéesERDDAPqui ont des valeurs de longitude supérieures à 180. Cela facilite l'offre de deux versions de ces ensembles de données :
l'original, avec des valeurs de longitude comprises entre 0 et 360,
et le nouvel ensemble de données, avec des valeurs de longitude comprises entre -180 et 180.
    
L'ensemble de données sur l'enfant dans chaqueEDDGridLonPM180 sera un ensemble de donnéesEDDGridDe l'ensemble de données d'Erddap qui indique l'ensemble de données d'origine.
Le nouvel ensemble de donnéesdatasetIDsera le nom de l'ensemble de données original plus "\\_LonPM180".
Par exemple,
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Mettez lesEDDGridEnsemble de données LonPM180 **ci-dessous** l'ensemble de données originaldatasets.xml. Cela évite certains problèmes possibles.
    
Sinon, vous pouvez remplacer leEDDGridD'Erddap jeu de données enfant avec les données originalesdatasets.xml. Ensuite, il n'y aura qu'une seule version de l'ensemble de données : celle avec des valeurs de longitude comprises entre -180 et 180. Nous décourageons cela parce qu'il y a des moments où chaque version de l'ensemble de données est plus pratique.
    
* Si vous offrez deux versions d'un ensemble de données, par exemple une avec longitude 0 à 360 et une avec longitude -180 à 180:
    * Vous pouvez utiliser la option [&lt;accessible VoieWMS&gt;faux&lt;/accessible VoieWMS&gt;] (#accèsviawms) avec l'ensemble de données 0-360 pour désactiverWMSservice pour cet ensemble de données. Ensuite, seule la version LonPM180 de l'ensemble de données sera accessible viaWMS.
    * Il y a quelques façons de tenir l'ensemble de données LonPM180 à jour en modifiant l'ensemble de données sous-jacent :
        * Si l'ensemble de données enfant est unEDDGridEnsemble de données d'Erddap qui fait référence à un ensemble de données dans le mêmeERDDAP™, l'ensemble de données LonPM180 essaiera de s'abonner directement à l'ensemble de données sous-jacent afin qu'il soit toujours à jour. Les abonnements directs ne génèrent pas de courriels vous demandant de valider l'abonnement - la validation doit être faite automatiquement.
        * Si l'ensemble de données pour enfants n'est pas unEDDGridDe l'ensemble de données d'Erddap qui est sur le mêmeERDDAP™, l'ensemble de données LonPM180 tentera d'utiliser le système d'abonnement régulier pour s'abonner à l'ensemble de données sous-jacent. Si vous avez le système d'abonnementERDDAP™activé, vous devriez obtenir des emails vous demandant de valider l'abonnement. Je vous en prie.
        * Si vous avez le système d'abonnementERDDAP™désactivé, l'ensemble de données LonPM180 peut parfois avoir des métadonnées obsolètes jusqu'à ce que l'ensemble de données LonPM180 soit rechargé. Donc, si le système d'abonnement est désactivé, vous devriez définir le [&lt;recharger Chaque NMinutes&gt;] (#recharger toutes les minutes) le réglage de l'ensemble de données LonPM180 à un nombre plus petit, de sorte qu'il est plus probable de prendre des changements à l'ensemble de données enfant plus tôt.

#### EDDGridsquelette LonPM180 XML{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridLon0360{#eddgridlon0360} 
[ **EDDGridLon0360** ](#eddgridlon0360)modifie les valeurs de longitude d'un enfant (clos)  EDDGridensemble de données dont les valeurs de longitude sont inférieures à 0 (par exemple, -180 à 180) pour qu'ils soient dans la gamme 0 à 360 (d'où le nom) .

* Travailler près d'une discontinuité pose des problèmes, que la discontinuité soit à 0 ou 180 longitude. Ce type de dataset vous permet d'éviter ces problèmes pour tout le monde, en offrant deux versions du même dataset:
une avec des valeurs de longitude dans la gamme -180 à 180 ("Atlanticentric" ?) .
une avec des valeurs de longitude comprises entre 0 et 360 ("Pacificententric" ?) ,
* Pour les ensembles de données pour enfants avec toutes les valeurs de longitude inférieures à 0, toutes les nouvelles valeurs de longitude sont simplement de 360 degrés plus élevées. Par exemple, un ensemble de données avec des valeurs de longitude de -180 à -120 deviendrait un ensemble de données avec des valeurs de longitude de 180 à 240.
* Pour les ensembles de données pour enfants ayant des valeurs de longitude pour l'ensemble du globe (environ -180 à 180) , la nouvelle valeur de longitude sera réaménagée (à peu près) 0 à 360:
Les valeurs originales -180 à 0 sont converties en 180 à 360 et déplacées à la fin du tableau de longitude.
Les valeurs initiales de 0 à près de 180 sont inchangées.
* Pour les ensembles de données enfant qui s'étendent sur lon=0 mais ne couvrent pas le globe,ERDDAP™insère les valeurs manquantes au besoin pour créer un ensemble de données couvrant le globe. Par exemple, un ensemble de données pour enfants avec des valeurs de longitude de -40 à 20 deviendrait un ensemble de données avec des valeurs de longitude de 0 à 360.
Les valeurs de 0 à 20 enfants seraient inchangées.
De nouvelles valeurs de longitude seraient insérées de 20 à 320. Les valeurs de données correspondantes seront \\_FillValues.
Les valeurs enfant de -40 à 0 seraient de 320 à 360.
L'insertion de valeurs manquantes peut sembler étrange, mais il évite plusieurs problèmes qui résultent d'avoir des valeurs de longitude qui sautent soudainement (Par exemple, de 20 à 320) .
* En[Générer des ensembles de donnéesXml](#generatedatasetsxml), il y a un "type de données",EDDGridLon0360De ErddapCatalog, qui vous permet de générer ledatasets.xmlpourEDDGridLon0360 ensembles de données de chacun desEDDGridensembles de donnéesERDDAPqui ont des valeurs de longitude supérieures à 180. Cela facilite l'offre de deux versions de ces ensembles de données :
l'original, avec des valeurs de longitude comprises entre 0 et 360,
et le nouvel ensemble de données, avec des valeurs de longitude comprises entre -180 et 180.
    
L'ensemble de données sur l'enfant dans chaqueEDDGridLon0360 dataset sera unEDDGridDe l'ensemble de données d'Erddap qui indique l'ensemble de données d'origine.
Le nouvel ensemble de donnéesdatasetIDsera le nom de l'ensemble de données original plus "\\_Lon0360".
Par exemple,
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Mettez lesEDDGridEnsemble de données Lon0360 **ci-dessous** l'ensemble de données originaldatasets.xml. Cela évite certains problèmes possibles.
    
Sinon, vous pouvez remplacer leEDDGridD'Erddap jeu de données enfant avec les données originalesdatasets.xml. Ensuite, il n'y aura qu'une seule version de l'ensemble de données : celle avec des valeurs de longitude comprises entre 0 et 360. Nous décourageons cela parce qu'il y a des moments où chaque version de l'ensemble de données est plus pratique.
    
* Si vous offrez deux versions d'un ensemble de données, par exemple une avec longitude 0 à 360 et une avec longitude -180 à 180:
    * Vous pouvez utiliser la option [&lt;accessible VoieWMS&gt;faux&lt;/accessible VoieWMS&gt;] (#accèsviawms) avec l'ensemble de données 0 à 360 pour désactiver laWMSservice pour cet ensemble de données. Ensuite, seule la version -180 à 180 de l'ensemble de données sera accessible viaWMS.
    * Il y a deux façons de tenir l'ensemble de données Lon0360 à jour en modifiant l'ensemble de données sous-jacent :
        * Si l'ensemble de données enfant est unEDDGridEnsemble de données d'Erddap qui fait référence à un ensemble de données dans le mêmeERDDAP™, l'ensemble de données Lon0360 essaiera de s'abonner directement à l'ensemble de données sous-jacent afin qu'il soit toujours à jour. Les abonnements directs ne génèrent pas de courriels vous demandant de valider l'abonnement - la validation doit être faite automatiquement.
        * Si l'ensemble de données pour enfants n'est pas unEDDGridDe l'ensemble de données d'Erddap qui est sur le mêmeERDDAP™, l'ensemble de données Lon0360 essaiera d'utiliser le système d'abonnement régulier pour s'abonner à l'ensemble de données sous-jacent. Si vous avez le système d'abonnementERDDAP™activé, vous devriez obtenir des emails vous demandant de valider l'abonnement. Je vous en prie.
        * Si vous avez le système d'abonnementERDDAP™désactivé, l'ensemble de données Lon0360 peut parfois avoir des métadonnées obsolètes jusqu'à ce que l'ensemble de données Lon0360 soit rechargé. Donc, si le système d'abonnement est désactivé, vous devriez définir le [&lt;recharger Chaque NMinutes&gt;] (#recharger toutes les minutes) le réglage de l'ensemble de données Lon0360 à un nombre plus petit, de sorte qu'il est plus susceptible de prendre des changements à l'ensemble de données enfant plus tôt.
#### EDDGridLon0360 squelette XML{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridSideBySide{#eddgridsidebyside} 
[ **EDDGridSideBySide** ](#eddgridsidebyside)agrégats deux ou plusEDDGridensembles de données (les enfants) côte à côte.

* L'ensemble de données résultant a toutes les variables de tous les ensembles de données pour enfants.
* L'ensemble de données parent et tous les ensembles de données enfants DOIVENT être différentsdatasetIDPar. Si les noms d'une famille sont exactement les mêmes, l'ensemble de données ne sera pas chargé (avec le message d'erreur que les valeurs de l'axe agrégé ne sont pas dans l'ordre trié) .
* Tous les enfants DOIVENT avoir les mêmes valeurs de source pouraxisVariables\\[1+\\]  (par exemple, latitude, longitude) . La précision des essais est déterminée par:[matchAxisNDigits](#matchaxisndigits).
* Les enfants peuvent avoir des valeurs de source différentes pouraxisVariables\\[0\\]  (par exemple, le temps) , mais ils sont généralement les mêmes.
* L'ensemble de données parent semble avoir toutes lesaxisVariables\\[0\\]les valeurs de source de tous les enfants.
* Par exemple, cela vous permet de combiner un ensemble de données source avec la composante u d'un vecteur et un autre ensemble de données source avec la composante v d'un vecteur, de sorte que les données combinées peuvent être servies.
* Les enfants créés par cette méthode sont détenus en privé. Ce ne sont pas des ensembles de données accessibles séparément. (par exemple, par les demandes de données du client ou par[fichiers d'affichage](/docs/server-admin/additional-information#flag)) .
* Les métadonnées et les paramètres globaux pour le parent proviennent des métadonnées et des paramètres globaux pour le premier enfant.
* S'il y a une exception lors de la création du premier enfant, le parent ne sera pas créé.
* S'il y a une exception lors de la création d'autres enfants, cela envoie un email à emailEverythingTo (comme spécifié dans[configuration.xml](/docs/server-admin/deploy-install#setupxml)) et continue avec les autres enfants.
#### EDDGridsquelette SideBySide XML{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridTotalExistingDimension{#eddgridaggregateexistingdimension} 
[ **EDDGridTotalExistingDimension** ](#eddgridaggregateexistingdimension)agrégats deux ou plusEDDGriddatasets dont chacun a une gamme de valeurs différente pour la première dimension, mais des valeurs identiques pour les autres dimensions.

* Par exemple, un ensemble de données pour enfants peut avoir 366 valeurs (pour 2004) pour la dimension temporelle et un autre enfant peut avoir 365 valeurs (pour 2005) pour la dimension temporelle.
* Toutes les valeurs pour toutes les autres dimensions (par exemple, latitude, longitude) DOIT être identique pour tous les enfants. La précision des essais est déterminée par:[matchAxisNDigits](#matchaxisndigits).
* Valeurs de dimension triées - Les valeurs de chaque dimension DOIVENT être triées dans l'ordre (ascendant ou descendant) . Les valeurs peuvent être irrégulièrement espacées. Il ne peut y avoir de liens. C'est une exigence de la[Norme sur les métadonnées des FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Si les valeurs d'une dimension ne sont pas triées, l'ensemble de données ne sera pas chargé etERDDAP™identifiera la première valeur non triée dans le fichier journal, *BigParent Directory* /logs/log.txt .
    
Les valeurs de dimension non triées indiquent presque toujours un problème avec l'ensemble de données source. Cela se produit le plus souvent lorsqu'un fichier mal nommé ou inapproprié est inclus dans l'agrégation, ce qui conduit à une dimension temporelle non triée. Pour résoudre ce problème, voir le message d'erreurERDDAP™log.txt fichier pour trouver la valeur de temps offensif. Ensuite, regardez dans les fichiers sources pour trouver le fichier correspondant (ou une avant ou une après) Ça n'appartient pas à l'agrégation.
    
* L'ensemble de données parent et l'ensemble de données enfant DOIVENT être différentsdatasetIDPar. Si les noms d'une famille sont exactement les mêmes, l'ensemble de données ne sera pas chargé (avec le message d'erreur que les valeurs de l'axe agrégé ne sont pas dans l'ordre trié) .
* Actuellement, l'ensemble de données sur l'enfant DOIT être unEDDGridL'ensemble de données de Dap et DOIT avoir les valeurs les plus basses de la dimension agrégée (généralement les valeurs temporelles les plus anciennes) . Tous les autres enfants DOIVENT être des ensembles de données presque identiques (La différence entre les valeurs de la première dimension) et sont spécifiées par seulement leurssourceUrl.
* L'ensemble de données agrégé obtient ses métadonnées du premier enfant.
* Les[Générer des ensembles de données Programme Xml](#generatedatasetsxml)peut faire une ébauche brute de ladatasets.xmlpour uneEDDGridAggregateExistingDimension basée sur un ensemble de fichiersHyraxou serveur THREDS. Par exemple, utilisez cette entrée pour le programme (le "/1988" dans l'URL rend l'exemple plus rapide) :
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
Vous pouvez utiliser le résultat&lt;sourceUrl&gt; tags ou les supprimer et décommenter&lt;sourceUrl&gt; tag (de sorte que les nouveaux fichiers sont remarqués chaque fois que l'ensemble de données est rechargé.
#### EDDGridAgrégatSquelette de taille XML{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridCopier{#eddgridcopy} 
[ **EDDGridCopier** ](#eddgridcopy)fait et maintient une copie locale d'un autreEDDGridles données et sert les données de la copie locale.

*   EDDGridCopier (et pour les données tabulaires,[EDDTableCopy](#eddtablecopy)) est un très facile à utiliser et un très efficace
     **solution à certains des plus gros problèmes liés au service des données d'une source de données distante:** 
    * L'accès aux données d'une source de données distante peut être lent.
        * Il peut être lent parce qu'il est intrinsèquement lent (par exemple, un type de serveur inefficace) ,
        * parce qu'il est submergé par trop de demandes,
        * ou parce que votre serveur ou le serveur distant est limité par la bande passante.
    * L'ensemble de données distant est parfois indisponible (encore une fois, pour diverses raisons) .
    * S'appuyer sur une source pour les données n'a pas une bonne échelle (par exemple, quand de nombreux utilisateurs et beaucoupERDDAPs utiliser) .
         
* Comment ça marche...EDDGridCopie résout ces problèmes en faisant et en maintenant automatiquement une copie locale des données et en servant les données de la copie locale.ERDDAP™peut servir les données de la copie locale très, très rapidement. Et faire une copie locale allège le fardeau sur le serveur distant. Et la copie locale est une sauvegarde de l'original, ce qui est utile si quelque chose arrive à l'original.
    
Il n'y a rien de nouveau à faire une copie locale d'un ensemble de données. Ce qui est nouveau ici est que cette classe le fait\\*facile\\*créer et\\*maintenir\\*une copie locale des données d'un\\*variété\\*des types de sources de données à distance et\\*ajouter des métadonnées\\*pendant la copie des données.
    
* Des morceaux de données --EDDGridCopie fait la copie locale des données en demandant des morceaux de données de la télécommande&lt;ensemble de données&gt; . Il y aura un morceau pour chaque valeur de la plus à gauche (première) variable de l'axe.EDDGridLa copie ne dépend pas des numéros d'index de l'ensemble de données distant pour l'axe -- ceux-ci peuvent changer.
    
ATTENTION: Si la taille d'un morceau de données est si grande (&gt; 2 Go) qu'il cause des problèmes,EDDGridUne copie ne peut pas être utilisée. (Désolé, nous espérons avoir une solution à ce problème à l'avenir.) 
    
*   \\[Une alternativeEDDGridReçu -
Si les données distantes sont disponibles via des fichiers téléchargeables, pas un service web, utilisez[cache Option FromUrl pourEDDGridFichiers](#cachefromurl), qui fait une copie locale des fichiers distants et sert les données des fichiers locaux.\\]
* Fichiers locaux -- Chaque tranche de données est stockée dans un fichier séparé.NetCDFfichier dans un sous-répertoire de *BigParent Directory* /copie/ *datasetID* / (comme spécifié dans[configuration.xml](/docs/server-admin/deploy-install#setupxml)) . Les noms de fichiers créés à partir des valeurs de l'axe sont modifiés pour les rendre sécurisés. (Par exemple, les tirets sont remplacés par "x2D") -- cela n'affecte pas les données réelles.
     
* Nouvelles données -- Chaque foisEDDGridCopie est rechargé, il vérifie la télécommande&lt;dataset&gt; pour voir quels morceaux sont disponibles. Si le fichier pour un morceau de données n'existe pas déjà, une requête pour obtenir le morceau est ajoutée à une file d'attente.ERDDAPLa tâcheThread traite toutes les requêtes en attente pour des morceaux de données, un par un. Vous pouvez voir des statistiques pour l'activité de la tâche Thread sur le[Page d'état](/docs/server-admin/additional-information#status-page)et dans[Rapport quotidien](/docs/server-admin/additional-information#daily-report). (Oui,ERDDAP™pourrait assigner plusieurs tâches à ce processus, mais cela utiliserait beaucoup de la bande passante de la source de données distante, de la mémoire et du temps CPU, et beaucoup deERDDAPLa bande passante, la mémoire et le temps CPU, ce qui n'est pas une bonne idée.) 
    
NOTE: La toute première foisEDDGridLa copie est chargée, (si tout va bien) De nombreuses requêtes pour des morceaux de données seront ajoutées à la file d'attente de la tâcheThread, mais aucun fichier de données local n'aura été créé. Donc le constructeur échouera, mais taskThread continuera de travailler et de créer des fichiers locaux. Si tout va bien, la tâche Thread fera quelques fichiers de données locaux et la prochaine tentative de recharger l'ensemble de données (dans ~15 minutes) réussira, mais initialement avec une quantité très limitée de données.
    
REMARQUE: Après que l'ensemble de données locales a quelques données et apparaît dans votreERDDAP, si l'ensemble de données distant est temporairement ou définitivement inaccessible, l'ensemble local fonctionnera toujours.
    
ATTENTION: Si le jeu de données distant est grand et/ou le serveur distant est lent (C'est le problème, n'est-ce pas?&#33;) , il faudra beaucoup de temps pour faire une copie locale complète. Dans certains cas, le temps nécessaire sera inacceptable. Par exemple, transmettre 1 To de données sur une ligne T1 (0,15 Go/s) prend au moins 60 jours, dans des conditions optimales. De plus, il utilise beaucoup de bande passante, de mémoire et de temps CPU sur les ordinateurs distants et locaux. La solution est d'envoyer un disque dur à l'administrateur de l'ensemble de données distant afin qu'il puisse faire une copie de l'ensemble de données et envoyer le disque dur à vous. Utiliser ces données comme point de départ etEDDGridCopier y ajoutera des données. (C'est une façon[Service Cloud EC2 d'Amazon](https://aws.amazon.com/importexport/)gère le problème, même si leur système a beaucoup de bande passante.) 
    
ATTENTION: Si une valeur donnée pour le plus à gauche (première) la variable axe disparaît de l'ensemble de données distant,EDDGridCopier ne supprime PAS le fichier local copié. Si vous le voulez, vous pouvez le supprimer vous-même.
    
#### Grille Copier la source Données{#grid-copy-checksourcedata} 
Lesdatasets.xmlpour cet ensemble de données peut avoir une balise optionnelle
```
    <checkSourceData>true</checkSourceData>  
```
La valeur par défaut est vraie. Si / quand vous le définissez à faux, l'ensemble de données ne vérifiera jamais l'ensemble de données source pour voir s'il y a des données supplémentaires disponibles.

#### seulement depuis{#onlysince} 
Vous pouvez le direEDDGridCopier pour faire une copie d'un sous-ensemble de données source, au lieu de l'ensemble de données source, en ajoutant une balise dans le formulaire&lt;seulement depuis&gt; *certains Valeur* &lt;/OnlyDepuis&gt; vers l'ensemble de donnéesdatasets.xmlUn morceau.EDDGridCopie ne téléchargera que les valeurs de la première dimension (généralement la dimension temporelle) qui sont supérieures à *certains Valeur* . *certains Valeur* peut être:
    * Temps relatif spécifié vianow- *nUnités* .
Par exemple,&lt;seulement depuis&gt;now-2 ans&lt;/onlyDepuis&gt; indique à l'ensemble de données de ne faire que des copies locales des données pour les données où les valeurs de la dimension extérieure (Valeurs temporelles en général) sont dans les 2 dernières années (qui est réévalué chaque fois que l'ensemble de données est rechargé, c'est-à-dire quand il cherche de nouvelles données à copier) . Voir[now- *nUnités* description syntaxique](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Ceci est utile si la première dimension a des données temporelles, ce qu'elle fait habituellement.
        
        EDDGridCopy ne supprime pas les fichiers de données locaux qui ont des données qui, au fil du temps, deviennent plus anciennes quenow- *nUnités* . Vous pouvez supprimer ces fichiers à tout moment si vous le souhaitez. Si vous le faites, nous vous recommandons fortement de définir un[drapeau](/docs/server-admin/additional-information#flag)après avoir supprimé les fichiers à direEDDGridCopier pour mettre à jour la liste des fichiers mis en cache.
        
    * Un point fixe dans le temps spécifié comme une chaîne ISO 8601yyyy-MM-ddTHH:mm:ssZ.
Par exemple,&lt;seulement depuis&gt;2000-01-01T00:00:00Z&lt;/onlyDepuis&gt; indique à l'ensemble de données seulement de faire des copies locales de données où la valeur de la première dimension est \\&gt;=2000-01-01T00:00:00Z . Ceci est utile si la première dimension a des données temporelles, ce qu'elle fait habituellement.
         
    * Un numéro flottant.
Par exemple,&lt;seulementdepuis&gt;946684800.0&lt;/seulementdepuis&gt; . Les unités seront les unités de destination de la première dimension. Par exemple, pour les dimensions du temps, les unitésERDDAP™sont toujours"seconds since 1970-01-01T00:00:00Z". Donc 946684800.0"seconds since 1970-01-01T00:00:00Z"est l'équivalent de 2000-2001-01T00:00:00Z. C'est toujours une option utile, mais surtout quand la première dimension n'a pas de données temporelles.

#### EDDGridCopier l'utilisation recommandée{#eddgridcopy-recomended-use} 
1. Créer la&lt;ensemble de données&gt; entrée (le type natif, nonEDDGridCopier) pour la source de données distante.
     **Faites-le fonctionner correctement, y compris toutes les métadonnées souhaitées.** 
2. Si c'est trop lent, ajoutez du code XML pour l'enrouler dans unEDDGridCopier l'ensemble de données.
    * Utiliser un autredatasetID  (Peut-être en modifiantdatasetIDdes anciensdatasetIDlégèrement) .
    * Copier&lt;accessible Pour&gt;,&lt;recharger tous les NMinutes&gt; et&lt;onChange&gt; depuis la télécommandeEDDGrid's XML à laEDDGridCopier est XML. (Leurs valeurs pourEDDGridCopier la matière; leurs valeurs pour l'ensemble de données internes deviennent inutiles.) 
3.  ERDDAP™fera et conservera une copie locale des données.
         
* MISE EN GARDE:EDDGridCopy suppose que les valeurs de données pour chaque morceau ne changent jamais. Si/quand ils le font, vous devez supprimer manuellement les fichiers morceaux dans *BigParent Directory* /copie/ *datasetID* / qui ont changé et[drapeau](/docs/server-admin/additional-information#flag)l'ensemble de données à recharger pour que les morceaux supprimés soient remplacés. Si vous avez un abonnement e-mail à l'ensemble de données, vous obtiendrez deux emails : l'un lorsque l'ensemble de données se recharge et commence à copier les données, et l'autre lorsque l'ensemble de données se charge à nouveau (automatiquement) et détecte les nouveaux fichiers de données locaux.
     
* Toutes les valeurs d'axe doivent être égales.
Pour chacun des axes à l'exception de la gauche (première) , toutes les valeurs doivent être égales pour tous les enfants. La précision des essais est déterminée par:[matchAxisNDigits](#matchaxisndigits).
     
* Paramètres, métadonnées, variables --EDDGridLa copie utilise les paramètres, les métadonnées et les variables de l'ensemble de données source joint.
     
* Modifier les métadonnées -- Si vous devez changeraddAttributesou modifier l'ordre des variables associées à l'ensemble de données source:
    1. Modifier leaddAttributespour l'ensemble de données sourcedatasets.xml, au besoin.
    2. Supprimer un des fichiers copiés.
    3. Définir un[drapeau](/docs/server-admin/additional-information#flag)pour recharger immédiatement l'ensemble de données. Si vous utilisez un drapeau et que vous avez un abonnement e-mail à l'ensemble de données, vous obtiendrez deux emails : l'un lorsque l'ensemble de données se recharge et commence à copier les données, et l'autre lorsque l'ensemble de données se recharge à nouveau (automatiquement) et détecte les nouveaux fichiers de données locaux.
    4. Le fichier supprimé sera régénéré avec les nouvelles métadonnées. Si l'ensemble de données source n'est jamais disponible,EDDGridCopier l'ensemble de données obtiendra des métadonnées à partir du fichier régénéré, car c'est le fichier le plus jeune.
#### EDDGridCopier le squelette XML{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableDeCassandra{#eddtablefromcassandra} 
[ **EDDTableDeCassandra** ](#eddtablefromcassandra)gère les données d'un[Cassandra](https://cassandra.apache.org/)tableau. Cassandra est une base de données NoSQL.

*   ERDDAP™peut fonctionner avec Cassandra v2 et v3 sans modifications ni différences de configuration. Nous avons testé avec[Cassandra v2 et v3 de Apache](https://cassandra.apache.org/download/). Il est probable queERDDAP™peut également travailler avec Cassandra téléchargé de DataStax.
     
* Pour août 2019 - mai 2021, nous avons eu du mal à faire travailler Cassandra avec AdopteOpenJdkJavav8. Il a lancé une EXCEPTION\\_ACCESS\\_VIOLATION). Mais maintenant (Mai 2021) , ce problème est parti: nous pouvons utiliser avec succès Cassandra v2.1.22 et AdoptezOpenJdk jdk8u292-b10.
     
#### Un seul tableau{#one-table} 
Cassandra ne supporte pas les "joins" comme le font les bases de données relationnelles. UneERDDAP™EDDTableFromCassandra dataset maps to one (Peut-être un sous-ensemble d'un) La table de Cassandra.

#### Cassandradatasets.xml {#cassandra-datasetsxml} 
*   ERDDAP™vient avec la CassandraJavapilote, donc vous n'avez pas besoin de l'installer séparément.
* Lisez attentivement toutes les informations de ce document sur EDDTableFromCassandra. Certains détails sont très importants.
* La CassandraJavapilote est destiné à travailler avec Apache Cassandra (1.2+) et DataStax Entreprise (3.1+) . Si vous utilisez Apache Cassandra 1.2.x, vous devez modifier le fichier cassandra.yaml pour chaque noeud pour définir start\\_native\\_transport: true, puis redémarrer chaque noeud.
* Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez ensuite modifier cela pour l'accorder (surtout [&lt;partition Noms des sources clés&gt;] (#noms de source de clé de partition) ) . Vous pouvez recueillir la plupart des informations nécessaires pour créer le XML pour un jeu de données EDDTableFromCassandra en contactant l'administrateur de Cassandra et en effectuant une recherche sur le web.
    
Générer des ensembles de données Xml a deux options spéciales pour EDDTableFromCassandra:
    
    1. Si vous entrez "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (sans les citations) pour l'espace clé, le programme affichera une liste d'espaces clés
    2. Si vous entrez un espace clé spécifique et puis entrez "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (sans les citations) pour le nom de la table, le programme affichera une liste de tables dans cet espace clé et leurs colonnes.
##### Sensibilité des cas{#case-sensitivity} 
* Noms de l'espace clé et de la table insensibles aux cas -
Cassandra traite l'espace-clé et les noms de table de façon insensible aux cas. À cause de cela, vous ne devez JAMAIS utiliser un mot réservé (mais avec un cas différent) comme un espace clé ou un nom de table de Cassandra.
* Noms de colonnes insensibles aux cas --
Par défaut, Cassandra traite les noms de colonnes de manière insensible aux cas. Si vous utilisez un des mots réservés de Cassandra comme nom de colonne (S'il vous plaît, ne faites pas ça &#33;) , vous devez utiliser
```
        <columnNameQuotes>"<columnNameQuotes>  
```
endatasets.xmlpour cet ensemble de données afin que Cassandra etERDDAP™traitera les noms de colonnes d'une manière sensible au cas par cas. Ce sera probablement un mal de tête massif pour vous, parce qu'il est difficile de déterminer les versions sensibles aux cas des noms de colonnes -- Cassandra affiche presque toujours les noms de colonnes comme tous les minuscules, quel que soit le cas réel.
* Travailler en étroite collaboration avec l'administrateur de Cassandra, qui peut avoir une expérience pertinente. Si l'ensemble de données ne se charge pas, lisez la[message d'erreur](#troubleshooting-tips)soigneusement pour savoir pourquoi.
         
#### Cassandra&lt;connexion Biens immobiliers;{#cassandra-connectionproperty} 
Cassandra a des propriétés de connexion qui peuvent être spécifiées dansdatasets.xml. Beaucoup d'entre eux affecteront la performance de la Cassandra-ERDDAP™connexion. Malheureusement, les propriétés de Cassandra doivent être définies programmatiquement dansJavaDoncERDDAP™doit avoir un code pour chaque propriétéERDDAP™soutien. Actuellement,ERDDAP™prend en charge ces propriétés :
 (Les valeurs par défaut affichées sont ce que nous voyons. Les défauts de votre système peuvent être différents.) 

*    **Options générales**   
    &lt;connexion Nom de la propriété **compression** "&gt; *aucune|LZ4|snappy* &lt;/ Connexion Propriété&gt; (cas-insensible, par défaut=none)   
     (Conseil général de compression: utiliser 'none' si la connexion entre Cassandra etERDDAP™est local/rapide et utiliser 'LZ4' si la connexion est distante/faible.)   
    &lt;connexion Nom de la propriété **pouvoirs** "&gt; *Nom d'utilisateur/mot de passe* &lt;/ Connexion Propriété&gt; (C'est littéral.'/')   
    &lt;connexion Nom de la propriété **métriques** "&gt; *vrai|faux* &lt;/ Connexion Propriété&gt; (2021-01-25 était par défaut = vrai, maintenant ignoré et toujours faux)   
    &lt;connexion Nom de la propriété **port** "&gt; *aEntier* &lt;/ Connexion Propriété&gt; (par défaut pour le protocole binaire natif=9042)   
    &lt;connexion Nom de la propriété **ssl** "&gt; *vrai|faux* &lt;/ Connexion Propriété&gt; (par défaut=false)   
     (Ma tentative rapide d'utiliser ssl a échoué. Si vous réussissez, dites-moi comment vous l'avez fait.) 
*    **Options de requête**   
    &lt;connexion Nom de la propriété **cohérence Niveau** "&gt; *Tous|une|chaque\\_quorum|local\\_un|local\\_quorum|local\\_série|une|quorum|série|trois|deux* &lt;/ Connexion Propriété&gt; (cas-insensible, par défaut=ONE)   
    &lt;connexion Nom de la propriété **tailler** "&gt; *aEntier* &lt;/ Connexion Propriété&gt; (par défaut = 5000)   
     (Ne définissez pas fetchSize à une valeur plus petite.)   
    &lt;connexion Nom de la propriété **serialConsistanceNiveau** "&gt; *Tous|une|chaque\\_quorum|local\\_un|local\\_quorum|local\\_série|une|quorum|série|trois|deux* &lt;/ Connexion Propriété&gt; (cas insensible, par défaut=SERIAL) 
*    **Options de prise en charge**   
    &lt;connexion Nom de la propriété **connectTimeoutMillis** "&gt; *aEntier* &lt;/ Connexion Propriété&gt; (par défaut = 5000)   
     (Ne pas définir la connexion TimeoutMillis à une valeur plus petite.)   
    &lt;connexion Nom de la propriété **garderAlive** "&gt; *vrai|faux* &lt;/ Connexion Propriété&gt;
    &lt;connexion Nom de la propriété **lireTimeoutMillis** "&gt; *aEntier* &lt;/ Connexion Propriété&gt;
     (La lecture par défaut de CassandraTimeoutMillis est de 12000, maisERDDAP™change la valeur par défaut à 120000. Si Cassandra lance readTimeouts, cela peut ne pas être utile, car Cassandra les lance parfois avant cette fois. Le problème est plus probable que vous stockez trop de données par partition La combinaison clé.)   
    &lt;connexion Nom de la propriété **recevoir BufferSize** "&gt; *aEntier* &lt;/ Connexion Propriété&gt;
     (Il n'est pas clair ce qu'est le receiveBufferSize par défaut. Ne mettez pas cela à une petite valeur.)   
    &lt;connexion Nom de la propriété **soLinger** "&gt; *aEntier* &lt;/ Connexion Propriété&gt;
    &lt;connexion Nom de la propriété **tcpNoDelay** "&gt; *vrai|faux* &lt;/ Connexion Propriété&gt; (par défaut=null) 

Si vous devez être en mesure de définir d'autres propriétés de connexion, consultez notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).

Pour un démarrage donné de Tomcat, connectionLes propriétés ne sont utilisées que la première fois qu'un jeu de données est créé pour une URL Cassandra donnée. Tous les rechargements de cet ensemble de données et tous les ensembles de données subséquents qui partagent la même URL utiliseront ces propriétés de connexion originales.
    
#### CQL{#cql} 
La langue de la requête Cassandra (CQL) est superficiellement comme SQL, le langage de requête utilisé par les bases de données traditionnelles. Parce queOPeNDAPLes requêtes de données tabulaires ont été conçues pour imiter les requêtes de données tabulaires SQL, il est possible pourERDDAP™pour convertir les demandes de données tabulaires en CQL Bound/PreparedStatements.ERDDAP™enregistre la déclaration dans[Log.txt](/docs/server-admin/additional-information#log)comme
comme texte: *dans l ' état*   
La version de l'énoncé que vous voyez sera une représentation texte de l'énoncé et aura seulement "?" où les valeurs de contrainte seront placées.
       
Pas si simple... Malheureusement, CQL a de nombreuses restrictions sur quelles colonnes peut être interrogé avec quels types de contraintes, par exemple, les colonnes clés de partition peuvent être limitées avec = et IN, doncERDDAP™envoie quelques contraintes à Cassandra et applique toutes les contraintes après réception des données de Cassandra. Pour aiderERDDAP™traiter efficacement avec Cassandra, vous devez spécifier [&lt;partition Noms des sources clés&gt;] (#noms de source de clé de partition) , [&lt;clusterColonneSourceNoms&gt;] (Noms de sources) , et [&lt;indexColonneSourceNoms&gt;] (#indexcolonnenoms de source) endatasets.xmlpour cet ensemble de données. Ce sont les moyens les plus importants d'aiderERDDAP™travailler efficacement avec Cassandra. Si vous ne le dites pasERDDAP™cette information, l'ensemble de données sera douloureusement lent dansERDDAP™et utiliser des tonnes de ressources de Cassandra.
     
#### &lt;partition Noms et gt clés;{#partitionkeysourcenames} 
Parce que les clés de partition jouent un rôle central dans les tables de Cassandra,ERDDAP™doit connaître leursourceNames et, le cas échéant, d'autres informations sur la façon de travailler avec eux.
* Vous DOIVENT spécifier une liste séparée par des virgules des noms de colonnes source de clé de partition dansdatasets.xmlpar&lt;partition Noms-clés&gt;.
Exemple simple,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
exemple plus complexe,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* Clés de partition TimeStamp -- Si l'une des colonnes de touches de partition est une colonne d'horodatage qui a une version plus grossière d'une autre colonne d'horodatage, spécifiez ceci via
     *partitionKeySourcNom/autreColonneSourceNom/time\\_precision*   
oùtime\\_precisionest l'un des[time\\_precision](#time_precision)cordes utilisées ailleurs dansERDDAP.
La piste Z dans letime\\_precisionchaîne est la valeur par défaut, donc peu importe si latime\\_precisionchaîne se termine en Z ou pas.
Par exemple,ERDDAP™interprétera la date/l'exemple/1970-01-01 comme "Les contraintes de date peuvent être construites à partir des contraintes de temps d'échantillonnage en utilisanttime\\_precision." La conversion réelle des contraintes est plus complexe, mais c'est l'aperçu.
     **Utilisez-le quand cela est pertinent.** Il permetERDDAP™travailler efficacement avec Cassandra. Si cette relation entre les colonnes existe dans une table Cassandra et que vous ne dites pasERDDAP™, l'ensemble de données sera douloureusement lentERDDAP™et utiliser des tonnes de ressources de Cassandra.
* Personne seule Clés de partition de valeur -- Si vous voulezERDDAP™dataset pour fonctionner avec une seule valeur d'une clé de partition, spécifier *partitionKeySourceNom=valeur* .
N'utilisez pas de guillemets pour une colonne numérique, par exemple, deviceid=1007.
Utilisez des guillemets pour une colonne String, par exemple stationid="Point Pinos"
* Ordre de tri par défaut -- L'ordre de la clé de partition&lt;dataVariable&gt; est endatasets.xmldétermine l'ordre de tri par défaut des résultats de Cassandra. Bien sûr, les utilisateurs peuvent demander un ordre de tri différent pour un ensemble donné de résultats en ajoutant &orderBy (" *Liste des variables séparées par des virgules* ") à la fin de leur requête.
* Par défaut, Cassandra etERDDAP™traiter les noms de colonnes de manière insensible aux cas. Mais si tu mets[colonneNomQuotes](#case-sensitivity)à ",ERDDAP™traitera les noms de colonnes de Cassandra de manière sensible au cas par cas.
         
#### &lt;partition KeyCSV&gt;{#partitionkeycsv} 
Si cela est spécifié,ERDDAP™l'utilisera au lieu de demander à Cassandra pour la partition Informations clés chaque fois que l'ensemble de données est rechargé. Ceci fournit la liste des valeurs de clé de partition distinctes, dans l'ordre où elles seront utilisées. Les heures doivent être spécifiées comme secondes depuis 1970-01-01T00:00:00Z. Mais il y a aussi deux façons spéciales de spécifier les temps (chaque chaîne encodée) :

1) temps (aISO8601 Heure)   (PEUVENT être encodés comme une chaîne)   
2) "temps" (anISO8601StartTime, strideSeconds, stopTime) " (DOIT être encodée comme une chaîne)   
Arrêter Le temps peut être une ISO8601 Temps ou un "now-Heure (Par exemple, "now-3 minutes") .
Arrêter Le temps n'a pas besoin d'être un match de départ exact Temps + x strideSeconds.
Une rangée avec une fois () valeur est étendue en plusieurs lignes avant chaque requête, donc la liste de partition Les clés peuvent toujours être parfaitement à jour.
Par exemple,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
élargit dans ce tableau des combinaisons de clés de partition:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;clusterColonneSourceNames&gt;{#clustercolumnsourcenames} 
Cassandra accepte les contraintes SQL sur les colonnes de cluster, qui sont les colonnes qui forment la deuxième partie de la clé primaire (après la clé de partition (s) ) . Donc, il est essentiel que vous identifiez ces colonnes via&lt;clusterColonneSourceNames&gt;. Cela permetERDDAP™travailler efficacement avec Cassandra. S'il y a des colonnes de cluster et que vous ne dites pasERDDAP, l'ensemble de données sera douloureusement lentERDDAP™et utiliser des tonnes de ressources de Cassandra.
    * Par exemple,&lt;clusterColonneSourceNames&gt; *myClusterColumn1, myClusterColumn2* &lt;/clusterColonneNoms de source&gt;
    * Si une table Cassandra n'a pas de colonnes cluster, ne spécifiez pas non plus&lt;clusterColumnSourceNames&gt;, ou le spécifier sans valeur.
    * Par défaut, Cassandra etERDDAP™traiter les noms de colonnes de manière insensible aux cas. Mais si tu mets[colonneNomQuotes](#case-sensitivity)à ",ERDDAP™traitera les noms de colonnes de Cassandra d'une manière sensible au cas par cas.
         
#### &lt;indexColonneSourceNoms &gt;{#indexcolumnsourcenames} 
Cassandra accepte'='contraintes sur les colonnes d'index secondaires, qui sont les colonnes que vous avez explicitement créé des index pour via
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Oui, les parenthèses sont nécessaires.)   
Donc, il est très utile si vous identifiez ces colonnes via&lt;indexColonneSourceNoms&gt;. Cela permetERDDAP™travailler efficacement avec Cassandra. S'il y a des colonnes d'index et que vous ne dites pasERDDAP, certaines questions seront inutilement, douloureusement lentesERDDAP™et utiliser des tonnes de ressources de Cassandra.
* Par exemple,&lt;indexColonneSourceNoms&gt; *myIndexColumn1, myIndexColumn2* &lt;/indexNoms de source de la colonne&gt;
* Si une table Cassandra n'a pas de colonnes d'index, ne spécifiez pas non plus&lt;indexColumnSourceNames&gt;, ou spécifiez-le sans valeur.
* ATTENTION : Les index de Cassandra ne sont pas des index de base de données. Les index de Cassandra aident uniquement avec'='contraintes. Et ils sont seulement[recommandé](https://cassandra.apache.org/doc/latest/cql/indexes.html)pour les colonnes dont les valeurs distinctes sont beaucoup moins élevées que les valeurs totales.
* Par défaut, Cassandra etERDDAP™traiter les noms de colonnes de manière insensible aux cas. Mais si tu mets[colonneNomQuotes](#case-sensitivity)à ",ERDDAP™traitera les noms de colonnes de Cassandra d'une manière sensible au cas par cas.
         
#### &lt;maxRequestFraction &gt;{#maxrequestfraction} 
QuandERDDAP™  (re) charge un ensemble de données,ERDDAP™obtient de Cassandra la liste des combinaisons distinctes des clés de partition. Pour un énorme ensemble de données, le nombre de combinaisons sera énorme. Si vous voulez empêcher les demandes des utilisateurs de demander la plupart ou la totalité des données (ou même une demande qui demandeERDDAP™pour télécharger la plupart ou la totalité des données afin de les filtrer davantage) Tu peux le direERDDAP™uniquement pour permettre des demandes qui réduisent le nombre de combinaisons d'un certain montant via&lt;maxRequestFraction&gt;, qui est un nombre de points flottants entre 1e-10 (ce qui signifie que la demande ne peut pas avoir besoin de plus d'une combinaison dans un milliard) et 1 (par défaut, ce qui signifie que la requête peut être pour l'ensemble des données) .
Par exemple, si un jeu de données a 10000 combinaisons distinctes des touches de partition et maxRequestFraction est réglé à 0,1,
alors les requêtes qui nécessitent des données de 1001 ou plusieurs combinaisons généreront un message d'erreur,
mais les demandes qui nécessitent des données de 1000 combinaisons ou moins seront autorisées.
    
Généralement, plus l'ensemble de données est grand, plus vous devez définir&lt;maxRequestFraction&gt;. Vous pouvez donc le définir à 1 pour un petit ensemble de données, à 0,1 pour un ensemble de données de taille moyenne, à 0,01 pour un grand ensemble de données et à 0,0001 pour un énorme ensemble de données.
    
Cette approche est loin d'être parfaite. Cela entraînera le rejet de certaines demandes raisonnables et l'acceptation de certaines demandes trop importantes. Mais c'est un problème difficile et cette solution est bien meilleure que rien.
    
#### CassandrasubsetVariables {#cassandra-subsetvariables} 
Comme pour d'autres ensembles de données EDDTable, vous pouvez spécifier une liste de&lt;dataVariable&gt;destinationNames dans un attribut global appelé "[subsetVariables](#subsetvariables)" pour identifier les variables dont le nombre de valeurs est limité. L'ensemble de données aura ensuite une page web .subset et affichera des listes de valeurs distinctes pour ces variables dans les listes déroulantes sur de nombreuses pages Web.
    
Inclure simplement les variables clés de partition et les colonnes statiques dans la liste est STRONGLY ENCOUragé. Cassandra sera en mesure de générer la liste de combinaisons distinctes très rapidement et facilement chaque fois que l'ensemble de données est rechargé. Une exception est les touches de partition timestamp qui sont des versions grossières de certaines autres colonnes timestamp -- il est probablement préférable de les laisser hors de la liste desubsetVariablescar il y a un grand nombre de valeurs et elles ne sont pas très utiles pour les utilisateurs.
    
Si vous incluez des variables non statiques dans la liste, il sera probablement **Très** calculalement coûteux pour Cassandra chaque fois que l'ensemble de données est rechargé, parce queERDDAP™doit regarder à travers chaque ligne de l'ensemble de données pour générer l'information. En fait, la requête risque d'échouer. Donc, sauf pour les très petits ensembles de données, c'est STRONGEMENT DISCOURAGED.
    
#### Cassandra DataTypes{#cassandra-datatypes} 
Parce qu'il y a une ambiguïté sur laquelle[Types de données Cassandra](https://cassandra.apache.org/doc/latest/cql/types.html)carte à laquelleERDDAP™types de données, vous devez spécifier un [&lt;type de données&gt;] (#type de données) étiquette pour chaque [&lt;dataVariable&gt;] (#donnéesvariables) à direERDDAP™quel type de données utiliser. La normeERDDAP™données Types (et les types de données Cassandra correspondants les plus courants) sont:
    
*   [booléen](#boolean-data)  (booléen) , quiERDDAP™puis les magasins comme octets
* octet (int, si la fourchette est de -128 à 127) 
* courte (int, si la fourchette est de -32768 à 32767) 
* Int (Int, compteur?, varice?, si la portée est -2147483648 à 2147483647) 
* longue (bigint, compteur?, varice?, si la portée est -9223372036854775808 à 9223372036854775807) 
* flotteur (flotteur) 
* double (double, décimale (avec perte possible de précision) , horodatage) 
* Char (ascii ou texte, s'ils n'ont jamais plus d'un caractère) 
* Chaîne (ascii, texte, varchar, inet, uuid, timeuid, blob, map, set, list?) 

Chez Cassandra[horodatage](#cassandra-timestamp-data)est un cas particulier: utilisationERDDAP's données doubles Type.

Si vous spécifiez un type de chaîne dansERDDAP™pour une carte, un ensemble ou une liste de Cassandra, la carte, un ensemble ou une liste de chaque ligne de Cassandra sera converti en une seule chaîne sur une seule ligne dans laERDDAP™tableau.ERDDAP™a un autre système pour les listes; voir ci-dessous.

 *type* Listes --ERDDAPC'est...&lt;type de données&gt;] (#type de données) tag pour CassandradataVariables peut inclure lesERDDAP™données Types (voir ci-dessus) Plus plusieurs données spécialesTypes qui peuvent être utilisés pour les colonnes de liste Cassandra: booleanList, byteList, ubyteList, shortList, ushortList, intList, uintList, longList, ulongList, floatList, doubleList, charList, StringList. Lorsque l'une de ces colonnes de liste est dans les résultats passés àERDDAP™, chaque ligne de données sources sera étendue à la liste. taille () lignes de données enERDDAP; données simples Types (Par exemple, Int) dans cette ligne de données source sera dupliquée liste. taille () temps. Si les résultats contiennent plus d'une variable de liste, toutes les listes d'une ligne de données donnée DOIVENT avoir la même taille et DOIVENT être des listes parallèles, ouERDDAP™générera un message d'erreur. Par exemple, pour les mesures des courants à partir d'un PCAD,
profondeur\\[0\\]Actuellement\\[0\\]Actuellement\\[0\\]et zCurrent\\[0\\]sont tous liés, et
profondeur\\[1\\]Actuellement\\[1\\]Actuellement\\[1\\]et zCurrent\\[1\\]sont tous liés, ...
Sinon, si vous ne voulez pasERDDAP™pour étendre une liste en plusieurs lignes dans leERDDAP™tableau, indiquer String commedataVariableDonnées Tapez donc la liste entière sera représentée comme une chaîne sur une ligne dansERDDAP.
    
#### Données de Cassandra TimeStamp{#cassandra-timestamp-data} 
Les données d'horodatage de Cassandra sont toujours au courant des fuseaux horaires. Si vous entrez des données d'horodatage sans spécifier de fuseau horaire, Cassandra suppose que l'horodatage utilise le fuseau horaire local.
    
ERDDAP™prend en charge les données timestamp et présente toujours les données dans leZuluZone horaire GMT. Donc, si vous entrez des données d'horodatage dans Cassandra en utilisant un fuseau horaire autre queZulu/GMT, rappelez-vous que vous devez faire toutes les requêtes pour les données d'horodatage dansERDDAP™utilisant lesZuluZone horaire GMT. Donc, ne soyez pas surpris quand les valeurs d'horodatage qui sortent deERDDAPsont déplacés de plusieurs heures en raison du changement de fuseau horaire de local àZuluL'heure du GMT.

* EnERDDAP'sdatasets.xml, dans&lt;dataVariable&gt; tag pour une variable d'horodatage, set
```
          <dataType>double</dataType>  
```
et en&lt;addAttributes&gt; ensemble
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Suggestion : Si les données sont une plage de temps, il est utile de faire référence aux valeurs de l'horodatage au centre de la plage de temps implicite (Par exemple, midi) . Par exemple, si un utilisateur a des données pour 2010-03-26T13:00Z d'un autre ensemble de données et qu'il veut les données les plus proches de cet ensemble de données Cassandra qui a des données pour chaque jour, alors les données pour 2010-03-26T12:00Z (représentant les données de Cassandra pour cette date) est évidemment le meilleur (par rapport au minuit avant ou après, où il est moins évident qui est le mieux) .
*   ERDDAP™a une utilité pour[Convertir un numérique Temps de départ/vers une chaîne](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Voir[CommentERDDAP™Traitement du temps](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
#### Entier nuls{#integer-nulls} 
Cassandra prend en charge les nuls dans Cassandra int (ERDDAP™Int) et bigint (ERDDAP™longue) colonnes, maisERDDAP™ne supporte pas true nulls pour n'importe quel type de données entier.
Par défaut, Cassandra integer nulls sera converti enERDDAP™à 2147483647 pour les colonnes int, ou 9223372036854775807 pour les colonnes longues. Ceux-ci apparaîtront comme "NaN" dans certains types de fichiers de sortie de texte (par exemple, .csv) , "" dans d'autres types de fichiers de sortie de texte (par exemple,.htmlTable) , et le numéro spécifique (2147483647 pour les valeurs d'int manquantes) dans d'autres types de fichiers (par exemple, des fichiers binaires comme.ncet tapis) . Un utilisateur peut rechercher des lignes de données avec ce type de valeur manquante en se référant à "NaN", par exemple, "&windSpeed=NaN".
    
Si vous utilisez une autre valeur entière pour indiquer des valeurs manquantes dans votre tableau Cassandra, veuillez identifier cette valeur dansdatasets.xml:

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

Pour les colonnes flottantes Cassandra, les nulls se convertissent en NaNs dansERDDAP. Pour les types de données Cassandra qui sont convertis en chaînes dansERDDAP™Les nuls se convertissent en cordes vides. Ça ne devrait pas être un problème.
    
#### "ARRÊT: Re-préparer la requête déjà préparée"{#warning-re-preparing-already-prepared-query} 
* "WARNING: Re-préparer la requête déjà préparée" dans *Tomcat* /logs/catalina.out (ou un autre fichier journal Tomcat)   
La documentation de Cassandra dit qu'il y a des problèmes si la même requête est faite dans un Etat Préparé deux fois (ou plus) . (Voir ceci[rapport de bogue](https://datastax-oss.atlassian.net/browse/JAVA-236).) Pour éviter de rendre Cassandra folle,ERDDAP™cache tous les états préparés afin qu'il puisse les réutiliser. Ce cache est perdu si/quand Tomcat/ERDDAP™est relancé, mais je pense que c'est bien parce que les déclarations préparées sont associées à une session donnée (entreJavaet Cassandra) , qui est également perdu. Donc, vous pouvez voir ces messages. Je ne connais aucune autre solution. Heureusement, c'est un avertissement, pas une erreur (bien que Cassandra menace qu'il puisse conduire à des problèmes de performance) .
    
Cassandra affirme que les déclarations préparées sont bonnes pour toujours.ERDDAPLes états préparés mis en cache ne devraient jamais devenir périmés/invalides. Si ce n'est pas vrai, et que vous obtenez des erreurs au sujet de certains états préparés étant obsolètes/invalides, alors vous devez redémarrerERDDAP™pour dégagerERDDAPLa cache des déclarations préparées.
    
#### Cassandra Sécurité{#cassandra-security} 
Voir[Sécuriser Cassandra](https://cassandra.apache.org/doc/latest/operating/security.html)

Lorsque vous travaillez avec Cassandra, vous devez faire les choses en toute sécurité et en toute sécurité afin d'éviter de permettre à un utilisateur malveillant d'endommager votre Cassandra ou d'accéder aux données auxquelles il ne devrait pas avoir accès.ERDDAP™essaie de faire les choses de manière sûre, aussi.

* Nous vous encourageons à créerERDDAP™pour se connecter à Cassandra en tant qu'utilisateur de Cassandra qui n'a accès qu'à **pertinent** Tableau (s) et a seulement les privilèges de LIRE.
* Nous vous encourageons à mettre en place la connexion deERDDAP™à Cassandra pour qu'il
    * utilise toujours SSL,
    * permet uniquement les connexions à partir d'une seule adresse IP (ou un bloc d'adresses) et de celuiERDDAP™utilisateur, et
    * ne transfère que les mots de passe dans leur formulaire de hachage MD5.
*   \\[PROBLÈME SAVOIR\\]Les propriétés de connexion (y compris le mot de passe&#33;) sont stockés en texte simple dansdatasets.xml. Nous n'avons pas trouvé de moyen pour permettre à l'administrateur d'entrer le mot de passe Cassandra pendantERDDAPLa startup à Tomcat (qui se produit sans entrée utilisateur) , donc le mot de passe doit être accessible dans un fichier. Pour le rendre plus sûr :
    * Toi (desERDDAP™administrateur) devrait être le propriétaire dedatasets.xmlet avoir accès à LIRE et ÉCRIRE.
    * Créez un groupe qui comprend seulement user=tomcat. Utilisez chgrp pour faire que le groupe pourdatasets.xml, avec juste les privilèges de LIRE.
    * Utiliser chmod pour attribuer des privilèges o-rwx (aucun accès LIRE ou WRITE pour les "autres" utilisateurs) pourdatasets.xml.
* LorsqueERDDAP™, le mot de passe et les autres propriétés de connexion sont stockés dans "privé"Javavariables.
* Les demandes des clients sont analysées et vérifiées avant de générer les demandes CQL pour Cassandra.
* Les demandes à Cassandra sont faites avec CQL Bound/PreparedStements, afin de prévenir l'injection de CQL. Dans tous les cas, Cassandra est intrinsèquement moins sensible à l'injection de CQL que les bases de données traditionnelles[Injection SQL](https://en.wikipedia.org/wiki/SQL_injection).
         
#### Vitesse de Cassandra{#cassandra-speed} 
Cassandra peut être rapide ou lente. Il y a des choses que vous pouvez faire pour faire vite:
* En général -
La nature de CQL est que les requêtes sont[déclaration](https://en.wikipedia.org/wiki/Declarative_programming). Ils précisent simplement ce que l'utilisateur veut. Ils n'incluent pas de spécification ou de conseils pour la façon dont la requête doit être traitée ou optimisée. Donc il n'y a aucun moyen pourERDDAP™pour générer la requête de telle manière qu'elle aide Cassandra à optimiser la requête (ou de quelque manière que ce soit spécifie comment la requête doit être traitée) . En général, c'est à l'administrateur de Cassandra de mettre les choses en place. (par exemple, index) pour optimiser pour certains types de requêtes.
     
* Spécifier les colonnes d'horodatage qui sont liées aux touches de partition d'horodatage de précision plus grossière via [&lt;partition Noms des sources clés&gt;] (#noms de source de clé de partition) est le moyen le plus important d'aiderERDDAP™travailler efficacement avec Cassandra. Si cette relation existe dans une table Cassandra et que vous ne le dites pasERDDAP™, l'ensemble de données sera douloureusement lentERDDAP™et utiliser des tonnes de ressources de Cassandra.
     
* Spécifier les colonnes de cluster via [&lt;clusterColonneSourceNoms&gt;] (Noms de sources) est la deuxième façon la plus importante d'aiderERDDAP™travailler efficacement avec Cassandra. S'il y a des colonnes de cluster et que vous ne dites pasERDDAP, un grand sous-ensemble des requêtes possibles pour les données sera inutilement, douloureusement lentERDDAP™et utiliser des tonnes de ressources de Cassandra.
     
* Marque[Indices](https://cassandra.apache.org/doc/latest/cql/indexes.html)pour les variables fréquemment contraintes --
Vous pouvez accélérer quelques requêtes en créant des index pour les colonnes de Cassandra qui sont souvent limitées par des contraintes de "=".
    
Cassandra ne peut pas créer d'index pour les colonnes de liste, de jeu ou de carte.
    
* Spécifier les colonnes d'index via [&lt;indexColonneSourceNoms&gt;] (#indexcolonnenoms de source) est un moyen important d'aiderERDDAP™travailler efficacement avec Cassandra. S'il y a des colonnes d'index et que vous ne dites pasERDDAP, certaines requêtes de données seront inutilement, douloureusement lentes dansERDDAP™et utiliser des tonnes de ressources de Cassandra.
     
#### Statistiques Cassandra{#cassandra-stats} 
*   [Messages de diagnostic "Cassandra stats"](#cassandra-stats)-- Pour chaqueERDDAP™requête utilisateur vers un jeu de données Cassandra,ERDDAP™imprimera une ligne dans le fichier journal, *BigParent Directory* /logs/log.txt, avec quelques statistiques liées à la requête, par exemple,
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
En utilisant les chiffres de l'exemple ci-dessus, cela signifie:

* QuandERDDAP™dernier (re) chargé ce jeu de données, Cassandra ditERDDAP™qu'il y avait 10000 combinaisons distinctes des clés de partition.ERDDAP™cache toutes les combinaisons distinctes dans un fichier.
* En raison des contraintes de l'utilisateur,ERDDAP™a identifié 2 combinaisons sur les 10000 qui pourraient avoir les données souhaitées. Alors,ERDDAP™fera 2 appels à Cassandra, un pour chaque combinaison des touches de partition. (C'est ce dont Cassandra a besoin.) De toute évidence, il est gênant qu'un grand ensemble de données ait un grand nombre de combinaisons des clés de partition et qu'une requête donnée ne réduise pas considérablement cela. Vous pouvez exiger que chaque demande réduise l'espace clé en définissant [&lt;maxRequestFraction&gt;] (#maxrequestfraction) . Ici, 2/10000=2e-4, ce qui est inférieur au maximumRequestFraction (0,1) , donc la demande a été acceptée.
* Après avoir appliqué les contraintes sur les touches de partition,[colonnes cluster](#clustercolumnsourcenames)et[colonnes index](#indexcolumnsourcenames)qui ont été envoyés parERDDAP™, Cassandra a retourné 1200 lignes de données àERDDAP™dans le ResultSet.
* Le résultat L'ensemble doit avoir eu[données Type= *certains types* Liste](#cassandra-datatypes)colonnes (avec une moyenne de 10 articles par liste) Parce queERDDAP™a élargi les 1200 lignes de Cassandra en 12000 lignes enERDDAP.
*   ERDDAP™applique toujours toutes les contraintes de l'utilisateur aux données de Cassandra. Dans ce cas, les contraintes que Cassandra n'avait pas traitées ont réduit le nombre de lignes à 7405. C'est le nombre de lignes envoyées à l'utilisateur.

L'utilisation la plus importante de ces messages diagnostiques est de s'assurer queERDDAP™fait ce que vous croyez faire. Si ce n'est pas le cas (Par exemple, ne diminue-t-il pas le nombre de combinaisons distinctes comme prévu?) , alors vous pouvez utiliser les informations pour essayer de comprendre ce qui se passe mal.
 
* Recherche et expérimentation pour trouver et mieux placer [&lt;connectionPropriété&gt;] (#cassandra-connectionpropriété) Celui-ci.
 
* Vérifiez la vitesse de la connexion réseau entre Cassandra etERDDAP. Si la connexion est lente, voyez si vous pouvez l'améliorer. La meilleure situation est quandERDDAP™fonctionne sur un serveur attaché à la même (rapide) changez comme le serveur exécutant le nœud Cassandra auquel vous vous connectez.
 
* Soyez patient. Lisez attentivement l'information ici et dans la documentation Cassandra. Expérience. Vérifiez votre travail. Si la Cassandra...ERDDAP™la connexion est encore plus lente que vous ne vous attendez, veuillez inclure le schéma de votre table CassandraERDDAP™une partie dedatasets.xmlet de voir notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).
 
* Si tout le reste échoue,
envisager de stocker les données dans une collection deNetCDFv3.ncfichiers (en particulier.ncfichiers qui utilisent les[FC Géométries d'échantillonnage discrètes (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Structures de données d'array contigües et peut être manipulé avecERDDAP's[EDDTableFromNcCFFiles](#eddtablefromnccffiles)) . S'ils sont organisés logiquement (avec des données pour un morceau d'espace et de temps) ,ERDDAP™peut extraire les données très rapidement.
         
#### EDDTableFromCassandra squelette XML{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDapSéquence{#eddtablefromdapsequence} 
[ **EDDTableFromDapSéquence** ](#eddtablefromdapsequence)gère les variables dans les séquences de 1 et 2 niveaux de[DAP](https://www.opendap.org/)serveurs tels queDAPPAR (était à https://www.pmel.noaa.gov/epic/software/dapper/ , maintenant arrêté) .

* Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez ensuite modifier cela pour l'ajuster. Vous pouvez recueillir les informations dont vous avez besoin en regardant les fichiers DDS et DAS de la source dans votre navigateur (en ajoutant .das et .dds ausourceUrl(un exemple était https://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds ) .
    
* Une variable estDAPséquence si la réponse .dds indique que la structure de données contenant la variable est une "séquence" (insensible au cas) .
* Dans certains cas, vous verrez une séquence à l'intérieur d'une séquence, une séquence à deux niveaux -- EDDTableFromDapSequence les gère aussi.
#### EDDTableFromDapSquelette de séquence XML{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDatabase{#eddtablefromdatabase} 
[ **EDDTableFromDatabase** ](#eddtablefromdatabase)gère les données d'une table de base de données relationnelle ou[vue](https://en.wikipedia.org/wiki/View_(database)) .

#### Une table ou une vue{#one-table-or-view} 
Si les données que vous voulez servir sont dans deux ou plusieurs tableaux (et a donc besoin d'un JOIN pour extraire les données des deux tableaux à la fois) , tu dois en faire une[dénormalisé](https://en.wikipedia.org/wiki/Denormalization)  (déjà rejoint) tableau ou tableau[vue](https://en.wikipedia.org/wiki/View_(SQL)) avec toutes les données que vous souhaitez mettre à disposition sous forme d'un ensemble de donnéesERDDAP.

Pour les grandes bases de données complexes, il peut être judicieux de séparer plusieurs morceaux comme des tableaux dénormalisés, chacun avec un type différent de données, qui deviendront des ensembles de données séparés dansERDDAP.

Fabrication d'une table dénormaliséeERDDAP™Ça peut vous sembler une idée folle. Faites-nous confiance. Il existe plusieurs raisons pour lesquellesERDDAP™fonctionne avec des tableaux dénormalisés:

* C'est beaucoup plus facile pour les utilisateurs.
QuandERDDAP™présente l'ensemble de données comme une seule table, simple, dénormalisée, il est très facile pour quiconque de comprendre les données. La plupart des utilisateurs n'ont jamais entendu parler de tables normalisées, et très peu comprennent les clés, les clés étrangères ou les jointures de table, et ils ne connaissent presque certainement pas les détails des différents types de jointures, ou comment spécifier le SQL pour faire une jointure (ou plusieurs jointures) correctement. L'utilisation d'une table dénormalisée évite tous ces problèmes. Cette seule raison justifie l'utilisation d'un tableau unique dénormalisé pour la présentation d'un ensemble de donnéesERDDAP™utilisateurs.
     
* Tableaux normalisés (plusieurs tableaux liés par colonnes clés) sont parfaits pour stocker les données dans une base de données.
Mais même dans SQL, le résultat qui est retourné à l'utilisateur est un dénormalisé (rejoint) une seule table. Il semble donc raisonnable de présenter l'ensemble de données aux utilisateurs comme une table unique, dénormalisée et énorme à partir de laquelle ils peuvent alors demander des sous-ensembles (Par exemple, montrez-moi les rangées de la table où la température&gt; 30) .
     
* Vous pouvez faire des changements pourERDDAP™sans changer vos tables.
    ERDDAP™a quelques exigences qui peuvent être différentes de la façon dont vous avez configuré votre base de données.
Par exemple,ERDDAP™exige que les données d'horodatage soient stockées dans les champs 'timestamp with timezone'.
En faisant une table/vue séparée pourERDDAP™, vous pouvez faire ces changements lorsque vous faites la table dénormalisée pourERDDAP. Ainsi, vous n'avez pas à apporter de modifications à vos tableaux.
     
*   ERDDAP™recréera une partie de la structure des tableaux normalisés.
Vous pouvez spécifier quelles colonnes de données proviennent des tables 'outer' et donc avoir un nombre limité de valeurs distinctes.ERDDAP™rassemblera toutes les différentes combinaisons de valeurs dans ces colonnes et les présentera aux utilisateurs sur une spéciale . sous-ensemble de page Web qui aide les utilisateurs à sélectionner rapidement des sous-ensembles de données. Les valeurs distinctes pour chaque colonne sont également affichées dans les listes déroulantes sur les autres pages Web de l'ensemble de données.
     
* Une table dénormalisée fait la remise des données de vous à laERDDAPadministrateur facile.
Vous êtes l'expert pour cet ensemble de données, donc il est logique que vous preniez les décisions concernant les tables et les colonnes à rejoindre et comment les rejoindre. Donc tu n'as pas à nous donner (ou pire, les utilisateurs finaux) plusieurs tableaux et instructions détaillées pour les rejoindre, il vous suffit de nous donner accès à la table dénormalisée.
     
* Une table dénormalisée permet un accès efficace aux données.
La forme dénormalisée est généralement plus rapide à accéder que la forme normalisée. Les jointures peuvent être lentes. Plusieurs jointures peuvent être très lentes.
     

Pour obtenir les données de deux ou plusieurs tableaux dans la base de donnéesERDDAP™, il y a trois options:
 

* Option recommandée :
Vous pouvez créer un fichier comma- ou tab-séparé-valeur avec les données de la table dénormalisée.
Si l'ensemble de données est énorme, alors il est logique de créer plusieurs fichiers, chacun avec un sous-ensemble cohérent de la table dénormalisée (par exemple, les données provenant d'une plage de temps plus petite) .
    
Le grand avantage ici est queERDDAP™sera en mesure de traiter les demandes de données des utilisateurs sans aucun effort supplémentaire par votre base de données. AlorsERDDAP™ne sera pas un fardeau sur votre base de données ou un risque de sécurité. C'est la meilleure option dans presque toutes les circonstances carERDDAP™peuvent généralement obtenir des données à partir de fichiers plus rapidement que d'une base de données (si nous convertissons les fichiers .csv en.ncFichiers CF) . (Une partie de la raison est queERDDAP+files est un système en lecture seule et n'a pas à faire face à des changements tout en fournissant[ACIDE](https://en.wikipedia.org/wiki/ACID)  (Atomicité, cohérence, isolement, durabilité) .) En outre, vous n'aurez probablement pas besoin d'un serveur séparé puisque nous pouvons stocker les données sur l'un de nos RAID et y accéder avec unERDDAP™sur un serveur existant.
    
* Ok option:
Vous avez installé une nouvelle base de données sur un ordinateur différent avec juste la table dénormalisée.
Puisque cette base de données peut être une base de données libre et open source comme MariaDB, MySQL et PostgreSQL, cette option n'a pas besoin de coûter beaucoup.
    
Le grand avantage ici est queERDDAP™sera en mesure de traiter les demandes de données des utilisateurs sans aucun effort supplémentaire par votre base de données actuelle. AlorsERDDAP™Ce ne sera pas un fardeau pour votre base de données actuelle. Cela élimine également beaucoup de problèmes de sécurité depuisERDDAP™n'aura pas accès à votre base de données actuelle.
    
* Option décourageante :
Nous pouvons nous connecterERDDAP™à votre base de données actuelle.
Pour ce faire, vous devez :
    
    * Créer une table ou une vue séparée avec la table de données dénormalisée.
    * Créer un utilisateur "erddap" qui a accès en lecture seule à la table dénormalisée (s) .
         
    
C'est une option si les données changent très fréquemment et que vous voulez donnerERDDAP™accès instantané des utilisateurs à ces modifications; cependant, même ainsi, il peut être logique d'utiliser l'option de fichier ci-dessus et périodiquement (Toutes les 30 minutes ?) remplacer le fichier qui contient les données d'aujourd'hui.
Les énormes inconvénients de cette approche sont queERDDAP™les demandes d'utilisateurs imposeront probablement un fardeau insupportable à votre base de donnéesERDDAP™connexion est un risque de sécurité (Bien que nous puissions minimiser / gérer le risque) .

Faire la table ou la vue dénormalisée pourERDDAP™est une bonne occasion de faire quelques changementsERDDAP™besoins, d'une manière qui n'affecte pas vos tables originales:

* Modifier la date et les champs/colonnes d'horodatage pour utiliser le type de données que Postgres appelle[horodatage avec fuseau horaire](#database-date-time-data)  (ou l'équivalent dans votre base de données) .
Les Timestamps sans fuseau horaire ne fonctionnent pas correctement dansERDDAP.
* Faites des index pour les colonnes que les utilisateurs cherchent souvent.
* Soyez très conscient de[le cas des noms de champs/colonnes](#quotes-for-names-and-case-sensitivity)  (par exemple, utiliser tous les minuscules) quand vous les tapez.
* N'utilisez pas de mots réservés pour la table et pour les noms de champs/colonnes.

Si vous avez besoin d'aide pour rendre la table ou la vue dénormalisée, veuillez contacter votre administrateur de base de données.
Si vous voulez parler de toute cette approche ou de stratégie comment le faire le mieux, veuillez envoyer un courriel à Chris. John à noaa.gov .
    
#### base de données dansdatasets.xml {#database-in-datasetsxml} 
Il est difficile de créer le correctdatasets.xmlles informations nécessaires pourERDDAP™établir une connexion à la base de données. Soyez patient. Soyez méthodique.
* Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez ensuite modifier cela pour l'ajuster.
        
Générer des ensembles de données Xml a trois options spéciales pour EDDTableFromDatabase:
1. Si vous entrez "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (sans les citations) Pour le nom du catalogue, le programme affichera une liste des noms du catalogue.
2. Si vous entrez "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (sans les citations) pour le nom du schéma, le programme affichera une liste des noms du schéma.
3. Si vous entrez "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (sans les citations) pour le nom de la table, le programme affichera une liste de tables et de leurs colonnes. La première entrée "&#33;&#33;&#33;LIST&#33;&#33;&#33;" que vous faites est celle qui sera utilisée.
* Lisez attentivement toutes les informations de ce document sur EDDTableFromDatabase.
* Vous pouvez recueillir la plupart des informations dont vous avez besoin pour créer le XML pour un ensemble de données EDDTableFromDatabase en contactant l'administrateur de la base de données et en cherchant sur le Web.
* Bien que les bases de données traitent souvent les noms de colonnes et les noms de tables de façon insensible aux cas, elles sont sensibles aux cas.ERDDAP. Donc si un message d'erreur de la base de données indique qu'un nom de colonne est inconnu (Par exemple, "Identificateur inconnu= ' *nom de la colonne* "") même si vous savez qu'il existe, essayez d'utiliser toutes les capitales, par exemple, *_NAME* , qui est souvent la vraie version sensible à la casse du nom de la colonne.
* Travailler en étroite collaboration avec l'administrateur de la base de données, qui peut avoir une expérience pertinente. Si l'ensemble de données ne se charge pas, lisez la[message d'erreur](#troubleshooting-tips)soigneusement pour savoir pourquoi.
         
#### Pilote JDBC{#jdbc-driver} 
* [Conducteur et&lt;Nom du conducteur&gt;] (#jdbc-pilote) -- Vous devez obtenir le fichier JDBC 3 ou JDBC 4.
Mettez-le dans *Tomcat* /webapps/erddap/WEB-INF/lib après l'installationERDDAP. Alors, dans votredatasets.xmlpour cet ensemble de données, vous devez spécifier&lt;driverName&gt; pour ce pilote, qui est (Malheureusement) différent du nom du fichier. Recherche sur le web pour le pilote JDBC pour votre base de données et le piloteName quiJavadoit l'utiliser.
    
    * Pour MariaDB, essayez[ https://mariadb.com/kb/en/about-the-mariadb-java-client/ ](https://mariadb.com/kb/en/about-the-mariadb-java-client/)  
Les&lt;nom du conducteur&gt; à utiliser dansdatasets.xml  (voir ci-dessous) est probablement org.mariadb.jdbc. Chauffeur.
    * Pour MySQL et Amazon RDS, essayez[ https://dev.mysql.com/downloads/connector/j/ ](https://dev.mysql.com/downloads/connector/j/)  
Les&lt;nom du conducteur&gt; à utiliser dansdatasets.xml  (voir ci-dessous) est probablement com.mysql.jdbc. Chauffeur.
    * PourOracle, essayez[ https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html ](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html).
Les&lt;nom du conducteur&gt; à utiliser dansdatasets.xml  (voir ci-dessous) est probablement oracle.jdbc.driver.OracleChauffeur.
    * Pour Postgresql, nous avons obtenu le pilote JDBC 4[ https://mvnrepository.com/artifact/org.postgresql/postgresql ](https://mvnrepository.com/artifact/org.postgresql/postgresql)  
Les&lt;nom du conducteur&gt; à utiliser dansdatasets.xml  (voir ci-dessous) est probablement org.postgresql. Chauffeur.
    * Pour SQL Server, vous pouvez obtenir le pilote JTDS JDBC[ https://jtds.sourceforge.net ](https://jtds.sourceforge.net).
Les&lt;nom du conducteur&gt; à utiliser dansdatasets.xml  (voir ci-dessous) est probablement net.sourceforge.jtds.jdbc. Chauffeur.
    
Après avoir mis le pilote JDBC .jar dansERDDAP™répertoire lib, vous devez ajouter une référence à ce fichier .jar dans les fichiers de script .bat et/ou .sh pour GenerateDatasets Xml, DasDds et ArchiveADataset qui sont dans le *Tomcat* /webapps/erddap/WEB-INF/ répertoire; sinon, vous obtiendrez un ClassNotFoundException lorsque vous lancez ces scripts.
    
Malheureusement, le JDBC est parfois la source de problèmes. Dans son rôle d'intermédiaire entreERDDAP™et la base de données, elle apporte parfois des modifications subtiles à la requête SQL standard/génériqueERDDAP™crée des problèmes, (par exemple, en relation avec[identificateurs des majuscules et des minuscules](#quotes-for-names-and-case-sensitivity)et liés à[fuseaux horaires date/heure](#database-date-time-data)) . Soyez patient, lisez attentivement les informations ici, vérifiez votre travail et consultez notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).
    
#### Base de données&lt;connexion Biens immobiliers;{#database-connectionproperty} 
* [&lt;connectionPropriété&gt;] (#propriété de connexion de base de données) -- Dansdatasets.xmlpour votre jeu de données, vous devez définir plusieurs connexions Marques à indiquerERDDAP™comment se connecter à votre base de données (par exemple, pour spécifier le nom d'utilisateur, mot de passe, connexion ssl, et[taille de récupération](#set-the-fetch-size)) . Elles sont différentes pour chaque situation et sont un peu difficiles à comprendre. Recherchez sur le Web des exemples d'utilisation d'un pilote JDBC pour vous connecter à votre base de données. Les&lt;connectionProperty&gt; noms (Par exemple, "utilisateur", "mot de passe" et "ssl") , et certaines des valeurs de connectionProperty peuvent être trouvées en cherchant sur le web les propriétés de connexion "JDBC *base de données Type* " (par exemple,Oracle, MySQL, Amazon RDS, MariaDB, PostgreSQL) .
     
#### Citations pour les noms et la sensibilité des cas{#quotes-for-names-and-case-sensitivity} 
*   [Citations pour les noms de champ/colonne; sensibilité des cas](#quotes-for-names-and-case-sensitivity)- Par défaut, EDDTableFromDatabase met des guillemets doubles standard ANSI-SQL autour des noms de champs/colonnes dans les instructions SELECT au cas où vous auriez utilisé un mot réservé comme nom de champs/colonnes, ou un caractère spécial dans un nom de champs/colonnes. Les guillemets doubles empêchent également certains types d'attaques d'injection SQL. Vous pouvez le direERDDAP™pour utiliser ", ', ou pas de citations via&lt;colonneNomQuotes&gt; endatasets.xmlpour cet ensemble de données.
    
Pour de nombreuses bases de données, l'utilisation de n'importe quel type de guillemets fait travailler la base de données avec les noms de champs/colonnes de manière sensible au cas par cas (au lieu du cas de base de données par défaut insensible) . Les bases de données affichent souvent les noms de fichiers/colonnes comme tous les majuscules, alors qu'en réalité la forme sensible est différente. EnERDDAP™, veuillez toujours traiter les noms de colonnes de base de données comme sensibles aux cas.
    
    * Pour Maria DB, vous devez lancer la base de données avec[\\--sql-mode=ANSI\\_QUOTES](https://mariadb.com/kb/en/mysql-command-line-client/).
    * Pour MySQL et Amazon RDS, vous devez lancer la base de données avec[\\--sql-mode=ANSI\\_QUOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes).
    *   Oracleprend en charge les offres doubles standard ANSI-SQL[par défaut](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223).
    * PostgreSQLTM prend en charge les guillemets doubles standard ANSI-SQL par défaut.
    
      
N'utilisez pas un mot réservé pour une base de données, un catalogue, un schéma ou un nom de table.ERDDAP™ne met pas de citations autour d'eux.
    
Si possible, utilisez tous les minuscules pour la base de données, catalogue, schéma, noms de table et noms de champ lors de la création de la table de base de données (ou vue) et lors de la référence aux noms de champ/colonne dansdatasets.xmlenERDDAP. Sinon, vous pouvez obtenir un message d'erreur indiquant que la base de données, le catalogue, le schéma, la table et/ou le champ n'ont pas été trouvés. Si vous obtenez ce message d'erreur, essayez d'utiliser la version sensible aux cas, la version en majuscules et la version en minuscules du nom dansERDDAP. L'un d'eux peut travailler. Dans le cas contraire, vous devez changer le nom de la base de données, du catalogue, du schéma et/ou de la table en minuscules.
    
#### Base de données&lt;données Type &gt;{#database-datatype} 
*   [Base de données](#database-datatype)[&lt;type de données&gt;] (#type de données) Étiquettes -- Parce qu'il y a une ambiguïté sur laquelle[types de données de base de données](https://www.w3schools.com/sql/sql_datatypes_general.asp)carte à laquelleERDDAP™types de données, vous devez spécifier un [&lt;type de données&gt;] (#type de données) étiquette pour chaque [&lt;dataVariable&gt;] (#donnéesvariables) à direERDDAP™quel type de données utiliser. Une partie du problème est que différents ensembles de données utilisent des termes différents pour les différents types de données -- donc toujours essayer de correspondre aux définitions, pas seulement les noms. Voir la description[standardERDDAP™données Types](#data-types), qui inclut des références aux types de données SQL correspondants.[Date et heure](#database-date-time-data)sont des cas particuliers: utilisationERDDAP's données doubles Type.
     
#### Données sur la date de la base de données{#database-date-time-data} 
Certaines colonnes de date de la base de données n'ont pas de fuseau horaire explicite. Ces colonnes sont un problème pourERDDAP. Les bases de données supportent le concept de date (avec ou sans temps) sans fuseau horaire, comme une plage approximative de temps. MaisJava  (et ainsiERDDAP) Il ne s'agit que de dates et d'heures instantanées avec un fuseau horaire. Donc, vous savez peut-être que la date est basée sur un fuseau horaire local (avec ou sans heure d'été) ou le GMT/Zulufuseau horaire, maisJava  (etERDDAP) Arrête. On pensait pouvoir régler ce problème. (Par exemple, en précisant un fuseau horaire pour la colonne) , mais la base de données+JDBC+JavaLes interactions en ont fait une solution peu fiable.
* Alors,ERDDAP™exige que vous stockiez toutes les données date et date dans la table de base de données avec un type de données de base de données correspondant au type JDBC "timestamp with time zone" (idéalement, qui utilise le GMT/Zulufuseau horaire) .
* EnERDDAP'sdatasets.xml, dans&lt;dataVariable&gt; tag pour une variable d'horodatage, set
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

et en&lt;addAttributes&gt; ensemble
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Suggestion : Si les données sont une plage de temps, il est utile de faire référence aux valeurs de l'horodatage au centre de la plage de temps implicite (Par exemple, midi) . Par exemple, si un utilisateur a des données pour 2010-03-26T13:00Z d'un autre ensemble de données et qu'il veut les données les plus proches d'un ensemble de données de base de données qui a des données pour chaque jour, alors les données de base de données pour 2010-03-26T12:00Z (représentant les données pour cette date) est évidemment le meilleur (par rapport au minuit avant ou après, où il est moins évident qui est le mieux) .
*   ERDDAP™a une utilité pour[Convertir un numérique Temps de départ/vers une chaîne](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Voir[CommentERDDAPTraitement du temps](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
       
#### Entier nuls{#integer-nulls-1} 
Les bases de données supportent nulls en entier (int, petitint, minusculeint) colonnes, maisERDDAP™ne supporte pas les vrais nuls.
Les nulls de base de données seront convertis dansERDDAP™127 pour les colonnes à octets, 255 pour les colonnes uoctets, 32767 pour les colonnes courtes, 65535 pour les colonnes ucourtes, 2147483647 pour les colonnes int, 4294967295 pour les colonnes uint, 9,223,372,036,854,775,807 pour les colonnes longues, ou 18446744073709551615 pour les colonnes ulong. Si vous utilisez ces valeurs par défaut, veuillez les identifiermissing\\_values pour les utilisateurs de l'ensembleERDDAP™avec

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

ou

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

Sinon, vous pouvez utiliser le "missing\\_value"attribut au lieu de "\\_FillValue".
Générer des ensembles de données Xml ajoute automatiquement ces attributs \\_FillValue lorsqu'il génère les attributs suggérésdatasets.xmlpour les ensembles de données de base de données.

Pour les colonnes flottantes de la base de données, les nulls se convertissent en NaNs dansERDDAP.
Pour les types de données de base de données qui sont convertis en chaînes dansERDDAP™Les nuls se convertissent en cordes vides.
    
#### Sécurité des bases de données{#database-security} 
* Lorsque vous travaillez avec des bases de données, vous devez faire les choses en toute sécurité et en toute sécurité afin d'éviter de permettre à un utilisateur malveillant d'endommager votre base de données ou d'accéder à des données auxquelles il ne devrait pas avoir accès.ERDDAP™essaie de faire les choses de manière sûre, aussi.
    * Envisager de reproduire, sur un ordinateur différent, la base de données et les tables de base de données avec les données que vous voulezERDDAP™pour servir. (Oui, pour les bases de données commerciales commeOracle, cela implique des frais de licence supplémentaires. Mais pour les bases de données open source, comme PostgreSQL, MySQL, Amazon RDS et MariaDB, cela ne coûte rien.) Cela vous donne un haut niveau de sécurité et empêche égalementERDDAP™demande de ralentir la base de données originale.
    * Nous vous encourageons à créerERDDAP™pour se connecter à la base de données en tant qu'utilisateur de la base de données qui n'a accès qu'à **pertinent** base de données (s) et a seulement les privilèges de LIRE.
    * Nous vous encourageons à mettre en place la connexion deERDDAP™à la base de données pour qu'elle
        * utilise toujours SSL,
        * permet uniquement les connexions à partir d'une seule adresse IP (ou un bloc d'adresses) et de celuiERDDAP™utilisateur, et
        * ne transfère que les mots de passe dans leur formulaire de hachage MD5.
    *   \\[PROBLÈME SAVOIR\\]Les propriétés de connexion (y compris le mot de passe&#33;) sont stockés en texte simple dansdatasets.xml. Nous n'avons pas trouvé le moyen de permettre à l'administrateur d'entrer le mot de passe de la base de données pendantERDDAPLa startup à Tomcat (qui se produit sans entrée utilisateur) , donc le mot de passe doit être accessible dans un fichier. Pour le rendre plus sûr :
        * Toi (desERDDAP™administrateur) devrait être le propriétaire dedatasets.xmlet avoir accès à LIRE et ÉCRIRE.
        * Créez un groupe qui comprend seulement user=tomcat. Utilisez chgrp pour faire que le groupe pourdatasets.xml, avec juste les privilèges de LIRE.
        * Utiliser chmod pour attribuer des privilèges o-rwx (aucun accès LIRE ou WRITE pour les "autres" utilisateurs) pourdatasets.xml.
    * LorsqueERDDAP™, le mot de passe et les autres propriétés de connexion sont stockés dans "privé"Javavariables.
    * Les demandes des clients sont analysées et vérifiées pour la validité avant de générer les requêtes SQL pour la base de données.
    * Les demandes à la base de données sont faites avec SQL PreparedStatements, pour empêcher[Injection SQL](https://en.wikipedia.org/wiki/SQL_injection).
    * Les demandes à la base de données sont soumises avec exécution Demande (non exécutéÉtat) limiter les demandes en lecture seule (Donc la tentative d'injection SQL pour modifier la base de données échouera pour cette raison, aussi) .
         
#### SQL{#sql} 
* Parce queOPeNDAPLes requêtes de données tabulaires ont été conçues pour imiter les requêtes de données tabulaires SQL, il est facile pourERDDAP™pour convertir les requêtes de données tabulaires en simples SQL PreparedStements. Par exemple,ERDDAP™demande
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
sera converti en SQL PreparedStatement
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
ERDDAP™requêtes avec &distinct () et/ou &orderBy ( *variables* ) ajoutera DISTINCT et/ou ORDER PAR *variables* à l'instruction SQL préparée. En général, cela ralentira considérablement la réponse de la base de données.
ERDDAP™l'état préparé dans[Log.txt](/docs/server-admin/additional-information#log)comme
```
    statement=*thePreparedStatement*  
```
Il s'agit d'une représentation textuelle de l'État préparé, qui peut être légèrement différente de l'État préparé proprement dit. Par exemple, dans l'Étatpréparé, les temps sont codés de manière spéciale. Mais dans la représentation du texte, ils apparaissent comme date ISO 8601 heures.
     
#### Vitesse de la base de données{#database-speed} 
* Les bases de données peuvent être lentes. Il y a des choses que vous pouvez faire :
    * En général -
La nature de SQL est que les requêtes sont[déclaration](https://en.wikipedia.org/wiki/Declarative_programming). Ils précisent simplement ce que l'utilisateur veut. Ils n'incluent pas de spécification ou de conseils pour la façon dont la requête doit être traitée ou optimisée. Donc il n'y a aucun moyen pourERDDAP™pour générer la requête de telle manière qu'elle aide la base de données à optimiser la requête (ou de quelque manière que ce soit spécifie comment la requête doit être traitée) . En général, c'est à l'administrateur de la base de données de configurer les choses (par exemple, index) pour optimiser pour certains types de requêtes.
##### Définir la taille de la prise{#set-the-fetch-size} 
Les bases de données renvoient les données àERDDAP™en morceaux. Par défaut, différentes bases de données renvoient un nombre différent de lignes dans les morceaux. Souvent ce nombre est très petit et très inefficace. Par exemple, par défaut pourOracle10 ans &#33; Lire la documentation JDBC pour le pilote JDBC de votre base de données pour trouver la propriété de connexion à définir afin d'augmenter cette, et ajouter ceci à la description de l'ensemble de données dansdatasets.xml. Par exemple,
Pour MySQL et Amazon RDS, utilisez
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
Pour MariaDB, il n'y a actuellement aucun moyen de changer la taille de la récupération. Mais c'est une fonctionnalité demandée, alors recherchez le web pour voir si cela a été implémenté.
PourOracle, utiliser
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
Pour PostgreSQLTM, utiliser
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
Mais n'hésitez pas à changer de numéro. Définir le nombre trop grand causeraERDDAP™utiliser beaucoup de mémoire et être plus susceptible de manquer de mémoire.
#### Propriétés de connexion{#connectionproperties} 
Chaque base de données a d'autres propriétés de connexion qui peuvent être spécifiées dansdatasets.xml. Un grand nombre de ces facteurs influeront sur la performance de la base de données.ERDDAP™connexion. Veuillez lire la documentation du pilote JDBC de votre base de données pour voir les options. Si vous trouvez des propriétés de connexion qui sont utiles, veuillez envoyer un email avec les détails àerd dot data at noaa dot gov.
* Faire une table --
Vous obtiendrez probablement des réponses plus rapides si vous (Tous les jours ? chaque fois qu'il y a de nouvelles données?) générer un tableau réel (similaire à la façon dont vous avez généré le VIEW) et direERDDAP™pour obtenir les données du tableau au lieu de la VUE. Comme toute demande à la table peut alors être satisfaite sans JOINing une autre table, la réponse sera beaucoup plus rapide.
* Aspirer le tableau -
MySQL et Amazon RDS réagiront beaucoup plus rapidement si vous utilisez[TABLEAU D'OPTIMISATION](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html).
Le Président DB répondra beaucoup plus rapidement si vous utilisez[TABLEAU D'OPTIMISATION](https://mariadb.com/kb/en/optimize-table/).
PostgreSQL répond beaucoup plus rapidement si vous[VACUUM](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html)la table.
    Oraclen'a pas ou besoin d'une commande analogue.
* Marque[Indices](https://en.wikipedia.org/wiki/Database_index)pour les variables fréquemment contraintes --
Vous pouvez accélérer de nombreuses / la plupart des requêtes en créant des index dans la base de données pour les variables (quelles bases de données appellent "colonnes") qui sont souvent limitées dans la requête de l'utilisateur. En général, ce sont les mêmes variables spécifiées par [&lt;subsetVariables&gt;] (#sous-setvariables) et/ou les variables de latitude, de longitude et de temps.
##### Utiliser le pooling de connexion{#use-connection-pooling} 
Normalement,ERDDAP™effectue une connexion séparée à la base de données pour chaque requête. C'est l'approche la plus fiable. L'alternative la plus rapide est d'utiliser une DataSource qui supporte la mise en commun des connexions. Pour le configurer, spécifiez (par exemple)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
juste à côté de&lt;sourceUrl&gt;,&lt;nom du conducteur&gt;, et&lt;connexion Propriété.
Et dans *Tomcat* /conf/context.xml, définir une ressource avec les mêmes informations, par exemple,
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
L'information générale sur l'utilisation d'une source de données est[ https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html ](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html).
Voir[Tomcat DataSource information](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources)et[Exemple de Tomcat DataSource](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html)ou recherchez sur le Web des exemples d'utilisation de DataSources avec d'autres serveurs d'applications.
* Si tout le reste échoue,
envisager de stocker les données dans une collection deNetCDFv3.ncfichiers (en particulier.ncfichiers qui utilisent les[FC Géométries d'échantillonnage discrètes (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Structures de données d'array contigües et peut être manipulé avecERDDAP's[EDDTableFromNcCFFiles](#eddtablefromnccffiles)) . S'ils sont organisés logiquement (avec des données pour un morceau d'espace et de temps) ,ERDDAP™peut extraire les données très rapidement.
         
#### EDDTableFromDatabase squelette XML{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Tableau EDD deEDDGrid {#eddtablefromeddgrid} 
[ **Tableau EDD deEDDGrid** ](#eddtablefromeddgrid)vous permet de créer un ensemble de données EDDTable à partir de n'importe quelEDDGridensemble de données.

* Voici quelques-unes des raisons courantes à cela :
    * Cela permet d'interroger l'ensemble de données avecOPeNDAPcontraintes de sélection, qui est un type de "requête par valeur" (qu'un utilisateur peut avoir demandé) .
    * L'ensemble de données est intrinsèquement un ensemble de données tabulaires.
* La valeur de l'attribut global "maxAxis0" (généralement de type "int") , (la valeur par défaut est 10) sera utilisé pour limiter le nombre d'axes\\[0\\]  (généralement les"time"axe) valeurs des valeursEDDGridensembles de données accessibles par demande de données. Si vous ne voulez pas qu'il y ait de limite, spécifiez une valeur de 0. Ce paramètre est important car, sinon, il serait trop facile pour un utilisateur de demander EDDTableFromEDDGridpour examiner toutes les données de l'ensemble de données maillées. Cela prendrait du temps et échouerait presque certainement avec une erreur de temps. C'est le réglage qui rend sûr d'avoir EDDTableFromEDDGriddatasets dans votreERDDAPsans craindre qu'ils ne conduisent à une utilisation déraisonnable des ressources informatiques.
* Si laEDDGridest un[EDDGridDeErddap](#eddfromerddap)et lesERDDAP™est le mêmeERDDAP, puis EDDTable deEDDGridutilisera toujours la version actuellement disponible de l'ensemble de données référencé directement. C'est un moyen très efficace pour EDDTableFromEDDGridpour accéder aux données maillées.
* Cette classe est [&lt;recharger Chaque NMinutes&gt;] (#recharger toutes les minutes) C'est ce qui compte. La pièce jointeEDDGrid's&lt;reloadEveryNminutes&gt; est ignoré.
* Si une valeur pour [&lt;mise à jour de EveryNMillis&gt;] (#mise à jour de tout le monde) est fourni pour cet ensemble de données, il est ignoré. La pièce jointeEDDGrid's&lt;mettre à jour EveryNMillis&gt; est ce qui compte.
*   [Générer des ensembles de donnéesXml](#generatedatasetsxml)a une option pour l'ensemble de données type=EDDTableFromEDDGridqui demande l'URL d'unERDDAP  (généralement la mêmeERDDAP)   (se terminant par "/erddap/") et une expression régulière. Générer des ensembles de données Xml générera alors le XML pour une table EDDFromEDDGridensemble de données pour chaque ensemble de données mailléesERDDAP™qui a unedatasetIDqui correspond à l'expression régulière (utiliser .\\* pour correspondre à tousdatasetIDs pour les ensembles de données maillés) .
    
Le morceau de XML généré par GenerateDatasetsXml pour chaque ensemble de données comprend:
    
    * AdatasetIDqui est laEDDGrid'sdatasetIDplus "\\_AsATable".
    * Un nouvel attribut global résumé qui est leEDDGrid's résumé plus un nouveau premier paragraphe décrivant ce qu'est cet ensemble de données.
    * Un nouveau titre attribut global qui est leEDDGridtitre plus ", (Tableau) ".
    * Un nouvel attribut global maxAxis0 avec une valeur de 10.
#### Tableau EDD deEDDGridsquelette XML{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFileNames{#eddtablefromfilenames} 
[ **EDDTableFromFileNames** ](#eddtablefromfilenames)crée un ensemble de données à partir d'informations sur un groupe de fichiers dans le système de fichiers du serveur, y compris une URL pour chaque fichier afin que les utilisateurs puissent télécharger les fichiers viaERDDAP's["files"système](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html). Contrairement à tous les[EDDTableFromFiles](#eddtablefromfiles)Sous-classes, ce type d'ensemble de données ne sert pas de données à partir des fichiers.

* EDDTableFromFileNames est utile lorsque:
    * Vous avez un groupe de fichiers que vous voulez distribuer en tant que fichiers entiers parce qu'ils ne contiennent pas de « données » de la même manière que les fichiers de données ordinaires ont des données. Par exemple, les fichiers d'image, les fichiers vidéo, les documents Word, les fichiers de tableur Excel, les fichiers de présentation PowerPoint ou les fichiers texte avec du texte non structuré.
    * Vous avez un groupe de fichiers qui ont des données dans un format quiERDDAP™Je ne sais pas encore lire. Par exemple, un format binaire spécifique au projet, personnalisé.
         
#### EDDTableFromFileNames Data{#eddtablefromfilenames-data} 
*   [Les données d'un ensemble de données EDDTableFromFileNames](#eddtablefromfilenames-data)est une table quiERDDAP™crée à la volée des informations sur un groupe de fichiers locaux. Dans la table, il y a une ligne pour chaque fichier. Quatre attributs spéciaux dans le[datasets.xmlpour cet ensemble de données](#eddtablefromfilenames-skeleton-xml)déterminer les fichiers qui seront inclus dans cet ensemble de données:
    
##### fichier Dir{#filedir} 
    *   &lt;FichierDir&gt; -- Ceci spécifie le répertoire source dans le système de fichiers du serveur avec les fichiers de cet ensemble de données. Les fichiers qui sont réellement situés dans le système de fichiers du serveur dans&lt;fileDir&gt; apparaîtra dans la colonne url de cet ensemble de données dans un répertoire virtuel nommé https://*serverUrl*/erddap/files/*datasetID/* .
Par exemple, sidatasetIDest jplMURSST,
et les&lt;fichierDir&gt; est /home/data/mur/ ,
et ce répertoire a un fichier nommé jplMURSST20150103000000.png,
puis l'URL qui sera affichée aux utilisateurs pour ce fichier sera
         https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png .
        
En plus d'utiliser un répertoire local pour&lt;fileDir&gt;, vous pouvez également spécifier l'URL d'une page Web distante, semblable à un répertoire. Cela fonctionne avec:
        
        * Ensembles de données non agrégés dans THREDS, p.ex.
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Ce serveur n'est plus disponible de façon fiable.\\]
        * Ensembles de données non agrégésHyrax, par exemple,
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * La plupart des répertoires comme Apache, par exemple,
            [ https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/ ](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/)
##### deOnTheFly{#fromonthefly} 
[\\*\\*\\*deOnTheFly](#fromonthefly)-- Pour quelques gros seaux S3 (comme noaa-goes17, qui a 26 millions de fichiers) , cela peut prendreERDDAP™jusqu'à 12 heures pour télécharger toutes les informations sur le contenu du seau (et puis il y a d'autres problèmes) . Pour contourner cela, il y a un moyen spécial d'utiliser&lt;fileDir&gt; dans EDDTableFromFileNames pour créer un jeu de données avec le répertoire et les noms de fichiers d'un seau AWS S3. Le jeu de données n'aura pas la liste de tous les répertoires et noms de fichiers du seau S3 qu'un utilisateur peut rechercher via des requêtes au jeu de données. Mais le dataset obtiendra les noms des répertoires et des fichiers à la volée si l'utilisateur traverse la hiérarchie du répertoire avec le dataset"files"option. Ainsi, cela permet aux utilisateurs de parcourir la hiérarchie de fichiers et les fichiers du seau S3 via les"files"système. Pour ce faire, au lieu de spécifier l'URL pour le seau S3 comme le "Répertoire de démarrage" (dans Générer des ensembles de données Xml) ou&lt;fichierDir&gt; (endatasets.xml) , utiliser:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
Par exemple:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
Voir la documentation pour[travailler avec S3 Buckets dansERDDAP™](#working-with-aws-s3-files), notamment la description du format spécifique qui doit être utilisé pour l'URL du seau S3. Et voir
[ces détails et un exemple](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket)de l'utilisation\\*\\*\\*deOnTheFly.
        
##### récursif{#recursive} 
*   &lt;récursif&gt; -- Fichiers dans les sous-répertoires de&lt;fichierDir&gt; avec les noms qui correspondent&lt;fichierRegex&gt; apparaîtra dans les mêmes sous-répertoires dans le"files"URL si&lt;recursive&gt; est prêt à vrai. La valeur par défaut est fausse.
* [&lt;pathRegex&gt;] (#pathregex) -- Si récursive=true, seuls les noms de répertoires qui correspondent au cheminRegex (par défaut) sera accepté. Si récursive=false, cela est ignoré. Cela est rarement utilisé, mais peut être très utile dans des circonstances inhabituelles. (Voir ceci[documentation régex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)et[tutoriel regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
##### fichierRegex{#fileregex} 
*   &lt;fichierRegex&gt; -- Seulement les noms de fichiers où le nom de fichier entier (non compris le nom du répertoire) correspondent à la&lt;fileRegex&gt; sera inclus dans cet ensemble de données. Par exemple, jplMURSST. &#123;14&#125;\\.png . (Voir ceci[documentation régex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)et[tutoriel regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
         
##### À partir de Noms de fichiers Table des matières{#from-file-names-data-table-contents} 
Dans le tableau, il y aura des colonnes avec:
* - Oui. L'URL que les utilisateurs peuvent utiliser pour télécharger le fichier viaERDDAP's["files"système](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
* Nom -- Le nom du fichier (sans nom de répertoire) .
* Dernière modification... La dernière modification du fichier (stocké en double avec"seconds since 1970-01-01T00:00:00Z") . Cette variable est utile car les utilisateurs peuvent voir si/quand le contenu d'un fichier donné a changé en dernier. Cette variable est[heure Variable du timbre](#timestamp-variables), donc les données peuvent apparaître comme valeurs numériques (secondes depuis 1970-01-01T00:00:00Z) ou une valeur de chaîne (ISO 8601:2004 (E) format) , selon la situation.
* taille -- La taille du fichier en octets, stocké en doubles. Ils sont stockés en double parce que certains fichiers peuvent être plus grands que les ints le permettent et les longs ne sont pas pris en charge dans certains types de fichiers de réponse. Doubles donnera la taille exacte, même pour de très grands fichiers.
* colonnes supplémentaires définies par leERDDAP™administrateur avec des informations extraites du nom du fichier (par exemple, le temps associé aux données dans le fichier) basé sur deux attributs que vous spécifiez dans les métadonnées pour chaque colonne supplémentaire/dataVariable:
    
    * ExtraitRegex -- C'est une[expression régulière](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutoriel](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) . L'ensemble du regex doit correspondre à l'ensemble du nom du fichier (non compris le nom du répertoire) . Le régex doit comprendre au moins un groupe de capture (une partie d'une expression régulière qui est jointe par parenthèses) quiERDDAP™utilise pour déterminer quelle section du nom de fichier extraire pour devenir des données.
    * extrait Groupe -- C'est le numéro du groupe de capture (#1 est le premier groupe de capture) dans l'expression régulière. La valeur par défaut est 1. Un groupe de capture est une section d'une expression régulière qui est entourée de parenthèses.
    
Voici deux exemples :
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
Dans le cas de la variable de temps, si un fichier a le nom jplMURSST20150103000000.png, l'extraitRegex correspondra au nom du fichier, extrairea les caractères qui correspondent au premier groupe de capture («20150103000000») comme dataType=String, puis utiliser le[unités adaptées aux temps de cordes](#string-time-units)pour analyser les chaînes en valeurs de données temporelles (Date de naissance: 2015-01-03T00:00:00Z) .

Dans le cas de la variable jour, si un fichier a le nom jplMURSST20150103000000.png, l'extraitRegex correspondra au nom du fichier, extrairea les caractères qui correspondent au premier groupe de capture ("03") comme [&lt;type de données&gt;] (#type de données) \\=int, donnant une valeur de données de 3.
        
#### Autres informations{#other-information} 
* Non [&lt;mise à jour de EveryNMillis&gt;] (#mise à jour de tout le monde) -- Ce type de jeu de données n'a pas besoin et ne peut pas utiliser le&lt;mettre à jour chaque balise NMillis&gt; parce que les informations fournies par EDDTableFromFileNames sont toujours parfaitement à jour parce queERDDAP™interroge le système de fichiers afin de répondre à chaque demande de données. Même s'il y a un grand nombre de dossiers, cette approche devrait fonctionner raisonnablement bien. Une réponse peut être lente s'il y a un grand nombre de fichiers et que l'ensemble de données n'a pas été interrogé depuis un moment. Mais pendant plusieurs minutes, le système d'exploitation garde l'information dans un cache, de sorte que les réponses doivent être très rapides.
     
* Vous pouvez utiliser le[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire ledatasets.xmlmorceaux pour ce type de jeu de données. Vous pouvez ajouter/définir des colonnes supplémentaires avec des informations extraites du nom de fichier, comme indiqué ci-dessus.
     
#### EDDTableFromFileNames squelette XML{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFiles{#eddtablefromfiles} 
[ **EDDTableFromFiles** ](#eddtablefromfiles)est la superclasse de toutes les classes EDDTableFrom...Files. Vous ne pouvez pas utiliser EDDTableFromFiles directement. Utilisez plutôt une sous-classe de EDDTableFromFiles pour gérer le type de fichier spécifique:

*   [EDDTableFromAsciiFiles](#eddtablefromasciifiles)agrége les données des fichiers de données ASCII tabulaires séparés par des virgules, des onglets, des point-virgules ou des espaces.
*   [EDDTableFromAudioFiles](#eddfromaudiofiles)regroupe les données d'un groupe de fichiers audio locaux.
*   [Tableau EDD de Fichiers AwsXml](#eddtablefromawsxmlfiles)agrégats de données d'un ensemble de Station météorologique automatique (AWS) Fichiers XML.
*   [EDDTableDeColumnarAsciiFiles](#eddtablefromcolumnarasciifiles)regroupe les données des fichiers de données ASCII tabulaires avec des colonnes de données à largeur fixe.
*   [Tableau EDD deHyraxFichiers](#eddtablefromhyraxfiles)  (DÉPREUVE) données agrégées avec plusieurs variables, chacune avec des dimensions partagées (par exemple, temps, altitude (ou profondeur) , latitude, longitude) , et servi par un[Hyrax OPeNDAPserveur](https://www.opendap.org/software/hyrax-data-server).
*   [EDDTableFromInvalidCRAFiles](#eddtablefrominvalidcrafiles)données agrégéesNetCDF  (v3 ou v4)  .ncfichiers qui utilisent une variante spécifique, non valide, du DSG Contiguous Array (ARC) fichiers. Bien queERDDAP™prend en charge ce type de fichier, c'est un type de fichier invalide que personne ne devrait commencer à utiliser. Les groupes qui utilisent actuellement ce type de fichier sont fortement encouragés à utiliserERDDAP™pour générer des fichiers valides de l'ARC DSG des FC et cesser d'utiliser ces fichiers.
*   [Tableau EDD deJsonlCSVFiles](#eddtablefromjsonlcsvfiles)données agrégées[JSON Fichiers CSV de lignes](https://jsonlines.org/examples/).
*   [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)données agrégéesNetCDF  (v3 ou v4)  .nc  (ou[.ncml](#ncml-files)) fichiers avec plusieurs variables, chacune avec des dimensions partagées (par exemple, temps, altitude (ou profondeur) , latitude, longitude) .
*   [EDDTableFromNcFiles](#eddtablefromncfiles)données agrégéesNetCDF  (v3 ou v4)  .nc  (ou[.ncml](#ncml-files)) fichiers avec plusieurs variables, chacune avec des dimensions partagées (par exemple, temps, altitude (ou profondeur) , latitude, longitude) . Il est bon de continuer à utiliser ce type d'ensemble de données pour les ensembles de données existants, mais pour les nouveaux ensembles de données, nous recommandons plutôt d'utiliser EDDTableFromMultidimNcFiles.
*   [EDDTableFromNcCFFiles](#eddtablefromnccffiles)données agrégéesNetCDF  (v3 ou v4)  .nc  (ou[.ncml](#ncml-files)) fichiers qui utilisent un des formats de fichiers spécifiés par le[FC Géométries d'échantillonnage discrètes (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Convention. Mais pour les fichiers utilisant une des variantes multidimensionnelles CF DSG, utiliser[EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)à la place.
*   [EDDTableFromNccsvFiles](#eddtablefromnccsvfiles)données agrégées[NCCSV](/docs/user/nccsv-1.00)Fichiers ASCII .csv.
*   [EDDTableFromParquetFiles](#eddtablefromparquetfiles)gère les données de[Parquet](https://parquet.apache.org/).
*   [EDDTableFromThreddsFiles](#eddtablefromthreddsfiles)  (DÉPREUVE) agrégats données de fichiers avec plusieurs variables avec dimensions partagées desservies par un[THÉRÈDESOPeNDAPserveur](https://www.unidata.ucar.edu/software/tds/).
*   [Tableau EDD deWFSFichiers](#eddtablefromwfsfiles)  (DÉPREUVE) fait une copie locale de toutes les données d'unArcGISCarteServeurWFSpour que les données puissent ensuite être ré-servées rapidement àERDDAP™utilisateurs.

Actuellement, aucun autre type de fichier n'est supporté. Mais il est généralement relativement facile d'ajouter une prise en charge pour d'autres types de fichiers. Contactez-nous si vous avez une demande. Ou, si vos données sont dans un ancien format de fichier que vous voudriez déménager, nous vous recommandons de convertir les fichiers pour êtreNetCDFv3.ncfichiers (et en particulier.ncfichiers avec les[FC Géométries d'échantillonnage discrètes (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Structure des données de l ' array à contigües --ERDDAP™peut extraire les données très rapidement) .NetCDFest un format binaire largement pris en charge, permet un accès aléatoire rapide aux données, et est déjà supporté parERDDAP.

#### FromFiles Détails{#fromfiles-details} 
Les renseignements suivants s'appliquent à toutes les sous-classes d'EDDTableFromFiles.
##### Agrégation{#aggregation} 
Cette classe regroupe les données des fichiers locaux. Chaque fichier contient un (relativement) petit tableau de données.
    * L'ensemble de données résultant apparaît comme si tous les tableaux du fichier avaient été combinés (toutes les lignes de données du fichier #1, plus toutes les lignes du fichier #2, ...) .
    * Les fichiers ne doivent pas tous avoir toutes les variables spécifiées. Si un fichier donné n'a pas de variable spécifiée,ERDDAP™ajoutera les valeurs manquantes au besoin.
    * Les variables de tous les fichiers DOIVENT avoir les mêmes valeurs pour le[add\\_offset](#scale_factor),[missing\\_value](#missing_value),[_Remplir Valeur](#missing_value),[scale\\_factor](#scale_factor)et[unités](#units)attributs (le cas échéant) .ERDDAP™contrôle, mais c'est un test imparfait -- s'il y a des valeurs différentes,ERDDAPne sait pas qui est correct et donc quels fichiers sont invalides. Si c'est un problème, vous pouvez utiliser[NcML](#ncml-files)ou[NCO](#netcdf-operators-nco)pour résoudre le problème.
         
##### Fichiers compressés{#compressed-files} 
Les fichiers de données sources pour toutes les sous-classes EDDTableFromFiles peuvent être compressés externement (Par exemple,.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2ou Z) . Voir[Documentation des fichiers compressés externement](#externally-compressed-files).
     
##### Information sur le fichier caché{#cached-file-information-1} 
* Lorsqu'un ensemble de données EDDTableFromFiles est chargé pour la première fois, EDDTableFromFiles lit les informations de tous les fichiers pertinents et crée des tables (une ligne pour chaque fichier) avec des informations sur chaque fichier valide et chaque "mauvais" (différent ou invalide) fichier.
    * Les tables sont également stockées sur le disque, commeNetCDFv3.ncfichiers dans *BigParent Directory* /ensemble de données/ *last2CharsOfDatasetID* / *datasetID* / dans les fichiers nommés :
Tableau.nc  (qui contient une liste de noms de répertoires uniques) ,
fichier Tableau.nc  (qui tient le tableau avec les informations de chaque fichier valide) ,
badFiles.nc  (qui tient la table avec les informations de chaque mauvais fichier) .
    * Pour accélérer l'accès à un jeu de données EDDTableFromFiles (mais au détriment d'utiliser plus de mémoire) , vous pouvez utiliser
[&lt;fichierTableInMemory&gt;true&lt;/fileTableInMemory&gt;] (#mémorie de la table de fichier)   
à direERDDAP™conserver une copie des tableaux d'information du fichier en mémoire.
    * La copie des tables d'information du fichier sur le disque est également utile lorsqueERDDAP™est arrêté et redémarré: il enregistre EDDTable FromFiles de devoir relire tous les fichiers de données.
    * Lorsqu'un ensemble de données est rechargé,ERDDAP™Il suffit de lire les données dans de nouveaux fichiers et fichiers qui ont changé.
    * Si un fichier a une structure différente des autres fichiers (Par exemple, un type de données différent pour une des variables, ou une valeur différente pour la variable "[unités](#units)" attribut) ,ERDDAPajoute le fichier à la liste des « mauvais » fichiers. Les informations sur le problème avec le fichier seront écrites au *BigParent Directory* fichier /logs/log.txt.
    * Vous ne devriez jamais avoir besoin de supprimer ou de travailler avec ces fichiers. Une exception est : si vous apportez toujours des modifications à un ensemble de donnéesdatasets.xmlconfiguration, vous pouvez vouloir supprimer ces fichiers pour forcerERDDAP™pour relire tous les fichiers puisque les fichiers seront lus/interprétés différemment. Si jamais vous devez supprimer ces fichiers, vous pouvez le faire lorsqueERDDAP™est en train de courir. (Alors définissez un[drapeau](/docs/server-admin/additional-information#set-dataset-flag)pour recharger l'ensemble de données dès que possible.) Toutefois,ERDDAP™En général, on remarque quedatasets.xmlles informations ne correspondent pas au fichier Table d'informations et supprime automatiquement les tables de fichiers.
    * Si vous voulez encouragerERDDAP™pour mettre à jour les données stockées (par exemple, si vous venez d'ajouter, de supprimer ou de modifier certains fichiers dans le répertoire de données de l'ensemble de données) , utilisez le[Système de drapeau](/docs/server-admin/additional-information#flag)ForcerERDDAP™mettre à jour les informations du fichier mis en cache.
         
##### Traitement des demandes{#handling-requests-1} 
*   ERDDAP™Les requêtes de données tabulaires peuvent imposer des contraintes à n'importe quelle variable.
    * Lorsque la demande de données d'un client est traitée, EDDTableFromFiles peut rapidement regarder dans la table avec les informations de fichier valides pour voir quels fichiers pourraient avoir des données pertinentes. Par exemple, si chaque fichier source possède les données d'une bouée de localisation fixe, EDDTableFromFiles peut très efficacement déterminer quels fichiers pourraient avoir des données dans une plage de longitude et de latitude donnée.
    * Comme la table d'information de fichier valide inclut la valeur minimale et maximale de chaque variable pour chaque fichier valide, EDDTableFromFiles peut souvent gérer d'autres requêtes très efficacement. Par exemple, si certaines bouées n'ont pas de capteur de pression d'air et si un client demande des données pour airPression&#33;=NaN, EDDTableFromFiles peut déterminer efficacement quelles bouées ont des données de pression d'air.
         
##### Mise à jour de l'information sur le fichier Cached{#updating-the-cached-file-information-1} 
Chaque fois que l'ensemble de données est rechargé, les informations du fichier mis en cache sont mises à jour.
    
* L'ensemble de données est rechargé périodiquement comme déterminé par la&lt;recharger chaque NMinutes&gt; dans les informations de l'ensemble de donnéesdatasets.xml.
* L'ensemble de données est rechargé dès que possibleERDDAP™détecte que vous avez ajouté, supprimé,[toucher](https://en.wikipedia.org/wiki/Touch_(Unix)) (pour changer le dernier fichier Heure modifiée) , ou a changé un fichier de données.
* L'ensemble de données est rechargé dès que possible si vous utilisez le[Système de drapeau](/docs/server-admin/additional-information#flag).

Lorsque l'ensemble de données est rechargé,ERDDAP™compare les fichiers actuellement disponibles à la table d'information des fichiers en cache. Les nouveaux fichiers sont lus et ajoutés à la table des fichiers valides. Les fichiers qui n'existent plus sont supprimés de la table des fichiers valides. Les fichiers où l'horodatage a changé sont lus et leurs informations sont mises à jour. Les nouvelles tables remplacent les anciennes tables en mémoire et sur disque.
     
##### Mauvais fichiers{#bad-files-1} 
La table des mauvais fichiers et les raisons pour lesquelles les fichiers ont été déclarés mauvais (fichier corrompu, variables manquantes, valeurs d'axe incorrectes, etc.) est envoyé par courriel à l'email Tout Adresse électronique (probablement toi) chaque fois que l'ensemble de données est rechargé. Vous devez remplacer ou réparer ces fichiers dès que possible.
     
##### Variables manquantes{#missing-variables-1} 
Si certains fichiers n'ont pas certains desdataVariables définis dans l'ensemble de donnéesdatasets.xmlC'est bon. Lorsque EDDTableFromFiles lit un de ces fichiers, il agira comme si le fichier avait la variable, mais avec toutes les valeurs manquantes.
     
##### Données en temps quasi réel{#near-real-time-data} 
* EDDTableFromFiles traite les demandes de données très récentes comme un cas particulier. Le problème: Si les fichiers composant l'ensemble de données sont mis à jour fréquemment, il est probable que l'ensemble de données ne sera pas mis à jour chaque fois qu'un fichier est modifié. Donc EDDTableFromFiles ne sera pas au courant des fichiers modifiés. (Vous pourriez utiliser le[Système de drapeau](/docs/server-admin/additional-information#flag), mais cela pourrait conduire àERDDAP™recharger l'ensemble de données presque continuellement. Dans la plupart des cas, nous ne le recommandons pas.) Au lieu de cela, EDDTableFromFiles traite avec le système suivant: QuandERDDAP™obtient une demande de données dans les 20 dernières heures (par exemple, il y a 8 heures jusqu'à maintenant) ,ERDDAP™recherchera tous les fichiers qui ont des données dans les 20 dernières heures. Ainsi,ERDDAP™n'a pas besoin d'avoir des données parfaitement à jour pour tous les fichiers afin de trouver les dernières données. Tu devrais encore mettre [&lt;recharger Chaque NMinutes&gt;] (#recharger toutes les minutes) à une valeur raisonnablement faible (par exemple, 60) , mais il n'a pas besoin d'être minuscule (par exemple, 3) .
     
    *    **Non recommandé** organisation des données en temps quasi réel dans les fichiers: Si, par exemple, vous avez un ensemble de données qui stocke des données pour de nombreuses stations (ou une bouée, ou une trajectoire, ...) pendant de nombreuses années, vous pourriez organiser les fichiers de sorte, par exemple, qu'il y ait un fichier par station. Mais alors, chaque fois que de nouvelles données pour une station arrivent, vous devez lire un grand vieux fichier et écrire un grand nouveau fichier. Et quandERDDAP™recharge l'ensemble de données, il remarque que certains fichiers ont été modifiés, donc il lit ces fichiers complètement. C'est inefficace.
         
    *    **Recommandation** organisation des données en temps quasi réel dans les fichiers: Entreposez les données en morceaux, par exemple, toutes les données pour une station/bouée/trajectoire pendant un an (ou un mois) . Puis, quand un nouveau datum arrive, seulement le fichier avec cette année (ou mois) les données sont affectées.
        
        * Meilleur : UtilisationNetCDFv3.ncfichiers avec une dimension illimitée (heure) . Ensuite, pour ajouter de nouvelles données, vous pouvez simplement ajouter les nouvelles données sans avoir à lire et réécrire le fichier entier. Le changement est effectué très efficacement et essentiellement atomiquement, de sorte que le fichier n'est jamais dans un état incohérent.
        * Sinon: Si vous ne pouvez pas utiliser.ncfichiers avec une dimension illimitée (heure) , alors, lorsque vous devez ajouter de nouvelles données, vous devez lire et réécrire le fichier entier affecté (J'espère qu'il est petit parce qu'il a juste un an (ou mois) Valeur des données) . Heureusement, tous les dossiers des années précédentes (ou mois) pour cette station restent inchangés.
        
Dans les deux cas, lorsqueERDDAP™recharge l'ensemble de données, la plupart des fichiers sont inchangés; seulement quelques petits fichiers ont changé et doivent être lus.
         
##### Répertoires{#directories-1} 
Les fichiers peuvent être dans un répertoire, ou dans un répertoire et ses sous-répertoires (récursivement) . S'il y a un grand nombre de fichiers (par exemple, &gt;1 000) , le système d'exploitation (et donc EDDTableFromFiles) fonctionnera beaucoup plus efficacement si vous stockez les fichiers dans une série de sous-répertoires (un par an, ou un par mois pour les ensembles de données avec des fichiers très fréquents) , de sorte qu'il n'y a jamais un grand nombre de fichiers dans un répertoire donné.
     
##### Répertoires distants et demandes de portée HTTP{#remote-directories-and-http-range-requests-1} 
*    **Répertoires distants et demandes de portée HTTP**   (AKA Byte Service, demandes de portée d'octets) --
    EDDGridDeNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles et EDDTableFromNcCFFiles, peuvent parfois servir des données de.ncfichiers sur les serveurs distants et accessibles via HTTP si le serveur prend en charge[Services d'octets](https://en.wikipedia.org/wiki/Byte_serving)via les requêtes de plage HTTP (le mécanisme HTTP pour le service par octet) . C'est possible parce que netcdf-java (quiERDDAP™utilise pour lire.ncfichiers) prend en charge la lecture des données à distance.ncfichiers via des requêtes de plage HTTP.
    
     **Ne fais pas ça &#33;**   
Utilisez plutôt le [&lt;cacheFromUrl&gt; système] (#cachefromurl) .
    
##### CacheFromUrl{#cachefromurl} 
* [ ** &lt;cacheFromUrl&gt; ** - Oui. (#cachefromurl) - Oui.
TousEDDGridFromFiles et tous les ensembles de données EDDTableFromFiles prennent en charge un ensemble de balises qui indiquentERDDAP™pour télécharger et maintenir une copie de tous les fichiers d'un ensemble de données distant, ou un cache de quelques fichiers (téléchargé au besoin) . **C'est une fonctionnalité incroyablement utile.** 
    * Les&lt;La balise cacheFromUrl&gt; vous permet de spécifier une URL avec une liste de fichiers d'un jeu de données distant à partir d'une liste de fichiers distants.
        
        * Ensembles de données non agrégés dans THREDS, p.ex.
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Ce serveur n'est plus disponible de façon fiable.\\]
        * Ensembles de données non agrégésHyrax, par exemple,
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * La plupart des répertoires comme Apache, par exemple,
            [ https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/ ](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/)
        * Seaux S3, p.ex.
            [ https://noaa-goes17.s3.us-east-1.amazonaws.com/ ](https://noaa-goes17.s3.us-east-1.amazonaws.com/)  
Cependant, cela peut nécessiter un compte AWS et plus de configuration.
Voir[travailler avec S3 Buckets dansERDDAP™](#working-with-aws-s3-files).
En outre, vous n'avez généralement pas besoin d'utiliser cache FromUrl avec des fichiers dans des seaux S3 si les fichiers sont des fichiers ASCII (Par exemple, .csv) Parce queERDDAP™peut lire efficacement les données du seau directement via un flux.
        
        ERDDAP™copie ou cache ces fichiers dans l'ensemble de données&lt;répertoire fileDir&gt;. Si vous avez besoin de support pour un autre type de liste de fichiers distants (Par exemple, FTP) , veuillez envoyer votre demande à Chris. John à noaa.gov .
        
        * La valeur par défaut pour&lt;la balise cacheFromUrl&gt; est null. Si vous ne spécifiez pas une valeur pour la&lt;cacheFromUrl&gt; tag, le système copie/cache ne sera pas utilisé pour cet ensemble de données.
        * Si l'ensemble de données est&lt;fichierRegex&gt; le réglage est autre chose que .\\*,ERDDAP™ne téléchargera que les fichiers qui correspondent au fichierRegex.
        * Si l'ensemble de données est&lt;le réglage recursive&gt; est vrai et les fichiers distants sont dans les sous-répertoires,ERDDAP™regardera dans les sous-répertoires distants qui correspondent à l'ensemble de données [&lt;pathRegex&gt;] (#pathregex) , créez la même structure de répertoire localement, et mettez les fichiers locaux dans les mêmes sous-répertoires.
        * Dans Générer des ensembles de données Xml, si vous spécifiez&lt;valeur cacheFromUrl&gt;, générer Données Xml va créer le local&lt;fichierDir&gt; répertoire et copie 1 fichier distant. Générer des ensembles de données Xml va alors générer ledatasets.xmlmorceau basé sur ce fichier exemple (Préciser l'échantillon Fichier=rien) .
        * Si la source de données est une télécommandeERDDAP™, utiliser[EDDGridDeErddap](#eddfromerddap)ou[EDDTableDeErddap](#eddfromerddap)au lieu de&lt;cacheFromUrl&gt;. Par ici, votre localERDDAP™Il semble que l'ensemble de données ait été créé, mais il n'est pas nécessaire de stocker les données localement. La seule raison d'utiliser&lt;cacheFromUrl&gt; pour obtenir des données d'une télécommandeERDDAP™est quand vous avez une autre raison pour laquelle vous voulez avoir une copie locale des fichiers de données. Dans ce cas:
            * Cet ensemble de données va essayer de s'abonner à l'ensemble de données sur la télécommandeERDDAPpour que les modifications de cet ensemble de données appellent le drapeau de cet ensemble de données Url, ce qui provoque le rechargement et le téléchargement des fichiers distants modifiés. Ainsi, l'ensemble de données locales sera mis à jour très rapidement après que des modifications ont été apportées à l'ensemble de données distant.
            * Vous devez envoyer un courriel à l'administrateur de la télécommandeERDDAP™de demanderdatasets.xmlpour l'ensemble de données distant afin que vous puissiez faire l'ensemble de données dans votre localERDDAP™ressemble à l'ensemble de données de la télécommandeERDDAP.
        * Si la source de données est une télécommandeERDDAP™, le dataset local essaiera de s'abonner au dataset distant.
            * Si l'abonnement réussit, chaque fois que la télécommandeERDDAPrecharge et dispose de nouvelles données, il contactera le flagURL pour cet ensemble de données, ce qui lui permettra de recharger et de télécharger les fichiers de données nouveaux et/ou modifiés.
            * Si l'abonnement échoue (pour quelque raison que ce soit) ou si vous voulez simplement vous assurer que l'ensemble de données local est à jour, vous pouvez configurer un[drapeau](/docs/server-admin/additional-information#flag)pour l'ensemble de données local, donc il va recharger, donc il va vérifier pour les fichiers de données nouveaux et/ou modifiés à distance.
        * Si la source de données n'est pas une télécommandeERDDAP: l'ensemble de données vérifie les fichiers distants nouveaux et/ou modifiés chaque fois qu'il se recharge. Normalement, cela est contrôlé par [&lt;recharger Chaque NMinutes&gt;] (#recharger toutes les minutes) . Mais si vous savez quand il y a de nouveaux fichiers distants, vous pouvez définir un[drapeau](/docs/server-admin/additional-information#flag)Pour l'ensemble de données local, il rechargera et vérifiera les fichiers de données nouveaux et/ou modifiés à distance. Si cela se produit régulièrement à un certain moment de la journée (Par exemple, à 7 heures) , vous pouvez faire un travail de cron à utilisercurlpour contacter le drapeau Url pour cet ensemble de données, donc il rechargera et vérifiera les fichiers de données nouveaux et/ou modifiés à distance.
    * Les&lt;l'étiquette cacheSizeGB&gt; spécifie la taille du cache local. Vous n'avez probablement besoin de l'utiliser que lorsque vous travaillez avec des systèmes de stockage en nuage comme[Amazone S3](https://aws.amazon.com/s3/)qui est un système de stockage couramment utilisé qui fait partie[Services Web Amazon (AWS) ](https://aws.amazon.com/). La valeur par défaut est -1.
        * Si la valeur est&lt;=0 (Par exemple, la valeur par défaut de -1) ,
            ERDDAP™téléchargera et maintiendra **copie complète** de tous les fichiers de l'ensemble de données distant dans l'ensemble de données&lt;fichierDir&gt;.
            * C'est le réglage qui est recommandé dans la mesure du possible.
            * Chaque fois que le jeu de données est rechargé, il compare les noms, les tailles et lastModified times des fichiers distants et des fichiers locaux, et télécharge tous les fichiers distants qui sont nouveaux ou ont changé.
            * Si un fichier qui était sur le serveur distant disparaît,ERDDAP™ne supprimera pas le fichier local correspondant (Sinon, si quelque chose ne va pas temporairement avec le serveur distant,ERDDAP™pourrait supprimer certains ou tous les fichiers locaux&#33;) .
            * Avec ce réglage, généralement vous allez définir&lt;mettre à jour EveryNMillis&gt; à -1, puisque l'ensemble de données est conscient du moment où il a copié de nouveaux fichiers de données en place.
        * Si la valeur est &gt;0,
            ERDDAP™téléchargera les fichiers à partir de l'ensemble de données distants au besoin dans un local **cache** (dans l'ensemble de données&lt;fichierDir&gt;) avec une taille seuil du nombre spécifié de GB.
            * Le cache doit être suffisamment grand pour contenir au moins plusieurs fichiers de données.
            * En général, plus le cache est grand, mieux c'est, parce que le prochain fichier de données demandé sera plus susceptible d'être déjà dans le cache.
            * La mise en cache ne doit être utilisée que lorsqueERDDAP™fonctionne dans un serveur de calcul en nuage (Par exemple, une instance de calcul AWS) et les fichiers distants dans un système de stockage en nuage (Par exemple, AWS S3) .
            * Lorsque l'espace disque utilisé par les fichiers locaux dépasse le cache SizeGB,ERDDAP™bientôt (Peut-être pas immédiatement) supprimer certains des fichiers mis en cache (actuellement, sur la base des (LRU) algorithme) jusqu'à ce que l'espace disque utilisé par les fichiers locaux soit&lt;0.75\\*cacheSizeGB (le "objectif") . Oui, il y a des cas où LRU effectue très mal -- il n'y a pas d'algorithme parfait.
            *   ERDDAP™ne va jamais essayer de supprimer un fichier cache quiERDDAP™a commencé à utiliser dans les 10 dernières secondes. Il s'agit d'un système imparfait pour traiter le système de cache et le système de lecteur de fichiers de données n'est que faiblement intégré. À cause de cette règle,ERDDAP™peut ne pas être en mesure de supprimer suffisamment de fichiers pour atteindre son objectif, auquel cas il va imprimer un AVERTISSEMENT dans le fichier log.txt, et le système va perdre beaucoup de temps à essayer de tailler le cache, et il est possible que la taille des fichiers dans le cache peut largement dépasser le cacheSizeGB. Si cela se produit, utilisez un paramètre cacheSizeGB plus grand pour cet ensemble de données.
            * Actuellement,ERDDAP™jamais vérifier si le serveur distant a une version plus récente d'un fichier qui se trouve dans le cache local. Si vous avez besoin de cette fonctionnalité, veuillez envoyer un courriel à Chris. John à noaa.gov .
        * Bien que l'utilisation des mêmes noms de balises puisse impliquer que le système de copie et le système de cache utilisent le même système sous-jacent, ce n'est pas correct.
            * Le système de copie démarre de manière proactive les tâches TaskThread pour télécharger des fichiers nouveaux et modifiés chaque fois que l'ensemble de données est rechargé. Seuls les fichiers qui ont été effectivement copiés dans le répertoire local sont disponibles via leERDDAP™ensemble de données.
            * Le système cache obtient la liste de fichiers distants chaque fois que l'ensemble de données est rechargé et prétend que tous ces fichiers sont disponibles via leERDDAP™ensemble de données. Fait intéressant, tous les fichiers distants apparaissent même dans les pages web /files/ de l'ensemble de données et peuvent être téléchargés. (Bien que peut-être seulement après un retard pendant que le fichier est d'abord téléchargé du serveur distant vers le cache local.) 
        * Les ensembles de données qui utilisent cacheSizeGB peuvent bénéficier d'une[nThreads](#nthreads)paramètre supérieur à 1, car cela permettra au jeu de données de télécharger plus d'un fichier distant à la fois.
    * Les&lt;cachePartialPathRegex&gt; tag est une balise rarement utilisée qui peut spécifier une alternative pour le jeu de données [&lt;pathRegex&gt;] (#pathregex) . La valeur par défaut est nulle.
        * Utilisez cela seulement si vous copiez l'ensemble des données via la valeur par défaut&lt;cacheSizeGB&gt; valeur de -1. avec&lt;cacheSizeGB&gt; valeurs de &gt;1, cela sera ignoré parce qu'il est non sensoriel.
        * Voir [la documentation pour&lt;pathRegex&gt;] (#pathregex) pour des conseils sur la façon de construire le régex.
        * Si cela est spécifié, il sera utilisé chaque fois que l'ensemble de données est rechargé, sauf la première fois qu'un ensemble de données est rechargé au début d'un mois.
        * Ceci est utile lorsque l'ensemble de données distant est stocké dans un labyrinthe de sous-répertoires et lorsque la grande majorité de ces fichiers changent rarement, voire jamais. (&lt;toux&gt; NASA&lt;toux&gt;) Vous pouvez, par exemple, spécifier&lt;cachePartialPathRegex&gt; qui correspond à l'année en cours ou au mois en cours. Ces regexes sont très difficiles à spécifier, parce que tous les noms de chemin partiel et complet doivent correspondre à la&lt;cachePartialPathRegex&gt; et parce que&lt;cachePartialPathRegex&gt; doit fonctionner avec les URL distantes et les répertoires locaux. Un exemple de vie réelle est:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
L'URL de l'échantillon ci-dessus contient des fichiers dans des sous-répertoires basés sur l'année (Par exemple, 2018) et jour de l ' année (Par exemple, 001, 002, ..., 365 ou 366) .
Noter que&lt;cachePartialPathRegex&gt; commence par .\\*,
a alors un sous-répertoire spécifique qui est commun aux URL distantes et aux répertoires locaux, par exemple /v4\\.1/
puis a une série de groupes de capture imbriqués où la première option n'est rien
et la deuxième option est une valeur spécifique.
            
L'exemple ci-dessus ne correspondra aux répertoires que pour les 10 jours de 2018, par exemple,
             https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[2020-10-21 Ce serveur n'est plus disponible de façon fiable.\\]  
et jour 011, 012, ..., 019.
             (Voir ceci[documentation régex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)et[tutoriel regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
Si vous avez besoin d'aide pour créer&lt;cachePartialPathRegex&gt;, veuillez envoyer le&lt;cacheDe Url à Chris. John à noaa.gov .
            
        * Une approche commune: Si vous voulez utiliser&lt;cachePartialPathRegex&gt;, ne l'utilisez pas initialement, car vous voulezERDDAP™pour télécharger tous les fichiers initialement. AprèsERDDAP™a téléchargé tous les fichiers, l'ajouter au groupe de données dedatasets.xml.
             
##### Des milliers de fichiers{#thousands-of-files} 
Si votre jeu de données a plusieurs milliers de fichiers,ERDDAP™peut être lente à répondre aux demandes de données de cet ensemble de données. Il y a deux questions :
 

1. Le nombre de fichiers par répertoire.
Sur le plan interne,ERDDAP™fonctionne à la même vitesse, que n fichiers soient dans un seul répertoire ou dispersés dans plusieurs répertoires.
     
Mais il y a un problème : Plus il y a de fichiers dans un répertoire donné, plus le système d'exploitation est lent à retourner la liste des fichiers dans le répertoire (par fichier) àERDDAP. Le temps de réponse pourrait être O (n log n) . Il est difficile de dire combien de fichiers dans un répertoire est trop, mais 10 000 est probablement trop. Donc, si votre configuration génère beaucoup de fichiers, une recommandation ici pourrait être: mettre les fichiers dans des sous-répertoires logiquement organisés (Par exemple, station ou station/année) .
    
Une autre raison d'utiliser des sous-répertoires : si un utilisateur veut utiliserERDDAP's"files"système pour trouver le nom du plus ancien fichier pour la station X, il est plus rapide et plus efficace si les fichiers sont dans les sous-répertoires station/année, parce que beaucoup moins d'information doit être transféré.
    
2. Le nombre total de fichiers.
Pour les ensembles de données tabulaires,ERDDAP™conserve la plage de valeurs de chaque variable dans chaque fichier. Lorsqu'un utilisateur fait une demande,ERDDAP™doit lire toutes les données de tous les fichiers qui pourraient avoir des données correspondant à la demande de l'utilisateur. Si l'utilisateur demande des données à partir d'un temps limité (Par exemple, un jour ou un mois) AlorsERDDAP™n'aura pas à ouvrir trop de fichiers dans votre jeu de données. Mais il y a des cas extrêmes où presque chaque fichier pourrait avoir des données correspondantes (Par exemple, quand eauTempérature=13.2C) . Depuis qu'il fautERDDAP™un peu de temps (en partie le temps de recherche sur le disque dur, en partie le temps de lire l'en-tête du fichier) juste pour ouvrir un fichier donné (et plus s'il y a beaucoup de fichiers dans le répertoire) , il y a une pénalité de temps importante si le nombre total de dossiersERDDAP™doit ouvrir est très grand. Même ouvrir 1000 fichiers prend beaucoup de temps. Il y a donc des avantages à consolider périodiquement les fichiers quotidiens en morceaux plus grands (Par exemple, 1 station pour 1 an) . Je comprends que vous pourriez ne pas vouloir faire cela pour diverses raisons, mais cela conduit à des réponses beaucoup plus rapides. Dans les cas extrêmes (Par exemple, je traite avec un ensemble de données GTSPP qui a ~35 millions de fichiers sources) , servir les données d'un grand nombre de fichiers sources est impossible parce queERDDAPLa réponse aux requêtes simples peut prendre des heures et utiliser des tonnes de mémoire. En regroupant les fichiers sources en un nombre plus petit (pour GTSPP, j'ai maintenant 720, 2 par mois) ,ERDDAP™peut réagir raisonnablement rapidement. Voir[Des millions de fichiers](#millions-of-files)  
     

N.B. Solid State Drives sont formidables &#33; Le moyen le plus rapide, le plus facile, le moins cher d'aiderERDDAP™traiter avec un grand nombre de (petite) fichiers est d'utiliser un lecteur d'état solide. Voir[Solid State Drives sont super &#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
##### Des millions de fichiers{#millions-of-files} 
* Certains ensembles de données contiennent des millions de fichiers sources.ERDDAP™peut gérer cela, mais avec des résultats mitigés.
    
    * Pour les demandes qui concernent uniquement des variables énumérées dans [&lt;subsetVariables&gt;] (#sous-setvariables) ,ERDDAP™a toutes les informations nécessaires déjà extraites des fichiers de données et stockées dans un seul fichier, de sorte qu'il peut répondre très, très rapidement.
    * Pour les autres demandes,ERDDAP™peut scanner les données[informations de fichier cache](#cached-file-information)et de comprendre que seulement quelques-uns des fichiers pourraient avoir des données qui sont pertinentes pour la demande et donc répondre rapidement.
    * Mais pour d'autres demandes (Par exemple, eauTempérature=18 degré\\_C) lorsque tout fichier peut avoir des données pertinentes,ERDDAP™doit ouvrir un grand nombre de fichiers pour voir si chacun des fichiers contient des données pertinentes à la demande. Les fichiers sont ouverts séquentiellement. Sur tout système d'exploitation et tout système de fichiers (autres que les entraînements à l'état solide) , ça prend beaucoup de temps (doncERDDAP™répond lentement) et relie vraiment le système de fichiers (doncERDDAP™répond lentement à d'autres demandes) .
    
Heureusement, il y a une solution.
    
    1. Configurer l'ensemble de données sur un non-publicERDDAP™  (Votre ordinateur personnel ?) .
    2. Créer et exécuter un script qui demande une série de.ncFichiers CF, chacun avec une grande partie de l'ensemble de données, généralement une période (par exemple, toutes les données pour un mois donné) . Choisissez la période de temps pour que tous les fichiers résultants soient inférieurs à 2 Go (mais espérons-le supérieur à 1 Go) . Si le jeu de données a des données en temps quasi réel, exécutez le script pour régénérer le fichier pour la période de temps en cours (Par exemple, ce mois-ci) fréquemment (toutes les 10 minutes ? Toutes les heures ?) . Demandes deERDDAP™pour.ncLes fichiers CF créent unNetCDFv3.ncfichier qui utilise le[FC Géométries d'échantillonnage discrètes (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Structures de données d'arraisonnement contagieux).
    3. Configurer un[EDDTableFromNcCFFiles](#eddtablefromnccffiles)dataset sur votre publicERDDAP™qui obtient des données de la.nc (FC) fichiers.ERDDAP™peut extraire les données de ces fichiers très rapidement. Et comme il y a maintenant des dizaines ou des centaines (au lieu de millions) des fichiers, même siERDDAP™doit ouvrir tous les fichiers, il peut le faire rapidement.
    
Oui, ce système prend du temps et des efforts pour se mettre en place, mais il fonctionne très, très bien. La plupart des demandes de données peuvent être traitées 100 fois plus rapidement qu'auparavant.
    \\[Bob savait que c'était une possibilité, mais c'est Kevin O'Brien qui l'a fait pour la première fois et qui a montré que ça marche bien. Maintenant, Bob utilise ceci pour l'ensemble de données GTSPP qui a environ 18 millions de fichiers sources et quiERDDAP™dessert maintenant par environ 500.nc (FC) fichiers.\\]
    
N.B. Solid State Drives sont formidables &#33; Le moyen le plus rapide, le plus facile, le moins cher d'aiderERDDAP™traiter avec un grand nombre de (petite) fichiers est d'utiliser un lecteur d'état solide. Voir[Solid State Drives sont super &#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
    
##### Fichiers énormes{#huge-files} 
* Un seul énorme fichier de données (fichiers de données ASCII particulièrement énormes) peut causer un ÉrreurOutOfMemory. Si c'est le problème, il devrait être évident parce queERDDAP™ne pas charger l'ensemble de données. La solution, si possible, est de diviser le fichier en plusieurs fichiers. Idéalement, vous pouvez diviser le fichier en morceaux logiques. Par exemple, si le fichier a une valeur de 20 mois de données, le diviser en 20 fichiers, chacun avec une valeur de 1 mois de données. Mais il y a des avantages même si le fichier principal est séparé arbitrairement. Cette approche présente de multiples avantages : a) Cela réduira la mémoire nécessaire pour lire les fichiers de données à 1/20ème, car un seul fichier est lu à la fois. b) Souvent,ERDDAP™peut traiter les demandes beaucoup plus rapidement parce qu'il n'a qu'à regarder dans un ou quelques fichiers pour trouver les données pour une demande donnée. c) Si la collecte de données est en cours, alors les 20 fichiers existants peuvent rester inchangés, et vous devez seulement modifier un, petit, nouveau fichier pour ajouter la valeur de données du mois suivant à l'ensemble de données.
     
##### FTP Trouble/Conseil{#ftp-troubleadvice-1} 
* Si vous FTP nouveaux fichiers de donnéesERDDAP™serveur pendantERDDAP™est en cours, il y a la chance queERDDAP™va recharger l'ensemble de données pendant le processus FTP. Cela arrive plus souvent que vous ne le pensez &#33; Si cela se produit, le fichier semble être valide (il a un nom valide) , mais le fichier n'est pas valide. SiERDDAP™tente de lire les données de ce fichier invalide, l'erreur résultante fera que le fichier sera ajouté à la table des fichiers invalides. Ce n'est pas bon. Pour éviter ce problème, utilisez un nom de fichier temporaire lorsque FTP utilise le fichier, par exemple, ABC2005.nc\\_TEMP . Ensuite, le test fileNameRegex (voir ci-dessous) indiquera qu'il ne s'agit pas d'un dossier pertinent. Une fois le processus FTP terminé, renommer le fichier au bon nom. Le processus de renommage fera en sorte que le fichier devient pertinent en un instant.
    
##### Extraits de nom de fichier{#file-name-extracts} 
\\[Cette fonctionnalité est DEPRECATED. Veuillez utiliser[\\*\\*\\*fichierNom pseudosourceName](#filename-sourcenames)à la place.\\]  
EDDTableFromFiles a un système pour extraire une chaîne de chaque nom de fichier et l'utiliser pour faire une variable pseudo de données. À l'heure actuelle, il n'existe aucun système permettant d'interpréter ces cordes comme des dates/heures. Il y a plusieurs balises XML pour configurer ce système. Si vous n'avez pas besoin d'une partie ou de la totalité de ce système, il suffit de ne pas spécifier ces balises ou d'utiliser des valeurs "".

* preExtractRegex est un[expression régulière](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutoriel](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) utilisé pour identifier le texte à supprimer depuis le début du nom de fichier. L'enlèvement ne se produit que si le régex est assorti. Cela commence généralement par "^" pour correspondre au début du nom du fichier.
* poste ExtractRegex est une expression régulière utilisée pour identifier le texte à supprimer de la fin du nom de fichier. L'enlèvement ne se produit que si le régex est assorti. Cela se termine généralement par "$" pour correspondre à la fin du nom de fichier.
* extraitRegex Si présent, cette expression régulière est utilisée après preExtractRegex et postExtractRegex pour identifier une chaîne à extraire du nom de fichier (Par exemple,stationID) . Si le regex n'est pas assorti, le nom complet du fichier est utilisé (moins préextrait et post Extrait) . Utilisez ".\\*" pour correspondre au nom de fichier entier qui reste après preExtractRegex et postExtractRegex.
* colonne NomForExtract est le nom de la source de la colonne de données pour les chaînes extraites. AdataVariableavec ceci[sourceName](#sourcename)doit être dans ledataVariables liste (avec n'importe quel type de données, mais généralement String) .

Par exemple, si un jeu de données a des fichiers avec des noms comme XYZABLE.nc, XYZBaker.nc, XYZCharlie.nc, ..., et vous voulez créer une nouvelle variable (stationID) quand chaque fichier est lu et qui aura des valeurs d'ID de station (Able, Baker, Charlie, ...) extrait des noms de fichiers, vous pouvez utiliser ces balises:

*   &lt;PréExtraitRegex&gt;^XYZ&lt;/préExtraitRegex&gt;
L'initiale ^ est une expression régulière de caractère particulier qui forceERDDAP™pour rechercher XYZ au début du nom du fichier. Cela fait supprimer XYZ, s'il est trouvé au début du nom de fichier, (par exemple, le nom de fichier XYZABLE.ncdevient Able.nc) .
*   &lt;AprèsExtractionRegex&gt;\\.nc$&lt;/postExtraitRegex&gt;
Le $ à la fin est un caractère spécial expression régulière qui forceERDDAP™à chercher.ncà la fin du nom du fichier. Depuis . est un caractère spécial expression régulière (correspondant à n'importe quel caractère) , il est encodé comme \\. ici (car 2E est le nombre de caractères hexadécimaux pour une période) . Cela provoque.nc, si trouvé à la fin du nom de fichier, à supprimer (par exemple, le nom de fichier partiel Doux.ncdevient Able) .
*   &lt;ExtraitRegex&gt;.\\*&lt;/extraitRegex&gt;
L'expression régulière .\\* correspond à tous les caractères restants (par exemple, le nom de fichier partiel Able devient l'extrait du premier fichier) .
*   &lt;colonneNameForExtract&gt;stationID&lt;/columnNameForExtract&gt;
Cela indiqueERDDAP™pour créer une nouvelle colonne source appeléestationIDlors de la lecture de chaque fichier. Chaque ligne de données pour un fichier donné aura le texte extrait de son nom de fichier (par exemple, Doux) comme la valeur destationIDcolonne.

Dans la plupart des cas, il existe de nombreuses valeurs pour ces étiquettes d'extrait qui donneront les mêmes résultats -- les expressions régulières sont très flexibles. Mais dans quelques cas, il n'y a qu'un moyen d'obtenir les résultats souhaités.
     
##### PseudosourceNames{#pseudo-sourcenames} 
Chaque variable dans chaque ensemble de donnéesERDDAP™a un [&lt;sourceName&gt;] (#Nom de la source) qui spécifie le nom de la source pour la variable. EDDTableFromFiles prend en charge quelques pseudosourceNames qui extrait une valeur d'un autre endroit (Par exemple, le nom du fichier ou la valeur d'un attribut global) et de promouvoir cette valeur comme une colonne de valeurs constantes pour ce segment de données (Par exemple, le tableau des données de ce fichier) . Pour ces variables, vous devez spécifier le type de données de la variable via le [&lt;type de données&gt;] (#type de données) étiquette. Si l'information extraite est une chaîne dateTime, vous spécifiez le format de la chaîne dateTime[attribut unités](#string-time-units). Le pseudosourceNameLes options sont les suivantes:
 
###### mondial :sourceNames{#global-sourcenames} 
Un attribut global de métadonnées dans chaque fichier de données source peut être promu pour être une colonne de données. Si une variable est&lt;sourceName&gt; a le format
```
        <sourceName>global:*attributeName*</sourceName>
```
alors quandERDDAP™lit les données d'un fichier,ERDDAP™cherchera un attribut global de ce nom (Par exemple, PI) et créer une colonne remplie de la valeur de l'attribut. Ceci est utile lorsque l'attribut a des valeurs différentes dans différents fichiers sources, car autrement, les utilisateurs ne verraient qu'une de ces valeurs pour l'ensemble des données. Par exemple,
```
        <sourceName>global:PI</sourceName>
```
Lorsque vous encouragez un attribut à être des données,ERDDAP™supprime l'attribut correspondant. Ceci est approprié parce que la valeur est probablement différente dans chaque fichier; alors que dans l'ensemble de données agrégées dansERDDAP™il n'aura qu'une seule valeur. Si vous voulez, vous pouvez ajouter une nouvelle valeur pour l'attribut pour l'ensemble des données en ajoutant&lt;Nom de l'entreprise *attribut Dénomination* "&gt; *nouveaux Valeur* &lt;/att&gt; à l'ensemble des données [&lt;addAttributes&gt;] (#Addattributs) . Pour les attributs mondiauxERDDAP™exige, par exemple, l'établissement, vous DEVEZ ajouter une nouvelle valeur pour l'attribut.
     
###### variable:sourceNames{#variable-sourcenames} 
L'attribut métadonnées d'une variable dans chaque fichier peut être promu pour être une colonne de données. Si une variable est&lt;[sourceName](#sourcename)\\&gt; a le format
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
alors quandERDDAP™lit les données d'un fichier,ERDDAP™recherche l'attribut spécifié (par exemple, ID) de la variable spécifiée (par exemple, instrument) et créer une colonne remplie de la valeur de l'attribut. La variable mère (par exemple, instrument) ne doit pas être l'un desdataVariables inclus dans la définition de l'ensemble de donnéesERDDAP. Par exemple,
```
        <sourceName>variable:instrument:ID</sourceName>
```
Ceci est utile lorsque l'attribut a des valeurs différentes dans différents fichiers sources, car autrement, les utilisateurs ne verraient qu'une de ces valeurs pour l'ensemble des données.

Lorsque vous encouragez un attribut à être des données,ERDDAP™supprime l'attribut correspondant. Ceci est approprié parce que la valeur est probablement différente dans chaque fichier; alors que dans l'ensemble de données agrégées dansERDDAP™il n'aura qu'une seule valeur. Si vous voulez, vous pouvez ajouter une nouvelle valeur pour l'attribut pour l'ensemble des données en ajoutant&lt;Nom de l'entreprise *attribut Dénomination* "&gt; *nouveaux Valeur* &lt;/att&gt; à la variable [&lt;addAttributes&gt;] (#Addattributs) . Pour les attributs quiERDDAP™demande, par exemple,ioos\\_category  (selon votre configuration) , vous DOIVENT ajouter une nouvelle valeur pour l'attribut.
        
###### Nom de fichiersourceNames{#filename-sourcenames} 
Vous pouvez extraire une partie du nom de fichier d'un fichier et le promouvoir pour être une colonne de données. Le format de ce pseudo [&lt;sourceName&gt;] (#Nom de la source) est
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
Par exemple,
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
Lorsque EDDTableFromFiles lit les données d'un fichier, il s'assurera que le nom du fichier (par exemple, A201807041442.slcpV1.nc) correspond à l'expression régulière spécifiée ("Régex") et extraire les (dans ce cas, la première) Groupe de capture (qui est une partie entourée de parenthèses) , par exemple, "201807041442". (Voir ceci[documentation régex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)et[tutoriel regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) Le regex peut être spécifié comme une chaîne avec ou sans guillemets environnants. Si le regex est spécifié comme une chaîne avec les guillemets environnants, la chaîne doit être[Chaîne de style JSON](https://www.json.org/json-en.html)  (avec des caractères spéciaux échappés avec des caractères \\) . Le numéro du groupe de capture est habituellement 1 (le premier groupe de capture) , mais peut être n'importe quel numéro.
     
###### Nom du cheminsourceNames{#pathname-sourcenames} 
Vous pouvez extraire une partie du chemin complet d'un fichier Dénomination (/répertoires/fileName.ext) et de promouvoir cela comme une colonne de données. Le format de ce pseudo [&lt;sourceName&gt;] (#Nom de la source) est
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
Par exemple,
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
Lorsque EDDTableFromFiles lit les données d'un fichier, il s'assure que le chemin complet Nom (Par exemple, /data/myDatasetID/BAY17/B201807041442.nc. Pour ce test, les séparateurs de répertoire seront toujours'/'Jamais ') correspond à l'expression régulière spécifiée ("Régex") et extraire les (dans ce cas, la première) Groupe de capture (qui est une partie entourée de parenthèses) , par exemple, "BAY17". (Voir ceci[documentation régex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)et[tutoriel regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) Le regex peut être spécifié comme une chaîne avec ou sans guillemets environnants. Si le regex est spécifié comme une chaîne avec les guillemets environnants, la chaîne doit être[Chaîne de style JSON](https://www.json.org/json-en.html)  (avec des caractères spéciaux échappés avec des caractères \\) . Le numéro du groupe de capture est habituellement 1 (le premier groupe de capture) , mais peut être n'importe quel numéro.
         
##### "0 fichiers" Message d'erreur{#0-files-error-message-2} 
* Si tu cours[Générer des ensembles de donnéesXml](#generatedatasetsxml)ou[DasDds](#dasdds), ou si vous essayez de charger un EDDTableDe... FichiersERDDAP™, et vous obtenez un message d'erreur "0 fichiers" indiquant queERDDAP™trouvé 0 fichiers correspondants dans le répertoire (lorsque vous pensez qu'il y a des fichiers correspondants dans ce répertoire) :
    * Vérifiez que les fichiers sont vraiment dans ce répertoire.
    * Vérifiez l'orthographe du nom du répertoire.
    * Vérifiez le fichierNameRegex. C'est vraiment, vraiment facile de faire des erreurs avec les régexes. Pour le test, essayez le regex .\\* qui doit correspondre à tous les noms de fichiers. (Voir ceci[documentation régex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)et[tutoriel regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Vérifiez que l'utilisateur qui exécute le programme (Par exemple, user=tomcat (?) pour Tomcat/ERDDAP) a la permission de lire ces fichiers.
    * Dans certains systèmes d'exploitation (par exemple, SELinux) et selon les paramètres du système, l'utilisateur qui a exécuté le programme doit avoir la permission de lire pour toute la chaîne de répertoires menant au répertoire qui possède les fichiers.
         
##### uniformiser Quoi ?{#standardizewhat} 
* Lorsqu'une sous-classe d'EDDTableFromFiles regroupe un ensemble de fichiers sources, pour une variable donnée, tous les fichiers sources DOIVENT avoir des valeurs d'attribut identiques pour plusieurs attributs:scale\\_factor,add\\_offset, \\_Non signé,missing\\_value, \\_FillValue et unités). Pensez-y: si un fichier a windSpeed units=knots et un autre a windSpeed units=m/s, alors les valeurs de données des deux fichiers ne devraient pas être incluses dans le même ensemble de données agrégées. Donc, lorsque EDDTableFromFiles crée d'abord l'ensemble de données, il lit les valeurs d'attribut d'un fichier, puis rejette tous les fichiers qui ont des valeurs différentes pour ces attributs importants. Pour la plupart des collections de fichiers, ce n'est pas un problème parce que les attributs de toutes les variables sont cohérents. Cependant, pour d'autres collections de fichiers, cela peut conduire à 1%, 10%, 50%, 90%, ou même 99 % des fichiers étant rejetés en tant que « mauvais » fichiers. C'est un problème.
    
EDDTableFrom fichiers a un système pour traiter ce problème: standardiser Quoi. La normalisation Ce paramètre indique à EDDTableFromFiles de normaliser les fichiers dès qu'il les lit, avant qu'EDDTableFromFiles examine les attributs pour voir s'ils sont cohérents.
    
Le revers est : si l'ensemble de données n'a pas ce problème, n'utilisez pas standardize Quoi. uniformiser Ce qui présente des risques potentiels (examinés ci-après) et inefficacité. Donc si vous n'avez pas vraiment besoin des fonctionnalités de standardiser Quoi, il n'est pas nécessaire de faire face aux risques potentiels et aux inefficacités. La plus grande inefficacité est: Quand divers standardiser Quelles options sont utilisées par un ensemble de données, cela implique que les fichiers sources stockent les données de manière significativement différente (Par exemple, avec desscale\\_factoretadd\\_offset, ou avec des chaînes de temps utilisant différents formats) . Ainsi, pour une contrainte donnée dans une requête d'utilisateur, il n'y a aucun moyen pourERDDAP™faire une seule contrainte de niveau source qui peut être appliquée à tous les fichiers source. AlorsERDDAP™ne peut appliquer les contraintes affectées qu'à un niveau plus élevé. AlorsERDDAP™doit lire les données de plus de fichiers avant d'appliquer les contraintes plus élevées au niveau de destination. Demande donc aux ensembles de données qui utilisent standardiser Ce qui prend plus de temps pour être traité.
    
Pour utiliser ce système, vous devez spécifier
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
dans le[datasets.xmlpour la table EDD de... Ensemble de données des fichiers](#eddtablefromfiles-skeleton-xml)(dans&lt;dataset&gt; tag).
    
Les *uniformiser Quoi ?* valeur spécifie quelles modifications EDDTableFromFiles devrait essayer d'appliquer. Les changements sont la somme d'une combinaison de:
    
1. Déballer
Cela fait de nombreuses opérations communes et sécuritaires pour normaliser les colonnes numériques dans les fichiers:
    * Siscale\\_factoret/ouadd\\_offsetles attributs sont présents, les suppriment et les appliquent pour décompresser les valeurs de données.
    * Déballer les attributs emballés (Par exemple, réelle\\_min, réelle\\_max,actual\\_range,data\\_min,data\\_max, data\\_range,valid\\_min,valid\\_max,valid\\_range) , le cas échéant, si la variable a été emballée, et si les valeurs d'attribut ont été emballées (c'est difficile, mais raisonnablement fiable) .
    * Si \\_FillValue et/oumissing\\_valuesont présents, convertir ces valeurs de données enERDDAP's "standard" valeurs manquantes: MAX\\_VALUE pour les types entiers (Par exemple, 127 pour les octets, 32 767 pour les courts, et 2 147 483 647 pour les ints, 9223372036854775807 pour les longs) et NaN pour les doubles et flotteurs.
    * Supprimer l'ancien \\_FillValue et/oumissing\\_valueattributs (le cas échéant) , et les remplacer par \\_FillValue=\\[desERDDAP™Valeur manquante standard\\].
         
2. Standardiser les temps numériques
Si une colonne numérique a des unités de temps numériques de type CF (" *tempsUnités* depuis *temps de base* ", p. ex. "jours depuis 1900-01-01") , ceci convertit la date Valeurs temporelles"seconds since 1970-01-01T00:00:00Z"et modifie l'attribut unit pour l'indiquer.
Si cela est sélectionné et qu'il y a une chance que cette variable aitscale\\_factorouadd\\_offset, #1 DOIT également être sélectionné.
     
3. Appliquer la chaînemissing\\_value  
Si une colonne de chaîne a \\_FillValue et/oumissing\\_valueattributs, cela convertit ces valeurs en "" et supprime les attributs.
     
4. Trouver du numériquemissing\\_value  
Si une colonne numérique n'a pas \\_FillValue oumissing\\_valueattributs, ceci tente d'identifier un numérique indéfinimissing\\_value  (Par exemple, -999, 9999, 1e37f) et convertir les instances en valeurs "standard" (MAX\\_VALUE pour les types entiers, et NAN pour les doubles et les flotteurs) .
     **Cette option présente un risque :** si la plus grande ou la plus petite valeur de données valide ressemble à une valeur manquante (Par exemple, 999) , alors ces valeurs de données valides seront converties en valeurs manquantes (Par exemple, NaN) .
     
5. Changer la chaîne "N/A" en ""
Pour chaque colonne String, convertir plusieurs chaînes couramment utilisées pour indiquer une valeur de String manquante en "". Actuellement, il s'agit de ".", "...", "-", "?", "????", "S/O", "NA", "none", "sans objet", "null", "inconnu", "non précisé". La recherche de chaînes de caractères est insensible à la casse et appliquée après que les chaînes de caractères sont triées. « nd » et « autres » ne figurent pas sur la liste.
     **Cette option présente un risque :** Les chaînes que vous considérez comme des valeurs valides peuvent être converties en "".
     
6. Normaliser pour les chaînes ISO 8601
Pour chaque colonne String, essayez de convertir la date String pas-purement-numérique (Par exemple, « 2 janvier 2018 ») à la date de la chaîne ISO 8601 ("2018-01-02") .
     **Remarque** que toutes les valeurs de données pour la colonne doivent utiliser le même format, sinon, cette option ne fera aucune modification à une colonne donnée.
     **Cette option présente un risque :** S'il y a une colonne avec des valeurs de chaîne qui ressemble juste à une date commune Format de temps, ils seront convertis en date de chaîne ISO 8601.
     
7. Normaliser les heures de date compactes vers ISO 8601
Pour chaque colonne de type chaîne ou entier, essayez de convertir la date de chaîne purement numériqueTimes (Par exemple, "20180102") à la date de la chaîne ISO 8601 ("2018-01-02") .
     **Remarque** que toutes les valeurs de données pour la colonne doivent utiliser le même format, sinon, cette option ne fera aucune modification à une colonne donnée.
     **Cette option présente un risque :** S'il y a une colonne avec des valeurs qui ne sont pas des dates compactes Times mais ressemblent à des dates compactesTimes, ils seront convertis en dateTimes de chaîne ISO 8601.
     
8. Normaliser les unités
Ceci essaie de normaliser la chaîne d'unités pour chaque variable. Par exemple, "mètres par seconde", "mètre/seconde","m.s^-1","m s-1", "m.s-1" seront tous convertis en "m.s-1". Cela ne change pas les valeurs des données. Cela fonctionne bien pour valideUDUNITSunits strings, mais peut avoir des problèmes avec des chaînes non valides ou complexes. Vous pouvez traiter des problèmes en spécifiant des paires spécifiques dans&lt;uniformiser les unités &gt; enERDDAP's
    \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml fichier. Veuillez envoyer par courriel toutes les modifications que vous apportez à Chris. John à noaa.gov afin qu'ils puissent être incorporés dans le message par défaut.xml.
     **Cette option présente un risque :** Cela peut modifier certaines unités complexes ou invalides; cependant, vous pouvez utiliser la solution décrite ci-dessus pour contourner les problèmes s'ils se produisent.
         
    
La valeur par défaut de standardiser Ce qui est 0, qui ne fait rien.

Si/lorsque vous changez la valeur de standardiser Quoi, la prochaine fois que l'ensemble de données sera rechargé,ERDDAP™relis tous les fichiers de données pour l'ensemble de données afin de reconstruire la mini-base de données avec des informations sur chaque fichier. Si l'ensemble de données a beaucoup de fichiers, cela prendra beaucoup de temps.
    
Remarques:

* Une chose délicate est...
La normalisation Quel paramètre est utilisé pour toutes les colonnes du fichier source. Ainsi, par exemple, l'utilisation du #2048 pourrait réussir à convertir une colonne de date de chaînes compactesTimes en date de chaînes ISO 8601Times, mais il pourrait également convertir par erreur une colonne avec des chaînes qui se trouve juste à ressembler à des dates compactesTimes.
     
*   datasets.xmlet générer des ensembles de données Xml -
Il est particulièrement difficile d'obtenir les paramètres corrects dansdatasets.xmlpour que votre jeu de données fonctionne comme vous le souhaitez. La meilleure approche (comme toujours) est:
    1. Utilisation[Générer des ensembles de donnéesXml](#generatedatasetsxml)et préciser la valeur de la standardisation Ce que vous aimeriez utiliser.
    2. Utilisation[DasDds](#dasdds)pour s'assurer que l'ensemble de données se charge correctement et reflète la standardisation Quelle configuration vous avez spécifié.
    3. Testez l'ensemble de données à la main quand il est dansERDDAP™veiller à ce que les variables touchées fonctionnent comme prévu.
         
* Risques
Les options 256 et plus sont plus risquées, c'est-à-dire qu'il y a plus de chances queERDDAP™fera un changement qui ne devrait pas être fait. Par exemple, l'option #2048 pourrait accidentellement convertir une variable avec des chaînes d'ID de station que tout arrive juste à regarder les dates ISO 8601 "compact" (Par exemple, 20180102) dans la norme ISO 8601"extended"Dates ("2018-01-02") .
     
* Lentement après un changement...
Depuis la valeur de standardiser Ce qui change les valeurs de données que EDDTableFromFiles voit pour chaque fichier de données, si vous changez la standardisation Quel paramètre, EDDTableFromFiles va jeter toutes les informations mises en cache sur chaque fichier (qui inclut le min et le max pour chaque variable de données dans chaque fichier) et relire chaque fichier de données. Si un jeu de données a un grand nombre de fichiers, cela peut être très long, donc il faudra beaucoup de temps pour que le jeu de données recharge la première foisERDDAP™le recharge après avoir fait le changement.
     
* Heuristique -
Les options 256 et plus utilisent l'heuristique pour effectuer leurs changements. Si vous rencontrez une situation où l'heuristique prend une mauvaise décision, veuillez envoyer par courriel une description du problème à Chris. John à Noaa. Pour améliorer l'heuristique.
     
* Solutions de remplacement
Si l'une des options standardizeQuelles options ne résolvent pas un problème pour un ensemble de données donné, vous pouvez être en mesure de résoudre le problème en faisant un[.ncfichier ml](#ncml-files)de faire coïncider chaque fichier de données et de définir les changements aux choses dans les fichiers afin que les fichiers soient cohérents. Alors, dites à EDDTable de... Fichiers ensemble de données pour agréger la.ncfichiers ml.
    
Ou, utiliser[NCO](#netcdf-operators-nco)d'apporter des modifications aux fichiers afin que les fichiers soient cohérents.
        
##### Colonnes séparées pour l'année, le mois, la date, l'heure, la minute, la deuxième{#separate-columns-for-year-month-date-hour-minute-second} 
Il est assez fréquent que les fichiers de données tabulaires aient des colonnes distinctes pour l'année, le mois, la date, l'heure, la minute, la seconde. AvantERDDAP™v2.10, la seule solution était de modifier le fichier de données pour combiner ces colonnes dans une colonne temporelle unifiée. AvecERDDAP™2.10+, vous pouvez utiliser
[&lt;sourceName&gt;= *expression* &lt;sourceName&gt;] (#Nom de la source) à direERDDAP™comment combiner les colonnes sources pour faire une colonne temporelle unifiée, vous n'avez donc plus à modifier le fichier source.
##### &lt;skipHeaderToRegex&gt;{#skipheadertoregex} 
* [&lt;skipHeaderToRegex&gt;] (#Skipheadertoregex) --
OPTIONNEL. (Pour EDDTableFromAsciiFiles et EDDTableFromColumnarAsciiFiles uniquement.)   
Lorsque EDDTableFromAsciiFiles lit un fichier de données, il ignorera toutes les lignes jusqu'à et y compris la ligne qui correspond à cette expression régulière. La valeur par défaut est "", qui n'utilise pas cette option. Un exemple est
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
qui ignorera toutes les lignes jusqu'à et y compris une ligne qui commence par "\\*\\*\\* FIN DE HEADER".

Lorsque vous utilisez cette étiquette,&lt;colonneNamesRow&gt; et&lt;firstDataRow&gt; agir comme si l'en-tête avait été supprimé avant la lecture du fichier. Par exemple, vous utiliserez columnNamesRow=0 si les noms de colonne sont sur la ligne juste après l'en-tête.

Si vous voulez utiliser generate Données Xml avec un jeu de données qui nécessite cette balise:

1. Faites un nouveau fichier-échantillon temporaire en copieant un fichier existant et en supprimant l'en-tête.
2. Exécuter générer Données Xml et spécifiez ce fichier exemple.
3. Ajouter manuellement&lt;skipHeaderToRegex&gt; tag à ladatasets.xmlUn morceau.
4. Supprimer le fichier temporaire, exemple.
5. Utiliser l'ensemble de donnéesERDDAP.
##### &lt;skipLinesRegex&gt;{#skiplinesregex} 
OPTIONNEL. (Pour EDDTableFromAsciiFiles et EDDTableFromColumnarAsciiFiles uniquement.)   
Lorsque EDDTableFromAsciiFiles lit un fichier de données, il ignorera toutes les lignes qui correspondent à cette expression régulière. La valeur par défaut est "", qui n'utilise pas cette option. Un exemple est
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
qui va ignorer toutes les lignes qui commencent par "#".

Lorsque vous utilisez cette étiquette,&lt;colonneNamesRow&gt; et&lt;firstDataRow&gt; agir comme si toutes les lignes correspondantes avaient été supprimées avant que le fichier ne soit lu. Par exemple, vous utiliseriez columnNamesRow=0 même s'il y a plusieurs lignes commençant par, par exemple, "#" au début du fichier.
    
#### EDDTableFromFiles squelette XML{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiService{#eddtablefromasciiservice} 
[ **EDDTableFromAsciiService** ](#eddtablefromasciiservice)est essentiellement un racleur d'écran. Il est destiné à traiter les sources de données qui disposent d'un simple service Web pour demander des données (souvent un formulaire HTML sur une page Web) et qui peuvent retourner les données dans un format ASCII structuré (par exemple, un format de texte ASCII à valeur séparée par des virgules ou des colonnes, souvent avec d'autres informations avant et/ou après les données) .

EDDTableFromAsciiService est la superclasse de toutes les classes EDDTableFromAsciiService... Vous ne pouvez pas utiliser EDDTableFromAsciiService directement. Utilisez plutôt une sous-classe de EDDTableFromAsciiService pour gérer des types spécifiques de services:

*   [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos)obtient des données deNOAALes services ASCII de NOS.

Actuellement, aucun autre type de service n'est pris en charge. Mais il est généralement relativement facile de soutenir d'autres services s'ils fonctionnent de la même manière. Contactez-nous si vous avez une demande.

#### Détails{#details} 
Les renseignements suivants s'appliquent à toutes les sous-classes de EDDTableFromAsciiService.

* Contraintes --ERDDAP™Les requêtes de données tabulaires peuvent imposer des contraintes à n'importe quelle variable. Le service sous-jacent peut ou non permettre des contraintes sur toutes les variables. Par exemple, de nombreux services supportent seulement les contraintes sur les noms de station, la latitude, la longitude et le temps. Ainsi, lorsqu'une sous-classe d'EDDTableFromAsciiService obtient une requête pour un sous-ensemble de données, elle passe le plus de contraintes possible au service de données source et applique ensuite les contraintes restantes aux données retournées par le service, avant de remettre les données à l'utilisateur.
* Portée valide -- Contrairement à beaucoup d'autres types de données, EDDTableFromAsciiService ne connaît généralement pas la plage de données pour chaque variable, donc il ne peut pas rapidement rejeter les demandes de données en dehors de la plage valide.
* Analyser la réponse textuelle de l'ASCII -- Lorsque EDDTableFromAsciiService reçoit une réponse d'un service texte ASCII, il doit valider que la réponse a le format et l'information attendus, puis extraire les données. Vous pouvez spécifier le format en utilisant différentes balises spéciales dans le morceau de XML pour cet ensemble de données:
    *   &lt;avantData1&gt; à travers&lt;balises avantData10&gt; -- Vous pouvez spécifier une série de morceaux de texte (autant que vous voulez, jusqu'à 10) que EDDTableFromAsciiService doit rechercher dans l'en-tête du texte ASCII retourné par le service avec&lt;avantData1&gt; à travers&lt;avantData10&gt;. Par exemple, cela est utile pour vérifier que la réponse inclut les variables attendues en utilisant les unités attendues. La dernière balise avantData que vous spécifiez identifie le texte qui se produit juste avant le début des données.
    *   &lt;aprèsDonnées&gt; -- Ceci spécifie le texte que EDDTableFromAsciiService cherchera dans le texte ASCII retourné par le service qui signifie la fin des données.
    *   &lt;Aucune donnée&gt; -- Si EDDTableFromAsciiService trouve ce texte dans le texte ASCII retourné par le service, il conclut qu'il n'y a pas de données qui correspondent à la demande.
#### EDDTableFromAsciiService squelette XML{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiServiceNOS{#eddtablefromasciiservicenos} 
[ **EDDTableFromAsciiServiceNOS** ](#eddtablefromasciiservicenos)rend les ensembles de données EDDTable des services de données texte ASCII offerts parNOAA's[Service maritime national (NOS) ](https://oceanservice.noaa.gov/). Pour savoir comment cette classe fonctionne et comment l'utiliser, consultez la superclasse de cette classe[EDDTableFromAsciiService](#eddtablefromasciiservice). Il est peu probable que quelqu'un d'autre que Bob Simons doive utiliser cette sous-classe.

Puisque les données contenues dans la réponse d'un service NOS utilisent un format de texte colonne ASCII, les variables de données autres que la latitude et la longitude doivent avoir un attribut spécial qui spécifie quels caractères de chaque ligne de données contiennent les données de cette variable, par exemple,
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDTableFromAllDatasets{#eddtablefromalldatasets} 
[ **EDDTableFromAllDatasets** ](#eddtablefromalldatasets)est un ensemble de données de niveau supérieur qui a des informations sur tous les autres ensembles de données qui sont actuellement chargés dans votreERDDAP. Contrairement à d'autres types de ensembles de données, il n'y a pas de spécification pour leallDatasetsensemble de donnéesdatasets.xml.ERDDAP™crée automatiquement un ensemble de données EDDTableFromAllDatasets (avecdatasetID=allDatasets) . Ainsi,allDatasetsdataset sera créé dans chaqueERDDAP™installation et fonctionnera de la même manière dans chaqueERDDAP™installation.

LesallDatasetsdataset est un ensemble de données tabulaires. Il contient une série d'informations pour chaque ensemble de données. Il contient des colonnes contenant des informations sur chaque ensemble de données, par exemple:datasetID, accessible, institution, titre, minLongitude, maxLongitude, minLatitude, maxLatitude, minTime, maxTime, etc. Parce queallDatasetsest un ensemble de données tabulaires, vous pouvez le requêter de la même manière que vous pouvez requête n'importe quel autre ensemble de données tabulaires dansERDDAP™, et vous pouvez spécifier le type de fichier pour la réponse. Cela permet aux utilisateurs de rechercher des ensembles de données d'intérêt de manière très puissante.
 
### EDDTableFromAsciiFiles{#eddtablefromasciifiles} 
[ **EDDTableFromAsciiFiles** ](#eddtablefromasciifiles)agrége les données des fichiers de données ASCII tabulaires séparés par des virgules, des onglets, des point-virgules ou des espaces.

* Le plus souvent, les fichiers auront des noms de colonnes sur la première ligne et des données à partir de la deuxième ligne. (Ici, la première ligne du fichier s'appelle la ligne numéro 1.) Mais vous pouvez utiliser&lt;colonneNamesRow&gt; et&lt;premierDataRow&gt; dans votredatasets.xmlfichier pour spécifier un numéro de ligne différent.
*   ERDDAP™permet aux lignes de données d'avoir différents nombres de valeurs de données.ERDDAP™suppose que les valeurs de données manquantes sont les colonnes finales de la ligne.ERDDAP™assigne les valeurs standard manquantes pour les valeurs manquantes de données. (ajouté v1.56) 
* Les fichiers ASCII sont faciles à utiliser, mais ils ne sont pas le moyen le plus efficace de stocker/récupérer les données. Pour une plus grande efficacité, enregistrer les fichiers commeNetCDFv3.ncfichiers (avec une dimension, "row", partagée par toutes les variables) à la place. Vous pouvez[UtilisationERDDAP™pour générer les nouveaux fichiers](#millions-of-files).
* Voir la superclasse de cette classe,[EDDTableFromFiles](#eddtablefromfiles), pour des informations sur le fonctionnement de cette classe et comment l'utiliser.
* Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. En raison du manque total de métadonnées dans les fichiers ASCII, vous aurez toujours besoin de modifier les résultats de GenerateDatasetsXml.
* MISE EN GARDE: QuandERDDAP™lit les fichiers de données ASCII, s'il trouve une erreur sur une ligne donnée (Par exemple, nombre incorrect d'articles) , il enregistre un message d'avertissement (C'est une mauvaise ligne. (s) de données" ... avec une liste des mauvaises lignes sur les lignes suivantes) aux[fichier log.txt](/docs/server-admin/additional-information#log)puis continue à lire le reste du fichier de données. Ainsi, il est de votre responsabilité de regarder périodiquement (ou écrire un script pour le faire) pour ce message dans le journal. txt afin que vous puissiez résoudre les problèmes dans les fichiers de données.ERDDAP™est configuré de cette façon afin que les utilisateurs puissent continuer à lire toutes les données valides disponibles, même si certaines lignes du fichier ont des défauts.
     
### Tableau EDD de Fichiers AwsXml{#eddtablefromawsxmlfiles} 
[ **Tableau EDD de Fichiers AwsXml** ](#eddtablefromawsxmlfiles)agrégats de données d'un ensemble de Station météorologique automatique (AWS) Fichiers de données XML utilisant l'API XML WeatherBug Rest (qui n'est plus actif) .

* Ce type de fichier est une façon simple mais inefficace de stocker les données, car chaque fichier semble habituellement contenir l'observation à partir d'un seul point de temps. Il peut donc y avoir un grand nombre de fichiers. Si vous voulez améliorer votre rendement, envisagez de regrouper des groupes d'observations (Une semaine ?) enNetCDFv3.ncfichiers (le meilleur:.ncfichiers avec les[FC Géométries d'échantillonnage discrètes (DSG) Format de l'array contigüe](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) et utilisation[EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)  (ou[EDDTableFromNcCFFiles](#eddtablefromnccffiles)) pour servir les données. Vous pouvez[UtilisationERDDAP™pour générer les nouveaux fichiers](#millions-of-files).
* Voir la superclasse de cette classe,[EDDTableFromFiles](#eddtablefromfiles), pour des informations sur le fonctionnement de cette classe et comment l'utiliser.
     
### EDDTableDeColumnarAsciiFiles{#eddtablefromcolumnarasciifiles} 
[ **EDDTableDeColumnarAsciiFiles** ](#eddtablefromcolumnarasciifiles)regroupe les données des fichiers de données ASCII tabulaires avec des colonnes de largeur fixe.

* Le plus souvent, les fichiers auront des noms de colonnes sur la première ligne et des données à partir de la deuxième ligne. La première ligne/ligne du fichier est appelée ligne #1. Mais vous pouvez utiliser&lt;colonneNamesRow&gt; et&lt;premierDataRow&gt; dans votredatasets.xmlfichier pour spécifier un numéro de ligne différent.
* Les&lt;addAttributes&gt; pour chaque&lt;dataVariable&gt; pour ces ensembles de données DOIT inclure ces deux attributs spéciaux:
    
    *   &lt;att name="startColumn"&gt; *entier* &lt;att&gt; -- spécifie la colonne de caractères de chaque ligne qui est le début de cette variable de données.
    *   &lt;Nom de l'organisme: *entier* &lt;att&gt; -- spécifie la colonne de caractères de chaque ligne qui est la 1 après la fin de cette variable de données.
    
La première colonne de caractères est appelée colonne #0.
Par exemple, pour ce fichier qui a des valeurs temporelles abutting des valeurs de température :
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
la variable de temps des données aurait
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
et la variable de temps aurait
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Ces attributs DOIVENT être spécifiés pour toutes les variables sauf[Valeur fixe](#fixed-value-sourcenames)et[noms de fichier-source](#filename-sourcenames)variables.
* Les fichiers ASCII sont faciles à utiliser, mais ils ne sont pas un moyen efficace de stocker/récupérer les données. Pour une plus grande efficacité, enregistrer les fichiers commeNetCDFv3.ncfichiers (avec une dimension, "row", partagée par toutes les variables) à la place. Vous pouvez[UtilisationERDDAP™pour générer les nouveaux fichiers](#millions-of-files).
* Voir la superclasse de cette classe,[EDDTableFromFiles](#eddtablefromfiles), pour des informations sur le fonctionnement de cette classe et comment l'utiliser.
* Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. En raison de la difficulté de déterminer les positions de début et de fin pour chaque colonne de données et du manque total de métadonnées dans les fichiers ASCII, vous aurez toujours besoin de modifier les résultats de GenerateDatasetsXml.
     
### EDDTableFromHttpGet{#eddtablefromhttpget} 
Tableau EDD FromHttpGet est différent de tous les autres types de ensembles de données dansERDDAP™dans la mesure où il dispose d'un système permettant à des "auteurs" spécifiques d'ajouter des données, de réviser des données ou de supprimer des données de l'ensemble de données par desHTTP GETou[POSTE](#http-post)demande depuis un programme informatique, un script ou un navigateur. L'ensemble de données est interrogeable par les utilisateurs de la même manière que tous les autres ensembles de données EDDTable sont interrogeables dansERDDAP. Voir la description de la superclasse de cette classe,[EDDTableFromFiles](#eddtablefromfiles), pour lire les caractéristiques héritées de cette superclasse.

Les caractéristiques uniques de EDDTableFromHttpGet sont décrites ci-dessous. Vous devez lire toute cette section initiale et la comprendre; sinon, vous pourriez avoir des attentes irréalistes ou vous mettre dans des problèmes qui est difficile à résoudre.

#### Utilisation prévue{#intended-use} 
Ce système est destiné à:

* Tabulaire (in situ) données non maillées.
* Données en temps réel
Le but est de permettre à un auteur (Par exemple, le capteur, un script QC automatisé, ou un humain spécifique) pour modifier l'ensemble de données (par[Commande .insert ou .delete](#insert-and-delete)) et de rendre ce changement accessible àERDDAP™utilisateurs, tous en moins d'une seconde, et peut-être beaucoup plus rapide. La plupart de ces 1 seconde est le temps du réseau.ERDDAP™peut traiter la demande en environ 1 ms et les données sont immédiatement accessibles aux utilisateurs. C'est une[rapide](#httpget-speed),[robuste](#robust)et[système fiable](#system-reliability).
* Presque toutes les fréquences de données -
Ce système peut accepter des données peu fréquentes (Par exemple, tous les jours) à travers des données très fréquentes (Données de 100 Hz, par exemple) . Si vous optimisez le système, il peut gérer des données de fréquence plus élevée (peut-être 10 données KHz si vous allez à des extrêmes) .
* Données provenant d'un capteur ou d'une collection de capteurs similaires.
*   [Versionnement](#versioning)/[Science reproductible](https://en.wikipedia.org/wiki/Reproducibility)/DOIS...
Situations où vous devez être en mesure d'apporter des modifications aux données (Par exemple, modifier un drapeau de contrôle de la qualité) , savoir quel auteur a fait chaque changement, connaître l'horodatage de quand l'auteur a fait le changement, et (sur demande) être en mesure de voir les données originales avant le changement. Ainsi, ces ensembles de données sont éligibles pour[DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier). parce qu'ils rencontrent lesDOIexiger que l'ensemble de données ne change pas, sauf par agrégation. En général, les ensembles de données en temps quasi réel ne sont pas éligiblesDOIs parce que les données sont souvent modifiées rétroactivement (Par exemple, aux fins de l'AQ/CQ) .
     

Une fois que les données sont dans un ensemble de données EDDTableFromHttpGet, tout utilisateur peut demander des données de la même manière qu'il demande des données à tout autre ensemble de données EDDTable.
     
#### Expérimental: Soyez prudent{#experimental-be-careful} 
Puisque ce système est nouveau et que les données environnementales perdues ne peuvent pas être récupérées, vous devriez traiter EDDTableFromHttpGet comme expérimental. Si vous êtes en transition d'un autre système, veuillez exécuter l'ancien système et le nouveau système en parallèle jusqu'à ce que vous soyez sûr que le nouveau système fonctionne bien (semaines ou mois, pas seulement heures ou jours) . Dans tous les cas, assurez-vous que votre système enregistre séparément les URLs .insert et .delete qui sont envoyées à l'ensemble de données EDDTableFromHttpGet (même si juste dans les journaux Apache et/ou Tomcat) , au moins pour un moment. Et dans tous les cas, assurez-vous que les fichiers de données créés par votre EDDTableFromHttpGet dataset sont régulièrement sauvegardés sur des périphériques de stockage de données externes. (Notez que[Rsync](https://en.wikipedia.org/wiki/Rsync). peut sauvegarder les fichiers de données créés par EDDTableFromHttpGet très efficacement.)   
     
#### .insert et .delete{#insert-and-delete} 

Pour tout ensemble de donnéesERDDAP™, lorsque vous envoyez une demande àERDDAP™pour un sous-ensemble de données dans un ensemble de données, vous spécifiez le type de fichier que vous voulez pour la réponse, par exemple, .csv,.htmlTable,.nc,.json. EDDTableFromHttp Obtenez étend ce système pour prendre en charge deux "types de fichiers" supplémentaires qui peuvent insérer (ou changement) ou supprimer des données dans l'ensemble de données:

* .insérer
    * La requête est formatée comme une réponse de formulaire HTML standard, avec des paires de key=value, séparées par « & ». Par exemple,
         https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1   
ditERDDAP™pour ajouter ou modifier les données pourstationID= 46088 pour le temps spécifié.
    * L'auteur de ce changement est JohnSmith et la clé est quelqueKey1.
    * L'URL doit inclure des valeurs valides (valeurs non manquantes) pour tous les[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)
    * Si les valeurshttpGetRequired Variables dans la demande (Par exemple,stationIDet heure) correspondent aux valeurs sur une ligne déjà dans l'ensemble de données, les nouvelles valeurs écrasent efficacement les anciennes valeurs (bien que les anciennes valeurs soient encore accessibles si l'utilisateur demande des données d'un précédent[version](#versioning)de l'ensemble de données) .
    * L'URL .insert ne doit jamais inclure &timestamp= (ERDDAP™génère cette valeur) ou &command= (qui est spécifié par .insert (qui est la commande=0) ou .delete (qui est la commande= 1) ) .
    * Si l'URL .insert ne spécifie pas de valeurs pour les autres colonnes qui sont dans l'ensemble de données, elles sont supposées être les valeurs manquantes natives (MAX\\_VALUE pour les types entiers de données, NaN pour les flotteurs et les doubles, et "" pour les cordes) .
             
    * .supprimer
        * La requête est formatée comme une réponse de formulaire HTML standard, avec des paires de key=value, séparées par « & ». Par exemple,
             https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1   
ditERDDAP™pour supprimer les données pourstationID= 46088 au moment spécifié.
        * L'auteur de ce changement est JohnSmith et la clé est quelqueKey1.
        * L'URL doit spécifier[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)dans la demande (Par exemple,stationIDet heure) . Si ces valeurs correspondent aux valeurs d'une ligne déjà dans l'ensemble de données (qu'ils auront généralement) , les anciennes valeurs sont effectivement supprimées (bien que les anciennes valeurs soient encore accessibles si un utilisateur demande des données d'un précédent[version](#versioning)de l'ensemble de données) .
        * Il n'est pas nécessaire de spécifier des valeurs pour les non-HttpGetRequiredVariables, autres que l'auteur, qui est nécessaire pour authentifier la requête.
             
    
Détails:
    * Les requêtes .insert et .delete sont formatées comme des réponses de formulaire HTML standard, avec des paires de key=value, séparées par « & ». Les valeurs doivent être:[pourcentage encodé](https://en.wikipedia.org/wiki/Percent-encoding). Ainsi, vous devez coder des caractères spéciaux dans le formulaire %HH, où HH est la valeur hexadécimale à 2 chiffres du caractère. Habituellement, vous devez simplement convertir quelques-uns des caractères de ponctuation : % en %25, & en %26, " en %22,&lt;dans %3C, = dans %3D, &gt; dans %3E, + dans %2B,|dans %7C,\\[dans %5B,\\]en %5D, espacez en %20 et convertissez tous les caractères au-dessus de #127 dans leur formulaire UTF-8, puis encodez chaque octet du formulaire UTF-8 dans le format %HH (demander de l'aide à un programmeur) .
    * Les demandes .insert et .delete doivent inclure[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute), par exemple,stationIDet l'heure. Pour les requêtes .insert, les variables qui ne sont pas spécifiées dans la requête sont supposées être des valeurs manquantes (MAX\\_VALUE pour les variables entières, NaN pour les variables flottantes et doubles, et une chaîne vide pour les variables chaîne) . Pour les requêtes .delete, valeurs pour non-HttpGetRequired Variables (autres que l'auteur, qui est requis) sont ignorés.
    * Les requêtes .insert et .delete doivent inclure le nom de l'auteur et la clé de l'auteur via un paramètre dans le formulaire auteur= *auteur\\_key* comme dernier paramètre de la requête. Exiger que cette demande soit la dernière veille à ce que toute la demande ait été reçue parERDDAP. Seul l'auteur (pas la clé) sera stocké dans le fichier de données. Vous devez spécifier la liste des permis *auteur\\_key* 's via l'attribut global[httpObtenez les clés](#httpgetkeys)
    * Les paramètres .insert et .delete peuvent être scalaires (unique) valeurs ou tableaux de toute longueur dans le formulaire\\[valeur1,valeur2,valeur3,...,valeurN\\]. Pour une requête donnée, toutes les variables avec des tableaux doivent avoir des tableaux avec le même nombre de valeurs (Sinon c'est une erreur) . Si une requête a des valeurs scalaires et de tableau, les valeurs scalaires sont répliquées pour devenir des tableaux de la même longueur que les tableaux spécifiés, par exemple &stationID=46088 pourrait être traité comme &stationID=\\[46088,46088,46088\\]. Les tableaux sont la clé de[haut débit](#httpget-speed). Sans tableaux, il sera difficile d'insérer ou de supprimer plus de 8 lignes de données par seconde d'un auteur distant. (à cause de tous les frais généraux du réseau) . Avec les tableaux, il sera facile d'insérer ou de supprimer plus de 1000 lignes de données par seconde à partir d'un capteur distant.
    * .insérer et .delete accepter (sans message d'erreur) nombres flottants lorsque des entiers sont attendus. Dans ces cas, l'ensemble de données tourne les valeurs en entiers.
    * .insérer et .delete accepter (sans message d'erreur) nombres entiers et flottants de points qui sont hors de portée du type de données de la variable. Dans ces cas, l'ensemble de données stocke les valeurs commeERDDAP'les valeurs natives manquantes pour ce type de données (MAX\\_VALUE pour les types entiers et NaN pour les flotteurs et les doubles) .
         
#### Réponse{#response} 
Si l'URL .insert ou .delete réussit, le code de réponse HTTP sera 200 (Très bien.) et la réponse sera.jsonobjet, par exemple,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Notez que les chronomètres ont une précision de millisecondes.

Si l'URL .insert ou .delete échoue, vous obtiendrez un code de réponse HTTP autre que 200 (Très bien.) , par exemple, erreur 403 Interdit si vous soumettez une valeur auteur\\_key incorrecte.ERDDAP™envoie le code de réponse HTTP (Pas, par exemple,.jsonerreur formatée) parce que c'est comme ça que les choses sont faites dans Internet et parce que des erreurs peuvent survenir n'importe où dans le système (Par exemple, dans le réseau, qui renvoie une erreur HTTP) . Si l'erreur est deERDDAP™, la réponse peut inclure un certain texte (pas.json) avec une explication plus détaillée de ce qui s'est mal passé, mais le code de réponse HTTP (200=Ok, tout le reste est un problème) est le bon moyen de vérifier si le .insert ou .delete a réussi. Si la vérification du code de réponse HTTP n'est pas possible ou n'est pas pratique, recherchez "status":"succès" dans le texte de réponse qui devrait être une indication fiable du succès.
    
#### Fichiers journaux{#log-files} 
Lorsque EDDTableFromHttpGet reçoit les commandes .insert et .delete, il ajoute simplement les informations au fichier pertinent dans un ensemble de fichiers journaux, dont chacun est une table stockée dans un[JSON Fichier CSV lignes](https://jsonlines.org/examples/). Lorsqu'un utilisateur fait une demande de données,ERDDAP™lit rapidement les fichiers journaux pertinents, applique les modifications à l'ensemble de données dans l'ordre où elles ont été faites, puis filtre la requête par les contraintes de l'utilisateur comme n'importe quel autreERDDAP™demande de données. La partition des données dans différents fichiers journaux, le stockage de différentes informations (Par exemple, l'horodatage de la commande, et si la commande était .insert ou .delete) , et divers aspects de la configuration de l'ensemble de données , tous permettentERDDAPpour stocker les données et récupérer les données de cet ensemble de données très rapidement et très efficacement.
     
#### Sécurité et auteur{#security-and-author} 
Chaque commande .insert et .delete doit inclure &author= *auteur\\_key* comme dernier paramètre, où auteur\\_key est composé de l'identificateur de l'auteur (vous avez choisi: nom, initiales, pseudonyme, numéro) , un accent et une clé secrète. LesERDDAP™administrateur travaillera avec les auteurs pour générer la liste des valeurs d'auteur\\_key valides, qui peuvent être modifiées à tout moment.
Lorsque EDDTableFromHttpGet reçoit une commande .insert ou .delete, il s'assure que l'auteurID\\_key est le dernier paramètre et valide. Parce que c'est le dernier paramètre, il indique que toute la ligne de commande atteintERDDAP™et n'était pas tronquée. La clé secrète garantit que seuls des auteurs spécifiques peuvent insérer ou supprimer des données dans l'ensemble de données.ERDDAP™puis extrait l'auteurID et enregistre cela dans la variable auteur, afin que tout le monde puisse voir qui était responsable d'un changement donné à l'ensemble de données.
Les commandes .insert et .delete ne peuvent être effectuées que viahttps:  (sécurisé)  ERDDAP™URLs. Cela garantit que les informations transférées restent secrètes pendant le transit.
     
#### horodatage{#timestamp} 
Dans le cadre du système de log, EDDTableFromHttpGet ajoute un horodatage (le temps queERDDAPreçu la demande) à chaque commande qu'il stocke dans les fichiers journaux. Parce queERDDAP™génère l'horodatage, pas les auteurs, peu importe si différents auteurs font des changements à partir d'ordinateurs avec des horloges réglées à des temps légèrement différents. L'horodatage indique de façon fiable le moment où le changement a été apporté à l'ensemble de données.
     
#### POST HTTP{#http-post} 
*   ["Et HTTP POST ?"](#http-post)  
HTTP[POSTE](https://en.wikipedia.org/wiki/POST_(HTTP)) est la meilleure alternative (par rapport àHTTP GET) pour envoyer des informations d'un client vers un serveur HTTP. Si vous le pouvez, ou si vous voulez vraiment améliorer la sécurité, utilisez POST au lieu de GET pour envoyer les informations àERDDAP. POST est plus sûr car: avec GET ethttps, l'URL est transmise de manière sécurisée, mais l'URL entière (y compris les paramètres, y compris l'auteur\\_key) sera écrit à l'Apache, Tomcat, etERDDAP™log des fichiers, où quelqu'un pourrait les lire si les fichiers ne sont pas correctement sécurisés. Avec POST, les paramètres sont transmis de manière sécurisée et ne sont pas écrits dans les fichiers journaux. POST est un peu plus difficile pour les clients de travailler avec et n'est pas supporté aussi largement par le logiciel client, mais les langages de programmation le supportent. Le contenu que vous envoyez à l'ensemble de données via GET ou POST sera le même, simplement formaté d'une manière différente.
     
#### httpGetRequired Attribut mondial des variables{#httpgetrequiredvariables-global-attribute} 
Une partie essentielle de ce qui fait fonctionner l'ensemble du système est l'attribut global requishttpGetRequired Variables, qui est une liste séparée par des virgulesdataVariableles noms de sources qui identifient uniquement une ligne de données. Cela devrait être le plus minimal possible et inclura presque toujours la variable temporelle. Par exemple, voici les recommandationshttpGetRequired Variables pour chacune des[FC Géométries d'échantillonnage discrètes (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)  (Bien sûr, les noms d'identification peuvent être différents dans votre ensemble de données.) :

* Pour les séries chronologiques:stationID, heure
* Pour Trajectoire: TrajectoireID, temps
* Pour Profil : heure (en supposant que le temps est le profil\\_id) , profondeur
* Séries chronologiques Profil :stationID, heure (en supposant que le temps est le profil\\_id) , profondeur
* Pour la trajectoire Profil : trajectoireID, temps (en supposant que le temps est le profil\\_id) , profondeur

    
Prenons l'exemple de TimeSeries:
Avec une commande .insert qui inclutstationID=46088 et heure=2016-06-23T19:53:00Z (et autres valeurs pour d'autres variables) :
* S'il n'y a pas de données existantes pour cette station et cette heure, alors l'effet sera d'ajouter les données à l'ensemble de données.
* S'il y a des données existantes pour cette station et ce temps, alors l'effet sera de remplacer la ligne de données existante par ces nouvelles données. (Bien sûr, depuisERDDAP™conserve le journal de chaque commande qu'il reçoit, les anciennes données sont toujours dans le journal. Si un utilisateur demande des données d'une version de l'ensemble de données avant ce changement, il verra les données plus anciennes.)   
         
#### httpGetDirectoryStructure{#httpgetdirectorystructure} 
*   [httpGetDirectory Structure Attribut mondial et données (Journal) Noms des fichiers](#httpgetdirectorystructure)  
Une partie de ce qui rend ce système efficace est queERDDAP™crée un ensemble de données (journal) fichiers, chacun avec un morceau différent de l'ensemble de données. Si elles sont bien conçues,ERDDAP™pourront répondre rapidement à la plupart des demandes de données. Cette configuration est spécifiée par lahttpGetDirectoryStructure attribut global, qui est une chaîne qui ressemble à un nom de fichier relatif, par exemple, "stationID/10years", mais est en fait une spécification pour la structure du répertoire. Les parties indiquent comment répertoire et noms de fichiers pour les données (journal) les fichiers seront construits.
    
    * Si une partie est un entier (&gt;= 1) plus une période (milliseconde, seconde, minute, heure, date, mois, année, ou leurs pluriels) , par exemple, 10ans, puis le jeu de données EDDTableFromHttpGet prendra la valeur de temps pour la ligne de données (Par exemple, 2016-06-23T19:53:00Z) , calculer le temps tronqué à cette précision (Par exemple, 2010) , et faire un dossier ou fileName à partir de cela.
        
L'objectif est d'obtenir une partie raisonnablement importante de données dans chaque fichier, mais bien moins de 2 Go.
        
    * Autrement, la partie du cahier des charges doit êtredataVariable'ssourceName, par exemple,stationID. Dans ce cas, EDDTableFromHttpGet fera un dossier ou un nom de fichier à partir de la valeur de cette variable pour la nouvelle ligne de données (Par exemple, "46088") .
    
Parce que les données de la commande .insert et .delete sont stockées dans des données spécifiques (journal) fichiers, EDDTableFromHttpGet habituellement besoin d'ouvrir une ou quelques données (journal) fichiers pour trouver les données pour une demande d'utilisateur donnée. Et parce que chaque donnée (journal) fichier a toutes les informations pertinentes pour son morceau de l'ensemble de données, il est rapide et facile pour EDDTableFromHttpGet de faire une version spécifique (ou la version actuelle) de l'ensemble de données pour les données de ce fichier (et ne pas avoir à générer la version demandée de l'ensemble de données) .
    
Les directives générales sont basées sur la quantité et la fréquence des données. Si nous supposons 100 octets par rangée de données, alors ...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
Par exemple, si la structure du répertoire eststationID/2mois et vous insérez les données de deux stations (46088 et 46155) avec des valeurs temporelles de décembre 2015 à mai 2016, EDDTableFromHttp Get va créer des répertoires nommés 46088 et 46155 et créer des fichiers dans chacun des noms 2015-11.jsonL, 2016-01.jsonAnnée.jsonL, 2016-05.jsonL (chaque titulaire de 2 mois de données pour la station concernée) . À tout moment à l'avenir, si vous utilisez .insert ou .delete pour modifier ou supprimer les données pour, par exemple, station 46088 à 2016-04-05T14:45:00Z, EDDTableFromHttp Obtenir va ajouter cette commande à 46088/2016-03.jsonl, les données pertinentes (journal) fichier. De toute évidence, il est bon d'ajouter des données pour d'autres stations à tout moment à l'avenir, car l'ensemble de données créera simplement des répertoires supplémentaires au besoin pour conserver les données des nouvelles stations.
    
#### httpObtenez les clés{#httpgetkeys} 
Chaque table EDD DeHttp Obtenir un ensemble de données doit avoir un attribut globalhttpGetKeys qui spécifie la liste des auteurs autorisés et leurs clés secrètes comme une liste séparée par des virgules *auteur\\_key* , par exemple, JohnSmith\\_someKey1, HOBOLogger\\_someKey2, QCScript59\\_someKey3 .
* auteur\\_key est sensible à la casse et doit être entièrement ASCII caractères (#33 - #126, et sans virgule, " ou ' caractères
* Les clés sont comme des mots de passe, donc elles DOIVENT être &gt;=8 caractères, difficiles à deviner, et sans mots de dictionnaire internes. Vous devriez les traiter comme vous traiteriez les mots de passe -- gardez-les privés.
* Le premier caractère '\\_' sépare l'auteur de la clé, de sorte que le nom de l'auteur ne peut pas inclure un caractère '\\_' (mais une clé peut) .
* Tout auteur donné peut avoir un ou plusieurs auteurs\\_key, p.ex. JohnSmith\\_some Key1, JohnSmith\\_some Clé7, etc.
* Vous pouvez changer la valeur de cet attribut à tout moment. Les modifications prennent effet la prochaine fois que l'ensemble de données est chargé.
* Cette information sera retirée des attributs globaux de l'ensemble de données avant qu'elle ne soit rendue publique.
* Chaque requête à l'ensemble de données pour insérer ou supprimer des données doit inclure un &author= *auteur\\_key* paramètre. Après vérification de la validité de la clé,ERDDAP™ne sauve que la partie auteur (pas la clé) dans le fichier de données.

#### Configuration{#set-up} 

Voici les étapes recommandées pour configurer un ensemble de données EDDTableFromHttpGet:

1. Faites le répertoire principal pour tenir les données de cet ensemble de données. Pour cet exemple, utilisons /data/testGet/ . L'utilisateur exécutant GenerateDatasetsXml et l'utilisateur exécutantERDDAP™doivent tous deux avoir accès à ce répertoire.
     
2. Utilisez un éditeur de texte pour faire un échantillon.jsonl fichier CSV avec l'extension.jsonI dans ce répertoire.
Le nom n'est pas important. Par exemple, vous pouvez l'appeler échantillon.jsonL
Faire une 2 ligne.jsonl Fichier CSV, avec noms de colonnes sur la première ligne et valeurs fictives/typiques (du type de données correct) sur la deuxième ligne. Voici un exemple de fichier qui convient à une collection defeatureType= Données de la série Time qui ont mesuré la température de l'air et de l'eau.
    \\[PourfeatureType=Trajectoire, vous pourriez changerstationIDpour être TrajectoireID.\\]  
    \\[PourfeatureType=Profil, vous pourriez changerstationIDpour être profilID et ajouter une variable de profondeur.\\]
    
    \\["stationID","time", "latitude", "longitude", "airtemp", "watertemp", "timestamp", "auteur", "commande"\\]
    \\["myStation", "2018-06-25T17:00:00Z", 0.0, 0.0, 0.0, 0.0, 0.0, "SomeBody", 0\\]
    
Remarque:
    * Les valeurs de données réelles n'ont pas d'importance car vous allez éventuellement supprimer ce fichier, mais ils devraient être du type de données correct. Notamment, la variable temporelle devrait utiliser le même format que les données réelles de la source.
    * Pour toutes les variables,sourceNamesera égal audestinationName, alors utilisez maintenant les noms de variables correctes/finales, y compris le temps, la latitude, la longitude et parfois la profondeur ou l'altitude si des variables avec cette information seront incluses.
    * Il y aura presque toujours une variable nommée time qui enregistre le moment où l'observation a été faite. Il peut être dataType String avec[unités adaptées aux temps de cordes](#string-time-units)  (Par exemple,yyyy-MM-dd'T'HH:mm:ss.SSZ) ou données Type double avec[unités adaptées aux temps numériques](#time-units)  (p.ex., secondes depuis 1970-01-01T00:00:00Z, ou un autre temps de base) .
    * Trois des colonnes (généralement les trois derniers) doit être horodaté, auteur, commande.
    * La colonne horodatage sera utilisée par EDDTableFromHttpGet pour ajouter un horodatage indiquant quand il a ajouté une ligne de données donnée au fichier de données. Il aura des donnéesType double et unités secondes depuis 1970-01-01T00:00:00Z.
    * La colonne auteur avec dataType String sera utilisée pour enregistrer l'auteur autorisé qui a fourni les données de cette ligne. Les auteurs autorisés sont spécifiés par[httpattribut global GetKeys](#httpgetkeys). Bien que les clés soient spécifiées comme *auteur\\_key* et sont dans l'URL « request » sous cette forme, seule la partie auteur est enregistrée dans le fichier de données.
    * La colonne de commande avec dataType octet indiquera si les données sur cette ligne sont une insertion (0) ou une suppression (1) .
         
3. Exécuter Générer des ensembles de données Xml et le dire
    
    1. Le type dataset est EDDTableFromHttpGet
    2. Le répertoire est (pour cet exemple) /données/essai Obtenez/
    3. Le fichier type est (pour cet exemple) /data/testGet/startup.jsonL
    4. LeshttpGetRequired Les variables sont: (pour cet exemple)  stationID, heure Voir la description[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)ci-dessous.
    5. Si les données sont recueillies toutes les 5 minutes,httpGetDirectoryStructure pour cet exemple eststationID/2mois . Voir la description[httpGetDirectoryStructure](#httpgetdirectorystructure)ci-dessous.
    6. Les[httpObtenez les clés](#httpgetkeys)
    
Ajouter la sortie (le morceau dedatasets.xmlpour l'ensemble de données) àdatasets.xml.
     
4. Modifierdatasets.xmlmorceaux pour ce jeu de données pour le rendre correct et complet.
En particulier, remplacer tous les ??? avec un contenu correct.
     
5. Pour&lt;paramètre de fichierTableInMemory&gt; :
    * Définissez ceci à true si l'ensemble de données reçoit habituellement des requêtes fréquentes .insert et/ou .delete (Par exemple, plus d'une fois toutes les 10 secondes) . Cela aide EDDTableFromHttpRépondez plus rapidement aux requêtes .insert et/ou .delete. Si vous définissez ceci à true, EDDTableFromHttpGet enregistrera régulièrement le fichierTable et les informations connexes sur le disque (au besoin, environ toutes les 5 secondes) .
    * Définissez ceci à faux (par défaut) si l'ensemble de données reçoit généralement peu de requêtes .insert et/ou .delete (Par exemple, moins d'une fois toutes les 10 secondes) .
         
6. Remarque: Il est possible d'utiliser&lt;cacheFromUrl&gt; et paramètres associés dansdatasets.xmlpour EDDTable DeHttp Obtenez des ensembles de données comme un moyen de faire et de maintenir une copie locale d'un EDDTableFromHttpGet dataset sur un autreERDDAP. Cependant, dans ce cas, cet ensemble de données local rejettera toute requête .insert et .delete.

#### Utilisation de EDDTable DeHttpGet Datasets{#using-eddtablefromhttpget-datasets} 

* Les auteurs peuvent faire des "demandes" qui[insérer des données dans l'ensemble de données ou les supprimer](#insert-and-delete).
     
* Une fois que des données réelles ont été insérées dans l'ensemble de données, vous pouvez et devez supprimer le fichier de données original.
     
* Les utilisateurs peuvent demander des données de l'ensemble de données comme ils le font pour tout autre ensemble de données EDDTableERDDAP. Si la requête n'inclut pas de contrainte sur la colonne timestamp, alors la requête obtient des données de la version actuelle de l'ensemble de données (le fichier journal après le traitement de toutes les commandes d'insertion et de suppression et le re-triage par lehttpGetRequiredVariables) .
     
* Les utilisateurs peuvent également faire des requêtes spécifiques à EDDTableFromHttpGet datasets:
    * Si la demande comprend&lt;ou&lt;= contrainte de la colonne timestamp, alorsERDDAP™traite les lignes du fichier journal jusqu'à l'horodatage spécifié. En effet, cela supprime temporairement toutes les modifications apportées à l'ensemble de données depuis cette valeur d'horodatage. Pour plus d'informations, voir[Versionnement](#versioning).
    * Si la requête inclut une contrainte &gt;, &gt;= ou = de la colonne timestamp, par exemple &timestamp&lt;=0, alorsERDDAP™renvoie les données des fichiers de données tels quels, sans traiter les commandes d'insertion et de suppression.
* À l'avenir, nous envisageons la construction d'outils (Par nous ? Par toi ?) pour travailler avec ces ensembles de données. Par exemple, il pourrait y avoir un script qui lit les fichiers bruts, applique une équation d'étalonnage différente, et génère/mise à jour un ensemble de données différent avec cette information dérivée. Notez que le script peut obtenir les données originales via une requête àERDDAP™  (qui obtient les données dans le format de fichier qui est facile pour le script de travailler avec) et générer / mettre à jour le nouvel ensemble de données via .insert "demandes" àERDDAP. Le script n'a pas besoin d'un accès direct aux fichiers de données ; il peut être sur n'importe quel ordinateur d'auteur autorisé.
     

#### Informations détaillées sur EDDTableFromHttpGet{#detailed-information-about-eddtablefromhttpget} 

Les thèmes sont les suivants:

*   [Ne changez pas l'installation &#33;](#dont-change-the-setup)
*   [CRUD](#crud)
*   [Demandes non valides](#invalidrequests)
*   [Vitesse](#httpget-speed)
*   [Robuste](#robust)
*   [Fiabilité du système](#system-reliability)
*   [Versionnement](#versioning)
*   ["Et HTTP PUT et DELETE ?"](#https-put-and-delete)
*   [Annexe](#httpget-notes)
*   [Merci à CHORDS pour l'idée de base.](#thanks)

Voici les informations détaillées:

##### Ne changez pas l'installation &#33;{#dont-change-the-setup} 
Une fois que l'ensemble de données a été créé et que vous y avez ajouté des données :

* N'ajoutez ou n'en retirez pasdataVariablePar.
* Ne changez passourceNameoudestinationNamedesdataVariablePar.
* Ne changez pas les données Type dedataVariablePar. Mais vous pouvez changerdataVariableLes métadonnées.
* Ne changez pashttpGetRequired Variables attribut global.
* Ne changez pashttpattribut global GetDirectoryStructure.

Si vous devez changer l'une de ces choses, créez un nouvel ensemble de données et transférez toutes les données dans le nouvel ensemble de données.
     
##### CRUD{#crud} 
En informatique, les quatre commandes fondamentales pour travailler avec un ensemble de données sont:[CRÉER, LIRE, MISE À JOUR, DELETER (CRUD) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). SQL, le langage pour travailler avec les bases de données relationnelles, a l'équivalent en INSERT, SELECT, UPDATE et DELETE. Dans EDDTableFromHttpGet,

* .insert est une combinaison de CREATE et de MISE À JOUR.
* .delete est DELETE.
* Le système régulier de demande de sous-ensembles de données est LIRE.

Ainsi, EDDTableFromHttpGet supporte toutes les commandes fondamentales pour travailler avec un jeu de données.
     
* Les requêtes .insert ou .delete sans erreur retourneront le code de statut HTTP=200 et un objet JSON, p.ex.,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
Les deux valeurs d'horodatage se rapportent à la même milliseconde, soit la milliseconde qui sera stockée dans la variable d'horodatage pour les lignes de données qui ont été insérées ou supprimées.ERDDAP™ne changera pas le nom et le formatage de ces paires de valeurs clés à l'avenir.ERDDAP™peut ajouter des paires de valeurs clés supplémentaires à l'objet JSON à l'avenir.
     
##### Demandes non valides{#invalidrequests} 
Les requêtes .insert ou .delete non valides retourneront un code de statut d'erreur HTTP autre que status=200 et aucun changement ne sera apporté à l'ensemble de données. Cela comprend les requêtes avec des informations d'auteur incorrectes, des noms de variables incorrectes, des longueurs de tableau différentes pour différentes variables, des variables requises manquantes, des valeurs variables requises manquantes, etc. Si la requête implique plus d'un fichier de données, il est possible que la partie de la requête réussira et la partie échouera. Cependant, cela ne devrait pas être un problème si le capteur qui envoie la demande traite toute défaillance comme une défaillance complète. Par exemple, si vous ditesERDDAP™à insérer (ou supprimer) les mêmes données deux fois de suite, le pire est que cette information est stockée deux fois, rapprochée dans le fichier journal. Il est difficile de voir comment cela pourrait causer des ennuis.
     
##### HttpGet Speed{#httpget-speed} 
Pour les requêtes .insert ou .delete (sans compterhttpFrais généraux) , billepark chiffres la vitesse de .insert ou .delete sont
1ms par .insert avec 1 ligne de données
2ms par .insert avec 10 lignes de données dans les tableaux (\\[\\])   
3ms par .insert avec 100 lignes de données dans des tableaux (\\[\\])   
13ms par .insert avec 1000 lignes de données dans des tableaux (\\[\\])   
De toute évidence, les tableaux sont la clé de[haut débit](#httpget-speed). Sans tableaux, il sera difficile d'insérer ou de supprimer plus de 8 lignes de données par seconde d'un auteur distant. (à cause de tous les frais généraux du réseau) . Avec les tableaux, il sera facile d'insérer ou de supprimer plus de 1000 lignes de données par seconde à partir d'un capteur distant.

Avec de très grandes quantités de données par demande, vous frapperez la limite de Tomcat à la longueur maximale de la requête (par défaut est 8KO?) , mais cela peut être augmenté en éditant le réglage maxHttpHeaderSize dans votre *Tomcat* HTTP/1.1 de /conf/server.xml Entrée du connecteur.

QuandERDDAP™lit les données CSV des lignes JSON (journal) fichiers, il ya une petite pénalité de temps par rapport à la lecture des fichiers de données binaires. Nous avons estimé que cette pénalité de temps lors de la lecture était un prix raisonnable à payer pour la vitesse et la robustesse du système lors de l'écriture des données (qui est de première importance) .

##### SSD{#ssd} 
[Pour plus de vitesse,](#ssd)utiliser a[Lecteur Solid State (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive)pour stocker les données. Ils ont un temps d'accès aux fichiers beaucoup plus rapide (&lt;0,1ms) que les disques durs (3 à 12 ms) . Ils ont également un taux de transfert de données plus rapide (200 à 2500 Mo/s) que les disques durs (~200 Mo/s) . Leur coût a considérablement baissé ces dernières années. Bien que les premiers SSD aient eu des problèmes après un grand nombre d'écritures à un bloc donné, ce problème est maintenant grandement réduit. Si vous utilisez simplement le SSD pour écrire les données une fois puis le lire plusieurs fois, même un SSD de qualité consommateur (qui est beaucoup moins cher qu'un SSD de qualité entreprise) ça devrait durer longtemps.
    
##### Robuste{#robust} 
Nous avons essayé de rendre ce système aussi facile à travailler et aussi robuste que possible.
* Le système est conçu pour avoir plusieurs fils (Par exemple, le capteur, un script QC automatisé, et un humain) travailler simultanément sur le même ensemble de données et même le même fichier. Une grande partie de cela est rendue possible en utilisant une approche de fichier journal pour stocker les données et en utilisant un type de fichier très simple,[JSON Fichiers CSV de lignes](https://jsonlines.org/examples/), pour stocker les données.
* Un autre avantage énorme pour JSON Lines CSV est que si un fichier ne devient jamais corrompu (Par exemple, invalide en raison d'une erreur sur une ligne) , il est facile d'ouvrir le fichier dans un éditeur de texte et de résoudre le problème.
* Un autre avantage est, s'il y a une erreur sur une ligne dans un fichier, le système peut encore lire toutes les données sur les lignes avant et après la ligne d'erreur. Et le système peut encore enregistrer des informations supplémentaires .insert et .delete.
* Un énorme avantage d'utiliser des fichiers standard accessibles par admin (comparé à une base de données relationnelle ou à Cassandra ou à un autre logiciel) : Il n'y a pas d'autre logiciel qui doit être maintenu et qui doit être exécuté pour stocker ou récupérer des données. Et il est facile de sauvegarder les fichiers standard à tout moment et de manière progressive parce que les données sont en morceaux (Après un certain temps, seul le fichier courant de chaque station changera) . En revanche, il faut beaucoup d'efforts et de temps pour faire des fichiers de sauvegarde externes à partir de bases de données et de Cassandra.
         
##### Fiabilité du système{#system-reliability} 
Il est raisonnable d'attendre un serveur avecERDDAP™99,9 % de temps d'arrêt -- c'est environ 9 heures d'arrêt par année (Mais vous pouvez l'utiliser en une mauvaise nuit &#33;) .
Si vous avez de la diligence et de la chance, vous pourriez obtenir 99,99 % de disponibilité (53 minutes d'arrêt par an) , puisque quelques redémarrages pour les mises à jour prendra beaucoup de temps.
Vous devriez prendre des mesures extrêmes (un serveur de sauvegarde séparé, une alimentation électrique non interruptible, la climatisation de sauvegarde, 24x7x365 personnel pour surveiller le site, etc.) d'avoir une chance mince à 99.999% uptime (5,25 minutes d'arrêt par an) . Même alors, il est extrêmement peu probable que vous atteignez 99,999% temps de disponibilité (ou même 99,99%) parce que les problèmes sont souvent hors de votre contrôle. Par exemple, Amazon Web Service et Google offrent des services Web incroyablement fiables, mais de grandes sections d'entre eux sont parfois en baisse pendant des heures.

Face à ça, tout le monde veutERDDAP™d'avoir 100 % de temps d'antenne, ou au moins les "six neuf" vantés (99.9999% temps d'arrêt égale 32 secondes de temps d'arrêt par an) Mais il n'y a aucun moyen que vous l'obteniez peu importe le temps, l'effort et l'argent que vous dépensez.

MaisERDDAP™La disponibilité n'est pas le vrai but ici. L'objectif est de construire une **système** , qui ne perd pas de données. C'est un problème solvable.

La solution est: construire la tolérance aux défauts dans le logiciel informatique qui envoie les données àERDDAP. Plus précisément, ce logiciel devrait maintenir une file d'attente de donnéesERDDAP. Lorsque des données sont ajoutées à la file d'attente, le logiciel doit vérifier la réponse deERDDAP. Si la réponse n'inclut pas les données reçues. Aucune erreur., alors le logiciel devrait laisser les données dans la file d'attente. Lorsque plus de données sont générées et ajoutées à la file d'attente, le logiciel devrait à nouveau essayer d'insérer les données dans la file d'attente. (Peut-être avec\\[\\]système) . Il réussira ou échouera. Si elle échoue, elle réessayera plus tard. Si vous écrivez le logiciel pour travailler de cette façon et si le logiciel est prêt à attendre quelques jours de données, vous avez en fait une bonne chance de télécharger 100% des données du capteur àERDDAP. Et vous l'aurez fait sans aller à de grands efforts ou dépenses.

\\[Rappel: On n'a pas réfléchi.[C'est ainsi que les réseaux informatiques atteignent la fiabilité.](https://en.wikipedia.org/wiki/Reliability_(computer_networking)) Les réseaux informatiques sont intrinsèquement peu fiables. Ainsi, lorsque vous transférez un fichier d'un ordinateur à un autre, le logiciel d'envoi sait/attend que certains paquets peuvent être perdus. S'il n'obtient pas une reconnaissance appropriée pour un paquet donné du récepteur, il renverra le paquet perdu. Avec cette approche, un logiciel d'expéditeur et de récepteur relativement simple peut construire un système de transfert de fichiers fiable sur un réseau peu fiable.\\]
    
##### Pourquoi JSON Lines fichiers CSV?&#33;{#why-json-lines-csv-files} 
EDDTableFromHttpGet utilise[JSON Fichiers CSV de lignes](https://jsonlines.org/examples/). pour stocker les données. Les raisons sont les suivantes:

* La raison principale est: La simplicité des fichiers JSON Lines CSV offre une façon rapide, facile et fiable de permettre à plusieurs threads d'écrire à un fichier donné (Par exemple, en synchronisant le nom du fichier) .
* Si un fichier JSON Lines CSV est devenu corrompu (Par exemple, invalide en raison d'une erreur sur une ligne) , EDDTableFromFromHttpGet peut encore lire toutes les données sur toutes les lignes avant et après la ligne d'erreur. Et le système .insert et .delete pourrait continuer à ajouter de nouvelles données au fichier de données.
* Parce que les fichiers JSON Lines CSV sont des fichiers ASCII, si un fichier est devenu corrompu, il serait facile de corriger (dans un éditeur de texte) .
* Prise en charge des lignes CSV par JSON Chaînes Unicode.
* JSON Lines CSV prend en charge les chaînes de longueur variable (ne se limite pas à une longueur maximale) .
* JSON Lines CSV prend en charge les entiers 64 bits (longs) .
* La nature formelle et la syntaxe supplémentaire de JSON Lines CSV (vs CSV de l'ancienne école) fournit une assurance supplémentaire qu'une ligne donnée n'a pas été corrompue.

Nous avons d'abord essayé d'utiliser.nc3 fichiers avec une dimension illimitée. Toutefois, il y a eu des problèmes:

* Le principal problème était: Il n'existe aucun moyen fiable de permettre à plusieurs threads d'écrire à un.nc3 fichier, même si les threads coopèrent en faisant les écritures de manière synchronisée.
* Si.nc3 fichier devient corrompu, le système .insert et .delete ne peut pas continuer à utiliser le fichier.
* Parce que les.nc3 fichiers sont binaires, si un fichier devient corrompu (ce qu'ils font à cause du problème multi-threading) ils sont extrêmement difficiles ou impossibles à réparer. Il n'y a pas d'outils pour aider à la réparation.
* CF n'a aucun moyen de spécifier l'encodage des chaînes, il n'y a donc aucun moyen officiel de soutenir Unicode, par exemple l'encodage UTF-8. Nous avons essayé d'obtenir des FC pour soutenir un attribut \\_Encoding, mais nous n'avons pu faire aucun progrès. (Unidata, à leur crédit, ne prend en charge l'attribut \\_Encoding.) 
*   .nc3 fichiers supportent uniquement les chaînes de longueur fixes. Encore une fois, nous avons essayé d'obtenirUnidatapour soutenir les chaînes de longueur variable, mais n'ont pu faire aucun progrès.
*   .nc3 fichiers ne prennent pas en charge une façon facile de distinguer les variables à caractère unique des variables à chaîne. Encore une fois, nous avons essayé d'obtenirUnidataà l'appui d'un système permettant de distinguer ces deux types de données, mais n'ont pu progresser.
*   .nc3 fichiers supportent uniquement les caractères 8 bits avec un encodage non spécifié. Encore une fois, nous avons essayé d'obtenirUnidatapour soutenir un système de spécification de l'encodage, mais n'ont pu faire aucun progrès.
*   .nc3 fichiers ne supportent pas les entiers 64 bits (longs) . Encore une fois, nous avons essayé d'obtenirUnidatade soutenir un système pour longtemps, mais n'ont pu faire aucun progrès.
         
##### Versionnement{#versioning} 
Parce que EDDTable DeHttp Obtenir un journal de toutes les modifications de l'ensemble de données avec l'horodatage et l'auteur de chaque changement, il peut rapidement recréer cet ensemble de données à tout moment. Dans un sens, il y a une version pour n'importe quel point dans le temps. Si la demande de données d'un utilisateur inclut un horodatage&lt;= contrainte, p.ex. &timestamp&lt;=2016-06-23T16:32:22.128Z (ou à tout moment) , mais aucune contrainte de l'auteur ou de la commande,ERDDAP™répondra à la demande en générant d'abord une version de l'ensemble de données à partir de ce moment-là. Alors,ERDDAP™applique les autres contraintes de l'utilisateur, comme pour toute autre demande de données deERDDAP. EDDTableFromHttpGet est configuré pour que ce processus soit très rapide et efficace, même pour les très gros ensembles de données.

De même, un utilisateur peut savoir quand l'ensemble de données a été mis à jour en demandant ...?timestamp&timestamp=max (horodatage) & distinct () 

Et pour toute demande de données, pour toute version de l'ensemble de données, les utilisateurs peuvent voir quel auteur a fait les changements, et quand ils les ont faits.

Ce système de version permet[Science reproductible](https://en.wikipedia.org/wiki/Reproducibility)parce que n'importe qui, à tout moment, peut demander des données de la version de l'ensemble de données à tout moment. Cette version à grain fin n'est pas possible avec tout autre système que nous connaissons. Le mécanisme sous-jacent est très efficace, car aucun espace de stockage supplémentaire n'est nécessaire, et les frais généraux de traitement sont vraiment minimes.

Tout le monde n'a pas besoin de ce type de version fine, mais elle est extrêmement utile, peut-être nécessaire, dans le contexte d'une grande organisation de gestion des données (Par exemple, OOI, Earth Cube, Data One, etNOAAL'INCE) où un ensemble de données peut avoir plusieurs auteurs (Par exemple, le capteur, un script QC automatisé et un éditeur humain) .

\\[Historique: Le besoin de ce type de version est apparu pour moi (Bob) lors de la lecture et de la discussion de l'IO en 2008. À l'époque, OOI avait un système lourd, lent et inefficace pour la version basée sur Git. Git est parfait pour ce qu'il a été conçu, mais pas ça. En 2008, alors que lors d'une discussion sur l'OI, j'ai conçu un vaste système d'alternative efficace à l'OI pour la gestion des données, y compris plusieurs des caractéristiques que j'ai ajoutées àERDDAP™Depuis lors, et y compris ce système de version. À ce moment-là et depuis, l'OIO s'est engagée à utiliser son système de version et ne s'est pas intéressée aux alternatives. En 2016, d'autres aspects de ce plan sont entrés en vigueur et j'ai commencé à le mettre en œuvre. Parce qu'il y a eu beaucoup d'interruptions pour travailler sur d'autres projets, je n'ai pas fini avant 2018. Même maintenant, je ne suis pas au courant de tout autre système de données scientifiques qui offre un accès aussi rapide et facile à une version des données à partir de n'importe quel moment dans le temps, pour changer fréquemment des ensembles de données. Les systèmes de fichiers simples n'offrent pas cela. Les bases de données relationnelles ne le font pas. Pas Cassandra.\\]
    
##### HTTPS Mettre et supprimer{#https-put-and-delete} 
*   ["Et HTTPS PUT et DELETE ?"](#https-put-and-delete)  
    [Protocole de transfert d'hypertexte (HTTP) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)est la base du World Wide Web et la raison pour laquelle les URL de page Web commencent par " http://" ou " https://" . HTTPS est HTTP avec une couche de sécurité supplémentaire. Chaque jour, navigateurs, scripts et programmes informatiques font des milliards de HTTP (S)   **Obtenez** demande d'obtenir des renseignements de sources éloignées. HTTP (S) comprend également d'autres[verbes](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), notamment PUT (pour pousser les données vers le serveur) et DELETE (à DELETE données du serveur) . Oui, PUT et DELETE sont la bonne façon d'insérer des données dans, et supprimer des données d'un ensemble de données via HTTP (S) . GET est pris en charge par chaque logiciel qui peut fonctionner avec HTTP (S) . GET est très facile à utiliser. Tout le monde sait déjà travailler avec GET et beaucoup savent utiliser POST (qui peuvent être utilisés essentiellement de la même manière que GET) , donc nous avons fait EDDTableFromHttpObtenez du travail avec GET et POST. Très peu de personnes (même quelques programmeurs informatiques) ont déjà travaillé avec PUT et DELETE. PUT et DELETE ne sont généralement supportés que par des langages informatiques, de sorte que leur utilisation nécessite un programme habile. Ainsi, PUT et DELETE sont généralement une approche beaucoup plus lourde étant donné la façon dont les outils ont évolué.
     
##### HttpObtenez des notes{#httpget-notes} 
*   [Annexe](#httpget-notes)
    * NumérodataVariablepeut avoir des donnéesType=char. Utilisez dataType=String à la place. Si vous avez vraiment besoin de dataType=char, envoyez un courriel à Chris. John à noaa.gov .
         
##### Je vous remercie.{#thanks} 
*   [Merci à CHORDS pour l'idée de base.](#thanks)  
L'idée de base pour EDDTableFromHttpGet (C'est-à-dire en utilisantHTTP GETdemande d'ajouter des données à un ensemble de données) est de chez UCAR (Chez NCAR ?)  [Services de données en temps réel hébergés dans le cloud (CHORDES) ](https://github.com/earthcubeprojects-chords)Projet. Le format des paramètres de la requête (répété *nom=valeur* , séparés par &'s) est le même format standard utilisé par les formulaires HTML sur les pages Web. C'est une idée simple et brillante et encore plus parce qu'elle se résille si parfaitement avecERDDAPLe système existant pour traiter les données tabulaires. L'idée est évidente dans le recul, mais je (Bob) n'y a pas pensé. EDDTableFromHttp Obtenir utilise cette idée de base, combinée avec nos idées de comment la mettre en œuvre, pour faire un système dansERDDAP™pour télécharger des données. Outre l'idée de base d'utiliser GET pour pousser les données dans le système, l'implémentation EDDTableFromHttpGet est entièrement différente et totalement indépendante de CHORDS et a différentes fonctionnalités (Par exemple, les fichiers journaux, le découpage des données, différents systèmes de sécurité, support CRUD, données reproductibles) . Notre exposition aux CHORDS n'était qu'un webinaire. Nous n'avons pas regardé leur code ni lu leur projet parce que nous savions immédiatement que nous voulions mettre en œuvre le système d'une manière différente. Mais nous leur sommes reconnaissants pour l'idée de base. La référence complète à CHORDS est
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Timbres, D. S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014) . Services de données en temps réel en nuage pour les géosciences (CHORDES) logiciels. UCAR/NCAR -- Laboratoire d'observation de la Terre.[ https://doi.org/10.5065/d6v1236q ](https://doi.org/10.5065/d6v1236q)  
     
### Tableau EDD deHyraxFichiers{#eddtablefromhyraxfiles} 
[ **Tableau EDD deHyraxFichiers** ](#eddtablefromhyraxfiles)  (déprécié) agrégats fichiers de données avec plusieurs variables, chacune avec une ou plusieurs dimensions partagées (par exemple, temps, altitude (ou profondeur) , latitude, longitude) , et servi par un[Hyrax OPeNDAPserveur](https://www.opendap.org/software/hyrax-data-server).

* Ce type de données est **DÉPREUVE** . La solution plus récente et plus générale est d'utiliser[cache Option FromUrl pour EDDTable Fichiers](#cachefromurl)  (ou une variante) , qui fait une copie locale des fichiers distants et sert les données des fichiers locaux. Les&lt;l'option cacheFromUrl&gt; peut être utilisée avec n'importe quel type de fichier de données tabulaires. **   
Si vous ne pouvez pas faire ça pour une raison quelconque, envoyez un courriel à Chris. John à noaa.gov .
S'il n'y a pas de plaintes avant 2020, ce type d'ensemble de données peut être supprimé. ** 
* Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez ensuite modifier cela pour l'ajuster.
* Dans la plupart des cas, chaque fichier a plusieurs valeurs pour le plus à gauche (première) par exemple, le temps.
* Les fichiers souvent (mais pas besoin de) ont une valeur unique pour les autres dimensions (Par exemple, altitude (ou profondeur) , latitude, longitude) .
* Les fichiers peuvent avoir des variables de caractères avec une dimension supplémentaire (Par exemple, nCaractéristiques) .
*   HyraxLes serveurs peuvent être identifiés par "/dods-bin/nph-dods/" ou "/opendap/" dans l'URL.
* Cette classe écran-crape leHyraxpages Web avec les listes de fichiers dans chaque répertoire. Pour cette raison, il est très spécifique au format actuel deHyraxpages Web. Nous allons essayer de nous adapterERDDAP™rapidement si/quand les versions futures deHyraxmodifier la liste des fichiers.
* Les&lt;Le paramètre fileDir&gt; est ignoré. Puisque cette classe télécharge et fait une copie locale de chaque fichier de données distant,ERDDAP™force le fichier Dir être *BigParent Directory* /copie/ *datasetID* - Oui.
* Pour&lt;sourceUrl&gt;, utilisez l'URL du répertoire de base de l'ensemble de donnéesHyraxserveur, par exemple,
    &lt;sourceUrl&gt; http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/ &lt;/sourceUrl&gt;
     (Mais mettez-le sur une ligne)   (Désolé, ce serveur n'est plus disponible) .
LessourceUrlpage Web a généralement "OPeNDAPIndex du serveur\\[nom du répertoire\\]" en haut.
* Puisque cette classe télécharge toujours et fait une copie locale de chaque fichier de données distant, vous ne devriez jamais emballer ce jeu de données dans[EDDTableCopy](#eddtablecopy).
* Voir la superclasse de cette classe,[EDDTableFromFiles](#eddtablefromfiles), pour des informations sur le fonctionnement de cette classe et comment l'utiliser.
* Voir les exemples 1D, 2D, 3D et 4D pour[EDDTableFromNcFiles](#eddtablefromncfiles).
     
### EDDTableFromInvalidCRAFiles{#eddtablefrominvalidcrafiles} 
[ **EDDTableFromInvalidCRAFiles** ](#eddtablefrominvalidcrafiles)données agrégéesNetCDF  (v3 ou v4)  .ncfichiers qui utilisent une variante spécifique, non valide, du DSG Contiguous Array (ARC) fichiers. Bien queERDDAP™prend en charge ce type de fichier, c'est un type de fichier invalide que personne ne devrait commencer à utiliser. Les groupes qui utilisent actuellement ce type de fichier sont fortement encouragés à utiliserERDDAP™pour générer des fichiers valides de l'ARC DSG des FC et cesser d'utiliser ces fichiers.

Détails: Ces fichiers ont plusieurs variables row\\_size, chacune avec un attribut sample\\_dimension. Les fichiers ne sont pas des fichiers standard CF parce que l'échantillon multiple (obs) les dimensions doivent être décodées et reliées les unes aux autres avec cette règle supplémentaire et cette promesse qui ne fait pas partie de la spécification CF DSG: "vous pouvez associer une valeur donnée par exemple, la température (dimension temp\\_obs) avec une valeur de profondeur donnée (z\\_obs dimension, la dimension avec le plus de valeurs) , parce que: la ligne de température\\_size (pour une coulée donnée) sera soit 0 soit égal à la ligne de profondeur correspondante\\_size (pour ce plâtre)   (C'est la règle.) . Donc, si la ligne de température\\_size n'est pas 0, alors les valeurs de température n pour ce casting se rapportent directement aux valeurs de profondeur n pour ce casting (C'est la promesse.) ."

Autre problème avec ces fichiers : la variable Principal\\_Investigator row\\_size n'a pas d'attribut sample\\_dimension et ne suit pas la règle ci-dessus.

Des exemples de fichiers pour ce type d'ensemble de données peuvent être trouvés à https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Ce serveur n'est plus disponible de manière fiable\\].

Voir la superclasse de cette classe,[EDDTableFromFiles](#eddtablefromfiles), pour des informations sur le fonctionnement de cette classe et comment l'utiliser.

Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez ensuite modifier cela pour l'ajuster.

La première chose Générer des ensembles de données Xml fait pour ce type d'ensemble de données après que vous répondez aux questions est imprimer la structure ncdump-like du fichier échantillon. Donc, si vous entrez quelques réponses fâcheuses pour la première boucle à travers GenerateDatasets Xml, au moins tu pourras voir siERDDAP™peut lire le fichier et voir quelles dimensions et variables sont dans le fichier. Ensuite, vous pouvez donner de meilleures réponses pour la deuxième boucle à travers GenerateDatasetsXml.
 
### Tableau EDD deJsonlCSVFiles{#eddtablefromjsonlcsvfiles} 
[ **Tableau EDD deJsonlCSVFiles** ](#eddtablefromjsonlcsvfiles)données agrégées[JSON Fichiers CSV de lignes](https://jsonlines.org/examples/). Voir la superclasse de cette classe,[EDDTableFromFiles](#eddtablefromfiles), pour des informations sur le fonctionnement de cette classe et comment l'utiliser.

* Comme le dit jsonlines.org, ce format est "Mieux vaut que CSV" (et légalement, en tant qu'employé fédéral, je ne peux pas être d'accord ou en désaccord avec eux -- à quel point est-ce fou?) . Le CSV n'a jamais été officiellement défini et est entravé par les bagages historiques liés à sa connexion aux programmes de tableurs originaux. JSON Lines CSV, en comparaison, est entièrement défini et bénéficie de sa connexion à la norme JSON largement utilisée, qui à son tour bénéficie de sa connexion àJavaScript etJava. Notamment, il y a un support complet pour les nombres entiers longs et pour les caractères Unicode dans les chaînes, et un moyen clair d'inclure d'autres caractères spéciaux (notamment les onglets et les nouvelles lignes) dans les cordes.
    
Ce format est particulièrement bon pour les ensembles de données où vous devez ajouter périodiquement des lignes supplémentaires à la fin d'un fichier de données donné. Pour cette raison et d'autres (voir ci-dessus) ,[EDDTableFromHttpGet](#eddtablefromhttpget)utilise des fichiers Json Lines CSV pour le stockage des données.
    
* Les fichiers d'entrée sont supposés être encodés UTF-8. Toutefois, compte tenu du *dddd* format pour le codage de caractères spéciaux (Par exemple, \\u20ac est l'encodage du caractère Euro) , vous avez la possibilité d'écrire les fichiers de sorte qu'ils ne contiennent que des caractères ASCII 7 bits en utilisant \\u *dddd* pour coder tous les caractères au-dessus de #127.
     
* Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez ensuite modifier cela pour l'ajuster.
    
La première chose que GenerateDatasetsXml fait pour ce type de données après avoir répondu aux questions est d'imprimer la structure ncdump-like du fichier échantillon. Donc, si vous entrez quelques réponses fâcheuses pour la première boucle à travers GenerateDatasets Xml, au moins tu pourras voir siERDDAP™peut lire le fichier et voir quelles dimensions et variables sont dans le fichier. Ensuite, vous pouvez donner de meilleures réponses pour la deuxième boucle à travers GenerateDatasetsXml.
    
* MISE EN GARDE: QuandERDDAP™lit JSON Fichiers de données CSV de lignes, s'il trouve une erreur sur une ligne donnée (Par exemple, nombre incorrect d'articles) , il enregistre un message d'avertissement (C'est une mauvaise ligne. (s) de données" ... avec une liste des mauvaises lignes sur les lignes suivantes) aux[fichier log.txt](/docs/server-admin/additional-information#log)puis continue à lire le reste du fichier de données. Ainsi, il est de votre responsabilité de regarder périodiquement (ou écrire un script pour le faire) pour ce message dans le journal. txt afin que vous puissiez résoudre les problèmes dans les fichiers de données.ERDDAP™est configuré de cette façon afin que les utilisateurs puissent continuer à lire toutes les données valides disponibles, même si certaines lignes du fichier ont des défauts.
     
### EDDTableFromMultidimNcFiles{#eddtablefrommultidimncfiles} 
[ **EDDTableFromMultidimNcFiles** ](#eddtablefrommultidimncfiles)données agrégéesNetCDF  (v3 ou v4)  .nc  (ou[.ncml](#ncml-files)) fichiers avec plusieurs variables, chacune avec une ou plusieurs dimensions partagées. Les fichiers peuvent avoir des variables de caractères avec ou sans dimension supplémentaire (par exemple, STRING14) . Voir la superclasse de cette classe,[EDDTableFromFiles](#eddtablefromfiles), pour des informations sur le fonctionnement de cette classe et comment l'utiliser.

* Si les fichiers sont des variantes multidimensionnelles CF DSG, utilisez ce type d'ensemble de données au lieu de[EDDTableFromNcCFFiles](#eddtablefromncfiles).
     
* Pour les nouveaux ensembles de données tabulaires.ncfichiers, utilisez cette option avant d'essayer l'ancienne[EDDTableFromNcFiles](#eddtablefromncfiles). Voici quelques avantages de cette classe :
    * Cette classe peut lire plus de variables à partir d'une plus grande variété de structures de fichiers. Si vous spécifiez DimensionsCSV (une liste de noms de dimension séparés par des virgules) dans Générer des ensembles de données Xml (ou&lt;dimensionsCSV&gt; dans ledatasets.xmlinfo pour l'un de ces ensembles de données), puisERDDAP™ne lira que les variables dans les fichiers sources qui utilisent certaines ou toutes ces dimensions, plus toutes les variables scalaires. Si une dimension est dans un groupe, vous devez spécifier son nom complet, par exemple, " *groupNom/dimensionNom* ".
    * Cette classe peut souvent rejeter les fichiers très rapidement s'ils ne correspondent pas aux contraintes d'une requête. Ainsi, la lecture des données provenant de grandes collections ira souvent beaucoup plus vite.
    * Cette classe gère les variables vrai char (Variables autres que les variables fixes) correctement.
    * Cette classe peut couper les variables de chaîne lorsque le créateur n'a pas utilisé Netcdf-java's writeStrings (qui ajoute le char #0 pour marquer la fin de la chaîne) .
    * Cette classe est meilleure pour traiter des fichiers individuels qui manquent de certaines variables ou dimensions.
    * Cette classe peut supprimer les blocs de lignes avec des valeurs manquantes comme spécifié pour[FC Géométries d'échantillonnage discrètes (DSG) Fichiers d'array multidimensionnels incomplets](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)  
         
* Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez ensuite modifier cela pour l'ajuster.
    
La première chose que GenerateDatasetsXml fait pour ce type de données après avoir répondu aux questions est d'imprimer la structure ncdump-like du fichier échantillon. Donc, si vous entrez quelques réponses fâcheuses pour la première boucle à travers GenerateDatasets Xml, au moins tu pourras voir siERDDAP™peut lire le fichier et voir quelles dimensions et variables sont dans le fichier. Ensuite, vous pouvez donner de meilleures réponses pour la deuxième boucle à travers GenerateDatasetsXml.
    
Groupe -- Générer des ensembles de données Xml va demander un "Groupe". Vous pouvez entrer "" pour le faire chercher n'importe quel / tous les groupes, " *certains Groupe* " ou " *un groupe ou un sous-groupe* " pour qu'il recherche un groupe spécifique, ou "\\[racine\\]" pour qu'il recherche juste le groupe racine. La chaîne "Groupe" devient&lt;groupe&gt; dansdatasets.xmlinfo pour l'ensemble de données (Bien que "\\[racine\\]" devient "") .
    
DimensionsCSV -- Générer des ensembles de données Xml demandera une chaîne "DimensionsCSV". Il s'agit d'une liste de valeurs séparées par des virgules des noms de sources d'un ensemble de dimensions. Générer des ensembles de données Xml ne lira que les variables de données dans l'échantillon.ncfichiers qui utilisent certaines ou toutes ces dimensions (et aucune autre dimension) , plus toutes les variables scalaires dans le fichier, et faire l'ensemble de données à partir de ces variables de données. Si une dimension est dans un groupe, vous devez spécifier son nom complet, par exemple, " *groupNom/dimensionNom* ".
Si vous ne spécifiez rien (une chaîne vide) , Générer des ensembles de données Xml cherchera les variables avec les plus de dimensions, sur la théorie qu'ils seront les plus intéressants, mais il peut y avoir des moments où vous voudrez faire un ensemble de données d'un autre groupe de variables de données qui utilise un autre groupe de dimensions.
Si vous indiquez simplement un nom de dimension qui n'existe pas (Par exemple, NO\\_MATCH) ,ERDDAP™trouvera simplement toutes les variables scalaires.
La chaîne "DimensionsCSV" devient&lt;dimensionsCSV&gt; dans ledatasets.xmlinfo pour l'ensemble de données.
    
#### TraitementDimensionsAs{#treatdimensionsas} 
Il y a une catégorie d'invalides.ncfichiers (parce qu'ils ne suivent pas les règles des FC) dont les dimensions sont multiples (Par exemple, lat, lon, heure) quand ils auraient dû utiliser une seule dimension (Par exemple, heure) Par exemple:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
EDDTableFromMultidimNcFiles a une fonctionnalité spéciale pour traiter ces fichiers: si vous ajoutez l'attribut global "treatDimensionsAs" aux ensembles de données globaladdAttributesTu peux le direERDDAP™pour traiter certaines dimensions (Par exemple, lat et lon) comme s'ils étaient une autre dimension (Par exemple, heure) . La valeur de l'attribut doit être une liste séparée par des virgules précisant les dimensions "à partir" et ensuite la dimension "à", par exemple,
<att name="treatDimensionsAs">Lat, lon, heure</att>  
AlorsERDDAP™lira le fichier comme si :
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
Bien sûr, la taille actuelle de chacune des dimensions de la liste doit être la même; sinon,ERDDAP™traitera le fichier comme un « fichier mauvais ».

Notez que ces fichiers sont invalides parce qu'ils ne suivent pas les règles des FC. Alors mêmeERDDAP™peut les lire, nous vous recommandons fortement de ne pas créer de fichiers comme celui-ci parce que d'autres outils logiciels basés sur les FC ne seront pas en mesure de les lire correctement. Si vous avez déjà de tels fichiers, nous vous recommandons fortement de les remplacer par des fichiers valides dès que possible.
    
### EDDTableFromNcFiles{#eddtablefromncfiles} 
[ **EDDTableFromNcFiles** ](#eddtablefromncfiles)données agrégéesNetCDF  (v3 ou v4)  .nc  (ou[.ncml](#ncml-files)) fichiers et[Zarr](https://github.com/zarr-developers/zarr-python)fichiers (à partir de la version 2.25) avec plusieurs variables, chacune avec une dimension partagée (par exemple, le temps) ou plusieurs dimensions partagées (par exemple, temps, altitude (ou profondeur) , latitude, longitude) . Les fichiers doivent avoir les mêmes noms de dimension. Un fichier donné peut avoir plusieurs valeurs pour chacune des dimensions et les valeurs peuvent être différentes dans différents fichiers sources. Les fichiers peuvent avoir des variables de caractères avec une dimension supplémentaire (par exemple, STRING14) . Voir la superclasse de cette classe,[EDDTableFromFiles](#eddtablefromfiles), pour des informations sur le fonctionnement de cette classe et comment l'utiliser.

Les fichiers Zarr ont un comportement légèrement différent et nécessitent soit le fichierNameRegex ou le cheminRegex pour inclure "zarr".

* Si.ncfichiers utilisent l'un des[FC Géométries d'échantillonnage discrètes (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)formats de fichiers, essayez d'utiliser[EDDTableFromNcCFFiles](#eddtablefromncfiles)avant d'essayer ça.
     
* Pour les nouveaux ensembles de données tabulaires.ncfichiers, essayez le nouveau[EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)D'abord.
     
* Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez ensuite modifier cela pour l'ajuster.
    
La première chose que GenerateDatasetsXml fait pour ce type de données après avoir répondu aux questions est d'imprimer la structure ncdump-like du fichier échantillon. Donc, si vous entrez quelques réponses fâcheuses pour la première boucle à travers GenerateDatasets Xml, au moins tu pourras voir siERDDAP™peut lire le fichier et voir quelles dimensions et variables sont dans le fichier. Ensuite, vous pouvez donner de meilleures réponses pour la deuxième boucle à travers GenerateDatasetsXml.
    
DimensionsCSV -- Générer des ensembles de données Xml demandera une chaîne "DimensionsCSV". Il s'agit d'une liste de valeurs séparées par des virgules des noms de sources d'un ensemble de dimensions. Générer des ensembles de données Xml trouvera les variables de données dans.ncfichiers qui utilisent une partie ou la totalité de ces dimensions, plus toutes les variables scalaires, et font l'ensemble de données de ces variables de données. Si vous ne spécifiez rien (une chaîne vide) , Générer des ensembles de données Xml cherchera les variables avec les plus de dimensions, sur la théorie qu'ils seront les plus intéressants, mais il peut y avoir des moments où vous voudrez faire un ensemble de données d'un autre groupe de variables de données qui utilise un autre groupe de dimensions.
    
* Exemple 1D : Les fichiers 1D sont quelque peu différents des fichiers 2D, 3D, 4D, ....
    * Vous pourriez avoir un ensemble de.ncfichiers de données où chaque fichier a une valeur d'un mois de données d'une bouée de dérive.
    * Chaque fichier aura 1 dimension, par exemple, le temps (taille =\\[Nombreux\\]) .
    * Chaque fichier aura une ou plusieurs variables 1D qui utilisent cette dimension, par exemple, temps, longitude, latitude, température de l'air, ....
    * Chaque fichier peut avoir des variables de caractères 2D, par exemple, avec des dimensions (temps, nCaractères) .
         
* Exemple 2D :
    * Vous pourriez avoir un ensemble de.ncfichiers de données où chaque fichier a une valeur d'un mois de données d'une bouée de dérive.
    * Chaque fichier aura 2 dimensions, par exemple, le temps (taille =\\[Nombreux\\]) et id (taille = 1) .
    * Chaque fichier aura 2 variables 1D avec les mêmes noms que les dimensions et en utilisant la même dimension de nom, par exemple, le temps (heure) , id (id) . Ces variables 1D devraient être incluses dans la liste&lt;dataVariable&gt; est dans le XML du jeu de données.
    * Chaque fichier aura une ou plusieurs variables 2D, par exemple, longitude, latitude, température de l'air, température de l'eau, ...
    * Chaque fichier peut avoir des variables de caractères 3D, par exemple, avec des dimensions (temps,id,nCaractères) .
         
* Exemple 3D :
    * Vous pourriez avoir un ensemble de.ncfichiers de données où chaque fichier a une valeur d'un mois de données d'une bouée fixe.
    * Chaque fichier aura 3 dimensions, par exemple, le temps (taille =\\[Nombreux\\]) , lat (taille = 1) et (taille = 1) .
    * Chaque fichier aura 3 variables 1D avec les mêmes noms que les dimensions et en utilisant la même dimension de nom, par exemple, le temps (heure) , lat (est) Autres (Autres) . Ces variables 1D devraient être incluses dans la liste&lt;dataVariable&gt; est dans le XML du jeu de données.
    * Chaque fichier aura une ou plusieurs variables 3D, par exemple, température de l'air, température de l'eau, ...
    * Chaque fichier peut avoir des variables de caractères 4D, par exemple, avec des dimensions (temps, lat,lon,nCaractères) .
    * Le nom du fichier pourrait avoir le nom de la bouée dans le nom du fichier.
         
* Exemple 4D :
    * Vous pourriez avoir un ensemble de.ncfichiers de données où chaque fichier a une valeur d'un mois de données d'une station. À chaque point de temps, la station prend des lectures à une série de profondeurs.
    * Chaque fichier aura 4 dimensions, par exemple, le temps (taille =\\[Nombreux\\]) , profondeur (taille =\\[Nombreux\\]) , lat (taille = 1) et (taille = 1) .
    * Chaque fichier aura 4 variables 1D avec les mêmes noms que les dimensions et en utilisant la même dimension de nom, par exemple, le temps (heure) , profondeur (profondeur) , lat (est) Autres (Autres) . Ces variables 1D devraient être incluses dans la liste&lt;dataVariable&gt; est dans le XML du jeu de données.
    * Chaque fichier aura une ou plusieurs variables 4D, par exemple, température de l'air, température de l'eau, ...
    * Chaque fichier peut avoir des variables de caractères 5D, par exemple, avec des dimensions (temps, profondeur, lat,lon,nCaractéristiques) .
    * Le nom du fichier pourrait avoir le nom de la bouée dans le nom du fichier.
         
### EDDTableFromNcCFFiles{#eddtablefromnccffiles} 
[ **EDDTableFromNcCFFiles** ](#eddtablefromnccffiles)données agrégéesNetCDF  (v3 ou v4)  .nc  (ou[.ncml](#ncml-files)) fichiers qui utilisent un des formats de fichiers spécifiés par le[FC Géométries d'échantillonnage discrètes (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Convention. Voir la superclasse de cette classe,[EDDTableFromFiles](#eddtablefromfiles), pour des informations sur le fonctionnement de cette classe et comment l'utiliser.

Pour les fichiers utilisant l'une des variantes multidimensionnelles CF DSG, utiliser[EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)à la place.

Les conventions du DSG des FC définissent des dizaines de formats de fichiers et comportent de nombreuses variantes mineures. Cette classe traite de toutes les variations dont nous sommes conscients, mais nous avons peut-être manqué une (ou plus) . Donc, si cette classe ne peut pas lire les données de vos fichiers CF DSG, s'il vous plaît[solliciter un soutien supplémentaire](/docs/intro#support).

Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez ensuite modifier cela pour l'ajuster.
 
### EDDTableFromNccsvFiles{#eddtablefromnccsvfiles} 
[ **EDDTableFromNccsvFiles** ](#eddtablefromnccsvfiles)données agrégées[NCCSV](/docs/user/nccsv-1.00)Fichiers ASCII .csv. Voir la superclasse de cette classe,[EDDTableFromFiles](#eddtablefromfiles), pour des informations sur le fonctionnement de cette classe et comment l'utiliser.

* Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez ensuite modifier cela pour l'ajuster.
    
La première chose que GenerateDatasetsXml fait pour ce type de données après avoir répondu aux questions est d'imprimer la structure ncdump-like du fichier échantillon. Donc, si vous entrez quelques réponses fâcheuses pour la première boucle à travers GenerateDatasets Xml, au moins tu pourras voir siERDDAP™peut lire le fichier et voir quelles dimensions et variables sont dans le fichier. Ensuite, vous pouvez donner de meilleures réponses pour la deuxième boucle à travers GenerateDatasetsXml.
    
* MISE EN GARDE: QuandERDDAP™lit les fichiers de données CCNSV, s'il trouve une erreur sur une ligne donnée (Par exemple, nombre incorrect d'articles) , il enregistre un message d'avertissement (C'est une mauvaise ligne. (s) de données" ... avec une liste des mauvaises lignes sur les lignes suivantes) aux[fichier log.txt](/docs/server-admin/additional-information#log)puis continue à lire le reste du fichier de données. Ainsi, il est de votre responsabilité de regarder périodiquement (ou écrire un script pour le faire) pour ce message dans le journal. txt afin que vous puissiez résoudre les problèmes dans les fichiers de données.ERDDAP™est configuré de cette façon afin que les utilisateurs puissent continuer à lire toutes les données valides disponibles, même si certaines lignes du fichier ont des défauts.
     
### EDDTableFromNOS{#eddtablefromnos} 
[ **EDDTableFromNOS** ](#eddtablefromnos)  (DÉPREUVE) gère les données d'unNOAA [NOS](https://opendap.co-ops.nos.noaa.gov/axis/)source, qui utilise[SOAP+XML](https://www.w3schools.com/xml/xml_soap.asp)pour les demandes et réponses. Il est très spécifique àNOAANOS est XML. Voir l'échantillon EDDTableFromNOS dataset2.xml.
 
### EDDTableFromOBIS{#eddtablefromobis} 
[ **EDDTableFromOBIS** ](#eddtablefromobis)gère les données d'un système d'information biogéographique océanique (OBIS) serveur (était http://www.iobis.org  ) . Il est possible qu'il n'y ait plus de serveurs actifs qui utilisent ce type de serveur OBIS désormais obsolète.

* Les serveurs OBIS attendent une requête XML et retournent une réponse XML.
* Parce que tous les serveurs OBIS servent les mêmes variables de la même manière (était http://iobis.org/tech/provider/questions ) , vous n'avez pas à spécifier beaucoup pour configurer un ensemble de données OBIS dansERDDAP.
* Vous devez inclure un "creator\\_email" attribut dans le mondeaddAttributes, puisque cette information est utilisée dans la licence. Une adresse email appropriée peut être trouvée en lisant la réponse XML de la sourceURL.
* Vous pouvez ou ne pas être en mesure d'obtenir l'attribut global [&lt;subsetVariables&gt;] (#sous-setvariables) travailler avec un serveur OBIS donné. Si vous essayez, essayez juste une variable (par exemple, nom scientifique ou genre) .
#### EDDTableFromOBIS squelette XML{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromParquetFiles{#eddtablefromparquetfiles} 
[ **EDDTableFromParquetFiles** ](#eddtablefromparquetfiles)gère les données de[Parquet](https://parquet.apache.org/). Voir la superclasse de cette classe,[EDDTableFromFiles](#eddtablefromfiles), pour des informations sur le fonctionnement de cette classe et comment l'utiliser.

* Parquet est conçu pour compresser très efficacement, donc il peut vous donner des tailles de fichiers plus petites que les autres formats.
* Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez ensuite modifier cela pour l'ajuster.
* MISE EN GARDE: QuandERDDAP™lit les fichiers de données Parquet, s'il trouve une erreur sur une ligne donnée (Par exemple, nombre incorrect d'articles) , il enregistre un message d'avertissement (C'est une mauvaise ligne. (s) de données" ... avec une liste des mauvaises lignes sur les lignes suivantes) aux[fichier log.txt](/docs/server-admin/additional-information#log)puis continue à lire le reste du fichier de données. Ainsi, il est de votre responsabilité de regarder périodiquement (ou écrire un script pour le faire) pour ce message dans le journal. txt afin que vous puissiez résoudre les problèmes dans les fichiers de données.ERDDAP™est configuré de cette façon afin que les utilisateurs puissent continuer à lire toutes les données valides disponibles, même si certaines lignes du fichier ont des défauts.
     
### Tableau EDD deSOS {#eddtablefromsos} 
[ **Tableau EDD deSOS** ](#eddtablefromsos)gère les données d'un service d'observation des capteurs (SUE/[SOS](https://www.ogc.org/standards/sos)) serveur.

* Ce type de données regroupe les données d'un groupe de stations qui sont toutes desservies par une seuleSOSserveur.
* Les stations servent toutes le même ensemble de variables (bien que la source pour chaque station n'ait pas à servir toutes les variables) .
*   SOSles serveurs attendent une requête XML et retournent une réponse XML.
* Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez ensuite modifier cela pour l'ajuster. Il n'est pas facile de générer l'ensemble de données XML pourSOSensembles de données à la main. Pour trouver les informations nécessaires, vous devez visitersourceUrl+" service =SOS&requête=GetCapabilities" dans un navigateur; regardez le XML; faites une requête GetObservation à la main; et regardez la réponse XML à la requête.
* Avec l'ajout occasionnel de nouveaux types deSOSles serveurs et les changements aux anciens serveurs, il devient plus difficile pourERDDAP™pour détecter automatiquement le type de serveur à partir des réponses du serveur. L'utilisation&lt;sosServerType&gt; (avec une valeur de IOOS\\_NDBC, IOOS\\_NOS,OOSTethysou WHI) est maintenant vivement recommandé. Si vous avez des problèmes avec des ensembles de données de ce type, essayez de ré-exécuter GenerateDatasets Xml pourSOSserveur. Générer Données Xml vous permettra d'essayer les différents&lt;sosServerType&gt; options jusqu'à ce que vous trouviez la bonne pour un serveur donné.
*   SOSAperçu général:
    * PEAU (Activation du Web du capteur) etSOS  (Service d'observation des capteurs) sont[Normes OpenGIS®](https://www.ogc.org/standards). Ce site Web contient les documents sur les normes.
    * LesOGCServices Web Spécification commune ver 1.1.0 (OGC06-121r3) couvre la construction des requêtes GET et POST (Voir section 7.2.3 et section 9) .
    * Si vous envoyez une demande getCapabilities xml à uneSOSserveur (sourceUrl+ "?service=SOS&requête=GetCapabilities") , vous obtenez un résultat xml avec une liste de stations et le Propriétés pour lesquelles ils ont des données.
    * Une propriété observée est une référence URI officielle à une propriété. Par exemple, urn:ogc:phénomène:longitude:wgs84 ou https://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
 
    * Une propriété observée n'est pas une variable.
    * Plus d'une variable peut avoir la même observation Biens (par exemple, insideTemp et dehors Temp aurait pu observer Biens https://mmisw.org/ont/cf/parameter/air\\_temperature ) .
    * Si vous envoyez une demande getObservation xml à uneSOSserveur, vous obtenez un résultat xml avec des descriptions des noms de champ dans la réponse, les unités de champ, et les données. Les noms de champs comprendront longitude, latitude, profondeur (Peut-être) Et l'heure.
    * ChaquedataVariablepour une table EDDSOSdoit inclure un attribut "observedProperty", qui identifie la propriétéobserved qui doit être demandée au serveur pour obtenir cette variable. Souvent, plusieursdataVariables énumérera la même propriété composite observée.
    * Le type de données pour chaquedataVariablene peut être spécifié par le serveur. Si c'est le cas, vous devez regarder les réponses de données XML du serveur et assigner [&lt;dataType&gt;s] (#type de données) dans leERDDAP™ensemble de donnéesdataVariabledéfinitions.
    *    (Au moment de l'écriture de cette) certainsSOSserveurs répondent aux requêtes getObservation pour plus d'un observé Propriété en retournant les résultats de la première des Propriétés observées. (Pas d'erreur &#33;) Voir la requête du paramètre constructeur Propriétés observéesSeparément.
* Tableau EDD deSOSajoute automatiquement
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
aux attributs globaux de l'ensemble de données lorsque l'ensemble de données est créé.
*   SOSles serveurs expriment généralement[unités](#units)avec[UCUM](https://unitsofmeasure.org/ucum.html)système. Les plusERDDAP™les serveurs expriment les unités avec le[UDUNITS](https://www.unidata.ucar.edu/software/udunits/)système. Si vous devez convertir entre les deux systèmes, vous pouvez utiliser[ERDDAP's service web pour convertir des unités UCUM en/à partirUDUNITS](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html).
#### Tableau EDD deSOSsquelette XML{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromThreddsFiles{#eddtablefromthreddsfiles} 
[ **EDDTableFromThreddsFiles** ](#eddtablefromthreddsfiles)  (déprécié) agrégats fichiers de données avec plusieurs variables, chacune avec une ou plusieurs dimensions partagées (par exemple, temps, altitude (ou profondeur) , latitude, longitude) , et servi par un[THÉRÈDESOPeNDAPserveur](https://www.unidata.ucar.edu/software/tds/).

* Ce type de données est **DÉPREUVE** . La solution plus récente et plus générale est d'utiliser[cache Option FromUrl pour EDDTable Fichiers](#cachefromurl)  (ou une variante) , qui fait une copie locale des fichiers distants et sert les données des fichiers locaux. Les&lt;l'option cacheFromUrl&gt; peut être utilisée avec n'importe quel type de fichier de données tabulaires de n'importe quelle source Web qui publie une liste de fichiers ressemblant à un répertoire. **   
Si vous ne pouvez pas faire ça pour une raison quelconque, envoyez un courriel à Chris. John à noaa.gov .
S'il n'y a pas de plaintes avant 2020, ce type d'ensemble de données peut être supprimé. ** 
* Nous recommandons fortement l'utilisation de[Générer des ensembles de données Programme Xml](#generatedatasetsxml)pour faire une ébauche de ladatasets.xmlun morceau pour cet ensemble de données. Vous pouvez ensuite modifier cela pour l'ajuster.
* Dans la plupart des cas, chaque fichier a plusieurs valeurs pour le plus à gauche (première) par exemple, le temps.
* Les fichiers souvent (mais pas besoin de) ont une valeur unique pour les autres dimensions (Par exemple, altitude (ou profondeur) , latitude, longitude) .
* Les fichiers peuvent avoir des variables de caractères avec une dimension supplémentaire (Par exemple, nCaractéristiques) .
* Les serveurs THREDS peuvent être identifiés par les "/thredds/" dans les URLs. Par exemple,
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* Les serveurs THREDS ont des catalogues à différents endroits. Cette classe DEMANDE que l'URL inclue "/thredds/catalog/". Vous pouvez généralement trouver cette variable en commençant dans un navigateur dans le catalogue racine, puis en cliquant sur le sous-catalogue souhaité.
* Cette classe lit les fichiers catalog.xml servis par THREDS avec les listes de&lt;catalogueRefs&gt; (références aux sous-fichiers catalog.xml supplémentaires) et&lt;ensemble de données&gt;s (fichiers de données) .
* Les&lt;Le paramètre fileDir&gt; est ignoré. Puisque cette classe télécharge et fait une copie locale de chaque fichier de données distant,ERDDAP™force le fichier Dir être *BigParent Directory* /copie/ *datasetID* - Oui.
* Pour&lt;sourceUrl&gt;, utilisez l'URL du fichier catalog.xml pour l'ensemble de données du serveur THREDS, par exemple: pour cette URL qui peut être utilisée dans un navigateur web,
     https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[2020-10-21 Ce serveur n'est plus disponible de façon fiable.\\],
Utilisation&lt;sourceUrl&gt; https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml &lt;/sourceUrl&gt;
     (Mais mettez-le sur une ligne) .
* Puisque cette classe télécharge toujours et fait une copie locale de chaque fichier de données distant, vous ne devriez jamais emballer ce jeu de données dans[EDDTableCopy](#eddtablecopy).
* Ce type de données prend en charge une étiquette OPTIONNELLE, rarement utilisée, spéciale,&lt;spécialMode&gt; *mode* &lt;/specialMode&gt; qui peut être utilisé pour spécifier que des règles spéciales codées en dur devraient être utilisées pour déterminer quels fichiers devraient être téléchargés du serveur. Actuellement, la seule *mode* est SAMOS qui est utilisé avec des ensembles de données de https://tds.coaps.fsu.edu/thredds/catalog/samos pour télécharger uniquement les fichiers avec le dernier numéro de version.
* Voir la superclasse de cette classe,[EDDTableFromFiles](#eddtablefromfiles), pour des informations sur le fonctionnement de cette classe et comment l'utiliser.
* Voir les exemples 1D, 2D, 3D et 4D pour[EDDTableFromNcFiles](#eddtablefromncfiles).
     
### Tableau EDD deWFSFichiers{#eddtablefromwfsfiles} 
[ **Tableau EDD deWFSFichiers** ](#eddtablefromwfsfiles)  (DÉPREUVE) fait une copie locale de toutes les données d'unArcGISCarteServeurWFSpour que les données puissent ensuite être ré-servées rapidement àERDDAP™utilisateurs.

* Vous devez spécifier un format spécialsourceUrlattribut global à direERDDAP™comment demander des informations de fonctionnalités du serveur. Veuillez utiliser cet exemple comme modèle :
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (mais mettez tout sur une seule ligne) 
* Vous devez ajouter un attribut global spécial pour direERDDAP™comment identifier les noms des morceaux de données qui devraient être téléchargés. Cela fonctionnera probablement pour tous les EDDTableFromWFSFichiers ensembles de données & #160;:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Puisque cette classe télécharge toujours et fait une copie locale de chaque fichier de données distant, vous ne devriez jamais emballer ce jeu de données dans[EDDTableCopy](#eddtablecopy).
* Voir la superclasse de cette classe,[EDDTableFromFiles](#eddtablefromfiles), pour plus d'informations sur le fonctionnement de cette classe et comment l'utiliser.
     
### EDDTableAgrégatRows{#eddtableaggregaterows} 
[ **EDDTableAgrégatRows** ](#eddtableaggregaterows)peut faire un ensemble de données EDDTable à partir d'un groupe d'ensembles de données EDDTable pour enfants.

* Voici quelques utilisations pour EDDTableAggregateRows:
    * Vous pouvez faire un ensemble de données EDDTableAggregateRows à partir de deux types différents de fichiers ou de sources de données, par exemple, un ensemble de données avec des données jusqu'à la fin du mois dernier.ncFichiers CF et un ensemble de données contenant des données pour le mois en cours stockées dans une base de données relationnelles.
    * Vous pouvez faire un ensemble de données EDDTableAggregateRows pour traiter un changement dans les fichiers source (Par exemple, le format de temps a changé, ou un nom de variable a changé, ou des données Type/scale\\_factor/add\\_offsetmodifié) . Dans ce cas, un enfant obtiendrait des données à partir de fichiers faits avant le changement et l'autre enfant obtiendrait des données à partir de fichiers faits après le changement. Cette utilisation de EDDTableAggregateRows est une alternative à l'utilisation[NcML](#ncml-files)ou[NCO](#netcdf-operators-nco). À moins qu'il n'y ait une caractéristique distinctive dans les noms de fichiers (pour que vous puissiez utiliser&lt;fileNameRegex&gt; pour déterminer quel fichier appartient à quel jeu de données enfant), vous devez probablement stocker les fichiers pour les deux ensembles de données enfant dans différents répertoires.
    * Vous pouvez créer un ensemble de données EDDTableAggregateRows qui possède un sous-ensemble partagé de variables d'un ou de plusieurs ensembles de données similaires mais différents, par exemple un ensemble de données qui fait un ensemble de données Profil de la combinaison d'un ensemble de données Profil, d'un ensemble de données TimeSeriesProfile et d'un ensemble de données TrajectoryProfile (qui ont des variables différentes et certaines variables en commun -- dans ce cas, vous devrez faire des variantes spéciales pour les ensembles de données pour enfants, avec seulement les variables en commun) .
    * Vous pouvez avoir plusieurs ensembles de données autonomes, chacun avec le même type de données mais d'une station différente. Vous pouvez laisser ces ensembles de données intacts, mais aussi créer un ensemble de données EDDTableAggregateRows qui a des données de toutes les stations -- chacun des ensembles de données pour enfants pourrait être simple[EDDTableDeErddap](#eddfromerddap), qui indique l'un des ensembles de données de station existants. Si vous faites cela, donnez à chacun des ensembles de données EDDTableFromErddap un différentdatasetIDque les ensembles de données autonomes originaux, p.ex. en ajoutant « Enfant » à l'originaldatasetID.
* Chacun des enfants&lt;dataset&gt; doit être un ensemble de données complet, comme s'il s'agissait d'un ensemble de données autonome. Chacun doit avoir la même[dataVariables](#datavariable), dans le même ordre, avec la même[destinationNames](#destinationname),[données Types](#datatype),[missing\\_values](#missing_value),[\\_FillValues](#missing_value)et[unités](#units). Les métadonnées pour chaque variable de l'ensemble de données EDDTableAggregateRows proviennent de variables du premier ensemble de données pour enfants, mais EDDTableAggregateRows mettra à jour le[actual\\_range](#actual_range)Les métadonnées seront la plage réelle pour tous les enfants.
* Recommandation: Obtenez chacun des ensembles de données pour enfants fonctionnant comme des ensembles de données autonomes. Puis essayez de faire l'ensemble de données EDDTableAggregateRows en coupant et collant ladatasets.xmlmorceaux pour chacun dans la nouvelle EDDTableAggregate Ensemble de données des lignes.
* Ordre de tri par défaut -- L'ordre des ensembles de données enfant détermine l'ordre global par défaut des résultats. Bien sûr, les utilisateurs peuvent demander un ordre de tri différent pour un ensemble donné de résultats en ajoutant &orderBy (" *Liste des variables séparées par des virgules* ") à la fin de leur requête.
* La "source"[mondial Attributs](#global-attributes)pour l'EDDTableAggregateRows est l'Attributsglobaux combinés du premier ensemble de données enfant. L'ensemble de la table EDD Les lignes peuvent avoir une dimension mondiale&lt;addAttributes&gt; pour fournir des attributs globaux supplémentaires ou remplacer les attributs globaux source.
#### EDDTableAgrégat Squelette de lignes XML{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableCopy{#eddtablecopy} 
[ **EDDTableCopy** ](#eddtablecopy)peut faire une copie locale de nombreux types d'ensembles de données EDDTable et ensuite ré-server les données rapidement à partir de la copie locale.

* EDDTableCopy (et pour les données de grille,[EDDGridCopier](#eddgridcopy)) est un très facile à utiliser et un très efficace **la solution à certains des plus gros problèmes liés au service de données provenant de sources de données distantes:** 
    * L'accès aux données d'une source de données distante peut être lent.
        * Ils peuvent être lents parce qu'ils sont intrinsèquement lents (par exemple, un type de serveur inefficace) ,
        * parce qu'ils sont submergés par trop de demandes,
        * ou parce que votre serveur ou le serveur distant est limité par la bande passante.
    * L'ensemble de données distant est parfois indisponible (encore une fois, pour diverses raisons) .
    * S'appuyer sur une source pour les données n'a pas une bonne échelle (par exemple, quand de nombreux utilisateurs et beaucoupERDDAPs utiliser) .
         
* Fonctionnement -- EDDTableCopy résout ces problèmes en faisant et en maintenant automatiquement une copie locale des données et en servant les données de la copie locale.ERDDAP™peut servir les données de la copie locale très, très rapidement. Et faire et utiliser une copie locale allège le fardeau sur le serveur distant. Et la copie locale est une sauvegarde de l'original, ce qui est utile si quelque chose arrive à l'original.
    
Il n'y a rien de nouveau à faire une copie locale d'un ensemble de données. Ce qui est nouveau ici est que cette classe le fait\\*facile\\*créer et\\*maintenir\\*une copie locale des données d'un\\*variété\\*des types de sources de données à distance et\\*ajouter des métadonnées\\*pendant la copie des données.
    
#### EDDTableCopy vs&lt;cacheFromUrl&gt;{#eddtablecopy-vs-cachefromurl} 
&lt;cacheFromUrl&gt; est une alternative à EDDTableCopy. Ils fonctionnent différemment.

* Tableau EDD Copier les œuvres en demandant des morceaux de données d'un service à distance et en stockant ces morceaux dans des fichiers locaux. Ainsi, EDDTableCopy est utile dans certains cas où les données sont accessibles via un service à distance.
* [&lt;cacheFromUrl&gt;] (#cachefromurl) télécharge les fichiers existants énumérés sur un site web distant.&lt;cacheFromUrl&gt; est plus facile à utiliser et plus fiable puisqu'il peut facilement dire quand il y a un nouveau fichier de données distantes ou quand un fichier de données distant a changé et doit donc être téléchargé.

S'il y a des situations où EDDTableCopy ou&lt;cacheFromUrl&gt; peut être utilisé, utiliser&lt;cacheFromUrl&gt; parce qu'il est plus facile et plus fiable.
     
#### &lt;extractDestination Noms et gt;{#extractdestinationnames} 
Tableau EDD Copie fait la copie locale des données en demandant des morceaux de données à partir de l'ensemble de données distant. Tableau EDD Copie détermine les morceaux à demander en demandant le &distinct () valeurs pour les&lt;extractDestinationNoms&gt; (spécifiée dans ladatasets.xml, voir ci-dessous) , qui sont les noms de destination séparés d'espace des variables dans l'ensemble de données distant. Par exemple,
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
pourrait donner des combinaisons de valeurs distinctes de dériveur=tig17,profil=1017, dériveur=tig17,profil=1095, ... dériveur=une12,profil=1223, dériveur=une12,profil=1251, ....

Dans les situations où une colonne (Par exemple, profil) peut être tout ce qui est nécessaire pour identifier uniquement un groupe de lignes de données, s'il y a un très grand nombre de profils, par exemple, il peut être utile de spécifier également un extrait supplémentaire Destination Dénomination (par exemple,) qui sert à subdiviser les profils. Cela conduit à moins de fichiers de données dans un répertoire donné, ce qui peut conduire à un accès plus rapide.
    
#### Fichiers locaux{#local-files} 
Chaque tranche de données est stockée dans un fichier séparé.NetCDFfichier dans un sous-répertoire de *BigParent Directory* /copie/ *datasetID* / (comme spécifié dans[configuration.xml](/docs/server-admin/deploy-install#setupxml)) . Il y a un niveau de sous-répertoire pour tous sauf le dernier extraitDestinationName. Par exemple, les données pour tig17+1017 seraient stockées dans
     *BigParent Directory* /copie/échantillonDataset/tig17/1017.nc.
Par exemple, les données pour un12+1251, seraient stockées dans
     *BigParent Directory* /copie/échantillonDonnéeset/un12/1251.nc.
Le répertoire et les noms de fichiers créés à partir de valeurs de données sont modifiés pour les rendre sécurisés. (par exemple, les espaces sont remplacés par "x20") -- cela n'affecte pas les données réelles.
     
#### Nouvelles données{#new-data} 
Chaque fois EDDTable Copie est rechargé, il vérifie l'ensemble de données distant pour voir quels morceaux distincts sont disponibles. Si le fichier pour un morceau de données n'existe pas déjà, une requête pour obtenir le morceau est ajoutée à une file d'attente.ERDDAPLa tâcheThread traite toutes les requêtes en attente pour des morceaux de données, un par un. Vous pouvez voir des statistiques pour l'activité de la tâche Thread sur le[Page d'état](/docs/server-admin/additional-information#status-page)et dans[Rapport quotidien](/docs/server-admin/additional-information#daily-report). (Oui,ERDDAP™pourrait assigner plusieurs tâches à ce processus, mais cela utiliserait beaucoup de la bande passante de la source de données distante, de la mémoire et du temps CPU, et beaucoup deERDDAPLa bande passante, la mémoire et le temps CPU, ce qui n'est pas une bonne idée.) 
    
NOTE: La toute première fois qu'un EDDTableCopy est chargé, (si tout va bien) De nombreuses requêtes pour des morceaux de données seront ajoutées à la file d'attente de la tâcheThread, mais aucun fichier de données local n'aura été créé. Donc le constructeur échouera, mais taskThread continuera de travailler et de créer des fichiers locaux. Si tout va bien, la tâche Thread fera quelques fichiers de données locaux et la prochaine tentative de recharger l'ensemble de données (dans ~15 minutes) réussira, mais initialement avec une quantité très limitée de données.
    
REMARQUE: Après que l'ensemble de données locales a quelques données et apparaît dans votreERDDAP, si l'ensemble de données distant est temporairement ou définitivement inaccessible, l'ensemble local fonctionnera toujours.
    
ATTENTION: Si le jeu de données distant est grand et/ou le serveur distant est lent (C'est le problème, n'est-ce pas?&#33;) , il faudra beaucoup de temps pour faire une copie locale complète. Dans certains cas, le temps nécessaire sera inacceptable. Par exemple, transmettre 1 To de données sur une ligne T1 (0,15 Go/s) prend au moins 60 jours, dans des conditions optimales. De plus, il utilise beaucoup de bande passante, de mémoire et de temps CPU sur les ordinateurs distants et locaux. La solution est d'envoyer un disque dur à l'administrateur de l'ensemble de données distant afin qu'il puisse faire une copie de l'ensemble de données et envoyer le disque dur à vous. Utilisez ces données comme point de départ et EDDTableCopy y ajoutera des données. (C'est ainsi que le service Cloud EC2 d'Amazon a utilisé pour gérer le problème, même si leur système a beaucoup de bande passante.) 
    
ATTENTION : Si une combinaison donnée de valeurs disparaît d'un ensemble de données distant, EDDTableCopy ne supprime PAS le fichier local copié. Si vous le voulez, vous pouvez le supprimer vous-même.
    
#### Copie de tableau&lt;vérifierSourceDonnées &gt;{#tablecopy-checksourcedata} 
Lesdatasets.xmlpour cet ensemble de données peut avoir une balise optionnelle
```
    <checkSourceData>true</checkSourceData>  
```
La valeur par défaut est vraie. Si / quand vous le définissez à faux, l'ensemble de données ne vérifiera jamais l'ensemble de données source pour voir s'il y a des données supplémentaires disponibles.
     
#### Utilisation recommandée{#recommended-use} 
1. Créer la&lt;ensemble de données&gt; entrée (le type natif, pas EDDTableCopy) pour la source de données distante. **Faites-le fonctionner correctement, y compris toutes les métadonnées souhaitées.** 
2. S'il est trop lent, ajoutez du code XML pour l'envelopper dans un ensemble de données EDDTableCopy.
    * Utiliser un autredatasetID  (Peut-être en modifiantdatasetIDdes anciensdatasetIDlégèrement) .
    * Copier&lt;accessible Pour&gt;,&lt;recharger tous les NMinutes&gt; et&lt;OnChange&gt; depuis le XML d'EDDTable à distance jusqu'au XML d'EDDTableCopy. (Leurs valeurs pour la matière EDDTableCopy; leurs valeurs pour l'ensemble de données internes deviennent inutiles.) 
    * Créer la&lt;extractDestinationNames&gt; tag (voir ci-dessus) .
    *   &lt;orderExtractBy&gt; est une liste OPTIONNELLE de noms de variables de destination séparés dans l'ensemble de données distant. Lorsque chaque morceau de données est téléchargé du serveur distant, le morceau sera trié par ces variables (par la première variable, puis par la deuxième variable si la première variable est liée, ...) . Dans certains cas,ERDDAP™sera en mesure d'extraire les données plus rapidement des fichiers de données locaux si la première variable de la liste est une variable numérique ("time"compte comme variable numérique) . Mais choisissez ces variables d'une manière appropriée pour l'ensemble de données.
3.  ERDDAP™fera et conservera une copie locale des données.
         
* ATTENTION: EDDTableCopy suppose que les valeurs de données pour chaque morceau ne changent jamais. Si/quand ils le font, vous devez supprimer manuellement les fichiers morceaux dans *BigParent Directory* /copie/ *datasetID* / qui ont changé et[drapeau](/docs/server-admin/additional-information#flag)l'ensemble de données à recharger pour que les morceaux supprimés soient remplacés. Si vous avez un abonnement e-mail à l'ensemble de données, vous obtiendrez deux emails : l'un lorsque l'ensemble de données se recharge et commence à copier les données, et l'autre lorsque l'ensemble de données se charge à nouveau (automatiquement) et détecte les nouveaux fichiers de données locaux.
     
* Modifier les métadonnées -- Si vous devez changeraddAttributesou modifier l'ordre des variables associées à l'ensemble de données source:
    1. Modifier leaddAttributespour l'ensemble de données sourcedatasets.xml, au besoin.
    2. Supprimer un des fichiers copiés.
    3. Définir un[drapeau](/docs/server-admin/additional-information#flag)pour recharger immédiatement l'ensemble de données. Si vous utilisez un drapeau et que vous avez un abonnement e-mail à l'ensemble de données, vous obtiendrez deux emails : l'un lorsque l'ensemble de données se recharge et commence à copier les données, et l'autre lorsque l'ensemble de données se recharge à nouveau (automatiquement) et détecte les nouveaux fichiers de données locaux.
    4. Le fichier supprimé sera régénéré avec les nouvelles métadonnées. Si l'ensemble de données source n'est jamais disponible, l'ensemble de données EDDTableCopy obtiendra des métadonnées du fichier régénéré, car c'est le fichier le plus jeune.
         
*   [EDDGridCopier](#eddgridcopy)est très similaire à EDDTableCopy, mais fonctionne avec des ensembles de données maillés.
#### EDDTableCopy squelette XML{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- - Oui.

## Détails{#details-1} 

Voici des descriptions détaillées des balises et attributs communs.

### &lt;les unités de dégression angulaires;{#angulardegreeunits} 
* [ ** &lt;angulaireDegreeUnits&gt; ** - Oui. (#unités de degrésangulaires) est une étiquette OPTIONNELLE rarement utilisée&lt;erddapDatasets&gt; tag indatasets.xmlqui contient une liste de chaînes d'unités séparées par des virgulesERDDAP™devrait traiter comme des unités de degrés angulaires. Si une variable possède une de ces unités,tabledap'sorderByMeanfiltre calculera la moyenne d'une manière spéciale, puis déclarera la moyenne comme une valeur de -180 à 180. VoirERDDAPLe fichier de code source EDStatic.java pour la liste par défaut actuelle. Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag).
### &lt;gigulaireDegreeTrueUnits&gt;{#angulardegreetrueunits} 
* [ ** &lt;angulaire DegréTrueUnits&gt; ** - Oui. (#angulairedegrétrueunits) est une étiquette OPTIONNELLE rarement utilisée&lt;erddapDatasets&gt; tag indatasets.xmlqui contient une liste de chaînes d'unités séparées par des virgulesERDDAP™devrait traiter comme des degrés angulaires vraies unités. Si une variable possède une de ces unités,tabledap'sorderByMeanfiltre calculera la moyenne d'une manière spéciale, puis déclarera la moyenne comme une valeur de 0 à 360. VoirERDDAPLe fichier source EDStatic.java pour la liste par défaut actuelle. Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag).
     
### &lt;les noms standard communs et les gt;{#commonstandardnames} 
* [ ** &lt;Noms standard communs&gt; ** - Oui. (#noms standard communs) est une étiquette OPTIONNELLE rarement utilisée&lt;erddapDatasets&gt; tag indatasets.xmlpour spécifier une liste commune[Noms standard des FC](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). Par exemple,
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Cette liste est utilisée dans DataProviderForm3.html comme une commodité pour les utilisateurs.
Si vous voulez fournir ces informations dansdatasets.xml, commencez par copier la liste par défaut actuelle dans&lt;DEFAULT\\_noms standard communs&gt; enERDDAP's
\\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml fichier.
     
### &lt;cacheMinutes et gt;{#cacheminutes} 
* [ ** &lt;cacheMinutes&gt; ** - Oui. (#Cacheminutes) est une étiquette OPTIONNELLE rarement utilisée&lt;erddapDatasets&gt; tag indatasets.xmlpréciser l'âge (en minutes) où les fichiers dans le cache doivent être supprimés (par défaut=60) . Par exemple,
```
    <cacheMinutes>60</cacheMinutes>  
```
En général, seuls les fichiers image (parce que les mêmes images sont souvent demandées à plusieurs reprises) et.ncfichiers (parce qu'ils doivent être entièrement créés avant d'envoyer à l'utilisateur) sont mis en cache. Bien que cela puisse sembler comme une demande donnée devrait toujours renvoyer la même réponse, ce n'est pas vrai. Par exemple,tabledapdemande qui inclut le temps&gt; *certains Heure* changera quand de nouvelles données arriveront pour l'ensemble de données. Et une demande de griddap qui comprend\\[dernier\\]pour la dimension temporelle changera quand de nouvelles données arriveront pour l'ensemble de données. Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag). AvantERDDAP™v2.00, cela a été spécifié dans setup.xml, qui est encore autorisé mais découragé.

### &lt;cacheClearMinutes&gt;{#cacheclearminutes} 
* [ ** &lt;cacheClearMinutes&gt; ** - Oui. (# minutes claires) est une étiquette OPTIONNELLE rarement utilisée&lt;erddapDatasets&gt; tag indatasets.xmlpour spécifier la fréquence pour vérifier les fichiers en cache et supprimer les anciens (en minutes)   (par défaut=15) . Par exemple,
```
    <cacheClearMinutes>15</cacheClearMinutes>  
```
Lorsque le serveur termine la gestion d'une requête, il vérifiera combien de temps il y a le dernier cache clair. Si c'était il y a trop longtemps, il attendrait une tâche sur le TaskThread pour effacer le cache. Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag). Cela peut être spécifié dans setup.xml, mais cela est découragé.
     
### &lt;convertirInterpolateRequestCSVexample&gt;{#convertinterpolaterequestcsvexample} 
* [ ** &lt;convertirInterpolateRequestCSVexample&gt; ** - Oui. (#convertinterpolaterequestcsvexample) est une étiquette OPTIONNELLE&lt;erddapDatasets&gt; tag indatasets.xml \\[commençant parERDDAP™v2.10\\]qui contient un exemple qui sera affiché sur la page web du convertisseur Interpolate. La valeur par défaut est : jplMURSST41/analysésst/Bilinéaire/4 .
### &lt;convertirInterpolateDatasetIDVariableList&gt;{#convertinterpolatedatasetidvariablelist} 
* [ ** &lt;convertirInterpolateDatasetIDVariableList&gt; ** - Oui. (#convertinterpolatedatasetidvariablelist) est une étiquette OPTIONNELLE&lt;erddapDatasets&gt; tag indatasets.xml \\[commençant parERDDAP™v2.10\\]qui contient une liste CSV dedatasetID/variable Exemples de noms qui seront utilisés comme suggestions par la page Web du convertisseur Interpolate. La valeur par défaut est : jplMURSST41/analysésst.
### &lt;convertir enSourcePublicUrl&gt;{#converttopublicsourceurl} 
* [ ** &lt;convertirEnSourcePublicUrl&gt; ** - Oui. (#convertir les ressources publiques) est une étiquette OPTIONNELLE&lt;erddapDatasets&gt; tag indatasets.xmlqui contient un attribut "from" et "to" qui spécifie comment convertir un local correspondantsourceUrl  (généralement un numéro IP) dans un publicsourceUrl  (un nom de domaine) . "de" doit avoir le formulaire "\\[quelque chose\\]//\\[quelque chose\\]/". Il peut y avoir 0 ou plus de ces balises. Pour plus d'informations, voir [&lt;sourceUrl&gt;] (Source) . Par exemple,
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
provoquera une correspondance localesourceUrl  (tels que https://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day )   
dans un publicsourceUrl  ( https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day ) .
Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag).

Mais pour des raisons de sécurité et pour des raisons liées au système d'abonnement, **Ne l'utilisez pas &#33;**   
Au lieu de cela, toujours utiliser le nom de domaine public dans le&lt;sourceUrl&gt; tag et utiliser le[Table /etc/hosts](https://linux.die.net/man/5/hosts)sur votre serveur pour convertir des noms de domaine locaux en numéros IP sans utiliser un serveur DNS. Vous pouvez tester si un nom de domaine est correctement converti en un numéro IP en utilisant:
Ping *certains.domaine.nom*   
     
### données:image/png;base64,{#dataimagepngbase64} 
* Lorsqu'un utilisateur demande.htmlTableréponse deERDDAP™, si les données d'une cellule chaîne contiennent des données:image/png;base64, suivie d'une image .png codée de base64,ERDDAP™affichera une icône (afin que l'utilisateur puisse voir l'image s'ils survolent) et boutons pour enregistrer le texte ou l'image dans le presse-papiers. Cette fonctionnalité a été ajoutée dansERDDAP™v2.19 par Marco Alba.
### drawLandMask {#drawlandmask} 
*   [ **drawLandMask** ](#drawlandmask)spécifie le paramètre par défaut qui contrôle quand et comment le landmask doit être dessiné quandERDDAP™dessine une carte. Il peut être spécifié en trois endroits différents endatasets.xml  (énuméré de la plus faible à la plus haute priorité) :
    
    1. SidrawLandMaskest spécifié dans&lt;erddapDatasets&gt; (non connecté à un ensemble de données spécifique) , puis il spécifie la valeur par défaut dedrawLandMaskpour toutes les variables de tous les ensembles de données. Par exemple,
    ```
        <drawLandMask>under</drawLandMask>  
    ```
Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAPlitdatasets.xml.
Si cette balise n'est pas présente, la valeur par défaut sous-jacente est sous.
         
    2. SidrawLandMaskest spécifié comme un attribut global d'un ensemble de données donné, puis il spécifie la valeur par défaut dedrawLandMaskpour toutes les variables de cet ensemble de données, outrepassant toute priorité inférieure. Par exemple,
    ```
        <att name="drawLandMask">under</att>  
    ```
Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™recharge cet ensemble de données.
         
    3. SidrawLandMaskest spécifié comme attribut d'une variable dans un ensemble de données donné, puis il spécifie la valeur par défaut dedrawLandMaskpour cette variable dans cet ensemble de données, outrepasser tout réglage de priorité inférieure. Par exemple,
    ```
        <att name="drawLandMask">under</att>  
    ```
Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™recharge cet ensemble de données.
    
Un utilisateur peut outrepasser la valeur par défaut (où qu'elle soit spécifiée) en sélectionnant une valeur pour "Draw land mask" dans une liste déroulante sur la page Web Make A Graph de l'ensemble de données, ou en incluant &.land= *valeur* dans l'URL qui demande une carte deERDDAP.
    
Dans tous les cas, il y a 4 valeurs possibles pour l'attribut :
    
    * "sous" dessine la masque avant d'obtenir des données sur la carte.
Pour les ensembles de données maillés, la terre apparaît comme une couleur gris clair constante.
Pour les ensembles de données tabulaires, « under » montre les données topographiques sur les terres et les océans.
    * "sur" -- Pour les ensembles de données maillés, "over" dessine la masque après avoir puisé des données sur des cartes afin de masquer toutes les données sur terre. Pour les ensembles de données tabulaires, "over" montre la bathymétrie de l'océan et un gris clair constant où il y a des terres, tous les deux dessinés sous les données.
    * « hors ligne » dessine simplement les contours de la masse terrestre, les frontières politiques, les lacs et les rivières.
    * "off" ne dessine rien.
### &lt;e-mailDiagnosticsÀErdData&gt;{#emaildiagnosticstoerddata} 
* [ ** &lt;e-mailDiagnosticToErdData&gt; ** - Oui. (#emaildiagnosticstoerddonnées) est une étiquette OPTIONNELLE rarement utilisée&lt;erddapDatasets&gt; tag indatasets.xml. La valeur de la balise peut être vraie (par défaut) ou faux. Si c'est vrai,ERDDAP™va envoyer la trace de pile à Chris. John à Noaa. Gouvernement (desERDDAP™équipe de développement) . Cela devrait être sûr et sécurisé car aucune information confidentielle (Par exemple, la requête Url) est inclus dans le courriel. Cela devrait permettre d'attraper tous les bugs obscurs et totalement inattendus qui mènent à NullPointerExceptions. Sinon, l'utilisateur voit les exceptions, mais leERDDAP™l'équipe de développement ne (Donc nous ne savons pas qu'il y a un problème qui doit être corrigé) .
     
### &lt;graphiqueContexteColor&gt;{#graphbackgroundcolor} 
* [ ** &lt;graphiqueContexteColor&gt; ** - Oui. (#graphbackgroundcolor) est une étiquette OPTIONNELLE rarement utilisée&lt;erddapDatasets&gt; tag indatasets.xmlpour spécifier la couleur de fond par défaut sur les graphiques. Cela concerne presque tous les graphiques. Il y a quelques situations qui ne sont pas touchées. La couleur est spécifiée comme une valeur hexadécimale à 8 chiffres dans la forme 0xAARRGGBB, où AA, RR, GG et BB sont les composants opacity, rouge, vert et bleu, respectivement. "0x" est sensible à la casse, mais les chiffres hexadécimaux ne sont pas sensibles à la casse. Par exemple, une (ff) couleur bleu verdâtre avec rouge=22, vert=88, bleu=ee serait 0xff2288ee. Le blanc opaque est 0xffffffffff. La valeur par défaut est bleu clair opaque (0xffccccff) , qui a l'avantage d'être différent du blanc, qui est une couleur importante dans de nombreuses palettes utilisées pour dessiner des données. Par exemple,
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag).
### &lt;ipAddressMaxRequests&gt;{#ipaddressmaxrequests} 
* [ ** &lt;ipAddressMaxDemandes&gt; ** - Oui. (#ipaddressmaxrequêtes) est une étiquette facultative rarement utilisée (première prise en charge avecERDDAP™v2.12) dans une&lt;erddapDatasets&gt; tag indatasets.xmlqui fait partie d'un système visant à limiter la capacité des utilisateurs légitimes trop agressifs et des utilisateurs malveillants à faire un grand nombre de demandes simultanées qui dégraderaient les performances du système pour les autres utilisateurs. ipAdresse MaxRequests spécifie le nombre maximal de requêtes simultanées qui seront acceptées à partir de n'importe quelle adresse IP spécifique. Des requêtes supplémentaires recevront une erreur HTTP 429 : Trop de requêtes. Les petits fichiers statiques dans erddap/download/ et erddap/images/ ne sont PAS exemptés de ce nombre. La valeur par défaut est 15. Le maximum autorisé est 1000, ce qui est fou haut -- ne le faites pas&#33;ERDDAP™n'acceptera pas un nombre inférieur à 6 parce que beaucoup d'utilisateurs légitimes (notamment les navigateurs Web etWMSclients) Jusqu'à 6 demandes à la fois. LesERDDAP™Rapport quotidien et les informations similaires écrites dans le fichier log.txt avec chaque rechargement de données majeures, comprendront maintenant un relevé des requêtes par ces adresses IP sous le titre "Adresse IP du demandeur (Trop de demandes) ".
Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag).
    
La section "Major LoadDatasets Time Series" de status.html comprend une colonne "tooMany" qui liste le nombre de requêtes qui ont dépassé le paramètre ipAddressMaxRequests d'un utilisateur et a ainsi vu une erreur "Tooo Many Requests". Cela vous permet de voir facilement quand il ya des utilisateurs légitimes trop agressifs et les utilisateurs malveillants afin que vous pouvez (facultativement) Regardez dans le fichier log.txt et décidez si vous voulez blacklist ces utilisateurs.
    
Il n'y a rien de mal à placer ça à un nombre plus élevé. C'est à toi de voir. Mais cela permet/encourage les gens à mettre en place des systèmes qui utilisent un grand nombre de threads pour travailler sur des projets et ensuite ne leur donne aucun feedback que ce qu'ils font ne leur procure aucun avantage.
### &lt;ipAddressMaxRequestsActive&gt;{#ipaddressmaxrequestsactive} 
* [ ** &lt;ipAddressMaxDemandesactives&gt; ** - Oui. (#ipaddressmaxrequestionsactives) est une étiquette facultative rarement utilisée (première prise en charge avecERDDAP™v2.12) dans une&lt;erddapDatasets&gt; tag indatasets.xmlqui fait partie d'un système visant à limiter la capacité des utilisateurs légitimes trop agressifs et des utilisateurs malveillants à faire un grand nombre de demandes simultanées qui dégraderaient les performances du système pour les autres utilisateurs. ipAddressMaxRequestsActive spécifie le nombre maximum de requêtes simultanées qui seront traitées activement à partir de n'importe quelle adresse IP spécifique. D'autres demandes seront en attente jusqu'à ce que les demandes précédentes aient été traitées. Les petits fichiers statiques dans erddap/download/ et erddap/images/ SONT exemptés de ce nombre et du throttling connexe. La valeur par défaut est 2. Le maximum autorisé est 100, ce qui est fou haut -- ne le faites pas&#33; Vous pouvez définir ceci à 1 pour être strict, surtout si vous avez des problèmes avec des utilisateurs trop agressifs ou malveillants. Les utilisateurs obtiendront encore rapidement toutes les données qu'ils demandent (jusqu'à ipAddressMaxDemandes) , mais ils ne seront pas en mesure de s'occuper des ressources du système. Nous ne recommandons pas de le régler à un plus grand nombre car il permet aux utilisateurs légitimes trop agressifs et les utilisateurs malveillants de dominerERDDAPLa capacité de traitement.
Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag).
     
### &lt;ipAddressUnlimited&gt;{#ipaddressunlimited} 
* [ ** &lt;ipAddressUnlimited&gt; ** - Oui. (#ipaddressUnlimited) est une étiquette facultative rarement utilisée (première prise en charge avecERDDAP™v2.12) dans une&lt;erddapDatasets&gt; tag indatasets.xmlqui fait partie d'un système visant à limiter la capacité des utilisateurs légitimes trop agressifs et des utilisateurs malveillants à faire un grand nombre de demandes simultanées qui dégraderaient les performances du système pour les autres utilisateurs. ipAddressUnlimited est une liste d'adresses IP séparées par des virgules que vous souhaitez permettre un accès illimité à votreERDDAP. Regarde dans ton journal. fichier txt pour voir quel format votre serveur utilise pour les adresses IP. Sur certains serveurs, les adresses IP seront au format #.#.#.# (où # est un entier de 0 à 255) ; alors que sur d'autres il sera dans le format #:#:#:#:#:#:#:#:#:#:# . Les demandeurs de cette liste ne sont pas soumis aux paramètres ipAddressMaxRequests ou ipAddressMaxRequestsActive. Cela pourrait être un secondaireERDDAP™ou pour certains utilisateurs ou serveurs de votre système.ERDDAP™ajoute toujours " (IPAdresse inconnue) ", quiERDDAP™utilise lorsque l'adresse IP du demandeur ne peut pas être déterminée, par exemple, pour d'autres processus fonctionnant sur le même serveur.
Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag).
    
Si, pour une raison quelconque, toutes les demandes d'un utilisateur reçoivent le message d'erreur « Délai d'attente pour que vos autres demandes soient traitées »., alors vous pouvez résoudre le problème en ajoutant l'adresse IP de l'utilisateur à la liste ipAddressUnlimited, en appliquant cette modification, puis en le retirant de cette liste.
    
### &lt;loadDatasetsMinMinutes&gt;{#loaddatasetsminminutes} 
* [ ** &lt;loadDatasetsMinMinutes&gt; ** - Oui. (#loaddatasetsminminutes) est une étiquette OPTIONNELLE rarement utilisée&lt;erddapDatasets&gt; tag indatasets.xmlpour préciser le temps minimum (en minutes) entre charges importantes Données (lorsqueERDDAP™retraitesdatasets.xml, y compris la vérification de chaque ensemble de données pour voir si elle doit être rechargée selon son rechargement Chaque paramètre NMinutes, par défaut=15) . Par exemple,
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
Si un jeu de loadDatasets prend moins de temps que ce temps, le chargeur regarde à plusieurs reprises le répertoire du drapeau et/ou dort jusqu'à ce que le temps restant soit passé. La valeur par défaut est de 15 minutes, ce qui devrait être bien pour presque tout le monde. Le seul inconvénient à mettre cela à un nombre plus petit est qu'il augmentera la fréquence queERDDAP™retrie des ensembles de données qui ont des erreurs qui les empêchent d'être chargés (Par exemple, un serveur distant est en panne) . S'il y a beaucoup de ces ensembles de données et qu'elles sont fréquemment testées à nouveau, la source de données pourrait considérer qu'il s'agit d'un comportement pathétique ou agressif. Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag). AvantERDDAP™v2.00, cela a été spécifié dans setup.xml, qui est encore autorisé mais découragé.
     
### &lt;loadDatasetsMaxMinutes&gt;{#loaddatasetsmaxminutes} 
* [ ** &lt;loadDatasetsMaxMinutes&gt; ** - Oui. (#loaddatasetsmaxminutes) est une étiquette OPTIONNELLE&lt;erddapDatasets&gt; tag indatasets.xmlpour spécifier le temps maximal (en minutes) une charge importante L'effort des ensembles de données est permis (avant la charge Fil de données traité comme « total » et interrompu)   (par défaut=60) . Par exemple,
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
En général, cela devrait être fixé à au moins deux fois plus longtemps que vous pensez raisonnablement que recharger tous les ensembles de données (cumulé) devrait prendre (car les ordinateurs et les réseaux sont parfois plus lents que prévu) Cela devrait toujours être beaucoup plus long que loadDatasetsMinutes. La valeur par défaut est de 60 minutes. Certaines personnes vont régler ça plus longtemps. Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag). AvantERDDAP™v2.00, cela a été spécifié dans setup.xml, qui est encore autorisé mais découragé.
     
### &lt;logLevel&gt;{#loglevel} 
* [ ** &lt;Niveau de log&gt; ** - Oui. (Niveau) est une étiquette OPTIONNELLE&lt;erddapDatasets&gt; tag indatasets.xmlpour spécifier le nombre de messages de diagnostic envoyés au fichier log.txt. Il peut être défini comme "avertissement" (les messages les plus rares) , "info" (par défaut) , ou "tout" (la plupart des messages) . Par exemple,
```
    <logLevel>info</logLevel>  
```
Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag). AvantERDDAP™v2.00, cela a été spécifié dans setup.xml, qui est encore autorisé mais découragé.
     
### &lt;demande partielleMaxBytes&gt; et&lt;Demande partielleMaxCells&gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [ ** &lt;Demande partielleMaxBytes&gt; **- Oui. (#partialrequestmaxoctets-et-partialrequestmaxcellules) et [** &lt;Demande partielleMaxCells&gt; ** - Oui. (#partialrequestmaxoctets-et-partialrequestmaxcellules) sont rarement utilisés OPTIONAL tags dans un&lt;erddapDatasets&gt; tag indatasets.xml. Si possible (et ce n'est pas toujours possible) ,ERDDAP™casse les grandes requêtes de données en morceaux pour conserver la mémoire.
    
Avec 32 bitsJava, dans un sens simpliste, le nombre maximal de *grandes* demandes est environ 3/4 de la mémoire disponible (la valeur -Xmx passée à Tomcat) divisé par la taille du morceau (Par exemple, 1200 Mo / 100 Mo =&gt; 12 demandes) . D'autres choses nécessitent de la mémoire, de sorte que le nombre réel de demandes sera moins. En pratique, le chunking n'est pas toujours possible. Donc une grande ou quelques très grandes requêtes simultanées non-chunkable pourrait causer des problèmes sur 32 bitsJava.

Avec 64 bitsJava, la valeur -Xmx peut être beaucoup plus grande. La mémoire est donc beaucoup moins susceptible d'être une contrainte.

Vous pouvez outrepasser la taille par défaut du morceau en définissant ces balises dansdatasets.xml  (ayant des valeurs différentes de celles indiquées ici) :
Pour les grilles:&lt;Demande partielleMaxBytes&gt;100000000&lt;/demande partielleMaxBytes&gt;
Pour les tableaux:&lt;Demande partielleMaxCells&gt;1000000&lt;/Demande partielleMaxCells&gt;

partialRequestMaxBytes est le nombre maximum d'octets préféré pour une demande de données de grille partielle (une partie de la demande totale) . par défaut=100000000 (10^8) . Les tailles plus grandes ne sont pas nécessairement meilleures (et ne dépassez pas 500 Mo parce que c'est la limite par défaut de THREDD pourDAPRéponses) . Mais les tailles plus grandes peuvent nécessiter moins d'accès de tonnes de fichiers (Pensez àERD's données satellite avec chaque point de temps dans un fichier séparé - il est préférable d'obtenir plus de données de chaque fichier dans chaque requête partielle) .

requestMaxCells est le nombre maximal de cellules préféré (nTaux \\* nColonnes dans le tableau de données) pour une demande partielle de données TABLE (une partie de la demande totale) . Par défaut = 100000. Les tailles plus grandes ne sont pas nécessairement meilleures. Ils entraînent une attente plus longue pour le premier lot de données de la source.

Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag). AvantERDDAP™v2.00, ils ont été spécifiés dans setup.xml, qui est encore autorisé mais découragé.
     
### &lt;demanderBlacklist&gt;{#requestblacklist} 
* [ ** &lt;requêteBlacklist&gt; ** - Oui. (#requestblacklist)  [est une étiquette OPTIONNELLE](/docs/server-admin/additional-information#frequent-crashes-or-freezes)dans une&lt;erddapDatasets&gt; tag indatasets.xmlqui contient une liste d'adresses IP numériques séparées par des virgules qui seront sur la liste noire. Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag).
    * Ceci peut être utilisé pour défaire un[Attaque de déni de service](https://en.wikipedia.org/wiki/Denial_of_service), un zèle excessif[robot web](https://en.wikipedia.org/wiki/Internet_bot), ou tout autre type d'utilisateur gênant.
    * Utilisateur problématique -- SiERDDAP™ralentit à un rampement ou gèle/stops, la cause est souvent un utilisateur gênant qui exécute plus d'un script à la fois et/ou fait un grand nombre de très grandes requêtes, extrêmement inefficaces, ou invalides, ou simultanées. Regardez.[Log.txt](/docs/server-admin/additional-information#log)pour voir si c'est le cas et trouver l'adresse IP numérique de l'utilisateur gênant. Si c'est le problème, vous devriez probablement blacklist cet utilisateur.
        
QuandERDDAP™obtient une requête d'une adresse IP sur la liste noire, elle retournera l'erreur HTTP 403 : Interdit. Le message d'erreur de texte d'accompagnement encourage l'utilisateur à vous envoyer,ERDDAPpour résoudre les problèmes. S'ils prennent le temps de lire le message d'erreur (Beaucoup ne semblent pas) et vous contacter, vous pouvez ensuite travailler avec eux pour leur faire exécuter un seul script à la fois, faire des requêtes plus efficaces, résoudre les problèmes dans leur script (Par exemple, demander des données à partir d'un ensemble de données distant qui ne peut pas répondre avant de se retirer) , ou quoi que ce soit d'autre était la source de problèmes.
        
Les utilisateurs ignorent souvent simplement que leurs demandes sont gênantes. Ils ignorent souvent les bogues, les inefficacités grossières ou d'autres problèmes avec leurs scripts. Ils pensent souvent que parce que votreERDDAP™offre des données gratuitement, qu'ils peuvent demander autant de données qu'ils veulent, par exemple, en exécutant plusieurs scripts ou en utilisant plusieurs threads simultanément.
        
        * Vous pouvez leur expliquer que chaqueERDDAP™, maintenant importe combien grand et puissant, a des ressources limitées (Temps CPU, E/S disque dur, bande passante réseau, etc.) et ce n'est pas juste si un utilisateur demande des données d'une manière qui épuise d'autres utilisateurs ou surchargeERDDAP.
        * Une fois qu'un utilisateur sait faire 2 demandes simultanées, il ne voit souvent aucune raison de ne pas faire 5, 10 ou 20 demandes simultanées, car les demandes supplémentaires ne lui coûtent rien. C'est comme une guerre asymétrique : ici, les armes offensives ont un énorme avantage (coût zéro) sur les armes défensives (une installation finie avec des coûts réels) .
        * Faites-leur remarquer qu'il y a une diminution des retours pour faire des requêtes de plus en plus simultanées; les requêtes supplémentaires ne font que bloquer davantage les requêtes des autres utilisateurs; elles ne donnent pas une amélioration énorme pour eux.
        * Rappelez-leur qu'il y a d'autres utilisateurs (utilisateurs occasionnels et autres utilisateurs exécutant des scripts) , donc ce n'est pas juste d'entre euxERDDAPLes ressources.
        * Signalons que les géants de la technologie ont incité les utilisateurs à attendre des ressources infinies des services web. Bien qu'il existe des moyens de mettre en place[quadrillages/grappes/federations deERDDAPs](/docs/server-admin/scaling)pour faire uneERDDAP™système avec plus de ressources, la plupartERDDAP™les administrateurs n'ont ni l'argent ni la main-d'oeuvre pour mettre en place de tels systèmes, et un tel système sera encore fini. ÀERDPar exemple, il y a une personne (moi) écrireERDDAP™, administrant deuxERDDAPs (avec l'aide de mon patron) , et de gérer plusieurs sources de données, toutes avec un budget matériel annuel de 0 $ (nous comptons sur des subventions occasionnelles pour payer le matériel) . Ce n'est pas Google, Facebook, Amazon, etc avec 100's d'ingénieurs, et des millions de dollars de revenus pour recycler dans des systèmes toujours plus grands. Et nous ne pouvons pas simplement déplacer notreERDDAP™par exemple, Amazon AWS, parce que les coûts de stockage des données sont importants et que les frais d'évacuation des données sont importants et variables, tandis que notre budget pour les services externes est fixe de 0 $.
        * Ma demande aux utilisateurs est : pour les demandes non sensibles au temps (qui est de loin le cas le plus fréquent) , leur système devrait juste faire une demande à la fois. Si les demandes sont sensibles au temps (Par exemple, plusieurs .pngs sur une page Web, plusieurs tuiles pour unWMSclient, etc.) , alors peut-être 4 demandes simultanées devraient être le maximum (et juste pour un temps très court) .
        * Si vous expliquez la situation à l'utilisateur, la plupart des utilisateurs comprendront et seront prêts à apporter les changements nécessaires afin que vous puissiez supprimer leur adresse IP de la liste noire.
             
    * Pour blacklister un utilisateur, ajoutez leur adresse IP numérique à la liste des adresses IP séparées par des virgules&lt;requêteBlacklist&gt; dans votredatasets.xmlfichier. Pour trouver l'adresse IP difficile de l'utilisateur, regardez dans leERDDAP™  *BigParent Directory* fichier /logs/log.txt ( *BigParent Directory* est spécifié dans[configuration.xml](/docs/server-admin/deploy-install#setupxml)) pour voir si c'est le cas et trouver l'adresse IP de cet utilisateur. L'adresse IP de chaque demande est indiquée sur les lignes commençant par «&#123;&#123;&#123;&#123;#» et est composée de quatre numéros séparés par des périodes, par exemple 123.45.67.8 . La recherche de "ERROR" vous aidera à trouver des problèmes tels que des demandes non valides.
    * Vous pouvez également remplacer le dernier numéro dans une adresse IP par\\*(par exemple, 202.109.200.\\*) pour bloquer une plage d'adresses IP, 0-255.
    * Vous pouvez également remplacer les 2 derniers numéros dans une adresse IP par\\*.\\*  (Par exemple, 121.204.\\*.\\*) pour bloquer une gamme plus large d'adresses IP, 0-255.0-255.
    * Par exemple,
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * Pas besoin de redémarrer.ERDDAP™pour les changements&lt;demander à Blacklist de prendre effet. Les changements seront détectés la prochaine foisERDDAP™vérifie si des ensembles de données doivent être rechargés. Ou, vous pouvez accélérer le processus en visitant un[setDataset URL du drapeau](/docs/server-admin/additional-information#set-dataset-flag)pour tout ensemble de données.
    * VotreERDDAP™rapport quotidien comprend une liste/tally des demandeurs les plus actifs autorisés et bloqués.
    * Si vous voulez savoir quel domaine/institution est lié à une adresse IP numérique, vous pouvez utiliser un service Web DNS gratuit et inversé comme[ https://network-tools.com/ ](https://network-tools.com/).
    * Il peut y avoir des moments où il est logique de bloquer certains utilisateurs à un niveau supérieur, par exemple, les utilisateurs malveillants. Par exemple, vous pouvez bloquer leur accès à tout sur votre serveur, pas seulementERDDAP. Sur Linux, une de ces méthodes est d'utiliser[iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/). Par exemple, vous pouvez ajouter une règle qui bloquera tout venant de 198.51.100.0 avec la commande
iptables -I INPUT -s 198.51.100.0 -j DROP
       
### &lt;LentDownTroubleMillis&gt;{#slowdowntroublemillis} 
* [ ** &lt;LentDownTroubleMillis&gt; ** - Oui. (#slowdowntroublemillis) est une étiquette OPTIONNELLE rarement utilisée&lt;erddapDatasets&gt; tag indatasets.xmlqui contient un entier précisant le nombre de millisecondes (par défaut=1000) pour s'arrêter lorsque vous répondez à toutes les requêtes manquées, p. ex., ensemble de données inconnu, demande trop grande, utilisateur sur la liste noire. Par exemple,
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Si un script fait une requête immédiatement après une autre, alors il peut rapidement faire une mauvaise requête après une autre. Avec ce réglage, vous pouvez ralentir un script défaillant doncERDDAP™n'est pas inondé de mauvaises demandes. Si un humain fait une mauvaise demande, ils ne remarqueront même pas ce retard. Recommandations
    
    * Si le problème est un déni de service distribué (DDOS) attaque de plus de 100 attaquants, définissez ceci à un nombre plus petit (100 ?) . Les ralentir trop longtemps conduit à trop de fils actifs.
    * Si le problème est de 1-10 sources, réglez ceci à 1000 ms (par défaut) , mais un plus grand nombre (comme 10000) est également raisonnable. Cela les ralentit pour qu'ils gaspillent moins de ressources réseau. Aussi, 1000 ms ou ainsi ne va pas ennuyer les utilisateurs humains qui font une mauvaise demande.
    
Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag).
     
### &lt;abonnementEmailBlacklist&gt;{#subscriptionemailblacklist} 
* [ ** &lt;abonnement Liste noire du courriel&gt; ** - Oui. (#abonnementemailblacklist) est une étiquette OPTIONNELLE rarement utilisée&lt;erddapDatasets&gt; tag indatasets.xmlqui contient une liste d'adresses e-mail séparées par des virgules qui sont immédiatement sur la liste noire[Système d'abonnement](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)par exemple
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
C'est un système insensible aux cas. Si une adresse e-mail est ajoutée à cette liste, si cette adresse a des abonnements, les abonnements seront annulés. Si une adresse e-mail de la liste tente de s'abonner, la demande sera refusée. Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag).
     
### Texte standard{#standard-text} 
*   [ **Texte standard** ](#standard-text)-- Il y a plusieurs balises OPTIONNELLES (la plupart sont rarement utilisés) dans une&lt;erddapDatasets&gt; tag indatasets.xmlpour spécifier le texte qui apparaît en divers endroitsERDDAP. Si vous voulez modifier le texte par défaut, copiez la valeur existante à partir de la balise du même nom dans
     *Tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util.messages.xml dansdatasets.xml, puis modifier le contenu. L'avantage dedatasets.xmlest que vous pouvez spécifier de nouvelles valeurs à tout moment, même lorsqueERDDAP™est en train de courir. Toute modification des valeurs de ces balises prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag). Les noms de tags décrivent leur but, mais voir le contenu par défaut dans message.xml pour une compréhension plus approfondie.
    
    *   &lt;standardLicense&gt;
    *   &lt;standardContact&gt;
    *   &lt;standardDataLicenses&gt;
    *   &lt;standardDisclaimerOfEndorsement&gt;
    *   &lt;standardDisclaimerOfExternalLinks&gt;
    *   &lt;standardDisclaimer général&gt;
    *   &lt;standard Politique de confidentialité&gt;
    *   &lt;startHeadHtml5&gt;
    *   &lt;startBodyHtml5&gt; est une bonne balise à changer afin de personnaliser l'apparence du haut de chaque page Web dans votreERDDAP. Notamment, vous pouvez utiliser ceci pour ajouter facilement un message temporaire sur leERDDAP™page d'accueil (Par exemple, "Vérifiez le nouvel ensemble de données JPL MUR SST v4.1 ..." ou "CeciERDDAP™sera hors ligne pour la maintenance 2019-05-08T17:00:00 PDT à 2019-05-08T20:00:00 PDT.") . Un écueil de mettre cette étiquette dansdatasets.xmlest : lorsque vous redémarrezERDDAP, la première demande deERDDAP™retournera le démarrage par défaut BodyHtml5 HTML, mais chaque requête ultérieure utilisera le startBodyHtml5 HTML spécifié dansdatasets.xml.
    *   &lt;la description abrégée Html&gt; est une bonne étiquette à changer afin de personnaliser la description de votreERDDAP. Notez que vous pouvez facilement modifier cela pour ajouter un message temporaire sur la page d'accueil (Par exemple :ERDDAP™sera hors ligne pour la maintenance 2019-05-08T17:00:00 PDT à 2019-05-08T20:00:00 PDT.") .
    *   &lt;endBodyHtml5&gt;
    
      
AvantERDDAP™v2.00, ils ont été spécifiés dans setup.xml, qui est encore autorisé mais découragé.
     
### &lt;inhabituelle Activité&gt;{#unusualactivity} 
* [ ** &lt;activité inhabituelle&gt; ** - Oui. (#activité inhabituelle) est une étiquette OPTIONNELLE rarement utilisée&lt;erddapDatasets&gt; tag indatasets.xmlpour spécifier le nombre maximal de requêtes entre deux séries de LoadDatasets considérées comme normales (par défaut=10000) . Si ce nombre est dépassé, un e-mail est envoyé à EverythingTo (comme spécifié dans setup.xml) . Par exemple,
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag). AvantERDDAP™v2.00, cela a été spécifié dans setup.xml, qui est encore autorisé mais découragé.
     
### &lt;mettre à jourMaxEvents&gt;{#updatemaxevents} 
* [ ** &lt;mise à jourMaxEvents&gt; ** - Oui. (#mise à jourmaxevents) est une étiquette OPTIONNELLE rarement utilisée&lt;erddapDatasets&gt; tag indatasets.xmlpour spécifier le nombre maximal d'événements de changement de fichier (par défaut=10) qui sera géré par le [&lt;mise à jour de EveryNMillis&gt;] (#mise à jour de tout le monde) avant de changer de recharger l'ensemble de données. Par exemple,
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
Le système de mise à jour EveryNMillis est destiné à fonctionner très rapidement juste avant que la demande d'un utilisateur soit traitée. S'il y a beaucoup d'événements de changement de fichier, alors probablement il ne peut pas fonctionner rapidement, donc il appelle plutôt pour que le jeu de données soit rechargé. Si votreERDDAP™traite des ensembles de données qui doivent être tenus à jour, même lorsqu'il y a des changements à un grand nombre de fichiers de données, vous pouvez le configurer à un plus grand nombre (100 ?) .

### &lt;l'utilisateur et le titulaire;{#user} 
* [ ** &lt;utilisateur&gt; ** - Oui. (#utilisateur) est une étiquette OPTIONNELLE&lt;erddapDatasets&gt; tag indatasets.xmlqui identifie le nom d'utilisateur, mot de passe (si authentification=client) , et les rôles (une liste séparée par des virgules) . L'utilisation du nom d'utilisateur et du mot de passe varie légèrement en fonction de la valeur de [&lt;authentification&gt;] (/docs/serveur-admin/information complémentaire#authentification) dans votreERDDAPLe fichier setup.xml.
    * Cela fait partie desERDDAP's[système de sécurité](/docs/server-admin/additional-information#security)pour restreindre l'accès à certains ensembles de données à certains utilisateurs.
    * Faites une séparation&lt;user&gt; tag pour chaque utilisateur. En option, si authentification=oauth2, vous pouvez configurer deux&lt;utilisateur&gt; tags pour chaque utilisateur: un pour quand l'utilisateur se connecte via Google, un pour quand l'utilisateur se connecte via Orcid, probablement avec les mêmes rôles.
    * S'il n'y a pas&lt;user&gt; tag pour un client, il ne pourra accéder qu'aux ensembles de données publics, c'est-à-dire aux ensembles de données qui n'ont pas de [&lt;accessibleÀ&gt;] (#accessible à) étiquette.
    * Nom d'utilisateur
Pour l'authentification=custom, le nom d'utilisateur est habituellement une combinaison de lettres, de chiffres, de points forts et de périodes.
Pour l'authentification=email, le nom d'utilisateur est l'adresse email de l'utilisateur. Il peut s'agir de toute adresse e-mail.
Pour l'authentification=google, le nom d'utilisateur est l'adresse email complète de Google de l'utilisateur. Cela inclut les comptes gérés par Google comme@noaa.govcomptes.
Pour l'authentification=orcide, le nom d'utilisateur est le numéro de compte Orcide de l'utilisateur (avec des tirets) .
Pour l'authentification=oauth2, le nom d'utilisateur est l'adresse e-mail complète de Google ou le numéro de compte Orcid de l'utilisateur (avec des tirets) .
    * mot de passe
Pour l'authentification=email, google, orcid, ou oauth2, ne spécifiez pas d'attribut de mot de passe.
Pour authentification=custom, vous devez spécifier un attribut de mot de passe pour chaque utilisateur.
        * Les mots de passe que les utilisateurs saisissent sont sensibles à la casse et doivent avoir 8 caractères ou plus afin qu'ils soient plus difficiles à casser. Aujourd'hui, même 8 caractères peuvent être fissurés rapidement et à peu de frais par la force brute à l'aide d'un groupe d'ordinateurs sur AWS.ERDDAP™n'applique le minimum de 8 caractères que lorsque l'utilisateur tente de se connecter (pas lorsque le&lt;user&gt; tag est en cours de traitement, parce que ce code ne voit que le hash digest du mot de passe, pas le mot de passe en texte simple).
        * de setup.xml&lt;mot de passeEncodage&gt; détermine comment les mots de passe sont stockés dans le&lt;utilisateur&gt; tags dansdatasets.xml. Afin d'accroître la sécurité, les options sont les suivantes :
            *   [MD5](https://en.wikipedia.org/wiki/MD5)  (N'utilise pas ça &#33;) -- pour l'attribut mot de passe, indiquez le digest de hachage MD5 du mot de passe de l'utilisateur.
            * UEPMD5 (N'utilise pas ça &#33;) -- pour l'attribut mot de passe, spécifiez le digest de hachage MD5 *Nom d'utilisateur* :ERDDAP: *mot de passe* . Le nom d'utilisateur et "ERDDAP" sont utilisés pour[sel](https://en.wikipedia.org/wiki/Salt_(cryptography)) la valeur de hachage, ce qui rend plus difficile le décodage.
            *   [SHA256](https://en.wikipedia.org/wiki/SHA-2)  (non recommandé) -- pour l'attribut mot de passe, indiquez le digest de hachage SHA-256 du mot de passe de l'utilisateur.
            * UEPSHA256 (par défaut, mot de passe recommandéEncodage. Mais beaucoup mieux : utilisez les options d'authentification google, orchidée ou oauth2.) -- pour l'attribut mot de passe, spécifiez le digest de hachage SHA-256 *Nom d'utilisateur* :ERDDAP: *mot de passe* . Le nom d'utilisateur et "ERDDAP" sont utilisés pour saler la valeur du hachage, ce qui rend plus difficile le décodage.
        * Sous Windows, vous pouvez générer des valeurs de digest de mot de passe MD5 en téléchargeant un programme MD5 (tels que[MD5](https://www.fourmilab.ch/md5/)) et utilisation (par exemple) :
md5 -djsmith:ERDDAP: *mot de passe réel* 
        * Sur Linux/Unix, vous pouvez générer des valeurs de digest MD5 en utilisant le programme md5sum intégré (par exemple) :
echo -n "jsmith:ERDDAP: *mot de passe réel* "|md5sum
        * Les mots de passe en texte clair stockés sont sensibles aux cas. Les formes stockées des mots de passe MD5 et UEPMD5 ne sont pas sensibles aux cas.
        * Par exemple (utilisant UEPMD5) , si nom d'utilisateur (jsmith) et mot de passe (myPassword),&lt;user&gt; tag est :
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
où le mot de passe stocké a été généré avec
md5 -djsmith:ERDDAP:monMot de passe
        * Les rôles sont une liste de rôles séparés par des virgules pour laquelle l'utilisateur est autorisé. Toutes&lt;dataset&gt; peut avoir un [&lt;accessibleÀ&gt;] (#accessible à) tag qui énumère les rôles qui sont autorisés à accéder à cet ensemble de données. Pour un utilisateur donné et un ensemble de données donné, si l'un des rôles de la liste de rôles de l'utilisateur correspond à l'un des rôles de la liste de&lt;accessibleÀ&gt; rôles, l'utilisateur est alors autorisé à accéder à cet ensemble de données.
            
Chaque utilisateur qui se connecte reçoit automatiquement le rôle\\[N'importe quiLoged En\\], s'il y a&lt;user&gt; tag pour eux dansdatasets.xmlOu pas. Donc, si un ensemble de données donné a
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
alors tout utilisateur qui est connecté sera autorisé à accéder à cet ensemble de données, même s'il n'y a pas&lt;user&gt; tag pour eux dansdatasets.xml.
            
    * Toute modification de la valeur de cette balise prendra effet la prochaine foisERDDAP™litdatasets.xml, y compris en réponse à un ensemble de données[drapeau](/docs/server-admin/additional-information#flag).
         
### &lt;le cheminRegex&gt;{#pathregex} 
* [ ** &lt;pathRegex&gt; ** - Oui. (#pathregex) permet de spécifier une expression régulière qui limite les chemins (sous-répertoires) sera inclus dans l'ensemble de données. La valeur par défaut est .\\*, qui correspond à tous les chemins. Il s'agit d'un tag OPTIONAL rarement utilisé, rarement nécessaireEDDGridDes jeux de donnéesFiles, EDDTableFromFiles et quelques autres types de jeux de données. Cependant, quand vous en avez besoin, vous en avez vraiment besoin.
    
Pour que cela fonctionne, vous devez être vraiment bon avec des expressions régulières. Voir ceci[documentation régex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)et[tutoriel regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html). En particulier, vous devez connaître les groupes de capture (Quelque chose entre parenthèses) , et le symbole "ou" "|".
Ensemble, ils vous permettent de spécifier n'importe quel nombre d'options, par exemple, (option1|option2|option3) .
En outre, aucune des options ne peut être rien, par exemple, (|option2|option3) .
En outre, vous devez savoir que les groupes de capture peuvent être imbriqués, c'est-à-dire que toute option dans un groupe de capture peut contenir un autre groupe de capture, p. ex., (|option2 (|option2 b|option2c) |option3) qui dit que l'option2 peut être suivie de rien, ou option2b, ou option2c.
Pour pathRegexes, chaque option sera un nom de dossier suivi d'un /, p.ex., bar/ .
    
La partie délicate du cheminRegex est: QuandERDDAP™descend de façon récursive l'arborescence des répertoires, le cheminRegex doit accepter tous les chemins qu'il rencontre sur son chemin vers les répertoires avec des données. Regex's avec des groupes de capture imbriqués sont une bonne façon de gérer cela.
    
Exemple :
Supposons que nous ayons la structure de répertoire suivante:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
et le fichier spécifié Directory est /foo/bar/, et nous voulons juste le.ncfichiers dans le D\\[0-9\\]&#123;4&#125;/a/ Sous-répertoires
La solution est de définir pathRegex à /foo/bar/ (|D\\[0-9\\]&#123;4&#125;/ (|a/) )   
C'est écrit :
Le chemin doit commencer par /foo/bar/
Cela peut être suivi de rien ou de D\\[0-9\\]&#123;4&#125;/
Cela peut être suivi de rien ou de
    
Oui, le chemin de Regex peut être incroyablement difficile à formuler. Si vous êtes coincé, demandez à un programmeur d'ordinateur (La chose la plus proche du monde réel d'un magicien qui lance des incantations ?) ou envoyer un courriel à Chris. John à noaa.gov.
    
### &lt;ensembles de données et gt;{#dataset} 
* [ ** &lt;ensemble de données&gt; ** - Oui. (#ensemble de données) est une option (mais toujours utilisé) tag dans un&lt;erddapDatasets&gt; tag indatasets.xmlque (si vous incluez toutes les informations entre&lt;ensemble de données&gt; et&lt;/dataset&gt;) décrit complètement un ensemble de données. Par exemple,
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
Il peut y avoir n'importe quel nombre de balises de jeu de données dans votredatasets.xmlfichier.
Trois attributs PEUVENT apparaître dans un&lt;dataset&gt; tag & #160;:
     
    *    **Type *a Type* "** est un attribut REQUIS dans un&lt;dataset&gt; balise dansdatasets.xmlqui identifie le type d'ensemble de données (par exemple, s'il s'agitEDDGrid/grilled ou EDDTable/ensemble de données tabulaires) et la source des données (par exemple, une base de données, des fichiers ou une télécommandeOPeNDAPserveur) . Voir[ **Liste des types de données** ](#list-of-types-datasets).
         
#### ensemble de données Idée{#datasetid} 
*   [ **datasetID=" *aDatasetID* "** ](#datasetid)est un attribut REQUIS dans un&lt;dataset&gt; tag qui assigne un court (généralement&lt;15 caractères), unique, identifiant le nom d'un ensemble de données.
    * LesdatasetIDs DOIT être une lettre (A-Z, a-z) suivi d'un nombre quelconque de A-Z, a-z, 0-9 et \\_ (mais mieux si&lt;32 caractères au total).
    * Ensemble de données Les ID sont sensibles à la casse, mais ne créent pas deuxdatasetIDs qui diffèrent uniquement en lettres majuscules ou minuscules. Il causera des problèmes sur les ordinateurs Windows (Votre ordinateur et/ou celui d'un utilisateur) .
    * Meilleures pratiques: Nous recommandons d'utiliser[chameau Affaire](https://en.wikipedia.org/wiki/CamelCase).
    * Meilleures pratiques: Nous recommandons que la première partie soit un acronyme ou une abréviation du nom de l'institution source et la deuxième partie soit un acronyme ou une abréviation du nom de l'ensemble de données. Dans la mesure du possible, nous créons un nom qui reflète le nom de la source pour l'ensemble de données. Par exemple, nous avons utilisédatasetID="erdPHssta8jour" pour un ensemble de donnéesNOAA NMFS SWFSCDivision de la recherche environnementale (ERD) qui est désigné par la source comme satellite/PH/sst8 jours.
    * Si vous changez le nom d'un ensemble de données, l'ancien ensemble de données (avec l'ancien nom) sera toujours en vieERDDAP. Il s'agit d'un ensemble de données "orphelines", parce que la spécificationdatasets.xmlIl est parti. Cette question doit être réglée:
        1. PourERDDAP™v2.19 et plus tard, vous n'avez rien à faire.ERDDAP™supprimera automatiquement ces ensembles de données orphelins.
        2. PourERDDAP™v2.18 et plus tôt, vous devez faire quelque chose pour supprimer les ensembles de données orphelins: Faire un ensemble de données actif, p.ex.,
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
Après la prochaine charge majeure Ensembles de données Vous pouvez supprimer cette balise après que l'ancien jeu de données soit inactif.
                 
#### actif{#active} 
*   [ **actif *booléen* "** ](#active)est un attribut&lt;dataset&gt; balise dansdatasets.xmlqui indique si un ensemble de données est actif (éligibles à une utilisation dansERDDAP) Ou pas.
    * Les valeurs valides sont vraies (par défaut) et faux.
    * Puisque la valeur par défaut est vraie, vous n'avez pas besoin d'utiliser cet attribut jusqu'à ce que vous voulez supprimer temporairement ou définitivement ce jeu de données deERDDAP.
    * Si vous supprimez simplement un ensemble de données actifdatasets.xml, l'ensemble de données sera toujours actifERDDAP™mais ne sera jamais mis à jour. Un tel ensemble de données sera un "orphelin" et sera listé comme tel sur le statut. html page Web juste en dessous de la liste des ensembles de données qui n'ont pas été chargés.
    * Si vous définissez actif: false",ERDDAP™désactivera le jeu de données la prochaine fois qu'il tentera de le mettre à jour. Quand tu fais ça,ERDDAP™ne jette aucune information qu'il peut avoir stockée sur l'ensemble de données et ne fait certainement rien aux données réelles.
    * Afin de supprimer un ensemble de données deERDDAP™Voir[Forcer la suppression des données](/docs/server-admin/additional-information#removing-datasets).
         

 ** Plusieurs balises peuvent apparaître entre les&lt;ensemble de données&gt; et&lt;/dataset&gt; tags. **   
Il y a une certaine variation dans laquelle les balises sont autorisées par quels types de ensembles de données. Voir la documentation pour une[type d'ensemble de données](#list-of-types-datasets)pour plus de détails.

#### &lt;accessible Aux fins;{#accessibleto} 
* [ ** &lt;accessible Pour&gt; ** - Oui. (#accessible à) est une étiquette OPTIONNELLE dans un&lt;dataset&gt; balise qui spécifie une liste séparée par des virgules[Rôles](#user)qui sont autorisés à avoir accès à cet ensemble de données. Par exemple,
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * Cela fait partie desERDDAP's[système de sécurité](/docs/server-admin/additional-information#security)pour restreindre l'accès à certains ensembles de données à certains utilisateurs.
    * Si cette balise n'est pas présente, tous les utilisateurs (même s'ils ne sont pas connectés) aura accès à cet ensemble de données.
    * Si cette balise est présente, cet ensemble de données ne sera visible et accessible qu'aux utilisateurs connectés qui ont l'un des rôles spécifiés. Cet ensemble de données ne sera pas visible pour les utilisateurs qui ne sont pas connectés.
    * Chaque utilisateur qui se connecte reçoit automatiquement le rôle\\[N'importe quiLoged En\\], s'il y a&lt;user&gt; tag pour eux dansdatasets.xmlOu pas. Donc, si un ensemble de données donné a
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
alors tout utilisateur qui est connecté sera autorisé à accéder à cet ensemble de données, même s'il n'y a pas&lt;user&gt; tag pour eux dansdatasets.xml.
         
#### &lt;graphiquesAccessibles à &gt;{#graphsaccessibleto} 
* [ ** &lt;graphiquesAccessibleà&gt; ** - Oui. (#graphsaccessibleà) est une étiquette OPTIONNELLE dans un&lt;dataset&gt; balise dansdatasets.xmlqui détermine si les graphiques et métadonnées de l'ensemble de données sont accessibles au public. Il offre un moyen de supprimer partiellement les données du jeu de données [&lt;accessibleÀ&gt;] (#accessible à) mise en place. Les valeurs autorisées sont:
    * auto -- Cette valeur (ou l'absence de&lt;graphicsAccessibleTo&gt; tag pour l'ensemble de données) permet d'accéder aux graphiques et métadonnées de l'ensemble de données simulant l'ensemble de données&lt;accessibleÀ&gt; réglage.
Donc, si l'ensemble de données est privé, ses graphiques et métadonnées seront privés.
Et si l'ensemble de données est public, ses graphiques et métadonnées seront publics.
    * publique -- Ce paramètre rend les graphiques et métadonnées de l'ensemble de données accessibles à n'importe qui, même aux utilisateurs qui ne sont pas connectés, même si l'ensemble de données est autrement privé parce qu'il a un&lt;accessibleÀ&gt; étiquette.
         
#### &lt;accessible ViaFiles&gt;{#accessibleviafiles} 
* [ ** &lt;accèsViaFiles&gt; ** - Oui. (#accessibleviafiles) est une étiquette OPTIONNELLE dans un&lt;dataset&gt; balise dansdatasets.xmlpour[EDDGridTotalExistingDimension](#eddgridaggregateexistingdimension),[EDDGridCopier](#eddgridcopy),[EDDGridD'EDDTable](#eddgridfromeddtable),[EDDGridDeErddap](#eddfromerddap),[EDDGridDe Etopo](#eddgridfrometopo),[EDDGridFichiers](#eddgridfromfiles)  (y compris toutes les sous-classes) ,[EDDGridSideBySide](#eddgridsidebyside),[EDDTableCopy](#eddtablecopy) [EDDTableDeErddap](#eddfromerddap),[Tableau EDD deEDDGrid](#eddtablefromeddgrid)et[EDDTableFromFiles](#eddtablefromfiles)  (y compris toutes les sous-classes) les ensembles de données. Il peut avoir une valeur de vrai ou faux. Par exemple,
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Si la valeur est vraie,ERDDAP™va le faire afin que les utilisateurs puissent parcourir et télécharger les fichiers de données source de l'ensemble de données viaERDDAP's["files"système](https://coastwatch.pfeg.noaa.gov/erddap/files/). Voir"files"système[la documentation](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)pour plus d'informations.
    
La valeur par défaut de&lt;accèsViaFiles&gt; vient de&lt;par défautAccessibleViaFiles&gt; en[configuration.xml](/docs/server-admin/deploy-install#setupxml). Il a une valeur par défaut de false, mais nous vous recommandons d'ajouter cette balise à votre setup.xml avec une valeur de true.
    
Recommandation Nous recommandons de rendre tous les ensembles de données pertinents accessibles via le système de fichiers en paramétrant&lt;par défautAccessibleViaFiles&gt; à true dans setup.xml parce qu'il y a un groupe d'utilisateurs pour qui c'est le moyen préféré pour obtenir les données. Entre autres raisons,"files"système permet aux utilisateurs de voir facilement quels fichiers sont disponibles et quand ils ont changé pour la dernière fois, ce qui permet à un utilisateur de conserver sa propre copie de l'ensemble des données. Si vous ne voulez généralement pas rendre les ensembles de données accessibles via le système de fichiers, définissez&lt;par défautAccessibleViaFiles&gt; à false. Dans les deux cas, utilisez simplement&lt;accessibleViaFiles&gt; pour les quelques ensembles de données qui sont des exceptions à la politique générale définie par&lt;par défautAccessibleViaFiles&gt; (par exemple, lorsque l'ensemble de données utilise[.ncml](#ncml-files)fichiers, qui ne sont pas vraiment utiles pour les utilisateurs) .
     
#### &lt;accessible VoieWMS&gt;{#accessibleviawms} 
* [ ** &lt;accessible VoieWMS&gt; ** - Oui. (#accèsviawms) est une étiquette OPTIONNELLE dans un&lt;dataset&gt; balise dansdatasets.xmlpour tous[EDDGrid](#eddgrid)Sous-classes. Il peut avoir une valeur de vrai (par défaut) ou faux. Par exemple,
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Si la valeur est fausse,ERDDAP'sWMSle serveur ne sera pas disponible pour cet ensemble de données. Ceci est couramment utilisé pour les ensembles de données dont les valeurs de longitude sont supérieures à 180 (qui est techniquement invalide pourWMSservices) , et pour laquelle vous offrez également une variante de l'ensemble de données avec des valeurs de longitude entièrement dans la gamme -180 à 180 via[EDDGridLonPM180](#eddgridlonpm180).
Si la valeur est vraie,ERDDAP™tentera de rendre l'ensemble de données disponible viaERDDAP'sWMSserveur. Mais si l'ensemble de données est totalement inapproprié pourWMS  (Par exemple, il n'existe aucune donnée sur la longitude ou la latitude) , alors l'ensemble de données ne sera pas disponible viaERDDAP'sWMSserveur, quel que soit ce paramètre.
     
#### &lt;ajouter Variables Où et où;{#addvariableswhere} 
* [&lt;ajouterVariablesOù&gt;] (#addvariables où) est une étiquette OPTIONNELLE&lt;dataset&gt; tag pour tous les ensembles de données EDDTable.
    
Les demandes de tout ensemble de données EDDTable peuvent inclure &add Variables où (" *attribut Dénomination* "," *attribut Valeur* ") , qui ditERDDAP™ajouter toutes les variables de l'ensemble de données où *attributName=attributValue* à la liste des variables demandées. Par exemple, si un utilisateur ajoute &add Variables où ("ioos\\_category""Wind") à une requête,ERDDAPajoutera toutes les variables de l'ensemble de donnéesioos\\_category=Attribut Wind à la liste des variables demandées (Par exemple, ventSpeed, ventDirection, ventGustSpeed) . *attribut Dénomination* et *attribut Valeur* sont sensibles aux cas.
    
Endatasets.xml, si le morceau de dataset.xml pour un dataset a
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
par exemple,
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
le formulaire d'accès aux données (Page web .html) pour l'ensemble de données comprendra un widget (pour chaque attributName dans la liste des virgules séparées) juste en dessous de la liste des variables qui permet aux utilisateurs de spécifier une valeur d'attribut. Si l'utilisateur sélectionne une valeur d'attribut pour un ou plusieurs noms d'attribut, ils seront ajoutés à la requête via &add Variables où (" *attribut Dénomination* "," *attribut Valeur* ") . Ainsi, cette étiquette dansdatasets.xmlpermet de spécifier la liste des noms d'attributs qui apparaîtra sur le formulaire d'accès aux données pour cet ensemble de données et facilite l'ajout de &addVariables Où fonctionne la demande. Les *attributNomsCSV* liste est sensible aux cas.
    
#### &lt;altitudeMetersPerSourceUnit&gt;{#altitudemeterspersourceunit} 
* [ ** &lt;altitudeMetersPerSourceUnit&gt; ** - Oui. (#altitudemètrespersourceunit) est une étiquette OPTIONNELLE&lt;dataset&gt; tag dans les ensembles de données. xxml pour EDDTableFromSOSensembles de données (Seulement &#33;) qui spécifie un nombre multiplié par les valeurs d'altitude ou de profondeur de source pour les convertir en valeurs d'altitude (en mètres au-dessus du niveau de la mer) . Par exemple,
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
Cette balise DOIT être utilisée si les valeurs de l'axe vertical de l'ensemble de données ne sont pas des mètres, positive=up. Sinon, c'est OPTIONNEL, puisque la valeur par défaut est 1. Par exemple,
    * Si la source est déjà mesurée en mètres au-dessus du niveau de la mer, utiliser 1 (ou n'utilisez pas cette balise, puisque 1 est la valeur par défaut) .
    * Si la source est mesurée en mètres au-dessous du niveau de la mer, utilisez -1.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Si la source est mesurée en km au-dessus du niveau de la mer, utiliser 0,001.
         
#### &lt;par défautDataQuery&gt;{#defaultdataquery} 
* [ ** &lt;par défautDataQuery&gt; ** - Oui. (#defaultdataquery) est une étiquette OPTIONNELLE dans un&lt;dataset&gt; balise dansdatasets.xmlqui ditERDDAP™pour utiliser la requête spécifiée (la partie de l'URL après le "?") si le fichier .html Type (le formulaire d'accès aux données) est demandé sans requête.
    * Vous aurez probablement rarement besoin d'utiliser ceci.
    * Vous devez coder XML (Pas de code pour cent) les requêtes par défaut puisqu'elles sont dans un document XML. Par exemple, & devient &amp; ,&lt;devient&lt;, &gt; devient &gt; .
    * Vérifiez votre travail. Il est facile de faire une erreur et de ne pas obtenir ce que vous voulez.ERDDAP™va essayer de nettoyer vos erreurs -- mais ne comptez pas sur cela, puisque\\*Comment\\*il est nettoyé peut changer.
    * Pour les ensembles de données de griddap, une utilisation courante est de spécifier une autre valeur par défaut de profondeur ou de dimension d'altitude (par exemple,\\[0\\]au lieu de\\[dernier\\]) .
Dans tous les cas, vous devez toujours énumérer toutes les variables, toujours utiliser les mêmes valeurs de dimension pour toutes les variables, et presque toujours utiliser\\[0\\],\\[dernier\\]ou\\[0:dernier\\]pour les valeurs de dimension.
Par exemple:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * Pourtabledaples ensembles de données, si vous ne spécifiez aucune contrainte, la requête retournera l'ensemble des ensembles de données, qui peuvent être impraticables, selon l'ensemble de données. Si vous ne voulez pas spécifier de contraintes, plutôt que d'avoir un vide&lt;par défautDataQuery&gt; (qui est identique à ne pas spécifier un défaut Demande de données) , vous devez énumérer explicitement toutes les variables que vous souhaitez inclure dans laDataQuery par défaut.
    * Pourtabledapdatasets, l'utilisation la plus courante de ceci est de spécifier une plage de temps par défaut différente (par rapport au maximum (heure) , par exemple, &time&gt;=max (heure) -1jour, ou relatif à maintenant, par exemple, &time&gt;=now-1 jour) .
Rappelez-vous que demander aucune variable de données est la même que de spécifier toutes les variables de données, donc généralement vous pouvez simplement spécifier la nouvelle contrainte de temps.
Par exemple:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
ou
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;par défautGraphQuery&gt;{#defaultgraphquery} 
* [ ** &lt;par défautGraphQuery&gt; ** - Oui. (#defaultgraphquery) est une étiquette OPTIONNELLE dans un&lt;dataset&gt; balise dansdatasets.xmlqui ditERDDAP™pour utiliser la requête spécifiée (la partie de l'URL après le "?") si le fichier .graph Type (le formulaire Marquer un graphique) est demandé sans requête.
    * Vous aurez probablement rarement besoin d'utiliser ceci.
    * Vous devez coder XML (Pas de code pour cent) les requêtes par défaut puisqu'elles sont dans un document XML. Par exemple, & devient &amp; ,&lt;devient&lt;, &gt; devient &gt; .
    * Vérifiez votre travail. Il est facile de faire une erreur et de ne pas obtenir ce que vous voulez.ERDDAP™va essayer de nettoyer vos erreurs -- mais ne comptez pas sur cela, puisque\\*Comment\\*il est nettoyé peut changer.
    * Pour les ensembles de données griddap, l'utilisation la plus courante de ceci est de spécifier une valeur de profondeur ou d'altitude différente par défaut (par exemple,\\[0\\]au lieu de\\[dernier\\]) et/ou pour spécifier qu'une variable spécifique doit être graphique.
Dans tous les cas, vous utiliserez presque toujours\\[0\\],\\[dernier\\]ou\\[0:dernier\\]pour les valeurs de dimension.
Par exemple:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (mais mettez tout sur une seule ligne) 
    * Pourtabledapdatasets, si vous ne spécifiez aucune contrainte, la requête va graphiquer l'ensemble des données, ce qui peut prendre beaucoup de temps, en fonction de l'ensemble de données.
    * Pourtabledapdatasets, l'utilisation la plus courante de ceci est de spécifier une plage de temps par défaut différente (par rapport au maximum (heure) , par exemple, &time&gt;=max (heure) -1jour, ou relatif à maintenant, par exemple, &time&gt;=now-1 jour) .
Rappelez-vous que demander aucune variable de données est la même que de spécifier toutes les variables de données, donc généralement vous pouvez simplement spécifier la nouvelle contrainte de temps.
Par exemple:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
ou
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;dimensionValuesInMemory&gt;{#dimensionvaluesinmemory} 
* [ ** &lt;dimension ValeursInMemory&gt; ** - Oui. (#valeurs de dimension)   (vrai (par défaut) ou faux) est une étiquette OPTIONNELLE et rarement utilisée&lt;dataset&gt; tag pour n'importe quelEDDGriddataset qui indiqueERDDAP™où conserver les valeurs de source des dimensions (aussi connu sous le nomaxisVariables) :
    
    * true = en mémoire (qui est plus rapide mais utilise plus de mémoire) 
    * false = sur le disque (qui est plus lent mais n'utilise pas de mémoire) 
    
Par exemple,
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
Vous ne devriez utiliser ceci avec la valeur non par défaut de false si votreERDDAP™a beaucoup de jeux de données avec de très grandes dimensions (Par exemple, des millions de valeursEDDGridLes ensembles de données AudioFiles) etERDDAPL'utilisation de la mémoire est toujours trop élevée. Voir la mémoire: actuellement en utilisant la ligne à\\[votreDomain\\]/erddap/status.htmlà surveillerERDDAP™utilisation de la mémoire.
     
#### &lt;fichierTableInMemory&gt;{#filetableinmemory} 
* [ ** &lt;fichierTableInMemory&gt; ** - Oui. (#mémorie de la table de fichier)   (vrai ou faux (par défaut) ) est une étiquette OPTIONNELLE&lt;dataset&gt; tag pour n'importe quelEDDGridFromFiles et EDDTable Ensemble de données FromFiles qui indiqueERDDAP™où conserver le fichierTable (qui a des informations sur chaque fichier de données source) :
    
    * true = en mémoire (qui est plus rapide mais utilise plus de mémoire) 
    * false = sur le disque (qui est plus lent mais n'utilise pas de mémoire) 
    
Par exemple,
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Si vous définissez ceci à true pour tout ensemble de données, gardez un œil sur la mémoire: actuellement en utilisant la ligne à\\[votreDomain\\]/erddap/status.htmlde veiller à ce queERDDAP™Il a encore beaucoup de mémoire libre.
     
#### &lt;fgdcFile&gt;{#fgdcfile} 
* [ ** &lt;FgdcFile&gt; ** - Oui. (#fgdcfile) est une étiquette OPTIONNELLE dans un&lt;dataset&gt; balise dansdatasets.xmlqui ditERDDAP™utiliser un fichier FGDC pré-made au lieu d'avoirERDDAP™Essayez de générer le fichier. Utilisation :
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *pleine Nom de fichier* peut se référer à un fichier local (quelque part dans le système de fichiers du serveur) ou l'URL d'un fichier distant.
Si *pleine Nom de fichier* \\=" ou le fichier n'est pas trouvé, l'ensemble de données n'aura pas de métadonnées FGDC. Ceci est donc également utile si vous voulez supprimer les métadonnées FGDC pour un ensemble de données spécifique.
Ou, vous pouvez mettre&lt;fgdcActive&gt;faux&lt;/fgdcActive&gt; dans setup.xml à direERDDAP™ne pas offrir de métadonnées FGDC pour un ensemble de données.
     
#### &lt;iso19115 Fichier &gt;{#iso19115file} 
* [ ** &lt;iso19115File&gt; ** - Oui. (#iso19115fichier) est une étiquette OPTIONNELLE dans un&lt;dataset&gt; balise dansdatasets.xmlqui ditERDDAP™utiliser un fichier ISO 19115 pré-fabriqué au lieu d'avoirERDDAP™Essayez de générer le fichier. Utilisation :
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *pleine Nom de fichier* peut se référer à un fichier local (quelque part dans le système de fichiers du serveur) ou l'URL d'un fichier distant.
Si *pleine Nom de fichier* \\=" ou le fichier n'est pas trouvé, l'ensemble de données n'aura pas de métadonnées ISO 19115. Ceci est donc également utile si vous voulez supprimer les métadonnées ISO 19115 pour un ensemble de données spécifique.
Ou, vous pouvez mettre&lt;iso19115Active&gt;faux&lt;/iso19115Active&gt; dans setup.xml à direERDDAP™ne pas offrir de métadonnées ISO 19115 pour un ensemble de données.
     
#### &lt;matchAxe NDigits&gt;{#matchaxisndigits} 
* [ ** &lt;correspondantAxisNDigits&gt; ** - Oui. (Nombre de chiffres) est une étiquette OPTIONNELLEEDDGrid &lt;tag dataset&gt; pourEDDGridles ensembles de données qui sont des regroupements, p.ex. des regroupements de fichiers. Chaque fois que l'ensemble de données est rechargé,ERDDAP™vérifie que les valeurs d'axe de chaque composant de l'agrégation sont les mêmes. La précision des essais est déterminée par la[matchAxisNDigits](#matchaxisndigits), qui spécifie le nombre total de chiffres qui doivent correspondre lors de l ' essai des valeurs de double axe de précision, 0 - 18 (par défaut) . Lors de l'essai des valeurs de l'axe du flotteur, l'essai est effectué avec des chiffres correspondantAxisNDigits/2. Une valeur de 18 ou plus indiqueEDDGridpour faire un test exact. Une valeur de 0 indiqueEDDGridne pas faire d'essais, ce qui n'est pas recommandé, sauf comme décrit ci-dessous.
    
Bien queEDDGridpermet aux composants de l'agrégation d'avoir des valeurs d'axe légèrement différentes, un seul jeu de valeurs d'axe est montré à l'utilisateur. L'ensemble provient du même composant qui fournit les métadonnées source de l'ensemble de données. Par exemple,EDDGridLes ensembles de données FromFiles, qui est spécifié par le&lt;Configuration des métadonnées à partir de&gt; (par défaut=dernier) .
    
L'utilisation de matchAxisNDigits\\=0 est fortement découragée dans la plupart des cas, car elle éteint toute vérification. Même un contrôle minimal est utile car il garantit que les composants sont adaptés pour l'agrégation. Nous supposons tous que tous les composants sont appropriés, mais ce n'est pas toujours le cas. Il s'agit donc d'un important test de santé mentale. Même les valeurs de matchAxisNDigits1, 2, 3 ou 4 sont découragées parce que les différentes valeurs d'axe indiquent souvent que les composants ont été créés (Vous êtes baigné ?) d'une manière différente et ne conviennent donc pas à l'agrégation.
    
Il y a un cas où l'utilisation de matchAxisNDigits\\=0 est utile et recommandée : avec des regroupements de fichiers distants, par exemple, des données dans des seaux S3. Dans ce cas, si l'ensemble de données utilise cacheFromUrl, cacheSizeGB, matchAxisNDigits\\=0, et leEDDGridSystème FromFiles pour[Agrégation par Noms des fichiers](#aggregation-via-file-names-or-global-metadata)AlorsEDDGridne doit pas lire tous les fichiers distants pour faire l'agrégation. Cela permet aux ensembles de données fabriqués à partir de données dans les godets S3 de se charger très rapidement (par opposition à absurdement lentement siEDDGriddoit télécharger et lire tous les fichiers) .
    
#### &lt;nThreads&gt;{#nthreads} 
* En commençant parERDDAP™version 2.00, lorsque toute sous-classe de EDDTableFromFiles ouEDDGridlit les données de sa source, il peut lire un morceau de données (Par exemple, un fichier source) à la fois (dans un seul fil)   (par défaut) ou plusieurs morceaux de données (Par exemple, 2+ fichiers sources) à la fois (en 2 fils ou plus) lors du traitement de chaque demande.
     
    * Règle du jeu :
Pour la plupart des ensembles de données sur la plupart des systèmes, utilisez nThreads=1, la valeur par défaut. Si vous avez un ordinateur puissant (beaucoup de cœurs CPU, beaucoup de mémoire) , puis envisager de mettre nThreads à 2, 3, 4 ou plus (mais jamais plus que le nombre de cœurs CPU dans l'ordinateur) pour les ensembles de données susceptibles de bénéficier:
        
        * La plupart des ensembles de données EDDTableFromFiles profiteront.
        * Les ensembles de données où quelque chose provoque un décalage avant qu'une partie de données puisse être réellement traitée en profiteront, par exemple:
            * Ensembles de données[comprimé à l'extérieur (Par exemple,.gz) ](#externally-compressed-files)binaire (Par exemple,.nc) fichiers, parce queERDDAP™doit décompresser le fichier entier avant qu'il puisse commencer à lire le fichier.
            * Ensembles de données utilisés[cacheSizeGB](#cachefromurl)Parce queERDDAP™souvent doit télécharger le fichier avant qu'il puisse le lire.
            * Ensembles de données contenant des fichiers de données stockés sur un système de fichiers parallèles à large bande, car il peut fournir plus de données, plus rapidement, sur demande. Exemples de systèmes de fichiers parallèles[JBOD](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures),[PNFS](http://www.pnfs.com/),[GlusterFS](https://en.wikipedia.org/wiki/Gluster), Amazon S3 et Google Cloud Storage.
                 
        
Avertissement : Lorsque vous utilisez nThreads&gt;1, gardez un œil surERDDAPUtilisation de la mémoire, utilisation du thread et réactivité globale (voir[ERDDAPLa page d'état](/docs/server-admin/additional-information#status-page)) . Voir les commentaires sur ces questions ci-dessous.
         
    * Pour un ensemble de données donné, ce paramètre nThreads peut provenir de différents endroits :
        
        * Sidatasets.xmlpour un jeu de données a un&lt;nThreads&gt; tag (dans la&lt;dataset&gt; tag, pas comme attribut global) avec une valeur &gt;= 1, cette valeur de nThreads est utilisée. Donc, vous pouvez spécifier un nombre différent pour chaque ensemble de données.
        * Sinon, sidatasets.xmla une&lt;nTableThreads&gt; balise (pour EDDTable Fichiers de données) ou une&lt;tag nGridThreads&gt; (pourEDDGridensembles de données) avec une valeur &gt;= 1, hors d'un&lt;dataset&gt; tag, cette valeur de nThreads est utilisée.
        * Autrement, 1 fil est utilisé, ce qui est un choix sûr puisqu'il utilise la plus petite quantité de mémoire.
             
        
Pour[originaleERDDAP™installation](https://coastwatch.pfeg.noaa.gov/erddap/index.html), nous utilisons
        &lt;nTableThreads&gt; 6&lt;/nTableThreads&gt; (C'est un serveur puissant.) Les demandes difficiles représentent maintenant 30 % des demandes précédentes.
         
##### Surveiller l'utilisation des ressources{#monitor-resource-usage} 
Lorsque vous expérimentez différents paramètres nThreads (et peut-être faire des demandes d'échantillons difficiles à votreERDDAP) , vous pouvez surveiller l'utilisation des ressources de votre ordinateur:
* Sur Macs, utilisez Finder : Applications : Utilitaires : Moniteur d'activités
* Sur Linux, utilisez le haut
* Sur Windows 10, utilisez *Ctrl + Maj + Escal* pour ouvrir le gestionnaire des tâches
             
##### Avertissement : diminution de la réceptivité{#warning-decreased-responsiveness} 
En isolement,ERDDAP™remplira une requête à un jeu de données avec un réglage nThreads plus élevé plus rapidement que si nThreads=1. Mais alors que cette demande est en cours de traitement, d'autres demandes d'autres utilisateurs seront un peu encombrées et obtenir une réponse plus lente. Aussi, quandERDDAP™réponse à une demande donnée, autres ressources informatiques (Par exemple, accès au disque dur, bande passante du réseau) mai être limitatif, en particulier avec des paramètres nThreads plus élevés. Ainsi, avec les paramètres nThreads plus élevés, la réactivité globale du système sera pire lorsqu'il y a plusieurs requêtes en cours de traitement -- cela peut être très ennuyeux pour les utilisateurs&#33; Pour cette raison : ne jamais définir nThreads à plus que le nombre de cœurs CPU dans l'ordinateur. nThreads=1 est le paramètre le plus équitable depuis chaque requête (entre plusieurs demandes simultanées) obtenir une part égale des ressources informatiques. Mais plus l'ordinateur est puissant, moins ce sera un problème.
         
##### Avertissement : Mémoire supérieure Utilisation pourEDDGridDonnées{#warning-higher-memory-use-for-eddgrid-datasets} 
L'utilisation de la mémoire pendant le traitement des requêtes est directement proportionnelle au réglage de nThreads. Une règle de pouce raisonnablement sûre est :[ERDDAPParamètres de la mémoire](/docs/server-admin/deploy-install#memory)à au moins 2 Go + (2 Go \\* nThreads) . Certaines requêtes à certains ensembles de données auront besoin de plus de mémoire que cela. Par exemple, définir nThreads=3 pour n'importe quelEDDGriddataset signifie que le paramètre -Xmx doit être au moins -Xmx8000M. Si ce réglage de mémoire est supérieur à 3/4 la mémoire physique de l'ordinateur, diminuer le réglage de nThreads afin que vous puissiez diminuer le réglage de la mémoire.

L'utilisation de la mémoire des requêtes de traitement de threads aux ensembles de données EDDTable est presque toujours plus faible parce que les fichiers sont généralement beaucoup plus petits. Cependant, si un ensemble de données EDDTable donné a (Par exemple, &gt;=1 Go) les fichiers de données, puis les commentaires ci-dessus s'appliqueront également à ces ensembles de données.

Quel que soit le réglage de nThreads, gardez un œil étroit sur les statistiques d'utilisation de la mémoire sur votre[ERDDAPLa page d'état](/docs/server-admin/additional-information#status-page). Vous ne devriez jamais approcher de maximiser l'utilisation de la mémoire dansERDDAP; sinon il y aura des erreurs et des échecs graves.
        
##### Réglé temporairement à 1{#temporarily-set-to-1} 
Si l'utilisation de la mémoire actuelle est même légèrement élevée,ERDDAP™définira nThreads pour cette requête à 1. Ainsi,ERDDAP™conserve la mémoire lorsque la mémoire est rare.
         
##### Diminuer les retours{#diminishing-returns} 
Il y a des retours décroissants pour augmenter le réglage de nThreads : 2 threads seront bien mieux que 1 (si nous ignorons l'overclocking dynamique) . Mais 3 ne sera qu'un morceau de mieux que 2. Et 4 seront légèrement mieux que 3.

Dans un test d'une requête difficile à un grand ensemble de données EDDTable, le temps de réponse avec 1, 2, 3, 4, 5, 6 threads était de 38, 36, 20, 18, 13, 11 secondes. (Nous utilisons maintenant nTableThreads=6 sur ce serveur.) 

nThreads=2: Bien que, il y ait souvent un avantage important à spécifier nThreads=2 au lieu de nThreads=1, il ne fera souvent pas beaucoup de différence dans le temps d'horloge nécessaire pour répondre à la demande d'un utilisateur donné. La raison est : avec nThreads=1, la plupart des CPU modernes[overclock dynamiquement](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)  (turbopropulseur) augmenter temporairement la vitesse de l'horloge du CPU. Ainsi, avec nThreads=1, le seul noyau fonctionnera souvent à une vitesse d'horloge plus élevée que chacune des deux carottes si vous utilisez nThreads=2. Quoi qu'il en soit, nous pensons toujours qu'il est préférable d'utiliser nThreads=2 plutôt que nThreads=1, car ce réglage donnera de meilleurs résultats dans une plus grande variété de situations. Et bien sûr, si votre ordinateur a suffisamment de cœurs CPU, un réglage de nThreads encore plus élevé devrait donner de meilleurs résultats.

Comme on l'a vu plus haut, les paramètres de nThreads très élevés peuvent conduire à des réponses plus rapides à certaines demandes, mais le risque de diminution globaleERDDAP™réactivité et utilisation de la mémoire élevée (comme indiqué ci-dessus) alors que ces demandes sont traitées signifie que ce n'est généralement pas une bonne idée.
        
##### CPU Noyaux{#cpu-cores} 
Vous ne devriez jamais définir nThreads à un nombre plus grand que le nombre de cœurs CPU dans le processeur de l'ordinateur. Essentiellement tous les processeurs modernes ont plusieurs cœurs (Par exemple, 2, 4 ou 8) . Certains ordinateurs ont même plusieurs processeurs (Par exemple, 2 CPU \\* 4 cœurs/CPU = 8 cœurs CPU) . Pour savoir combien de processeurs et de cœurs un ordinateur a:

* Sur Macs, utilisez *Option clé* : Menu Apple : Informations système
* Sur Linux, utilisez cat /proc/cpuinfo
* Sur Windows 10, utilisez *Ctrl + Maj + Escal* à ouvrir Gestionnaire de tâches : Performance (Les processeurs logiques indiquent le nombre total de cœurs CPU) 

Oui, la plupart des processeurs de nos jours disent qu'ils supportent 2 fils par noyau (par[hyper-threading](https://en.wikipedia.org/wiki/Hyper-threading)) , mais les 2 threads partagent des ressources informatiques, de sorte que vous ne verrez pas deux fois le débit sur un processeur sous charge lourde. Par exemple, un ordinateur avec un processeur avec 4 cœurs peut prétendre supporter jusqu'à 8 fils, mais vous ne devriez jamais dépasser nThreads=4 dans ceERDDAP. Souvenez-vous que :

* Le réglage nThreads dansERDDAP™est par demande.ERDDAP™traite souvent plusieurs requêtes simultanément.
*   ERDDAP™fait des choses autres que les demandes de traitement, par exemple, recharger des ensembles de données.
* QuandERDDAP™réponse à une demande donnée, autres ressources informatiques (Par exemple, accès au disque dur, bande passante du réseau) peut être limité. Plus vous définissez nThreads, plus ces autres ressources seront probablement maximisées et ralentirontERDDAPLa réactivité générale.
* Le système d'exploitation fait des choses autres que l'exécutionERDDAP.

Il est donc préférable de ne pas définir le paramètre nThreads à plus que le nombre de cœurs dans le processeur de l'ordinateur.
         
##### Votre Mileage Mai Varier (YMMV)  {#your-mileage-may-vary-ymmv} 
Les résultats de différents réglages de nThreads varieront considérablement pour différentes requêtes à différents ensembles de données sur différents systèmes. Si vous voulez vraiment connaître l'effet de différents paramètres de nThreads, exécutez des tests réalistes.
         
##### Pourquoi nThreads par demande?{#why-nthreads-per-request} 
Je peux entendre certains d'entre vous penser "Pourquoi nThreads est par demande? Si je codifiais cela, j'utiliserais un ensemble de fils de travail permanent et une file d'attente de messagerie pour une meilleure performance. Le problème avec l'utilisation d'un pool de thread et d'une file de messagerie est qu'une requête difficile inonderait la file d'attente avec de nombreuses tâches lentes. Cela bloquerait effectivementERDDAP™jusqu'à ce que la demande initiale ait été (essentiellement) fini. Ainsi, même de simples demandes ultérieures répondraient très lentement.ERDDAPL'utilisation de nThreads par demande conduit à une utilisation beaucoup plus équitable des ressources informatiques.
         
##### nThreads vs. Ordinateurs de travail multiples{#nthreads-vs-multiple-worker-computers} 
Malheureusement,ERDDAPLe système nThreads ne sera jamais aussi efficace que le vrai parallélisation via plusieurs ordinateurs ouvriers, chacun travaillant sur une partie de données, de la façon dont Hadoop ou Apache Spark sont habituellement utilisés. Lorsque la tâche est réellement parallélisée/distribuée à plusieurs ordinateurs, chaque ordinateur peut utiliser toutes ses ressources de sa part. AvecERDDAP's système nThreads, chacun des threads est en concurrence pour la bande passante du même ordinateur, disques, mémoire, etc. Malheureusement, la plupart d'entre nous n'ont pas les ressources ou les fonds nécessaires pour créer ou même louer (sur Amazon Web Services (AWS) ou Google Cloud Platform (GCP) ) des réseaux d'ordinateurs massifs. Aussi, contrairement à une base de données relationnelle qui est autorisée à retourner les lignes de résultat dans n'importe quel ordre,ERDDAP™promet de renvoyer les lignes de résultat dans un ordre cohérent. Cette contrainte faitERDDAPLa mise en œuvre de nThreads est moins efficace. MaisERDDAPnThreads est utile dans de nombreux cas.

Cependant, il existe des moyens deERDDAP™pour traiter un grand nombre de demandes rapidement en mettant en place un[grille/groupe/fédérationERDDAPs](/docs/server-admin/scaling).
         
#### &lt;palettes et gt;{#palettes} 
* En commençant parERDDAP™version 2.12,datasets.xmlpeut inclure une&lt;palettes&gt; tag (dans&lt;erddapDatasets&gt;) qui remplace&lt;palettes&gt; valeur d'étiquette de messages.xml (ou revient à la valeur message.xml si la balise dansdatasets.xmlest vide) . Cela vous permet de modifier la liste des palettes disponibles pendantERDDAP™est en train de courir. Il vous permet également de faire un changement et de le faire persister lorsque vous installez une nouvelle version deERDDAP.
ATTENTION: Les palettes listées dansdatasets.xmldoit être un superset des palettes listées dans message.xml; sinonERDDAP™lancera une exception et arrêtera le traitementdatasets.xml. Cela garantit que tousERDDAP™les installations supportent au moins les mêmes palettes de cœur.
MISE EN GARDE:ERDDAP™vérifie que les fichiers de palettes spécifiés dans message.xml existent effectivement, mais il ne vérifie pas les fichiers de palette listés dansdatasets.xml. Il est de votre responsabilité de vous assurer que les dossiers sont présents.
    
En commençant aussi parERDDAP™version 2.12, si vous faites un sous-répertoire cptfiles dans leERDDAP™répertoire de contenu,ERDDAP™copie tous les fichiers \\*.cpt dans ce répertoire\\[Tomcat\\]/webapps/erddap/WEB-INF/cptfiles répertoire à chaque foisERDDAP™commence. Ainsi, si vous mettez des fichiers cpt personnalisés dans ce répertoire, ces fichiers seront utilisés parERDDAP™, sans aucun effort supplémentaire de votre part, même lorsque vous installez une nouvelle version deERDDAP.
    
ATTENTION: Si vous ajoutez des palettes personnalisées à votreERDDAP™et vous avezEDDGridDeErddap et/ou EDDTableDeErddapERDDAP™, puis les utilisateurs verront vos options de palette personnalisées sur leERDDAP™Faire des pages Web d'un graphique, mais si l'utilisateur essaie de les utiliser, ils obtiendront un graphique avec la valeur par défaut (généralement arc-en-ciel) palette. C'est parce que l'image est faite par la télécommandeERDDAP™qui n'a pas la palette personnalisée. Les seules solutions sont maintenant d'envoyer un mail à la télécommandeERDDAP™administrateur pour ajouter vos palettes personnalisées à sonERDDAPou courriel Chris. John à noaa.gov pour demander que les palettes soient ajoutées à la normeERDDAP™la distribution.
    
#### &lt;surChange&gt;{#onchange} 
* [ ** &lt;surChange&gt; ** - Oui. (#sur le changement) est une étiquette OPTIONNELLE dans un&lt;dataset&gt; balise dansdatasets.xmlqui spécifie une action qui sera effectuée lorsque ce jeu de données sera créé (lorsqueERDDAP™est redémarré) et chaque fois que cet ensemble de données change.
    * Actuellement, pourEDDGridSous-classes, toute modification aux métadonnées ou à une variable d'axe (par exemple, un nouveau point de temps pour les données en temps quasi réel) est considéré comme un changement, mais un rechargement de l'ensemble de données n'est pas considéré comme un changement (par elle-même) .
    * Actuellement, pour les sous-classes EDDTable, tout rechargement de l'ensemble de données est considéré comme un changement.
    * Actuellement, seuls deux types d'actions sont autorisés:
        * " http://" ou " https://" -- Si l'action commence par " http://" ou " https://" ,ERDDAP™enverra unHTTP GETdemander à l'URL spécifiée. La réponse sera ignorée. Par exemple, l'URL pourrait dire à un autre service Web de faire quelque chose.
            * Si l'URL a une partie de requête (après le ""?) , il DOIT être déjà[pourcentage encodé](https://en.wikipedia.org/wiki/Percent-encoding). Vous devez coder des caractères spéciaux dans les contraintes (autres que les premiers « & » et les principaux'='dans les contraintes) dans la forme %HH, où HH est la valeur hexadécimale à 2 chiffres du caractère. Habituellement, vous devez simplement convertir quelques-uns des caractères de ponctuation : % en %25, & en %26, " en %22,&lt;dans %3C, = dans %3D, &gt; dans %3E, + dans %2B,|dans %7C,\\[dans %5B,\\]en %5D, espacez en %20 et convertissez tous les caractères au-dessus de #127 dans leur formulaire UTF-8, puis encodez chaque octet du formulaire UTF-8 dans le format %HH (demander de l'aide à un programmeur) .
Par exemple, &stationID"41004"
devient &stationID%3E=%2241004%22
Pourcentage d'encodage est généralement nécessaire lorsque vous accédezERDDAPvia un logiciel autre qu'un navigateur. Les navigateurs gèrent généralement le pourcentage d'encodage pour vous.
Dans certaines situations, vous devez encoder pour cent tous les caractères autres que A-Za-z0-9\\_-&#33;.~ ' () \\*, mais toujours ne pas encoder le '&' initial ou le principal'='dans les contraintes.
Les langues de programmation ont des outils pour ce faire (par exemple, voirJava's[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)etJavaLe script [encodeURIComponent()- Oui. ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) et il y a
                [sites web qui encodent/décodent pour vous](https://www.url-encode-decode.com/).
            * Depuisdatasets.xmlest un fichier XML, vous DEVEZ également &-encoder TOUS '&', '&lt;', et '&gt;' dans l'URL comme '&amp;', '&lt;', et '&gt;' après le pourcentage d'encodage.
            * Exemple : Pour une URL que vous pouvez taper dans un navigateur comme:
                 https://www.company.com/webService?department=R%26D&param2=value2   
Vous devez préciser&lt;tag onChange&gt; via (sur une ligne) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * courriel : -- Si l'action commence par "mailto:",ERDDAP™enverra un courriel à l'adresse email suivante indiquant que l'ensemble de données a été mis à jour/modifié.
Par exemple:&lt;surChange&gt;mailto:john.smith@company.com&lt;/onChanger&gt; Si vous avez une bonne raison pourERDDAP™pour soutenir un autre type d'action, envoyez-nous un email décrivant ce que vous voulez.
    * Ce tag est OPTIONNEL. Il peut y avoir autant de ces étiquettes que vous voulez. Utilisez une de ces balises pour chaque action à effectuer.
    * Ceci est analogue àERDDAP's système d'abonnement email/URL, mais ces actions ne sont pas stockées de façon persistante (i.e., ils ne sont stockés que dans un objet EDD) .
    * Pour supprimer un abonnement, il suffit de supprimer le&lt;OnChange&gt; tag. Le changement sera noté la prochaine fois que l'ensemble de données sera rechargé.
         
#### &lt;recharger chaque NMinutes&gt;{#reloadeverynminutes} 
* [ ** &lt;recharger Chaque NMinutes&gt; ** - Oui. (#recharger toutes les minutes) est une étiquette OPTIONNELLE dans un&lt;dataset&gt; balise dansdatasets.xmlde presque tous les types de données qui spécifient la fréquence à laquelle l'ensemble de données doit être rechargé. Par exemple,
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * En général, les ensembles de données qui changent fréquemment (par exemple, obtenir de nouveaux fichiers de données) devrait être rechargé fréquemment, par exemple, toutes les 60 minutes.
    * Les ensembles de données qui changent rarement devraient être rechargés peu fréquemment, par exemple, toutes les 1440 minutes (quotidiennement) ou 10080 minutes (hebdomadaire) .
    * Ce tag est OPTIONNEL, mais recommandé. La valeur par défaut est 10080.
    * Voici un exemple :&lt;recharger tous les NMinutes&gt;1440&lt;/recharger Chaque NMinutes&gt;
    * Lorsqu'un jeu de données est rechargé, tous les fichiers *BigParent Directory* Cache/ *datasetID* répertoire sont supprimés.
    * Quoi qu'il en soit, un jeu de données ne sera pas chargé plus souvent que&lt;loadDatasetsMinMinutes&gt; (par défaut = 15) , comme spécifié dans[configuration.xml](/docs/server-admin/deploy-install#setupxml). Donc, si vous voulez que les ensembles de données soient rechargés très fréquemment, vous devez configurer à la fois recharger tous les NMinutes et charger les ensembles de données MinMinutes à petites valeurs.
    * Ne définissez pas de recharger chaque NMinutes à la même valeur que loadDatasets Minminutes, parce que le temps écoulé est susceptible d'être (par exemple) 14:58 ou 15:02, de sorte que l'ensemble de données ne sera rechargé que dans environ la moitié des recharges majeures. Au lieu de cela, utilisez un plus petit (Par exemple, 10) ou plus (Par exemple, 20) recharger Chaque valeur NMinutes.
    * Peu importe le rechargement de chaque NMinutes, vous pouvez le dire manuellementERDDAP™pour recharger un ensemble de données spécifique dès que possible via[fichier drapeau](/docs/server-admin/additional-information#flag).
    * Pour les programmeurs curieuxERDDAP™, le rechargement de tous les ensembles de données est géré par deux fils à usage unique. Un thread lance un rechargement mineur s'il trouve un fichier drapeau ou un rechargement majeur (qui vérifie tous les ensembles de données pour voir s'ils doivent être rechargés) . L'autre thread fait le rechargement réel des ensembles de données un à la fois. Ces threads fonctionnent en arrière-plan pour garantir que tous les ensembles de données sont tenus à jour. Le thread qui fait réellement le rechargement prépare une nouvelle version d'un jeu de données puis l'échange en place (essentiellement en remplaçant l'ancienne version atomique) . Il est donc très possible que la séquence suivante se produise (C'est une bonne chose) :
        
        1.  ERDDAP™commence à recharger un ensemble de données (faire une nouvelle version) en arrière-plan.
        2. L'utilisateur 'A' fait une demande à l'ensemble de données.ERDDAP™utilise la version actuelle de l'ensemble de données pour créer la réponse. (C'est bien. Il n'y a pas eu de retard pour l'utilisateur, et la version actuelle de l'ensemble de données ne devrait jamais être très discontinue.) 
        3.  ERDDAP™termine la création de la nouvelle version rechargée de l'ensemble de données et échange cette nouvelle version en production. Toutes les nouvelles demandes subséquentes sont traitées par la nouvelle version de l'ensemble de données. Par souci de cohérence, la demande de l'utilisateur A est toujours remplie par la version originale.
        4. L'utilisateur 'B' fait une demande à l'ensemble de données etERDDAP™utilise la nouvelle version de l'ensemble de données pour créer la réponse.
        5. Les demandes de l'utilisateur A et de l'utilisateur B sont complétées (Peut-être Les finitions de A en premier, peut-être les finitions de B en premier) .
        
Je peux entendre quelqu'un dire, "Juste deux batteurs &#33; C'est vrai &#33; C'est nul &#33; Il devrait le mettre en place pour que le rechargement des ensembles de données utilise autant de threads que nécessaire, donc tout se fait plus vite et avec peu ou pas de décalage." Oui et non. Le problème est que charger plusieurs ensembles de données à la fois crée plusieurs nouveaux problèmes difficiles. Ils doivent tous être résolus ou traités. Le système actuel fonctionne bien et a des problèmes gérables (par exemple, potentiel de décalage avant qu'un drapeau ne soit remarqué) . (Si vous avez besoin d'aide pour les gérer, voyez notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).) Les[mise à jour Chaque NMillis](#updateeverynmillis). système fonctionne à l'intérieur de threads de réponse, de sorte qu'il peut et conduit à plusieurs ensembles de données en cours de mise à jour (pas le rechargement complet) simultanément.
##### Proactive c. Réactive{#proactive-vs-reactive} 
ERDDAPLe système de recharge est proactif - les ensembles de données sont rechargés peu après leur rechargement Chaque NMinutes est en retard (C'est-à-dire qu'ils deviennent "existants", mais jamais très inexistants) , si l'ensemble de données reçoit des requêtes des utilisateurs ou non. AlorsERDDAP™Les ensembles de données sont toujours à jour et prêts à être utilisés. C'est en contraste avec l'approche réactive de THREDDS : la demande d'un utilisateur est ce qui dit à THREDDS de vérifier si un ensemble de données est statique (il peut être très persistant) . S'il est bloqué, THREDS fait attendre l'utilisateur (souvent pendant quelques minutes) pendant que l'ensemble de données est rechargé.
        
#### &lt;mise à jour Chaque NMillis&gt;{#updateeverynmillis} 
* [ ** &lt;mettre à jour tous les NMillis&gt; ** - Oui. (#mise à jour de tout le monde) est une étiquette OPTIONNELLE dans un&lt;dataset&gt; balise dansdatasets.xmlde certains types de données qui aidentERDDAP™travailler avec des ensembles de données qui changent très fréquemment (aussi souvent qu'environ chaque seconde) . Contrairement àERDDAP's régulier, proactif, [&lt;recharger Chaque NMinutes&gt;] (#recharger toutes les minutes) système pour recharger complètement chaque ensemble de données, ce système supplémentaire OPTIONNEL est réactif (déclenché par une requête de l'utilisateur) et plus vite parce qu'il est progressif (mise à jour des informations à mettre à jour) . Par exemple, si une demandeEDDGridDeDap dataset se produit plus que le nombre spécifié de millisecondes depuis la dernière mise à jour,ERDDAP™va voir s'il y a de nouvelles valeurs pour le plus à gauche (d'abord, généralement"time") Si tel est le cas, il suffit de télécharger ces nouvelles valeurs avant de traiter la demande de l'utilisateur. Ce système est très bon pour garder un ensemble de données en évolution rapide à jour avec des exigences minimales sur la source de données, mais au prix de ralentir légèrement le traitement de certaines demandes des utilisateurs.
    * Pour utiliser ce système, ajouter (par exemple) :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
juste après&lt;recharger tous les NMinutes&gt; tag pour l'ensemble de données dansdatasets.xml. Le nombre de millisecondes que vous spécifiez peut être aussi petit que 1 (pour s'assurer que l'ensemble de données est toujours à jour) . Une valeur de 0 (par défaut) ou un nombre négatif éteint le système.
    * En raison de leur nature progressive, les mises à jour devraient se terminer très rapidement, de sorte que les utilisateurs ne devraient jamais avoir à attendre longtemps.
    * Si une deuxième requête de données arrive avant la mise à jour précédente, la deuxième requête ne déclenchera pas une autre mise à jour.
    * Tout au long de la documentation, nous allons essayer d'utiliser le mot "recharger" pour les recharges régulières complètes de données, et "mise à jour" pour ces nouvelles mises à jour partielles progressives.
    * Pour les essais, certains diagnostics sont imprimés sur log.txt si [&lt;niveau de log&gt;] (Niveau) endatasets.xmlest réglé à "tout".
    * Si vous utilisez des mises à jour progressives et surtout si la gauche (première) , par exemple, le temps, l'axe est grand, vous pouvez vouloir définir&lt;recharger chaque NMinutes&gt; à un nombre plus grand (1440 ?) , de sorte que les mises à jour font la plupart du travail pour garder l'ensemble de données à jour, et les recharges complètes sont effectuées peu fréquemment.
    * Note: ce nouveau système de mise à jour met à jour les métadonnées (par exemple, le tempsactual\\_range, time\\_coverage\\_end, ...) mais ne déclenche pas le changement (courriel ou URL tactile) ou modifierRSSAliments pour animaux (Peut-être que ça devrait...) .
    * Pour tous les ensembles de données utilisant des sous-classes de[EDDGridFichiers](#eddgridfromfiles)et[EDDTableFromFiles](#eddtablefromfiles):
        *    **MISE EN GARDE:** lorsque vous ajoutez un nouveau fichier de données à un jeu de données en le copieant dans le répertoire quiERDDAP™regarde, il y a un danger queERDDAP™remarquera le fichier partiellement écrit; essayer de le lire, mais échoue parce que le fichier est incomplet; déclarer le fichier comme étant un « mauvais » fichier et le supprimer (temporaire) de l'ensemble de données.
Pour éviter cela, nous **STRONGEMENT RECOMMANDE** que vous copiez un nouveau fichier dans le répertoire avec un nom temporaire (par exemple, 20150226.ncTmp) qui ne correspond pas au fichier de données NomRegex (Autres.nc) , puis renommer le fichier au nom correct (par exemple, 20150226.nc) . Si vous utilisez cette approche,ERDDAP™ignorera le fichier temporaire et remarquera seulement le fichier correctement nommé quand il est complet et prêt à être utilisé.
        * Si vous modifiez des fichiers de données existants en place (par exemple, pour ajouter un nouveau point de données) ,&lt;updateEveryNMillis&gt; fonctionnera bien si les changements apparaissent atomiquement (en un instant) et le fichier est toujours un fichier valide. Par exemple, la bibliothèque netcdf-java permet des ajouts à la dimension illimitée d'un "classique".ncfichier v3 à faire atomiquement.
            &lt;updateEveryNMillis&gt; fonctionnera mal si le fichier est invalide pendant que les changements sont effectués.
        *   &lt;updateEveryNMillis&gt; fonctionnera bien pour les ensembles de données où un ou quelques fichiers changent en peu de temps.
        *   &lt;mise à jourEveryNMillis&gt; fonctionnera mal pour les ensembles de données où un grand nombre de fichiers changent en peu de temps (sauf si les changements apparaissent atomiquement) . Pour ces ensembles de données, il vaut mieux ne pas utiliser&lt;mettre à jour EveryNMillis&gt; et définir une[drapeau](/docs/server-admin/additional-information#set-dataset-flag)à direERDDAP™pour recharger l'ensemble de données.
        *   &lt;mettre à jour tous les NMillis&gt; ne met pas à jour les informations associées au [&lt;subsetVariables&gt;] (#sous-setvariables) . Normalement, ce n'est pas un problème, parce quesubsetVariablesavoir des informations sur des choses qui ne changent pas très souvent (par exemple, la liste des noms de stations, latitudes et longitudes) . SisubsetVariableschangements de données (par exemple, lorsqu'une nouvelle station est ajoutée à l'ensemble de données) , puis contacter le[URL du drapeau](/docs/server-admin/additional-information#set-dataset-flag)pour l'ensemble de données à indiquerERDDAP™pour recharger l'ensemble de données. Sinon,ERDDAP™ne remarquera pas le nouveau sous-ensemble Informations variables jusqu'à la prochaine recharge de l'ensemble de données (&lt;de recharger tous les NMinutes&gt;).
        * Notre recommandation générique est d'utiliser:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * TROUBLE ? Sur les ordinateurs Linux, si vous utilisez&lt;mettre à jour tous les NMillis&gt; avecEDDGridDes classes FromFiles ou EDDTableFromFiles, vous pouvez voir un problème où un jeu de données ne peut pas charger (occasionnellement ou régulièrement) avec le message d'erreur: "IOException: Limite utilisateur des instances d'inotify atteintes ou trop de fichiers ouverts". La cause peut être un bug dansJavaqui fait inotifier les cas de ne pas être ramassés. Ce problème est évitéERDDAP™v1.66 et plus. La meilleure solution est donc de changer la dernière version deERDDAP.
Si cela ne résout pas le problème (c'est-à-dire si vous avez un très grand nombre de ensembles de données&lt;updateEveryNMillis&gt;), vous pouvez résoudre ce problème en appelant:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
Ou, utilisez des nombres plus élevés si le problème persiste. La valeur par défaut pour les montres est de 8192. La valeur par défaut pour les instances est 128.
    * Tu peux mettre&lt;mise à jourMaxEvents&gt;10&lt;/mise à jourMaxEvents&gt; endatasets.xml  (dans avec les autres réglages près du haut) pour modifier le nombre maximum de changements de fichiers (par défaut=10) qui sera traité par le système de mise à jour EveryNMillis. Un nombre plus grand peut être utile pour les ensembles de données où il est très important de les tenir toujours à jour. Voir[mettre à jour la documentation MaxEvents](#updatemaxevents).
    * Pour les programmeurs curieux -- ces mises à jour progressives, contrairementERDDAPC'est plein[recharger tous les NMinutes](#reloadeverynminutes)système, se produisent dans les threads de requête de l'utilisateur. Donc, n'importe quel nombre d'ensembles de données peut être mis à jour simultanément. Il y a un code (et une serrure) s'assurer qu'un seul thread travaille sur une mise à jour pour un ensemble de données donné à un moment donné. Permettre plusieurs mises à jour simultanées était facile; permettre plusieurs recharges simultanées complètes serait plus difficile.
         
#### &lt;sourceCanConstrainStringEQNE&gt;{#sourcecanconstrainstringeqne} 
* [ ** &lt;sourceCanConstrainStringEQNE&gt; ** - Oui. (#source peutcontrairestringeqne) est une étiquette OPTIONNELLE dans une table EDD&lt;dataset&gt; balise dansdatasets.xmlqui spécifie si la source peut restreindre les variables String avec les opérateurs = et &#33;=.
    * Pour EDDTableFromDapSequence, ceci s'applique uniquement à la séquence externe. On suppose que la source ne peut gérer aucune contrainte sur les variables de séquence interne.
    * Ce tag est OPTIONNEL. Les valeurs valides sont vraies (par défaut) et faux.
    * Pour EDDTableFromDapSequenceOPeNDAPServeurs DRDS, ceci devrait être réglé à true (par défaut) .
    * Pour EDDTableFromDapSequence Serveurs Dapper, ceci devrait être mis à faux.
    * Voici un exemple :
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;sourceCanConstrainStringGTLT&gt;{#sourcecanconstrainstringgtlt} 
* [ ** &lt;sourceCanConstrainStringGTLT&gt; ** - Oui. (#source peutcontraire à la chaîne) est une étiquette OPTIONNELLE dans une table EDD&lt;dataset&gt; tag qui spécifie si la source peut restreindre les variables de chaîne avec la&lt;,&lt;=, &gt; et &gt;= opérateurs.
    * Pour EDDTableFromDapSequence, ceci s'applique uniquement à la séquence externe. On suppose que la source ne peut gérer aucune contrainte sur les variables de séquence interne.
    * Les valeurs valides sont vraies (par défaut) et faux.
    * Ce tag est OPTIONNEL. La valeur par défaut est vraie.
    * Pour EDDTableFromDapSequenceOPeNDAPServeurs DRDS, ceci devrait être réglé à true (par défaut) .
    * Pour EDDTableFromDapSequence Serveurs Dapper, ceci devrait être mis à faux.
    * Voici un exemple :
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;sourceCanConstrainStringRegex&gt;{#sourcecanconstrainstringregex} 
* [ ** &lt;sourceCanConstrainStringRegex&gt; ** - Oui. (#source peutcontrairestringregex) est une étiquette OPTIONNELLE dans une table EDD&lt;dataset&gt; tag qui spécifie si la source peut restreindre les variables de chaîne par des expressions régulières, et si oui, ce qu'est l'opérateur.
    * Les valeurs valides sont "=~" (desDAPstandard) , "~=" (par erreur soutenu par beaucoupDAPserveurs) ou "" (indiquant que la source ne supporte pas les expressions régulières) .
    * Ce tag est OPTIONNEL. La valeur par défaut est "".
    * Pour EDDTableFromDapSequenceOPeNDAPServeurs DRDS, ceci devrait être réglé sur "" (par défaut) .
    * Pour EDDTableFromDapSequence Serveurs Dapper, ceci devrait être réglé sur "" (par défaut) .
    * Voici un exemple :
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;sourceCanDoDistinct&gt;{#sourcecandodistinct} 
* [ ** &lt;sourceCanDoDistinct&gt; ** - Oui. (#sourcecandodistinct) est une balise OPTIONAL dans une base de données EDDTableFrom&lt;dataset&gt; tag qui spécifie si la base de données source doit gérer &distinct () contraintes dans les requêtes des utilisateurs.
    * Ce tag est OPTIONNEL. Les valeurs valides ne sont pas (ERDDAP™gère séparément; par défaut) , partielle (la source gère séparément etERDDAP™le gère encore) et oui (la source gère séparément) .
    * Si vous utilisez non etERDDAP™est à court de mémoire lorsque la manipulation distincte, utiliser oui.
    * Si vous utilisez oui et que la base de données source est distincte trop lentement, utilisez non.
    * partielle vous donne le pire des deux: il est lent parce que la gestion de base de données distincte est lent et il peut manquer de mémoire dansERDDAP.
    * Les bases de données interprètent DISTINCT comme une requête pour des lignes uniques de résultats, alors queERDDAP™l'interprète comme une demande pour une liste triée de lignes de résultats uniques. Si vous mettez cela en partie ou oui,ERDDAP™automatiquement dit aussi à la base de données de trier les résultats.
    * Une petite différence dans les résultats:
Sans|partielle,ERDDAP™triera "" au début des résultats (avant les chaînes non-"") .
Avec oui, la base de données peut (Postgres sera) trier "" à la fin des résultats (après les chaînes non-"") .
Je suppose que cela affectera également le tri des mots courts par rapport aux mots plus longs qui commencent par le mot court. Par exemple,ERDDAP™triera "Simon" avant "Simons".
    * Voici un exemple :
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;sourceCanOrderBy&gt;{#sourcecanorderby} 
* [ ** &lt;Source Commandeur par&gt; ** - Oui. (#sourcecanorderpar) est une balise OPTIONAL dans une base de données EDDTableFrom&lt;dataset&gt; tag qui spécifie si la base de données source doit gérer &orderBy (...) contraintes dans les requêtes des utilisateurs.
    * Ce tag est OPTIONNEL. Les valeurs valides ne sont pas (ERDDAP™poignéesorderBy (...) ; par défaut) , partielle (les poignées sourceorderByetERDDAP™le gère encore) et oui (les poignées sourceorderBy (...) ) .
    * Si vous utilisez non etERDDAP™manque de mémoire lors de la manipulationorderBy (...) , utiliser oui.
    * Si vous utilisez oui et la base de données sourceorderBy (...) trop lentement, utilisez non.
    * partielle vous donne le pire des deux: il est lent parce que la gestion de la base de données deorderBy (...) est lent et peut manquer de mémoire dansERDDAP.
    * Une petite différence dans les résultats:
Sans|partielle,ERDDAP™triera "" au début des résultats (avant les chaînes non-"") .
Avec oui, la base de données peut (Postgres sera) trier "" à la fin des résultats (après les chaînes non-"") .
Cela peut également affecter le tri des mots courts par rapport aux mots plus longs qui commencent par le mot court. Par exemple,ERDDAP™Je vais trier "Simon" avant "Simons", mais je ne sais pas comment une base de données va trier.
    * Voici un exemple :
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;sourceBesoinsExpandedFP\\_EQ&gt;{#sourceneedsexpandedfp_eq} 
* [ ** &lt;sourceBesoinsExpandedFP\\_EQ&gt; ** - Oui. (#sourceneedsexpandedfp_eq) est une étiquette OPTIONNELLE dans une table EDD&lt;dataset&gt; balise qui spécifie (vrai (par défaut) ou faux) si la source a besoin d'aide avec les requêtes&lt;numérique Variable&gt;=&lt;(et &#33;=, &gt;=,&lt;=). Par exemple,
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * Pour certaines sources de données, des requêtes numériques impliquant =, &#33;=,&lt;=, ou &gt;= peut ne pas fonctionner comme désiré avec des nombres flottants. Par exemple, une recherche de longitude=220.2 peut échouer si la valeur est stockée comme 220.20000000000001.
    * Ce problème se pose parce que les nombres de points flottants sont[non représentés exactement dans les ordinateurs](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/).
    * Si sourceBesoinsExpandedFP\\_EQ est réglé à true (par défaut) ,ERDDAP™modifie les requêtes envoyées à la source de données pour éviter ce problème. Il est toujours sûr et bien de laisser cet ensemble à vrai.
         
#### &lt;sourceUrl&gt;{#sourceurl} 
* [ ** &lt;sourceUrl&gt; ** - Oui. (Source) est une balise commune dans le global d'un ensemble de données&lt;addAttributes&gt; balise qui spécifie l'URL qui est la source des données.
    * Voici un exemple :
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (mais mettez tout sur une seule ligne) 
    * EnERDDAP™, tous les ensembles de données auront un "sourceUrl" dans les attributs globaux combinés qui sont montrés aux utilisateurs.
    * Pour la plupart des types de données, cette balise est REQUISE. Consultez la description du type d'ensemble de données pour savoir si cela est REQUIS ou non.
    * Pour certains ensembles de données,&lt;sourceUrl&gt; tag n'est pas autorisé. Au lieu de cela, vous devez fournir un "sourceUrl"[attribut global](#global-attributes), généralement dans le monde \\&gt;addAttributes&lt;. S'il n'y a pas d'URL source réelle (par exemple, si les données sont stockées dans des fichiers locaux) , cet attribut a souvent juste une valeur de placeholder, par exemple,&lt;nom de l'adresse (fichiers locaux) &lt;/att&gt; .
    * Pour la plupart des ensembles de données, c'est la base de l'URL qui est utilisée pour demander des données. Par exemple,DAPserveurs, c'est l'URL vers laquelle .dods, .das, .dds, ou .html pourrait être ajouté.
    * Depuisdatasets.xmlest un fichier XML, vous DEVEZ également coder '&', '&lt;', et '&gt;' dans l'URL comme '&amp;', '&lt;', et '&gt;'.
    * Pour la plupart des types de données,ERDDAP™ajoute l'originalsourceUrl  (le "localSourceUrl" dans le code source) aux[attributs globaux](#global-attributes)  (où il devient "publicSourceUrl" dans le code source) . Lorsque la source de données est des fichiers locaux,ERDDAP™ajoutesourceUrl=" (fichiers locaux) " aux attributs mondiaux comme précaution de sécurité. Lorsque la source de données est une base de données,ERDDAP™ajoutesourceUrl=" (base de données source) " aux attributs mondiaux comme précaution de sécurité. Si certains de vos ensembles de données utilisent non-publicsourceUrl's (généralement parce que leur ordinateur est dans votre DMZ ou sur un réseau local) vous pouvez utiliser [&lt;convertirEnSourcePublicUrl&gt;] (#convertir les ressources publiques) tags pour spécifier comment convertir le localsourceUrls au publicsourceUrlPar.
    * AsourceUrlpeut commencer parhttp://,https://, ftp://, et peut-être d'autres préfixes.httpsles connexions lisent et vérifient le certificat numérique de la source pour s'assurer que la source est celle qu'ils disent être. Dans de rares cas, cette vérification peut échouer avec l'erreur "javax.net.ssl.SSLProtocolException: handshake alerty: unrecognized\\_name". Ceci est probablement dû au nom de domaine sur le certificat ne correspondant pas au nom de domaine que vous utilisez. Vous pouvez et devriez lire les détails de lasourceUrl's certificat dans votre navigateur web, notamment, la liste des "Nom DNS" dans la section "Nom alternatif du sujet".
        
Dans certains cas,sourceUrlvous utilisez peut-être un alias du nom de domaine sur le certificat. Par exemple,
         https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ va lancer cette erreur, mais
         https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ , qui utilise le nom de domaine sur le certificat, ne le fera pas. La solution dans ces cas est donc de trouver et d'utiliser le nom de domaine sur le certificat. Si vous ne le trouvez pas sur le certificat, contactez le fournisseur de données.
        
Dans d'autres cas, le nom de domaine figurant sur le certificat peut être pour un groupe de noms. Si cela se produit ou si le problème est autrement insolvable, veuillez envoyer un courriel à Chris. John à noaa.gov pour signaler le problème.
         

#### &lt;addAttributes&gt; {#addattributes} 
* [ ** &lt;addAttributes&gt; ** - Oui. (#Addattributs) est une balise OPTIONAL pour chaque ensemble de données et pour chaque variable qui permetERDDAPles administrateurs contrôlent les attributs de métadonnées associés à un ensemble de données et à ses variables.
    *   ERDDAP™combine les attributs de la source de l'ensemble de données ("Attributs source") et le "addAttributes" que vous définissez endatasets.xml  (qui ont priorité) pour faire les "Attributes combinés", qui sont ceERDDAP™les utilisateurs voient. Ainsi, vous pouvez utiliseraddAttributesredéfinir les valeurs de sourceAttributes, ajouter de nouveaux attributs ou supprimer des attributs.
    * Les&lt;addAttributes&gt; l'étiquette contient 0 ou plus ** &lt;Att&gt; ** sous-tags, qui sont utilisés pour spécifier les attributs individuels.
    * Chaque attribut se compose d'un nom et d'une valeur (qui a un type de données spécifique, par exemple,) .
    * Il ne peut y avoir qu'un seul attribut avec un nom donné. S'il y en a plus, la dernière a la priorité.
    * La valeur peut être une valeur unique ou une liste de valeurs séparées par un espace.
    * Syntaxe
        * L'ordre des&lt;att&gt; sous-tags dansaddAttributesn'est pas important.
        * Les&lt;att&gt; le format du sous-tag est
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * Le nom de destination de tous les attributs DOIT commencer par une lettre (A-Z, a-z) et DOIT contenir uniquement les caractères A-Z, a-z, 0-9 ou '\\_'.
        * Si&lt;att&gt; sous-tag n'a aucune valeur ou valeur de null, cet attribut sera supprimé des attributs combinés.
Par exemple,&lt;att name="rows" /&gt; supprimera les lignes des attributs combinés.
Par exemple,&lt;att name="coordonnées"&gt;null&lt;/att&gt; supprimera les coordonnées des attributs combinés.
##### attribut Type{#attributetype} 
* [La valeur de type OPTIONNEL pour&lt;sous-étiquettes att&gt;] (Type d'attribut) indique le type de données pour les valeurs. Le type par défaut est String. Un exemple d'attribut String est :
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * Les types valides pour les valeurs uniques sont octets (Entier 8 bits) , courte (16 bits entier signé) , int (Entier signé 32 bits) , longue (64 bits entier signé) , flotteur (Point flottant 32 bits) , double (Point flottant de 64 bits) , Char, et String. Par exemple,
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
Voir ces notes sur le[type de données](#char).
Voir ces notes sur le[type de données long](#long).
        
    * Types valides de listes de valeurs séparées par des espaces (ou valeurs uniques) sont byteList, shortList, non signéShortList, charList, intList, longList, floatList, double Liste. Par exemple,
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
Un shortList non signé vous permet de spécifier une liste de shorts non signés, mais ils seront convertis en une liste des caractères Unicode correspondants (par exemple, "65 67 69" sera converti en "A C E".
Si vous spécifiez une charList, codez tout caractère spécial (p. ex. espace, guillemets doubles, backslash,&lt;#32, ou &gt;#127) comme vous les encoderiez dans la section de données d'un fichier CCNSV (Par exemple, ", "\\" ou """, "\\\\\", "\\n", "\\u20ac") .
Il n'y a pas de stringList. Conservez les valeurs de la chaîne comme une chaîne multiligne. Par exemple,
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Attributs mondiaux{#global-attributes} 
* [ ** Attributs mondiaux / Global&lt;addAttributes&gt; ** - Oui. (#attributs globaux) --
    &lt;addAttributes&gt; est une balise OPTIONNELLE&lt;dataset&gt; tag qui est utilisé pour modifier les attributs qui s'appliquent à l'ensemble des données.
    
    *    ** Utiliser le système mondial&lt;addAttributes&gt; pour modifier les attributs globaux de l'ensemble de données. ** ERDDAP™combine les attributs globaux de la source de l'ensemble de données (** SourceAttributs **) et le** addAttributes **que vous définissez dansdatasets.xml  (qui ont priorité) pour faire du monde** Attributs combinés ** , qui sont ceERDDAP™les utilisateurs voient. Ainsi, vous pouvez utiliseraddAttributesredéfinir les valeurs de sourceAttributes, ajouter de nouveaux attributs ou supprimer des attributs.
    * Voir [ ** &lt;addAttributes&gt; **Renseignements] (#Addattributs) qui s'applique à l'échelle mondiale et variable** &lt;addAttributes&gt; ** .
    *   [FGDC](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html)et[ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata)Métadonnées -- Normalement,ERDDAP™générera automatiquement ISO 19115-2/19139 et FGDC (FGDC-STD-001-1998) Fichiers de métadonnées XML pour chaque ensemble de données utilisant des informations provenant des métadonnées de l'ensemble de données. Alors, **de bonnes métadonnées des ensembles de donnéesERDDAP-les métadonnées ISO 19115 et FGDC générées. Veuillez envisager de consacrer beaucoup de temps et d'efforts à l'amélioration des métadonnées de vos ensembles de données (ce qui est une bonne chose de toute façon) .** La plupart des attributs de métadonnées des ensembles de données qui sont utilisés pour générer les métadonnées ISO 19115 et FGDC proviennent de[Norme de métadonnées ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)et sont ainsi notés ci-dessous.
    * De nombreux attributs mondiaux sont particuliers en ce sens queERDDAP™les cherche et les utilise de diverses façons. Par exemple, un lien vers lainfoUrlest inclus sur les pages Web avec des listes de ensembles de données, et d'autres endroits, afin que les utilisateurs puissent en savoir plus sur l'ensemble de données.
    * Lorsqu'un utilisateur choisit un sous-ensemble de données, globalAttributes liés à la longitude, la latitude et l'altitude de la variable (ou profondeur) , et les plages de temps (Par exemple, Southernmost\\_Northing, Northernmost\\_Northing, time\\_coverage\\_start, time\\_coverage\\_end) sont automatiquement générés ou mis à jour.
    * Un simple échantillon global&lt;addAttributes&gt; est:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
L'attribut cwhdf\\_version vide provoque l'attribut source cwhdf\\_version (le cas échéant) à supprimer de la liste finale combinée des attributs.
    * Fournir cette information aideERDDAP™faire un meilleur travail et aider les utilisateurs à comprendre les ensembles de données.
De bonnes métadonnées rendent un ensemble de données utilisable.
L'insuffisance des métadonnées rend un ensemble de données inutile.
Veuillez prendre le temps de faire un bon travail avec les attributs de métadonnées.
##### Attributs mondiaux spéciauxERDDAP™
###### accusé de réception{#acknowledgement} 
*   [ **accusé de réception** ](#acknowledgement)et **Remerciements**   (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est une façon RECOMMANDÉE de reconnaître le ou les groupes qui ont fourni du soutien (notamment,) pour le projet qui a créé ces données. Par exemple,
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Notez que ACDD 1.0 et 1.1 ont utilisé l'orthographe « reconnaissance » (qui est l'orthographe habituelle aux États-Unis.) , mais ACDD 1.3 a changé cela en « reconnaissance » (qui est l'orthographe habituelle au Royaume-Uni.) . Je comprends que le changement était essentiellement un accident et qu'ils n'ont certainement pas reconnu les ramifications du changement. Quel désordre &#33; Maintenant, il y a des millions de fichiers de données dans le monde qui ont « reconnaissance » et des millions qui ont « reconnaissance ». Cela met en lumière la folie des changements « simples » à une norme et souligne la nécessité d'une stabilité des normes. Parce que ACDD 1.3 (qui est la version de ACDD queERDDAP™soutien) dit « reconnaissance », c'est ce queERDDAP™  (notamment générer des ensembles de données Xml) encourage.
     
###### cdm\\_altitude\\_proxy{#cdm_altitude_proxy} 
*   [ **cdm\\_altitude\\_proxy** ](#cdm_altitude_proxy)est juste pour les ensembles de données EDDTable qui n'ont pas de variable d'altitude ou de profondeur mais ont une variable qui est un proxy pour l'altitude ou la profondeur (Par exemple, pression, sigma, nombre de bouteilles) , vous pouvez utiliser cet attribut pour identifier cette variable. Par exemple,
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Si[cdm\\_data\\_type](#cdm_data_type)cdm\\_altitude\\_proxy DOIT être défini. Si cdm\\_altitude\\_proxy est défini,ERDDAP™ajoutera les métadonnées suivantes à la variable : \\_Coordonné AxeType=Hauteur et axe=Z.
     
###### cdm\\_data\\_type{#cdm_data_type} 
*   [ **cdm\\_data\\_type** ](#cdm_data_type)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est un attribut global qui indiqueUnidata [Modèle de données commune](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html)type de données pour l'ensemble de données. Par exemple,
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
Le MDP est toujours en évolution et peut changer à nouveau.ERDDAP™se conforme aux exigences connexes et plus détaillées[Géométries d'échantillonnage discrètes (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)chapitre du[CF 1.6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Conventions sur les métadonnées (précédemment appelé les conventions d'observation des points des FC) .
    * Soit l'ensemble de données est global[SourceAttributs](#global-attributes)ou à son niveau mondial&lt;addAttributes&gt; DOIT inclure l'attribut cdm\\_data\\_type. Quelques types de données (comme EDDTable A partir d'Obis) va régler cela automatiquement.
    * PourEDDGridensembles de données, les options cdm\\_data\\_type sont Grid (par défaut et de loin le type le plus commun pourEDDGridensembles de données) , MovingGrid, Other, Point, Profile, RadialSweep, TimeSeries, TimeSeriesProfile, Swath, Trajectory et TrajectoryProfile. Actuellement,EDDGridn'exige pas que les métadonnées connexes soient spécifiées, ni ne vérifie que les données correspondent au type cdm\\_data\\_. Cela changera probablement dans un avenir proche.
    * EDDTable utilise cdm\\_data\\_type de manière rigoureuse, en suivant les spécifications DSG des FC plutôt que CDM, qui pour une raison quelconque n'a pas été mis à jour pour être cohérent avec DSG. Si les métadonnées d'un ensemble de données ne sont pas conformesERDDAPExigences de cdm\\_data\\_type (voir ci-dessous) , l'ensemble de données ne sera pas chargé et générera un[message d'erreur](#troubleshooting-tips). (C'est une bonne chose, en ce sens que le message d'erreur vous dira ce qui ne va pas pour que vous puissiez le réparer.) Et si les données du dataset ne correspondent pas à la configuration des métadonnées du dataset (Par exemple, s'il y a plus d'une latitude pour une station donnée dans un ensemble de données de séries chronologiques) , certaines demandes de données retourneront des données incorrectes dans la réponse. Alors assurez-vous que vous avez tout bien.
        
Pour tous ces ensembles de données,Metadata\\_Conventionsattributs globaux, veuillez consulter CF-1.6 (non CF-1.0, 1.1, 1.2, 1.3, 1.4 ou 1.5) , puisque CF-1.6 est la première version à inclure les changements liés à la géométrie d'échantillonnage discrète (DSG) Convention.
        *   **ERDDAP™a une relation pas simple avec le DSG des FC** 
        *   ERDDAP™peut faire un ensemble de données DSG valide à partir d'un ensemble de données source qui est déjà un fichier DSG valide (s) , ou à partir d'un ensemble de données source qui n'est pas configuré pour DSG mais peut être fait ainsi via des modifications aux métadonnées (dontERDDAP-spécifique afin de fournir une approche plus générale pour spécifier la configuration DSG) .
        *   ERDDAP™fait beaucoup de tests de validité quand il charge un ensemble de données. Si l'ensemble de données ayant un cdm\\_data\\_type (oufeatureType) attribut charge avec succès dansERDDAP™AlorsERDDAP™dit que l'ensemble de données répond aux exigences du DSG (Sinon,ERDDAP™va lancer une exception expliquant le premier problème qu'il a trouvé) .
ATTENTION: Un ensemble de données chargé avec succès semble répondre aux exigences du DSG (il a la bonne combinaison d'attributs) , mais peut encore être mal configuré, conduisant à des résultats incorrects dans.ncFC et.ncFichiers de réponse de l'ACFC. (Le logiciel est intelligent d'une certaine manière et sans indice dans d'autres.) 
        * Lorsque vous regardez les métadonnées de l'ensemble de données dansERDDAP™, l'ensemble de données DSG sembleERDDAPLe format interne (une table géante, comme une base de données) . Il n'est pas dans l'un des formats DSG (Par exemple, les dimensions et les métadonnées ne sont pas correctes) , mais les informations nécessaires pour traiter l'ensemble de données comme un ensemble de données DSG se trouvent dans les métadonnées (Par exemple, cdm\\_data\\_type=TimeSeries et cdm\\_timeseries\\_variables= *aCsvList OfStationRelatedVariables* dans les métadonnées globales et cf\\_role=timeseries\\_id pour une variable) .
        * Si un utilisateur demande un sous-ensemble de données.ncFC (une.ncfichier dans le format de fichier Contiguous Ragged Array de DSG) ou.ncFichier CFMA (a.ncfichier au format de fichier Multidimensionnel Array de DSG) , ce fichier sera un fichier DSG valide des FC.
ATTENTION: Cependant, si l'ensemble de données a été mal configuré (afin que les promesses faites par les métadonnées ne soient pas vraies) , alors le fichier de réponse sera techniquement valide mais sera incorrecte d'une certaine manière.
             
###### EDDTable cdm_data_types
* Pour les ensembles de données EDDTable, les options cdm\\_data\\_type (et dépenses connexesERDDAP) sont
###### Remarque{#point} 
*   [Remarque](#point)-- est pour un ensemble de mesures prises à des moments et des endroits non liés.
    * Comme pour tous les cdm\\_data\\_types autres que les autres, les ensembles de données point DOIVENT avoir des variables de longitude, de latitude et de temps.
###### Profil{#profile} 
*   [Profil](#profile)-- est un ensemble de mesures toutes prises en même temps, à une latitude de longitude, mais à plus d'une profondeur (ou altitude) . L'ensemble de données peut être une collection de ces profils, par exemple sept profils provenant de différents endroits. Ce type cdm\\_data\\_ n'implique aucune connexion logique entre les profils.
    
* Une des variables (Par exemple, profil\\_numéro) DOIT avoir l'attribut variable cf\\_role=profile\\_id pour identifier la variable qui identifie uniquement les profils.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Si aucune autre variable n'est appropriée, envisager d'utiliser la variable temporelle.
###### cdm\\_profil\\_variables{#cdm_profile_variables} 
* L'ensemble de données DOIT inclure l'attribut global[cdm\\_profil\\_variables](#cdm_profile_variables), où la valeur est une liste séparée par des virgules des variables qui ont l'information sur chaque profil. Pour un profil donné, les valeurs de ces variables doivent être constantes. Par exemple,
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
La liste DOIT inclure la variable cf\\_role=profile\\_id et toutes les autres variables avec des informations sur le profil, le temps, la latitude et la longitude.
La liste ne comprendra jamais d'altitude, de profondeur ou de variables d'observation.
     

\\[Opinion: cdm\\_data\\_type=Profile devrait rarement être utilisé. Dans la pratique, un ensemble de données donné est généralement soit un TimeSeriesProfile (profilés en position fixe) ou un profil de trajectoire (profils le long d'une trajectoire) , et devrait donc être correctement identifié comme tel.\\]  
###### Série chronologique{#timeseries} 
*   [Série chronologique](#timeseries)-- est une séquence de mesures (Par exemple, température de l'eau de mer) prise à un, fixe, latitude, longitude, profondeur (ou altitude) lieu. (Pensez-y comme "station".) L'ensemble de données peut être une collection de ces séries de temps, par exemple, une séquence de chacun de trois emplacements différents.
    * Une des variables (Par exemple, station\\_id) DOIT avoir l'attribut variable cf\\_role=timeseries\\_id pour identifier la variable qui identifie uniquement les stations.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\_timeseries\\_variables{#cdm_timeseries_variables} 
* L'ensemble de données DOIT inclure l'attribut global[cdm\\_timeseries\\_variables](#cdm_timeseries_variables), où la valeur est une liste séparée par des virgules des variables qui ont l'information sur chaque station. Pour une station donnée, les valeurs de ces variables doivent être constantes. Par exemple,
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
La liste DOIT inclure la variable cf\\_role=timeseries\\_id et toutes les autres variables avec des informations sur la station, qui inclut presque toujours latitude et longitude (et altitude ou profondeur, s'il est présent) .
La liste ne comprendra jamais de variables de temps ou d'observation.
* Pour certaines bouées amarrées, un ensemble de données peut comporter deux ensembles de variables de latitude et de longitude :
    1. Une paire de valeurs de latitude et de longitude constantes (l'emplacement fixe de l'amarrage;) . EnERDDAP™, indiquez ces variablesdestinationNames de latitude et de longitude, et inclure ces variables dans la liste de cdm\\_timeseries\\_variables.
    2. Valeurs précises de latitude et de longitude associées à chaque observation. EnERDDAP™, donner à ces variables différentesdestinationNames (Par exemple, précisLat et précis Lon) et n'incluez pas ces variables dans la liste de cdm\\_timeseries\\_variables.
Le raisonnement est le suivant : d'un point de vue théorique, pour un ensemble de données DSG TimeSeries, la latitude et la longitude (et altitude ou profondeur, s'il est présent) L'emplacement de la station DOIT être constant.
###### TimeSeriesProfile{#timeseriesprofile} 
*   [TimeSeriesProfile](#timeseriesprofile)-- est pour une séquence de profils pris à un emplacement, fixe, latitude longitude. Chaque profil est un ensemble de mesures prises à plusieurs altitudes ou profondeurs. L'ensemble de données peut être une collection de ces fichiers TimeSeriesPro, par exemple, une séquence de profils pris à chacun des 12 emplacements différents.
    * Une des variables (Par exemple, station\\_id) DOIT avoir l'attribut variable cf\\_role=timeseries\\_id pour identifier la variable qui identifie uniquement les stations.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * Une des variables (Par exemple, profil\\_numéro) DOIT avoir l'attribut variable cf\\_role=profile\\_id pour identifier la variable qui identifie uniquement les profils.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Un profil donné\\_id doit être unique pour une série de temps donnée\\_id.) Si aucune autre variable n'est appropriée, envisager d'utiliser la variable temporelle.
    * L'ensemble de données DOIT inclure les variables cdm\\_timeseries\\_variables globalAttribute, où la valeur est une liste séparée par des virgules des variables qui ont les informations sur chaque station. Pour une station donnée, les valeurs de ces variables doivent être constantes. Par exemple,
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
La liste DOIT inclure la variable cf\\_role=timeseries\\_id et toutes les autres variables avec des informations sur la station, qui comprend presque toujours la latitude et la longitude.
La liste ne comprendra jamais de variables de temps, d'altitude, de profondeur ou d'observation.
    * L'ensemble de données DOIT inclure les variables cdm\\_profile\\_variables, où la valeur est une liste séparée par des virgules des variables qui ont les informations sur chaque profil. Pour un profil donné, les valeurs de ces variables doivent être constantes. Par exemple,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
La liste DOIT inclure la variable cf\\_role=profile\\_id et toutes les autres variables avec des informations sur le profil, ce qui inclut presque toujours le temps.
La liste ne comprendra jamais la latitude, la longitude, l'altitude, la profondeur ni aucune variable d'observation.
###### Trajectoire{#trajectory} 
*   [Trajectoire](#trajectory)-- est une séquence de mesures effectuées le long d'une trajectoire (un chemin à travers l'espace et le temps)   (Par exemple, la température de la mer est prise par un navire alors qu'il se déplace dans l'eau) . L'ensemble de données peut être une collection de ces Trajectoires, par exemple, une séquence de chacun de quatre navires différents.
    * Une des variables (par exemple, ship\\_id) DOIT avoir l'attribut cf\\_role=trajectory\\_id pour identifier la variable qui identifie uniquement les trajectoires.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### cdm\\_trajectoire\\_variables{#cdm_trajectory_variables} 
* L'ensemble de données DOIT inclure l'attribut global[cdm\\_trajectoire\\_variables](#cdm_trajectory_variables), où la valeur est une liste séparée par des virgules des variables qui ont l'information sur chaque trajectoire. Pour une trajectoire donnée, les valeurs de ces variables doivent être constantes. Par exemple,
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
La liste DOIT inclure la variable cf\\_role=trajectory\\_id et toutes les autres variables avec des informations sur la trajectoire.
La liste n'inclura jamais de variables de temps, de latitude, de longitude ou d'observation.
###### Profil de trajectoire{#trajectoryprofile} 
*   [Profil de trajectoire](#trajectoryprofile)-- est une séquence de profils pris le long d'une trajectoire. L'ensemble de données peut être une collection de ces TrajectoryProfiles, par exemple, une séquence de profils pris par 14 navires différents.
    * Une des variables (par exemple, ship\\_id) DOIT avoir l'attribut variable cf\\_role=trajectory\\_id pour identifier la variable qui identifie uniquement les trajectoires.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * Une des variables (Par exemple, profil\\_numéro) DOIT avoir l'attribut variable cf\\_role=profile\\_id pour identifier la variable qui identifie uniquement les profils.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Un profil donné\\_id doit être unique pour une trajectoire donnée\\_id.) Si aucune autre variable n'est appropriée, envisager d'utiliser la variable temporelle.
    * L'ensemble de données DOIT inclure les variables cdm\\_trajectory\\_variables, où la valeur est une liste séparée par des virgules des variables qui ont les informations sur chaque trajectoire. Pour une trajectoire donnée, les valeurs de ces variables doivent être constantes. Par exemple,
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
La liste DOIT inclure la variable cf\\_role=trajectory\\_id et toutes les autres variables avec des informations sur la trajectoire.
La liste n'inclura jamais les variables liées au profil, le temps, la latitude, la longitude ou toute autre variable d'observation.
    * L'ensemble de données DOIT inclure les variables cdm\\_profile\\_variables, où la valeur est une liste séparée par des virgules des variables qui ont les informations sur chaque profil. Pour un profil donné, les valeurs de ces variables doivent être constantes. Par exemple,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
La liste DOIT inclure la variable cf\\_role=profile\\_id et toutes les autres variables avec des informations sur le profil, qui comprend presque toujours le temps, la latitude et la longitude.
La liste ne comprendra jamais d'altitude, de profondeur ou de variables d'observation.
###### Autres{#other} 
*   [Autres](#other)-- n'a aucune exigence. Utilisez-le si l'ensemble de données ne correspond pas à l'une des autres options, notamment si l'ensemble de données ne comprend pas de variables de latitude, de longitude et de temps.
     
###### Notes connexes{#related-notes} 
* Tous les ensembles de données EDDTable ayant un cdm\\_data\\_type autre que « Autre » DOIVENT avoir des variables de longitude, de latitude et de temps.
* DOIT avoir une variable d'altitude, une variable de profondeur, ou une[cdm\\_altitude\\_proxy](#cdm_altitude_proxy)variable.
* Si vous ne pouvez pas rendre un jeu de données conforme à toutes les exigences pour le type cdm\\_data\\_ idéal, utilisez "Point" (dont les exigences sont peu nombreuses) ou "autres" (qui n ' a pas d ' exigences) à la place.
* Cette information est utilisée parERDDAP™par exemple, mais surtout pour faire.ncFichiers CF (.ncles fichiers conformes aux Représentations d'Array Accélérés Contigués associées au cdm\\_data\\_type de l'ensemble de données) et.ncFichiers CFMA (.ncfichiers conformes aux Représentations Multidimensionnelles Array associées au type cdm\\_data\\_) selon la définition[Géométries d'échantillonnage discrètes (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)chapitre du[FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)les conventions relatives aux métadonnées, qui étaient auparavant dénommées "Conventions relatives à l'observation des points de contact".
* Conseil: Pour ces ensembles de données, le réglage correct pour[subsetVariables](#subsetvariables)est généralement la combinaison de toutes les variables énumérées dans les attributs cdm\\_...\\_variables. Par exemple, pour TimeSeriesProfile, utilisez les cdm\\_timeseries\\_variables plus les cdm\\_profile\\_variables.
###### contributor\\_name {#contributor_name} 
*   [ **contributor\\_name** ](#contributor_name)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est la façon RECOMMANDÉE d'identifier une personne, une organisation ou un projet qui a contribué à cet ensemble de données (par exemple, le créateur original des données, avant qu'elles ne soient traitées par le créateur de cet ensemble de données) . Par exemple,
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Si "contributor" ne s'applique pas vraiment à un ensemble de données, omettez cet attribut. Par rapport à[creator\\_name](#creator_name), cela est parfois plus axé sur la source de financement.
###### contributor\\_role {#contributor_role} 
*   [ **contributor\\_role** ](#contributor_role)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est la manière RECOMMANDÉE d'identifier le rôle[contributor\\_name](#creator_name). Par exemple,
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Si "contributor" ne s'applique pas vraiment à un ensemble de données, omettez cet attribut.
###### Conventions{#conventions} 
*   [ **Conventions** ](#conventions)  (des[FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Norme de métadonnées) est vivement recommandé. (Elle pourrait être REQUISE à l'avenir.) La valeur est une liste de normes de métadonnées séparées par des virgules que cet ensemble de données suit. Par exemple:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
Les conventions communes de métadonnées utiliséesERDDAP™sont:
    
    *   [COARDSConventions](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)est le précurseur des FC.
    *   [Climat et prévisions (FC) Conventions](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)est la source de nombreux attributs recommandés et requis dansERDDAP. La version actuelle des FC est identifiée comme étant « CF-1.6 ».
    * LesNetCDFConvention sur les attributs pour la découverte de données (ACDD) est la source de nombreux attributs recommandés et requis dansERDDAP. La version originale 1.0 de ACDD (une œuvre brillante de Ethan Davis) , a été identifié comme[UnidataDataset Discovery v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)Actuellement (à compter de 2015) 1.3 version de l'ACDD est identifiée comme[ACDD-1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3). Si vos ensembles de données ont été utilisésUnidataDataset Discovery v1.0, nous vous encourageons à[changez vos ensembles de données pour utiliser ACDD-1.3](#switch-to-acdd-13).
    
Si votre ensemble de données suit quelques normes de métadonnées supplémentaires, veuillez ajouter le nom à la liste CSV dans l'attribut Conventions.
###### coverage\\_content\\_type {#coverage_content_type} 
*   [ **coverage\\_content\\_type** ](#coverage_content_type)  (des[ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata)Norme de métadonnées) est la façon RECOMMANDÉE d'identifier le type de données maillées (enEDDGridensembles de données) . Par exemple,
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
Les seules valeurs autorisées sont l'information auxiliaire, image, modelRésultat, physique Mesure (par défaut lorsque les métadonnées ISO 19115 sont générées) , qualitéInformation, référenceInformation et classification thématique. (N'utilisez pas cette balise pour les ensembles de données EDDTable.)   
###### creator\\_name {#creator_name} 
*   [ **creator\\_name** ](#creator_name)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est la façon RECOMMANDÉE d'identifier la personne, l'organisation ou le projet (si ce n'est pas une personne ou une organisation particulière) , responsable de la création (ou le retraitement le plus récent) de ces données. Par exemple,
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Si les données ont été largement traitées (par exemple, données satellitaires de niveau 2 à niveau 3 ou 4) , alors habituellement le reprocesseur est listé comme le créateur et le créateur original est listé via[contributor\\_name](#contributor_name). Par rapport à[projet](#project), cela est plus souple, puisqu'il peut identifier une personne, une organisation ou un projet.
###### creator\\_email {#creator_email} 
*   [ **creator\\_email** ](#creator_email)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est la façon RECOMMANDÉE d'identifier une adresse email (formaté correctement) qui fournit un moyen de contacter le créateur. Par exemple,
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
###### creator\\_url {#creator_url} 
*   [ **creator\\_url** ](#creator_url)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est la façon RECOMMANDÉE d'identifier une URL pour l'organisation qui a créé l'ensemble de données, ou une URL avec les informations du créateur sur cet ensemble de données (mais c'est plus le but de[infoUrl](#infourl)) . Par exemple,
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
###### date\\_created {#date_created} 
*   [ **date\\_created** ](#date_created)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est la façon RECOMMANDÉE d'identifier la date à laquelle les données ont été créées pour la première fois (par exemple, traité dans ce formulaire) , en format ISO 8601. Par exemple,
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Si des données sont ajoutées périodiquement à l'ensemble de données, c'est la première date à laquelle les données originales ont été rendues disponibles.
###### date\\_modified {#date_modified} 
*   [ **date\\_modified** ](#date_modified)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est la façon RECOMMANDÉE d'identifier la date de la dernière modification des données (par exemple, quand une erreur a été corrigée ou quand les dernières données ont été ajoutées) , en format ISO 8601. Par exemple,
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
###### date\\_issued {#date_issued} 
*   [ **date\\_issued** ](#date_issued)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est le moyen RECOMMANDÉ d'identifier la date à laquelle les données ont été mises à la disposition d'autres personnes, au format ISO 8601, par exemple 2012-03-15. Par exemple,
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
Par exemple, l'ensemble de données peut avoir une[date\\_created](#date_created)de 2010-01-30, mais n'a été rendu public que 2010-07-30.date\\_issuedest moins couramment utilisé quedate\\_createdetdate\\_modified. Sidate\\_issuedest omis, il est supposé être le même que ledate\\_created.
###### mondialdrawLandMask {#global-drawlandmask} 
*   [ **drawLandMask** ](#global-drawlandmask)-- C'est un attribut global OPTIONAL utilisé parERDDAP™  (et aucune norme de métadonnées) qui spécifie la valeur par défaut pour l'option "Draw Land Mask" sur le formulaire Make A Graph de l'ensemble de données ( *datasetID* Graphique) et pour le paramètre &.land dans une URL demandant une carte des données. Par exemple,
    ```
    <att name="drawLandMask">over</att>  
    ```
Voir[drawLandMaskAperçu général](#drawlandmask).
###### featureType {#featuretype} 
*   [ **featureType** ](#featuretype)  (des[FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Norme de métadonnées) est IGNORED et/ou REMPLACÉ. Si l'ensemble de données est[cdm\\_data\\_type](#cdm_data_type)est approprié,ERDDAP™va automatiquement l'utiliser pour créer unfeatureTypeattribut. Il n'est donc pas nécessaire que vous l'ajoutiez.
    
Cependant, si vous utilisez[EDDTableFromNcCFFiles](#eddtablefromnccffiles)pour créer un ensemble de données à partir de fichiers qui suivent le[FC Géométries d'échantillonnage discrètes (DSG) standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries), les fichiers doivent avoirfeatureTypecorrectement défini, de sorte queERDDAP™peut lire les fichiers correctement. Cela fait partie des exigences du DSG des FC pour ce type de fichier.
     
###### Historique{#history} 
*   [ **Historique** ](#history)  (des[FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)et[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Normes relatives aux métadonnées) est un attribut global de chaîne multiligne RECOMMANDÉ avec une ligne pour chaque étape de traitement subie par les données. Par exemple,
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * Idéalement, chaque ligne a une norme ISO 8601:2004 (E) formaté date+heureZ (par exemple, 2011-08-05T08:55:02Z) suivi d'une description de l'étape de traitement.
    *   ERDDAP™crée cela si elle n'existe pas déjà.
    * Si elle existe déjà,ERDDAP™ajoutera de nouvelles informations à l'information existante.
    * L'historique est important car il permet aux clients de revenir à la source originale des données.
###### infoUrl {#infourl} 
*   [ **infoUrl** ](#infourl)est un attribut mondial REQUIS avec l'URL d'une page Web avec plus d'informations sur cet ensemble de données (généralement sur le site de l'établissement source) . Par exemple,
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * Soit l'ensemble de données est global[SourceAttributs](#global-attributes)ou à son niveau mondial&lt;addAttributes&gt; DOIT inclure cet attribut.
    *   infoUrlest important car il permet aux clients d'en savoir plus sur les données de la source originale.
    *   ERDDAP™affiche un lien vers leinfoUrlsur le formulaire d'accès aux données ( *datasetID* .html) , Créer une page Web graphique ( *datasetID* Graphique) , et d'autres pages Web.
    * Si l'URL a une partie de requête (après le ""?) , il DOIT être déjà[pourcentage encodé](https://en.wikipedia.org/wiki/Percent-encoding). Vous devez coder des caractères spéciaux dans les contraintes (autres que les premiers « & » et les principaux'=', le cas échéant) dans la forme %HH, où HH est la valeur hexadécimale à 2 chiffres du caractère. Habituellement, vous devez simplement convertir quelques-uns des caractères de ponctuation : % en %25, & en %26, " en %22,&lt;dans %3C, = dans %3D, &gt; dans %3E, + dans %2B,|dans %7C,\\[dans %5B,\\]en %5D, espacez en %20 et convertissez tous les caractères au-dessus de #127 dans leur formulaire UTF-8, puis encodez chaque octet du formulaire UTF-8 dans le format %HH (demander de l'aide à un programmeur) .
Par exemple, &stationID"41004"
devient &stationID%3E=%2241004%22
Pourcentage d'encodage est généralement nécessaire lorsque vous accédezERDDAPvia un logiciel autre qu'un navigateur. Les navigateurs gèrent généralement le pourcentage d'encodage pour vous.
Dans certaines situations, vous devez encoder pour cent tous les caractères autres que A-Za-z0-9\\_-&#33;.~ ' () \\*, mais toujours ne pas encoder le '&' initial ou le principal'='.
Les langues de programmation ont des outils pour ce faire (par exemple, voirJava's[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)  
etJavaLe script [encodeURIComponent()- Oui. ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) et il y a
        [sites web qui encodent/décodent pour vous](https://www.url-encode-decode.com/).
    * Depuisdatasets.xmlest un fichier XML, vous DEVEZ également &-encoder TOUS '&', '&lt;', et '&gt;' dans l'URL comme '&amp;', '&lt;', et '&gt;' après le pourcentage d'encodage.
    *   infoUrlest unique àERDDAP. Il ne provient d'aucune norme de métadonnées.
###### établissement{#institution} 
*   [ **établissement** ](#institution)  (des[FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)et[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Normes relatives aux métadonnées) est un attribut global REQUIS avec la version courte du nom de l'institution qui est la source de ces données (généralement un acronyme, généralement&lt;20 caractères). Par exemple,
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * Soit l'ensemble de données est global[SourceAttributs](#global-attributes)ou à son niveau mondial&lt;addAttributes&gt; DOIT inclure cet attribut.
    *   ERDDAP™affiche l'institution chaque fois qu'elle affiche une liste de ensembles de données. Si le nom d'une institution ici est supérieur à 20 caractères, seuls les 20 premiers caractères seront visibles dans la liste des ensembles de données (mais toute l'institution peut être vue en plaçant le curseur de la souris sur l'icône adjacente "?") .
    * Si vous ajoutez une institution à la liste&lt;categoryAttributes&gt; enERDDAP's[configuration.xml](/docs/server-admin/deploy-install#setupxml)fichier, les utilisateurs peuvent facilement trouver des ensembles de données de la même institution viaERDDAP's "Rechercher des ensembles de données par catégorie" sur la page d'accueil.
###### Mots clés{#keywords} 
*   [ **Mots clés** ](#keywords)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est une liste RECOMMANDÉE de mots et de phrases courtes séparés par des virgules (par exemple,[GCMD Mots clés de la science](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access)) qui décrivent l'ensemble de données d'une manière générale et ne supposent aucune autre connaissance de l'ensemble de données (par exemple, pour les données océanographiques, inclure) . Par exemple,
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
Depuisdatasets.xmlest un document XML, les caractères&lt;, et &gt; dans un attribut comme des mots clés (Par exemple, les caractères &gt; dans les mots-clés scientifiques GCMD) doit être codé comme &amp;,&lt;, et &gt;, respectivement.
Quand un ensemble de données est chargé dansERDDAP,
    
    * "Science de la Terre &gt;" est ajouté au début de tout mot clé GCMD qui manque.
    * Les mots clés GCMD sont convertis en case titre (Les premières lettres sont capitalisées) .
    * Les mots-clés sont réorganisés dans l'ordre trié et tous les caractères de nouvelle ligne sont supprimés.
     
###### keywords\\_vocabulary {#keywords_vocabulary} 
*   [ **keywords\\_vocabulary** ](#keywords_vocabulary)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est un attribut RECOMMANDÉ : si vous suivez une ligne directrice pour les mots/phrases dans votre attribut mots clés (par exemple, GCMD Science Mots clés) , mettez le nom de cette ligne directrice ici. Par exemple,
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### licence{#license} 
*   [ **licence** ](#license)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est un attribut global STRONGEMENT RECOMMANDÉ avec les restrictions de licence et/ou d'utilisation. Par exemple,
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Si "\\[standard\\]" se produit dans la valeur de l'attribut, il sera remplacé par la normeERDDAP™licence de la&lt;standardLicense&gt; balise dansERDDAP's
        \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml fichier.
         
###### Metadata\\_Conventions {#metadata_conventions} 
*   [ **Metadata\\_Conventions** ](#metadata_conventions)est du passé[ACDD 1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)  (qui a été identifié dansMetadata\\_Conventionscomme suit:UnidataDataset Discovery v1.0") Norme de métadonnées. La valeur d'attribut était une liste de conventions de métadonnées séparées par des virgules utilisées par cet ensemble de données.
Si un ensemble de données utilise ACDD 1.0, cet attribut est STRONGEMENT RECOMMANDÉ, par exemple,
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
MaisERDDAP™recommande maintenant ACDD-1.3. Si vous avez[commuté vos ensembles de données pour utiliser ACDD-1.3](#switch-to-acdd-13), utilisation deMetadata\\_Conventionsest STRONGEMENT DISCOURAGED: il suffit d'utiliser [&lt;Conventions&gt;] (#conventions) à la place.
###### processing\\_level {#processing_level} 
*   [ **processing\\_level** ](#processing_level)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est une description textuelle RECOMMANDÉE du traitement (par exemple,[Niveaux de traitement des données satellitaires de la NASA](https://en.wikipedia.org/wiki/Remote_sensing#Data_processing_levels), par exemple, niveau 3) ou niveau de contrôle de qualité (par exemple, Qualité des sciences) des données. Par exemple,
    ```
    <att name="processing\\_level">3</att>  
    ```
###### projet{#project} 
*   [ **projet** ](#project)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est un attribut OPTIONNEL pour identifier le projet auquel l'ensemble de données fait partie. Par exemple,
    ```
    <att name="project">GTSPP</att>  
    ```
Si l'ensemble de données ne fait pas partie d'un projet, n'utilisez pas cet attribut. Par rapport à[creator\\_name](#creator_name), ceci est axé sur le projet (pas une personne ou une organisation, qui peut être impliquée dans plusieurs projets) .
###### publisher\\_name {#publisher_name} 
*   [ **publisher\\_name** ](#publisher_name)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est la façon RECOMMANDÉE d'identifier la personne, l'organisation ou le projet qui publie cet ensemble de données. Par exemple,
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
Par exemple, vous êtes l'éditeur si une autre personne ou un groupe[créé](#creator_name)le jeu de données et vous le réservez simplement viaERDDAP. Si "éditeur" ne s'applique pas vraiment à un ensemble de données, omettez cet attribut. Par rapport à[creator\\_name](#creator_name), l'éditeur n'a probablement pas modifié ou reprogrammé les données de façon significative ; l'éditeur ne fait que rendre les données disponibles dans un nouveau lieu.
###### publisher\\_email {#publisher_email} 
*   [ **publisher\\_email** ](#publisher_email)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est la façon RECOMMANDÉE d'identifier une adresse email (correctement formaté, par exemple, john\\_smith@great.org) qui fournit un moyen de contacter l'éditeur. Par exemple,
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Si "éditeur" ne s'applique pas vraiment à un ensemble de données, omettez cet attribut.
###### publisher\\_url {#publisher_url} 
*   [ **publisher\\_url** ](#publisher_url)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est la manière RECOMMANDÉE d'identifier une URL pour l'organisation qui a publié l'ensemble de données, ou une URL avec les informations de l'éditeur sur cet ensemble de données (mais c'est plus le but de[infoUrl](#infourl)) . Par exemple,
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Si "éditeur" ne s'applique pas vraiment à un ensemble de données, omettez cet attribut.
###### real\\_time {#real_time} 
*   [ **real\\_time** ](#real_time)est un attribut de chaîne global (ne provenant d'aucune norme) indiquant si c'est un ensemble de données en temps réel. Par exemple,
    ```
    <att name="real\\_time">true</att>  
    ```
Si c'est faux (par défaut) ,ERDDAP™cache les réponses aux demandes de types de fichiers où le fichier entier doit être créé avantERDDAP™peut commencer à envoyer la réponse à l'utilisateur et les réutiliser pendant environ 15 minutes (Par exemple,.nc, .png) .
Si c'est vrai,ERDDAP™ne cache jamais les fichiers de réponse et retournera toujours les fichiers nouvellement créés.
###### sourceUrlattribut{#sourceurl-attribute} 
*   [ **sourceUrl** ](#sourceurl-attribute)est un attribut global avec l'URL de la source des données. Par exemple,
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (mais mettez tout sur une seule ligne) 
    *   ERDDAP™crée généralement cet attribut global automatiquement. Deux exceptions sont EDDTableFromHyraxFichiers et EDDTableFromThreddsFiles.
    * Si la source est des fichiers locaux et que les fichiers ont été créés par votre organisation, utilisez
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Si la source est une base de données locale et que les données ont été créées par votre organisation, utilisez
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *   sourceUrlest important car il permet aux clients de revenir à la source originale des données.
    *   sourceUrlest unique àERDDAP. Il ne provient d'aucune norme de métadonnées.
        
###### standard\\_name\\_vocabulary {#standard_name_vocabulary} 
*   [ **standard\\_name\\_vocabulary** ](#standard_name_vocabulary)  (des[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) est un attribut RECOMMANDÉ pour identifier le nom du vocabulaire contrôlé à partir duquel variable[standard\\_name](#standard_name)s sont prises. Par exemple,
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
pour la version 77[Tableau des noms standard des FC](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html).
         
##### subsetVariables {#subsetvariables} 
*    **subsetVariables**   (pour les ensembles de données EDDTable uniquement) est un attribut mondial RECOMMANDÉ qui vous permet de spécifier une liste séparée par des virgules de [&lt;dataVariable&gt;] (#donnéesvariables)  [destinationName](#destinationname)s pour identifier les variables ayant un nombre limité de valeurs (indique une autre façon : les variables pour lesquelles chacune des valeurs a plusieurs duplicata) . Par exemple,
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Si cet attribut est présent, l'ensemble de données aura un *datasetID* .sous-set page web (et un lien vers elle sur chaque liste de données) qui permet aux utilisateurs de sélectionner rapidement et facilement différents sous-ensembles de données.
    * Chaque fois qu'un ensemble de données est chargé,ERDDAPcharge et stocke sur disque une table avec tous les () combinaisons du sous-ensemble Les valeurs de la variable.ERDDAP™peut lire quesubsetVariableset le traiter très rapidement (particulièrement par rapport à la lecture de nombreux fichiers de données ou l'obtention de données à partir d'une base de données ou d'un autre service externe) .
    * Cela permetERDDAP™pour faire 3 choses:
        1. Il permetERDDAP™pour mettre une liste de valeurs possibles dans une liste déroulante sur le formulaire d'accès aux données, la page Web Make A Graph et les pages web .subset.
        2. Il permetERDDAP™pour offrir une page web .subset pour cet ensemble de données. Cette page est intéressante car elle permet de trouver facilement des combinaisons valides des valeurs de ces variables, qui pour certains ensembles de données et certaines variables est très, très difficile (presque impossible) . Ensuite, toutes les requêtes de l'utilisateur () sous-ensemble Les données variables seront très rapides.
        3. S'il y a une requête de l'utilisateur qui ne fait référence qu'à un sous-ensemble de ces variables,ERDDAP™peut lire rapidement lesubsetVariableset répondre à la demande. Cela peut sauver une tonne de temps et d'efforts pourERDDAP.
    * L'ordre desdestinationNames vous spécifiez détermine l'ordre de tri sur le *datasetID* Page web .subset, vous indiquerez d'abord les variables les plus importantes, puis les moins importantes. Par exemple, pour les ensembles de données avec des séries chronologiques pour plusieurs stations, vous pouvez utiliser, par exemple,
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
afin que les valeurs soient triées par station\\_id.
    * De toute évidence, il est de votre choix quelles variables à inclure dans lesubsetVariablesliste, mais l'utilisation suggérée est:
        
En général, inclure les variables pour lesquelles vous voulezERDDAP™pour afficher une liste déroulante des options sur le formulaire d'accès aux données de l'ensemble de données (.html) et marque A (Graphique) pages Web.
        
En général, inclure des variables avec des informations sur les caractéristiques de l'ensemble de données (les stations, profils et/ou trajectoires,[cdm\\_timeseries\\_variables](#cdm_timeseries_variables),[cdm\\_profil\\_variables](#cdm_profile_variables),[cdm\\_trajectoire\\_variables](#cdm_trajectory_variables)) . Il n'y a que quelques valeurs différentes pour ces variables, donc elles fonctionnent bien avec les listes déroulantes.
        
N'incluez jamais de variables de données associées à des observations individuelles (Par exemple, temps, température, salinité, vitesse du courant) dans lesubsetVariablesliste. Il ya trop de valeurs différentes pour ces variables, donc une liste déroulante serait lente à charger et être difficile à travailler avec (ou ne pas travailler) .
        
    * Si le nombre de combinaisons distinctes de ces variables est supérieur à environ 1.000.000, vous devriez envisager de restreindre lasubsetVariablesque vous spécifiez pour réduire le nombre de combinaisons distinctes à moins de 1.000.000; sinon, *datasetID* Les pages web .subset peuvent être générées lentement. Dans les cas extrêmes, l'ensemble de données peut ne pas être chargé enERDDAP™parce que générer la liste des combinaisons distinctes utilise trop de mémoire. Si oui, vous DOIVENT supprimer certaines variables de lasubsetVariablesliste.
    * Si le nombre de valeurs distinctes d'une variable sous-ensemble est supérieur à environ 20 000, vous devriez envisager de ne pas inclure cette variable dans la liste des variables suivantes :subsetVariables; sinon, il faut beaucoup de temps pour transmettre *datasetID* .sous-ensemble, *datasetID* .graph, et *datasetID* Pages web .html. Aussi, sur un Mac, il est très difficile de faire des sélections à partir d'une liste déroulante avec plus de 500 articles à cause de l'absence de barre de défilement. Un compromis est : supprimer les variables de la liste lorsque les utilisateurs ne sont pas susceptibles de sélectionner des valeurs d'une liste déroulante.
    * Vous devriez tester chaque ensemble de données pour voir sisubsetVariablesLe réglage est correct. Si le serveur de données source est lent et prend trop de temps (ou échoue) pour télécharger les données, soit réduire le nombre de variables spécifiées ou supprimersubsetVariablesattribut global.
    * Sous-ensemble Les variables sont très utiles. Donc, si votre jeu de données est approprié, veuillez créer unsubsetVariablesattribut.
    * Tableau EDD deSOSajoute automatiquement
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
lorsque l'ensemble de données est créé.
        * Mise en garde possible: si un utilisateur *datasetID* .subset web page sélectionne une valeur qui a un carrierRetour ou un caractère newline, *datasetID* .subset échouera.ERDDAP™ne peut pas travailler sur cette question à cause de certains détails HTML. En tout cas, c'est presque toujours une bonne idée de supprimer le carrierRetour et les caractères newline des données. Pour vous aider à résoudre le problème, si la table EDD.subsetVariablesMéthode DataTable enERDDAPdétecte les valeurs de données qui causeront des problèmes, il enverra un avertissement avec une liste de valeurs offensantes à l'email Tout Pour les adresses e-mail spécifiées dans setup.xml. De cette façon, vous savez ce qui doit être réparé.
        *    **Tableaux de sous-ensembles pré-générés.** Normalement, quandERDDAP™charge un ensemble de données, il demande le () sous-ensemble des variables tableau de données de la source de données, juste par une demande de données normale. Dans certains cas, ces données ne sont pas disponibles à partir de la source de données ou la récupération de la source de données peut être difficile sur le serveur source de données. Si oui, vous pouvez fournir une table avec les informations dans un.jsonou .csv fichier avec le nom *Tomcat* /content/erddap/subset/ *datasetID* .json  (ou .csv) . S'il y a lieu,ERDDAP™l'utiliser comme source des données du sous-ensemble.
            * S'il y a une erreur lors de la lecture, l'ensemble de données ne sera pas chargé.
            * Il DOIT avoir exactement les mêmes noms de colonnes (Par exemple, même cas) comme&lt;subsetVariables&gt;, mais les colonnes peuvent être dans n'importe quel ordre.
            * Il PEUT y avoir des colonnes supplémentaires (ils seront enlevés et les lignes nouvellement redondantes seront supprimées) .
            * Valeurs manquantes (pas de faux chiffres comme -99) .
            *   .jsonfichiers peut être un peu plus difficile à créer, mais traiter avec les caractères Unicode bien..jsonfichiers sont faciles à créer si vous les créez avecERDDAP.
            * Les fichiers .csv sont faciles à utiliser, mais ne conviennent qu'aux caractères ISO 8859-1. Les fichiers .csv DOIVENT avoir des noms de colonnes sur la première ligne et des données sur les lignes suivantes.
        * Pour des ensembles de données énormes ou lorsque&lt;subsetVariables&gt; est mal configuré, la table des combinaisons de valeurs peut être assez grande pour causer trop de données ou d'erreurs OutOfMemory. La solution est de supprimer les variables de la liste des&lt;subsetVariables&gt; pour lesquels il y a un grand nombre de valeurs, ou supprimer les variables au besoin jusqu'à ce que la taille de ce tableau soit raisonnable. Quelle que soit l'erreur,ERDDAP™qui utilisent lessubsetVariablessystème ne fonctionne pas bien (Par exemple, les pages Web se chargent très lentement) quand il y a trop de lignes (Par exemple, plus d'un million) dans cette table.
        *   subsetVariablesn'a rien à voir avec la spécification des variables que les utilisateurs peuvent utiliser dans les contraintes, c'est-à-dire comment les utilisateurs peuvent demander des sous-ensembles de données.ERDDAP™permet toujours aux contraintes de se référer à l'une quelconque des variables.
###### Unités de temps{#time-units} 
[Heure et heure](#time-units)les colonnes doivent être ISO 8601:2004 (E) date et heure formatées Chaînes Z (Par exemple, 1985-01-31T15:31:00Z) .
             
###### résumé{#summary} 
*   [ **résumé** ](#summary)  (des[FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)et[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Normes relatives aux métadonnées) est un attribut mondial REQUIS avec une longue description de l'ensemble de données (généralement&lt;500 caractères). Par exemple,
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * Soit l'ensemble de données est global[SourceAttributs](#global-attributes)ou à son niveau mondial&lt;addAttributes&gt; DOIT inclure cet attribut.
    * résumé est très important car il permet aux clients de lire une description de l'ensemble de données qui a plus d'informations que le titre et donc comprendre rapidement ce qu'est l'ensemble de données.
    * Conseil: veuillez écrire le résumé afin qu'il fonctionne pour décrire l'ensemble de données à une personne aléatoire que vous rencontrez dans la rue ou à un collègue. N'oubliez pas d'inclure le[Cinq W et un H](https://en.wikipedia.org/wiki/Five_Ws): Qui a créé l'ensemble de données ? Quels renseignements ont été recueillis? Quand les données ont-elles été recueillies? Où a-t-il été recueilli ? Pourquoi a-t-elle été recueillie ? Comment a-t-elle été recueillie ?
    *   ERDDAP™affiche le résumé sur le formulaire d'accès aux données de l'ensemble de données ( *datasetID* .html) , Créer une page Web graphique ( *datasetID* Graphique) , et d'autres pages Web.ERDDAP™utilise le résumé lors de la création des documents FGDC et ISO 19115.
###### testOutOfDate {#testoutofdate} 
*   [ **testOutOfDate** ](#testoutofdate)  (une optionERDDAP-attribut de métadonnées globales spécifiques, non d'aucune norme) spécifie, d'une manière simpliste, lorsque les données d'un ensemble de données en temps quasi réel sont considérées comme périmées,now- *nUnités* , par exemple,now-2jours pour les données qui apparaissent habituellement 24 à 48 heures après la valeur temporelle. Pour les données prévisionnelles, utilisez maintenant **+**  *nUnités* , par exemple, maintenant + 6 jours pour les données prévisionnelles qui sont, au plus, 8 jours à l'avenir. (Voir[now- *nUnités* description syntaxique](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now).) Si la valeur de temps maximale pour l'ensemble de données est plus récente que la date spécifiée, l'ensemble de données est considéré comme à jour. Si la durée maximale est plus longue que la durée spécifiée, l'ensemble de données est considéré comme à jour. Pour les ensembles de données périmés, il y a probablement un problème avec la source des données.ERDDAP™est incapable d'accéder aux données à partir de points de temps plus récents.
    
LestestOutOfDatevaleur est affiché comme une colonne dans le[allDatasetsensemble de données](#eddtablefromalldatasets)dans votreERDDAP. Il est également utilisé pour calculer l'indice OutOfDate, qui est une autre colonne dans laallDatasetsensemble de données.
Si l'indice est&lt;1, l'ensemble de données est considéré à jour.
Si l'indice est&lt;=1, l'ensemble de données est considéré comme périmé.
Si l'indice est&lt;=2, l'ensemble de données est considéré comme très périmé.
    
LestestOutOfDatevaleur est également utilisée parERDDAP™pour générer la https://*yourDomain*/erddap/outOfDateDatasets.html page Web ([exemple](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) qui montre les ensembles de données qui ont&lt;testOutOfDate&gt; tags, avec les ensembles de données classés par la façon dont ils sont périmés. Si vous modifiez le type de fichier (de .html à .csv,.jsonlCSV,.nc,.tsv, ...) , vous pouvez obtenir ces informations dans différents formats de fichiers.
    
Si possible,[Générer des ensembles de donnéesXml](#generatedatasetsxml)ajoute atestOutOfDatel'attribut globaladdAttributesd'un ensemble de données. Cette valeur est une suggestion basée sur les informations disponibles pour GenerateDatasetsXml. Si la valeur n'est pas appropriée, changez-la.
    
"Out-of-date" ici est très différent de [&lt;recharger Chaque NMinutes&gt;] (#recharger toutes les minutes) , qui traite de la mise à jourERDDAPLa connaissance de l'ensemble de données l'est. Les&lt;testOutOfDate&gt; système suppose queERDDAPLa connaissance de l'ensemble de données est à jour. Sur la question&lt;testOutOfDate&gt; traite avec: semble-t-il y avoir quelque chose de mal avec la source des données, ce qui fait que les données plus récentes ne sont pas accessibles parERDDAP?
    
###### titre{#title} 
*   [ **titre** ](#title)  (des[FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)et[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Normes relatives aux métadonnées) est un attribut global REQUIS avec la courte description de l'ensemble de données (généralement&lt;= 95 caractères). Par exemple,
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * Soit l'ensemble de données est global[SourceAttributs](#global-attributes)ou à son niveau mondial&lt;addAttributes&gt; DOIT inclure cet attribut.
    * le titre est important parce que chaque liste de ensembles de donnéesERDDAP  (autres que les résultats de la recherche) liste les ensembles de données par ordre alphabétique, par titre. Donc, si vous voulez spécifier l'ordre des ensembles de données, ou que certains ensembles de données soient regroupés, vous devez créer des titres avec cela à l'esprit. Nombreuses listes de ensembles de données (par exemple, en réponse à une recherche de catégorie) , afficher un sous-ensemble de la liste complète et dans un ordre différent. Ainsi, le titre de chaque ensemble de données devrait être autonome.
    * Si le titre contient le mot "DEPRECATED" (toutes les lettres majuscules) , alors l'ensemble de données obtiendra un rang inférieur dans les recherches.
             
##### &lt;axisVariable&gt;{#axisvariable} 
* [ ** &lt;axisVariable&gt; ** - Oui. (#axevariable) est utilisé pour décrire une dimension (aussi appelé "axe") .
PourEDDGridensembles de données, un ou plusieursaxisVariabletags est REQUIS, et tous[dataVariables](#datavariable)partager/utiliser toujours toutes les variables d'axe. ([Pourquoi ?](#why-just-two-basic-data-structures) [Et s'ils ne le font pas ?](#dimensions))   
Il DOIT y avoir une variable d'axe pour chaque dimension des variables de données.
Les variables d'axe DOIVENT être spécifiées dans l'ordre où les variables de données les utilisent.
(Les ensembles de données EDDTable ne peuvent pas utiliser&lt;axisVariable&gt; tags.)
Un exemple enrichi est:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt;axisVariable&gt; prend en charge les sous-tags suivants:
###### &lt;sourceName\\&gt;{#sourcename} 
* [&lt;sourceNameAnnexe (#Nom de la source) -- le nom de la source de données pour la variable. C'est le nom quiERDDAP™utilisera pour demander des données à la source de données. C'est le nom quiERDDAP™cherchera quand les données sont retournées de la source de données. C'est sensible au cas par cas. C'est REQUIS.
###### &lt;destinationName\\&gt;{#destinationname} 
* [&lt;destinationNameAnnexe (Nom de destination) est le nom de la variable qui sera montrée et utilisée parERDDAP™utilisateurs.
    * C'est OPTIONNEL. En cas d'absence,sourceNameest utilisé.
    * Ceci est utile parce qu'il vous permet de changer un cryptique ou étrangesourceName.
    *   destinationNameest sensible au cas par cas.
    *   destinationNames DOIT commencer par une lettre (A-Z, a-z) et DOIT être suivi de 0 caractères ou plus (A-Z, a-z, 0-9 et \\_) . ('-' était autorisé avantERDDAP™version 1.10.) Cette restriction permet aux noms de variables d'axe d'être les mêmes dansERDDAP™, dans les fichiers de réponse, et dans tous les logiciels où ces fichiers seront utilisés, y compris les langages de programmation (commePython,MatlabetJavaScénario) où il existe des restrictions similaires sur les noms de variables.
    * EnEDDGridles ensembles de données,[longitude, latitude, altitude, profondeur et temps](#destinationname)Les variables d'axe sont spéciales.
         
###### axisVariable &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [&lt;addAttributes&gt;] (Nombre d'additifs variables) définit un ensemble OPTIONNEL d'attributs ( *nom* = *valeur* ) qui sont ajoutés aux attributs de la source pour une variable, pour faire les attributs combinés pour une variable.
Si la variable est[SourceAttributs](#variable-addattributes)ou&lt;addAttributes&gt; inclure[scale\\_factoret/ouadd\\_offset](#scale_factor)attributs, leurs valeurs seront utilisées pour décompresser les données de la source avant distribution au client
     (résultat Valeur = source Valeur \\*scale\\_factor+add\\_offset) . La variable non emballée sera du même type de données (par exemple, flotter) en tant quescale\\_factoretadd\\_offsetvaleurs.
         
##### &lt;dataVariable&gt;{#datavariable} 
* [ ** &lt;dataVariable&gt; ** - Oui. (#donnéesvariables) est un (pour presque tous les ensembles de données) l'étiquette dans la&lt;dataset&gt; tag qui est utilisé pour décrire une variable de données. Il DOIT y avoir 1 ou plusieurs instances de cette balise. Un exemple enrichi est:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt;dataVariable&gt; prend en charge les sous-tags suivants:
###### &lt;sourceName&gt;{#sourcename-1} 
* [&lt;sourceName&gt;] (#Nom de la source) -- le nom de la source de données pour la variable. C'est le nom quiERDDAP™utilisera pour demander des données à la source de données. C'est le nom quiERDDAP™cherchera quand les données sont retournées de la source de données. C'est sensible au cas par cas. C'est REQUIS.
###### Groupes{#groups} 
Les FC ont apporté un soutien supplémentaire aux groupes visés par la v1.8. À partir de ~2020,NetCDFles outils permettent de placer des variables dans des groupes.ncfichier. En pratique, cela signifie simplement que les variables ont un nom long qui identifie le groupe (s) et le nom de la variable, par exemple group1a/group2c/varName ).ERDDAP™prend en charge les groupes en convertissant les "/" dans la variable&lt;sourceName&gt; dans "\\_" dans la variable&lt;destinationName&gt;, par exemple, group1a\\_group2c\\_varName . (Lorsque vous voyez cela, vous devez réaliser que les groupes ne sont pas beaucoup plus qu'une convention syntaxique.) Lorsque les variables sont listées dansERDDAP™, toutes les variables d'un groupe apparaissent ensemble, imitant le groupe sous-jacent.\\[SiERDDAP™, notamment générer des ensembles de données Xml, ne fonctionne pas aussi bien qu'il pourrait avec les fichiers sources qui ont des groupes, s'il vous plaît envoyer un exemple de fichier à Chris. John à noaa.gov .\\]

Les ensembles de données EDDTableFromFiles peuvent utiliser des pseudo encodés spécialementsourceNames pour définir de nouvelles variables de données, par exemple, pour promouvoir un attribut global comme variable de données. Voir[cette documentation](#pseudo-sourcenames).
###### HDFStructures{#hdf-structures} 
En commençant parERDDAP™v2.12,EDDGridDeNcFiles etEDDGridDeNcFiles Unpacked peut lire les données de "structures" dans.nc4 et.hdf4 dossiers. Pour identifier une variable qui provient d'une structure,&lt;sourceName&gt; doit utiliser le format: *Nom complet de la structure* | *Nom du membre* , par exemple groupe1/myStruct|MonMembre.

###### Noms de source de valeur fixe{#fixed-value-sourcenames} 
Dans un ensemble de données EDDTable, si vous voulez créer une variable (avec une valeur unique fixe) qui n'est pas dans l'ensemble de données source, utilisez:
```
    <sourceName>=*fixedValue*</sourceName>  
```
Le signe initial égal indiqueERDDAP™qu'un La valeur suivra.

* Pour les variables numériques, la valeur fixe doit être une seule valeur finie ou NaN (cas insensible, p.ex. \\=NaN) .
* Pour les variables de chaîne, la valeur fixe doit être unique,[Chaîne de style JSON](https://www.json.org/json-en.html)  (avec des caractères spéciaux échappés avec des caractères \\) , p.ex., \\="Mon \\"Special\\" Chaîne" .
* Pour une variable timestamp, spécifiez la valeur fixe comme un nombre dans"seconds since 1970-01-01T00:00:00Z"et utilisation
unités=secondes depuis 1970-01-01T00:00:00Z .
    
Les autres tags pour le&lt;dataVariable&gt; travailler comme si c'était une variable régulière.
Par exemple, pour créer une variable appelée altitude avec une valeur fixe de 0.0 (flotteur) , utiliser:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

Pour les situations inhabituelles, vous pouvez même spécifier unactual\\_rangeaddAttribute, qui remplacera les valeurs attendues de destinationMin et destinationMax (qui, autrement, égalerait la valeur fixée Valeur) .
 
###### Script SourceNames/variables dérivées{#script-sourcenamesderived-variables} 
En commençant parERDDAP™v2.10, dans une[EDDTableFromFiles](#eddtablefromfiles),[EDDTableFromDatabase](#eddtablefromdatabase)ou[EDDTableFromFileNames](#eddtablefromfilenames)l'ensemble de données,&lt;sourceName&gt; peut être
une expression (une équation qui évalue à une seule valeur) , en utilisant le format
```
    <sourceName>=*expression*</sourceName>  
```
ou un script (une série d'énoncés qui retournent une valeur unique) , en utilisant le format
```
    <sourceName>=*script*</sourceName>  
```
ERDDAP™compte sur le[Projet Apache](https://www.apache.org/) [JavaLangue d'expression (JEXL) ](https://commons.apache.org/proper/commons-jexl/)  (licence & #160;:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) pour évaluer les expressions et exécuter les scripts.
Le calcul d'une nouvelle variable donnée se fait à l'intérieur d'une ligne des résultats, à plusieurs reprises pour toutes les lignes.
Les expressions et les scripts utilisent unJava- etJavaSyntaxe Script-like et peut utiliser n'importe quel des
[les opérateurs et les méthodes intégrés dans JEXL;](https://commons.apache.org/proper/commons-jexl/reference/syntax.html).
Les scripts peuvent également utiliser des méthodes (fonctions) de ces classes:
*   [Calendrier2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2), qui est une enveloppe pour certaines des méthodes statiques, temporelles et liées au calendrier dans com.cohort.util.Calendar2 ([licence](/acknowledgements#cohort-software)) . Par exemple,
Calendrier2.parseToEpochDeuxièmes ( *sourceHeure, date TimeFormat* ) analysera la source Chaîne de temps via la chaîne dateTimeFormat et retourner une"seconds since 1970-01-01T00:00:00Z"  (époques) une double valeur.
*   [Mathématiques](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math), qui est un wrapper pour presque toutes les méthodes statiques,[- Oui. Mathématiques](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html). Par exemple, Math.atan2 ( *y, x* ) prend en coordonnées rectangulaires (y, x) et retourne les coordonnées polaires (une gamme de doubles avec\\[r, theta\\]) .
*   [Mathématiques](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2), qui est une enveloppe pour presque toutes les méthodes statiques, liées aux mathématiques dans com.cohort.util. Mathématiques ([licence](/acknowledgements#cohort-software)) . Par exemple,
Math2.roundTo ( *d, nLieux* ) arrondira d au nombre spécifié de chiffres à droite du point décimal.
* String, qui vous donne accès à toutes les méthodes statiques, liées à String dans[- Oui. Chaîne](https://docs.oracle.com/javase/8/docs/api/java/lang/String). Chaîne d'objets dansERDDAP™expressions et scripts peuvent utiliser n'importe lequel de leurs associésJavales méthodes décrites dans le java.lang. Documentation sur les chaînes. Par exemple, String.valueDe (d) convertira la double valeur d en une chaîne (bien que vous pouvez également utiliser ""+d) .
*   [Chaîne2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2), qui est un wrapper pour la plupart des méthodes statiques, String- et liées au tableau dans com.cohort.util.String2 ([licence](/acknowledgements#cohort-software)) . Par exemple, String2.zeroPad ( *Numéro, nDigits* ) ajoutera 0's à gauche du nombre Chaîne de sorte que le nombre total de chiffres soit nDigits (Par exemple, String2.zeroPad ("6", 2) retournera "06") .
*   [ligne](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row), qui a des méthodes non statiques pour accéder aux données des différentes colonnes de la ligne courante du tableau de données source. Par exemple, rang.columnString ("année") lit la valeur de la colonne "année" comme une chaîne, alors que, rang.column Int ("année") lit la valeur de la colonne « année » comme un entier.

Pour des raisons de sécurité, expressions et scripts ne peuvent pas utiliser d'autres classes que celles 6.ERDDAP™renforce cette limitation en créant une liste noire par défaut (dont les listes noires sont toutes classes) puis une liste blanche (qui permet spécifiquement les 6 classes décrites ci-dessus) . Si vous avez besoin d'autres méthodes et/ou d'autres classes pour faire votre travail, veuillez envoyer vos demandes par courriel à Chris. John à noaa.gov .
    
###### Efficacité
Pour les ensembles de données EDDTableFromFiles, il n'y a qu'un minimum (probablement pas perceptible) le ralentissement des demandes de données de ces variables. Pour EDDTableFromDatabase, il existe une énorme pénalité de vitesse pour les demandes qui incluent des contraintes sur ces variables (p. ex. (&longitude0360&gt;30&longitude0360&lt;40) parce que les contraintes ne peuvent pas être transmises à la base de données, donc la base de données doit retourner beaucoup plus de données àERDDAP™  (qui prend beaucoup de temps) de sorte queERDDAP™peut créer la nouvelle variable et appliquer la contrainte. Pour éviter le pire cas (où il n'y a pas de contraintes à la base de données) ,ERDDAP™lance un message d'erreur afin que la base de données n'ait pas à retourner le contenu entier de la table. (Si vous voulez contourner cela, ajoutez une contrainte à une colonne non-script qui sera toujours vraie, par exemple, &time&lt;3000-01-01.) Pour cette raison, avec EDDTableFromDatabase, il est probablement toujours préférable de créer une colonne dérivée dans la base de données plutôt que d'utilisersourceName=script enERDDAP.

###### Aperçu de l'expression (Ou Script) Est utilisé:
En réponse à la demande d'un utilisateur de données tabulaires,ERDDAP™obtient des données d'une série de fichiers sources. Chaque fichier source générera une table de brut (directement de la source) données.ERDDAP™va ensuite passer par la table des données brutes, ligne par ligne, et évaluer l'expression ou le script une fois pour chaque ligne, afin de créer une nouvelle colonne qui a cette expression ou le script comme unsourceName.
    
###### Générer des ensembles de donnéesXml
Notez que générer des ensembles de données Xml est complètement ignorant quand il y a un besoin de créer une variable avec&lt;sourceName&gt;= *expression* &lt;/sourceName&gt;. Vous devez créer la variable dansdatasets.xmlà la main.

###### Exemples d'expression :
Voici quelques exemples complets de variables de données qui utilisent une expression pour créer une nouvelle colonne de données. Nous espérons que ces exemples (et leurs variantes) couvrira environ 95% de l'utilisation de toutes les expressions dérivéessourceNamePar.

###### Combiner "date" et"time"colonnes dans une colonne temporelle unifiée:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
ÇasourceNameexpression fait un nouveau"time"colonne en concatérant les valeurs de chaîne de la "date" (yyyy-MM-dd) et"time"  (HH:mm:ss) colonnes sur chaque ligne du fichier source, et en convertissant cette chaîne en"seconds since 1970-01-01"  (époques) une double valeur.

Ou bien bien sûr, vous devrez personnaliser la chaîne de format de temps pour traiter le format spécifique dans les colonnes de date et d'heure de chaque jeu de données, voir le
[documentation des unités de temps](#string-time-units).

Techniquement, vous n'avez pas à utiliser Calendrier2.parseToEpochDeuxièmes () pour convertir la date + heure combinée en époqueSecond. Vous pourriez juste passer la date + heure String àERDDAP™et préciser le format (par exemple,
yyyy-MM-dd'T'HH:mm:ss'Z') via l'attribut unités. Mais il y a des avantages importants à convertir en epochSeconds -- notamment, EDDTableFromFiles peut alors facilement garder une trace de la plage de valeurs de temps dans chaque fichier et si rapidement décider s'il faut regarder dans un fichier donné lorsque vous répondez à une requête qui a des contraintes de temps.

Un problème connexe est la nécessité de créer une colonne de date + heure unifiée à partir d'une source avec année, mois, date, heure, minute, seconde séparée. La solution est très similaire, mais vous aurez souvent besoin de zéro-pad beaucoup de champs, de sorte que, par exemple, mois (1 - 12) et date (1 - 31) avoir toujours 2 chiffres. Voici un exemple avec l'année, le mois, la date:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
Un problème connexe est la nécessité de créer une colonne de latitude ou de longitude unifiée en combinant les données dans les colonnes séparées de degrés, minutes et secondes de la table source, chacune stockée comme entiers. Par exemple,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Conversion d'une colonne nommée "lon" avec des valeurs de longitude de 0 - 360° en une colonne nommée "longitude" avec des valeurs de -180 - 180°
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
ÇasourceNameexpression fait une nouvelle colonne "longitude" en convertissant la double valeur de la colonne "lon" sur chaque ligne du fichier source (Probablement avec des valeurs de 0 à 360) , et en convertissant cela en une -180 à 180 double valeur.

Si vous voulez convertir des valeurs de longitude source de -180 - 180° en 0 - 360°, utilisez
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Nommer les deux variables de longitude :
Si l'ensemble de données comporte 2 variables de longitude, nous recommandons d'utiliserdestinationName=longitude pour la variable -180 - 180° etdestinationName=longitude0360 (et longName=\\"Longueur 0-360°") pour la variable 0 - 360°. Ceci est important parce que les utilisateurs utilisent parfois la recherche avancée pour rechercher des données dans une plage de longitude spécifique. Cette recherche fonctionnera mieux si la longitude a constamment -180 - 180° pour tous les ensembles de données. De plus, les attributs globaux géospatial\\_lon\\_min, géospatial\\_lon\\_max, Westernmost\\_Easting et Easternmost\\_Eastings seront ensuite définis de manière cohérente. (avec des valeurs de longitude -180 à 180°) ;
    
###### Conversion d'une colonne nommée "tempF" avec des valeurs de température en degré\\_ F dans une colonne nommée "tempC" avec des températures en degré\\_ C:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
ÇasourceNameexpression fait une nouvelle colonne "tempC" en convertissant le degré de flotteur\\_ F valeur de la colonne "tempF" sur chaque ligne du fichier source dans un degré flottant\\_ Valeur C.

Notez que votre jeu de données peut avoir la temp originale F variable et la nouvelle température C variable en ayant une autre variable avec
```
    <sourceName>tempF</sourceName>
```
###### Conversion des colonnes "vitesse" et "direction" du vent en deux colonnes avec les composants u,v
* Pour faire une variable u, utilisez
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* Pour faire une variable v, utilisez
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
Ou, vu u, v:
* Pour faire une variable de vitesse, utilisez
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* Pour faire une variable de direction, utilisez
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Exemple de script :
Voici un exemple d'utilisation d'un script, pas seulement une expression, comme unsourceName. Nous nous attendons à ce que les scripts, par opposition aux expressions, ne soient pas nécessaires souvent. Dans ce cas, le but est de retourner une valeur manquante non-NaN (-99) pour les valeurs de température en dehors d'une plage spécifique. Notez que le script est la partie après le ".
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### Drapeau dur
Si vous changez l'expression ou le script définisourceName, vous devez mettre un[drapeau dur](/docs/server-admin/additional-information#hard-flag)pour l'ensemble de donnéesERDDAP™supprime toutes les informations mises en cache pour l'ensemble de données et relise chaque fichier de données (utilisant la nouvelle expression ou le nouveau script) la prochaine fois qu'il charge l'ensemble de données. Vous pouvez également utiliser[DasDds](#dasdds)qui fait l'équivalent d'un drapeau dur.

###### Encodage pour cent
Ceci n'est que rarement pertinent: Parce que les expressions et les scripts sont écrits endatasets.xml, qui est un document XML, vous devez encoder&lt;, \\&gt; et & caractères dans les expressions et les scripts comme&lt;, &gt; et &amp; .

###### Problèmes courants
Un problème commun est que vous créez une variable avecsourceName= *expression* mais la colonne de données résultante n'a que des valeurs manquantes. Alternativement, certaines lignes de la nouvelle colonne ont des valeurs manquantes et vous pensez qu'elles ne devraient pas. Le problème sous-jacent est que quelque chose ne va pas avec l'expression etERDDAPconvertit cette erreur en une valeur manquante. Pour résoudre le problème,

* Regardez l'expression pour voir quel pourrait être le problème.
* Regardez.[Log.txt](/docs/server-admin/additional-information#log), qui affichera le premier message d'erreur généré lors de la création de chaque nouvelle colonne.

Les causes communes sont:

* Vous avez utilisé le mauvais cas. Les expressions et les scripts sont sensibles aux cas.
* Vous avez oublié le nom de la classe. Par exemple, vous devez utiliser Math.abs () Pas seulement les abdos () .
* Tu n'as pas fait de conversions. Par exemple, si le type de données d'une valeur de paramètre est String et que vous avez une double valeur, vous devez convertir un double en une chaîne via ""+d.
* Le nom de colonne dans l'expression ne correspond pas exactement au nom de colonne dans le fichier (ou le nom peut être différent dans certains fichiers) .
* Il y a une erreur de syntaxe dans l'expression (Par exemple, un manquant ou un supplément ') ').

Si vous êtes coincé ou avez besoin d'aide,
Veuillez inclure les détails et voir notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).
        
###### &lt;destinationName&gt;{#destinationname-1} 
* [&lt;destinationName&gt;] (Nom de destination) -- le nom de la variable qui sera affichée et utilisée parERDDAP™utilisateurs.
    * C'est OPTIONNEL. En cas d'absence,[sourceName](#sourcename)est utilisé.
    * Ceci est utile parce qu'il vous permet de changer un cryptique ou étrangesourceName.
    *   destinationNameest sensible au cas par cas.
    *   destinationNames DOIT commencer par une lettre (A-Z, a-z) et DOIT être suivi de 0 caractères ou plus (A-Z, a-z, 0-9 et \\_) . ('-' était autorisé avantERDDAP™version 1.10.) Cette restriction permet aux noms de variables de données d'être les mêmes dansERDDAP™, dans les fichiers de réponse, et dans tous les logiciels où ces fichiers seront utilisés, y compris les langages de programmation (commePython,MatlabetJavaScénario) où il existe des restrictions similaires sur les noms de variables.
    * Dans les ensembles de données EDDTable,[longitude, latitude, altitude (ou profondeur) , et heure](#destinationname)Les variables de données sont particulières.
             
###### &lt;données Type &gt;{#datatype} 
* [&lt;type de données&gt;] (#type de données) -- spécifie le type de données provenant de la source. (Dans certains cas, par exemple, lors de la lecture des données des fichiers ASCII, il précise comment les données provenant de la source doivent être stockées.) 
    * Ceci est demandé par certains types de données et IGNORED par d'autres. Types de données qui nécessitent cettedataVariables sont:EDDGridDeXxxFiles, EDDTableDeXxxFiles, EDDTableDeMWFS, EDDTableFromNOS, EDDTableFromSOS. D'autres types de données ignorent cette balise parce qu'ils obtiennent les informations de la source.
         
    * Les valeurs valides sont toutes les normes[ERDDAP™types de données](#data-types)plus booléen (voir ci-dessous) . Les noms de type de données sont sensibles aux cas.
         
###### données booléennes{#boolean-data} 
*   ["booléenne"](#boolean-data)est un cas particulier.
    * Sur le plan interne,ERDDAP™ne prend pas en charge un type booléen car les booléens ne peuvent pas stocker les valeurs manquantes et la plupart des types de fichiers ne prennent pas en charge les booléens. Aussi,DAPne prend pas en charge les booléens, donc il n'y aurait pas de moyen standard pour interroger les variables booléennes.
    * Spécifier "boolean" pour les données Typedatasets.xmlLes valeurs booléennes seront stockées et représentées par des octets: 0 = faux, 1 = vrai, 127 =missing\\_value.
    * Les utilisateurs peuvent spécifier les contraintes en utilisant les valeurs numériques (par exemple, "isAlive=1") .
    *   ERDDAP™les administrateurs doivent parfois utiliser les données "boolean" Typedatasets.xmlà direERDDAP™comment interagir avec la source de données (Par exemple, pour lire les valeurs booléennes d'une base de données relationnelle et les convertir en 0, 1, ou 127) .
         
* Si vous voulez modifier une variable de données à partir du type de données dans les fichiers source (par exemple, courte) dans d'autres données Saisissez l'ensemble de données (Par exemple, Int) , ne pas utiliser&lt;dataType&gt; pour spécifier ce que vous voulez. (Il fonctionne pour certains types de ensembles de données, mais pas pour d'autres.) Plutôt:
    * Utilisation&lt;dataType&gt; pour spécifier ce qui est dans les fichiers (par exemple, courte) .
    * Dans&lt;addAttributes&gt; pour la variable, ajouter a[scale\\_factor](#scale_factor)attribut avec les nouvelles données Type (Par exemple, Int) et une valeur de 1, par exemple,
```
            <att name="scale\\_factor" type="int">1</att>  
```
###### dataVariable &lt;addAttributes&gt; {#datavariable-addattributes} 
* [&lt;addAttributes&gt;] (Nombre d'additifs variables) -- définit un ensemble d'attributs ( *nom* = *valeur* ) qui sont ajoutés aux attributs de la source pour une variable, pour faire les attributs combinés pour une variable. C'est OPTIONNEL.
Si la variable est[SourceAttributs](#variable-addattributes)ou&lt;addAttributes&gt; inclure[scale\\_factoret/ouadd\\_offset](#scale_factor)attributs, leurs valeurs seront utilisées pour décompresser les données de la source avant la distribution au client. La variable non emballée sera du même type de données (par exemple, flotter) en tant quescale\\_factoretadd\\_offsetvaleurs.
        
###### Variable&lt;addAttributes&gt; {#variable-addattributes} 
* [ ** Attributs variables / Variables&lt;addAttributes&gt; ** - Oui. (Nombre d'additifs variables) --&lt;addAttributes&gt; est une étiquette OPTIONNELLE&lt;axisVariableou&lt;dataVariable&gt; tag qui est utilisé pour modifier les attributs de la variable.
    
    *    ** Utiliser une variable&lt;addAttributes&gt; pour modifier les attributs de la variable. ** ERDDAP™combine les attributs d'une variable depuis la source de l'ensemble de données (** SourceAttributs **) et la variable** addAttributes **que vous définissez dansdatasets.xml  (qui ont priorité) pour faire la variable "** Attributs combinés ** ", qui sont ceERDDAP™les utilisateurs voient. Ainsi, vous pouvez utiliseraddAttributesredéfinir les valeurs de sourceAttributes, ajouter de nouveaux attributs ou supprimer des attributs.
    * Voir [ ** &lt;addAttributes&gt; **Renseignements] (#Addattributs) qui s'applique à l'échelle mondiale et variable** &lt;addAttributes&gt; ** .
    *   ERDDAP™recherche et utilise beaucoup de ces attributs de différentes façons. Par exemple, les valeurs colorBar sont nécessaires pour rendre une variable disponible viaWMS, afin que les cartes peuvent être faites avec des barres de couleurs cohérentes.
    *   [longitude, latitude, altitude (ou profondeur) , et variables temporelles](#destinationname)obtenir automatiquement beaucoup de métadonnées appropriées (par exemple,[unités](#units)) .
    * Un échantillon&lt;addAttributes&gt; pour une variable de données:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

L'attribut nombre videOfObservations provoque l'attribut numéro sourceOfObservations (le cas échéant) à supprimer de la liste finale combinée des attributs.
    * Fournir cette information aideERDDAP™faire un meilleur travail et aider les utilisateurs à comprendre les ensembles de données.
De bonnes métadonnées rendent un ensemble de données utilisable.
L'insuffisance des métadonnées rend un ensemble de données inutile.
Veuillez prendre le temps de faire un bon travail avec les attributs de métadonnées.
    
###### Commentaires sur les attributs variables qui sont spéciaux dansERDDAP:

###### actual\\_range {#actual_range} 
*   [ **actual\\_range** ](#actual_range)est un attribut variable RECOMMANDÉ. Par exemple,

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Cet attribut est de[CDCCOARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)et[CF 1.7+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)les normes relatives aux métadonnées.
* Si présent, il DOIT être un tableau de deux valeurs du même type de données que le type de données de destination de la variable, en spécifiant la valeur réelle (pas le théorique ou le permis) valeurs minimales et maximales des données pour cette variable.
* Si les données sont remplies[scale\\_factoret/ouadd\\_offset](#scale_factor),actual\\_rangedoit avoir des valeurs déballées et être du même type de données que les valeurs déballées.
* Pour certaines sources de données (Par exemple, tout EDDTableFrom... Fichiers) ,ERDDAP™détermine leactual\\_rangede chaque variable et définitactual\\_rangeattribut. Autres sources de données (par exemple, bases de données relationnelles, Cassandra,DAPPER,Hyrax) , il pourrait être gênant ou pesant pour la source de calculer l'intervalle, doncERDDAP™ne le demande pas. Dans ce cas, il est préférable que vous puissiez définiractual\\_range  (en particulier pour les variables longitude, latitude, altitude, profondeur et temps) en ajoutantactual\\_rangeattribut à chaque variable [&lt;addAttributes&gt;] (#Addattributs) pour cet ensemble de donnéesdatasets.xml, par exemple,

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* Pour numérique[variables temps et timestamp](#time-units), les valeurs spécifiées doivent être la source pertinente (pas de destination) valeurs numériques. Par exemple, si les valeurs de temps de source sont stockées comme « jours depuis 1985-01-01 », alors laactual\\_rangeà préciser dans les «jours depuis 1985-01-01». Et si vous voulez faire référence à MAINTENANT comme deuxième valeur pour les données en temps quasi réel qui sont périodiquement mises à jour, vous devriez utiliser NaN . Par exemple, pour spécifier une plage de données de 1985-01-17 jusqu'à MAINTENANT, utiliser

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* Siactual\\_rangeest connu (soit parERDDAP™calcul ou par vous l'ajoutant via&lt;addAttributes&gt;),ERDDAP™l'affichera à l'utilisateur sur le formulaire d'accès aux données ( *datasetID* .html) et créer un graphique pages Web ( *datasetID* Graphique) pour cet ensemble de données et l'utiliser lors de la génération des métadonnées FGDC et ISO 19115. En outre, les 7 derniers jours du tempsactual\\_rangesont utilisés comme sous-ensemble de temps par défaut.
* Siactual\\_rangeest connu, les utilisateurs peuvent utiliser[min () et max () fonctions](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)dans les demandes, ce qui est souvent très utile.
* Pour tous les ensembles de données EDDTable...actual\\_rangeest connu (soit par vous le spécifiant soit parERDDAP™le calcul) ,ERDDAP™sera en mesure de rejeter rapidement toute demande de données en dehors de cette plage. Par exemple, si la valeur temporelle la plus basse de l'ensemble de données correspond à 1985-01-17, une demande de toutes les données de 1985-01-01 à 1985-01-16 sera immédiatement rejetée avec le message d'erreur « Votre requête n'a produit aucun résultat correspondant ». Cela rendactual\\_rangeun élément très important de métadonnées, car il peut enregistrerERDDAP™beaucoup d'effort et économiser beaucoup de temps à l'utilisateur. Et ceci souligne que leactual\\_rangeles valeurs ne doivent pas être plus étroites que la plage réelle des données; sinon,ERDDAP™peut à tort dire "Il n'y a pas de données de correspondance" alors qu'en fait il y a des données pertinentes.
* Lorsqu'un utilisateur sélectionne un sous-ensemble de données et demande un type de fichier qui inclut des métadonnées (par exemple,.nc) ,ERDDAP™modifieactual\\_rangedans le fichier de réponse pour refléter la plage du sous-ensemble.
* Voir aussi[data\\_minetdata\\_max](#data_min-and-data_max), qui sont une autre façon de spécifieractual\\_range. Cependant, ils sont obsolètes maintenant queactual\\_rangeest défini par CF 1.7+.
         
###### Attributs de la barre de couleurs{#color-bar-attributes} 
Il y a plusieurs attributs OPTIONNEL variable qui spécifient les attributs par défaut suggérés pour une barre de couleurs (utilisé pour convertir les valeurs de données en couleurs sur les images) pour cette variable.
* Si présent, cette information est utilisée comme information par défaut par griddap ettabledapchaque fois que vous demandez une image qui utilise une barre de couleurs.
* Par exemple, lorsque les données maillées latitude-longitude sont tracées comme une couverture sur une carte, la barre de couleurs spécifie comment les valeurs de données sont converties en couleurs.
* Avoir ces valeurs permetERDDAP™créer des images qui utilisent une barre de couleurs cohérente pour différentes requêtes, même lorsque les valeurs de temps ou d'autres dimensions varient.
* Ces noms d'attribut ont été créés pour être utilisés dansERDDAP. Elles ne proviennent pas d'une norme de métadonnées.
* Les attributs liés à la barre de couleurs sont:
    *    **colorBarMinimum** spécifie la valeur minimale sur la barre de couleurs. Par exemple,

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Si les données sont remplies[scale\\_factoret/ouadd\\_offset](#scale_factor), précisercolorBarMinimumcomme valeur déballée.
    * Valeurs de données inférieures àcolorBarMinimumsont représentés par la même couleur quecolorBarMinimumvaleurs.
    * L'attribut doit être :[Type "double"](#attributetype), quel que soit le type de variable de données.
    * La valeur est généralement un nombre rond agréable.
    * Meilleures pratiques: Nous recommandons une valeur légèrement supérieure à la valeur minimale des données.
    * Il n'y a aucune valeur par défaut.
*    **colorBarMaximum** spécifie la valeur maximale sur la barre de couleurs. Par exemple,

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Si les données sont remplies[scale\\_factoret/ouadd\\_offset](#scale_factor), précisercolorBarMinimumcomme valeur déballée.
    * Valeurs de données supérieures àcolorBarMaximumsont représentés par la même couleur quecolorBarMaximumvaleurs.
    * L'attribut doit être :[Type "double"](#attributetype), quel que soit le type de variable de données.
    * La valeur est généralement un nombre rond agréable.
    * Meilleures pratiques: Nous recommandons une valeur légèrement inférieure à la valeur maximale des données.
    * Il n'y a aucune valeur par défaut.
*    **couleur BarPalette** spécifie la palette pour la barre de couleurs. Par exemple,
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * TousERDDAP™les installations supportent ces palettes standard: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteRed, LightRainbow, Ocean, OceanDepth, Rainbow, RedWhiteBlue, ReverseRainbow, Topographie, TopographieDepth\\[ajouté dans v1.74\\], BlancNoir, BlancBlueNoir et BlancRedNoir.
    * Si vous avez installé[palettes supplémentaires](/docs/server-admin/additional-information#palettes), vous pouvez vous référer à l'un d'eux.
    * Si cet attribut n'est pas présent, la valeur par défaut est BlueWhiteRed si \\-1\\*colorBarMinimum=colorBarMaximum; sinon la valeur par défaut est Rainbow.
*    **colorBarScale** spécifie l'échelle pour la barre de couleur. Par exemple,
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * Les valeurs valides sont linéaires et log.
    * Si la valeur est Log,colorBarMinimumdoit être supérieur à 0.
    * Si cet attribut n'est pas présent, la valeur par défaut est Linear.
*    **couleur BarContinu** spécifie si la couleurBar a une palette continue de couleurs, ou si la couleurBar a quelques couleurs discrètes. Par exemple,
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Les valeurs valides sont les chaînes vraies et fausses.
    * Si cet attribut n'est pas présent, la valeur par défaut est vraie.
*    **colorBarNSections** spécifie le nombre par défaut de sections sur la barre de couleurs. Par exemple,
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * Les valeurs valides sont des entiers positifs.
    * Si cet attribut n'est pas présent, la valeur par défaut est \\-1, ce qui indiqueERDDAP™choisir le nombre de sections en fonction de la gamme de la barre de couleurs.
###### WMS {#wms} 
Les principales exigences pour qu'une variable soit accessible viaERDDAP'sWMSserveur sont :
* L'ensemble de données doit êtreEDDGrid... ensemble de données.
* La variable de données DOIT être une variable maillée.
* La variable de données DOIT avoir des variables de longitude et d'axe de latitude. (D'autres variables d'axe sont OPTIONNELLES.) 
* Il DOIT y avoir des valeurs de longitude entre -180 et 180.
* LescolorBarMinimumetcolorBarMaximumles attributs DOIVENT être spécifiés. (Les autres attributs de la barre de couleurs sont OPTIONNELS.) 

###### data\\_minetdata\\_max {#data_min-and-data_max} 
*   [ **data\\_min** et **data\\_max** ](#data_min-and-data_max)-- Il s'agit d'attributs variables obsolètes définis dans l'Expérience mondiale de circulation océanique (FEMME) Description des métadonnées. Par exemple,

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Nous vous recommandons d'utiliser[actual\\_range](#actual_range), au lieu dedata\\_minetdata\\_maxParce queactual\\_rangeest maintenant définie par la spécification CF.
    * Si elles sont présentes, elles doivent être du même type de données que le type de données de destination de la variable, et préciser la valeur réelle (pas le théorique ou le permis) valeurs minimales et maximales des données pour cette variable.
    * Si les données sont remplies[scale\\_factoret/ouadd\\_offset](#scale_factor),data\\_minetdata\\_maxLes valeurs doivent être déballées en utilisant le type de données déballées.
         
###### variabledrawLandMask {#variable-drawlandmask} 
*   [ **drawLandMask** ](#variable-drawlandmask)-- Il s'agit d'un attribut variable OPTIONNEL utilisé parERDDAP™  (et aucune norme de métadonnées) qui spécifie la valeur par défaut pour l'option "Draw Land Mask" sur le formulaire Make A Graph de l'ensemble de données ( *datasetID* Graphique) et pour le paramètre &.land dans une URL demandant une carte des données. Par exemple,
    ```
        <att name="drawLandMask">under</att>  
    ```
Voir[drawLandMaskAperçu général](#drawlandmask).
###### Encodage{#encoding} 
*   [ **_Encodage** ](#encoding)
    * Cet attribut ne peut être utilisé qu' avec les variables de chaîne .
    * Cet attribut est fortement recommandé.
    * Cet attribut est de[NetCDFGuide de l'utilisateur (NUCEAU) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html).
    * En interneERDDAP™, Strings sont une séquence de caractères 2-octets qui utilisent[Ensemble de caractères Unicode UCS-2](https://en.wikipedia.org/wiki/UTF-16).
    * De nombreux types de fichiers ne prennent en charge que les caractères 1-octet dans Strings et ont donc besoin de cet attribut pour identifier un associé
        [Charset (Page de code AKA) ](https://en.wikipedia.org/wiki/Code_page)qui définit comment mapper les 256 valeurs possibles à un ensemble de 256 caractères tirés du jeu de caractères UCS-2 et/ou du système d'encodage, par exemple,[UTF-8](https://en.wikipedia.org/wiki/UTF-8)  (qui nécessite entre 1 et 4 octets par caractère) .
    * Les valeurs pour \\_Encoding sont insensibles aux cas.
    * En théorie,ERDDAP™pourrait prendre en charge \\_Encoding identifiants à partir[cette liste IANA](https://www.iana.org/assignments/character-sets/character-sets.xhtml), mais en pratique,ERDDAP™actuellement juste soutient
        * ISO-8859-1 (notent qu'il a des tirets, pas souligne) , qui a l'avantage qu'il est identique aux 256 premiers caractères d'Unicode, et
        * UTF-8.
    * Lors de la lecture des fichiers sources, la valeur par défaut est ISO-8859-1, sauf pour les fichiers netcdf-4, où la valeur par défaut est UTF-8.
    * Il s'agit d'un problème permanent, car de nombreux fichiers sources utilisent des charsets ou des encodages différents d'ISO-8859-1, mais n'identifient pas le charset ou l'encodage. Par exemple, de nombreux fichiers de données sources ont certaines métadonnées copiées et collées à partir de Microsoft Word sur Windows et ont donc des tirets fantaisies et apostrophes à partir d'un charset spécifique à Windows au lieu des tirets et apostrophes ASCII. Ces personnages apparaissent alors en caractères impairs ou '?' dansERDDAP.
         
###### fichierAccessBaseUrl{#fileaccessbaseurl} 
*    **[fichierAccessBaseUrl](#fileaccessbaseurl)et fichierAccessSuffix** sont très rarement utilisés attributs qui ne sont pas d'un standard. Si une colonne EDDTable a des noms de fichiers Web accessibles (Par exemple, images, vidéos ou fichiers audio) , vous pouvez ajouter
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
pour spécifier l'URL de base (se terminant par /) nécessaire pour transformer les noms de fichiers en URLs complètes. Dans des cas inhabituels, comme lorsqu'une colonne a des références à des fichiers .png mais que les valeurs manquent de ".png", vous pouvez ajouter
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(par exemple,&lt;att name="fileAccessSuffix"&gt;.png&lt;/a&gt;)
pour spécifier un suffixe à ajouter pour faire les noms de fichiers dans des URL complètes. Alors pour.htmlTableréponses,ERDDAP™affichera le nom du fichier comme un lien vers l'URL complète (la base Url plus le nom du fichier plus le suffixe) .

Si tu veuxERDDAP™pour servir les fichiers connexes, faire un[EDDTableFromFileNames](#eddtablefromfilenames)dataset pour ces fichiers (il peut s'agir d'un ensemble de données privé) .
    
###### fichierAccessArchive Autres{#fileaccessarchiveurl} 
*   [ **fichierAccessArchive Autres** ](#fileaccessarchiveurl)est un attribut très rarement utilisé qui n'est d'aucune norme. Si une colonne EDDTable a des noms de fichiers Web accessibles (Par exemple, images, vidéos ou fichiers audio) qui sont accessibles via une archive (Par exemple,.zipfichier) accessible via une URL, utiliser&lt;att name="fileAccessArchiveUrl"&gt; *L'URL* &lt;/att&gt; pour spécifier l'URL de l'archive.
    
Si tu veuxERDDAP™pour servir le fichier d'archive, faire un[EDDTableFromFileNames](#eddtablefromfilenames)jeu de données pour ce fichier (il peut s'agir d'un ensemble de données privé) .
    
###### ioos\\_category {#ioos_category} 
*   [ **ioos\\_category** ](#ioos_category)-- C'est un attribut variable REQUIS si&lt;variablesMustHaveIoosCategory&gt; est défini à true (par défaut) en[configuration.xml](/docs/server-admin/deploy-install#setupxml); sinon, c'est OPTIONNEL.
Par exemple,&lt;Nom de l'entrepriseioos\\_category"&gt;Salinité&lt;/att&gt;
Les catégories[NOAASystème intégré d'observation des océans (IOOS) ](https://ioos.noaa.gov/).
    
    *    (À partir de la rédaction de cette) Nous ne sommes pas au courant des définitions officielles de ces noms.
    * Les noms principaux sont de Zdenka Willis' .ppt "Système intégré d'observation de l'océan (IOOS)  NOAAL'approche de la création d'une capacité opérationnelle initiale[Plan directeur de l'IOOS](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)  (page 1-5) .
    * Il est probable que cette liste sera révisée à l'avenir. Si vous avez des demandes, veuillez envoyer un courriel à Chris. John à noaa.gov.
    *   ERDDAP™prend en charge une plus grande liste de catégories que IOOS ne parce que Bob Simons a ajouté des noms supplémentaires (principalement basé sur les noms des domaines scientifiques, par exemple, Biologie, Écologie, Météorologie, Statistiques, Taxonomie) pour d'autres types de données.
    * Les valeurs actuelles valides dansERDDAP™sont bathymétrie, biologie, caractère bas, CO2, matière organique dissolue colorée, contaminants, courants, nutriments dissous, O2, écologie, abondance de poissons, espèces de poissons, flux thermique, hydrologie, distribution de glace, identifiant, emplacement, météorologie, couleur de l'océan, propriétés optiques, autres, pathogènes, espèces de phytoplancton, pression, productivité, qualité, salinité, niveau de mer, statistiques, débit de cours d'eau, ondes de surface, taxonomie, température, temps, matière en suspension totale, inconnue, vent, espèces de zooplancton, et abondance de zooplancton.
    * Il y a un chevauchement et une ambiguïté entre les différents termes -- faites de votre mieux.
    * Si vous ajoutezioos\\_categoryà la liste des&lt;categoryAttributes&gt; enERDDAP's[configuration.xml](/docs/server-admin/deploy-install#setupxml)fichier, les utilisateurs peuvent facilement trouver des ensembles de données avec des données similaires viaERDDAP's "Rechercher des ensembles de données par catégorie" sur la page d'accueil.
        [Essayez d'utiliserioos\\_categorypour rechercher des ensembles de données d'intérêt.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Il y avait[une discussion surERDDAP™etioos\\_categorydans leERDDAP™Groupe Google.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w)
    
Vous pourriez être tenté de mettre&lt;variablesMustHaveIoosCategory&gt; à false afin que cet attribut ne soit pas requis. ("Pfft &#33; Qu'est-ce que c'est pour moi ?") Quelques raisons de le laisser à vrai (par défaut) et utilisationioos\\_categorysont:
    
    * Si setup.xml est&lt;VariablesMustHaveIoosCatégorie&gt; est prêt à vrai,[Générer des ensembles de donnéesXml](#generatedatasetsxml)crée/suggère toujoursioos\\_categoryattribut pour chaque variable dans chaque nouvel ensemble de données. Alors pourquoi ne pas la laisser ?
    *   ERDDAP™permet aux utilisateurs de rechercher des ensembles de données d'intérêt par catégorie.ioos\\_categoryest une catégorie de recherche très utile parce que les ioos\\_catégories (par exemple, Température) sont assez larges. Cela rendioos\\_categorybeaucoup mieux à cette fin que, par exemple, les FC beaucoup plus finesstandard\\_names (qui ne sont pas si bons à cette fin en raison de tous les synonymes et de légères variations, par exemple, mer\\_surface\\_température versus température de la mer) .
(Utilisationioos\\_categoryà cette fin est contrôlée par&lt;categoryAttributes&gt; dans votre fichier setup.xml.)
        [Essayez d'utiliserioos\\_categorypour rechercher des ensembles de données d'intérêt.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Ces catégories[NOAASystème intégré d'observation des océans (IOOS) ](https://ioos.noaa.gov/). Ces catégories sont fondamentales pour la description de la mission de l'IOOS. Si vous êtes enNOAA, soutienioos\\_categoryest un bon Une...NOAACe qu'il faut faire. (Regarde ça.[UneNOAAvidéo](https://www.youtube.com/watch?v=nBnCsMYm2yQ)et soyez inspirés&#33;) Si vous êtes dans une autre agence américaine ou internationale, ou si vous travaillez avec des agences gouvernementales, ou si vous travaillez avec d'autres Ocean Observing System, n'est-ce pas une bonne idée de coopérer avec le bureau américain de l'IOOS?
    * Tôt ou tard, vous pouvez en vouloir d'autresERDDAP™pour établir un lien vers vos ensembles de données via[EDDGridDeErddap](#eddfromerddap)et[EDDTableDeErddap](#eddfromerddap). Si l'autreERDDAP™nécessiteioos\\_category, vos ensembles de données doivent avoirioos\\_categorypourEDDGridDeErddap et EDDTableDeErddap au travail.
    * Il est psychologiquement beaucoup plus facile d'inclureioos\\_categorylorsque vous créez l'ensemble de données (C'est juste une autre chose queERDDAP™demande d'ajouter l'ensemble de données àERDDAP) , que de l'ajouter après (si vous avez décidé de l'utiliser à l'avenir) .
         
###### long\\_name {#long_name} 
*   [ **long\\_name** ](#long_name)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)et[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Normes relatives aux métadonnées) est un attribut variable RECOMMANDÉ dansERDDAP. Par exemple,
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *   ERDDAP™utilise leslong\\_namepour l'étiquetage des axes sur les graphiques.
    * Meilleures pratiques: Capitaliser les motslong\\_namecomme si c'était un titre (capitaliser le premier mot et tous les mots non-article) . N'incluez pas les unitéslong\\_name. Le long nom ne devrait pas être très long (habituellement&lt;20 caractères), mais devrait être plus descriptif que le[destinationName](#destinationname), qui est souvent très concis.
    * Si "long\\_name" n'est pas défini dans la variable[SourceAttributs](#variable-addattributes)ou&lt;addAttributes&gt;,ERDDAP™va le générer en nettoyant le[standard\\_name](#standard_name)  (si présent) ou lesdestinationName.
         
###### missing\\_value {#missing_value} 
*   [ **missing\\_value** ](#missing_value)et **_Remplir Valeur**   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)et[FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) sont des attributs variables qui décrivent un nombre (par exemple, -9999) qui est utilisé pour représenter une valeur manquante. Par exemple,

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

Pour les variables String, la valeur par défaut pour les deux est "" (la chaîne vide) .
Pour les variables numériques, la valeur par défaut pour les deux est NaN.
*   ERDDAP™soutient les deuxmissing\\_valueet \\_FillValue, puisque certaines sources de données leur attribuent des significations légèrement différentes.
* Si elles sont présentes, elles doivent être du même type de données que la variable.
* Si les données sont remplies[scale\\_factoret/ouadd\\_offset](#scale_factor), lesmissing\\_valueet les valeurs \\_FillValue doivent également être emballées. De même, pour une colonne avec des valeurs de date/heure de chaîne qui utilisent un local[time\\_zone](#time_zone), lesmissing\\_valueet \\_FillValue doit utiliser le fuseau horaire local.
* Si une variable utilise ces valeurs spéciales,missing\\_valueet/ou les attributs \\_FillValue sont REQUIS.
* Pour[variables temps et timestamp](#time-units)  (si la source est une chaîne ou numérique) ,missing\\_values et \\_FillValues apparaissent comme "" (la chaîne vide) quand le temps est écrit comme une chaîne et comme NaN quand le temps est écrit comme un double. Les valeurs sources pourmissing\\_valueet \\_FillValue n'apparaîtra pas dans les métadonnées de la variable.
* Pour les variables de chaîne,ERDDAP™convertit toujours n'importe quelmissing\\_values ou \\_FillValue valeurs de données dans "" (la chaîne vide) . Les valeurs de source pourmissing\\_valueet \\_FillValue n'apparaîtra pas dans les métadonnées de la variable.
* Pour les variables numériques :
Lesmissing\\_valueet \\_FillValue apparaîtra dans les métadonnées de la variable.
Pour certains formats de données de sortie,ERDDAP™vous verrez par exemple -9999.
Pour les autres formats de données de sortie (notamment les formats texte comme .csv et.htmlTable) ,ERDDAP™remplacera ces numéros spéciaux par NaN ou "".
* Certains types de données ont des marqueurs de valeurs manquantes qui n'ont pas besoin d'être explicitement identifiés avecmissing\\_valueou \\_FillValue attributs: flotteurs et doubles variables ont NaN (Pas un nombre) , Les valeurs de chaîne utilisent la chaîne vide, et les valeurs de char ont un caractère\\uffff  (caractère #65535, qui est la valeur d'Unicode pour Pas un caractère) . Les types de données entiers n'ont pas de marqueurs de valeur manquants.
* Si une variable entière a une valeur manquante (par exemple, une position vide dans un fichier .csv) ,ERDDAP™interprétera la valeur comme définiemissing\\_valueou \\_FillValue pour cette variable. Si aucun n'est défini,ERDDAP™interprétera la valeur comme la valeur manquante par défaut pour ce type de données, qui est toujours la valeur maximale qui peut être détenue par ce type de données:
127 pour les variables octets, 32767 pour les variables courtes, 2147483647 pour les variables int, 92233720366854775807 pour longtemps,
255 pour ubyte, 65535 pour ushort, 4294967295 pour uint, et 18446744073709551615 pour ulong.
###### ADD \\_FillValue ATTRIBUTES?{#add-_fillvalue-attributes} 
*   [ADD \\_FillValue ATTRIBUTES?](#add-_fillvalue-attributes)  
Chaque foisERDDAP™charge un ensemble de données, il vérifie si les variables avec des types de données source entier ont unmissing\\_valueou \\_FillValue attribut. Si une variable ne le fait pas, alorsERDDAP™imprime un message dans le fichier journal (commençant par "Ajouter \\_FillValue Attribut?") recommandant queERDDAP™administrateur ajouter un \\_Fill attribut de valeur pour cette variable dansdatasets.xml. Il est très utile pour chaque variable d'avoir une \\_FillValue oumissing\\_valueparce que les valeurs manquantes sont toujours possibles, par exemple, si un fichier donné dans un ensemble de données n'a pas de variable donnée,ERDDAP™doit pouvoir présenter cette variable comme ayant toutes les valeurs manquantes pour cette variable. Si vous décidez qu'une variable ne doit pas avoir d'attribut \\_FillValue, vous pouvez ajouter
    &lt;Noms des att.&lt;/att&gt; à la place, qui supprimera le message pour celadatasetID+ combinaison variable à l'avenir.
    
Chaque foisERDDAP™commence, il recueille toutes ces recommandations dans un message qui est écrit au fichier journal (commençant par "ADD \\_FillValue ATTRIBUTES?") , envoyé auERDDAP™et écrit à un fichier de données CSV\\[BigParent Directory\\]répertoire /logs/. Si vous le souhaitez, vous pouvez utiliser le programme GenerateDatasetsXml (et l'option AddFillValueAttributes) pour appliquer toutes les suggestions dans le fichier CSV audatasets.xmlfichier. Pour l'un desdatasetID/combinaisons variables dans ce fichier, si vous décidez qu'il n'y a pas besoin d'ajouter l'attribut attribué, vous pouvez changer l'attribut en&lt;Noms des att.&lt;/att&gt; supprimer la recommandation pour celadatasetID+ combinaison variable à l'avenir.
    
C'est important &#33;
Comme Bob l'a souvent dit : ce serait mal (et embarrassant) si certaines des preuves du réchauffement climatique ont été causées par des valeurs manquantes non identifiées dans les données (Par exemple, des températures de 99 ou 127 degrés\\_ C qui aurait dû être marqué comme des valeurs manquantes et donc biaiser les statistiques moyennes et/ou médianes plus élevées) .

* La valeur \\_Fill etmissing\\_valueles valeurs d'une variable donnée dans différents fichiers sources doivent être cohérentes; sinon,ERDDAP™acceptera les fichiers avec un ensemble de valeurs et rejettera tous les autres fichiers comme "Bad Files". Pour résoudre le problème,
    * Si les fichiers sont maillés.ncfichiers, vous pouvez utiliser[EDDGridDeNcFilesNon emballé](#eddgridfromncfilesunpacked).
    * Si les fichiers sont des fichiers de données tabulaires, vous pouvez utiliser EDDTableFrom...Files '[uniformiser Quoi ?](#standardizewhat)à direERDDAPpour standardiser les fichiers sources tels qu'ils sont lus dansERDDAP.
    * Pour des problèmes plus difficiles, vous pouvez utiliser[NcML](#ncml-files)ou[NCO](#netcdf-operators-nco)pour résoudre le problème.
             
###### scale\\_factor {#scale_factor} 
*   [ **scale\\_factor** ](#scale_factor)  (par défaut = 1) et **add\\_offset**   (par défaut = 0)   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)et[FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) sont des attributs variables OPTIONNELs qui décrivent des données qui sont emballées dans un type de données plus simple via une simple transformation.
    * Si elles sont présentes, leur type de données diffère du type de données source et décrit le type de données des valeurs de destination.
Par exemple, une source de données peut avoir stocké des valeurs de données flottantes avec un chiffre décimal empaqueté sous forme d'int (Int16) , en utilisantscale\\_factor= 0,1 etadd\\_offset= 0. Par exemple,

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

Dans cet exemple,ERDDAP™décompresserait les données et les présenterait à l'utilisateur en tant que valeurs de données flottantes.
    * S'il y a lieu,ERDDAP™extrairea les valeurs de ces attributs, supprimera les attributs et décompressera automatiquement les données pour l'utilisateur:
destination Valeur = source Valeur \\*scale\\_factor+add\\_offset  
Ou, a déclaré une autre façon:
non emballéValue = emballé Valeur \\*scale\\_factor+add\\_offset
    * Lesscale\\_factoretadd\\_offsetles valeurs d'une variable donnée dans différents fichiers sources doivent être cohérentes; sinon,ERDDAP™acceptera les fichiers avec un ensemble de valeurs et rejettera tous les autres fichiers comme "Bad Files". Pour résoudre le problème,
        * Si les fichiers sont maillés.ncfichiers, vous pouvez utiliser[EDDGridDeNcFilesNon emballé](#eddgridfromncfilesunpacked).
        * Si les fichiers sont des fichiers de données tabulaires, vous pouvez utiliser EDDTableFrom...Files '[uniformiser Quoi ?](#standardizewhat)à direERDDAPpour standardiser les fichiers sources tels qu'ils sont lus dansERDDAP.
        * Pour des problèmes plus difficiles, vous pouvez utiliser[NcML](#ncml-files)ou[NCO](#netcdf-operators-nco)pour résoudre le problème.
             
###### standard\\_name {#standard_name} 
*   [ **standard\\_name** ](#standard_name)  (des[FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Norme de métadonnées) est un attribut variable RECOMMANDÉ dansERDDAP. Les FC tiennent la liste des personnes autorisées[Noms standard des FC](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). Par exemple,
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Si vous ajoutezstandard\\_nameaux attributs des variables et ajouterstandard\\_nameà la liste des&lt;categoryAttributes&gt; enERDDAP's[configuration.xml](/docs/server-admin/deploy-install#setupxml)fichier, les utilisateurs peuvent facilement trouver des ensembles de données avec des données similaires viaERDDAP's "Rechercher des ensembles de données par catégorie" sur la page d'accueil.
    * Si vous spécifiez un CFstandard\\_namepour une variable, l'attribut unités de la variable n'a pas à être identique aux unités canoniques spécifiées pour le nom standard dans la table Nom standard des FC, mais les unités DOIVENT être convertibles aux unités canoniques. Par exemple, tous les CF liés à la températurestandard\\_names ont "K" (Kelvin) comme les Unités Canoniques. Donc une variable avec une température liéestandard\\_nameDOIT avoir des unités de K, degré\\_C, degré\\_F, ou une variante UDUnits de ces noms, car ils sont tous interconvertibles.
    * Meilleures pratiques: Une partie du pouvoir de[Vocabulaires contrôlés](https://en.wikipedia.org/wiki/Controlled_vocabulary)vient d'utiliser seulement les termes dans la liste. Nous recommandons donc de s'en tenir aux termes définis dans le vocabulaire contrôlé, et nous recommandons de ne pas composer un terme s'il n'y en a pas dans la liste. Si vous avez besoin de termes supplémentaires, voyez si le comité des normes les ajoutera au vocabulaire contrôlé.
    *   standard\\_namevaleurs sont les seules valeurs d'attribut CF qui sont sensibles à la casse. Ils sont toujours en minuscules. À partir deERDDAP™v1.82, GenerateDatasets convertira les lettres majuscules en lettres minuscules. Et quand un ensemble de données est chargé dansERDDAP, les lettres majuscules sont changées silencieusement en lettres minuscules.
         
###### time\\_precision {#time_precision} 
*   time\\_precisionest un attribut OPTIONNEL utilisé parERDDAP™  (et aucune norme de métadonnées) pour[variables temps et timestamp](#time-units), qui peuvent être dans des ensembles de données maillés ou des ensembles de données tabulaires, et dansaxisVariables oudataVariablePar. Par exemple,
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
    time\\_precisionprécise la précision à utiliser chaque fois queERDDAP™formate les valeurs de temps de cette variable comme des chaînes sur les pages Web, y compris.htmlTableréponses. Dans les formats de fichiers oùERDDAP™formats horaires comme chaînes (par exemple, .csv et.json) ,ERDDAP™n'utilise que lestime\\_precision- format spécifié s'il comprend des secondes fractionnées;ERDDAP™utilise le 1970-01-01T00:00:00 Format Z.
* Les valeurs valides sont 1970-01, 1970-01-01, 1970-01-01T00Z, 1970-01-01T00:00Z, 1970-01-01T00:00:00Z (par défaut) , 1970-01-01T00:00:00.0Z, 1970-01-01T00:00:00.00Z, 1970-01-01T00:00:00.000Z.\\[1970 n'est pas une option parce qu'il s'agit d'un seul nombre, doncERDDAP™ne peut pas savoir si c'est une chaîne de temps formatée (une année) ou si c'est un certain nombre de secondes depuis 1970-01-01T00:00:00Z.\\]
* Sitime\\_precisionn'est pas spécifié ou la valeur n'est pas assortie, la valeur par défaut sera utilisée.
* Ici, comme dans les autres parties deERDDAP™, tous les champs du temps formaté qui ne sont pas affichés sont supposés avoir la valeur minimale. Par exemple, 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z et 1985-07-01T00:00:00 Z sont tous considérés comme équivalents, mais avec différents niveaux de précision implicites. Cela correspond à la[ISO 8601:2004"extended"Spécification du format de temps](https://www.iso.org/iso/date_and_time_format).
*    **MISE EN GARDE:** Vous devriez seulement utiliser untime\\_precisionsi **Tous** des valeurs de données pour la variable ont seulement la valeur minimale pour tous les champs qui sont cachés.
    * Par exemple, vous pouvez utilisertime\\_precisionde 1970-01-01 si toutes les valeurs de données ont une heure=0, une minute=0 et une seconde=0 (par exemple 2005-03-04T00:00:00Z et 2005-03-05T00:00:00Z) .
    * Par exemple, n'utilisez pas detime\\_precisionde 1970-01-01 s'il y a des valeurs non 0 heure, minute ou secondes, (par exemple 2005-03-05T12:00:00Z) parce que la valeur de l'heure non par défaut ne serait pas affichée. Sinon, si un utilisateur demande toutes les données avec le temps=2005-03-05, la demande échouera de façon inattendue.
             
###### time\\_zone {#time_zone} 
*   [ **time\\_zone** ](#time_zone)
    *   time\\_zoneest un attribut OPTIONNEL utilisé parERDDAP™  (et aucune norme de métadonnées) pour[variables temps et timestamp](#time-units), qui peuvent être dans des ensembles de données maillées ou des ensembles de données tabulaires.
    * La valeur par défaut est "Zulu" (qui est la version moderne du fuseau horaire de GMT) .
    * Informations générales: "compensations de temps" (Par exemple, heure normale du Pacifique, -08:00, GMT-8) sont fixes, spécifiques, offsets par rapport àZulu  (GMT) . En revanche, les «zones horaires» sont les choses beaucoup plus complexes qui sont affectées par l'économie de jour (Par exemple, "États-Unis/Pacifique") , qui ont eu des règles différentes à différents endroits à différents moments. Les fuseaux horaires ont toujours des noms car ils ne peuvent pas être résumés par une simple valeur offset (voir la colonne "Noms de base de données TZ" dans le tableau à[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .ERDDAP'stime\\_zoneattribut vous aide à gérer les données de temps local à partir d'un fuseau horaire (Par exemple, 1987-03-25T17:32:05 Pacifique Heure) . Si vous avez une chaîne de caractères ou des données numériques (fixe) décalage horaire, vous devez simplement ajuster les données àZulu  (qui est ceERDDAP™veut) en spécifiant un temps de base différent dans l'attribut units (Par exemple, «heures depuis 1970-01-01T08:00:00Z», notez le T08 pour préciser le décalage horaire) , et toujours vérifier les résultats pour vous assurer d'obtenir les résultats que vous voulez.
    * Pour les variables timestamp avec les données sources de Strings, cet attribut vous permet de spécifier un fuseau horaire qui mèneERDDAP™pour convertir les heures de source de la zone locale (certains dans l'heure standard, certains dans l'heure avancée) dansZuluheures (qui sont toujours en temps standard) . La liste des noms de fuseaux horaires valides est probablement identique à la liste dans la colonne TZ à[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Les fuseaux horaires communs aux États-Unis sont les suivants : États-Unis/Hawaii, États-Unis/Alaska, États-Unis/Pacifique, États-Unis/Montagne, États-Unis/ARIZONA, États-Unis/Centre, États-Unis/Est.
    * Pour les variables timestamp avec des données source numériques, vous pouvez spécifier le "time\\_zone" attribut, mais la valeur doit être "Zulu"ou "UTC". Si vous avez besoin d'aide pour d'autres fuseaux horaires, veuillez envoyer un courriel à Chris. John à noaa.gov .
         
###### unités{#units} 
*   [ **unités** ](#units)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)et[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Norme de métadonnées) définit les unités des valeurs de données. Par exemple,
    ```
        <att name="units">degree\\_C</att>
    ```
    * "unités" est REQUIS comme sourceAttribute ou addAttribute pour"time"et est vivement recommandé pour d'autres variables, le cas échéant (qui est presque toujours) .
    * En général, nous recommandons[UDUnites](https://www.unidata.ucar.edu/software/udunits/)\\-unités compatibles qui est exigé par le[COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)et[FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)normes.
    * Une autre norme commune est[UCUM](https://unitsofmeasure.org/ucum.html)-- le code unifié des unités de mesure.[OGC](https://www.ogc.org/)services tels que[SOS](https://www.ogc.org/standards/sos),[WCS](https://www.ogc.org/standards/wcs)et[WMS](https://www.ogc.org/standards/wms)exiger UCUM et souvent se référer à UCUM comme UOM (Unités de mesure) .
    * Nous vous recommandons d'utiliser un standard pour tous les ensembles de donnéesERDDAP. Tu devrais le direERDDAP™avec quel standard vous utilisez&lt;unités\\_standard&gt;, dans votre[configuration.xml](/docs/server-admin/deploy-install#setupxml)fichier.
    * Les unités d'une variable donnée dans différents fichiers sources doivent être cohérentes. Si vous avez une collection de fichiers de données où un sous-ensemble de fichiers utilise des valeurs d'unités différentes d'un ou plusieurs autres sous-ensembles des fichiers (par exemple,
« jours depuis 1985-01-01 » par opposition à « jours depuis 2000-2001-01 »,
"degree\\_Celsius" versus "deg\\_C", ou
"nœuds" versus "m/s") vous devez trouver un moyen de normaliser les valeurs des unités, sinon,ERDDAP™charge seulement un sous-ensemble des fichiers. Pensez-y : si un fichier a windSpeed units=knots et un autre a windSpeed units=m/s, alors les valeurs des deux fichiers ne devraient pas être incluses dans le même ensemble de données agrégées.
        * Si les fichiers sont maillés.ncfichiers, dans de nombreuses situations vous pouvez utiliser[EDDGridDeNcFilesNon emballé](#eddgridfromncfilesunpacked).
        * Si les fichiers sont des fichiers de données tabulaires, dans de nombreuses situations vous pouvez utiliser EDDTableFrom...Files '[uniformiser Quoi ?](#standardizewhat)à direERDDAPpour standardiser les fichiers sources tels qu'ils sont lus dansERDDAP.
        * Pour des problèmes plus difficiles, vous pouvez utiliser[NcML](#ncml-files)ou[NCO](#netcdf-operators-nco)pour résoudre le problème.
    * La section 8.1 de la norme des FC indique que si les données d'une variable sont emballées par[scale\\_factoret/ouadd\\_offset](#scale_factor), "Les unités d'une variable devraient être représentatives des données non emballées."
    *   [Pour les variables temps et timestamp,](#time-units)soit la variable[SourceAttributs](#variable-addattributes)ou&lt;addAttributes&gt; (qui a priorité) DOIT avoir[unités](#units)qui est soit
        
        * Pour les variables de l'axe temporel ou les variables de données temporelles avec des données numériques:[UDUnites](https://www.unidata.ucar.edu/software/udunits/)Chaîne compatible \\ (avec le format *unités* depuis *temps de base* ) décrivant comment interpréter les valeurs du temps de source (par exemple, secondes depuis 1970-01-01T00:00:00Z) .
            
         *unités* peut être n'importe lequel de:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
Techniquement,ERDDAP™ne suit PAS laUDUNITSstandard lors de la conversion"years since"et"months since"valeurs temporelles à"seconds since". LesUDUNITSstandard définit une année comme une valeur fixe unique: 3.155692597e7 secondes. EtUDUNITSdéfinit un mois comme année/12. Malheureusement, la plupart des ensembles de données que nous avons vu utiliser"years since"ou"months since"clairement vouloir que les valeurs soient des années civiles ou des mois civils. Par exemple, 3"months since 1970-01-01"est habituellement destiné à signifier 1970-04-01. Alors,ERDDAP™interprète"years since"et"months since"comme années et mois civils, et ne suit pas strictement lesUDUNITSstandard.
            
Les *temps de base* doit être une norme ISO 8601:2004 (E) chaîne de date formatée (yyyy-MM-dd'T'HH:mm:ssZ, par exemple, 1970-01-01T00:00:00Z) , ou une certaine variation de cela (par exemple, les parties manquantes à la fin) .ERDDAP™tente de travailler avec un large éventail de variations de ce format idéal, par exemple, "1970-1-1 0:0:0" est supporté. Si l'information du fuseau horaire est manquante, on suppose qu'elle estZulufuseau horaire (AKA GMT) . Même si un autre décalage horaire est spécifié,ERDDAP™Il n'utilise jamais Daylight Saving Time. Si le baseTime utilise un autre format, vous devez utiliser&lt;addAttributes&gt; pour spécifier une nouvelle chaîne d'unités qui utilise une variation de la norme ISO 8601:2004 (E) format (p. ex., changement de jours depuis le 1er janvier 1985 en jours depuis 1985-01-01).
        
Vous pouvez testerERDDAPla capacité de traiter avec *unités* depuis *temps de base* avecERDDAP's[Convertisseur de temps](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html). J'espère que vous pouvez brancher un numéro (la première valeur de la source de données?) et une chaîne d'unités, cliquez sur Convertir, etERDDAP™sera en mesure de le convertir en ISO 8601:2004 (E) chaîne de date formatée. Le convertisseur retournera un message d'erreur si la chaîne d'unités n'est pas reconnaissable.

###### Unités de temps de chaîne{#string-time-units} 
*   [Pour l'attribut unités pour les variables de données temps ou timestamp avec les données String,](#string-time-units)vous devez spécifier[java.time.DateTimeFormat](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)modèle (qui est principalement compatible avec java.text. SimpleDateFormat) qui décrit comment interpréter les temps de chaîne.
    
Pour les formats de temps couramment utilisés qui sont des variations de la norme ISO 8601:2004 (E) format standard (par exemple, 2018-01-02T00:00:00Z) , vous pouvez spécifieryyyy-MM-dd'T'HH:mm:ssZ, par exemple, utiliseryyyy-MM-ddsi l'heure de chaîne n'a qu'une date. Pour tout format commençant par yyyy-M,ERDDAPutilise un analyseur spécial qui est très pardonnant des variations mineures dans le format. L'analyseur peut gérer les fuseaux horaires dans les formats 'Z', "UTC", "GMT", ±XX:XX, ±XXXX et ±XX. Si une partie de l'heure de la date n'est pas spécifiée (par exemple, minutes et secondes) ,ERDDAP™suppose la valeur la plus basse pour ce champ (Par exemple, si les secondes ne sont pas spécifiées, seconds=0 est supposé) .
    
Pour tous les autres formats de temps de chaîne, vous devez spécifier avec précision une chaîne de temps compatible DateTimeFormatter. Commeyyyy-MM-dd'T'HH:mm:ssZ, ces chaînes de format sont construites à partir de caractères qui identifient un type spécifique d'informations de la chaîne de temps, par exemple, m signifie minute d'heure. Si vous répétez le caractère de format un certain nombre de fois, il précise encore la signification, par exemple, m signifie que la valeur peut être spécifiée par n'importe quel nombre de chiffres, mm signifie que la valeur doit être spécifiée par 2 chiffres. LesJavala documentation pour DateTimeFormatter est un aperçu brut et ne rend pas ces détails clairs. Voici donc une liste des variations de caractères de format et leur signification dansERDDAP™  (qui est parfois légèrement différent deJavaDateHeure de la matière) :
    
    |Caractères|Exemples|Signification|
    |---|---|---|
    |Oui|Le présent règlement entre en vigueur le vingtième jour suivant celui de sa publication au Journal officiel de l'Union européenne.|un numéro d'année, n'importe quel nombre de chiffres.ERDDAP™gâteries y (Année) et Y (semaine-année, parce que souvent est utilisé à tort au lieu de y) comme u, le[numéro d'année astronomique](https://en.wikipedia.org/wiki/Astronomical_year_numbering). Les années astronomiques sont des entiers positifs ou négatifs qui n'utilisent pas le BCE (Colombie-Britannique) ou CE (AD) d'époque: 2018=2018CE, ..., 2=2CE, 1=1CE, 0=1BCE, -1=2BCE, -2=3BCE, ...|
    |Tu sais, oui, AAAA|Le présent règlement entre en vigueur le jour suivant celui de sa publication au Journal officiel de l'Union européenne.|un numéro d'année astronomique à 4 chiffres (ignorer tout précédent "-")  |
    |M|1, 01, 12|un nombre de mois, n'importe quel nombre de chiffres (1=janvier)  |
    |MM|Le présent règlement entre en vigueur le jour suivant celui de sa publication au Journal officiel de l'Union européenne.|2 chiffres (zéro rembourré) numéro du mois|
    |MMM|Jan, Jan, JAN|un nom de mois anglais de 3 lettres, insensible au cas|
    |MMMM|Jan, Jan, JAN, Janvier, Janvier, JANVIER|3 lettres ou nom complet du mois en anglais, insensible à la casse|
    |d|1, 01, 31|un numéro du jour du mois, tout nombre de chiffres|
    |dd|01, 31|2 chiffres (zéro rembourré) Jour de mois. Le premier chiffre peut être un espace.|
    |D|1 001, 366|jour de l'année, nombre de chiffres, 001=Jan 1|
    |DDD|001, 366|jour de l'année, 3 chiffres, 001=1 janvier|
    |EEE|Thu, THU, Thu|a 3 lettres jour de la semaine, valeur est ignorée lors de l'analyse|
    |EEE|jeudi jeudi jeudi jeudi jeudi jeudi jeudi jeudi jeudi jeudi jeudi jeudi|une 3 lettre ou jour de la semaine en anglais complet, insensible au cas, valeur est ignorée lors de l'analyse|
    |H|0, 00, 23|H heure de jour (0-23) , tout nombre de chiffres|
    |HH|Autres|HH heure de jour (Tél.) , 2 chiffres. Le premier chiffre peut être un espace.|
    |a|Je suis, AM, PM|AM ou PM, insensible à la casse|
    |h|12, 1, 01, 11|heure de l'heure (12, 1, 2, ... 11) , tout nombre de chiffres|
    |HH|12, 01, 11|heure de l'heure (12, 1, 2, ... 11) , 2 chiffres. Le premier chiffre peut être un espace.|
    |K|0, 1, 11|heure du matin (0, 1, ...11) , tout nombre de chiffres|
    |KK|Autres|heure du matin, 2 chiffres|
    |m|0, 00, 59|minute de l'heure, nombre de chiffres|
    |mm|Oui.|minute de l'heure, 2 chiffres|
    |s|0, 00, 59|seconde minute, nombre de chiffres|
    |ss|Oui.|deuxième minute, 2 chiffres|
    |S|0 000, 9, 999|fraction de seconde, comme si, après une décimale, un nombre quelconque de chiffres|
    |SS|0, 99|centièmes de seconde, 2 chiffres|
    |SSS|000, 999|milliers de seconde, 3 chiffres|
    |A|0, 0000, 86399999|milliseconde de jour, nombre de chiffres|
    |AAAAAAA|00000000, 86399999|milliseconde de jour, 8 chiffres|
    |N|0, 00000000000000, 8639999999999999|nanoseconde de jour, nombre de chiffres. EnERDDAP™C'est tronqué à NMillis.|
    |NNNNNNNNNNNNNNNNN|00000000000000, 86399999999999|nanoseconde de jour, 14 chiffres. EnERDDAP™C'est tronqué à NMillis.|
    |N|0, 00000000000, 59999999999|nanoseconde de seconde, nombre de chiffres. EnERDDAP™C'est tronqué à NMillis.|
    |Nnnnnnnnnnnnn|00000000000, 59999999999|nanoseconde de seconde, 11 chiffres. EnERDDAP™C'est tronqué à NMillis.|
    |XXX, ZZZ|Z, -08:00, +01:00|un fuseau horaire avec le format 'Z' ou ± (2 chiffres de décalage horaire) : (2 chiffres minutes offset) . Ceci traite *espace* comme + (non standard) . ZZZ supportant 'Z' est non standard mais traite d'une erreur d'utilisateur commune.|
    |XX, ZZ|Z -0800, +0100|un fuseau horaire avec le format 'Z' ou ± (2 chiffres de décalage horaire) : (2 chiffres minutes offset) . Ceci traite *espace* comme + (non standard) . ZZ supportant 'Z' n'est pas standard mais traite d'une erreur utilisateur commune.|
    |X, Z|Z, -08, +01|un fuseau horaire avec le format 'Z' ou ± (2 chiffres de décalage horaire) : (2 chiffres minutes offset) . Ceci traite *espace* comme + (non standard) . Z supportant 'Z' est non-standard mais traite d'une erreur utilisateur commune.|
    |xxx|\\-08:00, +01:00|un fuseau horaire avec le format ± (2 chiffres de décalage horaire) : (2 chiffres minutes offset) . Ceci traite *espace* comme + (non standard) .|
    |xx|\\-0800, +0100|un fuseau horaire avec le format ± (2 chiffres de décalage horaire)  (2 chiffres minutes offset) . Ceci traite *espace* comme + (non standard) .|
    |x|\\-08, +01|un fuseau horaire avec le format ± (2 chiffres de décalage horaire) . Ceci traite *espace* comme + (non standard) .|
    |'|"T", "Z", "GMT"|début et fin d'une série de caractères littéraux|
    |' ' (deux citations)  |' '|deux guillemets simples indiquent une guillemet simple littérale|
    | \\[\\] | \\[ \\] |début ("\\[") et fin ("\\]") d'une section facultative. Cette notation n'est supportée que pour les caractères littéraux et à la fin de la chaîne de format.|
    |Numéro, &#123; &#125;|Numéro, &#123; &#125;|réservé à une utilisation future|
    |L,L,Q,e,c,V,z,O,p|     |Ces caractères de formatage sont supportés parJavaDateTimeFormatter, mais actuellement pas supporté parERDDAP. Si vous avez besoin de soutien pour eux, envoyez un courriel à Chris. John à noaa.gov .|
    
Remarques:
    
    * Dans un délai de date avec ponctuation, les valeurs numériques peuvent avoir un nombre variable de chiffres (Par exemple, dans le format de date oblique américain "1/2/1985", le mois et la date peuvent être de 1 ou 2 chiffres) Ainsi, le format doit utiliser des jetons de 1 lettre, par exemple M/d/aaaa, qui acceptent tout nombre de chiffres pour le mois et la date.
    * Si le nombre de chiffres pour un article est constant, p.ex. 01/02/2085, indiquez le nombre de chiffres dans le format, p.ex. MM/jj/aaaa pour le mois à deux chiffres, la date à deux chiffres et l'année à quatre chiffres.
    * Ces formats sont difficiles à utiliser. Un format donné peut fonctionner pour la plupart des chaînes de temps, mais pas toutes, pour une variable donnée. Vérifiez toujours que le format que vous spécifiez fonctionne comme prévu dansERDDAPpour toutes les chaînes de temps d'une variable.
    * Dans la mesure du possible, GenerateDatasetXml proposera des chaînes de format de temps.
    * Si vous avez besoin d'aide pour générer une chaîne de format, veuillez envoyer un courriel à Chris. John à noaa.gov .

La variable de temps principale (pour les ensembles de données tabulaires) et la variable de l'axe de temps principal (pour les ensembles de données maillés) sont reconnus par les[destinationName](#destinationname)Le temps. Leurs métadonnées d'unités doivent être une chaîne d'unités compatibles UDUnits pour les valeurs numériques de temps, p.ex. « jours depuis 1970-01-01 » (pour les ensembles de données tabulaires ou maillés) ou[unités adaptées aux temps de cordes](#string-time-units), par exemple, "M/j/aaaa" (pour les ensembles de données tabulaires) .

Différentes unités de temps dans différents broyés.ncFichiers - Si vous avez une collection de grilles.ncfichiers où, pour la variable de temps, un sous-ensemble des fichiers utilise différentes unités de temps qu'un ou plusieurs autres sous-ensembles des fichiers, vous pouvez utiliser[EDDGridDeNcFilesNon emballé](#eddgridfromncfilesunpacked). Il convertit les valeurs de temps en"seconds since 1970-01-01T00:00:00Z"à un niveau inférieur, cachant ainsi les différences, de sorte que vous pouvez faire un ensemble de données de la collecte de fichiers hétérogènes.

###### Variables temps-temps{#timestamp-variables} 
[Variables temps-temps](#timestamp-variables)-- Toute autre variable (axisVariableoudataVariable, dans unEDDGridou ensemble de données EDDTable) peut être une variable timeStamp. Les variables temporelles sont des variables qui ont des unités temporelles et des données temporelles, mais qui ont une&lt;destinationName&gt; autres que le temps. Les variables TimeStamp se comportent comme la variable temps principale en ce qu'elles convertissent le format temps de la source en"seconds since 1970-01-01T00:00:00Z"et/ou ISO 8601:2004 (E) la présentation).ERDDAP™reconnaît le temps Variables de timbres par rapport à leur temps &gt; &gt;[unités](#units)" métadonnées, qui doivent correspondre à cette expression régulière "\\[a-zA-Z\\]+ depuis +\\[0-9\\]+" (pour la date numérique Les temps, par exemple,"seconds since 1970-01-01T00:00:00Z") ou être une date Chaîne de format de temps contenant "uuuuu", "yyyy" ou "YYYY" (par exemple, "yyyy-MM-dd"T'HH:mm:ssZ") . Mais s'il vous plaît utilisez toujours ledestinationName "time"pour la date principale Variable dans le temps.

 **Vérifiez toujours votre travail pour vous assurer que les données temporelles qui apparaissent dansERDDAP™est la bonne donnée temporelle.** Travailler avec les données temporelles est toujours difficile et sujet aux erreurs.

Voir[plus d'informations sur les variables temporelles](#destinationname).
ERDDAP™a une utilité pour[Convertir un numérique Temps de départ/vers une chaîne](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
Voir[CommentERDDAP™Traitement du temps](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
        
###### valid\\_range {#valid_range} 
*   [ **valid\\_range** ou **valid\\_min** et **valid\\_max** ](#valid_range)-- Il s'agit d'attributs variables OPTIONNELs définis dans la[FC](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)les conventions relatives aux métadonnées. Par exemple,

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

ou

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Si elles sont présentes, elles doivent être du même type de données que la variable et préciser les valeurs minimales et maximales valides des données pour cette variable. Les utilisateurs devraient considérer que les valeurs hors de cette plage sont invalides.
    *   ERDDAP™ne s'applique pasvalid\\_range. D'une autre façon :ERDDAP™ne convertit pas les valeurs de données en dehors de lavalid\\_rangevers le \\_Fill Valeur oumissing\\_value.ERDDAP™transmet simplement ces métadonnées et vous laisse l'application.
Pourquoi ? C'est à ça que servent ces métadonnées. Si le fournisseur de données l'avait voulu, le fournisseur de données aurait pu convertir les valeurs de données en dehors duvalid\\_rangeêtre \\_FillValues.ERDDAP™ne doute pas du fournisseur de données. Cette approche est plus sûre: s'il est démontré plus tard quevalid\\_rangeétait trop étroit ou autrement incorrect,ERDDAP™Les données ne seront pas effacées.
    * Si les données sont remplies[scale\\_factoret/ouadd\\_offset](#scale_factor),valid\\_range,valid\\_minetvalid\\_maxdoit être le type et les valeurs de données emballées. DepuisERDDAP™est applicablescale\\_factoretadd\\_offsetlorsqu'il charge l'ensemble de données,ERDDAP™décompressera levalid\\_range,valid\\_minetvalid\\_maxvaleurs afin que les métadonnées de destination (montré aux utilisateurs) indiquera le type et la plage de données non emballés.
Ou, si un déballé\\_valid\\_rangeattribut est présent, il sera rebaptisévalid\\_rangelorsqueERDDAP™charge l'ensemble de données.
##### &lt;supprimerMVRows&gt;{#removemvrows} 
* [ ** &lt;supprimerMVRows&gt; ** - Oui. (#supprimer) est une étiquette OPTIONNELLE dans une étiquette dansdatasets.xmlpour EDDTableFromFiles (y compris toutes les sous-classes) datasets, bien qu'il ne soit utilisé que pour EDDTableFromMultidimNcFiles. Il peut avoir une valeur de vrai ou faux. Par exemple, vrai
Cela supprime tout bloc de lignes à la fin d'un groupe où toutes les valeurs sontmissing\\_value, \\_FillValue, ou la CoHort ... (ou char=#32 pour CharArrays) . Ceci est pour le type de fichier DSG Multidimensionnel Array CF et les fichiers similaires. Si c'est vrai, cela fait le bon test et charge donc toujours toutes les variables max dim, donc cela peut prendre plus de temps.
La valeur par défaut est false.
Recommandation Si possible pour votre jeu de données, nous vous recommandons de définir supprimerMVRows à faux. Le réglage de removeMVRows à true peut ralentir considérablement les requêtes, mais peut être nécessaire pour certains ensembles de données.
