---
sidebar_position: 9
---
# Prométhée

 [Mesure de Prométhée](https://prometheus.io/) sont disponibles à /erddap/metrics. Les paramètres de base de JVM ont été ajoutés en 2,25 avec de nombreux ERDDAP™ métriques ajoutées dans la version 2.26. Si vous voulez utiliser les mesures, assurez-vous d'être dans au moins la version 2.26. Ils sont activés par défaut, vous pouvez les désactiver en ajoutant
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
sur votre setup.xml.

Ces mesures sont conçues pour être lisibles par machine. Bien que vous puissiez vérifier la page métriques manuellement, pour la surveillance en profondeur, il est recommandé d'utiliser un serveur Prométhée. Un serveur Prométhée stockera des métriques historiques qui permettent une surveillance plus approfondie (taux similaires et variations par rapport aux valeurs antérieures) , et est aussi souvent exécuté avec un serveur Grafana. Nous fournissons quelques tableaux de bord préconstruits que les administrateurs peuvent trouver utiles pour commencer à surveiller leurs serveurs.

## Lancer le serveur Prométhée

La meilleure documentation pour faire fonctionner la pile de surveillance (Prométhée + Grafana) est dans le Prométhée [lire](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md) .

##  ERDDAP™ métriques

### JVM

 ERDDAP™ exporte un certain nombre de mesures que vous pouvez trouver utiles (à partir de ERDDAP™ 2,25) . Pour la surveillance générale de la santé du JVM, nous utilisons les mesures recueillies par le client Prométhée. Cela comprend des données sur la collecte des ordures, l'utilisation de la mémoire, les fils, et plus encore. Pour plus d'informations, voir [Prométhée Java Documentation du client JVM](https://prometheus.github.io/client_java/instrumentation/jvm/) .

###  ERDDAP™ spécifiques

Nous exportons également un certain nombre de ERDDAP™ métriques spécifiques (à partir de ERDDAP™ 2.26) . Si vous voulez creuser dans le code, vous pouvez trouver les métriques collectées dans [métrique.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java) .

####  ERDDAP _construire_info

Voici les informations de construction pour le ERDDAP™ serveur. Il comprend la version (majeur.mineur) , version_remplie (Major.minor.patch) , et de déploiement_info (utilisé pour indiquer comment le serveur est déployé, comme 'Docker ') .

#### _flags de fonctionnalités

Ceci est une métrique d'info qui montre l'état actuel des drapeaux de fonction. La plupart des options de configuration booléenne sont considérées comme des drapeaux.

#### tamponné Image

C'est une info métrique qui indique si l'accélération graphique est disponible.

####  http _request_duration_secondes

Il s'agit d'un histogramme des durées de réponse de la demande en secondes. Les étiquettes sont request_type (par exemple griddap, tabledap , fichiers, wms) , dataset_id (le cas échéant, répète le type de demande) _Type de fichier (format de sortie pour la demande Par exemple, '.html', '.csv', '.iso19115 ') , code_lang (langue pour la requête, ou chaîne vide si par défaut) , code_état ( http code de statut de la demande, par exemple 200, 302, 404) .

Ceci peut être utilisé pour suivre les requêtes par l'id dataset pour déterminer les ensembles de données populaires du serveur. Il peut également aider à identifier s'il y a des types particuliers de requêtes qui sont lents sur votre serveur.

#### touch_thread_duration_secondes

Un histogramme des durées des tâches de fil tactile. Ils sont étiquetés avec succès (vrai/faux) .

#### tâche_thread_duration_secondes

Un histogramme des durées du fil de travail. Ils sont étiquetés avec succès (vrai/faux) et type de tâche (entier) .

#### load_datasets_duration_secondes

Un histogramme de durée pour les tâches d'ensemble de données de charge. Ils sont étiquetés avec (vrai/faux) .

#### e-mail_thread_duration_secondes

Un histogramme des durées des tâches de thread email. Ils sont étiquetés avec succès (vrai/faux) .

#### e-mail_count_distribution

Un histogramme de courriels par tâche.

#### nombre_dataset

Une jauge des ensembles de données, définie après chaque appel de ensembles de données de charge. Ceci est étiqueté avec la catégorie (grille, tableau) .

#### dataset_failed_load_count

Une jauge des ensembles de données qui n'ont pas été chargés, définie après chaque appel de ensembles de données de charge.

#### total des demandes

Contrepartie des demandes qui ont été déposées. Le serveur envoie une requête lorsqu'il croit que le serveur est faible en mémoire (RAM) et la demande causerait des problèmes. Cela n'inclut pas les requêtes que l'erreur due à un faible espace RAM ou disque pendant la gestion de la demande.

#### memory_emails_total dangereux

Contre-temps le serveur tente d'envoyer un email à l'administrateur que la mémoire est dangereusement faible.

#### _Défauts_de_mémoire dangereux_total

Contre-demandes qui ont échoué en raison de la machine en panne de mémoire. Souvent c'est parce que la machine reçoit beaucoup de demandes coûteuses ou que la demande individuelle était exceptionnellement grande.

#### Total des demandes

Compteur des demandes de données de topo. Ceci est marqué cache (cached/not_cached) .

#### Compteurs de frontières

Il y a aussi une collection de comptoirs pour les demandes de limites :

 - national_boundaires_request_total
 - État_boundarys_request_total
 - riviére_boundaires_request_total
 - Total des demandes

Ils sont étiquetés avec le statut (grossière, le succès, jeté) .
