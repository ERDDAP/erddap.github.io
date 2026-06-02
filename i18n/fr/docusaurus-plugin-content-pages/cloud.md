---
title: "ERDDAP™ and the Cloud"
---
#  ERDDAP™ et le nuage

## Qu'est-ce que le nuage

La définition la plus simple n'est pas les serveurs locaux. Ceci est très large et peut signifier de nombreuses configurations différentes. Par exemple, il pourrait s'agir d'un serveur physique dédié dans un centre de données, un serveur privé virtuel, un serveur partagé, sans serveur, ou autre chose.

### Pourquoi Nuage

Il y a de nombreuses raisons pour lesquelles les organisations veulent passer au cloud. La plus importante est la flexibilité qu'elle offre pour les besoins de calcul/stockage par rapport à l'achat de matériel physique.

Cela élimine la nécessité de maintenir un datacenter/serveur. Il permet également d'étendre les ressources de calcul à vos besoins actuels. Tout comme le nuage peut signifier beaucoup de choses différentes, être capable d'évaluer vos ressources aussi bien. Cela pourrait signifier payer pour plus (ou moins) ressources sans serveur. Cela pourrait signifier passer d'un serveur partagé à un serveur privé. Cela pourrait signifier une mise à niveau vers un plus grand serveur physique dédié.

## Peut ERDDAP™ courir dans le nuage ?

Oui.

 ERDDAP™ est conçu pour fonctionner au sein de Tomcat qui peut être exécuté localement ou dans des environnements nuageux. L'image officielle Docker est disponible à [Centre Docker](https://hub.docker.com/r/erddap/erddap) . Les `erddap:alpha-latest` tag est une compilation basée sur les derniers changements (quelque chose comme une sortie "nuit", [détails alpha-derniers](https://hub.docker.com/layers/erddap/erddap/alpha-latest/) ) , pendant `erddap:dernier` est la plus récente version testée ( [derniers détails](https://hub.docker.com/layers/erddap/erddap/latest/) ) . Vous pouvez également consulter les versions du registre des conteneurs GitHub [Paquets GitHub](https://github.com/ERDDAP/erddap/pkgs/container/erddap) . Vous pouvez en savoir plus sur l'utilisation ERDDAP™ avec [Coq](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .

Pour les déploiements de Kubernetes, voir les nouveaux déploiements de Kubernetes [la documentation](https://erddap.github.io/docs/server-admin/admin-tips/deploy-kubernetes) .

Cela dit, ERDDAP™ a été conçu à un moment où les serveurs dédiés étaient la norme. Il n'est pas sans serveur, et serait extrêmement difficile sinon impossible de le rendre sans serveur.

### Peut ERDDAP™ échelle ?

Élargissement ERDDAP™ est plus compliqué que d'utiliser plus de ressources sans serveur. Nous avons une bonne documentation sur [comment évaluer ERDDAP™ ](https://erddap.github.io/docs/server-admin/scaling) . Faciliter l'échelle ERDDAP™ C'est quelque chose qui nous intéresse.

### Qu'est-ce qui empêche le calibrage automatique?

 ERDDAP™ fait beaucoup de choses, y compris garder les ensembles de données à jour, informer les abonnés des modifications apportées aux ensembles de données, stocker les données, traiter les demandes des utilisateurs, et plus encore. Pour une taille suffisante ERDDAP™ serveur comme [Garde côtière](https://coastwatch.pfeg.noaa.gov/erddap/index.html) , cela signifie qu'il fait continuellement quelque chose. L'utilisation continue est en fait une situation extrêmement coûteuse pour les options sans serveur (vous payez une grande prime pour calculer sans serveur et donc l'avantage principal est quand vous ne faites que des appels occasionnels) . En outre, essayer de déplacer tous les ERDDAP™ Les différentes fonctionnalités des versions sans serveur se retrouveraient avec une configuration beaucoup plus compliquée requise pour les admins.

### Peut ERDDAP™ utiliser Cloud Storage?

Oui.

 ERDDAP™ prend en charge le stockage en nuage (y compris AWS S3) et amélioration de cet appui (par exemple non-AWS S3) est une priorité élevée sur le ERDDAP™ la feuille de route pour le développement. ERDDAP™ est également capable de tirer des données de nombreux services en ligne existants. Pour plus d'informations, je recommande de consulter notre [documentation de type de données](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) .
