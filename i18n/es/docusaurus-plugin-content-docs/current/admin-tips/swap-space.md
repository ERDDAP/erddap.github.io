Este contenido se basa en un [mensaje de Roy Mendelssohn al ERDDAP Grupo de usuarios](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) .

Muchas de las solicitudes de ayuda que recibimos implican problemas con el uso de memoria en ERDDAP™ . Parte de esto proviene de cambios en la gestión de memoria en Java , y también interacciones con la gestión de memoria de Linux OS. Comenzando creo en Java 17, Java usa más memoria de lo que se pone en la configuración del montón. Puedes ver esto si miras la configuración del montón y luego usa comandos como top, htop o btop para comprobar el uso de la memoria de las aplicaciones. Así que, por ejemplo, nuestro uso pesado ERDDAP™ tiene espacio de salto fijado en 21 GB, pero en realidad el uso de la memoria puede funcionar a 28GB-30GB, a veces más alto. Este valor puede aumentar si hay muchas solicitudes grandes simultáneas al sistema.

En la mayoría de los sistemas Linux, una vez que el uso de la memoria supere el 50%, el sistema operativo empezará a intercambiar la memoria. Además, para la mayoría de los sistemas el espacio de intercambio no es la basura recolectada hasta absolutamente necesario, que para ERDDAP™ es demasiado tarde, y puede causar ERDDAP™ para congelar. Y el intercambio de espacio es lento, que para grande datasets.xml puede causar actualizaciones importantes que no se completen, que luego agravan los problemas.

¿Qué puedes hacer con esto? Primero, descubra el verdadero uso de la memoria o su sistema, y tenga suficiente RAM para que el uso de la memoria no exceda el 50%. Pero también hay dos ajustes que pueden cambiar este comportamiento, vm.swappiness. y vm.vfs_cache_pressure.

vm.swappiness controla lo agresivamente que el kernel de Linux utiliza el espacio de intercambio. Puede comprobar su valor actual con:

> cat /proc/sys/vm/swappiness
>
• Por defecto es generalmente 60 (en una escala de 0 a 100) .
• Los valores inferiores hacen que el sistema sea menos propenso a cambiar.
• Un valor de 10 o 1 se utiliza a menudo para sistemas con mucha RAM.


Para cambiar el valor hasta reiniciar, diga a 10:

> sudo sysctl vm.swappiness=10
>

Y para cambiar permanentemente:

> sudo nano /etc/sysctl.conf
>

Y edita el valor de vm.swappiness. Luego para aplicar el cambio:

> sudo sysctl -p
>

vm.vfs_cache_pressure. le dice al sistema lo agresivo que es recuperar la memoria. Valores más altos. (100 o más) para comprobar el valor actual:

> cat /proc/sys/vm/vfs_cache_pressure
>

Para cambiar el valor hasta el siguiente reinicio:

> sudo sysctl vm.vfs_cache_pressure=150
>

Para cambiar el valor permanentemente:

> sudo nano /etc/sysctl.conf
>

Y luego añadir o actualizar la línea:

> vm.vfs_cache_pressure = 100
>

Y luego aplicar el cambio:

> sudo sysctl -p
>


¿Qué puedes hacer si monitorizas tu uso de espacio de intercambio y notas que el uso de swap está empezando a aumentar? Hay un comando que vaciará el espacio de intercambio y mover el contenido a la memoria. Antes de usar esto, usted necesita asegurarse de que la memoria disponible es más grande que el uso de swap. Yo digo que la memoria disponible porque en los sistemas Linux con el uso de disco pesado “memoria grabada” puede ser bastante alta, por lo que “memoria libre” se mostrará como muy baja, pero “memoria local” estará disponible si es necesario para comandos como este.

> sudo swapoff -a && sudo swapon -a
>

Sólo para estar seguro Me gusta forzar la recolección de basura también después de hacer esto:

> sudo jcmd $(pgrep java) GC.run
>

Espero que algunas personas encuentren esta información útil. Queremos hacer ERDDAP™ lo más robusto posible, y trabajar lo más perfectamente posible con cómo funciona la gente.
