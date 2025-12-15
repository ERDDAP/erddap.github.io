---
sidebar_position: 3
---
# Trabajando con el datasets.xml Archivo

 \\[ Esta página web sólo será de interés ERDDAP™ administradores. \\] 

Después de haber seguido el ERDDAP™   [Instrucciones de instalación](/docs/server-admin/deploy-install) , debe editar el datasets.xml archivo en *tomcat* /content/erddap/ para describir los conjuntos de datos que su ERDDAP™ la instalación servirá.

Puedes ver un ejemplo. [ datasets.xml en GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .

- -

##  [Introducción](#introduction)  {#introduction} 

### Algunas Asambleas necesarias{#some-assembly-required} 
Configuración de un conjunto de datos ERDDAP™ no es solo cuestión de apuntar al directorio o URL del conjunto de datos. Tienes que escribir un trozo de XML para datasets.xml que describe el conjunto de datos.

* Para conjuntos de datos redondeados, con el fin de que el conjunto de datos se ajuste a ERDDAP 's estructura de datos para datos redondeados, usted tiene que identificar un subconjunto de las variables del conjunto de datos que comparten las mismas dimensiones. ( [¿Por qué?](#why-just-two-basic-data-structures)   [¿Cómo?](#dimensions) ) 
* Los metadatos actuales del conjunto de datos se importan automáticamente. Pero si quieres modificar esos metadatos o añadir otros metadatos, tienes que especificarlo en datasets.xml . Y ERDDAP™ necesidades de otros metadatos, incluidos [atributos globales](#global-attributes)   (tales como infoUrl , institución, sourceUrl , resumen y título) y [atributos variables](#variable-addattributes)   (tales como long\\_name y unidades) . Así como los metadatos que se encuentran actualmente en el conjunto de datos agregan información descriptiva al conjunto de datos, los metadatos solicitados por ERDDAP™ añade información descriptiva al conjunto de datos. Los metadatos adicionales son una buena adición a su conjunto de datos y ayuda ERDDAP™ hacer un mejor trabajo de presentar sus datos a los usuarios que no están familiarizados con él.
*    ERDDAP™ necesita que hagas cosas especiales con [longitud, latitud, altitud (o profundidad) , y variables de tiempo](#destinationname) .

Si usted compra en estas ideas y gasta el esfuerzo para crear el XML para datasets.xml , usted consigue todas las ventajas de ERDDAP™ , incluyendo:

* Búsqueda completa de texto para conjuntos de datos
* Buscar conjuntos de datos por categoría
* Formularios de acceso a datos ( * datasetID * HTML) para que pueda solicitar un subconjunto de datos en muchos formatos de archivo diferentes
* Formularios para solicitar gráficos y mapas ( * datasetID * .graph) 
* Web Map Service ( WMS ) para conjuntos de datos redondeados
*    RESTful acceso a sus datos

Hacer el datasets.xml toma considerable esfuerzo para los primeros pocos datasets, pero **se hace más fácil** . Después del primer conjunto de datos, a menudo puede reutilizar mucho de su trabajo para el próximo conjunto de datos. Afortunadamente, ERDDAP™ viene con dos [Herramientas](#tools) para ayudarle a crear el XML para cada conjunto de datos datasets.xml .
Si te atascas, veamos nuestra [sección sobre la obtención de apoyo adicional](/docs/intro#support) .

### Variables en datasets.xml  {#varaibles-in-datasetsxml} 

As of ERDDAP™ versión 2.29.0, datasets.xml ahora (opcionalmente) procesado por un [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Esto tiene muchos usos incluyendo establecer valores privados (como contraseñas) usando variables ambientales. Esto puede ser deshabilitado estableciendo habilitarEnvParsing a false en setup.xml.

### Proveedor de datos Formulario{#data-provider-form} 
Cuando un proveedor de datos viene a usted esperando añadir algunos datos a su ERDDAP , puede ser difícil y consume mucho tiempo para recoger todos los metadatos (información sobre el conjunto de datos) necesario para agregar el conjunto de datos ERDDAP . Muchas fuentes de datos (por ejemplo, archivos .csv, Archivos de Excel, bases de datos) no tienen metadatos internos, así que ERDDAP™ tiene un Formulario de Proveedor de Datos que reúne metadatos del proveedor de datos y da al proveedor de datos alguna otra orientación, incluyendo una amplia orientación para [Datos en bases de datos](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases) . La información presentada se convierte en datasets.xml formato y luego correo electrónico al ERDDAP™ administrador (Tú) y escrito (apéndice) a *bigParentDirectory* /logs/dataProviderForm.log . Así, el formulario semiautomatiza el proceso de conseguir un conjunto de datos en ERDDAP , pero el ERDDAP™ administrador todavía tiene que completar el datasets.xml y tratar con obtener el archivo de datos (s) del proveedor o conectarse a la base de datos.

La presentación de archivos de datos reales de fuentes externas es un gran riesgo de seguridad, por lo que ERDDAP™ no trata de eso. Usted tiene que encontrar una solución que funciona para usted y el proveedor de datos, por ejemplo, correo electrónico (para pequeños archivos) , tire de la nube (por ejemplo, DropBox o Google Drive) , un sitio de sftp (con contraseñas) , o zapatilla Net (una unidad USB o disco duro externo) . Probablemente sólo deberías aceptar archivos de personas que conoces. Usted necesitará escanear los archivos para virus y tomar otras precauciones de seguridad.

No hay un enlace en ERDDAP™ al Formulario de Proveedor de Datos (por ejemplo, en ERDDAP™ página principal) . En su lugar, cuando alguien le dice que quieren que sus datos sean servidos por su ERDDAP , puede enviarles un correo electrónico diciendo algo como:
Sí, podemos conseguir sus datos ERDDAP . Para empezar, rellena el formulariohttps://*yourUrl*/erddap/dataProviderForm.html  (o http:// si https:// no está habilitado) .
Después de que termines, te contactaré para conocer los detalles finales.
Si sólo quieres mirar el formulario (sin llenarlo) , puedes ver el formulario en ERD 's ERDDAP : [Introducción](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html) , [Parte 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html) , [Segunda parte](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html) , [Parte 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html) , y [Parte 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html) . Estos enlaces sobre ERD   ERDDAP™ envíame información a mí, no a ti, así que no envíes información con ellos a menos que realmente quieras agregar datos al ERD   ERDDAP .

Si desea eliminar el Formulario de Proveedor de Datos de su ERDDAP™ , poner
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
en su archivo setup.xml.

El impulso para esto fue NOAA 2014 [Acceso público a resultados de investigación (PARR) Directiva](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf) , que requiere que todo NOAA datos ambientales financiados a través de dólares de los contribuyentes se ponen a disposición mediante un servicio de datos (no sólo archivos) dentro de 12 meses de creación. Así que hay mayor interés en utilizar ERDDAP™ para poner los conjuntos de datos disponibles a través de un servicio ASAP. Necesitamos una manera más eficiente de tratar con un gran número de proveedores de datos.

¿Retroalimentación/Sugerencias? Este formulario es nuevo, así que por favor email erd dot data at noaa dot gov si usted tiene algún comentario o sugerencias para mejorar esto.

### Herramientas{#tools} 
 ERDDAP™ viene con dos programas de línea de comandos que son herramientas para ayudarle a crear el XML para cada conjunto de datos que desea su ERDDAP™ para servir. Una vez que hayas preparado ERDDAP™ y ejecutarlo (al menos una vez) , usted puede encontrar y utilizar estos programas en *tomcat* /webapps/erddap/WEB-INF directory. Hay scripts Linux/Unix shell (con la extensión .sh) y scripts de Windows (con la extensión .bat) para cada programa. \\[ En Linux, ejecute estas herramientas como el mismo usuario (¿Tomcat?) que correrá Tomcat. \\] Cuando ejecutas cada programa, te hará preguntas. Para cada pregunta, escriba una respuesta, luego presione Enter. O pulse ^C para salir de un programa en cualquier momento.

#### ¿El programa no funcionará?{#program-wont-run} 

* Si tienes un programa desconocido (o similares) mensaje de error, el problema es probablemente que el sistema operativo no pudo encontrar Java . Tienes que averiguar dónde Java está en su computadora, a continuación, editar la referencia java en el archivo .bat o .sh que está tratando de utilizar.
* Si usted consigue un archivo de tarro no encontrado o clase no se encontró mensaje de error, entonces Java no podía encontrar una de las clases enumeradas en el archivo .bat o .sh que está tratando de utilizar. La solución es averiguar dónde está ese archivo .jar y editar la referencia de java en el archivo .bat o .sh.
* Si está usando una versión de Java que es demasiado viejo para un programa, el programa no funcionará y verá un mensaje de error como
Excepción en hilo "main" java.lang.UnsupportedClassVersionError:
     *algunos/clase/nombre* : Versión principal sin soporte *algunosNúmero*   
La solución es actualizar a la versión más reciente de Java y asegúrese de que el archivo .sh o .bat para el programa lo está utilizando.

#### Las herramientas imprimen varios mensajes de diagnóstico:{#the-tools-print-various-diagnostic-messages} 

* La palabra "ERROR" se utiliza cuando algo salió tan mal que el procedimiento no pudo completar. Aunque es molesto obtener un error, el error le obliga a lidiar con el problema.
* La palabra "WARNING" se utiliza cuando algo salió mal, pero el procedimiento fue capaz de ser completado. Son bastante raros.
* Cualquier otra cosa es sólo un mensaje informativo. Puede añadir \\-verbose a la [GenerarDatasetsXml](#generatedatasetsxml) o [DasDds](#dasdds) línea de comandos para obtener mensajes informativos adicionales, que a veces ayuda a resolver problemas.

Las dos herramientas son una gran ayuda, pero todavía debe leer todas estas instrucciones en esta página cuidadosamente y tomar decisiones importantes usted mismo.

### GenerarDatasetsXml{#generatedatasetsxml} 
*    **GenerarDatasetsXml** es un programa de línea de comandos que puede generar un borrador aproximado del XML de conjunto de datos para casi cualquier tipo de conjunto de datos.
    
We STRONGLY RECOMMEND that you use GenerateDatasets Xml en lugar de crear pedazos de datasets.xml a mano porque:
    
    * GenerarDatasets Xml trabaja en segundos. Hacer esto a mano es al menos una hora de trabajo, incluso cuando sabes lo que estás haciendo.
    * GenerarDatasets Xml hace un mejor trabajo. Hacer esto a mano requiere un amplio conocimiento de cómo ERDDAP™ funciona. Es poco probable que usted hará un mejor trabajo a mano. (Bob Simons siempre usa GenerateDatasets Xml para el primer borrador, y escribió ERDDAP .) 
    * GenerarDatasets Xml siempre genera un trozo válido de datasets.xml . Cualquier pedazo de datasets.xml que escriba probablemente tendrá al menos algunos errores que prevengan ERDDAP™ desde la carga del conjunto de datos. A menudo toma horas para diagnosticar estos problemas. No pierdas tu tiempo. Let Generate Datasets Xml hace el trabajo duro. Entonces puedes refinar el .xml a mano si quieres.
    
Cuando usted utiliza el GenerarDatasets Programa Xml:
    
    * En Windows, la primera vez que ejecuta GenerateDatasetsXml, necesita editar el archivo GenerateDatasetsXml.bat con un editor de texto para cambiar la ruta hacia la java. archivo exe para que Windows pueda encontrar Java .
    * GenerarDatasets Xml primero le pide que especifique el EDDType (Erd Dap Dataset Tipo) del conjunto de datos. Ver el [Lista de tipos de conjunto de datos](#list-of-types-datasets)   (en el presente documento) para averiguar cuál es el tipo apropiado para el conjunto de datos en el que está trabajando. Además de los EDDTypes regulares, también hay algunos [Tipos de conjunto de datos especiales/Pseudo](#specialpseudo-dataset-types)   (por ejemplo, uno que arrastra un catálogo de THREDDS para generar un pedazo de datasets.xml para cada uno de los conjuntos de datos del catálogo) .
    * GenerarDatasets Xml entonces le hace una serie de preguntas específicas a ese EDDType. Las preguntas reúnen la información necesaria para ERDDAP™ para acceder a la fuente del conjunto de datos. Para entender qué ERDDAP™ está pidiendo, vea la documentación para el EDDType que especificó haciendo clic en el mismo tipo de conjunto de datos en el [Lista de tipos de conjunto de datos](#list-of-types-datasets) .
        
Si necesita introducir una cadena con caracteres especiales (por ejemplo, caracteres blancos al principio o al final, caracteres no ASCII) , entrar a [cuerda de estilo JSON](https://www.json.org/json-en.html)   (con caracteres especiales escaparon con caracteres \\) . Por ejemplo, para introducir sólo un personaje de pestaña, introduzca "\\t" (con las citas dobles circundantes, que dicen ERDDAP™ que esta es una cadena de estilo JSON.
        
    * A menudo, una de sus respuestas no será lo que GeneraDatasetsXml necesita. Entonces puedes intentarlo de nuevo, con respuestas revisadas a las preguntas, hasta GenerateDatasets Xml puede encontrar y entender con éxito los datos fuente.
    * Si responde correctamente a las preguntas (o lo suficientemente correcto) , GenerarDatasets Xml se conectará a la fuente del conjunto de datos y recopilará información básica (por ejemplo, nombres variables y metadatos) .
Para conjuntos de datos que son de locales NetCDF   .nc y archivos relacionados, GenerateDatasets Xml a menudo imprimirá la estructura similar al ncdump del archivo después de que primero lea el archivo. Esto puede darle información para responder mejor a las preguntas en un bucle posterior a través de GenerateDatasetsXml.
    * GenerarDatasets Xml generará un borrador aproximado del XML de conjunto de datos para ese conjunto de datos.
    * Se escribirá información diagnóstica y el borrador áspero del XML de conjunto de datos *bigParentDirectory* /logs/GenerateDatasetsXml.log .
    * El borrador áspero del XML de conjunto de datos se escribirá para *bigParentDirectory* /logs/GenerateDatasetsXml.out .
#### "0 archivos" Mensaje de error{#0-files-error-message} 
Si corres GenerateDatasets Xml o [DasDds](#dasdds) , o si intenta cargar una EDDGrid Desde...Files o EDDTableDesde... Dataset de archivos en ERDDAP™ , y recibe un mensaje de error de "0 archivos" indicando que ERDDAP™ encontrados 0 archivos coincidentes en el directorio (cuando usted piensa que hay archivos coincidentes en ese directorio) :
* Compruebe que ha especificado el nombre completo del directorio. Y si especificó el nombre de archivo de la muestra, asegúrese de especificar el nombre completo del archivo, incluyendo el nombre completo del directorio.
* Compruebe que los archivos realmente están en ese directorio.
* Compruebe la ortografía del nombre del directorio.
* Revisa el archivoNameRegex. Es realmente, muy fácil cometer errores con regexes. Para fines de prueba, prueba el regex .\\* que debe coincidir con todos los nombres de archivo. (Mira esto. [documentación de regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) y [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
* Compruebe que el usuario que está ejecutando el programa (por ejemplo, user=tomcat (?) para Tomcat/ ERDDAP ) tiene permiso 'leer' para esos archivos.
* En algunos sistemas operativos (por ejemplo, SELinux) y dependiendo de la configuración del sistema, el usuario que ejecutó el programa debe tener permiso 'leer' para toda la cadena de directorios que conducen al directorio que tiene los archivos.


* Si tienes problemas que no puedes resolver, [Solicitud de apoyo](/docs/intro#support) con la mayor información posible. De manera similar, si parece que el EDDType adecuado para un conjunto de datos dado no funciona con ese conjunto de datos, o si no hay EDDType adecuado, por favor, archiva un [sobre GitHub](https://github.com/ERDDAP/erddap/issues) con los detalles (y un archivo de muestra si es relevante) .
         
#### Necesita editar la salida de GenerateDatasets Xml para mejorarlo.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* DESCLAMADOR:
EL CHUNK OF datasets.xml MADE BE GenerarDatasets Xml no es perfecto. Debes leer y grabar el XML antes de usarlo en una pública ERDDAP . GenerarDatasets Xml RELIES ON A LOT OF RULES-OF-THUMB WHICH AREN'T ALWAYS CORRECT. Usted es RESPONSABLE PARA AUMENTAR LA CORRECCIÓN DEL XML QUE AÑADIR A ERDDAP 'S datasets.xml Silencio.
    
     (No estoy gritando. Por razones legales históricas, los descargos deben ser escritos en todos los caps.) 
    
La salida de GenerateDatasetsXml es un borrador duro.
Casi siempre tendrás que editarlo.
Hemos hecho y seguimos haciendo un gran esfuerzo para hacer que la salida sea lo más lista posible, pero hay límites. A menudo, la información necesaria simplemente no está disponible en los metadatos de origen.
    
Un problema fundamental es que estamos pidiendo un programa informático (GenerarDatasetsXml) para hacer una tarea donde, si le dieras la misma tarea a 100 personas, obtendrías 100 resultados diferentes. No hay una sola respuesta "derecha". Obviamente, el programa se acerca más a leer la mente de Bob (no tuyo) , pero aún así, no es un programa de IA todo-comprendido, sólo un montón de heurísticas adoquinaron juntos para hacer una tarea similar a IA. (Ese día de un programa de IA que todo lo entiende puede venir, pero aún no lo ha hecho. Si/cuando lo hace, los humanos podemos tener problemas mayores. Ten cuidado con lo que deseas.) 
    
* Para fines informativos, la salida muestra la fuente globalAtributos y fuente variableAtributos como comentarios. ERDDAP™ combina fuenteAtributos y addAttributes   (que tienen precedencia) para hacer la combinación Atributos que se muestran al usuario. (Y otros atributos se añaden automáticamente a variables de longitud, latitud, altitud, profundidad y tiempo cuando ERDDAP™ realmente hace el conjunto de datos) .
     
* Si no te gusta una fuenteAtributo, sobreescribirla añadiendo una adiciónAtributo con el mismo nombre pero un valor diferente (o ningún valor, si quieres eliminarlo) .
     
* Todo el mundo addAttributes son sugerencias generadas por ordenador. ¡Mátalos&#33; Si no te gusta un agregadoAttribute, cámbialo.
     
* Si quieres añadir otro addAttributes , agréguelos.
     
* Si quieres cambiar un destinationName Cámbialo. Pero no cambies sourceName s.
     
* Puedes cambiar el orden del dataVariable s o eliminar cualquiera de ellos.


    * Entonces puedes usar [DasDds](#dasdds)   (véase infra) para probar repetidamente el XML para ese conjunto de datos para asegurar que el conjunto de datos resultante aparezca como desee. ERDDAP .
    * Siéntete libre de hacer pequeños cambios datasets.xml que se generó, por ejemplo, suministrar un mejor infoUrl , resumen o título.
#### noAddStandardNames{#donotaddstandardnames} 
Si incluye \\-doNotAddStandardNames como parámetro de línea de comandos cuando se ejecuta genera Datasets Xml, genera Datasets Xml no añadirá standard\\_name a la addAttributes para cualquier variables distintas de variables llamadas latitud, longitud, altitud, profundidad o tiempo (que tienen standard\\_name s) . Esto puede ser útil si está utilizando la salida de generar Datasets Xml directamente en ERDDAP™ sin editar la salida, porque genera Datasets Xml suele adivinar standard\\_name incorrectamente. (Tenga en cuenta que siempre recomendamos que edite la salida antes de usarlo en ERDDAP .) Usando este parámetro tendrá otros efectos relacionados menores porque el conjeturado standard\\_name a menudo se utiliza para otros fines, por ejemplo, para crear un nuevo long\\_name , y para crear la configuración de colorBar.
#### Scripting{#scripting} 
Como alternativa para responder las preguntas de forma interactiva en el teclado y bucle para generar conjuntos de datos adicionales, puede proporcionar argumentos de línea de comandos para responder a todas las preguntas para generar un conjunto de datos. GenerarDatasets Xml procesará esos parámetros, escribirá la salida al archivo de salida y saldrá del programa.
        
Para configurar esto, primero utilice el programa en modo interactivo y escriba sus respuestas. Aquí hay un ejemplo parcial:
Digamos que ejecuta el script: ./GenerateDatasetsXml.sh
Ingrese: EDDTableDesdeAsciiFiles
Ingrese: /u00/data/
Entonces entra:
Ingrese: /u00/data/sampleFile.asc
A continuación, introduzca: ISO-8859-1
        
Para ejecutar esto de forma no interactiva, utilice esta línea de comandos:
./GenerateDatasetsXml.sh EDDTableDesdeAsciiFiles /u00/data/ .\\*\\\.asc /u00/data/sampleFile.asc ISO-8859-1
Así que básicamente, sólo enumera todas las respuestas en la línea de comandos.
Esto debe ser útil para conjuntos de datos que cambian con frecuencia de una manera que requiere re-correr GenerateDatasets Xml (notablemente EDDGrid DeThreddsCatalog) .
        
Detalles:

* Si un parámetro contiene un espacio o algún personaje especial, codifica el parámetro como un [cuerda de estilo JSON](https://www.json.org/json-en.html) "Mi parámetro con espacios y dos \\n líneas".
* Si desea especificar una cadena vacía como parámetro, use: nada
* Si desea especificar el valor predeterminado de un parámetro, use: default
             
* GenerarDatasets Xml soporta a -i *conjuntos de datos XmlName* # *tagName* parámetro línea de comandos que inserta la salida en el parámetro especificado datasets.xml archivo (el default *tomcat* /content/erddap/ datasets.xml ) . GenerarDatasets Xml busca dos líneas en conjuntos de datos XmlName:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
y
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
y reemplaza todo entre esas líneas con el nuevo contenido, y cambia el tiempo de destino.
* El interruptor -i solo se procesa (y cambios en datasets.xml sólo se hacen) si corres GenerateDatasets Xml con argumentos de línea de comandos que especifican todas las respuestas a todas las preguntas para un bucle del programa. (Ver 'Scripting' arriba.)   (El pensamiento es: Este parámetro es para uso con scripts. Si utiliza el programa en modo interactivo (escribiendo información sobre el teclado) , es probable que genere algunos fragmentos incorrectos de XML antes de generar el que desee.) 
* Si no se encuentran las líneas de Inicio y Fin, entonces esas líneas y el nuevo contenido se insertan justo antes&lt;/erddapDatasets confiar.
* También hay un -I (capital i) interruptor para propósitos de prueba que funciona igual que -i, pero crea un archivo llamado datasets.xml  *Fecha* y no hace cambios a datasets.xml .
* No corras GenerateDatasets Xml con -i en dos procesos a la vez. Hay una posibilidad de que sólo se mantenga un conjunto de cambios. Puede haber problemas graves. (por ejemplo, archivos dañados) .
    
Si utiliza "GenerateDatasetsXml -verbose", imprimirá más mensajes de diagnóstico de lo habitual.
    
#### Tipos de conjunto de datos especiales/Pseudo{#specialpseudo-dataset-types} 
En general, las opciones EDDType en GenerateDatasets Xml match of the EDD types described in this document (ver el [Lista de tipos de conjunto de datos](#list-of-types-datasets) ) y generar uno datasets.xml para crear un conjunto de datos de una fuente de datos específica. Existen algunas excepciones y casos especiales:
    
#####  EDDGrid FromErddap{#eddgridfromerddap} 
Este EDDType genera todo el datasets.xml pedazos necesarios para hacer [ EDDGrid FromErddap](#eddfromerddap) conjuntos de datos de todos los EDDGrid datasets in a remote ERDDAP . Usted tendrá la opción de mantener el original datasetID s (que puede duplicar algunos datasetID ya en tu ERDDAP ) o generando nuevos nombres que serán únicos (pero generalmente no son tan legibles por el ser humano) .
     
##### EDDTableDeErddap{#eddtablefromerddap} 
Este EDDType genera todo el datasets.xml pedazos necesarios para hacer [EDDTableDeErddap](#eddfromerddap) conjuntos de datos de todos los conjuntos de datos EDDTable en un remoto ERDDAP . Usted tendrá la opción de mantener el original datasetID s (que puede duplicar algunos datasetID ya en tu ERDDAP ) o generando nuevos nombres que serán únicos (pero generalmente no son tan legibles por el ser humano) .
     
#####  EDDGrid DeThreddsCatalog{#eddgridfromthreddscatalog} 
Este EDDType genera todo el datasets.xml pedazos necesarios para todos los [ EDDGrid DeDap](#eddgridfromdap) conjuntos de datos que puede encontrar arrastrando recursivamente a través de un THREDDS (sub) catálogo. Hay muchas formas de URLs del catálogo de THREDDS. Esta opción requiere una URL de THREDDS .xml con /catalog/ en ella, por ejemplo,
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xmlo
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml  
(a related .html catalog is at
https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html, que no es aceptable para EDDGrid DeThreddsCatalog).
Si tienes problemas con EDDGrid DeThredds Catálogo:
* Asegúrese de que la URL que está utilizando es válida, incluye /catalog/, y termina con /catalog.xml .
* Si es posible, utilice una dirección IP pública (por ejemplo,https://oceanwatch.pfeg.noaa.gov) en la URL, no una dirección IP numérica local (por ejemplo,https://12.34.56.78) . Si los THREDDS sólo son accesibles a través de la dirección IP numérica local, puede utilizar [&lt;convertToPublicSourceUrl] (#converttopublicsourceurl) Así que... ERDDAP™ los usuarios ven la dirección pública, aunque ERDDAP™ obtiene datos de la dirección numérica local.
* Si tienes problemas que no puedes resolver, [comprobar los consejos de solución de problemas](#troubleshooting-tips) .
* El código de bajo nivel para esto ahora utiliza el Unidata netcdf-java catálogo gateer code (Tredds. Clases de catálogo) para que pueda manejar todos los catálogos de THREDDS (que puede ser sorprendentemente complejo) Gracias Unidata para ese código.
         
#####  EDDGrid LonPM180DesdeErddapCatalog{#eddgridlonpm180fromerddapcatalog} 
Este EDDType genera el datasets.xml para hacer [ EDDGrid LonPM180](#eddgridlonpm180) conjuntos de datos de todos los EDDGrid datasets in an ERDDAP que tienen valores de longitud superiores a 180.
* Si es posible, utilice una dirección IP pública (por ejemplo,https://oceanwatch.pfeg.noaa.gov) en la URL, no una dirección IP numérica local (por ejemplo,https://12.34.56.78) . Si ERDDAP™ sólo es accesible a través de la dirección IP numérica local, puede utilizar [&lt;convertToPublicSourceUrl] (#converttopublicsourceurl) Así que... ERDDAP™ los usuarios ven la dirección pública, aunque ERDDAP™ obtiene datos de la dirección numérica local.
         
#####  EDDGrid Lon0360DesdeErddapCatalog{#eddgridlon0360fromerddapcatalog} 
Este EDDType genera el datasets.xml para hacer [ EDDGrid Lon0360](#eddgridlon0360) conjuntos de datos de todos los EDDGrid datasets in an ERDDAP que tienen valores de longitud inferiores a 0.
* Si es posible, utilice una dirección IP pública (por ejemplo,https://oceanwatch.pfeg.noaa.gov) en la URL, no una dirección IP numérica local (por ejemplo,https://12.34.56.78) . Si ERDDAP™ sólo es accesible a través de la dirección IP numérica local, puede utilizar [&lt;convertToPublicSourceUrl] (#converttopublicsourceurl) Así que... ERDDAP™ los usuarios ven la dirección pública, aunque ERDDAP™ obtiene datos de la dirección numérica local.
         
##### EDDsDeFiles{#eddsfromfiles} 
Dado un directorio inicial, esto atraviesa el directorio y todos los subdirectorios y trata de crear un conjunto de datos para cada grupo de archivos de datos que encuentra.
* Esto supone que cuando se encuentra un conjunto de datos, el conjunto de datos incluye todos los subdirectorios.
* Si se encuentra un conjunto de datos, directorios similares de hermanos serán tratados como conjuntos de datos separados (por ejemplo, los directorios para los años noventa, los 2000, los 2010's, generarán conjuntos de datos separados) . Deberían ser fáciles de combinar a mano -- simplemente cambiar el primer conjunto de datos&lt;fileDir contacto con el directorio padre y eliminar todos los conjuntos de datos de hermanos posteriores.
* Esto sólo tratará de generar un pedazo de datasets.xml para el tipo más común de extensión de archivo en un directorio (no cuenta .md5, que se ignora) . Así que, dado un directorio con 10 .nc archivos y 5 .txt archivos, se generará un conjunto de datos para el .nc Sólo archivos.
* Esto supone que todos los archivos en un directorio con la misma extensión pertenecen al mismo conjunto de datos. Si un directorio tiene algunos .nc archivos con datos SST y algunos .nc archivos con datos de clorofila, solo una muestra .nc archivo será leído (¿SST? ¿Clorofila?) y sólo se creará un conjunto de datos para ese tipo de archivo. Ese conjunto de datos probablemente no se cargará debido a las complicaciones de intentar cargar dos tipos de archivos en el mismo conjunto de datos.
* Si hay menos de 4 archivos con la extensión más común en un directorio, esto supone que no son archivos de datos y simplemente salta el directorio.
* Si hay 4 o más archivos en un directorio, pero esto no puede generar con éxito datasets.xml para los archivos (por ejemplo, un tipo de archivo sin soporte) , esto generará un [EDDTableDesdeFileNames](#eddtablefromfilenames) Dataset para los archivos.
* Al final del diagnóstico que esto escribe al archivo de registro, justo antes del datasets.xml pedazos, esto imprimirá una tabla con un resumen de la información reunida por el rastreo de todos los subdirectorios. La tabla enumerará cada subdirectorio e indicará el tipo más común de extensión de archivo, el número total de archivos, y qué tipo de conjunto de datos se creó para estos archivos (si) . Si te enfrentas a una estructura de archivos compleja y profundamente anidada, considera correr GenerateDatasets Xml con EDDType=EDDsDeFiles sólo para generar esta información,
* Esta opción puede no hacer un gran trabajo de adivinar el mejor EDDType para un grupo dado de archivos de datos, pero es rápido, fácil y vale la pena intentarlo. Si los archivos fuente son adecuados, funciona bien y es un buen primer paso en generar el datasets.xml para un sistema de archivos con un montón de subdirectorios, cada uno con archivos de datos de diferentes conjuntos de datos.
         
##### EDDTableDeEML y EDDTableDeEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
Este EDDType especial genera el datasets.xml para hacer una [EDDTableDesde el aeropuerto](#eddtablefromasciifiles) dataset de cada una de las tablas descritas [Ecological Metadata Language](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) Archivo XML. La variante "Batch" funciona en todos los archivos EML en un directorio local o remoto. Por favor, vea el separado [documentación para EDDTableDesdeEML](/docs/server-admin/EDDTableFromEML) .
     
##### EDDTableDesde InPort{#eddtablefrominport} 
Este EDDType especial genera el datasets.xml para hacer una [EDDTableDesde el aeropuerto](#eddtablefromasciifiles) dataset desde la información en un [inport-xml](https://inport.nmfs.noaa.gov/inport) archivo. Si puede acceder al archivo de datos fuente (el archivo inport-xml debe tener pistas para dónde encontrarlo) , puede hacer un conjunto de datos de trabajo en ERDDAP .

Los siguientes pasos describen cómo utilizar GenerateDatasets Xml con un archivo inport-xml para obtener un conjunto de datos de trabajo en ERDDAP .

1. Una vez que tenga acceso al archivo inport-xml (ya sea como una URL o un archivo local) : ejecutar GenerateDatasets Xml, especifique EDDType=EDDTableDesdeInPort, especifique la URL inport-xml o nombre completo de archivo, especifique quéChild=0, y especifique la otra información solicitada (si se sabe) . (En este punto, usted no necesita tener el archivo de datos fuente o especificar su nombre.) El ajuste queChild=0 dice GenerarDatasets Xml para escribir la información para **Todos** de la&lt;entidad-atributo-información&lt;en el archivo inport-xml (si hay alguna) . También imprime un resumen de información de antecedentes, incluyendo todos los datos de descarga listados en el archivo inport-xml.
2. Mira toda esa información (incluyendo la información de fondo que GeneraDatasets Impresión Xml) y visitar la descarga-url (s) para tratar de encontrar el archivo de datos fuente (s) . Si puedes encontrarlo (ellos) , descargarlo (ellos) en un directorio que es accesible ERDDAP . (Si no puede encontrar ningún archivo de datos fuente, no hay punto en proceder.) 
3. Run Generate Datasets Otra vez Xml.
Si el archivo de datos fuente corresponde a uno del archivo inport-xml&lt;entidad-atributo-información&lt;entidad título, especificar qué niño= *queEntity'sNumber*   (por ejemplo, 1, 2, 3, ...) . ERDDAP™ intentará igualar los nombres de las columnas en el archivo de datos fuente a los nombres de la información de la entidad, y pedirá que acepte/rechate/fijo cualquier discrepancia.
O, si el archivo inport-xml no tiene ninguna&lt;entidad-atributo-información&lt;entidad título, especifique qué niño=0.
4. En el pedazo de datasets.xml que fue hecho por GenerateDatasets Xml, revisa el [global]&lt; addAttributes &gt; (#global-atributos) según sea necesario o deseado.
5. En el pedazo de datasets.xml que fue hecho por GenerateDatasetsXml, añadir/revise el [&lt; dataVariable &gt; (#datavariable) información según sea necesario o deseada para describir cada una de las variables. Asegúrese de identificar correctamente cada variable
[&lt; sourceName &gt; (#sourcename)   (como aparece en la fuente) ,
[&lt; destinationName &gt; (#Destino)   (que tiene más limitaciones en caracteres permitidos que sourceName ) ,
[&lt;unidades] (#unidades)   (especialmente si es un [tiempo o temporizador variable](#timestamp-variables) donde las unidades necesitan especificar el formato) , y
[&lt; missing\\_value &gt; (#missing_value) ,
6. Cuando estés cerca de terminar, usa repetidamente el [DasDds](#dasdds) herramienta para ver rápidamente si la descripción del conjunto de datos es válida y si el conjunto de datos aparecerá en ERDDAP™ como quieras.
     

Sería genial si los grupos que utilizan InPort para documentar sus conjuntos de datos también utilizaran ERDDAP™ para poner los datos efectivos disponibles:

*    ERDDAP™ es una solución que se puede utilizar ahora mismo para que pueda cumplir NOAA 's [Acceso público a resultados de investigación (PARR) necesidades](https://nosc.noaa.gov/EDMC/PD.DSP.php) ahora mismo, no en un momento vago en el futuro.
*    ERDDAP™ hace que los datos reales estén disponibles para los usuarios, no sólo los metadatos. (¿Qué bien son los metadatos sin datos?) 
*    ERDDAP™ soporta metadatos (en particular, las unidades de variables) , a diferencia de otros software del servidor de datos que se están considerando. (¿Qué bien son los datos sin metadatos?) Utilizar software que no admite metadatos es invitar a los datos a ser malinterpretados y mal utilizados.
*    ERDDAP™ es software libre y de código abierto a diferencia de otros software que se están considerando. Desarrollo permanente ERDDAP™ ya está pagado. Apoyo ERDDAP™ Los usuarios son libres.
*    ERDDAP 's apariencia se puede personalizar fácilmente para reflejar y resaltar su grupo (no ERD o ERDDAP ) .
*    ERDDAP™ ofrece una manera consistente de acceder a todos los conjuntos de datos.
*    ERDDAP™ puede leer datos de muchos tipos de archivos de datos y de bases de datos relacionales.
*    ERDDAP™ puede tratar con grandes conjuntos de datos, incluyendo conjuntos de datos donde los datos de la fuente están en muchos archivos de datos.
*    ERDDAP™ puede escribir datos a muchos tipos de archivos de datos, a petición del usuario, incluyendo tipos de archivos de datos científicos como netCDF, ESRI .csv, y ODV .txt .
*    ERDDAP™ puede hacer gráficos y mapas personalizados de subconjuntos de los datos, basados en las especificaciones del usuario.
*    ERDDAP™ puede tratar con conjuntos de datos no data, como colecciones de archivos de imagen, vídeo o audio.
*    ERDDAP™ ha sido instalado y utilizado en [más de 60 instituciones en todo el mundo](/#who-uses-erddap) .
*    ERDDAP™ se enumera como uno de los servidores de datos recomendados para uso dentro NOAA en el [ NOAA Data Access Procedural Directive](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) , a diferencia de que se está considerando otro software.
*    ERDDAP™ es un producto de NMFS / NOAA , así que utilizarlo dentro NMFS y NOAA debe ser un punto de orgullo para NMFS y NOAA .

Por favor. ERDDAP™ un intento. Si necesita ayuda, por favor envíe un mensaje en el ERDDAP™ Grupo de Google.
     
##### addFillValueAttributes{#addfillvalueattributes} 
Esta opción especial EDDType no es un tipo de conjunto de datos. Es una herramienta que puede añadir atributos \\_FillValue a algunas variables en algunos conjuntos de datos. See [addFillValueAttributes](#add-_fillvalue-attributes) .
     
##### encontrarDuplicar Hora{#findduplicatetime} 
Esta opción especial EDDType no es un tipo de conjunto de datos. En lugar de eso, dice GenerarDatasets Xml para buscar a través de una colección de rejillas .nc   (y conexas) archivos para encontrar e imprimir una lista de archivos con valores de tiempo duplicados. Cuando mira los valores de tiempo, los convierte de las unidades originales a "seconds since 1970-01-01" en caso de que diferentes archivos usen diferentes cadenas de unidades. Necesitas proporcionar el directorio inicial (con o sin la barra de seguimiento) , el nombre del archivo expresión regular (por ejemplo, .nc  ) , y el nombre de la variable de tiempo en los archivos.
     
##### ncdump{#ncdump} 
Esta opción especial EDDType no es un tipo de conjunto de datos. En lugar de eso, dice GenerarDatasets Xml para imprimir [ncdump](https://linux.die.net/man/1/ncdump) \\-como impresión de una .nc , .nc ml o .hdf archivo. En realidad utiliza el netcdf-java [NCdump](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html) , que es una herramienta más limitada que la versión C de NCdump. Si utiliza esta opción, GenerateDatasetsXml le pedirá que utilice una de las opciones: "-h" (header) , "c" (coordenadas) , "vall" (por defecto) , "-v var1;var2", "-v var1 (0,010,0:20) ". Esto es útil porque, sin ncdump, es difícil saber lo que hay en un .nc , .nc ml o .hdf archivo y por lo tanto qué EDDType debe especificar para GenerateDatasets Xml. Para un .nc archivo ml, esto imprimirá la salida ncdump para el resultado del .nc cambios de archivo de ml aplicados a la .nc o .hdf archivo.
         
### DasDds{#dasdds} 
*    [ **DasDds** ](#dasdds) es un programa de línea de comandos que puede utilizar después de haber creado un primer intento en el XML para un nuevo conjunto de datos en datasets.xml . Con DasDds, puede probar y perfeccionar repetidamente el XML. Cuando utiliza el programa DasDds:
    1. En Windows, la primera vez que ejecuta DasDds, necesita editar los DasDds. archivo de murciélago con un editor de texto para cambiar la ruta hacia el java. archivo exe para que Windows pueda encontrar Java .
    2. DasDds te pregunta por el datasetID para el conjunto de datos en el que está trabajando.
    3. DasDds intenta crear el conjunto de datos con eso datasetID .
        * DasDds siempre imprime muchos mensajes de diagnóstico.
Si utiliza "DasDds -verbose", DasDds imprimirá más mensajes de diagnóstico de lo habitual.
        * Para seguridad, DasDds siempre elimina toda la información de conjunto de datos caché (archivos) para el conjunto de datos antes de intentar crear el conjunto de datos. Este es el equivalente de establecer un [bandera dura](/docs/server-admin/additional-information#hard-flag) Así que para conjuntos de datos agregados, es posible que desee ajustar el archivoNameRegex temporalmente para limitar el número de archivos que el constructor de datos encuentra.
        * Si el conjunto de datos no se carga (por cualquier razón) , DasDds parará y le mostrará el mensaje de error para el primer error que encuentra.
             **No intentes adivinar cuál es el problema. Lea cuidadosamente el mensaje ERROR.**   
Si es necesario, lea los mensajes diagnósticos anteriores para encontrar más pistas e información, también.
        *    **Haga un cambio en el XML del conjunto de datos para tratar de resolver ese problema**   
y dejar que DasDds trate de crear el conjunto de datos de nuevo.
        *    **Si repetidamente resuelves cada problema, eventualmente resolverás todos los problemas**   
y el conjunto de datos se cargará.
    4. Todos los DasDds salida (diagnóstico y resultados) están escritos a la pantalla y a *bigParentDirectory* /logs/DasDds.log .
    5. Si DasDds puede crear el conjunto de datos, DasDds le mostrará el [.das (Dataset Attribute Structure) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das) , [.dds (Descriptor de Dataset Estructura) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds) , y [.timeGaps (deficiencias del tiempo) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) información para el conjunto de datos en su pantalla y escríbalos a *bigParentDirectory* /logs/DasDds.out .
    6. A menudo, usted querrá hacer un pequeño cambio en el XML del conjunto de datos para limpiar los metadatos del conjunto de datos y recorar DasDds.

### Bono Third-Party Tool: ERDDAP - No.{#bonus-third-party-tool-erddap-lint} 
 ERDDAP -lint es un programa de Rob Fuller y Adam Leadbetter del Instituto Marino Irlandés que usted puede utilizar para mejorar los metadatos de su ERDDAP™ Datasets. ERDDAP -incluye "contiene reglas y una simple aplicación web estática para realizar algunas pruebas de verificación contra su ERDDAP™ servidor. Todas las pruebas se ejecutan en el navegador web." Como el [Herramienta Unix/Linux lint](https://en.wikipedia.org/wiki/Lint_(software) ), puede editar las reglas existentes o añadir nuevas reglas. See [ ERDDAP - No.](https://github.com/IrishMarineInstitute/erddap-lint) para más información.

Esta herramienta es especialmente útil para conjuntos de datos que creaste hace algún tiempo y ahora quieres actualizar tus preferencias de metadatos actuales. Por ejemplo, versiones tempranas de GenerateDatasets Xml no puso ningún esfuerzo en crear global creator\\_name , creator\\_email , creador\\_tipo, o creator\\_url metadatos. Podrías usar ERDDAP - Insinúa identificar los conjuntos de datos que carecen de esos atributos de metadatos.

Gracias a Rob y Adam por crear esta herramienta y ponerla a disposición de la ERDDAP™ comunidad.
 
## La estructura básica de la datasets.xml Archivo{#the-basic-structure-of-the-datasetsxml-file} 
Las etiquetas requeridas y opcionales permitidas en un datasets.xml archivo (y el número de veces que pueden aparecer) se muestran a continuación. En la práctica, tu datasets.xml tendrá muchos&lt;etiquetas de dataset iconos y sólo utilizar las otras etiquetas dentro&lt;erddapDatasets confiar según sea necesario.

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

Es posible que otras codificación se permitan en el futuro, pero por ahora sólo se recomienda ISO-8859-1.
 
### XInclude{#xinclude} 
Nuevo en la versión 2.25 es soporte para XInclude. Esto requiere que usted está usando el parser SAX&lt;useSaxParser&lt;/useSaxParser confianza en su setup.xml. Esto puede permitirle escribir cada conjunto de datos en su propio archivo, luego incluirlos todos en el principal datasets.xml , reutilizar partes de las definiciones de conjunto de datos, o ambas. Si quieres ver un ejemplo, [EDDTestDataset.java](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java) establece XInclude para reutilizar las definiciones variables.
 

- -

## Notas{#notes} 

Trabajando con el datasets.xml archivo es un proyecto no-trivial. Por favor lea atentamente todas estas notas. Después de elegir un [Tipo de dataset](#list-of-types-datasets) , por favor lea la descripción detallada de ella cuidadosamente.
     
### Elegir el tipo Dataset{#choosing-the-dataset-type} 
En la mayoría de los casos, sólo hay uno ERDDAP™ tipo de conjunto de datos que es apropiado para una fuente de datos determinada. En algunos casos (por ejemplo, .nc archivos) , hay algunas posibilidades, pero generalmente uno de ellos es definitivamente mejor. La primera y mayor decisión que debe tomar es: es apropiado tratar el conjunto de datos como un grupo de arrays multidimensionales (si es así ver [ EDDGrid tipos de conjunto de datos](#eddgrid) ) o como un cuadro de datos similar a la base de datos (si es así ver [Tipos de conjunto de datos](#eddtable) ) .
     
### Servir los datos como es{#serving-the-data-as-is} 
Por lo general, no hay necesidad de modificar la fuente de datos (por ejemplo, convertir los archivos a otro tipo de archivo) así ERDDAP™ puede servirlo. Una de las hipótesis de ERDDAP™ es que la fuente de datos se utilizará como es. Normalmente esto funciona bien. Algunas excepciones son:
* Bases de datos relacionales y Cassandra -- ERDDAP™ puede servir datos directamente desde bases de datos relacionales y Cassandra. Pero para cuestiones de seguridad, equilibrio de carga y rendimiento, puede optar por configurar otra base de datos con los mismos datos o guardar los datos para NetCDF v3 .nc archivos y tienen ERDDAP™ servir los datos de la nueva fuente de datos. See [EDDTableDesde la base de datos](#eddtablefromdatabase) y [EDDTableDesdeCassandra](#eddtablefromcassandra) .
* Fuentes de datos no respaldadas -- ERDDAP™ puede soportar un gran número de fuentes de datos, pero el mundo está lleno de 1000 (¿En millones?) de diferentes fuentes de datos (notablemente, estructuras de archivos de datos) . Si ERDDAP™ no soporta su fuente de datos:
    * Si la fuente de datos es NetCDF   .nc archivos, puede utilizar [NcML](#ncml-files) para modificar los archivos de datos sobre la marcha, o utilizar [ NCO ](#netcdf-operators-nco) para modificar permanentemente los archivos de datos.
    * Puede escribir los datos a un tipo de fuente de datos que ERDDAP™ soportes. NetCDF -3 .nc archivos son una buena, recomendación general porque son archivos binarios que ERDDAP™ puede leer muy rápidamente. Para datos tabulares, considere almacenar los datos en una colección de .nc archivos que utilizan [CF Geometrías de muestreo discretos (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array estructuras de datos y así se puede manejar con ERDDAP 's [EDDTableDesdeNcCFFiles](#eddtablefromnccffiles) ). Si se organizan lógicamente (cada uno con datos para un trozo de espacio y tiempo) , ERDDAP™ puede extraer datos de ellos muy rápidamente.
    * Puede solicitar que se añada soporte para esa fuente de datos ERDDAP™ por correo electrónico a Chris. John en Noaa.gov.
    * Puede agregar soporte para esa fuente de datos escribiendo el código para manejarlo usted mismo. See [el ERDDAP™ Guía del programador](/docs/contributing/programmer-guide) 
* Velocidad... ERDDAP™ puede leer datos de algunas fuentes de datos mucho más rápido que otros. Por ejemplo, la lectura NetCDF v3 .nc archivos es rápido y leer archivos ASCII es más lento. Y si hay un gran (■1000) o enorme (√10,000) número de archivos de datos de origen, ERDDAP™ responderá a algunas solicitudes de datos lentamente. Normalmente, la diferencia no es perceptible para los humanos. Sin embargo, si piensas ERDDAP™ es lento para un conjunto de datos dado, puede elegir resolver el problema escribiendo los datos a una configuración más eficiente (generalmente: unos pocos, bien estructurados, NetCDF v3 .nc archivos) . Para datos tabulares, consulte [este consejo](#millions-of-files) .
         
### Hint{#hint} 
A menudo es más fácil generar el XML para un conjunto de datos haciendo una copia de una descripción de conjunto de datos de trabajo en dataset.xml y luego modificarlo.
    
### Codificación de caracteres especiales{#encoding-special-characters} 
Desde datasets.xml es un archivo XML, debes [&quot; código](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML) "Tío"&lt;", y "conejo" en cualquier contenido como "pacamp", "&lt;", y "condenado".
Incorrecto:&lt;título Tiempo &quot; mareas&lt;/title
Bien.&lt;título Tiempo y mareas&lt;/title
     
### XML no tolera errores de sintaxis{#xml-doesnt-tolerate-syntax-errors} 
Después de editar el archivo dataset.xml, es una buena idea verificar que el resultado es [XML bien formado](https://www.w3schools.com/xml/xml_dtd.asp) pegando el texto XML en un chequeador XML como [xmlvalidación](https://www.xmlvalidation.com/) .
     
### Consejos de solución de problemas{#troubleshooting-tips} 
*    **Otras maneras de diagnosticar problemas con los conjuntos de datos**   
Además de los dos principales [Herramientas](#tools) ,
    *    [log.txt](/docs/server-admin/additional-information#log) es un archivo de registro con todo ERDDAP Es mensajes de diagnóstico.
    * El [Daily Report](/docs/server-admin/additional-information#daily-report) tiene más información que la página de estado, incluyendo una lista de conjuntos de datos que no cargaron y las excepciones (errores) generaron.
    * El [Página](/docs/server-admin/additional-information#status-page) es una manera rápida de comprobar ERDDAP 's estado de cualquier navegador web. Incluye una lista de conjuntos de datos que no cargaron (aunque no las excepciones conexas) y la tarea (mostrando el progreso [ EDDGrid Copiado](#eddgridcopy) y [EDDTableCopy](#eddtablecopy) conjuntos de datos y cualquier [ EDDGrid DeFiles](#eddgridfromfiles) o [EDDTableDeFiles](#eddtablefromfiles) conjuntos de datos que utilizan [cacheDesde el aeropuerto](#cachefromurl)   (pero no cache SizeGB) ) .
    * Si te atascas, veamos nuestra [sección sobre la obtención de apoyo adicional](/docs/intro#support) .
         
### Variables especiales{#special-variables} 
*    ** [La longitud, latitud, altitud, profundidad, presión y tiempo (LLAT) variable](#destinationname)   [ destinationName ](#destinationname) s son especiales.** 
    * En general:
        * Las variables LLAT se hacen conocidas ERDDAP™ si la variable del eje (para EDDGrid conjuntos de datos) o variable de datos (para conjuntos de datos EDDTable)   [ destinationName ](#destinationname) es "longitud", "latitud", "altitud", " profundidad", o "time" .
        * Le animamos firmemente a utilizar estos nombres estándar para estas variables siempre que sea posible. Ninguno de ellos es requerido. Si no usa estos nombres de variables especiales, ERDDAP™ No reconocerá su significado. Por ejemplo, las variables LLAT son tratadas especialmente por Make A Graph ( * datasetID * .graph) : si la variable X Axis es "longitud" y la variable Y Axis es "latitud", obtendrás un mapa (usando una proyección estándar, y con una máscara de tierra, límites políticos, etc.) en lugar de un gráfico.
        *    ERDDAP™ añadirá automáticamente un montón de metadatos a variables LLAT (por ejemplo, " [ ioos\\_category ](#ioos_category) ", " [unidades](#units) ", y varios atributos relacionados con estándares como "\\_CoordinateAxisType") .
        *    ERDDAP™ añadirá automáticamente muchos metadatos globales relacionados con los valores LLAT del subconjunto de datos seleccionado (por ejemplo, "geospacial\\_lon\\_min") .
        * Los clientes que apoyen estos estándares de metadatos podrán aprovechar los metadatos añadidos para posicionar los datos en tiempo y espacio.
        * Los clientes encontrarán más fácil generar consultas que incluyen variables LLAT porque los nombres de la variable son los mismos en todos los conjuntos de datos relevantes.
    * Para la variable "longitud" y la variable "latitud":
        * Usar el [ destinationName ](#destinationname) "longitud" y "latitud" sólo si [unidades](#units) son grados y grados, respectivamente. Si sus datos no se ajustan a estos requisitos, utilice diferentes nombres variables (por ejemplo, x, y, lonRadians, latRadians) .
        * Si tiene datos de longitud y latitud expresados en diferentes unidades y por lo tanto con diferentes destinationName s, por ejemplo, lonRadians y latRadians, Hacer un Gráfico ( * datasetID * .graph) hará gráficos (por ejemplo, series temporales) en lugar de mapas.
    * Para la variable "altitud", "presura", o " profundidad":
        * Usar el [ destinationName ](#destinationname) "altitud" para identificar la distancia de los datos sobre el nivel del mar (valores positivos="up") . Opcionalmente, puede utilizar "altitud" para distancias por debajo del nivel del mar si los valores son negativos por debajo del mar (o si utiliza, por ejemplo,
[&lt;Anombre= scale\\_factor " type="int" 1&lt;/att] (#scale_factor) convertir valores de profundidad en valores de altitud.
        * Usar el destinationName "de profundidad" para identificar la distancia de los datos por debajo del nivel del mar (valores positivos="abajo") .
        * Alternativamente, para elevaciones definidas por niveles de presión del aire (tales como [isobars](https://en.wikipedia.org/wiki/Contour_line#Barometric_pressure) ) , usted debe establecer el destinationName a "presión". Esto admite unidades en "hPa", "Pa", y "mbar" (valores positivos="abajo") .
        * Un conjunto de datos puede tener sólo una variable "altitud", "presión", o "de profundidad".
        * Para estas variables "altitud" y " profundidad", las [unidades](#units) debe ser "m", "meter", o "meters". Si las unidades son diferentes (por ejemplo, fathoms) , puedes usar
[&lt;Anombre= scale\\_factor " *algunos Valor* &lt;/att] (#scale_factor) y [&lt;att name="units"&lt;/att] (#unidades) para convertir las unidades a metros.
        * Si sus datos no se ajustan a estos requisitos, utilice otro destinationName   (por ejemplo, sobreGround, distancia ToBottom) .
        * Si conoce el CRS vertical por favor especifiquelo en los metadatos, por ejemplo, "EPSG:5829" (altura instantánea por encima del nivel del mar) , "EPSG:5831" (profundidad instantánea por debajo del nivel del mar) , o "EPSG:5703" (Altura NAVD88) .
    * Para el "time" variable:
        * Usar el [ destinationName ](#destinationname)   "time" sólo para variables que incluyen la fecha completa + tiempo (o fecha, si eso es todo) . Si, por ejemplo, hay columnas separadas para fecha y horaOfDay, no utilice el nombre variable "time" .
        * See [unidades](#time-units) para más información sobre el atributo de unidades para el tiempo y las variables TimeStamp.
        * La variable de tiempo y relacionada [tiempo Variables de muestreo](#timestamp-variables) son únicos en que siempre convierten valores de datos del formato de tiempo de la fuente (lo que sea) en un valor numérico (segundos desde 1970-01-01T00:00Z) o un valor de String (ISO 8601:2004 (E) formato) , dependiendo de la situación.
        * Cuando un usuario solicita datos de tiempo, puede solicitarlo especificando el tiempo como valor numérico (segundos desde 1970-01-01T00:00Z) o un valor de String (ISO 8601:2004 (E) formato) .
        *    ERDDAP™ tiene una utilidad [Convertir un Numeric Tiempo para/desde un tiempo de cuerda](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
        * See [Cómo ERDDAP Tratos con el tiempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
            
### ¿Por qué sólo dos estructuras básicas de datos?{#why-just-two-basic-data-structures} 
* Puesto que es difícil para los clientes humanos y los clientes informáticos tratar con un conjunto complejo de posibles estructuras de conjunto de datos, ERDDAP™ utiliza sólo dos estructuras de datos básicas:
    * a [Estructura de los datos redondeados](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)   (por ejemplo, para datos satelitales y datos modelo) y
    * a [estructura de datos tabulares](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)   (por ejemplo, para datos de boya, estación y trayectoria in situ) .
* Ciertamente, no todos los datos se pueden expresar en estas estructuras, pero gran parte de ella puede. Los cuadros, en particular, son estructuras de datos muy flexibles (ver el éxito de los programas de bases de datos relacionales) .
* Esto hace que las consultas de datos sean más fáciles de construir.
* Esto hace que las respuestas de datos tengan una estructura simple, lo que hace más fácil servir los datos en una variedad más amplia de tipos de archivos estándar (que a menudo sólo soporta estructuras de datos simples) . Esta es la razón principal por la que hemos establecido ERDDAP™ Por aquí.
* Esto, a su vez, nos hace muy fácil (o cualquiera) para escribir software cliente que funciona con todos ERDDAP™ Datasets.
* Esto facilita la comparación de datos de diferentes fuentes.
* Somos muy conscientes de que si usted está acostumbrado a trabajar con datos en otras estructuras de datos puede pensar inicialmente que este enfoque es simplista o insuficiente. Pero todas las estructuras de datos tienen compensaciones. Ninguno es perfecto. Incluso las estructuras do-it-all tienen sus desventajas: trabajar con ellas es complejo y los archivos sólo se pueden escribir o leer con bibliotecas de software especiales. Si aceptas ERDDAP 's acercamiento suficiente para tratar de trabajar con él, usted puede encontrar que tiene sus ventajas (en particular el soporte para múltiples tipos de archivos que pueden contener las respuestas de datos) . El [ ERDDAP™ show de diapositivas](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)   (en particular [estructuras de datos](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures) ) habla mucho sobre estos problemas.
* E incluso si este enfoque suena extraño para ti, la mayoría ERDDAP™ clientes nunca se darán cuenta -- simplemente verán que todos los conjuntos de datos tienen una estructura simple agradable y estarán agradecidos de que pueden obtener datos de una amplia variedad de fuentes devueltas en una amplia variedad de formatos de archivos.
         
### Dimensiones{#dimensions} 
*    **¿Y si las variables de cuadrícula en el conjunto de datos fuente no comparten las mismas variables de eje?**   
In EDDGrid conjuntos de datos, todas las variables de datos (parte) todas las variables del eje. Así que si un conjunto de datos fuente tiene algunas variables con un conjunto de dimensiones, y otras variables con un conjunto diferente de dimensiones, tendrá que hacer dos conjuntos de datos en ERDDAP . Por ejemplo, usted podría hacer uno ERDDAP™ conjunto de datos titulado "Some Title (en la superficie) "para mantener variables que solo utilizan \\[ tiempo \\]  \\[ latitud \\]  \\[ longitud \\] dimensiones y hacer otra ERDDAP™ conjunto de datos titulado "Some Title (a profundidades) "para mantener las variables que usan \\[ tiempo \\]  \\[ altitud \\]  \\[ latitud \\]  \\[ longitud \\] . O tal vez puede cambiar la fuente de datos para añadir una dimensión con un solo valor (por ejemplo, altitud=0) para hacer las variables consistentes.
    
     ERDDAP™ no maneja conjuntos de datos más complicados (por ejemplo, modelos que usan una malla de triángulos) Bueno. Puede servir estos conjuntos de datos en ERDDAP™ creando dos o más conjuntos de datos ERDDAP™   (para que todas las variables de datos en cada nuevo conjunto de datos compartan el mismo conjunto de variables de eje) , pero eso no es lo que los usuarios quieren. Para algunos conjuntos de datos, usted podría considerar la posibilidad de hacer una versión regular rejillada del conjunto de datos y ofrecer que además de los datos originales. Algunos software cliente sólo pueden tratar con una red regular, por lo que al hacer esto, se llega a clientes adicionales.
     
    
### Datos recubridos previstos{#projected-gridded-data} 
Algunos datos redondeados tienen una estructura compleja. Por ejemplo, nivel de satélite 2 ("un largo camino") los datos no utilizan una proyección simple. Modelos (y otros) a menudo trabajan con datos redondeados sobre varias proyecciones no cilíndricas (por ejemplo, conic, estereográfico polar, tripolar) o en redes no estructuradas (una estructura de datos más compleja) . Algunos usuarios finales quieren estos datos como es, por lo que no hay pérdida de información. Para esos clientes, ERDDAP™ puede servir los datos, como es, sólo si ERDDAP™ administrador rompe el conjunto de datos original en unos pocos conjuntos de datos, con cada parte incluyendo variables que comparten las mismas variables de eje. Sí, eso parece extraño para las personas involucradas y es diferente de la mayoría OPeNDAP servidores. Pero... ERDDAP™ enfatiza poner los datos disponibles en muchos formatos. Eso es posible porque ERDDAP™ utiliza/requiere una estructura de datos más uniforme. Aunque es un poco incómodo (i.e., diferente de lo esperado) , ERDDAP™ puede distribuir los datos proyectados.

 \\[ Sí, ERDDAP™ podría tener requisitos más bajos para la estructura de datos, pero mantener los requisitos para los formatos de salida. Pero eso llevaría a confusión entre muchos usuarios, especialmente novatos, ya que muchas solicitudes aparentemente válidas de datos con diferentes estructuras serían inválidas porque los datos no encajarían en el tipo de archivo. Continuamos volviendo al diseño del sistema actual. \\] 

Algunos usuarios finales quieren datos en una proyección cilíndrica lat lon como Equirectangular / placa carrée o Mercator) para facilitar el uso en diferentes situaciones. Para estas situaciones, animamos a los ERDDAP™ administrador para utilizar otro software ( NCO ? Matlab ? ¿R? IDV? ...?) para volver a proyectar los datos sobre una (Proyección equirectangular / placa carrée) u otra proyección cilíndrica y servir esa forma de los datos en ERDDAP™ como un conjunto de datos diferente. Esto es similar a lo que hacen las personas cuando convierten datos de nivel 2 de satélite en datos de nivel 3. Una de esas herramientas es [ NCO ](https://nco.sourceforge.net/nco.html#Regridding) que ofrece opciones de extensión para regridding data.

#### GIS and Reprojecting Data{#gis-and-reprojecting-data} 
Dado que el mundo del SIG suele estar orientado al mapa, los programas del SIG suelen ofrecer apoyo para reestructurar los datos, es decir, trazar los datos en un mapa con una proyección diferente.

Actualmente, ERDDAP™ no tiene herramientas para replantear datos. En su lugar, le recomendamos que utilice una herramienta externa para hacer una variante del conjunto de datos, donde los datos han sido reproyectos de su forma original en una forma rectangular (longitud de latitud) array adecuado para ERDDAP .

En nuestra opinión, el CF/ DAP el mundo es un poco diferente al mundo del SIG y funciona a un nivel ligeramente inferior. ERDDAP™ refleja eso. En general, ERDDAP™ está diseñado para trabajar principalmente con datos (no mapas) y no quiere cambiar (por ejemplo, reproyecto) esos datos. Para ERDDAP™ , los datos redondeados se asocian a menudo/usualmente/preferiblemente con valores de lat lon y una proyección cilíndrica, y no algunos valores x,y de la proyección. En cualquier caso, ERDDAP™ no hace nada con la proyección de los datos; simplemente pasa los datos a través, como es, con su proyección actual, sobre la teoría de que una reproyección es un cambio significativo a los datos y ERDDAP™ no quiere involucrarse con cambios significativos. Además, los usuarios posteriores podrían volver a proyectar ingenuamente los datos de nuevo, lo que no sería tan bueno como hacer una reproyección. (Así que, si el ERDDAP™ administrador quiere ofrecer los datos en una proyección diferente, bien; sólo reproyecto los datos fuera de línea y ofrecer que como un conjunto de datos diferente en ERDDAP . Se ofrecen muchos conjuntos de datos basados en satélites como lo que la NASA llama Nivel 2 (Swath) y como Nivel 3 (Proyección equirectangular) versiones.) Cuando ERDDAP™ hace mapas (directamente o vía WMS o KML) , ERDDAP™ Actualmente sólo ofrece hacer mapas con la proyección Equirectangular / plate carrée que, afortunadamente, es aceptada por la mayoría de los programas de mapeo.

Alentamos ERDDAP™ administradores para utilizar algún otro software ( NCO ? Matlab ? ¿R? IDV? ...?) para volver a proyectar los datos sobre una (Proyección equirectangular / placa carrée) u otra proyección cilíndrica y servir esa forma de los datos en ERDDAP™ como un conjunto de datos diferente. Esto es similar a lo que hacen las personas cuando convierten datos de nivel 2 de satélite en datos de nivel 3. Una de esas herramientas es [ NCO ](https://nco.sourceforge.net/nco.html#Regridding) que ofrece opciones de extensión para regridding data.

Esperamos que ERDDAP™ tendrá herramientas integradas para ofrecer mapas con otras proyecciones en el futuro. También esperamos tener mejores conexiones con el mundo del SIG en el futuro (fuera de la corriente WMS servicio) . Es terrible que en este mundo "moderno", los vínculos entre el CF/ DAP el mundo y el mundo del SIG siguen siendo tan débiles. Ambas cosas están en la lista To Do. (Si quieres ayudar, en particular con la conexión ERDDAP™ a MapServer, por favor envía un correo electrónico a Chris. John en Noaa.gov.) 
    
### Tipos de datos{#data-types} 
 ERDDAP™ soporta los siguientes tipos de datos
 (los nombres son sensibles a los casos; 'u' prefijo significa "no firmado"; el número de nombres en otros sistemas es el número de bits) :

#### byte{#byte} 
*    **byte** ha firmado valores enteros con una gama de -128 a 127.
En otros sistemas, esto a veces se llama int8.
Esto se llama "tinyint" por SQL y Cassandra.
     ERDDAP™ convertidos [boolean](#boolean-data) de algunas fuentes (por ejemplo, SQL y Cassandra) en bytes ERDDAP™ con un valor de 0=falso, 1=verdad, y 127= missing\\_value .
#### ubyte{#ubyte} 
*    **ubyte** tiene valores enteros sin firmar con una gama de 0 a 255.
En otros sistemas, esto a veces se llama uint8.
#### corto{#short} 
*    **corto** ha firmado valores enteros con una gama de -32768 a 32767.
En otros sistemas, esto a veces se llama int16.
Esto se llama "smallint" por SQL y Cassandra.
#### ushort{#ushort} 
*    **ushort** tiene valores enteros sin firmar con una gama de 0 a 65535.
En otros sistemas, esto se llama a veces uint16.
#### int{#int} 
*    **int** ha firmado valores enteros con una gama de -2147483648 a 2147483647.
En otros sistemas, esto a veces se llama int32.
Esto se llama "integer" | numérico (?) "por SQL y "int" por Cassandra.
#### Uint{#uint} 
*    **Uint** tiene valores enteros sin firmar con una gama de 0 a 4294967295.
En otros sistemas, esto se llama a veces uint32.
#### largo{#long} 
*    **largo** ha firmado valores enteros con una gama de -9223372036854775808 a 9223372036854775807.
En otros sistemas, esto a veces se llama int64.
Esto se llama "bigint" | numérico (?) "por SQL y "bigint" por Cassandra.
Debido a que muchos tipos de archivos no soportan datos largos, su uso se desalienta. Cuando sea posible, use doble en su lugar (véase infra) .
#### ulong{#ulong} 
*    **ulong** tiene valores enteros no firmados con una gama de 0 a 18446744073709551615
En otros sistemas, esto se llama a veces uint64.
Debido a que muchos tipos de archivos no soportan datos ulong, su uso se desalienta. Cuando sea posible, use doble en su lugar (véase infra) .
#### flotador{#float} 
*    **flotador** es un flotador IEEE 754 con una gama de aproximadamente +/- 3.402823466e+38.
En otros sistemas, esto se llama a veces flotador32.
Esto se llama "real" | flotador (?)  | decimal (?)  | numérico (?) "por SQL y "float" por Cassandra.
El valor especial NaN significa No-a-Número.
     ERDDAP™ convierte valores de infinito positivos y negativos a NaN.
#### doble{#double} 
*    **doble** es un IEEE 754 doble con una gama de aproximadamente
+/- 1.7976931348623157E+308.
En otros sistemas, esto se llama a veces flotador64.
Esto se llama "doble precisión | flotador (?)  | decimal (?)  | numérico (?) "por SQL y "doble" por Cassandra.
El valor especial NaN significa No-a-Número.
     ERDDAP™ convierte valores de infinito positivos y negativos a NaN.
#### char{#char} 
*    **char** es un solo, 2 bytes (16-bit)   [Unicode UCS-2 carácter](https://en.wikipedia.org/wiki/UTF-16) desde \\u0000   (#0) a través \\uffff   (#65535) .
     \\uffff 's definition is Not-a-Character, analogous to a double value of NaN.
El uso de char se desalienta porque muchos tipos de archivos no soportan los charcos o solo apoyan los charcos de 1 byte (véase infra) . Considere usar String en su lugar.
Los usuarios pueden utilizar variables char para hacer gráficos. ERDDAP™ convertir los caracteres a su número de punto de código Unicode, que se puede utilizar como datos numéricos.
#### String{#string} 
*    **String** es una secuencia de 0 o más, 2 bytes (16-bit)   [caracteres Unicode UCS-2](https://en.wikipedia.org/wiki/UTF-16) .
     ERDDAP™ usa/interpreta una cadena de 0 longitud como un valor perdido. ERDDAP™ no soporta una verdadera cuerda nula.
La longitud de cadena máxima teórica es de 2147483647 caracteres, pero probablemente hay varios problemas en varios lugares incluso con cuerdas algo más cortas.
Uso ERDDAP 's String for SQL's carácter, varchar, carácter variable, binario, varbinario, intervalo, array, multiset, xml y cualquier otro tipo de datos de bases de datos que no se ajuste limpiamente con ningún otro tipo ERDDAP™ Tipo de datos.
Uso ERDDAP 's String for Cassandra's "text" and any other Cassandra data type that does not fit cleanly with any other ERDDAP™ Tipo de datos.
     

Antes ERDDAP™ v2.10, ERDDAP™ no apoyó los tipos enteros no firmados internamente y ofreció un apoyo limitado en sus lectores de datos y escritores.
    
### Limitaciones del tipo de datos{#data-type-limitations} 
Puedes pensar en ERDDAP™ como un sistema que tiene conjuntos de datos virtuales, y que funciona leyendo datos de la fuente de un conjunto de datos en un modelo de datos interno y escribiendo datos a diversos servicios (por ejemplo,(OPeN)DAP, WMS ) y tipos de archivos en respuesta a solicitudes de usuario.

* Cada lector de entradas admite un subconjunto de los tipos de datos que ERDDAP™ soportes. Así que leyendo datos ERDDAP Las estructuras internas de datos no son un problema.
* Cada escritor de salida también soporta un subconjunto de tipos de datos. Eso es un problema porque ERDDAP tiene que apretar, por ejemplo, datos largos en tipos de archivos que no soportan datos largos.
     

A continuación se explican las limitaciones (o ninguno) de varios escritores de producción y cómo ERDDAP™ trata de los problemas. Tales complicaciones son parte inherente de ERDDAP El objetivo de hacer que los sistemas dispares sean interoperables.

#### ASCII{#ascii} 
* ASCII (Csv, .tsv , etc.) archivos de texto -
    * Todos los datos numéricos se escriben a través de su representación de String (con valores de datos perdidos que aparecen como cadenas de 0 longitud) .
    * Aunque ERDDAP™ escribe valores largos y largos correctamente a los archivos de texto ASCII, muchos lectores (por ejemplo, programas de hoja de cálculo) no puede tratar correctamente con valores largos y largos y en lugar de convertirlos en valores dobles (con pérdida de precisión en algunos casos) .
    * Char and String data are written via JSON Strings, which handle all Unicode characters (notablemente, los caracteres "no usuales" más allá de ASCII #127, por ejemplo, el carácter Euro aparece como "\\u20ac") .
    
        
#### JSON{#json} 
* JSON ( .json , .jsonlCSV , etc.) archivos de texto -
    * Todos los datos numéricos se escriben a través de su representación de String.
    * Los datos Char y String se escriben como JSON Strings, que manejan todos los caracteres Unicode (notablemente, los caracteres "no usuales" más allá de ASCII #127, por ejemplo, el carácter Euro aparece como "\\u20ac") .
    * Los valores perdidos para todos los tipos de datos numéricos aparecen como nulos.
         
####  .nc 3 archivos{#nc3-files} 
*    .nc 3 archivos no admiten nativamente ningún tipo de datos enteros no firmados. Antes de CF v1.9, CF no apoyó tipos enteros no firmados. Para lidiar con esto, ERDDAP™ 2.10+ sigue el estándar NUG y siempre añade un atributo "\\_Unsigned" con un valor de "true" o "false" para indicar si los datos son de una variable no firmada o firmada. Todos los atributos enteros están escritos como atributos firmados (por ejemplo, byte) con valores firmados (por ejemplo, un ubyte actual\\_range atributo con valores 0 a 255, aparece como atributo byte con valores 0 a -1 (el inverso del valor complementario de ambos del valor fuera de rango). No hay manera fácil de saber qué atributos (firmados) enteros deben leerse como atributos no firmados. ERDDAP™ soporta el atributo "\\_Unsigned" cuando lee .nc 3 archivos.
*    .nc 3 archivos no soportan los tipos de datos largos o largos. ERDDAP™ ofertas con esto por convertirlos temporalmente en dos variables. Los dobles pueden representar exactamente todos los valores hasta +/- 9,007,199,254,740,992 que es 2^53. Esta es una solución imperfecta. Unidata se niega a hacer una actualización menor .nc 3 para tratar con esto y problemas relacionados, citando .nc 4 (un cambio importante) como la solución.
* La especificación CF (antes del v1.9) dijo que es compatible con un tipo de datos de char pero no está claro si el char está destinado sólo como los bloques de construcción de arrays de char, que son efectivamente Strings. Las preguntas a su lista de correo sólo dieron respuestas confusas. Debido a estas complicaciones, es mejor evitar las variables de char en ERDDAP™ y utilizar variables String siempre que sea posible.
* Tradicionalmente, .nc 3 archivos solo soportan cadenas con ASCII-encoded (7-bit, #0 - #127) personajes. NUG (y ERDDAP ) extensión que (empezando ~2017) incluyendo el atributo "\\_Encoding" con un valor de "ISO-8859-1" (una extensión de ASCII que define todos los 256 valores de cada personaje de 8 bits) o "UTF-8" para indicar cómo se codifican los datos de String. Otras codificación pueden ser legales pero se desalientan.
         
####  .nc 4 archivos{#nc4-files} 
*    .nc 4 archivos soportan todos ERDDAP 's tipos de datos.
    
#### Archivos NCCSV{#nccsv-files} 
Los archivos NCCSV 1.0 no soportan ningún tipo de datos enteros no firmados.
 [Archivo NCCSV 1.1+](/docs/user/nccsv-1.00) soporte a todos los tipos de datos enteros no firmados.
     
####  DAP  {#dap} 
*   (OPeN)DAP  (.das, .dds, .asc archivos ASCII, y .dods archivos binarios) -
    *   (OPeN)DAPmaneja corto, ushort, int, uint, flotador y doble valores correctamente.
    *   (OPeN)DAPtiene un tipo de datos "byte" que define como no firmado, mientras que históricamente, THREDDS y ERDDAP™ han tratado "byte" como firmado en su(OPeN)DAPservicios. Para lidiar con esto mejor, ERDDAP™ 2.10+ sigue el estándar NUG y siempre añade un atributo "\\_Unsigned" con un valor de "verdad" o "falso" para indicar si los datos son lo que ERDDAP™ llama byte o ubyte. Todos los atributos byte y ubyte se escriben como atributos "byte" con valores firmados (por ejemplo, un ubyte actual\\_range atributo con valores 0 a 255, aparece como atributo byte con valores 0 a -1 (el inverso del valor complementario de ambos del valor fuera de rango). No hay manera fácil de saber qué atributos "byte" deben leerse como atributos ubyte.
    *   (OPeN)DAPno soporta largos firmados o no firmados. ERDDAP™ ofertas con esto por convertirlos temporalmente en dobles variables y atributos. Los dobles pueden representar exactamente todos los valores hasta 9,007,199,254,740,992 que es 2^53. Esta es una solución imperfecta. OPeNDAP   (la organización) se niega a hacer una actualización menor DAP 2.0 para tratar con esto y problemas relacionados, citando DAP 4 (un cambio importante) como la solución.
    * Porque...(OPeN)DAPno tiene ningún tipo de datos char separados y técnicamente sólo admite caracteres ASCII de 1 byte (#0 - #127) en Strings, las variables de datos de char aparecerán como pendientes de 1 caracteres en(OPeN)DAP.das, .dds, y .dods respuestas.
    * Técnicamente, el(OPeN)DAPespecificación sólo admite cadenas con caracteres codificados por ASCII (#0 - #127) . NUG (y ERDDAP ) extensión que (empezando ~2017) incluyendo el atributo "\\_Encoding" con un valor de "ISO-8859-1" (una extensión de ASCII que define todos los 256 valores de cada personaje de 8 bits) o "UTF-8" para indicar cómo se codifican los datos de String. Otras codificación pueden ser legales pero se desalientan.
         
### Tipo de datos{#data-type-comments} 
* Debido al mal apoyo para datos largos, ulong y char en muchos tipos de archivos, desalentamos el uso de estos tipos de datos en ERDDAP . Cuando sea posible, use el doble en lugar de largo y largo, y use String en lugar de char.
     
* Metadatos - Porque(OPeN)DAP's .das y .dds respuestas no soportan atributos o tipos de datos largos o largos (y en su lugar mostrarles como dobles) , puede que desee utilizar ERDDAP 's tabular representation of metadata as seen in the http .../erddap/ **info** / * datasetID * .html página web (por ejemplo, [https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  )   (que también puede obtener en otros tipos de archivos, por ejemplo, .csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , .xhtml ) o el .nccsv Respuesta a los metadatos (por ejemplo, [https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) aunque .nccsv Los metadatos solo están disponibles para conjuntos de datos tabulares) , ambos soportan todos los tipos de datos (notable, largo, ulong, y char) .
         
### Archivos multimedia{#media-files} 
No todos los datos son arrays de números o texto. Algunos conjuntos de datos consisten o incluyen archivos multimedia, como archivos de imagen, audio y vídeo. ERDDAP™ tiene algunas características especiales para facilitar el acceso de los usuarios a los archivos multimedia. Es un proceso de dos pasos:
 

1. Haga que cada archivo sea accesible a través de su propia URL, a través de un sistema que admite solicitudes de rango byte.
La forma más fácil de hacer esto es poner los archivos en un directorio que ERDDAP™ tiene acceso. (Si están en un contenedor como un .zip archivo, descifrarlos, aunque es posible que desee ofrecer el .zip archivo a los usuarios también.) Entonces, haz una [EDDTableDesdeFileNames](#eddtablefromfilenames) dataset para hacer que estos archivos sean accesibles ERDDAP™ , notablemente vía ERDDAP 's [ "files" sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) .
    
Todos los archivos accesibles a través de EDDTableDesdeFileNames y ERDDAP 's "files" apoyo a los sistemas [byte range requests](https://en.wikipedia.org/wiki/Byte_serving) . Normalmente, cuando un cliente (por ejemplo, un navegador) hace una solicitud a una URL, que consigue todo el archivo como la respuesta. Pero con una solicitud de rango byte, la solicitud especifica una gama de bytes del archivo, y el servidor sólo devuelve esos bytes. Esto es relevante aquí porque los reproductores de audio y vídeo en los navegadores sólo funcionan si el archivo se puede acceder a través de solicitudes de rango byte.
    
Opcional: Si tiene más de un conjunto de datos con archivos multimedia asociados, puede hacer sólo un EDDTableDesdeFileNames que tiene un subcarpeta para cada grupo de archivos. La ventaja es que cuando desea añadir nuevos archivos multimedia para un nuevo conjunto de datos, todo lo que tiene que hacer es crear una nueva carpeta y poner los archivos en esa carpeta. La carpeta y los archivos se añadirán automáticamente al conjunto de datos EDDTableDesdeFileNames.
    
2. Opcional: Si tiene un conjunto de datos que incluye referencias a archivos multimedia, agréguelo a ERDDAP .
Por ejemplo, puede tener un archivo .csv con una fila por cada vez que alguien vio una ballena y una columna que incluye el nombre de un archivo de imagen relacionado con ese avistamiento. Si el nombre del archivo de imagen es sólo el nombre de archivo, por ejemplo, Img20141024T192403Z, no una URL completa, entonces usted necesita añadir [archivoAccessBase Url y/o archivoAccessSuffix](#fileaccessbaseurl) atributos a los metadatos para eso dataVariable que especifica la baseURL y sufijo para esos nombres de archivo. Si ha hecho que los archivos sean accesibles a través de EDDTableDesdeFileNames, la URL estará en el formulario
     *base* /erddap/files/ * datasetID * /
Por ejemplo,
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
Si hay un .zip u otro archivo contenedor con todos los archivos multimedia relacionados con una variable de datos, recomendamos que también haga que ese archivo sea accesible a los usuarios (véase el paso 1 supra) y luego identificarlo con un [archivoAccessArchive Url](#fileaccessarchiveurl) atributo.
    

 \\[ Comenzando en ERDDAP™ v1.82 \\] Si usted hace el primer paso arriba (o ambos pasos) , entonces cuando un usuario ve el ERDDAP™   "files" sistema para ese conjunto de datos (o pide ver un subconjunto del conjunto de datos a través de un .htmlTable petición, si usted hizo el segundo paso) , ERDDAP™ mostrará un icono '?' a la izquierda del nombre de archivo. Si el usuario pasa por encima de ese icono, verá un popup mostrando la imagen, o un reproductor de audio, o un reproductor de vídeo. Los navegadores solo soportan un número limitado de tipos

* imagen (generalmente .gif, .jpg, y .png) ,
* audio (generalmente .mp3, .ogg, y .wav) , y
* archivos de vídeo (generalmente .mp4, .ogv, y . webm) .

El soporte varía con diferentes versiones de diferentes navegadores en diferentes sistemas operativos. Así que si usted tiene una opción de qué tipo de archivo para ofrecer, tiene sentido ofrecer estos tipos.

O, si un usuario hace clic en el nombre de archivo mostrado en un ERDDAP™ página web, su navegador mostrará la imagen, audio o archivo de vídeo como una página web separada. Esto es muy útil para ver una imagen muy grande o video escalado a pantalla completa, en lugar de en un popup.
    
### Trabajando con archivos AWS S3{#working-with-aws-s3-files} 
 [Amazon Web Service (AWS) ](https://aws.amazon.com) es un vendedor [cloud computing](https://en.wikipedia.org/wiki/Cloud_computing) servicios. [S3](https://aws.amazon.com/s3/) es un sistema de almacenamiento de objetos ofrecido por AWS. En lugar del sistema jerárquico de directorios y archivos de un sistema de archivos tradicional (como un disco duro en su PC) , S3 ofrece sólo "paquetes" que sostienen "objetos" (los llamaremos "files" ) .

Para archivos ASCII (por ejemplo, .csv) , ERDDAP™ puede trabajar con los archivos en los cubos directamente. Lo único que necesitas hacer es especificar el&lt;fileDir monedas para el conjunto de datos usando un formato específico para el cubo AWS, por ejemplo,https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/. No deberías usar&lt;cacheDesde el usuario. Vea a continuación los detalles.

Pero para archivos binarios (por ejemplo, .nc , .grib, .bufr, and .hdf archivos) , necesitas usar el&lt;cacheDesde el sistema de usuario descrito a continuación. ERDDAP , netcdf-java (que ERDDAP™ utiliza para leer datos de estos archivos) , y otros software de datos científicos están diseñados para trabajar con archivos en un sistema de archivos tradicional que ofrece [nivel de bloques](https://en.wikipedia.org/wiki/Block-level_storage) acceso a archivos (que permite leer trozos de un archivo) , pero S3 sólo ofrece [nivel de archivo (objeto) ](https://en.wikipedia.org/wiki/Block-level_storage) acceso a archivos (que sólo permite leer todo el archivo) . AWS ofrece una alternativa a S3, [Elastic Block Store (EBS) ](https://aws.amazon.com/ebs/) ), que admite el acceso de nivel de bloque a los archivos pero es más caro que S3, por lo que rara vez se utiliza para el almacenamiento masivo de grandes cantidades de archivos de datos. (Así que cuando la gente dice almacenar datos en la nube (S3) es barato, es generalmente una comparación de manzanas a naranjas.) 

#### S3 Buckets{#s3-buckets} 
 **El contenido de un cubo. Llaves. Delimitadores.**   
Técnicamente, los cubos S3 no están organizados en una estructura jerárquica de archivos como un sistema de archivos en una computadora. En cambio, los cubos sólo contienen "objetos" (archivos) , cada uno de los cuales tiene un "key" (un nombre) . Un ejemplo de una llave en ese cubo de noaa-goes17 es

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
El URl correspondiente para ese objeto es

 [https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc) 

AWS admite una pequeña variación en cómo se construye esa URL, pero ERDDAP™ requiere este formato específico:
  https://*bucketName*.s3.*region*.amazonaws.com/*key*  

As of ERDDAP v2.29, ahora puede utilizar el `s3://` Formato URI en lugar de la URL del cubo. Este es el formato utilizado por el [AWS s3 cli](https://docs.aws.amazon.com/cli/latest/reference/s3/) .
s3:// *balde* / *clave* 

El *región* para el S3 URI se puede especificar de una de tres maneras:
- El *región* en el usuario de Tomcat `~/.aws/config` perfil
- El `AWS_DEFAULT_REGION` variable
- El `aws.region` JVM variable (en setenv.sh para Tomcat) 

Es práctica común, como con este ejemplo, hacer que los nombres de clave se vean como una ruta jerárquica más un nombre de archivo, pero técnicamente no lo son. Puesto que es común y útil, ERDDAP™ trata las claves con /'s como si fueran una ruta jerárquica más nombre de archivo, y esta documentación se referirá a ellas como tal. Si las llaves de un cubo no usan /'s (por ejemplo, una llave como
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s20180522247575), entonces ERDDAP™ tratará toda la llave como un nombre de archivo largo.

Private vs Public Buckets -- El administrador del cubo S3 puede hacer que el cubo y sus contenidos sean públicos o privados. Si es público, cualquier archivo en el cubo puede ser descargado por cualquiera usando la URL para el archivo. Amazon tiene un [Datos abiertos](https://aws.amazon.com/opendata/) programa que acoge conjuntos de datos públicos (incluidos los datos NOAA , NASA y USGS) gratis y no cobra por nadie para descargar los archivos de esos cubos. Si un cubo es privado, los archivos en el cubo sólo son accesibles para los usuarios autorizados y AWS cobra una tarifa (generalmente pagado por el dueño del cubo) para descargar archivos a un ordenador no AWS S3. ERDDAP™ puede trabajar con datos en cubos públicos y privados.

#### Credenciales de AWS{#aws-credentials} 
Para hacerlo así ERDDAP™ puede leer el contenido de cubos privados, necesita credenciales de AWS y necesita almacenar un archivo de credenciales en el lugar estándar así ERDDAP™ puede encontrar la información. Vea el SDK AWS para Java 2.x documentación: [Establecer credenciales predeterminadas](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) . (La opción para almacenar los valores como Java parámetros de línea de comandos \\[ tomcat \\] /bin/setenv.sh puede ser una buena opción.) 
#### AWS /files/{#aws-files} 
* /files/sistema -- El ERDDAP™   [/files/sistema](#accessibleviafiles) permite a los usuarios descargar los archivos fuente para un conjunto de datos. Recomendamos que encienda esto para todos los conjuntos de datos con archivos fuente porque muchos usuarios quieren descargar los archivos fuente originales.
    * Si los archivos están en un cubo S3 privado, la solicitud del usuario para descargar un archivo será manejada por ERDDAP™ , que leerá los datos del archivo y luego lo transmitirá al usuario, aumentando así la carga en su ERDDAP™ , usando el ancho de banda entrante y saliente, y te hace (el ERDDAP™ administrador) pagar la cuota de egreso de datos a AWS.
    * Si los archivos están en un cubo S3 público, la solicitud del usuario de descargar un archivo se redirigirá a la URL AWS S3 para ese archivo, por lo que los datos no fluirán a través de ERDDAP™ , reduciendo así la carga ERDDAP . Y si los archivos están en un Amazon Open Data (gratis) cubo público, entonces tú (el ERDDAP™ administrador) No tendrá que pagar ninguna cuota de egreso de datos a AWS. Por lo tanto, hay una gran ventaja al servir datos de público (no privado) S3 cubos, y una gran ventaja para servir datos de Amazon Open Data (gratis) cubos.

 ERDDAP También admite credenciales anónimas para cubos públicos. Para utilizar credenciales anónimas, añadir ` <useAwsAnonymous> verdadero </useAwsAnonymous> ` a tu configuración. xml.

#### Puestos de final personalizados S3{#custom-s3-endpoints} 
Para almacenamiento de objetos compatibles S3 no alojado por Amazon, necesita configurar el [endpoint_url](https://docs.aws.amazon.com/sdkref/latest/guide/feature-ss-endpoints.html) junto con la especulación de su cubo/key usando un `s3://` URI.

El *endpoint_url* se puede especificar de una de tres maneras:
- El *endpoint_url* en el usuario de Tomcat `~/.aws/config` perfil
- El `AWS_ENDPOINT_URL` variable
- El `aws.endpoint Url` JVM variable (en setenv.sh para Tomcat) 

Para una lista completa de variables de configuración S3, [Vea la documentación de Amazon](https://docs.aws.amazon.com/cli/latest/topic/config-vars.html) .

 **Certificados autosignificados** 
Para los cubos S3 auto hospedados, a menudo tendrá certificados SSL autofirmados. Para ERDDAP para leer de estos cubos, necesita añadir su cadena de certificados a la tienda JVM en `$JAVA_HOME/jre/lib/security/cacerts` . Además, ERDDAP usos [AWS Common Runtime](https://docs.aws.amazon.com/sdkref/latest/guide/common-runtime.html) para acceder al cubo de forma asincrónica. Esto aumenta el rendimiento, pero también requiere que sus certificados autofirmados se añadan a su tienda de confianza específica de OS. Si desea evitar hacer esto, puede deshabilitar AWS CRT con ` <useAwsCrt> falso </useAwsCrt> ` en tu setup.xml.

####  ERDDAP™ and AWS S3 Buckets{#erddap-and-aws-s3-buckets} 
 [ ** ERDDAP™ and AWS S3 Buckets** ](#erddap-and-aws-s3-buckets)   
Afortunadamente, después de mucho esfuerzo, ERDDAP™ tiene una serie de características que le permiten tratar con los problemas inherentes de trabajar con el nivel de bloques S3 acceso a los archivos de una manera razonablemente eficiente:

*    \\[ Descargo: Trabajar con cubos AWS S3 es mucho trabajo extra. AWS es un enorme ecosistema de servicios y características. Hay mucho que aprender. Toma tiempo y esfuerzo, pero es factible. Sé paciente y harás que las cosas funcionen. Busque ayuda
(G) [AWS documentation](https://aws.amazon.com/documentation/gettingstarted/) , sitios web como [Reflujo de basura](https://stackoverflow.com/) , y el regular
     [ ERDDAP™ Opciones de apoyo](/docs/intro#support) Si te atascas. \\]   
     
* Puede ser difícil incluso descubrir la estructura del directorio y los nombres de archivos de los archivos en un cubo S3. ERDDAP™ tiene una solución para este problema: EDDTableDesdeFileNames tiene una especial [\\*\\*\\*deOnTheFly](#fromonthefly) opción que le permite hacer un conjunto de datos EDDTableDesdeFileNames que permite a los usuarios navegar por el contenido de un cubo S3 (y descargar archivos) a través del conjunto de datos "files" Opción. Hay una [ejemplo de esto a continuación](#viewing-the-contents-of-a-bucket) .
     
*    ERDDAP™ puede leer datos de [archivos de datos externos comprimidos](#externally-compressed-files) , por lo que está bien si los archivos en S3 se almacenan como .gz , .gzip , .bz2 , .Z u otros tipos de archivos de datos comprimidos externamente, que pueden dramáticamente (2 - 20X) recortado en costos de almacenamiento de archivos. A menudo no hay penalización de tiempo para utilizar archivos comprimidos externamente, ya que el tiempo guardado mediante la transferencia de un archivo más pequeño de S3 a ERDDAP equilibra aproximadamente el tiempo extra necesario para ERDDAP™ para descomprimir el archivo. Para usar esta característica, sólo tiene que asegurarse de que el conjunto de datos&lt;fileNameRegex permite el tipo de archivo comprimido (por ejemplo, añadiendo ( |  .gz ) al final del regex) .
     
* Para el caso más común, donde usted tiene un ERDDAP™ instalado en su PC para test/desarrollo y donde el conjunto de datos tiene archivos de datos binarios que se almacenan como objetos en un cubo S3, un enfoque para obtener el conjunto de datos en ERDDAP™ es:
    1. Cree un directorio en su PC para tener algunos archivos de datos de prueba.
    2. Descargar dos archivos de datos de la fuente al directorio que acaba de crear.
    3. Uso [GenerarDatasetsXml](#generatedatasetsxml) para generar el trozo de datasets.xml para el conjunto de datos basado en los dos archivos de datos locales.
    4. Compruebe que ese conjunto de datos funciona como desea con [DasDds](#dasdds) y/o su local ERDDAP .
        
         **Los siguientes pasos hacen una copia de ese conjunto de datos (que obtendrá datos del cubo S3) on a public ERDDAP .** 
        
    5. Copiar el trozo de datasets.xml para el conjunto de datos datasets.xml para el público ERDDAP™ que servirá los datos.
    6. Crear un directorio en público ERDDAP Es el disco duro local para mantener un caché de archivos temporales. El directorio no utilizará mucho espacio en disco (ver cacheSizeGB abajo) .
    7. Cambiar el valor del conjunto de datos&lt;fileDir titulada tag para que apunta al directorio que acabas de crear (aunque el directorio esté vacío) .
    8. Añadir un [cacheDesde el aeropuerto](#cachefromurl) etiqueta que especifica el nombre del cubo del conjunto de datos y prefijo opcional (i.e. directorio) en el [Aws S3 URL Formato que ERDDAP™ Requisitos](#accessing-files-in-an-aws-s3-bucket) .
    9. Add a [&lt;cacheSizeGB confiar] (#cachefromurl) etiqueta al conjunto de datos xml (por ejemplo, 10 es un buen valor para la mayoría de los conjuntos de datos) para decir ERDDAP™ para limitar el tamaño del caché local (i.e., no trate de caché todos los archivos remotos) .
    10. Ver si eso funciona en público ERDDAP . Note que la primera vez ERDDAP™ carga el conjunto de datos, tomará mucho tiempo cargar, porque ERDDAP™ necesita descargar y leer todos los archivos de datos.
        
Si el conjunto de datos es una enorme colección de enormes archivos de datos redondeados, esto llevará mucho tiempo y será poco práctico. En algunos casos, para los archivos de datos redondeados, ERDDAP™ puede extraer la información necesaria (por ejemplo, el punto de tiempo para los datos en un archivo de datos redondeado) desde el nombre del archivo y evitar este problema. See [Aggregation via Nombres del archivo](#aggregation-via-file-names-or-global-metadata) .
        
    11. Facultativo (pero especialmente para EDDTableDeFiles datasets) , puedes añadir un [nTreads](#nthreads) etiqueta al conjunto de datos para decir ERDDAP para utilizar más de 1 hilo al responder a la solicitud de datos de un usuario. Esto minimiza los efectos del retraso que ocurre cuando ERDDAP™ lee archivos de datos (remoto) AWS S3 cubos en el caché local y (quizás) descomprimirlos.

#### AWS S3 Open Data{#aws-s3-open-data} 
Como parte de NOAA 's [Big Data Program](https://www.noaa.gov/nodd/about) , NOAA tiene asociaciones con cinco organizaciones, incluyendo AWS, para "explorar los beneficios potenciales de almacenar copias de observaciones clave y productos modelo en la nube para permitir el cálculo directamente sobre los datos sin necesidad de mayor distribución". AWS incluye los conjuntos de datos que obtiene de NOAA como parte de su programa para ofrecer acceso público a una gran colección de [Datos abiertos sobre AWS S3](https://registry.opendata.aws/) desde cualquier ordenador, ya sea una instancia de computación de Amazon (un ordenador alquilado) en la red AWS o su propio PC en cualquier red. El ejemplo a continuación supone que usted está trabajando con un conjunto de datos accesible públicamente.

#### Acceso a archivos en un cubo AWS S3{#accessing-files-in-an-aws-s3-bucket} 
Para un cubo de datos S3 privado, el propietario del cubo debe darle acceso al cubo. (Vea la documentación de AWS.) 

En todos los casos, necesitará una cuenta AWS porque el SDK AWS para Java   (que ERDDAP™ usos para recuperar información sobre el contenido de un cubo) requiere credenciales de la cuenta AWS. (más sobre esto abajo) 

 ERDDAP™ sólo puede acceder a cubos AWS S3 si especifica el [&lt;cacheDesde el usuario] (#cachefromurl) (o&lt;fileDir título) en un formato específico:
https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*  
Donde

* El baldeName es la forma corta del nombre del cubo, por ejemplo noaaa-goes17 .
* La aws-region, por ejemplo, nosotros-este-1, es de la columna "Región" en una de las tablas de [AWS Service Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html) donde se encuentra el cubo.
* El prefijo es opcional. Si está presente, debe terminar con '/' .

Por ejemplo,https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
Este formato URL es una de las recomendaciones de AWS S3: ver [Acceso a un cubo](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) y [esta descripción de prefijos](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html) . ERDDAP™ requiere que combine la URL del cubo y el prefijo opcional en una URL para especificar&lt;cacheDesde el usuario (o&lt;archivoDir contactos) donde se encuentran los archivos.

#### Prueba de seguridad pública{#test-public-aws-s3-buckets} 
Para cubos públicos, puede y debe probar la URL del cubo del directorio AWS S3 en su navegador, por ejemplo,
 [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) Si la URL del cubo es correcta y adecuada ERDDAP , devolverá un documento XML que tiene (parcial) lista de los contenidos de ese cubo. Desafortunadamente, la URL completa (i.e., URL del cubo más prefijo) que ERDDAP™ quiere un conjunto de datos dado no funciona en un navegador. AWS no ofrece un sistema para navegar por la jerarquía de un cubo fácilmente en su navegador. (Si eso es incorrecto, por favor envía un correo electrónico a Chris. John en Noaa.gov. De lo contrario, Amazon, por favor agrega apoyo para esto&#33;) 

#### Ver el contenido de un cubo{#viewing-the-contents-of-a-bucket} 
Los cubos S3 suelen contener un par de categorías de archivos, en un par de pseudo subdirectorios, que podrían convertirse en un par de ERDDAP™ Datasets. Para hacer el ERDDAP™ datasets, necesita saber el directorio inicial para&lt;cacheDesde el usuario (o&lt;fileDir contactos) y el formato de los nombres de archivos que identifican ese subconjunto de archivos. Si intentas ver todo el contenido de un cubo en un navegador, S3 te mostrará los primeros 1000 archivos, que es insuficiente. Actualmente, la mejor manera de ver todo el contenido de un cubo es hacer un [EDDTableDesdeFileNames](#eddtablefromfilenames) Dataset (en su PC ERDDAP™ y/o en su público ERDDAP ) , que también le da una manera fácil de navegar por la estructura del directorio y descargar archivos. El&lt;archivoDir título para que será la URL que hizo anteriormente, por ejemplo,https://noaa-goes17.s3.us-east-1.amazonaws.com. \\[ ¿Por qué AWS S3 no ofrece una manera rápida y fácil de hacer sin una cuenta de AWS? \\] Observe que cuando hago esto en mi PC en una red no asombro, parece que Amazon ralentiza la respuesta a un truco (alrededor de 100 (?) archivos por chunk) después de los primeros pedazos (de 1000 archivos por trozo) se descargan. Puesto que los cubos pueden tener un gran número de archivos (noaa-goes17 tiene 26 millones) , conseguir todo el contenido de un cubo puede tomar EDDTableDesdeFileNames varias horas (¡Por ejemplo, 12&#33;) para terminar. \\[ Amazon, ¿es cierto? \\] 

#### Hacer un EDDTable DeFileNames Dataset con un cubo AWS S3{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Si tiene un nombre de cubo, pero no tiene ya una lista de archivos en el cubo S3 o el prefijo que identifica la ubicación de los archivos pertinentes en el cubo, utilice las instrucciones siguientes para hacer un conjunto de datos EDDTableDesdeFileNames para que pueda navegar por la jerarquía de directorios del cubo S3 a través de ERDDAP 's "files" sistema.

1. Abra una cuenta AWS
     ERDDAP™ usos [AWS SDK para Java ](https://docs.aws.amazon.com/sdk-for-java/index.html) para obtener información de cubo de AWS, por lo que necesita [crear y activar una cuenta AWS](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/) . Es un trabajo bastante grande, con muchas cosas que aprender.
     
2. Pon tus credenciales de AWS donde ERDDAP™ puede encontrarlos.
Siga las instrucciones [Crear Credenciales AWS y Región para el Desarrollo](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) Así que... ERDDAP™   (específicamente, el SDK AWS para Java ) será capaz de encontrar y utilizar sus credenciales de AWS. Si ERDDAP™ No puedes encontrar las credenciales, verás una
Java.lang. IlegalArgumentException: profile file cannot be null error in ERDDAP Es un archivo log.txt.
    
Hint para Linux y Mac OS: el archivo de credenciales debe estar en el directorio de inicio del usuario que está ejecutando Tomcat (y ERDDAP )   (para este párrafo, asumiremos usuario=tomcat) en un archivo llamado ~/.aws/credentials . No asuma que ~ es /home/tomcat -- realmente use cd ~ para averiguar dónde piensa el sistema operativo ~ para el usuario=tomcat es. Cree el directorio si no existe. Además, después de poner el archivo de credenciales en su lugar, asegúrese de que el usuario y el grupo para el archivo son tomcat y luego use las credenciales chmod 400 para asegurarse de que el archivo es sólo lectura para user=tomcat.
    
3. Crear la URL del cubo en el [formato que ERDDAP™ Requisitos](#accessing-files-in-an-aws-s3-bucket) , por ejemplo,
     [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) , y (para cubos públicos) Pruébalo en un navegador para asegurarse de que devuelve un documento XML que tiene una lista parcial de los contenidos de ese cubo.
     
4. Uso [GenerarDatasetsXml](#generatedatasetsxml) crear un [EDDTableDesdeFileNames](#eddtablefromfilenames) Dataset:
    * Para el directorio Inicio, utilice esta sintaxis:
        \\*\\*\\ *deOnTheFly,* tuBucketUrl*
por ejemplo,
        \\*\\*\\*deOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/
    * ¿Nombre de archivo regex? .
    * ¿Recuerdo? verdadero
    * reload ¿Cada Nuez? 10080
    *    infoUrl ?https://registry.opendata.aws/noaa-goes/
    * ¿Institución? NOAA 
    * ¿Resumen? nada ( ERDDAP™ creará un resumen decente automáticamente.) 
    * ¿El título? nada ( ERDDAP™ creará un título decente automáticamente.) Como es habitual, debe editar el XML resultante para verificar la corrección y hacer mejoras antes de que el conjunto de conjuntos de datos lo use en datasets.xml .
5. Si sigue las instrucciones anteriores y carga el conjunto de datos ERDDAP , ha creado un conjunto de datos EDDTableDesdeFiles. Como ejemplo, y para que sea más fácil para cualquiera navegar y descargar archivos de los cubos AWS Open Data, hemos creado los conjuntos de datos EDDTableDesdeFileNames (ver la lista en
     [https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_) ) para casi todo el [Cubos de datos abiertos AWS S3](https://registry.opendata.aws/) .
     \\[ Los pocos cubos que no incluimos tienen un gran número de archivos en el directorio raíz (más de lo que se puede descargar en una cantidad razonable de tiempo) , o no permiten el acceso público (¿No se supone que todos sean públicos?) , o son Solicitantes paga cubos (por ejemplo, Sentinel) . \\]   
Si hace clic en "files" enlace para uno de estos conjuntos de datos, puede navegar por el árbol del directorio y archivos en ese cubo S3. Por el camino\\*\\*\\*deOnTheFly EDDTableDeFiles funciona, estos listados de directorios siempre están perfectamente actualizados porque ERDDAP™ los pone en el vuelo. Si hace clic en el árbol del directorio a un nombre de archivo real y haga clic en el nombre del archivo, ERDDAP™ redirigirá su solicitud a AWS S3 para que pueda descargar el archivo directamente desde AWS. Entonces puedes inspeccionar ese archivo.
    
¿Problemas?
Si tu EDDTableDesdeFiles no se cargará ERDDAP™   (o DasDds) , busque en el archivo log.txt para un mensaje de error. Si ves un
Java.lang. IlegalArgumentExcepción: el archivo de perfil no puede ser un error nulo, el problema es que el SDK AWS para Java   (utilizado por ERDDAP ) no encuentra el archivo de credenciales. Vea las instrucciones de credenciales arriba.
     

Es lamentable que AWS no simplemente permita que la gente use un navegador para ver el contenido de un cubo público.

 **Entonces puedes hacer ERDDAP™ conjuntos de datos que dan a los usuarios acceso a los datos en los archivos.**   
Ver las instrucciones en [ ERDDAP™ and S3 Buckets](#erddap-and-aws-s3-buckets)   (arriba) .
Para la muestra EDDTableDeFileNames dataset que usted hizo anteriormente, si usted hace un poco de caceo alrededor con el directorio y nombres de archivos en el árbol del directorio, se hace evidente que el directorio de nivel superior nombres (por ejemplo, ABI-L1b-RadC) corresponde a lo que ERDDAP™ llamaría conjuntos de datos separados. El cubo con el que estás trabajando puede ser similar. Entonces podrías seguir creando conjuntos de datos separados en ERDDAP™ para cada uno de esos conjuntos de datos, utilizando, por ejemplo,
https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
como el&lt;cacheDesde el usuario. Lamentablemente, para este ejemplo en particular, los conjuntos de datos en el cubo parecen ser conjuntos de datos de nivel 1 o nivel 2, que ERDDAP™   [no es particularmente bueno](#dimensions) , porque el conjunto de datos es una colección más complicada de variables que utilizan diferentes dimensiones.
     
    
### Archivos NcML{#ncml-files} 
Los archivos NcML le permiten especificar cambios en la marcha a una o más fuente original NetCDF   (v3 o v4)   .nc , .grib, .bufr, or .hdf   (v4 o v5) archivos, y luego tienen ERDDAP™ tratar el .nc archivos ml como los archivos fuente. ERDDAP™ datasets aceptará .nc archivos de ml cada vez .nc Se esperan archivos. Los archivos NcML DEBE tener la extensión .nc ml. Ver el [ Unidata Documentación NcML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) . NcML es útil porque puedes hacer algunas cosas con él (por ejemplo, haciendo diferentes cambios a diferentes archivos en una colección, incluyendo añadir una dimensión con un valor específico a un archivo) que no puedes hacer con ERDDAP 's datasets.xml .

* Cambios en un .nc El último tiempoModified del archivo de ml hará que el archivo se vuelva a cargar cuando el conjunto de datos se vuelva a cargar, pero cambia a la parte subyacente .nc Los archivos de datos no serán notados directamente.
* Hint: NcML es\\*muy bien.\\*sensible al orden de algunos elementos en el archivo NcML. Piense en NcML como especificar una serie de instrucciones en el orden especificado, con la intención de cambiar los archivos fuente (el estado en el inicio / la parte superior del archivo NcML) en los archivos de destino (el estado en el extremo/abajo del archivo NcML) .

Una alternativa al NcML es la [ NetCDF Operadores ( NCO ) ](#netcdf-operators-nco) . La gran diferencia es que el NcML es un sistema para hacer cambios en la marcha (así que los archivos fuente no se alteran) , mientras NCO se puede utilizar para hacer cambios (o nuevas versiones de) los archivos. Ambos NCO y NcML son muy, muy flexibles y le permiten hacer casi cualquier cambio que pueda pensar en los archivos. Para ambos, puede ser difícil averiguar exactamente cómo hacer lo que usted desea hacer - comprobar la web para ejemplos similares. Ambos son herramientas útiles para la preparación de netCDF y HDF archivos para uso con ERDDAP , en particular, para hacer cambios más allá de lo ERDDAP El sistema de manipulación puede hacerlo.

Ejemplo #1: Añadiendo una dimensión del tiempo con un valor único
Aquí hay un .nc archivo de ml que crea una nueva dimensión externa (tiempo, con 1 valor: 1041379200) y añade esa dimensión a la variable pic en el archivo llamado A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km .nc :
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Ejemplo #2: Cambiar un valor del tiempo existente
A veces la fuente .nc archivo ya tiene una dimensión del tiempo y el valor del tiempo, pero el valor es incorrecto (para sus propósitos) . Esto .nc El archivo de ml dice: para el archivo de datos llamado ""19810825230030-NCEI...", para la variable de dimensión "time" , establecer el atributo de unidades a ser 'segundos desde 1970-01T00:00:00Z' y establecer el valor de tiempo a ser 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
###  NetCDF Operadores ( NCO )  {#netcdf-operators-nco} 
"Los Operadores de NetCDF ( NCO ) componen una docena de programas independientes, línea de comandos que toman netCDF \\[ v3 o v4 \\] , HDF   \\[ v4 o v5 \\] , \\[ Grib, .bufr, \\] y/o DAP archivos como entrada, luego operar (por ejemplo, obtener nuevos datos, computar estadísticas, imprimir, hiperslab, manipular metadatos) y producir los resultados a pantalla o archivos en formatos de texto, binario o netCDF. NCO ayuda al análisis de datos científicos redondeados. El estilo shell-command de NCO permite a los usuarios manipular y analizar archivos de forma interactiva, o con scripts expresivos que eviten algunos entornos de programación de alto nivel". (de la [ NCO ](https://nco.sourceforge.net/) página principal) .

Una alternativa a NCO es [NcML](#ncml-files) . La gran diferencia es que el NcML es un sistema para hacer cambios en la marcha (así que los archivos fuente no se alteran) , mientras NCO se puede utilizar para hacer cambios (o nuevas versiones de) los archivos. Ambos NCO y NcML son muy, muy flexibles y le permiten hacer casi cualquier cambio que pueda pensar en los archivos. Para ambos, puede ser difícil averiguar exactamente cómo hacer lo que usted desea hacer - comprobar la web para ejemplos similares. Ambos son herramientas útiles para la preparación de netCDF y HDF archivos para uso con ERDDAP , en particular, para hacer cambios más allá de lo ERDDAP El sistema de manipulación puede hacerlo.

Por ejemplo, puede utilizar NCO para hacer las unidades de la variable de tiempo consistentes en un grupo de archivos donde no eran consistentes originalmente. O puedes usar NCO para solicitar scale\\_factor y add\\_offset en un grupo de archivos donde scale\\_factor y add\\_offset tienen diferentes valores en diferentes archivos fuente.
 (O, ahora puedes lidiar con esos problemas ERDDAP™ via [ EDDGrid FromNcFilesUnpacked](#eddgridfromncfilesunpacked) , que es una variante de EDDGrid FromNcFiles que desempaqueta datos empaquetados y estandariza valores de tiempo a bajo nivel para tratar con archivos de colección diferentes scale\\_factor s y add\\_offset , o unidades de tiempo diferentes.) 

 NCO es Software libre y de código abierto que utiliza [GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html) licencia.

Ejemplo #1: Hacer que las unidades sean compatibles
 EDDGrid DeFiles y EDDTable De Archivos insisten en que las unidades para una variable dada sean idénticas en todos los archivos. Si algunos de los archivos son trivialmente (no funcionalmente) diferentes de otros (por ejemplo, unidades de tiempo
"segundos desde 1970-01-01 00:00:00 UTC" versus
 "seconds since 1970-01-01T00:00:00Z" Podrías usar NCO 's [ncatted](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor) . cambiar las unidades en todos los archivos para ser idénticos
nco/cazado - una unidad, tiempo, o,c,'segundos desde 1970-01T00:00Z' \\* .nc   
 \\[ Para muchos problemas como este en... Datasets de archivos, ahora puede utilizar [normalización ¿Qué?](#standardizewhat) para decir ERDDAP para estandarizar los archivos fuente mientras se leen ERDDAP . \\] 
    
### Límites al tamaño de un conjunto de datos{#limits-to-the-size-of-a-dataset} 
Verás muchas referencias a "2 mil millones" abajo. Más exactamente, es una referencia a 2.147.483.647 (2^31-1) , que es el valor máximo de un entero firmado de 32 bits. En algunos idiomas informáticos, por ejemplo Java   (que ERDDAP™ está escrito en) , ese es el tipo de datos más grande que se puede utilizar para muchas estructuras de datos (por ejemplo, el tamaño de un array) .

Para valores de cuerda (por ejemplo, para nombres variables, nombres de atributos, valores de atributos String y valores de datos String) , el número máximo de caracteres por String in ERDDAP™ - 2 mil millones. Pero en casi todos los casos, habrá problemas pequeños o grandes si una cuerda supera un tamaño razonable (por ejemplo, 80 caracteres para nombres variables y nombres de atributos, y 255 caracteres para la mayoría de valores de atributos String y valores de datos) . Por ejemplo, las páginas web que muestren nombres variables largos serán inversamente anchos y largos nombres de variables serán truncados si exceden el límite del tipo de archivo de respuesta.

Para conjuntos de datos redondeados:

* El número máximo axisVariable - 2 mil millones.
El número máximo dataVariable - 2 mil millones.
Pero si un conjunto de datos tiene las variables √100, será engorroso para que los usuarios usen.
Y si un conjunto de datos tiene un millón de variables, su servidor necesitará mucha memoria física y habrá otros problemas.
* El tamaño máximo de cada dimensión ( axisVariable ) -2 billones de valores.
* Creo que el número total máximo de células (el producto de todas las dimensiones) es ilimitado, pero puede ser ~9e18.

Para conjuntos de datos tabulares:

* El número máximo dataVariable - 2 mil millones.
Pero si un conjunto de datos tiene las variables √100, será engorroso para que los usuarios usen.
Y si un conjunto de datos tiene un millón de variables, su servidor necesitará mucha memoria física y habrá otros problemas.
* El número máximo de fuentes (por ejemplo, archivos) que puede ser agregado es ~2 mil millones.
* En algunos casos, el número máximo de filas de una fuente individual (por ejemplo, un archivo, pero no una base de datos) - 2 mil millones de filas.
* No creo que haya otros límites.

Para conjuntos de datos tanto redondeados como tabulares, hay algunos límites internos en el tamaño del subconjunto que puede ser solicitado por un usuario en una sola solicitud (a menudo relacionados con √2 billones de algo o ~9e18 de algo) , pero es mucho más probable que un usuario llegue a los límites de tipo de archivo.

*    NetCDF versión 3 .nc Los archivos se limitan a 2GB bytes. (Si esto es realmente un problema para alguien, házmelo saber: Podría añadir apoyo para el NetCDF versión 3 .nc Extensión de 64 bits o NetCDF Versión 4, que aumentaría el límite significativamente, pero no infinitamente.) 
* Los navegadores se bloquean después de sólo ~500MB de datos, así que ERDDAP™ limita la respuesta .htmlTable solicitudes a ~400MB de datos.
* Muchos programas de análisis de datos tienen límites similares (por ejemplo, el tamaño máximo de una dimensión es a menudo ~2 mil millones de valores) , por lo que no hay razón para trabajar duro para conseguir alrededor de los límites de tipo de archivo específico.
* Los límites de tipo de archivo son útiles porque evitan solicitudes ingenuas para cantidades realmente enormes de datos (por ejemplo, "deme todo este conjunto de datos" cuando el conjunto de datos tiene 20TB de datos) , que tomaría semanas o meses para descargar. Cuanto más tiempo la descarga, más probable será que fallará por una variedad de razones.
* Los límites de tipo de archivo son útiles porque obligan al usuario a tratar con subconjuntos de tamaño razonable (por ejemplo, tratar con un gran conjunto de datos redondeados a través de archivos con datos desde un punto de tiempo cada) .
         
### Cambiar a ACDD-1.3{#switch-to-acdd-13} 
Nosotros (notablemente [GenerarDatasetsXml](#generatedatasetsxml) ) actualmente recomendar [Versión ACDD 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) , que fue ratificado a principios de 2015 y que se conoce como "ACDD-1.3" en el atributo de convenciones globales. Prior to ERDDAP™ versión 1.62 (publicado en junio de 2015) , ERDDAP™ utilizado/recomendado el original, versión 1.0, del [ NetCDF Attribute Convention for Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1) que se denominaba " Unidata Dataset Discovery v1.0" en las convenciones y convenciones globales Metadata\\_Conventions atributos.

Si sus conjuntos de datos utilizan versiones anteriores de ACDD, se recomienda que cambie a ACDD-1.3. No es difícil. ACDD-1.3 es altamente compatible con la versión 1.0. Para cambiar, para todos los conjuntos de datos (Salvo EDDGrid FromErddap and EDDTable DeErddap datasets) :

1. Eliminar el nuevo mundo deprecatado Metadata\\_Conventions atributo por adición (o cambiando las existentes Metadata\\_Conventions atributo)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
al conjunto de datos global&lt; addAttributes .
     
2. Si el conjunto de datos tiene un atributo de convenciones en el mundo&lt; addAttributes , cambiar todo " Unidata Dataset Discovery v1.0 referencias a "ACDD-1.3".
Si el conjunto de datos no tiene un atributo de convenciones en el mundo&lt; addAttributes A continuación, añadir uno que se refiere a ACDD-1.3. Por ejemplo,
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Si el conjunto de datos tiene un conjunto global standard\\_name\\_vocabulary atributo, por favor cambie el formato del valor a, por ejemplo,
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Si la referencia es a una versión anterior de la [CF tabla de nombres estándar](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) . es probablemente una buena idea cambiar a la versión actual (65, como escribimos esto) , ya que los nuevos nombres estándar se añaden a esa tabla con versiones posteriores, pero los nombres estándar antiguos son raramente deprecatados y nunca eliminados.
     
4. Aunque ACDD-1.0 incluyó atributos globales para creator\\_name , creator\\_email , creator\\_url , [GenerarDatasetsXml](#generatedatasetsxml) no los añadimos automáticamente hasta algún momento ERDDAP™ v1.50. Esta información es importante:
        
    *    creator\\_name permite a los usuarios conocer/citar al creador del conjunto de datos.
    *    creator\\_email le dice a los usuarios la dirección de correo electrónico preferida para ponerse en contacto con el creador del conjunto de datos, por ejemplo si tienen preguntas sobre el conjunto de datos.
    *    creator\\_url da a los usuarios una manera de averiguar más sobre el creador.
    *    ERDDAP™ utiliza toda esta información al generar documentos de metadatos FGDC e ISO 19115-2/19139 para cada conjunto de datos. Esos documentos son utilizados a menudo por servicios externos de búsqueda.
    
Por favor, agregue estos atributos al conjunto de datos global&lt; addAttributes .
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
Eso es. Espero que no haya sido muy difícil.
     
### Zarr{#zarr} 
En la versión 2.25 ERDDAP™ puede leer local Archivos de Zarr utilizando [EDDTableDesdeNcFiles](#eddtablefromncfiles) y [ EDDGrid FromNcFiles](#eddgridfromncfiles) .

 (A agosto de 2019) Podríamos estar fácilmente equivocados, pero aún no estamos convencidos de que [Zarr](https://github.com/zarr-developers/zarr-python) , o sistemas similares que rompen archivos de datos en pedazos más pequeños, son grandes soluciones al problema de ERDDAP™ leer datos almacenados en servicios cloud como Amazon AWS S3. Zarr es una gran tecnología que ha mostrado su utilidad en una variedad de situaciones, no estamos seguros de que ERDDAP +S3 será una de esas situaciones. Sobre todo estamos diciendo: antes de apresurarnos a hacer el esfuerzo para almacenar todos nuestros datos en Zarr, vamos a hacer algunas pruebas para ver si en realidad es una mejor solución.

Los problemas con el acceso a datos en la nube son latencia (el retraso para obtener primero datos) y acceso a nivel de archivos (más que acceso a nivel de bloques) . Zarr resuelve el problema de acceso a nivel de archivo, pero no hace nada sobre la latencia. Comparado con sólo descargar el archivo (así se puede leer como un archivo local con acceso a nivel de bloques) , Zarr incluso puede exacerbar el problema de la latencia porque, con Zarr, leer un archivo ahora implica una serie de varias llamadas para leer diferentes partes del archivo (cada uno con su propio lag) . El problema de latencia puede resolverse paralelamente a las solicitudes, pero es una solución de alto nivel, no dependiente de Zarr.

Y con Zarr (como con bases de datos relacionales) , perdemos la comodidad de tener un archivo de datos ser un archivo simple, único que usted puede verificar fácilmente la integridad de, o hacer/descargar una copia de.

 ERDDAP™   (de v2) tiene un sistema para mantener un caché local de archivos de una fuente URL (por ejemplo, S3) (véase [&lt;cacheDesde el usuario y&lt;cacheMaxGB titulado] (#cachefromurl) ). Y el nuevo [&lt;nThreads confía] (#Nthreads) debe minimizar el problema de latencia paralelando la recuperación de datos a un alto nivel.&lt;cacheDesde el usuario parece trabajar muy bien para muchos escenarios. (No estamos seguros de lo beneficioso&lt;nThreads confía es sin más pruebas.) Admitimos que no hemos hecho pruebas de tiempo en una instancia AWS con una buena conexión de red, pero hemos probado con éxito con varias fuentes remotas de archivos URL. Y ERDDAP 's&lt;cacheDesde el usuario trabaja con cualquier tipo de archivo de datos (por ejemplo, .nc , .hdf , .csv, .jsonlCSV ) , incluso si fuera comprimido externamente (por ejemplo, .gz ) , sin cambios en los archivos (por ejemplo, reescribirlas como colecciones de Zarr) .

Es probable que diferentes escenarios favorezcan diferentes soluciones, por ejemplo, sólo necesita leer parte de un archivo una vez (Zarr ganará) , vs. necesidad de leer todo un archivo una vez, vs. necesidad de leer parte o todo un archivo repetidamente (&lt;cacheDesde el usuario ganará).

Sobre todo estamos diciendo: antes de apresurarnos a hacer el esfuerzo para almacenar todos nuestros datos en Zarr, vamos a hacer algunas pruebas para ver si en realidad es una mejor solución.

- -
## Lista de conjuntos de datos de tipos{#list-of-types-datasets} 
Si necesita ayuda para elegir el tipo de conjunto de datos correcto, consulte [Elegir el tipo Dataset](#choosing-the-dataset-type) .

Los tipos de conjuntos de datos se clasifican en dos categorías. ( [¿Por qué?](#why-just-two-basic-data-structures) ) 

###  EDDGrid  {#eddgrid} 
*    [ ** EDDGrid ** ](#eddgrid) Los conjuntos de datos manejan datos redondeados.
    * In EDDGrid datasets, variables de datos son arrays multidimensionales de datos.
    * Debe haber una variable de eje para cada dimensión. Las variables Axis DEBE especificarse en el orden en que las variables de datos las usen.
    * In EDDGrid conjuntos de datos, todas las variables de datos (parte) todas las variables del eje.
         ( [¿Por qué?](#why-just-two-basic-data-structures)   [¿Y si no lo hacen?](#dimensions) ) 
Nuevo ERDDAP™ versión 2.29.0 con EDDGrid FromNcFiles es soporte experimental para variables de datos que no soportan todas las variables del eje (o como algunos lo han llamado datos 1D y 2D en el mismo conjunto de datos) .
    * Valores de dimensión clasificados - En todos EDDGrid conjuntos de datos, cada dimensión DEBE estar en orden (ascendente o descendente) . Cada uno puede ser colocado irregularmente. No puede haber vínculos. Este es un requisito del [CF metadatos standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Si los valores de cualquier dimensión no están en orden ordenado, el conjunto de datos no se cargará y ERDDAP™ identificará el primer valor sin surtido en el archivo de registro, *bigParentDirectory* /logs/log.txt .
        
Algunas subclases tienen restricciones adicionales (en particular, EDDGrid AggregateExistingDimension requiere que la dimensión exterior (izquierda, primera) sea ascendente.
        
Los valores de dimensión no variados casi siempre indican un problema con el conjunto de datos fuente. Esto ocurre más comúnmente cuando un archivo mal llamado o inapropiado se incluye en la agregación, que conduce a una dimensión de tiempo sin surtir. Para resolver este problema, vea el mensaje de error en el ERDDAP™ log.txt archivo para encontrar el valor de tiempo ofensivo. A continuación, busque en los archivos fuente para encontrar el archivo correspondiente (o uno antes o uno después) eso no pertenece a la agregación.
        
    * Ver la descripción más completa de la [ EDDGrid modelo de datos](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel) .
    * El EDDGrid Los tipos de conjunto de datos son:
        *    [ EDDGrid DeAudioFiles](#eddfromaudiofiles) agrega datos de un grupo de archivos de audio locales.
        *    [ EDDGrid DeDap](#eddgridfromdap) maneja datos redondeados desde DAP servidores.
        *    [ EDDGrid DeEDDTable](#eddgridfromeddtable) le permite convertir un conjunto de datos tabular en un conjunto de datos redondeado.
        *    [ EDDGrid FromErddap](#eddfromerddap) maneja datos redondeados desde un control remoto ERDDAP .
        *    [ EDDGrid De Etopo](#eddgridfrometopo) sólo maneja los datos de topografía de ETOPO incorporados.
        *    [ EDDGrid DeFiles](#eddgridfromfiles) es la superclase de todos EDDGrid De... clases de Files.
        *    [ EDDGrid FromMergeIRFiles](#eddgridfrommergeirfiles) agrega datos de un grupo de MergeIR local .gz archivos.
        *    [ EDDGrid FromNcFiles](#eddgridfromncfiles) datos agregados de un grupo de locales NetCDF   (v3 o v4)   .nc y archivos relacionados.
        *    [ EDDGrid FromNcFilesUnpacked](#eddgridfromncfilesunpacked) es una variante si EDDGrid FromNcFiles que también agrega datos de un grupo de locales NetCDF   (v3 o v4)   .nc y archivos relacionados, que ERDDAP™ desempaquetas a bajo nivel.
        *    [ EDDGrid LonPM180](#eddgridlonpm180) modifica los valores de longitud de un niño EDDGrid para que estén en el rango -180 a 180.
        *    [ EDDGrid Lon0360](#eddgridlon0360) modifica los valores de longitud de un niño EDDGrid para que estén en el rango 0 a 360.
        *    [ EDDGrid SideBySide](#eddgridsidebyside) agregados dos o más EDDGrid datasets lado a lado.
        *    [ EDDGrid AggregateExistingDimension](#eddgridaggregateexistingdimension) agregados dos o más EDDGrid datasets, cada uno de los cuales tiene una gama diferente de valores para la primera dimensión, pero valores idénticos para las otras dimensiones.
        *    [ EDDGrid Copiado](#eddgridcopy) puede hacer una copia local de otro EDDGrid 's datos y sirve datos de la copia local.
             
    * Todos EDDGrid datasets admiten un ajuste de nThreads, que dice ERDDAP™ cuántos hilos utilizar al responder a una solicitud. Ver el [nTreads](#nthreads) documentación para detalles.
         
### EDDTable{#eddtable} 
*    [ **EDDTable** ](#eddtable) datasets manejan datos tabulares.
    * Los datos tabulares pueden ser representados como una tabla de bases de datos con filas y columnas. Cada columna (una variable de datos) tiene un nombre, un conjunto de atributos, y almacena sólo un tipo de datos. Cada fila tiene una observación (o grupo de valores relacionados) . La fuente de datos puede tener los datos en una estructura de datos diferente, una estructura de datos más complicada y/o múltiples archivos de datos, pero ERDDAP™ necesita ser capaz de aplanar los datos fuente en una tabla similar a la base de datos para presentar los datos como conjunto de datos tabulares a los usuarios de ERDDAP .
    * Ver la descripción más completa de la [Modelo de datos](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel) .
    * Los tipos de conjunto de datos EDDTable son:
        *    [EDDTableDesde AllDatasets](#eddtablefromalldatasets) es un conjunto de datos de alto nivel que tiene información sobre todos los demás conjuntos de datos en su ERDDAP .
        *    [EDDTableDesde el aeropuerto](#eddtablefromasciifiles) agrega datos de archivos de datos ASCII portátiles separados por coma, pestaña, semicolon o espacio.
        *    [EDDTableDeAsciiService](#eddtablefromasciiservice) es la superclase de todas las clases de EDDTableDesdeAsciiService...
        *    [EDDTableDesdeAsciiServiceNOS](#eddtablefromasciiservicenos) maneja datos de algunos de los NOAA Servicios web NOS.
        *    [EDDTableDesdeAudioFiles](#eddfromaudiofiles) agrega datos de un grupo de archivos de audio locales.
        *    [EDDTableDesde AwsXmlFiles](#eddtablefromawsxmlfiles) agrega datos de un conjunto de la estación meteorológica automática (AWS) Archivos XML.
        *    [EDDTableDesdeCassandra](#eddtablefromcassandra) maneja datos tabulares de una tabla Cassandra.
        *    [EDDTableDeColumnarAsciiFiles](#eddtablefromcolumnarasciifiles) agrega datos de archivos de datos tabulares ASCII con columnas de datos de ancho fijo.
        *    [EDDTableDeDapSequence](#eddtablefromdapsequence) maneja datos tabulares desde DAP servidores de secuencia.
        *    [EDDTableDesde la base de datos](#eddtablefromdatabase) maneja datos tabulares de una tabla de bases de datos.
        *    [EDDTableDesde EDDGrid ](#eddtablefromeddgrid) le permite crear un conjunto de datos EDDTable desde un EDDGrid Dataset.
        *    [EDDTableDeErddap](#eddfromerddap) maneja datos tabulares desde un remoto ERDDAP .
        *    [EDDTableDesdeFileNames](#eddtablefromfilenames) crea un conjunto de datos de información sobre un grupo de archivos en el sistema de archivos del servidor, pero no sirve datos de dentro de los archivos.
        *    [EDDTableDeFiles](#eddtablefromfiles) es la superclase de todas las clases EDDTableDesde...
        *    [EDDTableDesdeHtpGet](#eddtablefromhttpget) es ERDDAP Es sólo un sistema para la importación de datos y la exportación de datos.
        *    [EDDTableDesde Hyrax Archivos](#eddtablefromhyraxfiles)   (DEPRECATED) agrega datos de archivos con varias variables con dimensiones compartidas servidas por [ Hyrax   OPeNDAP servidor](https://www.opendap.org/software/hyrax-data-server) .
        *    [EDDTableDesdeInvalidCRAFiles](#eddtablefrominvalidcrafiles) datos agregados de NetCDF   (v3 o v4)   .nc archivos que utilizan una variante específica, inválida, de la CF DSG Contiguous Ragged Array (CRA) archivos. Aunque ERDDAP™ soporta este tipo de archivo, es un tipo de archivo inválido que nadie debe comenzar a usar. Grupos que actualmente utilizan este tipo de archivo se alienta encarecidamente a utilizar ERDDAP™ para generar archivos CF DSG CRA válidos y dejar de usar estos archivos.
        *    [EDDTableDesdeJsonlCSVFiles](#eddtablefromjsonlcsvfiles) datos agregados de [JSON Líneas Archivos CSV](https://jsonlines.org/examples/) .
        *    [EDDTableDesdeMultidimNcFiles](#eddtablefrommultidimncfiles) datos agregados de NetCDF   (v3 o v4)   .nc archivos con varias variables con dimensiones compartidas.
        *    [EDDTableDesde Mqt](/docs/server-admin/mqtt-integration) construye un conjunto de datos basado en mensajes MQTT. Tenga en cuenta que la documentación está en una página dedicada. Tenga en cuenta que hay muchas similitudes con [EDDTableDesdeHtpGet](#eddtablefromhttpget) .
        *    [EDDTableDesdeNcFiles](#eddtablefromncfiles) datos agregados de NetCDF   (v3 o v4)   .nc archivos con varias variables con dimensiones compartidas. Está bien seguir utilizando este tipo de conjunto de datos para los conjuntos de datos existentes, pero para nuevos conjuntos de datos recomendamos utilizar EDDTableDesdeMultidimNcFiles.
        *    [EDDTableDesdeNcCFFiles](#eddtablefromnccffiles) datos agregados de NetCDF   (v3 o v4)   .nc archivos que utilizan uno de los formatos de archivo especificados por [CF Geometrías de muestreo discretos (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) convenciones. Pero para los archivos usando una de las variantes CF DSG multidimensionales, use [EDDTableDesdeMultidimNcFiles](#eddtablefrommultidimncfiles) en lugar de eso.
        *    [EDDTableDesdeNccsvFiles](#eddtablefromnccsvfiles) datos agregados de [NCCSV](/docs/user/nccsv-1.00) Archivos ASCII .csv.
        *    [EDDTableDesdenos](#eddtablefromnos)   (DEPRECATED) maneja datos tabulares de servidores XML NOS.
        *    [EDDTableDesde OBIS](#eddtablefromobis) maneja datos tabulares de servidores OBIS.
        *    [EDDTableDesdeParquetFiles](#eddtablefromparquetfiles) maneja datos de [Parquet](https://parquet.apache.org/) .
        *    [EDDTableDesde SOS ](#eddtablefromsos) maneja datos tabulares desde SOS servidores.
        *    [EDDTableDeThreddsFiles](#eddtablefromthreddsfiles)   (DEPRECATED) agrega datos de archivos con varias variables con dimensiones compartidas servidas por [THREDDS OPeNDAP servidor](https://www.unidata.ucar.edu/software/tds/) .
        *    [EDDTableDesde WFS Archivos](#eddtablefromwfsfiles)   (DEPRECATED) hace una copia local de todos los datos de una ArcGIS MapServer WFS servidor para que los datos puedan ser reservidos rápidamente ERDDAP™ usuarios.
        *    [EDDTableAggregateRows](#eddtableaggregaterows) puede hacer un conjunto de datos EDDTable de un grupo de conjuntos de datos EDDTable.
        *    [EDDTableCopy](#eddtablecopy) puede hacer una copia local de muchos tipos de conjuntos de datos EDDTable y luego reservar los datos rápidamente de la copia local.

  
- -

## Descripciones detalladas de Tipos de Dataset{#detailed-descriptions-of-dataset-types} 

###  EDDGrid DeDap{#eddgridfromdap} 
 [ ** EDDGrid DeDap** ](#eddgridfromdap) maneja variables de rejilla desde [ DAP ](https://www.opendap.org/) servidores.

* Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puede recopilar la información que necesita para ajustarla o crear su propio XML para un EDDGrid DeDap dataset mirando los archivos DDS y DAS del conjunto de datos fuente en su navegador (agregando .das y .dds a sourceUrl , por ejemplo, [https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds) ) .
     
*    EDDGrid FromDap puede obtener datos de cualquier variable multidimensional de una DAP servidor de datos. (Anteriormente, EDDGrid FromDap se limitó a variables designadas como "grid", pero eso ya no es un requisito.)   
     
* Valores de dimensión clasificados - Los valores de cada dimensión DEBE estar en orden (ascendente o descendente) . Los valores pueden ser espaciados irregularmente. No puede haber vínculos. Este es un requisito del [CF metadatos standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Si los valores de cualquier dimensión no están en orden ordenado, el conjunto de datos no se cargará y ERDDAP™ identificará el primer valor sin surtido en el archivo de registro, *bigParentDirectory* /logs/log.txt .
    
Los valores de dimensión no variados casi siempre indican un problema con el conjunto de datos fuente. Esto ocurre más comúnmente cuando un archivo mal llamado o inapropiado se incluye en la agregación, que conduce a una dimensión de tiempo sin surtir. Para resolver este problema, vea el mensaje de error en el ERDDAP™ log.txt archivo para encontrar el valor de tiempo ofensivo. A continuación, busque en los archivos fuente para encontrar el archivo correspondiente (o uno antes o uno después) eso no pertenece a la agregación.
    
####  EDDGrid DeDap esqueleto XML{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
###  EDDGrid DeEDDTable{#eddgridfromeddtable} 
 [ ** EDDGrid DeEDDTable** ](#eddgridfromeddtable) le permite convertir un conjunto de datos tabular EDDTable en un EDDGrid Dataset redondeado. Recuerda que ERDDAP™ tratar los conjuntos de datos como [conjuntos de datos redondeados (subclases de EDDGrid ) o conjuntos de datos tabulares (subclases de EDDTable) ](#why-just-two-basic-data-structures) .

* Normalmente, si tiene datos redondeados, acaba de configurar un EDDGrid Dataset directamente. A veces esto no es posible, por ejemplo, cuando usted tiene los datos almacenados en una base de datos relacional que ERDDAP™ sólo puede acceder a través de EDDTableDesdeDatabase. EDDGrid DeEDDTable clase te permite remediar esa situación.
     
* Obviamente, los datos en el conjunto de datos EDDTable subyacente deben ser (básicamente) datos redondeados, pero en forma tabular. Por ejemplo, el conjunto de datos EDDTable puede tener datos de CTD: mediciones de corriente hacia el este y hacia el norte, a varias profundidades, en varias ocasiones. Puesto que las profundidades son las mismas en cada momento, EDDGrid FromEDDTable puede crear un conjunto de datos rejillado con una dimensión de tiempo y profundidad que acceda a los datos a través del conjunto de datos EDDTable subyacente.
     
* GenerarDatasets Xml... Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puede reunir la información que necesita para mejorar el borrador áspero.
     
* Fuente Atributos - Como con todos los demás tipos de conjuntos de datos, EDDGrid FromTable tiene la idea de que hay fuente globalAtributos y [mundial addAttributes ](#global-attributes)   (especificado en datasets.xml ) , que se combinan para hacer la combinación global Atributos, que son lo que los usuarios ven. Para fuente globalAtributos, EDDGrid FromEDDTable utiliza la combinación global Atributos del conjunto de datos EDDTable subyacente. (Si lo piensas por un minuto, tiene sentido.) 
    
Del mismo modo, para cada uno axisVariable 's y dataVariable 's [ addAttributes ](#addattributes) , EDDGrid FromEDDTable utiliza la variable combinada Atributos del conjunto de datos EDDTable subyacente como el EDDGrid Fuente de la variableEDDTableAtributos. (Si lo piensas por un minuto, tiene sentido.) 
    
Como consecuencia, si el EDDTable tiene buenos metadatos, EDDGrid FromEDDTable a menudo necesita muy poco addAttributes metadatos... sólo unos pocos tweaks aquí y allá.
    
*    dataVariable s versus axisVariable s... La EDDTable subyacente sólo tiene dataVariable s. An EDDGrid DeEDDTable dataset tendrá algunos axisVariable s (creado a partir de algunos de los EDDTable dataVariable s) y algunos dataVariable s (creado del EDDTable restante dataVariable s) . [GenerarDatasetsXml](#generatedatasetsxml) hará una suposición de que EDDTable dataVariable s should become EDDGrid DeEDDTable axisVariable s, pero es sólo una suposición. Necesita modificar la salida de GenerateDatasetsXml para especificar qué dataVariable s will become axisVariable s, y en qué orden.
     
* axisValues -- No hay nada sobre el EDDTable subyacente para contar EDDGrid FromEDDTabla los posibles valores de los axisVariable s en la versión redondeada del conjunto de datos, por lo que debe proporcionar esa información para cada axisVariable mediante uno de estos atributos:
    
    * axisValues -- le permite especificar una lista de valores. Por ejemplo,
        &lt;at name="axisValues" [Tipo="DobleList"](#attributetype) \\ título2, 2.5, 3, 3.5, 4&lt;/att confianza
Note el uso de un [Tipo de datos](#data-types) más la palabra List. Además, el tipo de lista (por ejemplo, doble) , DEBE coincidir con los datos Tipo de la variable en el EDDTable y EDDGrid Activos de datos deEDDTable.
    * axisValuesStartStrideStop -- le permite especificar una secuencia de valores regularmente espaciados especificando los valores de inicio, paso y parada. Aquí hay un ejemplo que equivale al ejemplo axisValues arriba:
        &lt;Att name="axisValuesStartStrideStop" [Tipo="DobleList"](#attributetype) \\ título2, 0,5, 4&lt;/att confianza
De nuevo, note el uso de un tipo de datos de lista. Además, el tipo de lista (por ejemplo, doble) , DEBE coincidir con los datos Tipo de la variable en el EDDTable y EDDGrid Activos de datos deEDDTable.
         
    
Actualizaciones -- Así como no hay manera de EDDGrid FromEDDTable para determinar los valores del eje de la EDDTable inicialmente, no hay una manera confiable para EDDGrid FromEDDTable para determinar desde el EDDTable cuando los valores del eje han cambiado (notablemente, cuando hay nuevos valores para la variable de tiempo) . Actualmente, la única solución es cambiar el atributo axisValues en datasets.xml y volver a cargar el conjunto de datos. Por ejemplo, podrías escribir un script para
    
    1. Búsqueda datasets.xml para
         datasetID = *elDatasetID* "
así que usted está trabajando con el conjunto de datos correcto.
    2. Búsqueda datasets.xml para la próxima aparición de
         <sourceName>  *losVariablesSourceName*  </sourceName>   
así que usted está trabajando con la variable correcta.
    3. Búsqueda datasets.xml para la próxima aparición de
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
Así que sabes la posición de inicio de la etiqueta.
    4. Búsqueda datasets.xml para la próxima aparición de
```
        </att>  
```
así que conoces la posición final de los valores del eje.
    5. Sustitúyase el viejo inicio, estire, detenga valores con los nuevos valores.
    6. Contacto [Bandera URL](/docs/server-admin/additional-information#set-dataset-flag) para que el conjunto de datos diga ERDDAP™ para recargar el conjunto de datos.
    
Esto no es ideal, pero funciona.
     
* precisión... Cuando EDDGrid FromEDDTable responde a la solicitud de datos de un usuario, mueve una fila de datos de la tabla de respuesta EDDTable en la EDDGrid Rejilla de respuesta. Para ello, tiene que averiguar si los valores "eje" en una fila dada en la tabla coinciden con una combinación de valores de eje en la red. Para los tipos de datos enteros, es fácil determinar si dos valores son iguales. Pero para flotadores y dobles, esto plantea el horrible problema de los números de puntos flotantes [no coincide exactamente](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) . (por ejemplo, 0,2 versus 0,199999999999999996) . A (tratar de) tratar con esto, EDDGrid FromTable le permite especificar un atributo de precisión para cualquiera de los axisVariable s, que especifica el número total de dígitos decimales que deben ser idénticos.
    * Por ejemplo,&lt;att name="precision" type="int"&lt;/att confianza
    * Para diferentes tipos de variables de datos, hay diferentes valores de precisión predeterminados. Los defectos son generalmente apropiados. Si no lo son, necesita especificar diferentes valores.
    * Para axisVariable s que son [tiempo o tiempo Variables de muestreo](#timestamp-variables) , el predeterminado es de precisión completa (una coincidencia exacta) .
    * Para axisVariable s que son flotadores, la precisión predeterminada es 5.
    * Para axisVariable s que son dobles, la precisión predeterminada es 9.
    * Para axisVariable s que tienen tipos de datos enteros, EDDGrid FromEDDTable ignora el atributo de precisión y siempre utiliza la precisión completa (una coincidencia exacta) .
         
    *    **¡Ay&#33;** Al hacer la conversión de un trozo de datos tabulares en un trozo de datos redondeados, si EDDGrid FromEDDTable no puede igualar un "eje" EDDTable a uno de los esperados EDDGrid DeEDDTable valores de eje, EDDGrid DeEDDTable silenciosamente (no error) tira los datos de esa fila de la tabla. Por ejemplo, puede haber otros datos (no en la red) en el conjunto de datos EDDTable. (Y si stride 1, no es obvio EDDGrid DeTabla qué valores del eje son los valores deseados y cuáles son los que deben ser saltados debido a la zancada.) Por lo tanto, si los valores de precisión son demasiado altos, el usuario verá valores perdidos en la respuesta de datos cuando existan valores de datos válidos.
        
Por el contrario, si los valores de precisión se establecen demasiado bajos, EDDTable "eje" valores que no deben coincidir EDDGrid DeEDDTable valores de eje (erróneamente) coinciden.
        
Estos problemas potenciales son horribles, porque el usuario obtiene los datos incorrectos (o valores perdidos) cuando deben obtener los datos adecuados (o al menos un mensaje de error) .
Esto no es un defecto. EDDGrid DeTabla. EDDGrid FromTable no puede resolver este problema. El problema es inherente a la conversión de datos tabulares en datos redondeados (a menos que se puedan hacer otras suposiciones, pero no se pueden hacer aquí) .
Depende de ti, el ERDDAP™ administrador, a **prueba tu EDDGrid DeEDDTable a fondo** para garantizar que los valores de precisión se establezcan para evitar estos problemas potenciales.
        
#### brecha{#gapthreshold} 
*    [brecha](#gapthreshold) -- Este es un tipo muy inusual de conjunto de datos. Desde los tipos de consultas que se pueden hacer (manejado por) an EDDGrid Dataset (relacionados con los rangos y los pasos de los axisVariable s) son muy diferentes de los tipos de consultas que se pueden hacer (manejado por) un conjunto de datos EDDTable (sólo relacionado con los rangos de algunas variables) , el rendimiento de EDDGrid FromEDDTable datasets variará mucho dependiendo de la solicitud exacta que se haga y de la velocidad del conjunto de datos EDDTable subyacente. Para solicitudes que tengan un valor de zancada 1, EDDGrid FromEDDTable puede pedir a la EDDTable subyacente para un trozo relativamente grande de datos (como si estride=1) y luego tamizar los resultados, manteniendo los datos de algunas filas y eliminando los datos de otros. Si tiene que pasar por muchos datos para obtener los datos que necesita, la solicitud tomará más tiempo para rellenar.
    
Si EDDGrid FromEDDTable puede decir que habrá grandes brechas (con filas de datos no deseados) entre las filas con los datos deseados, EDDGrid FromEDDTable puede elegir hacer varias subrequestas a la EDDTable subyacente en lugar de una gran petición, saltando así las filas no deseadas de datos en las grandes brechas. La sensibilidad de esta decisión se controla por la brecha Valor de propiedad tal como se especifica en el&lt;diferenciaThreshold (default=1000 filas de datos fuente) . Posibilidad de configuraciónLa retención de un número menor llevará a la fabricación de conjuntos de datos (en general) más subrepeticiones. Posibilidad de configuraciónLa retención de un número mayor llevará a la fabricación de conjuntos de datos (en general) menos conquistas.
    
Si la brechaThreshold es demasiado pequeña, EDDGrid FromEDDTable funcionará más lentamente porque la parte superior de múltiples solicitudes será mayor que el tiempo ahorrado por obtener algunos datos de exceso. Si la brechaThreshold es demasiado grande, EDDGrid FromEDDTable funcionará más lentamente porque tantos datos excedentes serán recuperados de la EDDTable, sólo para ser descartados. (Como los Ricitos de Oro descubrieron, el medio es "justo correcto".) El overhead para diferentes tipos de conjuntos de datos EDDTable varía mucho, por lo que la única manera de conocer el mejor ajuste real para su conjunto de datos es mediante experimentación. Pero no irás demasiado mal pegando al defecto.
    
Un ejemplo simple es: Imagina un EDDGrid DeTabla con sólo uno axisVariable   (tiempo, con un tamaño de 100000) , uno dataVariable   (temperatura) , y la brecha predeterminadaThreshold de 1000.
    
    * Si un usuario solicita temperatura \\[ 0#58;100 \\] , el paso es 100 por lo que el tamaño de la brecha es 99, que es menos que la brechaThreshold. Así que... EDDGrid FromTable hará una sola solicitud a EDDTable para todos los datos necesarios para la solicitud (equivalente a la temperatura \\[ 0:5000 \\] ) y tirar todas las filas de datos que no necesita.
    * Si un usuario solicita temperatura \\[ 0:2500:5000 \\] , ese paso es 2500 por lo que el tamaño de la brecha es 2499, que es mayor que la brechaThreshold. Así que... EDDGrid FromTable hará solicitudes separadas a EDDTable que son equivalentes a la temperatura \\[ 0 \\] , temperatura \\[ 2500 \\] , temperatura \\[ 5000 \\] .
    
El cálculo del tamaño de la brecha es más complicado cuando hay varios ejes.
    
Para cada solicitud de usuario, EDDGrid FromEDDTable imprime mensajes de diagnóstico relacionados con esto en [log.txt](/docs/server-admin/additional-information#log) archivo.
    
    * Si...&lt;logLevel] (#loglevel) dentro datasets.xml se establece a la información, esto imprime un mensaje como
\\* nOuterAxes=1 de 4 nOuterRequests=22
Si nOuterAxes=0, gapThreshold no fue excedido y sólo una petición será hecha a EDDTable.
Si nOuterAxes confía0, gapThreshold fue excedido y nOuterRequests se hará a EDDTable, correspondiente a cada combinación solicitada de los nOuterAxes más izquierdos. Por ejemplo, si el conjunto de datos tiene 4 axisVariable s y dataVariable como hacia el este \\[ tiempo \\]  \\[ latitud \\]  \\[ longitud \\]  \\[ profundidad \\] , el más izquierdo (primera) axis variable es tiempo.
    * Si&lt;logLevel dentro datasets.xml se establece a todos, información adicional se escribe en el archivo log.txt.
         
####  EDDGrid DeEDDTable esqueleto XML{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### EDD* ERDDAP  {#eddfromerddap} 
 ** EDDGrid FromErddap** maneja datos redondeados desde un control remoto ERDDAP™ servidor.
 **EDDTableDeErddap** maneja datos tabulares desde un remoto ERDDAP™ servidor.

*    EDDGrid FromErddap y EDDTableDesdeErddap se comportan de forma diferente a todos los demás tipos de conjuntos de datos en ERDDAP .
    * Al igual que otros tipos de conjuntos de datos, estos conjuntos de datos obtienen información sobre el conjunto de datos de la fuente y lo mantienen en memoria.
    * Como otros tipos de conjuntos de datos, cuando ERDDAP™ búsquedas de conjuntos de datos, muestra el formulario de acceso de datos ( * datasetID * HTML) , o muestra la forma Hacer un Gráfico ( * datasetID * .graph) , ERDDAP™ utiliza la información sobre el conjunto de datos que está en memoria.
    *    EDDGrid FromErddap and EDDTable FromErddap son la base para [grids/clusters/federations](/docs/server-admin/scaling) de ERDDAP s, que distribuye eficientemente el uso de CPU (principalmente para hacer mapas) , uso de memoria, almacenamiento de conjuntos de datos y uso ancho de banda de un gran centro de datos.
#### Redirect{#redirect} 
* A diferencia de otros tipos de conjuntos de datos, cuando ERDDAP™ recibe una solicitud de datos o imágenes de estos conjuntos de datos, ERDDAP   [redirecciona](https://en.wikipedia.org/wiki/URL_redirection) la solicitud al control remoto ERDDAP™ servidor. El resultado es:
    * Esto es muy eficiente (CPU, memoria y ancho de banda) , porque de otro modo
        1. El compuesto ERDDAP™ tiene que enviar la solicitud a la otra ERDDAP™   (que toma tiempo) .
        2. El otro ERDDAP™ tiene que conseguir los datos, reformarlo, y transmitir los datos al composite ERDDAP .
        3. El compuesto ERDDAP™ tiene que recibir los datos (usando ancho de banda) , reformat it (usando CPU y memoria) , y transmitir los datos al usuario (usando ancho de banda) . Dirigiendo la solicitud y permitiendo la otra ERDDAP™ para enviar la respuesta directamente al usuario, el composite ERDDAP™ gasta esencialmente no CPU tiempo, memoria o ancho de banda en la solicitud.
    * La redireccion es transparente para el usuario independientemente del software cliente (un navegador o cualquier otro software o herramienta de línea de comando) .
*    [Puedes decir ERDDAP™ ](#redirect) no redirigir ninguna solicitud de usuario estableciendo&lt;redirigir&lt;/redirect ratio, pero esto niega la mayoría de las ventajas del ... (notablemente, dispersing la carga en el extremo frontal ERDDAP™ al mando a distancia/backend ERDDAP ) .
         
     
#### Suscripciones{#subscriptions} 
Normalmente, cuando un EDDGrid FromErddap and EDDTable DeErddap son (re) cargado en tu ERDDAP , intentan agregar una suscripción al conjunto de datos remoto a través del control remoto ERDDAP 's email/URL suscripción sistema. De esa manera, cuando el conjunto de datos remoto cambia, el control remoto ERDDAP™ contactos [setDataset Bandera URL](/docs/server-admin/additional-information#set-dataset-flag) en tu ERDDAP™ para que el conjunto de datos local sea recargado ASAP y para que el conjunto de datos local esté siempre perfectamente actualizado y mime el conjunto de datos remoto. Así que, la primera vez que esto sucede, debe obtener un correo electrónico solicitando que valide la suscripción. Sin embargo, si el local ERDDAP™ no puede enviar un correo electrónico o si el remoto ERDDAP 's email/URL sistema de suscripción no está activo, usted debe enviar el correo electrónico remoto ERDDAP™ administrador y solicitar que se añada manualmente [&lt;onChange Conf] (#onchange) ...&lt;/onChange monedas a todos los conjuntos de datos relevantes para llamar a su dataset [setDataset URL de la bandera](/docs/server-admin/additional-information#set-dataset-flag) . Vea su ERDDAP™ informe diario para una lista de setDataset URLs de la bandera, pero sólo enviar las para EDDGrid FromErddap y EDDTableDesde conjuntos de datos de Erddap hasta el control remoto ERDDAP™ administrador.
    
¿Esto no funciona? ¿Sus conjuntos de datos locales no se mantienen sincronizados con los conjuntos de datos remotos?
Varias cosas deben funcionar correctamente para que este sistema funcione para que sus conjuntos de datos permanezcan actualizados. Compruebe cada una de estas cosas en orden:
    
    1. Tu ERDDAP™ debe ser capaz de enviar correos electrónicos. Vea la configuración de correo electrónico en su setup.xml.
    2. En general (pero no siempre) Tu ERDDAP 's&lt;baseUrl confianza y&lt;baseHttpsUrl confianzamust no tiene un número de puerto (por ejemplo: 8080, :8443) . Si lo hacen, use un [proxypass](/docs/server-admin/deploy-install#proxypass) para quitar el puerto del Url.
    3. En tu configuración.xml,&lt;subscribeToRemoteErddapDatasetilo debe ser establecido a la verdad.
    4. Cuando tu EDD local... FromErddap dataset es recargado, debe enviar una solicitud al control remoto ERDDAP™ para suscribirse al conjunto de datos remoto. Mira en log.txt para ver si esto está sucediendo.
    5. Usted debe obtener un email pidiéndole que valide la solicitud de suscripción.
    6. Debe hacer clic en el enlace en ese correo electrónico para validar la solicitud de suscripción.
    7. El control remoto ERDDAP™ debería decir que la validación fue exitosa. En cualquier momento, puede solicitar un correo electrónico desde el control remoto ERDDAP™ con una lista de sus suscripciones pendientes y válidas. Ver el formulario *remoteErddapBase Url* /erddap/subscriptions/list.html .
    8. Cuando el conjunto de datos remoto cambia (por ejemplo, obtiene datos adicionales) , el control remoto ERDDAP™ debe tratar de contactar con el flagURL en su ERDDAP . No puedes comprobar esto, pero puedes preguntar al administrador del control remoto ERDDAP™ para comprobar esto.
    9. Tu ERDDAP™ debe recibir una solicitud para establecer esa bandera. Mira en tu log.txt para "setDatasetFlag.txt?" (s) y ver si hay un mensaje de error asociado con las solicitudes.
    10. Tu ERDDAP™ debe tratar de volver a cargar ese conjunto de datos (tal vez no inmediatamente, pero ASAP) .
         
#### Max actualizado (tiempo) ?{#up-to-date-maxtime} 
 EDDGrid /TablaDeErddap datasets sólo cambia su información almacenada sobre cada conjunto de datos fuente cuando el conjunto de datos fuente es ["reload"ed](#reloadeverynminutes) y algunos cambios de metadatos (por ejemplo, la variable de tiempo actual\\_range ) , generando así una notificación de suscripción. Si el conjunto de datos fuente tiene datos que cambian con frecuencia (por ejemplo, nuevos datos cada segundo) y utiliza el ["actualizar"](#updateeverynmillis) sistema para notar cambios frecuentes en los datos subyacentes, EDDGrid /TablaDeErddap no se notificará acerca de estos cambios frecuentes hasta el siguiente conjunto de datos "recargar", por lo que el EDDGrid /TablaDeErddap no será perfectamente actualizado. Puede minimizar este problema cambiando el conjunto de datos fuente&lt;reloadEveryNMinutes confiar a un valor más pequeño (¿60?) para que haya más notificaciones de suscripción para indicar EDDGrid /TablaDeErddap para actualizar su información sobre el conjunto de datos fuente.

O, si su sistema de gestión de datos sabe cuándo el conjunto de datos fuente tiene nuevos datos (por ejemplo, a través de un script que copia un archivo de datos) , y si eso no es súper frecuente (por ejemplo, cada 5 minutos o menos frecuente) , hay una mejor solución:

1. No uso&lt;Actualizar EveryNMillis confiar para mantener el conjunto de datos fuente actualizado.
2. Establecer el conjunto de datos fuente&lt;reloadEveryNMinutes confía a un número mayor (¿1440?) .
3. Que el script contacte con el conjunto de datos fuente [Bandera URL](/docs/server-admin/additional-information#set-dataset-flag) justo después de que copia un nuevo archivo de datos en su lugar.
     

Esto llevará a que el conjunto de datos fuente sea perfectamente actualizado y que genere una notificación de suscripción, que se enviará a la EDDGrid /TablaDesde el conjunto de datos de Eddap. Eso conducirá a la EDDGrid /TablaDeErddap dataset para estar perfectamente actualizado (bien, dentro de 5 segundos de nuevos datos añadiendo) . Y todo lo que se hará eficientemente (sin recargas innecesarias de conjunto de datos) .
     
#### No addAttributes , axisVariable o dataVariable  {#no-addattributes-axisvariable-or-datavariable} 
A diferencia de otros tipos de conjuntos de datos, EDDTableDesdeErddap y EDDGrid FromErddap datasets don't allow global&lt;addAttributes&gt;,&lt; axisVariable &gt; o&lt; dataVariable &gt; secciones en datasets.xml para ese conjunto de datos. El problema es que permitir que esas personas conduzcan a incoherencias:
    
1. Digamos que fue permitido y agregó un nuevo atributo global.
2. Cuando un usuario le pregunta ERDDAP™ para los atributos globales, aparecerá el nuevo atributo.
3. Pero cuando un usuario pregunta a su ERDDAP™ para un archivo de datos, su ERDDAP™ redirige la solicitud a la fuente ERDDAP . Que ERDDAP™ no es consciente del nuevo atributo. Así que si crea un archivo de datos con metadatos, por ejemplo, un .nc archivo, los metadatos no tendrán el nuevo atributo.

Hay dos soluciones de trabajo:

1. Convince el administrador de la fuente ERDDAP™ para hacer los cambios que quieras a los metadatos.
2. En lugar de EDDTableDesdeErddap, use [EDDTableDeDapSequence](#eddtablefromdapsequence) . O en lugar de EDDGrid FromErddap, use [ EDDGrid DeDap](#eddgridfromdap) . Esos tipos de EDD le permiten conectarse eficientemente a un conjunto de datos en un remoto ERDDAP™   (pero sin redireccionar solicitudes de datos) y te permiten incluir global&lt;addAttributes&gt;,&lt; axisVariable &gt; o&lt; dataVariable &gt; secciones en datasets.xml . Otra diferencia: tendrá que suscribirse manualmente al conjunto de datos remoto, de modo que el conjunto de datos en su ERDDAP™ será notificado (a través de [Bandera URL](/docs/server-admin/additional-information#set-dataset-flag) ) cuando hay cambios en el conjunto de datos remoto. Así, usted está creando un nuevo conjunto de datos, en lugar de vincularse a un conjunto de datos remoto.
         
#### Otras notas{#other-notes} 
* Por razones de seguridad, EDDGrid FromErddap and EDDTable FromErddap no apoyen [&lt;accesible a título] (#accessibleto) tag y no se puede utilizar con conjuntos de datos remotos que requieren iniciar sesión (porque utilizan [&lt;accesible a título] (#accessibleto) ).. See ERDDAP 's [sistema de seguridad](/docs/server-admin/additional-information#security) para restringir el acceso a algunos conjuntos de datos a algunos usuarios.
     
* Empezando con ERDDAP™ v2.10, EDDGrid FromErddap y EDDTableDeErddap apoyan el [&lt;accesibleViaFiles confía] (#accessibleviafiles) tag. A diferencia de otros tipos de conjuntos de datos, el valor predeterminado es cierto, pero los archivos del conjunto de datos serán accesiblesViaFiles sólo si el conjunto de datos fuente también tiene&lt;accesibleViaFiles confiar se establece a la verdad.
     
* Puedes usar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer el datasets.xml para este tipo de conjunto de datos. Pero puede hacer estos tipos de conjuntos de datos fácilmente a mano.
     
####  EDDGrid DeErddap esqueleto XML{#eddgridfromerddap-skeleton-xml} 
*    EDDGrid DeErddap esqueleto XML dataset es muy sencillo, ya que la intención es imitar el conjunto de datos remoto que ya es adecuado para su uso en ERDDAP :
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### EDDTableDeErddap esqueleto XML{#eddtablefromerddap-skeleton-xml} 
* El XML esqueleto para un conjunto de datos EDDTableDesdeErddap es muy sencillo, ya que la intención es imitar el conjunto de datos remoto, que ya es adecuado para su uso en ERDDAP :
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid De Etopo{#eddgridfrometopo} 
 [ ** EDDGrid De Etopo** ](#eddgridfrometopo) sólo sirve a la [ETOPO1 Global 1-Minute Gridded Elevation Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html)   (Superficie de hielo, cuadrícula registrada, binaria, 2byte int: etopo1\\_ice\\_g\\_i2 .zip ) que se distribuye con ERDDAP .

* Sólo dos. datasetID s are supported for EDDGrid DesdeEtopo, para que pueda acceder a los datos con valores de longitud -180 a 180, o valores de longitud 0 a 360.
* Nunca hay etiquetas sub, ya que los datos ya se describen dentro ERDDAP .
* Así que las dos opciones para EDDGrid Los conjuntos de datos de Etopo son (literalmente) :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

###  EDDGrid DeFiles{#eddgridfromfiles} 
 [ ** EDDGrid DeFiles** ](#eddgridfromfiles) es la superclase de todos EDDGrid De... clases de Files. No puedes usar EDDGrid DesdeFiles directamente. En su lugar, utilice una subclase de EDDGrid DesdeFiles para manejar el tipo de archivo específico:

*    [ EDDGrid FromMergeIRFiles](#eddgridfrommergeirfiles) maneja datos de la red [MergeIR .gz ](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) archivos.
*    [ EDDGrid DeAudioFiles](#eddfromaudiofiles) agrega datos de un grupo de archivos de audio locales.
*    [ EDDGrid FromNcFiles](#eddgridfromncfiles) maneja datos de la red [GRIB .grb](https://en.wikipedia.org/wiki/GRIB) archivos, [ HDF   (v4 o v5)   .hdf ](https://www.hdfgroup.org/) archivos, [ .nc ml](#ncml-files) archivos, y [ NetCDF   (v3 o v4)   .nc ](https://www.unidata.ucar.edu/software/netcdf/) archivos. Esto puede funcionar con otros tipos de archivos (por ejemplo, BUFR) , simplemente no lo hemos probado -- por favor envíenos algunos archivos de muestra si usted está interesado.
*    [ EDDGrid FromNcFilesUnpacked](#eddgridfromncfilesunpacked) es una variante de EDDGrid FromNcFiles que maneja datos desde rejillas NetCDF   (v3 o v4)   .nc y archivos relacionados, que ERDDAP™ desempaquetas a bajo nivel.

Actualmente no se admiten otros tipos de archivos. Pero generalmente es relativamente fácil añadir soporte para otros tipos de archivos. Póngase en contacto con nosotros si tiene una solicitud. O, si sus datos están en un formato de archivo antiguo que le gustaría alejarse de, recomendamos convertir los archivos a ser NetCDF v3 .nc archivos. NetCDF es un formato binario ampliamente compatible, permite el acceso aleatorio rápido a los datos, y ya está soportado por ERDDAP .

#### De Archivos Detalles{#from-files-details} 
La siguiente información se aplica a todas las subclases de EDDGrid DeFiles.

##### agregación de una dimensión existente{#aggregation-of-an-existing-dimension} 
Todas las variaciones de EDDGrid FromFiles puede agregar datos de archivos locales, donde cada archivo tiene 1 (o más) valores diferentes para el más izquierdo (primera) dimensión, generalmente \\[ tiempo \\] , que será agregado. Por ejemplo, las dimensiones pueden ser \\[ tiempo \\]  \\[ altitud \\]  \\[ latitud \\]  \\[ longitud \\] , y los archivos pueden tener los datos para uno (o algunos) valor del tiempo (s) por archivo. El conjunto de datos resultante aparece como si todos los datos del archivo se hubieran combinado. Las grandes ventajas de la agregación son:

* El tamaño del conjunto de datos agregado puede ser mucho mayor que un solo archivo puede ser convenientemente (~2GB) .
* Para datos casi en tiempo real, es fácil añadir un nuevo archivo con el último trozo de datos. No tienes que reescribir todo el conjunto de datos.

Los requisitos para la agregación son:
* Los archivos locales no tienen lo mismo dataVariable s (definida en el conjunto de datos datasets.xml ) . El conjunto de datos tendrá el dataVariable s defined in datasets.xml . Si un archivo dado no tiene un dataVariable , ERDDAP™ añadirá valores perdidos según sea necesario.
* Todo el mundo dataVariable DEBE utilizar el mismo axisVariable s/dimensions (definida en el conjunto de datos datasets.xml ) . Los archivos serán agregados basados en el primero (izquierda-más) dimensión, ordenada en orden ascendente.
* Cada archivo MAY tiene datos para uno o más valores de la primera dimensión, pero no puede haber solapamiento entre archivos. Si un archivo tiene más de un valor para la primera dimensión, los valores DEBE clasificarse en orden ascendente, sin vínculos.
* Todos los archivos DEBE tener exactamente los mismos valores para todas las otras dimensiones. La precisión de las pruebas se determina por [matchAxisNDigits](#matchaxisndigits) .
* Todos los archivos DEBE tener exactamente el mismo [unidades](#units) metadatos para todos axisVariable s y dataVariable s. Si esto es un problema, usted puede ser capaz de utilizar [NcML](#ncml-files) o [ NCO ](#netcdf-operators-nco) para arreglar el problema.
         
##### Aggregation via File Names or Global Metadata{#aggregation-via-file-names-or-global-metadata} 
Todas las variaciones de EDDGrid FromFiles también puede agregar un grupo de archivos añadiendo una nueva izquierda (primera) dimensión, generalmente tiempo, basado en un valor derivado de cada nombre de archivo o del valor de un atributo global que está en cada archivo. Por ejemplo, el nombre de archivo podría incluir el valor de tiempo para los datos en el archivo. ERDDAP™ entonces crearía una nueva dimensión del tiempo.

A diferencia de la característica similar en THREDDS, ERDDAP™ siempre crea un axisVariable con valores numéricos (exigido por la CF) , nunca valores de cuerda (que no están permitidos por CF) . También, ERDDAP™ ordenar los archivos en la agregación basado en la numérica axisVariable valor que se asigna a cada archivo, para que la variable axis siempre tenga valores ordenados según lo requerido por CF. El enfoque de THREDDS de hacer un tipo lexicográfico basado en los nombres de los archivos conduce a agregaciones donde los valores del eje no están ordenados (que no está permitido por CF) cuando los nombres de los archivos son diferentes a los derivados axisVariable valores.

Para establecer una de estas agregaciones en ERDDAP™ , usted definirá una nueva izquierda más (primera)   [ axisVariable ](#axisvariable) con un seudo especial&lt; sourceName que dice ERDDAP™ dónde y cómo encontrar el valor para la nueva dimensión de cada archivo.

* El formato para el pseudo sourceName que obtiene el valor de un nombre de archivo (sólo nombre de archivo.ext) es
    \\*\\*\\ *fileName,*  [datos Tipo](#data-types)  *,* ExtractoRegex *,* captureGroupNumber*
* El formato para el pseudo sourceName que obtiene el valor del nombre de la ruta absoluta de un archivo es
    \\*\\*\\ *pathName,*  [datos Tipo](#data-types)  *,* ExtractoRegex *,* captureGroupNumber*
     \\[ Para esto, el nombre del camino siempre utiliza '/' como el personaje separador del directorio, nunca '\'. \\] 
* El formato para el pseudo sourceName que obtiene el valor de un atributo global es
    \\*\\*\\ *global:* atributo Nombre *,*  [datos Tipo](#data-types)  *,* ExtractoRegex *,* captureGroupNumber*
* Este seudo sourceName la opción funciona diferente de los otros: en lugar de crear una nueva izquierda más (primera)   axisVariable , esto sustituye el valor de la corriente axisVariable con un valor extraído del nombre de archivo (sólo nombre de archivo.ext) . El formato es
    \\*\\*\\ *reemplazar DesdeFileName,*  [datos Tipo](#data-types)  *,* ExtractoRegex *,* captureGroupNumber*
     

Las descripciones de las partes que necesita proporcionar son:

*    *atributo Nombre* -- el nombre del atributo global que está en cada archivo y que contiene el valor de la dimensión.
*    *datos Tipo* -- Esto especifica el tipo de datos que se utilizará para almacenar los valores. Ver la lista estándar de [datos Tipos](#data-types) que ERDDAP™ soportes, excepto que String no está permitido aquí desde variables de eje en ERDDAP™ No pueden ser variables String.
    
Hay otros datos pseudoType, timeFormat= *cuerda TimeFormat* , lo que dice ERDDAP™ que el valor es un tiempo de String [unidades adecuadas para tiempos de cuerda](#string-time-units) . En la mayoría de los casos, el stringTimeFormat que necesita será una variación de uno de estos formatos:
    
    *    yyyy-MM-dd 'T'HH:mm:ss.SSSZ - que ISO 8601:2004 (E) formato de hora de la fecha. Usted puede necesitar una versión acortada de esto, por ejemplo, yyyy-MM-dd 'T'HH:mm:ss or yyyy-MM-dd .
    * yyyyyMMddHHmmss.SSS - que es la versión compacta del formato de fecha ISO 8601. Usted puede necesitar una versión acortada de esto, por ejemplo, yyyyyyyMMddHmms o yyyyyyyMMdd.
    * M/d/yyyy H:mm:ss.SSS -- que es el formato de la fecha de corte estadounidense. Usted puede necesitar una versión acortada de esto, por ejemplo, M/d/yyyy.
    * YyyyyDDDHHmmsSSS - que es el año más el día de cero-pagado del año (por ejemplo, 001 = 1 de enero de 365 = 31 de diciembre en un año siniestro; esto a veces se llama erróneamente la fecha de Julian) . Usted puede necesitar una versión acortada de esto, por ejemplo, yyyyDDD .
    
Si utiliza este pseudo dataType, agregue esto a la nueva variable&lt; addAttributes &quot;
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Si desea cambiar todos los valores de tiempo, cambie el valor de tiempo en unidades, por ejemplo,
1970-01-01T12:00:00Z.
*    *ExtractoRegex* -- Este es el [expresión regular](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) que incluye un grupo de captura (entre padres) que describe cómo extraer el valor del nombre de archivo o valor de atributo global. Por ejemplo, dado un nombre de archivo como S19980011998031.L3b\\_MO\\_CHL .nc , grupo de captura #1, " \\dtutorial ", en la expresión regular S (\\ \\dtutorial ) \\ \\dtutorial \\.L3b.\\* capturará los primeros 7 dígitos después de 'S': 1998001.
*    *capturaGroupNúmero* -- Este es el número del grupo de captura (dentro de un par de paréntesis) en la expresión regular que contiene la información de interés. Generalmente es 1, el primer grupo de captura. A veces necesita utilizar grupos de captura para otros fines en el regex, por lo que el importante número de grupo de captura será 2 (el segundo grupo de captura) o 3 (el tercero) , etc.

Un ejemplo completo de un axisVariable que hace un conjunto de datos agregado con un nuevo eje de tiempo que obtiene los valores de tiempo del nombre de archivo de cada archivo es
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
Cuando usas los datos pseudo "timeFormat=" Tipo, ERDDAP™ añadir 2 atributos a los axisVariable para que parezcan venir de la fuente:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Así que en este caso, ERDDAP™ creará un nuevo eje llamado "time" con valores dobles (segundos desde 1970-01-01T00:00Z) extrayendo los 7 dígitos después de 'S' y antes de ".L3m" en el nombre de archivo e interpretando aquellos como valores de tiempo formateado como yyyyDDD.

Puede anular el tiempo de base predeterminado (1970-01T00:00:00Z) añadiendo un [añadirAtributo](#addattributes) que especifica un atributo de unidades diferentes con un tiempo base diferente. Una situación común es: hay grupos de archivos de datos, cada uno con un composite de 1 día de un conjunto de datos de satélite, donde desea que el valor de tiempo sea el mediodía del día mencionado en el nombre de archivo (el tiempo centrado de cada día) y quieren la variable long\\_name para ser "Tiempo Interno". Un ejemplo que hace esto es:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
Note hours=12 en el tiempo base, que añade 12 horas en relación con el tiempo base original de 1970-01T00:00:00Z.

Un ejemplo completo de un axisVariable que hace un conjunto de datos agregado con un nuevo eje "corrido" (con valores int) que obtiene los valores de ejecución del atributo global "runID" en cada archivo (con valores como "r17\\_global", donde 17 es el número de ejecución) es
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
Observe el uso del grupo de captura número 2 para capturar los dígitos que ocurren después de 'r' o 's', y antes de "\\_global". Este ejemplo también muestra cómo añadir atributos adicionales (por ejemplo, ioos\\_category y unidades) a la variable del eje.
     
#### Archivos comprimidos externamente{#externally-compressed-files} 
* Datasets that are subsets of EDDGrid DeFiles y EDDTable FromFiles puede servir datos directamente desde archivos de datos comprimidos externamente, incluyendo .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , y archivos .Z.
     
*    **¡Esto funciona sorprendentemente bien&#33;**   
En la mayoría de los casos, la desaceleración relacionada con los archivos de datos pequeños y medianos es menor. Si necesita conservar el espacio de disco, animamos fuertemente a usar esta función, especialmente para archivos antiguos que rara vez se acceden.
     
*    **¡Ahorra dinero&#33;**   
Esta es una de las pocas características en ERDDAP™ que te ofrece la oportunidad de ahorrar mucho dinero (aunque al costo de un rendimiento ligeramente reducido) . Si la relación de compresión es, por ejemplo, 6:1 (a veces será mucho más alto) , entonces los archivos de datos del conjunto de datos sólo necesitarán 1/6 el espacio del disco. Entonces tal vez usted puede conseguir con 1 RAID (de un tamaño determinado) en lugar de 6 RAIDS (del mismo tamaño) . Eso es un gran ahorro de costos. Con suerte, la capacidad de comprimir algunos archivos en una colección (¿Los mayores?) y no comprime a otros (¿Los nuevos?) , y para cambiar eso en cualquier momento, vamos a minimizar el inconveniente para comprimir algunos de los archivos (acceso más lento) . Y si la opción es entre almacenar los archivos en cinta (y sólo accesible a petición, después de un retraso) vs almacenarlos comprimidos en un RAID (y accesibles ERDDAP ) , entonces hay una gran ventaja para utilizar la compresión para que los usuarios se interrumpan (relativamente relativamente) acceso rápido a los datos. Y si esto puede salvarte de comprar un RAID adicional, esta característica puede ahorrarte unos $30,000.
     
* Para todos EDDGrid DeFiles subclases, si los archivos de datos tienen una extensión indicando que son archivos comprimidos externamente (Actualmente: .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , o Z) , ERDDAP™ descomprimir los archivos al directorio cache del conjunto de datos cuando los lea (si ya no están en el cache) . Lo mismo es cierto para el archivo binario (por ejemplo, .nc ) subclases de EDDTableDesdeFiles.
     
* Para EDDTableDeFiles subclases para archivos no binarios (por ejemplo, .csv) , los archivos de datos con una extensión indicando que son archivos comprimidos externamente serán descomprimidos en la marcha como se lee el archivo.
     
* NECESIDADES: Si el tipo de archivo comprimido externamente utilizado (por ejemplo, .tgz o .zip ) soporta más de 1 archivo dentro del archivo comprimido, el archivo comprimido debe contener sólo 1 archivo.
     
* NECESIDADES: Esta característica supone que el contenido de los archivos comprimidos externamente no cambia, de modo que se pueda reutilizar un archivo descomprimido en caché. Si algunos o todos los archivos de datos de un conjunto de datos se cambian a veces, no comprime esos archivos. Esto es consistente con el uso común, ya que la gente normalmente no comprime archivos que a veces necesitan cambiar.
     
*   &lt;fileNameRegex Para hacer este trabajo, el conjunto de datos&lt;fileNameRegex confiar debe coincidir con los nombres de los archivos comprimidos. Obviamente, regexes como .\\*coincidirá con todos los nombres de archivos. Si especifica un tipo de archivo específico, por ejemplo, .\\*\\ .nc , entonces usted necesita modificar el reex para incluir la extensión de compresión también, por ejemplo, .\\ *\\ .nc \\ .gz (si todos los archivos serán* algo* .nc  .gz archivos) .
     
* Está bien si su conjunto de datos incluye una mezcla de archivos comprimidos y no comprimidos. Esto puede ser útil si usted cree que algunos archivos (por ejemplo, archivos más antiguos) se utilizará menos a menudo y por lo tanto sería útil guardar el espacio del disco comprimirlos. Para hacer este trabajo, el&lt;fileNameRegex confiar debe coincidir con los nombres de los archivos comprimidos y no comprimidos, por ejemplo, .\\*o .\\*\\ .nc  ( | \\ .gz ) (donde el grupo de captura al final de eso especifica que .gz es opcional.
     
* Está bien si comprime o descomprime archivos específicos en la colección en cualquier momento.
Si el conjunto de datos no utiliza [&lt;actualizar EveryNMillis confiar] (#Updateeverynmillis) , establecer el conjunto de datos [bandera](/docs/server-admin/additional-information#flag) para decir ERDDAP™ para volver a cargar el conjunto de datos y así observar los cambios. Curiosamente, podría utilizar diferentes algoritmos de compresión y configuraciones para diferentes archivos en el mismo conjunto de datos (por ejemplo, .bz2 para archivos raramente usados, .gz para archivos no utilizados a menudo, y ninguna compresión para archivos usados con frecuencia) , sólo asegúrese de que el regex soporta todas las extensiones de archivo que están en uso, por ejemplo, .\\*\\ .nc  ( | \\ .gz  | \\ .bz2 ) .
     
* Por supuesto, ratios de compresión y velocidades para los diferentes algoritmos de compresión varían con el archivo fuente y la configuración (por ejemplo, nivel de compresión) . Si desea optimizar este sistema para sus archivos, haga una prueba de los diferentes métodos de compresión con sus archivos y con una gama de configuraciones de compresión. Si quieres un bien fiable (no necesariamente el mejor) configuración, le recomendamos un poco gzip   ( .gz ) . gzip no hace el archivo comprimido más pequeño (Es razonablemente cercano) , pero comprime el archivo muy rápido y (más importante para ERDDAP™ usuarios) descomprime el archivo muy rápidamente. Además, gzip software viene estándar con cada instalación Linux y Mac OS y está disponible para Windows a través de herramientas gratuitas como 7Zip y complementos Linux como Git Bash. Por ejemplo, para comprimir un archivo fuente en el .gz versión del archivo (mismo nombre de archivo, pero con .gz apéndice) , uso (en Linux, Mac OS, y Git Bash)   
     gzip   * sourceName *   
Para descomprimir un .gz volver al archivo original, utilizar
Gunzip * sourceName  .gz *   
Para comprimir cada uno de los archivos fuente en el directorio y sus subdirectorios, recursivamente, use
     gzip -r *directorName*   
Para descomprimir cada uno de los .gz ficheros en directorio y sus subdirectorios , recursivamente, use
gunzip -r *directorName*   
     
* ADVERTENCIA: No compre externamente ( gzip ) archivos que ya están comprimidos internamente&#33;
Muchos archivos ya tienen datos comprimidos internamente. Si tú gzip estos archivos, los archivos resultantes no serán mucho más pequeños (&lt;5%) y ERDDAP™ perderá tiempo descomprimiéndolos cuando necesite leerlos. Por ejemplo:
    
    * archivos de datos: por ejemplo, .nc 4, y .hdf 5 archivos: Algunos archivos usan compresión interna; algunos no. Cómo decir: las variables comprimidas tienen atributos "\\_ChunkSize". También, si un grupo de rejillas .nc o .hdf Los archivos son todos los tamaños diferentes, es probable que estén comprimidos internamente. Si son del mismo tamaño, no están comprimidos internamente.
    * archivos de imagen: por ejemplo, .gif, .jpg y .png
    * archivos de audio: por ejemplo, .mp3, y .ogg.
    * archivos de vídeo: por ejemplo, .mp4, .ogv, y .webm.
    
        
Un caso desafortunado: los archivos de audio .wav son enormes y no están comprimidos internamente. Sería agradable comprimir ( gzip ) pero generalmente no deberías porque si lo haces, los usuarios no podrán reproducir los archivos comprimidos en su navegador.
     
* Caso de prueba: compresión (con gzip ) un conjunto de datos con 1523 .nc archivos.
    
    * Los datos en los archivos fuente fueron escasos (muchos valores perdidos) .
    * El espacio total de disco pasó de 57 GB antes de la compresión a 7 GB después.
    * Una solicitud de un montón de datos desde 1 punto de tiempo es&lt;1 s antes y después de la compresión.
    * Una solicitud para 1 punto de datos para 365 puntos de tiempo (la peor situación) pasó de 4 s a 71 s.
         
    
Para mí eso es un intercambio razonable para cualquier conjunto de datos, y ciertamente para conjuntos de datos que son usados infrecuentemente.
     
* Compresión interna versus externa:
Comparado con la compresión de archivo interna ofrecida por .nc 4 y 4 .hdf 5 archivos, ERDDAP 's acercamiento para archivos binarios comprimidos externamente tiene ventajas y desventajas. La desventaja es: por una vez leído de una pequeña parte de un archivo, la compresión interna es mejor porque EDDGrid DeFiles sólo necesita descomprimir un par de pedazos (s) del archivo, no todo el archivo. Pero... ERDDAP 's acercamiento tiene algunas ventajas:
    
    *    ERDDAP™ soporta la compresión de todos los tipos de archivos de datos (binario y no binario, por ejemplo, .nc 3 y Csv) no sólo .nc 4 y 4 .hdf 4.
    * Si la mayor parte de un archivo necesita ser leído más de una vez en un corto período de tiempo, entonces ahorra tiempo para descomprimir el archivo una vez y leerlo muchas veces. Esto sucede en ERDDAP™ cuando un usuario utiliza Make-A-Graph para el conjunto de datos y hace una serie de pequeños cambios en el gráfico.
    * La capacidad de tener archivos comprimidos y no comprimidos en la misma colección, le permite más control sobre qué archivos están comprimidos y que no son. Y este control añadido viene sin realmente modificar el archivo fuente (ya que puede comprimir un archivo con por ejemplo, .gz y luego descomprimirlo para obtener el archivo original) .
    * La capacidad de cambiar en cualquier momento si un archivo dado es comprimido y cómo se comprimió (diferentes algoritmos y configuraciones) le da más control sobre el rendimiento del sistema. Y puede recuperar fácilmente el archivo original sin complicaciones en cualquier momento.
    
Aunque ningún enfoque es un ganador en todas las situaciones, está claro que ERDDAP 's capacidad de servir datos de archivos comprimidos externamente hace que la compresión externa sea una alternativa razonable a la compresión interna ofrecida por .nc 4 y 4 .hdf 5. Eso es significativo dado que la compresión interna es una de las principales razones por las que la gente decide utilizar .nc 4 y 4 .hdf 5.
     
##### Caché descomprimido{#decompressed-cache} 
 ERDDAP™ hace una versión descomprimida de cualquier binario comprimido (por ejemplo, .nc ) archivo de datos cuando necesita leer el archivo. Los archivos descomprimidos se guardan en el directorio del dataset *bigParentDirectory* /decomprimido/ . Los archivos descomprimidos que no se han utilizado recientemente serán eliminados para liberar espacio cuando el tamaño de archivo acumulativo es √10GB. Puedes cambiarlo estableciendo&lt;descomprimidoCacheMaxGB (default=10) en conjuntos de datos Xml.xml, por ejemplo,
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
Además, los archivos descomprimidos que no se hayan utilizado en los últimos 15 minutos serán eliminados al comienzo de cada recarga de conjunto de datos principal. Puedes cambiarlo estableciendo&lt;descomprimidoCacheMaxMinutesOld (default=15) en conjuntos de datos Xml.xml, por ejemplo,
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
Los números más grandes son agradables, pero el tamaño acumulativo de los archivos descomprimidos puede causar *bigParentDirectory* para escapar del espacio de disco, que causa problemas graves.
     
* Porque descomprimir un archivo puede tomar una cantidad significativa de tiempo (0.1 a 10 segundos) , los conjuntos de datos con archivos comprimidos pueden beneficiarse de establecer el conjunto de datos [&lt;nThreads confía] (#Nthreads) ajuste a un número mayor (¿2? ¿3? ¿4?) . Los inconvenientes a números aún mayores (¿Por ejemplo, 5? ¿6? ¿7?) están disminuyendo las rentabilidades y que la solicitud de un usuario puede entonces utilizar un alto porcentaje de los recursos del sistema, lo que reduce significativamente el procesamiento de las solicitudes de otros usuarios. Por lo tanto, no hay un ajuste ideal de nThreads, sólo diferentes consecuencias en diferentes situaciones con diferentes configuraciones.
         
#### Valores de dimensión clasificados{#sorted-dimension-values} 
Los valores de cada dimensión DEBE estar en orden (ascendente o descendente, excepto para el primero (izquierda-más) dimensión que debe ser ascendente) . Los valores pueden ser espaciados irregularmente. No puede haber ningún vínculo. Este es un requisito del [CF metadatos standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Si los valores de cualquier dimensión no están en orden ordenado, el conjunto de datos no se cargará y ERDDAP™ identificará el primer valor sin surtido en el archivo de registro, *bigParentDirectory* /logs/log.txt .
    
Los valores de dimensión no variados casi siempre indican un problema con el conjunto de datos fuente. Esto ocurre más comúnmente cuando un archivo mal llamado o inapropiado se incluye en la agregación, que conduce a una dimensión de tiempo sin surtir. Para resolver este problema, vea el mensaje de error en el ERDDAP™ log.txt archivo para encontrar el valor de tiempo ofensivo. A continuación, busque en los archivos fuente para encontrar el archivo correspondiente (o uno antes o uno después) eso no pertenece a la agregación.
    
#### Directores{#directories} 
Los archivos MAY se encuentran en un directorio, o en un directorio y sus subdirectorios (recursivamente) . Si hay un gran número de archivos (por ejemplo,) , el sistema operativo (y así EDDGrid DeFiles) funcionará mucho más eficientemente si almacena los archivos en una serie de subdirectorios (uno por año, o uno por mes para conjuntos de datos con archivos muy frecuentes) , por lo que nunca hay un gran número de archivos en un directorio dado.
     
#### &lt;cacheDesde el usuario{#cachefromurl} 
Todos EDDGrid DeFiles y todos los datasets EDDTableDeFiles soporta un conjunto de etiquetas que dicen ERDDAP™ para descargar y mantener una copia de todos los archivos de un conjunto de datos remoto, o un caché de unos pocos archivos (descargado según sea necesario) . Esto puede ser muy útil. Ver el [cache Documentación de Url](#cachefromurl) .
    
#### Remote Directories and HTTP Range Solicita{#remote-directories-and-http-range-requests} 
 (AKA Byte Serving, Byte Range Solicitudes, Aceptar-Ranges http header)   
 EDDGrid FromNcFiles, EDDTableDesdeMultidimNcFiles, EDDTableDesdeNcFiles y EDDTableDesdeNcCFFiles, puede *a veces* servir datos de .nc archivos en servidores remotos y acceso a través de HTTP si el servidor admite [Byte Serving](https://en.wikipedia.org/wiki/Byte_serving) mediante solicitudes de rango HTTP (el mecanismo HTTP para servir byte) . Esto es posible porque netcdf-java (que ERDDAP™ usos para leer .nc archivos) admite la lectura de datos remotos .nc archivos a través de solicitudes de rango HTTP.

 **¡No hagas esto&#33;** Es terriblemente ineficiente y lento.
En su lugar, use el [&lt;cacheDesde el sistema de usuario] (#cachefromurl) .

Acceso ERDDAP™ conjuntos de datos como archivos mediante solicitudes de rango byte --
Flipping this around, given that you can (en teoría) pensar en un conjunto de datos ERDDAP™ como un gigante .nc archivo por pendiente " .nc "a la base OPen DAP URL para un conjunto de datos dado (por ejemplo,https://myserver.org/erddap/griddap/datasetID.ncy también añadiendo una ?query después de eso para especificar un subset) , es quizás razonable preguntar si puede utilizar netcdf-java, Ferret , o algún otro NetCDF software cliente para leer datos a través de HTTP Range Solicitudes desde ERDDAP . La respuesta es no, porque no hay realmente un enorme " .nc "archivo. Si quieres hacer esto, haz una de estas opciones:

* Uso(OPeN)DAPsoftware cliente para conectarse a los servicios de griddap ofrecidos por ERDDAP . Eso es lo que DAP   (y así ERDDAP ) fue diseñado para. Es muy eficiente.
* O, descargar el archivo fuente (s) de la "files" sistema (o un archivo de subconjunto a través de .nc ? query) a su computadora y utilizar netcdf-java, Ferret , o algún otro NetCDF software cliente para leer (Ahora) archivo local (s) .
         
#### Información de archivos en espera{#cached-file-information} 
Cuando una EDDGrid DesdeFiles dataset se carga por primera vez, EDDGrid FromFiles lee información de todos los archivos pertinentes y crea tablas (una fila para cada archivo) con información sobre cada archivo válido y cada "bad" (diferentes o nulos) archivo.
* Las tablas también se almacenan en el disco, como NetCDF v3 .nc archivos en *bigParentDirectory* /dataset/ *last2CharsOfDatasetID* / * datasetID * / en los archivos nombrados:
dirTable .nc   (que contiene una lista de nombres de directorio únicos) ,
archivo Cuadro .nc   (que sostiene la tabla con la información de cada archivo válido) ,
BadFiles .nc   (que sostiene la tabla con la información de cada archivo malo) .
* Para acelerar el acceso a un EDDGrid DeFiles dataset (pero a expensas de utilizar más memoria) Puedes usar [&lt;archivoTablaInMemory&lt;/fileTableInMemory confianza] (#filetableinmemory) para decir ERDDAP™ para mantener una copia de las tablas de información del archivo en memoria.
* La copia de las tablas de información de archivos en disco también es útil cuando ERDDAP™ es cerrado y reiniciado: ahorra EDDGrid DesdeFiles de tener que volver a leer todos los archivos de datos.
* Cuando se recarga un conjunto de datos, ERDDAP™ sólo necesita leer los datos en nuevos archivos y archivos que han cambiado.
* Si un archivo tiene una estructura diferente de los otros archivos (por ejemplo, un tipo de datos diferente para una de las variables, o un valor diferente para el " [unidades](#units) "atributo") , ERDDAP añade el archivo a la lista de archivos "malos". La información sobre el problema con el archivo será escrita al *bigParentDirectory* /logs/log.txt file.
* Usted nunca debe tener que borrar o trabajar con estos archivos. Una excepción es: si todavía está haciendo cambios en el conjunto de datos datasets.xml configuración, es posible que desee eliminar estos archivos para forzar ERDDAP™ para releer todos los archivos ya que los archivos serán leídos/interpretados de manera diferente. Si alguna vez necesita borrar estos archivos, puede hacerlo cuando ERDDAP™ está corriendo. (Entonces pon un arma. [bandera](/docs/server-admin/additional-information#set-dataset-flag) para recargar el conjunto de datos lo antes posible.) Sin embargo, ERDDAP™ generalmente nota que el datasets.xml la información no coincide con el archivo Tabla información y elimina automáticamente las tablas de archivos.
* Si quieres animar ERDDAP™ para actualizar la información del conjunto de datos almacenado (por ejemplo, si acaba de agregar, eliminar o cambiar algunos archivos al directorio de datos del conjunto de datos) , utilizar el [Sistema de bandera](/docs/server-admin/additional-information#flag) fuerza ERDDAP™ para actualizar la información del archivo cached.
         
#### Solicitudes de manejo{#handling-requests} 
Cuando se procesa la solicitud de datos de un cliente, EDDGrid FromFiles puede buscar rápidamente en la tabla con la información de archivo válida para ver qué archivos tienen los datos solicitados.
     
#### Actualización de la información de archivo en caché{#updating-the-cached-file-information} 
Cada vez que se recarga el conjunto de datos, se actualiza la información del archivo caché.
    
* El conjunto de datos se vuelve a cargar periódicamente según lo determinado por el&lt;reloadEveryNMinutes confiar en la información del conjunto de datos datasets.xml .
* El conjunto de datos se recarga lo antes posible cuando sea posible ERDDAP™ detecta que has añadido, eliminado, [touch'd](https://en.wikipedia.org/wiki/Touch_(Unix) ) (para cambiar el último archivo Tiempo modificado) , o cambió un archivo de datos.
* El conjunto de datos se recargará lo antes posible si utiliza el [Sistema de bandera](/docs/server-admin/additional-information#flag) .

Cuando se recarga el conjunto de datos, ERDDAP™ compara los archivos disponibles actualmente a las tablas de información de archivos caché. Los nuevos archivos se leen y se añaden a la tabla de archivos válida. Los archivos que ya no existen se eliminan de la tabla de archivos válida. Los archivos donde ha cambiado el tiempo de archivo son leídos y su información está actualizada. Las nuevas tablas reemplazan las viejas tablas en memoria y en disco.
     
#### Archivos malos{#bad-files} 
La tabla de archivos malos y las razones por las que los archivos fueron declarados mal (archivo dañado, variables desaparecidas, etc.) es enviado por correo electrónico al correo electrónico Todo Para correo electrónico (Probablemente tú) cada vez que se recarga el conjunto de datos. Usted debe reemplazar o reparar estos archivos lo antes posible.
     
#### Variables desaparecidas{#missing-variables} 
Si algunos de los archivos no tienen algunos dataVariable s definido en el conjunto de datos datasets.xml Chuck, está bien. Cuando EDDGrid DesdeFiles lee uno de esos archivos, actuará como si el archivo tuviera la variable, pero con todos los valores perdidos.
     
#### Problemas FTP/Advice{#ftp-troubleadvice} 
Si usted FTP nuevos archivos de datos a ERDDAP™ servidor ERDDAP™ está corriendo, hay la posibilidad de que ERDDAP™ se recargará el conjunto de datos durante el proceso FTP. ¡Pasa más a menudo de lo que podrías pensar&#33; Si sucede, el archivo parece ser válido (tiene un nombre válido) , pero el archivo aún no es válido. Si ERDDAP™ Intenta leer datos de ese archivo inválido, el error resultante hará que el archivo se añada a la tabla de archivos inválidos. Esto no es bueno. Para evitar este problema, utilice un nombre de archivo temporal cuando FTP'ing el archivo, por ejemplo, ABC2005 .nc \\_TEMP . Luego, la prueba de archivoNameRegex (véase infra) indicará que este no es un archivo relevante. Después de que el proceso FTP esté completo, vuelva a llamar el archivo al nombre correcto. El proceso de renombramiento hará que el archivo sea relevante en un instante.
     
#### "0 archivos" Mensaje de error{#0-files-error-message-1} 
Si corres [GenerarDatasetsXml](#generatedatasetsxml) o [DasDds](#dasdds) , o si intenta cargar una EDDGrid Desde... ERDDAP™ , y recibe un mensaje de error de "0 archivos" indicando que ERDDAP™ encontrados 0 archivos coincidentes en el directorio (cuando usted piensa que hay archivos coincidentes en ese directorio) :
    * Compruebe que los archivos realmente están en ese directorio.
    * Compruebe la ortografía del nombre del directorio.
    * Revisa el archivoNameRegex. Es realmente, muy fácil cometer errores con regexes. Para fines de prueba, prueba el regex .\\* que debe coincidir con todos los nombres de archivo. (Mira esto. [documentación de regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) y [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
    * Compruebe que el usuario que está ejecutando el programa (por ejemplo, user=tomcat (?) para Tomcat/ ERDDAP ) tiene permiso 'leer' para esos archivos.
    * En algunos sistemas operativos (por ejemplo, SELinux) y dependiendo de la configuración del sistema, el usuario que ejecutó el programa debe tener permiso 'leer' para toda la cadena de directorios que conducen al directorio que tiene los archivos.
         
####  EDDGrid DeFiles esqueleto XML{#eddgridfromfiles-skeleton-xml} 
*    **El esqueleto XML** para todos EDDGrid DeFiles subclases es:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD*DeAudioFiles{#eddfromaudiofiles} 
 ** EDDGrid DeAudioFiles** y **EDDTableDesdeAudioFiles** datos agregados de una colección de archivos de audio locales. (Estos primeros aparecieron ERDDAP™ v1.82.) La diferencia es que EDDGrid FromAudioFiles trata los datos como conjunto de datos multidimensional (generalmente con 2 dimensiones: \\[ inicio de archivo Hora \\] y \\[ superada Tiempo dentro de un archivo \\] ) , mientras que EDDTableDesdeAudioFiles trata los datos como datos tabulares (generalmente con columnas para el archivo startTime, el elapsedTime con el archivo, y los datos de los canales de audio) . EDDGrid FromAudioFiles requiere que todos los archivos tengan el mismo número de muestras, por lo que si eso no es cierto, debe utilizar EDDTableDesdeAudioFiles. De lo contrario, la elección del tipo de EDD es totalmente su elección. Una ventaja de EDDTableDesdeAudioFiles: puede agregar otras variables con otra información, por ejemplo, stationID , tipo de estación. En ambos casos, la falta de una variable de tiempo unificada hace más difícil trabajar con los datos de estos tipos de EDD, pero no había una buena manera de configurar una variable de tiempo unificada.

Mira las superclases de esta clase, [ EDDGrid DeFiles](#eddgridfromfiles) y [EDDTableDeFiles](#eddtablefromfiles) , para información general sobre cómo funciona esta clase y cómo utilizarla.

Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Como los archivos de audio no tienen metadatos aparte de la información relacionada con la codificación de los datos de sonido, tendrá que editar la salida de GenerateDatasets Xml para proporcionar información esencial (por ejemplo, título, resumen, creator\\_name , institución, historia) .

Detalles:

* Hay un gran número de formatos de archivo de audio. Actualmente, ERDDAP™ puede leer datos de la mayoría de archivos .wav y .au. Actualmente no puede leer otros tipos de archivos de audio, por ejemplo, .aiff o .mp3. Si necesita soporte para otros formatos de archivo de audio u otras variantes de .wav y .au, por favor envíe un correo electrónico a su solicitud a Chris. John en Noaa.gov. O, como una solución que puede utilizar ahora mismo, puede convertir sus archivos de audio en PCM\\_ SIGNED (para datos enteros) o PCM\\_FLOAT (para datos de puntos flotantes) .wav archivos para que ERDDAP™ puede trabajar con ellos.
* Actualmente, ERDDAP™ puede leer archivos de audio con lo que Java 's AudioFormat class calls PCM\\_FLOAT, PCM\\_SIGNED, PCM\\_UNSIGNED, ALAW y ULAW encodings. ERDDAP™ convierte valores PCM\\_UNSIGNED (por ejemplo, 0 a 255) en valores firmados (por ejemplo, -128 a 128) reorganizando los bits en los valores de datos. ERDDAP™ convierte ALAW y ULAW codificados desde su formato byte codificado nativo en corto (int16) valores. Desde Java quiere bigEndian=true data, ERDDAP™ reorganiza los bytes de datos almacenados con bigEndian=false (pequeño endian) para leer correctamente los valores. Para todas las demás codificaciones (PCM) , ERDDAP™ lee los datos como es.
* Cuando ERDDAP™ lee datos de archivos de audio, convierte los metadatos de audio disponibles del archivo en atributos globales. Esto siempre incluirá (con valores de muestra mostrados) 
    
Cantar audioBigEndian "false"; //true o false
audio int Canales 1;
Grabación de audioIncoding "PCM\\_SIGNED";
audioFrameRate 96000.0; //por segundo
int audioFrameSize 2; //# de bytes de datos por marco
audio flotanteSampleRate 96000.0; //por segundo
int audioSampleSizeInBits 16; //# de bits por canal por muestra
    
Para ERDDAP 's propósitos, un marco es sinónimo de una muestra, que es los datos para un punto en el tiempo.
Los atributos en ERDDAP™ tendrá la información que describe los datos como estaba en los archivos fuente. ERDDAP™ a menudo han cambiado esto mientras que la lectura de los datos, por ejemplo, PCM\\_UNSIGNED, ALAW y ULAW se convierten los datos codificados a PCM\\_SIGNED, y bigEndian=false data se convierte en bigEndian=true data (que es cómo Java quiere leerlo) . Al final, los valores de los datos ERDDAP™ siempre será el [PCM-encoded](https://en.wikipedia.org/wiki/Pulse-code_modulation) Valores de datos (es decir, simples muestras digitalizadas de la onda de sonido) .
* Cuando ERDDAP™ lee datos de archivos de audio, lee todo el archivo. ERDDAP™ puede leer hasta alrededor de 2 mil millones de muestras por canal. Por ejemplo, si la tasa de muestra es de 44.100 muestras por segundo, 2 mil millones de muestras se traducen a unos 756 minutos de datos de sonido por archivo. Si tiene archivos de audio con más de esta cantidad de datos, necesita romper los archivos en pedazos más pequeños para que ERDDAP™ puede leerlos.
* Porque... ERDDAP™ lee archivos de audio completos, ERDDAP™ debe tener acceso a una gran cantidad de memoria para trabajar con grandes archivos de audio. See [ ERDDAP 's configuración de memoria](/docs/server-admin/deploy-install#memory) . De nuevo, si esto es un problema, una solución que se puede utilizar ahora mismo es romper los archivos en pedazos más pequeños para que ERDDAP™ puede leerlos con menos memoria.
* Algunos archivos de audio fueron escritos incorrectamente. ERDDAP™ hace un pequeño esfuerzo para tratar estos casos. Pero en general, cuando hay un error, ERDDAP™ lanzará una Excepción (y rechazar ese archivo) o (si el error es indetectable) leer los datos (pero los datos serán incorrectos) .
*    ERDDAP™ no revisa ni altera el volumen del sonido. Idealmente, los datos de audio enteros se escalan para utilizar toda la gama del tipo de datos.
* Los archivos de audio y los reproductores de audio no tienen sistema para los valores perdidos (-999 o Float.NaN) . Así que los datos de audio no deberían tener ningún valor perdido. Si faltan valores (por ejemplo, si necesita alargar un archivo de audio) , use una serie de 0's que se interpretará como silencio perfecto.
* Cuando ERDDAP™ lee los datos de archivos de audio, siempre crea una columna llamada Tiempo con el tiempo para cada muestra, en segundos (almacenados como dobles) , relativa a la primera muestra (que se asigna Tiempo=0,0 s) . Con EDDGrid DesdeAudioFiles, esto se convierte en la variable eje del Tiempo transcurrido.
*    EDDGrid FromAudioFiles requiere que todos los archivos tengan el mismo número de muestras. Así que si eso no es cierto, debe utilizar EDDTableDesdeAudioFiles.
* Para EDDGrid DesdeAudioFiles, te recomendamos que establezcas [&lt;dimensionValoresInMemory confianza] (#dimensionvaluesinmemory) a falso (como es recomendado por GenerateDatasets Xml) , porque la dimensión del tiempo a menudo tiene un gran número de valores.
* Para EDDGrid DesdeAudioFiles, casi siempre debe utilizar el EDDGrid Sistema FromFiles para [Aggregation via Nombres del archivo](#aggregation-via-file-names-or-global-metadata) , casi siempre extrayendo la fecha de inicio de la grabación Hora de los nombres de archivo. Por ejemplo,
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
GenerarDatasets Xml animará esto y te ayudará con esto.
* Para EDDTableDesdeAudioFiles, casi siempre debe utilizar el sistema EDDTableDeFiles para [\\*\\*\\*fileName pseudo sourceName s](#filename-sourcenames) para extraer información del nombre del archivo (casi siempre la fecha de inicio Tiempo para la grabación) y promover que sea una columna de datos. Por ejemplo,
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
El formato de tiempo debe ser especificado como el atributo de las unidades:&lt;att name= "units"&lt;/att confianza
     
###  EDDGrid FromMergeIRFiles{#eddgridfrommergeirfiles} 
 [ ** EDDGrid FromMergeIRFiles** ](#eddgridfrommergeirfiles) datos agregados de datos locales, [MergeIR](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) archivos, que son de los [Tropical Rainfall Measuring Mission (TRMM) ](https://trmm.gsfc.nasa.gov) , que es una misión conjunta entre la NASA y el Organismo de Exploración Aeroespacial del Japón (JAXA) . Merge Los archivos IR se pueden descargar desde [NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/) .

 EDDGrid FromMergeIRFiles.java was written and contributed to the ERDDAP™ proyecto de Jonathan Lafite y Philippe Makowski de R.Tech Engineering (licencia: copyrighted open source) .

 EDDGrid DesdeMergeIRFiles es un poco inusual:

*    EDDGrid FromMergeIRFiles admite archivos de datos de código comprimido o no comprimido, en cualquier combinación, en el mismo conjunto de datos. Esto le permite, por ejemplo, comprimir archivos antiguos a los que rara vez se accede, pero descomprimir nuevos archivos que a menudo se acceden. O puede cambiar el tipo de compresión del original. Z, por ejemplo, .gz .
* Si tiene versiones comprimidas y sin comprimir de los mismos archivos de datos en el mismo directorio, asegúrese de que&lt;fileNameRegex confía para tu conjunto de datos coincide con los nombres de archivo que quieres que coincida y no coincide con los nombres de archivo que no quieres que coincida.
* Los archivos de datos de origen no comprimido deben tener ninguna extensión de archivo (i.e., no "." en el nombre de archivo) .
* Los archivos de datos de código comprimido deben tener una extensión de archivo, pero ERDDAP™ determina el tipo de compresión al inspeccionar el contenido del archivo, no mirando la extensión de archivo (por ejemplo, ".Z") . Los tipos de compresión soportados incluyen "gz", "bzip2", "xz", "lzma", "snappy-raw", "snappy-framed", "pack200", y "z". Cuando ERDDAP™ lee archivos comprimidos, se descomprime en la marcha, sin escribir a un archivo temporal.
* Todos los archivos de datos de origen deben utilizar el sistema original de nombres de archivos: es decir, merg\\_ *YYYYYMMDDHH* \\_4km-pixel (Donde *YYYYYMMDDHH* indica el tiempo asociado con los datos en el archivo) , más una extensión de archivo si el archivo está comprimido.

Mira la superclase de esta clase, [ EDDGrid DeFiles](#eddgridfromfiles) , para información general sobre cómo funciona esta clase y cómo utilizarla.

Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puedes editarlo para ajustarlo.
 
###  EDDGrid FromNcFiles{#eddgridfromncfiles} 
 [ ** EDDGrid FromNcFiles** ](#eddgridfromncfiles) agrega datos de locales, redondeados, [GRIB .grb y .grb2](https://en.wikipedia.org/wiki/GRIB) archivos, [ HDF   (v4 o v5)   .hdf ](https://www.hdfgroup.org/) archivos, [ .nc ml](#ncml-files) archivos, [ NetCDF   (v3 o v4)   .nc ](https://www.unidata.ucar.edu/software/netcdf/) archivos, y [Zarr](https://github.com/zarr-developers/zarr-python) archivos (a la versión 2.25) . Los archivos Zarr tienen un comportamiento ligeramente diferente y requieren el archivoNameRegex o la rutaRegex para incluir "zarr".

Nuevo ERDDAP™ versión 2.29.0 es soporte experimental para variables de datos que no soportan todas las variables del eje (o como algunos lo han llamado datos 1D y 2D en el mismo conjunto de datos) . Por favor, diríjase a GitHub (debates o cuestiones) con comentarios y errores.

Esto puede funcionar con otros tipos de archivos (por ejemplo, BUFR) No lo hemos probado... por favor envíenos algunos archivos de muestra.

* Para archivos GRIB, ERDDAP™ hará un archivo de índice .gbx la primera vez que lee cada archivo GRIB. Así que los archivos GRIB deben estar en un directorio donde el "usuario" que corrió Tomcat tiene permiso de lectura y escritura.
* Mira la superclase de esta clase, [ EDDGrid DeFiles](#eddgridfromfiles) , para información sobre cómo funciona esta clase y cómo utilizarla.
* Empezando con ERDDAP™ v2.12, EDDGrid FromNcFiles y EDDGrid FromNcFiles Unpacked puede leer datos de "estructuras" en .nc 4 y 4 .hdf 4 archivos. Para identificar una variable que es de una estructura, la&lt; sourceName ■ debe utilizar el formato: *fullStructureName*  |  *memberName* , por ejemplo grupo1/myStruct | myMember.
* Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puedes editarlo para ajustarlo.
    
#### Grupos en Archivos Nc Gridded{#groups-in-gridded-nc-files} 
     [Los archivos Netcdf4 pueden contener grupos.](#groups-in-gridded-nc-files)   ERDDAP™ sólo hace un conjunto de datos de las variables en un grupo y todos sus grupos padres. Puede especificar un nombre específico de grupo en GenerateDatasets Xml (omitir el slash que sigue) , o utilizar "" para tener GenerarDatasets Búsqueda Xml todos los grupos para las variables que usan las más dimensiones, o usan " \\[ root \\] "para tener GenerateDatasets sólo busque variables en el grupo raíz.
    
Lo primero que GenerateDatasetsXml hace para este tipo de conjunto de datos después de responder las preguntas es imprimir la estructura similar al ncdump del archivo de muestra. Así que si entras unas cuantas respuestas rápidas para el primer bucle a través de GenerateDatasets Xml, al menos podrás ver si ERDDAP™ puede leer el archivo y ver qué dimensiones y variables están en el archivo. Entonces usted puede dar mejores respuestas para el segundo bucle a través de GenerateDatasetsXml.
    

###  EDDGrid FromNcFilesUnpacked{#eddgridfromncfilesunpacked} 
 [ ** EDDGrid FromNcFilesUnpacked** ](#eddgridfromncfilesunpacked) es una variante de [ EDDGrid FromNcFiles](#eddgridfromncfiles) que agrega datos de datos locales, redondeados NetCDF   (v3 o v4)   .nc y archivos relacionados. La diferencia es que esta clase desempaqueta cada archivo de datos antes EDDGrid DesdeFiles mira los archivos:

* Desempaqueta variables que están empaquetadas con [ scale\\_factor y/o add\\_offset ](#scale_factor) .
* Convierte \\_FillValue y missing\\_value valores para ser de NaN (o MAX\\_VALUE para tipos de datos enteros) .
* Convierte valores de tiempo y tiempos a "seconds since 1970-01-01T00:00:00Z" .

La gran ventaja de esta clase es que proporciona una manera de lidiar con diferentes valores de scale\\_factor , add\\_offset , \\_FillValue, missing\\_value , o unidades de tiempo en diferentes archivos fuente en una colección. De lo contrario, tendría que usar una herramienta como [NcML](#ncml-files) o [ NCO ](#netcdf-operators-nco) para modificar cada archivo para eliminar las diferencias para que los archivos puedan ser manejados EDDGrid De NcFiles. Para que esta clase funcione correctamente, los archivos deben seguir los estándares CF para los atributos relacionados.

* Si intenta hacer un EDDGrid FromNcFiles Desempaquetado de un grupo de archivos con los que usted había intentado anteriormente y no usó EDDGrid FromNcFiles, cd to
     *bigParentDirectory* /dataset/ *last2Letters* / * datasetID * /
Donde *last2Letters* es las últimas 2 letras de datasetID ,
y eliminar todos los archivos en ese directorio.
* Empezando con ERDDAP™ v2.12, EDDGrid FromNcFiles y EDDGrid FromNcFiles Unpacked puede leer datos de "estructuras" en .nc 4 y 4 .hdf 4 archivos. Para identificar una variable que es de una estructura, la&lt; sourceName ■ debe utilizar el formato: *fullStructureName*  |  *memberName* , por ejemplo grupo1/myStruct | myMember.
* Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puedes editarlo para ajustarlo.
    
Los archivos Netcdf4 pueden contener grupos. See [esta documentación](#groups-in-gridded-nc-files) .
    
Lo primero que GenerateDatasetsXml hace para este tipo de conjunto de datos después de responder las preguntas es imprimir la estructura similar al ncdump del archivo de muestra **antes** Está desempaquetado. Así que si entras unas cuantas respuestas rápidas para el primer bucle a través de GenerateDatasets Xml, al menos podrás ver si ERDDAP™ puede leer el archivo y ver qué dimensiones y variables están en el archivo. Entonces usted puede dar mejores respuestas para el segundo bucle a través de GenerateDatasetsXml.
    
###  EDDGrid LonPM180{#eddgridlonpm180} 
 [ ** EDDGrid LonPM180** ](#eddgridlonpm180) modifica los valores de longitud de un niño (anexo)   EDDGrid dataset que tiene algunos valores de longitud superior a 180 (por ejemplo, 0 a 360) para que estén en el rango -180 a 180 (Longitud Plus o menos 180, por lo tanto el nombre) .

* Esto proporciona una manera de hacer conjuntos de datos que tienen valores de longitud superiores a 180 en / con OGC servicios (por ejemplo WMS servidor en ERDDAP ) , desde todos OGC servicios requieren valores de longitud dentro de -180 a 180.
* Trabajar cerca de una discontinuidad causa problemas, independientemente de si la discontinuidad está en longitud 0 o en longitud 180. Este tipo de conjunto de datos le permite evitar esos problemas para todos, ofreciendo dos versiones del mismo conjunto de datos:
uno con valores de longitud en el rango 0 a 360 (¿"Pacífico"?) ,
uno con valores de longitud en el rango -180 a 180 (¿"Atlanticentric"?) .
* Para conjuntos de datos infantiles con todos los valores de longitud superiores a 180, todos los nuevos valores de longitud son simplemente 360 grados inferiores. Por ejemplo, un conjunto de datos con valores de longitud de 180 a 240 se convertiría en un conjunto de datos con valores de longitud de -180 a -120.
* Para conjuntos de datos infantiles que tienen valores de longitud para todo el globo (aproximadamente 0 a 360) , el nuevo valor de longitud se reorganizará para ser (aproximadamente) -180 a 180:
Los valores originales de 0 a casi 180 son invariables.
Los valores originales de 180 a 360 se convierten a -180 a 0 y se desplazan al comienzo de la matriz de longitud.
* Para conjuntos de datos infantiles que abarcan 180 pero no cubren el globo, ERDDAP™ inserta valores perdidos según sea necesario para hacer un conjunto de datos que cubre el mundo. Por ejemplo, un conjunto de datos infantil con valores de longitud de 140 a 200 se convertiría en un conjunto de datos con valores de longitud de -180 a 180.
Los valores infantiles de 180 a 200 se convertirían en -180 a -160.
Se insertarían nuevos valores de longitud de -160 a 140. Los valores correspondientes de datos serán \\_FillValues.
Los valores del niño de 140 a casi 180 serían invariables.
La inserción de valores perdidos puede parecer extraño, pero evita varios problemas que resultan de tener valores de longitud que saltan de repente (por ejemplo, de -160 a 140) .
* In [GenerarDatasetsXml](#generatedatasetsxml) , hay un especial "tipo de semana", EDDGrid LonPM180DeErddapCatalog, que le permite generar el datasets.xml para EDDGrid LonPM180 conjuntos de datos de cada uno de los EDDGrid datasets in an ERDDAP que tienen valores de longitud superiores a 180. Esto facilita ofrecer dos versiones de estos conjuntos de datos:
el original, con valores de longitud en el rango 0 a 360,
y el nuevo conjunto de datos, con valores de longitud en el rango -180 a 180.
    
El conjunto de datos del niño dentro de cada EDDGrid LonPM180 dataset será un EDDGrid FromErddap dataset que apunta al conjunto de datos original.
El nuevo conjunto de datos datasetID será el nombre del conjunto de datos original más "\\_LonPM180".
Por ejemplo,
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Ponga el EDDGrid Dataset LonPM180 **infra** el conjunto de datos original en datasets.xml . Eso evita algunos problemas posibles.
    
Alternativamente, puede reemplazar el EDDGrid DeErddap conjunto de datos infantil con el conjunto de datos original datasets.xml . Entonces, sólo habrá una versión del conjunto de datos: la que tiene valores de longitud dentro de -180 a 180. Desalentamos esto porque hay momentos en que cada versión del conjunto de datos es más conveniente.
    
* Si ofrece dos versiones de un conjunto de datos, por ejemplo, uno con longitud 0 a 360 y uno con longitud -180 a 180:
    * Puede utilizar el opcional [&lt;accesible Via WMS ■false&lt;/accesible Via WMS &gt; (#accessibleviawms) con el conjunto de datos 0-360 para deshabilitar por la fuerza WMS servicio para ese conjunto de datos. Entonces, sólo la versión LonPM180 del conjunto de datos será accesible a través de WMS .
    * Hay un par de maneras de mantener el conjunto de datos LonPM180 actualizado con cambios en el conjunto de datos subyacente:
        * Si el conjunto de datos del niño es un EDDGrid DeErddap dataset que hace referencia a un conjunto de datos en el mismo ERDDAP™ , el conjunto de datos LonPM180 tratará de suscribirse directamente al conjunto de datos subyacente para que siempre esté actualizado. Las suscripciones directas no generan emails pidiéndole validar la suscripción - la validación debe hacerse automáticamente.
        * Si el conjunto de datos del niño no es un EDDGrid DeErddap dataset que está en el mismo ERDDAP™ , el conjunto de datos LonPM180 intentará utilizar el sistema de suscripción regular para suscribirse al conjunto de datos subyacente. Si tiene el sistema de suscripción en su ERDDAP™ encendido, usted debe conseguir emails pidiéndole que valide la suscripción. Por favor, hazlo.
        * Si tiene el sistema de suscripción en su ERDDAP™ apagado, el conjunto de datos LonPM180 puede tener metadatos obsoletos hasta que se vuelva a cargar el conjunto de datos LonPM180. Así que si el sistema de suscripción está apagado, debe establecer el [&lt;reload EveryNMinutes confía] (#reloadeverynminutes) establecer el conjunto de datos LonPM180 a un número menor, de modo que sea más probable que se produzcan cambios en el conjunto de datos infantil antes.

* Para los conjuntos de datos con longitud máxima &gt; 360, utilice la siguiente configuración opcional para establecer el valor máximo y el conjunto de datos se corregirá a -180 a 180.
```
    <maxSourceLon>540</maxSourceLon>
```

####  EDDGrid Esqueleto LonPM180 XML{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid Lon0360{#eddgridlon0360} 
 [ ** EDDGrid Lon0360** ](#eddgridlon0360) modifica los valores de longitud de un niño (anexo)   EDDGrid dataset que tiene algunos valores de longitud inferior a 0 (por ejemplo, -180 a 180) para que estén en el rango 0 a 360 (por lo tanto el nombre) .

* Trabajar cerca de una discontinuidad causa problemas, independientemente de si la discontinuidad está en longitud 0 o en longitud 180. Este tipo de conjunto de datos le permite evitar esos problemas para todos, ofreciendo dos versiones del mismo conjunto de datos:
uno con valores de longitud en el rango -180 a 180 (¿"Atlanticentric"?) .
uno con valores de longitud en el rango 0 a 360 (¿"Pacífico"?) ,
* Para conjuntos de datos infantiles con todos los valores de longitud inferiores a 0, todos los nuevos valores de longitud son simplemente 360 grados más altos. Por ejemplo, un conjunto de datos con valores de longitud de -180 a -120 se convertiría en un conjunto de datos con valores de longitud de 180 a 240.
* Para conjuntos de datos infantiles que tienen valores de longitud para todo el globo (aproximadamente -180 a 180) , el nuevo valor de longitud se reorganizará para ser (aproximadamente) 0 a 360:
Los valores originales -180 a 0 se convierten a 180 a 360 y se desplazan al final de la matriz de longitud.
Los valores originales de 0 a casi 180 son invariables.
* Para conjuntos de datos infantiles que abarcan lon=0 pero no cubren el globo, ERDDAP™ inserta valores perdidos según sea necesario para hacer un conjunto de datos que cubre el mundo. Por ejemplo, un conjunto de datos infantil con valores de longitud de -40 a 20 se convertiría en un conjunto de datos con valores de longitud de 0 a 360.
Los valores infantiles de 0 a 20 serían invariables.
Se introducirían nuevos valores de longitud de 20 a 320. Los valores correspondientes de datos serán \\_FillValues.
Los valores infantiles de -40 a 0 se convertirían en 320 a 360.
La inserción de valores perdidos puede parecer extraño, pero evita varios problemas que resultan de tener valores de longitud que saltan de repente (por ejemplo, de 20 a 320) .
* In [GenerarDatasetsXml](#generatedatasetsxml) , hay un especial "tipo de semana", EDDGrid Lon0360Desde ErddapCatalog, que te permite generar el datasets.xml para EDDGrid Lon0360 datasets de cada uno de los EDDGrid datasets in an ERDDAP que tienen valores de longitud superiores a 180. Esto facilita ofrecer dos versiones de estos conjuntos de datos:
el original, con valores de longitud en el rango 0 a 360,
y el nuevo conjunto de datos, con valores de longitud en el rango -180 a 180.
    
El conjunto de datos del niño dentro de cada EDDGrid Lon0360 dataset será un EDDGrid FromErddap dataset que apunta al conjunto de datos original.
El nuevo conjunto de datos datasetID será el nombre del conjunto de datos original más "\\_Lon0360".
Por ejemplo,
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Ponga el EDDGrid Conjunto de datos Lon0360 **infra** el conjunto de datos original en datasets.xml . Eso evita algunos problemas posibles.
    
Alternativamente, puede reemplazar el EDDGrid DeErddap conjunto de datos infantil con el conjunto de datos original datasets.xml . Entonces, sólo habrá una versión del conjunto de datos: la que tiene valores de longitud dentro de 0 a 360. Desalentamos esto porque hay momentos en que cada versión del conjunto de datos es más conveniente.
    
* Si ofrece dos versiones de un conjunto de datos, por ejemplo, uno con longitud 0 a 360 y uno con longitud -180 a 180:
    * Puede utilizar el opcional [&lt;accesible Via WMS ■false&lt;/accesible Via WMS &gt; (#accessibleviawms) con el conjunto de datos 0 a 360 para deshabilitar por la fuerza WMS servicio para ese conjunto de datos. Entonces, sólo la versión -180 a 180 del conjunto de datos será accesible a través de WMS .
    * Hay un par de maneras de mantener el conjunto de datos Lon0360 actualizado con cambios en el conjunto de datos subyacente:
        * Si el conjunto de datos del niño es un EDDGrid DeErddap dataset que hace referencia a un conjunto de datos en el mismo ERDDAP™ , el conjunto de datos Lon0360 intentará suscribirse directamente al conjunto de datos subyacente para que siempre esté actualizado. Las suscripciones directas no generan emails pidiéndole validar la suscripción - la validación debe hacerse automáticamente.
        * Si el conjunto de datos del niño no es un EDDGrid DeErddap dataset que está en el mismo ERDDAP™ , el conjunto de datos Lon0360 intentará utilizar el sistema de suscripción regular para suscribirse al conjunto de datos subyacente. Si tiene el sistema de suscripción en su ERDDAP™ encendido, usted debe conseguir emails pidiéndole que valide la suscripción. Por favor, hazlo.
        * Si tiene el sistema de suscripción en su ERDDAP™ apagado, el conjunto de datos Lon0360 puede tener metadatos obsoletos hasta que se vuelva a cargar el conjunto de datos Lon0360. Así que si el sistema de suscripción está apagado, debe establecer el [&lt;reload EveryNMinutes confía] (#reloadeverynminutes) establecer el conjunto de datos Lon0360 a un número menor, de modo que sea más probable que se produzcan cambios en el conjunto de datos infantil antes.
####  EDDGrid Esqueleto Lon0360 XML{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid SideBySide{#eddgridsidebyside} 
 [ ** EDDGrid SideBySide** ](#eddgridsidebyside) agregados dos o más EDDGrid conjuntos de datos (los niños) lado a lado.

* El conjunto de datos resultante tiene todas las variables de todos los conjuntos de datos infantiles.
* El conjunto de datos de los padres y todos los conjuntos de datos de los niños DEBE tener diferentes datasetID s. Si algún nombre en una familia es exactamente el mismo, el conjunto de datos no se cargará (con el mensaje de error que los valores del eje agregado no están en orden) .
* Todos los niños DEBE tener los mismos valores de origen axisVariable s \\[ 1+ \\]   (por ejemplo, latitud, longitud) . La precisión de las pruebas se determina por [matchAxisNDigits](#matchaxisndigits) .
* Los niños pueden tener diferentes valores de origen axisVariable s \\[ 0 \\]   (por ejemplo, tiempo) , pero son generalmente lo mismo.
* El conjunto de datos padre parece tener todos los axisVariable s \\[ 0 \\] valores fuente de todos los niños.
* Por ejemplo, esto le permite combinar un conjunto de datos fuente con el u-componente de un vector y otro conjunto de datos fuente con el v-componente de un vector, por lo que los datos combinados pueden ser servidos.
* Los niños creados por este método se mantienen en privado. No son conjuntos de datos accesibles por separado (por ejemplo, por solicitudes de datos del cliente o por [archivos de bandera](/docs/server-admin/additional-information#flag) ) .
* Los metadatos y ajustes globales para el padre provienen de los metadatos y ajustes globales para el primer niño.
* Si hay una excepción al crear el primer hijo, el padre no será creado.
* Si hay una excepción al crear otros niños, esto envía un correo electrónico a email (según se especifica en [setup.xml](/docs/server-admin/deploy-install#setupxml) ) y continúa con los otros niños.
####  EDDGrid SideBySide esqueleto XML{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid AggregateExistingDimension{#eddgridaggregateexistingdimension} 
 [ ** EDDGrid AggregateExistingDimension** ](#eddgridaggregateexistingdimension) agregados dos o más EDDGrid datasets cada uno de los cuales tiene una gama diferente de valores para la primera dimensión, pero valores idénticos para las otras dimensiones.

* Por ejemplo, un conjunto de datos infantil podría tener 366 valores (para 2004) para la dimensión del tiempo y otro niño podría tener 365 valores (para 2005) para la dimensión del tiempo.
* Todos los valores para todas las otras dimensiones (por ejemplo, latitud, longitud) DEBE ser idéntico para todos los niños. La precisión de las pruebas se determina por [matchAxisNDigits](#matchaxisndigits) .
* Valores de dimensión clasificados - Los valores de cada dimensión DEBE estar en orden (ascendente o descendente) . Los valores pueden ser espaciados irregularmente. No puede haber vínculos. Este es un requisito del [CF metadatos standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Si los valores de cualquier dimensión no están en orden ordenado, el conjunto de datos no se cargará y ERDDAP™ identificará el primer valor sin surtido en el archivo de registro, *bigParentDirectory* /logs/log.txt .
    
Los valores de dimensión no variados casi siempre indican un problema con el conjunto de datos fuente. Esto ocurre más comúnmente cuando un archivo mal llamado o inapropiado se incluye en la agregación, que conduce a una dimensión de tiempo sin surtir. Para resolver este problema, vea el mensaje de error en el ERDDAP™ log.txt archivo para encontrar el valor de tiempo ofensivo. A continuación, busque en los archivos fuente para encontrar el archivo correspondiente (o uno antes o uno después) eso no pertenece a la agregación.
    
* El conjunto de datos de los padres y el conjunto de datos de los niños DEBE tener diferentes datasetID s. Si algún nombre en una familia es exactamente el mismo, el conjunto de datos no se cargará (con el mensaje de error que los valores del eje agregado no están en orden) .
* Actualmente, el conjunto de datos infantil DEBE ser un EDDGrid FromDap dataset y MUST tienen los valores más bajos de la dimensión agregada (generalmente los valores de tiempo más antiguos) . Todos los demás niños DEBE ser casi idénticos conjuntos de datos (diferenciando sólo en los valores de la primera dimensión) y son especificados por sourceUrl .
* El conjunto de datos agregado obtiene sus metadatos del primer niño.
* El [GenerarDatasets Programa Xml](#generatedatasetsxml) puede hacer un borrador duro del datasets.xml para una EDDGrid AggregateExistingDimension basado en un conjunto de archivos servidos por un Hyrax o servidor de THREDDS. Por ejemplo, utilice esta entrada para el programa (el "/1988" en la URL hace que el ejemplo funcione más rápido) :
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
Puedes usar el resultado&lt; sourceUrl etiquetas de usuario o eliminarlos y descomponer el&lt; sourceUrl √ tag (para que los nuevos archivos sean notados cada vez que se recarga el conjunto de datos.
####  EDDGrid AggregateExistingDimension skeleton XML{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid Copiado{#eddgridcopy} 
 [ ** EDDGrid Copiado** ](#eddgridcopy) hace y mantiene una copia local de otro EDDGrid 's datos y sirve datos de la copia local.

*    EDDGrid Copiado (y para datos tabulares, [EDDTableCopy](#eddtablecopy) ) es un uso muy fácil y muy eficaz
     **solución a algunos de los mayores problemas con el servicio de datos de una fuente de datos remota:** 
    * El acceso a los datos de una fuente remota de datos puede ser lento.
        * Puede ser lento porque es inherentemente lento (por ejemplo, un tipo ineficiente de servidor) ,
        * porque está abrumado por demasiadas peticiones,
        * o porque su servidor o el servidor remoto es limitado por ancho de banda.
    * El conjunto de datos remoto a veces no está disponible (de nuevo, por diversas razones) .
    * Confiar en una fuente para los datos no escala bien (por ejemplo, cuando muchos usuarios y muchos ERDDAP s utilizarlo) .
         
* Cómo funciona... EDDGrid Copia resuelve estos problemas haciendo y manteniendo automáticamente una copia local de los datos y sirviendo datos de la copia local. ERDDAP™ puede servir datos de la copia local muy, muy rápidamente. Y hacer una copia local alivia la carga en el servidor remoto. Y la copia local es una copia de seguridad del original, que es útil en caso de que algo le suceda al original.
    
No hay nada nuevo sobre hacer una copia local de un conjunto de datos. Lo nuevo aquí es que esta clase lo hace\\*fácil\\*crear y crear\\*mantener\\*una copia local de los datos de\\*variedad\\*de tipos de fuentes de datos remotas y\\*añadir metadatos\\*mientras copia los datos.
    
* Chunks of Data... EDDGrid Copia hace la copia local de los datos solicitando trozos de datos del control remoto&lt;dataset. Habrá un trozo para cada valor de la izquierda (primera) axis variable. EDDGrid Copiar no confía en los números índices del conjunto de datos remoto para el eje - que pueden cambiar.
    
ADVERTENCIA: Si el tamaño de un trozo de datos es tan grande (■ 2GB) que causa problemas, EDDGrid La copia no se puede usar. (Lo siento, esperamos tener una solución para este problema en el futuro.) 
    
*    \\[ Una alternativa a EDDGrid Copiado -
Si los datos remotos están disponibles a través de archivos descargables, no un servicio web, use [cache FromUrl opción para EDDGrid DeFiles](#cachefromurl) , que hace una copia local de los archivos remotos y sirve los datos de los archivos locales. \\] 
* Archivos locales - Cada trozo de datos se almacena en un NetCDF archivo en un subdirectorio de *bigParentDirectory* /copia/ * datasetID * / (según se especifica en [setup.xml](/docs/server-admin/deploy-install#setupxml) ) . Los nombres de archivo creados a partir de valores de eje se modifican para hacer que se llamen seguridad (por ejemplo, los hyphens son reemplazados por "x2D") - Esto no afecta los datos reales.
     
* Nuevos datos -- Cada vez EDDGrid Copia se recarga, se comprueba el control remoto&lt;dataset] para ver qué pedazos están disponibles. Si el archivo para un trozo de datos ya no existe, una solicitud para conseguir el trozo se añade a una cola. ERDDAP 's taskThread procesa todas las solicitudes solicitadas para fragmentos de datos, uno por uno. Usted puede ver estadísticas para la tareaLa actividad del pan en la [Página](/docs/server-admin/additional-information#status-page) y en el [Daily Report](/docs/server-admin/additional-information#daily-report) . (Sí, ERDDAP™ podría asignar múltiples tareas a este proceso, pero que utilizaría un montón de ancho de banda, memoria y tiempo de CPU de la fuente remota de datos, y muchos de los locales ERDDAP Es el tiempo de ancho de banda, memoria y CPU, ninguno de los cuales es una buena idea.) 
    
NOTA: La primera vez EDDGrid Copiado está cargado, (si todo va bien) Muchas solicitudes de fragmentos de datos se añadirán a la cola de tareaThread, pero no se crearán archivos de datos locales. Así que el constructor fallará pero taskThread seguirá trabajando y crear archivos locales. Si todo va bien, la tareaThread hará algunos archivos de datos locales y el próximo intento de volver a cargar el conjunto de datos (en ~15 minutos) tendrá éxito, pero inicialmente con una cantidad muy limitada de datos.
    
NOTA: Después del conjunto de datos local tiene algunos datos y aparece en su ERDDAP , si el conjunto de datos remoto es temporal o permanentemente no accesible, el conjunto de datos local seguirá funcionando.
    
ADVERTENCIA: Si el conjunto de datos remoto es grande y/o el servidor remoto es lento (Ese es el problema, ¿no?) , tardará mucho en hacer una copia local completa. En algunos casos, el tiempo necesario será inaceptable. Por ejemplo, transmitiendo 1 TB de datos sobre una línea T1 (0,15 GB/s) lleva al menos 60 días, en condiciones óptimas. Además, utiliza mucho ancho de banda, memoria y tiempo de CPU en las computadoras remotas y locales. La solución es enviar un disco duro al administrador del conjunto remoto de datos para que pueda hacer una copia del conjunto de datos y enviar el disco duro de vuelta a usted. Use esos datos como punto de partida y EDDGrid Copiar añadirá datos a ella. (Esa es una manera [Amazon EC2 Cloud Service](https://aws.amazon.com/importexport/) maneja el problema, aunque su sistema tenga un montón de ancho de banda.) 
    
ATENCIÓN: Si un valor dado para el más izquierdo (primera) axis variable desaparece del conjunto de datos remoto, EDDGrid Copia NO elimina el archivo copiado local. Si quieres, puedes eliminarlo tú mismo.
    
#### Recibir cheques de copiaFuente Datos{#grid-copy-checksourcedata} 
El datasets.xml para este conjunto de datos puede tener una etiqueta opcional
```
    <checkSourceData>true</checkSourceData>  
```
El valor predeterminado es cierto. Si/cuando lo estableces en falso, el conjunto de datos nunca comprobará el conjunto de datos fuente para ver si hay datos adicionales disponibles.

#### Sólo desde{#onlysince} 
Puedes decir EDDGrid Copia para hacer una copia de un subconjunto del conjunto de datos fuente, en lugar de todo el conjunto de datos fuente, añadiendo una etiqueta en el formulario&lt;sóloDesde *algunos Valor* &lt;/onlySince confiado a la dataset datasets.xml Idiota. EDDGrid Copia sólo descargará valores de datos relacionados con los valores de la primera dimensión (generalmente la dimensión del tiempo) que son mayores *algunos Valor* . *algunos Valor* puede ser:
    * Un tiempo relativo especificado por now-  *nUnits* .
Por ejemplo,&lt;sóloDesde now- 2 años&lt;/onlySince confiar le dice al conjunto de datos que sólo haga copias locales de los datos para datos donde los valores de la dimensión externa (generalmente valores de tiempo) están dentro de los últimos 2 años (que se reevalua cada vez que se recarga el conjunto de datos, que es cuando busca nuevos datos para copiar) . Ver el [ now-  *nUnits* sintaxis descripción](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) . Esto es útil si la primera dimensión tiene datos de tiempo, que generalmente lo hace.
        
         EDDGrid Copia no elimina archivos de datos locales que tienen datos que, con el tiempo, se hace más viejo que now-  *nUnits* . Puede borrar esos archivos en cualquier momento si lo desea. Si lo hace, recomendamos encarecidamente que establezca un [bandera](/docs/server-admin/additional-information#flag) después de eliminar los archivos para decir EDDGrid Copia para actualizar la lista de archivos caché.
        
    * Un punto fijo en el tiempo especificado como una cadena ISO 8601 yyyy-MM-ddTHH:mm:ssZ .
Por ejemplo,&lt;sóloDesde el año 2000-01T00:00Z&lt;/onlySince confiar le dice al conjunto de datos sólo para hacer copias locales de datos donde el valor de la primera dimensión es \\=2000-01T00:00Z. Esto es útil si la primera dimensión tiene datos de tiempo, que generalmente lo hace.
         
    * Un número de punto flotante.
Por ejemplo,&lt;sóloDesde el principio946684800.0&lt;- Solo desde cero. Las unidades serán las unidades de destino de la primera dimensión. Por ejemplo, para dimensiones temporales, las unidades en ERDDAP™ Siempre "seconds since 1970-01-01T00:00:00Z" . So 946684800.0 "seconds since 1970-01-01T00:00:00Z" es equivalente a 2000-01T00:00:00Z. Esta es siempre una opción útil, pero es especialmente útil cuando la primera dimensión no tiene datos de tiempo.

####  EDDGrid Copia Uso recomendado{#eddgridcopy-recomended-use} 
1. Crear el&lt;dataset entrada (el tipo nativo, no EDDGrid Copiado) para la fuente remota de datos.
     **Haz que funcione correctamente, incluyendo todos los metadatos deseados.** 
2. Si es demasiado lento, agregue código XML para envolverlo en un EDDGrid Copiar el conjunto de datos.
    * Use un diferente datasetID   (quizás cambiando el datasetID del viejo datasetID ligeramente) .
    * Copiar&lt;accesible Para confiar,&lt;reloadEveryNMinutes confianza y&lt;onChange Principe desde el remoto EDDGrid 's XML al EDDGrid Copia es XML. (Sus valores para EDDGrid Copiar materia; sus valores para el conjunto de datos interno se vuelven irrelevantes.) 
3.   ERDDAP™ hará y mantendrá una copia local de los datos.
         
* ATENCIÓN: EDDGrid Copia supone que los valores de datos para cada pedazo no cambian nunca. Si/cuando lo hacen, usted necesita eliminar manualmente los archivos de la ranura en *bigParentDirectory* /copia/ * datasetID * / que cambió y [bandera](/docs/server-admin/additional-information#flag) el conjunto de datos a ser recargado para que los trozos eliminados sean reemplazados. Si tiene una suscripción de correo electrónico al conjunto de datos, obtendrá dos emails: uno cuando el conjunto de datos se recarga y comienza a copiar los datos, y otro cuando el conjunto de datos se carga de nuevo (automáticamente) y detecta los nuevos archivos de datos locales.
     
* Todos los valores del eje deben ser iguales.
Para cada uno de los ejes excepto el más izquierdo (primera) , todos los valores deben ser iguales para todos los niños. La precisión de las pruebas se determina por [matchAxisNDigits](#matchaxisndigits) .
     
* Ajustes, metadatos, variables... EDDGrid Copiar utiliza la configuración, metadatos y variables del conjunto de datos de fuente adjunto.
     
* Cambio de metadatos -- Si necesitas cambiar algo addAttributes o cambiar el orden de las variables asociadas con el conjunto de datos fuente:
    1. Cambiar el addAttributes para el conjunto de datos fuente datasets.xml , según sea necesario.
    2. Eliminar uno de los archivos copiados.
    3. Establecer un [bandera](/docs/server-admin/additional-information#flag) para volver a cargar el conjunto de datos inmediatamente. Si utilizas una bandera y tienes una suscripción de correo electrónico al conjunto de datos, recibirás dos emails: uno cuando el conjunto de datos vuelva a cargar y comience a copiar los datos, y otro cuando el conjunto de datos se carga de nuevo. (automáticamente) y detecta los nuevos archivos de datos locales.
    4. El archivo eliminado se regenerará con los nuevos metadatos. Si el conjunto de datos fuente no está disponible, EDDGrid Copia conjunto de datos obtendrá metadatos del archivo regenerado, ya que es el archivo más joven.
####  EDDGrid Copia esqueleto XML{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableDesdeCassandra{#eddtablefromcassandra} 
 [ **EDDTableDesdeCassandra** ](#eddtablefromcassandra) maneja datos de uno [Cassandra](https://cassandra.apache.org/) mesa. Cassandra es una base de datos NoSQL.

*    ERDDAP™ puede trabajar con Cassandra v2 y v3 sin cambios ni diferencias en la configuración. Hemos probado con [Cassandra v2 y v3 de Apache](https://cassandra.apache.org/download/) . Es probable que ERDDAP™ también puede trabajar con Cassandra descargado de DataStax.
     
* Para agosto 2019 - mayo 2021, tuvimos problemas para conseguir que Cassandra trabajara con AdoptOpenJdk Java v8. Tiró una EXCEPCIÓN\\_ACCESS\\_VIOLATION). Pero ahora (Mayo 2021) , ese problema se ha ido: podemos utilizar con éxito Cassandra v2.1.22 y AdoptOpenJdk jdk8u292-b10.
     
#### Cuadro 1{#one-table} 
Cassandra no soporta "joins" en la forma en que las bases de datos relacionales lo hacen. Uno ERDDAP™ EDDTableDeCassandra dataset mapas a uno (tal vez un subconjunto de uno) Mesa Cassandra.

#### Cassandra datasets.xml  {#cassandra-datasetsxml} 
*    ERDDAP™ viene con el Cassandra Java conductor, así que no necesitas instalarlo por separado.
* Lea cuidadosamente toda la información de este documento sobre EDDTableDesdeCassandra. Algunos de los detalles son muy importantes.
* El Cassandra Java conductor está destinado a trabajar con Apache Cassandra (1.2+) y DataStax Enterprise (3.1+) . Si está usando Apache Cassandra 1.2.x, debe editar el archivo cassandra.yaml para cada nodo para iniciar\\_native\\_transport: verdadero, luego reiniciar cada nodo.
* Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Luego puede editar eso para ajustarlo (especialmente [&lt;partición KeySourceNames confiar] (#partitionkeysourcenames) ). Puede reunir la mayor parte de la información que necesita para crear el XML para un conjunto de datos EDDTableDesdeCassandra contactando con el administrador de Cassandra y buscando la web.
    
GenerarDatasets Xml tiene dos opciones especiales para EDDTableDesdeCassandra:
    
    1. Si entras "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (sin las citas) para el espacio clave, el programa mostrará una lista de espacios clave
    2. Si usted entra en un espacio clave específico y luego entra "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (sin las citas) para el nombre de tabla, el programa mostrará una lista de tablas en ese espacio clave y sus columnas.
##### Sensibilidad de caso{#case-sensitivity} 
* Nombres en el espacio clave y en la tabla -
Cassandra trata el espacio clave y los nombres de tabla de una manera insensible. Debido a esto, usted debe nunca utilizar una palabra reservada (pero con un caso diferente) como un espacio clave de Cassandra o nombre de mesa.
* Nombres de columna sensibles a casos -
Por defecto, Cassandra trata los nombres de columna de una manera insensible. Si usas una de las palabras reservadas de Cassandra como nombre de columna (¡Por favor, no&#33;) , debes usar
```
        <columnNameQuotes>"<columnNameQuotes>  
```
dentro datasets.xml para este conjunto de datos de modo que Cassandra y ERDDAP™ tratará los nombres de las columnas de una manera sensible a caso. Esto probablemente será un dolor de cabeza masivo para usted, porque es difícil determinar las versiones sensibles a los casos de los nombres de las columnas -- Cassandra casi siempre muestra los nombres de las columnas como todos los casos inferiores, independientemente del caso verdadero.
* Trabajar estrechamente con el administrador Cassandra, que puede tener experiencia relevante. Si el conjunto de datos no se carga, lea el [mensaje de error](#troubleshooting-tips) cuidadosamente para averiguar por qué.
         
#### Cassandra&lt;conexión Propiedad{#cassandra-connectionproperty} 
Cassandra tiene propiedades de conexión que se pueden especificar en datasets.xml . Muchos de ellos afectarán el rendimiento de la Cassandra- ERDDAP™ Conexión. Desafortunadamente, las propiedades de Cassandra deben establecerse programáticamente en Java Así que ERDDAP™ debe tener código para cada propiedad ERDDAP™ soportes. Actualmente, ERDDAP™ soporta estas propiedades:
 (Los defectos mostrados son lo que vemos. Los defectos de su sistema pueden ser diferentes.) 

*    **Opciones generales**   
    &lt;conexión Nombre de la propiedad=" **compresión** " *ninguno | LZ4 | snappy* &lt;/conexión Propiedad intelectual (case-insensible, default=none)   
     (Consejos generales de compresión: use 'none' si la conexión entre Cassandra y Cassandra ERDDAP™ es local/rápido y utilizar 'LZ4' si la conexión es remota/slow.)   
    &lt;conexión Nombre de la propiedad=" **credenciales** " *nombre de usuario/password* &lt;/conexión Propiedad intelectual (Eso es literal '/' )   
    &lt;conexión Nombre de la propiedad=" **métricas** " *verdadero | falso* &lt;/conexión Propiedad intelectual (2021-01-25 era default=true, ahora ignorado y siempre falso)   
    &lt;conexión Nombre de la propiedad=" **puerto** " *un entero* &lt;/conexión Propiedad intelectual (predeterminado para el protocolo binario nativo=9042)   
    &lt;conexión Nombre de la propiedad=" **ssl** " *verdadero | falso* &lt;/conexión Propiedad intelectual (default=false)   
     (Mi rápido intento de usar Ssl falló. Si tienes éxito, por favor dime cómo lo hiciste.) 
*    **Opciones de consulta**   
    &lt;conexión Nombre de la propiedad=" **coherencia Nivel** " *Todos | cualquiera | cada uno | local | local | local | uno | quorum | serie | tres | dos.* &lt;/conexión Propiedad intelectual (caso insensible, predeterminado=ONE)   
    &lt;conexión Nombre de la propiedad=" **fetchSize** " *un entero* &lt;/conexión Propiedad intelectual (default=5000)   
     (No fije el tamaño de etchSize a un valor más pequeño.)   
    &lt;conexión Nombre de la propiedad=" **serialConsistencyLevel** " *Todos | cualquiera | cada uno | local | local | local | uno | quorum | serie | tres | dos.* &lt;/conexión Propiedad intelectual (case-insensible, default=SERIAL) 
*    **Opciones de bolsillo**   
    &lt;conexión Nombre de la propiedad=" **connectTimeoutMillis** " *un entero* &lt;/conexión Propiedad intelectual (default=5000)   
     (No establece conexión TimeoutMillis a un valor más pequeño.)   
    &lt;conexión Nombre de la propiedad=" **keepAlive** " *verdadero | falso* &lt;/conexión Propiedad intelectual
    &lt;conexión Nombre de la propiedad=" **readTimeoutMillis** " *un entero* &lt;/conexión Propiedad intelectual
     (La lectura predeterminada de CassandraTimeoutMillis es de 12000, pero ERDDAP™ cambia el predeterminado a 120000. Si Cassandra está lanzando readTimeouts, aumentar esto puede no ayudar, porque Cassandra a veces los tira antes de este momento. El problema es más probable que esté almacenando demasiados datos por partición Combinación clave.)   
    &lt;conexión Nombre de la propiedad=" **receiveBufferSize** " *un entero* &lt;/conexión Propiedad intelectual
     (No está claro cuál es el valor predeterminado de recibirBufferSize. No pongas esto a un pequeño valor.)   
    &lt;conexión Nombre de la propiedad=" **soLinger** " *un entero* &lt;/conexión Propiedad intelectual
    &lt;conexión Nombre de la propiedad=" **tcpNoDelay** " *verdadero | falso* &lt;/conexión Propiedad intelectual (default=null) 

Si necesita ser capaz de establecer otras propiedades de conexión, vea nuestra [sección sobre la obtención de apoyo adicional](/docs/intro#support) .

Para una determinada startup de Tomcat, conexiónLas ventajas sólo se utilizan la primera vez que se crea un conjunto de datos para una URL de Cassandra dada. Todas las recargas de ese conjunto de datos y todos los conjuntos de datos posteriores que comparten la misma URL utilizarán esas conexiones originalesPropiedades.
    
#### CQL{#cql} 
El lenguaje de la consulta de Cassandra (CQL) es superficialmente como SQL, el lenguaje de consulta utilizado por bases de datos tradicionales. Porque... OPeNDAP 's solicitudes de datos tabulares fueron diseñadas para imitar solicitudes de datos tabulares SQL, es posible ERDDAP™ convertir las solicitudes de datos tabulares en Límites CQL/PreparedStatements. ERDDAP™ registra la declaración en [log.txt](/docs/server-admin/additional-information#log) como
como texto: *el estadoAsText*   
La versión de la declaración que vea será una representación de texto de la declaración y sólo tendrá "¿?" donde se colocarán los valores de restricción.
       
No tan simple... Desafortunadamente, CQL tiene muchas restricciones sobre las cuales columnas pueden ser consultadas con qué tipos de limitaciones, por ejemplo, las columnas clave de partición pueden ser limitadas con = e IN, por lo que ERDDAP™ envía algunas restricciones a Cassandra y aplica todas las restricciones después de que los datos sean recibidos de Cassandra. Para ayudar ERDDAP™ tratar eficientemente con Cassandra, usted necesita especificar [&lt;partición KeySourceNames confiar] (#partitionkeysourcenames) [&lt;clusterColumnSourceNames confianza] (#clustercolumnsourcenames) , y&lt;indexColumnSourceNames confianza] (#indexcolumnsourcenames) dentro datasets.xml para este conjunto de datos. Estas son las formas más importantes de ayudar ERDDAP™ trabajar eficientemente con Cassandra. Si no lo dices ERDDAP™ esta información, el conjunto de datos será dolorosamente lento ERDDAP™ y utilizar toneladas de recursos de Cassandra.
     
#### &lt;partición KeySourceNames caergt;{#partitionkeysourcenames} 
Porque las teclas de partición juegan un papel central en las tablas de Cassandra, ERDDAP™ necesita saber su sourceName s y, si es pertinente, otra información sobre cómo trabajar con ellos.
* Usted debe especificar una lista separada por coma de los nombres de las columnas de la fuente de partición datasets.xml via&lt;partición KeySourceNames confiar.
Ejemplo simple,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
Ejemplo más complejo,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* Llaves de partición de TimeStamp -- Si una de las columnas clave de partición es una columna de timetamp que tiene una versión más gruesa de otra columna de timetamp, especifique esto a través de
     *particiónKeySourcName/otherColumnSourceName/ time\\_precision *   
Donde time\\_precision es uno de los [ time\\_precision ](#time_precision) strings used elsewhere in ERDDAP .
La Z que sigue en el time\\_precision la cadena es el predeterminado, así que no importa si la cadena time\\_precision La cuerda termina en Z o no.
Por ejemplo, ERDDAP™ interpretará la fecha/sampletime/1970-01-01 como "Constraints for date can be built from constraints on sampletime by using this time\\_precision ." La conversión real de las limitaciones es más compleja, pero esa es la sinopsis.
     **Use esto cuando sea relevante.** Permite ERDDAP™ trabajar eficientemente con Cassandra. Si esta relación entre columnas existe en una tabla de Cassandra y no se dice ERDDAP™ , el conjunto de datos será dolorosamente lento ERDDAP™ y utilizar toneladas de recursos de Cassandra.
* Individual Claves de la partición del valor - Si quieres un ERDDAP™ conjunto de datos para trabajar con sólo un valor de una clave de partición, especificar *particiónKeySourceName=valor* .
No utilice las citas para una columna numérica, por ejemplo, deviceid=1007
Utilice las citas para una columna String, por ejemplo, stationid="Point Pinos"
* Dataset Default Sort Order... El orden de la clave de partición&lt; dataVariable ################################################################################################################################################################################################################################################################ datasets.xml determina el orden predeterminado de los resultados de Cassandra. Por supuesto, los usuarios pueden solicitar una orden de tipo diferente para un determinado conjunto de resultados mediante el gasto &quot; orderBy  (" *lista separada de variables* ") hasta el final de su consulta.
* Por defecto, Cassandra y ERDDAP™ tratar los nombres de las columnas de una manera insensible. Pero si te fijas [columnNameQuotes](#case-sensitivity) a ", ERDDAP™ tratará los nombres de columna Cassandra de una manera sensible a caso.
         
#### &lt;partición KeyCSV curvagt;{#partitionkeycsv} 
Si esto se especifica, ERDDAP™ lo utilizará en lugar de pedir Cassandra para la partición Información clave cada vez que se recarga el conjunto de datos. Esto proporciona la lista de valores clave de partición distintos, en el orden que se utilizarán. Los tiempos deben ser especificados como segundos desde 1970-01T00:00Z. Pero también hay dos formas alternativas especiales para especificar los tiempos (cada uno codificado como una cadena) :

1) tiempo (aISO8601 Hora)   (Puede ser codificado como una cadena)   
2) "tiempos (anISO8601StartTime, strideSeconds, stopTime) " (DEBE ser codificado como una cadena)   
Para El tiempo puede ser un ISO8601 Tiempo o " now- Tiempo de los ninos (por ejemplo, " now- 3 minutos") .
Para El tiempo no tiene que ser una coincidencia exacta de inicio Tiempo + x strideSeconds.
Una fila con un tiempo () valor se expande en múltiples filas antes de cada consulta, por lo que la lista de partición Las llaves pueden estar siempre perfectamente actualizadas.
Por ejemplo,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
se expande en esta tabla de combinaciones clave de partición:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;clusterColumnSourceNames{#clustercolumnsourcenames} 
Cassandra acepta restricciones similares a SQL en columnas de racimo, que son las columnas que forman la segunda parte de la clave principal (después de la clave de la partición (s) ) . Entonces, es esencial que identifique estas columnas a través de&lt;clusterColumnSourceNames confianza. Esto permite ERDDAP™ trabajar eficientemente con Cassandra. Si hay columnas de racimo y usted no dice ERDDAP , el conjunto de datos será dolorosamente lento ERDDAP™ y utilizar toneladas de recursos de Cassandra.
    * Por ejemplo,&lt;clusterColumnSourceNames *myClusterColumn1, myClusterColumn2* &lt;/clusterColumnSourceNames
    * Si una tabla Cassandra no tiene columnas de racimo, tampoco especifique&lt;clusterColumnSourceNames confiar, o especificarlo sin valor.
    * Por defecto, Cassandra y ERDDAP™ tratar los nombres de las columnas de una manera insensible. Pero si te fijas [columnNameQuotes](#case-sensitivity) a ", ERDDAP™ tratará los nombres de columna de Cassandra de una manera sensible a los casos.
         
#### &lt;indexColumnSourceNames{#indexcolumnsourcenames} 
Cassandra acepta '=' limitaciones en las columnas de índice secundario, que son las columnas que ha creado explícitamente índices por vía
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Sí, los paréntesis son necesarios.)   
Por lo tanto, es muy útil si identifica estas columnas a través de&lt;indexColumnSourceNames confianza. Esto permite ERDDAP™ trabajar eficientemente con Cassandra. Si hay columnas de índice y usted no dice ERDDAP , algunas consultas serán innecesariamente, dolorosamente lenta en ERDDAP™ y utilizar toneladas de recursos de Cassandra.
* Por ejemplo,&lt;indexColumnSourceNames *myIndexColumn1, myIndexColumn2* &lt;/indexColumnSourceNames confianza
* Si una tabla Cassandra no tiene columnas de índice, tampoco especifique&lt;indexColumnSourceNames confiar, o especificarlo sin valor.
* Los índices de Cassandra no son como índices de bases de datos. Los índices de Cassandra solo ayudan con '=' limitaciones. Y son sólo [recomendado](https://cassandra.apache.org/doc/latest/cql/indexes.html) para columnas que tienen mucho menos valores distintos que los valores totales.
* Por defecto, Cassandra y ERDDAP™ tratar los nombres de las columnas de una manera insensible. Pero si te fijas [columnNameQuotes](#case-sensitivity) a ", ERDDAP™ tratará los nombres de columna de Cassandra de una manera sensible a los casos.
         
#### &lt;maxRequestFraction limit;{#maxrequestfraction} 
Cuando ERDDAP™   (re) carga un conjunto de datos, ERDDAP™ obtiene de Cassandra la lista de combinaciones distintas de las teclas de partición. Para un conjunto de datos enorme, el número de combinaciones será enorme. Si desea evitar que los usuarios soliciten la mayoría o todos los datos (o incluso una solicitud que pregunte ERDDAP™ para descargar la mayoría o todos los datos con el fin de filtrarlo) , puedes decir ERDDAP™ sólo para permitir solicitudes que reduzcan el número de combinaciones por alguna cantidad a través de&lt;maxRequestFraction Conf, que es un número de punto flotante entre 1e-10 (lo que significa que la solicitud no puede necesitar más de 1 combinación en mil millones) y 1 (por defecto, lo que significa que la solicitud puede ser para todo el conjunto de datos) .
Por ejemplo, si un conjunto de datos tiene 10000 combinaciones distintas de las teclas de partición y maxRequestFraction se establece a 0.1,
entonces las solicitudes que necesitan datos de 1001 o más combinaciones generarán un mensaje de error,
pero se permitirán solicitudes que necesiten datos de 1000 o menos combinaciones.
    
En general, cuanto más grande sea el conjunto de datos, más bajo debe establecer&lt;maxRequestFraction Conf. Así que puede configurarlo a 1 para un conjunto de datos pequeño, 0.1 para un conjunto de datos mediano, 0.01 para un conjunto de datos grande, y 0.0001 para un conjunto de datos enorme.
    
Este enfoque está lejos de ser perfecto. Ello dará lugar a que se desestimen algunas solicitudes razonables y se permitan algunas solicitudes demasiado grandes. Pero es un problema difícil y esta solución es mucho mejor que nada.
    
#### Cassandra subsetVariables  {#cassandra-subsetvariables} 
Como con otros conjuntos de datos EDDTable, puede especificar una lista separada por coma de&lt; dataVariable ■ destinationName s en un atributo global llamado " [ subsetVariables ](#subsetvariables) "para identificar variables que tienen un número limitado de valores. El conjunto de datos tendrá una página web .subset y mostrará listas de valores distintos para esas variables en listas desplegables en muchas páginas web.
    
Incluyendo sólo variables clave de partición y columnas estáticas en la lista es STRONGLY E NCO URAGED. Cassandra será capaz de generar la lista de combinaciones distintas muy rápida y fácilmente cada vez que se recarga el conjunto de datos. Una excepción es las teclas de partición de timetamp que son versiones gruesas de alguna otra columna de timetamp - probablemente es mejor dejar estas fuera de la lista de subsetVariables ya que hay un gran número de valores y no son muy útiles para los usuarios.
    
Si incluye variables no participativas, no estáticas en la lista, probablemente será **muy bien.** computacionalmente caro para Cassandra cada vez que el conjunto de datos es recargado, porque ERDDAP™ tiene que revisar cada fila del conjunto de datos para generar la información. De hecho, es probable que la consulta falle. Así que, excepto para conjuntos de datos muy pequeños, esto es STRONGLY DISCOURAGED.
    
#### Cassandra DataTypes{#cassandra-datatypes} 
Porque hay alguna ambigüedad sobre cuál [Tipos de datos de Cassandra](https://cassandra.apache.org/doc/latest/cql/types.html) mapa a que ERDDAP™ tipos de datos, necesita especificar un [&lt;dataType] (#datatype) etiqueta para cada [&lt; dataVariable &gt; (#datavariable) para decir ERDDAP™ qué datosType para usar. El estándar ERDDAP™ datos Tipos (y los tipos de datos más comunes de Cassandra) son:
    
*    [boolean](#boolean-data)   (boolean) , que ERDDAP™ entonces las tiendas como bytes
* byte (int, si el rango es -128 a 127) 
* corto (int, si el rango es -32768 a 32767) 
* int (int, contra?, varint?, si el rango es -2147483648 a 2147483647) 
* largo (bigint, contra?, varint?, si el rango es -9223372036854775808 a 9223372036854775807) 
* flotador (flotador) 
* doble (doble, decimal (con posible pérdida de precisión) , timetamp) 
* char (ascii o texto, si nunca tienen más de 1 carácter) 
* String (ascii, texto, varchar, inet, uuid, timeuid, blob, mapa, set, list?) 

Cassandra [timetamp](#cassandra-timestamp-data) es un caso especial: uso ERDDAP 's double data Escribe.

Si especifica un DataType en String ERDDAP™ para un mapa de Cassandra, conjunto o lista, el mapa, conjunto o lista en cada fila de Cassandra se convertirá en una sola cadena en una sola fila en la ERDDAP™ mesa. ERDDAP™ tiene un sistema alternativo para listas; véase a continuación.

 *Tipo* Listas... ERDDAP Es...&lt;dataType] (#datatype) tag para Cassandra dataVariable s puede incluir el regular ERDDAP™ datos Tipos (véase supra) más varios datos especialesTipos que se pueden utilizar para las columnas de la lista Cassandra: booleanList, byteList, ubyteList, shortList, ushortList, intList, uintList, longList, ulongList, flotadorLista, dobleLista, charlista, StringList. Cuando una de estas columnas de lista está en los resultados que se pasan a ERDDAP™ , cada fila de datos de origen se ampliará a la lista. tamaño () filas de datos en ERDDAP ; datos simples Tipos (por ejemplo, int) en esa fila de datos fuente se duplicará la lista. tamaño () veces. Si los resultados contienen más de una variable de lista, todas las listas en una determinada fila de datos DEBE tener el mismo tamaño y DEBE ser listas "paralelas", o ERDDAP™ generará un mensaje de error. Por ejemplo, para mediciones actuales de un ADCP,
profundidad \\[ 0 \\] , uurrent \\[ 0 \\] , vCurrent \\[ 0 \\] , y zCurrent \\[ 0 \\] son todos relacionados, y
profundidad \\[ 1 \\] , uurrent \\[ 1 \\] , vCurrent \\[ 1 \\] , y zCurrent \\[ 1 \\] son todos relacionados, ...
Alternativamente, si no quieres ERDDAP™ para ampliar una lista en múltiples filas en el ERDDAP™ tabla, especificar la cuerda como la dataVariable 's data Escriba así que toda la lista será representada como una cuerda en una fila en ERDDAP .
    
#### Cassandra TimeStamp Data{#cassandra-timestamp-data} 
Los datos temporales de Cassandra siempre son conscientes de las zonas horarias. Si introduces datos de timetamp sin especificar una zona horaria, Cassandra asume el timetamp utiliza la zona horaria local.
    
 ERDDAP™ soporta datos de timetamp y siempre presenta los datos Zulu Zona horaria de la GMT. Así que si introduces datos de timetamp en Cassandra usando una zona horaria distinta Zulu /GMT, recuerde que usted necesita hacer todas las consultas para datos de timetamp en ERDDAP™ usando el Zulu Zona horaria de la GMT. Así que no se sorprenda cuando los valores de los tiempos que salen de ERDDAP son cambiados por varias horas debido al cambio de zona horaria de local a Zulu Hora de la GMT.

* In ERDDAP 's datasets.xml , en el&lt; dataVariable etiqueta &gt; para una variable timetamp, set
```
          <dataType>double</dataType>  
```
y dentro&lt; addAttributes &quot; Set &quot;
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Sugerencia: Si los datos son un rango de tiempo, es útil tener los valores de temporización se refieren al centro del intervalo de tiempo implícito (por ejemplo, mediodía) . Por ejemplo, si un usuario tiene datos para 2010-03-26T13:00Z de otro conjunto de datos y quieren los datos más cercanos de este conjunto de datos Cassandra que tiene datos para cada día, entonces los datos para 2010-03-26T12:00Z (representando datos de Cassandra para esa fecha) es obviamente el mejor (en lugar de la medianoche antes o después, donde es menos obvio que es mejor) .
*    ERDDAP™ tiene una utilidad [Convertir un Numeric Tiempo para/desde un tiempo de cuerda](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
* See [Cómo ERDDAP™ Tratos con el tiempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
         
#### Integer nulls{#integer-nulls} 
Cassandra soporta nulls en Cassandra int ( ERDDAP™ int) y bigint ( ERDDAP™ largo) columnas, pero ERDDAP™ no admite verdaderos nulls para ningún tipo de datos enteros.
Por defecto, Cassandra integer nulls se convertirá en ERDDAP™ a 2147483647 para columnas int, o 9223372036854775807 para columnas largas. Estos aparecerán como "NaN" en algunos tipos de archivos de salida de texto (por ejemplo, .csv) , "" en otros tipos de archivos de salida de texto (por ejemplo, .htmlTable ) , y el número específico (2147483647 por falta de valores int) en otros tipos de archivos (por ejemplo, archivos binarios como .nc y colchoneta) . Un usuario puede buscar filas de datos con este tipo de valor perdido refiriéndose a "NaN", por ejemplo, "plwindSpeed=NaN".
    
Si utiliza algún otro valor entero para indicar los valores perdidos en su tabla Cassandra, identifique ese valor en datasets.xml :

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

Para las columnas de puntos flotantes de Cassandra, los nulls se convierten en NaNs en ERDDAP . Para los tipos de datos de Cassandra que se convierten en Strings in ERDDAP™ , los nulls se convierten a Strings vacíos. Eso no debería ser un problema.
    
#### "Advertencia: Preparación de consultas ya preparadas"{#warning-re-preparing-already-prepared-query} 
* "WARNING: Re-preparing already prepared query" en *tomcat* /logs/catalina.out (o algún otro archivo de registro de Tomcat)   
La documentación de Cassandra dice que hay problemas si la misma consulta se hace en un estado de preparación dos veces (o más) . (Mira esto. [informe de error](https://datastax-oss.atlassian.net/browse/JAVA-236) .) Para evitar enloquecer a Cassandra, ERDDAP™ caches all PreparedStatements para que pueda reutilizarlos. Ese cache se pierde si/cuando Tomcat/ ERDDAP™ se reinicia, pero creo que está bien porque los Estados Preparados están asociados con una sesión determinada (entre Java y Cassandra) , que también se pierde. Así que, puede ver estos mensajes. No conozco otra solución. Afortunadamente, es una advertencia, no un error (aunque Cassandra amenaza con que pueda provocar problemas de rendimiento) .
    
Cassandra afirma que los Estados preparados son buenos para siempre, así que ERDDAP 's cached PreparadStatements nunca debe volverse fuera de la fecha / inválido. Si eso no es cierto, y usted consigue errores sobre ciertos Estados preparados que están fuera de la fecha / inválidos, entonces usted necesita reiniciar ERDDAP™ para aclarar ERDDAP 's cache of PreparedStatements.
    
#### Cassandra Security{#cassandra-security} 
See [Asegurando a Cassandra](https://cassandra.apache.org/doc/latest/operating/security.html) 

Al trabajar con Cassandra, necesita hacer las cosas de la forma más segura y segura posible para evitar que un usuario malicioso pueda dañar su Cassandra o obtener acceso a los datos a los que no deberían tener acceso. ERDDAP™ Trata de hacer las cosas de una manera segura, también.

* Te animamos a establecer ERDDAP™ para conectarse a Cassandra como usuario de Cassandra que sólo tiene acceso al **pertinentes** Cuadro (s) y sólo tiene privilegios READ.
* Le animamos a establecer la conexión desde ERDDAP™ a Cassandra así que
    * siempre usa SSL,
    * sólo permite conexiones de una dirección IP (o un bloque de direcciones) y del uno ERDDAP™ usuario, y
    * sólo transfiere contraseñas en su formulario MD5.
*    \\[ CONOCIDO PROBLEMA \\] La conexiónLas ventajas (¡incluyendo la contraseña&#33;) se almacenan como texto simple en datasets.xml . No hemos encontrado una manera de permitir que el administrador introduzca la contraseña de Cassandra durante ERDDAP 's startup in Tomcat (que ocurre sin entrada de usuario) , por lo que la contraseña debe ser accesible en un archivo. Para hacer esto más seguro:
    * Tú. (el ERDDAP™ administrador) debe ser el propietario de datasets.xml y tienen acceso READ y WRITE.
    * Haga un grupo que incluya solo usuario=tomcat. Use chgrp para hacer que el grupo para datasets.xml Con sólo privilegios READ.
    * Utilice chmod para asignar privilegios o-rwx (sin acceso READ o WRITE para "otros" usuarios) para datasets.xml .
* Cuando entra ERDDAP™ , la contraseña y otras propiedades de conexión se almacenan en "privados" Java variables.
* Las solicitudes de clientes son analizadas y verificadas por validez antes de generar las solicitudes CQL para Cassandra.
* Las solicitudes a Cassandra se hacen con CQL Bound/PreparedStatements, para prevenir la inyección de CQL. En todo caso, Cassandra es inherentemente menos susceptible a la inyección de CQL que las bases de datos tradicionales. [Inyección SQL](https://en.wikipedia.org/wiki/SQL_injection) .
         
#### Cassandra Speed{#cassandra-speed} 
Cassandra puede ser rápido o lento. Hay algunas cosas que puedes hacer para hacerlo rápido:
* En general -
La naturaleza del CQL es que las consultas son [declarativa](https://en.wikipedia.org/wiki/Declarative_programming) . Simplemente especifican lo que el usuario quiere. No incluyen una especificación o consejos para cómo se debe manejar o optimizar la consulta. Así que no hay manera de ERDDAP™ para generar la consulta de tal manera que ayuda a Cassandra optimizar la consulta (o de cualquier manera especifica cómo se debe manejar la consulta) . En general, corresponde al administrador de Cassandra configurar las cosas (por ejemplo, índices) para optimizar ciertos tipos de consultas.
     
* Especificación de las columnas de timetamp que están relacionadas con las teclas de partición de crosar-precisión mediante [&lt;partición KeySourceNames confiar] (#partitionkeysourcenames) es la forma más importante de ayudar ERDDAP™ trabajar eficientemente con Cassandra. Si esta relación existe en una mesa de Cassandra y no se dice ERDDAP™ , el conjunto de datos será dolorosamente lento ERDDAP™ y utilizar toneladas de recursos de Cassandra.
     
* Especificar las columnas de racimo a través de [&lt;clusterColumnSourceNames confianza] (#clustercolumnsourcenames) es la segunda manera más importante de ayudar ERDDAP™ trabajar eficientemente con Cassandra. Si hay columnas de racimo y usted no dice ERDDAP , un gran subconjunto de las posibles consultas para los datos será innecesariamente, dolorosamente lento en ERDDAP™ y utilizar toneladas de recursos de Cassandra.
     
* Hacer [Índices](https://cassandra.apache.org/doc/latest/cql/indexes.html) para Variables Constricidas Comúnmente -
Usted puede acelerar algunas consultas creando índices para columnas Cassandra que a menudo se limitan con restricciones "=".
    
Cassandra no puede hacer índices para listas, conjuntos o columnas de mapa.
    
* Especificación de las columnas índice a través de [&lt;indexColumnSourceNames confianza] (#indexcolumnsourcenames) es una manera importante de ayudar ERDDAP™ trabajar eficientemente con Cassandra. Si hay columnas de índice y usted no dice ERDDAP , algunas consultas para los datos serán innecesariamente, dolorosamente lento en ERDDAP™ y utilizar toneladas de recursos de Cassandra.
     
#### Cassandra Stats{#cassandra-stats} 
*    ["Estadísticas de Cassandra" Mensajes de diagnóstico](#cassandra-stats) -- Por todos ERDDAP™ consulta de usuario a un conjunto de datos Cassandra, ERDDAP™ imprimirá una línea en el archivo de registro, *bigParentDirectory* /logs/log.txt, con algunas estadísticas relacionadas con la consulta, por ejemplo,
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
Utilizando los números en el ejemplo anterior, esto significa:

* Cuando ERDDAP™ último (re) Cargó este conjunto de datos, dijo Cassandra ERDDAP™ que había 10000 combinaciones distintas de las teclas de partición. ERDDAP™ caché todas las distintas combinaciones en un archivo.
* Debido a las limitaciones del usuario, ERDDAP™ identificó 2 combinaciones de los 10000 que podrían tener los datos deseados. Entonces, ERDDAP™ hará 2 llamadas a Cassandra, una para cada combinación de las teclas de partición. (Eso es lo que Cassandra requiere.) Claramente, es problemático si un conjunto de datos grande tiene un gran número de combinaciones de las teclas de partición y una solicitud dada no reduce drásticamente eso. Usted puede exigir que cada solicitud reduzca el espacio clave estableciendo [&lt;maxRequestFraction Conf] (#maxrequestfraction) . Aquí, 2/10000=2e-4, que es menos que el maxRequestFraction (0.1) , así que se permitió la solicitud.
* Después de aplicar las restricciones en las teclas de partición, [columnas de racimo](#clustercolumnsourcenames) , y [columnas índice](#indexcolumnsourcenames) que fueron enviados por ERDDAP™ , Cassandra devolvió 1200 filas de datos a ERDDAP™ en el ResultadoSet.
* El resultado Set debe haber tenido [datos Tipo= *algún tipo* Lista](#cassandra-datatypes) columnas (con un promedio de 10 artículos por lista) , porque ERDDAP™ expandió las 1200 filas de Cassandra en 12000 filas en ERDDAP .
*    ERDDAP™ siempre aplica todas las restricciones del usuario a los datos de Cassandra. En este caso, las limitaciones que Cassandra no había manejado reducen el número de filas a 7405. Ese es el número de filas enviadas al usuario.

El uso más importante de estos mensajes diagnósticos es asegurarse de que ERDDAP™ está haciendo lo que crees que está haciendo. Si no lo es (por ejemplo, ¿no está reduciendo el número de combinaciones distintas como se espera?) , entonces usted puede utilizar la información para tratar de averiguar lo que va mal.
 
* Investigación y experimento para encontrar y mejorar [&lt;conexiónProperty confía] (#cassandra-connectionproperty) Es.
 
* Compruebe la velocidad de la conexión de red entre Cassandra y ERDDAP . Si la conexión es lenta, consulte si puede mejorarla. La mejor situación es cuando ERDDAP™ se ejecuta en un servidor conectado al mismo (rápido) cambiar como el servidor que ejecuta el nodo Cassandra al que se conecta.
 
* Por favor sea paciente. Lea la información aquí y en la documentación de Cassandra cuidadosamente. Experimento. Revisa tu trabajo. Si el Cassandra... ERDDAP™ La conexión sigue siendo más lenta de lo que espera, por favor incluya el esquema de su mesa Cassandra y su ERDDAP™ pedazo de datasets.xml y ver nuestra [sección sobre la obtención de apoyo adicional](/docs/intro#support) .
 
* Si todo lo demás falla,
considerar el almacenamiento de los datos en una colección de NetCDF v3 .nc archivos (especialmente .nc archivos que utilizan [CF Geometrías de muestreo discretos (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array estructuras de datos y así se puede manejar con ERDDAP 's [EDDTableDesdeNcCFFiles](#eddtablefromnccffiles) ) . Si se organizan lógicamente (cada uno con datos para un trozo de espacio y tiempo) , ERDDAP™ puede extraer datos de ellos muy rápidamente.
         
#### EDDTableDeCassandra esqueleto XML{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableDeDapSequence{#eddtablefromdapsequence} 
 [ **EDDTableDeDapSequence** ](#eddtablefromdapsequence) maneja variables dentro de secuencias de 1 y 2 niveles desde [ DAP ](https://www.opendap.org/) servidores tales como DAP PER (estaba enhttps://www.pmel.noaa.gov/epic/software/dapper/, now discontinued) .

* Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puedes editarlo para ajustarlo. Usted puede recopilar la información que necesita mirando los archivos DDS y DAS del conjunto de datos fuente en su navegador (añadiendo .das y .dds al archivo sourceUrl (Un ejemplo estaba enhttps://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds).
    
* Una variable está en DAP secuencia si la respuesta .dds indica que la estructura de datos que sostiene la variable es una "secuencia" (caso insensible) .
* En algunos casos, verá una secuencia dentro de una secuencia, una secuencia de 2 niveles -- EDDTableDeDapSequence maneja estos, también.
#### EDDTableDeDapSequence skeleton XML{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableDesde la base de datos{#eddtablefromdatabase} 
 [ **EDDTableDesde la base de datos** ](#eddtablefromdatabase) maneja datos de una tabla de bases de datos relacionales o [vista](https://en.wikipedia.org/wiki/View_(database) ).

#### Una tabla o vista{#one-table-or-view} 
Si los datos que desea servir están en dos o más tablas (y por lo tanto necesita un INGRESO para extraer datos de ambas tablas a la vez) , necesitas hacer uno [de normalización](https://en.wikipedia.org/wiki/Denormalization)   (ya unidos) mesa o [vista](https://en.wikipedia.org/wiki/View_(SQL) ) con todos los datos que desea hacer disponible como un conjunto de datos en ERDDAP .

Para bases de datos grandes y complejas, puede tener sentido separar varios trozos como tablas denormalizadas, cada una con un tipo diferente de datos, que se convertirán en conjuntos de datos separados en ERDDAP .

Hacer una tabla desnormalizada para su uso en ERDDAP™ puede parecerte una idea loca. Por favor confía en nosotros. Hay varias razones por las que ERDDAP™ trabaja con tablas desnormalizadas:

* Es mucho más fácil para los usuarios.
Cuando ERDDAP™ presenta el conjunto de datos como una tabla simple, denormalizada, única, es muy fácil para cualquiera entender los datos. La mayoría de los usuarios nunca han oído hablar de tablas normalizadas, y muy pocos entienden las claves, las teclas extranjeras o las tablas se unen, y casi sin duda no saben los detalles de los diferentes tipos de uniones, o cómo especificar el SQL para hacer una unión (o múltiples uniones) correctamente. Usar una tabla desnormalizada evita todos esos problemas. Esta razón por sí sola justifica el uso de una tabla única desnormalizada para la presentación de un conjunto de datos a ERDDAP™ usuarios.
     
* Cuadros normalizados (múltiples tablas relacionadas con columnas clave) son excelentes para almacenar datos en una base de datos.
Pero incluso en SQL, el resultado que se devuelve al usuario es un denormalizado (unidos) mesa individual. Así que parece razonable presentar el conjunto de datos a los usuarios como una tabla enorme, denormalizada, única de la que pueden entonces solicitar subconjuntos (por ejemplo, muéstrame hileras de la tabla donde la temperatura 30) .
     
* Puedes hacer cambios para ERDDAP™ sin cambiar tus mesas.
     ERDDAP™ tiene algunos requisitos que pueden ser diferentes de cómo ha establecido su base de datos.
Por ejemplo, ERDDAP™ requiere que los datos de timetamp se almacenen en campos de 'timestamp con timezone'.
Haciendo una tabla/visión separada ERDDAP™ , puedes hacer estos cambios cuando haces la tabla desnormalizada ERDDAP . Por lo tanto, no tienes que hacer ningún cambio en tus mesas.
     
*    ERDDAP™ recreará parte de la estructura de las tablas normalizadas.
Puede especificar qué columnas de datos provienen de las tablas "outer" y por lo tanto tienen un número limitado de valores distintos. ERDDAP™ recoger todas las diferentes combinaciones de valores en estas columnas y presentarlas a los usuarios en una especial. subset web page que ayuda a los usuarios a seleccionar rápidamente subconjuntos del conjunto de datos. Los valores distintos para cada columna también se muestran en listas desplegables en las otras páginas web del conjunto de datos.
     
* Una tabla desnormalizada hace que los datos se entreguen de usted a la ERDDAP administrador fácil.
Usted es el experto para este conjunto de datos, por lo que tiene sentido que tome las decisiones sobre qué tablas y qué columnas para unirse y cómo unirse a ellos. Así que no tienes que entregarnos (o peor, los usuarios finales) varias tablas e instrucciones detalladas para unirse a ellas, sólo tiene que darnos acceso a la tabla desnormalizada.
     
* Una tabla desnormalizada permite un acceso eficiente a los datos.
La forma desnormalizada suele ser más rápida de acceso que la forma normalizada. Las uniones pueden ser lentas. Múltiples uniones pueden ser muy lentas.
     

Para obtener los datos de dos o más tablas en la base de datos ERDDAP™ , hay tres opciones:
 

* Opción recomendada:
Usted puede crear un archivo de valor separado o conmutado con los datos de la tabla desnormalizada.
Si el conjunto de datos es enorme, entonces tiene sentido crear varios archivos, cada uno con un subconjunto cohesivo de la tabla desnormalizada (por ejemplo, datos de un rango de tiempo más pequeño) .
    
La gran ventaja aquí es que ERDDAP™ será capaz de manejar las solicitudes de datos de los usuarios sin ningún esfuerzo adicional por su base de datos. Así que... ERDDAP™ no será una carga en su base de datos o un riesgo de seguridad. Esta es la mejor opción en casi todas las circunstancias porque ERDDAP™ puede obtener datos de archivos más rápido que de una base de datos (si convertimos los archivos .csv a .nc Archivos CF) . (Parte de la razón es que ERDDAP +files es un sistema de sólo lectura y no tiene que tratar con hacer cambios mientras proporciona [ACID](https://en.wikipedia.org/wiki/ACID)   (Atómico, Consistencia, Solución, Durabilidad) .) Además, probablemente no necesitará un servidor separado ya que podemos almacenar los datos en uno de nuestros RAIDs y acceder con un servidor existente ERDDAP™ en un servidor existente.
    
* Vale Opción:
Usted estableció una nueva base de datos en un equipo diferente con sólo la tabla desnormalizada.
Dado que esa base de datos puede ser una base de datos de código abierto y libre como MariaDB, MySQL y PostgreSQL, esta opción no tiene que costar mucho.
    
La gran ventaja aquí es que ERDDAP™ será capaz de manejar solicitudes de datos de los usuarios sin ningún esfuerzo adicional por su base de datos actual. Así que... ERDDAP™ No será una carga en su base de datos actual. Esto también elimina muchas preocupaciones de seguridad desde ERDDAP™ no tendrá acceso a su base de datos actual.
    
* Opción discouraged:
Podemos conectarnos. ERDDAP™ a su base de datos actual.
Para ello, es necesario:
    
    * Cree una tabla o una vista separadas con la tabla desnormalizada de datos.
    * Crear un usuario "erddap" que tenga acceso sólo lectura a la tabla desnormalizada (s) .
         
    
Esta es una opción si los datos cambian muy frecuentemente y desea dar ERDDAP™ usuarios acceso instantáneo a esos cambios; sin embargo, incluso así, puede tener sentido utilizar la opción de archivo arriba y periódicamente (cada 30 minutos?) reemplazar el archivo que tiene los datos de hoy.
Las enormes desventajas de este enfoque son que ERDDAP™ las solicitudes de usuario probablemente colocarán una carga insoportablemente grande en su base de datos y que la ERDDAP™ la conexión es un riesgo de seguridad (aunque podemos minimizar/manejar el riesgo) .

Hacer la tabla desnormalizada o la vista para ERDDAP™ es una buena oportunidad para hacer algunos cambios que ERDDAP™ necesita, de una manera que no afecte sus tablas originales:

* Cambiar la fecha y los campos de timetamp/columns para utilizar los datosType que Postgres llama [temporizador con zona horaria](#database-date-time-data)   (o el equivalente en su base de datos) .
Los horarios sin información de zona horaria no funcionan correctamente ERDDAP .
* Haga índices para las columnas que los usuarios suelen buscar.
* Sé muy consciente de [el caso de los nombres de campo/column](#quotes-for-names-and-case-sensitivity)   (por ejemplo, utilizar todas las maletas) cuando los escribas.
* No utilice palabras reservadas para la mesa y para los nombres de campo/columna.

Si necesita ayuda para hacer la tabla o la vista desnormalizada, por favor contacte con su administrador de bases de datos.
Si quieres hablar de todo este enfoque o estrategizar lo mejor para hacerlo, por favor envía un correo electrónico a Chris. John en Noaa.gov.
    
#### base de datos en datasets.xml  {#database-in-datasetsxml} 
Es difícil crear lo correcto datasets.xml información necesaria para ERDDAP™ establecer una conexión con la base de datos. Sé paciente. Sé metódico.
* Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puedes editarlo para ajustarlo.
        
GenerarDatasets Xml tiene tres opciones especiales para EDDTableDesdeDatabase:
1. Si entras "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (sin las citas) para el nombre del catálogo, el programa mostrará una lista de los nombres del catálogo.
2. Si entras "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (sin las citas) para el nombre del esquema, el programa mostrará una lista de los nombres del esquema.
3. Si entras "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (sin las citas) para el nombre de tabla, el programa mostrará una lista de tablas y sus columnas. La primera entrada "&#33;&#33;&#33;LIST&#33;&#33;&#33;" que usted hace es la que se utilizará.
* Lea cuidadosamente toda la información de este documento sobre EDDTableDesdeDatabase.
* Puede reunir la mayor parte de la información que necesita para crear el XML para un conjunto de datos EDDTableDesdeDatabase contactando con el administrador de la base de datos y buscando la web.
* Aunque las bases de datos suelen tratar los nombres de las columnas y los nombres de las tablas de manera insensible, son sensibles a los casos ERDDAP . Así que si un mensaje de error de la base de datos dice que un nombre de columna es desconocido (por ejemplo, "Unknown identifier= ' *column\\_name* ') Aunque sepas que existe, intenta usar todas las capitales, por ejemplo, *COLUMN\\_NAME* , que es a menudo la versión verdadera y sensible al caso del nombre de la columna.
* Trabajar estrechamente con el administrador de bases de datos, que puede tener experiencia relevante. Si el conjunto de datos no se carga, lea el [mensaje de error](#troubleshooting-tips) cuidadosamente para averiguar por qué.
         
#### JDBC Driver{#jdbc-driver} 
* [JDBC Driver and&lt;driverName confía] (#jdbc-driver) -- Usted debe obtener el archivo JDBC 3 o JDBC 4 driver .jar adecuado para su base de datos y
Ponlo en *tomcat* /webapps/erddap/WEB-INF/lib después de instalar ERDDAP . Entonces, en tu datasets.xml para este conjunto de datos, debe especificar el&lt;driverName confiar para este conductor, que es (desgraciadamente) diferente del nombre de archivo. Buscar en la web para el controlador JDBC para su base de datos y el driverName que Java necesita usarlo.
    
    * Para MariaDB, intenta [https://mariadb.com/kb/en/about-the-mariadb-java-client/](https://mariadb.com/kb/en/about-the-mariadb-java-client/)   
El&lt;driverName titulado para utilizar en datasets.xml   (véase infra) es probablemente org.mariadb.jdbc. Conductor.
    * Para MySQL y Amazon RDS, intente [https://dev.mysql.com/downloads/connector/j/](https://dev.mysql.com/downloads/connector/j/)   
El&lt;driverName titulado para utilizar en datasets.xml   (véase infra) es probablemente com.mysql.jdbc. Conductor.
    * Para Oracle , intenta [https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html) .
El&lt;driverName titulado para utilizar en datasets.xml   (véase infra) es probablemente oracle.jdbc.driver. Oracle Conductor.
    * Para Postgresql, tenemos al conductor de JDBC 4 de [https://mvnrepository.com/artifact/org.postgresql/postgresql](https://mvnrepository.com/artifact/org.postgresql/postgresql)   
El&lt;driverName titulado para utilizar en datasets.xml   (véase infra) es probablemente org.postgresql. Conductor.
    * Para SQL Server, puede obtener el controlador JTDS JDBC desde [https://jtds.sourceforge.net](https://jtds.sourceforge.net) .
El&lt;driverName titulado para utilizar en datasets.xml   (véase infra) es probablemente net.sourceforge.jtds.jdbc. Conductor.
    
Después de poner el controlador JDBC .jar en ERDDAP™ directorio lib, necesita añadir una referencia a ese archivo .jar en los archivos de script .bat y/o .sh para GenerateDatasets Xml, DasDds y ArchiveADataset que están en *tomcat* /webapps/erddap/WEB-INF/ directory; de lo contrario, obtendrá una ClassNotFoundException cuando ejecute esos scripts.
    
Desafortunadamente, JDBC es a veces la fuente de problemas. En su papel como intermediario ERDDAP™ y la base de datos, a veces hace cambios sutiles a la base de datos estándar/género solicitud SQL que ERDDAP™ crea, causando así problemas (por ejemplo, en relación con [identificadores superiores/bajos](#quotes-for-names-and-case-sensitivity) y relacionados con [zonas horarias](#database-date-time-data) ) . Por favor sea paciente, lea la información aquí cuidadosamente, compruebe su trabajo, y vea nuestra [sección sobre la obtención de apoyo adicional](/docs/intro#support) .
    
#### Base de datos&lt;conexión Propiedad{#database-connectionproperty} 
* [&lt;conexiónProperty confía] (#database-connectionproperty) -- En el datasets.xml para su conjunto de datos, debe definir varias conexiones Etiquetas de la propiedad para decir ERDDAP™ cómo conectarse a su base de datos (por ejemplo, para especificar el nombre de usuario, contraseña, conexión ssl y [tamaño del embrague](#set-the-fetch-size) ) . Estos son diferentes para cada situación y son un poco difíciles de averiguar. Busque en la web ejemplos de uso de un controlador JDBC para conectarse a su base de datos. El&lt;Nombres de propiedad (por ejemplo, "usuario", "password", y "ssl") , y algunos de los valores de conexiónLos valores de propiedad se pueden encontrar buscando la web para "Propiedades de conexión JDBC *base de datos Tipo* " (por ejemplo, Oracle , MySQL, Amazon RDS, MariaDB, PostgreSQL) .
     
#### Citas para Nombres y Sensibilidad de Casos{#quotes-for-names-and-case-sensitivity} 
*    [Citas para Nombres Campo/Columno; Sensibilidad de Casos](#quotes-for-names-and-case-sensitivity) - Por defecto, EDDTableDesdeDatabase pone citas dobles estándar ANSI-SQL alrededor de nombres de campo/columna en declaraciones SELECT en caso de que haya utilizado una palabra reservada como nombre de campo/columna, o un personaje especial en un nombre de campo/columna. Las citas dobles también frustran ciertos tipos de ataques de inyección SQL. Puedes decir ERDDAP™ para usar ", ', o sin citas a través&lt;columnNameQuotes confiar dentro datasets.xml para este conjunto de datos.
    
Para muchas bases de datos, el uso de cualquier tipo de cotizaciones hace que la base de datos funcione con nombres de campo/columnas de una manera sensible a casos (en lugar de la base de datos predeterminada caso insensible) . Las bases de datos a menudo muestran nombres de archivo/column como todos los casos superiores, cuando en realidad la forma sensible del caso es diferente. In ERDDAP™ , por favor trate siempre los nombres de las columnas de la base de datos como sensibles al caso.
    
    * Para María DB, necesitas dirigir la base de datos con [\\--sql-mode=ANSI\\_QUOTES](https://mariadb.com/kb/en/mysql-command-line-client/) .
    * Para MySQL y Amazon RDS, necesita ejecutar la base de datos con [\\--sql-mode=ANSI\\_QUOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes) .
    *    Oracle admite citas dobles estándar ANSI-SQL [por defecto](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223) .
    * PostgreSQL admite citas dobles estándar ANSI-SQL por defecto.
    
      
No use una palabra reservada para una base de datos, catálogo, esquema o nombre de mesa. ERDDAP™ no pone citas alrededor de ellos.
    
Si es posible, utilice todos los casos inferiores para bases de datos, catálogo, esquemas, nombres de tablas y nombres de campo al crear la tabla de bases de datos (o vista) y cuando se refiere a los nombres de campo/column en datasets.xml dentro ERDDAP . De lo contrario, puede recibir un mensaje de error diciendo que la base de datos, catálogo, esquema, tabla y/o campo no se encontró. Si recibe ese mensaje de error, intente usar la versión sensible al caso, toda la versión en mayúscula y toda la versión en minúscula del nombre en ERDDAP . Uno de ellos puede funcionar. Si no, debe cambiar el nombre de la base de datos, catálogo, esquema y/o tabla a todos los casos inferiores.
    
#### Base de datos&lt;datos Tipo{#database-datatype} 
*    [Base de datos](#database-datatype) [&lt;dataType] (#datatype) Etiquetas -- Porque hay alguna ambigüedad sobre cuál [tipos de datos](https://www.w3schools.com/sql/sql_datatypes_general.asp) mapa a que ERDDAP™ tipos de datos, necesita especificar un [&lt;dataType] (#datatype) etiqueta para cada [&lt; dataVariable &gt; (#datavariable) para decir ERDDAP™ qué datosType para usar. Parte del problema es que diferentes conjuntos de datos utilizan diferentes términos para los diferentes tipos de datos, así que siempre trate de igualar las definiciones, no sólo los nombres. Ver la descripción de la [estándar ERDDAP™ datos Tipos](#data-types) , que incluye referencias a los tipos de datos SQL correspondientes. [Fecha y horarios](#database-date-time-data) son casos especiales: uso ERDDAP 's double data Escribe.
     
#### Datos de la fecha de la base de datos{#database-date-time-data} 
Algunas columnas de fecha de la base de datos no tienen zona horaria explícita. Tales columnas son problemas para ERDDAP . Las bases de datos apoyan el concepto de una fecha (con o sin tiempo) sin una zona horaria, como un rango aproximado de tiempo. Pero... Java   (y así ERDDAP ) sólo trata con fecha instantánea + veces con una zona horaria. Así que puede saber que los datos de la fecha se basan en una zona horaria local (con o sin horario de verano) o el GMT/ Zulu zona horaria, pero Java   (y ERDDAP ) No. Originalmente pensamos que podríamos trabajar en torno a este problema. (por ejemplo, especificando una zona horaria para la columna) , pero la base de datos + JDBC+ Java interacciones hicieron de esta una solución poco fiable.
* Entonces, ERDDAP™ requiere que almacene todos los datos de fecha y fecha en la tabla de bases de datos con un tipo de datos que corresponda al tipo JDBC "timestamp with time zone" (idealmente, que utiliza el GMT/ Zulu Zona horaria) .
* In ERDDAP 's datasets.xml , en el&lt; dataVariable etiqueta &gt; para una variable timetamp, set
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

y dentro&lt; addAttributes &quot; Set &quot;
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Sugerencia: Si los datos son un rango de tiempo, es útil tener los valores de temporización se refieren al centro del intervalo de tiempo implícito (por ejemplo, mediodía) . Por ejemplo, si un usuario tiene datos para 2010-03-26T13:00Z de otro conjunto de datos y quieren los datos más cercanos de un conjunto de datos de base que tiene datos para cada día, entonces los datos de la base de datos para 2010-03-26T12:00Z (representando datos para esa fecha) es obviamente el mejor (en lugar de la medianoche antes o después, donde es menos obvio que es mejor) .
*    ERDDAP™ tiene una utilidad [Convertir un Numeric Tiempo para/desde un tiempo de cuerda](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
* See [Cómo ERDDAP Tratos con el tiempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
       
#### Integer nulls{#integer-nulls-1} 
Bases de datos soportan nulls en entero (int, pequeña, pequeña) columnas, pero ERDDAP™ no apoya a los verdaderos nulos.
Los nulls de base de datos se convertirán en ERDDAP™ 127 para columnas de byte, 255 para columnas de ubyte, 32767 para columnas cortas, 65535 para columnas ushort, 2147483647 para columnas int, 4294967295 para columnas de uint, 9,223,372,036,854,775,807 para columnas largas, o 18446744073709551615 para columnas de ulong. Si utiliza esos defectos, por favor identifique esos missing\\_value s para los usuarios del conjunto de datos ERDDAP™ con

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

o

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

Alternativamente, puede utilizar el " missing\\_value "atributo en lugar de "\\_FillValue".
GenerarDatasets Xml añade automáticamente estos atributos \\_FillValue cuando genera el sugerido datasets.xml para conjuntos de datos.

Para las columnas de puntos flotantes de la base de datos, los nulls se convierten a NaNs en ERDDAP .
Para tipos de datos de base que se convierten a Strings in ERDDAP™ , los nulls se convierten a Strings vacíos.
    
#### Seguridad de bases de datos{#database-security} 
* Al trabajar con bases de datos, necesita hacer las cosas de la forma más segura y segura posible para evitar permitir que un usuario malicioso dañe su base de datos o obtenga acceso a datos a los que no deberían tener acceso. ERDDAP™ Trata de hacer las cosas de una manera segura, también.
    * Considere replicar, en un ordenador diferente, la base de datos y tablas de bases de datos con los datos que desee ERDDAP™ para servir. (Sí, para bases de datos comerciales como Oracle , esto implica honorarios adicionales de licencias. Pero para bases de datos de código abierto, como PostgreSQL, MySQL, Amazon RDS y MariaDB, esto no cuesta nada.) Esto le da un alto nivel de seguridad y también evita ERDDAP™ solicitudes de ralentizar la base de datos original.
    * Te animamos a establecer ERDDAP™ conectarse a la base de datos como usuario de la base de datos que sólo tiene acceso a la **pertinentes** base de datos (s) y sólo tiene privilegios READ.
    * Le animamos a establecer la conexión desde ERDDAP™ a la base de datos para que
        * siempre usa SSL,
        * sólo permite conexiones de una dirección IP (o un bloque de direcciones) y del uno ERDDAP™ usuario, y
        * sólo transfiere contraseñas en su formulario MD5.
    *    \\[ CONOCIDO PROBLEMA \\] La conexiónLas ventajas (¡incluyendo la contraseña&#33;) se almacenan como texto simple en datasets.xml . No hemos encontrado una manera de permitir que el administrador introduzca la contraseña de la base de datos durante ERDDAP 's startup in Tomcat (que ocurre sin entrada de usuario) , por lo que la contraseña debe ser accesible en un archivo. Para hacer esto más seguro:
        * Tú. (el ERDDAP™ administrador) debe ser el propietario de datasets.xml y tienen acceso READ y WRITE.
        * Haga un grupo que incluya solo usuario=tomcat. Use chgrp para hacer que el grupo para datasets.xml Con sólo privilegios READ.
        * Utilice chmod para asignar privilegios o-rwx (sin acceso READ o WRITE para "otros" usuarios) para datasets.xml .
    * Cuando entra ERDDAP™ , la contraseña y otras propiedades de conexión se almacenan en "privados" Java variables.
    * Las solicitudes de clientes son analizadas y verificadas para su validez antes de generar las solicitudes SQL para la base de datos.
    * Las solicitudes a la base de datos se hacen con SQL PreparedStatements, para evitar [Inyección SQL](https://en.wikipedia.org/wiki/SQL_injection) .
    * Las solicitudes a la base de datos se presentan con ejecución Query (no ejecución) para limitar las solicitudes de sólo lectura (así que intento de inyección SQL para alterar la base de datos fallará por esta razón, también) .
         
#### SQL{#sql} 
* Porque... OPeNDAP 's solicitudes de datos tabulares fueron diseñadas para imitar las solicitudes de datos tabulares SQL, es fácil para ERDDAP™ para convertir solicitudes de datos tabulares en estados de preparación SQL simples. Por ejemplo, el ERDDAP™ solicitud
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
se convertirá en el estado de preparación SQL
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
 ERDDAP™ peticiones con () y/o orderBy  ( *variables* ) añadirá DISTINTO y/o ORDER BY *variables* a la declaración preparada SQL. En general, esto reducirá considerablemente la respuesta de la base de datos.
 ERDDAP™ logs the PreparedStatement in [log.txt](/docs/server-admin/additional-information#log) como
```
    statement=*thePreparedStatement*  
```
Esta será una representación de texto de la Declaración Preparatoria, que puede ser ligeramente diferente del estado de preparación real. Por ejemplo, en el estado preparado, los tiempos se codifican de una manera especial. Pero en la representación del texto, aparecen como fechas ISO 8601.
     
#### Velocidad de bases de datos{#database-speed} 
* Las bases pueden ser lentas. Hay algunas cosas que puedes hacer:
    * En general -
La naturaleza de SQL es que las consultas son [declarativa](https://en.wikipedia.org/wiki/Declarative_programming) . Simplemente especifican lo que el usuario quiere. No incluyen una especificación o consejos para cómo se debe manejar o optimizar la consulta. Así que no hay manera de ERDDAP™ para generar la consulta de tal manera que ayude a la base de datos a optimizar la consulta (o de cualquier manera especifica cómo se debe manejar la consulta) . En general, corresponde al administrador de bases de datos establecer las cosas (por ejemplo, índices) para optimizar ciertos tipos de consultas.
##### Establecer el tamaño de la embrague{#set-the-fetch-size} 
Las bases de datos devuelven los datos a ERDDAP™ en pedazos. Por defecto, diferentes bases de datos devuelven un número diferente de filas en los trozos. A menudo este número es muy pequeño y muy ineficiente. Por ejemplo, el predeterminado Oracle ¡Son 10&#33; Lea la documentación de JDBC para el controlador JDBC de su base de datos para encontrar la propiedad de conexión a establecer para aumentar esto, y añadir esto a la descripción del conjunto de datos en datasets.xml . Por ejemplo,
Para MySQL y Amazon RDS, uso
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
Para MariaDB, actualmente no hay manera de cambiar el tamaño de la hembra. Pero es una característica solicitada, así que busque la web para ver si esto ha sido implementado.
Para Oracle , uso
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
Para PostgreSQL, uso
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
pero siéntete libre de cambiar el número. Establecer el número demasiado grande causará ERDDAP™ para usar mucha memoria y ser más probable que se agote de la memoria.
#### ConexiónPropiedades{#connectionproperties} 
Cada base de datos tiene otras propiedades de conexión que se pueden especificar en datasets.xml . Muchos de ellos afectarán el desempeño de la base de datos para ERDDAP™ Conexión. Por favor lea la documentación para el controlador JDBC de su base de datos para ver las opciones. Si encuentra propiedades de conexión que son útiles, por favor envíe un correo electrónico con los detalles a erd dot data at noaa dot gov .
* Haga una tabla...
Probablemente obtendrá respuestas más rápidas si usted periódicamente (¿Todos los días? cada vez que hay nuevos datos?) generar una tabla real (similarmente a la forma en que generó la VISTA) y decir ERDDAP™ para obtener datos de la tabla en lugar de la VIEW. Puesto que cualquier solicitud a la tabla puede ser cumplida sin unir otra tabla, la respuesta será mucho más rápida.
* Vacío de la tabla -
MySQL y Amazon RDS responderán mucho más rápido si usas [OPTIMIZE TABLE](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html) .
Maria DB responderá mucho más rápido si usas [OPTIMIZE TABLE](https://mariadb.com/kb/en/optimize-table/) .
PostgreSQL responderá mucho más rápido si [VACUUM](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html) la mesa.
     Oracle no tiene ni necesita un comando análogo.
* Hacer [Índices](https://en.wikipedia.org/wiki/Database_index) para Variables Constricidas Comúnmente -
Puede acelerar muchas/más consultas creando índices en la base de datos para las variables (que bases de datos llaman "columnas") que a menudo se limitan en la consulta del usuario. En general, estas son las mismas variables especificadas por [&lt; subsetVariables &gt; (#subsetvariables) y/o las variables de latitud, longitud y tiempo.
##### Uso Conexión Piscina{#use-connection-pooling} 
Normalmente, ERDDAP™ hace una conexión separada a la base de datos para cada solicitud. Este es el enfoque más fiable. La alternativa más rápida es utilizar un DataSource que admite la unión de conexiones. Para configurarlo, especifique (por ejemplo)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
justo al lado&lt; sourceUrl .&lt;chóferName título, y&lt;conexión Propiedad intelectual.
Y en *tomcat* /conf/context.xml, definir un recurso con la misma información, por ejemplo,
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
Información general sobre el uso de DataSource [https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html) .
See [Tomcat DataSource information](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources) y [Tomcat DataSource ejemplos](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html) o buscar en la web ejemplos de uso de DataSources con otros servidores de aplicaciones.
* Si todo lo demás falla,
considerar el almacenamiento de los datos en una colección de NetCDF v3 .nc archivos (especialmente .nc archivos que utilizan [CF Geometrías de muestreo discretos (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array estructuras de datos y así se puede manejar con ERDDAP 's [EDDTableDesdeNcCFFiles](#eddtablefromnccffiles) ) . Si se organizan lógicamente (cada uno con datos para un trozo de espacio y tiempo) , ERDDAP™ puede extraer datos de ellos muy rápidamente.
         
#### EDDTableDeDatabase esqueleto XML{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableDesde EDDGrid  {#eddtablefromeddgrid} 
 [ **EDDTableDesde EDDGrid ** ](#eddtablefromeddgrid) le permite crear un conjunto de datos EDDTable de cualquier EDDGrid Dataset.

* Algunas razones comunes para hacer esto son:
    * Esto permite que el conjunto de datos sea consultado con OPeNDAP limitaciones de selección, que es un tipo de "query by value" (que un usuario puede haber solicitado) .
    * El conjunto de datos es inherentemente un conjunto de datos tabular.
* El valor del atributo global "maxAxis0" (generalmente de tipo="int") , (el predeterminado es 10) se utilizará para limitar el número de ejes \\[ 0 \\]   (normalmente "time" axis) valores del anexo EDDGrid dataset que se puede acceder por solicitud de datos. Si no desea que haya ningún límite, especifique un valor de 0. Esta configuración es importante porque, de lo contrario, sería demasiado fácil para un usuario preguntar EDDTable EDDGrid para revisar todos los datos del conjunto de datos redondeados. Eso tomaría mucho tiempo y casi sin duda fallaría con un error de timeout. Este es el entorno que hace que sea seguro tener EDDTableDesde EDDGrid conjuntos de datos en su ERDDAP sin temor a que lleven a un uso irrazonable de los recursos informáticos.
* Si el anexo EDDGrid es un [ EDDGrid FromErddap](#eddfromerddap) y el ERDDAP™ es lo mismo ERDDAP , entonces EDDTableDesde EDDGrid siempre utilizará la versión actual del conjunto de datos referenciados directamente. Esta es una manera muy eficiente para EDDTableDesde EDDGrid para acceder a los datos redondeados.
* Esta clase es...&lt;reload EveryNMinutes confía] (#reloadeverynminutes) es lo que cuenta. El anexo EDDGrid 's&lt;reloadEveryNMinutes confianza es ignorado.
* Si un valor para [&lt;actualizar EveryNMillis confiar] (#Updateeverynmillis) se suministra para este conjunto de datos, se ignora. El anexo EDDGrid 's&lt;ActualizarCada uno es lo que importa.
*    [GenerarDatasetsXml](#generatedatasetsxml) tiene una opción para el tipo de dataset=EDDTableDesde EDDGrid que pide la URL de una ERDDAP   (generalmente el mismo ERDDAP )   (terminando en "/erddap/") y una expresión regular. GenerarDatasets Xml generará el XML para un EDDTableDesde EDDGrid conjunto de datos para cada conjunto de datos redondeados en el ERDDAP™ que tiene datasetID que coincide con la expresión regular (utilizar .\\* para combinar todos datasetID s for gridded datasets) .
    
El trozo de XML que genera GenerateDatasetsXml para cada conjunto de datos incluye:
    
    * A datasetID que es EDDGrid 's datasetID más "\\_AsATable".
    * Un nuevo atributo global sumario que es el EDDGrid 's resumen más un nuevo primer párrafo que describe lo que es este conjunto de datos.
    * Un nuevo título atributo global que es el EDDGrid El título más ", (Como cuadro) ".
    * Un nuevo atributo global maxAxis0 con un valor de 10.
#### EDDTableDesde EDDGrid skeleton XML{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableDesdeFileNames{#eddtablefromfilenames} 
 [ **EDDTableDesdeFileNames** ](#eddtablefromfilenames) crea un conjunto de datos de información sobre un grupo de archivos en el sistema de archivos del servidor, incluyendo una URL para cada archivo para que los usuarios puedan descargar los archivos a través de ERDDAP 's [ "files" sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) . A diferencia de todos los [EDDTableDeFiles](#eddtablefromfiles) subclases, este tipo de conjunto de datos no sirve datos de dentro de los archivos.

* EDDTableDesdeFileNames es útil cuando:
    * Usted tiene un grupo de archivos que desea distribuir como archivos enteros porque no contienen "datos" de la misma manera que los archivos de datos regulares tienen datos. Por ejemplo, archivos de imagen, archivos de vídeo, documentos de Word, archivos de hoja de cálculo Excel, archivos de presentación de PowerPoint, o archivos de texto con texto no estructurado.
    * Usted tiene un grupo de archivos que tienen datos en un formato que ERDDAP™ Aún no puedo leer. Por ejemplo, un proyecto específico, personalizado, formato binario.
         
#### EDDTableDeFileNames Data{#eddtablefromfilenames-data} 
*    [Los datos en un conjunto de datos EDDTableDesdeFileNames](#eddtablefromfilenames-data) es una tabla que ERDDAP™ crea información sobre un grupo de archivos locales. En la mesa, hay una fila para cada archivo. Cuatro atributos especiales en los [ datasets.xml para este conjunto de datos](#eddtablefromfilenames-skeleton-xml) determinar qué archivos se incluirán en este conjunto de datos:
    
##### archivo Dir{#filedir} 
    *   &lt;fileDir confianza -- Esto especifica el directorio fuente en el sistema de archivos del servidor con los archivos para este conjunto de datos. Los archivos que se encuentran en el sistema de archivos del servidor en&lt;archivoDir contactos aparecerá en la columna url de este conjunto de datos dentro de un directorio virtual llamadohttps://*serverUrl*/erddap/files/*datasetID/*.
Por ejemplo, si datasetID jplMU RSS T,
y el&lt;archivoDir confianza es /home/data/mur/ ,
y ese directorio tiene un archivo llamado jplMU RSS T20150103000000.png,
entonces la URL que se mostrará a los usuarios para ese archivo será
        https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png.
        
Además de utilizar un directorio local para el&lt;fileDir contactos, también puede especificar la URL de una página web remota similar al directorio. Esto funciona con:
        
        * Datasets no agregados en THREDDS, por ejemplo,
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[ 2020-10-21 Este servidor ya no está disponible de forma fiable. \\] 
        * Conjuntos de datos no desglosados en Hyrax , por ejemplo,
             [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/) 
        * La mayoría de los listados de directorios similares a Apache, por ejemplo,
             [https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/) 
##### deOnTheFly{#fromonthefly} 
 [\\*\\*\\*deOnTheFly](#fromonthefly) -- Para algunos enormes cubos S3 (como noaa-goes17, que tiene 26 millones de archivos) , puede tomar ERDDAP™ hasta 12 horas para descargar toda la información sobre el contenido del cubo (y luego hay otros problemas) . Para superar esto, hay una manera especial de usar&lt;fileDir contactos en EDDTableDesdeFileNames, haga un conjunto de datos con el directorio y nombres de archivos de un cubo AWS S3. El conjunto de datos no tendrá la lista de todos los directorios y nombres de archivos del cubo S3 que un usuario puede buscar mediante solicitudes al conjunto de datos. Pero el conjunto de datos obtendrá los nombres de directorios y archivos en el vuelo si el usuario atraviesa la jerarquía del directorio con el conjunto de datos "files" Opción. Así, esto permite a los usuarios navegar por la jerarquía de archivos y archivos del cubo S3 a través del conjunto de datos "files" sistema. Para ello, en lugar de especificar la URL para el cubo S3 como el "Director de inicio" (en GenerateDatasets Xml) o&lt;fileDir (dentro datasets.xml ) , uso:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
por ejemplo:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
Vea la documentación para [trabajando con S3 Buckets en ERDDAP™ ](#working-with-aws-s3-files) , en particular la descripción del formato específico que debe ser utilizado para la URL del cubo S3. Y mira
 [estos detalles y un ejemplo](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket) de uso\\*\\*\\*deOnTheFly.
        
##### recursivo{#recursive} 
*   &lt;recursivo Archivos en subdirectorios de&lt;archivoDir contactos con nombres que coinciden&lt;ficheroRegex confía aparecerá en los mismos subdirectorios en los "files" URL si&lt;recursivamente se establece a la verdad. El defecto es falso.
* [&lt;pathRegex confía] (#pathregex) -- Si recursive=true, Sólo nombres de directorio que coinciden con la rutaRegex (default=.\\*") será aceptado. Si recursivo=falso, esto es ignorado. Esto raramente se utiliza, pero puede ser muy útil en circunstancias inusuales. (Mira esto. [documentación de regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) y [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
##### archivoRegex{#fileregex} 
*   &lt;fileRegex confía -- Sólo los nombres de archivo donde todo el nombre de archivo (no incluyendo el nombre del directorio) el partido&lt;archivoRegex contacto se incluirá en este conjunto de datos. Por ejemplo, jplMU RSS T.&#123;14&#125;\\\\.png. (Mira esto. [documentación de regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) y [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .)   
         
##### De Nombres de Archivo Contenidos de la tabla de datos{#from-file-names-data-table-contents} 
En la tabla, habrá columnas con:
* Url... La URL que los usuarios pueden utilizar para descargar el archivo a través de ERDDAP 's [ "files" sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) .
* nombre... El nombre del archivo (sin un nombre de directorio) .
* LastModified... El tiempo que el archivo fue modificado por última vez (almacenado como dobles con "seconds since 1970-01-01T00:00:00Z" ) . Esta variable es útil porque los usuarios pueden ver si/cuando el contenido de un archivo dado cambió por última vez. Esta variable es una [tiempo Variante de muestreo](#timestamp-variables) , así los datos pueden aparecer como valores numéricos (segundos desde 1970-01-01T00:00Z) o un valor de String (ISO 8601:2004 (E) formato) , dependiendo de la situación.
* tamaño -- El tamaño del archivo en bytes, almacenado como dobles. Se almacenan como dobles porque algunos archivos pueden ser más grandes que las entradas permiten y los largos no se soportan en algunos tipos de archivos de respuesta. Los dobles darán el tamaño exacto, incluso para archivos muy grandes.
* columnas de adición definidas por ERDDAP™ administrador con información extraída del nombre de archivo (por ejemplo, el tiempo asociado con los datos en el archivo) basado en dos atributos que especifica en los metadatos para cada columna/ dataVariable :
    
    * ExtractoRegex... Esto es un [expresión regular](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) . Todo el regex debe coincidir con todo el nombre de archivo (no incluyendo el nombre del directorio) . El regex debe incluir al menos un grupo de captura (una sección de una expresión regular que se adjunta por paréntesis) que ERDDAP™ utiliza para determinar qué sección del nombre de archivo para extraer para convertirse en datos.
    * extracto Grupo -- Este es el número del grupo de captura (#1 es el primer grupo de captura) en la expresión regular. El default es 1. Un grupo de captura es una sección de una expresión regular que está encerrada por paréntesis.
    
Estos son dos ejemplos:
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
En el caso de la variable de tiempo, si un archivo tiene el nombre jplMU RSS T20150103000.png, el extractoRegex coincidirá con el nombre de archivo, extraer los caracteres que coinciden con el primer grupo de captura ("20150103000000") como datosType=String, luego utilizar el [unidades adecuadas para tiempos de cuerda](#string-time-units) para analizar las cadenas en valores de datos de tiempo (2015-01-03T00:00Z) .

En el caso de la variable de día, si un archivo tiene el nombre jplMU RSS T20150103000.png, el extractoRegex coincidirá con el nombre de archivo, extraer los caracteres que coinciden con el primer grupo de captura ("03") como&lt;dataType] (#datatype) \\=int, dando un valor de datos de 3.
        
#### Otras informaciones{#other-information} 
* No.&lt;actualizar EveryNMillis confiar] (#Updateeverynmillis) -- Este tipo de dataset no necesita y no puede utilizar el&lt;ActualizarTodosNMillis confiar etiqueta porque la información que se sirve por EDDTableDesdeFileNames siempre está perfectamente actualizada porque ERDDAP™ consulta el sistema de archivos para responder a cada solicitud de datos. Incluso si hay un gran número de archivos, este enfoque debe funcionar razonablemente bien. Una respuesta puede ser lenta si hay un gran número de archivos y el conjunto de datos no ha sido preguntado por un tiempo. Pero durante varios minutos después de eso, el sistema operativo mantiene la información en un caché, por lo que las respuestas deben ser muy rápidas.
     
* Puedes usar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer el datasets.xml para este tipo de conjunto de datos. Puede añadir/definir columnas adicionales con información extraída del nombre de archivo, como se muestra anteriormente.
     
#### EDDTableDesdeFileNames esqueleto XML{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableDeFiles{#eddtablefromfiles} 
 [ **EDDTableDeFiles** ](#eddtablefromfiles) es la superclase de todas las clases EDDTableDesde... No puede utilizar EDDTableDesdeFiles directamente. En su lugar, utilice una subclase de EDDTableDeFiles para manejar el tipo de archivo específico:

*    [EDDTableDesde el aeropuerto](#eddtablefromasciifiles) agrega datos de archivos de datos ASCII portátiles separados por coma, pestaña, semicolon o espacio.
*    [EDDTableDesdeAudioFiles](#eddfromaudiofiles) agrega datos de un grupo de archivos de audio locales.
*    [EDDTableDesde AwsXmlFiles](#eddtablefromawsxmlfiles) agrega datos de un conjunto de la estación meteorológica automática (AWS) Archivos XML.
*    [EDDTableDeColumnarAsciiFiles](#eddtablefromcolumnarasciifiles) agrega datos de archivos de datos tabulares ASCII con columnas de datos de ancho fijo.
*    [EDDTableDesde Hyrax Archivos](#eddtablefromhyraxfiles)   (DEPRECATED) agrega datos con varias variables, cada una con dimensiones compartidas (por ejemplo, tiempo, altitud (o profundidad) , latitud, longitud) , y servido por un [ Hyrax   OPeNDAP servidor](https://www.opendap.org/software/hyrax-data-server) .
*    [EDDTableDesdeInvalidCRAFiles](#eddtablefrominvalidcrafiles) datos agregados de NetCDF   (v3 o v4)   .nc archivos que utilizan una variante específica, inválida, de la CF DSG Contiguous Ragged Array (CRA) archivos. Aunque ERDDAP™ soporta este tipo de archivo, es un tipo de archivo inválido que nadie debe comenzar a usar. Grupos que actualmente utilizan este tipo de archivo se alienta encarecidamente a utilizar ERDDAP™ para generar archivos CF DSG CRA válidos y dejar de usar estos archivos.
*    [EDDTableDesdeJsonlCSVFiles](#eddtablefromjsonlcsvfiles) datos agregados de [JSON Líneas Archivos CSV](https://jsonlines.org/examples/) .
*    [EDDTableDesdeMultidimNcFiles](#eddtablefrommultidimncfiles) datos agregados de NetCDF   (v3 o v4)   .nc   (o [ .nc ml](#ncml-files) ) archivos con varias variables, cada una con dimensiones compartidas (por ejemplo, tiempo, altitud (o profundidad) , latitud, longitud) .
*    [EDDTableDesdeNcFiles](#eddtablefromncfiles) datos agregados de NetCDF   (v3 o v4)   .nc   (o [ .nc ml](#ncml-files) ) archivos con varias variables, cada una con dimensiones compartidas (por ejemplo, tiempo, altitud (o profundidad) , latitud, longitud) . Está bien seguir utilizando este tipo de conjunto de datos para los conjuntos de datos existentes, pero para nuevos conjuntos de datos recomendamos utilizar EDDTableDesdeMultidimNcFiles.
*    [EDDTableDesdeNcCFFiles](#eddtablefromnccffiles) datos agregados de NetCDF   (v3 o v4)   .nc   (o [ .nc ml](#ncml-files) ) archivos que utilizan uno de los formatos de archivo especificados por [CF Geometrías de muestreo discretos (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) convenciones. Pero para los archivos usando una de las variantes CF DSG multidimensionales, use [EDDTableDesdeMultidimNcFiles](#eddtablefrommultidimncfiles) en lugar de eso.
*    [EDDTableDesdeNccsvFiles](#eddtablefromnccsvfiles) datos agregados de [NCCSV](/docs/user/nccsv-1.00) Archivos ASCII .csv.
*    [EDDTableDesdeParquetFiles](#eddtablefromparquetfiles) maneja datos de [Parquet](https://parquet.apache.org/) .
*    [EDDTableDeThreddsFiles](#eddtablefromthreddsfiles)   (DEPRECATED) agrega datos de archivos con varias variables con dimensiones compartidas servidas por [THREDDS OPeNDAP servidor](https://www.unidata.ucar.edu/software/tds/) .
*    [EDDTableDesde WFS Archivos](#eddtablefromwfsfiles)   (DEPRECATED) hace una copia local de todos los datos de una ArcGIS MapServer WFS servidor para que los datos puedan ser reservidos rápidamente ERDDAP™ usuarios.

Actualmente no se admiten otros tipos de archivos. Pero generalmente es relativamente fácil añadir soporte para otros tipos de archivos. Póngase en contacto con nosotros si tiene una solicitud. O, si sus datos están en un formato de archivo antiguo que le gustaría alejarse de, recomendamos convertir los archivos a ser NetCDF v3 .nc archivos (y especialmente .nc archivos con [CF Geometrías de muestreo discretos (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Estructura de datos de Array contiguo -- ERDDAP™ puede extraer datos de ellos muy rápidamente) . NetCDF es un formato binario ampliamente compatible, permite el acceso aleatorio rápido a los datos, y ya está soportado por ERDDAP .

#### Detalles de fichas{#fromfiles-details} 
La siguiente información se aplica a todas las subclases de EDDTableDesdeFiles.
##### Aggregation{#aggregation} 
Esta clase agrega datos de archivos locales. Cada archivo tiene un (relativamente relativamente) pequeña tabla de datos.
    * El conjunto de datos resultante aparece como si todas las tablas del archivo se hubieran combinado (todas las filas de datos del archivo #1, más todas las filas del archivo #2, ...) .
    * Los archivos no tienen que tener todas las variables especificadas. Si un archivo dado no tiene una variable especificada, ERDDAP™ añadirá valores perdidos según sea necesario.
    * Las variables en todos los archivos DEBE tener los mismos valores para los [ add\\_offset ](#scale_factor) , [ missing\\_value ](#missing_value) , [\\_Fill Valor](#missing_value) , [ scale\\_factor ](#scale_factor) , y [unidades](#units) atributos (si) . ERDDAP™ cheques, pero es una prueba imperfecta - si hay diferentes valores, ERDDAP no sabe cuál es correcto y por lo tanto qué archivos son inválidos. Si esto es un problema, usted puede ser capaz de utilizar [NcML](#ncml-files) o [ NCO ](#netcdf-operators-nco) para arreglar el problema.
         
##### Archivos comprimidos{#compressed-files} 
Los archivos de datos fuente para todas las subclas de EDDTableDesdeFiles pueden ser comprimidos externamente (por ejemplo, .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , o Z) . Ver el [Documentación de archivos comprimidos externamente](#externally-compressed-files) .
     
##### Información de archivos en espera{#cached-file-information-1} 
* Cuando se carga un conjunto de datos EDDTableDesdeFiles, EDDTableDesdeFiles lee información de todos los archivos pertinentes y crea tablas (una fila para cada archivo) con información sobre cada archivo válido y cada "bad" (diferentes o nulos) archivo.
    * Las tablas también se almacenan en el disco, como NetCDF v3 .nc archivos en *bigParentDirectory* /dataset/ *last2CharsOfDatasetID* / * datasetID * / en los archivos nombrados:
dirTable .nc   (que contiene una lista de nombres de directorio únicos) ,
archivo Cuadro .nc   (que sostiene la tabla con la información de cada archivo válido) ,
BadFiles .nc   (que sostiene la tabla con la información de cada archivo malo) .
    * Para acelerar el acceso a un conjunto de datos EDDTableDesdeFiles (pero a expensas de utilizar más memoria) , puedes usar
[&lt;archivoTablaInMemory&lt;/fileTableInMemory confianza] (#filetableinmemory)   
para decir ERDDAP™ para mantener una copia de las tablas de información del archivo en memoria.
    * La copia de las tablas de información de archivos en disco también es útil cuando ERDDAP™ se cierra y se reinicia: ahorra EDDTable DesdeFiles de tener que volver a leer todos los archivos de datos.
    * Cuando se recarga un conjunto de datos, ERDDAP™ sólo necesita leer los datos en nuevos archivos y archivos que han cambiado.
    * Si un archivo tiene una estructura diferente de los otros archivos (por ejemplo, un tipo de datos diferente para una de las variables, o un valor diferente para el " [unidades](#units) "atributo") , ERDDAP añade el archivo a la lista de archivos "malos". La información sobre el problema con el archivo será escrita al *bigParentDirectory* /logs/log.txt file.
    * Usted nunca debe tener que borrar o trabajar con estos archivos. Una excepción es: si todavía está haciendo cambios en el conjunto de datos datasets.xml configuración, es posible que desee eliminar estos archivos para forzar ERDDAP™ para releer todos los archivos ya que los archivos serán leídos/interpretados de manera diferente. Si alguna vez necesita borrar estos archivos, puede hacerlo cuando ERDDAP™ está corriendo. (Entonces pon un arma. [bandera](/docs/server-admin/additional-information#set-dataset-flag) para recargar el conjunto de datos lo antes posible.) Sin embargo, ERDDAP™ generalmente nota que el datasets.xml la información no coincide con el archivo Tabla información y elimina automáticamente las tablas de archivos.
    * Si quieres animar ERDDAP™ para actualizar la información del conjunto de datos almacenado (por ejemplo, si acaba de agregar, eliminar o cambiar algunos archivos al directorio de datos del conjunto de datos) , utilizar el [Sistema de bandera](/docs/server-admin/additional-information#flag) fuerza ERDDAP™ para actualizar la información del archivo cached.
         
##### Solicitudes de manejo{#handling-requests-1} 
*    ERDDAP™ Las solicitudes de datos tabulares pueden poner restricciones en cualquier variable.
    * Cuando se procesa la solicitud de datos de un cliente, EDDTableDesdeFiles puede buscar rápidamente en la tabla con la información de archivo válida para ver qué archivos pueden tener datos relevantes. Por ejemplo, si cada archivo fuente tiene los datos de una boya de ubicación fija, EDDTableDesdeFiles puede determinar con eficacia qué archivos pueden tener datos dentro de un rango de longitud determinado y rango de latitud.
    * Debido a que la tabla de información de archivos válida incluye el valor mínimo y máximo de cada variable para cada archivo válido, EDDTableDeFiles a menudo puede manejar otras consultas de forma eficiente. Por ejemplo, si algunas de las boyas no tienen un sensor de presión de aire, y un cliente solicita datos para AirPressure&#33;=NaN, EDDTableDesdeFiles puede determinar con eficacia qué boyas tienen datos de presión de aire.
         
##### Actualización de la información de archivo en caché{#updating-the-cached-file-information-1} 
Cada vez que se recarga el conjunto de datos, se actualiza la información del archivo caché.
    
* El conjunto de datos se vuelve a cargar periódicamente según lo determinado por el&lt;reloadEveryNMinutes confiar en la información del conjunto de datos datasets.xml .
* El conjunto de datos se recarga lo antes posible cuando sea posible ERDDAP™ detecta que has añadido, eliminado, [touch'd](https://en.wikipedia.org/wiki/Touch_(Unix) ) (para cambiar el último archivo Tiempo modificado) , o cambió un archivo de datos.
* El conjunto de datos se recargará lo antes posible si utiliza el [Sistema de bandera](/docs/server-admin/additional-information#flag) .

Cuando se recarga el conjunto de datos, ERDDAP™ compara los archivos disponibles actualmente a la tabla de información de archivos caché. Los nuevos archivos se leen y se añaden a la tabla de archivos válida. Los archivos que ya no existen se eliminan de la tabla de archivos válida. Los archivos donde ha cambiado el tiempo de archivo son leídos y su información está actualizada. Las nuevas tablas reemplazan las viejas tablas en memoria y en disco.
     
##### Archivos malos{#bad-files-1} 
La tabla de archivos malos y las razones por las que los archivos fueron declarados mal (archivo dañado, variables faltantes, valores de eje incorrectos, etc.) es enviado por correo electrónico al correo electrónico Todo Para correo electrónico (Probablemente tú) cada vez que se recarga el conjunto de datos. Usted debe reemplazar o reparar estos archivos lo antes posible.
     
##### Variables desaparecidas{#missing-variables-1} 
Si algunos de los archivos no tienen algunos dataVariable s definido en el conjunto de datos datasets.xml Chuck, está bien. Cuando EDDTableDesdeFiles lee uno de esos archivos, actuará como si el archivo tuviera la variable, pero con todos los valores perdidos.
     
##### Datos casi en tiempo real{#near-real-time-data} 
* EDDTableDeFiles trata solicitudes de datos muy recientes como un caso especial. El problema: Si los archivos que componen el conjunto de datos se actualizan con frecuencia, es probable que el conjunto de datos no se actualice cada vez que se cambia un archivo. Así EDDTableDesdeFiles no estará al tanto de los archivos cambiados. (Podrías usar el [Sistema de bandera](/docs/server-admin/additional-information#flag) , pero esto podría llevar a ERDDAP™ reloading the dataset casi continuamente. Así que en la mayoría de los casos, no lo recomendamos.) En su lugar, EDDTableDesdeFiles se ocupa de esto por el siguiente sistema: Cuando ERDDAP™ obtiene una solicitud de datos dentro de las últimas 20 horas (por ejemplo, hace 8 horas hasta ahora) , ERDDAP™ buscará todos los archivos que tengan datos en las últimas 20 horas. Así, ERDDAP™ no necesita tener datos perfectamente actualizados para todos los archivos con el fin de encontrar los últimos datos. Usted debe todavía establecer [&lt;reload EveryNMinutes confía] (#reloadeverynminutes) a un valor razonablemente pequeño (por ejemplo, 60) , pero no tiene que ser diminuto (por ejemplo, 3) .
     
    *    **No recomendado** organización de datos de tiempo casi real en los archivos: Si, por ejemplo, tiene un conjunto de datos que almacena datos para numerosas estaciones (o boya, o trayectoria, ...) durante muchos años, usted podría organizar los archivos para que, por ejemplo, hay un archivo por estación. Pero entonces, cada vez que llegan nuevos datos para una estación, tiene que leer un archivo viejo grande y escribir un archivo nuevo grande. Y cuando ERDDAP™ vuelve a cargar el conjunto de datos, nota que algunos archivos han sido modificados, por lo que lee esos archivos por completo. Eso es ineficiente.
         
    *    **Recomendado** organización de datos de tiempo casi real en los archivos: Almacene los datos en trozos, por ejemplo, todos los datos para una estación/buoy/trajectory durante un año (o un mes) . Entonces, cuando llega un datum nuevo, sólo el archivo con el de este año (o mes) los datos se ven afectados.
        
        * Mejor: Uso NetCDF v3 .nc archivos con una dimensión ilimitada (tiempo) . Luego, para añadir nuevos datos, puede simplemente anexar los nuevos datos sin tener que leer y reescribir todo el archivo. El cambio se hace muy eficiente y esencialmente atómico, por lo que el archivo nunca está en un estado inconsistente.
        * De lo contrario: Si no puedes usar .nc archivos con una dimensión ilimitada (tiempo) , entonces, cuando necesita añadir nuevos datos, tiene que leer y reescribir todo el archivo afectado (esperanzadamente pequeño porque sólo tiene un año (o mes) valor de los datos) . Afortunadamente, todos los archivos de años anteriores (o meses) para esa estación permanecen sin cambios.
        
En ambos casos, cuando ERDDAP™ recarga el conjunto de datos, la mayoría de los archivos no se cambian; sólo algunos, pequeños archivos han cambiado y necesitan ser leídos.
         
##### Directores{#directories-1} 
Los archivos pueden estar en un directorio, o en un directorio y sus subdirectorios (recursivamente) . Si hay un gran número de archivos (por ejemplo,) , el sistema operativo (y por lo tanto EDDTableDesdeFiles) funcionará mucho más eficientemente si almacena los archivos en una serie de subdirectorios (uno por año, o uno por mes para conjuntos de datos con archivos muy frecuentes) , por lo que nunca hay un gran número de archivos en un directorio dado.
     
##### Remote Directories and HTTP Range Solicita{#remote-directories-and-http-range-requests-1} 
*    **Remote Directories and HTTP Range Solicita**   (AKA Byte Serving, Byte Range Solicita) --
     EDDGrid FromNcFiles, EDDTableDesdeMultidimNcFiles, EDDTableDesdeNcFiles y EDDTableDesdeNcCFFiles, a veces puede servir datos desde .nc archivos en servidores remotos y acceso a través de HTTP si el servidor admite [Byte Serving](https://en.wikipedia.org/wiki/Byte_serving) mediante solicitudes de rango HTTP (el mecanismo HTTP para servir byte) . Esto es posible porque netcdf-java (que ERDDAP™ usos para leer .nc archivos) admite la lectura de datos remotos .nc archivos a través de solicitudes de rango HTTP.
    
     **¡No hagas esto&#33;**   
En su lugar, use el [&lt;cacheDesde el sistema de usuario] (#cachefromurl) .
    
##### CacheDesde el aeropuerto{#cachefromurl} 
* [ ** &lt;cacheDesde el usuario ** ] (#cachefromurl) -
Todos EDDGrid DeFiles y todos los datasets EDDTableDeFiles soporta un conjunto de etiquetas que dicen ERDDAP™ para descargar y mantener una copia de todos los archivos de un conjunto de datos remoto, o un caché de unos pocos archivos (descargado según sea necesario) . **Esta es una característica muy útil.** 
    * El&lt;cacheDesde la etiquetaUrl Curso le permite especificar una URL con una lista de archivos de un conjunto de datos remoto de una lista de archivos remotos.
        
        * Datasets no agregados en THREDDS, por ejemplo,
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[ 2020-10-21 Este servidor ya no está disponible de forma fiable. \\] 
        * Conjuntos de datos no desglosados en Hyrax , por ejemplo,
             [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/) 
        * La mayoría de los listados de directorios similares a Apache, por ejemplo,
             [https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/) 
        * Cubos S3, por ejemplo,
             [https://noaa-goes17.s3.us-east-1.amazonaws.com/](https://noaa-goes17.s3.us-east-1.amazonaws.com/)   
Sin embargo, esto puede requerir una cuenta AWS y más configuración.
See [trabajando con S3 Buckets en ERDDAP™ ](#working-with-aws-s3-files) .
Además, generalmente no necesita usar caché FromUrl con archivos en cubos S3 si los archivos son archivos ASCII (por ejemplo, .csv) , porque ERDDAP™ puede leer eficientemente los datos del cubo directamente a través de un flujo.
        
         ERDDAP™ copiar o caché estos archivos en el conjunto de datos&lt;directorio fileDir. Si necesita soporte para otro tipo de lista de archivos remotos (por ejemplo, FTP) Por favor, envía un correo electrónico a Chris. John en Noaa.gov.
        
        * El valor predeterminado para el&lt;cacheDesde la etiquetaUrl] es null. Si no especifica un valor para el&lt;cacheDesdeUrl] etiqueta, el sistema copy/cache no se utilizará para este conjunto de datos.
        * Si el conjunto de datos&lt;archivoRegex el ajuste es algo más que .\\*, ERDDAP™ sólo descargará archivos que coincidan con el archivoRegex.
        * Si el conjunto de datos&lt;configuración recursiva de contactos es cierto y los archivos remotos están en subdirectorios, ERDDAP™ buscará en subdirectorios remotos que coincidan con el conjunto de datos [&lt;pathRegex confía] (#pathregex) , crear la misma estructura de directorio localmente, y poner los archivos locales en los mismos subdirectorios.
        * En GenerateDatasets Xml, si especifica un&lt;cacheDesde el valor de usuario, Generar Datasets Xml creará el local&lt;archivoDirtio directorio y copiar 1 archivo remoto en él. GenerarDatasets Xml entonces generará el datasets.xml bastidor basado en el archivo de muestra (especificar la muestra File=nothing) .
        * Si la fuente de datos es remota ERDDAP™ , uso [ EDDGrid FromErddap](#eddfromerddap) o [EDDTableDeErddap](#eddfromerddap) en lugar de&lt;cacheDesde el usuario. De esa manera, tu local ERDDAP™ parece tener el conjunto de datos pero no necesita almacenar ninguno de los datos localmente. La única razón para usar&lt;cacheDesde el usuario obtendrá datos de un control remoto ERDDAP™ es cuando tiene alguna otra razón por la que desea tener una copia local de los archivos de datos. En ese caso:
            * Este conjunto de datos intentará suscribirse al conjunto de datos en el remoto ERDDAP para que los cambios en ese conjunto de datos llamen la bandera de este dataset Url, haciendo que este conjunto de datos local vuelva a cargar y descargar los archivos remotos cambiados. Así, el conjunto de datos local estará actualizado muy pronto después de que se realicen cambios en el conjunto de datos remoto.
            * Usted debe enviar un correo electrónico al administrador del control remoto ERDDAP™ para pedir el datasets.xml para el conjunto de datos remoto para que pueda hacer el conjunto de datos en su local ERDDAP™ parece el conjunto de datos en el control remoto ERDDAP .
        * Si la fuente de datos es remota ERDDAP™ , el conjunto de datos local intentará suscribirse al conjunto de datos remoto.
            * Si la suscripción tiene éxito, siempre que el control remoto ERDDAP vuelve a cargar y tiene nuevos datos, se pondrá en contacto con el flagURL para este conjunto de datos, causando que vuelva a cargar y descargar los archivos de datos nuevos y/o cambiados.
            * Si la suscripción falla (por cualquier razón) o si simplemente desea asegurarse de que el conjunto de datos local está actualizado, puede establecer un [bandera](/docs/server-admin/additional-information#flag) para el conjunto de datos local, por lo que se recargará, por lo que comprobará los archivos de datos remotos nuevos y/o cambiados.
        * Si la fuente de datos no es remota ERDDAP : el conjunto de datos comprobará nuevos y/o cambiará archivos remotos cuando vuelva a cargar. Normalmente, esto es controlado por [&lt;reload EveryNMinutes confía] (#reloadeverynminutes) . Pero si sabes cuándo hay nuevos archivos remotos, puedes establecer un [bandera](/docs/server-admin/additional-information#flag) para el conjunto de datos local, por lo que recargará y comprobará nuevos y/o cambiará archivos de datos remotos. Si esto sucede rutinariamente en un momento determinado del día (por ejemplo, a las 7am) Puedes hacer un trabajo de cron para usar curl para contactar con la bandera Url para este conjunto de datos, por lo que recargará y comprobará nuevos y/o cambiará archivos de datos remotos.
    * El&lt;cacheSizeGB etiqueta especifica el tamaño del caché local. Probablemente sólo necesita usar esto cuando trabaja con sistemas de almacenamiento en la nube como [Amazon S3](https://aws.amazon.com/s3/) que es un sistema de almacenamiento comúnmente utilizado que es parte de [Amazon Web Services (AWS) ](https://aws.amazon.com/) . El valor predeterminado es -1.
        * Si el valor es&lt;=0 (por ejemplo, el valor predeterminado de -1) ,
             ERDDAP™ descargar y mantener un **copia completa** de todos los archivos del conjunto de datos remoto en el conjunto de datos&lt;fileDir contactos.
            * Este es el ajuste que se recomienda siempre que sea posible.
            * Cada vez que el conjunto de datos se vuelve a cargar, compara los nombres, tamaños y últimosModified tiempos de los archivos remotos y los archivos locales, y descarga cualquier archivo remoto que son nuevos o han cambiado.
            * Si un archivo que estaba en el servidor remoto desaparece, ERDDAP™ no eliminará el archivo local correspondiente (de lo contrario, si algo estaba temporalmente mal con el servidor remoto, ERDDAP™ podría eliminar algunos o todos los archivos locales&#33;) .
            * Con este ajuste, normalmente se establecerá&lt;updateEveryNMillis confía a -1, ya que el conjunto de datos es consciente de cuándo ha copiado nuevos archivos de datos en su lugar.
        * Si el valor es √0,
             ERDDAP™ descargar archivos desde el conjunto de datos remoto según sea necesario en un local **cache** (en el conjunto de datos&lt;fileDir] con un tamaño umbral de ese número especificado de GB.
            * El caché debe ser lo suficientemente grande para tener al menos varios archivos de datos.
            * En general, cuanto mayor sea el caché, mejor, porque el siguiente archivo de datos solicitado será más probable que ya esté en el caché.
            * Caching sólo debe ser utilizado cuando ERDDAP™ se ejecuta en un servidor de computación de nubes (e.g., an AWS compute instance) y los archivos remotos en un sistema de almacenamiento en la nube (por ejemplo, AWS S3) .
            * Cuando el espacio de disco utilizado por los archivos locales excede cache SizeGB, ERDDAP™ Pronto (tal vez no inmediatamente) eliminar algunos de los archivos caché (actualmente, basado en los menos usados (LRU) algoritmo) hasta que el espacio de disco utilizado por los archivos locales es&lt;0.75\\*cacheSizeGB (el "goal") . Sí, hay casos en los que LRU realiza muy mal - no hay algoritmo perfecto.
            *    ERDDAP™ nunca intentará eliminar un archivo caché que ERDDAP™ empezó a usar en los últimos 10 segundos. Este es un sistema imperfecto para tratar el sistema de caché y el sistema de lectores de archivos de datos sólo está integrado de forma suelta. Por esta regla, ERDDAP™ puede no ser capaz de eliminar suficientes archivos para alcanzar su objetivo, en cuyo caso imprimirá un WARNING al archivo log.txt, y el sistema desperdiciará mucho tiempo tratando de prune el cache, y es posible que el tamaño de los archivos en el cache puede exceder considerablemente el cacheSizeGB. Si esto ocurre alguna vez, utilice un ajuste cacheSizeGB más grande para ese conjunto de datos.
            * Actualmente, ERDDAP™ nunca comprueba si el servidor remoto tiene una versión más nueva de un archivo que está en el caché local. Si necesitas esta función, por favor envía un correo electrónico a Chris. John en Noaa.gov.
        * Aunque el uso de los mismos nombres de etiquetas podría implicar que el sistema de copia y el sistema de caché utilizan el mismo sistema subyacente, eso no es correcto.
            * El sistema de copia comienza de forma proactiva tareaPrueba tareas para descargar archivos nuevos y cambiados cada vez que se recarga el conjunto de datos. Sólo los archivos que han sido copiados al directorio local están disponibles a través del ERDDAP™ Dataset.
            * El sistema de caché recibe la lista de archivos remotos cada vez que se recarga el conjunto de datos y pretende que todos esos archivos están disponibles a través de la ERDDAP™ Dataset. Curiosamente, todos los archivos remotos incluso aparecen en las páginas web /files del conjunto de datos y están disponibles para descargar (aunque tal vez sólo después de un retraso mientras el archivo se descarga por primera vez desde el servidor remoto al caché local.) 
        * Datasets that use cacheSizeGB may benefit from using an [nTreads](#nthreads) configuración superior a 1, porque esto permitirá que el conjunto de datos descargue más de 1 archivo remoto a la vez.
    * El&lt;cachePartialPathRegex ES una etiqueta raramente usada que puede especificar una alternativa para el conjunto de datos [&lt;pathRegex confía] (#pathregex) . El defecto es nulo.
        * Sólo use esto si está copiando todo el conjunto de datos a través del predeterminado&lt;cacheSizeGB valor de -1.&lt;cacheSizeGB valores de √1, esto será ignorado porque no es sensible.
        * Véase [la documentación para&lt;pathRegex confía] (#pathregex) para orientación sobre cómo construir el regex.
        * Si esto se especifica, se utilizará cada vez que se recarga el conjunto de datos, excepto la primera vez que se recarga un conjunto de datos a principios de un mes.
        * Esto es útil cuando el conjunto de datos remotos se almacena en un laberinto de subdirectorios y cuando la gran mayoría de esos archivos rara vez, si alguna vez, cambian. (G)&lt;tos NASA&lt;tos título Por ejemplo, podría especificar un&lt;cachePartialPathRegex concuerda con el año actual o el mes actual. Estos regexes son muy difíciles de especificar, ya que todos los nombres de ruta parcial y completo deben coincidir con el&lt;cachePartialPathRegex confianza y porque&lt;cachePartialPathRegexilo debe trabajar con las URL remotas y los directorios locales. Un ejemplo de vida real es:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
La URL muestra arriba tiene archivos en subdirectorios basados en el año (por ejemplo, 2018) y día del año (por ejemplo, 001, 002, ..., 365 o 366) .
Note que&lt;cachePartialPathRegex comienza con .\\*,
entonces tiene un subdirectorio específico que es común a las URL remotas y los directorios locales, por ejemplo, /v4\\.1/
entonces tiene una serie de grupos de captura anidados donde la primera opción no es nada
y la segunda opción es un valor específico.
            
El ejemplo anterior sólo coincidirá con los directorios para los 10 segundos días de 2018, por ejemplo,
            https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[ 2020-10-21 Este servidor ya no está disponible de forma fiable. \\]   
y día 011, 012, ..., 019.
             (Mira esto. [documentación de regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) y [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .)   
Si necesita ayuda para crear&lt;cachePartialPathRegex confía, por favor envíenos un correo electrónico&lt;cacheDesde el usuario a Chris. John en Noaa.gov.
            
        * Un enfoque común: Si quieres usar&lt;cachePartialPathRegexilo, no lo uses inicialmente, porque quieres ERDDAP™ para descargar todos los archivos inicialmente. Después ERDDAP™ ha descargado todos los archivos, añadirlo al conjunto de datos datasets.xml .
             
##### Miles de archivos{#thousands-of-files} 
Si su conjunto de datos tiene muchos miles de archivos, ERDDAP™ puede ser lento para responder a solicitudes de datos de ese conjunto de datos. Hay dos temas aquí:
 

1. El número de archivos por directorio.
Internamente, ERDDAP™ opera a la misma velocidad independientemente de si los archivos n están en un directorio o se dispersan en varios directorios.
     
Pero hay un problema: Cuanto más archivos en un directorio dado, más lento es el sistema operativo al devolver la lista de archivos en el directorio (por archivo) a ERDDAP . El tiempo de respuesta podría ser O (################################################################################################################################################################################################################################################################) . Es difícil decir cuántos archivos en un directorio son demasiados, pero 10.000 probablemente son demasiados. Así que si su configuración está generando un montón de archivos, una recomendación aquí podría ser: poner los archivos en subdirectorios organizados lógicamente (por ejemplo, estación o estación/año) .
    
Otra razón para usar subdirectorios: si un usuario quiere usar ERDDAP 's "files" sistema para encontrar el nombre del archivo más antiguo para la estación X, es más rápido y más eficiente si los archivos están en subdirectorios de estación/año, porque hay que transferir mucha menos información.
    
2. El número total de archivos.
Para conjuntos de datos tabulares, ERDDAP™ mantiene un seguimiento de la gama de valores para cada variable en cada archivo. Cuando un usuario hace una solicitud, ERDDAP™ tiene que leer todos los datos de todos los archivos que pueden tener datos que coincidan con la solicitud del usuario. Si el usuario pide datos desde un tiempo limitado (por ejemplo, un día o un mes) Entonces ERDDAP™ no tendrá que abrir demasiados archivos en su conjunto de datos. Pero hay casos extremos donde casi todos los archivos pueden tener datos coincidentes (por ejemplo, cuando el aguaTemperatura=13.2C) . Desde que toma ERDDAP™ un poco de tiempo (en parte el tiempo de búsqueda en el HDD, en parte el tiempo para leer el encabezado del archivo) sólo para abrir un archivo dado (y más si hay un montón de archivos en el directorio) , hay una penalización temporal significativa si el número total de archivos que ERDDAP™ tiene que abrir es muy grande. Incluso abrir 1000 archivos toma tiempo significativo. Así que hay beneficios para consolidar periódicamente los archivos diarios en pedazos más grandes (por ejemplo, 1 estación por 1 año) . Entiendo que tal vez no quieras hacer esto por varias razones, pero sí conduce a respuestas mucho más rápidas. En casos extremos (por ejemplo, trato con un conjunto de datos GTSPP que tiene ~35 millones de archivos fuente) , servir datos de un gran número de archivos fuente es poco práctico porque ERDDAP 's respuesta a simples consultas puede tomar horas y utilizar toneladas de memoria. Consolidando los archivos fuente en un número menor (para GTSPP, tengo 720 ahora, 2 por mes) , ERDDAP™ puede responder razonablemente rápidamente. See [Millones de archivos](#millions-of-files)   
     

¡N.B. Solid State Drives son geniales&#33; La forma más rápida, fácil, más barata de ayudar ERDDAP™ tratar con un gran número de (pequeño) Los archivos deben usar una unidad de estado sólido. See [¡Las unidades de estado sólido son geniales&#33;](/docs/server-admin/additional-information#solid-state-drives)   
     
##### Millones de archivos{#millions-of-files} 
* Algunos datasets tienen millones de archivos fuente. ERDDAP™ puede manejar esto, pero con resultados mixtos.
    
    * Para solicitudes que sólo implican variables enumeradas en [&lt; subsetVariables &gt; (#subsetvariables) , ERDDAP™ tiene toda la información necesaria ya extraída de los ficheros de datos y almacenada en un archivo, por lo que puede responder muy, muy rápidamente.
    * Para otras solicitudes, ERDDAP™ puede escanear el conjunto de datos [información de archivo caché](#cached-file-information) y averiguar que sólo algunos de los archivos pueden tener datos que son relevantes para la solicitud y así responder rápidamente.
    * Pero para otras solicitudes (por ejemplo, aguaTemperatura=18 grado\\_C) donde cualquier archivo podría tener datos relevantes, ERDDAP™ tiene que abrir un gran número de archivos para ver si cada uno de los archivos tiene algún dato relevante a la solicitud. Los archivos se abren secuencialmente. En cualquier sistema operativo y cualquier sistema de archivos (más que unidades de estado sólido) , esto lleva mucho tiempo (Así que... ERDDAP™ responde lentamente) y realmente liga el sistema de archivos (Así que... ERDDAP™ responde lentamente a otras solicitudes) .
    
Afortunadamente, hay una solución.
    
    1. Configurar el conjunto de datos en un no público ERDDAP™   (su computadora personal?) .
    2. Crear y ejecutar un script que solicite una serie de .nc archivos CF, cada uno con un trozo grande del conjunto de datos, por lo general un período de tiempo (por ejemplo, todos los datos durante un mes determinado) . Elija el período de tiempo para que todos los archivos resultantes sean inferiores a 2GB (pero espero que sea mayor que 1GB) . Si el conjunto de datos tiene datos casi en tiempo real, ejecute el script para regenerar el archivo durante el período de tiempo actual (por ejemplo, este mes) con frecuencia (cada 10 minutos? ¿ cada hora?) . Solicitudes ERDDAP™ para .nc Los archivos CF crean un NetCDF v3 .nc archivo que utiliza el [CF Geometrías de muestreo discretos (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array data structures).
    3. Configurar un [EDDTableDesdeNcCFFiles](#eddtablefromnccffiles) Dataset en su público ERDDAP™ que obtiene datos de .nc  (CF) archivos. ERDDAP™ puede extraer datos de estos archivos muy rápidamente. Y ya que ahora hay docenas o cientos (en lugar de millones) de archivos, incluso si ERDDAP™ tiene que abrir todos los archivos, puede hacerlo tan rápido.
    
Sí, este sistema toma tiempo y esfuerzo para establecer, pero funciona muy, muy bien. La mayoría de las solicitudes de datos se pueden manejar 100 veces más rápido que antes.
     \\[ Bob sabía que era una posibilidad, pero fue Kevin O'Brien quien primero hizo esto y mostró que funciona bien. Ahora, Bob utiliza esto para el conjunto de datos GTSPP que tiene alrededor de 18 millones de archivos fuente y que ERDDAP™ ahora sirve a través de unos 500 .nc  (CF) archivos. \\] 
    
¡N.B. Solid State Drives son geniales&#33; La forma más rápida, fácil, más barata de ayudar ERDDAP™ tratar con un gran número de (pequeño) Los archivos deben usar una unidad de estado sólido. See [¡Las unidades de estado sólido son geniales&#33;](/docs/server-admin/additional-information#solid-state-drives)   
     
    
##### Grandes archivos{#huge-files} 
* Un único archivo de datos enorme (notablemente enormes archivos de datos ASCII) puede causar un OutOfMemoryError. Si este es el problema, debe ser obvio porque ERDDAP™ no se cargará el conjunto de datos. La solución, si es factible, es dividir el archivo en múltiples archivos. Idealmente, puede dividir el archivo en trozos lógicos. Por ejemplo, si el archivo tiene 20 meses de datos, dividirlo en 20 archivos, cada uno con 1 mes de datos. Pero hay ventajas incluso si el archivo principal se divide arbitrariamente. Este enfoque tiene múltiples beneficios: a) Esto reducirá la memoria necesaria para leer los archivos de datos a 1/20, porque sólo un archivo se lee en un momento. b) A menudo, ERDDAP™ puede tratar con solicitudes mucho más rápido porque sólo tiene que buscar en uno o algunos archivos para encontrar los datos para una solicitud dada. c) Si la recopilación de datos está en curso, entonces los 20 archivos existentes pueden permanecer sin cambios, y sólo necesita modificar uno, pequeño, nuevo archivo para añadir el valor de los datos del próximo mes al conjunto de datos.
     
##### Problemas FTP/Advice{#ftp-troubleadvice-1} 
* Si usted FTP nuevos archivos de datos a ERDDAP™ servidor ERDDAP™ está corriendo, hay la posibilidad de que ERDDAP™ se recargará el conjunto de datos durante el proceso FTP. ¡Pasa más a menudo de lo que podrías pensar&#33; Si sucede, el archivo parece ser válido (tiene un nombre válido) , pero el archivo no es válido. Si ERDDAP™ Intenta leer datos de ese archivo inválido, el error resultante hará que el archivo se añada a la tabla de archivos inválidos. Esto no es bueno. Para evitar este problema, utilice un nombre de archivo temporal cuando FTP'ing el archivo, por ejemplo, ABC2005 .nc \\_TEMP . Luego, la prueba de archivoNameRegex (véase infra) indicará que este no es un archivo relevante. Después de que el proceso FTP esté completo, vuelva a llamar el archivo al nombre correcto. El proceso de renombramiento hará que el archivo sea relevante en un instante.
    
##### Nombre del archivo Extractos{#file-name-extracts} 
 \\[ Esta característica es DEPRECATED. Por favor use [\\*\\*\\*fileName pseudo sourceName ](#filename-sourcenames) en lugar de eso. \\]   
EDDTableDeFiles tiene un sistema para extraer una cuerda de cada nombre de archivo y utilizarla para hacer una variable de datos pseudo. Actualmente no hay ningún sistema para interpretar estos Strings como fechas/horas. Hay varias etiquetas XML para configurar este sistema. Si no necesita parte o todo este sistema, no especifique estas etiquetas ni utilice los valores "".

* preExtractRegex es un [expresión regular](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) utilizado para identificar texto para ser eliminado del inicio del nombre de archivo. La eliminación sólo ocurre si el regex es igualado. Esto generalmente comienza con "^" para coincidir con el comienzo del nombre de archivo.
* Puestos ExtractRegex es una expresión regular utilizada para identificar texto que se eliminará del extremo del nombre de archivo. La eliminación sólo ocurre si el regex es igualado. Esto generalmente termina con "$" para coincidir con el final del nombre de archivo.
* ExtractoRegex Si está presente, esta expresión regular se utiliza después de preExtractRegex y postExtractRegex para identificar una cadena que se extraerá del nombre de archivo (por ejemplo, el stationID ) . Si el regex no está emparejado, se utiliza todo el nombre de archivo (menos preExtracto y post Extracto) . Use ".\\*" para que coincida con todo el nombre de archivo que queda después de preExtractRegex y postExtractRegex.
* columna NameForExtract es el nombre fuente de la columna de datos para las cuerdas extraídas. A dataVariable con esto [ sourceName ](#sourcename) debe estar en dataVariable s list (con cualquier tipo de datos, pero generalmente String) .

Por ejemplo, si un conjunto de datos tiene archivos con nombres como XYZAble .nc , XYZBaker .nc , XYZCharlie .nc , ..., y usted quiere crear una nueva variable ( stationID ) cuando se lee cada archivo que tendrá valores de identificación de estación (Able, Baker, Charlie, ...) extraído de los nombres de archivo, puede utilizar estas etiquetas:

*   &lt;preExtractRegex confía^XYZ&lt;/preExtractRegex
El ^ inicial es un carácter especial de expresión regular que obliga ERDDAP™ buscar XYZ al principio del nombre de archivo. Esto hace que XYZ, si se encuentra al principio del nombre de archivo, sea eliminado (por ejemplo, el nombre de archivo XYZAble .nc se convierte en Able .nc ) .
*   &lt;postExtractRegex confía\\ .nc $&lt;/postExtractRegex confía
Los $ al final es un carácter especial de expresión regular que fuerza ERDDAP™ para buscar .nc al final del nombre de archivo. Desde . es un carácter especial de expresión regular (que coincide con cualquier personaje) , está codificado como \\. Aquí. (porque 2E es el número de caracteres hexadecimal por un período) . Esto causa .nc , si se encuentra al final del nombre de archivo, para ser eliminado (por ejemplo, el nombre de archivo parcial Able .nc se convierte en Able) .
*   &lt;ExtractoRegex.\\*&lt;/extractRegex confía
La expresión regular .\\* coincide con todos los caracteres restantes (por ejemplo, el nombre de archivo parcial Able se convierte en el extracto para el primer archivo) .
*   &lt;columnNameForExtract stationID &lt;/columnNameForExtract Conf
Esto dice ERDDAP™ crear una nueva columna de fuente llamada stationID al leer cada archivo. Cada fila de datos para un archivo dado tendrá el texto extraído de su nombre de archivo (por ejemplo, Able) como el valor en el stationID columna.

En la mayoría de los casos, hay numerosos valores para estas etiquetas de extracto que darán los mismos resultados: las expresiones regulares son muy flexibles. Pero en algunos casos, sólo hay una manera de obtener los resultados deseados.
     
##### Pseudo sourceName s{#pseudo-sourcenames} 
Cada variable en cada conjunto de datos ERDDAP™ tiene un&lt; sourceName &gt; (#sourcename) que especifica el nombre de la fuente para la variable. EDDTableDeFiles soporta unos pocos pseudos sourceName s que extrae un valor de algún otro lugar (por ejemplo, el nombre del archivo o el valor de un atributo global) y promover ese valor para ser una columna de valores constantes para ese trozo de datos (por ejemplo, la tabla de los datos de ese archivo) . Para estas variables, debe especificar el tipo de datos de la variable a través de [&lt;dataType] (#datatype) tag. Si la información extraída es una cadena dateTime, especifica el formato de la cadena dateTime en la [atributos](#string-time-units) . El seudo sourceName opciones son:
 
###### global: sourceName s{#global-sourcenames} 
Se puede promover un atributo de metadatos globales en cada archivo de datos fuente para ser una columna de datos. Si una variable es&lt; sourceName Tiene el formato
```
        <sourceName>global:*attributeName*</sourceName>
```
entonces cuando ERDDAP™ está leyendo los datos de un archivo, ERDDAP™ buscará un atributo global de ese nombre (por ejemplo, PI) y crear una columna llena del valor del atributo. Esto es útil cuando el atributo tiene diferentes valores en diferentes archivos fuente, porque de lo contrario, los usuarios sólo verían uno de esos valores para todo el conjunto de datos. Por ejemplo,
```
        <sourceName>global:PI</sourceName>
```
Cuando promueve un atributo para ser datos, ERDDAP™ elimina el atributo correspondiente. Esto es apropiado porque el valor es supuestamente diferente en cada archivo; mientras que en el conjunto de datos agregado en ERDDAP™ sólo tendrá un valor. Si desea, puede añadir un nuevo valor para el atributo para el conjunto de datos añadiendo&lt;Anombre= *atributo Nombre* " *nuevo Valor* &lt;/att confía en el conjunto de datos global [&lt; addAttributes &gt; (#addattributes) . Para atributos globales que ERDDAP™ requiere, por ejemplo, institución, que DEBE añadir un nuevo valor para el atributo.
     
###### variable: sourceName s{#variable-sourcenames} 
El atributo de metadatos de una variable en cada archivo se puede promover para ser una columna de datos. Si una variable es&lt; [ sourceName ](#sourcename) \\ título tiene el formato
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
entonces cuando ERDDAP™ está leyendo los datos de un archivo, ERDDAP™ buscará el atributo especificado (por ejemplo, ID) de la variable especificada (por ejemplo, instrumento) y crear una columna llena del valor del atributo. La variable padre (por ejemplo, instrumento) No es necesario ser uno de los dataVariable s incluido en la definición del conjunto de datos ERDDAP . Por ejemplo,
```
        <sourceName>variable:instrument:ID</sourceName>
```
Esto es útil cuando el atributo tiene diferentes valores en diferentes archivos fuente, porque de lo contrario, los usuarios sólo verían uno de esos valores para todo el conjunto de datos.

Cuando promueve un atributo para ser datos, ERDDAP™ elimina el atributo correspondiente. Esto es apropiado porque el valor es supuestamente diferente en cada archivo; mientras que en el conjunto de datos agregado en ERDDAP™ sólo tendrá un valor. Si desea, puede añadir un nuevo valor para el atributo para el conjunto de datos añadiendo&lt;Anombre= *atributo Nombre* " *nuevo Valor* &lt;/att fiel a la variable [&lt; addAttributes &gt; (#addattributes) . Para atributos que ERDDAP™ requiere, por ejemplo, ioos\\_category   (dependiendo de tu configuración) , debes añadir un nuevo valor para el atributo.
        
###### fileName sourceName s{#filename-sourcenames} 
Puede extraer parte del archivo de un archivoName y promover que sea una columna de datos. El formato para este pseudo [&lt; sourceName &gt; (#sourcename) es
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
Por ejemplo,
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
Cuando EDDTableDesdeFiles está leyendo los datos de un archivo, se asegurará de que el archivoName (por ejemplo, A201807041442.slcpV1 .nc ) coincide con la expresión regular especificada ("regex") y extraer el especificado (en este caso, el primero) grupo de captura (que es una parte rodeada de paréntesis) , por ejemplo, "201807041442". (Mira esto. [documentación de regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) y [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) El regex puede ser especificado como una cadena con o sin citas circundantes. Si el regex se especifica como una cadena con citas circundantes, la cadena debe ser [cuerda de estilo JSON](https://www.json.org/json-en.html)   (con caracteres especiales escaparon con caracteres \\) . El número de grupo de captura es generalmente 1 (el primer grupo de captura) , pero puede ser cualquier número.
     
###### pathName sourceName s{#pathname-sourcenames} 
Usted puede extraer parte de la ruta completa de un archivo Nombre (/directorios/fileName.ext) y promover que sea una columna de datos. El formato para este pseudo [&lt; sourceName &gt; (#sourcename) es
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
Por ejemplo,
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
Cuando EDDTableDesdeFiles está leyendo los datos de un archivo, se asegurará de la ruta completaName (por ejemplo, /data/myDatasetID/BAY17/B201807041442 .nc . Para esta prueba, los separadores del directorio siempre serán '/' , nunca ' ') coincide con la expresión regular especificada ("regex") y extraer el especificado (en este caso, el primero) grupo de captura (que es una parte rodeada de paréntesis) , por ejemplo, "BAY17". (Mira esto. [documentación de regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) y [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) El regex puede ser especificado como una cadena con o sin citas circundantes. Si el regex se especifica como una cadena con citas circundantes, la cadena debe ser una [cuerda de estilo JSON](https://www.json.org/json-en.html)   (con caracteres especiales escaparon con caracteres \\) . El número de grupo de captura es generalmente 1 (el primer grupo de captura) , pero puede ser cualquier número.
         
##### "0 archivos" Mensaje de error{#0-files-error-message-2} 
* Si corres [GenerarDatasetsXml](#generatedatasetsxml) o [DasDds](#dasdds) , o si intenta cargar un EDDTableDesde... Dataset de archivos en ERDDAP™ , y recibe un mensaje de error de "0 archivos" indicando que ERDDAP™ encontrados 0 archivos coincidentes en el directorio (cuando usted piensa que hay archivos coincidentes en ese directorio) :
    * Compruebe que los archivos realmente están en ese directorio.
    * Compruebe la ortografía del nombre del directorio.
    * Revisa el archivoNameRegex. Es realmente, muy fácil cometer errores con regexes. Para fines de prueba, prueba el regex .\\* que debe coincidir con todos los nombres de archivo. (Mira esto. [documentación de regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) y [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
    * Compruebe que el usuario que está ejecutando el programa (por ejemplo, user=tomcat (?) para Tomcat/ ERDDAP ) tiene permiso 'leer' para esos archivos.
    * En algunos sistemas operativos (por ejemplo, SELinux) y dependiendo de la configuración del sistema, el usuario que ejecutó el programa debe tener permiso 'leer' para toda la cadena de directorios que conducen al directorio que tiene los archivos.
         
##### normalización ¿Qué?{#standardizewhat} 
* Cuando cualquier subclase de EDDTableDesdeFiles está agregando un conjunto de archivos fuente, para una variable dada, todos los archivos fuente DEBE tener valores de atributo idénticos para varios atributos: scale\\_factor , add\\_offset , \\_Unsigned, missing\\_value , \\_FillValue, y unidades). Piénsalo: si un archivo tiene unidades WindSpeed=knots y otro tiene unidades WindSpeed=m/s, entonces los valores de datos de los dos archivos no deberían ser incluidos en el mismo conjunto de datos agregado. Así, cuando EDDTableDesdeFiles crea primero el conjunto de datos, lee los valores de atributo de un archivo, entonces rechaza todos los archivos que tienen valores diferentes para esos atributos importantes. Para la mayoría de las colecciones de archivos, esto no es un problema porque los atributos de todas las variables son consistentes. Sin embargo, para otras colecciones de archivos, esto puede llevar a 1%, 10%, 50%, 90%, o incluso 99% de los archivos que son rechazados como archivos "malos". Eso es problema.
    
EDDTableDe los archivos tiene un sistema para tratar este problema: estandarizar ¿Qué? La estandarización Qué configuración le dice EDDTableDeFiles para estandarizar los archivos tan pronto como los lea, antes de EDDTableDesdeFiles mira los atributos para ver si son consistentes.
    
El lado flip es: si el conjunto de datos no tiene este problema, no utilice estandarizar ¿Qué? normalización ¿Qué tiene algunos riesgos potenciales? (examinados a continuación) e ineficiencias. Así que si no necesitas las características de estandarizar Qué, no hay necesidad de enfrentar los riesgos potenciales e ineficiencias. La mayor ineficiencia es: Cuando varias estandarizar ¿Qué opciones se utilizan mediante un conjunto de datos, implica que los archivos fuente están almacenando datos de maneras significativamente diferentes (por ejemplo, con diferentes scale\\_factor y add\\_offset , o con cadenas de tiempo utilizando diferentes formatos) . Por lo tanto, para una determinada limitación en una solicitud de usuario, no hay manera de ERDDAP™ para hacer una única limitación de nivel fuente que se puede aplicar a todos los archivos fuente. Así que... ERDDAP™ sólo puede aplicar las limitaciones afectadas a un nivel superior. Así que... ERDDAP™ tiene que leer los datos de más archivos antes de aplicar las restricciones más altas a nivel de destino. So requests to datasets that use standardize Lo que tarda más en ser procesado.
    
Para utilizar este sistema, necesita especificar
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
en el [ datasets.xml para el EDDTableDesde... Dataset de archivos](#eddtablefromfiles-skeleton-xml) (en el&lt;dataset titulada).
    
El *normalización ¿Qué?* valor especifica qué cambios EDDTableDeFiles debe tratar de aplicar. Los cambios son la suma de alguna combinación de:
    
1. Unpack
Esto hace muchas operaciones comunes y seguras para estandarizar columnas numéricas en los archivos:
    * Si scale\\_factor y/o add\\_offset atributos están presentes, eliminarlos y aplicarlos para desempaquetar los valores de datos.
    * Atributos empaquetados (e.g., real\\_min, actual\\_max, actual\\_range , data\\_min , data\\_max , datos\\_range, valid\\_min , valid\\_max , valid\\_range ) , si está presente, si la variable fue empaquetada, y si los valores de atributo fueron empaquetados (esto es complicado, pero razonablemente confiable) .
    * Si \\_FillValue y/o missing\\_value están presentes, convertir esos valores de datos a ERDDAP 's "standard" valores perdidos: MAX\\_VALUE para tipos enteros (por ejemplo, 127 para bytes, 32.767 para abreviado, y 2.147.483.647 para ints, 9223372036854775807 por largos) y NaN para dobles y flotadores.
    * Quitar el viejo \\_FillValue y/o missing\\_value atributos (si) , y reemplazarlos con sólo \\_FillValue= \\[ el ERDDAP™ Valor perdido estándar \\] .
         
2. Standardize Numeric Times
Si una columna numérica tiene unidades de tiempo numérico de estilo CF (" *timeUnits* desde entonces *BaseTime* ", por ejemplo, "días desde 1900-01-01") , esto convierte la fecha Valores del tiempo en "seconds since 1970-01-01T00:00:00Z" valores y cambios que las unidades atribuyen para indicar eso.
Si esto es seleccionado y hay una posibilidad de que esta variable tenga scale\\_factor o add\\_offset , #1 DEBE ser seleccionado también.
     
3. Apply String missing\\_value   
Si una columna String tiene \\_FillValue y/o missing\\_value atributos, esto convierte esos valores a "" y elimina los atributos.
     
4. Encontrar Numeric missing\\_value   
Si una columna numérica no tiene \\_FillValue o missing\\_value atributos, esto intenta identificar un numérico indefinido missing\\_value   (por ejemplo, -999, 9999, 1e37f) y convertir instancias de ella a los valores "estándar" (MAX\\_VALUE para tipos enteros, y NAN para dobles y carros) .
     **Esta opción tiene un riesgo:** si el mayor o menor valor de datos válido parece un valor perdido (por ejemplo, 999) , entonces esos valores de datos válidos se convertirán en valores perdidos (por ejemplo, NaN) .
     
5. Cambiar la cuerda "N/A" a ""
Para cada columna String, convierta varias cadenas utilizadas comúnmente para indicar un valor de String perdido a ". Actualmente, esto busca "., "...", "-", "¿?", "??", "N/A", "NA", "ninguno", "no aplicable", "null", "no conocido", "no especificado". La búsqueda de cadena es insensible y aplicada después de que las cadenas sean trim'd. "nd" y "other" no están específicamente en la lista.
     **Esta opción tiene un riesgo:** Las cuerdas que consideres valores válidos pueden convertirse a ".
     
6. Estándarizar a String ISO 8601 DateTimes
Para cada columna String, trate de convertir no puramente numeric Fecha de String (por ejemplo, "Jan 2, 2018") a ISO 8601 Fecha de entrada ("2018-01-02") .
     **Nota** que todos los valores de datos para la columna deben utilizar el mismo formato, de lo contrario, esta opción no hará ningún cambio en una columna determinada.
     **Esta opción tiene un riesgo:** Si hay una columna con valores de cadena que sólo sucede que parece una fecha común El formato de tiempo, se convertirá en ISO 8601 String dateTimes.
     
7. Normalizar Tiempos de fecha compactos a ISO 8601 DateTimes
Para cada columna de tipo String o integer, trate de convertir la fecha de String puramente numericTimes (por ejemplo, "20180102") a ISO 8601 Fecha de entrada ("2018-01-02") .
     **Nota** que todos los valores de datos para la columna deben utilizar el mismo formato, de lo contrario, esta opción no hará ningún cambio en una columna determinada.
     **Esta opción tiene un riesgo:** Si hay una columna con valores que no son fecha compacta Tiempos pero parecen fecha compactaTimes, se convertirán a ISO 8601 String dateTimes.
     
8. Normalizar las unidades
Esto intenta estandarizar la cadena de unidades para cada variable. Por ejemplo, "meters per second", "meter/second", "m.s^-1" , "m s-1" , "m.s-1" todos serán convertidos a "m.s-1". Esto no cambia los valores de datos. Esto funciona bien para validar UDUNITS cadenas de unidades, pero puede tener problemas con cadenas inválidas o complejas. Usted puede tratar con los problemas especificando específico entre pares en&lt;standardizeUdunits dentro ERDDAP 's
     \\[ tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file. Por favor envíe un correo electrónico a cualquier cambio que haga a Chris. John en noaa.gov para que puedan ser incorporados en los mensajes predeterminados.xml.
     **Esta opción tiene un riesgo:** Esto puede manipular algunas unidades complejas o inválidas; sin embargo, puede utilizar la solución de trabajo descrita anteriormente para evitar problemas si ocurren.
         
    
El valor predeterminado de estandarizar Qué es 0, que no hace nada.

Si/cuando cambia el valor de estandarizar ¿Qué, la próxima vez que se vuelva a cargar el conjunto de datos? ERDDAP™ releer todos los archivos de datos para el conjunto de datos para reconstruir la mini-database con información sobre cada archivo. Si el conjunto de datos tiene muchos archivos, esto llevará mucho tiempo.
    
Notas:

* Una cosa difícil es...
La estandarización Qué configuración se utiliza para todas las columnas del archivo fuente. Así, por ejemplo, el uso de #2048 podría convertir con éxito una columna de fecha compacta de StringTimes en ISO 8601 String dateTimes, pero también podría convertir erróneamente una columna con Strings que simplemente sucede a parecer fecha compactaTimes.
     
*    datasets.xml y GenerarDatasets Xml -
Es especialmente difícil conseguir la configuración correcta en datasets.xml para que su conjunto de datos funcione de la manera que desee. El mejor enfoque (como siempre) es:
    1. Uso [GenerarDatasetsXml](#generatedatasetsxml) y especificar el valor de estandarizar Lo que te gustaría usar.
    2. Uso [DasDds](#dasdds) para asegurar que el conjunto de datos cargue correctamente y refleje la estandarización Qué configuración especificaste.
    3. Prueba el conjunto de datos a mano cuando está en ERDDAP™ para asegurar que las variables afectadas funcionen según lo previsto.
         
* Riesgos -
Las opciones #256 y arriba son más riesgosas, es decir, hay una mayor posibilidad de que ERDDAP™ hará un cambio que no debe hacerse. Por ejemplo, la opción #2048 puede convertir accidentalmente una variable con cadenas de ID de estación que todo simplemente sucede a mirar ISO 8601 "compactar" fechas (por ejemplo, 20180102) en ISO 8601 "extended" fechas ("2018-01-02") .
     
* Despacio después de un cambio...
Desde el valor de estandarización Qué cambia los valores de datos que EDDTableDesdeFiles ve para cada archivo de datos, si cambia la estandarización Qué configuración, EDDTableDesdeFiles arrojará toda la información de caché sobre cada archivo (que incluye el min y max para cada variable de datos en cada archivo) y volver a leer cada archivo de datos. Si un conjunto de datos tiene un gran número de archivos, esto puede consumir mucho tiempo, por lo que tomará mucho tiempo para que el conjunto de datos vuelva a cargar la primera vez ERDDAP™ lo recarga después de hacer el cambio.
     
* Heurística -
Las opciones #256 y por encima utilizan la heurística para hacer sus cambios. Si encuentras una situación en la que las heurísticas toman una mala decisión, por favor envía un correo electrónico a una descripción del problema a Chris. John en Noaa. Gov para que podamos mejorar la heurística.
     
* Alternativas -
Si una de las estandarizadasQué opciones no resuelve un problema para un conjunto de datos dado, puede ser capaz de resolver el problema haciendo un [ .nc ml archivo](#ncml-files) para paralelo cada archivo de datos y definir cambios a las cosas en los archivos para que los archivos sean consistentes. Entonces, dile al EDDTableDesde... Dataset de archivos para agregar el .nc Archivos de ml.
    
O, uso [ NCO ](#netcdf-operators-nco) hacer cambios en los archivos para que los archivos sean consistentes.
        
##### Columnas separadas para el año, mes, fecha, hora, minuto, segundo{#separate-columns-for-year-month-date-hour-minute-second} 
Es bastante común para los archivos de datos tabulares tener columnas separadas para el año, mes, fecha, hora, minuto, segundo. Antes ERDDAP™ v2.10, la única solución era editar el archivo de datos para combinar esas columnas en una columna de tiempo unificada. Con ERDDAP™ 2.10+, puede utilizar el
[&lt; sourceName &gt;= *expresión* &lt; sourceName &gt; (#sourcename) para decir ERDDAP™ cómo combinar las columnas fuente para hacer una columna de tiempo unificada, por lo que ya no tiene que editar el archivo fuente.
##### &lt;skipHeaderToRegex pulmonar;{#skipheadertoregex} 
* [&lt;skipHeaderToRegex confía] (#skipheadertoregex) --
OPTIONAL. (Para EDDTableDeAsciiFiles y EDDTableDeColumnarAsciiFiles datasets only.)   
Cuando EDDTableDesdeAsciiFiles lee un archivo de datos, ignorará todas las líneas hasta e incluyendo la línea que coincide con esta expresión regular. El predeterminado es "", que no utiliza esta opción. Un ejemplo es
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
que ignorará todas las líneas hasta e incluyendo una línea que comienza con "\\*\\*\\* END OF HEADER".

Cuando usas esta etiqueta,&lt;columnNamesRow confiar y&lt;primerDataRow Confía en actuar como si el encabezado se hubiera eliminado antes de leer el archivo. Por ejemplo, usaría la columnaNamesRow=0 si los nombres de las columnas están en la fila justo después del encabezado.

Si quieres usar genera Datasets Xml con un conjunto de datos que necesita esta etiqueta:

1. Haga un archivo de muestra nuevo, temporal, copiando un archivo existente y eliminando el encabezado.
2. Run genera Datasets Xml y especificar el archivo de muestra.
3. Agregue manualmente el&lt;skipHeaderToRegex titulada tag to the datasets.xml Idiota.
4. Eliminar el archivo temporal, muestra.
5. Utilice el conjunto de datos en ERDDAP .
##### &lt;skipLinesRegex reducidagt;{#skiplinesregex} 
OPTIONAL. (Para EDDTableDeAsciiFiles y EDDTableDeColumnarAsciiFiles datasets only.)   
Cuando EDDTableDesdeAsciiFiles lee un archivo de datos, ignorará todas las líneas que coinciden con esta expresión regular. El predeterminado es "", que no utiliza esta opción. Un ejemplo es
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
que ignorará todas las líneas que comienzan con "#".

Cuando usas esta etiqueta,&lt;columnNamesRow confiar y&lt;primerDataRow Confía en actuar como si todas las líneas de juego hubieran sido eliminadas antes de leer el archivo. Por ejemplo, usaría la columnaNamesRow=0 incluso si hay varias líneas empezando con, por ejemplo, "#" al inicio del archivo.
    
#### EDDTableDeFiles skeleton XML{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableDeAsciiService{#eddtablefromasciiservice} 
 [ **EDDTableDeAsciiService** ](#eddtablefromasciiservice) Es esencialmente un raspador de pantalla. Se trata de fuentes de datos que tienen un simple servicio web para solicitar datos (a menudo un formulario HTML en una página web) y que puede devolver los datos en algún formato ASCII estructurado (por ejemplo, un formato de texto ASCII de valor separado por coma o columnar, a menudo con otra información antes y/o después de los datos) .

EDDTableDesdeAsciiService es la superclase de todas las clases de EDDTableDesdeAsciiService... No puede utilizar EDDTableDesdeAsciiService directamente. En su lugar, utilice una subclase de EDDTableDesdeAsciiService para manejar tipos específicos de servicios:

*    [EDDTableDesdeAsciiServiceNOS](#eddtablefromasciiservicenos) obtiene datos de NOAA Servicios de ASCII de NOS.

Actualmente no se admiten otros tipos de servicio. Pero generalmente es relativamente fácil apoyar otros servicios si trabajan de una manera similar. Póngase en contacto con nosotros si tiene una solicitud.

#### Detalles{#details} 
La siguiente información se aplica a todas las subclases de EDDTableDesdeAsciiService.

* Constraints... ERDDAP™ Las solicitudes de datos tabulares pueden poner restricciones en cualquier variable. El servicio subyacente puede o no permitir limitaciones en todas las variables. Por ejemplo, muchos servicios solo soportan limitaciones en los nombres de estaciones, latitud, longitud y tiempo. Así que cuando una subclase de EDDTableDesdeAsciiService recibe una solicitud de un subconjunto de un conjunto de datos, pasa tantas restricciones como sea posible al servicio de datos fuente y luego aplica las restricciones restantes a los datos devueltos por el servicio, antes de entregar los datos al usuario.
* Rango válido... A diferencia de muchos otros tipos de conjuntos de datos, EDDTableDesdeAsciiService generalmente no conoce el rango de datos para cada variable, por lo que no puede rechazar rápidamente solicitudes de datos fuera del rango válido.
* Parsing the ASCII Text Response -- Cuando EDDTableDesdeAsciiService recibe una respuesta de un servicio de texto ASCII, debe validar que la respuesta tiene el formato y la información esperados, y luego extraer los datos. Puede especificar el formato utilizando varias etiquetas especiales en el trozo de XML para este conjunto de datos:
    *   &lt;antesData1⁄4&lt;antesData10 etiquetas confianza... Puede especificar una serie de piezas de texto (tantos como quieras, hasta 10) que EDDTableDesdeAsciiService debe buscar en el encabezado del texto ASCII devuelto por el servicio con&lt;antesData1⁄4&lt;antesData10 Conf. Por ejemplo, esto es útil para verificar que la respuesta incluye las variables esperadas utilizando las unidades esperadas. La última etiqueta antes deData que especifique identifica el texto que ocurre justo antes de que comiencen los datos.
    *   &lt;despuésData Conf -- Esto especifica el texto que EDDTableDesdeAsciiService buscará en el texto ASCII devuelto por el servicio que significa el final de los datos.
    *   &lt;noData Conf -- Si EDDTableDesdeAsciiService encuentra este texto en el texto ASCII devuelto por el servicio, concluye que no hay datos que coincidan con la solicitud.
#### EDDTableDeAsciiService skeleton XML{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableDesdeAsciiServiceNOS{#eddtablefromasciiservicenos} 
 [ **EDDTableDesdeAsciiServiceNOS** ](#eddtablefromasciiservicenos) hace EDDTable datasets de los servicios de datos de texto ASCII ofrecidos por NOAA 's [National Ocean Service (NOS) ](https://oceanservice.noaa.gov/) . Para obtener información sobre cómo funciona esta clase y cómo usarlo, vea la superclase de esta clase [EDDTableDeAsciiService](#eddtablefromasciiservice) . Es poco probable que alguien que no sea Bob Simons necesite usar esta subclase.

Puesto que los datos de la respuesta de un servicio NOS utilizan un formato de texto ASCII columnar, las variables de datos distintas de la latitud y la longitud deben tener un atributo especial que especifica qué caracteres de cada línea de datos contienen los datos de esa variable, por ejemplo,
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDTableDesde AllDatasets{#eddtablefromalldatasets} 
 [ **EDDTableDesde AllDatasets** ](#eddtablefromalldatasets) es un conjunto de datos de alto nivel que tiene información sobre todos los demás conjuntos de datos que actualmente están cargados en su ERDDAP . A diferencia de otros tipos de conjuntos de datos, no hay especificación para el allDatasets Dataset in datasets.xml . ERDDAP™ crea automáticamente un conjunto de datos EDDTableDesdeAllDatasets (con datasetID = allDatasets ) . Así, un allDatasets dataset se creará en cada ERDDAP™ instalación y trabajará de la misma manera en cada ERDDAP™ instalación.

El allDatasets dataset es un conjunto de datos tabular. Tiene una fila de información para cada conjunto de datos. Tiene columnas con información sobre cada conjunto de datos, por ejemplo, datasetID , accesible, institución, título, minLongitud, maxLongitud, minLatitud, maxLatitud, minTime, maxTime, etc. Porque... allDatasets es un conjunto de datos tabulares, puede consultarlo de la misma manera que puede consultar cualquier otro conjunto de datos tabulares en ERDDAP™ , y puede especificar el tipo de archivo para la respuesta. Esto permite a los usuarios buscar conjuntos de datos de interés de maneras muy poderosas.
 
### EDDTableDesde el aeropuerto{#eddtablefromasciifiles} 
 [ **EDDTableDesde el aeropuerto** ](#eddtablefromasciifiles) agrega datos de archivos de datos ASCII portátiles separados por coma, pestaña, semicolon o espacio.

* La mayoría de las veces, los archivos tendrán nombres de columna en la primera fila y datos comenzando en la segunda fila. (Aquí, la primera fila del archivo se llama fila número 1.) Pero puedes usar&lt;columnNamesRow confiar y&lt;primerDataRow confiar en su datasets.xml archivo para especificar un número de fila diferente.
*    ERDDAP™ permite que las filas de datos tengan diferentes números de valores de datos. ERDDAP™ supone que los valores de datos perdidos son las columnas finales en la fila. ERDDAP™ asigna los valores de valor perdidos estándar para los valores de datos perdidos. (añadido v1.56) 
* Los archivos ASCII son fáciles de trabajar, pero no son la forma más eficiente de almacenar o recuperar datos. Para mayor eficiencia, guardar los archivos como NetCDF v3 .nc archivos (con una dimensión, "row", compartida por todas las variables) en lugar de eso. Puedes [uso ERDDAP™ para generar los nuevos archivos](#millions-of-files) .
* Mira la superclase de esta clase, [EDDTableDeFiles](#eddtablefromfiles) , para información sobre cómo funciona esta clase y cómo utilizarla.
* Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Debido a la falta total de metadatos en los archivos ASCII, siempre necesitará editar los resultados de GenerateDatasetsXml.
* ¿Cuándo? ERDDAP™ lee archivos de datos ASCII, si encuentra un error en una línea determinada (por ejemplo, número incorrecto de artículos) , registra un mensaje de advertencia ("WARNING: Bad line (s) de datos" ... con una lista de las malas líneas en líneas posteriores) a la [log.txt file](/docs/server-admin/additional-information#log) y luego sigue leyendo el resto del archivo de datos. Por lo tanto, es su responsabilidad mirar periódicamente (o escribir un script para hacerlo) para ese mensaje en el registro. txt para que pueda solucionar los problemas en los archivos de datos. ERDDAP™ se establece de esta manera para que los usuarios puedan seguir leyendo todos los datos válidos disponibles aunque algunas líneas del archivo tengan defectos.
     
### EDDTableDesde AwsXmlFiles{#eddtablefromawsxmlfiles} 
 [ **EDDTableDesde AwsXmlFiles** ](#eddtablefromawsxmlfiles) agrega datos de un conjunto de la estación meteorológica automática (AWS) Archivos de datos XML usando la API de WeatherBug Rest (que ya no es activo) .

* Este tipo de archivo es una manera sencilla pero ineficiente de almacenar los datos, porque cada archivo generalmente parece contener la observación desde un punto de tiempo. Así que puede haber un gran número de archivos. Si desea mejorar el rendimiento, considere la consolidación de grupos de observaciones (¿Vale una semana?) dentro NetCDF v3 .nc archivos (mejor: .nc archivos con [CF Geometrías de muestreo discretos (DSG) Formato Array contiguo](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ) y uso [EDDTableDesdeMultidimNcFiles](#eddtablefrommultidimncfiles)   (o [EDDTableDesdeNcCFFiles](#eddtablefromnccffiles) ) para servir los datos. Puedes [uso ERDDAP™ para generar los nuevos archivos](#millions-of-files) .
* Mira la superclase de esta clase, [EDDTableDeFiles](#eddtablefromfiles) , para información sobre cómo funciona esta clase y cómo utilizarla.
     
### EDDTableDeColumnarAsciiFiles{#eddtablefromcolumnarasciifiles} 
 [ **EDDTableDeColumnarAsciiFiles** ](#eddtablefromcolumnarasciifiles) agrega datos de archivos de datos tabulares ASCII con columnas de ancho fijo.

* La mayoría de las veces, los archivos tendrán nombres de columna en la primera fila y datos comenzando en la segunda fila. La primera línea / fila en el archivo se llama fila #1. Pero puedes usar&lt;columnNamesRow confiar y&lt;primerDataRow confiar en su datasets.xml archivo para especificar un número de fila diferente.
* El&lt; addAttributes para cada uno&lt; dataVariable Ø para estos conjuntos de datos DEBE incluir estos dos atributos especiales:
    
    *   &lt;att name="startColumn" *entero* &lt;att] -- especifica la columna de caracteres en cada línea que es el comienzo de esta variable de datos.
    *   &lt;att name="stopColumn" *entero* &lt;att] -- especifica la columna de caracteres en cada línea que es la 1 después del final de esta variable de datos.
    
La primera columna de caracteres se llama columna #0.
Por ejemplo, para este archivo que tiene valores de tiempo de apertura de valores de temperatura :
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
la variable de tiempo tendría
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
y la variable de datos de tiempo tendría
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Estos atributos DEBE especificarse para todas las variables excepto [valor fijo](#fixed-value-sourcenames) y [nombre de archivo-fuente-nombres](#filename-sourcenames) variables.
* Los archivos ASCII son fáciles de trabajar, pero no son una manera eficiente de almacenar o recuperar datos. Para mayor eficiencia, guardar los archivos como NetCDF v3 .nc archivos (con una dimensión, "row", compartida por todas las variables) en lugar de eso. Puedes [uso ERDDAP™ para generar los nuevos archivos](#millions-of-files) .
* Mira la superclase de esta clase, [EDDTableDeFiles](#eddtablefromfiles) , para información sobre cómo funciona esta clase y cómo utilizarla.
* Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Debido a la dificultad de determinar las posiciones de inicio y final de cada columna de datos y la falta total de metadatos en los archivos ASCII, siempre necesitará editar los resultados de GenerateDatasetsXml.
     
### EDDTableDesdeHtpGet{#eddtablefromhttpget} 
EDDTable FromHtpGet es diferente de todos los demás tipos de conjuntos de datos en ERDDAP™ en que tiene un sistema por el cual los "autores" específicos pueden agregar datos, revisar datos o eliminar datos del conjunto de datos periódicamente HTTP GET o [POST](#http-post) solicitudes de un programa informático, un script o un navegador. El conjunto de datos es consultable por los usuarios de la misma manera que todos los demás conjuntos de datos EDDTable son deseables en ERDDAP . Vea la descripción de la superclase de esta clase, [EDDTableDeFiles](#eddtablefromfiles) , para leer sobre las características que son heredadas de esa superclase.

Las características únicas de EDDTableDesdeHttpGet se describen a continuación. Necesitas leer toda esta sección inicial y entenderla; de lo contrario, puedes tener expectativas poco realistas o meterte en problemas que es difícil de arreglar.

#### Uso previsto{#intended-use} 
Este sistema está destinado a:

* Tabular (in situ) datos, no datos redondeados.
* Datos en tiempo real -
El objetivo es permitir a un autor (por ejemplo, el sensor, un script QC automatizado, o un humano específico) para hacer un cambio en el conjunto de datos (a través de un [.insert o .delete comando](#insert-and-delete) ) y hacer que ese cambio sea accesible ERDDAP™ usuarios, todo en menos de 1 segundo, y posiblemente mucho más rápido. La mayor parte de ese 1 segundo es tiempo de red. ERDDAP™ puede procesar la solicitud en aproximadamente 1 ms y los datos son accesibles inmediatamente a los usuarios. Esto es un [rápido](#httpget-speed) , [robusta](#robust) , y [sistema fiable](#system-reliability) .
* Casi cualquier frecuencia de datos -
Este sistema puede aceptar datos poco frecuentes (por ejemplo, diariamente) mediante datos muy frecuentes (por ejemplo, datos de 100 Hz) . Si optimiza el sistema, puede manejar datos de frecuencia superior (tal vez 10 datos KHz si usted va a extremos) .
* Datos de un sensor o una colección de sensores similares.
*    [Versión](#versioning) / [Reproducible Science](https://en.wikipedia.org/wiki/Reproducibility) / DOI s...
Situaciones donde usted necesita ser capaz de hacer cambios en los datos (por ejemplo, cambiar una bandera de control de calidad) , saber qué autor hizo cada cambio, conocer el momento de cuando el autor hizo el cambio, y (previa solicitud) ser capaz de ver los datos originales de antes de hacer el cambio. Así pues, estos conjuntos de datos son elegibles para [ DOI s](https://en.wikipedia.org/wiki/Digital_object_identifier) . porque se encuentran con DOI requisito de que el conjunto de datos no cambie, excepto por agregación. En general, los conjuntos de datos casi en tiempo real no son elegibles para DOI s porque los datos a menudo se cambian retroactivamente (p. ej., para fines de QA/QC) .
     

Una vez que los datos están en un EDDTableDesdeHtpGet dataset, cualquier usuario puede solicitar datos de la misma manera que solicite datos de cualquier otro conjunto de datos EDDTable.
     
#### Experimental: Ten cuidado.{#experimental-be-careful} 
Dado que este sistema es nuevo y ya que los datos ambientales perdidos no pueden ser recuperados, debe tratar EDDTableDesdeHttpGet como experimental. Si usted está pasando de otro sistema, por favor ejecute el viejo sistema y el nuevo sistema en paralelo hasta que usted está seguro de que el nuevo sistema funciona bien (semanas o meses, no sólo horas o días) . En todos los casos, asegúrese de que su sistema archiva por separado las URL .insert y .delete que se envían a la EDDTableDesdeHtpGet dataset (incluso si sólo en los registros Apache y/o Tomcat) Por lo menos por un tiempo. Y en todos los casos, asegúrese de que los archivos de datos creados por su EDDTableDesdeHttpObtenga conjunto de datos estén respaldados rutinariamente a dispositivos de almacenamiento de datos externos. (Note que [rsync](https://en.wikipedia.org/wiki/Rsync) . puede respaldar los archivos de datos creados por EDDTableDesdeHtpObtén muy eficientemente.)   
     
#### .insert y .delete{#insert-and-delete} 

Para cualquier dataset in ERDDAP™ , cuando envía una solicitud ERDDAP™ para un subconjunto de los datos en un conjunto de datos, especifica el tipo de archivo que desea para la respuesta, por ejemplo, .csv, .htmlTable , .nc , .json . EDDTableDesdeHtp Obtener extiende este sistema para apoyar dos "tipos de ficheros adicionales" que pueden insertar (o cambio) o eliminar datos en el conjunto de datos:

* .insert
    * La solicitud se formatea como una respuesta de forma HTML estándar, con pares clave=valor, separados por 'fr'. Por ejemplo,
        https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1  
dice ERDDAP™ para agregar o cambiar los datos stationID =46088 para el tiempo especificado.
    * El autor de este cambio es JohnSmith y la clave es algunosKey1.
    * La URL debe incluir valores válidos (valores no perdidos) para todos los [ http RequisitosVariables](#httpgetrequiredvariables-global-attribute) 
    * Si los valores de los http Requiere Variables en la solicitud (por ejemplo, stationID y tiempo) coinciden con los valores en una fila ya en el conjunto de datos, los nuevos valores efectivamente sobrescriben los valores antiguos (aunque los valores antiguos siguen siendo accesibles si el usuario solicita datos de un anterior [versión](#versioning) del conjunto de datos) .
    * La URL .insert nunca debe incluir &gt; ( ERDDAP™ genera ese valor) o &quot; mand= (que se especifica por .insert (que es comando=0) o .delete (que es comando= 1) ) .
    * Si la URL .insert no especifica valores para otras columnas que están en el conjunto de datos, se supone que son los valores nativos perdidos (MAX\\_VALUE para tipos de datos enteros, NaN para carros y dobles, y "" para cuerdas) .
             
    * .delete
        * La solicitud se formatea como una respuesta de forma HTML estándar, con pares clave=valor, separados por 'fr'. Por ejemplo,
            https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1  
dice ERDDAP™ para eliminar los datos stationID =46088 en el momento especificado.
        * El autor de este cambio es JohnSmith y la clave es algunosKey1.
        * La URL debe especificar [ http RequisitosVariables](#httpgetrequiredvariables-global-attribute) en la solicitud (por ejemplo, stationID y tiempo) . Si esos valores coinciden con los valores en una fila ya en el conjunto de datos (que normalmente se) , los valores antiguos se eliminan efectivamente (aunque los valores antiguos siguen siendo accesibles si un usuario solicita datos de un anterior [versión](#versioning) del conjunto de datos) .
        * No es necesario especificar valores para no-HtpGetRequiredVariables, aparte del autor, que es necesario para autenticar la solicitud.
             
    
Detalles:
    * Las solicitudes .insert y .delete se formatean como respuestas estándar de forma HTML, con pares de valor clave, separados por ' conjuntamente'. Los valores deben ser [por ciento codificado](https://en.wikipedia.org/wiki/Percent-encoding) . Por lo tanto, usted necesita codificar caracteres especiales en la forma %HH, donde HH es el valor hexadecimal de 2 dígitos del personaje. Por lo general, sólo necesita convertir algunos de los caracteres de puntuación: % en %25, &quot; en %26, "en %22,&lt;en %3C, = en %3D, NOS en %3E, + en %2B, | en %7C, \\[ en %5B, \\] en %5D, espacio en %20, y convertir todos los caracteres por encima de #127 en su forma UTF-8 y luego codifica cada byte de la forma UTF-8 en el formato %H (pedir ayuda a un programador) .
    * .insert y .delete solicitudes deben incluir [ http RequisitosVariables](#httpgetrequiredvariables-global-attribute) , por ejemplo, stationID y tiempo. Para .insert solicitudes, las variables que no se especifican en la solicitud se supone que son valores perdidos (MAX\\_VALUE para variables enteros, NaN para variables flotantes y dobles, y una cadena vacía para variables de cuerda) . Para .delete peticiones, valores para non-HtpGetRequired Variables (salvo el autor, que es necesario) son ignorados.
    * .insert y .delete solicitudes deben incluir el nombre del autor y la clave del autor a través de un parámetro en el formulario autor= *autor* como último parámetro en la solicitud. Requiring this to be last ensures that the entire request has been received by ERDDAP . Sólo el autor (no la clave) se almacenará en el archivo de datos. Usted debe especificar la lista de permitidos *autor* 's via el atributo global [ http GetKeys](#httpgetkeys) 
    * .insert y .delete parámetros pueden ser escalar (individual) valores o arrays de cualquier longitud en la forma \\[ valor1, valor2, valor3,..., valorN \\] . Para una solicitud dada, todas las variables con arrays deben tener arrays con el mismo número de valores (es un error) . Si una solicitud tiene valores de escalar y array, los valores de escalar se replican para convertirse en arrays con la misma longitud que los arrays especificados, por ejemplo, &quot; stationID =46088 podría tratarse como &quot; stationID = \\[ 46088,46088,46088 \\] . Los rayos son la clave [alto rendimiento](#httpget-speed) . Sin arrays, será difícil .insert o .delete más de 8 filas de datos por segundo de un autor remoto (por todo el sobrecabezamiento de la red) . Con arrays, será fácil .insert o .delete más de 1000 filas de datos por segundo de un sensor remoto.
    * .insert y .delete aceptar (sin un mensaje de error) números de puntos flotantes cuando se esperan números enteros. En estos casos, el conjunto de datos redondea los valores a los enteros.
    * .insert y .delete aceptar (sin un mensaje de error) números enteros y puntos flotantes que están fuera de rango del tipo de datos de la variable. En estos casos, el conjunto de datos almacena los valores como ERDDAP 's valores nativos perdidos para ese tipo de datos (MAX\\_VALUE para tipos enteros y NaN para carros y dobles) .
         
#### Respuesta{#response} 
Si el URL .insert o .delete tiene éxito, el código de respuesta HTTP será 200 (OK) y la respuesta será texto con un .json objeto, por ejemplo,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Tenga en cuenta que los horarios tienen precisión de milisegundos.

Si el URL .insert o .delete falla, obtendrá un código de respuesta HTTP más de 200 (Está bien.) , por ejemplo, Error 403 Prohibido si presenta un valor incorrecto de autor\\_key. ERDDAP™ envía el código de respuesta HTTP (no, por ejemplo, un .json error formateado) porque así se hacen las cosas en Internet y porque los errores pueden ocurrir en cualquier lugar del sistema (por ejemplo, en la red, que devuelve un error HTTP) . Si el error es de ERDDAP™ , la respuesta puede incluir algún texto (no .json ) con una explicación más detallada de lo que salió mal, pero el código de respuesta HTTP (200=Bueno, cualquier cosa es problema) es la manera correcta de comprobar si el .insert o .delete tuvo éxito. Si comprobar el código de respuesta HTTP no es posible o es inconveniente, busque "status":"success" en el texto de respuesta que debe ser una indicación fiable del éxito.
    
#### Archivos de registro{#log-files} 
Cuando EDDTableDesdeHttpGet recibe comandos .insert y .delete, simplemente anexa la información al archivo pertinente en un conjunto de archivos de registro, cada uno de los cuales es una tabla almacenada en un [JSON Líneas archivo CSV](https://jsonlines.org/examples/) . Cuando un usuario hace una solicitud de datos, ERDDAP™ lee rápidamente los archivos de registro pertinentes, aplica los cambios en el conjunto de datos en el orden que se hicieron, y luego filtra la solicitud a través de las restricciones del usuario como cualquier otro ERDDAP™ solicitud de datos. La partición de los datos en varios archivos de registro, el almacenamiento de varias piezas de información (por ejemplo, el timetamp del comando, y si el comando era .insert o .delete) , y diversos aspectos de la configuración del conjunto de datos, todos hacen posible ERDDAP para almacenar datos y recuperar datos de este conjunto de datos de forma muy rápida y eficiente.
     
#### Seguridad y Autor{#security-and-author} 
Cada comando .insert y .delete debe incluir &quot;author= *autor* como el último parámetro, donde autor\\_key está compuesto por el identificador del autor (elegiste: nombre, iniciales, pseudonym, número) , un subrayado, y una clave secreta. El ERDDAP™ administrador trabajará con los autores para generar la lista de valores válidos de autor\\_key, que se pueden cambiar en cualquier momento.
Cuando EDDTableDesdeHttpGet recibe un comando .insert o .delete, se asegura de que el autorID\\_key es el último parámetro y válido. Porque es el último parámetro, indica que toda la línea de comando alcanzada ERDDAP™ y no fue truncado. La clave secreta garantiza que sólo los autores específicos pueden insertar o eliminar datos en el conjunto de datos. ERDDAP™ entonces extrae al autorID y guarda eso en la variable autor, para que cualquiera pueda ver quién fue responsable de un cambio dado en el conjunto de datos.
.insert y .delete comandos sólo se puede hacer a través de https:   (seguro)   ERDDAP™ URLs. Esto asegura que la información que se transfiere se mantenga secreta durante el tránsito.
     
#### timetamp{#timestamp} 
Como parte del sistema de registro, EDDTableDesdeHtpGet añade un timetamp (el tiempo que ERDDAP recibida la solicitud) a cada comando que almacena en los archivos de registro. Porque... ERDDAP™ genera el timetamp, no los autores, no importa si diferentes autores están haciendo cambios de ordenadores con relojes fijados a tiempos ligeramente diferentes. El timetamp indica con fiabilidad el tiempo cuando el cambio se hizo al conjunto de datos.
     
#### HTTP POST{#http-post} 
*    ["¿Qué hay de HTTP POST?"](#http-post)   
HTTP [POST](https://en.wikipedia.org/wiki/POST_(HTTP) ) es la mejor alternativa (en comparación con HTTP GET ) para enviar información de un cliente a un servidor HTTP. Si usted puede, o si realmente desea mejorar la seguridad, utilice POST en lugar de GET para enviar la información a ERDDAP . POST es más seguro porque: con GET y https , la URL se transmite de forma segura, pero toda la URL (incluyendo parámetros, incluyendo el autor\\_key) será escrito a los Apache, Tomcat, y ERDDAP™ archivos de registro, donde alguien podría leerlos si los archivos no están correctamente protegidos. Con POST, los parámetros se transmiten de forma segura y no se escriben en los archivos de registro. POST es un poco más difícil para los clientes trabajar con y no es compatible con el software del cliente, pero los lenguajes de programación lo apoyan. El contenido que envía al conjunto de datos a través de GET o POST será el mismo, simplemente formateado de una manera diferente.
     
####  http Requiere Atributos mundiales{#httpgetrequiredvariables-global-attribute} 
Una parte esencial de lo que hace que todo este sistema funcione es el atributo global requerido http Requiere Variables, que es una lista separada por coma de la dataVariable nombres de fuentes que identifican una fila de datos. Esto debe ser lo más mínimo posible y casi siempre incluirá la variable de tiempo. Por ejemplo, aquí están las recomendaciones http Requiere Variables para cada una de las [CF Geometrías de muestreo discretos (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)   (Por supuesto, los nombres de identificación pueden ser diferentes en su conjunto de datos.) :

* Para TimeSeries: stationID , tiempo
* Para Trajectory: trayectoriaID, tiempo
* Para Perfil: tiempo (asumiendo tiempo es el perfil\\_id) , profundidad
* Para TimeSeries Perfil: stationID , tiempo (asumiendo tiempo es el perfil\\_id) , profundidad
* Para Trayectoria Perfil: trayectoria, tiempo (asumiendo tiempo es el perfil\\_id) , profundidad

    
Tomando TimeSeries como ejemplo:
Dado un comando .insert que incluye stationID =46088 y el tiempo=2016-06-23T19:53:00Z (y otros valores para otras variables) :
* Si no hay datos existentes para esa estación y esa vez, el efecto será añadir los datos al conjunto de datos.
* Si hay datos existentes para esa estación y esa vez, el efecto será reemplazar la fila de datos existente con estos nuevos datos. (Por supuesto, desde ERDDAP™ mantiene el registro de cada comando que recibe, los datos antiguos todavía están en el registro. Si un usuario solicita datos de una versión del conjunto de datos antes de este cambio, verá los datos más antiguos.)   
         
####  http GetDirectoryStructure{#httpgetdirectorystructure} 
*    [ http GetDirectory Estructura Atributo global y datos (Log) Nombres del archivo](#httpgetdirectorystructure)   
Parte de lo que hace que todo este sistema funcione eficientemente es que ERDDAP™ crea un conjunto de datos (log) archivos, cada uno con un trozo diferente del conjunto de datos. Si estos están bien preparados, ERDDAP™ será capaz de responder rápidamente a la mayoría de las solicitudes de datos. Esta configuración es especificada por el http GetDirectoryStructure atributo global, que es una cuerda que parece un nombre de archivo relativo, por ejemplo, " stationID /10años", pero es en realidad una especificación para la estructura del directorio. Las partes de eso indican cómo directorio y nombres de archivo para los datos (log) Los archivos serán construidos.
    
    * Si una parte es un entero (&gt;= 1) más un tiempoPeriod (millisecond, second, minute, hour, date, month, year, or their plurals) , por ejemplo, 10 años, luego el conjunto de datos EDDTableDesdeHttpGet tomará el valor de tiempo para la fila de datos (por ejemplo, 2016-06-23T19:53:00Z) , calcula el tiempo truncado a esa precisión (por ejemplo, 2010) , y hacer una carpeta o archivoName de eso.
        
El objetivo es conseguir un trozo razonablemente grande de datos en cada archivo, pero mucho menos de 2 GB.
        
    * De lo contrario, la parte de la especificación debe ser una dataVariable 's sourceName , por ejemplo, stationID . En este caso, EDDTableDesdeHttpGet hará una carpeta o nombre de archivo del valor de esa variable para la nueva fila de datos (por ejemplo, "46088") .
    
Debido a que los datos de comando .insert y .delete se almacenan en datos específicos (log) archivos, EDDTableDesdeHttpObtener normalmente sólo necesita abrir uno o unos pocos datos (log) archivos para encontrar los datos para una solicitud de usuario dada. Y porque cada dato (log) archivo tiene toda la información relevante para su parte del conjunto de datos, es rápido y fácil para EDDTableDesdeHttpObtener para hacer una versión específica (o la versión actual) del conjunto de datos para los datos en ese archivo (y no tiene que generar la versión solicitada de todo el conjunto de datos) .
    
Las directrices generales se basan en la cantidad y frecuencia de los datos. Si asumimos 100 bytes por fila de datos, entonces ...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
Por ejemplo, si la estructura del directorio es stationID /2 meses e insertar datos de dos estaciones (46088 y 46155) con valores de tiempo de diciembre de 2015 a mayo de 2016, EDDTable Get creará directorios nombrados 46088 y 46155 y creará archivos en cada nombre 2015-11 .json l, 2016-01 .json l, 2016-03 .json l, 2016-05 .json l (cada uno de los dos meses de información para la estación pertinente) . En cualquier momento en el futuro, si utiliza .insert o .delete para cambiar o eliminar los datos por, por ejemplo, la estación 46088 en 2016-04-05T14:45:00Z, EDDTableDesdeHtp Obtener el apéndice de ese comando a 46088/2016-03 .json l, los datos pertinentes (log) archivo. Y claramente, está bien añadir datos para otras estaciones en cualquier momento en el futuro, ya que el conjunto de datos simplemente creará directorios adicionales según sea necesario para mantener los datos de las nuevas estaciones.
    
####  http GetKeys{#httpgetkeys} 
Cada EDDTable DeHtp Obtener dataset debe tener un atributo global http GetKeys que especifica la lista de autores permitidos y sus claves secretas como una lista separada por coma de *autor* , por ejemplo, JohnSmith\\_someKey1, HOBOLogger\\_someKey2, QCScript59\\_someKey3 .
* autor\\_key's son sensibles a los casos y deben ser caracteres enteramente ASCII (#33 - #126, y sin ningún tipo de coma, "o ' caracteres
* Las claves son como contraseñas, por lo que deben ser 8 caracteres, difíciles de adivinar, y sin palabras de diccionario interno. Deberías tratarlos como tratar las contraseñas... mantenerlos privados.
* El primer personaje '\\_' separa al autor de la llave, por lo que el nombre del autor no puede incluir un '\\_' carácter (pero una llave puede) .
* Cualquier autor dado puede tener uno o más autor\\_key's, por ejemplo, JohnSmith\\_some Key1, JohnSmith\\_some Key7, etc.
* Puedes cambiar el valor de este atributo en cualquier momento. Los cambios tienen efecto la próxima vez que se carga el conjunto de datos.
* Esta información se eliminará de los atributos globales del conjunto de datos antes de que se haga público.
* Cada solicitud al conjunto de datos para insertar o eliminar datos debe incluir un &quot; autor= *autor* parámetro. Después de verificar la validez de la clave, ERDDAP™ sólo salva la parte del autor (no la clave) en el archivo de datos.

#### Configuración{#set-up} 

Aquí están los pasos recomendados para configurar un conjunto de datos EDDTableDesdeHtpGet:

1. Haga el directorio principal para mantener los datos de este conjunto de datos. Por este ejemplo, usemos /data/testGet/. El usuario ejecuta GenerateDatasetsXml y el usuario ejecuta ERDDAP™ ambos deben tener acceso de lectura-escritura a este directorio.
     
2. Utilice un editor de texto para hacer una muestra .json l archivo CSV con la extensión .json En ese directorio.
El nombre no es importante. Por ejemplo, podría llamarlo muestra .json l
Hacer una línea 2 .json l archivo CSV, con nombres de columna en la primera línea y valores dummy/típicos (del tipo de datos correcto) en la segunda línea. Aquí hay un archivo de muestra que es adecuado para una colección de featureType =TimeSeries datos que midieron la temperatura del aire y del agua.
     \\[ Para featureType Trayectoria, podría cambiar stationID para ser trayectoria. \\]   
     \\[ Para featureType =Perfil, podría cambiar stationID para ser perfilID y añadir una variable de profundidad. \\] 
    
     \\[ " stationID " "time" , "latitud", "longitud", "airTemp", "waterTemp", "timestamp", "author", "command" \\] 
     \\[ "myStation", "2018-06-25T17:00Z", 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, "SomeBody", 0 \\] 
    
Nota:
    * Los valores reales de datos no importan porque eventualmente eliminará este archivo, pero deben ser del tipo de datos correcto. Notablemente, la variable de tiempo debe utilizar el mismo formato que los datos reales de la fuente utilizarán.
    * Para todas las variables, sourceName igualará destinationName , por lo que utilice los nombres de variables correctos/finales ahora, incluyendo tiempo, latitud, longitud y a veces profundidad o altitud si se incluirán variables con esa información.
    * Casi siempre habrá una variable llamada tiempo que registra el tiempo que se hizo la observación. Puede ser dataType String con [unidades adecuadas para tiempos de cuerda](#string-time-units)   (por ejemplo, yyyy-MM-dd 'T'HH:mm:ss.SSSZ) o datos Tipo doble con [unidades adecuadas para tiempos numéricos](#time-units)   (por ejemplo, segundos desde 1970-01T00:00:00Z, o algún otro tiempo base) .
    * Tres de las columnas (usualmente los últimos tres) Debe ser un temporizador, autor, comando.
    * La columna timetamp será utilizada por EDDTableDesdeHttpObtenga añadir un timetamp indicando cuándo agregó una línea de datos determinada al archivo de datos. Tendrá datosType doble y unidades segundos desde 1970-01T00:00:00Z.
    * La columna autor con dataType String se utilizará para registrar qué autor autorizado proporcionó los datos de esta línea. Los autores autorizados son especificados por [ http Atributo global GetKeys](#httpgetkeys) . Aunque las teclas se especifican como *autor* y están en la URL "Solicitud" en ese formulario, sólo la parte del autor se guarda en el archivo de datos.
    * La columna de comandos con dataType byte indicará si los datos de esta línea son una inserción (0) o una supresión (1) .
         
3. Run GenerateDatasets Xml y díselo
    
    1. El tipo de conjunto de datos es EDDTableDesdeHtpGet
    2. El directorio es (para este ejemplo) /data/test Obtener/
    3. El archivo de muestra es (para este ejemplo) /data/testGet/startup .json l
    4. El http Requiere Variables (para este ejemplo)   stationID , tiempo Ver la descripción [ http RequisitosVariables](#httpgetrequiredvariables-global-attribute) abajo.
    5. Si los datos se recogen cada 5 minutos, http GetDirectoryStructure para este ejemplo es stationID 2 meses. Ver la descripción [ http GetDirectoryStructure](#httpgetdirectorystructure) abajo.
    6. El [ http GetKeys](#httpgetkeys) 
    
Añadir la salida (el pedazo de datasets.xml para el conjunto de datos) a datasets.xml .
     
4. Editar datasets.xml para que este conjunto de datos sea correcto y completo.
¿Notablemente, reemplazar a todos los? con contenido correcto.
     
5. Para el&lt;archivoTablaInMemory Establecer:
    * Establece esto a la verdad si el conjunto de datos por lo general conseguir frecuencia .insert y / o .delete solicitudes (por ejemplo, más a menudo que una vez cada 10 segundos) . Esto ayuda a EDDTableDesdeHttpObtener responder más rápido a .insert y/o .delete solicitudes. Si lo estableces a la verdad, EDDTableDesdeHtpGet seguirá guardando el archivoInformación útil y relacionada con el disco periódicamente (según sea necesario, aproximadamente cada 5 segundos) .
    * Pon esto a falso (por defecto) si el conjunto de datos se obtiene generalmente infrecuente .insert y / o .delete solicitudes (por ejemplo, menos de una vez cada 10 segundos) .
         
6. Nota: Es posible utilizar&lt;cacheDesde el usuario y ajustes relacionados datasets.xml para EDDTable DeHtp Obtenga conjuntos de datos como una manera de hacer y mantener una copia local de un EDDTable remotoDeHttpObtenga conjunto de datos en otro ERDDAP . Sin embargo, en este caso, este conjunto de datos local rechazará cualquier petición .insert y .delete.

#### Utilizando EDDTable DeHtpGet Datasets{#using-eddtablefromhttpget-datasets} 

* Los autores pueden hacer "requisitos" que [insertar datos o eliminar datos del conjunto de datos](#insert-and-delete) .
     
* Después de insertar datos reales en el conjunto de datos, puede y debe eliminar el archivo de datos de muestra original.
     
* Los usuarios pueden solicitar datos del conjunto de datos como lo hacen por cualquier otro conjunto de datos EDDTable en ERDDAP . Si la solicitud no incluye una limitación en la columna timetamp, entonces la solicitud obtiene datos de la versión actual del conjunto de datos (el archivo de registro después de procesar todos los comandos de inserción y eliminación y volver a surtir por el http RequisitosVariables) .
     
* Los usuarios también pueden hacer solicitudes específicas para EDDTableDesdeHtpObtener conjuntos de datos:
    * Si la solicitud incluye una&lt;o&lt;= limitación de la columna timetamp, entonces ERDDAP™ procesos filas del archivo de registro hasta el timetamp especificado. En efecto, esto elimina temporalmente todos los cambios realizados en el conjunto de datos desde ese valor de los tiempos. Para más información, consulte [Versión](#versioning) .
    * Si la solicitud incluye una columna de tiempo, por ejemplo, &gt;&lt;=0, entonces ERDDAP™ devuelve los datos de los archivos de datos como es, sin procesar los comandos de inserción y eliminación.
* En el futuro, imaginamos que se construirán herramientas (¿Por nosotros? ¿Por ti?) para trabajar con estos conjuntos de datos. Por ejemplo, podría haber un script que lea los archivos de registro bruto, aplica una ecuación de calibración diferente, y genera/actúa un conjunto de datos diferente con esa información derivada. Tenga en cuenta que el script puede obtener los datos originales a través de una solicitud para ERDDAP™   (que obtiene los datos en el formato de archivo que es más fácil para el script para trabajar con) y generar/actualizar el nuevo conjunto de datos vía .insert "requests" para ERDDAP . El script no necesita acceso directo a los archivos de datos; puede estar en la computadora de cualquier autor autorizado.
     

#### Información detallada sobre EDDTableDesdeHtpGet{#detailed-information-about-eddtablefromhttpget} 

Los temas son:

*    [¡No cambies la configuración&#33;](#dont-change-the-setup) 
*    [CRUD](#crud) 
*    [InvalidRequests](#invalidrequests) 
*    [Speed](#httpget-speed) 
*    [Robusto](#robust) 
*    [Confiabilidad del sistema](#system-reliability) 
*    [Versión](#versioning) 
*    ["¿Qué hay de HTTP PUT y DELETE?"](#https-put-and-delete) 
*    [Notas](#httpget-notes) 
*    [Gracias a CHORDS por la idea básica.](#thanks) 

Aquí está la información detallada:

##### ¡No cambies la configuración&#33;{#dont-change-the-setup} 
Una vez que se ha creado el conjunto de datos y se le han añadido datos:

* No agregue ni quite ninguna dataVariable s.
* No cambies el sourceName o destinationName de la dataVariable s.
* No cambies los datos Tipo de dataVariable s. Pero puedes cambiar el dataVariable Es metadatos.
* No cambies el http Requiere Variables atributo global.
* No cambies el http GetDirectoryStructure atributo global.

Si necesita cambiar alguna de estas cosas, haga un nuevo conjunto de datos y transfiera todos los datos al nuevo conjunto de datos.
     
##### CRUD{#crud} 
En la informática, los cuatro comandos fundamentales para trabajar con un conjunto de datos son [CREATE, READ, UPDATE, DELETE (CRUD) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) . SQL, el lenguaje para trabajar con bases de datos relacionales, tiene el equivalente en INSERT, SELECT, UPDATE y DELETE. En EDDTableDesdeHtpGet,

* .insert es una combinación de CREATE y UPDATE.
* .delete es DELETE.
* El sistema regular para solicitar subconjuntos de datos es READ.

Así, EDDTableDesdeHttpGet soporta todos los comandos fundamentales para trabajar con un conjunto de datos.
     
* .insert o .delete sin errores devolverá el código de estado HTTP=200 y un objeto JSON, por ejemplo,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
Los valores de dos tiempos se refieren al mismo milisegundo, que es el milisegundo que se almacenará en la variable timetamp para las filas de datos que fueron insertados o eliminados. ERDDAP™ No cambiará el nombre y el formato de estos pares de valor clave en el futuro. ERDDAP™ puede añadir pares adicionales de valor clave al objeto JSON en el futuro.
     
##### InvalidRequests{#invalidrequests} 
Las solicitudes inválidas .insert o .delete devolverán un código de estado de error HTTP aparte del estado=200 y no se realizará ningún cambio en el conjunto de datos. Esto incluye solicitudes con información incorrecta del autor, nombres de variables incorrectos, diferentes longitudes de array para diferentes variables, variables faltantes requeridas, valores variables faltantes, etc. Si la solicitud implica más de un archivo de datos, es posible que parte de la solicitud tenga éxito y parte fracasará. Sin embargo esto no debe ser un problema si el sensor que envía la solicitud trata cualquier fallo como un fracaso completo. Por ejemplo, si lo dices ERDDAP™ insertar (o eliminar) los mismos datos dos veces seguidas, el peor caso es que la información se almacena dos veces, juntos en el archivo de registro. Es difícil ver cómo eso podría causar problemas.
     
##### HtpGet Speed{#httpget-speed} 
Para .insert o .delete solicitudes (no contar http arriba) , el estadio de bolas figura la velocidad de .insert o .delete son
1ms por .insert con 1 fila de datos
2ms por .insert con 10 filas de datos en arrays ( \\[  \\] )   
3ms por .insert con 100 filas de datos en arrays ( \\[  \\] )   
13ms por .insert con 1000 filas de datos en arrays ( \\[  \\] )   
Claramente los arrays son la clave para [alto rendimiento](#httpget-speed) . Sin arrays, será difícil .insert o .delete más de 8 filas de datos por segundo de un autor remoto (por todo el sobrecabezamiento de la red) . Con arrays, será fácil .insert o .delete más de 1000 filas de datos por segundo de un sensor remoto.

Con cantidades muy grandes de datos por solicitud, llegará al límite de Tomcat a la longitud máxima de la consulta (¿Por defecto es 8KB?) , pero eso se puede aumentar editando el ajuste maxHtpHeaderSize en su *tomcat* /conf/server.xml HTTP/1.1 Entrada de conexión.

Cuando ERDDAP™ lee los datos de JSON Lines CSV (log) archivos, hay una pequeña penalización del tiempo en comparación con la lectura de archivos de datos binarios. Sentimos que esta pena de tiempo cuando la lectura era un precio razonable para pagar la velocidad y la robustez del sistema al escribir datos (que es de importancia primordial) .

##### SSD{#ssd} 
 [Para mayor velocidad,](#ssd) use a [Solid State Drive (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive) para almacenar los datos. Tienen un tiempo de acceso a archivos mucho más rápido (&lt;0.1ms) que unidades de disco duro (3 a 12 ms) . También tienen una tasa de transferencia de datos más rápida (200 - 2500 MB/s) que unidades de disco duro (~200 MB/s) . Su costo ha descendido considerablemente en los últimos años. Aunque la SSD temprana tuvo problemas después de un gran número de escritos a un bloque dado, este problema ahora se reduce considerablemente. Si simplemente usa el SSD para escribir los datos una vez entonces leerlo muchas veces, incluso un SSD de grado de consumo (que es considerablemente menos costoso que un SSD de nivel empresarial) debería durar mucho tiempo.
    
##### Robusto{#robust} 
Hemos tratado de hacer este sistema lo más fácil de trabajar con y lo más robusto posible.
* El sistema está diseñado para tener múltiples hilos (por ejemplo, el sensor, un script QC automatizado y un humano) simultáneamente trabajando en el mismo conjunto de datos e incluso el mismo archivo. Gran parte de esto se hace posible utilizando un enfoque de archivo de registro para almacenar los datos y utilizando un tipo de archivo muy simple, [JSON Líneas Archivos CSV](https://jsonlines.org/examples/) Para almacenar los datos.
* Otra gran ventaja para JSON Lines CSV es que si un archivo se corrompe (por ejemplo, inválido debido a un error en una línea) , es fácil abrir el archivo en un editor de texto y solucionar el problema.
* Otra ventaja es, si hay un error en una línea en un archivo, el sistema todavía puede leer todos los datos en líneas antes y después de la línea de error. Y el sistema todavía puede registrar información adicional .insert y .delete.
* Una gran ventaja de usar archivos estándar accesibles por administración (comparado con una base de datos relacional o Cassandra u otro software) : No hay otro software que tenga que mantenerse y que tenga que estar funcionando para almacenar o recuperar datos. Y es fácil respaldar archivos estándar en cualquier momento y de manera incremental porque los datos están en pedazos (después de un tiempo, sólo el archivo actual para cada estación estará cambiando) . Por el contrario, se necesita un esfuerzo considerable y tiempo para hacer archivos de respaldo externos de bases de datos y de Cassandra.
         
##### Confiabilidad del sistema{#system-reliability} 
Es razonable esperar un servidor con ERDDAP™ para tener 99,9% de horas de trabajo, eso es unas 9 horas de tiempo de inactividad al año (¡Aunque puedes usar eso en una mala noche&#33;) .
Si usted es diligente y afortunado, usted puede obtener 99.99% de tiempo de trabajo (53 minutos por año) , ya que sólo unos pocos reinicios para actualizaciones tardarán tanto tiempo.
Tendría que tomar medidas extremas (un servidor de respaldo separado, fuente de alimentación ininterrumpida, aire acondicionado de respaldo, personal 24x7x365 para monitorear el sitio, etc.) para tener una pequeña oportunidad en 99,999% (5.25 minutos por año) . Incluso entonces, es extremadamente improbable que usted alcanzará 99,999% de tiempo de trabajo (o incluso 99,99%) porque los problemas a menudo están fuera de su control. Por ejemplo, Amazon Web Service y Google ofrecen servicios web asombrosamente fiables, pero las grandes secciones de ellos a veces se reducen durante horas.

Enfréntalo, todo el mundo quiere ERDDAP™ para tener el 100% de tiempo de trabajo, o al menos el vaunted "seis nueves" (99.9999% de tiempo de inactividad equivale a 32 segundos de inactividad por año) Pero no hay manera de que lo consigas sin importar cuánto tiempo, esfuerzo y dinero gastas.

Pero... ERDDAP™ El tiempo libre no es el objetivo real aquí. El objetivo es construir una confianza **sistema** Uno que no pierde datos. Este es un problema solucionable.

La solución es: construir la tolerancia de falla en el software informático que está enviando los datos a ERDDAP . Específicamente, ese software debe mantener una cola de datos esperando para ir a ERDDAP . Cuando los datos se agregan a la cola, el software debe comprobar la respuesta de ERDDAP . Si la respuesta no incluye los datos recibidos. No hay errores, entonces el software debe dejar los datos en la cola. Cuando se generan más datos y se añaden a la cola, el software debe intentar de nuevo .insertar los datos en la cola (quizás con el \\[  \\] sistema) . Tendrá éxito o fallará. Si falla, lo intentará más tarde. Si escribes el software para trabajar de esta manera y si el software está preparado para colar unos pocos días de datos, en realidad tienes una buena oportunidad de subir el 100% de los datos del sensor a ERDDAP . Y lo habrás hecho sin ir a un gran esfuerzo o gasto.

 \\[ Antecedentes: No lo pensamos. [Así es como las redes informáticas logran la fiabilidad.](https://en.wikipedia.org/wiki/Reliability_(computer_networking) ) Las redes informáticas son inherentemente poco fiables. Así que cuando transfiere un archivo de una computadora a otra, el software de envío sabe/expectos que algunos paquetes pueden perderse. Si no recibe un reconocimiento adecuado para un paquete dado del receptor, reenvia el paquete perdido. Con este enfoque, el software relativamente simple de remitente y receptor puede construir un sistema de transferencia de archivos confiable en la parte superior de una red poco confiable. \\] 
    
##### ¿Por qué JSON Lines archivos CSV?&#33;{#why-json-lines-csv-files} 
EDDTableDesdeHtpObtén usos [JSON Líneas Archivos CSV](https://jsonlines.org/examples/) . para almacenar los datos. Las razones son:

* La razón principal es: La simplicidad de los archivos JSON Lines CSV ofrece una manera rápida, fácil y confiable para permitir que varios hilos escriban a un archivo dado (por ejemplo, sincronizando el nombre de archivo) .
* Si un archivo JSON Lines CSV alguna vez se corrompió (por ejemplo, inválido debido a un error en una línea) , EDDTableDesdeHttpGet todavía podría leer todos los datos de todas las líneas antes y después de la línea de error. Y el sistema .insert y .delete podría seguir agregando nuevos datos al archivo de datos.
* Debido a que los archivos JSON Lines CSV son archivos ASCII, si un archivo alguna vez se corrompió, sería fácil de arreglar (en un editor de texto) .
* JSON Lines CSV soporta Cadenas Unicode.
* JSON Lines CSV admite cadenas de longitud variable (no limitado a una cierta longitud máxima) .
* JSON Lines CSV admite enteros de 64 bits (longs) .
* La naturaleza formal y la sintaxis extra de JSON Lines CSV (vs old school CSV) proporciona cierta seguridad extra de que una línea dada no ha sido corrompida.

Inicialmente intentamos usar .nc 3 archivos con una dimensión ilimitada. Sin embargo, hubo problemas:

* El problema principal era: No hay manera confiable de permitir que varios hilos escriban a un .nc 3 archivo, incluso si los hilos cooperan haciendo los escritos de una manera sincronizada.
* Si .nc 3 archivo se corrompe, el sistema .insert y .delete no puede continuar utilizando el archivo.
* Porque... .nc 3 archivos son binarios, si un archivo se corrompe (que hacen debido al problema de la lectura múltiple) son extremadamente difíciles o imposibles de arreglar. No hay herramientas para ayudar con la reparación.
* CF no tiene manera de especificar la codificación de cadenas, por lo que no hay forma oficial de apoyar Unicode, por ejemplo, la codificación UTF-8. Tratamos de conseguir que CF soporte un atributo \\_Encoding pero no pudieron hacer ningún progreso. ( Unidata , a su crédito, apoya el atributo \\_Encoding.) 
*    .nc 3 archivos solo soportan cadenas de longitud fija. De nuevo, intentamos conseguir CF y Unidata para soportar cadenas de longitud variable pero no pudieron realizar ningún progreso.
*    .nc 3 archivos no admiten una manera fácil de distinguir variables de caracteres individuales de variables String. De nuevo, intentamos conseguir CF y Unidata apoyar un sistema para distinguir estos dos tipos de datos, pero no pudieron avanzar.
*    .nc 3 archivos solo admiten caracteres de 8 bits con una codificación no especificada. De nuevo, intentamos conseguir CF y Unidata apoyar un sistema para especificar la codificación, pero no pudieron avanzar.
*    .nc 3 archivos no admiten enteros de 64 bits (longs) . De nuevo, intentamos conseguir CF y Unidata apoyar un sistema durante largos años, pero no pudieron avanzar.
         
##### Versión{#versioning} 
Porque EDDTable DeHtp Obtenga un registro de todos los cambios en el conjunto de datos con el timetamp y el autor de cada cambio, puede recrear rápidamente ese conjunto de datos a partir de cualquier punto en el tiempo. En cierto sentido, hay una versión para cualquier punto en el tiempo. Si la solicitud de datos de un usuario incluye un timetamp&lt;= limitación, por ejemplo, &amp; timestamp&lt;=2016-06-23T16:32:22.128Z (o cualquier punto de tiempo) , pero ninguna limitación de autor o comando, ERDDAP™ responderá a la solicitud generando primero una versión del conjunto de datos a partir de ese punto en el tiempo. Entonces, ERDDAP™ aplica las otras restricciones del usuario, como con cualquier otra solicitud de datos de ERDDAP . EDDTableDesdeHttpGet se establece para que este proceso sea muy rápido y eficiente, incluso para conjuntos de datos muy grandes.

Del mismo modo, un usuario puede averiguar cuándo el conjunto de datos fue actualizado por última vez solicitando ...?timestamp (timetamp) Distinct () 

Y para cualquier solicitud de datos, para cualquier versión del conjunto de datos, los usuarios pueden ver qué autor hizo los cambios y cuándo los hicieron.

Este sistema de versión permite [Reproducible Science](https://en.wikipedia.org/wiki/Reproducibility) porque cualquiera, en cualquier momento, puede solicitar datos de la versión del conjunto de datos en cualquier momento. Esta versión fina no es posible con cualquier otro sistema que conozcamos. El mecanismo subyacente es muy eficiente, ya que no se necesita espacio de almacenamiento adicional, y la sobrecarga de procesamiento es realmente mínima.

No todo el mundo necesita este tipo de versión fina, pero es extremadamente útil, tal vez necesario, en el contexto de una gran organización de gestión de datos (por ejemplo, OOI, Earth Cube, Data One y NOAA 's NCEI) donde un conjunto de datos puede tener múltiples autores (por ejemplo, el sensor, un script QC automatizado y un editor humano) .

 \\[ Historia: La necesidad de este tipo de versión surgió primero para mí (Bob) al leer sobre OOI y discutirlo en 2008. En ese momento, OOI tenía un sistema engorroso, lento e ineficiente para la versión basada en Git. Git es genial para lo que fue diseñado, pero no esto. En 2008, mientras que en una discusión de OOI, diseñé un amplio y eficiente sistema alternativo a OOI para la gestión de datos, incluyendo muchas de las características que he añadido a ERDDAP™ desde entonces, e incluyendo este sistema de versión. En ese momento y desde entonces, la OOI estaba comprometida con su sistema de versión y no estaba interesada en alternativas. En 2016, otros aspectos de este plan cayeron y empecé a implementarlo. Porque hubo muchas interrupciones para trabajar en otros proyectos, no terminé hasta 2018. Incluso ahora, no soy consciente de ningún otro sistema de datos científicos que ofrezca un acceso tan rápido y fácil a una versión de los datos desde cualquier punto en el tiempo, para cambiar frecuentemente los conjuntos de datos. Los sistemas de archivos simples no ofrecen esto. Las bases de datos relacionales no. Cassandra no. \\] 
    
##### HTTPS Put and Delete{#https-put-and-delete} 
*    ["¿Qué hay de HTTPS PUT y DELETE?"](#https-put-and-delete)   
     [Protocolo de transferencia de hipertexto (HTTP) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) es la base de la World Wide Web y la razón por la que las URL de la página web comienzan con "http://"o "https://". HTTPS es HTTP con una capa de seguridad adicional. Cada día, los navegadores, scripts y programas informáticos hacen miles de millones de HTTP (S)   **#** solicitudes para obtener información de fuentes remotas. HTTP (S) también incluye otros [verbos](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) , notablemente PUT (para empujar datos al servidor) y DELETE (a datos DELETE del servidor) . Sí, PUT y DELETE son la forma adecuada de insertar datos y eliminar datos de un conjunto de datos a través de HTTP (S) . GET es compatible con cada pieza de software que puede funcionar con HTTP (S) . Obtener es muy fácil de trabajar con. Todos ya saben trabajar con GET y muchos saben usar POST (que se puede utilizar en esencia de la misma manera que GET) , así que hicimos EDDTableDesdeHtpObtenga trabajo con GET y POST. Muy pocas personas (incluso pocos programadores informáticos) han trabajado con PUT y DELETE. PUT y DELETE son generalmente sólo compatibles con lenguajes de ordenador, por lo que utilizarlos requiere un programa hábil. Así que PUT y DELETE son generalmente un enfoque mucho más engorroso dada la forma en que las herramientas han evolucionado.
     
##### HtpGet Notes{#httpget-notes} 
*    [Notas](#httpget-notes) 
    * No dataVariable puede tener datosType=char. Use datosType=String en su lugar. Si realmente necesitas datosType=char, email Chris. John en Noaa.gov.
         
##### Gracias.{#thanks} 
*    [Gracias a CHORDS por la idea básica.](#thanks)   
La idea básica para EDDTableDesdeHtpGet (i.e., usando un HTTP GET solicitud de añadir datos a un conjunto de datos) es de UCAR (¿NCAR?)   [Servicios de datos en tiempo real protegidos por la nube (CHORDS) ](https://github.com/earthcubeprojects-chords) proyecto. El formato para los parámetros de la solicitud (repetido *nombre=valor* , separados por) es el mismo formato estándar que se utiliza por formularios HTML en las páginas web. Es una idea simple y brillante y aún más porque se mete tan perfectamente con ERDDAP 's sistema existente para tratar con datos tabulares. La idea es obvia, pero yo (Bob) No lo pensé. EDDTableDesdeHtp Obtener usos de esa idea básica, combinado con nuestras ideas de cómo implementarla, para hacer un sistema en ERDDAP™ para cargar datos. Aparte de la idea básica de utilizar GET para introducir datos en el sistema, la implementación EDDTableDesdeHttpGet es completamente diferente e independiente de CHORDS y tiene características diferentes (por ejemplo, archivos de registro, reabastecimiento de datos, sistema de seguridad diferente, soporte CRUD, datos reproducibles) . Nuestra exposición a CHORDS era sólo un webinar. No miramos su código ni leíamos sobre su proyecto porque inmediatamente sabíamos que queríamos implementar el sistema de una manera diferente. Pero les estamos agradecidos por la idea básica. La referencia completa a los CHORDS es
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D. S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014) . Servicios de datos en tiempo real para las geociencias (CHORDS) software. UCAR/NCAR - Laboratorio de Observación de la Tierra. [https://doi.org/10.5065/d6v1236q](https://doi.org/10.5065/d6v1236q)   
     
### EDDTableDesde Hyrax Archivos{#eddtablefromhyraxfiles} 
 [ **EDDTableDesde Hyrax Archivos** ](#eddtablefromhyraxfiles)   (deprecated) agrega archivos de datos con varias variables, cada una con una o más dimensiones compartidas (por ejemplo, tiempo, altitud (o profundidad) , latitud, longitud) , y servido por un [ Hyrax   OPeNDAP servidor](https://www.opendap.org/software/hyrax-data-server) .

* Este tipo de dataset es **DEPRECATED** . La solución más nueva y general es utilizar la [cache FromUrl opción para EDDTable DeFiles](#cachefromurl)   (o una variante) , que hace una copia local de los archivos remotos y sirve los datos de los archivos locales. El&lt;cacheDesde la opción de usuario se puede utilizar con cualquier tipo de archivo de datos tabulares. **   
Si no puedes hacer que funcione por alguna razón, envía un correo electrónico a Chris. John en Noaa.gov.
Si no hay quejas antes de 2020, este tipo de conjunto de datos puede ser eliminado. ** 
* Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puedes editarlo para ajustarlo.
* En la mayoría de los casos, cada archivo tiene múltiples valores para el más izquierdo (primera) dimensión, por ejemplo, tiempo.
* Los archivos a menudo (pero no tienes que) tienen un único valor para las otras dimensiones (por ejemplo, altitud (o profundidad) , latitud, longitud) .
* Los archivos pueden tener variables de carácter con una dimensión adicional (por ejemplo, nCharacters) .
*    Hyrax Los servidores pueden ser identificados por los "/dods-bin/nph-dods/" o "/opendap/" en la URL.
* Esta pantalla de clase... Hyrax páginas web con las listas de archivos en cada directorio. Debido a esto, es muy específico para el formato actual de Hyrax páginas web. Intentaremos ajustarnos ERDDAP™ rápidamente si/cuando versiones futuras Hyrax cambiar cómo se enumeran los archivos.
* El&lt;archivoSe ignora el ajuste Dir relación. Desde que esta clase descarga y hace una copia local de cada archivo de datos remoto, ERDDAP™ fuerza el archivo Dir para ser *bigParentDirectory* /copia/ * datasetID * /.
* Para&lt; sourceUrl √, utilice la URL del directorio base del conjunto de datos en el Hyrax servidor, por ejemplo,
    &lt; sourceUrl ■http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/&lt;/ sourceUrl ■
     (pero ponlo en una línea)   (Lo siento, ese servidor ya no está disponible) .
El sourceUrl página web generalmente tiene " OPeNDAP Índice de servidor \\[ directorioName \\] "en la parte superior.
* Puesto que esta clase siempre descarga y hace una copia local de cada archivo de datos remoto, nunca debe envolver este conjunto de datos en [EDDTableCopy](#eddtablecopy) .
* Mira la superclase de esta clase, [EDDTableDeFiles](#eddtablefromfiles) , para información sobre cómo funciona esta clase y cómo utilizarla.
* Vea los ejemplos 1D, 2D, 3D y 4D para [EDDTableDesdeNcFiles](#eddtablefromncfiles) .
     
### EDDTableDesdeInvalidCRAFiles{#eddtablefrominvalidcrafiles} 
 [ **EDDTableDesdeInvalidCRAFiles** ](#eddtablefrominvalidcrafiles) datos agregados de NetCDF   (v3 o v4)   .nc archivos que utilizan una variante específica, inválida, de la CF DSG Contiguous Ragged Array (CRA) archivos. Aunque ERDDAP™ soporta este tipo de archivo, es un tipo de archivo inválido que nadie debe comenzar a usar. Grupos que actualmente utilizan este tipo de archivo se alienta encarecidamente a utilizar ERDDAP™ para generar archivos CF DSG CRA válidos y dejar de usar estos archivos.

Detalles: Estos archivos tienen múltiples variables de fila\\_size, cada una con un atributo de muestra\\_dimension. Los archivos no son archivos estándar de CF porque la muestra múltiple (obs) las dimensiones deben ser decodificadas y relacionadas entre sí con esta regla adicional y prometer que no es parte de la especificación CF DSG: "puede asociar un determinado por ejemplo, valor de temperatura (temp\\_obs dimension) con un valor de profundidad dado (z\\_obs dimension, la dimensión con los más valores) , porque: la línea de temperatura \\_size (para un yeso dado) será 0 o igual a la fila de profundidad correspondiente\\_size (para ese yeso)   (esa es la regla) . Así que, si la hilera de temperatura\\_size no es 0, entonces los valores de temperatura n para ese yeso se relacionan directamente con los valores de profundidad n para ese yeso (esa es la promesa) ."

Otro problema con estos archivos: la variable Principal\\_Investigator no tiene un atributo de muestra\\_dimension y no sigue la regla anterior.

Los archivos de muestra para este tipo de conjunto de datos se pueden encontrar enhttps://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[ 2020-10-21 Este servidor ya no está disponible \\] .

Mira la superclase de esta clase, [EDDTableDeFiles](#eddtablefromfiles) , para información sobre cómo funciona esta clase y cómo utilizarla.

Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puedes editarlo para ajustarlo.

Lo primero es GenerarDatasets Xml hace para este tipo de conjunto de datos después de responder las preguntas es imprimir la estructura similar al ncdump del archivo de muestra. Así que si entras unas cuantas respuestas rápidas para el primer bucle a través de GenerateDatasets Xml, al menos podrás ver si ERDDAP™ puede leer el archivo y ver qué dimensiones y variables están en el archivo. Entonces usted puede dar mejores respuestas para el segundo bucle a través de GenerateDatasetsXml.
 
### EDDTableDesdeJsonlCSVFiles{#eddtablefromjsonlcsvfiles} 
 [ **EDDTableDesdeJsonlCSVFiles** ](#eddtablefromjsonlcsvfiles) datos agregados de [JSON Líneas Archivos CSV](https://jsonlines.org/examples/) . Mira la superclase de esta clase, [EDDTableDeFiles](#eddtablefromfiles) , para información sobre cómo funciona esta clase y cómo utilizarla.

* Como dice jsonlines.org, este formato es "Mejor que CSV" (y legalmente, como empleado federal, no puedo estar de acuerdo o no estar de acuerdo con ellos... ¿qué locura es eso?) . CSV nunca se ha definido formalmente y se ve obstaculizado por el equipaje histórico relacionado con su conexión con los programas de hoja de cálculo original. JSON Lines CSV, en comparación, está completamente definido y se beneficia de su conexión con el estándar JSON ampliamente utilizado, que a su vez se beneficia de su conexión a Java Script y Java . Notablemente, hay soporte completo para enteros largos y para caracteres Unicode en cuerdas, y una manera clara de incluir otros caracteres especiales (notables pestañas y nuevas líneas) dentro de cuerdas.
    
Este formato es particularmente bueno para los conjuntos de datos donde necesita anexar periódicamente filas adicionales al final de un archivo de datos dado. Por esa razón y otros (véase supra) , [EDDTableDesdeHtpGet](#eddtablefromhttpget) utiliza archivos Json Lines CSV para el almacenamiento de datos.
    
* Los archivos de entrada se supone que están codificados por UTF-8. Sin embargo, dada la \\u *♪♪* formato para la codificación de caracteres especiales (por ejemplo, \\u20ac es la codificación para el carácter Euro) , tiene la opción de escribir los archivos para que contengan sólo caracteres ASCII de 7 bits utilizando \\u *♪♪* para codificar todos los caracteres arriba #127.
     
* Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puedes editarlo para ajustarlo.
    
Lo primero que GenerateDatasetsXml hace para este tipo de conjunto de datos después de responder las preguntas es imprimir la estructura similar al ncdump del archivo de muestra. Así que si entras unas cuantas respuestas rápidas para el primer bucle a través de GenerateDatasets Xml, al menos podrás ver si ERDDAP™ puede leer el archivo y ver qué dimensiones y variables están en el archivo. Entonces usted puede dar mejores respuestas para el segundo bucle a través de GenerateDatasetsXml.
    
* ¿Cuándo? ERDDAP™ lee JSON Líneas archivos de datos CSV, si encuentra un error en una línea determinada (por ejemplo, número incorrecto de artículos) , registra un mensaje de advertencia ("WARNING: Bad line (s) de datos" ... con una lista de las malas líneas en líneas posteriores) a la [log.txt file](/docs/server-admin/additional-information#log) y luego sigue leyendo el resto del archivo de datos. Por lo tanto, es su responsabilidad mirar periódicamente (o escribir un script para hacerlo) para ese mensaje en el registro. txt para que pueda solucionar los problemas en los archivos de datos. ERDDAP™ se establece de esta manera para que los usuarios puedan seguir leyendo todos los datos válidos disponibles aunque algunas líneas del archivo tengan defectos.
     
### EDDTableDesdeMultidimNcFiles{#eddtablefrommultidimncfiles} 
 [ **EDDTableDesdeMultidimNcFiles** ](#eddtablefrommultidimncfiles) datos agregados de NetCDF   (v3 o v4)   .nc   (o [ .nc ml](#ncml-files) ) archivos con varias variables, cada una con una o más dimensiones compartidas. Los archivos pueden tener variables de carácter con o sin una dimensión adicional (por ejemplo, STRING14) . Mira la superclase de esta clase, [EDDTableDeFiles](#eddtablefromfiles) , para información sobre cómo funciona esta clase y cómo utilizarla.

* Si los archivos son variantes CF DSG multidimensionales, utilice este tipo de conjunto de datos en lugar de [EDDTableDesdeNcCFFiles](#eddtablefromncfiles) .
     
* Para nuevos conjuntos de datos tabulares de .nc archivos, utilizar esta opción antes de probar el más antiguo [EDDTableDesdeNcFiles](#eddtablefromncfiles) . Algunas ventajas de esta clase son:
    * Esta clase puede leer más variables de una variedad más amplia de estructuras de archivos. Si especifica DimensionesCSV (a lista separada de nombres de dimensión por coma) en GenerateDatasets Xml (o&lt;DimensionesCSV datasets.xml Información para uno de estos conjuntos de datos), entonces ERDDAP™ sólo leerá variables en los archivos fuente que utilizan algunas o todas estas dimensiones, además de todas las variables escalar. Si una dimensión está en un grupo, debe especificar su nombre completo, por ejemplo, " *groupName/dimensionName* ".
    * Esta clase a menudo puede rechazar archivos muy rápidamente si no coinciden con las limitaciones de una solicitud. Así que la lectura de datos de grandes colecciones a menudo va mucho más rápido.
    * Esta clase maneja verdaderas variables char (variables no relacionadas con el sistema) correctamente.
    * Esta clase puede recortar las variables String cuando el creador no usó Netcdf-java's writeStrings (que anexa char #0 para marcar el final de la cadena) .
    * Esta clase es mejor en tratar con archivos individuales que carecen de ciertas variables o dimensiones.
    * Esta clase puede eliminar bloques de filas con valores perdidos según se especifica [CF Geometrías de muestreo discretos (DSG) Archivos multidimensionales incompletos](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)   
         
* Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puedes editarlo para ajustarlo.
    
Lo primero que GenerateDatasetsXml hace para este tipo de conjunto de datos después de responder las preguntas es imprimir la estructura similar al ncdump del archivo de muestra. Así que si entras unas cuantas respuestas rápidas para el primer bucle a través de GenerateDatasets Xml, al menos podrás ver si ERDDAP™ puede leer el archivo y ver qué dimensiones y variables están en el archivo. Entonces usted puede dar mejores respuestas para el segundo bucle a través de GenerateDatasetsXml.
    
Grupo -- GenerarDatasets Xml pedirá un "Grupo". Usted puede entrar "" para que busque cualquier / todos los grupos, " *algunos Grupo* "o" *algunosGroup/someSubGroup* "para que busque un grupo específico, o " \\[ root \\] "para que busque sólo el grupo raíz. La cadena "Group" se convierte en&lt;en el grupo datasets.xml info para el conjunto de datos (aunque " \\[ root \\] "se convierte en "") .
    
DimensionesCSV - GenerarDatasets Xml pedirá una cadena "DimensionesCSV". Esta es una lista de valores separados por coma de nombres de fuente de un conjunto de dimensiones. GenerarDatasets Xml sólo leerá variables de datos en la muestra .nc archivos que usan algunas o todas esas dimensiones (y ninguna otra dimensión) , además de todas las variables de escalar en el archivo, y hacer el conjunto de datos de esas variables de datos. Si una dimensión está en un grupo, debe especificar su nombre completo, por ejemplo, " *groupName/dimensionName* ".
Si no especifica nada (una cuerda vacía) , GenerarDatasets Xml buscará las variables con las más dimensiones, en la teoría de que serán las más interesantes, pero puede haber momentos en que desea hacer un conjunto de datos de algún otro grupo de variables de datos que usen algún otro grupo de dimensiones.
Si simplemente especifica un nombre de dimensión que no existe (por ejemplo, NO\\_MATCH) , ERDDAP™ encontrará todas las variables de escalar.
La cadena "DimensionesCSV" se convierte en&lt;DimensionesCSV datasets.xml Información para el conjunto de datos.
    
#### dimensionesAs{#treatdimensionsas} 
Hay una categoría de inválido .nc archivos (porque no siguen las reglas del CF) que tienen múltiples dimensiones (por ejemplo, lat, lon, time) cuando deberían haber usado sólo una dimensión (por ejemplo, tiempo) , por ejemplo:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
EDDTableDeMultidimNcFiles tiene una característica especial para tratar estos archivos: si agrega el atributo global "treatDimensionsAs" a los conjuntos de datos globales addAttributes , puedes decir ERDDAP™ tratar ciertas dimensiones (por ejemplo, lat y Lon) como si fueran otra dimensión (por ejemplo, tiempo) . El valor de atributo debe ser una lista separada de coma especificando las dimensiones "de" y luego la dimensión "a", por ejemplo,
 <att name="treatDimensionsAs"> lat, lon, time </att>   
Entonces... ERDDAP™ leerá el archivo como si fuera:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
Por supuesto, el tamaño actual de cada una de las dimensiones de la lista debe ser el mismo; de lo contrario, ERDDAP™ tratará el archivo como un "Bad File".

Tenga en cuenta que estos archivos son inválidos porque no siguen las reglas CF. Así que... ERDDAP™ podemos leerlos, recomendamos encarecidamente que no cree archivos como este porque otras herramientas de software basadas en CF no podrán leerlos correctamente. Si ya tiene tales archivos, recomendamos encarecidamente reemplazarlos con archivos válidos tan pronto como sea posible.
    
### EDDTableDesdeNcFiles{#eddtablefromncfiles} 
 [ **EDDTableDesdeNcFiles** ](#eddtablefromncfiles) datos agregados de NetCDF   (v3 o v4)   .nc   (o [ .nc ml](#ncml-files) ) archivos y [Zarr](https://github.com/zarr-developers/zarr-python) archivos (a la versión 2.25) con varias variables, cada una con una dimensión compartida (por ejemplo, tiempo) o más de una dimensión compartida (por ejemplo, tiempo, altitud (o profundidad) , latitud, longitud) . Los archivos deben tener los mismos nombres de dimensión. Un archivo dado puede tener múltiples valores para cada una de las dimensiones y los valores pueden ser diferentes en diferentes archivos fuente. Los archivos pueden tener variables de carácter con una dimensión adicional (por ejemplo, STRING14) . Mira la superclase de esta clase, [EDDTableDeFiles](#eddtablefromfiles) , para información sobre cómo funciona esta clase y cómo utilizarla.

Los archivos Zarr tienen un comportamiento ligeramente diferente y requieren el archivoNameRegex o la rutaRegex para incluir "zarr".

* Si .nc Los archivos usan uno de los [CF Geometrías de muestreo discretos (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) formatos de archivo, intenta usar [EDDTableDesdeNcCFFiles](#eddtablefromncfiles) antes de intentarlo.
     
* Para nuevos conjuntos de datos tabulares de .nc archivos, prueba el nuevo [EDDTableDesdeMultidimNcFiles](#eddtablefrommultidimncfiles) primero.
     
* Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puedes editarlo para ajustarlo.
    
Lo primero que GenerateDatasetsXml hace para este tipo de conjunto de datos después de responder las preguntas es imprimir la estructura similar al ncdump del archivo de muestra. Así que si entras unas cuantas respuestas rápidas para el primer bucle a través de GenerateDatasets Xml, al menos podrás ver si ERDDAP™ puede leer el archivo y ver qué dimensiones y variables están en el archivo. Entonces usted puede dar mejores respuestas para el segundo bucle a través de GenerateDatasetsXml.
    
DimensionesCSV - GenerarDatasets Xml pedirá una cadena "DimensionesCSV". Esta es una lista de valores separados por coma de nombres de fuente de un conjunto de dimensiones. GenerarDatasets Xml encontrará las variables de datos en el .nc archivos que utilizan algunas o todas esas dimensiones, además de todas las variables de escalar, y hacer el conjunto de datos de esas variables de datos. Si no especifica nada (una cuerda vacía) , GenerarDatasets Xml buscará las variables con las más dimensiones, en la teoría de que serán las más interesantes, pero puede haber momentos en que desea hacer un conjunto de datos de algún otro grupo de variables de datos que usen algún otro grupo de dimensiones.
    
* Ejemplo 1D: Los archivos 1D son algo diferentes de archivos 2D, 3D, 4D, ....
    * Podrías tener un conjunto de .nc archivos de datos donde cada archivo tiene un mes de datos de una boya de deriva.
    * Cada archivo tendrá 1 dimensión, por ejemplo, tiempo (tamaño = \\[ muchos \\] ) .
    * Cada archivo tendrá una o más variables 1D que utilizan esa dimensión, por ejemplo, tiempo, longitud, latitud, temperatura del aire, ....
    * Cada archivo puede tener variables de caracteres 2D, por ejemplo, con dimensiones (tiempo,nCharacters) .
         
* Ejemplo 2D:
    * Podrías tener un conjunto de .nc archivos de datos donde cada archivo tiene un mes de datos de una boya de deriva.
    * Cada archivo tendrá 2 dimensiones, por ejemplo, tiempo (tamaño = \\[ muchos \\] ) y id (tamaño = 1) .
    * Cada archivo tendrá 2 variables 1D con los mismos nombres que las dimensiones y utilizando la misma dimensión, por ejemplo, tiempo (tiempo) , id (id) . Estas variables 1D deben incluirse en la lista&lt; dataVariable El nombre está en el XML del conjunto de datos.
    * Cada archivo tendrá una o más variables 2D, por ejemplo, longitud, latitud, temperatura del aire, temperatura del agua, ...
    * Cada archivo puede tener variables de caracteres 3D, por ejemplo, con dimensiones (tiempo,id,nCharacters) .
         
* Ejemplo 3D:
    * Podrías tener un conjunto de .nc archivos de datos donde cada archivo tiene un mes de datos de una boya estacionaria.
    * Cada archivo tendrá 3 dimensiones, por ejemplo, tiempo (tamaño = \\[ muchos \\] ) , lat (tamaño = 1) , y Lon (tamaño = 1) .
    * Cada archivo tendrá 3 variables 1D con los mismos nombres que las dimensiones y utilizando la misma dimensión, por ejemplo, tiempo (tiempo) , lat (lat) , lon (Lon) . Estas variables 1D deben incluirse en la lista&lt; dataVariable El nombre está en el XML del conjunto de datos.
    * Cada archivo tendrá una o más variables 3D, por ejemplo, temperatura del aire, ...
    * Cada archivo puede tener variables de caracteres 4D, por ejemplo, con dimensiones (tiempo, lat,lon,nCharacters) .
    * El nombre del archivo podría tener el nombre de la boya dentro del nombre del archivo.
         
* Ejemplo 4D:
    * Podrías tener un conjunto de .nc archivos de datos donde cada archivo tiene un mes de datos de una estación. En cada momento, la estación toma lecturas en una serie de profundidades.
    * Cada archivo tendrá 4 dimensiones, por ejemplo, tiempo (tamaño = \\[ muchos \\] ) , profundidad (tamaño = \\[ muchos \\] ) , lat (tamaño = 1) , y Lon (tamaño = 1) .
    * Cada archivo tendrá 4 variables 1D con los mismos nombres que las dimensiones y utilizando la misma dimensión, por ejemplo, tiempo (tiempo) , profundidad (profundidad) , lat (lat) , lon (Lon) . Estas variables 1D deben incluirse en la lista&lt; dataVariable El nombre está en el XML del conjunto de datos.
    * Cada archivo tendrá una o más variables 4D, por ejemplo, temperatura del aire, ...
    * Cada archivo puede tener variables de caracteres 5D, por ejemplo, con dimensiones (tiempo, profundo, lat,lon,nCharacters) .
    * El nombre del archivo podría tener el nombre de la boya dentro del nombre del archivo.
         
### EDDTableDesdeNcCFFiles{#eddtablefromnccffiles} 
 [ **EDDTableDesdeNcCFFiles** ](#eddtablefromnccffiles) datos agregados de datos de NetCDF   (v3 o v4)   .nc   (o [ .nc ml](#ncml-files) ) archivos que utilizan uno de los formatos de archivo especificados por [CF Geometrías de muestreo discretos (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) convenciones. Mira la superclase de esta clase, [EDDTableDeFiles](#eddtablefromfiles) , para información sobre cómo funciona esta clase y cómo utilizarla.

Para archivos usando una de las variantes CF DSG multidimensionales, use [EDDTableDesdeMultidimNcFiles](#eddtablefrommultidimncfiles) en lugar de eso.

Las convenciones CF DSG definen docenas de formatos de archivo e incluyen numerosas variaciones menores. Esta clase se ocupa de todas las variaciones que somos conscientes, pero podemos haber perdido una (o más) . Así que si esta clase no puede leer datos de sus archivos CF DSG, por favor [para obtener apoyo adicional](/docs/intro#support) .

Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puedes editarlo para ajustarlo.
 
### EDDTableDesdeNccsvFiles{#eddtablefromnccsvfiles} 
 [ **EDDTableDesdeNccsvFiles** ](#eddtablefromnccsvfiles) datos agregados de [NCCSV](/docs/user/nccsv-1.00) Archivos ASCII .csv. Mira la superclase de esta clase, [EDDTableDeFiles](#eddtablefromfiles) , para información sobre cómo funciona esta clase y cómo utilizarla.

* Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puedes editarlo para ajustarlo.
    
Lo primero que GenerateDatasetsXml hace para este tipo de conjunto de datos después de responder las preguntas es imprimir la estructura similar al ncdump del archivo de muestra. Así que si entras unas cuantas respuestas rápidas para el primer bucle a través de GenerateDatasets Xml, al menos podrás ver si ERDDAP™ puede leer el archivo y ver qué dimensiones y variables están en el archivo. Entonces usted puede dar mejores respuestas para el segundo bucle a través de GenerateDatasetsXml.
    
* ¿Cuándo? ERDDAP™ lee archivos de datos NCCSV, si encuentra un error en una línea determinada (por ejemplo, número incorrecto de artículos) , registra un mensaje de advertencia ("WARNING: Bad line (s) de datos" ... con una lista de las malas líneas en líneas posteriores) a la [log.txt file](/docs/server-admin/additional-information#log) y luego sigue leyendo el resto del archivo de datos. Por lo tanto, es su responsabilidad mirar periódicamente (o escribir un script para hacerlo) para ese mensaje en el registro. txt para que pueda solucionar los problemas en los archivos de datos. ERDDAP™ se establece de esta manera para que los usuarios puedan seguir leyendo todos los datos válidos disponibles aunque algunas líneas del archivo tengan defectos.
     
### EDDTableDesdenos{#eddtablefromnos} 
 [ **EDDTableDesdenos** ](#eddtablefromnos)   (DEPRECATED) maneja datos de un NOAA   [NOS](https://opendap.co-ops.nos.noaa.gov/axis/) fuente, que utiliza [ SOAP+XML ](https://www.w3schools.com/xml/xml_soap.asp) para solicitudes y respuestas. Es muy específico NOAA XML de NOS. Vea el conjunto de datos EDDTableDesdeNOS en datasets2.xml.
 
### EDDTableDesde OBIS{#eddtablefromobis} 
 [ **EDDTableDesde OBIS** ](#eddtablefromobis) maneja datos de un Sistema de Información Biogeográfica Ocean (OBIS) servidor (erahttp://www.iobis.org ) . Es posible que no haya más servidores activos que usen este tipo actual de sistema de servidor OBIS fuera de la fecha.

* Los servidores OBIS esperan una solicitud XML y devuelven una respuesta XML.
* Porque todos los servidores OBIS sirven las mismas variables de la misma manera (erahttp://iobis.org/tech/provider/questions) , usted no tiene que especificar mucho para configurar un conjunto de datos OBIS en ERDDAP .
* Debes incluir un " creator\\_email "atributo en el mundo addAttributes , ya que esa información se utiliza dentro de la licencia. Una dirección de correo electrónico adecuada se puede encontrar leyendo la respuesta XML de la fuenteURL.
* Usted puede o no ser capaz de obtener el atributo global [&lt; subsetVariables &gt; (#subsetvariables) trabajar con un servidor OBIS dado. Si lo intentas, prueba una variable (por ejemplo, ScientificName o Genus) .
#### EDDTableDesde OBIS skeleton XML{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableDesdeParquetFiles{#eddtablefromparquetfiles} 
 [ **EDDTableDesdeParquetFiles** ](#eddtablefromparquetfiles) maneja datos de [Parquet](https://parquet.apache.org/) . Mira la superclase de esta clase, [EDDTableDeFiles](#eddtablefromfiles) , para información sobre cómo funciona esta clase y cómo utilizarla.

* Parquet está diseñado para comprimir muy eficientemente, por lo que puede darle tamaños de archivo más pequeños que otros formatos.
* Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puedes editarlo para ajustarlo.
* ¿Cuándo? ERDDAP™ lee los archivos de datos de Parquet, si encuentra un error en una línea determinada (por ejemplo, número incorrecto de artículos) , registra un mensaje de advertencia ("WARNING: Bad line (s) de datos" ... con una lista de las malas líneas en líneas posteriores) a la [log.txt file](/docs/server-admin/additional-information#log) y luego sigue leyendo el resto del archivo de datos. Por lo tanto, es su responsabilidad mirar periódicamente (o escribir un script para hacerlo) para ese mensaje en el registro. txt para que pueda solucionar los problemas en los archivos de datos. ERDDAP™ se establece de esta manera para que los usuarios puedan seguir leyendo todos los datos válidos disponibles aunque algunas líneas del archivo tengan defectos.
     
### EDDTableDesde SOS  {#eddtablefromsos} 
 [ **EDDTableDesde SOS ** ](#eddtablefromsos) maneja datos de un servicio de observación de sensores (SWE/ [ SOS ](https://www.ogc.org/standards/sos) ) servidor.

* Este tipo de conjunto de datos agrega datos de un grupo de estaciones que todos son atendidos por uno SOS servidor.
* Todas las estaciones sirven el mismo conjunto de variables (aunque la fuente de cada estación no tiene que servir todas las variables) .
*    SOS Los servidores esperan una solicitud XML y devuelven una respuesta XML.
* Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puedes editarlo para ajustarlo. No es fácil generar el XML de conjunto de datos para SOS conjuntos de datos a mano. Para encontrar la información necesaria, debe visitar sourceUrl ¿ +? servicio= SOS &quot; Request= GetCapabilities "en un navegador; mira el XML; haz una solicitud de GetObservation a mano; y mira la respuesta XML a la solicitud.
* Con la adición ocasional de nuevos tipos de SOS servidores y cambios en los antiguos servidores, se está haciendo más difícil para ERDDAP™ para detectar automáticamente el tipo de servidor de las respuestas del servidor. El uso de&lt;sosServerType (con un valor de IOOS\\_NDBC, IOOS\\_NOS, OOSTethys , o WHOI) está ahora estrictamente recomendado. Si tiene problemas con cualquier conjunto de datos de este tipo, intente re-running GenerateDatasets Xml para el SOS servidor. Generar Datasets Xml te permitirá probar los diferentes&lt;sosServerType confiar opciones hasta que encuentre el correcto para un servidor dado.
*    SOS panorama general:
    * SWE (Capacidad del sensor Web) y SOS   (Servicio de observación de sensores) son [Normas OpenGIS®](https://www.ogc.org/standards) . Ese sitio web tiene los documentos de normas.
    * El OGC Servicios Web Especificación común ver 1.1.0 ( OGC 06-121r3) cubre la construcción de las consultas GET y POST (véase la sección 7.2.3 y la sección 9) .
    * Si envías una solicitud de getCapabilities xml a una SOS servidor ( sourceUrl + "servicio= SOS &quot; Request= GetCapabilities ") , obtiene un resultado xml con una lista de estaciones y el observado Propiedades para las que tienen datos.
    * Una protección observada es una referencia formal de URI a una propiedad. Por ejemplo, urn:ogc:phenomenon:longitud:wgs84 ohttps://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
    * Una protección observada no es una variable.
    * Más de una variable puede tener la misma observación Propiedad (por ejemplo, dentro de Temp y fuera La temperatura podría haber observado Propiedadhttps://mmisw.org/ont/cf/parameter/air\\_temperature) .
    * Si envía una solicitud de observación xml a una SOS servidor, obtiene un resultado xml con descripciones de nombres de campo en la respuesta, unidades de campo y los datos. Los nombres de campo incluyen longitud, latitud, profundidad (quizás) , y tiempo.
    * Cada uno dataVariable para un EDDTableDesde SOS debe incluir un atributo "observadoProperty", que identifica la compatibilidad observada que debe ser solicitada desde el servidor para obtener esa variable. A menudo, varios dataVariable s listará el mismo compuesto observadoProperty.
    * El tipo de datos para cada uno dataVariable puede no ser especificado por el servidor. Si es así, debe mirar las respuestas de datos XML del servidor y asignar apropiada [&lt;dataType títulos] (#datatype) en el ERDDAP™ Dataset dataVariable definiciones.
    *    (En el momento de escribir esto) algunos SOS servidores responden a solicitudes de observación para más de uno observado Propiedad sólo volviendo los resultados para el primero de las garantías observadas. (¡No hay mensaje de error&#33;) Ver la solicitud del parámetro constructor ObservadosPropiedadesSeparadamente.
* EDDTableDesde SOS automáticamente añade
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
a los atributos globales del conjunto de datos cuando se crea el conjunto de datos.
*    SOS servidores generalmente expresa [unidades](#units) con el [UCUM](https://unitsofmeasure.org/ucum.html) sistema. La mayoría ERDDAP™ servidores Express unidades con los [ UDUNITS ](https://www.unidata.ucar.edu/software/udunits/) sistema. Si necesita convertir entre los dos sistemas, puede utilizar [ ERDDAP 's servicio web para convertir unidades UCUM a / desde UDUNITS ](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) .
#### EDDTableDesde SOS skeleton XML{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableDeThreddsFiles{#eddtablefromthreddsfiles} 
 [ **EDDTableDeThreddsFiles** ](#eddtablefromthreddsfiles)   (deprecated) agrega archivos de datos con varias variables, cada una con una o más dimensiones compartidas (por ejemplo, tiempo, altitud (o profundidad) , latitud, longitud) , y servido por un [THREDDS OPeNDAP servidor](https://www.unidata.ucar.edu/software/tds/) .

* Este tipo de dataset es **DEPRECATED** . La solución más nueva y general es utilizar la [cache FromUrl opción para EDDTable DeFiles](#cachefromurl)   (o una variante) , que hace una copia local de los archivos remotos y sirve los datos de los archivos locales. El&lt;cacheDesde la opciónUrl confianza se puede utilizar con cualquier tipo de archivo de datos tabulares de cualquier fuente basada en la web que publique una lista de archivos como directorio. **   
Si no puedes hacer que funcione por alguna razón, envía un correo electrónico a Chris. John en Noaa.gov.
Si no hay quejas antes de 2020, este tipo de conjunto de datos puede ser eliminado. ** 
* Recomendamos encarecidamente utilizar el [GenerarDatasets Programa Xml](#generatedatasetsxml) para hacer un borrador duro del datasets.xml para este conjunto de datos. Puedes editarlo para ajustarlo.
* En la mayoría de los casos, cada archivo tiene múltiples valores para el más izquierdo (primera) dimensión, por ejemplo, tiempo.
* Los archivos a menudo (pero no tienes que) tienen un único valor para las otras dimensiones (por ejemplo, altitud (o profundidad) , latitud, longitud) .
* Los archivos pueden tener variables de carácter con una dimensión adicional (por ejemplo, nCharacters) .
* Los servidores THREDDS pueden ser identificados por los "/thredds/" en las URLs. Por ejemplo,
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* Los servidores THREDDS tienen catálogos en varios lugares. Esta clase REQUIERE que la URL incluye "/redds/catalog/". Por lo general puede encontrar esta variable comenzando en un navegador en el catálogo de raíz, y luego haciendo clic a través del subcatalog deseado.
* Esta clase lee los archivos catalog.xml servidos por THREDDS con las listas de&lt;catalogRefs confía (referencias a sub-files adicionales catalog.xml) y&lt;dataset (archivos de datos) .
* El&lt;archivoSe ignora el ajuste Dir relación. Desde que esta clase descarga y hace una copia local de cada archivo de datos remoto, ERDDAP™ fuerza el archivo Dir para ser *bigParentDirectory* /copia/ * datasetID * /.
* Para&lt; sourceUrl √, utilice la URL del archivo catalog.xml para el conjunto de datos en el servidor THREDDS, por ejemplo: para esta URL que se puede utilizar en un navegador web,
    https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[ 2020-10-21 Este servidor ya no está disponible de forma fiable. \\] ,
uso&lt; sourceUrl ■https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml&lt;/ sourceUrl ■
     (pero ponlo en una línea) .
* Puesto que esta clase siempre descarga y hace una copia local de cada archivo de datos remoto, nunca debe envolver este conjunto de datos en [EDDTableCopy](#eddtablecopy) .
* Este tipo de conjunto de datos soporta una etiqueta especial OPTIONAL, rara vez usada,&lt;specialMode titulado *modo* &lt;/especialModeilo que se puede utilizar para especificar que las reglas especiales y codificadas deben utilizarse para determinar qué archivos deben ser descargados desde el servidor. Actualmente, el único válido *modo* es SAMOS que se utiliza con conjuntos de datos dehttps://tds.coaps.fsu.edu/thredds/catalog/samospara descargar sólo los archivos con el último número de versión.
* Mira la superclase de esta clase, [EDDTableDeFiles](#eddtablefromfiles) , para información sobre cómo funciona esta clase y cómo utilizarla.
* Vea los ejemplos 1D, 2D, 3D y 4D para [EDDTableDesdeNcFiles](#eddtablefromncfiles) .
     
### EDDTableDesde WFS Archivos{#eddtablefromwfsfiles} 
 [ **EDDTableDesde WFS Archivos** ](#eddtablefromwfsfiles)   (DEPRECATED) hace una copia local de todos los datos de una ArcGIS MapServer WFS servidor para que los datos puedan ser reservidos rápidamente ERDDAP™ usuarios.

* Necesita especificar un formato especialmente sourceUrl atributo global para decir ERDDAP™ cómo solicitar información de características desde el servidor. Por favor utilice este ejemplo como plantilla:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (pero lo puso todo en una línea) 
* Necesita agregar un atributo global especial para decir ERDDAP™ cómo identificar los nombres de los fragmentos de datos que deben descargarse. Esto probablemente funcionará para todo EDDTableDesde WFS Datasets de archivos:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Puesto que esta clase siempre descarga y hace una copia local de cada archivo de datos remoto, nunca debe envolver este conjunto de datos en [EDDTableCopy](#eddtablecopy) .
* Mira la superclase de esta clase, [EDDTableDeFiles](#eddtablefromfiles) , para información adicional sobre cómo funciona esta clase y cómo utilizarla.
     
### EDDTableAggregateRows{#eddtableaggregaterows} 
 [ **EDDTableAggregateRows** ](#eddtableaggregaterows) puede hacer un conjunto de datos EDDTable de un grupo de conjuntos de datos EDDTable "niño".

* Aquí están algunos usos para EDDTableAggregateRows:
    * Usted podría hacer un conjunto de datos EDDTableAggregateRows de dos tipos diferentes de archivos o fuentes de datos, por ejemplo, un conjunto de datos con datos hasta finales del mes pasado almacenados en .nc Archivos CF y un conjunto de datos con datos para el mes actual almacenados en una base de datos relacional.
    * Usted podría hacer un conjunto de datos EDDTableAggregateRows para tratar con un cambio en los archivos fuente (por ejemplo, el formato del tiempo cambió, o un nombre variable cambió, o los datos Tipo/ scale\\_factor / add\\_offset cambiado) . En este caso, un niño obtendría datos de los archivos realizados antes del cambio y el otro niño obtendría datos de los archivos hechos después del cambio. Este uso de EDDTableAggregateRows es una alternativa al uso [NcML](#ncml-files) o [ NCO ](#netcdf-operators-nco) . A menos que haya una característica distintiva en los nombres de archivo (para que pueda utilizar&lt;fileNameRegex Principal para determinar qué archivo pertenece a qué conjunto de datos de niños), es probable que necesite almacenar los archivos para los dos conjuntos de datos de niños en diferentes directorios.
    * Usted podría hacer un conjunto de datos EDDTableAggregateRows que tiene un subconjunto compartido de variables de uno o más conjuntos de datos similares pero diferentes, por ejemplo, un conjunto de datos que hace un conjunto de datos de perfil desde la combinación de un conjunto de datos de perfil, un conjunto de datos de TimeSeriesProfile y un conjunto de datos TrajectoryProfile (que tienen algunas variables diferentes y algunas variables en común - en cuyo caso tendrá que hacer variantes especiales para los conjuntos de datos infantiles, con sólo las variables en común) .
    * Usted podría tener varios conjuntos de datos independientes, cada uno con el mismo tipo de datos pero desde una estación diferente. Usted podría dejar intactos esos conjuntos de datos, pero también crear un conjunto de datos EDDTableAggregateRows que tenga datos de todas las estaciones - cada uno de los conjuntos de datos de niños podría ser un simple [EDDTableDeErddap](#eddfromerddap) , que apunta a uno de los conjuntos de datos existentes de la estación. Si haces esto, da a cada uno de los datasets EDDTableDesdeErddap un diferente datasetID que los conjuntos de datos independientes originales, por ejemplo, appending "Child" al original datasetID .
* Cada niño&lt;dataset especificado por Inteligente debe ser un conjunto completo de datos, como si fuera un conjunto de datos independiente. Cada uno debe tener el mismo [ dataVariable s](#datavariable) , en el mismo orden, con el mismo [ destinationName s](#destinationname) , [datos Tipos](#datatype) , [ missing\\_value s](#missing_value) , [\\_FillValues](#missing_value) , y [unidades](#units) . Los metadatos para cada variable para el conjunto de datos EDDTableAggregateRows provienen de variables en el primer conjunto de datos infantil, pero EDDTableAggregateRows actualizará el conjunto de datos [ actual\\_range ](#actual_range) metadatos para ser el rango real para todos los niños.
* Recomendación: Obtenga cada uno de los conjuntos de datos infantiles trabajando como conjuntos de datos independientes. Entonces trate de hacer el conjunto de datos EDDTableAggregateRows cortando y pegando el datasets.xml para cada uno en el nuevo EDDTableAggregate Filas Dataset.
* Dataset Default Sort Order... El orden de los conjuntos de datos del niño determina el orden general por defecto de los resultados. Por supuesto, los usuarios pueden solicitar una orden de tipo diferente para un determinado conjunto de resultados mediante el gasto &quot; orderBy  (" *lista separada de variables* ") hasta el final de su consulta.
* El "fuente" [mundial Atributos](#global-attributes) para el EDDTableAggregateRows es el conjunto globalAtributos del primer conjunto de datos infantil. El EDDTableAggregate Rows puede tener un global&lt; addAttributes &gt; proporcionar atributos globales adicionales o anular los atributos globales fuente.
#### EDDTableAggregate Rows skeleton XML{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableCopy{#eddtablecopy} 
 [ **EDDTableCopy** ](#eddtablecopy) puede hacer una copia local de muchos tipos de conjuntos de datos EDDTable y luego reservar los datos rápidamente de la copia local.

* EDDTableCopy (y para datos de la red, [ EDDGrid Copiado](#eddgridcopy) ) es un uso muy fácil y muy eficaz **solución a algunos de los mayores problemas con el servicio de datos de fuentes de datos remotas:** 
    * El acceso a los datos de una fuente remota de datos puede ser lento.
        * Pueden ser lentos porque son inherentemente lentos (por ejemplo, un tipo ineficiente de servidor) ,
        * porque están abrumados por demasiadas peticiones,
        * o porque su servidor o el servidor remoto es limitado por ancho de banda.
    * El conjunto de datos remoto a veces no está disponible (de nuevo, por diversas razones) .
    * Confiar en una fuente para los datos no escala bien (por ejemplo, cuando muchos usuarios y muchos ERDDAP s utilizarlo) .
         
* Cómo funciona - EDDTableCopy resuelve estos problemas haciendo y manteniendo automáticamente una copia local de los datos y sirviendo datos de la copia local. ERDDAP™ puede servir datos de la copia local muy, muy rápidamente. Y hacer y usar una copia local alivia la carga en el servidor remoto. Y la copia local es una copia de seguridad del original, que es útil en caso de que algo le suceda al original.
    
No hay nada nuevo sobre hacer una copia local de un conjunto de datos. Lo nuevo aquí es que esta clase lo hace\\*fácil\\*crear y crear\\*mantener\\*una copia local de los datos de\\*variedad\\*de tipos de fuentes de datos remotas y\\*añadir metadatos\\*mientras copia los datos.
    
#### EDDTableCopy vs&lt;cacheDesde el punto de contacto;{#eddtablecopy-vs-cachefromurl} 
&lt;cacheDesde el usuario es una alternativa a EDDTableCopy. Trabajan de manera diferente.

* EDDTable Copiar obras solicitando trozos de datos de un servicio remoto y almacenando esos trozos en archivos locales. Por lo tanto, EDDTableCopy es útil en algunos casos donde los datos son accesibles a través de un servicio remoto.
* [&lt;cacheDesde el usuario] (#cachefromurl) descarga los archivos existentes listados en un sitio web remoto.&lt;cacheDesde el usuario es más fácil de usar y más confiable, ya que se puede saber fácilmente cuando hay un nuevo archivo de datos remoto o cuando un archivo de datos remoto ha cambiado y por lo tanto necesita ser descargado.

Si hay situaciones donde EDDTableCopy o&lt;cacheDesde el usuario puede usarse, use&lt;cacheDesde el usuario, porque es más fácil y más confiable.
     
#### &lt;ExtractoDestinación Nombres{#extractdestinationnames} 
EDDTable Copia hace la copia local de los datos solicitando fragmentos de datos del conjunto de datos remoto. EDDTable Copia determina qué pedazos para solicitar mediante la solicitud del destino () valores para&lt;extractDestinationNames (especificado en datasets.xml , ver abajo) , que son los nombres de destino separados del espacio de variables en el conjunto de datos remoto. Por ejemplo,
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
podría producir combinaciones de valores distintos de derivador=tig17,profile=1017, drifter=tig17,profile=1095, ... drifter=une12,profile=1223, drifter=une12,profile=1251, ....

En situaciones donde una columna (por ejemplo, perfil) puede ser todo lo que se requiere para identificar un grupo de filas de datos, si hay un número muy grande de, por ejemplo, perfiles, puede ser útil también especificar un extracto adicional Destino Nombre (por ejemplo, derivador) que sirve para subdivider los perfiles. Esto conduce a menos archivos de datos en un directorio dado, que puede conducir a un acceso más rápido.
    
#### Archivos locales{#local-files} 
Cada trozo de datos se almacena en un NetCDF archivo en un subdirectorio de *bigParentDirectory* /copia/ * datasetID * / (según se especifica en [setup.xml](/docs/server-admin/deploy-install#setupxml) ) . Hay un nivel de subdirectorio para todos excepto el último extractoDestinationName. Por ejemplo, los datos para tig17+1017 se almacenarían en
     *bigParentDirectory* /copia / muestreoDataset/tig17/1017 .nc .
Por ejemplo, los datos para une12+1251, se almacenarían en
     *bigParentDirectory* /copia / muestreoDataset/une12/1251 .nc .
Directorio y nombres de archivos creados a partir de los valores de datos se modifican para hacer que sean seguros de archivos (por ejemplo, los espacios son reemplazados por "x20") - Esto no afecta los datos reales.
     
#### Nuevos datos{#new-data} 
Cada vez EDDTable Copia se recarga, se comprueba el conjunto de datos remoto para ver qué pedazos distintos están disponibles. Si el archivo para un trozo de datos ya no existe, una solicitud para conseguir el trozo se añade a una cola. ERDDAP 's taskThread procesa todas las solicitudes solicitadas para fragmentos de datos, uno por uno. Usted puede ver estadísticas para la tareaLa actividad del pan en la [Página](/docs/server-admin/additional-information#status-page) y en el [Daily Report](/docs/server-admin/additional-information#daily-report) . (Sí, ERDDAP™ podría asignar múltiples tareas a este proceso, pero que utilizaría un montón de ancho de banda, memoria y tiempo de CPU de la fuente remota de datos, y muchos de los locales ERDDAP Es el tiempo de ancho de banda, memoria y CPU, ninguno de los cuales es una buena idea.) 
    
NOTA: La primera vez que se carga un EDDTableCopy, (si todo va bien) Muchas solicitudes de fragmentos de datos se añadirán a la cola de tareaThread, pero no se crearán archivos de datos locales. Así que el constructor fallará pero taskThread seguirá trabajando y crear archivos locales. Si todo va bien, la tareaThread hará algunos archivos de datos locales y el próximo intento de volver a cargar el conjunto de datos (en ~15 minutos) tendrá éxito, pero inicialmente con una cantidad muy limitada de datos.
    
NOTA: Después del conjunto de datos local tiene algunos datos y aparece en su ERDDAP , si el conjunto de datos remoto es temporal o permanentemente no accesible, el conjunto de datos local seguirá funcionando.
    
ADVERTENCIA: Si el conjunto de datos remoto es grande y/o el servidor remoto es lento (Ese es el problema, ¿no?) , tardará mucho en hacer una copia local completa. En algunos casos, el tiempo necesario será inaceptable. Por ejemplo, transmitiendo 1 TB de datos sobre una línea T1 (0,15 GB/s) lleva al menos 60 días, en condiciones óptimas. Además, utiliza mucho ancho de banda, memoria y tiempo de CPU en las computadoras remotas y locales. La solución es enviar un disco duro al administrador del conjunto remoto de datos para que pueda hacer una copia del conjunto de datos y enviar el disco duro de vuelta a usted. Utilice esos datos como punto de partida y EDDTableCopy añadirá datos a ella. (Así es como el Servicio Cloud EC2 de Amazon solía manejar el problema, aunque su sistema tiene mucha ancho de banda.) 
    
ADVERTENCIA: Si una combinación determinada de valores desaparece de un conjunto de datos remoto, EDDTableCopy NO elimina el archivo copiado local. Si quieres, puedes eliminarlo tú mismo.
    
#### TableCopy&lt;checkSourceData pacientegt;{#tablecopy-checksourcedata} 
El datasets.xml para este conjunto de datos puede tener una etiqueta opcional
```
    <checkSourceData>true</checkSourceData>  
```
El valor predeterminado es cierto. Si/cuando lo estableces en falso, el conjunto de datos nunca comprobará el conjunto de datos fuente para ver si hay datos adicionales disponibles.
     
#### Uso recomendado{#recommended-use} 
1. Crear el&lt;dataset entrada (el tipo nativo, no EDDTableCopy) para la fuente remota de datos. **Haz que funcione correctamente, incluyendo todos los metadatos deseados.** 
2. Si es demasiado lento, agregue código XML para envolverlo en un conjunto de datos EDDTableCopy.
    * Use un diferente datasetID   (quizás cambiando el datasetID del viejo datasetID ligeramente) .
    * Copiar&lt;accesible Para confiar,&lt;reloadEveryNMinutes confianza y&lt;onChange Conf desde el XML remoto de EDDTable hasta el XML de EDDTableCopy. (Sus valores para la materia EDDTableCopy; sus valores para el conjunto de datos interno se vuelven irrelevantes.) 
    * Crear el&lt;extractDestinationNames confianza tag (véase supra) .
    *   &lt;orderExtractByilo es una lista separada del espacio OPTIONAL de nombres de variables de destino en el conjunto de datos remoto. Cuando cada fragmento de datos se descarga desde el servidor remoto, el trozo se resolverá por estas variables (por la primera variable, luego por la segunda variable si la primera variable está atada, ...) . En algunos casos, ERDDAP™ será capaz de extraer datos más rápido de los archivos de datos locales si la primera variable en la lista es una variable numérica ( "time" cuenta como una variable numérica) . Pero escoge estas variables de una manera apropiada para el conjunto de datos.
3.   ERDDAP™ hará y mantendrá una copia local de los datos.
         
* ATENCIÓN: EDDTableCopy asume que los valores de datos para cada trozo no cambian nunca. Si/cuando lo hacen, usted necesita eliminar manualmente los archivos de la ranura en *bigParentDirectory* /copia/ * datasetID * / que cambió y [bandera](/docs/server-admin/additional-information#flag) el conjunto de datos a ser recargado para que los trozos eliminados sean reemplazados. Si tiene una suscripción de correo electrónico al conjunto de datos, obtendrá dos emails: uno cuando el conjunto de datos se recarga y comienza a copiar los datos, y otro cuando el conjunto de datos se carga de nuevo (automáticamente) y detecta los nuevos archivos de datos locales.
     
* Cambio de metadatos -- Si necesitas cambiar algo addAttributes o cambiar el orden de las variables asociadas con el conjunto de datos fuente:
    1. Cambiar el addAttributes para el conjunto de datos fuente datasets.xml , según sea necesario.
    2. Eliminar uno de los archivos copiados.
    3. Establecer un [bandera](/docs/server-admin/additional-information#flag) para volver a cargar el conjunto de datos inmediatamente. Si utilizas una bandera y tienes una suscripción de correo electrónico al conjunto de datos, recibirás dos emails: uno cuando el conjunto de datos vuelva a cargar y comience a copiar los datos, y otro cuando el conjunto de datos se carga de nuevo. (automáticamente) y detecta los nuevos archivos de datos locales.
    4. El archivo eliminado se regenerará con los nuevos metadatos. Si el conjunto de datos fuente no está disponible, el conjunto de datos EDDTableCopy obtendrá metadatos del archivo regenerado, ya que es el archivo más joven.
         
*    [ EDDGrid Copiado](#eddgridcopy) es muy similar a EDDTableCopy, pero trabaja con conjuntos de datos redondeados.
#### EDDTableCopy esqueleto XML{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- -

## Detalles{#details-1} 

Aquí hay descripciones detalladas de etiquetas y atributos comunes.

### &lt;angularDegreeUnits implicagt;{#angulardegreeunits} 
* [ ** &lt;angularDegreeUnits confiar ** ] (#angulardegreeunits) es una etiqueta OPTIONAL raramente utilizada dentro de un&lt;erddapDatasets tag en datasets.xml que contiene una lista separada por coma de cadenas de unidades que ERDDAP™ debe tratar como unidades de grados angulares. Si una variable tiene una de estas unidades, tabledap 's orderByMean filtro calculará el medio de una manera especial, luego reportará el medio como un valor de -180 a 180. See ERDDAP 's EDStatic.java archivo de código fuente para la lista predeterminada actual. Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) .
### &lt;angularDegreeTrueUnits{#angulardegreetrueunits} 
* [ ** &lt;angular angular DegreeTrueUnits titulada ** ] (#angulardegreetrueunits) es una etiqueta OPTIONAL raramente utilizada dentro de un&lt;erddapDatasets tag en datasets.xml que contiene una lista separada por coma de cadenas de unidades que ERDDAP™ debe tratar como unidades de verdad de grados angulares. Si una variable tiene una de estas unidades, tabledap 's orderByMean filtro calculará el medio de una manera especial, luego reportará el medio como un valor de 0 a 360. See ERDDAP 's EDStatic.java archivo fuente para la lista predeterminada actual. Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) .
     
### &lt;commonStandardNames{#commonstandardnames} 
* [ ** &lt;commonStandardNames ** ] (#commonstandardnames) es una etiqueta OPTIONAL raramente utilizada dentro de un&lt;erddapDatasets tag en datasets.xml para especificar una lista separada por coma de común [CF nombres estándar](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) . Por ejemplo,
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Esta lista se utiliza en DataProviderForm3.html como una comodidad para los usuarios.
Si desea proporcionar esta información en datasets.xml , empezar por copiar la lista predeterminada actual en&lt;DEFAULT\\_commonStandardNames dentro ERDDAP 's
 \\[ tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file.
     
### &lt;cacheMinutes{#cacheminutes} 
* [ ** &lt;cacheMinutes ** ] (#cacheminutes) es una etiqueta OPTIONAL raramente utilizada dentro de un&lt;erddapDatasets tag en datasets.xml para especificar la edad (en minutos) en que los archivos en el caché deben ser eliminados (default=60) . Por ejemplo,
```
    <cacheMinutes>60</cacheMinutes>  
```
En general, sólo archivos de imagen (porque las mismas imágenes son solicitadas repetidamente) y .nc archivos (porque deben ser completamente creados antes de enviar al usuario) están caché. Aunque podría parecer que una petición dada siempre debe devolver la misma respuesta, eso no es verdad. Por ejemplo, a tabledap solicitud que incluye tiempo *algunos Hora* cambiará cuando lleguen nuevos datos para el conjunto de datos. Y una solicitud de cuadrícula que incluye \\[ último \\] para la dimensión del tiempo cambiará cuando lleguen nuevos datos para el conjunto de datos. Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) . Antes ERDDAP™ v2.00, esto se especificó en setup.xml, que todavía está permitido pero desalentado.

### &lt;cacheClearMinutes sensible;{#cacheclearminutes} 
* [ ** &lt;cacheClearMinutes ** ] (#cacheclearminutes) es una etiqueta OPTIONAL raramente utilizada dentro de un&lt;erddapDatasets tag en datasets.xml para especificar la frecuencia para comprobar los archivos caché y eliminar los viejos (en minutos)   (default=15) . Por ejemplo,
```
    <cacheClearMinutes>15</cacheClearMinutes>  
```
Cuando el servidor termine de tramitar una solicitud, comprobará cuánto tiempo hace el último caché claro. Si fue hace demasiado tiempo, se encargará de una tarea en el TaskThread para limpiar el caché. Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) . Esto se puede especificar en el setup.xml, pero eso es desalentado.
     
### &lt;convertInterpolateRequestCSVExample{#convertinterpolaterequestcsvexample} 
* [ ** &lt;convertInterpolateRequestCSVExample ** ] (#convertinterpolaterequestcsvexample) es una etiqueta OPTIONAL dentro de un&lt;erddapDatasets tag en datasets.xml   \\[ empezar con ERDDAP™ v2.10 \\] que contiene un ejemplo que se mostrará en la página web del convertidor Interpolate. El valor predeterminado es: jplMU RSS T41/analysed\\_ sst /Bilinear/4 .
### &lt;convertInterpolateDatasetIDVariableLista{#convertinterpolatedatasetidvariablelist} 
* [ ** &lt;convertInterpolateDatasetIDVariableLista ** ] (#convertinterpolatedatasetidvariablelist) es una etiqueta OPTIONAL dentro de un&lt;erddapDatasets tag en datasets.xml   \\[ empezar con ERDDAP™ v2.10 \\] que contiene una lista de CSV datasetID /variable Nombre ejemplos que serán utilizados como sugerencias por la página web del convertidor Interpolate. El valor predeterminado es: jplMU RSS T41/analysed\\_ sst .
### &lt;convertToPublicSourceUrl sensible;{#converttopublicsourceurl} 
* [ ** &lt;convertToPublicSourceUrl ** ] (#converttopublicsourceurl) es una etiqueta OPTIONAL dentro de un&lt;erddapDatasets tag en datasets.xml que contiene un "de" y un atributo "a" que especifica cómo convertir un local que coincida sourceUrl   (generalmente un número IP) en un público sourceUrl   (a nombre de dominio) "de" debe tener la forma " \\[ algo \\] // \\[ algo \\] /". Puede haber 0 o más de estas etiquetas. Para más información ver [&lt; sourceUrl &gt; (#sourceurl) . Por ejemplo,
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
causará una coincidencia local sourceUrl   (tales comohttps://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day)   
en un público sourceUrl   (https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day) .
Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) .

Pero, por razones de seguridad y razones relacionadas con el sistema de suscripción, **¡No uses esta bolsa&#33;**   
En cambio, siempre utilice el nombre de dominio público en el&lt; sourceUrl etiqueta y utilizar el [/etc/hosts table](https://linux.die.net/man/5/hosts) en su servidor para convertir nombres de dominio locales a números IP sin utilizar un servidor DNS. Puede probar si un nombre de dominio se convierte correctamente en un número IP utilizando:
ping *algunos.dominio.*   
     
### data:image/png;base64,{#dataimagepngbase64} 
* Cuando un usuario solicita un .htmlTable de la respuesta ERDDAP™ , si los datos en una celda de String contienen datos:image/png;base64, seguido de una imagen de base64 codificada .png, ERDDAP™ mostrará un icono (para que el usuario pueda ver la imagen si se mueven sobre ella) y botones para guardar el texto o la imagen al portapapeles. Esta característica se agregó en ERDDAP™ v2.19 por Marco Alba.
###  drawLandMask  {#drawlandmask} 
*    [ ** drawLandMask ** ](#drawlandmask) especifica el ajuste por defecto que controla cuándo y cómo debe dibujarse la masa de tierra cuando ERDDAP™ dibuja un mapa. Puede especificarse en tres lugares diferentes datasets.xml   (de la prioridad más baja a la más alta) :
    
    1. Si drawLandMask se especifica dentro&lt;erddapDatasets (no conectado con ningún conjunto de datos específico) , entonces especifica el valor predeterminado de drawLandMask para todas las variables en todos los conjuntos de datos. Por ejemplo,
    ```
        <drawLandMask>under</drawLandMask>  
    ```
Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP lecturas datasets.xml .
Si esta etiqueta no está presente, el valor por defecto subyacente está bajo.
         
    2. Si drawLandMask se especifica como un atributo global de un conjunto de datos dado, entonces especifica el valor predeterminado de drawLandMask para todas las variables en ese conjunto de datos, sobrescribiendo cualquier ajuste de prioridad inferior. Por ejemplo,
    ```
        <att name="drawLandMask">under</att>  
    ```
Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ recarga ese conjunto de datos.
         
    3. Si drawLandMask se especifica como atributo de variable en un conjunto de datos dado, entonces especifica el valor predeterminado de drawLandMask para esa variable en ese conjunto de datos, superando cualquier ajuste de prioridad inferior. Por ejemplo,
    ```
        <att name="drawLandMask">under</att>  
    ```
Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ recarga ese conjunto de datos.
    
Un usuario puede anular el predeterminado (donde se especifique) seleccionando un valor para "Máscara de tierra de rocío" de una lista desplegable en la página web Make A Graph del conjunto de datos, o incluyendo &quot;land= *valor* en la URL que solicita un mapa ERDDAP .
    
En todas las situaciones, hay 4 valores posibles para el atributo:
    
    * "bajo" dibuja la máscara de tierra antes de dibujar datos en el mapa.
Para conjuntos de datos redondeados, la tierra aparece como un color gris claro constante.
Para conjuntos de datos tabulares, "bajo" muestra datos topografía sobre tierra y océanos.
    * "sobre"... Para conjuntos de datos redondeados, "sobre" dibuja la máscara de tierra después de que dibuja datos en mapas para que enmascara cualquier dato sobre tierra. Para conjuntos de datos tabulares, "sobre" muestra la batimetría del océano y un gris claro constante donde hay tierra, ambos dibujados bajo los datos.
    * "outline" acaba de dibujar el esbozo de la masa de tierra, límites políticos, lagos y ríos.
    * "off" no dibuja nada.
### &lt;emailDiagnosticsToErdData compartirgt;{#emaildiagnosticstoerddata} 
* [ ** &lt;emailDiagnosticsToErdData confianza ** ] (#emaildiagnosticstoerddata) es una etiqueta OPTIONAL raramente utilizada dentro de un&lt;erddapDatasets tag en datasets.xml . El valor de la etiqueta puede ser verdad (por defecto) o falso. Si es verdad, ERDDAP™ enviará un correo electrónico a Chris. John en Noaa. Gov (el ERDDAP™ equipo de desarrollo) . Esto debe ser seguro y seguro ya que no hay información confidencial (por ejemplo, la solicitudUrl) está incluido en el correo electrónico. Esto debería hacer posible capturar cualquier bicho oscuro, totalmente inesperado que lleve a NullPointerExceptions. De lo contrario, el usuario ve las excepciones, pero el ERDDAP™ el equipo de desarrollo no (así que no sabemos que hay un problema que necesita ser arreglado) .
     
### &lt;graphBackgroundColor limitado;{#graphbackgroundcolor} 
* [ ** &lt;GráficoBackgroundColor ** ] (#graphbackgroundcolor) es una etiqueta OPTIONAL raramente utilizada dentro de un&lt;erddapDatasets tag en datasets.xml para especificar el color de fondo predeterminado en gráficos. Esto afecta a casi todos los gráficos. Hay algunas situaciones no afectadas. El color se especifica como un valor hexadecimal de 8 dígitos en el formulario 0xAARRGGBB, donde AA, RR, GG y BB son los componentes opacidad, rojo, verde y azul, respectivamente. "0x" es sensible al caso, pero los dígitos hexadecimales no son sensibles al caso. Por ejemplo, una opaca completa (ff) color verde azul con rojo=22, verde=88, azul=ee sería 0xff2288ee. El blanco opaco es 0xffffffffff. El predeterminado es opaque luz azul (0xffccff) , que tiene la ventaja de ser diferente del blanco, que es un color importante en muchas paletas utilizadas para dibujar datos. Por ejemplo,
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) .
### &lt;ipAddressMaxRequests implicagt;{#ipaddressmaxrequests} 
* [ ** &lt;ipAddressMaxRequests confiar ** ] (#ipaddressmaxrequests) es una etiqueta opcional rara vez usada (primero apoyado con ERDDAP™ v2.12) dentro de un&lt;erddapDatasets tag en datasets.xml que es parte de un sistema para limitar la capacidad de usuarios legítimos demasiado agresivos y usuarios maliciosos para hacer un gran número de solicitudes simultáneas que degradarían el rendimiento del sistema para otros usuarios. ipAddress MaxRequests especifica el número máximo de solicitudes simultáneas que serán aceptadas desde cualquier dirección IP específica. Las solicitudes adicionales recibirán un error HTTP 429: demasiadas peticiones. Los pequeños archivos estáticos en erddap/download/ y erddap/images/ no están exentos de este recuento. El defecto es 15. El máximo permitido es 1000, que es muy alto... ¡no lo hagas&#33; ERDDAP™ no aceptará un número inferior a 6 porque muchos usuarios legítimos (notables navegadores web y WMS clientes) hasta 6 solicitudes a la vez. El ERDDAP™ Daily Report y la información similar escrita al archivo log.txt con cada Dataset Mayor Reload, incluirán ahora un resumen de las solicitudes de estas direcciones IP bajo el título "Dirección IP de Requester (Demasiados pedidos) ".
Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) .
    
La sección "Major LoadDatasets Time Series" del estado.html incluye una columna "tooMany" que lista el número de solicitudes que excedieron la configuración ipAddressMaxRequests del usuario y así vio un error "Too Many Solicita". Esto le permite ver fácilmente cuando hay usuarios activos demasiado agresivos y usuarios maliciosos para que pueda (opcionalmente) mire en el archivo log.txt y decida si quiere enlistar a esos usuarios.
    
No hay nada específicamente malo en poner esto a un número mayor. Depende de ti. Pero hacerlo permite/alenta a las personas a establecer sistemas que utilizan un gran número de hilos para trabajar en proyectos y luego no les da ninguna opinión de que lo que están haciendo no les está recibiendo ningún beneficio.
### &lt;ipAddressMaxRequestsActivent;{#ipaddressmaxrequestsactive} 
* [ ** &lt;ipAddressMaxRequestsActivencia ** ] (#ipaddressmaxrequestsactive) es una etiqueta opcional rara vez usada (primero apoyado con ERDDAP™ v2.12) dentro de un&lt;erddapDatasets tag en datasets.xml que es parte de un sistema para limitar la capacidad de usuarios legítimos demasiado agresivos y usuarios maliciosos para hacer un gran número de solicitudes simultáneas que degradarían el rendimiento del sistema para otros usuarios. ipAddressMaxRequestsActive especifica el número máximo de solicitudes simultáneas que serán procesadas activamente desde cualquier dirección IP específica. Las solicitudes adicionales se realizarán en una cola hasta que se hayan tramitado las solicitudes anteriores. Los pequeños archivos estáticos en erddap/download/ y erddap/images/ ARE están exentos de este recuento y de los problemas relacionados. El default es 2. El máximo permitido es 100, que es una locura alta - no lo hagas&#33; Puede configurar esto a 1 para ser estricto, especialmente si tiene problemas con usuarios demasiado agresivos o maliciosos. Los usuarios todavía obtendrán rápidamente todos los datos que solicitan (hasta ipAddressMaxRequests) , pero no podrán subir recursos del sistema. No recomendamos configurar esto a un número mayor porque permite a los usuarios legítimos demasiado agresivos y usuarios maliciosos dominar ERDDAP Es capacidad de procesamiento.
Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) .
     
### &lt;ipAddressUnlimited{#ipaddressunlimited} 
* [ ** &lt;ipAddressUnlimited confianza ** ] (#ipaddress unlimited) es una etiqueta opcional rara vez usada (primero apoyado con ERDDAP™ v2.12) dentro de un&lt;erddapDatasets tag en datasets.xml que es parte de un sistema para limitar la capacidad de usuarios legítimos demasiado agresivos y usuarios maliciosos para hacer un gran número de solicitudes simultáneas que degradarían el rendimiento del sistema para otros usuarios. ipAddressUnlimited es una lista separada por coma de direcciones IP que desea permitir acceso ilimitado a su ERDDAP . Mira tu registro. archivo txt para ver qué formato utiliza su servidor para las direcciones IP. En algunos servidores, las direcciones IP estarán en el formato #.#.#.# (donde # es un entero de 0 a 255) ; mientras que en otros será en el formato #:#:#:#:#:#:#:# . Los solicitantes de esta lista no están sujetos a la ipAddressMaxRequests o a la ipAddressMaxRequestsConfiguración activa. Esto podría ser secundario. ERDDAP™ o para ciertos usuarios o servidores en su sistema. ERDDAP™ siempre añade " (unknownIPAddress) ", que ERDDAP™ utiliza cuando la dirección IP del solicitante no se puede determinar, por ejemplo, para otros procesos que se ejecutan en el mismo servidor.
Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) .
    
Si por alguna razón todas las solicitudes de un usuario obtienen el mensaje de error "Timeout waiting for your other requests to process.", entonces usted puede resolver el problema añadiendo la dirección IP del usuario a la lista de ipAddressUnlimited, aplicando ese cambio, luego eliminarlo de esa lista.
    
### &lt;cargaDatasetsMinMinutes{#loaddatasetsminminutes} 
* [ ** &lt;loadDatasetsMinMinutes ** ] (#loaddatasetsminminutes) es una etiqueta OPTIONAL raramente utilizada dentro de un&lt;erddapDatasets tag en datasets.xml para especificar el tiempo mínimo (en minutos) entre carga mayor Datasets (cuando ERDDAP™ reproceses datasets.xml , incluyendo comprobar cada conjunto de datos para ver si necesita ser recargado de acuerdo a su recarga Ajuste de cada nMinutes, predeterminado=15) . Por ejemplo,
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
Si una determinada ejecución de la cargaDatasets lleva menos de esta vez, el cargador sólo mira repetidamente el directorio de la bandera y/o duerme hasta que el tiempo restante haya pasado. El defecto es de 15 minutos, que debe estar bien para casi todos. La única desventaja para establecer esto a un número menor es que aumentará la frecuencia que ERDDAP™ recuerda conjuntos de datos que tienen errores que les impiden ser cargados (Por ejemplo, un servidor remoto está abajo) . Si hay muchos de esos conjuntos de datos y se prueban con frecuencia, la fuente de datos podría considerar que está plagando/ comportamiento agresivo. Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) . Antes ERDDAP™ v2.00, esto se especificó en setup.xml, que todavía está permitido pero desalentado.
     
### &lt;loadDatasetsMaxMinutes{#loaddatasetsmaxminutes} 
* [ ** &lt;loadDatasetsMaxMinutes ** ] (#loaddatasetsmaxminutes) es una etiqueta OPTIONAL dentro de un&lt;erddapDatasets tag en datasets.xml para especificar el tiempo máximo (en minutos) una carga importante Se permite realizar esfuerzos de conjuntos de datos (antes de la carga Hilos de Datasets tratados como "stalados" y se interrumpe)   (default=60) . Por ejemplo,
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
En general, esto debe establecerse al menos dos veces más que razonablemente piense que recargar todos los conjuntos de datos (acumulativamente) debe tomar (ya que las computadoras y las redes a veces son más lentas de lo esperado) Esto siempre debe ser mucho más largo que la cargaDatasetsMinMinutes. El predeterminado es de 60 minutos. Algunas personas pondrán esto más tiempo. Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) . Antes ERDDAP™ v2.00, esto se especificó en setup.xml, que todavía está permitido pero desalentado.
     
### &lt;logLevel{#loglevel} 
* [ ** &lt;logLevel ** ] (#loglevel) es una etiqueta OPTIONAL dentro de un&lt;erddapDatasets tag en datasets.xml para especificar cuántos mensajes de diagnóstico se envían al archivo log.txt. Se puede configurar para "aprender" (los mensajes más pocos) , "info" (por defecto) , o "todos" (los mensajes más) . Por ejemplo,
```
    <logLevel>info</logLevel>  
```
Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) . Antes ERDDAP™ v2.00, esto se especificó en setup.xml, que todavía está permitido pero desalentado.
     
### &lt;parcialRequestMaxBytes caergt; y&lt;parcialRequestMaxCells implicagt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [ ** &lt;parcialRequestMaxBytes **] (#partialrequestmaxbytes-and-partialrequestmaxcells) y [** &lt;parcialRequestMaxCells confiar ** ] (#partialrequestmaxbytes-and-partialrequestmaxcells) rara vez se utilizan etiquetas OPTIONAL dentro de un&lt;erddapDatasets tag en datasets.xml . Cuando sea posible (y no siempre es posible) , ERDDAP™ rompe grandes solicitudes de datos en trozos para conservar la memoria.
    
Con 32 bits Java , en un sentido simplista, el número máximo de simultáneos *grande* solicitudes es aproximadamente 3/4 de la memoria disponible (el valor -Xmx pasó a Tomcat) dividido por el tamaño del trozo (por ejemplo, 1200 MB / 100 MB = título 12 solicitudes) . Otras cosas requieren memoria, por lo que el número real de solicitudes será menor. En la práctica, tirar no siempre es posible. Así que una enorme o unas pocas solicitudes simultáneas muy grandes no disponibles podrían causar problemas en 32 bits Java .

Con 64 bits Java , el valor -Xmx puede ser mucho más grande. Así que la memoria es mucho menos probable que sea una limitación.

Usted puede anular el tamaño del trozo predeterminado definiendo estas etiquetas en datasets.xml   (con diferentes valores que se muestran aquí) :
Para las redes:&lt;parcialRequestMaxBytes confía100000&lt;/partialRequestMaxBytes confía
Para tablas:&lt;parcialRequestMaxCells confiar1000000&lt;/partialRequestMaxCells confianza

parcialRequestMaxBytes es el número máximo preferido de bytes para una solicitud de datos de rejilla parcial (un trozo de la solicitud total) . default=100000000 (10^8) . Los tamaños más grandes no son necesariamente mejores (y no más de 500 MB porque ese es el límite predeterminado de THREDDS DAP respuestas) . Pero tamaños más grandes pueden requerir menos accesos de toneladas de archivos (pensar en ERD 's datos de satélite con cada punto de tiempo en un archivo separado - es mejor obtener más datos de cada archivo en cada solicitud parcial) .

parcialRequestMaxCells es el número máximo preferido de las células (nRows \\* nColumnos en la tabla de datos) para una solicitud de datos TABLE parcial (un trozo de la solicitud total) . Default = 100000. Los tamaños más grandes no son necesariamente mejores. Resultan en una espera más larga para el lote inicial de datos de la fuente.

Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) . Antes ERDDAP™ v2.00, estos fueron especificados en setup.xml, que todavía está permitido pero desalentado.
     
### &lt;requestBlacklist curvagt;{#requestblacklist} 
* [ ** &lt;requestBlacklist ** ] (#requestblacklist)   [es una etiqueta OPTIONAL](/docs/server-admin/additional-information#frequent-crashes-or-freezes) dentro de un&lt;erddapDatasets tag en datasets.xml que contiene una lista separada por coma de direcciones IP numéricas que serán listas negras. Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) .
    * Esto se puede utilizar para evitar un [Denial of Service attack](https://en.wikipedia.org/wiki/Denial_of_service) , un celoso [robot web](https://en.wikipedia.org/wiki/Internet_bot) o cualquier otro tipo de usuario problemático.
    * Usuario problemático... Si ERDDAP™ ralentiza a un gateo o congela / parada, la causa es a menudo un usuario problemático que está ejecutando más de un script a la vez y / o haciendo un gran número de solicitudes muy grandes, extremadamente ineficientes o inválidas, o solicitudes simultáneas. Mira. [log.txt](/docs/server-admin/additional-information#log) para ver si este es el caso y encontrar la dirección IP numérica del usuario problemático. Si este es el problema, probablemente deberías enlistar a ese usuario.
        
Cuando ERDDAP™ recibe una solicitud de una dirección IP lista negra, que devolverá HTTP Error 403: Forbidden. El mensaje de error de texto acompañante anima al usuario a enviarle un correo electrónico, el ERDDAP administrador, para resolver los problemas. Si toman el tiempo para leer el mensaje de error (muchos aparentemente no) y ponerse en contacto con usted, entonces puede trabajar con ellos para conseguir que funcionen sólo un script a la vez, hacer solicitudes más eficientes, solucionar los problemas en su script (por ejemplo, solicitando datos de un conjunto de datos remoto que no pueden responder antes de que se acabe el tiempo) , o lo que fuera la fuente de problemas.
        
Los usuarios son a menudo simplemente ignorantes de que sus solicitudes son problemáticos. A menudo no son conscientes de errores, ineficiencias brutas u otros problemas con sus scripts. A menudo piensan que porque tu ERDDAP™ ofrece datos de forma gratuita, que pueden pedir tantos datos como quieran, por ejemplo, ejecutando múltiples scripts o usando múltiples hilos simultáneamente.
        
        * Puedes explicarles que cada uno ERDDAP™ , ahora importa lo grande y poderoso, tiene recursos finitos (Tiempo de CPU, disco duro I/O, ancho de banda de red, etc.) y no es justo si un usuario solicita datos de una manera que extienda a otros usuarios o sobrecargas ERDDAP .
        * Una vez que un usuario sabe hacer 2 solicitudes simultáneas, a menudo no ven ninguna razón para no hacer 5, 10 o 20 solicitudes simultáneas, ya que las solicitudes adicionales no les cuestan nada. Es como una guerra asimétrica: aquí, las armas ofensivas tienen una enorme ventaja (Costo cero) sobre las armas defensivas (una instalación finita con costes reales) .
        * Infórmeles que hay menos retornos a hacer más y más solicitudes simultáneas; las solicitudes adicionales simplemente bloquean aún más las solicitudes de otros usuarios; no producen una mejora enorme para ellos.
        * Recuérdalos que hay otros usuarios (usuarios casuales y otros usuarios ejecutando scripts) , así que no es justo de ellos para colgar todos ERDDAP Es recursos.
        * Señala que los gigantes tecnológicos han inducido a los usuarios a esperar recursos infinitos de los servicios web. Mientras que hay maneras de establecer [grids/clusters/federations of ERDDAP s](/docs/server-admin/scaling) para hacer una ERDDAP™ sistema con más recursos, la mayoría ERDDAP™ Los administradores no tienen el dinero o la mano de obra para establecer tales sistemas, y tal sistema seguirá siendo finito. At ERD por ejemplo, hay una persona (me) escritura ERDDAP™ , administrando dos ERDDAP s (con ayuda de mi jefe) , y gestionar varias fuentes de datos, todas con un presupuesto anual de hardware de $0 (confiamos en subsidios ocasionales para pagar por hardware) . Esto no es Google, Facebook, Amazon, etc con 100 de ingenieros, y millones de dólares de ingresos para reciclar en sistemas cada vez más grandes. Y no podemos movernos ERDDAP™ a, por ejemplo, Amazon AWS, porque los costos de almacenamiento de datos son grandes y los cargos de egreso de datos son grandes y variables, mientras que nuestro presupuesto para servicios externos es un $0 fijo.
        * Mi solicitud a los usuarios es: (que es por lejos el caso más común) , su sistema sólo debe hacer una solicitud a la vez. Si las solicitudes son sensibles al tiempo (por ejemplo, múltiples .pngs en una página web, múltiples fichas para una WMS cliente, etc.) , entonces quizás 4 solicitudes simultáneas deben ser el máximo (y sólo por un tiempo muy corto) .
        * Si explica la situación al usuario, la mayoría de los usuarios comprenderán y estarán dispuestos a realizar los cambios necesarios para que pueda eliminar su dirección IP de la lista negra.
             
    * Para anotar a un usuario, agregue su dirección IP numérica a la lista separada por coma de direcciones IP en&lt;requestBlacklist confiar en su datasets.xml archivo. Para encontrar la dirección IP del usuario problemático, mire en ERDDAP™   *bigParentDirectory* /logs/log.txt file ( *bigParentDirectory* se especifica en [setup.xml](/docs/server-admin/deploy-install#setupxml) ) para ver si este es el caso y encontrar la dirección IP del usuario. La dirección IP para cada solicitud se enumera en las líneas que comienzan con "cl#123; curva#123; curva#123; curva#123;#" y es 4 números separados por períodos, por ejemplo, 123.45.67.8 . Buscar "ERROR" le ayudará a encontrar problemas como solicitudes inválidas.
    * También puede reemplazar el último número en una dirección IP con\\*(por ejemplo, 202.109.200.\\*) para bloquear una gama de direcciones IP, 0-255.
    * También puede reemplazar los últimos 2 números en una dirección IP con\\*.\\*  (por ejemplo, 121.204.\\*.\\*) para bloquear una gama más amplia de direcciones IP, 0-255.0-255.
    * Por ejemplo,
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * No necesitas reiniciar ERDDAP™ para los cambios en&lt;solicitarBlacklist confiar para entrar en vigor. Los cambios serán detectados la próxima vez ERDDAP™ comprueba si es necesario recargar los conjuntos de datos. O, puede acelerar el proceso visitando un [setDataset Bandera URL](/docs/server-admin/additional-information#set-dataset-flag) para cualquier conjunto de datos.
    * Tu ERDDAP™ El informe diario incluye una lista/talmente de los solicitantes más activos permitidos y bloqueados.
    * Si desea averiguar qué dominio/institución está relacionado con una dirección IP numérica, puede utilizar un servicio web DNS libre e inverso como [https://network-tools.com/](https://network-tools.com/) .
    * Puede haber momentos en que tiene sentido bloquear a ciertos usuarios a un nivel superior, por ejemplo, usuarios maliciosos. Por ejemplo, puede bloquear su acceso a todo en su servidor, no sólo ERDDAP . En Linux, uno de estos métodos es utilizar [iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/) . Por ejemplo, puede agregar una regla que bloqueará todo lo que viene de 198.51.100.0 con el comando
iptables -I INPUT -s 198.51.100.0 -j DROP
       
### &lt;lentoDownTroubleMillis implicagt;{#slowdowntroublemillis} 
* [ ** &lt;slowDownTroubleMillis ** ] (#slowdowntroublemillis) es una etiqueta OPTIONAL raramente utilizada dentro de un&lt;erddapDatasets tag en datasets.xml que contiene un entero especificando el número de milisegundos (default=1000) para pausar al responder a todas las solicitudes fallidas, por ejemplo, conjunto de datos desconocido, solicitar demasiado grande, usuario en la lista negra. Por ejemplo,
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Si un script está haciendo una solicitud inmediatamente después de otra, entonces podría rápidamente hacer una mala solicitud después de otra. Con este ajuste, puedes frenar un script fallando así ERDDAP™ no está inundado de malas peticiones. Si un humano hace una mala petición, ni siquiera notarán este retraso. Recomendaciones:
    
    * Si el problema es una negación distribuida del servicio (DDOS) ataque de 100+ atacantes, poner esto a un número menor (¿100?) . Lentarlos a todos por demasiado tiempo conduce a demasiados hilos activos.
    * Si el problema es de 1-10 fuentes, establece esto a 1000 ms (por defecto) , pero un número mayor (como 10000) es también razonable. Eso los frena para que pierdan menos recursos de red. Además, 1000 ms o así no molestará a los usuarios humanos que hacen una mala petición.
    
Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) .
     
### &lt;SuscripciónEmailBlacklist adultogt;{#subscriptionemailblacklist} 
* [ ** &lt;suscripción EmailBlacklist Conf ** ] (#subscriptionemailblacklist) es una etiqueta OPTIONAL raramente utilizada dentro de un&lt;erddapDatasets tag en datasets.xml que contiene una lista separada por coma de direcciones de correo electrónico que son inmediatamente en la lista negra de la [sistema de suscripción](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) Por ejemplo
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
Este es un sistema insensible. Si se agrega una dirección de correo electrónico a esta lista, si esa dirección de correo electrónico tiene suscripciones, las suscripciones serán canceladas. Si una dirección de correo electrónico en la lista intenta suscribirse, la solicitud será rechazada. Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) .
     
### Texto estándar{#standard-text} 
*    [ **Texto estándar** ](#standard-text) -- Hay varias etiquetas OPTIONAL (la mayoría de las veces se utilizan) dentro de un&lt;erddapDatasets tag en datasets.xml para especificar texto que aparece en varios lugares ERDDAP . Si desea cambiar el texto predeterminado, copie el valor existente de la etiqueta del mismo nombre en
     *tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util.messages.xml en datasets.xml , luego modificar el contenido. La ventaja de tener estos en datasets.xml es que puede especificar nuevos valores en cualquier momento, incluso cuando ERDDAP™ está corriendo. Cualquier cambio en los valores de estas etiquetas tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) . Los nombres de las etiquetas describen su propósito, pero vea el contenido predeterminado en messages.xml para una comprensión más profunda.
    
    *   &lt;standardLicense
    *   &lt;estándarContacto
    *   &lt;standardDataLicenses
    *   &lt;estándarDescargosOfEndorsement
    *   &lt;estándarDeExternalLinks confiar
    *   &lt;GeneralDescargo de responsabilidad
    *   &lt;estándar Política de privacidad
    *   &lt;startHeadHtml5
    *   &lt;startBodyHtml5 confía es una buena etiqueta para cambiar con el fin de personalizar la apariencia de la parte superior de cada página web en su ERDDAP . Notablemente, puede utilizar esto para agregar fácilmente un mensaje temporal en el ERDDAP™ página principal (por ejemplo, "ver el nuevo conjunto de datos JPL MUR SST v4.1 ..." o "Esto ERDDAP™ estará fuera de línea para el mantenimiento 2019-05-08T17:00:00 PDT a través 2019-05-08T20:00:00 PDT.") . Un quirk de poner esta etiqueta en datasets.xml es: cuando se reinicia ERDDAP , la primera solicitud ERDDAP™ devolverá el inicio predeterminado BodyHtml5 HTML, pero cada solicitud posterior utilizará el código inicialBodyHtml5 especificado en datasets.xml .
    *   &lt;theShortDescription Html titulado es una buena etiqueta para cambiar con el fin de personalizar la descripción de su ERDDAP . Tenga en cuenta que puede cambiar esto fácilmente para añadir un mensaje temporal en la página de inicio (por ejemplo, "Esto ERDDAP™ estará fuera de línea para el mantenimiento 2019-05-08T17:00:00 PDT a través 2019-05-08T20:00:00 PDT.") .
    *   &lt;endBodyHtml5
    
      
Antes ERDDAP™ v2.00, estos fueron especificados en setup.xml, que todavía está permitido pero desalentado.
     
### &lt;inusual Actividad{#unusualactivity} 
* [ ** &lt;inusualActividad ** ] (#unusualactividad) es una etiqueta OPTIONAL raramente utilizada dentro de un&lt;erddapDatasets tag en datasets.xml para especificar el número máximo de solicitudes entre dos carreras de LoadDatasets que se considera normal (default=10000) . Si ese número es excedido, un correo electrónico se envía al email (como se especifica en setup.xml) . Por ejemplo,
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) . Antes ERDDAP™ v2.00, esto se especificó en setup.xml, que todavía está permitido pero desalentado.
     
### &lt;ActualizaciónMaxEvents{#updatemaxevents} 
* [ ** &lt;updateMaxEvents confía ** ] (#updatemaxevents) es una etiqueta OPTIONAL raramente utilizada dentro de un&lt;erddapDatasets tag en datasets.xml para especificar el número máximo de eventos de cambio de archivos (default=10) que será manejado por [&lt;actualizar EveryNMillis confiar] (#Updateeverynmillis) sistema antes de cambiar para recargar el conjunto de datos. Por ejemplo,
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
La actualizaciónEl sistema EveryNMillis tiene la intención de funcionar muy rápidamente justo antes de procesar la solicitud de un usuario. Si hay un montón de eventos de cambio de archivos, entonces presumiblemente no puede funcionar rápidamente, por lo que en lugar de ello requiere que el conjunto de datos sea recargado. Si tu ERDDAP™ trata de conjuntos de datos que deben mantenerse actualizados incluso cuando hay cambios en un gran número de archivos de datos, puede configurarlo a un número mayor (¿100?) .

### &lt;usuario{#user} 
* [ ** &lt;usuario ** ] (#user) es una etiqueta OPTIONAL dentro de un&lt;erddapDatasets tag en datasets.xml que identifica el nombre de usuario, contraseña (si autenticación=costo) , y funciones (a lista separada por coma) . El uso de nombre de usuario y contraseña varía ligeramente basado en el valor de [&lt;autenticación titulada] (/docs/server-admin/additional-information#authentication) en tu ERDDAP Es el archivo setup.xml.
    * Esto es parte de ERDDAP 's [sistema de seguridad](/docs/server-admin/additional-information#security) para restringir el acceso a algunos conjuntos de datos a algunos usuarios.
    * Hacer un separado&lt;usuario etiqueta de contacto para cada usuario. Opcionalmente, si autenticación=auth2, puede configurar dos&lt;usuario etiquetas para cada usuario: una para cuando el usuario inicie sesión a través de Google, uno para cuando el usuario entra a través de Orcid, presumiblemente con los mismos roles.
    * Si no hay&lt;usuario etiqueta título para un cliente, s/él sólo será capaz de acceder a conjuntos de datos públicos, es decir, conjuntos de datos que no tienen un [&lt;accesible a título] (#accessibleto) tag.
    * nombre de usuario
Para autenticación=costo, el nombre de usuario suele ser una combinación de letras, dígitos, subrayados y períodos.
Para autenticación=email, el nombre de usuario es la dirección de correo electrónico del usuario. Puede ser cualquier dirección de correo electrónico.
Para autenticación=google, el nombre de usuario es la dirección completa de correo electrónico de Google del usuario. Esto incluye cuentas gestionadas por Google como @noaa.gov cuentas.
Para autenticación=orcid, el nombre de usuario es el número de cuenta Orcid del usuario (con cenizas) .
Para autenticación=auth2, el nombre de usuario es la dirección completa de Google del usuario o el número de cuenta Orcid del usuario (con cenizas) .
    * contraseña
Para autenticación=email, google, orcid, o oauth2, no especifique un atributo de contraseña.
Para autenticación=costo, debe especificar un atributo de contraseña para cada usuario.
        * Las contraseñas que los usuarios ingresan son sensibles a los casos y deben tener 8 o más caracteres para que sean más difíciles de romper. Hoy en día, incluso 8 personajes pueden ser descifrados rápidamente y barato por fuerza bruta usando un grupo de ordenadores en AWS. ERDDAP™ sólo impone el mínimo de 8 caracteres cuando el usuario intenta iniciar sesión (no cuando el&lt;usuario etiqueta icono se está procesando, porque ese código sólo ve el hash digest de la contraseña, no la contraseña de texto).
        * setup.xml&lt;passwordEncoding determina cómo se almacenan las contraseñas en el&lt;usuario etiquetas en datasets.xml . Para aumentar la seguridad, las opciones son:
            *    [MD5](https://en.wikipedia.org/wiki/MD5)   (¡No uses esto&#33;) -- para el atributo de contraseña, especifique el hash digest MD5 de la contraseña del usuario.
            * UEPMD5 (¡No uses esto&#33;) -- para el atributo de contraseña, especifique el hash digest de MD5 *nombre de usuario* : ERDDAP : *contraseña* . El nombre de usuario y " ERDDAP "se usan para [sal](https://en.wikipedia.org/wiki/Salt_(cryptography) ) el valor del hash, haciendo más difícil de decodificar.
            *    [SHA256](https://en.wikipedia.org/wiki/SHA-2)   (no recomendado) -- para el atributo de contraseña, especifique el hash digest SHA-256 de la contraseña del usuario.
            * UEPSHA256 (Por defecto, contraseña recomendada. Pero mucho mejor: utilizar las opciones de autenticación de google, orchid o oauth2.) -- para el atributo de contraseña, especifique el hash digest de SHA-256 *nombre de usuario* : ERDDAP : *contraseña* . El nombre de usuario y " ERDDAP "se utilizan para sal el valor del hash, haciendo más difícil de decodificar.
        * En Windows, puede generar valores de digestión de contraseña MD5 descargando un programa MD5 (tales como [MD5](https://www.fourmilab.ch/md5/) ) y uso (por ejemplo) :
md5 -djsmith: ERDDAP : *realPassword* 
        * En Linux/Unix, puede generar valores de digestión MD5 utilizando el programa incorporado md5sum (por ejemplo) :
eco -n "jsmith: ERDDAP : *realPassword* " | md5sum
        * Las contraseñas de texto simple guardadas son sensibles a los casos. Las formas almacenadas de contraseñas MD5 y UEPMD5 no son sensibles a los casos.
        * Por ejemplo (utilizando UEPMD5) , si nombre de usuario= "jsmith" y contraseña= "myPassword", el&lt;usuario etiqueta título es:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
donde se generó la contraseña almacenada
md5 -djsmith: ERDDAP :myPassword
        * roles es una lista de funciones separada por coma para la cual el usuario está autorizado. Cualquier&lt;dataset edad puede tener un [&lt;accesible a título] (#accessibleto) etiqueta que lista los roles que se permiten acceder a ese conjunto de datos. Para un usuario dado y un conjunto de datos dado, si uno de los roles en la lista de roles del usuario coincide con uno de los roles en la lista de datos&lt;accesiblePara funciones profesionales, entonces el usuario está autorizado para acceder a ese conjunto de datos.
            
Cada usuario que ingresa se le da automáticamente el papel \\[ cualquieraLogged In \\] , si hay un&lt;usuario etiqueta título para ellos en datasets.xml o no. Así que si un conjunto de datos dado tiene
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
entonces cualquier usuario que esté conectado será autorizado para acceder a ese conjunto de datos, incluso si no hay&lt;usuario etiqueta título para ellos en datasets.xml .
            
    * Cualquier cambio en el valor de esta etiqueta tendrá efecto la próxima vez ERDDAP™ lecturas datasets.xml , incluso en respuesta a un conjunto de datos [bandera](/docs/server-admin/additional-information#flag) .
         
### &lt;pathRegex{#pathregex} 
* [ ** &lt;pathRegex ** ] (#pathregex) le permite especificar una expresión regular que limita los caminos (que subdirectorios) se incluirá en el conjunto de datos. El predeterminado es .\\*, que coincide con todos los caminos. Esta es una etiqueta raramente usada, raramente necesaria, EDDGrid DeFiles datasets, EDDTableDeFiles datasets, y algunos otros tipos de conjunto de datos. Sin embargo, cuando lo necesitas, realmente lo necesitas.
    
Para hacer este trabajo, necesitas ser muy bueno con expresiones regulares. Mira esto. [documentación de regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) y [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) . En particular, usted necesita saber acerca de grupos de captura (algo dentro de paréntesis) , y el símbolo "o" | ".
Juntos, estos le permiten especificar cualquier número de opciones, por ejemplo, (Opción1 | Opción 2 | Opción 3) .
Además, ninguna de las opciones puede ser nada, por ejemplo, ( | Opción 2 | Opción 3) .
Además, es necesario saber que los grupos de captura pueden ser anidados, es decir, cualquier opción en un grupo de captura puede contener otro grupo de captura, por ejemplo, ( | Opción 2 ( | Opción 2 b | Opción2c)  | Opción 3) que dice que la opción2 puede ser seguida por nada, o la opción2b, o la opción2c.
Para pathRegexes, cada opción será un nombre de carpeta seguido de un /, por ejemplo, bar/ .
    
La parte difícil del caminoRegex es: Cuando ERDDAP™ Desciende repetidamente el árbol del directorio, el pathRegex debe aceptar todos los caminos que encuentre en su camino a los directorios con datos. Regex con grupos de captura anidados es una buena manera de lidiar con esto.
    
Un ejemplo:
Supongamos que tenemos la siguiente estructura del directorio:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
y el archivo especificadoDirectory es /foo/bar/, y sólo queremos el .nc archivos en el D \\[ 0-9 \\] &#123;4&#125;/a/ subdirectorios.
La solución es establecer la rutaRegex a /foo/bar/ ( | D \\[ 0-9 \\] &#123;4&#125;/ ( | a/) )   
Eso dice:
El camino debe comenzar con /foo/bar/
Eso puede ser seguido por nada o D \\[ 0-9 \\] &#123;4&#125;/
Eso puede ser seguido por nada o a/
    
Sí, la rutaRegex puede ser increíblemente difícil de formular. Si te atascas, pregúntale a un programador de computadora (lo más cercano en el mundo real a un mago que brota encantamientos?) o enviar un correo electrónico a Chris. John en Noaa.gov.
    
### &lt;dataset{#dataset} 
* [ ** &lt;dataset ** ] (#dataset) es un oficio (pero siempre usado) etiqueta dentro de una&lt;erddapDatasets tag en datasets.xml que (si incluye toda la información entre&lt;dataset&lt;/dataset] describe completamente un conjunto de datos. Por ejemplo,
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
Puede haber cualquier número de etiquetas de conjunto de datos en su datasets.xml archivo.
Tres atributos MAY aparecen dentro de un&lt;dataset titulada:
     
    *    **Tipo= *a Tipo* "** es un atributo REQUIRED dentro de un&lt;dataset universidad tag en datasets.xml que identifica el tipo de conjunto de datos (por ejemplo, si es un EDDGrid /gridded or EDDTable/tabular dataset) y la fuente de los datos (por ejemplo, una base de datos, archivos o un control remoto OPeNDAP servidor) . Ver el [ **Lista de tipos de conjunto de datos** ](#list-of-types-datasets) .
         
#### Dataset Id{#datasetid} 
*    [ ** datasetID = *aDatasetID* "** ](#datasetid) es un atributo REQUIRED dentro de un&lt;dataset icono que asigna un corto (generalmente&lt;15 caracteres), único, identificando el nombre a un conjunto de datos.
    * El datasetID DEBE ser una carta (A-Z, a-z) seguido por cualquier número de A-Z, a-z, 0-9, y \\_ (pero mejor si&lt;32 caracteres total).
    * Dataset Las identificaciones son sensibles a los casos, pero no crean dos datasetID s que sólo difieren en letras superiores/bajo. Causará problemas en las computadoras de Windows (el tuyo y/o el ordenador del usuario) .
    * Buenas prácticas: Recomendamos usar [camello Caso](https://en.wikipedia.org/wiki/CamelCase) .
    * Buenas prácticas: Recomendamos que la primera parte sea un acrónimo o abreviatura del nombre de la institución fuente y la segunda parte sea un acrónimo o abreviatura del nombre del conjunto de datos. Cuando sea posible, creamos un nombre que refleja el nombre de la fuente para el conjunto de datos. Por ejemplo, usamos datasetID = "erdPH sst a8día" para un conjunto de datos desde el NOAA   NMFS   SWFSC Environmental Research Division ( ERD ) que designa la fuente como satélite/PH/ sst a/8día.
    * Si cambia el nombre de un conjunto de datos, el antiguo conjunto de datos (con el viejo nombre) seguirá vivo ERDDAP . Este es un conjunto de datos "huérfano", porque la especificación para él en datasets.xml Ahora se ha ido. Esto debe tratarse de:
        1. Para ERDDAP™ v2.19 y más tarde, no necesitas hacer nada. ERDDAP™ eliminará automáticamente estos conjuntos de datos huérfanos.
        2. Para ERDDAP™ v2.18 y antes, usted necesita hacer algo para eliminar los conjuntos de datos huérfanos: Hacer un conjunto de datos activo=falso, por ejemplo,
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
Después de la siguiente carga mayor Datasets, Puede eliminar esa etiqueta después de que el antiguo conjunto de datos sea inactivo.
                 
#### activo{#active} 
*    [ **activo= *boolean* "** ](#active) es un atributo OPTIONAL dentro de&lt;dataset universidad tag en datasets.xml que indica si un conjunto de datos es activo (elegibles para su uso ERDDAP ) o no.
    * Los valores válidos son verdaderos (por defecto) y falso.
    * Puesto que el defecto es cierto, no necesita utilizar este atributo hasta que desea eliminar temporalmente o permanentemente este conjunto de datos de ERDDAP .
    * Si simplemente elimina un conjunto de datos activo="true" desde datasets.xml , el conjunto de datos seguirá activo ERDDAP™ pero nunca se actualizará. Tal conjunto de datos será un "huérfano" y se enumerará como tal en el estado. Página de la web de html debajo de la lista de conjuntos de datos que no se cargaron.
    * Si se activa="falso", ERDDAP™ desactivará el conjunto de datos la próxima vez que trate de actualizar el conjunto de datos. Cuando haces esto, ERDDAP™ no arroja ninguna información que pueda haber almacenado sobre el conjunto de datos y ciertamente no hace nada a los datos reales.
    * Para eliminar un conjunto de datos desde ERDDAP™ , ver [Eliminación de datos de la fuerza](/docs/server-admin/additional-information#removing-datasets) .
         

 ** Varias etiquetas pueden aparecer entre las&lt;dataset&lt;/dataset etiquetas. **   
Hay alguna variación en la que las etiquetas se permiten por qué tipos de conjuntos de datos. Vea la documentación para un determinado [tipo de conjunto de datos](#list-of-types-datasets) para detalles.

#### &lt;accesible To{#accessibleto} 
* [ ** &lt;accesible Para confiar ** ] (#accessibleto) es una etiqueta OPTIONAL dentro de un&lt;dataset icono que especifica una lista separada de coma [Funciones](#user) que se permite tener acceso a este conjunto de datos. Por ejemplo,
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * Esto es parte de ERDDAP 's [sistema de seguridad](/docs/server-admin/additional-information#security) para restringir el acceso a algunos conjuntos de datos a algunos usuarios.
    * Si esta etiqueta no está presente, todos los usuarios (incluso si no han iniciado sesión) tendrá acceso a este conjunto de datos.
    * Si esta etiqueta está presente, este conjunto de datos sólo será visible y accesible para usuarios conectados que tengan uno de los roles especificados. Este conjunto de datos no será visible para los usuarios que no están conectados.
    * Cada usuario que ingresa se le da automáticamente el papel \\[ cualquieraLogged In \\] , si hay un&lt;usuario etiqueta título para ellos en datasets.xml o no. Así que si un conjunto de datos dado tiene
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
entonces cualquier usuario que esté conectado será autorizado para acceder a ese conjunto de datos, incluso si no hay&lt;usuario etiqueta título para ellos en datasets.xml .
         
#### &lt;grafosAccesibleTonto;{#graphsaccessibleto} 
* [ ** &lt;grafitasAccesible a confiar ** ] (#graphsaccessibleto) es una etiqueta OPTIONAL dentro de un&lt;dataset universidad tag en datasets.xml que determina si los gráficos y metadatos para el conjunto de datos están disponibles para el público. Ofrece una manera de anular parcialmente el conjunto de datos [&lt;accesible a título] (#accessibleto) estableciendo. Los valores permitidos son:
    * auto... Este valor (o la ausencia de un&lt;graphsAccessibleTo ratio para el conjunto de datos) hace que el acceso a gráficos y metadatos del conjunto de datos mime el conjunto de datos&lt;accesiblePara establecer.
Así que si el conjunto de datos es privado, sus gráficos y metadatos serán privados.
Y si el conjunto de datos es público, sus gráficos y metadatos serán públicos.
    * público -- Esta configuración hace que los gráficos y metadatos del conjunto de datos sean accesibles para cualquier persona, incluso los usuarios que no están conectados, incluso si el conjunto de datos es de otro modo privado porque tiene un&lt;accesible a la etiqueta Conf.
         
#### &lt;accesible ViaFiles{#accessibleviafiles} 
* [ ** &lt;accesibleViaFiles ** ] (#accessibleviafiles) es una etiqueta OPTIONAL dentro de un&lt;dataset universidad tag en datasets.xml para [ EDDGrid AggregateExistingDimension](#eddgridaggregateexistingdimension) , [ EDDGrid Copiado](#eddgridcopy) , [ EDDGrid DeEDDTable](#eddgridfromeddtable) , [ EDDGrid FromErddap](#eddfromerddap) , [ EDDGrid De Etopo](#eddgridfrometopo) , [ EDDGrid DeFiles](#eddgridfromfiles)   (incluidas todas las subclases) , [ EDDGrid SideBySide](#eddgridsidebyside) , [EDDTableCopy](#eddtablecopy)   [EDDTableDeErddap](#eddfromerddap) , [EDDTableDesde EDDGrid ](#eddtablefromeddgrid) , y [EDDTableDeFiles](#eddtablefromfiles)   (incluidas todas las subclases) Datasets. Puede tener un valor verdadero o falso. Por ejemplo,
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Si el valor es verdadero, ERDDAP™ lo hará para que los usuarios puedan navegar y descargar los archivos fuente de datos del conjunto de datos a través de ERDDAP 's [ "files" sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/) . Ver el "files" sistema [documentación](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) para más información.
    
El valor predeterminado de&lt;accesibleViaFiles viene de&lt;defaultAccesibleViaFiles dentro [setup.xml](/docs/server-admin/deploy-install#setupxml) . Tiene un valor predeterminado de falso, pero le recomendamos que agregue esa etiqueta a su setup.xml con un valor de verdad.
    
Recomendación -- Recomendamos que todos los conjuntos de datos relevantes sean accesibles a través del sistema de archivos estableciendo&lt;defaultAccessibleViaFiles confiar a true en setup.xml porque hay un grupo de usuarios para los cuales esta es la forma preferida de obtener los datos. Entre otras razones, las "files" sistema hace fácil para los usuarios ver qué archivos están disponibles y cuándo cambiaron por última vez, por lo que es fácil para un usuario mantener su propia copia de todo el conjunto de datos. Si generalmente no desea hacer que los conjuntos de datos sean accesibles a través del sistema de archivos, establece&lt;defaultAccesibleViaFiles confiar a false. En cualquier caso, sólo use&lt;accesibleViaFiles confía para los pocos conjuntos de datos que son excepciones a la política general establecida por&lt;defaultAccesibleViaFiles (por ejemplo, cuando el conjunto de datos utiliza [ .nc ml](#ncml-files) archivos, que no son realmente útiles para los usuarios) .
     
#### &lt;accesible Via WMS &gt;{#accessibleviawms} 
* [ ** &lt;accesible Via WMS ■ ** ] (#accessibleviawms) es una etiqueta OPTIONAL dentro de un&lt;dataset universidad tag en datasets.xml para todos [ EDDGrid ](#eddgrid) subclases. Puede tener un valor de verdad (por defecto) o falso. Por ejemplo,
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Si el valor es falso, ERDDAP 's WMS El servidor no estará disponible para este conjunto de datos. Esto se utiliza comúnmente para conjuntos de datos que tienen algunos valores de longitud superiores a 180 (que técnicamente es nula WMS servicios) , y para lo cual también está ofreciendo una variante del conjunto de datos con valores de longitud enteramente en el rango -180 a 180 via [ EDDGrid LonPM180](#eddgridlonpm180) .
Si el valor es verdadero, ERDDAP™ tratará de hacer el conjunto de datos disponible a través de ERDDAP 's WMS servidor. Pero si el conjunto de datos es completamente inadecuado WMS   (por ejemplo, no hay datos de longitud o latitud) , entonces el conjunto de datos no estará disponible ERDDAP 's WMS servidor, independientemente de esta configuración.
     
#### &lt;añadir Variables Donde{#addvariableswhere} 
* [&lt;addVariablesDónde confiar] (#addvariableswhere) es una etiqueta OPTIONAL dentro de&lt;dataset icono para todos los datasets EDDTable.
    
Las solicitudes de cualquier conjunto de datos EDDTable pueden incluir &quot; Variables Donde (" *atributo Nombre* " *atributo Valor* ") , lo que dice ERDDAP™ añadir todas las variables en el conjunto de datos donde *atributoName=attributeValue* a la lista de variables solicitadas. Por ejemplo, si un usuario añade &quot;add Variables Donde (" ioos\\_category ","Wind") a una consulta, ERDDAP añadirá todas las variables en el conjunto de datos que tengan ioos\\_category =Atributo de Windows a la lista de variables solicitadas (por ejemplo, windSpeed, windDirection, windGustSpeed) . *atributo Nombre* y *atributo Valor* son sensibles a los casos.
    
In datasets.xml , si el trozo de dataset.xml para un conjunto de datos tiene
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
por ejemplo,
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
el Formulario de Acceso a Datos (.html página web) para el conjunto de datos incluirá un widget (para cada atributoName en la lista separada de coma) justo debajo de la lista de variables que permite a los usuarios especificar un valor de atributo. Si el usuario selecciona un valor de atributo para uno o más de los nombres de atributos, se añadirán a la solicitud por &quot;add Variables Donde (" *atributo Nombre* " *atributo Valor* ") . Así, esta etiqueta en datasets.xml le permite especificar la lista de nombres de atributos que aparecerá en el formulario de acceso de datos para ese conjunto de datos y hace que sea fácil para los usuarios agregar &quot; Donde funciona a la solicitud. El *atributoNamesCSV* La lista es sensible a los casos.
    
#### &lt;altitudMetersPerSourceUnit limit;{#altitudemeterspersourceunit} 
* [ ** &lt;altitudeMetersPerSourceUnit ** ] (#altitudemeterspersourceunit) es una etiqueta OPTIONAL dentro de&lt;dataset icono en conjuntos de datos. xxml para EDDTableDesde SOS conjuntos de datos (¡Sólo&#33;) que especifica un número multiplicado por los valores de altitud o profundidad de origen para convertirlos en valores de altitud (en metros sobre el nivel del mar) . Por ejemplo,
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
Esta etiqueta DEBE usarse si los valores de eje vertical del conjunto de datos no son metros, positivo=up. De lo contrario, es OPTIONAL, ya que el valor predeterminado es 1. Por ejemplo,
    * Si la fuente ya se mide en metros sobre el nivel del mar, utilice 1 (o no use esta etiqueta, ya que 1 es el valor predeterminado) .
    * Si la fuente se mide en metros por debajo del nivel del mar, utilice -1.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Si la fuente se mide en km por encima del nivel del mar, utilice 0.001.
         
#### &lt;defaultDataQuery limitadagt;{#defaultdataquery} 
* [ ** &lt;defaultDataQuery ** ] (#defaultdataquery) es una etiqueta OPTIONAL dentro de un&lt;dataset universidad tag en datasets.xml Eso dice ERDDAP™ para utilizar la consulta especificada (la parte de la URL después de la "?") si el archivo .html Tipo (el Formulario de Acceso a Datos) se solicita sin consulta.
    * Probablemente necesitarás usar esto.
    * Necesita código XML (no por ciento de código) las consultas predeterminadas ya que están en un documento XML. Por ejemplo, &amp; ,&lt;se convierte en&lt;, se convierte &gt; .
    * Por favor, compruebe su trabajo. Es fácil cometer un error y no conseguir lo que quieres. ERDDAP™ tratará de limpiar sus errores... pero no confíes en eso, ya que\\*cómo\\*se limpia puede cambiar.
    * Para los conjuntos de datos de griddap, un uso común de esto es especificar un valor de profundidad o dimensión de altitud por defecto diferente (por ejemplo, \\[ 0 \\] en lugar de \\[ último \\] ) .
En cualquier caso, siempre debe enumerar todas las variables, utilizar siempre los mismos valores de dimensión para todas las variables, y casi siempre utilizar \\[ 0 \\] , \\[ último \\] o \\[ 0:último \\] para los valores de dimensión.
Por ejemplo:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * Para tabledap datasets, si no especifica ninguna restricción, la solicitud devolverá todo el conjunto de datos, que puede ser impractamente grande, dependiendo del conjunto de datos. Si no quieres especificar ninguna restricción, en lugar de tener un vacío&lt;defaultDataQuery (que es el mismo que no especificar un defecto DataQuery) , usted necesita enumerar explícitamente todas las variables que desea incluir en elDataQuery predeterminado.
    * Para tabledap datasets, el uso más común de esto es especificar un rango de tiempo predeterminado diferente (relativo a max (tiempo) , por ejemplo, &gt; (tiempo) -1día, o en relación a ahora, por ejemplo, &quot; tiempo continu= now- 1 día) .
Recuerde que no solicitar variables de datos es el mismo que especificar todas las variables de datos, por lo que generalmente puede especificar la nueva limitación de tiempo.
Por ejemplo:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
o
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;defaultGraphQuery limitadagt;{#defaultgraphquery} 
* [ ** &lt;defaultGraphQuery ** ] (#defaultgraphquery) es una etiqueta OPTIONAL dentro de un&lt;dataset universidad tag en datasets.xml Eso dice ERDDAP™ para utilizar la consulta especificada (la parte de la URL después de la "?") si el archivo .graph Tipo (la forma de hacer un gráfico) se solicita sin consulta.
    * Probablemente necesitarás usar esto.
    * Necesita código XML (no por ciento de código) las consultas predeterminadas ya que están en un documento XML. Por ejemplo, &amp; ,&lt;se convierte en&lt;, se convierte &gt; .
    * Por favor, compruebe su trabajo. Es fácil cometer un error y no conseguir lo que quieres. ERDDAP™ tratará de limpiar sus errores... pero no confíes en eso, ya que\\*cómo\\*se limpia puede cambiar.
    * Para los conjuntos de datos de griddap, el uso más común de esto es especificar un valor de profundidad o dimensión de altitud diferente (por ejemplo, \\[ 0 \\] en lugar de \\[ último \\] ) y/o especificar que una variable específica sea graficada.
En cualquier caso, casi siempre utilizarás \\[ 0 \\] , \\[ último \\] o \\[ 0:último \\] para los valores de dimensión.
Por ejemplo:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (pero lo puso todo en una línea) 
    * Para tabledap datasets, si no especifica ninguna limitación, la solicitud marcará todo el conjunto de datos, que puede tardar mucho tiempo, dependiendo del conjunto de datos.
    * Para tabledap datasets, el uso más común de esto es especificar un rango de tiempo predeterminado diferente (relativo a max (tiempo) , por ejemplo, &gt; (tiempo) -1día, o en relación a ahora, por ejemplo, &quot; tiempo continu= now- 1 día) .
Recuerde que no solicitar variables de datos es el mismo que especificar todas las variables de datos, por lo que generalmente puede especificar la nueva limitación de tiempo.
Por ejemplo:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
o
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;dimensionValoresInMemory bulbgt;{#dimensionvaluesinmemory} 
* [ ** &lt;dimensión ValoresInMemory título ** ] (#dimensionvaluesinmemory)   (verdadero (por defecto) o falso) es una etiqueta OPTIONAL y raramente usada dentro de&lt;dataset icono para cualquier EDDGrid dataset que dice ERDDAP™ dónde mantener los valores fuente de las dimensiones (también conocido como axisVariable s) :
    
    * verdadero = en memoria (que es más rápido pero utiliza más memoria) 
    * false = en el disco (que es más lento pero no utiliza memoria) 
    
Por ejemplo,
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
Sólo deberías usar esto con el valor no predeterminado de falso si tu ERDDAP™ tiene muchos conjuntos de datos con dimensiones muy grandes (por ejemplo, millones de valores, por ejemplo, EDDGrid DeAudioFiles datasets) y ERDDAP 's En Uso el uso de la memoria es siempre demasiado alto. Vea la Memoria: actualmente en línea \\[ tu dominio \\]  /erddap/status.html para supervisar ERDDAP™ uso de memoria.
     
#### &lt;fileTableInMemory limitadagt;{#filetableinmemory} 
* [ ** &lt;archivoTablaInMemory ** ] (#filetableinmemory)   (verdadero o falso (por defecto) ) es una etiqueta OPTIONAL dentro de&lt;dataset icono para cualquier EDDGrid DeFiles y EDDTable DeFiles dataset que dice ERDDAP™ dónde guardar el archivoTabla (que tiene información sobre cada archivo de datos fuente) :
    
    * verdadero = en memoria (que es más rápido pero utiliza más memoria) 
    * false = en el disco (que es más lento pero no utiliza memoria) 
    
Por ejemplo,
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Si lo estableces a la verdad para cualquier conjunto de datos, mantén un ojo en la memoria: actualmente utilizando la línea en \\[ tu dominio \\]  /erddap/status.html para asegurar que ERDDAP™ todavía tiene mucha memoria libre.
     
#### &lt;fgdcFile reducidagt;{#fgdcfile} 
* [ ** &lt;fgdcFile ** ] (#fgdcfile) es una etiqueta OPTIONAL dentro de un&lt;dataset universidad tag en datasets.xml Eso dice ERDDAP™ para utilizar un archivo FGDC pre-made en lugar de tener ERDDAP™ intenta generar el archivo. Usage:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *completo FileName* puede referirse a un archivo local (en algún lugar del sistema de archivos del servidor) o la URL de un archivo remoto.
Si *completo FileName* \\="" o el archivo no se encuentra, el conjunto de datos no tendrá metadatos FGDC. Así que esto también es útil si desea suprimir los metadatos FGDC para un conjunto de datos específico.
O, puedes poner&lt;fgdcActive convenientefalse&lt;/fgdcActive estrecho en setup.xml para decir ERDDAP™ no ofrecer metadatos FGDC para ningún conjunto de datos.
     
#### &lt;iso19115 Archivo{#iso19115file} 
* [ ** &lt;iso19115File ** ] (#iso19115file) es una etiqueta OPTIONAL dentro de un&lt;dataset universidad tag en datasets.xml Eso dice ERDDAP™ para utilizar un archivo ISO 19115 prehecho en lugar de tener ERDDAP™ intenta generar el archivo. Usage:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *completo FileName* puede referirse a un archivo local (en algún lugar del sistema de archivos del servidor) o la URL de un archivo remoto.
Si *completo FileName* \\="" o el archivo no se encuentra, el conjunto de datos no tendrá metadatos ISO 19115. Así que esto también es útil si desea suprimir los metadatos ISO 19115 para un conjunto de datos específico.
O, puedes poner&lt;iso19115Active convienefalse&lt;/iso19115Active ratio en setup.xml para decir ERDDAP™ no ofrecer metadatos ISO 19115 para ningún conjunto de datos.
     
#### &lt;matchAxis NDigits afectadosgt;{#matchaxisndigits} 
* [ ** &lt;matchAxisNDigits ** ] (#matchaxisndigits) es una etiqueta OPTIONAL dentro de un EDDGrid  &lt;dataset icono para EDDGrid conjuntos de datos que son agregaciones, por ejemplo, agregaciones de archivos. Cada vez que se recarga el conjunto de datos, ERDDAP™ comprueba que los valores del eje de cada componente de la agregación son los mismos. La precisión de la prueba está determinada por la [matchAxisNDigits](#matchaxisndigits) , que especifica el número total de dígitos que deben coincidir al probar valores de eje de doble precisión, 0 - 18 (por defecto) . Cuando las pruebas de los valores del eje flotante, la prueba se hace con el matchAxisNDigits/2 dígitos. Un valor de 18 o superior dice EDDGrid para hacer una prueba exacta. Un valor de 0 cuenta EDDGrid no hacer ninguna prueba, que no se recomienda, excepto como se describe a continuación.
    
Aunque EDDGrid permite que los componentes de la agregación tengan valores de eje ligeramente diferentes, sólo un conjunto de valores de eje se muestra al usuario. El conjunto es del mismo componente que proporciona los metadatos fuente del conjunto de datos. Por ejemplo, EDDGrid DeFiles datasets, que es especificado por&lt;metadatosDesde el ajuste (default=last) .
    
El uso de matchAxisNDigits\\=0 está fuertemente desalentado en la mayoría de los casos, porque se apaga todo el control. Incluso la comprobación mínima es útil porque asegura que los componentes son adecuados para la agregación. Todos suponemos que todos los componentes son adecuados, pero no siempre es así. Esta es una prueba importante de la cordura. Incluso los valores del partidoAxisNDigits1, 2, 3 o 4 se desalientan porque los diferentes valores del eje a menudo indican que los componentes fueron creados (¿Atado?) una manera diferente y por lo tanto no son adecuados para la agregación.
    
Hay un caso donde el uso de matchAxisNDigits\\=0 es útil y recomendado: con agregaciones de archivos remotos, por ejemplo, datos en cubos S3. En este caso, si el conjunto de datos utiliza cacheDesdeUrl, cacheSizeGB, matchAxisNDigits\\=0, y el EDDGrid Sistema FromFiles para [Aggregation via Nombres del archivo](#aggregation-via-file-names-or-global-metadata) Entonces EDDGrid no tiene que leer todos los archivos remotos para hacer la agregación. Esto permite que los conjuntos de datos hechos de datos en cubos S3 se carguen rápidamente (en lugar de absurdamente lentamente si EDDGrid tiene que descargar y leer todos los archivos) .
    
#### &lt;nThreads tocagt;{#nthreads} 
* Empezando con ERDDAP™ versión 2,00, cuando cualquier subclase de EDDTableDesdeFiles o EDDGrid lee datos de su fuente, puede leer un trozo de datos (por ejemplo, un archivo fuente) a la vez (en un hilo)   (que es el defecto) o más de un trozo de datos (por ejemplo, 2+ ficheros fuente) a la vez (en 2 o más hilos) mientras procesa cada solicitud.
     
    * Regla de Tumba:
Para la mayoría de los conjuntos de datos en la mayoría de los sistemas, utilice nThreads=1, el predeterminado. Si tienes una computadora poderosa (muchos núcleos de CPU, mucha memoria) , luego considerar la colocación de nThreads a 2, 3, 4, o superior (pero nunca más que el número de núcleos de CPU en el ordenador) para conjuntos de datos que podrían beneficiar:
        
        * La mayoría de los datasets EDDTableDesdeFiles se beneficiarán.
        * Los conjuntos de datos donde algo causa un retraso antes de que un trozo de datos pueda ser procesado se beneficiarán, por ejemplo:
            * Datasets with [de carácter externo (por ejemplo, .gz ) ](#externally-compressed-files) binario (por ejemplo, .nc ) archivos, porque ERDDAP™ tiene que descomprimir todo el archivo antes de que pueda empezar a leer el archivo.
            * Datasets that use [cacheSizeGB](#cachefromurl) , porque ERDDAP™ a menudo tiene que descargar el archivo antes de que pueda leerlo.
            * Datasets with data files stored on a high-bandwidth parallel file system, because it can deliver more data, faster, when requested. Ejemplos de sistemas de archivos paralelos incluyen [JBOD](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures) , [pNFS](http://www.pnfs.com/) , [GlusterFS](https://en.wikipedia.org/wiki/Gluster) , Amazon S3, y Google Cloud Storage.
                 
        
Advertencia: Al usar nThreads monedas1, mantén un ojo en ERDDAP 's uso de memoria, uso de hilos y capacidad de respuesta general (ver [ ERDDAP 's status page](/docs/server-admin/additional-information#status-page) ) . Ver comentarios sobre estos temas a continuación.
         
    * Para un conjunto de datos dado, esta configuración de nThreads puede venir de diferentes lugares:
        
        * Si datasets.xml para un conjunto de datos tiene un&lt;etiqueta de nThreads titulada (dentro de la&lt;dataset icono tag, no como atributo global) con un valor 1, ese valor de nThreads se utiliza. Así que puede especificar un número diferente para cada conjunto de datos.
        * Si no, datasets.xml tiene una&lt;nTableThreads titulada tag (para EDDTable DeFiles datasets) o un&lt;nGridThreads titulada (para EDDGrid conjuntos de datos) con un valor 1, fuera de un&lt;dataset icono, ese valor de nThreads se utiliza.
        * De lo contrario, se utiliza 1 hilo, que es una opción segura ya que utiliza la cantidad más pequeña de memoria.
             
        
Para el [original ERDDAP™ instalación](https://coastwatch.pfeg.noaa.gov/erddap/index.html) , usamos
        &lt;nTableThreads confía 6&lt;/nTableThreads confiar (Es un servidor poderoso.) Las solicitudes difíciles ahora toman el 30% de la hora anterior.
         
##### Supervisar el uso de recursos{#monitor-resource-usage} 
Cuando estás experimentando con diferentes configuraciones de nThreads (y quizás haciendo solicitudes de muestras difíciles a su ERDDAP ) , puede monitorear el uso de recursos de su computadora:
* En Macs, use Finder : Aplicaciones : Utilidades : Monitor de Actividad
* En Linux, utilice la parte superior
* En Windows 10, uso *Ctrl + Shift + Esc* abrir el Administrador de tareas
             
##### Advertencia: Reducción de la responsabilidad{#warning-decreased-responsiveness} 
In isolation, ERDDAP™ cumplirá una solicitud a un conjunto de datos con un nThreads más alto que si nThreads=1. Pero mientras se está tramitando esa solicitud, otras solicitudes de otros usuarios estarán algo concurridas y recibirán una respuesta más lenta. También, cuando ERDDAP™ responde a una solicitud dada, otros recursos informáticos (por ejemplo, acceso a la unidad de disco, ancho de banda de red) puede ser limitante, especialmente con ajustes de nThreads más altos. Así, con mayor configuración de nThreads, la capacidad de respuesta global del sistema será peor cuando se procesan múltiples solicitudes, ¡esto puede ser muy molesto para los usuarios&#33; Debido a esto: nunca establecer nThreads a más que el número de núcleos de CPU en el equipo. nThreads=1 es el escenario más justo desde cada solicitud (entre varias solicitudes simultáneas) obtendrá una parte igual de los recursos informáticos. Pero cuanto más poderoso sea el ordenador, menos será un problema.
         
##### Advertencia: Memoria Superior Uso para EDDGrid Datasets{#warning-higher-memory-use-for-eddgrid-datasets} 
El uso de memoria mientras las solicitudes de procesamiento son directamente proporcionales a la configuración de nThreads. Una regla razonablemente segura del pulgar es: usted necesita establecer [ ERDDAP 's configuración de memoria](/docs/server-admin/deploy-install#memory) al menos 2GB + (2GB \\* nTreads) . Algunas solicitudes a algunos conjuntos de datos necesitarán más memoria que eso. Por ejemplo, establecer nThreads=3 para cualquier EDDGrid dataset significa que el ajuste -Xmx debe ser al menos -Xmx8000M. Si ese ajuste de memoria es mayor de 3/4 la memoria física del ordenador, disminuir el ajuste de nThreads para que pueda disminuir el ajuste de memoria.

El uso de memoria de las solicitudes de procesamiento de hilos a los datasets EDDTable es casi siempre menor porque los archivos son generalmente mucho más pequeños. Sin embargo, si un conjunto de datos EDDTable dado tiene enorme (e.g., ñ=1 GB) los archivos de datos, entonces los comentarios arriba se aplicarán a esos conjuntos de datos también.

Sea cual sea el ajuste de nThreads, mantenga un ojo cercano en las estadísticas de uso de memoria en su [ ERDDAP 's status page](/docs/server-admin/additional-information#status-page) . Nunca deberías acercarte a maximizar el uso de la memoria en ERDDAP ; de lo contrario habrá graves errores y fallos.
        
##### Temporalmente Conjunto a 1{#temporarily-set-to-1} 
Si el uso de la memoria actual es incluso ligeramente alto, ERDDAP™ establecerá nThreads para esta solicitud a 1. Así, ERDDAP™ conserva la memoria cuando la memoria es escasa.
         
##### Regresos que reducen{#diminishing-returns} 
Hay rendimientos decrecientes para aumentar la configuración de nThreads: 2 hilos será mucho mejor que 1 (si ignoramos el overclocking dinámico) . Pero 3 será sólo un pedazo mejor que 2. Y 4 serán sólo marginalmente mejores que 3.

En una prueba de una difícil consulta a un gran conjunto de datos EDDTable, el tiempo de respuesta utilizando 1, 2, 3, 4, 5, 6 hilos fue 38, 36, 20, 18, 13, 11 segundos. (Ahora utilizamos nTableThreads=6 en ese servidor.) 

nThreads=2: Aunque, a menudo hay un beneficio significativo para especificar nThreads=2 en lugar de nThreads=1, a menudo no hará mucha diferencia en el tiempo del reloj necesario para responder a la solicitud de un usuario dado. La razón es: con nThreads=1, la mayoría de la CPU moderna a menudo [dinámicamente sobre las 24 horas](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)   (turbo boost) aumentar temporalmente la velocidad del reloj de la CPU. Así, con nThreads=1, el núcleo a menudo estará trabajando a una velocidad de reloj más alta que cada uno de los dos núcleos si utiliza nThreads=2. Sin embargo, todavía pensamos que es mejor utilizar nThreads=2 en lugar de nThreads=1, ya que ese ajuste producirá mejores resultados en una variedad más amplia de situaciones. Y por supuesto, si su computadora tiene suficientes núcleos de CPU, un ajuste de nThreads aún más alto debe producir mejores resultados.

Como se mencionó anteriormente, los ajustes de nThreads muy altos pueden dar lugar a respuestas más rápidas a algunas solicitudes, pero el riesgo de disminución general ERDDAP™ capacidad de respuesta y uso de memoria alta (como se señaló anteriormente) mientras esas solicitudes se procesan significa que generalmente no es una buena idea.
        
##### CPU Cores{#cpu-cores} 
Usted nunca debe establecer nThreads a un número mayor que el número de núcleos de CPU en la CPU del ordenador. Esencialmente todas las CPU modernas tienen múltiples núcleos (por ejemplo, 2, 4 o 8) . Algunos ordenadores incluso tienen múltiples CPU (por ejemplo, 2 CPU \\* 4 núcleos/CPU = 8 núcleos de CPU) . Para averiguar cuántos CPU y núcleos tiene un ordenador:

* En Macs, uso *Opción clave* : Menú Apple : Información del sistema
* En Linux, utilice gato /proc/cpuinfo
* En Windows 10, uso *Ctrl + Shift + Esc* para abrir Administrador de tareas : Performance (Los procesadores lógicos muestran el número total de núcleos de CPU) 

Sí, la mayoría de los procesadores de estos días dicen que soportan 2 hilos por núcleo (via [hyper-threading](https://en.wikipedia.org/wiki/Hyper-threading) ) , pero los 2 hilos comparten recursos de computación, por lo que no verás el doble de rendimiento en una CPU bajo carga pesada. Por ejemplo, una computadora con una CPU con 4 núcleos puede pretender apoyar hasta 8 hilos, pero nunca debe exceder nThreads=4 en eso ERDDAP . Recuerde que:

* Los nThreads se fijan en ERDDAP™ es por petición. ERDDAP™ a menudo maneja múltiples solicitudes simultáneamente.
*    ERDDAP™ hace cosas que no sean solicitudes de proceso, por ejemplo, volver a cargar conjuntos de datos.
* Cuando ERDDAP™ responde a una solicitud dada, otros recursos informáticos (por ejemplo, acceso a la unidad de disco, ancho de banda de red) puede estar limitando. Cuanto más alto establezcas nThreads, más probable que estos otros recursos sean maxed out y se ralentizará ERDDAP Es una respuesta general.
* El sistema operativo hace cosas que no funcionan ERDDAP .

Así que es mejor no establecer la configuración de nThreads a más que el número de núcleos en la CPU del ordenador.
         
##### Su viaje mayo Vary (YMMV)  {#your-mileage-may-vary-ymmv} 
Los resultados de diferentes ajustes de nThreads variarán enormemente para diferentes solicitudes a diferentes conjuntos de datos en diferentes sistemas. Si realmente quieres saber el efecto de diferentes configuraciones de nThreads, haz pruebas realistas.
         
##### ¿Por qué nThreads por solicitud?{#why-nthreads-per-request} 
Puedo escuchar a algunos de ustedes pensando: "¿Por qué hay nThreads por petición? Si yo estuviera codificando esto, usaría un grupo de hilos de trabajo permanente y una cola de mensajería para un mejor rendimiento". El problema con el uso de un grupo de hilos de trabajo y una cola de mensajería es que una solicitud difícil inundaría la cola con numerosas tareas lentas. Eso bloquearía efectivamente ERDDAP™ desde el inicio de las tareas relacionadas con otras solicitudes hasta que la solicitud inicial (esencialmente) acabado. Por lo tanto, incluso simples solicitudes posteriores responderían súper lentamente. ERDDAP 's uso de nThreads por solicitud conduce a un uso mucho más justo de los recursos informáticos.
         
##### nThreads vs. Multiple Worker Computers{#nthreads-vs-multiple-worker-computers} 
Desafortunadamente, ERDDAP 's nThreads sistema nunca será tan eficaz como la verdadera paralelización a través de múltiples computadoras de trabajo, con cada uno trabajando en un trozo de datos, en la forma en que Hadoop o Apache Spark se utilizan generalmente. Cuando la tarea es realmente paralizada/distribuida a múltiples computadoras, cada ordenador puede utilizar todos sus recursos por su parte de la tarea. Con ERDDAP 's nThreads sistema, cada uno de los hilos está compitiendo por el ancho de banda del mismo ordenador, unidades de disco, memoria, etc. Desafortunadamente, la mayoría de nosotros no tenemos los recursos o fondos para establecer o incluso alquilar (en Amazon Web Services (AWS) o Google Cloud Platform (GCP) ) Redes masivas de computadoras. Además, a diferencia de una base de datos relacional que se permite devolver las filas de resultados en cualquier orden, ERDDAP™ hace una promesa de devolver las filas de resultado en un orden consistente. Esta restricción hace ERDDAP 's nThreads implementación menos eficiente. Pero... ERDDAP 's nThreads es útil en muchos casos.

Sin embargo, hay maneras de hacer ERDDAP™ escala para manejar un gran número de solicitudes rápidamente estableciendo un [grid/cluster/federation of ERDDAP s](/docs/server-admin/scaling) .
         
#### &lt;paletas{#palettes} 
* Empezando con ERDDAP™ versión 2.12, datasets.xml puede incluir un&lt;palettes titulada (dentro&lt;erddapDatasets confiar) que anula el&lt;paletas valor etiqueta de mensajes.xml (o revierte al valor de los mensajes.xml si la etiqueta en datasets.xml Está vacío.) . Esto le permite cambiar la lista de paletas disponibles mientras ERDDAP™ está corriendo. También te permite hacer un cambio y que persista cuando instalas una nueva versión de ERDDAP .
Advertencia: Las paletas enumeradas en datasets.xml debe ser un superset de las paletas enumeradas en los mensajes.xml; de lo contrario ERDDAP™ lanzar una excepción y dejar de procesar datasets.xml . Esto garantiza que todo ERDDAP™ al menos las instalaciones soportan las mismas paletas centrales.
ATENCIÓN: ERDDAP™ comprueba que los archivos de paletas especificados en los mensajes.xml realmente existen, pero no comprueba los archivos de paleta enumerados en datasets.xml . Es su responsabilidad asegurar que los archivos estén presentes.
    
También comienza con ERDDAP™ versión 2.12, si usted hace un subdirectorio de ficheros cptfiles en el ERDDAP™ directorio de contenidos, ERDDAP™ copiará todos los archivos \\*.cpt en ese directorio en el \\[ tomcat \\] /webapps/erddap/WEB-INF/cptfiles directorio cada vez ERDDAP™ Empieza. Por lo tanto, si pone archivos cpt personalizados en ese directorio, esos archivos serán utilizados por ERDDAP™ , sin esfuerzo adicional por su parte, incluso cuando instala una nueva versión de ERDDAP .
    
ADVERTENCIA: Si añades paletas personalizadas a tus ERDDAP™ y usted tiene EDDGrid DeErddap y/o EDDTableDesde los conjuntos de datos de Erddap en sus ERDDAP™ , entonces los usuarios verán sus opciones de paleta personalizadas en ERDDAP™ Hacer una página web de Gráfico, pero si el usuario trata de utilizarlas, obtendrá un gráfico con el predeterminado (Normalmente Rainbow) Paleta. Esto se debe a que la imagen está hecha por el control remoto ERDDAP™ que no tiene la paleta personalizada. Las únicas soluciones ahora son enviar por correo electrónico a distancia ERDDAP™ administrador para agregar sus paletas personalizadas a sus/ellas ERDDAP o correo electrónico Chris. John en noaa.gov para pedir que las paletas se añadan al estándar ERDDAP™ distribución.
    
#### &lt;onChange{#onchange} 
* [ ** &lt;onChange Conf ** ] (#onchange) es una etiqueta OPTIONAL dentro de un&lt;dataset universidad tag en datasets.xml que especifica una acción que se hará cuando se crea este conjunto de datos (cuando ERDDAP™ está descansado) y cuando este conjunto de datos cambie de cualquier manera.
    * Actualmente, para EDDGrid subclases, cualquier cambio en metadatos o a una variable de eje (por ejemplo, un nuevo punto de tiempo para datos casi en tiempo real) se considera un cambio, pero una recarga del conjunto de datos no se considera un cambio (por sí misma) .
    * Actualmente, para subclases EDDTable, cualquier recarga del conjunto de datos se considera un cambio.
    * Actualmente sólo se permiten dos tipos de acciones:
        * "http://"o "https://"-- Si la acción comienza con "http://"o "https://", ERDDAP™ enviará un HTTP GET solicitar a la URL especificada. La respuesta será ignorada. Por ejemplo, la URL puede decir que algún otro servicio web haga algo.
            * Si la URL tiene una parte de consulta (después de la "?) , debe ser ya [por ciento codificado](https://en.wikipedia.org/wiki/Percent-encoding) . Necesitas codificar caracteres especiales en las limitaciones (y el principal '=' limitaciones) en la forma %HHH, donde HH es el valor hexadecimal de 2 dígitos del personaje. Por lo general, sólo necesita convertir algunos de los caracteres de puntuación: % en %25, &quot; en %26, "en %22,&lt;en %3C, = en %3D, NOS en %3E, + en %2B, | en %7C, \\[ en %5B, \\] en %5D, espacio en %20, y convertir todos los caracteres por encima de #127 en su forma UTF-8 y luego codifica cada byte de la forma UTF-8 en el formato %H (pedir ayuda a un programador) .
Por ejemplo, &quot; stationID √≥="41004"
se convierte en stationID %2241004%22
La codificación porcentual es generalmente necesaria cuando usted accede ERDDAP a través de software que no sea un navegador. Los navegadores generalmente manejan codificación por ciento para usted.
En algunas situaciones, usted necesita codificar por ciento todos los caracteres que no sean A-Za-z0-9\\_-&#33;.~ ' () \\*, pero todavía no codifican el 'plaza' inicial o el principal '=' en limitaciones.
Los idiomas de programación tienen herramientas para hacer esto (por ejemplo, ver Java 's [ java.net.URLEncoder ](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html) y Java Script's [encodeURIComponent()] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) ) y hay
                 [sitios web que por ciento codifica / decodifica para usted](https://www.url-encode-decode.com/) .
            * Desde datasets.xml es un archivo XML, usted debe también &quot; codificar TODA', '&lt;', y 'conejérte' en la URL como 'conjunto', '&lt;', y 'corporagt;' después de una codificación.
            * Ejemplo: Para una URL que puede escribir en un navegador como:
                https://www.company.com/webService?department=R%26D&param2=value2  
Usted debe especificar un&lt;enChange universidad etiqueta via (en una línea) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * mailto: -- Si la acción comienza con "mailto:", ERDDAP™ enviará un correo electrónico a la dirección de correo electrónico siguiente indicando que el conjunto de datos ha sido actualizado/ cambiado.
Por ejemplo:&lt;onChange Confmailto:john.smith@company.com&lt;/onChange Conf Si tienes una buena razón ERDDAP™ para apoyar otro tipo de acción, envíenos un email describiendo lo que quieras.
    * Esta etiqueta es OPTIONAL. Puede haber tantas de estas etiquetas como quieras. Utilice una de estas etiquetas para cada acción a realizar.
    * Esto es análogo a ERDDAP 's email/URL suscripción sistema, pero estas acciones no se almacenan persistentemente (i.e., sólo se almacenan en un objeto EDD) .
    * Para eliminar una suscripción, simplemente eliminar el&lt;enChange Conf. El cambio se señalará la próxima vez que se vuelva a cargar el conjunto de datos.
         
#### &lt;reload EveryNMinutes{#reloadeverynminutes} 
* [ ** &lt;reload EveryNMinutes ** ] (#reloadeverynminutes) es una etiqueta OPTIONAL dentro de un&lt;dataset universidad tag en datasets.xml de casi todos los tipos de conjuntos de datos que especifica con qué frecuencia se debe recargar el conjunto de datos. Por ejemplo,
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * Generalmente, conjuntos de datos que cambian con frecuencia (por ejemplo, obtener nuevos archivos de datos) debe recargarse con frecuencia, por ejemplo, cada 60 minutos.
    * Los conjuntos de datos que cambian de forma infrecuente deben recargarse de forma infrecuente, por ejemplo, cada 1440 minutos (diario) o 10080 minutos (semanales) .
    * Esta etiqueta es OPTIONAL, pero recomendada. El valor predeterminado es 10080.
    * Un ejemplo es:&lt;reloadEveryNMinutes&lt;/reload EveryNMinutes
    * Cuando se recarga un conjunto de datos, todos los archivos en el *bigParentDirectory* /cache/ * datasetID * directorio se eliminan.
    * No importa a qué se establezca esto, un conjunto de datos no se cargará con más frecuencia que&lt;loadDatasetsMinMinutes (por defecto = 15) , según se especifica en [setup.xml](/docs/server-admin/deploy-install#setupxml) . Así que si quieres que los conjuntos de datos se vuelvan a cargar con mucha frecuencia, tienes que configurar ambos reloadEveryNMinutes y cargarDatasets MinMinutes a pequeños valores.
    * No coloque la recargaCadaNMinutes al mismo valor que la cargaDatasets MinMinutes, porque es probable que el tiempo transcurrido sea (por ejemplo) 14:58 o 15:02, por lo que el conjunto de datos sólo será recargado en aproximadamente la mitad de las recargas principales. En su lugar, use un menor (por ejemplo, 10) o más grande (por ejemplo, 20) reload Cada NMinutes valor.
    * Independientemente de la recargaEveryNMinutes, puede decir manualmente ERDDAP™ para volver a cargar un conjunto de datos específico lo antes posible a través de un [flag file](/docs/server-admin/additional-information#flag) .
    * Para los programadores curiosos - En ERDDAP™ , la recarga de todos los conjuntos de datos se maneja por dos hilos de un solo propósito. Un hilo inicia una recarga menor si encuentra un archivo de bandera o una recarga importante (que comprueba todos los conjuntos de datos para ver si necesitan ser recargados) . El otro hilo hace la recarga real de los conjuntos de datos uno a la vez. Estos hilos funcionan en el fondo asegurando que todos los conjuntos de datos se mantengan actualizados. El hilo que realmente hace las recargas prepara una nueva versión de un conjunto de datos y luego lo cambia en su lugar (esencialmente reemplazando la antigua versión atópica) . Así que es muy posible que la siguiente secuencia de eventos ocurra (Es algo bueno) :
        
        1.   ERDDAP™ comienza a cargar un conjunto de datos (haciendo una nueva versión) en el fondo.
        2. El usuario 'A' hace una solicitud al conjunto de datos. ERDDAP™ utiliza la versión actual del conjunto de datos para crear la respuesta. (Eso es bueno. No hubo demora para el usuario, y la versión actual del conjunto de datos nunca debería ser muy estable.) 
        3.   ERDDAP™ termina creando la nueva versión recargada del conjunto de datos y intercambia esa nueva versión en producción. Todas las nuevas solicitudes posteriores son manejadas por la nueva versión del conjunto de datos. Para la consistencia, la solicitud del usuario A sigue siendo llenada por la versión original.
        4. El usuario 'B' hace una solicitud al conjunto de datos y ERDDAP™ utiliza la nueva versión del conjunto de datos para crear la respuesta.
        5. Eventualmente las solicitudes del usuario A y el usuario B se completan (quizás A's termina primero, tal vez B termine primero) .
        
Puedo oír a alguien diciendo: "Sólo dos trillones&#33; ¡Ja&#33; ¡Eso es cojo&#33; Debería configurarlo para que la recarga de conjuntos de datos use tantos hilos como sea necesario, por lo que todo se hace más rápido y con poco o ningún retraso". Sí y no. El problema es que cargar más de un conjunto de datos a la vez crea varios problemas nuevos. Todos necesitan ser resueltos o tratados. El sistema actual funciona bien y tiene problemas manejables (por ejemplo, potencial para el retraso antes de que se note una bandera) . (Si necesita ayuda para manejarlos, vea nuestra [sección sobre la obtención de apoyo adicional](/docs/intro#support) .) Los relacionados [actualización EveryNMillis](#updateeverynmillis) . El sistema funciona dentro de los hilos de respuesta, por lo que puede y conduce a múltiples conjuntos de datos que se actualizan (no la recarga completa) simultáneamente.
##### Proactive vs. Reactive{#proactive-vs-reactive} 
 ERDDAP 's sistema de recarga es proactivo - los conjuntos de datos se recargan poco después de su recarga Cada hora de las Nueces se levanta (es decir, se convierten en "stale", pero nunca mucho) , si el conjunto de datos está recibiendo solicitudes de usuarios o no. Así que... ERDDAP™ Los conjuntos de datos siempre están actualizados y listos para su uso. Esto contrasta con el enfoque reactivo de THREDDS: la solicitud de un usuario es lo que le dice a THREDDS para comprobar si un conjunto de datos está estancado (puede ser muy firme) . Si está estancado, THREDDS hace que el usuario espere (a menudo por unos minutos) mientras el conjunto de datos se recarga.
        
#### &lt;actualización EveryNMillis curvagt;{#updateeverynmillis} 
* [ ** &lt;actualizaciónTodosNMillis ** ] (#Updateeverynmillis) es una etiqueta OPTIONAL dentro de un&lt;dataset universidad tag en datasets.xml de algunos tipos de dataset que ayudan ERDDAP™ trabajar con conjuntos de datos que cambian con frecuencia (tan a menudo como aproximadamente cada segundo) . Diferente ERDDAP Es regular, proactivo, [&lt;reload EveryNMinutes confía] (#reloadeverynminutes) sistema para recargar completamente cada conjunto de datos, este sistema adicional OPTIONAL es reactiva (activado por una solicitud de usuario) y más rápido porque es incremental (sólo actualizar la información que necesita ser actualizada) . Por ejemplo, si una solicitud es EDDGrid FromDap dataset ocurre más que el número especificado de milisegundos desde la última actualización, ERDDAP™ verá si hay nuevos valores para la izquierda (primero, generalmente "time" ) dimension y, si es así, simplemente descarga esos nuevos valores antes de manejar la solicitud del usuario. Este sistema es muy bueno para mantener un conjunto de datos que cambia rápidamente con las mínimas exigencias de la fuente de datos, pero a costa de ralentizar ligeramente el procesamiento de algunas solicitudes de los usuarios.
    * Para utilizar este sistema, añadir (por ejemplo) :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
justo después de la&lt;reloadEveryNMinutes etiqueta para el conjunto de datos en datasets.xml . El número de milisegundos que especifique puede ser tan pequeño como 1 (para asegurar que el conjunto de datos esté siempre actualizado) . Un valor de 0 (por defecto) o un número negativo apaga el sistema.
    * Debido a su naturaleza incremental, las actualizaciones deben terminar muy rápidamente, por lo que los usuarios nunca deben tener que esperar mucho tiempo.
    * Si una segunda solicitud de datos llega antes de que la actualización anterior haya terminado, la segunda solicitud no activará otra actualización.
    * A lo largo de la documentación, trataremos de utilizar la palabra "recargar" para recargas regulares de conjunto de datos completos y "actualizar" para estas nuevas actualizaciones incrementales parciales.
    * Para fines de prueba, algunos diagnósticos se imprimen a log.txt si [&lt;logLevel] (#loglevel) dentro datasets.xml está listo para "todo".
    * Si utiliza actualizaciones incrementales y especialmente si la izquierda más (primera) , por ejemplo, el tiempo, el eje es grande, es posible que desee establecer&lt;reloadEveryNMinutes confía a un número mayor (¿1440?) , por lo que las actualizaciones hacen la mayor parte del trabajo para mantener el conjunto de datos actualizado, y las recargas completas se hacen de forma infrecuente.
    * Nota: este nuevo sistema de actualización actualiza metadatos (por ejemplo, tiempo actual\\_range , time\\_coverage\\_end, ...) pero no activa el Cambio (Correo electrónico o URL táctil) o cambiar el RSS Alimentación (Tal vez debería...) .
    * Para todos los conjuntos de datos que utilizan subclases de [ EDDGrid DeFiles](#eddgridfromfiles) y [EDDTableDeFiles](#eddtablefromfiles) :
        *    **ATENCIÓN:** cuando añada un nuevo archivo de datos a un conjunto de datos copiandolo en el directorio que ERDDAP™ mira, hay un peligro que ERDDAP™ notará el archivo parcialmente escrito; tratar de leerlo, pero fallar porque el archivo es incompleto; declarar el archivo como un archivo "bad" y eliminarlo (temporalmente) desde el conjunto de datos.
Para evitar esto, nosotros **STRONGLY RECOMMEND** que copia un nuevo archivo en el directorio con un nombre temporal (por ejemplo, 20150226 .nc Tmp) que no coincide con el archivo Datasets NombreRegex (* .nc ) , luego cambiar el nombre del archivo al nombre correcto (por ejemplo, 20150226 .nc ) . Si utiliza este enfoque, ERDDAP™ ignorará el archivo temporal y sólo notará el archivo correctamente nombrado cuando esté completo y listo para ser utilizado.
        * Si modifica los archivos de datos existentes en su lugar (por ejemplo, añadir un nuevo punto de datos) ,&lt;ActualizarTodosNMillis confiar trabajará bien si los cambios aparecen atómico (en un instante) y el archivo siempre es un archivo válido. Por ejemplo, la biblioteca netcdf-java permite adiciones a la dimensión ilimitada de un "clásico" .nc v3 archivo para ser hecho atómico.
            &lt;updateEveryNMillis confiar trabajará mal si el archivo es inválido mientras se están haciendo los cambios.
        *   &lt;updateEveryNMillis confiar trabajará bien para conjuntos de datos donde uno o unos pocos archivos cambian en poco tiempo.
        *   &lt;ActualizaciónTodosNMillis confiar trabajará mal para conjuntos de datos donde un gran número de archivos cambian en poco tiempo (a menos que los cambios parezcan atómicos) . Para estos conjuntos de datos, es mejor no utilizar&lt;Actualizar EveryNMillis confiar y establecer un [bandera](/docs/server-admin/additional-information#set-dataset-flag) para decir ERDDAP™ para recargar el conjunto de datos.
        *   &lt;actualizaciónTodosNMillis no actualiza la información asociada con [&lt; subsetVariables &gt; (#subsetvariables) . Normalmente, esto no es un problema, porque el subsetVariables tienen información sobre cosas que no cambian muy a menudo (por ejemplo, la lista de nombres de estación, latitudes y longitudes) . Si subsetVariables Cambios de datos (por ejemplo, cuando se añade una nueva estación al conjunto de datos) , luego contacte con [Bandera URL](/docs/server-admin/additional-information#set-dataset-flag) para que el conjunto de datos diga ERDDAP™ para recargar el conjunto de datos. De lo contrario, ERDDAP™ no notará el nuevo subconjunto Información variable hasta la próxima vez que se vuelva a cargar el conjunto de datos (&lt;reloadEveryNMinutes confía).
        * Nuestra recomendación genérica es utilizar:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * ¿TROUBLE? En las computadoras Linux, si estás usando&lt;actualizaciónTodosNMillis con EDDGrid DesdeFiles o EDDTableDesde clases de Files, puede ver un problema donde un conjunto de datos no se carga (ocasionalmente o consistentemente) con el mensaje de error: "IOException: El límite de usuario de las instancias alcanzadas o demasiados archivos abiertos". La causa puede ser un error Java que hace que los casos inotifiquen no se recojan basura. Este problema se evita en ERDDAP™ v1.66 y superior. Así que la mejor solución es cambiar la última versión de ERDDAP .
Si eso no resuelve el problema (es decir, si usted tiene un número realmente grande de conjuntos de datos usando&lt;actualizar EveryNMillis monedas), puede solucionar este problema llamando:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
O, use números más altos si el problema persiste. El predeterminado para los relojes es 8192. El predeterminado para los casos es 128.
    * Puedes poner&lt;actualizaciónMaxEvents confianza10&lt;/updateMaxEvents confianza dentro datasets.xml   (en con los otros ajustes cerca de la parte superior) para cambiar el número máximo de cambios de archivo (default=10) que será procesado por el sistema de actualizaciónEveryNMillis. Un número mayor puede ser útil para dataset donde es muy importante que se mantengan siempre actualizados. Ver el [actualizaciónMaxEvents documentación](#updatemaxevents) .
    * Para los programadores curioso - estas actualizaciones incrementales, a diferencia de ERDDAP Está lleno [reload EveryNMinutes](#reloadeverynminutes) sistema, ocurre dentro de los hilos de solicitud de usuario. Por lo tanto, cualquier número de conjuntos de datos puede actualizarse simultáneamente. Hay código (y una cerradura) para asegurar que sólo un hilo esté trabajando en una actualización para cualquier conjunto de datos dado en cualquier momento dado. Permitir múltiples actualizaciones simultáneas fue fácil; permitir múltiples recargas completas simultáneas sería más difícil.
         
#### &lt;sourceCanConstrainStringEQNE compartirgt;{#sourcecanconstrainstringeqne} 
* [ ** &lt;sourceCanConstrainStringEQNE ** ] (#sourcecanconstrainstringeqne) es una etiqueta OPTIONAL dentro de un EDDTable&lt;dataset universidad tag en datasets.xml que especifica si la fuente puede limitar variables String con los operadores = y &#33;=.
    * Para EDDTableDeDapSequence, esto se aplica únicamente a la secuencia externa de variables String. Se supone que la fuente no puede manejar ninguna limitación en las variables de secuencia interna.
    * Esta etiqueta es OPTIONAL. Los valores válidos son verdaderos (por defecto) y falso.
    * Para EDDTableDeDapSequence OPeNDAP Servidores DRDS, esto debe ser establecido a la verdad (por defecto) .
    * Para EDDTableDeDapSequence Servidores Dapper, esto debería ser falso.
    * Un ejemplo es:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;sourceCanConstrainStringGTLT{#sourcecanconstrainstringgtlt} 
* [ ** &lt;sourceCanConstrainStringGTLT ** ] (#sourcecanconstrainstringgtlt) es una etiqueta OPTIONAL dentro de un EDDTable&lt;dataset icono que especifica si la fuente puede limitar variables String&lt;,&lt;=, не, y не= operadores.
    * Para EDDTableDeDapSequence, esto se aplica únicamente a la secuencia externa de variables String. Se supone que la fuente no puede manejar ninguna limitación en las variables de secuencia interna.
    * Los valores válidos son verdaderos (por defecto) y falso.
    * Esta etiqueta es OPTIONAL. El defecto es cierto.
    * Para EDDTableDeDapSequence OPeNDAP Servidores DRDS, esto debe ser establecido a la verdad (por defecto) .
    * Para EDDTableDeDapSequence Servidores Dapper, esto debería ser falso.
    * Un ejemplo es:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;sourceCanConstrainStringRegex{#sourcecanconstrainstringregex} 
* [ ** &lt;sourceCanConstrainStringRegex ** ] (#sourcecanconstrainstringregex) es una etiqueta OPTIONAL dentro de un EDDTable&lt;dataset icono que especifica si la fuente puede limitar variables String por expresiones regulares, y si es así, qué es el operador.
    * Valores válidos son "=~" (el DAP estándar) , "~=" (con el apoyo de muchos DAP servidores) o " (indicando que la fuente no soporta expresiones regulares) .
    * Esta etiqueta es OPTIONAL. El defecto es ".
    * Para EDDTableDeDapSequence OPeNDAP Servidores DRDS, esto debe ser establecido a "" (por defecto) .
    * Para EDDTableDeDapSequence Servidores Dapper, esto debe ser establecido a "" (por defecto) .
    * Un ejemplo es:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;sourceCanDoDistinct.{#sourcecandodistinct} 
* [ ** &lt;sourceCanDoDistinct ** ] (#sourcecandodistinct) es una etiqueta OPTIONAL dentro de un EDDTableDesdeDatabase&lt;dataset icono tag que especifica si la base de datos fuente debe manejar &distinct () limitaciones en las consultas de los usuarios.
    * Esta etiqueta es OPTIONAL. Valores válidos no ( ERDDAP™ maneja distintos; el predeterminado) , parcial (la fuente maneja diferente y ERDDAP™ lo maneja de nuevo) , y sí (la fuente maneja distintos) .
    * Si usted está usando no y ERDDAP™ se está quedando sin memoria cuando se maneja diferente, use sí.
    * Si está usando sí y la base de datos fuente maneja muy lentamente, use no.
    * parcial le da lo peor de ambos: es lento porque el manejo de la base de datos de diferencia es lento y puede funcionar fuera de la memoria en ERDDAP .
    * Las bases de datos interpretan el DISTINCT como una solicitud de filas únicas de resultados, mientras que ERDDAP™ lo interpreta como una solicitud de una lista ordenada de filas únicas de resultados. Si lo pones parcial o sí, ERDDAP™ automáticamente también cuenta la base de datos para ordenar los resultados.
    * Una pequeña diferencia en los resultados:
Sin | parcial, ERDDAP™ ordenará "" al inicio de los resultados (antes de cuerdas no ") .
Con sí, la base de datos puede (Postgres) "" al final de los resultados (después de cadenas no ") .
Supongo que esto también afectará la clasificación de palabras cortas versus palabras más largas que comienzan con la palabra corta. Por ejemplo, ERDDAP™ ordenará "Simon" antes de "Simons".
    * Un ejemplo es:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;sourceCanOrderBy juntosgt;{#sourcecanorderby} 
* [ ** &lt;fuente CanOrderBy confía ** ] (#sourcecanorderby) es una etiqueta OPTIONAL dentro de un EDDTableDesdeDatabase&lt;dataset icono tag que especifica si la base de datos fuente debe manejar &quot; orderBy  (...) limitaciones en las consultas de los usuarios.
    * Esta etiqueta es OPTIONAL. Valores válidos no ( ERDDAP™ mangos orderBy  (...) ; el defecto) , parcial (la fuente maneja orderBy y ERDDAP™ lo maneja de nuevo) , y sí (la fuente maneja orderBy  (...) ) .
    * Si usted está usando no y ERDDAP™ se está quedando sin memoria cuando el manejo orderBy  (...) , usa sí.
    * Si está usando sí y la base de datos fuente maneja orderBy  (...) demasiado despacio, usa no.
    * parcial le da lo peor de ambos: es lento porque el manejo de la base de datos de orderBy  (...) es lento y puede funcionar sin memoria en ERDDAP .
    * Una pequeña diferencia en los resultados:
Sin | parcial, ERDDAP™ ordenará "" al inicio de los resultados (antes de cuerdas no ") .
Con sí, la base de datos puede (Postgres) "" al final de los resultados (después de cadenas no ") .
Esto también puede afectar la clasificación de palabras cortas versus palabras más largas que comienzan con la palabra corta. Por ejemplo, ERDDAP™ ordenará "Simon" antes de "Simons", pero no estoy seguro de cómo una base de datos los ordenará.
    * Un ejemplo es:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;sourceNeedsExpandedFP\\_EQ plagagt;{#sourceneedsexpandedfp_eq} 
* [ ** &lt;sourceNeedsExpandedFP\\_EQ ** ] (#sourceneedfp_eq) es una etiqueta OPTIONAL dentro de un EDDTable&lt;dataset icono que especifica (verdadero (por defecto) o falso) si la fuente necesita ayuda con las consultas&lt;numérico Variable ratio=&lt;flotantePointValue confiar (y&#33;=, &gt;=,&lt;=). Por ejemplo,
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * Para algunas fuentes de datos, consultas numéricas que implican =, &#33;=,&lt;=, o &gt;= puede no funcionar como se desee con números de puntos flotantes. Por ejemplo, una búsqueda de longitud=220.2 puede fallar si el valor se almacena como 220.20000000001.
    * Este problema surge porque los números de puntos flotantes son [no representado exactamente dentro de las computadoras](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) .
    * Si fuenteNeedsExpandedFP\\_EQ se establece a la verdad (por defecto) , ERDDAP™ modifica las consultas enviadas a la fuente de datos para evitar este problema. Siempre es seguro y bueno dejar este set a la verdad.
         
#### &lt; sourceUrl &gt;{#sourceurl} 
* [ ** &lt; sourceUrl ■ ** ] (#sourceurl) es una etiqueta común dentro de un conjunto de datos global&lt; addAttributes etiqueta ± que especifica la URL que es la fuente de los datos.
    * Un ejemplo es:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (pero lo puso todo en una línea) 
    * In ERDDAP™ , todos los conjuntos de datos tendrán un " sourceUrl "en los atributos globales combinados que se muestran a los usuarios.
    * Para la mayoría de los tipos de conjuntos de datos, esta etiqueta es REQUIRED. Vea la descripción del tipo de conjunto de datos para averiguar si esto es REQUIIDO o no.
    * Para algunos conjuntos de datos, el&lt; sourceUrl No se permite la etiqueta. En su lugar, usted debe proporcionar un " sourceUrl " [atributo mundial](#global-attributes) , por lo general en el mundo \\ addAttributes &lt;. Si no hay URL de origen real (por ejemplo, si los datos se almacenan en archivos locales) , este atributo a menudo sólo tiene un valor de titular, por ejemplo,&lt;att name="name" (archivos locales) &lt;/att].
    * Para la mayoría de los conjuntos de datos, esta es la base de la URL que se utiliza para solicitar datos. Por ejemplo, DAP servidores, esta es la URL a la que se pueden añadir .dods, .das, .dds o .html.
    * Desde datasets.xml es un archivo XML, usted debe también codificar 'cada', '&lt;', y 'conejérte' en la URL como 'conjunto', '&lt;', y 'jódete'.
    * Para la mayoría de los tipos de dataset, ERDDAP™ añade el original sourceUrl   (el "localSourceUrl" en el código fuente) a la [atributos globales](#global-attributes)   (donde se convierte en el "publicSourceUrl" en el código fuente) . Cuando la fuente de datos es archivos locales, ERDDAP™ adiciones sourceUrl = (archivos locales) "a los atributos globales como precaución de seguridad. Cuando la fuente de datos es una base de datos, ERDDAP™ adiciones sourceUrl = (base de datos fuente) "a los atributos globales como precaución de seguridad. Si algunos de sus conjuntos de datos usan no públicos sourceUrl 's (generalmente porque su computadora está en su DMZ o en una LAN local) Puedes usar [&lt;convertToPublicSourceUrl] (#converttopublicsourceurl) etiquetas para especificar cómo convertir el local sourceUrl s to public sourceUrl s.
    * A sourceUrl puede comenzar con http:// , https:// , ftp://, y tal vez otros prefijos. https Las conexiones leen y comprueban el certificado digital de la fuente para asegurar que la fuente es quien dicen que son. En casos raros, este cheque puede fallar con el error "javax.net.ssl.SSLProtocolExcepción: Handhake alert: unrecognized\\_name". Esto probablemente se debe al nombre de dominio en el certificado que no coincide con el nombre de dominio que está utilizando. Usted puede y debe leer los detalles de los sourceUrl 's certificado en su navegador web, en particular, la lista de "DNS Name"s en la sección "Subject Alternative Name".
        
En algunos casos, sourceUrl Usted está usando puede ser un alias del nombre de dominio en el certificado. Por ejemplo,
        https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/lanzará este error, pero
        https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/, que utiliza el nombre de dominio en el certificado, no lo hará. Por lo tanto, la solución en estos casos es encontrar y utilizar el nombre de dominio en el certificado. Si no lo encuentra en el certificado, comuníquese con el proveedor de datos.
        
En otros casos, el nombre de dominio del certificado puede ser para un grupo de nombres. Si esto ocurre o el problema es insolvable, por favor envíe un correo electrónico a Chris. John en Noaa.gov para denunciar el problema.
         

#### &lt;addAttributes&gt; {#addattributes} 
* [ ** &lt; addAttributes ■ ** ] (#addattributes) es una etiqueta OPTIONAL para cada conjunto de datos y para cada variable que permite ERDDAP Los administradores controlan los atributos de metadatos asociados con un conjunto de datos y sus variables.
    *    ERDDAP™ combina los atributos de la fuente del conjunto de datos ("sourceAttributes") y el addAttributes "que usted define en datasets.xml   (que tienen prioridad) para hacer los "Attributos combinados", que son ERDDAP™ Los usuarios lo ven. Por lo tanto, usted puede utilizar addAttributes para redefinir los valores de fuenteAtributos, añadir nuevos atributos, o eliminar atributos.
    * El&lt; addAttributes ## tag encloses 0 or more ** &lt;ent ** subtags, que se utilizan para especificar atributos individuales.
    * Cada atributo consiste en un nombre y un valor (que tiene un tipo de datos específico, por ejemplo, doble) .
    * Sólo puede haber un atributo con un nombre dado. Si hay más, el último tiene prioridad.
    * El valor puede ser un valor único o una lista de valores separada del espacio.
    * Sintaxis
        * El orden del&lt;subtags int addAttributes no es importante.
        * El&lt;el formato subtag
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * El nombre de destino de todos los atributos DEBE comenzar con una carta (A-Z, a-z) Y DEBE contener sólo los caracteres A-Z, a-z, 0-9, o '\\_'.
        * Si&lt;o un valor null, ese atributo se eliminará de los atributos combinados.
Por ejemplo,&lt;at name="rows" / prenda eliminará filas de los atributos combinados.
Por ejemplo,&lt;att name="coordinates"&lt;/att] eliminará las coordenadas de los atributos combinados.
##### atributo Tipo{#attributetype} 
* [El valor tipo OPIONAL para&lt;att títulos] (#attributetype) indica el tipo de datos para los valores. El tipo predeterminado es String. Un ejemplo de un atributo String es:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * Tipos válidos para valores individuales son byte (8-bit entero) , corto (entero firmado de 16 bits) , int (32 bits firmados) , largo (64 bits firmados) , flotador (Punto flotante de 32 bits) doble (Punto flotante de 64 bits) , char y String. Por ejemplo,
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
Ver estas notas sobre [Tipo de datos](#char) .
Ver estas notas sobre [Tipo de datos largos](#long) .
        
    * Tipos válidos para listas separadas por espacio de valores (o valores individuales) son byteList, shortList, unsignedShortList, charList, intList, longList, flotaList, double Listo. Por ejemplo,
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
Un ShortList no firmado le permite especificar una lista de cortos sin firmar, pero se convertirán en una lista de los caracteres Unicode correspondientes (por ejemplo, "65 67 69" se convertirá en "A C E".
Si especifica un charlista, codifica cualquier personaje especial (por ejemplo, espacio, citas dobles, barras traseras,&lt;#32, o ≤#127) como usted los codificaría en la sección de datos de un archivo NCCSV (e.g., ", "\" o """", "\\\", " \\n ", "\\u20ac") .
No hay ningún stringList. Guarde los valores de String como una cadena multilínea. Por ejemplo,
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Global Attributes{#global-attributes} 
* [ ** Atributos globales / Global&lt; addAttributes ■ ** ] (#global-atributos) --
    &lt; addAttributes Es una etiqueta OPTIONAL dentro del&lt;dataset icono que se utiliza para cambiar atributos que se aplican a todo el conjunto de datos.
    
    *    ** Utilizar el mundo&lt; addAttributes ± cambiar los atributos globales del conjunto de datos. **  ERDDAP™ combina los atributos globales de la fuente del conjunto de datos (** fuenteAtributos **) y el mundo**  addAttributes  **que usted define en datasets.xml   (que tienen prioridad) para hacer el mundo** atributos combinados ** , que son lo que ERDDAP™ Los usuarios lo ven. Por lo tanto, usted puede utilizar addAttributes para redefinir los valores de fuenteAtributos, añadir nuevos atributos, o eliminar atributos.
    * Verás... ** &lt; addAttributes ■ **información] (#addattributes) que se aplica a nivel mundial y variable** &lt; addAttributes ■ ** .
    *    [FGDC](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html) y [ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata) Metadatos -- Normalmente, ERDDAP™ generará automáticamente ISO 19115-2/19139 y FGDC (FGDC-STD-001-1998) Archivos de metadatos XML para cada conjunto de datos utilizando información de los metadatos del conjunto de datos. Entonces, **buenos metadatos de conjunto de datos conduce a buenos ERDDAP -generados metadatos ISO 19115 y FGDC. Por favor considere poner mucho tiempo y esfuerzo en mejorar los metadatos de sus conjuntos de datos (que es algo bueno para hacer de todos modos) .** La mayoría de los atributos de metadatos de conjunto de datos que se utilizan para generar los metadatos ISO 19115 y FGDC son de los [ACDD metadatos standard](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) y se indican a continuación.
    * Muchos atributos globales son especiales en que ERDDAP™ los busca y los usa de varias maneras. Por ejemplo, un vínculo con el infoUrl se incluye en las páginas web con listas de conjuntos de datos y otros lugares, para que los usuarios puedan averiguar más sobre el conjunto de datos.
    * Cuando un usuario selecciona un subconjunto de datos, atributos globales relacionados con la longitud, latitud, altitud de la variable (o profundidad) , y rangos de tiempo (por ejemplo, Southernmost\\_Northing, Northernmost\\_Northing, time\\_coverage\\_start, time\\_coverage\\_end) se generan o actualizan automáticamente.
    * Una muestra simple global&lt; addAttributes Es:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
El atributo cwhdf\\_version vacía causa el atributo fuente cwhdf\\_version (si) para ser eliminado de la lista final y combinada de atributos.
    * Suministro de esta información ayuda ERDDAP™ hacer un mejor trabajo y ayuda a los usuarios a entender los conjuntos de datos.
Los buenos metadatos hacen que un conjunto de datos sea utilizable.
Los metadatos insuficientes hacen que un conjunto de datos sea inútil.
Por favor, tome el tiempo para hacer un buen trabajo con atributos de metadatos.
##### Atributos globales especiales en ERDDAP™ 
###### reconocimiento{#acknowledgement} 
*    [ **reconocimiento** ](#acknowledgement) y **reconocimiento**   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) es una forma recomendada para reconocer el grupo o grupos que proporcionaron apoyo (en particular, financieros) para el proyecto que creó estos datos. Por ejemplo,
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Tenga en cuenta que ACDD 1.0 y 1.1 utilizaron el "reconocimiento" de la ortografía (que es la ortografía habitual en Estados Unidos.) , pero ACDD 1.3 cambió esto a "reconocimiento" (que es la ortografía habitual en el Reino Unido.) . Mi entendimiento es que el cambio fue esencialmente un accidente y que ciertamente no reconocieron las ramificaciones del cambio. ¡Qué desastre&#33; Ahora hay millones de archivos de datos alrededor del mundo que tienen "reconocimiento" y millones que tienen "reconocimiento". Esto pone de relieve la necedad de los cambios "simples" a una norma, y enfatiza la necesidad de estabilidad en los estándares. Porque ACDD 1.3 (que es la versión de ACDD que ERDDAP™ soportes) dice "reconocimiento", eso es lo que ERDDAP™   (notablemente GenerarDatasets Xml) alienta.
     
###### cdm\\_altitud\\_proxy{#cdm_altitude_proxy} 
*    [ **cdm\\_altitud\\_proxy** ](#cdm_altitude_proxy) es sólo para los conjuntos de datos EDDTable que no tienen una variable de altitud o profundidad, pero sí tienen una variable que es un proxy para la altitud o profundidad (por ejemplo, presión, sigma, bottleNumber) , puede utilizar este atributo para identificar esa variable. Por ejemplo,
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Si [cdm\\_data\\_type](#cdm_data_type) es Perfil o TrajectoryProfile y no hay una variable de altitud o profundidad, cdm\\_altitude\\_proxy DEBE ser definido. Si se define cdm\\_altitud\\_proxy, ERDDAP™ añadirá los siguientes metadatos a la variable: \\_Coordinate AxisType=Altura y eje=Z.
     
###### cdm\\_data\\_type{#cdm_data_type} 
*    [ **cdm\\_data\\_type** ](#cdm_data_type)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) es un atributo global que indica Unidata   [Modelo de datos comunes](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html) Tipo de datos para el conjunto de datos. Por ejemplo,
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
El MDL sigue evolucionando y puede cambiar de nuevo. ERDDAP™ cumple con lo relacionado y más detallado [Geometrías de muestreo discretos (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Capítulo del [CF 1.6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) convenios de metadatos (anteriormente denominados Convenios de Observación de Puntos CF) .
    * O el conjunto de datos global [fuenteAtributos](#global-attributes) o su alcance mundial&lt; addAttributes ■ DEBE incluir el atributo cdm\\_data\\_type. Algunos tipos de dataset (como EDDTable DeObis) lo establecerá automáticamente.
    * Para EDDGrid datasets, las opciones cdm\\_data\\_type son Grid (el predeterminado y por lejos el tipo más común EDDGrid conjuntos de datos) , MovingGrid, Other, Point, Profile, RadialSweep, TimeSeries, TimeSeriesProfile, Swath, Trajectory y TrajectoryProfile. Actualmente, EDDGrid no requiere que se especifique ningún metadato relacionado, ni se comprueba que los datos coinciden con el cdm\\_data\\_tipo. Eso probablemente cambiará en un futuro cercano.
    * EDDTable utiliza cdm\\_data\\_type de una manera rigurosa, siguiendo la especificación DSG de CF en lugar de CDM, que por alguna razón no se ha actualizado para ser consistente con DSG. Si los metadatos de un dataset no cumplen con el ERDDAP 's cdm\\_data\\_type's requirements (véase infra) , el conjunto de datos no se cargará y generará un [mensaje de error](#troubleshooting-tips) . (Eso es algo bueno, en el sentido de que el mensaje de error te dirá lo que está mal para que puedas arreglarlo.) Y si los datos del conjunto de datos no coinciden con la configuración de metadatos del conjunto de datos (por ejemplo, si hay más de un valor de latitud para una estación determinada en un conjunto de datos de las series temporales) , algunas solicitudes de datos devolverán datos incorrectos en la respuesta. Así que asegúrate de arreglar todo esto.
        
Para todos estos conjuntos de datos, en los Convenios y Metadata\\_Conventions atributos globales, consulte CF-1.6 (no CF-1.0, 1.1, 1.2, 1.3, 1.4 o 1.5) , ya que CF-1.6 es la primera versión que incluye los cambios relacionados con la geometría de muestreo discreta (DSG) convenciones.
        *   ** ERDDAP™ tiene una relación no-simple con CF DSG** 
        *    ERDDAP™ puede hacer un conjunto de datos DSG válido fuera de un conjunto de datos fuente que ya es un archivo DSG válido (s) , o fuera de un conjunto de datos fuente que no se establece para DSG pero se puede hacer así a través de cambios en metadatos (algunos de los cuales son ERDDAP -específicamente para proporcionar un enfoque más general para especificar la configuración del DSG) .
        *    ERDDAP™ hace muchas pruebas de validez cuando carga un conjunto de datos. Si el conjunto de datos tiene un cdm\\_data\\_tipo (o featureType ) atributo cargas exitosas en ERDDAP™ Entonces ERDDAP™ está diciendo que el conjunto de datos cumple con los requisitos DSG (de lo contrario, ERDDAP™ lanzará una excepción explicando el primer problema que encontró) .
ADVERTENCIA: Parece que un conjunto de datos cargado con éxito cumple los requisitos del DSG (tiene la combinación correcta de atributos) , pero todavía puede ser incorrectamente establecido, conduce a resultados incorrectos en .nc CF y .nc Archivos de respuesta de CFMA. (El software es inteligente de alguna manera y sin pistas en otros.) 
        * Cuando miras los metadatos del conjunto de datos ERDDAP™ , el conjunto de datos DSG parece estar ERDDAP 's formato interno (una mesa gigante como base de datos) . No está en uno de los formatos DSG (Por ejemplo, las dimensiones y los metadatos no están bien) , pero la información necesaria para tratar el conjunto de datos como un conjunto de datos DSG está en los metadatos (por ejemplo, cdm\\_data\\_type=TimeSeries y cdm\\_timeseries\\_variables= *aCsvListOfStationRelatedVarables* en los metadatos globales y cf\\_role=timeseries\\_id para algunas variables) .
        * Si un usuario solicita un subconjunto del conjunto de datos en un .nc CF (an .nc archivo en formato de archivo Contiguous Ragged Array de DSG) o .nc Archivo CFMA (a .nc archivo en formato de archivo Array Multidimensional de DSG) , ese archivo será un archivo CF DSG válido.
ADVERTENCIA: Sin embargo, si el conjunto de datos fue establecido incorrectamente (para que las promesas hechas por los metadatos no sean ciertas) , entonces el archivo de respuesta será técnicamente válido pero será incorrecto de alguna manera.
             
###### EDDTable cdm_data_types
* Para EDDTable datasets, las opciones cdm\\_data\\_type (y necesidades conexas ERDDAP ) son
###### Punto{#point} 
*    [Punto](#point) -- es para un conjunto de mediciones tomadas en tiempos y lugares no relacionados.
    * Al igual que con todos los tipos cdm\\_data\\_ que no sean otros, los conjuntos de datos de puntos DEBE tener variables de longitud, latitud y tiempo.
###### Perfil{#profile} 
*    [Perfil](#profile) -- es un conjunto de medidas tomadas por una vez, en una ubicación longitud de latitud, pero a más de una profundidad (o altitud) . El conjunto de datos puede ser una colección de estos Perfiles, por ejemplo, 7 perfiles de diferentes ubicaciones. Este cdm\\_data\\_type no implica ninguna conexión lógica entre ninguno de los perfiles.
    
* Una de las variables (por ejemplo, perfil\\_número) DEBE tener el atributo variable cf\\_role=profile\\_id para identificar la variable que identifica singularmente los perfiles.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Si ninguna otra variable es adecuada, considere usar la variable de tiempo.
###### cdm\\_profile\\_variables{#cdm_profile_variables} 
* El conjunto de datos debe incluir el Atributo global [cdm\\_profile\\_variables](#cdm_profile_variables) , donde el valor es una lista separada por coma de las variables que tienen la información sobre cada perfil. Para un perfil dado, los valores de estas variables DEBE ser constantes. Por ejemplo,
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
La lista DEBE incluir la variable cf\\_role=profile\\_id y todas las demás variables con información sobre el perfil, y tiempo, latitud y longitud.
La lista nunca incluirá las variables de altitud, profundidad o observación.
     

 \\[ Opinión: cdm\\_data\\_type=Profile rara vez debe usarse. En la práctica, un conjunto de datos dado es generalmente o bien un archivo TimeSeriesProfile (perfiles en posición fija) o un perfil de Trayectoria (perfiles a lo largo de una trayectoria) , y por lo tanto debe ser debidamente identificado como tal. \\]   
###### TimeSeries{#timeseries} 
*    [TimeSeries](#timeseries) -- es una secuencia de mediciones (por ejemplo, temperatura del agua marina) tomada a una, fija, latitud, longitud, profundidad (o altitud) ubicación. (Piensa en ello como "estación".) El conjunto de datos puede ser una colección de estos TimeSeries, por ejemplo, una secuencia de cada uno de 3 lugares diferentes.
    * Una de las variables (por ejemplo, estación\\_id) DEBE tener el atributo variable cf\\_role=timeseries\\_id para identificar la variable que identifica singularmente las estaciones.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\_timeseries\\_variables{#cdm_timeseries_variables} 
* El conjunto de datos debe incluir el Atributo global [cdm\\_timeseries\\_variables](#cdm_timeseries_variables) , donde el valor es una lista separada por coma de las variables que tienen la información sobre cada estación. Para una determinada estación, los valores de estas variables DEBE ser constantes. Por ejemplo,
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
La lista DEBE incluir la variable cf\\_role=timeseries\\_id y todas las demás variables con información sobre la estación, que casi siempre incluye latitud y longitud (y altitud o profundidad, si está presente) .
La lista nunca incluirá el tiempo ni las variables de observación.
* Para algunas boyas amarradas, un conjunto de datos puede tener dos conjuntos de variables de latitud y longitud:
    1. Un par de valores de latitud y longitud que son constantes (i.e., la ubicación fija del amarre) . In ERDDAP™ , dar a estas variables destinationName s de latitud y longitud, e incluyen estas variables en la lista de cdm\\_timeseries\\_variables.
    2. Valores precisos de latitud y longitud asociados a cada observación. In ERDDAP™ , dar estas variables diferentes destinationName s (por ejemplo, precisaLat y precisa Lon) y no incluya estas variables en la lista de cdm\\_timeseries\\_variables.
El razonamiento de esto es: desde una perspectiva teórica, para un conjunto de datos DSG TimeSeries, la latitud y la longitud (y altitud o profundidad, si está presente) la ubicación de la estación debe ser constante.
###### TimeSeriesProfile{#timeseriesprofile} 
*    [TimeSeriesProfile](#timeseriesprofile) -- es para una secuencia de perfiles tomados en una, ubicación fija, longitud de latitud. Cada perfil es un conjunto de mediciones tomadas a múltiples alturas o profundidades. El conjunto de datos puede ser una colección de estos TimeSeriesProfiles, por ejemplo, una secuencia de perfiles tomados en cada uno de 12 lugares diferentes.
    * Una de las variables (por ejemplo, estación\\_id) DEBE tener el atributo variable cf\\_role=timeseries\\_id para identificar la variable que identifica singularmente las estaciones.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * Una de las variables (por ejemplo, perfil\\_número) DEBE tener el atributo variable cf\\_role=profile\\_id para identificar la variable que identifica singularmente los perfiles.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Un perfil dado\\_id sólo tiene que ser único para una serie de timeseries\\_id.) Si ninguna otra variable es adecuada, considere usar la variable de tiempo.
    * El conjunto de datos DEBE incluir el Atributo cdm\\_timeseries\\_variables, donde el valor es una lista separada por coma de las variables que tienen la información sobre cada estación. Para una determinada estación, los valores de estas variables DEBE ser constantes. Por ejemplo,
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
La lista DEBE incluir la variable cf\\_role=timeseries\\_id y todas las demás variables con información sobre la estación, que casi siempre incluye latitud y longitud.
La lista nunca incluirá las variables de tiempo, altitud, profundidad o observación.
    * El conjunto de datos DEBE incluir el globalAttribute cdm\\_profile\\_variables, donde el valor es una lista separada por coma de las variables que tienen la información sobre cada perfil. Para un perfil dado, los valores de estas variables DEBE ser constantes. Por ejemplo,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
La lista DEBE incluir la variable cf\\_role=profile\\_id y todas las demás variables con información sobre el perfil, que casi siempre incluye tiempo.
La lista nunca incluirá latitud, longitud, altitud, profundidad o variables de observación.
###### Trayectoria{#trajectory} 
*    [Trayectoria](#trajectory) -- es una secuencia de mediciones tomadas a lo largo de una trayectoria (un camino por el espacio y el tiempo)   (por ejemplo, mar\\_agua\\_temperatura tomada por un barco mientras se mueve a través del agua) . El conjunto de datos puede ser una colección de estos Trajectories, por ejemplo, una secuencia de cada uno de 4 barcos diferentes.
    * Una de las variables (por ejemplo, nave\\_id) DEBE tener el atributo cf\\_role=trajectory\\_id para identificar la variable que identifica singularmente las trayectorias.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### cdm\\_trajectory\\_variables{#cdm_trajectory_variables} 
* El conjunto de datos debe incluir el Atributo global [cdm\\_trajectory\\_variables](#cdm_trajectory_variables) , donde el valor es una lista separada por coma de las variables que tienen la información sobre cada trayectoria. Para una trayectoria dada, los valores de estas variables DEBE ser constantes. Por ejemplo,
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
La lista DEBE incluir la variable cf\\_role=trajectory\\_id y todas las demás variables con información sobre la trayectoria.
La lista nunca incluirá tiempo, latitud, longitud o variables de observación.
###### TrajectoryProfile{#trajectoryprofile} 
*    [TrajectoryProfile](#trajectoryprofile) -- es una secuencia de perfiles tomados a lo largo de una trayectoria. El conjunto de datos puede ser una colección de estos TrajectoryProfiles, por ejemplo, una secuencia de perfiles tomadas por 14 barcos diferentes.
    * Una de las variables (por ejemplo, nave\\_id) DEBE tener el atributo variable cf\\_role=trajectory\\_id para identificar la variable que identifica singularmente las trayectorias.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * Una de las variables (por ejemplo, perfil\\_número) DEBE tener el atributo variable cf\\_role=profile\\_id para identificar la variable que identifica singularmente los perfiles.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Un perfil dado\\_id sólo tiene que ser único para una trayectoria dada\\_id.) Si ninguna otra variable es adecuada, considere usar la variable de tiempo.
    * El conjunto de datos DEBE incluir el globalAttribute cdm\\_trajectory\\_variables, donde el valor es una lista separada por coma de las variables que tienen la información sobre cada trayectoria. Para una trayectoria dada, los valores de estas variables DEBE ser constantes. Por ejemplo,
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
La lista DEBE incluir la variable cf\\_role=trajectory\\_id y todas las demás variables con información sobre la trayectoria.
La lista nunca incluirá variables relacionadas con perfiles, tiempo, latitud, longitud o variables de observación.
    * El conjunto de datos DEBE incluir el globalAttribute cdm\\_profile\\_variables, donde el valor es una lista separada por coma de las variables que tienen la información sobre cada perfil. Para un perfil dado, los valores de estas variables DEBE ser constantes. Por ejemplo,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
La lista DEBE incluir la variable cf\\_role=profile\\_id y todas las demás variables con información sobre el perfil, que casi siempre incluye tiempo, latitud y longitud.
La lista nunca incluirá las variables de altitud, profundidad o observación.
###### Otros{#other} 
*    [Otros](#other) - no tiene requisitos. Úsalo si el conjunto de datos no se ajusta a una de las otras opciones, en particular, si el conjunto de datos no incluye variables de latitud, longitud y tiempo.
     
###### Notas conexas{#related-notes} 
* Todos los conjuntos de datos EDDTable con un cdm\\_data\\_tipo distinto al "Otro" DEBE tener variables de longitud, latitud y tiempo.
* Datasets con perfiles DEBE tener una variable de altitud, una variable de profundidad o una [cdm\\_altitud\\_proxy](#cdm_altitude_proxy) variable.
* Si no puede hacer que un conjunto de datos cumpla con todos los requisitos para el cdm ideal\\_data\\_type, use "Point" (que tiene pocos requisitos) o "Otros" (que no tiene requisitos) en lugar de eso.
* Esta información es utilizada por ERDDAP™ de varias maneras, por ejemplo, pero principalmente para hacer .nc Archivos CF ( .nc archivos que cumplen con las Representaciones de Array Ragged Contiguous asociadas con el cdm\\_data\\_type del dataset) y .nc Archivos CFMA ( .nc archivos que cumplen con las Representaciones de Array Multidimensionales asociadas con el dataset cdm\\_data\\_type) como se define en [Geometrías de muestreo discretos (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Capítulo del [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) convenciones de metadatos, que anteriormente se llamaban "Convenios de Observación de Puntos CF".
* Hint: Para estos conjuntos de datos, el ajuste correcto [ subsetVariables ](#subsetvariables) es generalmente la combinación de todas las variables enumeradas en los atributos cdm\\_...\\_variables. Por ejemplo, para TimeSeriesProfile, utilice el cdm\\_timeseries\\_variables más el cdm\\_profile\\_variables.
######  contributor\\_name  {#contributor_name} 
*    [ ** contributor\\_name ** ](#contributor_name)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) is the RECOMMENDED way to identify a person, organization, or project which contributed to this dataset (por ejemplo, el creador original de los datos, antes de que fuera reprocesado por el creador de este conjunto de datos) . Por ejemplo,
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Si "contributor" realmente no se aplica a un conjunto de datos, omitir este atributo. Comparado con [ creator\\_name ](#creator_name) , esto a veces se centra más en la fuente de financiación.
######  contributor\\_role  {#contributor_role} 
*    [ ** contributor\\_role ** ](#contributor_role)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) is the RECOMMENDED way to identify the role of [ contributor\\_name ](#creator_name) . Por ejemplo,
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Si "contributor" realmente no se aplica a un conjunto de datos, omitir este atributo.
###### Convenciones{#conventions} 
*    [ **Convenciones** ](#conventions)   (de la [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadatos estándar) es STRONGLY RECOMENDADO. (Puede ser REQUIER en el futuro.) El valor es una lista separada por coma de las normas de metadatos que sigue este conjunto de datos. Por ejemplo:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
Los convenios de metadatos comunes utilizados en ERDDAP™ son:
    
    *    [ COARDS Convenciones](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) es el precursor de la CF.
    *    [Climate and Forecast (CF) Convenciones](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) es la fuente de muchos de los atributos recomendados y requeridos en ERDDAP . La versión actual de CF se identifica como "CF-1.6".
    * El NetCDF Attribute Convention for Dataset Discovery (ACDD) es la fuente de muchos de los atributos recomendados y requeridos en ERDDAP . La versión original 1.0 de ACDD (un brillante trabajo de Ethan Davis) , fue identificado como [ Unidata Dataset Discovery v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1) La corriente (a partir de 2015) 1.3 versión de ACDD se identifica como [ACDD-1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) . Si sus conjuntos de datos han estado usando Unidata Dataset Discovery v1.0, le animamos a [cambiar sus conjuntos de datos para utilizar ACDD-1.3](#switch-to-acdd-13) .
    
Si su conjunto de datos sigue algún estándar de metadatos adicionales, por favor agregue el nombre a la lista CSV en el atributo Convenios.
######  coverage\\_content\\_type  {#coverage_content_type} 
*    [ ** coverage\\_content\\_type ** ](#coverage_content_type)   (de la [ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata) metadatos estándar) is the RECOMMENDED way to identify the type of gridded data (dentro EDDGrid conjuntos de datos) . Por ejemplo,
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
Los únicos valores permitidos son auxiliaresInformación, imagen, modeloResultado, físico Medición (por defecto cuando se generan metadatos ISO 19115) , calidadInformación, referenciaInformación y clasificación temática. (No utilice esta etiqueta para conjuntos de datos EDDTable.)   
######  creator\\_name  {#creator_name} 
*    [ ** creator\\_name ** ](#creator_name)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) is the RECOMMENDED way to identify the person, organization, or project (si no una persona u organización específica) , más responsable de la creación (o reprocesamiento más reciente) de estos datos. Por ejemplo,
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Si los datos fueron ampliamente reprocesados (por ejemplo, datos satelitales del nivel 2 al nivel 3 o 4) , entonces generalmente el reprocessor se enumera como el creador y el creador original se enumera a través de [ contributor\\_name ](#contributor_name) . Comparado con [proyecto](#project) , esto es más flexible, ya que puede identificar a una persona, una organización o un proyecto.
######  creator\\_email  {#creator_email} 
*    [ ** creator\\_email ** ](#creator_email)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) es la manera RECOMENDADA de identificar una dirección de correo electrónico (correctamente formateado) que proporciona una manera de contactar al creador. Por ejemplo,
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
######  creator\\_url  {#creator_url} 
*    [ ** creator\\_url ** ](#creator_url)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) es la manera RECOMENDADA de identificar una URL para la organización que creó el conjunto de datos, o una URL con la información del creador sobre este conjunto de datos (pero eso es más el propósito [ infoUrl ](#infourl) ) . Por ejemplo,
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
######  date\\_created  {#date_created} 
*    [ ** date\\_created ** ](#date_created)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) is the RECOMMENDED way to identify the date on which the data was first created (por ejemplo, procesado en este formulario) , en formato ISO 8601. Por ejemplo,
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Si los datos se agregan periódicamente al conjunto de datos, esta es la primera fecha que se pusieron a disposición los datos originales.
######  date\\_modified  {#date_modified} 
*    [ ** date\\_modified ** ](#date_modified)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) is the RECOMMENDED way to identify the date on which the data was last modified (por ejemplo, cuando se fijó un error o cuando se agregaron los últimos datos) , en formato ISO 8601. Por ejemplo,
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
######  date\\_issued  {#date_issued} 
*    [ ** date\\_issued ** ](#date_issued)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) es la forma RECOMENDADA de identificar la fecha en la que los datos fueron puestos a disposición de otros, en formato ISO 8601, por ejemplo, 2012-03-15. Por ejemplo,
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
Por ejemplo, el conjunto de datos puede tener un [ date\\_created ](#date_created) de 2010-01-30, pero sólo se hizo público 2010-07-30. date\\_issued es menos comúnmente utilizado que date\\_created y date\\_modified . Si date\\_issued es omitido, se supone que es el mismo que el date\\_created .
###### mundial drawLandMask  {#global-drawlandmask} 
*    [ ** drawLandMask ** ](#global-drawlandmask) -- Este es un atributo global OPTIONAL usado por ERDDAP™   (y sin normas de metadatos) que especifica el valor predeterminado de la opción "Mascara de tierra" en el formulario Make A Graph del conjunto de datos ( * datasetID * .graph) y para el parámetro &.land en una URL solicitando un mapa de los datos. Por ejemplo,
    ```
    <att name="drawLandMask">over</att>  
    ```
Ver el [ drawLandMask Sinopsis](#drawlandmask) .
######  featureType  {#featuretype} 
*    [ ** featureType ** ](#featuretype)   (de la [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadatos estándar) es IGNORED y/o REPLACED. Si el conjunto de datos [cdm\\_data\\_type](#cdm_data_type) es apropiado, ERDDAP™ lo utilizará automáticamente para crear un featureType atributo. Así que no es necesario que lo añadas.
    
Sin embargo, si usted está usando [EDDTableDesdeNcCFFiles](#eddtablefromnccffiles) crear un conjunto de datos de archivos que siguen el [CF Geometrías de muestreo discretos (DSG) estándar](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) , los propios archivos deben tener featureType correctamente definida, de modo que ERDDAP™ puede leer los archivos correctamente. Eso es parte de los requisitos de CF DSG para ese tipo de archivo.
     
###### historia{#history} 
*    [ **historia** ](#history)   (de la [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) y [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos) es un atributo multilínea RECOMENDADO String global con una línea para cada paso de procesamiento que los datos han sufrido. Por ejemplo,
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * Idealmente, cada línea tiene una ISO 8601:2004 (E) fecha formateada+timeZ (por ejemplo, 2011-08-05T08:55:02Z) seguido de una descripción del paso de procesamiento.
    *    ERDDAP™ crea esto si no existe.
    * Si ya existe, ERDDAP™ adjuntará nueva información a la información existente.
    * la historia es importante porque permite a los clientes retroceder a la fuente original de los datos.
######  infoUrl  {#infourl} 
*    [ ** infoUrl ** ](#infourl) es un atributo global REQUIRED con la URL de una página web con más información sobre este conjunto de datos (generalmente en el sitio web de la institución fuente) . Por ejemplo,
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * O el conjunto de datos global [fuenteAtributos](#global-attributes) o su alcance mundial&lt; addAttributes ■ DEBE incluir este atributo.
    *    infoUrl es importante porque permite a los clientes descubrir más sobre los datos de la fuente original.
    *    ERDDAP™ muestra un enlace al infoUrl en el formulario de acceso de datos del conjunto ( * datasetID * HTML) , Hacer una página web de Gráfico ( * datasetID * .graph) , y otras páginas web.
    * Si la URL tiene una parte de consulta (después de la "?) , debe ser ya [por ciento codificado](https://en.wikipedia.org/wiki/Percent-encoding) . Necesitas codificar caracteres especiales en las limitaciones (y el principal '=' , si hay) en la forma %HHH, donde HH es el valor hexadecimal de 2 dígitos del personaje. Por lo general, sólo necesita convertir algunos de los caracteres de puntuación: % en %25, &quot; en %26, "en %22,&lt;en %3C, = en %3D, NOS en %3E, + en %2B, | en %7C, \\[ en %5B, \\] en %5D, espacio en %20, y convertir todos los caracteres por encima de #127 en su forma UTF-8 y luego codifica cada byte de la forma UTF-8 en el formato %H (pedir ayuda a un programador) .
Por ejemplo, &quot; stationID √≥="41004"
se convierte en stationID %2241004%22
La codificación porcentual es generalmente necesaria cuando usted accede ERDDAP a través de software que no sea un navegador. Los navegadores generalmente manejan codificación por ciento para usted.
En algunas situaciones, usted necesita codificar por ciento todos los caracteres que no sean A-Za-z0-9\\_-&#33;.~ ' () \\*, pero todavía no codifican el 'plaza' inicial o el principal '=' .
Los idiomas de programación tienen herramientas para hacer esto (por ejemplo, ver Java 's [ java.net.URLEncoder ](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)   
y Java Script's [encodeURIComponent()] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) ) y hay
         [sitios web que por ciento codifica / decodifica para usted](https://www.url-encode-decode.com/) .
    * Desde datasets.xml es un archivo XML, usted debe también &quot; codificar TODA', '&lt;', y 'conejérte' en la URL como 'conjunto', '&lt;', y 'corporagt;' después de una codificación.
    *    infoUrl es único ERDDAP . No es de ningún estándar de metadatos.
###### Institución{#institution} 
*    [ **Institución** ](#institution)   (de la [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) y [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos) es un atributo global REQUIIDO con la versión corta del nombre de la institución que es la fuente de estos datos (generalmente un acrónimo, por lo general&lt;20 caracteres). Por ejemplo,
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * O el conjunto de datos global [fuenteAtributos](#global-attributes) o su alcance mundial&lt; addAttributes ■ DEBE incluir este atributo.
    *    ERDDAP™ muestra la institución cuando muestra una lista de conjuntos de datos. Si el nombre de una institución aquí es más de 20 caracteres, sólo los primeros 20 caracteres serán visibles en la lista de conjuntos de datos (pero toda la institución se puede ver poniendo el cursor del ratón sobre el icono adyacente "?") .
    * Si agrega institución a la lista de&lt; categoryAttributes ■ dentro ERDDAP 's [setup.xml](/docs/server-admin/deploy-install#setupxml) archivo, los usuarios pueden encontrar fácilmente conjuntos de datos de la misma institución a través de ERDDAP 's "Search for Datasets by Category" en la página principal.
###### palabras clave{#keywords} 
*    [ **palabras clave** ](#keywords)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) is a RECOMMENDED comma-separated list of words and short words (por ejemplo, [GCMD Ciencia Palabras clave](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access) ) que describen el conjunto de datos de una manera general, y no asumiendo ningún otro conocimiento del conjunto de datos (por ejemplo, para los datos oceanográficos,) . Por ejemplo,
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
Desde datasets.xml es un documento XML, los caracteres,&lt;, y Ø en un atributo como palabras clave (por ejemplo, los caracteres de la ciencia en GCMD) debe ser codificado como y,&lt;, y &gt;, respectivamente.
Cuando se carga un conjunto de datos ERDDAP ,
    
    * "La Ciencia de la Tierra" se añade al comienzo de cualquier palabra clave GCMD que la carece.
    * Las palabras clave GCMD se convierten en el caso Título (i.e. the first letters are capitalized) .
    * Las palabras clave se reorganizan en orden ordenado y se eliminan los caracteres de nueva línea.
     
######  keywords\\_vocabulary  {#keywords_vocabulary} 
*    [ ** keywords\\_vocabulary ** ](#keywords_vocabulary)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) es un atributo RECOMENDADO: si está siguiendo una directriz para las palabras/frases en sus atributos de palabras clave (por ejemplo, GCMD Science Palabras clave) Pon el nombre de esa directriz aquí. Por ejemplo,
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### licencia{#license} 
*    [ **licencia** ](#license)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) es un atributo global STRONGLY RECOMENDADO con la licencia y/o restricciones de uso. Por ejemplo,
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Si... \\[ estándar \\] " ocurre en el valor de atributo, será reemplazado por el estándar ERDDAP™ licencia de la&lt;etiqueta estándarLicense universidad en ERDDAP 's
         \\[ tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file.
         
######  Metadata\\_Conventions  {#metadata_conventions} 
*    [ ** Metadata\\_Conventions ** ](#metadata_conventions) es de los anticuados [ACDD 1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)   (que se identificó Metadata\\_Conventions como " Unidata Dataset Discovery v1.0") metadatos estándar. El valor del atributo fue una lista separada por coma de las convenciones de metadatos utilizadas por este conjunto de datos.
Si un conjunto de datos utiliza ACDD 1.0, este atributo es STRONGLY RECOMMENDED, por ejemplo,
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
Pero... ERDDAP™ ahora recomienda ACDD-1.3. Si tienes [cambió sus conjuntos de datos para utilizar ACDD-1.3](#switch-to-acdd-13) , uso de Metadata\\_Conventions es STRONGLY DISCOURAGED: sólo uso [&lt;Convenios relativos] (#convenciones) en lugar de eso.
######  processing\\_level  {#processing_level} 
*    [ ** processing\\_level ** ](#processing_level)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) es una descripción textual RECOMENDADA del procesamiento (por ejemplo, [Sistema de observación de datos e información de la NASA](https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/data-processing-levels) , por ejemplo, Nivel 3) o nivel de control de calidad (por ejemplo, Science Quality) de los datos. Por ejemplo,
    ```
    <att name="processing\\_level">3</att>  
    ```
###### proyecto{#project} 
*    [ **proyecto** ](#project)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) es un atributo OPTIONAL para identificar el proyecto que el conjunto de datos es parte. Por ejemplo,
    ```
    <att name="project">GTSPP</att>  
    ```
Si el conjunto de datos no es parte de un proyecto, no utilice este atributo. Comparado con [ creator\\_name ](#creator_name) , esto se centra en el proyecto (no una persona o una organización, que puede estar implicada en múltiples proyectos) .
######  publisher\\_name  {#publisher_name} 
*    [ ** publisher\\_name ** ](#publisher_name)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) es la forma RECOMENDADA de identificar a la persona, organización o proyecto que está publicando este conjunto de datos. Por ejemplo,
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
Por ejemplo, usted es el editor si otra persona o grupo [creado](#creator_name) el conjunto de datos y usted está reservándolo a través de ERDDAP . Si "publisher" realmente no se aplica a un conjunto de datos, omitir este atributo. Comparado con [ creator\\_name ](#creator_name) , el editor probablemente no modificó o reprocesó significativamente los datos; el editor está poniendo los datos disponibles en un nuevo lugar.
######  publisher\\_email  {#publisher_email} 
*    [ ** publisher\\_email ** ](#publisher_email)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) es la manera RECOMENDADA de identificar una dirección de correo electrónico (correctamente formateado, por ejemplo, john\\_smith@great.org) que proporciona una manera de contactar con el editor. Por ejemplo,
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Si "publisher" realmente no se aplica a un conjunto de datos, omitir este atributo.
######  publisher\\_url  {#publisher_url} 
*    [ ** publisher\\_url ** ](#publisher_url)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) es la forma RECOMENDADA de identificar una URL para la organización que publicó el conjunto de datos, o una URL con la información del editor sobre este conjunto de datos (pero eso es más el propósito [ infoUrl ](#infourl) ) . Por ejemplo,
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Si "publisher" realmente no se aplica a un conjunto de datos, omitir este atributo.
######  real\\_time  {#real_time} 
*    [ ** real\\_time ** ](#real_time) es un atributo de String global (no de ninguna norma) indicando si es un conjunto de datos en tiempo real. Por ejemplo,
    ```
    <att name="real\\_time">true</att>  
    ```
Si esto es falso (por defecto) , ERDDAP™ cache respuestas a solicitudes de tipos de archivos donde el archivo entero debe ser creado antes ERDDAP™ puede comenzar a enviar la respuesta al usuario y reutilizarlas por hasta 15 minutos (por ejemplo, .nc , .png) .
Si esto es verdad, ERDDAP™ nunca caché los archivos de respuesta y siempre volverá archivos creados recientemente.
######  sourceUrl atributo{#sourceurl-attribute} 
*    [ ** sourceUrl ** ](#sourceurl-attribute) es un atributo global con la URL de la fuente de los datos. Por ejemplo,
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (pero lo puso todo en una línea) 
    *    ERDDAP™ generalmente crea este atributo global automáticamente. Dos excepciones son EDDTableDesde Hyrax Archivos y EDDTableDeThreddsFiles.
    * Si la fuente es archivos locales y los archivos fueron creados por su organización, use
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Si la fuente es la base de datos local y los datos fueron creados por su organización, use
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *    sourceUrl es importante porque permite a los clientes retroceder a la fuente original de los datos.
    *    sourceUrl es único ERDDAP . No es de ningún estándar de metadatos.
        
######  standard\\_name\\_vocabulary  {#standard_name_vocabulary} 
*    [ ** standard\\_name\\_vocabulary ** ](#standard_name_vocabulary)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) es un atributo RECOMENDADO para identificar el nombre del vocabulario controlado desde el cual variable [ standard\\_name ](#standard_name) s se toman. Por ejemplo,
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
para la versión 77 del [CF tabla de nombres estándar](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) .
         
#####  subsetVariables  {#subsetvariables} 
*    ** subsetVariables **   (sólo para conjuntos de datos EDDTable) es un atributo global RECOMENDADO que le permite especificar una lista separada por coma de [&lt; dataVariable &gt; (#datavariable)   [ destinationName ](#destinationname) s para identificar variables con un número limitado de valores (otro modo: variables para las cuales cada uno de los valores tiene muchos duplicados) . Por ejemplo,
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Si este atributo está presente, el conjunto de datos tendrá un * datasetID * .subset web page (y un enlace a ella en cada lista de conjuntos de datos) que permite a los usuarios seleccionar rápidamente y fácilmente varios subconjuntos de los datos.
    * Cada vez que se carga un conjunto de datos, ERDDAP cargas y tiendas en disco una mesa con todas las distintas () combinaciones del subconjunto Valores variables. ERDDAP™ puede leer que subsetVariables mesa y procesarlo muy rápidamente (especialmente en comparación con leer muchos archivos de datos o obtener datos de una base de datos u otro servicio externo) .
    * Eso permite ERDDAP™ para hacer 3 cosas:
        1. Permite ERDDAP™ para poner una lista de posibles valores en una lista desplegable en el Formulario de Acceso a Datos, Hacer una página web de Gráfico y .subset.
        2. Permite ERDDAP™ para ofrecer una página web .subset para ese conjunto de datos. Esa página es interesante porque hace fácil encontrar combinaciones válidas de los valores de esas variables, que para algunos conjuntos de datos y algunas variables es muy, muy difícil (casi imposible) . Entonces, todas las solicitudes de usuario para distintos () subset Los datos variables serán muy rápidos.
        3. Si hay una solicitud de usuario que sólo se refiere a un subconjunto de esas variables, ERDDAP™ puede leer rápidamente subsetVariables cuadro y respuesta a la solicitud. Eso puede ahorrar un montón de tiempo y esfuerzo para ERDDAP .
    * El orden del destinationName s usted especifica determina el orden de tipo en el * datasetID * .subset página web, por lo que generalmente especificar las variables más importantes primero, luego el menos importante. Por ejemplo, para conjuntos de datos con datos de series temporales para varias estaciones, puede utilizar, por ejemplo,
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
para que los valores estén ordenados por la estación\\_id.
    * Obviamente, es su elección qué variables incluir en subsetVariables lista, pero el uso sugerido es:
        
En general, incluya variables para las cuales desea ERDDAP™ para mostrar una lista desplegable de opciones en el formulario de acceso de datos del conjunto de datos (HTML) y Make-A-Graph (.graph) páginas web.
        
En general, incluya variables con información sobre las características del conjunto de datos (las estaciones, perfiles y/o trayectorias, especialmente desde [cdm\\_timeseries\\_variables](#cdm_timeseries_variables) , [cdm\\_profile\\_variables](#cdm_profile_variables) , [cdm\\_trajectory\\_variables](#cdm_trajectory_variables) ) . Sólo hay unos pocos valores diferentes para estas variables por lo que funcionan bien con listas desplegables.
        
No incluya ninguna variable de datos asociada a observaciones individuales (por ejemplo, tiempo, temperatura, salinidad, velocidad actual) en el subsetVariables lista. Hay demasiados valores diferentes para estas variables, por lo que una lista desplegable sería lenta para cargar y ser difícil de trabajar con (o no trabajo) .
        
    * Si el número de combinaciones distintas de estas variables es mayor que alrededor de 1.000.000, usted debe considerar restringir el subsetVariables que especifique reducir el número de combinaciones distintas a menos de 1.000.000; de lo contrario, el * datasetID * Las páginas web subset pueden generarse lentamente. En casos extremos, el conjunto de datos puede no cargarse ERDDAP™ porque la generación de la lista de combinaciones distintas utiliza demasiada memoria. Si es así, debe eliminar algunas variables de la subsetVariables lista.
    * Si el número de valores distintos de una variable de subconjunto es mayor de alrededor de 20.000, debe considerar no incluir esa variable en la lista de subsetVariables ; de lo contrario, lleva mucho tiempo transmitir el * datasetID * .subset, * datasetID * .graph, and * datasetID * .html páginas web. Además, en un Mac, es muy difícil hacer selecciones de una lista desplegable con más de 500 elementos debido a la falta de una barra de desplazamiento. Un compromiso es: eliminar variables de la lista cuando los usuarios no pueden seleccionar valores de una lista desplegable.
    * Usted debe probar cada conjunto de datos para ver si subsetVariables establecer está bien. Si el servidor de datos fuente es lento y tarda demasiado tiempo (o fallas) para descargar los datos, reducir el número de variables especificadas o eliminar el subsetVariables atributo global.
    * Subset Las variables son muy útiles. Así que si su conjunto de datos es adecuado, por favor cree un subsetVariables atributo.
    * EDDTableDesde SOS automáticamente añade
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
cuando se crea el conjunto de datos.
        * Posible advertencia: si un usuario utiliza el * datasetID * .subset web page selecciona un valor que tiene un carácter de carruajeRetorno o nueva línea, * datasetID * El subconjunto fallará. ERDDAP™ no puede funcionar alrededor de este problema debido a algunos detalles HTML. En cualquier caso, es casi siempre una buena idea eliminar el carruajeRetorno y caracteres de nueva línea de los datos. Para ayudarte a solucionar el problema, si la EDDTable. subsetVariables Método DataTable en ERDDAP detecta valores de datos que causarán problemas, enviará un correo electrónico de advertencia con una lista de valores que ofenden al correo electrónico Todo Para direcciones de correo electrónico especificadas en setup.xml. Así, sabes lo que hay que arreglar.
        *    **Tablas de subconjuntos pregeneradas.** Normalmente, cuando ERDDAP™ carga un conjunto de datos, solicita la diferencia () subset variables data table from the data source, just via a normal data request. En algunos casos, estos datos no están disponibles de la fuente de datos o la recuperación de la fuente de datos puede ser difícil en el servidor fuente de datos. Si es así, puede suministrar una tabla con la información en una .json o archivo .csv con el nombre *tomcat* /content/erddap/subset/ * datasetID *  .json   (o .csv) . Si está presente, ERDDAP™ lo leerá una vez cuando se cargue el conjunto de datos y lo utilice como fuente de los datos del subconjunto.
            * Si hay un error al leerlo, el conjunto de datos no se cargará.
            * Debe tener exactamente los mismos nombres de columna (por ejemplo, el mismo caso) como&lt; subsetVariables &gt;, pero las columnas MAY estar en cualquier orden.
            * Puede tener columnas extras (serán removidos y nuevas filas redundantes serán removidas) .
            * Los valores perdidos deben perderse (no números falsos como -99) .
            *    .json Los archivos pueden ser un poco más difíciles de crear pero tratar bien con caracteres Unicode. .json Los archivos son fáciles de crear si los creas con ERDDAP .
            * .csv archivos son fáciles de trabajar, pero adecuados para caracteres ISO 8859-1 solamente. .csv archivos DEBE tener nombres de columna en la primera fila y datos en filas posteriores.
        * Para grandes conjuntos de datos o cuándo&lt; subsetVariables &gt; es malconfigurado, la tabla de combinaciones de valores puede ser lo suficientemente grande para causar demasiados datos o errores OutOfMemory. La solución es eliminar variables de la lista&lt; subsetVariables &gt; para el cual hay un gran número de valores, o eliminar variables según sea necesario hasta que el tamaño de esa tabla sea razonable. Independientemente del error, las partes de ERDDAP™ que usan el subsetVariables sistema no funciona bien (por ejemplo, las páginas web cargan muy lentamente) cuando hay demasiadas filas (por ejemplo, más de un millón) en esa mesa.
        *    subsetVariables no tiene nada que ver con especificar qué variables los usuarios pueden utilizar en restricciones, es decir, cómo los usuarios pueden solicitar subconjuntos del conjunto de datos. ERDDAP™ siempre permite que las limitaciones se refieran a cualquiera de las variables.
###### Unidades de tiempo{#time-units} 
 [Tiempo y hora](#time-units) columnas deben tener ISO 8601:2004 (E) fecha formateado+time Z strings (por ejemplo, 1985-01-31T15:31:00Z) .
             
###### Resumen{#summary} 
*    [ **Resumen** ](#summary)   (de la [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) y [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos) es un atributo global REQUIRED con una larga descripción del conjunto de datos (generalmente&lt;500 caracteres). Por ejemplo,
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * O el conjunto de datos global [fuenteAtributos](#global-attributes) o su alcance mundial&lt; addAttributes ■ DEBE incluir este atributo.
    * El resumen es muy importante porque permite a los clientes leer una descripción del conjunto de datos que tiene más información que el título y así comprender rápidamente cuál es el conjunto de datos.
    * Consejos: Por favor escriba el resumen para que funcione describir el conjunto de datos a una persona aleatoria que conozca en la calle o a un colega. Recuerde incluir el [Cinco W y una H](https://en.wikipedia.org/wiki/Five_Ws) : ¿Quién creó el conjunto de datos? ¿Qué información se recogió? ¿Cuándo se recogieron los datos? ¿Dónde fue recogido? ¿Por qué fue recogido? ¿Cómo fue recogido?
    *    ERDDAP™ muestra el resumen en el formulario de acceso de datos del conjunto de datos ( * datasetID * HTML) , Hacer una página web de Gráfico ( * datasetID * .graph) , y otras páginas web. ERDDAP™ utiliza el resumen al crear documentos FGDC e ISO 19115.
######  testOutOfDate  {#testoutofdate} 
*    [ ** testOutOfDate ** ](#testoutofdate)   (una opción ERDDAP - atributo específico de metadatos globales, no de ningún estándar) especifica, de manera simplista, cuando los datos para un conjunto de datos casi real se consideran fuera de plazo, especificados como now-  *nUnits* , por ejemplo, now- 2 días para datos que normalmente aparecen 2448 horas después del valor de tiempo. Para datos de pronóstico, utilice ahora **+**  *nUnits* , por ejemplo, ahora + 6 días para datos de pronóstico que es, al menos, 8 días en el futuro. (Ver el [ now-  *nUnits* sintaxis descripción](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) .) Si el valor máximo del tiempo para el conjunto de datos es más reciente que el tiempo especificado, el conjunto de datos se considera actualizado. Si el valor máximo del tiempo es mayor que el tiempo especificado, el conjunto de datos se considera actualizado. En el caso de conjuntos de datos fuera de la fecha, presumiblemente existe un problema con la fuente de datos, por lo que ERDDAP™ no puede acceder a los datos desde los puntos de tiempo más recientes.
    
El testOutOfDate valor se muestra como una columna en [ allDatasets Dataset](#eddtablefromalldatasets) en tu ERDDAP . También se utiliza para calcular el índice outOfDate, que es otra columna en la allDatasets Dataset.
Si el índice es&lt;1, el conjunto de datos se considera actualizado.
Si el índice es&lt;=1, el conjunto de datos se considera fuera de la fecha.
Si el índice es&lt;=2, el conjunto de datos se considera muy anticuado.
    
El testOutOfDate valor también se utiliza por ERDDAP™ para generarhttps://*yourDomain*/erddap/outOfDateDatasets.htmlpágina web ( [ejemplo](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) que muestra los conjuntos de datos que tienen&lt; testOutOfDate Etiquetas , con los conjuntos de datos clasificados por lo fuera de la fecha que son. Si cambia el tipo de archivo (de .html a .csv, .jsonlCSV , .nc , .tsv , ...) , puede obtener esa información en diferentes formatos de archivo.
    
Cuando sea posible, [GenerarDatasetsXml](#generatedatasetsxml) añade un testOutOfDate atributo al mundo addAttributes de un conjunto de datos. Este valor es una sugerencia basada en la información disponible para GenerateDatasetsXml. Si el valor no es apropiado, cámbialo.
    
"Fuera de la fecha" aquí es muy diferente de [&lt;reload EveryNMinutes confía] (#reloadeverynminutes) , que se ocupa de cómo actualizar ERDDAP El conocimiento del conjunto de datos es. El&lt; testOutOfDate El sistema &quot; ERDDAP El conocimiento del conjunto de datos está actualizado. La cuestión&lt; testOutOfDate Se trata de: parece haber algo malo con la fuente de los datos, causando que los datos más recientes no sean accesibles por ERDDAP ?
    
###### Título{#title} 
*    [ **Título** ](#title)   (de la [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) y [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos) es un atributo global REQUIRED con la breve descripción del conjunto de datos (generalmente&lt;=95 caracteres). Por ejemplo,
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * O el conjunto de datos global [fuenteAtributos](#global-attributes) o su alcance mundial&lt; addAttributes ■ DEBE incluir este atributo.
    * título es importante porque cada lista de conjuntos de datos presentados por ERDDAP   (aparte de los resultados de búsqueda) enumera los conjuntos de datos en orden alfabético, por título. Así que si desea especificar el orden de conjuntos de datos, o tener algunos conjuntos de datos agrupados, tiene que crear títulos con eso en mente. Muchas listas de conjuntos de datos (por ejemplo, en respuesta a una búsqueda de categoría) , mostrar un subconjunto de la lista completa y en un orden diferente. Así que el título de cada conjunto de datos debe mantenerse por sí mismo.
    * Si el título contiene la palabra "DEPRECATED" (todas las letras mayúsculas) , entonces el conjunto de datos obtendrá una clasificación más baja en las búsquedas.
             
##### &lt; axisVariable &gt;{#axisvariable} 
* [ ** &lt; axisVariable ■ ** ] (#Andvariable) se utiliza para describir una dimensión (también llamado "eje") .
Para EDDGrid conjuntos de datos, uno o más axisVariable las etiquetas son NECESITAS, y todas [ dataVariable s](#datavariable) siempre compartir/utilizar todas las variables del eje. ( [¿Por qué?](#why-just-two-basic-data-structures)   [¿Y si no lo hacen?](#dimensions) )   
Debe haber una variable de eje para cada dimensión de las variables de datos.
Las variables Axis DEBE especificarse en el orden en que las variables de datos las usen.
(EDDTable datasets can NOT use&lt; axisVariable Etiquetas.)
Un ejemplo encarnado es:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt; axisVariable √ apoya los siguientes subtags:
###### &lt; sourceName \\ ppgt;{#sourcename} 
* [&lt; sourceName \\] (#sourcename) -- el nombre de la fuente de datos para la variable. Este es el nombre ERDDAP™ utilizará cuando solicite datos de la fuente de datos. Este es el nombre ERDDAP™ buscará cuándo se devuelven los datos de la fuente de datos. Esto es sensible al caso. Esto es REQUIER.
###### &lt; destinationName \\ ppgt;{#destinationname} 
* [&lt; destinationName \\] (#Destino) es el nombre para la variable que se mostrará y utilizará por ERDDAP™ usuarios.
    * Esto es opcional. Si no existe, sourceName se usa.
    * Esto es útil porque te permite cambiar un críptico o extraño sourceName .
    *    destinationName es sensible al caso.
    *    destinationName DEBE comenzar con una carta (A-Z, a-z) y DEBE ser seguido por 0 o más caracteres (A-Z, a-z, 0-9, y \\_) . ('-' se permitió antes ERDDAP™ versión 1.10.) Esta restricción permite que los nombres variables de eje sean iguales en ERDDAP™ , en los archivos de respuesta, y en todo el software donde se utilizarán esos archivos, incluyendo lenguajes de programación (como Python , Matlab , y Java Script) donde existen restricciones similares a nombres variables.
    * In EDDGrid datasets, the [longitud, latitud, altitud, profundidad y tiempo](#destinationname) Las variables del eje son especiales.
         
######  axisVariable  &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [&lt; addAttributes &gt; (#variable-addattributes) define un conjunto de atributos OPTIONAL ( *nombre* = *valor* ) que se añaden a los atributos de la fuente para una variable, para hacer los atributos combinados para una variable.
Si la variable es [fuenteAtributos](#variable-addattributes) o&lt; addAttributes ■ [ scale\\_factor y/o add\\_offset ](#scale_factor) atributos, sus valores se utilizarán para desempaquetar los datos de la fuente antes de su distribución al cliente
     (resultado Valor = fuente Valor \\* scale\\_factor + add\\_offset ) . La variable desenvasada será del mismo tipo de datos (por ejemplo, flotador) como el scale\\_factor y add\\_offset valores.
         
##### &lt; dataVariable &gt;{#datavariable} 
* [ ** &lt; dataVariable ■ ** ] (#datavariable) es un REQUIIDO (para casi todos los datasets) etiqueta dentro de la&lt;dataset icono que se utiliza para describir una variable de datos. Debe haber 1 o más instancias de esta etiqueta. Un ejemplo encarnado es:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt; dataVariable √ apoya los siguientes subtags:
###### &lt; sourceName &gt;{#sourcename-1} 
* [&lt; sourceName &gt; (#sourcename) -- el nombre de la fuente de datos para la variable. Este es el nombre ERDDAP™ utilizará cuando solicite datos de la fuente de datos. Este es el nombre ERDDAP™ buscará cuándo se devuelven los datos de la fuente de datos. Esto es sensible al caso. Esto es REQUIER.
###### Grupos{#groups} 
CF agregó soporte para grupos con CF v1.8. Empezando en ~2020, NetCDF herramientas de soporte para poner variables en grupos .nc archivo. En la práctica, esto significa que las variables tienen un nombre largo que identifica al grupo (s) y el nombre variable, por ejemplo, grupo1a/group2c/varName ). ERDDAP™ soporta grupos mediante la conversión de "/" en la variable&lt; sourceName "\\_" está en la variable&lt; destinationName Por ejemplo, grupo1a\\_group2c\\_varName. (Cuando lo veas, debes darte cuenta de que los grupos no son mucho más que una convención de sintaxis.) Cuando las variables se enumeran ERDDAP™ , todas las variables de un grupo aparecerán juntas, imitando al grupo subyacente. \\[ Si ERDDAP™ , notablemente GenerarDatasets Xml, no funciona tan bien como podría con archivos fuente que tienen grupos, por favor envíe un archivo de muestra a Chris. John en Noaa.gov. \\] 

EDDTableDeFiles datasets puede utilizar algunos codificados especialmente, pseudo sourceName s para definir nuevas variables de datos, por ejemplo, para promover un atributo global a ser una variable de datos. See [esta documentación](#pseudo-sourcenames) .
######  HDF Estructuras{#hdf-structures} 
Empezando con ERDDAP™ v2.12, EDDGrid FromNcFiles y EDDGrid FromNcFiles Unpacked puede leer datos de "estructuras" en .nc 4 y 4 .hdf 4 archivos. Para identificar una variable que es de una estructura, la&lt; sourceName ■ debe utilizar el formato: *fullStructureName*  |  *memberName* , por ejemplo grupo1/myStruct | myMember.

###### Fuentes de valor fijo{#fixed-value-sourcenames} 
En un conjunto de datos EDDTable, si desea crear una variable (con un único valor fijo) que no está en el conjunto de datos fuente, utilizar:
```
    <sourceName>=*fixedValue*</sourceName>  
```
El signo inicial igual dice ERDDAP™ que un fijo El valor seguirá.

* Para variables numéricas, el valor fijo debe ser un único valor finito o NaN (caso insensible, por ejemplo, \\=NaN) .
* Para variables String, el valor fijo debe ser único, [cuerda de estilo JSON](https://www.json.org/json-en.html)   (con caracteres especiales escaparon con caracteres \\) , por ejemplo, \\= "Mi \\"Especial\" String" .
* Para una variable timetamp, especifique el valor fijo como número en "seconds since 1970-01-01T00:00:00Z" y uso
unidades=segundos desde 1970-01T00:00Z .
    
Las otras etiquetas para las&lt; dataVariable Trabajar como si fuera una variable regular.
Por ejemplo, crear una variable llamada altitud con un valor fijo de 0.0 (flotador) , uso:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

Para situaciones inusuales, incluso puede especificar un actual\\_range addAttribute, que superará los valores esperados de destinationMin y destinationMax (que, de otro modo, equivaldría a la Valor) .
 
###### Fuentes de scriptNames/ Variables descritas{#script-sourcenamesderived-variables} 
Empezando con ERDDAP™ v2.10, en un [EDDTableDeFiles](#eddtablefromfiles) , [EDDTableDesde la base de datos](#eddtablefromdatabase) o [EDDTableDesdeFileNames](#eddtablefromfilenames) Dataset, the&lt; sourceName Puede ser
una expresión (una ecuación que evalúa a un solo valor) , utilizando el formato
```
    <sourceName>=*expression*</sourceName>  
```
o un script (una serie de declaraciones que devuelven un valor único) , utilizando el formato
```
    <sourceName>=*script*</sourceName>  
```
 ERDDAP™ depende del [Proyecto Apache](https://www.apache.org/)   [ Java Idioma de expresión (JEXL) ](https://commons.apache.org/proper/commons-jexl/)   (licencia: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) para evaluar las expresiones y ejecutar los scripts.
El cálculo para una nueva variable dada se hace dentro de una fila de los resultados, repetidamente para todas las filas.
Las expresiones y scripts usan un Java - y Java Sintaxis similar al script y puede utilizar cualquiera
 [operadores y métodos que se construyen en JEXL](https://commons.apache.org/proper/commons-jexl/reference/syntax.html) .
Los scripts también pueden utilizar métodos (funciones) de estas clases:
*    [Calendario2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2) , que es un envoltorio para algunos de los métodos estáticos, relacionados con el tiempo y el calendario en com.cohort.util. ( [licencia](/acknowledgements#cohort-software) ) . Por ejemplo,
Calendario2.parseToEpochSeconds ( *sourceTime, date TimeFormat* ) analizará la fuente string de tiempo a través de la cadena dateTimeFormat y devolver una "seconds since 1970-01-01T00:00:00Z"   (epochSeconds) doble valor.
*    [Matemáticas](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math) , que es un envoltorio para casi todos los métodos estáticos relacionados con las matemáticas en [Java.lang. Matemáticas](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html) . Por ejemplo, Math.atan2 ( *Y, x* ) toma en coordenadas rectangulares (Y, x) y devuelve coordenadas polares (una serie de dobles con \\[ r, theta \\] ) .
*    [Math2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2) , que es un envoltorio para casi todos los métodos estáticos relacionados con matemáticas en com.cohort.util. Math2 ( [licencia](/acknowledgements#cohort-software) ) . Por ejemplo,
Math2.roundTo ( *d, nPlaces* ) ronda d al número especificado de dígitos a la derecha del punto decimal.
* String, que le da acceso a todos los métodos estáticos relacionados con String en [Java.lang. String](https://docs.oracle.com/javase/8/docs/api/java/lang/String) . Buscar objetos en ERDDAP™ expresiones y scripts pueden utilizar cualquiera de sus Java métodos, como se describe en el java.lang. Establece documentación. Por ejemplo, String.valueOf (d) convertir el doble valor d en un String (aunque también puede utilizar ""+d) .
*    [String2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2) , que es un envoltorio para la mayoría de los métodos estáticos, relacionados con cuerdas y array en com.cohort.util.String2 ( [licencia](/acknowledgements#cohort-software) ) . Por ejemplo, String2 .z eroPad ( *nDigits* ) añadirá 0's a la izquierda del número String para que el número total de dígitos es nDigits (por ejemplo, String2 .z eroPad ("6", 2) volverá "06") .
*    [fila](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row) , que tiene métodos no estáticos para acceder a los datos de las diversas columnas en la fila actual de la tabla de datos fuente. Por ejemplo, row.columnString ("año") lee el valor de la columna "año" como una cuerda, mientras que, row.column Int ("año") lee el valor de la columna "año" como un entero.

Por razones de seguridad, las expresiones y scripts no pueden usar otras clases aparte de las 6. ERDDAP™ impone esta limitación creando una lista negra predeterminada (que enlista todas las clases) y luego una lista blanca (que permite específicamente las 6 clases descritas anteriormente) . Si usted necesita otros métodos y/o otras clases para hacer su trabajo, por favor envíe sus solicitudes a Chris. John en Noaa.gov.
    
###### Eficiencia
Para EDDTableDeFiles datasets, sólo hay un muy, muy mínimo (probablemente no sea notable) desaceleración para solicitudes de datos de estas variables. Para EDDTableDesdeDatabase, hay una enorme penalización de velocidad para las solicitudes que incluyen limitaciones en estas variables (por ejemplo, (cadalongitud0360 unidades)&lt;40) porque las limitaciones no pueden pasar a la base de datos, por lo que la base de datos tiene que devolver mucho más datos ERDDAP™   (que consume mucho tiempo) así ERDDAP™ puede crear la nueva variable y aplicar la restricción. Para evitar el peor caso (donde no hay restricciones a la base de datos) , ERDDAP™ lanza un mensaje de error para que la base de datos no tenga que devolver todo el contenido de la tabla. (Si desea evitar esto, agregue una restricción a una columna no-scripta que siempre será verdadera, por ejemplo, &quot;&lt;3000-01-01-01.) Por esta razón, con EDDTableDesdeDatabase, es probablemente siempre mejor crear una columna derivada en la base de datos en lugar de usar sourceName =script in English ERDDAP .

###### Panorama general de cómo una expresión (O Script) Se usa:
En respuesta a la solicitud de un usuario de datos tabulares, ERDDAP™ obtiene datos de una serie de archivos fuente. Cada archivo fuente generará una tabla de crudo (directamente de la fuente) datos. ERDDAP™ entonces pasará por la tabla de datos crudos, fila por fila, y evaluará la expresión o script una vez por cada fila, para crear una nueva columna que tenga esa expresión o script como un sourceName .
    
###### GenerarDatasetsXml
Nota que GenerarDatasets Xml es completamente inconsciente cuando hay una necesidad de crear una variable con&lt; sourceName &gt;= *expresión* &lt;/ sourceName . Tienes que crear la variable en datasets.xml a mano.

###### Ejemplos de expresión:
Aquí están algunos ejemplos completos de variables de datos que utilizan una expresión para crear una nueva columna de datos. Esperamos que estos ejemplos (y variantes de ellas) cubrirá alrededor del 95% del uso de todas las expresiones sourceName s.

###### Combinando "fecha" separada y "time" columnas en una columna de tiempo unificada:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
Que sourceName la expresión hace un nuevo "time" columna concatenando los valores de String de la "fecha" ( yyyy-MM-dd ) y "time"   (HH:mm) columnas en cada fila del archivo fuente, y por convertir esa cadena en una "seconds since 1970-01-01"   (epochSeconds) doble valor.

O por supuesto, usted tendrá que personalizar la cadena de formato de tiempo para tratar con el formato específico en las columnas de fecha y hora de cada conjunto de datos, ver el
 [documentación de las unidades temporales](#string-time-units) .

Técnicamente, no tienes que usar Calendario2.parseToEpochSeconds () para convertir la fecha + hora combinada en epochSeconds. Podrías pasar la sesión de fecha + hora a ERDDAP™ y especificar el formato (por ejemplo,
 yyyy-MM-dd 'T'HH:mm:ss'Z') a través del atributo de unidades. Pero hay ventajas significativas para convertir a epochSeconds -- en particular, EDDTableDeFiles puede entonces realizar un seguimiento fácil de la gama de valores de tiempo en cada archivo y tan rápidamente decidir si buscar en un archivo dado al responder a una solicitud que tiene limitaciones de tiempo.

Un problema relacionado es la necesidad de crear una columna de fecha + hora unificada de una fuente con año separado, mes, fecha, hora, minuto, segundo. La solución es muy similar, pero a menudo tendrá que pagar cero muchos de los campos, por lo que, por ejemplo, mes (1 - 12) y fecha (1 - 31) siempre tienen 2 dígitos. Aquí hay un ejemplo con año, mes, fecha:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
Un problema relacionado es la necesidad de crear una columna de latitud unificada o longitud combinando los datos en los grados, minutos y segundos separados de la tabla fuente, cada uno almacenado como enteros. Por ejemplo,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Convertir una columna llamada "lon" con valores de longitud de 0 a 360° en una columna llamada "longitud" con valores de -180 - 180°
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
Que sourceName expresión hace una nueva columna de "longitud" al convertir el doble valor de la columna "lon" en cada fila del archivo fuente (presumiblemente con valores 0 - 360) , y por convertir eso en un -180 a 180 doble valor.

Si desea convertir los valores de longitud de origen de -180 - 180° en 0 - 360°, use
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Nombrando las dos variables de longitud:
Si el conjunto de datos tiene 2 variables de longitud, recomendamos usar destinationName =longitud para la variable -180 - 180° y destinationName =longitud0360 (y longName=\"Longitud 0-360°") para la variable 0 - 360°. Esto es importante porque los usuarios a veces utilizan Búsqueda Avanzada para buscar datos dentro de un rango de longitud específico. Esa búsqueda funcionará mejor si la longitud tiene valores -180 - 180° para todos los conjuntos de datos. Además, los atributos geoespaciales del conjunto de datos\\_lon\\_min, geoespacial\\_lon\\_max, Westernmost\\_Easting y Easternmost\\_Eastings global se establecerán de una manera consistente (con valores de longitud -180 a 180°) ;
    
###### Convertir una columna llamada "tempF" con valores de temperatura en grado\\_ F en una columna llamada "tempC" con temperaturas en grado\\_ C:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
Que sourceName expresión hace una nueva columna "tempC" con la conversión del grado de flotación\\_ Valor F de la columna "tempF" en cada fila del archivo fuente en un grado flotante\\_ Valor C.

Tenga en cuenta que su conjunto de datos puede tener ambos la temperatura original F variable y la nueva temp C variable por tener otra variable con
```
    <sourceName>tempF</sourceName>
```
###### Convertir columnas de viento "velocidad" y "dirección" en dos columnas con los componentes U,v
* Para hacer una variable u, use
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* Para hacer una variable v, utilice
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
O, dado u,v:
* Para hacer una variable de velocidad, utilice
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* Para hacer una variable de dirección, utilice
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Ejemplo de script:
Aquí hay un ejemplo de usar un script, no sólo una expresión, como un sourceName . Esperamos que los scripts, a diferencia de las expresiones, no sean necesarios a menudo. En este caso, el objetivo es devolver un valor no-NaN perdido (-99) para valores de temperatura fuera de un rango específico. Tenga en cuenta que el script es la parte después del "=".
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### Bandera dura
Si cambia la expresión o script definido en un sourceName , debe establecer un [bandera dura](/docs/server-admin/additional-information#hard-flag) para el conjunto de datos así ERDDAP™ elimina toda la información de caché para el conjunto de datos y vuelve a leer cada archivo de datos (usando la nueva expresión o script) la próxima vez que carga el conjunto de datos. Alternativamente, puedes usar [DasDds](#dasdds) que hace el equivalente de establecer una bandera dura.

###### Código de porcentaje
Esto es raramente relevante: Porque las expresiones y guiones están escritos datasets.xml , que es un documento XML, debe por ciento codificar cualquier&lt;, \\ títulos y caracteres en las expresiones y scripts como&lt;, &gt; y &amp; .

###### Problemas comunes
Un problema común es que usted crea una variable con sourceName = *expresión* pero la columna resultante de los datos simplemente tiene valores perdidos. Alternativamente, algunas filas de la nueva columna han perdido valores y crees que no deberían. El problema subyacente es que algo está mal con la expresión y ERDDAP es convertir ese error en un valor perdido. Para resolver el problema,

* Mira la expresión para ver cuál es el problema.
* Mira. [log.txt](/docs/server-admin/additional-information#log) , que mostrará el primer mensaje de error generado durante la creación de cada nueva columna.

Las causas comunes son:

* Usaste el caso equivocado. Las expresiones y scripts son sensibles a casos.
* Omitiste el nombre de la clase. Por ejemplo, debe utilizar Math.abs () , no sólo abs () .
* No hiciste conversiones de tipo. Por ejemplo, si el tipo de datos del valor del parámetro es String y tiene un doble valor, necesita convertir un doble en un String a través de ""+d.
* El nombre de la columna en la expresión no coincide exactamente con el nombre de la columna en el archivo (o el nombre puede ser diferente en algunos archivos) .
* Hay un error de sintaxis en la expresión (por ejemplo, un desaparecido o extra) ').

Si te atascas o necesitas ayuda,
por favor incluya los detalles y vea nuestros [sección sobre la obtención de apoyo adicional](/docs/intro#support) .
        
###### &lt; destinationName &gt;{#destinationname-1} 
* [&lt; destinationName &gt; (#Destino) -- el nombre de la variable que se mostrará y utilizará ERDDAP™ usuarios.
    * Esto es opcional. Si no existe, [ sourceName ](#sourcename) se usa.
    * Esto es útil porque te permite cambiar un críptico o extraño sourceName .
    *    destinationName es sensible al caso.
    *    destinationName DEBE comenzar con una carta (A-Z, a-z) y DEBE ser seguido por 0 o más caracteres (A-Z, a-z, 0-9, y \\_) . ('-' se permitió antes ERDDAP™ versión 1.10.) Esta restricción permite que los nombres de variables de datos sean los mismos ERDDAP™ , en los archivos de respuesta, y en todo el software donde se utilizarán esos archivos, incluyendo lenguajes de programación (como Python , Matlab , y Java Script) donde existen restricciones similares a nombres variables.
    * En conjuntos de datos EDDTable, [longitud, latitud, altitud (o profundidad) , y tiempo](#destinationname) Las variables de datos son especiales.
             
###### &lt;datos Tipo{#datatype} 
* [&lt;dataType] (#datatype) -- especifica el tipo de datos proveniente de la fuente. (En algunos casos, por ejemplo, al leer datos de archivos ASCII, especifica cómo deben almacenarse los datos procedentes de la fuente.) 
    * Esto es REQUIER por algunos tipos de conjunto de datos e IGNORED por otros. Tipos de conjunto de datos que requieren esto para su dataVariable s son: EDDGrid FromXxFiles, EDDTableDeXxFiles, EDDTableDeM WFS , EDDTableDesdenos, EDDTableDesde SOS . Otros tipos de conjuntos de datos ignoran esta etiqueta porque obtienen la información de la fuente.
         
    * Valores válidos son cualquiera de los estándares [ ERDDAP™ Tipos de datos](#data-types) más booleano (véase infra) . Los nombres de los tipos de datos son sensibles a los casos.
         
###### datos booleanos{#boolean-data} 
*    ["boolean"](#boolean-data) es un caso especial.
    * Internamente, ERDDAP™ no soporta un tipo booleano porque los booleanos no pueden almacenar valores perdidos y la mayoría de los tipos de archivos no soportan los booleanos. También, DAP no soporta los booleanos, así que no habría una manera estándar de preguntar las variables booleanas.
    * Especificación "boolean" para los datos Tipo en datasets.xml hará que los valores booleanos sean almacenados y representados como bytes: 0=falso, 1=true, 127= missing\\_value .
    * Los usuarios pueden especificar restricciones utilizando los valores numéricos (por ejemplo, "esAlive=1") .
    *    ERDDAP™ a veces los administradores necesitan utilizar los datos "boolean" Tipo en datasets.xml para decir ERDDAP™ cómo interactuar con la fuente de datos (por ejemplo, leer los valores booleanos de una base de datos relacional y convertirlos a 0, 1, o 127) .
         
* Si desea cambiar una variable de datos del tipo de datos en los archivos fuente (por ejemplo, corto) en algunos otros datos Introduzca el conjunto de datos (por ejemplo, int) , no uses&lt;dataTipo de instrucciones para especificar lo que desea. (Funciona para algunos tipos de conjuntos de datos, pero no para otros.) En su lugar:
    * Uso&lt;dataTipo de instrucciones para especificar lo que está en los archivos (por ejemplo, corto) .
    * En el&lt; addAttributes &gt; para la variable, añadir un [ scale\\_factor ](#scale_factor) atributo con los nuevos datos Tipo (por ejemplo, int) y un valor de 1, por ejemplo,
```
            <att name="scale\\_factor" type="int">1</att>  
```
######  dataVariable  &lt;addAttributes&gt; {#datavariable-addattributes} 
* [&lt; addAttributes &gt; (#variable-addattributes) -- define un conjunto de atributos ( *nombre* = *valor* ) que se añaden a los atributos de la fuente para una variable, para hacer los atributos combinados para una variable. Esto es opcional.
Si la variable es [fuenteAtributos](#variable-addattributes) o&lt; addAttributes ■ [ scale\\_factor y/o add\\_offset ](#scale_factor) atributos, sus valores se utilizarán para desempaquetar los datos de la fuente antes de su distribución al cliente. La variable desenvasada será del mismo tipo de datos (por ejemplo, flotador) como el scale\\_factor y add\\_offset valores.
        
###### Variable&lt;addAttributes&gt; {#variable-addattributes} 
* [ ** Atributos variables / Variables&lt; addAttributes ■ ** ] (#variable-addattributes) --&lt; addAttributes es una etiqueta OPTIONAL dentro de un&lt; axisVariable o&lt; dataVariable etiqueta &gt; que se utiliza para cambiar los atributos de la variable.
    
    *    ** Usar una variable&lt; addAttributes para cambiar los atributos de la variable. **  ERDDAP™ combina los atributos de una variable de la fuente del conjunto de datos (** fuenteAtributos **) y la variable**  addAttributes  **que usted define en datasets.xml   (que tienen prioridad) para hacer la variable "** atributos combinados ** ", que son lo que ERDDAP™ Los usuarios lo ven. Por lo tanto, usted puede utilizar addAttributes para redefinir los valores de fuenteAtributos, añadir nuevos atributos, o eliminar atributos.
    * Verás... ** &lt; addAttributes ■ **información] (#addattributes) que se aplica a nivel mundial y variable** &lt; addAttributes ■ ** .
    *    ERDDAP™ busca y utiliza muchos de estos atributos de varias maneras. Por ejemplo, los valores de colorBar se requieren para hacer una variable disponible a través de WMS , para que los mapas se puedan hacer con colorBars consistentes.
    *    [La longitud, latitud, altitud (o profundidad) , y variables de tiempo](#destinationname) obtener un montón de metadatos apropiados automáticamente (por ejemplo, [unidades](#units) ) .
    * Una muestra&lt; addAttributes Ø para una variable de datos es:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

El número vacíoOfObservations atribuye el número de fuenteOfObservations (si) para ser eliminado de la lista final y combinada de atributos.
    * Suministro de esta información ayuda ERDDAP™ hacer un mejor trabajo y ayuda a los usuarios a entender los conjuntos de datos.
Los buenos metadatos hacen que un conjunto de datos sea utilizable.
Los metadatos insuficientes hacen que un conjunto de datos sea inútil.
Por favor, tome el tiempo para hacer un buen trabajo con atributos de metadatos.
    
###### Comentarios sobre atributos variables que son especiales en ERDDAP :

######  actual\\_range  {#actual_range} 
*    [ ** actual\\_range ** ](#actual_range) es un atributo variable RECOMENDADO. Por ejemplo,

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Este atributo es del [CDC COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) y [CF 1.7+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) normas de metadatos.
* Si está presente, debe ser un conjunto de dos valores del mismo tipo de datos que el tipo de datos de destino de la variable, especificando el real (no el teórico o el permitido) valores mínimos y máximos de los datos para esa variable.
* Si los datos están empaquetados [ scale\\_factor y/o add\\_offset ](#scale_factor) , actual\\_range debe tener valores desempaquetados y ser del mismo tipo de datos que los valores desempaquetados.
* Para algunas fuentes de datos (por ejemplo, todo EDDTable... Datasets de archivos) , ERDDAP™ determina el actual\\_range de cada variable y establece actual\\_range atributo. Con otras fuentes de datos (por ejemplo, bases de datos relacionales, Cassandra, DAP PER, Hyrax ) , podría ser problemático o oneroso para la fuente para calcular el rango, por lo que ERDDAP™ no lo solicita. En este caso, es mejor si se puede establecer actual\\_range   (especialmente para las variables longitud, latitud, altitud, profundidad y tiempo) añadiendo un actual\\_range atributo a cada variable [&lt; addAttributes &gt; (#addattributes) para este conjunto de datos datasets.xml , por ejemplo,

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* Para la numérica [variables de tiempo y tiempos](#time-units) , los valores especificados deben ser la fuente pertinente (no destino) valores numéricos. Por ejemplo, si los valores del tiempo fuente se almacenan como "días desde 1985-01-01", entonces los valores del tiempo fuente actual\\_range debe especificarse en "días desde 1985-01-01". Y si desea referirse a AHORA como el segundo valor para datos de tiempo casi real que se actualiza periódicamente, debe utilizar NaN . Por ejemplo, para especificar un rango de datos de 1985-01-17 hasta AHORA, use

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* Si actual\\_range es conocido (ya sea por ERDDAP™ calcularlo o añadiéndolo a través de&lt; addAttributes Ø) ERDDAP™ lo mostrará al usuario en el formulario de acceso de datos ( * datasetID * HTML) y hacer una página web de Gráfico ( * datasetID * .graph) para ese conjunto de datos y utilizarlo al generar los metadatos FGDC e ISO 19115. Además, los últimos 7 días del tiempo actual\\_range se utilizan como subconjunto de tiempo predeterminado.
* Si actual\\_range es conocido, los usuarios pueden utilizar [min () y máx () funciones](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) en solicitudes, que a menudo es muy útil.
* Para todos los datasets de EDDTable, si actual\\_range es conocido (ya sea por usted especificando o por ERDDAP™ calcularlo) , ERDDAP™ será capaz de rechazar rápidamente cualquier solicitud de datos fuera de ese rango. Por ejemplo, si el valor de tiempo más bajo del conjunto de datos corresponde a 1985-01-17, se rechazará inmediatamente una solicitud de todos los datos de 1985-01 a 1985-01-16 con el mensaje de error "Tu consulta no produjo resultados coincidentes". Esto hace actual\\_range una pieza muy importante de metadatos, ya que puede salvar ERDDAP™ mucho esfuerzo y ahorrar al usuario mucho tiempo. Y esto destaca que actual\\_range los valores no deben ser más estrechos que el rango real de los datos; de lo contrario, ERDDAP™ puede decir erróneamente "No hay datos coincidentes" cuando de hecho hay datos relevantes.
* Cuando un usuario selecciona un subconjunto de datos y solicita un tipo de archivo que incluya metadatos (por ejemplo, .nc ) , ERDDAP™ Modifica actual\\_range en el archivo de respuesta para reflejar el rango del subconjunto.
* Véase también [ data\\_min y data\\_max ](#data_min-and-data_max) , que son una manera alternativa de especificar actual\\_range . Sin embargo, estos son deprecatados ahora que actual\\_range se define por CF 1.7+.
         
###### Atributos de barra de color{#color-bar-attributes} 
Hay varios atributos variables OPTIONAL que especifican los atributos predeterminados sugeridos para una barra de color (utilizado para convertir valores de datos en colores en imágenes) para esta variable.
* Si está presente, esta información se utiliza como información predeterminada por griddap y tabledap cuando solicite una imagen que use una barra de color.
* Por ejemplo, cuando los datos redondeados de longitud de latitud se trazan como una cobertura en un mapa, la barra de color especifica cómo los valores de datos se convierten en colores.
* Tener estos valores permite ERDDAP™ crear imágenes que utilizan una barra de color consistente a través de diferentes peticiones, incluso cuando el tiempo u otros valores de dimensión varían.
* Estos nombres de atributos fueron creados para su uso en ERDDAP . No son de un estándar de metadatos.
* Los atributos relacionados con la barra de color son:
    *    ** colorBarMinimum ** especifica el valor mínimo en el colorBar. Por ejemplo,

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Si los datos están empaquetados [ scale\\_factor y/o add\\_offset ](#scale_factor) , especificar el colorBarMinimum como un valor sin empaquetar.
    * Valores de datos inferiores a los colorBarMinimum son representados por el mismo color que colorBarMinimum valores.
    * El atributo debe ser de [tipo="doble"](#attributetype) , independientemente del tipo de variable de datos.
    * El valor suele ser un buen número redondo.
    * Buenas prácticas: Recomendamos un valor ligeramente superior al valor mínimo de los datos.
    * No hay valor predeterminado.
*    ** colorBarMaximum ** especifica el valor máximo en el colorBar. Por ejemplo,

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Si los datos están empaquetados [ scale\\_factor y/o add\\_offset ](#scale_factor) , especificar el colorBarMinimum como un valor sin empaquetar.
    * Valores de datos superiores a los colorBarMaximum son representados por el mismo color que colorBarMaximum valores.
    * El atributo debe ser de [tipo="doble"](#attributetype) , independientemente del tipo de variable de datos.
    * El valor suele ser un buen número redondo.
    * Buenas prácticas: Recomendamos un valor ligeramente inferior al valor máximo de los datos.
    * No hay valor predeterminado.
*    **color BarPalette** especifica la paleta para el colorBar. Por ejemplo,
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * Todos ERDDAP™ las instalaciones soportan estas paletas estándar: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteRed, LightRainbow, Ocean, OceanDepth, Rainbow, RedWhiteBlue, ReverseRainbow, Topografía, TopografíaDepth \\[ añadido en v1.74 \\] WhiteBlack, WhiteBlueBlack y WhiteRedBlack.
    * Si usted ha instalado [paletas adicionales](/docs/server-admin/additional-information#palettes) Puedes referirte a uno de ellos.
    * Si este atributo no está presente, el predeterminado es BlueWhiteRed si \\-1\\* colorBarMinimum = colorBarMaximum ; de lo contrario el predeterminado es Rainbow.
*    **colorBarScale** especifica la escala para el colorBar. Por ejemplo,
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * Los valores válidos son Linear y Log.
    * Si el valor es Log, colorBarMinimum Debe ser mayor que 0.
    * Si este atributo no está presente, el predeterminado es Linear.
*    **color BarContinuidad** especifica si el colorBar tiene una paleta continua de colores, o si el colorBar tiene algunos colores discretos. Por ejemplo,
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Los valores válidos son las cuerdas verdaderas y falsas.
    * Si este atributo no está presente, el defecto es cierto.
*    **colorBarN Secciones** especifica el número predeterminado de secciones en el colorBar. Por ejemplo,
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * Los valores válidos son enteros positivos.
    * Si este atributo no está presente, el predeterminado es \\-1, que dice ERDDAP™ para elegir el número de secciones basado en el rango del colorBar.
######  WMS  {#wms} 
Los principales requisitos para que una variable sea accesible ERDDAP 's WMS servidor son:
* El conjunto de datos debe ser un EDDGrid ... dataset.
* La variable de datos DEBE ser una variable rejillada.
* La variable de datos DEBE tener variables de eje de longitud y latitud. (Otras variables del eje son OPTIONAL.) 
* Debe haber algunos valores de longitud entre -180 y 180.
* El colorBarMinimum y colorBarMaximum atributos DEBE ser especificado. (Otros atributos de barra de color son OPTIONAL.) 

######  data\\_min y data\\_max  {#data_min-and-data_max} 
*    [ ** data\\_min ** y ** data\\_max ** ](#data_min-and-data_max) -- Estos son atributos variables deprecated definidos en el Experimento de Circulación del Océano Mundial (WOCE) descripción de metadatos. Por ejemplo,

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Recomendamos que use [ actual\\_range ](#actual_range) , en lugar de data\\_min y data\\_max , porque actual\\_range se define ahora por la especificación CF.
    * Si están presentes, deben ser del mismo tipo de datos que el tipo de datos de destino de la variable, y especificar el real (no el teórico o el permitido) valores mínimos y máximos de los datos para esa variable.
    * Si los datos están empaquetados [ scale\\_factor y/o add\\_offset ](#scale_factor) , data\\_min y data\\_max debe ser valores desempaquetados usando el tipo de datos desempaquetados.
         
###### variable drawLandMask  {#variable-drawlandmask} 
*    [ ** drawLandMask ** ](#variable-drawlandmask) -- Este es un atributo variable OPTIONAL usado por ERDDAP™   (y sin normas de metadatos) que especifica el valor predeterminado de la opción "Mascara de tierra" en el formulario Make A Graph del conjunto de datos ( * datasetID * .graph) y para el parámetro &.land en una URL solicitando un mapa de los datos. Por ejemplo,
    ```
        <att name="drawLandMask">under</att>  
    ```
Ver el [ drawLandMask Sinopsis](#drawlandmask) .
###### Codificación{#encoding} 
*    [ **\\_Incoding** ](#encoding) 
    * Este atributo solo se puede utilizar con variables String .
    * Este atributo es muy recomendable.
    * Este atributo es del [ NetCDF Guía del usuario (NUG) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html) .
    * Internamente en ERDDAP™ , Las cuerdas son una secuencia de caracteres de 2 bytes que usan el [Conjunto de caracteres UCS-2](https://en.wikipedia.org/wiki/UTF-16) .
    * Muchos tipos de archivos sólo admiten caracteres de 1 byte en Strings y por lo tanto necesitan este atributo para identificar un asociado
         [charset (AKA code page) ](https://en.wikipedia.org/wiki/Code_page) que define cómo mapear los 256 valores posibles a un conjunto de 256 caracteres extraídos del conjunto de caracteres UCS-2 y/o el sistema de codificación, por ejemplo, [UTF-8](https://en.wikipedia.org/wiki/UTF-8)   (que requiere entre 1 y 4 bytes por carácter) .
    * Los valores para \\_Encoding son sensibles a casos.
    * En teoría, ERDDAP™ podría soportar \\_Incoding identificadores de [esta lista de IANA](https://www.iana.org/assignments/character-sets/character-sets.xhtml) pero en la práctica, ERDDAP™ Actualmente solo soporta
        * ISO-8859-1 (nota que tiene dashes, no subraya) , que tiene la ventaja de que es idéntica a los primeros 256 caracteres de Unicode, y
        * UTF-8.
    * Al leer archivos fuente, el valor predeterminado es ISO-8859-1, excepto los archivos netcdf-4, donde el valor predeterminado es UTF-8.
    * Este es un problema problemático en curso porque muchos archivos fuente utilizan charsets o encodings que son diferentes de ISO-8859-1, pero no identifican el charset o codificación. Por ejemplo, muchos archivos de datos de origen tienen algunos metadatos copiados y pegados de Microsoft Word en Windows y por lo tanto tienen hyphens y apostrophes elegantes de un charset específico de Windows en lugar de hyphens y apostrophes ASCII. Estos personajes aparecen entonces como caracteres extraños o '?' en ERDDAP .
         
###### archivoAccessBaseUrl{#fileaccessbaseurl} 
*    ** [archivoAccessBaseUrl](#fileaccessbaseurl) archivoAccessSuffix** son atributos muy raramente usados que no son de ningún estándar. Si una columna EDDTable tiene nombres de archivo de archivos de acceso web (por ejemplo, archivos de imagen, vídeo o audio) , puedes añadir
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
para especificar la URL base (final con /) necesario para hacer los nombres de archivo en URL completas. En casos inusuales, como cuando una columna tiene referencias a archivos .png pero los valores carecen de ".png", se puede añadir
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(por ejemplo,&lt;att name="fileAccessSuffix"&lt;/a título)
para especificar un sufijo que se añadirá para hacer los nombres de archivo en direcciones URL completas. Entonces... .htmlTable respuestas, ERDDAP™ mostrará el nombre de archivo como un enlace a la URL completa (la base Url más el nombre de archivo más el sufijo) .

Si quieres ERDDAP™ para servir los archivos relacionados, hacer un separado [EDDTableDesdeFileNames](#eddtablefromfilenames) Dataset para esos archivos (puede ser un conjunto de datos privado) .
    
###### archivoAccessArchive Url{#fileaccessarchiveurl} 
*    [ **archivoAccessArchive Url** ](#fileaccessarchiveurl) es un atributo muy raramente usado que no es de ningún estándar. Si una columna EDDTable tiene nombres de archivo de archivos de acceso web (por ejemplo, archivos de imagen, vídeo o audio) accesible a través de un archivo (por ejemplo, .zip archivo) accesible a través de una URL, uso&lt;att name="fileAccessArchiveUrl" *theURL* &lt;/att] especificar la URL para el archivo.
    
Si quieres ERDDAP™ para servir el archivo de archivo, hacer un separado [EDDTableDesdeFileNames](#eddtablefromfilenames) Dataset para ese archivo (puede ser un conjunto de datos privado) .
    
######  ioos\\_category  {#ioos_category} 
*    [ ** ioos\\_category ** ](#ioos_category) -- Este es un atributo variable REQUIRED&lt;variablesMustHaveIoosCategory confía en la verdad (por defecto) dentro [setup.xml](/docs/server-admin/deploy-install#setupxml) ; de lo contrario, es opcional.
Por ejemplo,&lt;Anombre= ioos\\_category "Convención"&lt;/att confianza
Las categorías son de [ NOAA Sistema Integrado de Observación de los Océanos (IOOS) ](https://ioos.noaa.gov/) .
    
    *    (En cuanto a escribir esto) No somos conscientes de las definiciones formales de estos nombres.
    * Los nombres básicos son de Zdenka Willis.ppt "Integrated Ocean Observing System (IOOS)   NOAA 's Approach to Building an Initial Operating Capability' and from the [US IOOS Blueprint](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)   (página 1-5) .
    * Es probable que esta lista se revise en el futuro. Si tienes peticiones, por favor envía un correo electrónico a Chris. John en Noaa.gov.
    *    ERDDAP™ soporta una lista más grande de categorías que IOOS hace porque Bob Simons agregó nombres adicionales (principalmente basado en los nombres de campos científicos, por ejemplo, Biología, Ecología, Meteorología, Estadísticas, Taxonomía) para otros tipos de datos.
    * Los valores válidos actuales en ERDDAP™ Biología, Carácter de fondo, CO2, Materias orgánicas disueltas, contaminantes, corrientes, nutrientes disueltos, O2, ecología, Abundancia de peces, Especies de peces, Flujo de calor, hidrología, distribución de hielo, identificador, ubicación, meteorología, color océano, propiedades ópticas, otros, patógenos, espectros de radiación de flujo
    * Hay algo de solapamiento y ambigüedad entre diferentes términos - hacer su mejor esfuerzo.
    * Si añades ioos\\_category a la lista de&lt; categoryAttributes ■ dentro ERDDAP 's [setup.xml](/docs/server-admin/deploy-install#setupxml) archivo, los usuarios pueden encontrar fácilmente conjuntos de datos con datos similares a través de ERDDAP 's "Search for Datasets by Category" en la página principal.
         [Intenta usar ioos\\_category buscar conjuntos de datos de interés.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000) 
    * Había [una discusión sobre ERDDAP™ y ioos\\_category en el ERDDAP™ Grupo Google.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w) 
    
Usted puede ser tentado para establecer&lt;variablesMustHaveIoosCategory Información falsa para que este atributo no sea requerido. ("¡Pfft&#33; ¿Qué es para mí?") Algunas razones para dejarla fija a la verdad (por defecto) y uso ioos\\_category son:
    
    * Si la configuración.&lt;variablesMustHaveIoosCategory se establece en verdad, [GenerarDatasetsXml](#generatedatasetsxml) siempre crea/suggests an ioos\\_category atributo para cada variable en cada nuevo conjunto de datos. Entonces, ¿por qué no dejarlo entrar?
    *    ERDDAP™ permite a los usuarios buscar conjuntos de datos de interés por categoría. ioos\\_category es una categoría de búsqueda muy útil porque los ioos\\_categorías (por ejemplo, Temperatura) son bastante amplios. Esto hace ioos\\_category mucho mejor para este propósito que, por ejemplo, el CF mucho más fino standard\\_name s (que no son tan buenos para este propósito debido a todos los sinónimos y ligeras variaciones, por ejemplo, mar\\_superficie\\_temperatura versus mar\\_agua\\_temperatura) .
(Usando ioos\\_category para este fin es controlado por&lt; categoryAttributes ≤ en su archivo setup.xml.)
         [Intenta usar ioos\\_category buscar conjuntos de datos de interés.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000) 
    * Estas categorías proceden de [ NOAA Sistema Integrado de Observación de los Océanos (IOOS) ](https://ioos.noaa.gov/) . Estas categorías son fundamentales para la descripción de la misión de IOOS. Si estás dentro NOAA , apoyo ioos\\_category es un bien Uno... NOAA algo que hacer. (Mira esto. [Uno NOAA video](https://www.youtube.com/watch?v=nBnCsMYm2yQ) y ser inspirado&#33;) Si usted está en alguna otra agencia estadounidense o internacional, o trabaja con agencias gubernamentales, o trabaja con algún otro Sistema de Observación de Océanos, ¿no es buena idea cooperar con la oficina de EE.UU. IOOS?
    * Tarde o temprano, usted puede querer otro ERDDAP™ enlace a sus conjuntos de datos a través de [ EDDGrid FromErddap](#eddfromerddap) y [EDDTableDeErddap](#eddfromerddap) . Si el otro ERDDAP™ Requisitos ioos\\_category , sus conjuntos de datos deben tener ioos\\_category en orden EDDGrid FromErddap and EDDTableDeErddap a work.
    * Es psicológicamente mucho más fácil incluir ioos\\_category cuando crea el conjunto de datos (es otra cosa que ERDDAP™ requiere añadir el conjunto de datos a ERDDAP ) , que añadirlo después del hecho (si usted decidió utilizarlo en el futuro) .
         
######  long\\_name  {#long_name} 
*    [ ** long\\_name ** ](#long_name)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) , [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) y [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos) es un atributo variable RECOMENDADO ERDDAP . Por ejemplo,
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *    ERDDAP™ usos long\\_name para etiquetar ejes en gráficos.
    * Buenas prácticas: Capitalizar las palabras en long\\_name como si fuera un título (capitalizar la primera palabra y todas las palabras no-artículo) . No incluyas las unidades en las long\\_name . El nombre largo no debe ser muy largo (normalmente&lt;20 caracteres), pero debe ser más descriptivo que el [ destinationName ](#destinationname) , que a menudo es muy conciso.
    * Si... long\\_name "no se define en la variable [fuenteAtributos](#variable-addattributes) o&lt; addAttributes . ERDDAP™ lo generará limpiando el [ standard\\_name ](#standard_name)   (si está presente) o el destinationName .
         
######  missing\\_value  {#missing_value} 
*    [ ** missing\\_value ** ](#missing_value) y **\\_Fill Valor**   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) y [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ) son atributos variables que describen un número (por ejemplo, -9999) que se utiliza para representar un valor perdido. Por ejemplo,

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

Para variables String, el predeterminado para ambos es "" (la cuerda vacía) .
Para variables numéricas, el predeterminado para ambos es NaN.
*    ERDDAP™ soportes ambos missing\\_value y \\_FillValue, ya que algunas fuentes de datos asignan significados ligeramente diferentes a ellos.
* Si están presentes, deben ser del mismo tipo de datos que la variable.
* Si los datos están empaquetados [ scale\\_factor y/o add\\_offset ](#scale_factor) , el missing\\_value y los valores \\_FillValue deben ser igualmente empaquetados. Del mismo modo, para una columna con valores de fecha/hora de String que utilizan un local [ time\\_zone ](#time_zone) , el missing\\_value y los valores \\_FillValue deben utilizar la zona horaria local.
* Si una variable utiliza estos valores especiales, missing\\_value y/o \\_FillValue atributos son REQUIRED.
* Para [variables de tiempo y tiempos](#time-units)   (si la fuente es cuerdas o numéricas) , missing\\_value s y \\_FillValues aparecen como "" (la cuerda vacía) cuando el tiempo está escrito como una Crianza y como NaN cuando el tiempo está escrito como un doble. Valores fuente para missing\\_value y \\_FillValue no aparecerá en los metadatos de la variable.
* Para variables String, ERDDAP™ siempre convierte cualquier missing\\_value s o \\_FillValue valores de datos en "" (la cuerda vacía) . Valores fuente para missing\\_value y \\_FillValue no aparecerá en los metadatos de la variable.
* Para variables numéricas:
El missing\\_value y \\_FillValue aparecerá en los metadatos de la variable.
Para algunos formatos de datos de salida, ERDDAP™ dejará intactos estos números especiales, por ejemplo, verás -9999.
Para otros formatos de datos de salida (en particular formatos de texto como .csv y .htmlTable ) , ERDDAP™ sustituirá estos números especiales por NaN o ".
* Algunos tipos de datos tienen marcadores de valor inherentes que no necesitan ser identificados explícitamente con missing\\_value o atributos \\_FillValue: flotante y doble variables tienen NaN (No es un número) , Los valores de cuerda usan la cadena vacía, y los valores de char tienen carácter \\uffff   (carácter #65535, que es el valor Unicode para No un personaje) . Los tipos de datos enteros no tienen marcadores de valor perdidos inherentes.
* Si una variable entero tiene un valor perdido (por ejemplo, una posición vacía en un archivo .csv) , ERDDAP™ interpretará el valor como el definido missing\\_value o \\_FillValue para esa variable. Si no se define ninguno, ERDDAP™ interpretará el valor como el valor que falta por defecto para ese tipo de datos, que es siempre el valor máximo que se puede mantener por ese tipo de datos:
127 para variables byte, 32767 para abreviado, 2147483647 para int, 9223372036854775807 por mucho tiempo,
255 para ubyte, 65535 para ushort, 4294967295 para uint, y 18446744073709551615 para ulong.
######  ADD \\_FillValue ATTRIBUTES ?{#add-_fillvalue-attributes} 
*    [ ADD \\_FillValue ATTRIBUTES ?](#add-_fillvalue-attributes)   
Cada vez ERDDAP™ carga un conjunto de datos, comprueba si las variables con tipos de datos de origen entero tienen una definición missing\\_value o atributo \\_FillValue. Si una variable no lo hace, entonces ERDDAP™ imprime un mensaje al archivo de registro (empezando con "Añadir \\_FillValue Attribute?") recomendar que el ERDDAP™ administrador añadir un \\_Fill Atributo de valor para esta variable en datasets.xml . Es muy útil para cada variable tener un \\_FillValue o missing\\_value porque los valores perdidos siempre son posibles, por ejemplo, si un archivo dado en un conjunto de datos no tiene una variable dada, ERDDAP™ necesita ser capaz de presentar esa variable como tener todos los valores perdidos para esa variable. Si decide que una variable no debe tener un atributo \\_FillValue, puede añadir
    &lt;att names="\\_FillValue"&lt;en lugar de eso, que suprimirá el mensaje para eso datasetID +variable combinación en el futuro.
    
Cada vez ERDDAP™ comienza, recoge todas esas recomendaciones en un mensaje que está escrito al archivo de registro (empezando con " ADD \\_FillValue ATTRIBUTES ¿?") , enviado por correo electrónico a ERDDAP™ administrador, y escrito a un archivo de datos CSV en el \\[ bigParentDirectory \\] /logs/ directorio. Si desea, puede utilizar el programa GenerateDatasetsXml (y la opción AddFillValueAttributes) para aplicar todas las sugerencias en el archivo CSV al datasets.xml archivo. Para cualquiera de los datasetID /variable combinaciones en ese archivo, si decides que no hay necesidad de añadir el atributo, puedes cambiar el atributo a&lt;att names="\\_FillValue"&lt;/att] suprimir la recomendación para que datasetID +variable combinación en el futuro.
    
¡Esto es importante&#33;
Como Bob ha dicho a menudo: sería malo (y embarazoso) si algunas de las pruebas del calentamiento global fueron causadas por valores perdidos no identificados en los datos (por ejemplo, valores de temperatura de 99 o 127 grados\\_ C que debería haber sido marcado como valores perdidos y por lo tanto se ha reducido las estadísticas media y/o mediana más alto) .

* El \\_FillValue y missing\\_value valores para una variable dada en diferentes archivos fuente debe ser consistente; de lo contrario, ERDDAP™ aceptará archivos con un conjunto de valores y rechazará todos los demás archivos como "Bad Files". Para resolver el problema,
    * Si los archivos están reparados .nc archivos, puede utilizar [ EDDGrid FromNcFilesUnpacked](#eddgridfromncfilesunpacked) .
    * Si los archivos son archivos de datos tabulares, puede utilizar EDDTable... ' [normalización ¿Qué?](#standardizewhat) para decir ERDDAP para estandarizar los archivos fuente mientras se leen ERDDAP .
    * Para problemas más difíciles, se puede utilizar [NcML](#ncml-files) o [ NCO ](#netcdf-operators-nco) para resolver el problema.
             
######  scale\\_factor  {#scale_factor} 
*    [ ** scale\\_factor ** ](#scale_factor)   (por defecto = 1) y ** add\\_offset **   (por defecto = 0)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) y [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ) son atributos variables OPTIONAL que describen datos que se empaquetan en un tipo de datos más simple a través de una simple transformación.
    * Si está presente, su tipo de datos es diferente del tipo de datos fuente y describe el tipo de datos de los valores de destino.
Por ejemplo, una fuente de datos podría haber almacenado valores de datos flotantes con un dígito decimal empaquetado como entradas cortas (int16) , utilizando scale\\_factor = 0,1 y add\\_offset 0. Por ejemplo,

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

En este ejemplo, ERDDAP™ desempacar los datos y presentarlos al usuario como valores de datos flotantes.
    * Si está presente, ERDDAP™ extraer los valores de estos atributos, eliminar los atributos, y desempacar automáticamente los datos para el usuario:
destino Valor = fuente Valor \\* scale\\_factor + add\\_offset   
O, declaró otra manera:
unpackedValue = embalado Valor \\* scale\\_factor + add\\_offset 
    * El scale\\_factor y add\\_offset valores para una variable dada en diferentes archivos fuente debe ser consistente; de lo contrario, ERDDAP™ aceptará archivos con un conjunto de valores y rechazará todos los demás archivos como "Bad Files". Para resolver el problema,
        * Si los archivos están reparados .nc archivos, puede utilizar [ EDDGrid FromNcFilesUnpacked](#eddgridfromncfilesunpacked) .
        * Si los archivos son archivos de datos tabulares, puede utilizar EDDTable... ' [normalización ¿Qué?](#standardizewhat) para decir ERDDAP para estandarizar los archivos fuente mientras se leen ERDDAP .
        * Para problemas más difíciles, se puede utilizar [NcML](#ncml-files) o [ NCO ](#netcdf-operators-nco) para resolver el problema.
             
######  standard\\_name  {#standard_name} 
*    [ ** standard\\_name ** ](#standard_name)   (de la [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadatos estándar) es un atributo variable RECOMENDADO ERDDAP . CF mantiene la lista de permitidos [CF nombres estándar](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) . Por ejemplo,
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Si añades standard\\_name a los atributos de variables y añadir standard\\_name a la lista de&lt; categoryAttributes ■ dentro ERDDAP 's [setup.xml](/docs/server-admin/deploy-install#setupxml) archivo, los usuarios pueden encontrar fácilmente conjuntos de datos con datos similares a través de ERDDAP 's "Search for Datasets by Category" en la página principal.
    * Si especifica un CF standard\\_name para una variable, el atributo de unidades para la variable no tiene que ser idéntico a las Unidades Canónicas especificadas para el nombre estándar en la tabla Nombre Estándar CF, pero las unidades DEBE ser convertibles a las Unidades Canónicas. Por ejemplo, todos los CF relacionados con la temperatura standard\\_name S tienen "K" (Kelvin) como Unidades Canónicas. Así que una variable con relación a la temperatura standard\\_name DEBE tener unidades de K, grado\\_C, grado\\_F, o alguna variante UDUnits de esos nombres, ya que todos son interconvertibles.
    * Buenas prácticas: Parte del poder de [vocabularios controlados](https://en.wikipedia.org/wiki/Controlled_vocabulary) viene de usar sólo los términos en la lista. Así que recomendamos que se adhiera a los términos definidos en el vocabulario controlado, y recomendamos que no se haga un término si no hay uno apropiado en la lista. Si necesita términos adicionales, consulte si el comité de estándares los agregará al vocabulario controlado.
    *    standard\\_name los valores son los únicos valores de atributo CF que son sensibles a los casos. Siempre son minúsculas. Comenzando en ERDDAP™ v1.82, GenerateDatasets convertirá letras mayúsculas a letras minúsculas. Y cuando se carga un conjunto de datos ERDDAP , letras mayúsculas se cambian silenciosamente a letras minúsculas.
         
######  time\\_precision  {#time_precision} 
*    time\\_precision es un atributo OPTIONAL usado por ERDDAP™   (y sin normas de metadatos) para [variables de tiempo y tiempos](#time-units) , que puede estar en conjuntos de datos redondeados o conjuntos de datos tabulares, y en axisVariable s o dataVariable s. Por ejemplo,
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
     time\\_precision especifica la precisión que se debe utilizar cada vez que ERDDAP™ formatos de los valores de tiempo de esa variable como cadenas en las páginas web, incluyendo .htmlTable respuestas. En formatos de archivo donde ERDDAP™ formatos tiempos como cadenas (por ejemplo, .json ) , ERDDAP™ sólo utiliza el time\\_precision - formato especificado si incluye segundos fraccionados; de lo contrario, ERDDAP™ utiliza la 1970-01-01T00:00 Formato Z.
* Valores válidos son 1970-01, 1970-01-01, 1970-01T00Z, 1970-01T00:00Z, 1970-01T00:00Z, 1970-01T00:00 (por defecto) , 1970-01-01T00:00:00.0Z, 1970-01T00:00:00:00.00Z, 1970-01T00:00:00.000Z. \\[ 1970 no es una opción porque es un número único, por lo que ERDDAP™ no puede saber si es una cadena de tiempo formateada (año) o si es cierto número de segundos desde 1970-01T00:00:00Z. \\] 
* Si time\\_precision no se especifica o el valor no es igualado, el valor predeterminado se utilizará.
* Aquí, como en otras partes ERDDAP™ , cualquier campo del tiempo formateado que no se muestran se supone que tiene el valor mínimo. Por ejemplo, 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z, y 1985-07-01T00:00 Z son todos considerados equivalentes, aunque con diferentes niveles de precisión implícitos. Esto coincide con el [ISO 8601:2004 "extended" Especificación del formato del tiempo](https://www.iso.org/iso/date_and_time_format) .
*    **ATENCIÓN:** Sólo debe usar un limitado time\\_precision si **Todos** de los valores de datos para la variable tienen sólo el valor mínimo para todos los campos que están ocultos.
    * Por ejemplo, puede utilizar un time\\_precision de 1970-01-01-01 si todos los valores de datos tienen hora=0, minuto=0, y segundo=0 (por ejemplo 2005-03-04T00:00Z y 2005-03-05T00:00Z) .
    * Por ejemplo, no use un time\\_precision de 1970-01-01-01 si hay valores no-0 hora, minuto o segundos, (por ejemplo 2005-03-05T12:00Z) porque el valor de hora no predeterminado no sería mostrado. De lo contrario, si un usuario pide todos los datos con el tiempo=2005-03-05, la solicitud fallará inesperadamente.
             
######  time\\_zone  {#time_zone} 
*    [ ** time\\_zone ** ](#time_zone) 
    *    time\\_zone es un atributo OPTIONAL usado por ERDDAP™   (y sin normas de metadatos) para [variables de tiempo y tiempos](#time-units) , que puede estar en conjuntos de datos redondeados o conjuntos de datos tabulares.
    * El defecto es " Zulu " (que es la versión moderna de la zona horaria GMT) .
    * Información de antecedentes: "contrases temporales" (e.g., Pacific Standard Time, -08:00, GMT-8) fijas, específicas, compensaciones relativas a Zulu   (GMT) . En cambio, "zonas temporales" son las cosas mucho más complejas que se ven afectadas por el Ahorro de la Luz del Día (por ejemplo, "US/Pacific") , que han tenido diferentes reglas en diferentes lugares en diferentes momentos. Las zonas de tiempo siempre tienen nombres ya que no se pueden resumir por un simple valor offset (ver la columna "Nombres de bases de datos TZ" en la tabla [https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ) . ERDDAP 's time\\_zone atributo le ayuda a tratar los datos del tiempo local de alguna zona horaria (e.g., 1987-03-25T17:32:05 Pacífico Hora) . Si tiene datos de tiempo de cadena o numérico con un (fijo) tiempo offset, simplemente debe ajustar los datos a Zulu   (que es lo que ERDDAP™ #) especificando un tiempo base diferente en el atributo unidades (por ejemplo, "horas desde 1970-01T08:00Z", note el T08 para especificar el tiempo offset) , y siempre comprobar los resultados para asegurarse de obtener los resultados que desea.
    * Para variables de timetamp con datos de origen de Strings, este atributo le permite especificar una zona horaria que conduce ERDDAP™ para convertir los tiempos de origen de la zona local (algunos en tiempo estándar, algunos en tiempo de verano) en Zulu veces (que están siempre en tiempo estándar) . La lista de nombres válidos de zona horaria es probablemente idéntica a la lista en la columna TZ en [https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) . Las zonas horarias comunes de Estados Unidos son: Estados Unidos/Hawaii, Estados Unidos/Alaska, Estados Unidos/Pacífico, Estados Unidos/Monte, Estados Unidos/Arizona, Estados Unidos/Central, Estados Unidos/Este.
    * Para variables de temporizador con datos de fuente numérica, puede especificar el " time\\_zone "atributo, pero el valor debe ser " Zulu "o "UTC". Si necesita apoyo para otras zonas horarias, por favor envíe un correo electrónico a Chris. John en Noaa.gov.
         
###### here_time_adjust{#legacy_time_adjust} 
*    [ **here_time_adjust** ](#legacy_time_adjust) Comenzando en ERDDAP™ 2.29.0, las variables de tiempo funcionan ligeramente de forma diferente. En casos raros, más probable cuando se utiliza `días desde` y un año antes de 1582 (Así que... `días desde 0000-01-01` o `días desde 1-1-1 00:00:0.0` ) Usted tendrá que indicar para un ajuste a la variable fecha. La razón de esto es ERDDAP™ utiliza la biblioteca java.time para gestionar las fechas internamente. Hay algunos conjuntos de datos que requieren el uso de la antigua biblioteca GregorianCalendar para fijar las fechas correctas.

```
<axisVariable>
    <sourceName>time</sourceName>
    <destinationName>time</destinationName>
    <!-- sourceAttributes>
        ... removed several lines ...
        <att name="units">days since 1-1-1 00:00:0.0</att>
    </sourceAttributes -->
    <addAttributes>
        ... removed several lines ...
        <att name="legacy_time_adjust">true</att>
    </addAttributes>
</axisVariable>
```

###### unidades{#units} 
*    [ **unidades** ](#units)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) , [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) y [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatos estándar) define las unidades de los valores de datos. Por ejemplo,
    ```
        <att name="units">degree\\_C</att>
    ```
    * "unidades" es REQUIIDO como una fuenteAtributo o una adiciónAtributo para "time" variables y se recomienda STRONGMENTE para otras variables siempre que sea apropiado (que es casi siempre) .
    * En general, recomendamos [UDUnits](https://www.unidata.ucar.edu/software/udunits/) Unidades compatibles \\ que es requerido por [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) y [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) normas.
    * Otro estándar común es [UCUM](https://unitsofmeasure.org/ucum.html) - el Código Unificado de Unidades de Medición. [ OGC ](https://www.ogc.org/) servicios tales como [ SOS ](https://www.ogc.org/standards/sos) , [ WCS ](https://www.ogc.org/standards/wcs) , y [ WMS ](https://www.ogc.org/standards/wms) requiere UCUM y a menudo se refieren a UCUM como UOM (Unidades de Medición) .
    * Recomendamos que utilice un estándar de unidades para todos los conjuntos de datos en su ERDDAP . Deberías decir ERDDAP™ con qué estándar estás usando&lt;Unidades \\_standard confianza, en su [setup.xml](/docs/server-admin/deploy-install#setupxml) archivo.
    * Las unidades para una variable dada en diferentes archivos de origen deben ser consistentes. Si tiene una colección de archivos de datos donde un subconjunto de los archivos utiliza diferentes valores de unidades que uno o más subconjuntos de los archivos (por ejemplo,
"días desde 1985-01-01" versus "días desde 2000-01-01",
"degree\\_Celsius" versus "deg\\_C", o
"knots" versus "m/s") necesita encontrar una manera de estandarizar los valores de las unidades, de lo contrario, ERDDAP™ sólo cargará un subconjunto de los archivos. Piénsalo: si un archivo tiene unidades WindSpeed=knots y otro tiene unidades WindSpeed=m/s, entonces los valores de los dos archivos no deben ser incluidos en el mismo conjunto de datos agregados.
        * Si los archivos están reparados .nc archivos, en muchas situaciones se puede utilizar [ EDDGrid FromNcFilesUnpacked](#eddgridfromncfilesunpacked) .
        * Si los archivos son archivos de datos tabulares, en muchas situaciones puede usar EDDTable... ' [normalización ¿Qué?](#standardizewhat) para decir ERDDAP para estandarizar los archivos fuente mientras se leen ERDDAP .
        * Para problemas más difíciles, se puede utilizar [NcML](#ncml-files) o [ NCO ](#netcdf-operators-nco) para resolver el problema.
    * La sección estándar CF 8.1 dice que si los datos de una variable se empaquetan a través de [ scale\\_factor y/o add\\_offset ](#scale_factor) , "Las unidades de una variable deben ser representativas de los datos sin empaquetar."
    *    [Para variables de tiempo y tiempos,](#time-units) o la variable [fuenteAtributos](#variable-addattributes) o&lt; addAttributes ■ (que tiene precedencia) DEBE [unidades](#units) que es
        
        * Para variables de eje de tiempo o variables de datos de tiempo con datos numéricos: [UDUnits](https://www.unidata.ucar.edu/software/udunits/) Cuerda compatible (con el formato *unidades* desde entonces *BaseTime* ) describir cómo interpretar los valores del tiempo fuente (por ejemplo, segundos desde 1970-01T00:00Z) .
            
         *unidades* puede ser cualquiera de:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
Técnicamente, ERDDAP™ NO sigue UDUNITS estándar al convertir "years since" y "months since" valores de tiempo a "seconds since" . El UDUNITS estándar define un año como un valor fijo y único: 3.15569259747e7 segundos. Y UDUNITS define un mes como el año/12. Lamentablemente, la mayoría de los conjuntos de datos que hemos visto ese uso "years since" o "months since" claramente pretenden que los valores sean años calendario o meses calendario. Por ejemplo, 3 "months since 1970-01-01" es generalmente destinado a significar 1970-04-01. Entonces, ERDDAP™ interpretaciones "years since" y "months since" como años y meses calendario, y no sigue estrictamente UDUNITS estándar.
            
El *BaseTime* debe ser una ISO 8601:2004 (E) cadena de tiempo de fecha formateada ( yyyy-MM-dd 'T'HH:mm:ssZ, por ejemplo, 1970-01T00:00Z) , o alguna variación de eso (por ejemplo, con piezas desaparecidas al final) . ERDDAP™ trata de trabajar con una amplia gama de variaciones de ese formato ideal, por ejemplo, "1970-1-1 0:0:0" es compatible. Si falta la información de la zona horaria, se supone que es la Zulu Zona horaria (AKA GMT) . Incluso si se especifica otra compensación temporal, ERDDAP™ nunca usa el horario de verano. Si el tiempo base utiliza algún otro formato, debe utilizar&lt; addAttributes ± especificar una nueva cadena de unidades que utiliza una variación de la ISO 8601:2004 (E) formato (por ejemplo, cambiar días desde el 1 de enero de 1985 a días desde 1985-01-01.
        
Puedes probar ERDDAP 's habilidad para tratar con un específico *unidades* desde entonces *BaseTime* con ERDDAP 's [Time Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) . Con suerte, puedes conectar un número (el primer valor de la fuente de datos?) y una cadena de unidades, haga clic en Convertir, y ERDDAP™ será capaz de convertirlo en una ISO 8601:2004 (E) cadena de tiempo de fecha formateada. El convertidor devolverá un mensaje de error si la cadena de unidades no es reconocible.

###### Unidades de tiempo de crianza{#string-time-units} 
*    [Para las unidades atribuir para variables de datos de tiempo o timetamp con datos de String,](#string-time-units) debe especificar un [java.time.DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) patrón (que es mayormente compatible con java.text. SimpleDateFormat) que describe cómo interpretar los tiempos de cuerda.
    
Para los formatos de tiempo comúnmente utilizados que son variaciones de la ISO 8601:2004 (E) formato estándar (por ejemplo, 2018-01-02T00:00Z) , puede especificar variaciones de yyyy-MM-dd 'T'HH:mm:ssZ, por ejemplo, uso yyyy-MM-dd si el tiempo de cuerda sólo tiene una cita. Para cualquier formato que comience con yyyy-M, ERDDAP utiliza un parser especial que es muy indulgente de variaciones menores en el formato. El parser puede manejar zonas de tiempo en el formato 'Z', "UTC", "GMT", ±XX:XX, ±XXXX, y formatos ±XX. Si no se especifican partes de la fecha (por ejemplo, minutos y segundos) , ERDDAP™ asume el valor más bajo para ese campo (por ejemplo, si no se especifican segundos, se asume segundos=0) .
    
Para todos los otros formatos de tiempo de cadena, necesita especificar con precisión una cadena de formato DateTimeFormatter-compatible time. Como yyyy-MM-dd 'T'HH:mm:ssZ, estas cadenas de formato se construyen a partir de caracteres que identifican un tipo específico de información de la cadena de tiempo, por ejemplo, m significa minuto de hora. Si repite el carácter de formato algunas veces, refina el significado, por ejemplo, m significa que el valor puede ser especificado por cualquier número de dígitos, mm significa que el valor debe ser especificado por 2 dígitos. El Java documentación para DateTimeFormatter es una visión general y no deja estos detalles claros. Así que aquí hay una lista de variaciones de caracteres formato y su significado dentro ERDDAP™   (que a veces es ligeramente diferente Java 's DateTimeFormatter) :
    
     | Personajes | Ejemplos | Significado | 
     | -... | -... | -... | 
     | Y... | \\-4712, 0, 1, 10, 100, 2018 | un número de año, cualquier número de dígitos. ERDDAP™ tratados y (año de la era) Y (semana-basado-año, porque esto a menudo se utiliza erróneamente en lugar de y) como u, el [número de año astronómico](https://en.wikipedia.org/wiki/Astronomical_year_numbering) . Los años astronómicos son enteros positivos o negativos que no usan el BCE (BC) o CE (AD) era designators: 2018=2018CE, ..., 2=2CE, 1=1CE, 0=1BCE, -1=2BCE, -2=3BCE, ... | 
     | uuuuu,yyyy, Sí. | \\-4712, 0000, 0001, 0010, 0100, 2018 | un número de año astronómico de 4 dígitos (ignorando cualquier anterior '-')   | 
     | M | 1, 01, 12 | número de mes, cualquier número de dígitos (1=enero)   | 
     | MM | 01, 12 | a 2 dígitos (cero acolchado) mes | 
     | MMM | Jan, jan, JAN | a 3 letras Nombre del mes de inglés, caso insensible | 
     | MMMM | Jan, jan, JAN, enero, enero, enero, martes | a 3 letras o nombre completo del mes inglés, caso insensible | 
     | d | 1, 01, 31 | un número de días de mes, cualquier número de dígitos | 
     | dd | 01, 31 | a 2 dígitos (cero acolchado) día de mes. El primer 'digit' puede ser un espacio. | 
     | D | 1, 001, 366 | día de año, cualquier número de dígitos, 001=Jan 1 | 
     | DDD | 001, 366 | día de año, 3 dígitos, 001=Jan 1 | 
     | EEE | THU, Thu | a 3 letras día de semana, el valor se ignora cuando se analiza | 
     | EEE | jueves, jueves | a 3 letras o inglés completo día de semana, caso insensible, el valor se ignora cuando se analiza | 
     | H | 0, 00, 23 | H hora del día (0-23) , cualquier número de dígitos | 
     | HH | 00, 23 | HH hora del día (00-23) 2 dígitos. El primer 'digit' puede ser un espacio. | 
     | a | am, AM, pm, PM | AM o PM, caso insensible | 
     | h | 12, 1, 01, 11 | Hora-hora-de-am-pm (12, 1, 2, 11) , cualquier número de dígitos | 
     | h | 12, 01, 11 | Hora-hora-de-am-pm (12, 1, 2, 11) 2 dígitos. El primer 'digit' puede ser un espacio. | 
     | K | 0, 1, 11 | hora de mañana (0, 1, ...11) , cualquier número de dígitos | 
     | KK | 00, 01, 11 | hora de mañana, 2 dígitos | 
     | m | 0, 00, 59 | minuto de hora, cualquier número de dígitos | 
     | mm | 00, 59 | minuto de hora, 2 dígitos | 
     | s | 0, 00, 59 | segundo minuto, cualquier número de dígitos | 
     | ss | 00, 59 | segundo minuto, 2 dígitos | 
     | S | 0, 000, 9, 999 | fracción de segundo, como si después de un punto decimal, cualquier número de dígitos | 
     | SS | 00, 99 | cientos de segundo, 2 dígitos | 
     | SSS | 999 | miles de segundos, 3 dígitos | 
     | A | 0, 0000, 86399999 | milisegundo de día, cualquier número de dígitos | 
     | AAAAAAAA | 00000000, 86399999 | milisegundo día, 8 dígitos | 
     | N | 0, 00000000000000000, 86399999999999 | nanosegundo día, cualquier número de dígitos. In ERDDAP™ , esto es truncado a NMillis. | 
     | NNNNNNNNNNNNNNN | 00000000000000000, 86399999999999999 | nanosegundo día, 14 dígitos. In ERDDAP™ Esto es truncado a NMillis. | 
     | n | 0, 00000000000, 59999999999999 | nanosegundo de segundo, cualquier número de dígitos. In ERDDAP™ Esto es truncado a NMillis. | 
     | nnnnnnn | 00000000000, 59999999999999999 | nanosegundo, 11 dígitos. In ERDDAP™ Esto es truncado a NMillis. | 
     | XXX, ZZZ | Z, -08:00, +01:00 | una zona horaria con el formato 'Z' o ± (2 dígitos de hora) : (offset de 2 dígitos) . Esto trata *espacio* como + (no estándar) . ZZZ que admite 'Z' no es estándar pero se ocupa de un error de usuario común. | 
     | XX, ZZ | Z -0800, +0100 | una zona horaria con el formato 'Z' o ± (2 dígitos de hora) : (offset de 2 dígitos) . Esto trata *espacio* como + (no estándar) . ZZ soportando 'Z' no es estándar pero se ocupa de un error de usuario común. | 
     | X, Z | Z, -08, +01 | una zona horaria con el formato 'Z' o ± (2 dígitos de hora) : (offset de 2 dígitos) . Esto trata *espacio* como + (no estándar) . Z soportando 'Z' no es estándar pero se ocupa de un error de usuario común. | 
     | xxxx | \\-08:00, +01:00 | una zona horaria con el formato ± (2 dígitos de hora) : (offset de 2 dígitos) . Esto trata *espacio* como + (no estándar) . | 
     | xx | \\-0800, +0100 | una zona horaria con el formato ± (2 dígitos de hora)  (offset de 2 dígitos) . Esto trata *espacio* como + (no estándar) . | 
     | x | \\-08, +01 | una zona horaria con el formato ± (2 dígitos de hora) . Esto trata *espacio* como + (no estándar) . | 
     | ' | 'T', 'Z', 'GMT' | inicio y fin de una serie de caracteres literales | 
     | ' ' (dos citas individuales)   | ' ' | dos citas individuales denota una cita literal | 
     |   \\[  \\]   |   \\[   \\]   | el comienzo (" \\[ ") y fin (" \\] ") de una sección opcional. Esta notación solo es compatible con caracteres literales y al final de la cadena de formato. | 
     | #, &#123;, &#125; | #, &#123;, &#125; | reservadas para uso futuro | 
     | G,L,Q,e,c,V,z,O,p |       | Estos caracteres de formato son soportados por Java 's DateTimeFormatter, pero actualmente no apoyado por ERDDAP . Si necesitas apoyo para ellos, envía un correo electrónico a Chris. John en Noaa.gov. | 
    
Notas:
    
    * En una fecha con puntuación, los valores numéricos pueden tener un número variable de dígitos. (por ejemplo, en el formato de fecha de corte estadounidense "1/2/1985", el mes y la fecha pueden ser 1 o 2 dígitos) por lo que el formato debe utilizar fichas de 1 letras, por ejemplo, M/d/yyyyyy, que aceptan cualquier número de dígitos para mes y fecha.
    * Si el número de dígitos para un artículo es constante, por ejemplo, 01/02/1985, especifique el número de dígitos en el formato, por ejemplo, MM/dd/yyyyyy para 2 dígitos mes, 2 dígitos fecha y 4 dígitos año.
    * Estos formatos son difíciles de trabajar. Un formato dado puede funcionar para la mayoría, pero no todos, cadenas de tiempo para una variable dada. Compruebe siempre que el formato que especifique está funcionando como se espera en ERDDAP para todas las cadenas de tiempo de una variable.
    * Cuando sea posible, GenerateDatasetXml sugerirá cadenas de formato de tiempo.
    * Si necesita ayuda para generar una cadena de formato, por favor envíe un correo electrónico a Chris. John en Noaa.gov.

La variable de datos de tiempo principal (para conjuntos de datos tabulares) y la variable de eje de tiempo principal (para conjuntos de datos redondeados) son reconocidos por el [ destinationName ](#destinationname) tiempo. Sus unidades metadatos deben ser una cadena UDUnits-compatible unidades para valores numéricos del tiempo, por ejemplo, "días desde 1970-01-01" (para conjuntos de datos tabulares o redondeados) o [unidades adecuadas para tiempos de cuerda](#string-time-units) , por ejemplo, "M/d/yyyy" (para conjuntos de datos tabulares) .

Diferentes Unidades de Tiempo en Diferentes Rejillas .nc Archivos - Si tienes una colección de rejillas .nc archivos donde, para la variable de tiempo, un subconjunto de los archivos utiliza diferentes unidades de tiempo que uno o más subconjuntos de los archivos, puede utilizar [ EDDGrid FromNcFilesUnpacked](#eddgridfromncfilesunpacked) . Convierte valores de tiempo a "seconds since 1970-01-01T00:00:00Z" a un nivel inferior, ocultando así las diferencias, para que pueda hacer un conjunto de datos de la colección de archivos heterogéneos.

###### Variables TimeStamp{#timestamp-variables} 
 [Variables TimeStamp](#timestamp-variables) -- Cualquier otra variable ( axisVariable o dataVariable , en un EDDGrid o EDDTable dataset) puede ser una variable timeStamp. Las variables de Timestamp son variables que tienen unidades relacionadas con el tiempo y datos de tiempo, pero tienen una&lt; destinationName Excepto el tiempo. Las variables TimeStamp se comportan como la variable de tiempo principal en que convierten el formato de tiempo de la fuente en "seconds since 1970-01-01T00:00:00Z" y/o ISO 8601:2004 (E) formato). ERDDAP™ reconoce tiempo Variables de muestreo por su tiempo " [unidades](#units) "Metadatos, que deben coincidir con esta expresión regular" \\[ a-zA-Z \\] + + + + + + \\[ 0-9 \\] .+" (para la fecha numérica Times, por ejemplo, "seconds since 1970-01-01T00:00:00Z" ) o ser una cita string formato de tiempo que contiene "uuuuuu", "yyyy" o "YYYYYYYY" (por ejemplo, " yyyy-MM-dd 'T'HH:mm:ssZ') . Pero por favor, sigue usando destinationName   "time" para la fecha principal Variable de tiempo.

 **Compruebe siempre su trabajo para asegurarse de que los datos de tiempo que aparece en ERDDAP™ es el tiempo correcto.** Trabajar con datos de tiempo siempre es complicado y prono de error.

See [más información sobre variables de tiempo](#destinationname) .
 ERDDAP™ tiene una utilidad [Convertir un Numeric Tiempo para/desde un tiempo de cuerda](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
See [Cómo ERDDAP™ Tratos con el tiempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
         
        
######  valid\\_range  {#valid_range} 
*    [ ** valid\\_range ** o ** valid\\_min ** y ** valid\\_max ** ](#valid_range) -- Estos son atributos variables OPTIONAL definidos en los [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) convenciones sobre metadatos. Por ejemplo,

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

o

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Si están presentes, deben ser del mismo tipo de datos que la variable, y especificar los valores mínimos y máximos válidos de los datos para esa variable. Los usuarios deben considerar que los valores fuera de este rango son inválidos.
    *    ERDDAP™ no aplica el valid\\_range . Dijo otra manera: ERDDAP™ no convierte valores de datos fuera de valid\\_range al \\_Fill Valor o missing\\_value . ERDDAP™ sólo pasa por estos metadatos y deja la aplicación a usted.
¿Por qué? Para eso es este metadato. Si el proveedor de datos hubiera querido, el proveedor de datos podría haber convertido los valores de datos fuera del valid\\_range para ser \\_FillValues. ERDDAP™ no adivina el proveedor de datos. Este enfoque es más seguro: si se muestra más adelante que el valid\\_range era demasiado estrecho o incorrecto, ERDDAP™ No habrá borrado los datos.
    * Si los datos están empaquetados [ scale\\_factor y/o add\\_offset ](#scale_factor) , valid\\_range , valid\\_min y valid\\_max debe ser el tipo de datos y los valores empaquetados. Desde ERDDAP™ aplicable scale\\_factor y add\\_offset cuando carga el conjunto de datos, ERDDAP™ desempacar valid\\_range , valid\\_min y valid\\_max valores para que los metadatos de destino (mostrado a los usuarios) indicará el tipo y el rango de datos desempaquetados.
O, si un desempaquetado valid\\_range atributo está presente, será renombrado valid\\_range cuando ERDDAP™ carga el conjunto de datos.
##### &lt;removeMVRows sensible;{#removemvrows} 
* [ ** &lt;removeMVRows confiar ** ] (#removemvrows) es una etiqueta OPTIONAL dentro de una etiqueta datasets.xml para EDDTableDeFiles (incluidas todas las subclases) datasets, aunque sólo se utiliza para EDDTableDesdeMultidimNcFiles. Puede tener un valor verdadero o falso. Por ejemplo, verdadero
Esto elimina cualquier bloque de filas al final de un grupo donde todos los valores son missing\\_value , \\_FillValue, o el CoHort ...Array valor perdido nativo (o char=#32 para CharArrays) . Esto es para el tipo de archivo Array Multidimensional CF DSG y archivos similares. Si es cierto, esto hace la prueba adecuada y así siempre carga todas las variables máx dim, por lo que puede tomar tiempo extra.
El valor predeterminado es falso.
Recomendación -- Si es posible para su conjunto de datos, recomendamos establecer removeMVRows a false. La configuración de removeMVRows a la verdad puede reducir significativamente las solicitudes, aunque puede ser necesario para algunos conjuntos de datos.
