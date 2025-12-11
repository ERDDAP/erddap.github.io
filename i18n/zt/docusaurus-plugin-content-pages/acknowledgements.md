# 致謝

撰稿人 [信用](https://github.com/erddap/erddap/blob/main/CREDITS.md) 用于 ERDDAP™ 現在在另一頁。 ERDDAP™ 是 [ NOAA ](https://www.noaa.gov "National Oceanic and Atmospheric Administration")   [ NMFS ](https://www.fisheries.noaa.gov "National Marine Fisheries Service")   [ SWFSC ](https://swfsc.noaa.gov "Southwest Fisheries Science Center")   [ ERD ](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division") .

鮑勃·西蒙斯是 ERDDAP™   (撰寫此文的設計者和軟體開發者 ERDDAP - 特定代碼) . 起點是羅伊·門德爾索恩 (鮑勃的老板) 建議 Bob 轉換表格程式 (一個小工具,它將表格資料從一個格式轉換到另一個格式,它大多是 Bob 的代碼前的... NOAA Bob重新取得開源權的工作) 進入網路服務。

羅伊·門德爾索恩(Roy Mendelssohn)的發布數據系統想法, (包括硬件、網路和其他軟體支援, ERDDAP™ 代碼) 讓這項計畫成為可能,

其 ERDDAP - 特定的代碼被授權為有版權的開放源碼 [ NOAA ](https://www.noaa.gov) 持有著作權。 看 [ ERDDAP™ 授權](/license) .
 ERDDAP™ 使用有版權的開放來源, Apache, LGPL, MIT/ X, Mozilla, 以及公有域文庫和資料 。
 ERDDAP™ 不需要任何 GPL 碼或商業程式。

大部分资金用于 ERDDAP™ 來自 NOAA 因為它給了鮑勃·西蒙斯的薪水 第一年 ERDDAP™ 當他是個政府承包商時, [ NOAA 海岸觀察](https://coastwatch.noaa.gov/) 程序 [ NOAA iOOS](https://ioos.noaa.gov/) 程序,以及目前已關閉的太平洋海床追蹤 (后) 程序。

有很多功勞 ERDDAP™ 提供建議與評論的管理員與使用者, ERDDAP . 許多人的名字在 [變更清單](/changes) . 謝謝大家 (命名和未命名) 非常喜歡 因此, ERDDAP™ 是個很好的例子 [使用者](https://en.wikipedia.org/wiki/User_innovation) 產品創意常常來自於消費者 ( ERDDAP™ 使用者) 不只是制片人 ( ERDDAP™ 發展者) .

以下是正在 ERDDAP™ 分配。 我們非常感謝這一切。 謝謝你
 \\[ 從2021年開始, 幾乎不可能列出所有代碼來源 ERDDAP™ 因為我們使用的數個圖書館 (特别是AWS) 並使用許多其他圖書館。 所有圖書館 ERDDAP™ 下面直接包含代碼呼叫,其他圖書館依次使用的许多圖書館也是如此。 如果你看到我們忽略了下面的項目, 請讓我們知道, \\] 

## 概述{#overview} 
 ERDDAP™ 是 [ Java 伺服器](https://www.oracle.com/technetwork/java/javaee/servlet/index.html) 程序。 在 ERD 它在內部 [托姆卡特](https://tomcat.apache.org/) 應用程式伺服器 (授權 : [阿帕奇語Name](https://www.apache.org/licenses/) ) ,带有 [阿帕奇語Name](https://httpd.apache.org/) 網路伺服器 (授權 : [阿帕奇語Name](https://www.apache.org/licenses/) ) ,使用 [紅帽 Linux](https://www.redhat.com/) 操作系統 (授權 : [普通](https://www.gnu.org/licenses/gpl-3.0.html) ) .
     
## 數據集{#datasets} 
數據集來自各種來源。 參考中繼資料 (特别是 " sourceUrl ", " infoUrl ", "institution" 牌照) 每一数据集。 许多數據集對其使用有限制, 要求您在使用數據時引用/ 授信資料提供者 。 引用/授信數據提供者的方式總是很好。 看 [如何在紙上儲存資料集](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset) .
     
## Cohort 軟體{#cohort-software} 
 [校友/教友班](#cohort-software) 來自Cohort軟體 (https://www.cohortsoftware.com) 讓這些課程有MIT/X類的授權 (校對:Soup) .
     
## 海岸觀察瀏覽器{#coastwatch-browser} 
 ERDDAP™ 使用 Coast Watch 瀏覽器專案的代碼 (已取消) 從 [ NOAA 海岸觀察](https://coastwatch.noaa.gov)   [西海岸区域节点](https://coastwatch.pfeg.noaa.gov/)   (授權: 已發權的開放源碼) . 這項計畫是由 Dave Foley 創辦和管理的, NOAA 海岸觀察西海岸區節點 所有海岸監視瀏覽器的代碼都是鮑勃·西蒙斯寫的
     
##  OPeNDAP  {#opendap} 
資料來自 [ OPeNDAP ](https://www.opendap.org) 伺服器用 [ Java   DAP 1.1.7](https://www.opendap.org/deprecated-software/java-dap)   (授權: LGPL) .
     
##  NetCDF -賈瓦{#netcdf-java} 
 NetCDF 文件 ( .nc ) , GMT 型 NetCDF 文件 (.grd) GRIB 和 BUFR 是用密碼讀寫的 [ NetCDF   Java 文庫](https://www.unidata.ucar.edu/software/netcdf-java/)   (授權 : [BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE) ) 從 [ Unidata ](https://www.unidata.ucar.edu/) .

軟體包含在 NetCDF   Java .jar:

* slf4j
其 NetCDF   Java 圖書館和卡珊德拉需要 [Slf4j 來自簡單的登記面板 Java ](https://www.slf4j.org/) 專案。 目前, ERDDAP™ 使用 slf4j-simple-xxxxjar 重新命名為 slf4j.jar 来满足此需要 。 (授權 : [MIT/X](https://www.slf4j.org/license.html) ) .
     
* 吉姆
其 NetCDF   Java .jar 包含 XML 處理碼 [吉姆](http://www.jdom.org/)   (授權 : [阿帕奇語Name](http://www.jdom.org/docs/faq.html#a0030) ) 包含在netcdfall.jar中。
     
* 裘達
其 NetCDF   Java .jar 包括 [裘達](https://www.joda.org/joda-time/) 用于行事曆計算 (可能沒有被使用 ERDDAP ) . (授權 : [阿帕奇2.0](https://www.joda.org/joda-time/licenses.html) ) .
     
* 阿帕奇語Name
其 NetCDF   Java jar 包括 .jar 數個檔案 [Apache 專案](https://www.apache.org/) :
     [公用碼c](https://commons.apache.org/proper/commons-codec/) ,
     [公開發現](https://commons.apache.org/discovery/) ,
     [普通 http 客戶端](https://hc.apache.org/httpcomponents-client-ga/) ,
     [普通部落格](https://commons.apache.org/proper/commons-logging/)   
     [Http 元件](https://hc.apache.org) ,
     (所有人: 駕照 : [阿帕奇語Name](https://www.apache.org/licenses/LICENSE-2.0) )   
這些都包含在Netcdfall.jar中.
     
* 其他
其 NetCDF   Java . jar 还包括 com.google.code. findbugs. com.google.erroful, com.google.guava, com.google. j2objc, com.gogle. protobuf, edu.ucar, org.codehaus.mojo, com.beust.jcomcommander.com.google.common, com.gogle.re2j, com.google.第三方。 (Google 使用 Apache 和 BSD 類型的授權 。)   
         
## SGT{#sgt} 
圖和地圖是用修改后的版本在飛行中建立的 NOAA 的 SGT (在https://www.pmel.noaa.gov/epic/java/sgt/已中止) 版本3 (a Java - 唐納德·登博在 [ NOAA 平面](https://www.pmel.noaa.gov/) )   (授權: 已發權的開放源碼 (在https://www.pmel.noaa.gov/epic/java/license.html) ) .
     
## 沃爾特·佐恩{#walter-zorn} 
大型 HTML 工具提示 ERDDAP 使用 Walter Zorn 的 wz\\_tooltip 建立 HTML 頁面 。 js (授權: LGPL) .
滑動器和滑動排序器的拖放功能由 Walter Zorn 的 wz\\_dragdrop.js 建立 。 (授權: LGPL) .
     
## 開啟 PDF{#openpdf} 
.pdf 檔案以 [開啟pdf](https://github.com/LibrePDF/OpenPDF) 自由 Java -PDF圖書館
     
## GSHS{#gshhs} 
海岸线和湖泊的資料來自 [GSHS](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html) - 全球自成一体的、分級的、高分辨率的海岸線數據庫 (授權 : [普通](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT) ) 由保羅·韋瑟爾和華特·史密斯創作

我們不為所帶來的短線數據的失誤 提出索赔 ERDDAP™ - 不要用它來做航海目的。
     
    
## 格林尼治平面{#gmt-pscoast} 
政治邊界和河流資料來自 [浮雕](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html) 程序在 [格林尼治平时](https://www.soest.hawaii.edu/gmt/) 的資料。 [中情局 世界數據庫二](https://www.evl.uic.edu/pape/data/WDB/)   (授權:公有领域) .

我們沒有對政治博物館 的不公性提出指控 ERDDAP .
    
## ETOPO( 埃托波 ){#etopo} 
一些地圖的背景中所使用的水深/地形數據是 [ETOPO1 全球 1- Minute 嵌入梯形數據集](https://www.ngdc.noaa.gov/mgg/global/global.html)   (冰面, 已登記的格子, 二元字節, 2 字節 : etopo1============================ .zip )   (授權 : [公有领域](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright) ) ,由 [ NOAA NGDC( NGDC )](https://www.ngdc.noaa.gov) .

我們不為 拍攝/拍攝數據的失誤 提出索赔 ERDDAP . 不要用它來做航海目的。
    
##  Java 信件{#javamail} 
電子郵件在信件中使用代碼傳送 。 罐子來自 Oracle 是 [ Java 郵件 API](https://javaee.github.io/javamail/)   (授權 : [共同发展和分配限制 (CDDL 磁碟) 1.1版本](https://javaee.github.io/javamail/LICENSE) ) .
     
## 杰森{#json} 
 ERDDAP™ 使用 [json.org的 Java -基於 JSON 文庫](https://www.json.org/index.html) 要剖析 [杰森](https://www.json.org/) 資料 (授權 : [版權開放的來源](https://www.json.org/license.html) ) .
     

## 后灰體QL{#postgrsql} 
 ERDDAP™ 包括 [后Gres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql) 驅動程式 (授權 : [BSD 中](https://www.postgresql.org/about/licence/) ) . 司機是版權 (c)) 1997-2010年,PostgreSQL全球發展集團。 版权所有。
     
## 露茜娜{#lucene} 
 ERDDAP™ 使用来自 Apache 的代碼 [露茜娜](https://lucene.apache.org/) . (授權 : [阿帕奇語Name](https://www.apache.org/licenses/LICENSE-2.0) ) 用于“ lucene” 搜索引擎選項 (但不是預設的「 原始」 搜尋引擎) .
     
## 普通- compress{#commons-compress} 
 ERDDAP™ 使用来自 Apache 的代碼 [普通- compress](https://commons.apache.org/compress/) . (授權 : [阿帕奇語Name](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## 切斯勒{#jexl} 
 ERDDAP™ 支援在 :&lt; sourceName s &gt; 依赖于 [Apache 專案](https://www.apache.org/) : [ Java 表示語言 (切斯勒) ](https://commons.apache.org/proper/commons-jexl/)   (授權 : [阿帕奇語Name](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## 卡珊德拉{#cassandra} 
 ERDDAP™ 包括 阿帕奇語Name [卡珊德拉的](https://cassandra.apache.org/)   [卡桑德拉河核心 jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)   (授權 : [阿帕奇2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE) ) .
卡桑德拉的卡桑德拉干流核心。 (所以 ERDDAP™ 包括) :
*    [木瓜.jar](https://github.com/google/guava)   (授權 : [阿帕奇2.0](https://github.com/google/guava/blob/master/LICENSE) ) .
*    [lz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)   (授權 : [阿帕奇2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt) ) .
*    [公分](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)   (授權 : [麻省理工学院](https://github.com/codahale/metrics/blob/master/LICENSE) ) .
*    [网易网. jar](https://netty.io/downloads.html)   (授權 : [阿帕奇2.0](https://netty.io/downloads.html) ) .
*    [沙皮·賈瓦·賈爾](https://xerial.org/snappy-java/)   (授權 : [阿帕奇2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE) ) .
         
##  KT\\_ 調色板{#kt_-palettes} 
前缀的色調色板 " KT\\_ " 是 [Kristen 收藏的 .cpt 調色板 辛](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)   (授權 : [MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html) ) 珍妮佛·塞瓦迪安 NOAA 以便他們遵守, ERDDAP .cpt的要求。
     
##  Leaflet  {#leaflet} 
 ERDDAP™ 使用 Java 文稿文庫 [ Leaflet ](https://leafletjs.com/)   (授權 : [BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) ) 如 WMS 客戶端在 WMS 網頁 ERDDAP . 很棒的軟體 (設計精良、易用、快速和自由) 弗拉基米爾·阿加芬金
     
## 阿WS{#aws} 
因為與 Amazon AWS 合作 (包括S3) , ERDDAP™ 使用 [AWS SDK 表示 Java ](https://aws.amazon.com/sdk-for-java/)   (授權 : [阿帕奇語Name](https://www.apache.org/licenses/) ) .

AWS需要馬文拉入依赖性. 包括以下 . (其中xxxx是版本號碼,它會隨時間而變化,且授權型態在括弧中) :注解-xxxjar (阿帕奇語Name) apache-client -xxx.jar (阿帕奇語Name) ,ams -xxx.jar (BSD 中) 。 (BSD 中) 分析 (BSD 中) 。 (BSD 中) 樹枝 (BSD 中) 。 (BSD 中) 。 (?) ,Aws (阿帕奇語Name) , 啊, query, protocol - xxxxx.jar (阿帕奇語Name) 。 (阿帕奇語Name) ,檢查器-qual-xxxx.jar (麻省理工学院) , 錯誤的% xxxx. jar (阿帕奇語Name) ,事件流-xxxjar (阿帕奇語Name) ,失敗存取-xxxjar (阿帕奇語Name) , http core-xxxx.jar 中 (阿帕奇語Name) xxxxx.jar (阿帕奇語Name) , Jackson - 註解 - xxxx.jar (阿帕奇語Name) ,杰克森核心xxxxx.jar (阿帕奇語Name) , Jackson - databind - xxxx.jar 。 (阿帕奇語Name) , jaxen xxxx.jar (BSD 中) jffi (阿帕奇語Name) ,jffi -xxx. native. 罐 (阿帕奇語Name) jnr -constants -xxxx.jar (阿帕奇語Name) jnr -ffi -xxxxxx.jar (阿帕奇語Name) jnr -posix -xxxxxx.jar (阿帕奇語Name) ,jnr-x86asm-xxxxxx.jar (阿帕奇語Name) json -xxx.jar (版權開放的來源) ,jsr305-xxxx.jar (阿帕奇語Name) ,可聽的未來-xxx.jar (阿帕奇語Name) 大概一打網球 罐子 (阿帕奇語Name) xxxx.jar (阿帕奇語Name) ,程序 (阿帕奇語Name) ,反應流-xxxx.jar (可可 1.0) 區域-xxxjar (阿帕奇語Name) s3-xxx.jar (阿帕奇語Name) sdk -core -xxxxx.jar (阿帕奇語Name) , utils - xxx.jar (?) . 查看實際駕照, [馬文寄存器](https://mvnrepository.com/) 然后在專案的檔案裡到處翻滾 以找到駕照
    

我們也非常感謝我們開發時使用的所有軟體和網站。 ERDDAP ,包括
 [顏色](https://www.google.com/chrome/browser/desktop/) ,
 [ curl ](https://curl.haxx.se/) ,
 [Duck Duck 走](https://duckduckgo.com/?q=) ,
 [編輯套件](https://www.editplus.com/) ,
 [文件Zilla](https://filezilla-project.org/) .
 [GitHub 圖片](https://github.com/) ,
 [谷歌搜索](https://www.google.com/webhp) ,
 [普提](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) ,
 [堆疊溢出](https://stackoverflow.com/) ,
 [待辦事項](https://todoist.com/?lang=en) ,
 [ Wikipedia ](https://www.wikipedia.org/) ,
網絡、环球網 以及其他所有大有幫助的網站
謝謝你
