Este contenido se basa en un [mensaje de Roy Mendelssohn al ERDDAP Grupo de usuarios](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) .

 ERDDAP™ Trata de ser agnóstico sobre qué formatos de datos utilizan las personas para sus datos, en lugar de tratar de trabajar con los formatos de datos de la mayoría de uso para las comunidades que servimos principalmente. Como cada vez más trabajo está en la nube, y hay una plétora de formatos de datos que la gente utiliza en la nube, sería agradable si ERDDAP™ Podría apoyar muchos de estos formatos. Ay, ERDDAP™ el desarrollo y el mantenimiento ya son insuficientes, y lo que sería conveniente es hacer uso de la labor de otros para lograr este objetivo, sin tener que modificar ERDDAP™ .

Entra [DuckDB](https://duckdb.org/) y [Trino](https://trino.io/) . Ambos proporcionan conexiones a una variedad de formatos de datos, y pueden accederse usando JDBC. En este escrito sólo miraré el uso de DuckDB porque tengo cierta familiaridad con él, y Trino al menos a mi mente, parecía un poco más complicado de configurar, y ahora mismo sólo quería una prueba de concepto. (Un tiempo atrás Damien Smythe había escrito que él había sussed cómo utilizar Trino y yo lo contacté y él lo hizo trabajar y me enviará notas - así que más sobre esto en el futuro) . También soy cualquier cosa menos un experto en cualquiera de esto, así que esto es aprender conmigo - hágame saber si encuentra algún error, o cosas que no están claras, o si hay mejores maneras de hacer las cosas.

1. Preliminares:
—————————

Para utilizar DuckDB ERDDAP™ necesita instalar DuckDB en su computadora, e instalar el conector DuckDB JDBC en ERDDAP™ . Instrucciones para la instalación de DuckDB en sí están en

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

El conector DuckDB JDBC se puede descargar desde

https://duckdb.org/docs/stable/clients/java.html

Si su tomcat está situado en $TOMCAT_HOME, entonces usted quiere poner este archivo en $TOMCAT_HOME/webapps/erddap/WEB-INF/lib.

2. Lo que hace que esto sea complicado:
—————————————————


Al menos para DuckDB (como he dicho que no he mirado a Trino en ningún detalle)   Java Los programas sólo pueden acceder a DuckDB a través del conector JDBC, y el conector JDBC sólo puede leer datos que se almacenan en el formato DuckDB .db. Mientras DuckDB es una gran herramienta, tener que copiar los datos a este formato derrota todo el propósito, Sin embargo, DuckDB proporciona la instalación que para muchos de los formatos de archivo que soporta (hay una lista creciente de extensiones) puede configurar un archivo .db virtual que sólo lee en los metadatos necesarios. He encontrado el .db que se crea para ser bastante pequeño en tamaño, y proporciona lo que parece ser acceso rápido. Una nota interesante es que a diferencia de la mayoría de los sistemas de bases de datos (e incluido Trino) , con Duck DB usted no tiene una aplicación que se ejecuta constantemente en el fondo, por lo que debe haber algún retraso en el acceso debido a la startup, pero como dije en mis pequeñas pruebas el acceso parece rápido.


3. Un ejemplo simple:
————————————

Para empezar, voy a ver cómo hacer esto con un archivo .csv. Correcto, esto no es tan interesante de un caso de uso como ERDDAP™ ya maneja archivos .csv bastante bien, así que nada se gana en ese sentido, pero un archivo de texto es más fácil de trabajar con y depurar al ver lo que está pasando, y como estaba aprendiendo esto hizo mi vida más fácil. A continuación voy a ver un caso de uso más interesante una vez que veamos lo que se necesita.

El archivo con el que estoy trabajando se llama “detects.csv” que es un archivo de 305MB de detección de etiquetas por sensores. El primer paso es crear un archivo .db que apunta a este archivo (en esto y lo que sigue por conveniencia siempre asumiré que usted está trabajando en el nivel necesario así que no doy todos los caminos - en la práctica usted tendrá que) :

```
duckdb detects.db <<EOF
CREATE VIEW detects_table AS
SELECT *
FROM read_csv_auto(
'detects.csv',
header=true,
sample_size=2147483647 -- scan whole file for schema (optional)
);
EOF
```

El archivo “detects.db” es de 268KB de tamaño. Podemos comprobar que esto ha funcionado realmente:

```
duckdb detects.db
DuckDB v1.3.1 (Ossivalis) 2063dda3e6
Enter ".help" for usage hints.
D SHOW TABLES;
┌───────────────┐
│ name │
│ varchar │
├───────────────┤
│ detects_table │
└───────────────┘
D SELECT * FROM detects_table LIMIT 5;
┌────────────────┬─────────┬──────────────┬───────┬──────────┬───┬──────────┬──────────────┬───────────────┬─────────┐
│ Study_ID │ TagCode │ DateTime_PST │ recv │ location │ … │ tag_life │ Rel_latitude │ Rel_longitude │ time │
│ varchar │ varchar │ timestamp │ int64 │ varchar │ │ int64 │ double │ double │ varchar │
├────────────────┼─────────┼──────────────┼───────┼──────────┼───┼──────────┼──────────────┼───────────────┼─────────┤
│ ButteSink_2024 │ 1B76 │ NULL │ NULL │ NULL │ … │ 52 │ 39.32663 │ -121.8847 │ -08 │
│ ButteSink_2024 │ 1B94 │ NULL │ NULL │ NULL │ … │ 52 │ 39.32663 │ -121.8847 │ -08 │
│ ButteSink_2024 │ 1BA5 │ NULL │ NULL │ NULL │ … │ 52 │ 39.35858 │ -121.8943 │ -08 │
│ ButteSink_2024 │ 1C55 │ NULL │ NULL │ NULL │ … │ 52 │ 39.33546 │ -121.8923 │ -08 │
│ ButteSink_2024 │ 1C95 │ NULL │ NULL │ NULL │ … │ 52 │ 39.33546 │ -121.8923 │ -08 │
├────────────────┴─────────┴──────────────┴───────┴──────────┴───┴──────────┴──────────────┴───────────────┴─────────┤
│ 5 rows 18 columns (9 shown) │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

y el tamaño de las detectas. db no ha cambiado de hacer esta operación. Así que el paso final es conectar esto con ERDDAP™ , Mostrar sólo la parte necesaria para conectarse al archivo, no toda la información variable:

```
<dataset type="EDDTableFromDatabase" datasetID="duckdb_test" active="true">
<!-- JDBC Connection Details -->
<sourceUrl>jdbc:duckdb:detects.db</sourceUrl>
<driverName>org.duckdb.DuckDBDriver</driverName>
<catalogName></catalogName>
<schemaName></schemaName>
<tableName>detects_table</tableName>
<columnNameQuotes></columnNameQuotes>
>
```

Y este es el conjunto de datos en un ERDDAP™ en mi laptop usando el conector DuckDB:
