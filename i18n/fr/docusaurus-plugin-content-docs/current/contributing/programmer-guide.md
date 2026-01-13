---
sidebar_position: 2
---

# Guide du programmeur

Ce sont des choses que seul un programmeur qui a l'intention de travailler avec ERDDAP 's Java Les cours doivent savoir.

###  **Obtenir le code source**  {#getting-the-source-code} 
   

  - Code source via GitHub
Le code source des versions publiques récentes et des versions en cours de développement est également disponible via [GitHub](https://github.com/ERDDAP) . Veuillez lire la [Wiki](https://github.com/ERDDAP/erddap/wiki) pour ce projet. Si vous voulez modifier le code source (et éventuellement les modifications apportées à la norme ERDDAP™ distribution) , c'est l'approche recommandée.

###  ** ERDDAP™ dépendances**  {#erddap-dependencies} 
 ERDDAP™ utilise Maven pour charger les dépendances de code ainsi que certains fichiers de référence statiques (WEB-INF/ref) . Ceci est fait pour éviter de stocker de nombreux grands fichiers dans le dépôt.
Vous pouvez utiliser `mvn compiler` et qui va récupérer les dépendances et les fichiers réf. Vous pouvez également utiliser `colis` pour générer un fichier de guerre.
Vous pouvez télécharger manuellement les fichiers ref:

  -  [etopo1\\_ice\\_g\\_i2 .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip) et décompresser dans /WEB-INF/ref/ .

  -  [ref\\_files .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip) et décompresser dans /WEB-INF/ref/ .

  -  [Contenu .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip)   (version 1.0.0, 20333 octets, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, daté 2024-10-14) et décompresser dans _tomcat_, en créant _tomcat_/content/erddap .

REMARQUE: Par défaut Maven cache les téléchargements d'archive de données de référence statique et de test et ne les extrait que lorsqu'une nouvelle version est téléchargée. Pour ne pas télécharger entièrement, vous pouvez définir le `skipResourceTélécharger` et/ou `skipTestResourceTélécharger` propriétés à Maven (Par exemple `mvn -DskipResourcePaquet de téléchargement` ) . Pour forcer l'extraction, définissez `-Ddownload.unpack=true` et `-Ddownload.unpackWhenChanged=false` .

-  ERDDAP™ et ses sous-composantes ont très libéral, open-source [licences](/license) , ainsi vous pouvez utiliser et modifier le code source à n'importe quelle fin, à but lucratif ou sans but lucratif. Notez que ERDDAP™ et de nombreux sous-composants ont des licences qui exigent que vous reconnaissez la source du code que vous utilisez. Voir [Crédits](/credits) . Qu'il soit nécessaire ou non, il est juste bon de reconnaître tous ces contributeurs.
  

-  **Utiliser le Code pour les autres projets** 

Alors que vous êtes invités à utiliser des parties de ERDDAP™ code pour d'autres projets, être averti que le code peut et va changer. Nous ne promettons pas de soutenir d'autres utilisations de notre code. Git et GitHub seront vos principales solutions pour gérer cela -- Git vous permet de fusionner nos modifications dans vos modifications.
   **Pour de nombreuses situations où vous pourriez être tenté d'utiliser des parties de ERDDAP™ dans votre projet, nous pensons que vous trouverez beaucoup plus facile à installer et à utiliser ERDDAP™ ainsi que** puis écrire d'autres services qui utilisent ERDDAP Les services. Vous pouvez installer votre propre ERDDAP™ installation grossièrement dans une heure ou deux. Vous pouvez installer votre propre ERDDAP™ installation polie en quelques jours (selon le nombre et la complexité de vos ensembles de données) . Mais pirater des parties de ERDDAP™ pour votre propre projet est susceptible de prendre des semaines (et mois pour attraper les subtilités) et vous perdrez la possibilité d'intégrer des modifications et des corrections de bugs à partir de suivantes ERDDAP™ libérations. Nous (évidemment) penser qu'il y a beaucoup d'avantages à utiliser ERDDAP™ et de faire votre ERDDAP™ installation accessible au public. Cependant, dans certaines circonstances, vous pourriez ne pas vouloir faire votre ERDDAP™ installation accessible au public. Ensuite, votre service peut accéder et utiliser votre ERDDAP™ et vos clients n'ont pas besoin de savoir ERDDAP™ .

  ####  **À mi-chemin** 

Ou, il y a une autre approche que vous pouvez trouver utile qui est à mi-chemin entre ERDDAP Code et utilisation ERDDAP™ en tant que service web autonome: Dans la classe EDD, il y a une méthode statique qui vous permet de faire une instance d'un ensemble de données (d'après les spécifications datasets.xml ) :
`oneFromDataset Xml (Chaîne tDatasetID) 
`Il retourne une instance d'une table EDD ou EDDGrid ensemble de données. Compte tenu de cette instance, vous pouvez appeler\\
`makeNewFileForDapQuery (Chaîne userDapQuery, Chaîne dir, Chaîne fileName, Chaîne file Nom de type) 
`de dire à l'instance de faire un fichier de données, d'un type de fichier spécifique, avec les résultats d'une requête utilisateur. Ainsi, c'est une façon simple d'utiliser ERDDAP les méthodes pour demander des données et obtenir un fichier en réponse, tout comme un client utiliserait ERDDAP™ application web. Mais cette approche fonctionne dans votre Java programme et contourne le besoin d'un serveur d'application comme Tomcat. Nous utilisons cette approche pour de nombreux tests unitaires d'EDDTable et EDDGrid Les sous-classes, donc vous pouvez voir des exemples de ceci dans le code source pour toutes ces classes.

###  **Développement Environnement**  {#development-environment} 

  - Il y a des configurations pour [Jetty](https://github.com/ERDDAP/erddap/blob/main/development/jetty) et [Coq](https://github.com/ERDDAP/erddap/blob/main/development/docker) dans GitHub, bien que les sorties soient attendues pour Tomcat.

  -  **Facultatif** : Mise en place ERDDAP™ dans Tomcat\\
Depuis ERDDAP™ est principalement destiné à être un servlet courant dans Tomcat, nous vous recommandons fortement de suivre la norme [instructions d'installation](/docs/server-admin/deploy-install) pour installer Tomcat, puis installer ERDDAP™ dans le répertoire des applications web de Tomcat. Entre autres choses, ERDDAP™ a été conçu pour être installé dans la structure de répertoire de Tomcat et s'attend à ce que Tomcat fournisse quelques fichiers .jar.

  -  ERDDAP™ ne nécessite pas d'IDE spécifique (Chris utilise principalement Visual Studio Code, Bob utilisé EditerPlus) . Nous n'utilisons pas Eclipse, Ant, etc., ni n'offrons ERDDAP - un soutien connexe pour eux. Le projet utilise Maven.

  - Nous utilisons un fichier batch qui supprime tous les fichiers .class dans l'arborescence source pour nous assurer que nous avons une compilation propre (avec javac) .

  - Nous utilisons actuellement Javac jdk-25.0.1+8 d'Adoptium pour compiler gov.noaa.pfeg.coastwatch.TestAll (il a des liens vers quelques classes qui ne seraient pas compilées autrement) et faire les tests. Pour des raisons de sécurité, il est presque toujours préférable d'utiliser les dernières versions de Java 25 et Tomcat 10.

    - Lorsque nous courons javac ou java, le répertoire courant est _tomcat_/webapps/erddap/WEB-INF .

    - Notre javac et java classpath est
       `classes;../../../lib/servlet-api.jar;lib/*` 

    - Donc votre ligne de commande Javac sera quelque chose comme\\
       `javac -encoding UTF-8 -cp classes;../../../lib/servlet-api.jar;lib/* classes/gov/noaa/pfel/coastwatch/TestAll.java` 

    - Et votre ligne de commande java sera quelque chose comme\\
Cours de java-cp;../../lib/servlet-api.jar;lib/* -Xmx4000M -Xms4000M classes/gov/noaa/pfel/coastwatch/TestTous
       `Optionnel : vous pouvez ajouter` -verbose:gc`, qui dit Java imprimer des statistiques sur la collecte des ordures.

    - Si essai Tout compile, tout ERDDAP™ les besoins ont été compilés. Quelques classes sont compilées qui ne sont pas nécessaires pour ERDDAP™ . Si compiler TestAll réussit mais ne compile pas une classe, cette classe n'est pas nécessaire. (Il y a des cours inachevés/inutilisés.) 

  - Dans quelques cas, nous utilisons le code source 3ème partie au lieu de fichiers .jar (notamment pour DODS ) et les ont légèrement modifiés pour éviter les problèmes de compilation avec Java 25. Nous avons souvent fait d'autres légères modifications (notamment pour DODS ) pour d'autres raisons.

  - La plupart des classes ont des méthodes de test dans leur fichier src/test associé. Vous pouvez exécuter les tests Junit avec `Essai` commande. Ceci va télécharger plusieurs fichiers zip de données sur lesquels les tests comptent de la dernière version de [ ERDDAP /erddap Essai](https://github.com/ERDDAP/erddapTest/releases/) .\\
     
REMARQUE: Maven cache des téléchargements mais décompressera les archives téléchargées sur chaque exécution, ce qui prend du temps. Pour sauter le téléchargement
et déboîtant les archives de données de test, vous pouvez spécifier `skipTestResourceTélécharger` propriété à Maven (Par exemple `mvn -DskipTestResourcePaquet de téléchargement` ) .

###   **Classes importantes**  {#important-classes} 

Si vous voulez regarder le code source et essayer de comprendre comment ERDDAP™ Je vous en prie.

  - Le code a Java Doc commente, mais le Java Les docs n'ont pas été générés. N'hésitez pas à les générer.

  - Les classes les plus importantes (y compris ceux mentionnés ci-dessous) sont dans le gouv/noaa/pfel/erddap.

  - Les ERDDAP™ classe a les méthodes de niveau le plus élevé. Il étend HttpServlet.

  -  ERDDAP™ transmet les requêtes aux instances des sous-classes de EDDGrid ou EDDTable, qui représentent des ensembles de données individuels.

  - EDStatic possède la plupart des informations et paramètres statiques (Par exemple, à partir des fichiers setup.xml et messages.xml) et offre des services statiques (Par exemple, envoyer des courriels) .

  -  EDDGrid et les sous-classes EDDTable analysent la demande, obtiennent des données de méthodes spécifiques à la sous-classe, puis formatent les données pour la réponse.

  -  EDDGrid Les sous-classes poussent les données dans GridDataAccessor (le conteneur de données interne pour les données maillées) .

  - Les sous-classes EDDTable poussent les données dans les sous-classes TableWriter, qui écrivent les données à un type de fichier spécifique à la volée.

  - Autres classes (Par exemple, classes de bas niveau) sont également importants, mais il est moins probable que vous travaillerez à les changer.
     

###  **Code Contributions**  {#code-contributions} 

- Questions concernant GitHub
Si vous souhaitez contribuer mais n'avez pas de projet, consultez la liste des [Questions concernant GitHub](https://github.com/ERDDAP/erddap/issues) , dont beaucoup sont des projets que vous pourriez entreprendre. Si vous souhaitez travailler sur une question, s'il vous plaît l'attribuer à vous-même pour indiquer à d'autres que vous travaillez sur elle. La question GitHub est le meilleur endroit pour discuter de toute question sur la façon de poursuivre les travaux sur cette question.

- Si le changement que vous souhaitez faire est l'un des cas courants ci-dessous, veuillez créer un [Numéro GitHub](https://github.com/ERDDAP/erddap/issues) indiquant le changement que vous comptez faire. Puis une fois la modification terminée, faites une demande de tirage pour demander la fusion. Les changements courants sont les suivants :

  - Vous voulez écrire une autre sous-classe de EDDGrid ou EDDTable pour traiter un autre type de source de données. Si oui, nous vous recommandons de trouver la sous-classe existante la plus proche et d'utiliser ce code comme point de départ.

  - Vous voulez écrire une autre méthode saveAs_FileType_. Si oui, nous vous recommandons de trouver la méthode la plus proche existante de saveAs_FileType_ dans EDDGrid ou EDDTable et utiliser ce code comme point de départ.

Ces situations ont l'avantage que le code que vous écrivez est autonome. Vous n'aurez pas besoin de connaître tous les détails de ERDDAP Les internes. Et il sera facile pour nous d'intégrer votre code dans ERDDAP . Notez que si vous soumettez un code, la licence devra être compatible avec le ERDDAP™   [licence](/license)   (Par exemple, [Apache](https://www.apache.org/licenses/) , [BSD](https://www.opensource.org/licenses/bsd-license.php) ou [MIT-X](https://www.opensource.org/licenses/mit-license.php) ) . Nous allons énumérer votre contribution dans [créditeurs](/credits) .

- Si vous avez une fonctionnalité non couverte ci-dessus que vous souhaitez ajouter à ERDDAP , il est recommandé de créer d'abord un thread de discussion dans [Débat GitHub](https://github.com/ERDDAP/erddap/discussions/categories/ideas) . En ce qui concerne les caractéristiques/modifications importantes, le Conseil technique en discutera et décidera s'il convient d'approuver l'ajout ERDDAP™ .

###  **Juger votre code Contributions**  {#judging-your-code-contributions} 
Si vous souhaitez soumettre un code ou d'autres changements à inclure dans ERDDAP C'est génial. Votre contribution doit répondre à certains critères pour être acceptée. Si vous suivez les lignes directrices ci-dessous, vous augmentez considérablement les chances que votre contribution soit acceptée.
   

  - Les ERDDAP™ projet est géré par un NATD ( NOAA Nommé Directeur technique) avec la participation d'un conseil technique.
À partir de 2007 (début ERDDAP ) jusqu'en 2022, c'était Bob Simons (aussi le Fondateur-leader) . À partir de janvier 2023, c'est Chris John. Fondamentalement, le NATD est responsable de ERDDAP , il a donc le dernier mot sur les décisions concernant ERDDAP™ code, notamment sur la conception et si une demande de tirage donnée sera acceptée ou non. Cela doit se faire en partie pour des raisons d'efficacité. (il fonctionne bien pour Linus Torvalds et Linux) et en partie pour des raisons de sécurité : Quelqu'un doit dire aux responsables de la sécurité informatique qu'il assume la responsabilité de la sécurité et de l'intégrité du code.
     

  - Le NATD ne garantit pas qu'il acceptera votre code.
Si un projet ne fonctionne pas aussi bien que nous l'avions espéré et s'il ne peut pas être récupéré, le NATD n'inclura pas le projet dans le projet. ERDDAP™ la distribution. Ne vous sentez pas mal. Parfois, les projets ne fonctionnent pas aussi bien que prévu. Il arrive à tous les développeurs de logiciels. Si vous suivez les lignes directrices ci-dessous, vous augmentez considérablement vos chances de succès.
     

  - Il vaut mieux que les changements soient d'intérêt général et utiles.
Si le code est spécifique à votre organisation, il est probablement préférable de maintenir une branche séparée de ERDDAP™ pour votre usage. Axiom fait ça. Heureusement, Git rend cela facile à faire. Le NATD veut maintenir une vision cohérente ERDDAP , ne pas lui permettre de devenir un projet d'évier de cuisine où tout le monde ajoute une fonctionnalité personnalisée pour leur projet.
     

  - Suivez la Java Code des conventions.
En général, votre code devrait être de bonne qualité et devrait suivre l'original [ Java Code des conventions](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf) : mettre les fichiers .class à la bonne place dans la structure du répertoire, donner un nom approprié aux fichiers .class, inclure le nom approprié Java Doc commentaires, inclure //observations au début de chaque paragraphe de code, tiret avec 4 espaces (Pas d'onglet) , éviter les lignes &gt;80 caractères, etc. Les conventions changent et le code source n'est pas toujours complètement à jour. En cas de doute, correspondre au code des conventions et non au code existant.

- Utilisez les noms de classe, de méthode et de variable.
Cela facilite la lecture du code pour les autres.
   

- Évitez le code fantaisie.
À long terme, vous ou d'autres personnes devrez trouver le code pour le maintenir. Donc s'il vous plaît utiliser des méthodes de codage simples qui sont donc plus faciles pour les autres (y compris vous dans le futur) Pour comprendre. Évidemment, s'il y a un véritable avantage à utiliser un peu de fantaisie Java fonction de programmation, l'utiliser, mais documenter abondamment ce que vous avez fait, pourquoi, et comment il fonctionne.
   

- Travaillez avec le Conseil technique avant de commencer.
Si vous souhaitez obtenir vos modifications de code ERDDAP™ , Le Conseil technique voudra certainement parler de ce que vous allez faire et comment vous allez le faire avant d'apporter des modifications au code. De cette façon, nous pouvons vous éviter de faire des changements que le NATD, en fin de compte, n'accepte pas. Lorsque vous faites le travail, le NATD et le Conseil technique sont prêts à répondre aux questions pour vous aider à comprendre le code existant et (globale) comment aborder votre projet.
   

- Travailler indépendamment (autant que possible) après que vous ayez commencé.
Contrairement à ce qui précède « Travailler avec le Conseil technique », après avoir commencé le projet, le NATD vous encourage à travailler de manière aussi indépendante que possible. Si le NATD doit vous dire presque tout et répondre à beaucoup de questions (en particulier ceux que vous auriez pu répondre en lisant la documentation ou le code) , alors vos efforts ne sont pas une économie de temps pour le NATD et il pourrait aussi bien faire le travail eux-mêmes . C'est le [Mois de l'homme mystique](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) problème. Bien sûr, nous devrions toujours communiquer. Il serait bon de voir périodiquement votre travail en cours pour vous assurer que le projet est sur la bonne voie. Mais plus vous pouvez travailler indépendamment (après accord du conseil technique sur la tâche à accomplir et l'approche générale) C'est mieux.
   

- Évitez les insectes.
Si un bug n'est pas pris avant une version, il cause des problèmes pour les utilisateurs (au mieux) , retourne les mauvaises informations (au pire) , est une tache sur ERDDAP La réputation, et va persister ERDDAP™ installations depuis des années. Travailler très dur pour éviter les insectes. Une partie de cela est l'écriture de code propre (Il est donc plus facile de voir les problèmes) . Une partie de cela est d'écrire des tests unitaires. Une partie de cela est une attitude constante d'évitement de bug lorsque vous écrivez du code. Ne faites pas le regret NATD d'ajouter votre code à ERDDAP™ .
   

- Écrire un ou plusieurs tests unitaires.
Pour un nouveau code, vous devriez écrire des tests JUnit dans un fichier de test.
Veuillez écrire au moins une méthode de test individuelle qui teste soigneusement le code que vous écrivez et l'ajouter au fichier de test de la classe JUnit afin qu'il soit exécuté automatiquement. Unité (et connexes) tests sont l'une des meilleures façons de attraper les bugs, initialement, et à long terme (que d'autres choses changent dans ERDDAP™ ) . Comme Bob l'a dit, "Les tests unitaires sont ce qui me permet de dormir la nuit."
   

- Rendre facile pour le NATD de comprendre et d'accepter les changements dans votre demande de tirage.
Une partie de cela est d'écrire une méthode d'essai unitaire (s) . Une partie de cela limite vos modifications à une section de code (ou une classe) si possible. Le NATD n'acceptera aucune requête de tirage avec des centaines de modifications dans tout le code. Le NATD indique aux responsables de la sécurité informatique qu'il assume la responsabilité de la sécurité et de l'intégrité du code. S'il y a trop de changements ou s'ils sont trop difficiles à comprendre, alors il est trop difficile de vérifier que les changements sont corrects et ne pas introduire de bogues ou de problèmes de sécurité.
   

- Soyez simple.
Un bon thème général pour votre code est : Gardez-le simple. Code simple est facile pour les autres (y compris vous dans le futur) pour lire et maintenir. Il est facile pour le NATD de comprendre et donc d'accepter.
   

- Assumer la responsabilité à long terme de votre code.
À long terme, il est préférable que vous assumiez la responsabilité de maintenir votre code et de répondre aux questions à ce sujet. (Par exemple, dans ERDDAP™ Groupe Google) . Comme l'indiquent certains auteurs, le code est un passif ainsi qu'un actif. Si un bug est découvert à l'avenir, il est préférable que vous le corrigez parce que personne ne connaît votre code mieux que vous (aussi pour qu'il y ait une incitation à éviter les bugs en premier lieu) . Le NATD ne demande pas un engagement ferme pour assurer l'entretien continu. Le NATD dit simplement que l'entretien sera grandement apprécié.
