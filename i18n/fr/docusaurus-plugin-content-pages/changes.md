---
title: "ERDDAP™ - Changes"
---
# ERDDAP™Changements

ERDDAP™est un excellent exemple de[Innovation axée sur l'utilisateur](https://en.wikipedia.org/wiki/User_innovation), où l'innovation des produits provient souvent des consommateurs (ERDDAP™utilisateurs) , pas seulement les producteurs (ERDDAP™développeurs) . Au fil des ans, la plupart des idées de nouvelles caractéristiques et de changementsERDDAP™proviennent d'utilisateurs. Ces utilisateurs sont crédités ci-dessous pour leurs grandes idées. Je vous remercie &#33; S'il vous plaît gardez ces grandes suggestions à venir&#33;

Voici les changements associés à chaqueERDDAP™libérer.

## Version 2.27.0{#version-2270} 
 (publié le 2025-06-11) 

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    * Nouvelles données au convertisseur colorbar sur les serveurs à /erddap/convert/color.html

*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * Par défaut behavoir est que le cache sera maintenant effacé indépendamment de la tâche des ensembles de données de charge. Cela permettra une compensation plus fiable et régulière des anciens fichiers cache. Il y a du travail supplémentaire pour améliorer le comportement du serveur lorsque faible sur l'espace disque (retour d'une erreur pour les requêtes susceptibles de faire manquer le serveur de l'espace, et nettoyage du cache plus fréquemment dans des circonstances de disque faible pour tenter d'éviter les erreurs) . Endatasets.xml  (ou setup.xml) vous pouvez ajouter/configurer le nouveau cache Paramètre ClearMinutes pour contrôler la fréquence des vérifications du serveur pour effacer le cache. Note, le paramètre cacheMinutes existant contrôle l'âge des fichiers à conserver, le nouveau cache ClearMinutes est pour la fréquence à faire un clair de cache.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
Vous pouvez désactiver les nouvelles vérifications claires du cache en définissant taskCacheClear à false dans setup.xml, mais ce n'est pas recommandé.
cache ClearMinutes est également dans le[documentation des ensembles de données](/docs/server-admin/datasets#cacheclearminutes).
    
    * Gestion des métadonnées des ensembles de données localisés. Il soutient la localisation des valeurs dans unaddAttributesChapitre. Ajoutez simplement un attribut avec la balise xml:lang supplémentaire. Par exemple pour ajouter un titre français à un jeu de donnéesaddAttributesla section comprendrait:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
Des détails supplémentaires sont disponibles dans le[documentation de métadonnées localisées](/docs/server-admin/localized-metadata).

    * Nouveau Docker Composez un fichier avec des options pour SSL et un serveur Prométhée. Merci à Shane St. Savage pour le SSL et Jiahui Hu pour le Prométhée.

    * Prise en charge de l'utilisation des informations dans les en-têtes pour déterminer l'URL du serveur au lieu de se fier au fichier de configuration. Cela permettra d'accéder à un serveur par plusieurs noms et peut simplifier certaines configurations. Veuillez l'activer et envoyer vos commentaires.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * Quelques petits changements, corrections de bugs et optimisations.

*    **PourERDDAP™Développeurs :** 
    * Refacteur de la façon dont les types de fichiers de sortie sont définis dans le code. Cela devrait le faire afin que les types de fichiers puissent être ajoutés sans avoir à toucher de nombreux endroits de code.

## Version 2.26{#version-226} 
 (publié en 2025-03-31) 

*    **Pour tous:** 
    * Grande mise à jour de notre site de documentation: https://erddap.github.io/
 
Outre l'apparence mise à jour, il y a une meilleure navigation, recherche, traduction, et il devrait être plus facile de maintenir aller de l'avant&#33;

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    * Abonnements etRSSles mises à jour devraient se produire de façon plus fiable pour les ensembles de données qui sont mis à jour fréquemment à partir des changements de fichiers.

*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * La version par défaut nécessite/supporteJavaversion 21. De retour dans cette version est en mesure de faire facilement unJava17 binaire compatible.

    * Nouvelle fonctionnalité pour personnaliser les informations affichées sur les ensembles de données dans l'interface utilisateur. Nous nous attendons à ce que cela soit particulièrement utile pour ajouter des choses comme les citations de jeux de données. Pour plus de détails, vous pouvez lire le[nouvelle documentation](/docs/server-admin/display-info). Merci à Ayush Singh pour la contribution&#33;

    * Mesures Prométhée supplémentaires. La plus grosse est `http_request_duration_seconds` qui inclut les temps de réponse de la requête ventilés par: "request_type", "dataset_id", "dataset_type", "file_type", "lang_code", "status_code"
Ce format lisible par machine permettra une meilleure collecte de métriques pour comprendre comment les utilisateurs utilisent le serveur.

    * Nouvelle façon de générer des fichiers XML ISO19115. Il utilise Apache SIS et est une nouvelle option dans cette version. Veuillez l'activer et envoyer vos commentaires.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * L'interface utilisateur va maintenant créer des liens individuels pour chaque url dans des champs comme leinfoUrlet résumé.

    * Abonnements etRSSles mises à jour devraient se produire de façon plus fiable pour les ensembles de données qui sont mis à jour fréquemment à partir des changements de fichiers. Si cela cause des problèmes, veuillez contacter GitHub et désactiver la fonctionnalité en ajoutant le drapeau ci-dessous à votre setup.xml.
NON RECOMMANDÉ
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Les variables de sous-ensemble ne seront plus automatiquement générées pour les données de type EDDTableFromNcCFFiles. Si vous dépendiez du comportement, vous pouvez (solution préférée) ajoutersubsetVariablesà la définition des ensembles de données dans votredatasets.xml, ou ajoutez le drapeau ci-dessous à votre setup.xml. Si vous ressentez le besoin d'allumer cela, veuillez contacter GitHub afin que nous puissions mieux soutenir votre cas d'utilisation aller de l'avant.
NON RECOMMANDÉ
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Le serveur va maintenant rediriger les requêtes de documentation (sous téléchargements/ qui est la documentation qui a été migré) au nouveau site de documentation. Si nécessaire, vous pouvez désactiver cela avec un drapeau dans setup.xml:
NON RECOMMANDÉ
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Quelques petits changements et corrections de bug.

*    **PourERDDAP™Développeurs :** 
    * Plus d'améliorations de la qualité du code et de nettoyage du code mort. Cela comprend des optimisations mineures, une meilleure gestion des ressources de fermeture et la migration des types de données obsolètes (comme Vector) .

    * Grand refactoring à EDStatic pour retirer la plupart des codes de configuration, de message et de métrique. Il permet également de mieux encapsuler l'initialisation et le traitement des chemins de répertoire (Ces deux derniers ont encore à faire.) 

    * Beaucoup de progrès vers une image Docker officiellement soutenue. Le plan est de finaliser et de publier après leERDDAP™2.26 version est disponible.

## Version 2.25{#version-225} 
 (publié le 2024-10-31) 

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    * EDDTableFromFiles peut désormais prendre en charge les requêtes avec seulement des sorties dérivées (globals, script jexl ou variables) .
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * La version 2.25 nécessiteJava21 ou plus récent. Il s'agit de la version LTS et est disponible depuis plus d'un an.
         
    * Le service de veille partagée est maintenant par défaut. Si vous devez le désactiver, veuillez contacter Chris. John à noaa.gov pour me faire savoir, afin que je puisse l'améliorer dans les versions futures et ajouter:
        &lt;useSharedWatchService&gt;false&lt;/useSharedWatchService&gt; sur votre setup.xml.
         
    * LesERDDAP™servlet va maintenant démarrer au démarrage du serveur. Ce qui signifie que les ensembles de données commenceront à être chargés immédiatement au lieu d'attendre qu'une demande soit faite.
         
    * Le paramètre removeMVRows dans EDDTableFromMultidimNcFiles aura désormais un effet. Le paramétrer à false peut accélérer considérablement certaines requêtes, mais cela peut ne pas convenir à tous les ensembles de données. Pour plus d'informations, voir[description du paramètre](/docs/server-admin/datasets#removemvrows).
         
    * Données (EDDTableFromNcFiles etEDDGridDeNcFiles) L'utilisation de fichiers zarr est désormais prise en charge. Ils doivent inclure "zarr" dans le fichierNameRegex ou pathRegex. Voir[Section zarr dans la documentation des ensembles de données](/docs/server-admin/datasets#zarr)pour plus de détails.
         
    * Nouveau type de dataset, EDDTableFromParquetFiles est maintenant pris en charge. Voir[EDDTableFromParquetFiles section dans la documentation des ensembles de données](/docs/server-admin/datasets#eddtablefromparquetfiles)pour plus de détails.
         
    *   [Mesure de Prométhée](https://prometheus.io/)sont maintenant disponibles à /erddap/metrics.
         
    * Une nouvelle implémentation d'analyseur XML est disponible. Ce nouvel analyseur permet d'utiliser XInclude dansdatasets.xml. Merci à Ayush Singh pour la fonctionnalité.
         
    * Nouveau paramètre dansdatasets.xmlpour contrôler les courriels d'activité inhabituels. activité inhabituelle ÉchecPourcent par défaut à l'ancienne valeur de 25%. Merci à Ayush Singh pour la fonctionnalité.
         
    * Nouveau paramètre dans setup.xml qui contrôle si les erreurs de chargement de l'ensemble de données sont affichées sur la page status.html. Il est par défaut true, pour désactiver les erreurs de jeu de données sur la page d'état, définissez showLoadErrorsOnStatusPage à false:&lt;AfficherLoadErrorsOnStatusPage&gt;false&lt;/showLoadErrorsOnStatusPage&gt;
         
    * Quelques petits changements et corrections de bug.
         
*    **PourERDDAP™Développeurs :** 
    * Essai séparé en unité et intégration (lent) essais. En outre, plus d'essais ont été activés et les essais ont été rendus moins flous.
         
    * Erreur Prone (certains contrôles encore désactivés) et Spot Bugs intégrés par Maven.
         
    * Base de code complète formatée pour correspondre au Guide Google Style.
         

## Version 2.24{#version-224} 
 (publié le 2024-06-07) 

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    * Nouvelle palette de couleurs EK80 pour les ensembles de données acoustiques disponibles. Merci à Rob Cermak pour ça.
         
    * Fixer un problème où EDDTableAggregateRows n'a pas montré de fourchettes appropriées pour tous les enfants. Merci à Marco Alba pour le rapport de correction et de bogue.
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * À faire : CHANGEMENT DE SÉCURITÉ : Google Authentification pourrait nécessiter des modifications à votre CSP.
        
Plus précisément, vous devrez peut-être ajouter https://accounts.google.com/gsi/style à stlye-src et https://accounts.google.com/gsi/ pour se connecter. Pour le script-src vous pouvez maintenant utiliser https://accounts.google.com/gsi/client.
 
        
Pour plus d'informations, vous pouvez aller au[Page Google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)sur la configuration du CSP.
         
        
    * Nouveau service de veille partagée. C'est une nouvelle option pour regarder les répertoires pour les mises à jour. Il a un thread pour chaque système de fichiers au lieu d'un thread par jeu de données. Très probablement, cela réduira considérablement le nombre de fils utilisés pour surveiller les changements. Cela signifie que tous les ensembles de données sont mis à jour ensemble au lieu de chaque ensemble de données ayant sa propre fréquence de mise à jour. Il est fort probable que cela entraînera des mises à jour plus fréquentes pour la plupart des ensembles de données.
        
Pour activer cet ajout&lt;useSharedWatchService&gt;true&lt;/useSharedWatchService&gt; sur votre setup.xml.
        
          
S'il vous plaît essayez ceci et rapportez comment cela fonctionne pour vous à chris. John à Noaa.gov.
         
    * Correction pour les noms de var incorrects dans les journaux. Merci à Ayush Singh pour la réparation.
         
    * Quelques petits changements et corrections de bug.
         
*    **Améliorations apportéesERDDAP™développeurs & #160;:** 
    * Soutien au développement local avec Docker. Merci Matt Hopson et Roje.
         
    * Appui au développement local grâce à l'amélioration de Jetty et de la documentation. Merci Micah Wengren.
         
    * Changements aux tests afin de réduire les problèmes crossplateforme. Je vous remercie. Shane St. Savage.
         

## Version 2.23{#version-223} 
 (publié le 2023-02-27) 

Notez que cette sortie a été faite par Bob Simons, montrant ainsi qu'il est toujours présent et actif pendant la transition vers Chris John, son successeur. Avec cette version, tous les changements de code sont effectués par Chis John, sauf indication contraire.

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    *    (Aucune)   
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * À faire : CHANGEMENT DE SÉCURITÉ : Google Authentification est maintenant accompli via la nouvelle bibliothèque Google Identity Services qui fait partie de « Se connecter avec Google ». Le support de Google pour l'ancien système "Google Sign In" sera arrêté 2023-03-31. Donc si vous utilisez Google Authentification dans votreERDDAP™installation, vous DEVEZ mettre à jourERDDAP™v2.23+ avant. (Bob est désolé pour le court préavis. C'est la faute de Bob.)   
         
    * AMÉLIORÉ: Le CCNV est maintenant v1.2. Le changement est que les fichiers sont maintenant encodés UTF-8 (ils étaient ASCII) et ainsi peut maintenant inclure n'importe quel caractère Unicode tel qu'il est, sans encoder \\u_hhh_, bien que cela soit encore autorisé.
Lors de la rédaction des fichiers CCNSV,ERDDAP™maintenant écrit les fichiers v1.2.
        ERDDAP™lirea toujours les fichiers NCCSV qui suivent les spécifications v1.0 et v1.1.
Merci à Pauline-Chauvet, n-a-t-e, etthogar-ordinateur pour avoir suggéré cela et faire les tests pour s'assurer que divers programmes de tableurs peuvent importer des fichiers UTF-8. Merci à Bob Simons pour ce changement de code.
         
    * NOUVEAU : La page web status.html a maintenant une ligne près du haut qui indique quel ensemble de données loadDatasets est actuellement en charge et statistiques connexes, ou aucune si aucun ensemble de données n'est en charge. Cela peut être très utile pourERDDAP™administrateurs essayant de comprendre pourquoi charger Les données prennent tellement de temps. De plus, les ensembles de données nGrid, nTableDatasets et nTotalDatasets comptent en dessous qui sont maintenant instantanés (précédemment, ils étaient à la fin de la dernière charge majeure Données) .
Ce changement est pour Roy Mendelssohn. Merci à Bob Simons pour ce changement de code.
         
    * AMÉLIORATION: Générer des ensembles de données Xml change maintenant pour CF-1.10 (était CF-1.6) dans les attributs "Conventions".
Merci à Bob Simons pour ce changement de code.
         
    * Quelques petits changements et corrections de bug.
         

## Version 2.22{#version-222} 
 (publié le 2022-12-08) 

Notez que cette sortie a été faite par Bob Simons, montrant ainsi qu'il est toujours présent et actif pendant la transition vers son successeur.

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    *    (Aucune)   
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * À faire : rien.
         
    * FIXE DE SÉCURITÉ : Il y avait un bug lié au Scripting Cross Site dans le code pour la sélection de la langue. Grâce àNOAAscans de sécurité pour attraper ceci. Cela montre queNOAAla sécurité est activement et régulièrement à la recherche de faiblesses en matière deERDDAP.
         
    * FIXE DE SÉCURITÉ: Les nombreuses bibliothèques utilisées parERDDAP™ont été mis à jour, comme d'habitude, dans le cadre de cette publication. Cette fois, cela comprenait la mise à jour du pilote PostgreSQLTM (qui avait un bug de sécurité) à 42.5.1.
         
    * AMÉLIORÉ : Changements plus modestesERDDAPLe système de gestion de la mémoire devrait réduire les risques de défaillance d'une demande en raison du manque de mémoire disponible.
         
    * Quelques petits changements et corrections de bug.
         

## Version 2.21{#version-221} 
 (publié le 2022-10-09) 

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    *    (Aucune)   
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * À faire:Java17, vous ne devriez pas utiliser \\-d64 dans JAVA\\_OPTS dans setenv.bat ou setenv.sh. Donc s'il est là, s'il vous plaît enlever. Je pense que le mode 64 bits est maintenant sélectionné lorsque vous téléchargez une version 64 bits deJava. Grâce à Sam Woodman.
         
    * C'est pas vrai. Parfois, le nouveau système de messagerie a tenté de se connecter trop souvent, ce qui a amené les serveurs Google Email à rejeter toutes les tentatives futures de connexion. Maintenant, le système de messagerie évite cela et les problèmes connexes.
         

## Version 2.20{#version-220} 
 (publié le 2022-09-30) 

*    **N'utilisez pas v2.20. Il est défectueux.** Mais les administrateurs doivent toujours faire les éléments TO DO énumérés ci-dessous lors de la mise à niveau vers v2.21+.
     
*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    *    (Aucune)   
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * AMÉLIORATION: Nous avons réactivé l'ancien système de gestion de la mémoire (Math2.ensureMémorieDisponible) et modifié le nouveau système de gestion de la mémoire (EDStatic. a rejeté cette demande) pour mieux travailler avec. Voir[État de la mémoire](/docs/server-admin/additional-information#memory-status)pour plus de détails.
         
    * CHANGEMENT : La valeur par défaut pour&lt;ipAddressMaxDemandes&gt; endatasets.xmlest passé de 7 à 15. Il est clair que certains sont légitimes.WMSLes clients peuvent générer plus de 7 demandes simultanées.
         

## Version 2.19{#version-219} 
 (publié le 2022-09-01) 

*    **N'utilisez pas v2.19. Il est défectueux.** Mais les administrateurs doivent toujours faire les éléments TO DO listés ci-dessous lors de la mise à niveau vers v2.20+.
     
*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    * NOUVEAU : Il y a une nouvelle fonction côté serveur,orderByDescendant, qui fonctionne commeorderByMais en ordre décroissant. Merci à Adam Leadbetter.
         
    * AMÉLIORER: Maintenant, graphiques (mais pas de cartes) sera étendu pour remplir l'espace disponible sur la toile, c'est-à-dire l'espace non utilisé par la légende. Vous pouvez obtenir des graphiques hauts, des graphiques carrés ou des graphiques larges en ajoutant et en manipulant le &.size=_width_|paramètre _hauteur_ (où largeur et hauteur spécifient la taille de la toile, en pixels) sur l'URL de la requête. (Ce n'est pas une option sur la page web .graph. Vous devez l'ajouter à l'URL manuellement.) Si vous ne spécifiez pas le paramètre &.size, les requêtes pour .smallPng, .png, .largePng, .smallPdf, .pdf et .large.pdf ont des tailles de toile prédéfinies, de sorte que votre graphique s'étendra pour remplir l'espace disponible, mais sera généralement carré. Grâce à Bob Fleming.
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * À faire :ERDDAP™maintenant demandeJava17 et le Tomcat 10. Vous devez suivreERDDAP™instructions d'installation (ou l'équivalent, par exemple, pour Docker) pour installerJava17 et Tomcat 10 et copiez votre\\[Tomcat\\]/content répertoire de votre installation Tomcat 8 dans le nouveau\\[Tomcat\\]répertoire. Il n'y a aucun autre changement que vous devez apporter à votreERDDAPinstallation liée à ce changement. En d'autres termes,ERDDAP™fonctionne comme avant.
        
N'oubliez pas de faire leERDDAP-modifications liées au serveur.xml de Tomcat et au contexte.xml lorsque vous mettez à niveau Tomcat. VoirERDDAP's[Instructions d'installation Tomcat](/docs/server-admin/deploy-install#tomcat).
        
Mon impression deJava17 est qu'il préfère plus de puissance de traitement et de mémoire pour les applications de longue durée, plus grandes commeERDDAP™, donc il fonctionne légèrement plus lentement queJava8 avec ordinateurs de faible puissance (Par exemple, 2 carottes et une RAM minimale) et fonctionne légèrement plus vite queJava8 avec des ordinateurs plus puissants (Par exemple, 4 cœurs et une RAM abondante) . Donc, si vous voyez de mauvaises performances, utilisez des programmes comme Linux[haut](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)vérifier l'utilisation des ressources et envisager de donnerERDDAP™plus de ressources, notamment plus de mémoire. La mémoire est bon marché &#33; La plupart des téléphones ont plus de processeurs et de mémoire que les serveurs que certains d'entre vous utilisent pour exécuterERDDAP- Oui.
Grâce à Erin Turnbull.
         
        
    * À faire: Si vous utilisezERDDAP™pour accéder à Cassandra, pour Cassandra, vous devez continuer à utiliser la version deJavaque vous utilisiez pour diriger la Cassandra. Passez àJava17 pour la course Tomcat+ERDDAP.
         
    * À faire: Recommandé: Si le processeur de votre serveur a 4+ cœurs et 8+ Go de RAM, envisagez de changer ces paramètres dans votredatasets.xmlfichier & #160;:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Si votre serveur a moins de ressources, collez à "1" pour ces deux paramètres.
Les systèmes nThreads pourEDDGridFromFiles et EDDTable FromFiles a été considérablement amélioré. Ces changements ont conduit à une énorme amélioration de la vitesse (Par exemple, accélération 2X lorsque nThreads est réglé à 2 ou plus) pour les demandes les plus difficiles (lorsqu'un grand nombre de dossiers doivent être traités pour recueillir les résultats) . Certains changements connexes de Chris John conduira également à une accélération générale tout au longERDDAP. Chris John a apporté le code de ces changements. Merci, C'est Chris &#33;
         
    * AVERTISSEMENT: traits d'union dansdatasetID's sont dépréciés et ne sont plus supportés (Bien que techniquement encore autorisé) . Ils seront probablement refusés dans la prochaine version. Si vous utilisez des tirets, changez pour souligner maintenant pour éviter les problèmes. Si vous faites le changement maintenant, c'est à votre propre vitesse. Si tu attends la prochaine sortie, tu seras en panique et tu devras y faire face ce jour-là.
         
    * Maintenant, pour.htmlTableles réponses des données, si les données d'une cellule String contiennent des données:image/png;base64, suivie d'une image .png codée de base64,ERDDAP™affichera une icône (afin que l'utilisateur puisse voir l'image s'ils survolent) et boutons pour enregistrer le texte ou l'image dans le presse-papiers. Merci à Marco Alba (qui a contribué au code) et Bob Simons (qui l'ont légèrement modifiée) .
         
    * NOUVEAU: -NotAddStandardNames
Si vous incluez \\-doNotAddStandardNames comme paramètre de ligne de commande lorsque vous exécutez générer Données Xml, générer Données Xml n'ajoutera passtandard\\_nameauxaddAttributespour toute variable autre que des variables nommées latitude, longitude, altitude, profondeur ou temps (qui sont évidentesstandard\\_names) . Cela peut être utile si vous utilisez la sortie de générer Données Xml directement dansERDDAP™sans modifier la sortie, car générer Données Xml devine souventstandard\\_names incorrectement. (Notez que nous vous recommandons toujours de modifier la sortie avant de l'utiliser dansERDDAP.) L'utilisation de ce paramètre aura d'autres effets mineurs liés parce que le devinéstandard\\_nameest souvent utilisé à d'autres fins, par exemple pour créer une nouvellelong\\_name, et pour créer les paramètres colorBar . Grâce à Kevin O'Brien.
         
    * NOUVEAU: Vous pouvez maintenant mettre&lt;mise à jourMaxEvents&gt;10&lt;/mise à jourMaxEvents&gt; endatasets.xml  (dans avec les autres réglages près du haut) pour modifier le nombre maximum de changements de fichiers (par défaut=10) qui sera traité par le système de mise à jour EveryNMillis. Un plus grand nombre (100 ?) peut être utile lorsqu'il est très important que l'ensemble de données soit toujours à jour. Voir[mettre à jour la documentation MaxEvents](/docs/server-admin/datasets#updatemaxevents). Merci à John Maurer.
         
    * NOUVEAU: Ajout d ' un appui au niveau mondial &gt; &gt;real\\_time=vrai|false" attribut chaîne.
Si c'est faux (par défaut) et si l'ensemble de données n'utilise pas la mise à jour Chaque NMillis,ERDDAP™cache les réponses aux demandes de types de fichiers où le fichier entier doit être créé avantERDDAP™peut commencer à envoyer la réponse à l'utilisateur et les réutiliser pendant environ 15 minutes (Par exemple,.nc, .png) .
Si c'est true ou si l'ensemble de données utilise la mise à jour Chaque NMillis,ERDDAP™ne cache jamais les fichiers de réponse et retournera toujours les fichiers nouvellement créés.
Merci à John Maurer.
         
    * NOUVEAU : Les courriels sont maintenant envoyés dans un e-mail distinctThread. Cela rend le chargement des ensembles de données et d'autres actions qui génèrent des e-mails plus rapides parce que loadDatasets n'a pas à attendre que l'e-mail soit envoyé, ce qui prend parfois beaucoup de temps. Le nouveau système peut envoyer plusieurs courriels par session d'email, réduisant ainsi le nombre de connexions de serveur d'email et réduisant le risque de défaillance de ceux qui sont trop fréquents. Il y a des statistiques pour le courrielThread sur la page status.html et les messages de diagnostic dans log.txt -- recherchez "emailThread". Notez qu'un nombre de nEmailsPerSession=0 indique des problèmes, c'est-à-dire qu'une session de courriel n'a pu envoyer aucun courriel.
Merci à Bob Simons.
         
    * CHANGEMENT: Les courriels sont maintenant envoyés avec un code légèrement différent (à cause deJava17 et le changement à emailThread) . Si vous avez de la difficulté à envoyer des courriels, veuillez envoyer un courrielerd.data at noaa.gov.
         
    * NOUVEAU : Les actions d'abonnement qui "touchent" une URL distante sont désormais traitées dans un touchThread séparé. Cela rend le chargement des ensembles de données et d'autres actions qui touchent les URL plus rapidement car loadDatasets n'a pas à attendre que la touche soit terminée, ce qui prend parfois beaucoup de temps. Il y a des statistiques pour le touchThread sur la page status.html et les messages de diagnostic dans log.txt -- cherchez "touchThread".
Merci à Bob Simons.
         
    * NOUVEAU: Sur la page status.html, dans la "Major LoadDatasets Time Series", il y a une nouvelle colonne "shed" qui indique le nombre de demandes qui ont été versées parce que courantERDDAP™L'utilisation de la mémoire était trop élevée. Les requêtes qui sont cadenas retourneront le code d'état HTTP 503 "Service Disponible". Ces demandes n'étaient pas nécessairement un problème. Ils viennent d'arriver à un moment chargé. Cela faisait partie d'une refonte de commentERDDAP™traite avec une utilisation de mémoire élevée.
         
    * NOUVEAU: Sur les ordinateurs Unix/Linux, il y a maintenant une ligne "OS Info" sur la page web status.html avec les informations actuelles du système d'exploitation, y compris la charge CPU et l'utilisation de la mémoire.
         
    * Maintenant, quandERDDAP™est redémarré et QuickRestart=true, les ensembles de données EDDTableFromFiles réutiliseront le sous-ensemble.ncet distincts.nc. Pour certains ensembles de données, cela diminue considérablement le temps de charger l'ensemble de données (Par exemple, de 60 secondes à 0,3 s) . Avec le nouveau e-mailThread et la tâcheThread (voir ci-dessus) , cela devrait grandement accélérer le redémarrageERDDAP™pour beaucoupERDDAP™les installations. Grâce à Ben Adams et John Kerfoot.
         
    * CHANGEMENT: Précédemment, ensembles de données orphelines (ensembles de données qui sont en direct dansERDDAP™mais ne sont pasdatasets.xml) ont simplement été notés sur le statut. html et dans log.txt après chaque chargement majeur. Maintenant, ils sont automatiquement retirés deERDDAP™et noté sur status.html et dans log.txt, et envoyé par courriel à email Tout pour. Donc, si vous voulez supprimer un ensemble de données deERDDAP™, maintenant tout ce que vous avez à faire est de supprimer son morceau de xml dansdatasets.xmlet il sera supprimé dans la prochaine charge majeure. Merci à Bob Simons.
         
    * SAVOIR BUG dans netcdf-java v5.5.2 et v5.5.3: LesEDDGridDe Threddes Option catalogue dans GenerateDatasets Xml utilisé pour travailler pour les catalogues THREDS qui incluent des références aux ensembles de données dans les catalogues THREDS distants. Ce n'est pas le cas. J'ai signalé le problème aux développeurs de netcdf-java.
         
    * BUG FIX: Pour les utilisateurs de Docker paramétrer les paramètres setup.xml viaERDDAP\\__paramName_: pour les paramètres int et booléen (Par exemple, courriel SmtpPort) ,ERDDAP™était incorrectement à la recherche juste _paramName_. Maintenant il cherche _ERDDAP\\_paramName_. Grâce à Alessandro De Donno.
         
    * CHANGEMENT: LESERDDAP™système de test utilise maintenant un système automatisé pour vérifier que les images de test nouvellement créées sont exactement comme prévu. Merci à Chris. John pour la suggestion et Bob Simons pour la mise en œuvre.
         

## Version 2.18{#version-218} 
 (publié le 2022-02-23) 

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    * Aucune
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * C'est pas vrai..ncLes dossiers n'étaient pas fermés dans certaines circonstances. Maintenant ils le sont. Grâce à Marco Alba, Roland Schweitzer, John Maurer et d'autres.
         

## Version 2.17{#version-217} 
 (publié le 2022-02-16) 

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    * C'est pas vrai. Après les changementsorderBysystème il y a quelques années, Tabledap Make A Graph n'a pas géré correctement de nombreuses requêtes qui ont utiliséorderBy_Xxx_. Maintenant, oui. Grâce à Maurice Libes.
         
    * Auparavant,ERDDAP™Demandes rejetées pour . transparent Png's lorsque les valeurs de latitude et/ou de longitude étaient partiellement ou totalement hors de portée. (ERDDAP™GitHub Issues #19, posté par Rob Fuller -- merci d'avoir affiché ce Rob) Maintenant, il retourne des pixels transparents pour toutes les zones hors de portée de l'image. Ceci est utile pour de nombreuses applications clientes. Chris John a entièrement modifié le code pour le faire. Merci beaucoup, Chris &#33;
         
    * Auparavant,ERDDAP™rejet des demandes griddap où les valeurs d'indice pour une dimension donnée étaient\\[haut: bas\\]. Maintenant, il rend ces demandes valides en échangeant les valeurs basses et élevées. Cela résout un problème de longue date pour les utilisateurs et pour les programmes externes comme xtracto qui a dû suivre les quelques ensembles de données qui ont des valeurs de latitude qui vont de haut à bas pour faire une demande comme\\[ (50) : (20) \\]de sorte que la demande dans l'espace index était\\[faible:élevé\\]. Voir https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Maintenant, une demande comme\\[ (20) : (50) \\]pour l'un de ces ensembles de données est automatiquement interprété comme\\[ (50) : (20) \\].
         
    * CHANGEMENT : les requêtes .esriAscii déclenchent maintenant une boîte de dialogue "Fichier : Enregistrer sous" dans le navigateur de l'utilisateur. Grâce à Joel Van Noord.
         
    * C'est pas vrai. Maintenant, si la variable de longitude d'un ensemble de données enfant d'unEDDGridLonPM180 ouEDDGridLon0360 dataset a unvalid\\_minet/ouvalid\\_maxattribut, ils sont supprimés dans leEDDGridLonPM180 ouEDDGridEnsemble de données Lon0360. Grâce à Roy Mendelssohn.
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * À faire: Si vous aviez réglé&lt;dataProviderFormActive&gt; à false pour traiter temporairement de la vulnérabilité XSS, veuillez le replacer à true.
         
    * SECURITY BUG FIX: Correction de la vulnérabilité XSS dans le formulaire de fournisseur de données. Grâce à Genaro Contreras Gutiérrez.
         
    * C'est pas vrai. Quand un répertoire AWS S3 avait plus de 10000 fichiers,ERDDAP™a lancé une "erreur interne". C'est maintenant réglé. Grâce à Andy Ziegler.
         
    * C'est pas vrai.EDDGridSideBySide n'a pas permis aux variablessourceNames dans différents ensembles de données pour enfants pour être les mêmes. Maintenant, oui. Grâce à Joshua Stanford.
         

## Version 2.16{#version-216} 
 (publié le 2021-12-17) 

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    * CHANGEMENTS/FIXES BUG : De nombreux petits changements au système de traduction grâce aux suggestions d'éditeurs de langue spécifique. Merci à Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian et Mike Smit.
         
    * AJOUTER un disclaimer approprié et l'attribution pour Google Translate, comme requis par les termes de Google Translate. En outre,&lt;html&gt; l'étiquette HTML pour chaque page Web identifie maintenant correctement les pages Web non anglaises comme ayant été traduites par machine. Grâce à Mike Smit.
         
    * C'est pas vrai. Les pages Web de connexion fonctionnent maintenant correctement avec différents paramètres linguistiques. Grâce à Mike Smit.
         
    * NOUVEAUorderByFiltre de somme. Et les nouveaux boutons Vérifier tout et Décocher tous les boutonsEDDGridPage Web du formulaire d'accès aux données. Grâce à la contribution du code de Marco Alba.
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * À faire: Si vous avez
        &lt;questionMarkImageFile&gt;QuestionMark.jpg&lt;/questionMarkImageFile&gt;
dans votre fichier setup.xml, vous devez soit supprimer la balise entière (recommandé, donc le fichier par défaut est utilisé) ou le remplacer par:
        &lt;questionMarkImageFile&gt;QuestionMark.png&lt;/questionMarkImageFile&gt;
         
    * Pour info,[Adoption](https://adoptium.net/?variant=openjdk8)a remplacé AdopteOpenJDK comme source principale/recommandée deJava  (OuvrirJDK) .
         
    * CHANGEMENT : Les fichiers journaux deERDDAP™, Générer des ensembles de données Xml, et DasDds sont maintenant UTF-8, pas le jeu de caractères par défaut de l'ordinateur. J'ai fait beaucoup de vérifications et j'ai fait quelques changements pour m'assurer queERDDAP™spécifie toujours le bon jeu de caractères lors de la lecture ou de l'écriture de tous types de fichiers, et non plus (dans plusieurs cas) dépend du jeu de caractères par défaut de l'ordinateur. Cela a corrigé quelques erreurs et déplacé aussi près que possible à l'objectif d'utiliser UTF-8 pour autant de types de fichiers que possible (Par exemple, .log, .xml, .html,.json,.jsonL,.ncEn-tête) . Notez que de nombreux anciens types de fichiers sont nécessaires pour utiliser ISO-8859-1 (Par exemple,OPeNDAP.das, .dds, .csv,.tsv,.nc3,.nccsv, .cpt) . J'ai déjà essayé de travailler avec le groupe des FC et avecUnidataajouter un soutien pour UTF-8 dans.nc3 dossiers, les deux étaient résistants.
         
    * NOUVEAU : lors du téléchargement des fichiers AWS S3,ERDDAPcache A partir du système UrlEDDGridFromFiles et EDDTable FromFiles utilise maintenant le nouveau gestionnaire de transfert AWS pour télécharger des fichiers via des morceaux parallélisés (donc très rapide) . Le débit cible est fixé à 20 Gbps, par fichier, donc cela fonctionne bien avec tous les types d'instances AWS, mais surtout ceux qui ont une excellente « performance réseau ». Avec ce changementERDDAPcache Le système FromUrl offre maintenant des vitesses comparables à l'approche de xarray de téléchargements parallélisés de fichiers pré-coupés, mais sans le besoin de convertir les fichiers source.ncet.hdfdans des fichiers xarray en morceaux. En fait,ERDDAPle système est mieux s'il y a une requête ultérieure à lire à partir du même fichier, parce queERDDAP™maintenant a une copie locale du fichier. Notre communauté a passé des années à normaliser.ncet.hdffichiers. Maintenant, nous n'avons pas à lancer ce tout pour obtenir de bonnes performances lors du stockage de données dans AWS S3. Merci à Rich Signell.
         
    * CHANGEMENT: searchEngine=Lucene est, pour l'instant, obsolète. C'est un système complexe qui produit souvent des résultats légèrement différents du comportement le plus souhaitable de searchEngine=original. Pour presque tousERDDAP™les installations, les économies de temps de Lucene ne compensent pas les différences de résultats. Veuillez plutôt utiliser searchEngine=original si possible. Si cela cause des problèmes, veuillez envoyer un courriel à Bob.
         
    * CHANGEMENT: Le moteur de recherche Lucene se comporte maintenant plus comme le moteur de recherche original. Il n'y a plus de cas où Lucène pense qu'un jeu de données correspond et que l'original ne correspond pas. De plus, les classements de lucène égalent désormais les classements de l'original (parce que l'original est maintenant toujours utilisé pour calculer le classement) .
         
    * C'est pas vrai. A partir d'une sortie récente,ERDDAP™On a arrêté de voir plus de 1000 objets dans un seau AWS S3. Maintenant,ERDDAP™de nouveau voit tous les objets. Grâce à Andy Ziegler.
         
    * Maintenant EDDTableAgrégat Les lignes suppriment laactual\\_rangeattribut chaque fois qu'un ou plusieurs des ensembles de données enfant ne connaissent pas ses variables 'actual\\_range  (Par exemple, EDDTableFromDatabase) . Grâce à Erik Geletti.
         

## version 2.15{#version-215} 
 (publié le 2021-11-19) 

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    *   ERDDAP™a un nouveau système pour permettre à l'utilisateur de spécifier la langue à utiliser pour toutes les pages Web. SiERDDAP™installation est configurée pour l'utiliser, la liste des langues apparaîtra dans le coin supérieur droit de chaque page Web.ERDDAP™URL de avant que cette version continue à fonctionner et toujours retourner le contenu anglais, comme avant.
        
Tous les textes ou toutes les pages Web n'ont pas été traduits. Des contraintes de temps ont empêché Qi et Bob d'atteindre 100 %.
        
La question évidente est: pourquoi avons-nous mis tant d'efforts dans ce quand Chrome traduira des pages Web sur-the-vol? La réponse est : de cette façon, nous avons beaucoup plus de contrôle sur la façon dont la traduction est faite. Notamment, il y a beaucoup de mots qui ne devraient pas être traduits sur les pages Web, par exemple, les titres et les résumés des ensembles de données, les noms des variables, des paramètres, des unités et des organisations. Une grande partie de l'effort de traduction consistait à identifier des mots et des phrases qui ne devraient pas être traduits. De plus, les traductions automatiques avaient tendance à modifier certains types de balisage HTML. La gestion de la traduction nous a permis de minimiser ce problème.
        
Le projet de traduction a été réalisé par Qi Zeng (un stagiaire Google Summer of Code) et Bob Simons en utilisant le service Web Traduction de Google. C'était un énorme projet. Merci, Oui &#33;
        
    * C'est pas vrai.ERDDAP™maintenant permet à ORCID ID d'avoir X comme dernier chiffre. Grâce à Maurice Libes.
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * À faire :
        
        * Vous devez faire quelques changements liés àERDDAP's nouveau système pour laisser les utilisateurs spécifier la langue pour les pages Web.
            * Sur la première ligne de votre setup.xml etdatasets.xmlfichiers, passer à : encodage UTF-8" et changer l'encodage du document dans votre éditeur de texte afin qu'il soit enregistré en tant que fichier UTF-8. Générer des ensembles de données Xml suppose maintenant que ledatasets.xmlest un fichier UTF-8.
            * Programmeurs qui compilentERDDAP: TousERDDAP™Les fichiers .java doivent être traités comme des fichiers UTF-8 par défaut. Vous devrez peut-être ajouter "-encodage UTF-8" à la ligne de commande javac. (Oui.) 
            * Pour activer ce système (fortement recommandé) , dans&lt;startBodyHtml5&gt; balise que vous spécifiez dansdatasets.xml, changer "&amp&#33;loginInfo;" en "&amp&#33;loginInfo;|&amp&#33;language;" afin que la liste des langues apparaisse dans le coin supérieur droit de chaqueERDDAP™page web.
            *   ERDDAP™n'utilise que les&lt;startBodyHtml5&gt; balise que vous spécifiez dansdatasets.xmlpour spécifier le contenu HTML de la bannière en haut de chaqueERDDAP™page web, quelle que soit la langue choisie par l'utilisateur. Si vous changez cette étiquette à utiliser
"&EasierAccessToScientificData;« au lieu de « faciliter l'accès aux données scientifiques » et
"&BroughtToYouBy;"au lieu de "vous avoir apporté par",ERDDAP™utilisera les versions traduites de ces phrases dans la bannière.
            * De même, le nouveau défaut&lt;la description courteHtml&gt; dansdatasets.xmlest
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
Les 3 dernières lignes de contenu sont des choses qui seront remplacées par du texte traduit. Si vous convertissez l'un d'eux (notamment & ceci Erddap particulier;) ou tous à un texte explicitedatasets.xml  (qui a priorité, le cas échéant) ou message.xml, ce texte apparaîtra quelle que soit la langue choisie par l'utilisateur. Ce n'est pas parfait, mais j'ai pensé que peu d'administrateurs voudraient éditer&lt;theShortDescriptionHtml&gt; dans 35 fichiers différents pour fournir 35 versions traduites différentes de cette balise.
        
          
         
    * CHANGEMENTS : Certaines erreurs sont maintenant traitées légèrement différemment et peuvent donc être ajoutées au nombre de « Demandes rejetées » sur status.html et dans le Daily Report Email. Ces chiffres peuvent donc être un peu plus grands qu'auparavant.
         
    * BUG FIX: Générer des ensembles de données Xml pourEDDGridLon0360 etEDDGridLonPM180 exclut désormais les ensembles de données sources avecdatasetID=~"\\*\\_LonPM180" etdatasetID=~"\\*\\_Lon0360", respectivement.
         

## Version 2.14{#version-214} 
 (publié le 2021-07-02) 

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    *    (aucune)   
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * NOUVEAU :EDDGridLon0360 qui fait un ensemble de données maillées avec des valeurs de longitude &gt;=0 et&lt;=360 d'un ensemble de données maillées avec des valeurs de longitude &gt;=-180 et&lt;=180. Voir[EDDGridLon0360 documentation](/docs/server-admin/datasets#eddgridlon0360). Grâce à Dale Robinson.
         
    * NOUVEAU :ERDDAP™les administrateurs peuvent désormais outrepasser n'importe quelle valeur dans setup.xml via une variable d'environnement nomméeERDDAP\\__valueName_ avant l'exécutionERDDAP. Par exemple, utiliserERDDAP\\_baseUrl remplace&lt;valeur baseUrl&gt;. Cela peut être pratique lors du déploiementERDDAP™Avec un conteneur, comme vous pouvez mettre les paramètres standard dans setup.xml, puis fournir des paramètres spéciaux via des variables d'environnement. Si vous fournissez des renseignements secrets àERDDAP™via cette méthode, assurez-vous de vérifier que les informations resteront secrètes.ERDDAP™seulement lit les variables d'environnement une fois par démarrage, dans la première seconde de démarrage, donc une façon d'utiliser ceci est: définir les variables d'environnement, démarrerERDDAP™, attendez jusqu'àERDDAP™est démarré, puis désactive les variables d'environnement. Merci à Marc Portier.
         
    * AMÉLIORÉ : Maintenant, si certains fichiers dans une table EDDFrom... Ensemble de données de fichiers avec beaucoup de fichiers ont quelques très longues valeurs de chaîne, l'ensemble de données va charger beaucoup plus rapidement et répondre aux demandes beaucoup plus rapidement. Précédemment,ERDDAP™attribuerait beaucoup d'espace pour les valeurs de chaîne min et max dans les fichiers qui sont stockés avec des informations de fichier pour ces ensembles de données. Le fichier qui en a résulté était énorme, ce qui l'a fait écrire et lire lentement. Grâce à OBIS.
         
    * Maintenant,ERDDAP™fait un meilleur travail d'interprétation de séquences de caractères inhabituelles et invalides dans les fichiers CSV. Grâce à OBIS.
         
    * FIX: Après un an de problèmes avec Cassandra, j'ai finalement réussi à installer Cassandra (v2) de nouveau et ainsi a pu relancer les tests avec Cassandra v2. Donc maintenant, je peux dire avec plus de confiance queERDDAP™fonctionne avec Cassandra v2 et v3. Grâce à ONC.
         

## Version 2.12{#version-212} 
 (publié le 2021-05-14) 

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    * C'est pas vrai. Si vous êtes sur la liste noire d'abonnement, vous ne pouvez plus demander une liste de vos abonnements.
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * À faire: NOUVEAU: système pour limiter automatiquement la capacité des utilisateurs malveillants et des utilisateurs légitimes trop agressifs à faire un grand nombre de demandes simultanées qui dégraderaient les performances du système pour les autres utilisateurs. Il y a 3 nouvelles étiquettes optionnelles dansdatasets.xmlque vous pouvez/devriez ajouter juste après&lt;graphiqueContexteColor&gt; :
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Pour plus d'informations, voir[ipAddressMaxDemandes](/docs/server-admin/datasets#ipaddressmaxrequests).ERDDAP™aussi maintenant imprime le "Nombre d'utilisateurs uniques (depuis le démarrage) " sur la page status.html.
Merci à la personne en Chine attaquant monERDDAP™installation.
         
    * Modifier le comportement du pilote Postgresql : Lorsque j'ai mis à jour le pilote Postgresql, les noms de colonnes dans la liste de tableaux générée par Postgresql et GenerateDatasetsXml sont revenus dans tous les majuscules, au lieu de tous les minuscules, comme auparavant. Je ne sais pas si cela affectera d'autres choses puisque les bases de données considèrent souvent ces noms comme insensibles. Mon jeu de données de test fonctionne toujours correctement. Mais si votre jeu de données cesse de fonctionner avec celaERDDAP™mise à jour, c'est la cause possible de poursuivre en premier.
         
    * C'est pas vrai.ERDDAP™maintenant également gère les fichiers S3 privés correctement. D'autres améliorations connexes ont été apportées au traitement des fichiers S3 de l'AWS. Grâce à Michael Gangl et Dylan Pugh.
         
    * NOUVEAU :EDDGridDeNcFiles etEDDGridDeNcFiles Unpacked peut maintenant lire les données de "structures" dans.nc4 et.hdf4 dossiers. Pour identifier une variable qui provient d'une structure,&lt;sourceName&gt; doit utiliser le format : _fullStructureName_|_memberName_, par exemple group1/myStruct|MonMembre. Grâce à NRL.
         
    * CHANGEMENT: Maintenant, si l'utilisation de la mémoire courante plus cette requête est même légèrement élevée, griddap sets nThreads pour cette demande à 1. Ainsi,ERDDAP™conserve la mémoire lorsque la mémoire est rare. Merci à la personne en Chine attaquant monERDDAP™installation.
         
    * Nouveau système pour surveiller le nombre de fichiers ouverts (qui inclut des sockets et d'autres choses, pas seulement des fichiers) dans Tomcat sur les ordinateurs Linux. Si certains fichiers ne sont jamais fermés par erreur, le nombre de fichiers ouverts peut augmenter jusqu'à ce qu'il dépasse le maximum autorisé et de nombreuses choses vraiment mauvaises se produisent. Donc maintenant, sur les ordinateurs Linux (l'information n'est pas disponible pour Windows) :
        
        * Il y a une nouvelle colonne "Open Files" à l'extrême droite de la page web status.html montrant le pourcentage de fichiers max ouverts. Sur Windows, ça montre juste "?".
        * QuandERDDAP™génère ces informations à la fin de chaque grand jeu de données recharge, il va imprimer dans le journal. Fichier txt & #160;:
openFileCount=_current_ de max=_max_ %=_percent_
        * Si le pourcentage est &gt; 50%, un email est envoyé à laERDDAP™administrateur et l'email Tout Aux adresses e-mail.
        
Pour en savoir plus, ou si vous voyez ce problème sur votreERDDAP™Voir[Trop de fichiers ouverts](/docs/server-admin/additional-information#too-many-open-files).
Merci à la personne en Chine attaquant monERDDAP™installation.
         
    * NOUVEAU: J'ai ajouté beaucoup de vérification et de gestion de "Trop de fichiers ouverts", donc la tâche s'arrête et l'utilisateur voit le message d'erreur. Les fichiers de données ne seront plus marqués comme mauvais si leur lecture entraîne une erreur "Trop de fichiers ouverts".
         
    * NOUVEAU\\[BigParent Directory\\]/badFilesDrapeau répertoire & #160;:
Si vous mettez un fichier dans ce répertoire avec undatasetIDcomme nom du fichier (le contenu du fichier n'a aucune importance) ,ERDDAP™supprimera les fichiers défectueux.ncfichier pour cet ensemble de données (le cas échéant) et recharge l'ensemble de données dès que possible. Cela provoqueERDDAP™pour essayer de nouveau de travailler avec les fichiers précédemment (Par erreur ?) marqué comme mauvais. Grâce à Marco Alba.
         
    * CHANGEMENT: Au démarrage, si unEDDGridDe...Files ou EDDTableDe... Fichiers dataset a initialement 0 fichiers dans sa liste de fichiers valides connus (Par exemple, c'est un nouvel ensemble de données) AlorsERDDAP™reporte le chargement et définit un drapeau de sorte qu'il sera chargé dès que la charge principaleDatasets est terminée. Cela accélère le démarrage initial quand il y a de nouveaux ensembles de données.
         
    * CHANGEMENT : FichierVisitorDNLS.testAWSS3 () et FileVisitorSubdir.testAWSS3 () ; maintenant utiliser l'AWS v2 (pas v1) Le SDK. Alors maintenant le GitERDDAP™distribution inclut maintenant tous les fichiers nécessaires et vous n'avez plus besoin d'ajouter manuellement le fichier jar massif v1 AWS SDK.
         
    * CHANGEMENT: Je suis passé à l'utilisation de Maven pour détecter / recueillir des dépendances (les fichiers .jar dans /lib) . Le changement à v2 du SDK AWS l'a nécessité. Il sera nécessaire pour d'autres codes importés à l'avenir. Un grand merci à Kyle Wilcox qui a fourni le pom.xml qu'il a créé et utilise, qui a résolu plusieurs problèmes pour moi.
         
    * CHANGEMENT : Le paramètre classpath (-cp) utilisé dans GenerateDatasetXml, DasDds et d'autres petits programmes qui viennent avecERDDAP™, et dans les conseils aux programmeurs est maintenant beaucoup plus simple et ne devrait plus jamais changer car il se réfère au répertoire, pas aux fichiers individuels:
Classes \\-cp;C:\\programme\\\_tomcat\\lib\\servlet-api.jar;lib\\\\\*
         (ou ':' au lieu de ';' pour Linux et Macs) .
         (J'aurais dû le faire il y a des années quand c'est devenu une option.)   
         
    * NOUVEAU : Générer des ensembles de données Xml a une nouvelle option d'utilitaire : findDuplicateTime qui recherchera à travers une collection de grilles.nc  (et connexes) fichiers pour trouver des fichiers avec des valeurs de temps dupliquées. Voir[trouverDupliquer Heure](/docs/server-admin/datasets#findduplicatetime)  
         
    * NOUVEAU :datasets.xmlpeut désormais inclure&lt;palettes&gt; tag qui remplace la&lt;palettes&gt; valeur d'étiquette de messages.xml (ou revient à la valeur message.xml si elle est vide) . Cela vous permet de modifier la liste des palettes disponibles pendantERDDAP™est en train de courir. Aussi, si vous avez un sous-répertoire cptfiles dans leERDDAP™répertoire de contenu,ERDDAP™copie tous les fichiers \\*.cpt dans ce répertoire\\[Tomcat\\]/webapps/erddap/WEB-INF/cptfiles répertoire à chaque foisERDDAP™commence. Ensemble, ces modifications vous permettent d'ajouter des palettes et de maintenir les modifications lorsque vous installez une nouvelle version deERDDAP. Voir[documentation des palettes](/docs/server-admin/datasets#palettes)  
Merci à Jennifer Sevadjian, Melanie Abecassis et peut-être à d'autres personnes de CoastWatch.
         
    * CHANGEMENTS: [&lt;LentDownTroubleMillis&gt;] (/docs/serveur-admin/données#slowdowntroublemillis) est maintenant utilisé pour toutes les requêtes échouées, pas seulement quelques types.
         
    * CHANGEMENT: Le thread RunLoadDatasets interrompt maintenant le thread LoadDatasets à 3/4 LoadDatasets MaxMinutes donc il y a plus de temps pour LoadDatasets pour remarquer l'interruption et la sortie gracieusement. Il y a aussi de plus en plus et de meilleurs messages de diagnostic pour cela.
         
    * CHANGEMENT DE L'ancienne version de Lucene à v8.7.0.
         
    * CHANGEMENT: Courriels envoyés parERDDAP™apparaît maintenant avec une police de largeur fixe.
         
    * CHANGEMENTEDDGridFromFiles obtient désormais des valeurs d'axe ainsi que des attributs de FIRST|fichier LAST, comme spécifié dans&lt;métadonnéesDe&gt;. Je vous remercie. (pas) à Ken Casey, et al.
         
    * Support ADDED pour les unités invalides "degree\\_North" et "degree\\_East" qui sont utilisées par erreur par les fichiers récents (depuis 2020-10-01) dans la version 5.3 du Pathfinder de l'AVHRR (L3C) Ensembles de données SST (NceiPH53sstd1jour et nceiPH53sstn1jour) .ERDDAP™peuvent désormais les normaliser en unités valides. Je vous remercie. (pas) à Ken Casey, et al.
         

## Version 2.11{#version-211} 
 (publié en 2020-12-04) 

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    * BUG FIX: OrderByMean a lancé un NullPointerException si une variable n'avait qu'une de \\_FillValue ou manquant\\_ Valeur définie. Maintenant il gère correctement la situation. Grâce à Marco Alba.
         
    * C'est pas vrai. Il y avait des problèmes avec les fichiers texte ODV créés parERDDAP™dans v2.10. Ces problèmes sont résolus. Grâce à Shaun Bell.
         
    * C'est pas vrai. Juste enERDDAP™v2.10: Si les limites lat lon étaient spécifiées dans l'URL, la zone de délimitation n'était pas tracée sur la carte du monde. Ça l'est encore. Merci à John Maurer.
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * C'est pas vrai. Juste enERDDAP™v2.10: Les fichiers de script pour ArchiveADataset, GénérerDatasets Xml et DasDds n'ont pas fonctionné parce qu'ils n'ont pas eu les changements au chemin de classe qui ont été ajoutés avecERDDAP™v2.10. Maintenant ils le font. Grâce à Marco Alba.
         
    * NOUVEAU:datasets.xml, vous pouvez maintenant avoir l'étiquette:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Actuellement, si vrai (ou si la balise est vide, ou si la balise n'est pas dans le fichier) , quand la demande d'un utilisateur conduit à une exception NullPointer,ERDDAP™va envoyer la trace de pile àerd.data at noaa.gov  (desERDDAP™équipe de développement) . Cela devrait être sûr et sécurisé car aucune information confidentielle (Par exemple, la requête Url) est inclus dans le courriel. Cela devrait permettre d'attraper tous les bugs obscurs et totalement inattendus qui mènent à NullPointerExceptions. Sinon, l'utilisateur voit les exceptions, mais leERDDAP™Les développeurs ne le font pas, donc nous ne savons pas qu'il y a un problème qui doit être corrigé.
        
Il est possible que cette étiquette mène à d'autres informations diagnostiques similaires àerd.data at noaa.govdans le futur. Le contenu de l'e-mail sera toujours minimal et lié à des bogues, et non, par exemple, des informations d'utilisation. Grâce à Marco Alba.
         
        
    * CHANGEMENT : Maintenant, types de fichiers compressés courants (.bz2,.gz,.gzip,.tar,.tgz,.z,.zip) sont également interdites pour les demandes de portée d'octets. Ceci est spécifié via&lt;extensionsNoRangeRequests&gt; dans message.xml.
         
    * PROBLÈME DU SAVOIR : Comme avecERDDAP™2.10,.ncfichiers ml qui essaient de modifier un attribut, ne changez pas l'attribut. C'est un bug connu dans netcdf-java que j'ai signalé et ils disent qu'il sera corrigé dans la prochaine version de netcdf-java.
         

## Version 2.10{#version-210} 
 (publié en 2020-11-05) 

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    * NOUVEAU : La nouvelle[Interpolat](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)convertisseur interpole efficacement les valeurs d'un ensemble de données maillées. À ce titre, elle est particulièrement utile pour les chercheurs qui travaillent avec des données sur les animaux. Ce convertisseur prend une table avec des colonnes de latitude, longitude et temps (et peut-être d'autres colonnes) et renvoie une table avec des colonnes supplémentaires avec des valeurs interpolées. Ainsi, cela est similaire à la populaire[Xtractomatique](https://coastwatch.pfeg.noaa.gov/xtracto)script initialement créé par Dave Foley, mais offre l'avantage de traiter jusqu'à 100 points par demande. Merci à Dave Foley et Jordan Watson (NMFS) .
         
    * IMPROVED: La recherche avancée est désormais stricte pour les demandes non-.html. Il va maintenant lancer des exceptions pour les demandes qui ont des erreurs permanentes (Par exemple, demandes où minLat &gt; maxLat) ou des erreurs temporaires (Par exemple, les demandes destandard\\_namequi n'existe pas) . Pour les requêtes .html, la recherche avancée est inchangée : comme pour les recherches Google, elle fait de son mieux et corrige silencieusement ou ignore les erreurs. Merci à Rich Signell.
         
    * AMÉLIORATION : La carte de la page Recherche avancée est maintenant plus grande (tu dois encore t'énerver, mais moins) et nettement plus précis (mais toujours pas parfait) . Merci à John Maurer.
         
    * AMÉLIORATION: Le réglage "Draw land mask" sur les pages Web Make A Graph et le réglage &.land=... dans les URLs qui demandent une carte supporte désormais deux autres options:
« hors ligne » dessine simplement les contours de la masque terrestre, les frontières politiques, les lacs et les rivières.
"off" ne dessine rien.
Voir[&.land=... documentation](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands).
Merci à John Maurer.
         
    * AMÉLIORÉ : Graphiques et cartes créés parERDDAP™peut maintenant utiliser trois nouveaux types de marqueurs: Carré rempli sans frontières, cercle rempli sans frontières, triangle rempli sans frontières. Le code pour cela a été contribué par Marco Alba de ETT / EMODnet Physique. Grâce à Marco Alba.
         
    * NOUVEAU :"files"système prend maintenant en charge Réponses au type de fichier (.csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsvou.xhtml.) , par exemple,[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv).
Grâce à Kyle Wilcox.
         
    * AMÉLIORER : Les URL générées lorsqu'un utilisateur utilise un formulaire d'accès aux données (.html) ou une marque A-Graph (Graphique) page Web maintenant correctement pourcentage-encoder les caractères\\[et\\]. Cela rend les URLs un peu plus difficiles à lire pour les humains, mais c'est mieux du point de vue de la sécurité sur le Web. Les administrateurs ont maintenant l'option de mettre détenduQueryChars= '\\[\\]|' dans le fichier Tomcat server.xml (moins sûr) ou pas (plus sûr) .
Grâce à Antoine Queric, Dominic Fuller-Rowell et d'autres.
         
    * NOUVEAU: Si une demande à un ensemble de données EDDTable inclut &add Variables où (_Attribuer Nom, attribut Valeur_) ,ERDDAP™ajoutera toutes les variables qui ont _attribute Nom=attribut Valeur_ à la liste des variables demandées.
Voir[&Ajouter Variables Lorsque la documentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere). Grâce à Aurelie Briand, et al.
         
    * CHANGEMENT :ERDDAP™refuse maintenant les requêtes de plage d'octets sur /files/.ncou.hdffichiers. N'essayez pas de vous connecter à distance.ncou.hdffichiers comme s'ils étaient des fichiers locaux. Il est horriblement inefficace et cause souvent d'autres problèmes. Plutôt:
        * Utilisation(OPeN)DAPlogiciel client pour se connecter àERDDAP'sDAPservices pour cet ensemble de données (qui ont /griddap/ ou /tabledap/ dans l'URL) . C'est ça.DAPC'est pour.
        * Utilisez le formulaire d'accès aux données de l'ensemble de données pour demander un sous-ensemble de données.
        * Si vous avez besoin du fichier entier ou d'un accès répété sur une longue période de temps, utilisezcurl,wget, ou votre navigateur pour télécharger le fichier entier, puis accéder aux données de votre copie locale du fichier.
             
    * AMÉLIORÉ : le .odv L'option de sortie Txt a été réécrite pour soutenir la nouvelle version deODV .txtfichiers et de soutenir la représentation appropriée de la trajectoire, des chronologies et des données de profil.
         
    * AMÉLIORER : Maintenant, les termes de recherche en guillemets doubles sont interprétés comme une chaîne de caractères json, de sorte qu'ils peuvent avoir des caractères encodés \\. Entre autres choses, cela vous permet de rechercher une correspondance exacte pour un attribut, par exemple, "institution=NOAA\\n"ne correspond pas à un ensemble de données avec l'institution=NOAA NMFS. Grâce à Dan Nowacki.
         
    * AMÉLIORATION: En d'autres endroits, nombres flottants (surtout les flotteurs convertis en doubles) maintenant apparaissent comme une version légèrement plus arrondie du nombre dans des endroits supplémentaires, par exemple un flotteur précédemment montré comme un double comme 32.27998779296875, pourrait maintenant apparaître comme 32.28. Grâce à Kyle Wilcox.
         
    * BUG FIX: les fichiers audio entiers non signés ont été lus légèrement incorrectement. Maintenant ils sont lus correctement.
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * ATTENTION: La première fois que vous lancezERDDAP™v2.10, certains ensembles de données basés sur des fichiers de données locaux vont charger **Très** lentement parce queERDDAP™doit recréer sa base de données d'informations de fichiers. Après la lente recharge initiale, ils se chargeront rapidement, comme avant. Soyez patient.
         
    * Ce que vous devez faire :
        * Lorsque vous lancez v2.10 pour la première fois, certains ensembles de données peuvent ne pas être chargés parce queERDDAP™est maintenant plus stricte en ce qui concerne certaines métadonnées. Comme précédemment,ERDDAP™vous enverra un rapport quotidien quand il sera chargé. Cela inclura les messages d'erreur pour chacun des ensembles de données qui n'ont pas été chargés. Lisez les messages d'erreur pour comprendre les problèmes. Dans la plupart des cas, il suffit de modifier légèrement les métadonnées de l'ensemble de données pour résoudre le problème.
             
        * Endatasets.xml, rechercher&lt;sourceName&gt;= (note que'='signe, qui identifie un[Valeur fixesourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) . Pour la plupartERDDAP™C'est rare. Si l'une des valeurs après'='sont des cordes (Pas de nombres) , vous DOIT maintenant enfermer la chaîne en guillemets doubles. Par exemple,
Avant:&lt;sourceName&gt;=KZ401&lt;/sourceName&gt;
Après:&lt;sourceName&gt;=KZ401"&lt;/sourceName&gt;
             
        * NOUVEAU: Il y a un nouveau paramètre optionnel dans setup.xml,&lt;par défautAccessibleViaFiles&gt;, qui définit la valeur par défaut&lt;accèsViaFiles&gt; pour chacun des ensembles de données. La valeur par défaut de cette nouvelle balise est false, qui imite la précédenteERDDAP™comportement. Ce réglage de niveau inférieur peut être annulé par un ensemble de données donné&lt;accèsViaFiles&gt; configuration.
            
RECOMMANDÉ (parce qu'il y a des utilisateurs qui veulent ceci) :
Si vous voulez faire toutes les EDD... Des ensembles de données FromFiles accessibles via le système de fichiers, puis
            
            1. Ajoutez cette balise à votre fichier setup.xml :
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Facultatif) Supprimer tous les
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
endatasets.xmlpuisque le défaut est maintenant vrai.
                 
        * Ajouter \\_FillValue Attributs:
            ERDDAP™utilisé pour avoir une valeur par défaut \\_FillValue pour toutes les variables entières : la valeur maximale du type de données (Par exemple, 127 pour les variables octets) . Ce n'est pas le cas. Afin d'éviter que ces valeurs ne soient indiquées comme valeurs de données (valeurs non manquantes) , vous devez les indiquer explicitement via les attributs \\_FillValue. A partir de maintenant, chaque fois que tu démarresERDDAP™, il enverra à l'administrateur un email avec une table .csv avec une liste de variables source entières qui n'ont pas \\_FillValue oumissing\\_valueattributs, et les nouveaux attributs \\_FillValue proposés. Voir[Ajouter \\_Fill Attributs de valeur](/docs/server-admin/datasets#add-_fillvalue-attributes)pour plus d'informations et instructions.
             
        * Si vous compilezERDDAP™, vous devez modifier le paramètre classpath sur les lignes de commande javac pour ajouter une référence à ces nouveaux jar's: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar .
             
    * CHANGEMENT: Tomcat 9 est maintenant la version recommandée de Tomcat pourERDDAP. La dernière version de Tomcat 8.5+ est également bonne pour le moment. On a nettoyé.ERDDAP's[Instructions d'installation Tomcat](/docs/server-admin/deploy-install#tomcat).
        
La dernière version deJava8 (pasJava9, 10, 11, ...) de[AdopterOpenJDK](https://adoptopenjdk.net/)reste la version recommandée deJavapourERDDAP.Java8 a Long Term Support de AdopteOpenJDK afin qu'il reste sûr d'utiliser, mais n'oubliez pas d'en obtenir la dernière version périodiquement pour des raisons de sécurité.
        
    * NOUVEAU: Script SourceNames / Variables dérivées dans les ensembles de données tabulaires
Les ensembles de données EDDTableFromFiles, EDDTableFromDatabase et EDDTableFromFileNames peuvent désormais inclure des expressions et des scripts dans lesourceName. Cela vous permet de créer de nouvelles variables basées sur des variables existantes dans les fichiers sources. Le calcul d'une nouvelle variable donnée se fait à l'intérieur d'une ligne des résultats, à plusieurs reprises pour toutes les lignes. Par exemple, pour faire une variable de longitude avec des valeurs comprises entre -180 et 180° d'une variable avec des valeurs comprises entre 0 et 360°:
        &lt;sourceName&gt;=Math2.anglePM180 (ligne.colonneDouble ("Lon") ) &lt;/sourceName&gt;
Pour plus de détails, voir[Script Noms des sources](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
Merci à Bob Simons (qui l'avait prévu avantERDDAP™v1.0 et enfin trouvé un moyen de le mettre en œuvre) , Kevin O'Brien, Roland Schweitzer, John Maurer et la bibliothèque Apache JEXL pour avoir fait le plus dur (et le faire bien) .
         
    * NOUVEAU: Types de données entiers non signés (uoctet, ushort, uint, ulong) sont maintenant soutenus. Notez que de nombreux types de fichiers (Par exemple, .das, .dds,.nc3) Ne prenez pas en charge tous ces nouveaux types de données. Voir[Données Type de documentation](/docs/server-admin/datasets#data-types)pour plus de détails surERDDAP™traite de ces différences. Notamment, depuis(OPeN)DAP, notamment la réponse .dds, ne supporte pas les octets signés, les longs ou les ulongs, vous pouvez vouloir utiliserERDDAP's représentation tabulaire de .das et .das comme vu dans lehttp.../erddap/ **Informations** /_datasetIDPage web _.html (par exemple,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) que vous pouvez également obtenir dans d'autres types de fichiers ou le.nccsvRéponse aux métadonnées (par exemple,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) , qui prennent en charge tous les types de données dans toutes les situations.
        
ATTENTION: Pour les ensembles de données qui sont affectés par ce changement, il est possible que vous verrez des problèmes avec l'ensemble de données parce que les données quiERDDAP™lit à partir de la source peut être différent (Par exemple, les variables précédemment lues comme des entiers signés peuvent maintenant être lues comme des entiers non signés) . Les problèmes qui en résultent incluent : de nouveaux fichiers ne sont pas ajoutés à l'ensemble de données et/ou des erreurs lorsque vous essayez d'accéder aux données. Si un ensemble de données a des problèmes, la première chose à essayer est de[mettre un dur Drapeau](/docs/server-admin/additional-information#hard-flag)pour l'ensemble de données. Si cela ne résout pas le problème, alors vous devez regarder log. txt pour voir les messages d'erreur, plonger dans ledatasets.xmlpour l'ensemble de données, et/ou peut-être recréer generateDatasets.xml pour l'ensemble de données.
Grâce à netcdf-java 5.x (qui a forcé le problème) et le prochain CF 1.9.
        
    * Il y a maintenant[meilleure documentation/conseil](/docs/server-admin/datasets#s3-buckets)pour créer un jeu de données à partir de fichiers dans les seaux AWS S3. Grâce à Micah Wengren.
         
    * CHANGEMENTS: Il y a plusieurs changements liés à la"files"système.
        * Le code à utiliser a été réécrit pour être utilisable par plus de classes.
             
        * NOUVEAU : Les demandes d'inscription de répertoires peuvent maintenant demander que la réponse soit l'un des types standard de table simple en ajoutant l'extension de fichier souhaitée : .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsvou.xhtml) . Par exemple,
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
Grâce à Kyle Wilcox et Shane St Savage.
             
        * Maintenant, générez Données Xml n'inclura pas de&lt;tag accessibleViaFiles&gt; dans la sortie. L'hypothèse est que l'ensemble de données dépendra de la valeur du nouveau&lt;par défautAccessibleViaFiles&gt; tag in setup.xml. Voir[accessible ViaFiles](/docs/server-admin/datasets#accessibleviafiles).
             
        * AMÉLIORÉ: D'autres types de données supportent désormais accessible ViaFiles:EDDGridSideBySide,EDDGridTotalExistantDimension,EDDGridDeErddap, EDDTableDeErddap,EDDGridD'EDDTable, EDDTableEDDGridetEDDGridDe Etopo. Pour ceux-ci, les fichiers d'un ensemble de données distant/enfant donné ne seront accessibles que si le parent et l'ensemble de données distant/enfant sont accessibles ViaFiles réglé à true (peut-être via&lt;par défautAccessibleViaFiles&gt;). Grâce à Damian Smyth et Rob Fuller.
             
        * À FAIRE / RECOMMANDATION: Nous recommandons de rendre tous les ensembles de données pertinents accessibles via le système de fichiers en paramétrant&lt;par défautAccessibleViaFiles&gt; à true dans setup.xml parce qu'il y a un groupe d'utilisateurs pour qui c'est le moyen préféré pour obtenir les données. Entre autres raisons,"files"système permet aux utilisateurs de voir facilement quels fichiers sont disponibles et quand ils ont changé pour la dernière fois, ce qui permet à un utilisateur de conserver sa propre copie de l'ensemble des données. Si vous ne voulez généralement pas rendre les ensembles de données accessibles via le système de fichiers, définissez&lt;par défautAccessibleViaFiles&gt; à false. Dans les deux cas, utilisez simplement&lt;accessibleViaFiles&gt; pour les quelques ensembles de données qui sont des exceptions à la politique générale définie par&lt;par défautAccessibleViaFiles&gt; (par exemple, lorsque l'ensemble de données utilise.ncfichiers ml, qui ne sont pas vraiment utiles pour les utilisateurs) .
             
    * AMÉLIORER : Maintenant, si un ensemble de données source a des informations sur la grille de données, générer Données Xml pour les ensembles de données maillés ajoutera l'information à global&lt;addAtts&gt;, et l'information sera ajoutée à&lt;sourceAtts&gt; chaque fois que les données sont lues à partir du fichier. L'information apparaîtra dans les attributs globaux de l'ensemble de données comme un ensemble d'attributs avec le préfixe grid\\_mapping\\_ .
         
    * AMÉLIORATION: Soutien aux groupes lors de la lecture.nc4 (et dans une certaine mesure.hdf5) fichiers. En général,ERDDAP™l'ensemble de données sera construit à partir des variables de l'un des groupes du fichier. Aussi, Générer des ensembles de données Xml pourEDDGridDeNcFiles etEDDGridDeNcFiles Déballé demande maintenant un "groupe" (Par exemple, "" pour tous les groupes, "quelque groupe", "quelque groupe/quelque sous-groupe" ou "\\[racine\\]" pour juste le groupe racine) . Merci à Charles Carleton et Jessica Hausman.
         
    * AMÉLIORATION: Générer des ensembles de données Xml pourEDDGridDeNcFiles etEDDGridDeNcFiles Unpacked prend désormais en charge un paramètre optionnel "DimensionsCSV" qui vous permet de spécifier les noms de source des dimensions que vous souhaitez utiliser cet ensemble de données. Utilisez "" pour obtenir les variables qui utilisent le plus de dimensions, comme avant. En outre, un petit bug connexe qui s'est produit avec ce type de fichier est maintenant corrigé. Grâce à Sujal Manandhar.
         
    * BUG FIX: Générer des ensembles de données Xml énumère maintenant correctement "EDDTableFromJsonlCSVFiles" (Pas "EDDTableFromJsonlCSV") comme l'une des options EDDType. Grâce à Andy Ziegler.
         
    * AMÉLIORATION:EDDGridDeNcFiles Déballé standardise désormais les attributs "unités" aux udunits standard/canoniques (la même méthode que le convertisseur d'unités) . Par exemple,"meter per second","meters/second","m.s^-1"et"m s-1"tous deviennent"m s-1". Grâce à Andy Ziegler.
        
ATTENTION: Il est possible que cela cause des problèmes pour certains ensembles de données existants (Par exemple, faire en sorte que les nouveaux fichiers soient étiquetés « mauvais ») . Si oui,[mettre un dur Drapeau](/docs/server-admin/additional-information#hard-flag)pour l'ensemble de données afin que tous les fichiers sources soient relus avec le nouveau système.
        
    * AMÉLIORÉ : Maintenant, une variable&lt;sourceName&gt; peut spécifier une valeur fixe de =NaN et la variable peut avoir uneactual\\_rangeattribut qui spécifie une plage finie. Ceci est parfois utile pour qu'un ensemble de données (notamment un jeu de données EDDTableFromFileNames) peut avoir une variable factice (s)   (Par exemple, latitude, longitude, heure) avec des valeurs fixes de NaN, mais avec unactual\\_range  (comme défini par l'attribut) . Ensuite, dans la recherche avancée, un utilisateur peut rechercher des ensembles de données qui ont des données dans une latitude spécifique, longitude, plage de temps et cet ensemble de données pourra dire qu'il a des données pertinentes (bien que toutes les lignes de données réelles montreront NaN) . Voir[documentation en valeur fixe](/docs/server-admin/datasets#fixed-value-sourcenames).
Grâce à Mathew Biddle.
         
    * Maintenant, lesdatasets.xmlchunk pour un jeu de données EDDTableFromAsciiFiles ou EDDTableFromColumnarAsciiFiles peut inclure une balise qui indiqueERDDAP™pour ignorer toutes les lignes en haut du fichier jusqu'à et y compris la ligne qui correspond à l'expression régulière spécifiée. Par exemple,
        &lt;skipHeaderToRegex&gt;\\\*Autres\\*Autres\\*La fin de la crise.\\*&lt;/skipHeaderToRegex&gt;
va ignorer toutes les lignes jusqu'à et y compris une ligne qui commence par "\\*\\*\\* FIN DE HEADER". Voir [&lt;skipHeaderToRegex&gt; documentation] (/docs/serveur-admin/données#skipheadertoregex) .
Merci à Eli Hunter
         
    * Maintenant, lesdatasets.xmlchunk pour un EDDTableFromAsciiFiles ou EDDTableFromColumnarAsciiFilesdataset peut inclure une balise qui indiqueERDDAP™pour ignorer toutes les lignes du fichier qui correspondent à l'expression régulière spécifiée. Par exemple,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

va sauter toutes les lignes qui commencent par "#". Voir [&lt;skipLinesRegex&gt; documentation] (/docs/serveur-admin/datasets#skiplinesregex) .
Grâce à Eli Hunter.
         
    * NOUVEAU :datasets.xmlchun pour tout ensemble de données EDDTable peut maintenant inclure &add Variables où (_Noms des attributsCSV_) . Si oui,ERDDAP™ajoutera un widget pour chacun des attributs spécifiés Noms sur le formulaire d'accès aux données de l'ensemble de données (Page web .html) pour faciliter l'ajout de &add Variables où (_Attribuer Nom, attribut Valeur_) à la demande.
Voir[&Ajouter Variables Lorsque la documentation](/docs/server-admin/datasets#addvariableswhere).
Grâce à Aurelie Briand, et al.
         
    * NOUVEAU Outil tiers :ERDDAP-Lint
        ERDDAP-lint est un programme de Rob Fuller et Adam Leadbetter de l'Irish Marine Institute que vous pouvez utiliser pour améliorer les métadonnées de votreERDDAP™les ensembles de données.ERDDAP-lint "contient des règles et une simple application web statique pour exécuter certains tests de vérification contre votreERDDAP™serveur. Tous les tests sont exécutés dans le navigateur web." Comme le[Outil de lint Unix/Linux](https://en.wikipedia.org/wiki/Lint_(software)), vous pouvez modifier les règles existantes ou ajouter de nouvelles règles. Voir[ERDDAP-Lint](https://github.com/IrishMarineInstitute/erddap-lint)pour plus d'informations.
        
Cet outil est particulièrement utile pour les ensembles de données que vous avez créés il y a quelque temps et que vous voulez maintenant mettre à jour avec vos préférences actuelles en matière de métadonnées. Par exemple, les premières versions de GenerateDatasets Xml n'a pas fait d'efforts pour créer un mondecreator\\_name,creator\\_email, type de créateur, oucreator\\_urlmétadonnées. Vous pourriez utiliserERDDAP-Intégrer les ensembles de données qui manquent de ces attributs de métadonnées.
        
Merci à Rob et Adam pour avoir créé cet outil et l'avoir mis à la disposition duERDDAP™communautaire.
        
    * NOUVEAU: Maintenant, il est correct que certains des fichiers dans unEDDGridDeFiles dataset n'a pas toutes les variables de l'ensemble de données. Les fichiers seront inclus comme s'ils avaient les variables (avec toutes les valeurs manquantes) .
Merci à Dale Robinson et Doug Latornell.
         
    * NOUVEAU : Il existe de nouvelles statistiques d'utilisation dans le fichier journal et le rapport quotidien pour aider les administrateurs à identifier les utilisateurs qui causent des problèmes de mémoire. Les statistiques sont nommées "OutOfMemory" (Taille du tableau) ", "hors de la mémoire (Trop gros) ", et "En dehors de la mémoire (Bien trop grand) ". Ils montrent les adresses IP des utilisateurs qui ont fait des demandes dans ces catégories et le nombre de demandes qu'ils ont faites. S'il n'y avait pas de demandes gênantes, ces statistiques n'apparaîtront pas. "En dehors de la mémoire (Taille du tableau) " et "hors de la mémoire" (Bien trop grand) " les demandes ne sont généralement pas un problème parce que les demandes étaient si grandes queERDDAP™les a attrapés rapidement et a retourné un message d'erreur. La "Extrait de mémoire" (Trop gros) " les demandes sont plus dangereuses parce queERDDAP™a fait quelques efforts avant de réaliser qu'il n'y avait pas assez de mémoire actuellement disponible pour traiter la demande (bien que le problème peut être d'autres demandes juste avant ces demandes) .
        
Il existe également de nouvelles statistiques nommées "Grande demande, adresse IP" qui montrent les adresses IP des utilisateurs qui ont fait des demandes importantes (actuellement, quadrillé.ncfichiers &gt; 1 Go) .
        
De plus, le tableau des séries chronologiques de la page status.html comprend maintenant une colonne « memFail » indiquant le nombre de requêtes qui ont échoué avec « OutOfMemory » (Trop gros) " erreurs depuis les derniers ensembles de données de charge majeurs. Tout autre nombre que 0 ici est au moins un sujet de préoccupation.
Merci à Bob Simons.
        
    * NOUVEAU: La nouvelle version deHyraxaffiche les listes de répertoires différemment qu'auparavant.ERDDAP™peut maintenant lire les listes des anciens et nouveaux répertoires.
         
    * NOUVEAU: Dataset recharge et les réponses de l'utilisateur qui prennent &gt; 10 secondes pour terminer (succès ou échec) sont marqués par " (Plus de 10 &#33;) ". Ainsi, vous pouvez rechercher le fichier log.txt pour trouver les ensembles de données qui ont été lents à recharger ou le numéro de requête des requêtes qui ont été lents à terminer. Vous pouvez alors regarder plus haut dans le fichier log.txt pour voir quel était le problème de l'ensemble de données ou ce que la demande de l'utilisateur était et de qui il était. Ces charges de données lentes et les demandes des utilisateurs sont parfois taxant surERDDAP. En savoir plus sur ces demandes peut donc vous aider à identifier et à résoudre les problèmes.
    * AMÉLIORATION: lors de la validation d'un ensemble de données DSG des FC,ERDDAP™assure maintenant que les variables avec des attributs cf\\_role sont dans la liste cdm\\_...\\_variables correspondante et ne sont pas dans d'autres listes cdm\\_...\\_variables. Par exemple, si un jeu de données timeeriesProfile a une variable "station\\_id" qui a l'attribut cf\\_role=timeseries\\_id, alors "station\\_id" doit être dans la liste cf\\_timeseries\\_variables, mais ne doit pas être dans la liste cf\\_profile\\_variables.
Grâce à Micah Wengren.
         
    * AMÉLIORATION: 'Simplify' est maintenant plus rapide, utilise moins de mémoire, et peut retourner LongArray. Grâce àUnidata.
         
    * AMÉLIORATION: QuickRestart est maintenant nettement plus rapide pour EDDTableFrom (nc-liés) Fichiers (sauf EDDTableFromNcCFFiles et EDDTableFromInvalidCRAFiles) parce que faire Montant prévu (et un autre endroit) Il suffit maintenant de lire les métadonnées de l'échantillon au lieu de lire toutes les données. Grâce à Jessica Austin.
         
    * IMPROVED: Il est maintenant pris en charge pour les chaînes de temps avec une précision supérieure à la milliseconde si les chiffres supplémentaires sont tous 0, par exemple, "2020-05-22T01:02:03.456000000Z". Grâce à Yibo Jiang.
         
    * IMPROVED: GénérerDatasetsXml EDD.suggestDestinationNom utilisé pour supprimer '(' et tout après. Maintenant il enlève (.\\*) seulement si c'est la fin desourceName. Maintenant, il supprime aussi\\[.\\*\\]seulement si c'est la fin de lasourceName. Grâce à Julien Paul.
         
    * AMÉLIORATION: Générer des ensembles de données Xml fait maintenant la variabledestinationNames unique par ajouté \\_2, \\_3, ..., au besoin. Grâce à Julien Paul.
         
    * AMÉLIORER: Lorsque Calendar2.parseDateTime analyse dd, hh, ou HH, le premier 'numérique' peut maintenant être un espace.
    * PROBLÈME DU SAVOIR : En commençant parERDDAP™2.10,.ncfichiers ml qui essaient de modifier un attribut, ne changez pas l'attribut. C'est un bug connu dans netcdf-java que j'ai signalé et ils disent qu'il sera corrigé dans la prochaine version de netcdf-java.
         
    * LIENS BROKEN FIX: J'ai fait un bon système pour tester les liaisons casséesERDDAP™pages Web, donc il devrait y avoir maintenant très peu de liens brisés (au moins à chaque date de sortie -- de nouveaux liens rompus apparaissent souvent) .
         
    * BUG FIX: EDDTableFromHttpObtenez un échec avec certains types de requêtes. Ce n'est pas le cas. Grâce à Emma à la BODC.
         
    * C'est pas vrai. Pour traiter certaines requêtes, EDDTable a fait un fichier temporaire pour chaque variable demandée, avec un nom de fichier se terminant au nom de la variable. Si le nom de la variable était aussi un type de compression (Par exemple, .Z) ,ERDDAPessayerait (et échouer) pour décompresser le fichier temporaire. Maintenant les noms de fichiers temporaires finissent par ".temp". Grâce à Mathew Biddle.
         
    * BUG FIX: GénérerDatasetsXml et Calendar2.convertToJavaDateHeure Le format est maintenant beaucoup moins susceptible de faire un changement incorrect lorsque vous essayez de fixer un format de date peut-être invalide. Notamment, aucun format automatique de dateTime ne sera modifié. Grâce à Mathew Biddle.
         
    * C'est pas vrai. S'il y a eu une erreur lors de l'obtention du contenu d'une URL distante, et si le contenu d'erreurStream est compressé,ERDDAP™maintenant décompresse correctement le message d'erreur. Merci à Bob Simons.
         
    * C'est pas vrai.&lt;subscribeToRemoteErddapDataset&gt; n'était pas appliqué lorsque l'EDD... L'ensemble de données d'Erddap était un ensemble de données pour enfants. Ça l'est maintenant. Grâce à Chris Romsos.
         
    * BUG FIX: Générer des ensembles de données Xml ne pense plus qu'une variable source commençant par "latin" pourrait être latitude. Grâce à Vincent Luzzo.
         
    * BUG FIX: Maintenant, un OutOfMemoryError en lisant un fichier de données pendant le traitement de la demande d'un utilisateur n'est pas une raison d'ajouter un fichier à la liste des BadFiles. Merci à Bob Simons.
         

## Version 2.02{#version-202} 
 (sortie 2019-08-21) 

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    * NOUVEAU: Il y a maintenant deux façons de rechercher des ensembles de données sur plusieursERDDAPPar. Ils fonctionnent légèrement différemment et ont différentes interfaces et options.
        
        *   [RecherchemultipleERDDAPs.html](/SearchMultipleERDDAPs.html)de Bob Simons/NOAA NMFS SWFSC ERD.
        *   [ http://erddap.com ](http://erddap.com)de Rob Fuller/The Marine Institute of Ireland.
        
Merci à Tylar Murray pour la demande originale.
         
    * AMÉLIORÉ : une demande au"files"système pour télécharger un fichier qui est en fait sur un site distant (Par exemple, AWS S3) conduit maintenant à une redirection, de sorte que l'utilisateur va effectivement télécharger les données de la source, au lieu d'utiliserERDDAP™en tant qu'intermédiaire. Merci à Andy Ziegler etNOAA.
         
    * NOUVEAU: Comme exemple des nouvelles fonctionnalités liées à AWS S3, et pour faciliter la navigation et le téléchargement des fichiers des seaux publics AWS S3, nous avons créé
        [~110 ensembles de données d'échantillons](https://registry.opendata.aws/)qui permettent à n'importe qui de parcourir le contenu de presque tous les
        [AWS S3 Seaux de données ouverts](https://registry.opendata.aws/). Si vous cliquez sur le"files"lien pour l'un de ces ensembles de données échantillon, vous pouvez parcourir l'arborescence de répertoire et les fichiers dans ce seau S3. En raison de la façon dont ces ensembles de données fonctionnent, ces listes de répertoires sont toujours parfaitement à jour carERDDAP™Je les fais voler. Si vous cliquez sur l'arborescence du répertoire vers un nom de fichier réel et cliquez sur le nom du fichier,ERDDAP™redirigera votre demande vers AWS S3 afin que vous puissiez télécharger le fichier directement depuis AWS.ERDDAP™administrateurs peuvent
        [lire les instructions pour comment faire cela pour d'autres seaux S3](/docs/server-admin/datasets#working-with-aws-s3-files). Merci à Andy Ziegler etNOAA.
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * Ce que vous devez faire: aucune
         
    * AMÉLIORATION:ERDDAPla méthode de stockage des tableaux de chaînes (ChaîneArray) est maintenant beaucoup plus efficace de mémoire. Chaîne Les rayons sont utilisés partoutERDDAP™, notamment lors de la lecture des fichiers de données ASCII tabulaires. En outre, d'autres changements rendent la lecture des fichiers de données tabulaires CSV/TSV/SSV ASCII, ASCII colonne et jsonlCSV plus rapide et beaucoup plus efficace pour la mémoire. Le résultat est : pour un fichier de test de données ASCII de 764 Mo (mais comprimé à un 52 Mo.gzfichier) avec 3,503266 lignes et 33 colonnes, l'utilisation maximale de la mémoire est passée de 10 Go à 0.6 Go (au pic) . Le temps de le lire est passé de ~7 minutes (mais varie considérablement avec la quantité de mémoire physique dans l'ordinateur) jusqu'à ~36 secondes (y compris 10s pour simplifier () qui est utilisé uniquement par GenerateDatasets Xml) . De nombreux autres endroitsERDDAP™profitera de cette efficacité de mémoire accrue. Grâce à Tylar Murray et Mathew Biddle.
        
J'ai exploré une autre solution (stockage de chaînes dans StringArray sous forme de tableaux d'octets encodés UTF-8) . Cela réduit l'utilisation de la mémoire autre ~33%, mais au coût de ~33% ralentissement. Par rapport au système actuellement utilisé, cela semblait être un mauvais compromis. Il est plus facile de donner plus de mémoire à un ordinateur (acheter plus de mémoire pour ~$200) que de le rendre plus rapide (acheter un tout nouvel ordinateur) .
        
Si c'est pratique, c'est toujours une bonne idée de diviser d'énormes fichiers de données tabulaires en plusieurs petits fichiers basés sur certains critères commestationIDet/ou temps.ERDDAP™Il n'aura souvent qu'à ouvrir l'un des petits fichiers en réponse à la demande d'un utilisateur, et ainsi être capable de répondre beaucoup plus rapidement.
        
    * Il y a maintenant[ERDDAP™Documents de l'AWS S3](/docs/server-admin/datasets#working-with-aws-s3-files), qui décrit comment obtenirERDDAP™pour travailler avec les fichiers de données dans les seaux AWS S3.
Aussi,ERDDAP™utilise maintenant de nouvelles fonctionnalités dans l'AWS S3JavaAPI.
Aussi,ERDDAP™permet désormais aux URLs AWS S3 d'inclure des caractères supplémentaires (période, tiret, souligne) dans les noms de seau.
Aussi,ERDDAP™exige maintenant que les URL de seau AWS S3 soient identifiées de manière spécifique:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
où le préfixe est facultatif.
Merci à Andy Ziegler etNOAA.
         
    * AMÉLIORATION: Générer des ensembles de données Xml traite maintenant d'autresmissing\\_values stand-ins comme valeurs manquantes et donc est plus susceptible de convertir une colonne en un type de données numériques. Aussi, PrimitiveArray.simplifier () maintenant logs quelle valeur de données particulière l'a fait traiter une colonne donnée comme une colonne de chaînes. Grâce à Mathew Biddle.
         
    * AMÉLIORATION:&lt;requestBlacklist&gt; supporte maintenant .\\*.\\*  (ou :\\*:\\*pour IPv6) à la fin des adresses IP afin que vous puissiez blacklist une plus grande partie des adresses IP, par exemple 110.52.\\*.\\*  (Chine Unicom Tianjin) . Voir la documentation pour [&lt;requêteBlacklist&gt;] (/docs/serveur-admin/données#requestblacklist) Merci à China Unicom et China Telecom.
         
    * IMPROVED: Si la source d'un ensemble de données ne spécifie pas un"institution"attribut, Générer des ensembles de données Xml et loadDataset l'obtiennent maintenant à partir d'un attribut "créateur\\_institution" (si disponible) . Grâce à Micah Wengren.
         
    * BUG FIX: standardiser Ce qui n'était pas toujours appliqué aux fichiers de données ASCII.
De plus, EDDTable n'a pas géré correctement les contraintes de temps lorsque la source avait des valeurs de temps String et standardiser Ce qui était utilisé.
Grâce à Paloma de la Vallee.
        
Je n'ai pas dit clairement avant: vous devriez juste utiliser standardiser Quelles caractéristiques lorsque vous en avez réellement besoin (Par exemple, lorsque différents fichiers sources stockent des valeurs de temps de différentes manières) , parce que certaines demandes aux ensembles de données qui utilisent standardiser Ce qui sera traité un peu plus lentement.
        
    * C'est pas vrai. Un bogue dans le code utilisé parEDDGridDeNcFiles l'a fait échouer avec.nc4 et.hdf5 fichiers qui ont "long" (Int64) variables. C'est maintenant réglé. Grâce à Friedemann Wobus.
         
    * C'est pas vrai. De petites modifications aux fichiers ISO 19115 pour rendre un validateur différent heureux. Merci à Chris MacDermaid et Anna Milan.
         

## Version 2.01{#version-201} 
 (sortie 2019-07-02) 

*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :** 
    * Aucune.
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * C'est pas vrai. Un bogue dans le code qui génère le formulaire d'accès aux données pourtabledapdatasets a fait que cette page Web était vide pour certains datasets. Aussi, j'ai amélioré le traitement des erreurs inattendues sur toutes les pages HTML afin qu'ils (généralement) afficher un message d'erreur. Grâce à Marco Alba.
    * AMÉLIORATION: Générer des ensembles de données Xml n'imprime plus un long avertissement en haut de la sortie. Au lieu de cela, voir[Éditer Générer Données Sortie Xml](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better). Grâce à Steven Baum.
    * AMÉLIORATION: Générer des ensembles de données Xml fait maintenant des recommandations légèrement différentes dans différentes situations pour&lt;mettre à jour EveryNMillis&gt; pour EDD...From...Files datasets. Aussi, Générer des ensembles de données Xml décourage désormais le système original "extrait" pour les ensembles de données EDDTableFromFiles.

## Version 2.00{#version-200} 
 (sortie 2019-06-26) 

*    **ERDDAP™v2.00 est enfin là &#33; Ouais &#33;**   
     
    * Nous nous excusons pour le long délai nécessaire pour terminer cette version.
Merci de votre patience.
         
    * La bonne nouvelle est que le temps supplémentaire a été utilisé pour ajouter plus de fonctionnalités que les utilisateurs avaient demandé. La mauvaise nouvelle est que même avec le retard, toutes les fonctionnalités demandées n'ont pas été ajoutées. Nous sommes désolés, mais il semblait plus important d'obtenir cette libération que de retarder plus (Pour toujours ?) continuellement ajouter de nouvelles fonctionnalités. Nous promettons de revenir à des libérations plus fréquentes à l'avenir.
         
    * "Version 2?&#33; Y a-t-il de grands changements et des incompatibilités ?"
De grandes nouveautés ? Oui.
Grandes incompatibilités ou changements pour les administrateurs ou les utilisateurs? C'est pas vrai.
Nous avons sauté de v1.82 à v2.00:
        * en partie pour célébrer 10 ans (maintenant 11) depuis la première publicationERDDAP™  (v1.00 sur 2008-05-06, qui ressemblait remarquablement à v2.00) . À cette époque,ERDDAP™est passé d'une installation à près de 100 installations dans au moins 12 pays (Australie, Belgique, Canada, France, Inde, Irlande, Italie, Afrique du Sud, Espagne, Thaïlande, Royaume-Uni, États-Unis) .
        * en partie pour marquer un ajout majeur dans une toute nouvelle direction:ERDDAP™a maintenant un système d'ingestion de données pour aller avec les services de serveur de données existants (voir[EDDTableFromHttpGet](#eddtablefromhttpget)) ,
        * et en partie parce que ce n'était pas un grand saut de 1.82 à 2.00 numériquement, donc cela semblait être le bon moment.
             
    * L'autre bonne nouvelle est qu'il y a maintenant deux autres groupes contribuant au codeERDDAP™  (dans cette version et avec des indications, ils continueront) : Rob Fuller et Adam Leadbetter du Marine Institute irlandais, et Roland Schweitzer du PMEL et Weathertop Consulting. Merci beaucoup. Il est vrai qu'ils travaillent sur des projets de leur choix, mais c'est le modèle de développement open-source classique -- les groupes contribuent au code des fonctionnalités qu'ils aimeraient le plus voir ajoutées. L'avantage supplémentaire pour les contributeurs: ils peuvent utiliser les nouvelles fonctionnalités dès qu'ils sont terminés; ils n'ont pas à attendre la prochaine version deERDDAP. Votre groupe est également le bienvenu pour contribuer&#33; Voir[ERDDAP™Guide du programmeur](/docs/contributing/programmer-guide).
         
    * Nous espérons que vous aimerezERDDAP™v2.00. Nous attendons avec intérêt les 10 prochaines annéesERDDAP™développement et une utilisation toujours plus grande dans le monde.
         
*    **Nouvelles caractéristiques et changements (pour les utilisateurs) :**   
     
    * NOUVEAU :orderByMeanfiltre
pourtabledapLes ensembles de données calculeront les moyens pour les groupes spécifiés. Aussi, tous lesorderByles options supportent maintenant une façon supplémentaire de définir les groupes : _numériqueVariable\\[/numéro\\[tempsUnités\\]\\[:offset\\]\\]_, par exemple, heure/1jour ou profondeur/10:5. Par exemple,stationID, temps, temps d'eauorderByMean ("stationID, heure/1jour") trier les résultats parstationIDet le temps, puis calculer et retourner la moyenne d'eauTemp pour chaquestationIDpour chaque jour. Ce sont des nouveautés remarquables et puissantes. Le nouveau code pour ces caractéristiques et les modifications à l'ancien code ont été apportées par Rob Fuller et Adam Leadbetter de l'Institut maritime d'Irlande et soumis via Git. Merci, Rob et Adam &#33;
         
    * NOUVEAU: type de fichier de sortie pour les ensembles de données tabulaires:[Données Tableau](https://developers.google.com/chart/interactive/docs/reference#dataparam),
un fichier JSON formaté pour utilisation avecGoogle Visualizationbibliothèque client (Google Charts) . Le code a été apporté par Roland Schweitzer et soumis via Git. Merci, Roland &#33;
         
    * NOUVEAU: type de fichier de sortie pour les ensembles de données tabulaires:[.jsonlCSV1](https://jsonlines.org/examples/),
qui est comme l'existant.jsonlCSVoption, mais avec les noms de colonnes sur la première ligne. Grâce à Eugene Burger.
         
    * NOUVEAU : Si l'administrateur l'autorise, les utilisateurs peuvent désormais se connecter avec leur[ORCIDE](https://orcid.org)compte.
C'est un système d'authentification OAuth 2.0, tout comme l'authentification Google. L'ORCID est largement utilisé par les chercheurs pour s'identifier. Les comptes ORCID sont gratuits et n'ont pas les problèmes de confidentialité que les comptes Google ont. VoirERDDAP's[Instructions d'authentification Orcide](/docs/server-admin/additional-information#orcid). Grâce à BCO-DMO (Adam Shepard, Danie Kinkade, etc.) .
         
    * NOUVEAU : Un nouveau convertisseur d'URL convertit les URL obsolètes en URL à jour.
Voir .../erddap/convert/urls.htmlERDDAP™installation, par exemple,
        [ce lien vers le convertisseur dans leERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html). Cela devrait être utile aux gestionnaires de données. Ceci est également utilisé en interne par GenerateDatasetsXml. Merci à Bob Simons et Sharon Mesick.
         
    * AMÉLIORÉ:[Convertisseur de temps](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)maintenant a des options pour convertir n'importe quel temps de chaîne commune en un temps de chaîne ISO8601, ou convertir unUDUNITS-comme des unités de temps dans une chaîneUDUNITSFicelle des unités de temps. Cela devrait également être utile pourERDDAP™les administrateurs qui doivent savoir quel format spécifier pour l'attribut "units" pour les variables temps de chaîne. Ceci est également utilisé en interne par GenerateDatasetsXml et la standardizeQuelle fonctionnalité d'EDDTableFromFiles. Merci à Bob Simons.
         
    * NOUVEAU :[Convertisseur d'unités](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)a une nouvelle option "Standardize UDUnits".
Par exemple, "deg\\_C/m" et "degrees\\_C meters-1" sont tous deux convertis en
"degré\\_C m-1". Cette fonctionnalité est également utilisée par la standardizeQuelle fonctionnalité d'EDDTableFromFiles. Merci à Bob Simons.
         
    * NOUVEAU : pour les graphiques (autres que les graphiques de surface) sur lestabledap's Make A Graph pages web, lorsque l'axe x n'est pas un axe temporel, si seulement un sous-ensemble de la plage de la variable x axe est visible, il y a maintenant des boutons au-dessus du graphique pour déplacer l'axe X vers la gauche ou vers la droite. Merci à Carrie Wall Bell / le projet Hydrophone.
         
    * NOUVEAU : Pour les graphiques, l'axe X et/ou Y peut maintenant utiliser une échelle de log.
Les utilisateurs peuvent contrôler l'échelle Y Axis via un nouveau widget déroulant sur le griddap ettabledapCréer des pages Web Graphique. Voir[.xRange et . yRange documentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange). Merci à Carrie Wall Bell / le projet Hydrophone.
         
    * AMÉLIORATION:ERDDAP™maintenant fait un meilleur usage de divers codes d'erreur HTTP et retourne(OPeN)DAPv2.0-formated message d'erreur charge utile. Voir[les détails](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors). Merci à Antoine Queric et Aurelie Briand.
         
    * AMÉLIORER: N'utilisez pas Netcdf-java/c ou d'autres outils logiciels pour vous connecter à.ncou.hdffichiers desservis parERDDAP's /files/ système comme s'ils étaient des fichiers locaux.ERDDAP™maintenant refuse ces demandes. Il est horriblement inefficace et cause souvent d'autres problèmes. Plutôt:
        
        * Utilisation(OPeN)DAPlogiciel client pour se connecter àERDDAP'sDAPservices pour l'ensemble de données (qui ont /griddap/ ou /tabledap/ dans l'URL) . C'est ça.DAPest pour et fait si bien.
        * Ou, utilisez le formulaire d'accès aux données de l'ensemble de données pour demander un sous-ensemble de données.
        * Ou, si vous avez besoin du fichier entier ou d'un accès répété sur une longue période de temps, utilisezcurl,wget, ou votre navigateur pour télécharger le fichier entier, puis accéder aux données de votre copie locale du fichier.
        
          
         
    * AMÉLIORATION: Sur leERDDAP™page d'accueil, Recherche texte complet est maintenant au-dessus "Voir une liste de tous les ensembles de données" car il est le meilleur point de départ pour la plupart des utilisateurs. Merci à Didier Mallarino et Maurice Libes.
         
    * AMÉLIORATION: Sur DataProviderForm3.html il y a maintenant des listes déroulantes destandard\\_namePar. Merci à quelqu'un à la réunion de l'IOOS DMAC.
         
    * AMÉLIORATION: Sur les pages web /files/, il y a maintenant un lien vers la nouvelle section "Que puis-je faire avec ces fichiers?" de la documentation /files/. Cette section décrit différents types de fichiers et donne des suggestions pour travailler avec eux. Grâce à Maurice Libes.
         
    * AMÉLIORATION: Presque toutes les demandesERDDAP™devrait être au moins un peu plus rapide, et parfois beaucoup plus rapide.
         
    * C'est pas vrai. Dans certaines circonstances, lorsqu'un ensemble de données EDDTable enregistre des données dans certains types de.ncfichiers, l'attribut global "id" a été défini au nom suggéré du fichier, qui comprend un hash pour le rendre unique à cette requête. Maintenant "id" est bien laissé inchangé (si spécifié) ou défini à l'ensemble de donnéesdatasetID  (si non spécifié) . Merci à John Maurer.
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :**   
     
    * DO: Cette version prendra du temps et travaillera de votre part. Soyez patient et prévoyez de prendre quelques heures pour faire les changements nécessaires et quelques heures de plus pour expérimenter de nouvelles fonctionnalités.
         
    * À faire: Pour la sécurité, faites une copie de sauvegarde de votre configuration actuelle.xml etdatasets.xmlfichiers de sorte que vous pouvez revenir à eux dans le cas improbable où vous devez revenir àERDDAP™v1.82.
         
    * À faire: La recommandationJavaest maintenant AdopteOpenJDK OpenJDK 8 (LTS) + HotSpot.
Ceci est une variante open source deJavaqui n'a aucune restriction à son utilisation (Contrairement àOracle'sJavadistribution) . Il est dérivé deOracle'sJavade façon continue, avecOracleLa bénédiction. Pour des raisons de sécurité, il est important deJavaversion mise à jour. VoirERDDAP's[Javainstructions d'installation](/docs/server-admin/deploy-install#java).
         
    * À faire: Adoptez OpenJDKJavabesoin d'un petit ajout à votre installation Tomcat: voir la[Ressources Cache instructions](/docs/server-admin/deploy-install#contentxml). Je pense que c'est un remplacement pour le réglage -XX:MaxPermSize, qui (Adopter) OpenJDK ne supporte plus.
         
    * À faire: La nouvelle par défaut et recommander&lt;fontFamily&gt; setting in setup.xml est
DejaVu Sans qui sont intégrés dans AdopteOpenJDKJava. Voir
        [instructions d'installation de police révisées](/docs/server-admin/deploy-install#fonts).
         
    * À faire: De nombreuses balises passent de setup.xml àdatasets.xml. L'avantage est que vous pouvez changer leurs valeurs pendant queERDDAP™fonctionne, sans redémarrerERDDAP. Notamment, vous pouvez facilement changer&lt;startBodyHtml5&gt; pour afficher un message temporaireERDDAP™page d'accueil (Par exemple, "Vérifiez le nouvel ensemble de données JPL MUR SST v4.1 ..." ou "CeciERDDAP™sera hors ligne pour la maintenance 2019-05-08T17:00:00 PDT à 2019-05-08T20:00:00 PDT.") . Si/lorsque vous changez ces balises dansdatasets.xml, les changements prendront effet la prochaine foisERDDAP™litdatasets.xml.
         
        
        1. Copiez ce contenu dans votredatasets.xmlfichier (n'importe où près du début du fichier,&lt;erddapDatasets&gt;):
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. Un par un, copiez la valeur (le cas échéant) pour chacune de ces balises de votre fichier setup.xml dans la nouvelle balise que vous venez de coller (ci-dessus) endatasets.xml. Par exemple, si vous aviez utilisé une valeur de 30&lt;cacheMinutes&gt; dans setup.xml, vous devriez copier cette valeur dans le nouveau&lt;balise cacheMinutes&gt; dansdatasets.xml  (bien que si la valeur est la même que la nouvelle valeur par défaut, il est préférable de laisser la balise dansdatasets.xmlblanc) .
            
Si votre valeur est différente de la nouvelle valeur par défaut suggérée (autre que pour&lt;démarrageBodyHtml5&gt; et&lt;theShortDescriptionHtml&gt;, qui sont utiles pour personnaliser votreERDDAP™installation), veuillez envisager de passer aux nouvelles valeurs par défaut. C'est particulièrement vrai&lt;Demande partielleMaxBytes&gt; et&lt;partiellementRequestMaxCells&gt;, où la valeur par défaut/suggestion a considérablement changé au fil des ans.
            
Après avoir copié chaque valeur, supprimez la balise et sa description de setup.xml. Il est préférable d'avoir ces étiquettes dansdatasets.xml. Et il y a maintenant de meilleures descriptions dans[configurationDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file).
            
        
Une quirk du nouveau système est que la première page Web lorsque vous démarrezERDDAPsera par défautERDDAP™page web. Chaque page suivante utilisera le contenu ...Html que vous spécifiezdatasets.xml.
        
    * ATTENTION: La première fois que vous lancezERDDAP™v2.0, les ensembles de données basés sur les fichiers de données locaux seront chargés **Très** lentement parce queERDDAP™doit recréer sa base de données de fichiers dans un format légèrement différent. Après la lente recharge initiale, ils se chargeront rapidement, comme avant. Soyez patient.
         
#### EDDTableFromHttpGet{#eddtablefromhttpget} 
    *   [GRANDES CARACTÉRISTIQUES: EDDTableFromHttpGet](#eddtablefromhttpget)  
Jusqu'à maintenant,ERDDAP™il suffit de lire les données et de les mettre à la disposition des utilisateurs. Maintenant,ERDDAP™dispose d'un système simple et efficace pour ingérer les données en temps réel des capteurs. Entre autres caractéristiques, cet ensemble de données offre une version fine : il se souvient de chaque changement apporté à l'ensemble de données, quand il a été fait, et par qui. Habituellement, les utilisateurs veulent simplement la dernière version de l'ensemble de données, avec tous les changements appliqués. Mais il y a la possibilité pour les utilisateurs de demander des données de l'ensemble de données comme il l'était à tout moment. Cela facilite la reproductibilité de la science. Ainsi, contrairement à la plupart des autres ensembles de données en temps quasi réel, ces ensembles de données sont admissibles à[DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier). parce qu'ils rencontrent lesDOIexiger que l'ensemble de données ne change pas, sauf par agrégation. Voir[EDDTableFromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget). Grâce à OOI (depuis longtemps et maintenant) pour parler de la nécessité de cela et Eugene Burger pour le rappel de travailler sur ce qui est important.
         
    * GRANDES CARACTÉRISTIQUES:ERDDAP™peuvent maintenant servir des données directement à partir de fichiers de données compressés externes, y compris.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, ou .Z. Les ensembles de données peuvent inclure un mélange de fichiers compressés externement (Peut-être les anciens fichiers de données ?) et des fichiers non-externement compressés, et vous pouvez compresser/décompresser un fichier à tout moment.
        
Ça marche bien &#33;
Dans la plupart des cas, le ralentissement lié à la décompression des fichiers est mineur. Nous vous encourageons fortement à essayer cela, notamment pour les ensembles de données et/ou les fichiers de données qui sont rarement utilisés.
        
Cela peut vous faire économiser 30 000 $ ou plus&#33;
C'est un des raresERDDAP™fonctionnalités qui peuvent vous économiser beaucoup d'argent -- si vous comprimez beaucoup de fichiers de données, vous aurez besoin beaucoup moins de RAID / disques durs pour stocker les données, ou inversement, vous pouvez servir beaucoup plus de données (jusqu'à 10x) avec les RAID que vous avez déjà. Si cette fonctionnalité vous épargne d'acheter un autre RAID, alors il vous a économisé environ 30 000 $.
        
Voir[Documentation des fichiers compressés externement](/docs/server-admin/datasets#externally-compressed-files). Grâce à Benoît Perrimond et Paloma de la Vallee.
        
    * GRANDES CARACTÉRISTIQUES: TousEDDGridFromFiles et tous les ensembles de données EDDTableFromFiles supportent une&lt;tag cacheFromUrl&gt; et une&lt;tag cacheSizeGB&gt;. Si cacheSizeGB n'est pas spécifié, cela va télécharger et maintenir une copie complète des fichiers d'un ensemble de données distant. Si cacheSizeGB est spécifié et est &gt;0, il téléchargera les fichiers de l'ensemble de données distant, au besoin, dans un cache local de taille limitée, ce qui est utile pour travailler avec cloud (Par exemple, S3) fichiers de données. Voir[cache Documentation d'Url](/docs/server-admin/datasets#cachefromurl)pour plus de détails. Merci à Bob Simons et Roy Mendelssohn (qui depuis des années ont écrit des scripts pour gérer faire des copies locales de fichiers dataset distants) , Lloyd Cotten, Eugene Burger, Conor Delaney (quand il était à Amazon Web Services) , et la plateforme Google Cloud.
         
    * NOUVEAU : La nouvelle table EDD de JsonlCSV classe peut lire des données tabulaires à partir
        [JSON Fichiers CSV de lignes](https://jsonlines.org/examples/)  ("Mieux vaut que CSV") . Merci aux gens de l'Institut marin d'Irlande de m'avoir parlé de ce format et à Eugene Burger et au PMEL pour leur demande de le soutenir en tant que type d'entrée.
         
    * NOUVEAU: TousEDDGridet tous les ensembles de données EDDTableFromFiles supportent un&lt;nThreads&gt; réglage, qui indiqueERDDAP™combien de threads à utiliser pour répondre à une demande. Voir[nDocumentation des fils](/docs/server-admin/datasets#nthreads)pour plus de détails. Merci à Rob Bochenek de Axiom Data Science, Eugene Burger, Conor Delaney (quand il était à Amazon Web Services) , et Google Cloud Platform.
         
    * Nouvelle normalisation Quoi pour toutes les sous-classes EDDTableFromFiles -
Auparavant, si pour une variable donnée, les valeurs des attributs importants (Par exemple,scale\\_factor,add\\_offset,missing\\_value, \\_FillValue, unités) n'étaient pas cohérents, EDDTableFromFiles choisirait une valeur pour chaque attribut pour être "valable" et marquerait les fichiers avec d'autres valeurs d'attribut comme "Bad Files". Maintenant, il y a un système pour normaliser les fichiers dès que EDDTableFromFiles lit les fichiers. Voir[EDDTableFromFile standardise Quoi ?](/docs/server-admin/datasets#standardizewhat). Une desERDDAP's principaux objectifs est de rendre les fichiers de données et les ensembles de données accessibles de manière cohérente. uniformiser Ce qui est un nouvel outil important pour en faire une réalité. Grâce à Marco Alba, Margaret O'Brien (et autres utilisateurs de EML) , BCO-DMO et utilisateurs InPort.
         
    * NEW EDDTableFromInvalidCRAFiles vous permet de créer un ensemble de données à partir d'une collection deNetCDF  (v3 ou v4)  .ncfichiers qui utilisent une variante spécifique, non valide, du DSG Contiguous Array (ARC) fichiers. Des exemples de fichiers pour ce type d'ensemble de données peuvent être trouvés à https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Ce serveur n'est plus disponible de façon fiable\\]. Bien queERDDAP™prend en charge ce type de fichier, c'est un type de fichier invalide que personne ne devrait commencer à utiliser. Les groupes qui utilisent actuellement ce type de fichier sont fortement encouragés à utiliserERDDAP™pour générer des fichiers valides de l'ARC DSG des FC et cesser d'utiliser ces fichiers. Merci à Ajay Krishnan et Tim Boyer.
         
    * EDDTableFromThreddsFiles et EDDTableFromHyraxLes fichiers sont maintenant dépréciés. Veuillez passer à EDDTableFromNcFiles (ou une variante) Plus&lt;cacheFromUrl&gt;. Si cela ne fonctionne pas pour une raison quelconque, e-mailerd.data at noaa.gov. S'il n'y a pas de plaintes avant 2020, ces types d'ensembles de données peuvent être supprimés.
         
    * AMÉLIORÉ -- Le système pour convertir automatiquement les non-ISO 8601 fois en ISO 8601 fois (introduit dans v1.82) a été considérablement élargi pour traiter un grand nombre de formats supplémentaires. Ceci affecte GenerateDatasetsXml etERDDAPLe traitement des métadonnées sources.
         
    * AMÉLIORÉ -- Avec sa troisième révision majeure du système d'analyse du temps String (et j'espère que le dernier) ,ERDDAP™ne plus utiliserJavaDateTimeFormatter à cause de bugs qui affectent parfois les temps extrêmes (années&lt;=0000).ERDDAP™maintenant utilise son propre système pour analyser les chaînes de temps.
         
    * ATTENTION: Le nouveau système d'analyse du temps de chaîne est un peu plus strict. Si un de vos ensembles de données n'a soudainement que des valeurs manquantes pour les valeurs de temps, la cause est presque certainement que la chaîne de format de temps est légèrement erronée. Il devrait y avoir des messages d'erreur dans le journal. txt est lié à des valeurs temporelles qui ne correspondent pas au format de temps -- qui devraient vous aider à fixer la chaîne de format de temps pour cet ensemble de données. Si vous avez besoin d'aide, utilisez l'optionERDDAPLe convertisseur de temps qui "Convertir\\[s\\]tout temps de chaîne commun dans un temps de chaîne ISO 8601" -- il indique le format utilisé par le convertisseur pour analyser la chaîne source.
         
    * RECOMMANDATION: Le moyen le plus rapide, le plus simple et le moins cher d'accélérerERDDAP'l'accès aux données tabulaires est de mettre les fichiers de données sur un Solid State Drive (SSD) . La plupart des ensembles de données tabulaires sont relativement petits, de sorte qu'un SSD 1 ou 2 To est probablement suffisant pour contenir tous les fichiers de données pour tous vos ensembles de données tabulaires. SSD finit par s'user si vous écrivez des données à une cellule, le supprimer, et écrire de nouvelles données à cette cellule trop souvent. Je recommande plutôt que (autant que possible) vous utilisez simplement votre SSD pour écrire les données une fois et le lire plusieurs fois. Ensuite, même un SSD de qualité consommateur devrait durer très longtemps, probablement beaucoup plus longtemps que n'importe quel disque dur (HDD) . Les SSD de qualité consommateur sont maintenant bon marché (en 2018, ~200 $ pour 1 TB ou ~400 $ pour 2 TB) et les prix continuent de baisser rapidement. QuandERDDAP™accès à un fichier de données, un SSD offre les deux
        
        * latence plus courte (~0,1ms, versus ~3ms pour un disque dur, versus ~10 (?) ms pour un RAID, contre ~55ms pour Amazon S3) et
        * débit supérieur (~500 Mo/S, contre ~75 Mo/s pour un disque dur contre ~500 Mo/s pour un RAID) .
        
Donc vous pouvez obtenir jusqu'à un ~10X performance boost (vs un disque dur) pour 200 dollars &#33; Par rapport à la plupart des autres changements possibles à votre système (un nouveau serveur pour 10 000 $ ? un nouveau RAID pour 35 000 $ ? un nouveau commutateur réseau pour 5 000 $? etc.) , c'est de loin le meilleur retour sur investissement (ROI) . Si votre serveur n'est pas chargé de mémoire, la mémoire supplémentaire pour votre serveur est également un excellent moyen relativement peu coûteux d'accélérer tous les aspects deERDDAP.
        \\[SSD's serait idéal pour les données maillées, aussi, mais la plupart des ensembles de données maillés sont beaucoup plus grands, ce qui rend le SSD très cher.\\]  
         
    * NOUVEAU : Tous ceux qui sont connectés obtiennent un rôle=\\[N'importe quiLoged En\\], même s'il n'y a pas&lt;user&gt; tag pour eux dansdatasets.xml. Si vous définissez des données&lt;accessible aux\\[N'importe quiLoged En\\], alors quiconque s'est connecté àERDDAP™  (Par exemple, via leur compte Gmail ou Orcid) sera autorisé à accéder à l'ensemble de données, même si vous n'avez pas spécifié un&lt;user&gt; tag pour eux dansdatasets.xml. Grâce à Maurice Libes.
         
    * AMÉLIORÉ:UDUNITSLe convertisseur /UCUM a été largement amélioré.
Il gère mieux les chaînes d'unités invalides (en commençant par l'accent mis sur la préservation de l'information plutôt que sur l'application de la validité) . De plus, les résultats ont maintenant une syntaxe normalisée.
         
    * NOUVEAU :UDUNITS/UCUM unités convertisseur a une nouvelle option pour standardiser unUDUNITSUne corde.
Cela fonctionne bien pour valideUDUNITSchaînes et raisonnablement bien pour non-standard / invalideUDUNITSDes cordes. Par exemple,UDUNITS= "mètres par seconde", "mètre/seconde","m.s^-1"et"m s-1"retournera tous "m.s-1". Cela était nécessaire pour la nouvelle normalisation Quel système décrit ci-dessus. Grâce à Marco Alba, Margaret O'Brien (et autres utilisateurs de EML) , BCO-DMO et utilisateurs InPort.
         
    * NOUVEAU: EDDTableFromMultidimNcFiles a maintenant un[TraitementDimensionsAs](/docs/server-admin/datasets#treatdimensionsas)option, qui indiqueERDDAP™pour traiter certaines dimensions (Par exemple, LAT et LON) comme s'ils étaient d'autres dimensions (Par exemple, heure) . Ceci est utile pour certains fichiers incorrects qui utilisent différentes dimensions pour différentes variables quand ils auraient dû utiliser une seule dimension (Par exemple, heure) . Grâce à Marco Alba et Maurice Libes.
         
    * TousEDDGridDes ensembles de données...Files supportent un nouvel axe spécialsourceNamequi ditERDDAP™pour extraire des informations du nom de fichier (juste nom de fichier.ext) et utiliser la valeur **remplacer** la valeur de l'axe le plus à gauche. Le format est
        \\*\\*\\*replaceFromFileName,_dataType_,_extractRegex_,_captureGroupNumber_
Voir[cette documentation](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Grâce àNOAAPathfinder Ensemble de données quotidiennes d'agrégation.
         
    * TousEDDGridDes ensembles de données...Files supportent un nouvel axe spécialsourceNamequi ditERDDAP™pour extraire des informations du chemin du fichier (répertoires + filename.ext)   
        \\*\\*\\*pathName,_dataType_,_extractRegex_,_captureGroupeNumber_
Pour cela, le nom de chemin utilise toujours'/'comme le caractère de séparateur de répertoire, jamais '\\'.
Voir[cette documentation](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Grâce à Paloma de la Vallee.
         
    * Maintenant, toute EDDTable de... Fichiers datasets prennent en charge la variable pseudo supplémentairesourceNames qui extrait des informations du fichier Nom (juste nom de fichier.ext)   (voir[\\*\\*Nom du fichier \\*](/docs/server-admin/datasets#filename-sourcenames)) ou à partir du chemin complet du fichier (/dir1/dir2/filename.ext)   (voir[\\*\\*\\*pathName](/docs/server-admin/datasets#pathname-sourcenames)) . Grâce à Paloma de la Vallee.
         
    * NOUVEAU :EDDGriddataset a une ou plusieurs dimensions très grandes (Par exemple, des millions de valeurs) qui prennent beaucoup de mémoire, vous pouvez configurer le nouveau [&lt;dimensionsValuesInMemory&gt;] (/docs/serveur-admin/datasets#dimensionvaluesinmemory) mise à faux (par défaut est vrai) , qui provoque l'ensemble de données pour stocker les valeurs sur le disque et les récupérer au besoin. Merci à David Rodriguez et Rich Signell (Objet:EDDGridDepuisAudioFiles) .
         
    * Avant, si vous réorganisiez ladataVariables pour un jeu de données EDDTableFromFiles et a rechargé l'ensemble de données, EDDTableFromFiles relisait tous les fichiers de données. Maintenant, il peut gérer la réorganisation sans relire tous les fichiers de données. Merci à Roland Schweitzer.
         
    * Maintenant, quandERDDAP™lit les fichiers de données tabulaires ASCII, NCCSV et JSON Lines CSV, s'il trouve une erreur sur une ligne donnée (Par exemple, nombre incorrect d'articles) , il enregistre un message d'avertissement ("J'ai oublié la ligne #"... "nombre inattendu d'articles...") aux[fichier log.txt](/docs/server-admin/additional-information#log)puis continue à lire le reste du fichier de données. Ainsi, il est de votre responsabilité de regarder périodiquement (ou écrire un script pour le faire) pour ce message dans le journal. txt afin que vous puissiez résoudre les problèmes dans les fichiers de données.ERDDAP™est configuré de cette façon afin que les utilisateurs puissent continuer à lire toutes les données valides disponibles, même si certaines lignes du fichier ont des défauts. Précédemment,ERDDAP™a marqué le fichier comme "mauvais" et l'a supprimé de l'ensemble de données.
         
    * AMÉLIORATION: Quand les temps sont précis (Par exemple, à la seconde ou milliseconde la plus proche) sont stockés à la source comme « minutes depuis ... » (ou plus grandes unités) ,ERDDAP™maintenant les arrondit à la milliseconde la plus proche lors de la lecture des valeurs dansERDDAP. Dans le cas contraire, les nombres flottants sont contusés et les demandes de données à des moments précis (Par exemple, et heure=2018-06-15T01:30:00) échouera. Auparavant, il les calculait aussi précisément que possible (et toujours si les unités sont, par exemple, "secondes depuis ..." ou "millisecondes depuis ...") . Il est préférable d'éviter ce problème en n'utilisant pas de grandes unités (Par exemple, minutes ou heures) pour stocker des valeurs de temps précises (Par exemple, microsecondes) -- les ordinateurs font un mauvais travail de traitement des chiffres décimaux. Grâce à Marco Alba.
         
    * CHANGEMENTS À EDDTableEDDGridCe qui fait beaucoup mieux. Tableau EDD deEDDGridpermet aux utilisateurs de requête des ensembles de données maillés comme s'ils étaient des ensembles de données tabulaires ("requête par valeur") .
        
        * Il soutient maintenant&lt;Tag maxAxis0&gt; (par défaut=10) qui spécifie le nombre maximal d'axes\\[0\\]  (généralement"time") valeurs qui peuvent être posées en même temps. Cela empêche les demandes naïves d'obtenir EDDTableFromEDDGridpour rechercher à travers un ensemble de données maillées (qui échouerait avec une erreur de temporisation) .
        * Générer des ensembles de données Xml a maintenant une option pour générer EDDTableFromEDDGridensembles de données pour tous les ensembles de données maillés dans une donnéeERDDAP™qui correspondent à un regex spécifié (utiliser .\\* pour correspondre à tous les ensembles de données) . Les ensembles de données qu'il crée ont des informations supplémentaires dans l'attribut sommaire indiquant qu'il s'agit d'une version tabulaire d'un ensemble de données maillées. Et leursdatasetIDest ledatasetIDde l'ensemble de données maillées, plus "\\_AsATable".
        * Il y a une grande vitesse pour la configuration la plus courante: lorsque l'ensemble de donnéesEDDGridD'Erddap ensemble de données qui est dans le mêmeERDDAP.
        
Grâce à James Gallagher et Ed Armstrong.
         
    * NOUVEAU : générer Données Xml pour tous les types de données est maintenant beaucoup plus susceptible d'ajouter un \\_FillValue oumissing\\_valueattribut à une variable numériqueaddAttributes. Par exemple, cela se produit lorsque la chaîne manque des marqueurs de valeur (Par exemple, "", ".", "?", "NA", "nd", "NaN") pour cette variable dans le fichier échantillon sont convertis enERDDAPLes valeurs manquantes natives (127 en colonnes octets, 32767 en colonnes courtes, 2147483647 dans les colonnes int, 9223372036854775807 en colonnes longues, et NaN en variables flottantes et doubles) . Il se produit également pour les valeurs de NaN dans les variables flottantes et doubles. De plus, la «nd» a été ajoutée à la liste des marqueurs communs manquants dans les colonnes de données numériques quiERDDAP™devrait chercher. Grâce à Matt Biddle de BCO-DMO.
         
    * AMÉLIORATION: l'option ncdump dans generate Données Xml est maintenant plus comme ncdump (mais utilise toujours la version netcdf-java de ncdump) . Maintenant, il imprime une nouvelle liste d'options. Maintenant, pour.ncfichiers ml, il imprime la sortie ncdump pour le résultat du.ncml modifications de fichier appliquées au sous-jacent.ncou.hdffichier.
         
    * C'est pas vrai. Il y avait une fuite de poignée de fichier (en fin de compteERDDAP™pour geler) causé lors de la création de certains types de fichiers de sortie, p.ex. .geotif, notamment quand des erreurs se sont produites pendant la création. Je pense/espère que tout sera réglé. Si vous voyez encore des problèmes, veuillez me dire le type de données (grille ou tableau) et le type de fichier qui cause le problème. Merci à Steven Beale, Lynn DeWitt, Jibei Zhao, et d'autres.
         
    * C'est pas vrai. LesWMS Leafletdémo n'a pas complètement/propriété converti l'axe "profondeur" en "élévation". Maintenant, c'est vrai, et les demandes de légende cassées sont corrigées. En outre, toutes les options d'axe dans les listes déroulantes sont toujours dans l'ordre croissant trié. Merci à Antoine Queric et Aurelie Briand.
         
    * BUG FIX: EDDTableFromFiles supporte maintenant correctement les contraintes sur les variables de chaîne qui ont été créées à partir de variables char dans les fichiers de données. Merci à Antoine Queric et Aurelie Briand.
         
    * C'est pas vrai. Maintenant, quand un jeu de données devient indisponible, l'ensemble de données essaie de notifier (avec le message "Ce jeu de données est actuellement indisponible.") ses abonnés, actions listées, rss et lonPM180 ensembles de données qui en dépendent. Merci à Roy Mendelssohn et Bob Simons.
         
    * C'est pas vrai. Deux bugs liés à EDDTableCopy. Grâce à Sam McClatchie.
         
    * AMÉLIORER : Le nombre de demandes défectueuses affichées sur la page status.html augmentera parce que plus de choses sont comptées comme des échecs qu'auparavant.
         
    * AMÉLIORATION:ERDDAP'statut.html affiche maintenant "Demandes (temps médian en ms) " dans les séries chronologiques. Auparavant, il montrait des temps médians tronqués à entiers secondes.
         
    * IMPROVED: Dans la sortie de jsonld, le "nom" de jsonld vient maintenant de l'ensemble de données"title"enERDDAP, et le jsonld "headline" vient maintenant du jeu de données "datasetID"dansERDDAP. Auparavant, c'était inversé. Cela me semble mal parce que dans l'usage anglais normal, "nom" est généralement un court, (Idéalement) identifiant unique qui change rarement/jamais (Par exemple, Robert Middlenam Simons) , pas une description qui n'est pas unique et qui peut facilement et souvent changer (Par exemple, "Un gars qui écrit des logiciels pourNOAAUn grand gars qui écrit des logiciels pourNOAA") . Ce serait super si la définition de schème.org[Dénomination](https://schema.org/name), dans le contexte d'un ensemble de données, étaient plus spécifiques. Les développeurs de logiciels devraient être en mesure d'écrire une mise en œuvre d'une spécification basée uniquement sur la spécification, sans les conseils des experts. Mais je me reporte à Google (notamment Natasha Noyau) , NCEI (notamment John Relph) Et Rob Fuller.
         
    * IMPROVED: Dans la sortie jsonld, les quatre valeurs "spatialCoverage GeoShape box" sont maintenant minLat minLon maxLat maxLon. Auparavant, les positions lat et lon étaient inversées. Ce serait super si la définition de schème.org[Géoforme](https://schema.org/GeoShape)précise l'ordre correct. Les développeurs de logiciels devraient être en mesure d'écrire une mise en œuvre d'une spécification basée uniquement sur la spécification, sans les conseils des experts. Grâce à Natasha Noy et Rob Fuller.

## Version 1.82{#version-182} 
 (publié le 2018-01-26) 

*    **Nouvelles fonctionnalités (pour les utilisateurs) :**   
     
    * De nombreux changements subtils au look-and-feel deERDDAP™pages Web.
        * AMÉLIORATION:ERDDAP™maintenant utilise HTML 5 et fait un meilleur usage de CSS.
        * AMÉLIORATION: Les pages web ont été légèrement modifiées pour les rendre plus propres et moins "busy". (Ils sont encore denses et il y a encore des choses dont on pourrait se plaindre, mais espérons-le beaucoup moins qu'auparavant.) Merci à John Kerfoot pour quelques commentaires.
        * AMÉLIORATION: Les pages Web sont maintenant beaucoup mieux sur les téléphones mobiles et autres petits appareils, particulièrement si vous les utilisez dans l'orientation paysagère. Ils sont également plus beaux dans les fenêtres très petites et très grandes dans les navigateurs de bureau.
        * AMÉLIORER: Pour améliorer la sécurité et d'autres raisons, l'utilisation d'une version obsolète Openlayers pour laWMSles pages de démonstration ont été remplacées parLeaflet.
        * NOUVEAU : prise en charge des prévisualisations de fichiers image, audio et vidéo dans le"files"système (par exemple,[cet ensemble de données d ' essai](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) et en.htmlTablerépond quand une cellule a l'URL d'un fichier image, audio ou vidéo (par exemple,[cette demande](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) . Si vous survolez une icône '?', vous devriez voir une image, un audio ou un fichier vidéo. Vous pouvez également cliquer sur le lien de fichier pour afficher le fichier en plein écran dans votre navigateur. Voir[Documentation des fichiers multimédias](/docs/server-admin/datasets#media-files). Notez que différents navigateurs prennent en charge différents types de fichiers, de sorte que les exemples peuvent ne pas fonctionner dans votre navigateur.
Merci à ces personnes/liens pour les idées et un exemple de code pour CSS-only image tooltips (était à https://codepen.io/electricalbah/pen/eJRLVd ) et report du chargement de l'image (était à https://varvy.com/pagespeed/defer-images.html )   (bien que le code ait été modifié avant son utilisationERDDAP) .
Merci à Cara Wilson, Matthew Austin et Adam Shepherd/BCO-DMO pour les demandes de soutien de l'image.
Merci à Jim Potemra, Rich Signell, OOI et Carrie Wall Bell pour les demandes de support de fichiers audio/hydrophone.
Merci à OOI pour avoir montré le besoin de support vidéo.
        * NOUVEAU : Un sous-ensemble de données provenant deERDDAP™ensemble de données (mais généralement un ensemble de données à partir de fichiers audio) peut maintenant être enregistré dans un fichier audio .wav. ([la documentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) Merci à Jim Potemra, Rich Signell, OOI et Carrie Wall Bell pour les demandes de support de fichiers audio/hydrophone.
        * AMÉLIORATION: Le format des dossiers accessibles sur le Web (WAF)   (Par exemple, les dossiers /files/) a été mis à jour pour utiliser un tableau HTML. Le nouveau format imite la version plus récente du répertoire listant les pages Web créées par les versions plus récentes d'Apache. Les humains trouveront que les changements rendent l'information plus facile à lire. Logiciel qui analyse ces documents (par exemple, un logiciel qui recueille des documents ISO 19115ERDDAP) Le nouveau format devra être révisé, mais il sera plus facile à analyser que le précédent. (Attention, Anna Milan.) 
        * NOUVEAUoutOfDateDatasets.htmlpage. ([exemple](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) Cette page Web montre un tableau avec tous les ensembles de données en temps quasi réel qui ont un&lt;testOutOfDate&gt; étiquette (voir ci-dessous) , classés selon le caractère obsolète des ensembles de données. Ce tableau de bord devrait être utile pourERDDAP™les administrateurs et les utilisateurs finaux lorsqu'ils veulent savoir quels ensembles de données sont obsolètes. Pour les ensembles de données périmés, il y a probablement un problème avec la source des données, de sorte queERDDAP™est incapable de voir/obtenir des données à partir de points de temps plus récents.
Administrateurs : Si vous ne voulez pas d'une page Web sur les ensembles de données hors date, ajoutez ceci à votre setup.xml :
            &lt;horsdedateDatasetsActive&gt;false&lt;/outOfDateDatasetsActive&gt;
Il y a maintenanttestOutOfDateet dehors Les colonnes de date dans laallDatasetsensemble de données.
Merci à Bob Simons, qui le souhaite depuis des années, et aux gens intelligents de l'Institut maritime d'Irlande qui m'ont donné l'inspiration via leur Raspberry Pi dédié et moniteur qui montre toujours un écran comme celui-ci dans leur bureau.
        * AMÉLIORATION:.htmlTableet.xhtmlla réponse est maintenant mieux formatée, plus compacte, et donc charger plus rapidement. Merci à HTML5 et CSS.
    * NOUVEAU type de fichier de sortie pour les ensembles de données de griddap : .timeGaps. Il montre une liste des écarts dans les valeurs temporelles qui sont plus importants que l'écart médian. ([exemple](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) Ceci est utile pourERDDAP™les administrateurs et les utilisateurs finaux lorsqu'ils veulent savoir s'il y a des lacunes inattendues dans les valeurs temporelles d'un ensemble de données qui devrait avoir des valeurs temporelles régulièrement espacées. Merci à Bob Simons et Roy Mendelssohn qui avaient besoin de cette fonctionnalité.
    * AMÉLIORER : Le graphique par défaut pour leallDatasetsdataset est maintenant une carte avec x=maxLon et y=maxLat. Grâce à John Kerfoot, Rich Signell et OOI-CI.
    * NOUVEAU :[rddapy](https://github.com/ioos/erddapy)-- n'est pas unERDDAP™caractéristique, mais sera d'intérêt pour beaucoupERDDAP™utilisateurs. Erddapy (ERDDAP™+Python) estPythonbibliothèque créée par Filipe Fernandes qui « profite deERDDAP'sRESTfulet crée leERDDAP™URL pour toute demande comme rechercher des ensembles de données, acquérir des métadonnées, télécharger des données, etc." Grâce à Filipe Fernandes.
    * J'aurais dû mentionner avant : Il y a un paquet R tiers conçu pour faciliter le travail avecERDDAP™à l'intérieur de R:[rerddap](https://github.com/ropensci/rerddap#rerddap). Grâce à[Les](https://ropensci.org/)et Roy Mendelssohn.
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :**   
     
    * À faire: Dans setup.xml, juste en dessous&lt;adminInstitution&gt;, veuillez ajouter un&lt;adminInstitutionUrl&gt; tag qui spécifie une URL pour votre institution (ou groupe) .
    * DO: Ces 3 tags dans setup.xml ne sont plus utilisés:
        &lt;début TêteHtml&gt;,&lt;démarrageBodyHtml&gt; et&lt;EndBodyHtml&gt;. Ils sont remplacés par
        &lt;débutHeadHtml5&gt;,&lt;démarrageBodyHtml5&gt; et&lt;endBodyHtml5&gt;, qui ont des valeurs par défaut spécifiées dans message.xml (et indiqués ci-après) .
        
Nous recommandons d'utiliser la valeur par défaut&lt;startHeadHtml5&gt; et&lt;EndBodyHtml5&gt;.
Nous vous recommandons : Si vous avez apporté des modifications à l'original&lt;startBodyHtml&gt; et/ou souhaitez personnaliser votreERDDAP™Maintenant, s'il vous plaît copiez le nouveau&lt;balise startBodyHtml5&gt; (ci-dessous) dans votre setup.xml et le modifier pour personnaliser votreERDDAP™de sorte queERDDAPles pages Web reflètent votre organisation,NOAA ERD. En particulier, s'il vous plaît, changez le «fait pour vous» à votre organisation (s) . Si vous avez besoin d'aide, veuillez envoyer un courrielerd.data at noaa.gov. (Si vous ne voulez pas personnaliser votreERDDAP™maintenant, utilisez la valeur par défaut&lt;démarrageBodyHtml5&gt;.)
        
Supprimez ensuite les 3 anciennes balises de votre setup.xml qui ne sont plus utilisées.

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

Il y a d'autres moyens que vous pouvez[PersonnaliserERDDAP™](/docs/server-admin/deploy-install#customize)doncERDDAP's pages Web reflètent votre organisation au lieu deNOAA ERD.
        
    * À faire:&lt;EDDGrid...Exemple&gt; tags (commençant par&lt;EDDGridIdExemple&gt;) et&lt;Tableau EDD... Exemple &gt; tags (commencer par&lt;EDDTableIdExample&gt;) dans votre fichier setup.xml sont utilisés pour créer des exemples dans le griddap ettabledapla documentation. html pages Web dans votreERDDAP.
        
Si vous n'avez pas personnalisé ces balises, veuillez les supprimer de votre fichier setup.xml. Maintenant, ils ont tous des valeurs par défaut dans messages.xml qui se réfèrent à des ensembles de données dans BobERDDAP™au https://coastwatch.pfeg.noaa.gov/erddap/index.html . Donc, vous n'avez plus besoin d'avoir des ensembles de données spécifiques dans votreERDDAP. Si vous voulez outrepasser les valeurs par défaut, copiez une partie ou la totalité de ces balises dans votre setup.xml et changez leurs valeurs.
Si vous voulez que les exemples pointent vers votreERDDAP™, la méthode la plus facile est:
        
        1. Inclure ces deux ensembles de données dans votreERDDAP™en ajoutant ceci à votredatasets.xml:
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Ajoutez cette balise à votre setup.xml, mais changez l'URLERDDAP's (https?) URL & #160;:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Si vous avez personnalisé ces tags, laissez-les tels quels et veuillez ajouter ces 2 nouvelles tags à votre setup.xml pour spécifier leERDDAP™URL pour ces ensembles de données, mais changez l'URL à votreERDDAP's (https?) URL & #160;:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * À faire :ERDDAP™maintenant utilise un fichier css appelé erddap2.css. Si vous avez apporté des modifications à\\[Tomcat\\]/webapps/erddap/images/erddap.css, envisager d'apporter des changements similaires à erddap2.css (dans le même répertoire) .
    * NOUVEAU :ERDDAP's pages Web ont maintenant un grand nombre de liens internes presque invisibles (le texte est noir et non souligné) . Si vous survolez un de ces liens (généralement les premiers mots des titres et paragraphes) , le curseur devient une main. Si vous cliquez sur le lien, l'URL est le lien interne à cette section du document. Il est donc facile de se référer à des sections spécifiques de la documentation. Merci à Bob Simons, qui le veut depuis des années.
    * NOUVEAU :ERDDAP™maintenant soutient[Gamme d'octets/Ranges acceptées](https://en.wikipedia.org/wiki/Byte_serving)requêtes pour des parties de fichiers /files/. Cela était nécessaire pour soutenir les téléspectateurs audio et vidéo dans les navigateurs.
    * À FAIRE: Maintenant, pour améliorer la sécurité, si vous avez spécifié&lt;baseHttpsUrl&gt; dans setup.xml (et donc soutenirhttps) , le drapeau recommandé Url est unhttpsURL avec une clé de drapeau plus sécurisée. Si c'est le cas, tout drapeau précédentUrls/flagKeys deviendra invalide. Administrateurs : Si ces changements s'appliquent àERDDAP™et si votreERDDAP™aEDDGridDeErddap et EDDTable D'Erddap qui s'abonnent à distantERDDAPs, alors, après avoir mis à jourERDDAP, votreERDDAP™va automatiquement essayer de vous abonner avec le nouveau flagUrl, donc vous devez supprimer les anciens abonnements et valider les nouveaux abonnements lorsque vous obtenez les nouveaux emails de validation d'abonnement.
    * À faire: Si votreERDDAP™aEDDGridD'Erddap datasets pour erdVH3 datasets sur la côte de BobERDDAP™, veuillez les modifier pour se référer aux nouveaux ensembles de données erdVH2018.
    * À faire: Si vous incluez l'un des ensembles de données jplAquariusSSS dans votreERDDAP™, veuillez changer "V4"datasetID"V5".
    * À faire :actual\\_rangeest maintenant un attribut standard des FC (à partir de CF-1.7) et dit clairement que si la variable utiliseadd\\_offsetet/ouscale\\_factorpour emballer les valeurs de données, puis laactual\\_rangeles valeurs doivent utiliser le type de données déballées et être déballées. Malheureusement, cela va à l'encontre de nos précédents conseils. Générer des ensembles de données Xml déballe maintenant les paquetsactual\\_rangevaleurs, mais qui ne corrigera pas les ensembles de données existants dans votredatasets.xmlfichier.
        
Donc, veuillez vérifier vos ensembles de données: si les valeurs d'une variable sont emballées et siactual\\_rangeest spécifié comme valeurs de données emballées, veuillez ajouter un&lt;addAttributes&gt;actual\\_rangevaleur pour spécifier les valeurs déballées. Sinon, l'ensemble de données ne se chargera pas dansERDDAP. Une façon simple et presque parfaite de le faire est de rechercher votredatasets.xmlpour la source Attributs qui ont
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
et ascale\\_factorautres que 1,0. Ce sont lesactual\\_rangeattributs que vous pourriez devoir réparer.
        
Pour les variables d'axeEDDGridensembles de données,ERDDAP™définit toujours leactual\\_rangeattribut pour être la plage réelle des valeurs puisqu'il connaît ces valeurs.
        
Pour les variables d'axe avec des valeurs descendantes (Par exemple, certaines variables de latitude) ,ERDDAP™crééactual\\_rangeavec\\[0\\]...\\[dernier\\]les valeurs, qui étaient élevées... faible. Maintenant, il utilise toujours des valeurs faibles... élevées pour faire la nouvelle définition des FC.
        
La justesse de laactual\\_rangeles valeurs sont particulièrement importantes pour les ensembles de données EDDTable, carERDDAP™rejettera rapidement les demandes de valeurs de données moins élevées que lesactual\\_rangevaleur minimale ou supérieure àactual\\_rangeValeur maximale.
        
Related: le vrai\\_min, réel\\_max,data\\_minetdata\\_maxles attributs sont maintenant obsolètes. Veuillez convertir vos ensembles de données à utiliseractual\\_rangeà la place.
        
    * À faire (facultatif, mais recommandé) : Pour chaque ensemble de données en temps quasi réelERDDAP™, veuillez ajouter un [&lt;testOutOfDate&gt;] (/docs/serveur-admin/datasets#testoutofdate) tag avec une valeur dans le formulairenow-_nUnités, p.ex.,now-2 jours. Si la valeur de temps maximale pour l'ensemble de données est plus ancienne que cette valeur, l'ensemble de données est considéré comme périmé et sera marqué comme tel sur le[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)page web. Cela vous permet de voir facilement quand quelque chose ne va pas avec la source d'un jeu de données.
    *   [NOUVEAU : Marquage sémantique des données avec json-ld (JSON Données liées) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™utilise maintenant[Json-ld (JSON Données liées) ](https://json-ld.org)pour faire de votre catalogue de données et de vos ensembles de données une partie du[web sémantique](https://en.wikipedia.org/wiki/Semantic_Web), qui est l'idée de Tim Berners-Lee de rendre le contenu web plus lisible par machine et plus compréhensible par machine. Moteurs de recherche ([Google en particulier](https://developers.google.com/search/docs/data-types/datasets)) et d'autres outils sémantiques peuvent utiliser ce marquage structuré pour faciliter la découverte et l'indexation. Le balisage structuré json-ld apparaît comme invisible à l'humain&lt;script&gt; code sur le http://.../erddap/info/index.html page Web (qui est une toile sémantique[DataCatalog](https://schema.org/DataCatalog)) et sur chaque http://.../erddap/info/_datasetID_/index.html page Web (qui est une toile sémantique[Ensemble de données](https://schema.org/Dataset)) . (Merci tout particulièrement à Adam Leadbetter et Rob Fuller de l'Institut marin d'Irlande pour les efforts qu'ils ont déployés pourERDDAP.) 
    * NOUVEAU : Il existe de nouveaux types de jeux de données qui peuvent lire des données à partir de fichiers audio :
        [EDDGridDepuisAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), qui traite les données audio comme des données maillées.
        [EDDTableFromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), qui traite les données audio comme des données tabulaires. Merci à Jim Potemra, Rich Signell, OOI et Carrie Wall Bell pour les demandes de support de fichiers audio/hydrophone.
    * Modifications apportées aux ensembles de données génériques Xml (et les changements connexes) :
        * NOUVEAU :ERDDAP™maintenant a un système à automatiquement[mettre à jour les URLs obsolètes](/docs/server-admin/additional-information#out-of-date-urls)les deux dans GenerateDatasets Xml et lors du chargement des ensembles de données. Si vous avez des suggestions pour des URL supplémentaires qui devraient être prises et mises à jour, ou si vous pensez que cela devrait être transformé en un service (comme les convertisseurs) , s'il vous plaît emailerd.data at noaa.gov.
        * NOUVEAU: Maintenant, si Générer des ensembles de données Xml voit un CFstandard\\_name  (qui devraient être tous des minuscules) avec un caractère majuscule, il ajoute la version minuscule à&lt;addAttributes&gt;. Aussi, quand un ensemble de données se charge, siERDDAP™voit une CFstandard\\_nameavec un caractère majuscule, il le change silencieusement à lastandard\\_name. Merci à Rich Signell.
        * NOUVEAU: Maintenant, si Générer des ensembles de données Xml voit un attribut avec un temps qui n'est pas au format ISO 8601, il ajoute le temps formaté ISO 8601 à&lt;addAttributes&gt;. SiERDDAP™ne reconnaît pas le format, il laisse la valeur temporelle inchangée. Si vous voyez un format quiERDDAP™ne reconnaît pas et corrige, s'il vous plaît l'envoyer àerd.data at noaa.gov.
        * AMÉLIORÉ: Le code de bas niveau pour leEDDGridDe Threddes Option catalogue dans GenerateDatasets Xml compte maintenant sur leUnidatanetcdf-java catalogue code de rampe (Des batteurs. classes de catalogue) afin qu'il puisse gérer tous les catalogues THREDS (qui peut être étonnamment complexe) . Merci à Roland Schweitzer pour avoir suggéré ce changement et merci àUnidatapour le code.
        * NOUVEAU : Générer des ensembles de données Xml pourEDDGridDeDap ajoute maintenant «, startYear-EndYear» à la fin du titre en fonction des valeurs de l'axe temporel réel. End Year"présent" si les données existent au cours des 150 derniers jours.
        * NOUVEAU : Générer des ensembles de données Xml pourEDDGridDeDap ajoute maintenant ",\\[Résolution\\]°" au titre si l'ensemble de données est uniformément espacé et identique pour le lat et le lon.
        * IMPROVED: Le convertisseur de temps a maintenant des fonctionnalités supplémentaires, notamment la possibilité de convertir des temps de chaîne dans une grande variété de formats communs en chaînes ISO 8601 ou en un nombre compatible UDUnits. Toutes les fonctionnalités précédemment supportées continuent de fonctionner, inchangé.
        * BUG FIX: Générer des ensembles de données Xml et le convertisseur de Mots-clefs incluent maintenant "Science de la Terre &gt; " au début de GCMD Science Mots-clefs. Quand un ensemble de données est chargé dansERDDAP™,ERDDAP™corrige maintenant n'importe quel mot clé GCMD dans l'attribut mots clés qui ne commence pas avec "Earth Science &gt;" ou qui utilise autre chose que le cas de titre (où la première lettre de chaque mot est capitalisée) .
        * AMÉLIORATION: Lorsque vous suggérez&lt;destinationName&gt;'s, Générer des ensembles de données Xml pour EDDTableFromAsciiFiles vient d'utiliser l'extrémité arrière desourceNames avec'/'  (certains étaient comme un nom de fichier) . Maintenant il utilise la totalitésourceName(par exemple, « blablabla » (m/s). Ce changement sera bon pour certains ensembles de données et non pour d'autres, mais c'est un comportement plus sûr. Grâce à Maurice Libes.
        * BUG FIX: Générer des ensembles de données Xml et les constructeurs de données s'assurent qu'il n'y a plus de noms de colonnes dupliquées. Grâce à Maurice Libes.
        * BUG FIX: Générer des ensembles de données Xml pour EDDTableFromAsciiFiles n'a pas écrit&lt;colonneSeparator&gt; vers la sortie. Maintenant, oui. Grâce à Maurice Libes.
    * NOUVEAU: L'outil DasDds imprime maintenant des informations sur le décalage temporel (des[.timeGaps informations](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) si l'ensemble de données est un ensemble de données maillées.
    * NOUVEAU : La recherche avancée accepte maintenant les valeurs temporelles "now_\\-nUnits_". Merci à Rich Signell.
    * AMÉLIORER: Pour améliorer la sécurité, lorsqu'une adresse électronique dans les métadonnées ou les données d'un ensemble de données est écrite sur une page Web html, le "@" est remplacé par "à". Ceci n'attrape que les adresses e-mail qui sont toutes les métadonnées ou la valeur des données, et non les adresses e-mail intégrées dans des valeurs plus longues.
    * AMÉLIORÉ : Pour accroître la sécurité, laRSSles informations pour les ensembles de données privés sont désormais disponibles uniquement pour les utilisateurs (etRSSlecteurs) qui sont connectés et autorisés à utiliser cet ensemble de données.
    * NOUVEAU: Maintenant, quand un ensemble de données est chargé, sidate\\_created,date\\_issued,date\\_modified, ou date\\_metadata\\_attribut modifié a une valeur temporelle qui n'est pas au format ISO 8601,ERDDAP™le modifie en temps formaté ISO 8601. SiERDDAP™ne reconnaît pas le format, il laisse la valeur temporelle inchangée. Si vous voyez un format quiERDDAP™ne reconnaît pas et corrige, s'il vous plaît l'envoyer àerd.data at noaa.gov.
    * AMÉLIORER:EDDGridLes ensembles de données devraient maintenant être nettement plus rapides. Merci à Rich Signell.
    * Changements concernantERDDAPla création de documents ISO 19115:
        * BUG FIX: lors de la création de documents ISO 19115,dataVariableunités n'étaient pas HTML Attribut encodé et pourcentage encodé. Maintenant ils le sont. Grâce à la validation ISO 19115 de NGDC.
        * BUG FIX: lors de la création de documents ISO 19115,date\\_createda été utilisé tel quel, si souvent était le mauvais format. Maintenant il est converti en chaîne ISO 8601 Z. Grâce à la validation ISO 19115 de NGDC.
        * BUG FIX: lors de la création de documents ISO 19115,ERDDAP™maintenant plus de dates écrit avec année=0000 (comme pour les ensembles de données climatologiques) , parce que le schéma ISO 19115 n'autorise pas les dates avec année=0000. Grâce à la validation ISO 19115 de NGDC.
    * NOUVEAU: Comme avant une demande dehttp.../erddap/version retournera simplement le numéro de version (comme texte) , par exemple, "ERDDAP\\_version=1.82".
Maintenant, une demande pourhttp.../erddap/version\\_string retournera un nombre et un suffixe optionnel de '\\_' plus texte ASCII (pas d'espaces ni de caractères de contrôle) , par exemple, "ERDDAP\\_version\\_string=1.82\\_JohnsFork". Les personnes qui font la fourche le préciseront en changeant EDStatic.erddapVersion. Cette façon de le faire ne cause pas de problèmes pour les versions précédentes deERDDAP. Grâce à Axiom (notamment, Kyle Wilcox) et l'Institut maritime irlandais (notamment, Rob Fuller) .
    * C'est pas vrai. Pour wms version=1.3.0, request=GetMap, crs=EPSG:4326 (et non CRS:84) requêtes: l'ordre bbox doit être minLat, minLon, maxLat, maxLon. Pour les demandes CRS:84, comme précédemment, la commande bbox doit être minLon,minLat,maxLon,maxLat. Cela peut être corrigé en utilisantERDDAP'sWMS1.3.0 service enArcGIS  (grâce à Paola Arce) . Je vous remercie. (pas) àOGCpour rendre ça si compliqué. Grâce àLeafletpour m'avoir traité correctement et pour m'avoir donné un moyen de le tester.
    * AMÉLIORÉ: Précédent, le lien suggéré pourRSSet e-mail abonnements a lahttpURL pour votreERDDAP. Maintenant c'est lehttpsURL, si c'est actif.
    * NOUVEAU :EDDGridCopier prend maintenant en charge une balise optionnelle&lt;seulement depuis&gt;_une valeur_&lt;/uniquementDepuis&gt;, lorsque la valeur est un temps de format ISO-8601 spécifique ou unnow-nUnités (Par exemple,now-2 ans) Le temps. Voir[seulement Depuis la documentation](/docs/server-admin/datasets#onlysince). Grâce à Drew P.
    * AMÉLIORÉ: Si disponible,ERDDAP™montrera lahttpsURL (depuis&lt;baseHttpsUrl&gt;, si disponible)httpURL quand elle indique aux utilisateurs l'URL d'ajouter/valider/supprimer/lister un abonnement.
    * C'est pas vrai.ERDDAP™maintenant permet une action d'abonnement pour commencer par " https://" . (Bob gifle son front.) Merci à Jennifer Sevadjian.
    * C'est pas vrai..jsonlKVPmaintenant utilise ':' entre chaque clé et la valeur, au lieu de'='. (Bob gifle son front.) Merci à Alexander Barth.
    * C'est pas vrai. Auparavant, si vous avez redémarréERDDAP™avec QuickRestart=true, et si, avant que l'ensemble de données ne soit rechargé normalement, vous avez fait un appel à un ensemble de données EDDTableFromFiles qui utilisait la mise à jourEveryNMillis, et si un fichier de données venait d'être modifié, la requête échouerait avec une erreur de pointeur nul. Maintenant la demande va réussir. Grâce à John Kerfoot.
    * NOUVEAU : Quand un ensemble de données est chargéERDDAP™, les mots clés sont maintenant réorganisés dans l'ordre trié et tous les caractères newline sont supprimés.
    * Maintenant, si un .geoJson,.jsonou.ncoJson demande a.jsonparamètre p, le type de mime de réponse est application/javascript. Notez que.jsonp n'est pas supporté pour.jsonlCSVou.jsonlKVPComme ça ne marcherait pas. Grâce à Rob Fuller.
    * IMPROVED: Le type de mime pour les lignes de json fileType options est maintenant "application/x-jsonlines". C'était application/jsonl. Actuellement, il n'y a pas de choix correct définitif.
    * AMÉLIORER : Le nombre de requêtes défectueuses affichées sur la page status.html augmentera car plus de choses sont comptées comme des défaillances qu'auparavant, par exemple ClientAbortException.
    * AMÉLIORATION: Maintenant, si une réponse deERDDAP™n'est pas compressé, alors l'en-tête de la réponse comprendra "Contenu-Encodage" "identity".
    * AMÉLIORÉ : L'attribut « licence » n'était pas nécessaire. Maintenant, s'il n'est pas spécifié, le standardLicense de messages.xml (ou de setup.xml si présent) est utilisé par défaut.
    * NOUVEAU: Il y a maintenant une option[attribut fichierAccessSuffix](/docs/server-admin/datasets#fileaccessbaseurl). qui peuvent être utilisés avec les[attribut fichierAccessBaseUrl](/docs/server-admin/datasets#fileaccessbaseurl).
    * IMPROVED: Pour augmenter la sécurité, cette version a été compilée avec la dernièreJavaJDK v8u162.
    * NOUVEAU: Pour augmenter la sécurité, plusieurs domaines communs qui offrent des adresses e-mail temporaires (Par exemple, @mailinator.com) sont maintenant sur une liste noire d'email permanente pour le système d'abonnements.
    * NOUVEAU : Pour accroître la sécurité, les chiffres figurant dans le rapport quotidien comprennent maintenant :
SetDataset L'adresse IP du drapeau a échoué (depuis le dernier rapport quotidien)   
SetDataset L'adresse IP du drapeau a échoué (depuis le démarrage)   
SetDataset Drapeau Adresse IP Succédé (depuis le dernier rapport quotidien)   
SetDataset Drapeau Adresse IP Succédé (depuis le démarrage)   
Les chiffres "Échec" vous ont permis de voir qui (Un hacker ?) essaie de mettre un drapeau, mais échoue.
    * AMÉLIORER: Pour augmenter la sécurité, les adresses e-mail dans le&lt;abonnementEmailBlacklist&gt; dans votredatasets.xmlsont maintenant considérés comme insensibles aux cas.
         

## Version 1.80{#version-180} 
 (publié le 2017-08-04) 

*    **Nouvelles fonctionnalités (pour les utilisateurs) :**   
     
    * NOUVEAUorderByCount () filtre vous permet de spécifier comment le tableau de résultats sera trié (ou pas) et renvoie seulement une ligne pour chaque groupe de tri, avec le nombre de valeurs non manquantes pour chaque variable.
Par exemple,orderByCount ("stationID") triera parstationIDet retourner une ligne pour chaquestationID, avec le nombre de valeurs non manquantes pour chaque variable.
Si vous venez de spécifierorderByCount ("") , la réponse ne sera qu'une ligne avec le nombre de valeurs non manquantes pour chaque variable de données.
Voir[orderBy... documentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)Grâce à Ben Adams.
    * NOUVEAU.nco Dossier Json Option de type pour les ensembles de données maillés et tabulaires. Cette option fait uneNCOlvl=2 fichier JSON "pédantique" avec toutes les informations normalement trouvées dans un.ncfichier. Voir[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)Grâce à Charlie Zender.
    * C'est pas vrai. LesorderBy... () Les options sur la page Web Make A Graph sont désormais traitées correctement.
    * BUG FIX : la sortie .geoJson n'affiche plus de lignes où les valeurs lat ou lon sont manquantes. Aussi, valeurs d'altitude (si disponible) sont maintenant inclus dans les coordonnées, pas comme valeurs de données. Grâce à Jonathan Wilkins.
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :**   
     
    * QUESTION DE SÉCURITÉ: La bibliothèque protocols.js utilisée pourOpenLayersdémo sur leWMSpages dansERDDAP™est obsolète et a un bug qui pourrait lui permettre d'être mal utilisé. (Malheureusement, mise à jourOpenLayerset protocoles. Je ne suis pas facile.) Cela ouvre la possibilité que la bibliothèque puisse être mise en place pour permettre une vulnérabilité croisée. Toutefois, depuisERDDAP™Utilisations seulementOpenLayersd'une manière préréglée spécifique et uniquement avecERDDAP- sources de données basées, nous pensons qu'il n'y a pas de vulnérabilité inter-site dansERDDAPutilisation deOpenLayerset protocols.js. Cependant, si vous n'y croyez pas, vous pouvez maintenant désactiver l'utilisation de laOpenLayersdémo sur leWMSpages de votreERDDAP™en ajoutant
```
        <openLayersActive>false</openLayersActive>  
```
dans votre fichier setup.xml. La valeur par défaut est "true". Merci à Charles Carleton et au RCEI.
    * CHANGEMENTS DE SÉCURITÉ : Fichiers .jar non utilisés et fichiers .jar dupliqués (parce qu'ils sont aussi dans netcdfAll.jar) ont été retirées de laERDDAP™la distribution. Les fichiers .jar ont été mis à jour. Merci à Charles Carleton et au RCEI.
    * CHANGEMENTS DE SÉCURITÉ : Le fichier netcdfAll.jar distribué avecERDDAP™est la dernière version (Actuellement 4.6.10) , mais il contient toujours des fichiers internes jackson .jar qui sont connus pour être périmés et ont des vulnérabilités de sécurité, notamment les bibliothèques Jackson qui ne sont utilisés que lors de l'accès aux sources de données Amazon S3. Si vous n'avez pas accès aux données via Amazon S3 (vous sauriez si vous étiez) , ces vulnérabilités ne sont pas pertinentes.
        
Les développeurs de netcdf-java maintiennent que ces vulnérabilités ne sont pas pertinentes en raison de la façon dont le code netcdf utilise ces bibliothèques et en tout cas ne serait pertinente que lorsque vous accédez à Amazon S3. Voir[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866). Je les crois. Si vous avez encore des inquiétudes à ce sujet, veuillez contacter les développeurs de netcdf-java. (Notez que si vous ne croyez pas les développeurs netcdf-java et que vous envisagez de ne pas utiliserERDDAP™à cause de cela, vous ne devriez pas utiliser THREDDS non plus, parce que THREDDS utilise netcdf-java plus fondamentalement et plus largement queERDDAP.) 
        
Détails: Le code gênant et les avertissements de vulnérabilité sont:
cdfAll-laster.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
Voir https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Élevé
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
Voir https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Élevé
netcdfAll-laster.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml
Voir https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Élevé
Voir https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Critique
netcdfAll-laster.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Voir https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Élevé
Voir https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Critique
"Pour la version 4.6.10, aws-java-sdk-core tire dans la version 2.6.6 des artefacts Jackson-\\*." (email des gens de netcdf-java) .
Merci à Charles Carleton et au RCEI.
        
    * CHANGEMENTS DE COMPILATEUR: Si vous recompilezERDDAP™, notez que le paramètre -cp classpath nécessaire pour la ligne de commande est maintenant beaucoup plus court qu'auparavant. Voir le nouveau paramètre -cp dans[cette documentation](/docs/contributing/programmer-guide#development-environment). Merci à Charles Carleton et au RCEI.
    * NOUVELLE OPTION dans les ensembles de données Xml: EDDTableFromBcodmo, qui est juste pour une utilisation interne au BCO-DMO.
Merci à Adam Shepherd et BCODMO.
    * NOUVELLE ATTRIBUTE ET CARACTÉRISTIQUES : Si une colonne EDDTable a des noms de fichiers Web accessibles (Par exemple, images, vidéos ou fichiers audio) , vous pouvez ajouter
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
pour spécifier l'URL de base (se terminant par /) nécessaire pour transformer les noms de fichiers en URLs complètes. Alors pour.htmlTableréponses,ERDDAP™affichera le nom de fichier comme un lien vers l'URL combinée (la base Url plus le nom du fichier) .
Si tu veuxERDDAP™pour servir les fichiers associés, faire un ensemble de données EDDTableFromFileNames séparé pour ces fichiers (il peut s'agir d'un ensemble de données privé) .
Merci à Adam Shepherd et BCODMO.
    * NOUVELLE RECOMMANDATION ATTRIBUTE: Si une colonne EDDTable a des noms de fichiers Web accessibles (Par exemple, images, vidéos ou fichiers audio) qui sont accessibles via une archive (Par exemple,.zipfichier) accessible via une URL, utiliser
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
pour spécifier l'URL de l'archive.
Si tu veuxERDDAP™pour servir le fichier d'archive, faire un ensemble de données EDDTableFromFileNames séparé pour ce fichier (il peut s'agir d'un ensemble de données privé) .
Merci à Adam Shepherd et BCODMO.
    * AMÉLIORATION DE LA Génération des ensembles de données Xml pour supprimer les causes d'invalid/mauvais&lt;subsetVariables&gt; suggestions et duplicata/mauvais noms de variables suggérés, etc. Merci à Rich Signell, Adam Shepherd et BCO-DMO.
    * NOUVELLE OPTION: L'information sur les frontières politiquesERDDAPest d'un tiers et un peu dépassé. En outre, il y a des frontières contestées à plusieurs endroits dans le monde, où différentes personnes auront des idées différentes sur ce qui est correct. Nous n'avons pas de réclamation sur la correspondance des données biologiques politiques avec lesquelles nous nous trouvonsERDDAP. Si vous n'aimez pas les informations sur les frontières politiques qui viennent avecERDDAP™, vous pouvez maintenant direERDDAP™de ne jamais tracer de frontières politiques en ajoutant
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
dans votre fichier setup.xml. La valeur par défaut est "true". Grâce à Raju Devender.
    * NOUVEAU TAG METADATA: Dansdatasets.xmlpour un jeu de données, vous pouvez maintenant spécifier le nombre par défaut de couleur Sections à barres pour unedataVariablesur les graphiques et cartes avec
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (par défaut=-1, qui dit de laisserERDDAP™décider) . Voir[couleur Paramètres de la barre](/docs/server-admin/datasets#color-bar-attributes).
    * AMÉLIORATION : la couleur limite de l'état sur les cartes était violet (Deep Purple pour toi Baby Boomers) . Maintenant il est gris (entre la frontière nationale gris et la terre gris) .
    * C'est pas vrai.&lt;iso19115File&gt; et&lt;fgdcFile&gt; dansdatasets.xmln'ont pas toujours été manipulés correctement. Maintenant ils le sont. Grâce à BCO-DMO.

## Version 1.78{#version-178} 
 (publié 2017-05-27) 

*    **Nouvelles fonctionnalités (pour les utilisateurs) :**   
     
    *    (aucune)   
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :**   
     
    * AMÉLIORATION: L'ordre des lignes dans "Major LoadDatasets Time Series" sur la page status.html est maintenant plus récent en haut à plus ancien en bas.
    * C'est pas vrai.ERDDAP™maintenant écrit.nccsvfichiers avec la variable de tempsactual\\_rangecomme une chaîne ISO-8601. Cela corrige le bug avec EDDTableFromErddap analyse les informations à partir d'un jeu de données distant et du fichier QuickRestart pour tous les ensembles de données EDDTableFrom...Files. (L'heureactual\\_rangesera incorrecte la première fois que l'ensemble de données se charge dans v1.78 mais correct après qu'il est rechargé, par exemple, si vous affichez l'ensemble de données.) 

## Version 1.76{#version-176} 
 (publié le 2017-05-12) 

*    **Nouvelles fonctionnalités (pour les utilisateurs) :**   
     
    * Changement dans Tomcat : Pour les demandes deERDDAP™provenant de logiciels autres que les navigateurs Web (Par exemple,curl, R,Matlab,Python,Java) :
Comme pour les modifications précédentes dans les versions de Tomcat (le logiciel de niveau inférieur qui fonctionneERDDAP) depuis début 2016, de plus en plus de caractères dans la partie requête de l'URL de la requête doivent être[ **Pourcentage encodé** ](/docs/server-admin/datasets#infourl)pour des raisons de sécurité. Les navigateurs prennent soin de pourcentage d'encodage pour vous. donc utiliserERDDAP™dans un navigateur n'est pas affecté à moins que la requête soit redirigée vers un autreERDDAP.
    * Précédemment,ERDDAP™traités **variables char** plus comme des nombres entiers courts non signés que des caractères. Maintenant, il les traite plus comme un-caractère-long UCS-2 (Unicode) Des cordes. Voir[la documentation](/docs/server-admin/datasets#char). Merci à Aurelie Briand et au projet Argo.
    * Précédemment,ERDDAP™a offert peu de soutien pour **caractères Unicode** au-dessus du caractère #255 dans Strings. Maintenant, en interne,ERDDAP™supporte entièrement les caractères UCS-2 à 2 octets (caractères numérotés 0 à 65535) dans Strings. Lorsque String données est écrit à différents types de fichiers,ERDDAP™fait de son mieux pour soutenir les chars à 2 octets. Un autre exemple est .csv fichiers quiERDDAP™écrit avec le charset ISO-8859-1 (un charset de 1 octet) DoncERDDAP™écrit tous les caractères au-dessus du caractère #255 avec la syntaxe \\u_hhh_ de type JSON. Voir[Données de chaîne](/docs/server-admin/datasets#string).
    * AMÉLIORATION:.ncfichiers écrits parERDDAP™, les variables char à interpréter comme Strings auront l'attribut
         **\\_Encoding=ISO-8859-1**   
En.ncfichiers lus parERDDAP™, les variables char avec "\\_Encoding" seront interprétées comme des cordes avec le charset spécifié.
    * RAPPEL:ERDDAP™soutien **Codage de type JSON** de caractères spéciaux lorsque vous spécifiez les contraintes des variables char et String. Ainsi vous pouvez demander quelque chose comme &myString=\\u20ac" quand vous voulez des lignes de données où myString=€ depuis 20ac est la version hexadécimal du point de code pour le symbole Euro. Plusieurs sources sur le Web montrent les numéros de points de code pour les symboles Unicode, par exemple,[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode).
    * Précédemment,ERDDAP™offre un soutien limité pour **long entier** variables. Tout de suiteERDDAP™prend pleinement en charge les longs en interne et fait de son mieux en écrivant des données longues à différents types de fichiers. . Voir[longue documentation](/docs/server-admin/datasets#long). Grâce au Marine Institute irlandais, Craig Risien, Rich Signell, Christopher Willard et OOI.
    * NOUVEAU: type de fichier de sortie pour griddap ettabledap: **.nccsv** , qui fait uneNetCDF-comme, ASCII, fichier CSV qui contient également toutes les métadonnées qui seraient dans un.ncfichier. Voir[NCCSV Spécification](/docs/user/nccsv-1.00). Grâce à Steve Hankin.
    * NOUVEAU : **orderByClosestfiltre** vous permet de spécifier comment le tableau des résultats sera trié et un intervalle (Par exemple, 2 heures) . Dans chaque groupe de tri, seules les lignes les plus proches de l'intervalle seront conservées. Par exemple,orderByClosest ("stationID, heure, 2 heures") triera parstationIDet le temps, mais ne retourner que les lignes pour chaquestationIDoù le dernierorderBycolonne (heure) est le plus proche des intervalles de 2 heures. C'est la chose la plus proche entabledappour franchir les valeurs dans une requête griddap. Cette option peut être spécifiée via n'importe quelletabledappage web .html de dataset, page web .graph, et par n'importe quelle URL que vous générez vous-même. Merci à l'Institut maritime d'Irlande et à Ocean Networks Canada.
    * NOUVEAU : **orderByLimitfiltre** vous permet de spécifier comment le tableau des résultats sera trié et un nombre limite (Par exemple, 100) . Au sein de chaque groupe de tri, seules les premières lignes 'limites' seront conservées. Par exemple,orderByMax ("stationID100") triera parstationID, mais seulement retourner les 100 premières lignes pour chaquestationID. Ceci est similaire à la clause LIMIT de SQL. Cette option peut être spécifiée via n'importe quelletabledappage web .html de dataset, page web .graph, et par n'importe quelle URL que vous générez vous-même. Merci à l'Institut maritime d'Irlande et à Ocean Networks Canada.
    * NOUVEAU : Deux nouveaux types de fichiers de réponse, **.jsonlCSVet.jsonlKVP** sont disponibles pour les demandes aux ensembles de données maillés, les ensembles de données tabulaires et de nombreux autres endroits dansERDDAP  (Par exemple, demandes d'informations sur les ensembles de données) . Les fichiers sont des fichiers JSON Lines ([ https://jsonlines.org/ ](https://jsonlines.org/)) où chaque ligne a un objet JSON séparé..jsonlCSVa juste les valeurs dans un format CSV..jsonlKVPa la clé: Les paires de valeurs. Chaque ligne est autonome. Les lignes ne sont pas enfermées dans un tableau ou un objet JSON plus grand. Pour un exemple, voir[cette demande d'échantillon](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z). Grâce à Damian Smyth, Rob Fuller, Adam Leadbetter et l'Institut irlandais de la marine.
    * NOUVEAU: Il y a une nouvelle documentation décrivant[ **Comment accéder aux ensembles de données privés dansERDDAP™par Scripts** ](/docs/user/AccessToPrivateDatasets). Merci à Lynn DeWitt.
    * AMÉLIORATION: L'étendue minimale de la **OpenLayers** carte était de 2 degrés et est maintenant 4 pixels de données. Grâce à Rusty Holleman.
    * AMÉLIORER: Dans certains cas courants, les demandes qui comprennent **expression régulière** la contrainte sera traitée beaucoup plus rapidement.
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :**   
     
    *    **C'est le premier début.** La première fois que vous démarrez cette nouvelle version, il faudra beaucoup de temps pourERDDAP™pour charger tous les ensembles de données parce qu'il doit relire tous les fichiers source (bien que juste l'en-tête des fichiers de données maillés) . Si vous regardez les journaux, vous pouvez voir des messages d'erreur disant "old/unsupprimedVersion" de certains fichiers internes -- c'est bon --ERDDAP™fera les nouvelles versions des fichiers internes. Soyez patient.
    * ACTION:ERDDAP™maintenant utilise le nouveau **Java. L'heure** classes (également connu sous le nom de JSR 310) au lieu de Joda d'analyser les temps de chaîne dans les temps numériques. Remarques:
        * SiERDDAP™soudainement a des problèmes d'analyse des temps de chaîne pour un ensemble de données donné et se convertit ainsi la plupart ou toutes les fois en NaN (valeurs manquantes) , le problème est presque toujours avec la date Chaîne de format de temps que vous avez spécifiée comme les "unités" de la variable. Le nouveau système a parfois besoin d'une chaîne de format dateTime légèrement différente.
        * Si des mois et des jours numériques dans la dateTime strings ne sont pas rembourrés 0 (Par exemple, "3/7/2016") , assurez-vous que le format a juste un seul M et d (Par exemple, "M/j/aaaa", pas "MM/jj/aaaaa") .
        * Modifier n'importe quelle spécification de secondes fractionnelles qui utilise des s minuscules (Par exemple, lesyyyy-MM-ddC'est pas vrai.) , en capital S'est, (Par exemple,yyyy-MM-dd'T'HH:mm:ss.SSS) .
        *   ERDDAP™ne supporte plus la date de la chaîne Formats de temps à deux chiffres (Oui) avec un siècle implicite (Par exemple, 1900 ou 2000) . Les entreprises ont dépensé des milliards de dollars pour résoudre ce problème à la fin des années 1990. Les scientifiques ne devraient pas utiliser deux années à chiffres. Veuillez corriger le fichier source (s) en convertissant en années à 4 chiffres, puis en utilisant aaayy dans la date Format horaire.
        * Vous pouvez utiliser yyyy ou YYYY (quiERDDAP™convertit en uuuu) à analyser les années à 4 chiffres, y compris les années négatives, p.ex. -4712 (qui est 4713 BC) . Grâce à SeaDataNet, Thomas Gardner et BODC.
        * Veuillez continuer à utiliser Z dans un format dateTime pour obtenirERDDAPpour analyser un décalage horaire (Par exemple, Z, +0200, -08, -0800, -08:30) .
        *    **Assurez-vous d'utiliserJavala version 1.8.** 
        * Programmeurs -- Si vous écrivezJavaprogrammes qui fonctionnentERDDAP™code, vous devez supprimer la référence à joda-time. jar dans le paramètre chemin de classe.
    * NOUVEAU :ERDDAP's[ArchiveA Outil Dataset](/docs/server-admin/additional-information#archiveadataset)peut maintenant créer[ **Dossiers BagIt** ](https://en.wikipedia.org/wiki/BagIt). Les RCEI peuvent normaliser ce format. Merci à Scott Cross et John Relph.
    * AMÉLIORER: Les liens pour télécharger l'erddap. la guerre contreERDDAP™pages Web pointent maintenant vers **GitHub** . (Ce sont des liens publics, donc vous n'avez pas à rejoindre GitHub.) Cela signifie des téléchargements beaucoup plus rapides (jusqu'à 12Mb/s versus 1Mb/s) et quelques problèmes avec les téléchargements. Grâce à Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney et l'Institut maritime irlandais.
    * AMÉLIORÉ: **page status.html et le rapport d'état quotidien** maintenant inclure une section "Major LoadDatasets Time Series" qui montre les statistiques surERDDAP™à la fin de chaque charge majeureDonnées pour les 100 dernières charge majeureDonnées. Grâce à notre RAID.
    * NOUVEAU : une nouvelle option (mais recommandé) paramètre pour les ensembles de données EDDTableFromCassandra: [ ** &lt;partitionKeyCSV&gt; ** - Oui. (/docs/serveur-admin/datasets#partitionkeycsv) . Merci à Ocean Networks Canada.
    * NOUVEAU: EDDTableFromAsciiFiles supporte maintenant ** &lt;colonneSeparateur&gt; ** paramètre. Si null ou "", la classe devinera, comme avant, sinon, le premier caractère sera utilisé comme séparateur de colonne lors de la lecture des fichiers. Grâce à Sky Bristol et Abigail Benson.
    * Nouveau: le nouveau type de données,[ **EDDTableFromNccsvFiles** ](/docs/server-admin/datasets#eddtablefromnccsvfiles), peut faire un ensemble de données en agrégeant[Fichiers NCCSV .csv](/docs/user/nccsv-1.00). Grâce à Steve Hankin.
    * AMÉLIORATION: **EDDTableDeErddap** utilise maintenant.nccsvpour obtenir des informations à distanceERDDAPs et pour les archives locales de ces métadonnées. Cela permet une prise en charge complète du char et des types de données longs, et pour Unicode (UCS-2) charset pour chars et cordes. Merci à Rob Fuller et au Marine Institute irlandais.
    * AMÉLIORÉ: EDDTableFromErddap etEDDGridDeErddap soutient maintenant ** &lt;redirection&gt;faux&lt;/redirect&gt; ** qui ditERDDAP™ne jamais rediriger la demande vers la télécommandeERDDAP. La valeur par défaut est vraie. Ceci est utile lorsque la télécommandeERDDAP™est un privéERDDAP. Grâce à Damian Smyth, Rob Fuller et l'Institut maritime irlandais.
    * AMÉLIORATION:ERDDAP™maintenant captures **demandes d'utilisation annulées** plus tôt. EtERDDAP™maintenant s'arrête plus vite parce que les fils de bas niveau s'arrêtent plus vite. Grâce à notre RAID.
    *    **Générer des ensembles de données Xml:** 
        * NOUVEAU: La nouvelle spéciale EDDType "ncdump" imprime un[ncdump](https://linux.die.net/man/1/ncdump)\\-comme impression de l'en-tête d'un.ncfichier. Vous pouvez également imprimer les valeurs de données pour les variables spécifiées (ou entrez "rien" pour ne pas imprimer de valeurs de données) . Ceci est utile car, sans ncdump, il est difficile de savoir ce qui est dans un fichier et donc quel EDDType vous devez spécifier pour GenerateDatasetsXml. Grâce à Craig Risien, Rich Signell, Christopher Willard et OOI.
        * NOUVEAU : pour SeaData Données nettes:
Le cas échéant, générer des ensembles de données Xml effectue maintenant une conversion sémantique spécifique en utilisant une requête SPARQL distante : si les métadonnées source d'une variable comprennent un sdn\\_parameter\\_urn, par exemple, sdn\\_parameter\\_urn = "SDN:P01::PSLTZZ01", Générer des ensembles de données Xml ajoutera l'attribut P02 correspondant, par exemple sdn\\_P02\\_urn = "SDN:P02::PSAL". Si vous avez des ensembles de données qui utilisent ces attributs, et si votreERDDAP's&lt;categoryAttributes&gt; dans setup.xml comprend sdn\\_parameter\\_urn et sdn\\_P02\\_urn, les utilisateurs pourront utiliserERDDAP™Système de recherche par catégorie pour rechercher des ensembles de données avec des valeurs spécifiques de ces attributs. Merci à BODC et Alexandra Kokkinaki.
        * AMÉLIORATION: Générer des ensembles de données Xml change maintenant beaucouphttp://références dans les métadonnéeshttps://le cas échéant.
        * AMÉLIORATION: Générer des ensembles de données Xml essaie maintenant de deviner créateur\\_type et éditeur\\_type.
        * IMPROVED: Les types de données de la variable suggérés par Générer des ensembles de données Xml va maintenant être un peu mieux. Grâce à Margaret O'Brien, LTER et EML.
        * AMÉLIORATION: Générer des ensembles de données Xml est mieux à spécifier le&lt;cdm\\_data\\_type&gt; et ajouter les attributs nécessaires (p. ex.,&lt;cdm\\_timeseries\\_variables&gt;), vous pouvez donc fournir ces informations. Merci à Rich Signell.
        * AMÉLIORATION: dans les ensembles de données génériques Xml, pour les ensembles de données EDDTable, la suggestion de&lt;subsetVariables&gt; est maintenant beaucoup plus conservateur. Grâce à John Kerfoot.
        * AMÉLIORATION: Sidatasets.xmlpour un ensemble de données spécifiéfeatureTypemais pas cdm\\_data\\_type,featureTypesera utilisé comme cdm\\_data\\_type. Merci à Rich Signell.
        * BUG FIX: générer Données Xml suggère maintenant le correct&lt;dataType&gt; pour les variables de donnéesscale\\_factor,add\\_offsetet/ou des attributs \\_Non signé.
    * AMÉLIORATION: QuandERDDAP™ouvre une.ncfichier qui est **plus court** qu'il est censé être (Par exemple, il n'a pas été complètement copié en place.) ,ERDDAP™maintenant traite le dossier comme mauvais. Précédemment,ERDDAP™retourne les valeurs manquantes pour toute partie manquante du fichier car c'est le comportement par défaut de netcdf-java.ERDDAP™maintenant utilise ucar.nc2.iosp.netcdf3.N3header.disallowFileTruncation = true; Grâce à notre RAID et Christian Ward-Garrison.
    * AMÉLIORÉ: l'auteur de la norme ISO 19115 utilise désormais **_Type de créateur** , si présent.
    * AMÉLIORATION:ERDDAP™utilise maintenant le dernier netcdf-java v4.6.9 qui peut lire des types supplémentaires de **fichiers netcdf-4** . Grâce à Craig Risien, Rich Signell, Christopher Willard et OOI.
    * BUG FIX: évitez les problèmes si différents fichiers sources ont différents types de données pour une variable donnée. Merci à Roy Mendelssohn et Eugène Burger.
    * C'est pas vrai. **Conversions de format temporel** sont maintenant mieux protégés contre les valeurs du mauvais temps. Grâce à NDBC.
    * C'est pas vrai.EDDGridDeNcFiles Déballé gère maintenant les valeurs de temps avec **"mois depuis..." et "années depuis..."** correctement (en incrémentant le mois ou l'année, non en ajoutant grossièrement, par exemple, 30jours à plusieurs reprises) . Grâce à Soda3.3.1.
    * Juste en v1.74, **abonnements** nécessitant une action (Par exemple,http://...) , qui était et devrait être facultatif.
    * C'est pas vrai.EDDGridDeMergeIRFiles.lowGetSourceMétadonnées () n'a pas ajouté d'attributs globaux. Maintenant, oui.
         

## Version 1.74{#version-174} 
 (publié le 2016-10-07) 

*    **Nouvelles fonctionnalités (pour les utilisateurs) :**   
     
    * Maintenant, quand une liste de données (Tous, ou d'une recherche) est affiché sur une page Web, de longs titres sont affichés sur plusieurs lignes. Auparavant, le milieu d ' un long titre était remplacé par &lt; &lt; ... &gt; &gt; . Grâce à Margaret O'Brien, LTER et EML.
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :**   
     
    * À faire: Sur les ordinateurs Linux, modifiez les paramètres de timeout d'Apache de sorte que les requêtes d'utilisateurs longues ne soient pas chronométrées (avec ce qui apparaît souvent comme une erreur "Proxy" ou "Bad Gateway") . En tant qu'utilisateur racine :
        
        1. Modifier l'Apachehttpfichier d.conf (généralement dans /etc/httpd/conf/) :
Modifier l'actuel&lt;Réglage du délai&gt; (ou en ajouter un à la fin du fichier) à 3600 (secondes) , au lieu des 60 ou 120 secondes par défaut.
Modifier l'actuel&lt;Délai de prescription réglage (ou en ajouter un à la fin du fichier) à 3600 (secondes) , au lieu des 60 ou 120 secondes par défaut.
        2. Redémarrer Apache: /usr/sbin/apachectl -K gracieux (mais parfois il est dans un répertoire différent) .
        
Grâce à Thomas Oliver.
         
    * NOUVEAU :\\[BigParentDirectory/hard Répertoire des drapeaux
Cela fonctionne comme le répertoire du drapeau, mais la version hardFlag supprime également toutes les informations du jeu de données en cache. Il n'y a pas d'URL pour définir un hardFlag. Cela ne peut être utilisé qu'en plaçant un fichier dans ce répertoire.
dur Les drapeaux sont très utiles lorsque vous faites quelque chose qui provoque un changement dans la façon dontERDDAP™lit et interprète les données source, par exemple, lorsque vous installez une nouvelle version deERDDAP™ou lorsque vous avez apporté certains types de modifications à la définition d'un ensemble de donnéesdatasets.xml. Voir[cette documentation](/docs/server-admin/additional-information#hard-flag). Merci à John Kerfoot et à tous les groupes Argo.
         
    * NOUVEAU : Générer des ensembles de données Xml possède désormais une option EDDTableFromEML
qui lit une description d'ensemble de données dans un langage de métadonnées écologiques (EML) fichier, télécharge le fichier de données connexe, et génère un morceau dedatasets.xmlafin que l'ensemble de données puisse être ajouté àERDDAP. Il y a aussi un EDDTableFromEMLBatch qui fait la même chose pour tous les fichiers EML dans un répertoire. Cela fonctionne très bien parce que EML fait un excellent travail de description de l'ensemble de données et parce que KNB et LTER rendent les fichiers de données disponibles.
EML plusERDDAP™pourrait être une grande combinaison, puisqueERDDAP™pourrait donner aux utilisateurs un accès plus direct à la richesse des données KNB et LTER et aider ces projets à répondre aux besoins du gouvernement américain[Accès du public aux résultats de la recherche (PARR) exigences](https://nosc.noaa.gov/EDMC/PD.DSP.php)en rendant les données disponibles via un service web.
Voir[cette documentation](/docs/server-admin/EDDTableFromEML). Grâce à Margaret O'Brien, LTER et EML.
         
    * NOUVEAU : Générer des ensembles de données Xml possède désormais une option EDDTableFromInPort
qui lit une description d'ensemble de données dans un fichier InPort XML et tente de générer un morceau dedatasets.xmlafin que l'ensemble de données puisse être ajouté àERDDAP. Cela crée rarement un morceau prêt à utiliser de XML pourdatasets.xml, mais il créera une bonne ébauche brute qui est un bon point de départ pour l'édition par un humain.
Ce serait super si les personnes utilisant InPort pour documenter leurs ensembles de données utiliseraient aussiERDDAP™pour rendre les données réelles disponibles viaERDDAP's services web et ainsi répondre auxNOAA's[Accès du public aux résultats de la recherche (PARR) exigences](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)en rendant les données disponibles via un service web. C'est une solution qui pourrait être utilisée en ce moment. (erd.data at noaa.govest heureux d'aider.)   
Voir[cette documentation](/docs/server-admin/datasets#eddtablefrominport). Merci à Evan Howell et Melanie Abecassis.
         
    * AMÉLIORATION:ERDDAP™utilise maintenant netcdf-java 4.6.6.
Avec les versions précédentes, netcdf-java a lu quelques valeurs de remplissage (peut-être, juste dans les fichiers netcdf-4) comme 0. Maintenant il lit certains d'entre eux comme la valeur de remplissage standard netcdf: -127 pour octets, -32767 pour shorts, -2147483647 pour ints.Unidatadit que le nouveau comportement est le bon comportement. Si une variable d'un ensemble de données commence à afficher l'une de ces valeurs où elle montrait 0's, vous pouvez ajouter, par exemple,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
à la variableaddAttributesà direERDDAP™pour traiter cette valeur commemissing\\_value/\\_Remplir Valeur. Cependant, dans de nombreux cas, cela ne donnera pas le résultat souhaité : 0's. Si oui, envisager de modifier les fichiers avecNCOou réécrire les fichiers. Des plaintes ? Veuillez contacterUnidata;-)
         
    * À DO: Nouvelle TopographiePalette deepth
Je vous encourage à changer tous les ensembles de données qui utilisent la palette OceanDepth pour utiliser la nouvelle palette TopographyDepth, qui est comme Topography sauf avec les couleurs retournées, de sorte qu'il soit adapté pour les valeurs de profondeur (positif = inférieur) , au lieu de valeurs d'altitude (positif=en haut) . Les paramètres recommandés pour cette palette sont :
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * NOUVELLES CARACTÉRISTIQUES: Chaînemissing\\_valueet/ou \\_FillValue
Si une variable String définit unemissing\\_valueet/ou \\_FillValue,ERDDAP™va maintenant supprimer ces valeurs des données et les remplacer par une chaîne vide, de sorte que les valeurs manquantes apparaissent comme des chaînes vides, comme avec d'autres ensembles de données dansERDDAP. Grâce à Margaret O'Brien, LTER et EML.
         
    * NOUVELLES CARACTÉRISTIQUES: Soutien aux horaires locaux
timestamp variables avec les données sources de Strings peut maintenant spécifier un fuseau horaire via un "time\\_zone" attribut qui conduitERDDAP™pour convertir les heures de source de la zone locale (certains dans l'heure standard, certains dans l'heure avancée) dansZulutemps. La liste des noms de fuseaux horaires valides est probablement identique à la liste dans la colonne TZ[ce tableau](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). La valeur par défaut est "Zulu". Les fuseaux horaires communs aux États-Unis sont les suivants : États-Unis/Hawaii, États-Unis/Alaska, États-Unis/Pacifique, États-Unis/Montagne, États-Unis/ARIZONA, États-Unis/Centre, États-Unis/Est. Pour les variables timestamp avec des données source numériques, vous pouvez spécifier le "time\\_zone" attribut, mais la valeur doit être "Zulu"ou "UTC". Grâce à Margaret O'Brien, LTER et EML.
         
    * NOUVELLES CARACTÉRISTIQUES: EDDTableFromAsciiFiles prend en charge les fichiers séparés par un point-virgule
et est plus intelligent de trouver le séparateur. Grâce à Margaret O'Brien, LTER et EML.
         
    * NOUVELLES CARACTÉRISTIQUES: S'il y a une erreur importante dans loadDatasets (majeur ou mineur, p.ex. un manquant ou invalidedatasets.xmldocument) ,ERDDAP™va maintenant l'indiquer dans status.html, juste en dessous de "n Datasets Failed To Load" comme ERROR: lors du traitementdatasets.xml: voir log.txt pour plus de détails.
         
    * NOUVELLES CARACTÉRISTIQUES:ERDDAP™cherche des orphelins.
QuandERDDAP™effectue une charge importante Datasets, il cherche maintenant des ensembles de données orphelins (ensembles de donnéesERDDAP™mais pas dansdatasets.xml) . S'ils sont trouvés, ils sont listés dans status.html, juste en dessous de "n Datasets Failed To Load" comme ERROR: n Orphan Datasets (ensembles de données enERDDAP™mais pas dansdatasets.xml) = ...
Si vous voulez supprimer (décharger) un orphelin deERDDAP™, vous devez ajouter
        &lt;ensemble de données Type_anyValidType_"datasetID="_theDatasetID_" actif"false" /&gt;
àdatasets.xmljusqu'à ce que l'ensemble de données soit déchargé lors de la prochaine charge majeure.
         
    * C'est pas vrai. Si un ensemble de données avait une variable numérique d'horodatage avec des unités autres que"seconds since 1970-01-01T00:00:00Z"et avec&lt;mettre à jour EveryNMillis&gt; système actif, la plage de la variable timestamp a été mal définie lorsque l'ensemble de données a été mis à jour. Grâce à John Kerfoot.
         
    * BUG FIX: Si&lt;QuickRestart&gt; était vrai dans setup.xml et vous avez demandé des données à un EDDTableFrom... Fichiers de données utilisés&lt;mettre à jour EveryNMillis&gt;, la première demande à l'ensemble de données échouerait, mais les demandes subséquentes réussiraient. La première demande n'échouera pas. Grâce à John Kerfoot.
         
    * BUG FIX: Les paramètres GenerateDatasetsXml.sh et .bat ne fonctionnaient pas avec &gt;9 paramètres sur la ligne de commande. Maintenant ils le font. Grâce à John Kerfoot.
         
    * C'est pas vrai. Le nouveau EDDTableFromMultidimNcFiles n'a pas toujours supprimé les espaces de fuite des chaînes. Maintenant, oui. Cela a notamment affecté les fichiers ARGO. Merci à Kevin O'Brien et Roland Schweitzer.
         
    * C'est pas vrai. Tous les accès à distanceDAPLes services sont maintenant initiés par un code plus moderne. Ceci corrige l'erreur "connection fermée" lors de l'accès à certains ensembles de données EDDTableFromErddap. Grâce à Kevin O'Brien.
         
    * C'est pas vrai. La manipulationorderBy... () et distincts () sont maintenant de retour à la façon dont ils étaient avant les changements récents: une demande donnée peut avoir plusieursorderBy... () et/ou une () filtre;ERDDAP™les gérera dans l'ordre qu'ils sont spécifiés. Merci à David Karuga.
         
    * C'est pas vrai. Si l'ensemble de données est EDDTableFromDatabase et qu'une requête a[sourceCanorderPar](/docs/server-admin/datasets#sourcecanorderby)et/ou[sourceCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct), alors la base de données peut (selon les paramètresdatasets.xml) poignée partielle ou complète **seulement la première**  orderBy.. () ou distinctes () . Merci à David Karuga.
         
    * C'est pas vrai. Le récent encodage de pourcentage supplémentaire a causé des problèmes avec certaines requêtes pour.ncDossiers des FC, p. ex. 500 - Erreur de requête: variable=station est répertorié deux fois dans la liste des variables de résultats." Grâce à Kevin O'Brien.
         
    * BUG FIX: EDDTableFromFiles a eu du mal à recharger un jeu de données quand l'une des colonnes était une vraie colonne char. Merci à Roland Schweitzer.
         
    * C'est pas vrai.EDDGridDeNcFiles Déballé convertit également maintenantmissing\\_valueet \\_FillValue aux valeurs standard afin que les fichiers avec différentes valeurs puissent être agrégés. En raison de ce changement, après avoir installé cette nouvelle version deERDDAP™, s'il vous plaît définir un[dur Drapeau](/docs/server-admin/additional-information#hard-flag)pour chaqueEDDGridDeNcFiles Unpacked donnéeset dans votreERDDAP.
         
    * IMPROUVÉ: EDDTableFromNcCFFiles peut désormais gérer des fichiers qui ont plusieurs échantillons\\_dimension. Un ensemble de données donné ne doit utiliser que des variables utilisant l'une des dimensions de l'échantillon. Grâce à Ajay Krishnan.
         
    * AMÉLIORATION: Pour EDDTableà partir...&lt;trier les fichiersParNomsSource&gt; permet maintenant la séparation des virgules (recommandé) ou des listes séparées d'espace de noms de sources variables. Dans les deux cas, les noms de variables individuels peuvent être entourés de guillemets doubles, par exemple, si le nom a un espace interne.

## Version 1.72{#version-172} 
 (publié le 2016-05-12) 

*    **Nouvelles fonctionnalités (pour les utilisateurs) :** Aucune.
     
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * NEW EDDTableFrom MultidimNcFiles[EDDTableFromMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles)est une nouvelle alternative à EDDTableFromNcFiles. Il est conçu pour traiter des groupes de fichiers avec plusieurs variables avec des dimensions partagées, par exemple, var1\\[a\\]\\[b\\], var2\\[a\\], var3\\[b\\]C'est ça. Grâce au projet Argo, Aurélie Briand et Roland Schweitzer.
    * C'est pas vrai.ERDDAP™  (via les classes FileVisitorDNLS et FileVistorSubdir) suit maintenant les liens symboliques sur Linux.ERDDAP™toujours ne suit pas .lnk sur Windows.
    * BUG FIX de bug introduit en 1.70: distinct +orderByn'ont pas été autorisés ensemble dans une demande. Maintenant, ils le sont encore. Ils ne sont pas mutuellement exclusifs/redondants. Merci à David Karuga.
    * CHANGEMENTdatasets.xmlListe noire des adresses IP :
Les adresses IP v4 apparaissent àERDDAP™4 nombres d'hexagones séparés par période.
Je pense que les adresses IP v6 apparaissent comme 8 numéros de hexagone séparés par un colon.
AlorsERDDAP™maintenant prend en charge les colons dans les adresses IP de cette liste et :\\* à la fin de la liste pour bloquer une gamme d'adresses.
    * AMÉLIORATION:ERDDAP™utilise maintenant NetcdfFileWriter pour écrire.ncfichiers au lieu du NetcdfFileWriteable déprécié. Il ne devrait y avoir aucun changement discernable aux fichiers résultants. Cela ouvre la possibilité de faire grand.ncfichiers qui utilisent les.nc3 extensions 64 bits. Si vous le souhaitez, envoyez une demande àerd.data at noaa.gov.
    * AMÉLIORATION : Bon nombre des liens vers des sites Web distants étaient périmés. Maintenant ils sont à jour et utiliséshttps:au lieu dehttp: autant que possible.
    * Beaucoup de petits changements.

## Version 1.70{#version-170} 
 (publié le 15-04-2016) 

*    **Nouvelles fonctionnalités (pour les utilisateurs) :** Aucune.
     
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** Ci-dessous, il y a plusieurs modifications recommandées à la documentation dans votre fichier setup.xml.
Veuillez faire ces changements maintenant.
30 minutes de travail peuvent vous épargner des heures de confusion à l'avenir.
    * Correction du bug & #160;: Le problème, c'est que les demandes ont été redirigées vers une télécommande.ERDDAPéchoué avec un caractère invalide '|' message d'erreur. Cela n'est arrivé qu'avec les versions récentes de Tomcat. Grâce à Rusty Holleman, Conor Delaney et Roy Mendelssohn.
    * Correction du bug & #160;:ERDDAP™utilise maintenant une version à jour de netcdf-java (C'est une longue histoire) qui inclut un support à jour pour NcML, qui corrige le problème avec NcML LogicalReduce ne fonctionne pas comme prévu. Il peut y avoir quelques petits changements aux métadonnées quiERDDAP™lit via netcdf-java de.nc,.hdfLes fichiers .grib et .bufr. Grâce à Favio Medrano.
    * La nouvelle[EDDTableAgrégatRows](/docs/server-admin/datasets#eddtableaggregaterows)vous permet de faire un ensemble de données EDDTable fusionné à partir de deux ou plusieurs ensembles de données EDDTable qui ont les mêmes variables de données en utilisant les mêmes unités. Merci à Kevin O'Brien.
    * Nouvelles options pour EDDTableFromDatabase ([sourceCanorderPar](/docs/server-admin/datasets#sourcecanorderby)et[sourceCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)) préciser siERDDAP™, la base de données, ou les deux,orderBy  (et toutes les variantes) contraintes. Merci à David Karuga.
    * Vous pouvez maintenant mettre les graphiques et métadonnées d'un ensemble de données privé à la disposition du public via le nouveau [&lt;GraphiquesAccessiblesà&gt;public&lt;/graphsAccessibleà&gt;] (/docs/serveur-admin/datasets#graphsaccessibleà) étiquette. Grâce à Emanuele Lombardi.
    * Maintenant, si une chaîne est passée à GenerateDatasets Xml ou DasDds est entouré de guillemets doubles, il n'est pas cité (Comme si c'était une chaîne JSON) . Merci à John Kerfoot et Melanie Abecassis.
    * Générer des ensembles de données Xml prend désormais en charge "default" pour obtenir la valeur par défaut et "rien" pour obtenir une chaîne vide (ils travaillent avec ou sans citations) . Cela résout certains problèmes liés au passage de chaînes vides.
    * Maintenant, dans Générer des ensembles de données Xml, pour tousEDDGridFromFiles et EDDTable Fichiers de données, si l'échantillon NomFichier que vous spécifiez est "" (la chaîne vide) , il utilisera le dernier nom de fichier correspondant du répertoire + regex + recursive=true.
    * Mise à jour : Le code d'affichageInBrowser utilisé pour afficher les résultats de GenerateDatasetsXml et DasDds sur les ordinateurs Linux était obsolète et donnait un message étrange sur Netscape. Maintenant, cela utilise un outil Linux moderne : xdg-open. Merci à Melanie Abecassis.
    * LesallDatasetsdataset a maintenant un"files"colonne, qui indique l'URL de base du lien /files (s'il y en a un) pour l'ensemble de données.
    * Accroître la sécurité générale de votreERDDAP™en modifiant les autorisations associées au répertoire tomcat et au bigParentDirectory:
         (Les commandes réelles ci-dessous sont pour Linux. Pour les autres OS, faire des changements analogues.) 
        * Modifier le "groupe" pour être tomcat, votre nom d'utilisateur ou le nom d'un petit groupe qui inclut tomcat et tous les administrateurs de Tomcat/ERDDAP, par exemple,
chgrp -R _votreNom d'utilisateur_ apache-tomcat-_8.0.23_
_Votre Nom d'utilisateur bigParentDirectory_
        * Changer les permissions pour que tomcat et le groupe aient lu, écrit, exécuté des privilèges, par exemple.
Chmod -R ug+rwx apache-tomcat-_8.0.23_
chmod -R ug+rwx _bigParentDirectory_
        * Supprimer les permissions d'un autre utilisateur pour lire, écrire ou exécuter :
Chmod -R o-rwx apache-tomcat-_8.0.23_
chmod -R o-rwx _bigParentDirectory_
Ceci est important, car il empêche d'autres utilisateurs de lire des informationsERDDAP™configurer les fichiers, les fichiers journaux et les fichiers avec des informations sur les ensembles de données privés.
    * Le système d'authentification/login a été remanié. Grâce à Thomas Gardner, Emanuele Lombardi et au nouveau gouvernement américain[Norme HTTPS-seulement](https://home.dotgov.gov/management/preloading/dotgovhttps/).
        * L'option authentification=openid a été supprimée. C'était dépassé.
        * Le nouveau, recommandé,[authentification=google](/docs/server-admin/additional-information#google)utilisation des options Connexion Google (basé sur OAuth 2.0) permettre à toute personne ayant un compte de messagerie Google (y compris Google gère des comptes comme@noaa.gov) pour vous connecter.
        * Le nouveau,[authentification=email](/docs/server-admin/additional-information#email)option est une sauvegarde pour l'authentification=google. Il permet aux utilisateurs&lt;user&gt; tag indatasets.xmlpour vous connecter en leur envoyant un email avec un lien spécial.
        * Dans votre setup.xml, veuillez modifier la description de&lt;authentification&gt; à être
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * Dans votre setup.xml, s'il vous plaît ajouter ceci en dessous de la&lt;authentification&gt; étiquette
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * Maintenant, les utilisateurs qui ne sont pas connectés peuvent utiliserhttpouhttpsURLs (si vous avez configuré&lt;baseHttpsUrl&gt; dans votre setup.xml). Grâce au nouveau gouvernement américain[Norme HTTPS-seulement](https://https.cio.gov/).
        * Maintenant, vous pouvez encourager tous les utilisateurs à utiliserhttps  (pashttp) par réglage&lt;baseUrl&gt; pour être unhttpsURL. Pour forcer les utilisateurs à utiliser uniquementhttps, vous devez également apporter des modifications à votre configuration Apache/Tomcat pour bloquer non-httpsaccès. Grâce au nouveau gouvernement américain[Norme HTTPS-seulement](https://https.cio.gov/).
            
Dans votre setup.xml, veuillez modifier la description de&lt;baseUrl&gt; doit être
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * Les options&lt;mot de passeEncodage&gt; changé. Dans votre setup.xml, veuillez modifier la description de&lt;mot de passeEncodage&gt; à être
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * Dans votre setup.xml, veuillez modifier la description de&lt;baseHttpsUrl&gt; pour être
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * Maintenant, si listPrivateDatasets=true dans setup.xml, encore moins d'informations seront affichées sur les ensembles de données auxquels un utilisateur n'a pas accès.
    * Maintenant, surtout pour quand vous êtes d'abordERDDAP, vous pouvez maintenant direERDDAP™ne pas essayer de s'abonner à distantERDDAP™les ensembles de données. Grâce à Filipe Rocha Freire.
Dans votre setup.xml, juste avant&lt;fontFamille&gt;, s'il vous plaît ajouter
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * Dans votre configuration.xml, dans les instructions ci-dessus&lt;e-mailFromAddress&gt;, veuillez insérer :
Si possible, configurer ceci pour utiliser une connexion sécurisée (SSL / TLS) vers le serveur de messagerie.
Si votre configuration n'utilise pas une connexion sécurisée au serveur de messagerie, veuillez apporter les modifications nécessaires.
    * Dans votredatasets.xml, veuillez ajouter cette ligne à la description de&lt;abonnementEmailBlacklist&gt; dans votredatasets.xml:
Vous pouvez utiliser le nom "\\*" à la liste noire d'un domaine entier, par exemple,\\*@exemple.com .
    * Puisque le changement au système de journalisation en v1.66, le fichier journal n'est jamais à jour. Il y a toujours des messages ou des parties de messages qui attendent d'être écrits dans le fichier journal. Maintenant, vous pouvez le mettre à jour (pour un instant) en regardant votreERDDAPla page Web de l'état à http://_your.domain.org_/erddap/status.html .
    * HashDigest......
    * Un petit changement (à String2.canonique) qui devrait aider à faire bouger les choses rapidementERDDAP™est très occupé et aussi mieux gérer un très grand nombre de ensembles de données.
    * Fortement Recommandé: cesser d'utiliser&lt;convertirEnSourcePublicUrl&gt; endatasets.xmlpour convertir un numéro IP dans un ensemble de données&lt;sourceUrl&gt; (Par exemple, http://192.168.#.#/ ) dans un nom de domaine (Par exemple,http:my.domain.org/) . Désormais, de nouveaux abonnements http://localhost , http://127.0.0.1 et http://192.168.#.# URLS ne sera pas autorisé pour des raisons de sécurité. Alors s'il vous plaît toujours utiliser le nom de domaine public dans le&lt;sourceUrl&gt; étiquette (si nécessaire en raison de problèmes DNS) , vous pouvez utiliser[Table /etc/hosts sur votre serveur](https://linux.die.net/man/5/hosts)résoudre le problème en convertissant des noms de domaine locaux en numéros IP sans utiliser un serveur DNS. Vous pouvez tester si un nom de domaine donné est correctement résolu en utilisant
ping _some.domaine.name_
    * Dans generateDatasets.xml, pour les ensembles de données distants (Par exemple, à partir d'un serveur THREDS) , le automatiquement générédatasetIDs sont inchangés pour la plupart des domaines. Pour quelques domaines, la première partie (i.e. le nom) du automatiquement générédatasetIDsera un peu différent. Notamment, les noms qui avaient une partie sont maintenant plus susceptibles d'avoir deux parties. Par exemple, les ensembles de données http://oos.soest.hawaii.edu précédemment conduit àdatasetIDs qui ont commencé avec hawaii\\_, mais qui mènent maintenant àdatasetIDs qui commencent par hawaii\\_soest\\_ . Si cela vous cause des problèmes, veuillez m'envoyer un courriel. Il peut y avoir une solution.
    * Le pilote Cassandra a été mis à jour pour cassandra-driver-core-3.0.0.jar et donc pour Cassandra v3. v3. Les index dans Cassandra peuvent maintenant être plus complexes, maisERDDAP™utilise toujours le modèle d'index de Cassandra v2, qui suppose qu'une colonne indexée peut être directement interrogée avec'='contraintes. Générer des ensembles de données Xml pour EDDTableFromCassandra ne détecte plus les colonnes avec des index; si un index est simple, vous devez le spécifier dansdatasets.xmlà la main. Si vous avez besoin d'aide pour des index plus complexes ou d'autres nouvelles fonctionnalités, veuillez envoyer un courrielerd.data at noaa.gov.
&#33;&#33;&#33; Si vous utilisez encore Cassandra 2.x, veuillez continuer à utiliserERDDAP™v1.68 jusqu'à ce que vous mettez à niveau pour utiliser Cassandra 3.x.
    * Jars et le Classpath -- Presque tous les fichiers .jar inclus ont été mis à jour à leurs dernières versions.
        * slf4j.jar a été ajouté à /lib et au chemin de classe.
        * J'ai peur. jar et tsik. jar ont été retirés de /lib et le chemin de classe.
        * Si vous obtenez des messages d'erreur sur les classes non trouvées lorsque vous compilez ou exécutezERDDAP™ou l'un de ses outils, comparez le chemin de classe de votre ligne de commande àERDDAP's[chemin de classe actuel](/docs/contributing/programmer-guide#development-environment)pour savoir quels .jars manquent à votre chemin de classe.

## Version 1.68{#version-168} 
 (publié le 2016-02-08) 

*    **Nouvelles fonctionnalités (pour les utilisateurs) :** Aucune.
     
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    *   [EDDGridAgrégation de fichiers via les noms de fichiers ou les métadonnées mondiales](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)--
Toutes les variationsEDDGridFromFiles peut maintenant agréger un groupe de fichiers en ajoutant une nouvelle dimension la plus à gauche, généralement du temps, basée sur une valeur dérivée de chaque nom de fichier ou de la valeur d'un attribut global qui se trouve dans chaque fichier.
    * AMÉLIORATION: Nous avons précédemment suggéré que vous aimeriez créer unEDDGridDepuisErddap dataset dans votredatasets.xmlqui référait et réservait le jplMURSST dataset dans notreERDDAP. Comme il y a maintenant une version plus récente de cet ensemble de données, cet ensemble de données est maintenant obsolète. Donc, si vous avez ce jeu de données dans votreERDDAP™, veuillez ajouter ce nouvel ensemble de données
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Si vous voulez supprimer l'ancien jplMURSST dataset de votreERDDAP™  (C'est ton choix.) , changer son réglage actif de "vrai" à "faux".
    * Correction du bug & #160;: Veuillez vérifier le bigParentDirectory que vous avez spécifié dans votre setup.xml. Si vous n'avez pas mis une barre à la fin de la&lt;BigParentDirectory&gt; nom, alorsERDDAP™aura créé plusieurs répertoires en ajoutant des mots directement au nom que vous avez spécifié, au lieu de créer des sous-répertoires. En commençant par la version 1.68,ERDDAP™ajoute une barre oblique à la fin du nom du répertoire si vous ne l'avez pas spécifié. Donc, si vous n'avez pas spécifié auparavant une barre oblique à la fin, alors lorsque vous installezERDDAP™v1.68 vous devez déplacer et renommer ces répertoires **après** Tu arrêtes l'ancien.ERDDAP™et **avant** tu démarres le nouveauERDDAP. Par exemple, si vous avez spécifié par erreur bigParentDirectory comme /home/erddapBPD (Pas de barre oblique) etERDDAP™a créé par erreur des répertoires comme
/home/erddapBPDcache
/home/erddapBPDcopy
/home/erddapBPDdataset
/home/erddapBPDflag
/home/erddapBPDlogs
/home/erddapBPDlucène
et un fichier nommé /home/erddapBPDabonnementsV1.txt,
alors vous devez déplacer et les renommer pour être
/home/erddapBPD/cache
/home/erddapBPD/copie
/home/erddapBPD/dataset
/home/erddapBPD/flag
/home/erddapBPD/logs
/home/erddapBPD/lucène
et /home/erddapBPD/abonnementsV1.txt
    * Correction du bug & #160;: Il y avait des insectes dansEDDGridLonPM180 enERDDAP™v1.66 qui s'est produit lorsque l'ensemble de données enfant est unEDDGridD'Erddap.
    * Correction du bug & #160;: Il y avait un bug dansEDDGridFromFiles et EDDTable Des fichiers dansERDDAP™v1.66 qui ont causé&lt;updateEveryNMillis&gt; à ignorer la première fois que l'ensemble de données a été chargé après un redémarrage.
    * Correction/Nouvelle fonctionnalité & #160;: Si un ensemble de données sur l'enfantEDDGridTotalExistantDimension,EDDGridReçu.EDDGridD'EDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy ou EDDTableDeEDDGridest un ...FromErddap dataset, que parent dataset s'inscrit maintenant au sous-jacentERDDAP™ensemble de données. Si le sous-jacentERDDAP™l'ensemble de données est dans le mêmeERDDAP™, l'abonnement et sa validation se font directement ; vous ne recevrez pas d'e-mail vous demandant de valider l'abonnement. Sinon, si le système d'abonnement pour votreERDDAP™est éteint, réglé le&lt;recharger chaque NMinutes&gt; réglage pour l'ensemble de données parent à un petit nombre (60 ans ?) pour qu'il reste à jour.
    * Correction/Nouvelle fonctionnalité & #160;: Si un ensemble de données sur l'enfantEDDGridTotalExistantDimension,EDDGridReçu.EDDGridD'EDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy ou EDDTableDeEDDGrida actif "false", ce jeu de données enfant est maintenant ignoré.

## Version 1.66{#version-166} 
 (publié le 2016-01-19) 

*    **Nouvelles fonctionnalités (pour les utilisateurs) :** 
    * Graphiques (pas de cartes) peut maintenant avoir des valeurs descendantes sur les axes. Pour obtenir ceci lors de l'utilisation d'une page Web Make A Graph, changez le nouvel axe Y : réglage ascendant (par défaut) à descendre. Ou, dans une URL qui demande un graphique, utilisez la nouvelle option 3rd '|' pour le paramètre[&.x Gamme et/ou &. interrupteurs yRange](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands), qui ne peut être rien (par défaut) , true, ou t pour obtenir des valeurs ascendantes, ou utiliser false ou f pour obtenir des valeurs descendantes. Le vrai|de fausses valeurs sont insensibles aux cas. Grâce à Chris Fullilove, John Kerfoot, Luke Campbell et Cara Wilson.
    * Les utilisateurs peuvent maintenant spécifier la couleur de fond pour les graphiques en ajoutant un &.bgColor=0x_ AARGGBB_ bascule vers l'URL qui demande le graphique. Voir .bgColor dans la section Commandes graphiques de la[quadrillé](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)et[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)la documentation. Merci à John Kerfoot et Luke Campbell.
    * Pour les ensembles de données tabulaires, les contraintes peuvent maintenant se référer à min (_un nom variable_) ou max (_un nom variable_) . Voir[min () et max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min). Grâce à John Kerfoot.
    * Pour les ensembles de données tabulaires, contraintes de temps qui utilisent[Maintenant](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)peut maintenant spécifier des unités de temps de millisecondes ou de millis.
    * Une demande d'image d'un jeu de données tabulaires fait maintenant une carte (Pas un graphique) si les variables x et y sont des variables de longitude et de latitude (unités compatibles) . Merci à Rich Signell.
    * Correction de bogue: Les étiquettes et les tiques de l'axe du temps présentaient parfois des irrégularités étranges lorsqu'on demandait simultanément plusieurs graphiques (Par exemple, sur une page Web) . Le problème était un bug dans la bibliothèque graphique SGT quiERDDAP™Utilisations (une variable était "statique" qui n'aurait pas dû être) . Merci à Bradford Butman.
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * C'est un risque de sécurité de mettre votre mot de passe e-mail dans un fichier texte simple comme setup.xml. Pour atténuer ce problème, nous vous recommandons fortement :
        1. Configurer un compte email juste pourERDDAPL'utilisation, par exemple, erddap@votreInstitution.org . Cela présente également d'autres avantages; notamment, plus d'unERDDAP™l'administrateur peut alors avoir accès à ce compte de messagerie.
        2. Faites les permissions du fichier setup.xml rw (lire + écrire) pour l'utilisateur qui exécutera Tomcat etERDDAP™  (user=tomcat?) et sans autorisation (ne pas lire ou écrire) pour le groupe et les autres utilisateurs. Grâce à Filipe Rocha Freire.
    * La nouvelle[ArchiveADataset](/docs/server-admin/additional-information#archiveadataset)outil simplifie faire un.tar.gzarchive avec un sous-ensemble de données dans un format adapté à l'archivage (notamment,NOAAL'INCE) . Cela devrait être utile pour beaucoupERDDAP™administrateurs dans de nombreuses situations, mais surtout pour les groupes au seinNOAA.
    * Le nouveau type de données[EDDGridDeNcFilesNon emballé](/docs/server-admin/datasets#eddgridfromncfilesunpacked)est une variante deEDDGridDe NcFiles. La différence est que cette classe décompacte chaque fichier de données avantEDDGridFromFiles regarde les fichiers :
        
        * Il déballe les variables emballées qui utilisentscale\\_factoret/ouadd\\_offset.
        * Il favorise les variables entières qui ont des attributs \\_Unsigned=true à un type de données entier plus grand de sorte que les valeurs apparaissent comme valeurs non signées. Par exemple, un octet \\_Unsigned=true (8 bits) variable devient un court signé (16 bits) variable.
        * Il convertit \\_FillValue etmissing\\_valuevaleurs à être de NaN (ou MAX\\_VALUE pour les types de données entiers) .
        
Le grand avantage de cette classe est qu'elle offre un moyen de traiter les différentes valeurs descale\\_factor,add\\_offset, \\_FillValue, oumissing\\_valuedans différents fichiers d'une collection. Sinon, vous devrez utiliser un outil comme[NcML](/docs/server-admin/datasets#ncml-files)ou[NCO](/docs/server-admin/datasets#netcdf-operators-nco)modifier chaque fichier pour supprimer les différences afin que les fichiers puissent être traités parEDDGridDe NcFiles. Pour que cette classe fonctionne correctement, les fichiers doivent respecter les normes des FC pour les attributs connexes. Merci à Philippe Makowski.
    * Le nouveau type de données[EDDGridLonPM180](/docs/server-admin/datasets#eddgridlonpm180)vous permet de modifier des ensembles de données ayant des valeurs de longitude supérieures à 180 (Par exemple, la plage 0 à 360) dans des ensembles de données avec des valeurs de longitude comprises entre -180 et 180 (Longitude Plus ou moins 180, d'où le nom) . Le grand avantage d'offrir des ensembles de données avec des valeurs de longitude dans la gamme -180 à 180 est queOGCservices (Par exemple,WMS) exigent des valeurs de longitude dans cette plage. Merci à Lynne Tablewski, Fabien Guichard, Philippe Makowski et Martin Spel.
2016-01-26 Mise à jour : Eeek &#33; Cela a un bug qui se produit lorsque l'enfant dataset est unEDDGridDeErddap qui fait référence à un ensemble de données dans le mêmeERDDAP. Ce bug est corrigé dansERDDAP™v1.68.
    * En[Générer des ensembles de donnéesXml](/docs/server-admin/datasets#generatedatasetsxml), un nouveau type de données spéciales,EDDGridLonPM180FromErddapCatalog, vous permet de générer ledatasets.xmlpourEDDGridLonPM180 ensembles de données de tous lesEDDGridensembles de donnéesERDDAPqui ont des valeurs de longitude supérieures à 180.
    * Pour tousEDDGridensembles de données, endatasets.xmlvous pouvez maintenant utiliser la option
[&lt;accessible VoieWMS&gt;true|faux&lt;/accessible VoieWMS&gt;] (/docs/serveur-admin/données#accessibleviawms)   (par défaut=true) . Régler ceci à fausse force désactive laWMSservice pour cet ensemble de données. Si vrai, l'ensemble de données peut encore ne pas être accessible viaWMSpour d'autres raisons (Par exemple, pas d'axes lat ou lon) . Ceci est particulièrement utile pour les ensembles de données qui existent seuls et enveloppés parEDDGridLonPM180, afin que seule la version LonPM180 soit accessible viaWMS.
    * Dans setup.xml, vous pouvez spécifier une couleur par défaut différente pour l'arrière-plan des graphiques. La couleur est spécifiée comme valeur hexadécimale à 8 chiffres dans la forme 0x_AARRGGBB_, où AA, RR, GG et BB sont les composants opacity, rouge, vert et bleu, respectivement, spécifiés comme numéros hexadécimales à 2 chiffres. Notez que la toile est toujours opaque blanc, donc un (semi - Oui.) couleur de fond du graphique transparent se mélange dans la toile blanche. La valeur par défaut est bleu clair :
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Merci à John Kerfoot et Luke Campbell.
    * Dans setup.xml, vous pouvez maintenant spécifier la taille maximale[fichier journal](/docs/server-admin/additional-information#log)  (quand il est rebaptisé journal. - Oui. précédent et nouveau journal. txt est créé) En MegaBytes. Le minimum autorisé est 1. Le maximum autorisé est de 2000. Par défaut : 20 (Pays) . Par exemple:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * Endatasets.xml, [&lt;FgdcFile&gt;] (/docs/serveur-admin/datasets#fgdcfile) ou [&lt;iso19115File&gt;] (/docs/serveur-admin/données#iso19115fichier) peut maintenant être un fichier local (comme avant) ou une URL (qui sera téléchargé pour qu'il y ait une copie locale) . SiERDDAP™est incapable de télécharger le fichier, le chargement de l'ensemble de données continuera mais l'ensemble de données n'aura pas de fichier fgdc ou iso19115.
    *   EDDGridFromFiles et EDDTable Les ensembles de données FromFiles peuvent maintenant faire un redémarrage rapide (le système quiERDDAP™essaie d'utiliser lorsque les ensembles de données sont chargés pour la première foisERDDAP™est redémarré) . Cela accélère le redémarrageERDDAP.
2016-01-26 Mise à jour : Eeek &#33; Cela a un bug qui provoque&lt;updateEveryNMillis&gt; à ignorer la première fois que le jeu de données est chargé après un redémarrage. Ce bug est corrigé dansERDDAP™v1.68.
    * Une amélioration générale du système QuickRestart permetERDDAP™charger les ensembles de données plus rapidement lorsqueERDDAP™est redémarré.
    * TousEDDGridFromFiles et EDDTable Les sous-classes FromFiles acceptent maintenant une nouvelle&lt;tag pathRegex&gt;, habituellement spécifié ci-dessous&lt;Récursif. Si la récursive est "true", seuls les chemins de sous-répertoires complets qui correspondent au cheminRegex (par défaut) sera accepté. De même,&lt;sourceUrls&gt; dans une étiquetteEDDGridAggregateExistingDimension peut désormais inclure un attribut pathRegex (par défaut) .
    * Par défaut pour&lt;partiellementRequestMaxBytes&gt; dans setup.xml est maintenant 490000000 (~490 Mo) . Cela évite certains problèmes/délais liés à l'obtention de données des serveurs de données THREDDS. Grâce à Leslie Thorne.
    * Un petit changement au système de log devrait permettreERDDAP™être plus réactif quand il est très, très occupé. L'information est maintenant écrite au fichier journal sur le disque dur en morceaux assez grands. L'avantage est que c'est très efficace --ERDDAP™ne bloquera jamais en attendant que l'information soit écrite dans le fichier journal. L'inconvénient est que le journal se termine presque toujours par un message partiel, qui ne sera pas terminé avant que le prochain morceau soit écrit.
    * Correction du bug liée à inotify et au [&lt;mise à jour de EveryNMillis&gt;] (/docs/serveur-admin/datasets#updateeverynnmillis) système pourEDDGridFromFiles et EDDTable Fichiers de données: Il n'est plus nécessaire de spécifier une grande quantité de fs.inotify.max\\_user\\_watches ou fs.inotify.max\\_user\\_instances. Il y a un bug dansJavaqui provoque certaines parties deJava's inotify/WatchDirectory système à ne pas être des déchets collectés quand ils sont finalisés; éventuellement, le nombre de montres zombie inotify ou d'instances dépasserait le nombre maximal spécifié.ERDDAP™maintenant travaille autour de ceciJavaUn bug.
En outre, le nombre de threads inotify est listé sur la page web status.html, de sorte que vous pouvez garder un œil sur son utilisation. Typiquement, il y a 1 inotify thread parEDDGridFromFiles et EDDTable FromFiles dataset.
    * Correction du bogue : dans de nombreux endroits, au lieu d'une erreur en cours de relance, une nouvelle erreur a été générée qui comprenait seulement une version courte du message d'erreur original et sans trace de pile. Maintenant, lorsqu'une nouvelle erreur est générée, elle inclut correctement toute l'exception originale, par exemple lancer une nouvelle exception ("quelques nouveaux messages", e) ;
Grâce à Susan Perkins.
    * Correction du bug : jusqu'à récemment (v1.64 ?) , si .../datasetIDURL a été demandée,ERDDAP™ajouterait .html à l'URL. Dans v1.64, cela a échoué (une URL mal formatée a été générée puis échouée) . Ça marche encore. Merci à Chris Fullilove.

## Version 1.64{#version-164} 
 (publié le 2015-08-19) 

*    **Nouvelles fonctionnalités (pour les utilisateurs) :** 
    * Il y a maintenant des conseils pour accéder au privé protégé par mot de passeERDDAP™ensembles de données (https://) parcurletPython. Voir[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)et[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)instructions.
Merci à Emilio Mayorga de NANOOS et Paul Janecek de Spyglass Technologies.
         
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    *   ERDDAP™maintenant demandeJava1.8+.
        Java1.7 a atteint[fin de vie](https://www.oracle.com/technetwork/java/eol-135779.html)  (plus de mises à jour de sécurité) en avril 2015. Cette version deERDDAP™ne fonctionnera pas avec les versions deJavainférieur à 1,8. Si vous mettez à jour depuisJava1,7x (ou avant) , vous devriez également mettre à jour Tomcat. Voir[ERDDAP™Configurer les instructions](/docs/server-admin/deploy-install)pour télécharger des liens et des conseils.
    * Nouveau formulaire de fournisseur de données.
Quand un fournisseur de données vient à vous en espérant ajouter quelques données à votreERDDAP™, il peut être difficile et long de collecter toutes les métadonnées nécessaires pour ajouter l'ensemble de donnéesERDDAP. Nombreuses sources de données (par exemple, fichiers .csv, Fichiers Excel, bases de données) n'ont pas de métadonnées internes, doncERDDAP™a un nouveau formulaire de fournisseur de données qui recueille les métadonnées du fournisseur de données et donne au fournisseur de données d'autres conseils, y compris des conseils détaillés pour les bases de données. Les informations soumises sont converties endatasets.xmlformat puis envoyé par courriel auERDDAP™administrateur (vous) et écrit (Annexe) à bigParentDirectory/logs/dataProviderForm.log . Ainsi, le formulaire semi-automatise le processus d'obtention d'un ensemble de donnéesERDDAP™Mais lesERDDAP™administrateur doit encore compléter ledatasets.xmlmorceaux et traiter avec obtenir le fichier de données (s) le fournisseur ou la connexion à la base de données. Pour plus d'informations, voir le[Fournisseur de données Description du formulaire](/docs/server-admin/datasets#data-provider-form).
    * Nouveau&lt;correspondantAxisNDigits&gt;
peut être utilisé parEDDGridFichiers (et donc deNcFiles et deMergeIRFiles) ,EDDGridTotalExistantDimension,EDDGridReçu, etEDDGridLes ensembles de données SideBySide pour spécifier l'égalité précise des valeurs d'axe dans différents fichiers doivent être (combien de chiffres) : 0 = aucun contrôle (N'utilise pas ça &#33;) , 1-18 pour augmenter la précision, ou 20 (par défaut) pour l'égalité exacte. Pour n=1-18,ERDDAP™veille à ce que les premiers n chiffres de doubles valeurs (ou (n+1) div 2 pour les valeurs du flotteur) sont égaux.
        &lt;matchAxisNDigits&gt; remplace&lt;assurerAxisValuesAreEqual&gt;, qui est maintenant obsolète. Une valeur de 'true' sera convertie en matchAxisNDigits=20. Une valeur de «faux» (Ne fais pas ça &#33;) sera converti pour correspondre AxisNDigits=0.
    *   EDDGridFromFiles et EDDTable FromFiles va charger très lentement la première fois que vous utilisez cette version deERDDAP.
        ERDDAP™maintenant stocke l'information de fichier interne un peu différemment, de sorte que la table de fichier interne pour chacun de ces ensembles de données doit être reconstruite. Ne t'inquiète pas. Rien ne va. C'est une seule fois.
    * Fichiers source distants
        EDDGridDeNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles permettent maintenant que les fichiers soient des fichiers distants dans un répertoire accessible parhttp://  (et probablementhttps://et ftp://, mais ils ne sont pas testés) si le serveur distant prend en charge[Demandes de portée](https://en.wikipedia.org/wiki/Byte_serving)dans l'en-tête de requête. Demandes de portée de support de THREDS et Amazon S3,HyraxPas du tout. Ce système vous permet d'accéder à des données dans des fichiers distants sans télécharger les fichiers (ce qui est utile si les fichiers distants sont trop volumineux) , mais l'accès à ces fichiers sera beaucoup plus lent que l'accès aux fichiers locaux ou même à une télécommandeOPeNDAPsource.
Cela comprend:"files"dans un seau Amazon S3 puisqu'ils sont accessibles viahttp://. Si les noms des objets S3 sont comme des noms de fichiers (avec / interne comme un arborescence de répertoire Linux) ,ERDDAP™peut également rendre les fichiers accessibles viaERDDAP's"files"système. Pour que cela fonctionne, vos identifiants S3 doivent être dans ~/.aws/credentials (sous Linux, OS X ou Unix) , ou C:\\\User\\USERNAME\\.aws\\\credentials (sous Windows) sur le serveur avecERDDAP. Voir[Documentation du SDK Amazon](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1).
    * Générer des ensembles de données Xml a une nouvelle option inhabituelle: EDDsFromFiles.
Cela passera par un système de fichiers (même un système distant comme un Amazon S3 si les objets ont des noms de fichiers) et créer ledatasets.xmldes morceaux pour une série de jeux de données. Votre kilométrage peut varier. Cela fonctionne bien si les fichiers sont organisés de sorte que tous les fichiers de données dans un répertoire donné (et ses sous-répertoires) sont adaptés pour un ensemble de données (Par exemple, tous les composites SST d'un jour) . Sinon (Par exemple, si un répertoire contient des fichiers SST et des fichiers Chlorophyll-a) , cela fonctionne mal mais peut être encore utile.
    * Programmeurs: nouveaux fichiers /lib .jar.
Si vous compilezERDDAP™, veuillez noter les nouveaux fichiers .jar dans le paramètre classpath -cp listé dans leERDDAP™ [Guide du programmeur](/docs/contributing/programmer-guide).
    * mer\\_eau\\_pratique\\_salinité
Si vous utilisez le nom standard de CF sea\\_water\\_salinity pour toute variable, je vous encourage à passer à sea\\_water\\_practical\\_salinity qui est disponible dans[version 29 du tableau des noms normalisés des FC](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (et quelques versions précédentes -- je ne savais pas que) . Ce nom indique qu'il s'agit en effet d'une valeur de Salinité Pratique en utilisantPractical Salinity Units  (PSU) , par opposition à une valeur g/kg plus ancienne. Les unités canoniques sont différentes, mais toujours incroyablement inutiles: 1 (Sans doutePSU/PSS-78) , contre 1e-3 (impliquant probablement g/kg) pour la mer\\_eau\\_salinité.\\[Bonjour.Unidataet FC : Nous identifions des valeurs qui utilisent d'autres échelles, par exemple Fahrenheit ou Celsius, via une chaîne d'unités qui est le nom de l'échelle ou une certaine variation. Pourquoi ne pouvons-nous pas identifier les unités de salinité par leur échelle, p. ex. PSS-78? Je sais : les valeurs PSS-78 sont "sans unité", mais il y a une échelle implicite, n'est-ce pas ? Si j'invente une nouvelle échelle de salinité pratique où les valeurs sont 0,875 fois les valeurs PSS-78, les unités canoniques devraient-elles toujours être « 1 » ? Comment un utilisateur peut-il les distinguer ? Les unités des 1e-3 et 1 ne sont ni descriptives ni utiles pour les utilisateurs qui essaient de comprendre ce que les chiffres indiquent.\\]

## Version 1.62{#version-162} 
 (publié le 2015-06-08) 

*    **Nouvelles fonctionnalités (pour les utilisateurs) :** 
    * PourEDDGriddatasets, les utilisateurs peuvent maintenant faire des graphiques de type : Graphiques de surface avec n'importe quelle combinaison d'axes numériques, pas seulement longitude par rapport à latitude. Cela vous permet de faire x versus y (prévu) graphiques et divers[Diagrammes de Hovmöller](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram), par exemple, tracer la longitude versus la profondeur, ou le temps versus la profondeur.\\[Remarque : si la profondeur est sur l'axe Y, il sera probablement retourné de ce que vous voulez. Désolé, désamorcer ce n'est pas encore une option.\\]Grâce à Cara Wilson et Lynn DeWitt.
    * Il y a une nouvelle[Convertisseur Océanique/Acronyme Atmosphérique](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)qui vous permet de convertir un acronyme océan/atmosphère commun en/à partir d'un nom complet.
    * Il y a une nouvelle[Océan/atmosphère Convertisseur de noms variables](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)qui vous permet de convertir un nom de variable océanique/atmosphérique commun en/depuis un nom complet.
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    *   Java7/8
        Oraclene supporte plus (fournit des corrections de bogues de sécurité pour)  Java7.ERDDAP™soutient toujoursJava7, mais s'il vous plaît passer àJava8. La prochaine versionERDDAP™sera probablement nécessaireJava8.
    *   valid\\_min/max/étendue
Auparavant et maintenant, sidataVariableavaitscale\\_factoretadd\\_offsetmétadonnées,ERDDAP™décompresser les valeurs de données et supprimer ces métadonnées. Précédemment,ERDDAP™n'a pas modifié/déballé aucunvalid\\_range,valid\\_min,valid\\_maxmétadonnées (qui doivent généralement contenir des valeurs emballées) parscale\\_factoretadd\\_offset. Maintenant, oui. Veuillez rechercher votreERDDAP™pour "valid\\_" et assurez-vous que toutes les variablesvalid\\_range,valid\\_minouvalid\\_maxavoir les valeurs correctes lorsque les ensembles de données apparaissent dans la nouvelle version deERDDAP. Voir[valid\\_range/min/max documentation](/docs/server-admin/datasets#valid_range).
    * ACDD-1.3
Précédemment,ERDDAP™  (notamment générer des ensembles de données Xml) utilisé/recommandé (1,0) des[NetCDFConvention sur les attributs pour la découverte de données](https://wiki.esipfed.org/ArchivalCopyOfVersion1)qui a été appelé "UnidataDataset Discovery v1.0" dans les conventions mondiales etMetadata\\_Conventionsattributs. Maintenant, nous recommandons[ACDD version 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)qui a été ratifié au début de 2015 et est appelé "ACDD-1.3". Heureusement, ACDD-1.3 est compatible avec la version 1.0. Nous vous rappelons que[passer à ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13). Ce n'est pas dur.
    * Générer des ensembles de données Attributs Xml
Il y a eu un grand nombre de changements pour améliorer&lt;addAttributes&gt; valeurs suggérées par GenerateDatasets Xml pour les conventions mondiales,creator\\_name/email/url, mots clés, résumé et attributs de titre et pour la variablelong\\_nameattribut. Certains changements sont liés à la nouvelle utilisation de l'ACDD-1.3.
    * Tableau EDD deSOSensembles de données
Avec l'ajout occasionnel de nouveaux types deSOSles serveurs et les changements aux anciens serveurs, il devient plus difficile pourERDDAP™pour détecter automatiquement le type de serveur à partir des réponses du serveur. Utilisation de [&lt;Type de serveur de sos&gt;] (/docs/serveur-admin/données#eddtablefromsos-skeleton-xml)   (avec une valeur de IOOS\\_NDBC, IOOS\\_NOS,OOSTethysou WHI) est maintenant vivement recommandé. Si l'un de vos ensembles de données de ce type a des problèmes dans la nouvelle version deERDDAP, essayez de ré-exécuter GenerateDatasets Xml pourSOSserveur pour générer un nouveau morceau dedatasets.xmlpour cet ensemble de données. Générer des ensembles de données Xml vous permettra d'essayer les différents&lt;sosServerType&gt; options jusqu'à ce que vous trouviez la bonne pour un serveur donné. Si vous avez encore des problèmes, s'il vous plaît laissez-moi savoir le problème que vous voyez et l'URL du serveur et je vais essayer d'aider.
    * EDDTableFromFileNames datasets
Quelques attributs recommandésaddAttributessont maintenant sourceAttributes. Vous n'avez probablement pas besoin de changer quoi que ce soit pour les ensembles de données existants dans votredatasets.xml.
    * Correction de bug liée à certaines requêtes aux ensembles de données EDDTableFromNcCFFiles.
J'ai également ajouté un grand nombre d'essais unitaires au grand nombre actuel d'essais unitaires des méthodes sous-jacentes. (il y a 100's de scénarios) . Grâce à Eli Hunter.
    * Correction/petites modifications des bugsEDDGridDeMergeIR.
Merci à Jonathan Lafite et Philippe Makowski
    * Correction du bug & #160;:EDDGridDeErddap fonctionne maintenant même si un jeu de données distant n'a pasioos\\_categoryattributs variables.
Grâce à Kevin O'Brien.
    * Correction de bug dans la page web .graph pourEDDGridles ensembles de données lorsqu'il n'y a qu'une variable d'axe avec plus d'une valeur.
Grâce à Charles Carleton.
    * Il y avait d'autres petites améliorations, modifications et corrections de bugs.

## Version 1.60{#version-160} 
 (publié le 2015-03-12) 

*    **Nouvelles fonctionnalités (pour les utilisateurs) :** aucune
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * STRONGEMENT RECOMMANDÉ: Mettez à jour le serveur[robots.txt](/docs/server-admin/additional-information#robotstxt)fichier à inclure:
Refuser: /erddap/files/
    * INotifier le problème et la solution :
Sur les ordinateurs Linux, si vous utilisez&lt;mettre à jour tous les NMillis&gt; avec ensembles de données avec type=EDDGridDeFiles, EDDTableFromFiles,EDDGridCopier, EDDTableCopy, ou leurs sous-classes, vous pouvez voir un problème quand un jeu de données ne charge pas (occasionnellement ou régulièrement) avec le message d'erreur: "IOException: Limite utilisateur des instances d'inotify atteintes ou trop de fichiers ouverts". Si oui, vous pouvez résoudre ce problème en appelant (comme racine) :
echo fs.inotify.max\\_user\\_watches=65536|tee -a /etc/sysctl.conf
echo fs.inotify.max\\_user\\_instituts=1024|tee -a /etc/sysctl.conf
sysctl -p
Ou, utilisez des nombres plus élevés si le problème persiste. La valeur par défaut pour les montres est de 8192. La valeur par défaut pour les instances est 128.\\[MISE À JOUR: Il y a un bug dansJavaqui fait inotifier les cas de ne pas être ramassés. Ce problème est évitéERDDAP™v1.66 et plus. La meilleure solution est donc de passer à la dernière version deERDDAP.\\]
    * Pas d'exception de cette nature Correction du bug & #160;:
Il y avait un bug qui pouvait causer des ensembles de données de type=EDDGridDeFiles, EDDTableFromFiles,EDDGridCopier, EDDTableCopy, ou leurs sous-classes pour ne pas charger occasionnellement avec l'erreur "NoSuchFileException: _someFileName_". Le bug est lié aux utilisations de FileVisitor et a été introduit dansERDDAP™v1.56. Le problème est rare et est le plus susceptible d'affecter les ensembles de données avec un grand nombre de fichiers de données qui changent fréquemment.
    * Il y a eu quelques petites améliorations, modifications et corrections de bugs.

## Version 1.58{#version-158} 
 (publié le 2015-02-25) 

*    **Nouvelles fonctionnalités (pour les utilisateurs) :** 
    * La nouvelle["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)système vous permet de parcourir un système de fichiers virtuels et de télécharger des fichiers de données source de beaucoupERDDAP™les ensembles de données. Les"files"système est actif par défaut, maisERDDAP™administrateurs peuvent le désactiver en mettant
```
        <filesActive>false</filesActive>  
```
dans leERDDAP™fichier setup.xml. Remerciements particuliers à Philippe Makowski, qui a persisté quand j'ai été lent à apprécier la beauté de cette idée.
    * date Max... Auparavant, la variable temporelle des ensembles de données EDDTable avec des données en temps quasi réel avait une destinationMax de NaN, ce qui impliquait que la valeur de temps maximale pour l'ensemble de données est récente, mais pas précisément connue et changeant fréquemment. Maintenant, la destinationMax a une valeur réelle, indiquant la dernière fois actuellement connue. De nombreux ensembles de données ont continuellement mis à jour les données.ERDDAP™prend en charge l'accès aux données les plus récentes, même si elle est après la dernière fois connue actuellement. Notez que le nouveau [&lt;mise à jour de EveryNMillis&gt;] (/docs/serveur-admin/datasets#updateeverynnmillis) soutien dansEDDGridFromFiles et EDDTable FromFiles datasets met à jour la destination de la variable de tempsMax. Une autre conséquence de ce changement est quedatasetID=allDatasetsdataset inclut maintenant la dernière fois connue dans les colonnes maxTime. Grâce à John Kerfoot.
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * STRONGEMENT RECOMMANDÉ: Mettez à jour le serveur[robots.txt](/docs/server-admin/additional-information#robotstxt)fichier à inclure:
Refuser: /files/
Refuser: /erddap/files/
    * Échantillondatasets.xml-- L'an dernier, nous avons recommandé plusieurs excellents ensembles de données dans la montre côtièreERDDAP™que vous pourriez ajouter à votreERDDAP™juste en ajoutant quelques lignes à votredatasets.xml. Si vous avez ajouté les ensembles de données erdVH, veuillez passer aux nouveaux ensembles de données erdVH2 :
        * Faire une copie de tous les ensembles de données erdVH et modifier la copiedatasetIDDe l'erdVH... à l'erdVH2... et changez la référencesourceUrlDe l'erdVH... à l'erdVH2....
        * Définissez les ensembles de données erdVH... à actif.
    * TousEDDGridFromFiles et EDDTable Les sous-classes FromFiles supportent maintenant [&lt;accèsViaFiles&gt;] (/docs/serveur-admin/datasets#accessibleviafiles) pour rendre les fichiers de données source accessibles via"files"systèmes. Par défaut, ce système est désactivé pour chaque ensemble de données. Vous devez ajouter la balise pour l'activer. Merci à Philippe Makowski.
    * TousEDDGridFromFiles et EDDTable Les sous-classes FromFiles supportent maintenant [&lt;mise à jour de EveryNMillis&gt;] (/docs/serveur-admin/datasets#updateeverynnmillis) . Par défaut, ce système est désactivé pour chaque ensemble de données. Vous devez ajouter la balise pour l'activer. Grâce à Dominic Fuller-Rowell et NGDC.
    * La nouvelle[EDDTableFromFileNames](/docs/server-admin/datasets#eddtablefromfilenames)crée un ensemble de données à partir d'informations sur un groupe de fichiers dans le système de fichiers du serveur, mais il ne sert pas de données à partir des fichiers. Par exemple, cela est utile pour distribuer des collections de fichiers d'images, de fichiers audio, de fichiers vidéo, de fichiers de traitement de texte et de fichiers de tableurs. Cela fonctionne main dans la main avec le nouveau["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)système, afin que les utilisateurs puissent télécharger les fichiers. Remerciements particuliers à Philippe Makowski, qui a persisté quand j'ai été lent à apprécier la beauté de cette idée.
    * La nouvelle[EDDGridD'EDDTable](/docs/server-admin/datasets#eddgridfromeddtable)vous permet de convertir un ensemble de données tabulaires en un ensemble de données maillées. Merci à Ocean Networks Canada.
    * La nouvelle[EDDGridDeMergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles)données agrégées provenant d'un groupe de MergeIR local.gzfichiers.EDDGridDeMergeIRFiles a la distinction d'être le premier morceau de code contribué àERDDAP. C'était entièrement fait sans notre aide. Trois applaudissements et merci à Jonathan Lafite et Philippe Makowski de R.Tech Engineering.
    * Il y a une nouvelle balise setup.xml optionnelle,&lt;unitTestDataDir&gt;, qui spécifie le répertoire avec les fichiers de données de test unitaire qui sont disponibles via un nouveau dépôt GitHub:[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest). Par exemple:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Ceci n'est pas encore utile, mais fait partie de la démarche vers la réalisation d'un maximum de tests unitaires par d'autres personnes. Grâce à Terry Rankine.
    * Il y a eu de nombreuses petites améliorations, modifications et corrections de bugs.

## Version 1.56{#version-156} 
 (publié le 2014-12-16) 

*    **Nouvelles fonctionnalités (pour les utilisateurs) :**   (Aucune) 
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * Vous savez probablement déjà[EDDGridDeErddap](/docs/server-admin/datasets#eddfromerddap)et[EDDTableDeErddap](/docs/server-admin/datasets#eddfromerddap)qui vous permettent de lier à des ensembles de données dans d'autresERDDAPs et les faire apparaître dans votreERDDAP. Les demandes des utilisateurs pour des données réelles de ces ensembles de données sont acheminées invisiblement à la sourceERDDAP™, de sorte que les données ne passent pas par votre système ou utilisent votre bande passante. Il existe maintenant une vaste liste de séries de données recommandées dans l'échantillon.datasets.xmldans le contenu.zip. Pour les inclure dans votreERDDAP™, tout ce que vous avez à faire est de copier et coller ceux que vous voulez dans votredatasets.xml. Grâce à Conor Delaney.
    * Si vous compilezERDDAP™, vous devez ajouter quelques nouveaux . fichiers jar à votre[classpath -cp switch](/docs/contributing/programmer-guide#development-environment)pour java et java.
    * La nouvelle[EDDTableDeCassandra](/docs/server-admin/datasets#eddtablefromcassandra)permet d'obtenir des données[Cassandra](https://cassandra.apache.org/). Merci à Ocean Networks Canada.
    * La nouvelle[EDDTableDeColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)gère l'obtention de données à partir de fichiers de données ASCII avec des colonnes de largeur fixe. Merci à Philippe Makowski.
    * TousEDDGridFromFiles et EDDTable Les sous-classes FromFiles utilisent maintenant une nouvelle méthode, FileVisitor (ajouté àJavadans 1.7) recueillir des informations sur les dossiers. Cela peut n'avoir aucun avantage pour la première collecte d'informations de fichiers pour un ensemble de données donné, mais semble avoir un énorme avantage pour les rassemblements ultérieurs si fait bientôt, tandis que le système d'exploitation a toujours l'information mise en cache. Grâce à NGDC.
        
Nous recommandons toujours: Si un ensemble de données a un grand nombre de fichiers (Par exemple, &gt; 1 000) , le système d'exploitation (et ainsiEDDGridFromFiles et EDDTableFromFiles) fonctionnera beaucoup plus efficacement si vous stockez les fichiers dans une série de sous-répertoires (un par an, ou un par mois pour les ensembles de données avec des fichiers très fréquents) , de sorte qu'il n'y a jamais un grand nombre de fichiers dans un répertoire donné.
        
    * Plusieurs petites améliorations à EDDTableFromAsciiFiles.
    * Quelques améliorations à EDDTableFromAsciiServiceNOS, notamment pour obtenir des colonnes supplémentaires d'information de la source. Merci à Lynn DeWitt.
    * Quelques petites corrections de bogue liées à la norme ISO 19115ERDDAP™génère. Grâce à Anna Milan.

## Version 1.54{#version-154} 
 (publié 2014-10-24) 

*    **Nouvelles fonctionnalités (pour les utilisateurs) :** 
    * Certaines variables fonctionnent maintenant avec le temps à la précision millisecondes, p.ex. 2014-10-24T16:41:22.485Z. Grâce à Dominic Fuller-Rowell.
*    **Petits changements/correspondants :** 
    * Correction de bug: avec une certaine combinaison de circonstances,EDDGridDes ensembles de données NcFile ont retourné des données à moindre précision (Par exemple, flotteurs au lieu de doubles) . Cela ne pourrait affecter que les valeurs de données avec &gt; 8 chiffres significatifs. Toutes mes excuses. (Et c'était un bug classique de programmation d'ordinateur: un mauvais caractère.) Grâce à Dominic Fuller-Rowell.
    * Beaucoup de petits changements.
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * Les ensembles de données Griddap prennent désormais en charge les variables de l'axe des timestamps et les variables de données (C'est-à-dire des variables avec valeurs temporelles, maisdestinationNameautres que"time") . Grâce à Dominic Fuller-Rowell.
    *   ERDDAP™maintenant supporte correctement les millisecondestime\\_precision"1970-01-01T00:00:00.000Z". Un problème intentionnel : en écrivant des temps à des fichiers orientés vers l'humain (Par exemple, .csv,.tsv,.json,.xhtml) ,ERDDAP™utilise lestime\\_precisions'il comprend des secondes et/ou décimales; sinon, il utilise des secondestime\\_precision"1970-01-01T00:00:00Z" (pour la cohérence et la compatibilité en arrière) . Grâce à Dominic Fuller-Rowell.
    *   EDDGridDeNcFiles supporte maintenant la lecture de la chaînedataVariablePar.
    *   .ncfichiers écrits par griddap peuvent maintenant avoir StringdataVariablePar.
    * Générer des ensembles de données Xml inclut désormais plus de flush () appels pour éviter le problème de l'information ne pas être écrit aux fichiers. Merci à Thierry Valero.
    * La documentation pour GenerateDatasetsXml a été améliorée, notamment pour souligner que le commutateur -i ne fonctionne que si vous spécifiez toutes les réponses sur la ligne de commande (Par exemple, mode script) . Et le mode script est expliqué. Merci à Thierry Valero.
    *   ERDDAP™ne permet plus que deux variables dans un ensemble de données aient la mêmesourceName. (Si quelqu'un l'a déjà fait, il a probablement conduit à des messages d'erreur.) Comme précédemment,ERDDAP™ne permet pas que deux variables dans un ensemble de données aient la mêmedestinationName.

## Version 1.52{#version-152} 
 (publié le 2014-10-03) 

*    **Nouvelles fonctionnalités :**   (aucune) 
*    **Petits changements/correspondants :** 
    * Un autre (plus petite) changement à faireERDDAP™Plus vite.
    * Amélioration des fichiers ISO 19115 générés parERDDAP: ajout nouvellement recommandé&lt;gmd:protocol&gt; valeurs (information, recherche,OPeNDAP:OPeNDAP,ERDDAP:griddap, etERDDAP:tabledap) dans&lt;gmd:CI\\_OnlineResource&gt;. Grâce à Derrick Snowden et John Maurer.
    * Beaucoup de petits changements.
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * Correction du bug: Générer des donnéesXml.sh et DasDds.sh n'étaient pas dans erddap.war pour 1.48 et 1.50. Maintenant ils le sont. Merci à Thierry Valero.
    * Petits changements à certains tests de vitesse dans TestAll pour les rendre moins sensibles au hasard. Grâce à Terry Rankine.

## Version 1.50{#version-150} 
 (publié le 2014-09-06) 

*    **Nouvelles fonctionnalités :**   (aucune) 
*    **Petits changements/correspondants :** 
    * CetteERDDAP™devrait être beaucoup plus rapide que les versions récentes.
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :**   (rien) 

## Version 1.48{#version-148} 
 (publié le 2014-09-04) 

*    **Nouvelles fonctionnalités :** 
    *   ERDDAP™maintenant crée toujours un ensemble de données tabulaires,datasetID=allDatasets, qui dispose d'un tableau d'information sur tous les ensembles de donnéesERDDAP. Il peut être interrogé comme n'importe quel autre ensemble de données tabulaires. C'est une alternative utile au système actuel pour obtenir des informations sur les ensembles de données programmatiques.
    * Il existe deux nouveaux types de fichiers de sortie pour EDDTable etEDDGrid.csv0 et.tsv0. Ce sont des fichiers de valeur séparés par des virgules et des onglets qui n'ont pas de lignes avec des noms de colonnes ou des unités. Les données commencent sur la première ligne. Ils sont particulièrement utiles pour les scripts qui veulent juste un morceau d'information deERDDAP.
*    **Petits changements/correspondants :** 
    * Les cartes peuvent maintenant être faites en longitudes dans la gamme -720 à 720.
    * La nouvelle.ncml réponse Type de fichier est disponible pour tousEDDGridles ensembles de données. Il retourne le[NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)\\ description formatée de l'ensemble de données (similaire à un .dds + .das combiné) .
    * Correction du bogue : Enregistrement des données tabulaires à un.ncfichier était limité à 100 000 valeurs par variable. Maintenant, il est juste limité à 2 Go de taille totale de fichier. Grâce à Kevin O'Brien.
    * Correction du bug : le saveAsMatlabà l'heure actuelle,datasetIDs sont convertis en sécuritéMatlabnoms de variables. Mais je recommande que vous créiezdatasetIDs qui sont des noms de variables valides : en commençant par une lettre puis en utilisant simplement A-Z, a-z, 0-9 et \\_. Voir[datasetID](/docs/server-admin/datasets#datasetid). Grâce à Luke Campbell.
    * Correction du bug dans EDDTableFromDatabase : Avec certains types de bases de données, un NO\\_ La réponse aux données de la base de données a entraîné un retard inutile de 30 secondesERDDAP. Grâce à Greg Williams.
    * Correction du bug & #160;:EDDGridFaire un graphique avec type de graphique = lignes (ou des marqueurs ou des marqueurs et lignes) variable d'axe x forcée à être le temps. Maintenant, ça peut être n'importe quel axe. Merci à Lynn DeWitt.
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * STRONGEMENT RECOMMANDÉ: Mise à jourJava  
Cette version deERDDAP™nécessiteJava7 ou plus, maisJava7 arrivera à sa fin de vie en avril 2015 (Bientôt &#33;) , donc maintenant est un bon moment pour passer àJava8. DoncJava8 est vivement recommandé. Je teste avecJava8. Notez queJava6 a atteint sa fin de vie en février 2013 (plus de corrections de bugs de sécurité &#33;) .
    * STRONGEMENT RECOMMANDÉ: Mise à jour Tomcat
Si vous utilisez Tomcat, veuillez passer à la dernière version de Tomcat. Tomcat 8 est conçu pour fonctionner avecJava8.
    * "ERDDAP" n'est plus un acronyme. Maintenant c'est juste un nom. Je ne veux pas que le nom mette en évidenceERD. Je veuxERDDAP™pour mettre en valeur votre institution et vos données.
    * VEUILLEZ[personnaliser l'apparence de votreERDDAP™installation pour mettre en valeur votre institution et vos données](/docs/server-admin/deploy-install#customize). Avec une heure de travail, vous pouvez faire de belles améliorations qui dureront pour toujours.
    * Dans setup.xml, le&lt;displayDiagnosticInfo&gt; option est désormais toujours ignorée et traitée comme si la valeur était fausse.
RECOMMANDÉ:&lt;displayDiagnosticInfo&gt; tag et informations connexes de votre setup.xml.
    * Dans setup.xml, la valeur par défaut pour&lt;drawLandMask&gt; était "over", mais maintenant c'est "under", ce qui est un meilleur défaut général (fonctionne bien avec tous les ensembles de données) .
    * Les scripts Linux GenerateDatasetsXml.sh et DadDds.sh utilisent maintenant bash au lieu de csh, et ont l'extension .sh. Merci à Emilio Mayorga
    * Générer des ensembles de données Xml et DasDds créent maintenant leurs propres fichiers journaux (GénérerDatasetsXml.log et DasDds.log) et les fichiers de sortie (GénérerDatasetsXml.out et DadDds.out) dans _bigParentDirectory_/logs/, et ne jamais mettre leurs résultats sur le presse-papiers.
    * Générer des ensembles de données Xml prend désormais en charge un paramètre de ligne de commande -i qui insère la sortie dans le fichier spécifié à un endroit spécifié. Voir[la documentation](/docs/server-admin/datasets#generatedatasetsxml). Grâce à Terry Rankine.
    * EDDTableFromDatabase prend désormais en charge&lt;colonneNomQuotes&gt;&lt;/columnNameQuotes&gt;, avec des valeurs valides " (par défaut) Rien du tout. Ce personnage (le cas échéant) sera utilisé avant et après les noms de colonnes dans les requêtes SQL. Différents types de bases de données, mis en place de différentes manières, auront besoin de guillemets de noms de colonnes différents.
    * Les variables tabulaires de latitude et de longitude peuvent désormais être personnaliséeslong\\_namePar exemple, Profil Latitude. Auparavant, ils ne pouvaient être que Latitude et Longitude.
    * À partir de maintenant, spécifiez "defaultDataQuery" et "defaultGraphQuery" comme attributs dans les métadonnées globales de l'ensemble de données (i.e.,&lt;addAtts&gt;), pas comme séparé&lt;par défautDataQuery&gt; et&lt;par défautGraphQuery&gt; tags. (Bien que, si vous les spécifiez toujours via les balises,ERDDAP™créera automatiquement des attributs globaux avec l'information.) 

## Version 1.46{#version-146} 
 (publié le 2013-07-09) 

*    **Nouvelles fonctionnalités :** 
    *    (Aucune) 
*    **Petits changements/correspondants :** 
    * Correction du bug: Dans EDDTableFromDatabase, dans la version 1.44 seulement,ERDDAP™incorrectement cité le nom de la table de la base de données dans les instructions SQL. C'est maintenant réglé. Grâce à Kevin O'Brien.
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    *    ** Si vous ne modifiez pas les messages standard dans message.xml,
supprimer\\[Tomcat\\]/content/erddap/messages.xml . **   
Le fichier par défaut message.xml est maintenant dans l'erddap. fichier de guerre, pas erddapContenu.zip. Donc, vous n'avez plus besoin de mettre à jour manuellement messages.xml .
    * Si vous modifiez les messages dans message.xml, à partir de maintenant, chaque fois que vous mettez à jourERDDAP™soit:
        * Faites les mêmes changements que vous avez faits avant le nouveau
            \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
Et ceci une fois: supprimer\\[Tomcat\\]/content/erddap/messages.xml .
        * Ou, comprendre ce qui a changé dans les nouveaux messages.xml (par diff) , et modifier votre
            \\[Tomcat\\]/content/erddap/messages.xml fichier en conséquence.

## Version 1.44{#version-144} 
 (publié 2013-05-30) 

*    **Nouvelles fonctionnalités :** 
    * Les requêtes aux ensembles de données EDDTable supportent maintenant &orderByMin. (...) et &orderByMinMax (...)   (qui renvoie deux lignes dans chaque groupe, avec le minimum et le maximum de la dernièreorderByvaleur) . Merci à Lynn DeWitt.
    * Il y a deux nouveauxtabledaptypes de fichiers & #160;:.ncChef et.ncChef (qui retourne l'en-tête ncdump-like du correspondant.ncFC et.ncTypes de fichiers CFMA) . Grâce à Steve Hankin.
*    **Petits changements/correspondants :** 
    * Correction du bug: charger les pages web .graph et .html pour les ensembles de données avec beaucoup de valeurs de temps était lent parce queERDDAP™a été lent lors de la génération des options de glissement du temps. Maintenant, c'est toujours rapide. Grâce à Michael Barry, OOICI, et Kristian Sebastian Blalid.
    * Correction du bug & #160;: Dans certains types de données EDDTable, les contraintes de temps n'étaient pas toujours traitées correctement. Maintenant ils le sont. Merci à John Maurer et Kevin O'Brien.
    * Correction du bug : les ensembles de données ne se chargent pas lorsque tous lessubsetVariablesétaient des variables de valeur fixe. Maintenant ils le feront. Merci à Lynn DeWitt et John Peterson.
    * AMÉLIORÉ : maintenant, toutes les requêtes pour des variables de sous-ensemble agissent comme si &distinct () fait partie de la requête.
    * AMÉLIORER: maintenant, pour les requêtes qui incluent &.jsonp=_fonctionNom_, _fonction Nom_ DOIT maintenant être une série de 1 ou plus (période séparée) des mots. Chaque mot doit commencer par une lettre ISO 8859 ou "\\_" et être suivi d'au moins 0 lettres ISO 8859, chiffres ou "\\_". Oui, c'est plus restrictif queJavaLes exigences de Script pour les noms de fonctions.
    * L'axe du temps sur les graphiques fonctionne maintenant bien pour des plages de temps plus longues (80 - 10000 ans) et des intervalles de temps plus courts (0,003 - 180 secondes) .
    *   ERDDAP™est maintenant plus indulgent lors de l'analyse des variations des données temporelles du format ISO-8601.
    * Il y avait beaucoup d'autres petits changements et corrections de bugs.
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    *    **Vous DEVEZ mettre à jour la dernière version pour être sécurisé.**   
        ERDDAP™a fait l'objet d'un audit de sécurité. Il y avait des bugs et des faiblesses. La version 1.44 comprend plusieurs corrections de bugs de sécurité importantes et plusieurs changements pour augmenter la sécurité et l'accessibilité (Par exemple, pour les utilisateurs ayant une déficience visuelle) . La version 1.44 a passé l'audit de sécurité de suivi. Merci à toutes les bonnes personnes à USGS et Acunetix qui ont rendu cela possible. (Ne devrait pasNOAATu fais ça ?) 
    * La nouvelle[Tableau EDD deWFSFichiers](/docs/server-admin/datasets#eddtablefromwfsfiles)fait une copie locale de toutes les données d'unArcGISCarteServeurWFSserveur et ainsi les données peuvent être ré-servées rapidement àERDDAP™utilisateurs. Grâce à Christy Caudill.
    * La nouvelle[Tableau EDD deEDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)vous permet de créer un ensemble de données EDDTable à partir d'unEDDGridensemble de données. Voici quelques-unes des raisons courantes à cela :
        * Cela permet d'interroger l'ensemble de données avecOPeNDAPContraintes de sélection (qu'un utilisateur peut avoir demandé) .
        * L'ensemble de données est intrinsèquement un ensemble de données tabulaires. Grâce à OOICI, Jim Potemra, Roy Mendelssohn.
    * Le nom de variable "profondeur" est maintenant une alternative spéciale à "altitude". Les unités doivent être une variante de "mètres". Les valeurs de données doivent être positives = descendantes.ERDDAP™est maintenant pleinement conscient de la signification de «profondeur» et le soutient partout où l'altitude est supportée (Par exemple, en tant que composant d'un ensemble de données CF DSG cdm\\_data\\_type=profil) . Un ensemble de données ne doit pas comporter à la fois des variables «de profondeur» et «d'altitude».
    * Dans votredatasets.xml, veuillez supprimer toute utilisation de&lt;att name="cdm\\_altitude\\_proxy"&gt;profondeur&lt;/att&gt; puisque la profondeur est maintenant une alternative spéciale à l'altitude et n'a donc pas besoin d'être spécialement identifié.
    * Dans votredatasets.xml, veuillez supprimer toute utilisation de&lt;altitudeMetersPerSourceUnit&gt;, sauf EDDTable DeSOS.
Lorsque la valeur est 1, il suffit de la supprimer.
Lorsque la valeur est -1, envisager de changer le nom de la variable en profondeur.
Pour les autres valeurs, ajouter&lt;addAttributes&gt;, par exemple:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Tous les ensembles de données prennent désormais en charge
        
        *   &lt;par défautDataQuery&gt; qui est utilisé si .html est demandé sans requête.
            * Vous aurez probablement rarement besoin d'utiliser ceci.
            * Pour les ensembles de données de griddap, une utilisation courante est de spécifier une autre valeur par défaut de profondeur ou de dimension d'altitude (Par exemple,\\[0\\]au lieu de\\[dernier\\]) .
Dans tous les cas, vous devez toujours énumérer toutes les variables, toujours utiliser les mêmes valeurs de dimension pour toutes les variables, et presque toujours utiliser\\[0\\],\\[dernier\\]ou\\[0:dernier\\]pour les valeurs de dimension.
Par exemple:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Pourtabledapdatasets, l'utilisation la plus courante de ceci est de spécifier une plage de temps par défaut différente (par rapport à maintenant, p. ex., &time&gt;=now-1 jour) .
Rappelez-vous que demander aucune variable de données est la même que de spécifier toutes les variables de données, donc généralement vous pouvez simplement spécifier la nouvelle contrainte de temps.
Par exemple:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;par défautGraphQuery&gt; qui est utilisé si .graph est demandé sans requête.
            * Vous aurez probablement rarement besoin d'utiliser ceci.
            * Pour les ensembles de données griddap, l'utilisation la plus courante de ceci est de spécifier une valeur de profondeur ou d'altitude différente par défaut (Par exemple,\\[0\\]au lieu de\\[dernier\\]) et/ou pour spécifier qu'une variable spécifique doit être graphique.
Dans tous les cas, vous utiliserez presque toujours\\[0\\],\\[dernier\\]ou\\[0:dernier\\]pour les valeurs de dimension.
Par exemple:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Pourtabledaples ensembles de données, les utilisations les plus courantes de ceci sont de spécifier différentes variables à graphiquer, une plage de temps par défaut différente (par rapport à maintenant, p. ex., &time&gt;=now-1 jour) et/ou différents paramètres graphiques par défaut (Par exemple, type de marqueur) .
Par exemple:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Rappelez-vous que vous avez besoin d'encoder XML ou pourcentage (soit un, mais pas les deux) les requêtes par défaut puisqu'elles sont dans un document XML. Par exemple, & devient &amp;amp; ,&lt;devient &amp;lt; et &gt; devient &amp;gt; .
Vérifie ton travail. Il est facile de faire une erreur et de ne pas obtenir ce que vous voulez.
Grâce à Charles Carleton, Kevin O'Brien, Luke Campbell et d'autres.
    *   EDDGridDe Dap,EDDGridDeErddap, et EDDTable deEDDGridavoir un nouveau système pour traiter les ensembles de données qui changent fréquemment (aussi souvent qu'environ tous les 0,5 s) . Contrairement àERDDAP's système régulier, proactif pour recharger complètement chaque ensemble de données, ce système supplémentaire optionnel est réactif (déclenché par une requête de l'utilisateur) et différentiel (mise à jour des informations à mettre à jour) . Par exemple, si une demandeEDDGridDeDap dataset se produit plus que le nombre spécifié de millisecondes depuis la dernière mise à jour,ERDDAP™va voir s'il y a de nouvelles valeurs pour le plus à gauche (généralement"time") Si tel est le cas, il suffit de télécharger ces nouvelles valeurs avant de traiter la demande de l'utilisateur. Ce système est très bon pour garder un ensemble de données en évolution rapide à jour avec des exigences minimales sur la source de données, mais au prix de ralentir légèrement le traitement de certaines demandes des utilisateurs. Voir [&lt;mise à jour de EveryNMillis&gt;] (/docs/serveur-admin/datasets#updateeverynnmillis)   
Grâce à Michael Barry et OOICI.
    *   EDDGridDeNcFiles, EDDTableFromNcFiles et EDDTableFromNcCFFiles prennent désormais en charge[NcML.ncml](/docs/server-admin/datasets#ncml-files)fichiers source à la place de.ncfichiers. Grâce à Jose B Rodriguez Rueda.
    * PourEDDGridTotalExistantDimension,ERDDAP™prend en charge une nouvelle option de type de serveur pour l'attribut de type de serveur&lt;sourceUrlÉtiquette. Cela fonctionne avec les pages Web qui ont des listes de fichiers dans&lt;avant&gt;&lt;/pre&gt; et souvent sous unOPeNDAPlogo. Un exemple est[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html).
    * Pour EDDTableSOSprend désormais en charge une balise optionnelle
```  
        <sosServerType>_serverType_</sosServerType>  
```
ainsi vous pouvez spécifier le type deSOSserveur (doncERDDAP™n'a pas à comprendre) . Valeurs valides&lt;_serveurType_\\&gt; sont IOOS\\_NDBC, IOOS\\_NOS,OOSTethys, et WHI (un serveur nouvellement supporté Type) . Voir[Tableau EDD deSOS](/docs/server-admin/datasets#eddtablefromsos). Merci à Derrick Snowden et Janet Fredericks.
    * TousEDDGridDe... fichiers, EDDTable de... fichiers,EDDGridCopier et EDDTable Copier maintenant supporte une balise optionnelle
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
qui peut le direERDDAP™pour conserver le fichier Tableau (avec des informations sur chaque fichier source) en mémoire au lieu de juste sur le disque (par défaut) . Conserver la table de fichier dans la mémoire accélère les demandes de données (surtout s'il y a &gt; 1000 fichiers de données sources) , mais utilise plus de mémoire. Si vous définissez ceci à true pour tout ensemble de données, gardez un œil sur la Mémoire: actuellement en utilisant la ligne à _votreDomain_/erddap/status.htmlde veiller à ce queERDDAP™Il a encore beaucoup de mémoire libre. Grâce à Fredrik Stray.
    * EDDTableFromASCIIFiles supporte désormais&lt;Charset&gt;. Les deux charsets les plus communs (C'est sensible &#33;) sont ISO-8859-1 (par défaut) et UTF-8.
    * Recommandé: dans setup.xml, dans&lt;startHeadHtml&gt;, veuillez changer&lt;html&gt; dans
        &lt;html lang="en-US"&gt; (ou un autre[code langue](https://www.w3schools.com/tags/ref_language_codes.asp)si vous avez traduit messages.xml) .
    * setup.xml a de nouvelles balises optionnelles pour désactiver des parties deERDDAP:
        *   &lt;convertisseursActive&gt;faux&lt;/convertisseursActive&gt;&lt;Le défaut est vrai --&gt;
        *   &lt;slideSorterActive&gt;faux&lt;/slideSorterActive&gt;&lt;Le défaut est vrai --&gt;
        *   &lt;WmsActive&gt;faux&lt;/wmsActive&gt;&lt;Le défaut est vrai --&gt;En général, nous vous recommandons de ne pas mettre l'un de ces faux.
    * Générer des ensembles de données Xml écrit maintenant les résultats à _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, pas log.txt. Grâce à Kristian Sebastian Blalid.
    * Générer des ensembles de données Xml fait maintenant une bonne suggestion pour le&lt;recharger Tous les NMinutes. Grâce àNOAAProjet UAF.
    * De nombreuses petites améliorations à GenerateDatasetsXml. Grâce àNOAAProjet UAF.

## Version 1.42{#version-142} 
 (publié en 2012-11-26) 

*    **Nouvelles fonctionnalités :** 
    *    (Aucune nouveauté majeure.) 
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * Si vous mettez à niveau à partir deERDDAP™1.38 ou 1.40, il n'y a eu aucun changement qui vous oblige à apporter des modifications à vos fichiers de configuration (mais vous devez utiliser le nouveau fichier message.xml) .
    *   ERDDAP™encore une fois peut courir avecJava1.6. (ERDDAP™v1.40 requisJava1.7.) Nous recommandons toujours fortement d'utiliser la dernière version deJava1.7.
    * Un nouveau type de données,[Tableau EDD de Fichiers AwsXml](/docs/server-admin/datasets#eddtablefromawsxmlfiles), peut lire les données d'un ensemble de Station météorologique automatique (AWS) Fichiers de données XML. Merci à Lynn Dewitt et à l'Exploratorium.
*    **Petits changements/correspondants :** 
    * Ajusté aux changements apportés à la NDBCSOSserveurs de données sources.
    * Ajusté aux changements apportés aux services NOS COOPS ASCII.
    * A fait plusieurs petits changements et corrections de bugs.

## Version 1.40{#version-140} 
 (publié 2012-10-25) 

*    **Nouvelles fonctionnalités :** 
    * Il existe un nouveau format de fichier de sortie pourtabledapensembles de données:.ncL'ACFC, qui enregistre les données demandées dans une.ncdossier conforme aux FC[Géométries d'échantillonnage discrètes](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Options multidimensionnelles et donc conformes aux modèles NODC\\[2021: maintenant le[Modèles RCEI](https://www.ncei.noaa.gov/netcdf-templates)\\]pour stocker ce type de données. Grâce à NODC.
    *   tabledaples demandes peuvent maintenant inclure des contraintes de temps telles que &time&gt;now-5 jours. Voir[la documentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Grâce à James Gosling.
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * Si vous mettez à niveau à partir deERDDAP™1.38, il n'y a eu aucun changement qui vous oblige à apporter des modifications à vos fichiers de configuration (mais vous devez utiliser le nouveau fichier message.xml) .
    *   ERDDAP™des publications publiques et des jalons internes sont disponibles via[ERDDAP™sur GitHub](https://github.com/ERDDAP). Pour plus d'informations, voir le[Wiki](https://github.com/ERDDAP/erddap/wiki)pourERDDAP™projet ainsi que plus général[ERDDAP™Guide du programmeur](/docs/contributing/programmer-guide). (Cela a été annoncé séparément quelques semaines après laERDDAP™1.38 libéré.) 
    * Générer des ensembles de données Xml a été amélioré.
        * Le script a été révisé afin qu'il fonctionne correctement sur tous les ordinateurs Linux (Pas seulement quelques-uns) .
        * Il ajoute maintenantcreator\\_name,creator\\_emailetcreator\\_urlDans la mesure du possible.
        * Beaucoup d'autres petites améliorations.
    * Comment affinerERDDAP™s'occupe du temps.
        * Sur le plan interne,ERDDAP™maintenant gère les temps à la précision milliseconde (Pas de secondes) .
        * Vous pouvez maintenant, en option, spécifier la précision de temps pour un ensemble de données donné, voir[time\\_precision](/docs/server-admin/datasets#time_precision). Par exemple, vous pouvez définir un ensemble de données pour afficher les valeurs temporelles avec la précision de la date (Par exemple, 1970-01-01) .
        * Vos ensembles de données actuels utiliseront les paramètres par défaut, de sorte qu'ils ne sont pas affectés par ces changements et continueront à afficher le temps avec une précision de secondes. Merci à Servet Cizmeli et Philip Goldstein.
    *   [EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles)est un nouveau type de données que vous pouvez utiliser dans votredatasets.xmlfichier. Il peut lire les données de l'un des nombreux formats de fichiers définis par le[FC Géométries d'échantillonnage discrètes](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Convention. Merci à NODC et merci spécial à Kyle Wilcox pour avoir fait des exemples de fichiers pour le grand nombre de formats de fichiers DSG valides et pour les rendre accessibles au public.
*    **Petits changements/correspondants :** 
    * Élargir[Démarrage rapide](#quick-restart)pour tous lesEDDGridet les sous-classes EDDTable.
    * Amélioration de la documentation, notamment en ce qui concerne l'utilisation[quadrillé](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)et[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)de différents logiciels clients.
    * Changement de recherche avancée pour prendre en charge minTime et/ou maxTime exprimé en epochSeconds. Merci à Lynn Dewitt.
    * Changement.htmlTablesortie pour afficher les urls et les adresses email comme des liens.
    * Ajout de « reli» et de «rev» à la rubrique&lt;une balise href&gt;. Merci à Pat Cappelaere de laOGC RESTProjet.
    * Amélioration de la protection contre les demandes de données irréalistes, notamment au seintabledap, où c'est un problème plus difficile.
    * Déplacer plus de messages vers messages.xml.
    * A amélioré la vitesse.
    * CorrectionEDDGridFromFiles pour permettre la descente des axes triés. Grâce à Maricel Etchegaray.
    * Supprimé les références à iGoogle car il sera arrêté.
    * A fait plusieurs petits changements et corrections de bugs.

## Version 1.38{#version-138} 
 (publié le 2012-04-21) 

*    **Nouvelles fonctionnalités :** 
    * ISO 19115 et FGDC --ERDDAP™peut générer automatiquement des fichiers de métadonnées XML ISO 19115 et FGDC pour chaque ensemble de données. Les liens vers les fichiers sont visibles sur chaque liste de ensembles de données (Par exemple, à partir de la recherche en texte intégral) et aussi dans les dossiers Web accessibles (WAF)   (voir[FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)et[ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) . Merci à Ted Habermann, Dave Neufeld, et beaucoup d'autres.
    * Texte complet Recherche de données prises en charge \\-_excludedWord_ et \\-"_excluded phrase_" . Merci à Rich Signell.
    * La recherche des ensembles de données retourne maintenant les résultats d'une page à la fois. La valeur par défaut utilise la chaîne de paramètres : page=1&itemsPerPage=1000, mais vous pouvez modifier les valeurs dans l'URL de votre requête. Merci à Steve Hankin et au projet UAF.
    *   OpenSearch--ERDDAP™maintenant soutient le[OpenSearchAnnexe](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)standard pour la recherche de ensembles de données. Entre autres, cela permet aux sites de regroupement de catalogue de faire des recherches distribuées (passer une demande de recherche à chaque catalogue qu'il connaît) .
    * Comma séparé Valeur (CSV) Fichiers --ERDDAP™génère maintenant des fichiers CSV avec juste une virgule entre les valeurs (que Excel préfère) , au lieu de virgule+espace. Merci à Jeff deLaBeaujardiree.
    * Millions de ensembles de données -- Plusieurs modifications ont été apportées pour appuyerERDDAPS ayant un grand nombre de ensembles de données, peut-être même un million. Merci à Steve Hankin et au projet UAF.
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
#### Redémarrage rapide{#quick-restart} 
*   [A](#quick-restart)système de redémarrage rapide permetERDDAP™pour redémarrer beaucoup plus vite.
     **Veuillez ajouter ceci à votre fichier setup.xml** juste après&lt;/donnéesRegex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * La recherche en texte complet pour les ensembles de données peut maintenant être faite avec le moteur de recherche Lucene (bien que nous recommandons le moteur de recherche original si vous avez moins de 10 000 ensembles de données) ou le système de recherche original.
         **Veuillez ajouter ceci à votre fichier setup.xml** juste après&lt;/displayDiagnosticInfo&gt;:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * Dans setup.xml, vous pouvez/devriez maintenant ajouter deux nouvelles catégories à la liste des virgules séparées&lt;categoryAttributes&gt;:
        * global: mots clés (l'ajouter juste après global:institution) -- un nouveau cas spécial qui analyse une liste de mots-clés séparés par des virgules à partir de l'attribut global de mots-clés pour faire une entrée séparée pour chaque mot-clé.
        * variable Dénomination (ajouter à la fin) -- un nouveau cas spécial qui catégorise chacun desdataVariable destinationNamePar.
    * Dans setup.xml, vous pouvez (Mais pourquoi ?) direERDDAP™ne pas offrir de métadonnées FGDC et/ou ISO 19115 pour tout ensemble de données en incluant
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Les valeurs par défaut pour ces paramètres sont vraies.
    * Endatasets.xml, veuillez envisager d'améliorer les métadonnées de vos ensembles de données.ERDDAP™génère désormais automatiquement des fichiers de métadonnées XML ISO 19115 et FGDC pour chaque ensemble de données basé sur les métadonnées de l'ensemble de données.
Alors, **de bonnes métadonnées des ensembles de donnéesERDDAP-les métadonnées ISO 19115 et FGDC générées.**   
         **Voir la nouvelle documentation pour les nombreux nouveaux RECOMMANDÉS[Attributs mondiaux](/docs/server-admin/datasets#global-attributes).** 
    * Endatasets.xml, si vous voulez direERDDAP™pour utiliser un fichier FGDC et/ou ISO 19115 pré-fabriqué qui est quelque part sur le système de fichiers du serveur au lieu d'avoirERDDAP™générer ces fichiers, utiliser:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Si le fichier n'est pas trouvé, l'ensemble de données n'aura pas de métadonnées FGDC et/ou ISO 19115. Ceci est donc également utile si vous voulez supprimer les métadonnées FGDC et/ou ISO 19115 pour un ensemble de données spécifique.
    * Endatasets.xmlPour tousEDDGridSideBySide etEDDGridAggregateExistingDimension datasets, assurez-vous que les datasets pour enfants ont différentsdatasetIDs que leurs ensembles de données parents et les autres enfants. (Par exemple, vous pouvez suivre le système simple mais efficace de George Foreman pour nommer ses enfants.) Si les noms d'une famille sont exactement les mêmes, l'ensemble de données ne sera pas chargé (avec le message d'erreur que les valeurs de l'axe agrégé ne sont pas dans l'ordre trié) .
    * Endatasets.xml, la liste desioos\\_categoryValeurs des métadonnées:
        * "pCO2" a été remplacé par "CO2".
        * "Océanographie physique" a été ajouté.
        * "Soils" a été ajouté.
    * Endatasets.xml,ERDDAP™ne permet plus '.' dans undatasetID. Elle était permise mais découragée. (Désolé.) 
    * Endatasets.xml, la configuration pour EDDTableFromThreddsFiles et EDDTableFromHyraxLes fichiers ont légèrement changé parce que les deux classes ont été simplement réécrites pour être plus efficaces (les deux classes font désormais toujours une copie locale de tous les fichiers de données distants) . Voir la documentation pour la mise en place de ces classes:[Tableau EDD deHyraxFichiers](/docs/server-admin/datasets#eddtablefromhyraxfiles)et[EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). En particulier, voir les commentaires révisés sur&lt;fichierDir&gt; (maintenant hors de propos) et&lt;sourceUrl&gt; (maintenant essentiel) . Aussi, vous ne devriez jamais envelopper cette classe dans EDDTableCopy pour l'efficacité.
    * Endatasets.xml, si vous utilisez EDDTableFromDatabase avecOraclebase de données, vous devriez inclure une connexion Biens tels que
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
pour spécifier le nombre de lignes de données à récupérer en même temps parce que la valeur par défaut est 10, ce qui est horriblement inefficace. Voir[Oraclela documentation](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm). MySql et PostgreSQL semblent avoir de meilleures valeurs par défaut pour ce paramètre. Grâce à Kevin O'Brien.
    * Si vous utilisez EDDTableFromDatabase, voir l'amélioration[Documentation sur la vitesse](/docs/server-admin/datasets#eddtablefromdatabase)pour des suggestions supplémentaires visant à améliorer la performance. Grâce à Kevin O'Brien.
    * Endatasets.xml, pour tous les ensembles de données EDDTable...Metadata\\_Conventionsattributs globaux, veuillez consulter CF-1.6 (non CF-1.0, 1.1, 1.2, 1.3, 1.4 ou 1.5) , puisque CF-1.6 est la première version à inclure les changements liés à la géométrie d'échantillonnage discrète.
    * Programmeurs qui compilentERDDAP™code doit ajouter lib/lucene-core.jar à la liste des fichiers jar dans leurs chemins de ligne de commande javac et java.
    *   ERDDAP™a une[nouveau service](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)pour convertir un nom standard des FC en mot clé scientifique de la DGCM. Vous pouvez trouver cela utile lors de la génération de métadonnées de mots-clés globaux pour les ensembles de données dans votreERDDAP.
    * S'occuper de Bots... Veuillez lire ce conseil à[empêcher les robots de ramper votreERDDAP™d'une manière stupide](/docs/server-admin/additional-information#robotstxt).
    * Traduction -- Le texteERDDAP's pages Web est maintenant la plupart du temps dans messages.xml et donc adapté pour la traduction dans différentes langues (Par exemple, allemand, français) . Les messages utilisent maintenant souvent MessageFormat pour le formatage, aussi pour aider à faire des traductions. Si vous êtes intéressé à faire une traduction, s'il vous plaît emailerd dot data at noaa dot gov.
    * Échantillondatasets.xml-- Il y a eu plusieurs erreurs mineures mais significatives dans l'échantillon.datasets.xml. Si vous utilisez ces ensembles de données, veuillez obtenir les versions plus récentes à partir du nouvel échantillondatasets.xmldans le nouveau contenu erddap.zipfichier. Grâce à James Wilkinson.
    * C'est... Je vais essayer de faireERDDAP™un projet GitHub au plus vite après cette sortie.
*    **Petits changements/correspondants :** 
    * Une nouvelle palette, OceanDepth, est utile pour les valeurs de profondeur (positif est en baisse) , par exemple, 0 (peu profond) à 8 000 (profonde) .
    * Les.kmlsortie detabledaputilise une meilleure icône de marqueur (Il n'est pas flou) . Et planer sur un marqueur le rend plus grand.
    * TableEDDFromFiles -- Dans la dernière mise à jour, la nouvelle bibliothèque netcdf-java avait des restrictions plus strictes pour les noms de variables dans.ncfichiers. Cela a causé des problèmes pour EDDTableFromFiles si une variablesourceNameavait certains caractères de ponctuation. EDDTableFromFiles est maintenant modifié pour éviter ce problème. Merci à Thomas Holcomb.
    * La page .subset prend maintenant en charge 0/10/100/1000/10000/100000 au lieu d'une case à cocher pour les données connexes. L'infobulle avertit que 100000 peut provoquer l'écrasement de votre navigateur. Merci à Annette DesRochers, Richard (Abe) Coughlin et le projet biologique IOOS.
    * .../erddap/info/_datasetIDLes pages Web _/index.html montrent maintenant les URL et les adresses e-mail comme des liens cliquables. Merci à Richard. (Abe) Coughlin et le projet biologique IOOS.
    * Correction du bug & #160;: danstabledap, pour les ensembles de données avec altitude CompteursParSourceUnité&lt;0, les requêtes avec des contraintes d'altitude ont été mal gérées. Grâce à Kyle Wilcox.
    * Correction du bug & #160;:EDDGridAggregateFromExistingDimension prend désormais en charge des URLs TDS plus diverses. Grâce à ?

## Version 1.36{#version-136} 
 (publié le 2011-08-01) 

*    **Nouvelles fonctionnalités :** 
    * Aucun changement significatif du point de vue de l'utilisateur.
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * L'ensemble de données pmelTao qui a souvent été utilisé comme ensemble de données de l'échantillon pour latabledap  
la documentation n'est plus disponible.ERDDAP™les administrateurs DOIVENT apporter ces modifications :
        * Dans votredatasets.xml, si vous avezdatasetID= ensemble de données "pmelTao", ajouter
actif (false) juste avant le "&gt;" à la fin de cette ligne.
        * Dans votre setup.xml, si votre&lt;TableauEDDExemple&gt; est pmelTao, alors:
            * Si votredatasets.xmln'a pas de jeu de données avecdatasetID="erdGlobecBottle", ajouter
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * Dans votre setup.xml, remplacez toutes les étiquettes&lt;TableauEDDExemple&gt; par
                &lt;Tableau EDDMatlabExemple &gt; avec
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * Pour les ensembles de données où le type est une sous-classe d'EDDTableFromFiles, vous pouvez maintenant faire des données à partir de métadonnées.
Plus précisément, vous pouvez maintenant faire une variable à partir des valeurs d'un attribut d'une des variables originales.
Par exemple,datasets.xml, dans les&lt;dataVariable&gt; tag, si vous utilisez
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™fera une variable avec les valeurs de l'attribut PI de la variable croisière.
Grâce à WOD.
*    **Changements :** 
    * Petits changements

## Version 1.34{#version-134} 
 (publié 2011-06-15) 

*    **Changements :** 
    * Correction du bug & #160;: Correction d'une fuite de mémoire survenue sur quelque 64 bitsJavales installations.
    * Correction du bug & #160;:ERDDAP™définit maintenant correctement ces attributs globaux lorsque les valeurs de la dimension latitude vont de haute à basse : géospatial\\_lat\\_min, géospatial\\_lat\\_max, Southernmost\\_Northing, Northernmost\\_Northing.
        
Notez queactual\\_rangeest inchangé: il peut avoir des valeurs faibles, élevées ou élevées, faibles, car il est destiné à indiquer la plage et l'ordre de stockage.
        
    * Petits changements.
    *   ERDDAP™administrateurs n'ont pas besoin d'apporter des modifications à leur setup.xml oudatasets.xml.

## Version 1.32{#version-132} 
 (publié 2011-05-20) 

*    **Changements :** 
    * Soutien aux géométries d'échantillonnage discrètes des FC nouvellement ratifiées (qui malheureusement n'est pas encore disponible en ligne) , qui remplace les conventions proposées pour l'observation des points des FC.
        ERDDAP™les utilisateurs verront que cdm\\_feature\\_type=Station est remplacé par TimeSeries et il y a de petites modifications aux fichiers créés pour le.ncType de fichier CF (flat\\_dimension est maintenant appelé sample\\_dimension) .
        ERDDAP™les administrateurs devront apporter ces changementsdatasets.xml:
        * cdm\\_data\\_type=Station doit être remplacé par cdm\\_data\\_type=TimeSeries.
        * cdm\\_data\\_type=StationProfile doit être changé en cdm\\_data\\_type=TimeSeriesProfile.
        * cdm\\_station\\_variables doit être changé en cdm\\_timeseries\\_variables.
        * cf\\_role=station\\_id doit être remplacé par cf\\_role=timeseries\\_id.
    * Nouveauioos\\_categoryoptions: "matière organique dissoute colorée", "pCO2", "flux de vapeur", "matière en suspension totale".
    * Solution possible à une éventuelle fuite de mémoire sur 64 bitsJava.\\[Ça n'a pas marché.\\]
    * Petits changements.

## Version 1.30{#version-130} 
 (publié en 2011-04-29) 

*    **Nouvelles fonctionnalités :** 
    * Soutien pour 64 bitsJava. En cas d'utilisation avec 64 bitsJava,ERDDAP™peut maintenant utiliser beaucoup plus de mémoire de tas et gérer beaucoup plus de requêtes simultanées.
    * Appui.ncrequêtes de fichiers jusqu'à 2 Go (même sans 64 bitsJava) par une meilleure utilisationERDDAPLe traitement des données en morceaux.
    * De nombreuses améliorations de vitesse 2X dans le code et 2X accélèrentJava1.6 marqueERDDAP™2X à 4X plus rapidement qu'auparavant.
    * Améliorations de l'économie de mémoire significativement plus faiblesERDDAPL'utilisation de la mémoire de base.
    * Pour les ensembles de données tabulaires,ERDDAP™est maintenant pleinement au courant du cdm\\_data\\_type d'un jeu de données, et de la façon dont les données se plantent vers le type CDM. Voir[FC Spécification discrète des géométries d'échantillonnage](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Peut-être un jour bientôt, ce fichier Word sera converti en .html et remplacera les informations actuelles "OBSOLETE" sur cette page Web. Grâce àNOAAProjet UAF.
    * Pour la plupart des ensembles de données EDDTable, une nouvelle option de type de fichier de sortie,.ncFC, crée Contiguous Ragged Array.ncfichiers qui sont conformes à la dernière version du[FC Conventions sur les géométries d'échantillonnage discrètes](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Ces fichiers sont structurés de manière à refléter le type de données du MDP. Comme les conventions proposées viennent de changer, la bibliothèque de netcdf-java ne supporte pas encore la lecture des formats de fichiers créés parERDDAPet les interpréter comme des fichiers de données CDM. Ça va bientôt arriver. Grâce àNOAAProjet UAF.
    * L'option Affichage : Données distinctes sur la page web .subset est maintenant une liste déroulante qui permet aux utilisateurs de spécifier le nombre maximum de lignes de données distinctes à consulter (par défaut = 1000) . Ce changement, et d'autres, permettentERDDAP™travailler avec des ensembles de données qui ont un très grand nombre de lignes de données distinctes. (Le nombre de valeurs uniques pour n'importe quelle variable est toujours un problème, mais il peut être assez élevé (20 000 ?) avant le .subset et d'autres pages web charger très lentement.) Grâce àNOAAProjet UAF.
    * Les pages web .subset ont une nouvelle option : Afficher les comptes de données distincts. Grâce au projet GTOPP.
    * Pour aider les utilisateurs, les valeurs distinctes (Par exemple, noms des stations) sont maintenant affichés sur les formulaires Make-A-Graph et Data Access. Grâce àNOAAProjet UAF.
    * .transparent Les requêtes Png supportent désormais tous les types de graphiques et de représentations de données. Il dessine seulement les données -- pas d'axes, de légendes, de masque terrestre, ou autre chose. Cela permet de faire des images en couches de Png transparents. Si &.size=_width_|_height_ est spécifié dans la requête (recommandé) C'est un honneur. La valeur par défaut est 360x360 pixels. La seule exception estEDDGrid&.draw=surface, où la valeur par défaut (comme avant) est une image avec ~1/pixel par point de données (jusqu'à 3000 x et y pixels) . Grâce à Fred Hochstaedter.
    * LesWMSpages web montrent maintenant la barre de couleurs pour la variable de l'ensemble de données (s) . Merci à Emilio Mayorga et aux autres.
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * Cette version implique beaucoup de changements. Ils sont tous importants. Veuillez être patient et travailler à travers tous les changements énumérés ci-dessous.
    * Cette version est repoussée plus tôt que prévu pour traiter avec certainsJavales bugs de sécurité. Malheureusement, plusieurs caractéristiques/fixes destinés àERDDAP™version ne sont pas dans cette version. Désolé. Espérons que la prochaine version sera relativement bientôt (et beaucoup plus facile à améliorer) .
    * Pour éviter plusieurs bogues de sécurité dansJava6 mettre à jour 23 et ci-dessous, télécharger et installer la dernière version deJava  (Java6 mise à jour 24 ou plus) . Si vous avez un système d'exploitation 64 bits, veuillez obtenir une version 64 bits deJava.
    * Si vous utilisez Tomcat 5, vous DEVEZ passer à Tomcat 6 ou 7 (préféré) . Si vous utilisez Tomcat 6, envisagez de mettre à jour Tomcat version 7.
    * Veuillez suivre toutes les instructions pour[créer un nouveauERDDAP™](/docs/server-admin/deploy-install), mais le cas échéant, vous allez copier des fichiers de votre ancienne installation à la nouvelle installation, notamment\\[Tomcat\\]/content/erddap répertoire et fichiers. Dans ce cadre, notez le[nouvelles recommandations de configuration Tomcat](/docs/server-admin/deploy-install#tomcat).
    * Le fichier erddap.css par défaut est maintenant inclus dans le fichier erddap.war.
        * Pour utiliser erddap.css par défaut, **supprimer** votre ancien\\[Tomcat\\]/content/erddap/images/erddap.css .
        * Si vous avez modifié\\[Tomcat\\]/content/erddap/images/erddap.css, et voulez continuer à l'utiliser : laissez-le en place et remplacez le&lt;entrée&gt; section avec:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * Dans votre\\[Tomcat\\]/content/erddap/setup.xml:
        * Remplacer les commentaires et les étiquettes relatifs à&lt;Demande partielleMaxBytes&gt; et&lt;Demande partielleMaxCells&gt; avec
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * Remplacer les observations relatives&lt;categoryAttributes&gt; et envisager de modifier la valeur de la balise :
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

Individuel&lt;categoryAttributes&gt; qui sont des attributs globaux maintenant DOIVENT être identifiés via le préfixe global: (Par exemple, l'institution mondiale:) . D'autres attributs sont supposés être des attributs variables (Par exemple,standard\\_name) . En outre, les valeurs de l'institution (les seuls) ont été laissés dans le cas original. Maintenant toutes les valeurs de catégorie sont converties en minuscules.
    * Dans votre\\[Tomcat\\]/content/erddap/datasets.xml:
        * Grosse amélioration:ERDDAP™a de nouvelles exigences relatives au type cdm\\_data\\_de la tabulaire. En particulier, chaque ensemble de données DOIT avoir les bonnes métadonnées et variables liées au type cdm\\_data\\_. Sinon, l'ensemble de données ne sera pas chargé et lancera une erreur. Voir la documentation pour[cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type).
        * FYI: Il existe un nouveau type d'ensemble de données: EDDTableFromAsciiServiceNOS.
        * FYI: Il y a trois nouveaux permisioos\\_categoryoptions: Hydrologie, qualité (Par exemple, pour les drapeaux de qualité) , et Statistiques (Par exemple, moyenne) .
        * Pour EDDTableDe... Fichiers datasets, supprimer tout&lt;nDimensions&gt; tags. Ils ne sont plus nécessaires ni utilisés.
        * Pour les variables avecdestinationName= altitude,ERDDAP™ne force pluslong\\_namepour être Altitude. S'il vous plaît passez par votredatasets.xmlet recherche à plusieurs reprises&lt;destinationName&gt; altitude et ajouter à cette variable&lt;addAttributes&gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (ou un peu différentlong\\_namedans des cas particuliers) .
        * Optionnel: Toutes les sous-classes EDDTableFromFiles supportent la variable[sourceName=global:...](/docs/server-admin/datasets#global-sourcenames)pour convertir des métadonnées globales de chaque fichier en une variable de données. Merci à Lynn DeWitt.
    * EDDTableFromDatabase utilisateurs --ERDDAP™vient avec un nouveau pilote JDBC 4 pour Postgres. Pour les autres bases de données, consultez le web pour trouver le dernier fichier JDBC .jar pour votre base de données. DepuisERDDAP™utilise maintenantJava1.6+, JDBC 4 (pas 3) est probablement recommandé.
    * Exercice
        *   EDDGridDe...Fichier et table EDD De... Les ensembles de données des fichiers stockent maintenant les informations de la table de fichier dans
            \\[BigParent Directory\\]/ensemble de données Informations/\\[datasetID\\]/\\*.ncfichiers.
De plus, les ensembles de données EDDTable stockent maintenant l'information sous-ensemble dans
            \\[BigParent Directory\\]/ensemble de données Informations/\\[datasetID\\]/\\*.ncfichiers. Ces fichiers étaient
            \\[BigParent Directory\\]/ensemble de données Informations/\\[datasetID\\].\\*.jsonfichiers.
Les anciens fichiers seront supprimés automatiquement lorsqueERDDAP™commence. Ou, vous pouvez supprimer tous les fichiers (mais laissez les sous-répertoires vides) en\\[BigParent Directory\\]/datasetInfo/.
        * J'ai travaillé sur une nouvelle table EDDFromNcCFFiles qui lirait les données des fichiers locaux et distants en utilisant les nouvelles conventions proposées pour l'observation des points des FC. Mais ce n'est pas dans cette version. Il y a des problèmes dans les bibliothèques de netcdf-java liés à certaines méthodes de lecture de ces fichiers. Et il y a eu quelques changements très récents aux conventions proposées pour l'observation des points des FC. Lorsque la bibliothèque de netcdf-java sera réparée et mise à jour à la dernière proposition, je reprendrai le travail à ce sujet.
        * CourirERDDAP™sur Windows peut avoir des problèmes: notamment, vous pouvez voir dans\\[bigParentDirectory/logs/log.txt fichier quiERDDAP™est parfois incapable de supprimer et/ou renommer les fichiers rapidement. Ceci est dû au logiciel antivirus (Par exemple, de McAfee et Norton) qui vérifie les fichiers pour les virus. Si vous rencontrez ce problème (qui peut être vu par des messages d'erreur dans le fichier log.txt comme "Impossible de supprimer ...") , modifier les paramètres du logiciel antivirus peut atténuer partiellement le problème.
SiERDDAP™dans Windows est juste un test en cours sur votre bureau, ce n'est qu'un ennui.
SiERDDAP™dans Windows est votre publicERDDAP™, envisager de passer à un serveur Linux.
    * Lent premier démarrage... La première fois que tu coursERDDAP™après mise à niveau,ERDDAP™peut être lent à charger les ensembles de données. Le cheminERDDAP™stocke l'information sur les fichiers agrégés a changé, doncERDDAP™devra relire certaines informations de tous ces fichiers. Ça prendra du temps.
    * Erreurs lors du démarrage -- Compte tenu des changements liés au type cdm\\_data\\_, il est probable que certains de vos ensembles de données ne seront pas chargés et lanceront des erreurs. Lisez attentivement le rapport quotidien par courrielERDDAP™vous envoie quandERDDAP™a fini de commencer. Il y aura une liste des ensembles de données qui n'ont pas été chargés (en haut) et la raison pour laquelle ils n'ont pas chargé (près du fond) .
    * Si vous êtes coincé ou avez d'autres questions, envoyez-moi les détails:erd.data at noaa.gov.
    * Programmeurs -- Si vous écrivezJavaprogrammes qui fonctionnentERDDAP™code, vous devez modifier certaines références des paramètres de la ligne de commande:
        * Changer joda-time-1.6.2jar en joda-time. pot
        * Modifier la référence à Postgres JDBC .jar pour postgresql.jdbc.jar
*    **Petits changements et corrections de bugs :** 
    
    * Amélioration de la manipulation de la connexion pour éviter les fils suspendus.
    * Amélioration des pratiques de concordance pour traiter plus efficacement les demandes presque simultanées identiques.
    *   ERDDAP™maintenant utilise netcdfAll-4.2.jar (rebaptisé netcdfAll-latest. pot) . Ce commutateur a nécessité plusieurs changements internes et a provoqué quelques petits changements externes, par exemple, des changements à la façon dont les fichiers grib sont lus et de minuscules changements à la.ncSortie en-tête.
    * Nouvelle fonctionnalité :\\[erddap\\]/convert/fipscounty.html convertitFIPSles codes de comté vers/depuis les noms de comté.
    * Sur les cartes, les limites de l'état sont maintenant violet foncé, donc ils se distinguent mieux sur toutes les couleurs de fond.
    * Tabulaire.kmlsortie utilise à nouveau une icône circulaire pour marquer des points (pas l'icône de l'avion Google a récemment changé vers) .
    * Les ensembles de données erdCalcofi ont été réaménagés et sont maintenant fournis à partir de fichiers locaux (plus vite) .
    * Générer des ensembles de données Xml de Threddes Catalogue crée maintenant un fichier de résultats :
        \\[Tomcat\\]/webapps/erddap/WEB-INF/temp/EDDGridDeThreddsCatalog.xml . Grâce à Kevin O'Brien.
    * Générer des ensembles de données Xml de Threddes Catalogue essaie maintenant de supprimer les numéros de port inutiles des URL source (Par exemple :8080 et :8081 peuvent parfois être enlevés) . Grâce àNOAAL'équipe de sécurité du centre.
    * Pour les pages web .subset, la carte des données distinctes a maintenant une plage de lat lon variable.
    * Plusieurs listesERDDAP™  (Par exemple, le tableau qui montre tous les ensembles de données) ont été triés de sorte que A..Z trié avant a..z. Maintenant, ils trient de façon insensible.
    * De petits changements aux pages web .subset, y compris : les unités sont maintenant indiquées.
    * Générer des ensembles de données Xml et DasDds ne lancent plus d'exception s'ils ne peuvent pas mettre les résultats sur le presse-papier ou l'affichage du systèmeInBrowser. Merci à Eric Bridger et Greg Williams.
    * Correction du bug & #160;: Lorsque les ensembles de données sont chargés,ERDDAP™supprime ou ajuste maintenant les attributs globaux géospatials. Merci à Charles Carleton.
    * Correction du bug : String2.getClassPath () maintenant correctement pourcentage-décode la classe Voie (notamment, sous Windows, des espaces dans le nom de fichier apparaissaient comme %20) . Cela a affectéERDDAP™EDStatic appelle SSR.getContextDirectory () et trouver du contenu/rddap. Grâce à Abe Coughlin.
    * Correction du bug: dans EDDTableFromFiles liés à la gestion getDataForDapQuery de différents () les demandes. Merci à Eric Bridger.
    * Correction du bug & #160;:tabledaples demandes n'ont pas bien géré les contraintes d'altitude lorsque l'altitude de l'ensemble de données CompteursPerSourceUnité était -1. Merci à Eric Bridger.
    * Correction du bug : EDDTableDe... Les fichiers datasets traitent maintenant correctement les requêtes qui incluent =NaN et &#33;=NaN.
    
## Version 1.28{#version-128} 
 (publié 2010-08-27) 

*    **Nouvelles fonctionnalités :** Aucune.
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** Aucune.
*    **Correction du bug & #160;:** Correction d'une erreur de programmation (seulement en ver 1,26) qui a faitERDDAP™Très lent.
     

## Version 1.26{#version-126} 
 (publié 2010-08-25) 

*    **Nouvelles fonctionnalités :** Aucune.
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** 
    * De votre\\[Tomcat\\]/content/erddap/setup.xml,
        * En&lt;juridique, sur une nouvelle ligne ci-dessous\\[standard Licences de données\\]Ajouter\\[standardContact\\].\\[standardContact\\]fait référence au&lt;adminEmail&gt; spécifié plus haut dans setup.xml.
        * Supprimer&lt;tableauCommonBGColor&gt; et&lt;Tableau surlignéBGColor&gt;.
        * Recommandé : Changement&lt;finBodyHtml&gt; à
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * Requis : À votre\\[Tomcat\\]/content/erddap/images/erddap.css et erddapAlt.css, ajouter en bas:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Corrections et petits changements :** 
    
    * Correction de bug: dans certaines situations, les formulaires ne fonctionnaient pas dans certaines versions d'Internet Explorer. Merci beaucoup à Greg Williams.
    * Correction du bug & #160;: Les boutons Make A Graph ne fonctionnaient pas si l'ensemble de données venait d'une télécommandeERDDAP.
    * Correction du bug & #160;:WMSparfois n'a pas fonctionné si l'ensemble de données était distantERDDAP.
    * Beaucoup de petits changements et corrections de bugs.
    

## Version 1.24{#version-124} 
 (publié le 2010-08-06) 

*    **Nouvelles fonctionnalités :** 
    * Nouveau[Sous-ensemble de pages Web](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)Utilisez la recherche à facettes pour sélectionner des sous-ensembles de données tabulaires. Grâce à POST.
    * Nouveau[Recherche avancée](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)combine toutes les autres options de recherche et ajoute longitude, latitude et limites de temps. Grâce à Ellyn Montgomery. (Désolé pour le retard.) 
    * Nouveau[Convertir le temps](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)page Web et service vous permettent de convertir les heures numériques en/à partir des heures de chaîne ISO.
    * Nouveau[Convertir des unités](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)page Web et service vous permettent de convertirUDUNITSles unités UCUM. Grâce àNOAAIOOSSOS.
    * Sitabledapdemande comprend &unités ("UCUM") , les noms des unités seront convertis à partir des noms originaux (généralementUDUNITS) à[UCUM](https://unitsofmeasure.org/ucum.html)noms d'unités. Cela n'affecte que les unités\\*Noms\\*, pas les valeurs de données. Grâce àNOAAIOOSSOS.
    * Améliorations pour faire un graphique pages Web et graphiques et cartes:
        * Si le graphique est une carte, il y a de nouveaux boutons Make A Graph pour zoomer et une nouvelle option pour cliquer pour changer le point central de la carte. Grâce à POST.
        * Paramètres de filtre ajoutés près du bas. Grâce à Greg Williams.
        * Les fichiers de données sur le littoral ont été mis à jour dans GSHHS v2.0. Grâce à POST.
        * Les cartes comprennent maintenant les lacs et les rivières. Grâce à POST. (Désolé, le delta de la rivière Sacramento manque parce que ni les données côtières ni l'ensemble de données lac/rivière ne s'y rapportent.) 
        * Les fichiers de nation/états dérivés de pscoast ont été mis à jour. Grâce à POST.
        * Topography.cpt a été légèrement modifié. (Désolé si cela vous affecte.) Grâce à POST.
        * Dans Make A Graph de griddap, si un utilisateur modifie une variable, le formulaire est automatiquement soumis de nouveau pour que leaxisVariables' showStartAndStop reflète toujours les variables du graphique. Grâce à Joaquin Trinanes.
        * Pour les URL d'image png et pdf :
            * New &.land=_value_, où _value_ peut être "sous" (montrer la topographie) ou "sur" (juste montrer la bathymétrie) . Si elle n'est pas spécifiée, la valeur par défaut est définie par[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)endatasets.xmlou setup.xml. Grâce à POST.
            * Nouveau : les lignes de la légende trop longues sont automatiquement divisées en plusieurs lignes. Grâce à POST.
        * Pour les URL d'image png :
            * Nouveau &.legend=_value_, où _value_ peut être "Bottom" (par défaut) , "Off" ou "Uniquement". Cela vous permet d'inclure la légende, d'exclure la légende, ou d'obtenir seulement la légende. Grâce à Cara Wilson.
            * Nouveau &.trim=_n Pixels_ laisse une bordure de nPixels (Par exemple, 10) au bas de l'image. Il est appliqué après .legend=Off. Grâce à Cara Wilson.
            * Nouveau &.size=_width_|_hauteur_ permet de spécifier la largeur et la hauteur de l'image, en pixels.
    * Nouveaux formats de fichiers de sortie :
        * .csvp et.tsvp -- comme .csv et.tsvMais avec " (_unités_) " annexé aux noms des colonnes de la première ligne.
        * .odvTxt -- crée un fichier .txt qui simplifie l'entrée des données[Données océaniques Affichage (ODV) ](https://odv.awi.de/).
        * .esriCsv -- rend un fichier .csv adapté à l'importation dans ESRIArcGIS. (données tabulaires seulement) Merci à Jan Mason, Jeff de La Beaujardière, etNOAAIOOSSOSProjet.
    * Améliorations de l'interface utilisateur[Catégorie](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)pages Web. En outre, les valeurs de catégorisation (autres que les établissements) sont maintenant tous minuscules. Les demandes ne relevant pas de la catégorie inférieure sont acceptées (redirigé) pour la compatibilité arrière. Grâce à Roy Mendelssohn.
    * Les messages d'erreur sont maintenant encore plus courts et plus orientés vers les utilisateurs. Grâce à Greg Williams.
    * Un changement interne qui réduit considérablementERDDAPL'utilisation de la mémoire de base.
    * De nombreuses nouvelles fonctionnalités qui ne concernent que le projet POST.
*    **Les chosesERDDAP™Les administrateurs doivent savoir et faire :** Il y a beaucoup de changements. Désolé. Mais chacun apporte de bons avantages.
    * Gros changements à GenerateDatasetXml -- il pose maintenant souvent plus de questions (voir les[ensemble de données Types](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)Informations) et génère maintenant toujours essentiellement du contenu prêt à utiliser pourdatasets.xml. Vous êtes toujours responsable de l'installation, donc vous devriez toujours revoir ladatasets.xmlcontenu avant de l'utiliser. Un effort humain dans le projet fera toujours mieux qu'un programme informatique. Grâce au projet UAF.
    * REQUIS: Dans setup.xml, vous devez réviser leWMSChapitre. Il devrait maintenant inclure ces étiquettes (mais n'hésitez pas à changer les valeurs) :
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * DEMANDE: Dans setup.xml, copiez et collez cette nouvelle suggestion&lt;startHeadHtml&gt; pour remplacer votre ancienne version. Mais n'hésitez pas à modifier vos préférences.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

Grâce à POST, Hans Vedo et Rick Blair.
    * REQUIS: dans setup.xml, dans&lt;startBodyHtml&gt;, modifier le&lt;body&gt; étiquette pour être juste&lt;body&gt;, puisque le style est maintenant défini par erddap.css.
    * REQUIS: Dans setup.xml, changez à ceci&lt;endBodyHtml&gt; (mais changez l'adresse e-mail à votre adresse e-mail et n'hésitez pas à faire d'autres changements) :
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * HAUTEMENT RECOMMANDÉ: Dans setup.xml, le recommandé&lt;le ShortDescriptionHtml&gt; est maintenant
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

N'hésitez pas à changer cela, en particulier la dernière phrase du premier paragraphe.
    * Dans setup.xml, emailEverythingTo et emailDailyReport Pour être maintenant des listes d'adresses email séparées par des virgules. Le premier emailTout ce qui se passe À est spécial, par exemple, les abonnements à EDDXxxxFromErddap datasets utilisent cette adresse email. Merci à John Maurer.
    * Les erreurs d'email sont maintenant enregistrées à la\\[BigParent Directory\\]/logs/emailLogYYYY-MM-JJ.txt fichier.
    * Dans setup.xml, il existe un nouveau paramètre optionnel pour définir les propriétés de compte email (généralement juste après&lt;CourrielMot de passe&gt;):
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

La valeur par défaut n'est rien. Merci à Rich Signell.
    * REQUIS: Si vous utilisez EDDTableCopy ouEDDGridBien reçu, vous devez tout supprimer\\[BigParent Directory\\]/copy/ répertoires et fichiers contenant "xh" dans le répertoire ou les noms de fichiers après avoir arrêté l'ancienERDDAP™et avant de commencer la nouvelleERDDAP™donc ces fichiers seront recopiés. Je suis vraiment désolé, mais il était important de faire le changement et espérons que cela affecte peu d'administrateurs et de fichiers.
Dans Linux, vous pouvez trouver ces fichiers avec, cd\\[BigParent Directory\\]/copie
trouver .\\*xx\\*  
Dans Windows, vous pouvez trouver ces fichiers avec, Démarrer|Recherche
Que voulez-vous rechercher : Documents
Tout ou partie du nom du fichier : xh
Regardez dans: Parcourir -&gt;\\[BigParent Directory\\]/copie
Cliquez sur 'Rechercher'
^A pour les sélectionner tous
Del pour les supprimer tous
    * EXIGENCES:datasets.xml, pour les ensembles de données EDDTableFromDatabase, pour les variables de date et d'horodatage, modifier les données Tapez à doubler et les unités à secondes depuis 1970-01-01T00:00:00Z. Nous vous demandons de stocker les données d'horodatage dans la base de données\\*avec\\*un fuseau horaire. Sans information de fuseau horaire, les requêtes queERDDAP™envoie à la base de données et les résultatsERDDAP™est ambigu et risque d'être faux. Nous avons essayé, mais n'avons trouvé aucun moyen fiable de traiter les données "timestamp sans fuseau horaire". Nous pensons que c'est une bonne pratique de toute façon. Après tout, les données "timestamp sans fuseau horaire" ont un fuseau horaire implicite. Bien qu'il soit grand que le fuseau horaire soit évident pour l'administrateur de la base de données, il est logique de le spécifier explicitement afin que d'autres logiciels puissent interagir correctement avec votre base de données. Merci/désolé Michael Urzen.
    * HAUTE RECOMMANDATION:datasets.xml, pour activer les pages web .subset pour la recherche à facettes de vos ensembles de données tabulaires, vous devez ajouter [&lt;subsetVariables&gt;] (/docs/serveur-admin/datasets#subsetvariables) aux attributs globaux de l'ensemble de données.
    * RECOMMANDÉ:datasets.xml, si vous avez l'ensemble de donnéesdatasetID="pmelGtsppp", veuillez le changer pour être
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * RECOMMANDÉ:datasets.xml, il y a de nouvelles options valides pour le [&lt;cdm\\_data\\_type&gt;] (/docs/serveur-admin/datasets#cdm_data_type) attribut global, vous devriez donc revoir/changer la valeur de vos ensembles de données.
    * Endatasets.xml, le nouveau [&lt;sourceBesoinsExpandedFP\\_EQ&gt;] (/docs/serveur-admin/datasets#sourceneedsexpandedfp_eq) est utile si le serveur source ne gère pas correctement les tests &_variable_\\=_value_ (à cause de la[difficulté générale de tester l'égalité des nombres de points flottants](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) . SourceBesoinsExpandedFP\\_EQ est défini à true par défaut (le réglage le plus sûr) Vous n'avez donc pas besoin de changer.
    * Nouveau[EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles). Grâce à Jerry Yun Pan.
    * Nouveau[EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Grâce à Roy Mendelssohn.
    * Modifications apportées[EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)permet de l'utiliser avec une plus large gamme de fichiers.
    * EDDTableFromBMDE a été désactivé. Il n'existe plus de sources de données actives et appropriées.
    * Dans GenerateDatasetXml, le nouveauEDDGridDe Threddes Catalogue récolte un catalogue complet (ou un sous-ensemble) et génèredatasets.xmlcontenu. Grâce au projet UAF.
    * Générer des ensembles de données Xml et DasDds mettent désormais leurs résultats en\\[BigParent Directory\\]/logs/log.txt. Merci à Rich Signell et Charles Carleton.
    * De nombreuses améliorations au système de connexion. Grâce à POST.
*    **Les chosesERDDAP™Programmeurs Besoin de savoir et de faire :** 
    * Le répertoire /WEB-INF/lib/ a été modifié. Veuillez modifier vos paramètres javac et java classpath en conséquence.
    * Il y a une nouvelle\\[Votre Autres\\]/erddap/version service pour déterminer la version d'unERDDAP. La réponse est le texte, par exemple,ERDDAP\\_version=1.24 Si vous obtenez un message d'erreur HTTP 404 Non-Found, traitez leERDDAP™comme version 1.22 ou inférieure. Grâce à POST.
*    **Petits changements et corrections de bugs :** 
    
    * Tableau EDD de Ça change :
        * Prise en charge pour la lecture de l'OOSSOSRéponses XML.
        * Ajout d'un soutien à la lecture de l'IOOSSOStext/csv. (Donc NOSSOSles serveurs ne sont actuellement pas pris en charge.) 
        * A fait beaucoup de changements liés à IOOSSOSdétails du serveur.
        * Ajout du support pour les requêtes BBOX pour IOOSSOSetOOSTethys SOSles serveurs. Ces changements entraînent une grande accélération pour les demandes de données pertinentes. Grâce à IOOSSOS.
    * Texte.matLes fichiers de données tabulaires sont maintenant sauvegardés correctement. Grâce à Roy Mendelssohn.
    *   WMS
        *   OpenLayersest maintenant livré avecERDDAP™pour utilisation surWMSpages Web. Cela corrige le problème causé parOpenLayersa changé il y a quelques mois et prévient les problèmes futurs.
        * DansWMS GetCapabilitiesréponse,&lt;Ressources en ligne&gt; valeur est maintenant l'URL de laWMSservice. Grâce à Charlton Galvarino.
        * Une légende est affichée sur laWMSpage web pour afficher la barre de couleurs. Grâce à Emilio Mayorga.
    *   EDDGridAgrégateExistingDimension constructeur a eu des problèmes si la source d'un axe Les valeurs n'étaient pas égales à leur destination Valeurs, p. ex., si le temps source était autre chose que"seconds since 1970-01-01". Grâce àToddC'est Spindler.
    * Dans TableauWriterGeoJson, l'excédent ',' après bbox\\[...\\]a été enlevé. Grâce à Greg Williams.
    * Beaucoup de petits changements et corrections de bugs.
    
## Version 1.22{#version-122} 
 (publié le 2009-07-05) 

* Le bug SlideSorter introduit en 1.20 est corrigé.
* Le bug OBIS introduit en 1.20 est corrigé.
* Les références aux ensembles de données Jason sur la page images/gadgets/GoogleGadgets ont été supprimées.
     
## Version 1.20{#version-120} 
 (publié le 2009-07-02) 

*   ERDDAP™administrateur, s'il vous plaît ajouter ceci à votre fichier setup.xml:
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* Nouveaux types de données[EDDGridCopier](/docs/server-admin/datasets#eddgridcopy)et[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy)faire et conserver une copie locale d'une autreEDDGridou les données de l'ensemble de données EDDTable et servir les données de la copie locale. Ils sont très faciles à utiliser et très efficaces **solutions à certains des plus gros problèmes liés au service des données provenant de sources de données distantes:** 
    
    * L'accès aux données d'une source de données distante peut être lent (pour diverses raisons) .
    * L'ensemble de données distant est parfois indisponible (encore une fois, pour diverses raisons) .
    * S'appuyer sur une source pour les données n'a pas une bonne échelle (Par exemple, lorsque de nombreux utilisateurs et de nombreux utilisateursERDDAPs utiliser) .
    
De plus, la copie locale est une sauvegarde de l'original, ce qui est utile si quelque chose arrive à l'original.
    
Il n'y a rien de nouveau à faire une copie locale d'un ensemble de données. Ce qui est nouveau ici, c'est que ces classes le font\\*facile\\*créer et\\*maintenir\\*une copie locale des données d'un\\*variété\\*des types de sources de données à distance et\\*ajouter des métadonnées\\*pendant la copie des données.
    
Ces types de données font partie d'un ensemble complet de fonctionnalités qui simplifient la création de[quadrillages/grappes/federations deERDDAPs](/docs/server-admin/scaling)pour gérer des charges très lourdes (Par exemple, dans un centre de données) .
    
* Nouveau type de données[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)obtient les données d'une table de base de données locale ou distante.
*   ERDDAP™maintenant a un[sécurité](/docs/server-admin/additional-information#security)système qui supporte l'authentification (laisser les utilisateurs se connecter) et autorisation (leur donnant accès à certains ensembles de données privés) .
* Il y a[deux, nouveaux, outils en ligne de commande](/docs/server-admin/datasets#tools)pour aiderERDDAP™les administrateurs génèrent le XML pour un nouvel ensemble de données dansdatasets.xml:
    * Générer des ensembles de données Xml peut générer une ébauche approximative de l'ensemble de données XML pour presque tous les types de ensembles de données.
    * DasDds vous aide à tester et affiner le XML pour un ensemble de données.ERDDAPGénérer des ensembles de données Les pages Web Xml ont été supprimées. Pour des raisons de sécurité, ils n'ont pris en charge que quelques types de données. Les nouveaux outils en ligne de commande sont une meilleure solution.
* La nouvelle[page d'état](/docs/server-admin/additional-information#status-page)laisse n'importe qui (mais notamment les administrateurs) voir le statut d'unERDDAP™de n'importe quel navigateur en allant à\\[baseUrl\\]/erddap/status.html.
* Tableau supporte maintenant[fonctions côté serveur](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions):
    * & distinct () supprime les lignes dupliquées de la table de réponse,
    * &orderBy (...) vous permet de spécifier comment la table de réponse doit être triée,
    * &orderByMax (...) vous permet de spécifier comment la table de réponse doit être triée et supprime toutes les lignes sauf les lignes avec les valeurs maximales dans la dernière colonne spécifiée. Ceci peut être utilisé, par exemple, pour obtenir les dernières données disponibles pour chaque station.
* Les ensembles de données tabulaires peuvent maintenant inclure d'autres variables dateTime qui ne sont pas nommées"time". Ces variables sont reconnues par leurs métadonnées "unités", qui doivent contenir" since "  (pour la date numérique Heures) ou "yy" ou "YY" (pour chaîne formatée dateTimes) . Mais s'il vous plaît utilisez toujours ledestinationName "time"pour la date principale Variable dans le temps.
*   ERDDAP™maintenant génère une[sitemap.xml](/docs/server-admin/additional-information#sitemapxml)fichier, qui indique aux moteurs de recherche que votreERDDAPIl suffit de ramper tous les mois.ERDDAP™administrateurs, veuillez suivre[les présentes instructions](/docs/server-admin/additional-information#sitemapxml)pour informer les moteurs de recherche du nouveau fichier sitemap.xml.
*   ERDDAPLes messages d'erreur sont maintenant beaucoup plus courts et adaptés aux clients (pas de programmeurs) . Grâce à Greg Williams.
* [&lt;requêteBlacklist&gt;] (/docs/serveur-admin/données#requestblacklist) maintenant prend également en charge les adresses IP où le dernier numéro a été remplacé par \\*.
* Demandes.jsonet les fichiers .geoJson peuvent désormais inclure une option[Jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)demande en ajoutant "&.jsonp=_functionName_" à la fin de la requête. En gros, ça dit justeERDDAP™pour ajouter "_fonctionName_ (" au début de la réponse et ") " à la fin de la réponse. Si à l'origine il n'y avait pas de requête, laissez le « & » dans votre requête. Grâce à Greg Williams.
* Beaucoup de nouvelles statistiques ont été ajoutées au[Rapport quotidien](/docs/server-admin/additional-information#daily-report).
* Sur les pages Web avec des listes de ensembles de données, l'institution et l'identité sont maintenant à l'extrême droite. Ceci déplace l'abonnement et d'autres colonnes plus utiles en vue sur des écrans informatiques étroits.
* Sur toutes les pages web, le titre de la page&lt;titre&gt; dans&lt;startHeadHtml&gt; que vous définissez dans setup.xml) est modifié pour inclure une meilleure description de la page Web (par exemple, en incluant le titre et l'institution de l'ensemble de données actuel) .
* L'information Xmx est maintenant incluse avec l'information de mémoire imprimée dans log.txt, le rapport quotidien et sur status.html. Grâce à Ellyn Montgomery.
*   ERDDAP™dispose d'une protection supplémentaire à usage général contre toutes les erreurs (Par exemple, hors mémoire) . Grâce à Charles Carleton.
* Amélioration du traitement des erreurs si la réponse a déjà été engagée.
* AMÉLIORÉ: EDDTableFromFiles etEDDGridFromFiles permet maintenant&lt;métadonnéesDe&gt; première ou dernière. l'avant-dernier n'est plus pris en charge. Et les premier et dernier sont maintenant basés sur le dernier temps modifié des fichiers.
* Correction du bug : dans EDDTableFromSOS, info invalide pour une station a lancé une exception et a causé le rejet de l'ensemble des données. Maintenant, ces stations sont juste ignorées (et le message d'erreur est enregistré dans log.txt) . Grâce à Rick Blair.
     

## Version 1.18{#version-118} 
 (publié le 2009-04-08) 

* Correction du bogue : À partir du 1.14, le formulaire d'accès aux données EDDTable et Make A Graph ne traitait pas correctement les contraintes citées.
* Correction du bogue : À partir de 1.14, EDDTableFromDapSequence n'a pas géré correctement les contraintes de temps si les unités de temps source n'étaient pas « secondes depuis 1970-01-01T00:00:00 ».
     

## Version 1.16{#version-116} 
 (publié le 26-03-2009) 

*   ERDDAP™administrateurs:
    * C'est une publication importante car elle corrige un bug qui a laissé unERDDAP™thread en cours d'exécution si vous avez utilisé Tomcat Manager pour arrêter/démarrer ou rechargerERDDAP. Donc, lorsque vous installez 1.16, n'utilisez pas simplement Tomcat manager pour défaire l'ancienERDDAP™et déployer le nouveauERDDAP. Plutôt: **undéployer l'ancienERDDAP™, redémarrez Tomcat (ou le serveur) , puis déployer le nouveauERDDAP.** C'est toujours une bonne idée de le faire lors de l'installation d'une nouvelle version.
    * Veuillez ajouter [&lt;requêteBlacklist&gt;&lt;/requestBlacklist&gt;] (/docs/serveur-admin/données#requestblacklist) à votredatasets.xml. Ceci peut être utilisé pour spécifier une liste d'adresses IP client à bloquer (Par exemple, pour éviter une attaque de déni de service ou un robot web trop zélé) .
* Il y a maintenant une\\[BigParent Directory\\]/logs répertoire pour tenir leERDDAP™Les fichiers journaux. Quand vous commencezERDDAP™, il fait une copie d'archive du log.txt et du log. txt.fichiers précédents avec un timbre horaire. S'il y avait des problèmes avant le redémarrage, il peut être utile d'analyser ces fichiers.
*   ERD'sERDDAP™Le système d'abonnement est maintenant activé.
*   ERDDAP™une fois de plus permet (mais ne recommande toujours pas) l'encodage "%26" de "&" dans les URLs de requête (voir[changement lié à v1.14](#percent26)) .
* Plusieurs nouveaux ajouts à la section Tally[Rapport quotidien](/docs/server-admin/additional-information#daily-report).
* Corrections de petits bugs dans generateDatasetsXml.
* Quelques petites corrections.
     

## Version 1.14{#version-114} 
 (publié le 2009-03-17) 

* Changements pour les utilisateurs :
    * Dans les demandes de données de grille,ERDDAP™soutient maintenant:[dernier-n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)où n est un nombre entier d'indices[ (dernier-d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)où d est une valeur numérique (pour le temps, c'est en secondes) .
    * Dans les requêtes de données tabulaires, les contraintes de chaîne[doubles citations](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)autour de la valeur, par exemple, Cela est exigé par leDAPProtocole.
    * Dans les demandes de données tabulaires,ERDDAP™maintenant exige que[toutes les contraintes doivent être correctement codées pour cent](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode). Les navigateurs le font automatiquement, donc cela affecte surtout les programmes/scripts d'ordinateur qui accèdentERDDAP.
#### Pourcentage26{#percent26} 
*   [Précédemment,](#percent26)des[intégrer une page web graphique](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)et les[ERDDAP™Page web Google Gadget](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)dit de remplacer "&" dans l'URL de l'image par "%26". À partir de maintenant, vous devriez remplacer le «&» dans l'URL de l'image par «&amp;». Donc, vous devez remplacer tout « & #160; %26 & #160; » dans les pages Web existantes et Google Gadgets par « &amp; & #160; ». (Désolé.) 
*   ERDDAP™administrateurs, s'il vous plaît:
    * Ajouter ce qui suit à votre[configuration.xml](/docs/server-admin/deploy-install#setupxml)fichier (et changer le drapeau Valeur clé) :
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * Sur la ligne après&lt;emailUserName&gt; dans votre[configuration.xml](/docs/server-admin/deploy-install#setupxml)fichier, ajouter
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
et entrez votre vrai mot de passe.
    * Vous pouvez changer&lt;WmsSampleBBox&gt; dans votre[configuration.xml](/docs/server-admin/deploy-install#setupxml)fichier pour inclure des valeurs de longitude jusqu'à 360, p.ex.,
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * Dans votredatasets.xmlfichier, renommer l'ensemble de données type EDDTableFromNc4DFiles vers EDDTableFromNcFiles (qui prend maintenant en charge les fichiers avec n'importe quel nombre de dimensions) . Si vous aviez un jeu de données EDDTableFromNc4DFiles:
        
        1. Vous DEVEZ changer en type "EDDTableFromNcFiles" dans vos ensembles de données. Fichier XML.
        2. Vous devez ajouter un&lt;Tailles&gt; 4&lt;/nDimensions&gt; tag vers le XML du jeu de données.
        3. Vous pouvez ajouter le nouveau&lt;trierFilesBySourceNames&gt; tag pour spécifier l'ordre interne des fichiers, qui détermine l'ordre global des données retournées.
        
Pour plus de détails, voir[EDDTableFromFiles](/docs/server-admin/datasets#eddtablefromfiles).
    * Dans le passé, pour EDDTableFromDapSequence, pourOPeNDAPServeurs DRDS, dansdatasets.xml, nous avons utilisé&lt;sourceCanConstrainStringsRegex&gt;~=&lt;/sourceCanConstrainStringRegex&gt;. Mais nous voyons maintenant que le soutien de DRDS regex est plus limité queERDDAPSi, donc nous recommandons&lt;sourceCanConstrainStringsRegex&gt;&lt;/sourceCanConstrainStringRegex&gt; afin que les contraintes de régex ne soient pas transmises à la source, mais soient plutôt gérées parERDDAP.
    * Manipulation révisée de la sourceCanConstrain... endatasets.xmlpar[EDDTableFromDapSéquence](/docs/server-admin/datasets#eddtablefromdapsequence)et (interne) tous les types de données EDDTable. Le nouveau système est plus simple et reflète mieux la variabilité des différentes sources de données. Vous pouvez avoir besoin de modifier le XML pour vos ensembles de données dansdatasets.xml.
* Il existe plusieurs nouvelles caractéristiques qui sont utiles par elles-mêmes, mais lorsqu'elles sont combinées, facilitent également la création de[quadrillages/grappes/federations deERDDAPs](/docs/server-admin/additional-information#grids-clusters-and-federations).
    * Nouveaux types de données:
        *   [EDDGridDeErddap](/docs/server-admin/datasets#eddfromerddap)et[EDDTableDeErddap](/docs/server-admin/datasets#eddfromerddap)qui ont laissé uneERDDAP™inclure un ensemble de données d'un autreERDDAP™d'une manière très simple et très efficace.
        *   [EDDGridFichiers](/docs/server-admin/datasets#eddgridfromfiles)  (et sa sous-classe,[EDDGridDeNcFiles](/docs/server-admin/datasets#eddgridfromncfiles)qui peut lireNetCDF .nc, GRIB .grb, etHDF .hdffichiers) .
        *   [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)qui peut lireNetCDF .ncqui ont une structure de table.
    * RunLoadDatasets et LoadDatasets ont été remaniés pour queERDDAP™est très sensible au rechargement des ensembles de données basés sur des fichiers dans le[drapeau](/docs/server-admin/additional-information#flag)répertoire (souvent&lt;5 secondes si la charge principale est terminée).
    * Nouveau service pour permettre[une URL pour créer un fichier drapeau](/docs/server-admin/additional-information#set-dataset-flag)pour un ensemble de données donné, par exemple,
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
crée un fichier drapeau dans le répertoire drapeau pour rPmelTao (bien que le drapeau La clé ici est fausse) .
    * Nouveau[abonnement](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)service afin que tout client puisse spécifier une action qui sera faite lors de la création d'un ensemble de données spécifique (lorsqueERDDAP™est redémarré) et chaque fois que l'ensemble de données change. Ce système peut être désactivé via&lt;abonnementSystemActive&gt; dans votre[configuration.xml](/docs/server-admin/deploy-install#setupxml)fichier. LesERDDAP™ [Rapport quotidien](/docs/server-admin/additional-information#daily-report)liste maintenant tous les abonnements et inclut l'URL nécessaire pour annuler chacun, au cas où vous sentez que le système est abusé. Endatasets.xml, il y a une nouvelle option [&lt;abonnement Liste noire du courriel&gt;] (/docs/serveur-admin/datasets#abonnementemailblacklist) tag de sorte que les administrateurs peuvent spécifier une liste d'adresses email séparées par des virgules qui sont immédiatement blacklisted du système d'abonnement.
    * Nouveau [&lt;surChange&gt;] (/docs/serveur-admin/données#onchange) attribut dansdatasets.xmllaisse laERDDAP™administrateur spécifie une action qui sera effectuée lors de la création d'un ensemble de données spécifique (lorsqueERDDAP™est redémarré) et chaque fois que l'ensemble de données change.
    * Amélioration de la recherche en texte intégral : le stockage de la chaîne de recherche pour chaque jeu de données utilise maintenant 1/2 la mémoire. L'algorithme de recherche (Garçon-Moore-comme) est maintenant 3X plus rapide.
    * Courriels deERDDAP™maintenant toujours préparer le sujet et le contenu avec\\[erddap Autres\\], afin qu'il soit clair quiERDDAP™cela vient de (au cas où vous administreriez plusieursERDDAPs) .
    * Collecte de statistiques plus exhaustives pour[Rapport quotidien](/docs/server-admin/additional-information#daily-report)E-mail.
    * Nouveau fichier journal\\[BigParent Directory\\]/emailLogYEAR-MM-JJ.txt enregistre tous les courriels envoyés parERDDAP™chaque jour. Ceci est particulièrement utile si votre serveur ne peut pas envoyer des e-mails -- vous pouvez au moins les lire dans le journal.
    *   ERDDAP™maintenant fait un\\[BigParent Directory\\]Cache/ (datasetID) répertoire pour chaque ensemble de données car il peut y avoir beaucoup de fichiers mis en cache.
* Nouveau[RSS2.01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)flux pour chaque ensemble de données (Cherchez l'orangeRSSicônes sur les listes de ensembles de données, formulaires d'accès aux données et pages Web Make A Graph) .
*   EDDGrid .kmlles réponses utilisent maintenant des images carrelées ("superoverlays" -- images quadtree générées dynamiquement) . L'image initiale se charge dans GoogleEarth beaucoup plus rapidement qu'auparavant. La résolution de la carte augmente lorsque vous zoomez, jusqu'à la résolution complète de l'ensemble de données. Recommander: les utilisateurs doivent demander.kmlpour un point de temps, mais la longitude entière de l'ensemble de données, plage de latitude. Malheureusement, la prise en charge des délais a été supprimée (J'espère qu'il reviendra.) .
*   ERDDAP™ajoute maintenant[Expire et Cache-Control en-têtes max-age](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)à tous les fichiers demandés dans le répertoire /images. Cela réduit considérablement le nombre de requêtes de fichiers statiques envoyées àERDDAPet ainsi accélère considérablement la plupart desERDDAP™chargement des pages. En outre, beaucoupJavaLes références de fichiers Script se sont déplacées vers le bas de leurs pages HTML, ce qui accélère également beaucoupERDDAP™chargement des pages. Merci au livre "High Performance Web Sites" de Steve Souders et l'ajout ySlow au plugin FireBug dans FireFox.
*   ERDDAP™passant de netcdf-java 2.2.22 à netcdf-java 4.0. Entre autres, cela permetEDDGridDeNcFiles à lireHDF .hdf, ainsi que GRIB .grb etNetCDF .ncfichiers.
*   EDDGridDeDap etEDDGridDeNcFiles prend également en charge DArray (ainsi que la DGrid)  dataVariablePar. Si une dimension n'a pas de variable de coordonnées correspondante,ERDDAP™crée une variable d'axe avec les valeurs d'index (Par exemple, 0, 1, 2, ..., 311, 312) . Donc tous les autres aspects deEDDGridrestent les mêmes:
\\* Il sert toujours tous les ensembles de données comme Grilles, avec une variable d'axe pour chaque dimension.
\\* Les requêtes peuvent toujours demander des valeurs à partir des variables d'axe.
Grâce à Charles Carleton, Thomas Im, Dorian Raymer et d'autres.
* LesWMS OpenLayerspages ont maintenant une longitude par défaut,latitude plage qui est un peu plus grande que la plage de données (pas la plage exacte, donc le contexte des petits ensembles de données est plus évident) . La plage par défaut peut maintenant être de 0 à 360, ce qui permet d'afficher la gamme complète de nombreux ensembles de données maintenant. Grâce àToddC'est Spindler.
* Nouveaux curseurs sur certains formulaires d'accès aux données et créer des pages Web graphique. Ils simplifient (brut) spécification des données souhaitées et offre une bonne rétroaction visuelle.
* Une nouvelle option pour&lt;ensemble de données&gt; tags dansdatasets.xml:[actif](/docs/server-admin/datasets#active).
* RéférencesERD'sERDDAP™changé de Coastwatch.pfel (fonctionne toujours via proxy) à Coastwatch.pfeg (préféré) .
* Nouveau soutien[data\\_minetdata\\_max](/docs/server-admin/datasets#data_min-and-data_max)attributs de métadonnées variables.
* Une solution partielle[WaitHelTryAgain / Résultats partiels Exception](/docs/server-admin/additional-information#waitthentryagain-exception): Maintenant, certaines demandes qui ont échoué précédemment lorsqu'un changement de source de données a été détecté réussiront parce queERDDAP™rechargera l'ensemble de données et redemandera automatiquement les données, toutes dans le contexte de la demande initiale.
* Correction du bug & #160;: générer Données Xml était désactivéERDDAP™de la version 1.12. Merci à Ellyn Montgomery de l'avoir signalé.
* Petits changements à la gestion des erreurs.
* Beaucoup d'améliorations à éviter / traiter avec les conditions de course possibles (c'est-à-dire les problèmes éventuels découlant de la nature multi-threadedERDDAP) qui ont causé de petits problèmes peu fréquents.
* Maintenant, si un message d'erreur est écrit sur une image, l'image restera seulement dans le cache pendant ~5-10 minutes (pas 60) . Grâce à Cara Wilson.
* Le message standard quand il n'y a pas de données est maintenant "Votre requête n'a produit aucun résultat correspondant.", qui est plus court, plus précis, et correspondOPeNDAPles serveurs.
*   EDDGridne permet plus les valeurs de l'axe attaché.
* Petits changements aux demandes .ver et .help.
* Beaucoup de petits changements et corrections de bugs.
     

## Version 1.12{#version-112} 
 (publié le 2008-10-31) 

* Tableau EDD deSOSencore une fois travaille avec NDBCSOSet travaille avec le nouveau NOSSOS.
* EDDTableFromBMDE nécessite maintenantERDDAP™admin à spécifierdataVariablePar.
*   EDDGridne nécessite plus que lat et lon soient également espacés pour . transparent Png ou.kml. Grâce àToddC'est Spindler.
* Quelques petits changements.
     

## Version 1.10{#version-110} 
 (publié 2008-10-14) 

* Nouvelles métadonnées "colorBar" pour les variables de données dansdatasets.xmldéfinit les paramètres de la barre de couleurs par défaut pour les graphiques et les cartes. Voir[plus d'informations](/docs/server-admin/datasets#color-bar-attributes). Ceci est important parce qu'il améliore considérablement l'apparence des graphiques et des cartes par défaut produits par Make A Graph et parce que les graphiques et les cartes par défaut ont maintenant une barre de couleurs cohérente même lorsque le client change le temps ou la plage géographique demandé. En outre, cela était nécessaire pourWMS.
*   ERDDAP™dessert la plupart des données de maillage parWMSservice. Ceci est important parce qu'il montre que, en plus d'obtenir des données de nombreux types de serveurs de données,ERDDAP™peut distribuer des données via différents protocoles (DAP,WMS, ... plus à l'avenir) . Voir[documentation du client](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html). Ou les[documentation destinée aux administrateurs](/docs/server-admin/datasets#wms). Ou[Essaie.](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html).
* Nouveau support pour les valeurs de longitude &gt;180 en.kmlfichiers.
* Nouveau type cdm\\_data\\_: Autre .
*   ERDDAP™maintenant prend en charge les données source "boolean". Voir[plus d'informations](/docs/server-admin/datasets#boolean-data)Cela deviendra utile pour le futur EDDTableFromDatabase.
* Nouvelle table EDDFromBMDE prend en charge les sources de données DiGIR/BMDE.
* EDVGridAxis permet désormais de descendre les valeurs triées. Les ensembles de données pmelOscar en avaient besoin.
*   ERDDAP™retourne maintenant les erreurs HTTP (Par exemple, «404 pour la ressource/page non trouvée») dans plus de situations, au lieu de pages HTML avec des messages d'erreur.
* Beaucoup de changements/additions auERDDAP™la documentation.
* Beaucoup de petits changements.
* Des corrections de bugs.
*    **Les chosesERDDAP™les administrateurs devraient faire pour passer à cette version:** 
    * Endatasets.xml, pour toute table EDDSOSles ensembles de données, changent les métadonnées "observedProperty" en "sourceObservedProperty".
    * Les règles pouraxisVariableoudataVariable'sdestinationNamesont maintenant[plus strict](/docs/server-admin/datasets#datavariable-addattributes). Vous devez vérifier que vos noms de variables sont valides. Soit les vérifier à la main, soit courirERDDAP™et regardez les messages d'erreur dans le rapport qui est envoyé par courriel à l'administrateur.
    * Endatasets.xml, si vous voulez qu'une variable de données de grille soit accessible viaWMS, vous devez ajouter des métadonnées colorBar. Au moins, par exemple,&lt;Nom de l'entreprisecolorBarMinimum"type"double"&gt;0&lt;/att&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Voir[plus d'informations](/docs/server-admin/datasets#wms).
    * Ajouter ce qui suit à votre[configuration.xml](/docs/server-admin/deploy-install#setupxml)fichier (mais personnalisez-le avec vos informations) :

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## Version 1.08{#version-108} 
 (publié le 2008-07-13) 

* Un nouveau service web enERDDAP™, générer Données Xml, aideERDDAP™en créant une ébauche du XML nécessaire pour décrire un ensemble de donnéesdatasets.xml
* Quelques modifications/corrections liées à la possibilité que griddap soit vu par netcdf-java comme un serveur opendap, y compris : les métadonnées globales sont désormais étiquetées "NC\\_GLOBAL" (au lieu de "GLOBAL") .
* LesEDDGridet EDDTable Data Access Forms utilisent maintenant les informations de requête dans l'URL. Ainsi, par exemple, si un utilisateur passe d'un formulaire Make A Graph à un formulaire d'accès aux données, les contraintes sont désormais correctement transférées.
*   tabledap's Make A Graph permet désormais des contraintes sur les variables String.
* Le graphique Make A de EDDTable permet désormais des contraintes NaN. Grâce à Steve Hankin.
* Correction du bug : EDDTable enregistrer AsImage n'a pas correctement reconnu les valeurs .colorbar min et max. Merci à Steve Hankin
* De nombreuses améliorations à la configurationDatasetsXml. Grâce à Ellyn Montgomery.
* Les requêtes Griddap permettent maintenant () -style demande un peu en dehors de l'axe réel. Cela est approprié puisque () -les valeurs sont arrondies à la valeur réelle la plus proche. Merci à Cindy Bessey
* J'ai fait le test FloatArray et DoubleArray d'EvenlySpaced plus sophistiqué. Il sera toujours imparfait (parce que le test devrait être personnalisé pour chaque ensemble de données) Mais ça devrait être mieux. Grâce à Ellyn Montgomery.
* J'ai déplacé setup.html et setupDatasets Xml.html répertoire erddap /download et codé tous les liens vers eux. Maintenant, je peux apporter des modifications et mettre à jour les informations de configuration immédiatement.
* Beaucoup de petits changements. Quelques petites corrections.
*    **Les chosesERDDAP™les administrateurs devraient faire pour passer à cette version:** 
    * Déplacer&lt;la description abrégée Html&gt; de vos messages.xml à votre[configuration.xml](/docs/server-admin/deploy-install#setupxml)fichier. Il spécifie le texte qui apparaît au milieu du côté gauche de laERDDAP™page d'accueil. Ajouter&lt;h1&gt;ERDDAP&lt;/h1&gt; (ou un autre titre) au sommet. **Ou,** copie&lt;le ShortDescriptionHtml&gt; dans le nouveau[configuration.xml](/docs/server-admin/deploy-install#setupxml)fichier (du nouveau contenu erddap.zip) dans votre setup.xml.
         

## Version 1.06{#version-106} 
 (publié le 2008-06-20) 

* Nouveau soutienIOOS DIF SOSles sources de données.
* Beaucoup de petits changements. Quelques petites corrections.
     

## Version 1.04{#version-104} 
 (publié le 2008-06-10) 

* Nouvelle fonction de tri de diapositives.
* Nouvelle page Google Gadgets et exemples.
* Correction du bogueEDDGrid.saveAsNc pour variable avec échelle et addOffset.
     

## Version 1.02{#version-102} 
 (publié 2008-05-26) 

* NouveauEDDGridSideBySide permet différentesaxisVariables\\[0\\]Source Valeurs.
* Tous les ensembles de données sur les courants et les vents ont été fusionnés enEDDGridEnsembles de données SideBySide.
* Les images des requêtes d'image sont maintenant mises en cache pendant 1 heure.
     

## Version 1.00{#version-100} 
 (publié le 2008-05-06) 

* Créer des pages Web et des commandes graphiques dans les URLs.
* Prise en charge des fichiers drapeau pour forcer le rechargement d'un jeu de données.
* Nouveau type d'ensemble de données: EDDTableFrom4DFiles (la première sous-classe de EDDTableFromFiles) .
