# Créditos

## Contribuciones a ERDDAP™ código{#contributions-to-erddap-code} 
* MergeIR
     [ EDDGrid FromMergeIRFiles.java](/docs/server-admin/datasets#eddgridfrommergeirfiles) fue escrito y contribuido por Jonathan Lafite y Philippe Makowski de R.Tech Engineering (licencia: copyrighted open source) . ¡Gracias, Jonathan y Philippe&#33;
     
* TableWriterDataTable
     [.data Cuadro (TableWriterDataTable.java) ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) fue escrito y contribuido por Roland Schweitzer de NOAA   (licencia: copyrighted open source) . Gracias. ¡Roland&#33;
     
* json-ld
La versión inicial de la [Marcado semántico de conjuntos de datos con json-ld (JSON Datos vinculados) ](/docs/server-admin/additional-information#json-ld) función (y así todo el trabajo duro en el diseño del contenido) escrito y contribuido (licencia: copyrighted open source) por Adam Leadbetter y Rob Fuller del Instituto Marino de Irlanda. Gracias. ¡Adam y Rob&#33;
     
*    orderBy   
El código para el [ orderByMean filtro](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderByMean) dentro tabledap y los amplios cambios en el código para apoyar [_variableName/divisor:offset_ notación](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderByDivisorOptions) para todos orderBy filtros fue escrito y contribuido (licencia: copyrighted open source) por Rob Fuller y Adam Leadbetter del Instituto Marino de Irlanda. Gracias. ¡Rob y Adam&#33;
     
* Tipos de marcadores sin fronteras
El código para tres tipos de marcadores nuevos (Plaza sin fronteras, Círculo sin fronteras, Triángulo sin fronteras) fue contribuido por Marco Alba de ETT / EMODnet Física. Gracias. ¡Marco Alba&#33;
     
* Traducciones de mensajes.xml
La versión inicial del código en TranslateMessages.java que utiliza el servicio de traducción de Google para traducir mensajes.xml a varios idiomas fue escrita por Qi Zeng, quien estaba trabajando como interno de Google Summer of Code. Gracias. Qi&#33;
     
*    orderBy Sum
El código para el [ orderBy Filtro de crema](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBySum) dentro tabledap   (basado en Rob Fuller y Adam Leadbetter orderByMean ) y el Check All y Desmarque Todos los botones en el EDDGrid El formulario de acceso a los datos fue escrito y contribuido (licencia: copyrighted open source) por Marco Alba de ETT Solutions y EMODnet. Gracias. ¡Marco&#33;
     
* Fuera de rango Png Solicitudes
     ERDDAP™ ahora acepta solicitudes para . transparente Png es cuando los valores de latitud y/o longitud son parcial o totalmente fuera de rango. (Esto era ERDDAP™ Problemas GitHub #19, publicado por Rob Fuller -- gracias por publicarlo, Rob.) El código para arreglar esto fue escrito por Chris John. Gracias. ¡Chris&#33;
     
* Mostrar datos de imagen base64 .htmlTable respuestas
El código para mostrar datos de imagen base64 .htmlTable respuestas fue contribuido por Marco Alba de ETT / EMODnet Física. Gracias. ¡Marco Alba&#33;
     
* nThreads Improvement
El sistema de nThreads para EDDTableDesdeFiles fue mejorado significativamente. Estos cambios conducen a una mejora de velocidad enorme (por ejemplo, 2X de velocidad cuando nThreads se establece a 2 o más) para las solicitudes más difíciles (cuando un gran número de archivos debe ser procesado para recoger los resultados) . Estos cambios también conducirán a una aceleración general en todo el mundo ERDDAP™ . El código para estos cambios fue contribuido por Chris John. Gracias. ¡Chris&#33;

* Paleta de color EK80 para conjuntos de datos acústicos. ¡Gracias Rob Cermak&#33;

* EDDTableAggregateRows aggregation across all children fixed. ¡Gracias Marco Alba&#33;

* Corregir para varNames incorrectos en los registros. ¡Gracias Ayush Singh&#33;
