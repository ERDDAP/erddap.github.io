---
title: "ERDDAP™ and the Cloud"
---
# ERDDAP™et le nuage

## Qu'est-ce que le nuage

La définition la plus simple n'est pas les serveurs locaux. Ceci est très large et peut signifier de nombreuses configurations différentes. Par exemple, il pourrait s'agir d'un serveur physique dédié dans un centre de données, un serveur privé virtuel, un serveur partagé, sans serveur, ou autre chose.

### Pourquoi Nuage

Il y a de nombreuses raisons pour lesquelles les organisations veulent passer au cloud. La plus importante est la flexibilité qu'elle offre pour les besoins de calcul/stockage par rapport à l'achat de matériel physique.

Cela élimine la nécessité de maintenir un datacenter/serveur. Il permet également d'étendre les ressources de calcul à vos besoins actuels. Tout comme le nuage peut signifier beaucoup de choses différentes, être capable d'évaluer vos ressources aussi bien. Cela pourrait signifier payer pour plus (ou moins) ressources sans serveur. Cela pourrait signifier passer d'un serveur partagé à un serveur privé. Cela pourrait signifier une mise à niveau vers un plus grand serveur physique dédié.

## PeutERDDAP™courir dans le nuage ?

Oui.

ERDDAP™est conçu pour fonctionner au sein de Tomcat qui peut être exécuté localement ou dans des environnements nuageux. Il y a un soutien communautaire pour courir à Docker et il y a[fonctionnaire Docker soutien à venir bientôt](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md).

Cela dit,ERDDAP™a été conçu à un moment où les serveurs dédiés étaient la norme. Il n'est pas sans serveur, et serait extrêmement difficile sinon impossible de le rendre sans serveur.

### PeutERDDAP™échelle ?

ÉlargissementERDDAP™est plus compliqué que d'utiliser plus de ressources sans serveur. Nous avons une bonne documentation sur[comment évaluerERDDAP™](https://erddap.github.io/docs/server-admin/scaling). Faciliter l'échelleERDDAP™C'est quelque chose qui nous intéresse.

### Qu'est-ce qui empêche le calibrage automatique?

ERDDAP™fait beaucoup de choses, y compris garder les ensembles de données à jour, informer les abonnés des modifications apportées aux ensembles de données, stocker les données, traiter les demandes des utilisateurs, et plus encore. Pour une taille suffisanteERDDAP™serveur comme[Garde côtière](https://coastwatch.pfeg.noaa.gov/erddap/index.html), cela signifie qu'il fait continuellement quelque chose. L'utilisation continue est en fait une situation extrêmement coûteuse pour les options sans serveur (vous payez une grande prime pour calculer sans serveur et donc l'avantage principal est quand vous ne faites que des appels occasionnels) . En outre, essayer de déplacer tous lesERDDAP™Les différentes fonctionnalités des versions sans serveur se retrouveraient avec une configuration beaucoup plus compliquée requise pour les admins.

### PeutERDDAP™utiliser Cloud Storage?

Oui.

ERDDAP™prend en charge le stockage en nuage (y compris AWS S3) et amélioration de cet appui (par exemple non-AWS S3) est une priorité élevée sur leERDDAP™la feuille de route pour le développement.ERDDAP™est également capable de tirer des données de nombreux services en ligne existants. Pour plus d'informations, je recommande de consulter notre[documentation de type de données](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types).
