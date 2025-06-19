---
sidebar_position: 9
---
# Prometeo

[Prometheus metrics](https://prometheus.io/)están disponibles en /erddap/metrics. Las métricas de núcleo JVM se agregaron en 2.25 con muchosERDDAP™métricas agregadas en la versión 2.26. Si desea utilizar las métricas, asegúrese de estar en al menos la versión 2.26. Por defecto para habilitar, puede deshabilitarlos añadiendo
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
a tu configuración. xml.

Estas métricas están diseñadas para ser legibles por máquina. Si bien puede comprobar manualmente la página de métricas, para el monitoreo en profundidad se recomienda utilizar un servidor Prometheus. Un servidor Prometheus almacenará métricas históricas que permiten un seguimiento más profundo (como tasas y cambios de valores pasados) , y también se ejecuta con frecuencia con un servidor Grafana. Proporcionamos algunos paneles preconstruidos que los administradores pueden encontrar útil para empezar a monitorizar sus servidores.

## Running Prometheus server

La mejor documentación para ejecutar la pila de monitoreo (Prometeo + Grafana) está en el Prometeo[readme](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md).

## ERDDAP™métricas

### JVM

ERDDAP™exporta una serie de métricas que puede encontrar útil (empezandoERDDAP™2.25) . Para el monitoreo general de la salud del JVM utilizamos las métricas recolectadas por el cliente Prometheus. Esto incluye datos sobre recolección de basura, uso de memoria, hilos y más. Para más información vea el[PrometeoJavaDocumentación del cliente JVM](https://prometheus.github.io/client_java/instrumentation/jvm/).

### ERDDAP™específico

También exportamos una serie deERDDAP™métricas específicas (empezandoERDDAP™2.26) . Si quieres investigar el código, puedes encontrar las métricas recogidas en[Metrics.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java).

#### ERDDAP_build_info

Esta es la información de construcción paraERDDAP™servidor. Incluye versión (major.minor) , version_full (major.minor.patch) , y deployment_info (utilizado para indicar cómo se implementa el servidor, como 'Docker ') .

#### característica_flags

Esta es una métrica de información que muestra el estado actual de las banderas de características. La mayoría de las opciones de configuración booleana se consideran banderas de características.

#### Buffered Imagen

Esta es una métrica de información que indica si la aceleración gráfica está disponible.

#### http_request_duration_seconds

Este es un histograma de duración de respuesta de solicitud en segundos. Las etiquetas son request_type (por ejemplo griddap,tabledap, archivos, wms) , dataset_id (si es aplicable, repite el tipo de solicitud) , file_type (formato de salida para solicitud e.g. '.html', '.csv', '.iso19115 ') , lang_code (idioma para la solicitud, o cadena vacía si por defecto) , status_code (httpcódigo de estado de la solicitud, por ejemplo 200, 302, 404) .

Esto se puede utilizar para rastrear las solicitudes por dataset id para determinar los conjuntos de datos populares del servidor. También puede ayudar a identificar si hay tipos particulares de solicitudes que son lentas en su servidor.

#### touch_thread_duration_seconds

Un histograma de duración de la tarea del hilo táctil. Están etiquetados con éxito (verdadero/falso) .

#### task_thread_duration_seconds

Un histograma de duración del hilo de tarea. Están etiquetados con éxito (verdadero/falso) y task_type (intetger) .

#### load_datasets_duration_seconds

Un histograma de duración para tareas de conjunto de datos de carga. Están etiquetados con mayor (verdadero/falso) .

#### email_thread_duration_seconds

Un histograma de duración de la tarea del hilo de correo electrónico. Están etiquetados con éxito (verdadero/falso) .

#### email_count_distribución

Un histograma de correos electrónicos por tarea.

#### dataset_count

Un medidor de los conjuntos de datos, establecido después de cada llamada de conjuntos de datos de carga. Esto se etiqueta con la categoría (grid, table) .

#### dataset_failed_load_count

Un medidor de los conjuntos de datos que no se cargaron, establecido después de cada llamada de conjuntos de datos de carga.

#### shed_requests_total

Contrato de solicitudes que fueron canceladas. El servidor cancelará una solicitud cuando crea que el servidor está bajo en memoria (RAM) y la solicitud causaría problemas. Esto no incluye solicitudes de error debido a la baja RAM o espacio de disco durante el manejo de la solicitud.

#### dangerous_memory_emails_total

Contrarior de veces el servidor intenta enviar un correo electrónico al administrador que la memoria es peligrosamente baja.

#### dangerous_memory_failures_total

Contrata de solicitudes que fallaron debido a la máquina que se agotó de la memoria. A menudo esto es porque la máquina está recibiendo muchas solicitudes costosas o la petición individual fue excepcionalmente grande.

#### topo_request_total

Contrato de solicitudes de datos de topo. Esto es caché etiquetado (cached/not_cached) .

#### Boundary Counters

También hay una colección de contadores para solicitudes de límites:

 - national_boundaries_request_total
 - state_boundaries_request_total
 - river_boundaries_request_total
 - gshhs_request_total

Estos son etiquetados con estado (grueso, éxito, sacudido) .
