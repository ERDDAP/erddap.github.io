---
title: "EDDTableFromEML" 
---
# EDDTableDeEML y EDDTableDeEMLBatch Opciones en GenerateDatasets Xml

\\[Esta página web sólo será de interésERDDAP™administradores que trabajan con archivos EML.
Este documento fue creado originalmente en 2016. Fue editado por última vez el 2020-11-30.\\]

[ **ERDDAP™** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)es un servidor de datos que da a los usuarios una manera sencilla y consistente de descargar subconjuntos de conjuntos de datos científicos redondeados y tabulares en formatos de archivos comunes y hacer gráficos y mapas.ERDDAP™trabaja con un conjunto de datos dado como un grupo de variables multidimensionales (por ejemplo, datos de satélite o modelo) o como tabla de bases de datos (con una columna para cada tipo de información y una fila para cada observación) .ERDDAP™es Software libre y de código abierto, así que cualquiera puede[descargar e instalarERDDAP™](/docs/server-admin/deploy-install)para servir sus datos.

Para agregar un conjunto de datos a unERDDAP™instalación,ERDDAP™administrador debe añadir un trozo de XML que describa el conjunto de datos a un archivo llamadodatasets.xml. (Hay[documentación exhaustiva paradatasets.xml](/docs/server-admin/datasets).) Aunque es posible generar el trozo de XML paradatasets.xmlenteramente a mano,ERDDAP™viene con una herramienta llamada[ **GenerarDatasetsXml** ](/docs/server-admin/datasets#tools)que puede generar el borrador áspero del trozo de XML necesario para un conjunto de datos dado basado en alguna fuente de información sobre el conjunto de datos.

Lo primero es GenerarDatasets Xml pregunta es qué tipo de conjunto de datos desea crear. GenerarDatasets Xml tiene una opción especial, **EDDTableDesdeEML** , que utiliza la información en un[Ecological Metadata Language (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)Archivo XML para generar el trozo de XML paradatasets.xmlcrear un[EDDTableDesde el aeropuerto](/docs/server-admin/datasets#eddtablefromasciifiles)dataset de cada tabla de datos en un archivo EML. Esto funciona muy bien para la mayoría de los archivos EML, principalmente porque los archivos EML hacen un excelente trabajo de almacenar todos los metadatos necesarios para un conjunto de datos en un formato fácil de trabajar. La información que GenerateDatasetsXml necesita para crear los conjuntos de datos está en el archivo EML, incluyendo la URL para el archivo de datos, que GenerateDatasetsXml descarga, pares y se compara con la descripción en el archivo EML. (Muchos grupos harían bien para cambiar a EML, que es un gran sistema para documentar cualquier conjunto de datos científicos tabulares, no sólo datos ecológicos. Y muchos grupos que crean esquemas XML harían bien para utilizar EML como estudio de caso para esquemas XML que son claros, hasta el punto, no excesivamente profundos (es decir, demasiados niveles) , y fácil para que los humanos y las computadoras funcionen con.) 

## Preguntas{#questions} 

Aquí están todas las preguntas GenerarDatasets Xml preguntará, con comentarios sobre cómo debe responder si desea procesar sólo un archivo EML o un lote de archivos EML:

* ¿Qué tipo EDD?
Si desea procesar sólo un archivo, responder: EDDTableDesdeEML
Si desea procesar un grupo de archivos, responder: EDDTableDesdeEMLBatch
* Directorio para almacenar archivos?
Introduzca el nombre del directorio que se utilizará para almacenar archivos de datos eML descargados.
Si el directorio no existe, se creará.
*    (Para EDDTableDesdeEML sólo) EML URL o archivo localName?
Introduzca la URL o el nombre de archivo local de un archivo EML.
*    (Para EDDTableDeEMLBatch sólo) EML dir (URL o local) ?
Introduzca el nombre del directorio con los archivos EML (una URL o un dir local) .
Por ejemplo: http://sbc.lternet.edu/data/eml/files/
 
*    (Para EDDTableDeEMLBatch sólo) ¿Nombre de archivo regex?
Introduzca la expresión regular que se utilizará para identificar los archivos EML deseados en el directorio EML.
Por ejemplo: knb-lter-sbc\\\\.\\d+
* Utilice archivos locales si está presente (verdadero|falso) ?
Ingrese a la verdad para utilizar los archivos locales de EML y los archivos de datos, si existen.
Ingrese falso para volver a descargar los archivos EML y/o archivos de datos.
* accesible ¿A?
Si desea que los nuevos conjuntos de datos sean conjuntos de datos privados enERDDAP, especificar el nombre del grupo (s) que se permitirá el acceso.
Recomendado para grupos LTER: combinar "lter" más el grupo, por ejemplo, lter Sbc.
Si entras "null", no habrá&lt;accesible etiquetar en la salida.
See[accesible A](/docs/server-admin/datasets#accessibleto).
* local TimeZone (por ejemplo, Estados Unidos/Pacífico) ?
Si una variable de tiempo indica que tiene valores locales de tiempo, se asignará esta zona horaria.
Esto debe ser un valor del[TZ column list of time zone names](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
Observe todos los nombres fáciles de usar "US/..." al final de la lista.
Si más tarde encuentras que es incorrecto, puedes cambiar eltime\\_zoneen el pedazo dedatasets.xml.

EML plusERDDAP™es una gran combinación, ya queERDDAP™puede dar a los usuarios acceso más directo a la riqueza[Knowledge Network for Biocomplexity (KNB) ](https://knb.ecoinformatics.org/)y[Long Term Ecological Research (LTER) ](https://lternet.edu/)datos y ayudar a estos proyectos a cumplir con el gobierno de EE.UU.[Acceso público a resultados de investigación (PARR) necesidades](https://nosc.noaa.gov/EDMC/PD.DSP.php)poniendo los datos disponibles a través de un servicio web. Además, EML plusERDDAP™parece un gran puente entre científicos en el reino académico / financiado por el NSF y científicos en la agencia federal (NOAA, NASA, USGS) reino.

Vea nuestro[sección sobre la obtención de apoyo adicional](/docs/intro#support).
 
## Detalles del diseño{#design-details} 

Aquí están los detalles de diseño de la opción EDDTableDesdeEML en GenerateDatasetsXml.
Algunos están relacionados con las diferencias en cómo EML yERDDAP™hacer cosas y cómo GenerarDatasets Xml trata de estos problemas.

### Un datoTabla Se convierte en unoERDDAP™Dataset{#one-datatable-becomes-one-erddap-dataset} 
Un archivo EML puede tener múltiples&lt;datos Mesa.ERDDAP™hace unoERDDAP™dataset por EML dataTable. EldatasetIDpara el conjunto de datos
 *EMLName* \\_t *TableNumber*   (cuando EMLname es texto) o
 *sistema\\_EMLName* \\_t *TableNumber*   (cuando EMLname es un número) .
Por ejemplo, la tabla #1 en el archivo knb-lter-sbc.28, se convierte enERDDAP™ datasetID=knb\\_lter\\_sbc\\_28\\_t1,
     
### EML versus CF+ACDD{#eml-versus-cfacdd} 
Casi todos los metadatos en los archivos EML entraERDDAP, pero en un formato diferente.ERDDAP™usos[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)y[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)normas de metadatos. Son sistemas de metadatos complementarios que usan pares de valor clave para metadatos globales y para los metadatos de cada variable.
Sí, la representación EML de los metadatos es más agradable que la representación CF+ACDD. No estoy sugiriendo usar la representación de CF+ACDD como sustituto del EML. Por favor piense en CF+ACDD como parte del puente del mundo EML alOPeNDAP/CF/ACDD world.
     
### Cambios pequeños{#small-changes} 
ERDDAP™hace muchos pequeños cambios. Por ejemplo,ERDDAP™utiliza la EML noDOIsuplente Identificador más un datoTabla número comoERDDAP™ datasetID, pero cambios ligeramente alternos Identificador para que sea un nombre variable válido en la mayoría de los idiomas de la computadora, por ejemplo, datos knb-lter-sbc.33 La tabla #1 se convierte en knb\\_lter\\_sbc\\_33\\_t1.
     
### DocBook{#docbook} 
EML utiliza el sistema de marcado de DocBook para proporcionar estructura a bloques de texto en archivos EML. CF y ACDD requieren que los metadatos sean texto claro. So GenerateDatasets Xml convierte el texto marcado en texto plano que parece la versión formateada del texto. Las etiquetas en línea se sanitan con soportes cuadrados, por ejemplo,\\[subrayado\\], y se fue en el texto llano.
     
### Archivos de datos{#data-files} 
Puesto que los datos EMLTable incluyen la URL del archivo de datos real, GenerateDatasets Xml:
1. Descargar el archivo de datos.
2. Almacénalo en el mismo directorio que el archivo EML.
3. Lea los datos.
4. Compare la descripción de los datos en el EML con los datos reales en el archivo.
5. Si GenerarDatasets Xml encuentra diferencias, se ocupa de ellas, o pregunta al operador si las diferencias están bien, o devuelve un mensaje de error. Los detalles están en varios elementos a continuación.
         
### .zip'd Archivos de datos{#zipd-data-files} 
Si el archivo de datos referenciado es un.ziparchivo, debe contener sólo un archivo. Ese archivo se utilizará para elERDDAP™Dataset. Si hay más de 1 archivo.ERDDAP™rechazará ese conjunto de datos. Si es necesario, esto podría ser modificado. (En la práctica, todos los archivos SBC LTER zip tienen sólo un archivo de datos.)   
     
### StorageType{#storagetype} 
Si el almacenamiento de una columna El tipo no está especificado,ERDDAP™utiliza su mejor conjetura basada en los datos en el archivo de datos. Esto funciona muy bien.
     
### Unidades{#units} 
ERDDAP™uso[UDUNITSformato para unidades](https://www.unidata.ucar.edu/software/udunits/). GenerarDatasets Xml es capaz de convertir unidades EML aUDUNITSlimpiamente alrededor del 95% del tiempo. El 5% restante resulta en una descripción legible de las unidades, por ejemplo, "biomasaDensityUnitPerAbundanceUnit" en EML se convierte en "unidad de densidad de biomasa por unidad de abundancia" enERDDAP. Técnicamente esto no está permitido. No creo que sea tan malo bajo las circunstancias.\\[Si es necesario, unidades que no se pueden hacerUDUNITScompatible se puede mover al atributo de comentario de la variable.\\]  
     
### Versión EML 2.1.1{#eml-version-211} 
Este soporte para archivos EML v2.1.1 fue añadido a GenerateDatasets Xml en 2016 con la esperanza de que hubiera alguna toma en la comunidad EML. A partir de 2020, eso no ha ocurrido. ElERDDAP™Los desarrolladores estarían contentos de añadir soporte para versiones más recientes de EML, pero sólo si las nuevas características se utilizarán en realidad. Por favor emailerd.data at noaa.govsi desea soporte para versiones más recientes de EML y realmente utilizar esta característica.
     

## Problemas con los archivos EML{#issues-with-the-eml-files} 

Hay algunos problemas/problemas con los archivos EML que causan problemas cuando un cliente de software (como la opción EDDTableDesdeEML en GenerateDatasetsXML) intenta interpretar/procesar los archivos EML.

* Aunque hay varios problemas enumerados aquí, son en su mayoría pequeños y solucionables problemas. En general, EML es un gran sistema y ha sido un placer trabajar con él.
* Estos son aproximadamente ordenados de peor / más común a menos malo / menos común.
* La mayoría están relacionados con problemas pequeños en archivos EML específicos (que no son culpa de EML) .
* La mayoría se puede fijar por cambios simples en el archivo EML o archivo de datos.
* Dado que la gente de LTER está construyendo un comprobador de EML para probar la validez de los archivos EML, he añadido algunas sugerencias a continuación sobre las características que podrían añadirse a la ficha.

Aquí están los problemas:

### Columnas separadas de fecha y hora{#separate-date-and-time-columns} 
Algunos archivos de datos tienen columnas separadas para la fecha y para el tiempo, pero ninguna columna fecha + hora unificada. Actualmente, GenerarDatasets Xml crea un conjunto de datos con estas columnas separadas, pero no es ideal porque:

* Es mejor si los conjuntos de datos enERDDAP™tener una columna de fecha + hora combinada llamada"time".
* A menudo el conjunto de datos no se cargaráERDDAP™porque"time"columna no tiene datos de fecha + hora.

Existen dos soluciones posibles:
1. Editar el archivo de datos fuente para añadir una nueva columna en el archivo de datos (y describirlo en el EML) donde las columnas de fecha y hora se fusionan en una columna. Luego repetir GenerarDatasets Xml para que encuentre la nueva columna.
2. Usar el[Variables derivadas](/docs/server-admin/datasets#script-sourcenamesderived-variables)característica enERDDAP™para definir una nueva variabledatasets.xmlque se crea concatenando la fecha y las columnas de tiempo. Uno de los ejemplos se refiere específicamente a esta situación.
         
### Nombres de columna inconsistentes{#inconsistent-column-names} 
Los archivos EML enumeran las columnas del archivo de datos y sus nombres. Lamentablemente, a menudo son diferentes de los nombres de las columnas en el archivo de datos real. Normalmente, el orden de columna en el archivo EML es el mismo que el orden de columna en el archivo de datos, incluso si los nombres varían ligeramente, pero no siempre. GenerarDatasets Xml intenta igualar los nombres de las columnas. Cuando no puede (que es común) , se detendrá, mostrarle los pares de nombre de archivo EML/data, y preguntar si están correctamente alineados. Si entras en 's' para saltar una tabla, GeneratedDatasetsXml imprimirá un mensaje de error e irá a la siguiente tabla.
La solución es cambiar los nombres de columna erróneos en el archivo EML para que coincidan con los nombres de columna en el archivo de datos.
     
### Orden de columna diferente{#different-column-order} 
Hay varios casos en que el EML especificó las columnas en un orden diferente de lo que existen en el archivo de datos. GenerarDatasets Xml se detendrá y preguntará al operador si las coincidencias están bien o si el conjunto de datos debe ser saltado. Si se salta, habrá un mensaje de error en el archivo de resultados, por ejemplo:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
La solución es fijar el orden de columna en estos archivos EML para que coincidan con el orden en los archivos de datos.

Sería bueno si el comprobador EML comprobara que las columnas y el orden de columna en el archivo fuente coinciden con las columnas y el orden de columna en el archivo EML.
    
### Incorrecto numHeaderLines{#incorrect-numheaderlines} 
Varios datos Tablas incorrectamente estado numHeaderLines=1, por ejemplo, ...sbc.4011. Esto causaERDDAP™leer la primera línea de datos como nombres de columna. Traté de SKIP manualmente todos estos datosTablas. Son obvias porque los nombres de los col de origen inigualable son todos los valores de datos. Y si hay archivos que incorrectamente tienen numHeaderLines=0, mi sistema no lo hace obvio. Aquí hay un ejemplo del archivo de fallas SBC LTER:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
Así que el error puede aparecer como si GenerateDatasets Xml piensa que la primera línea con datos en el archivo (por ejemplo, con 2008-10-01T00:00 etc.) es la línea con nombres de columna (como si 2008-10-01T00:00 fuera un nombre de columna) .

Sería agradable si el chequeador EML comprobara el valor numHeaderLines.
    
### numHeaderLines = 0{#numheaderlines--0} 
Algunos archivos fuente no tienen nombres de columna.ERDDAP™acepta que si el EML describe el mismo número de columnas.

En mi opinión, esto parece muy peligroso. Podría haber columnas en un orden diferente o con diferentes unidades (véase infra) y no hay manera de atrapar esos problemas. Es mucho mejor si todos los archivos de datos ASCII tienen una fila con nombres de columna.
    
### DateTime Format Strings{#datetime-format-strings} 
EML tiene una forma estándar de describir los formatos de la fecha. pero hay una variación considerable en su uso en los archivos EML. (Antes me equivoqué de esto. Veo la documentación de EML para formatString que parece coincidir con el[JavaFechaTiempoFormatter especificación](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html), pero que carece de las directrices importantes sobre su uso, con el resultado de que formatString se utiliza a menudo/usualmente incorrectamente.) Hay varios casos con caso incorrecto, y/o duplicación incorrecta de una carta, y/o formato no estándar. Eso pone una carga irrazonable para los clientes, especialmente los clientes de software como GenerateDatasetsXml. GenerarDatasets Xml intenta convertir los formatos incorrectos definidos en los archivos EML en
[el formato fecha/hora queERDDAP™Requisitos](/docs/server-admin/datasets#string-time-units), que es casi idéntico aJava/Joda tiempo especificación formato, pero es un poco más indulgente.

Sería agradable si el chequeador EML requiere una estricta adherencia alJava/Joda/ERDDAPtiempo unidades especificación y verificado que los valores de tiempo de fecha en la tabla de datos podrían ser analizados correctamente con el formato especificado.
    
### DateTime But No Time Zone{#datetime-but-no-time-zone} 
GenerarDatasets Xml busca una columna con fecha Tiempo y zona horaria especificada (oZulu: desde unidades de tiempo que terminan en 'Z' o una definición de nombre de columna o atributo que incluye "gmt" o "utc", o local: de "local" en el nombre de la columna o definición de atributo) . También es aceptable un archivo con una columna de fecha pero sin columna de tiempo. También es aceptable un archivo sin información de fecha o hora.

GenerarDatasets Xml trata todos los tiempos "locales" como ser de la zona horaria que se puede especificar para un lote dado de archivos, por ejemplo, para SBC LTER, utilizar US/Pacific. La información es a veces en los comentarios, pero no en un formulario que es fácil para un programa informático para averiguar.

Los archivos que no cumplen con estos criterios son rechazados con el mensaje "NO BUENA FECHA (Hora) VARIABLE". Problemas comunes son:

* Hay una columna con fechas y una columna con tiempos, pero no fecha Columna del tiempo.
* Hay unidades de tiempo, pero la zona horaria no está especificada.

Otros comentarios:
Si hay una buena fecha + hora con columna de zona horaria, esa columna se llamará"time"dentroERDDAP.ERDDAP™requiere que los datos de la columna de tiempo sean comprensibles/convertiblesZulu/UTC/GMT fecha de zona horaria.\\[Mi creencia es: usar tiempos locales y diferentes formatos de fecha/hora (¡2 dígitos años&#33; mm/dd/yyy vs dd/mm/yyy vs ...) en archivos de datos obliga al usuario final a hacer conversiones complicadas aZulutiempo para comparar datos de un conjunto de datos con datos de otro. Así que...ERDDAP™estandariza todos los datos del tiempo: Para tiempos de cuerda,ERDDAP™siempre utiliza la ISO 8601:2004 (E) formato estándar, por ejemplo, 1985-01-02T00:00Z. Para tiempos numéricos,ERDDAP™siempre usa"seconds since 1970-01-01T00:00:00Z".ERDDAP™siempre usa elZulu  (UTC, GMT) zona horaria para eliminar las dificultades de trabajar con diferentes zonas horarias y tiempo estándar contra el horario de verano. So GenerateDatasets Xml busca una columna EML dataTable con date+timeZulu. Esto es difícil porque EML no utiliza un vocabulario/sistema formal (como[Java/ Formato de tiempo Joda](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) para especificar los datos Formato del tiempo:
Si hay un col con valores numéricos de tiempo (por ejemplo,Matlabveces) yZuluzona horaria (o simplemente fechas, sin columnas de tiempo) , se utiliza como"time".
Si hay un col con datos de fecha y hora, utilizando elZuluzona horaria, se utiliza como"time"y cualquier otra fecha o hora columna se elimina.
Else si se encuentra un col con información de fecha justa, se utiliza como"time"variable (sin zona de tiempo) .
Si hay una columna de datos y una columna de tiempo y ninguna fecha combinada Columna del tiempo, el conjunto de datos es REJECTED, pero el conjunto de datos podría ser usable añadiendo una fecha combinada Columna del tiempo (preferiblemente,ZuluZona horaria) al archivo de datos y añadir su descripción en el archivo EML.
EXAMPLEO DE SBC LTER:[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)dataTabla #2.

Sería agradable si EML/LTER requiere la inclusión de una columna conZulu  (UTC, GMT) tiempos de zona horaria en todos los archivos de datos fuente relevantes. Siguiente mejor es añadir un sistema a EML para especificar untime\\_zoneatributo utilizando nombres estándar (de la[Columna TZ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .
    
### Faltamissing\\_value {#missing-missing_value} 
Algunas columnas usan unmissing\\_valuepero no la lista en los metadatos EML, por ejemplo, la precipitación\\_mm en knb-lter-sbc.5011 utiliza -999. Si no se especifica ningún valor perdido en el EML, GenerateDatasetsXml busca automáticamente valores comunes perdidos (por ejemplo, 99, -99, 999, -999, 9999, -9999, etc) y crea esos metadatos. Pero otros desaparecidosmissing\\_valueS no están atrapados.

Sería agradable si el chequeador de EML buscara desaparecidomissing\\_values.
    
### Problemas pequeños{#small-problems} 
Hay muchos problemas pequeños (ortografía, puntuación) que probablemente sólo será encontrado por un humano inspeccionando cada conjunto de datos.

Sería agradable si el comprobador EML buscara errores de ortografía y gramaticales. Este es un problema difícil porque las palabras en la ciencia son a menudo marcadas por los correctores de hechizos. La edición humana probablemente sea necesaria.
    
### Inválidos caracteres Unicode{#invalid-unicode-characters} 
Algunos de los contenidos de EML contienen caracteres Unicode inválidos. Estos son probablemente personajes del charset de Windows que fueron copiados y pegados incorrectamente en los archivos UTF-8 EML. GenerarDatasets Xml sanitiza a estos personajes por ejemplo,\\[#128\\], por lo que son fáciles de buscar enERDDAP™ datasets.xmlarchivo.

Sería bueno que el chequeador de EML comprobara esto. Es fácil de encontrar y fácil de arreglar.
    
### Diferentes Unidades de Columna] (#differentColumnUnits)  {#different-column-unitsdifferentcolumnunits} 
Algunos datos de EMLTablas definen columnas que son inconsistentes con las columnas en el archivo de datos, sobre todo porque tienen diferentes unidades. GenerarDatasets Las banderas Xml. Depende del operador decidir si las diferencias están bien o no. Estos aparecen en el archivo de fallos como datos "SKIPPED"Tablas. EXAMPLE en el archivo de fallas SBC LTER:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
Sería bueno si el chequeador EML comprobara que las unidades coinciden. Desafortunadamente, esto es probablemente imposible de atrapar y luego imposible de resolver sin ponerse en contacto con el creador de conjunto de datos, dado que el archivo fuente no incluye unidades. La discrepancia para el ejemplo anterior sólo era notable porque las unidades estaban incluidas en el nombre de la columna fuente y el nombre de la columna EML. ¿Cuántos otros datosLas capacidades tienen este problema pero son indetectables?
    
### Diferentes versiones de EML{#different-versions-of-eml} 
GenerarDatasets Xml está diseñado para trabajar con EML 2.1.1. Otras versiones de EML funcionarán en la medida en que coincidan con 2.1.1 o que GenerateDatasetsXml tiene un código especial para tratar con él. Este es un problema raro. Cuando ocurre, la solución es convertir sus archivos a EML 2.1.1, o enviar el archivo EML aerd.data at noaa.gov, así que puedo hacer cambios para GenerarDatasets Xml para lidiar con las diferencias.

Bob agregó soporte para archivos EML para GenerarDatasets Xml en 2016 con la esperanza de que hubiera alguna toma en la comunidad EML. A partir de 2020, eso no ha ocurrido. Bob está feliz de añadir soporte para versiones más recientes de EML, pero sólo si las nuevas características se utilizarán en realidad. Por favor emailerd.data at noaa.govsi desea soporte para versiones más recientes de EML y realmente utilizar esta característica.
    
### Problemas para el archivo de datos{#trouble-parsing-the-data-file} 
Raramente, un datoTabla puede ser rechazado con el error "Número de artículos no esperados en la línea #120 (observado=52, esperado=50) " Un mensaje de error como este significa que una línea en el archivo de datos tenía un número diferente de valores que las otras líneas. Puede ser un problemaERDDAP™  (por ejemplo, no analizar el archivo correctamente) o en el archivo. EXAMPLEO DE SBC LTER:
[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)dataTable #3, vea datafile=LTER\\_mesly\\_bottledata\\_registered\\_stations\\_20140429.txt
