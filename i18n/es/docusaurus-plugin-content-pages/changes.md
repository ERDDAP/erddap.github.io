---
title: "ERDDAP™ - Changes"
---
# ERDDAP™Cambios

ERDDAP™es un gran ejemplo de[Innovación impulsada por el usuario](https://en.wikipedia.org/wiki/User_innovation), donde la innovación de productos a menudo proviene de consumidores (ERDDAP™usuarios) , no sólo los productores (ERDDAP™desarrolladores) . A lo largo de los años, la mayoría de las ideas para nuevas características y cambios enERDDAP™han venido de usuarios. Estos usuarios se acreditan a continuación por sus grandes ideas. ¡Gracias&#33; ¡Por favor, mantenga esas grandes sugerencias&#33;

Aquí están los cambios asociados con cada unoERDDAP™liberación.

## Versión 2.26{#version-226} 
 (liberado 2025-02-?) 

*    **Para todos:** 
    * Gran actualización a nuestro sitio de documentación: https://erddap.github.io/
 
Además de la apariencia actualizada hay navegación mejorada, búsqueda, traducción, y debe ser más fácil mantener adelante&#33;

*    **Nuevas características y cambios (para usuarios) :** 
    * Suscripciones yRSSlas actualizaciones deben suceder más fiable para los conjuntos de datos que se actualizan con frecuencia a partir de los cambios de archivos.

*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * La liberación predeterminada requiere/apoyosJavavolver a esta versión es poder hacer fácilmenteJava17 binario compatible.

    * Nueva función para personalizar la información mostrada sobre conjuntos de datos en la interfaz de usuario. Esperamos que esto sea particularmente útil para añadir cosas como citas de conjunto de datos. Para más detalles puede leer[nueva documentación](/docs/server-admin/display-info.md). ¡Gracias a Ayush Singh por la contribución&#33;

    * Metrices adicionales Prometheus. El más grande es:http_request_duration_seconds` que incluye tiempos de respuesta de solicitud descompuestos por: "request_type", "dataset_id", "dataset_type", "file_type", "lang_code", "status_code"
Este formato legible de máquina permitirá una mejor colección de métricas para entender cómo los usuarios están utilizando el servidor.

    * Nueva manera de generar archivos XML ISO19115. Utiliza Apache SIS y es una nueva opción en esta versión. Por favor, habilitarlo y enviar comentarios.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * La UI creará ahora enlaces individuales para cada url en campos como elinfoUrly resumen.

    * Suscripciones yRSSlas actualizaciones deben suceder más fiable para los conjuntos de datos que se actualizan con frecuencia a partir de los cambios de archivos. Si esto causa problemas, por favor contacte a GitHub y desactive la funcionalidad añadiendo la siguiente bandera a su setup.xml.
NO RECOMENDADO
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Las variables de subconjunto ya no se generarán automáticamente para el tipo de conjunto de datos EDDTableDesdeNcCFFiles. Si confías en el comportamiento, puedes (solución preferida) añadir elsubsetVariablesa la definición de conjunto de datos en sudatasets.xml, o añadir la siguiente bandera a su setup.xml. Si usted siente la necesidad de encender esto, por favor contacte a GitHub para que podamos apoyar mejor su caso de uso avanzando.
NO RECOMENDADO
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * El servidor ahora redireccionará solicitudes de documentación (bajo descargas/ que es la documentación que ha sido migrada) al nuevo sitio de documentación. Si es necesario puede deshabilitar esto con una bandera en setup.xml:
NO RECOMENDADO
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Algunos pequeños cambios y correcciones de errores.

*    **ParaERDDAP™Desarrolladores:** 
    * Más mejoras de calidad de código y limpieza de código muerto. Esto incluye pequeñas optimizaciones, mejor manejo de los recursos obsoletos y migrando lejos de los tipos de datos obsoletos largos (como Vector) .

    * Gran refactorización a EDStatic para sacar la mayor parte del config, mensaje y código métrico. También mejor encapsula la inicialización y manejo de los directorios (estos dos últimos tienen más que hacer.) 

    * Mucho progreso hacia una imagen Docker oficialmente apoyada. El plan es finalizar y soltar después delERDDAP™2.26 versión está disponible.

## Versión 2.25{#version-225} 
 (liberado 2024-10-31) 

*    **Nuevas características y cambios (para usuarios) :** 
    * EDDTableDeFiles ahora puede soportar consultas con sólo productos derivados (global, script jexl, o variables) .
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * Versión 2.25 requiereJava21 o más nuevo. Esta es la versión LTS y ha estado disponible durante más de un año.
         
    * El servicio SharedWatch es ahora el predeterminado. Si necesita deshabilitarlo, por favor contacte a Chris. John en noaa.gov para avisarme, así que puedo mejorarlo en versiones futuras y añadir:
        &lt;useSharedWatchService&lt;/useSharedWatchServicio Principal a su setup.xml.
         
    * ElERDDAP™Servlet comenzará ahora en el inicio del servidor. Lo que significa que los conjuntos de datos comenzarán a cargar inmediatamente en lugar de esperar hasta que se haga una solicitud.
         
    * El parámetro removeMVRows en EDDTableDesdeMultidimNcFiles ahora tendrá un efecto. Establecerlo a falso puede acelerar significativamente algunas consultas, pero esto puede no ser adecuado para todos los conjuntos de datos. Para más información vea el[descripción del parámetro](/docs/server-admin/datasets#removemvrows).
         
    * Datasets (EDDTableDesdeNcFiles yEDDGridFromNcFiles) utilizando archivos zarr ahora son compatibles. Deben incluir "zarr" en el archivoNameRegex o pathRegex. Ver el[zarr secion en la documentación de conjuntos de datos](/docs/server-admin/datasets#zarr)para más detalles.
         
    * Nuevo tipo de conjunto de datos, EDDTableDesdeParquetFiles ahora es compatible. Ver el[EDDTableDesdeParquetFiles secion en la documentación de conjuntos de datos](/docs/server-admin/datasets#eddtablefromparquetfiles)para más detalles.
         
    *   [Prometheus metrics](https://prometheus.io/)ya están disponibles en /erddap/metrics.
         
    * Está disponible una nueva implementación de parser XML. Este nuevo parser permite utilizar XInclude endatasets.xml. Gracias a Ayush Singh por la función.
         
    * Nuevo parámetro endatasets.xmlpara controlar emails de actividad inusuales. inusualActividad FailPercent predetermina el valor antiguo del 25%. Gracias a Ayush Singh por la función.
         
    * Nuevo parámetro en setup.xml que controla si los errores de carga de conjunto de datos se muestran en el estado.html página. Por defecto, deshabilitar errores de conjunto de datos en la página de estado, establecer showLoadErrorsOnStatusPage to false:&lt;showLoadErrorsOnStatusPage convenientefalse&lt;/showLoadErrorsOnStatusPage confianza
         
    * Algunos pequeños cambios y correcciones de errores.
         
*    **ParaERDDAP™Desarrolladores:** 
    * Pruebas separadas a unidad e integración (lento) pruebas. También se han habilitado más pruebas y se han realizado menos pruebas.
         
    * Error Prone (algunos cheques todavía discapacitados) y Spot Bugs integrado a través de Maven.
         
    * Base de código completo formateada para que coincida con la Guía de Google Style.
         

## Versión 2.24{#version-224} 
 (publicado 2024-06-07) 

*    **Nuevas características y cambios (para usuarios) :** 
    * Nueva paleta de colores EK80 para conjuntos de datos acústicos disponibles. Gracias a Rob Cermak por esto.
         
    * Arreglar un problema donde EDDTableAggregateRows no mostró rangos adecuados de todos los niños. Gracias a Marco Alba por el informe de corrección y error.
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * DE SEGURIDAD: Google Authentication puede requerir cambios en su CSP.
        
Específicamente, es posible que también necesite añadir https://accounts.google.com/gsi/style to stlye-src and https://accounts.google.com/gsi/ para conectar-src. Para el script-src ahora puedes usar https://accounts.google.com/gsi/client.
 
        
Para más información puede ir a la[Google page](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)sobre configuración CSP.
         
        
    * Nuevo Servicio de Reloj Compartido. Esta es una nueva opción para ver directorios para actualizaciones. Tiene un hilo para cada sistema de archivos en lugar de un hilo por conjunto de datos. Probablemente esto reducirá drásticamente el número de hilos usados para observar cambios. Significa que todos los conjuntos de datos se actualizan juntos en lugar de cada conjunto de datos con su propia frecuencia de actualización. Lo más probable es que esto signifique actualizaciones más frecuentes para la mayoría de los datasets.
        
Para habilitar esta adición&lt;useSharedWatchService&lt;/useSharedWatchServicio Principal a su setup.xml.
        
          
Por favor, intenta esto e informa cómo funciona para ti a Chris. John en Noaa.gov.
         
    * Fijar para nombres de var incorrectos en los registros. Gracias a Ayush Singh por la solución.
         
    * Algunos pequeños cambios y correcciones de errores.
         
*    **Mejoras paraERDDAP™desarrolladores:** 
    * Apoyo para el desarrollo local utilizando Docker. Gracias Matt Hopson y Roje.
         
    * Apoyo al desarrollo local utilizando Jetty y mejoras de documentación. Gracias Micah Wengren.
         
    * Cambios en las pruebas para reducir problemas de plataforma cruzada. Gracias. Shane St. Savage.
         

## Versión 2.23{#version-223} 
 (publicado 2023-02-27) 

Tenga en cuenta que este lanzamiento fue hecho por Bob Simons, mostrando así que él está todavía alrededor y activo durante la transición a Chris John, su sucesor. Marcando con esta versión, todos los cambios de código están siendo hechos por Chis John, a menos que se especifique lo contrario.

*    **Nuevas características y cambios (para usuarios) :** 
    *    (Ninguno)   
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * DE SEGURIDAD: Google Authentication se realiza ahora a través de la nueva biblioteca de servicios de identidad de Google que es parte de "Regístrate con Google". El apoyo de Google para el viejo sistema "Google Sign In" será descontinuado 2023-03-31. Así que si usas Google Authentication en tuERDDAP™instalación, debe actualizar paraERDDAP™v2.23+ antes de entonces. (Bob lamenta el breve aviso. Es culpa de Bob.)   
         
    * IMPROVED: NCCSV es ahora v1.2. El cambio es que los archivos ahora están codificados por UTF-8 (eran ASCII) y así ahora puede incluir cualquier personaje Unicode como es, sin codificación como \\u_hhhh_, aunque eso todavía está permitido.
Al escribir archivos NCCSV,ERDDAP™ahora escribe archivos v1.2.
        ERDDAP™todavía leer archivos NCCSV que siguen la especificación v1.0 y v1.1.
Gracias a Pauline-Chauvet, n-a-t-e y thogar-computer por sugerir esto y hacer las pruebas para asegurar varios programas de hoja de cálculo pueden importar archivos UTF-8. Gracias a Bob Simons por este cambio de código.
         
    * NEW: The status.html web page now has a line near the top which indicates which dataset loadDatasets is currently loading and related statistics, or none if no dataset is being loaded. Esto puede ser muy útilERDDAP™administradores tratando de averiguar por qué cargar Datasets está tardando tanto. Además, el nGridDatasets, nTableDatasets y nTotalDatasets cuenta abajo que ahora son instantáneos (antes, eran al final de la última carga mayor Datasets) .
Este cambio es para Roy Mendelssohn. Gracias a Bob Simons por este cambio de código.
         
    * IMPROVED: GenerarDatasets Xml ahora cambia a CF-1.10 (CF-1.6) en los atributos "Convenciones".
Gracias a Bob Simons por este cambio de código.
         
    * Algunos pequeños cambios y correcciones de errores.
         

## Versión 2.22{#version-222} 
 (publicado 2022-12-08) 

Tenga en cuenta que este lanzamiento fue hecho por Bob Simons, demostrando así que él está todavía alrededor y activo durante la transición a su sucesor.

*    **Nuevas características y cambios (para usuarios) :** 
    *    (Ninguno)   
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * Nada.
         
    * SEGURIDAD FIX: Había un error relacionado con Cross Site Scripting en el código para la selección de idiomas descender. GraciasNOAAEscaneos de seguridad para atrapar esto. Esto demuestra queNOAAla seguridad busca activa y rutinariamente debilidades de seguridad enERDDAP.
         
    * SEGURIDAD: Las muchas bibliotecas utilizadas porERDDAP™fueron actualizados, como de costumbre, como parte de este lanzamiento. Esta vez, esto incluyó la actualización del controlador PostgreSQL (que tenía un fallo de seguridad) a 42.5.1.
         
    * MEJORADO: Más pequeños cambiosERDDAP's sistema de gestión de memoria debe reducir la posibilidad de que una solicitud dada falle debido a la falta de memoria disponible.
         
    * Algunos pequeños cambios y correcciones de errores.
         

## Versión 2.21{#version-221} 
 (publicado 2022-10-09) 

*    **Nuevas características y cambios (para usuarios) :** 
    *    (Ninguno)   
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * Para hacer:Java17, usted no debe utilizar \\-d64 en JAVA\\_OPTS en setenv.bat o setenv.sh. Así que si está ahí, por favor retírelo. Creo que el modo 64 bits está ahora seleccionado cuando descargas una versión de 64 bitsJava. Gracias a Sam Woodman.
         
    * BUG FIX: A veces, el nuevo sistema de correo electrónico trató de iniciar sesión con demasiada frecuencia, lo que hizo que los servidores de Google Email rechazaran todo registro futuro en los intentos. Ahora, el sistema de correo electrónico evita esto y problemas relacionados.
         

## Versión 2.20{#version-220} 
 (liberado 2022-09-30) 

*    **No uses v2.20. Está defectuoso.** Pero los administradores todavía necesitan hacer los elementos TO DO enumerados a continuación al actualizar a v2.21+.
     
*    **Nuevas características y cambios (para usuarios) :** 
    *    (Ninguno)   
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * IMPROVED: Volvimos a habilitar el antiguo sistema de gestión de memoria (Math2.ensureMemoryDisponible) y modificó el nuevo sistema de gestión de memoria (EDStatic.shedThisRequest) trabajar mejor con él. See[Estado de la memoria](/docs/server-admin/additional-information#memory-status)para detalles.
         
    * CHANGED: El predeterminado para&lt;ipAddressMaxRequests confiar dentrodatasets.xmlaumentó de 7 a 15. Está claro que algunos legítimosWMSclientes pueden generar más de 7 solicitudes simultáneas.
         

## Versión 2.19{#version-219} 
 (publicado 2022-09-01) 

*    **No uses v2.19. Está defectuoso.** Pero los administradores todavía necesitan hacer los elementos TO DO enumerados a continuación al actualizar a v2.20+.
     
*    **Nuevas características y cambios (para usuarios) :** 
    * NUEVO: Hay una nueva función lado del servidor,orderByDescendiendo, que funciona comoorderBy, pero se clasifica en orden descendente. Gracias a Adam Leadbetter.
         
    * Ahora, gráficos (pero no mapas) se expandirá para llenar el espacio disponible en el lienzo, es decir, espacio no utilizado por la leyenda. Usted puede obtener gráficos altos, gráficos cuadrados, o gráficos anchos añadiendo y manipulando el &quot; .size=_width_|Parámetro de altura_ (donde el ancho y la altura especifican el tamaño del lienzo, en píxeles) en la URL de solicitud. (Esta no es una opción en la página web de .graph. Tienes que añadirlo a la URL manualmente.) Si no especifica el parámetro &.size, las solicitudes de .smallPng, .png, .largePng, .smallPdf, .pdf y .large.pdf tienen tamaños de tela predefinidos, por lo que su gráfico se expandirá para llenar el espacio disponible, pero por lo general será aproximadamente cuadrado. Gracias a Bob Fleming.
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * Para hacer:ERDDAP™ahoraJava17 y el correspondiente Tomcat 10. Debes seguir elERDDAP™Instrucciones de instalación (o el equivalente, por ejemplo, para Docker) para instalarJava17 y Tomcat 10 y copiar su\\[tomcat\\]/content directorio de su instalación Tomcat 8 en el nuevo\\[tomcat\\]directorio. No hay otros cambios que usted necesita hacer a suERDDAPinstalación relacionada con este cambio. En otras palabras,ERDDAP™funciona como antes.
        
No te olvides de hacer elERDDAP- cambios relacionados con el servidor de Tomcat.xml y context.xml cuando actualizas Tomcat. SeeERDDAP's[Instrucciones de instalación de Tomcat](/docs/server-admin/deploy-install#tomcat).
        
Mi impresión deJava17 es que prefiere más potencia de procesamiento y memoria para aplicaciones más grandes y de larga duración comoERDDAP™, por lo que funciona ligeramente más lento queJava8 con computadoras de baja potencia (por ejemplo, 2 núcleos y memoria RAM mínima) y funciona ligeramente más rápido queJava8 con ordenadores de potencia superior (por ejemplo, 4+ núcleos y RAM abundante) . Así que si ves mal rendimiento, usa programas como Linux[superior](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)para comprobar el uso de recursos y considerar darERDDAP™más recursos, sobre todo más memoria. ¡La memoria es barata&#33; La mayoría de los teléfonos tienen más procesadores y memoria que los servidores que algunos de ustedes están usando para ejecutarERDDAP&#33;
Gracias a Erin Turnbull.
         
        
    * Para hacer: Si usasERDDAP™para acceder a Cassandra, para Cassandra, necesita seguir utilizando la versión deJavaque estabas usando para correr el Cassandra. Sólo cambia aJava17 para ejecutar Tomcat+ERDDAP.
         
    * Para hacer: Recomendado: Si la CPU de su servidor tiene 4 núcleos y 8+ GB de RAM, considere cambiar a estos ajustes en sudatasets.xmlarchivo:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Si su servidor tiene menos recursos, confíe en "1" para ambas configuraciones.
Los sistemas de nThreads paraEDDGridDeFiles y EDDTable DesdeFiles se mejoraron significativamente. Estos cambios llevaron a una mejora de velocidad enorme (por ejemplo, 2X de velocidad cuando nThreads se establece a 2 o más) para las solicitudes más difíciles (cuando un gran número de archivos debe ser procesado para recoger los resultados) . Algunos cambios relacionados de Chris John también darán lugar a una aceleración general a lo largo de todoERDDAP. El código para estos cambios fue contribuido por Chris John. Gracias. ¡Chris&#33;
         
    * WARNING: hyphens indatasetID's son deprecatados y ya no soportan (aunque técnicamente todavía se permite) . Probablemente serán desactivados en la próxima liberación. Si usas hifens, cambia a los subrayados ahora para evitar problemas. Si haces el cambio ahora, es a tu propia velocidad. Si esperas hasta el próximo lanzamiento, estarás en pánico y tendrás que lidiar con ello ese día.
         
    * NUEVO: Ahora, para.htmlTablerespuestas de datos, si los datos en una celda de String contienen datos:imagen/png;base64, seguido de una imagen .png de base64 codificada,ERDDAP™mostrará un icono (para que el usuario pueda ver la imagen si se mueven sobre ella) y botones para guardar el texto o la imagen al portapapeles. Gracias a Marco Alba (que contribuyó con el código) y Bob Simons (que lo modificó ligeramente) .
         
    * NOTICIAS: -NoAñadirStandardNames
Si incluye \\-doNotAddStandardNames como parámetro de línea de comandos cuando se ejecuta genera Datasets Xml, genera Datasets Xml no añadirástandard\\_namea laaddAttributespara cualquier variables distintas de variables llamadas latitud, longitud, altitud, profundidad o tiempo (que tienenstandard\\_names) . Esto puede ser útil si está utilizando la salida de generar Datasets Xml directamente enERDDAP™sin editar la salida, porque genera Datasets Xml suele adivinarstandard\\_nameincorrectamente. (Tenga en cuenta que siempre recomendamos que edite la salida antes de usarlo enERDDAP.) Usando este parámetro tendrá otros efectos relacionados menores porque el conjeturadostandard\\_namea menudo se utiliza para otros fines, por ejemplo, para crear un nuevolong\\_name, y para crear la configuración de colorBar. Gracias a Kevin O'Brien.
         
    * NUEVO: Ahora puedes poner&lt;actualizaciónMaxEvents confianza10&lt;/updateMaxEvents confianza dentrodatasets.xml  (en con los otros ajustes cerca de la parte superior) para cambiar el número máximo de cambios de archivo (default=10) que será procesado por el sistema de actualizaciónEveryNMillis. Un número más grande (¿100?) puede ser útil cuando es muy importante que el conjunto de datos se mantenga siempre actualizado. Ver el[actualizaciónMaxEvents documentación](/docs/server-admin/datasets#updatemaxevents). Gracias a John Maurer.
         
    * NOTICIA: Agregado apoyo a global "real\\_time=true|falso" Atributo String.
Si esto es falso (por defecto) y si el conjunto de datos no utiliza la actualización EveryNMillis,ERDDAP™cache respuestas a solicitudes de tipos de archivos donde el archivo entero debe ser creado antesERDDAP™puede comenzar a enviar la respuesta al usuario y reutilizarlas por hasta 15 minutos (por ejemplo,.nc, .png) .
Si esto se establece a la verdad o si el conjunto de datos utiliza la actualización EveryNMillis,ERDDAP™nunca caché los archivos de respuesta y siempre volverá archivos creados recientemente.
Gracias a John Maurer.
         
    * NOTICIA: Los correos electrónicos se envían ahora en un correo electrónico separadoTread. Esto hace que los conjuntos de datos de carga y otras acciones que generan correos electrónicos más rápido porque loadDatasets no tiene que esperar a que se envíe el correo electrónico, que a veces lleva mucho tiempo. El nuevo sistema puede enviar varios correos electrónicos por sesión de correo electrónico, reduciendo así el número de registros del servidor de correo electrónico y reduciendo el riesgo de fallos porque son demasiado frecuentes. Hay estadísticas para el emailThread on the status.html page and diagnostic messages in log.txt -- look for "emailThread". Tenga en cuenta que un relato de nEmailsPerSession=0, indica problemas, es decir, una sesión de correo electrónico no pudo enviar ningún correo electrónico.
Gracias a Bob Simons.
         
    * CHANGED: Los correos electrónicos se envían ahora con código ligeramente diferente (debido aJava17 y el cambio al emailThread) . Si tiene problemas para enviar correos electrónicos, por favor envíe un correo electrónicoerd.data at noaa.gov.
         
    * NOTICIA: Las acciones de suscripción que "tocar" una URL remota se manejan ahora en un toque separadoTread. Esto hace que los conjuntos de datos de carga y otras acciones que tocan URL más rápido porque loadDatasets no tiene que esperar a que el toque se complete, lo que a veces lleva mucho tiempo. Hay estadísticas para el tactoTexto en el estado.html página y mensajes de diagnóstico en log.txt - buscar "touchThread".
Gracias a Bob Simons.
         
    * NEW: On the status.html page, in the "Major LoadDatasets Time Series", there is a new "shed" column which indicates the number of requests which were shed because currentERDDAP™El uso de memoria era demasiado alto. Las solicitudes que se coloquen devolverán el código de estado HTTP 503 "Servicio disponible". Esas solicitudes no eran necesariamente un problema. Acaban de llegar a un momento ocupado. Esto fue parte de una renovación de cómoERDDAP™trata de alto uso de la memoria.
         
    * NEW: On Unix/Linux computers, there is now an "OS Info" line on the status.html web page with current operating system information including CPU load and Memory use.
         
    * Ahora, cuandoERDDAP™es reiniciado y rápidoRestart=true, EDDTableDeFiles datasets reutilizará subset.ncy distintas.nc. Para algunos conjuntos de datos, esto disminuye mucho el tiempo para cargar el conjunto de datos (por ejemplo, de 60 segundos a 0,3) . Junto con el nuevo correo electrónicoTread and taskThread (véase supra) , esto debería acelerar mucho el reinicioERDDAP™para muchosERDDAP™instalaciones. Gracias a Ben Adams y John Kerfoot.
         
    * CHANGED: Anteriormente, huérfano datasets (datasets that are live inERDDAP™pero no estándatasets.xml) simplemente se señaló sobre el estado. html y en log.txt después de cada carga principalDatasets. Ahora, se eliminan automáticamente deERDDAP™y notado en el estado.html y en log.txt, y correo electrónico Todo. Así que si desea eliminar un conjunto de datos deERDDAP™, ahora todo lo que tienes que hacer es quitar su pedazo de xml endatasets.xmly se eliminará en la siguiente carga principalDatasets. Gracias a Bob Simons.
         
    * CONOCIDO BUG en netcdf-java v5.5.2 y v5.5.3: ElEDDGridDeThredds Opción de catálogo en GenerateDatasets Xml solía trabajar para catálogos de THREDDS que incluyen referencias a conjuntos de datos en catálogos remotos THREDDS. Ahora no lo hace. He reportado el problema a los desarrolladores netcdf-java.
         
    * BUG FIX: Para los usuarios de Docker configurar parámetros setup.xml a través deERDDAP\\__paramName_: para parámetros int y booleanos (por ejemplo, correo electrónico SmtpPort) ,ERDDAP™estaba buscando incorrectamente sólo _paramName_. Ahora busca _ERDDAP\\_paramName_. Gracias a Alessandro De Donno.
         
    * El cambio:ERDDAP™El sistema de pruebas ahora utiliza un sistema automatizado para comprobar que las imágenes de prueba recién creadas son exactamente como se espera. Gracias a Chris John para la sugerencia y Bob Simons para la implementación.
         

## Versión 2.18{#version-218} 
 (publicado 2022-02-23) 

*    **Nuevas características y cambios (para usuarios) :** 
    * NADA
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * BUG FIX:.ncLos archivos no estaban cerrados en algunas circunstancias. Ahora lo son. Gracias a Marco Alba, Roland Schweitzer, John Maurer y otros.
         

## Versión 2.17{#version-217} 
 (publicado 2022-02-16) 

*    **Nuevas características y cambios (para usuarios) :** 
    * BUG FIX: Después de los cambios enorderBysistema hace unos años, Tabledap's Make A Graph no manejaba correctamente muchas consultas que utilizabanorderBy_Xxx_. Ahora sí. Gracias a Maurice Libes.
         
    * Anteriormente,ERDDAP™solicitudes rechazadas para . transparente Png es cuando los valores de latitud y/o longitud fueron parcial o totalmente fuera de rango. (ERDDAP™GitHub Problemas #19, publicado por Rob Fuller - gracias por publicar que Rob) Ahora vuelve píxeles transparentes para cualquier área fuera de rango de la imagen. Esto es útil para muchas aplicaciones cliente. El código cambia para hacer este cambio fue hecho enteramente por Chris John. ¡Muchas gracias, Chris&#33;
         
    * Anteriormente,ERDDAP™rechazaron las solicitudes de cuadrícula donde los valores índices de una dimensión determinada fueron\\[alto: bajo\\]. Ahora hace que esas solicitudes sean válidas intercambiando los valores bajos y altos. Esto resuelve un problema de larga data para los usuarios y para programas externos como xtracto que tuvieron que hacer un seguimiento de los pocos conjuntos de datos que tienen valores de latitud que van desde alto a bajo para hacer petición como\\[ (50) : (20) \\]para que la solicitud en el espacio índice fuera\\[baja: alta\\]. See https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Ahora, una petición como\\[ (20) : (50) \\]para uno de estos conjuntos de datos se interpreta automáticamente como\\[ (50) : (20) \\].
         
    * CHANGED: .esriAscii peticiones ahora activan un cuadro de diálogo "File : Save As" en el navegador del usuario. Gracias a Joel Van Noord.
         
    * BUG FIX: Ahora, si la variable longitud de un conjunto de datos infantil de unEDDGridLonPM180 oEDDGridLon0360 dataset tiene unvalid\\_miny/ovalid\\_maxatributo, se eliminan en elEDDGridLonPM180 oEDDGridDataset Lon0360. Gracias a Roy Mendelssohn.
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * Si hubieras establecido&lt;dataProviderFormActive ratio a false to temporary deal with the XSS vulnerability, please set it back to true.
         
    * SEGURIDAD BUG FIX: Arreglado vulnerabilidad XSS en Formulario de Proveedor de Datos. Gracias a Genaro Contreras Gutiérrez.
         
    * BUG FIX: Cuando una dirctoría AWS S3 tenía más de 10000 archivos,ERDDAP™lanzó un "Error interno". Esto está arreglado. Gracias a Andy Ziegler.
         
    * BUG FIX:EDDGridSideBySide no permitió la variablesourceNames en diferentes conjuntos de datos infantiles para ser el mismo. Ahora sí. Gracias a Joshua Stanford.
         

## Versión 2.16{#version-216} 
 (liberado 2021-12-17) 

*    **Nuevas características y cambios (para usuarios) :** 
    * CHANGES/BUG FIXES: Numerosos pequeños cambios en el sistema de traducción gracias a sugerencias de editores específicos del lenguaje. Gracias a Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian, y Mike Smit.
         
    * ADDED un correcto descargo y atribución para Google Translate, según lo requerido por los términos de Google Translate. Además, el&lt;html etiqueta en el HTML para cada página web ahora identifica correctamente las páginas web no-Inglés como habiendo sido traducida por la máquina. Gracias a Mike Smit.
         
    * BUG FIX: Las páginas web de inicio de sesión están trabajando correctamente con diferentes ajustes de idioma. Gracias a Mike Smit.
         
    * NUEVOorderByFiltro sum. Y nuevo comprobar todo y desactivar todos los botones enEDDGridData Access Form página web. Gracias a la contribución de código de Marco Alba.
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * Si tienes
        &lt;questionMarkImageFile confianzaQuestionMark.jpg&lt;/questionMarkImageFile confianza
en su archivo setup.xml, usted necesita para eliminar toda la etiqueta (recomendado, por lo que el archivo predeterminado se utiliza) o cambiarlo a:
        &lt;questionMarkImageFile confianzaQuestionMark.png&lt;/questionMarkImageFile confianza
         
    * Para que lo sepas,[Adoptium](https://adoptium.net/?variant=openjdk8)ha reemplazado a AdoptOpenJDK como fuente principal/recomendadaJava  (OpenJDK) .
         
    * CHANGE: Los archivos de registro deERDDAP™, GenerarDatasets Xml, y DasDds ahora son UTF-8, no el conjunto de caracteres predeterminados del ordenador. Hice muchas comprobaciones y hice algunos cambios para asegurarme de queERDDAP™siempre especifica el personaje adecuado que se establece al leer o escribir todo tipo de archivos, y ya no (en varios casos) depende del conjunto de caracteres predeterminados del ordenador. Esto corrigió algunos errores y se movió tan cerca como pude al objetivo de utilizar UTF-8 para el mayor número de tipos de archivos posible (por ejemplo, .log, .xml, .html,.json,.jsonYo,.ncHeader) . Tenga en cuenta que muchos tipos de archivos antiguos son necesarios para utilizar ISO-8859-1 (por ejemplo,OPeNDAP.das, .dds, .csv,.tsv,.nc3,.nccsv, .cpt) . Traté de trabajar con el grupo CF y conUnidatapara agregar apoyo a UTF-8 en.nc3 archivos; ambos fueron resistentes.
         
    * NUEVO: Al descargar archivos de AWS S3,ERDDAP's cache Desde el sistema UrlEDDGridDeFiles y EDDTable FromFiles ahora utiliza el nuevo Administrador de Transferencias AWS para descargar archivos a través de trozos paralelos (así, muy rápido.) . El rendimiento objetivo está fijado a 20 Gbps, por archivo, por lo que funciona bien con todos los tipos de instancia AWS, pero especialmente los que tienen un excelente "rendimiento de red". Con este cambioERDDAP's cache FromUrl system now offers comparable speeds to xarray's approach of parallelized downloads of pre-chunked files, but without the need to convert the source files from.ncy.hdfen archivos de rayos X chunked. De hecho,ERDDAP's sistema es mejor si hay una solicitud posterior para leer del mismo archivo, porqueERDDAP™ahora tiene una copia local del archivo. Nuestra comunidad ha pasado años estandarizando.ncy.hdfarchivos. Ahora no tenemos que tirar que todo fuera sólo para obtener buen rendimiento al almacenar datos en AWS S3. Gracias a Rich Signell.
         
    * CAMBIO: searchEngine=Lucene es, por ahora, deprecated. Es un sistema complejo que a menudo produce resultados que son ligeramente diferentes del comportamiento más deseable de la búsquedaEngine=original. Para casi todoERDDAP™instalaciones, los ahorros de tiempo de Lucene no compensan las diferencias de resultados. Por favor use searchEngine=original en su lugar si es posible. Si eso causa problemas, por favor envía un correo electrónico a Bob.
         
    * CAMBIO: La búsqueda de LuceneEngine ahora se comporta más como la búsqueda originalEngine. Ya no hay casos donde lucene piensa que un conjunto de datos coincide y original no. Además, la clasificación de lucene ahora iguala la clasificación original (porque original es ahora siempre usado para calcular los rankings) .
         
    * BUG FIX: Comenzando en una reciente liberación,ERDDAP™dejó de ver más de los primeros 1000 objetos en un cubo AWS S3 dado. Ahora,ERDDAP™de nuevo ve todos los objetos. Gracias a Andy Ziegler.
         
    * BUG FIX: Ahora EDDTableAggregate Las filas eliminan lasactual\\_rangeatributo cada vez que uno o más de los conjuntos de datos del niño nunca conoce sus variables 'actual\\_range  (por ejemplo, EDDTableDesde la base de datos) . Gracias a Erik Geletti.
         

## versión 2.15{#version-215} 
 (liberada 2021-11-19) 

*    **Nuevas características y cambios (para usuarios) :** 
    *   ERDDAP™tiene un nuevo sistema para permitir que el usuario especifique el idioma para ser utilizado para todas las páginas web. SiERDDAP™Se establece la instalación para utilizarla, la lista de idiomas aparecerá en la esquina superior derecha de cada página web.ERDDAP™URL es desde antes de que esta versión siga funcionando y siempre devuelve contenido en inglés, como antes.
        
No todo texto o todas las páginas web fueron traducidos. Hubo limitaciones de tiempo en este proyecto que impidió que Qi y Bob llegaran al 100%.
        
La pregunta obvia es: ¿por qué hicimos tanto esfuerzo en esto cuando Chrome traducirá las páginas web en el-el-foly? La respuesta es: de esta manera, tenemos mucho más control sobre cómo se hace la traducción. Notablemente, hay muchas palabras que no deben traducirse en las páginas web, por ejemplo, los títulos y resúmenes de conjuntos de datos, los nombres de variables, parámetros, unidades y organizaciones. Gran parte del esfuerzo de traducción fue identificar palabras y frases que no deberían traducirse. Además, las traducciones de la máquina tendían a mezclar ciertos tipos de marcado HTML. La gestión de la traducción nos permitió minimizar este problema.
        
El proyecto de traducción fue realizado por Qi Zeng (a Google Summer of Code intern) y Bob Simons usando el servicio web de traducción de Google. Fue un gran proyecto. Gracias. Qi&#33;
        
    * BUG FIX:ERDDAP™Ahora permite que ORCID ID tenga X como último dígito. Gracias a Maurice Libes.
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * Para hacer:
        
        * Necesita hacer algunos cambios relacionados conERDDAP's nuevo sistema para permitir a los usuarios especificar el idioma para las páginas web.
            * En la primera línea de su configuración.xml ydatasets.xmlarchivos, cambiar a: encoding="UTF-8" y cambiar la codificación del documento en su editor de texto por lo que se guarda como un archivo UTF-8. GenerarDatasets Xml ahora asume que eldatasets.xmles un archivo UTF-8.
            * Programadores que compilanERDDAP: TodosERDDAP™Los archivos .java deben ser tratados como archivos UTF-8 por defecto. Es posible que necesite añadir "-encoding UTF-8" a la línea de comando javac. (Lo hice.) 
            * Para habilitar este sistema (recomendado firmemente) , en el&lt;startBodyHtml5 Conf etiqueta que se especifica endatasets.xml, cambiar "clamp&#33;loginInfo;" en "clamp&#33;loginInfo;|&amp; lenguaje;" para que la lista de idiomas aparezca en la esquina superior derecha de cadaERDDAP™página web.
            *   ERDDAP™sólo utiliza el&lt;startBodyHtml5 Conf etiqueta que se especifica endatasets.xmlpara especificar el contenido HTML para el banner en la parte superior de cadaERDDAP™página web, no importa el idioma que el usuario seleccione. Si cambias esa etiqueta para usar
"&EasierAccessToScientificData;"en lugar de "Acceso más fácil a los datos científicos" y
"&BroughtToYouBy;"en vez de "Brought to you by",ERDDAP™utilizará versiones traducidas de esas frases en el banner.
            * Del mismo modo, el nuevo defecto&lt;theShortDescriptionHtml confiar endatasets.xmles
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
Las últimas 3 líneas de contenido son cosas que serán sustituidas con texto traducido. Si conviertes alguno de ellos (en particular ParticularErddap;) o todos ellos a texto explícitodatasets.xml  (que tiene prioridad, si está presente) o mensajes.xml, ese texto aparecerá sin importar el idioma que el usuario seleccione. Esto no es perfecto, pero pensé que pocos administradores querrían editar&lt;theShortDescriptionHtml confiar en 35 diferentes archivos para proporcionar 35 diferentes versiones traducidas de esa etiqueta.
        
          
         
    * CHANGED: Algunos errores se manejan ahora ligeramente de forma diferente y por lo tanto pueden añadirse al relato de "Preguntas fallidas" sobre el estado.html y en el Daily Report Email. Así que esos números pueden ser algo más grandes que antes.
         
    * BUG FIX: GenerarDatasets Xml paraEDDGridLon0360 yEDDGridLonPM180 ahora excluye los conjuntos de datos de origen condatasetID=~.\\*\\_LonPM180" ydatasetID=~.\\*\\_Lon0360", respectivamente.
         

## Versión 2.14{#version-214} 
 (publicado 2021-07-02) 

*    **Nuevas características y cambios (para usuarios) :** 
    *    (ninguno)   
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * NUEVO:EDDGridLon0360 que hace un conjunto de datos redondeado con valores de longitud &gt;=0 y&lt;=360 desde un conjunto de datos redondeado con valores de longitud &gt;=-180 y&lt;=180. Ver el[EDDGridDocumentación de Lon0360](/docs/server-admin/datasets#eddgridlon0360). Gracias a Dale Robinson.
         
    * NUEVO:ERDDAP™Ahora los administradores pueden anular cualquier valor en setup.xml a través de una variable ambiente llamadaERDDAP\\__valueName_ antes de correrERDDAP. Por ejemplo, usoERDDAP\\_baseUrl anula el&lt;baseUrl relación valor. Esto puede ser útil cuando se implementaERDDAP™con un contenedor, ya que puede poner la configuración estándar en setup.xml y luego suministrar ajustes especiales a través de variables ambientales. Si usted suministra información secreta aERDDAP™a través de este método, asegúrese de comprobar que la información permanecerá secreta.ERDDAP™sólo lee las variables de entorno una vez por startup, en el primer segundo de startup, por lo que una manera de utilizar esto es: establecer las variables de entorno, comenzarERDDAP™, espera hastaERDDAP™se inicia, luego desactiva las variables ambientales. Gracias a Marc Portier.
         
    * IMPROVED: Ahora, si algunos archivos en un EDDTable... Dataset de archivos con muchos archivos tienen algunos valores de String muy largos, el conjunto de datos se cargará mucho más rápido y responderá a solicitudes mucho más rápido. Anteriormente,ERDDAP™asignaría mucho espacio para los valores min y max String en los archivos que se almacenan con información de archivo para dichos conjuntos de datos. El archivo resultante fue enorme, causando que fuera escrito y leído lentamente. Gracias a OBIS.
         
    * Ahora,ERDDAP™hace un mejor trabajo de interpretar secuencias de caracteres inusuales e inválidas en archivos CSV. Gracias a OBIS.
         
    * FIX: Después de un año de problemas con Cassandra, finalmente instalé Cassandra (v2) de nuevo y así fue capaz de rehacer las pruebas con Cassandra v2. Así que ahora puedo afirmar con más confianza queERDDAP™trabaja con Cassandra v2 y v3. Gracias a ONC.
         

## Versión 2.12{#version-212} 
 (liberado 2021-05-14) 

*    **Nuevas características y cambios (para usuarios) :** 
    * BUG FIX: Si estás en la lista negra de suscripción, ahora no puedes solicitar una lista de tus suscripciones.
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * TO DO: NUEVO: sistema para limitar automáticamente la capacidad de los usuarios maliciosos y de los usuarios legítimos demasiado agresivos para hacer un gran número de solicitudes simultáneas que degradarían el rendimiento del sistema para otros usuarios. Hay 3 nuevas etiquetas opcionales endatasets.xmlque usted puede / debe añadir justo después&lt;graphBackgroundColor confianza :
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Para más información, véase[ipAddressMaxRequests](/docs/server-admin/datasets#ipaddressmaxrequests).ERDDAP™también ahora imprime el "Número de usuarios únicos (desde el inicio) " on the status.html page.
Gracias a la persona en China atacando miERDDAP™instalación.
         
    * CHANGE to Postgresql driver behaviour: Cuando actualicé el controlador Postgresql, los nombres de las columnas en la lista de tablas generadas por Postgresql y GenerateDatasetsXml regresaron toda la maleta superior, en lugar de toda la maleta inferior, como antes. No sé si eso afectará a otras cosas ya que las bases de datos suelen considerar que esos nombres son insensibles. Mi dataset de prueba todavía funciona correctamente. Pero si tu conjunto de datos deja de funcionar con estoERDDAP™actualización, esta es la posible causa para perseguir primero.
         
    * BUG FIX:ERDDAP™ahora también maneja archivos AWS S3 privados correctamente. Hubo otras mejoras relacionadas con el manejo de archivos AWS S3. Gracias a Michael Gangl y Dylan Pugh.
         
    * NUEVO:EDDGridFromNcFiles yEDDGridFromNcFiles Unpacked ahora puede leer datos de "estructuras" en.nc4 y 4.hdf4 archivos. Para identificar una variable que es de una estructura, la&lt;sourceName■ debe utilizar el formato: _fullStructureName_|_memberName_, por ejemplo grupo1/myStruct|myMember. Gracias a NRL.
         
    * CHANGED: Ahora, si el uso de la memoria actual más esta solicitud es incluso ligeramente alta, conjuntos de griddap nTres para esta solicitud a 1. Así,ERDDAP™conserva la memoria cuando la memoria es escasa. Gracias a la persona en China atacando miERDDAP™instalación.
         
    * NUEVO sistema para monitorizar el número de archivos abiertos (que incluye tomas y otras cosas, no sólo archivos) en Tomcat en computadoras Linux. Si algunos archivos erróneamente nunca se cierran, el número de archivos abiertos puede aumentar hasta que supere el máximo permitido y muchas cosas realmente malas suceden. Así que ahora, en las computadoras Linux (la información no está disponible para Windows) :
        
        * Hay una nueva columna "Open Files" en la extrema derecha del estado.html página web que muestra el porcentaje de archivos máximo abierto. En Windows, sólo muestra "¿?".
        * CuandoERDDAP™genera esa información al final de cada recarga de conjunto de datos principales, se imprimirá al registro. archivo txt:
openFileCount=_current_ of max=_max_ %=_percent_
        * Si el porcentaje es ±50%, se envía un correo electrónico alERDDAP™administrador y el correo electrónico Todo A direcciones de correo electrónico.
        
Para saber más, o si ves este problema en tuERDDAP™, ver[Demasiados archivos abiertos](/docs/server-admin/additional-information#too-many-open-files).
Gracias a la persona en China atacando miERDDAP™instalación.
         
    * NOTICIA: Añadí muchas comprobaciones y manejo de "Demasiados archivos abiertos", por lo que la tarea se detiene y el usuario ve el mensaje de error. Los archivos de datos ya no serán marcados como malos si leerlos resulta en un error "Too many open files".
         
    * NUEVO\\[bigParentDirectory\\]/badFilesFalog directorio:
Si pones un archivo en este directorio con undatasetIDcomo nombre del archivo (el contenido del archivo no importa) ,ERDDAP™eliminar los badFiles.ncarchivo para ese conjunto de datos (si) y volver a cargar el conjunto de datos lo antes posible. Esto causaERDDAP™intentar de nuevo trabajar con los archivos previamente (erróneamente?) marcado como malo. Gracias a Marco Alba.
         
    * CHANGED: Al inicio, si unEDDGridDesde...Files o EDDTableDesde... Dataset de archivos inicialmente tiene 0 archivos en su lista de archivos válidos conocidos (Es un nuevo conjunto de datos.) EntoncesERDDAP™aplaza la carga y establece una bandera para que se cargará ASAP después de la carga mayorDatasets está terminado. Esto acelera el inicio inicial cuando hay nuevos conjuntos de datos.
         
    * CHANGED: ArchivoVisitorDNLS.testAWSS3 () y ArchivoVisitorSubdir.testAWSS3 () ; ahora utilice el AWS v2 (no v1) SDK. Así que ahora el GitERDDAP™distribución ahora incluye todos los archivos necesarios y ya no necesita añadir manualmente el archivo de frasco V1 AWS SDK masivo.
         
    * CHANGED: He cambiado a usar Maven para detectar/recoger dependencias (los archivos .jar en /lib) . El cambio a v2 del SDK AWS necesitó esto. Será necesario para otro código importado en el futuro. Un gran agradecimiento a Kyle Wilcox que proporcionó el pom.xml que creó y utiliza, que resolvió varios problemas para mí.
         
    * CHANGED: El parámetro classpath (-cp) utilizados en GenerateDatasetXml, DasDds y otros programas pequeños que vienen conERDDAP™, y en el consejo a los programadores es ahora mucho más simple y nunca debe cambiar de nuevo ya que se refiere al directorio, no los archivos individuales:
Clases \\-cp;C:\\programas\\\\_tomcat\\lib\\\\servlet-api.jar;lib\\*
         (o ':' en lugar de ';' para Linux y Macs) .
         (Debería haber hecho esto hace años cuando se convirtió en una opción.)   
         
    * NUEVO: GenerarDatasets Xml tiene una nueva opción de utilidad: encontrarDuplicateTime que buscará a través de una colección de redadas.nc  (y conexas) archivos para encontrar archivos con valores de tiempo duplicados. See[encontrarDuplicar Hora](/docs/server-admin/datasets#findduplicatetime)  
         
    * NUEVO:datasets.xmlahora puede incluir un&lt;palettes titulada que anula la&lt;paletas valor etiqueta de mensajes.xml (o revierte al valor de los mensajes.xml si está vacío) . Esto le permite cambiar la lista de paletas disponibles mientrasERDDAP™está corriendo. Además, si tienes un subdirectorio de ficheros cptfiles en elERDDAP™directorio de contenidos,ERDDAP™copiará todos los archivos \\*.cpt en ese directorio en el\\[tomcat\\]/webapps/erddap/WEB-INF/cptfiles directorio cada vezERDDAP™Empieza. Juntos, estos cambios te permiten añadir paletas y tener los cambios persisten cuando instalas una nueva versión deERDDAP. Ver el[documentación de paletas](/docs/server-admin/datasets#palettes)  
Gracias a Jennifer Sevadjian, Melanie Abecassis, y tal vez otras personas de CoastWatch.
         
    * CAMBIO:&lt;slowDownTroubleMillis confía] (/docs/servidor-admin/datasets#slowdowntroublemillis) ahora se utiliza para todas las solicitudes fallidas, no sólo algunos tipos.
         
    * CHANGED: El hilo RunLoadDatasets ahora interrumpe el hilo LoadDatasets en 3/4 LoadDatasets MaxMinutes así que hay más tiempo para que LoadDatasets note la interrupción y la salida con gracia. También hay mensajes de diagnóstico más y mejor para esto.
         
    * CHANGED from the old version of Lucene to v8.7.0.
         
    * CHANGE: Emails sent byERDDAP™ahora aparece con una fuente de ancho fijo.
         
    * CHANGE:EDDGridDeFiles ahora obtiene valores de eje, así como atributos de FIRST|archivo LAST, según se especifica en&lt;metadatosDesde cero. Gracias. (no) a Ken Casey, et al.
         
    * Soporte ADDED para las unidades inválidas "degree\\_North" y "degree\\_Este" que son usadas erróneamente por los archivos recientes (desde 2020-10-01) en la versión 5.3 L3-Collado (L3C) SST datasets (nceiPH53sstd1día y nceiPH53sst1 día) .ERDDAP™ahora puede estandarizarlos a unidades válidas. Gracias. (no) a Ken Casey, et al.
         

## Versión 2.11{#version-211} 
 (publicado 2020-12-04) 

*    **Nuevas características y cambios (para usuarios) :** 
    * BUG FIX: OrderByMean lanzó un NullPointerException si una variable tenía sólo uno de \\_FillValue o desaparecido\\_ Valor definido. Ahora maneja la situación correctamente. Gracias a Marco Alba.
         
    * BUG FIX: Hubo problemas con los archivos de texto ODV creados porERDDAP™en v2.10. Esos problemas están resueltos. Gracias a Shaun Bell.
         
    * BUG FIX: Sólo entra.ERDDAP™v2.10: Si los límites de lat lon fueron especificados en la URL, la caja de fijación no fue dibujada en el mapa mundial. Ahora es otra vez. Gracias a John Maurer.
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * BUG FIX: Sólo entra.ERDDAP™v2.10: Los archivos de script para ArchiveADataset, GenerateDatasets Xml y DasDds no trabajaron porque no tenían los cambios en el ciclista que se agregaron conERDDAP™v2.10. Ahora lo hacen. Gracias a Marco Alba.
         
    * NUEVO: Endatasets.xml, ahora puede tener la etiqueta:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Actualmente, si es verdad (o si la etiqueta está vacía, o si la etiqueta no está en el archivo) , cuando la solicitud de un usuario conduce a un NullPointerException,ERDDAP™enviará el correo electrónico del rastro de la pilaerd.data at noaa.gov  (elERDDAP™equipo de desarrollo) . Esto debe ser seguro y seguro ya que no hay información confidencial (por ejemplo, la solicitudUrl) está incluido en el correo electrónico. Esto debería hacer posible capturar cualquier bicho oscuro, totalmente inesperado que lleve a NullPointerExceptions. De lo contrario, el usuario ve las excepciones, pero elERDDAP™Los desarrolladores no lo hacen, así que no sabemos que hay un problema que necesita ser arreglado.
        
Es posible que esta etiqueta conduzca a otra información de diagnóstico similar que se envía por correo electrónicoerd.data at noaa.goven el futuro. El contenido del correo electrónico siempre será mínimo y relacionado con errores, y no, por ejemplo, información de uso. Gracias a Marco Alba.
         
        
    * CHANGED: Ahora, tipos comunes de archivos comprimidos (.bz2,.gz,.gzip,.tar,.tgz,.z,.zip) también están prohibidos para las solicitudes de byte range. Esto se especifica mediante&lt;extensionsNoRangeRequests confiar en messages.xml.
         
    * CONOCIDO PROBLEMA: Como conERDDAP™2.10,.ncArchivos de ml que intentan cambiar un atributo, no cambie el atributo. Este es un error conocido en netcdf-java que he reportado y dicen que será fijado en la próxima liberación de netcdf-java.
         

## Versión 2.10{#version-210} 
 (liberada 2020-11-05) 

*    **Nuevas características y cambios (para usuarios) :** 
    * NUEVO: El nuevo[Interpolato](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)Conversor interpola los valores de un conjunto de datos rejillado. Como tal, es particularmente útil para los investigadores que trabajan con datos de pista animal. Este convertidor toma en una tabla con columnas de latitud, longitud y hora (y quizás otras columnas) y devuelve una tabla con columnas adicionales con valores interpolados. Así, esto es similar al popular[Xtractomatic](https://coastwatch.pfeg.noaa.gov/xtracto)script creado originalmente por Dave Foley, pero ofrece la ventaja de procesar hasta 100 puntos por solicitud. Gracias a Dave Foley y Jordan Watson (NMFS) .
         
    * IMPROVED: Búsqueda Avanzada es ahora estricta para solicitudes no.html. Ahora lanzará excepciones para solicitudes que tengan errores permanentes (e.g., peticiones donde minLat) o errores temporales (por ejemplo, solicitudes destandard\\_nameeso no existe) . Para .html solicitudes, Búsqueda Avanzada no cambia: como con Google búsquedas, hace sus mejores y silenciosamente soluciona o ignora errores. Gracias a Rich Signell.
         
    * IMPROVED: El mapa en la página Búsqueda Avanzada es ahora más grande (todavía tienes que mirar, pero menos) y significativamente más precisa (pero no perfecto) . Gracias a John Maurer.
         
    * IMPROVED: La configuración de "Máscara de tierra" en las páginas web Make A Graph y la configuración &.land=... en las URLs que solicitan un mapa ahora soporta dos opciones más:
"outline" simplemente dibuja el esquema de la masa de tierra, límites políticos, lagos y ríos.
"off" no dibuja nada.
Ver el[&quot;land=... documentation](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands).
Gracias a John Maurer.
         
    * IMPROVED: Gráficos y mapas creados porERDDAP™ahora puede utilizar tres nuevos tipos de marcadores: Plaza sin fronteras, Círculo sin fronteras, Triángulo sin fronteras. El código para esto fue contribuido por Marco Alba de ETT / EMODnet Física. Gracias a Marco Alba.
         
    * NUEVO:"files"sistema ahora soporta Respuestas del tipo de archivo (Csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsvo.xhtml.) , por ejemplo,[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv).
Gracias a Kyle Wilcox.
         
    * IMPROVED: Las URL generadas cuando un usuario utiliza un formulario de acceso a datos (HTML) o un Make-A-Graph (.graph) web page now properly percent-encode the characters\\[y\\]. Esto hace que las URL sean un poco más difíciles de leer para los humanos, pero es mejor desde un punto de vista de seguridad web. Los administradores ahora tienen la opción de establecer relaxedQueryChars= '\\[\\]|' en el archivo Tomcat server.xml (menos seguro) o no (más seguro) .
Gracias a Antoine Queric, Dominic Fuller-Rowell y otros.
         
    * NOTICIA: Si una solicitud a un conjunto de datos EDDTable incluye &gt; Variables Donde (_attribute Nombre, atributo Value_) ,ERDDAP™añadirá todas las variables que tienen _attribute Nombre=attributo Valor_ a la lista de variables solicitadas.
Ver el[&gt; Variables Donde documentación](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere). Gracias a Aurelie Briand, et al.
         
    * CHANGED:ERDDAP™ahora rechaza las solicitudes de rango byte a /files/.nco.hdfarchivos. No trate de conectarse a distancia.nco.hdfarchivos como si fueran archivos locales. Es terriblemente ineficiente y a menudo causa otros problemas. En su lugar:
        * Uso(OPeN)DAPsoftware cliente para conectarseERDDAP'sDAPservicios para este conjunto de datos (que tienen /griddap / o /tabledap/ en la URL) . Eso es lo queDAPes para.
        * Utilice el formulario de acceso de datos del conjunto para solicitar un subconjunto de datos.
        * Si necesita todo el archivo o acceso repetido durante un largo período de tiempo, usecurl,wget, o su navegador para descargar el archivo completo, a continuación, acceda a los datos de su copia local del archivo.
             
    * IMPROVED: the .odv Se ha reescrito la opción de salida Txt para apoyar la nueva versión deODV .txtarchivos y para apoyar la representación adecuada de la trayectoria, las series de tiempo y los datos de perfil.
         
    * IMPROVED: Ahora, los términos de búsqueda en citas dobles se interpretan como una cadena json, por lo que pueden tener \\ caracteres codificados. Entre otras cosas, esto le permite buscar un partido exacto para un atributo, por ejemplo, "institución=NOAA\\n"no coincidirá con un conjunto de datos con la institución=NOAA NMFS. Gracias a Dan Nowacki.
         
    * IMPROVED: En lugares adicionales, números de puntos flotantes (especialmente flotantes convertidos a dobles) ahora aparece como una versión ligeramente más redondeada del número en lugares adicionales, por ejemplo, un flotador previamente mostrado como un doble como 32.27998779296875, podría ahora aparecer como 32.28. Gracias a Kyle Wilcox.
         
    * BUG FIX: los archivos de audio no firmados fueron leídos ligeramente incorrectamente. Ahora se leen correctamente.
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * La primera vez que corresERDDAP™v2.10, algunos conjuntos de datos basados en archivos de datos locales se cargarán **muy bien.** lentamenteERDDAP™necesita recrear su base de datos de información de archivos. Después de la lenta recarga inicial, se cargarán rápidamente, como antes. Por favor sea paciente.
         
    * Cosas que debes hacer:
        * Cuando se ejecuta por primera vez v2.10, algunos datasets pueden no cargar porqueERDDAP™Ahora es más estricto con algunos metadatos. Como antes,ERDDAP™te enviará un informe diario cuando se cargue primero. Eso incluirá los mensajes de error para cada uno de los conjuntos de datos que no cargaron. Lea los mensajes de error para averiguar los problemas. En la mayoría de los casos, sólo tiene que hacer un pequeño cambio en los metadatos del conjunto de datos para resolver el problema.
             
        * Indatasets.xml, búsqueda&lt;sourceName= (nota'='signo, que identifica un[valor fijosourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) . Para la mayoríaERDDAP™configuraciones, son raras. Si alguno de los valores después'='son cuerdas (no números) Ahora debes encerrar la cuerda en citas dobles. Por ejemplo,
Antes:&lt;sourceName&gt;=KZ401&lt;/sourceName■
Después:&lt;sourceName&gt;="KZ401"&lt;/sourceName■
             
        * NUEVO: Hay un nuevo ajuste opcional en setup.xml,&lt;defaultAccesibleViaFiles confianza, que establece el valor predeterminado&lt;accesibleViaFiles confiar para cada uno de los conjuntos de datos. El predeterminado de esta nueva etiqueta es falso, que imita la anteriorERDDAP™comportamiento. Este ajuste de nivel inferior puede ser revocado por un conjunto de datos dado&lt;accesibleViaFiles confiar ajuste.
            
RECOMENDADO (porque hay usuarios que quieren esto) :
Si quieres hacer todo EDD... Desde Files datasets accesibles a través del sistema de archivos, entonces
            
            1. Añadir esta etiqueta a tu archivo setup.xml:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Facultativo) Quitar todo
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
dentrodatasets.xmlya que el defecto es ahora cierto.
                 
        * Atributos \\_FillValue:
            ERDDAP™usada para tener un valor predeterminado \\_FillValue para todas las variables del entero: el valor máximo del tipo de datos (por ejemplo, 127 para variables byte) . Ahora no lo hace. Para evitar que estos valores se muestren como valores de datos (valores no perdidos) , usted necesita indicar explícitamente estos atributos \\_FillValue. Desde ahora, cada vez que empiezasERDDAP™, enviará al administrador un correo electrónico con una tabla .csv con una lista de variables fuente entero que no tienen \\_FillValue omissing\\_valueatributos, y los nuevos atributos \\_FillValue sugeridos. See[Añadir \\_Fill Valor Atributos](/docs/server-admin/datasets#add-_fillvalue-attributes)para más información e instrucciones.
             
        * Si compilasERDDAP™, usted necesita modificar el parámetro classpath en las líneas de comando javac para añadir una referencia a estas nuevas tarras: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar .
             
    * CHANGED: Tomcat 9 es ahora la versión recomendada de Tomcat paraERDDAP. La última versión de Tomcat 8.5+ también está bien por ahora. Nos limpiamos.ERDDAP's[Instrucciones de instalación de Tomcat](/docs/server-admin/deploy-install#tomcat).
        
La última versión deJava8 (noJava9, 10, 11, ...) desde[AdoptOpenJDK](https://adoptopenjdk.net/)sigue siendo la versión recomendadaJavaparaERDDAP.Java8 tiene soporte a largo plazo de AdoptOpenJDK por lo que sigue siendo seguro de usar, pero recuerde obtener la última versión de ella periódicamente por razones de seguridad.
        
    * NOTICIA: Fuentes de script / Variables derivadas en conjuntos de datos tabulares
EDDTableDeFiles, EDDTableDesdeDatabase y EDDTableDeFileNames, los conjuntos de datos pueden incluir expresiones y scripts en lossourceName. Esto le permite hacer nuevas variables basadas en variables existentes en los archivos fuente. El cálculo para una nueva variable dada se hace dentro de una fila de los resultados, repetidamente para todas las filas. Por ejemplo, para hacer una variable longitud con valores en el rango -180 - 180° de una variable con valores en el rango 0 - 360°:
        &lt;sourceName&gt;=Math2.anglePM180 (row.columnDouble ("lon") ) &lt;/sourceName■
Para más detalles, consulte[Fuentes de script](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
Gracias a Bob Simons (que planeó esto antesERDDAP™v1.0 y finalmente encontró una manera de implementarlo) , Kevin O'Brien, Roland Schweitzer, John Maurer, y la biblioteca Apache JEXL por hacer la parte muy dura (y hacerlo bien) .
         
    * NOTICIA: Tipos de datos enteros no asignados (ubyte, ushort, uint, ulong) están ahora apoyados. Tenga en cuenta que muchos tipos de archivos (Por ejemplo, .das, .dds,.nc3) no apoyen todos estos nuevos tipos de datos. Ver el[Datos Documentación de tipo](/docs/server-admin/datasets#data-types)para detalles sobre cómoERDDAP™trata de estas diferencias. Notablemente, desde(OPeN)DAP, en particular la respuesta .dds, no soporta los bytes firmados, largos o ulongs, es posible que desee utilizarERDDAP's representación tabular de .das y .das como se ve enhttp.../erddap/ **info** /datasetID_.html página web (por ejemplo,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) que también puede obtener en otros tipos de archivos o.nccsvRespuesta a los metadatos (por ejemplo,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) , ambos soportan todos los tipos de datos en todas las situaciones.
        
ADVERTENCIA: Para conjuntos de datos que son afectados por este cambio, es posible que vea problemas con el conjunto de datos porque los datos queERDDAP™lecturas de la fuente pueden ser diferentes (por ejemplo, las variables que anteriormente se leen como números enteros firmados ahora pueden leerse como números enteros no firmados) . Los problemas resultantes incluyen: nuevos archivos que no se añaden al conjunto de datos y/o errores cuando intenta acceder a los datos. Si un conjunto de datos tiene problemas, lo primero que hay que intentar es[set a hard Bandera](/docs/server-admin/additional-information#hard-flag)para el conjunto de datos. Si eso no resuelve el problema, entonces tienes que mirar el registro. txt para ver los mensajes de error, profundizar en eldatasets.xmlpara el conjunto de datos, y/o tal vez volver a generarDatasets.xml para el conjunto de datos.
Gracias a netcdf-java 5.x (que forzó la cuestión) y el próximo CF 1.9.
        
    * Ahora hay[mejor documentación/dispositivo](/docs/server-admin/datasets#s3-buckets)para crear un conjunto de datos de archivos en cubos AWS S3. Gracias a Micah Wengren.
         
    * CHANGED: Hay varios cambios relacionados con el"files"sistema.
        * El código para manejar esto fue reescrito para ser usable por más clases.
             
        * NOTICIA: Las solicitudes de usuario para los listados de directorios pueden solicitar ahora que la respuesta sea uno de los tipos de tablas simples estándar mediante la extensión de archivo deseada: .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsvo.xhtml). Por ejemplo,
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
Gracias a Kyle Wilcox y Shane St Savage.
             
        * Ahora, Generar Datasets Xml no incluirá un&lt;accesibleEtiquetaViaFiles confianza en la salida. La hipótesis es que el conjunto de datos dependerá del valor del nuevo&lt;defaultAccesibleViaFiles tag en setup.xml. See[accesible ViaFiles](/docs/server-admin/datasets#accessibleviafiles).
             
        * IMPROVED: Los tipos adicionales de conjunto de datos ahora soportan el acceso ViaFiles:EDDGridSideBySide,EDDGridAggregateExistingDimension,EDDGridFromErddap, EDDTableDesdeErddap,EDDGridFromEDDTable, EDDTableEDDGrid, yEDDGridDe Etopo. Para ello, los archivos de un conjunto de datos remoto/niños dado sólo serán accesibles si tanto el padre como el conjunto de datos remoto/niños tienen acceso ViaFiles a la verdad (tal vez a través de&lt;defaultAccesibleViaFiles confiar). Gracias a Damian Smyth y Rob Fuller.
             
        * TO DO / RECOMENDACIÓN: Recomendamos que todos los conjuntos de datos relevantes sean accesibles a través del sistema de archivos estableciendo&lt;defaultAccessibleViaFiles confiar a true en setup.xml porque hay un grupo de usuarios para los cuales esta es la forma preferida de obtener los datos. Entre otras razones, las"files"sistema hace fácil para los usuarios ver qué archivos están disponibles y cuándo cambiaron por última vez, por lo que es fácil para un usuario mantener su propia copia de todo el conjunto de datos. Si generalmente no desea hacer que los conjuntos de datos sean accesibles a través del sistema de archivos, establece&lt;defaultAccesibleViaFiles confiar a false. En cualquier caso, sólo use&lt;accesibleViaFiles confía para los pocos conjuntos de datos que son excepciones a la política general establecida por&lt;defaultAccesibleViaFiles (por ejemplo, cuando el conjunto de datos utiliza.ncarchivos ml, que no son realmente útiles para los usuarios) .
             
    * IMPROVED: Ahora, si un conjunto de datos fuente tiene información CF grid\\_mapping, generar Datasets Xml para conjuntos de datos redondeados añadirá la información a global&lt;addAtts monedas, y la información se añadirá a global&lt;sourceAtts confía cada vez que se leen datos del archivo. La información aparecerá en los atributos globales del conjunto de datos como un conjunto de atributos con la red de prefijo\\_mapping\\_ .
         
    * IMPROVED: Apoyo para grupos al leer.nc4 (y en cierta medida.hdf5) archivos. Generalmente, unERDDAP™dataset se construirá a partir de las variables de uno de los grupos del archivo. Además, GenerarDatasets Xml paraEDDGridFromNcFiles yEDDGridFromNcFiles Unpacked ahora pide un "grupo" (por ejemplo, "" para cualquier / todos los grupos, "someGroup", "someGroup/someSubGroup", o "\\[root\\]"por sólo el grupo raíz) . Gracias a Charles Carleton y Jessica Hausman.
         
    * IMPROVED: GenerarDatasets Xml paraEDDGridFromNcFiles yEDDGridFromNcFiles Unpacked ahora soporta un parámetro opcional "DimensionesCSV" que le permite especificar los nombres de origen de las dimensiones que desea que este conjunto de datos use. Utilice "" para obtener las variables que utilizan las más dimensiones, como antes. Además, un pequeño fallo relacionado que ocurrió con este tipo de archivo ahora está fijo. Gracias a Sujal Manandhar.
         
    * BUG FIX: GenerarDatasets Xml ahora lista correctamente "EDDTableDesde JsonlCSVFiles" (no "EDDTableDesde JsonlCSV") como una de las opciones de EDDType. Gracias a Andy Ziegler.
         
    * MEJORADO:EDDGridFromNcFiles Unpacked now standardizes "units" atributos a udunits estándar/canónico (el mismo método que el convertidor de Unidades) . Por ejemplo,"meter per second","meters/second","m.s^-1", y"m s-1"todos se vuelven"m s-1". Gracias a Andy Ziegler.
        
Advertencia: Es posible que esto cause problemas para algunos conjuntos de datos existentes (por ejemplo, hacer que los archivos nuevos sean etiquetados "malo") . Si es así,[set a hard Bandera](/docs/server-admin/additional-information#hard-flag)para el conjunto de datos para que todos los archivos fuente sean releídos con el nuevo sistema.
        
    * IMPROVED: Ahora, una variable&lt;sourceNamePuede especificar un valor fijo de =NaN y la variable puede tener unactual\\_rangeatributo que especifica un rango finito. Esto a veces es útil para que un conjunto de datos (notablemente un conjunto de datos EDDTableDesdeFileNames) puede tener una variable (s)   (por ejemplo, latitud, longitud, tiempo) con valores fijos de NaN, pero con una validezactual\\_range  (como establecido por el atributo) . Entonces, en Búsqueda Avanzada un usuario puede buscar conjuntos de datos que tengan datos en una latitud específica, longitud, rango de tiempo y este conjunto de datos será capaz de decir que tiene datos relevantes (aunque todas las filas reales de datos mostrarán NaN) . Ver el[documentación de valor fijo](/docs/server-admin/datasets#fixed-value-sourcenames).
Gracias a Mathew Biddle.
         
    * NUEVO: Ahora, eldatasets.xmlpara un EDDTableDesdeAsciiFiles o EDDTableDesdeColumnarAsciiLos dataset pueden incluir una etiqueta que diceERDDAP™ignorar todas las líneas en la parte superior del archivo hasta e incluyendo la línea que coincide con la expresión regular especificada. Por ejemplo,
        &lt;skipHeaderToRegex confía\\\\*\\\*\\\*Fin de Header.\\*&lt;/skipHeaderToRegex confía
ignorará todas las líneas hasta e incluyendo una línea que comienza con "\\*\\*\\* END OF HEADER". Verás...&lt;skipHeaderToRegex titulada documentation] (/docs/servidor-admin/datasets#skipheadertoregex) .
Gracias a Eli Hunter
         
    * NUEVO: Ahora, eldatasets.xmlpara un EDDTableDesdeAsciiFiles o EDDTableDesdeColumnarAsciiFilesdataset puede incluir una etiqueta que diceERDDAP™ignorar todas las líneas en el archivo que coinciden con la expresión regular especificada. Por ejemplo,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

saltará todas las líneas que comienzan con "#". Verás...&lt;skipLinesRegex documentación] (/docs/servidor-admin/datasets#skiplinesregex) .
Gracias a Eli Hunter.
         
    * NOTICIA:datasets.xmlpara cualquier conjunto de datos EDDTable ahora puede incluir &gt; Variables Donde (_attributeNamesCSV_) . Si lo hace,ERDDAP™añadirá un widget para cada atributo especificado Nombres al formulario de acceso de datos del conjunto de datos (.html página web) para que sea fácil para los usuarios añadir Variables Donde (_attribute Nombre, atributo Value_) a la solicitud.
Ver el[&gt; Variables Donde documentación](/docs/server-admin/datasets#addvariableswhere).
Gracias a Aurelie Briand, et al.
         
    * NUEVO Third-Party Tool:ERDDAP- No.
        ERDDAP-lint es un programa de Rob Fuller y Adam Leadbetter del Instituto Marino Irlandés que usted puede utilizar para mejorar los metadatos de suERDDAP™Datasets.ERDDAP-incluye "contiene reglas y una simple aplicación web estática para realizar algunas pruebas de verificación contra suERDDAP™servidor. Todas las pruebas se ejecutan en el navegador web." Como el[Herramienta Unix/Linux lint](https://en.wikipedia.org/wiki/Lint_(software)), puede editar las reglas existentes o añadir nuevas reglas. See[ERDDAP- No.](https://github.com/IrishMarineInstitute/erddap-lint)para más información.
        
Esta herramienta es especialmente útil para conjuntos de datos que creaste hace algún tiempo y ahora quieres actualizar tus preferencias de metadatos actuales. Por ejemplo, versiones tempranas de GenerateDatasets Xml no puso ningún esfuerzo en crear globalcreator\\_name,creator\\_email, creador\\_tipo, ocreator\\_urlmetadatos. Podrías usarERDDAP- Insinúa identificar los conjuntos de datos que carecen de esos atributos de metadatos.
        
Gracias a Rob y Adam por crear esta herramienta y ponerla a disposición de laERDDAP™comunidad.
        
    * NUEVO: Ahora está bien si algunos de los archivos en unEDDGridFromFiles dataset no tiene todas las variables del conjunto de datos. Los archivos se incluirán como si tuvieran las variables (con todos los valores perdidos) .
Gracias a Dale Robinson y Doug Latornell.
         
    * NOTICIA: Hay nuevas estadísticas de uso en el archivo de registro y en el Daily Report para ayudar a los administradores a identificar a los usuarios que están causando problemas de memoria. Las estadísticas se llaman "OutOfMemory (Tamaño del rayo) "Fuera de la memoria (Demasiado grande) ", y "Fuera de la memoria (Demasiado grande) ". Muestran las direcciones IP de los usuarios que hicieron solicitudes en estas categorías y el número de solicitudes que hicieron. Si no hubo solicitudes problemáticas, estas estadísticas no aparecerán. "Fuera de la memoria (Tamaño del rayo) y "Fuera de la memoria" (Demasiado grande) "Las solicitudes generalmente no son un problema porque las solicitudes eran tan grandes queERDDAP™los pilló rápidamente y devolvió un mensaje de error. "Fuera de la memoria (Demasiado grande) "las solicitudes son más peligrosas porqueERDDAP™hizo algún esfuerzo antes de darse cuenta que no había suficiente memoria disponible actualmente para manejar la solicitud (aunque el problema puede ser otro tipo de solicitudes antes de estas solicitudes) .
        
También hay nuevas estadísticas llamadas "Large Request, IP address" que muestran las direcciones IP de los usuarios que hicieron grandes solicitudes (en la actualidad.ncficheros 1GB) .
        
También, la tabla de la serie de tiempo sobre el estado.html página ahora incluye una columna "memFail" que muestra el número de solicitudes que fallaron con "OutOfMemory (Demasiado grande) " errores desde los últimos principales Datasets de carga. Cualquier número que no sea 0 aquí es al menos alguna causa de preocupación.
Gracias a Bob Simons.
        
    * NOTICIA: La nueva versión deHyraxmuestra listados del directorio de manera diferente que antes.ERDDAP™ahora puede leer los listados antiguos y nuevos directorios.
         
    * NOTICIA: Recargas de conjunto de datos y respuestas del usuario que llevan √10 segundos para terminar (con éxito o sin éxito) están marcados con " (¡10&#33;) ". Por lo tanto, puede buscar el archivo log.txt para esta frase para encontrar los conjuntos de datos que fueron lentos para recargar o el número de solicitud de las solicitudes que fueron lentas para terminar. A continuación, puede mirar más alto en el archivo log.txt para ver cuál era el problema del conjunto de datos o cuál era la solicitud del usuario y quién era. Estas cargas lentas de conjunto de datos y las solicitudes de los usuarios a veces están imponiéndoseERDDAP. Así que saber más sobre estas solicitudes puede ayudarle a identificar y resolver problemas.
    * IMPROVED: Al validar un conjunto de datos CF DSG,ERDDAP™ahora asegura que las variables con atributos cf\\_role están en la lista correspondiente cdm\\_...\\_variables y no están en otras listas cdm\\_________variables. Por ejemplo, si un timeseriesProfile dataset tiene una variable "station\\_id" que tiene el atributo cf\\_role=timeseries\\_id, entonces "station\\_id" debe estar en la lista cf\\_timeseries\\_variables, pero no debe estar en la lista cf\\_profile\\_variables.
Gracias a Micah Wengren.
         
    * IMPROVED: 'Simplify' es ahora más rápido, utiliza menos memoria, y puede regresar LongArray. GraciasUnidata.
         
    * IMPROVED: quickRestart ahora es significativamente más rápido para EDDTable (nc-related) Archivos (excepto EDDTableDesdeNcCFFiles y EDDTableDesdeInvalidCRAFiles) porque hacer Se prevé (y otro lugar) ahora sólo lee los metadatos del archivo de muestra en lugar de leer todos los datos. Gracias a Jessica Austin.
         
    * IMPROVED: Ahora hay soporte para cadenas de tiempo con precisión mayor que al milisegunda si los dígitos adicionales son todos 0's, por ejemplo, "2020-05-22T01:02:03.456000Z". Gracias a Yibo Jiang.
         
    * IMPROVED: GenerarDatasetsXml's EDD.suggestDestinationName solía quitar '(' y todo después. Ahora se quita (.\\*) sólo si ese es el final delsourceName. Ahora también elimina\\[.\\*\\]sólo si ese es el fin delsourceName. Gracias a Julien Paul.
         
    * IMPROVED: GenerarDatasets Xml ahora hace la variabledestinationNames único por añadido \\_2, \\_3, ..., según sea necesario. Gracias a Julien Paul.
         
    * IMPROVED: Cuando Calendar2.parseDateTime pars dd, hh, o HH, el primer 'digit' puede ahora ser un espacio.
    * CONOCIDO PROBLEMA: Empezando conERDDAP™2.10,.ncArchivos de ml que intentan cambiar un atributo, no cambie el atributo. Este es un error conocido en netcdf-java que he reportado y dicen que será fijado en la próxima liberación de netcdf-java.
         
    * BROKEN LINKS FIX: Hice un sistema adecuado para la prueba de enlaces rotos enERDDAP™páginas web, así que ahora debe haber muy pocos enlaces rotos (al menos a partir de cada fecha de lanzamiento - nuevos enlaces rotos surgen a menudo) .
         
    * BUG FIX: EDDTableDesdeHtpGet falló con ciertos tipos de solicitudes. Ahora no lo hace. Gracias a Emma en BODC.
         
    * BUG FIX: Para tramitar algunas solicitudes, EDDTable hizo un archivo temporal para cada variable solicitada, con un nombre de archivo que termina en el nombre de la variable. Si el nombre de la variable era también un tipo de compresión (por ejemplo, .Z) ,ERDDAPlo intentaría (y fracasar) para descomprimir el archivo temporal. Ahora los nombres de archivos temporales terminan en ".temp". Gracias a Mathew Biddle.
         
    * BUG FIX: GenerarDatasetsXml y Calendario2.convertToJavaFecha El formato ahora es mucho menos probable que haga un cambio incorrecto al intentar fijar un formato de fecha posiblemente inválido. Notablemente, no se modificará el formato dateTime auto-sugerido. Gracias a Mathew Biddle.
         
    * BUG FIX: Si hubo un error al obtener contenido de una URL remota, y si el contenido de errorStream está comprimido,ERDDAP™ahora correctamente descomprime el mensaje de error. Gracias a Bob Simons.
         
    * BUG FIX:&lt;SubscribeToRemoteErddapDatasetilo no estaba siendo aplicado cuando el EDD... FromErddap dataset fue un conjunto de datos infantil. Ahora lo es. Gracias a Chris Romsos.
         
    * BUG FIX: GenerarDatasets Xml ya no piensa que un nombre variable fuente que empieza con "latín" puede ser latitud. Gracias a Vincent Luzzo.
         
    * BUG FIX: Ahora, un OutOfMemoryError mientras lee un archivo de datos al procesar la solicitud de un usuario no es una razón para agregar un archivo a la lista de BadFiles. Gracias a Bob Simons.
         

## Versión 2.02{#version-202} 
 (publicado 2019-08-21) 

*    **Nuevas características y cambios (para usuarios) :** 
    * NOTICIA: Ahora hay dos maneras de buscar conjuntos de datos en múltiplesERDDAPs. Trabajan ligeramente de forma diferente y tienen diferentes interfaces y opciones.
        
        *   [SearchMultipleERDDAPs.html](/SearchMultipleERDDAPs.html)de Bob Simons/NOAA NMFS SWFSC ERD.
        *   [ http://erddap.com ](http://erddap.com)de Rob Fuller/The Marine Institute of Ireland.
        
Gracias a Tylar Murray por la solicitud original.
         
    * IMPROVED: a request to the"files"sistema para descargar un archivo que está en realidad en un sitio remoto (por ejemplo, AWS S3) ahora conduce a una redireccion, por lo que el usuario realmente descargar los datos de la fuente, en lugar de utilizarERDDAP™como intermediario. Gracias a Andy Ziegler yNOAA.
         
    * NOTICIA: Como ejemplo de las nuevas características relacionadas con AWS S3, y para facilitar a cualquiera navegar y descargar archivos de cubos AWS S3, hemos creado
        [~110 conjuntos de datos de muestra](https://registry.opendata.aws/)que permite a cualquiera navegar por el contenido de casi todos los
        [Cubos de datos abiertos AWS S3](https://registry.opendata.aws/). Si hace clic en"files"enlace para cualquiera de esos conjuntos de datos de muestra, puede navegar por el árbol de directorios y archivos en ese cubo S3. Debido a la forma en que funcionan estos conjuntos de datos, estos listados de directorios siempre están perfectamente actualizados porqueERDDAP™los pone en el vuelo. Si hace clic en el árbol del directorio a un nombre de archivo real y haga clic en el nombre del archivo,ERDDAP™redirigirá su solicitud a AWS S3 para que pueda descargar el archivo directamente desde AWS.ERDDAP™administradores pueden
        [leer direcciones para cómo hacer esto para otros cubos S3](/docs/server-admin/datasets#working-with-aws-s3-files). Gracias a Andy Ziegler yNOAA.
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * Cosas que necesitas hacer: ninguna
         
    * MEJORADO:ERDDAP's método de almacenar arrays de cadenas (StringArray) ahora es mucho más eficiente en la memoria. String Los rayos se usan en todas partesERDDAP™, en particular al leer archivos de datos tabular ASCII. Además, otros cambios hacen que los archivos de datos tabulares CSV/TSV/SSV ASCII, ASCII columnar y jsonlCSV sean más rápidos y mucho más eficientes en la memoria. El resultado es: para un archivo de prueba de datos ASCII de 764 MB (pero comprimido a 52 MB.gzarchivo) con 3,503,266 hileras y 33 columnas, el uso máximo de la memoria pasó de 10 GB a 0.6GB (en el pico) . El tiempo para leerlo pasó de ~7 minutos (pero varía mucho con cuánto memoria física está en el ordenador) hasta ~36 segundos (incluidos 10 para simplificar () que sólo es utilizado por GenerateDatasets Xml) . Muchos otros lugaresERDDAP™se beneficiará de esta mayor eficiencia de memoria. Gracias a Tylar Murray y Mathew Biddle.
        
He explorado una solución diferente (cadenas de almacenamiento en StringArray como matriz de byte UTF-8) . Eso reduce el uso de la memoria otro ~33%, pero a costa de ~33% desaceleración. Comparado con el sistema que se utiliza ahora, eso parecía un mal intercambio. Es más fácil dar un ordenador más memoria (comprar más memoria para ~$200) que para hacerlo más rápido (comprar un ordenador completamente nuevo) .
        
Si es conveniente, sigue siendo una buena idea dividir enormes archivos de datos tabulares en varios archivos más pequeños basados en algunos criterios comostationIDy/o tiempo.ERDDAP™a menudo sólo tendrá que abrir uno de los pequeños archivos en respuesta a la solicitud de un usuario, y así poder responder mucho más rápido.
        
    * Ahora hay[ERDDAP™AWS S3 documentation](/docs/server-admin/datasets#working-with-aws-s3-files), que describe cómo conseguirERDDAP™trabajar con archivos de datos en cubos AWS S3.
También,ERDDAP™ahora utiliza nuevas características en el AWS S3JavaAPI.
También,ERDDAP™ahora permite que las URLs AWS S3 incluyan caracteres adicionales (período, hifeno, subrayar) en nombres de cubo.
También,ERDDAP™ahora requiere que las URLs de cubo AWS S3 sean identificadas de una manera específica:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
donde el prefijo es opcional.
Gracias a Andy Ziegler yNOAA.
         
    * IMPROVED: GenerarDatasets Xml ahora trata más comúnmissing\\_values stand-ins como valores perdidos y por lo tanto es más probable convertir una columna a un tipo de datos numérico. Además, PrimitiveArray.simplify () ahora registra qué valor de datos particular le causó tratar una columna dada como una columna de cadenas. Gracias a Mathew Biddle.
         
    * MEJORADO:&lt;requestBlacklist Ahora apoya .\\*.\\*  (o :\\*:\\*para IPv6) al final de las direcciones IP para que pueda anotar un trozo más grande de direcciones IP, por ejemplo, 110.52.\\*.\\*  (China Unicom Tianjin) . Ver la documentación para [&lt;requestBlacklist confiar] (/docs/servidor-admin/datasets#requestblacklist) Gracias a China Unicom y China Telecom.
         
    * IMPROVED: Si la fuente de un conjunto de datos no especifica un"institution"atributo, GenerateDatasets Xml y loadDataset ahora lo obtiene de un atributo "creator\\_institution" (si está disponible) . Gracias a Micah Wengren.
         
    * BUG FIX: estandarizar Lo que no siempre fue aplicado a los archivos de datos ASCII.
Además, EDDTable no se ocupó correctamente de las restricciones de los valores de tiempo cuando la fuente tenía valores de tiempo de String y estandarizar Lo que se utilizaba.
Gracias a Paloma de la Vallee.
        
No dije claramente antes: deberías usar estandarización Qué características cuando realmente los necesitas (por ejemplo, cuando diferentes archivos fuente almacenan valores de tiempo de diferentes maneras) , porque algunas solicitudes a conjuntos de datos que utilizan estandarizar Lo que se procesará un poco más lento.
        
    * BUG FIX: Un error en el código utilizado porEDDGridFromNcFiles hizo que fracasara con.nc4 y 4.hdf5 archivos que tienen "long" (int64) variables. Esto está arreglado. Gracias a Friedemann Wobus.
         
    * BUG FIX: Pequeños cambios en los archivos ISO 19115 para hacer un validador diferente feliz. Gracias a Chris MacDermaid y Anna Milan.
         

## Versión 2.01{#version-201} 
 (publicado 2019-07-02) 

*    **Nuevas características y cambios (para usuarios) :** 
    * Ninguno.
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * BUG FIX: Un fallo en el código que genera el formulario de acceso de datostabledapdatasets causó que la página web estuviera en blanco para algunos conjuntos de datos. Además, mejoré el manejo de errores inesperados en todas las páginas HTML para que lo hagan (generalmente) muestra un mensaje de error. Gracias a Marco Alba.
    * IMPROVED: GenerarDatasets Xml ya no imprime una larga advertencia en la parte superior de la salida. En su lugar, por favor vea[Generación de edición Datasets Xml Output](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better). Gracias a Steven Baum.
    * IMPROVED: GenerarDatasets Xml ahora hace recomendaciones ligeramente diferentes en diferentes situaciones para&lt;ActualizarTodosNMillis confiar para EDD...De... Además, GenerarDatasets Xml ahora desalienta el sistema original "extracto" para EDDTableDeFiles conjuntos de datos.

## Versión 2.{#version-200} 
 (publicado 2019-06-26) 

*    **ERDDAP™¡V2.00 está finalmente aquí&#33; ¡Sí&#33;**   
     
    * Nos disculpamos por el largo retraso necesario para terminar esta versión.
Gracias por su paciencia.
         
    * La buena noticia es que el tiempo extra se utilizó para añadir más de las características que los usuarios habían solicitado. La mala noticia es que incluso con el retraso, no todas las características solicitadas fueron agregadas. Lo sentimos, pero parecía más importante sacar esta liberación que retrasar más (¿Para siempre?) Añadiendo continuamente nuevas características. Prometemos volver a versiones más frecuentes en el futuro.
         
    * "¡Versión 2&#33; ¿Hay grandes cambios e incompatibilidades?"
¿Grandes características nuevas? Sí.
¿Grandes incompatibilidades o cambios para administradores o usuarios? No.
Saltamos de v1.82 a v2.00:
        * en parte para celebrar 10 años (Ahora 11) desde la primera liberación públicaERDDAP™  (v1.00 el 2008-05-06, que hacia fuera parecía notablemente como v2.00) . En ese momento,ERDDAP™ha pasado de una instalación a casi 100 instalaciones en al menos 12 países (Australia, Bélgica, Canadá, Francia, India, Irlanda, Italia, Sudáfrica, España, Tailandia, Reino Unido, Estados Unidos) .
        * en parte para marcar una adición importante en una dirección completamente nueva:ERDDAP™ahora tiene un sistema ingert de datos para ir con los servicios existentes del servidor de datos (ver[EDDTableDesdeHtpGet](#eddtablefromhttpget)) ,
        * y en parte porque no era un gran salto de 1,82 a 2,00 numéricamente, así que esto parecía el momento adecuado.
             
    * La otra buena noticia es que ahora hay otros dos grupos que aportan código aERDDAP™  (en esta versión y con indicaciones continuarán) : Rob Fuller y Adam Leadbetter del Instituto Marino de Irlanda, y Roland Schweitzer de PMEL y Weathertop Consulting. Muchas gracias. Es cierto que están trabajando en proyectos de su propia elección, pero ese es el modelo clásico de desarrollo de código abierto - los grupos contribuyen código para las características que más les gustaría ver añadido. El beneficio añadido a los contribuyentes: consiguen utilizar las nuevas características tan pronto como estén terminados; no tienen que esperar para la próxima liberación deERDDAP. ¡Su grupo también es bienvenido a contribuir&#33; Ver el[ERDDAP™Guía del programador](/docs/contributing/programmer-guide).
         
    * Esperamos que te gusteERDDAP™v2.00. Esperamos con interés los próximos 10 añosERDDAP™desarrollo y cada vez más uso en todo el mundo.
         
*    **Nuevas características y cambios (para usuarios) :**   
     
    * NUEVO:orderByMeanfiltro
paratabledapdatasets calculará los medios para los grupos especificados. Además, todo elorderByopciones ahora apoyan una manera adicional de definir grupos: _numericVariable\\[Número\\[timeUnits\\]\\[:offset\\]\\]_, por ejemplo, tiempo/1día o profundidad/10:5. Por ejemplo,stationID,time,waterTemporderByMean ("stationID,time/1day") clasificaría los resultados porstationIDy tiempo, luego calcular y devolver la media de aguaTemp para cadastationIDpor cada día. Estas son notablemente útiles y potentes nuevas características. El nuevo código para estas características y los cambios en el viejo código fueron contribuidos por Rob Fuller y Adam Leadbetter del Instituto Marino de Irlanda y presentado a través de Git. Gracias. ¡Rob y Adam&#33;
         
    * NUEVO: tipo de archivo de salida para conjuntos de datos tabulares:[.data Cuadro](https://developers.google.com/chart/interactive/docs/reference#dataparam),
un archivo JSON formateado para su uso con elGoogle Visualizationbiblioteca cliente (Google Charts) . El código para esto fue contribuido por Roland Schweitzer y presentado a través de Git. Gracias. ¡Roland&#33;
         
    * NUEVO: tipo de archivo de salida para conjuntos de datos tabulares:[.jsonlCSV1](https://jsonlines.org/examples/),
que es como el existente.jsonlCSVopción, pero con nombres de columna en la primera línea. Gracias a Eugene Burger.
         
    * NOTICIA: Si el administrador lo permite, los usuarios pueden iniciar sesión con su[ORCID](https://orcid.org)cuenta.
Es un sistema de autenticación OAuth 2.0, al igual que la autenticación de Google. ORCID es ampliamente utilizado por los investigadores para identificarse de forma única. Las cuentas ORCID son gratuitas y no tienen los problemas de privacidad que tienen las cuentas de Google. SeeERDDAP's[Orcid autenticación instrucciones](/docs/server-admin/additional-information#orcid). Gracias a BCO-DMO (Adam Shepard, Danie Kinkade, etc.) .
         
    * NOTICIA: Un nuevo convertidor de URL convierte URLs fuera de la fecha en direcciones URL actualizadas.
Ver .../erddap/convert/urls.html sobre cualquierERDDAP™instalación, por ejemplo,
        [este enlace al convertidor en elERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html). Esto debería ser útil para los administradores de datos. Esto también se utiliza internamente por GenerateDatasetsXml. Gracias a Bob Simons y Sharon Mesick.
         
    * IMPROVED: The[Time Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)ahora tiene opciones para convertir cualquier tiempo de cadena común en un tiempo de cadena ISO8601, o convertir unUDUNITS- como las unidades de tiempo en un correctoUDUNITSUnidades de tiempo. This should also be useful toERDDAP™administradores que necesitan saber qué formato especificar para el atributo "unidades" para variables de tiempo de cadena. Esto también se utiliza internamente por GenerateDatasetsXml y la estandarizaciónQué característica de EDDTableDesdeFiles. Gracias a Bob Simons.
         
    * NOTICIA:[Units Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)tiene una nueva opción "Standardize UDUnits".
Por ejemplo, "deg\\_C/m" y "degrees\\_C metros-1" ambos se convierten a
"degree\\_C m-1". Esta característica también es utilizada por la estandarizaciónQué característica de EDDTableDesdeFiles. Gracias a Bob Simons.
         
    * NUEVO: Para gráficos (aparte de gráficos superficiales) en griddap's ytabledap's Hacer una página web de Gráfico, cuando el eje x no es un eje de tiempo, si sólo un subconjunto de la variable de eje x es visible, ahora hay botones por encima del gráfico para cambiar el eje X hacia la izquierda o hacia la derecha. Gracias a Carrie Wall Bell / el proyecto Hydrophone.
         
    * NOTICIA: Para gráficos, el eje X y/o Y ahora puede utilizar una escala Log.
Los usuarios pueden controlar la escala Y Axis a través de un nuevo widget desplegable en el griddap ytabledapHaga una página web de Gráfico. Ver el[.xRange y . documentación yRange](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange). Gracias a Carrie Wall Bell / el proyecto Hydrophone.
         
    * MEJORADO:ERDDAP™ahora hace un mejor uso de varios códigos de error HTTP y ahora devuelve un(OPeN)DAPv2.0-formatted error mensaje payload. See[los detalles](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors). Gracias a Antoine Queric y Aurelie Briand.
         
    * IMPROVED: No utilice Netcdf-java/c u otras herramientas de software para conectarse a.nco.hdfarchivos servidosERDDAP's /files/ sistema como si fueran archivos locales.ERDDAP™ahora rechaza estas solicitudes. Es terriblemente ineficiente y a menudo causa otros problemas. En su lugar:
        
        * Uso(OPeN)DAPsoftware cliente para conectarseERDDAP'sDAPservicios para el conjunto de datos (que tienen /griddap / o /tabledap/ en la URL) . Eso es lo queDAPes para y lo hace bien.
        * O, utilice el formulario de acceso de datos del conjunto de datos para solicitar un subconjunto de datos.
        * O, si necesita todo el archivo o acceso repetido durante un largo período de tiempo, usecurl,wget, o su navegador para descargar el archivo completo, a continuación, acceda a los datos de su copia local del archivo.
        
          
         
    * IMPROVED: On theERDDAP™homepage, Full Text Search is now above "View a List of All Datasets" since it is the best starting point for most users. Gracias a Didier Mallarino y Maurice Libes.
         
    * IMPROVED: On DataProviderForm3.html ahora hay listas desplegables de comúnstandard\\_names. Gracias a alguien en la reunión de IOOS DMAC.
         
    * IMPROVED: En las páginas /files/ web, ahora hay un enlace al nuevo "¿Qué puedo hacer con estos archivos?" sección de los /files/documentación. Esa sección describe varios tipos de archivos y da sugerencias para cómo trabajar con ellos. Gracias a Maurice Libes.
         
    * MEJORADO: Casi todas las solicitudesERDDAP™debería ser al menos un poco más rápido, y a veces mucho más rápido.
         
    * BUG FIX: En algunas circunstancias, cuando un conjunto de datos EDDTable guarda datos en algunos tipos de.ncarchivos, el atributo global "id" se estableció en el nombre sugerido del archivo, que incluye un hash para hacerlo único a esa petición. Ahora "id" es correctamente dejado sin cambios (si se especifica) o establecido en el conjunto de datosdatasetID  (si no se especifica) . Gracias a John Maurer.
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:**   
     
    * Para hacer: Esta liberación tomará tiempo y trabajará de ti. Tenga paciencia y planifique tomar unas horas para hacer los cambios necesarios y unas horas más para experimentar con nuevas características.
         
    * Para garantizar la seguridad, haga una copia de seguridad de su configuración actual.xml ydatasets.xmlarchivos para que pueda volver a ellos en el caso improbable donde necesita volver aERDDAP™v1.82.
         
    * TO DO: The recommendedJavaes ahora el OpenJDK de AdoptOpenJDK 8 (LTS) + HotSpot.
Esta es una variante de código abiertoJavaque no tiene restricciones a su uso (diferenteOracle'sJavadistribución) . Se deriva deOracle'sJavade una manera continua, conOracleEs bendición. Por razones de seguridad, es importante mantener suJavaversión actualizada. SeeERDDAP's[JavaInstrucciones de instalación](/docs/server-admin/deploy-install#java).
         
    * TO DO: AdoptOpenJDK'sJavanecesita una pequeña adición a su instalación de Tomcat: ver[Recursos Manuales](/docs/server-admin/deploy-install#contentxml). Creo que esto es un reemplazo para el ajuste -XX:MaxPermSize, que (Adopt) OpenJDK ya no soporta.
         
    * TO DO: El nuevo defecto y recomendar&lt;fontFamily titulada setting in setup.xml is
DejaVu Sans, que se construyen en losJava. Ver el
        [Instrucciones revisadas de instalación de fuentes](/docs/server-admin/deploy-install#fonts).
         
    * TO DO: Muchas etiquetas se están moviendo de setup.xml adatasets.xml. La ventaja es que puedes cambiar sus valores mientrasERDDAP™está corriendo, sin descansoERDDAP. Notablemente, puedes cambiar fácilmente&lt;startBodyHtml5 confía para mostrar un mensaje temporal en elERDDAP™página principal (por ejemplo, "ver el nuevo conjunto de datos JPL MUR SST v4.1 ..." o "EstoERDDAP™estará fuera de línea para el mantenimiento 2019-05-08T17:00:00 PDT a través 2019-05-08T20:00:00 PDT.") . Si/cuando cambias estas etiquetasdatasets.xml, los cambios entrarán en vigor la próxima vezERDDAP™lecturasdatasets.xml.
         
        
        1. Copia este contenido en sudatasets.xmlarchivo (en cualquier lugar cerca del inicio del archivo, después&lt;erddapDatasets confía:
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. Uno por uno, copiar el valor (si) para cada una de esas etiquetas de su archivo setup.xml en la nueva etiqueta que acaba de pegar (arriba) dentrodatasets.xml. Por ejemplo, si hubiera usado un valor de 30 para&lt;cacheMinutes en setup.xml, debe copiar ese valor en el nuevo&lt;cacheMinutes confía tag endatasets.xml  (Aunque si el valor es el mismo que el nuevo valor predeterminado, es mejor dejar la etiqueta endatasets.xmlblanco) .
            
Si su valor es diferente del nuevo defecto sugerido (excepto para&lt;startBodyHtml5 confianza y&lt;theShortDescriptionHtml inteligente, que son útiles para personalizar suERDDAP™instalación), por favor considere cambiar a los nuevos valores predeterminados. Esto es particularmente cierto&lt;parcialRequestMaxBytes confía y&lt;parcialRequestMaxCells confiar, donde el valor predeterminado/sugerido ha cambiado significativamente a lo largo de los años.
            
Después de copiar cada valor, eliminar la etiqueta y su descripción de setup.xml. Es mejor tener estas etiquetas endatasets.xml. Y ahora hay mejores descripciones en[configuraciónDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file).
            
        
Un quirk del nuevo sistema es que la primera página web cuando empiezasERDDAPserá el defectoERDDAP™página web. Cada página web posterior utilizará el contenido ...Html que especifique endatasets.xml.
        
    * La primera vez que corresERDDAP™v2.0, conjuntos de datos basados en archivos de datos locales se cargará **muy bien.** lentamenteERDDAP™necesita recrear su base de datos de archivos en un formato ligeramente diferente. Después de la lenta recarga inicial, se cargarán rápidamente, como antes. Por favor sea paciente.
         
#### EDDTableDesdeHtpGet{#eddtablefromhttpget} 
    *   [BIG NEW FEATURE: EDDTableDesdeHtpGet](#eddtablefromhttpget)  
Hasta ahora,ERDDAP™simplemente leer datos y ponerlo a disposición de los usuarios. Ahora,ERDDAP™tiene un sistema sencillo y eficiente para ingerir datos en tiempo real de sensores. Entre otras características, este conjunto de datos ofrece una versión fina: recuerda todos los cambios realizados en el conjunto de datos, cuando se hizo, y por quién. Por lo general, los usuarios sólo querrán la última versión del conjunto de datos, con todos los cambios aplicados. Pero hay la opción para que los usuarios soliciten datos desde el conjunto de datos, ya que era en cualquier momento. Esto facilita la ciencia reproducible. Así, a diferencia de la mayoría de los demás conjuntos de datos casi en tiempo real, estos conjuntos de datos son elegibles para[DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier). porque se encuentran conDOIrequisito de que el conjunto de datos no cambie, excepto por agregación. See[EDDTableDesdeHtpGet](/docs/server-admin/datasets#eddtablefromhttpget). Gracias a OOI (desde hace mucho tiempo y ahora) por hablar de la necesidad de esto y Eugene Burger para el recordatorio de trabajar en lo que es importante.
         
    * BIG NEW FEATURE:ERDDAP™ahora puede servir datos directamente desde archivos de datos de contenido externo, incluyendo.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, o .Z. Datasets puede incluir una mezcla de archivos comprimidos externamente (¿Tal vez los archivos de datos antiguos?) y archivos no comprimidos externamente, y puede comprimir/decomprimir un archivo en cualquier momento.
        
¡Esto funciona genial&#33;
En la mayoría de los casos, la desaceleración relacionada con la descompresión de los archivos es menor. Le animamos firmemente a probar esto, en particular para conjuntos de datos y/o archivos de datos que se utilizan infrecuentemente.
        
¡Esto puede ahorrarte 30.000 dólares o más&#33;
Este es uno de los pocosERDDAP™características que pueden ahorrar mucho dinero - si comprime muchos archivos de datos, necesitará mucho menos unidades RAIDs/hard para almacenar los datos, o por el contrario, puede servir mucho más datos (hasta 10x) con los RAIDs que ya tienes. Si esta característica te salva de comprar otro RAID, entonces te ha ahorrado unos $30,000.
        
Ver el[Documentación de archivos comprimidos externamente](/docs/server-admin/datasets#externally-compressed-files). Gracias a Benoit Perrimond y Paloma de la Vallee.
        
    * BIG NEW FEATURE: TodosEDDGridDeFiles y todos los datasets EDDTableDeFiles admiten un&lt;cacheDesdeUrl] etiqueta y un&lt;etiqueta cacheSizeGB. Si no se especifica cacheSizeGB, esto descargará y mantendrá una copia completa de los archivos de un conjunto de datos remoto. Si se especifica cacheSizeGB y es √0, esto descargará archivos del conjunto de datos remoto, según sea necesario, en un caché local con un tamaño limitado, que es útil al trabajar con base en la nube (por ejemplo, S3) archivos de datos. Ver el[cache Documentación de Url](/docs/server-admin/datasets#cachefromurl)para detalles. Gracias a Bob Simons y Roy Mendelssohn (que durante años han estado escribiendo scripts para manejar la fabricación de copias locales de archivos remotos de conjunto de datos) Lloyd Cotten, Eugene Burger, Conor Delaney (cuando estaba en Amazon Web Services) , y la plataforma de Google Cloud.
         
    * NUEVO: El nuevo EDDTableDesde JsonlCSV clase puede leer datos tabulares de
        [JSON Líneas Archivos CSV](https://jsonlines.org/examples/)  ("Mejor que CSV") . Gracias a la gente del Instituto Marino de Irlanda por contarme acerca de este formato y a Eugene Burger y PMEL para la solicitud de soporte como tipo de entrada.
         
    * NUEVO: TodoEDDGridy todos los datasets EDDTableDesdeFiles soportan un&lt;nTreads configuración de confianza, que diceERDDAP™cuántos hilos utilizar al responder a una solicitud. Ver el[nTreads documentation](/docs/server-admin/datasets#nthreads)para detalles. Gracias a Rob Bochenek de Axiom Data Science, Eugene Burger, Conor Delaney (cuando estaba en Amazon Web Services) , y Google Cloud Platform.
         
    * NUEVA estandarización ¿Qué para todos los EDDTableDeFiles subclases -
Anteriormente, si para una variable dada, los valores de los atributos importantes (por ejemplo,scale\\_factor,add\\_offset,missing\\_value, \\_FillValue, unidades) No era consistente, EDDTableDesdeFiles elegiría un valor para cada atributo para ser "válido" y marcar archivos con otros valores de atributo como "Bad Files". Ahora, hay un sistema para estandarizar los archivos tan pronto como EDDTableDesdeFiles lea los archivos. See[EDDTableDesde la estandarización de File ¿Qué?](/docs/server-admin/datasets#standardizewhat). Uno de losERDDAP's objetivos principales es hacer que los archivos de datos y los conjuntos de datos sean accesibles de manera coherente. normalización Qué es una nueva herramienta importante para hacer que sea una realidad. Gracias a Marco Alba, Margaret O'Brien (y otros usuarios de EML) , BCO-DMO, y usuarios de InPort.
         
    * NUEVA EDDTableDesdeInvalidCRAFiles le permite hacer un conjunto de datos de una colección deNetCDF  (v3 o v4)  .ncarchivos que utilizan una variante específica, inválida, de la CF DSG Contiguous Ragged Array (CRA) archivos. Los archivos de muestra para este tipo de conjunto de datos se pueden encontrar en https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Este servidor no está disponible de forma fiable.\\]. AunqueERDDAP™soporta este tipo de archivo, es un tipo de archivo inválido que nadie debe comenzar a usar. Grupos que actualmente utilizan este tipo de archivo se alienta encarecidamente a utilizarERDDAP™para generar archivos CF DSG CRA válidos y dejar de usar estos archivos. Gracias a Ajay Krishnan y Tim Boyer.
         
    * EDDTableDeThreddsFiles y EDDTableDesdeHyraxLos archivos están ahora deprecados. Por favor, cambie a EDDTableDesdeNcFiles (o una variante) más&lt;cacheDesde el usuario. Si eso no funciona por alguna razón, emailerd.data at noaa.gov. Si no hay quejas antes de 2020, estos tipos de conjunto de datos pueden ser eliminados.
         
    * IMPROVED -- El sistema para convertir automáticamente no-ISO 8601 veces en ISO 8601 veces (introducido en v1.82) se ha ampliado mucho para tratar con un gran número de formatos adicionales. Esto afecta a GeneraDatasetsXml yERDDAPEs el manejo de metadatos de origen.
         
    * IMPROVED -- Con su tercera revisión importante del sistema de corte de tiempo (y espero que el último) ,ERDDAP™ya no usosJava's DateTimeFormatter debido a errores que a veces afectan tiempos extremos (años)&lt;=0000).ERDDAP™ahora utiliza su propio sistema para cortar cadenas de tiempo.
         
    * ADVERTENCIA: El nuevo sistema de corte de tiempo String es algo más estricto. Si uno de sus conjuntos de datos de repente sólo tiene valores perdidos para los valores del tiempo, la causa es casi seguro que la cadena del formato del tiempo es ligeramente errónea. Debe haber mensajes de error en el registro. txt relacionado con los valores de tiempo que no coincidieron con el formato de tiempo - que debería ayudarle a fijar la cadena de formato de tiempo para ese conjunto de datos. Si necesita ayuda, utilice la opción enERDDAP's Time Converter que "Convertir\\[s\\]cualquier tiempo de cadena común en un tiempo de cadena ISO 8601" -- indica el formato que el convertidor utiliza para analizar la cadena fuente.
         
    * RECOMENDACIÓN: La forma más rápida, fácil y más barata de acelerarERDDAP's access to tabular data is to put the data files on a Solid State Drive (SSD) . La mayoría de los conjuntos de datos tabulares son relativamente pequeños, por lo que una SSD de 1 o 2 TB es probablemente suficiente para mantener todos los archivos de datos para todos los conjuntos de datos tabulares. SSD eventualmente se agota si escribes datos a una célula, lo eliminas y escribes nuevos datos a esa celda demasiadas veces. En su lugar, recomiendo que (tanto como sea posible) sólo utiliza su SSD para escribir los datos una vez y leerlos muchas veces. Entonces, incluso un SSD de grado de consumo debe durar mucho tiempo, probablemente mucho más que cualquier disco duro (HDD) . SSD de grado de consumo ahora son baratos (en 2018, ~$200 para 1 TB o ~$400 para 2 TB) y los precios siguen cayendo rápido. CuandoERDDAP™accede a un archivo de datos, un SSD ofrece ambos
        
        * latencia más corta (~0.1ms, versus ~3ms para un HDD, versus ~10 (?) ms para un RAID, versus ~55ms para Amazon S3) , y
        * mayor rendimiento (~500 MB/S, versus ~75 MB/s para un HDD versus ~500 MB/s para un RAID) .
        
Así que puedes conseguir un aumento de rendimiento ~10X (vs un HDD) por $200&#33; Comparado con la mayoría de los cambios posibles en su sistema (un nuevo servidor por $10,000? ¿Un nuevo RAID por 35.000 dólares? ¿Un nuevo interruptor de red por $5,000? etc.) , esto es por lejos el mejor retorno de la inversión (ROI) . Si su servidor no está cargado de memoria, la memoria adicional para su servidor es también una manera grande y relativamente barata de acelerar todos los aspectos deERDDAP.
        \\[SSD también sería genial para datos redondeados, pero la mayoría de los conjuntos de datos redondeados son mucho más grandes, haciendo que el SSD sea muy caro.\\]  
         
    * NUEVO: Todos los que están conectados tienen papel=\\[cualquieraLogged In\\], incluso si no hay&lt;usuario etiqueta título para ellos endatasets.xml. Si establece el conjunto de datos&lt;accesible para\\[cualquieraLogged In\\], entonces cualquiera que haya iniciado sesiónERDDAP™  (por ejemplo, a través de su cuenta Gmail o Orcid) será autorizado para acceder al conjunto de datos, incluso si no ha especificado un&lt;usuario etiqueta título para ellos endatasets.xml. Gracias a Maurice Libes.
         
    * IMPROVED: TheUDUNITS/UCUM unidades convertidor fue ampliamente mejorado.
Maneja las cadenas de unidades inválidas mejor (empezar con un énfasis en preservar la información, en lugar de hacer cumplir la validez) . Además, los resultados ahora tienen una sintaxis estandarizada.
         
    * NOTICIA:UDUNITS/UCUM unidades convertidor tiene una nueva opción para estandarizar aUDUNITScuerda.
Esto funciona bien para validarUDUNITScuerdas y razonablemente bien para no estándar / inválidoUDUNITScuerdas. Por ejemplo, por ejemplo,UDUNITS="metros por segundo", "meter/second","m.s^-1", y"m s-1"todos volverán "m.s-1". Esto era necesario para la nueva estandarización Qué sistema descrito anteriormente. Gracias a Marco Alba, Margaret O'Brien (y otros usuarios de EML) , BCO-DMO, y usuarios de InPort.
         
    * NOTICIA: EDDTableDeMultidimNcFiles ahora tiene un[dimensionesAs](/docs/server-admin/datasets#treatdimensionsas)opción, que diceERDDAP™tratar ciertas dimensiones (por ejemplo, LAT y LON) como si fueran otras dimensiones (por ejemplo, TIEMPO) . Esto es útil para algunos archivos incorrectos que utilizan diferentes dimensiones para diferentes variables cuando deben haber utilizado sólo una dimensión (por ejemplo, TIEMPO) . Gracias a Marco Alba y Maurice Libes.
         
    * NUEVO: Ahora, todoEDDGridLos conjuntos de datos de...sourceNameque diceERDDAP™para extraer información del archivoName (sólo nombre de archivo.ext) y utilizar el valor **reemplazar** el valor del eje izquierdo existente. El formato es
        \\*\\*\\*replaceDesdeFileName,_dataType_,_extractRegex_,_captureGroupNumber_
See[esta documentación](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Gracias a laNOAAPathfinder Daily aggregation dataset.
         
    * NUEVO: Ahora, todoEDDGridLos conjuntos de datos de...sourceNameque diceERDDAP™para extraer información de la ruta del archivoName (directorios + nombre de archivo.ext)   
        \\*\\*\\*pathName,_dataType_,_extractRegex_,_captureGroupNumber_
Para esto, el nombre del camino siempre utiliza'/'como el personaje separador del directorio, nunca '\'.
See[esta documentación](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Gracias a Paloma de la Vallee.
         
    * NUEVO: Ahora, todo EDDTableDesde... Los conjuntos de datos de archivos soportan una variable pseudo adicionalsourceNames que extrae información del archivo del archivoName (sólo nombre de archivo.ext)   (ver[\\*\\*\\*fileName](/docs/server-admin/datasets#filename-sourcenames)) o desde la ruta completa del archivoName (/dir1/dir2/filename.ext)   (ver[\\*\\*\\*pathName](/docs/server-admin/datasets#pathname-sourcenames)) . Gracias a Paloma de la Vallee.
         
    * NUEVO: Si unEDDGriddataset tiene una o más dimensiones muy grandes (por ejemplo, millones de valores) que toma mucha memoria, usted puede establecer el nuevo [&lt;dimensionValoresInMemory confianza] (/docs/server-admin/datasets#dimensionvaluesinmemory) establecerse en falso (el defecto es verdad) , que hace que el conjunto de datos para almacenar los valores en el disco y recuperarlos cuando sea necesario. Gracias a David Rodríguez y Rich Signell (re:EDDGridDeAudioFiles) .
         
    * Anteriormente, si reordenaste eldataVariables para un EDDTableDesde el conjunto de datos de Files y recargado el conjunto de datos, EDDTableDesdeFiles volvería a leer todos los archivos de datos. Ahora, puede tratar con la reordenación sin releer todos los archivos de datos. Gracias a Roland Schweitzer.
         
    * Ahora, cuandoERDDAP™lee archivos de datos tabulares ASCII, NCCSV y JSON Lines CSV, si encuentra un error en una línea determinada (por ejemplo, número incorrecto de artículos) , registra un mensaje de advertencia ("WARNING: Skipping line"... " inesperado número de artículos...") a la[log.txt file](/docs/server-admin/additional-information#log)y luego sigue leyendo el resto del archivo de datos. Por lo tanto, es su responsabilidad mirar periódicamente (o escribir un script para hacerlo) para ese mensaje en el registro. txt para que pueda solucionar los problemas en los archivos de datos.ERDDAP™se establece de esta manera para que los usuarios puedan seguir leyendo todos los datos válidos disponibles aunque algunas líneas del archivo tengan defectos. Anteriormente,ERDDAP™marcó el archivo como "malo" y lo quitó del conjunto de datos.
         
    * IMPROVED: Cuando tiempos precisos (por ejemplo, al segundo o segundo más cercano) se almacenan en la fuente como "minutos desde ..." (o unidades más grandes) ,ERDDAP™ahora los redondea al milisegundo más cercano al leer los valores enERDDAP. De lo contrario, los números de puntos flotantes son bruscados y solicitudes de datos en momentos específicos (e.g., &quot;time=2018-06-15T01:30:00) fracasará. Anteriormente, los calculó lo más exactamente posible (y todavía lo hace si las unidades son, por ejemplo, "segundos desde ..." o "milliseconds desde ...") . Es mejor evitar este problema al no utilizar unidades grandes (por ejemplo, minutos o horas) para almacenar valores de tiempo precisos (por ejemplo, microsegundos) - Las computadoras hacen un mal trabajo de manejar dígitos decimales. Gracias a Marco Alba.
         
    * CHANGES to EDDTableDesdeEDDGridque lo hace mucho mejor. EDDTableDesdeEDDGridpermite a los usuarios consultar conjuntos de datos redondeados como si fueran conjuntos de datos tabulares ("query by value") .
        
        * Ahora soporta un&lt;maxAxis0 (default=10) que especifica el número máximo de eje\\[0\\]  (generalmente"time") valores que pueden ser preguntados inmediatamente. Esto evita que las solicitudes ingenuas de obtener EDDTableEDDGridpara buscar a través de un conjunto de datos (que fallaría con un error de timeout) .
        * GenerarDatasets Xml ahora tiene una opción para generar EDDTableDesdeEDDGridconjuntos de datos para todos los conjuntos de datos redondeados en un determinadoERDDAP™que coincide con un regex especificado (utilizar .\\* para combinar todos los conjuntos de datos) . Los conjuntos de datos que crea tienen información adicional en el atributo sumario indicando que esta es una versión tabular de un conjunto de datos redondeados. Y susdatasetIDesdatasetIDdel conjunto de datos redondeados, más "\\_AsATable".
        * Hay una gran velocidad para la configuración más común: cuando el conjunto de datos redondeado es unEDDGridDeErddap dataset que está en el mismoERDDAP.
        
Gracias a James Gallagher y Ed Armstrong.
         
    * NUEVO: generar Datasets Xml para todo tipo de conjuntos de datos ahora es mucho más probable añadir un \\_FillValue omissing\\_valueatributo a una variable numéricaaddAttributes. Por ejemplo, esto ocurre cuando los marcadores de valor perdidos de cadena (por ejemplo, "", ", "?", "NA", "nd", "NaN") para esa variable en el archivo de muestra se convierten aERDDAP's nativo perdido valores (127 en columnas de byte, 32767 en columnas cortas, 2147483647 int columns, 9223372036854775807 en columnas largas, y NaN en flotador y doble variables) . También ocurre para valores NaN en variables flotantes y dobles. Además, "nd" se agregó a la lista de marcadores de valor perdidos comunes en columnas de datos numéricos queERDDAP™Debería buscar. Gracias a Matt Biddle de BCO-DMO.
         
    * IMPROVED: la opción ncdump en generar Datasets Xml ahora es más como ncdump (pero todavía utiliza la versión netcdf-java de ncdump) . Ahora, imprime una nueva lista de opciones. Ahora, por.ncarchivos ml, imprime la salida ncdump para el resultado del.nccambios de archivo de ml aplicados a la.nco.hdfarchivo.
         
    * BUG FIX: Había una fuga de mango de archivos (eventualmente causandoERDDAP™para congelar) causado al crear algunos tipos de archivos de salida, por ejemplo, .geotif, especialmente cuando se produjeron errores durante la creación. Creo que esto ya está todo arreglado. Si sigues viendo problemas, por favor dime el tipo de conjunto de datos (rejilla o tabla) y el tipo de archivo que está causando el problema. Gracias a Steven Beale, Lynn DeWitt, Jibei Zhao y otros.
         
    * BUG FIX: ElWMS Leafletdemo no convirtió completamente/propiadamente el eje "de profundidad" a la "elevación". Ahora, lo hace, y las solicitudes de leyenda rotas están arregladas. Además, todas las opciones de eje en las listas desplegables están siempre en orden clasificado ascendente. Gracias a Antoine Queric y Aurelie Briand.
         
    * BUG FIX: EDDTableDeFiles ahora soporta correctamente restricciones en variables String que fueron creadas a partir de variables char en los archivos de datos. Gracias a Antoine Queric y Aurelie Briand.
         
    * BUG FIX: Ahora, cuando un conjunto de datos no está disponible, el conjunto de datos intenta notificar (con el mensaje "Este conjunto de datos no está disponible actualmente".) sus suscriptores, acciones enumeradas, rss y lonPM180 conjuntos de datos que dependen de él. Gracias a Roy Mendelssohn y Bob Simons.
         
    * BUG FIX: Dos errores relacionados con EDDTableCopy. Gracias a Sam McClatchie.
         
    * IMPROVED: El número de solicitudes fallidas que se muestran en el estado.html página aumentará porque más cosas se cuentan como fracasos que antes.
         
    * MEJORADO:ERDDAP's status.html ahora muestra "Requests (medianas veces en ms) "en la serie de tiempo. Previamente, mostró tiempos medios truncados a segundos enteros.
         
    * IMPROVED: En la salida jsonld, el jsonld "nombre" ahora viene del conjunto de datos"title"dentroERDDAP, y el jsonld "headline" ahora viene del conjunto de datos "datasetID"enERDDAP. Anteriormente, fue revertido. Esto me parece mal porque en el uso normal del inglés, "nombre" es generalmente un corto, (idealmente) identificador único que rara vez / nunca cambia (por ejemplo, Robert Middlename Simons) , no una descripción que no es única y que puede cambiar fácilmente y a menudo ("Un tipo que escribe software paraNOAA"Vs. Un tipo alto que escribe software paraNOAA") . Vaya, sería genial si la definición de schema.org[Nombre](https://schema.org/name), en el contexto de un Dataset, fueron más específicos. Los desarrolladores de software deben poder escribir una implementación de una especificación basada en la especificación sola, sin la orientación de expertos. Pero me diferí a Google (notablemente Natasha Noy) , NCEI (John Relph) Y Rob Fuller.
         
    * IMPROVED: En la salida jsonld, los cuatro valores "spatialCoverage GeoShape box" son ahora minLat minLon maxLat maxLon. Anteriormente, las posiciones de los lat y Lon se revirtieron. Vaya, sería genial si la definición de schema.org[GeoShape](https://schema.org/GeoShape)especificó el orden correcto. Los desarrolladores de software deben poder escribir una implementación de una especificación basada en la especificación sola, sin la orientación de expertos. Gracias a Natasha Noy y Rob Fuller.

## Versión 1.82{#version-182} 
 (publicado 2018-01-26) 

*    **Nuevas características (para usuarios) :**   
     
    * Numerosos cambios sutiles en el aspecto y el tacto deERDDAP™páginas web.
        * MEJORADO:ERDDAP™ahora utiliza HTML 5 y hace un mejor uso de CSS.
        * IMPROVED: Las páginas web han sido ligeramente modificadas para que sean más limpias y menos "busy". (Todavía son densos y todavía hay cosas que uno podría quejarse, pero con suerte mucho menos que antes.) Gracias a John Kerfoot por algunos comentarios.
        * IMPROVED: Las páginas web ahora se ven mucho mejor en los teléfonos móviles y otros dispositivos pequeños, especialmente si las utilizas en la orientación del paisaje. También lucen mejor en ventanas muy pequeñas y muy grandes en los navegadores de escritorio.
        * IMPROVED: Para mejorar la seguridad y otras razones, el uso de una versión de Openlayers fuera de la fecha para laWMSpáginas de demostración han sido reemplazadas porLeaflet.
        * NOTICIA: soporte para previsualizaciones de archivos de imagen, audio y vídeo en el"files"sistema (por ejemplo,[este conjunto de datos de prueba](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) y dentro.htmlTablerespuestas cuando una célula tiene la URL de un archivo de imagen, audio o vídeo (por ejemplo,[esta solicitud](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) . Si pasas por encima de un icono '?', deberías ver una imagen, audio o vista previa del archivo de vídeo. También puede hacer clic en el enlace de archivo para ver la pantalla completa del archivo en su navegador. Ver el[Documentación de archivos multimedia](/docs/server-admin/datasets#media-files). Tenga en cuenta que diferentes navegadores admiten diferentes tipos de archivos, por lo que los ejemplos pueden no funcionar en su navegador.
Gracias a estas personas/vínculos para ideas y código de muestra para las herramientas de imagen CSS-únicamente (estaba en https://codepen.io/electricalbah/pen/eJRLVd ) y carga de imagen diferida (estaba en https://varvy.com/pagespeed/defer-images.html )   (aunque el código fue modificado antes de utilizarloERDDAP) .
Gracias a Cara Wilson, Matthew Austin y Adam Shepherd/BCO-DMO para solicitudes de soporte de imagen.
Gracias a Jim Potemra, Rich Signell, OOI y Carrie Wall Bell por solicitudes de soporte de archivos de audio/hidrofono.
Gracias a OOI por mostrar la necesidad de soporte de vídeo.
        * NOTICIA: Un subconjunto de datos de cualquierERDDAP™Dataset (pero generalmente un conjunto de datos de archivos de audio) ahora se puede guardar en un archivo de audio .wav. ([documentación](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) Gracias a Jim Potemra, Rich Signell, OOI y Carrie Wall Bell por solicitudes de soporte de archivos de audio/hidrofono.
        * IMPROVED: El formato para las carpetas de acceso web (WAF)   (por ejemplo, los /files/ carpetas) ha sido actualizado para utilizar una tabla HTML. El nuevo formato imita la versión más reciente del directorio que enumera las páginas web creadas por versiones más recientes de Apache. Los humanos encontrarán que los cambios facilitan la lectura de la información. Software que analiza estos documentos (por ejemplo, software que recoge documentos ISO 19115 deERDDAP) tendrá que ser revisado, pero el nuevo formato será más fácil de analizar que el formato anterior. (Atención, Anna Milan.) 
        * NUEVOoutOfDateDatasets.htmlpágina. ([ejemplo](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) Esta página web muestra una tabla con todos los conjuntos de datos casi en tiempo real que tienen una&lt;testOutOfDateetiqueta (véase infra) , clasificado por cómo fuera de fecha los conjuntos de datos son. Este panel debe ser útil paraERDDAP™administradores y usuarios finales cuando quieren saber qué conjuntos de datos están fuera de fecha. Para conjuntos de datos fuera de la fecha, es presumible que exista un problema con la fuente de datos, de manera queERDDAP™es incapaz de ver/obtener datos de puntos temporales más recientes.
Administradores: Si no desea una página web de Datasets fuera de destino, agregue esto a su setup.xml:
            &lt;outOfDateDatasetsActive convienefalse&lt;/outOfDateDatasetsActive confianza
AhoratestOutOfDatey fuera Columnas de destino en lasallDatasetsDataset.
Gracias a Bob Simons, que ha querido esto durante años, y a la gente inteligente del Instituto Marino de Irlanda que me dio la inspiración a través de su dedicado Raspberry Pi y monitor que siempre muestra una pantalla como esta en su oficina.
        * MEJORADO:.htmlTabley.xhtmlla respuesta ahora es mejor formateado, más compacto, y por lo tanto carga más rápido. Gracias a HTML5 y CSS.
    * NUEVO tipo de archivo de salida para datasets de griddap: .timeGaps. Muestra una lista de lagunas en los valores de tiempo que son mayores que la brecha mediana. ([ejemplo](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) Esto es útil paraERDDAP™administradores y usuarios finales cuando quieren saber si hay brechas inesperadas en los valores de tiempo para un conjunto de datos que se espera tener valores de tiempo espaciados regularmente. Gracias a Bob Simons y Roy Mendelssohn que necesitaban esta característica.
    * IMPROVED: El gráfico predeterminado para elallDatasetsdataset es ahora un mapa con x=maxLon y y=maxLat. Gracias a John Kerfoot, Rich Signell y OOI-CI.
    * NUEVO:[erddapy](https://github.com/ioos/erddapy)- no es unERDDAP™característica, pero será de interés para muchosERDDAP™usuarios. Erddapy (ERDDAP™+Python) es unPythonbiblioteca creada por Filipe Fernandes que "aprovechaERDDAP'sRESTfulservicios web y crea elERDDAP™URL para cualquier solicitud como buscar conjuntos de datos, adquirir metadatos, descargar datos, etc." Gracias a Filipe Fernandes.
    * Debería haber mencionado antes: Hay un paquete R de terceros diseñado para que sea más fácil trabajar conERDDAP™desde dentro R:[rerddap](https://github.com/ropensci/rerddap#rerddap). Gracias[rOpenSci](https://ropensci.org/)y Roy Mendelssohn.
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:**   
     
    * Para hacer: En setup.xml, justo debajo&lt;adminInstitutionilo, por favor agregue un&lt;adminInstitutionUrl título especifica una URL para su institución (o grupo) .
    * TO DO: Estas 3 etiquetas en setup.xml ya no se utilizan:
        &lt;Empieza HeadHtml confidencial,&lt;startBodyHtml]&lt;endBodyHtml. Son reemplazados por
        &lt;startHeadHtml5 confidencial,&lt;startBodyHtml5 confianza y&lt;endBodyHtml5 monedas, que tienen valores predeterminados especificados en los mensajes.xml (y que se indican a continuación) .
        
Recomendamos usar el predeterminado&lt;startHeadHtml5 confianza y&lt;endBodyHtml5 confidencial.
Recomendamos: Si usted hizo cambios en el original&lt;startBodyHtml confidencial y/o desea personalizar suERDDAP™Ahora, por favor, copiar el nuevo&lt;startBodyHtml5 Conf tag (desde abajo) en su configuración.xml y modificarlo para personalizar suERDDAP™asíERDDAP's páginas web reflejan su organización, noNOAA ERD. Notablemente, por favor cambie el "Brought to you by" a su organización (s) . Si necesita ayuda, por favor envíe un correo electrónicoerd.data at noaa.gov. (Si no quieres personalizar tuERDDAP™Ahora, utilice el predeterminado&lt;startBodyHtml5 confía.)
        
Luego eliminar las 3 etiquetas viejas en su setup.xml que ya no se utilizan.

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

Hay maneras adicionales que usted puede[personalizarERDDAP™](/docs/server-admin/deploy-install#customize)Así que...ERDDAP's páginas web reflejan su organización en lugar deNOAA ERD.
        
    * Para hacer:&lt;EDDGrid...&lt;EDDGridIdExample cosechagt;) y el&lt;EDDTable... Ejemplo de etiquetas&lt;EDDTableIdExample bulbgt;) en su archivo setup.xml se utilizan para crear ejemplos en el griddap ytabledapdocumentación. Páginas web de htmlERDDAP.
        
Si no personalizó esas etiquetas, por favor, eliminarlas de su archivo setup.xml. Ahora todos tienen defectos en mensajes.xml que se refieren a conjuntos de datos en Bob'sERDDAP™a https://coastwatch.pfeg.noaa.gov/erddap/index.html . Así que ya no necesita tener conjuntos de datos específicos en susERDDAP. Si desea anular los defectos, copie algunas o todas esas etiquetas en su setup.xml y cambie sus valores.
Si desea que los ejemplos señalen a suERDDAP™, el método más fácil es:
        
        1. Incluya estos dos conjuntos de datos en susERDDAP™agregando esto a tudatasets.xml:
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Añadir esta etiqueta a tu setup.xml, pero cambiar la URL a tuERDDAP's (https?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Si usted personalizó esas etiquetas, déjelas como es y por favor agregue estas 2 nuevas etiquetas a su setup.xml para especificar elERDDAP™URL para estos conjuntos de datos, pero cambiar la URL a suERDDAP's (https?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * Para hacer:ERDDAP™ahora utiliza un archivo css llamado erddap2.css. Si usted hizo cambios a\\[tomcat\\]/webapps/erddap/images/erddap.css, considerar hacer cambios similares a erddap2.css (en el mismo directorio) .
    * NUEVO:ERDDAP's páginas web ahora tienen un gran número de enlaces internos casi invisibles (el texto es negro y no subrayado) . Si pasas por uno de estos enlaces (generalmente las primeras palabras de los epígrafes y párrafos) El cursor se convierte en una mano. Si hace clic en el enlace, la URL es el enlace interno a esa sección del documento. Esto hace fácil referirse a secciones específicas de la documentación. Gracias a Bob Simons, que ha querido esto durante años.
    * NUEVO:ERDDAP™Ahora apoya[Byte Range / Aceptar-Ranges](https://en.wikipedia.org/wiki/Byte_serving)solicitudes de porciones de /files/ archivos. Esto fue necesario para apoyar a los espectadores de audio y vídeo en los navegadores.
    * HACER: Ahora, mejorar la seguridad, si usted especifica&lt;baseHttpsUrl confiar en setup.xml (y, por consiguiente, apoyohttps) , la bandera recomendada Url es unhttpsURL con una bandera más seguraKey. Si es así, cualquier bandera anteriorUrls/flagKeys será inválido. Admins: Si estos cambios se aplican a suERDDAP™y si tuERDDAP™tieneEDDGridFromErddap and EDDTable FromErddap's que se suscriben a distanciaERDDAPs, entonces, después de actualizarERDDAPTuERDDAP™tratará automáticamente de suscribirse con el nuevo flagUrl, por lo que debe eliminar las viejas suscripciones y validar las nuevas suscripciones cuando obtenga los nuevos emails de validación de suscripción.
    * Para hacer:ERDDAP™tieneEDDGridFromErddap datasets for erdVH3 datasets on Bob's coastwatchERDDAP™, por favor cambiarlos para referirse a los nuevos datasets erdVH2018.
    * TO DO: Si usted incluye cualquiera de los conjuntos de datos de la muestra jplAquariusSSS en suERDDAP™Por favor, cambie "V4" en eldatasetIDEs a "V5".
    * Para hacer:actual\\_rangeahora es un atributo estándar CF (de CF-1.7) y claramente dice que si la variable utilizaadd\\_offsety/oscale\\_factorpara empaquetar los valores de datos, luego losactual\\_rangelos valores deben utilizar el tipo de datos desempaquetados y ser valores desempaquetados. Desafortunadamente, esto contradice nuestro consejo anterior. GenerarDatasets Xml ahora desempaqueta paquetesactual\\_rangevalores, pero eso no arreglará los conjuntos de datos existentes en susdatasets.xmlarchivo.
        
Por lo tanto, compruebe sus conjuntos de datos: si los valores de una variable están empaquetados y siactual\\_rangese especifica como valores de datos empaquetados, por favor agregue un&lt;addAttributes■actual\\_rangevalor para especificar los valores desempaquetados. De lo contrario, el conjunto de datos no se cargaráERDDAP. Una manera sencilla y casi perfecta de hacer esto es buscar sudatasets.xmlfuente Atributos que tienen
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
y ascale\\_factorexcepto 1.0. Esos son losactual\\_rangeatributos que podría tener que arreglar.
        
Para variables de eje enEDDGridDatasets,ERDDAP™Siempre estableceactual\\_rangeatributo a ser el rango real de los valores ya que conoce esos valores.
        
Para variables de eje con valores descendentes (por ejemplo, algunas variables de latitud) ,ERDDAP™creadoactual\\_rangecon el\\[0\\]...\\[último\\]valores, que eran altos... bajos. Ahora siempre utiliza valores bajos... altos para hacer la nueva definición de CF.
        
La corrección de laactual\\_rangevalores es particularmente importante para los conjuntos de datos EDDTable, porqueERDDAP™rechazará rápidamente las solicitudes de valores de datos que son inferiores a lasactual\\_rangevalor mínimo o mayor que elactual\\_rangevalor máximo.
        
Relacionado: el real\\_min, actual\\_max,data\\_minydata\\_maxatributos están ahora deprecatados. Por favor, convierta sus conjuntos de datos para usaractual\\_rangeen lugar de eso.
        
    * TODO (opcional, pero recomendado) : Para cada dataset de tiempo casi real y pronóstico en suERDDAP™, por favor añadir un [&lt;testOutOfDate&gt; (/docs/server-admin/datasets#testoutofdate) etiqueta con un valor en la formanow-_nUnits_, por ejemplo,now-2 días. Si el valor máximo de tiempo para el conjunto de datos es mayor que ese valor, el conjunto de datos se considera fuera de plazo y se marcará como tal en el[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)página web. Esto proporciona una manera fácil de ver cuando algo está mal con la fuente de un conjunto de datos.
    *   [NOTICIA: Marcación Semántica de Datasets con json-ld (JSON Datos vinculados) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™ahora utiliza[json-ld (JSON Datos vinculados) ](https://json-ld.org)para hacer su catálogo de datos y conjuntos de datos parte de la[semántica web](https://en.wikipedia.org/wiki/Semantic_Web), que es la idea de Tim Berners-Lee de hacer que el contenido web sea más legible por máquina y máquina "comprensible". Motores de búsqueda ([Google en particular](https://developers.google.com/search/docs/data-types/datasets)) y otras herramientas semánticas pueden utilizar esta marca estructurada para facilitar el descubrimiento e indexación. La marca estructurada json-ld aparece como invisible-a-humanos&lt;script código en el http://.../erddap/info/index.html página web (que es una web semántica[DataCatalog](https://schema.org/DataCatalog)) y en cada http://.../erddap/info/_datasetID_/index.html página web (que es una web semántica[Dataset](https://schema.org/Dataset)) . (Especial gracias a Adam Leadbetter y Rob Fuller del Instituto Marino de Irlanda por hacer las partes difíciles del trabajo para hacer esta parte deERDDAP.) 
    * NUEVO: Hay nuevos tipos de conjuntos de datos que pueden leer datos de archivos de audio:
        [EDDGridDeAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), que trata los datos de audio como datos redondeados.
        [EDDTableDesdeAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), que trata los datos de audio como datos tabulares. Gracias a Jim Potemra, Rich Signell, OOI y Carrie Wall Bell por solicitudes de soporte de archivos de audio/hidrofono.
    * Cambios para GenerarDatasets Xml (y cambios conexos) :
        * NUEVO:ERDDAP™ahora tiene un sistema para automáticamente[Actualizar las URL actualizadas](/docs/server-admin/additional-information#out-of-date-urls)ambos en GenerateDatasets Xml y al cargar conjuntos de datos. Si tiene sugerencias para direcciones URL adicionales que deben ser captadas y actualizadas, o si cree que esto debe ser convertido en un servicio (como los convertidores) , por favor emailerd.data at noaa.gov.
        * NUEVO: Ahora, si GenerarDatasets Xml ve un CFstandard\\_name  (que debe ser todo minúscula) con un carácter de mayúscula, añade la versión de la minúscula a&lt;addAttributes. Además, cuando un conjunto de datos se carga, siERDDAP™ve un CFstandard\\_namecon un carácter superior, lo cambia silenciosamente alstandard\\_name. Gracias a Rich Signell.
        * NUEVO: Ahora, si GenerarDatasets Xml ve un atributo con un tiempo que no está en formato ISO 8601, añade el tiempo formateado ISO 8601 a&lt;addAttributes. SiERDDAP™no reconoce el formato, deja sin cambios el valor del tiempo. Si ves un formato queERDDAP™no reconoce y soluciona, por favor envíelo por correo electrónicoerd.data at noaa.gov.
        * IMPROVED: El código de bajo nivel para elEDDGridDeThredds Opción de catálogo en GenerateDatasets Xml ahora confía en elUnidatanetcdf-java catálogo gateer code (Tredds. Clases de catálogo) para que pueda manejar todos los catálogos de THREDDS (que puede ser sorprendentemente complejo) . Gracias a Roland Schweitzer por sugerir este cambio y gracias aUnidatapara el código.
        * NUEVO: GenerarDatasets Xml paraEDDGridFromDap ahora añade ", startYear-EndYear" al final del título basado en valores reales del eje del tiempo. EndYear="presente" si los datos existen en los últimos 150 días.
        * NUEVO: GenerarDatasets Xml paraEDDGridDeDap ahora añade ",\\[resolución\\]°" al título si el conjunto de datos es uniformemente espaciado y el mismo para lat y lon.
        * IMPROVED: El convertidor de tiempo ahora tiene características adicionales, en particular la capacidad de convertir tiempos de cadena en una amplia variedad de formatos comunes en cadenas ISO 8601 o en un número compatible con UDUnits. Todas las características previamente soportadas siguen funcionando, sin cambios.
        * BUG FIX: GenerarDatasets Xml y el convertidor de Palabras clave ahora incluyen "Earth Science &gt;" al inicio de GCMD Science Palabras clave. Cuando se carga un conjunto de datosERDDAP™,ERDDAP™Ahora fija cualquier palabra clave de GCMD en el atributo de palabras clave que no comience con "Earth Science &gt;" o que use cualquier otra cosa que no sea el caso de título (donde se capitaliza la primera letra de cada palabra) .
        * IMPROVED: When suggesting&lt;destinationName&gt;s, GenerarDatasets Xml para EDDTableDesdeAsciiFiles acaba de utilizar el extremo de la colasourceNames con'/'  (algunos eran nombres de archivo) . Ahora usa todosourceName(por ejemplo, "blahblahblahblah (m/s)". Este cambio será bueno para algunos conjuntos de datos y no para otros, pero es un comportamiento más seguro. Gracias a Maurice Libes.
        * BUG FIX: GenerarDatasets Xml y los constructores de conjuntos de datos aseguran ahora que no hay nombres de columna duplicados. Gracias a Maurice Libes.
        * BUG FIX: GenerarDatasets Xml para EDDTableDesdeAsciiFiles no escribió&lt;columnSeparator confiar a la salida. Ahora sí. Gracias a Maurice Libes.
    * NOTICIA: La herramienta DasDds ahora imprime información de la brecha de tiempo (el[.timeGaps information](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) si el conjunto de datos es un conjunto de datos redondeado.
    * NEW: Advanced Search now accepts "now_\\-nUnits_" time values. Gracias a Rich Signell.
    * IMPROVED: Para mejorar la seguridad, cuando una dirección de correo electrónico en los metadatos de un conjunto de datos o los datos se escriben en una página web html, el "@" es reemplazado por "en ". Esto sólo captura direcciones de correo electrónico que son todos los metadatos o valor de datos, no direcciones de correo electrónico incrustadas en valores más largos.
    * IMPROVED: Para aumentar la seguridad, elRSSinformación para conjuntos de datos privados ahora sólo está disponible para los usuarios (yRSSlectores) que están conectados y autorizados para utilizar ese conjunto de datos.
    * NUEVO: Ahora, cuando se carga un conjunto de datos, sidate\\_created,date\\_issued,date\\_modified, o fecha\\_metadata\\_modified atributo tiene un valor de tiempo que no está en formato ISO 8601,ERDDAP™lo cambia al tiempo formateado ISO 8601. SiERDDAP™no reconoce el formato, deja sin cambios el valor del tiempo. Si ves un formato queERDDAP™no reconoce y soluciona, por favor envíelo por correo electrónicoerd.data at noaa.gov.
    * IMPROVED: .dods responses fromEDDGridAhora los conjuntos de datos deben ser significativamente más rápidos. Gracias a Rich Signell.
    * Cambios relacionados conERDDAP's creación de documentos ISO 19115:
        * BUG FIX: al crear documentos ISO 19115,dataVariableunidades no estaban codificadas HTML Attribute y por ciento codificadas. Ahora lo son. Gracias al validador ISO 19115 de NGDC.
        * BUG FIX: al crear documentos ISO 19115,date\\_createdfue utilizado como es, tan a menudo era el formato equivocado. Ahora se convierte en cadena ISO 8601 Z. Gracias al validador ISO 19115 de NGDC.
        * BUG FIX: al crear documentos ISO 19115,ERDDAP™ahora más tiempo escribe fechas con año=0000 (como con conjuntos de datos sobre climatología) , porque el esquema ISO 19115 no permite fechas con el año=0000. Gracias al validador ISO 19115 de NGDC.
    * NOTICIA: Como antes de una solicitudhttp.../erddap/version devolverá sólo el número de versión (texto) , por ejemplo, "ERDDAP\\_version=1.82".
Ahora, una solicitudhttp.../erddap/version\\_string devolverá un número y un sufijo opcional de '\\_' más texto ASCII (no espacios ni caracteres de control) , por ejemplo, "ERDDAP\\_version\\_string=1.82\\_JohnsFork". La gente que hace el tenedor especificará esto cambiando EDStatic.erddapVersion. Esta forma de hacerlo no causa problemas para versiones anteriores deERDDAP. Gracias a Axiom (notablemente, Kyle Wilcox) Instituto Marino de Irlanda (notablemente, Rob Fuller) .
    * BUG FIX: Para wms version=1.3.0, request=GetMap, crs=EPSG:4326 (no CRS:84) peticiones: la orden bbox debe ser minLat,minLon,maxLat,maxLon. Para CRS:84 peticiones, como antes, bbox order debe ser minLon,minLat,maxLon,maxLat. Esto puede arreglar el usoERDDAP'sWMS1.3.0 servicio enArcGIS  (gracias a Paola Arce) . Gracias. (no) aOGCpor hacer esto tan complicado. GraciasLeafletpara manejar esto correctamente y para darme una manera de probar esto.
    * IMPROVED: Anterior, el enlace sugerido paraRSSy suscripciones de correo electrónico tienehttpURL para suERDDAP. Ahora es elhttpsURL, si eso es activo.
    * NUEVO:EDDGridCopiar ahora soporta una etiqueta opcional&lt;sóloDesde que confía_someValue_&lt;/onlySince confiar, donde el valor es un tiempo específico ISO-8601 o unnow-nUnits (por ejemplo,now-2 años) tiempo. Ver el[sólo Desde la documentación](/docs/server-admin/datasets#onlysince). Gracias a Drew P.
    * MEJORADO: Si está disponible,ERDDAP™mostrará elhttpsURL (de&lt;baseHttpsUrl confidencial, si está disponible) en lugar de lahttpURL cuando le dice a los usuarios la URL para añadir/validar/remove/list una suscripción.
    * BUG FIX:ERDDAP™ahora permite una acción de suscripción para empezar con " https://" . (Bob golpea su frente.) Gracias a Jennifer Sevadjian.
    * BUG FIX:.jsonlKVPahora utiliza ':' entre cada clave y valor, en lugar de'='. (Bob golpea su frente.) Gracias a Alexander Barth.
    * BUG FIX: Anteriormente, si descansabasERDDAP™con quickRestart=true, y si, antes de que el conjunto de datos fuera recargado normalmente, hizo una llamada a un conjunto de datos EDDTableDesdeFiles que utilizó la actualización EveryNMillis, y si un archivo de datos acababa de ser cambiado, la solicitud fallaría con un error de puntero null. Ahora la solicitud tendrá éxito. Gracias a John Kerfoot.
    * NOTICIA: Cuando se carga un conjunto de datosERDDAP™, las palabras clave ahora se reorganizan en orden ordenado y se eliminan los caracteres de nueva línea.
    * Ahora, si un .geoJson,.jsono.ncoJson request has.jsonp parámetro, el tipo de mime de respuesta es aplicación/javascript. Note que.jsonp no está respaldada.jsonlCSVo.jsonlKVPYa que no funcionaría. Gracias a Rob Fuller.
    * IMPROVED: El tipo de mime para el archivo json linesType options is now "application/x-jsonlines". Fue aplicación/jsonl. Actualmente no hay una opción correcta definitiva.
    * IMPROVED: El número de solicitudes fallidas que se muestran en el estado.html página aumentará porque más cosas se cuentan como fracasos que antes, por ejemplo, ClientAbortException.
    * IMPROVED: Ahora, si una respuesta deERDDAP™no está comprimido, entonces el encabezado de la respuesta incluirá "Content-Encoding"= "identidad".
    * IMPROVED: El atributo "license" no era necesario. Ahora, si no se especifica, el estándarLicense de los mensajes.xml (o desde setup.xml si está presente) se utiliza como el predeterminado.
    * NUEVO: Ahora hay un opcional[archivoAccessAtributo Suffix](/docs/server-admin/datasets#fileaccessbaseurl). que se puede utilizar con el existente[fileAccessBaseUrl atributo](/docs/server-admin/datasets#fileaccessbaseurl).
    * IMPROVED: Para aumentar la seguridad, esta versión fue compilada con la últimaJavaJDK v8u162.
    * NOTICIA: Para aumentar la seguridad, varios dominios comunes que ofrecen direcciones de correo electrónico temporales (e.g., @mailinator.com) están ahora en una lista de correo electrónico permanente para el sistema de suscripciones.
    * NOTICIA: Para aumentar la seguridad, las alturas del Informe Diario ahora incluyen:
SetDataset Dirección IP de la bandera (desde el último informe diario)   
SetDataset Dirección IP de la bandera (desde el inicio)   
SetDataset Bandera IP Dirección con éxito (desde el último informe diario)   
SetDataset Bandera IP Dirección con éxito (desde el inicio)   
Los altos "Failed" te permiten ver quién (¿Un hacker?) está tratando de establecer una bandera, pero está fallando.
    * IMPROVED: Para aumentar la seguridad, direcciones de correo electrónico en el&lt;suscripciónEmailBlacklist confiar en sudatasets.xmlse consideran ahora insensibles.
         

## Versión 1.80{#version-180} 
 (publicado 2017-08-04) 

*    **Nuevas características (para usuarios) :**   
     
    * NUEVOorderByCount () filtro le permite especificar cómo se clasificará la tabla de resultados (o no) y sólo devuelve una fila para cada grupo de tipo, con el recuento del número de valores no-misibles para cada variable.
Por ejemplo,orderByCount ("stationID") Lo arreglaremosstationIDy devolver una fila para cadastationID, con un recuento del número de valores no-misibles para cada variable.
Si acaba de especificarorderByCount (") , la respuesta será sólo una fila con el número de valores no pérdidas para cada variable de datos.
Ver el[orderBydocumentación](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)Gracias a Ben Adams.
    * NUEVO.ncoJson file Tipo de opción para conjuntos de datos redondeados y tabulares. Esta opción hace unaNCOlvl=2 "pedantic" archivo JSON con toda la información que normalmente se encuentra en un.ncarchivo. See[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)Gracias a Charlie Zender.
    * BUG FIX: ElorderBy... () opciones en la página Web Make A Graph ahora se manejan correctamente.
    * BUG FIX: .geoJson salida ahora no imprime filas donde faltan los valores de lat o lon. Además, los valores de altitud (si está disponible) se incluyen ahora en las coordenadas, no como valores de datos. Gracias a Jonathan Wilkins.
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:**   
     
    * SEGURIDAD: La biblioteca de protocolos.js utilizada para laOpenLayersdemo en elWMSpáginas enERDDAP™está fuera de la fecha y tiene un fallo que potencialmente permite que se use mal. (Lamentablemente, actualizaciónOpenLayersy protocolos. Js no es fácil.) Eso abre la posibilidad de que se pueda configurar la biblioteca para permitir una vulnerabilidad in situ. Sin embargo, desde entoncesERDDAP™sólo usosOpenLayersen una forma pre-configurada específica y sólo conERDDAP- las fuentes de datos basadas en datos, creemos que no hay vulnerabilidad in situERDDAP's uso deOpenLayersy protocolos.js. Sin embargo, si usted no cree esto, ahora puede desactivar el uso delOpenLayersdemo en elWMSpáginas de tusERDDAP™añadir
```
        <openLayersActive>false</openLayersActive>  
```
a su archivo setup.xml. El defecto es "verdadero". Gracias a Charles Carleton y NCEI.
    * CAMBIOS DE SEGURIDAD: Archivos .jar no utilizados y archivos .jar duplicados (porque también están en netcdfAll.jar) han sido retirados delERDDAP™distribución. Se han actualizado archivos .jar fuera de la fecha. Gracias a Charles Carleton y NCEI.
    * CAMBIOS DE SEGURIDAD: El archivo netcdfAll.jar distribuido conERDDAP™es la última versión (en la actualidad) , pero todavía contiene archivos internos jackson .jar que se sabe que están fuera de la fecha y tienen vulnerabilidades de seguridad, especialmente las bibliotecas Jackson que sólo se utilizan al acceder a fuentes de datos Amazon S3. Si no estás accediendo a datos a través de Amazon S3 (lo sabrías si fueras) , estas vulnerabilidades no son relevantes.
        
Los desarrolladores netcdf-java mantienen que estas vulnerabilidades no son relevantes debido a la forma en que el código netcdf utiliza estas bibliotecas y en cualquier caso sólo sería relevante al acceder a Amazon S3. See[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866). Los creo. Si usted todavía tiene preocupaciones acerca de esto, por favor póngase en contacto con los desarrolladores netcdf-java. (Tenga en cuenta que si usted no cree los desarrolladores netcdf-java y están contemplando no utilizarERDDAP™debido a esto, usted no debe utilizar THREDDS tampoco, porque THREDDS utiliza netcdf-java más fundamental y más extensamente queERDDAP.) 
        
Detalles: El código problemático y las advertencias de vulnerabilidad son:
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
See https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Alto
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
See https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Alto
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml
See https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Alto
See https://nvd.nist.gov/vuln/detail/CVE-2016-3720 - Critical
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
See https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Alto
See https://nvd.nist.gov/vuln/detail/CVE-2016-3720 - Critical
"Para la versión 4.6.10, aws-java-sdk-core tira en la versión 2.6.6.6 de los artefactos jackson-\\*." (correo electrónico de netcdf-java personas) .
Gracias a Charles Carleton y NCEI.
        
    * CAMBIOS COMPILEROS: Si te vuelvesERDDAP™, note que el parámetro -cp classpath necesario para la línea de comandos es ahora mucho más corto que antes. Vea el nuevo ajuste -cp en[esta documentación](/docs/contributing/programmer-guide#development-environment). Gracias a Charles Carleton y NCEI.
    * NEW OPTION in GenerateDatasets Xml: EDDTableDesde Bcodmo, que es sólo para uso interno en BCO-DMO.
Gracias a Adam Shepherd y BCODMO.
    * NEW ATTRIBUTE and FEATURE: Si una columna EDDTable tiene nombres de archivo de archivos de acceso web (por ejemplo, archivos de imagen, vídeo o audio) , puedes añadir
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
para especificar la URL base (final con /) necesario para hacer los nombres de archivo en URL completas. Entonces....htmlTablerespuestas,ERDDAP™mostrará el nombre de archivo como un enlace a la URL combinada (la base Url más el nombre de archivo) .
Si quieresERDDAP™para servir los archivos relacionados, haga un conjunto de datos EDDTableDesdeFileNames para esos archivos (puede ser un conjunto de datos privado) .
Gracias a Adam Shepherd y BCODMO.
    * NUEVA RECOMENDACIÓN DE ATTRIBUTE: Si una columna EDDTable tiene nombres de archivo de archivos accesibles a la web (por ejemplo, archivos de imagen, vídeo o audio) accesible a través de un archivo (por ejemplo,.ziparchivo) accesible a través de una URL, uso
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
para especificar la URL del archivo.
Si quieresERDDAP™para servir el archivo de archivo, haga un conjunto de datos EDDTableDesdeFileNames para ese archivo (puede ser un conjunto de datos privado) .
Gracias a Adam Shepherd y BCODMO.
    * MEJORADOS PARA GenerarDatasets Xml para eliminar las causas de invalid/bad&lt;subsetVariablesSugerencias y duplicado/bad sugieren nombres variables, etc. Gracias a Rich Signell, Adam Shepherd y BCO-DMO.
    * NUEVA OPCIÓN: La información sobre los límites políticos distribuida conERDDAPes de un tercero y algo anticuado. Además, hay límites disputados en varios lugares del mundo, donde diferentes personas tendrán diferentes ideas sobre lo que es correcto. No hacemos nada sobre la corrección de los datos POLÍTICOS BOUNDARIOS que vienen conERDDAP. Si no te gusta la información de límites políticos que viene conERDDAP™, ahora puedes decirERDDAP™para nunca sacar límites políticos añadiendo
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
a su archivo setup.xml. El defecto es "verdadero". Gracias a Raju Devender.
    * NEW METADATA TAG: En eldatasets.xmlpara un conjunto de datos, ahora puede especificar el número predeterminado de color Secciones de barras para undataVariableen gráficos y mapas con
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (default=-1, que dice dejarERDDAP™decidir) . Ver el[color Ajustes de barras](/docs/server-admin/datasets#color-bar-attributes).
    * IMPROVED: el color límite del estado en los mapas era púrpura (Profundo púrpura para ti) . Ahora es gris (entre la frontera nacional gris y la tierra gris) .
    * BUG FIX:&lt;iso19115File confianza y&lt;fgdcFile confiar endatasets.xmlno siempre fueron manejados correctamente. Ahora lo son. Gracias a BCO-DMO.

## Versión 1.78{#version-178} 
 (publicado 2017-05-27) 

*    **Nuevas características (para usuarios) :**   
     
    *    (ninguno)   
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:**   
     
    * IMPROVED: The order of lines in "Major LoadDatasets Time Series" on the status.html page is now newest on top to older at the bottom.
    * BUG FIX:ERDDAP™Ahora escribe.nccsvarchivos con la variable de tiempoactual\\_rangecomo un tiempo ISO-8601 String. Eso arregla el fallo con EDDTableDesdeErddap se analiza información desde un conjunto de datos remoto y desde el archivo quickRestart para todos los conjuntos de datos EDDTableDesde... (El tiempoactual\\_rangeserá incorrecto la primera vez que el conjunto de datos se carga en v1.78 pero correcto después de que se vuelva a cargar, por ejemplo, si usted marca el conjunto de datos.) 

## Versión 1.76{#version-176} 
 (publicado 2017-05-12) 

*    **Nuevas características (para usuarios) :**   
     
    * CHANGE en Tomcat: SolicitudesERDDAP™proveniente de software aparte de navegadores web (por ejemplo,curl, R,Matlab,Python,Java) :
Como con cambios anteriores en versiones de Tomcat (el software de nivel inferior que funcionaERDDAP) desde principios de 2016, más y más de los caracteres en la parte de consulta de la URL de solicitud debe ser[ **Porcentaje codificado** ](/docs/server-admin/datasets#infourl)por razones de seguridad. Los navegadores se encargan de la codificación por ciento para usted. así que usarERDDAP™en un navegador no se afecta a menos que la solicitud se redirija a otroERDDAP.
    * Anteriormente,ERDDAP™tratado **variables** más como números cortos sin firmar que caracteres. Ahora los trata más como un UCS-2 de 1 caracteres (Unicode) Strings. Ver el[documentación](/docs/server-admin/datasets#char). Gracias a Aurelie Briand y al proyecto Argo.
    * Anteriormente,ERDDAP™ofrecido poco apoyo para **caracteres Unicode** encima del personaje #255 en Strings. Ahora, internamente,ERDDAP™soporta plenamente los créditos UCS-2 de 2 bytes (caracteres numerados 0 a 65535) en Strings. Cuando los datos de String se escriben a varios tipos de archivos,ERDDAP™hace lo mejor que puede para apoyar a los carbones de 2 bytes. Otro ejemplo es los archivos .csv queERDDAP™escribe con el charset ISO-8859-1 (a 1-byte charset) Así queERDDAP™escribe cualquier personaje encima del personaje #255 con la sintaxis similar a JSON \\u_hhhh_. See[Data](/docs/server-admin/datasets#string).
    * IMPROVED: In.ncarchivos escritosERDDAP™, variables char a interpretar como Strings tendrá el atributo
         **\\_Encoding=ISO-8859-1**   
In.ncarchivos leídosERDDAP™, las variables de char con "\\_Encoding" se interpretarán como Strings con el charset especificado.
    * REMINDER:ERDDAP™soportes **JSON-como backslash-encoding** de caracteres especiales cuando se especifican las limitaciones de las variables char y String. Así puede solicitar algo como &myString="\\u20ac" cuando desea filas de datos donde myString=€ desde 20ac es la versión hexadecimal del punto de código para el símbolo Euro. Varias fuentes en la web muestran los números de puntos de código para símbolos Unicode, por ejemplo,[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode).
    * Anteriormente,ERDDAP™ofrecieron apoyo limitado **largo entero** variables. AhoraERDDAP™soporta plenamente los largos internamente y hace su mejor esfuerzo al escribir datos largos a varios tipos de archivos. . Ver el[documentación larga](/docs/server-admin/datasets#long). Gracias al Instituto Marino de Irlanda, Craig Risien, Rich Signell, Christopher Wingard y OOI.
    * NUEVO: tipo de archivo de salida para griddap ytabledap: **.nccsv** , que hace unNetCDF-como, ASCII, archivo CSV que también contiene todos los metadatos que serían comparables.ncarchivo. Ver el[NCCSV Especificación](/docs/user/nccsv-1.00). Gracias a Steve Hankin.
    * NUEVO: **orderByClosestfiltro** le permite especificar cómo se clasificará la tabla de resultados y un intervalo (por ejemplo, 2 horas) . Dentro de cada grupo de clase, sólo se mantendrán las filas más cercanas al intervalo. Por ejemplo,orderByClosest ("stationID, tiempo, 2 horas) Lo arreglaremosstationIDy tiempo, pero sólo devolver las filas para cadastationIDdonde el últimoorderBycolumna (tiempo) es más cercano a intervalos de 2 horas. Esta es la cosa más cercanatabledappara anular valores en una solicitud de cuadrícula. Esta opción se puede especificar a través de cualquiertabledapdataset's .html página web, .graph web page, y por cualquier URL que generes. Gracias al Instituto Marino de Irlanda y a Ocean Networks Canadá.
    * NUEVO: **orderByLimitfiltro** le permite especificar cómo se clasificará la tabla de resultados y un número límite (por ejemplo, 100) . Dentro de cada grupo, sólo se mantendrán las primeras filas de 'limit'. Por ejemplo,orderByMax ("stationID, 100) Lo arreglaremosstationID, pero sólo devolver las primeras 100 filas para cadastationID. Esto es similar a la cláusula LIMIT de SQL. Esta opción se puede especificar a través de cualquiertabledapdataset's .html página web, .graph web page, y por cualquier URL que generes. Gracias al Instituto Marino de Irlanda y a Ocean Networks Canadá.
    * NOTICIA: Dos nuevos tipos de archivos de respuesta, **.jsonlCSVy.jsonlKVP** están disponibles para solicitudes de conjuntos de datos redondeados, conjuntos de datos tabulares y muchos otros lugares enERDDAP  (por ejemplo, solicitudes de información sobre conjuntos de datos) . Los archivos son archivos JSON Lines ([ https://jsonlines.org/ ](https://jsonlines.org/)) donde cada línea tiene un objeto JSON separado..jsonlCSVsólo tiene los valores en un formato CSV..jsonlKVPtiene Clave: Pares de valor. Cada línea se mantiene sola. Las líneas no están encerradas en un array o objeto JSON más grande. Por ejemplo, vea[esta solicitud de muestra](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z). Gracias a Damian Smyth, Rob Fuller, Adam Leadbetter, e Instituto Marino de Irlanda.
    * NOTICIA: Hay nueva documentación que describe[ **Cómo acceder a conjuntos de datos privadosERDDAP™via Scripts** ](/docs/user/AccessToPrivateDatasets). Gracias a Lynn DeWitt.
    * IMPROVED: El alcance mínimo del **OpenLayers** mapa fue de 2 grados y ahora es 4 datos pixels. Gracias a Rusty Holleman.
    * IMPROVED: En algunos casos comunes, solicitudes que incluyen **expresión regular** la restricción será procesada mucho más rápido.
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:**   
     
    *    **SLOW PRIMER STARTUP:** La primera vez que empieces esta nueva versión, tomará mucho tiempo paraERDDAP™para cargar todos los conjuntos de datos porque necesita volver a leer todos los ficheros de datos fuente (aunque sólo el encabezado de archivos de datos redondeados) . Si usted mira los registros puede ver mensajes de error diciendo "old/unsupported enhancedVersion" de algunos archivos internos -- eso está bien --ERDDAP™hará las nuevas versiones de los archivos internos. Por favor sea paciente.
    * MEDIDAS:ERDDAP™ahora utiliza el nuevo **Java.time** clases (también conocido como JSR 310) en lugar de Joda para parse String tiempos en tiempos numéricos. Notas:
        * SiERDDAP™repentinamente tiene problemas para analizar tiempos de crianza para un conjunto de datos dado y por lo tanto sólo convierte la mayoría o todo el tiempo a NaN (valores perdidos) , el problema es casi siempre con la fecha Corrección de formato de tiempo que especificó como las "unidades" de la variable. El nuevo sistema a veces necesita una cadena de formato dateTime ligeramente diferente.
        * Si meses numéricos y días en la fechaLas cadenas de tiempo no son 0-padded (por ejemplo, "3/7/2016") , asegúrese de que el formato sólo tiene un solo M y d (por ejemplo, "M/d/yyyy", no "MM/dd/yyyy") .
        * Cambia cualquier especificación de segundos fraccionados que use las maletas inferiores (por ejemplo, el .ss inyyyy-MM-dd'T'HH:mm:ss.) , en el capital S's (por ejemplo,yyyy-MM-dd'T'HH:mm:ss.SSS) .
        *   ERDDAP™no soporta fecha de cadena Formatos de tiempo con dos dígitos años (Sí.) con un siglo implícito (por ejemplo, 1900 o 2000) . Las empresas gastaron miles de millones de dólares arreglando este problema a finales de los 90. Los científicos no deben usar dos años dígitos. Por favor, solucione el archivo fuente (s) por convertir a 4-digit years, luego utilizar yyyyy en la fecha Formato de tiempo.
        * Puedes usar yyyyy o YYYYYY (queERDDAP™convertidos a uuuu) parse 4 dígitos años, incluyendo años negativos, por ejemplo, -4712 (, que es 4713 BC) . Gracias a SeaDataNet, Thomas Gardner y BODC.
        * Por favor, siga utilizando Z dentro de un formato dateTime para conseguirERDDAPpara reducir el tiempo (por ejemplo, Z, +0200, -08, -0800, -08:30) .
        *    **Asegúrese de utilizarJavaversión 1.8.0\\_21 o superior.** 
        * Programadores -- Si escribesJavaprogramas que funcionanERDDAP™código, tienes que eliminar la referencia a joda-time. tarro en el parámetro de ruta de clase.
    * NUEVO:ERDDAP's[ArchiveA Herramienta de conjunto de datos](/docs/server-admin/additional-information#archiveadataset)ahora puede crear[ **Cargos BagIt** ](https://en.wikipedia.org/wiki/BagIt). NCEI puede estandarizar en este formato. Gracias a Scott Cross y John Relph.
    * IMPROVED: Los enlaces para descargar el erddap. la guerra contraERDDAP™páginas web ahora apuntan **GitHub** . (Son enlaces públicos, así que no tienes que unirte a GitHub.) Esto significa descargas mucho más rápidas (hasta 12Mb/s versus 1Mb/s) y pocos problemas con descargas. Gracias a Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney y el Instituto Marino de Irlanda.
    * IMPROVED: The **status.html página y el diario Status Reporte email** ahora incluye una sección "Major LoadDatasets Time Series" que muestra estadísticas sobreERDDAP™al final de cada carga principalDatasets para las últimas 100 cargas principalesDatasets. Gracias a nuestro problemático RAID.
    * NUEVO: nuevo, opcional (pero recomendado) parámetro para EDDTableDeCassandra datasets: [ ** &lt;particiónKeyCSV ** ] (/docs/servidor-admin/datasets#partitionkeycsv) . Gracias a Ocean Networks Canadá.
    * NOTICIA: EDDTableDesdeAsciiFiles ahora soporta ** &lt;columnSeparator ** parámetro. Si null o ", la clase adivinará, como antes, de lo contrario, el primer personaje será utilizado como separador de columnas cuando lea los archivos. Gracias a Sky Bristol y Abigail Benson.
    * Nuevo: el nuevo tipo de conjunto de datos,[ **EDDTableDesdeNccsvFiles** ](/docs/server-admin/datasets#eddtablefromnccsvfiles), puede hacer un conjunto de datos por agregación[NCCSV archivos .csv](/docs/user/nccsv-1.00). Gracias a Steve Hankin.
    * MEJORADO: **EDDTableDeErddap** ahora utiliza.nccsvpara obtener información de distanciaERDDAPs y para el archivo local de esa información de metadatos. Esto permite el soporte completo para los tipos de char y datos largos, y para Unicode (UCS-2) charset para chars y Strings. Gracias al Instituto Marino de Rob Fuller e Irlanda.
    * IMPROVED: EDDTableDesdeErddap yEDDGridDeErddap ahora soporte ** &lt;redirigir&lt;/redirect ** que diceERDDAP™nunca redirigir la solicitud al mando a distanciaERDDAP. El defecto es cierto. Esto es útil cuando el remotoERDDAP™es un privadoERDDAP. Gracias a Damian Smyth, Rob Fuller y al Instituto Marino de Irlanda.
    * MEJORADO:ERDDAP™ahora atrapa **Solicitudes de usuario canceladas** Antes. YERDDAP™Ahora se cierra más rápido porque los hilos de bajo nivel se apagan más rápido. Gracias a nuestro problemático RAID.
    *    **GenerarDatasets Xml:** 
        * NOTICIA: El nuevo EDDType especial "ncdump" imprime un[ncdump](https://linux.die.net/man/1/ncdump)\\-como impresión de la cabecera de un.ncarchivo. También puede imprimir los valores de datos para variables especificadas (o introducir "nada" para no imprimir ningún valor de datos) . Esto es útil porque, sin ncdump es difícil saber qué está en un archivo y por lo tanto qué EDDType debe especificar para GenerateDatasetsXml. Gracias a Craig Risien, Rich Signell, Christopher Wingard y OOI.
        * NUEVO: Para SeaData Datos netos:
Cuando sea apropiado, GenerarDatasets Xml ahora hace una conversión semántica específica utilizando una consulta remota SPARQL: si los metadatos fuente de una variable incluyen un sdn\\_parameter\\_urn, por ejemplo, sdn\\_parameter\\_urn = "SDN:P01::PSLTZ01", GenerateDatasets Xml añadirá el atributo P02 correspondiente, por ejemplo, sdn\\_P02\\_urn = "SDN:P02::PSAL". Si tiene conjuntos de datos que utilizan estos atributos, y si suERDDAP's&lt;categoryAttributes≤ en setup.xml incluye sdn\\_parameter\\_urn y sdn\\_P02\\_urn, los usuarios podrán usarERDDAP™Sistema de búsqueda de categoría para buscar conjuntos de datos con valores específicos de estos atributos. Gracias a BODC y Alexandra Kokkinaki.
        * IMPROVED: GenerarDatasets Xml ahora cambia muchoshttp://referencias en los metadatos ahttps://cuando sea apropiado.
        * IMPROVED: GenerarDatasets Xml ahora intenta adivinar el creador\\_tipo y editor\\_tipo.
        * IMPROVED: Datos de la variableTipos sugeridos por GenerateDatasets Xml será un poco mejor. Gracias a Margaret O'Brien, LTER y EML.
        * IMPROVED: GenerarDatasets Xml es mejor especificar el&lt;cdm\\_data\\_type limit; y añadiendo los atributos relacionados y requeridos (por ejemplo,&lt;cdm\\_timeseries\\_variables trogt;), para que pueda suministrar esa información. Gracias a Rich Signell.
        * IMPROVED: In GenerateDatasets Xml, para conjuntos de datos EDDTable, la sugerencia para&lt;subsetVariablesAhora es mucho más conservador. Gracias a John Kerfoot.
        * IMPROVED: Ifdatasets.xmlpara un conjunto de datos especificafeatureTypepero no cdm\\_data\\_tipo, elfeatureTypeserá utilizado como el cdm\\_data\\_tipo. Gracias a Rich Signell.
        * BUG FIX: generar Datasets Xml ahora sugiere lo correcto&lt;dataType ratio para variables de datos que tienenscale\\_factor,add\\_offsety/o \\_Atributos no firmados.
    * IMPROVED: WhenERDDAP™abre un.ncarchivo que es **más corto** que se supone que (por ejemplo, no fue copiado completamente en su lugar) ,ERDDAP™Ahora trata el archivo como malo. Anteriormente,ERDDAP™devuelto valores perdidos para cualquier parte desaparecida del archivo porque es el comportamiento predeterminado para netcdf-java.ERDDAP™ahora usa ucar.nc2.iosp.netcdf3.N3header.disallowFileTruncation = true; Gracias a nuestro problemático RAID y Christian Ward-Garrison.
    * IMPROVED: el escritor ISO 19115 ahora utiliza **creador\\_tipo** , si está presente.
    * MEJORADO:ERDDAP™ahora utiliza el último netcdf-java v4.6.9 que puede leer tipos adicionales **netcdf-4** . Gracias a Craig Risien, Rich Signell, Christopher Wingard y OOI.
    * BUG FIX: evitar problemas si diferentes archivos fuente tienen diferentes tipos de datos para una variable dada. Gracias a Roy Mendelssohn y Eugene Burger.
    * BUG FIX: **Conversiones de formato de tiempo** ahora están mejor protegidos contra valores de mal tiempo. Gracias a NDBC.
    * BUG FIX:EDDGridFromNcFiles Desempaquetado ahora maneja valores de tiempo con **"meses desde ..." y "años desde ..."** correctamente (al aumentar el mes o el año, no añadiendo crudamente, por ejemplo, 30 días repetidamente) . Gracias a Soda3.3.1.
    * BUG FIX: justo en v1.74, **suscripciones** requiere una acción (por ejemplo,http://...) , que era y debería ser opcional.
    * BUG FIX:EDDGridDeMergeIRFiles.lowGetSourceMetadata () no agregó ningún atributo global. Ahora sí.
         

## Versión 1.74{#version-174} 
 (liberado 2016-10-07) 

*    **Nuevas características (para usuarios) :**   
     
    * Ahora, cuando una Lista de Datasets (Todo, o desde una búsqueda) se muestra en una página web, títulos largos se muestran en múltiples líneas. Anteriormente, el medio de un largo título fue reemplazado por "... ". Gracias a Margaret O'Brien, LTER y EML.
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:**   
     
    * TO DO: En los ordenadores Linux, cambia la configuración de tiempo de Apache para que las solicitudes de usuario que consumen tiempo no tengan tiempo (con lo que a menudo aparece como un error "Proxy" o "Bad Gateway") . Como usuario raíz:
        
        1. Modificar el Apachehttpd.conf file (generalmente en /etc/httpd/conf/) :
Cambio de las existentes&lt;Ajuste de tiempo (o añadir uno al final del archivo) a 3600 (segundos) , en lugar de los 60 o 120 segundos predeterminados.
Cambio de las existentes&lt;ProxyTimeout Conf configuración (o añadir uno al final del archivo) a 3600 (segundos) , en lugar de los 60 o 120 segundos predeterminados.
        2. reiniciar Apache: /usr/sbin/apachectl -k Graceful (pero a veces está en un directorio diferente) .
        
Gracias a Thomas Oliver.
         
    * NUEVO:\\[bigParentDirectory/hard Directorio de banderas
Esto funciona como el directorio de la bandera, pero la versión hardFlag también elimina toda la información de conjunto de datos caché. No hay URLs para establecer un HardFlag. Esto sólo se puede utilizar poniendo un archivo en ese directorio.
duro Las banderas son muy útiles cuando haces algo que causa un cambio en cómoERDDAP™lee e interpreta los datos fuente, por ejemplo, cuando instala una nueva versión deERDDAP™o cuando usted ha hecho ciertos tipos de cambios a la definición de un conjunto de datos endatasets.xml. See[esta documentación](/docs/server-admin/additional-information#hard-flag). Gracias a John Kerfoot y a todos los grupos Argo.
         
    * NUEVO: GenerarDatasets Xml ahora tiene una opción EDDTableDesdeEML
que lee una descripción de conjuntos de datos en un lenguaje de metadatos ecológicos (EML) archivo, descarga el archivo de datos relacionado, y genera un trozo dedatasets.xmlpara que se pueda agregar el conjunto de datosERDDAP. También hay un EDDTableDesdeEMLBatch que hace lo mismo para todos los archivos EML en un directorio. Esto funciona muy bien porque EML hace un excelente trabajo de describir el conjunto de datos y porque KNB y LTER ponen los archivos de datos disponibles.
EML plusERDDAP™podría ser una gran combinación, ya queERDDAP™podría dar a los usuarios un acceso más directo a la riqueza de datos KNB y LTER y ayudar a estos proyectos a cumplir con el gobierno estadounidense[Acceso público a resultados de investigación (PARR) necesidades](https://nosc.noaa.gov/EDMC/PD.DSP.php)poniendo los datos disponibles a través de un servicio web.
See[esta documentación](/docs/server-admin/EDDTableFromEML). Gracias a Margaret O'Brien, LTER y EML.
         
    * NUEVO: GenerarDatasets Xml ahora tiene una opción EDDTableDesdeInPort
que lee una descripción de conjunto de datos en un archivo XML InPort y trata de generar un trozo dedatasets.xmlpara que se pueda agregar el conjunto de datosERDDAP. Esto rara vez crea un trozo listo para usar de XML paradatasets.xml, pero creará un buen borrador duro que es un buen punto de partida para la edición por un humano.
Sería genial si la gente que utiliza InPort para documentar sus conjuntos de datos también utilizaraERDDAP™para hacer los datos reales disponibles a travésERDDAP's servicios web y así conocer el gobierno de EE.UU. yNOAA's[Acceso público a resultados de investigación (PARR) necesidades](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)poniendo los datos disponibles a través de un servicio web. Esta es una solución que podría ser utilizada ahora mismo. (erd.data at noaa.govestá feliz de ayudar.)   
See[esta documentación](/docs/server-admin/datasets#eddtablefrominport). Gracias a Evan Howell y Melanie Abecassis.
         
    * MEJORADO:ERDDAP™ahora utiliza netcdf-java 4.6.6.
Con versiones anteriores, netcdf-java leyó algunos valores de llenado (tal vez, sólo en archivos netcdf-4) como 0's. Ahora lee algunos de ellos como el valor de relleno estándar netcdf: -127 para bytes, -32767 para cortos, -2147483647 para ints.Unidatadice que el nuevo comportamiento es el comportamiento adecuado. Si una variable en un conjunto de datos comienza a mostrar uno de estos valores donde solían mostrar 0's, puede añadir, por ejemplo,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
a la variableaddAttributespara decirERDDAP™tratar ese valor como unmissing\\_value################################################################################################################################################################################################################################################################ Valor. Sin embargo, en muchos casos, que no dará el resultado deseado: 0's. Si es así, considere la modificación de los archivos conNCOo reescribir los archivos. ¿Denuncias? Por favor contacteUnidata;-)
         
    * Para hacer: Nueva TopografíaPaleta de profundidad
Le animo a cambiar todos los conjuntos de datos que utilizan la paleta OceanDepth para utilizar la nueva paleta TopographyDepth, que es como Topografía excepto con los colores volteados, de modo que sea adecuado para valores de profundidad (positive=down) , en lugar de valores de altitud (positivo=up) . Los ajustes recomendados para esta paleta son:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * NEW FEATURE: Stringmissing\\_valuey/o \\_FillValue
Si una variable String define unamissing\\_valuey/o \\_FillValue,ERDDAP™ahora eliminar esos valores de los datos y reemplazarlos con una cadena vacía, de modo que los valores perdidos aparecen como cadenas vacías, como con otros conjuntos de datos enERDDAP. Gracias a Margaret O'Brien, LTER y EML.
         
    * NEW FEATURE: Apoyo a los tiempos locales
variables timetamp con datos fuente de Strings ahora puede especificar una zona horaria a través de un "time\\_zone"atributo que conduceERDDAP™para convertir los tiempos de origen de la zona local (algunos en tiempo estándar, algunos en tiempo de verano) enZuluveces. La lista de nombres válidos de zona horaria es probablemente idéntica a la lista en la columna TZ en[esta tabla](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). El defecto es "Zulu". Las zonas horarias comunes de Estados Unidos son: Estados Unidos/Hawaii, Estados Unidos/Alaska, Estados Unidos/Pacífico, Estados Unidos/Monte, Estados Unidos/Arizona, Estados Unidos/Central, Estados Unidos/Este. Para variables de temporizador con datos de fuente numérica, puede especificar el "time\\_zone"atributo, pero el valor debe ser "Zulu"o "UTC". Gracias a Margaret O'Brien, LTER y EML.
         
    * NUEVA CARACTERÍSTICAS: EDDTableDesdeAsciiFiles ahora soporta archivos separados por semicolon
y es más inteligente para averiguar el separador. Gracias a Margaret O'Brien, LTER y EML.
         
    * NEW FEATURE: Si hay un error significativo en la cargaDatasets (mayor o menor, por ejemplo, un desaparecido o inválidodatasets.xmldocumento) ,ERDDAP™ahora lo indica en el estado.html, justo debajo "n Datasets Failed To Load" como ERROR: mientras que el procesamientodatasets.xml: ver log.txt para detalles.
         
    * NEW FEATURE:ERDDAP™busca huérfanos.
CuandoERDDAP™hace una carga importante Datasets, ahora busca conjuntos de datos huérfanos (datasets that are inERDDAP™pero no endatasets.xml) . Si se encuentra, se enumeran en el estado.html, justo debajo "n Datasets Failed To Load" como ERROR: n Orphan Datasets (datasets inERDDAP™pero no endatasets.xml) =...
Si quieres eliminar (descarga) un huérfanoERDDAP™, necesitas añadir
        &lt;dataset type="_anyValidType_"datasetID="_theDatasetID_" active="false" / confianza
adatasets.xmlhasta que el conjunto de datos se descarga durante la siguiente carga principalDatasets.
         
    * BUG FIX: Si un conjunto de datos tenía una variable de timetamp numérico con unidades distintas"seconds since 1970-01-01T00:00:00Z"y con el&lt;ActualizarTodoNMillis confiar sistema activo, el rango de la variable timetamp se estableció incorrectamente cuando se actualizó el conjunto de datos. Gracias a John Kerfoot.
         
    * BUG FIX: Si&lt;quickRestart fue cierto en setup.xml y solicitó datos de un EDDTable... Dataset de archivos que utiliza&lt;updateEveryNMillis confía, la primera solicitud al conjunto de datos fallaría, pero las solicitudes posteriores tendrían éxito. Ahora la primera solicitud no fallará. Gracias a John Kerfoot.
         
    * BUG FIX: El GenerateDatasetsXml.sh y .bat no trabajaron con los parámetros √9 en la línea de comandos. Ahora lo hacen. Gracias a John Kerfoot.
         
    * BUG FIX: El nuevo EDDTableDeMultidimNcFiles no removió consistentemente los espacios de seguimiento de las cuerdas. Ahora sí. Notablemente, esto afecta los archivos ARGO. Gracias a Kevin O'Brien y Roland Schweitzer.
         
    * BUG FIX: Todo el acceso a distanciaDAPservicios es iniciado ahora por un código más moderno. Esto corrige el error "conexión cerrada" al acceder a algunos datasets EDDTableDesdeErddap. Gracias a Kevin O'Brien.
         
    * BUG FIX: El manejo deorderBy... () y distintas () están ahora de vuelta a la forma en que fueron antes de los cambios recientes: una solicitud dada puede tener múltiplesorderBy... () y/o una diferencia () filtro;ERDDAP™los manejará en el orden que se especifica. Gracias a David Karuga.
         
    * BUG FIX: Si el conjunto de datos es EDDTableDesdeDatabase y una consulta tiene[sourceCanOrderBy](/docs/server-admin/datasets#sourcecanorderby)y/o[sourceCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct), entonces la base de datos puede (dependiendo de la configuracióndatasets.xml) en parte o completamente manejar **sólo la primera**  orderBy.. () o bien distintos () . Gracias a David Karuga.
         
    * BUG FIX: La reciente codificación extra por ciento causó problemas con algunas consultas para.ncArchivos CF, por ejemplo, "HTTP Status 500 - Error de consulta: variable=estación se enumera dos veces en la lista de variables de resultados". Gracias a Kevin O'Brien.
         
    * BUG FIX: EDDTableDesdeFiles tenía problemas para recargar un conjunto de datos cuando una de las columnas era una verdadera columna de carbón. Gracias a Roland Schweitzer.
         
    * BUG FIX:EDDGridFromNcFiles Desempaquetado ahora también convertidosmissing\\_valuey \\_FillValue a valores estándar para que los archivos con diferentes valores puedan ser agregados. Debido a este cambio, después de instalar esta nueva versión deERDDAP™, por favor establece un[duro Bandera](/docs/server-admin/additional-information#hard-flag)para cada unoEDDGridFromNcFiles Conjunto de datos sin empaquetar en suERDDAP.
         
    * IMPROVED: EDDTableDesdeNcCFFiles ahora puede manejar archivos que tienen múltiples muestras\\_demension's. Un conjunto de datos dado sólo debe utilizar variables que usen una de las muestras\\_dimensiones. Gracias a Ajay Krishnan.
         
    * IMPROVED: Para EDDTableDesde...&lt;kindFilesBySourceNames ahora permite separar el coma (recomendado) o listas separadas del espacio de nombres de fuentes variables. En cualquier caso, los nombres variables individuales pueden estar rodeados de citas dobles, por ejemplo, si el nombre tiene un espacio interno.

## Versión 1.72{#version-172} 
 (liberado 2016-05-12) 

*    **Nuevas características (para usuarios) :** Ninguno.
     
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * NUEVA EDDTableDeMultidimNcFiles[EDDTableDesdeMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles)es una nueva alternativa a EDDTableDesdeNcFiles. Está diseñado para tratar con grupos de archivos con varias variables con dimensiones compartidas, por ejemplo, var1\\[a\\]\\[b\\], var2\\[a\\], var3\\[b\\]ScalarVar. Gracias al Proyecto Argo, Aurélie Briand y Roland Schweitzer.
    * BUG FIX:ERDDAP™  (a través de clases FileVisitorDNLS y FileVistorSubdir) ahora sigue enlaces simbólicos en Linux.ERDDAP™Todavía no sigue .lnk en Windows.
    * BUG FIX de fallo introducido en 1.70: diferencia +orderByno se permitían juntos en una sola petición. Ahora están de nuevo. No son mutuamente excluyentes o redundantes. Gracias a David Karuga.
    * CHANGE todatasets.xmllista negra de direcciones IP:
IP v4 direcciones parecenERDDAP™como 4 números de hex separados del período.
Creo que las direcciones IP v6 aparecen como 8 números de hex separados por colon.
Así que...ERDDAP™ahora soporta los colones en las direcciones IP en esa lista y :\\* al final de la lista para bloquear una gama de direcciones.
    * MEJORADO:ERDDAP™ahora utiliza NetcdfFileWriter para escribir.ncarchivos en lugar de la NetcdfFileWriteable deprecated. No debe haber ningún cambio discernible en los archivos resultantes. Esto abre la posibilidad de hacer grande.ncarchivos que utilizan.nc3 extensiones de 64 bits. Si desea/necesita eso, por favor envíe una solicitud aerd.data at noaa.gov.
    * IMPROVED: Muchos de los enlaces a sitios web remotos no estaban actualizados. Ahora están actualizados y utilizanhttps:en lugar dehttp: siempre que sea posible.
    * Muchos pequeños cambios.

## Versión 1.70{#version-170} 
 (liberado 2016-04-15) 

*    **Nuevas características (para usuarios) :** Ninguno.
     
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** A continuación, hay varios cambios recomendados a la documentación en su archivo setup.xml.
Por favor, haga estos cambios ahora.
30 minutos de trabajo ahora puede ahorrarle horas de confusión en el futuro.
    * Corrección de errores: El problema es que las solicitudes se reorientan hacia un control remotoERDDAPfalló con un carácter inválido|Mensaje de error. Esto sólo ocurrió con versiones recientes de Tomcat. Gracias a Rusty Holleman, Conor Delaney y Roy Mendelssohn.
    * Corrección de errores:ERDDAP™ahora utiliza una versión actualizada de netcdf-java (Es una larga historia) que incluye soporte actualizado para NcML, que fija el problema con NcML LogicalReduce no trabajar como se esperaba. Puede haber algunos pequeños cambios en los metadatos queERDDAP™reads via netcdf-java from.nc,.hdf, .grib, y archivos .bufr. Gracias a Favio Medrano.
    * El nuevo[EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows)permite hacer un conjunto de datos EDDTable fusionado de dos o más conjuntos de datos EDDTable que tienen las mismas variables de datos utilizando las mismas unidades. Gracias a Kevin O'Brien.
    * Nuevas opciones para EDDTableDesdeDatabase ([sourceCanOrderBy](/docs/server-admin/datasets#sourcecanorderby)y[sourceCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)) le permite especificar siERDDAP™, la base de datos, o ambos, manejar diferenciado yorderBy  (y todas las variantes) limitaciones. Gracias a David Karuga.
    * Ahora puede hacer que los gráficos y metadatos de un conjunto de datos privado estén disponibles para el público a través del nuevo [&lt;grafitasAccesible a confiarpublic&lt;/graphsAccessible a confiar] (/docs/servidor-admin/datasets#graphsaccesibleto) tag. Gracias a Emanuele Lombardi.
    * Ahora, si una cuerda pasa a GenerateDatasets Xml o DasDds están rodeados de citas dobles, no se cita (como si fuera una cadena JSON) . Gracias a John Kerfoot y Melanie Abecassis.
    * GenerarDatasets Xml ahora soporta "default" para obtener el predeterminado y "nada" para obtener una cadena vacía (trabajan con o sin citas) . Esto resuelve algunos problemas relacionados con pasar cadenas vacías.
    * Ahora, en GenerateDatasets Xml, para todosEDDGridDeFiles y EDDTable De Files datasets, si la muestra FileName que especifica es "" (la cuerda vacía) , utilizará el último archivo de coincidenciaName del directorio + regex + recursive=true.
    * Actualizado: El código de visualizaciónInBrowser que se utiliza para mostrar los resultados de GenerateDatasetsXml y DasDds en ordenadores Linux estaba fuera de fecha y dio un extraño mensaje sobre Netscape. Ahora, esto utiliza una moderna herramienta Linux: xdg-open. Gracias a Melanie Abecassis.
    * ElallDatasetsDataset ahora tiene un"files"columna, que indica la URL base del enlace /files (si hay uno) para el conjunto de datos.
    * Aumente la seguridad general de suERDDAP™cambiando los permisos asociados con el directorio tomcat y la granDirectoría de Parent:
         (Los comandos actuales a continuación son para Linux. Para otros sistemas operativos, haga cambios análogos.) 
        * Cambiar el "grupo" para ser tomcat, tu nombre de usuario, o el nombre de un pequeño grupo que incluye tomcat y todos los administradores de Tomcat/ERDDAP, por ejemplo,
chgrp -R _yourUserName_ apache-tomcat-_8.0.23_
chgrp -R _your UserName bigParentDirectory_
        * Cambiar permisos para que tomcat y el grupo hayan leído, escriban, ejecuten privilegios, por ejemplo.
chmod -R ug+rwx apache-tomcat-_8.0.23_
chmod -R ug+rwx _bigParentDirectory_
        * Eliminar los permisos del usuario "otro" para leer, escribir o ejecutar:
chmod -R o-rwx apache-tomcat-_8.0.23_
chmod -R o-rwx _bigParentDirectory_
Esto es importante, porque evita que otros usuarios lean información posiblemente sensible enERDDAP™Configuración de archivos, archivos de registro y archivos con información sobre conjuntos de datos privados.
    * El sistema de autenticación/login fue renovado. Gracias a Thomas Gardner, Emanuele Lombardi, y al nuevo gobierno estadounidense[HTTPS-Only Standard](https://home.dotgov.gov/management/preloading/dotgovhttps/).
        * Se removió la opción autenticación=abierto. Estaba fuera de la fecha.
        * El nuevo, recomendado,[autenticación=google](/docs/server-admin/additional-information#google)usos de la opción Google Sign-In (basado en OAuth 2.0) para permitir a cualquiera con una cuenta de correo electrónico de Google (incluido Cuentas gestionadas por Google como@noaa.gov) para entrar.
        * El nuevo,[autenticación=email](/docs/server-admin/additional-information#email)opción es un respaldo para autenticación=google. Permite a los usuarios con&lt;etiqueta usuarias endatasets.xmlpara iniciar sesión enviándoles un correo electrónico con un enlace especial.
        * En su configuración.xml, por favor cambie la descripción para&lt;autenticación
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * En su setup.xml, por favor agregue esto justo debajo del&lt;autenticación etiqueta
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * Ahora, los usuarios que no están conectados pueden usarhttpohttpsURLs (si usted ha establecido&lt;baseHttpsUrl confianza en su setup.xml). Gracias al nuevo gobierno de Estados Unidos[HTTPS-Only Standard](https://https.cio.gov/).
        * Ahora, puede animar a todos los usuarios a usarhttps  (nohttp) por configuración&lt;baseUrl] ser unhttpsURL. Para obligar a los usuarios a utilizar sólohttps, también debe hacer cambios en su configuración Apache/Tomcat para bloquear no-httpsacceso. Gracias al nuevo gobierno de Estados Unidos[HTTPS-Only Standard](https://https.cio.gov/).
            
En su configuración.xml, por favor cambie la descripción para&lt;baseUrl era
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * Las opciones&lt;passwordEncoding cambió. En su configuración.xml, por favor cambie la descripción para&lt;passwordEncoding
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * En su configuración.xml, por favor cambie la descripción para&lt;baseHtpsUrl era
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * Ahora, si la listaPrivadaDatasets=true in setup.xml, se mostrará aún menos información sobre conjuntos de datos a los que un usuario no tiene acceso.
    * Ahora, especialmente para cuando usted está preparando inicialmente suERDDAP, ahora puedes decirERDDAP™no intentar suscribirse a distanciaERDDAP™Datasets. Gracias a Filipe Rocha Freire.
En su configuración.xml, justo antes&lt;fontFamily confiar, por favor añadir
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * En su configuración.xml, en las instrucciones anteriores&lt;emailDesde Address confiar, inserte:
Si es posible, configurar esto para utilizar una conexión segura (SSL / TLS) al servidor de correo electrónico.
Si su configuración no está usando una conexión segura al servidor de correo electrónico, por favor haga los cambios para hacerlo así.
    * En tudatasets.xml, por favor añadir esta línea a la descripción de&lt;suscripciónEmailBlacklist confiar en sudatasets.xml:
Puedes usar el nombre "\\*"a la lista negra de todo un dominio, por ejemplo,\\*@example.com .
    * Desde el cambio al sistema de registro en v1.66, el archivo de registro nunca está actualizado. Siempre hay mensajes o partes de mensajes esperando ser escritos en el archivo de registro. Ahora, puedes hacerlo actualizado. (para un instante) viendo suERDDAP's status web page at http://_your.domain.org_/erddap/status.html .
    * HashDigest...
    * Un pequeño cambio (a String2.canical) que debe ayudar a mantener las cosas en movimiento rápidamenteERDDAP™está muy ocupado y también mejor tratar con un gran número de conjuntos de datos.
    * Fuertemente Recomendado: dejar de usar&lt;convertToPublicSourceUrl dentrodatasets.xmlconvertir un número IP en un conjunto de datos&lt;sourceUrl■ (por ejemplo, http://192.168.#.#/ ) en un nombre de dominio (por ejemplo,http:my.domain.org/) . Desde ahora, nuevas suscripciones a http://localhost , http://127.0.0.1 , y http://192.168.#.# URLS no se permite por razones de seguridad. Por favor, utilice siempre el nombre de dominio público en el&lt;sourceUrletiqueta (si es necesario debido a problemas del DNS) Puedes usar el[/etc/hosts tabla en su servidor](https://linux.die.net/man/5/hosts)para resolver el problema mediante la conversión de nombres de dominio locales a números IP sin utilizar un servidor DNS. Usted puede probar si un nombre de dominio dado se resuelve correctamente utilizando
ping _some.domain.name_
    * En generarDatasets.xml, para conjuntos de datos remotos (por ejemplo, desde un servidor de THREDDS) , el generado automáticamentedatasetIDs no se cambian para la mayoría de los dominios. Para algunos dominios, la primera parte (es decir, el nombre) del generado automáticamentedatasetIDserá un poco diferente. Notablemente, los nombres que tenían una parte ahora son más propensos a tener dos partes. Por ejemplo, datasets from http://oos.soest.hawaii.edu con anterioridaddatasetIDque comenzó con hawaii\\_, pero ahora conduce adatasetIDque empieza con hawaii\\_soest\\_. Si esto causa problemas para usted, por favor envíeme un correo electrónico. Puede haber una solución de trabajo.
    * El controlador Cassandra fue actualizado a cassandra-driver-core-3.0.0.jar y por lo tanto para Cassandra v3. EDDTableDesdeCassandra no aprovecha ninguna nueva funcionalidad en Cassandra v3. Los índices en Cassandra ahora pueden ser más complejos, peroERDDAP™todavía utiliza el modelo índice Cassandra v2, que supone que una columna indexada puede ser directamente preguntada'='limitaciones. GenerarDatasets Xml para EDDTableDesdeCassandra ya no detecta columnas con índices; si un índice es simple, es necesario especificarlo endatasets.xmla mano. Si necesita soporte para índices más complejos u otras características nuevas, por favor envíe un correo electrónicoerd.data at noaa.gov.
&#33;&#33;&#33; Si sigues usando Cassandra 2.x, por favor sigue utilizándoteERDDAP™v1.68 hasta que se actualice a utilizar Cassandra 3.x.
    * Jars y el Classpath -- Casi todos los archivos .jar incluidos de terceros fueron actualizados a sus últimas versiones.
        * slf4j.jar fue agregado a /lib y el ciclista.
        * Joid. Jar y Tsik. el frasco fue retirado de /lib y el ciclista.
        * Si recibes mensajes de error sobre clases no encontradas cuando compilas o corresERDDAP™o una de sus herramientas, compare el cursor de su línea de comandos aERDDAP's[Clase actual](/docs/contributing/programmer-guide#development-environment)para averiguar qué .jars están desaparecidos de tu compañero de clase.

## Versión 1.68{#version-168} 
 (publicado en 2016-02-08) 

*    **Nuevas características (para usuarios) :** Ninguno.
     
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    *   [EDDGridFromFiles Aggregation via Nombres de Archivo o Metadatos Globales](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)--
Todas las variaciones deEDDGridDeFiles ahora puede agregar un grupo de archivos añadiendo una nueva dimensión más izquierda, generalmente el tiempo, basado en un valor derivado de cada nombre de archivo o del valor de un atributo global que está en cada archivo.
    * IMPROVED: Anteriormente sugerimos que le gustaría crear unEDDGridDeErddap dataset en sudatasets.xmlque hizo referencia y reservó el jplMURSST dataset en nuestroERDDAP. Dado que ahora hay una versión más nueva de ese conjunto de datos, ese conjunto de datos está ahora deprecado. Así que si tienes ese conjunto de datos en tuERDDAP™, por favor agregue este nuevo conjunto de datos
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Si quieres quitar el viejo jplMURSST dataset desde suERDDAP™  (Es tu elección) , cambiar su entorno activo de "verdad" a "falso".
    * Corrección de errores: Por favor, compruebe el directorio grandeParent que especificó en su setup.xml. Si no pusiste un slash al final del&lt;bigParentDirectory título título, entoncesERDDAP™habrá creado varios directorios por palabras inminentes directamente al nombre que especificó, en lugar de crear subdirectorios. Empezando con la versión 1.68,ERDDAP™añade un slash al final del nombre del directorio si no especificaste uno. Así que si antes no especificaste un corte al final, entonces cuando instalasERDDAP™v1.68 usted necesita moverse y renombrar a esos directorios **después** Tú cierras el viejoERDDAP™y **antes** Usted comienza la nuevaERDDAP. Por ejemplo, si usted especificó erróneamente BigParentDirectory como /home/erddapBPD (No hay golpes de rastreo) yERDDAP™ha creado con error directorios como
/home/erddapBPDcache
/home/erddapBPDcopy
/home/erddapBPDdataset
/home/erddapBPDflag
/home/erddapBPDlogs
/home/erddapBPDlucene
y un archivo llamado /home/erddapBPDsubscriptionsV1.txt,
entonces necesitas moverte y renombrarlos para ser
/home/erddapBPD/cache
/home/erddapBPD/copy
/home/erddapBPD/dataset
/home/erddapBPD/flag
/home/erddapBPD/logs
/home/erddapBPD/lucene
y /home/erddapBPD/subscriptionsV1.txt
    * Corrección de errores: Había errores enEDDGridLonPM180 enERDDAP™v1.66 que ocurrió cuando el conjunto de datos del niño es unEDDGridDe Eddap.
    * Corrección de errores: Había un error enEDDGridDeFiles y EDDTable DesdeFiles enERDDAP™v1.66 que causó&lt;ActualizarTodoNMillis confiar para ser ignorado la primera vez que el conjunto de datos fue cargado después de un reinicio.
    * Corrección de errores/Nueva función: Si un conjunto de datos infantilEDDGridAggregateExistingDimension,EDDGridCopiado,EDDGridDeEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy, o EDDTableEDDGrides un ...DeErddap dataset, que par ...ERDDAP™Dataset. Si el subyacenteERDDAP™dataset está en el mismoERDDAP™, la suscripción y su validación se hacen directamente; no recibirá un correo electrónico pidiéndole que valide la suscripción. De lo contrario, si el sistema de suscripción para suERDDAP™está apagado,&lt;reloadEveryNMinutes confiar ajuste para el conjunto de datos de los padres a un número pequeño (¿60?) para que se mantenga al día.
    * Corrección de errores/Nueva función: Si un conjunto de datos infantilEDDGridAggregateExistingDimension,EDDGridCopiado,EDDGridDeEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy, o EDDTableEDDGridtiene activo="falso", que el conjunto de datos infantil ahora se salta.

## Versión 1.66{#version-166} 
 (publicado en 2016-01-19) 

*    **Nuevas características (para usuarios) :** 
    * Gráficos (no mapas) ahora puede tener valores descendentes en los ejes. Para obtener esto cuando se utiliza una página web Make A Graph, cambie el eje Y nuevo : ajuste ascendente (por defecto) a descender. O, en una URL que solicita un gráfico, utilice el nuevo 3er opcional '|' parámetro para el[&quot; x Rango y/o &quot; . interruptores de yRange](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands), que no puede ser nada (por defecto) , verdadero, o t para obtener valores ascendentes, o utilizar falsos o f para obtener valores descendentes. El verdadero|falsos valores son insensibles. Gracias a Chris Fullilove, John Kerfoot, Luke Campbell y Cara Wilson.
    * Los usuarios ahora pueden especificar el color de fondo para gráficos añadiendo un &quot;bgColor=0x_ AARRGGBB_ cambia a la URL que solicita el gráfico. Ver .bgColor en la sección Comandos Gráficos de la[griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)y[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)documentación. Gracias a John Kerfoot y Luke Campbell.
    * Para conjuntos de datos tabulares, las limitaciones pueden ahora referirse a min (_someVariableName_) o max (_someVariableName_) . See[min () y máx () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min). Gracias a John Kerfoot.
    * Para conjuntos de datos tabulares, limitaciones de tiempo que utilizan[Ahora](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)ahora puede especificar unidades de tiempo de milisegundos o milis.
    * Una solicitud para una imagen de un conjunto de datos tabular ahora hace un mapa (no un gráfico) si las variables x y y son variables de longitud y latitud (Unidades compatibles) . Gracias a Rich Signell.
    * Corrección de errores: etiquetas de eje del tiempo y garrapatas a veces tenían irregularidades extrañas al solicitar múltiples gráficos simultáneamente (por ejemplo, en una página web) . El problema era un error en la biblioteca gráfica SGT queERDDAP™uso (una variable era "estática" que no debería haber sido) . Gracias a Bradford Butman.
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * Es un riesgo de seguridad para poner su contraseña de correo electrónico en un archivo de texto simple como setup.xml. Para mitigar ese problema, le recomendamos encarecidamente que:
        1. Configurar una cuenta de correo electrónico sólo paraERDDAPEs uso, por ejemplo, erddap@suInstitution.org. Eso también tiene otros beneficios; en particular, más de unoERDDAP™administrador entonces se puede dar acceso a esa cuenta de correo electrónico.
        2. Haga los permisos del archivo setup.xml rw (read+write) para el usuario que ejecutará Tomcat yERDDAP™  (user=tomcat?) y sin permisos (no leer ni escribir) para el grupo y otros usuarios. Gracias a Filipe Rocha Freire.
    * El nuevo[ArchiveADataset](/docs/server-admin/additional-information#archiveadataset)herramienta simplifica la fabricación de.tar.gzarchivo con un subconjunto de un conjunto de datos en un formato que es adecuado para archivar (en particular,NOAA's NCEI) . Esto debería ser útil para muchosERDDAP™administradores en muchas situaciones, pero especialmente para grupos dentroNOAA.
    * El nuevo tipo de dataset[EDDGridFromNcFilesUnpacked](/docs/server-admin/datasets#eddgridfromncfilesunpacked)es una variante deEDDGridDe NcFiles. La diferencia es que esta clase desempaqueta cada archivo de datos antesEDDGridDesdeFiles mira los archivos:
        
        * Desempaqueta variables empaquetadas que usanscale\\_factory/oadd\\_offset.
        * Promueve variables enteros que tienen atributos \\_Unsigned=true a un tipo de datos entero más grande para que los valores aparezcan como valores no identificados. Por ejemplo, un byte \\_Unsigned=true (8 bit) variable se convierte en un corto firmado (16 bits) variable.
        * Convierte \\_FillValue ymissing\\_valuevalores para ser de NaN (o MAX\\_VALUE para tipos de datos enteros) .
        
La gran ventaja de esta clase es que proporciona una manera de lidiar con diferentes valores descale\\_factor,add\\_offset, \\_FillValue, omissing\\_valueen diferentes archivos en una colección. De lo contrario, tendría que usar una herramienta como[NcML](/docs/server-admin/datasets#ncml-files)o[NCO](/docs/server-admin/datasets#netcdf-operators-nco)para modificar cada archivo para eliminar las diferencias para que los archivos puedan ser manejadosEDDGridDe NcFiles. Para que esta clase funcione correctamente, los archivos deben seguir los estándares CF para los atributos relacionados. Gracias a Philippe Makowski.
    * El nuevo tipo de dataset[EDDGridLonPM180](/docs/server-admin/datasets#eddgridlonpm180)le permite cambiar los conjuntos de datos que tienen algunos valores de longitud superior a 180 (por ejemplo, el rango 0 a 360) en conjuntos de datos con valores de longitud dentro del rango -180 a 180 (Longitud Plus o menos 180, por lo tanto el nombre) . La gran ventaja de ofrecer conjuntos de datos con valores de longitud en el rango -180 a 180 es queOGCservicios (por ejemplo,WMS) requieren valores de longitud en esta gama. Gracias a Lynne Tablewski, Fabien Guichard, Philippe Makowski y Martin Spel.
2016-01-26 Actualización: Eeek&#33; Esto tiene un fallo que ocurre cuando el conjunto de datos del niño es unEDDGridFromErddap que hace referencia a un conjunto de datos en el mismoERDDAP. Este bicho está arregladoERDDAP™v1.68.
    * In[GenerarDatasetsXml](/docs/server-admin/datasets#generatedatasetsxml), un nuevo tipo de conjunto de datos especial,EDDGridLonPM180DeErddapCatalog, le permite generar eldatasets.xmlparaEDDGridLonPM180 conjuntos de datos de todos losEDDGriddatasets in anERDDAPque tienen valores de longitud superiores a 180.
    * Para todosEDDGriddatasets, indatasets.xmlahora puede utilizar el opcional
[&lt;accesible ViaWMS.|falso&lt;/accesible ViaWMS&gt; (/docs/servidor-admin/datasets#accesibleviawms)   (default=true) . Estableciendo esto para falsear por la fuerzaWMSservicio para este conjunto de datos. Si es cierto, el conjunto de datos todavía no puede ser accesible a través deWMSpor otras razones (por ejemplo, no hay ejes lat o lon) . Esto es particularmente útil para conjuntos de datos que existen por sí mismos y envueltos porEDDGridLonPM180, por lo que sólo la versión LonPM180 es accesible a través deWMS.
    * En setup.xml, puede especificar un color predeterminado diferente para el fondo de los gráficos. El color se especifica como un valor hexadecimal de 8 dígitos en la forma 0x_AARRGGBB_, donde AA, RR, GG y BB son los componentes opacidad, rojo, verde y azul, respectivamente, especificados como números hexadecimal de 2 dígitos. Tenga en cuenta que el lienzo es siempre blanco opaco, así que (semi -) transparente color de fondo gráfico se mezcla en el lienzo blanco. El predeterminado es azul claro:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Gracias a John Kerfoot y Luke Campbell.
    * En setup.xml, ahora puede especificar el tamaño máximo para el[archivo de registro](/docs/server-admin/additional-information#log)  (cuando se renombra para registrar. Txt. anterior y un nuevo registro. txt se crea) En MegaBytes. El mínimo permitido es 1. El máximo permitido es 2000. El predeterminado es 20 (MB) . Por ejemplo:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * Indatasets.xml[&lt;fgdcFile] (/docs/servidor-admin/datasets#fgdcfile) o&lt;iso19115File título] (/docs/server-admin/datasets#iso19115file) ahora puede ser un archivo local (como antes) o una URL (que se descargará por lo que hay una copia local) . SiERDDAP™no puede descargar el archivo, la carga del conjunto de datos continuará pero el conjunto de datos no tendrá un archivo fgdc o iso19115.
    *   EDDGridDeFiles y EDDTable DeFiles datasets ahora puede hacer un rapidRestart (el sistema queERDDAP™intenta utilizar cuando los conjuntos de datos se cargan primero cuandoERDDAP™está descansado) . Esto acelera el reinicioERDDAP.
2016-01-26 Actualización: Eeek&#33; Esto tiene un fallo que causa&lt;ActualizarTodoNMillis confiar para ser ignorado la primera vez que el conjunto de datos se carga después de un reinicio. Este bicho está arregladoERDDAP™v1.68.
    * Una mejora general del sistema QuickRestart permiteERDDAP™para cargar conjuntos de datos más rápido cuandoERDDAP™está descansado.
    * TodosEDDGridDeFiles y EDDTable DeFiles subclases ahora aceptan un nuevo&lt;pathRegex ratio, generalmente especificado justo debajo&lt;recursivo. Si recursivo es "verdad", sólo los subdirectorios completos que coinciden con el caminoRegex (default=.\\*") será aceptado. Del mismo modo, a&lt;sourceUrletiqueta en unEDDGridAggregateExistingDimension ahora puede incluir un atributo pathRegex (default=.\\*") .
    * Por defecto&lt;parcialRequestMaxBytes confía en setup.xml es ahora 490000000 (~490 MB) . Esto evita algunos problemas/tiempos relacionados con obtener datos de los servidores de datos de THREDDS. Gracias a Leslie Thorne.
    * Un pequeño cambio en el sistema de registro debe permitirERDDAP™ser más sensible cuando es muy, muy ocupado. La información ahora está escrita al archivo de registro en la unidad de disco en pedazos bastante grandes. La ventaja es que esto es muy eficiente...ERDDAP™nunca bloqueará la espera de que la información sea escrita al archivo de registro. La desventaja es que el registro casi siempre terminará con un mensaje parcial, que no se completará hasta que se escriba el siguiente trozo.
    * Corrección de errores relacionados con la inotización y [&lt;actualizar EveryNMillis confiar] (/docs/servidor-admin/datasets) sistema paraEDDGridDeFiles y EDDTable DeFiles datasets: Ya no es necesario especificar una gran cantidad de fs.inotify.max\\_user\\_watches o fs.inotify.max\\_user\\_instances. Hay un error enJavaque causa algunas partes deJava's inotify/WatchDirectory system to be not waste collected when they are finalized; eventually, the number of zombie inotify watches or instances would exceed the maximum number specified.ERDDAP™ahora trabaja alrededor de estoJavabicho.
También, el número de hilos inotify está listado en el estado.html página web, por lo que puede mantener un ojo en su uso. Típicamente, hay 1 hilo de inotificar porEDDGridDeFiles y EDDTable DeFiles Dataset.
    * Corrección de errores: en muchos lugares, en lugar de un error que se está recuperando, se generó un nuevo error que sólo incluyó una versión corta del mensaje de error original y sin el rastro de la pila. Ahora, cuando se genera un nuevo error, incluye adecuadamente toda la excepción original, por ejemplo, lanzar nueva excepción ("un nuevo mensaje", e) ;
Gracias a Susan Perkins.
    * Corrección de errores: hasta hace poco (v1.64?) , si un .../datasetIDURL fue solicitada,ERDDAP™añadir .html a la URL. En v1.64, esto falló (una URL formateado incorrectamente se generó y luego falló) . Ahora esto funciona de nuevo. Gracias a Chris Fullilove.

## Versión 1.64{#version-164} 
 (publicado 2015-08-19) 

*    **Nuevas características (para usuarios) :** 
    * Actualmente hay orientación para acceder al privado protegido por contraseñaERDDAP™conjuntos de datos (https://) viacurlyPython. Ver el[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)y[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)instrucciones.
Gracias a Emilio Mayorga de NANOOS y Paul Janecek de Spyglass Technologies.
         
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    *   ERDDAP™ahoraJava1.8+.
        Java1.7 alcanzó su[fin de la vida](https://www.oracle.com/technetwork/java/eol-135779.html)  (No más actualizaciones de seguridad) en abril de 2015. Esta versión deERDDAP™no funcionará con versiones deJavaabajo 1.8. Si actualizas desdeJava1.7x (o antes) También deberías actualizar Tomcat. Ver el[ERDDAP™Configurar instrucciones](/docs/server-admin/deploy-install)para descargar enlaces y consejos.
    * Nuevo formulario de proveedor de datos.
Cuando un proveedor de datos viene a usted esperando añadir algunos datos a suERDDAP™, puede ser difícil y consume mucho tiempo recoger todos los metadatos necesarios para agregar el conjunto de datos enERDDAP. Muchas fuentes de datos (por ejemplo, archivos .csv, Archivos de Excel, bases de datos) no tienen metadatos internos, así queERDDAP™tiene un nuevo Formulario de Proveedor de Datos que reúne metadatos del proveedor de datos y da al proveedor de datos alguna otra orientación, incluyendo una amplia orientación para Data In Databases. La información presentada se convierte endatasets.xmlformato y luego correo electrónico alERDDAP™administrador (Tú) y escrito (apéndice) a bigParentDirectory/logs/dataProviderForm.log . Así, el formulario semiautomatiza el proceso de conseguir un conjunto de datos enERDDAP™, pero elERDDAP™administrador todavía tiene que completar eldatasets.xmly tratar con obtener el archivo de datos (s) del proveedor o conectarse a la base de datos. Para más información, vea el[Proveedor de datos Descripción del formulario](/docs/server-admin/datasets#data-provider-form).
    * Nuevo&lt;matchAxisNDigits
puede ser utilizado porEDDGridDeFiles (y por lo tanto desdeNcFiles y desdeMergeIRFiles) ,EDDGridAggregateExistingDimension,EDDGridCopiado, yEDDGridLos conjuntos de datos SideBySide especifican cómo deben ser exactamente iguales los valores del eje en diferentes archivos (cuántos dígitos) : 0=no cheque (¡No uses esto&#33;) , 1-18 para aumentar la precisión, o 20 (por defecto) para la igualdad exacta. Para n=1-18,ERDDAP™asegura que los primeros n dígitos de dobles valores (o (n+1) div 2 para valores flotantes) son iguales.
        &lt;matchAxisNDigits confianza reemplaza&lt;asegurarAxisValuesAreEqual confianza, que ahora está deprecatado. Un valor de 'true' se convertirá a igualarAxisNDigits=20. Un valor de 'falso' (¡No hagas esto&#33;) será convertido a juego AxisNDigits=0.
    *   EDDGridDeFiles y EDDTable DesdeFiles cargará muy lentamente la primera vez que utilice esta versiónERDDAP.
        ERDDAP™ahora almacena la información del archivo interno un poco diferente, por lo que la tabla de archivos interna para cada uno de estos conjuntos de datos tiene que ser reconstruida. Así que no te preocupes. Nada está mal. Es una cosa de una vez.
    * Archivos de código remoto
        EDDGridFromNcFiles, EDDTableDesdeNcFiles, EDDTableDesdeNcCFFiles ahora permite que los archivos sean archivos remotos en un directorio accesible porhttp://  (y probablementehttps://ftp://, but they are untested) si el servidor remoto soporta[Solicitudes de rango](https://en.wikipedia.org/wiki/Byte_serving)en el encabezado de solicitud. THREDDS y Amazon S3 de apoyo Solicitudes de rango,HyraxNo. Este sistema le permite acceder a los datos en archivos remotos sin descargar los archivos (que es útil si los archivos remotos son demasiado voluminosos) , pero el acceso a estos archivos será mucho más lento que el acceso a archivos locales o incluso a un remotoOPeNDAPfuente.
Esto incluye"files"en un cubo Amazon S3 ya que son accesibleshttp://. Si los nombres de objetos S3 son como nombres de archivo (con interior / es como un árbol de directorios Linux) ,ERDDAP™también puede hacer que los archivos accesiblesERDDAP's"files"sistema. Para que esto funcione, sus credenciales S3 deben estar en ~/.aws/credentials (en Linux, OS X o Unix) , o C: 'Users\\USERNAME\\.aws\\\credentials (en Windows) en el servidor conERDDAP. Ver el[Documentación de Amazon SDK](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1).
    * GenerarDatasets Xml tiene una nueva opción inusual: EDDsDesdeFiles.
Esto pasará por un sistema de archivos (incluso un sistema remoto como un Amazon S3 si los objetos tienen nombres similares a archivos) y crear eldatasets.xmlpara una serie de conjuntos de datos. Su kilometraje puede variar. Esto funciona bien si los archivos están organizados para que todos los archivos de datos en un directorio dado (y sus subdirectorios) son adecuados para un conjunto de datos (por ejemplo, todos los compuestos de 1 día) . De lo contrario (por ejemplo, si un directorio contiene algunos archivos SST y algunos archivos Chlorophyll-a) , esto funciona mal pero todavía puede ser útil.
    * Programadores: nuevos archivos /lib .jar.
Si compilasERDDAP™, por favor note los nuevos archivos .jar en el parámetro classpath -cp enumerados enERDDAP™ [Guía del programador](/docs/contributing/programmer-guide).
    * mar \\_agua\\_practical\\_salinity
Si utiliza el nombre estándar CF mar\\_water\\_salinity para cualquier variable, le animo a cambiar al mar\\_water\\_practical\\_salinity que está disponible en[versión 29 de la tabla de nombres estándar CF](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (y algunas versiones anteriores...) . Este nombre indica que en realidad es un valor de Salinidad Práctica utilizandoPractical Salinity Units  (PSU) , a diferencia de un valor g/kg mayor. Las unidades canónicas son diferentes, pero aún increíblemente inquietos: 1 (presumiblemente implicadoPSU/PSS-78) , en lugar de 1e-3 (presumiblemente implicando g/kg) para el mar.\\[Hey,Unidatay CF: Identificamos valores que utilizan otras escalas, por ejemplo Fahrenheit o Celsius, a través de una cadena de unidades que es el nombre de la escala o alguna variación. ¿Por qué no podemos identificar unidades de salinidad a través de su escala, por ejemplo, PSS-78? Lo sé: Los valores de PSS-78 son "sin unidad", pero hay una escala implícita, ¿no? Si invento una nueva escala de salinidad práctica donde los valores son 0.875 veces los valores PSS-78, si las unidades canónicas siguen siendo "1"? ¿Cómo puede un usuario distinguirlos? Unidades de 1e-3 y 1 no son descriptivas ni útiles a los usuarios que están tratando de averiguar qué indican los números.\\]

## Versión 1.62{#version-162} 
 (publicado 2015-06-08) 

*    **Nuevas características (para usuarios) :** 
    * ParaEDDGriddatasets, los usuarios ahora pueden hacer Tipo de Gráfico: Gráficos de superficie con cualquier combinación de ejes numéricos, no sólo longitud versus latitud. Esto te permite hacer x versus y (proyectadas) gráficos y diversos[Diagramas Hovmöller](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram), por ejemplo, trazar longitud versus profundidad, o tiempo versus profundidad.\\[Nota: si la profundidad está en el eje Y, probablemente será volteada de lo que quieras. Lo siento, desactivarlo aún no es una opción.\\]Gracias a Cara Wilson y Lynn DeWitt.
    * Hay un nuevo[Oceanic/Atmospheric Acronym Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)que le permite convertir un acrónimo oceánico/atmosférico común a / desde un nombre completo.
    * Hay un nuevo[Oceanic/Atmospheric Variable Names Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)que le permite convertir un nombre común oceánico/atmosférico a / desde un nombre completo.
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    *   Java7/8
        Oracleno soporta más (proporciona correcciones de errores de seguridad para)  Java7.ERDDAP™todavía soportaJava7, pero por favorJava8. La próxima liberación deERDDAP™probablemente necesiteJava8.
    *   valid\\_min/max/range
Anteriormente y ahora, sidataVariablehabíascale\\_factoryadd\\_offsetmetadatos,ERDDAP™desempaqueta los valores de datos y elimina los metadatos. Anteriormente,ERDDAP™no modifica / desempaqueta ningunavalid\\_range,valid\\_min,valid\\_maxmetadatos (que generalmente / debe contener valores empaquetados) porscale\\_factoryadd\\_offset. Ahora sí. Por favor, busque suERDDAP™para "valid\\_" y asegúrese de que todas las variables que tienenvalid\\_range,valid\\_minovalid\\_maxtienen los valores correctos cuando los conjuntos de datos aparecen en la nueva versiónERDDAP. See[valid\\_range/min/max documentación](/docs/server-admin/datasets#valid_range).
    * ACDD-1.3
Anteriormente,ERDDAP™  (notablemente GenerarDatasets Xml) utilizado/recomendado el original (1.0) versión de la[NetCDFAttribute Convention for Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1)que se denominaba "UnidataDataset Discovery v1.0" en las convenciones y convenciones globalesMetadata\\_Conventionsatributos. Ahora, te recomendamos[Versión ACDD 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)que fue ratificado a principios de 2015 y se conoce como "ACDD-1.3". Afortunadamente, ACDD-1.3 es altamente compatible con la versión 1.0. We RECOMMEND that you[cambiar a ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13). No es difícil.
    * GenerarDatasets Xml Atributos
Hubo un gran número de cambios para mejorar&lt;addAttributesValores recomendados por GenerateDatasets Xml para las convenciones mundiales,creator\\_name/email/url, palabras clave, sumario y atributos de título y para la variablelong\\_nameatributo. Algunos cambios están relacionados con el nuevo uso de ACDD-1.3.
    * EDDTableDesdeSOSconjuntos de datos
Con la adición ocasional de nuevos tipos deSOSservidores y cambios en los antiguos servidores, se está haciendo más difícil paraERDDAP™para detectar automáticamente el tipo de servidor de las respuestas del servidor. El uso de [&lt;sosServerType] (/docs/server-admin/datasets#eddtablefromsos-skeleton-xml)   (con un valor de IOOS\\_NDBC, IOOS\\_NOS,OOSTethys, o WHOI) está ahora estrictamente recomendado. Si alguno de sus conjuntos de datos de este tipo tiene problemas en la nueva versión deERDDAP, intenta re-running GenerateDatasets Xml para elSOSservidor para generar un nuevo trozo dedatasets.xmlpara ese conjunto de datos. GenerarDatasets Xml te permitirá probar los diferentes&lt;sosServerType confiar opciones hasta que encuentre el correcto para un servidor dado. Si todavía tiene problemas, por favor hágame saber el problema que ve y la URL del servidor y trataré de ayudar.
    * EDDTableDeFileNames datasets
Algunos atributos que se recomendaronaddAttributesson ahora fuenteAtributos. Probablemente no tenga que cambiar nada para los conjuntos de datos existentes en susdatasets.xml.
    * Corrección de errores relacionadas con ciertas solicitudes a los datasets EDDTableDesdeNcCFFiles.
También he añadido un gran número de pruebas unitarias al gran número de pruebas unitarias existentes de los métodos subyacentes (hay 100 de escenarios) . Gracias a Eli Hunter.
    * Corrección/pequeño cambios aEDDGridDe Mergeir.
Gracias a Jonathan Lafite y Philippe Makowski
    * Corrección de errores:EDDGridFromErddap ahora funciona incluso si un conjunto de datos remoto no tieneioos\\_categoryatributos variables.
Gracias a Kevin O'Brien.
    * Corrección de errores en la página web de .graphEDDGriddatasets cuando sólo hay una variable de eje con más de un valor.
Gracias a Charles Carleton.
    * Había otras pequeñas mejoras, cambios y correcciones de errores.

## Versión 1.60{#version-160} 
 (publicado 2015-03-12) 

*    **Nuevas características (para usuarios) :** ninguno
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * STRONGLY RECOMMENDED: Actualizar el servidor[robots.txt](/docs/server-admin/additional-information#robotstxt)archivo para incluir:
Desactivar: /erddap/files/
    * INotify Problem and Solution:
En las computadoras Linux, si estás usando&lt;actualizaciónTodosNMillis con conjuntos de datos con tipo=EDDGridDesdeFiles, EDDTableDesdeFiles,EDDGridCopiar, EDDTableCopy, o sus subclases, puede ver un problema donde un conjunto de datos no se carga (ocasionalmente o consistentemente) con el mensaje de error: "IOException: El límite de usuario de las instancias alcanzadas o demasiados archivos abiertos". Si es así, puede solucionar este problema llamando (como raíz) :
eco fs.inotify.max\\_user\\_watches=65536|tee -a /etc/sysctl.conf
eco fs.inotify.max\\_user\\_instances=1024|tee -a /etc/sysctl.conf
sysctl -p
O, use números más altos si el problema persiste. El predeterminado para los relojes es 8192. El predeterminado para los casos es 128.\\[Hay un error enJavalo que hace que los casos no se recojan basura. Este problema se evita enERDDAP™v1.66 y superior. Así que la mejor solución es cambiar a la última versión deERDDAP.\\]
    * NoSuchFileException Corrección de errores:
Hubo un error que podría causar conjuntos de datos de tipo=EDDGridDesdeFiles, EDDTableDesdeFiles,EDDGridCopiar, EDDTableCopy, o sus subclases para no cargar ocasionalmente con el error "NoSuchFileException: _someFileName_". El fallo está relacionado con los usos de FileVisitor y fue introducido enERDDAP™v1.56. El problema es raro y es muy probable que afecte los conjuntos de datos con un gran número de archivos de datos que cambian con frecuencia.
    * Hubo algunas pequeñas mejoras, cambios y correcciones de errores.

## Versión 1.58{#version-158} 
 (publicado 2015-02-25) 

*    **Nuevas características (para usuarios) :** 
    * El nuevo["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)sistema le permite navegar por un sistema de archivos virtuales y descargar archivos de datos fuente de muchosERDDAP™Datasets. El"files"sistema es activo por defecto, peroERDDAP™los administradores pueden deshabilitarlo poniendo
```
        <filesActive>false</filesActive>  
```
en elERDDAP™archivo setup.xml. Gracias especial a Philippe Makowski, que persistió cuando era lento para apreciar la belleza de esta idea.
    * tiempo de destino Max... Anteriormente, la variable de tiempo de los datasets EDDTable con datos casi en tiempo real tenía un destinoMax de NaN, lo que implicaba que el valor máximo de tiempo para el conjunto de datos es reciente, pero no precisamente conocido y cambiante con frecuencia. Ahora, el destinoMax tiene un valor real, indicando la última vez conocida. Muchos datasets tienen datos actualizados continuamente.ERDDAP™soporta acceder a los últimos datos, incluso si es después de la última vez conocida. Note que el nuevo [&lt;actualizar EveryNMillis confiar] (/docs/servidor-admin/datasets) apoyoEDDGridDeFiles y EDDTable DeFiles datasets actualiza el destino de la variable de tiempoMax. Otra consecuencia de este cambio es quedatasetID=allDatasetsdataset ahora incluye la última vez conocida en las columnas maxTime. Gracias a John Kerfoot.
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * STRONGLY RECOMMENDED: Actualizar el servidor[robots.txt](/docs/server-admin/additional-information#robotstxt)archivo para incluir:
Desactivar: /files/
Desactivar: /erddap/files/
    * Muestradatasets.xml-- El año pasado, recomendamos varios excelentes conjuntos de datos en la vigilancia costeraERDDAP™que puedes añadir a tuERDDAP™sólo añadiendo algunas líneas a sudatasets.xml. Si agrega los conjuntos de datos erdVH, por favor, cambie a los nuevos conjuntos de datos erdVH2:
        * Haga una copia de todos los datasets erdVH y cambie la copiadadatasetIDEs de erdVH... a erdVH2... y cambiar la referenciasourceUrldesde ErdVH... hasta ErdVH2....
        * Establecer los conjuntos de datos erdVH a active="false".
    * TodosEDDGridDeFiles y EDDTable DeFiles subclases ahora apoyan [&lt;accesibleViaFiles confía] (/docs/servidor-admin/datasets#accesiblesviafiles) para que los archivos de datos de origen sean accesibles a través de"files"sistemas. Por defecto, este sistema está apagado para cada conjunto de datos. Necesitas añadir la etiqueta para habilitarla. Gracias a Philippe Makowski.
    * TodosEDDGridDeFiles y EDDTable DeFiles subclases ahora apoyan [&lt;actualizar EveryNMillis confiar] (/docs/servidor-admin/datasets) . Por defecto, este sistema está apagado para cada conjunto de datos. Necesitas añadir la etiqueta para habilitarla. Gracias a Dominic Fuller-Rowell y NGDC.
    * El nuevo[EDDTableDesdeFileNames](/docs/server-admin/datasets#eddtablefromfilenames)crea un conjunto de datos de información sobre un grupo de archivos en el sistema de archivos del servidor, pero no sirve datos de dentro de los archivos. Por ejemplo, esto es útil para distribuir colecciones de archivos de imagen, archivos de audio, archivos de vídeo, archivos de procesamiento de palabras y archivos de hoja de cálculo. Esto funciona de la mano con el nuevo["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)sistema, para que los usuarios puedan descargar los archivos. Gracias especial a Philippe Makowski, que persistió cuando era lento para apreciar la belleza de esta idea.
    * El nuevo[EDDGridDeEDDTable](/docs/server-admin/datasets#eddgridfromeddtable)le permite convertir un conjunto de datos tabular en un conjunto de datos redondeado. Gracias a Ocean Networks Canadá.
    * El nuevo[EDDGridFromMergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles)agrega datos de un grupo de MergeIR local.gzarchivos.EDDGridFromMergeIRFiles tiene la distinción de ser el primer trozo de código contribuido aERDDAP. Se hizo completamente sin nuestra ayuda. Tres alegrías y gracias especiales a Jonathan Lafite y Philippe Makowski de R.Tech Engineering.
    * Hay una nueva etiqueta opcional setup.xml,&lt;unitTestDataDir confianza, que especifica el directorio con los archivos de datos de prueba de unidad disponibles a través de un nuevo repositorio GitHub:[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest). Por ejemplo:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Esto no es útil aún, pero es parte de la marcha hacia hacer tantas de las pruebas de unidad ejecutables por otras personas como sea posible. Gracias a Terry Rankine.
    * Había muchas pequeñas mejoras, cambios y correcciones de errores.

## Versión 1.56{#version-156} 
 (publicado 2014-12-16) 

*    **Nuevas características (para usuarios) :**   (Ninguno) 
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * Probablemente ya sepas[EDDGridFromErddap](/docs/server-admin/datasets#eddfromerddap)y[EDDTableDeErddap](/docs/server-admin/datasets#eddfromerddap)que le permite vincular a conjuntos de datos en otrosERDDAPy que aparezcan en tuERDDAP. Las solicitudes de datos reales de estos conjuntos de datos se enruzan de forma invisible a la fuenteERDDAP™, por lo que los datos no fluyen a través de su sistema o usan su ancho de banda. Actualmente hay una gran lista de conjuntos de datos recomendados en la muestradatasets.xmlen erddapContent.zip. Para incluirlos en tuERDDAP™, todo lo que tienes que hacer es copiar y pegar los que quieres en tudatasets.xml. Gracias a Conor Delaney.
    * Si compilasERDDAP™Necesitas añadir algo nuevo. jerga archivos a su[conmutador de cp](/docs/contributing/programmer-guide#development-environment)para Javac y Java.
    * El nuevo[EDDTableDesdeCassandra](/docs/server-admin/datasets#eddtablefromcassandra)maneja obtener datos de[Cassandra](https://cassandra.apache.org/). Gracias a Ocean Networks Canadá.
    * El nuevo[EDDTableDeColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)maneja obtener datos de archivos de datos ASCII con columnas de ancho fijo. Gracias a Philippe Makowski.
    * TodosEDDGridDeFiles y EDDTable DeFiles subclases ahora utilizan un nuevo método, FileVisitor (a)Javaen 1.7) para reunir información sobre los archivos. Esto puede no tener ningún beneficio para la primera reunión de información de archivos para un conjunto de datos dado, pero parece tener un gran beneficio para las reuniones posteriores si se hace pronto, mientras que el sistema operativo todavía tiene la información caché. Gracias a NGDC.
        
Todavía recomendamos: Si un conjunto de datos tiene un gran número de archivos (p. ej.,) , el sistema operativo (y asíEDDGridDeFiles y EDDTableDeFiles) funcionará mucho más eficientemente si almacena los archivos en una serie de subdirectorios (uno por año, o uno por mes para conjuntos de datos con archivos muy frecuentes) , por lo que nunca hay un gran número de archivos en un directorio dado.
        
    * Varias pequeñas mejoras a EDDTableDesdeAsciiFiles.
    * Algunas mejoras en EDDTableDesdeAsciiServiceNOS, especialmente para obtener algunas columnas adicionales de información de la fuente. Gracias a Lynn DeWitt.
    * Algunos pequeños fallos relacionados con la ISO 19115 queERDDAP™genera. Gracias a Anna Milan.

## Versión 1.54{#version-154} 
 (publicado 2014-10-24) 

*    **Nuevas características (para usuarios) :** 
    * Algunas variables ahora trabajan con el tiempo en la precisión de milisegundos, por ejemplo, 2014-10-24T16:41:22.485Z. Gracias a Dominic Fuller-Rowell.
*    **Pequeños cambios/Arreglos de carga:** 
    * Corrección de errores: con una cierta combinación de circunstancias,EDDGridFromNcFile datasets returned data at reduced precision (por ejemplo, flota en lugar de dobles) . Esto sólo podría afectar los valores de datos con cifras significativas. Mis disculpas. (Y era un clásico error de programación de computadora: un personaje equivocado.) Gracias a Dominic Fuller-Rowell.
    * Muchos pequeños cambios.
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * Los conjuntos de datos de Griddap ahora soportan variables de eje de timetamp y variables de datos (es decir, variables con valores de tiempo, pero unadestinationNamefuera de la"time") . Gracias a Dominic Fuller-Rowell.
    *   ERDDAP™ahora correctamente soporta milisegundostime\\_precision"1970-01-01T00:00:00.000Z". Un quirk intencionado: al escribir los tiempos a los archivos orientados al ser humano (por ejemplo,.tsv,.json,.xhtml) ,ERDDAP™usos especificadostime\\_precisionsi incluye segundos y/o segundos decimales; de lo contrario, utiliza segundostime\\_precision"1970-01-01T00:00Z" (para la consistencia y compatibilidad atrasada) . Gracias a Dominic Fuller-Rowell.
    *   EDDGridFromNcFiles ahora admite la lectura StringdataVariables.
    *   .ncarchivos escritos por griddap ahora puede tener StringdataVariables.
    * GenerarDatasets Xml ahora incluye más flujo () llamadas para evitar el problema de la información que no se escribe a los archivos. Gracias a Thierry Valero.
    * La documentación para GenerateDatasetsXml fue mejorada, especialmente para señalar que el interruptor -i sólo funciona si especifica todas las respuestas en la línea de comandos (por ejemplo, modo script) . Y el modo script se explica. Gracias a Thierry Valero.
    *   ERDDAP™ya no permite que dos variables en un conjunto de datos tengan las mismassourceName. (Si alguien lo hizo antes, probablemente llevó a mensajes de error.) Como antes,ERDDAP™no permite que dos variables en un conjunto de datos tengan la mismadestinationName.

## Versión 1.52{#version-152} 
 (publicado 2014-10-03) 

*    **Nuevas características:**   (ninguno) 
*    **Pequeños cambios/Arreglos de carga:** 
    * Otro (más pequeño) cambio para hacerERDDAP™más rápido.
    * Mejora de los archivos ISO 19115 generados porERDDAP: añadido recientemente recomendado&lt;gmd:protocol pacientegt; valores (información, búsqueda,OPeNDAP:OPeNDAP,ERDDAP: Griddap, andERDDAP:tabledap) dentro&lt;gmd:CI\\_OnlineResource;. Gracias a Derrick Snowden y John Maurer.
    * Muchos pequeños cambios.
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * Corrección de errores: GenerateDatasetsXml.sh y DasDds.sh no estaban en erddap.war para 1.48 y 1.50. Ahora lo son. Gracias a Thierry Valero.
    * Pequeños cambios en algunas pruebas de velocidad en TestAll para hacerlos menos susceptibles al azar. Gracias a Terry Rankine.

## Versión 1.50{#version-150} 
 (publicado 2014-09-06) 

*    **Nuevas características:**   (ninguno) 
*    **Pequeños cambios/Arreglos de carga:** 
    * EstoERDDAP™debe ser mucho más rápido que las versiones recientes.
*    **CosasERDDAP™Los administradores necesitan saber y hacer:**   (nada) 

## Versión 1.48{#version-148} 
 (publicado 2014-09-04) 

*    **Nuevas características:** 
    *   ERDDAP™ahora siempre crea un conjunto de datos tabular,datasetID=allDatasets, que tiene un cuadro de información sobre todos los conjuntos de datos en esteERDDAP. Puede ser consultado como cualquier otro conjunto de datos tabular. Esta es una alternativa útil al sistema actual para obtener información sobre conjuntos de datos programáticamente.
    * Hay dos nuevos tipos de archivos de salida para EDDTable yEDDGrid, Csv0 y.tsv0. Son archivos de valor de coma y pestaña que no tienen líneas con nombres de columna o unidades. Los datos comienzan en la primera línea. Son especialmente útiles para los scripts que sólo quieren un pedazo de información deERDDAP.
*    **Pequeños cambios/Arreglos de carga:** 
    * Los mapas se pueden hacer ahora a longitudes en el rango -720 a 720.
    * El nuevo.ncml respuesta Tipo de archivo está disponible para todosEDDGridDatasets. Devuelve el[NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)Descripción formato \\ del conjunto de datos (similar a un combinado .dds + .das) .
    * Corrección de errores: Guardar datos tabulares a un.ncarchivo se limitó a 100.000 valores por variable. Ahora se limita a 2 GB de tamaño total de archivo. Gracias a Kevin O'Brien.
    * Corrección de errores: el SaveAsMatlabmétodos que garantizan ahoradatasetIDs se convierten en seguroMatlabnombres variables. Pero todavía recomiendo firmemente que creasdatasetIDs que son nombres variables válidos: comenzando con una carta y luego simplemente usando A-Z, a-z, 0-9, y \\_. See[datasetID](/docs/server-admin/datasets#datasetid). Gracias a Luke Campbell.
    * Corrección de errores en EDDTableDesdeDatabase: Con algunos tipos de bases de datos, un NO\\_ La respuesta de los DAAT de la base de datos dio lugar a un retraso sin sentido de 30 segundosERDDAP. Gracias a Greg Williams.
    * Corrección de errores:EDDGridHacer un Gráfico con Tipo de Gráfico = líneas (o marcadores o marcadores y líneas) forzado x axis variable para ser tiempo. Ahora puede ser cualquier eje. Gracias a Lynn DeWitt.
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * STRONGLY RECOMMENDED: UpdateJava  
Esta versión deERDDAP™RequisitosJava7 o superior, peroJava7 alcanzará su fin de vida en abril de 2015 (¡Pronto&#33;) , así que ahora es un buen momento para cambiarJava8. SoJava8 es STRONGLY RECOMMENDED. Probando conJava8. Tenga en cuenta queJava6 alcanzó su fin de vida en febrero de 2013 (¡No más correcciones de errores de seguridad&#33;) .
    * STRONGLY RECOMMENDED: Update Tomcat
Si usas Tomcat, cambia a la última versión de Tomcat. Tomcat 8 está diseñado para trabajar conJava8.
    * "ERDDAP"Ya no es un acrónimo. Ahora es sólo un nombre. No quiero que el nombre destaqueERD. QuieroERDDAP™para destacar su institución y sus datos.
    * Por favor.[personalizar el aspecto de suERDDAP™instalación para destacar su institución y sus datos](/docs/server-admin/deploy-install#customize). Con un trabajo de una hora, puedes hacer buenas mejoras que durarán para siempre.
    * En setup.xml, el&lt;displayDiagnosticInfo confianza opción es ahora siempre ignorado y tratado como si el valor fuera falso.
RECOMENDADO: Eliminar el&lt;displayDiagnosticInfo confianza etiqueta y información relacionada de su setup.xml.
    * En setup.xml, el predeterminado para&lt;drawLandMask"se acabó", pero ahora está "bajo", que es un mejor defecto general (funciona bien con todos los conjuntos de datos) .
    * Los scripts GenerateDatasetsXml.sh y DadDds.sh Linux ahora usan bash en lugar de csh, y tienen la extensión .sh. Gracias a Emilio Mayorga
    * GenerarDatasets Xml y DasDds ahora crean sus propios archivos de registro (GenerarDatasetsXml.log y DasDds.log) y archivos de salida (GenerarDatasetsXml.out y DadDds.out) in _bigParentDirectory_/logs/, and never put their results on the clipboard.
    * GenerarDatasets Xml ahora soporta un parámetro de línea de comandos -i que inserta la salida en el archivo especificado en un lugar especificado. Ver el[documentación](/docs/server-admin/datasets#generatedatasetsxml). Gracias a Terry Rankine.
    * EDDTableDesdeDatabase ahora soporta&lt;columnNameQuotes confiar&lt;/columnNameQuotes confiar, con valores válidos " (por defecto) O nada. Este personaje (si) se utilizará antes y después de nombres de columna en las consultas SQL. Diferentes tipos de bases de datos, establecidas de diferentes maneras, necesitarán diferentes comillas de nombre de columna.
    * Las variables de latitud y longitud tabulares ahora pueden haber personalizadolong\\_nameEs, por ejemplo, Latitud de Perfil. Anteriormente, sólo podían ser Latitud y Longitud.
    * A partir de ahora, especificar "defaultDataQuery" y "defaultGraphQuery" como atributos en los metadatos globales del conjunto de datos (es decir,&lt;addAtts confía), no como separado&lt;defaultDataQuery confianza y&lt;defaultGraphQuery monedas. (Aunque, si todavía los especifica a través de las etiquetas,ERDDAP™creará automáticamente atributos globales con la información.) 

## Versión 1.46{#version-146} 
 (publicado 2013-07-09) 

*    **Nuevas características:** 
    *    (Ninguno) 
*    **Pequeños cambios/Arreglos de carga:** 
    * Corrección de errores: En EDDTableDesdeDatabase, en la versión 1.44 solamente,ERDDAP™citó indebidamente el nombre de la tabla de la base de datos en las declaraciones SQL. Eso está arreglado. Gracias a Kevin O'Brien.
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    *    ** Si no modifica los mensajes estándar en los mensajes.xml,
Borrar\\[tomcat\\]/content/erddap/messages.xml . **   
El archivo predeterminado de mensajes.xml está ahora en el erddap. archivo de guerra, no erddapContent.zip. Así que ya no necesita actualizar manualmente mensajes.xml .
    * Si modifica los mensajes en los mensajes.xml, a partir de ahora, cada vez que se actualizaERDDAP™, o bien:
        * Haz los mismos cambios que hiciste antes al nuevo
            \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
Y esta vez: eliminar\\[tomcat\\]/content/erddap/messages.xml .
        * O, averiguar lo que ha cambiado en los nuevos mensajes.xml (via diff) , y modificar su
            \\[tomcat\\]/content/erddap/messages.xml archivo accordingly.

## Versión 1.44{#version-144} 
 (publicado 2013-05-30) 

*    **Nuevas características:** 
    * Consultas a EDDTable datasets now support &quot;orderByMin (...) y &quot;orderByMinMax (...)   (que devuelve dos filas en cada grupo, con el mínimo y máximo de la últimaorderByvalor) . Gracias a Lynn DeWitt.
    * Hay dos nuevostabledaptipos de archivos:.ncCFHeader y.ncCFMAHeader (que devuelve la cabecera ncdump-like del correspondiente.ncCF y.ncTipos de archivo CFMA) . Gracias a Steve Hankin.
*    **Pequeños cambios/Arreglos de carga:** 
    * Corrección de errores: cargar las páginas web .graph y .html para conjuntos de datos con un montón de valores de tiempo era lento porqueERDDAP™fue lento cuando se generan las opciones de deslizador de tiempo. Ahora siempre es rápido. Gracias a Michael Barry, OOICI y Kristian Sebastian Blalid.
    * Corrección de errores: En algunos tipos de conjunto de datos EDDTable, las limitaciones de tiempo no siempre se manejaron correctamente. Ahora lo son. Gracias a John Maurer y Kevin O'Brien.
    * Corrección de errores: los conjuntos de datos no se cargarían cuando todos lossubsetVariableseran variables de valor fijo. Ahora lo harán. Gracias a Lynn DeWitt y John Peterson.
    * IMPROVED: ahora, todas las consultas para variables de subconjunto actúan como si “distinct () es parte de la consulta.
    * IMPROVED: ahora, para consultas que incluyen &quot;.jsonp=_functionName_, _function Nombre_ DEBE ser ahora una serie de 1 o más (período separados) palabras. Cada palabra debe comenzar con una letra ISO 8859 o "\\_" y ser seguida por 0 o más cartas ISO 8859, dígitos o "\\_". Sí, esto es más restrictivo queJavaRequisitos de script para nombres de funciones.
    * El eje de tiempo en los gráficos ahora funciona bien para rangos de tiempo más largos (80 - 10000 años) y rangos de tiempo más cortos (0,003 – 180 segundos) .
    *   ERDDAP™es ahora más indulgente cuando se analizan las variaciones de los datos de tiempo en formato ISO-8601.
    * Había muchos otros pequeños cambios y correcciones de errores.
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    *    **Usted debe actualizar a la última versión para estar seguro.**   
        ERDDAP™se sometió a una auditoría de seguridad. Había algunos fallos y debilidades. Versión 1.44 incluye varias correcciones importantes de errores de seguridad y varios cambios para aumentar la seguridad y la accesibilidad (por ejemplo, para los usuarios con deficiencias de visión) . La versión 1.44 ha aprobado la auditoría de seguridad de seguimiento. Gracias a todos los buenos de la USGS y Acunetix que hicieron posible esto. (No deberíaNOAA¿Haciendo esto?) 
    * El nuevo[EDDTableDesdeWFSArchivos](/docs/server-admin/datasets#eddtablefromwfsfiles)hace una copia local de todos los datos de unaArcGISMapServerWFSservidor y así los datos pueden ser reservidos rápidamenteERDDAP™usuarios. Gracias a Christy Caudill.
    * El nuevo[EDDTableDesdeEDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)le permite crear un conjunto de datos EDDTable desde unEDDGridDataset. Algunas razones comunes para hacer esto son:
        * Esto permite que el conjunto de datos sea consultado conOPeNDAPLimitaciones de selección (que un usuario puede haber solicitado) .
        * El conjunto de datos es inherentemente un conjunto de datos tabular. Gracias a OOICI, Jim Potemra, Roy Mendelssohn.
    * El nombre variable "de profundidad" es ahora una alternativa especial a la "altitud". Las unidades deben ser una variante de "metros". Los valores de datos deben ser positivos=down.ERDDAP™es ahora plenamente consciente del significado de "a fondo" y lo apoya donde se apoye la altitud (e.g., como componente de un conjunto de datos CF DSG cdm\\_data\\_type=profile) . Un conjunto de datos no debe tener variables tanto profundas como "altitud".
    * En tudatasets.xml, por favor, eliminar cualquier uso de&lt;at name="cdm\\_altitud\\_proxy"Confundido&lt;/att] puesto que la profundidad es ahora una alternativa especial a la altitud y no necesita ser especialmente identificado.
    * En tudatasets.xml, por favor, eliminar cualquier uso de&lt;altitudMetersPerSourceUnit confiar, excepto para EDDTable DesdeSOS.
Cuando el valor es 1, sólo eliminarlo.
Cuando el valor es -1, considere cambiar el nombre variable a profundidad.
Para otros valores, añadir&lt;addAttributesPor ejemplo:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Todos los conjuntos de datos ahora soportan
        
        *   &lt;defaultDataQuery monedas que se utiliza si .html se solicita sin consulta.
            * Probablemente necesitarás usar esto.
            * Para los conjuntos de datos de griddap, un uso común de esto es especificar un valor de profundidad o dimensión de altitud por defecto diferente (por ejemplo,\\[0\\]en lugar de\\[último\\]) .
En cualquier caso, siempre debe enumerar todas las variables, utilizar siempre los mismos valores de dimensión para todas las variables, y casi siempre utilizar\\[0\\],\\[último\\]o\\[0:último\\]para los valores de dimensión.
Por ejemplo:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Paratabledapdatasets, el uso más común de esto es especificar un rango de tiempo predeterminado diferente (en relación con ahora, por ejemplo, &quot; tiemponow-1 día) .
Recuerde que no solicitar variables de datos es el mismo que especificar todas las variables de datos, por lo que generalmente puede especificar la nueva limitación de tiempo.
Por ejemplo:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;defaultGraphQuery monedas que se utiliza si .graph se solicita sin consulta.
            * Probablemente necesitarás usar esto.
            * Para los conjuntos de datos de griddap, el uso más común de esto es especificar un valor de profundidad o dimensión de altitud diferente (por ejemplo,\\[0\\]en lugar de\\[último\\]) y/o especificar que una variable específica sea graficada.
En cualquier caso, casi siempre utilizarás\\[0\\],\\[último\\]o\\[0:último\\]para los valores de dimensión.
Por ejemplo:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Paratabledapdatasets, los usos más comunes de esto son especificar diferentes variables a ser graficados, un rango de tiempo predeterminado diferente (en relación con ahora, por ejemplo, &quot; tiemponow-1 día) y/o diferentes configuraciones gráficas predeterminadas (por ejemplo, tipo marcador) .
Por ejemplo:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Recuerde que necesita código XML o código por ciento (uno, pero no ambos) las consultas predeterminadas ya que están en un documento XML. Por ejemplo, &amp; ,&lt;se convierte en &amp;lt; , y se convierte en &amp;gt; .
Y por favor revise su trabajo. Es fácil cometer un error y no conseguir lo que quieres.
Gracias a Charles Carleton, Kevin O'Brien, Luke Campbell y otros.
    *   EDDGridFromDap,EDDGridFromErddap, and EDDTableEDDGridtener un nuevo sistema para tratar los conjuntos de datos que cambian con frecuencia (tan a menudo como aproximadamente cada 0,5 s) . DiferenteERDDAP's sistema regular y proactivo para recargar completamente cada conjunto de datos, este sistema adicional opcional es reactivo (activado por una solicitud de usuario) y incremental (sólo actualizar la información que necesita ser actualizada) . Por ejemplo, si una solicitud esEDDGridFromDap dataset ocurre más que el número especificado de milisegundos desde la última actualización,ERDDAP™verá si hay nuevos valores para la izquierda (generalmente"time") dimension y, si es así, simplemente descarga esos nuevos valores antes de manejar la solicitud del usuario. Este sistema es muy bueno para mantener un conjunto de datos que cambia rápidamente con las mínimas exigencias de la fuente de datos, pero a costa de ralentizar ligeramente el procesamiento de algunas solicitudes de los usuarios. [Véase]&lt;actualizar EveryNMillis confiar] (/docs/servidor-admin/datasets)   
Gracias a Michael Barry y OOICI.
    *   EDDGridFromNcFiles, EDDTableDesdeNcFiles y EDDTableDesdeNcCFFiles ahora soporta[NcML.ncml](/docs/server-admin/datasets#ncml-files)archivos fuente en lugar de.ncarchivos. Gracias a Jose B Rodriguez Rueda.
    * ParaEDDGridAggregateExistingDimension,ERDDAP™soporta una nueva opción de servidorType="dodsindex" para el atributo serverType del&lt;sourceUrlEs una etiqueta. Esto funciona con páginas web que tienen listas de archivos dentro&lt;pre `&lt;/pre confiado y a menudo bajo unOPeNDAPlogo. Un ejemplo es[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html).
    * Para EDDTableDesdeSOSahora soporta una etiqueta opcional
```  
        <sosServerType>_serverType_</sosServerType>  
```
para que pueda especificar el tipo deSOSservidor (Así que...ERDDAP™no tiene que averiguarlo) . Valores válidos de&lt;¿Qué?OOSTethys, y WHOI (un servidor de nuevo soporte Tipo) . See[EDDTableDesdeSOS](/docs/server-admin/datasets#eddtablefromsos). Gracias a Derrick Snowden y Janet Fredericks.
    * TodosEDDGridDesde...Files, EDDTableDesde...EDDGridCopiado, y EDDTable Copiar ahora soporte una etiqueta opcional
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
que puede decirERDDAP™para mantener el archivo Cuadro (con información sobre cada archivo de datos fuente) en la memoria en lugar de sólo en el disco (por defecto) . Mantener el archivoTabla en velocidades de memoria hasta solicitudes de datos (especialmente si hay archivos de datos de origen √1000) , pero usa más memoria. Si lo estableces a la verdad para cualquier conjunto de datos, mantén un ojo en la memoria: actualmente usando la línea en _yourDomain_/erddap/status.htmlpara asegurar queERDDAP™todavía tiene mucha memoria libre. Gracias a Fredrik Stray.
    * EDDTableDesdeASCIIFiles ahora soporta&lt;charset Conf. Los dos charsets más comunes (caso sensible&#33;) son ISO-8859-1 (por defecto) y UTF-8.
    * Recomendado: en setup.xml, dentro&lt;startHeadHtml confianza, por favor cambie&lt;html en
        &lt;html lang="en-US" (o diferente[código de idioma](https://www.w3schools.com/tags/ref_language_codes.asp)si usted ha traducido mensajes.xml) .
    * setup.xml tiene nuevas etiquetas opcionales para desactivar partes deERDDAP:
        *   &lt;convertidoresActive Conffalse&lt;/convertersActive confianza&lt;El defecto es cierto...
        *   &lt;slideSorterActivencia&lt;/slideSorterActive confianza&lt;El defecto es cierto...
        *   &lt;wmsActive ventajafalse&lt;/wmsActive confianza&lt;&#33;-- el defecto es cierto -- En general, recomendamos en contra de establecer cualquiera de estos a falso.
    * GenerarDatasets Xml ahora escribe resultados a _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, no log.txt. Gracias a Kristian Sebastian Blalid.
    * GenerarDatasets Xml ahora hace una buena sugerencia para el&lt;reload EveryNMinutes confía. Gracias a laNOAAProyecto UAF.
    * Muchas pequeñas mejoras para GenerarDatasetsXml. Gracias a laNOAAProyecto UAF.

## Versión 1.42{#version-142} 
 (publicado 2012-11-26) 

*    **Nuevas características:** 
    *    (No hay nuevas características importantes.) 
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * Si usted está actualizando deERDDAP™1.38 o 1.40, no hubo cambios que requieran que haga cambios en los archivos de configuración (pero debe utilizar el nuevo archivo de mensajes.xml) .
    *   ERDDAP™una vez más puede correrJava1.6. (ERDDAP™v1.40 requeridaJava1.7.) Todavía recomendamos utilizar la última versión deJava1.7.
    * Un nuevo tipo de dataset,[EDDTableDesde AwsXmlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles), puede leer datos de un conjunto de la estación meteorológica automática (AWS) Archivos de datos XML. Gracias a Lynn Dewitt y a Exploratorium.
*    **Pequeños cambios/Arreglos de carga:** 
    * Ajustado a los cambios en la NDBCSOSservidores de datos fuente.
    * Adaptado a los cambios en los servicios de ASCII NOS COOPS.
    * Hizo varios pequeños cambios y correcciones de errores.

## Versión 1.40{#version-140} 
 (liberados 2012-10-25) 

*    **Nuevas características:** 
    * Hay un nuevo formato de archivo de salida paratabledapconjuntos de datos:.ncCFMA, que guarda los datos solicitados en un.ncarchivo que se ajusta a la CF[Geometrías de muestreo discretos](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Opciones de Array Multidimensional, y que por lo tanto se ajusta a las plantillas NODC\\[2021: ahora el[Plantillas NCEI](https://www.ncei.noaa.gov/netcdf-templates)\\]para almacenar este tipo de datos. Gracias a NODC.
    *   tabledaplas solicitudes ahora pueden incluir restricciones de tiempo tales como &gt;now-5 días. Ver el[documentación](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Gracias a James Gosling.
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * Si usted está actualizando deERDDAP™1.38, no hubo cambios que requieren que haga cambios en los archivos de configuración (pero debe utilizar el nuevo archivo de mensajes.xml) .
    *   ERDDAP™public releases and internal hits are available via[ERDDAP™en GitHub](https://github.com/ERDDAP). Para más información, vea el[Wiki](https://github.com/ERDDAP/erddap/wiki)para elERDDAP™proyecto así como el más general[ERDDAP™Guía del programador](/docs/contributing/programmer-guide). (Esto se anunció por separado unas semanas después deERDDAP™1.38 liberación.) 
    * GenerarDatasets Xml ha sido mejorado.
        * El script fue revisado para que funcione correctamente en todos los ordenadores Linux (no sólo unos pocos) .
        * Ahora añadecreator\\_name,creator\\_email, ycreator\\_urlsiempre que sea posible.
        * Muchas otras pequeñas mejoras.
    * Refined howERDDAP™trata con el tiempo.
        * Internamente,ERDDAP™ahora maneja los tiempos a la precisión de milisegundos (no segundos) .
        * Ahora puede especificar opcionalmente la precisión del tiempo para un conjunto de datos dado, ver[time\\_precision](/docs/server-admin/datasets#time_precision). Por ejemplo, puede establecer un conjunto de datos para mostrar valores de tiempo con precisión de fecha (por ejemplo, 1970-01-01) .
        * Sus conjuntos de datos actuales utilizarán la configuración predeterminada, por lo que no son afectados por estos cambios y continuarán mostrando tiempo con segundos de precisión. Gracias a Servet Cizmeli y Philip Goldstein.
    *   [EDDTableDesdeNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles)es un nuevo tipo de conjunto de datos que puede utilizar en sudatasets.xmlarchivo. Puede leer datos de cualquiera de los numerosos formatos de archivo definidos por el[CF Geometrías de muestreo discretos](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)convenciones. Gracias a NODC y especialmente gracias a Kyle Wilcox por hacer archivos de muestra para el gran número de formatos de archivo DSG válidos y por hacerlos públicos.
*    **Pequeños cambios/Arreglos de carga:** 
    * Ampliado[quickRestart](#quick-restart)a todo el sistema pertinenteEDDGridy subclases EDDTable.
    * Mejora de la documentación, especialmente relacionada con la forma de utilizar[griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)y[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)de varios software cliente.
    * Cambio de búsqueda avanzada para apoyar minTime y/o maxTime expresado como epochSeconds. Gracias a Lynn Dewitt.
    * Cambios.htmlTablesalida para mostrar urls y direcciones de correo electrónico como enlaces.
    * Añadido "rel=" y "rev=" a relevante&lt;a href monedas. Gracias a Pat Cappelaere desde elOGC RESTproyecto.
    * Mejora de la protección contra las solicitudes de datos no realistas, en particular en el marcotabledapDonde es un problema más difícil.
    * Movió más mensajes a mensajes.xml.
    * Realizó mejoras de velocidad.
    * FijaciónEDDGridDesdeFiles para permitir descender ejes clasificados. Gracias a Maricel Etchegaray.
    * Retirada referencias a iGoogle ya que se descontinuará.
    * Hizo varios pequeños cambios y correcciones de errores.

## Versión 1.38{#version-138} 
 (publicado 2012-04-21) 

*    **Nuevas características:** 
    * ISO 19115 y FGDC -ERDDAP™puede generar automáticamente archivos de metadatos XML ISO 19115 y FGDC para cada conjunto de datos. Los enlaces a los archivos son visibles en cada lista de conjuntos de datos (por ejemplo, desde Búsqueda de Texto Completo) y también en carpetas accesibles web (WAF)   (ver el[FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)y[ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) . Gracias a Ted Habermann, Dave Neufeld y muchos otros.
    * Búsquedas de texto completas para conjuntos de datos ahora admite \\-_excludedWord_ y \\-"_excluida frase_" . Gracias a Rich Signell.
    * Las búsquedas de conjuntos de datos ahora devuelven resultados una página a la vez. El valor predeterminado utiliza la cadena del parámetro: página=1 TemasPerPage=1000, pero puede cambiar los valores en la URL de su solicitud. Gracias a Steve Hankin y al proyecto UAF.
    *   OpenSearch--ERDDAP™ahora apoya el[OpenSearch1.1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)estándar para buscar conjuntos de datos. Entre otras cosas, esto permite catalogar sitios web de agregación para hacer búsquedas distribuidas (pasar una solicitud de búsqueda a cada catálogo que sabe) .
    * Comma Separado Valor (CSV) Archivos --ERDDAP™ahora genera archivos CSV con sólo una comunicación entre valores (que Excel prefiere) , en lugar de coma+espacio. Gracias a Jeff deLaBeaujardiere.
    * Millones de Datasets - Se hicieron varios cambios para apoyarERDDAPS teniendo un gran número de conjuntos de datos, quizás incluso un millón. Gracias a Steve Hankin y al proyecto UAF.
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
#### Reinicial rápido{#quick-restart} 
*   [A](#quick-restart)sistema de reinicio rápido permiteERDDAP™para reiniciar mucho más rápido.
     **Por favor, añada esto a su archivo setup.xml** justo después&lt;/datasetsRegex:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Búsquedas de texto completas para conjuntos de datos ahora se puede hacer con el motor de búsqueda de Lucene (aunque recomendamos el motor de búsqueda original si tiene menos de 10.000 conjuntos de datos) o el sistema de búsqueda original.
         **Por favor, añada esto a su archivo setup.xml** justo después&lt;/displayDiagnosticInfo confianza:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * En setup.xml, ahora puede/debe añadir dos nuevas categorías a la lista separada de coma de&lt;categoryAttributes&quot;
        * global: palabras clave (agréguelo justo después de la institución global) -- un nuevo caso especial que analiza una lista separada de palabras clave del atributo de palabras clave globales para hacer una entrada separada para cada palabra clave.
        * variable Nombre (añadirlo al final) -- un nuevo caso especial que categoriza cada uno de losdataVariable destinationNames.
    * En setup.xml, puedes (¿Pero por qué?) Díselo.ERDDAP™no ofrecer metadatos FGDC y/o ISO 19115 para ningún conjunto de datos incluyendo
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Los valores predeterminados para estos ajustes son ciertos.
    * Indatasets.xml, por favor considere mejorar los metadatos para sus conjuntos de datos.ERDDAP™ahora genera automáticamente archivos de metadatos XML ISO 19115 y FGDC para cada conjunto de datos basados en los metadatos del conjunto de datos.
Entonces, **buenos metadatos de conjunto de datos conduce a buenosERDDAP-generados metadatos ISO 19115 y FGDC.**   
         **Vea la nueva documentación para los muchos nuevos[Global Attributes](/docs/server-admin/datasets#global-attributes).** 
    * Indatasets.xml, si quieres decirERDDAP™para utilizar un archivo FGDC y/o ISO 19115 que está en algún lugar del sistema de archivos del servidor en lugar de tenerERDDAP™generar estos archivos, utilizar:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Si _fullFileName_\\=" o el archivo no se encuentra, el conjunto de datos no tendrá metadatos FGDC y/o ISO 19115. Así que esto también es útil si desea suprimir los metadatos FGDC y/o ISO 19115 para un conjunto de datos específico.
    * Indatasets.xml, para todosEDDGridSideBySide yEDDGridConjuntos de datos AggregateExistingDimension, asegúrese de que los conjuntos de datos de los niños tienen diferentesdatasetIDs que sus conjuntos de datos de padres y que los otros niños. (Por ejemplo, podría seguir el sistema sencillo pero eficaz de George Foreman para nombrar a sus hijos.) Si algún nombre en una familia es exactamente el mismo, el conjunto de datos no se cargará (con el mensaje de error que los valores del eje agregado no están en orden) .
    * Indatasets.xml, hubo algunos cambios en la lista de válidosioos\\_categoryvalores de metadatos:
        * "pCO2" fue cambiado a "CO2".
        * Se agregó "Oceografía Física".
        * "Suelos" fue añadido.
    * Indatasets.xml,ERDDAP™ya no permite '.' endatasetID. Se permitió pero se desanimó. (Lo siento.) 
    * Indatasets.xml, la configuración para EDDTableDeThreddsFiles y EDDTableDesdeHyraxLos archivos han cambiado ligeramente porque ambas clases fueron reescritas para ser más eficientes (ambas clases ahora siempre hacen una copia local de todos los archivos de datos remotos) . Vea la documentación para configurar estas clases:[EDDTableDesdeHyraxArchivos](/docs/server-admin/datasets#eddtablefromhyraxfiles)y[EDDTableDeThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). En particular, véase las observaciones revisadas sobre&lt;fileDir (ahora irrelevante) y&lt;sourceUrl■ (ahora esencial) . Además, nunca deberías envolver esta clase en EDDTableCopy para obtener eficiencia.
    * Indatasets.xml, si utiliza EDDTableDesdeDatabase con unOraclebase de datos, debe incluir una conexión Bienes tales como
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
para especificar cuántas filas de datos para buscar en un momento porque el default es 10, que es terriblemente ineficiente. Ver el[Oracledocumentación](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm). MySql y PostgreSQL parecen tener mejores defectos para esta configuración. Gracias a Kevin O'Brien.
    * Si utiliza EDDTableDesdeDatabase, vea la mejora[Documentación "Especiado"](/docs/server-admin/datasets#eddtablefromdatabase)para sugerencias adicionales para mejorar el desempeño. Gracias a Kevin O'Brien.
    * Indatasets.xml, para todos los datasets EDDTable, en los Convenios yMetadata\\_Conventionsatributos globales, consulte CF-1.6 (no CF-1.0, 1.1, 1.2, 1.3, 1.4 o 1.5) , ya que CF-1.6 es la primera versión para incluir los cambios relacionados con la Geometría de muestreo discreta.
    * Programadores que compilanERDDAP™código necesita añadir lib/lucene-core.jar a la lista de archivos de tarro en sus rutas de línea de comando javac y java.
    *   ERDDAP™tiene una[nuevo servicio](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)para convertir un nombre estándar CF a / desde una palabra clave de ciencia GCMD. Usted puede encontrar esto útil al generar metadatos de palabras clave globales para los conjuntos de datos en susERDDAP.
    * Tratando con Bots... Por favor lea este consejo[evitar que los bots se arrastranERDDAP™de una manera estúpida](/docs/server-admin/additional-information#robotstxt).
    * Traducción: El texto sobreERDDAP's páginas web ahora está principalmente en mensajes.xml y tan adecuado para la traducción a diferentes idiomas (por ejemplo, alemán, francés) . Los mensajes ahora utilizan a menudo MessageFormat para formatear, también para ayudar a hacer traducciones. Si usted está interesado en hacer una traducción, por favor emailerd dot data at noaa dot gov.
    * Muestradatasets.xml-- Hubo varios errores pequeños pero significativos en la muestradatasets.xml. Si utiliza esos conjuntos de datos, por favor obtenga las versiones más nuevas de la nueva muestradatasets.xmlen el nuevo erddapContent.ziparchivo. Gracias a James Wilkinson.
    * Git... Voy a tratar duro de hacerERDDAP™un proyecto GitHub lo antes posible después de esta liberación.
*    **Pequeños cambios/Arreglos de carga:** 
    * Una nueva paleta, OceanDepth, es útil para valores de profundidad (positivo) , por ejemplo, 0 (sauce) a 8000 (profundo) .
    * El.kmlde productostabledapusa un icono mejor marcador (No está borroso.) . Y pasar por encima de un marcador ahora lo hace más grande.
    * EDDTableDeFiles... En la última actualización, la nueva biblioteca netcdf-java tenía restricciones más estrictas para los nombres variables en.ncarchivos. Eso causó problemas para EDDTableDesdeFiles si una variablesourceNameTenía ciertos caracteres de punción. EDDTableDeFiles ahora se modifica para evitar ese problema. Gracias a Thomas Holcomb.
    * La página .subset ahora soporta 0/10/100/1000/10000/100000 en lugar de una casilla de verificación para datos relacionados. La punta de la herramienta advierte que 100000 puede causar que su navegador se estrella. Gracias a Annette DesRochers, Richard (Abe) Coughlin, and the IOOS Biological Project.
    * .../erddap/info/_datasetID_/index.html páginas web ahora mostrar urls y direcciones de correo electrónico como enlaces clicables. Gracias a Richard (Abe) Coughlin and the IOOS Biological Project.
    * Corrección de errores:tabledap, para conjuntos de datos con altitud MetersPerSourceUnit&lt;0, consultas con limitaciones de altitud fueron manejadas incorrectamente. Gracias a Kyle Wilcox.
    * Corrección de errores:EDDGridAggregateDeExistingDimension ahora soporta URLs más diversas de TDS. ¿Gracias?

## Versión 1.36{#version-136} 
 (publicado 2011-08-01) 

*    **Nuevas características:** 
    * No hay cambios significativos desde el punto de vista del usuario.
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * El conjunto de datos pmelTao que a menudo se utilizó como conjunto de datos de muestra para eltabledap  
la documentación ya no está disponible.ERDDAP™Los administradores DEBE hacer estos cambios:
        * En tudatasets.xml, si tienes undatasetID="pmelTao" conjunto de datos, añadir
activo="falso" justo antes del "Cons" al final de esa línea.
        * En tu setup.xml, si tu&lt;EDDTableIdExample Conf es pmelTao, entonces:
            * Si tudatasets.xmlno tiene un conjunto de datos condatasetID="erdGlobecBottle", añadir
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * En su setup.xml, reemplazar todas las etiquetas de&lt;EDDTableIdExample Conf a través
                &lt;EDDTableMatlabPlotExample confía con
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * Para conjuntos de datos donde el tipo es una subclase de EDDTableDesdeFiles, ahora puede hacer datos de metadatos.
Específicamente, ahora puede hacer una variable de los valores de un atributo de una de las variables originales.
Por ejemplo, endatasets.xml, dentro de un&lt;dataVariableetiqueta, si usas
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™hará una variable con los valores del atributo PI de la variable crucero.
Gracias a WOD.
*    **Cambios:** 
    * Pequeños cambios

## Versión 1.34{#version-134} 
 (liberado 2011-06-15) 

*    **Cambios:** 
    * Corrección de errores: Fijo una fuga de memoria que ocurrió en unos 64 bitsJavainstalaciones.
    * Corrección de errores:ERDDAP™Ahora correctamente establece estos atributos globales cuando los valores de la dimensión de latitud varían de alto a bajo: geoespacial\\_lat\\_min, geoespacial\\_lat\\_max, Southernmost\\_Northing, Northernmost\\_Northing.
        
Note queactual\\_rangeno cambia: puede tener valores bajos, altos o altos, bajos valores, ya que se pretende indicar el rango y el orden de almacenamiento.
        
    * Pequeños cambios.
    *   ERDDAP™los administradores no necesitan hacer ningún cambio en su configuración.xml odatasets.xml.

## Versión 1.32{#version-132} 
 (publicado 2011-05-20) 

*    **Cambios:** 
    * Apoyo a las geometrías de muestreo CF recientemente ratificadas (que lamentablemente no está disponible en línea) , que reemplaza los Convenios de Observación de Puntos CF propuestos.
        ERDDAP™los usuarios verán que cdm\\_feature\\_type=Station es reemplazado por TimeSeries y hay pequeños cambios en los archivos creados para los.ncTipo de archivo CF (plano\\_dimensión ahora se llama muestra\\_dimensión) .
        ERDDAP™los administradores tendrán que hacer estos cambios endatasets.xml:
        * cdm\\_data\\_type=Station debe ser cambiado a cdm\\_data\\_type=TimeSeries.
        * cdm\\_data\\_type=StationProfile debe ser cambiado a cdm\\_data\\_type=TimeSeriesProfile.
        * cdm\\_station\\_variables debe ser cambiado a cdm\\_timeseries\\_variables.
        * cf\\_role=station\\_id debe ser cambiado a cf\\_role=timeseries\\_id.
    * Nuevoioos\\_categoryopciones: "Colored Dissolved Organic Matter", "pCO2", "Stream Flow", "Total Suspended Matter".
    * Posible solución a una posible fuga de memoria en 64 bitsJava.\\[No funcionó.\\]
    * Pequeños cambios.

## Versión 1.30{#version-130} 
 (publicado 2011-04-29) 

*    **Nuevas características:** 
    * Apoyo a 64 bitsJava. Cuando se usa con 64 bitsJava,ERDDAP™ahora puede utilizar mucho más memoria de salto y manejar muchas más solicitudes simultáneas.
    * Apoyo.ncsolicitudes de archivos hasta 2GB (incluso sin 64 bitsJava) mediante un mejor uso deERDDAPEs el manejo de datos en pedazos.
    * Muchas mejoras de velocidad 2X en el código y 2X acelera deJava1.6 makeERDDAP™2X a 4X más rápido que antes.
    * Mejoras de ahorro de memoria significativamente menorERDDAPEs el uso de memoria base.
    * Para conjuntos de datos tabulares,ERDDAP™es ahora plenamente consciente del cdm\\_data\\_type de un conjunto de datos, y cómo los mapas de datos del tipo CDM. Ver el[CF Especificación de las geometrías de muestreo](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Quizás algún día pronto, ese archivo de Word se convertirá en .html y reemplazará la información actual "OBSOLETE" en esa página web. Gracias a laNOAAProyecto UAF.
    * Para la mayoría de los conjuntos de datos EDDTable, una nueva opción de tipo de archivo de salida,.ncCF, crea Contiguous Ragged Array.ncarchivos que se ajustan a la última versión de la[CF Convenciones sobre geometrías de muestreo](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Estos archivos están estructurados para reflejar el tipo de datos CDM del conjunto de datos. Puesto que los convenios propuestos acaban de cambiar, a partir de este escrito, la biblioteca netcdf-java todavía no admite la lectura de los formatos de archivo creados porERDDAPe interpretarlos como archivos de datos CDM. Probablemente lo hará pronto. Gracias a laNOAAProyecto UAF.
    * The View : Distinct Data option on the .subset web page is now a drop-down list that lets users specify the maximum number of rows of distinct data to be viewed (por defecto = 1000) . Este cambio, y otros, permitenERDDAP™trabajar con conjuntos de datos que tienen un gran número de filas de datos distintos. (El número de valores únicos para cualquier variable es todavía un problema, pero puede ser bastante alto (¿20.000?) antes de que el subset y otras páginas web se carguen muy lentamente.) Gracias a laNOAAProyecto UAF.
    * .subset las páginas web tienen una nueva opción: Ver Cuentas de datos distintas. Gracias al proyecto GTOPP.
    * Para ayudar a los usuarios, los valores distintos (por ejemplo, nombres de estación) se muestran ahora en los formularios Make-A-Graph y Data Access. Gracias a laNOAAProyecto UAF.
    * . transparente Las solicitudes Png ahora apoyan todo tipo de gráficos y representaciones de datos. Dibuja sólo los datos -- no ejes, leyendas, máscara de tierra, o cualquier otra cosa. Esto hace posible hacer imágenes como capas de Pngs transparentes. Si.size=_width_|_height_ se especifica en la consulta (recomendado) Es un honor. El valor predeterminado es de 360x360 píxeles. La única excepción esEDDGrid&quot; Draw=surface, donde el defecto (como antes) es una imagen con ~1/pixel por punto de datos (hasta 3000 x y pixeles) . Gracias a Fred Hochstaedter.
    * ElWMSpáginas web ahora muestran la barra de color para la variable del conjunto de datos (s) . Gracias a Emilio Mayorga y otros.
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * Esta liberación implica muchos cambios. Todos son importantes. Por favor sea paciente y trabaje a través de todos los cambios enumerados a continuación.
    * Esta versión está siendo empujada antes de lo previsto para tratar con algunosJavafallos de seguridad. Desafortunadamente, varias características/fijos destinados a estoERDDAP™la versión no está en esta versión. Lo siento. Espero que la próxima versión sea relativamente pronto. (y mucho más fácil de actualizar) .
    * Para evitar varios errores de seguridad enJava6 actualizaciones 23 y abajo, descargar e instalar la última versión deJava  (Java6 actualizaciones 24 o superior) . Si tiene un sistema operativo de 64 bits, por favor obtenga una versión de 64 bitsJava.
    * Si está usando Tomcat 5, debe actualizar a Tomcat 6 o 7 (preferido) . Si está usando Tomcat 6, considere actualizar a Tomcat versión 7.
    * Por favor siga todas las instrucciones para[establecer un nuevoERDDAP™](/docs/server-admin/deploy-install), pero cuando sea relevante, va a copiar archivos de su antigua instalación a la nueva instalación, en particular la\\[tomcat\\]/content/erddap directorio y archivos. Como parte de eso, note el[nuevas recomendaciones de Tomcat](/docs/server-admin/deploy-install#tomcat).
    * El erddap.css predeterminado está ahora incluido en el archivo erddap.war.
        * Para usar el erddap.css predeterminado, **Borrar** tu viejo\\[tomcat\\]/content/erddap/images/erddap.css .
        * Si modificas\\[tomcat\\]/content/erddap/images/erddap.css, y desea seguir usándolo: simplemente déjelo en su lugar y reemplace el&lt;sección de entrada con:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * En tu\\[tomcat\\]/content/erddap/setup.xml:
        * Reemplazar los comentarios y etiquetas relacionados con&lt;parcialRequestMaxBytes confía y&lt;parcialRequestMaxCells confiar con
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * Sustitúyase las observaciones relacionadas con&lt;categoryAttributesØ y considerar la modificación del valor de la etiqueta:
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

Individual&lt;categoryAttributes&gt; que son atributos globales ahora DEBE ser identificado a través del prefijo global: (e.g., global:institution) . Se supone que otros atributos son atributos variables (por ejemplo,standard\\_name) . Además, los valores institucionales (los únicos) fueron dejados en el caso original. Ahora todos los valores de la categoría se convierten en minúsculas.
    * En tu\\[tomcat\\]/content/erddap/datasets.xml:
        * Big IMPROVED:ERDDAP™tiene nuevos requisitos relacionados con el cdm\\_data\\_tipo de un conjunto de datos tabular. Notablemente, cada conjunto de datos DEBE tener los metadatos y variables correctos relacionados con el cdm\\_data\\_tipo. Si no, el conjunto de datos no se cargará y lanzará un error. Vea la documentación para[cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type).
        * FYI: Hay un nuevo tipo de conjunto de datos: EDDTableDesdeAsciiServiceNOS.
        * FYI: Hay tres recién permitidosioos\\_categoryopciones: Hidrología, Calidad (por ejemplo, para banderas de calidad) , y estadísticas (por ejemplo, es decir) .
        * Para EDDTableDesde... Archivos datasets, eliminar cualquier&lt;nDimensiones etiquetado. Ya no son necesarios ni utilizados.
        * Para variables condestinationName= Altitud,ERDDAP™ya no hay fuerzaslong\\_namepara ser Altitud. Por favor, pasa por tudatasets.xmly búsqueda repetidamente&lt;destinationName¢altitud y añadir a la variable&lt;addAttributes&quot;
```
              <att name="long\\_name">Altitude</att>  
```
             (o un poco diferentelong\\_nameen casos especiales) .
        * Opcional: Todas las subclas de EDDTableDeFiles soportan variable[sourceName=global:...](/docs/server-admin/datasets#global-sourcenames)convertir metadatos globales de cada archivo en una variable de datos. Gracias a Lynn DeWitt.
    * EDDTableDesde usuarios de base de datos --ERDDAP™viene con un nuevo controlador JDBC 4 para Postgres. Para otras bases de datos, consulte la web para el último archivo JDBC .jar para su base de datos. DesdeERDDAP™ahora utilizaJava1.6+, JDBC 4 (no 3) probablemente se recomienda.
    * FYI
        *   EDDGridDesde...Files y EDDTable De... Archivos conjuntos de datos ahora almacenan el archivo
            \\[bigParentDirectory\\]/dataset Info/\\[datasetID\\]/\\*.ncarchivos.
Además, EDDTable datasets ahora almacena la información del subconjunto en
            \\[bigParentDirectory\\]/dataset Info/\\[datasetID\\]/\\*.ncarchivos. Estos archivos solían ser
            \\[bigParentDirectory\\]/dataset Info/\\[datasetID\\]..jsonarchivos.
Los archivos antiguos se eliminarán automáticamente cuandoERDDAP™Empieza. O, puede eliminar todos los archivos (pero dejar los subdirectores vacíos) dentro\\[bigParentDirectory\\]/datasetInfo/.
        * Trabajé en un nuevo EDDTableDesde NcCFFiles que leería datos de archivos locales y remotos utilizando los nuevos Convenios de Observación de Puntos CF propuestos. Pero no está en esta liberación. Hay problemas en las bibliotecas netcdf-java relacionados con algunos métodos para leer estos archivos. Y hubo algunos cambios muy recientes en los Convenios de Observación de Puntos CF propuestos. Cuando la biblioteca netcdf-java sea fija y actualizada a la última propuesta, reanudaré el trabajo sobre esto.
        * CorriendoERDDAP™en Windows puede tener problemas: notablemente, puede ver en el\\[bigParentDirectory/logs/log.txt archivo queERDDAP™a veces es incapaz de borrar y/o renombrar archivos rápidamente. Esto se debe al software antivirus (por ejemplo, de McAfee y Norton) que está revisando los archivos para virus. Si te enfrentas a este problema (que se puede ver por mensajes de error en el archivo log.txt como "Unable to delete ...") , cambiar la configuración del software antivirus puede aliviar parcialmente el problema.
SiERDDAP™en Windows es sólo una prueba que se ejecuta en el escritorio, esto es sólo una molestia.
SiERDDAP™en Windows es su públicoERDDAP™, considere cambiar a un servidor Linux.
    * Slow First Startup -- La primera vez que corresERDDAP™después de la actualización,ERDDAP™puede ser lento para cargar los conjuntos de datos. El caminoERDDAP™almacena información sobre archivos agregados ha cambiado, así queERDDAP™tendrá que volver a leer algo de información de todos esos archivos. Eso llevará tiempo.
    * Errores en Startup -- Dados los cambios relacionados con cdm\\_data\\_type, es probable que algunos de sus conjuntos de datos no se carguen y lanzarán errores. Lea cuidadosamente el correo electrónico Daily Report queERDDAP™te envía cuandoERDDAP™ha terminado de empezar. Tendrá una lista de conjuntos de datos que no cargaron (en la parte superior) y la razón por la que no cargaron (cerca del fondo) .
    * Si te atascas o tienes otras preguntas, envíame los detalles:erd.data at noaa.gov.
    * Programadores -- Si escribesJavaprogramas que funcionanERDDAP™código, necesita cambiar algunas de las referencias del parámetro línea de comandos:
        * Cambiar joda-time-1.6.2.jar a joda-time. frasco
        * Cambiar la referencia Postgres JDBC .jar a postgresql.jdbc.jar
*    **Cambios pequeños y correcciones de errores:** 
    
    * Mejor manejo de conexión para evitar hilos colgados.
    * Mejores prácticas de concurrencia para manejar solicitudes casi idénticas simultáneas de manera más eficiente.
    *   ERDDAP™ahora utiliza netcdfAll-4.2.jar (renombrado para netcdfAll-latest. frasco) . Este interruptor necesitó varios cambios internos y causó algunos pequeños cambios externos, por ejemplo, cambios en cómo se leen los archivos grib y pequeños cambios en los.ncSalida del encabezado.
    * Nueva característica:\\[Erddap\\]/convert/fipscounty.html convertsFIPScódigos de condado a/de nombres de condado.
    * En los mapas, los límites estatales son ahora violeta oscuro, por lo que destacan mejor en todos los colores de fondo.
    * Tabular.kmlsalida de nuevo utiliza un icono circular para marcar puntos (no el icono del avión Google recientemente cambió a) .
    * Los conjuntos de datos erdCalcofi fueron reorganizados y ahora se sirven desde archivos locales (más rápido) .
    * GenerarDatasets Xml desde Trozos Catalog ahora crea un archivo de resultados:
        \\[tomcat\\]/webapps/erddap/WEB-INF/temp/EDDGridDeThreddsCatalog.xml. Gracias a Kevin O'Brien.
    * GenerarDatasets Xml desde Trozos El catálogo ahora trata de eliminar números de puerto innecesarios de las URL de origen (por ejemplo, :8080 y :8081 pueden ser removidos) . GraciasNOAAEl equipo de seguridad del centro.
    * Para .subset páginas web, el Mapa de Datos Distintos ahora tiene un rango de lat lat.
    * Varias listas enERDDAP™  (por ejemplo, la tabla que muestra todos los conjuntos de datos) fueron ordenados para que A..Z se ordenara antes de a..z. Ahora son insensibles.
    * Pequeños cambios en las páginas web de .subset, incluyendo: unidades se indican ahora.
    * GenerarDatasets Xml y DasDds ya no lanzan una excepción si no pueden poner los resultados en el portapapeles del sistema o mostrarInBrowser. Gracias a Eric Bridger y Greg Williams.
    * Corrección de errores: Cuando se cargan los conjuntos de datos,ERDDAP™ahora elimina o ajusta los atributos globales geoespaciales. Gracias a Charles Carleton.
    * Corrección de errores: String2.getClassPath () ahora correctamente decodifica la clase Camino (notablemente, en Windows, los espacios en el nombre de archivo aparecieron como %20) . Esto afectóERDDAP™EDStatic llamando a SSR.getContextDirectory () y encontrar contenido/terddap. Gracias a Abe Coughlin.
    * Corrección de errores: en EDDTableDeFiles relacionados con getDataForDapQuery manejo de diferencia () solicitudes. Gracias a Eric Bridger.
    * Corrección de errores:tabledaplas solicitudes no manejaron correctamente las restricciones de altitud cuando el conjunto de datos MetersPerSourceUnit era -1. Gracias a Eric Bridger.
    * Corrección de errores: EDDTableDesde... Los datasets de archivos ahora manejan correctamente las solicitudes que incluyen =NaN y &#33;=NaN.
    
## Versión 1.28{#version-128} 
 (publicado 2010-08-27) 

*    **Nuevas características:** Ninguno.
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** Ninguno.
*    **Corrección de errores:** Arreglar un error de programación (sólo en la ver 1.26) que hizoERDDAP™muy lento.
     

## Versión 1.26{#version-126} 
 (publicado 2010-08-25) 

*    **Nuevas características:** Ninguno.
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** 
    * De tu\\[tomcat\\]/content/erddap/setup.xml,
        * In&lt;legal título, en una nueva línea abajo\\[estándar DataLicenses\\], insertar\\[estándarContacto\\].\\[estándarContacto\\]se refiere a la&lt;adminEmail Contraseña especificó más arriba en setup.xml.
        * Retirar&lt;tableCommonBGColor confianza y&lt;tableHighlightBGColor confianza.
        * Recomendado: Cambio&lt;endBodyHtml ES
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * Necesario: A tu\\[tomcat\\]/content/erddap/images/erddap.css y erddapAlt.css, añadir en la parte inferior:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Corrección de errores y pequeños cambios:** 
    
    * Corrección de errores: en algunas situaciones, los formularios no funcionaron en algunas versiones de Internet Explorer. Muchas gracias a Greg Williams.
    * Corrección de errores: Los botones Make A Graph no funcionaron si el conjunto de datos era de un control remotoERDDAP.
    * Corrección de errores:WMSa veces no funcionó si el conjunto de datos era de un control remotoERDDAP.
    * Muchos pequeños cambios y correcciones de errores.
    

## Versión 1.24{#version-124} 
 (publicado 2010-08-06) 

*    **Nuevas características:** 
    * Nuevo[Subset web pages](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)use faceted search to select subsets of tabular datasets. Gracias a POST.
    * Nuevo[Búsqueda avanzada](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)combina todas las otras opciones de búsqueda y añade longitud, latitud y cajas de tiempo. Gracias a Ellyn Montgomery. (Siento el retraso.) 
    * Nuevo[Convertir Hora](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)página web y servicio le permiten convertir tiempos numéricos a / desde tiempos de cadena ISO.
    * Nuevo[Convertir Unidades](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)página web y servicio le permite convertirUDUNITSa / desde unidades UCUM. GraciasNOAAIOOSSOS.
    * Sitabledapsolicitud incluye &quot; unidades ("UCUM") , los nombres de las unidades se convertirán de nombres originales (generalmenteUDUNITS) a[UCUM](https://unitsofmeasure.org/ucum.html)nombres de unidades. Esto sólo afecta a las unidades\\*nombres\\*, no valores de datos. GraciasNOAAIOOSSOS.
    * Mejoras para hacer páginas web y gráficos y mapas de Gráficos:
        * Si el gráfico es un mapa, hay nuevos botones Make A Graph para ampliar/out y una nueva opción para hacer clic en para cambiar el punto central del mapa. Gracias a POST.
        * Ajustes de filtro añadidos cerca de la parte inferior. Gracias a Greg Williams.
        * Los archivos de datos de costa fueron actualizados a GSHHS v2.0. Gracias a POST.
        * Los mapas ahora incluyen lagos y ríos. Gracias a POST. (Lo sentimos, el Delta del Río Sacramento está desaparecido porque ni los datos de la costa ni el conjunto de datos del lago / río trata con él.) 
        * Se actualizaron los archivos de nación/estado construidos en pscoast. Gracias a POST.
        * Topografía.cpt fue modificada ligeramente. (Lo siento si esto te afecta negativamente.) Gracias a POST.
        * En griddap's Make A Graph, si un usuario cambia una variable, el formulario se vuelve automáticamente para que elaxisVariables' showStartAndStop siempre refleja las variables gráficas. Gracias a Joaquín Trinanes.
        * Para URL de imagen png y pdf:
            * New &quot;land=_value_, where _value_ can be "under" (Mostrar topografía) o "sobre" (simplemente mostrar batimetría) . Si no se especifica, el defecto se establece por[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)dentrodatasets.xmlo setup.xml. Gracias a POST.
            * Nuevo: líneas en la leyenda que son demasiado largas se rompen automáticamente en múltiples líneas. Gracias a POST.
        * Para URLs de imagen png:
            * New &amp;legend=_value_, where _value_ can be "Bottom" (por defecto) "Off" o "Sólo". Esto le permite incluir la leyenda, excluir la leyenda, o obtener sólo la leyenda. Gracias a Cara Wilson.
            * Nuevo &quot;trim=_n Pixels_ deja una frontera de nPixels (por ejemplo, 10) en el fondo de la imagen. Se aplica después de .legend=Off. Gracias a Cara Wilson.
            * New &amp; size=_width_|_height_ le permite especificar el ancho y la altura de la imagen, en píxeles.
    * Nuevos formatos de archivo de salida:
        * .csvp and.tsvp -- como .csv y.tsvpero con " (_unidades_) "Anexado a nombres de columna en la primera línea.
        * .odvTxt -- hace un archivo .txt que simplifica la obtención de datos[Ocean Data Ver (ODV) ](https://odv.awi.de/).
        * .esriCsv -- hace un archivo .csv adecuado para la importación en ESRIArcGIS. (conjuntos de datos tabulares sólo) Gracias a Jan Mason, Jeff de La Beaujardiere, yNOAAIOOSSOSproyecto.
    * Mejoras de la interfaz[Categorized](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)páginas web. Además, los valores categorizan (no institucional) son ahora todos minúsculas. Se aceptan solicitudes no monetarias (redireccionado) para compatibilidad atrasada. Gracias a Roy Mendelssohn.
    * Los mensajes de error son ahora aún más cortos y orientados a los usuarios. Gracias a Greg Williams.
    * Un cambio interno que reduce enormementeERDDAPEs el uso de memoria base.
    * Muchas nuevas características que sólo son relevantes para el proyecto POST.
*    **CosasERDDAP™Los administradores necesitan saber y hacer:** Hay muchos cambios. Lo siento. Pero cada uno trae algunos buenos beneficios.
    * Grandes cambios en GenerateDatasetXml - ahora a menudo hace más preguntas (véase el pertinente[Dataset Tipos](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)información) y ahora siempre genera contenido esencialmente listo para usardatasets.xml. Sigues siendo responsable de la configuración, así que deberías revisar ladatasets.xmlcontenido antes de usarlo. Un esfuerzo humano en poner en el proyecto siempre hará mejor que un programa informático. Gracias al proyecto UAF.
    * REQUIERO: En setup.xml, usted debe revisar elWMSsección. Ahora debería incluir estas etiquetas (pero siéntete libre de cambiar los valores) :
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * REQUIERO: En setup.xml, copiar y pegar este nuevo sugerido&lt;startHeadHtml confiar para reemplazar tu versión anterior. Pero siéntete libre de hacer cambios para tus preferencias.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

Gracias a POST, Hans Vedo y Rick Blair.
    * REQUIERO: En setup.xml, en&lt;startBodyHtml], cambiar el&lt;body ilse para ser sólo&lt;body título, ya que el estilo ahora está fijado por erddap.css.
    * REQUIERO: En setup.xml, cambiar a esto&lt;endBodyHtml (pero cambiar la dirección de correo electrónico a su dirección de correo electrónico y sentirse libre de hacer otros cambios) :
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * ALTO RECOMENDADO: En setup.xml, el recomendado&lt;theShortDescriptionHtml ES ahora
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

Siéntete libre de cambiar esto, en particular la última frase del primer párrafo.
    * En setup.xml, emailTodoPara y emailDailyReport Ahora puede ser listas separadas por coma de direcciones de correo electrónico. El primer emailTodo Para es especial, por ejemplo, las suscripciones a EDDXxxDeErddap datasets utilizan esa dirección de correo electrónico. Gracias a John Maurer.
    * Los errores de correo electrónico ahora se registran en\\[bigParentDirectory\\]/logs/emailLogYYY-MM-DD.txt file.
    * En setup.xml, hay un nuevo parámetro opcional para establecer propiedades de la cuenta de correo electrónico (normalmente justo después de&lt;emailPassword confiar):
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

El defecto no es nada. Gracias a Rich Signell.
    * NECESITA: Si usas EDDTableCopy oEDDGridCopiado, usted debe DELETE todos\\[bigParentDirectory\\]/copía/ directorios y archivos que contienen "xh" en el directorio o nombres de archivo después de detener el viejoERDDAP™y antes de comenzar el nuevoERDDAP™para que esos archivos se vuelvan a copiar. Lo siento mucho, pero fue importante hacer el cambio y espero que afecte a pocos administradores y pocos archivos.
En Linux, puedes encontrar estos archivos con, cd\\[bigParentDirectory\\]/copia
encontrar .\\*xh\\*  
En Windows, puede encontrar estos archivos con, Inicio|Búsqueda
Qué desea buscar: Documentos
Todo o parte del nombre de archivo: xh
Mira en: Navega - título\\[bigParentDirectory\\]/copia
Haga clic en 'Buscar'
^A para seleccionar todos
Del para eliminarlos todos
    * Requerido: Endatasets.xml, para EDDTableDesde conjuntos de datos de base de datos, para variables fecha y hora, cambiar los datos Escriba a doble y las unidades a segundos desde 1970-01T00:00:00Z. NECESITAMOS que almacena datos de temporizador en la base de datos\\*con\\*una zona horaria. Sin información de la zona temporal, las consultasERDDAP™envía a la base de datos y los resultadosERDDAP™obtiene de la base de datos a través de JDBC son ambiguos y es probable que estén equivocados. Lo intentamos, pero no encontramos ninguna manera confiable de tratar con datos de "temporal sin zona temporal". Creemos que esto es una buena práctica de todos modos. Después de todo, los datos "timestamp without timezone" tienen una zona horaria implícita. Aunque es genial que la zona horaria sea obvia para el administrador de la base de datos, tiene sentido especificarla explícitamente para que otro software pueda interactuar correctamente con su base de datos. Gracias/lo siento Michael Urzen.
    * HIGHLY RECOMMENDED: Indatasets.xml, para habilitar las páginas web .subset para la búsqueda facetada de los conjuntos de datos tabulares, necesita añadir [&lt;subsetVariables&gt; (/docs/servidor-admin/datasets#subsetvariables) a los atributos globales del conjunto de datos.
    * RECOMENDADO: Indatasets.xml, si tiene el conjunto de datos condatasetID="pmelGtsppp", por favor, cambie para ser
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * RECOMENDADO: Indatasets.xml, hay nuevas opciones válidas para [&lt;cdm\\_data\\_type limit;] (/docs/servidor-admin/datasets#cdm_data_type) atributo global, por lo que debe revisar/cambiar el valor de sus conjuntos de datos.
    * Indatasets.xml, el nuevo&lt;sourceNeedsExpandedFP\\_EQ plagagt;] (/docs/server-admin/datasets#sourceneedfp_eq) es útil si el servidor fuente no maneja consistentemente las pruebas &_variable_\\=_value_ correctamente (por el[dificultad general de probar la igualdad de los números de puntos flotantes](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) . sourceNeedsExpandedFP\\_EQ se establece a la verdad por defecto (el ajuste más seguro) Así que no necesitas hacer ningún cambio.
    * Nuevo[EDDTableDesde el aeropuerto](/docs/server-admin/datasets#eddtablefromasciifiles). Gracias a Jerry Yun Pan.
    * Nuevo[EDDTableDeThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Gracias a Roy Mendelssohn.
    * Cambios en[EDDTableDesdeNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)permite que se utilice con una amplia gama de archivos.
    * EDDTableDesdeBMDE ha sido deshabilitado. Ya no hay fuentes de datos activas, apropiadas.
    * En GenerateDatasetXml, el nuevoEDDGridDeThredds Catálogo recoge todo un catálogo de THREDDS (o subconjunto) y generadatasets.xmlcontenido. Gracias al proyecto UAF.
    * GenerarDatasets Xml y DasDds ahora también pusieron sus resultados en\\[bigParentDirectory\\]/logs/log.txt. Gracias a Rich Signell y Charles Carleton.
    * Muchas mejoras en el sistema de acceso. Gracias a POST.
*    **CosasERDDAP™Programadores Necesita saber y hacer:** 
    * Ha habido cambios en el directorio /WEB-INF/lib/. Por favor, cambie la configuración de su curso de javac y java en consecuencia.
    * Hay un nuevo\\[tu Url\\]/erddap/version servicio para determinar la versión de unERDDAP. La respuesta es el texto, por ejemplo,ERDDAP\\_version=1.24 Si recibe un mensaje de error HTTP 404 Not-Found, trate elERDDAP™como versión 1.22 o inferior. Gracias a POST.
*    **Cambios pequeños y correcciones de errores:** 
    
    * EDDTableDesde Cambios de sos:
        * Apoyo para la lectura de IOOSSOSRespuestas XML.
        * Apoyo añadido para la lectura de IOOSSOStexto/csv. (Así que...SOSActualmente los servidores no son compatibles.) 
        * Hizo muchos cambios relacionados con IOOSSOSdetalles del servidor.
        * Apoyo adicional para las consultas BBOX para IOOSSOSyOOSTethys SOSservidores. Estos cambios dan lugar a una gran velocidad para las solicitudes de datos pertinentes. Gracias a IOOSSOS.
    * Texto en.matAhora los archivos de datos tabulares se guardan correctamente. Gracias a Roy Mendelssohn.
    *   WMS
        *   OpenLayersahora está lleno deERDDAP™para uso enWMSpáginas web. Esto arregla el problema causado cuandoOpenLayerscambió hace unos meses y previene problemas futuros.
        * En elWMS GetCapabilitiesrespuesta, la&lt;OnlineResource valor es ahora la URL de laWMSservicio. Gracias a Charlton Galvarino.
        * Una leyenda se muestra enWMSpágina web para mostrar la barra de colores. Gracias a Emilio Mayorga.
    *   EDDGridAggregateExistingDimension constructor tenía problemas si la fuente de un eje Los valores no eran iguales a su destino Valores, por ejemplo, si el tiempo de origen era algo más que"seconds since 1970-01-01". GraciasToddSpindler.
    * En TableWriterGeoJson, el exceso ',' después de bbox\\[...\\]ha sido eliminado. Gracias a Greg Williams.
    * Muchos pequeños cambios y correcciones de errores.
    
## Versión 1.22{#version-122} 
 (publicado 2009-07-05) 

* El fallo SlideSorter introducido en 1.20 es fijo.
* El fallo del OBIS introducido en 1.20 es fijo.
* Se eliminaron las referencias a conjuntos de datos de Jason en la página imágenes/gadgets/GoogleGadgets.
     
## Versión 1.20{#version-120} 
 (publicado 2009-07-02) 

*   ERDDAP™administradores, por favor agregue esto a su archivo setup.xml:
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* Nuevos tipos de conjunto de datos[EDDGridCopiado](/docs/server-admin/datasets#eddgridcopy)y[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy)hacer y mantener una copia local de otraEDDGrido datos de EDDTable y servir datos de la copia local. Son muy fáciles de usar y muy eficaces **soluciones a algunos de los mayores problemas con el servicio de datos de fuentes de datos remotas:** 
    
    * El acceso a los datos de una fuente remota de datos puede ser lento (por diversas razones) .
    * El conjunto de datos remoto a veces no está disponible (de nuevo, por diversas razones) .
    * Confiar en una fuente para los datos no escala bien (por ejemplo, cuando muchos usuarios y muchosERDDAPs utilizarlo) .
    
Además, la copia local es una copia de seguridad del original, que es útil en caso de que algo le pase al original.
    
No hay nada nuevo sobre hacer una copia local de un conjunto de datos. Lo nuevo aquí es que estas clases lo hacen\\*fácil\\*crear y crear\\*mantener\\*una copia local de los datos de\\*variedad\\*de tipos de fuentes de datos remotas y\\*añadir metadatos\\*mientras copia los datos.
    
Estos tipos de conjuntos de datos forman parte de un conjunto completo de características que simplifican la creación de[grids/clusters/federations ofERDDAPs](/docs/server-admin/scaling)para manejar cargas muy pesadas (por ejemplo, en un centro de datos) .
    
* Nuevo tipo de dataset[EDDTableDesde la base de datos](/docs/server-admin/datasets#eddtablefromdatabase)obtiene datos de una tabla de bases de datos local o remota.
*   ERDDAP™ahora tiene un[seguridad](/docs/server-admin/additional-information#security)sistema que admite autenticación (permitiendo a los usuarios iniciar sesión) y autorización (les otorga acceso a determinados conjuntos de datos privados) .
* Hay[dos, nuevas herramientas de línea de comandos](/docs/server-admin/datasets#tools)para ayudarERDDAP™administradores generan el XML para un nuevo conjunto de datosdatasets.xml:
    * GenerarDatasets Xml puede generar un borrador aproximado del XML de conjunto de datos para casi cualquier tipo de conjuntos de datos.
    * DasDds le ayuda a probar y perfeccionar repetidamente el XML para un conjunto de datos.ERDDAP's GenerateDatasets Se han eliminado las páginas web de Xml. Por razones de seguridad, sólo apoyaron algunos tipos de conjunto de datos. Las nuevas herramientas de línea de comandos son una mejor solución.
* El nuevo[página de estado](/docs/server-admin/additional-information#status-page)deja a alguien (pero notablemente administradores) el estado de unaERDDAP™desde cualquier navegador por\\[base\\]/erddap/status.html.
* Tabledap ahora soporta[Funciones lado servidor](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions):
    * Distinct () elimina las filas duplicadas de la tabla de respuesta,
    * &quot;orderBy (...) le permite especificar cómo debe clasificarse la tabla de respuesta,
    * &quot;orderByMax (...) le permite especificar cómo la tabla de respuesta debe ser ordenada y elimina todas las filas excepto para las filas con los valores máximos en la última columna especificada. Esto se puede utilizar, por ejemplo, para obtener los últimos datos disponibles para cada estación.
* Los conjuntos de datos tabulares ahora pueden incluir variables dateTime adicionales que no se llaman"time". Estas variables son reconocidas por sus metadatos "unidades" que deben contener" since "  (para la fecha numérica Times) o "sí" o "sí" (para el formato de fecha de montaje) . Pero por favor, sigue usandodestinationName "time"para la fecha principal Variable de tiempo.
*   ERDDAP™ahora genera un[sitemap.xml](/docs/server-admin/additional-information#sitemapxml)archivo, que dice motores de búsqueda que suERDDAPsólo necesita ser arrastrado cada mes.ERDDAP™administradores, por favor siga[estas instrucciones](/docs/server-admin/additional-information#sitemapxml)para notificar a los motores de búsqueda sobre el nuevo archivo sitemap.xml.
*   ERDDAP's mensajes de error son ahora mucho más cortos y engranados a los clientes (no programadores) . Gracias a Greg Williams.
* [&lt;requestBlacklist confiar] (/docs/servidor-admin/datasets#requestblacklist) ahora también admite direcciones IP donde el último número ha sido reemplazado por \\*.
* Solicitudes.jsony archivos .geoJson ahora puede incluir un opcional[jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)solicitud agregando ".jsonp=_functionName_ al final de la consulta. Básicamente, esto acaba de decirERDDAP™para añadir "_functionName_ (" al comienzo de la respuesta y ") " al final de la respuesta. Si originalmente no había ninguna consulta, deja fuera del "plaza" en tu consulta. Gracias a Greg Williams.
* Se agregaron muchas nuevas estadísticas a las[Daily Report](/docs/server-admin/additional-information#daily-report).
* En las páginas web con listas de conjuntos de datos, institución y id están ahora a la derecha. Esto mueve la suscripción y otras columnas más útiles a la vista en pantallas de computadora estrechas.
* En todas las páginas web, el título de la página (basado en&lt;título de propiedad&lt;startHeadHtml] que usted define en setup.xml) se modifica para incluir una mejor descripción de la página web (por ejemplo, incluyendo el título e institución actual del conjunto de datos) .
* La información Xmx se incluye ahora con la información de memoria impresa en log.txt, el Daily Report, y sobre status.html. Gracias a Ellyn Montgomery.
*   ERDDAP™tiene protección adicional para fines generales contra todos los errores (por ejemplo, OutOfMemoryError) . Gracias a Charles Carleton.
* Mejoras en el manejo de errores si la respuesta ya se ha cometido.
* IMPROVED: EDDTableDeFiles yEDDGridDeFiles ahora sólo permite&lt;metadatosDesde primero o último. penúltimo ya no es compatible. Y primero y último están basados en el últimoModifiedTime de los archivos.
* Corrección de errores: en EDDTableDesdeSOS, información inválida para una estación lanzó una excepción y causó que todo el conjunto de datos fuera rechazado. Esas estaciones son ignoradas. (y el mensaje de error se ha registrado para log.txt) . Gracias a Rick Blair.
     

## Versión 1.18{#version-118} 
 (publicado 2009-04-08) 

* Corrección de errores: A partir de 1.14, el formulario de acceso de datos EDDTable y Hacer una página web de Gráfico no se ocupó adecuadamente de las restricciones citadas.
* Corrección de errores: A partir de 1.14, EDDTableDeDapSequence no se ocupó correctamente de las limitaciones de tiempo si las unidades de tiempo de origen no eran "segundos desde 1970-01T00:00:00".
     

## Versión 1.16{#version-116} 
 (publicado 2009-03-26) 

*   ERDDAP™administradores:
    * Esta es una liberación importante porque arregla un fallo que dejó unERDDAP™Correr el hilo si utiliza Tomcat Manager para Parar/Iniciar o RecargarERDDAP. Así que cuando instales 1.16, no sólo use el gerente de Tomcat para desplegar el viejoERDDAP™e implementar el nuevoERDDAP. En su lugar: **undeploy el viejoERDDAP™, reiniciar Tomcat (o el servidor) , luego desplegar el nuevoERDDAP.** Siempre es una buena idea hacer eso al instalar una nueva versión.
    * Añádase [por favor]&lt;requestBlacklist&lt;/requestBlacklist confiar] (/docs/servidor-admin/datasets#requestblacklist) a sudatasets.xml. Esto se puede utilizar para especificar una lista de direcciones IP cliente para ser bloqueado (por ejemplo, para evitar un ataque de Servicio o un robot web demasiado celoso) .
* Ahora hay un\\[bigParentDirectory\\]/logs directorio para mantener elERDDAP™archivos de registro. Cuando empiecesERDDAP™, hace una copia de archivo del log.txt y registro. archivos txt.previous con un sello de tiempo. Si hubo problemas antes del reinicio, puede ser útil analizar estos archivos.
*   ERD'sERDDAP™ahora tiene el sistema de suscripción encendido.
*   ERDDAP™una vez más permite (pero todavía no recomienda) la codificación "%26" de "cliente" en URLs de solicitud (ver el[cambios relacionados v1.14](#percent26)) .
* Varias nuevas adiciones a la sección Tally de la[Daily Report](/docs/server-admin/additional-information#daily-report).
* Pequeñas correcciones de errores en generarDatasetsXml.
* Unas pequeñas correcciones de errores.
     

## Versión 1.14{#version-114} 
 (publicado 2009-03-17) 

* Cambios para los usuarios:
    * En las solicitudes de datos de red,ERDDAP™ahora soporta:[último-n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)donde n es un número entero de índices y[ (ultimo d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)donde d es un valor numérico (para el tiempo, es en segundos) .
    * En las solicitudes de datos tabulares, las limitaciones de String ahora requieren[citas dobles](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)alrededor del valor, por ejemplo, "id="NDBC40121" Esto es requerido por elDAPprotocolo.
    * En solicitudes de datos tabulares,ERDDAP™ahora requiere que[todas las restricciones se codifican correctamente](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode). Los navegadores hacen esto automáticamente, por lo que esto afecta principalmente a los programas/scriptos informáticos que están accediendoERDDAP.
#### Porcentaje26{#percent26} 
*   [Anteriormente,](#percent26)el[incrustar una página web gráfica](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)y el[ERDDAP™Página web de Google Gadget](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)dijo que reemplace el "plaza" en la URL de la imagen con "%26". A partir de ahora, debe reemplazar el "pac" en la URL de la imagen con "plamp;". Así que necesita reemplazar cualquier "%26" en las páginas web existentes y Google Gadgets con "clamp;". (Lo siento.) 
*   ERDDAP™administradores, por favor:
    * Añadir el siguiente a su[setup.xml](/docs/server-admin/deploy-install#setupxml)archivo (y cambiar la bandera Valor clave) :
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * En la línea después&lt;emailUserName confiar en tu[setup.xml](/docs/server-admin/deploy-install#setupxml)archivo, añadir
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
e introduzca su contraseña real.
    * Puedes cambiar&lt;wmsSampleBBox confianza en su[setup.xml](/docs/server-admin/deploy-install#setupxml)archivo para incluir valores de longitud hasta 360, por ejemplo,
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * En tudatasets.xmlarchivo, renombrar el tipo de conjunto de datos EDDTableDesdeNc4DFiles a EDDTableDesdeNcFiles (que ahora soporta archivos con cualquier número de dimensiones) . Si tenía un conjunto de datos EDDTableDesdeNc4DFiles:
        
        1. Usted debe cambiar a tipo="EDDTableDesdeNcFiles" en sus conjuntos de datos. Archivo XML.
        2. Debes añadir un&lt;nDimensiones relacionadas 4&lt;/nDimensiones clave para el XML del conjunto de datos.
        3. Usted puede añadir el nuevo&lt;sortFilesBySourceNames confianza tag para especificar el orden interno de los archivos, que determina el orden general de los datos devueltos.
        
Para más detalles, consulte[EDDTableDeFiles](/docs/server-admin/datasets#eddtablefromfiles).
    * En el pasado, para EDDTableDesde Washington, paraOPeNDAPServidores DRDS, endatasets.xml, usamos&lt;sourceCanConstrainStringsRegex confía~=&lt;/sourceCanConstrainStringRegex. Pero ahora vemos que el apoyo de DRDS reex es más limitado queERDDAP's, por lo que recomendamos&lt;sourceCanConstrainStringsRegex&lt;/sourceCanConstrainStringRegexilo para que las restricciones regex no sean transmitidas a la fuente, sino que sean manejadas porERDDAP.
    * Manejo renovado de fuenteCanConstrain... dentrodatasets.xmlpor[EDDTableDeDapSequence](/docs/server-admin/datasets#eddtablefromdapsequence)y (internamente) todos los tipos EDDTable dataset. El nuevo sistema es más sencillo y refleja mejor la variabilidad de diferentes fuentes de datos. Es posible que necesite modificar el XML para sus conjuntos de datos endatasets.xml.
* Hay varias características nuevas que son útiles por sí mismas, pero cuando se combinan, también facilitan la creación de[grids/clusters/federations ofERDDAPs](/docs/server-admin/additional-information#grids-clusters-and-federations).
    * Nuevos tipos de conjunto de datos:
        *   [EDDGridFromErddap](/docs/server-admin/datasets#eddfromerddap)y[EDDTableDeErddap](/docs/server-admin/datasets#eddfromerddap)que dejó unoERDDAP™incluir un conjunto de datos de otroERDDAP™de una manera muy simple y muy eficiente.
        *   [EDDGridDeFiles](/docs/server-admin/datasets#eddgridfromfiles)  (y su subclase,[EDDGridFromNcFiles](/docs/server-admin/datasets#eddgridfromncfiles)que puede leerNetCDF .nc, GRIB .grb, yHDF .hdfarchivos) .
        *   [EDDTableDesdeNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)que puede leerNetCDF .ncque tienen una estructura tipo mesa.
    * RunLoadDatasets y LoadDatasets fueron renovados para queERDDAP™es muy sensible a la recarga de conjuntos de datos basados en archivos en los[bandera](/docs/server-admin/additional-information#flag)directorio (a menudo&lt;5 segundos si la carga principalDatasets se hace actualmente).
    * Nuevo servicio para permitir[una URL para crear un archivo de bandera](/docs/server-admin/additional-information#set-dataset-flag)para un conjunto de datos dado, por ejemplo,
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
crea un archivo de bandera en el directorio de bandera para rPmelTao (aunque la bandera La llave aquí está equivocada.) .
    * Nuevo[suscripción](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)servicio para que cualquier cliente pueda especificar una acción que se hará cuando se crea un conjunto de datos específico (cuandoERDDAP™está descansado) y siempre que el conjunto de datos cambie de cualquier manera. Este sistema puede desactivarse a través de&lt;suscripcionesSistemActive confiar en su[setup.xml](/docs/server-admin/deploy-install#setupxml)archivo. ElERDDAP™ [Daily Report](/docs/server-admin/additional-information#daily-report)ahora enumera todas las suscripciones e incluye la URL necesaria para cancelar cada una, en caso de que sienta que el sistema está siendo abusado. Indatasets.xml, hay un nuevo, opcional [&lt;suscripción EmailBlacklist confiar] (/docs/server-admin/datasets#subscriptionemailblacklist) tag para que los administradores puedan especificar una lista separada por coma de direcciones de correo electrónico que son inmediatamente enlistadas desde el sistema de suscripción.
    * Nuevo [&lt;onChange Conf] (/docs/servidor-admin/datasets#onchange) atributodatasets.xmldeja que elERDDAP™administrador especificar una acción que se hará cuando se crea un conjunto de datos específico (cuandoERDDAP™está descansado) y siempre que el conjunto de datos cambie de cualquier manera.
    * Mejoras para la búsqueda completa de texto: almacenar la cadena de búsqueda para cada conjunto de datos ahora utiliza 1/2 la memoria. El algoritmo de búsqueda (Boyer-Moore-like) ahora es 3X más rápido.
    * Correos electrónicos deERDDAP™ahora siempre prepagó el tema y el contenido con\\[Erddap Url\\], para que sea claro cuálERDDAP™esto vino de (en caso de que usted administra múltiplesERDDAPs) .
    * Reunión de estadísticas más extensa para[Daily Report](/docs/server-admin/additional-information#daily-report)correo electrónico.
    * Nuevo archivo de registro\\[bigParentDirectory\\]/emailLogYEAR-MM-DD.txt registra todos los emails enviados porERDDAP™cada día. Esto es especialmente útil si su servidor no puede enviar correos electrónicos -- al menos puede leerlos en el registro.
    *   ERDDAP™Ahora hace un\\[bigParentDirectory\\]/cache/ (datasetID) directorio para cada conjunto de datos ya que puede haber muchos archivos caché.
* Nuevo[RSS2.01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)feed for each dataset (buscar la naranjaRSSiconos en listas de conjuntos de datos, formularios de acceso a datos y hacer páginas web de gráficos) .
*   EDDGrid .kmlrespuestas ahora utilizan imágenes de azulejos ("superoverlays" - imágenes de quadtree generadas dinámicamente) . La imagen inicial se carga en GoogleEarth mucho más rápido que antes. La resolución del mapa aumenta a medida que aumenta, hasta la resolución completa del conjunto de datos. Recomendar: los usuarios deben solicitar.kmlpor un punto de tiempo, pero toda la longitud, latitud del conjunto de datos. Lamentablemente, se removió el apoyo a los intervalos de tiempo (Espero que regrese.) .
*   ERDDAP™ahora añade[Expires and Cache-Control max-age headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)a todos los archivos solicitados desde el directorio /images. Esto reduce enormemente el número de solicitudes de archivos estáticos enviadas aERDDAPy por lo tanto grande acelera la mayoríaERDDAP™cargas de página. Además, muchosJavaLas referencias del archivo Script se trasladaron al fondo de sus páginas HTML, que también aceleran muchosERDDAP™cargas de página. Gracias al libro "High Performance Web Sites" de Steve Souders y a la ySlow adición al plugin FireBug en FireFox.
*   ERDDAP™conmutado de netcdf-java 2.2.22 a netcdf-java 4.0. Entre otras cosas, esto permiteEDDGridFromNcFiles para leerHDF .hdf, así como GRIB .grb yNetCDF .ncarchivos.
*   EDDGridDeDap yEDDGridFromNcFiles ahora también soporta DArray (y DGrid)  dataVariables. Si una dimensión no tiene una variable de coordenadas correspondiente,ERDDAP™crea una variable de eje con los valores índice (por ejemplo, 0, 1, 2, ..., 311, 312) . Así que todos los demás aspectosEDDGridpermanecer el mismo:
\\* Todavía sirve todos los conjuntos de datos como Grids, con una variable de eje para cada dimensión.
\\* Las consultas todavía pueden solicitar valores de las variables del eje.
Gracias a Charles Carleton, Thomas Im, Dorian Raymer y otros.
* ElWMS OpenLayerspáginas ahora tienen una longitud predeterminada, rango de latitudes que es un poco más grande que el rango del dataset (no el rango exacto, por lo que el contexto de pequeños conjuntos de datos es más obvio) . El rango predeterminado también puede ser de 0 a 360, lo que permite que la gama completa de muchos conjuntos de datos se muestre ahora. GraciasToddSpindler.
* Nuevos deslizadores en algunos formularios de acceso de datos y hacer páginas web de Gráfico. Ellos simplifican (crudo) especificación de los datos deseados y ofrecer una buena retroalimentación visual.
* Una nueva opción para la&lt;dataset etiquetas endatasets.xml:[activo="falso"](/docs/server-admin/datasets#active).
* Referencias aERD'sERDDAP™cambiado desde el reloj de costa.pfel (todavía funciona a través de proxy) a Coastwatch.pfeg (preferido) .
* Nuevo apoyo para[data\\_minydata\\_max](/docs/server-admin/datasets#data_min-and-data_max)atributos de metadatos variables.
* Una solución parcial a la[WaitThenTryAgain / Excepción de Resultados Parciales](/docs/server-admin/additional-information#waitthentryagain-exception): Ahora bien, algunas solicitudes que anteriormente fallaron cuando se detectó un cambio de fuente de datos tendrán éxito porqueERDDAP™volver a cargar el conjunto de datos y volver a solicitar los datos automáticamente, todo en el contexto de la solicitud original.
* Corrección de errores: generar Datasets Xml estaba desactivadoERDDAP™versión 1.12. Gracias a Ellyn Montgomery por señalar esto.
* Pequeños cambios en el manejo de errores.
* Muchas mejoras para evitar/salir con posibles condiciones de carrera (es decir, posibles problemas derivados de la naturaleza multi-teleadaERDDAP) que causó problemas pequeños e infrecuentes.
* Ahora, si un mensaje de error está escrito en una imagen, la imagen sólo permanecerá en el caché por ~5-10 minutos (no 60) . Gracias a Cara Wilson.
* El mensaje estándar cuando no hay datos es ahora "Tu consulta no produjo resultados coincidentes".OPeNDAPservidores.
*   EDDGridya no permite valores de eje atado.
* Pequeños cambios a .ver y .help solicitudes.
* Muchos pequeños cambios y correcciones de errores.
     

## Versión 1.12{#version-112} 
 (publicado 2008-10-31) 

* EDDTableDesdeSOSuna vez más trabaja con NDBCSOSy trabaja con el nuevo NOSSOS.
* EDDTableDeBMDE ahora requiereERDDAP™Administración para especificardataVariables.
*   EDDGridya no requiere que lat y lon sean uniformemente espacio para . transparente Png o.kml. GraciasToddSpindler.
* Algunos pequeños cambios.
     

## Versión 1.10{#version-110} 
 (publicados en 2008-10-14) 

* Nuevos metadatos "colorBar" para variables de datosdatasets.xmldefine la configuración predeterminada de barras de color para gráficos y mapas. See[más información](/docs/server-admin/datasets#color-bar-attributes). Esto es importante porque mejora enormemente la apariencia de los gráficos y mapas predeterminados producidos por Make A Graph y porque los gráficos y mapas predeterminados ahora tienen una barra de color consistente incluso cuando el cliente cambia el tiempo solicitado o rango geográfico. Además, esto era necesario paraWMS.
*   ERDDAP™ahora sirve la mayoría de los datos de la red a través deWMSservicio. Esto es importante porque muestra que, además de obtener datos de muchos tipos de servidores de datos,ERDDAP™puede distribuir datos a través de diferentes protocolos (DAP,WMS... más en el futuro) . Ver el[documentación del cliente](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html). O el[documentación para los administradores](/docs/server-admin/datasets#wms). O[Pruébalo.](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html).
* Nuevo soporte para valores de longitud √180 en.kmlarchivos.
* Nuevo cdm\\_data\\_tipo: Otros .
*   ERDDAP™ahora soporta datos de fuente "boolean"Type. See[más información](/docs/server-admin/datasets#boolean-data)Esto será útil para el futuro EDDTableDesdeDatabase.
* Nueva EDDTableDesdeBMDE es compatible con fuentes de datos DiGIR/BMDE.
* EDVGridAxis ahora permite descender valores ordenados. Los datasets pmelOscar necesitaban esto.
*   ERDDAP™ahora devuelve errores HTTP (por ejemplo, "404 para recursos/página no encontradas") en más situaciones, en lugar de páginas HTML con mensajes de error.
* Gran cantidad de cambios/addiciones a losERDDAP™documentación.
* Muchos cambios pequeños.
* Algún problema.
*    **CosasERDDAP™los administradores deben hacer para actualizar a esta versión:** 
    * Indatasets.xml, para cualquier EDDTableDesdeSOSdatasets, cambiar metadatos "observadosProperty" a "sourceObservadoProperty".
    * Las reglas para unaxisVariableodataVariable'sdestinationNameahora[más estricto](/docs/server-admin/datasets#datavariable-addattributes). Necesita comprobar que sus nombres variables son válidos. O compruébalos a mano, o correERDDAP™y ver los mensajes de error en el informe que se envía por correo electrónico al administrador.
    * Indatasets.xml, si desea que una variable de datos de la red sea accesibleWMSNecesitas añadir metadatos de colorBar. Por lo menos, por ejemplo,&lt;Anombre=colorBarMinimum"tipo="doble"&lt;/att confianza
```
          <att name="colorBarMaximum" type="double">32</att>  
```
See[más información](/docs/server-admin/datasets#wms).
    * Añadir el siguiente a su[setup.xml](/docs/server-admin/deploy-install#setupxml)archivo (pero personalizarlo con tu información) :

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## Versión 1.08{#version-108} 
 (publicado 2008-07-13) 

* Un nuevo servicio web enERDDAP™, generar Datasets Xml, ayudasERDDAP™administradores mediante la creación de un borrador aproximado del XML necesario para describir un conjunto de datosdatasets.xml
* Algunos cambios / correcciones de disco relacionados con permitir que el griddap sea visto por netcdf-java como un servidor de opendap, incluyendo: metadatos globales ahora se etiqueta "NC\\_GLOBAL" (en lugar de "GLOBAL") .
* ElEDDGridy EDDTable Data Access Forms ahora utilizan información de consulta en la URL. Así, por ejemplo, si un usuario va de un formulario Make A Graph a un formulario de acceso a datos, las limitaciones se transfieren ahora adecuadamente.
*   tabledap's Make A Graph ahora permite restricciones en variables String.
* EDDTable's Make A Graph ahora permite restricciones NaN. Gracias a Steve Hankin.
* Corrección de errores: EDDTable guardar AsImage no reconoció correctamente los valores .colorbar min y max. Gracias a Steve Hankin
* Muchas mejoras en la configuraciónDatasetsXml. Gracias a Ellyn Montgomery.
* Las solicitudes de Griddap ahora permiten () - solicitudes de estilo ligeramente fuera del rango del eje real. Esto es apropiado ya que () - los valores se redondean al valor real más cercano. Gracias a Cindy Bessey
* Hice la prueba FloatArray y DoubleArray de isEvenlySpaced más sofisticado. Siempre será imperfecto. (porque la prueba tendría que ser personalizada para cada conjunto de datos) Pero debería ser mejor. Gracias a Ellyn Montgomery.
* Moví la configuración.html y configuraciónDatasets Xml.html directorio de erddap /download y codificado duro todos los enlaces a ellos. Ahora, puedo hacer cambios y actualizar la información de configuración inmediatamente.
* Muchos pequeños cambios. Unas pequeñas correcciones de errores.
*    **CosasERDDAP™los administradores deben hacer para actualizar a esta versión:** 
    * Moveos&lt;theShortDescription Html ES de tus mensajes.xml a tu[setup.xml](/docs/server-admin/deploy-install#setupxml)archivo. Especifica el texto que aparece en medio del lado izquierdo delERDDAP™página principal. Además, añadir&lt;h1ERDDAP&lt;/h1 titulado (o algún otro título) hasta arriba. **O,** Copia&lt;theShortDescriptionHtml confiar en el nuevo[setup.xml](/docs/server-admin/deploy-install#setupxml)archivo (del nuevo erddapContent.zip) en tu setup.xml.
         

## Versión 1.06{#version-106} 
 (publicados 2008-06-20) 

* Nuevo apoyo paraIOOS DIF SOSFuentes de datos.
* Muchos pequeños cambios. Unas pequeñas correcciones de errores.
     

## Versión 1.04{#version-104} 
 (publicado 2008-06-10) 

* Nuevo Sorter de diapositivas.
* Nueva página de Google Gadgets y ejemplos.
* Corrección de erroresEDDGrid.saveAsNc para variable con escala y addOffset.
     

## Versión 1.02{#version-102} 
 (publicado 2008-05-26) 

* NuevoEDDGridSideBySide permite diferentesaxisVariables\\[0\\]fuente Valores.
* Todas las corrientes y conjuntos de datos de viento se fusionaron enEDDGridDatasets SideBySide.
* Las imágenes de las solicitudes de imagen están ahora en caché durante 1 hora.
     

## Versión 1.00{#version-100} 
 (publicado 2008-05-06) 

* Haga un Graph páginas web y comandos gráficos en URLs.
* Soporte para archivos de bandera para forzar la recarga de un conjunto de datos.
* Nuevo tipo de conjunto de datos: EDDTableDesde4DFiles (la primera subclase de EDDTableDesdeFiles) .
