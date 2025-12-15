---
title: "EDDTableFromEML"
sidebar_position: 6
---
# EML 的 EDD 表和EMLBatch 的 EDD表 產生達泰斯的選項 Xml 命令

 \\[ 此網頁將只引起興趣 ERDDAP™ 工作於 EML 文件的管理員 。
此文件最初建立于2016年. 最近一次改編于2020-11-30. \\] 

 [ ** ERDDAP™ ** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 是一個數據伺服器, 讓使用者可以簡單、一致的方式以共同的檔案格式下載網格化和表格化的科學數據集, 並製作圖和地圖。 ERDDAP™ 以給定的數據集做為多维網格變數群組 (例如,卫星或模型数据) 或作為類似資料庫的表格 (每類資訊的列和每項觀察的列) . ERDDAP™ 是自由開源碼軟件,所以任何人都可以 [下載及安裝 ERDDAP™ ](/docs/server-admin/deploy-install) 提供他們的數據

將數據集加入到 ERDDAP™ 安裝, 即 ERDDAP™ 管理員必須將描述數據集的 XML 區塊加入到稱為檔案中 datasets.xml . (有 [完整文件 datasets.xml ](/docs/server-admin/datasets) .) 雖然可以產生 XML 的區塊 datasets.xml 完全靠手 ERDDAP™ 帶來一個叫做「 工具」 的工具 [ **產生 DatasetsXml** ](/docs/server-admin/datasets#tools) 它可以產生一個給定的資料集需要的 XML 區塊的粗略草稿, 其基於數據集的某些資訊來源 。

第一件事 產生達塔塞斯 Xml 問您要建立什麼樣的數據集 。 產生達塔斯 Xml有特殊的選擇 **EML 的 EDD 表格** ,在其中使用信息 [生态元数据語言 (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) 產生 XML 區塊的 XML 檔案 datasets.xml 要建立 [Ascii 檔案中的 EDD 表格](/docs/server-admin/datasets#eddtablefromasciifiles) EML 檔案中每個資料表中的數據集。 這對大多數 EML 檔案非常有效, 大多是因為 EML 檔案非常出色地將所有需要的中繼資料儲存在容易操作的格式中 。 GenerateDatasetsXml 要建立數據集需要的資訊在 EML 檔案中, 包括資料檔的URL, 它會產生 DatasetsXml 下載, 剖析, 並比對 EML 檔案中的描述 。 (許多團體會善於轉換到EML, 建立 XML chemas 的許多群組會用 EML 做為 XML chema 的案例研究, (也就是,太多的關卡) 也容易讓人類和電腦合作) 

## 疑問{#questions} 

這是所有問題 產生達塔斯 Xml 會問, 若您要處理一個 EML 檔案或數批 EML 檔案, 該如何回答 :

* 哪個EDDTYPE?
如果您要處理一個檔案, 請回答: EDD Table FromEML
如果您要處理一组檔案, 請回答: EDD Table FromEMLBatch
* 要儲存檔案的目錄 ?
輸入要儲存已下載的EML 和/或資料檔的目錄名稱 。
如果目錄不存在, 會被建立 。
*    (EML 中的 EDD 表格 只有) EML 網址或本地檔案Name
輸入 EML 文件的 URL 或本地文件名 。
*    (只對EMLBatch的 EDD 表格) EML 迪爾 (網址或本地端) ?
用 EML 檔案輸入目錄名稱 (URL 或本地目录) .
例如:http://sbc.lternet.edu/data/eml/files/
*    (只對EMLBatch的 EDD 表格) 文件名 regex ?
輸入正規表示式, 用于在 EML 目錄中辨識想要的 EML 檔案 。
例如: knb- lter- sbc\\.\\ d+
* 如果存在, 使用本地文件 (真 | 假) ?
如果已存在, 輸入以使用本地 EML 檔案與資料檔 。
輸入假以總是重新下載 EML 檔案和/或資料檔 。
* 可存取 要?
如果您想讓新數據集成為私人數據集 ERDDAP ,指定群組名稱 (s) 這將被允許存取。
建議使用 LTER 群組: 將「 lter」 加上群組, 例如 liter 斯比克
如果你輸入「 null 」 , 就沒有&lt;可存取 輸出中的 togt; 標籤 。
看 [可存取 至](/docs/server-admin/datasets#accessibleto) .
* 本地 時區 (例如,美国/太平洋) ?
如果時間變數表示它有本地時間值, 此時區將被指定 。
這一定是從 [TZ 時區名稱列列表](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) .
注意所有容易使用的名字。
如果你後來發現這不正確,你可以改變 time\\_zone 區塊 datasets.xml .

EML 附加 ERDDAP™ 是個很棒的搭檔,因為 ERDDAP™ 可以讓使用者更直接地取得 [生物复合性知识网络 (KNB) ](https://knb.ecoinformatics.org/) 和 [长期生态研究 (升) ](https://lternet.edu/) 幫助這些計畫與美國政府相遇, [公众获取研究成果 (批次) 所需经费](https://nosc.noaa.gov/EDMC/PD.DSP.php) 以網路服務提供數據。 另外,EML+ ERDDAP™ 似乎在學術界/NSF資助的科學家 和聯邦機構的科學家之間 ( NOAA NASA,USGS) 域。

看我們的 [部分](/docs/intro#support) .
 
## 設計細節{#design-details} 

以下是生成 DatasetsXml 中的 EDDTable FromEML 選項的設計細節 。
部分原因与EML和 ERDDAP™ 做事和如何產生達塔塞斯 Xml處理這些問題。

### 一個資料表變成一個 ERDDAP™ 數據集{#one-datatable-becomes-one-erddap-dataset} 
一個EML 檔案可能有多重&lt;資料 表格( G) 。 ERDDAP™ 做一個 ERDDAP™ eML 資料表。 其 datasetID 數據集
 *EML Name* \\_t *表格*   (當 EML 名稱是文字時) 或
 *系統QQEMLName* \\_t *表格*   (當 EML 名稱是數字時) .
例如, 檔案 knb- lter- sbc.28 中的表 1 變成 ERDDAP™   datasetID =knb\\_lter\\_sbc\\_28\\_t1,
     
### EML 對 CF+ACDD{#eml-versus-cfacdd} 
EML 檔案中几乎所有的中繼資料都進入 ERDDAP ,但格式不同。 ERDDAP™ 使用 [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 和 [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据標準 。 它們是互补的元数据系統,
對, 中繼資料的 EML 代表比 CF+ ACDD 代表更好 。 我不是說用CF+ACDD代表來取代EML 請將 CF+ACDD 視為從EML世界到 OPeNDAP /CF/ACDD世界.
     
### 小變更{#small-changes} 
 ERDDAP™ 做了很多小改變。 例如, ERDDAP™ 使用 EML 非 - DOI 替代 辨識器加數據表數字為 ERDDAP™   datasetID 稍有變更 以 Knb- lter- sbc.33 資料等語言將它變成有效的變數名稱 表1成了knb\\_lter\\_sbc\\_33\\_t1.
     
### DocBook 文稿{#docbook} 
EML 使用 DocBook 的標記系統來為 EML 檔案中的文字區塊提供結構 。 CF 和 ACDD 要求中繼資料是純文字 。 所以產生達塔斯 Xml 將標記的文字轉換成純文本, 看起來像是格式化的文字版本 。 內含的標籤用方括号进行消毒,例如, \\[ 強調 \\] ,然后放在正文中。
     
### 資料檔案{#data-files} 
由于 EML 資料表包含實際資料檔的網址, GenerateDatasets Xml 會:
1. 下載資料檔 。
2. 儲存在與 EML 檔案相同的目錄中 。
3. 讀一下資料
4. 將 EML 中的資料描述與檔案中的实际資料比較 。
5. 如果產生達塔斯 Xml 找到不同, 它會處理它們, 或是問操作員是否正確, 或是傳回錯誤訊息 。 以下各目各目。
         
###  .zip 資料檔{#zipd-data-files} 
如果引用的資料檔是 .zip 檔案, 它必須包含一個檔案 。 此檔案將用於 ERDDAP™ 數據集。 如果有不止一個檔案 。 ERDDAP™ 會拒絕數據集 如果需要,可以修改。 (實際上, 所有 SBC LTER zip 檔案只有一個資料檔 。)   
     
### 儲存模式{#storagetype} 
如果列的儲存 型態沒有指定, ERDDAP™ 使用基于資料檔中資料的最佳猜測 。 效果很好
     
### 單位{#units} 
 ERDDAP™ 使用 [ UDUNITS 單位格式化](https://www.unidata.ucar.edu/software/udunits/) . 產生達塔斯 Xml 能將 EML 單位轉換為 UDUNITS 95%的時間是清潔的 其余的5%可以讀取單位的描述,例如,EML中的"生質單位感應單位"(BiomasDensity UnitPerAbendance Unit)成為"生質單位密度單位每丰度單位"(Biomas centrality unit each fund). ERDDAP . 從技術上說,這是不允许的。 我不認為在這種情況下會很糟 \\[ 必要的話,不能制造的單位 UDUNITS 兼容可移至變數的註解屬性 。 \\]   
     
### EML 版本 2.1.1{#eml-version-211} 
EML v2.1.1 檔案的此支援已新增到 GenerateDatasets 2016年, 截至2020年,这种情况尚未发生。 其 ERDDAP™ 開發者很樂意加入對 EML 更近代版本的支援, 但前提是新功能會被實際使用 。 請發郵件 erd.data at noaa.gov 如果您想要支援 EML 的最近版本, 並會使用此功能 。
     

## EML 文件的問題{#issues-with-the-eml-files} 

EML 檔案中有些問題或問題讓軟體客戶端產生問題 (例如生成 DatasetsXML 中的 EDDTable FromEML 選項) 試著解析/處理 EML 檔案 。

* 雖然這裡有幾個問題, 總而言之 EML是個很棒的系統 我很高興能與它合作
* 由最差的/ 最普遍到最差的/ 不太常见。
* 大多與特定 EML 檔案中的小問題有關 (不是EML的錯) .
* 大多數可以由 EML 檔案或資料檔的簡單變更來固定 。
* 因為LTER人們正在建立EML檢查器以測試EML檔案的有效性,

以下是:

### 分离日期和時間列{#separate-date-and-time-columns} 
有些資料檔案有日期與時間的分列, 但沒有统一的日期+時間列 。 目前, 生成 Datasets Xml 用這些獨立的欄目建立數據集, 但並不理想, 因為:

* 最好把數據集放進去 ERDDAP™ 將日期+時間列合為一 "time" .
* 通常數據集不會載入 ERDDAP™ 因為 "time" 列沒有日期+時間數據。

有两种可能的解决办法:
1. 編輯來源資料檔以便在資料檔中新增一欄 (在EML中描述) 其中日期和時間列合并成一列。 然后重執行生成達泰斯 Xml,所以它找到新的列。
2. 使用 [衍生變數](/docs/server-admin/datasets#script-sourcenamesderived-variables) 特性在 ERDDAP™ 以定义新變數 datasets.xml 它是由日期和時間列調整而成的。 例如,
         
### 不一致的欄名{#inconsistent-column-names} 
EML 檔案列出資料檔案的列及其名稱 。 不幸的是, 它們常常與實際資料檔中的列名不同 。 通常, EML 檔案中的列序與資料檔中的列序相同, 即使名稱稍有不同, 但並不總是如此 。 產生達塔斯 Xml 試著匹配列名 。 當它不能 (常用的) , 它會停止, 顯示 EML/ 資料檔名對對, 並問它們是否對齊 。 如果您輸入 's' 要跳過表格, 產生 DatasetsXml 會列印錯誤訊息, 繼續到下一個表格 。
解決方案是更改 EML 檔案中錯誤的欄名, 以匹配資料檔中的欄名 。
     
### 不同的列排序{#different-column-order} 
有幾例 EML 以與數據檔不同的順序指定列 。 產生達塔斯 Xml 會停止, 問操作員匹配是否正常, 或是是否要跳過數據集 。 如果跳過, 結果檔中會有錯誤訊息, 例如: :
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
解答是固定這些 EML 檔案中的列排序, 以便符合資料檔中的排序 。

如果 EML 檢查器檢查來源檔案中的列和列排序是否符合 EML 檔案中的列和列排序, 那會很好 。
    
### 不正確的數字頭線{#incorrect-numheaderlines} 
數個資料 表格不正確地表示數字頭線=1, 例如... sbc. 4011。 原因 ERDDAP™ 以列名讀取第一行資料。 我試著手動SKIP 所有這些資料表。 因為未匹配的來源 col 名稱都是數據值 。 如果有檔案不正確地有數字頭列斯=0, 我的系統不會顯而易見。 以下是SBC LTER 失敗檔的一個例子:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
所以錯誤可能會顯得像產生達塔斯 Xml 認為檔案中有資料的第一行 (例如,2008-10-01-00:00等。) 是列名的直線 (仿佛2008- 10-01- 00: 00 是列名稱) .

如果EML 檢查器檢查數字頭目值會更好 。
    
### 數字頭線 = 0{#numheaderlines--0} 
有些來源檔案沒有列名 。 ERDDAP™ 接受 如果 EML 描述的列數相同 。

我認為這很危險。 可能會有不同順序或單位的列 (见下文) 而且沒有辦法抓住這些問題 如果所有的 ASCII 資料檔都有列名, 那要好得多 。
    
### 日期格式字串{#datetime-format-strings} 
EML 有標準的描述日期時間格式的方法 。 但它在 EML 檔案中的用法有很大的不同。 (以前我錯了 我看到了 EML 格式化的文件 。 [ Java 日期](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html) ,但是缺乏使用它的重要指標,因此格式String常常/通常被不适当地使用。) 有好幾個案例有不正確的大小寫和/或不正確的重复字母和/或非標準格式。 這對客戶端造成不合理的負擔, 尤其是GenerateDatasetsXml等軟體客戶端。 產生達塔斯 Xml 試圖將 EML 檔案中不正確定義的格式轉換為
 [日期/時間格式 ERDDAP™ 需要](/docs/server-admin/datasets#string-time-units) ,几乎与 Java / Joda 時空格式规格, 但稍稍寬恕 。

如果EML檢查器要求严格遵守 Java /喬達/ ERDDAP 數據表中的日期時間值可以用指定格式正确解析 。
    
### 日期時間但沒有時區{#datetime-but-no-time-zone} 
產生達塔斯 Xml 尋找有日期的列 時間與指定時區 (或 Zulu : 從以 'Z' 結束的時間單位, 或是包含「 gmt」 或「 utc」 的欄名或屬性定義, 或是本地端: 從欄名或屬性定義中的「 本地端」) . 也可以接受有日期列但沒有時間列的檔案。 也可以接受沒有日期或時間資訊的檔案。

產生達塔斯 Xml 將所有「 本地」 時區視為您可以指定某批檔案的時區, 例如SBC LTER, 使用 US/ Pacific 。 資訊有時會在註解中,

不符合此條件的檔案以「 無好日期」 訊息拒絕 。 (時間) 可能。 共同的問題是:

* 有一列有日期,一列有時,但不是日期 時光專欄
* 有時間單位 但時區沒有指定

其他註解:
如果時區欄位有好的日期+時間,則會命名此欄位 "time"  in ERDDAP . ERDDAP™ 要求時間列資料可以理解/可切換到 Zulu /UTC/GMT 時區日期 \\[ 我認為: (2位年&#33; mm/dd/yy vs dd/mm/yy vs.) 在資料檔案中強迫最终用户做複雜的轉換到 Zulu 以比對一個数据集的資料與另一個数据集的資料。 所以 ERDDAP™ 將所有時間資料标准化 : 在弦時, ERDDAP™ 總是使用 ISO 8601: 2004 (英) 標準格式,例如1985-01-02T00:00Z。 就數量而言, ERDDAP™ 總是使用 "seconds since 1970-01-01T00:00:00Z" . ERDDAP™ 總是使用 Zulu   (UTC,格林尼治平时) 以去除不同時區和標準時段的工作困難, 所以產生達塔斯 Xml 尋找有日期+時間的 EML 資料表列 Zulu . 這很困難 因為EML 不使用正式的词汇/系統 (像 [ Java / Joda 時間格式](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html) ) 指定資料 時間格式 :
如果有數值的函數 (例如, Matlab 倍) 和 Zulu 時區 (或只是日期,沒有時間柱) ,用作 "time" .
如果有相關日期和時間資料, 請使用 Zulu 時區,它被用作 "time" 并移除其他日期或時間列。
如果找到有日期資訊的函數, 它會被當做是 "time" 變數 (沒有時區) .
如果有數據欄和時間欄且沒有合并日期 時間列, 數據集是 REJEETED 的, 但數據集可以通过新增日期來使用 時間列 (最好是 Zulu 時區) 加入資料檔,并在 EML 檔案中加入其描述。
來自SBC LTER的演示: [https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/) 資料表2。

如果 EML/LTER 要求加入一列, 那就更好了 Zulu   (UTC,格林尼治平时) 所有相關來源資料檔中的時區時間。 下一個最好是在 EML 中加入一個系統以指定 time\\_zone 使用標準名稱的屬性 (從 [TZ列](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ) .
    
### 缺少 missing\\_value  {#missing-missing_value} 
有些列使用 a missing\\_value 但不要在EML中繼資料中列出, 例如, knb- lter- sbc. 5011 使用的是 -999. 如果在 EML 中沒有指定錯誤的值, 產生 DatasetXml 自動搜尋常见錯誤的值 (例如,99、99、999、999、9999、9999等。) 建立中繼資料 但其他缺失 missing\\_value s沒有被抓住。

如果EML檢查器找不到就好了 missing\\_value s.
    
### 小問題{#small-problems} 
有很多小問題 (拼寫、 拼音) 可能只有人類檢查每個數據庫 才能找到它

如果EML檢查器尋找拼寫和文法錯誤, 那會很好. 這是個很困難的問題, 可能需要人文編輯。
    
### 不合法的 Unicode 字元{#invalid-unicode-characters} 
有些 EML 內容包含無效的 Unicode 字符 。 這些可能是從 Windows 字元集中被錯誤复制並貼入 UTF-8 EML 文件的字符 。 產生達塔斯 Xml 消毒這些字元,例如, \\[ #128 \\] 所以他們很容易在 ERDDAP™   datasets.xml 文件。

如果EML檢查器能檢查一下就好了 很容易找到,很容易修好。
    
### 不同的列單位] (不同的單位)  {#different-column-unitsdifferentcolumnunits} 
有些 EML 資料表定義欄位與資料檔的欄位不符, 特別是它們有不同的單位 。 產生達塔斯 XML 標示這些。 由操作員來決定這些區別是否正常。 這些在失敗檔案中顯示為「 SKIPPED 」 資料表 。 SBC LTER 失敗檔中的 EXAMPLE :
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
如果EML檢查器能檢查一下單位是否匹配,那就太好了. 不幸的是, 這可能無法捕捉到, 以上例子的差异只因單位包含在來源列名稱和EML列名稱中而顯而易見 。 有多少其他資料表有這個問題,
    
### EML 的不同版本{#different-versions-of-eml} 
產生達塔斯 Xml旨在与EML 2.1.1合作. 其他版本的EML會工作到符合2.1.1或者GenerateDatasetsXml有特殊代碼處理的程度。 這是罕見的問題 當它發生時, 解答是將您的檔案轉換成 EML 2.1.1, 或是將 EML 檔案送至 erd.data at noaa.gov 生成達塔斯 Xml來處理分歧

Bob 新增了 EML 檔案支援到 GenerateDatasets 2016年, 截至2020年,这种情况尚未发生。 Bob樂意加入對 EML 更近代版本的支持, 請發郵件 erd.data at noaa.gov 如果您想要支援 EML 的最近版本, 並會使用此功能 。
    
### 分析資料檔的問題{#trouble-parsing-the-data-file} 
數據表的錯誤可能會被拒絕 。 (观测值=52,期望值=50) " 這樣的錯誤訊息表示資料檔中的一行的數值與其它行不同 。 這可能是個問題 ERDDAP™   (例如, 不正确剖析檔案) 或檔案中。 來自SBC LTER的演示:
 [https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/) 數據表3,參考資料檔=LTER=月度=Bottledata=
