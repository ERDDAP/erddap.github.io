이 콘텐츠는 [로이 Mendelssohn의 메시지 ERDDAP 사용자 그룹](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) ·

 ERDDAP™ 데이터 형식의 사람들이 데이터를 사용하는 것에 대해 임신 한 것은 주로 봉사하는 지역 사회에 가장 많이 사용되는 데이터 형식과 함께 일하려고합니다. 더 많은 작업은 클라우드에 있으며 사람들이 클라우드에서 사용하는 데이터 형식의 plethora가 있으면 좋을 것입니다. ERDDAP™ 이러한 형식을 많이 지원할 수 있습니다. 알라, ERDDAP™ 개발 및 유지 보수는 이미 understaffed, 그리고 어떤 desirable가 다른 사람의 작업의 사용을 만들기 위해 이러한 목표를 달성, 수정하지 않고 ERDDAP™ ·

이름 * [덕DB](https://duckdb.org/) 이름 * [트리노](https://trino.io/) · 이 둘 다 다양한 데이터 형식에 연결하고 JDBC를 사용하여 액세스 할 수 있습니다. 이 글에서 나는 단지 그것을 가진 몇몇 친밀감이 있기 때문에 DuckDB를 사용하고, 나의 마음에 Trino 적어도, 설치하게 약간 더 복잡한 것, 그리고 지금 나는 다만 개념의 증거를 원했습니다. (A 후 Damien Smythe는 그가 Trino를 사용하는 방법을 중단하고 나는 그에게 연락하고 그는 작업을 수행하고 나에게 메모를 보낼 수 있도록 - 그래서 앞으로 더) · 또한 나는 아무것도하지만이 모든 전문가입니다, 그래서 이것은 나와 함께 학습 - 당신이 어떤 실수를 발견하는 경우 나를 알고, 또는 불충분한 것들, 또는 더 나은 일을하는 방법.

1. 주의 사항:
—————————

DuckDB를 사용하려면 ERDDAP™ 당신은 당신의 컴퓨터에 DuckDB를 설치해야, 그리고 DuckDB JDBC 연결관을 설치하기 위하여 ERDDAP™ · DuckDB 자체 설치 지침은

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

DuckDB JDBC 연결관은에서 다운로드될 수 있습니다

https://duckdb.org/docs/stable/clients/java.html

tomcat이 $TOMCAT_HOME에 위치한 경우, $TOMCAT_HOME/webapps/erddap/WEB-INF/lib에서 이 파일을 넣어 원합니다.

2. 이 까다로운 것을 만드는 것:
———————————————


DuckDB를 위한 적어도 (내가 말했듯이 나는 어떤 세부 사항에 트리노에 보이지 않았다)   Java 프로그램은 JDBC 커넥터를 통해 DuckDB에만 액세스 할 수 있으며 JDBC 커넥터는 DuckDB .db 형식으로 저장되는 데이터를 읽을 수 있습니다. DuckDB는 훌륭한 도구이지만, 이 형식의 데이터를 복사하는 것은 전체적인 목적을 물리치고 있지만, DuckDB는 많은 파일 형식의 시설을 제공합니다. (확장의 성장 목록이 있습니다) 필요한 메타데이터를 읽는 가상 .db 파일을 설정할 수 있습니다. 나는 크기가 매우 작기 때문에 생성 된 .db를 발견했으며 빠른 액세스가 나타납니다. 흥미로운 참고는 대부분의 데이터베이스 시스템과는 달리 (트리노를 포함한) , 오리 DB 당신은 배경에서 끊임없이 실행되는 응용 프로그램이 없습니다, 그래서 시작으로 액세스에 약간의 지연이 있어야합니다, 하지만 내 작은 테스트 액세스에 말했다 속도 보인다.


3. 간단한 예:
—————————————

시작하려면 .csv 파일로 이것을 수행하는 방법을 살펴 보겠습니다. 부정확한, 이것은 사용 케이스의 흥미가 아니다 ERDDAP™ 이미 .csv 파일을 꽤 잘 처리, 그래서 아무것도 그 의미에서 얻고있다, 하지만 텍스트 파일과 함께 작동하고 무슨 일이 일어나는 것을보고 디버깅, 그리고 나는이 그것을 학습했다 내 인생을 쉽게. 아래는 한 번 더 흥미로운 사용 사례를 살펴 보겠습니다.

I 파일은 센서에 의해 태그 감지의 305MB 파일 인 "detects.csv"라고합니다. 첫번째 단계는 이 파일에 점을 점하는 .db 파일을 창조하는 것입니다 (이 그리고 나는 항상 필요한 수준에서 일하고 있다고 가정합니다. 나는 전체 경로를 제공하지 않습니다 - 연습에서 당신은해야 할 것입니다) ::

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

파일 "detects.db"는 268KB 크기입니다. 우리는 이것이 실제로 일한 것을 검사해서 좋습니다:

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

그리고 검출의 크기. db는 이 가동을 하기에서 바꾸지 않았습니다. 그래서 마지막 단계는이 연결 ERDDAP™ , 나는 파일에 연결하기 위해 필요한 부분 만 표시, 모든 변수 정보:

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

그리고 이것은 dataset이다 ERDDAP™ DuckDB 연결관을 사용하는 나의 노트북에:
