---
sidebar_position: 3
---
#  ERDDAP™ Processus de libération
* Assurez-vous que les fichiers de comparaison d'images sont disponibles (ça pourrait vouloir dire courir `mvn vérifier` , si vous voulez accélérer cette limite jusqu'au seul groupe ImageComparison bien que note qui nécessite toujours des tests Jetty) 
* Mise à jour des dépendances
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Mettre à jour les plugins
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Exécuter des tests pour s'assurer que les mises à jour de dépendance n'ont rien cassé pour toutes les configurations majeures (les ensembles de données en particulier, bien que tous les autres paramètres importants ainsi) . Notez que la suite de test externe peut être très floue. La suite de test lentAWS peut prendre très longtemps.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Utiliser TranslateMessages.translate () mettre à jour les traductions si nécessaire
* EDStatic.java définit le développement Mode à faux, modifier le numéro de version et spécifier la date de sortie.
* Faites la construction
```
mvn clean
mvn compile
mvn package
```
## Canaries
Envoyez le fichier de guerre pour distribution sur le serveur Coastwatch ou un autre serveur qui utilise la plupart des types de données et reçoit beaucoup de trafic.
Nous voulons essayer de trouver des erreurs avant une distribution plus large de la construction.

Inclure le message lorsqu'on parle d'une nouvelle version.

La procédure standard est la suivante:
* Télécharger le fichier .war vers Coastwatch \\[ Tomcat \\] /content/erddap/
* Comme utilisateur=tomcat:
  * En \\[ Tomcat \\] /bin/ :
./shutdown.sh //utiliser "ps -fu tomcat" pour s'assurer qu'il a cessé
  * En \\[ Tomcat \\] /webapps/ :
rm -rf erddap
Je suis erddap. guerre
cp ../content/erddap/erddap2.22. guerre erddap.war //ou quel que soit le numéro
  * En \\[ Tomcat \\] /bin/ :
./démarrage.sh
  * Après ERDDAP a retourné une page Web, dans \\[ Tomcat \\] /webapps/ :
erddap erddap
erddap
erddap

## Sortie de GitHub
Ébauche de la version GitHub, incluant erddap.war et erddapContent .zip   (aucun numéro de version) 

title: The official v2.25 version
décrire: Voir la liste des modifications à
      https://erddap.github.io/changes#version-225

## Mise à jour de la documentation
* Mettre à jour le numéro de version dans le fichier docusaurus.config.ts (dans la section du pied de page) .
* Modifier les pages de documentation (deploy-install.md et deploy-update.md) .
  * Rechercher \\[ Guerre \\]  
  * Copier les informations existantes (légèrement reformaté) à la liste des installations antérieures 2.
  * Modifier l'information de publication actuelle pour erddap. la guerre à \\[ Guerre \\] 
* Exécutez les traductions pour le site de documentation.
* Faites une demande de tirage et fusionnez les modifications.
* Déployer le site de documentation (voir lecture) .

## S'assurer que les autres dépôts sont à jour au besoin
Cela signifie principalement ErddapContent et ErddapTest, mais ils doivent être tenus à jour pendant les changements de développement.

## Aviser les utilisateurs
Informez d'abord les utilisateurs des modifications demandées (ou dont les bogues ont été corrigés) . Donnez-leur le temps de vérifier les changements et/ou de soulever des questions.

 ERDDAP version 2.25 est maintenant disponible&#33;

Vous pouvez lire les changements à
https://erddap.github.io/changes#version-225

Certains changements sont des changements que vous avez suggérés. Merci beaucoup pour vos suggestions. Recherchez votre nom dans la liste des modifications pour voir les détails. Ce serait super si vous pouviez essayer les nouvelles fonctionnalités bientôt, avant que je annonce cette nouvelle version à un public plus large.

Si vous êtes un ERDDAP administrateur, les instructions pour la mise à niveau sont à
https://erddap.github.io/docs/server-admin/deploy-update

Si vous avez des problèmes, des questions, des suggestions, veuillez m'envoyer un courriel.

Merci d'utiliser ERDDAP .

### Annoncer la sortie
Envoyer une annonce à la liste d'envoi des annonces.
