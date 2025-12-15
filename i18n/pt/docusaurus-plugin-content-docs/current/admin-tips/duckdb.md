Este conteúdo é baseado em um [mensagem de Roy Mendelssohn para o ERDDAP grupo de usuários](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) .

 ERDDAP™ tenta ser agnóstico sobre os formatos de dados que as pessoas usam para seus dados, ao invés de tentar trabalhar com os formatos de dados de maior uso para as comunidades que atendemos principalmente. Como mais e mais trabalho está na nuvem, e há uma infinidade de formatos de dados que as pessoas usam na nuvem, seria bom se ERDDAP™ poderia suportar muitos desses formatos. Ai, ERDDAP™ desenvolvimento e manutenção já está substaffed, e o que seria desejável é fazer uso do trabalho dos outros para alcançar este objetivo, sem ter que modificar ERDDAP™ .

Entrar [Duck.](https://duckdb.org/) e [Trino](https://trino.io/) . Ambos fornecem conexões com uma variedade de formatos de dados e podem ser acessados usando JDBC. Neste writeup eu só vou olhar para usar DuckDB porque eu tenho alguma familiaridade com ele, e Trino pelo menos para minha mente, parecia um pouco mais complicado para configurar, e agora eu só queria uma prova de conceito. (Um tempo atrás Damien Smythe tinha escrito que ele tinha sussed para fora como usar Trino e eu contactou-o e ele fê-lo para trabalhar e vai me enviar notas - então mais sobre isso no futuro) . Também eu sou qualquer coisa além de um especialista em qualquer um disso, então isso está aprendendo junto comigo - me avise se você encontrar quaisquer erros, ou coisas que não são claras, ou se há melhores maneiras de fazer as coisas.

1. Preliminares:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

A fim de usar DuckDB em ERDDAP™ você precisa instalar o patDB em seu computador e instalar o conector DuckDB JDBC em ERDDAP™ . Instruções para instalar DuckDB em si estão em

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

O conector DuckDB JDBC pode ser baixado

https://duckdb.org/docs/stable/clients/java.html

Se o seu tomcat está localizado em $TOMCAT_HOME, então você quer colocar este arquivo em $TOMCAT_HOME/webapps/erddap/WEB-INF/lib.

2. O que torna isto complicado:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


Pelo menos para DuckDB (como eu disse eu não tenho olhado para Trino em qualquer detalhe)   Java programas só podem acessar DuckDB através do conector JDBC, e o conector JDBC só pode ler dados que são armazenados no formato DuckDB .db. Enquanto DuckDB é uma ótima ferramenta, tendo que copiar os dados para este formato derrota toda a finalidade, No entanto, DuckDB fornece a instalação que para muitos dos formatos de arquivo que suporta (há uma lista crescente de extensões) você pode configurar um arquivo .db virtual que apenas lê nos metadados necessários. Eu encontrei o .db que é criado para ser bastante pequeno em tamanho, e fornece o que parece ser acesso rápido. Uma nota interessante é que ao contrário da maioria dos sistemas de banco de dados (e incluindo Trino) , com Duck DB você não tem um aplicativo que está em execução constantemente em segundo plano, então deve haver algum atraso no acesso devido à inicialização, mas como eu disse em meus pequenos testes de acesso parece rápido.


3. Um exemplo simples:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Para começar, vou olhar para como fazer isso com um arquivo .csv. Correto, isso não é tão interessante de um caso de uso como ERDDAP™ já lida com arquivos .csv muito bem, então nada está sendo ganho nesse sentido, mas um arquivo de texto é mais fácil de trabalhar e depurar ao ver o que está acontecendo, e como eu estava aprendendo isso, tornou minha vida mais fácil. Abaixo vou olhar para um caso de uso mais interessante uma vez que vemos o que é necessário.

O arquivo com o qual estou trabalhando é chamado de “detects.csv” que é um arquivo 305MB de deteções de tags por sensores. O primeiro passo é criar um arquivo .db que aponta para este arquivo (neste e o que se segue para conveniência Eu sempre assumirei que você está trabalhando no nível necessário para que eu não dê caminhos completos - na prática você terá que) :

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

O arquivo “detects.db” é 268KB de tamanho. Podemos verificar que isso realmente funcionou:

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

e o tamanho de detecta. db não mudou de fazer esta operação. Então o passo final é conectar isso com ERDDAP™ , Eu mostro apenas a parte necessária para se conectar ao arquivo, não todas as informações variáveis:

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

E este é o conjunto de dados em um ERDDAP™ no meu laptop usando o conector DuckDB:
