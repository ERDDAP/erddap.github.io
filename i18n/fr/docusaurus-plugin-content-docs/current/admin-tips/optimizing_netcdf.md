Ce contenu est basé sur [message de Roy Mendelssohn au ERDDAP groupe d'utilisateurs](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) .

1. Optimisation des fichiers netcdf pour le cloud
—————————————

a. reconditionnement et taille de la page

Récemment en faisant quelques recherches, j'ai trouvé cet article très intéressant:

https://nsidc.github.io/cloud-optimized-icesat2/

Rien ne semble enflammer les passions comme les discussions sur les langages de programmation, les éditeurs et les formats de fichiers, et ce n'est pas une recommandation de quel format (s) vous devriez utiliser, mais plutôt pour comprendre ce qui est dans ce papier et de voir combien d'amélioration peut être obtenu ( ERDDAP™ a toujours essayé d'être agnostique sur beaucoup de ces questions, plutôt choisir d'essayer de travailler avec la façon dont les gens travaillent réellement avec les données) .

Le papier vise principalement les situations où les données sont stockées dans un magasin d'objets comme Amazon S3. Les magasins d'objets sont accessibles sur le réseau en utilisant http  (s) commandes, donc comparé au stockage avec une connexion directe au (virtuel) serveur, il y a une latence beaucoup plus longue car la requête doit faire un aller-retour. Pour les magasins d'objets vous voulez faire le moins de requêtes possible, mais si vous faites juste des demandes vraiment importantes pour diminuer le nombre d'appels, vous pouvez accéder à beaucoup plus de données que vous avez besoin, ce qui peut être également lent sinon plus. Donc l'astuce est de parvenir à un équilibre entre ces deux facteurs. Et même si l'accès aux données sur les magasins d'objets s'est grandement amélioré, il y a donc un accès au stockage directement attaché. Voici quelques-unes de ces estimations :

Disque local & #160;:
• Rechercher le temps: 0.1ms
• 6 recherche: 0.6ms (négligeable) 
• La lecture des métadonnées dispersées est rapide
Cloud HTTP & #160;:
• Demande de latence: 100-200ms
• 6 demandes: 600-1200ms (Très lent &#33;) 
• Chaque demande a réseau aller-retour temps

La deuxième chose à comprendre est que les fichiers netcdf4/hdf5 sont stockés dans des morceaux et retournés dans des pages, de sorte que la taille relative de chacun d'entre eux peut vraiment affecter la vitesse d'accès lorsque l'accès est à partir d'un magasin d'objets, et que par défaut les métadonnées sur le fichier sont dispersées dans tout le fichier, donc obtenir les métadonnées peut prendre plusieurs requêtes. Le point principal du papier est que la taille par défaut de la page pour les fichiers netcdf4/hdf5 est de 4096 octets (4Ko) - Oui. (qui est terrible pour le nuage&#33;) puisque la taille des métadonnées à elle seule est probablement plus grande que cela et que plus que probablement vos tailles de morceaux sont aussi plus grandes que cela. Donc un extrait nécessitera beaucoup de aller-retour qui est lent. Ce que vous voulez faire est de recompiler le fichier de sorte que toutes les métadonnées soit à la hauteur du fichier, et que la taille de la page soit au moins aussi grande que la taille des métadonnées plus la taille d'un morceau. Aussi par défaut la taille de la page n'est pas fixe, mais utilise une stratégie qui varie. Ce que le papier a trouvé est l'utilisation d'une taille de page fixe a produit de meilleurs résultats.

Alors, comment puis-je déterminer la taille des métadonnées de fichier?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

Et comment puis-je déterminer la taille du morceau:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

ou

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

Et comment puis-je déterminer la stratégie de taille de page:

> h5stat yourfile.nc | grep "File space management strategy"
>

Très probablement, cette commande retournera la stratégie par défaut H5F_SPACE_STRATEGY_FSM_AGGR.

Comment puis-je recompiler mon fichier netcdf pour que toutes les métadonnées soient à l'avant, et modifier la stratégie pour qu'une taille de page fixe soit utilisée, et quelle taille de page utiliser? Les règles que j'ai trouvées sont :

Sélection de la taille de la page :
• Doit être ≥ taille totale des métadonnées de fichier (critique &#33;) 
• Doit être la puissance de 2 (4Mo, 8Mo, 16Mo, etc.) 
• Ne devenez pas fou grand - 32MB est généralement le maximum pratique
• Considérez les tailles de morceaux - taille de page devrait accueillir les plus grands morceaux

Comme indiqué plus haut, la taille devrait idéalement être supérieure à la taille des métadonnées et à la taille d'un morceau. Ce que l'étude a trouvé, c'est que pour beaucoup de ensembles de données la taille de la page 8MB est un bon compromis, il est probablement plus grand que la taille des métadonnées + taille du morceau, et ne tire pas beaucoup plus de données que vous avez besoin. Pour ce faire :

h5repack -S PAGE -G 8388608 votre fichier .nc votre_fichier optimisé .nc 

Voici les valeurs à utiliser pour obtenir différentes tailles de page:

4194304 (4MB) 
8388608 (8 Mo) 
16777216 (16Mo) 
33554432 (32 Mo) 

b. Y a-t-il des avantages si vous utilisez des fichiers localement aussi?

Le papier et d'autres choses que j'ai trouvé suggèrent que même localement il peut y avoir un gain de vitesse n'importe où de 10%-30%. Dans mes tests, mais exhaustifs, j'ai trouvé des gains de vitesse d'environ 10% lorsque les demandes sont relativement petites par rapport à la taille globale du fichier, et l'augmentation de vitesse diminue au fur et à mesure que la demande augmente, mais je n'ai jamais trouvé cela plus lent.

c. TANSTAAFL

Mais il y a beaucoup de prises quelque part, ça ressemble à un déjeuner gratuit. Et la capture est que la taille de page fixe augmente la taille du fichier. Pour certains des cas que j'ai jugés :

617M mur1 .nc 
632M _optimisé .nc 
608M mur2 .nc 
616M _optimisé .nc 
29M chla1 .nc 
40M chla1_optimisé .nc 
30 M chla2 .nc 
40M chla2_optimisé .nc 

Donc le compromis est il ya une augmentation non négligeable de la taille du fichier.

d. Mais si je dois retraiter les dossiers de toute façon...

Une bonne question est si je dois écrire un script pour retraiter les fichiers, pourquoi ne pas simplement écrire un script pour traduire dans un format comme dire zarr? zarr a beaucoup de promoteurs et si vous êtes intéressé à zarr juste faire une recherche rapide canardduckgo et il ya beaucoup de bons messages, une vue peut-être plus équilibrée est àhttps://www.youtube.com/watch?v=IEAcCmcOdJs  (il est intéressant que beaucoup des points qu'il soulève sont ce que le format icechunk essaye d'aborder) . Alors pourquoi ne pas vouloir traduire vos fichiers vers quelque chose comme zarr, Premièrement, si vous créez des fichiers netcdf régulièrement, vous pouvez commencer à optimiser les fichiers à partir de maintenant, qui au fil du temps verra des gains de vitesse et vous n'aurez pas à reformater les fichiers passés, et ERDDAP™ sera toujours en mesure d'agréger les fichiers même si certains paramètres internes diffèrent. Deuxièmement, vous pourriez avoir beaucoup d'outillage qui dépend des fichiers netcdf, et cette approche signifierait de ne pas avoir à reoutilr ce qui pourrait être une grande quantité de code. Le point est d'être conscient des options et de choisir ce qui fonctionne le mieux pour votre situation. Tout comme un rappel, si vous choisissez d'utiliser des fichiers zarr avec ERDDAP™ , ils doivent être au format zarr v2.

e. Big Data - une exception

Big data est parlé beaucoup, mais combien est grande les données que la plupart des gens utilisent et comment cela se compare avec les capacités des ordinateurs portables modernes (oui ordinateurs portables, pas serveurs) . Une prise intéressante est à:

https://www.youtube.com/watch?v=GELhdezYmP0Commencez vers la minute 37 bien que toute la conversation soit intéressante

L'étude qu'il mentionne est à:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Il y a donc un pourcentage relativement faible d'utilisateurs qui ont vraiment besoin d'augmenter la puissance, mais l'écrasante majorité des utilisateurs peuvent faire leurs analyses sur un ordinateur portable, 26 To disques externes sont maintenant moins de 300 $ et les rumeurs sont que 60 To disques externes seront disponibles d'ici la fin de l'année. Quelque chose à penser.

2. Utilisation ERDDAP™ avec Google Cloud Platform ou d'autres fournisseurs de cloud autres que AWS
______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

Pour le moment ERDDAP™ est connu uniquement pour travailler avec les magasins d'objets AWS (S3) , bien que l'amélioration et la généralisation ERDDAP™ La prise en charge du stockage d'objets est dans la liste des tâches (voirhttps://github.com/ERDDAP/erddap/issues/158) . Alors quoi faire si on vous dit que vous devez diriger votre ERDDAP™ sur Google Cloud Platform (GCP) ou une plateforme similaire? Tout d'abord, la plupart des plateformes cloud offrent différents niveaux de stockage, y compris généralement celui qui est similaire au stockage local et est reconnu par le système d'exploitation, celui qui est connecté sur le réseau utilisant habituellement NFS pour l'accès (encore directement accessible par le système d'exploitation) , et un qui est un magasin d'objets. La première solution est de ne pas utiliser les magasins d'objets, et vous seriez bien d'y aller. Mais comme toujours, TANSTAAFL et l'inconvénient dans ce cas est que vous allez du magasin objet -&gt; NFS access -&gt; local store vos coûts augmentent aussi. (J'ajouterais que NFS est également accessible sur le réseau, et a ses propres problèmes de latence, cela bénéficierait également de l'optimisation des fichiers) .

Si vous devez utiliser objet store, ou ne pouvez vous permettre qu'un objet store, la réponse est un système de fichiers FUSE (https://github.com/libfuse/libfuse) . Sur GCP, on appelle cela gcsfuse, et les étapes pour l'installer sont :

• Installez gcsfuse sur votre image Linux GCP :
sudo apt mise à jour
sudo apt installer gcsfuse
• Authentifier à GCP (si elle n'est pas déjà authentifiée) :
Assurez-vous d'avoir les bonnes identifiants, généralement via le compte de service ou en exécutant gcloud auth login.
• Monter le seau GCS dans un répertoire local :
Montez votre seau GCS dans un répertoire local en utilisant gcsfuse. Cela permet à votre instance GCP d'accéder aux données comme si elles faisaient partie du système de fichiers local.
gcsfuse ton nom-bucket /path/to/mount/directory

Et maintenant, votre boutique d'objets peut être accédée comme si elle faisait partie du système de fichiers Linux, donc fonctionnera avec ERDDAP™ . Cela semble magique, obtenir le meilleur des deux mondes, il doit y avoir une prise. Et il y en a. Les systèmes de fichiers FUSE sont un peu plus lents que l'accès direct au magasin objet (fondamentalement vous avez ajouté un autre calque à l'accès) . Dans mes recherches, j'estime à quel point la carte est plus lente, donc je ne sais pas à quel point elle est plus lente. Mais si vous êtes dans une situation où vous devez exécuter sur GCP en utilisant des magasins d'objets, vous avez une solution pour le moment qui fonctionnera avec ERDDAP™ .

3. Ce que vous pouvez faire maintenant pour aider.
———————————————

Si vous avez le temps et la capacité de tester certaines de ces choses et de rapporter vos résultats, ce serait génial. Surtout si vous avez accès à GCP ou similaire et voir combien plus lent ERDDAP™ l'accès utilise FUSE (Eh bien en fait vous pouvez tester cela sur AWS aussi) . Si la pénalité de vitesse n'est pas trop grande, ce serait merveilleux, parce que j'ai des raisons de croire que certaines personnes devront bientôt exécuter leur ERDDAP™ s sur GCP avec magasin objet. Ce n'est donc pas seulement une question d'intérêt théorique.
