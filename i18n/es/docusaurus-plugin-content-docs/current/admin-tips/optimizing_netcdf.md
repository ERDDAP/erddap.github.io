Este contenido se basa en un [mensaje de Roy Mendelssohn al ERDDAP Grupo de usuarios](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) .

1. Optimización de archivos netcdf para la nube
———————————————

a. embalaje y tamaño de página

Recientemente en hacer algunas investigaciones me encontré con este artículo muy interesante:

https://nsidc.github.io/cloud-optimized-icesat2/

Nada parece inflamar pasiones como discusiones de lenguajes de programación, editores y formatos de archivo, y esto no es una recomendación de qué formato (s) debe utilizar, pero más bien para entender lo que está en ese papel y para ver cuánto mejor se puede conseguir ( ERDDAP™ ha intentado siempre ser agnóstico sobre muchos de estos asuntos, más bien elegir tratar de trabajar con cómo la gente realmente trabaja con datos) .

El papel está dirigido principalmente a situaciones donde los datos se almacenan en una tienda de objetos como Amazon S3. Las tiendas de objetos se acceden a través de la red http  (s) comandos, en comparación con el almacenamiento con una conexión directa con el (virtual) servidor, hay una latencia mucho más larga ya que la solicitud tiene que hacer un viaje redondo. Para las tiendas de objetos que desea hacer como pocas solicitudes como sea posible, pero si usted simplemente hace solicitudes realmente grandes para disminuir el número de llamadas, usted puede estar accediendo más datos de lo que necesita, que puede ser igualmente lento si no más. Así que el truco es lograr un equilibrio entre estos dos factores. Y a pesar de que el acceso a los datos en las tiendas de objetos ha mejorado considerablemente, así que tiene acceso a almacenamiento conectado directamente. Al investigar esto algunas estimaciones son:

Disk local:
• Tiempo de búsqueda: 0.1ms
• 6 busca: 0.6ms (insignificante) 
• Leer metadatos esparcidos es rápido
Cloud HTTP:
• Solicitud de latencia: 100-200ms
• 6 solicitudes: 600-1200ms (¡Muy lento&#33;) 
• Cada solicitud tiene tiempo de ida y vuelta de red

La segunda cosa a entender es que los archivos netcdf4/hdf5 se almacenan en pedazos y se devuelven en páginas, por lo que el tamaño relativo de cada uno de estos puede afectar realmente la velocidad de acceso cuando el acceso es de una tienda de objetos, y que por defecto los metadatos sobre el archivo se dispersan a través del archivo, por lo que obtener los metadatos puede tomar varias solicitudes. El punto principal del papel es que el tamaño de página predeterminado para los archivos netcdf4/hdf5 es 4096 bytes (4KB) - (que es terrible para la nube&#33;) ya que el tamaño de los metadatos por sí solo es más grande que esto y más que probable que sus tamaños de los pedazos también son más grandes que esto. Así que un extracto requerirá muchas ida y vuelta que es lenta. Lo que quieres hacer es repackear el archivo para que todos los metadatos estén en la “top” del archivo, y que el tamaño de la página es al menos tan grande como el tamaño de los metadatos más el tamaño de un pedazo. También por defecto el tamaño de la página no es fijo, pero utiliza una estrategia que varía. Lo que el papel encontrado está utilizando un tamaño de página fijo produjo mejores resultados.

¿Cómo puedo determinar el tamaño de los metadatos de archivo?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

¿Y cómo puedo determinar el tamaño del trozo:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

o

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

Y cómo puedo determinar la estrategia de tamaño de página:

> h5stat yourfile.nc | grep "File space management strategy"
>

Lo más probable es que este comando devuelva “H5F_FSPACE_STRATEGY_FSM_AGGR” que es la estrategia predeterminada y lo que queremos que regrese es “H5F_FSPACE_STRATEGY_PAGE”

¿Cómo puedo volver a empaquetar mi archivo netcdf para que todos los metadatos estén en la parte delantera, y cambiar la estrategia para que se utilice un tamaño de página fijo, y qué tamaño de página utilizar? Las reglas del pulgar que encontré son:

Selección de tamaño de página:
• Debe ser ≥ el tamaño total de metadatos de archivo (¡Crítica&#33;) 
• Debe ser poder de 2 (4MB, 8MB, 16MB, etc.) 
• No se vuelva loco grande - 32MB es generalmente el máximo práctico
• Considerar tamaños de pedazos - tamaño de página debe acomodar los pedazos más grandes

Como se ha dicho anteriormente, idealmente el tamaño debe ser mayor que el tamaño de los metadatos más el tamaño de un pedazo. Lo que el estudio encontró es que para muchos conjuntos de datos el tamaño de la página 8MB es un buen tradeoff, es probablemente más grande que el tamaño de metadatos + tamaño del trozo, y no tire mucho más datos de lo que usted necesita. Para lograr esto:

h5repack -S PAGE -G 8388608 su archivo .nc sufile_optimizado .nc 

Aquí están los valores a utilizar para obtener diferentes tamaños de página:

4194304 (4MB) 
8388608 (8MB) 
16777216 (16MB) 
33554432 (32MB) 

b. ¿Hay beneficios si se utilizan archivos localmente también?

El papel y otras cosas que he encontrado sugieren que incluso localmente puede haber una ganancia de velocidad en cualquier lugar del 10%-30%. En mis pruebas, pero exhaustivas, encontré ganancias de velocidad de alrededor del 10% cuando las solicitudes son relativamente pequeñas en comparación con el tamaño general del archivo, y el aumento de velocidad disminuye a medida que la solicitud se hace más grande, pero nunca me pareció más lento.

c. TANSTAAFL

Pero hay mucho que hacer en algún lugar, esto parece un almuerzo gratis. Y la captura es que el tamaño de la página fija aumenta el tamaño del archivo. Para algunos de los casos que intenté:

617M mur1 .nc 
632M mur1_optimized .nc 
608M mur2 .nc 
616M mur2_optimized .nc 
29M chla1 .nc 
40M chla1_optimizada .nc 
30M chla2 .nc 
40M chla2_optimizada .nc 

Así que el tradeoff es que hay un aumento no insignificante del tamaño de archivo.

d. Pero si tengo que reprocesar los archivos de todos modos...

Una buena pregunta es si tengo que escribir un script para reprocesar los archivos, ¿por qué no escribir un script para traducir a un formato como decir zarr? zarr tiene muchos proponentes y si usted está interesado en zarr sólo hacer una búsqueda rápida de pato y allí muchos buenos posts, una vista quizás más equilibrada está enhttps://www.youtube.com/watch?v=IEAcCmcOdJs  (es interesante que muchos de los puntos que plantea son lo que el formato de icechunk están tratando de abordar) . Así que, ¿por qué no desea traducir sus archivos a algo como zarr, Primero, si crea archivos netcdf regularmente, puede comenzar a optimizar los archivos de ahora en adelante, que con el tiempo verá ganancias de velocidad y no tendrá que reformar archivos pasados, y ERDDAP™ todavía será capaz de agregar sobre los archivos aunque algunos de los ajustes internos difieren. En segundo lugar, usted podría tener un montón de herramientas que depende de los archivos netcdf, y este enfoque significaría no tener que retocar lo que podría ser una gran cantidad de código. El punto es ser consciente de las opciones y elegir lo que funciona mejor para su situación. Como recordatorio, si elige usar archivos zarr con ERDDAP™ , deben ser archivos zarr formato v2.

e. Big data - un lado

Big data se habla mucho, pero lo grande es los datos que la mayoría de la gente utiliza y cómo se compara con las capacidades de los portátiles modernos (sí portátiles, no servidores) . Una toma interesante es en:

https://www.youtube.com/watch?v=GELhdezYmP0Comienza alrededor del minuto 37 aunque toda la charla es interesante

El estudio que menciona es en:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Así que hay un porcentaje relativamente pequeño de usuarios que realmente necesitan para subir el poder, pero la mayoría abrumadora de usuarios pueden hacer sus análisis en un portátil, 26 unidades externas de TB están ahora bajo $300 y rumores son que 60 unidades externas de TB estarán disponibles a finales de año. Algo en lo que pensar.

2. Uso ERDDAP™ con Google Cloud Platform u otros proveedores de cloud además de AWS
--------------------------------------------------------------------------------------------------------------------

En este momento ERDDAP™ es conocido sólo para trabajar con las tiendas de objetos AWS (S3) , aunque mejorando y generalizando ERDDAP™ ’s soporte de la tienda de objetos está en la lista de todo (verhttps://github.com/ERDDAP/erddap/issues/158) . Así que qué hacer si te dicen que tienes que ejecutar tu ERDDAP™ en Google Cloud Platform (GCP) o una plataforma similar? En primer lugar, la mayoría de las plataformas de nube ofrecen diferentes niveles de almacenamiento, generalmente incluyendo uno que es similar al almacenamiento local y es reconocido por el sistema operativo, uno que está conectado sobre la red generalmente utilizando NFS para el acceso (de nuevo accesible directamente por el sistema operativo) , y uno que es una tienda de objetos. La primera solución es no utilizar las tiendas de objetos, y usted sería bueno para ir. Pero como siempre, TANSTAAFL y el inconveniente en este caso es como usted va de la tienda de objetos - Acceso NFS - confía local tus costos también suben. (Agrego que NFS también se accede a través de la red, y tiene sus propios problemas de latencia, esto también se beneficiaría de la optimización de archivos) .

Si tiene que utilizar la tienda de objetos, o sólo puede permitirse una tienda de objetos, la respuesta es un sistema de archivos FUSE (https://github.com/libfuse/libfuse) . En GCP, esto se llama gcsfuse, y los pasos para instalarlo son:

• Instalar gcsfuse en su imagen de GCP Linux:
sudo apt update
sudo apt install gcsfuse
• Autenticate a GCP (si no ya autenticado) :
Asegúrese de tener las credenciales correctas, normalmente a través de la cuenta de servicio o ejecutando gcloud auth login.
• Montar el cubo GCS a un directorio local:
Monta tu cubo GCS a un directorio local usando gcsfuse. Esto permite que su instancia GCP acceda a los datos como si fuera parte del sistema de archivos local.
gcsfuse su nombre de bolsillo /path/to/mount/directory

Y ahora se puede acceder a su tienda de objetos como si fuera parte del sistema de archivos Linux, así que trabajará con ERDDAP™ . Esto parece mágico, conseguir lo mejor de ambos mundos, debe haber una captura. Y ahí está. Los sistemas de archivos FUSE son un poco más lento que el acceso a la tienda de objetos directamente (básicamente has añadido otra capa al acceso) . En mis estimaciones de investigación de lo mucho más lento que hay en todo el mapa, así que no tengo idea de lo mucho más lento. Pero si usted está en una situación en la que debe correr en GCP usando las tiendas de objetos, usted tiene una solución por ahora que trabajará con ERDDAP™ .

3. Lo que puedes hacer ahora para ayudar.
——————————————————————————

Si usted tiene el tiempo y la capacidad de probar algunas de estas cosas e informar de sus resultados, eso sería genial. Especialmente si usted tiene acceso a GCP o similar y ver cuánto más lento ERDDAP™ acceso está utilizando FUSE (en realidad puedes probar esto en AWS también) . Si la pena de velocidad no es demasiado grande, eso sería maravilloso, porque tengo razones para creer que algunas personas pronto tendrán que ejecutar su ERDDAP™ S en GCP con tienda de objetos. así que esto no es sólo una cuestión de interés teórico.
