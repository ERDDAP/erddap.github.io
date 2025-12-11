# Banderas de alimentación

Esta página documenta las banderas de configuración disponibles en el sistema. Estas banderas controlan varias características, capacidades experimentales y comportamientos heredados.

##  **Bandera Lifecycle Legend** 

*  **Stable:** Intended como banderas a largo plazo para permitir que los administradores cambien la funcionalidad. Seguro para producción.
*  **Pruebas:** Características que están listas para la prueba. Estos se graduarán a "Stable" o eventualmente se establecerán a su valor objetivo y eliminarán la bandera.
*  **En construcción:** Actualmente codificado para falsear en el código, independientemente de la configuración. La característica todavía no está lista para su uso.

##  **🚀 Optimizaciones en las pruebas** 

Estas son banderas que probablemente serán eliminadas en el futuro.

###  **touchThreadOnlyWhenItems** 

Descripción
Bandera de optimización. Si es cierto, el hilo táctil sólo funciona cuando hay elementos para procesar.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Pruebas | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 2.29.0 | 

###  **taskCacheClear** 

Descripción
Permite la tarea de fondo que despeja los elementos caducados del caché.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 2.27.0 | 

###  **ncHeaderMakeFile** 

Descripción
Si es cierto, el servidor generará todo el archivo nc antes de crear el resultado ncheader. El nuevo (preferido) comportamiento cuando falso es generar directamente el resultado del ncheader.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Pruebas | 
 |   **Default actual**   | falso | 
 |   **Objetivo a largo plazo**   | falso | 
 |   **Historia**   | Añadido en 2.29.0 | 

###  **useEddReflection** 

Descripción
Permite el uso de Java Reflexión a la EDD instantánea ( ERDDAP Dataset) clases.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Pruebas | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Cambio por defecto en 2.28.0, añadido en 2.25 | 

###  **fondoCrearSubsetTablas** 

Descripción
Permite crear tablas de subconjuntos en hilos de fondo para mejorar el tiempo de carga de conjuntos de datos.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Pruebas | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 2.29.0 | 

###  **useNcMetadataForFileTable** 

Descripción
Usos NetCDF metadatos para poblar la vista de la tabla de archivos. En particular, si un archivo nc incluye actual_range para cada variable, la carga de conjunto de datos puede saltar a leer todo el archivo.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 2.29.0 | 

##  **Sistema &quot; Comportamiento básico &quot;** 

###  **email Es Activo** 

Descripción
Controla si el sistema intenta enviar correos electrónicos reales (por ejemplo, para actualizaciones de suscripción o informes de error) a través del servidor SMTP configurado.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | falso | 
 |   **Objetivo a largo plazo**   | verdadero (Dependente en el config de administración)   | 
 |   **Historia**   | Legacy | 

:::info Logic
Esta bandera se calcula dinámicamente al iniciarse. No es falso a menos que todas las credenciales SMTP requeridas (host, port, user, password, from-address) se proporcionan estrictamente en setup.xml.
:::

###  **showLoadErrorsOnStatusPage** 

Descripción
Determina si los errores detallados de carga de conjunto de datos se muestran públicamente en la página de estado.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | conjunto como se desea | 
 |   **Historia**   | Añadido en 2.25 | 

###  **defaultAccesibleViaFiles** 

Descripción
Establece el comportamiento predeterminado para si los archivos subyacentes de un conjunto de datos se pueden acceder en el servicio de archivos.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | falso | 
 |   **Objetivo a largo plazo**   | falso | 
 |   **Historia**   | Añadido en 2.10 | 

##  **Activos de datos** 

###  **quickRestart** 

Descripción
Si está habilitado, el sistema intenta comenzar más rápido saltando ciertas comprobaciones de validación profunda en conjuntos de datos durante la inicialización.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 1.38 | 

###  **habilitarEnvParsing** 

Descripción
Permite procesar las datasets.xml archivo con un [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Esto tiene muchos usos incluyendo establecer valores privados (como contraseñas) usando variables ambientales.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | conjunto como se desea | 
 |   **Historia**   | Añadido en 2.29.0 | 

###  **useSaxParser** 

Descripción
Intercambia el motor de persing XML interno para utilizar un SAX (API simple para XML) en lugar del analizador DOM. Esto permite algunas nuevas características avanzadas como XInclude, y [atributos de pantalla personalizados](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Pruebas | 
 |   **Default actual**   | falso | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 2.25 | 

###  **listaPrivadaDatasets** 

Descripción
Determina si los conjuntos de datos privados (aquellos que requieren autenticación) aparecen en la lista de conjuntos de datos principales.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | falso | 
 |   **Objetivo a largo plazo**   | falso | 
 |   **Historia**   | Añadido en 1.20 | 

###  **políticosBoundariesActive** 

Descripción
Controla si se pueden dibujar límites políticos en mapas.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 1.80 | 

##  **Metadatos &quot; Normas &quot;** 

###  **fgdcActive** 

Descripción
Genera y sirve a FGDC (Federal Geographic Comité de Datos) metadatos.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 1.38 | 

###  **iso19115 Activo** 

Descripción
Genera y sirve metadatos ISO 19115.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 1.38 | 

###  **useSisISO19115** 

Descripción
Utiliza la biblioteca Apache SIS para generar metadatos ISO 19115 en lugar del generador legado. Si esto está encendido y usoSisISO19139 no está en, los metadatos IOS 19115 predeterminados estarán en formato ISO19115_3_2016. Si esto es falso, el formato predeterminado estará en el formato ISO19115_2.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Pruebas | 
 |   **Default actual**   | falso | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 2.26 | 

###  **useSisISO19139** 

Descripción
Utiliza la biblioteca Apache SIS para generar metadatos ISO19139_2007.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Pruebas | 
 |   **Default actual**   | falso | 
 |   **Objetivo a largo plazo**   | falso | 
 |   **Historia**   | Añadido en 2.29.0 | 

###  **jsonldActive** 

Descripción
Genera y sirve JSON-LD (Datos vinculados) metadatos.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Legacy | 

###  **generarCroissantSchema** 

Descripción
Genera el esquema de metadatos "Croissant" como el esquema predeterminado para la preparación del aprendizaje automático.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Pruebas | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 2.28.0 | 

###  **variablesMustHaveIoosCategoría** 

Descripción
Ejecute que las variables deben tener un atributo de categoría IOOS.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | conjunto como se desea | 
 |   **Historia**   | Legacy | 

###  **incluidoNcCFSubsetVariables** 

Descripción
El comportamiento de Legacy fue generar variables de subconjunto sólo para los conjuntos de datos EDDTableDesdeNcCFFiles. Esto se agregó a predeterminar el comportamiento de EDDTableDesdeNcCFFiles para ser consistente con otros tipos de conjunto de datos. Si necesita el legado automático subsetVariables Puede habilitar esto. La mejor solución sería añadir subsetVariables a la definición de conjunto de datos.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Pruebas | 
 |   **Default actual**   | falso | 
 |   **Objetivo a largo plazo**   | falso | 
 |   **Historia**   | Añadido en 2.26 | 

##  **🔔 Suscripciones y notificaciones** 

###  **SuscríbaseSystemActive** 

Descripción
Permite el sistema de suscripción de correo electrónico para actualizaciones de conjunto de datos.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 1.14 | 

###  **SubscribeToRemoteErddapDataset** 

Descripción
Permite esto ERDDAP instancia para suscribirse a ERDDAP conjuntos de datos para actualizaciones.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 1.70 | 

###  **actualizaciónSubsRssOnFileChanges** 

Descripción
Triggers suscripción y RSS actualizaciones cuando los archivos subyacentes cambian. El comportamiento legado fue sólo para hacer actualizaciones en la recarga de conjuntos de datos (que algunos servidores tenían tan pocas veces como semanales) .

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 2.26 | 

###  **habilitación MqttBroker** 

Descripción
Comienza un broker MQTT interno dentro de la aplicación para manejar la mensajería.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Pruebas | 
 |   **Default actual**   | falso | 
 |   **Objetivo a largo plazo**   | conjunto como se desea | 
 |   **Historia**   | Añadido en 2.29.0 | 

###  **publicarMqttNotif** 

Descripción
Permite la publicación de notificaciones (como cambios de conjunto de datos) al corredor de MQTT.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Pruebas | 
 |   **Default actual**   | falso | 
 |   **Objetivo a largo plazo**   | conjunto como se desea | 
 |   **Historia**   | Añadido en 2.29.0 | 

##  **🌐 Web Headers/Configuration** 

###  **useHeadersFor Url** 

Descripción
Permite utilizar encabezados HTTP para determinar los detalles de URL de solicitud (útil detrás de los proxies) .

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Default cambió a cierto en 2.28.0, Añadido en 2.27.0 | 

###  **habilitación Cors** 

Descripción
Permite la distribución de recursos entre plataformas (CORS) encabeza las respuestas HTTP.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | falso | 
 |   **Objetivo a largo plazo**   | conjunto como se desea | 
 |   **Historia**   | Añadido en 2.26 | 

##  **🔍 Búsqueda** 

###  **useLuceneSearchEngine** 

Descripción
Intercambia el motor de búsqueda interno para usar Apache Lucene.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Pruebas | 
 |   **Default actual**   | falso | 
 |   **Objetivo a largo plazo**   | ? | 
 |   **Historia**   | Legacy | 

##  **📡 Servicios &quot; Protocolos** 

###  **ArchivosActivos** 

Descripción
Permite la vista del navegador "Files" para conjuntos de datos que lo soportan.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 1.58 | 

###  **convertidoresActive** 

Descripción
Permite las herramientas de conversión en la UI.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 1.44 | 

###  **slideSorterActivo** 

Descripción
Permite el Sorter de diapositivas.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 1.44 | 

###  **dataProviderFormActive** 

Descripción
Permite a los proveedores de datos introducir metadatos.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Legacy | 

###  **outOfDateDatasetsActive** 

Descripción
Permite la presentación de datos actualizados.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 1.82 | 

###  **wmsActive** 

Descripción
Permite el Servicio de Mapa Web ( WMS ) Interfaz.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Añadido en 1.44 | 

###  **wmsClientActive** 

Descripción
Permite el interior WMS características del cliente.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Stable | 
 |   **Default actual**   | verdadero | 
 |   **Objetivo a largo plazo**   | verdadero | 
 |   **Historia**   | Legacy | 

###  **geoServicesRestActive** 

Descripción
Permitir a los RESTful interfaz para Servicios Geoespaciales. No se aplica plenamente.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Construcción | 
 |   **Default actual**   | falso (Hardcoded)   | 
 |   **Objetivo a largo plazo**   | verdadero | 

###  **wcsActive** 

Descripción
Permite el servicio de cobertura web ( WCS ) Interfaz. No se aplica plenamente.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Construcción | 
 |   **Default actual**   | falso (Hardcoded)   | 
 |   **Objetivo a largo plazo**   | verdadero | 

###  **sosActivo** 

Descripción
Permite el servicio de observación del sensor ( SOS ) Interfaz.

 | Propiedad | Detalles | 
 | --- | --- | 
 |   **Ciclo de vida**   | Construcción | 
 |   **Default actual**   | falso (Hardcoded)   | 
 |   **Objetivo a largo plazo**   | verdadero | 
