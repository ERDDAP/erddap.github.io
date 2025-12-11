Este contenido se basa en un [mensaje de Roy Mendelssohn al ERDDAP Grupo de usuarios](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) .

Recientemente, hemos estado recibiendo una serie de preguntas buscando ayuda para acceder a archivos en AWS S3 en ERDDAP™ . Primero, ERDDAP™ versión 2.29 habrá mejorado el acceso S3 que debe trabajar con las tiendas de objetos no AWS también. (¡Gracias Seth&#33;) . Pero he mencionado anteriormente sobre el uso de un sistema basado en FUSE para hacer que la tienda S3 aparezca como un sistema de archivos en su servidor o VM.

Una manera de hacer esto es utilizar “rclone”. (https://rclone.org/) . rclone trabaja en muchos sistemas S3 diferentes, y tiene una gran cantidad de ajustes diferentes para optimizar el rendimiento, incluyendo el ajuste de un tamaño de caché, que esperamos pueda compensar algunos de la penalización de velocidad de ejecutar FUSE. La ventaja de utilizar rclone con ERDDAP TM es que rclone maneja toda la interacción con S3, así que tipos de conjunto de datos como EDDGrid FromNcFiles se puede utilizar directamente como si hubiera archivos locales. Esto significa que sólo necesita averiguar cómo configurar rclone para acceder a su tienda de objetos, y el resto es simplemente configuración de tipo Linux normal.

Ahora estaría desestimado si lo dejara en eso, y no dar un ejemplo. En lo siguiente voy a montar anónimamente NOAA Datos Goes17 que está en una tienda AWS S3 accesible al público en uno de nuestros servidores Ubuntu, En la configuración inicial el proceso de rclone se ejecutará en primer plano para facilitar la prueba de que todo está funcionando, y luego voy a discutir cómo convertir ii en un servicio funcionando en segundo plano. Tenga en cuenta que en lo que está abajo, el caché se establece a 1GB. El rendimiento bien puede ser mejorado haciendo el caché mucho más grande, decir 5GB-10GB o incluso más grande. También las configuraciones son mis conjeturas en lo que puede optimizar el rendimiento, pero puede que no sean las óptimas para ERDDAP™ .


1. Instalar el software necesario:
————————————————————————

sudo apt update
sudo apt install rclone fuse3 - Sí.

2. Crear un remoto S3 anónimo
———————————————————————————

rclone config crear va17 s3 \\
proveedor AWS \\
región us-east-1 \\
location_constraint us-east-1 \\
env_auth false \\
anónimo

3. Prueba eso.
————

rclone lsd goes17:noaa-goes17 | cabeza

4. Crear un punto de montaje para los datos
———————————————————————————

sudo mkdir -p /mnt/goes17
sudo chown $USER:$USER /mnt/goes17

5. Montar los datos. (Tenga en cuenta que este proceso se ejecuta en primer plano, por lo que mostrará un poco de salida y sentarse allí) 
————————

rclone -vv mount goes17:noaa-goes17 /mnt/goes17 \\
--read-only \\
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

6. Abrir una nueva pestaña en el servidor y comprobar
—————————————————————————————————

ls /mnt/goes17 | cabeza

7. Compruebe que los datos se pueden acceder
———————————————————————————
cd/mnt/goes17/ABI-L1b-RadC/2023/010/15
ncdump - Sí. OR_ABI-L1b-RadC-M6C16_G17_s202301536138_e20230101536138_c202301541461 .nc 
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
El resultado fue devuelto sorprendentemente rápidamente, sobre todo porque nuestra instalación no tiene la tubería más rápida del mundo.

8. Hacer un servicio de sistema (modificar según corresponda para el usuario, etc) :
—————————————————

a. Crear una unidad sistematizada:

sudo nano /etc/systemd/system/rclone-goes17.service

Y entra:

[Unit]
Descripción=Montura de cierre para GOES17 público S3
Después de=network-online .tar #

[Servicio]
Tipo=simple
Usuario=ubuntu
ExecStart=/usr/bin/rclone mount goes17:noaa-goes17 /mnt/goes17 \\
--read-only \\
--vfs-cache-mode full \\
--vfs-cache-max-size 1G \\
-vfs-cache-poll-interval 1m \\
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M \\
--buffer-size 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime \\
--s3-no-check-bucket
ExecStop=/bin/fusermount3 -u /mnt/goes17
Restart=always
RestartSec=10

[Install]
QuieresBy=multi-user .tar #

b. Activar el servicio y comenzar:

Sudo systemctl daemon-reload
sudo systemctl permite --ahora rclone-goes17

c. Prueba

systemctl status rclone-goes17
ls /mnt/goes17 | cabeza



Espero que esto sea de utilidad para la gente. Hemos estado probando usando gcsfuse en Google Cloud Platform con un cubo que tiene un espacio jerárquico de nombre con cierto éxito. Una ventaja de rclone (además de que no es específico vendedor) es que tiene más configuraciones para optimizar el rendimiento. Particularmente si usted está moviendo un local ERDDAP™ a la nube, esto puede hacer que la transición sea casi perfecta.
