# Options

Cette page documente les drapeaux de configuration disponibles dans le système. Ces drapeaux contrôlent diverses caractéristiques, capacités expérimentales et comportements hérités.

##  **Légende du cycle de vie du drapeau** 

*  **Stable :** Conçu comme des drapeaux à long terme pour permettre aux administrateurs de changer de fonctionnalité. En sécurité pour la production.
*  **Essai:** Caractéristiques prêtes à être testées. Ceux-ci seront soit gradués à "Stable" ou éventuellement fixés à leur valeur cible et faire enlever le drapeau.
*  **En construction :** Actuellement codé à faux dans le code, indépendamment de la configuration. La fonction n'est pas encore prête à être utilisée.

##  **( ) Optimisations des essais** 

Ces drapeaux sont susceptibles d'être enlevés à l'avenir.

###  **touchThreadOnlyQuand les éléments** 

Désignation des marchandises
Signal d'optimisation. Si vrai, le thread tactile ne fonctionne que lorsqu'il y a des éléments à traiter.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Essais | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté au 2.29.0 | 

###  **TaskCacheClear** 

Désignation des marchandises
Active la tâche de fond qui efface les éléments expirés du cache.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté au 2.27.0 | 

###  **ncHeaderMakeFile** 

Désignation des marchandises
Si true le serveur va générer l'ensemble du fichier nc avant de créer le résultat ncheader. La nouvelle (préféré) comportement quand false doit générer directement le résultat ncheader.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Essais | 
 |   **Par défaut actuel**   | faux | 
 |   **Objectif à long terme**   | faux | 
 |   **Historique**   | Ajouté au 2.29.0 | 

###  **UtiliserEddReflexion** 

Désignation des marchandises
Permet l'utilisation de Java Réflexion pour initier l'EDD ( ERDDAP Ensemble de données) cours.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Essais | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | La valeur par défaut est passée à true en 2.28.0, ajoutée en 2.25 | 

###  **backgroundCreateSubsetTables** 

Désignation des marchandises
Permet de créer des tables sous-ensembles dans les threads de fond pour améliorer le temps de chargement des ensembles de données.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Essais | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté au 2.29.0 | 

###  **utiliserNcMetadataForFileTable** 

Désignation des marchandises
Utilisations NetCDF métadonnées pour remplir la vue de la table de fichier. En particulier si un fichier nc inclut real_range pour chaque variable, le chargement de l'ensemble de données peut sauter la lecture du fichier entier.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté au 2.29.0 | 

##  **Système et comportement de base** 

###  **Courriel Est actif** 

Désignation des marchandises
Contrôle si le système tente d'envoyer des courriels réels (Par exemple, pour les mises à jour d'abonnement ou les rapports d'erreurs) via le serveur SMTP configuré.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | faux | 
 |   **Objectif à long terme**   | vrai (Selon la configuration de l'administration)   | 
 |   **Historique**   | Héritage | 

:::info Logique
Ce drapeau est calculé dynamiquement au démarrage. Il est par défaut false à moins que toutes les identifiants SMTP requis (hôte, port, utilisateur, mot de passe, adresse) sont strictement fournis dans setup.xml.
:: :

###  **AfficherLoadErrorsOnStatusPage** 

Désignation des marchandises
Détermine si des erreurs de charge détaillées sont affichées publiquement sur la page d'état.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | réglé comme désiré | 
 |   **Historique**   | Ajouté en 2.25 | 

###  **par défautAccessibleViaFiles** 

Désignation des marchandises
Définit le comportement par défaut pour savoir si les fichiers sous-jacents d'un jeu de données peuvent être consultés dans le service de fichiers.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | faux | 
 |   **Objectif à long terme**   | faux | 
 |   **Historique**   | Ajouté en 2.10 | 

##  **Données** 

###  **Démarrage rapide** 

Désignation des marchandises
S'il est activé, le système tente de démarrer plus rapidement en sautant certaines vérifications profondes de validation des ensembles de données pendant l'initialisation.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté en 1.38 | 

###  **activerEnvParsing** 

Désignation des marchandises
Permet de traiter la datasets.xml fichier avec un [Sous-titrage](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Cela a de nombreuses utilisations, y compris la fixation de valeurs privées (comme les mots de passe) utilisant des variables d'environnement.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | réglé comme désiré | 
 |   **Historique**   | Ajouté au 2.29.0 | 

###  **utiliserSaxParser** 

Désignation des marchandises
Commute le moteur d'analyse XML interne pour utiliser un SAX (API simple pour XML) parser au lieu de l'analyseur DOM. Cela permet de nouvelles fonctionnalités avancées comme XInclude, et [attributs d'affichage personnalisés](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Essais | 
 |   **Par défaut actuel**   | faux | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté en 2.25 | 

###  **listPrivateDatasets** 

Désignation des marchandises
Déterminer si des ensembles de données privés (ceux qui nécessitent une authentification) apparaissent dans la liste de données principale.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | faux | 
 |   **Objectif à long terme**   | faux | 
 |   **Historique**   | Ajouté en 1.20 | 

###  **politiques** 

Désignation des marchandises
Contrôle si des frontières politiques peuvent être tracées sur des cartes.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté en 1.80 | 

##  **Métadonnées et normes** 

###  **fgdcActivé** 

Désignation des marchandises
Génére et sert la FGDC (fédéral géographique Comité des données) métadonnées.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté en 1.38 | 

###  **iso19115 Activité** 

Désignation des marchandises
Génére et sert les métadonnées ISO 19115.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté en 1.38 | 

###  **utiliserSisISO19115** 

Désignation des marchandises
Utilise la bibliothèque Apache SIS pour générer des métadonnées ISO 19115 au lieu du générateur existant. Si ce n'est pas le cas, les métadonnées IOS 19115 par défaut seront au format ISO19115_3_2016. Si c'est faux, le format par défaut sera dans le format ISO19115_2 modifié.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Essais | 
 |   **Par défaut actuel**   | faux | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté en 2.26 | 

###  **UtilisationSisISO19139** 

Désignation des marchandises
Utilise la bibliothèque Apache SIS pour générer des métadonnées ISO19139_2007.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Essais | 
 |   **Par défaut actuel**   | faux | 
 |   **Objectif à long terme**   | faux | 
 |   **Historique**   | Ajouté au 2.29.0 | 

###  **JsonldActive** 

Désignation des marchandises
Génére et sert JSON-LD (Données liées) métadonnées.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Héritage | 

###  **générerCroissantSchema** 

Désignation des marchandises
Génére le schéma de métadonnées "Croissant" comme schéma par défaut pour la préparation à l'apprentissage automatique.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Essais | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté au 2.28.0 | 

###  **VariablesMustHaveIoosCatégorie** 

Désignation des marchandises
Applique que les variables doivent avoir un attribut de catégorie IOOS.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | réglé comme désiré | 
 |   **Historique**   | Héritage | 

###  **inclureNcCFSubsetVariables** 

Désignation des marchandises
Le comportement hérité devait générer des variables sous-ensembles uniquement pour les ensembles de données EDDTableFromNcCFFiles. Ceci a été ajouté au comportement par défaut pour EDDTableFromNcCFFiles pour être cohérent avec d'autres types de données. Si vous avez besoin de l'héritage automatique subsetVariables Tu peux activer ça. La meilleure solution serait d'ajouter subsetVariables à la définition de l'ensemble de données.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Essais | 
 |   **Par défaut actuel**   | faux | 
 |   **Objectif à long terme**   | faux | 
 |   **Historique**   | Ajouté en 2.26 | 

##  **Abonnements et notifications** 

###  **abonnementSystemActive** 

Désignation des marchandises
Active le système d'abonnement par courriel pour les mises à jour des ensembles de données.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté en 1.14 | 

###  **subscribeToRemoteErddapDataset** 

Désignation des marchandises
Permet cela ERDDAP instance pour s'abonner à distant ERDDAP ensembles de données pour les mises à jour.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté en 1.70 | 

###  **updateSubsRssOnFileChanges** 

Désignation des marchandises
L'abonnement et RSS mises à jour lorsque les fichiers sous-jacents changent. Le comportement de l'héritage était seulement de faire des mises à jour sur l'ensemble de données recharger (que certains serveurs avaient aussi rarement qu'hebdomadaire) .

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté en 2.26 | 

###  **activer MqttBroker** 

Désignation des marchandises
Démarre un courtier MQTT interne dans l'application pour gérer la messagerie.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Essais | 
 |   **Par défaut actuel**   | faux | 
 |   **Objectif à long terme**   | réglé comme désiré | 
 |   **Historique**   | Ajouté au 2.29.0 | 

###  **publierMqttNotif** 

Désignation des marchandises
Permet la publication des notifications (comme les changements d'ensemble de données) au courtier du MQTT.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Essais | 
 |   **Par défaut actuel**   | faux | 
 |   **Objectif à long terme**   | réglé comme désiré | 
 |   **Historique**   | Ajouté au 2.29.0 | 

##  **En-têtes/Configuration Web** 

###  **UtilisationEn-têtesPour Autres** 

Désignation des marchandises
Permet d'utiliser des en-têtes HTTP pour déterminer les détails de l'URL de la requête (utile derrière les proxies) .

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Par défaut modifié à true dans 2.28.0, Ajouté dans 2.27.0 | 

###  **activer Les cors** 

Désignation des marchandises
Permet le partage des ressources entre les pays d'origine (CORS) en-têtes sur les réponses HTTP.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | faux | 
 |   **Objectif à long terme**   | réglé comme désiré | 
 |   **Historique**   | Ajouté en 2.26 | 

##  **Recherche** 

###  **utiliserLuceneSearchEngine** 

Désignation des marchandises
Commute le moteur de recherche interne pour utiliser Apache Lucene.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Essais | 
 |   **Par défaut actuel**   | faux | 
 |   **Objectif à long terme**   | ? | 
 |   **Historique**   | Héritage | 

##  **Services et protocoles** 

###  **fichiersActive** 

Désignation des marchandises
Active la vue du navigateur "Files" pour les ensembles de données qui le supportent.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté en 1.58 | 

###  **convertisseursActive** 

Désignation des marchandises
Active les outils de conversion dans l'interface utilisateur.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté en 1.44 | 

###  **slideSorterActive** 

Désignation des marchandises
Active le trieur de diapositives.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté en 1.44 | 

###  **dataProviderFormActive** 

Désignation des marchandises
Active le formulaire permettant aux fournisseurs de données d'entrer des métadonnées.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Héritage | 

###  **horsdedateDatasetsActive** 

Désignation des marchandises
Permet la déclaration des ensembles de données périmés.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté en 1.82 | 

###  **WmsActive** 

Désignation des marchandises
Active le service de carte Web ( WMS ) interface.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Ajouté en 1.44 | 

###  **wmsClientActive** 

Désignation des marchandises
Active le WMS caractéristiques du client.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | Stable | 
 |   **Par défaut actuel**   | vrai | 
 |   **Objectif à long terme**   | vrai | 
 |   **Historique**   | Héritage | 

###  **géoServicesRestActive** 

Désignation des marchandises
Active le RESTful interface pour les services géospatials. Non intégralement mis en œuvre.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | En construction | 
 |   **Par défaut actuel**   | faux (Codage dur)   | 
 |   **Objectif à long terme**   | vrai | 

###  **wcsActive** 

Désignation des marchandises
Active le service de couverture Web ( WCS ) interface. Non intégralement mis en œuvre.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | En construction | 
 |   **Par défaut actuel**   | faux (Codage dur)   | 
 |   **Objectif à long terme**   | vrai | 

###  **sosActive** 

Désignation des marchandises
Active le service d'observation des capteurs ( SOS ) interface.

 | Biens | Détails | 
 | - Oui. | - Oui. | 
 |   **Cycle de vie**   | En construction | 
 |   **Par défaut actuel**   | faux (Codage dur)   | 
 |   **Objectif à long terme**   | vrai | 
