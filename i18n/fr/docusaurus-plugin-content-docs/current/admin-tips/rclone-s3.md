Ce contenu est basé sur [message de Roy Mendelssohn au ERDDAP groupe d'utilisateurs](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) .

Récemment, nous avons obtenu un certain nombre de demandes de renseignements pour obtenir de l'aide concernant l'accès aux fichiers sur AWS S3 ERDDAP™ . Premièrement, ERDDAP™ version 2.29 aura amélioré l'accès S3 qui devrait fonctionner avec les magasins objets non-AWS également. (Merci Seth &#33;) . Mais j'ai déjà mentionné l'utilisation d'un système basé sur FUSE pour faire apparaître le magasin S3 comme un système de fichiers sur votre serveur ou VM.

Une façon de le faire est d'utiliser .. (https://rclone.org/) . rclone fonctionne sur de nombreux systèmes différents S3, et a beaucoup de paramètres différents pour optimiser les performances, y compris la mise en place d'une taille de cache, qui, espérons-le, peut compenser une partie de la pénalité de vitesse en exécutant FUSE. L'avantage d'utiliser rclone avec ERDDAP TM est que rclone gère toutes les interactions avec S3, donc les types de données comme EDDGrid DeNcFiles peut être utilisé directement comme s'il y avait des fichiers locaux. Cela signifie que vous n'avez qu'à comprendre comment configurer rclone pour accéder à votre boutique objet, et le reste est juste des configurations de type Linux normales.

Maintenant, je manquerais de le laisser là, et je ne donnerais pas d'exemple. Dans ce qui suit, je vais monter anonymement le NOAA Goes17 données qui est sur un magasin public accessible AWS S3 sur l'un de nos serveurs Ubuntu, Dans la configuration initiale le processus rclone sera en cours d'exécution dans le premier plan pour rendre plus facile de tester que tout fonctionne, et puis je vais discuter comment transformer ii en un service en cours d'exécution en arrière-plan. Notez que dans ce qui est ci-dessous, le cache est réglé à 1 Go. Les performances peuvent bien être améliorées en rendant le cache beaucoup plus grand, disons 5 Go-10 Go ou encore plus grand. Aussi les paramètres sont mes suppositions à ce qui peut optimiser les performances, mais peut ne pas être les meilleures pour ERDDAP™ .


1. Installez le logiciel nécessaire :
———————————————

sudo apt mise à jour
sudo apt installer rclone fusible3 -y

2. Créer une télécommande anonyme S3
————————————————

rclone config create goes17 s3 \\
fournisseur AWS \\
région nous-est-1 \\
location_contraire nous-est-1 \\
env_auth false \\
anonyme vrai

3. Testez ça.
—————

Lsd va17:noaa-goes17 | tête

4. Créer un point de montage pour les données
————————————————

SUDO MKdir -p /mnt/goes17
sudo chown $USER:$USER /mnt/goes17

5. Montez les données. (Notez que ce processus s'exécute au premier plan, donc il affichera une sortie et s'assied là) 
————————

rclone -vv monture goes17:noaa-goes17 /mnt/goes17 \\
--lecture seule \\
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

6. Ouvrez un nouvel onglet sur le serveur et vérifiez
———————————————————

Ls/mnt/goes17 | tête

7. Vérifier que les données sont accessibles
———————————————
cd /mnt/goes17/ABI-L1b-RadC/2023/010/15
ncdump -H OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_f20230101536138_c20230101541461 .nc 
```
netcdf OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c20230101541461 {
dimensions:
y = 1500 ;
x = 2500 ;
number_of_time_bounds = 2 ;
band = 1 ;
number_of_image_bounds = 2 ;
num_star_looks = 24 ;
variables:
short Rad(y, x) ;
Rad:_FillValue = 1023s ;
Rad:long_name = "ABI L1b Radiances" ;
Rad:standard_name = "toa_outgoing_radiance_per_unit_wavenumber" ;
Rad:_Unsigned = "true" ;
Rad:sensor_band_bit_depth = 10b ;
Rad:valid_range = 0s, 1022s ;
Rad:scale_factor = 0.1760585f ;
Rad:add_offset = -5.2392f ;
Rad:units = "mW m-2 sr-1 (cm-1)-1" ;
Rad:resolution = "y: 0.000056 rad x: 0.000056 rad" ;
Rad:coordinates = "band_id band_wavelength t y x" ;
Rad:grid_mapping = "goes_imager_projection" ;
Rad:cell_methods = "t: point area: point" ;
Rad:ancillary_variables = "DQF" ;
.
.
.
.
```
Le résultat a été rendu étonnamment rapidement, d'autant plus que notre installation n'a pas le tube le plus rapide au monde.

8. Faire d'un service système (modifier le cas échéant pour l'utilisateur, etc.) :
—————————————

a. Créer une unité système :

sudo nano /etc/systemd/system/rclone-goes17.service

Et entrez :

[Unité]
Description=Rclone pour GOES17 public S3
Après=réseau en ligne .tar obtenir

[Service]
Type=simple
Utilisateur=ubuntu
ExecStart=/usr/bin/rclone monture goes17:noaa-goes17 /mnt/goes17 \\
--lecture seule \\
--vfs-cache-mode complet \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-intervalle 1 m \\
--vfs-read-chunk-taille 64M \\
--vfs-read-chunk-size-limite 1G \\
--vfs-read-ahead 256M \\
--taille de tampon 64M \\
24 heures
--attr-timeout 1s \\
--non-modtime \\
--s3-non-check-bucket
ExecStop=/bin/fusermount3 -u /mnt/goes17
Redémarrage=toujours
RedémarrerSec=10

[Installer]
WantedBy=multi-utilisateur .tar obtenir

b. Activer le service et démarrer :

sodo systemctl démon-recharge
sodo systemctl active --now rclone-goes17

c. Essai

statut systemctl rclone-goes17
Ls/mnt/goes17 | tête



J'espère que cela sera utile aux gens. Nous avons testé en utilisant gcsfuse sur Google Cloud Platform avec un seau qui a un espace de noms hiérarchiques avec un certain succès. Un avantage de rclone (En outre, il n'est pas spécifique au fournisseur) est qu'il a plus de paramètres pour optimiser les performances. Surtout si vous déménagez un local ERDDAP™ vers le nuage, cela peut rendre la transition presque transparente.
