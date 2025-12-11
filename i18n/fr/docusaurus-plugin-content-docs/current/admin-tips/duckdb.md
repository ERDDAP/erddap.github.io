Ce contenu est basé sur [message de Roy Mendelssohn au ERDDAP groupe d'utilisateurs](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) .

 ERDDAP™ tente d'être agnostique sur les formats de données que les gens utilisent pour leurs données, au lieu d'essayer de travailler avec les formats de données les plus utilisés pour les communautés que nous servons principalement. Comme de plus en plus de travail est dans le cloud, et il ya une pléthore de formats de données que les gens utilisent dans le cloud, ce serait bien si ERDDAP™ pourrait supporter beaucoup de ces formats. Hélas, ERDDAP™ le développement et l'entretien sont déjà sous-effectifs, et ce qui serait souhaitable, c'est d'utiliser le travail des autres pour atteindre cet objectif, sans avoir à modifier ERDDAP™ .

Entrez [DuckDB](https://duckdb.org/) et [Trino](https://trino.io/) . Tous deux offrent des connexions à divers formats de données et peuvent être consultés en utilisant JDBC. Dans cette écriture, je vais seulement regarder l'utilisation de DuckDB parce que j'ai une certaine familiarité avec elle, et Trino au moins à mon esprit, semblait un peu plus compliqué à mettre en place, et en ce moment je voulais juste une preuve de concept. (De retour Damien Smythe avait écrit qu'il avait su comment utiliser Trino et je l'ai contacté et il l'a fait travailler et m'enverrai des notes - tellement plus sur cela dans le futur) . Aussi, je ne suis rien d'autre qu'un expert sur tout cela, donc c'est apprendre avec moi - dites-moi si vous trouvez des erreurs, ou des choses qui ne sont pas claires, ou s'il y a de meilleures façons de faire les choses.

1. Préliminaires:
————————

Pour utiliser DuckDB dans ERDDAP™ vous devez installer duckDB sur votre ordinateur, et pour installer le connecteur DuckDB JDBC dans ERDDAP™ . Instructions pour installer DuckDB lui-même sont à

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

Le connecteur DuckDB JDBC peut être téléchargé depuis

https://duckdb.org/docs/stable/clients/java.html

Si votre tomcat est situé à $TOMCAT_HOME, alors vous voulez mettre ce fichier à $TOMCAT_HOME/webapps/erddap/WEB-INF/lib.

2. Ce qui rend ça difficile :
—————————————


Au moins pour DuckDB (Comme je l'ai dit, je n'ai pas regardé Trino en détail.)   Java Les programmes peuvent uniquement accéder à DuckDB via le connecteur JDBC, et le connecteur JDBC ne peut lire que les données stockées au format DuckDB .db. Bien que DuckDB est un excellent outil, avoir à copier les données à ce format va à l'encontre de tout le but, Cependant, DuckDB fournit la facilité que pour beaucoup des formats de fichiers qu'il prend en charge (il existe une liste croissante d'extensions) Vous pouvez configurer un fichier .db virtuel qui se lit dans les métadonnées nécessaires. J'ai trouvé le .db qui est créé pour être assez petite en taille, et fournit ce qui semble être un accès rapide. Une note intéressante est que contrairement à la plupart des systèmes de base de données (et y compris Trino) , avec Duck DB vous n'avez pas une application qui fonctionne constamment en arrière-plan, donc il doit y avoir un certain délai d'accès en raison du démarrage, mais comme je l'ai dit dans mes petits tests accès semble rapide.


3. Un exemple simple:
Autres

Pour commencer, je vais regarder comment faire avec un fichier .csv. Correct, ce n'est pas que intéressant d'un cas d'utilisation comme ERDDAP™ déjà gère les fichiers .csv assez bien, donc rien n'est gagné dans ce sens, mais un fichier texte est plus facile à travailler et à déboguer en voyant ce qui se passe, et comme j'apprenais cela, il a rendu ma vie plus facile. Ci-dessous, je regarderai un cas d'utilisation plus intéressant quand nous verrons ce qui est nécessaire.

Le fichier avec lequel je travaille s'appelle "Detectes.csv" qui est un fichier 305MB de détections d'étiquettes par des capteurs. La première étape est de créer un fichier .db qui pointe vers ce fichier (dans ce et ce qui suit pour la commodité, je présumerai toujours que vous travaillez au niveau nécessaire afin que je ne donne pas de sentiers complets - dans la pratique, vous devrez) :

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

Le fichier «detectes.db» est de 268Ko de taille. Nous pouvons vérifier que cela a vraiment fonctionné:

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

et la taille des détecteurs. db n'a pas changé depuis cette opération. Donc la dernière étape est de relier ceci avec ERDDAP™ , Je n'affiche que la partie nécessaire pour se connecter au fichier, pas toutes les informations variables:

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

Et c'est l'ensemble de données dans un ERDDAP™ sur mon ordinateur portable en utilisant le connecteur DuckDB:
