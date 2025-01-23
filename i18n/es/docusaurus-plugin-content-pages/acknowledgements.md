# Reconocimientos

El contribuyente[acreedores](https://github.com/erddap/erddap/blob/main/CREDITS.md)paraERDDAP™está ahora en una página separada.ERDDAP™es un producto del[NOAA](https://www.noaa.gov "National Oceanic and Atmospheric Administration") [NMFS](https://www.fisheries.noaa.gov "National Marine Fisheries Service") [SWFSC](https://swfsc.noaa.gov "Southwest Fisheries Science Center") [ERD](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division").

Bob Simons es el autor principal original deERDDAP™  (el diseñador y desarrollador de software que escribió elERDDAP- código específico) . El punto de partida era de Roy Mendelssohn (El jefe de Bob) sugerencia de Bob girar su programa ConvertTable (una pequeña utilidad que convierte los datos tabulares de un formato a otro y que fue en gran parte código de Bob pre-NOAAtrabajo que Bob relicó para ser fuente abierta) en un servicio web.

Fue y es ideas de Roy Mendelssohn sobre sistemas de datos distribuidos, su sugerencia inicial a Bob, y su apoyo continuo (incluyendo hardware, red y otro soporte de software, y al liberar el tiempo de Bob para que pueda pasar más tiempo en elERDDAP™código) que ha hecho posible este proyecto y permitido su crecimiento.

ElERDDAP- código específico está autorizado como código abierto con copyright,[NOAA](https://www.noaa.gov)manteniendo los derechos de autor. Ver el[ERDDAP™licencia](/license).
ERDDAP™utiliza código abierto de copyright, Apache, LGPL, MIT/X, Mozilla y bibliotecas y datos de dominio público.
ERDDAP™no requiere ningún código GPL o programas comerciales.

La mayor parte de la financiación para la labor sobreERDDAP™ha venido deNOAAEn eso pagó el sueldo de Bob Simons. Para el primer añoERDDAP™Cuando era contratista del gobierno, los fondos provenían del[NOAACoastWatch](https://coastwatch.noaa.gov/)programa, el[NOAAIOOS](https://ioos.noaa.gov/)programa, y la ahora desactivada plataforma del Océano Pacífico (POST) programa.

Mucho crédito va a los muchosERDDAP™administradores y usuarios que han hecho sugerencias y comentarios que han dado lugar a muchas mejoras enERDDAP. Muchos son mencionados por nombre en el[Lista de cambios](/changes). Gracias a todos (nombrado y sin nombre) Mucho. Así,ERDDAP™es un gran ejemplo de[Innovación impulsada por el usuario](https://en.wikipedia.org/wiki/User_innovation), donde la innovación de productos a menudo proviene de consumidores (ERDDAP™usuarios) , no sólo los productores (ERDDAP™desarrolladores) .

Aquí está la lista de software y conjuntos de datos que están enERDDAP™distribución. Estamos muy agradecidos por todo esto. Muchas gracias.
\\[A partir de 2021, se ha vuelto casi imposible enumerar correctamente todas las fuentes de código paraERDDAP™porque algunas de las bibliotecas que usamos (notablemente netcdf-java y especialmente AWS) a su vez utilizan muchas otras bibliotecas. Todas las bibliotecas queERDDAP™Las llamadas de código directamente se incluyen a continuación, al igual que muchas de las bibliotecas que las otras bibliotecas llaman a su vez. Si usted ve que hemos omitido un proyecto a continuación, por favor háganos saber para que podamos añadir el proyecto a continuación y dar crédito donde se debe el crédito.\\]

## Sinopsis{#overview} 
ERDDAP™es un[JavaServlet](https://www.oracle.com/technetwork/java/javaee/servlet/index.html)programa. AtERD, corre dentro de un[Tomcat](https://tomcat.apache.org/)servidor de aplicaciones (licencia:[Apache](https://www.apache.org/licenses/)) Con un[Apache](https://httpd.apache.org/)servidor web (licencia:[Apache](https://www.apache.org/licenses/)) , corriendo en un ordenador usando el[Red Hat Linux](https://www.redhat.com/)sistema operativo (licencia:[GPL](https://www.gnu.org/licenses/gpl-3.0.html)) .
     
## Datasets{#datasets} 
Los conjuntos de datos proceden de diversas fuentes. Ver los metadatos (en particular el "sourceUrl", "infoUrl""institution", y "license") para cada conjunto de datos. Muchos conjuntos de datos tienen una restricción en su uso que requiere que cite/crédito al proveedor de datos cada vez que utilice los datos. Siempre es buena forma para citar o acreditar al proveedor de datos. See[Cómo Citar un conjunto de datos en un papel](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset).
     
## CoHort Software{#cohort-software} 
[Clases de com/cohorte](#cohort-software)son de CoHort Software ( https://www.cohortsoftware.com ) que hace que estas clases estén disponibles con una licencia tipo MIT/X (ver clases/com/cohort/util/LICENSE.txt) .
     
## CoastWatch Browser{#coastwatch-browser} 
ERDDAP™utiliza el código del proyecto CoastWatch Browser (ahora decomisión) de la[NOAACoastWatch](https://coastwatch.noaa.gov) [West Coast Regional Node](https://coastwatch.pfeg.noaa.gov/)  (licencia: copyrighted open source) . Ese proyecto fue iniciado y gestionado por Dave Foley, ex Coordinador delNOAACoastWatch West Coast Regional Node. Todo el código CoastWatch Browser fue escrito por Bob Simons.
     
## OPeNDAP {#opendap} 
Datos de[OPeNDAP](https://www.opendap.org)servidores se leen con[Java DAP1.1.7](https://www.opendap.org/deprecated-software/java-dap)  (licencia: LGPL) .
     
## NetCDF-java{#netcdf-java} 
NetCDFarchivos (.nc) , Estilo GMTNetCDFarchivos (.grd) , GRIB y BUFR son leídos y escritos con código en el[NetCDF JavaBiblioteca](https://www.unidata.ucar.edu/software/netcdf-java/)  (licencia:[BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE)) desde[Unidata](https://www.unidata.ucar.edu/).

Software incluido en elNetCDF Java.jar:

* slf4j
ElNetCDF JavaBiblioteca y Cassandra necesitan[slf4j de la Fachada Simple Logging paraJava](https://www.slf4j.org/)proyecto. Actualmente,ERDDAP™utiliza el slf4j-simple-xx.jar renombrado como slf4j.jar para satisfacer esta necesidad. (licencia:[MIT/X](https://www.slf4j.org/license.html)) .
     
* JDOM
ElNetCDF Java.jar incluye código de procesamiento XML desde[JDOM](http://www.jdom.org/)  (licencia:[Apache](http://www.jdom.org/docs/faq.html#a0030)) , que se incluye en el netcdfAll.jar.
     
* Joda
ElNetCDF Java.jar incluye[Joda](https://www.joda.org/joda-time/)para cálculos de calendario (que probablemente no se utilizanERDDAP) . (licencia:[Apache 2.0](https://www.joda.org/joda-time/licenses.html)) .
     
* Apache
ElNetCDF Java.jar incluye archivos .jar de varios[Proyectos Apache](https://www.apache.org/):
    [commons-codec](https://commons.apache.org/proper/commons-codec/),
    [commons-discovery](https://commons.apache.org/discovery/),
    [Comunes...httpcliente](https://hc.apache.org/httpcomponents-client-ga/),
    [Commons-logging](https://commons.apache.org/proper/commons-logging/)  
    [HtpComponents](https://hc.apache.org),
     (Para todos: licencia:[Apache](https://www.apache.org/licenses/LICENSE-2.0))   
Estos están incluidos en el netcdfAll.jar.
     
* Otros
ElNetCDF Java.jar también incluye código de: com.google.code.findbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, org.codehaus.mojo, com.beust.jcommander, com.google.com (Google utiliza licencias tipo Apache y BSD.)   
         
## SGT{#sgt} 
Los gráficos y mapas se crean en el vuelo con una versión modificadaNOAASGT (estaba en https://www.pmel.noaa.gov/epic/java/sgt/ , now discontinued) versión 3 (aJava- base Scientific Graphics Toolkit escrito por Donald Denbo en[NOAAPMEL](https://www.pmel.noaa.gov/))   (licencia: copyrighted open source (estaba en https://www.pmel.noaa.gov/epic/java/license.html ) ) .
     
## Walter Zorn{#walter-zorn} 
Big, HTML tooltips onERDDAP's HTML pages are created with Walter Zorn's wz\\_tooltip. js (licencia: LGPL) .
Los deslizadores y la función de arrastrar y soltar del Sorter de diapositivas se crean con el wz\\_dragdrop.js de Walter Zorn (licencia: LGPL) .
     
## openPDF{#openpdf} 
Los archivos .pdf se crean con[openpdf](https://github.com/LibrePDF/OpenPDF), un libreJava- Biblioteca PDF.
     
## GSHHS{#gshhs} 
Los datos de costa y lago son de[GSHHS](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html)-- Una base de datos jerárquica, autoconsistente y jerárquica de alta resolución (licencia:[GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT)) y creado por Paul Wessel y Walter Smith.

No hacemos nada sobre la corrección de los datos de SHORELINE que vienen conERDDAP™- No lo utilices para las urposiciones naturales.
     
    
## Pscoast GMT{#gmt-pscoast} 
La frontera política y los datos de los ríos son del[pscoast](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html)programa en[GMT](https://www.soest.hawaii.edu/gmt/), que utiliza datos del[CIA Banco Mundial de Datos II](https://www.evl.uic.edu/pape/data/WDB/)  (licencia: dominio público) .

No hacemos nada sobre la corrección de los datos POLÍTICOS BOUNDARIOS que vienen conERDDAP.
    
## ETOPO{#etopo} 
Los datos de batimetría/topografía utilizados en el fondo de algunos mapas son los[ETOPO1 Global 1-Minute Gridded Elevation Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Superficie de hielo, cuadrícula registrada, binaria, 2 byte int: etopo1\\_ice\\_g\\_i2.zip)   (licencia:[dominio público](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright)) , que se distribuye de forma gratuita[NOAANGDC](https://www.ngdc.noaa.gov).

No podemos hacer nada sobre la corrección de los datos de BATHYMETRY/TOPOGRAPHY que vienen conERDDAP. No lo usen para las tribus naturales.
    
## JavaMail{#javamail} 
Los correos electrónicos se envían usando código por correo. frasco deOracle's[JavaMail API](https://javaee.github.io/javamail/)  (licencia:[COMMON DEVELOPMENT AND DISTRIBUTION LICENSE (CDDL) Versión 1.1](https://javaee.github.io/javamail/LICENSE)) .
     
## JSON{#json} 
ERDDAP™uso[json.org'sJava- biblioteca JSON](https://www.json.org/index.html)a la parse[JSON](https://www.json.org/)datos (licencia:[copyrighted open source](https://www.json.org/license.html)) .
     

## PostgrSQL{#postgrsql} 
ERDDAP™incluye el[PostGres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql)Conductor (licencia:[BSD](https://www.postgresql.org/about/licence/)) . El conductor es Copyright (c) 1997-2010, PostgreSQL Global Development Group. Todos los derechos reservados.
     
## Lucene{#lucene} 
ERDDAP™use code de Apache[Lucene](https://lucene.apache.org/). (licencia:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) para la opción "lucene" motor de búsqueda (pero no para el motor de búsqueda "original" predeterminado) .
     
## commons-compress{#commons-compress} 
ERDDAP™use code de Apache[commons-compress](https://commons.apache.org/compress/). (licencia:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) .
     
## JEXL{#jexl} 
ERDDAP™soporte para evaluar expresiones y scripts en&lt;sourceNamese basa en[Proyecto Apache](https://www.apache.org/):[JavaIdioma de expresión (JEXL) ](https://commons.apache.org/proper/commons-jexl/)  (licencia:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) .
     
## Cassandra{#cassandra} 
ERDDAP™Incluye Apache[Cassandra](https://cassandra.apache.org/) [cassandra-driver-core.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)  (licencia:[Apache 2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE)) .
Cassandra's cassandra-driver-core.jar requiere (y asíERDDAP™Incluye) :
*   [guava.jar](https://github.com/google/guava)  (licencia:[Apache 2.0](https://github.com/google/guava/blob/master/LICENSE)) .
*   [lz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)  (licencia:[Apache 2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt)) .
*   [métricas-core.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)  (licencia:[MIT](https://github.com/codahale/metrics/blob/master/LICENSE)) .
*   [netty-all.jar](https://netty.io/downloads.html)  (licencia:[Apache 2.0](https://netty.io/downloads.html)) .
*   [snappy-java.jar](https://xerial.org/snappy-java/)  (licencia:[Apache 2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE)) .
         
## KT\\_paletas{#kt_-palettes} 
Las paletas de colores que tienen el prefijo "KT\\_"son una[colección de paletas .cpt por Kristen Thyng](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)  (licencia:[MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html)) , pero ligeramente reformado por Jennifer Sevadjian deNOAApara que se ajusten aERDDAPEs .cpt requisitos.
     
## Leaflet {#leaflet} 
ERDDAP™usosJavaBiblioteca de scripts[Leaflet](https://leafletjs.com/)  (licencia:[BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE)) como elWMScliente enWMSpáginas web enERDDAP. Es un excelente software (bien diseñado, fácil de usar, rápido y libre) de Vladimir Agafonkin.
     
## AWS{#aws} 
Para trabajar con Amazon AWS (incluido S3) ,ERDDAP™usos v2 del[AWS SDK paraJava](https://aws.amazon.com/sdk-for-java/)  (licencia:[Apache](https://www.apache.org/licenses/)) .

AWS requiere que Maven tire de las dependencias. Incluyen los siguientes archivos .jar (donde xxx es el número de versión, que cambia con el tiempo, y el tipo de licencia es entre paréntesis) : anotaciones-xxx.jar (Apache) , apache-client-xxx.jar (Apache) , ams-xxx.jar (BSD) , asm-xxx.jar (BSD) , asm-analysis-xxx.jar (BSD) , asm-commons-xxx.jar (BSD) , asm-tree-xxx.jar (BSD) , asm-util-xxx.jar (BSD) , auth-xx.jar (?) , aws-core-xxx.jar (Apache) , aws-query-protocol-xxx.jar (Apache) , aws-xml-protocol-xxx.jar (Apache) , checker-qual-xxx.jar (MIT) , error\\_prone\\_annotations-xx.jar (Apache) , eventstream-xxx.jar (Apache) , Fallaccess-xxx.jar (Apache) ,httpcore-xxx.jar (Apache) , j2objc-annotations-xxx.jar (Apache) , jackson-annotations-xxx.jar (Apache) , jackson-core-xxx.jar (Apache) , jackson-databind-xxx.jar (Apache) , jaxen-xxx.jar (BSD) , jffi-xxx.jar (Apache) , jffi-xxx.native. frasco (Apache) , jnr-constantes-xxx.jar (Apache) , jnr-ffi-xxx.jar (Apache) , jnr-posix-xxx.jar (Apache) , jnr-x86asm-xxx.jar (Apache) , json-xxx.jar (Copyright fuente abierta) , jsr305-xxx.jar (Apache) , oyeblefuture-xxx.jar (Apache) , una docena de netty . tarro (Apache) , perfiles-xxx.jar (Apache) , protocolo-core-xxx.jar (Apache) , reactive-streams-xxx.jar (CCO 1.0) , Region-xxx.jar (Apache) , s3-xxx.jar (Apache) , sdk-core-xxx.jar (Apache) , utils-xxx.jar (?) . Para ver las licencias reales, busque el nombre .jar en el[Repositorio Maven](https://mvnrepository.com/)y luego se rumorea en los archivos del proyecto para encontrar la licencia.
    

También estamos muy agradecidos por todo el software y los sitios web que utilizamos al desarrollarseERDDAP, incluido
[Chrome](https://www.google.com/chrome/browser/desktop/),
[curl](https://curl.haxx.se/),
[DuckDuckGo](https://duckduckgo.com/?q=),
[EditPlus](https://www.editplus.com/),
[FileZilla](https://filezilla-project.org/).
[GitHub](https://github.com/),
[Google Search](https://www.google.com/webhp),
[PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html),
[apilamiento](https://stackoverflow.com/),
[todoist](https://todoist.com/?lang=en),
[Wikipedia](https://www.wikipedia.org/),
Internet, la World Wide Web, y todos los demás, grandes, sitios web útiles.
Muchas gracias.
