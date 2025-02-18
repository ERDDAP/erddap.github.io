---
sidebar_position: 4
---
ERDDAP™- Mettez en place votre propreERDDAP™    

## Ce que vous devez savoir{#things-you-need-to-know} 
     
###    **[Erreurs de proxy](#proxy-errors)**  {#proxy-errors} 
Parfois, une demande deERDDAP™retournera une erreur Proxy, une erreur HTTP 502 Bad Gateway, ou une erreur similaire. Ces erreurs sont lancées par Apache ou Tomcat, pasERDDAP™lui-même.
* Si chaque requête génère ces erreurs, surtout lorsque vous êtes en train de configurer votreERDDAP™, alors c'est probablement un proxy ou une mauvaise erreur de passerelle, et la solution est probablement à corriger[ERDDAPLes paramètres proxy](/docs/server-admin/deploy-install#proxypass). C'est peut-être aussi le problème lorsqu'unERDDAP™soudainement commence à jeter ces erreurs pour chaque demande.
* Autrement, les erreurs "proxy" sont généralement en fait des erreurs de sortie de temps lancées par Apache ou Tomcat. Même quand ils se produisent relativement rapidement, c'est une sorte de réponse d'Apache ou de Tomcat qui se produit lorsqueERDDAP™est très occupé, la mémoire limitée, ou limitée par une autre ressource. Dans ces cas, voir les conseils ci-dessous pour traiter[ERDDAP™répondre lentement](#responding-slowly).
        
Demandes de longue durée (&gt; 30 points de temps) d'un ensemble de données maillées sont sujettes à des défaillances de temps, qui apparaissent souvent comme des erreurs proxy, parce qu'il faut beaucoup de temps pourERDDAP™pour ouvrir tous les fichiers de données un par un. SiERDDAP™est autrement occupé pendant la demande, le problème est plus susceptible de se produire. Si les fichiers de l'ensemble de données sont compressés, le problème est plus probable, bien qu'il soit difficile pour un utilisateur de déterminer si les fichiers d'un ensemble de données sont compressés.
La solution est de faire plusieurs requêtes, chacune avec une plus petite plage de temps. Combien de temps ? Je suggère de commencer très petit (~30 points de temps ?) Alors (environ) doubler la plage de temps jusqu'à ce que la demande échoue, puis revenir un doublement. Puis faites toutes les demandes (chacun pour un autre morceau de temps) nécessaire pour obtenir toutes les données.
UneERDDAP™administrateur peut atténuer ce problème en augmentant le[Paramètres de timeout Apache](/docs/server-admin/deploy-install#apache-timeout).
        
### Surveillance{#monitoring} 
Nous voulons tous que nos services de données trouvent leur public et soient largement utilisés, mais parfois votreERDDAP™peut être utilisé trop, causant des problèmes, y compris des réponses super lentes pour toutes les demandes. Notre plan pour éviter les problèmes est :

* MoniteurERDDAP™par[page web status.html](#status-page).
Il a des tonnes d'informations utiles. Si vous voyez qu'un grand nombre de demandes arrivent, ou des tonnes de mémoire sont utilisées, ou des tonnes de demandes échouées, ou que chaque Major LoadDatasets prend beaucoup de temps, ou voir tout signe de choses se coincer et répondre lentement, alors regardez dansERDDAP's[fichier log.txt](#log)pour voir ce qui se passe.
    
Il est également utile de noter à quelle vitesse la page d'état répond. Si elle réagit lentement, c'est un indicateur important quiERDDAP™est très occupé.
    
* MoniteurERDDAP™par[Rapport quotidien](#daily-report)E-mail.
     
* Surveillez les ensembles de données périmés via le *baseUrl* /erddap/outOfDateDatasets.htmlpage Web qui est basée sur le optionnel[testOutOfDate](/docs/server-admin/datasets#testoutofdate)attribut global.
     
#### Moniteurs externes{#external-monitors} 
Les méthodes énumérées ci-dessus sont:ERDDAPles moyens de surveillance. Il est également possible de faire ou d'utiliser des systèmes externes pour surveiller votreERDDAP. Un projet pour ce faire est[Projet de mesure erddap d'Axiom](https://github.com/axiom-data-science/erddap-metrics). Ces systèmes externes présentent certains avantages:
* Ils peuvent être personnalisés pour fournir les informations que vous voulez, affichées comme vous voulez.
* Ils peuvent inclure des informations surERDDAP™quiERDDAP™ne peut pas accéder facilement ou du tout (par exemple, utilisation du processeur, espace libre de disque,ERDDAP™le temps de réponse vu du point de vue de l'utilisateur,ERDDAP™disponibilité,
* Ils peuvent fournir des alertes (e-mails, appels téléphoniques, SMS) aux administrateurs lorsque les problèmes dépassent un certain seuil.
             
### Plusieurs simultanés Demandes{#multiple-simultaneous-requests} 
*    **Les utilisateurs de la liste noire font plusieurs requêtes simultanées&#33;** 
S'il est clair que certains utilisateurs font plusieurs requêtes simultanées, de façon répétée et continue, alors ajoutez leur adresse IP àERDDAPC'est...&lt;requêteBlacklist&gt;] (/docs/serveur-admin/données#requestblacklist) dans votredatasets.xmlfichier. Parfois, les requêtes proviennent toutes d'une seule adresse IP. Parfois, ils proviennent de plusieurs adresses IP, mais clairement le même utilisateur. Vous pouvez également blacklist personnes faisant des tonnes de demandes invalides ou des tonnes de demandes mentalement inefficaces.
    
Puis, pour chaque demande,ERDDAP™retourne :
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Espérons que l'utilisateur verra ce message et vous contactera pour savoir comment résoudre le problème et sortir de la liste noire. Parfois, ils changent d'adresses IP et réessayent.
    
C'est comme l'équilibre du pouvoir entre les armes offensives et défensives en guerre. Ici, les armes défensives (ERDDAP) ont une capacité fixe, limitée par le nombre de cœurs dans le processeur, la bande passante d'accès au disque et la bande passante du réseau. Mais les armes offensives (utilisateurs, notamment les scripts) ont une capacité illimitée:
    
    * Une seule demande de données à partir de beaucoup de temps peut causerERDDAPpour ouvrir un grand nombre de fichiers (en séquence ou en partie multifilés) . Dans les cas extrêmes, une requête "simple" peut facilement relier le RAIDERDDAP™pendant une minute, bloquer efficacement le traitement d'autres demandes.
         
    * Une seule demande peut consommer un gros morceau de mémoire (même siERDDAP™est codé pour minimiser la mémoire nécessaire pour traiter les grandes requêtes) .
         
    * Parallélisation - Oui.
Il est facile pour un utilisateur intelligent de paralléliser une grande tâche en générant beaucoup de threads, chacun d'eux présentant une demande séparée (qui peuvent être grandes ou petites) . Ce comportement est encouragé par la communauté informatique comme un moyen efficace de faire face à un problème important (et parallélisation est efficace dans d'autres circonstances) . Revenir à l'analogie de guerre: les utilisateurs peuvent faire un nombre essentiellement illimité de demandes simultanées avec le coût de chacune étant essentiellement zéro, mais le coût de chaque demande entrant dansERDDAP™peut être grand etERDDAPLa capacité de réponse est limitée. Clairement,ERDDAP™perdra cette bataille, à moins que leERDDAP™administrateur listes noires utilisateurs qui font plusieurs requêtes simultanées qui sont injustement évincer les autres utilisateurs.
         
    * Scripts multiples -
Maintenant pensez à ce qui se passe quand il y a plusieurs utilisateurs intelligents chacun exécutant des scripts parallélisés. Si un utilisateur peut générer tellement de requêtes que d'autres utilisateurs sont surchargés, alors plusieurs de ces utilisateurs peuvent générer tellement de requêtes queERDDAP™devient submergé et apparemment insensible. Il s'agit d'une[Attaque DDOS](https://en.wikipedia.org/wiki/Denial-of-service_attack)Encore une fois, la seule défense pourERDDAP™c'est aux utilisateurs de la liste noire de faire plusieurs requêtes simultanées qui éloignent injustement les autres utilisateurs.
         
    * Attentes gonflées -
Dans ce monde d'entreprises technologiques massives (Amazon, Google, Facebook, ...) , les utilisateurs sont venus à s'attendre à des capacités essentiellement illimitées de la part des fournisseurs. Comme ces entreprises font des opérations financières, plus elles ont d'utilisateurs, plus elles ont de revenus pour développer leur infrastructure informatique. Ils peuvent donc se permettre une infrastructure informatique massive pour traiter les demandes. Et ils limitent astucieusement le nombre de demandes et le coût de chaque demande des utilisateurs en limitant le type de demandes que les utilisateurs peuvent faire afin qu'aucune demande ne soit lourde, et il n'y a jamais de raison (ou d'un moyen) pour les utilisateurs de faire plusieurs requêtes simultanées. Donc, ces grandes entreprises technologiques peuvent avoir beaucoup plus d'utilisateurs queERDDAP™, mais ils ont massivement plus de ressources et des moyens intelligents pour limiter les demandes de chaque utilisateur. C'est une situation gérable pour les grandes entreprises informatiques (Et ils deviennent riches &#33;) mais pas pourERDDAP™les installations. Encore une fois, la seule défense pourERDDAP™c'est aux utilisateurs de la liste noire de faire plusieurs requêtes simultanées qui éloignent injustement les autres utilisateurs.
         
    
Donc utilisateurs: Ne faites pas de multiples requêtes simultanées ou vous serez sur la liste noire&#33;
     

De toute évidence, il est préférable que votre serveur ait beaucoup de cœurs, beaucoup de mémoire (pour que vous puissiez allouer beaucoup de mémoire àERDDAP™, plus qu'il n'a jamais besoin) , et une connexion internet haute bande passante. Ensuite, la mémoire est rarement ou jamais un facteur limitatif, mais la bande passante du réseau devient le facteur limitatif le plus courant. Fondamentalement, comme il y a de plus en plus de requêtes simultanées, la vitesse pour un utilisateur donné diminue. Cela ralentit naturellement le nombre de demandes qui arrivent si chaque utilisateur ne présente qu'une seule demande à la fois.
    
### ERDDAP™Obtenir des données de THREDS{#erddap-getting-data-from-thredds} 
Si votreERDDAP™obtient certaines de ses données à partir d'un THREDDS sur votre site, il ya quelques avantages à faire une copie des fichiers de données THREDDS (au moins pour les ensembles de données les plus populaires) sur un autre RAID queERDDAP™a accès à de sorte queERDDAP™peut servir les données des fichiers directement. ÀERD, nous le faisons pour nos ensembles de données les plus populaires.

*   ERDDAP™peut obtenir les données directement et ne pas avoir à attendre que THREDDS recharge l'ensemble de données ou ...
*   ERDDAP™peut remarquer et intégrer de nouveaux fichiers de données immédiatement, de sorte qu'il n'a pas à piéger THREDDS fréquemment pour voir si l'ensemble de données a changé. Voir [&lt;mise à jour de EveryNMillis&gt;] (/docs/serveur-admin/datasets#updateeverynnmillis) .
* La charge est répartie entre 2 serveurs RAIDS et 2 serveurs, au lieu que la requête soit difficile sur les deuxERDDAP™et des THREDS.
* Vous évitez le problème d'inadéquation causé par THREDS ayant un petit (par défaut) taille maximale de la demande.ERDDAP™a un système pour gérer l'inadéquation, mais éviter le problème est mieux.
* Vous avez une copie de sauvegarde des données qui est toujours une bonne idée.

Dans tous les cas, ne lancez jamais THREDS etERDDAP™dans le même Tomcat. Exécutez-les dans des Tomcats séparés, ou mieux, sur des serveurs séparés.

Nous trouvons que THREDDS arrive périodiquement dans un état où les demandes sont suspendues. Si votreERDDAP™est d'obtenir des données d'un THREDDS et le THREDDS est dans cet état,ERDDAP™a une défense (il dit que l'ensemble de données basé sur THREDS n'est pas disponible) , mais c'est toujours gênant pourERDDAP™parce queERDDAP™doit attendre le timeout chaque fois qu'il essaie de recharger un jeu de données d'un THREDS accroché. Certains groupes (y comprisERD) éviter cela en redémarrant proactifment les THREDS fréquemment (Par exemple, la nuit dans un travail de cron) .

### Répondre lentement{#responding-slowly} 
*    **SiERDDAP™Réponse lente** ou si seulement certaines demandes répondent lentement,
vous pourriez être en mesure de comprendre si la lenteur est raisonnable et temporaire (Par exemple, en raison de nombreuses demandes de scripts ouWMSutilisateurs) , ou si quelque chose est inexplicablement faux et que vous devez[arrêter et redémarrer Tomcat etERDDAP™](#shut-down-and-restart).
    
SiERDDAP™est de répondre lentement, voir le conseil ci-dessous pour déterminer la cause, qui espérons vous permettra de résoudre le problème.
Vous pouvez avoir un point de départ spécifique (Par exemple, une URL de requête spécifique) ou un point de départ vague (Par exemple,ERDDAP™est lent) .
Vous connaissez peut-être l'utilisateur concerné (Par exemple, parce qu'ils vous ont envoyé un courriel) Ou pas.
Vous pouvez avoir d'autres indices, ou pas.
Étant donné que toutes ces situations et toutes les causes possibles des problèmes sont floues, les conseils ci-dessous tentent de traiter tous les points de départ possibles et tous les problèmes possibles liés aux réponses lentes.
    
    *    **Cherchez des indices[ERDDAPLe fichier journal](#log)**   ( *BigParent Directory* /logs/log.txt) .
        \\[En de rares occasions, il y a des indices dans[Le fichier journal de Tomcat](#tomcat-logs)  ( *Tomcat* /logs/catalina.out) .\\]  
Cherchez les messages d'erreur.
Rechercher un grand nombre de demandes provenant d'une (ou quelques-uns) utilisateurs et peut-être hogging beaucoup de ressources de votre serveur (mémoire, temps CPU, accès disque, bande passante internet) .
        
Si le problème est lié à **un utilisateur** , vous pouvez souvent obtenir un indice sur qui l'utilisateur est via des services web comme[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)qui peut vous donner des informations relatives à l'adresse IP de l'utilisateur (que vous pouvez trouver dansERDDAP's[Log.txt](#log)fichier) .
        
        * Si l'utilisateur semble être un **bot** mal se comporter (notamment, un moteur de recherche essayant de remplir leERDDAP™formes avec chaque permutation possible des valeurs d'entrée) , assurez-vous que vous avez correctement configuré le serveur[robots.txt](#robotstxt)fichier.
        * Si l'utilisateur semble être un **script (s) ** qui fait plusieurs requêtes simultanées, contactez l'utilisateur, expliquez que votreERDDAP™dispose de ressources limitées (Par exemple, mémoire, temps du processeur, accès au disque, bande passante Internet) , et leur demander d'être attentionnés des autres utilisateurs et juste faire une demande à la fois. Vous pourriez aussi mentionner que vous allez les blacklist s'ils ne reculent pas.
        * Si l'utilisateur semble être un **script** faire un grand nombre de demandes longues, demander à l'utilisateur d'être attentionné des autres utilisateurs en mettant une petite pause (Deux secondes ?) dans le script entre les requêtes.
        *    **WMSlogiciel client** peut être très exigeant. Un client demandera souvent 6 images personnalisées à la fois. Si l'utilisateur semble être unWMSclient qui fait des demandes légitimes, vous pouvez:
            * Ignore-le. (recommandé, parce qu'ils vont bientôt avancer) 
            * Éteignez le serveurWMSservice viaERDDAPLe fichier setup.html. (non recommandé) 
        * Si les demandes semblent **stupide, fou, excessif, ou malveillant,** ou si vous ne pouvez pas résoudre le problème autrement, envisager d'ajouter temporairement ou définitivement l'adresse IP de l'utilisateur à la [&lt;requêteBlacklist&gt; dans votredatasets.xmlfichier] (/docs/serveur-admin/données#requestblacklist) .
             
    *    **Essayez de reproduire le problème vous-même, depuis votre ordinateur.**   
Déterminez si le problème concerne un ensemble de données ou tous les ensembles de données, pour un utilisateur ou tous les utilisateurs, pour seulement certains types de requêtes, etc.
Si vous pouvez reproduire le problème, essayez de le réduire.
Si vous ne pouvez pas reproduire le problème, alors le problème peut être lié à l'ordinateur de l'utilisateur, la connexion Internet de l'utilisateur, ou la connexion Internet de votre institution.
         
    * Si juste **un ensemble de données** répond lentement (peut-être seulement pour **un type de demande** d'un utilisateur) , le problème peut être:
        *   ERDDAPL'accès aux données sources de l'ensemble de données (notamment à partir de bases de données relationnelles, de Cassandra et de ensembles de données à distance) peut être temporairement ou définitivement lent. Essayez de vérifier la vitesse de la source indépendamment deERDDAP. Si c'est lent, vous pouvez peut-être l'améliorer.
        * Le problème est-il lié à la demande spécifique ou au type général de demande?
Plus le sous-ensemble de données demandé est grand, plus la demande échouera probablement. Si l'utilisateur fait d'énormes demandes, demandez à l'utilisateur de faire des demandes plus petites qui sont plus susceptibles d'obtenir une réponse rapide et réussie.
            
Presque tous les ensembles de données sont meilleurs pour traiter certains types de demandes que d'autres types de demandes. Par exemple, lorsqu'un jeu de données stocke différents morceaux de temps dans différents fichiers, les demandes de données à partir d'un grand nombre de points de temps peuvent être très lentes. Si les demandes actuelles sont de type difficile, envisagez d'offrir une variante de l'ensemble de données optimisé pour ces demandes. Ou expliquez simplement à l'utilisateur que ce type de requête est difficile et prend du temps, et demandez leur patience.
            
        * L'ensemble de données peut ne pas être configuré de manière optimale. Vous pouvez peut-être apporter des modifications à l'ensemble de donnéesdatasets.xmlpour aiderERDDAP™mieux gérer l'ensemble de données. Par exemple,
            
            *   EDDGridLes ensembles de données de NcFiles qui accèdent aux données des fichiers nc4/hdf5 compressés sont lents lors de l'obtention des données pour toute la gamme géographique (Par exemple, pour une carte du monde) car le fichier entier doit être décomprimé. Vous pouvez convertir les fichiers en fichiers non compressés, mais alors l'espace disque requis sera beaucoup, beaucoup plus grand. Il est probablement préférable de simplement accepter que ces ensembles de données seront lents dans certaines circonstances.
            * La configuration du [&lt;subsetVariables&gt;] (/docs/serveur-admin/datasets#subsetvariables) tag a une énorme influence sur commentERDDAP™gère les ensembles de données EDDTable.
            * Vous pourriez être en mesure d'augmenter le[vitesse d'une EDDTableFromDatabase](/docs/server-admin/datasets#database-speed)ensemble de données.
            * De nombreux ensembles de données EDDTable peuvent être développés par[stockage d'une copie des données dansNetCDFDossiers d'array piégés](/docs/server-admin/datasets#eddtablefromfiles), quiERDDAP™peut lire très rapidement.
            
Si vous voulez aider à accélérer un ensemble de données spécifique, inclure une description du problème et le morceau de l'ensemble de donnéesdatasets.xmlet de voir notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).
             
    * Si **tout** enERDDAP™est **toujours** lent, le problème peut être:
        * L'ordinateur qui tourneERDDAP™peut ne pas avoir assez de mémoire ou de puissance de traitement. C'est bon de courirERDDAP™sur un serveur multi-cœur moderne. Pour une utilisation lourde, le serveur devrait avoir un système d'exploitation 64 bits et 8 Go ou plus de mémoire.
        * L'ordinateur qui tourneERDDAP™Il se peut aussi que d'autres applications consomment beaucoup de ressources du système. Si oui, pouvez-vous obtenir un serveur dédié pourERDDAP? Par exemple (ce n'est pas une approbation) , vous pouvez obtenir un serveur Mac Mini quad-core avec 8 Go de mémoire pour ~1100 $.
             
    * Si **tout** enERDDAP™est **temporaire** Lent, regardez votreERDDAP's[ **/erddap/status.htmlpage** ](#status-page)dans votre navigateur.
        * LesERDDAP™La page d'état ne se charge pas?
Si oui,[redémarrerERDDAP™](#shut-down-and-restart).
        * Est-ce queERDDAP™charger la page d'état lentement (Par exemple, &gt;5 secondes) ?
C'est un signe que tout enERDDAP™est lente, mais ce n'est pas forcément un problème.ERDDAP™C'est peut-être très occupé.
        * Pour "La réponse a échoué (depuis les derniers grands ensembles de données de chargement) ", est n= un grand nombre?
Cela indique qu'il y a eu récemment beaucoup de demandes rejetées. Ça peut être un problème ou un début de problème. Le temps médian pour les échecs est souvent important (Par exemple, 210000 ms) ,
ce qui signifie qu'il y avait (Vraiment ?) Beaucoup de fils actifs.
qui liaient beaucoup de ressources (Comme la mémoire, les fichiers ouverts, les sockets ouverts, ...) ,
Ce qui n'est pas bon.
        * Pour "Réponse Temps réussi (depuis les derniers grands ensembles de données de chargement) ", est n= un grand nombre?
Cela indique qu'il y a eu récemment beaucoup de demandes retenues. Ce n'est pas un problème. Ça veut juste dire que votreERDDAP™Ça devient très utile.
        * Le "Nombre de fils d'attente non-Tombat" est-il le double d'une valeur typique?
C'est souvent un problème grave qui causeraERDDAP™pour ralentir et finir par geler. Si cela persiste pendant des heures, vous voudrez peut-être[redémarrerERDDAP™](#shut-down-and-restart).
        * Au bas de la liste "Résumé de l'utilisation de la mémoire", la dernière valeur "Memory: currently using" est-elle très élevée?
Cela peut simplement indiquer une utilisation élevée, ou cela peut être un signe de problème.
        * Regardez la liste des fils et leur statut. Un nombre inhabituel d'entre eux font quelque chose d'inhabituel ?
             
    * Est **la connexion Internet de votre institution** actuellement lent ?
Rechercher sur Internet "test de vitesse Internet" et utiliser l'un des tests en ligne gratuits, tels que[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Si la connexion Internet de votre institution est lente, alors les connexions entreERDDAP™les sources de données à distance seront lentes et les connexions entreERDDAP™et l'utilisateur sera lent. Parfois, vous pouvez résoudre cela en arrêtant l'utilisation inutile d'Internet (Par exemple, les personnes qui regardent des vidéos en streaming ou des conférences téléphoniques vidéo) .
         
    * Est **la connexion Internet de l'utilisateur** actuellement lent ?
Demandez à l'utilisateur de faire une recherche sur Internet pour "test de vitesse Internet" et d'utiliser l'un des tests gratuits en ligne, comme[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Si la connexion Internet de l'utilisateur est lente, elle ralentit leur accès àERDDAP. Parfois, ils peuvent résoudre cela en arrêtant l'utilisation inutile d'Internet dans leur institution (Par exemple, les personnes qui regardent des vidéos en streaming ou des conférences téléphoniques vidéo) .
         
    *    **Cassé ?**   
Voir notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).

### Fermez et redémarrez{#shut-down-and-restart} 
*    **Comment fermer et redémarrer Tomcat etERDDAP™**   
Vous n'avez pas besoin d'arrêter et de redémarrer Tomcat etERDDAPsiERDDAP™est temporairement lent, lent pour une raison connue (comme beaucoup de requêtes de scripts ouWMSutilisateurs) , ou d'appliquer des changementsdatasets.xmlfichier.
    
Vous devez arrêter et redémarrer Tomcat etERDDAP™si vous devez appliquer des modifications au fichier setup.xml, ou siERDDAP™gele, pend ou verrouille. Dans des circonstances extrêmes,Javapeut geler pendant une minute ou deux pendant qu'il fait une collecte complète des ordures, mais ensuite récupérer. Donc c'est bon d'attendre une minute ou deux pour voir siJava/ERDDAP™est vraiment congelé ou si elle fait juste une longue collecte des ordures. (Si la collecte des ordures est un problème courant,[attribuer plus de mémoire à Tomcat](/docs/server-admin/deploy-install#memory).) 
    
Je ne recommande pas d'utiliser le Tomcat Web Application Manager pour démarrer ou arrêter Tomcat. Si vous ne vous arrêtez pas complètement et ne démarrez pas Tomcat, tôt ou tard vous aurez des problèmes de mémoire PermGen.
    
Pour arrêter et redémarrer Tomcat etERDDAP:
    
    * Si vous utilisez Linux ou un Mac :
         (Si vous avez créé un utilisateur spécial pour exécuter Tomcat, par exemple, tomcat, n'oubliez pas de faire les étapes suivantes en tant qu'utilisateur.)   
         
        1. Utiliser cd *Tomcat* /bin
             
        2. Utiliser ps -ef|tomcat grep pour trouver le processus java/tomcat Numéro (J'espère qu'un seul processus sera énuméré) , que nous appellerons *javaProcessID* ci-dessous.
             
        3. SiERDDAP™est congelé/humide/verrouillé, utiliser tuer -3 *javaProcessID* à direJava  (qui dirige Tomcat) pour faire une sauvegarde de thread dans le fichier journal Tomcat: *Tomcat* /logs/catalina.out . Après avoir redémarré, vous pouvez diagnostiquer le problème en trouvant l'information de la décharge thread (et toute autre information utile ci-dessus) en *Tomcat* /logs/catalina.out et aussi en lisant les parties pertinentes de la[ERDDAP™archive journal](#log). Si vous voulez, vous pouvez inclure cette information et voir notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).
             
        4. Utilisez ./shutdown. sh
             
        5. Utiliser ps -ef|grep tomcat à plusieurs reprises jusqu'à ce que le processus java/tomcat ne soit pas listé.
            
Parfois, le processus java/tomcat prend jusqu'à deux minutes pour s'arrêter complètement. La raison en est :ERDDAP™envoie un message à ses fils d'arrière-plan pour leur dire de s'arrêter, mais parfois il faut beaucoup de temps à ces fils pour arriver à un bon endroit d'arrêt.
            
        6. Si après une minute, java/tomcat ne s'arrête pas seul, vous pouvez utiliser
tuer -9 *javaProcessID*   
forcer le processus java/tomcat à s'arrêter immédiatement. Si possible, n'utilisez ceci qu'en dernier recours. Le commutateur -9 est puissant, mais il peut causer divers problèmes.
             
        7. Pour redémarrerERDDAP™, utiliser ./startup.sh
             
        8. AffichageERDDAP™dans votre navigateur pour vérifier que le redémarrage a réussi. (Parfois, vous devez attendre 30 secondes et essayer de chargerERDDAP™à nouveau dans votre navigateur pour qu'il réussisse.)   
             
    * Si vous utilisez Windows:
         
        1. Utiliser cd *Tomcat* /bin
             
        2. Utilisationshutdown.bat  
             
        3. Vous pouvez vouloir/avoir besoin d'utiliser le Gestionnaire des tâches Windows (accessible via Ctrl Alt Del) de veiller à ce queJava/Tomcat/ERDDAP™processus/application a complètement cessé.
Parfois, le processus/la demande prend jusqu'à deux minutes pour s'arrêter. La raison en est :ERDDAP™envoie un message à ses fils d'arrière-plan pour leur dire de s'arrêter, mais parfois il faut beaucoup de temps à ces fils pour arriver à un bon endroit d'arrêt.
             
        4. Pour redémarrerERDDAP™, utilisez startup.bat
             
        5. AffichageERDDAP™dans votre navigateur pour vérifier que le redémarrage a réussi. (Parfois, vous devez attendre 30 secondes et essayer de chargerERDDAP™à nouveau dans votre navigateur pour qu'il réussisse.)   
             
### Crashes ou gels fréquents{#frequent-crashes-or-freezes} 
SiERDDAP™devient lent, s'écrase ou gèle, quelque chose ne va pas. Regardez.[ERDDAPLe fichier journal](#log)pour essayer de trouver la cause. Si vous ne pouvez pas, veuillez inclure les détails et voir notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).

Le problème le plus courant est un utilisateur gênant qui exécute plusieurs scripts à la fois et/ou quelqu'un qui effectue un grand nombre de requêtes non valides. Si cela se produit, vous devriez probablement blacklist cet utilisateur. Lorsqu'un utilisateur sur la liste noire fait une demande, le message d'erreur dans la réponse les encourage à vous envoyer un courriel pour résoudre les problèmes. Ensuite, vous pouvez les encourager à exécuter un seul script à la fois et à résoudre les problèmes dans leur script (Par exemple, demander des données à partir d'un ensemble de données à distance qui ne peuvent pas répondre avant de s'arrêter) . Voir [&lt;requêteBlacklist&gt; dans votredatasets.xmlfichier] (/docs/serveur-admin/données#requestblacklist) .

Dans des circonstances extrêmes,Javapeut geler pendant une minute ou deux pendant qu'il fait une collecte complète des ordures, mais ensuite récupérer. Donc c'est bon d'attendre une minute ou deux pour voir siJava/ERDDAP™est vraiment congelé ou si elle fait juste une longue collecte des ordures. (Si la collecte des ordures est un problème courant,[attribuer plus de mémoire à Tomcat](/docs/server-admin/deploy-install#memory).) 

SiERDDAP™devient lent ou gèle et le problème n'est pas un utilisateur gênant ou une longue collecte des ordures, vous pouvez généralement résoudre le problème par[redémarrageERDDAP™](#shut-down-and-restart). Mon expérience est queERDDAP™peut courir pendant des mois sans avoir besoin d'un redémarrage.
     

### Moniteur{#monitor} 
Vous pouvez surveiller votreERDDAP's statut en regardant[/erddap/status.htmlpage](#status-page), notamment les statistiques dans la section supérieure. SiERDDAP™devient lent ou gele et le problème n'est pas seulement une utilisation extrêmement lourde, vous pouvez généralement résoudre le problème par[redémarrageERDDAP™](#shut-down-and-restart). Il y a d'autres mesures disponibles grâce à l'intégration Prométhée à /erddap/metrics.

Mon expérience est queERDDAP™peut courir pendant des mois sans avoir besoin d'un redémarrage. Vous ne devriez avoir besoin de le redémarrer que si vous voulez appliquer certaines modifications que vous avez faites àERDDAP's setup.xml ou quand vous devez installer de nouvelles versions deERDDAP™,Java, Tomcat, ou le système d'exploitation. Si vous devez redémarrerERDDAP™Souvent, quelque chose ne va pas. Regardez.[ERDDAPLe fichier journal](#log)pour essayer de trouver la cause. Si vous ne pouvez pas, veuillez inclure les détails et voir notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support). Comme solution temporaire, vous pourriez essayer d'utiliser[Moniteur](https://mmonit.com/monit/)pour surveiller votreERDDAP™et le redémarrer si nécessaire. Ou, vous pourriez faire un travail de cron pour redémarrerERDDAP™  (proactivement) périodiquement. Il peut être un peu difficile d'écrire un script pour automatiser la surveillance et le redémarrageERDDAP. Quelques conseils qui pourraient aider:

* Vous pouvez simplifier les tests si le processus Tomcat fonctionne toujours en utilisant le commutateur -c avec grep:
Autres *Tomcat Utilisateur*  |c java
Cela réduira la sortie à "1" si le processus tomcat est toujours en vie, ou "0" si le processus s'est arrêté.
     
* Si vous êtes bon avec gawk, vous pouvez extraire le processID des résultats de
Autres *Tomcat Utilisateur*  |grep java, et utiliser le processID dans d'autres lignes du script.
     

Si vous mettez en place Monit ou un travail de cron, ce serait super si vous pouviez partager les détails afin que d'autres puissent profiter de notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support)où vous pouvez partager.

#### Permgen{#permgen} 
Si vous utilisez Tomcat Manager à plusieurs reprises pour recharger (ou Stop et Start)  ERDDAP™,ERDDAP™Peut ne pas démarrer et lancer java.lang. De mémoireErreur: PermGen. La solution est de périodiquement (Ou à chaque fois ?)  [fermer et redémarrer tomcat etERDDAP™](#shut-down-and-restart), au lieu de simplement rechargerERDDAP.
\\[Mise à jour : Ce problème a été grandement minimisé ou corrigéERDDAP™de la version 1.24.\\]  
     
#### Journal{#log} 
*    **[Log.txt](#log)**   
SiERDDAP™ne démarre pas ou si quelque chose ne fonctionne pas comme prévu, il est très utile de regarder les messages d'erreur et de diagnostic dans leERDDAP™fichier journal.
    * Le fichier journal est *BigParent Directory* /logs/log.txt
         ( *BigParent Directory* est spécifié dans[configuration.xml](/docs/server-admin/deploy-install#setupxml)) . S'il n'y a pas de journal. fichier txt ou si le journal. Le fichier txt n'a pas été mis à jour depuis le redémarrageERDDAP™, regardez dans le[Fichiers de journaux Tomcat](#tomcat-logs)pour voir s'il y a un message d'erreur.
    * Types de messages de diagnostic dans le fichier journal:
        * Le mot "erreur" est utilisé quand quelque chose s'est tellement mal passé que la procédure n'a pas abouti. Bien qu'il soit ennuyeux d'obtenir une erreur, l'erreur vous force à traiter le problème. Nous pensons qu'il est préférable de jeter une erreur, que d'avoirERDDAP™Vous ne vous attendiez pas à travailler.
        * Le mot "avertissement" est utilisé quand quelque chose a mal tourné, mais la procédure a pu être achevée. C'est assez rare.
        * Tout le reste n'est qu'un message informatif. Vous pouvez contrôler la quantité d'informations enregistrées avec [&lt;niveau de log&gt;] (/docs/serveur-admin/données#loglevel)  datasets.xml.
        * Le jeu de données recharge et les réponses de l'utilisateur qui prennent &gt;10 secondes pour terminer (succès ou échec) sont marqués par " (Plus de 10 &#33;) ". Ainsi, vous pouvez rechercher le fichier log.txt pour trouver les ensembles de données qui ont été lents à recharger ou le numéro de requête des requêtes qui ont été lents à terminer. Vous pouvez alors regarder plus haut dans le fichier log.txt pour voir quel était le problème de l'ensemble de données ou ce que la demande de l'utilisateur était et de qui il était. Ces charges de données lentes et les demandes des utilisateurs sont parfois taxant surERDDAP. En savoir plus sur ces demandes peut donc vous aider à identifier et à résoudre les problèmes.
    * L'information est écrite au fichier journal sur le lecteur de disque dans des morceaux assez grands. L'avantage est que c'est très efficace --ERDDAP™ne bloquera jamais en attendant que l'information soit écrite dans le fichier journal. L'inconvénient est que le journal se termine presque toujours par un message partiel, qui ne sera pas terminé avant que le prochain morceau soit écrit. Vous pouvez le mettre à jour (pour un instant) en regardant votreERDDAPla page Web de l'état à https://*your.domain.org*/erddap/status.html   (ouhttp://sihttpsn'est pas activé) .
    * Lorsque les fichiers log.txt atteignent 20 Mo,
le fichier est renommé journal. txt.previous et un nouveau fichier log.txt est créé. Donc les fichiers journaux ne s'accumulent pas.
        
Dans setup.xml, vous pouvez spécifier une taille maximale différente pour le fichier journal, dans MegaBytes. Le minimum autorisé est 1 (Pays) . Le maximum autorisé est de 2000 (Pays) . Par défaut : 20 (Pays) . Par exemple:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Quand vous redémarrezERDDAP™,
        ERDDAP™fait une copie d'archive du log.txt et du log. txt.fichiers précédents avec un timbre-temps dans le nom du fichier. S'il y a eu des problèmes avant le redémarrage, il peut être utile d'analyser ces fichiers archivés pour trouver des indices sur le problème. Vous pouvez supprimer les fichiers d'archive s'ils ne sont plus nécessaires.
         
##### Parsing log.txt{#parsing-logtxt} 
ERDDAPLe journal de bord. Le fichier txt n'est pas conçu pour l'analyse (bien que vous pourriez être en mesure de créer des expressions régulières qui extraire l'information souhaitée) . Il est conçu pour aider un humain à comprendre ce qui se passe quand quelque chose se passe mal. Lorsque vous soumettez un bogue ou un rapport de problème àERDDAP™les développeurs, si possible, veuillez inclure toutes les informations du fichier log.txt relatives à la requête gênante.

Pour des raisons d'efficacité,ERDDAP™seulement écrit des informations à enregistrer. txt après une grande partie de l'information s'est accumulée. Donc si vous visitez le journal. txt juste après qu'une erreur est survenue, les informations liées à l'erreur peuvent ne pas avoir encore été écrites sur log.txt. Afin d'obtenir des informations parfaitement à jour de log.txt, visitez votreERDDAP's[page status.html](#status-page). QuandERDDAP™processus qui demande, il chasse toutes les informations en attente à log.txt.

PourERDDAP™statistiques d'utilisation, veuillez utiliser le[Fichiers journaux Apache et/ou Tomcat](#tomcat-logs)au lieu deERDDAPLe log.txt. Notez queERDDAP's[page status.html](#status-page)  (certains) et[Rapport quotidien](#daily-report)  (plus) avoir un grand nombre de statistiques d'utilisation précalculées pour vous.
    
### Registres de Tomcat{#tomcat-logs} 
SiERDDAP™ne démarre pas parce qu'une erreur est survenue très tôt dansERDDAP's startup, le message d'erreur apparaîtra dans les fichiers journaux de Tomcat ( *Tomcat* /logs/catalina. *Aujourd'hui* .log ou *Tomcat* /logs/catalina.out) Pas dans[ERDDAPLe fichier log.txt](#log).

Statistiques d'utilisation : Pour la plupart des informations que les gens veulent recueillir à partir d'un fichier journal (Par exemple, statistiques d'utilisation) , veuillez utiliser les fichiers journaux Apache et/ou Tomcat. Ils sont bien formatés et ont ce type d'information. Il existe de nombreux outils pour les analyser, par exemple,[AWStats](https://www.awstats.org),[Kibana de ElasticSearch](https://www.elastic.co/products/kibana)et[JMeter](https://jmeter.apache.org), mais recherchez le web pour trouver le bon outil pour vos fins.

Notez que les fichiers journaux identifient uniquement les utilisateurs comme adresses IP. Il existe des sites Web pour vous aider à obtenir des informations relatives à une adresse IP donnée, par exemple,[Ce qu'estMyIPAdresse](https://whatismyipaddress.com/ip-lookup), mais vous ne pourrez normalement pas trouver le nom de l'utilisateur.

Aussi, à cause de[DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol), l'adresse IP d'un utilisateur donné peut être différente à des jours différents, ou différents utilisateurs peuvent avoir la même adresse IP à des moments différents.

Sinon, vous pouvez utiliser quelque chose comme[Google Analytique](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision). Mais attention : lorsque vous utilisez des services externes comme Google Analytics, vous renoncez à la vie privée de vos utilisateurs en donnant à Google un accès complet à leur activité sur votre site que Google (et d'autres ?) peut garder pour toujours et utiliser à n'importe quelle fin (peut-être pas techniquement, mais probablement dans la pratique) . Vos utilisateurs n'ont pas consenti à cela et ne sont probablement pas conscients qu'ils seront suivis sur votre site Web, tout comme ils ne sont probablement pas conscients de la mesure dans laquelle ils sont suivis sur presque tous les sites Web. De nos jours, beaucoup d'utilisateurs sont très inquiets que tout ce qu'ils font sur le web soit surveillé par ces grandes entreprises (Google, Facebook, etc.) et par le gouvernement, et trouver ceci une intrusion injustifiée dans leur vie (comme dans le livre, 1984) . Cela a conduit de nombreux utilisateurs à installer des produits comme[Insigne de confidentialité](https://www.eff.org/privacybadger/faq)pour minimiser le suivi, utiliser des navigateurs alternatifs comme[Navigateur Tor](https://www.torproject.org/)  (ou désactiver le suivi dans les navigateurs traditionnels) , et d'utiliser des moteurs de recherche alternatifs comme[Plongée de canard](https://duckduckgo.com/). Si vous utilisez un service comme Google Analytics, veuillez au moins documenter son utilisation et les conséquences en modifiant le&lt;standardPolitique de confidentialité&gt; balise dansERDDAP's
\\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml fichier.
    
### Registre des courriels{#e-mail-log} 
*    **CourrielLogYEAR-MM-JJ.txt**   
    ERDDAP™écrit toujours le texte de tous les courriels sortants dans le courriel actuel Fichier LogYEAR-MM-DD.txt dans *BigParent Directory* /logs ( *BigParent Directory* est spécifié dans[configuration.xml](/docs/server-admin/deploy-install#setupxml)) .
    * Si le serveur ne peut pas envoyer des messages électroniques, ou si vous avez configuréERDDAP™ne pas envoyer des messages électroniques, ou si vous êtes simplement curieux, ce fichier est un moyen pratique de voir tous les messages électroniques qui ont été envoyés.
    * Vous pouvez supprimer les fichiers de journaux des jours précédents s'ils ne sont plus nécessaires.
         
### Rapport quotidien{#daily-report} 
Le rapport quotidien contient de nombreuses informations utiles -- toutes les informations de votreERDDAP's[/erddap/status.htmlpage](#status-page)et plus encore.
    * C'est le résumé le plus complet de votreERDDAPLe statut.
    * Entre autres statistiques, il comprend une liste des ensembles de données qui n'ont pas été chargés et les exceptions qu'ils ont générées.
    * Il est généré lorsque vous démarrezERDDAP™  (juste aprèsERDDAP™fini d'essayer de charger tous les ensembles de données) et généré peu après 7 heures du matin.
    * Chaque fois qu'il est généré, il est écrit à[ERDDAPLe fichier log.txt](#log).
    * Chaque fois qu'il est généré, il est envoyé à&lt;e-mailRapports quotidiensà&gt; et&lt;e-mailTout Pour&gt; (qui sont spécifiés dans[configuration.xml](/docs/server-admin/deploy-install#setupxml)) à condition que vous ayez configuré le système de messagerie (dans setup.xml) .

### Page d'état{#status-page} 
Vous pouvez voir le statut de votreERDDAP™de n'importe quel navigateur en allant à&lt;baseUrl&gt;/erddap/status.html
* Cette page est générée dynamiquement, de sorte qu'elle a toujours des statistiques à jour pour votreERDDAP.
* Il comprend des statistiques sur le nombre de requêtes, l'utilisation de la mémoire, les traces de la pile de thread, la tâcheThread, etc.
* Comme la page d'état peut être vue par n'importe qui, elle n'inclut pas autant d'informations que la[Rapport quotidien](#daily-report).
         
### Ajout/modification des ensembles de données{#addingchanging-datasets} 
ERDDAP™relise habituellementdatasets.xmlchaque *loadDatasetsMinMinutes*   (spécifiée dans[configuration.xml](/docs/server-admin/deploy-install#setupxml)) . Pour que vous puissiez apporter des changementsdatasets.xmlà tout moment, même pendantERDDAP™est en train de courir.
Un nouvel ensemble de données sera rapidement détecté, généralement dans les *loadDatasetsMinMinutes* .
Un ensemble de données modifié sera rechargé quand il est *recharger tous les NMinutes* vieux (comme spécifié dansdatasets.xml) .
    
#### Drapeau{#flag} 
*    **[Un fichier d'affichage](#flag)DitERDDAP™pour essayer de recharger un ensemble de données aussi rapidement que possible** 
    
    *   ERDDAP™ne remarquera aucune modification à la configuration d'un jeu de données dansdatasets.xmljusqu'àERDDAP™recharge l'ensemble de données.
         
    * Pour direERDDAP™pour recharger un ensemble de données dès que possible (avant&lt;reloadeChaque NMinutes&gt; ferait en sorte qu'il soit reloadé), mettre un fichier dans *BigParent Directory* /flag ( *BigParent Directory* est spécifié dans[configuration.xml](/docs/server-admin/deploy-install#setupxml)) qui a le même nom que l'ensemble de donnéesdatasetID.
Cela indiqueERDDAP™pour essayer de recharger cet ensemble de données dès que possible.
L'ancienne version de l'ensemble de données restera à la disposition des utilisateurs jusqu'à ce que la nouvelle version soit disponible et échangée atomiquement.
PourEDDGridFromFiles et EDDTable À partir deFiles, l'ensemble de données de rechargement cherchera des fichiers nouveaux ou modifiés, les lira et les incorporera dans l'ensemble de données. Le temps de rechargement dépend donc du nombre de fichiers nouveaux ou modifiés.
Si l'ensemble de données est actif,ERDDAP™supprimera l'ensemble de données.
         
##### Flag des fichiers défectueux{#bad-files-flag} 
* Une variante du répertoire /flag est le répertoire /badFilesFlag. (Ajouté dansERDDAP™v2.12.)   
Si vous mettez un fichier dans le *BigParent Directory* /badFilesFlag répertoire avec undatasetIDcomme nom du fichier (le contenu du fichier n'a aucune importance) , alors dèsERDDAP™voit les mauvaisFiles Fichier d'affichage,ERDDAP™sera :
    
    1. Supprimer le fichier badFilesFlag.
    2. Supprimer les fichiers défectueux.ncfichier (s'il y en a un) , qui a la liste des mauvais fichiers pour cet ensemble de données.
Pour des ensembles de données commeEDDGridSideBySide qui ont des jeux de données pour enfants, cela supprime également les badFiles.ncfichier pour tous les ensembles de données pour enfants.
    3. Rechargez l'ensemble de données dès que possible.
    
Ainsi, cela provoqueERDDAP™pour essayer de nouveau de travailler avec les fichiers précédemment (Par erreur ?) marqué comme mauvais.
         
##### Drapeau dur{#hard-flag} 
* Une autre variante du répertoire /flag est le répertoire /hardFlag. (Ajouté dansERDDAP™v1.74.)   
Si vous mettez un fichier dans *BigParent Directory* /hardFlag avec undatasetIDcomme nom du fichier (le contenu du fichier n'a aucune importance) , alors dèsERDDAP™voit le dur Fichier d'affichage,ERDDAP™sera :
    
    1. Supprimer le fichier hardFlag.
    2. Supprimer l'ensemble de donnéesERDDAP.
    3. Supprimer toutes les informationsERDDAP™a enregistré à propos de cet ensemble de données.
PourEDDGridFromFiles et EDDTable DeFiles sous-classes, cela supprime la base de données interne des fichiers de données et leur contenu.
Pour des ensembles de données commeEDDGridSideBySide qui ont des jeux de données enfants, cela supprime également la base de données interne des fichiers de données et leur contenu pour tous les jeux de données enfants.
    4. Rechargez l'ensemble de données.
PourEDDGridFromFiles et EDDTable DeFiles sous-classes, cela provoqueERDDAP™pour relire **Tous** des fichiers de données. Ainsi, le temps de rechargement dépend du nombre total de fichiers de données dans l'ensemble de données. Parce que l'ensemble de données a été supprimé deERDDAP™lorsque le hardFlag a été remarqué, l'ensemble de données ne sera pas disponible jusqu'à la fin du rechargement. Soyez patient. Regardez dans le[Log.txt](#log)Si vous voulez voir ce qui se passe.
    
La variante hardFlag supprime les informations stockées de l'ensemble de données même si l'ensemble de données n'est pas actuellement chargé dansERDDAP.
    
Dur Les drapeaux sont très utiles lorsque vous faites quelque chose qui provoque un changement dans la façon dontERDDAP™lit et interprète les données source, par exemple, lorsque vous installez une nouvelle version deERDDAP™ou lorsque vous avez modifié la définition d'un ensemble de donnéesdatasets.xml
    
* Le contenu du drapeau, badFilesFlag et les fichiers hardFlag ne sont pas pertinents.ERDDAP™il suffit de regarder le nom du fichier pour obtenir ledatasetID.
     
* Entre les recharges majeures,ERDDAP™recherche continuellement les fichiers drapeau, badFilesFlag et hardFlag.
     
* Notez que lorsqu'un jeu de données est rechargé, tous les fichiers *BigParent Directory* /[cache](#cached-responses)/ *datasetID* répertoire sont supprimés. Cela comprend:.ncet les fichiers d'image qui sont normalement mis en cache pendant ~15 minutes.
     
* Notez que si l'ensemble de données xml comprend[actif](/docs/server-admin/datasets#active), un drapeau provoque l'inactivité de l'ensemble de données (si elle est active) , et en tout cas, pas rechargé.
     
* À tout momentERDDAP™exécute LoadDatasets pour effectuer un rechargement majeur (le rechargement programmé contrôlé par&lt;loadDatasetsMinMinutes&gt;) ou un rechargement mineur (à la suite d'un drapeau externe ou interne) ,ERDDAP™lit tout&lt;décompresséCacheMaxGB&gt;,&lt;DécompresséCacheMaxMinutesOld&gt;,&lt;utilisateur&gt;,&lt;requêteBlacklist&gt;,&lt;LentDownTroubleMillis&gt;, et&lt;abonnementEmailBlacklist&gt; tags et passe aux nouveaux paramètres. Donc vous pouvez utiliser un drapeau comme un moyen d'obtenirERDDAP™pour signaler les changements à ces étiquettes dès que possible.

##### Définir l'option Dataset{#set-dataset-flag} 
*  ERDDAP™dispose d'un service web afin que les drapeaux puissent être définis via des URL.
    
    * Par exemple,
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (C'est un faux drapeau Clé) définira un drapeau pour l'ensemble de données rPmelTao.
    * Il y a une clé de drapeau différente pour chaquedatasetID.
    * Les administrateurs peuvent voir une liste d'URL de drapeau pour tous les ensembles de données en regardant au bas de leur[Rapport quotidien](#daily-report)E-mail.
    * Les administrateurs devraient traiter ces URL comme confidentielles, car ils donnent à quelqu'un le droit de réinitialiser un ensemble de données à volonté.
    * Si vous pensez que les clés du drapeau sont tombées entre les mains de quelqu'un qui les abuse, vous pouvez changer&lt;flagKeyKey&gt; dans[configuration.xml](/docs/server-admin/deploy-install#setupxml)et redémarrerERDDAPForcerERDDAP™pour générer et utiliser un ensemble différent de flagKeys.
    * Si vous changez&lt;flagKeyKey&gt;, supprimer tous les anciens abonnements (voir la liste dans votre rapport quotidien) et n'oubliez pas d'envoyer les nouvelles URL aux personnes que vous voulez avoir.
    
Le système du drapeau peut servir de base à un mécanisme plus efficace de signalementERDDAP™quand recharger un jeu de données. Par exemple, vous pouvez définir un ensemble de données&lt;recharger chaque NMinutes&gt; à un grand nombre (Par exemple, 10080 = 1 semaine) . Ensuite, quand vous savez que l'ensemble de données a changé (peut-être parce que vous avez ajouté un fichier au répertoire de données de l'ensemble de données) , définissez un drapeau pour que l'ensemble de données soit rechargé dès que possible. Les drapeaux sont généralement vus rapidement. Mais si le thread LoadDatasets est déjà occupé, il peut être un moment avant qu'il soit disponible pour agir sur le drapeau. Mais le système de drapeau est beaucoup plus réactif et beaucoup plus efficace que le réglage&lt;recharger chaque NMinutes&gt; en un petit nombre.
    
#### Suppression des ensembles de données{#removing-datasets} 
Si un ensemble de données est actifERDDAP™et vous voulez le désactiver temporairement ou définitivement :
1. Endatasets.xmlpour l'ensemble de données, ensemble[actif](/docs/server-admin/datasets#active)dans la balise dataset.
2. AttendezERDDAP™pour supprimer l'ensemble de données lors du prochain rechargement majeur ou[définir un drapeau](#flag)pour l'ensemble de données à indiquerERDDAP™de noter ce changement dès que possible. Quand tu fais ça,ERDDAP™ne jette aucune information qu'il peut avoir stockée sur l'ensemble de données et ne fait certainement rien aux données réelles.
3. Ensuite, vous pouvez laisser l'ensemble de données actifdatasets.xmlou le retirer.
         
#### Quand les ensembles de données sont-ils rechargés?{#when-are-datasets-reloaded} 
Un thread appelé RunLoadDatasets est le thread maître qui contrôle lorsque les datasets sont rechargés. Exécution Des boucles de données pour toujours :

1. RunLoadDatasets note l'heure actuelle.
2. RunLoadDatasets lance un thread LoadDatasets pour faire un "majorLoad". Vous pouvez voir des informations sur le majorLoad actuel/précédent en haut de votreERDDAP's
    [/erddap/status.htmlpage](#status-page)  (par exemple,[exemple de page d'état](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) .
    
    1. LoadDatasets fait une copie dedatasets.xml.
    2. LoadDatasets lit par la copie dedatasets.xmlet, pour chaque ensemble de données, voir si l'ensemble de données doit être (re) chargé ou enlevé.
        * Si[drapeau](#flag)le fichier existe pour cet ensemble de données, le fichier est supprimé et l'ensemble de données est supprimé si actif (re) chargé si actif (indépendamment de l'âge de l'ensemble de données) .
        * Si le groupe dataset.xml de l'ensemble de données a actif (false)" et que l'ensemble de données est actuellement chargé (actif) , il est déchargé (enlevé) .
        * Si l'ensemble de données est actif et que l'ensemble de données n'est pas déjà chargé, il est chargé.
        * Si le jeu de données est actif et que le jeu de données est déjà chargé, le jeu de données est rechargé si l'âge du jeu de données (temps depuis la dernière charge) est supérieur à&lt;recharger Chaque NMinutes&gt; (par défaut = 10080 minutes) , sinon, l'ensemble de données est laissé seul.
    3. LoadDatasets se termine.
    
Le fil RunLoadDatasets attend que le fil LoadDatasets finisse. Si LoadDatasets prend plus de temps que loadDatasets Minutes (comme spécifié dans setup.xml) , RunLoadDatasets interrompt le thread LoadDatasets. Idéalement, LoadDatasets remarque l'interruption et se termine. Mais si elle ne remarque pas l'interruption en une minute, RunLoadDatasets appelle loadDatasets. Arrêter () , ce qui est indésirable.
3. Alors que le temps depuis le début du dernier majorLoad est inférieur à la chargeDatasets Minutes (comme spécifié dans setup.xml, p.ex. 15 minutes) , RunLoadDatasets recherche à plusieurs reprises[drapeau](#flag)fichiers dans le *BigParent Directory* répertoire /flag. Si un ou plusieurs fichiers drapeau sont trouvés, ils sont supprimés, et RunLoadDatasets lance un thread LoadDatasets pour faire un "minorLoad" (MajorLoad=false) . Vous ne pouvez pas voir des informations mineures sur votreERDDAP's[/erddap/status.htmlpage](#status-page).
    1. LoadDatasets fait une copie dedatasets.xml.
    2. LoadDatasets lit par la copie dedatasets.xmlet, pour chaque ensemble de données pour lequel il y avait un fichier drapeau:
        * Si le groupe dataset.xml de l'ensemble de données a actif (false)" et que l'ensemble de données est actuellement chargé (actif) , il est déchargé (enlevé) .
        * Si l'ensemble de données est actif, (re) chargé, quel que soit son âge. Les ensembles de données non marqués sont ignorés.
    3. LoadDatasets se termine.
4. Exécution Les ensembles de données remontent à l'étape 1.

Remarques:
* Début
Quand vous redémarrezERDDAP™, chaque jeu de données avec actif „true" est chargé.
* Cache
Quand un ensemble de données est (re) chargé, sa cache (y compris les fichiers de réponse de données et/ou les fichiers image) est vidé.
* Nombreux ensembles de données
Si vous avez beaucoup de jeux de données et/ou un ou plusieurs jeux de données sont lents à (re) charge, un thread LoadDatasets peut prendre beaucoup de temps pour terminer son travail, peut-être même plus longtemps que loadDatasets Minutes.
* Un fil de données de chargement
Il n'y a jamais plus d'un thread LoadDatasets en cours d'exécution. Si un drapeau est défini lorsque LoadDatasets est déjà en cours d'exécution, le drapeau ne sera probablement pas remarqué ou activé jusqu'à ce que le thread LoadDatasets se termine. Tu pourrais dire : "C'est stupide. Pourquoi ne pas simplement démarrer un tas de nouveaux threads pour charger des ensembles de données?" Mais si vous avez beaucoup de datasets qui obtiennent des données d'un serveur distant, même un thread LoadDatasets mettra une pression importante sur le serveur distant. La même chose est vraie si vous avez beaucoup de jeux de données qui obtiennent des données à partir de fichiers sur un RAID. Il y a une diminution rapide des retours d'avoir plus d'un thread LoadDatasets.
* Drapeau = SAP
Définir un drapeau indique simplement que l'ensemble de données doit être (re) chargé dès que possible, pas nécessairement immédiatement. Si aucun thread LoadDatasets n'est en cours d'exécution, le jeu de données commencera à être rechargé en quelques secondes. Mais si un thread LoadDatasets est en cours d'exécution, l'ensemble de données ne sera probablement pas rechargé avant que le thread LoadDatasets ne soit terminé.
* Fichier d'affichage supprimé
En général, si vous mettez un fichier drapeau dans le *BigParent Directory* répertoire /erddap/flag (en visitant le drapeau de l'ensemble de données Url ou y mettre un fichier réel) , l'ensemble de données sera habituellement rechargé très peu après que ce fichier drapeau est supprimé.
* Drapeau versus Petit rechargement Tous les NMinutes
Si vous avez un moyen externe de savoir quand un ensemble de données doit être rechargé et si cela vous convient, le meilleur moyen de vous assurer qu'un ensemble de données est toujours à jour est de configurer son rechargement Chaque NMinutes à un grand nombre (10080 ?) et fixe un drapeau (via un script ?) chaque fois qu'il faut le recharger. C'est le système quiEDDGridDeErddap et EDDTableDeErddap utilisent recevoir des messages que l'ensemble de données doit être rechargé.
* Regardez dans log.txt
Beaucoup d'informations pertinentes sont écrites au *BigParent Directory* fichier /logs/log.txt. Si les choses ne marchent pas comme prévu, regardez le journal. txt vous permet de diagnostiquer le problème en trouvant exactement ceERDDAP™Oui.
    
    * Rechercher "majorLoad=true" pour le début des principaux threads LoadDataset.
    * Rechercher "majorLoad=false" pour le début des threads LoadDatasets mineurs.
    * Rechercher un ensemble de données donnédatasetIDpour information à ce sujet étant (re) chargé ou interrogé.
        
          
         
#### Réponses cachées{#cached-responses} 
En général,ERDDAP™ne cache pas (magasin) réponses aux demandes des utilisateurs. La justification était que la plupart des demandes seraient légèrement différentes afin que le cache ne serait pas très efficace. Les plus grandes exceptions sont les requêtes de fichiers image (qui sont mis en cache depuis les navigateurs et les programmes commeGoogle Earthsouvent demander des images) et demandes.ncfichiers (parce qu'ils ne peuvent pas être créés à la volée) .ERDDAP™stocke les fichiers mis en cache dans un répertoire différent : *BigParent Directory* Cache/ *datasetID* car un seul répertoire cache peut avoir un grand nombre de fichiers qui pourraient devenir lents à accéder.
Les fichiers sont supprimés du cache pour l'une des trois raisons suivantes :
* Tous les fichiers de ce cache sont supprimés lorsqueERDDAP™est redémarré.
* Périodiquement, tout dossier plus que&lt;cacheMinutes&gt; vieux (comme spécifié dans[configuration.xml](/docs/server-admin/deploy-install#setupxml)) sera supprimé. Suppression des fichiers dans le cache en fonction de l'âge (pas le moins utilisé) veille à ce que les fichiers ne restent pas dans le cache très longtemps. Bien que cela puisse sembler comme une demande donnée devrait toujours renvoyer la même réponse, ce n'est pas vrai. Par exemple,tabledaprequête qui inclut &time&gt; *certains Heure* changera si de nouvelles données arrivent pour l'ensemble de données. Et une demande de griddap qui comprend\\[dernier\\]pour la dimension temporelle changera si de nouvelles données arrivent pour l'ensemble de données.
* Les images montrant les conditions d'erreur sont mises en cache, mais seulement pendant quelques minutes (C'est une situation difficile) .
* Chaque fois qu'un jeu de données est rechargé, tous les fichiers du cache de cet ensemble de données sont supprimés. Parce que les demandes peuvent être"last"index dans un ensemble de données maillées, les fichiers dans le cache peuvent devenir invalides lorsqu'un ensemble de données est rechargé.
         
#### Informations stockées sur le jeu de données{#stored-dataset-information} 
Pour tous les types de ensembles de données,ERDDAP™recueille beaucoup d'informations lorsqu'un jeu de données est chargé et garde cela en mémoire. Cela permetERDDAP™répondre très rapidement aux recherches, aux demandes de listes de ensembles de données et aux demandes d'informations sur un ensemble de données.

Pour quelques types de séries de données (notammentEDDGridBien reçu, EDDTableCopy,EDDGridDe *Xxx* Fichiers, et EDDTableFrom *Xxx* Fichiers) ,ERDDAP™stocke sur le disque certaines informations sur l'ensemble de données qui est réutilisé lorsque l'ensemble de données est rechargé. Cela accélère grandement le processus de rechargement.

* Certains des fichiers d'information des ensembles de données sont lisibles par l'homme.jsonfichiers et sont stockés dans *BigParent Directory* /ensemble de données/ *last2LettersOfDatasetID/datasetID* .
*   ERDDAP™ne supprime ces fichiers que dans des situations inhabituelles, par exemple, si vous ajoutez ou supprimez une variable de l'ensemble de donnéesdatasets.xmlUn morceau.
* La plupart des changements à un ensemble de donnéesdatasets.xmlmorceaux (Par exemple, modifier un attribut global ou un attribut variable) ne nécessite pas que vous supprimiez ces fichiers. Un rechargement régulier de données permettra de gérer ces types de modifications. Vous pouvez le direERDDAP™pour recharger un jeu de données dès que possible en définissant un[drapeau](#flag)pour l'ensemble de données.
* De même, l'ajout, la suppression ou le changement de fichiers de données seront traités lorsqueERDDAP™recharge un ensemble de données. MaisERDDAP™remarquera ce type de changement rapidement et automatiquement si l'ensemble de données utilise le [&lt;mise à jour de EveryNMillis&gt;] (/docs/serveur-admin/datasets#updateeverynnmillis) système.
* Il ne devrait que rarement être nécessaire pour vous de supprimer ces fichiers. La situation la plus courante où vous devez forcerERDDAP™pour supprimer les informations stockées (parce qu'il est obsolète/incorrect et ne sera pas automatiquement corrigé parERDDAP) est lorsque vous apportez des modifications à l'ensemble de donnéesdatasets.xmlun morceau qui affecte commentERDDAP™interprète les données dans les fichiers de données sources, par exemple, en modifiant la chaîne de format de la variable de temps.
* Pour supprimer les fichiers d'informations stockées d'un ensemble de donnéesERDDAP™qui court (même si l'ensemble de données n'est pas actuellement chargé) , définir un[dur Drapeau](#hard-flag)pour cet ensemble de données. Rappelez-vous que si un ensemble de données est une agrégation d'un grand nombre de fichiers, recharger l'ensemble de données peut prendre beaucoup de temps.
* Pour supprimer les fichiers d'informations stockés d'un ensemble de données lorsqueERDDAP™ne cours pas, cours[DasDds](/docs/server-admin/datasets#dasdds)pour cet ensemble de données (ce qui est plus facile que de déterminer dans quel répertoire l'info est située et de supprimer les fichiers à la main) . Rappelez-vous que si un ensemble de données est une agrégation d'un grand nombre de fichiers, recharger l'ensemble de données peut prendre beaucoup de temps.
         
### État de la mémoire{#memory-status} 
ERDDAP™ne devrait jamais s'écraser ou geler. Si c'est le cas, l'une des causes les plus probables est l'insuffisance de mémoire. Vous pouvez surveiller l'utilisation de la mémoire en regardant la page web status.html, qui comprend une ligne comme

0 gc appels, 0 dépôt de demandes et 0 danger MemoryEmails depuis le dernier grand ensemble de données de chargement

 (ces événements sont progressivement plus graves)   
et MB inUse et gc Colonnes Appels dans le tableau des statistiques. Vous pouvez dire comment la mémoire a stressé votreERDDAP™C'est en regardant ces chiffres. Des nombres plus élevés indiquent plus de stress.

* MB inUse devrait toujours être moins de la moitié de la[Configuration de la mémoire \\-Xmx](/docs/server-admin/deploy-install#memory). Les chiffres plus importants sont mauvais signe.
* gc appels indique le nombre de foisERDDAP™appelé le collecteur d'ordures pour essayer d'atténuer l'utilisation de la mémoire élevée. Si ça doit être &gt;100, c'est un signe de sérieux problèmes.
* remise indique le nombre de demandes reçues (avec l'erreur HTTP 503, Service Indisponible) parce que l'utilisation de la mémoire était déjà trop élevée. Idéalement, aucune demande ne devrait être déposée. C'est bon si quelques demandes sont versées, mais un signe de sérieux problèmes si beaucoup sont versées.
* dangereux MemoryEmails - Si l'utilisation de la mémoire devient dangereusement élevée,ERDDAP™envoie un e-mail aux adresses e-mail énumérées dans&lt;e-mailTout Pour&gt; (dans setup.xml) avec une liste des requêtes actives de l'utilisateur. Comme le dit le courriel, veuillez transmettre ces courriels à Chris. John à Noaa. nous pouvons utiliser l'information pour améliorer les versions futures deERDDAP.
     

Si votreERDDAP™est stressé par la mémoire:
* Envisagez d'affecter davantage de mémoire de votre serveur àERDDAP™en changeant le Tomcat[Réglage de la mémoire ‐Xmx](/docs/server-admin/deploy-install#memory).
* Si vous avez déjà alloué autant de mémoire que vous pouvez àERDDAP™via -Xmx, envisagez d'acheter plus de mémoire pour votre serveur. La mémoire est bon marché (comparé au prix d'un nouveau serveur ou de votre temps) - Oui. Puis augmenter -Xmx.
* Endatasets.xml, ensemble&lt;nGridThreads&gt; à 1, ensemble&lt;nTableThreads&gt; à 1, et ensemble&lt;ipAddressMaxDemandesActives&gt; à 1.
* Regardez les demandes dans log.txt pour inefficace ou gênant (mais légitime) les demandes. Ajouter leurs adresses IP à&lt;requêteBlacklist&gt; endatasets.xml. Le message d'erreur de la liste noire inclutERDDAP™adresse e-mail de l'administrateur avec l'espoir que ces utilisateurs vous contacteront afin que vous puissiez travailler avec eux à utiliserERDDAP™plus efficacement. Il est bon de conserver une liste des adresses IP que vous avez sur la liste noire et pourquoi, afin que vous puissiez travailler avec les utilisateurs s'ils vous contactent.
* Regardez les requêtes dans log.txt pour les demandes des utilisateurs malveillants. Ajouter leurs adresses IP à&lt;requêteBlacklist&gt; endatasets.xml. Si des requêtes similaires proviennent de plusieurs adresses IP similaires, vous pouvez utiliser certains services qui-est (Par exemple,[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) pour découvrir la gamme d'adresses IP de cette source et blacklist toute la gamme. Voir [&lt;requestBlacklist&gt; documentation] (/docs/serveur-admin/données#requestblacklist) .
         
#### De mémoire{#outofmemoryerror} 
Quand vous avez installéERDDAP™, vous spécifiez la quantité maximale de mémoire queJavapeut utiliser via le[Configuration \\-Xmx](/docs/server-admin/deploy-install#memory). SiERDDAP™Il a besoin de plus de mémoire que ça, il lancera une java. Lang. De la mémoire Error.ERDDAP™fait beaucoup de vérification pour lui permettre de gérer cette erreur gracieusement (Par exemple, une demande gênante échouera, mais le système conservera son intégrité.) . Mais parfois, l'erreur nuit à l'intégrité du système et vous devez redémarrerERDDAP. J'espère que c'est rare.

La solution rapide et facile à un OutOfMemoryError est d'augmenter le[Configuration \\-Xmx](/docs/server-admin/deploy-install#memory), mais vous ne devriez jamais augmenter le réglage -Xmx à plus de 80% de la mémoire physique dans le serveur (Par exemple, pour un serveur de 10 Go, ne définissez pas -Xmx au-dessus de 8 Go) . La mémoire est relativement bon marché, donc il peut être une bonne option pour augmenter la mémoire dans le serveur. Mais si vous avez maximisé la mémoire dans le serveur ou pour d'autres raisons ne peut pas l'augmenter, vous devez traiter plus directement avec la cause de l'OutOfMemoryError.

Si vous regardez dans le[Log.txt](#log)fichier pour voir quoiERDDAP™a été fait lorsque l'erreur est apparue, vous pouvez généralement obtenir un bon indice sur la cause de l'OutOfMemoryError. Il y a beaucoup de causes possibles, notamment:

* Un seul énorme fichier de données peut causer l'OutOfMemoryError, notamment, d'énormes fichiers de données ASCII. Si c'est le problème, il devrait être évident parce queERDDAP™ne chargera pas l'ensemble de données (pour les ensembles de données tabulaires) ou lire les données de ce fichier (pour les ensembles de données maillés) . La solution, si possible, est de diviser le fichier en plusieurs fichiers. Idéalement, vous pouvez diviser le fichier en morceaux logiques. Par exemple, si le fichier a une valeur de 20 mois de données, le diviser en 20 fichiers, chacun avec une valeur de 1 mois de données. Mais il y a des avantages même si le fichier principal est séparé arbitrairement. Cette approche présente de multiples avantages : a) Cela réduira la mémoire nécessaire pour lire les fichiers de données à 1/20ème, car un seul fichier est lu à la fois. b) Souvent,ERDDAP™peut traiter les demandes beaucoup plus rapidement parce qu'il n'a qu'à regarder dans un ou quelques fichiers pour trouver les données pour une demande donnée. c) Si la collecte de données est en cours, alors les 20 fichiers existants peuvent rester inchangés, et vous devez seulement modifier un, petit, nouveau fichier pour ajouter la valeur de données du mois suivant à l'ensemble de données.
* Une seule demande énorme peut causer l'OutOfMemoryError. En particulier,orderByles options ont la réponse entière en mémoire pendant une seconde (Par exemple, faire une sorte) . Si la réponse est énorme, elle peut conduire à l'erreur. Il y aura toujours des demandes qui, de diverses manières, sont trop grandes. Vous pouvez résoudre le problème en augmentant le paramètre -Xmx. Ou, vous pouvez encourager l'utilisateur à faire une série de petites requêtes.
* Il est peu probable qu'un grand nombre de fichiers causeraient l'index des fichiersERDDAP™crée pour être si grand que ce fichier causerait l'erreur. Si nous supposons que chaque fichier utilise 300 octets, alors 1 000 000 de fichiers ne prend que 300 Mo. Mais les ensembles de données avec un grand nombre de fichiers de données causent d'autres problèmes pourERDDAP, notamment, il faut beaucoup de temps pourERDDAP™pour ouvrir tous ces fichiers de données lors de la réponse à une demande de données de l'utilisateur. Dans ce cas, la solution peut être d'agréger les fichiers afin qu'il y ait moins de fichiers de données. Pour les ensembles de données tabulaires, il est souvent génial si vous enregistrez les données à partir de l'ensemble de données actuel dans[FC Géométries d'échantillonnage discrètes (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Fichiers de données d'array en mouvement (demande.ncFichiers CF à partirERDDAP) puis faire un nouvel ensemble de données. Ces fichiers peuvent être traités très efficacement avecERDDAP's[EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles). S'ils sont organisés logiquement (avec des données pour un morceau d'espace et de temps) ,ERDDAP™peut extraire les données très rapidement.
* Pour les ensembles de données tabulaires qui utilisent le [&lt;subsetVariables&gt;] (/docs/serveur-admin/datasets#subsetvariables) attribut,ERDDAP™fait une table de combinaisons uniques des valeurs de ces variables. Pour des ensembles de données énormes ou lorsque&lt;subsetVariables&gt; est mal configurée, cette table peut être assez grande pour provoquer OutOfMemoryErrors. La solution est de supprimer les variables de la liste des&lt;subsetVariables&gt; pour lesquels il y a un grand nombre de valeurs, ou supprimer les variables au besoin jusqu'à ce que la taille de ce tableau soit raisonnable. Les parties deERDDAP™qui utilisent lessubsetVariablessystème ne fonctionne pas bien (Par exemple, les pages Web se chargent très lentement) lorsqu'il y a plus de 100 000 lignes dans ce tableau.
* Il est toujours possible que plusieurs grandes requêtes simultanées (sur un très occupéERDDAP) peut se combiner pour causer des problèmes de mémoire. Par exemple, 8 requêtes, chacune utilisant 1 Go chacune, causeraient des problèmes pour une configuration -Xmx=8 Go. Mais il est rare que chaque demande soit au maximum de son utilisation de mémoire simultanément. Et vous pourriez facilement voir que votreERDDAP™est vraiment occupé avec de grandes demandes. Mais c'est possible. Il est difficile de résoudre ce problème autrement qu'en augmentant le réglage -Xmx.
* Il y a d'autres scénarios. Si vous regardez la[Log.txt](#log)fichier pour voir quoiERDDAP™a été fait lorsque l'erreur a surgi, vous pouvez généralement obtenir un bon indice de la cause. Dans la plupart des cas, il existe un moyen de minimiser ce problème (voir ci-dessus) , mais parfois vous avez juste besoin de plus de mémoire et un réglage plus haut -Xmx.
         
### Trop de fichiers ouverts{#too-many-open-files} 
En commençant parERDDAP™v2.12,ERDDAP™a un système pour surveiller le nombre de fichiers ouverts (qui inclut des sockets et d'autres choses, pas seulement des fichiers) dans Tomcat sur les ordinateurs Linux. Si certains fichiers ne sont jamais fermés par erreur (une "fuite de ressources") , le nombre de fichiers ouverts peut augmenter jusqu'à ce qu'il dépasse le maximum autorisé par le système d'exploitation et de nombreuses choses vraiment mauvaises se produisent. Donc maintenant, sur les ordinateurs Linux (car les informations ne sont pas disponibles pour Windows) :

* Il y a une colonne "Open Files" à l'extrême droite de la page web status.html montrant le pourcentage de fichiers maximum ouverts. Sur Windows, ça montre juste "?".
* QuandERDDAP™génère ces informations à la fin de chaque grand jeu de données recharge, il va imprimer dans le journal. Fichier txt & #160;:
openFileCount= *actuel* de max= *max* %= *Pourcentage* 
* Si le pourcentage est &gt; 50%, un email est envoyé à laERDDAP™administrateur et l'email Tout Aux adresses e-mail.

Si le pourcentage est de 100%,ERDDAP™est dans de terribles ennuis. Ne laisse pas ça arriver.
Si le pourcentage est &gt;75%,ERDDAP™est proche de terribles problèmes. Ça ne va pas.
Si le pourcentage est supérieur à 50%, il est très possible qu'un pic provoque le pourcentage à frapper 100.
Si le pourcentage est jamais supérieur à 50%, vous devez:
* Augmenter le nombre maximum de fichiers ouverts autorisés par :
    * Faire ces changements chaque fois avant de commencer tomcat (les mettre dans le fichier startup.sh de Tomcat ?) :
ulimit -Hn 16384
ulimit -Sn 16384
    * Ou faire un changement permanent en éditant (comme racine) /etc/security/limits.conf et ajouter les lignes:
tomcat soft nofile 16384
tomcat dur aucun fichier 16384
Ces commandes supposent que l'utilisateur exécutant Tomcat est appelé "tomcat".
Sur de nombreuses variantes Linux, vous devez redémarrer le serveur pour appliquer ces modifications. Pour les deux options, le "16384" ci-dessus est un exemple. Vous choisissez le numéro qui vous semble le mieux.
* RedémarrerERDDAP. Le système d'exploitation fermera tous les fichiers ouverts.
         
### Demandes rejetées{#failed-requests} 
*    **Activité inhabituelle: &gt;25% des demandes ont échoué**   
Dans le cadre de chaque rechargementDatasets, qui est généralement toutes les 15 minutes,ERDDAP™examine le pourcentage de demandes qui ont échoué depuis le dernier rechargementDatasets. Si elle est &gt; 25 %,ERDDAP™envoie un email auERDDAP™administrateur avec le sujet « Activité inhabituelle : &gt; 25 % des demandes ont échoué ». Ce courriel comprend un décompte situé près du bas intitulé « Adresse IP du demandeur » (Échec)   (depuis les derniers grands ensembles de données de charge) ". Cherchez ça. Il vous indique l'adresse IP des ordinateurs qui ont fait les requêtes les plus ratées. Vous pouvez ensuite rechercher ces adresses IP dans le\\[BigParent Directory\\]/logs/[Log.txt](#log)fichier et voir quel type de requêtes ils font.
    
Vous pouvez utiliser le numéro IP de l'utilisateur (par exemple, avec[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) essayer de savoir qui ou ce que l'utilisateur est. Parfois cela vous dira assez exactement qui est l'utilisateur (Par exemple, c'est un moteur de recherche) . La plupart du temps, ça te donne juste un indice (Par exemple, c'est un ordinateur d'amazonaws, c'est une université, c'est quelqu'un dans une ville spécifique.) .
    
En regardant la requête réelle, le numéro IP, et le message d'erreur (tous des[Log.txt](#log)) Pour une série d'erreurs, vous pouvez généralement comprendre ce qui va mal. D'après mon expérience, il y a quatre causes communes de nombreuses demandes rejetées :
    
1) Les demandes sont malveillantes (Par exemple, à la recherche de faiblesses en matière de sécurité ou à la présentation de demandes, puis à leur annulation avant leur achèvement.) . Vous devriez utiliser&lt;requêteBlacklist&gt; endatasets.xmlpour noircir ces adresses IP.
    
2) Un moteur de recherche est naïvement essayer les URL listées dansERDDAP™pages Web et documents ISO 19115. Par exemple, il ya beaucoup d'endroits qui listent la baseOPeNDAPURL, par exemple, https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST , auquel l'utilisateur est censé ajouter un type de fichier (Par exemple, .das, .dds, .html) . Mais le moteur de recherche ne le sait pas. Et la requête à l'URL de base échoue. Une situation connexe est lorsque le moteur de recherche génère des requêtes bizarres ou tente de remplir des formulaires afin d'accéder à des pages Web "cachées". Mais les moteurs de recherche font souvent un mauvais travail de cela, conduisant à des échecs. La solution est : créer un[robots.txt](#robotstxt)fichier.
    
3) Certains utilisateurs lancent un script qui demande à plusieurs reprises quelque chose qui n'est pas là. Peut-être est-ce un ensemble de données qui existait, mais est parti maintenant (temporairement ou définitivement) . Souvent, les Scripts ne s'attendent pas à cela et donc ne le traitent pas intelligemment. Donc le script continue de faire des requêtes et les demandes continuent à échouer. Si vous pouvez deviner qui est l'utilisateur (à partir du numéro IP ci-dessus) , contactez-les et dites-leur que l'ensemble de données n'est plus disponible et demandez-leur de modifier leur script.
    
4) Quelque chose ne va vraiment pas avec certains ensembles de données. Habituellement,ERDDAP™rendra l'ensemble de données perturbé inactif. Parfois, ce n'est pas le cas, donc toutes les requêtes à elle conduisent juste à des erreurs. Si oui, corrigez le problème avec l'ensemble de données ou (si vous ne pouvez pas) définir l'ensemble de données à[actif](/docs/server-admin/datasets#active). Bien sûr, cela peut conduire au problème no 2.
    
Parfois, les erreurs ne sont pas si mauvaises, notamment siERDDAP™peut détecter l'erreur et répondre très rapidement (&lt;=1ms). Vous pouvez donc décider de ne rien faire.
    
Si tout le reste échoue, il y a une solution universelle : ajouter le numéro IP de l'utilisateur au [&lt;requêteBlacklist&gt;] (/docs/serveur-admin/données#requestblacklist) . Ce n'est pas une option aussi mauvaise ou aussi radicale qu'elle pourrait le paraître. L'utilisateur obtiendra alors un message d'erreur disant qu'il a été sur la liste noire et leur disant votre (desERDDAP™de l'administrateur) adresse électronique. Parfois, l'utilisateur vous contactera et vous pourrez résoudre le problème. Parfois, l'utilisateur ne vous contacte pas et vous verrez exactement le même comportement venant d'un numéro IP différent le lendemain. Blacklist le nouveau numéro IP et espère qu'ils obtiendront le message. (Ou c'est ton Jour de la Gorge, dont tu ne t'échapperas jamais. Désolé.) 
    
### robots.txt{#robotstxt} 
Les entreprises de moteurs de recherche utilisent des rampeurs web (Par exemple, Google Bot) d'examiner toutes les pages du web pour ajouter le contenu aux moteurs de recherche. PourERDDAP™, c'est fondamentalement bon.ERDDAP™a beaucoup de liens entre les pages, de sorte que les rampeurs trouveront toutes les pages Web et les ajouteront aux moteurs de recherche. Ensuite, les utilisateurs des moteurs de recherche seront en mesure de trouver des ensembles de données sur votreERDDAP.
    
Malheureusement, certains rampeurs de toile (Par exemple, Google Bot) sont maintenant en train de remplir et de soumettre des formulaires afin de trouver du contenu supplémentaire. Pour les sites Web de commerce, c'est génial. Mais c'est terrible pourERDDAP™parce que ça mène à une **infini** nombre de tentatives indésirables et inutiles pour ramper les données réelles. Cela peut conduire à plus de demandes de données que de tous les autres utilisateurs combinés. Et il remplit le moteur de recherche avec des sous-ensembles inutile des données réelles.
    
Pour dire aux crawlers web d'arrêter de remplir des formulaires et simplement généralement ne pas regarder les pages Web qu'ils n'ont pas besoin de regarder, vous devez créer un fichier texte appelé[robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)dans le répertoire racine de la hiérarchie de documents de votre site Web afin qu'il puisse être vu par n'importe qui comme, par exemple, http://*www.your.domain*/robots.txt .
Si vous créez de nouveaux robots. fichier txt, c'est un bon début:
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
     (Mais remplacer *Votre.institutions.url* avec votreERDDAPURL de base.)   
Il peut prendre quelques jours pour que les moteurs de recherche remarquent et pour que les changements prennent effet.
     
### sitemap.xml{#sitemapxml} 
Comme[ https://www.sitemaps.org ](https://www.sitemaps.org/)site web dit:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

En fait, depuisERDDAP™estRESTful, araignées moteur de recherche peut facilement ramper votreERDDAP. Mais ils ont tendance à le faire plus souvent (Tous les jours &#33;) que nécessaire (mensuel ?) .

* Étant donné que chaque moteur de recherche peut ramper votre entierERDDAP™Chaque jour, cela peut conduire à beaucoup de demandes inutiles.
* AlorsERDDAP™génère un fichier sitemap.xml pour votreERDDAP™qui dit aux moteurs de recherche que votreERDDAP™Il suffit de ramper tous les mois.
* Vous devriez ajouter une référence àERDDAP's sitemap.xml à votre[robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)fichier & #160;:
Sitemap: http://**www.yoursite.org**/erddap/sitemap.xml
 
* Si cela ne semble pas obtenir le message aux rampeurs, vous pouvez dire aux différents moteurs de recherche sur le fichier sitemap.xml en visitant ces URLs (mais change **Votre institution** à l'acronyme ou à l'abréviation de votre institution **www.votresite.org** à votreERDDAPURL) :
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I penser) vous avez juste besoin de ping chaque moteur de recherche une fois, pour tout le temps. Les moteurs de recherche détectent ensuite périodiquement les changements à sitemap.xml.
     
### Diffusion des données / Distribution des données Réseaux:PushetPullTechnologie{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* Normalement,ERDDAP™agit comme intermédiaire: il prend une demande d'un utilisateur; obtient des données d'une source de données distante; reformate les données; et les envoie à l'utilisateur.
*   [PullTechnologie](https://en.wikipedia.org/wiki/Pull_technology):ERDDAP™a également la capacité d'obtenir activement toutes les données disponibles à partir d'une source de données distante et[stocker une copie locale des données](/docs/server-admin/datasets#eddgridcopy).
*   [PushTechnologie](https://en.wikipedia.org/wiki/Push_technology): En utilisantERDDAP's[services d'abonnement](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions), d'autres serveurs de données peuvent être notifiés dès que de nouvelles données sont disponibles afin qu'ils puissent demander les données (en tirant les données) .
*   ERDDAP's[EDDGridDeErddap](/docs/server-admin/datasets#eddfromerddap)et[EDDTableDeErddap](/docs/server-admin/datasets#eddfromerddap)UtilisationERDDAPservices d'abonnement et[Système de drapeau](#flag)afin qu'elle soit notifiée immédiatement lorsque de nouvelles données sont disponibles.
* Vous pouvez les combiner à grand effet: si vous enveloppez unEDDGridCopier autour d'unEDDGridEnsemble de données d'Erddap (ou envelopper un EDDTableCopy autour d'un ensemble de données EDDTableFromErddap) ,ERDDAP™créer et maintenir automatiquement une copie locale d'un autreERDDAPl'ensemble de données.
* Parce que les services d'abonnement fonctionnent dès que de nouvelles données sont disponibles, la technologie pousse à diffuser les données très rapidement (dans les secondes) .

Cette architecture met chaqueERDDAP™administrateur chargé de déterminer où les donnéesERDDAP™vient de.

* AutresERDDAP™les administrateurs peuvent faire de même. La coordination entre les administrateurs n'est pas nécessaire.
* Si plusieursERDDAP™administrateurs lien à l'autreERDDAPs, un réseau de distribution de données est formé.
* Les données seront diffusées rapidement, efficacement et automatiquement à partir de sources de données. (ERDDAPs et autres serveurs) aux sites de redistribution des données (ERDDAPs) n'importe où dans le réseau.
* A donnéERDDAP™peut être à la fois une source de données pour certains ensembles de données et un site de redistribution pour d'autres ensembles de données.
* Le réseau résultant est à peu près similaire aux réseaux de distribution de données mis en place avec des programmes comme[UnidataIDD/IDM](https://www.unidata.ucar.edu/projects/index.html#idd), mais moins rigidement structuré.
         
### Sécurité, authentification et autorisation{#security-authentication-and-authorization} 
Par défaut,ERDDAP™fonctionne comme un serveur entièrement public (utilisanthttpet/ouhttps) sans connexion ([authentification](https://en.wikipedia.org/wiki/Authentication)) système et aucune restriction à l'accès aux données ([autorisation](https://en.wikipedia.org/wiki/Authorization)) .

#### Sécurité{#security} 
Si vous voulez restreindre l'accès à certains ou à tous les ensembles de données à certains utilisateurs, vous pouvez utiliserERDDAPLe système de sécurité intégré. Lorsque le système de sécurité est utilisé:

*   ERDDAP™Utilisations[contrôle de l'accès fondé sur le rôle](https://en.wikipedia.org/wiki/Role-based_access_control).
    * LesERDDAP™administrateur définit les utilisateurs avec le [&lt;utilisateur&gt;] (/docs/serveur-admin/données#utilisateur) tag indatasets.xml. Chaque utilisateur a un nom d'utilisateur, un mot de passe (si authentification=client) , et un ou plusieurs rôles.
    * LesERDDAP™administrateur définit quels rôles ont accès à un ensemble de données donné via le [&lt;accessibleÀ&gt;] (/docs/serveur-admin/données#accessibleà) tag indatasets.xmlpour tout ensemble de données qui ne devrait pas avoir accès au public.
* Statut de connexion de l'utilisateur (et un lien pour se connecter/déconnecter) sera affiché en haut de chaque page Web. (Mais un utilisateur connecté apparaîtra àERDDAP™pour ne pas être connecté s'il utilise unhttpURL.) 
* Si&lt;baseUrl&gt; que vous spécifiez dans votre setup.xml est un **http** URL, les utilisateurs qui ne sont pas connectés peuvent utiliserERDDAP's **http** URLs. Si&lt;baseHttpsUrl&gt; est également spécifié, les utilisateurs qui ne sont pas connectés peuvent également utiliserhttpsURLs.
* HTTPS seulement -- Si&lt;baseUrl&gt; que vous spécifiez dans votre setup.xml est un **https** URL, les utilisateurs qui ne sont pas connectés sont encouragés (pas forcé) à utiliserERDDAP's **https** URL -- tous les liens surERDDAP™les pages Web se référeront àhttpsURLs.
    
Si vous voulez forcer les utilisateurs à utiliserhttpsURL, ajouter une ligne permanente Redirect dans la&lt;VirtualHost \\*:80&gt; section dans le fichier de configuration de votre Apache (généralementhttpd.conf) , par exemple,
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Si vous le souhaitez, il existe une méthode supplémentaire pour forcer l'utilisation dehttps: [Sécurité de transport stricte HTTP (TVH) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security). Pour l'utiliser :
    
    1. Activer le module En-têtes Apache : en-têtes a2enmod
    2. Ajouter l'en-tête supplémentaire à la directive HTTPS VirtualHost. L'âge maximal est mesuré en secondes et peut être réglé à une valeur longue.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Veuillez noter que cet en-tête n'est valide que sur un VirtualHost HTTPS.
    
Une raison de ne pas forcer les utilisateurs à utiliserhttpsURLs est : le lien SSL/TLS sous-jacent prend du temps pour établir puis prend du temps pour chiffrer et déchiffrer toutes les informations transmises entre l'utilisateur et le serveur. Mais certaines institutions exigenthttpsSeulement.
    
* Les utilisateurs qui sont connectés DOIVENT utiliserERDDAP's **https** URLs. S'ils utilisenthttpURLs, elles semblent àERDDAP™à ne pas être connecté. Cela garantit la confidentialité des communications et aide à prévenir[détournement de session et détournement de fonds](https://en.wikipedia.org/wiki/Session_hijacking).
* Quiconque n'est pas connecté peut accéder et utiliser les ensembles de données publics. Par défaut, les datasets privés n'apparaissent pas dans les listes de datasets si un utilisateur n'est pas connecté. Si l'administrateur a défini set.xml&lt;listPrivateDatasets&gt; à true, ils apparaîtront. Tentatives de demander des données à des ensembles de données privés (si l'utilisateur connaît l'URL) sera redirigé vers la page de connexion.
* Toute personne connectée pourra voir et demander des données à partir de tout ensemble de données public et de tout ensemble de données privé auquel son rôle lui permet d'accéder. Par défaut, les ensembles de données privés auxquels un utilisateur n'a pas accès n'apparaissent pas dans les listes de ensembles de données. Si l'administrateur a défini set.xml&lt;listPrivateDatasets&gt; à true, ils apparaîtront. Les tentatives de demander des données à partir de ensembles de données privés auxquels l'utilisateur n'a pas accès seront redirigées vers la page de connexion.
* LesRSSdes informations pour des ensembles de données entièrement privés sont disponibles uniquement pour les utilisateurs (etRSSlecteurs) qui sont connectés et autorisés à utiliser cet ensemble de données. Cela rendRSSpas très utile pour les ensembles de données entièrement privés.
    
Si un ensemble de données est privé mais que celui-ci [&lt;graphiquesAccessible à&gt;] (/docs/serveur-admin/datasets#graphsaccessibleà) est mis en public,RSSest accessible à tous.
    
* Les abonnements par courriel ne peuvent être configurés que lorsqu'un utilisateur a accès à un ensemble de données. Si un utilisateur s'inscrit à un jeu de données privé, l'abonnement continue de fonctionner après que l'utilisateur s'est déconnecté.

##### Configuration de la sécurité{#setup-security} 
Pour mettre en place le système de sécurité/authentification/autorisation:

* Faites la normeERDDAP™ [configuration initiale](/docs/server-admin/deploy-install).
* En[configuration.xml](/docs/server-admin/deploy-install#setupxml),
    * Ajouter/modifier&lt;authentifié&gt; valeur de rien à la coutume (n'utilise pas ça) , courriel (n'utilise pas ça) , google (recommandé) , orcide (recommandé) , ou oauth2 (qui est google+orcide, recommandé) . Voir les commentaires sur ces options ci-dessous.
    * Ajouter/modifier&lt;valeur baseHttpsUrl&gt;.
    * Insérer/décommenter&loginInfo;en&lt;startBodyHtml&gt; pour afficher les informations de connexion/sortie de l'utilisateur en haut de chaque page Web.
* Pour les tests sur votre ordinateur personnel,[suivre ces instructions pour configurer tomcat pour soutenir SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (sur la base dehttpsconnexions) en créant un keystore avec un[certificat autosigné](https://en.wikipedia.org/wiki/Self-signed_certificate)et en modifiant *Tomcat* /conf/server.xml pour décommenter le connecteur pour le port 8443. Sous Windows, vous pouvez avoir besoin de déplacer .keystore de "c:\\Users\\ *vous* \\.keystore" à "c:\\Users\\Default User\\.keystore" ou "c:\\.keystore" (voir *Tomcat* /logs/catalina. *Aujourd'hui* .log si l'application ne charge pas ou si les utilisateurs ne peuvent pas voir la page de connexion) . Vous pouvez voir quand le certificat .keystore expirera en examinant le certificat lorsque vous vous connectez.
    
Pour un serveur accessible au public, au lieu d'utiliser un certificat autosigné, il est fortement recommandé d'acheter et d'installer un certificat signé par un[autorité de certification](https://en.wikipedia.org/wiki/Certificate_authority), parce qu'il donne à vos clients plus d'assurance qu'ils sont en fait liés à votreERDDAP™, pas un homme dans la version de votreERDDAP. De nombreux vendeurs vendent des certificats numériques. (Rechercher le web.) Ils ne sont pas chers.
    
* Sur les ordinateurs Linux, si Tomcat fonctionne dans Apache, modifiez le /etc/httpfichier d/conf.d/ssl.conf permettant le trafic HTTPS vers/depuisERDDAP™sans exiger le numéro de port :8443 dans l'URL :
    1. Modifier l'actuel&lt;Tag VirtualHost&gt; (s'il y en a un) , ou en ajouter un à la fin du fichier afin qu'il ait au moins ces lignes:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Puis redémarrez Apache: /usr/sbin/apachectl -K gracieux (mais parfois il est dans un répertoire différent) .
* En *Tomcat* /conf/server.xml, décommenter le port=8443&lt;Connecteur&gt; balise & #160;:
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
et changer l'emplacement du certificatKeystoreFile.
##### Autorisation{#authorization} 
*   [Endatasets.xml, créer un](#authorization)[&lt;utilisateur&gt;] (/docs/serveur-admin/données#utilisateur) balise pour chaque utilisateur avec nom d'utilisateur, mot de passe (si autorisation=douane) , et l'information sur les rôles. C'est la partie de l'autorisationERDDAPLe système de sécurité.
     
* Endatasets.xml, ajouter un [&lt;accessibleÀ&gt;] (/docs/serveur-admin/données#accessibleà) tag à chaque ensemble de données qui ne devrait pas avoir accès au public.&lt;accessibleTo&gt; vous permet de spécifier quels rôles ont accès à cet ensemble de données.
     
* Redémarrez Tomcat. Des problèmes ? Vérifiez les registres Tomcat.
     
* Vérifiez votre travail&#33; Toute erreur pourrait conduire à un défaut de sécurité.
     
* Vérifiez que la page de connexion utilisehttps  (pashttp) . Tentatives de connexion viahttpdevrait être automatiquement redirigé vershttpset le port 8443 (bien que le numéro de port puisse être caché via un proxy Apache) . Vous devrez peut-être travailler avec votre administrateur réseau pour permettre aux requêtes externes d'accéder au port 8443 sur votre serveur.
     
* Vous pouvez changer&lt;utilisateur&gt; et&lt;accessibleÀ&gt; tags à tout moment. Les modifications seront appliquées au prochain rechargement régulier de tout ensemble de données, ou ASAP si vous utilisez un[drapeau](#flag).

##### Authentification{#authentication} 
[ **Authentification (l'exploitation) ** ](#authentication)  
Si vous ne voulez pas permettre aux utilisateurs de se connecter, ne spécifiez pas de valeur pour&lt;Authentification&gt; dans setup.xml.
Si vous voulez permettre aux utilisateurs de se connecter, vous devez spécifier une valeur pour&lt;Authentification&gt;. Actuellement,ERDDAP™soutien
[personnalisé](#custom)  (n'utilise pas ça) ,
[Courriel](#email)  (n'utilise pas ça) ,
[Google](#google)  (recommandé) ,
[orcide](#orcid)  (recommandé) et
[oauth2](#oauth2)  (recommandé) pour la méthode d'authentification.
Si vous voulez activer la connexion, nous vous recommandons fortement les options google, orcid ou oauth2 car elles vous libèrent de stocker et de gérer les mots de passe de l'utilisateur (nécessaire pour la coutume) et sont plus sécurisés que l'option de messagerie. Rappelez-vous que les utilisateurs utilisent souvent le même mot de passe sur différents sites. Ils peuvent donc utiliser le même mot de passe pour votreERDDAP™comme à leur banque. Cela rend leur mot de passe très précieux -- beaucoup plus précieux pour l'utilisateur que les seules données qu'ils demandent. Donc vous devez faire autant que vous pouvez pour garder les mots de passe privés. C'est une grande responsabilité. Les options e-mail, google, orcid, et oauth2 prennent soin des mots de passe, de sorte que vous n'avez pas à rassembler, stocker ou travailler avec eux. Donc vous êtes libéré de cette responsabilité.

Tous&lt;authentification&gt; les options utilisent un[cookie](https://en.wikipedia.org/wiki/HTTP_cookie)sur l'ordinateur de l'utilisateur, de sorte que le navigateur de l'utilisateur doit être configuré pour permettre les cookies. Si un utilisateur faitERDDAP™requêtes d'un programme informatique (pas un navigateur) , les cookies et l'authentification sont difficiles à utiliser. C'est un problème courant avec tous les systèmes d'authentification. Désolé.

Les détails de la&lt;authentification&gt; Les options sont les suivantes:

###### Personnalisé{#custom} 
personnalisé estERDDAP's système personnalisé pour permettre aux utilisateurs de se connecter en entrant leur nom d'utilisateur et mot de passe dans un formulaire sur une page Web. Si un utilisateur essaie et ne se connecte pas 3 fois en 10 minutes, l'utilisateur est bloqué d'essayer de se connecter pendant 10 minutes. Cela empêche les pirates de simplement essayer des millions de mots de passe jusqu'à ce qu'ils trouvent le bon.

Ceci est quelque peu sécurisé parce que le nom d'utilisateur et le mot de passe sont transmis parhttps  (pashttp) , mais authentification=google, orcid, ou oauth2 sont meilleurs parce qu'ils vous libèrent d'avoir à gérer les mots de passe. L'approche personnalisée vous oblige à collecter le nom d'un utilisateur et un digest de hachage de leur mot de passe (Utilisez votre téléphone &#33; e-mail n'est pas sécurisé&#33;) et les stocker dansdatasets.xmldans [&lt;utilisateur&gt;] (/docs/serveur-admin/données#utilisateur) des étiquettes.

Avec l'option personnalisée, personne ne peut se connecter jusqu'à ce que vous (desERDDAP™administrateur) créer un&lt;user&gt; tag pour l'utilisateur, en spécifiant le nom de l'utilisateur comme nom d'utilisateur, le hash digest de leur mot de passe comme mot de passe, et leurs rôles.

Non recommandé
En raison de la difficulté de générer et de transmettre le digest de hachage du mot de passe de l'utilisateur et des risques associés àERDDAP™tenant les digests de hachage des mots de passe, cette option n'est pas recommandée.

Pour renforcer la sécurité de cette option :

* Vous devez vous assurer que d'autres utilisateurs sur le serveur (i.e., utilisateurs Linux, pasERDDAP™utilisateurs) ne peut pas lire les fichiers dans le répertoire Tomcat (en particulierdatasets.xmlDossier &#33;) ouERDDAPLe grand répertoire Parent.
Sur Linux, en tant qu'utilisateur=tomcat, utilisez :
-R -R-rwx *BigParent Directory*   
-R o-rwx *BigParent Directory*   
-R -R-rwx *tomcatDirectory*   
-R o-rwx *tomcatDirectory*   
     
* Utiliser UEPSHA256 pour&lt;mot de passeEncoding&gt; dans setup.xml.
     
* Utilisez une méthode as-secure-as-possible pour transmettre le digest de hachage du mot de passe de l'utilisateur à l'utilisateurERDDAP™administrateur (téléphone ?) .
         
###### Courriel{#email} 
L'option d'authentification de l'email utilise le compte email d'un utilisateur pour authentifier l'utilisateur (en leur envoyant un email avec un lien spécial auquel ils doivent accéder pour se connecter) . Contrairement à d'autres emails queERDDAP™envoie,ERDDAP™n'écrivent pas ces courriels d'invitation au fichier du journal des courriels parce qu'ils contiennent des renseignements confidentiels.
En théorie, ce n'est pas très sûr, parce que les courriels ne sont pas toujours cryptés, donc un mauvais gars avec la capacité d'intercepter des courriels pourrait abuser de ce système en utilisant l'adresse e-mail d'un utilisateur valide et en interceptant le courriel d'invitation.
Dans la pratique, si vous créezERDDAP™pour utiliser un compte email de Google pour envoyer des emails, et si vous l'avez configuré pour utiliser l'une des options TLS pour la connexion, et si l'utilisateur a un compte email de Google, ceci est quelque peu sécurisé parce que les emails sont cryptés tout le chemin deERDDAP™à l'utilisateur.

Pour renforcer la sécurité de cette option :

* Assurez-vous que les autres utilisateurs sur le serveur (i.e., utilisateurs Linux, pasERDDAP™utilisateurs) ne peut pas lire des fichiers dans le répertoire Tomcat ouERDDAPLe grand répertoire Parent.
Sur Linux, en tant qu'utilisateur=tomcat, utilisez :
-R -R-rwx *BigParent Directory*   
-R o-rwx *BigParent Directory*   
-R -R-rwx *tomcatDirectory*   
-R o-rwx *tomcatDirectory*   
     
* Installez les choses pour obtenir la sécurité de bout en bout pour les courriels envoyés deERDDAP™aux utilisateurs. Par exemple, vous pouvez faire un système Google-centré en créant seulement&lt;tags user&gt; pour les adresses e-mail gérées par GoogleERDDAP™pour utiliser un serveur de messagerie Google via une connexion sécurisée/TLS: dans votre setup.xml, utilisez par exemple:
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Non recommandé
L'option d'authentification par courriel n'est pas recommandée. Utilisez plutôt l'option google, orcid ou oauth2.

Comme pour les options google, orcid et oauth2, l'email est très pratique pourERDDAP™administrateurs -- vous n'avez jamais à traiter avec les mots de passe ou leurs digests de hachage. Tout ce que vous devez créer est un [&lt;utilisateur&gt;] (/docs/serveur-admin/données#utilisateur) tag pour un utilisateur dansdatasets.xmlest l'adresse email de l'utilisateur, quiERDDAP™utilise comme nom de l'utilisateur. (L'attribut mot de passe n'est pas utilisé lors de l'authentification=email, google, orcid, ou oauth2.) 

Avec l'option e-mail, seuls les utilisateurs qui ont&lt;user&gt; tag indatasets.xmlpeut essayer de se connecter àERDDAP™en fournissant leur adresse e-mail et en cliquant sur le lien dans le courrielERDDAP™les envoie.

ERDDAP™traite les adresses e-mail comme insensibles aux cas. Il le fait en convertissant les adresses email que vous entrez (dans&lt;user&gt; tags) ou les utilisateurs entrent (sur le formulaire de connexion) à leur version minuscule.

Pour configurer authentification=email :

1. Dans votre setup.xml, changez le&lt;baseHttpsUrl&gt; valeur de la balise.
Pour expérimenter/travailler sur votre ordinateur personnel, utilisez
     https://localhost:8443   
Pour votre publicERDDAP™, utiliser
     https://*your.domain.org*:8443   
ou sans le :8443 si vous utilisez un Apache[proxypass](/docs/server-admin/deploy-install#proxypass)pour que le numéro de port ne soit pas nécessaire.
     
2. Dans votre setup.xml, changez le&lt;authentification&gt; valeur de l'étiquette pour l'email :
```
    <authentication>email</authentication>  
```

3. Dans votre setup.xml, assurez-vous que le système d'email est configuré via tous les&lt;e-mail...&gt; tags, de sorte queERDDAP™peut envoyer des courriels. Si possible, configurer ceci pour utiliser une connexion sécurisée (SSL / TLS) vers le serveur de messagerie.
     
4. Dans votredatasets.xml, créer [&lt;utilisateur&gt;] (/docs/serveur-admin/données#utilisateur) tags pour chaque utilisateur qui aura accès à des ensembles de données privés.
Utilisez l'adresse e-mail de l'utilisateur comme nom d'utilisateur dans la balise.
Ne spécifiez pas l'attribut mot de passe dans la balise utilisateur.
     
5. RedémarrerERDDAP™pour que les modifications à setup.xml etdatasets.xmlprendre effet.
         
###### Google, orcide, oauth2{#google-orcid-oauth2} 
*   [ **Google** ](#google),[ **orcide** ](#orcid)et[ **oauth2** ](#oauth2)   (recommandé)   
Les trois options sont les suivantes :ERDDAP™les options d'authentification. Ce sont toutes les options les plus sécurisées. Les autres options ont une sécurité nettement plus faible.
     
###### Google{#google} 
* L'option d'authentification Google utilise[Signe Avec Google](https://developers.google.com/identity/gsi/web/guides/overview), qui est une mise en œuvre de[Protocole d'authentification OAuth 2.0](https://oauth.net/2/).ERDDAP™les utilisateurs se connectent à leur compte de messagerie Google, y compris les comptes gérés par Google@noaa.govcomptes. Cela permetERDDAP™vérifier l'identité de l'utilisateur (nom et adresse électronique) et d'accéder à leur image de profil, mais ne donne pasERDDAP™accès à leurs courriels, leur Google Drive, ou toute autre information privée.
    
PourERDDAP™v2.22 et ci-dessous,ERDDAP™utilisé "Google Sign-In". Google dit que le système est obsolète après le 31 mars 2023. Si vous ne l'avez pas encore fait, veuillez passer àERDDAP™v2.23+ pour utiliser le nouveau système d'authentification basé sur « Se connecter avec Google ».
    
PourERDDAP™v2.23 instances avec une politique de sécurité de contenu configurée et utilisant Google Authentification, vous devez ajouter https://accounts.google.com à la liste des script-src autorisés (ou script-src-elem) .ERDDAP™ne plus utiliser https://apis.google.com , donc si vous avez ce permis, vous pourriez être en mesure de le retirer maintenant.
    
PourERDDAP™v2.24+ vous pouvez également avoir besoin d'ajouter https://accounts.google.com/gsi/style à stlye-src et https://accounts.google.com/gsi/ pour se connecter. Pour le script-src vous pouvez maintenant utiliser https://accounts.google.com/gsi/client.
 
    
Pour plus d'informations, vous pouvez aller au[Page Google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)sur la configuration du CSP. Si vous avez des questions, contactez chris.john à noaa.gov.
         
###### Orcide{#orcid} 
* L'option d'authentification orcide utilise[Authentification Orcide](https://members.orcid.org/api/integrate/orcid-sign-in), qui est une mise en œuvre de[Protocole d'authentification OAuth 2.0](https://oauth.net/2/).ERDDAP™les utilisateurs signent dans leur[Compte Orcide](https://members.orcid.org/api/integrate/orcid-sign-in), qui est couramment utilisé par les chercheurs pour s'identifier. Cela permetERDDAP™pour vérifier l'identité Orcide de l'utilisateur et obtenir son numéro de compte Orcide, mais ne donne pasERDDAP™accès à leurs autres informations de compte Orcid.

###### Oauth2{#oauth2} 
* L'option oauth2 permet aux utilisateurs de se connecter avec leur compte Google ou leur compte Orcid.

Les options google, orcid, et oauth2 sont les successeurs de l'option openid, qui a été arrêté aprèsERDDAP™version 1.68 et qui était basée sur une version ouverte La carte d'identité est périmée. Veuillez passer à l'option google, orcide ou auth2.

Ces options sont très pratiques pourERDDAP™administrateurs -- vous n'avez jamais à traiter avec les mots de passe ou leurs digests de hachage. Tout ce que vous devez créer est un [&lt;utilisateur&gt;] (/docs/serveur-admin/données#utilisateur) tag pour un utilisateur dansdatasets.xmlqui spécifie l'adresse e-mail de l'utilisateur ou le numéro de compte Orcid comme attribut de nom d'utilisateur. (L'attribut mot de passe n'est pas utilisé lors de l'authentification=email, google, orcid ou oauth2.) 

Avec ces options, tout le monde peut se connecter àERDDAP™en vous inscrivant dans leur compte email Google ou compte Orcid, mais personne n'aura le droit d'accéder à des ensembles de données privés jusqu'à ce que vous (desERDDAP™administrateur) créer un&lt;user&gt; tag, en spécifiant leur adresse e-mail Google ou leur numéro de compte Orcid comme nom d'utilisateur, et en spécifiant leurs rôles.

ERDDAP™traite les adresses e-mail comme insensibles aux cas. Il le fait en convertissant les adresses email que vous entrez (dans&lt;user&gt; tags) ou les utilisateurs entrent (sur le formulaire de connexion) à leur version minuscule.

Pour configurer l'authentification google, orcid ou oauth2 :

* Dans votre setup.xml, changez le&lt;baseHttpsUrl&gt; valeur de la balise.
Pour expérimenter/travailler sur votre ordinateur personnel, utilisez
     https://localhost:8443   
Pour votre publicERDDAP™, utiliser
     https://*your.domain.org*:8443   
ou, mieux, sans le :8443 si vous utilisez un Apache[proxypass](/docs/server-admin/deploy-install#proxypass)pour que le numéro de port ne soit pas nécessaire.
     
* Dans votre setup.xml, changez le&lt;authentification&gt; valeur de la balise pour google, orcid, ou oauth2, par exemple:
```
    <authentication>oauth2</authentication>  
```
###### Configuration de Google{#google-setup} 
* Pour les options google et auth2 :
Suivez les instructions ci-dessous pour configurer l'authentification Google pour votreERDDAP.
     
    1. Si vous n'avez pas de compte de messagerie Google,[créer un](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. Suivre[les présentes instructions](https://developers.google.com/identity/sign-in/web/devconsole-project)pour créer un projet Console Google Developers et obtenir un identifiant client.
        
Lorsque le formulaire Google demande une autorisationJavaScript origines, entrez la valeur de&lt;baseHttpsUrl&gt; de votre ordinateur personnelERDDAP™setup.xml, par exemple,
         https://localhost:8443   
Sur une deuxième ligne, ajouter le&lt;baseHttpsUrl&gt; de votre publicERDDAP™setup.xml, par exemple,
         https://*your.domain.org*:8443
 
        
Ne spécifiez aucun URI de redirection autorisé.
        
Lorsque vous voyez votre identifiant client pour ce projet, copiez-le et collez-le dans votre setup.xml (généralement juste en dessous&lt;authentification&gt; être ordonné, mais le placement n'a pas vraiment d'importance), dans le&lt;étiquette googleClientID&gt;, p.ex.,
        &lt;GoogleClientID&gt; *votreClientID* &lt;/googleClientID&gt;
L'ID client sera une chaîne d'environ 75 caractères, commençant probablement par plusieurs chiffres et se terminant par .apps.googleusercontent.com .
         
        
    3. Dans votredatasets.xml, créer un [&lt;utilisateur&gt;] (/docs/serveur-admin/données#utilisateur) tag pour chaque utilisateur qui aura accès à des ensembles de données privés. Pour l'attribut nom d'utilisateur dans la balise :
        
        * Pour les utilisateurs qui se connecteront avec google, utilisez l'adresse e-mail Google de l'utilisateur.
        * Pour les utilisateurs qui se connecteront avec orcid, utilisez le numéro de compte Orcid de l'utilisateur (avec des tirets) .
        
Ne spécifiez pas l'attribut mot de passe pour la balise utilisateur.
         
    4. RedémarrerERDDAP™pour que les modifications à setup.xml etdatasets.xmlprendre effet.
         
###### Configuration Orcide{#orcid-setup} 
* Pour les options orcide et oauth2 :
Suivez les instructions ci-dessous pour configurer l'authentification Orcid pour votreERDDAP.
     (Pour plus de détails, voir[Documentation API d'authentification d'Orcid](https://members.orcid.org/api/integrate/orcid-sign-in).)   
     
    1. Si vous n'avez pas de compte Orcid,[créer un](https://orcid.org/signin)  
         
    2. Connectez-vous à Orcid[ https://orcid.org/signin ](https://orcid.org/signin)en utilisant votre compte personnel Orcid.
         
    3. Cliquez sur « Outils de développement » (sous "Pour les chercheurs" en haut) .
         
    4. Cliquez sur "Enregistrez-vous pour l'API publique ORCID gratuite". Saisissez cette information :
Nom:ERDDAP™au\\[votre organisation\\]  
Site web:\\[VotreERDDAPLe domaine\\]  
Exposé succinct:ERDDAP™est un serveur de données scientifiques. Les utilisateurs doivent s'authentifier avec Google ou Orcid pour accéder à des ensembles de données non publics.
Rediriger les URI :\\[VotreERDDAPLe domaine\\]/erddap/loginOrcid.html
         
    5. Cliquez sur l'icône Enregistrer (ça ressemble à un disque de 3,5" &#33;) .
Vous pouvez alors voir votre ID client ORCID APP et votre secret client ORCID.
         
    6. Copiez et collez l'identifiant client ORCID APP (qui commencera par "APP-") dans setup.xml dans le&lt;tag orcidClientID&gt;, p.ex.,
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Copiez et collez le secret client ORCID (caractères alphanumériques minuscules avec tirets) dans setup.xml dans le&lt;tag orcidClientSecret&gt;, p.ex.,
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. Dans votredatasets.xml, créer un [&lt;utilisateur&gt;] (/docs/serveur-admin/données#utilisateur) tag pour chaque utilisateur qui aura accès à des ensembles de données privés. Pour l'attribut nom d'utilisateur dans la balise :
        
        * Pour les utilisateurs qui se connecteront avec google, utilisez l'adresse e-mail Google de l'utilisateur.
        * Pour les utilisateurs qui se connecteront avec orcid, utilisez le numéro de compte Orcid de l'utilisateur (avec des tirets) .
        
Ne spécifiez pas l'attribut mot de passe pour la balise utilisateur.
         
    9. RedémarrerERDDAP™pour que les modifications à setup.xml etdatasets.xmlprendre effet.
             

###### Connectez-vous de toute façon{#log-in-either-way} 
Si vous utilisez les options d'authentification google, orcid ou oauth2, et que l'API d'authentification Google Sign-In ou Orcid cesse de fonctionner (pour quelque raison que ce soit) ou cesse de travaillerERDDAP™les utilisateurs ne pourront pas se connecter à votreERDDAP. À titre temporaire (permanente) solution, vous pouvez demander aux utilisateurs de s'inscrire avec l'autre système (obtenir un compte de messagerie Google, ou obtenir un compte Orcid) . Pour ce faire :

1. Modifier le&lt;authentification&gt; tag de sorte qu'il permet l'autre système d'authentification. L'option oauth2 permet aux utilisateurs de se connecter à l'un ou l'autre système.
2. Dupliquer chacune des&lt;user&gt; tags et changer l'attribut nom d'utilisateur de l'adresse email de Google au numéro de compte Orcid correspondant (ou vice-versa) , mais gardez le même attribut de rôles.

###### OpenId{#openid} 
ERDDAP™ne supporte plus l'option d'authentification openid, qui était basée sur une version de open La carte d'identité est périmée. Utilisez plutôt les options google, orcid ou oauth2.

###### BASE{#basic} 
ERDDAP™ne supporte pas l'authentification BASIC car:
* BASIC semble orienté vers des pages Web prédéfinies nécessitant un accès sécurisé ou une couverture sur/hors accès à l'ensemble du site, maisERDDAP™permet (Accès restreint) les ensembles de données à ajouter au vol.
* L'authentification BASIC ne permet pas aux utilisateurs de se déconnecter &#33;
* L'authentification BASIC n'est pas sécurisée.

##### Sources de données sécurisées{#secure-data-sources} 
Si un ensemble de données doit avoir un accès restreint àERDDAP™utilisateurs, la source de données (d'oùERDDAP™obtient les données) ne devrait pas être accessible au public. Alors commentERDDAP™obtenir les données pour les ensembles de données à accès restreint? Voici quelques options :

*   ERDDAP™peut servir des données à partir de fichiers locaux (par exemple, via EDDTable Fichiers ouEDDGridFichiers) .
     
*   ERDDAP™peut être dans un[ZDM](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing)) et la source des données (Par exemple,OPeNDAPserveur ou base de données) peut être derrière un[Pare-feu](https://en.wikipedia.org/wiki/Firewall), où il est accessible àERDDAP™mais pas au public.
     
* La source de données peut être sur un site Web public, mais nécessite une connexion pour obtenir les données. Les deux types de donnéesERDDAP™peuvent se connecter pour accéder sont[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)et[EDDTableDeCassandra](/docs/server-admin/datasets#eddtablefromcassandra). Ces ensembles de données supportent (et doit toujours utiliser) nom d'utilisateur (créer unERDDAP™utilisateur qui n'a que des privilèges en lecture seule) , mots de passe, connexions SSL et autres mesures de sécurité.
    
Mais en général, actuellement,ERDDAP™ne peut pas traiter avec ces sources de données parce qu'il n'a aucune disposition pour se connecter à la source de données. C'est la raison pour laquelle l'accès[EDDGridDeErddap et EDDTable DeErddap](/docs/server-admin/datasets#eddfromerddap)Les ensembles de données ne peuvent pas être restreints. Actuellement, lesERDDAP™n'a aucun moyen de se connecter et d'accéder aux informations de métadonnées de la télécommandeERDDAP. Et mettre "à distance"ERDDAP™derrière votre pare-feu et en supprimant ce jeu de données accessible Aux restrictions ne résout pas le problème : puisque les utilisateurs demandent EDDXxx Les données d'Erddap doivent être redirigées vers la télécommandeERDDAP™, la télécommandeERDDAP™doivent être accessibles.
    
#### Défenses contre les pirates{#defenses-against-hackers} 
Il y a des pirates de mauvais gars qui essaient d'exploiter les faiblesses de sécurité dans les logiciels de serveur commeERDDAP.ERDDAP™suit les conseils de sécurité communs pour avoir plusieurs niveaux de défense:

* Privilèges limités Une des défenses les plus importantes est d'exécuter Tomcat via un utilisateur appelé tomcat qui n'a pas de mot de passe (personne ne peut se connecter en tant qu'utilisateur) et a limité les privilèges du système de fichiers (Par exemple, accès en lecture seule aux données) . VoirERDDAPLes instructions pour[la mise en place de Tomcat](/docs/server-admin/deploy-install#tomcat).
* Utilisation lourde - En général,ERDDAP™est construit pour un usage intensif, y compris par des scripts qui font des dizaines de milliers de requêtes, l'une après l'autre. C'est dur pourERDDAP™de s'ouvrir simultanément à une utilisation légitime et de se protéger des abus. Il est parfois difficile de différencier une utilisation légitime lourde, une utilisation légitime excessive et une utilisation illégitime (et parfois c'est vraiment facile) . Entre autres défenses,ERDDAP™ne permet consciemment pas qu'une seule demande utilise une fraction démesurée des ressources du système (à moins que le système ne soit autrement inactif) .
* Identifier les utilisateurs problématiques - SiERDDAP™ralentit ou gèle (peut-être parce qu'un utilisateur naïf ou un bot exécute plusieurs scripts pour soumettre plusieurs requêtes simultanément ou peut-être à cause d'un mauvais gars[Refus de service](https://en.wikipedia.org/wiki/Denial-of-service_attack)attaque) , vous pouvez regarder[Rapport quotidien courriel](#daily-report)  (et des informations identiques plus fréquentes[ERDDAP™fichier journal](#log)) qui affiche le nombre de requêtes faites par les utilisateurs les plus actifs (Voir « Adresse IP du demandeur » (Autorisé) ") .ERDDAP™envoie également des courriels à l'administrateur chaque fois qu'il y a["Activités inhabituelles: &gt; 25 % des demandes ont échoué"](#failed-requests). Vous pouvez alors regarder dans leERDDAP™fichier journal pour voir la nature de leurs demandes. Si vous sentez que quelqu'un fait trop de demandes, des demandes bizarres (Tu ne croirais pas ce que j'ai vu, peut-être) , ou des requêtes de type attaque, vous pouvez ajouter leur adresse IP à la liste noire.
* Liste noire... Vous pouvez ajouter l'adresse IP des utilisateurs, des robots et[Refus de service](https://en.wikipedia.org/wiki/Denial-of-service_attack)agresseurs à laERDDAP [liste noire](/docs/server-admin/datasets#requestblacklist), afin que les demandes futures d'eux soient immédiatement rejetées. Ce réglage est dansdatasets.xmlafin que vous puissiez ajouter rapidement une adresse IP à la liste, puis[drapeau](#flag)un ensemble de données permettantERDDAP™avise immédiatement et applique le changement. Le message d'erreur envoyé aux utilisateurs de la liste noire les encourage à contacterERDDAP™administrateur s'ils pensent avoir été mis par erreur sur la liste noire. (D'après notre expérience, plusieurs utilisateurs ne savaient pas qu'ils avaient lancé plusieurs scripts simultanément, ou que leurs scripts faisaient des requêtes absurdes.) 
* Sécurité des ensembles de données - Certains types de ensembles de données (notamment, EDDTableFromDatabase) présentent des risques supplémentaires pour la sécurité (Par exemple, injection SQL) et ont leurs propres mesures de sécurité. Voir les informations concernant ces types de séries de données dans[Travailler avec lesdatasets.xmlFichier](/docs/server-admin/datasets), notamment[EDDTableFromDatabase security](/docs/server-admin/datasets#database-security).
* Vérification de sécurité -- Bien queNOAALa sécurité informatique a refusé nos demandes de scans pendant des années. (Chez Bob)  ERDDAP™installation. Bien que les premiers scans aient trouvé quelques problèmes que j'ai ensuite corrigés, les scans suivants n'ont pas trouvé de problèmes avecERDDAP. Les scans s'inquiètent de beaucoup de choses: notamment, depuistabledaples requêtes ressemblent à des requêtes SQL, elles s'inquiètent des vulnérabilités d'injection SQL. Mais ces préoccupations ne sont pas fondées parce queERDDAP™Toujours analyser et valider les requêtes et ensuite construire séparément la requête SQL d'une manière qui évite les vulnérabilités d'injection. L'autre chose dont ils se plaignent parfois est que notreJavaversions ou Tomcat ne sont pas aussi à jour qu'ils veulent, donc nous les mettons à jour en réponse. J'avais déjà proposé de montrer aux gens les rapports de sécurité, mais on me dit maintenant que je ne peux pas faire ça.

#### Des questions ? Des suggestions ?{#questions-suggestions} 
Si vous avez des questions surERDDAP's système de sécurité ou ont des questions, des doutes, des préoccupations ou des suggestions sur la façon dont il est mis en place, voir notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).
    

## Ce que vous n'avez pas besoin de savoir{#things-you-dont-need-to-know} 

Ce sont des détails que vous n'avez pas besoin de connaître jusqu'à ce qu'un besoin se produise.

### DeuxièmeERDDAP™ {#second-erddap} 
*    **Mise en place d'une secondeERDDAP™pour les essais/développement**   
Si vous voulez le faire, il y a deux approches :
    *    (Meilleur) Installer Tomcat etERDDAP™sur un ordinateur autre que l'ordinateur qui a votre publicERDDAP. Si vous utilisez votre ordinateur personnel:
        1. Faites l'installation une étape à la fois. Mettez Tomcat en route.
Lorsque Tomcat court, le gestionnaire de Tomcat devrait être à
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (ou peut-être[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. InstallerERDDAP.
        3. N'utilisez pas ProxyPass pour éliminer le numéro de port de laERDDAP™URL.
        4. En[configuration.xml](/docs/server-admin/deploy-install#setupxml), mettre baseUrl à http://127.0.0.1:8080
 
        5. Après avoir commencé çaERDDAP™, vous devriez être en mesure de le voir à
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (ou peut-être[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### Deuxième Tomcat{#second-tomcat} 
*    (Deuxième meilleur) Installez un autre Tomcat sur le même ordinateur que votre publicERDDAP.
    1. Faites l'installation une étape à la fois. Mettez Tomcat en route.
Changer tous les numéros de port associés au deuxième Tomcat (Par exemple, changement 8080 à 8081)   (voir[Tomcat multiple Section des affaires](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)à mi-parcours de ce document) .
    2. InstallerERDDAP™dans le nouveau Tomcat.
    3. N'utilisez pas ProxyPass pour éliminer le numéro de port de laERDDAP™URL.
    4. En[configuration.xml](/docs/server-admin/deploy-install#setupxml), mettre baseUrl à http://www.*yourDomainName*:8081
 
    5. Après avoir commencé çaERDDAP™, vous devriez être en mesure de le voir à
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### Disques solides{#solid-state-drives} 
*    **Disques solides (DTS) C'est génial &#33;**   
Le moyen le plus rapide, le plus facile et le moins cher d'accélérerERDDAP'l'accès aux données tabulaires est de mettre les fichiers de données sur un Solid State Drive (SSD) . La plupart des ensembles de données tabulaires sont relativement petits, de sorte qu'un SSD 1 ou 2 To est probablement suffisant pour contenir tous les fichiers de données pour tous vos ensembles de données tabulaires. SSD finit par s'user si vous écrivez des données à une cellule, le supprimer, et écrire de nouvelles données à cette cellule trop souvent. Donc, si vous utilisez simplement votre SSD pour écrire les données une fois et le lire plusieurs fois, même un SSD de qualité consommateur devrait durer très longtemps, probablement beaucoup plus longtemps que n'importe quel disque dur (HDD) . Les SSD de qualité consommateur sont maintenant bon marché (en 2018, ~200 $ pour 1 TB ou ~400 $ pour 2 TB) et les prix continuent de baisser rapidement. QuandERDDAP™accès à un fichier de données, un SSD offre deux latences plus courtes (~0,1ms, versus ~3ms pour un disque dur, versus ~10 (?) ms pour un RAID, contre ~55ms pour Amazon S3) et plus haut débit (~500 Mo/S, contre ~75 Mo/s pour un disque dur, contre ~500 Mo/s pour un RAID) . Donc vous pouvez obtenir un grand coup de pouce de performance (jusqu'à 10X versus un disque dur) pour 200 dollars &#33; Par rapport à la plupart des autres changements possibles à votre système (un nouveau serveur pour 10 000 $ ? un nouveau RAID pour 35 000 $ ? un nouveau commutateur réseau pour $5000? etc.) , c'est de loin le meilleur retour sur investissement (ROI) . Si/lorsque le SSD meurt (dans 1, 2, ... 8 ans) , remplacez-le. Ne comptez pas sur elle comme pour le stockage archivistique à long terme des données, juste pour la copie frontale des données.\\[SSD's serait idéal pour les données maillées, aussi, mais la plupart des ensembles de données maillés sont beaucoup plus grands, ce qui rend le SSD très cher.\\]
    
Si votre serveur n'est pas chargé de mémoire, la mémoire supplémentaire pour votre serveur est également un excellent moyen relativement peu coûteux d'accélérer tous les aspects deERDDAP.
     
    
### [Charges lourdes / contraintes](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
Avec un usage intensif, un standaloneERDDAP™peut être limitée par divers problèmes. Pour plus d'informations, voir le[liste des contraintes et des solutions](/docs/server-admin/scaling#heavy-loads--constraints).
     
### Grilles, groupements et fédérations{#grids-clusters-and-federations} 
Sous très forte utilisation, une seuleERDDAP™se heurtera à une ou plusieurs contraintes et même les solutions proposées seront insuffisantes. Pour de telles situations,ERDDAP™a des fonctionnalités qui le rendent facile à construire des grilles évolutives (également appelés groupements ou fédérations) desERDDAPs qui permettent au système de gérer une utilisation très lourde (Par exemple, pour un grand centre de données) . Pour plus d'informations, voir[les réseaux, les groupements et les fédérationsERDDAPs](/docs/server-admin/scaling).
     
### Informatique en nuage{#cloud-computing} 
Plusieurs entreprises commencent à offrir[Services d'informatique en nuage](https://en.wikipedia.org/wiki/Cloud_computing)  (Par exemple,[Services Web Amazon](https://aws.amazon.com/)) .[Entreprises d'hébergement Web](https://en.wikipedia.org/wiki/Web_hosting_service)ont offert des services plus simples depuis le milieu des années 1990, mais les services «cloud» ont considérablement élargi la flexibilité des systèmes et la gamme de services offerts. Vous pouvez utiliser ces services pour configurer un seulERDDAP™ou une grille ou un groupeERDDAPs pour une utilisation très importante. Pour plus d'informations, voir[cloud computing avecERDDAP™](/docs/server-admin/scaling#cloud-computing).

### Amazonie{#amazon} 
*    **[Services Web Amazon (AWS) EC2 Aperçu de l'installation](#amazon)**   
    [Services Web Amazon (AWS) ](https://aws.amazon.com/)est[service de calcul en nuage](https://en.wikipedia.org/wiki/Cloud_computing)qui offre une large gamme d'infrastructure informatique que vous pouvez louer à l'heure. Vous pouvez installerERDDAP™sur un[Nuage de calcul élastique (CE2) ](https://aws.amazon.com/ec2/)instance (leur nom pour un ordinateur que vous pouvez louer à l'heure) . AWS a un excellent[Guide de l'utilisateur AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)et vous pouvez utiliser Google pour trouver des réponses à des questions spécifiques que vous pourriez avoir. Brace-toi -- c'est une bonne quantité de travail pour commencer. Mais une fois que vous obtenez un serveur en cours d'exécution, vous pouvez facilement louer autant de ressources supplémentaires (serveurs, bases de données, espace SSD, etc.) à un prix raisonnable.\\[Ce n'est pas une recommandation ou une approbation de Amazon Web Services. Il y a d'autres fournisseurs de cloud.\\]
    
Un aperçu des choses que vous devez faire pour obtenirERDDAP™exécuter sur AWS est:
    
    * En général, vous ferez toutes les choses décrites dans le[Guide de l'utilisateur AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).
    * Créer un compte AWS.
    * Configurez un utilisateur AWS dans ce compte avec les privilèges de l'administrateur. Connectez-vous en tant qu'utilisateur pour faire toutes les étapes suivantes.
    * Stockage par blocs élastiques (EBS) est l'équivalent AWS d'un disque dur attaché à votre serveur. Certains espaces EBS seront attribués lorsque vous créerez une instance EC2. C'est un stockage persistant -- l'information n'est pas perdue lorsque vous arrêtez votre instance EC2. Et si vous changez de type d'instance, votre espace EBS est automatiquement attaché à la nouvelle instance.
    * Créez une adresse IP élastique pour que votre instance EC2 ait une URL publique stable (par opposition à une URL privée qui change chaque fois que vous redémarrez votre instance) .
    * Créer et démarrer une instance EC2 (ordinateur) . Il y a un large éventail de[types d'instance](https://aws.amazon.com/ec2/instance-types/), chacun à un prix différent. Une instance m4.large ou m4.xlarge est puissante et est probablement adaptée à la plupart des utilisations, mais choisissez tout ce qui répond à vos besoins. Vous voudrez probablement utiliser Linux d'Amazon comme système d'exploitation.
    * Si votre ordinateur de bureau / portable est un ordinateur Windows, vous pouvez utiliser[PUTTY](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html), un client SSH gratuit pour Windows, pour accéder à la ligne de commande de votre instance EC2. Ou, vous pouvez avoir un autre programme SSH que vous préférez.
    * Lorsque vous vous connectez à votre instance EC2, vous serez connecté en tant qu'utilisateur administratif avec le nom d'utilisateur "ec2-user". ec2-user a des privilèges de sudo. Donc, lorsque vous devez faire quelque chose comme l'utilisateur root, utilisez: sudo *certains commandants* 
    * Si votre ordinateur de bureau / portable est un ordinateur Windows, vous pouvez utiliser[FichierZilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp), un programme SFTP gratuit, pour transférer des fichiers vers/depuis votre instance EC2. Ou, vous pouvez avoir un autre programme SFTP que vous préférez.
    *   [Installer Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)sur votre instance EC2.
    * Suivre la norme[ERDDAP™instructions d'installation](/docs/server-admin/deploy-install).
         
### WaitHelTryAgain Exception{#waitthentryagain-exception} 
Un utilisateur peut obtenir un message d'erreur comme
WaitHelTryAgainException:
Il y avait une (temporaire ?) problème. Attendez une minute, puis essayez encore. (Dans un navigateur, cliquez sur le bouton Recharger.)   
Détails: GridDataAccessor.increment: partiellementRésultats\\[0\\]="123542730" devrait être "123532800".

L'explication générale de la WaitHeinTryAgainException est:
QuandERDDAP™répond à une demande de l'utilisateur, il peut y avoir une erreur inattendue avec l'ensemble de données (Par exemple, une erreur lors de la lecture des données du fichier, ou une erreur d'accès à un ensemble de données distant) . Attendez alorsEssayez encore les signauxERDDAP™que la demande a échoué (Jusqu'à présent) mais çaERDDAP™devrait essayer de recharger rapidement l'ensemble de données (il appelle[DemandeRechargerASAP](#requestreloadasap)) et réessayer la demande. Souvent, cela réussit, et l'utilisateur voit juste que la réponse à la demande était lente. D'autres fois, le rechargement échoue ou est trop lent, ou la tentative ultérieure de traiter la demande échoue également et lance un autre WaitHelTryAgain. Si ça arrive,ERDDAP™marque l'ensemble de données pour recharger mais indique à l'utilisateur (via une exception WaitHelTryAgain) qu'il y a eu un échec en répondant à la demande.

C'est le comportement normal. Ce système peut traiter de nombreux problèmes communs.
Mais il est possible que ce système se déclenche excessivement. La cause la plus courante est queERDDAPLe chargement de l'ensemble de données ne voit pas de problème, maisERDDAP'la réponse à une demande de données voit le problème. Peu importe la cause, la solution est que vous traitiez avec ce qui ne va pas avec l'ensemble de données. Regardez dans log.txt pour voir les messages d'erreur réels et traiter les problèmes. Si beaucoup de fichiers ont des en-têtes valides mais des données non valides (un fichier corrompu) , remplacer les fichiers par des fichiers non corrompus. Si la connexion à un RAID est flakey, corrigez-la. Si la connexion à un service distant est flakey, trouvez un moyen de ne pas flakey ou téléchargez tous les fichiers de la source distante et servez les données des fichiers locaux.

L'explication détaillée de cette erreur spécifique (ci-dessus) est:
Pour chaqueEDDGridensemble de données,ERDDAP™garde les valeurs variables de l'axe en mémoire. Ils sont utilisés, par exemple, pour convertir les valeurs d'axe demandées qui utilisent le " () " formaté en numéros d'index. Par exemple, si les valeurs de l'axe sont "10, 15, 20, 25", (20) sera interprété comme une demande d'index #2 (Indices basés sur 0) . QuandERDDAP™obtient une demande de données et obtient les données de la source, il vérifie que les valeurs de l'axe qu'il a obtenu de la source correspondent aux valeurs de l'axe en mémoire. Normalement, oui. Mais parfois la source des données a changé de manière significative: par exemple, les valeurs d'indice depuis le début de la variable axe peuvent avoir été supprimées. (Par exemple, "10, 15, 20, 25" peut être devenu "20, 25, 30") . Si cela se produit, il est clair queERDDAPL'interprétation de la demande (Par exemple, " (20) " est l ' indice no 2) est maintenant faux. AlorsERDDAP™lance une exception et appelle RequestReloadASAP.ERDDAP™mettra prochainement à jour l'ensemble de données (souvent en quelques secondes, généralement en une minute) . D'autres problèmes similaires lancent également l'exception WaitHelTryAgain.
    
#### DemandeRechargerASAP{#requestreloadasap} 
Vous pouvez voir RequestReloadASAP dans le fichier log.txt juste après un message d'erreur et souvent près d'un[WaitHelTryAgain Exception](#waitthentryagain-exception). Il s'agit essentiellement d'une façon interne et programmatique pourERDDAP™pour définir une[drapeau](#flag)pour signaler que l'ensemble de données doit être rechargé dès que possible.
     
### Fichiers non supprimés{#files-not-being-deleted} 
Pour quelquesERDDAP™installations, il y a eu un problème avec certains fichiers temporaires créés parERDDAP™Rester ouvert (Par erreur) et donc ne pas être supprimé. Dans quelques cas, beaucoup de ces fichiers ont accumulé et pris une quantité importante d'espace disque.

J'espère que ces problèmes seront résolus. (à partir deERDDAP™v2.00) . Si vous voyez ce problème, veuillez envoyer le répertoire + noms des fichiers offensants à Chris. John à noaa.gov. Vous avez quelques options pour traiter le problème:

* Si les fichiers ne sont pas gros et ne vous font pas manquer d'espace disque, vous pouvez ignorer le problème.
* La solution la plus simple est d'arrêter tomcat/ERDDAP™  (après des heures si peu d'utilisateurs sont touchés) . Pendant l'arrêt, si le système d'exploitation ne supprime pas les fichiers, supprimez-les à la main. Puis redémarrezERDDAP.
         
### JSON-ld{#json-ld} 
*    **[Marquage sémantique des données avec json-ld (JSON Données liées) ](#json-ld)**   
    ERDDAP™utilise maintenant[Json-ld (JSON Données liées) ](https://json-ld.org)pour faire de votre catalogue de données et de vos ensembles de données une partie du[web sémantique](https://en.wikipedia.org/wiki/Semantic_Web), qui est l'idée de Tim Berners-Lee de rendre le contenu web plus lisible par machine et plus compréhensible par machine. Le contenu de json-ld utilise[schéma.org](https://schema.org/)termes et définitions. Moteurs de recherche ([Google en particulier](https://developers.google.com/search/docs/data-types/datasets)) et d'autres outils sémantiques peuvent utiliser ce marquage structuré pour faciliter la découverte et l'indexation. Le balisage structuré json-ld apparaît comme invisible à l'humain&lt;script&gt; code sur le https://.../erddap/info/index.html page Web (qui est une toile sémantique[DataCatalog](https://schema.org/DataCatalog)) et sur chaque https://.../erddap/info/*datasetID*/index.html page Web (qui est une toile sémantique[Ensemble de données](https://schema.org/Dataset)) . (Merci tout particulièrement à Adam Leadbetter et Rob Fuller de l'Institut marin d'Irlande pour les efforts qu'ils ont déployés pourERDDAP.)   
     
### URLs hors date{#out-of-date-urls} 
Lentement mais sûrement, les URL que les fournisseurs de données ont écrites dans les fichiers de données deviennent obsolètes (par exemple,httpdevienthttps, les sites Web sont réorganisés, et les organisations comme NODC/NGDC/NCDC sont réorganisées en NECI) . Les liens rompus qui en résultent sont un problème toujours présent pour tous les sites Web. Pour gérer ça,ERDDAP™a maintenant un système pour mettre à jour automatiquement les URLs obsolètes. Si générer des ensembles de données Xml voit une URL obsolète, il ajoute l'URL actualisée à&lt;addAttributes&gt;. Aussi, quand un ensemble de données se charge, siERDDAP™voit une URL obsolète, elle la change silencieusement à l'URL actualisée. Les changements sont contrôlés par une série de recherches/remplacements avec des paires définies dans&lt;mise à jourUrls&gt; enERDDAP's
\\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml fichier. Vous pouvez y apporter des changements. Si vous avez des suggestions de changements, ou si vous pensez que cela devrait être transformé en un service (comme les convertisseurs) S'il vous plaît, envoyez un mail à Chris. John à noaa.gov.
     
### CORS{#cors} 
* CORS ([Partage croisé des ressources d'origine](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
"est un mécanisme qui permet des ressources limitées (Par exemple, polices ouERDDAP™données) sur une page Web à demander à partir d'un autre domaine en dehors du domaine à partir duquel la première ressource a été desservie" (Arun Ranganathan) . Fondamentalement, CORS est un message qui peut être mis dans l'en-tête HTTP d'une réponse, disant essentiellement, "il est correct avec ce site si certains autres sites (spécifiques, ou tous) saisir les ressources (Par exemple, données) de ce site et le rendre disponible sur leur site". C'est donc une alternative à[JSONP](https://en.wikipedia.org/wiki/JSONP).
    
Les développeurs deERDDAP™ne prétendent pas être des experts en sécurité. Nous ne sommes pas tout à fait clairs sur les questions de sécurité liées au CORS. Nous ne voulons pas faire de déclaration approuvant une action qui diminue la sécurité. Donc, nous allons rester neutres et laisser à chaqueERDDAP™administrateur de décider si les avantages ou d'activer un en-tête CORS valent les risques. Comme toujours, si votreERDDAP™a des ensembles de données privés, c'est une bonne idée d'être très prudent sur la sécurité.
    
Si vous voulez activer CORS pour votreERDDAP™, il y a[instructions facilement disponibles](https://enable-cors.org/index.html)décrivant comment les administrateurs de site Web peuvent activer un en-tête CORS via leur logiciel serveur de niveau inférieur (Par exemple, Apache ou nginx) .
    
### Palettes{#palettes} 
* Les palettes sont utilisées parERDDAP™pour convertir une gamme de valeurs de données en une gamme de couleurs lors de la fabrication de graphiques et de cartes.
    
Chaque palette est définie dans un fichier de palette de style .cpt tel qu'utilisé par[GMT](https://www.soest.hawaii.edu/gmt/). TousERDDAP™Les fichiers .cpt sont des fichiers GMT .cpt valides, mais l'inverse n'est pas vrai. Pour utilisation dansERDDAP™, les fichiers .cpt ont:
    
    * Les lignes de commentaires optionnels au début du fichier, commençant par "#".
    * Une section principale avec une description des segments de la palette, un segment par ligne. Chaque ligne de description de segment a 8 valeurs:
début Valeur, startRed, start Vert, commence. Bleu, finValue, finRouge, finVert, fin Bleu.
Il peut y avoir un certain nombre de segments.ERDDAP™utilise une interpolation linéaire entre le startRed/Green/Blue et le endRed/Green/Blue de chaque segment.
        
Nous recommandons que chaque segment spécifie une couleur de début et de fin qui sont différentes, et que la couleur de début de chaque segment soit la même que la couleur de fin du segment précédent, de sorte que la palette décrit un mélange continu de couleurs.ERDDAP™a un système pour créer à la volée une palette de couleurs discrètes d'une palette avec un mélange continu de couleurs. UneERDDAP™l'utilisateur peut spécifier s'il veut que la palette soit continue (l'original) ou discrets (dérivés de l'original) . Mais il y a des raisons légitimes de ne pas suivre ces recommandations pour certaines palettes.
        
    * Le startValue et endValues doivent être entiers.
Le premier segment doit avoir startValue=0 et endValue=1.
Le deuxième segment doit avoir startValue=1 et endValue=2.
Etc.
    * Les valeurs rouges, vertes et bleues doivent être des entiers de 0 (aucune) ... 255 (complet le) .
    * La fin du fichier doit comporter 3 lignes avec :
        1. Couleur de fond rgb pour des valeurs de données inférieures au minimum de la barre de couleurs, par exemple: B 128 128 128
C'est souvent le startRed, startGreen et startBlue du premier segment.
        2. Une couleur rgb de premier plan pour des valeurs de données supérieures au maximum de la barre de couleurs, par exemple: F 128 0 0
C'est souvent la fin rouge, fin verte et fin bleue du dernier segment.
        3. Une couleur rgb pour les valeurs de données NaN, p.ex. N 128 128 128
Il est souvent gris moyen (128 128 128) .
    * Les valeurs de chaque ligne doivent être séparées par des onglets, sans espaces étrangers.
    
Un exemple de fichier .cpt est BlueWhiteRed.cpt:
    
Numéro Ici BlueWhiteRed.cpt.
0 0 0 128 1 0 0 255
1 0 0 255 2 0 255 255
2 0 255 255 3 255 255 255
3 255 255 255 4 255 255 0
4 255 255 0 5 255 0 0
5 255 0 0 6 128 0 0
B 0 0 128
F 128 0 0
N 128 128 128
    
Consultez les fichiers .cpt existants pour d'autres exemples. S'il y a des problèmes avec un fichier .cpt,ERDDAP™va probablement lancer une erreur lorsque le fichier .cpt est analysé (mieux que de mal utiliser l'information) .
    
Vous pouvez ajouter des palettes supplémentaires àERDDAP. Vous pouvez les faire vous-même ou les trouver sur le web (par exemple, à[cpt ville](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) bien que vous devrez probablement modifier leur format légèrement pour se conformer àERDDAPLes prescriptions du .cpt. Pour obtenirERDDAP™pour utiliser un nouveau fichier .cpt, stocker le fichier dans *Tomcat* /webapps/erddap/WEB-INF/cptfiles (pour chaque nouvelle version deERDDAP) et soit:
    
    * Si vous utilisez le fichier message.xml par défaut : ajoutez le nom du fichier&lt;palettes&gt; balise dans
         *Tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
Si vous faites cela, vous devez le faire chaque fois que vous mettez à niveauERDDAP.
    * Si vous utilisez un fichier message.xml personnalisé : ajoutez le nom du fichier&lt;palettes&gt; tag dans votre fichier message.xml personnalisé: *Tomcat* /content/erddap/messages.xml . Si vous faites cela, vous n'avez qu'à le faire une fois (mais il y a d'autres travaux pour maintenir un fichier message.xml personnalisé) .
    
Puis redémarrezERDDAP™doncERDDAP™remarque les changements. Un avantage de cette approche est que vous pouvez spécifier l'ordre des palettes dans la liste présentée aux utilisateurs. Si vous ajoutez une collection, nous vous encourageons à ajouter un préfixe avec les initiales des auteurs (Par exemple, "KT\\_") au nom de chaque palette pour identifier la collection et ainsi il peut y avoir plusieurs palettes qui auraient autrement le même nom.
    
Veuillez ne pas supprimer ou modifier les palettes standard. Ils sont une caractéristique standard de tousERDDAP™les installations. Si vous pensez qu'une palette ou une collection de palettes doit être incluse dans la normeERDDAP™la distribution parce qu'elle/ils seraient d'usage général, s'il vous plaît les envoyer à Chris. John à noaa.gov.
    
### Barres de couleurs{#colorbars} 
*    **Comment faireERDDAP™générer les couleurs dans une barre de couleurs?** 
    
    1. L'utilisateur sélectionne l'un des paramètres prédéfinis[palettes](#palettes)ou utilise la valeur par défaut, par exemple Rainbow. Les palettes sont stockées/définies dans des fichiers de type GMT.cpt Color Palette Table. ChaqueERDDAPLes palettes prédéfinies ont une gamme entière simple, par exemple 0 à 1 (s'il n'y a qu'une section dans la palette) , ou 0 à 4 (s'il y a quatre sections dans la palette) . Chaque segment du fichier couvre n à n+1, à partir de n=0.
    2.  ERDDAP™génère un nouveau fichier .cpt à la volée, en étalant la gamme de palette prédéfinie (Par exemple, 0 à 4) à la gamme de la palette requise par l'utilisateur (Par exemple, 0,1 à 50) puis générer une section dans la nouvelle palette pour chaque section de la nouvelle palette (Par exemple, une échelle logarithmique avec des tiques à 0,1, 0,5, 1, 5, 10, 50 comportera 5 sections) . La couleur pour le point de fin de chaque section est générée en trouvant la section pertinente de la palette dans le fichier .cpt, puis en interpolant linéairement les valeurs R, G et B. (C'est la même façon dont GMT génère des couleurs à partir de ses fichiers Color Palette Table.) Ce système permetERDDAP™pour commencer par les palettes génériques (Par exemple, Arc-en-ciel avec 8 segments, en total de 0 à 8) et créer des palettes personnalisées à la volée (Par exemple, un arc-en-ciel personnalisé, qui cartographie de 0,1 à 50 mg/L aux couleurs arc-en-ciel) .
    3.  ERDDAP™puis utilise ce nouveau fichier .cpt pour générer la couleur de chaque pixel coloré dans la barre de couleurs (et plus tard pour chaque point de données lors du tracé des données sur un graphique ou une carte) , encore une fois en trouvant la section pertinente de la palette dans le fichier .cpt, puis en interpolant linéairement les valeurs R, G et B.
    
Ce processus peut sembler inutilement compliqué. Mais il résout les problèmes liés aux échelles de log qui sont difficiles à résoudre d'autres façons.
    
Alors comment peux-tu imiterERDDAP™Ça va ? Ce n'est pas facile. Fondamentalement, vous devez dupliquer le processus quiERDDAP™est utilisé. Si vous êtes unJavaprogrammateur, vous pouvez utiliser la mêmeJavaclasse quiERDDAP™utilise pour faire tout cela:
     *Tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### Lignes directrices pour les systèmes de distribution de données{#guidelines-for-data-distribution-systems} 
Des avis plus généraux sur la conception et l'évaluation des systèmes de distribution des données sont disponibles.[ici](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html).
     
### ArchiveADataset{#archiveadataset} 
Inclus dans votreERDDAP™installation est un outil en ligne de commande appelé ArchiveADataset qui peut vous aider à créer une archive (a.zipou.tar.gzfichier) avec une partie ou la totalité d'un ensemble de données stockées dans une série de netcdf-3.ncfichiers de données dans un format de fichier qui convient à la soumission àNOAAArchives des RCEI (.ncpour les ensembles de données maillés ou[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)pour les ensembles de données tabulaires, comme spécifié par la[NCEINetCDFModèles v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) .

ArchiveA Dataset peut faire deux formats d'archives différents:

* Le format "original" suit ces[Lignes directrices sur l'archivage des RCEI](https://www.ncdc.noaa.gov/atrac/guidelines.html), ce guide pour[Archivage de vos données au CNEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1), et les[Pratiques visant à assurer l'intégrité des données](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity).
* Le format "BagIt" fait[Dossiers BagIt](https://en.wikipedia.org/wiki/BagIt), un format d'archives normalisé promu par la bibliothèque du Congrès des États-Unis, tel que spécifié par le[Spécifications BagIt v0.97](https://tools.ietf.org/html/draft-kunze-bagit-14).NOAAL'INCE peut normaliser les dossiers BagIt pour les présentations aux archives.

Sans surprise,[métadonnées mondiales et variables](/docs/server-admin/datasets#global-attributes)quiERDDAP™Les métadonnées des FC et de l'ACDD sont presque exactement les mêmes que celles de l'INCE, de sorte que tous vos ensembles de données devraient être prêts à être soumis à l'INCE.[Send2NCEI](https://www.nodc.noaa.gov/s2n/)ou[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (L'outil avancé de suivi et de ressources du CNEI pour les collections d'archives) .

Si vous (desERDDAP™administrateur) utiliser ArchiveADataset pour soumettre les données à l'INCE, puis vous (pas des RCEI) déterminera quand soumettre une partie des données à l'INCE et ce qu'elle sera, parce que vous saurez quand il y a de nouvelles données et comment spécifier cette partie (et les NCEI ne) . Ainsi, ArchiveADataset est un outil à utiliser pour créer un paquet à soumettre à l'INCE.

ArchiveA Les données peuvent être utiles dans d'autres situations, par exemple pourERDDAP™administrateurs qui doivent convertir un sous-ensemble de données (sur uneERDDAP) de son format de fichier natif dans un ensemble de[.ncFichiers CF](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA), pour qu'un publicERDDAP™peut servir les données de la.ncFichiers CF au lieu des fichiers originaux.

Une fois que vous avez installéERDDAP™et lance-le (au moins une fois) , vous pouvez trouver et utiliser ArchiveADataset dans le *Tomcat* répertoire /webapps/erddap/WEB-INF. Il y a un script shell (ArchiveADataset.sh) pour Linux/Unix et un fichier batch (ArchiveADataset.bat) pour Windows.

Sous Windows, la première fois que vous exécutez ArchiveADataset, vous devez modifier l'archiveADataset. fichier bat avec un éditeur de texte pour changer le chemin vers le java. exe fichier pour que Windows puisse trouverJava.

Lorsque vous lancez ArchiveADataset, il vous posera une série de questions. Pour chaque question, tapez une réponse, puis appuyez sur Entrée. Ou appuyez sur ^C pour quitter un programme à tout moment.

Ou, vous pouvez mettre les réponses aux questions, dans l'ordre, sur la ligne de commande. Pour ce faire, exécutez le programme une fois et saisissez et écrivez vos réponses. Ensuite, vous pouvez créer une seule ligne de commande (avec les réponses comme paramètres) qui gère le programme et répond à toutes les questions.
Utilisez le mot par défaut si vous voulez utiliser la valeur par défaut pour un paramètre donné.
Utiliser "" (deux guillemets) comme support pour une chaîne vide.
Spécifier les paramètres sur la ligne de commande peut être très pratique, par exemple, si vous utilisez ArchiveADataset une fois par mois pour archiver la valeur mensuelle des données. Une fois que vous avez généré la ligne de commande avec des paramètres et enregistré cela dans vos notes ou dans un script shell, vous avez juste besoin d'effectuer de petites modifications chaque mois pour faire l'archive de ce mois.

Les questions posées par ArchiveADataset vous permettent :

* Spécifiez l'emballage du fichier original ou Bagit. Pour l'INCE, utilisez Bagit.
* Indiquer le zip ou le goudron.gzcompression pour le paquet. Pour les RCEI, utiliser le goudron.gz.
* Spécifier une adresse email de contact pour cette archive (il sera écrit dans le fichier READ\\_ME.txt dans l'archive) .
* PréciserdatasetIDde l'ensemble de données à archiver.
* Spécifiez les variables de données à archiver (généralement tous) .
* Spécifiez le sous-ensemble de données que vous souhaitez archiver. Vous devez formater le sous-ensemble de la même manière que vous formateriez un sous-ensemble pour une demande de données, donc il sera différent pour matriqué que pour les ensembles de données tabulaires.
    * Pour les ensembles de données maillés, vous pouvez spécifier une plage de valeurs de la dimension la plus gauche, généralement une plage de temps. ArchiveDataset fera une requête séparée et générera un fichier de données séparé pour chaque valeur dans la gamme de valeurs. Puisque les ensembles de données maillés sont généralement grands, vous devrez presque toujours spécifier un petit sous-ensemble par rapport à la taille de l'ensemble des données.
Par exemple,\\[ (Année 2015-12-01) : (2015-12-31) \\]\\[\\]\\[\\]\\[\\]
    * Pour les ensembles de données tabulaires, vous pouvez spécifier toute collecte de contraintes, mais c'est souvent une plage de temps. Étant donné que les ensembles de données tabulaires sont généralement petits, il est souvent possible de ne spécifier aucune contrainte, de sorte que l'ensemble des ensembles de données soit archivé.
Par exemple, &time&gt;=2015-12-01&time&lt;Année
* Pour les ensembles de données tabulaires : spécifiez une liste séparée par virgule de 0 variables ou plus qui déterminera comment les données archivées sont ensuite regroupées dans différents fichiers de données. Pour les ensembles de données
    [cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)\\=Séries horaires|TimeSeriesProfile|Trajectoire|Profil de trajectoire
vous devez presque toujours spécifier la variable qui possède le cf\\_role=timeseries\\_id (Par exemple,stationID) ou l'attribut cf\\_role=trajectory\\_id. ArchiveADataset fera une requête séparée et générera un fichier de données séparé pour chaque combinaison des valeurs de ces variables, par exemple, pour chaquestationID.
Pour tous les autres ensembles de données tabulaires, vous ne spécifierez probablement aucune variable à cette fin.
Avertissement : Si le sous-ensemble de données que vous archivez est très important (&gt; 2 Go) et il n'y a pas de variable appropriée à cette fin, alors ArchiveADataset n'est pas utilisable avec cet ensemble de données. Ça devrait être rare.
* Spécifiez le format de fichier pour les fichiers de données qui seront créés.
Pour les ensembles de données maillés, pour l'INCE, utiliser.nc.
Pour les ensembles de données tabulaires, pour l'INCE, utiliser[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)si c'est une option; autrement utiliser.nc.
* Spécifiez le type de digest à créer pour chaque fichier de données et pour l'ensemble du paquet d'archive : MD5, SHA-1 ou SHA-256. Le fichier digest fournit un moyen pour le client (p.ex.) pour vérifier si le fichier de données est devenu corrompu. Traditionnellement, ces[Fichiers .md5](https://en.wikipedia.org/wiki/MD5), mais maintenant il y a de meilleures options. Pour les RCEI, utilisez SHA-256.

Après avoir répondu à toutes les questions, ArchiveADataset:

1. Effectuer une série de requêtes à l'ensemble de données et mettre en scène les fichiers de données résultants dans *BigParent Directory* /ArchiveADataset/ *datasetID\\_timestamp* - Oui.
Pour les ensembles de données maillés, il y aura un fichier pour chaque valeur de la dimension la plus gauche (Par exemple, heure) . Le nom du fichier sera cette valeur (Par exemple, la valeur temporelle) .
Pour les ensembles de données tabulaires, il y aura un fichier pour chaque valeur de la variable ... (s) . Le nom du fichier sera cette valeur. S'il y a plus d'une variable, les variables de gauche seront utilisées pour faire des noms de sous-répertoires, et la variable la plus droite sera utilisée pour faire les noms de fichiers.
Chaque fichier de données doit être&lt;2 Go (le maximum autorisé par.ncfichiers de la version 3) .
2. Créez un fichier lié à chaque fichier de données avec le digest du fichier de données. Par exemple, si le fichier de données est 46088.ncet le type digest est .sha256, puis le fichier digest aura le nom 46088.nc.sha256 .
3. Créez un fichier READ\\_ME.txt avec des informations sur l'archive, y compris une liste de tous les paramètres que vous avez spécifiés pour générer cette archive.
4. Faites 3 fichiers dans *BigParent Directory* /ArchiveADataset/ :
    
    * A.zipou.tar.gzfichier d'archive nommé *datasetID\\_timestamp* .zip  (ou.tar.gz) contenant tous les fichiers de données par étapes et digérer les fichiers. Ce fichier peut être n'importe quelle taille, limité uniquement par l'espace disque.
    * Un fichier digest pour le fichier d'archive, par exemple, *datasetID\\_timestamp* .zip.sha256.txt
    * Pour le type d'archive "original", un fichier texte nommé *datasetID\\_timestamp* .zip.listOfFiles.txt (ou.tar.gz) qui énumère tous les fichiers dans le.zip  (ou.tar.gz) fichier.
    
Si vous préparez les archives pour l'INCE, ce sont les fichiers que vous allez envoyer à l'INCE, peut-être via[Send2NCEI](https://www.nodc.noaa.gov/s2n/)ou[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (L'outil avancé de suivi et de ressources du CNEI pour les collections d'archives) .
5. Supprimer tous les fichiers mis en scène de sorte que seul le fichier d'archive (Par exemple,.zip) , le digest (Par exemple, .sha256.txt) des archives, et (facultativement) les fichiers .listOfFiles.txt restent.

#### ISO 19115 .xml Fichiers de métadonnées{#iso-19115-xml-metadata-files} 
Le paquet ArchiveADataset archive n'inclut pas le fichier de métadonnées ISO 19115 .xml pour l'ensemble de données. Si vous souhaitez/avez besoin de soumettre un fichier ISO 19115 pour votre ensemble de données à l'INCE, vous pouvez leur envoyer le fichier de métadonnées ISO 19115 .xml quiERDDAP™créé pour l'ensemble de données (maisNMFSles personnes devraient obtenir le fichier ISO 19115 pour leurs ensembles de données d'InPort siERDDAP™ne sert pas déjà ce fichier) .

Des problèmes ? Des suggestions ? ArchiveADataset est nouveau. Si vous avez des problèmes ou des suggestions, consultez notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).
     
