---
sidebar_position: 2
---

# Guía del programador

Estas son cosas que sólo un programador que pretende trabajar con ERDDAP 's Java las clases necesitan saberlo.

###  **Obtener el código fuente**  {#getting-the-source-code} 
   

  - Via Source Code on GitHub
El código fuente de versiones públicas recientes y versiones en desarrollo también está disponible a través de [GitHub](https://github.com/ERDDAP) . Por favor lea el [Wiki](https://github.com/ERDDAP/erddap/wiki) para ese proyecto. Si desea modificar el código fuente (y posiblemente los cambios incorporados en la norma ERDDAP™ distribución) , este es el enfoque recomendado.

###  ** ERDDAP™ dependencias**  {#erddap-dependencies} 
 ERDDAP™ utiliza Maven para cargar dependencias de código, así como algunos archivos de referencia estáticos (WEB-INF/ref) . Esto se hace para evitar almacenar muchos archivos grandes en el repositorio.
Puedes usar `mvn compile` y eso buscará las dependencias y archivos de referencia. También puede utilizar `mvn paquete` para generar un archivo de guerra.
Puede descargar manualmente los archivos ref:

  -  [etopo1\\_ice\\_g\\_i2 .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip) y descifrarlo en /WEB-INF/ref/ .

  -  [\\_files .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip) y descifrarlo en /WEB-INF/ref/ .

  -  [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip)   (versión 1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, de fecha 2024-10-14) y deshacerlo en _tomcat_, creando _tomcat_/content/erddap .

NOTA: Por defecto Maven caché estática referencia y prueba descargas de archivos de datos y sólo extraerlos cuando se descarga una nueva versión. Para evitar la descarga por completo, puede establecer el `skipResourceDownload` y/o `skipTestResourceDownload` propiedades en Maven (Por ejemplo. `mvn -DskipResourceDescargar paquete` ) . Para forzar la extracción, conjunto `-Descargar.unpack=true` y `-Descargar.unpackWhenChanged=false` .

-  ERDDAP™ y sus subcomponentes tienen una fuente abierta muy liberal [licencias](/license) , para que pueda utilizar y modificar el código fuente para cualquier propósito, con fines de lucro o sin fines de lucro. Note que ERDDAP™ y muchos subcomponentes tienen licencias que requieren que usted reconozca la fuente del código que está utilizando. See [Créditos](/credits) . Ya sea necesario o no, es sólo una buena forma de reconocer a todos estos contribuyentes.
  

-  **Use el Código para Otros Proyectos** 

Mientras usted es bienvenido a utilizar partes de la ERDDAP™ código para otros proyectos, se advierta que el código puede y cambiará. No prometemos apoyar otros usos de nuestro código. Git y GitHub serán sus principales soluciones para tratar con esto - Git le permite fusionar nuestros cambios en sus cambios.
   **Para muchas situaciones donde se puede tentar a usar partes de ERDDAP™ en su proyecto, creemos que encontrará mucho más fácil de instalar y utilizar ERDDAP™ como es,** y luego escribir otros servicios que utilizan ERDDAP 's servicios. Puedes configurar tu propio ERDDAP™ instalación crudamente en una hora o dos. Puedes configurar tu propio ERDDAP™ instalación de forma pulida en unos pocos días (dependiendo del número y la complejidad de sus conjuntos de datos) . Pero hackear partes de ERDDAP™ para su propio proyecto es probable que lleve semanas (y meses para atrapar sutilezas) y usted perderá la capacidad de incorporar cambios y correcciones de errores de subsiguientes ERDDAP™ liberaciones. Nosotros (Obviamente) pensar que hay muchos beneficios para usar ERDDAP™ como es y haciendo su ERDDAP™ instalación accesible al público. Sin embargo, en algunas circunstancias, es posible que no desee hacer su ERDDAP™ instalación accesible al público. Entonces, su servicio puede acceder y utilizar su privado ERDDAP™ y sus clientes no necesitan saber ERDDAP™ .

  ####  **Medio camino** 

O, hay otro enfoque que usted puede encontrar útil que está a la mitad entre el devenir en ERDDAP 's código y uso ERDDAP™ como un servicio web independiente: En la clase EDD, hay un método estático que le permite hacer una instancia de un conjunto de datos (basado en la especificación en datasets.xml ) :
`unodeDataset Xml (Pendiente tDatasetID) 
Devuelve una instancia de un EDDTable o EDDGrid Dataset. Dada esa instancia, puedes llamar
`makeNewFileForDapQuery (Usuario de contactosDapQuery, String dir, archivo StringName, archivo String TipoName) 
`para indicar la instancia para hacer un archivo de datos, de un fichero específicoType, con los resultados de una consulta de usuario. Así, esta es una manera sencilla de usar ERDDAP 's métodos para solicitar datos y obtener un archivo en respuesta, así como un cliente utilizaría el ERDDAP™ aplicación web. Pero este enfoque funciona dentro de tu Java programa y aprueba la necesidad de un servidor de aplicaciones como Tomcat. Utilizamos este enfoque para muchas de las pruebas unitarias de EDDTable y EDDGrid subclases, para que puedas ver ejemplos de esto en el código fuente para todas esas clases.

###  **Development**  {#development-environment} 

  - Hay configuraciones para [Jetty](https://github.com/ERDDAP/erddap/blob/main/development/jetty) y [Docker](https://github.com/ERDDAP/erddap/blob/main/development/docker) en GitHub, aunque se espera que las liberaciones corran en Tomcat.

  -  **Facultativo** : Configuración ERDDAP™ en Tomcat
Desde ERDDAP™ está destinado principalmente a ser un servlet corriendo en Tomcat, recomendamos encarecidamente que siga el estándar [Instrucciones de instalación](/docs/server-admin/deploy-install) para instalar Tomcat, y luego instalar ERDDAP™ en el directorio webapps de Tomcat. Entre otras cosas, ERDDAP™ fue diseñado para ser instalado en la estructura del directorio de Tomcat y espera que Tomcat proporcione algunos archivos .jar.

  -  ERDDAP™ no requiere un IDE específico (Chris utiliza principalmente código Visual Studio, Bob usó EditPlus) . No utilizamos Eclipse, Ant, etc.; ni ofrecemos ERDDAP - apoyo relacionado con ellos. El proyecto utiliza Maven.

  - Utilizamos un archivo de lotes que elimina todos los archivos de clase . en el árbol fuente para asegurar que tenemos una compilación limpia (con javac) .

  - Actualmente utilizamos el javac jdk-25.0.1+8 de Adoptium para compilar gov.noaa.pfeg.coastwatch.TestAll (tiene enlaces a algunas clases que no se compilan de otra manera) y hacer las pruebas. Por razones de seguridad, es casi siempre mejor utilizar las últimas versiones de Java 25 y Tomcat 10.

    - Cuando ejecutamos javac o java, el directorio actual es _tomcat_/webapps/erddap/WEB-INF .

    - Nuestra clase de javac y java es
       `clases;` 

    - Así que tu línea de comando javac será algo como
       `javac - encoding UTF-8 -cp classes;././../lib/servlet-api.jar;lib/* classes/gov/noaa/pfel/coastwatch/TestAll.java` 

    - Y tu línea de comando de java será algo como
&quot; clases de lava -cp;././././lib/servlet-api.jar;lib/* -Xmx4000M -Xms4000M clases/gov/noaa/pfel/coastwatch/TestAll
       `Opcional: puede añadir` -verbose:gc`, que dice Java para imprimir estadísticas de recogida de basura.

    - Si prueba Todo compila, todo ERDDAP™ se han recopilado las necesidades. Algunas clases son compiladas que no son necesarias para ERDDAP™ . Si compilar TestAll tiene éxito pero no compila alguna clase, esa clase no es necesaria. (Hay algunas clases inacabadas o no utilizadas.) 

  - En algunos casos, utilizamos código fuente de terceros en lugar de archivos .jar (en particular DODS ) y los han modificado ligeramente para evitar problemas compilando con Java 25. A menudo hemos hecho otras pequeñas modificaciones (en particular DODS ) por otras razones.

  - La mayoría de las clases tienen métodos de prueba en su archivo src/test asociado. Usted puede ejecutar las pruebas JUnit con el `prueba mvn` Comando. Esto descargará varios archivos zip de datos que las pruebas se basan en la última versión de [ ERDDAP /erddap Prueba](https://github.com/ERDDAP/erddapTest/releases/) .
     
NOTA: Maven caches descarga, pero descifrará los archivos descargados en cada ejecución, que toma tiempo. Para evitar la descarga
y descifrar archivos de datos de prueba, puede especificar los `skipTestResourceDownload` propiedad a Maven (Por ejemplo. `mvn -DskipTestResourceDescargar paquete` ) .

###   **Clases importantes**  {#important-classes} 

Si quieres ver el código fuente e intentar averiguar cómo ERDDAP™ funciona, por favor.

  - El código tiene Java Doc comenta, pero el Java Los médicos no han sido generados. Siéntete libre de generarlos.

  - Las clases más importantes (incluidos los mencionados a continuación) están dentro de gov/noaa/pfel/erddap.

  - El ERDDAP™ la clase tiene los métodos más altos. Se extiende HttpServlet.

  -  ERDDAP™ solicitudes a casos de subclases EDDGrid o EDDTable, que representan conjuntos de datos individuales.

  - EDStatic tiene la mayor parte de la información estática y la configuración (por ejemplo, desde los archivos setup.xml y messages.xml) y ofrece servicios estáticos (por ejemplo, envío de correos electrónicos) .

  -  EDDGrid y subclases EDDTable analizan la solicitud, obtener datos de métodos específicos de subclase, luego formatear los datos para la respuesta.

  -  EDDGrid subclases empujar datos a GridDataAccessor (el contenedor de datos interno para datos redondeados) .

  - Las subclases EDDTable empujan los datos a las subclas de TableWriter, que escriben datos a un tipo de archivo específico en la marcha.

  - Otras clases (por ejemplo, clases de bajo nivel) son también importantes, pero es menos probable que estés trabajando para cambiarlos.
     

###  **Contribuciones del Código**  {#code-contributions} 

- Problemas de GitHub
Si desea contribuir, pero no tiene un proyecto, vea la lista de [Problemas de GitHub](https://github.com/ERDDAP/erddap/issues) , muchos de los cuales son proyectos que podrías realizar. Si desea trabajar en un problema, por favor asignárselo a usted mismo para indicar a otros que está trabajando en él. La cuestión de GitHub es el mejor lugar para debatir cualquier pregunta sobre cómo proceder con la labor sobre esa cuestión.

- Si el cambio que desea hacer es uno de los siguientes casos comunes, por favor cree un [Cuestión de GitHub](https://github.com/ERDDAP/erddap/issues) indicando el cambio que pretende hacer. Luego, una vez que el cambio esté completo, haga una solicitud de tirada para solicitar la fusión. Los cambios comunes incluyen:

  - Quieres escribir otra subclase de EDDGrid o EDDTable para manejar otro tipo de fuente de datos. Si es así, le recomendamos que encuentre la subclase existente más cercana y utilice ese código como punto de partida.

  - Quieres escribir otro método saveAs_FileType_. Si es así, te recomendamos que encuentres el método SaveAs_FileType_ más cercano EDDGrid o EDDTable y utilizar ese código como punto de partida.

Esas situaciones tienen la ventaja de que el código que escribes es autocontenido. No necesitarás saber todos los detalles ERDDAP Es interno. Y será fácil para nosotros incorporar su código en ERDDAP . Tenga en cuenta que si envía código, la licencia necesitará compatible con el ERDDAP™   [licencia](/license)   (por ejemplo, [Apache](https://www.apache.org/licenses/) , [BSD](https://www.opensource.org/licenses/bsd-license.php) o [MIT-X](https://www.opensource.org/licenses/mit-license.php) ) . Listaremos su contribución en la [acreedores](/credits) .

- Si usted tiene una característica no cubierta arriba que le gustaría añadir a ERDDAP , se recomienda crear primero un hilo de discusión en el [Discusiones GitHub](https://github.com/ERDDAP/erddap/discussions/categories/ideas) . Para características/cambios significativos, la Junta Técnica los discutirá y decidirá si aprobará agregarlo a ERDDAP™ .

###  **A juzgar por sus contribuciones al Código**  {#judging-your-code-contributions} 
Si desea enviar código u otros cambios a incluir en ERDDAP Eso es genial. Su contribución debe cumplir ciertos criterios para ser aceptada. Si sigue las pautas siguientes, aumenta considerablemente las posibilidades de que se acepte su contribución.
   

  - El ERDDAP™ proyecto es gestionado por un NATD ( NOAA Designado Director Técnico) con aportaciones de una Junta Técnica.
De 2007 (el comienzo del ERDDAP ) hasta 2022, ese era Bob Simons (también el Fundador-Leader) . A partir de enero de 2023, es Chris John. Basically, the NATD is responsible for ERDDAP , así que tiene la palabra final sobre las decisiones sobre ERDDAP™ código, en particular sobre el diseño y si se aceptará o no una solicitud de tirada determinada. Tiene que ser así en parte por razones de eficiencia (funciona genial para Linus Torvalds y Linux) y en parte por razones de seguridad: Alguien tiene que decirle a la gente de seguridad de TI que se hace responsable de la seguridad e integridad del código.
     

  - La NATD no garantiza que acepte su código.
Si un proyecto no funciona tan bien como esperábamos y si no se puede salvar, la NATD no incluirá el proyecto en el proyecto ERDDAP™ distribución. Por favor no te sientas mal. A veces los proyectos no funcionan tan bien como esperaban. Sucede a todos los desarrolladores de software. Si sigue las pautas siguientes, aumenta considerablemente sus posibilidades de éxito.
     

  - Es mejor si los cambios son de interés general y utilidad.
Si el código es específico para su organización, probablemente sea mejor mantener una rama separada de ERDDAP™ para su uso. Axiom hace esto. Afortunadamente, Git hace esto fácil de hacer. La NATD quiere mantener una visión coherente para ERDDAP , no permitir que se convierta en un proyecto de fregadero de cocina donde todos agregan una característica personalizada para su proyecto.
     

  - Seguir el Java Convenios de Código.
En general, su código debe ser de buena calidad y debe seguir el original [ Java Code Conventions](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf) : poner archivos .class en el lugar adecuado en la estructura del directorio, dar a los archivos .class un nombre apropiado, incluir Java Doc comentarios, incluyen //comentarios al inicio de cada párrafo del código, indent con 4 espacios (no pestaña) , evite las líneas √80 caracteres, etc. Las convenciones cambian y el código fuente no siempre está al día. Cuando en duda, coincida con el código de las convenciones y no con el código existente.

- Utilice la clase descriptiva, el método y los nombres variables.
Eso hace que el código sea más fácil para que otros lean.
   

- Evite código de fantasía.
A largo plazo, usted u otra gente tendrá que averiguar el código para mantenerlo. Así que por favor use métodos de codificación simples que son así más fáciles para otros (incluido en el futuro) para averiguarlo. Obviamente, si hay una ventaja real para usar algo de fantasía Java programar característica, utilizarlo, pero documentar ampliamente lo que hiciste, por qué, y cómo funciona.
   

- Trabaja con la Junta Técnica antes de comenzar.
Si esperas que tus cambios de código se introduzcan en ERDDAP™ , La Junta Técnica definitivamente querrá hablar de lo que vas a hacer y cómo vas a hacerlo antes de hacer cualquier cambio en el código. De esa manera, podemos evitar que hagas cambios que la NATD, al final, no acepta. Cuando usted está haciendo el trabajo, la NATD y la Junta Técnica están dispuestos a responder preguntas para ayudarle a averiguar el código existente y (general) cómo abordar su proyecto.
   

- Trabajar independientemente (tanto como sea posible) después de empezar.
En contraste con lo anterior "Trabajar con la Junta Técnica", después de comenzar el proyecto, la NATD le anima a trabajar lo más independiente posible. Si la NATD tiene que decirle casi todo y responder un montón de preguntas (especialmente los que podría haber respondido leyendo la documentación o el código) , entonces sus esfuerzos no son un ahorro de tiempo para la NATD y también puede hacer el trabajo ellos mismos. Es el [Meses del Hombre Místico](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) problema. Por supuesto, todavía debemos comunicarnos. Sería genial ver periódicamente su trabajo en progreso para asegurarse de que el proyecto está en marcha. Pero cuanto más puedas trabajar independientemente (después de que la Junta Técnica convenga en la tarea que se está realizando y en el enfoque general) Mejor.
   

- Evite los errores.
Si un error no es atrapado antes de una liberación, causa problemas para los usuarios (al mejor) , devuelve la información incorrecta (en el peor) , es una mancha en ERDDAP 's reputación, y persistirá en fuera de la fecha ERDDAP™ instalaciones durante años. Trabajar muy duro para evitar errores. Parte de esto es escribir código limpio (así que es más fácil ver problemas) . Parte de esto es escribir pruebas de unidad. Parte de esto es una actitud constante de evitar errores cuando escribe código. No hagas que la NATD se arrepienta de agregar tu código a ERDDAP™ .
   

- Escribe una prueba o prueba de unidad.
Para nuevo código, debe escribir pruebas JUnit en un archivo de prueba.
Por favor escriba al menos un método de prueba individual que prueba a fondo el código que escribe y lo agregue al archivo de prueba JUnit de clase para que se ejecute automáticamente. Dependencia (y conexas) las pruebas son una de las mejores maneras de atrapar errores, inicialmente, y a largo plazo (como otras cosas cambian ERDDAP™ ) . Como Bob dijo, "Las pruebas de la unidad son lo que me deja dormir por la noche."
   

- Haga que sea fácil para la NATD entender y aceptar los cambios en su solicitud de tirada.
Parte de eso es escribir un método de prueba de unidad (s) . Parte de eso está limitando sus cambios a una sección de código (o una clase) si es posible. La NATD no aceptará ninguna solicitud de tirada con cientos de cambios a lo largo del código. La NATD dice a las personas de seguridad de TI que se hace responsable de la seguridad e integridad del código. Si hay demasiados cambios o son demasiado difíciles de averiguar, entonces es demasiado difícil verificar los cambios son correctos y no introducir errores o problemas de seguridad.
   

- Mantenlo sencillo.
Un buen tema general para su código es: Mantenlo sencillo. Código simple es fácil para otros (incluido en el futuro) para leer y mantener. Es fácil para la NATD entender y así aceptar.
   

- Asuma la responsabilidad a largo plazo por su código.
A largo plazo, es mejor que asuman la responsabilidad constante de mantener su código y responder preguntas al respecto (por ejemplo, en el ERDDAP™ Google Group) . Como señalan algunos autores, el código es una responsabilidad así como un activo. Si un error es descubierto en el futuro, es mejor si lo arreglas porque nadie sabe tu código mejor que tú. (también para que haya un incentivo para evitar errores en primer lugar) . La NATD no está pidiendo un compromiso firme para proporcionar mantenimiento continuo. La NATD está diciendo que hacer el mantenimiento será muy apreciado.
