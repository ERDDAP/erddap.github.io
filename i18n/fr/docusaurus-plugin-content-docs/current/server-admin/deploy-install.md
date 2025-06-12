---
sidebar_position: 1
---

# Installer
Comment faire la configuration initiale deERDDAP™sur votre serveur


ERDDAP™peut fonctionner sur n'importe quel serveur qui prend en chargeJavaet Tomcat (et d'autres serveurs d'applications comme Jetty, mais nous ne les supportons pas) .ERDDAP™a été testé sur Linux (y compris sur Amazon's AWS) , Mac et les ordinateurs Windows.

*    **Amazonie** -- Si vous installezERDDAP™sur une instance Amazon Web Services EC2, voir[Aperçu des services Web Amazon](/docs/server-admin/additional-information#amazon)D'abord.
*    **Coq** -- Axiom offre maintenant[ERDDAP™dans un contenant Docker](https://hub.docker.com/u/axiom/)et IOOS offre maintenant[Guide de démarrage rapide pourERDDAP™dans un contenant Docker](https://ioos.github.io/erddap-gold-standard/index.html).
C'est le standard.ERDDAP™l'installation, mais Axiom l'a mis dans un conteneur en fonte.
Si vous utilisez déjà Docker, vous préférerez probablement la version Docker.
Si vous n'utilisez pas déjà Docker, nous ne le recommandons généralement pas.
Si vous avez choisi d'installerERDDAP™via Docker, nous n'offrons aucun support pour le processus d'installation.
On n'a pas encore travaillé avec Docker. Si vous travaillez avec cela, envoyez-nous vos commentaires.
*    **Linux et Macs** --ERDDAP™fonctionne bien sur les ordinateurs Linux et Mac. Voir les instructions ci-dessous.
*    **Fenêtres** -- Windows est parfait pour les testsERDDAP™et à usage personnel (voir les instructions ci-dessous) , mais nous ne recommandons pas l'utiliser pour le publicERDDAPPar. CourirERDDAP™sous Windows peut avoir des problèmes: notamment,ERDDAP™peut être incapable de supprimer et/ou renommer les fichiers rapidement. Ceci est probablement dû au logiciel antivirus (Par exemple, de McAfee et Norton) qui vérifie les fichiers pour les virus. Si vous rencontrez ce problème (qui peut être vu par des messages d'erreur dans le[Log.txt](/docs/server-admin/additional-information#log)fichier comme « Impossible de supprimer ... ») , modifier les paramètres du logiciel antivirus peut atténuer partiellement le problème. Ou envisager d'utiliser un serveur Linux ou Mac à la place.

 **La normeERDDAP™instructions d'installation pour les ordinateurs Linux, Mac et Windows sont:** 

0. Assurez-vous que toutes les dépendances sont installées. Sur les machines non Windows (Linux et Mac) Tu as besoin de Csh.
## Java {#java} 
1.  [PourERDDAP™v2.19+, mis en placeJava21. Le Président.](#java)
Pour des raisons de sécurité, il est presque toujours préférable d'utiliser la dernière version deJava21. Le Président.
Veuillez télécharger et installer la dernière version de
    [OpenJDK d'Adoptium (Témurine) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21). Pour vérifier l'installation, tapez "/_javaJreBinDirectory_/java -version", par exemple
/usr/local/jdk-21.0.3+9/jre/bin/java -version
    
    ERDDAP™fonctionne avecJavad'autres sources, mais nous recommandons Adoptium parce qu'il est le principal, soutenu par la communauté, gratuit (comme dans la bière et le discours) desJava21 qui offre un soutien à long terme (mises à jour gratuites pour de nombreuses années après la publication initiale) . Pour des raisons de sécurité, veuillez mettre à jour votreERDDAPversion deJavapériodiquement comme nouvelles versions deJava21 sont disponibles auprès d'Adoptium.
    
    ERDDAP™a été testé et largement utilisé avec 21, pas d'autres versions. Pour diverses raisons, nous ne testons ni ne supportons d'autres versions deJava.
     
## Tomcat{#tomcat} 
2.  [Mise en place](#tomcat) [Tomcat](https://tomcat.apache.org).
Tomcat est le plus utiliséJavaServeur d'application, qui estJavalogiciels qui se situent entre les services réseau du système d'exploitation etJavalogiciel serveur commeERDDAP™. C'est un logiciel libre et ouvert (RÉSULTATS) .
    
Vous pouvez utiliser un autreJavaServeur d'applications (Par exemple, Jetty) , mais nous testons seulement avec et soutenir Tomcat.
     
    
    * Téléchargez Tomcat et déballez-le sur votre serveur ou PC.
Pour des raisons de sécurité, il est presque toujours préférable d'utiliser la dernière version de Tomcat 10 (version 9 et ci-dessous ne sont pas acceptables) qui est conçu pour fonctionner avecJava21 ou plus récent. Ci-dessous, le répertoire Tomcat sera appelé _tomcat_.
        
Avertissement &#33; Si vous avez déjà un Tomcat exécutant une autre application web (en particulier) , nous vous recommandons d'installerERDDAP™en[un deuxième Tomcat](/docs/server-admin/additional-information#second-tomcat)Parce queERDDAP™a besoin de différents paramètres Tomcat et ne devrait pas avoir à faire face à d'autres applications pour la mémoire.
        
        * Sur Linux,[télécharger le "Core" "tar.gzDistribution Tomcat](https://tomcat.apache.org/download-10.cgi)et déballer. Nous vous recommandons de le déballer dans /usr/local.
        * Sur un Mac, Tomcat est probablement déjà installé dans /Library/Tomcat, mais devrait le mettre à jour à la dernière version de Tomcat 10.
Si vous le téléchargez,[télécharger le "Core" "tar.gzDistribution Tomcat](https://tomcat.apache.org/download-10.cgi)et déballer dans /Bibliothèque/Tomcat.
        * Sous Windows, vous pouvez[télécharger la distribution "Core" "zip" Tomcat](https://tomcat.apache.org/download-10.cgi)  (qui ne gâche pas le registre Windows et que vous contrôlez depuis une ligne de commande DOS) et le décompresser dans un répertoire approprié. (Pour le développement, nous utilisons la distribution "Core" "zip". Nous faisons un répertoire /programs et le déballons là-bas.) Ou vous pouvez télécharger la distribution "Core" "64 bits Windows zip", qui comprend plus de fonctionnalités. Si la distribution est un installateur Windows, il mettra probablement Tomcat dans, par exemple, /Program Files/apache-tomcat-10.0.23 .
             
### serveur.xml{#serverxml} 
*   [serveur.xml](#serverxml)- Dans le fichier _tomcat_/conf/server.xml, il y a deux changements que vous devriez apporter à chacun des deux&lt;Connector&gt; tags- un pour
```
        <Connector port="8080" 
```
et un pour
```
        <Conector port="8443"
```
    1.   (Recommandation) Augmenter la valeur du paramètre connectionTimeout, peut-être à 300000 (millisecondes)   (qui est 5 minutes) .
    2.   (Recommandation) Ajouter un nouveau paramètre: détendueQueryChars\\[\\]|" Ceci est facultatif et légèrement moins sécurisé, mais supprime la nécessité pour les utilisateurs d'encoder ces caractères en pourcentage lorsqu'ils se produisent dans les paramètres de l'URL de demande d'un utilisateur.
             
### contenu.xml{#contentxml} 
* contexte.xml -- Ressources Cache - Dans _tomcat_/conf/context.xml, juste avant le&lt;/Context&gt; tag, modifier l'étiquette Ressources (ou l'ajouter si elle n'est pas déjà là) pour définir le cache Paramètre MaxSize à 80000:
    &lt;Ressources en cacheAllowed="true" cacheMaxSize="80000" /&gt;
Cela évite de nombreuses mises en garde en catalina. Tout commence par
"AVOIR\\[principale\\]org.apache.catalina.webresources.Cache.getResource Impossible d'ajouter la ressource à\\[/WEB-INF/classes/...]"
         
### Heure d'arrêt Apache{#apache-timeout} 
* Sur les ordinateurs Linux, modifiez les paramètres de timeout d'Apache de sorte que les requêtes d'utilisateurs qui prennent beaucoup de temps ne s'arrêtent pas (avec ce qui apparaît souvent comme une erreur "Proxy" ou "Bad Gateway") . En tant qu'utilisateur racine :
    1. Modifier l'Apachehttpfichier d.conf (généralement dans /etc/httpd/conf/) :
Modifier l'actuel&lt;Réglage de l'heure de sortie et de l'heure; (ou en ajouter un à la fin du fichier) à 3600 (secondes) , au lieu des 60 ou 120 secondes par défaut.
Modifier l'actuel&lt;ProxyTimeout &gt; réglage (ou en ajouter un à la fin du fichier) à 3600 (secondes) , au lieu des 60 ou 120 secondes par défaut.
    2. Redémarrer Apache: /usr/sbin/apachectl -K gracieux (mais parfois il est dans un répertoire différent) .
             
    * Recommandation en matière de sécurité : Voir[les présentes instructions](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)pour augmenter la sécurité de votre installation Tomcat, en particulier pour les serveurs publics.
         
    * Pour publicERDDAP™installations sur Linux et Macs, il est préférable de configurer Tomcat (le programme) comme appartenant à l'utilisateur "tomcat" (un utilisateur séparé avec des permissions limitées et qui[n'a pas de mot de passe](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) . Ainsi, seul le super utilisateur peut passer à agir en tant que tomcat utilisateur. Cela rend impossible pour les pirates de se connecter à votre serveur en tant que tomcat utilisateur. Et en tout cas, vous devriez le faire de sorte que l'utilisateur tomcat a des permissions très limitées sur le système de fichiers du serveur (read+write+execute privilèges pour l'arborescence de répertoire apache-tomcat et&lt;bigParentDirectory&gt; et privilèges en lecture seule pour les répertoires avec des données quiERDDAP™a besoin d'accès à).
        * Vous pouvez créer le compte utilisateur tomcat (qui n'a pas de mot de passe) en utilisant la commande
sudo useradd tomcat -s /bin/bash -p '\\* '
        * Vous pouvez passer à travailler comme utilisateur tomcat en utilisant la commande
sudo su - tomcat
             (Il vous demandera le mot de passe du superutilisateur pour obtenir la permission de le faire.) 
        * Vous pouvez arrêter de travailler comme utilisateur tomcat en utilisant la commande
sortie
        * Faites la plupart du reste du Tomcat etERDDAP™instructions de configuration en tant qu'utilisateur "tomcat". Plus tard, lancez les scripts startup.sh et stopdown.sh en tant qu'utilisateur "tomcat" afin que Tomcat ait la permission d'écrire dans ses fichiers journaux.
        * Après avoir déballé Tomcat, du parent du répertoire apache-tomcat:
            
            * Changer la propriété de l'arborescence du répertoire apache-tomcat pour l'utilisateur tomcat.
tomcat tomcat apache-tomcat-_10.0.23_
                 (mais remplacez le nom réel de votre répertoire tomcat) .
            * Modifier le "groupe" pour être tomcat, votre nom d'utilisateur ou le nom d'un petit groupe qui inclut tomcat et tous les administrateurs de Tomcat/ERDDAP, par exemple,
_Votre Nom d'utilisateur_ apache-tomcat-_10.0.23_
            * Changer les permissions pour que tomcat et le groupe aient lu, écrit, exécuté des privilèges, par exemple.
Chmod -R ug+rwx apache-tomcat-_10.0.23_
            * Supprimer les permissions d'un autre utilisateur pour lire, écrire ou exécuter :
-R o-rwx apache-tomcat-_10.0.23_
Ceci est important, car il empêche d'autres utilisateurs de lire des informationsERDDAP™configurer les fichiers.
            
              
### Mémoire{#memory} 
* Définir les variables d'environnement de Tomcat
    
Sur Linux et Macs :
Créer un fichier _tomcat_/bin/setenv.sh (ou dans Red Hat Enterprise Linux\\[RHEL\\], éditer ~tomcat/conf/tomcat10.conf) pour définir les variables d'environnement de Tomcat. Ce fichier sera utilisé par _tomcat_/bin/startup.sh et stopdown.sh. Le fichier devrait contenir quelque chose comme :
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (mais remplacez les noms de répertoires de votre ordinateur) .
 (Si vous avez déjà défini JRE\\_HOME, vous pouvez supprimer cela.)   
Sur Macs, vous n'avez probablement pas besoin de définir JAVA\\_HOME.

Sous Windows :
Créez un fichier _tomcat_\\bin\\setenv.bat pour définir les variables d'environnement de Tomcat. Ce fichier sera utilisé par _tomcat_\\bin\\startup.bat etshutdown.bat. Le fichier devrait contenir quelque chose comme :
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (mais remplacez les noms de répertoires de votre ordinateur) .
Si c'est juste pour les tests locaux, supprimer "-serveur".
 (Si vous avez déjà défini JRE\\_HOME, vous pouvez supprimer cela.) 

Les paramètres de mémoire -Xmx et -Xms sont importants carERDDAP™fonctionne mieux avec plus de mémoire. Toujours définir -Xms à la même valeur que -Xmx.

* Pour les systèmes d'exploitation 32 bits et 32 bitsJava:
64 bitsJavaest beaucoup mieux que 32 bitsJavamais 32 bitsJavafonctionnera aussi longtemps que le serveur n'est pas vraiment occupé. La mémoire plus physique dans le serveur le mieux: 4 Go+ est vraiment bon, 2 Go est correct, moins n'est pas recommandé. Avec 32 bitsJava, même avec une mémoire physique abondante, Tomcat etJavane fonctionnera pas si vous essayez de régler -Xmx beaucoup plus de 1500M (1200M sur certains ordinateurs) . Si votre serveur a moins de 2 Go de mémoire, réduisez la valeur -Xmx (dans 'M'egaBytes) à la moitié de la mémoire physique de l'ordinateur.
* Pour les systèmes d'exploitation 64 bits et 64 bitsJava:
64 bitsJavafonctionnera uniquement sur un système d'exploitation 64 bits.
    
    * AvecJava8, vous devez ajouter \\-d64 au paramètre Tomcat CATALINA\\_OPTS dans setenv.bat
    * AvecJava21, vous choisissez 64 bitsJavalorsque vous téléchargez une version deJavamarquée "64 bits".
    
Avec 64 bitsJava, Tomcat etJavapeut utiliser des paramètres très élevés -Xmx et -Xms. Plus la mémoire physique du serveur est bonne. Comme suggestion simpliste: nous vous recommandons de définir -Xmx et -Xms (dans 'M'egaBytes) à 1/2 (ou moins) de la mémoire physique de l'ordinateur. Tu peux voir si Tomcat,JavaetERDDAP™sont en effet en mode 64 bits en cherchant "bit", dansERDDAP's Daily Report email ou dans le _bigParentDirectory_/logs/[Log.txt](/docs/server-admin/additional-information#log)fichier (_bigParentDirectory_ est spécifié dans[configuration.xml](#setupxml)) .
#### Collecte des ordures{#garbage-collection} 
* EnERDDAP™'s[Log.txt](/docs/server-admin/additional-information#log)fichier, vous verrez beaucoup "GC (Défaut de répartition) " des messages.
Ce n'est généralement pas un problème. C'est un message fréquent d'un fonctionnement normalJavadisant qu'il vient de finir une petite collecte d'ordures parce qu'il manquait de place à Eden (de la sectionJavatas pour objets très jeunes) . Habituellement, le message vous montre _memoryUseAvant_\\-&gt;_memoryUseAprès_. Si ces deux chiffres sont rapprochés, cela signifie que la collecte des ordures n'était pas productive. Le message n'est qu'un signe d'ennui s'il est très fréquent (toutes les quelques secondes) , pas productif, et les chiffres sont grands et ne croissent pas, ce qui indique ensemble queJavaa besoin de plus de mémoire, peine à libérer la mémoire, et est incapable de libérer la mémoire. Cela peut se produire pendant une période stressante, puis partir. Mais s'il persiste, c'est un signe de trouble.
* Si vous voyez java.lang.OutOfMemoryError est dansERDDAP™'s[Log.txt](/docs/server-admin/additional-information#log)fichier, voir[De mémoire](/docs/server-admin/additional-information#outofmemoryerror)pour des conseils sur la façon de diagnostiquer et résoudre les problèmes.
         
### Autorisations{#permissions} 
*   [Sur Linux et Macs, changez les permissions](#permissions)de tous\\*.shfichiers dans _tomcat_/bin/ pour être exécutables par le propriétaire, par exemple, avec
```
    chmod +x \\*.sh  
```
### Polices{#fonts} 
*   [Polices pour images:](#fonts)Nous préférons fortement le libre[Polices DejaVu](https://dejavu-fonts.github.io/)à l'autreJavapolices. L'utilisation de ces polices est fortement recommandée mais pas nécessaire.
    
Si vous choisissez de ne pas utiliser les polices DejaVu, vous devez changer le paramètre fontFamily dans setup.xml pour&lt;fontFamily&gt;SansSerif&lt;/fontFamille&gt;, qui est disponible avec tousJavadistributions. Si vous définissez fontFamille au nom d'une police qui n'est pas disponible,ERDDAP™ne chargera pas et imprimera une liste des polices disponibles dans le fichier log.txt. Vous devez utiliser une de ces polices.
    
Si vous choisissez d'utiliser les polices DejaVu, assurez-vous que le paramètre fontFamily dans setup.xml est&lt;police Famille&gt;DejaVu Sans&lt;/fontFamille&gt;.
    
Pour installer les polices DejaVu, veuillez télécharger[DejaVuFonts.zip](/DejaVuFonts.zip)  (5 522 795 octets, MD5=33E1E61FAB06A547851ED308B4FFEF42) et décompresser les fichiers de police vers un répertoire temporaire.
    
    * Sur Linux :
        * Pour Linux AdoptiumJavadistributions, voir[les présentes instructions](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/).
        * Avec d'autresJavadistributions: En tant qu'utilisateur Tomcat, copiez les fichiers de police dans _JAVA\\_HOME_/lib/fontsJavapeut trouver les polices. Rappelez-vous : si/lorsque vous passez à une version plus récente deJava, vous devez réinstaller ces polices.
    * Sur Macs : pour chaque fichier de police, double-cliquez dessus et puis cliquez sur Installer la police.
    * Sous Windows 7 et 10: dans Windows Explorer, sélectionnez tous les fichiers de police. Clic droit. Cliquez sur Installer.
             
### Essai Tomcat{#test-tomcat} 
* Testez votre installation Tomcat.
    * Linux :
        * En tant qu'utilisateur "tomcat", exécutez _tomcat_/bin/startup.sh
        * Affichez votre URL + ":8080/" dans votre navigateur (Par exemple,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .
        * Vous devriez voir la page des félicitations Tomcat.
S'il y a des problèmes, consultez le fichier journal Tomcat _tomcat_/logs/catalina.out.
    * Mac (exécuter tomcat en tant qu'utilisateur administrateur système) :
        * Exécuter _tomcat_/bin/startup.sh
        * Affichez votre URL + ":8080/" dans votre navigateur (Par exemple,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) . Notez que par défaut, votre Tomcat n'est accessible que par vous. Elle n'est pas accessible au public.
        * Vous devriez voir la page des félicitations Tomcat.
S'il y a des problèmes, consultez le fichier journal Tomcat _tomcat_/logs/catalina.out.
    * Windows localhost & #160;:
        
        * Faites un clic droit sur l'icône Tomcat dans le plateau du système, et choisissez "Démarrer le service".
        * Affichage[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/)ou peut-être[ http://localhost:8080/ ](http://localhost:8080/), dans votre navigateur. Notez que par défaut, votre Tomcat n'est accessible que par vous. Elle n'est pas accessible au public.
        * Vous devriez voir la page des félicitations Tomcat.
S'il y a des problèmes, consultez le fichier journal Tomcat _tomcat_/logs/catalina.out.
            
### Des problèmes avec l'installation de Tomcat ?{#troubles-with-the-tomcat-installation} 
* Sur Linux et Mac, si vous ne pouvez pas atteindre Tomcat ouERDDAP™  (ou peut-être que vous ne pouvez pas les atteindre à partir d'un ordinateur en dehors de votre pare-feu) , vous pouvez tester si Tomcat écoute le port 8080, en tapant (comme racine) sur une ligne de commande du serveur :
```  
    netstat -tuplen | grep 8080  
```
Cela devrait revenir à une ligne avec quelque chose comme:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (où '#' est un chiffre) , indiquant qu'un processus "java" (Probablement Tomcat) écoute sur le port "8080" pour le trafic "tcp". Si aucune ligne n'a été retournée, si la ligne renvoyée est significativement différente, ou si deux lignes ou plus ont été retournées, alors il peut y avoir un problème avec les paramètres du port.
* Voir le fichier journal Tomcat _tomcat_/logs/catalina.out. Problèmes de Tomcat et certainsERDDAP™Les problèmes de démarrage y sont presque toujours indiqués. C'est courant quand vous êtes en première mise en placeERDDAP™.
* Voir[Tomcat](https://tomcat.apache.org/)site web ou rechercher de l'aide sur le web, mais s'il vous plaît laissez-nous savoir les problèmes que vous avez eus et les solutions que vous avez trouvées.
* Voir notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).
             
### ERDDAP™Contenu{#erddap-content} 
3.  [Mettre en place le_tomcat_/content/erddapfichiers de configuration.](#erddap-content)  
Sur Linux, Mac et Windows, télécharger[Contenu.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (version 1.0.0, 20333 octets, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, daté 2024-10-14) et décompresser dans _tomcat_, en créant_tomcat_/content/erddap.

    \\[Certaines versions antérieures sont également disponibles:
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19 792 octets, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, daté du 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19 792 octets, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, daté du 2022-02-16)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19 810 octets, MD5=1E26F62E7A06191EE6868C40B9A29362, daté du 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810 octets, MD5=1E26F62E7A06191EE6868C40B9A29362, daté du 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19 810 octets, MD5=1E26F62E7A06191EE6868C40B9A29362, daté du 2023-02-27) 
et décompresser dans _tomcat_, en créant_tomcat_/content/erddap.\\]
    
#### Autres répertoires{#other-directory} 
Pour Red Hat Enterprise Linux (RHEL) ou pour d'autres situations où vous n'êtes pas autorisé à modifier le répertoire Tomcat ou où vous souhaitez/besoin de mettre leERDDAP™répertoire de contenu dans un autre emplacement pour une autre raison (par exemple, si vous utilisez Jetty au lieu de Tomcat) , dézip erddapContenu.zipdans le répertoire souhaité (auquel seul user=tomcat a accès) et définir leerddapContentDirectorypropriété du système (Par exemple,erddapContentDirectory=~tomcat/content/erddap) doncERDDAP™peut trouver ce nouveau répertoire de contenu.
    
### configuration.xml{#setupxml} 
*   [Lire les commentaires en_tomcat_/content/erddap/ **configuration.xml** ](#setupxml)et d'apporter les modifications demandées. setup.xml est le fichier avec tous les paramètres qui spécifient comment votreERDDAP™se comporter.
Pour la configuration initiale, vous DEVEZ au moins modifier ces paramètres :
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
Lorsque vous créez le bigParentDirectory, à partir du répertoire parent de bigParentDirectory:
    
    * Faire de user=tomcat le propriétaire du bigParentDirectory, par exemple,
```
        chown -R tomcat _bigParentDirectory_
```
    * Modifier le "groupe" pour être tomcat, votre nom d'utilisateur ou le nom d'un petit groupe qui inclut tomcat et tous les administrateurs de Tomcat/ERDDAP, par exemple,
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Changer les permissions pour que tomcat et le groupe aient lu, écrit, exécuté des privilèges, par exemple.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Supprimer les permissions d'un autre utilisateur pour lire, écrire ou exécuter. Ceci est important pour empêcher la lecture d'informationsERDDAP™fichiers journaux et fichiers contenant des informations sur les ensembles de données privés.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Variables d'environnement{#environment-variables} 
En commençant parERDDAP™v2.13,ERDDAP™les administrateurs peuvent surcharger n'importe quelle valeur dans setup.xml en spécifiant une variable d'environnement nomméeERDDAP\\__valueName_ avant l'exécutionERDDAP™. Par exemple, utiliserERDDAP\\_baseUrl remplace&lt;baseUrl&gt; valeur. Cela peut être pratique lors du déploiementERDDAP™avec un conteneur comme Docker, comme vous pouvez mettre des paramètres standard dans setup.xml et ensuite fournir des paramètres spéciaux via des variables d'environnement. Si vous fournissez des renseignements secrets àERDDAP™via cette méthode, assurez-vous de vérifier que les informations resteront secrètes.ERDDAP™ne lit que les variables d'environnement une fois par démarrage, dans la première seconde de démarrage, donc une façon d'utiliser ceci est: définir les variables d'environnement, démarrerERDDAP, attendez jusqu'àERDDAP™est démarré, puis désactive les variables d'environnement.
    
### datasets.xml {#datasetsxml} 
* Lire les commentaires en[ **Travailler avec lesdatasets.xmlFichier** ](/docs/server-admin/datasets). Plus tard, après que vous ayezERDDAP™courir pour la première fois (généralement avec juste les ensembles de données par défaut) , vous modifierez le XML dans_tomcat_/content/erddap/ **datasets.xml** pour spécifier tous les ensembles de données que vous souhaitezERDDAP™pour servir. C'est là que vous passerez la majeure partie de votre temps pendant la mise en placeERDDAP™et plus tard tout en maintenant votreERDDAP™.

Vous pouvez voir un exemple[datasets.xmlsur GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).
     
*    (Peu probable) Maintenant ou (légèrement plus probable) à l'avenir, si vous voulez modifier le fichier CSS d'erddap, faites une copie de_tomcat_/content/erddap/images/erddapStart2.css appelé erddap2.css puis y apporter des modifications. Les changements à erddap2.css ne prennent effet que lorsqueERDDAP™est redémarré et nécessite souvent aussi l'utilisateur pour effacer les fichiers en cache du navigateur.
     
ERDDAP™ne fonctionnera pas correctement si setup.xml oudatasets.xmlfichier n'est pas un fichier XML bien formé. Donc, après avoir édité ces fichiers, c'est une bonne idée de vérifier que le résultat est bien formé XML en collant le texte XML dans un vérificateur XML comme[xmlvalidation](https://www.xmlvalidation.com/).
     
### Installez le fichier erddap.war{#install-the-erddapwar-file} 
4. Sur Linux, Mac et Windows, télécharger[Guerre](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)dans _tomcat_/webapps .
     (version 2.27.0, 620 554 403 octets, MD5=3b2086c659eee4145ca2dff447bf4ef7, datée 06-11-2025) 
    
Le fichier .war est grand parce qu'il contient des données de littoral, de limite et d'altitude à haute résolution nécessaires pour créer des cartes.
    
    \\[Certaines versions antérieures sont également disponibles.
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551 068 245 octets, MD5=5FEA912B5D42E50EAB9591F773EA848D, daté du 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551 069 844 octets, MD5=461325E97E7577EC671DD50246CCFB8B, daté du 2022-02-23)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 octets, MD5=F2CFF805893146E932E498FDBD519B6, daté du 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567 742 765 octets, MD5=2B33354F633294213AE2AFDDCF4DA6D0, daté du 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572 124 953 octets, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, daté du 2023-03-03) 
    [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568 748 187 octets, MD5=970fbee172e28b0b8a07756eecbc898e, daté du 2024-06-07) 
    [2,25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039 octets, MD5=652AFC9D1421F00B5F789DA2C4732D4C, daté du 2024-11-07) 
    [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)  (607 404 032 octets, MD5=99a725108b37708e5420986c1616a119, daté 2025-03-31) 
    \\]
    
#### ProxyPass{#proxypass} 
5. Utiliser Proxy Passez pour que les utilisateurs n'aient pas à mettre le numéro de port, par exemple :8080, dans l'URL.
Sur les ordinateurs Linux, si Tomcat fonctionne dans Apache, veuillez modifier l'Apachehttpfichier d.conf (généralement dans /etc/httpd/conf/) permettre le trafic HTTP vers/depuisERDDAP™sans exiger le numéro de port, par exemple :8080, dans l'URL. En tant qu'utilisateur racine :
    1. Modifier l'actuel&lt;VirtualHost &gt; étiquette (s'il y en a un) , ou en ajouter un à la fin du fichier:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Puis redémarrez Apache: /usr/sbin/apachectl -K gracieux (mais parfois il est dans un répertoire différent) .
         
### NGINX{#nginx} 
 (UNCOMMON) Si vous utilisez[NGINX](https://www.nginx.com/)  (un serveur web et un équilibreur de charge) :
pour obtenir NGINX etERDDAP™fonctionnant correctement avechttps, vous devez mettre l'extrait suivant dans le serveur Tomcat.xml&lt;Host&gt; bloc:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
Et dans le fichier de configuration nginx, vous devez définir ces en-têtes :
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Grâce à Kyle Wilcox.)   
     
### Démarrer Tomcat{#start-tomcat} 
*    (Je ne recommande pas d'utiliser le Tomcat Web Application Manager. Si vous ne vous arrêtez pas complètement et ne démarrez pas Tomcat, tôt ou tard vous aurez des problèmes de mémoire PermGen.)   
     
*    (Dans Linux ou Mac OS, si vous avez créé un utilisateur spécial pour exécuter Tomcat, par exemple, tomcat, rappelez-vous de faire les étapes suivantes en tant qu'utilisateur.)   
     
* Si Tomcat est déjà en marche, fermez Tomcat avec (dans Linux ou Mac OS) _tomcat_/bin/shutdown.sh
ou (dans Windows) _tomcat_\\bin\\\shutdown.bat
    
Sur Linux, utilisez ps -ef|grep tomcat avant et après l'arrêt.sh pour s'assurer que le processus tomcat a cessé. Le processus devrait être énuméré avant l'arrêt et éventuellement non après l'arrêt. Ça peut prendre une minute ou deux.ERDDAP™d'arrêter complètement. Soyez patient. Ou si on dirait qu'il ne s'arrêtera pas seul, utilisez :
tuer -9 _processusID_
    
* Commencez par Tomcat (dans Linux ou Mac OS) _tomcat_/bin/startup.sh
ou (dans Windows) _tomcat_\\bin\\startup.bat

## EstERDDAP™courir ?{#is-erddap-running} 
Utilisez un navigateur pour essayer de voir http://_www.YourServer.org_/erddap/status.html   
ERDDAP™démarre sans aucun ensemble de données chargé. Les ensembles de données sont chargés dans un fil de fond et deviennent donc disponibles un par un.

### Dépannage{#troubleshooting} 
* Lorsqu'une requête d'un utilisateur entre en jeu, elle est adressée à Apache (sur les ordinateurs Linux et Mac OS) , puis Tomcat, alorsERDDAP™.
* Vous pouvez voir ce qui vient à Apache (et erreurs connexes) dans les fichiers journaux Apache.
*   [Toi](/docs/server-admin/additional-information#tomcat-logs)peut voir ce qui vient à Tomcat (et erreurs connexes) dans les fichiers journaux Tomcat (_tomcat_/logs/catalina.out et autres fichiers dans ce répertoire) .
*   [Toi](/docs/server-admin/additional-information#log)peut voir ce qui vient àERDDAP, messages de diagnostic deERDDAP, et les messages d'erreur deERDDAP, dansERDDAP™ &lt;bigParentDirectory&gt;logs/log.txt fichier.
* Tomcat ne commence pas.ERDDAP™jusqu'à ce que Tomcat obtienne une demande pourERDDAP™. Donc vous pouvez voir dans les fichiers journaux Tomcat si elle a commencéERDDAP™ou s'il existe un message d'erreur lié à cette tentative.
* QuandERDDAP™commence, il renomme l'ancienERDDAP™fichier log.txt (logArchivéAt_CurrentTime_.txt) et crée un nouveau fichier log.txt. Donc si le journal de bord. Le fichier txt est vieux, c'est un signe queERDDAP™n'a pas redémarré récemment.ERDDAP™écrit des informations de journal dans un tampon et écrit seulement le tampon dans le fichier journal périodiquement, mais vous pouvez forcerERDDAP™pour écrire le tampon dans le fichier journal en visitant .../erddap/status.html.

### Problème: Ancienne version deJava {#trouble-old-version-of-java} 
Si vous utilisez une version deJavatrop vieux pourERDDAP,ERDDAP™vous verrez un message d'erreur dans le fichier journal de Tomcat comme
Exception dans le fil "main" java.lang.Non supportéClassVersionErreur:
_quelques/classe/nom_ & #160;: Non pris en charge major.minor version _someNumber_
La solution est de mettre à jour la version la plus récente deJavaet assurez-vous que Tomcat l'utilise.

### Problème: démarrage lent Première fois{#trouble-slow-startup-first-time} 
Tomcat doit faire beaucoup de travail la première fois une application commeERDDAP™est commencé; notamment, il doit déballer l'erddap. fichier de guerre (qui est comme un.zipfichier) . Sur certains serveurs, la première tentative de voirERDDAP™étalons (30 secondes ?) jusqu'à ce que ce travail soit terminé. Sur d'autres serveurs, la première tentative échouera immédiatement. Mais si vous attendez 30 secondes et essayez encore, il réussira siERDDAP™a été correctement installé.
Il n'y a pas de solution. C'est simplement comme ça que Tomcat fonctionne. Mais il ne se produit que la première fois après avoir installé une nouvelle version deERDDAP™.

## Arrêt et redémarrage{#shut-down-and-restart} 
À l'avenir, fermer (et redémarrer)  ERDDAPVoir[Comment fermer et redémarrer Tomcat etERDDAP](/docs/server-admin/additional-information#shut-down-and-restart).
## Des problèmes ?{#trouble} 
Problèmes d'installation de Tomcat ouERDDAP? Voir notre[section sur l'obtention d'un soutien supplémentaire](/docs/intro#support).
## Notification par courriel des nouvelles versionsERDDAP {#email-notification-of-new-versions-of-erddap} 
Si vous voulez recevoir un email chaque fois qu'une nouvelle version deERDDAP™est disponible ou autre importantERDDAP™annonces, vous pouvez rejoindre leERDDAP™Liste des annonces[ici](https://groups.google.com/g/erddap-announce). Cette liste est en moyenne d'environ un courriel tous les trois mois.
## Personnaliser{#customize} 
[Personnalisez votreERDDAP™pour souligner votre organisation (pasNOAA ERD) .](#customize)
    * Changer la bannière qui apparaît en haut de tousERDDAP™.html pages en éditant&lt;startBodyHtml5&gt; dans votre étiquettedatasets.xmlfichier. (S'il n'y en a pas, copiez la valeur par défautERDDAP's
        \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml fichier dansdatasets.xmlet le modifier.) Par exemple, vous pourriez :
        * Utiliser une image différente (i.e., le logo de votre organisation) .
        * Changer la couleur de fond.
        * Changer "ERDDAP"à "Votre Organisation"ERDDAP"
        * Changez « Meilleur accès aux données scientifiques » pour « Meilleur accès aux données de _Votre organisation ».
        * Changez les liens « créés par » pour être des liens vers votre organisation et des sources de financement.
    * Modifier les informations sur le côté gauche de la page d'accueil en éditant&lt;l'étiquette ShortDescriptionHtml&gt; dans votredatasets.xmlfichier. (S'il n'y en a pas, copiez la valeur par défautERDDAP's
        \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml fichier dansdatasets.xmlet le modifier.) Par exemple, vous pourriez :
        * Décrivez ce que fait votre organisation et/ou votre groupe.
        * Décrivez quel type de données ceERDDAP™l'a fait.
    * Pour modifier l'icône qui apparaît sur les onglets du navigateur, mettez le favicon de votre organisation. ico en_tomcat_/content/erddap/images/ . Voir[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon).
