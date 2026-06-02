Este contenido se basa en un [mensaje de Roy Mendelssohn al ERDDAP Grupo de usuarios](https://groups.google.com/g/erddap/c/H-vJoGP42TI) .

Corriendo ERDDAP™ en la nube se ha convertido en un tema caliente. Debo señalar que ERDDAP™ siempre ha corrido en la nube, apenas la mayor parte del tiempo no en un servidor proporcionado por un proveedor de nube comercial, y el principal impedimento para correr ERDDAP™ en un proveedor de nube comercial es si utiliza almacenamiento S3, que no permite el acceso normal de bloques Linux. Si usted está dispuesto a pagar más para utilizar las opciones de acceso a bloques proporcionadas por su proveedor de nube comercial, que correr en un servidor de nube comercial es básicamente el mismo que correr en su propio equipo, excepto por supuesto el costo.

Habiendo dicho que, el 1 de diciembre de 2025 escribí un post “rclone y S3” y esto es un seguimiento. En ese email monté los swathes GOES17 y comprobé un archivo, pero no lo tomé todo el camino hacia ERDDAP™ para ver que todo funciona sin problemas. Y sí niños, puedes probar esto en casa y no necesitas consultar con un abogado o asesor médico, todo debería estar seguro. Aquí monte la OI NCDC sst avhrr v2.1 que está en AWS, configurarlo en ERDDAP™ y mostrar los resultados.

- Paso 1: Definir el punto final en rclone

rclone config crear oi sst s3 \\
proveedor AWS \\
región us-east-1 \\
location_constraint us-east-1 \\
env_auth false \\
anónimo


- Paso 2: Crear un punto de montaje para el conjunto de datos

sudo mkdir -p /mnt/oi sst 
sudo chown "USER:$USER" /mnt/oi sst 

- Paso 3: montar el almacenamiento S3 al punto de montaje

Permisos, permisos, permisos, permisos... (Con disculpas a Steve Ballmer, si sabes que sabes) ,

El montaje debe hacerse para que cualquier usuario ejecute su tomcat, generalmente usuario “tomcat”, pueda acceder a los datos. ‘rclone’ monta el conjunto de datos con propietario y grupo del usuario que ejecuta el comando mount y quiere almacenar información en el directorio de inicio del usuario (esto es probablemente mitigado si establece esto como un proceso de nivel del sistema - ver abajo) . Así que si puede ejecutar el comando de montaje como ’tomcat’, pero si como nosotros su tomcat no tiene un directorio de inicio que necesita ejecutar el comando de montaje como un usuario diferente. Para hacerlo editar el fusible. archivo conf:

1. sudo vi /etc/fuse.conf

2. Uncomment or add:

user_allow_other

3. Guardar y salir.


Los datos reales son varias capas profundas, y estoy montando a nivel de datos, no en el nivel superior, y estoy ejecutando el comando en un terminal tmux por lo que el comando sigue funcionando:

rclone -vv montaje oi sst :noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst \\
--read-only \\
--allow-other \\
--vfs-cache-mode full \\
--vfs-cache-max-size 1G \\
-vfs-cache-poll-interval 1m \\
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M \\
--buffer-size 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
- No-momento


- Paso 4: Use GenerarDatasets Xml como normal,

Uso EDDGrid DesdeNcFiles como el tipo de datos, y el directorio es /mnt/oi sst /. El pase inicial fue bastante bueno y funcionó sin problemas. Hice tres cambios en el snippet xml que podría haber sido hecho mientras se ejecuta GeneraDatasets Xml y esos fueron:

1. Cambiar el datasetid para ser oi sst _rclone

2. El directorio contiene una mezcla de archivos algunos terminando en “ .nc "y otros terminando en "preliminar" .nc ” y sólo el primero se desea. Para ello, cambie el nombre de archivo regex:

 <fileNameRegex> oi sst - avhrr-v02r01\\. .nc  </fileNameRegex> 

He dicho a menudo que encuentro a regex como uno de los misterios de la vida, y puede haber mejores maneras de hacer el reex. Pero esto funcionó.

3. La ioos_categoría no estaba lista, yo añadí eso.

Para el trabajo de producción permanente, el snippet xml puede usar un poco más de edición para ser más completo.

- Paso 5: Agregue el snippet xml al datasets.xml y establecer la bandera

Esto lleva mucho tiempo cargar en el primer paso, así que ve a encontrar otras cosas que hacer por el resto del día.

El resultado final es:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

¡Ahora ve que eso no fue demasiado doloroso&#33;

Si juega con el resultado, note primero que la configuración de rclone es una primera suposición, y debe ser probado para la optimización. Jonathan Sherman de nuestro grupo ha mirado esto y puede estar hablando de ello en su charla en la reunión del IOOS DMAC. También estará cubriendo muchos más temas relacionados con la configuración en Google Cloud Platform, tales como cómo orquestar la configuración de la VM, estableciendo el cubo S3 para tener un espacio jerárquico de nombre que en GCP es más rápido y sólo un poco más caro, y si ejecuta scripts de procesamiento para actualizar los datos servidos por los datos ERDDAP™ cómo configurarlos. Si este tema te interesa, te animo a escuchar su discurso. El ERDDAP™ está en marcha, sólo que no es accesible en el momento desde fuera NMFS red.

En segundo lugar, esto no es un AWS VM montando un cubo AWS S3, este es uno de nuestros servidores y nuestra tubería en estos días está totalmente saturada, por lo que esperaría que la configuración anterior sea más rápida que lo que he hecho. (nuestra tubería no es muy grande - gracias NMFS - pero estamos saturados - la demanda de datos ha sido fenomenal) .

Finalmente se puede preguntar - Quiero rodar mi propio, ¿dónde empiezo además de esto? He encontrado una cosa que las LLM son buenas en la información que es bien conocida y bien documentada, y las AIs que he comprobado (¡Allí va todas mis fichas&#33;) todos conocen bien a rclone y AWS y GCP, y pueden hacer la mayor parte de la configuración para usted. De hecho estaba buscando un conjunto de datos que sería bueno para demo, y una AI me dio varias sugerencias y generó la mayoría de lo que está arriba, aunque hice algunas ediciones para mi propia configuración.

Además, recuerde Seth escribió un nuevo S3 para la versión actual (2.30) de ERDDAP™ - No he comparado velocidades, e imagino que dependiendo de lo que estés haciendo cada uno tendrá sus ventajas. Para portar sobre un existente ERDDAP™ instalación, utilizando rclone puede simplificar el proceso.

-Roy

PS - Y recuerde que el rclone trabaja sobre una amplia gama de proveedores, esto no está restringido a AWS y sólo se necesitan algunos cambios en la configuración del “conexión de rclone” para un proveedor diferente.


Hacer un servicio de sistema (modificar según corresponda para el usuario, etc) :
—————————————————

[Unit]
Descripción=Montura de cierre para NOAA OISST on AWS
Quieres=network-online .tar #
Después de=network-online .tar #

[Servicio]
Tipo=notificar
Usuario=usuario
Group=yourGroup

ExecStart=/usr/bin/rclone mount oi sst :noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst \\
--read-only \\
--allow-other \\
--dir-perms 0755 \\
--file-perms 0644 \\
--vfs-cache-mode full \\
--vfs-cache-max-size 1G \\
-vfs-cache-poll-interval 1m \\
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M \\
--buffer-size 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
- No-momento

ExecStop=/bin/fusermount -uz /mnt/oi sst 
Restart=on-failure
RestartSec=10

[Install]
QuieresBy=multi-user .tar #
