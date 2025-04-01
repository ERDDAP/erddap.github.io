---
sidebar_position: 2
---
# Mise à jour
Comment faire une mise à jour d'unERDDAP™sur votre serveur

## Changements{#changes} 
1. Effectuer les modifications énumérées dans[Changements](/changes)dans la section intitulée « QuestionsERDDAP™Les administrateurs doivent savoir et faire » pour tous lesERDDAP™versions depuis la version que vous utilisiez.
     
## Java {#java} 
2. Si vous mettez à niveau à partir deERDDAP™version 2.18 ou ci-dessous, vous devez passer àJava21 (ou plus récents) et le Tomcat 10. VoirERDDAP™instructions d'installation pour[Java](/docs/server-admin/deploy-install#java)et[Tomcat](/docs/server-admin/deploy-install#tomcat). Vous devrez également copier votre_tomcat_/content/erddaprépertoire depuis votre ancienne installation Tomcat vers votre nouvelle installation Tomcat.

## Télécharger{#download} 
3. Télécharger[Guerre](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)dans _tomcat_/webapps .
     (version 2.26, 607,404,032 octets, MD5=99a725108b37708e5420986c1616a119, datée du 03-31-2025) 
     
## messages.xml{#messagesxml} 
4. 
    * Fréquent: Si vous mettez à niveau à partir deERDDAP™version 1.46 (ou au-dessus) et vous utilisez simplement les messages standard, les nouveaux messages standard.xml seront installés automatiquement (parmi les fichiers .class via erddap. guerre) .
         
    * Rare: Si vous mettez à niveau à partir deERDDAP™version 1.44 (ou moins) ,
vous DEVEZ supprimer l'ancien fichier message.xml:
        _tomcat_/content/erddap/messages.xml .
Le nouveau standard message.xml sera installé automatiquement (parmi les fichiers .class via erddap. guerre) .
         
    * Rare: Si vous modifiez toujours le fichier message.xml standard (en place) ,
vous devez apporter ces modifications au nouveau fichier message.xml (qui est
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml après erddap.war est décomprimé par Tomcat).
         
    * Rare: Si vous maintenez un fichier Messages.xml personnalisé dans_tomcat_/content/erddap/,
Tu dois comprendre. (par diff) quelles modifications ont été apportées aux messages.xml par défaut (qui sont dans le nouveau erddap. guerre comme
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) et modifiez votre fichier de messages personnalisés.xml en conséquence.
         
## Installer{#install} 
5. Installez le nouveauERDDAP™dans Tomcat:
\\* N'utilisez pas Tomcat Manager. Tôt ou tard, il y aura des problèmes de mémoire de PermGen. Il vaut mieux arrêter et démarrer Tomcat.
\\* Remplacer les références à _tomcat_ ci-dessous par le répertoire Tomcat actuel de votre ordinateur.
     
### Linux et Macs{#linux-and-macs} 
1. Arrêt Tomcat : À partir d'une ligne de commande, utilisez : _tomcat_/bin/shutdown.sh
Et utiliser ps -ef|grep tomcat pour voir si / quand le processus a été arrêté. (Ça peut prendre une minute ou deux.) 
2. Supprimer la décompressionERDDAP™installation: Dans _tomcat_/webapps, utilisez
rm -rf erddap
3. Supprimer l'ancien erddap. fichier de guerre: Dans _tomcat_/webapps, utilisez rm erddap. guerre
4. Reçu le nouveau erddap. fichier de guerre du répertoire temporaire vers _tomcat_/webapps
5. Redémarrer Tomcat etERDDAP: utiliser _tomcat_/bin/startup.sh
6. AffichageERDDAP™dans votre navigateur pour vérifier que le redémarrage a réussi.
     (Souvent, vous devez essayer quelques fois et attendre une minute avant de voirERDDAP™.)   
             
### Fenêtres{#windows} 
1. Arrêt Tomcat : À partir d'une ligne de commande, utilisez : _tomcat_\bin\\shutdown.bat
2. Supprimer la décompressionERDDAP™installation: Dans _tomcat_/webapps, utilisez
del /S/Q erddap
3. Supprimer l'ancien erddap. fichier de guerre & #160;: Dans _tomcat_\\webapps, utilisez del erddap. guerre
4. Reçu le nouveau erddap. fichier de guerre du répertoire temporaire vers _tomcat_\\webapps
5. Redémarrer Tomcat etERDDAP: utiliser _tomcat_\\bin\\startup.bat
6. AffichageERDDAP™dans votre navigateur pour vérifier que le redémarrage a réussi.
     (Souvent, vous devez essayer quelques fois et attendre une minute avant de voirERDDAP™.) 

Problèmes de mise à jourERDDAP? Voir notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).
