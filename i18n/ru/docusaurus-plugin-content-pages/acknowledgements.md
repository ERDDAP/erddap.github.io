# Признания

Вкладчик [кредиты](https://github.com/erddap/erddap/blob/main/CREDITS.md) для ERDDAP™ Сейчас он находится на отдельной странице. ERDDAP™ является продуктом того [ NOAA ](https://www.noaa.gov "National Oceanic and Atmospheric Administration")   [ NMFS ](https://www.fisheries.noaa.gov "National Marine Fisheries Service")   [ SWFSC ](https://swfsc.noaa.gov "Southwest Fisheries Science Center")   [ ERD ](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division") .

Боб Симонс — главный автор оригинала ERDDAP™   (Разработчик и разработчик программного обеспечения, написавший ERDDAP Специфический код) . Отправной точкой был Рой Мендельсон. (Босс Боба) Боб перевернет свою программу ConvertTable (небольшая утилита, которая преобразует табличные данные из одного формата в другой и которая была в значительной степени кодом из пред- NOAA Работа, которую Боб повторно лицензировал, чтобы быть открытым исходным кодом) в веб-сервис.

Это были и есть идеи Рой Мендельсона о распределенных системах данных, его первоначальное предложение Бобу и его постоянная поддержка. (Включая аппаратную, сетевую и другую поддержку программного обеспечения, а также освобождая время Боба, чтобы он мог проводить больше времени за компьютером. ERDDAP™ код) Это сделало этот проект возможным и способствовало его развитию.

The ERDDAP Специфический код лицензируется как защищенный авторским правом открытый исходный код, с [ NOAA ](https://www.noaa.gov) Хранение авторских прав. Видишь? [ ERDDAP™ лицензия](/license) .
 ERDDAP™ использует защищенные авторским правом открытые исходные коды, Apache, LGPL, MIT/X, Mozilla и публичные библиотеки и данные.
 ERDDAP™ Не требует кода GPL или коммерческих программ.

Основная часть финансирования работ по ERDDAP™ пришел из NOAA За это он заплатил Бобу Саймонсу зарплату. За первый год ERDDAP™ Когда он был государственным подрядчиком, финансирование поступало от правительства. [ NOAA Береговая охрана](https://coastwatch.noaa.gov/) Программа, [ NOAA ИООС](https://ioos.noaa.gov/) Программа и ныне несуществующее отслеживание шельфа Тихого океана (Пост) Программа.

Большая заслуга принадлежит многим ERDDAP™ администраторы и пользователи, которые внесли предложения и комментарии, которые привели к значительному улучшению ERDDAP . Многие из них упоминаются в названии [Список изменений](/changes) . Спасибо всем (названный и неназванный) Очень много. Таким образом, ERDDAP™ Является ярким примером [Инновации, управляемые пользователями](https://en.wikipedia.org/wiki/User_innovation) где инновации часто исходят от потребителей ( ERDDAP™ пользователи) Не только производители ( ERDDAP™ разработчики) .

Вот список программного обеспечения и наборов данных, которые находятся в ERDDAP™ распределения. Мы очень благодарны за все это. Большое спасибо.
 \\[ Начиная с 2021 года стало практически невозможно правильно перечислить все источники кода для ERDDAP™ Некоторые библиотеки, которые мы используем (Netcdf-java и особенно AWS) В свою очередь, используется множество других библиотек. Все библиотеки, которые ERDDAP™ Кодовые вызовы непосредственно включены ниже, как и многие библиотеки, которые другие библиотеки называют в свою очередь. Если вы видите, что мы пропустили проект ниже, пожалуйста, сообщите нам, чтобы мы могли добавить проект ниже и дать кредит там, где кредит должен быть. \\] 

## Обзор{#overview} 
 ERDDAP™ является [ Java Сервлет](https://www.oracle.com/technetwork/java/javaee/servlet/index.html) Программа. в ERD Он проходит внутри а [Томкат](https://tomcat.apache.org/) сервер приложений (лицензия: [Апач](https://www.apache.org/licenses/) ) С одной стороны [Апач](https://httpd.apache.org/) веб-сервер (лицензия: [Апач](https://www.apache.org/licenses/) ) работать на компьютере, используя [Red Hat Linux](https://www.redhat.com/) операционная система (лицензия: [ГПЛ](https://www.gnu.org/licenses/gpl-3.0.html) ) .
     
## Наборы данных{#datasets} 
Данные взяты из различных источников. Смотрите метаданные (В частности, " sourceUrl "," infoUrl " "institution" и «лицензией») для каждого набора данных. Многие наборы данных имеют ограничение на их использование, которое требует от вас цитировать / кредитовать поставщика данных всякий раз, когда вы используете данные. Это всегда хорошая форма для цитирования / кредитования поставщика данных. Видишь? [Как цитировать набор данных в бумаге](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset) .
     
## Программное обеспечение CoHort{#cohort-software} 
 [Классы com/cohort](#cohort-software) Разработчик CoHort Software (https://www.cohortsoftware.com) что делает эти классы доступными с MIT / X-подобной лицензией (см. Class/com/cohort/util/LICENSE.txt) .
     
## Браузер CoastWatch{#coastwatch-browser} 
 ERDDAP™ Использование кода проекта CoastWatch Browser (теперь снят с эксплуатации) из которого [ NOAA Береговая охрана](https://coastwatch.noaa.gov)   [Региональный узел Западного побережья](https://coastwatch.pfeg.noaa.gov/)   (Лицензия: авторское право open source) . Этот проект был инициирован и управлялся Дэйвом Фоли, бывшим координатором проекта. NOAA CoastWatch West Coast Региональный узел. Весь код браузера CoastWatch был написан Бобом Саймонсом.
     
##  OPeNDAP  {#opendap} 
Данные из [ OPeNDAP ](https://www.opendap.org) Серверы читаются вместе с [ Java   DAP 1.1.7](https://www.opendap.org/deprecated-software/java-dap)   (Лицензия: LGPL) .
     
##  NetCDF Джава{#netcdf-java} 
 NetCDF файлы ( .nc ) GMT-стиль NetCDF файлы (.grd) , GRIB и BUFR читаются и пишутся кодом в [ NetCDF   Java Библиотека](https://www.unidata.ucar.edu/software/netcdf-java/)   (лицензия: [BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE) ) из [ Unidata ](https://www.unidata.ucar.edu/) .

Программное обеспечение, включенное в NetCDF   Java .jar:

* slf4j
The NetCDF   Java Библиотека и Кассандра нужны [slf4j от Simple Logging Facade Java ](https://www.slf4j.org/) Проект. В настоящее время ERDDAP™ Для удовлетворения этой потребности используется slf4j-simple-xxx.jar, переименованный в slf4j.jar. (лицензия: [MIT/X](https://www.slf4j.org/license.html) ) .
     
* ДОМ
The NetCDF   Java .jar включает в себя XML-код обработки [ДОМ](http://www.jdom.org/)   (лицензия: [Апач](http://www.jdom.org/docs/faq.html#a0030) ) Он входит в состав netcdfAll.jar.
     
* Джода
The NetCDF   Java .jar включает [Джода](https://www.joda.org/joda-time/) для календарных расчетов (которые, вероятно, не используются ERDDAP ) . (лицензия: [Apache 2.0](https://www.joda.org/joda-time/licenses.html) ) .
     
* Апач
The NetCDF   Java .jar включает в себя файлы .jar [Проекты Apache](https://www.apache.org/) :
     [общий кодек](https://commons.apache.org/proper/commons-codec/) ,
     [открытие](https://commons.apache.org/discovery/) ,
     [общий http клиент](https://hc.apache.org/httpcomponents-client-ga/) ,
     [заготовка](https://commons.apache.org/proper/commons-logging/)   
     [Http-компоненты](https://hc.apache.org) ,
     (Для всех: лицензия: [Апач](https://www.apache.org/licenses/LICENSE-2.0) )   
Они включены в netcdfAll.jar.
     
* другой
The NetCDF   Java .jar также включает код от: com.google.code.findbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, org.codehaus.mojo, com.beust.jcommander, com.google.common, com.google.re2j и com.google. thirdparty. (Google использует Apache и BSD-подобные лицензии.)   
         
## SGT{#sgt} 
Графики и карты создаются на лету с модифицированной версией NOAA СГТ (был вhttps://www.pmel.noaa.gov/epic/java/sgt/Теперь прекращено) Версия 3 (а Java Научный графический инструментарий, написанный Дональдом Денбо [ NOAA ПМЭЛ](https://www.pmel.noaa.gov/) )   (Лицензия: авторское право open source (был вhttps://www.pmel.noaa.gov/epic/java/license.html) ) .
     
## Уолтер Зорн{#walter-zorn} 
Большие HTML подсказки ERDDAP HTML-страницы создаются с помощью Walter Zorn wz\\_tooltip. js (Лицензия: LGPL) .
Слайдеры и функция перетаскивания Slide Sorter созданы с помощью Walter Zorn wz\\_dragdrop.js (Лицензия: LGPL) .
     
## OpenDF{#openpdf} 
Файлы .pdf создаются [openpdf](https://github.com/LibrePDF/OpenPDF) Свободный Java Библиотека PDF.
     
## Гшш{#gshhs} 
Данные о береговой линии и озере взяты из [Гшш](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html) Глобальная самосогласованная, иерархическая, с высоким разрешением база данных (лицензия: [ГПЛ](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT) ) Созданы Полом Уэсселом и Уолтером Смитом.

Мы не делаем никаких заявлений о правильности данных шарелина, которые приходят с ERDDAP™ Не используйте его для навигационных задач.
     
    
## ГМТ хлопок{#gmt-pscoast} 
Политические границы и данные о реках исходят из [блеск](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html) программа в [ГМТ](https://www.soest.hawaii.edu/gmt/) которая использует данные из [ЦРУ Всемирный банк данных II](https://www.evl.uic.edu/pape/data/WDB/)   (Лицензия: Public Domain) .

Мы не делаем никаких заявлений о правильности политических данных, которые приходят с ERDDAP .
    
## ЭТОПО{#etopo} 
Данные батиметрии / топографии, используемые на фоне некоторых карт, являются [Набор данных ETOPO1 Global 1-Minute Gridded Elevation](https://www.ngdc.noaa.gov/mgg/global/global.html)   (Ice Surface, сетка зарегистрирована, двоичный, 2 байт int: etopo1\\_ice\\_g\\_i2 .zip )   (лицензия: [общественное достояние](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright) ) который распространяется бесплатно по [ NOAA НГДК](https://www.ngdc.noaa.gov) .

Мы не делаем никаких заявлений о правильности данных батиметрии / топографии, которые приходят с ERDDAP . Не используйте его для навигационных задач.
    
##  Java почта{#javamail} 
Электронные письма отправляются с использованием кода по почте. баночка из Oracle ? [ Java Почтовый API](https://javaee.github.io/javamail/)   (лицензия: [КОМИТЕТ ПО РАЗВИТИИ И ЛИЦЕНЗИИ ДИСТРИБУЦИИ (CDDL) Версия 1.1](https://javaee.github.io/javamail/LICENSE) ) .
     
## Джон{#json} 
 ERDDAP™ использование [json.org Java Базовая библиотека JSON](https://www.json.org/index.html) анализировать [Джон](https://www.json.org/) данные (лицензия: [Авторское право Open Source](https://www.json.org/license.html) ) .
     

## PostgrsQL{#postgrsql} 
 ERDDAP™ включает в себя [PostGres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql) водитель (лицензия: [BSD](https://www.postgresql.org/about/licence/) ) . Водитель имеет авторские права (c) 1997-2010, PostgreSQL Global Development Group. Все права защищены.
     
## Люсен{#lucene} 
 ERDDAP™ Использование кода Apache [Люсен](https://lucene.apache.org/) . (лицензия: [Апач](https://www.apache.org/licenses/LICENSE-2.0) ) для опции «люсен» поисковой системы (Но не для «оригинальной» поисковой системы по умолчанию) .
     
## компресс{#commons-compress} 
 ERDDAP™ Использование кода Apache [компресс](https://commons.apache.org/compress/) . (лицензия: [Апач](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## Джекс{#jexl} 
 ERDDAP™ Поддержка оценки выражений и сценариев в&lt; sourceName s&gt; опирается на [Проект Apache](https://www.apache.org/) : [ Java Язык выражения (Джекс) ](https://commons.apache.org/proper/commons-jexl/)   (лицензия: [Апач](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## Кассандра{#cassandra} 
 ERDDAP™ включает Апач [Кассандра](https://cassandra.apache.org/)   [cassandra-driver-core.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)   (лицензия: [Apache 2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE) ) .
Кассандра Кассандра-водитель-ядро.jar требует (и так ERDDAP™ включает) :
*    [guava.jar](https://github.com/google/guava)   (лицензия: [Apache 2.0](https://github.com/google/guava/blob/master/LICENSE) ) .
*    [lz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)   (лицензия: [Apache 2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt) ) .
*    [Метрика-core.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)   (лицензия: [МТИ](https://github.com/codahale/metrics/blob/master/LICENSE) ) .
*    [netty-all.jar](https://netty.io/downloads.html)   (лицензия: [Apache 2.0](https://netty.io/downloads.html) ) .
*    [java.jar](https://xerial.org/snappy-java/)   (лицензия: [Apache 2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE) ) .
         
##  KT\\_ палитра{#kt_-palettes} 
Цветовые палитры с приставкой " KT\\_ "а" - это [Коллекция палитр .cpt от Кристен Тин](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)   (лицензия: [MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html) ) Но слегка переформатирована Дженнифер Севаджян из NOAA Чтобы они соответствовали ERDDAP Требования .cpt.
     
##  Leaflet  {#leaflet} 
 ERDDAP™ использует Java Библиотека сценариев [ Leaflet ](https://leafletjs.com/)   (лицензия: [BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) ) как WMS клиент на WMS веб-страницы в ERDDAP . Отличное программное обеспечение (Хорошо спроектированный, простой в использовании, быстрый и бесплатный) Владимир Агафонкин.
     
## AWS{#aws} 
Для работы с Amazon AWS (включая S3) , ERDDAP™ использует v2 [AWS SDK для Java ](https://aws.amazon.com/sdk-for-java/)   (лицензия: [Апач](https://www.apache.org/licenses/) ) .

AWS требует от Maven втягивания зависимостей. Включает следующие файлы .jar: (где xxx - номер версии, который меняется с течением времени, а тип лицензии - в скобках) : аннотации-xxx.jar (Апач) apache-client-xxx.jar (Апач) ams-xxx.jar (BSD) , asm-xxx.jar (BSD) Асм-анализ-xxx.jar (BSD) , asm-commons-xxx.jar (BSD) , asm-tree-xxx.jar (BSD) , asm-util-xxx.jar (BSD) uth-xxx.jar (?) aws-core-xxx.jar (Апач) aws-query-protocol-xxx.jar (Апач) aws-xml-protocol-xxx.jar (Апач) , checker-qual-xxx.jar (МТИ) , error\\_prone\\_annotations-xxx.jar (Апач) , eventstream-xxx.jar (Апач) Неисправность-xxx.jar (Апач) , http core-xxx.jar (Апач) j2objc-annotations-xxx.jar (Апач) , Jackson-annotations-xxx.jar (Апач) jackson-core-xxx.jar (Апач) jackson-databind-xxx.jar (Апач) jaxen-xxx.jar (BSD) jffi-xxx.jar (Апач) jffi-xxx.native. банку (Апач) jnr-constants-xxx.jar (Апач) jnr-ffi-xxx.jar (Апач) jnr-posix-xxx.jar (Апач) jnr-x86asm-xxx.jar (Апач) json-xxx.jar (Авторские права open source) jsr305-xxx.jar (Апач) Прослушать Future-xxx.jar (Апач) Около десятка нетто. банка (Апач) Профили-xxx.jar (Апач) Протокол-core-xxx.jar (Апач) реактивные потоки-xxx.jar (КОО 1.0) Регионы-xxx.jar (Апач) s3-xxx.jar (Апач) sdk-core-xxx.jar (Апач) utils-xxx.jar (?) . Чтобы увидеть действительные лицензии, ищите имя .jar в разделе [Репозиторий Maven](https://mvnrepository.com/) а затем копаться в файлах проекта, чтобы найти лицензию.
    

Мы также очень благодарны за все программное обеспечение и сайты, которые мы используем при разработке. ERDDAP в том числе
 [Chrome](https://www.google.com/chrome/browser/desktop/) ,
 [ curl ](https://curl.haxx.se/) ,
 [DuckDuckGo](https://duckduckgo.com/?q=) ,
 [EditPlus](https://www.editplus.com/) ,
 [FileZilla](https://filezilla-project.org/) .
 [GitHub](https://github.com/) ,
 [Поиск Google](https://www.google.com/webhp) ,
 [Путти](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) ,
 [переполнение стека](https://stackoverflow.com/) ,
 [тодист](https://todoist.com/?lang=en) ,
 [ Wikipedia ](https://www.wikipedia.org/) ,
Интернет, Всемирная паутина и все другие, отличные, полезные сайты.
Большое спасибо.
