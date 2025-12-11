Ce contenu est basé sur [message de Roy Mendelssohn au ERDDAP groupe d'utilisateurs](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) .

Beaucoup des demandes d'aide que nous obtenons impliquent des problèmes avec l'utilisation de la mémoire dans ERDDAP™ . Une partie de cela provient de changements dans la gestion de la mémoire en Java , ainsi que les interactions avec la gestion de la mémoire Linux OS. Je commence par croire en Java 17, Java utilise plus de mémoire que ce qui est déposé dans les paramètres de tas. Vous pouvez voir ceci si vous regardez vos paramètres de tas et puis utilisez des commandes telles que top, htop, ou btop pour vérifier l'utilisation de la mémoire des applications. Donc, par exemple, notre très utilisé ERDDAP™ L'espace est fixé à 21 Go, mais l'utilisation de la mémoire peut fonctionner à 28 Go-30 Go, parfois plus haut. Cette valeur peut augmenter s'il y a beaucoup de grandes requêtes simultanées au système.

Sur la plupart des systèmes Linux, une fois l'utilisation de la mémoire dépassée d'environ 50%, l'OS va commencer à échanger la mémoire. En outre, pour la plupart des systèmes, l'espace d'échange n'est pas ramassé tant qu'il n'est pas absolument nécessaire, ERDDAP™ est trop tard et peut causer ERDDAP™ pour geler. Et l'espace d'échange est lent, qui pour datasets.xml peut causer des mises à jour majeures à ne pas compléter, ce qui aggrave alors les problèmes.

Que pouvez-vous faire ? Tout d'abord, découvrez la véritable utilisation de la mémoire ou votre système, et avez suffisamment de RAM pour que l'utilisation de la mémoire ne dépasse pas 50%. Mais il y a aussi deux paramètres qui peuvent changer ce comportement, vm.swappiness. et vm.vfs_cache_pression.

vm.swappiness contrôle comment agressivement le noyau Linux utilise l'espace d'échange. Vous pouvez vérifier sa valeur actuelle avec :

> cat /proc/sys/vm/swappiness
>
• Par défaut est généralement 60 (sur une échelle de 0 à 100) .
• Les valeurs inférieures rendent le système moins susceptible d'échanger.
• Une valeur de 10 ou 1 est souvent utilisée pour les systèmes avec beaucoup de RAM.


Pour changer la valeur jusqu'au redémarrage, disons 10 :

> sudo sysctl vm.swappiness=10
>

Et changer définitivement :

> sudo nano /etc/sysctl.conf
>

Et éditer la valeur pour vm.swappiness. Ensuite, pour appliquer la modification:

> sudo sysctl -p
>

vm.vfs_cache_pression. dit au système à quel point être agressif dans la récupération de la mémoire. Des valeurs plus élevées. (100 ou plus) dire au système d'être plus agressif, Pour vérifier la valeur actuelle:

> cat /proc/sys/vm/vfs_cache_pressure
>

Pour changer la valeur jusqu'au prochain redémarrage :

> sudo sysctl vm.vfs_cache_pressure=150
>

Pour changer définitivement la valeur :

> sudo nano /etc/sysctl.conf
>

Et puis ajouter ou mettre à jour la ligne:

> vm.vfs_cache_pressure = 100
>

Et puis appliquer le changement:

> sudo sysctl -p
>


Que pouvez-vous faire si vous surveillez votre utilisation d'espace d'échange et que vous remarquez que l'utilisation d'échange commence à augmenter? Il y a une commande qui vide l'espace d'échange et déplace le contenu vers la mémoire. Avant de l'utiliser, vous devez vous assurer que la mémoire disponible est plus grande que l'utilisation d'échange. Je dis la mémoire disponible parce que dans les systèmes Linux avec l'utilisation de disque lourd, la mémoire cachée peut être assez élevée, de sorte que la mémoire libre se montrera comme étant très faible, mais la mémoire cache sera rendue disponible si nécessaire pour des commandes comme ceci.

> sudo swapoff -a && sudo swapon -a
>

Juste pour être certain J'aime forcer la collecte des ordures aussi après avoir fait ceci:

> sudo jcmd $(pgrep java) GC.run
>

Encore une fois, j'espère que certaines personnes trouveront cette information utile. Nous voulons faire ERDDAP™ aussi robuste que possible, et de travailler de façon aussi transparente que possible avec la façon dont les gens travaillent réellement.
