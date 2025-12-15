Bu içerik bir şeye dayanıyor [Roy Mendelssohn'dan gelen mesaj ERDDAP kullanıcılar grubu](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) .

 ERDDAP™ İnsanların verileri için kullandıkları şey hakkında birgnostic olmaya çalışır, bunun yerine temel olarak hizmet ettiğimiz topluluklara en çok kullanılan veri biçimleriyle çalışmaya çalışır. Daha fazla ve daha fazla çalışma bulutta olduğu gibi ve insanların bulutta kullandığı veri formatlarının bir plethorası var, güzel olurdu eğer ERDDAP™ Bu formatların çoğunu destekleyebilir. Alas, ERDDAP™ Geliştirme ve bakım zaten şüphelidir ve arzu edilen şey, bu hedefe ulaşmak için başkalarının çalışmalarından yararlanmaktır, değiştirmeden önce bu amacı değiştirmektir. ERDDAP™ .

Enter Enter Enter Enter Enter Enter girin [DuckDB](https://duckdb.org/) ve [Trino](https://trino.io/) . Bunların her ikisi de çeşitli veri formatlarına bağlantılar sağlar ve JDBC kullanarak erişilebilir. Bu yazıda sadece DuckDB'yi kullanmaya bakacağım çünkü onunla biraz tanıdıklarım ve Trino en azından zihnime göre biraz daha karmaşık görünüyordu ve şu anda sadece bir konsept kanıtı istedim. (Bir süre sonra Damien Smythe, Trino'yu nasıl kullanacağını ve onunla temasa geçtim ve bana notlar göndereceğini yazdı - gelecekte bu konuda daha fazla bilgi göndereceğim) . Ayrıca bu konuda bir uzman değilim, bu yüzden bu benimle birlikte öğreniyor - herhangi bir hata bulursanız veya belirsiz olan şeyleri ya da şeyleri yapmanın daha iyi yolları varsa bilmeme izin verin.

1. Preliminaries:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

DuckDB'yi kullanmak için ERDDAP™ EDB'yi bilgisayarınıza yüklemeniz ve DuckDB JDBC konektörünü bilgisayara yüklemeniz gerekir. ERDDAP™ . DuckDB'nin kendisini yükleme talimatları

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

DuckDB JDBC konektörü kaldırıldı

https://duckdb.org/docs/stable/clients/java.html

If your tomcat is located at $TOMCAT_HOME, then you want to put this file at $TOMCAT_HOME/webapps/erddap/WEB-INF/lib.

2. Bu zor yapan nedir:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


En azından DuckDB için (Dediğim gibi, Trino'ya herhangi bir detayda bakmadım)   Java Programlar sadece JDBC konektörü aracılığıyla DuckDB'ye erişebilir ve JDBC konektörü yalnızca DuckDB'de depolanan verileri okuyabilmektedir. DuckDB harika bir araç olsa da, verileri bu formattaki yenilgilere kopyalamak, ancak DuckDB, dosya formatlarının birçoğu için desteklediği tesisleri sunar. (Bir genişleme listesi var) Sadece gerekli metadata'da okuyan bir sanal .db dosyası oluşturabilirsiniz. Boyutta oldukça küçük olmak için yaratılmış olan .db'yi buldum ve hızlı erişim için görünen şeyleri sunuyorum. İlginç bir not, çoğu veritabanı sistemlerinin aksine (Ve Trino dahil) Duck ile DB, arka planda sürekli çalışan bir uygulamanız yok, bu yüzden başlangıç nedeniyle erişimde biraz gecikme olmalı, ancak küçük test erişimimde söylediğim gibi hızlanıyor.


3. Basit bir örnek:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Başlamak için, bunu bir .csv dosyasıyla nasıl yapacağıma bakacağım. Doğru, bu bir kullanım durumu ilginç değil ERDDAP™ Zaten .csv dosyaları oldukça iyi çalışıyor, bu yüzden hiçbir şey bu anlamda kazanılmıyor, ancak bir metin dosyası, neler olup bittiğini görmek için ve debug ile çalışmak daha kolaydır ve bunu öğreniyorum olarak hayatımı kolaylaştırdı. Aşağıda, neye ihtiyaç olduğunu gördüğümüzde daha ilginç bir kullanım vakasına bakacağım.

Benim çalıştığım dosya, sensörler tarafından etiket algılamalarının 305MB dosyası olan “detects.csv” olarak adlandırılır. İlk adım bu dosyaya işaret eden bir .db dosyası oluşturmak. (Bu ve rahatlık için takip eden şey, her zaman gerekli seviyede çalıştığını varsayacağım, bu yüzden tam yolları vermeyeceğim - pratikte tam yolları vermen gerekecek - pratikte, tam yolları vermen gerekecek) :

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

Dosya "detects.db" boyutu 268KB'dir. Bunun aslında çalıştığını kontrol edebiliriz:

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

Ve algılamaların büyüklüğü. db bu işlemi yapmaktan değişmedi. Yani son adım bunu onunla bağlantı kurmak ERDDAP™ Ancak sadece dosyaya bağlanmak için gerekli olan kısım, tüm değişken bilgiler değil:

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

Ve bu bir veri kümesinde ERDDAP™ DuckDB bağlantısını kullanarak dizüstü bilgisayarımda:
