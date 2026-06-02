Ce contenu est basé sur [message de Roy Mendelssohn au ERDDAP groupe d'utilisateurs](https://groups.google.com/g/erddap/c/H-vJoGP42TI) .

Courir ERDDAP™ dans le nuage est devenu un sujet chaud. Je dois noter que ERDDAP™ a toujours couru dans le cloud, juste la plupart du temps pas sur un serveur fourni par un fournisseur de cloud commercial, et le principal obstacle pour courir ERDDAP™ sur un fournisseur de cloud commercial est si vous utilisez le stockage S3, ce qui ne permet pas l'accès normal au bloc Linux. Si vous êtes prêt à payer plus pour utiliser les options d'accès par blocs fournies par votre fournisseur de cloud commercial, que de fonctionner sur un serveur de cloud commercial est fondamentalement le même que de fonctionner sur votre propre équipement, sauf bien sûr le coût.

Cela dit, le 1er décembre 2025, j'ai écrit un post . Dans cet email, j'ai monté le GOES17 et vérifié un fichier, mais je n'ai pas pris tout le chemin dans ERDDAP™ de voir que tout fonctionne bien. Et oui les enfants, vous pouvez essayer cela à la maison et vous n'avez pas besoin de consulter un avocat ou un conseiller médical, tout devrait être en sécurité. Ici je monte l'OI NCDC sst avhrr v2.1 qui est sur AWS, le mettre en place dans ERDDAP™ et montrer les résultats.

- Étape 1: Définir le paramètre dans rclone

rclone config create oi sst s3 \\
fournisseur AWS \\
région nous-est-1 \\
location_contraire nous-est-1 \\
env_auth false \\
anonyme vrai


- Étape 2: Créer un point de montage pour l'ensemble de données

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - sst 
"$USER:$USER" /mnt/oi sst 

- Étape 3: Monter le stockage S3 au point de montage

Autorisations, permissions, permissions... (Avec des excuses à Steve Ballmer, si vous savez que vous savez) ,

Le montage doit être fait de sorte que tout utilisateur exécute votre tomcat, habituellement l'utilisateur -tomcat, puisse accéder aux données. «rclone» monte le jeu de données avec le propriétaire et le groupe de l'utilisateur qui exécute la commande mount et veut stocker des informations dans le répertoire d'origine de l'utilisateur (Ceci est probablement atténué si vous définissez cela comme un processus au niveau du système - voir ci-dessous) . Donc si vous le pouvez, exécutez la commande mount en tant que "tomcat", mais si comme nous votre tomcat n'a pas de répertoire d'origine, vous devez exécuter la commande mount en tant qu'utilisateur différent. Pour cela éditer le fusible. fichier conf & #160;:

1. sudo vi /etc/fuse.conf

2. Décommenter ou ajouter :

_Autoriser_autre

3. Enregistrer et sortir.


Les données réelles sont de plusieurs couches profondes, et je monte au niveau des données, pas au niveau supérieur, et exécute la commande dans un terminal tmux donc la commande continue à fonctionner:

rclone -vv mount oi sst :noaa-cdr-mer-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst \\
--lecture seule \\
Autres
--vfs-cache-mode complet \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-intervalle 1 m \\
--vfs-read-chunk-taille 64M \\
--vfs-read-chunk-size-limite 1G \\
--vfs-read-ahead 256M \\
--taille de tampon 64M \\
24 heures
--attr-timeout 1s \\
- Pas de mode time


- Étape 4: Utiliser des ensembles de données Xml comme normal,

Utilisation EDDGrid DeNcFiles comme type de données, et le répertoire est /mnt/oi sst - Oui. La passe initiale était assez bonne et fonctionnait sans problème. J'ai fait trois changements à l'extrait de xml qui aurait pu être fait pendant l'exécution GenerateDatasets Xml et ceux-ci étaient:

1. Changement de l'ensemble de données sst _rclone

2. Le répertoire contient un mélange de fichiers qui se terminent par un nombre de fichiers. .nc " et d'autres se terminant en préliminaire .nc Et seulement les premiers sont désirés. Pour ce faire, modifiez le nom de fichier regex :

 <fileNameRegex> oi sst -avhrr-v02r01\\.\\d&#123;8&#125;\\ .nc  </fileNameRegex> 

J'ai souvent dit que je trouve le régex comme l'un des mystères de la vie, et il peut y avoir de meilleures façons de faire le régex. Mais ça a marché

3. La catégorie ioos_category n'était pas définie, j'ai ajouté celles-ci.

Pour un travail de production permanent, l'extrait de xml peut utiliser un peu plus d'édition pour être plus complet.

- Étape 5: Ajouter l'extrait de xml à la datasets.xml et définir le drapeau

Cela prend beaucoup de temps à charger sur le premier passage, alors allez trouver d'autres choses à faire pour le reste de la journée.

Le résultat final est:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

Maintenant voyez ce n'était pas trop douloureux &#33;

Si vous jouez avec le résultat, notez d'abord que les paramètres de rclone sont une première supposition, et devrait être testé pour l'optimisation. Jonathan Sherman, de notre groupe, en a examiné quelques-uns et peut-être en parler lors de son exposé lors de la réunion de l'IOOS DMAC. Il couvrira également beaucoup plus de sujets liés à la configuration dans Google Cloud Platform, comme comment orchestrer la configuration du VM, mettre en place le seau S3 pour avoir un espace de noms hiérarchiques qui sur GCP est plus rapide et seulement un peu plus cher, et si vous exécutez des scripts de traitement pour mettre à jour les données servies par le ERDDAP™ Comment les mettre en place. Si ce sujet vous intéresse, je vous encourage à écouter son discours. Les ERDDAP™ est en marche, juste il n'est pas accessible en ce moment de l'extérieur NMFS réseau.

Deuxièmement, ce n'est pas un AWS VM montage d'un seau AWS S3, c'est l'un de nos serveurs et notre pipe de nos jours est totalement saturée, donc vous vous attendez à ce que l'ancienne configuration soit plus rapide que ce que j'ai fait (Eh bien notre pipe n'est pas très grande - merci NMFS La demande de données a été phénoménale.) .

Enfin, vous vous demandez peut-être - je veux rouler mon propre, où dois-je commencer en dehors de cela? J'ai trouvé une chose que les LLM sont bonnes à l'information qui est bien connue et bien documentée, et les AI que j'ai vérifié (voilà tous mes jetons &#33;&#33;) tous connaissent assez bien rclone et AWS et GCP, et peuvent faire la plupart de la configuration pour vous. En fait, je cherchais un jeu de données qui serait bon à la démo, et une AI m'a donné plusieurs suggestions et a généré la plupart de ce qui est ci-dessus, bien que j'ai fait quelques modifications pour ma propre configuration.

Aussi, rappelez-vous Seth a écrit un nouveau S3 pour la version actuelle (2.30) des ERDDAP™ - Je n'ai pas comparé les vitesses, et j'imagine que selon ce que vous faites chacun aura ses avantages. Pour le portage sur un existant ERDDAP™ installation, l'utilisation de rclone peut simplifier le processus.

- Toi.

PS - Et rappelez-vous que rclone fonctionne sur un large éventail de fournisseurs, ce n'est pas limité à AWS et seulement quelques modifications aux paramètres de configuration de --rclone sont nécessaires pour un fournisseur différent.


Faire d'un service système (modifier le cas échéant pour l'utilisateur, etc.) :
—————————————

[Unité]
Description=Montage à rouleaux pour NOAA OISST sur AWS
Wants=network-online .tar obtenir
Après=réseau en ligne .tar obtenir

[Service]
Type=notifier
Utilisateur=votre Utilisateur
Groupe=votre groupe

ExecStart=/usr/bin/rclone mount oi sst :noaa-cdr-mer-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst \\
--lecture seule \\
Autres
--dir-permes 0755 \\
--permes de fichier 0644 \\
--vfs-cache-mode complet \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-intervalle 1 m \\
--vfs-read-chunk-taille 64M \\
--vfs-read-chunk-size-limite 1G \\
--vfs-read-ahead 256M \\
--taille de tampon 64M \\
24 heures
--attr-timeout 1s \\
- Pas de mode time

ExecStop=/bin/fusermount -z/mnt/oi sst 
Redémarrage = échec
RedémarrerSec=10

[Installer]
WantedBy=multi-utilisateur .tar obtenir
