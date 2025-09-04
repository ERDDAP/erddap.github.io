---
sidebar_position: 1
---

# Installer
Comment faire la configuration initiale de ERDDAP™ sur votre serveur

 ERDDAP™ peut fonctionner sur n'importe quel serveur qui prend en charge Java et Tomcat (et d'autres serveurs d'applications comme Jetty, mais nous ne les supportons pas) .
 ERDDAP™ a été testé sur Linux (y compris sur AWS d'Amazon) , Mac et les ordinateurs Windows.

*  **Coq** - Oui. Nous fournissons [ ERDDAP™ dans un contenant Docker](https://hub.docker.com/r/erddap/erddap) 
et IOOS offre maintenant [Guide de démarrage rapide pour ERDDAP™ dans un contenant Docker](https://ioos.github.io/erddap-gold-standard/index.html) .
C'est le standard. ERDDAP™ installation, dans un conteneur Docker.
Par Docker Composer nous fournissons des moyens faciles à mettre en place ssl et de surveillance, lire plus in [Documentation Docker](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Si vous utilisez déjà Docker, vous préférerez probablement la version Docker.
Si vous cherchez à exécuter sur les services cloud, vous préférerez probablement la version Docker.
*  **Amazone** - Oui. Si vous installez ERDDAP™ sur une instance Amazon Web Services EC2, voir ceci [Aperçu des services Web Amazon](/docs/server-admin/additional-information#amazon) D'abord.
*  **Linux et Macs** - Oui. ERDDAP™ fonctionne bien sur les ordinateurs Linux et Mac. Voir les instructions ci-dessous.
*  **Windows** - Oui. Windows est parfait pour les tests ERDDAP™ et à usage personnel (voir les instructions ci-dessous) ,
mais nous ne recommandons pas de l'utiliser pour le public ERDDAP™ déploiements. Courir ERDDAP™ sous Windows peut avoir des problèmes:
notamment, ERDDAP™ peut être incapable de supprimer et/ou renommer les fichiers rapidement. Ceci est probablement dû au logiciel antivirus
   (Par exemple, de McAfee et Norton) qui vérifie les fichiers de virus. Si vous rencontrez ce problème
(qui peut être vu par des messages d'erreur dans le [log.txt](/docs/server-admin/additional-information#log) fichier comme
"Impossible de supprimer ..."), modifier les paramètres du logiciel antivirus peut atténuer partiellement le problème. Ou envisagez plutôt d'utiliser un serveur Linux ou Mac.

 **La norme ERDDAP™ instructions d'installation pour les ordinateurs Linux, Mac et Windows sont:** 

0. Assurez-vous que toutes les dépendances sont installées. Sur les machines non Windows (Linux et Mac) Tu as besoin de Csh.

##  Java  {#java} 

1.  [Pour ERDDAP™ v2.19+, mis en place Java 21. Le Président.](#java) 
Pour des raisons de sécurité, il est presque toujours préférable d'utiliser la dernière version de Java 21. Le Président.
Veuillez télécharger et installer la dernière version de
    [OpenJDK d'Adoptium (Témurine) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21) .
Pour vérifier l'installation, exécutez `/javaJreBinDirectory/java -version`, par exemple
`/usr/local/jdk-21.0.3+9/jre/bin/java - Une version.

    ERDDAP™ fonctionne avec Java d'autres sources, mais nous recommandons l'Adoptium parce qu'il est le principal, soutenu par la communauté,
gratuit (comme dans la bière et le discours) des Java 21 qui offre un soutien à long terme (mises à jour gratuites pour de nombreuses années après la publication initiale) .
Pour des raisons de sécurité, veuillez mettre à jour votre ERDDAP 'version de Java périodiquement comme nouvelles versions de Java 21 sont disponibles chez Adoptium.

    ERDDAP™ a été testé et largement utilisé avec 21, pas d'autres versions. Pour diverses raisons, nous ne testons ni ne supportons d'autres versions de Java .
     
## Tomcat{#tomcat} 

2.  [Mise en place](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat est le plus utilisé Java Serveur d'application,
qui est Java logiciels qui se situent entre les services réseau du système d'exploitation et Java logiciel serveur comme ERDDAP™ .
C'est un logiciel libre et ouvert (RÉSULTATS) .

Vous pouvez utiliser un autre Java Serveur d'applications (Par exemple, Jetty) , mais nous ne testons avec et soutenir Tomcat.

   * Téléchargez Tomcat et déballez-le sur votre serveur ou PC.
Pour des raisons de sécurité, il est presque toujours préférable d'utiliser la dernière version de Tomcat 10 (version 9 et ci-dessous ne sont pas acceptables) 
qui est conçu pour fonctionner avec Java 21 ou plus récent. Ci-dessous, le répertoire Tomcat sera appelé "tomcat".

__Attention &#33;__ Si vous avez déjà un Tomcat exécutant une autre application web (en particulier) , nous vous recommandons d'installer ERDDAP™ dans
      [un deuxième Tomcat](/docs/server-admin/additional-information#second-tomcat) Parce que ERDDAP™ nécessite différents paramètres Tomcat
et ne devrait pas avoir à faire face à d'autres applications pour la mémoire.

     * Sur Linux, [télécharger le "Core" "tar .gz Distribution Tomcat](https://tomcat.apache.org/download-10.cgi) et déballer.
Nous recommandons de le déballer dans `/usr/local`.
     * Sur un Mac, Tomcat est probablement déjà installé dans `/Library/Tomcat`, mais devrait le mettre à jour à la dernière version de Tomcat 10.
Si vous le téléchargez, [télécharger le "Core" "tar .gz Distribution Tomcat](https://tomcat.apache.org/download-10.cgi) et le déballer dans `/Bibliothèque/Tomcat`.
     * Sous Windows, vous pouvez [télécharger la distribution "Core" "zip" Tomcat](https://tomcat.apache.org/download-10.cgi) 
        (qui ne gâche pas le registre Windows et que vous contrôlez depuis une ligne de commande DOS) et le décompresser dans un répertoire approprié.
        (Pour le développement, nous utilisons la distribution "Core" "zip". Nous créons un répertoire `/programs` et le déballons là.) 
Ou vous pouvez télécharger la distribution "Core" "64 bits Windows zip", qui comprend plus de fonctionnalités.
Si la distribution est un installateur Windows, il mettra probablement Tomcat dans, par exemple, `/Program Files/apache-tomcat-10.0.23`.
             
### serveur.xml{#serverxml} 

*  [serveur.xml](#serverxml) - Dans le fichier `tomcat/conf/server.xml`, il y a deux changements que vous devriez apporter à chacun des deux ` <Connector> ` étiquettes
   (un pour `&lt;Port de la Couronne=8080"` et un pour `&lt;Port de la Couronne=8443"`) .
   1.  (Recommandation) Augmenter la valeur du paramètre `connectionTimeout`, peut-être à 300000 (millisecondes, soit 5 minutes) .
   2.  (Recommandation) Ajouter un nouveau paramètre : `relaxedQueryChars[] | ". Ceci est facultatif et légèrement moins sûr,
mais supprime le besoin pour les utilisateurs d'encoder ces caractères en pourcentage lorsqu'ils se produisent dans les paramètres de l'URL de demande d'un utilisateur.
             
### contenu.xml{#contentxml} 

* contexte.xml - Oui. Ressources Cache - Dans `tomcat/conf/context.xml`, juste avant le ` </Context> ` tag, modifier l'étiquette Ressources
   (ou l'ajouter si elle n'est pas déjà là) pour définir le cache Paramètre MaxSize à 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Cela évite de nombreuses mises en garde en catalina. tout ça commence par
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Heure d'arrêt Apache{#apache-timeout} 

* Sur les ordinateurs Linux, changez les paramètres de timeout d'Apache afin que les requêtes d'utilisateurs qui prennent du temps ne soient pas chronométrées.
   (avec ce qui apparaît souvent comme une erreur "Proxy" ou "Bad Gateway") . En tant qu'utilisateur racine :
  * Modifier l'Apache ` http fichier d.conf` (généralement en `/etc/ http d/conf/ ") :
    * Modifier l'actuel ` <Timeout> ` réglage (ou en ajouter un à la fin du fichier) à 3600 (secondes) , au lieu de 60 ou 120 secondes par défaut.
    * Modifier l'actuel ` <ProxyTimeout> ` réglage (ou en ajouter un à la fin du fichier) à 3600 (secondes) , au lieu de 60 ou 120 secondes par défaut.
  * Redémarrer Apache: `/usr/sbin/apachectl -k gracieux " (mais parfois il est dans un répertoire différent) .

### Sécurité{#security} 
         
* Recommandation en matière de sécurité : Voir [les présentes instructions](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) renforcer la sécurité
votre installation Tomcat, spécialement pour les serveurs publics.
         
* Pour public ERDDAP™ installations sur Linux et Macs, il est préférable de configurer Tomcat (le programme) comme appartenant à l'utilisateur `tomcat "
   (un utilisateur séparé avec des permissions limitées et qui [n'a pas de mot de passe](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Ainsi, seul le super utilisateur peut passer à agir comme utilisateur "tomcat". Cela rend impossible pour les pirates de se connecter à votre serveur en tant qu'utilisateur `tomcat`.
Et dans tous les cas, vous devez le faire de sorte que l`utilisateur `tomcat` a des permissions très limitées sur le système de fichiers du serveur (read+write+execute privilèges
pour l'arborescence du répertoire `apache-tomcat` et ` <bigParentDirectory> ` et des privilèges en lecture seule pour les répertoires avec des données qui ERDDAP™ a besoin d'un accès).
  * Vous pouvez créer le compte utilisateur `tomcat` (qui n'a pas de mot de passe) en utilisant la commande & #160;:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Vous pouvez passer à travailler comme utilisateur `tomcat` en utilisant la commande
    ```
    sudo su - tomcat
    ```
     (Il vous demandera le mot de passe du superutilisateur pour obtenir la permission de le faire.) 
    * Vous pouvez arrêter de travailler comme utilisateur tomcat en utilisant la commande
    ```
    exit
    ````
    * Faites la plupart du reste du Tomcat et ERDDAP™ instructions de configuration en tant qu'utilisateur `tomcat`. Plus tard, exécutez les scripts `startup.sh` et `shutdown.sh` en tant qu'utilisateur `tomcat "
afin que Tomcat ait la permission d'écrire dans ses fichiers journaux.
    * Après avoir déballé Tomcat, du parent du répertoire `apache-tomcat`:
      * Changer la propriété de l'arborescence du répertoire apache-tomcat pour l'utilisateur tomcat.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (mais remplacez le nom réel de votre répertoire tomcat) .
      * Modifier le "groupe" pour être tomcat, votre nom d'utilisateur ou le nom d'un petit groupe qui inclut tomcat et tous les administrateurs de Tomcat/ ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Changer les permissions pour que Tomcat et le groupe aient lu, écrit, exécuté les privilèges:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Supprimer les permissions d'un autre utilisateur pour lire, écrire ou exécuter :
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Ceci est important, car il empêche les autres utilisateurs de lire des informations ERDDAP™ configurer les fichiers.

### Mémoire{#memory} 

Définir les variables d'environnement de Tomcat

* Sur Linux et Macs :
Créer un fichier `tomcat/bin/setenv.sh " (ou dans Red Hat Enterprise Linux \\[ REL \\] , modifier `~tomcat/conf/tomcat10.conf ") pour définir les variables d'environnement de Tomcat.
Ce fichier sera utilisé par `tomcat/bin/startup.sh` et `shutdown.sh`. Le fichier devrait contenir quelque chose comme :
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (mais remplacez les noms de répertoires de votre ordinateur) .
   (Si vous définissez précédemment `JRE_HOME`, vous pouvez supprimer cela.) 
Sur Macs, vous n'avez probablement pas besoin de définir `JAVA_HOME`.

* Sous Windows :
Créez un fichier `tomcat\bin\\setenv.bat` pour définir les variables d'environnement de Tomcat.
Ce fichier sera utilisé par `tomcat\bin\\startup.bat` et ` shutdown.bat ".
Le fichier devrait contenir quelque chose comme :
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (mais remplacez les noms de répertoires de votre ordinateur) .
Si c'est juste pour les tests locaux, supprimer "-serveur".
   (Si vous définissez précédemment `JRE_HOME`, vous pouvez supprimer cela.) 

Les paramètres de mémoire `-Xmx` et `-Xms` sont importants car ERDDAP™ fonctionne mieux avec plus de mémoire.
Toujours définir `-Xms` à la même valeur que `-Xmx`.

* Pour les systèmes d'exploitation 32 bits et 32 bits Java :
64 bits Java est beaucoup mieux que 32 bits Java mais 32 bits Java fonctionnera aussi longtemps que le serveur n'est pas vraiment occupé.
Plus la mémoire physique dans le serveur est bonne : 4+ GB est vraiment bon, 2 GB est correct, moins n'est pas recommandé.
Avec 32 bits Java , même avec une mémoire physique abondante, Tomcat et Java ne fonctionnera pas si vous essayez de définir `-Xmx` beaucoup plus de 1500M (1200M sur certains ordinateurs) .
Si votre serveur a moins de 2 Go de mémoire, réduisez la valeur `-Xmx` (dans 'M'egaBytes) à la moitié de la mémoire physique de l'ordinateur.

* Pour systèmes d'exploitation 64 bits et 64 bits Java :
64 bits Java fonctionnera uniquement sur un système d'exploitation 64 bits.
  * Avec Java 8, vous devez ajouter `-d64` au paramètre Tomcat `CATALINA_OPTS` dans `setenv.bat`.
  * Avec Java 21, vous choisissez 64 bits Java lorsque vous téléchargez une version de Java marquée "64 bits".

Avec 64 bits Java , Tomcat et Java peut utiliser des paramètres `-Xmx` et `-Xms` très élevés. Plus la mémoire physique du serveur est bonne.
Comme suggestion simpliste: nous vous recommandons de définir `-Xmx` et `-Xms` (dans 'M'egaBytes) à 1/2 (ou moins) de la mémoire physique de l'ordinateur.
Tu peux voir si Tomcat, Java et ERDDAP™ sont en effet en mode 64 bits en cherchant "bit", dans ERDDAP 's Daily Report courriel
ou dans le "bigParentDirectory/logs/ [log.txt](/docs/server-admin/additional-information#log) ` fichier (`bigParentDirectory` est spécifié dans [configuration.xml](#setupxml) ) .

#### Collecte des ordures{#garbage-collection} 

* Dans ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) fichier, vous verrez beaucoup "GC (Défaut de répartition) " des messages.
Ce n'est généralement pas un problème. C'est un message fréquent d'un fonctionnement normal Java disant que ça vient de finir une petite poubelle
collection parce qu'il manquait de place à Eden (la partie de Java tas de très jeunes objets) . Habituellement, le message vous montre
`MemoryUseAvant-&gt;MemoryUseAfter`. Si ces deux chiffres sont rapprochés, cela signifie que la collecte des ordures n'était pas productive.
Le message n'est qu'un signe de trouble s'il est très fréquent (toutes les quelques secondes) , pas productif, et les chiffres sont grands et ne croissent pas,
qui indiquent ensemble que Java a besoin de plus de mémoire, lutte pour libérer la mémoire, et est incapable de libérer la mémoire.
Cela peut se produire pendant une période stressante, puis partir. Mais s'il persiste, c'est un signe de trouble.
* Si vous voyez `java.lang.OutOfMemoryError`s dans ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) fichier,
Voir [De mémoireErreur](/docs/server-admin/additional-information#outofmemoryerror) pour des conseils sur comment diagnostiquer et résoudre les problèmes.
         
### Autorisations{#permissions} 

*  [Sur Linux et Macs, changez les permissions](#permissions) de tous les fichiers `*.sh` dans `tomcat/bin/` à exécuter par le propriétaire:
  ```
  chmod +x *.sh
  ```

### Polices{#fonts} 

*  [Polices pour images:](#fonts) Nous préférons fortement le libre [Polices DejaVu](https://dejavu-fonts.github.io/) à l'autre Java polices.
L'utilisation de ces polices est fortement recommandée mais pas requise.

Si vous choisissez de ne pas utiliser les polices DejaVu, vous devez changer le paramètre fontFamily dans setup.xml en ` <fontFamily> SansSerif </fontFamily> «,
disponible avec tous Java distributions. Si vous définissez ` <fontFamily> ` au nom d'une police qui n'est pas disponible, ERDDAP™ ne chargera pas
et imprimera une liste des polices disponibles dans le fichier `log.txt`. Vous devez utiliser une de ces polices.

Si vous choisissez d'utiliser les polices DejaVu, assurez-vous que le ` <fontFamily> ` setup.xml est ` <fontFamily> DejaVu Sans </fontFamily> ".

Pour installer les polices DejaVu, veuillez télécharger [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5 522 795 octets, MD5=33E1E61FAB06A547851ED308B4FFEF42) 
et décompresser les fichiers de police vers un répertoire temporaire.

  * Sur Linux :
    * Pour Linux Adoptium Java distributions, voir [les présentes instructions](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Autres Java distributions: En tant qu`utilisateur `tomcat`, copiez les fichiers de police dans `$JAVA_HOME/lib/fonts` Java peut trouver les polices.
Rappelez-vous : si/lorsque vous passez à une version plus récente de Java , vous devez réinstaller ces polices.
  * Sur Macs : pour chaque fichier de police, double-cliquez dessus et cliquez sur Installer la police.
  * Sous Windows 7 et 10: dans Windows Explorer, sélectionnez tous les fichiers de police. Clic droit. Cliquez sur Installer.
             
### Essai Tomcat{#test-tomcat} 

* Testez votre installation Tomcat.
  * Linux :
    * En tant qu'utilisateur "tomcat", exécutez `tomcat/bin/startup.sh`.
    * Affichez votre URL + ":8080/" dans votre navigateur (Par exemple, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (exécuter tomcat en tant qu'utilisateur administrateur système) :
    * Exécuter `tomcat/bin/startup.sh`.
    * Affichez votre URL + ":8080/" dans votre navigateur (Par exemple, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Notez que par défaut, votre Tomcat est uniquement accessible par vous. Il n'est pas accessible au public.
  * Windows localhost & #160;:
    * Cliquez avec le bouton droit sur l'icône Tomcat dans le plateau du système, et choisissez "Démarrer le service".
    * Affichage [http://127.0.0.1:8080/](http://127.0.0.1:8080/) ou peut-être [http://localhost:8080/](http://localhost:8080/) , dans votre navigateur. Notez que par défaut, votre Tomcat est uniquement accessible par vous. Il n'est pas accessible au public.

Vous devriez voir la page des félicitations Tomcat.

S'il y a des problèmes, consultez le fichier journal Tomcat à `tomcat/logs/catalina.out`.

### Des problèmes avec l'installation de Tomcat ?{#troubles-with-the-tomcat-installation} 

* Sur Linux et Mac, si vous ne pouvez pas atteindre Tomcat ou ERDDAP™   (ou peut-être que vous ne pouvez pas les atteindre à partir d'un ordinateur en dehors de votre pare-feu) ,
vous pouvez tester si Tomcat écoute le port 8080, en tapant (comme racine) sur une ligne de commande du serveur :

  ```
  netstat -tuplen | grep 8080
  ```

Cela devrait revenir à une ligne avec quelque chose comme:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (où `#` est un chiffre) , indiquant qu ' un processus de " java " (Probablement Tomcat) est à l'écoute sur le port "8080" pour le trafic "tcp".
Si aucune ligne n'a été retournée, si la ligne renvoyée est significativement différente, ou si deux lignes ou plus ont été retournées, alors il peut y avoir un problème avec les paramètres du port.

* Voir le fichier journal Tomcat `tomcat/logs/catalina.out`. Problèmes de Tomcat et certains ERDDAP™ Les problèmes de démarrage y sont presque toujours indiqués.
C'est courant quand vous êtes en première mise en place ERDDAP™ .

* Voir [Tomcat](https://tomcat.apache.org/) site Web ou rechercher de l'aide sur le Web, mais s'il vous plaît laissez-nous savoir les problèmes que vous aviez et les solutions que vous avez trouvées.

* Voir notre [section sur l'obtention d'un soutien supplémentaire](/docs/intro#support) .
             
###  ERDDAP™ Contenu{#erddap-content} 
3.   [Configurez les fichiers de configuration `tomcat/content/erddap`.](#erddap-content) 
Sur Linux, Mac et Windows, téléchargement [Contenu .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
et décompresser dans le répertoire `tomcat`, en créant `tomcat/content/erddap`.

__Version 1.0.0, 20333 octets, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, datée 2024-10-14__

Certaines versions antérieures sont également disponibles:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19 792 octets, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, daté du 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19 792 octets, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, daté du 2022-02-16) 
    *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 octets, MD5=1E26F62E7A06191EE6868C40B9A29362, daté du 2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 octets, MD5=1E26F62E7A06191EE6868C40B9A29362, daté du 2022-12-08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 octets, MD5=1E26F62E7A06191EE6868C40B9A29362, daté du 2023-02-27) 

#### Autre répertoire{#other-directory} 

Pour Red Hat Enterprise Linux (REL) ou pour d'autres situations où vous n'êtes pas autorisé à modifier le répertoire Tomcat ou où vous voulez / besoin
pour mettre le ERDDAP™ répertoire de contenu dans un autre emplacement pour une autre raison (par exemple, si vous utilisez Jetty au lieu de Tomcat) ,
dézip `erddapContenu .zip ` dans le répertoire souhaité (auquel seul l`utilisateur `tomcat` a accès) et définir le ` erddapContentDirectory ` biens du système
 (Par exemple " erddapContentDirectory  =~tomcat/content/erddap ") donc ERDDAP™ peut trouver ce nouveau répertoire de contenu.

### configuration.xml{#setupxml} 

*  [Lire les commentaires dans `tomcat/content/erddap/setup.xml "](#setupxml) et d'apporter les modifications demandées. setup.xml est le fichier avec tous les paramètres qui spécifient comment votre ERDDAP™ se comporter.

Pour la configuration initiale, vous DEVEZ au moins modifier ces paramètres :
      * " <bigParentDirectory> "
      * " <emailEverythingTo> "
      * " <baseUrl> "
      * " <email...> Paramètres
      * " <admin...> Paramètres
      * " <baseHttpsUrl> " (quand vous avez installé https ) 

Lorsque vous créez le bigParentDirectory, à partir du répertoire parent de bigParentDirectory:

    * Faire de l'utilisateur `tomcat` le propriétaire du `bigParentDirectory`:
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Modifier le "groupe" pour être tomcat, votre nom d'utilisateur ou le nom d'un petit groupe qui inclut tomcat et tous les administrateurs de Tomcat/ ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Changer les permissions pour que Tomcat et le groupe aient lu, écrit, exécuté les privilèges:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Supprimer les permissions d'un autre utilisateur pour lire, écrire ou exécuter. Ceci est important pour empêcher la lecture possible d'informations sensibles
dans ERDDAP™ log des fichiers et des fichiers avec des informations sur les ensembles de données privés.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Variables d'environnement{#environment-variables} 

En commençant par ERDDAP™ v2.13, ERDDAP™ les administrateurs peuvent surcharger n'importe quelle valeur dans setup.xml en spécifiant une variable d'environnement
nommé ` ERDDAP _valueName` avant d'exécuter ERDDAP™ . Par exemple, utiliser ` ERDDAP _baseUrl` remplace la ` <baseUrl> ` valeur.
Cela peut être pratique lors du déploiement ERDDAP™ avec un conteneur comme Docker, comme vous pouvez mettre des paramètres standard dans setup.xml
puis fournir des paramètres spéciaux via des variables d'environnement. Si vous fournissez des renseignements secrets à ERDDAP™ par cette méthode,
Assurez-vous que l'information restera secrète. ERDDAP™ lit seulement les variables d'environnement une fois par démarrage,
dans la première seconde de démarrage, donc une façon d'utiliser ceci est: définir les variables d'environnement, démarrer ERDDAP ,
Attendez jusqu'à ERDDAP™ est démarré, puis désactive les variables d'environnement.

###  datasets.xml  {#datasetsxml} 

* Lire les commentaires en [ **Travail avec datasets.xml Fichier** ](/docs/server-admin/datasets) . Plus tard, après avoir ERDDAP™ courir
pour la première fois (généralement avec juste les ensembles de données par défaut) , vous modifierez le XML dans `tomcat/content/erddap/ datasets.xml "
pour spécifier tous les ensembles de données que vous souhaitez ERDDAP™ pour servir. C'est là que vous passerez la majeure partie de votre temps
pendant la mise en place ERDDAP™ et plus tard tout en maintenant votre ERDDAP™ .

Vous pouvez voir un exemple [ datasets.xml sur GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Peu probable) Maintenant ou (légèrement plus probable) à l'avenir, si vous voulez modifier le fichier CSS d'erddap, copiez
`tomcat/content/erddap/images/erddapStart2.css` à `tomcat/content/erddap/images/erddap2.css` puis y apporter des modifications.
Les modifications à `erddap2.css` ne prennent effet que lorsque ERDDAP™ est redémarré et nécessite souvent aussi l'utilisateur pour effacer les fichiers en cache du navigateur.
     
 ERDDAP™ ne fonctionnera pas correctement si setup.xml ou datasets.xml fichier n'est pas un fichier XML bien formé. Donc, après avoir modifié ces fichiers,
c'est une bonne idée de vérifier que le résultat est bien formé XML en collant le texte XML dans un vérificateur XML comme [xmlvalidation](https://www.xmlvalidation.com/) .
     
### Installez l'erddap. fichier de guerre{#install-the-erddapwar-file} 

4. Sur Linux, Mac et Windows, _télécharger [Guerre](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war) __ dans `tomcat/webapps`:

__Version 2.28.0, 620,824,288 octets, MD5=f988b2ba603f65a83ac67af43da9e4c2, datée 2025-08-29__

Le fichier .war est grand parce qu'il contient des données de côte, de limite et d'altitude à haute résolution nécessaires pour créer des cartes.

Certaines versions antérieures sont également disponibles.

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551 068 245 octets, MD5=5FEA912B5D42E50EAB9591F773EA848D, daté du 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551 069 844 octets, MD5=461325E97E7577EC671DD50246CCFB8B, daté du 2022-02-23) 
   *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568 644 411 octets, MD5=F2CFF805893146E932E498FDBD519B6, daté du 2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567 742 765 octets, MD5=2B3354F633294213AE2AFDDCF4DA6D0, daté du 2022-12-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572 124 953 octets, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, daté du 2023-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568 748 187 octets, MD5=970fbee172e28b0b8a07756eecbc898e, daté du 2024-06-07) 
   *  [2,25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 octets, MD5=652AFC9D1421F00B5F789DA2C4732D4C, daté du 2024-11-07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607 404 032 octets, MD5=99a725108b37708e5420986c1616a119, daté 2025-03-31) 
   *  [2.27.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620 554 403 octets, MD5=3b2086c659eee4145ca2dff447bf4ef7, daté 2025-06-11) 

### Configurer le proxy (spécifique au déploiement)  {#proxy} 

 ERDDAP™ est généralement déployé derrière un serveur web proxy inverse pour lui permettre d'être servi sur des ports HTTP standard (80 et 443) .
La terminaison SSL/TLS est souvent hantée sur la couche proxy du serveur web. Les détails dépendent des besoins de chaque déploiement.

#### Apache{#apache} 

1. Veiller à ce que `mod_proxy` et `mod_proxy_ http ` sont chargés:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Modifier l ' actuel ` <VirtualHost> ` étiquette (s'il y en a une) , ou ajouter un à la fin du fichier:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Si ERDDAP™ est servi sur un chemin autre que `/erddap`, aussi défini l`en-tête `X-Forwarded-Prefix`
segment de chemin _avant_ `/erddap`. Ce cadre serait approprié pour ERDDAP™ servi à
`/sous-chemin/erddap`:

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Puis redémarrez Apache: `/usr/sbin/apachectl -k gracieux " (mais parfois il est dans un répertoire différent) .
         
#### NGINX{#nginx} 

Dans le fichier de configuration nginx, définissez ces en-têtes :
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Si ERDDAP™ est servi sur un chemin autre que `/erddap`, aussi défini l`en-tête `X-Forwarded-Prefix`
segment de chemin _avant_ `/erddap`. Ce cadre serait approprié pour ERDDAP™ servi à
`/sous-chemin/erddap`:

```
proxy_set_header X-Forwarded-Prefix /subpath
```


Pour obtenir NGINX et ERDDAP™ fonctionner correctement avec https , vous devez mettre l'extrait suivant dans le serveur Tomcat.xml ` <Host> ` bloc:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Démarrer Tomcat{#start-tomcat} 

*  (Je ne recommande pas d'utiliser le gestionnaire d'applications Web Tomcat. Si vous n'arrêtez pas complètement et démarrez Tomcat, tôt ou tard vous aurez des problèmes de mémoire PermGen.) 
*  (Dans Linux ou Mac OS, si vous avez créé un utilisateur spécial pour exécuter Tomcat, par exemple, tomcat, rappelez-vous de faire les étapes suivantes en tant qu'utilisateur.) 
* Si Tomcat est déjà en marche, fermez Tomcat avec (dans Linux ou Mac OS) "tomcat/bin/shutdown.sh"
ou (dans Windows) "tomcat\bin\\ shutdown.bat "

Sur Linux, utilisez `ps -ef | grep tomcat` avant et après `shutdown.sh` pour s'assurer que le processus tomcat a cessé.
Le processus devrait être énuméré avant l'arrêt et éventuellement non après l'arrêt.
Cela peut prendre une minute ou deux pour ERDDAP™ de fermer complètement. Soyez patient. Ou s'il semble qu'il ne s'arrêtera pas seul, utilisez :
"Traitement -9 <processID> "
* Commencez par Tomcat (dans Linux ou Mac OS) «tomcat/bin/startup.sh» ou (dans Windows) `tomcat\bin\\startup.bat "

## Est ERDDAP™ courir ?{#is-erddap-running} 

Utilisez un navigateur pour essayer de voirhttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ démarre sans aucun ensemble de données chargé. Les ensembles de données sont chargés dans un fil de fond et deviennent donc disponibles un par un.

### Dépannage{#troubleshooting} 

* Quand une requête d'un utilisateur arrive, elle va à Apache (sur les ordinateurs Linux et Mac OS) , puis Tomcat, alors ERDDAP™ .
* Vous pouvez voir ce qui vient à Apache (et erreurs connexes) dans les fichiers journaux Apache.
*    [Toi](/docs/server-admin/additional-information#tomcat-logs) peut voir ce qui vient à Tomcat (et erreurs connexes) 
dans les fichiers journaux Tomcat (`tomcat/logs/catalina.out` et autres fichiers dans ce répertoire) .
*    [Toi](/docs/server-admin/additional-information#log) peut voir ce qui vient à ERDDAP , messages de diagnostic de ERDDAP ,
et messages d'erreur de ERDDAP , dans ERDDAP™ " <bigParentDirectory> fichier /logs/log.txt`.
* Tomcat ne commence pas. ERDDAP™ jusqu'à ce que Tomcat obtienne une demande pour ERDDAP™ . Donc vous pouvez voir dans les fichiers journaux Tomcat si elle
commencé ERDDAP™ ou s'il y a un message d'erreur lié à cette tentative.
* Lorsque ERDDAP™ ça commence, ça renomme l'ancien ERDDAP™ fichier log.txt (`logArchivé À <CurrentTime> .txt') et crée un nouveau fichier log.txt.
Donc, si le fichier `log.txt` est vieux, c'est un signe que ERDDAP™ n'a pas repris récemment. ERDDAP™ écrit des informations de journal dans un tampon
et écrit seulement le tampon dans le fichier journal périodiquement, mais vous pouvez forcer ERDDAP™ pour écrire le tampon dans le fichier journal en visitant
" /erddap/status.html ".

### Problème: Ancienne version de Java  {#trouble-old-version-of-java} 

Si vous utilisez une version de Java C'est trop vieux pour ERDDAP , ERDDAP™ ne s'exécutera pas et vous verrez un message d'erreur dans le fichier journal de Tomcat comme

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

La solution est de mettre à jour la version la plus récente de Java et assurez-vous que Tomcat l'utilise.

### Problème: démarrage lent Première fois{#trouble-slow-startup-first-time} 

Tomcat doit faire beaucoup de travail la première fois une application comme ERDDAP™ est démarré; notamment, il doit décompresser le fichier `erddap.war`
 (qui est comme un .zip fichier) . Sur certains serveurs, la première tentative de voir ERDDAP™ étalons (30 secondes ?) jusqu'à ce que ce travail soit terminé.
Sur d'autres serveurs, la première tentative échouera immédiatement. Mais si vous attendez 30 secondes et essayez à nouveau, il réussira si ERDDAP™ a été correctement installé.

Il n'y a pas de solution. C'est simplement comme ça que Tomcat fonctionne. Mais il ne se produit que la première fois après avoir installé une nouvelle version de ERDDAP™ .

## Arrêt et redémarrage{#shut-down-and-restart} 

À l'avenir, fermer (et redémarrer)   ERDDAP™ Voir [Comment fermer et redémarrer Tomcat et ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Des problèmes ?{#trouble} 

Problèmes d'installation de Tomcat ou ERDDAP™ ? Voir notre [section sur l'obtention d'un soutien supplémentaire](/docs/intro#support) .

## Notification par courriel des nouvelles versions ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Si vous voulez recevoir un email chaque fois qu'une nouvelle version de ERDDAP™ est disponible ou autre important ERDDAP™ annonces,
vous pouvez rejoindre le ERDDAP™ Liste des annonces [Ici.](https://groups.google.com/g/erddap-announce) . Cette liste est en moyenne d'environ un courriel tous les trois mois.

## Personnaliser{#customize} 

*  [Personnalisez votre ERDDAP™ pour souligner votre organisation (pas NOAA   ERD ) .](#customize) 
* Changer la bannière qui apparaît en haut de tous ERDDAP™ .html pages en éditant le ` <startBodyHtml5> ` étiquette dans votre ` datasets.xml ` dossier.
(S'il n'y en a pas, copiez la ERDDAP™ 's `tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml' fichier
dans " datasets.xml ` et le modifier.) Par exemple, vous pourriez :
  * Utiliser une image différente (Le logo de votre organisation) .
  * Changer la couleur de fond.
  * Changer " ERDDAP™ "à "Votre organisation ERDDAP™ "
  * Changez « Meilleur accès aux données scientifiques » pour « Meilleur accès aux données de _Votre organisation ».
  * Changez les liens « fournis par » pour être des liens vers votre organisation et les sources de financement.
* Modifier l'information sur le côté gauche de la page d'accueil en éditant le ` <theShortDescriptionHtml> ` étiquette dans votre ` datasets.xml ` dossier.
(S'il n'y en a pas, copiez la ERDDAP™ 's `tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml' fichier
dans " datasets.xml ` et le modifier.) Par exemple, vous pourriez :
  * Décrivez ce que fait votre organisation et/ou votre groupe.
  * Décrivez quels types de données ERDDAP™ Oui.
  * Pour modifier l'icône qui apparaît sur les onglets du navigateur, mettez le favicon de votre organisation. ico dans "tomcat/content/erddap/images/".
Voirhttps://en.wikipedia.org/wiki/Favicon.
