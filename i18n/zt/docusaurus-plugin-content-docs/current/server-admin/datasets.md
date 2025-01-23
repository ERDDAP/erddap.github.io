---
title: "ERDDAP™ - Working with the datasets.xml File"
---
# 与datasets.xml文件

\\[此網頁將只引起興趣ERDDAP™管理者\\]

你跟著我ERDDAP™ [安裝指令](/docs/server-admin/deploy-install)您必須編輯datasets.xml文件在 *湯姆卡* /content/erddap/ 描述您的數據集ERDDAP™安裝會用上

- - –

## [引言](#introduction) {#introduction} 

### 需要一些大會{#some-assembly-required} 
在ERDDAP™不只是指向數據集的目錄或網址。 您必須寫入一塊 XML 。datasets.xml描述數據集。

* 用于网格化的數據集,以使數據集符合ERDDAP網格化數據的數據結構, 您必須找出數據集的一個子集, 這些子集的變數具有相同的維度 。 ([為什麼?](#why-just-two-basic-data-structures) [怎么做?](#dimensions)) 
* 資料集目前的元数据自動匯入 。 但如果您要修改中繼資料或加入其他中繼資料, 您必須在datasets.xml. 而且ERDDAP™需要其他元数据,包括[全局屬性](#global-attributes)  (例如infoUrl机构,sourceUrl摘要和标题) 和[變數屬性](#variable-addattributes)  (例如long\\_name單位) . 正如目前數據集中的中繼資料增加了描述性資訊,ERDDAP™新增資料集的描述性資訊 。 新增的中繼資料是您數據集的一個很好的新增, 并且有幫助ERDDAP™向不熟悉的使用者展示你的資料。
*   ERDDAP™需要你做一些特殊的事情[經度、纬度、高度 (深度) 時間變數](#destinationname).

如果你買入這些想法 并花錢建立 XMLdatasets.xml你得到所有的優點ERDDAP™,包括:

* 資料集的全文搜索
* 按類別搜尋數據集
* 資料存取表 ( *datasetID* .html) 以便您可以要求數個不同檔案格式的數據子集
* 要求圖示和地圖的表單 ( *datasetID* 圖片) 
* 網頁映射服務 (WMS) 格子化的數據集
*   RESTful存取您的資料

制作datasets.xml第一批數據集需要大量努力,但 **越來越容易** . 在第一個數據集之後, 您常常可以重新使用很多工作來做下一個數據集 。 很幸運ERDDAP™帶兩個來[工具](#tools)以幫助您建立 XML 每套資料datasets.xml.
如果你卡住了,看我們的[部分](/docs/intro#support).

### 資料提供者 表單{#data-provider-form} 
當數據提供者來到您想要將一些數據加入您的ERDDAP,收集所有的中繼資料可能很困難和耗時 (數據集的資訊) 需要將數據集加入ERDDAP. 很多資料來源 (例如,.csv文件, Excel 文件, 資料庫) 沒有內部中繼資料 所以ERDDAP™有一個資料提供方表格,它收集資料提供者的中繼資料,并給資料提供者一些其他的指導,包括廣泛的指導[數據庫中的資料](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases). 提交的資訊已轉換成datasets.xml格式,然后發到ERDDAP™管理者 (你) 已寫入 (附 件) 至 *大家长會* /logs/data 提供form.log. 因此,窗体半自動將數據集的進化过程ERDDAP但是ERDDAP™管理員仍然需要完成datasets.xml區塊與處理取得資料檔 (s) 從提供者或連接數據庫。

外部來源提交實際資料檔案是巨大的安全風險,所以ERDDAP™不處理。 您必須想出一個對您和數據提供者有效的解決方案, 例如電子郵件 (小檔案) ,拉出云 (例如, DropBox 或 Google 驱动器) , sftp 網站 (有密碼) 或运动鞋 净额 (USB 拇指硬碟或外部硬碟) . 你可能只應該接受你認識的人的檔案 您需要掃瞄病毒的檔案並采取其他安全防范措施 。

沒有任何連結ERDDAP™到資料提供者表格 (例如,ERDDAP™主頁) . 相反,當有人告訴你,他們想得到他們的數據 由你的ERDDAP你可以發個電子郵件給他們說:
是的,我們可以把你的數據輸入ERDDAP. 要開始,請填表到 https://*yourUrl*/erddap/dataProviderForm.html   (或http://如果https://沒有開啟) .
你做完後,我會聯繫你 找出最後的細節
如果你想看看表格 (不填) 你可以看到表格上ERD是ERDDAP:[引言](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html),[第一部分](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html),[第二部分](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html),[第三部分](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html)和[第四部分](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html). 這些連結在ERD ERDDAP™傳送資訊給我,不是你,所以不要跟他們提交資訊 除非你真的想把數據加入到ERD ERDDAP.

如果您要移除資料提供者表格ERDDAP™放置
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
在您的設定值. xml 檔案中 。

原因就是NOAA2014年[公众获取研究成果 (批次) 指令](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf),要求所有NOAA透過數據服務, (不只是檔案) 在建立12個月內 因此,使用ERDDAP™以讓數據集通過服務 ASAP 提供 。 我們需要更有效的方法 處理大量數據提供商

反馈/建议? 此表格是新格式, 請用電子郵件erd dot data at noaa dot gov若您有任何回應或建議,

### 工具{#tools} 
ERDDAP™包含兩個指令行程式, 它們是幫助您為您想要的每個數據集建立 XML 的工具ERDDAP™服侍。 一旦你建立ERDDAP™运行它 (至少一次) 您可以在 *湯姆卡* /webapps/erddap/WEB-INF目錄. 有 Linux/ Unix  shell 文稿 (与延伸.sh) 和 Windows 文稿 (與延伸.bat) 。\\[在 Linux 上, 以相同的使用者來執行這些工具 (湯姆卡特?) 那會是湯姆卡特的運作\\]當你執行每個項目,它會問你問題。 每一個問題, 輸入回覆, 然后按 Enter 。 或者按 ^C 以退出程式 。

#### 程序不跑?{#program-wont-run} 

* 如果您得到未知的程序 (或类似) 錯誤訊息, 問題可能是操作系統找不到Java. 你需要知道在哪里Java在您的電腦上, 然后編輯您要使用的 . bat 或 .sh 檔案中的 java 參考 。
* 如果您得到一個沒有找到的罐子檔案或類別找不到錯誤訊息, 那么Java找不到您要使用的 . bat 或 .sh 檔案中列出的課程 。 解決辦法是找出 . jar 檔案的位置,
* 如果你正在使用版本Java對程式來說太老了,程式不會執行,你會看到一個錯誤訊息
線中的例外 java. lang。 未支援的 ClassVersion Error :
     *部分/ 类/ 名稱* : 不支援的主要. minor 版本 *數字*   
解決辦法是更新最新版本Java確保程式的 .sh 或 .bat 檔案正在使用它 。

#### 這些工具會印出各种診斷訊息:{#the-tools-print-various-diagnostic-messages} 

* 使用「 錯誤」 一词, 雖然犯錯很煩人,
* 但程序得以完成。 這些很稀有
* 其他的只是信息 您可以加入 &- 動詞到[產生 DatasetsXml](#generatedatasetsxml)或[達斯Dds](#dasdds)命令行以取得其他信息訊息, 這有時有助于解決問題 。

這兩件工具很有幫助 但你還是得小心翼翼地讀讀這些指示 自己做出重要的決定

### 產生 DatasetsXml{#generatedatasetsxml} 
*    **產生 DatasetsXml** 是一個命令行程式, 它可以為幾乎任何類型的數據集產生一個簡略的數據集 XML 草稿 。
    
我們強烈建議你用"造物主" Xml 而不是建立區塊datasets.xml因:
    
    * 產生達塔斯 Xml工作在秒。 即使你知道自己在做什麼 手工做這至少是一個小時的工作
    * 產生達塔斯 Xml做得更好 手動操作需要大量了解ERDDAP™工作。 你不可能用手做更好的工作 (鮑勃·西蒙斯總是使用產生代碼 他寫了ERDDAP.) 
    * 產生達塔斯 Xml 總是產生有效的區塊datasets.xml. 任何區塊datasets.xml您寫作的錯誤可能至少會有幾項防止ERDDAP™從載入數據集。 人們常常需要數小時才能判斷這些問題。 別浪費時間 讓產生 數據集 努力工作 如果你愿意,你可以手工提炼.xml。
    
當您使用產生代碼時 Xml 程式 :
    
    * 在 Windows 上, 當您第一次執行 GenerateDatasetsXml 時, 您需要用文字編輯器編輯 GenerateDatasetsXml. bat 檔案, 以改變 java 的路徑 。 exe 檔案以便 Windows 找到Java.
    * 產生達塔斯 Xml 先要求您指定 EDDType (Erd Dap 資料集 類型) 中。 看[數據集類型列表](#list-of-types-datasets)  (此文件) 以找出适合您正在研究的數據集的類型 。 除了普通的EDDTYPS外,[特殊/ Pseudo 資料集類型](#specialpseudo-dataset-types)  (例如,爬行THREDDS目錄以產生大量datasets.xml用于目錄中的每個數據集) .
    * 產生達塔斯 Xml 然后問你一系列與EDDType相關的問題 收集所需信息ERDDAP™以存取数据集的來源。 要明白什么ERDDAP™的 EDDType 檔案。[數據集類型列表](#list-of-types-datasets).
        
如果您需要輸入有特殊字元的字串 (例如,初端或末端的空白字符,非 ASCII 字符) 插入[JSON 樣式字串](https://www.json.org/json-en.html)  (用\\ 字符逃出的特殊字符) . 例如,只輸入一個分頁字元, 請輸入「\\ t 」 (與周圍的雙引號一起), 它會顯示ERDDAP™這是JSON式的弦
        
    * 通常,你的答案之一 不會是Generate DatasetsXml需要的。 你可以再試一次, 重新回答問題, 直到生成達塔塞斯 Xml 可以成功找到和理解源資料 。
    * 如果你回答正确 (或完全正确) 生成達塔斯 Xml 將會連接至數據集的來源並收集基本資訊 (例如,變數名稱和中繼資料) .
用于本地端的數據集NetCDF .nc和相關檔案, 產生 Datasets Xml 會在檔案第一次讀取後, 列印檔案的類似 ncdump 的結構 。 這可能會提供資訊, 讓您在之後的回路中更好的回答問題。 GenerateDatasetsXml 。
    * 產生達塔斯 Xml 將會產生該数据集的資料集 XML 的粗略草稿 。
    * 診斷資訊和數據集 XML 的粗略草稿將寫入 *大家长會* /logs/GenerateDatasetsXml.log.
    * 數據集 XML 的粗略草稿將寫入 *大家长會* / logs/ Generate DatasetsXml.
#### "0文件" 錯誤訊息{#0-files-error-message} 
如果你執行產生達泰斯 Xml 或[達斯Dds](#dasdds)或者如果你試著加載EDDGrid來自... 檔案資料集ERDDAP™,您會收到"0檔案"的錯誤訊息,表示ERDDAP™在目錄中找到 0 匹配的檔案 (當你認為目錄中有匹配的檔案時) :
* 請檢查您是否指定了目錄的全名 。 如果您指定了樣本檔名, 請確定您指定了檔案的全名, 包括完整目錄名稱 。
* 請檢查檔案是否真的在目錄中 。
* 請檢查目錄名稱的拼寫 。
* 檢查檔案Name Regex 。 真的,真的很容易犯錯 為了試驗目的, 試試所有檔案的 regex 。 (看這個[regex 文件](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)和[regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
* 檢查執行程式的使用者 (例如,使用者=Tomcat (?) 托姆卡特/ERDDAP) 已讀取檔案的權限 。
* 在一些操作系統中 (例如, SELinux) 依據系統設定, 執行此程式的使用者必須有「 讀取」 的權限, 才能將目錄連結到有檔案的目錄 。


* 如果你有你無法解決的問題[要求支援](/docs/intro#support)有尽可能多的信息。 類似地,如果它似乎適當的 EDDType 對給定的數據集不起作用, 或者沒有適當的 EDDType, 請檔案 。[在 GitHub 上發表](https://github.com/ERDDAP/erddap/issues)內容 (和樣本檔( 如果相關)) .
         
#### 您需要編輯 GenerateDatasets 的輸出 使它更好。{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* 女士:
琴datasets.xml產生代碼 Xml不完美。 在公開使用前,你必須讀和剪除XMLERDDAP. 產生達塔斯 Xml Relis on a lot -OF -THUMB的很多規定, 總是不正確的。 你對确保你所愛的XML 的不公有責任ERDDAP'Sdatasets.xml法利。
    
     (趣事:我不是大喊大叫. 因為歷史上的法律原因 免责書必須寫在所有的封面上) 
    
GenerateDatasetsXml 的輸出是粗略的草稿 。
您幾乎總是需要編輯它 。
我們已經做了,而且繼續做了巨大的努力 盡可能使輸出做好了準備 但有限度的 通常,根本找不到來源中繼資料。
    
一個根本的問題是 我們在要求電腦程序 (產生 DatasetsXml) 如果你把同樣的任務給了100人 你會得到100個不同的結果 沒有一個"正确"的答案 顯然,這個程序最接近于讀 Bob的心思 (不是你的) 但即使如此,這也不是一個全體理解的AI程序, 只是一堆heuristics拼凑在一起來完成一個AI類似的工作. (一個全體理解的AI程式的那一天可能會到來,但還沒有. 如果有的話 我們人類可能有更大的問題 當心你的願望) 
    
* 以資訊為目的, 輸出顯示全局源屬性與變數源屬性為註解 。ERDDAP™合并來源屬性與addAttributes  (优先) 混合 顯示給使用者的屬性 。 (其他屬性自動加入經度、經度、高度、深度和時間變數ERDDAP™實際上使數據集) .
     
* 如果您不喜歡來源屬性, 請加入一個同名的附加屬性來覆寫它 。 (或者沒有值, 如果您要移除它) .
     
* 全部addAttributes是電腦產生的建議 。 編輯他們&#33; 如果你不喜歡增加屬性 就改一下
     
* 如果你想加入其它addAttributes加入
     
* 如果你想改變destinationName改一下 但不要改變sourceNames.
     
* 你可以改變秩序dataVariables或移除其中任何一個。


    * 你可以使用[達斯Dds](#dasdds)  (见下文) 以重試 XML 的數據集, 以确保產生的數據集以您想要的顯示方式出現ERDDAP.
    * 可以做小的改變datasets.xml例如,生成的區塊提供更好的infoUrl或标题。
#### 不添加標準名稱{#donotaddstandardnames} 
如果您在執行產生時將 \\- doNoteAddStandard Names 作为命令行參數 數據集 Xml, 產生 數據集 Xml 不會新增standard\\_name至addAttributes除已命名為經度、高度、深度或時間的變數外, (明顯的standard\\_names) . 如果您使用產生的輸出, 這可能有用 數據集 直接在 Xml 中ERDDAP™不編輯輸出, 因為產生 數據集 Xml 常猜standard\\_name不對 (注意,我們總是建議您先編輯輸出後再用到ERDDAP.) 使用此參數會有其他次要的相關效果, 因為猜測standard\\_name通常用于其他目的,例如:long\\_name,並建立色彩列設定值。
#### 文稿{#scripting} 
可以提供命令行參數, 回答所有問題以產生一個數據集。 產生達塔斯 Xml 會處理這些參數, 將輸出寫入輸出檔, 並退出程式 。
        
要設定此項目, 請先以互動模式使用程式並寫入您的答案 。 以下是部分例子:
不如你來執行劇本吧...
然後輸入: EDD Table From AsiiFiles 的 EDD Table 檔案
然后輸入 : /u00/ data/
加入:
然後輸入:/u00/data/sampleFile.asc
然后輸入: ISO- 8859-1
        
要以非交互方式執行, 請使用此命令行 :
. / Generate DatasetsXml.sh 由 Ascii Files /u00/data/. \\*\\.asc /u00/data/sampleFile.asc ISO-8859-1
所以基本上 你只要列出命令線上的所有答案
這對經常變更的數據集有用, 需要重新執行 GenerateDatasets Xml 命令 (显著EDDGrid從 ThreddsCatalog 中) .
        
細節 :

* 如果參數包含空間或某些特殊字元,則將參數編碼為[JSON 樣式字串](https://www.json.org/json-en.html),例如,“我的參數有空格和兩個\\n行。
* 如果您要指定一個空字串為參數, 請使用: nothing
* 如果您要指定參數的預設值, 請使用: 預設值
             
* 產生達塔斯 Xml 支持 a -i *数据集 Xml Name* # *標籤Name* 將輸出插入到指定的命令行參數datasets.xml文件 (預設值是 *湯姆卡* /内容/erddap/datasets.xml) . 產生達塔斯 Xml 在數據集中尋找兩行 Xml Name:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
和
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
用新內容取代這些行之間的所有東西, 並改變一些日期。
* -i 切換只是處理 (更改datasets.xml只制作) 如果你執行產生達泰斯 Xml 有命令行參數, 指定所有問題的答案 。 (上面有"文稿")   (想法是: 此參數與文稿一起使用 。 如果您以互動模式使用此程式 (在鍵盤上輸入信息) ,您很可能會產生一些不正確的 XML 區塊,然后才能產生您想要的 。) 
* 如果找不到 Begin 和 End 的行, 那么這些行和新內容就在前面插入&lt;/erdapDatasets&gt;.
* 還有... 我... (首都一) 切換以試驗目的與 -i 相同, 但會建立一個叫做檔案datasets.xml *日期* 不做改變datasets.xml.
* 不要執行生成達泰斯 Xml 和 -i 一起分兩個行程 。 可能只保留一組變更 可能會有嚴重的麻煩 (例如, 檔案已損毀) .
    
如果你用「 Generate DatasetsXml - 動詞」 , 它會比通常的更打印批判性訊息 。
    
#### 特殊/ Pseudo 資料集類型{#specialpseudo-dataset-types} 
泛泛的 EDDtype 選項 此文件描述的 EDD 型態的 Xml 匹配 (看[數據集類型列表](#list-of-types-datasets)) 生成一datasets.xml從一個特定資料來源建立一個数据集的區塊 。 有一些例外和特殊情况:
    
##### EDDGrid來自 Erddap{#eddgridfromerddap} 
此 EDDType 產生所有datasets.xml需要做的區塊[EDDGrid來自 Erddap](#eddfromerddap)所有資料集EDDGrid遠端的數據集ERDDAP. 你可以保留原版datasetIDs (可能重复一些datasetID已經在您的ERDDAP) 或生成新名稱 (但通常不是人能看懂的) .
     
##### EDD 表格來自 Erddap{#eddtablefromerddap} 
此 EDDType 產生所有datasets.xml需要做的區塊[EDD 表格來自 Erddap](#eddfromerddap)遠端 EDDTable 資料集中的數據集ERDDAP. 你可以保留原版datasetIDs (可能重复一些datasetID已經在您的ERDDAP) 或生成新名稱 (但通常不是人能看懂的) .
     
##### EDDGrid從 ThreddsCatalog 中{#eddgridfromthreddscatalog} 
此 EDDType 產生所有datasets.xml全部需要的區塊[EDDGrid從 Dap 中](#eddgridfromdap)通过 THREDDS 遞迴爬行可以找到的數據集 (子) 目录. THREDDS 編目網址有很多形式。 此選項需要一個带有/ catalog/ 的 THREDDS . xml 網址, 例如 ,
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xml 或
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml   
(相關的.html目錄在
 https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html ,不能接受EDDGrid來自 ThreddsCatalog 。
如果你有問題EDDGrid從垃圾 星表 :
* 確保您使用的 URL 是有效的, 包括 / catalog/, 並以 / catalog. xml 結束 。
* 如果可能, 使用公共IP地址 (例如, https://oceanwatch.pfeg.noaa.gov ) 在 URL 中,不是本地的 IP 位址 (例如, https://12.34.56.78 ) . 如果 THREDDS 只能通过本地數位 IP 地址存取, 您可以使用 [&lt;轉換到 Public SourceUrl &gt; ] (#轉換到公用源碼器) 所以ERDDAP™使用者可以看到公共地址, 即使ERDDAP™得到本地數據位址的資料 。
* 如果你有你無法解決的問題[檢查排除故障提示](#troubleshooting-tips).
* 低等代碼現在使用UnidataNetcdf- java 編目爬行程式碼 (鞭打 目錄類別) 讓它能處理所有的 THREDDS 目錄 (可能很複雜) 多虧了Unidata密碼
         
##### EDDGrid來自 ErddapCatalog 的 LonPM180{#eddgridlonpm180fromerddapcatalog} 
此 EDDType 產生datasets.xml要制作[EDDGrid龍PM180](#eddgridlonpm180)所有資料集EDDGrid數據集ERDDAP其經度值大于180。
* 如果可能, 使用公共IP地址 (例如, https://oceanwatch.pfeg.noaa.gov ) 在 URL 中,不是本地的 IP 位址 (例如, https://12.34.56.78 ) . 如果ERDDAP™只能透過本地數字 IP 位址存取, 您可以使用 [&lt;轉換到 Public SourceUrl &gt; ] (#轉換到公用源碼器) 所以ERDDAP™使用者可以看到公共地址, 即使ERDDAP™得到本地數據位址的資料 。
         
##### EDDGrid來自 ErddapCatalog 的 Lon0360{#eddgridlon0360fromerddapcatalog} 
此 EDDType 產生datasets.xml要制作[EDDGrid朗0360](#eddgridlon0360)所有資料集EDDGrid數據集ERDDAP其經度值小于 0。
* 如果可能, 使用公共IP地址 (例如, https://oceanwatch.pfeg.noaa.gov ) 在 URL 中,不是本地的 IP 位址 (例如, https://12.34.56.78 ) . 如果ERDDAP™只能透過本地數字 IP 位址存取, 您可以使用 [&lt;轉換到 Public SourceUrl &gt; ] (#轉換到公用源碼器) 所以ERDDAP™使用者可以看到公共地址, 即使ERDDAP™得到本地數據位址的資料 。
         
##### 檔案中的 EDDs{#eddsfromfiles} 
根據一個啟動目錄, 這會穿過目錄和所有子目錄, 並試著為它找到的每组資料檔案建立數據集 。
* 這假設當找到數據集時, 數據集包含所有的子目 。
* 如果找到數據集, 相似的兄弟姐妹目錄會被視為单独的數據集 (例如, 1990年代、 2000年代、 2010年代的目錄會產生不同的數據集) . 它們應該很容易用手結合 - 只需要改變第一數據集的&lt;檔案 Dir &gt; 到父目錄, 並刪除所有之後的兄弟姐妹數據集 。
* 這只會試著產生一塊datasets.xml在目錄中最常用的檔案延伸型態 (不計數 . md5, 已忽略) . 所以,給一個有十個的目錄.nc檔案與 5 .txt 檔案,將產生數據集.nc只有文件。
* 這假設一個目錄中所有與扩展名相同的檔案都屬於同一數據集 。 如果目錄有一些.nc包含 SST 資料和一些檔案.nc含有叶绿素數據的檔案,只有一個樣本.nc檔案將被讀取 (史蒂夫? 叶绿素?) 只會為此類型的檔案建立一個資料集 。 這套數據可能無法載入, 因為要將兩種檔案載入同一套數據會有複雜的問題 。
* 如果一個目錄中最常用的延伸檔數不足4個, 這會假設它們不是數據檔, 只是跳過目錄 。
* 如果目錄中有 4 個或更多檔案, 但此檔案無法成功產生 。datasets.xml檔案 (例如,不支援的檔案類型) ,會產生[檔案名稱中的 EDD 表格](#eddtablefromfilenames)檔案的數據集。
* 最後的診斷 寫到紀錄檔,就在之前datasets.xml區塊, 這會列印一個表格, 上面有所有子目錄的資訊摘要 。 表格會列出每個子目錄, 并指示最常用的檔案延伸檔類型、 檔案總數以及這些檔案的資料集類型 (如果有) . 如果您面對複雜而深嵌的檔案結構, 請考慮執行 GenerateDatasets 使用 EDDType=EDDsFromFiles 產生此資訊的 Xml,
* 這項選項可能無法為特定數據檔案猜測最好的 EDDType , 但是它很快速、容易, 值得一試 。 如果來源檔案適合,它效果良好,是產生此檔案的第一步。datasets.xml一個有許多子目錄的檔案系統, 每個子目錄都有不同數據集的資料檔。
         
##### EML 和 EMLBatch 的 EDD 表格{#eddtablefromeml-and-eddtablefromemlbatch} 
這些特殊的 EDDType 產生datasets.xml制作[Ascii 檔案中的 EDD 表格](#eddtablefromasciifiles)a 描述的每個表格的數據集[生态元数据語言](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML 檔案 。 “ 批量” 變體工作於本地目錄或遠端目錄中的所有 EML 檔案 。 請看單位[EML 中的 EDD Table 文件](/docs/server-admin/EDDTableFromEML).
     
##### 端口的 EDD 表格{#eddtablefrominport} 
這個特殊的 EDDType 產生datasets.xml制作[Ascii 檔案中的 EDD 表格](#eddtablefromasciifiles)從資訊中的數據集[插入- xml](https://inport.nmfs.noaa.gov/inport)文件。 如果您能存取來源資料檔 (Inport-xml 檔案應該有線索找到它的位置) 您可以在ERDDAP.

以下階段概要描述如何使用 GenerateDataset 要取得工作數據集, Xml 使用 port- xml 檔案ERDDAP.

1. 一旦您可以存取 import- xml 檔案 (或作為網址或本地端檔案) : 執行產生達泰斯 Xml, 指定 EDDType = EDDTable From InPort, 指定 port- xml URL 或全檔名, 指定哪個 Child=0, 指定要求的其他資訊 (如果知道) . (此刻, 您不需要有來源資料檔或指定其名稱 。) 小孩=0 的設定顯示產生達泰斯 Xml 寫入資訊 **全部** 主席&lt;屬性- 資訊 &gt;&lt;實體 &gt; 在 port- xml 檔案中 (如果有) . 也印出背景資訊摘要,
2. 看看所有的信息 (包括生成 Datasets 的背景信息 Xml 打印) 查看下載的 URL (s) 要尋找來源資料檔 (s) . 如果你能找到它 (他們) 下載 (他們) 進入可以存取的目錄ERDDAP. (如果您找不到任何來源資料檔, 程序沒有意義 。) 
3. 執行產生 數據集 又是XML
如果來源資料檔案符合 lnport- xml 檔案中的一個&lt;屬性- 資訊 &gt;&lt;實體&gt;,指定哪個Child= *实体的數字*   (例如,1,2,3...) .ERDDAP™將試圖將來源資料檔中的列名與實體資訊中的名字相匹配, 并迅速接受/ 拒絕/ 修正任何不符的地方 。
或者 如果進口文件沒有&lt;屬性- 資訊 &gt;&lt;實體&gt;,指定是哪一個Child=0.
4. 在一塊datasets.xml由 GenerateDatasets 製作 Xml 修改 [全球&lt;addAttributes&gt;] (全球屬性) 需要/需要。
5. 在一塊datasets.xml由 Generate DatasetsXml 制成,加入/重覆 [&lt;dataVariable&gt;] (可數據變化) 需要/希望描述每一變數的信息。 請確認每個變數是否正確
[&lt;sourceName&gt;] (# 源碼名稱)   (根據來源) ,
[&lt;destinationName&gt;] (目的地名)   (它比起sourceName) ,
[&lt;單位 &gt;] (單位)   (特别是如果它是[時間或時間戳變數](#timestamp-variables)單位需要指定格式的地方) 和
[&lt;missing\\_value&gt;] (缺少值) ,
6. 當你接近完成的時候, 重复使用[達斯Dds](#dasdds)工具以快速查看數據集描述是否合法, 以及數據集是否會出現在ERDDAP™如你所愿
     

如果使用 InPort 記錄其數據集的群組也會使用的話,那就太好了 。ERDDAP™提供实际数据:

*   ERDDAP™是現在可以用到的解決方法 這樣你就能完成NOAA是[公众获取研究成果 (批次) 所需经费](https://nosc.noaa.gov/EDMC/PD.DSP.php)現在,不是在某個模糊的時刻 在未來。
*   ERDDAP™提供使用者的實際資料, (沒有資料的元数据有什麼用?) 
*   ERDDAP™支援中繼資料 (尤其是變數的單位) ,與其它數據伺服器軟體不同。 (沒有中繼資料有什麼用?) 使用不支持中繼資料的軟體,
*   ERDDAP™是自由且開源的軟體, 目前ERDDAP™已經付了錢。 支持ERDDAP™使用者是自由的。
*   ERDDAP外表可以輕易地定制來反射和突出您的群組 (不是ERD或ERDDAP) .
*   ERDDAP™以一致的方式存取所有數據集。
*   ERDDAP™能夠從很多類型的資料檔和關係資料庫讀取資料。
*   ERDDAP™可以處理大數據集,包括很多數據檔中有來源資料的數據集.
*   ERDDAP™在使用者的要求下,可以將資料寫入很多類型的資料檔,包括科學資料檔類型,如NetCDF,ESRI.csv,以及ODV .txt.
*   ERDDAP™根據使用者的规格,
*   ERDDAP™可以處理非數據數據集, 如影像、影像或音效檔案的集合。
*   ERDDAP™已安裝和使用於[全世界60多家机构](/#who-uses-erddap).
*   ERDDAP™被列出為建議在NOAA在[NOAA資料存取程序指令](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)與其他軟體不同
*   ERDDAP™是NMFS/NOAA因此在內部使用NMFS和NOAA應該是值得驕傲的一點NMFS和NOAA.

請給我ERDDAP™試一下 如果您需要幫助,請在ERDDAP™谷歌集團.
     
##### 新增 FillVale 屬性{#addfillvalueattributes} 
這個特殊的 EDDType 選項不是數據集類型 。 它可以將 QQFillValue 屬性加入到一些數據集中 。 看[新增 FillVale 屬性](#add-_fillvalue-attributes).
     
##### 尋找重复 時間{#findduplicatetime} 
這個特殊的 EDDType 選項不是數據集類型 。 相反,它告訴生成達泰斯 要搜尋的 Xml 通訊錄.nc  (相关) 要尋找和打印有重复時間值的檔案清單的檔案。 當它看到時間值時, 它會將它們從原始單位轉換成"seconds since 1970-01-01"如果不同的檔案使用不同的單位字符串。 您需要提供起始目錄 (隨後的刀片) ,檔案名稱正規表示式 (例如 . ..nc ) ,以及檔案中時間變數的名称。
     
##### 弧度{#ncdump} 
這個特殊的 EDDType 選項不是數據集類型 。 相反,它告訴生成達泰斯 要打印的 Xml[弧度](https://linux.die.net/man/1/ncdump)類似印出.nc,.ncML,或.hdf文件。 實際上,它用的是 netcdf -java的[NCdump 中](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html),它比NCdump的C版本更有限。 如果您使用此選項, GenerateDatasetsXml 會要求您使用其中一個選項 : "- h" (信頭) ,"-c" (坐标 vars) "... " (預設) ,"-v var1;var2","-v var1" (0,0:10,0:20) ". 這是有用的,因為沒有了cdump 它很難知道是什麼在一個.nc,.ncML,或.hdf您要為 GenerateDataset 指定哪個 EDType 檔案 XML 。 為了.ncml 檔, 此檔案會列印 nucdump 輸出結果.nc套用到底部的 ml 文件變更.nc或.hdf文件。
         
### 達斯Dds{#dasdds} 
*   [ **達斯Dds** ](#dasdds)是您在 XML 中建立新數據集的首次試驗後可以使用的指令行程式 。datasets.xml. 用 DasDds 可以反复測試和完善 XML 。 當您使用 DasDds 程式時 :
    1. 在 Windows 上, 您第一次執行 DasDds 時需要編輯 DasDds 。 使用文字編輯器的 bat 檔來改變路徑到 java 。 exe 檔案以便 Windows 找到Java.
    2. DasDds要你datasetID您正在工作的數據集 。
    3. DasDds 試著用它建立數據集datasetID.
        * DasDds總是打印很多的診斷訊息.
如果您使用「 DasDds - 動詞 」 , DasDds 會比往常打印更多的診斷訊息 。
        * 為安全起见, DasDds 總是刪除所有快取的數據集資訊 (文件) 用于建立數據集。 這相当于設定[硬旗](/docs/server-admin/additional-information#hard-flag)因此, 对于總合數據集, 您可能要暫時調整檔案NameRegex 以限制數據建構器找到的檔案數量 。
        * 如果數據集無法載入 (不管原因如何) , DasDds 將會停止並顯示它找到的第一個錯誤的錯誤訊息 。
             **不要試著猜出問題是什麼 仔细讀取錯誤訊息 。**   
如果有必要, 讀取前面的診斷訊息,
        *    **更改數據集的 XML 以試圖解決問題**   
讓 DasDds 重新建立數據集 。
        *    **如果你再三解決每個問題 你終究會解決所有的問題**   
而數據集會載入。
    4. 所有 DasDds 輸出 (诊断和成果) 寫入螢幕與 *大家长會* /日志/DasDds.log.
    5. 如果 DasDds 能 建立數據集, DasDds 就會顯示[.das (資料集屬性結構) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das),[.dds (數據集描述程式 结构) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds)和[. timeGaps (時空) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)您屏幕上的數據集的資訊, 並寫入到 *大家长會* /日志/ DasDds. out.
    6. 通常您會想要對數據集的 XML 做一些小的變更, 以清理數據集的中繼資料, 重新執行 DasDds 。

### 獎金 第三方工具 :ERDDAP-林特{#bonus-third-party-tool-erddap-lint} 
ERDDAP-林特是愛爾蘭海洋研究所的羅布·富勒和亞當·萊德比特的一個程序 你可以用它來改善你的中繼資料ERDDAP™數據集。ERDDAP-林特"包含一些規則和一個簡單的靜态網絡應用程式,以對付您ERDDAP™伺服器。 所有測試都在網絡瀏覽器中進行". 就像[Unix/ Linux 林特工具](https://en.wikipedia.org/wiki/Lint_(software)),可以編輯已有的規則或新增規則。 看[ERDDAP-林特](https://github.com/IrishMarineInstitute/erddap-lint)更多信息。

此工具對您之前建立過的數據集尤其有用, 現在要更新您目前的元数据偏好 。 例如, GenerateDatasets 的早期版本 Xml 沒有用任何努力建立全球creator\\_name,creator\\_email,建立者型態,或creator\\_url元数据。 你可以用ERDDAP-林特來辨識那些缺乏元数据屬性的數據集。

多虧了羅布和亞當 創造了這個工具 并把它提供给ERDDAP™社区。
 
## 基本结构datasets.xml文件{#the-basic-structure-of-the-datasetsxml-file} 
在 a 中需要的和可選擇的標籤datasets.xml文件 (及其可能出現的次数) 注 實際上 你的datasets.xml會有很多&lt;數據集&gt; 的標籤, 只使用其他標籤&lt;需要的話 。

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

但目前只建議ISO-8859-1。
 
### 包含{#xinclude} 
2.25版本中的新版本是支持 X Include 。 這需要您使用 SAX 解析器&lt;使用 SaxPaerser &gt; true&lt;在您的設定中使用 SaxParser &gt;. xml 。 這可以讓您在自己的檔案中寫入每個數據集, 然后全部包含在主檔中datasets.xml,重用數據集定義的部份,或兼用。 如果你想看看例子[EDD TestiewDataset.java 電子郵件](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java)建立 X 插入重用變數定義 。
 

- - –

## 注{#notes} 

与datasets.xml文件是非三角工程。 請仔細讀讀這些筆記 你先挑一個[數據集類型](#list-of-types-datasets)請仔細讀一下
     
### 選擇數據集類型{#choosing-the-dataset-type} 
大多數情况下,只有一個ERDDAP™适合指定資料來源的數據集類型。 有的 (例如,.nc文件) 有一些可能性 但通常其中之一絕對是最好的 您必須做的第一個也是最大的決定是: 將數據集視為多维陣列群組是否合适 。 (如果看到[EDDGrid數據集類型](#eddgrid)) 或作為類似資料庫的資料表 (如果看到[EDD Table 資料集類型](#eddtable)) .
     
### 使用此資料{#serving-the-data-as-is} 
通常不需要修改資料來源 (例如, 將檔案轉換成其他檔案類型) 所以ERDDAP™可以服侍它。 假設之一:ERDDAP™表示此資料來源將被使用 。 通常這樣很好 有些例外是:
* 相關數據庫與卡珊德拉 --ERDDAP™可以直接從相關數據庫和卡珊德拉提供資料。 但對於安全性,載入平衡性,以及性能問題,您可以選擇用相同的資料建立另一個數據庫,或者儲存資料到NetCDFv3.nc文件和有ERDDAP™提供新資料來源的資料。 看[數據庫中的 EDD 表格](#eddtablefromdatabase)和[來自卡桑德拉的EDD表](#eddtablefromcassandra).
* 不支援資料來源...ERDDAP™可以支持大量類型的數據來源, 但世界充滿了1000's (百万?) 不同資料來源 (特别是資料檔結構) . 如果ERDDAP™不支援您的資料來源 :
    * 如果資料來源是NetCDF .nc文件,你可以使用[NcML](#ncml-files)修改在飛行上或使用的資料檔[NCO](#netcdf-operators-nco)以永久修改資料檔。
    * 您可以將資料寫入資料來源類型ERDDAP™支持。NetCDF-3.nc檔案是很好的,一般的建議, 因為它們是二進制檔案ERDDAP™讀得很快 表格數據中,.nc使用[CF 分解采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)相連的 ragged 數據結構, 所以可以處理ERDDAP是[来自 NcCFF 的 EDD 表格](#eddtablefromnccffiles)). 如果它們有理有理 (每個都有數量的數據) ,ERDDAP™可以很快地從它們中提取資料。
    * 您可以要求新增此資料來源的支援ERDDAP™發郵件給克里斯 約翰在Noaa.gov。
    * 您可以用寫入代碼來新增對此資料來源的支持 。 看[该ERDDAP™程式指南](/docs/contributing/programmer-guide)
* 速度 -ERDDAP™可以比其他資料來源更快地讀取資料。 例如,讀取NetCDFv3.nc檔案速度快, 讀取 ASCII 文件速度慢 。 如果有大 (&gt; 1 000) 或大 (&gt; 10,000) 來源數據檔數量 ,ERDDAP™會慢慢回應一些數據要求。 通常,這一點對人類來說并不明显。 但是,如果你覺得ERDDAP™您可以選擇將資料寫入更有效率的設定以解決問題 。 (通常:NetCDFv3.nc文件) . 表格数据,参见[此建議](#millions-of-files).
         
### 提示{#hint} 
在 dataset. xml 中提供工作數據集描述的副本, 然后再修改, 通常更容易產生 XML 。
    
### 編碼特殊字元{#encoding-special-characters} 
自datasets.xml是 XML 檔案, 您必須[編碼( E)](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML)","&lt;",以及任何內容中的"&gt;",如"和amp;","&lt;"和"gt;".
錯 :&lt;標題 &gt; 時碼( T)&lt;(字幕)
右 :&lt;標題 &gt; 時間( P) :&lt;(字幕)
     
### XML 無法容忍語法錯誤{#xml-doesnt-tolerate-syntax-errors} 
在您編輯 dataset.xml 檔案後, 確認結果是[成型好的 XML](https://www.w3schools.com/xml/xml_dtd.asp)將 XML 文字貼上 XML 檢查器[xml 驗證](https://www.xmlvalidation.com/).
     
### 排除問題提示{#troubleshooting-tips} 
*    **分析數據集問題的其他方法**   
除了兩大[工具](#tools),
    *   [log.txt](/docs/server-admin/additional-information#log)是所有檔案的日志檔ERDDAP诊断信息
    * 其[每日報告](/docs/server-admin/additional-information#daily-report)拥有比狀態頁面更多的資訊, 包括未載入的數據集清單和例外 (錯誤) 它們產生了
    * 其[狀態](/docs/server-admin/additional-information#status-page)這是一個快速檢查的方法ERDDAP任何網頁瀏覽器的狀態 。 它包括未載入的數據集清單 (但不相關例外) 和工作串行數據 (顯示[EDDGrid复制](#eddgridcopy)和[EDD 表格](#eddtablecopy)數據集與任何[EDDGrid從檔案](#eddgridfromfiles)或[檔案中的 EDD 表格](#eddtablefromfiles)使用數據集[來自Url 的快取](#cachefromurl)  (但不是快取 大小GB) ) .
    * 如果你卡住了,看我們的[部分](/docs/intro#support).
         
### 特殊變數{#special-variables} 
*    **[經度 纬度 高度 (深度) 時間 (法律) 變數](#destinationname) [destinationName](#destinationname)s是特殊的。** 
    * 一般:
        * LLAT 變數為ERDDAP™如果轴變數是 (用于EDDGrid数据集) 或數據變數 (EDD Table 数据集)  [destinationName](#destinationname)是"經度","纬度","高度","深度",或"time".
        * 我們強烈鼓勵您在可能時使用這些變數的標準名稱。 不需要任何人。 如果你不使用這些特殊的變數名稱,ERDDAP™不會認出他們的重要性 例如, LLAT 變數由 Make A Graph 特別處理 ( *datasetID* 圖片) : 如果 X 轴變數是「 經度 」 , Y 轴變數是「 經度 」 , 您會得到地圖 (使用標準投影,) 而不是圖
        *   ERDDAP™將自動新增很多中繼資料到 LLAT 變數 (例如, "[ioos\\_category](#ioos_category)", "[單位](#units), 以及一些與標準相關的屬性, 如「 坐标轴式 」) .
        *   ERDDAP™會在飛行中自動新增許多與所選取的資料子集的 LLAT 值相關的全局元数据 (比方說「地理空间」) .
        * 支持這些元数据標準的客戶端將能夠利用新增的元数据以時空定位資料 。
        * 客戶端會更容易產生包含 LLAT 變數的查詢, 因為所有相關數據集中變數的名稱都一樣 。
    * 對"經度"變數和"纬度"變數:
        * 使用[destinationName](#destinationname)只有經度和經度[單位](#units)是東度和北度 如果您的資料不符合這些要求, 請使用不同的變數名稱 (例如, x, y, 隆拉迪安人, 拉特拉迪安人) .
        * 如果您有經度和經度數據, 以不同的單位表示, 因而也用不同的單位表示destinationNames, 例如: LonRadians 和 latRadians, Make A Graph 等 ( *datasetID* 圖片) 會做圖 (例如,時序) 而不是地圖
    * 高度變數和深度變數:
        * 使用[destinationName](#destinationname)辨識數據海拔高度的高度 (正="上"值) . 可選擇的是,如果海平面以下的值是負值(或者如果你使用,例如,
[&lt;姓名="scale\\_factor"type="int" &gt; - 1&lt;/att &gt;] (# 大小(_F)) 將深度值轉換成高度值。
        * 使用destinationName"深度"以辨明數據在海平面以下的距离 (正="下"值) .
        * 數據集可能沒有"高度"和"深度"變數 。
        * 对于這些變數名稱,[單位](#units)一定是"m","meter"或"meters"。 如果單位不同 (例如, fathoms) 您可以使用
[&lt;姓名="scale\\_factor" &gt; *一些 值* &lt;/att &gt;] (# 大小(_F)) 并 [&lt;atname=“ 單位” &gt; 公尺&lt;/att &gt;] (單位) 將單位轉換成米。
        * 如果您的數據不符合這些要求, 請用不同的destinationName  (例如,在Ground, 距离之上 到Bottom) .
        * 如果您知道垂直的 CRS 請在中繼資料中指定, 例如, "EPSG: 5829" (海平面上瞬時高度) "EPSG:5831" (海平面以下瞬时深度) ,或"EPSG:5703" (NAVD88高度) .
    * 為了"time"變數 :
        * 使用[destinationName](#destinationname) "time"只對包含整個日期+時間的變數 (或者日期,如果只有這些的話) . 例如, 如果日期和時間有不同的列, 不要使用變數名稱"time".
        * 看[單位](#time-units)需要更多關於時間和時序變數的單位屬性資訊。
        * 時間變數與相關[時間 印表變數](#timestamp-variables)獨一無二, 因為它們總是從來源的時間格式轉換數據值 (不管是什么) 轉成數值 (自1970-01-01T00:00Z起的秒) 字符串值 (ISO 8601:2004 (英) 格式) 依情況而定
        * 當使用者要求時間數據時, 可以指定時間為數值來要求它 。 (自1970-01-01T00:00Z起的秒) 字符串值 (ISO 8601:2004 (英) 格式) .
        *   ERDDAP™有用於[轉換數字 時間到/ 從字符串時間](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
        * 看[怎么ERDDAP處理時間](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
            
### 為什麼只有兩個基本數據結構?{#why-just-two-basic-data-structures} 
* 由于人類客戶和電腦客戶 很難處理一套複雜的數據集結構ERDDAP™使用兩個基本的數據結構:
    * a[网格化資料結構](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)  (例如,卫星数据和模型) 和
    * a[表格式](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)  (例如,當地浮標、站台和軌道數據) .
* 當然,并非所有的數據都可以用這些結構來表示,但很多數據都可以用來表示. 表格尤其是非常灵活的資料結構 (參觀關係資料庫程式的成功) .
* 這讓資料查詢更容易建構 。
* 這讓數據回應有簡單的結構, 這樣就更容易在更廣泛的類型標準檔案中服務數據 (通常只支持簡單的資料結構) . 這就是我們設計的原因ERDDAP™這邊
* 這又讓我們很輕鬆 (或任何人) 寫入與所有使用者合作的客戶端軟體ERDDAP™數據集。
* 因此更容易比對不同來源的資料。
* 我們非常清楚,如果你習慣在其他資料結構中與數據合作, 你最初可能會認為這個方法是簡化或不足的。 但所有的數據結構都有取舍 沒有一個是完美的。 連Do-it- all架构都有其缺点:與他們合作很複雜, 如果你接受ERDDAP你可能會發現它有它的優勢 (特別是多個檔案類型的支援, 可以持續數據回應) . 其[ERDDAP™放映](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)  (特别是[資料結構](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures)) 談到很多關於這些問題。
* 即使這招對你來說很奇怪 大多數ERDDAP™客戶端永遠不會注意到 - 他們會簡單地看到所有數據集的結構都非常簡單, 他們會很感激他們能從多种多样的來源中以广泛的檔案格式傳回資料。
         
### 尺寸{#dimensions} 
*    **如果來源數據集中的格子變數不共享同轴變數呢?**   
在EDDGrid數據集,所有數據變數都使用 (共享) 所有轴變數。 所以,如果一個來源數據集有一些有一套維度的變數,其他有一套不同的維度的變數,你必須在其中製作兩個數據集ERDDAP. 例如,你可能會做一個ERDDAP™名為「 某些標題」 的數據集 (表面) " 以持有只是使用的變數\\[時間\\]\\[纬度\\]\\[经度\\]維度與制造另一個ERDDAP™名為「 某些標題」 的數據集 (深度) " 以持有使用的變數\\[時間\\]\\[高度\\]\\[纬度\\]\\[经度\\]. 或者您可以改變資料來源, 加入一個單值的維度 (例如,高度=0) 使變數一致。
    
    ERDDAP™不處理更複雜的數據集 (例如,使用三角形网格的模型) 好吧 您可以在ERDDAP™在ERDDAP™  (讓每套新資料中的所有數據變數 共享同一套轴變數) 但這不是使用者想要的 對於一些數據集,你可能會考慮做一個固定的格子化的數據集版本,並提供除原始數據之外的其他資料. 有些客戶端軟體只能處理一個普通的網格,所以這樣的話,你就能接触到更多的客戶端.
     
    
### 預測的格子資料{#projected-gridded-data} 
一些网格化的資料有複雜的结构. 例如,卫星2 ("漫長的軌道") 資料不使用簡單的投影。 建模者 (及其他) 常與各種非圓柱預測的網格資料合作 (例如,二极、极地、三极) 或以不結構的网格 (更複雜的數據結構) . 某些端點使用者想要此資料, 所以資訊沒有損失 。 為了那些客戶ERDDAP™只能以ERDDAP™管理員將原始的數據集分解成幾個數據集, 其中每一部分都包含同轴變數的變數 。 對,這對參與的人來說很怪 和大多數人不同OPeNDAP伺服器。 但是ERDDAP™强调以多种形式提供資料。 這有可能 因為ERDDAP™使用/需要更统一的數據結構。 雖然有點尷尬 (即与预期不同) ,ERDDAP™可以傳送預期的資料。

\\[是的ERDDAP™可能對數據結構有更松散的要求, 但保留對輸出格式的要求 。 但這會造成許多使用者的困惑, 尤其是新人, 因為許多對不同結構的資料似乎有效的要求都將是無效的, 我們繼續回到目前的系統設計\\]

有些端口使用者想要在像 Equirectangular / 板卡雷 或 Mercator 的 lat loon 圆柱形投影中提供資料, 以便在不同的情況下方便使用 。 對於這些情況,我們鼓勵ERDDAP™管理員使用其他軟體 (NCO?Matlab? 瑞? IDV? ...?) 重新投影到地理上 (平均方形投射/ 板板) 或其他圆柱形投影,并伺服此形式的數據ERDDAP™作為不同的數據集。 這與人們將衛星2級數據轉換成3級數據時所做的事相似。 其中一種工具是[NCO](https://nco.sourceforge.net/nco.html#Regridding)它提供了重新網格化資料的延伸選項。

#### GIS 和重新投影資料{#gis-and-reprojecting-data} 
GIS世界通常面向地圖, GIS程式通常會支持重新投影數據,

目前,ERDDAP™無法重新投影資料。 相反,我們建議您使用一個外部工具來制作出數據集的變體,其中數據已經從原始表單重新投影到矩形 (經度) 适合ERDDAP.

我們認為,CF/DAP世界與GIS世界有些不同,ERDDAP™反映于此. 一般來說,ERDDAP™以數據為主 (不是地圖) 不想改變 (例如,重新投影) 那數據 為ERDDAP™,网格化的數據往往/通常/最好与lat lon值和圆柱形投影相連,而不是某些投影的x,y值. 不管怎樣ERDDAP™它只是把數據傳送過去 就像它目前的投射一樣 根據重新投射是數據的一個重大變化的理論ERDDAP™不想參與重大改變 之後的使用者可能天真地重新投影數據, (所以,如果ERDDAP™管理員想要在不同的投影中提供數據, 很好; 只要重新投影到線下, 並且提供它為不同的數據集ERDDAP. 許多以衛星為基礎的數據集被提供為 NASA 稱為二级 (扭曲) 等級 3 (均方形投影) 版本。) 什麼時候ERDDAP™制作地圖 (直接或透過WMS或 KML) ,ERDDAP™目前只提供使用 Equirectangular / plate carrée 投影的地圖,

我們鼓勵ERDDAP™管理員使用其他軟體 (NCO?Matlab? 瑞? IDV? ...?) 重新投影到地理上 (平均方形投射/ 板板) 或其他圆柱形投影,并伺服此形式的數據ERDDAP™作為不同的數據集。 這與人們將衛星2級數據轉換成3級數據時所做的事相似。 其中一種工具是[NCO](https://nco.sourceforge.net/nco.html#Regridding)它提供了重新網格化資料的延伸選項。

我們希望ERDDAP™將有內置工具來提供地圖, 我們也希望未來能與GIS世界建立更好的聯繫 (除目前WMS服務) . 在這個"現代"世界中 CF/DAP世界和GIS世界仍然如此脆弱。 兩件事情都在"做愛"的名單上 (如果你想幫忙,尤其是聯系ERDDAP™呼叫MapServer 請發郵件給Chris 約翰在諾亞戈夫) 
    
### 資料類型{#data-types} 
ERDDAP™支援下列資料類型
 (姓名敏感;'u'前缀表示“ 未簽署 ” ; 其他系統中很多名稱的數字是位元數) :

#### 位元組{#byte} 
*    **位元組** 已簽署整數值, 範圍為 -128 到 127 。
在其他系統中,這有時叫做int8。
這被SQL和卡珊德拉稱為"Tinyint".
    ERDDAP™轉換[布林](#boolean-data)一些來源 (例如,SQL和Cassandra) 輸入位元組ERDDAP™0=假,1=真,127=假missing\\_value.
#### u字節{#ubyte} 
*    **u字節** 的整數值為 0 到 255 。
在其他系統中,這有時被稱為uint8.
#### 短{#short} 
*    **短** 已簽署整數值, 範圍為 - 32768 到 32767 。
在其他系統中,這有時叫做int16.
這被SQL和卡珊德拉稱為"小".
#### 超速{#ushort} 
*    **超速** 有無號整數值, 範圍為 0 到 65535 。
在其他系統中,這有時被稱為int16.
#### 英寸{#int} 
*    **英寸** 已簽署整數值, 範圍為 -2147483648 - 2147483647。
在其他系統中,這有時叫做int32.
這叫做"整體"|數字 (?) "由SQL和"int"由卡珊德拉.
#### 昆特{#uint} 
*    **昆特** 含有0至4294967295的無號整數值。
在其他系統中,這有時被稱為uint32.
#### 長{#long} 
*    **長** 已簽署整數值, 其範圍為 -9223372036854775808 - 922327303685475807。
在其他系統中,這有時叫做int64.
這叫"大"|數字 (?) "由SQL和卡珊德拉"Bigint".
因為很多檔案型態不支持長數據, 可能時使用雙倍 (见下文) .
#### 烏龍{#ulong} 
*    **烏龍** 其整數為 0 到 184464744073709551615
在其他系統中,這有時被稱為uint64.
因為很多檔案型態不支持烏龍數據, 可能時使用雙倍 (见下文) .
#### 浮{#float} 
*    **浮** 是一种IEEE 754浮體,其範圍约为+/- 3.402823466e+38。
在其他系統中,這有時叫做浮32.
這是真正的|浮 (?) |小數 (?) |數字 (?) "由SQL和卡珊德拉"漂浮".
特殊值 NaN 表示不是數字 。
    ERDDAP™將正數值和負數值轉換成 NaN。
#### 雙倍{#double} 
*    **雙倍** 是IEEE 754的雙倍,範圍约为
+/- 1.7976931348623157E+308.
在其他系統中,這有時叫做浮64.
這叫做"雙精度"|浮 (?) |小數 (?) |數字 (?) "由SQL和卡珊德拉的"雙倍".
特殊值 NaN 表示不是數字 。
    ERDDAP™將正數值和負數值轉換成 NaN。
#### 字符{#char} 
*    **字符** 單一 2 字節 (16 位)  [Unicode UCS-2 字元](https://en.wikipedia.org/wiki/UTF-16)從\\u0000  (#0) 至\\uffff  (#65535) .
    \\uffff其定義是非一分法,
使用 char 被阻遏, 因為很多檔案類型不支援 char 或只支援 1字节 char (见下文) . 考慮用字串代替 。
使用者可以使用 char 變數來做圖 。ERDDAP™將這些字元轉換到他們的Unicode碼點數, 它可以做成數字數據 。
#### 字符串{#string} 
*    **字符串** 是 0 或以上的序列, 2 位元 (16 位)  [Unicode UCS-2 字元](https://en.wikipedia.org/wiki/UTF-16).
    ERDDAP™使用/ 解說 0 長的字串為缺失值 。ERDDAP™不支持真空字符串。
理論上的最大字串長度為2147483647 字元,但不同地方可能會有不同的問題,即使字串稍短一些。
使用ERDDAP用于 SQL 字元的字符串, varchar, 字元變化, 二進位, varbinary, 间隔, 陣列, 多集, xml, 以及其它不與其它字元資料類型的字元ERDDAP™資料類型。
使用ERDDAPCassandra 的「 文本 」 和其他不適合其它的 Cassandra 資料類型ERDDAP™資料類型。
     

之前ERDDAP™v2.10,ERDDAP™內部不支援未簽署的整數型態,
    
### 資料型態限制{#data-type-limitations} 
你可以想到ERDDAP™作為一個具有虛擬數據集的系統,它通过從數據集的來源讀取數據到內部數據模型並寫入數據到各种服務(例如:(OPeN)DAP,WMS)和檔案類型,以應用戶要求。

* 每個輸入讀取器支援數據型態的子集ERDDAP™支持。 所以讀取資料到ERDDAP內部資料結構不是問題
* 每個輸出寫入器也支援數據類型的子集 。 那是個問題 因為ERDDAP例如,必須將長數據壓入不支援長數據的檔案類型。
     

以下是對限制的解釋: (否) 各种輸出寫法及如何ERDDAP™處理問題。 這種并发症是內在的ERDDAP使不同的系統互動的目標

#### 阿塞克二{#ascii} 
* 阿塞克二 (...csv,.tsv等) 文字文件 -
    * 所有數值資料都通過它的字串表示法寫入 (數據數值缺失, 以 0 長字串顯示) .
    * 雖然ERDDAP™向 ASCII 文字檔案正确寫入長和 ulong 值, 很多讀者 (例如,电子表格程序) 無法正确處理長數值與烏龍數值, (在某些情况下缺乏精度) .
    * 字符與字串資料是通过 JSON 字串寫入的, 它處理所有 Unicode 字元 (特別是,ASCII #127以外的"異常"字元,例如歐洲字元出現在"\\u20ac"中.) .
    
        
#### 杰森{#json} 
* 杰森 (.json,.jsonlCSV等) 文字文件 -
    * 所有數字數據都通過它的字串表示值來寫入 。
    * 字符與字串資料寫作 JSON 字串, 它處理所有 Unicode 字元 (特別是,ASCII #127以外的"異常"字元,例如歐洲字元出現在"\\u20ac"中.) .
    * 所有數值數據型態的缺失值都以無效表示 。
         
#### .nc3 份文件{#nc3-files} 
*   .nc3 個檔案不支持任何未簽署的整數型態 。 在 CF v1. 9 之前, CF 不支援未簽署的整數型態 。 為了處理這件事ERDDAP™2.10+ 遵循 NUG 標準, 總要加入一個「 未簽署」 屬性, 其值為「 真」 或「 假」 , 以表示資料是否來自未簽署或簽署的變數 。 所有整數屬性都被寫成簽署的屬性 (例如,字节) 已簽署值( 例如 ubyte)actual\\_range0 到 255 值的屬性, 以 0 到 -1 值的位元屬性( 兩者互补值的偏移值) 出現 。 要知道哪些( 簽署的) 整數屬性應該被讀作未簽署的屬性, 并不容易 。ERDDAP™支持「 未簽署」 屬性, 其讀取時.nc三份文件。
*   .nc3 個檔案不支援長或 ulong 資料類型 。ERDDAP™以暫時轉換為雙倍變數來處理此項 。 雙胞胎可以完全代表 +/- 9, 007, 199, 254, 740, 992 以內的所有值 2^53。 這是不完美的解決辦法Unidata拒絕做小提升到.nc3,.nc4 (重大改變) 作為解決之道
* CF 规格 (在v1.9之前) 表示它支持 char 資料類型, 但尚不清楚 char 是否只是作為 char 陣列的建構元件, 他們的郵件名單上的問題只得出了困惑的答案。 由于這些複雜性,最好避免在ERDDAP™并尽可能使用字符串變數。
* 传统上,.nc3 個檔案只支援用 ASCII 編碼的字串 (7位 0 - 127) 字符。 努格 (和ERDDAP) 延伸 (始于~2017年) 包含屬性「% Encoding 」 , 其值為「 ISO- 8859-1 」 (ASCII 的延伸, 定义每個 8 位元的所有 256 值) 或「 UTF-8 」 表示字串資料是如何編碼的 。 其他編碼可能是合法的,但令人不快。
         
#### .nc4 份文件{#nc4-files} 
*   .nc4 文件支援全部ERDDAP數據類型 。
    
#### NCCSV 文件{#nccsv-files} 
NCCSV 1.0 檔案不支援任何未簽署的整數資料類型 。
[NCCSV 1. 1+ 檔案](/docs/user/nccsv-1.00)支援所有未簽署的整數資料類型。
     
#### DAP {#dap} 
*   (OPeN)DAP  (.das、.dds、.asc ASCII 檔案和.dods 二进制檔案) - –
    *   (OPeN)DAP手柄短、短、短、短、短、短、浮和雙倍值正确。
    *   (OPeN)DAP有一個「 字節」 的資料型態, 它被定义为未簽署, 而歷史上, THREDDS 與ERDDAP™已經把「字節」當做簽名(OPeN)DAP服務。 為了更好地處理這件事ERDDAP™2.10+ 遵循 NUG 標準, 總會新增一個「 未簽署」 屬性, 其值為「 真 」 或「 假 」 , 以表示資料是否是 。ERDDAP™呼叫字节或ubyte。 所有字节和ubyte 屬性都寫成「 字節」 屬性, 有簽署值( 例如 ubyte )actual\\_range0 到 255 值的屬性, 以 0 到 -1 值的位元屬性( 兩者互补值的偏移值) 出現 。 要知道哪些「 字節」 屬性應該被讀作 ubyte 屬性, 并不容易 。
    *   (OPeN)DAP不支援簽署或未簽署的長度。ERDDAP™以暫時轉換為雙倍變數與屬性來處理 。 雙胞胎可以完全代表所有數值,最多9,007,199,254,740,992 2^53。 這是不完美的解決辦法OPeNDAP  (组织) 拒絕做小提升到DAP提到:DAP4 (重大改變) 作為解決之道
    * 因為(OPeN)DAP沒有单独的字元資料類型, 技術上只支援 1字节 ASCII 字元 (0 - 127) 在字串中, 字元數據變數會出現在 1- 字符串中(OPeN)DAP達斯、達德和達德的反應
    * 嚴格來說,(OPeN)DAP只支援使用 ASCII 編碼字符的字串 (0 - 127) . 努格 (和ERDDAP) 延伸 (始于~2017年) 包含屬性「% Encoding 」 , 其值為「 ISO- 8859-1 」 (ASCII 的延伸, 定义每個 8 位元的所有 256 值) 或「 UTF-8 」 表示字串資料是如何編碼的 。 其他編碼可能是合法的,但令人不快。
         
### 資料類型註解{#data-type-comments} 
* 因為許多檔案類型的長、 ulong 和 char 資料支持不足,ERDDAP. 可能時使用雙倍而不是長和烏龍, 並使用 String 而不是 char 。
     
* 元件 - 因為(OPeN)DAP.das 和.dds 的回應不支援長或長的屬性或數據類型 (卻把他們當成雙胞胎) 您可能想要使用ERDDAP表1http./erddap/ . **信息** / *datasetID* .html 网页 (例如,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) )   (其它檔案類型,例如 .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv,.xhtml) 或.nccsv元数据回复 (例如,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)雖然.nccsv中繼資料只供表格数据集使用) ,兩者都支持所有資料類型 (特別是,長,烏龍,和Char) .
         
### 媒體文件{#media-files} 
并非所有的資料都是數字或文字的陣列 。 有些數據集由媒體檔案构成或包含,例如影像、音效和影像檔案。ERDDAP™讓使用者更容易取得媒體檔案。 這是兩步路程:
 

1. 通過一個支持字節範圍要求的系統, 讓每個檔案通過自己的網址存取 。
最簡單的方法就是把檔案放進一個目錄ERDDAP™有權使用 (如果他們像在一個容器裡.zip檔案, 解開它們, 雖然您可能要提供.zip檔案也寄給使用者。) 那就做個[檔案名稱中的 EDD 表格](#eddtablefromfilenames)數據集讓這些檔案通過ERDDAP™,尤其是通过ERDDAP是["files"系統](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
    
所有檔案都通過 EDDTable 從檔案名稱和ERDDAP是"files"系統支持[位元範圍要求](https://en.wikipedia.org/wiki/Byte_serving). 通常,當客戶端 (例如,瀏覽器) 向 URL 要求, 它會得到整個檔案作為回應 。 但在位元範圍要求中, 要求指定了檔案中的位元範圍, 而伺服器只傳回這些位元範圍 。 這與此相關, 因為瀏覽器中的音效與視頻播放器只有在檔案可通过位元範圍要求存取時才能工作 。
    
可選 : 如果您在相關媒體檔案中有不止一個數據集, 您可以只做一個 EDDTable FromFileNames, 每組檔案都有子目錄 。 優點是, 當您要新增新數據集的媒體檔案時, 您只需建立新資料夾並將檔案放入此資料夾 。 資料夾與檔案會自動加入 EDDTable FromFileNames 資料集 。
    
2. 可選 : 如果您有包含介质檔案參考的數據集, 請加入ERDDAP.
例如, 每次有人看到鲸魚時, 你可能會有 . csv 的 . csv 檔, 以及一個列, 其中包含與目擊相關的影像檔名 。 如果影像檔名只是檔名, 例如 Img20141024T192403Z , 而不是完整的 URL, 那你需要加入[文件 AccessBase 網址和/或檔案存取後缀](#fileaccessbaseurl)屬性dataVariable指定那些文件名的基底URL和后缀。 如果您通過 EDDTable FileNames 開啟檔案, 網址會在表單中
     *基底Url* /erddap/文件/ *datasetID* /
例如,
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
如果有.zip或與資料變數相關的所有媒體檔案的其他容器檔案, 我們建議您也讓使用者可以存取此檔案 (见上文第1步) 然后用一個[檔案存取Archive 網址](#fileaccessarchiveurl)屬性。
    

\\[起始於ERDDAP™v1.82\\]如果你先走一步 (或兩步) ,那么當使用者查看ERDDAP™ "files"數據集的系統 (或要求通过 an.htmlTable要求,如果你做了第二步) ,ERDDAP™將顯示檔案左邊的 '?' 圖示。 如果使用者在圖示上徘徊, 他們會看到顯示影像的彈出, 或是音效播放器, 或是影像播放器 。 瀏覽器只支援有限的類型

* 影像 (通常.gif,.jpg,和.png) ,
* 音效 (通常.mp3,ogg,和.wav) 和
* 影像文件 (通常.mp4,.ogv,和. 網頁) .

在不同的操作系統上, 不同版本的瀏覽器支持不同 。 所以如果你有選擇要提供哪類檔案的話 提供這些類型是合情合理的

或者,如果使用者點擊顯示在一個ERDDAP™他們的瀏覽器會將影像、音效或影片檔案作為单独的網頁顯示。 這對看到一個非常大的影像或影片放大到全螢幕,
    
### 使用 AWS S3 文件工作{#working-with-aws-s3-files} 
[亞馬遜網路服務 (阿WS) ](https://aws.amazon.com)出售者[云计算](https://en.wikipedia.org/wiki/Cloud_computing)服務。[S3](https://aws.amazon.com/s3/)是 AWS 提供的物件儲存系統。 而不是傳統檔案系統的目錄與檔案的分級系統 (就像電腦里的硬碟) , S3 提供只持有"物件"的"桶" (我們叫他們來"files") .

ASCII 檔案 (例如.csv) ,ERDDAP™可以直接使用桶中的檔案。 你只需要指定&lt;fileDir &gt; 的数据集,使用 AWS 桶的特定格式,例如, https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/ . 你不該用&lt;取自Url &gt; 。 详情见下文。

但對於二進制檔案 (例如,.nc和....hdf文件) ,您需要使用&lt;以下描述的快取FromUrl&gt;系統 。ERDDAP, netcdf - java (其中ERDDAP™從這些檔案讀取資料) ,其他科學數據軟體也設計在傳統檔案系統中與檔案合作,提供[區塊關卡](https://en.wikipedia.org/wiki/Block-level_storage)存取檔案 (允許讀取檔案的區塊) 但S3只提供[文件關卡 (物件) ](https://en.wikipedia.org/wiki/Block-level_storage)存取檔案 (只允許讀取整個檔案) . AWS提供S3的替代品,[弹性區塊儲存 (EBS) ](https://aws.amazon.com/ebs/)),它支持區塊關卡存取檔案,但比 S3 更貴,所以很少用于大量數量資料檔案的批量儲存 。 (所以當人們說把數據存放在云中 (S3) 便宜 通常是蘋果和橙子的比對) 

#### S3 桶{#s3-buckets} 
 **水桶的內容 鑰匙 物件 界限**   
技術上, S3桶不像電腦上的檔案系統那樣排列成分級的檔案结构. 相反,桶中只包含"物件" (文件) ,每一個都有"鑰匙" (名稱) . 那桶Noaa -goes17的鑰匙就是一例

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
此物件的相应 URL 是

[ https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc ](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc)

AWS 支持網址建構的一點變化, 但是ERDDAP™需要此特定格式 :
   https://*bucketName*.s3.*region*.amazonaws.com/*key*   
像這個例子一樣, 讓按鍵名稱看起來像一個分級路徑加上一個檔案名稱, 因為它很常见而且有用ERDDAP™將 /' 的金鑰當作是階級路徑加檔案名稱, 此文件會將它們稱為 。 如果桶的按鍵不使用 /' (例如,按鍵像
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s20180522247575),于是.ERDDAP™將整個金鑰當作一個長的檔案名稱

私人對公共桶 -- S3桶的管理者可以將桶及其內容公之于眾或私之於眾。 如果公開, 任何使用 URL 檔案的檔案都可以被任何人下載 。 亞馬遜有一個[開啟資料](https://aws.amazon.com/opendata/)公共數據集的主機程式 (包括來自NOAANASA和USGS) 免費從那些桶裡下載檔案 如果桶是私人的,桶中的檔案只能被授權使用者存取, AWS 收取費用 (通常由桶主付錢) 將檔案下載到非 AWS S3 電腦。ERDDAP™可以使用公共和私人桶中的数据。

#### AWS 憑證{#aws-credentials} 
才能做到這樣ERDDAP™您可以讀取私人桶的內容, 您需要 AWS 憑證, 您需要將憑證檔儲存在標準的地方 。ERDDAP™可以找到信息。 參見 AWS SDKJava2.x 文件:[設定預設的憑證](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials). (儲存值為Java命令行參數\\[湯姆卡\\]/bin/setenv.sh 可能是個好選擇。) 
#### AWS / 文件/文件{#aws-files} 
* /文件/系統 -- 其ERDDAP™ [/文件/系統](#accessibleviafiles)允許使用者下載資料集的來源檔案。 我們建議您開啟所有有來源檔案的資料集, 因為許多使用者想要下載原始來源檔案 。
    * 如果檔案放在一個私密的 S3 桶中, 使用者下載檔案的要求會由ERDDAP™,它會讀取檔案中的資料,然后傳送給使用者,从而增加您的載重量ERDDAP™,使用進出帶寬,使您 (该ERDDAP™管理者) 向 AWS 支付資料傳輸費 。
    * 如果檔案放在公開的 S3 桶中, 使用者下載檔案的要求會被重定向到文件的 AWS S3 網址, 所以資料不會流過 。ERDDAP™,因此減少載入量ERDDAP. 如果檔案在 Amazon 開啟資料中 (自由) 公桶,然后你 (该ERDDAP™管理者) 不需要向AWS支付任何資料入侵費 因此,公眾的數據有很大的優勢 (非私人) S3桶, 以及提供亞馬遜 Open Data 資料的巨大優勢 (自由) 桶.

#### ERDDAP™和 AWS S3 桶{#erddap-and-aws-s3-buckets} 
[ **ERDDAP™和 AWS S3 桶** ](#erddap-and-aws-s3-buckets)  
幸好我做了很多努力ERDDAP™以合理高效的方式處理 S3 區塊關卡存取檔案的內在問題:

*   \\[免责声明 : 和AWS S3桶一起工作是一大堆额外工作. AWS是巨大的服務和特色生态系统。 有很多事要學 它需要時間和精力,但它是可以做到的。 耐心點 你會有辦法的 尋找/ 要求求助
([AWS 文件](https://aws.amazon.com/documentation/gettingstarted/),网站[堆疊過量流量](https://stackoverflow.com/)普通
    [ERDDAP™支援方案](/docs/intro#support))如果/當你被卡住。\\]  
     
* 甚至很難在 S3 桶中找到檔案的目錄结构和檔案名稱 。ERDDAP™有解決問題的辦法: EDDTable FromFileNames 有特殊功能[\\*\\*"在飛翔"](#fromonthefly)選項, 讓您從 FileNames 資料集中建立 EDDTable , 讓使用者瀏覽 S3 桶的內容 (下載檔案) 透過數據集"files"选项。 有一個[以下示例](#viewing-the-contents-of-a-bucket).
     
*   ERDDAP™可以從[外部壓縮的資料檔](#externally-compressed-files),所以如果 S3 上的檔案被儲存為.gz,.gzip,.bz2, . Z, 或其他類型的外部壓縮資料檔, 它們可以大寫 (2 - 20X) 減少檔案儲存成本 。 使用外部壓縮的檔案通常不會有時間懲罰, 因為從 S3 轉移到更小的檔案所儲存的時間ERDDAP大致平衡ERDDAP™要解壓檔案。 要使用此功能, 你只需要確保數據集的&lt;檔案Name Regex &gt; 允許壓縮檔案型態 (例如,增加 (|.gz) 到 regex 尾端) .
     
* 在最普通的案例中,你有一個ERDDAP™安裝在您的 PC 上以做測試/ 開發, 並且數據集有二進制資料檔, 它們被儲存在 S3 桶裡的物件中, 這是讓數據集進入的方法之一ERDDAP™即:
    1. 在您的 PC 上建立目錄以持有一些測試資料檔 。
    2. 從來源下載兩份資料檔案到您剛建立的目錄 。
    3. 使用[產生 DatasetsXml](#generatedatasetsxml)產生datasets.xml以兩個本地資料檔为基础的數據集。
    4. 檢查那套數據庫是否與所希望的一樣工作[達斯Dds](#dasdds)和/或本地ERDDAP.
        
         **以下的步數可以复制數據集 (從 S3 桶中取得資料) 公共ERDDAP.** 
        
    5. 复制datasets.xml的數據集datasets.xml公示ERDDAP™那會供應數據
    6. 建立公開目錄ERDDAP本地硬碟來儲存暫存檔案 。 目錄不用太多磁碟空間 (參觀快取) .
    7. 變更數據集的值&lt;fileDir &gt; 標籤可以指向您剛剛建立的目錄 (即使目錄是空的) .
    8. 新增a[來自Url 的快取](#cachefromurl)指定資料集桶名和可選的前缀的標籤 (即目錄) 特定[Aws S3 URL 格式ERDDAP™需要](#accessing-files-in-an-aws-s3-bucket).
    9. 添加 a [&lt;缓存SizeGB &gt; ] (牧羊人) 標籤到數據集的 xml (例如, 10 是大部分數據集的好值) 要告訴ERDDAP™以限制本地快取大小 (即,不要試著儲存所有遠端檔案) .
    10. 看這在公眾上是否有效ERDDAP. 注意,第一次ERDDAP™載入數據集, 需要很長的時間載入, 因為ERDDAP™需要下載和讀取所有的資料檔。
        
如果數據集是一大堆 巨大的網格化的數據檔 這需要很長的時間 而且不切实际 在某些情况下,对于已網格化的資料檔,ERDDAP™可以提取所需信息 (例如, 網格化資料檔中資料的時間點) 從檔案名稱中避免此問題。 看[經 文件名](#aggregation-via-file-names-or-global-metadata).
        
    11. 可選擇 (但尤其對 Files 資料集的 EDD Table 來說) ,您可以添加[n 串](#nthreads)標籤到要告訴的數據集ERDDAP在應答使用者的數據要求時使用多于 1 串 。 以最小化延遲的效果ERDDAP™從 (遠端) AWS S3 桶進入本地快取 (也許) 消沉他們。

#### AWS S3 開啟資料{#aws-s3-open-data} 
部分NOAA是[大數據程式](https://www.noaa.gov/nodd/about),NOAA包括AWS等5個組織, 「探索在雲中儲存關鍵觀察和模型產品的影印件, AWS 包括它從中獲得的數據集NOAA作為其方案的一部分, 提供公共存取 一大堆[開啟 AWS S3 上的資料](https://registry.opendata.aws/)從任何電腦, 不管它是亞馬遜计算實驗 (租用的電腦) 在 AWS 網絡上, 或是在任何網絡上你自己的PC上。 以下例假設您正在使用公開的數據集 。

#### 在 AWS S3 Bucket 中存取檔案{#accessing-files-in-an-aws-s3-bucket} 
私人S3數據桶 水桶的主人必須讓您進入水桶 (參看 AWS 文件 。) 

您需要AWS帳戶, 因為 AWS SDK 是Java  (其中ERDDAP™用于获取桶內容的資訊) 需要 AWS 帳號憑證 。 (更多關於下面) 

ERDDAP™只有指定了 AWS S3 桶,才能存取 [&lt;快取自Url&gt;] (牧羊人) (或)&lt;以特定格式:
 https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*   
在哪里

* 桶名是桶名的簡表, 例如 noaa- goes 17 。
* 區域,例如我們東一區, 來自「Region」一欄[AWS 服務端點](https://docs.aws.amazon.com/general/latest/gr/rande.html)水桶在哪?
* 前缀是可選的 。 如果存在,它必須以'/'.

例如, https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
此網址格式是 AWS S3 建議格式之一 :[存取桶](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)和[此前缀描述](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html).ERDDAP™要求您將桶網址和可選的前缀合并到一個網址,以指定&lt;快取自Url &gt; (或)&lt;文件所在位置。

#### 試驗公用 AWS S3 桶{#test-public-aws-s3-buckets} 
对于公共桶,您可以而且應該在瀏覽器中試驗 AWS S3 目錄的桶 URL,例如,
[ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)如果桶網址正确且適合ERDDAP,它會傳回 XML 的檔案。 (部分) 列出那桶的內容。 不幸的是,完整的網址 (即桶 URL 加上前缀) 那ERDDAP™想要給定的數據集在瀏覽器中行不通 。 AWS 不提供系統來瀏覽您的瀏覽器中的桶的分類 。 (如果這不正確,請發郵件給Chris。 約翰在Noaa.gov。 不然,亞馬遜,請增加支援&#33;) 

#### 檢視桶的內容{#viewing-the-contents-of-a-bucket} 
S3桶常常包含數個類型的檔案,ERDDAP™數據集。 使ERDDAP™資料集,您需要知道起始目錄&lt;快取自Url &gt; (或)&lt;fileDir&gt;)和表示此檔案子集的檔案名稱格式。 如果您試著在瀏覽器中檢視桶的全部內容, S3 將會只顯示前1000 個檔案, 這還不夠 。 目前,你查看桶子所有內容的最好方式是制作[檔案名稱中的 EDD 表格](#eddtablefromfilenames)数据集 (在你的電腦上ERDDAP™和/或公众ERDDAP) ,這也讓您可以輕鬆地瀏覽目錄结构和下載檔案。 其&lt;檔案 Dir &gt; 將會是您在上面製作的網址, 例如 。 https://noaa-goes17.s3.us-east-1.amazonaws.com .\\[為何AWS S3不提供一個快速而簡單的方法讓任何人在沒有AWS帳戶的情况下這樣做?\\]注意,當我在非亞馬遜網絡的PC上這樣做時,亞馬遜似乎會減慢對小滴的反應。 (大约100 (?) 每塊檔案) 在前幾塊之后 (每塊1000份檔案) 已下載。 因為水桶可能有很多文件 (Noaa -goes17有2600萬) ,取得桶中的所有內容可能會從檔案名中取下 EDD Table 數小時 (例如,12&#33;) 完成。\\[亞馬遜,是嗎?\\]

#### 制作 EDD 表格 使用 AWS S3 Bucket 的檔案名稱資料集{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
如果您有桶名, 但不要在 S3 桶中已經有檔案清單, 也不要有前缀 。 請使用下面的指令來建立 EDDTable FromFileNames 資料集, 以便您透過 。ERDDAP是"files"系統。

1. 開啟 AWS 帳號
    ERDDAP™使用[AWS SDK 表示Java](https://docs.aws.amazon.com/sdk-for-java/index.html)要從 AWS 取得桶信息, 您需要[建立並激活 AWS 帳號](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). 這工作很重,有很多事情要學
     
2. 把你的 AWS 證件放在哪裡ERDDAP™可以找到他們
遵循指示[建立 AWS 憑證與發展區域](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials)所以ERDDAP™  (具体而言,AWS SDK是Java) 會找到並使用您的 AWS 憑證 。 如果ERDDAP™找不到證件,你會看到
java.lang。 非法參數例外: 設定檔檔案不能是無效的錯誤ERDDAP'log.txt 檔案 。
    
Linux 和 Mac OS 的提示: 憑證檔案必須在正在运行的 Tomcat 使用者的家目錄中 (和ERDDAP)   (這段,我們假設使用者=Tomcat) 。 不要假設 ~ 是 / home/ tomcat – 實際上是用 cd ~ 來找出操作系統認為 ~ 對使用者 = tomcat 是 。 建立此目錄, 如果它不存在 。 另外, 在您將憑證檔放在位後, 請確認檔案的使用者與群組是 tomcat, 然後使用 chmod 400 憑證來確認檔案只為使用者讀取 。
    
3. 建立桶網址[格式ERDDAP™需要](#accessing-files-in-an-aws-s3-bucket)例如,
    [ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)和 (公共桶) 在瀏覽器中測試它, 以确保它傳回 XML 文件, 它有部分列出桶的內容 。
     
4. 使用[產生 DatasetsXml](#generatedatasetsxml)要建立[檔案名稱中的 EDD 表格](#eddtablefromfilenames)數據集 :
    * 對起始目錄, 請使用此語法 :
        \\*\\*~ *飛行時,* 你的巴克特厄爾*
例如,
        \\*\\*飛行時, https://noaa-goes17.s3.us-east-1.amazonaws.com/
 
    * 檔案名稱 regex ? ._______________________________________________________
    * 遞迴? 真
    * 重新載入 每一個NMinute? 10080
    *   infoUrl? https://registry.opendata.aws/noaa-goes/
 
    * 机构?NOAA
    * 摘要? 沒什麼 (ERDDAP™會自動建立一個像樣的概述。) 
    * 標題? 沒什麼 (ERDDAP™會自動建立正宗的標題 。) 同往常一樣, 您應編輯結果的 XML, 以驗證正確性, 並在使用它的數據集整塊之前做改进 。datasets.xml.
5. 如果您遵守上面的指令並加載數據集ERDDAP,您已建立 EDD Table fromFiles 資料集。 例如, 為了讓任何人更容易從 AWS 開啟資料桶中瀏覽和下載檔案, 我們已建立 EDDTable FromFileNames 數據集( 參見清單
    [ https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_ ](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_)几乎全部[AWS S3 開啟資料桶](https://registry.opendata.aws/).
    \\[根目錄中沒有的幾桶檔案 。 (超過在合理时间内下載) ,或禁止公共存取 (他們不都應該公開嗎?) 或請求者付錢桶 (例如,哨兵) .\\]  
如果按下"files"您可以在 S3 桶中瀏覽目錄樹與檔案 。 因為路\\*\\*從Fly EDD Table從Files的作品看,這些目錄列表總是完美更新,因為ERDDAP™讓他們飛起來 如果您點擊目錄樹到實際的檔案名稱並點擊檔案名稱,ERDDAP™將會將您的請求重定向到 AWS S3, 以便您直接從 AWS 下載檔案 。 你可以檢查那份文件
    
麻煩?
如果您的 EDD Table 從檔案中不載入ERDDAP™  (或 DasDds 命令) ,查看 log.txt 檔案中的錯誤訊息。 如果你看到
java.lang。 非法引數例外: 設定檔檔案不能是無效錯誤, 問題是 AWS SDK 是 AWS SDKJava  (使用ERDDAP) 找不到證件 參見上面的證件指示
     

AWS並非只允許人們使用瀏覽器查看公共桶的內容,

 **那你可以做ERDDAP™數據集讓使用者存取檔案中的資料。**   
注意指示[ERDDAP™和 S3 桶](#erddap-and-aws-s3-buckets)  (以上) .
對於您在上面制作的 EDDTable FromFileNames 資料集樣本, 如果您在目錄樹上用目錄與檔案名稱做一點查詢的話, 上面的等級目錄名稱很明顯 (例如ABI-L1b-RadC) 符合什么ERDDAP™會呼叫不同的數據集。 你工作用的桶可能差不多 您可以繼續在其中建立不同的數據集ERDDAP™使用,例如:
 https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
如&lt;快取自Url&gt; 。 不幸的是,對這個特別的例子來說,桶中的數據集似乎都是第1或第2關數據集,ERDDAP™ [不太擅長](#dimensions), 因為數據集是使用不同维度的變數的更複雜的集合 。
     
    
### NcML 檔案{#ncml-files} 
NcML 檔案讓您指定一個或多個原始來源的飛行變更NetCDF  (v3 或 v4)  .nc或.hdf  (v4 或 v5) 檔案,然後有ERDDAP™治.ncml 檔案為來源檔案 。ERDDAP™數據集將接受.ncml 檔案隨時.nc需要檔案 。 NcML 檔案 MUST 有扩展名.nc嗯 看[UnidataNcML 文件](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html). NcML 有用, 因為可以用它做一些事情 (例如, 在收藏中對不同的檔案做不同的變更, 包括在檔案中新增一個有特定值的尺寸) 你做不到的ERDDAP是datasets.xml.

* 變更為a.ncml 檔案上一個變更的時間會使檔案在重新載入數據集時重新載入, 但會改變底部.nc資料檔案不會被直接注意到 。
* 提示: NcML 是\\*非常\\*敏感於 NcML 檔案中某些項目的排序 。 將 NcML 視為在指定的順序中指定一系列指令, 以改變來源檔案 (NcML 檔案的起始/ 上部的狀態) 輸入目的檔案 (NcML 文件末端/底端的狀態) .

NcML 的替代品是[NetCDF操作員 (NCO) ](#netcdf-operators-nco). 最大的區別是 NcML 是做飛行變更的系統 (所以來源檔案沒有變更) ,而NCO可用于修改 (或新版本) 文件 都NCO而 NcML 是非常非常灵活的, 並且允許您對檔案做任何你能想到的變更 。 對此兩者來說, 確切地想出該怎麼做, 兩者都是编制NetCDF和HDF要使用的檔案ERDDAP特别是要做出超越ERDDAP操控系統可以

例 # 1: 加入單值的時間尺寸
這是.ncml 建立新外部尺寸的檔案 (時間, 1 值: 1041379200) 并將此維度加入檔案 A2003001. L3m\\_DAY\\_PIC\\_pic\\_4km.nc:
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
示例 2 : 變更已存在的時間值
有時候來源.nc檔案已經有時間尺寸和時間值, 但數值不正確 (你的目的) . 這個.ncml 檔案說: 關於名为""1981082523030-NCEI..."的數據檔,為尺寸變數"time", 設定單位屬性為自1970-01-01T0000:00Z的秒數, 定時值為367588800。
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
### NetCDF操作員 (NCO)  {#netcdf-operators-nco} 
"网易CDF運算器 (NCO) 包含十幾個單一的指令行程式, 使用網絡CDF\\[v3 或 v4\\],HDF \\[v4 或 v5\\],\\[.格里布 . bufr,\\]和/或DAP文件作为輸入,然后操作 (例如, 產生新數據、 計算數據、 列印、 超音速板、 操控中繼資料) 以文字、二進制或 netCDF 格式輸出結果。NCO助推分析网格化的科學資料。  shell 命令樣式NCO讓使用者可以互動地操控和分析檔案, 或是用表達的文稿, (從[NCO](https://nco.sourceforge.net/)主頁) .

替代NCO是[NcML](#ncml-files). 最大的區別是 NcML 是做飛行變更的系統 (所以來源檔案沒有變更) ,而NCO可用于修改 (或新版本) 文件 都NCO而 NcML 是非常非常灵活的, 並且允許您對檔案做任何你能想到的變更 。 對此兩者來說, 確切地想出該怎麼做, 兩者都是编制NetCDF和HDF要使用的檔案ERDDAP特别是要做出超越ERDDAP操控系統可以

例如,你可以使用NCO以讓時間變數的單位在一系列檔案中一致, 或者,你可以使用NCO要應用scale\\_factor和add\\_offset在一组檔案中scale\\_factor和add\\_offset不同來源檔案中有不同的值 。
 (或者你現在可以處理這些問題了ERDDAP™途[EDDGrid來自 NcFiles 未包裝](#eddgridfromncfilesunpacked),是EDDGrid從NcFiles中解開打包的資料, 並且將時間值标准化到低等, 以便處理不同的收藏檔scale\\_factor和add\\_offset或不同的時空單位。) 

NCO是使用此功能的 Free and Open source 軟體[GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html)駕照

例 # 1: 使單位一致
EDDGrid從檔案與 EDD 表格 Files 堅持指定變數的單位在所有檔案中都是相同的 。 如果一些文件是微不足道的 (沒有功能) 不同(例如:
自1970-01-01 00:00 UTC起的秒數
"seconds since 1970-01-01T00:00:00Z",您可以使用NCO是[已分解](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor)變更所有檔案中的單位與
nco/ ncatted - a 單位, time, o, c, 自1970-01-01T00:00Z' QQ.nc  
\\[在EDDTable的很多問題中... 檔案資料集, 您現在可以使用[标准化 什么](#standardizewhat)要告訴ERDDAP將來源檔案在讀取時标准化ERDDAP.\\]
    
### 數據集大小的限制{#limits-to-the-size-of-a-dataset} 
你可以看到下面有很多"20億"的提法 更准确的說就是2 147 483 647 (2^31-1) ,是32位簽署整數的最大值。 例如,在一些電腦語言中Java  (其中ERDDAP™已寫入) ,那是可用于很多數據結構的最大數據類型 (例如, 陣列的大小) .

字符串值 (例如, 对于變數名稱、 屬性名稱、 字串屬性值和字串數值) ,每字串的最大字符數ERDDAP™是~20億. 但是在几乎所有的情況下 如果弦越過合理大小 就會有小問題或大問題 (例如,可變名稱和屬性名稱的80個字元,以及大多数字符串屬性值和數據值的255個字元) . 例如, 顯示長變數名稱的網頁會尷尬的寬度, 長變數名稱如果超过應答檔案類型的限值, 則會被切斷 。

网格化数据集 :

* 最大數量axisVariables是~20億.
最大數量dataVariables是~20億.
但如果數據集有大于100個變數, 使用者使用會很累赘 。
如果數據集有&gt;100万個變數, 您的伺服器會需要很多物理記憶體, 還有其他問題 。
* 每个尺寸的最大大小 (axisVariable) 是~20億值。
* 我想是最大的細胞總數 (所有尺寸的產品) 是无限的,但可能是~9e18。

表格数据集:

* 最大數量dataVariables是~20億.
但如果數據集有大于100個變數, 使用者使用會很累赘 。
如果數據集有&gt;100万個變數, 您的伺服器會需要很多物理記憶體, 還有其他問題 。
* 最大來源數量 (例如,文件) 總和是~20億
* 在某些情况下, 单个來源的最大行數 (例如,檔案,但不是數據庫) 是~20億列。
* 我不認為還有其他限制

對於網格化和表格化的數據集,對子集的大小有一些內部限制,使用者可以在一個要求中要求 (常常與大于20億或~9e18的東西相關) ,但使用者很有可能會碰到檔案類型的限定。

*   NetCDF版本3.nc檔案只限 2GB 位元組 。 (如果這真的對某人有問題 就告訴我 我可以加入支持NetCDF版本3.nc64 位延伸或NetCDF第4版可以大幅提高限制,但不能无限。) 
* 瀏覽器只在數據到 ~ 500MB 之後會崩溃, 所以ERDDAP™限制回覆到.htmlTable需要 ~400MB 的資料。
* 很多資料分析程序都有相似的限制 (例如,一個維度的最大大小常常是~20億值) ,因此没有理由努力打破檔案類型的特定限制。
* 檔案類型的限值是有用的, 因為它們可以防止天真地要求提供 真正巨大的數據 (例如,當數據集有 20TB 數據時, 「把所有的數據集都給我」) , 下載時間越長,
* 檔案類型特定限制有用, 因為它迫使使用者處理大小合理的子集 (例如, 經過檔案處理一個大型的網格化的數據集, 每個檔案都有一個時間點的數據) .
         
### 切換到 ACDD- 1.3{#switch-to-acdd-13} 
我們 (显著[產生 DatasetsXml](#generatedatasetsxml)) 目前建議[ACDD 版本 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)於2015年初批准, 之前ERDDAP™1.62版本 (2015年6月公布) ,ERDDAP™已使用/建議使用[NetCDF數據集發現屬性常规](https://wiki.esipfed.org/ArchivalCopyOfVersion1)被称作 "UnidataGlobal Conventions 中的數據集探索 v1.0"Metadata\\_Conventions屬性。

如果您的數據集使用早期的 ACDD 版本, 我們建議您切換到 ACDD-1 。 不難 ACDD-1.3与1.0版本高度反向兼容. 要切換所有數據集 (但EDDGrid從 Erddap 和 EDD 表格 從 Erddap 数据集) :

1. 移除新變更全局Metadata\\_Conventions新增屬性 (或更改已存在的Metadata\\_Conventions屬性)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
到數據集全局&lt;addAttributes&gt;.
     
2. 如果數據集在全局內有約定屬性&lt;addAttributes&gt;,全部更改 "Unidata數據集發現 v1.0"提到"ACDD-1.3".
如果數據集在全局沒有約定屬性&lt;addAttributes&gt;,然后添加提及ACDD-1.3的。 例如,
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. 如果數據集有全局性standard\\_name\\_vocabulary屬性,請將數值的格式變更為, 例如,
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
如果參考的是舊版本的[CF 標準名稱表](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). 切換到目前的版本可能是個好主意 (65,我們寫這個) , 因為新的標準名稱會加上之後的版本, 但舊標準名稱很少被贬低, 從未移除 。
     
4. 尽管 ACDD- 1.0 包含全局屬性creator\\_name,creator\\_email,creator\\_url,[產生 DatasetsXml](#generatedatasetsxml)直到某天才自動加入ERDDAP™v1.50. 這是重要的資訊:
        
    *   creator\\_name讓使用者知道/ 刻錄數據集的建立者 。
    *   creator\\_email告訴使用者要聯絡數據集建立者的首選電子郵件位址, 例如他們對數據集有疑問 。
    *   creator\\_url讓使用者有辦法了解更多創始者。
    *   ERDDAP™在生成 FGDC 和 ISO 19115-2/19139 元数据文件時使用所有此資訊 。 外部搜尋服務常使用這些文件。
    
請將這些屬性加入數據集的全局性&lt;addAttributes&gt;.
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
好了 我希望那不會太難
     
### 扎爾{#zarr} 
截至2.25版本ERDDAP™可以讀取本地端 使用 Zarr 文件[NcFiles 的 EDD 表格](#eddtablefromncfiles)和[EDDGrid來自 Nc 檔案](#eddgridfromncfiles).

 (截至2019年8月) 我們很容易就錯了,但我們還不相信[扎爾](https://github.com/zarr-developers/zarr-python)或類似系統將數據檔案分解成小塊,ERDDAP™如亞馬遜AWS S3等在雲端服務中儲存的讀取資料 。 Zarr是個很棒的技術 它在各种情況下很有用 我們只是不能確定ERDDAP+S3是其中之一。 讓我們做一些測試 看看這是否是更好的解決方案。

在云中存取數據的問題是暫時性的 (第一次取得資料的滞后) 和檔案關卡存取 (而不是封鎖關卡存取) . Zarr 解決了檔案關卡存取問題, 但對暫時性卻不做任何決定 。 比起只是下載檔案 (因此可以讀取為本地檔案, 有區塊關卡存取功能) , Zarr 可能甚至會使暫時問題更嚴重, 因為用 Zarr , 讀取檔案現在涉及一系列的呼叫來讀取檔案的不同部分 (每個都有自己的後退) . 暫時的問題可以通过同步要求來解決,

和扎爾 (關聯資料庫) , 我們失去了讓數據檔案成為一個簡單的單一檔案的方便性, 您可以輕易地驗證其完整性, 或是做/ 下載複本 。

ERDDAP™  (截至v2) 有一個系統來維持 URL 來源的本地檔案缓存 (例如,S3) (參考[&lt;取自Url &gt; 及&lt;缓存MaxGB &gt;] (牧羊人) ). 而新的&lt;nthreads &gt;] (正弦) (無線索) 以相當於高水平的資料检索,&lt;FromUrl 的缓存對很多情形都非常有效 。 (我們不知道有多有益)&lt;nThreads &gt; 已不做进一步的測試。 ) 我們承認我們沒有做過AWS實驗, 而且ERDDAP是&lt;快取 FromUrl &gt; 工作於任何類型的資料檔 (例如,.nc,.hdf,csv,.jsonlCSV) ,即使外部压缩 (例如,.gz) ,檔案沒有變更 (例如, 重寫為 Zar 收藏) .

不同的方案可能會支持不同的解決方案, 例如, 只需要讀取檔案的一部分一次 (Zarr會贏的) , vs. 需要讀取所有檔案一次, vs. 需要讀取部分或所有檔案的次次次(&lt;來自Url的快取會贏 。

讓我們做一些測試 看看這是否是更好的解決方案。

- - –
## 類型數據集列表{#list-of-types-datasets} 
如果您需要幫助選擇正確的數據集類型, 請參考[選擇數據集類型](#choosing-the-dataset-type).

數據集的類型分为兩類 。 ([為什麼?](#why-just-two-basic-data-structures)) 

### EDDGrid {#eddgrid} 
*   [ **EDDGrid** ](#eddgrid)數據集處理網格化的資料。
    * 在EDDGrid數據集,數據變數是數據的多維陣列。
    * 每個維度都有一個轴變數 。 Axis 變數必須指定為數據變數使用的順序 。
    * 在EDDGrid數據集,所有數據變數都使用 (共享) 所有轴變數。
         ([為什麼?](#why-just-two-basic-data-structures) [如果他們沒有呢?](#dimensions)) 
    * 排序尺寸值 - 全部EDDGrid數據集,每個維度必須排序 (升降) . 每個區域可以不規定 不能有領帶。 要求[CF 中繼資料標準](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). 如果任何維度的數值沒有排序,數據集不會被載入,ERDDAP™表示日志文件中第一個未排序的值, *大家长會* /日志/log.txt.
        
有一些子類有附加的限制(尤其是,EDDGrid聚合的分量要求外( 最左, 第一個) 維度要上升 。
        
未分類的維度數值 几乎總是表示來源數據集的問題 。 這最常發生於集合中包含一個錯名或不適當的檔案, 這會導致無類型的時間維度 。 要解決此問題, 請參考ERDDAP™找到冒犯時間值的log. txt 檔案 。 然後在來源檔案中查找对应的檔案 (之前或之后) 這不屬於集合。
        
    * 更完整的描述[EDDGrid資料模型](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel).
    * 其EDDGrid數據集類型是 :
        *   [EDDGrid來自奧迪奧檔案](#eddfromaudiofiles)集合本地音效檔案的資料 。
        *   [EDDGrid從 Dap 中](#eddgridfromdap)處理從DAP伺服器。
        *   [EDDGrid從 EDD 可](#eddgridfromeddtable)讓您將表格数据集轉換成網格化的数据集 。
        *   [EDDGrid來自 Erddap](#eddfromerddap)處理遠端的網格化資料ERDDAP.
        *   [EDDGrid來自 Etopo](#eddgridfrometopo)只是處理內置的ETOPO地形資料
        *   [EDDGrid從檔案](#eddgridfromfiles)是一切的超級EDDGrid從...
        *   [EDDGrid來自 MorgeIRFiles](#eddgridfrommergeirfiles)集合本地端群組的資料.gz文件。
        *   [EDDGrid來自 Nc 檔案](#eddgridfromncfiles)集合本地群組的資料NetCDF  (v3 或 v4)  .nc和相關檔案。
        *   [EDDGrid來自 NcFiles 未包裝](#eddgridfromncfilesunpacked)如果EDDGrid來自 NcFiles , 此檔案也汇集了本地群組的資料NetCDF  (v3 或 v4)  .nc及相關檔案, 其中ERDDAP™放在低層
        *   [EDDGrid龍PM180](#eddgridlonpm180)修改孩子的經度值EDDGrid所以他們在180到180之間。
        *   [EDDGrid朗0360](#eddgridlon0360)修改孩子的經度值EDDGrid以便他們在0到360之間。
        *   [EDDGrid侧邊邊](#eddgridsidebyside)總和 2 或以上EDDGrid相邻的數據集。
        *   [EDDGrid聚合](#eddgridaggregateexistingdimension)總和 2 或以上EDDGrid數據集,每套都有不同的第一維值範圍,但其他維值相同。
        *   [EDDGrid复制](#eddgridcopy)可以在本地复制另一個EDDGrid本地副本中的資料及服務 。
             
    * 全部EDDGrid數據集支援 nThreads 設定, 它告訴ERDDAP™應答要求時要使用多少線程 。 看[n 串](#nthreads)详细文件。
         
### EDD 表格{#eddtable} 
*   [ **EDD 表格** ](#eddtable)數據集處理表格資料。
    * 表格資料可以表示為類似資料庫的表格,有行和列。 每列 (數據變數) 有一個名稱, 一组屬性, 只儲存一種資料 。 每列都有觀察 (或相關數值群) . 資料來源可能有不同的資料結構、更複雜的資料結構和/或多個資料檔案,但ERDDAP™需要將來源資料平整成類似資料庫的表格,以便将資料作为表格數據集提交使用者。ERDDAP.
    * 更完整的描述[EDDTable 資料模型](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel).
    * EDDTable 数据集類型為:
        *   [All Datasets 的 EDD 表格](#eddtablefromalldatasets)是高級的數據集, 它有您所有其它數據集的資訊ERDDAP.
        *   [Ascii 檔案中的 EDD 表格](#eddtablefromasciifiles)從逗號、 分號、 分號、 或空間分隔的 ASCII 資料檔中汇总資料 。
        *   [Ascii 服務的 EDD 表格](#eddtablefromasciiservice)是所有 EDD Table From Ascii Service 課的超級
        *   [Ascii Servicicenos 的 EDD 表格](#eddtablefromasciiservicenos)處理一些NOAANOS網絡服務.
        *   [AudioFiles 的 EDD表](#eddfromaudiofiles)集合本地音效檔案的資料 。
        *   [從 EDD 表格 AwsXml 檔案](#eddtablefromawsxmlfiles)自動氣象站的資料集合 (阿WS) XML 文件 。
        *   [來自卡桑德拉的EDD表](#eddtablefromcassandra)處理 Cassandra 表格中的表格資料。
        *   [ColumnarAscii 檔案中的 EMD 表格](#eddtablefromcolumnarasciifiles)總結表格 ASCII 資料檔中的有固定width 資料列的資料。
        *   [從 DapSequence 的 EDD 表格](#eddtablefromdapsequence)處理來自DAP序列伺服器。
        *   [數據庫中的 EDD 表格](#eddtablefromdatabase)操作一個數據庫表中的表格資料。
        *   [從 EDD 表格EDDGrid](#eddtablefromeddgrid)讓您從 :EDDGrid數據集。
        *   [EDD 表格來自 Erddap](#eddfromerddap)處理遠端的表格資料ERDDAP.
        *   [檔案名稱中的 EDD 表格](#eddtablefromfilenames)從伺服器檔案系統中的一组檔案的資訊建立數據集, 但是它不服務檔案內的資料 。
        *   [檔案中的 EDD 表格](#eddtablefromfiles)是從...
        *   [從 HttpGet 的 EDD 表格](#eddtablefromhttpget)是ERDDAP只有資料匯入和資料匯出系統 。
        *   [從 EDD 表格Hyrax文件](#eddtablefromhyraxfiles)  (已刪除) 總合檔案中的數個變數的數據[Hyrax OPeNDAP伺服器](https://www.opendap.org/software/hyrax-data-server).
        *   [來自 InvalidCRA 檔案的 IDD 表格](#eddtablefrominvalidcrafiles)總和資料來自NetCDF  (v3 或 v4)  .nc使用 CF DSG 相關列的變體的檔案 (CRA 磁碟) 文件。 雖然ERDDAP™支援此檔案類型, 是無效的檔案類型, 沒有人可以開始使用 。 目前使用此檔案類型的群組被強烈鼓勵使用ERDDAP™以產生有效的 CF DSG CRA 檔案, 並停止使用這些檔案 。
        *   [JsonlCSV 檔案中的 EDD 表格](#eddtablefromjsonlcsvfiles)總和資料來自[杰森 行 CSV 文件](https://jsonlines.org/examples/).
        *   [多晶格檔案的 IDD 表格](#eddtablefrommultidimncfiles)總和資料來自NetCDF  (v3 或 v4)  .nc包含若干個有共享尺寸的變數的檔案。
        *   [NcFiles 的 EDD 表格](#eddtablefromncfiles)總和資料來自NetCDF  (v3 或 v4)  .nc包含若干個有共享尺寸的變數的檔案。 繼續使用此數據集的類型可以, 但對於新的數據集, 我們建議使用 EDD Table From MultidimNcFiles 。
        *   [来自 NcCFF 的 EDD 表格](#eddtablefromnccffiles)總和資料來自NetCDF  (v3 或 v4)  .nc使用檔案格式的檔案[CF 分解采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)公约。 但對使用多面性 CF DSG 變體之一的檔案,使用[多晶格檔案的 IDD 表格](#eddtablefrommultidimncfiles)相反。
        *   [Nccsv 檔案中的 IDD 表格](#eddtablefromnccsvfiles)總和資料來自[NCCSV 檔案](/docs/user/nccsv-1.00)ASCII.csv 檔案.
        *   [EDD 表從NOS](#eddtablefromnos)  (已刪除) 處理 NOS XML 伺服器的表格資料。
        *   [排泄物表](#eddtablefromobis)處理 OBIS 伺服器的表格資料。
        *   [Parquet 檔案的 EMD 表格](#eddtablefromparquetfiles)處理來自[平面](https://parquet.apache.org/).
        *   [從 EDD 表格SOS](#eddtablefromsos)處理來自SOS伺服器。
        *   [來自垃圾的 EDD 表格](#eddtablefromthreddsfiles)  (已刪除) 總合檔案中的數個變數的數據[土 石OPeNDAP伺服器](https://www.unidata.ucar.edu/software/tds/).
        *   [從 EDD 表格WFS文件](#eddtablefromwfsfiles)  (已刪除) 做一個本地複製所有資料ArcGIS映射伺服器WFS伺服器使數據能很快重新保存到ERDDAP™使用者。
        *   [EDD 表格外加通道](#eddtableaggregaterows)可以從群組的 EDD Table 資料組中建立 EDD Table 数据集 。
        *   [EDD 表格](#eddtablecopy)可以在本地端复制許多類型的 EDDTable 数据集, 然后從本地端的複製中快速重新保存資料 。

  
- - –

## 數據集類型的详细说明{#detailed-descriptions-of-dataset-types} 

### EDDGrid從 Dap 中{#eddgridfromdap} 
[ **EDDGrid從 Dap 中** ](#eddgridfromdap)處理格子變數[DAP](https://www.opendap.org/)伺服器。

* 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 您可以收集您需要的資訊來調整, 或是建立自己的 XML 。EDDGrid從Dap 資料集看來, 來查看您的瀏覽器裡的來源數據集的 DDS 與 DAS 檔案 (加上 .das 和 .ddssourceUrl例如,[ https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds ](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds)) .
     
*   EDDGrid從 Dap 中可以從任何多維變數中取得資料DAP資料伺服器 。 (前身EDDGridFromDap 只限於指定為「 格麗德」 的變數, 但這已不再是條件 。)   
     
* 排序尺寸值 - 每個維度的數值必須排序 (升降) . 數值可以不规则的間距 。 不能有領帶。 要求[CF 中繼資料標準](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). 如果任何維度的數值沒有排序,數據集不會被載入,ERDDAP™表示日志文件中第一個未排序的值, *大家长會* /日志/log.txt.
    
未分類的維度數值 几乎總是表示來源數據集的問題 。 這最常發生於集合中包含一個錯名或不適當的檔案, 這會導致無類型的時間維度 。 要解決此問題, 請參考ERDDAP™找到冒犯時間值的log. txt 檔案 。 然後在來源檔案中查找对应的檔案 (之前或之后) 這不屬於集合。
    
#### EDDGrid從 Dap 骨架 XML{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
### EDDGrid從 EDD 可{#eddgridfromeddtable} 
[ **EDDGrid從 EDD 可** ](#eddgridfromeddtable)讓您將 EDD Table 表格数据集轉換成EDDGrid网格化的數據集 。 記住ERDDAP™將數據集視為[网格化的数据集 (子類EDDGrid) 表格数据集 (EDD 表格子類) ](#why-just-two-basic-data-structures).

* 通常,如果你有網格化的數據, 你只是設置了一個EDDGrid直接數據集。 有時這是不可能的 例如當你把數據儲存在 關聯數據庫裡時ERDDAP™只能通過 EDD Table 從數據庫存取 。EDDGrid從EDDable課上可以讓你改變這種情況
     
* 顯然,根據 EDDTable 数据集中的資料必須是 (基本上) 網格化的數據, 但以表格形式。 例如, EDDTable 數據集可能有 CTD 資料: 東向和北向流的測量, 在數個深度, 有數次 。 因為每個時點的深度都一樣EDDGrid從 EDDTable 中可以建立有時間和深度的網格化的數據集, 通过基本的 EDDTable 数据集存取資料 。
     
* 產生達塔斯 Xml -- 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 你可以收集你需要的資訊來改善粗略的草稿。
     
* 來源屬性 - 和其他所有的數據集一樣EDDGrid從表格中可以找到全球源屬性[全球addAttributes](#global-attributes)  (指定于datasets.xml) , 屬性, 是使用者看到的 。 全球源屬性,EDDGrid從 EDDTable 使用全局合併 基本 EDDTable 数据集的屬性 。 (如果你想一想,那就合理了) 
    
同样,每份axisVariable和dataVariable是[addAttributes](#addattributes),EDDGrid從 EDDTable 中使用變數的總和 根據 EDDTable 資料集的屬性EDDGrid從 EDDT 可變化的來源屬性 。 (如果你想一想,那就合理了) 
    
因此,如果 EDD Table 有好的中繼資料,EDDGrid從EDDable 通常不需要很多addAttributes中繼數據 - 只是一些微調 這里和那裡。
    
*   dataVariables 對axisVariables -- 根據 EDD表只有dataVariables. 安EDDGrid從 EDDT 可讀數據集會有一些axisVariables (從一些 EDD 表格建立dataVariables) 和一些dataVariables (從剩下的 EDD 表格建立dataVariables) .[產生 DatasetsXml](#generatedatasetsxml)會猜到哪個EDD表dataVariables 應該成為EDDGrid從 EDD 可axisVariables,但這只是一個猜測。 您需要修改 GenerateDatasetsXml 的輸出以指定哪個dataVariable將會變成axisVariables,按何顺序排列.
     
* 轴數值 - 根據EDD表沒有什麼可說的EDDGrid可從 EDDD 中分解axisVariables 在數據集的網格化版本中,所以您要提供每一個的資訊axisVariable通過其中一個屬性 :
    
    * 轴數值 -- 讓您指定一個數值清單。 例如,
        &lt;姓名="轴值"[類型="雙倍數"](#attributetype)2、2.5、3、3.5、4&lt;/at &gt;
注意使用a[資料型態](#data-types)加上名單 另外,列表的類型 (例如,雙倍) ,必須匹配數據 EDD 表格中的變數型態EDDGrid來自 EDDD 数据集 。
    * 轴式ValuesStartStrideStop - 讓您指定一個定期間距的數值序列, 指定開始、 速度和停止數值 。 以下是一個相当于以上轴數的例子:
        &lt;atname="轴式ValuesStartStop"[類型="雙倍數"](#attributetype)\\&gt;2, 0.5, 4&lt;/at &gt;
注意使用列表資料型態 。 另外,列表的類型 (例如,雙倍) ,必須匹配數據 EDD 表格中的變數型態EDDGrid來自 EDDD 数据集 。
         
    
更新 -- 就像沒有辦法EDDGrid從 EDDTable 開始可以決定 EDD Table 的轴數值, 也不存在可靠的方法EDDGrid從 EDDD 可從 EDD 表格中确定轴數值已變更 (特別是當時間變數有新值時) . 目前,唯一的解決辦法是改變轴數值屬性datasets.xml重新載入數據集。 例如,你可以寫作文稿到
    
    1. 搜尋datasets.xml用于
        datasetID=". *數據集ID* "
所以你正在用正確的數據集工作
    2. 搜尋datasets.xml下一次
        <sourceName> *變數來源Name* </sourceName>  
所以你是和正確的變數合作
    3. 搜尋datasets.xml下一次
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
所以你知道標籤的起始位置
    4. 搜尋datasets.xml下一次
```
        </att>  
```
所以你知道轴值的終端位置 。
    5. 以新值取代舊的開始、 踩踏、 停止值 。
    6. 聯繫[國旗網址](/docs/server-admin/additional-information#set-dataset-flag)要顯示的數據集ERDDAP™重新載入數據集。
    
這不理想,但很有效
     
* 精度 - 什麼時候EDDGrid從 EDDTable 中回應使用者的數據要求, 將一行數據從 EDDTable 回應表移到EDDGrid應答網格。 要做到這一點, 它必須弄清楚表格中指定列上的"轴"值是否匹配格子中的一些轴值组合 。 对于整數數數型態, 很容易确定兩個數值是否相等 。 但對浮點數和雙重數來說 這引發了浮點數的可怕問題[不完全匹配](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/). (例如,0.2比0.19999999999996) . 至 (試著) 處理這件事EDDGrid從表格中指定任何axisVariables, 指定十進位數字的總數, 必須是相同的 。
    * 例如,&lt;atname=“ 精度” 型態=“ int” &gt; 5&lt;/at &gt;
    * 对于不同類型的數據變數,有不同的預設精度值. 缺省數通常是适当的 。 如果不是,你需要指定不同的值。
    * 為axisVariable是[時間或時間 印表變數](#timestamp-variables),默认值是完全精确的 (完全匹配) .
    * 為axisVariables是浮點,默认精度是5
    * 為axisVariables是雙倍,默认精度是9
    * 為axisVariables 有整數位數類型,EDDGrid從 EDDTable 忽略精度屬性, 總是使用全精度 (完全匹配) .
         
    *    **警告&#33;** 如果EDDGrid從 EDDTable 無法將 EDD Table "轴" 值匹配到期望的值之一EDDGrid從 EDDD 轴值,EDDGrid悄悄地從EDDD (沒有錯誤) 從表格的那一行丟棄數據。 例如,可能還有其他資料 (不在網格上) 。 (若步步 &gt; 1,這不明顯EDDGrid從表格中, 哪些是想要的數值, 哪些是需要跳過的數值 。) 所以, 如果精度值太高, 使用者會在數據回應中看到錯誤的值, 當有效的數值實際存在時 。
        
反之, 如果精度值定得太低, EDD Table "轴" 值不應該符合EDDGrid從 EDDD 可切換轴值會 (錯誤的) 匹配。
        
這些潛在的問題很可怕 因為使用者得到的資料是錯的 (缺少值) 當他們得到正確的數據 (或至少是錯誤的消息) .
這不是瑕疵EDDGrid從表。EDDGrid從表格上看 解決不了這個問題 此問題在表格資料轉換成網格資料中是內在的 (除非可以做其他的假設 但不能在這裡做) .
由你決定ERDDAP™管理者,到 **測試你的EDDGrid完全從 EDDT 可** 避免這些可能存在的問題。
        
#### 缺口{#gapthreshold} 
*   [缺口](#gapthreshold)-- 這是非常不尋常的數據集 由于可以查詢的類型 (由) aEDDGrid数据集 (和速度axisVariables) 和可以查詢的類型非常不同 (由) EDD表格数据集 (只是和一些變數的範圍有關) ,EDDGrid從 EDDTable 數據集會因所提出的确切要求和基本 EDD Table 數據集的速度而大相径庭。 需要速度 1,EDDGrid從 EDDTable 可要求根據 EDD Table 取得相當大塊的數據 (好像步速=1) 並且將數據從某些行中移走 如果它需要筛选很多資料才能得到它需要的資料,那么要填充要求需要更久.
    
如果EDDGrid從 EDDable 中可以看出會有巨大的缺口 (有不想要的資料列) 包含想要的數據的列之間,EDDGrid從 EDDTable 可以選擇向根據 EDD Table 提出若干次子要求, 而不是一個大要求, 从而跳過大差距中不想要的數列資料 。 此決定的灵敏度受以下&lt;隔離範圍 &gt; 標籤 (預設值=1000列來源資料) . 設置隔阂範圍至更小的數字會導致數據集的建立 (一般) 更多的子要求。 設置空白值至更大的數量會導致數據集的建立 (一般) 更少的子要求。
    
如果缺口太小EDDGrid從 EDDTable 可操作得更慢, 因為多項要求的间接费用會比過些過量數據而节省的時間更大 。 如果缺口太大了EDDGrid從 EDDTable 中會更慢地運作, 因為會從 EDD Table 中取取出太多的過量資料, 只會被丟棄 。 (正如Goldilocks發現的 中間是"正確的") 不同類型的 EDDTable 資料集的间接费用相差很大, 所以要知道您數據集的实际最佳設定, 唯一的方法就是實驗 。 但你不會犯太過錯的 繼續遵守規定
    
一個簡單的例子是:EDDGrid從桌上只有一個axisVariable  (時間, 大小為 100 000) 一dataVariable  (溫度) ,和1000的缺省值。
    
    * 如果使用者要求溫度\\[0&#58;100&#58;5000\\]速度是100,所以差距大小是99, 低于差距。 所以EDDGrid從表格中只會對 EDDTable 提出一個要求, 要求所需的所有資料 (等於溫度\\[0: 5000\\]) 扔掉它不需要的所有數據
    * 如果使用者要求溫度\\[0:2500:5000\\]步數是2500 所以空隙大小是2499 比空隙安全帶大 所以EDDGrid從表會分別向 EDD Table 提出與溫度等效的要求\\[0\\]溫度\\[2500\\]溫度\\[5000\\].
    
當有多根斧頭時, 空隙大小的計算更複雜 。
    
每一個使用者要求,EDDGrid由 EDDT 列印與此相關的診斷訊息[log.txt](/docs/server-admin/additional-information#log)文件。
    
    * 如果[&lt;日志水平&gt;] (# 日志)  indatasets.xml被設定為資訊, 此列印信件如
===========
如果 nOuterAxes = 0, 空間範圍沒有被突破, 只有一個要求會被提交到 EDD Table 。
如果 nOuterAxes &gt; 0 , 空間範圍被突破, 而 nOuter 要求會被寫入 EDD Table , 對应于最左邊的 nOuterAxes 的每個要求的组合 。 例如, 如果數據集有 4axisVariable和dataVariable就像往東\\[時間\\]\\[纬度\\]\\[经度\\]\\[深度\\]左邊 (第一) 轴變數是時間 。
    * 如果&lt;日志水平 &gt;  indatasets.xml已設定到全部, 附加資訊會寫入log. txt 檔案 。
         
#### EDDGrid從 EDDD 骨架 XML{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### EDD* 從ERDDAP {#eddfromerddap} 
 **EDDGrid來自 Erddap** 處理遠端的網格化資料ERDDAP™伺服器。
 **EDD 表格來自 Erddap** 處理遠端的表格資料ERDDAP™伺服器。

*   EDDGrid從 Erddap 和 EDDTable From Erdddap 中與所有其他類型的數據集的行為不同ERDDAP.
    * 和其他類型的數據集一樣,這些數據集從來源取得數據集的資訊,並保存在內存中.
    * 和其他類型的數據集一樣,ERDDAP™搜尋數據集,顯示資料存取表 ( *datasetID* .html) ,或顯示 Make A 圖表 ( *datasetID* 圖片) ,ERDDAP™使用內存中的數據集的資訊。
    *   EDDGrid從 Erddap 和 EDD 表格 以Erddap为基础[网格/群組/联邦](/docs/server-admin/scaling)四,ERDDAPs, 高效分配 CPU 使用量 (大多是做地圖用的) 、 大數據中心的內存用量、 數據庫和帶寬用量 。
#### 重定向{#redirect} 
* 和其他類型的數據集不同,ERDDAP™接收從這些數據集取得數據或影像的要求,ERDDAP [重定向](https://en.wikipedia.org/wiki/URL_redirection)要求到遠端ERDDAP™伺服器。 其结果是:
    * 這很有效率 (CPU、內存和帶寬) 因為不然
        1. 复合材料ERDDAP™必須把要求寄給另一個人ERDDAP™  (需要時間) .
        2. 其他ERDDAP™必須取得數據, 重新格式化, 並傳送數據到合成器ERDDAP.
        3. 复合材料ERDDAP™必須接收資料 (使用寬度) 重塑它 (使用 CPU 與內存) ,並傳送資料到使用者 (使用寬度) . 重新定向要求并允許其他要求ERDDAP™將回應直接傳送使用者、 复合體ERDDAP™基本上不花 CPU 時間、 記憶體或帶寬 。
    * 重定向對使用者透明, 不管客戶端軟體如何 (瀏覽器或任何其他軟體或命令行工具) .
*   [你看得出來ERDDAP™](#redirect)不以設定來重定向任何使用者的要求&lt;重定向 &gt; 假設&lt;/ redirect &gt; , 但這否定了... From Erdddap dataset 類型的大部分優點 (主要是在前端消散ERDDAP™到遠端/ 后端ERDDAP) .
         
     
#### 訂閱{#subscriptions} 
通常,當EDDGrid從 Erddap 和 EDD 表格 來自Erddap是 (re) 裝入您的ERDDAP,他們試著透過遙控器加入遠端數據集的訂閱ERDDAP'email/ URL 訂閱系統 。 如此一來,每當遠端數據集變化, 遠端ERDDAP™聯絡人[設定數據集 標籤網址](/docs/server-admin/additional-information#set-dataset-flag)在你的ERDDAP™讓本地端的數據集重新載入 ASAP , 讓本地端的數據集總是完全更新並模仿遠端數據集 。 所以,這第一次發生,你應該得到一封電子郵件, 要求您驗證訂閱。 然而,如果當地人ERDDAP™無法發送電子郵件, 或是遙控器ERDDAP電子郵件/ URL 訂閱系統未啟用, 您應該發送遠端ERDDAP™管理員及要求手動新增 s/he [&lt;變更 &gt; ] (改變) ...&lt;切換到所有相關數據集的標籤以呼叫您的數據集[設定數據集 旗標網址](/docs/server-admin/additional-information#set-dataset-flag). 看你的ERDDAP™套件清單的每日報告 Flag 網址, 但只要傳送EDDGrid從 Erddap 和 EDDTable 從 Erddap 資料集到遠端ERDDAP™管理者。
    
這樣不行嗎? 您的本地資料集是否與遠端資料集不同步 ?
數件事情都必須正确運作 才能讓您的數據集保持更新 檢查其中的每件事物
    
    1. 你的ERDDAP™必須可以發送電子郵件 。 在您的設定中參考電子郵件設定 。
    2. 一般 (但不是總是) 你的ERDDAP是&lt;基底Url &gt; 和&lt;基底 HttpsUrl &gt; 不一定有連接埠號碼 (例如:8080、8443) . 如果有,就用[代理通道](/docs/server-admin/deploy-install#proxypass)移除 Url 的端口。
    3. 在你的設備.xml,&lt;訂閱至 RemoteErddapDataset &gt; 必須設定為真 。
    4. 當你當地的EDD... 從 Erddap 資料集重新載入, 它應該向遠端傳送要求ERDDAP™以訂閱遠端數據集。 在log.txt中查看是否發生了這事。
    5. 你應該收到一封電子郵件, 請您驗證訂閱要求 。
    6. 您必須點擊電子郵件中的連結來驗證訂閱要求 。
    7. 遙控器ERDDAP™應該說驗證是成功的 您可以隨時要求遠端的郵件ERDDAP™包含您待定且有效的訂閱清單 。 查看表格 *遠端 ErddapBase 網址* /erddap/訂閱/list.html.
    8. 當遠端數據集變更時 (例如,取得其他資料) 遙控器ERDDAP™應該試著聯繫您的旗手ERDDAP. 你不能檢查這個, 但你可以問遙控器的管理員ERDDAP™看這個
    9. 你的ERDDAP™應該收到建立旗手的請求 請在您的日志中查看「 setDatasetFlag.txt 」 。 (s) , 看看是否有與要求相關的錯誤訊息 。
    10. 你的ERDDAP™重新載入數據集 (也許不是馬上,而是盡快) .
         
#### 最新最大值 (時間) ?{#up-to-date-maxtime} 
EDDGrid/ Table FromErddap 資料集只會變更每套來源資料的儲存資訊 。["重載"](#reloadeverynminutes)和一些元数据變更 (例如,時間變數的actual\\_range) ,从而生成订阅通知。 如果來源數據集的資料常有變更 (例如,每秒新增數據) 使用["更新"](#updateeverynmillis)系統以注意到基底資料的频繁變更,EDDGrid/ Table FromErdddap 在下一個數據集"重載"之前不會被通知這些常見的變更,所以EDDGrid來自Erddap的表格不會完全更新 您可以變更來源數據集, 以最小化此問題 。&lt;重新載入 EveryNiminutes &gt; 至小數值 (60?) 以便有更多訂閱通知告知EDDGrid/ Table FromErddap 來更新它關於來源数据集的信息 。

或者,如果你的數據管理系統知道來源数据集有新的數據 (例如, 透過複製資料檔案的文稿) 如果不是太频繁 (例如,每5分鐘,或频率较低) 有更好的辦法

1. 不要用&lt;更新 EveryNMillis &gt; 以保持源資料集的更新 。
2. 設定來源数据集&lt;重新載入 EveryNminutes &gt; 到更大的數字 (1440年?) .
3. 讓文稿聯繫來源数据集[國旗網址](/docs/server-admin/additional-information#set-dataset-flag)复制到新資料檔後立即建立 。
     

這會使來源數據集完美更新, 使其產生訂閱通知, 會傳送至EDDGrid/ Table from Erddap 資料集。 那會導致EDDGrid/ Table from Erddap 資料集要完美更新 (5秒內新增資料) . 以及所有能有效做到的事 (不需要重新載入數據集) .
     
#### 不addAttributes,axisVariable,或dataVariable {#no-addattributes-axisvariable-or-datavariable} 
和其他類型的數據集不同, EDDTable FromErddap 和EDDGrid來自 Erddap 的數據集不允許全球&lt;addAttributes&gt;,&lt;axisVariable& gt;, 或&lt;dataVariable在 & gt; 區段datasets.xml那套數據 問題是,
    
1. 假設它被允許了 而你又增加了新的全球屬性
2. 當使用者問您ERDDAP™新的屬性會出現。
3. 但當一個用戶問你ERDDAP™您的資料檔案ERDDAP™將要求重定向到來源ERDDAP. 那ERDDAP™未知新的屬性。 所以如果它會建立一個有中繼資料的資料檔, 例如 a.nc檔案中,元数据將沒有新的屬性。

有兩條路要走:

1. 相信源碼的管理者ERDDAP™以修改元数据。
2. 而不是 EDD Table from Erddap, 使用[從 DapSequence 的 EDD 表格](#eddtablefromdapsequence). 或代替EDDGrid來自 Erddap, 使用[EDDGrid從 Dap 中](#eddgridfromdap). 這些 EDD 類型可以讓您高效連接到遠端的數據集ERDDAP™  (但不重定向數據要求) 他們允許你加入全球&lt;addAttributes&gt;,&lt;axisVariable& gt;, 或&lt;dataVariable在 & gt; 區段datasets.xml. 另一個不同: 您需要手動訂閱遠端數據集, 以便您的數據集ERDDAP™已通知 (通過[國旗網址](/docs/server-admin/additional-information#set-dataset-flag)) 遠端數據集有變更。 因此, 您正在建立新的數據集, 而不是連接到遠端數據集 。
         
#### 其他附注{#other-notes} 
* 出于安全原因EDDGrid從 Erddap 和 EDD 表格 從Erddap不支持&lt;可存取到 &gt;] (# 无障碍) 標籤和無法用於需要登入的遠端數據集( 因為它們使用 [S]&lt;可存取到 &gt;] (# 无障碍) .. 看ERDDAP是[安保制度](/docs/server-admin/additional-information#security)限制某些使用者存取一些数据集。
     
* 從開始ERDDAP™v2.10,EDDGrid從 Erddap 和 EDD Table 從 Erddap 支持 [&lt;可存取ViaFiles &gt;] (#可以存取的檔案) 标记。 和其他類型的數據集不同, 預設是真實的, 但只有來源數據集也有, 數據集的檔案才能存取ViaFiles&lt;可存取的ViaFiles &gt; 設定為真。
     
* 你可以使用[產生達塔斯 Xml 程式](#generatedatasetsxml)制作datasets.xml此數據集的區塊 。 但你可以輕易地手動做這些類型的數據集.
     
#### EDDGrid來自 Erddap 骨架 XML{#eddgridfromerddap-skeleton-xml} 
*   EDDGrid來自 Erddap 骨架 XML 數據集非常簡單, 因為其用意只是模仿已適用於ERDDAP:
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### EDD 表單來自 Erddap 骨架 XML{#eddtablefromerddap-skeleton-xml} 
* 用于 EDDTable FromErdddap 數據集的骨架 XML 非常簡單, 因為其用意只是模仿遠端數據集, 它已經適用於ERDDAP:
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGrid來自 Etopo{#eddgridfrometopo} 
[ **EDDGrid來自 Etopo** ](#eddgridfrometopo)只要服侍[ETOPO1 全球 1- Minute 嵌入梯形數據集](https://www.ngdc.noaa.gov/mgg/global/global.html)  (冰面, 已登記的格子, 二字節, 2字節整數 : etopo1===ice\\_g\\_i2.zip) 以ERDDAP.

* 只有兩個datasetIDs 支援於EDDGrid從Etopo, 您可以存取經度值 -180 到 180, 或是經度值 0 到 360 的資料 。
* 從來沒有子標籤, 因為數據已經在其中描述ERDDAP.
* 所以兩個選擇EDDGridEtopo 数据集是 (字面上) :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

### EDDGrid從檔案{#eddgridfromfiles} 
[ **EDDGrid從檔案** ](#eddgridfromfiles)是一切的超級EDDGrid從... 你不能用EDDGrid從檔案直接。 取而代之的是使用EDDGrid從檔案來處理特定檔案類型 :

*   [EDDGrid來自 MorgeIRFiles](#eddgridfrommergeirfiles)處理网格上的資料[合併.gz](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)文件。
*   [EDDGrid來自奧迪奧檔案](#eddfromaudiofiles)集合本地音效檔案的資料 。
*   [EDDGrid來自 Nc 檔案](#eddgridfromncfiles)處理网格上的資料[GRIB 灰姑娘](https://en.wikipedia.org/wiki/GRIB)文件,[HDF  (v4 或 v5)  .hdf](https://www.hdfgroup.org/)文件,[.nc毫升](#ncml-files)文件,以及[NetCDF  (v3 或 v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)文件。 這可能會和其他檔案類型一起工作 (例如,BUFR) 我們只是還沒測試過 如果你有興趣 請給我們一些樣本文件
*   [EDDGrid來自 NcFiles 未包裝](#eddgridfromncfilesunpacked)是EDDGrid從 NcFiles 處理網格化資料NetCDF  (v3 或 v4)  .nc及相關檔案, 其中ERDDAP™放在低層

目前, 不支援其他檔案類型 。 但加入其他檔案類型的支援通常相对容易. 有要求就聯繫我們 或者,如果你的資料是以舊的檔案格式寫成的,而你想離開,我們建議轉換檔案NetCDFv3.nc文件。NetCDF是一种廣泛支持的二進制格式, 允許快速隨機存取資料, 而且已經得到ERDDAP.

#### 從檔案詳情{#from-files-details} 
下列信息适用于以下所有子類:EDDGrid來自檔案

##### 现有维度的聚合{#aggregation-of-an-existing-dimension} 
所有變式EDDGrid從 Files 中可以將本地檔案的資料聚合, 每份文件都有 1 (或更多) 最左端的不同值 (第一) 尺寸,通常\\[時間\\],將汇总。 例如,尺寸可能是\\[時間\\]\\[高度\\]\\[纬度\\]\\[经度\\],而且檔案中可能有其中一個的數據 (或數) 時間值 (s) 每份文件。 結果的數據集似乎已將檔案的所有數據合并 。 集合的主要优点是:

* 集合數據集的大小可以比一個檔案大得多 。 (~2GB) .
* 对于近实时的資料, 很容易新增一個包含最新數據的檔案 。 你不用重寫整套資料

汇总要求如下:
* 本地檔案不需要相同dataVariables (中datasets.xml) . 數據集會有dataVariables 定義于datasets.xml. 如果指定的檔案沒有指定dataVariable,ERDDAP™。
* 全部dataVariables 使用相同的axisVariables/二 (中datasets.xml) . 檔案將依第一個 (最左) 維度, 按升序排序 。
* 每個檔案可能都有第一個維度的一個或多個數值的資料, 但檔案之間不能有任何重複 。 如果檔案對第一維度有不止一個值, 數值會依次排序, 沒有連結 。
* 所有檔案對其它所有維度的數值都完全相同 。 測試的精度由[匹配轴數](#matchaxisndigits).
* 所有檔案都完全相同[單位](#units)全部中繼資料axisVariable和dataVariables. 如果有問題, 你可以使用[NcML](#ncml-files)或[NCO](#netcdf-operators-nco)解決問題
         
##### 通过檔案名稱或全局元数据聚合{#aggregation-via-file-names-or-global-metadata} 
所有變式EDDGrid從檔案中也可以新增最左邊的檔案群組 (第一) 維度, 通常是時間, 基於從每個檔名中產生的數值或從每個檔案中一個全局屬性的數值中產生的數值 。 例如, 文件名可能包含檔案中資料的時間值 。ERDDAP™然后創造新的時間維度

與THREDDS中的相似功能不同,ERDDAP™總是建立axisVariable有數值 (按CF要求) 字串值 (CF 不允許的) . 而且,ERDDAP™將根據數據於數據來排序集合中的檔案axisVariable指定於每個檔案的值, 這樣轴變數就會一直有 CF 需要的排序值 。 THREDDS 方法在檔案名稱的基础上做個詞典排序, 導致集合 。 (CF 不允許的) 檔案名稱排序與來源不同axisVariable值。

建立其中一個集合ERDDAP™,您會定義新的最左邊 (第一)  [axisVariable](#axisvariable)有特殊,假的&lt;sourceName&gt;, 也就是說ERDDAP™從每個檔案中找到新維度值的地方和方式 。

* 假名的格式sourceName從檔案名中获得數值 (只是文件名.ex) 是
    \\*\\*~ *檔案Name* [資料 類型](#data-types) *,* 提取Regex *,* 抓取群組數量*
* 假名的格式sourceName從檔案的絕對路徑名稱中获得數值的
    \\*\\*~ *路徑Name* [資料 類型](#data-types) *,* 提取Regex *,* 抓取群組數量*
    \\[此路徑名稱總是使用'/'作為目錄分隔符號, 永遠不要「\\ 」 。\\]
* 假名的格式sourceName從全局屬性得到的值是
    \\*\\*~ *全局 :* 屬性 姓名 *,* [資料 類型](#data-types) *,* 提取Regex *,* 抓取群組數量*
* 假的sourceName選項與其它選項不同: 而不是建立新的最左邊 (第一)  axisVariable,以此取代目前值axisVariable從文件名中提取值 (只是文件名.ex) . 格式是
    \\*\\*~ *取代 來自 FileName* [資料 類型](#data-types) *,* 提取Regex *,* 抓取群組數量*
     

您需要提供的部分描述如下:

*    *屬性 姓名* -- 每個檔案中包含維度值的全局屬性名稱 。
*    *資料 類型* -- 此指定要儲存數值的資料類型 。 參考[資料 類型](#data-types)那ERDDAP™支援, 但在此不允許字符串, 因為在ERDDAP™不能是弦變數 。
    
另有伪數據 Type, Time Format= *字串 時間格式* 表示ERDDAP™值是字串時刻戳[适合字符串時間的單位](#string-time-units). 在大多數情况下, 您需要的字串TimeFormat 是其中一個格式的變化 :
    
    *   yyyy-MM-dd'T'HH: mm: s. SSSZ - 是ISO 8601: 2004 (英) 日期格式。 你可能需要簡化的版本,例如,yyyy-MM-dd'T'HH:mm:s或yyyy-MM-dd.
    * yyyMMddHhmms.SSS - 是ISO 8601日期時間格式的紧凑版本 。 你可能需要簡化的版本, 例如: yyymmddhmms 或 yyymmdd 。
    * 男/女 H: mm: ss. SSS - 是美國斜日格式 。 您可能需要簡化的版本, 例如 M/d/yyyy 。
    * yyyDDHHHmmsSS -- -- 是一年加上一年零增加的一天 (例如, 001 = Jan 1, 365 = Dec 31 in a non leap year;這有時被誤稱為朱利安日期) . 您可能需要簡化的版本, 例如 YyyDD 。
    
如果您使用此假數據Type, 請加入新變數&lt;addAttributes&gt; :
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
如果您要移動所有時間值, 請按單位移動時間值, 例如 ,
1970-01-01T12:00Z.
*    *提取Regex* -- 就是這個[正则表示式](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) 包含抓取群組 (括弧) 描述如何從檔名或全局屬性值中提取值 。 例如, S19980011998031. L3b%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%.nc,抓取群組 # 1, "\\d教程",在正規表示S中 (~\\d教程) ~\\d教程\\.L3b. \\\ 将抓取“ S” 之后的前7位數 : 1998001 。
*    *抓取群組數量* -- 這是抓取群組的數字 (在一對括弧內) 包含關注信息的正则表示式中。 通常是第一個捕捉群 有時您需要將抓取群組用于 regex 中的其他目的, 所以重要的抓取群組數字會是 2 (第二捕捉群組) 或 3 (第三次) 等

完整的示例axisVariable它使一個有新時間轴的集合數據集, 從每個檔案的檔名中取得時間值是
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
當您使用"timeFormat="的假數據時 型態,ERDDAP™將新增 2 個屬性到axisVariable使 他 們 貌 似 從 源 頭 來
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
所以就這樣ERDDAP™將建立一個新轴, 命名為"time"雙數值 (自1970-01-01T00:00Z起的秒) 取出文件名中“ S” 之后和“ .L3m” 之前的 7 位數, 并将這些數字解譯為 yyyDD 格式化的時間值 。

您可以超過預設的基數時間 (1970-01-01T00:00Z) 新增[新增屬性](#addattributes)指定不同基期的不同單位屬性。 通常的情況是: 有數據檔案群組, 每個群組都有衛星數據集的1天合成器, 您想要將時間值當為文件名稱中提及的日子的正午 。 (每一天的中心時間) 想要變數long\\_name以「 以時間為中心」 。 例如:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
注時數=基准時間12,相对于1970-01-01T00:00Z的原始基准時間增加了12小時.

完整的示例axisVariable它使集合的數據集具有新的「 執行」 轴 (有直列值) 從每個檔案的「 runID」 全局屬性中取得執行值 (包含「 r17QQGlobal 」 等值, 其中 17 是 run number) 是
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
注意使用抓取群組 2 來抓取「 r 」 或「 's 」 之後、 QQGlobal 之後的數字 。 此示例也顯示如何新增屬性 (例如,ioos\\_category單位) 到轴變數。
     
#### 外部壓縮檔案{#externally-compressed-files} 
* 數據集是EDDGrid從檔案與 EDD 表格 從 Files 可以直接從外部壓縮的資料檔服務資料, 包括.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2和.Z文件。
     
*    **這工作很出色**   
大多數情况下, 如果您需要保留磁碟空間, 我們強烈地鼓勵使用此功能, 特別是對很少存取的舊檔案 。
     
*    **省省吧&#33;**   
這是其中少有的功能之一ERDDAP™這讓你有機會省很多錢 (但以稍有降低的效绩為代价) . 如果壓縮比是例如 6:1 (有時候會高很多的) ,那么数据集的數據檔只需要磁碟空間的1/6。 也許你可以用1RAID通過 (大小) 而不是6例艾滋病 (大小相同的) . 這是巨大的成本节省。 希望能在收藏中压缩一些檔案 (老的?) 而不压缩其他的 (新的?) ,而且要隨時改變它,讓我們把一些檔案的下限最小化 (更慢的存取) . 如果選擇是在磁帶上儲存檔案 (且只可按要求存取,在延遲之后) vs 將它們儲存在 RAID 上 (且可通过ERDDAP) ,那么使用壓縮有巨大的優勢,以便使用者有互動性和 (相对) 快速存取資料 。 如果這能讓你省省多買一個RAID, 這個功能可以省下大约30,000美元.
     
* 為了所有人EDDGrid來自 Files 子類別, 如果資料檔有延伸檔, 表示它們是外部壓縮的檔案 (目前:.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2,或.Z) ,ERDDAP™將檔案解壓到數據集的快取目錄,當它讀取它們時 (如果它們不在缓存中) . 二進制檔案也一樣 (例如,.nc) 檔案中的 EDD Table 子類。
     
* 非二進制檔案的 EDDTable fromFiles 子類 (例如.csv) ,带有延伸檔的數據檔,表示它們是外部壓縮的檔案,在檔案讀取時會在飛行中解壓。
     
* 需要: 如果使用的外部壓縮檔案型態 (例如,.tgz或.zip) 在壓縮檔案中支援多于 1 個檔案, 壓縮檔案必須只包含 1 個檔案 。
     
* 需要: 此特性假設外部壓縮檔案的內容不會變更, 以便缓存的解壓檔案可以重用 。 如果數據集的數據檔有時會變更, 請不要壓縮這些檔案 。 這符合通常的用法, 因為人們通常不压缩他們有時需要改變的檔案。
     
*   &lt;檔案Name Regex &gt; 要讓這工作,數據集的&lt;檔案Name Regex &gt; 必須符合壓縮的檔案名稱。 顯然,regexs像...\\*符合所有檔案名稱。 如果您指定特定檔案類型, 例如 .\\*\\.nc,然后需要修改正则ex以包含壓縮延伸,例如 .\\ *\\.nc\\.gz(如果所有的檔案都會是)* 某事*.nc.gz文件).
     
* 如果您的數據集包含一些被壓縮而非壓縮的檔案, 那就沒事了 。 如果您相信一些檔案, 這可能會有用 (例如, 舊檔案) 將少數使用, 因此用压缩來儲存磁碟空間會有用 。 為了讓這個工作,&lt;檔案Name Regex&gt; 必須符合壓縮的檔案名稱, 例如 。\\*或.\\*\\.nc (|\\.gz) (其末的抓取群組指定.gz是可選的。
     
* 隨時可以壓縮或解壓收藏中的特定檔案。
如果數據集不使用[&lt;更新 EveryNMILIS &gt; (# 更新每個人 #) ,设置数据集[旗號](/docs/server-admin/additional-information#flag)要告訴ERDDAP™重新載入數據集, 从而注意到變更 。 有趣的是, 您可以用不同的壓縮算法與設定值來對同一數據集中不同的檔案 (例如,.bz2因為很少使用檔案,.gz對不常使用的檔案, 對常使用的檔案沒有壓縮) ,只要確保regex支持所有正在使用的檔案扩展名,例如 ..nc (|\\.gz|\\.bz2) .
     
* 當然,不同壓縮算法的壓縮比率和速度因來源檔案和設定而异 (例如, 壓縮等級) . 如果您要优化您的檔案, 請用您的檔案和一系列的壓縮設定來測試不同的壓縮方法 。 如果你想要可靠的好 (不一定是最好的) 安排,我們稍作建議gzip  (.gz) .gzip不做最小的壓縮檔案 (差不多了) 但是它會很快壓縮檔案 (更重要的ERDDAP™使用者) 快速解壓檔案 。 而且gzip軟體與所有 Linux 和 Mac OS 的安裝都符合標準, 例如,將來源檔案壓縮到.gz文件版本 (相同的檔名, 但是.gz附 件) 使用 (在 Linux 、 Mac OS 和 Git Bash 中)   
    gzip  *sourceName*   
解壓.gz檔案返回原檔, 使用
 gun *sourceName.gz*   
要壓縮目錄及其子目錄中的每個來源檔案, 遞迴使用
    gzip- 呃 *導演Name*   
分解每一個.gz檔案在目錄及其子目錄中, 遞迴, 使用
gunzip -r *導演Name*   
     
* 警告:不要外部压缩 (gzip) 已內部壓縮的檔案 &#33;
很多檔案已經在內部壓縮資料 。 如果你gzip這些檔案, 產生的檔案不會小很多(&lt;5%)和ERDDAP™當它需要讀到的時候 會浪費時間去壓抑它們 例如:
    
    * 資料檔:例如,.nc4,和.hdf5 份文件 : 有些檔案使用內部壓縮;有些沒有。 如何分辨 : 壓縮的變數有「 QQChunkSize 」 的屬性 。 而且,如果一群格子.nc或.hdf文件都不同大小,很可能是內部壓縮的 。 如果它們都一樣大, 它們就不會被內部壓縮。
    * 影像檔案:例如:.gif、.jpg和.png
    * 音效文件:例如:.mp3和.ogg。
    * 影像檔案:例如:.mp4、.ogv和.webm。
    
        
一個不幸的奇怪案例: . 压缩一下就好了 (gzip) 但一般情况下你不該 因為如果這樣 使用者就無法在瀏覽器中播放壓縮檔案 。
     
* 測試大小寫: 壓縮 (與gzip) 包含 1523 格的數據集.nc文件。
    
    * 來源檔案中的資料很少 (很多缺失的數值) .
    * 磁碟總空間從57 GB 壓縮前, 到 7 GB 之後 。
    * 1 時點數量數量的要求是&lt;压缩前后1 s.
    * 365 時間點的 1 個資料點的要求 (最糟的情況) 從4s到71s
         
    
對我來說 這對任何數據集來說都是合理的取舍 當然對數據集來說也是不常用的
     
* 內部對外部壓縮...
相對於內部檔案壓縮.nc4和.hdf5份文件,ERDDAP外部壓縮二進制檔案的方法有利弊 。 內部壓縮效果更好,EDDGrid從檔案中只需要解壓幾塊 (s) 檔案中,不是全部檔案。 但是ERDDAP方法有一些优点:
    
    *   ERDDAP™支援壓縮所有類型的資料檔 (二進位和非二進位,例如,.nc3和.csv) 不只是.nc4和.hdf4.
    * 如果在短時間內需要讀取多個檔案, 就可以省下一次解壓, 多次讀取它 。 這是發生在ERDDAP™當使用者使用 Make-A- Graph 的數據集並對圖表做一系列小的變更時 。
    * 在同一收藏中有壓縮檔案而不壓縮檔案的能力, 允許您對哪些檔案被壓縮而哪些不是 。 此新增的控件來源並沒有真正修改來源檔案 (因為您可以壓縮檔案 例如,.gz然后解壓以取得原始檔案) .
    * 隨時變更檔案是否被壓縮及如何壓縮的能力 (不同的算法和設定) 讓你更能控制系統的性能 你可以隨時找回原始的未壓縮檔案
    
雖然在一切情況下,ERDDAP外部壓縮檔案的資料服務能力使外部壓縮可以合理替代內部壓縮.nc4和.hdf5. 內部壓縮是人們選擇使用的主要原因之一.nc4和.hdf5.
     
##### 已解壓快取{#decompressed-cache} 
ERDDAP™使任何压缩二進制的版本解壓 (例如,.nc) 需要讀取檔案時的資料檔 。 解壓的檔案保存在數據集的目錄中 *大家长會* /解press/. 已解壓的檔案最近沒有使用過, 當累积檔案大小為 &gt; 10GB 時會被刪除以釋放空間 。 你可以用設定來改變它&lt;已解壓CacheMaxGB &gt; (缺省=10) 資料集 Xml.xml,例如,
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
另外, 在过去15分鐘內尚未使用的已解壓的檔案將在每個主要數據集重新載入的開始時被刪除 。 你可以用設定來改變它&lt;已解壓的CacheMaxMinutesOld &gt; (缺省=15) 資料集 Xml.xml,例如,
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
數量越大越好, 但解壓檔案的累积大小可能會造成 *大家长會* 以耗盡磁碟空間,
     
* 因為解壓檔案需要很多時間 (0.1至10秒) , 使用壓縮檔案的數據集可能會從設定數據集的 [&lt;nthreads &gt;] (正弦) (無線索) 設定到更高的數字 (二? 三? 四?) . 越多越好 (例如5? 6? 七?) 正在減少回報, 一個使用者的請求可以使用高比例的系統資源, 从而大大減慢了其他使用者的請求的處理。 因此,沒有理想的 nThreads 設定,
         
#### 排序尺寸值{#sorted-dimension-values} 
每個維度的數值必須排序 (升降,但第一次除外 (最左) 一定要上升的維度) . 數值可以不规则的間距 。 不會有帶子的 要求[CF 中繼資料標準](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). 如果任何維度的數值沒有排序,數據集不會被載入,ERDDAP™表示日志文件中第一個未排序的值, *大家长會* /日志/log.txt.
    
未分類的維度數值 几乎總是表示來源數據集的問題 。 這最常發生於集合中包含一個錯名或不適當的檔案, 這會導致無類型的時間維度 。 要解決此問題, 請參考ERDDAP™找到冒犯時間值的log. txt 檔案 。 然後在來源檔案中查找对应的檔案 (之前或之后) 這不屬於集合。
    
#### 目錄{#directories} 
檔案可能放在一個目錄中, 或是放在一個目錄及其子目錄中 (遞迴) . 如果檔案很多 (例如, &gt; 1 000) 操作系統 (因此EDDGrid從檔案) 如果您將檔案儲存在一系列子目錄中, 操作效率會高得多 (每年一次, 或每月一次 。) ,所以在指定的目錄中永遠不會有大量的檔案。
     
#### &lt;從Url快取@ info{#cachefromurl} 
全部EDDGrid從 File 和 所有 EDD Table From Files 資料集中支持一套顯示的標籤ERDDAP™以下載並維持遠端數據集所有檔案的複本, 或是一些檔案的缓存 (按需要下載) . 這會很有用 看[快取 從Url 文件](#cachefromurl).
    
#### 遠端目錄和 HTTP 範圍要求{#remote-directories-and-http-range-requests} 
 (AKA 位元伺服、 位元範圍要求、 接受範圍http信頭)   
EDDGrid從 NcFiles 、 從 MultidimNcFiles 、 從 NcFiles 的 EDD Table 、 從 NcFiles 的 EDD Table 、 從 NcCFiles 的 EDD Table , 可以 *有時候* 服務資料來自.nc遠端伺服器上的檔案, 如果伺服器支持, 可通过 HTTP 存取[字元伺服](https://en.wikipedia.org/wiki/Byte_serving)通过 HTTP 範圍要求 (位元組服務的 HTTP 機制) . 這有可能 因為Netcdf -java (其中ERDDAP™用于讀取.nc文件) 支援從遠端讀取資料.nc檔案通過 HTTP 範圍要求 。

 **別這樣&#33;** 其效率低得令人毛骨悚然。
相反,使用[&lt;快取自Url&gt;系統] (牧羊人) .

存取ERDDAP™資料集為檔案, 通過位元範圍要求 --
翻轉這個,因為你可以 (理論上) 想到數據集ERDDAP™作為巨人.nc附加檔案 ".nc" 到基地OPENDAP給定數據集的 URL (例如, https://myserver.org/erddap/griddap/datasetID.nc 并在此之後加入一個 ? query 指定子集) 也許可以問一下你能否使用Netcdf-javaFerret,或者其他NetCDF要讀取資料的客戶端軟體 HTTP 範圍要求ERDDAP. 答案是否定的,因為沒有真正的大。".nc" 文件。 如果你想這樣做,就做其中一個選擇:

* 使用(OPeN)DAP要連接至 gradap 服務的客戶端軟體ERDDAP. 就是這個DAP  (因此ERDDAP) 設計的 它非常有效。
* 或者,下載來源檔案 (s) 從"files"系統 (或子集檔案.nc? 查詢) 到你的電腦上 使用Netcdf -java,Ferret,或者其他NetCDF要讀取的客戶端軟體 (現在) 本地檔案 (s) .
         
#### 已儲存的檔案資訊{#cached-file-information} 
當EDDGrid從 Files 資料集中先載入,EDDGrid從 Files 從所有相關檔案讀取資訊並建立表格 (每個檔案一行) 包含每個合法檔案和每個"壞"的資訊 (不同或無效) 文件。
* 表格也保存在磁碟上, 因為NetCDFv3.nc文件在 *大家长會* /dataset/ *上2 CharsOfDatasetID 中* / *datasetID* / 在命名的檔案中 :
目錄表.nc  (擁有獨有目錄名稱的清單) ,
文件 表.nc  (以每個合法檔案的資訊持有表格) ,
壞檔案.nc  (以每個不良檔案的資訊儲存表格) .
* 以加速存取 aEDDGrid從檔案資料集中 (但卻不惜用更多的記憶力) 您可以使用
>   [<fileTableInMemory>true</fileTableInMemory>](#filetableinmemory)  
要告訴ERDDAP™以保留檔案資訊表的副本。
* 磁碟上的檔案資訊表格副本也有用, 當ERDDAP™已關閉並重新啟動: 它保存EDDGrid從 Files 從需要重新讀取所有的資料檔 。
* 重新載入數據集時,ERDDAP™只需要讀取已變更的新檔案中的資料 。
* 如果檔案的結構與其它檔案不同 (例如,其中一個變數的數據型態不同,或者對這個變數的數值不同。[單位](#units)" 屬性) ,ERDDAP將檔案加入「 壞」 檔案清單 。 關於檔案問題的資訊會寫入至 *大家长會* /logs/log.txt檔案.
* 你不需要刪除這些文件 也不需要處理這些文件 一個例外是: 如果您仍在修改數據集datasets.xml設定, 您可能要刪除這些檔案以強迫ERDDAP™重新讀取所有檔案, 因為檔案會被不同的讀取/ 解讀 。 如果您真的需要刪除這些檔案, 您可以在ERDDAP™正在執行中。 (然后設置[旗號](/docs/server-admin/additional-information#set-dataset-flag)以立即重新載入數據集。) 然而,ERDDAP™通常注意:datasets.xml資訊與檔案不符 表格信息和自動刪除檔案表格 。
* 如果你想鼓勵ERDDAP™更新已儲存的數據集資訊 (例如,如果你只是新增、移除或更改了數據集資料目錄的一些檔案) 使用[旗子系統](/docs/server-admin/additional-information#flag)強制ERDDAP™以更新已儲存的檔案資訊 。
         
#### 處理要求{#handling-requests} 
當客戶的數據要求被處理後EDDGrid從 Files 可以快速在表格中尋找有效的檔案資訊來查看哪些檔案有所要求資料 。
     
#### 更新已{#updating-the-cached-file-information} 
當重新載入數據集時, 已儲存的檔案資訊會更新 。
    
* 數據集定期重新載入,由&lt;在數據集的資訊中重新載入EveryNiminutes &gt;datasets.xml.
* 數據集隨時會重新載入ERDDAP™探測到您新增,移除,[触摸'd](https://en.wikipedia.org/wiki/Touch_(Unix)) (更改檔案中最後的 修改時間) ,或更改了資料檔。
* 若您使用此資料, 數據集會尽快重新載入 。[旗子系統](/docs/server-admin/additional-information#flag).

重新載入數據集時,ERDDAP™比較目前可用的檔案與已儲存的檔案資訊表格 。 已讀取新檔案, 并新增到有效的檔案表格 。 已不存在的檔案從有效的檔案表格中移除 。 已讀取檔案時間戳已變更的檔案并更新其信息 。 新表格取代了舊表格的內存和磁碟。
     
#### 壞文件{#bad-files} 
錯誤檔案的表和錯誤的原因 (已損毀的檔案, 缺少變數等 。) 已發送至郵件 一切 到電子郵件地址 (可能是你) 每次重新載入數據集時 。 您應該盡快取代或修復這些檔案 。
     
#### 缺少變數{#missing-variables} 
如果一些檔案沒有一些dataVariables 在數據集中定義datasets.xml大塊,沒關係。 什麼時候EDDGrid從 Files 讀取其中的一個檔案, 它會表現成檔案有變數, 但所有的數值都缺失 。
     
#### FTP 麻煩/助理{#ftp-troubleadvice} 
如果您是 FTP 的新資料檔到ERDDAP™伺服器時ERDDAP™在跑,有機會ERDDAP™將會在 FTP 行程中重新載入數據集 。 它發生得比你想像的多&#33; 如果發生了, 檔案似乎合法 (它有有效的名稱) , 但此檔案尚未有效 。 如果ERDDAP™試著從不合法的檔案讀取資料, 結果的錯誤會使檔案新增到不合法的檔案表格中 。 不妙 避免此問題, 在 FTP 中使用一個临时檔名, 例如 ABC2005.ncXQEMP 。 然后, 檔案Name Regex 測試 (见下文) 將顯示此檔案不相關 。 FTP 行程完成後, 將檔案重新命名為正確的名稱 。 重新命名的行程會讓檔案在一瞬間變得相关 。
     
#### "0文件" 錯誤訊息{#0-files-error-message-1} 
如果你跑[產生 DatasetsXml](#generatedatasetsxml)或[達斯Dds](#dasdds)或者如果你試著加載EDDGrid從...ERDDAP™,您會收到"0檔案"的錯誤訊息,表示ERDDAP™在目錄中找到 0 匹配的檔案 (當你認為目錄中有匹配的檔案時) :
    * 請檢查檔案是否真的在目錄中 。
    * 請檢查目錄名稱的拼寫 。
    * 檢查檔案Name Regex 。 真的,真的很容易犯錯 為了試驗目的, 試試所有檔案的 regex 。 (看這個[regex 文件](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)和[regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * 檢查執行程式的使用者 (例如,使用者=Tomcat (?) 托姆卡特/ERDDAP) 已讀取檔案的權限 。
    * 在一些操作系統中 (例如, SELinux) 依據系統設定, 執行此程式的使用者必須有「 讀取」 的權限, 才能將目錄連結到有檔案的目錄 。
         
#### EDDGrid從檔案骨架 XML{#eddgridfromfiles-skeleton-xml} 
*    **骨架 XML** 所有人EDDGrid檔案子類別為 :

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD* 来自奧迪奧檔案{#eddfromaudiofiles} 
 **EDDGrid來自奧迪奧檔案** 和 **AudioFiles 的 EDD表** 收集本地音效檔案的總合資料 。 (這些最早出現在ERDDAP™v1.82.) 不同的是EDDGrid來自 AudioFiles 將數據視為多维數據集 (通常有2維 :\\[文件開始 時間\\]和\\[已過 檔案內的時間\\]) , 而 EDD Table From AudioFiles 將數據當作表格資料 (通常有列的檔案啟動時, 過時時與檔案, 以及音效頻道的資料) .EDDGrid從 AudioFiles 中需要所有檔案的樣本數量相同, 所以如果不是, 您必須使用 EDDTable From AudioFiles 。 要不然, 選擇要使用的 EDD 類型完全由你決定 。 EDDTable FromAudioFiles 的一個優點: 您可以用其他資訊加入其他變數, 例如,stationID泰普站 在兩種情況中,缺乏统一的時間變數使得更難於使用這些 EDD 類型的資料,但並沒有建立统一的時間變數的好方法.

看這些班級的超級班級[EDDGrid從檔案](#eddgridfromfiles)和[檔案中的 EDD 表格](#eddtablefromfiles)以了解這個課程如何運作及如何使用。

我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 由于音效檔案除了與音效數據編碼相關的資訊之外,沒有其他的中繼資料,所以您必須編輯 GenerateDatasets 的輸出 Xml 以提供基本信息 (例如,标题、摘要、creator\\_name制度、歷史) .

細節 :

* 音效檔案格式很多。 目前,ERDDAP™可以讀取 .wav 和 .au 文件的資料 。 它目前無法讀取其他類型的音效檔案,例如:.aiff或.mp3. 如果您需要其他 . wav 和.au 的音效檔案格式或其他變體支援, 請將您的請求郵件給 Chris 。 約翰在諾亞戈夫 或者,作為你現在可以使用的工作環境, 你可以把你的音效檔案轉換成PCMQQ 簽名 (整數資料) 或 PCM\\_FLOAT (浮點數據) . wav 文件如此ERDDAP™可以和他們合作
* 目前,ERDDAP™可以用什么讀取音效檔案Java校對:SoupERDDAP™轉換 PCMQUNSIGNED 值 (例如,0至255) 輸入已簽署的數值 (例如, -128至128) 重新排列數值中的位元。ERDDAP™將 ALAW 和 ULAW 從原生編碼字节格式編碼成簡稱 (英寸16) 值。 自Java想要真正的數據ERDDAP™重新排列用 bigEndian=false 儲存的數據位元組 (小印度人) 要正确讀取數值。 其他編碼 (PCM 磁碟) ,ERDDAP™正在讀取數據 。
* 什麼時候ERDDAP™從音效檔案讀取資料, 它會將檔案可用的音效中繼資料轉換成全局屬性 。 這永遠包括 (顯示樣本數值) 
    
字符串音效BigEndian "假"; // true 或 fulse
 int 音效 通道1;
串行音效編碼「 PCM 」 ;
浮動音效FrameRate 96000.0; //每秒
int 音效FrameSize 2; // # 每帧數據位元組
浮動音效SampleRate 96000.0; //每秒
 int 音效SampleSize InBits 16; // # 每樣頻道的位元
    
為ERDDAP目的, 框架是樣本的同义詞, 這是一次的數據 。
屬性於ERDDAP™將會有資訊描述來源檔案中的資料。ERDDAP™在讀取資料時常會變更此項, 例如 PCM\\_UNSIGNED, ALAW, 和 ULAW 編碼的資料會轉換成 PCM\\_SIGNED, 且 bigEndian=假資料會轉換成 bigEndian=真數據 。 (就是這樣Java想看) . 數值ERDDAP™永遠是[PCM 編碼](https://en.wikipedia.org/wiki/Pulse-code_modulation)資料值 (即音波的簡單數位化樣本) .
* 什麼時候ERDDAP™從音效檔案讀取資料, 它會讀取整個檔案 。ERDDAP™每個頻道可以讀取20億個樣本 例如,如果采样率是每秒44100個采样,20億個采样就轉換成每份文件約756分鐘的音效資料. 如果您的音效檔案有以上數量的數據, 您需要將檔案分拆成更小的區塊, 以便ERDDAP™可以看
* 因為ERDDAP™讀取整個音效檔案,ERDDAP™必須有大量內存才能使用大型音效檔案 。 看[ERDDAP內存設定值](/docs/server-admin/deploy-install#memory). 如果這是個問題,你現在可以做的是 把檔案分解成小塊ERDDAP™可以用更少的記憶讀取
* 有些音效檔案寫錯 。ERDDAP™做點小努力來處理這些案子 但總而言之 如果有錯誤ERDDAP™將會丟出一個例外 (拒絕此檔案) 或 (如果錯誤無法辨識) 讀取資料 (但數據會不正確) .
*   ERDDAP™不檢查或改變音量。 最理想的是, 整數音效數據被調整成使用數據類型的全部範圍 。
* 音效檔案和音效播放器沒有缺失值的系統 (例如: -999 或 Float.NaN) . 所以音效數據不該有漏掉的數值 如果缺少數值 (例如, 如果您需要長長音效檔) 使用一連串的0, 被理解成完美的沉默。
* 什麼時候ERDDAP™從音效檔案讀取資料, 它總是會建立一個叫做已過的列 每個樣本的時間數秒 (儲存為雙倍) ,相对于第一個樣本 (指定已過 時間=0.0秒) . 用EDDGrid從 AudioFiles 中, 這會成為過程轴變數 。
*   EDDGridAudioFiles 要求所有的檔案都有相同的樣本 。 所以,如果這不是真的,你必須使用 EDDTable FromAudioFiles。
* 為EDDGrid從奧迪奧費爾斯,我們建議你設置&lt;維度數值( E) (#二元值集成品) 假 (由 GenerateDatasets 建議 Xml 命令) 因為時間維度常常有很多價值
* 為EDDGrid從AudioFiles,你幾乎應該總是使用EDDGrid從檔案系統[經 文件名](#aggregation-via-file-names-or-global-metadata)幾乎總是抽取錄音的開始日期 檔案名的時間 。 例如,
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
產生達塔斯 Xml會鼓勵你這麼做 幫助你
* 對於 EDD Table FromAudioFiles, 您應該幾乎總是使用 EDD Table FromFiles 系統[\\*\\*%% file 假名NamesourceNames](#filename-sourcenames)從檔案名稱中提取資訊 (几乎總是開始日期 錄音時間) 并升格為數據專欄 例如,
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
以單位屬性指定時間格式:&lt;atname="單位" &gt;yyMMdd'\\_'hmmss&lt;/at &gt;
     
### EDDGrid來自 MorgeIRFiles{#eddgridfrommergeirfiles} 
[ **EDDGrid來自 MorgeIRFiles** ](#eddgridfrommergeirfiles)汇总本地、[合併](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)檔案,來自[热带降雨量 (毫米) ](https://trmm.gsfc.nasa.gov)太空总署和日本宇宙航空研究开发机构 (日本) . 合併 IR 檔案可以下載自[NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/).

EDDGrid來自MorgeIRFiles.ERDDAP™R.Tech工程公司的Jonathan Lafite和Philippe Makowski (授權: 已發權的開放源碼) .

EDDGrid從MorgeIRFiles看,

*   EDDGrid來自 MorgeIRFiles 的支援 。 例如, 這讓您可以壓縮那些很少存取的舊檔案, 但是不壓縮常存取的新檔案 。 或者,你可以改變壓縮型態的原型 。 例如,.gz.
* 如果您對同一目錄中相同的資料檔案有壓縮和未壓縮的版本, 請確認&lt;您的數據集的檔名Name Regex&gt; 符合您想要它匹配的檔案名, 不符合您不希望它匹配的文件名 。
* 未壓縮的來源資料檔案必須沒有檔案延伸檔名 (即文件名中沒有".") .
* 壓縮的來源資料檔案必須有檔案延伸檔名, 但是ERDDAP™檢查檔案的內容, 而不是查看檔案的延伸檔, 決定壓縮的類型 (例如".Z") . 支援的壓縮型態包括"gz","bzip2","xz","lzma","snappy-raw","snappy-framed","pack200"和"z". 什麼時候ERDDAP™讀取壓縮的檔案, 它解壓在飛行上, 不寫入暫時檔案 。
* 所有來源資料檔案必須使用原始檔案命名系統: 即 merg\\_ *Y* QQ4km 像素 (在哪里 *Y* 表示與檔案中資料相關的時間) ,如果檔案已壓縮,则要加上檔案延伸。

看這班的超級[EDDGrid從檔案](#eddgridfromfiles)以了解這個課程如何運作及如何使用。

我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 然後你可以編輯它來調整它。
 
### EDDGrid來自 Nc 檔案{#eddgridfromncfiles} 
[ **EDDGrid來自 Nc 檔案** ](#eddgridfromncfiles)汇总本地、 网格、[GRIB. grb和. grb2](https://en.wikipedia.org/wiki/GRIB)文件,[HDF  (v4 或 v5)  .hdf](https://www.hdfgroup.org/)文件,[.nc毫升](#ncml-files)文件,[NetCDF  (v3 或 v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)文件,以及[扎爾](https://github.com/zarr-developers/zarr-python)文件 (截至第2.25版) . Zarr 檔案的行為稍有不同, 需要檔案Name Regex 或路徑 Regex 加入"zarr" 。

這可能會和其他檔案類型一起工作 (例如,BUFR) 我們只是還沒測試... 請給我們一些樣本文件

* GRIB 檔案ERDDAP™首次讀取 GRIB 檔時會做一個 . gbx 索引檔 。 GRIB 檔案必須在目錄中, 執行 Tomcat 的「 使用者」 已讀取 + write 權限 。
* 看這班的超級[EDDGrid從檔案](#eddgridfromfiles),以了解本課如何運作和如何使用。
* 從開始ERDDAP™v2.12,EDDGrid來自 NcFiles 和EDDGrid來自 Nc 檔案 未包裝可讀取「 結構」 中的資料 。.nc4和.hdf4份文件。 要辨識從一個結構中產生的變數,&lt;sourceName&gt; 必須使用格式 : *完全結構Name* | *成員Name* ,例如群組1/myStruct|我的會員
* 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 然後你可以編輯它來調整它。
    
#### Grided Nc 文件中的群組{#groups-in-gridded-nc-files} 
    [Netcdf4 檔案可以包含群組 。](#groups-in-gridded-nc-files) ERDDAP™只從一個群組的變數 和所有母群組的數據 您可以在 GenerateDatasets 中指定特定群組名稱 Xml 命令 (省略末端斜線) ,或使用"'"來產生 Datasets Xml 搜尋所有使用最大尺寸的變數群組, 或使用 "\\[根\\]讓GenerateDatasets在根群組中尋找變數。
    
在您回答問題後, 產生 DatasetXml 對此類型的數據集的第一件事就是 列印樣本中類似 ncdump 的結構 。 所以如果您通過 GenerateDatasets 輸入第一個回路的幾個愚蠢的答案 Xml 至少你能看清ERDDAP™可以讀取檔案, 看看檔案中的尺寸與變數 。 然後你可以透過 Generate DatasetsXml 為第二圈提供更好的答案 。
    

### EDDGrid來自 NcFiles 未包裝{#eddgridfromncfilesunpacked} 
[ **EDDGrid來自 NcFiles 未包裝** ](#eddgridfromncfilesunpacked)是[EDDGrid來自 Nc 檔案](#eddgridfromncfiles)集合本地端、 网格NetCDF  (v3 或 v4)  .nc和相關檔案。 不同的是,此類別之前會解開每個資料檔EDDGrid從檔案查看 :

* 它會解開被包裝的變數[scale\\_factor和/或add\\_offset](#scale_factor).
* 它會轉換 QFillVale 和missing\\_value值為 NaN (整數數型態的 MAQVALUE) .
* 它將時間和時間戳值轉換為"seconds since 1970-01-01T00:00:00Z".

這個班級最大的優點是 它能提供一個方法 處理不同的價值scale\\_factor,add\\_offset火花,missing\\_value,或收藏中不同來源檔案中的時間單位。 不然你就得用工具[NcML](#ncml-files)或[NCO](#netcdf-operators-nco)要修改每個檔案以移除差異, 以便檔案可以由EDDGrid來自NcFiles。 要正常工作, 檔案必須遵循相關屬性 CF 標準 。

* 如果想做EDDGrid來自 Nc 檔案 從您先前試過且未用過的檔案群中解包EDDGrid從NcFiles, cd 到
     *大家长會* /dataset/ *最后2位元* / *datasetID* /
在哪里 *最后2位元* 是datasetID,
並刪除目錄中的所有檔案 。
* 從開始ERDDAP™v2.12,EDDGrid來自 NcFiles 和EDDGrid來自 Nc 檔案 未包裝可讀取「 結構」 中的資料 。.nc4和.hdf4份文件。 要辨識從一個結構中產生的變數,&lt;sourceName&gt; 必須使用格式 : *完全結構Name* | *成員Name* ,例如群組1/myStruct|我的會員
* 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 然後你可以編輯它來調整它。
    
Netcdf4 檔案可以包含群組 。 看[此文件](#groups-in-gridded-nc-files).
    
在您回答問題後, 產生 DatasetXml 對此類型的數據集的第一件事就是印出樣本檔的 ncdump 類型的結構 **之前** 已打包 所以如果您通過 GenerateDatasets 輸入第一個回路的幾個愚蠢的答案 Xml 至少你能看清楚ERDDAP™可以讀取檔案, 看看檔案中的尺寸與變數 。 然後你可以透過 Generate DatasetsXml 為第二圈提供更好的答案 。
    
### EDDGrid龍PM180{#eddgridlonpm180} 
[ **EDDGrid龍PM180** ](#eddgridlonpm180)修改孩子的經度值 (附 件)  EDDGrid一些經度值大于 180 的數據集 (例如, 0 到 360) 他們將在180至180之間, (經度加法或減法180,故此名稱) .

* 這提供了使經度值大于180的數據集符合/符合的方法OGC服務 (例如,WMS伺服器在ERDDAP) 自始至終OGC服務需要經度值在 -180 至 180 內。
* 工作不斷會造成問題, 這個數據集的類型讓大家避免這些問題,
1,經度值介于 0 到 360 之間 ("太平洋人"?) ,
一個經度值在 -180 至 180 ("大西洋"?) .
* 對於所有經度值大于180的子數據集,所有新的經度值都只是降低360度。 例如,經度值為180至240的数据集會成為經度值為 -180至 -120 的数据集.
* 對全地球有經度數值的孩子數據集 (0到360左右) ,新的經度值會重新排列為 (大概) -180至180:
最初的 0 到 近 180 數值沒有變化 。
原始的180至360 值被轉換成 -180 至 0,並轉換到經度陣列的起始 。
* 對於跨度為180的孩童數據集 而不覆盖全球ERDDAP™插入缺少的數值以建立覆盖全球的數據集。 例如,經度值140至200的儿童數據集會成為經度值 -180至180的數據集。
180至200的儿童值将变为 -180至 -160。
新的經度值將從 -160 插入到 140 。 相對的數據數值會是 QQFillValues 。
140到近180的儿童值將保持不变。
插入缺失的數值可能似乎很奇怪, 但是它避免了因經度值突然跳過而產生的若干問題 (例如,从 -160 到 140) .
* 在[產生 DatasetsXml](#generatedatasetsxml)有個特殊的"數據集類型"EDDGrid由 ErddapCatalog 產生datasets.xml用于EDDGridLonPM180 各集的数据集EDDGrid數據集ERDDAP其經度值大于180。 這可以提供兩個版本的數據集:
原始,經度值介于 0 到 360 之間,
和新数据集,經度值介于 -180 到 180。
    
每個中的孩子數據集EDDGridLonPM180 数据集將是EDDGrid來自 Erddap 資料集, 指向原始資料集 。
新數據集的datasetID將會是原始數據集加上「%LonPM180」的名稱。
例如,
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
放下EDDGridLonPM180 数据集 **以下** 原始数据集datasets.xml. 這樣可以避免一些可能的問題
    
或者,你可以取代EDDGrid從 Erddap 的兒童數據集與原始的數據集datasets.xml. 數據集將只有一個版本:經度值在 -180 至 180 內的版本。 因為有時候數據集的每個版本都更方便。
    
* 例如,如果你提供兩個版本的數據集,一個是經度0到360,一個是經度180到180:
    * 您可以使用選項 [&lt;可存取 分WMS&gt; 假&lt;/可存取 分WMS&gt;] (&#123;\fn方正黑體簡體\fs18\b1\bord1\\shad1\\3cH2F2F2F&#125;"可通訊") 使用 0-360 数据集强制禁用WMS服務的數據集。 然后,只有LonPM180版本的数据集才能通过WMS.
    * LonPM180 數據集隨著基底數據集的變更,
        * 如果孩子的數據集是EDDGrid從 Erddap 資料集中引用同樣的數據集ERDDAP™, LonPM180 数据集會試圖直接订阅基本的數據集, 所以它總是更新的 。 直接訂閱並沒有產生要您驗證訂閱的電子郵件,
        * 如果孩子的數據集不是EDDGrid從同樣的 Erddap 数据集ERDDAP™, LonPM180 数据集會試著使用普通的訂閱系統來訂閱基本的数据集 。 如果你有订阅系統ERDDAP™啟動時, 您應該得到電子郵件, 請您驗證訂閱 。 求你了
        * 如果你有订阅系統ERDDAP™關閉, LonPM180 数据集有時會有过时的中繼資料, 直到 LonPM180 数据集重新載入。 所以,如果訂閱系統關閉,你應該設置&lt;重新載入 每一個NMinutes &gt;] (每分鐘重載) 設定 LonPM180 的數據集, 以讓它更早地捕捉到孩子數據集的變更 。

#### EDDGridLonPM180 骨架 XML{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGrid朗0360{#eddgridlon0360} 
[ **EDDGrid朗0360** ](#eddgridlon0360)修改孩子的經度值 (附 件)  EDDGrid某些經度值小于 0 的數據集 (例如, -180至180) 所以它們在0到360之間 (因此名称) .

* 工作不斷會造成問題, 這個數據集的類型讓大家避免這些問題,
一個經度值在 -180 至 180 ("大西洋"?) .
1,經度值介于 0 到 360 之間 ("太平洋人"?) ,
* 對於所有經度值小於0的子數據集, 所有新的經度值只是高360度。 例如,經度值為 -180 到 -120 的數據集會成為經度值為 180 到 240 的數據集 。
* 對全地球有經度數值的孩子數據集 (-180到180左右) ,新的經度值會重新排列為 (大概) 0 到 360 :
原始的 -180 到 0 值轉換為 180 到 360 , 轉換到經度陣列的末端 。
最初的 0 到 近 180 數值沒有變化 。
* 對於跨度為lon=0但不會覆盖全球的孩子數據集,ERDDAP™插入缺少的數值以建立覆盖全球的數據集。 例如,經度值為 -40 到 20 的子數據集會成為經度值為 0 到 360 的數據集 。
0至20的儿童值保持不变。
新的經度值將從20插入到320。 相對的數據數值會是 QQFillValues 。
-40到0的孩子值會變成320到360。
插入缺失的數值可能似乎很奇怪, 但是它避免了因經度值突然跳過而產生的若干問題 (例如,20至320) .
* 在[產生 DatasetsXml](#generatedatasetsxml)有個特殊的"數據集類型"EDDGridLon0360 來自 ErddapCatalog, 讓您產生datasets.xml用于EDDGridLon0360 各集的數據EDDGrid數據集ERDDAP其經度值大于180。 這可以提供兩個版本的數據集:
原始,經度值介于 0 到 360 之間,
和新数据集,經度值介于 -180 到 180。
    
每個中的孩子數據集EDDGridLon0360 数据集將是EDDGrid來自 Erddap 資料集, 指向原始資料集 。
新數據集的datasetID將會是原始數據集加上「%Lon0360」的名稱。
例如,
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
放下EDDGridLon0360 数据集 **以下** 原始数据集datasets.xml. 這樣可以避免一些可能的問題
    
或者,你可以取代EDDGrid從 Erddap 的兒童數據集與原始的數據集datasets.xml. 數據集只有一個版本:經度值在 0 到 360 以內的版本。 因為有時候數據集的每個版本都更方便。
    
* 例如,如果你提供兩個版本的數據集,一個是經度0到360,一個是經度180到180:
    * 您可以使用選項 [&lt;可存取 分WMS&gt; 假&lt;/可存取 分WMS&gt;] (&#123;\fn方正黑體簡體\fs18\b1\bord1\\shad1\\3cH2F2F2F&#125;"可通訊") 用 0 到 360 数据集强制禁用WMS服務的數據集。 然后,只有 -180 到 180 版本的數據集才能通過WMS.
    * Lon0360 數據集隨著基底數據集的變更,
        * 如果孩子的數據集是EDDGrid從 Erddap 資料集中引用同樣的數據集ERDDAP™, Lon0360 数据集會試著直接訂閱基本的數據集, 以便它總是最新的 。 直接訂閱並沒有產生要您驗證訂閱的電子郵件,
        * 如果孩子的數據集不是EDDGrid從同樣的 Erddap 数据集ERDDAP™, Lon0360 数据集會試著使用正常的訂閱系統來訂閱基本的数据集 。 如果你有订阅系統ERDDAP™啟動時, 您應該得到電子郵件, 請您驗證訂閱 。 求你了
        * 如果你有订阅系統ERDDAP™關閉, Lon0360 数据集有時會有过时的中繼資料, 直到 Lon0360 数据集重新載入。 所以,如果訂閱系統關閉,你應該設置&lt;重新載入 每一個NMinutes &gt;] (每分鐘重載) 設定 Lon0360 數據集的數量更小, 這樣它更可能更快地捕捉到孩子數據集的變更 。
#### EDDGridLon0360骨架 XML{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGrid侧邊邊{#eddgridsidebyside} 
[ **EDDGrid侧邊邊** ](#eddgridsidebyside)總和 2 或以上EDDGrid数据集 (儿童) 并肩而行.

* 產生的數據集包含了所有孩子數據集的所有變數。
* 父數據集與所有子數據集都不同 MUSTdatasetIDs. 如果家族中的任何名字完全相同, 數據集將無法載入 (與錯誤訊息, 集合轴的數值不排序) .
* 所有孩子必須有相同的來源值axisVariables\\[1+\\]  (例如,經度,經度) . 測試的精度由[匹配轴數](#matchaxisndigits).
* 孩子們可能有不同的來源值axisVariables\\[0\\]  (例如, 時間) 但通常都一樣
* 母數據集似乎擁有全部axisVariables\\[0\\]所有孩子的源值。
* 例如, 讓您將一個來源數據集與向量的u元件和另一個來源數據集與向量的 v 元件合為一, 所以可以提供综合數據 。
* 由此方法所生的孩子是私生子。 它們不是可分開的數據集 (例如,按客戶端數據要求或[旗標檔案](/docs/server-admin/additional-information#flag)) .
* 全球中繼資料與父方的設定來自全球中繼資料與第一個孩子的設定。
* 如果創造第一個孩子時有例外, 父母將不被建立 。
* 如果建立其他孩子時有例外, 這會發送電子郵件至 Email Everything To (按[設定. xml](/docs/server-admin/deploy-install#setupxml)) 繼續跟其他孩子在一起
#### EDDGrid侧邊骨架 XML{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGrid聚合{#eddgridaggregateexistingdimension} 
[ **EDDGrid聚合** ](#eddgridaggregateexistingdimension)總和 2 或以上EDDGrid數據集,每套數據都有不同的第一個維度值範圍,但其他維度的數值相同。

* 例如,一個孩子的數據集可能有366個值 (2004年) 而另一個孩子可能有365個值 (2005年) 時間尺寸
* 其他所有維度的所有值 (例如,經度,經度) 所有孩子都一樣 測試的精度由[匹配轴數](#matchaxisndigits).
* 排序尺寸值 - 每個維度的數值必須排序 (升降) . 數值可以不规则的間距 。 不能有領帶。 要求[CF 中繼資料標準](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). 如果任何維度的數值沒有排序,數據集不會被載入,ERDDAP™表示日志文件中第一個未排序的值, *大家长會* /日志/log.txt.
    
未分類的維度數值 几乎總是表示來源數據集的問題 。 這最常發生於集合中包含一個錯名或不適當的檔案, 這會導致無類型的時間維度 。 要解決此問題, 請參考ERDDAP™找到冒犯時間值的log. txt 檔案 。 然後在來源檔案中查找对应的檔案 (之前或之后) 這不屬於集合。
    
* 父數據集與子數據集 MUST 不同datasetIDs. 如果家族中的任何名字完全相同, 數據集將無法載入 (與錯誤訊息, 集合轴的數值不排序) .
* 目前, 孩子的數據集必須是EDDGrid從 Dap 數據集和 MUST 中總和維度的最低值 (通常最古老的時間值) . 其他所有的孩子都必須是 几乎相同的數據集 (第一個維度的值不同) 由他們自己指定sourceUrl.
* 總和數據集從第一個孩子得到它的中繼資料 。
* 其[產生達塔斯 Xml 程式](#generatedatasetsxml)可以做一個粗略的草稿datasets.xml代表EDDGrid依據 a 所服務的檔案組成的集合分割Hyrax或是THREDDS伺服器 例如,在程式中使用此輸入 (URL中的「 1988 」 使範例跑得更快) :
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
你可以利用結果&lt;sourceUrl&gt; 標籤或刪除它們, 並取消註解&lt;sourceUrl&gt; 標籤( 所以每次重新載入數據集都注意到新的檔案 ) 。
#### EDDGrid總和分割骨架 XML{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGrid复制{#eddgridcopy} 
[ **EDDGrid复制** ](#eddgridcopy)制作并維持另一個的本地副本EDDGrid本地副本中的資料及服務 。

*   EDDGrid复制 (就表格數據而言[EDD 表格](#eddtablecopy)) 非常容易使用,非常有效
     **解決遠端資料來源服務數據的一些最大問題:** 
    * 從遠端資料來源存取資料可能很慢 。
        * 可能很慢 因為它本身很慢 (例如, 伺服器的低效類型) ,
        * 因為它被太多的要求所壓迫
        * 或因為您的伺服器或遠端伺服器的頻寬有限 。
    * 遠端數據集有時不可用 (再一次,有种种原因) .
    * 依靠一個來源來取得數據,不是很好 (例如,很多使用者和很多使用者ERDDAP利用它) .
         
* 如何工作...EDDGrid复制可以自動製造並維持本地的資料副本,ERDDAP™很快就能提供本地副本的資料。 而制作本地版可以减轻遠端伺服器的負擔. 本地副本是原件的備份,
    
做一個本地數據集的複製沒有什麼新發現。 新的是這個班級的成績\\*容易\\*建立和\\*維持\\*本地資料副本\\*品种\\*遠端資料來源的類型和\\*新增中繼資料\\*复制資料。
    
* 數據區塊 --EDDGrid复制此資料的本地副本, 從遠端索取數據&lt;數據集 &gt; 。 最左邊的每個值都會有區塊 (第一) 轴變數。EDDGridCopy 不依靠遠端數據集的索引數據來表示轴數 -- 這些可能會改變 。
    
如果數據的大小如此之大 (&gt; 2GB) 造成麻煩EDDGrid不能使用副本。 (對不起,我們希望未來能解決這個問題) 
    
*   \\[替代EDDGrid复制 -
如果遠端資料是通过可下載的檔案提供的, 而不是網路服務, 使用[快取 從 Url 選項中EDDGrid從檔案](#cachefromurl),它會提供遠端檔案的本地副本,並提供本地檔案的資料。\\]
* 本地檔案... 每塊數據被儲存在一個单独的NetCDF子目錄中的檔案 *大家长會* 副本/副本 *datasetID* / (按[設定. xml](/docs/server-admin/deploy-install#setupxml)) . 從轴數值產生的檔案名稱被修改, 使其檔案名稱安全 (例如,連字符被「 x2D」 取代) 這不影響實際資料
     
* 新資料 -- 每一次EDDGrid复制已重新載入, 它檢查遙控器&lt;數據集 &gt; 以查看可用的區塊 。 如果一塊資料的檔案已不存在, 取得塊的要求會被加入到隊列中 。ERDDAP工作串列處理所有排隊的數據要求, 逐一 。 您可以看到工作串列的活動[狀態](/docs/server-admin/additional-information#status-page)和在[每日報告](/docs/server-admin/additional-information#daily-report). (是的ERDDAP™可以為此行程指派多項工作, 但會使用遠端資料來源的帶寬、 內存、 CPU 時間, 以及很多本地端ERDDAP帶寬、記憶和CPU時間,) 
    
注:第一次EDDGrid复制已載入, (如果一切順利) 工作串列中會加入很多對數據區塊的要求, 但沒有建立本地資料檔 。 所以建構器會失敗, 但工作Thread會繼續工作並建立本地檔案 。 如果一切順利, 專案Thread 會做一些本地端的資料檔, 以及下次重新載入數據集的試圖 (在~15分鐘內) 但起初數據有限。
    
注:在本地数据集有某些數據并出現在您的ERDDAP, 如果遠端數據集暂时或永久無法存取, 本地數據集仍會工作 。
    
警告: 如果遠端數據集是大和/或遠端伺服器慢 (這就是問題所在,不是嗎?) 需要很長的時間才能完成本地版的复制 在某些情况下,所需时间是不可接受的。 例如, 在 T1 線上傳送 1 TB 資料 (0.15 GB/s) 在最佳条件下至少需要60天。 此外,它在遠端和本地電腦上使用了很多帶寬、記憶體和CPU時間。 解答方式是將硬碟寄給遠端數據集的管理員, 以便 s/ he 可以將數據集的複製本寄回給您 。 以數據為起点EDDGrid复制會加入數據 (那是一种方式[Amazon EC2 云服務](https://aws.amazon.com/importexport/)處理問題, 即使他們的系統有很多頻寬。) 
    
警告: 如果最左邊的指定值 (第一) 轴變數從遠端數據集消失,EDDGrid复制不刪除本地复制的檔案 。 如果你想的話 你可以自己刪除
    
#### 网格复制檢查來源 資料{#grid-copy-checksourcedata} 
其datasets.xml此數據集可以有可選的標籤
```
    <checkSourceData>true</checkSourceData>  
```
預設值是真實的 。 如果/ 當您設定它為不正確時, 數據集將永遠不會檢查來源數據集, 看看是否有其他資料可用 。

#### 唯一{#onlysince} 
你看得出來EDDGrid复制來製作源資料集的子集, 而不是完整的源資料集, 在表單中新增一個標籤&lt;只自此一次 &gt; *一些 值* &lt;/ 只從此來到數據集datasets.xml很大。EDDGrid复制只下載與第一維值相關的數值 (通常是時間尺寸) 大于 *一些 值* . *一些 值* 可以是:
    * 以now- *n 單位* .
例如,&lt;只自此一次 &gt;now-2年&lt;/ only Since &gt; 告訴數據集只將數據當地複製成外部維度值的數據 (通常時間值) 過去兩年內 (每次重新載入數據集時會重新評估, 也就是它尋找要複製的新數據的時候) . 看[now- *n 單位* 語法描述](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). 如果第一個維度有時間數據, 這就很有用, 通常都是這樣的 。
        
        EDDGrid复制不刪除本地資料檔, 這些資料會隨時間推移變老now- *n 單位* . 你可以隨時刪除那些檔案 。 如果你愿意 我們強烈建議你設置一個[旗號](/docs/server-admin/additional-information#flag)刪除要告訴的檔案後EDDGrid复制以更新快取檔案清單 。
        
    * 指定為 ISO 8601 字串的定時點yyyy-MM-ddTHH:mm:ssZ.
例如,&lt;自2000-01-01T00:00Z起&lt;/ onlySince &gt; 告訴數據集只提供第一維數值為 QQ2000-01-01T00:00Z 的數據本地複製。 如果第一個維度有時間數據, 這就很有用, 通常都是這樣的 。
         
    * 浮點數 。
例如,&lt;只有946684800.0&lt;/只自此. 單位將是第一維的目的地單位 。 例如,對時間維度,單位在ERDDAP™總是"seconds since 1970-01-01T00:00:00Z". 所以,94668480.0"seconds since 1970-01-01T00:00:00Z"等於2000-01-01T00:00Z。 這總是一個有用的選擇, 但是在第一維沒有時間數據時,它尤其有用。

#### EDDGrid复制重新推荐的使用{#eddgridcopy-recomended-use} 
1. 建立&lt;数据集 &gt; 項目 (本地型態, 不EDDGrid复制) 遠端資料來源。
     **讓它正常工作 包括所有想要的中繼資料** 
2. 如果速度太慢, 加入 XML 代碼以包裝它EDDGrid复制数据集 。
    * 使用不同的datasetID  (也許可以改變datasetID古老的datasetID稍稍) .
    * 复制&lt;可存取 至 &gt;,&lt;重新載入 EveryNminutes &gt; 及&lt;從遠端EDDGrid'XML 到EDDGrid复制的XML。 (他們的價值EDDGrid复制物质; 內部數據集的數值已無關緊要 。) 
3.  ERDDAP™會做並維持當地的數據副本。
         
* 警告:EDDGrid复制假設每個區塊的數值永遠不會變化 。 如果/ 當他們做了, 您需要手動刪除 。 *大家长會* 副本/副本 *datasetID* 改變和[旗號](/docs/server-admin/additional-information#flag)重新載入的數據集, 讓已刪除的區塊被取代 。 如果您對數據集有電子郵件訂閱, 您會收到兩封電子郵件: 一是數據集第一次重新載入並開始複製數據, 一是再次載入數據集時。 (自動) 并偵測新的本地端資料檔。
     
* 所有轴值必須平等 。
除了最左邊的斧頭 (第一) 所有價值必須對所有孩子平等 測試的精度由[匹配轴數](#matchaxisndigits).
     
* 設定、 元件、 變數...EDDGrid复制使用封存的來源數據集中的設定值、 中繼資料與變數 。
     
* 變更中繼資料 -- 如果你需要改變任何addAttributes或變更與來源數據集相關的變數的順序 :
    1. 更改addAttributes原始数据集datasets.xml依需要。
    2. 刪除已复制的檔案 。
    3. 設定[旗號](/docs/server-admin/additional-information#flag)以立即重新載入數據集。 如果您真的使用國旗並有電子郵件訂閱數據集, 您會收到兩封電子郵件: 一是數據集第一次重新載入並開始複製數據, 一是再次載入數據集 (自動) 并偵測新的本地端資料檔。
    4. 已刪除的檔案將與新中繼資料重生 。 如果來源數據集不可用,EDDGrid复制數據集會從重新產生的檔案中获得中繼資料, 因為它是最年輕的檔案 。
#### EDDGrid复制骨架 XML{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### 來自卡桑德拉的EDD表{#eddtablefromcassandra} 
[ **來自卡桑德拉的EDD表** ](#eddtablefromcassandra)處理一個資料[卡珊德拉](https://cassandra.apache.org/)表格。 Cassandra是無數數據庫

*   ERDDAP™可以與 Cassandra v2 及 v3 一起工作, 在設定上沒有變更或區別 。 我們已經試過了[卡珊德拉 v2 和 v3 來自 阿帕奇語Name](https://cassandra.apache.org/download/). 很可能ERDDAP™也可以與 DataStax 下載的 Cassandra 合作。
     
* 2019年8月 - 2021年5月,Javav8. 它發射了外泄 但現在 (2021年5月) 我們可以成功使用 Cassandra v2.1. 22 , 並採用 OpenJdk jdk8u292-b10 。
     
#### 一表{#one-table} 
卡珊德拉不支持"joins" 的方式 關係資料庫。 一ERDDAP™EDD Table FromCassandra 數據集映射到一 (可能是一個子集) 卡珊德拉桌子

#### 卡珊德拉datasets.xml {#cassandra-datasetsxml} 
*   ERDDAP™跟卡珊德拉一起來Java司機,所以你不需要另外安裝它。
* 仔細讀取這份文件中关于 EDDTable FromCassandra 的所有資訊。 有些細節很重要
* 卡珊德拉Java司機打算和Apache Cassandra合作 (1.2+) 和 DataStax 企業 (3.1+) . 如果您要使用 Apache Cassandra 1. 2. x, 您必須編輯每個節點的 cassandra. yaml 檔案來設定啟動 &#123;native&#125;&#125; 傳輸: true, 然后重新啟動每個節點 。
* 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 你可以再編輯它來調整它(尤其是[&lt;分割區 金鑰來源名稱&gt; (# 分割鍵源名稱) ). 您可以通過聯絡卡珊德拉管理員並搜尋網絡來收集建立 EDTableFromCassandra 數據集 XML 所需的大部分資訊 。
    
產生達塔斯 Xml 對 EDDTable FromCassandra 有兩個特殊的選擇:
    
    1. 如果你進入"&#33; &#33; (沒有引文) 對金鑰空間, 程式會顯示金鑰空間清單
    2. 如果您輸入特定鍵位, 然后輸入「&#33; &#33; &#33; LIST&#33; 」 。 (沒有引文) 表格名稱中, 程式會顯示在按鍵空間中的表格清單及其列 。
##### 大小寫敏感度{#case-sensitivity} 
* 區分大小寫的金鑰空間與表格名稱 -
Cassandra 以對大小寫不敏感的方式處理按鍵空間和表格名稱 。 因此,你永遠不要用保留字眼 (但案件不同) 以 Cassandra 鍵位或表格名稱 。
* 區分大小寫列名 -
默认情况下, Cassandra 以不敏感大小寫的方式處理列名 。 如果你用 Cassandra 的一個保留字作為列名 (不要&#33;) ,您必須使用
```
        <columnNameQuotes>"<columnNameQuotes>  
```
 indatasets.xml因此卡珊德拉和ERDDAP™以區分大小寫的方式處理列名。 這對你來說可能是個很大的頭痛, 因為要确定列名的大小寫版本很困難—— Cassandra 幾乎總會顯示列名為所有小寫,
* 與卡珊德拉行政官密切合作, 如果數據集無法載入, 請讀取[錯誤訊息](#troubleshooting-tips)注意找出原因
         
#### 卡珊德拉&lt;連接 屬性( gt;){#cassandra-connectionproperty} 
Cassandra 有可以指定於datasets.xml. 很多這些會影響卡珊德拉的表演ERDDAP™連接。 不幸的是,卡珊德拉的屬性必須按程序設置Java所以ERDDAP™每個屬性必須有密碼ERDDAP™支持。 目前,ERDDAP™支援這些屬性 :
 (顯示的預設就是我們所看到的 你的系統缺省可能不同) 

*    **一般選項**   
    &lt;連接 屬性名稱=" **壓縮** " &gt; *無|LZ4 :|快速* &lt;/連接 屬性 &gt; (區分大小寫, 默认值=無)   
     (一般壓縮建議: 如果卡珊德拉與ERDDAP™是本地/ 快速的, 如果連接是遠方/ 慢的, 請使用 LZ4 。)   
    &lt;連接 屬性名稱=" **憑證** " &gt; *使用者名稱/ 密碼* &lt;/連接 屬性 &gt; (那是字面意思'/')   
    &lt;連接 屬性名稱=" **公尺** " &gt; *真|假* &lt;/連接 屬性 &gt; (2021-01-25 是缺省=真,現在被忽略了,總是假的)   
    &lt;連接 屬性名稱=" **端口** " &gt; *整數* &lt;/連接 屬性 &gt; (本地二進制协议預設值 = 9042)   
    &lt;連接 屬性名稱=" **秒** " &gt; *真|假* &lt;/連接 屬性 &gt; (缺省=假)   
     (我的快速使用 sl 失敗了。 如果你成功 請告訴我你是如何做到的) 
*    **查詢選項**   
    &lt;連接 屬性名稱=" **一致性 等級** " &gt; *全部|任何|每人|本地|本地|本地%%%s|一|法定人数|串|三|二* &lt;/連接 屬性 &gt; (區分大小寫, 默认值=ONE)   
    &lt;連接 屬性名稱=" **抓取Size** " &gt; *整數* &lt;/連接 屬性 &gt; (預設值=5000)   
     (不要設定取回Size到更小的值 。)   
    &lt;連接 屬性名稱=" **序列一致性水平** " &gt; *全部|任何|每人|本地|本地|本地%%%s|一|法定人数|串|三|二* &lt;/連接 屬性 &gt; (大小寫不敏感, 默认值=SERIAL) 
*    **套接字選項**   
    &lt;連接 屬性名稱=" **連接 Timeout Millis** " &gt; *整數* &lt;/連接 屬性 &gt; (預設值=5000)   
     (不設定連接 超時Millis的數值更小)   
    &lt;連接 屬性名稱=" **保留Alive** " &gt; *真|假* &lt;/連接 屬性 &gt;
    &lt;連接 屬性名稱=" **讀取超時** " &gt; *整數* &lt;/連接 屬性 &gt;
     (卡珊德拉的預設讀數是12000 但是ERDDAP™預設值變更為 120000 。 Cassandra有時會在這次之前扔掉, 問題更可能是您每個分割區的數據儲存過多 鑰匙密碼)   
    &lt;連接 屬性名稱=" **接收** " &gt; *整數* &lt;/連接 屬性 &gt;
     (不清楚預設接收的Buffersize是什麼。 不要把它設為小數值 。)   
    &lt;連接 屬性名稱=" **索林格** " &gt; *整數* &lt;/連接 屬性 &gt;
    &lt;連接 屬性名稱=" **tcp 暫停** " &gt; *真|假* &lt;/連接 屬性 &gt; (預設值=null) 

如果您需要設定其它連接的屬性, 請參考我們[部分](/docs/intro#support).

在給定的 Tomcat 啟動中, 連接Properties 只在第一次為給定的 Cassandra URL 建立數據集時才使用 。 所有重新載入的數據集和所有相關的數據集, 共享相同的網址, 都會使用原始的連結 Properties 。
    
#### CQL{#cql} 
卡珊德拉查询語言 (CQL) 表面和SQL一樣, 因為OPeNDAP表格資料要求旨在模仿 SQL 表格資料要求,有可能ERDDAP™以將表格資料要求轉換成 CQL Bund/ preparated Statements 。ERDDAP™登入對話單[log.txt](/docs/server-admin/additional-information#log)如
語言為文字 : *宣示文字*   
您看到的聲明的版本將是聲明的文字表示, 只有 " ?" 。
       
沒那麼簡單... 不幸的是, CQL 有很多限制, 可以詢問哪些欄位。 例如, 分割鍵列可以用 = 和 IN 限制 。ERDDAP™卡珊德拉收到資料後, 幫助ERDDAP™高效處理 Cassandra, 您需要指定 [&lt;分割區 金鑰來源名稱&gt; (# 分割鍵源名稱) ,[&lt;群組來源名稱&gt; (# 群組列來源名稱) ,以及[&lt;索引 Column 來源名稱 &gt; (#索引列來源名稱)  indatasets.xml此数据集。 這些是最重要的幫助方法ERDDAP™和卡珊德拉高效合作 如果你不說ERDDAP™此資訊, 數據集將痛苦的慢於ERDDAP™利用很多卡珊德拉資源
     
#### &lt;分割區 金鑰來源名稱與gt;{#partitionkeysourcenames} 
因為分割鍵在卡珊德拉表格中扮演中心角色,ERDDAP™需要知道他們sourceNames,如果相关,其他信息如何与它们合作。
* 您必須指定一個以逗號分隔的分隔區列名稱清單datasets.xml途&lt;分割區 金鑰來源名稱&gt; 。
簡單的例子,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
更複雜的例子,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* 時章分割鍵 -- 如果分區金鑰列中的一列是時間戳列, 它有另一個時間戳列的剪接器版本, 請通过
     *分割區( KeySourc) Name/ 其他 Column 來源Nametime\\_precision*   
在哪里time\\_precision是其中之一[time\\_precision](#time_precision)在其他地方使用的字串ERDDAP.
后面的Ztime\\_precision字串是預設的,所以不管time\\_precision字串是否以 Z 結束 。
例如,ERDDAP™1970-01-01年 日期限制可藉此從樣本時間的限制來建立time\\_precision"" 限制的实际轉換更復雜,
     **隨時使用它。** 它可以ERDDAP™和卡珊德拉高效合作 如果柱子之間的關係存在于 Cassandra 表格中 而你卻不說ERDDAP™數據集會很痛苦的慢ERDDAP™利用很多卡珊德拉資源
* 單一 值分割鍵 - 如果你想要ERDDAP™數據集只用一個分割區金鑰的值, 指定 *分割鍵來源Name=值* .
不要用引數來表示數字列, 例如 devicid=1007
使用引數來表示字串列, 例如 standid="Point Pinos"
* 數據集預設排序顺序... 分割區金鑰的顺序&lt;dataVariable&gt;在datasets.xml決定 Cassandra 結果的默认排序 。 當然, 使用者可以通过附加( A) 來要求給定的一組結果的不同排序( O)orderBy (" *以逗號分隔的變數清單* ") 到他們的查詢結束。
* 卡珊德拉和ERDDAP™以不敏感大小寫的方式處理列名 。 但是如果你安排[列Name 引文](#case-sensitivity)改为 ",ERDDAP™以區分大小寫的方式對待 Cassandra 列名 。
         
#### &lt;分割區 金鑰 CSV&gt; Name{#partitionkeycsv} 
如果這是指定的,ERDDAP™使用它而不是要求卡珊德拉分區 每次重新載入數據集時要提供關鍵信息 。 這提供了不同的分割區金鑰數值的列表, 按其使用的顺序排列 。 自1970-01-01T00:00Z起, 但也有兩種特殊的替代方式可以指定時間 (每個編碼為字串) :

1) 時間 (a ISO8601 時間)   (可能編碼為字串)   
2)"時間 (aISO8601 起步時速, streadseconds, stoptime) " (必須編碼為字串)   
停止 時間可以是 ISO8601 時間或一now-n 單位時間 (例如, "now-三分鐘") .
停止 時間不一定是始作俑者 時間 + x 梯度秒 。
一排一排 () 值在每次查詢前被擴大成多行, 所以分割區列表 鑰匙總是可以完全更新
例如,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
放大到此分割鍵组合表 :
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;群組來源名稱與gt;{#clustercolumnsourcenames} 
Cassandra 接受類似 SQL 的群組列限制, 這些列构成主鍵的第二部分 (在分割區金鑰之后 (s) ) . 所以,你必須通過&lt;群組來源名稱 &gt; 。 此功能ERDDAP™和卡珊德拉高效合作 如果有團列,你不會說ERDDAP數據集會很痛苦的慢ERDDAP™利用很多卡珊德拉資源
    * 例如,&lt;群組來源名稱 &gt; *我的ClusterColumn1, 我的ClusterColumn2* &lt;/ 群組來源名稱 &gt;
    * 如果 Cassandra 表格沒有群組列, 也不要指定&lt;群組來源名稱&gt;,或指定無數值。
    * 卡珊德拉和ERDDAP™以不敏感大小寫的方式處理列名 。 但是如果你安排[列Name 引文](#case-sensitivity)改为 ",ERDDAP™以對大小寫敏感的方式對待卡珊德拉列名
         
#### &lt;索引 Column 來源名稱與gt;{#indexcolumnsourcenames} 
卡珊德拉接受'='二级索引列的限制因素,是您已明确建立 透過的索引列
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (是的,需要括弧。)   
所以,如果你能通過&lt;索引 Column SourceNames &gt;. 此功能ERDDAP™和卡珊德拉高效合作 如果有索引列而你不說ERDDAP有些追問會不必要 痛苦的慢進ERDDAP™利用很多卡珊德拉資源
* 例如,&lt;索引顏色來源名稱 &gt; *我的Index Column1, 我的Index Column2* &lt;/indexColumn 來源名稱 &gt;
* 如果卡珊德拉表格沒有索引列, 也不要指定&lt;索引 Column SourceNames &gt; , 或者指定它沒有值 。
* 卡珊德拉索引不像數據庫索引 卡珊德拉索引只幫助'='限制。 他們只是[推荐](https://cassandra.apache.org/doc/latest/cql/indexes.html)的列。
* 卡珊德拉和ERDDAP™以不敏感大小寫的方式處理列名 。 但是如果你安排[列Name 引文](#case-sensitivity)改为 ",ERDDAP™以對大小寫敏感的方式對待卡珊德拉列名
         
#### &lt;最大要求格式 & gt;{#maxrequestfraction} 
什麼時候ERDDAP™  (re) 載入數據集,ERDDAP™從 Cassandra 得到分區鍵的不同組合清單 。 對一個巨大的數據集來說 組合數量會很大 如果您想阻止使用者要求 大多数或所有數據集 (甚至要求ERDDAP™要下載大部分或全部的資料, 以便进一步過滤它) 你可以看到ERDDAP™只允許通過&lt;最大要求 Fraction &gt;, 是 1e- 10 之间的浮點數 (也就是說 要求不能超过十億的一組) 和 1 (預設值, 也就是要求可以為整個數據集) .
例如,如果一個數據集中有 1000 個區域金鑰的獨立組合, 且 最大要求Fraction 被設定為 0.1,
然後需要從1001或更多組合中取得資料的要求會產生錯誤訊息,
但需要 1000 或 更少 的 組合 的 資料的要求會被允許 。
    
通常,數據集越大,你應該設定的越低&lt;最大要求 所以您可以將它設為 1 一個小數據集, 0.1 一個中型數據集, 0.01 一個大數據集, 0.0001 一個大數據集。
    
這方法遠非完美 這會使一些合理的要求遭到拒絕, 但這很困難,
    
#### 卡珊德拉subsetVariables {#cassandra-subsetvariables} 
和其他 EDDTable 數據集一樣, 您可以指定以逗號分隔的列表&lt;dataVariable&gt;destinationNames 在全局屬性中叫做 "[subsetVariables](#subsetvariables)找出數值有限的變數。 數據集將有一個. subset的網頁, 并在許多網頁的下載清單中顯示這些變數的不同值清單 。
    
在清單中只包含分隔鍵變數和靜态列是強烈的 ENCO迫降。 Cassandra 可以快速、輕而易舉地生成不同组合的清單, 一個例外是時章分割鍵是其他時章列粗糙版本的──也許最好不要把這些放在清單中subsetVariables因為有很多數值,
    
如果您在清單中包含非分割金鑰, 非穩定變數, 可能會是 **非常** 每一次重新載入數據集, Cassandra 的計算成本都很高, 因為ERDDAP™要產生資訊, 必須透過數據集的每一行 。 事實上, 查詢可能失敗 。 所以,除了非常小的數據集, 這是強烈的分散。
    
#### 卡珊德拉數據表{#cassandra-datatypes} 
因為有些模糊[卡桑德拉數據型態](https://cassandra.apache.org/doc/latest/cql/types.html)地圖ERDDAP™資料類型,您需要指定 [&lt;資料Type &gt; (# 資料類型) 每一個的標籤 [&lt;dataVariable&gt;] (可數據變化) 要告訴ERDDAP™要使用的資料 Type 。 標準ERDDAP™資料 類型 (和最常见的 Cassandra 資料類型) 即:
    
*   [布林](#boolean-data)  (布林) ,ERDDAP™然后以字節儲存
* 位元組 ( int, 如果範圍為 -128 到 127) 
* 短 ( int, 如果範圍為 - 32768 到 32767) 
* 英寸 (內部、柜台、瓦林特 範圍是 -2147483648 -2147483647) 
* 長 (如果射程是 -922337203685475808 -922337203685475807) 
* 浮 (浮) 
* 雙倍 (雙倍, 十進制 (可能失去精度) 印章) 
* 字符 (ascii 或文字, 如果其字元不超过 1 個) 
* 字符串 (阿西,文字, varchar, inet, uid, timeuuid, blob, 地圖, set, list? 。 。) 

卡珊德拉的[印章](#cassandra-timestamp-data)是特例:使用ERDDAP雙數據 型。

如果您指定了字符串資料TypeERDDAP™Cassandra 地圖, 設定或清單, 每列的地圖, 設定或清單會轉換成單一字串ERDDAP™表格。ERDDAP™列表有替代的系統;见下文。

 *型態* 列表 --ERDDAP'是&lt;資料Type &gt; (# 資料類型) 卡珊德拉的標籤dataVariables 可包括常數ERDDAP™資料 類型 (见上文) 加上一些可以用于卡珊德拉列表列的特殊資料:布林萊斯特,字節列表,ubyteList,短節列表,ushortList,intList,uintList,長節列表,ulongList,浮節列表,雙節列表,CharList, StringList。 當這些清單中的一列被傳送到ERDDAP™,每行來源資料會被擴大到清單。 大小 () 資料行ERDDAP; 簡單的資料 類型 (例如, int) 。 大小 () 時光 如果結果包含不止一個列表變數, 指定一列數據上的所有列表 MUST 都有相同的大小, 而 MUST 是「 平行的」 列表, 或者ERDDAP™會產生錯誤訊息。 例如,对于ADCP的流量,
深度\\[0\\],目前\\[0\\],目前\\[0\\],且目前\\[0\\]都相關,而且
深度\\[1\\],目前\\[1\\],目前\\[1\\],且目前\\[1\\]都是相關的,...
或者,如果你不想ERDDAP™將清單擴大成多行ERDDAP™表格,指定字符串為dataVariable資料 輸入後, 整份清單將以一行字串表示 。ERDDAP.
    
#### 卡珊德拉時刻標示資料{#cassandra-timestamp-data} 
卡珊德拉的時間戳數據 總是知道時區 如果你在不指定時區的情况下輸入時章資料,卡珊德拉假定時章使用當地時區.
    
ERDDAP™支持時間戳數據,並總是在Zulu-GMT時區 所以如果你在卡桑德拉輸入時間戳數據 使用時區而不是Zulu/ GMT, 請記住, 您需要做所有查詢 。ERDDAP™使用Zulu-GMT時區 所以不要感到驚訝 當時刻戳值從ERDDAP因為時區從本地切換到Zulu時間到了

* 在ERDDAP是datasets.xml在&lt;dataVariable&gt; 時間戳變數的標籤, 設定
```
          <dataType>double</dataType>  
```
中&lt;addAttributes&gt; 设定
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* 建议 : 如果數據是時間範圍, 讓時間戳值指向暗示時間範圍的中心是有用的 (例如,中午) . 例如,如果一個使用者有另一個数据集的2010-03-26T13:00Z的資料,他們想要從這個有每天資料的卡珊德拉数据集得到最接近的資料,那么,2010-03-26T12:00Z的資料就是了。 (表示此日期的 Cassandra 資料) 顯然是最好的 (而不是之前或之後的午夜,) .
*   ERDDAP™有用於[轉換數字 時間到/ 從字符串時間](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* 看[怎么ERDDAP™處理時間](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
#### 整數無效{#integer-nulls} 
卡珊德拉支持卡珊德拉 int (ERDDAP™英寸) 和比特 (ERDDAP™長) 列,但是ERDDAP™不支援任何整數資料型態的真假 。
默认情况下, Cassandra 整數無數將轉換為ERDDAP™至 2147483647 或9223303685475807 長柱。 這些會在某些類型的文字輸出檔中出現為「 NAN 」 (例如,.csv) ,""在其他类型的文本輸出檔中 (例如,.htmlTable) 和具体數字 (缺漏值2147483647) 其他檔案類型 (例如,二进制檔案如.nc和平面) . 使用者可以通过指代"NAN",例如"&windSpeed=NaN"來搜尋此類型缺失值的資料列.
    
如果您使用其他整數值來表示您 Cassandra 表中缺失的數值, 請在datasets.xml:

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

Cassandra 浮點列中, 無數子會轉換成 NaNsERDDAP. Cassandra 資料型態已轉換成 Strings 在ERDDAP™,空格會轉換成空格 。 那應該不是問題
    
#### "WARNING:重新準備已經準備好的查詢"{#warning-re-preparing-already-prepared-query} 
* "WARNING:重新準備已經準備好的查詢" *湯姆卡* /日志/卡塔琳娜。 (或其他 Tomcat 紀錄檔)   
Cassandra文件說,如果同一查詢被做成兩次的備忘錄,會有麻煩的。 (或更多) . (看這個[錯誤報告](https://datastax-oss.atlassian.net/browse/JAVA-236).) 為了避免讓卡珊德拉生氣ERDDAP™缓存所有的備忘錄, 以便重新使用 。 如果/ 當 Tomcat/ERDDAP™重新啟動, 但我覺得這可以, 因為預備聲明與特定會議有關 (介于Java卡桑德拉) ,它也失去了。 所以,你可以看到這些訊息。 沒有別的辦法 幸好這是警告,不是錯誤 (卡珊德拉恐導致性能問題) .
    
卡珊德拉聲稱 備忘錄是好的ERDDAP已儲存的備忘錄從來不至於过时或無效。 如果這不是真的, 並且你得到的錯誤 某些備忘錄已過期/失效, 那你需要重新啟動ERDDAP™清除ERDDAP正在儲存備忘錄 。
    
#### 卡桑德拉安保{#cassandra-security} 
看[保住卡珊德拉](https://cassandra.apache.org/doc/latest/operating/security.html)

在與卡珊德拉合作時,你需要盡最大可能安全地做一些事情,以避免讓一個恶意使用者破壞你的卡珊德拉或取得他們不該存取的資料.ERDDAP™也試著以安全的方式做事

* 我們鼓勵你建立ERDDAP™以卡珊德拉使用者的身份連接到卡珊德拉 **相关** 表格 (s) 而且只有讀取權限 。
* 我們鼓勵你們建立聯系ERDDAP™為了卡珊德拉
    * 總是使用SSL,
    * 只允許從一個 IP 位址連接 (或區塊地址) 和從一個ERDDAP™使用者,以及
    * 只傳輸其 MD5 散列格式的密碼 。
*   \\[已知的問題\\]連接功能 (包括密碼&#33;) 以純文字儲存於datasets.xml. 我們還沒找到辦法讓管理員 進入卡珊德拉的密碼ERDDAP在Tomcat的啟動 (不使用使用者輸入) ,所以密碼必須可以在檔案中存取。 為了更加安全:
    * 你 (该ERDDAP™管理者) 應該是datasets.xml并有讀取和寫取權。
    * 建立只包含使用者的群組 。 使用 chgrp 來建立此群組datasets.xml只有讀取權限
    * 使用 chmod 來指定 o- rwx 權限 (沒有對「 其他」 使用者的 READ 或 WRITE 存取) 用于datasets.xml.
* 當在ERDDAP™,密碼和其他連接字元都儲存在「 私密 」 中Java變數。
* 在產生 CQL 的 Cassandra 要求之前, 客戶的要求會被解析並檢查是否合法 。
* 要求卡珊德拉使用CQL Bond/Prepared Statements,以防止CQL注射. 不管怎樣 卡珊德拉從天而降[SQL 注射](https://en.wikipedia.org/wiki/SQL_injection).
         
#### 卡珊德拉速度{#cassandra-speed} 
卡珊德拉可以快速或慢。 有些事情你可以做得很快:
* 一般
CQL的性格是查询是[宣 示](https://en.wikipedia.org/wiki/Declarative_programming). 他們只是指定了使用者想要什麼 他們不包含如何處理或优化查詢的說明或提示 。 所以沒有辦法ERDDAP™產生查詢, 以幫助卡珊德拉优化查詢 (或以任何方式指定如何處理查詢) . 總而言之,由卡珊德拉行政官來安排 (例如,索引) 以优化某些類型的查詢。
     
* 指定與 coarser- 精密的分區金鑰相關的時間戳列 。&lt;分割區 金鑰來源名稱&gt; (# 分割鍵源名稱) 是最重要的幫助方式ERDDAP™和卡珊德拉高效合作 如果這段關係在卡珊德拉的桌子上存在 而你卻不說ERDDAP™數據集會很痛苦的慢ERDDAP™利用很多卡珊德拉資源
     
* 指定群組列通過 [&lt;群組來源名稱&gt; (# 群組列來源名稱) 是第二重要的幫助方式ERDDAP™和卡珊德拉高效合作 如果有團列,你不會說ERDDAP數據可能會不必要地 痛苦地慢下來ERDDAP™利用很多卡珊德拉資源
     
* 制作[索引](https://cassandra.apache.org/doc/latest/cql/indexes.html)常用限制變數 --
您可以建立 Cassandra 列的索引, 以加速一些查詢。
    
Cassandra 不能為清單、 設定或地圖列做索引 。
    
* 指定索引列通過 [&lt;索引 Column 來源名稱 &gt; (#索引列來源名稱) 重要的幫助方式ERDDAP™和卡珊德拉高效合作 如果有索引列而你不說ERDDAP,一些數據的查詢將會在ERDDAP™利用很多卡珊德拉資源
     
#### 卡珊德拉·斯塔茨{#cassandra-stats} 
*   ["Cassandra stats" 诊断訊息](#cassandra-stats)-- 每ERDDAP™使用者查詢到 Cassandra 資料集,ERDDAP™將列印在日志檔中, *大家长會* 例如,
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
用上面例子中的數字表示:

* 什麼時候ERDDAP™上次 (re) Cassandra 告訴過您, 已載入此數據集ERDDAP™隔離鍵有1000個不同的組合 。ERDDAP™在檔案中缓存了所有不同的組合 。
* 由于使用者的限制,ERDDAP™在10000個有理想數據的組合中, 所以ERDDAP™會打兩通電話給卡珊德拉 區域按鍵每組一個 (這是卡珊德拉的要求) 如果一個大數據集有許多分割鍵的組合, 您可以要求每個要求通過設定 。&lt;最大要求 (# 最大要求折射) . 在這裡, 2/1000=2e-4, 這小於最大要求分數 (0.1) 所以要求被允許了
* 在對分割區按鍵施加限制後,[群組列](#clustercolumnsourcenames)和[索引列](#indexcolumnsourcenames)由ERDDAP™卡珊德拉把1200行數據傳回ERDDAP™在成果集中。
* 結果 肯定有[資料 類型= *某類型* 列表](#cassandra-datatypes)列 (平均每份10件) 因為ERDDAP™1200列從卡珊德拉擴展到12000列ERDDAP.
*   ERDDAP™總是把使用者的所有限制 都用在卡珊德拉的資料上 在這個案子中,卡珊德拉未處理的限制使排數減到7405. 這是寄給使用者的行數 。

這些診斷訊息最重要的用處是確保ERDDAP™是做你認為它在做什么。 如果不是 (例如,它不象预期的那样减少不同的组合嗎?) ,然後你就可以用信息 試著找出出了什麼問題。
 
* 尋找和設置更好的研究和實驗 [&lt;連接檔Property &gt;] (#卡桑德拉-連接財產) 是
 
* 檢查卡珊德拉和ERDDAP. 如果連接速度慢, 看看能否改善它. 最好的情況是ERDDAP™正在於同樣的伺服器上執行 (快) 切換為執行您正在連接的 Cassandra 節點的伺服器 。
 
* 請耐心點 在這裡和卡珊德拉的文件裡仔細讀讀 實驗 看看你的工作 如果卡珊德拉...ERDDAP™連接仍比預期慢, 請包含您的 Cassandra 表格的計划和您的ERDDAP™區塊datasets.xml看我們[部分](/docs/intro#support).
 
* 如果其他人都失敗了
考慮把資料儲存在NetCDFv3.nc文件 (尤其是.nc使用[CF 分解采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)相連的 ragged 數據結構, 所以可以處理ERDDAP是[来自 NcCFF 的 EDD 表格](#eddtablefromnccffiles)) . 如果它們有理有理 (每個都有數量的數據) ,ERDDAP™可以很快地從它們中提取資料。
         
#### EDD Table from Cassandra 骨架 XML{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### 從 DapSequence 的 EDD 表格{#eddtablefromdapsequence} 
[ **從 DapSequence 的 EDD 表格** ](#eddtablefromdapsequence)處理 1- 和 2 等級序列內的變數[DAP](https://www.opendap.org/)伺服器等DAPper (在 https://www.pmel.noaa.gov/epic/software/dapper/ 已中止) .

* 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 然後你可以編輯它來調整它。 您可以在瀏覽器中查看來源數據集的 DS 和 DAS 檔案( 在 .das 和 .dds 中加入 .das ) 以收集您需要的信息 。sourceUrl(一例是 https://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds ).
    
* 變數在DAP如果 .dds 的回應表示持有變數的資料結構是「 序列 」 序列 (大小寫不敏感) .
* 在某些情况下, 您會看到序列中的序列, 2 等級序列 -- EDDTable FromDapSequence sequence handle了這些 。
#### 由 DapSequence 設定的 EDD 表格 XML{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### 數據庫中的 EDD 表格{#eddtablefromdatabase} 
[ **數據庫中的 EDD 表格** ](#eddtablefromdatabase)處理一個關聯數據庫表中的資料或[檢視](https://en.wikipedia.org/wiki/View_(database)).

#### 一個表格或檢視{#one-table-or-view} 
如果您要服務的資料是兩個或更多的表格 (因此需要一個JOIN 立即從兩張表格中提取資料) 你需要做一個[非正常化](https://en.wikipedia.org/wiki/Denormalization)  (已加入) 表格或[檢視](https://en.wikipedia.org/wiki/View_(SQL)) 包含您要以一個数据集提供的所有資料ERDDAP.

對於大型複雜的數據庫來說,將數個區塊分為非正常化的表格可能很合理,每個區塊都有不同類型的資料,這些資料將成為不同的数据集。ERDDAP.

使用非正常化的表格ERDDAP™聽起來可能是個瘋狂的主意 請相信我們 有很多原因ERDDAP™使用非正常化表格 :

* 這對使用者來說容易得多
什麼時候ERDDAP™顯示數據集是單一的,簡單的,非正常的,單一的表格, 任何人都很容易理解數據。 大多數使用者從未聽說過正常的表格,很少人會理解金鑰、外國金鑰或表格加入,而且他們幾乎肯定不知道不同加入的細節,也不知道如何指定SQL來做加入 (或多次加入) 沒錯 使用非正常化的表格可以避免所有的問題。 光是這個原因,就有理由使用非正常化的單個表格來顯示數據集ERDDAP™使用者。
     
* 普通表格 (按按鍵列排列的多份表格) 在數據庫中儲存數據是很好的。
但即使是在 SQL 中, 傳回使用者的結果也是不正常的 (加入) 單桌 因此,將數據集呈現為一個巨大的、非正常的、單一的表格, (例如,指示溫度所在的表格的行 " 30) .
     
* 你可以改變ERDDAP™不改變你的桌子。
    ERDDAP™有一些要求可能與你建立數據庫的方式不同。
例如,ERDDAP™需要將時章資料儲存在「 時章與時區 」 欄位 。
以單獨的表格/檢視ERDDAP™,你可以做這些變更 當你做了非正常的表格為ERDDAP. 所以,你不必做任何改變 你的桌子。
     
*   ERDDAP™以重新建立一些普通表格的结构。
您可以指定哪些列資料來自 'outer' 表格, 因此相對數值有限 。ERDDAP™將會收集這些欄目中所有不同的數值組合, 並將它們顯示在特殊的 。 子集網頁, 幫助使用者快速選擇數據集的子集 。 數據集其他網頁的下拉清單中也顯示了每個欄目的不同值 。
     
* 一個非正常化的表格讓數據從你手中傳到ERDDAP管理者容易。
你是數據集的專家 所以你決定要加入哪些表格 哪些列 以及如何加入 所以你不用交出我們 (更糟糕的是,) 幾張表格和如何加入的明確指示 你只要給我們權限 就能進入非正常化的桌子
     
* 不正常的表格可以有效存取資料。
非正常化的形态通常比正常化的形态要快. 加入會很慢的 多重加入可能很慢。
     

以將數據庫中兩個或更多表格的資料輸入ERDDAP™,有三种選擇:
 

* 建議的選擇 :
您可以用非正常化表格中的資料建立逗號或分頁數值檔案 。
如果數據集是巨大的, 那麼建立數個檔案是有道理的, 每個檔案都有不常化的表格的相連子集 (例如,小於時間範圍的資料) .
    
最大的優勢是ERDDAP™您的數據庫不再努力, 就能處理使用者的數據要求 。 所以ERDDAP™不會是你的數據庫的負擔或安全危險 這是所有情況下最好的選擇 因為ERDDAP™通常能更快地從檔案中获得資料 (如果將 .csv 檔案轉換為.ncCF 文件) . (部分原因是...ERDDAP+ files 是只讀的系統, 在提供時不需要處理變更[ACID](https://en.wikipedia.org/wiki/ACID)  (原子性、一致性、隔離性、可達性) .) 而且,你可能不需要另外的伺服器 因為我們可以把數據儲存在我們的一個RAID上 用现有的ERDDAP™在已有的伺服器上。
    
* 好的選擇 :
你在另一台電腦上建了新的數據庫 只配有非正常化的表格
因為這個數據庫可以像MariaDB、MySQL、PostgreSQL一樣是自由開放的資料庫,
    
最大的優勢是ERDDAP™將可以處理使用者的數據要求, 而不需要您目前的數據庫做任何进一步努力。 所以ERDDAP™不會是您目前數據庫的負擔。 這也消除了很多安全關注ERDDAP™無法存取您的目前的數據庫 。
    
* 失敗的選擇 :
我們可以連接ERDDAP™到目前的數據庫。
要做到這一點,你需要:
    
    * 以非正常化的資料表格建立不同的表格或檢視 。
    * 建立「 erddap 」 使用者只讀取到非正常化的表格 (s) .
         
    
這是一個選項, 如果數據變更很频繁, 您要給它ERDDAP™使用者即時存取這些變更; 然而, 即使如此, 使用上面的檔案選項或許有道理 。 (每30分鐘?) 取代今天的資料 。
這種方法最大的缺点是ERDDAP™用戶的請求可能會使您的數據庫承受不起沉重的負擔,而且ERDDAP™連接是安全風險 (雖然我們可以把風險最小化/管理) .

讓表或視窗失去常態ERDDAP™是個好機會 做一些改變ERDDAP™需要,以不影響你原有表格的方式:

* 更改日期和時間戳字段/列以使用 Postgres 呼叫的資料[有時區的時間戳](#database-date-time-data)  (或數據庫中的等效者) .
沒有時區資訊的時間戳不能正常工作ERDDAP.
* 做使用者常搜尋的列的索引 。
* 注意[字段/列名](#quotes-for-names-and-case-sensitivity)  (例如, 使用所有小寫) 當你打字。
* 不要用保留字表和字段/列名。

如果您需要幫助, 請聯繫數據庫管理員 。
如果你想談論這套方法 或者制定最佳的策略 請發郵件給克里斯 約翰在諾亞戈夫
    
#### 資料庫中datasets.xml {#database-in-datasetsxml} 
很難建立正確的datasets.xml所需信息ERDDAP™建立與數據庫的連接。 耐心點 有理有理.
* 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 然後你可以編輯它來調整它。
        
產生達塔斯 Xml 對 EDD Table FromDatabase 有三個特殊的選擇:
1. 如果你進入"&#33; &#33; (沒有引文) 對目錄名稱, 程式會顯示目錄名稱清單 。
2. 如果你進入"&#33; &#33; (沒有引文) 程式會顯示一個圖案名稱清單。
3. 如果你進入"&#33; &#33; (沒有引文) 表格名,此程式會顯示表格及其列的清單。 第一個 "&#33; &#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;"
* 仔細讀取這份文件所有關於 EDDTable From Database 的資訊 。
* 您可以通過聯絡數據庫管理員及搜尋網絡, 收集建立 EDD Table FromDatabase 資料集 XML 所需的大部分資訊 。
* 雖然數據庫常以不区分大小寫的方式處理列名稱和表格名稱,ERDDAP. 所以如果數據庫的錯誤訊息說欄名未知 (例如,“未知的标识符= ' ' *欄名* '") 即使你知道它存在, 試著利用所有的首都, 例如, *哥倫布* ,這常常是列名的真實的、大小寫敏感版本。
* 與數據庫管理員密切合作, 如果數據集無法載入, 請讀取[錯誤訊息](#troubleshooting-tips)注意找出原因
         
#### JDBC 驅動程式{#jdbc-driver} 
* [JDBC 驅動程式與&lt;驅動程式Name &gt;] (#Jdbc 司机 #) -- 您必須取得適當的 JDBC 3 或 JDBC 4 驅動程式 .jar 檔案供您的數據庫和
放進去 *湯姆卡* 安裝後的 /webapps/erddap/WEB-INF/libERDDAP. 然后,在你的datasets.xml此數據集, 您必須指定&lt;此驅動程式的驅動程式Name &gt;, 就是 (很不幸) 與文件名不同。 在網上搜尋您的數據庫和驅動程式的 JDBC 驅動程式NameJava需要用它。
    
    * 為瑪麗亞DB,試試[ https://mariadb.com/kb/en/about-the-mariadb-java-client/ ](https://mariadb.com/kb/en/about-the-mariadb-java-client/)  
其&lt;要使用的驅動程式Name &gt;datasets.xml  (见下文) 可能是org.maridb.jdbc。 司機
    * MySQL 和 Amazon RDS , 請試試[ https://dev.mysql.com/downloads/connector/j/ ](https://dev.mysql.com/downloads/connector/j/)  
其&lt;要使用的驅動程式Name &gt;datasets.xml  (见下文) 可能是com.mysql.jdbc。 司機
    * 為Oracle,試著[ https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html ](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html).
其&lt;要使用的驅動程式Name &gt;datasets.xml  (见下文) 可能是Oracle.jdbc.driver。Oracle司機
    * 為了Postgresql 我們得到了JDBC 4的司機[ https://mvnrepository.com/artifact/org.postgresql/postgresql ](https://mvnrepository.com/artifact/org.postgresql/postgresql)  
其&lt;要使用的驅動程式Name &gt;datasets.xml  (见下文) 可能是org.postgresql。 司機
    * SQL 伺服器可以從中取得 JTDS JDBC 驅動程式[ https://jtds.sourceforge.net ](https://jtds.sourceforge.net).
其&lt;要使用的驅動程式Name &gt;datasets.xml  (见下文) 可能是 net. sourceforge.jtds.jdbc. 司機
    
把JDBC司機放進去之後ERDDAP™lib 目錄中, 您需要在 . bat 和/ 或 sh 文稿檔案中新增參考 . jar 檔的參考 Xml、 DasDds 和 ArchiveADataset 中 *湯姆卡* /webapps/erddap/WEB-INF/ 目錄; 否則, 當您執行這些文稿時, 您將會得到 Class NotFound Excepion 。
    
不幸的是,JDBC有時是麻煩的根源。 作為介于ERDDAP™和數據庫,它有時會對標準/基因數據庫 SQL 要求做微妙的修改ERDDAP™建立, 从而造成問題 (例如,[大/小寫标识符](#quotes-for-names-and-case-sensitivity)和[日期/時間](#database-date-time-data)) . 請耐心點,仔細看這裡的資料 檢查你的作品,看看我們的[部分](/docs/intro#support).
    
#### 數據庫&lt;連接 屬性( gt;){#database-connectionproperty} 
* [&lt;連接檔Property &gt;] (# 數據庫-連接物產) -- 在datasets.xml您的數據集必須定義一些連接 要告訴的屬性標籤ERDDAP™如何連接您的數據庫 (例如, 指定使用者名稱、 密碼、 SSL 連接, 以及[取得大小](#set-the-fetch-size)) . 每個情況都不同, 搜尋網頁中使用 JDBC 驅動程式連接您的數據庫的例子 。 其&lt;Property &gt; 名稱 (例如"使用者","密碼","ssl") , 以及一些連接器 Property 值可以通过搜尋網頁來找到 。 *資料庫 類型* " (例如,Oracle, MySQL, 亞馬遜 RDS, MariaDB, PostgreSQL) .
     
#### 名稱和大小寫敏感度引文{#quotes-for-names-and-case-sensitivity} 
*   [字段/字段名稱引文; 大小寫敏感度](#quotes-for-names-and-case-sensitivity)- 預設 EDDTable FromDatabase 在 SELECT 語言中將 ANSI- SQL 標準雙引號放在字段/列名的周圍, 以防您使用保留字段/列名, 或是字段/列名中的特殊字符 。 雙引文也阻止了某些類型的 SQL 注射攻擊。 你看得出來ERDDAP™用 " , " ,或沒有引文&lt;列Name 引文 &gt;  indatasets.xml此数据集。
    
對許多數據庫來說, 使用任何類型的引文都讓數據庫以敏感大小寫的方式與字段/列名合作 (而不是預設的數據庫大小寫不敏感的方式) . 數據庫常顯示檔案/列名為所有大寫, 在ERDDAP™,請將數據庫列名稱視為大小寫敏感。
    
    * 為了瑪麗亞 DB, 您需要用[\\ -sql -mode=ANSI=UOTES](https://mariadb.com/kb/en/mysql-command-line-client/).
    * MySQL 和 Amazon RDS 的數據庫需要用[\\ -sql -mode=ANSI=UOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes).
    *   Oracle支援 ANSI- SQL 標準雙引號[默认](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223).
    * PostgreSQL 預設支援 ANSI- SQL 標準雙引號 。
    
      
不要在資料庫、目錄、圖案或表格的名字中使用保留字。ERDDAP™不把引言放在他們身上
    
如果可能, 在建立數據庫表格時, 使用所有小寫來建立數據庫、 目錄、 方案、 表格名稱和字段名稱 (或檢視) 字段/列名datasets.xml inERDDAP. 否則您可能會收到錯誤訊息, 顯示資料庫、目錄、 圖表、 表格和/ 或字段沒有找到 。 如果您真的收到錯誤訊息, 請試著使用大小寫敏感版本, 所有大寫版本, 以及所有小寫版本 。ERDDAP. 其中一個可能有用。 如果不是, 您需要將數據庫、 目錄、 方案及/ 或表格的名稱更改為所有小寫 。
    
#### 數據庫&lt;資料 類型( G) ;{#database-datatype} 
*   [數據庫](#database-datatype)[&lt;資料Type &gt; (# 資料類型) 標籤... 因為有些模糊[數據庫資料類型](https://www.w3schools.com/sql/sql_datatypes_general.asp)地圖ERDDAP™資料類型,您需要指定 [&lt;資料Type &gt; (# 資料類型) 每一個的標籤 [&lt;dataVariable&gt;] (可數據變化) 要告訴ERDDAP™要使用的資料 Type 。 部分問題是不同的數據集對不同的數據類型使用不同的名詞——所以總是試著符合定義,而不仅仅是名字. 參考[標準ERDDAP™資料 類型](#data-types),其中包含對應的 SQL 資料類型的引用。[日期和时间戳](#database-date-time-data)特殊情况:使用ERDDAP雙數據 型。
     
#### 數據庫日期時間資料{#database-date-time-data} 
有些數據庫日期時間欄沒有明确的時區 。 這些柱子很麻煩ERDDAP. 數據庫支持日期的概念 (有或沒有時間) 沒有時區, 但是Java  (因此ERDDAP) 只處理時區的即時日期+時間。 所以你可能知道日期時間數據是根據本地時區 (不管是否省日光) 或格林尼治平时/Zulu時區,但是Java  (和ERDDAP) 不要 我們原本以為可以解決這個問題 (例如, 指定列的時區) ,但數據庫+JDBC+Java互動使這不可靠
* 所以ERDDAP™要求您用符合 JDBC 類型的「 時區印記」 的數據庫型態, 在資料庫表格中儲存所有日期資料 。 (最理想的是使用GMT/Zulu時區) .
* 在ERDDAP是datasets.xml在&lt;dataVariable&gt; 時間戳變數的標籤, 設定
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

中&lt;addAttributes&gt; 设定
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* 建议 : 如果數據是時間範圍, 讓時間戳值指向暗示時間範圍的中心是有用的 (例如,中午) . 例如,如果一個使用者有另一個数据集的2010-03-26T13:00Z的數據,他們想要從有每日資料的數據庫数据集得到最接近的數據,那么2010-03-26T12:00Z的數據庫數據庫資料 (表示此日期的資料) 顯然是最好的 (而不是之前或之後的午夜,) .
*   ERDDAP™有用於[轉換數字 時間到/ 從字符串時間](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* 看[怎么ERDDAP處理時間](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
       
#### 整數無效{#integer-nulls-1} 
數據庫支援整數無效 (英寸, 小墨, 小墨) 列,但是ERDDAP™不支持真假
數據庫無效將轉換到ERDDAP™127個字節列,255個字節列,32767個字節列,65535個字節列,2147483647個字節列,4294967295個字節列,9 223 372 036 854 775 807個字節列,1844744073709551615個字節列。 如果您使用這些預設值, 請指出missing\\_value數據集使用者的 sERDDAP™與

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

或

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

或者,你可以使用 "missing\\_value"屬性"而不是"FillValue"
產生達塔斯 Xml 產生建議時自動新增這些 QQFillVale 屬性datasets.xml用于數據庫數據集。

對數據庫浮點列, 無效者會在ERDDAP.
轉換成 Strings 在ERDDAP™,空格會轉換成空格 。
    
#### 數據庫安全{#database-security} 
* 在與數據庫合作時, 您需要盡最大可能安全無虞地做一些事情, 避免讓惡意使用者破壞您的數據庫或取得他們不該存取的資料。ERDDAP™也試著以安全的方式做事
    * 考慮在另一台電腦上复制數據庫和數據庫表格以及您想要的資料ERDDAP™服侍。 (對,對商業數據庫來說Oracle,這涉及额外的許可費。 但對開源數據庫來說, 如PostgreSQL、MySQL、Amazon RDS和MariaDB,) 這能讓你有高度的安全感 也能阻止ERDDAP™要求減慢原始資料庫。
    * 我們鼓勵你建立ERDDAP™將數據庫連接到這個數據庫中, 因為數據庫使用者只能存取 **相关** 資料庫 (s) 而且只有讀取權限 。
    * 我們鼓勵你們建立聯系ERDDAP™以至數據庫
        * 總是使用SSL,
        * 只允許從一個 IP 位址連接 (或區塊地址) 和從一個ERDDAP™使用者,以及
        * 只傳輸其 MD5 散列格式的密碼 。
    *   \\[已知的問題\\]連接功能 (包括密碼&#33;) 以純文字儲存於datasets.xml. 我們還沒找到方法讓管理員在其中輸入數據庫密碼ERDDAP在Tomcat的啟動 (不使用使用者輸入) ,所以密碼必須可以在檔案中存取。 為了更加安全:
        * 你 (该ERDDAP™管理者) 應該是datasets.xml并有讀取和寫取權。
        * 建立只包含使用者的群組 。 使用 chgrp 來建立此群組datasets.xml只有讀取權限
        * 使用 chmod 來指定 o- rwx 權限 (沒有對「 其他」 使用者的 READ 或 WRITE 存取) 用于datasets.xml.
    * 當在ERDDAP™,密碼和其他連接字元都儲存在「 私密 」 中Java變數。
    * 在產生數據庫的 SQL 要求之前, 客戶端的要求會被解析並檢查是否有效 。
    * 要求資料庫使用 SQL 備份表單,以阻止[SQL 注射](https://en.wikipedia.org/wiki/SQL_injection).
    * 提交數據庫的要求與執行 查詢 (未執行狀態) 以限制只讀的要求 (所以試圖用 SQL 注射來改變數據庫也會因此失敗) .
         
#### SQL 檔案{#sql} 
* 因為OPeNDAP表格數據要求被設計成模仿 SQL 表格數據要求,ERDDAP™將表格資料要求轉換成簡單的 SQL 備份表單。 例如,ERDDAP™要求
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
將轉換成 SQL 備份狀態
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
ERDDAP™使用 & diffect 的要求 () 和/或 &orderBy ( *變數* ) 新增命令和/或命令 *變數* 到 SQL 預備的聲明。 這將大大減慢數據庫的回應。
ERDDAP™日志[log.txt](/docs/server-admin/additional-information#log)如
```
    statement=*thePreparedStatement*  
```
這將是寫作聲明的文字, 例如, 在備忘錄中, 時代的編碼是特殊的 。 但在文字表示中,它們以ISO 8601的日期出现.
     
#### 數據庫速度{#database-speed} 
* 數據庫可能很慢 有些事情你可以做:
    * 一般
SQL 的性格是:[宣 示](https://en.wikipedia.org/wiki/Declarative_programming). 他們只是指定了使用者想要什麼 他們不包含如何處理或优化查詢的說明或提示 。 所以沒有辦法ERDDAP™將查詢產生到它能幫助數據庫优化查詢 (或以任何方式指定如何處理查詢) . 一般由數據庫管理員來設置 (例如,索引) 以优化某些類型的查詢。
##### 設定抓取大小{#set-the-fetch-size} 
數據庫返回資料到ERDDAP™成片 默认情况下, 不同的資料庫會傳回區塊中不同的列 。 通常這個數字非常小,效率非常低。 例如,Oracle十&#33; 讀取您的數據庫 JDBC 驅動程式的 JDBC 文件, 以尋找要設定的連接屬性, 以便增加此功能, 並加入到資料集的描述中datasets.xml. 例如,
使用 MySQL 和 Amazon RDS
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
對MariaDB來說, 目前無法改變抓取大小 。 但這是一個要求的功能, 所以搜索網頁看看是否實行 。
為Oracle使用
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
PostgreSQL 使用
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
但可以隨意改變號碼 設定數字太大會造成ERDDAP™使用很多的記憶體, 更可能耗盡記憶體。
#### 連接產品{#connectionproperties} 
每個數據庫都有其它連接屬性,可以在datasets.xml. 其中很多會影響數據庫的性能ERDDAP™連接。 請讀取您的數據庫 JDBC 驅動程式的檔案來查看選項 。 如果您找到有用連接網址的屬性, 請發送一個包含內容的電子郵件至erd dot data at noaa dot gov.
* 制作表格...
你定期回應可能會更快 (每天? 有新資料嗎?) 產生實際表格 (就像你如何產生VEW) 告訴ERDDAP™以從表格中取得數據而不是 VEW。 若沒有加入另一個表格,
* 真空表 -
MySQL 和 Amazon RDS 如果您使用, 反應會快得多[偏好表](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html).
瑪麗亞 如果您使用, DB 反應會快得多[偏好表](https://mariadb.com/kb/en/optimize-table/).
PostgreSQL 的回應要快得多[瓦库姆](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html)桌子
    Oracle不需要或需要相似的命令
* 制作[索引](https://en.wikipedia.org/wiki/Database_index)常用限制變數 --
您可以在數據庫中建立變數的索引, 以加速很多/ 大多数的查詢 (哪些數據庫稱為「列」) 在使用者的查詢中常受到限制。 一般来说,這些變數是由[&lt;subsetVariables&gt;] (# 可變性) 和/或纬度、經度和時間變數。
##### 使用連接集{#use-connection-pooling} 
通常ERDDAP™為每個要求建立與數據庫的單一連線。 這是最可靠的方法 更快的選擇是使用支援連接集的資料來源 。 要設置它,請指定 (例如)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
右邊&lt;sourceUrl&gt;,&lt;驅動程式Name &gt;,及&lt;連接 屬性&gt;。
和在 *湯姆卡* /conf/context.xml,定义有相同資訊的資源,例如,
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
使用數據來源的資訊[ https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html ](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html).
看[Tomcat 資料來源資訊](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources)和[Tomcat 資料來源示例](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html)或用其他應用程式伺服器搜尋網頁的資料來源示例。
* 如果其他人都失敗了
考慮把資料儲存在NetCDFv3.nc文件 (尤其是.nc使用[CF 分解采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)相連的 ragged 數據結構, 所以可以處理ERDDAP是[来自 NcCFF 的 EDD 表格](#eddtablefromnccffiles)) . 如果它們有理有理 (每個都有數量的數據) ,ERDDAP™可以很快地從它們中提取資料。
         
#### 數據庫的 EDD Table 骨架 XML{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### 從 EDD 表格EDDGrid {#eddtablefromeddgrid} 
[ **從 EDD 表格EDDGrid** ](#eddtablefromeddgrid)讓您從任意一個中建立 EDD Table 資料集EDDGrid數據集。

* 其共同原因是:
    * 這可以讓數據集被查詢OPeNDAP選取限制, 是「 按值清潔」 的類型 。 (使用者可能要求的) .
    * 數據集本身就是表格化的數據集 。
* 全局屬性"maxAxis0"的值 (通常類型="int") , (缺省值為 10) 將用於限制轴數\\[0\\]  (通常"time"轴) 所附值EDDGrid數據集,每份資料要求都可以存取。 如果您不想有限制, 請指定 0 的值 。 這個設定很重要, 因為要不然, 用戶要問 EDD Table From 太容易了EDDGrid查看所有網格化的數據。 這需要很長的時間, 這是讓EDD表從此安全EDDGrid您的數據集ERDDAP也不怕會不合理地使用計算資源。
* 如果附件EDDGrid是[EDDGrid來自 Erddap](#eddfromerddap)和ERDDAP™一樣ERDDAP,然后 EDD Table 從EDDGrid總是直接使用目前可用的參考數據集版本。 這對 EDD Table From 非常有效EDDGrid以存取網格化的資料。
* 這個班&lt;重新載入 每一個NMinutes &gt;] (每分鐘重載) 這才是最重要的 所附EDDGrid是&lt;重新載入 EveryNminutes &gt; 被忽略 。
* 如果值為:&lt;更新 EveryNMILIS &gt; (# 更新每個人 #) 提供此數據集, 它被忽略 。 所附EDDGrid是&lt;更新EveryNMILIS&gt;才是最重要的。
*   [產生 DatasetsXml](#generatedatasetsxml)有數據集類型的選項 = EDDTable fromEDDGrid需要網址的ERDDAP  (通常相同ERDDAP)   (以 "/erddap/" 结尾) 和正規的表示式。 產生達塔斯 Xml 然后產生 XML 的 IDD Table 從EDDGrid數據集ERDDAP™有一個datasetID符合正規表示式的 (使用 . QQ 以匹配全部datasetIDs 表示网格数据集) .
    
由 GenerateDatasetsXml 為每個數據集產生的 XML 區塊包括:
    
    * AdatasetID就是EDDGrid是datasetID加上"AsATable"
    * 新的全球屬性摘要EDDGrid摘要加上描述此数据集的第一段。
    * 新標題全局屬性, 就是EDDGrid冠名加 ", (如表) ".
    * 新的最大Axis0 全球屬性, 值為 10 。
#### 從 EDD 表格EDDGrid骨架 XML{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### 檔案名稱中的 EDD 表格{#eddtablefromfilenames} 
[ **檔案名稱中的 EDD 表格** ](#eddtablefromfilenames)建立從伺服器檔案系統中一组檔案的資訊中產生的數據集, 包括每個檔案的網址, 讓使用者能通過此檔案下載ERDDAP是["files"系統](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html). 不像所有的[檔案中的 EDD 表格](#eddtablefromfiles)子類別, 此数据集類型不服務檔案內的資料 。

* 當 :
    * 您有一组檔案, 您想要以整份檔案來分发, 因為它們不包含「 資料 」 。 例如,影像檔案、 影像檔案、 Word 文件、 Excel 電子表格檔案、 PowerPoint 演示檔, 或是文字檔案, 或沒有結構的文字 。
    * 您有一组檔案的資料格式ERDDAP™還沒讀懂呢 例如專案特有,自訂,二進制格式.
         
#### 檔案名稱資料中的 EDD 表格{#eddtablefromfilenames-data} 
*   [EDD Table fromFileNames 資料集中的資料](#eddtablefromfilenames-data)表格ERDDAP™以群組本地檔案的資訊建立於飛行 。 表格中, 每份文件都有一行 。 在[datasets.xml此數據集](#eddtablefromfilenames-skeleton-xml)決定要包含在這個數據庫中的檔案 :
    
##### 文件 迪爾{#filedir} 
    *   &lt;文件Dir &gt; -- 此指定伺服器檔案系統中的來源目錄與此数据集的檔案 。 位於伺服器檔案系統中的檔案&lt;檔案 Dir &gt; 將會出現於此數據集的 url 列中, 位於一個被命名的虛擬目錄內 https://*serverUrl*/erddap/files/*datasetID/* .
例如,如果datasetID是 jplMURSST
和&lt;檔案 Dir &gt; 是 / home/data/mur/ ,
而此目錄的檔案名稱為 jplMURSST20150103000000.png,
然後要顯示給使用者的檔案網址會是
         https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png .
        
除了使用本地目錄之外&lt;fileDir&gt;,您也可以指定远程目錄類似網頁的網址。 其效法是:
        
        * THREDDS中未分類的數據集,例如,
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 此伺服器已不可靠 。\\]
        * 未分解的数据集Hyrax例如,
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * 大部分类似 Apache 的目錄清單, 例如 ,
            [ https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/ ](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/)
##### 從"飛翔"{#fromonthefly} 
[\\*\\*"在飛翔"](#fromonthefly)-- 為了一些巨大的S3桶 (就像Noaa-goes17,它有2600萬份檔案) 可能需要ERDDAP™最多12小時可以下載所有關於桶內內容的資訊 (還有別的問題) . 要繞過這段路 有一種特殊的用法&lt;在 EDDTable FromFileNames 中檔案Dir&gt; 可以用 AWS S3 桶中的目錄與檔案名稱建立數據集。 數據集沒有所有 S3 桶目錄和檔案名的清單, 使用者可以通过數據集的要求來搜尋 。 但是,如果使用者用數據集的分類翻譯了目錄和檔案的名稱,數據集將會在飛行中取得其名稱"files"选项。 因此, 這可以讓使用者通过數據集瀏覽 S3 桶的檔案階層與檔案"files"系統。 要這樣做, 不要指定 S3 桶的網址為「 啟動目錄」 。 (生成達泰斯 Xml 命令) 或&lt;檔案「 Dir」 ( indatasets.xml) ,使用:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
例如:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
查看文件[与 S3 Buckets 合作ERDDAP™](#working-with-aws-s3-files),特别是S3桶 URL必须使用的具体格式的描述。 看
[這些細節和例子](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket)使用\\*\\*出自《飛行》
        
##### 遞迴{#recursive} 
*   &lt;遞迴&gt; -- 子目錄中的檔案&lt;fileDir &gt; 和符合的名字&lt;檔案 Regex &gt; 將會出現在同一子目錄中"files"網址如果&lt;遞迴&gt; 已設定為真實 。 缺省是假的。
* [&lt;路徑Regex &gt;] (#病原体) -- 如果 recursive= true, 只有符合路徑的目錄名稱 (缺省=... ...... .........") 會被接受的 如果 recursive= false, 這會被忽略 。 這很少被使用,但在不尋常的情況下可能非常有用. (看這個[regex 文件](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)和[regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
##### 文件Regex{#fileregex} 
*   &lt;檔案 Regex &gt; -- 只有所有文件名所在的文件名 (不包含目錄名稱) 匹配&lt;檔案 Regex&gt; 將會包含在此数据集中。 例如, jplMURSST.&#123;14&#125;png. (看這個[regex 文件](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)和[regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
         
##### 從檔案名稱資料表內容{#from-file-names-data-table-contents} 
表格中有:
* URL -- 使用者可用以下載檔案的網址ERDDAP是["files"系統](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
* 名稱 -- 文件的名字 (沒有目錄名稱) .
* 上次修改... 檔案上次修改的時間 (儲存為雙倍"seconds since 1970-01-01T00:00:00Z") . 此變數是有用的, 因為使用者可以看到某個檔案的內容是否最後變更 。 此變數是[時間 印花變數](#timestamp-variables)數值 (自1970-01-01T00:00Z起的秒) 字符串值 (ISO 8601:2004 (英) 格式) 依情況而定
* 大小 -- 以字節表示的檔案大小, 儲存為雙倍 。 它們被儲存為雙倍, 因為有些檔案可能比 int 所允許的要大, 而一些回應檔案類型不支援長度 。 雙胞胎會给出精确的大小, 即使對非常大的文件。
* 新增列ERDDAP™從文件名中提取信息的管理員 (例如,與檔案中的資料相關的時間) 根據您在元数据中為每個新增欄/ 指定兩個屬性dataVariable:
    
    * 提取Regex - 這是一個[正则表示式](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) . 整個 regex 必須符合整個檔名 (不包含目錄名稱) . Regex 必須包含至少一個抓取群組 (括括括括弧中的正規表示式的一部份) 其中ERDDAP™用于決定要提取哪些區域來成為資料 。
    * 提取 群組 這是抓取群組的數字 (# 1 是第一個抓取群組) 在正则表示式中。 缺省值是 1 。 抓取群組是正規表示式的一部份, 括弧內。
    
以下是兩個例子:
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
如果是時間變數, 如果檔案有 jplMU 名稱RSST20150103000000.png, 提取 Regex 會符合檔名, 提取符合第一個抓取群組的字元 ("201501030000") 表示數據Type= string,然后使用[适合字符串時間的單位](#string-time-units)將字串分解成時間數據值 (2015-01-03 T00:00Z) .

如果是日變數, 如果檔案有 jplMU 名稱RSST20150103000000.png, 提取 Regex 會符合檔名, 提取符合第一個抓取群組的字元 ("03") as [&lt;資料Type &gt; (# 資料類型) QQint, 產生數據值為 3 。
        
#### 其他信息{#other-information} 
* 不&lt;更新 EveryNMILIS &gt; (# 更新每個人 #) -- 此類型的數據集不需要也不能使用&lt;更新 EveryNMILIS &gt; 標籤, 因為 EDDTable FromFileNames 所服務的資訊總是完全更新, 因為ERDDAP™查詢檔案系統,以便回應每個資料要求。 即使有許多檔案, 如果檔案數量很大, 而數據集有段時間沒有被查詢, 答覆可能會很慢 。 但之後幾分鐘內, 操作系統將資訊儲存在缓存中, 所以回應應該非常快 。
     
* 你可以使用[產生達塔斯 Xml 程式](#generatedatasetsxml)制作datasets.xml此數據集的區塊 。 您可以用從檔名中提取的信息來新增/ 定義其他欄目, 如上所示 。
     
#### 從檔案名稱的 EDD Table 骨架 XML{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### 檔案中的 EDD 表格{#eddtablefromfiles} 
[ **檔案中的 EDD 表格** ](#eddtablefromfiles)是從... 您不能直接使用 EDD Table from Files 。 相反, 使用 EDDTable FromFiles 的子类來處理特定的檔案類型 :

*   [Ascii 檔案中的 EDD 表格](#eddtablefromasciifiles)從逗號、 分號、 分號、 或空間分隔的 ASCII 資料檔中汇总資料 。
*   [AudioFiles 的 EDD表](#eddfromaudiofiles)集合本地音效檔案的資料 。
*   [從 EDD 表格 AwsXml 檔案](#eddtablefromawsxmlfiles)自動氣象站的資料集合 (阿WS) XML 文件 。
*   [ColumnarAscii 檔案中的 EMD 表格](#eddtablefromcolumnarasciifiles)總結表格 ASCII 資料檔中的有固定width 資料列的資料。
*   [從 EDD 表格Hyrax文件](#eddtablefromhyraxfiles)  (已刪除) 數個變數集合資料, 每一個都有共享的維度 (例如: 時間、高度 (深度) ,經度) ,由[Hyrax OPeNDAP伺服器](https://www.opendap.org/software/hyrax-data-server).
*   [來自 InvalidCRA 檔案的 IDD 表格](#eddtablefrominvalidcrafiles)總和資料來自NetCDF  (v3 或 v4)  .nc使用 CF DSG 相關列的變體的檔案 (CRA 磁碟) 文件。 雖然ERDDAP™支援此檔案類型, 是無效的檔案類型, 沒有人可以開始使用 。 目前使用此檔案類型的群組被強烈鼓勵使用ERDDAP™以產生有效的 CF DSG CRA 檔案, 並停止使用這些檔案 。
*   [JsonlCSV 檔案中的 EDD 表格](#eddtablefromjsonlcsvfiles)總和資料來自[杰森 行 CSV 文件](https://jsonlines.org/examples/).
*   [多晶格檔案的 IDD 表格](#eddtablefrommultidimncfiles)總和資料來自NetCDF  (v3 或 v4)  .nc  (或[.nc毫升](#ncml-files)) 包含數個變數的檔案, 每個變數都有共享的尺寸 (例如: 時間、高度 (深度) ,經度) .
*   [NcFiles 的 EDD 表格](#eddtablefromncfiles)總和資料來自NetCDF  (v3 或 v4)  .nc  (或[.nc毫升](#ncml-files)) 包含數個變數的檔案, 每個變數都有共享的尺寸 (例如: 時間、高度 (深度) ,經度) . 繼續使用此數據集的類型可以, 但對於新的數據集, 我們建議使用 EDD Table From MultidimNcFiles 。
*   [来自 NcCFF 的 EDD 表格](#eddtablefromnccffiles)總和資料來自NetCDF  (v3 或 v4)  .nc  (或[.nc毫升](#ncml-files)) 使用檔案格式的檔案[CF 分解采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)公约。 但對使用多面性 CF DSG 變體之一的檔案,使用[多晶格檔案的 IDD 表格](#eddtablefrommultidimncfiles)相反。
*   [Nccsv 檔案中的 IDD 表格](#eddtablefromnccsvfiles)總和資料來自[NCCSV 檔案](/docs/user/nccsv-1.00)ASCII.csv 檔案.
*   [Parquet 檔案的 EMD 表格](#eddtablefromparquetfiles)處理來自[平面](https://parquet.apache.org/).
*   [來自垃圾的 EDD 表格](#eddtablefromthreddsfiles)  (已刪除) 總合檔案中的數個變數的數據[土 石OPeNDAP伺服器](https://www.unidata.ucar.edu/software/tds/).
*   [從 EDD 表格WFS文件](#eddtablefromwfsfiles)  (已刪除) 做一個本地複製所有資料ArcGIS映射伺服器WFS伺服器使數據能很快重新保存到ERDDAP™使用者。

目前, 不支援其他檔案類型 。 但加入其他檔案類型的支援通常相对容易. 有要求就聯繫我們 或者,如果你的資料是以舊的檔案格式寫成的,而你想離開,我們建議轉換檔案NetCDFv3.nc文件 (特别是.nc檔案[CF 分解采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)相關的標籤數據結構 --ERDDAP™可以從中快速提取資料) .NetCDF是一种廣泛支持的二進制格式, 允許快速隨機存取資料, 而且已經得到ERDDAP.

#### 從檔案詳情{#fromfiles-details} 
以下資訊适用于 EDDTable FromFiles 的所有子類 。
##### 聚合{#aggregation} 
此類群集本地檔案的資料 。 每個檔案都有 (相对) 小的數據表。
    * 產生的數據集似乎所有檔案的表格都被合并了 (檔案 # 1 的所有列數據, 加上檔案 # 2 的所有列數...) .
    * 檔案不必全部都有指定的變數 。 如果指定的檔案沒有指定的變數,ERDDAP™。
    * 所有檔案的變數都對此有相同的值[add\\_offset](#scale_factor),[missing\\_value](#missing_value),[填充 值](#missing_value),[scale\\_factor](#scale_factor)和[單位](#units)屬性 (如果有) .ERDDAP™檢查,但它是一個不完美的考驗 -- 如果有不同的價值,ERDDAP不知道哪個是正確的 所以哪些檔案是無效的 如果有問題, 你可以使用[NcML](#ncml-files)或[NCO](#netcdf-operators-nco)解決問題
         
##### 壓縮的檔案{#compressed-files} 
所有 EDDTable FromFiles 子类的來源資料檔案都可以外部壓縮 (例如,.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2,或.Z) . 看[外部壓縮檔案文件](#externally-compressed-files).
     
##### 已儲存的檔案資訊{#cached-file-information-1} 
* 當 EDD Table From Files 資料集首次載入時, EDD Table From Files 從所有相關檔案讀取資訊並建立表格 (每個檔案一行) 包含每個合法檔案和每個"壞"的資訊 (不同或無效) 文件。
    * 表格也保存在磁碟上, 因為NetCDFv3.nc文件在 *大家长會* /dataset/ *上2 CharsOfDatasetID 中* / *datasetID* / 在命名的檔案中 :
目錄表.nc  (擁有獨有目錄名稱的清單) ,
文件 表.nc  (以每個合法檔案的資訊持有表格) ,
壞檔案.nc  (以每個不良檔案的資訊儲存表格) .
    * 加速存取 EDD Table fromFiles 資料集 (但卻不惜用更多的記憶力) 您可以使用
[&lt;檔案目錄表 &gt; true&lt;/fileTable InMemory &gt;] ( 檔案目錄) (# 檔案集成器)   
要告訴ERDDAP™以保留檔案資訊表的副本。
    * 磁碟上的檔案資訊表格副本也有用, 當ERDDAP™已關閉並重新啟動: 它儲存 EDD Table 從 Files 從需要重新讀取所有的資料檔 。
    * 重新載入數據集時,ERDDAP™只需要讀取已變更的新檔案中的資料 。
    * 如果檔案的結構與其它檔案不同 (例如,其中一個變數的數據型態不同,或者對這個變數的數值不同。[單位](#units)" 屬性) ,ERDDAP將檔案加入「 壞」 檔案清單 。 關於檔案問題的資訊會寫入至 *大家长會* /logs/log.txt檔案.
    * 你不需要刪除這些文件 也不需要處理這些文件 一個例外是: 如果您仍在修改數據集datasets.xml設定, 您可能要刪除這些檔案以強迫ERDDAP™重新讀取所有檔案, 因為檔案會被不同的讀取/ 解讀 。 如果您真的需要刪除這些檔案, 您可以在ERDDAP™正在執行中。 (然后設置[旗號](/docs/server-admin/additional-information#set-dataset-flag)以立即重新載入數據集。) 然而,ERDDAP™通常注意:datasets.xml資訊與檔案不符 表格信息和自動刪除檔案表格 。
    * 如果你想鼓勵ERDDAP™更新已儲存的數據集資訊 (例如,如果你只是新增、移除或更改了數據集資料目錄的一些檔案) 使用[旗子系統](/docs/server-admin/additional-information#flag)強制ERDDAP™以更新已儲存的檔案資訊 。
         
##### 處理要求{#handling-requests-1} 
*   ERDDAP™表格資料要求可以限制任何變數。
    * 當處理客戶端的資料要求時, EDDTable FromFiles 可以快速在表格中尋找有效的檔案資訊來查看哪些檔案可能有相關資料 。 例如, 如果每個來源檔案都有一個固定位置浮標的資料, EDDTable FromFiles 可以非常高效地決定哪些檔案可能有特定經度範圍和經度範圍內的資料 。
    * 因為有效的檔案資訊表包含了每個有效的檔案的每个變數的最小值和最大值, EDDTable FromFiles 常常可以非常高效地處理其他查詢. 例如,如果有些浮標沒有氣壓感應器,而且有客戶要求提供氣壓資料&#33;=NAN,EDDTable FromFiles可以高效地确定哪些浮標有氣壓資料.
         
##### 更新已{#updating-the-cached-file-information-1} 
當重新載入數據集時, 已儲存的檔案資訊會更新 。
    
* 數據集定期重新載入,由&lt;在數據集的資訊中重新載入EveryNiminutes &gt;datasets.xml.
* 數據集隨時會重新載入ERDDAP™探測到您新增,移除,[触摸'd](https://en.wikipedia.org/wiki/Touch_(Unix)) (更改檔案中最後的 修改時間) ,或更改了資料檔。
* 若您使用此資料, 數據集會尽快重新載入 。[旗子系統](/docs/server-admin/additional-information#flag).

重新載入數據集時,ERDDAP™將目前可用的檔案與缓存的檔案資訊表比較 。 已讀取新檔案, 并新增到有效的檔案表格 。 已不存在的檔案從有效的檔案表格中移除 。 已讀取檔案時間戳已變更的檔案并更新其信息 。 新表格取代了舊表格的內存和磁碟。
     
##### 壞文件{#bad-files-1} 
錯誤檔案的表和錯誤的原因 (已損壞的檔案、 缺少的變數、 錯誤的轴值等 。) 已發送至郵件 一切 到電子郵件地址 (可能是你) 每次重新載入數據集時 。 您應該盡快取代或修復這些檔案 。
     
##### 缺少變數{#missing-variables-1} 
如果一些檔案沒有一些dataVariables 在數據集中定義datasets.xml大塊,沒關係。 當 EDDTable FromFiles 讀取其中一個檔案時, 它會像檔案有變數, 但會有所有缺失的數值 。
     
##### 接近实时資料{#near-real-time-data} 
* EDD Table FromFiles 將對最近資料的要求視為特例 。 問題是: 如果构成數據集的檔案被频繁更新, 很可能在檔案變更時不會更新數據集 。 因此, Files 的 EDD Table 不會知道已變更的檔案 。 (你可以用[旗子系統](/docs/server-admin/additional-information#flag)但這可能導致ERDDAP™正在重新載入數據集 。 所以在大多數情況下 我們不建議) 以下系統處理: 什麼時候ERDDAP™在過去20小時內得到數據要求 (比如8小時前到現在) ,ERDDAP™將搜尋過去20小時內所有有資料的檔案 。 因此,ERDDAP™不需要有所有檔案的最新資料才能找到最新資料。 您仍應設定&lt;重新載入 每一個NMinutes &gt;] (每分鐘重載) 价值合理小 (例如,60) 但是它不一定很小 (例如,3) .
     
    *    **未推荐** 檔案中近時數據的排列 : 例如,如果您有數據集, 可以儲存多個站點的資料 (或者浮標,或者航道,...) 多數年來,你可以安排檔案 例如,每站一個檔案。 但每當一站的新數據到來 你必須讀取一個大舊檔案 寫一個大新檔案 當ERDDAP™重新載入數據集, 它注意到一些檔案已被修改, 所以它會完全讀取這些檔案 。 這沒效率
         
    *    **推荐** 檔案中近時數據的排列 : 例如, 一個站台/ buoy/ 傳射器的所有資料都以區塊形式儲存一年 。 (或一個月) . 那么,當新的基准到來時,只有今年的檔案 (月) 數據受到影響。
        
        * 最佳 : 使用NetCDFv3.nc無限制尺寸的檔案 (時間) . 然後, 要新增資料, 您可以不讀取並重寫整個檔案, 只需附加新的資料 。 這項變更非常高效, 基本上在解剖學上, 所以檔案從來就沒有過不一致的狀態。
        * 不然:如果你不能/不能使用.nc無限制尺寸的檔案 (時間) ,那么,當您需要新增資料時,您必須讀取並重寫整個受影响的檔案 (希望小,因為它只有一年 (月) 數值) . 幸好往年的所有檔案 (月) 車站沒有變化
        
在兩種情况下,ERDDAP™重新載入數據集, 大多数檔案沒有變更; 只有少數, 小檔案已變更, 需要讀取 。
         
##### 目錄{#directories-1} 
檔案可以在一個目錄中, 也可以在目錄及其子目錄中 (遞迴) . 如果檔案很多 (例如, &gt; 1 000) 操作系統 (因此從檔案中的 EDD表) 如果您將檔案儲存在一系列子目錄中, 操作效率會高得多 (每年一次, 或每月一次 。) ,所以在指定的目錄中永遠不會有大量的檔案。
     
##### 遠端目錄和 HTTP 範圍要求{#remote-directories-and-http-range-requests-1} 
*    **遠端目錄和 HTTP 範圍要求**   (AKA 位元伺服器, 位元範圍要求) --
    EDDGrid從 NcFiles 、 多數分數 NcFiles 的 EDD Table 、 從 NcFiles 的 EDD Table 、 從 NcFiles 的 EDD Table 、 以及 從 NcCFFiles 的 EDD Table , 有時可以服務來自.nc遠端伺服器上的檔案, 如果伺服器支持, 可通过 HTTP 存取[字元伺服](https://en.wikipedia.org/wiki/Byte_serving)通过 HTTP 範圍要求 (位元組服務的 HTTP 機制) . 這有可能 因為Netcdf -java (其中ERDDAP™用于讀取.nc文件) 支援從遠端讀取資料.nc檔案通過 HTTP 範圍要求 。
    
     **別這樣&#33;**   
相反,使用[&lt;快取自Url&gt;系統] (牧羊人) .
    
##### 從Url 取出缓存{#cachefromurl} 
* [ ** &lt;從Url快取@ info ** [ [ ] ] (牧羊人) - –
全部EDDGrid從 File 和 所有 EDD Table From Files 資料集中支持一套顯示的標籤ERDDAP™以下載並維持遠端數據集所有檔案的複本, 或是一些檔案的缓存 (按需要下載) . **這是非常有用的功能。** 
    * 其&lt;快取 FromUrl &gt; 標籤讓您指定一個網址, 上面有遠端檔案清單中的遠端資料集檔案 。
        
        * THREDDS中未分類的數據集,例如,
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 此伺服器已不可靠 。\\]
        * 未分解的数据集Hyrax例如,
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * 大部分类似 Apache 的目錄清單, 例如 ,
            [ https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/ ](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/)
        * S3桶,例如,
            [ https://noaa-goes17.s3.us-east-1.amazonaws.com/ ](https://noaa-goes17.s3.us-east-1.amazonaws.com/)  
然而,這可能需要一個 AWS 帳戶和更多的設定 。
看[与 S3 Buckets 合作ERDDAP™](#working-with-aws-s3-files).
而且,你通常不需要使用快取 如果檔案是 ASCII 檔案, 則使用 S3 桶中的檔案 From Url (例如.csv) 因為ERDDAP™可以通过流直接讀取桶中的資料。
        
        ERDDAP™會在數據集中複製或缓存這些檔案&lt;fileDir &gt; 目錄。 如果您需要支援其它類型的遠端檔案清單 (例如,FTP) 請發郵件給克里斯 約翰在諾亞戈夫
        
        * 默认值&lt;快取自Url &gt; 標籤是無效的 。 如果你不指定&lt;快取 FromUrl &gt; 標籤, 此資料集不會使用副本/ cache系統 。
        * 如果數據集&lt;檔案Regex &gt; 設定是...ERDDAP™只下載符合檔案Regex的檔案。
        * 如果數據集&lt;遞迴&gt; 設定是真實的, 遠端檔案在子目錄中 ,ERDDAP™會在與數據集相匹配的遠端子目錄中尋找 [&lt;路徑Regex &gt;] (#病原体) ,在本地建立相同的目錄結構,並將本地檔案放在相同的子目錄中。
        * 在生成達塔斯 Xml, 如果您指定了&lt;從Url &gt; 值快取, 產生 數據集 Xml 會建立本地端&lt;fileDir &gt; 目錄和複製 1 遠端檔案。 產生達塔斯 Xml 然后產生datasets.xml基于樣本檔案的區塊 (指定樣本 檔案=無) .
        * 如果資料來源是遙控器ERDDAP™使用[EDDGrid來自 Erddap](#eddfromerddap)或[EDD 表格來自 Erddap](#eddfromerddap)代替&lt;快取自Url&gt; 。 那邊,你的本地人ERDDAP™似乎有數據集 但不需要在本地儲存任何數據 唯一使用的理由&lt;要從遠端取得資料ERDDAP™當您有其他原因時, 您需要本地的資料檔副本 。 在这种情况下:
            * 此數據集會試圖訂閱遠端的數據集ERDDAP讓此數據集的變更稱為此數據集的旗號 Url , 讓此本地端的數據集重新載入並下載已變更的遠端檔案 。 因此, 本地端的數據集會在遠端數據集變更後很快更新 。
            * 您應該發送遠端管理員ERDDAP™要求datasets.xml遠端數據集,以便您在本地端製作數據集ERDDAP™看起來像遠端的數據集ERDDAP.
        * 如果資料來源是遙控器ERDDAP™, 本地端數據集會試著訂閱遠端數據集 。
            * 如果訂閱成功, 只要遠端ERDDAP重新載入並有新的資料, 它會為此數據集聯絡到 flagURL, 讓它重新載入並下載新的和/或變更的資料檔 。
            * 如果訂閱失敗 (不管原因如何) 或者如果你只是想要確保本地端的數據集是最新的,你可以設定[旗號](/docs/server-admin/additional-information#flag)用于本地端的數據集, 所以它會重新載入, 所以它會檢查新的和/或變更的遠端資料檔 。
        * 如果資料來源不是遙控器ERDDAP: 數據集在重新載入時會檢查新的和/或變更的遠端檔案 。 通常,它由[&lt;重新載入 每一個NMinutes &gt;] (每分鐘重載) . 但如果你知道有新的遠端檔案 你可以設置[旗號](/docs/server-admin/additional-information#flag)用于本地端數據集, 因此它會重新載入並檢查新的和/或變更的遠端數據檔 。 如果在一天的某一天 例行公事 (例如,上午7點) ,你可以做工作來使用curl聯絡旗子 此數據集的網址, 它會重新載入並檢查新的和/ 或已變更的遠端資料檔 。
    * 其&lt;缓存SizeGB &gt; 標籤指定本地快取的大小 。 你可能只需要在使用云存储系統時使用它[亞馬遜 S3](https://aws.amazon.com/s3/)是常用的儲存系統的一部分[亞馬遜網路服務 (阿WS) ](https://aws.amazon.com/). 預設值是 - 1 。
        * 如果值是&lt;=0 (例如, -1 的預設值) ,
            ERDDAP™下載並維持 **完整副本** 在數據集中所有的遠端數據集的檔案中&lt;fileDir &gt;.
            * 這是在可能時建議的設定 。
            * 每次重新載入數據集, 它會比對遠端檔案和本地檔案的名字、大小及最後的變更時間, 並下載任何新的或已變更的遠端檔案 。
            * 如果遠端伺服器上的檔案消失了ERDDAP™不會刪除相应的本地檔案 (不然的話 如果遠端伺服器出了點問題ERDDAP™可能刪除部分或所有本地檔案 &#33;) .
            * 在此設定下, 一般您會設定&lt;將 EveryNimillis &gt; 更新到 - 1, 因為數據集已知道新資料檔案已复制到何處 。
        * 如果值大于0,
            ERDDAP™將按需要從遠端數據集下載檔案到本地端 **快取** (在数据集中)&lt;fileDir &gt;)的阈值大小為指定的 GB。
            * 缓存必須大到至少持有數個資料檔 。
            * 一般来说, 缓存越大, 越好, 因為下一個要求的資料檔就更可能已經在缓存中 。
            * ERDDAP™正在云计算伺服器中執行 (例如, AWS 计算實體) 和云存储系統中的遠端檔案 (例如,AWS S3) .
            * 當本地檔案使用的磁碟空間超過快取時 大小GB,ERDDAP™很快 (也許不是立即) 刪除一些快取的檔案 (目前,基于最近使用最少的 (路 路) 算法) 直到本地檔案使用的磁碟空間&lt;0.75 QQ 缓存SizeGB ("目標") . 有的LRU的表現非常糟糕,
            *   ERDDAP™永遠不會試著刪除快取的檔案ERDDAP™最近十秒開始使用 這是一個不完善的系統來處理缓存系統, 而數據檔案讀取器系統只被松散整合 。 因為這規矩ERDDAP™可能無法刪除足夠的檔案以達到目的, 如果它會將一個 Warning 列印到log. txt 檔案中, 系統會浪費很多時間試圖將缓存排出, 而缓存中檔案的大小可能大大超过缓存SizeGB 。 如果發生此事件, 請使用更大的快取SizeGB設定值來對付此數據集 。
            * 目前,ERDDAP™從不檢查遠端伺服器是否有更新版本的檔案在本地快取中 。 如果您需要此功能, 請發郵件給 Chris 。 約翰在諾亞戈夫
        * 雖然使用同樣的標籤名稱可能意味著复制系統和缓存系統使用相同的基礎系統,但這是不正確的.
            * 复制系統在每次重新載入數據集時主动開始工作Thread以下載新的和變更的檔案 。 只有真正被複製到本地目錄的檔案才能通過ERDDAP™數據集。
            * 缓存系統每次重新載入數據集時都會得到遠端檔案清單,並假裝這些檔案都可通过ERDDAP™數據集。 有趣的是,所有遠端檔案甚至都出現在數據集的 / files/ web頁面上, 可以下載 (在檔案從遠端伺服器首次下載到本地快取時, 可能會延遲 。) 
        * 使用快取的數據集SizeGB[n 串](#nthreads)設定大于 1, 因為這會讓數據集一次下載超过 1 個遠端檔案 。
    * 其&lt;缓存PartialPathRegex &gt; 標籤是很少使用的標籤,可以指定數據集的替代品[。]&lt;路徑Regex &gt;] (#病原体) . 假設是無效的 。
        * 只有在您正在透過預設複製整個數據集時才使用此功能&lt;缓存SizeGB &gt; 值 - 1 。&lt;缓存SizeGB &gt; 數值 &gt; 1, 這將被忽略, 因為它不敏感 。
        * 查看[文件&lt;路徑Regex &gt;] (#病原体) 指導如何建構雷格克斯
        * 如果指定此項, 每次重新載入數據集會使用它, 除非數據集第一次在一個月初重新載入 。
        * 當遠端數據集被儲存在一個子目錄的迷宮中, 以及那些檔案的绝大多数很少變更(如果有的話)時, 這就很有用 。 (&lt;咳嗽 &gt; NASA&lt;(咳嗽) 例如,你可以指定&lt;缓存PartialPathRegex &gt; , 它只符合當年或當月 。 這些 regex 很難指定, 因為所有部分和完整的路徑名稱必須符合&lt;缓存PartialPathRegex &gt; 因為&lt;缓存PartialPathRegex&gt;必須與遠端網址和本地目錄合作 。 實際上的例子是:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
上面的樣本網址有基于年份的子目錄檔案 (例如,2018年) 年 日 (例如,001、002、.365或366) .
注&lt;快取PartialPathRegex &gt; 從...
後來有一個特定的子目錄, 和遠端網址和本地目錄通用, 例如 /v4\\ 1
然后有一系列嵌入式抓取群組,其中第一個選項一無所有
第二個選項是特定的數值。
            
以上示例只匹配2018年的後十天目錄,例如,
             https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[2020-10-21 此伺服器已不可靠 。\\]  
011,012,019
             (看這個[regex 文件](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)和[regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
如果您需要幫助建立&lt;缓存PartialPathRegex &gt;, 請發送此郵件&lt;從 Url &gt; 到 Chris 的快取 。 約翰在諾亞戈夫
            
        * 共同方法: 如果你想使用&lt;缓存PartialPathRegex &gt;, 初期不要使用, 因為您想要ERDDAP™要先下載所有檔案。 之后ERDDAP™已下載所有的檔案, 將它加入數據集的區塊datasets.xml.
             
##### 千份檔案{#thousands-of-files} 
如果你的數據集有數以千計的檔案ERDDAP™可能對此數據集的數據要求反應很慢 。 這裡有兩個問題:
 

1. 每個目錄的檔案數量 。
在內部,ERDDAP™不管 n 檔案是放在一個目錄裡, 還是分散在數個目錄裡, 操作速度都一樣 。
     
但有個問題: 指定目錄中的檔案越多, 操作系統返回目錄中的檔案清單的速度就越慢 (每份文件) 至ERDDAP. 答复時間可能是O (n 对數 n) . 一個目錄裡有多少檔案是太多, 因此, 如果您的設定產生了許多檔案, 建議如下: 將檔案放入按邏輯排列的子目錄 (例如,站或站/年) .
    
使用子目錄的另一個理由: 如果使用者想要使用ERDDAP是"files"如果檔案在站/年子目錄中, 找到X站最古老檔案的名稱會更快、更有效率, 因為需要轉移的信息要少得多。
    
2. 文件的總數 。
表格数据集ERDDAP™追蹤每個檔案中每個變數的數值範圍 。 當一個使用者要求,ERDDAP™必須讀取所有檔案中可能符合使用者要求的所有資料 。 如果使用者從有限的時間索取資料 (例如,一天或一月) 那么ERDDAP™在您的數據集中不需要開啟太多的檔案 。 但有些極端的案例 幾乎每個檔案都有匹配的資料 (例如,当水温度=13.2C时) . 既然如此ERDDAP™有一點時間 (部分是 HDD 上的尋找時間, 部分是讀取檔案信頭的時間) 只為開啟指定的檔案 (如果目錄中有許多檔案, 更多) 如果檔案的總數ERDDAP™一定要大開門 即使開啟1000個檔案也需要很多時間 因此,定期將每天的檔案整合成更大的區塊有好處 (例如,1站1年) . 我理解你可能出于各种原因不想這樣做,但這確實會使回應更快。 在极端情况下 (例如, 我處理 GTSPP 數據集, 它有 ~ 3500 萬個來源檔案 。) ,提供大量來源檔案的資料是不切实际的,因為ERDDAP回答簡單的詢問需要數小時, 將來源檔案整合成小數目 (GTSPP,我現在有720,每月2個) ,ERDDAP™可以快速回應 看[數百萬檔案](#millions-of-files)  
     

N. B. 最快,最簡單,最便宜的幫助方式ERDDAP™處理大量 (小) 檔案要使用固體狀態驱动器 。 看[堅固的州道很棒&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
##### 數百萬檔案{#millions-of-files} 
* 有些數據集有數百萬的來源檔案.ERDDAP™但結果不一
    
    * 要求只涉及[&lt;subsetVariables&gt;] (# 可變性) ,ERDDAP™已從資料檔中提取出所有需要的資訊並儲存在一個檔案中, 所以它可以非常非常非常迅速地回應。
    * 其他要求ERDDAP™可以掃瞄數據集[已儲存的檔案資訊](#cached-file-information)找出只有少數檔案有與要求相關的資料,
    * 但是其他要求 (例如,水位=18°C) 任何檔案都有相關資料ERDDAP™必須開啟大量檔案來查看每個檔案是否有與要求相關的資料 。 檔案依次開啟 。 在任何操作系統和任何檔案系統上 (除了固态驱动器) 這需要很久 (所以ERDDAP™慢慢回應) 并真正連結到檔案系統 (所以ERDDAP™慢慢回應其他要求) .
    
幸好有辦法
    
    1. 建立非公開的數據集ERDDAP™  (你的私人電腦?) .
    2. 建立並執行一個要求一系列文稿.ncCF 檔案, 每個檔案都有一大塊數據集, 通常都是一個時間段 (例如,特定月份的所有資料) . 選擇時期, 所有產生的檔案都小于 2GB (但希望大于1GB) . 如果數據集有近实时的資料, 請執行文稿以重生目前時期的檔案 (例如,本月) 常數 (每10分鐘? 每小時?) . 要求ERDDAP™用于.ncCF 文件建立NetCDFv3.nc使用此檔案[CF 分解采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)相關的 Rgged 數據結構 。
    3. 建立[来自 NcCFF 的 EDD 表格](#eddtablefromnccffiles)您公開的數據集ERDDAP™得到數據.nc (CF) 文件。ERDDAP™可以很快從這些檔案中提取資料 。 現在有好幾百個 (而不是百万) 檔案,即使ERDDAP™必須開啟所有的檔案,它能很快做到。
    
是的,這個系統需要一些時間和努力建立, 但它非常,非常好。 數據要求的處理速度比以前快100倍。
    \\[Bob知道這有可能 但這是Kevin O'Brien先做的 證明它很有效 現在 Bob 使用此來建立 GTSPP 資料集, 它有 約 1 800 萬 個來源檔案, 而且ERDDAP™現在通过五百個.nc (CF) 文件。\\]
    
N. B. 最快,最簡單,最便宜的幫助方式ERDDAP™處理大量 (小) 檔案要使用固體狀態驱动器 。 看[堅固的州道很棒&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
    
##### 大檔案{#huge-files} 
* 一個巨大的數據檔 (尤其是巨大的 ASCII 資料檔) 可能會造成記憶錯誤 如果這是問題所在 那應該是明顯的 因為ERDDAP™無法載入數據集。 如果可行, 解決方案是將檔案分割成多個檔案 。 理想的是, 您可以將檔案分割成邏輯區塊 。 例如, 如果檔案有 20 個月 的 數據, 將它分成 20 個檔案, 每一個檔案都有 1 個月 的數據 。 但即使主檔案被任意分拆,也有其优点. (a) 這會把讀取資料檔所需的記憶體減少到1/20th, 因為每次只讀到一個檔案 。 (b) 常常ERDDAP™可以更快地處理要求, 因為它只需要查看一個或幾個檔案就可以找到給定要求的資料 。 c) 如果正在收集資料, 那麼现有的20個檔案可以保持原狀, 您只需要修改一個小的, 新檔案就可以將下一個月的資料值加入資料集 。
     
##### FTP 麻煩/助理{#ftp-troubleadvice-1} 
* 如果您是 FTP 的新資料檔到ERDDAP™伺服器時ERDDAP™在跑,有機會ERDDAP™將會在 FTP 行程中重新載入數據集 。 它發生得比你想像的多&#33; 如果發生了, 檔案似乎合法 (它有有效的名稱) , 但檔案不合法 。 如果ERDDAP™試著從不合法的檔案讀取資料, 結果的錯誤會使檔案新增到不合法的檔案表格中 。 不妙 避免此問題, 在 FTP 中使用一個临时檔名, 例如 ABC2005.ncXQEMP 。 然后, 檔案Name Regex 測試 (见下文) 將顯示此檔案不相關 。 FTP 行程完成後, 將檔案重新命名為正確的名稱 。 重新命名的行程會讓檔案在一瞬間變得相关 。
    
##### 文件名提取{#file-name-extracts} 
\\[此功能已刪除 。 請使用[\\*\\*%% file 假名NamesourceName](#filename-sourcenames)相反。\\]  
EDDTable FromFiles 有一個從每個文件名中提取字符串的系統, 並且用它來製造假數據變數 。 目前, 沒有系統將這些字串理解為日期/ 時間 。 要建立此系統, 有數個 XML 標籤 。 如果您不需要此系統的部分或全部, 請不要指定這些標籤或使用「 」 值 。

* extractRegex 是[正则表示式](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) 用于辨識要從檔名開始移除的文字。 只有雷格克斯匹配,才能移除。 這通常以「 ^ 」 開始, 以符合檔名的起始 。
* 帖 extractRegex 是一個正規的表示式, 用以表示要從檔案檔尾移除的文字 。 只有雷格克斯匹配,才能移除。 這通常以「 $ 」 結束, 以匹配檔名的尾端 。
* 提取Regex 如果存在, 此正規表示式在 ExtractRegex 和 ExtractRegex 之前使用, 以表示要從檔名中提取的字串 (例如,stationID) . 如果 regex 不匹配, 則使用整個檔名 (减去前列和文章 提取) . 使用 ".%%%%%%%%%%%%%%%%%%
* 列 NameFortract 是提取的字串的資料列來源名稱 。 AdataVariable用這個[sourceName](#sourcename)一定是在dataVariables 列表 (包含任何數據類型, 但通常為字符串) .

例如, 如果數據集有像 XYZABL 的檔案.nc, XYZ拜克.nc,XYZCharlie.nc,您要建立新的變數 (stationID) 當讀取每個有站位ID值的檔案時 (艾波,貝克,查理, ...) 從檔名中提取, 您可以使用這些標籤 :

*   &lt;前排出Regex_YZ&lt;/ extractRegex &gt;
初始 ^ 是強制的正規表示式特殊性ERDDAP™以尋找文件名开头的 XYZ 。 這讓 XYZ 在檔名開始時找到的話被移除 (例如,文件名 XYZAble.nc變成空格.nc) .
*   &lt;后退出Regex &#123;&#125;.nc$&lt;/后排出列克塞斯 &gt;
末端的 $ 是正規的表达式 。ERDDAP™要尋找.nc。 因為... 是正常的表示式特殊性 (匹配任意字符) ,其編碼為\\ 。 這裡 (因為 2E 是一段時間的十六進制字元數字) . 原因.nc,如果在文件名的末尾找到,要移除 (例如,部分文件名 大小.nc變成空格) .
*   &lt;提取Regex &gt;.\\*&lt;/ 摘录Regex &gt;
. QQ 正規表示式符合所有剩余字符 (例如,部分文件名 Able 成為第一個檔案的摘要) .
*   &lt;欄位Name 格式 &gt;stationID&lt;列名( Fextract)
這說明ERDDAP™以建立新的來源欄位stationID當讀取每個檔案時。 指定檔案的每一行資料都會從檔名中提取文字 (例如, 大小) 作为值stationID列

在大多數情況下, 這些抽取標籤會產生相同結果的數值很多, 但有幾件事情只有一種方法能達到期望的效果。
     
##### 修道士sourceNames{#pseudo-sourcenames} 
每個數據庫中的每個變數ERDDAP™有[&lt;sourceName&gt;] (# 源碼名稱) 指定變數的來源名稱。 EDD Table From Files 支援一些偽sourceName從其他地方提取值的 s (例如, 檔案名稱或全局屬性值) 並宣傳此值, 成為數據的常數列 (例如, 檔案的資料表) . 對這些變數, 您必須透過 [&lt;資料Type &gt; (# 資料類型) 标记。 如果提取的信息是日期時字串, 您可以指定日期時字串的格式[單位屬性](#string-time-units). 假的sourceName选项是:
 
###### 全局 :sourceNames{#global-sourcenames} 
每個來源資料檔中的全局元数据屬性可以被推廣為資料的列 。 如果變數&lt;sourceName&gt; 有格式
```
        <sourceName>global:*attributeName*</sourceName>
```
然后,當ERDDAP™正在讀取檔案中的資料,ERDDAP™將尋找此名稱的全局屬性 (例如,PI) 并建立一欄,填充屬性值。 當屬性在不同的來源檔案中有不同的值時, 這很有用, 因為要不然, 使用者會只看到整個資料集的其中一個值 。 例如,
```
        <sourceName>global:PI</sourceName>
```
當你推廣一個屬性成為數據時ERDDAP™移除相应的屬性。 這很適合, 因為每個檔案的數值都不同; 而總和數據集中的數值ERDDAP™它只有一個價值 如果您想要, 您可以新增整個數據集的屬性值 。&lt;姓名=" *屬性 姓名* " &gt; *新 值* &lt;/att &gt; 到數據集的全球 [&lt;addAttributes&gt;] (# 附加) . 關於全球屬性ERDDAP™例如,您需要機構, 您必須新增屬性值 。
     
###### 變數 :sourceNames{#variable-sourcenames} 
每個檔案中的變數的元数据屬性可以被推廣為資料的列 。 如果變數&lt;[sourceName](#sourcename)QQ 有格式
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
然后,當ERDDAP™正在讀取檔案中的資料,ERDDAP™將尋找指定的屬性 (例如,ID) 指定變數 (例如,樂器) 并建立一欄,填充屬性值。 父變數 (例如,樂器) 不必是其中之一dataVariables 包含在數據集的定義中ERDDAP. 例如,
```
        <sourceName>variable:instrument:ID</sourceName>
```
當屬性在不同的來源檔案中有不同的值時, 這很有用, 因為要不然, 使用者會只看到整個資料集的其中一個值 。

當你推廣一個屬性成為數據時ERDDAP™移除相应的屬性。 這很適合, 因為每個檔案的數值都不同; 而總和數據集中的數值ERDDAP™它只有一個價值 如果您想要, 您可以新增整個數據集的屬性值 。&lt;姓名=" *屬性 姓名* " &gt; *新 值* &lt;/att &gt; 到變數的 [&lt;addAttributes&gt;] (# 附加) . 關於屬性ERDDAP™例如,要求ioos\\_category  (看你的設定) ,您必須新增屬性值。
        
###### 文件NamesourceNames{#filename-sourcenames} 
您可以提取檔案中的一部分Name , 並將它推廣為一欄數據 。 此假冒的格式 [S]&lt;sourceName&gt;] (# 源碼名稱) 是
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
例如,
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
當 EDDTable FromFiles 從檔案讀取資料時, 它會確定檔案Name (例如,A201807041442.slcpV1。.nc) 符合指定的正規表示式 ("雷格克斯") 提取指定的 (第一次) 抓取群組 (由括弧包圍的部分) 例如"2018041442" (看這個[regex 文件](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)和[regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) rogex 可能指定為串列, 或沒有周圍引數 。 如果 regex 被指定為帶周围引數的字串, 字串必須是[JSON 樣式字串](https://www.json.org/json-en.html)  (用\\ 字符逃出的特殊字符) . 抓取群組數字通常為 1 (第一個抓取群組) 但可能是任何數字
     
###### 路徑NamesourceNames{#pathname-sourcenames} 
您可以提取檔案完整路徑的一部分 姓名 (/ 目錄/文件Name.ext) 推廣它成為數據專欄 此假冒的格式 [S]&lt;sourceName&gt;] (# 源碼名稱) 是
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
例如,
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
當 EDDTable FromFiles 從檔案讀取資料時, 它會確保完整路徑Name (例如,/data/myDatasetID/BAY17/B201807041442.nc. 對此考驗,目錄分隔器將永遠是'/',永遠不要 ' ') 符合指定的正規表示式 ("雷格克斯") 提取指定的 (第一次) 抓取群組 (由括弧包圍的部分) 例如"BAY17" (看這個[regex 文件](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)和[regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) rogex 可能指定為串列, 或沒有周圍引數 。 如果 regex 被指定為帶周围引數的字串, 字串必須是[JSON 樣式字串](https://www.json.org/json-en.html)  (用\\ 字符逃出的特殊字符) . 抓取群組數字通常為 1 (第一個抓取群組) 但可能是任何數字
         
##### "0文件" 錯誤訊息{#0-files-error-message-2} 
* 如果你跑[產生 DatasetsXml](#generatedatasetsxml)或[達斯Dds](#dasdds),或者如果你試著加載 EDD Table from... 檔案資料集ERDDAP™,您會收到"0檔案"的錯誤訊息,表示ERDDAP™在目錄中找到 0 匹配的檔案 (當你認為目錄中有匹配的檔案時) :
    * 請檢查檔案是否真的在目錄中 。
    * 請檢查目錄名稱的拼寫 。
    * 檢查檔案Name Regex 。 真的,真的很容易犯錯 為了試驗目的, 試試所有檔案的 regex 。 (看這個[regex 文件](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)和[regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * 檢查執行程式的使用者 (例如,使用者=Tomcat (?) 托姆卡特/ERDDAP) 已讀取檔案的權限 。
    * 在一些操作系統中 (例如, SELinux) 依據系統設定, 執行此程式的使用者必須有「 讀取」 的權限, 才能將目錄連結到有檔案的目錄 。
         
##### 标准化 什么{#standardizewhat} 
* 當 EDDTable FromFiles 的任何子類群集一系列來源檔案時, 对于指定的變數, 所有來源檔案 MUST 都對數個屬性有相同的屬性值 :scale\\_factor,add\\_offset未簽署missing\\_value和單位). 考慮一下: 如果一個檔案有 windSpeed units=knots 而另一個檔案有 windSpeed units=m/s, 那麼兩個檔案的數值就不該包含在相同的集合數據集中 。 因此,當 EDDTable FromFiles 首次建立數據集時, 它會從一個檔案讀取屬性值, 然后拒絕所有對這些重要屬性有不同值的檔案 。 對於大部分的檔案收藏, 這並不是問題, 因為所有變數的屬性是相容的 。 然而,對其他的檔案集而言,這可以导致1%,10%,50%,90%,甚至99%的檔案被拒絕為"壞"檔案. 那才是麻煩
    
EDDTable From 檔案有處理此問題的系統: 标准化 什么? 标准化 設定讓 EDD Table From Files 在讀取檔案後立即將檔案标准化, 在 EDD Table From Files 檢視屬性以查看其是否一致之前 。
    
反面是: 如果數據集沒有這個問題, 不要使用标准化 什么? 标准化 有潛在的風險 (以下讨论) 和低效。 所以如果你真的不需要标准化的功能 不需要面對潜在的風險和低效。 最大的效率是: 數據集使用的選項, 它意味著來源檔案以显著不同的方式儲存數據 (例如,不同scale\\_factor和add\\_offset,或使用不同格式的時間串) . 因此,在使用者的要求中,沒有辦法ERDDAP™以做出一個單一的來源關卡,可以套用到所有來源檔案。 所以ERDDAP™受此影響的制约, 所以ERDDAP™必須先從更多檔案讀取資料, 然后再使用更高的目的層次限制 。 所以要求使用标准化的數據集 需要更久的處理
    
要使用此系統, 您需要指定
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
在[datasets.xml用于 EDD Table 從... 文件数据集](#eddtablefromfiles-skeleton-xml)(在&lt;數據集 &gt; 標籤).
    
其 *标准化 什么* 數值指定要試用哪些變更 EDDTable fromFiles 。 修改是:
    
1. 解包
這會做很多常见的安全操作, 使檔案中的數列标准化 :
    * 如果scale\\_factor和/或add\\_offset屬性存在, 移除並用於解開資料值。
    * 解包的屬性 (例如,實際上的...actual\\_range,data\\_min,data\\_max數據距離valid\\_min,valid\\_max,valid\\_range) ,如果存在,如果變數被打包,如果屬性值被打包 (這很棘手,但很可靠) .
    * 如果 QQ 檔案和/或missing\\_value中,將這些數值轉換為ERDDAP缺少的「 標準 」 值: 整數類型的 MAQVALUE (例如,127個字節,32,767個字節,2,147,483,647個字節,9223372036854775807 長) 和雙胞胎和浮起的納恩。
    * 拿掉舊的 QQ 檔案和/ 或missing\\_value屬性 (如果有) ,並用 QQFillValue 取代\\[该ERDDAP™標準缺失值\\].
         
2. 數量标准化
如果數字列有 CF 樣式的數字時數單位 (" *單位* 自 *基底時間* 例如,"1900-01-01起") ,此轉換日期 時間值"seconds since 1970-01-01T00:00:00Z"值和更改單位屬性以表示此值。
如果選取了這個變數, 有可能scale\\_factor或add\\_offset, 1 也必須選擇。
     
3. 套用字串missing\\_value  
如果字串列有 QQFillValue 和/或missing\\_value屬性,它會把這些值轉換成"",並移除屬性。
     
4. 尋找數字missing\\_value  
如果數字欄沒有QQFillValue 或missing\\_value屬性,此試圖辨識未定義的數字missing\\_value  (例如,-999、9999、1e37f) 轉換成「 標準值 」 (MAQVALUE 表示整數型態, NAN 表示雙倍和浮點) .
     **此選項有風險 :** 如果最大或最小的合法數值看起來是缺失的數值 (例如,999年) ,那么這些有效的數值會轉換成缺失的數值 (例如,NaN) .
     
5. 變更字串"N/A"為""
每個字串列, 將通常用于表示缺失字串值的數個字串轉換為" 。 目前,這個尋找的是"...","...","...","...","?","N/A","NA","None","不适用","null","未知","不明". 字串搜尋是忽略大小寫的, 在字串修剪後使用 。 "nd"和"other"具体不在名單上.
     **此選項有風險 :** 您認為有效的數值的字符串可能會轉換成" 。
     
6. 标准化到字符串 ISO 8601 日期時間
每一個字串列, 試著轉換不純數字字串日期 Times (例如,"Jan 2, 2018") 至 ISO 8601 字串日期 ("2018-01-02".) .
     **注** 列的所有資料值必須使用相同的格式, 否則此選項不會對指定列做任何變更 。
     **此選項有風險 :** 如果有一列字串值恰好看起來像一個共同的日期 時間格式, 將轉換為 ISO 8601 字串日期 Times 。
     
7. 标准化收縮日期時間到 ISO 8601 日期時間
每一個字串或整數型態列, 試著轉換純數字字串日期 Times (例如,"20180102") 至 ISO 8601 字串日期 ("2018-01-02".) .
     **注** 列的所有資料值必須使用相同的格式, 否則此選項不會對指定列做任何變更 。
     **此選項有風險 :** 如果有一欄數值不是緊凑的日期 時代但看起來像緊凑的日期時代, 將轉換到 ISO 8601 字串日期時代 。
     
8. 單位标准化
此試圖將每個變數的單位字串标准化 。 例如"每秒公尺","公尺/秒"."m.s^-1","m s-1","m.s-1"將全部轉換成"m.s-1". 這無法改變數據值 。 這很有效UDUNITS單位字串,但與無效或複雜字串有問題。 您可以在其中指定特定對對&lt;标准化Udunits &gt;  inERDDAP是
    \\[湯姆卡\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml檔案. 請發郵件給克里斯 John at noaa.gov 這樣它們就可以被并入預設信件.xml.
     **此選項有風險 :** 這可能勾勒一些複雜或無效的單位; 然而, 您可以用上面描述的工作環境來避免問題發生 。
         
    
标准化的預設值 什么是0,它什么也不做。

如果/當您改變了标准化的值 什么,下一次重新載入數據集,ERDDAP™會重新讀取所有數據集的資料檔, 以重建小數據庫, 提供每個檔案的資訊 。 如果數據集有很多檔案, 這需要很長時間 。
    
注:

* 一件棘手的事是...
标准化 來源檔案中所有列都使用什麼設定 。 例如, 使用 # 2048 可能成功地將一列紧凑的字串日期Times 轉換成 ISO 8601 字串日期Times, 但是它也可能錯誤地將一列與字串一起轉換成字串, 而字串恰好看起來像緊凑的日期Times 。
     
*   datasets.xml生成數值 Xml -
把設定值校正到datasets.xml讓你的數據集按你想要的方式運作 最佳方法 (一如既往) 即:
    1. 使用[產生 DatasetsXml](#generatedatasetsxml)指定标准化的值 你想用什么?
    2. 使用[達斯Dds](#dasdds)以確保數據集能正确載入并反映标准化 您指定的設定 。
    3. 在資料中用手測試ERDDAP™以確保受影響的變數能如期運作。
         
* 風險 -
256及以上選項更危險,ERDDAP™會做出不該改變的改變 例如, 選項 # 2048 可能會不小心轉換一個包含站位代碼字串的變數, 這些變數只是碰巧看起來是ISO 8601 "compact" dates (例如,20180102) 輸入 ISO 8601"extended"日期 ("2018-01-02".) .
     
* 改變後慢一點...
由于标准化的价值 如何改變 EDDTable 從檔案中看到每個資料檔的數值, 如果您改變了标准化 什麼設定, EDD Table From Files 會丟棄每個檔案的所有缓存資訊 (它包括每個檔案中每個資料變數的分數和最大值) 並重新讀取每個資料檔。 如果數據集的檔案數量很大, 這可能很耗時, 所以數據集需要很長的時間才能第一次重新載入 。ERDDAP™更改後重新裝入 。
     
* 興奮 -
選項 # 256 及以上使用 heuristics 來做變更 。 如果你遇到強力主義者做出壞決定的情況 請把問題的描述發給克里斯 諾亞的約翰 戈夫 這樣我們才能改善氣壓
     
* 替代品 -- --
如果其中一個標準化[.ncml 文件](#ncml-files)與每個資料檔平行, 并定義檔案中的事物變更, 讓檔案一致 。 那就告訴EDD表... 要聚合的檔案數據集.ncML文件。
    
或者,用[NCO](#netcdf-operators-nco)要實際地修改檔案, 以便檔案一致 。
        
##### 年份、 月份、 日期、 小時、 分鐘、 第二列{#separate-columns-for-year-month-date-hour-minute-second} 
表格數據檔通常會分別列, 之前ERDDAP™v2. 10, 唯一的解決辦法是編輯資料檔, 將這些列合并成一個統一的時間列 。 用ERDDAP™2.10+,你可以使用
[&lt;sourceName&gt;= *表示式* &lt;sourceName&gt;] (# 源碼名稱) 要告訴ERDDAP™如何將來源列組合成一個統一的時間列, 所以您不再需要編輯來源檔案 。
##### &lt;跳過信頭( T){#skipheadertoregex} 
* [&lt;跳過信頭Tregex &gt;] (#斯基菲德托雷格克斯 #) --
假設。 (只能用於 ColumnarAscii 檔案的 EDD Tables 和 EDD Tables 。)   
當 EDDTable FromAsciiFiles 讀取資料檔時, 它會忽略所有行數, 包括符合此正規表示式的行數 。 缺省是「 」 , 它不使用此選項 。 一个例子是:
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
它會忽略所有直線, 並包含從 " 開始的直線\\*\\*"頭部末端"

當你使用此標籤時,&lt;列名Row &gt; 和&lt;firstDataRow" 在讀取檔案前, 似乎信頭已被移除 。 例如, 如果列名位於列頭之后, 您會使用列名Row=0 。

如果你想使用產生 數據集 Xml 有需要此標籤的數據集 :

1. 复制已存在的檔案並移除信頭, 以此來制作新的、 暫時的、 樣本檔案 。
2. 執行產生 數據集 Xml 指定樣本檔 。
3. 手動新增&lt;跳過信頭( T)datasets.xml很大。
4. 刪除暫時的樣本檔 。
5. 使用數據集ERDDAP.
##### &lt;跳過LinesRegex & gt; 。{#skiplinesregex} 
假設。 (只能用於 ColumnarAscii 檔案的 EDD Tables 和 EDD Tables 。)   
當 EDDTable FromAsciiFiles 讀取資料檔時, 它會忽略所有符合此正規表示式的行 。 缺省是「 」 , 它不使用此選項 。 一个例子是:
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
它會忽略從"#"開始的所有行 。

當你使用此標籤時,&lt;列名Row &gt; 和&lt;firstDataRow&gt; 在讀取檔案前, 好像所有匹配的行都被移除了一樣 。 例如,您會使用欄名Row=0, 即使檔案開始時有數行起始, 例如 "#" 。
    
#### 檔案骨架 XML 的 IDD 表格{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Ascii 服務的 EDD 表格{#eddtablefromasciiservice} 
[ **Ascii 服務的 EDD 表格** ](#eddtablefromasciiservice)基本上就是刮屏幕的 它的用意是處理有簡單的網路服務的資料來源以要求資料 (常常是網頁上的 HTML 窗体) 和可以以一些结构化的 ASCII 格式傳回數據 (例如, 逗號分隔值或列數 ASCII 文字格式, 常與數據之前和/ 或之後的其他資訊) .

EDD Table From Ascii Service 是所有 EDD Table From Ascii Service 的超級課程. 您不能直接使用 EDD Table From AsciiService 。 使用 EDDTable FromAsciiService 的子類, 處理特定類型的服務:

*   [Ascii Servicicenos 的 EDD 表格](#eddtablefromasciiservicenos)從NOAANOS的ASCII服務。

目前, 不支援其他服務類型 。 但若其他服務以相似方式工作, 有要求就聯繫我們

#### 細節{#details} 
以下資訊适用于 EDDTable FromAsciiService 的所有子類。

* 限制因素 -- --ERDDAP™表格資料要求可以限制任何變數。 基本服務可能允许也可能不允许限制所有變數。 例如,很多服務只支持站名、經度、經度和時間的限制。 所以當 EDDTable FromAsciiService 的子類群收到對數據集子集的請求時, 它會傳送尽可能多的限制到來源數據服務, 然后將剩下的限制套用到服務傳回的數據中, 然后再將資料交給使用者 。
* 合法範圍 -- 和其他數據集類型不同, EDDTable FromAsciiService 通常不知道每個變數的數據範圍, 所以它不能快速拒絕在有效範圍外的數據要求 。
* 剖析 ASCII 文本回應 -- 當 EDDTable FromAsciiService 從 ASCII 文字服務得到回應時, 它必須驗證回應有期望的格式與資訊, 然後提取資料 。 您可以使用 XML 區塊中的各种特殊標籤來指定此数据集的格式 :
    *   &lt;在 Data1 &gt; 之前&lt;在 Data10 &gt; 標籤之前 -- 您可以指定一系列文字 (多少就多少,最多10) EDDTable FromAsciiService 必須在服務返回的 ASCII 文字的頭目中尋找&lt;在 Data1 &gt; 之前&lt;在 Data10 之前。 例如, 這對驗證反應是否包含使用期望單位的預期變數很有用 。 您指定的最后一個 Data 標籤, 表示在資料開始前發生的文字 。
    *   &lt;后 Data &gt; -- 這指定了 EDDTable FromAsciiServicice 會在 ASCII 中尋找的文字 。
    *   &lt;無資料 &gt; -- 如果 EDDTable FromAsciiService 在服務傳回的 ASCII 文字中找到此文字, 它會認為沒有符合此要求的資料 。
#### 來自 Ascii 服務骨架 XML 的 EDD Table{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Ascii Servicicenos 的 EDD 表格{#eddtablefromasciiservicenos} 
[ **Ascii Servicicenos 的 EDD 表格** ](#eddtablefromasciiservicenos)從 ASCII 文字資料服務中建立 EDDTable 資料集NOAA是[國家海洋局 (NO) ](https://oceanservice.noaa.gov/). 關於這個班的工作方式和用法的資訊,請看看這個班的超級班級[Ascii 服務的 EDD 表格](#eddtablefromasciiservice). 除了鮑勃·西蒙斯之外 沒有人需要使用這個子課

由于 NOS 服務的回應內的資料使用專欄的 ASCII 文字格式, 因此除經度和纬度外的資料變數必須有特殊的屬性, 指定每個資料行的哪些字元包含變數的資料, 例如 ,
```
<att name="responseSubstring">17, 25</att>  
```
 
### All Datasets 的 EDD 表格{#eddtablefromalldatasets} 
[ **All Datasets 的 EDD 表格** ](#eddtablefromalldatasets)是一個更高層的數據集,其中包含目前載入您的所有其它數據集的資訊ERDDAP. 和其他類型的數據集不同,allDatasets在datasets.xml.ERDDAP™自動建立 AllDatasets 的 EDD Table 資料集 (與datasetID=allDatasets) . 因此,allDatasets每個數據集將建立ERDDAP™安裝,每件都一樣ERDDAP™安裝

其allDatasets数据集是表格数据集。 它對每個數據集都有一列資訊 它有列,有每套資料的資訊,例如,datasetID、 可存取、 機構、 標題、 短距、 最大距、 短距、 最大距、 最小距、 最小距、 最大距等 。 因為allDatasets是表格化的数据集,您可以以相同的方式在其中查詢其他表格化的数据集ERDDAP™,您可以指定答案的檔案類型。 這可以讓使用者以非常強大的方式搜尋關注的數據集 。
 
### Ascii 檔案中的 EDD 表格{#eddtablefromasciifiles} 
[ **Ascii 檔案中的 EDD 表格** ](#eddtablefromasciifiles)從逗號、 分號、 分號、 或空間分隔的 ASCII 資料檔中汇总資料 。

* 檔案通常會有第一行的列名和第二行的數據。 (這裡,文件的第一行叫做第1行.) 但你可以用&lt;列名Row &gt; 和&lt;在您的第一個 DataRow &gt; 中datasets.xml要指定不同行號的檔案。
*   ERDDAP™允許各行資料有不同的數值。ERDDAP™假定缺少的數值是行中最後一列。ERDDAP™指定缺少的數值的标准值。 (新增 v1.56) 
* ASCII 檔案很容易使用, 但它們不是儲存/取得資料的最有效方式 。 要提高效率, 儲存檔案為NetCDFv3.nc文件 (包含一個維度, "row", 所有變數共享) 相反。 你可以[使用ERDDAP™以產生新檔案](#millions-of-files).
* 看這班的超級[檔案中的 EDD 表格](#eddtablefromfiles),以了解本課如何運作和如何使用。
* 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 由于 ASCII 檔案完全缺乏中繼資料, 您總是需要編輯 GenerateDatasetsXml 的結果 。
* 警告:ERDDAP™讀取 ASCII 資料檔, 如果它找到指定行上的錯誤 (例如,項目數不正確) ,它登入警告信件 (糟糕的行 (s) 數據清單... 以及之後各行的壞行清單) 至[log.txt 文件](/docs/server-admin/additional-information#log)然后繼續讀取剩下的資料檔 。 因此,你的責任是定期查看 (或寫作腳本) 在日志中的消息。 txt 可以修正資料檔中的問題 。ERDDAP™以此方式設置, 讓使用者可以繼續讀取所有可用的合法資料, 即使檔案的某些行有缺陷 。
     
### 從 EDD 表格 AwsXml 檔案{#eddtablefromawsxmlfiles} 
[ **從 EDD 表格 AwsXml 檔案** ](#eddtablefromawsxmlfiles)自動氣象站的資料集合 (阿WS) 使用 WeatherBug Resst XML API 的 XML 資料檔 (已停止使用) .

* 此類型的檔案是簡單但低效的數據儲存方式, 因為每個檔案通常只包含一個時點的觀測值 。 所以可能有很多文件 如果你想提高性能, 考慮整合觀察群組 (一周的價值?)  inNetCDFv3.nc文件 (最好:.nc檔案[CF 分解采样 (副秘书长) 相關的標籤陣列格式](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) 使用[多晶格檔案的 IDD 表格](#eddtablefrommultidimncfiles)  (或[来自 NcCFF 的 EDD 表格](#eddtablefromnccffiles)) 以服務數據。 你可以[使用ERDDAP™以產生新檔案](#millions-of-files).
* 看這班的超級[檔案中的 EDD 表格](#eddtablefromfiles),以了解本課如何運作和如何使用。
     
### ColumnarAscii 檔案中的 EMD 表格{#eddtablefromcolumnarasciifiles} 
[ **ColumnarAscii 檔案中的 EMD 表格** ](#eddtablefromcolumnarasciifiles)總合表格 ASCII 資料檔中的有固定width列的資料。

* 檔案通常會有第一行的列名和第二行的數據。 檔案中的第一行/排為第一行。 但你可以用&lt;列名Row &gt; 和&lt;在您的第一個 DataRow &gt; 中datasets.xml要指定不同行號的檔案。
* 其&lt;addAttributes每一份 &gt;&lt;dataVariable&gt; 对于這些數據集, MUST 包含這兩個特殊的屬性:
    
    *   &lt;atname=“ start Column ” &gt; *整數* &lt;att &gt; -- 指定每行中此數據變數的起始字元列。
    *   &lt;姓名= "stopColumn" &gt; *整數* &lt;att &gt; -- 指定每行中的字符列, 即此數據變數結束後的 1 。
    
第一個字符列叫做第0欄.
例如, 對此檔案, 時間值為溫度值 :
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
數據變數的時間
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
和時間數據變數
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
這些屬性必須指定除此之外的所有變數[固定值](#fixed-value-sourcenames)和[文件名 - 來源 - 名稱](#filename-sourcenames)變數。
* ASCII 檔案很容易使用, 但無法有效儲存/取得資料 。 要提高效率, 儲存檔案為NetCDFv3.nc文件 (包含一個維度, "row", 所有變數共享) 相反。 你可以[使用ERDDAP™以產生新檔案](#millions-of-files).
* 看這班的超級[檔案中的 EDD 表格](#eddtablefromfiles),以了解本課如何運作和如何使用。
* 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 由于每個資料欄的起始位置和結束位置都難定, 且 ASCII 檔案中完全缺乏中繼資料, 您總是需要編輯 GenerateDatasetsXml 的結果 。
     
### 從 HttpGet 的 EDD 表格{#eddtablefromhttpget} 
EDD 表格 FromHttpGet 與其它類型的數據集不同ERDDAP™它有一套系統,讓特定的"作者"可以新增資料,修改資料,或從資料集中刪除資料。HTTP GET或[后](#http-post)來自電腦程式、文稿或瀏覽器的要求。 數據集可以被使用者查詢, 和其他所有 EDD Table 數據集一樣ERDDAP. 看這個班級的超級級[檔案中的 EDD 表格](#eddtablefromfiles)讀到從超級級傳承下來的特征

以下描述 EDD Table FromHtpGet 的獨特功能 。 你必須讀讀這首節,

#### 原定用途{#intended-use} 
该系统的目的是:

* 表格 (原地) 資料,不是網格化的資料。
* 实时資料 -
目的就是允許作者 (例如感應器、自動QC文稿或特定人類) 以修改數據集 (通過[插入或刪除命令](#insert-and-delete)) 并讓此變更可供ERDDAP™使用者都不到一秒,可能更快。 這一秒多半是網路時間ERDDAP™使用者可立即存取此資料。 這個是[快](#httpget-speed),[有力](#robust)和[可靠系統](#system-reliability).
* 幾乎任何數據的頻率...
此系統可以接受少數資料 (例如,每日) 透過非常频繁的數據 (例如, 100 Hz 資料) . 如果你优化系統,它可以處理更高的頻率數據 (如果你走到極點, 可能有10 KHz 資料) .
* 資料來自一個感應器或類似感應器的集合。
*   [版本](#versioning)/[可复制的科學](https://en.wikipedia.org/wiki/Reproducibility)/DOIs --
需要改變數據的情況 (例如, 更改质量控制旗) ,知道哪位作者做了每次修改,知道作者做了修改的時間戳,以及 (应要求) 可以在變更前看到原始資料。 因此,這些資料集符合[DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier). 因為他們遇到DOI要求除集合外数据集不變。 通常,近实时数据集不符合DOIs 因數據常被回溯性變更 (例如,用于质量保证/质量控制目的) .
     

一旦數據在 EDD Table FromHttpGet 數據集中,任何使用者都可以以他們要求從其他 EDD Table 數據集中取得資料的方式要求資料 。
     
#### 實驗 : 小心{#experimental-be-careful} 
因為這個系統是新的 而且失去的環境數據無法重新取得 你應該把EDDTable FromHtpGet當做實驗 如果你正在從另一個系統轉換, 請將舊系統與新系統平行執行, 直到你相信新系統運作良好。 (數周或數月 不只是數小時或數天) . 在所有情況下, 請確保您的系統將 . (即使只是Apache和/或Tomcat紀錄) 至少有一陣子了 在所有情況下, 請確保您的 EDDTable FromHttpGet 資料集所產生的資料檔案常被儲存到外部資料儲存裝置中 。 (注意:[rs](https://en.wikipedia.org/wiki/Rsync). 可以非常高效地支持 EDDTable FromHttpGet 建立的資料檔案 。)   
     
#### 插入和删除{#insert-and-delete} 

任何數據集ERDDAP™,當您向ERDDAP™您指定您想要的應答檔案類型, 例如 . csv,.htmlTable,.nc,.json. 来自 Http 的 EDD 表格 取得此系統的延伸以支援另外兩個可以插入的「 文件類型 」 (更改) 或刪除數據庫中的資料:

* 插入
    * 要求格式化為標準的 HTML 格式回應, 包含按鍵=值對, 以 ' &' 分隔 。 例如,
         https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1   
告訴ERDDAP™要新增或變更數據stationID=46088 的指定時間。
    * 此變更的作者是JohnSmith, 鑰匙是一些Key1.
    * 網址必須包含合法值 (不缺少值) 全部[http取得需要的可變性](#httpgetrequiredvariables-global-attribute)
    * 如果http取得需要 要求中的變數 (例如,stationID時間) 匹配已經在數據集中的列上的數值,新數值有效覆蓋舊數值 (舊數值仍可存取, 如果使用者要求從先前的數據[版本](#versioning)数据集) .
    * 插入 URL 絕對不包含( T) (ERDDAP™產生此值) 命令( C) (插入 (命令=0) 或刪除 (命令= 1) ) .
    * 如果 . 插入 URL 不指定數據集中其他列的數值, 則被假設為本地缺失數值 (MAQQVALUE 表示整數數位數型態, NaN 表示浮點數和雙倍數, "" 表示字符串) .
             
    * 刪除
        * 要求格式化為標準的 HTML 格式回應, 包含按鍵=值對, 以 ' &' 分隔 。 例如,
             https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1   
告訴ERDDAP™要刪除資料stationID=46088 在指定时间内。
        * 此變更的作者是JohnSmith, 鑰匙是一些Key1.
        * 網址必須指定[http取得需要的可變性](#httpgetrequiredvariables-global-attribute)在要求中 (例如,stationID時間) . 如果那些數值符合數據集中已經列上的數值 (他們通常會) ,舊數值被有效刪除 (舊數值仍然可以存取, 如果使用者要求從先前的數據[版本](#versioning)数据集) .
        * 除作者外, 不需要指定非 HttpGet 需要的變數 。
             
    
細節 :
    * 插入和 刪除 要求格式化為标准的 HTML 格式回應, 包含按鍵=值對, 以 ' &' 分隔 。 值必須是[編碼百分比](https://en.wikipedia.org/wiki/Percent-encoding). 因此, 您需要將特殊字元編碼為% HH, 其中 HH 是字元的二位十六進位值 。 通常您只需要將一些 punctuation 字元 :% 轉換成% 25, &% 26, " 轉換成% 22,&lt;進入% 3C, = 到% 3D, &gt; 到% 3E, + 到% 2B,|進入% 7C,\\[進入% 5B,\\]轉換為% 5D, 空間轉換為% 20, 將 # 127 以上所有字元轉換為 UTF-8 格式, 然后% 將 UTF-8 格式的每個字節編碼為% HH格式 (向程序員求助) .
    * 插入和删除的要求必須包括:[http取得需要的可變性](#httpgetrequiredvariables-global-attribute)例如,stationID和時間。 对于. 插入要求, 假設要求中未指定的變數為缺失值 (MAQVALUE 表示整數變數, NaN 表示浮點數和雙點變數, 以及空弦變數) . 刪除要求, 非 HttpGet 需要的值 變數 (除了作者,) 被忽略。
    * 插入和 delate 要求必須包含作者姓名和作者的金鑰 。 *作者%% key* 以為要求中最後的參數。 要求最後一次 确保全部請求被收到ERDDAP. 只有作者 (不是按鍵) 將儲存在資料檔中。 您必須指定允許的清單 *作者%% key* '通过全局屬性[http取得金鑰](#httpgetkeys)
    * 插入和刪除參數可能會是 scalar (單一) 窗体中任意長度的數值或陣列\\[值 1, 值 2, 值 3,..., 值 N\\]. 对于給定的要求,所有有陣列的變數必須有數值相同的陣列 (不然就是錯誤了) . 如果要求有scalar和陣列數值, 則會复制scalar 數值, 成為與指定陣列等長度相同的陣列, 例如 &stationID=46088 可能被视为 &stationID=\\[46088,46088,46088\\]. 陣列是[高通量](#httpget-speed). 沒有陣列, 插入或從遠端作者中刪除每秒8行以上的數據將有挑戰性 (因為這個網絡的所有管理) . 隨著陣列, 很容易插入或從遠端傳感器中刪除每秒1000多行資料 。
    * 插入和删除接受 (沒有錯誤訊息) 需要整數時浮點數 。 在這些情況下, 數據集將數值轉成整數 。
    * 插入和删除接受 (沒有錯誤訊息) 整數和浮點數是變數數的數據型態以外的。 在這些情況下,數據庫將數值儲存為ERDDAP此資料類型的原生數值缺失 (整數型態的MAQVALUE, 浮體和雙倍的NaN) .
         
#### 答复{#response} 
如果插入或刪除 URL 成功, HTTP 回應碼會是 200 (好) 的回覆會是文字.json物件,例如,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
注意, 時間戳有毫秒精度 。

如果. 插入或. 刪除 URL 失敗, 您將會得到200 以外的 HTTP 回應碼 (好) , 例如: 錯誤 403 禁止提交不正確的作者QQkey值 。ERDDAP™傳送 HTTP 回應碼 (不,例如,a.json格式化錯誤) 因為這就是網路上的事 因為系統裡的任何地方都有錯誤 (例如, 在傳回 HTTP 錯誤的網路中) . 如果錯誤來自ERDDAP™,答复可能包括一些文字 (不是.json) 但HTTP回應代碼 (200=OK,其他的都是麻煩) 是檢查 . 插入 或. delate 是否成功的适当方式 。 如果檢查 HTTP 回應代碼不可行或不方便, 請在回應文字中搜尋「 狀態 」 : 「 成功」 , 這應該是成功的可靠指示 。
    
#### 日志文件{#log-files} 
當 EDDTable FromHttpGet 接收. 插入和. 刪除命令時, 它只是將資訊附加到一系列的紀錄檔案中的相關檔案中, 每個檔案都是儲存在一個中的表格[杰森 行 CSV 文件](https://jsonlines.org/examples/). 當使用者要求數據時ERDDAP™快速讀取相關的紀錄檔, 將變更依次套用於數據集, 然後像其他的樣, 通過使用者的制约來過過過此要求 。ERDDAP™數據要求 。 數據分割到各紀錄檔, 儲存各項資訊 (例如命令的印章, 以及命令是. 插入還是. delete) ,以及數據集設定的方方面面,都使得ERDDAP將數據儲存到此數據集中, 並從中取回數據 。
     
#### 安全和作者{#security-and-author} 
插入和刪除指令必須包含 & author= *作者%% key* 作為最後一個參數, 其中作者的%% key 由作者的标识符组成 (您選擇:名稱、首字母、假名、數字) 插圖和密钥 其ERDDAP™管理員會與作者合作以產生有效的作者QQkey 數值清單, 它可以隨時變更 。
當 EDDTable FromHtpGet 接收 . 插入 或 delate 命令時, 它會確認作者ID%% key 是最後一個參數且有效 。 因為它是最後一個參數, 它表示已達到整個命令行ERDDAP™并且沒有截斷 秘密金鑰確保只有特定的作者可以插入或刪除數據庫中的資料 。ERDDAP™然後提取作者ID並儲存在作者變數中, 這樣任何人都可以看到是誰對數據集的變更負責 。
插入和删除命令只能通过https:  (安全)  ERDDAP™URLs. 這可确保所移交的信息在过境过程中保密。
     
#### 印章{#timestamp} 
作为紀錄系統的一部分, EDDTable FromHttpGet 新增了一次印章 (那時候ERDDAP收到要求) 到它儲存在日志檔案中的每個命令。 因為ERDDAP™產生時間戳, 而不是作者, 不同的作者是否從計算機中做出改變, 時間戳可靠地表示此變更到數據集的時間 。
     
#### HTTP 后{#http-post} 
*   ["HTTP POST呢?"](#http-post)  
(HTTP)[后](https://en.wikipedia.org/wiki/POST_(HTTP))是更好的替代方案 (相比HTTP GET) 從客戶端傳送資訊到 HTTP 伺服器。 如果您能或真的想提高安全性, 請使用 POST 而不是將資訊傳送至ERDDAP. POST更加安全,因為:https,網址以安全的方式傳送,但整個網址 (包括參數, 包括作者%% key) 會寫給阿帕奇人 托姆卡特ERDDAP™紀錄檔案, 如果檔案沒有正確的安全, 人們可以讀取 。 使用 POST , 參數以安全的方式傳送, 並沒有寫入紀錄檔 。 POST對客戶端工作來說有些難受,而且沒有被客戶端軟體廣泛支持,但程序語言確實支持它. 您通过 GET 或 POST 傳送到數據集的內容會是相同的, 只是格式化為不同 。
     
#### http取得需要 全球屬性變數{#httpgetrequiredvariables-global-attribute} 
使整個系統運作的一個重要部分 就是需要的全局性http取得需要 變數,是用逗號分隔的清單dataVariable唯一辨識一列資料的來源名稱 。 這應該是最小的, 幾乎總是包括時間變數 。 例如:http取得需要 每個變數[CF 分解采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)  (當然,你的數據庫裡的ID名稱可能不同) :

* 時間序列 :stationID時間
* 傳射器: 軌道ID, 時間
* 描述文件: 時間 (假設時間是 profile==d) 深度
* 時間序列 設定檔 :stationID時間 (假設時間是 profile==d) 深度
* 專輯 設定檔: 轨迹ID, 時間 (假設時間是 profile==d) 深度

    
以時間序列為例 :
包含 . 插入命令stationID=46088和時間=2016-06-23T19:53:00Z (其他變數的數值) :
* 如果目前沒有關於該站的資料, 以及那段時間的資料, 那麼效果是將資料加入到資料集中。
* 如果有這台站的數據 以及那段時間的數據 那麼效果就是用這個新數據取代现有的數據列 (當然,因為ERDDAP™保留它收到的每個指令的紀錄, 舊數據仍在紀錄中 。 如果使用者在此變更前要求從數據集的版本中取得資料, 他們會看到舊的資料 。)   
         
#### http取得剪切{#httpgetdirectorystructure} 
*   [http取得Birdy 全球屬性與資料 (日志) 文件名](#httpgetdirectorystructure)  
讓整個系統高效运作的一部分就是ERDDAP™建立一套資料 (日志) 檔案,每個檔案都有不同的數據集。 如果這些都安排好了ERDDAP™能夠快速回應大部分的數據要求。 此設定由http取得 DirectyStructure 環球屬性, 這項字串看起來像一個相對的文件名稱, 例如, "stationID10年),但實際上是目錄結構的规格. 表示資料目錄與檔名的部分 (日志) 檔案將建構 。
    
    * 如果部件是整數 (&gt;= 1) 加上時間 (毫秒、秒、秒、小時、日期、月、年或他們的复數) , 例如, 10 年, 然后 EDD Table FromHttpGet 数据集會占用數據列的時間值 (例如,2016-06-23T19:53:00Z) ,計算精确度 (例如2010年) ,從中建立資料夾或檔案Name
        
目標是把一個合理的大塊數據帶入每個檔案, 但遠不足 2GB 。
        
    * 要不然,规格部分必須是dataVariable是sourceName例如,stationID. 在此情况下, EDDTable FromHttpGet 會從此變數的值來建立新資料的資料夾或檔名 (例如,"46088") .
    
因為 . 插入和 . 刪除命令資料被儲存在特定的資料中 (日志) 檔案, EDDTable FromHttpGet 通常只需要開啟一個或幾個資料 (日志) 找到指定使用者要求的資料的檔案。 因為每個數據 (日志) 檔案有其數據集的所有相關資訊, EDDTable FromHttpGet 可以快速而容易地做成一個特定版本 (或目前版本) 的資料集 (且不需要產生整個數據集的要求版本) .
    
一般指南以數量和頻率为依据。 如果我們假定每列數據有100字節...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
例如,如果目錄結構是stationID半月,你插入兩站的資料 (46088和46155) 包含2015年12月至2016年5月的時間值 Get 會建立命名為46088和46155的目錄, 並在每個命名為2015- 11 的檔案中建立檔案.jsonl, 2016-01.jsonl, 2016-03.jsonl, 2016-05.json我 (每個月都有相關站台的數據) . 若您使用 . 插入 或 . 刪除來改變或刪除數據, 例如, 2016-04-05T14: 45: 00Z, EDDTable FromHttp等站點的46088 。 把命令附加到46088/2016-03.jsonI, 相關資料 (日志) 文件。 因為數據集只會建立其他的目錄,
    
#### http取得金鑰{#httpgetkeys} 
每個 EDD 表格 從 Http 取得數據集必須有全局屬性httpGetKeys 指定被允許作者清單及其密钥為逗號分隔清單 *作者%% key* 例如, JohnSmith#someKey1,HOBOLogger#someKey2,QCScript59#someKey3。
* 作者QQkey's 是大小寫敏感, 必須完全是 ASCII 字符 (# 33 - # 126, 沒有任何逗號, " 或 ' 字符 )
* 金鑰就像密碼, 所以它們必須是 \\\ 8 字元, 很難猜, 而且沒有內部字典的單詞 。 你應該對待他們 就像對密碼一樣 保密
* 第一個 'Q' 字元將作者與金鑰隔離, 所以作者名稱不能包含 'Q' 字元 (但按鍵可以) .
* 任何作者都可以有一位或多位作者的作品,例如 John Smith Some 金鑰1, John Smith somesome( John Smith ) 鑰匙7,等等。
* 您可以隨時變更此屬性值 。 變更在下次裝入數據集時生效 。
* 此資訊將在公開前從數據集的全球屬性中移除 。
* 每一個要插入或刪除資料的數據集的要求必須包含一個 & author=( A) *作者%% key* 參數。 在驗證金鑰是否有效后,ERDDAP™只保存作者部分 (不是按鍵) 。

#### 設定{#set-up} 

以下是建立 EDD Table FromHtpGet 資料集的建議步骤:

1. 建立主目錄以保存此数据集的資料 。 例如, 我們使用 /data/ testGet/ 。 用戶執行 GenerateDatasetsXml 與用戶執行ERDDAP™必須有此目錄的讀取權限 。
     
2. 使用文字編輯器做樣本.jsonl 延伸名的 CSV 文件.json我在那個目錄裡
名字不重要 例如,你可以把它叫做樣本.json我
做2行.jsonl CSV 檔案, 第一行有列名和假人/ 典型值 (包含) 第二行 以下是适合收藏的樣本檔案featureType= 测量空气和水溫的時空數據。
    \\[為featureType你可能會改變stationID成為軌道代碼\\]  
    \\[為featureType你可能會改變stationID以配置ID并新增深度變數。\\]
    
    \\["stationID","time","纬度","經度","空調","水調","時章","作者","命令"\\]
    \\["MyStation","2018-06-25T17:00Z",0.0,0.0,0.0,0.0,"SomeBody",0\\]
    
注:
    * 實際資料數值并不重要, 因為您會刪除此檔案, 但它們應該是正確的資料類型 。 值得注意的是, 時間變數應該使用與來源實際資料相同的格式 。
    * 对于所有變數,sourceName等於destinationName,所以現在使用正確的/ 最後的變數名稱, 包括時間、 經度、 有時深度或高度, 如果包含有此資訊的變數的話 。
    * 幾乎總會有一個變數, 它可以是數據串[适合字符串時間的單位](#string-time-units)  (例如,yyyy-MM-dd"T"HH:mm:s.SSSZ) 或資料 輸入雙倍[适合數值的單位](#time-units)  (例如,自1970-01-01T00:00Z起的秒,或者其他基期) .
    * 三列 (通常是后三) 必須是時間戳 作者 命令
    * EDDTable FromHttpGet 會使用時間戳來新增時間戳, 表示在資料檔中加入指定一行資料的時間 。 自1970-01-01T00:00Z起,
    * 包含資料的作者列 Type String 將會用於紀錄哪位授权作者提供此行的資料 。 授权作者由[http取得 Keys 全局屬性](#httpgetkeys). 雖然金鑰被指定為 *作者%% key* 中, 只有作者部分保存在資料檔中 。
    * 有資料的指令列 Type 位元組會指示此行上的資料是否是插入 (0) 或刪除 (1) .
         
3. 執行產生代碼 告訴它
    
    1. 數據集類型是 EDD Table fromHttpGet
    2. 目錄是 (此示例) /data/測試 取得/
    3. 樣本檔案是 (此示例) /data/testGet/啟動.json我
    4. 其http取得需要 變數是 (此示例)  stationID時間 參考[http取得需要的可變性](#httpgetrequiredvariables-global-attribute)下面。
    5. 如果每5分鐘收集數據,http取得 Directy 樣本stationID半月 參考[http取得剪切](#httpgetdirectorystructure)下面。
    6. 其[http取得金鑰](#httpgetkeys)
    
新增輸出 (區塊datasets.xml數據集) 至datasets.xml.
     
4. 編輯datasets.xml此數據集的區塊讓它正確且完整 。
特別是,取代所有的? 內容正确
     
5. 為了&lt;檔案表 inMemory &gt; 設定 :
    * 如果數據集通常會經常得到. 插入和( 或) 刪除要求, 請設定為真 。 (例如,每10秒多一次) . 這能幫助 EDDTable FromHttpGet 更快地回應. 插入和/或刪除要求 。 如果您將此設定為真, EDDTable FromHttpGet 仍會定期儲存檔案表與相關資訊至磁碟 (按需要,大概每5秒) .
    * 設定此錯誤 (默认) 如果數據集通常會不常被插入和/或刪除要求 (例如,每10秒不到一次) .
         
6. 注: 可以使用&lt;快取自Url&gt; 及相关設定值datasets.xmlEDD 表格 從 Http 取得數據集, 以此來製作並維持一個遠端 EDD Table FromHttpGet 数据集的本地副本ERDDAP. 但在此情况下, 這個本地數據集會拒絕任何. 插入和刪除要求 。

#### 使用 EDD 表格 從 HttpGet 資料集{#using-eddtablefromhttpget-datasets} 

* 作者可以提出"要求"[插入資料到或刪除數據集中的資料](#insert-and-delete).
     
* 在真正的資料被插入到数据集後, 您可以而且應該刪除原始的樣本資料檔 。
     
* 使用者可以要求數據集的資料,如同對其他 EDDTable 資料集的要求一樣ERDDAP. 如果要求未包含時間戳欄的限制, 那麼要求會從目前版本的數據集中取得資料 (在處理所有插入和刪除命令及重新排序之后的日志檔http取得需要的可變性) .
     
* 使用者也可以提出與 EDD Table FromHtpGet 數據集相關的要求:
    * 如果要求包括&lt;或&lt;= 時間戳欄的限制,那么ERDDAP™處理日志檔案的列到指定的时间戳。 實際上, 這會暫時刪除數據庫中自此時戳值後的所有變更 。 更多信息,看[版本](#versioning).
    * 如果要求包含 &gt;, QQ, 或 = 時間戳列的制约, 例如( T)&lt;=0,那么ERDDAP™返回目前資料檔中的資料,而不處理插入和刪除命令。
* 未來,我們預想工具將被建造 (我們? 你?) 使用這些數據集。 例如, 可能有一個文稿可以讀取原始的紀錄檔, 应用不同的校正方程, 並用此產生的資訊產生/更新不同的數據集 。 注意文稿可通过要求取得原始資料ERDDAP™  (以檔案格式取得對文稿最容易工作的資料) 以產生/更新新數據集。ERDDAP. 文稿不需要直接存取資料檔案; 它可以在任何經授权作者的電腦上 。
     

#### HttpGet 的 EDD Table 详细信息{#detailed-information-about-eddtablefromhttpget} 

主題是:

*   [不要改變布局&#33;](#dont-change-the-setup)
*   [堆](#crud)
*   [無效的要求](#invalidrequests)
*   [速度](#httpget-speed)
*   [勃起](#robust)
*   [系統可靠性](#system-reliability)
*   [版本](#versioning)
*   ["HTTP PUT和DELETE呢?"](#https-put-and-delete)
*   [注](#httpget-notes)
*   [多虧了CHORDS的基本想法](#thanks)

以下是详细信息:

##### 不要改變布局&#33;{#dont-change-the-setup} 
數據集建立後, 您就會加入數據:

* 不添加或移除任何dataVariables.
* 不要改變sourceName或destinationName主席dataVariables.
* 不要改變數據 型態dataVariables. 但你可以改變dataVariable中繼資料
* 不要改變http取得需要 變數全局屬性 。
* 不要改變http取得 DirectyStructure 全局屬性 。

如果您需要變更任何這些東西, 請建立新的數據集並將所有資料轉換到新的數據集 。
     
##### 堆{#crud} 
在電腦科學中,使用數據集的四個基本指令是:[革命 讀 更新 迪勒特 (堆) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). SQL, 使用關聯數據庫的語言, 在 EDD Table fromHttpGet 中,

* 插入是 CREATE 和 UPDATE 的结合。
* 德雷特是德雷特
* 要求數據子集的正規系統是 READ 。

因此, EDDTable FromHttpGet 支援所有使用數據集的基本指令 。
     
* 插入或刪除沒有錯誤的要求會傳回 HTTP 狀態代碼=200 和 JSON 物件,例如,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
兩倍印章值是指同一毫秒, 也就是要儲存在插入或刪除的數據列的時間印章變數中的毫秒 。ERDDAP™未來不會改變這些金鑰值對的名稱和格式 。ERDDAP™未來可能會新增 JSON 物件的金鑰值對 。
     
##### 無效的要求{#invalidrequests} 
不合法的 . 插入 或. 刪除 要求會傳回 HTTP 除狀態=200以外的錯誤狀態代碼, 並且不變更資料集 。 包括有不正確的作者信息的要求, 不正確的變數名稱, 不同變數的不同陣列長度, 缺少需要的變數, 缺少需要的變數等 。 如果要求涉及不止一個資料檔, 部分要求可能會成功, 部分會失敗 。 但是, 如果傳送要求的傳感器把任何失敗都當成完全失敗, 這就不會有問題了 。 例如,如果你告訴ERDDAP™要插入 (或刪除) 同樣的數據連續了兩次 最糟糕的情況是 資訊被儲存了兩次 在紀錄檔中相關 難以想象這會如何造成麻煩。
     
##### Htp 速度{#httpget-speed} 
插入或刪除要求 (不計數http间接费用) ,ballpark 算出 .插入或.delate 的速度是
每. 插入 1 列資料
每. 插入10行數列資料 2ms (\\[\\])   
每.插入100行數據 (\\[\\])   
每. 插入 1000 行數列資料 13 ms (\\[\\])   
顯然的陣列是[高通量](#httpget-speed). 沒有陣列, 插入或從遠端作者中刪除每秒8行以上的數據將有挑戰性 (因為這個網絡的所有管理) . 隨著陣列, 很容易插入或從遠端傳感器中刪除每秒1000多行資料 。

每個要求的數據數量非常之大, 您會按托姆卡特的极限到最大查詢長度 (假設是 8KB ?) 最大Http headerSize 設定值 *湯姆卡* /conf/server.xml的HTTP/1.1 連接器入口 。

什麼時候ERDDAP™讀取 JSON 線的 CSV 資料 (日志) 檔案, 和讀取二進制資料檔案相比, 有小的時間懲罰 。 我們覺得讀書的時間懲罰是合理價格, (最重要的) .

##### SSD{#ssd} 
[為了提高速度](#ssd)使用a[固态驱动器 (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive)以儲存數據。 他們的檔案存取時間要快得多&lt;0.1ms)比硬碟硬碟硬碟 (3 - 12毫秒) . 他們的數據傳輸速度也更快 (200 - 2500 MB/s) 比硬碟硬碟硬碟 (~200 MB/s) . 近年來, 雖然早期SSD在給定的區塊上寫了大量字之後有問題, 如果你只是使用 SSD 來寫入數據一次, 然後讀取它多次, 甚至一個消费級的 SSD (比企業級的SSD便宜得多) 應該會持續很久的
    
##### 勃起{#robust} 
我們試圖讓這個系統 變得容易操作 和尽可能強壯。
* 系統設計為多串線 (例如感應器、自動QC文稿和人類) 同樣的數據集甚至同樣的檔案上工作。 使用紀錄檔案來儲存數據 以及使用非常簡單的檔案類型[杰森 行 CSV 文件](https://jsonlines.org/examples/),以儲存數據。
* JSON Lines CSV的另一个巨大优点是,如果檔案真的被損毀了 (例如, 因為行上的錯誤而無效) ,很容易在文字編輯器中開啟檔案并修正問題。
* 另一個优点是, 如果檔案中的行有錯誤, 系統仍然可以在錯誤行之前和之后讀取所有行上的資料 。 系統仍可登入附加的. 插入和刪除資訊 。
* 使用可管理存取的標準檔案的巨大優勢 (或 Cassandra 或其他軟體) : 沒有其他的軟體需要維護, 隨時以增量方式支持標準檔案很容易 因為數據是零散的 (過一陣子, 只有目前各站的檔案會變更) . 由數據庫與卡珊德拉提供外部備份檔案,
         
##### 系統可靠性{#system-reliability} 
一個伺服器可以ERDDAP™每年有9小時的停工時間 (但是,你可以用在一個糟糕的夜晚&#33;) .
如果你勤勞和幸運,你可能會得到99.99%的升起時間 (每年停工53分鐘) , 因為要重新啟動更新需要那麼多時間 。
你必須采取極端措施 (一個獨立的備份伺服器,無阻電源,備份空調,24x7x365人以監控網站等.) 99.99%的升起率 (每年5.25分停工) . 即便如此,你也极不可能達到99.99%的升起率 (甚至99.99%) 因為問題常常是你无法控制的 例如亞馬遜網絡服務(Amazon Web Services)和Google(Google)提供惊人可靠的網絡服務,

面對它,每個人都想ERDDAP™百分之百的恢復 或至少被炫耀的"六九" (99.99999%的停工時間相当于每年32秒的停工時間) 但不管你花多少時間、努力和錢 你都不可能拿到錢

但是ERDDAP™上課不是真正的目標 目的是建立可靠的 **系統** 不會失去任何數據的 這是一個可以解決的問題。

解決辦法是:把錯誤的容忍性建立到電腦軟體中,把數據傳送到ERDDAP. 具体來說,此軟體應保持數據排隊等待前往ERDDAP. 當數據加入到隊列中時, 軟體應該檢查應答ERDDAP. 如果回覆沒有包含收到的資料 沒有錯誤。 那么軟體應該把資料留在排隊中 。 當產生更多資料並加入到隊列中時, 軟體應該再次試圖在隊列中插入資料 。 (也許和\\[\\]系統) . 它會成功或失敗。 如果失敗了,它會再試一次 如果你以此方式寫入軟體 如果軟體準備排隊數天數值的數據 你確實有機會把感應器的數據上傳到100%ERDDAP. 你將不費費力地完成任務

\\[背景: 我們沒想到會這樣[這就是電腦網路如何取得可靠性。](https://en.wikipedia.org/wiki/Reliability_(computer_networking)) 電腦網路本身就很不可靠 所以當您將檔案從一臺電腦轉移到另一台電腦時, 傳送的軟體知道或期望一些包可能會丢失 。 如果它沒有從接收器得到對一個特定包的認證,它會重新傳送丢失的包. 用此方法, 相对簡單的發件人和接收人軟體可以在不可靠的網路之上建立可靠的檔案傳輸系統 。\\]
    
##### 為什麼JSON Lines CSV檔案?{#why-json-lines-csv-files} 
使用 HttpGet 的 EDD 表格[杰森 行 CSV 文件](https://jsonlines.org/examples/)用于儲存數據。 原因如下:

* 主要原因有: JSON Lines CSV 檔案的簡化提供了快速,簡單,可靠的方式,讓多串線程寫入指定檔案 (例如, 在文件名上同步) .
* 如果 JSON Lines CSV 檔案被損毀 (例如, 因為行上的錯誤而無效) , FromHtpGet 的 EDDTable 仍然可以在錯誤行前后讀取所有行的資料 。 插入與刪除系統可以繼續新增資料至資料檔 。
* 因為 JSON Lines CSV 檔案是 ASCII 檔案, 如果檔案真的被損毀, 很容易修正 (在文字編輯器中) .
* JSON 行 CSV 支援 Unicode 字串 。
* JSON Lines CSV 支持可變長線 (不限於最大长度) .
* JSON 直線 CSV 支援64位整數 (長度) .
* JSON Lines CSV 的正式性质與附加語法 (v 舊式 CSV) 提供一些额外的保證 某條線沒有腐敗。

我們起初想用.nc3 個無限制尺寸的檔案 。 然而,

* 主要問題是: 沒有可靠方法讓多串線程寫到.nc3 個檔案, 即使線程合作, 以同步方式寫作 。
* 如果.nc3 檔案已損壞, 插入與刪除系統無法繼續使用檔案 。
* 因為.nc3 個檔案是二進制, 如果檔案已損毀 (因為多字串的問題) 它們非常難或無法修复 沒有工具可以幫助修复
* CF 無法指定字串的編碼, 所以沒有官方的方法支持Unicode, 例如 UTF-8 編碼 。 我們試圖讓 CF 支持 QQ 編碼屬性, 但無法取得任何進步 。 (Unidata他們的功勞是支持 QQ 編碼屬性 。) 
*   .nc3 個檔案只支援固定的长度字串 。 再一次,我們試圖得到CF和Unidata以支援變數長度字串, 但無法取得任何進度 。
*   .nc3 個檔案不支持用簡單的方法來区分單個字元變數與 String 變數 。 再一次,我們試圖得到CF和Unidata支持區分這兩種資料的系統,但無法取得任何進步。
*   .nc3 個檔案只支援有未指定編碼的 8 位字元 。 再一次,我們試圖得到CF和Unidata支持指定編碼的系統,但無法取得任何進展。
*   .nc3 個檔案不支援64位整數 (長度) . 再一次,我們試圖得到CF和Unidata但無法取得任何進步。
         
##### 版本{#versioning} 
因為 EDD 表格 從 Http 用時間戳和每個變更的作者來儲存所有變更的紀錄, 它可以很快地在任何時間重製此數據集 。 從某種意义上說,隨時都有一個版本。 如果使用者的數據要求包括時間戳&lt;= 制约,例如( T)&lt;=2016-06-23T16:32:22.128Z (或任何時間點) 但作者和命令不受限制ERDDAP™以先產生數據集的版本。 那ERDDAP™應用使用者的其他限制, 如對從ERDDAP. 建立 EDDTable FromHttpGet 以讓此行程非常快速高效, 即使對非常大的數據集也如此 。

相类似, 使用者可以通过要求... 時戳和時戳=max來查詢数据集上次更新的時間 。 (印章) 模糊( D) () 

任何對數據的要求, 任何版本的數據集, 使用者可以看到哪個作者做了哪些變更,

此版本系統启用[可复制的科學](https://en.wikipedia.org/wiki/Reproducibility)因為任何人都可以在任何時點要求數據集版本的資料。 我們所知道的其他系統 都不可能有如此精致的版本 基礎機制非常有效, 因為不需要額外的儲存空間,

并不是每個人都需要這種精良的版本, 但是在一個大數據管理組織的情況下, 這非常有用, 也許有必要。 (例如OOI、地球立方體、數據一和NOAA'是NCEI) 數據集可以有多重作者的地方 (例如感應器、自動QC文稿和人類編輯器) .

\\[歷史:我最先想到需要這種版本 (鮑勃) 2008年, 在當時,OOI有繁琐,慢,低效的基于Git的版本系統. Git對它設計的目的來說是好的 但這不是 2008年,在OOI討論時,我設計了一個廣泛,高效的替代OOI數據管理系統,包括我加入的很多功能.ERDDAP™包括此版本系統。 之後OOI致力於他們的版本系統, 於2016年, 因為其他項目有很多中断, 甚至現在, 我都不知道還有其他科學數據系統 能提供如此快速、簡單的權限 從任何時刻來存取數據版本, 簡單的檔案系統不能提供這個 。 關聯數據庫沒有 卡珊德拉沒有\\]
    
##### HTTPS 放置和刪除{#https-put-and-delete} 
*   ["HTTPS PUT和迪勒特呢?"](#https-put-and-delete)  
    [超文本傳輸協議 ((HTTP)) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)是环球網的基础,也是網頁網址從"開始的原因. http://" 或 " https://" . HTTP 是附加安全層的 HTTP 。 每天瀏覽器、文稿和電腦程序都產生數十億的HTTP (S)   **走** 要求從遠端來源取得信息。 (HTTP) (S) 也包括其他[動詞](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods),特别是PUT (將資料推向伺服器) 和迪勒特 (到伺服器的 DELETE 資料) . 是, PUT 和 DELETE 是透過 HTTP 插入資料並刪除資料的正當方式 (S) . GET 由每一個可以與 HTTP 合作的軟體支援 (S) . 工作很容易 每個人都知道怎麼跟GET合作 很多人知道怎麼用POST (基本上可以和GET相同的方式使用) 因此我們做了EDD Table FromHtpGet 和 GET和POST合作。 很少人 (甚至少數電腦程序員) 曾與PUT和DELETE合作過。 PUT和DELETE一般只靠電腦語言支持,所以使用它們需要一個技能豐富的程序. PUT與DELETE通常都比較複雜,
     
##### HttpGet 便條{#httpget-notes} 
*   [注](#httpget-notes)
    * 不dataVariable可能有數據Type=char。 使用dataType= string代替 。 如果您真的需要數據Type=char, 請發郵件給 Chris. 約翰在諾亞戈夫
         
##### 謝謝你{#thanks} 
*   [多虧了CHORDS的基本想法](#thanks)  
EDD Table FromHttpGet 的基本想法 (即使用HTTP GET要求加入數據集) 來自UCAR (NCAR的?)  [云宿实时資料服務 (痛苦) ](https://github.com/earthcubeprojects-chords)專案。 要求中的參數格式 (重复 *名稱=值* , 以 &'s 分隔) 是HTML表格在网页中使用的同樣的标准格式。 這是個簡單而聰明的主意 更是因為它很完美ERDDAP目前的表格資料處理系統。 這個想法在事后看很明顯 但我 (鮑勃) 沒想到 来自 Http 的 EDD 表格 利用這個基本想法 和我們如何實施的想法 來建立一個系統ERDDAP™上傳資料。 除了使用GET來將數據推進系統的基本想法外, EDDTable FromHtpGet 實施與CHORDS完全不同且完全獨立, (例如,日志檔案、數據的區塊、不同的安全系統、 CRUD 支援、 可复制的數據) . 我們對CHORDS的曝光只是個網民 因為我們立刻知道我們想用不同的方式實施系統。 但是我們感謝他們的基本想法。 全面提及CHORDS是:
丹尼爾斯,M.D.,Kerkez,B.,Chandrasekar,V.,Graves,S.,Stamps,D.S.,Martin,C.,Dye,M.,Gooch,R.,Bartos,M.,Jones,J.,Keiser,K. (2014年) . 用于地球科学的云宿实时資料服務 (痛苦) 軟體。 UCAR/NCAR -- -- 地球观测实验室。[ https://doi.org/10.5065/d6v1236q ](https://doi.org/10.5065/d6v1236q)  
     
### 從 EDD 表格Hyrax文件{#eddtablefromhyraxfiles} 
[ **從 EDD 表格Hyrax文件** ](#eddtablefromhyraxfiles)  (已贬值) 聚合數個變數的資料檔, 每個變數都有一個或多個共享的維度 (例如: 時間、高度 (深度) ,經度) ,由[Hyrax OPeNDAP伺服器](https://www.opendap.org/software/hyrax-data-server).

* 此數據集類型是 **已刪除** . 新的、更一般的解决方案是使用[快取 從 EDD Table 的 Url 選項 從檔案](#cachefromurl)  (或變體) ,它會提供遠端檔案的本地副本,並提供本地檔案的資料。 其&lt;快取 FromUrl &gt; 選項可以使用任何類型的表格資料檔 。 **   
如果你因某种原因不能成功 那就發郵件給克里斯 約翰在諾亞戈夫
如果2020年之前沒有人抱怨,此數據集類型可能會被移除. ** 
* 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 然後你可以編輯它來調整它。
* 大多數情况下, 每個檔案都有最左邊的數值 (第一) 維度,例如時間
* 檔案常常 (但不必) 对其他維度有單一值 (例如,高度 (深度) ,經度) .
* 檔案可能有附加尺寸的字元變數 (例如,) .
*   Hyrax伺服器可以用URL中的"/dods-bin/nph-dods/"或"/opendap/"來辨識。
* 這個班級的屏幕Hyrax各目錄中有檔案清單的網頁。 因此,它非常特別于目前的格式:Hyrax网页。 我們會努力調整ERDDAP™如果/當未來的版本Hyrax變更檔案的清單 。
* 其&lt;檔案Dir &gt; 設定被忽略 。 自從這課程下載 并做成每份遠端資料檔案的本地副本ERDDAP™強制檔案 想要是 *大家长會* 副本/副本 *datasetID* /.
* 為&lt;sourceUrl&gt;,使用數據集基目錄的網址Hyrax例如,伺服器,
    &lt;sourceUrl&gt; http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/ &lt;/sourceUrl&gt;
     (但放在一行)   (抱歉, 伺服器已不可用) .
其sourceUrl网页通常有 "OPeNDAP伺服器索引\\[目錄Name\\]" 在上.
* 由于此課程總是下載, 並且對每個遠端資料檔做本地複製, 您不該將此數據集包入[EDD 表格](#eddtablecopy).
* 看這班的超級[檔案中的 EDD 表格](#eddtablefromfiles),以了解本課如何運作和如何使用。
* 參考 1D, 2D, 3D, 4D 示例[NcFiles 的 EDD 表格](#eddtablefromncfiles).
     
### 來自 InvalidCRA 檔案的 IDD 表格{#eddtablefrominvalidcrafiles} 
[ **來自 InvalidCRA 檔案的 IDD 表格** ](#eddtablefrominvalidcrafiles)總和資料來自NetCDF  (v3 或 v4)  .nc使用 CF DSG 相關列的變體的檔案 (CRA 磁碟) 文件。 雖然ERDDAP™支援此檔案類型, 是無效的檔案類型, 沒有人可以開始使用 。 目前使用此檔案類型的群組被強烈鼓勵使用ERDDAP™以產生有效的 CF DSG CRA 檔案, 並停止使用這些檔案 。

細節 : 這些檔案有多重列大小變數, 每一個都有樣本%% dimension 屬性 。 檔案是非 CF 標準的檔案, 因為多樣本 ( ob) 維度將被解碼並與此附加規則和承諾相關, 而此規則與承諾並非CF DSG 规格的一部分 :"你可以將給定的如溫度值連結在一起 。 (溫度) 具有指定深度值 (Z\\_obs 維度, 最大值的維度) 溫度列大小 (供給一隻石膏,) 等於 0 或等於相应的深度行 (因為那個石膏)   (這是規矩) . 所以,如果溫度列的大小不是 0 , 那麼, N 的溫度值直接與 N 的深度值相關 (這就是承諾) ""

這些檔案的另一個問題: 首席調查官的列大小變數沒有樣本 。

此數據集類型的樣本檔案可以在 https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 此伺服器不再可靠可用\\].

看這班的超級[檔案中的 EDD 表格](#eddtablefromfiles),以了解本課如何運作和如何使用。

我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 然後你可以編輯它來調整它。

第一件事 產生達塔塞斯 Xml 在您回答問題後會為此類型的數據集打印樣本中的 ncdump 類型结构 。 所以如果您通過 GenerateDatasets 輸入第一個回路的幾個愚蠢的答案 Xml 至少你能看清ERDDAP™可以讀取檔案, 看看檔案中的尺寸與變數 。 然後你可以透過 Generate DatasetsXml 為第二圈提供更好的答案 。
 
### JsonlCSV 檔案中的 EDD 表格{#eddtablefromjsonlcsvfiles} 
[ **JsonlCSV 檔案中的 EDD 表格** ](#eddtablefromjsonlcsvfiles)總和資料來自[杰森 行 CSV 文件](https://jsonlines.org/examples/). 看這班的超級[檔案中的 EDD 表格](#eddtablefromfiles),以了解本課如何運作和如何使用。

* 正如 jsonlines.org 所言,這個格式比 CSV 更好 (法律上,作為聯邦的員工,我不能同意或不同意他們 -- 這有多瘋狂?) . CSV 從未被正式定義, 也因與原始電子表格程式相關的歷史包袱而受阻 。 相對而言, JSON Lines CSV 已完全定義, 且能從它與广泛使用的 JSON 標準的連接中獲益,Java文稿和Java. 值得注意的是, 長整數和Unicode 字元在字符串中都有充分的支持, 以及包含其他特殊字元的清晰方式 (尤其是分頁和新行) 在弦中。
    
此格式對數據集特別好, 您需要定期將新增列附加到指定資料檔的尾端 。 是因為這個原因和其他原因 (见上文) ,[從 HttpGet 的 EDD 表格](#eddtablefromhttpget)使用 Json Lines CSV 檔案來儲存資料 。
    
* 輸入檔案被假設為 UTF-8 編碼 。 然而,考虑到\\u *丁卯* 編碼特殊字元的格式 (例如,\\ u20ac 是歐元字元的編碼) ,您有權使用\\u來寫入檔案,使其只包含 7位 ASCII 字元 *丁卯* 以編碼 # 127 上方的所有字符。
     
* 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 然後你可以編輯它來調整它。
    
在您回答問題後, 產生 DatasetXml 對此類型的數據集的第一件事就是 列印樣本中類似 ncdump 的結構 。 所以如果您通過 GenerateDatasets 輸入第一個回路的幾個愚蠢的答案 Xml 至少你能看清ERDDAP™可以讀取檔案, 看看檔案中的尺寸與變數 。 然後你可以透過 Generate DatasetsXml 為第二圈提供更好的答案 。
    
* 警告:ERDDAP™讀 JSON 如果找到指定行上的錯誤, CSV 資料檔 (例如,項目數不正確) ,它登入警告信件 (糟糕的行 (s) 數據清單... 以及之後各行的壞行清單) 至[log.txt 文件](/docs/server-admin/additional-information#log)然后繼續讀取剩下的資料檔 。 因此,你的責任是定期查看 (或寫作腳本) 在日志中的消息。 txt 可以修正資料檔中的問題 。ERDDAP™以此方式設置, 讓使用者可以繼續讀取所有可用的合法資料, 即使檔案的某些行有缺陷 。
     
### 多晶格檔案的 IDD 表格{#eddtablefrommultidimncfiles} 
[ **多晶格檔案的 IDD 表格** ](#eddtablefrommultidimncfiles)總和資料來自NetCDF  (v3 或 v4)  .nc  (或[.nc毫升](#ncml-files)) 包含數個變數的檔案,每個變數都有一个或多个共享的維度。 檔案可能有附加尺寸或沒有附加尺寸的字元變數 (例如, 弦律14) . 看這班的超級[檔案中的 EDD 表格](#eddtablefromfiles),以了解本課如何運作和如何使用。

* 如果檔案是多维的 CF DSG 變體, 請使用此數據集類型來取代[来自 NcCFF 的 EDD 表格](#eddtablefromncfiles).
     
* 新的表格数据集.nc檔案, 在試用舊的之前先使用此選項[NcFiles 的 EDD 表格](#eddtablefromncfiles). 此課有以下一些優點:
    * 此類別可以從更广泛的檔案結構讀取更多變數 。 如果您指定尺寸CSV (以逗號分隔的大小名稱清單) 生成達泰斯 Xml (或&lt;維度CSV&gt;datasets.xml因此,ERDDAP™只能讀取來源檔案中使用其中部分或全部維度的變數, 加上所有的scalar變數 。 如果一個維度在群組中, 您必須指定它的完整Name, 例如, " *群組Name/ dimensionName* ".
    * 如果檔案不符合要求的限制, 此課程通常會很快拒絕檔案 。 所以從大集中讀取數據往往會更快
    * 此課程處理真字元變數 (非串列變數) 沒錯
    * 當創作者不使用Netcdf-java的寫法時, 此課程可以裁剪字串變數 (附加 char # 0 以標示字串的尾端) .
    * 此類別更適合處理缺乏某些變數或維度的個人檔案 。
    * 此類別可以移除指定數值缺失的列區塊[CF 分解采样 (副秘书长) 不完全的多面陣列檔案](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)  
         
* 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 然後你可以編輯它來調整它。
    
在您回答問題後, 產生 DatasetXml 對此類型的數據集的第一件事就是 列印樣本中類似 ncdump 的結構 。 所以如果您通過 GenerateDatasets 輸入第一個回路的幾個愚蠢的答案 Xml 至少你能看清ERDDAP™可以讀取檔案, 看看檔案中的尺寸與變數 。 然後你可以透過 Generate DatasetsXml 為第二圈提供更好的答案 。
    
群組 產生達塔斯 Xml 要一個"群組" 您可以輸入「 」 以搜尋任何群組 。 *一些 群組* " 或 " *某些群組/ 某些子群組* " 要它搜索特定的群體,或者"\\[根\\]"讓它只尋找根族 "群組"字串變成&lt;群組 &gt; 在datasets.xml資料集的資訊 (" 但\\[根\\]"變成") .
    
尺寸CSV -- 產生達塔斯 Xml 會要求"DimensionsCSV"字串。 這是一组維度的來源名稱的逗號分隔值列表 。 產生達塔斯 Xml 只會在樣本中讀取數據變數.nc使用部分或所有尺寸的檔案 (沒有其他維度) ,加上檔案中的所有scalar變數,並從這些數據變數中建立數據集。 如果一個維度在群組中, 您必須指定它的完整Name, 例如, " *群組Name/ dimensionName* ".
如果您沒有指定 (空字串) 生成達塔斯 Xml 會尋找維度最高的變數, 其理論是它們將是最有趣的, 但可能會有時你會想從使用其他維度群數的數據變數群中建立數據集。
如果你只指定不存在的尺寸名稱 (例如,NOQMATCH) ,ERDDAP™只會找到所有的標準變數
"DimensionsCSV"字串變成&lt;維度CSV&gt;datasets.xml資料集信息。
    
#### 治病{#treatdimensionsas} 
有不合法的類別.nc文件 (因為他們沒有遵守CF規矩) 具有多維度的 (例如,拉特,倫,時間) 他們應該只用一個維度 (例如,) ,例如:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
EDDTable From MultilidimNcFiles 有特殊功能處理這些檔案: 如果您在全局數據集中加入全局屬性「 treat DimensionAs 」addAttributes你可以看到ERDDAP™處理某些維度 (例如,拉特和隆) 好像它們是另一個維度 (例如,) . 屬性值必須是逗號分隔列表,指定"從"維度,然后是"到"維度,例如,
<att name="treatDimensionsAs">阿龍,時間到了</att>  
那ERDDAP™將讀取檔案如:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
當然,列表中每一維度的目前大小必須相同;否则,ERDDAP™將檔案視為「 壞文件 」 。

注意這些檔案是無效的, 因為它們不遵循 CF 規則 。 所以,即使ERDDAP™我們強烈建議你不要這樣建立檔案 因為其他基于CF的軟體工具 無法正确讀取它們 如果您已經有這些檔案, 我們強烈建議用有效的檔案來取代它們 。
    
### NcFiles 的 EDD 表格{#eddtablefromncfiles} 
[ **NcFiles 的 EDD 表格** ](#eddtablefromncfiles)總和資料來自NetCDF  (v3 或 v4)  .nc  (或[.nc毫升](#ncml-files)) 檔案和[扎爾](https://github.com/zarr-developers/zarr-python)文件 (截至第2.25版) 包含數個變數,每個變數都有一個共同的維度 (例如, 時間) 或不止一個共同的維度 (例如: 時間、高度 (深度) ,經度) . 檔案必須有相同的尺寸名稱 。 一個給定的檔案可能對每個維度都有多重值, 不同的來源檔案中的值可能不同 。 檔案可能有附加尺寸的字元變數 (例如, 弦律14) . 看這班的超級[檔案中的 EDD 表格](#eddtablefromfiles),以了解本課如何運作和如何使用。

Zarr 檔案的行為稍有不同, 需要檔案Name Regex 或路徑 Regex 加入"zarr" 。

* 如果.nc文件使用其中之一[CF 分解采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)檔案格式,試用[来自 NcCFF 的 EDD 表格](#eddtablefromncfiles)在試試之前
     
* 新的表格数据集.nc檔案, 試試新的檔案[多晶格檔案的 IDD 表格](#eddtablefrommultidimncfiles)先
     
* 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 然後你可以編輯它來調整它。
    
在您回答問題後, 產生 DatasetXml 對此類型的數據集的第一件事就是 列印樣本中類似 ncdump 的結構 。 所以如果您通過 GenerateDatasets 輸入第一個回路的幾個愚蠢的答案 Xml 至少你能看清ERDDAP™可以讀取檔案, 看看檔案中的尺寸與變數 。 然後你可以透過 Generate DatasetsXml 為第二圈提供更好的答案 。
    
尺寸CSV -- 產生達塔斯 Xml 會要求"DimensionsCSV"字串。 這是一组維度的來源名稱的逗號分隔值列表 。 產生達塔斯 Xml 將會在.nc使用部分或所有維度的檔案, 加上所有 scalar 變數, 並從這些數據變數中建立數據集 。 如果您沒有指定 (空字串) 生成達塔斯 Xml 會尋找維度最高的變數, 其理論是它們將是最有趣的, 但可能會有時你會想從使用其他維度群數的數據變數群中建立數據集。
    
* 1D 示例: 1D 檔案與 2D, 3D, 4D,... 檔案有些不同 。
    * 你可能有一套.nc資料檔,每個檔案都有一個漂浮浮浮標上一個月的數據。
    * 每個檔案都有一個維度, 例如時間 (大小 =\\[多次\\]) .
    * 每個檔案會有一个或多个 1D 變數使用此维度, 例如時間、 經度、 纬度、 氣溫... 。
    * 每個檔案可能有2D 字元變數, 例如, 大小 (時間, characters) .
         
* 2D 示例
    * 你可能有一套.nc資料檔,每個檔案都有一個漂浮浮浮標上一個月的數據。
    * 每個檔案都有兩個維度, 例如時間 (大小 =\\[多次\\]) 和 ID (大小 = 1) .
    * 每個檔案將有2 1D 變數, 其名稱和尺寸相同, 使用同名尺寸, 例如時間 (時間) 编号 (id) . 這些 1D 變數應該列入&lt;dataVariable&gt;在数据集的XML中.
    * 每個檔案會有一个或多个 2D 變數,例如經度,纬度,氣溫,水溫,...
    * 每個檔案可能有3D 字元變數, 例如, 有大小 (時間,id,nCharacters) .
         
* 3D 示例
    * 你可能有一套.nc資料檔,每個檔案都有一個固定浮標上一個月的數據。
    * 每個檔案都有3維, 例如時間 (大小 =\\[多次\\]) 拉特 (大小 = 1) 朗 (大小 = 1) .
    * 每個檔案將會有3 1D 變數, 其名稱和尺寸相同, 使用同名尺寸, 例如時間 (時間) 拉特 (拉特) ,隆 (龍) . 這些 1D 變數應該列入&lt;dataVariable&gt;在数据集的XML中.
    * 每個檔案都會有一个或多个3D變數,例如氣溫,水溫,...
    * 每個檔案可能有4D 字元變數, 例如, 有大小 (時間, lat, lon, n 切法克) .
    * 檔案的名稱可能在檔案的名稱內有浮標的名字.
         
* 4D 示例
    * 你可能有一套.nc數據檔 每個檔案都有一個月的數據 每一時點,本站都进行一系列深度的讀取.
    * 每個檔案都有四維, 例如時間 (大小 =\\[多次\\]) 深度 (大小 =\\[多次\\]) 拉特 (大小 = 1) 朗 (大小 = 1) .
    * 每個檔案會有4 1D 變數, 其名稱和尺寸相同, 使用同名尺寸, 例如時間 (時間) 深度 (深度) 拉特 (拉特) ,隆 (龍) . 這些 1D 變數應該列入&lt;dataVariable&gt;在数据集的XML中.
    * 每個檔案會有一个或多个 4D 變數,例如氣溫,水溫,...
    * 每個檔案可能有5D 字元變數, 例如大小 (時間、深度、Lat、lon、n) .
    * 檔案的名稱可能在檔案的名稱內有浮標的名字.
         
### 来自 NcCFF 的 EDD 表格{#eddtablefromnccffiles} 
[ **来自 NcCFF 的 EDD 表格** ](#eddtablefromnccffiles)總合資料 總合資料NetCDF  (v3 或 v4)  .nc  (或[.nc毫升](#ncml-files)) 使用檔案格式的檔案[CF 分解采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)公约。 看這班的超級[檔案中的 EDD 表格](#eddtablefromfiles),以了解本課如何運作和如何使用。

使用 CF DSG 變更之一的檔案, 請使用[多晶格檔案的 IDD 表格](#eddtablefrommultidimncfiles)相反。

CF DSG 傳統規定了數十種檔案格式, 這課是關于我們所知的變化 但我們可能錯過了一個 (或更多) . 如果此課不能讀取您的 CF DSG 檔案中的資料, 請[取得更多支持](/docs/intro#support).

我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 然後你可以編輯它來調整它。
 
### Nccsv 檔案中的 IDD 表格{#eddtablefromnccsvfiles} 
[ **Nccsv 檔案中的 IDD 表格** ](#eddtablefromnccsvfiles)總和資料來自[NCCSV 檔案](/docs/user/nccsv-1.00)ASCII.csv 檔案. 看這班的超級[檔案中的 EDD 表格](#eddtablefromfiles),以了解本課如何運作和如何使用。

* 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 然後你可以編輯它來調整它。
    
在您回答問題後, 產生 DatasetXml 對此類型的數據集的第一件事就是 列印樣本中類似 ncdump 的結構 。 所以如果您通過 GenerateDatasets 輸入第一個回路的幾個愚蠢的答案 Xml 至少你能看清ERDDAP™可以讀取檔案, 看看檔案中的尺寸與變數 。 然後你可以透過 Generate DatasetsXml 為第二圈提供更好的答案 。
    
* 警告:ERDDAP™讀取 NCCSV 資料檔, 如果它找到指定行上的錯誤 (例如,項目數不正確) ,它登入警告信件 (糟糕的行 (s) 數據清單... 以及之後各行的壞行清單) 至[log.txt 文件](/docs/server-admin/additional-information#log)然后繼續讀取剩下的資料檔 。 因此,你的責任是定期查看 (或寫作腳本) 在日志中的消息。 txt 可以修正資料檔中的問題 。ERDDAP™以此方式設置, 讓使用者可以繼續讀取所有可用的合法資料, 即使檔案的某些行有缺陷 。
     
### EDD 表從NOS{#eddtablefromnos} 
[ **EDD 表從NOS** ](#eddtablefromnos)  (已刪除) 處理來自 a 的資料NOAA [NO](https://opendap.co-ops.nos.noaa.gov/axis/)源, 使用[SOAP+XML](https://www.w3schools.com/xml/xml_soap.asp)要求和答复。 非常特別NOAANOS的XML。 參考數據集中的 EDD Table FromNOS 資料集。 xml 。
 
### 排泄物表{#eddtablefromobis} 
[ **排泄物表** ](#eddtablefromobis)處理海洋生物地理信息系统的資料 (海外) 伺服器 (是 http://www.iobis.org  ) . 可能已經沒有可用的伺服器使用此已过时的 OBIS 伺服器系統 。

* OBIS 伺服器期望有 XML 要求, 并傳回 XML 的回應 。
* 因為所有的 OBIS 伺服器都一樣的變數 (是 http://iobis.org/tech/provider/questions ) 的 OBIS 資料集ERDDAP.
* 你必須包括一個"creator\\_email" 全球addAttributes因為這信息在駕照內使用 從源碼URL讀取 XML 的回覆可以找到合适的電子郵件位址 。
* 您可能或無法取得全局屬性 [Stencils]&lt;subsetVariables&gt;] (# 可變性) 用指定的 OBIS 伺服器工作。 如果你試試,就試一個變數 (例如,科學名稱或基因) .
#### 排泄物表 骨架 XML{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Parquet 檔案的 EMD 表格{#eddtablefromparquetfiles} 
[ **Parquet 檔案的 EMD 表格** ](#eddtablefromparquetfiles)處理來自[平面](https://parquet.apache.org/). 看這班的超級[檔案中的 EDD 表格](#eddtablefromfiles),以了解本課如何運作和如何使用。

* Parquet 的設計非常高效的壓縮, 所以它可能會給你比其他格式更小的檔案大小 。
* 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 然後你可以編輯它來調整它。
* 警告:ERDDAP™讀取 Parquet 資料檔, 如果它找到指定行上的錯誤 (例如,項目數不正確) ,它登入警告信件 (糟糕的行 (s) 數據清單... 以及之後各行的壞行清單) 至[log.txt 文件](/docs/server-admin/additional-information#log)然后繼續讀取剩下的資料檔 。 因此,你的責任是定期查看 (或寫作腳本) 在日志中的消息。 txt 可以修正資料檔中的問題 。ERDDAP™以此方式設置, 讓使用者可以繼續讀取所有可用的合法資料, 即使檔案的某些行有缺陷 。
     
### 從 EDD 表格SOS {#eddtablefromsos} 
[ **從 EDD 表格SOS** ](#eddtablefromsos)處理感應觀察服務的資料 (瑞典/[SOS](https://www.ogc.org/standards/sos)) 伺服器。

* 此資料集類型汇集了一组站台的數據, 這些站台全部由一個站台服務SOS伺服器。
* 站台都提供同一套變數 (儘管各站的來源不需要服務所有的變數) .
*   SOS伺服器需要 XML 要求, 並傳回 XML 的回覆 。
* 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 然後你可以編輯它來調整它。 生成數據集 XML 不易SOS資料集。 要找到所需的信息,你一定要去sourceUrl+? 服務=SOS要求( S)GetCapabilities" 在瀏覽器中; 查看 XML; 手動提出 GetObserveration 要求; 查看 XML 對要求的回應 。
* 偶爾增加了新類型SOS伺服器與變更舊的伺服器,對此更難了ERDDAP™從伺服器的回應中自動檢測伺服器型態。 使用&lt;索斯ServerType &gt; (有IOOS\\_NDBC的價值,IOOS\\_NOS,OOSTethys或者) 現在被大力推薦了 如果您對此類型的數據集有問題, 請試著重新執行 GenerateDatasets Xml 表示SOS伺服器。 生成 數據集 Xml會讓你試試不同的&lt;sosServerType &gt; 的選項, 直到您為指定的伺服器找到正確的選項 。
*   SOS概述:
    * 瑞典 (感應器網路開啟) 和SOS  (感應觀察處) 是[OpenGIS 標準](https://www.ogc.org/standards). 那網站有標準文件
    * 其OGCWeb 服務共同规格 (OGC06-121r3) 包含 GET 和 POST 查詢 (第7.2.3款和第9款) .
    * 如果您將 Capability xml 要求傳送到一個SOS伺服器 (sourceUrl+ "? 服務=SOS要求( S)GetCapabilities") ,您會得到一個 xml 結果,其中包含一個站台清單和觀察器 他們有資料的屬性
    * Property是一種正式的URI指代物產。 例如,urn:ogc:phenomenon:經度:wgs84或 https://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
 
    * 財產不是變數
    * 不止一個變數可能有相同的觀察 屬性 (例如,Temp内外 可能都看到了 屬性 https://mmisw.org/ont/cf/parameter/air\\_temperature ) .
    * 如果您向一個SOS伺服器中,您可以得到一個 xml 結果,其中可以描述反應中的字段名稱、字段單位和資料。 字段名稱包括經度、 經度、 深度 (也許) 和時間。
    * 每dataVariable用于 EDD 表格SOS必須包含一個「 obsecret Property 」 屬性, 以辨識要從伺服器中取得變數的可觀性 。 常數dataVariables會列出同樣的合成觀察器 Property 。
    * 每一個的資料模式dataVariable伺服器可能沒有指定 。 如果有, 您必須查看伺服器的 XML 資料回覆, 並指定适当的 [&lt;資料Type&gt;s] (# 資料類型) 在ERDDAP™数据集dataVariable定义。
    *    (在寫作的時候) 一些SOS伺服器應答取得多個觀察要求 直接把第一個產品的結果還給我 (沒有錯誤訊息 。) 參數要求 觀察品質
* 從 EDD 表格SOS自動新增
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
到數據集建立時的全域屬性。
*   SOS伺服器通常表示[單位](#units)与[城市](https://unitsofmeasure.org/ucum.html)系統。 大部分ERDDAP™伺服器快件[UDUNITS](https://www.unidata.ucar.edu/software/udunits/)系統。 如果您需要轉換兩套系統, 您可以使用[ERDDAP將 UCUM 單位轉換成/ 從UDUNITS](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html).
#### 從 EDD 表格SOS骨架 XML{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### 來自垃圾的 EDD 表格{#eddtablefromthreddsfiles} 
[ **來自垃圾的 EDD 表格** ](#eddtablefromthreddsfiles)  (已贬值) 聚合數個變數的資料檔, 每個變數都有一個或多個共享的維度 (例如: 時間、高度 (深度) ,經度) ,由[土 石OPeNDAP伺服器](https://www.unidata.ucar.edu/software/tds/).

* 此數據集類型是 **已刪除** . 新的、更一般的解决方案是使用[快取 從 EDD Table 的 Url 選項 從檔案](#cachefromurl)  (或變體) ,它會提供遠端檔案的本地副本,並提供本地檔案的資料。 其&lt;FromUrl&gt; 選項可以使用任何類型的表格資料檔案, 來自任何公布類似目錄檔案清單的網路來源 。 **   
如果你因某种原因不能成功 那就發郵件給克里斯 約翰在諾亞戈夫
如果2020年之前沒有人抱怨,此數據集類型可能會被移除. ** 
* 我們強烈建議使用[產生達塔斯 Xml 程式](#generatedatasetsxml)作粗略的草案datasets.xml此數據集的區塊 。 然後你可以編輯它來調整它。
* 大多數情况下, 每個檔案都有最左邊的數值 (第一) 維度,例如時間
* 檔案常常 (但不必) 对其他維度有單一值 (例如,高度 (深度) ,經度) .
* 檔案可能有附加尺寸的字元變數 (例如,) .
* THREDDS 伺服器可以用 URL 中的 "/ thredds/" 表示 。 例如,
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* THREDDS 伺服器在不同的地方都有目錄 。 此類別要求網址包括「 / thredds/ catalog/ 」 。 您可以從根目錄的瀏覽器開始找到此變數, 然後點擊到想要的子目錄 。
* 此課目讀取 THREDDS 所服務的 catalog. xml 檔案, 以及清單&lt;目錄參考檔 &gt; (參考新增的 catalog.xml 子檔案) 和&lt;數據集&gt;s (資料檔案) .
* 其&lt;檔案Dir &gt; 設定被忽略 。 自從這課程下載 并做成每份遠端資料檔案的本地副本ERDDAP™強制檔案 想要是 *大家长會* 副本/副本 *datasetID* /.
* 為&lt;sourceUrl&gt;, 對 THREDDS 伺服器中的數據集使用 catalog.xml 檔案的網址, 例如 : 對此網址, 可以用於網頁瀏覽器 ,
     https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[2020-10-21 此伺服器已不可靠 。\\],
使用&lt;sourceUrl&gt; https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml &lt;/sourceUrl&gt;
     (但放在一行) .
* 由于此課程總是下載, 並且對每個遠端資料檔做本地複製, 您不該將此數據集包入[EDD 表格](#eddtablecopy).
* 此數據集類型支援了 OPTIONAL, 很少使用的, 特別的標籤,&lt;特殊模式 &gt; *模式* &lt;/ specialMode&gt; 可以指定要使用特殊的硬碼規則來決定從伺服器下載的檔案 。 目前唯一有效的 *模式* 是 SAMOS,它與數據集一起使用,來自 https://tds.coaps.fsu.edu/thredds/catalog/samos 只下載上一個版本的檔案。
* 看這班的超級[檔案中的 EDD 表格](#eddtablefromfiles),以了解本課如何運作和如何使用。
* 參考 1D, 2D, 3D, 4D 示例[NcFiles 的 EDD 表格](#eddtablefromncfiles).
     
### 從 EDD 表格WFS文件{#eddtablefromwfsfiles} 
[ **從 EDD 表格WFS文件** ](#eddtablefromwfsfiles)  (已刪除) 做一個本地複製所有資料ArcGIS映射伺服器WFS伺服器使數據能很快重新保存到ERDDAP™使用者。

* 您需要指定特定格式sourceUrl要說的全局屬性ERDDAP™如何要求伺服器的特性信息 。 請用此示例做樣本 :
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (但都放在一線) 
* 您需要新增一個特殊的全局屬性 。ERDDAP™如何辨識要下載的數據群的名稱 。 這可能會對所有 EDD Table 從WFS文件数据集 :
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* 由于此課程總是下載, 並且對每個遠端資料檔做本地複製, 您不該將此數據集包入[EDD 表格](#eddtablecopy).
* 看這班的超級[檔案中的 EDD 表格](#eddtablefromfiles),以了解這個課程是如何運作和如何使用。
     
### EDD 表格外加通道{#eddtableaggregaterows} 
[ **EDD 表格外加通道** ](#eddtableaggregaterows)可以從群組的「 小孩」 的 EDD Table 資料組建立 EDD Table 資料集 。

* 以下是 EDDTable Aggregate Rows 的一些用途:
    * 您可以從兩種不同的檔案或資料來源建立 EDDTableAggregateRows 資料集, 例如, 一個數據集, 上個月底之前儲存在其中.ncCF 檔案和有目前月數據的數據集儲存在關係資料庫中 。
    * 您可以做 EDTable AggregateRows 數據集來處理來源檔案的變更 (例如,時間格式變更,或變數名稱變更,或資料 類型/scale\\_factor/add\\_offset已更改) . 在這個情況下, 一個孩子會從變更前的檔案中获得數據, 另一个孩子會從變更後的檔案中获得數據 。 使用 EDTable AggregateRows 是替代使用的方法[NcML](#ncml-files)或[NCO](#netcdf-operators-nco). 除非檔名中有显著的功能( 這樣您就可以使用)&lt;檔案Name Regex&gt; 以決定哪個檔案屬於哪個子數據集, 您可能需要將兩個子數據集的檔案儲存在不同目錄中 。
    * 您可以做一個 EDDTable AggregateRows 數據集, 其中包含一個或多個類似但又不同的數據集的共享變數子集, 例如, 一個數據集, 它會從 Profile 數據集 、 TimeSeriesProfile 數據集 和 TrapriotoryProfile 數據集 的組合而成 。 (它們有一些不同的變數和一些共同的變數——在这种情况下,你必須為孩子的數據集做特殊的變數,只有共同的變數) .
    * 你可以有數個獨立的數據集 每個都有同樣的數據 但來自不同的站點 你可以讓這些數據集保持完整, 但也可以建立 EDDTableAggregateRows 數據集, 它有所有站台的數據 -- 每一個孩子數據集都可以簡單的[EDD 表格來自 Erddap](#eddfromerddap),指向已存在的一個站台數據集。 如果您這樣做, 請讓 EDD Table 從 Erddap 資料集中各一個不同的datasetID而不是原始的獨立數據集,例如,在原始資料中附加“Child”datasetID.
* 每個孩子&lt;數據集&gt; 指定必須是完整的數據集, 好像它是獨立的數據集 。 每個人都一樣[dataVariables](#datavariable),同序,同序[destinationNames](#destinationname),[資料 類型](#datatype),[missing\\_values](#missing_value),[填表](#missing_value)和[單位](#units). EDDTable AggregateRows 數據集的每個變數的中繼資料來自第一個子數據集中的變數, 但是 EDDTable AggregateRows 會更新此變數[actual\\_range](#actual_range)元数据是所有孩子的實際範圍。
* 建议: 把每個孩子的數據集做成獨立的數據集 然后試著剪切並貼上 EDDTable AggregateRows 資料集datasets.xml切入新 EDDTable 外加法門 行數據集。
* 數據集預設排序顺序... 子數據集的排序決定了結果的总体預設排序顺序 。 當然, 使用者可以通过附加( A) 來要求給定的一組結果的不同排序( O)orderBy (" *以逗號分隔的變數清單* ") 到他們的查詢結束。
* "源"[全球 屬性](#global-attributes)對 EDDTable AggregateRows 來說,是第一個子數據集的集成全球屬性。 EDD Table 外加門 行可以全局&lt;addAttributes&gt; 提供额外的全局屬性或覆蓋源全局屬性 。
####  EDD 表格外掛程式 行骨架 XML{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD 表格{#eddtablecopy} 
[ **EDD 表格** ](#eddtablecopy)可以在本地端复制許多類型的 EDDTable 数据集, 然后從本地端的複製中快速重新保存資料 。

* EDD 表格 (和格子數據,[EDDGrid复制](#eddgridcopy)) 非常容易使用,非常有效 **解決一些從遠端資料來源提供資料的最大問題:** 
    * 從遠端資料來源存取資料可能很慢 。
        * 它們可能很慢 因為它們本身很慢 (例如, 伺服器的低效類型) ,
        * 因為他們受過太多的請求,
        * 或因為您的伺服器或遠端伺服器的頻寬有限 。
    * 遠端數據集有時不可用 (再一次,有种种原因) .
    * 依靠一個來源來取得數據,不是很好 (例如,很多使用者和很多使用者ERDDAP利用它) .
         
* 如何工作- EDDTableCopy 解決這些問題,ERDDAP™很快就能提供本地副本的資料。 而制作和使用本地版可以减轻遠端伺服器的負擔. 本地副本是原件的備份,
    
做一個本地數據集的複製沒有什麼新發現。 新的是這個班級的成績\\*容易\\*建立和\\*維持\\*本地資料副本\\*品种\\*遠端資料來源的類型和\\*新增中繼資料\\*复制資料。
    
#### EDD 表格&lt;取自Url&gt; 的快取{#eddtablecopy-vs-cachefromurl} 
&lt;快取 FromUrl&gt; 是 EDDTable Copy 的替代程式 。 他們的工作不同

* EDD 表格 從遠端服務中索取數據並將這些數據儲存在本地檔案中, 以此複製工作 。 因此, EDDTable Copy 在有些情况下有用, 可通过遠端服務存取資料 。
* [&lt;快取自Url&gt;] (牧羊人) 下載遠端網站上列出的现有檔案。&lt;快取 FromUrl &gt; 更容易使用, 也更可靠, 因為它很容易分辨什麼時候有新的遠端資料檔, 或是什麼時候有遠端資料檔變更, 因此需要下載 。

如果有 EDD Table Copy 或&lt;可使用 Url &gt; 的快取, 使用&lt;快取 FromUrl &gt; , 因為它更容易更可靠 。
     
#### &lt;提取 名稱( gt;){#extractdestinationnames} 
EDD 表格 Copy 通過從遠端數據集中要求數據區域來製造本地的資料複製 。 EDD 表格 复制以要求區分來決定要要求的區塊( D) () 值&lt;提取目的地名稱 &gt; (指定于datasets.xml,见下文) ,是遠端數據集中以空間分隔的變數目的名稱。 例如,
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
可能會產生不同的值組合 漂流者=Tig17, profile=1017, 漂流者=Tig17, profile=1095,... 漂流者=une12, profile=1223, profile=une12, profile=1251...

在一列 (例如,配置文件) 可能是唯一地辨識一行數列數據所需要的所有資料, 如果有非常多的, 例如, 剖面描述檔, 可能也有必要指定另外的提取檔 。 目的地 姓名 (例如,漂流者) 以分解圖片 這會使給定目錄中的資料檔案减少, 可能會更快的存取 。
    
#### 本地檔案{#local-files} 
每塊數據被儲存在一個单独的NetCDF子目錄中的檔案 *大家长會* 副本/副本 *datasetID* / (按[設定. xml](/docs/server-admin/deploy-install#setupxml)) . 除了最後一個摘要Destination之外, 還有一個子目錄關卡Name 例如, tig17+1017 的資料會儲存在
     *大家长會* /副本/样本Dataset/tig17/1017.nc.
例如, une12+1251 的資料會儲存在
     *大家长會* /副本/样本Dataset/une12/1251.nc.
用數據值建立目錄與檔名已變更, 使其檔案名稱安全 (例如,空格被「 x20 」 取代) 這不影響實際資料
     
#### 新資料{#new-data} 
每次EDD表 复制已重新載入, 它檢查遠端數據集, 以查看可用的區塊 。 如果一塊資料的檔案已不存在, 取得塊的要求會被加入到隊列中 。ERDDAP工作串列處理所有排隊的數據要求, 逐一 。 您可以看到工作串列的活動[狀態](/docs/server-admin/additional-information#status-page)和在[每日報告](/docs/server-admin/additional-information#daily-report). (是的ERDDAP™可以為此行程指派多項工作, 但會使用遠端資料來源的帶寬、 內存、 CPU 時間, 以及很多本地端ERDDAP帶寬、記憶和CPU時間,) 
    
注:EDDTable Copy第一次加載, (如果一切順利) 工作串列中會加入很多對數據區塊的要求, 但沒有建立本地資料檔 。 所以建構器會失敗, 但工作Thread會繼續工作並建立本地檔案 。 如果一切順利, 專案Thread 會做一些本地端的資料檔, 以及下次重新載入數據集的試圖 (在~15分鐘內) 但起初數據有限。
    
注:在本地数据集有某些數據并出現在您的ERDDAP, 如果遠端數據集暂时或永久無法存取, 本地數據集仍會工作 。
    
警告: 如果遠端數據集是大和/或遠端伺服器慢 (這就是問題所在,不是嗎?) 需要很長的時間才能完成本地版的复制 在某些情况下,所需时间是不可接受的。 例如, 在 T1 線上傳送 1 TB 資料 (0.15 GB/s) 在最佳条件下至少需要60天。 此外,它在遠端和本地電腦上使用了很多帶寬、記憶體和CPU時間。 解答方式是將硬碟寄給遠端數據集的管理員, 以便 s/ he 可以將數據集的複製本寄回給您 。 以此資料為起始點, EDDTableCopy 會加入資料 。 (亞馬遜的EC2Cloud服務也曾如此處理問題,) 
    
警告 : 如果數值的組合從遠端數據集中消失, EDDTableCopy 不刪除本地端複製的檔案 。 如果你想的話 你可以自己刪除
    
#### 表格&lt;檢查來源Data&gt;{#tablecopy-checksourcedata} 
其datasets.xml此數據集可以有可選的標籤
```
    <checkSourceData>true</checkSourceData>  
```
預設值是真實的 。 如果/ 當您設定它為不正確時, 數據集將永遠不會檢查來源數據集, 看看是否有其他資料可用 。
     
#### 推荐使用{#recommended-use} 
1. 建立&lt;数据集 &gt; 項目 (原生型態, 不是 EDDTable Copy) 遠端資料來源。 **讓它正常工作 包括所有想要的中繼資料** 
2. 如果速度太慢, 請加入 XML 代碼, 將它包裝在 EDDTableCopy 數據庫中 。
    * 使用不同的datasetID  (也許可以改變datasetID古老的datasetID稍稍) .
    * 复制&lt;可存取 至 &gt;,&lt;重新載入 EveryNminutes &gt; 及&lt;從遠端 EDD Table 的 XML 到 EDDTable Copy 的 XML 。 (它們對 EDDTable Copy 物质的數值; 對內部數據集的數值無關緊要 。) 
    * 建立&lt;提取 Destination Names &gt; 標籤 (见上文) .
    *   &lt;命令ExtractBy&gt; 是遠端數據庫中一個 OPTIONAL 空間分隔的目的地變數名稱列表 。 當從遠端伺服器下載每塊數據時, 會按這些變數排序 (由第一個變數,然后如果第一個變數是捆綁的,由第二个變數,...) . 在某些情况下,ERDDAP™如果清單中的第一个變數是數字變數, 就能更快地從本地資料檔中提取資料 ("time"算作數值變數) . 但選擇這些變數的方式符合數據集 。
3.  ERDDAP™會做並維持當地的數據副本。
         
* 警告: EDDTable Copy 假設每個區塊的數值永遠不會變化 。 如果/ 當他們做了, 您需要手動刪除 。 *大家长會* 副本/副本 *datasetID* 改變和[旗號](/docs/server-admin/additional-information#flag)重新載入的數據集, 讓已刪除的區塊被取代 。 如果您對數據集有電子郵件訂閱, 您會收到兩封電子郵件: 一是數據集第一次重新載入並開始複製數據, 一是再次載入數據集時。 (自動) 并偵測新的本地端資料檔。
     
* 變更中繼資料 -- 如果你需要改變任何addAttributes或變更與來源數據集相關的變數的順序 :
    1. 更改addAttributes原始数据集datasets.xml依需要。
    2. 刪除已复制的檔案 。
    3. 設定[旗號](/docs/server-admin/additional-information#flag)以立即重新載入數據集。 如果您真的使用國旗並有電子郵件訂閱數據集, 您會收到兩封電子郵件: 一是數據集第一次重新載入並開始複製數據, 一是再次載入數據集 (自動) 并偵測新的本地端資料檔。
    4. 已刪除的檔案將與新中繼資料重生 。 如果來源數據集不可用, EDDTableCopy 數據集將會從重新產生的檔案中获得中繼資料, 因為它是最年輕的檔案 。
         
*   [EDDGrid复制](#eddgridcopy)和 EDDTable Copy 非常相似, 但使用網格化的數據集 。
#### EDD Table 套件主題 XML{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- - –

## 細節{#details-1} 

以下是常见標籤與屬性的详细描述 。

### &lt;角形Degree Units&gt; 磁碟{#angulardegreeunits} 
* [ ** &lt;角化元件 &gt; ** [ [ ] ] (#角度单位) 在一個&lt;erddapDatasets &gt; 標籤datasets.xml它包含以逗號分隔的單位字串列表ERDDAP™應視為角度單位 。 如果變數有這些單位之一tabledap是orderByMean滤波器會以特殊方式計算平均值, 然後報告平均值為 -180 到 180 的值 。 看ERDDAP目前預設清單的 EDStatic.java 源碼檔 。 此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag).
### &lt;角化DegreeTrue Units & gt; 磁碟{#angulardegreetrueunits} 
* [ ** &lt;角形 程度單位 &gt; ** [ [ ] ] (# 角度真人) 在一個&lt;erddapDatasets &gt; 標籤datasets.xml它包含以逗號分隔的單位字串列表ERDDAP™應視為角度真單位 。 如果變數有這些單位之一tabledap是orderByMean過程器會以特殊方式計算平均值, 然後報告平均值為 0 到 360 的值 。 看ERDDAP目前預設清單的 EDStatic. java 來源檔案 。 此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag).
     
### &lt;普通標準名稱 & gt;{#commonstandardnames} 
* [ ** &lt;普通标准名稱 &gt; ** [ [ ] ] (共同標準名稱) 在一個&lt;erddapDatasets &gt; 標籤datasets.xml指定以逗號分隔的普通列表[CF 標準名稱](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). 例如,
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
此列表在 Data ProviderForm3. html 中用作使用者的方便 。
如果您要提供此資訊datasets.xml,從复制目前的缺省清單開始&lt;通用標準名稱 &gt;  inERDDAP是
\\[湯姆卡\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml檔案.
     
### &lt;缓存Minutes & gt;{#cacheminutes} 
* [ ** &lt;缓存最小值 &gt; ** [ [ ] ] (&#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;) 在一個&lt;erddapDatasets &gt; 標籤datasets.xml指定年齡 (分鐘) 要刪除快取中的檔案 (缺省=60) . 例如,
```
    <cacheMinutes>60</cacheMinutes>  
```
一般只有影像文件 (因為同樣的影像常被反复要求) 和.nc文件 (因為它們在寄給使用者前必須完整建立) 已儲存。 但這不是真的。 例如,atabledap包含時間的要求 &gt; *一些 時間* 當新的數據到來時會變更 。 以及包含\\[上次\\]當新的數據到來時, 時間維度會變化。 此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag). 之前ERDDAP™v2. 00, 這在 setup. xml 中被指定, 仍然允許使用, 但被抑制 。
     
### &lt;轉換 Polticate RequestCvexample & gt;{#convertinterpolaterequestcsvexample} 
* [ ** &lt;轉換 Polticate RequestCvexample &gt; ** [ [ ] ] (# 轉換通訊器 要求cxample) 是在&lt;erddapDatasets &gt; 標籤datasets.xml \\[始于ERDDAP™v2.10\\]包含一個在 Interpoate 轉換器的網頁上顯示的示例。 預設值為: jplMURSST41/分析sst/Bilinear/4。
### &lt;轉換 PolitogateDatasetIDVariableList & gt;{#convertinterpolatedatasetidvariablelist} 
* [ ** &lt;轉換 PolitogateDatasetIDVariable列表 &gt; ** [ [ ] ] (#轉換插件 數據集變化列表) 是在&lt;erddapDatasets &gt; 標籤datasets.xml \\[始于ERDDAP™v2.10\\]包含 CSV 列表datasetID可變 使用 Interpoate 轉換器網頁的建議示例 。 預設值為: jplMURSST41/分析sst.
### &lt;轉換到 Public SourceUrl & gt;{#converttopublicsourceurl} 
* [ ** &lt;轉換到 Public SourceUrl &gt; ** [ [ ] ] (#轉換到公用源碼器) 是在&lt;erddapDatasets &gt; 標籤datasets.xml它包含一個「 從」 和「 到」 屬性, 指定如何轉換匹配的本地sourceUrl  (通常為 IP 號碼) 公開sourceUrl  (域名) . . . .\\[某事\\]//\\[某事\\]/". 這些標籤可以有 0 或更多 。 更多信息参见[&lt;sourceUrl&gt;] (# 源碼) . 例如,
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
會產生匹配的本地端sourceUrl  (例如 https://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day )   
公開sourceUrl  ( https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day ) .
此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag).

但出于安全原因和訂閱系統的原因 **不要用這玩意&#33;**   
相反,在&lt;sourceUrl&gt; 標籤與使用[/etc/hosts 表格](https://linux.die.net/man/5/hosts)在您的伺服器上轉換本地域名為 IP 數字而不使用 DNS 伺服器。 您可以使用 :
 p *一些域名*   
     
### 資料:影像/png;base64,{#dataimagepngbase64} 
* 當使用者要求.htmlTable答复ERDDAP™,如果 String 儲存格中的資料包含數據:image/png;base64,然后是已編碼的 .png 影像,ERDDAP™顯示圖示 (讓使用者看到圖片,如果它們在它上面徘徊) 並按鍵儲存文字或影像到剪貼板。 此特性新增于ERDDAP™V2.19 由馬爾科·阿爾巴主演.
### drawLandMask {#drawlandmask} 
*   [ **drawLandMask** ](#drawlandmask)指定預設的設定值, 用于控制 landmask 何时及如何绘制ERDDAP™畫地圖 。 可在datasets.xml  (從最低优先级列表至最高优先級) :
    
    1. 如果drawLandMask指定于&lt;erddapDatasets &gt; (沒有與任何特定的數據集連接) ,然后指定drawLandMask所有數據集中的所有變數。 例如,
    ```
        <drawLandMask>under</drawLandMask>  
    ```
此標籤值的任何變更將在下次生效ERDDAP已讀datasets.xml.
如果此標籤不存在, 下方的默认值 。
         
    2. 如果drawLandMask指定為給定數據集的全局屬性,然後指定預設值drawLandMask數據集中的所有變數, 超越任何低优先级設定 。 例如,
    ```
        <att name="drawLandMask">under</att>  
    ```
此標籤值的任何變更將在下次生效ERDDAP™重新載入數據集 。
         
    3. 如果drawLandMask在給定的數據集中指定為變數的屬性,然後指定預設值drawLandMask在數據集裡的變數, 超越任何更低优先的設定。 例如,
    ```
        <att name="drawLandMask">under</att>  
    ```
此標籤值的任何變更將在下次生效ERDDAP™重新載入數據集 。
    
使用者可以超過預設 (在任何指定的地方) 從數據集 Make A Graph 網頁的下載清單中選取「 Draw Land mask」 的值, 或是包含 &. *值* 在要求地圖的網址中ERDDAP.
    
在所有情況下, 屬性可能有4個值:
    
    * 在地圖上提取數據前, 「地下」 畫出地表 。
地表呈常見的浅灰色顏色。
在表格數據中,
    * "完"... 在網格化的數據集中, "over" 畫出在地圖上的數據後, 以遮蓋任何在陸地上的資料 。 在表格數據集中, "over" 顯示了海洋的深度,
    * 「外線」只是畫出陸地表、政治界限、湖泊和河流的圖示。
    * "關"什么也不畫
### &lt;電子郵件解析器 ToErdData & gt;{#emaildiagnosticstoerddata} 
* [ ** &lt;電子郵件解析器 ToERData &gt; ** [ [ ] ] (# 電子郵件解析器數據) 在一個&lt;erddapDatasets &gt; 標籤datasets.xml. 標籤的值可以是真的 (默认) 或是假的 如果是真的ERDDAP™會發郵件給克里斯 諾亞的約翰 政府 (该ERDDAP™發展团队) . 這應該是安全的 因為沒有保密信息 (例如,要求) 包含在郵件中。 這將可以捕捉到任何 無意之中的不明蟲 導致NullPointer Exceptions。 不然,使用者看例外,但ERDDAP™開發隊沒有 (所以我們不知道有什麼問題需要解決) .
     
### &lt;圖片背景顏色與gt;{#graphbackgroundcolor} 
* [ ** &lt;圖片背景顏色 &gt; ** [ [ ] ] (# 圖片背景顏色) 在一個&lt;erddapDatasets &gt; 標籤datasets.xml指定圖中的預設背景顏色。 這幾乎影響了所有的圖 有一些情況沒有受到影響。 顏色在 0xAARRGGB 格式中指定為 8 位數的十六進位值, 其中 AA, RR, GG, 和 BB 分别为不透明度, 紅色, 綠色和藍色 。 "0x"是大小寫敏感,但十六進位數字不是小寫敏感。 例如,完全不透明 (ff) 綠色 紅色=22、綠色=88、藍色=0xff2288ee。 不透明白色是0xffffff. 假設是不透明的淡藍色 (0xffccff 中) , 其优点是與白色不同, 例如,
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag).
### &lt;ipAddressMax 要求 & gt;{#ipaddressmaxrequests} 
* [ ** &lt;ipAddressMax 要求 &gt; ** [ [ ] ] (#ipesmax 要求) 是很少使用的可選用標籤 (最先支持的是ERDDAP™v2.12) 在&lt;erddapDatasets &gt; 標籤datasets.xml以限制過份強烈的合法使用者和恶意使用者的能力, ipAddress (日文) 最大要求指定從任何特定 IP 位址接受的同步要求的最大數量 。 其他要求會收到 HTTP 429 錯誤: 要求太多 。 erddap/ download/ 和 erddap/ images/ 的小型靜態檔案不豁免此計數 。 缺省是15元. 最高限量是1000,太高了,別這樣&#33;ERDDAP™因許多合法使用者, (尤其是網頁瀏覽器和WMS客戶端) 一次共6次 其ERDDAP™每日報告和寫給log.txt 檔案的類似資訊, 每一個主要數據集重載, 現在會包含這些 IP 位址在 "requester's IP 地址下的要求的清點 (要求太多) ".
此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag).
    
狀態. html 的「 主要載入Datasets Time Series 」 部分包含一列「 TooMany 」 , 列出逾過使用者 ipAddressMax 要求設定的要求數量, 从而看到「 太多要求」 錯誤 。 讓您輕鬆地看到當有活動性過強的合法使用者與惡毒使用者時, (可選擇) 查看 log. txt 檔案, 決定是否要列出使用者黑名單 。
    
沒有什麼特別的錯誤 把它設為更高的數字。 由你決定 卻沒有任何回應, 認為自己所做的並沒有獲得任何利益。
### &lt;ipAddressMax 要求動畫 & gt;{#ipaddressmaxrequestsactive} 
* [ ** &lt;ipAddressMax 要求動畫 &gt; ** [ [ ] ] (# ipdesignmax 要求作用中) 是很少使用的可選用標籤 (最先支持的是ERDDAP™v2.12) 在&lt;erddapDatasets &gt; 標籤datasets.xml以限制過份強烈的合法使用者和恶意使用者的能力, ipAddressMax RequestsActive 指定從任何特定的 IP 位址要积极處理的同步要求的最大數量 。 其他的請求將排成一排,直到之前的請求被處理。 erddap/ download/ 和 erddap/ images/ Are 中小的、靜態的檔案豁免此數量和相關的節奏 。 缺省值是 2 。 最多100,太高了,別這樣&#33; 尤其當你對過份強烈或惡毒的使用者有問題時, 使用者仍會很快得到他們要求的所有資料 (至 ipAddressMax 要求) 但他們無法捕捉到系統資源 我們不建議把這個設計成大數目, 因為它讓過份強烈的合法用戶和惡毒用戶主导。ERDDAP是處理能力
此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag).
     
### &lt;ipAddress 無限制 & gt;{#ipaddressunlimited} 
* [ ** &lt;ipAddress 不限制 &gt; ** [ [ ] ] (#ipadition 無限制) 是很少使用的可選用標籤 (最先支持的是ERDDAP™v2.12) 在&lt;erddapDatasets &gt; 標籤datasets.xml以限制過份強烈的合法使用者和恶意使用者的能力, ipAddress Unlimited 是一份以逗號分隔的 IP 位址清單, 您想要允許無限制地存取您的 IP 位址ERDDAP. 看看你的日志。 txt 檔案以查看您的伺服器對 IP 位址使用哪种格式 。 在一些伺服器上, IP 位址會以格式 #. (其中 # 是 0 到 255 的整數) 而其他人則會在格式上:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#:#: . 此清單中的要求者不受 ipAddressMax 要求或 ipAddressMax 要求的設定 。 這可能是次數ERDDAP™或為您的系統中的某些使用者或伺服器。ERDDAP™常加 " (未知的 IP 地址) ",其中ERDDAP™用于無法确定要求者的 IP 位址, 例如, 用于在同一伺服器上執行的其他行程 。
此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag).
    
如果由于某种原因, 使用者的所有要求都得到錯誤訊息「 等您其他要求處理的時間出來 」 , 那麼您可以將使用者的 IP 位址加入 ipAddressUnlimited 清單, 应用此變更, 然后從清單中移除 。
    
### &lt;載入 Datasets minmites & gt;{#loaddatasetsminminutes} 
* [ ** &lt;載入 Datasets minutes &gt; ** [ [ ] ] (# 載入數據集分鐘) 在一個&lt;erddapDatasets &gt; 標籤datasets.xml指定最小時間 (分鐘) 在主要載入之間 數據集 (何时ERDDAP™重新處理datasets.xml,包括檢查每個數據集,看看是否需要按照重新載入 每一個NMinute 設定, 預設值= 15) . 例如,
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
如果給定的載荷Dataset需要比這次少一點, 載荷者只會反复查看旗下目錄和/或睡眠, 直到剩下的時間結束。 假設是15分鐘 幾乎所有人都可以 唯一的缺点是它會增加频率ERDDAP™重試有錯誤的數據集使其無法載入 (例如, 遠端伺服器已下載) . 數據來源可能會認為是侵襲性行為。 此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag). 之前ERDDAP™v2. 00, 這在 setup. xml 中被指定, 仍然允許使用, 但被抑制 。
     
### &lt;載入 DatasetsMaxMinutes & gt; 中{#loaddatasetsmaxminutes} 
* [ ** &lt;載入DatasetsMaxMinutes &gt; ** [ [ ] ] (# 載入數據集max分鐘) 是在&lt;erddapDatasets &gt; 標籤datasets.xml指定最大時間 (分鐘) 一大负荷 允許使用數據集 (在載入前 數據集線程被視為「 已安裝」 , 已中斷)   (缺省=60) . 例如,
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
總的來說, 只要您合理認為重新載入所有數據集, 這至少應該被設定為兩倍 (累计) 應該拿 (因為電腦和網路有時比預期慢) 這總比裝滿DatasetsMinmites要長得多 缺省是60分鐘。 有人會把這安排得更久 此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag). 之前ERDDAP™v2. 00, 這在 setup. xml 中被指定, 仍然允許使用, 但被抑制 。
     
### &lt;log Level( gt; ){#loglevel} 
* [ ** &lt;日志水平 &gt; ** [ [ ] ] (# 日志) 是在&lt;erddapDatasets &gt; 標籤datasets.xml指定 log.txt 檔案中會收到多少批評信件。 可以設置為"警告" (最少的消息) 信息 (默认) 或全部 (大部分消息) . 例如,
```
    <logLevel>info</logLevel>  
```
此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag). 之前ERDDAP™v2. 00, 這在 setup. xml 中被指定, 仍然允許使用, 但被抑制 。
     
### &lt;部分要求MaxBytes & gt; 和&lt;部分要求 MaxCells & gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [ ** &lt;部分要求MaxBytes &gt; **[ [ ] ] (部分要求字节和部分要求) 并 [** &lt;部分要求MaxCells &gt; ** [ [ ] ] (部分要求字节和部分要求) 很少使用 OPTIONAL 標籤&lt;erddapDatasets &gt; 標籤datasets.xml. 可能时 (也不可能) ,ERDDAP™將大數據要求分解成塊以保存記憶體 。
    
32 位Java,在簡化的意義上,最大同時數量 *大* 要求约为可用的內存的 3/4 (傳送至Tomcat的 Xmx 值) 除以區塊大小 (例如, 1200 MB / 100 MB 的 12 個要求) . 其他的事情需要記憶,所以要求的實際數量會减少. 實際上,區塊不是總是可能的 因此,一個巨大的或數個非常大的 同时不可滿足的請求 會造成32位的問題Java.

有64位Java,Xmx值可以大得多。 所以記憶力的可能性就小得多了

您可以在其中定義這些標籤, 以取代預設的區塊大小datasets.xml  (值與在此顯示的不同) :
网格 :&lt;部分要求MaxBytes &gt; 1000000000&lt;/ 部分要求MaxBytes &gt;
表格 :&lt;部分要求MaxCells &gt; 1000000&lt;/ 部分要求

部分要求 MaxBytes 是部分網格資料要求的首選字節數 (a 占全部要求的區塊) . 預設值 = 100 000 000 (10\\8) . 越大越好 (不要超過500 MB 因為那是THREDDS的預設限制DAP答复) . 但更大的大小可能需要更少的檔案存取 (想想ERD每個時點的衛星數據在一個单独的檔案中 - 最好從每個部分要求的檔案中取得更多的數據) .

部分請求MaxCells 是首選的儲存格最大數量 (nROWS Q 資料表格中的 n collums) 部分表格 (a 占全部要求的區塊) . 默认值 = 100 000。 更大的尺寸不一定更好。 導致更久的等待,

此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag). 之前ERDDAP™v2. 00, 這些在設定值. xml 中指定, 仍然被允許, 但被抑制 。
     
### &lt;要求 Blacklist & gt;{#requestblacklist} 
* [ ** &lt;要求黑色列表 &gt; ** [ [ ] ] (要求黑名單)  [是 opitional 標籤](/docs/server-admin/additional-information#frequent-crashes-or-freezes)在&lt;erddapDatasets &gt; 標籤datasets.xml包含以逗號分隔的 IP 位址列表, 會被列入黑名單 。 此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag).
    * 可以用來抵擋[拒服兵役](https://en.wikipedia.org/wiki/Denial_of_service)過份熱情[網頁機器人](https://en.wikipedia.org/wiki/Internet_bot),或者其他有問題的使用者。
    * 麻煩的使用者... 如果ERDDAP™原因常常是一個不方便的使用者, 一次執行不止一個文稿, 以及(或)提出大量超大、極低效或無效的要求, 看里面[log.txt](/docs/server-admin/additional-information#log)以查看是否如此, 并找到問題使用者的 IP 位址 。 如果有問題, 您可能應該列出使用者的黑名單 。
        
什麼時候ERDDAP™從黑名單的 IP 位址得到要求, 它會傳回 HTTP Error 403: 禁止 。 附上的文字錯誤訊息會鼓勵使用者發送您, theERDDAP管理員,去解決問題 如果他們花時間讀取錯誤訊息 (很多人顯然沒有) 你可以和他們合作 一次只執行一個腳本 提出更有效率的要求 解決他們腳本中的問題 (例如, 要求遠端數據集的數據, 無法在時間到期前回應) 或者其他什麼都是麻煩的根源
        
使用者往往不曉得自己的要求很麻煩。 他們常常不知道蟲子、效率低劣, 他們經常這樣想 因為你的...ERDDAP™提供免費資料, 讓他們可以隨心所欲地索取多少資料, 例如, 執行多個文稿或同步使用多個線程 。
        
        * 你可以跟他們解釋ERDDAP™現在不管有多大 有多強大 有有限的資源 (CPU時間,硬碟 I/O,網路帶宽等.) 如果一個使用者要求數據的方式將其他使用者或負擔過重,那就不公平了ERDDAP.
        * 一旦使用者知道如何提出兩項同時要求, 這就像非對稱戰: 這裡,攻擊武器有巨大的優勢 (零成本) 在防御武器之上 (具有实际成本的有限安裝) .
        * 這些要求更进一步阻擋了其他使用者的要求;
        * 提醒他們還有其他使用者 (隨機使用者和其他執行文稿的使用者) 所以他們不應該把他們都吃掉ERDDAP資源
        * 指出科技巨頭已引發使用者期待網路服務提供無限資源。 雖然有辦法建立[网格/群組/ERDDAPs](/docs/server-admin/scaling)制作ERDDAP™大部分ERDDAP™行政官沒有錢或人力建立這種系統, 在ERD例如,有一個人 (我) 寫入ERDDAP™管理ERDDAPs (在我老板的幫助下) ,并管理數個數據源,所有資源的年硬件預算為 0美元 (我們靠不定期的資金來付錢) . 這可不是Google、Facebook、Amazon等有100位工程師, 我們不能只是搬家ERDDAP™例如亞馬遜AWS, 因為數據儲存成本很大, 數據傳輸費也很大,
        * 我對使用者的請求是: 對不敏感時間的要求 (這是目前最普通的案例) 他們的系統應該一次提出一個要求 如果要求有時敏感 (例如,網頁上的多個.pngs,多塊瓦片表示aWMS客戶端等) ,那么可能4次同步要求應該是最大 (只是很短時間) .
        * 如果您向使用者解釋了情況, 大部分使用者會理解并愿意做出必要的修改, 以便從黑名單上移除他們的IP地址 。
             
    * 要列出黑名單使用者, 請在 IP 位址的逗號分隔清單中加入他們的 IP 位址&lt;要求黑色列表&gt;datasets.xml文件。 要找到麻煩的使用者的 IP 地址,請查看ERDDAP™  *大家长會* /logs/log.txt 檔案 ( *大家长會* 指定于[設定. xml](/docs/server-admin/deploy-install#setupxml)) 看看是否如此,并找到使用者的IP地址。 每一份要求的IP地址都列于從「% 123;% 123;% 123;% 123;#」開始的行線上, 搜尋「 錯誤 」 會幫助您找到無效的要求等問題 。
    * 您也可以將 IP 位址中最後的數字取代為\\*(例如,202.109.200。)\\*)屏蔽一系列IP地址,0-255.
    * 您也可以將 IP 位址中的最后 2 個數字取代為\\*.\\*  (例如,121.204。\\*.\\*) 以封鎖更廣的IP地址 0 -255.0 -255.
    * 例如,
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * 你不需要重新啟動ERDDAP™更改&lt;要求 Blacklist &gt; 生效。 變更將在下次被檢測ERDDAP™檢查是否需要重新載入任何數據集 。 或者,你可以加快行程 通过訪問一個[設定數據集 標籤網址](/docs/server-admin/additional-information#set-dataset-flag)任何数据集。
    * 你的ERDDAP™每日報告中包含最活動的被允許和被封鎖的請求者清單 。
    * 如果您想弄清楚哪個域名/ 機構與數位 IP 位址相關, 您可以使用自由反轉的 DNS 網頁服務 。[ https://network-tools.com/ ](https://network-tools.com/).
    * 可能會有時候在更高層級封鎖某些使用者, 例如,你可以阻止他們存取您的伺服器上的所有資料, 不只是ERDDAP. 在 Linux 上, 使用的方法之一是[平板](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/). 例如,您可以加入一個規則, 以命令阻擋所有從198.51.10.0來的東西
ipbables - I INPUT - s 198.51.10.0 -DROP
       
### &lt;慢的拖曳Millis & gt;{#slowdowntroublemillis} 
* [ ** &lt;慢點 : ** [ [ ] ] (慢慢往下走) 在一個&lt;erddapDatasets &gt; 標籤datasets.xml它包含指定毫秒數的整數 (預設值=1000) 在應答所有失敗的請求時暫停, 例如, 未知的數據集, 要求太大, 黑名單上的使用者 。 例如,
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
如果一個文稿接著提出一個要求, 那麼它可能會很快地提出一個壞要求。 使用此設定可以減慢失敗的文稿ERDDAP™沒有被壞的要求淹沒 如果一個人類提出壞的要求 他們甚至不會注意到這個延遲 推荐:
    
    * 如果麻煩是分配的拒絕服務 (DDOS 命令) 從100+攻擊者攻擊, 設定為小數 (100?) . 讓它們都慢了太久 導致太多的線索
    * 如果問題來自1 -10 個來源, 請設定為 1000 ms (默认) 但數量更大 (一万) 也合理 這會拖慢他們 所以他們會少浪費網路資源 而且1000毫秒左右不會激怒 提出壞要求的人類使用者
    
此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag).
     
### &lt;訂閱電子郵件Blacklist&gt;{#subscriptionemailblacklist} 
* [ ** &lt;訂閱 電子郵件黑清單 &gt; ** [ [ ] ] (# 訂閱電子郵件黑名單) 在一個&lt;erddapDatasets &gt; 標籤datasets.xml它包含一個以逗號分隔的電子郵件位址列表,這些位址立即被黑名列其中[订阅系统](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)例如,
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
這是一個對案件不敏感的系統。 如果此清單新增了電子郵件位址, 如果電子郵件位址有訂閱, 訂閱會被取消 。 如果清單上的電子郵件地址試圖訂閱, 此要求將被拒絕 。 此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag).
     
### 標準文字{#standard-text} 
*   [ **標準文字** ](#standard-text)-- 有一些 OPTIONAL 標籤 (很少使用) 在&lt;erddapDatasets &gt; 標籤datasets.xml指定在ERDDAP. 如果您要變更預設的文字, 請從同名標籤中复制現有的值 。
     *湯姆卡* /webapps/erddap/WEB-INF/ classes/gov/noaa/pfel/erddap/usil.messages.xml 成datasets.xml,然后修改内容。 它們的优点是datasets.xml您可以在任何時間指定新的值, 即使當ERDDAP™正在執行中。 這些標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag). 標籤名稱描述其目的, 但是在信件. xml 中可以看到預設的內容, 以便更深入的理解 。
    
    *   &lt;標準License &gt;
    *   &lt;標準連接點 &gt;
    *   &lt;標準DataLicenses &gt;
    *   &lt;標準免名
    *   &lt;標準排除外部連結&gt;
    *   &lt;標準通用免名檔 &gt;
    *   &lt;標準 私生活政策 &gt;
    *   &lt;啟動頭部Html5&gt;
    *   &lt;start BodyHtml5 &gt; 是需要變更的好標籤, 以便自訂您每個網頁的頂端的外觀ERDDAP. 特別是,您可以使用它來方便地在其中新增一個暫時訊息ERDDAP™主頁 (例如, "檢查新的 JPL MUR SST v4.1 數據集..." 或 "這個"ERDDAP™2019-05-08T17:00 PDT通到2019-05-08T20:00 PDT") . 把這個標籤放進去datasets.xml即:當您重新啟動ERDDAP第一個要求ERDDAP™將返回預設的啟動 bodyHtml5 HTML, 但之後的每個要求都會使用在 BodyHtml5 HTML 中指定的啟動datasets.xml.
    *   &lt;描述 Html&gt; 是更改的好標籤, 以便自訂您的描述ERDDAP. 注意您可以輕易更改此項, 在主頁上新增暫時訊息 (例如: "這個...ERDDAP™2019-05-08T17:00 PDT通到2019-05-08T20:00 PDT") .
    *   &lt;尾端BodyHtml5&gt;
    
      
之前ERDDAP™v2. 00, 這些在設定值. xml 中指定, 仍然被允許, 但被抑制 。
     
### &lt;非常 活動 & gt;{#unusualactivity} 
* [ ** &lt;非常動性 &gt; ** [ [ ] ] (不同寻常) 在一個&lt;erddapDatasets &gt; 標籤datasets.xml以指定 loadDatasets 兩首列次之間的 最大要求數量, 以視為正常 (預設值=1000) . 如果超出此數字, 便會發送電子郵件至 Email Everything To (按設定值. xml 指定) . 例如,
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag). 之前ERDDAP™v2. 00, 這在 setup. xml 中被指定, 仍然允許使用, 但被抑制 。
     
### &lt;更新 MaxEvents & gt;{#updatemaxevents} 
* [ ** &lt;更新MaxEvents &gt; ** [ [ ] ] (更新最大事件) 在一個&lt;erddapDatasets &gt; 標籤datasets.xml指定檔案變更事件的最大數量 (缺省=10) 由[&lt;更新 EveryNMILIS &gt; (# 更新每個人 #) 在切換到重新載入数据集之前的系統。 例如,
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
更新EveryNMILIs系統, 如果有很多檔案變更事件, 那么大概它不能快速執行, 所以它要求重新載入數據集 。 如果你ERDDAP™處理必須更新的數據集, 即使數據檔數量有變更, 您可以設定為大數值 。 (100?) .

### &lt;使用者( gt;){#user} 
* [ ** &lt;使用者 &gt; ** [ [ ] ] (#使用者#) 是在&lt;erddapDatasets &gt; 標籤datasets.xml表示使用者名稱、密碼 (如果認證=自訂) 角色 (逗號分隔列表) . 使用者名稱和密碼的用法因[]的值而略有不同。&lt;認證 &gt;] (/docs/server-admin/ 附加信息#校正) 在您的ERDDAP已設定. xml 檔案 。
    * 這是一部分ERDDAP是[安保制度](/docs/server-admin/additional-information#security)限制某些使用者存取一些数据集。
    * 分開吧&lt;使用者 &gt; 標籤。 選擇性地, 如果認證=oaut2, 您可以設定兩個&lt;使用者 &gt; 每個使用者的標籤: 使用者登入時的一個 Google(Google),
    * 如果沒有&lt;user &gt; 標籤, s/he 只能存取公開數據集, 即沒有 [] 的數據集 。&lt;可存取到 &gt;] (# 无障碍) 标记。
    * 使用者名稱
使用者名稱通常由字母、數字、下調和時期組合。
使用者名稱是使用者的電子郵件地址 。 可能是任何電子郵件地址
对于認證=google,使用者名稱是使用者的完整Google電子地址. 包括谷歌管理的帳戶@noaa.gov帳戶。
對認證=orcid,使用者名稱是使用者的 Orcid 帳號 (有破折號) .
校對:Soup (有破折號) .
    * 密碼
認證=email, google, orcid, 或 oauth2, 不要指定密碼屬性 。
您必須為每個使用者指定密碼屬性 。
        * 使用者輸入的密碼對大小寫敏感, 必須有8個或更多字元, 所以更難破解 。 使用AWS的電腦群組,ERDDAP™只在使用者試圖登入( 而不是當&lt;使用者&gt; 標籤正在處理中, 因為密碼只看到密碼的散列文摘, 而不是普通文字密碼 。
        * 設定. xml 的&lt;密碼編碼 &gt; 決定密碼如何儲存在&lt;使用者 &gt; 標籤datasets.xml. 為了增加安全性,有以下選擇:
            *   [MD5 :](https://en.wikipedia.org/wiki/MD5)  (不要用這個&#33;) - 对于密碼屬性, 請指定使用者密碼的 MD5 散列摘要 。
            * UEPMD 5 (不要用這個&#33;) -- 对于密碼屬性, 指定 MD5 散列文摘 *使用者名稱* :ERDDAP: *密碼* . 使用者名稱與 "ERDDAP" 用于[鹽](https://en.wikipedia.org/wiki/Salt_(cryptography)散列值,使解碼更難。
            *   [SHA256](https://en.wikipedia.org/wiki/SHA-2)  (未推荐) - 对于密碼屬性, 請指定使用者密碼的 SHA-256 散列文摘 。
            * 烏帕沙256 (默认, 建議的密碼編碼 。 但更好:使用google、蘭花或oauth2認證選項。) 密碼屬性, 請指定 SHA-256 散列文摘 *使用者名稱* :ERDDAP: *密碼* . 使用者名稱與 "ERDDAP故更難解碼。
        * 在 Windows 上, 您可以下載 MD5 密碼文摘值 (例如[MD5 :](https://www.fourmilab.ch/md5/)) 使用 (例如) :
md5 - Djsmith :ERDDAP: *假名* 
        * 在 Linux/ Unix 上, 您可以使用內建 md5sum 程式產生 MD5 消化值 (例如) :
回聲 -n "史密斯:ERDDAP: *假名* "|md5和
        * 已儲存的純文字密碼對大小寫敏感 。 MD5和UEPMD5密碼的儲存形式不敏感。
        * 例如 (使用 UEPMD5) ,如果使用者名稱="jsmith"和密碼="MyPassword",则&lt;使用者 &gt; 標籤是 :
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
產生已儲存密碼的地方
md5 - Djsmith :ERDDAP: MyPassword 命令
        * 角色是使用者被授權的角色的逗號分隔列表 。 任何&lt;數據集&gt;可能有 [&lt;可存取到 &gt;] (# 无障碍) 標籤列出允許存取此數據集的角色 。 對於給定的使用者和給定的數據集,如果使用者角色清單中的角色之一符合數據集列表中的角色之一&lt;可存取的To &gt; 角色, 然后使用者被授權存取此数据集 。
            
登入的每個使用者都會自動指定角色\\[任何人 在\\],是否有&lt;使用者 &gt; 標籤datasets.xml或者不是 所以如果給定的數據集有
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
然後任何登入的使用者都會被授權存取數據集, 即使沒有&lt;使用者 &gt; 標籤datasets.xml.
            
    * 此標籤值的任何變更將在下次生效ERDDAP™已讀datasets.xml,包括因應数据集[旗號](/docs/server-admin/additional-information#flag).
         
### &lt;路徑Regex & gt;{#pathregex} 
* [ ** &lt;路徑Regex &gt; ** [ [ ] ] (#病原体) 讓您指定限制路徑的正規表示式 (哪個子目錄) 。 預設值是 . . 此標籤很少被使用, 也很少需要 。EDDGrid從 Files 數據集、 EDD Table from Files 數據集, 以及一些其他數據集類型。 然而,當你需要它,你真的很需要它。
    
要做到這一點,你需要真正的好 用正常的表情。 看這個[regex 文件](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)和[regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html). 尤其是你需要知道抓捕群組 (括弧內的東西) ,以及"或"符號|".
一起讓您指定任何選項,例如, (选项1|選項2|选项3) .
而且,任何選擇都不可能什麼,例如, (|選項2|选项3) .
另外,你需要知道捕捉團體可以筑巢,即捕捉團體中的任何選項都可以包含另一個捕捉團體,例如, (|選項2 (|選項2 b|选项2c) |选项3) 表示選項2的後端沒有什麼, 或者選項2b, 或者選項2c。
路徑 Regexes 中, 每個選項會是一個目錄名稱, 后面是 /, 例如 bar/ 。
    
路徑的棘手部分是:ERDDAP™遞迴降下目錄樹, 路徑 Regex 必須接受它到目錄途中遇到的所有路徑 。 Regex的巢穴捕捉群 是處理此事的好方法
    
示例:
如果我們有以下目錄結構:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
而指定的檔案 Directory 是 /foo/bar/, 我們只需要.ncD 中的檔案\\[0-9\\]&#123;4&#125;/a/子目.
解答是設定路徑 Regex 到 /foo/bar/ (|D\\[0-9\\]&#123;4&#125;/ (|a/) )   
意思是:
路徑必須從 /foo/ bar/ 開始
之后可能一無所有或D\\[0-9\\]&#123;4&#125;/
之后可能一無所有或
    
是的,Regex的路 可能非常難設計。 如果你卡住了,就問電腦程序員 (在現實世界中最接近巫師發出咒語的事?) 或是發郵件給克里斯 約翰在Noaa.gov。
    
### &lt;數據集 & gt;{#dataset} 
* [ ** &lt;数据集 &gt; ** [ [ ] ] (# 數據集) 是 optional (但一直使用) 標籤&lt;erddapDatasets &gt; 標籤datasets.xml(如果您包含介于&lt;数据集 &gt; 和&lt;/dataset&gt;)完全描述了一個数据集。 例如,
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
您的數據集標籤可能有數目datasets.xml文件。
3 個屬性&lt;數據集&gt;標籤 :
     
    *    **類型=" *a 類型* "** 是在 a 內的 REQUID 屬性&lt;數據集 &gt; 標籤datasets.xml表示數據集類型 (例如,它是否是EDDGrid/网格或EDD表/表格数据集) 和資料來源 (例如,數據庫、檔案或遙控器OPeNDAP伺服器) . 看[ **數據集類型列表** ](#list-of-types-datasets).
         
#### 数据集 日{#datasetid} 
*   [ **datasetID=". *數據集ID* "** ](#datasetid)是在 a 內的 REQUID 屬性&lt;數據集&gt; 指定短數( 通常是) 的標籤&lt;15 個字符),獨特的,數據集的识别名稱.
    * 其datasetID一定要是字母 (阿 -Z 阿 -Z) 然后是A -Z、A -z、0 -9和Q -(但最好&lt;共32個字).
    * 數據集 身份證很敏感,但不要創造兩個datasetIDs, 只在大/ 小寫字母中有所不同。 它會在 Windows 電腦上引起問題 (您的和/或使用者的電腦) .
    * 最佳做法: 我們建議使用[骆驼 大小寫](https://en.wikipedia.org/wiki/CamelCase).
    * 最佳做法: 我們建議第一部分是來源機構名字的縮寫或縮寫,第二部分是資料集名字的縮寫或縮寫。 如果可能, 我們會建立一個名稱, 反映資料集的來源名稱 。 例如,我們用datasetID="erdPHssta8天",用于數據集NOAA NMFS SWFSC司 (ERD) 被來源指定為衛星/ PH/ssta/8天。
    * 如果您改變了數據集的名稱, 舊的數據集 (使用舊名稱) 仍活在ERDDAP. 這是"孤兒"的數據集, 因為它的规格在datasets.xml現在不見了 其原因如下:
        1. 為ERDDAP™v2.19及後,你不需要做任何事情。ERDDAP™會自動移除這些孤兒數據集 。
        2. 為ERDDAP™v2.18 及更早時, 您需要做一些事情來移除孤兒數據集 : 建立活性="假"的数据集,例如,
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
下一個大載後 數據集 您可以在舊數據集不動後移除此標籤 。
                 
#### 作用中{#active} 
*   [ **活性=" *布林* "** ](#active)是在&lt;數據集 &gt; 標籤datasets.xml表示數據集是否作用中 (符合ERDDAP) 或者不是
    * 合法值為真 (默认) 和假的。
    * 由于預設是真實的,所以在您要暫時或永久移除此数据集之前,您不需要使用此屬性ERDDAP.
    * 如果你只是移除一個作用中的="真"的數據集datasets.xml,此數據集仍會作用於ERDDAP™但永遠不會更新。 如此數據集將成為「孤兒」, html 網頁位于未載入的數據集清單之下 。
    * 如果你設置活性="假",ERDDAP™下次它要更新數據集時會關閉數據集 。 當你這麼做的時候,ERDDAP™不會丟掉它可能儲存的有關數據集的任何資訊,
    * 要移除數據集ERDDAP™,看[強制移除資料集](/docs/server-admin/additional-information#removing-datasets).
         

 ** 在&lt;数据集 &gt; 和&lt;/dataset &gt; 標籤。 **   
在哪些類型的數據集中可以使用標籤 。 特定文件[数据集的類型](#list-of-types-datasets)詳情

#### &lt;可存取 拖曳( G) ;{#accessibleto} 
* [ ** &lt;可存取 至 &gt; ** [ [ ] ] (# 无障碍) 是在 A&lt;數據集&gt; 標籤,指定以逗號分隔的列表[角色](#user)允許存取此數據集。 例如,
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * 這是一部分ERDDAP是[安保制度](/docs/server-admin/additional-information#security)限制某些使用者存取一些数据集。
    * 如果此標籤不存在, 所有使用者 (即使他們沒有登記) 將有權存取此數據集。
    * 如果存在此標籤, 此數據集將只對有指定角色之一的登入使用者可见與存取 。 此數據集將無法被未登入的使用者看到 。
    * 登入的每個使用者都會自動指定角色\\[任何人 在\\],是否有&lt;使用者 &gt; 標籤datasets.xml或者不是 所以如果給定的數據集有
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
然後任何登入的使用者都會被授權存取數據集, 即使沒有&lt;使用者 &gt; 標籤datasets.xml.
         
#### &lt;圖形{#graphsaccessibleto} 
* [ ** &lt;圖形可存取 &gt; ** [ [ ] ] (# 圖片可以存取 #) 是在 A&lt;數據集 &gt; 標籤datasets.xml它決定了數據集的圖像與中繼資料是否可供公眾使用。 它提供了部分覆蓋數據集的方法 [&lt;可存取到 &gt;] (# 无障碍) 设置。 允許的數值有:
    * 自動 -- 此值( 或沒有)&lt;圖片AublicedTo &gt; 數據集的標籤)可以存取數據集的圖片和中繼資料&lt;可存取To &gt; 設定。
所以如果數據集是私密的, 它的圖和中繼資料會是私密的 。
如果數據集是公開的 它的圖和中繼資料會公開
    * 公共 -- 此設定讓數據集的圖和中繼資料可供任何人使用, 甚至沒有登入的用戶, 即使數據集因為有它而私密&lt;可存取的To &gt; 標籤。
         
#### &lt;可存取 ViaFiles & gt; 變更{#accessibleviafiles} 
* [ ** &lt;可存取的ViaFiles &gt; ** [ [ ] ] (#可以存取的檔案) 是在 A&lt;數據集 &gt; 標籤datasets.xml用于[EDDGrid聚合](#eddgridaggregateexistingdimension),[EDDGrid复制](#eddgridcopy),[EDDGrid從 EDD 可](#eddgridfromeddtable),[EDDGrid來自 Erddap](#eddfromerddap),[EDDGrid來自 Etopo](#eddgridfrometopo),[EDDGrid從檔案](#eddgridfromfiles)  (包含所有子類) ,[EDDGrid侧邊邊](#eddgridsidebyside),[EDD 表格](#eddtablecopy) [EDD 表格來自 Erddap](#eddfromerddap),[從 EDD 表格EDDGrid](#eddtablefromeddgrid)和[檔案中的 EDD 表格](#eddtablefromfiles)  (包含所有子類) 數據集。 它可以有真假的價值 例如,
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
如果值是真的ERDDAP™以讓使用者可以瀏覽並下載數據集的源資料檔案ERDDAP是["files"系統](https://coastwatch.pfeg.noaa.gov/erddap/files/). 看"files"系統[文件](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)更多信息。
    
預設值&lt;可存取的ViaFiles &gt; 來自&lt;預設可存取ViaFiles &gt;  in[設定. xml](/docs/server-admin/deploy-install#setupxml). 它有虛假的預設值, 但我們建議您在您的設定中加入此標籤 。 xml 值為真 。
    
建議 我們建議讓所有相關的數據集通過檔案系統可以使用 。&lt;預設 AUccessibilityViaFiles &gt; 在設定值. xml 中為真, 因為有一群使用者希望用此方式取得資料 。 除其他原因外,"files"系統讓使用者很容易看到哪些檔案是可用的, 以及它們上次變更的時候, 从而讓使用者可以輕鬆地維持自己對整套資料的複製。 如果您一般不想讓數據集透過檔案系統存取, 設定&lt;預設可存取ViaFiles &gt; 到錯誤 。 不管怎樣,只要用&lt;可存取ViaFiles &gt; , 用于數據集, 這些集是一般政策中的例外&lt;預設可存取ViaFiles &gt; (例如,當數據集使用時[.nc毫升](#ncml-files)檔案, 對使用者沒用) .
     
#### &lt;可存取 分WMS& gt; Name{#accessibleviawms} 
* [ ** &lt;可存取 分WMS&gt; ** [ [ ] ] (&#123;\fn方正黑體簡體\fs18\b1\bord1\\shad1\\3cH2F2F2F&#125;"可通訊") 是在 A&lt;數據集 &gt; 標籤datasets.xml所有人[EDDGrid](#eddgrid)子類。 它能有真正的價值 (默认) 或是假的 例如,
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
如果價值是假的ERDDAP是WMS伺服器將沒有此數據集 。 通常用于一些經度值大于 180 的數據集 (技術上無效的WMS服務) ,您也提供一個完全在 -180 至 180 到 180 到 180 到 180 到 180 到 180 到 180 到 180 到 180 到[EDDGrid龍PM180](#eddgridlonpm180).
如果值是真的ERDDAP™將試圖讓數據集通過ERDDAP是WMS伺服器。 但如果數據集完全不适合WMS  (例如,沒有經度或纬度數據) ,那么數據集將無法通過ERDDAP是WMS伺服器, 不管此設定如何 。
     
#### &lt;添加 變數 在哪里 & gt;{#addvariableswhere} 
* [&lt;新增可變色點 &gt;] (變化的地方) 在&lt;所有 EDDTable 資料集的 djag。
    
任何 EDD Table 資料集的要求可以包含( A) 變數 在哪里 (" *屬性 姓名* "," *屬性 值* ") 表示ERDDAP™以新增數據集中的所有變數 *屬性Name=屬性value* 到要求的變數清單。 例如,如果使用者添加( A) 變數 在哪里 ("ioos\\_category","風") 以查詢ERDDAP將新增數據庫中所有有ioos\\_category=wind 屬性到要求的變數清單 (例如,風速,風向,風向) . *屬性 姓名* 和 *屬性 值* 注意大小寫
    
在datasets.xml,如果數據集的數據集.xml中有
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
例如,
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
資料存取表單 (.html 网页) 包含元件 (在逗號分隔清單中的每個屬性Name) 右下方的變數清單讓使用者指定屬性值。 如果使用者選擇一個或多個屬性名稱的屬性值, 它們會通过 &add 加入到要求中 變數 在哪里 (" *屬性 姓名* "," *屬性 值* ") . 因此,此標籤在datasets.xml讓您指定會出現在資料存取表單上的屬性名稱清單, 讓使用者很容易加入 & addVariables 要求的功能所在 。 其 *屬性名稱CSV* 列表是区分大小寫的。
    
#### &lt;高度MetersPer 來源Unit&gt;{#altitudemeterspersourceunit} 
* [ ** &lt;高度MetersPer 來源單位 &gt; ** [ [ ] ] (#海拔計算器/源碼器) 在&lt;数据集中的 data set &gt; 標籤。 EMD 表格的 xxmlSOS数据集 (只有&#33;) 指定乘以來源高度或深度值的數字,以將它們轉換成高度值 (海拔) . 例如,
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
如果數據集的垂直轴值不是公尺, 則使用此標籤 。 不然,它就是 optional, 因為預設值是 1 。 例如,
    * 如果來源已用海平面高度测量,请使用 1 (或者不要使用此標籤, 因為 1 是預設值) .
    * 如果來源是以海平面以下的米計量的,使用-1。
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * 如果來源是以海平面上方千米测量的,使用0.001.
         
#### &lt;預設的 DataQuery & gt;{#defaultdataquery} 
* [ ** &lt;預設資料查詢 &gt; ** [ [ ] ] (# 預設數據庫) 是在 A&lt;數據集 &gt; 標籤datasets.xml也就是說ERDDAP™要使用指定的查詢 (URL中“?"之后的部分。) 如果.html文件 類型 (資料存取表單) 不需要查詢。
    * 你可能很少用這個
    * 您需要 XML 編碼 (不是%- encode) 默认查詢, 因為它們在 XML 文件中 。 例如, 變成 & amp; ,&lt;變成&lt;, &gt; 成為 & gt; 。
    * 請檢查你的工作。 犯錯很容易 卻得不到你想要的ERDDAP™但不要相信,因為...\\*怎么\\*可能會改變的
    * 對 gradap 數據集, 常用的是指定不同的預設深度或高度尺寸值 (例如,\\[0\\]代替\\[上次\\]) .
不管怎樣,你總是要列出所有的變數, 總是对所有變數使用相同的維度值, 幾乎總是使用\\[0\\],\\[上次\\],或\\[0: 最後\\]值。
例如:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * 為tabledap數據集, 如果您沒有指定任何限制, 要求會傳回整個數據集, 這可能不切实际, 依資料集而定 。 如果你不想指定任何限制 而不是空的&lt;預設資料查詢 &gt; (等於未指定預設值 資料查詢) ,您需要明确列出您要在預設的 DataQuery 中包含的所有變數 。
    * 為tabledap數據集,最常用的是指定不同的預設時間範圍 (相对于最大值 (時間) 例如, time&gt;=max( T) (時間) -1天,或者比對現在,例如( T)now-1天) .
請記住, 不要求資料變數與指定所有資料變數是相同的, 所以通常您可以指定新的時間限制 。
例如:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
或
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;預設 GraphQuery & gt;{#defaultgraphquery} 
* [ ** &lt;預設 Graph 查詢 &gt; ** [ [ ] ] (錯誤的圖片) 是在 A&lt;數據集 &gt; 標籤datasets.xml也就是說ERDDAP™要使用指定的查詢 (URL中“?"之后的部分。) 如果.graph 文件 類型 (制作圖表) 不需要查詢。
    * 你可能很少用這個
    * 您需要 XML 編碼 (不是%- encode) 默认查詢, 因為它們在 XML 文件中 。 例如, 變成 & amp; ,&lt;變成&lt;, &gt; 成為 & gt; 。
    * 請檢查你的工作。 犯錯很容易 卻得不到你想要的ERDDAP™但不要相信,因為...\\*怎么\\*可能會改變的
    * 对于格達普數據集,最常用的用途是指定不同的預設深度或高度尺寸值 (例如,\\[0\\]代替\\[上次\\]) 和( 或) 指定要圖示特定變數 。
不管怎樣,你幾乎總是用\\[0\\],\\[上次\\],或\\[0: 最後\\]值。
例如:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (但都放在一線) 
    * 為tabledap數據集, 如果您沒有指定任何限制, 要求會勾勒出整個數據集, 這可能需要很長的時間, 依數據集而定 。
    * 為tabledap數據集,最常用的是指定不同的預設時間範圍 (相对于最大值 (時間) 例如, time&gt;=max( T) (時間) -1天,或者比對現在,例如( T)now-1天) .
請記住, 不要求資料變數與指定所有資料變數是相同的, 所以通常您可以指定新的時間限制 。
例如:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
或
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;維度數值Inmemory & gt;{#dimensionvaluesinmemory} 
* [ ** &lt;維度 在記憶中的值 &gt; ** [ [ ] ] (#二元值集成品)   (真 (默认) 或假) 是 opitional , 在其中很少使用的標籤&lt;任何數據集的標籤EDDGrid顯示的數據集ERDDAP™維度的來源數值放在哪里 (又名axisVariables) :
    
    * 真 = 在記憶體中 (速度快,但使用更多的記憶體) 
    * 假 = 在磁碟上 (速度慢但沒有使用記憶體) 
    
例如,
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
您只應使用假的不預設值ERDDAP™有很多大尺寸的数据集 (例如,百万美元的值,例如:EDDGrid來自 AudioFiles 資料集) 和ERDDAP在使用內存用量總是太高 。 參考內存: 目前使用行數 :\\[您的域\\]/erddap/status.html要監控ERDDAP™內存用量 。
     
#### &lt;檔案表格 inmemory & gt;{#filetableinmemory} 
* [ ** &lt;檔案目錄表 &gt; ** [ [ ] ] (# 檔案集成器)   (真假 (默认) ) 在&lt;任何數據集的標籤EDDGrid從檔案與 EDD 表格 來自 Files 數據庫ERDDAP™檔案表的保存位置 (它有每個來源資料檔的資訊) :
    
    * 真 = 在記憶體中 (速度快,但使用更多的記憶體) 
    * 假 = 在磁碟上 (速度慢但沒有使用記憶體) 
    
例如,
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
如果您將此設定為任何數據集的正則, 請留意記憶: 目前使用行 :\\[您的域\\]/erddap/status.html以确保ERDDAP™還有很多自由的記憶
     
#### &lt;fgdc 檔案 & gt;{#fgdcfile} 
* [ ** &lt;fgdc 檔案 &gt; ** [ [ ] ] (#fgdc文件) 是在 A&lt;數據集 &gt; 標籤datasets.xml也就是說ERDDAP™以使用已預制的 FGDC 文件, 而不是有ERDDAP™試著產生檔案 。 用法 :
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *完全 文件Name* 可以指代本地檔案 (伺服器檔案系統的某處) 或遠端檔案的網址。
如果 *完全 文件Name* QQ" 或檔案找不到, 數據集將沒有 FGDC 中繼資料 。 所以如果您要壓制特定數據集的 FGDC 中繼資料, 這也是有用的 。
或者,你可以放&lt;fgdc 活性 &gt; 虛假&lt;/fgdcAactive &gt; in setup.xml 要告訴的設定ERDDAP™不提供任何数据集的 FGDC 中繼資料 。
     
#### &lt;是 19115 文件 & gt;{#iso19115file} 
* [ ** &lt;iso19115 檔案 &gt; ** [ [ ] ] (#iso19115文件) 是在 A&lt;數據集 &gt; 標籤datasets.xml也就是說ERDDAP™以使用 ISO 19115 檔案, 而不是有ERDDAP™試著產生檔案 。 用法 :
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *完全 文件Name* 可以指代本地檔案 (伺服器檔案系統的某處) 或遠端檔案的網址。
如果 *完全 文件Name* QQ" 或檔案找不到, 數據集將沒有 ISO 19115 中繼資料 。 所以如果您要壓縮 ISO 19115 中繼資料, 這也是有用的 。
或者,你可以放&lt;iso19115 活性&gt;虛假&lt;/iso19115 Aactive &gt; in setup.xml 要告訴您ERDDAP™不提供任何数据集的 ISO 19115 中繼資料 。
     
#### &lt;匹配轴 NDigits & gt; 中{#matchaxisndigits} 
* [ ** &lt;匹配 AxisNDigits &gt; ** [ [ ] ] (# matchaxisn 數字) 是在EDDGrid &lt;數據集 &gt; 標籤EDDGrid數據集,例如檔案的集合。 每次重載數據集時ERDDAP™檢查集合中每個元件的轴值是否相同 。 測試的精度由[匹配轴數](#matchaxisndigits),它指定了在測試雙精度轴值時必須匹配的數字總數 0 - 18 (默认) . 測試浮轴值時, 測試用匹配的 AxisNDigits/2 位數 。 值為 18 或以上EDDGrid做個精确的測試 0 的值EDDGrid除下文所述外,不作任何试验。
    
雖然EDDGrid允許集合的元件有稍有不同的轴值, 只有一組轴值顯示給使用者 。 此集來自提供數據集源中繼資料的同一個元件 。 例如,EDDGrid來自 Files 資料集, 由&lt;從「 設定」 中繼資料 (默认值為最後) .
    
大多數情況下, 哪怕是最小檢查也是有用的, 因為它能确保元件適合聚合 。 我們都假設所有部件都適合 但不是總是如此 這是重要的理智考驗 連匹配的 AxisNDigits1, 2, 3 或 4 的數值都無法被阻止, 因為不同的轴數值常顯示元件是被產生的 。 (垃圾?) 不同的方式,因此不适合聚合。
    
有一起使用匹配的 AxisNDigits\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 在这种情况下,如果數據集使用快取FromUrl,快取SizeGB,匹配AxisNDigits\\=0,以及EDDGrid從檔案系統[經 文件名](#aggregation-via-file-names-or-global-metadata)那么EDDGrid不需要讀取所有的遠端檔案來完成聚合 。 這可以讓 S3 桶內的數據集快速載入 (而不是荒唐的慢,如果EDDGrid必須下載並讀取所有檔案) .
    
#### &lt;nthreads( gt; ) :{#nthreads} 
* 從開始ERDDAP™2.00版本,當 EDDTable 的任何子类從檔案或EDDGrid從它的來源讀取資料, 它可以讀取一塊資料 (例如, 一個來源檔案) 一次 (單線)   (那是預設) 或多塊數據 (例如, 2+ 來源檔案) 一次 (在 2 或以上線線中) 並處理每個要求。
     
    * 縮圖規則 :
对于大部分系統的數據集,使用 nThreads=1,即預設值 。 如果你有一台強大的電腦 (很多 CPU 核心, 很多內存) ,然后考慮设置 nThreads 到 2, 3, 4 或更高 (但最多於電腦中的 CPU 核心數量) 可能益惠的數據集:
        
        * 大多數 EDD Table fromFiles 資料集將受益 。
        * 例如:
            * 數據集[外部壓縮 (例如,.gz) ](#externally-compressed-files)二进制 (例如,.nc) 檔案, 因為ERDDAP™要解壓整份文件才能開始讀取檔案 。
            * 使用的數據集[缓存大小GB](#cachefromurl)因為ERDDAP™常常要下載檔案才能讀取 。
            * 數據集, 資料檔案儲存在高頻率的平行檔案系統上, 因為它可以在有要求時更快地提供更多資料 。 平行檔案系統的例子包括:[博德](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures),[pNFS](http://www.pnfs.com/),[ glusterFS](https://en.wikipedia.org/wiki/Gluster)Amazon S3和Google云存储器
                 
        
警告 : 使用 nthreads &gt; 1 時, 注意ERDDAP內存使用、線索使用和整体反應 (你看[ERDDAP狀態頁面](/docs/server-admin/additional-information#status-page)) . 引文如下。
         
    * 對於給定的數據集, 此 nThreads 設定可以來自不同的地方 :
        
        * 如果datasets.xml數據集的區塊有&lt;nthreads &gt; 標籤( 在&lt;dataset &gt; 標籤, 而不是全局屬性 ), 值 QQ 1, 使用 nThreads 的值 。 所以, 您可以為每個數據集指定不同的數字 。
        * 不然,如果datasets.xml有&lt;nTablethreads &gt; 標籤 (EDD 表格 從檔案數據庫中) 或&lt;nGridThreads &gt; 標籤 (用于EDDGrid数据集) 值 1,a之外&lt;數據集&gt; 標籤, 使用 nThreads 的值 。
        * 否則會使用一串線, 這是安全的選擇, 因為它使用最小的記憶體 。
             
        
為了[原始ERDDAP™安裝](https://coastwatch.pfeg.noaa.gov/erddap/index.html),我們使用
        &lt;nTable曲目 &gt; 6&lt;/ntablethreads &gt; (這是一個強大的伺服器。) 困難的要求現在需要30%的時間。
         
##### 監控資源使用{#monitor-resource-usage} 
當你實驗不同的 nThreads 設定值時 (可能會對你的樣本提出困難的要求ERDDAP) 您可以監控電腦的資源用量 :
* 在 Macs 上, 使用 Finder: 應用程式: 工具: 活動監控器
* 在 Linux 上, 使用頂端
* 在 Windows 10 上,使用 *Ctrl + Shift + Esc* 要開啟工作管理員
             
##### 警告: 反應降低{#warning-decreased-responsiveness} 
在孤立中,ERDDAP™將完成對數據集的要求,數據集的nThreads設定速度比nThreads=1快. 其他用戶的請求會有些拥挤, 而且,當ERDDAP™應答給定的要求, 其他計算資源 (例如磁碟驅動器存取、網路帶宽) 可能會有限制, 特别是有更高的 nThreads 設定值 。 因此, nThreads 設定值越高, 處理多項請求時, 因為這個 : 從不把 nThreads 設為多于電腦中 CPU 核心數量 。 nThreads=1是自每次要求以来最公平的設定 (在一些同步要求中) 將會得到平等的計算資源 但電腦的威力越大 問題就越小
         
##### 警告: 更高的內存 用途EDDGrid數據集{#warning-higher-memory-use-for-eddgrid-datasets} 
處理請求時的內存使用與 nThreads 設定直接成比例 。 一個很安全的拇指規則是: 你需要設定[ERDDAP內存設定值](/docs/server-admin/deploy-install#memory)至至少 2GB + (2GB QQ 正弦) . 有些數據集需要更多的記憶體。 例如, 將 nThreads = 3 設定為任意EDDGrid數據集表示 - Xmx 設定至少应为 - Xmx8000M 。 如果內存設定大于電腦物理內存的 3/4, 請減少 nThreads 設定, 讓您可以減少內存設定 。

線程處理要求到 EDDTable 数据集的內存使用率幾乎總是低一些, 因為檔案通常要小得多 。 然而, 如果給定的 EDDTable 数据集有巨大的 (例如,XQ1 GB) 資料檔案, 上面的註解也會被套用到這些資料集中 。

無論NThreads設定如何,[ERDDAP狀態頁面](/docs/server-admin/additional-information#status-page). 你不該把記憶力用量最大化ERDDAP; 否則會有嚴重的錯誤和失敗。
        
##### 暫定為 1{#temporarily-set-to-1} 
如果目前的記憶體用量稍高,ERDDAP™將會為此要求設定 nThreads 到 1 。 因此,ERDDAP™當記憶力稀缺時會保存記憶力 。
         
##### 減少返回{#diminishing-returns} 
增加 nThreads 設定值的回報正在減少: 2 串比 1 更好 。 (如果我們忽略动态超時) . 3比2好 4會比3好一點

使用 1, 2, 3, 4, 5, (我們現在在服務器上使用 nTableThreads=6。) 

nthreads= 2: 雖然指定 nThreads=2 而不是 nThreads=1 往往有重大的益處, 原因如下: nThreads=1, 大多是現代 CPU 的意志[动态超時](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)  (涡輪助推) 暫時增加 CPU 的時鐘速度 。 因此,用 nThreads=1,如果使用 nThreads=2,一個核心的時鐘速度往往比兩個核心的每個都高. 我們仍認為最好使用nThreads=2而不是nThreads=1, 當然,如果你的電腦有足夠的CPU核心, 更高的nThreads設定會產生更好的效果。

如上所述,非常高的nThreads設定值可能使一些要求得到更快的回應,但总体降低的風險ERDDAP™反應性和高內存使用率 (如前所述) 雖然這些要求正在處理中 但這通常不是個好主意
        
##### CPU 核心{#cpu-cores} 
你不該把 nThreads 設為比電腦的 CPU 核心數量更大的數字 。 基本上所有的現代CPU都有多個核心 (例如,2、4或8) . 有些電腦甚至有多重 CPU (例如,2 CPU + 4 核心/CPU = 8 CPU 核心) . 要知道電腦有多少CPU和核心:

* 在 Macs 上,使用 *選擇金鑰* : 蘋果選單 : 系統資訊
* 在 Linux 上, 使用 cat / proc/ cpuinfo
* 在 Windows 10 上,使用 *Ctrl + Shift + Esc* 要開啟 工作管理員: 性能 (逻辑處理器顯示 CPU 核心的總數) 

是的,目前大多數處理器都說每核心支持兩條線 (途[超](https://en.wikipedia.org/wiki/Hyper-threading)) , 但兩線共享計算資源, 所以您不會看到 CPU 重载下兩倍的吞吐量 。 例如, 一個 CPU 有 4 個核心的電腦可能聲稱支援 8 個線程, 但您永遠不要超过 nThreads= 4 。ERDDAP. 記住:

* nthreads 設定在ERDDAP™每個要求。ERDDAP™通常會同步處理多項要求 。
*   ERDDAP™完成處理要求以外的事情,例如重新載入數據集。
* 什麼時候ERDDAP™應答給定的要求, 其他計算資源 (例如磁碟驅動器存取、網路帶宽) 可能有些限制 你設置的nThreads越高,其他資源就越有可能被最大化和減慢ERDDAP一般的反應
* 操作系統除了執行之外還做其他事ERDDAP.

所以最好不要把 nThreads 設定到多于電腦的 CPU 中的核心數 。
         
##### 您的大米5月 瓦里 (伊米娃)  {#your-mileage-may-vary-ymmv} 
不同 nThreads 設定的結果對不同系統的不同數據集的不同要求會有很大的不同 。 如果您真的想知道不同的 nThreads 設定的效果, 請執行實際的測試 。
         
##### 為什麼每件要求都是無線電?{#why-nthreads-per-request} 
我聽到你們中有些人在想 "為什麼每件要求都是nThreads? 若我編碼這個, 我會用一個永久的工人線池, 使用一個工作串和訊息排隊的問題是, 那會有效阻擋ERDDAP™從甚至開始做與其它要求相關的工作,直到最初的要求 (基本) 完成。 因此,即使是簡單的後續要求,也會非常慢的回應。ERDDAP使用 nThreads 每個要求會更公平地使用計算資源 。
         
##### nthreads vs. 多工電腦{#nthreads-vs-multiple-worker-computers} 
不幸的是,ERDDAPnThreads 系統將永遠不會像多台工人電腦一樣有效, 當這項工作真的與多台電腦平行/分配, 用ERDDAP在 nThreads 系統中, 每個線程都在爭取同一電腦的帶宽、 磁碟磁碟、 記憶體等 。 不幸的是,我們大多數人沒有資源或資金建立 甚至租房 (在亞馬遜網路服務 (阿WS) 或谷歌云平台 (GCP 磁碟) ) 一大堆電腦 也不像一個關聯資料庫 可以按任何順序回傳結果列ERDDAP™承諾以一成不变的次序回歸結果 這個限制使ERDDAPnThreads 執行效率降低 。 但是ERDDAPnThreads在很多情况下是有用的.

然而,有些方法可以ERDDAP™大小以建立[网格/群組/ERDDAPs](/docs/server-admin/scaling).
         
#### &lt;調色板( G);{#palettes} 
* 從開始ERDDAP™2.12版本,datasets.xml可包含&lt;調色板 &gt; 標籤( 在內)&lt;erddapDatasets &gt;),它取代了&lt;調色板 &gt; 標籤值來自信件. xml (或返回信件.xml值,如果標籤在datasets.xml是空的) . 讓您變更可用的調色板清單 。ERDDAP™正在執行中。 也讓您改變,ERDDAP.
警告:datasets.xml必須是信件. xml 列出的調色板的超集; 否則ERDDAP™會丟出例外並停止處理datasets.xml. 這能确保所有ERDDAP™設置至少支援相同的核心調色板 。
警告:ERDDAP™檢查在信件. xml 中指定的調色板檔案是否真的存在, 但是它不檢查列出的調色板檔案datasets.xml. 你們有責任確保檔案存在
    
也從ERDDAP™2.12版本,如果你在ERDDAP™內容目錄,ERDDAP™將所有在目錄中的 XQ. cpt 檔案复制到\\[湯姆卡\\]/webapps/erddap/WEB-INF/cptfiles 目錄ERDDAP™開始 因此,如果你把自訂的 cpt 檔案放進目錄,這些檔案將被使用ERDDAP™即使你安裝了新的版本ERDDAP.
    
警告: 如果您在您的調色板中加入自訂調色板ERDDAP™你有EDDGrid從 Erddap 和/ 或 EDD Table 從 Erddap 的資料集中ERDDAP™的調色板選項。ERDDAP™建立 Graph 網頁, 但是如果使用者試圖使用, 他們會得到一個預設的圖 (通常是彩虹) 調色板。 因為影像是由遙控器製造的ERDDAP™它沒有自訂的調色板。 現在唯一的解決辦法就是發送遠端郵件ERDDAP™管理員將您的自訂調色板加入到他的/ her 中ERDDAP或者發郵件給克里斯 John at Noaa.gov 要求調色板加入標準ERDDAP™分配。
    
#### &lt;變更 & gt;{#onchange} 
* [ ** &lt;變更 &gt; ** [ [ ] ] (改變) 是在 A&lt;數據集 &gt; 標籤datasets.xml指定此數據集建立時要完成的動作 (何时ERDDAP™重新啟動) 當此數據集以任何方式變化時 。
    * 目前,用于EDDGrid子類, 任何變更 (例如,近实时資料的新時點) 被視為變更, 但重新載入數據集不視為變更 (本身) .
    * 目前, 对于 EDDTable 子類, 任何重新載入數據集都視為變更 。
    * 目前只允許兩種動作:
        * " http://" 或 " https://" -- 如果動作始于 " http://" 或 " https://" ,ERDDAP™會寄出HTTP GET要求到指定的網址。 反應將被忽略。 例如, URL 可以讓其他網路服務做一些事情 。
            * 如果網址有查詢部分 (在""之后?) 肯定已經是了[編碼百分比](https://en.wikipedia.org/wiki/Percent-encoding). 你需要在限制中編碼特殊字元 (除了初始的“ & ” 和主'='限制) 輸入表單% HH, 其中 HH 是字元的二位十六進位值 。 通常您只需要將一些 punctuation 字元 :% 轉換成% 25, &% 26, " 轉換成% 22,&lt;進入% 3C, = 到% 3D, &gt; 到% 3E, + 到% 2B,|進入% 7C,\\[進入% 5B,\\]轉換為% 5D, 空間轉換為% 20, 將 # 127 以上所有字元轉換為 UTF-8 格式, 然后% 將 UTF-8 格式的每個字節編碼為% HH格式 (向程序員求助) .
例如,( S)stationID「41004」
變成 &stationID% 3E% 2241004% 22
存取時一般需要百分比編碼ERDDAP透過瀏覽器以外的軟體。 瀏覽器通常會處理您的% 編碼 。
有些情況下, 您需要% 編碼除 A- Za- z0- 9_%之外的所有字元 &#33; ' ' () QQ, 但還是不要編碼初始的 '() 或主 。'='限制。
程式語言有做此工作的工具( 例如, 請參考Java是[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)和Java文稿的encodeURIComponent()[ [ ] ] ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) 而有
                [百分比為您編碼/解碼的网站](https://www.url-encode-decode.com/).
            * 自datasets.xml是 XML 檔案, 您也必須用 & - encode All ' &,' 。&lt;URL 中的 '和 '&gt;' 如 '和amp;' ,'&lt;', 和 'gt;' 在% 編碼后 。
            * 示例 要輸入瀏覽器的 URL :
                 https://www.company.com/webService?department=R%26D&param2=value2   
您應該指定&lt;透過 Change &gt; 標籤 (一行) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * mailto : -- 如果動作從"mailto:"開始,ERDDAP™將發送電子郵件到之後的電子郵件位址, 顯示數據集已更新/ 變更 。
例如:&lt;在 Change &gt; mailto 上: john.smith@company.com&lt;/ 變化 &gt; 如果你有很好的理由ERDDAP™以支援其它類型的動作, 發送郵件描述您想要什麼 。
    * 這個標籤是optional。 這些標籤可以隨心所欲 使用其中的一個標籤來執行每個動作 。
    * 這跟ERDDAP電子郵件/ URL 訂閱系統, 但這些動作並沒有持續儲存 (即它們只儲存在 IDD 物件中) .
    * 要移除訂閱,只需移除&lt;變更的標籤。 下次重新載入數據集時會注意到此變更 。
         
#### &lt;重新載入 EveryNminutes & gt;{#reloadeverynminutes} 
* [ ** &lt;重新載入 每度* ** [ [ ] ] (每分鐘重載) 是在 A&lt;數據集 &gt; 標籤datasets.xml指定數據集要重新載入多少次的數據集。 例如,
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * 通常,常變的數據集 (例如, 取得新的資料檔) 例如,每60分鐘重載一次。
    * 不常變更的數據集不常重載, 例如每1440分鐘一次 (每天) 10080分 (每周) .
    * 這個標籤是 optional, 但建議。 缺省值是10080.
    * 例如:&lt;重新載入 EveryNiminutes &gt; 1440&lt;重新載入 每度*
    * 重新載入數據集時, 所有檔案 *大家长會* /囊/ *datasetID* 目錄已刪除 。
    * 不管它要做什麼,數據集的載入量不會比它更频繁&lt;載入 Datasets minutes &gt; (默认 = 15) ,按[設定. xml](/docs/server-admin/deploy-install#setupxml). 所以,如果您要非常频繁地重新載入數據集, 您需要設定重新載入 EveryNiminute 與載入 Datasets 最小值到小值 。
    * 不要重新裝入每一個NMinutes 和 loadDatasets 相同的值 minminutes, 因為過去的時間很可能是 (例如) 14:58或15:02,所以數據集只會重新裝入主要重新裝入的一半左右. 取而代之的是小一點的 (例如,10) 或更大 (例如,20) 重新載入 每一個NMinute值。
    * 不管重新裝入每一個NMinutes,你都可以手動分辨ERDDAP™以通過一個[旗號檔案](/docs/server-admin/additional-information#flag).
    * 對好奇的程序員 -- inERDDAP™,所有數據集的重載由兩個單目的線程處理。 如果找到旗子檔案或主重載, 一個線線會啟動小的重新載入 (檢查所有資料以檢查是否需要重新載入) . 另一個線程一次重新載入數據集 。 這些線程在背景中工作, 确保所有的數據集都更新 。 重新載入的線程會編譯一個新版本的數據集,然後將它互換到位置 (基本上以解剖法取代舊版本) . 所以很可能發生以下一系列事件 (是好事) :
        
        1.  ERDDAP™開始重新載入數據集 (制作新版本) 在背景中。
        2. 使用者 'A' 向數據集要求 。ERDDAP™使用目前版本的數據集來建立回應。 (很好 使用者沒有延遲, 目前版本的數據集永遠也不該太僵硬 。) 
        3.  ERDDAP™完成建立新的重新載入的數據集版本, 將新版本轉換成製作 。 所有後來的新要求都由新版的數據集處理. 使用者A的請求仍由原始版本填充,
        4. 使用者 'B' 向數據集要求ERDDAP™使用新版本的數據集來建立回應。
        5. 最终使用者 A 和使用者 B 的要求完成 (也許 A先完成,B先完成) .
        
我聽到有人說 "只有兩條腿&#33;" 哈&#33; 真笨&#33; 重新載入數據集需要多少線索, 才能更快完成, 是和不是。 問題是每次載入多個數據集會造成一些新的困難 。 他們都需要解決或處理 目前的系統運作良好,有可控制的問題 (例如,在注意到國旗之前可能會延遲) . (如果你需要幫忙管理他們,看我們[部分](/docs/intro#support).) 相關的[更新 每秒](#updateeverynmillis). 系統在回應線線內工作, 因此它可以而且確實會更新多個數據集 (不是全部重載) 同时
##### 主动性對反應性{#proactive-vs-reactive} 
ERDDAP重新載入系統是主动的 -- 重新載入的數據集很快就被重新載入 每時每刻 (也就是說,他們變成了"廢物" 但從來就不會很腐爛) , 不管數據集是否收到使用者的要求 。 所以ERDDAP™數據集總是最新的,可供使用。 這與 THREDDS 的反應方式相對: 使用者的請求是讓 THREDDS 檢查數據集是否已暫停 (可能很枯燥) . THREDDS 讓使用者等待 (常常是幾分鐘) 在重新載入數據集時 。
        
#### &lt;更新 每一個NMillis&gt;{#updateeverynmillis} 
* [ ** &lt;更新每一個NIMillis &gt; ** [ [ ] ] (# 更新每個人 #) 是在 A&lt;數據集 &gt; 標籤datasets.xml某些有幫助的數據集類型ERDDAP™使用常變的數據集工作 (每秒都差不多) . 不像ERDDAP正常、主动&lt;重新載入 每一個NMinutes &gt;] (每分鐘重載) 完全重新載入每套資料的系統, 此 OPTIONAL 附加系統是反應性 (由使用者要求啟動) 因為是增長的 (只是更新需要更新的信息) . 例如,如果向EDDGrid從 Dap 數據集中發生的數據比上次更新後指定的毫秒數多 ,ERDDAP™查看左邊是否有新的值 (通常"time") 維度, 如果是, 在處理使用者的要求前, 只需下載這些新值 。 這個系統非常善于保持快速變化的數據集的更新,對數據來源的要求很少,但以略微減慢一些使用者要求的處理為代价.
    * 要使用此系統, 加 (例如) :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
之后&lt;重新載入每顆NMinutes &gt; 數據集的標籤datasets.xml. 您指定的毫秒數可小到 1 (以确保数据集總是最新的) . 值 0 (默认) 或負數關閉系統。
    * 因此使用者不必等很久。
    * 如果在上次更新完成之前有第二次數據要求到達,第二次要求不會再次被更新。
    * 我們將試著使用「重新載入」這個詞來重新載入所有資料,
    * 為了測試目的, 某些診斷會印成 log. txt , 如果 [&lt;日志水平&gt;] (# 日志)  indatasets.xml被定為"全部"。
    * 如果您使用增量更新, 尤其是最左端 (第一) 例如, 時間、 轴大, 您可能要設定&lt;重新載入 EveryNminutes &gt; 到更大的數字 (1440年?) , 以便更新完成大部分工作, 以保持數據集的更新, 完全重載不常做 。
    * 注意: 此新更新系統更新中繼資料 (例如, 時間actual\\_range時光掩蓋到...) 但不會觸動變化 (電子郵件或觸摸網址) 或更改RSS种子 (也許應該...) .
    * 所有使用子類的數據集[EDDGrid從檔案](#eddgridfromfiles)和[檔案中的 EDD 表格](#eddtablefromfiles):
        *    **警告:** 當您將新資料檔案复制到目錄中, 將它加入到資料集中時ERDDAP™看,有危險ERDDAP™會注意到部分寫入的檔案; 試圖讀取, 但失敗是因為檔案不完整; 宣告檔案為「 壞的」 檔案並移除它 (暫時) 從數據集。
為了避免這樣,我們 **大力建议** 將新檔案複製到目錄中, 并有暫時名稱 (例如,20150226年.nc通訊錄) 這不符合數據集檔案 名稱 (\\*\\.nc) ,然后把檔案重新命名為正確的名稱 (例如,20150226年.nc) . 如果你用這方法ERDDAP™將會忽略此暫時檔案, 只有在檔案完整且可以使用時才注意其名稱正确 。
        * 如果您修改已存在的資料檔 (例如, 要新增數據點) ,&lt;更新 EveryNMillis &gt; 如果在解剖上顯示變更, 效果會好一些 (瞬間) 檔案總是有效的檔案 。 例如,Netcdf-java 圖書館可以增加"经典"的无限尺寸.ncv3 檔案要解剖 。
            &lt;如果檔案在變更中失敗, 更新 EveryNimillis &gt; 的工作會很糟 。
        *   &lt;更新 EveryNimillis &gt; 會在短時間內一個或幾個檔案變更的數據集中效果良好 。
        *   &lt;更新 EveryNMILIS &gt; 在短時間內大量檔案變更的數據集中效果不佳 (除非變更在解剖上顯示) . 這些數據集最好不要使用&lt;更新 EveryNMILIS &gt; 及設定[旗號](/docs/server-admin/additional-information#set-dataset-flag)要告訴ERDDAP™重新載入數據集。
        *   &lt;更新每一個NIMillis &gt; 不更新與[&lt;subsetVariables&gt;] (# 可變性) . 通常這不是問題 因為subsetVariables有不常改變的東西的信息 (例如,站名列表、經度列表) . 如果subsetVariables資料變更 (例如,在數據集中新增站台時) ,然后聯繫[國旗網址](/docs/server-admin/additional-information#set-dataset-flag)要顯示的數據集ERDDAP™重新載入數據集。 不然ERDDAP™不會注意到新的子集 變數資訊, 直到下一次重新載入數據集( O)&lt;重新載入 EveryNminutes &gt; ).
        * 我們的一般建議是:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * 困難? 在 Linux 電腦上, 如果您正在使用&lt;更新每一個NIMillis &gt; 與EDDGrid從 Filles 或 EDDTable 從 Filles 課程中, 您可以看到一個資料集無法載入的問題 (偶爾或持續) 含有錯誤訊息 : “ IOExcuseion: 使用者限制不指定已達或開啟太多的檔案 ” 。 原因可能是在Java造成不收集垃圾。 此問題在ERDDAP™v1.66及以上. 所以最好的解決辦法是切換最新版本ERDDAP.
如果這不能解決問題( 也就是, 如果你真的有大量數據集使用 )&lt;您可以用呼叫 :
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
或者,如果問題仍然存在,使用更高的數字。 手表的預設值是8192 例的預設值為 128 。
    * 你可以放&lt;更新MaxEvents &gt; 10&lt;/ 更新 Max 事件 &gt;  indatasets.xml  (与接近頂端的其他設定值) 更改檔案的最大變更數量 (缺省=10) 由更新的 Everynimillis 系統處理。 更多數據對數據集可能有用, 看[更新 MaxEvents 文件](#updatemaxevents).
    * 對於好奇的程序員 -- -- 這些增量更新, 不像ERDDAP滿了[重新載入每一個NMinutes](#reloadeverynminutes)系統,發生在使用者要求線程內。 所以任何數據集都可以同步更新 。 有密碼 (和鎖) 以確保在任何特定時刻只有一個線程正在對任何指定的數據集進行更新。 允許多個同時更新很簡單; 允許多個同時全重載會更難 。
         
#### &lt;源碼Can 限制 EstringEQNE & gt;{#sourcecanconstrainstringeqne} 
* [ ** &lt;源碼CanConstringEQNE &gt; ** [ [ ] ] (源碼限制) 是 EDD 表格中的 OPTIONAL 標籤&lt;數據集 &gt; 標籤datasets.xml指定來源能否用 = 和 &#33;= 操作符限制字符串變數。
    * 對 EDD Table FromDapSequence 來說, 這只适用于外序弦變數 。 假設來源無法處理內部序列變數的限制
    * 這個標籤是optional。 合法值為真 (默认) 和假的。
    * 对于 EDD 表格從 DapSequence 排序OPeNDAPDRDS 伺服器, 此應設定為真 (默认) .
    * 对于 EDD 表格從 DapSequence 排序 Dapper 伺服器, 這應該是錯的 。
    * 例如:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;源碼CanConstringGTLT&gt; 限制{#sourcecanconstrainstringgtlt} 
* [ ** &lt;源碼CanControlingGTLT &gt; ** [ [ ] ] (# 源碼限制) 是 EDD 表格中的 OPTIONAL 標籤&lt;數據集&gt; 標籤,指定來源能否用&lt;,&lt;=, &gt;,和 操作者.
    * 對 EDD Table FromDapSequence 來說, 這只适用于外序弦變數 。 假設來源無法處理內部序列變數的限制
    * 合法值為真 (默认) 和假的。
    * 這個標籤是optional。 假設是真的
    * 对于 EDD 表格從 DapSequence 排序OPeNDAPDRDS 伺服器, 此應設定為真 (默认) .
    * 对于 EDD 表格從 DapSequence 排序 Dapper 伺服器, 這應該是錯的 。
    * 例如:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;源碼CanCon constringRegex & gt; 限制{#sourcecanconstrainstringregex} 
* [ ** &lt;源碼Can 约束定律&gt; ** [ [ ] ] (# 源碼限制) 是 EDD 表格中的 OPTIONAL 標籤&lt;數據集&gt; 標籤, 指定來源是否可以用正規表示式限制字串變數, 如果可以的話, 操作員是什麼 。
    * 有效值為「 」 (该DAP標準) "..." (被許多人錯誤支持DAP伺服器) ,或 "" (表示來源不支援正規表示式) .
    * 這個標籤是optional。 缺省是".
    * 对于 EDD 表格從 DapSequence 排序OPeNDAPDRDS 伺服器, 此應設定為「 」 (默认) .
    * 对于 EDD 表格從 DapSequence 排序 Dapper 伺服器, 此應設定為 "" (默认) .
    * 例如:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;源碼CanDistinct & gt;{#sourcecandodistinct} 
* [ ** &lt;源碼CanDistinct &gt; ** [ [ ] ] (# 源碼可以) 是 EDD Table 從數據庫中的 OPTIONAL 標籤&lt;指定來源數據庫是否處理區分的數據集&gt; 標籤( D) () 限制使用者查詢。
    * 這個標籤是optional。 合法值不是 (ERDDAP™處理區別; 缺省) 部分 (源碼的處理有區別,ERDDAP™再處理一次) 是的 (源控點不同) .
    * 如果你在使用不和ERDDAP™處理區別時內存已耗盡, 請使用 yes 。
    * 如果您使用是, 而來源數據庫的處理速度太慢, 請使用否 。
    * 部分地給了你最糟糕的一面: 它很慢, 因為不同的數據庫處理很慢, 可能內存耗盡ERDDAP.
    * 數據庫將DISTINCT解釋為只要求一行獨特的結果,而ERDDAP™將它解釋為要求排序獨一列結果的清單。 如果你把這設為部分或是ERDDAP™自動讓數據庫排序結果 。
    * 結果有一點小不同:
沒有|部分,ERDDAP™將在結果開始時排序「 」 (非"字串之前) .
如果有,數據庫可能會 (郵政會) 在結果末尾排序" (非"字串之后) .
我想這也會影響短字的排序, 例如,ERDDAP™在"西蒙斯"之前排序"西蒙"
    * 例如:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;來源CanderBy&gt;{#sourcecanorderby} 
* [ ** &lt;來源 命令BY &gt; ** [ [ ] ] (# 源碼命令) 是 EDD Table 從數據庫中的 OPTIONAL 標籤&lt;指定來源數據庫是否處理( T)orderBy (...) 限制使用者查詢。
    * 這個標籤是optional。 合法值不是 (ERDDAP™手柄orderBy (...) ; 默认值) 部分 (源控件orderBy和ERDDAP™再處理一次) 是的 (源控件orderBy (...) ) .
    * 如果你在使用不和ERDDAP™處理時內存已耗盡orderBy (...) 用是.
    * 如果您使用是, 且來源數據庫處理orderBy (...) 太慢了,不要
    * 部分地給予您兩者中最糟糕的:orderBy (...) 速度很慢,可能內存耗盡ERDDAP.
    * 結果有一點小不同:
沒有|部分,ERDDAP™將在結果開始時排序「 」 (非"字串之前) .
如果有,數據庫可能會 (郵政會) 在結果末尾排序" (非"字串之后) .
這也可能影響短字與長字的排序, 例如,ERDDAP™但我不知道數據庫會如何排序。
    * 例如:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;源碼 :{#sourceneedsexpandedfp_eq} 
* [ ** &lt;源碼需求 ** [ [ ] ] (# source needspandedfp_eq( 源碼需求性 )) 是 EDD 表格中的 OPTIONAL 標籤&lt;指定數據集 &gt; 標籤 (真 (默认) 或假) 如果來源需要幫助查詢&lt;數字 變數 &#123;&#125;&lt;浮點數值" (和&#33;=, QQ, )&lt;=). 例如,
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * 對一些數據來源,數據查詢涉及=, &#33;=,&lt;=,或 &gt;= 可能不能像期望的 浮點數 。 例如,如果數值被儲存到220.20000000000000001, 搜尋經度=220.2就可能失敗 。
    * 因為浮點數是[不完全代表于電腦](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/).
    * 如果來源需求擴大FPQQQEQ 設定為真 (默认) ,ERDDAP™變更送至資料來源的查詢以避免此問題 。 讓這一幕說實話總是很安全
         
#### &lt;sourceUrl& gt; Name{#sourceurl} 
* [ ** &lt;sourceUrl&gt; ** [ [ ] ] (# 源碼) 是數據集全局內的常用標籤&lt;addAttributes&gt; 指定資料來源的網址的標籤 。
    * 例如:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (但都放在一線) 
    * 在ERDDAP™,所有數據集都會有 "sourceUrl" 在向使用者顯示的综合全局屬性中。
    * 大部分數據集類型, 此標籤是 REQUIRED 。 參考數據集類型的描述來找出這是否是 REQUIRED 。
    * 某些數據集的相隔&lt;sourceUrl&gt; 標籤不被允許 。 相反,你必須提供 "sourceUrl"[全局屬性](#global-attributes),通常在全球 QQaddAttributes&lt;. 如果沒有真正的來源網址 (例如, 如果資料儲存在本地檔案中) ,此屬性往往只是有占位值,例如,&lt;atname="name" &gt; (本地檔案) &lt;/att &gt;.
    * 大部分數據集, 這是用于要求資料的 URL 的基礎 。 例如,DAP伺服器, 這是可以加入 . dods 、.das 、.dds 或. html 的 URL 。
    * 自datasets.xml是 XML 檔案, 您也必須編碼「 & 」 。&lt;URL 中的 '和 '&gt;' 如 '和amp;' ,'&lt;',和'&gt;'.
    * 大部分數據集類型ERDDAP™新增原件sourceUrl  (源碼中的「 本地源碼 」) 至[全局屬性](#global-attributes)  (其中它會成為源碼中的「 公共來源」 。) . 當資料來源為本地檔案時,ERDDAP™新增sourceUrl=". (本地檔案) 作為安全防范 當資料來源是數據庫時ERDDAP™新增sourceUrl=". (來源資料庫) 作為安全防范 若您的數據集使用非公開sourceUrl是 (通常因為他們的電腦在您的DMZ或本地局域網上) 您可以使用&lt;轉換到 Public SourceUrl &gt; ] (#轉換到公用源碼器) 指定如何轉換本地端的標籤sourceUrl公開sourceUrls.
    * AsourceUrl可能起於http://,https://, ftp://, 或者其他的前缀 。https連線讀取並檢查來源的數位憑證, 確保來源是他們所說的人 。 在少數情況下, 此檢查可能會因錯誤「 javax. net. ssl. SSL Protocol Exception: handshake warning: University_%name」 而失敗 。 可能是因為憑證上的域名不符合您使用的域名 。 你可以也應該讀讀sourceUrl您的網頁瀏覽器中的憑證, 特別是「 物件替代名稱」 部分的「 DNS 名稱」 清單 。
        
在某些情况下,sourceUrl您正在使用的可能是憑證上的域名的別名。 例如,
         https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ 將丟出此錯誤, 但
         https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ 使用憑證上的域名 。 因此,這些案例的解決方法就是在憑證上找到和使用域名。 如果您在憑證上找不到, 請聯繫資料提供者 。
        
在其他情况下, 憑證上的域名可能為一组名 。 如果發生了這樣的事情或問題無法解決, 請發送克裡斯。 John在Noaa.gov報警
         

#### &lt;addAttributes&gt; {#addattributes} 
* [ ** &lt;addAttributes&gt; ** [ [ ] ] (# 附加) 每個數據集和每個變數的 OPTIONAL 標籤ERDDAP管理者控制與數據集及其變數相關的元数据屬性 。
    *   ERDDAP™整合數據集來源的屬性 ("源屬性") 和 "addAttributes您所定义的datasets.xml  (优先) 以制作出「 混合屬性」 。ERDDAP™使用者看到。 所以,你可以使用addAttributes重新定義來源屬性值, 新增屬性, 或是移除屬性 。
    * 其&lt;addAttributes&gt; 標籤附加 0 或以上 ** &lt;att &gt; ** 子tag,用于指定個人屬性。
    * 每個屬性都包含一個名稱和一個值 (它有特定的數據類型,例如雙倍) .
    * 只能有一個有指定名稱的屬性 。 如果還有,最後一個优先
    * 數值可以是單一數值或以空格分隔的數值列表 。
    * 語法
        * 命令&lt;att &gt; 下方addAttributes不重要
        * 其&lt;att &gt; 子tag格式是
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * 所有屬性的目的名稱從字母開始 (阿 -Z 阿 -Z) 且 MUST 只包含字符 A- Z, a- Z, 0- 9, 或 'Q' 。
        * 如果&lt;att &gt; 下方沒有值或無值, 此屬性將從综合屬性中移除 。
例如,&lt;atname="rows" / &gt; 將會移除合并屬性中的列 。
例如,&lt;atname="座標"&gt;null&lt;/att&gt; 會移除集成屬性中的座標 。
##### 屬性 類型{#attributetype} 
* [可選擇型態值&lt;att &gt; 子目錄] (#屬性型態) 表示數值的資料類型。 預設型態為 String 。 字符串屬性的例子有:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * 單位數的合法類型是位元 (8 位整數) 短 (16 位簽署整數) 公尺 (32 位簽署整數) 長 (64 位簽署整數) 浮 (32 位浮點) 雙倍 (64 位浮點) 和弦。 例如,
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
看這些關於[字元資料類型](#char).
看這些關於[長數據型態](#long).
        
    * 以空格分隔的數值清單的合法類型 (單值) 字节、 短片、 未簽署字節、 字節、 直體、 長片、 浮片、 雙片 列表。 例如,
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
未簽署的ShortList讓您指定一個未簽署的短片清單,但它們會轉換成一個对应的Unicode字符列表(例如"65 67 69"會轉換成"A C E").
如果您指定了 CharList, 編碼任何特殊的字元( 例如空間、 雙引號、 反斜線 ) ,&lt;#32, 或 #% 127, 因為您會在 NCSV 檔案的資料區編碼它們 (例如,","\"或"","\\\\","\\\\","\\\\","\\\\".\\n","\\u20ac") .
沒有字串列表 。 儲存字串值為多行字串 。 例如,
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### 全局屬性{#global-attributes} 
* [ ** 全球屬性 / 全球&lt;addAttributes&gt; ** [ [ ] ] (全球屬性) --
    &lt;addAttributes&gt; 是在&lt;數據集&gt; 標籤,用于變更套用於整個數據集的屬性。
    
    *    ** 使用全局&lt;addAttributes&gt; 改變數據集的全局屬性 。 ** ERDDAP™整合數據集來源的全局屬性( N)** 源屬性 **和全球** addAttributes **您所定义的datasets.xml  (优先) 全球** 合并屬性 ** ,也就是ERDDAP™使用者看到。 所以,你可以使用addAttributes重新定義來源屬性值, 新增屬性, 或是移除屬性 。
    * 看 ** &lt;addAttributes&gt; **信息] (# 附加) 适用于全局和變數** &lt;addAttributes&gt; ** .
    *   [FGDC 檔案](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html)和[ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata)中繼資料 -- 通常ERDDAP™自動產生 ISO 19115-2/19139 和 FGDC (FGDC-STD-001-1998) XML 中繼資料檔, 使用數據庫中繼資料的資料 。 所以 **良好的數據集元数据會導致好的ERDDAP- 產生ISO 19115和FGDC中繼資料。 請考慮花很多時間和精力來改善您的數據集的中繼資料 (總之這是件好事) .** 用于產生 ISO 19115 和 FGDC 中繼資料的數據集元数据屬性大多來自[ACDD 中繼資料標準](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)如下所示。
    * 許多全球的屬性在其中很特別ERDDAP™尋找它們,並以不同的方式使用它們。 例如,與infoUrl包含在有數據集清單的網頁上,
    * 當使用者選擇數據的子集時, 與變數經度、 纬度、 高度相關的全球屬性 (深度) 和時間範圍 (例如,最南端的北邊,最北端的北邊, 時間的封面的封面的封面的封面,) 自動產生或更新。
    * 簡單的全球樣本&lt;addAttributes&gt; 是:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
空的 cwhdf\\_version 屬性引出源 cwhdf\\_version 屬性 (如果有) 要從最後的、 合并的屬性清單中移除。
    * 提供此資訊有幫助ERDDAP™幫助使用者了解數據集。
良好的中繼資料可以使用 。
中繼資料不足,
請花點時間做個好工作 。
##### 特殊的全局屬性ERDDAP™
###### 認證{#acknowledgement} 
*   [ **認證** ](#acknowledgement)和 **承認**   (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 以建議的方式承認提供支援的群組 (特别是金融) 用于建立此資料的專案。 例如,
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
注意 ACDD 1. 0 和 1.1 使用拼音"承认" (這是美國常用的拼音) 但是 ACDD 1.3 改變為「承認」 (這是英國通常的拼法) . 我理解這項改變根本是意外, 真是一團糟&#33; 全世界有數百萬的數據檔案 已經"承認"了 也有數百萬的資料"承認"了 強調「簡單」改變標準的愚蠢, 因為 ACDD 1.3 (是 ACDD 的版本ERDDAP™支援) 說"承認" 就是這個ERDDAP™  (特別產生達塔斯 Xml 命令) 鼓勵
     
###### cdm 高度 +oxy{#cdm_altitude_proxy} 
*   [ **cdm 高度 +oxy** ](#cdm_altitude_proxy)僅限 EDDTable 數據集, 不具有海拔或深度變數, 但有變數是高度或深度的代名詞 (例如:壓力、西格瑪、瓶子) ,您可以使用此屬性來辨識變數。 例如,
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
如果[cdm\\_data\\_型態](#cdm_data_type)是 profile 或 TrajectoryProfile , 沒有高度或深度變數, cdm\\_altitude\\_proxy MUST 被定義 。 如果Cdm\\_altitude\\_proxy被定義,ERDDAP™將新增以下元数据到變數 : AxisType=高和轴=Z.
     
###### cdm\\_data\\_型態{#cdm_data_type} 
*   [ **cdm\\_data\\_型態** ](#cdm_data_type)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 表示Unidata [共同資料模型](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html)資料類型。 例如,
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
CDM仍在發展,ERDDAP™遵守相關且更詳細的[分解采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)章次[CF 1.6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)中繼 (先前稱為 CF 點觀察常规) .
    * 要么數據集是全局的[源屬性](#global-attributes)或全球&lt;addAttributes&gt; MUST 包含 cdm\\_data\\_ 類型屬性 。 數個數據集類型 (如 EDD 表格 來自 Obis) 會自動設定此項目 。
    * 為EDDGrid數據集, cdm_%data_%% 類型的選項是 Grid (默认型態以及目前最常用型態EDDGrid数据集) 、 MovingGrid、 Other、 Point、 Profile、 RadialSweep、 時空串、 時空串、 Swath、 傳射器、 傳射器Profile 。 目前,EDDGrid不需要指定任何相關的中繼資料, 也不檢查資料是否與 cdm\\_data\\_%%%%%%%% 類型相符 。 不久的未來,
    * EDDTable严格使用cdm\\_data\\_型, 如果數據集的元数据不符合ERDDAPCdm\\_data\\_類型的要求 (见下文) ,數據集將無法載入並產生[錯誤訊息](#troubleshooting-tips). (這是件好事,因為錯誤訊息會告訴你錯誤的是什么 這樣你就能修好它) 如果數據集的數據不符合數據集的元数据設定 (例如, 如果時序數據集中給定的站台有不止一個纬度值) ,一些資料要求會在回應中傳回不正確的資料。 所以,確保你得到的一切正确。
        
所有這些數據集,在公约和Metadata\\_Conventions全局屬性,請參考CF-1.6 (非CF-1.0、1.1、1.2、1.3、1.4或1.5) ,因為CF-1.6是第一個包含與 Discrete Sampling 几何相關的變更的版本 (副秘书长) 公约。
        *   **ERDDAP™和 CF DSG 有不簡單的關係** 
        *   ERDDAP™可以在已經有效的 DSG 檔案中從來源數據集中產生有效的 DSG 数据集 (s) ,或者出自未為 DSG 設定的來源資料集,但可以通过變更中繼資料來完成 (有些是ERDDAP- 特制,以提供更一般的方法來指定 DSG 設定) .
        *   ERDDAP™載入數據集時會做很多有效性測試 。 如果有 cdm\\_data\\_ 類型的資料集 (或featureType) 屬性成功載入ERDDAP™那么ERDDAP™表示數據集符合 DSG 要求 (不然ERDDAP™以例外來解釋它發現的第一個問題) .
警告: 已成功載入的數據集似乎符合 DSG 的要求 (它有正確的屬性組合) ,但可能仍然不正確的設置,从而造成不正確的結果。.ncCF 和.ncCFMA 反應檔案 。 (軟體在某些方面是聰明的,在另一些方面是無知的。) 
        * 當您看到數據集的元数据時ERDDAP™, DSG 数据集似乎在ERDDAP內部格式 (巨型、 類似資料庫的表格) . 不是DSG格式的 (例如,尺寸和中繼資料不正確) , 但將數據集視為 DSG 数据集所需的資訊在元数据中 (例如,cdm\\_data\\_type=TimeSeries和cdm\\_tim\\_series=可變 *aCsvList of Station 相關可數* 全球中繼資料中, 以及一些變數的 Cf_%role=times系列%% id) .
        * 如果使用者要求將數據集分集放在.ncCF (a.ncDSG 的相關列印檔案格式的檔案) 或.ncCFMA 文件 (a.ncDSG 多层面陣列檔案格式的檔案) ,此檔案將是有效的 CF DSG 文件 。
警告:但是,如果建立數據集不正確 (讓中繼資料的承諾不真實) ,那么回應檔在技術上是有效的,但會在某种程度上不正確。
             
###### EDD 表格 cdm_ data_ 類型
* 对于 EDDTable 資料集, cdm_%data_%type 選項 (要求ERDDAP) 是
###### 點{#point} 
*   [點](#point)用于在不相關的時間和位置上 做一系列測量
    * 同其它所有 cdm% data 類型一樣, Point 數據集有經度、 纬度和時間變數 。
###### 配置{#profile} 
*   [配置](#profile)- 是在一個經度位置上 但是在一個以上的深度 (高度) . 數據集可能是這些設定檔的集合, 例如不同位置的7個設定檔 。 此 cdm\\_data\\_ 型態不意味著任何設定檔之間有任何邏輯連接 。
    
* 變數之一 (例如, profile QQ 數字) MUST 有變數屬性 CfQXrole=profile====d 以辨識唯一能辨識設定檔的變數 。
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
如果沒有其他變數适合, 請考慮使用時間變數 。
###### cdm\\_profile 變化{#cdm_profile_variables} 
* 數據集 MUST 包含全局屬性[cdm\\_profile 變化](#cdm_profile_variables),其中的值是用逗號分隔的變數列表,這些變數有每個描述檔的資訊。 對於指定的剖面檔, 這些變數的值必須是常數 。 例如,
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
MUST 清單包含 Cf\\_role=profile\\_id 變數和其他所有變數, 包含關於剖面、 時間、 經度與經度的資訊 。
清單中永遠不會包括高度、深度或任何觀測變數 。
     

\\[觀點 : cdm\\_data\\_type=Profile 很少使用。 實際上, 給定的數據集通常是 TimeSeriesProfile (在固定位置的設定檔) 傳染器檔案 (沿軌道的剖面) ,因此,应当正确确定。\\]  
###### 時間序列{#timeseries} 
*   [時間序列](#timeseries)-- 是一系列量度 (例如,海水温度) 一、定、度、度、深度 (高度) 位置。 (把它當作"站") 數據集可能是這些時間串的集合, 例如, 3 個不同位置的序列 。
    * 變數之一 (例如,站台) MUST 有變數屬性 CfQXRole=timeseriesQXid 以辨識獨一辨識站台的變數 。
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\_time序列{#cdm_timeseries_variables} 
* 數據集 MUST 包含全局屬性[cdm\\_time序列](#cdm_timeseries_variables),其中的值是逗號分隔的數據列表,其中包含每個站點的資訊。 對於給定的站點, 這些變數的值是常數的 。 例如,
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
列表 MUST 包含 Cf\\_role=timeseries\\_id 變數以及其他所有有站點資訊的變數, (高度或深度,如果有) .
此清單永遠不會包含時間或任何觀察變數 。
* 數據集可能有兩套經度變數:
    1. 一對常數的經度值 (即锚定位置) . 在ERDDAP™,給這些變數destinationName經度和經度的s, 將這些變數包含在 cdm\\_times系列的列表中 。
    2. 与每次觀察相關的精度和經度值 。 在ERDDAP™變數不同destinationNames (例如,精确Lat和精确Lat 龍) 不要把這些變數 列入cdm\\_times系列的可變清單中
其理由如下: 從理論角度來說, DSG 時序數據集的經度 (高度或深度,如果有) 站台位置必須持續。
###### 時間串文件{#timeseriesprofile} 
*   [時間串文件](#timeseriesprofile)- 是用在一個固定的經度位置上的一系列剖面 每個剖面都是多高度或深度的一套測量。 數據集可能是這些 TimeSeriesProfile 的集合, 例如, 12 個不同地點中的每一個地點都有一系列的設定檔 。
    * 變數之一 (例如,站台) MUST 有變數屬性 CfQXRole=timeseriesQXid 以辨識獨一辨識站台的變數 。
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * 變數之一 (例如, profile QQ 數字) MUST 有變數屬性 CfQXrole=profile====d 以辨識唯一能辨識設定檔的變數 。
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (給定的 profile 只需要對給定的時間序列獨一無二。) 如果沒有其他變數适合, 請考慮使用時間變數 。
    * 數據集 MUST 中包含全球屬性 cdm\\_timeseries 的變數, 其中的數值是一個逗號分隔的數據清單, 其中包含每個站點的資訊 。 對於給定的站點, 這些變數的值是常數的 。 例如,
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
包括Cf\\_role=timeseries\\_id變數和其他所有有本站資訊的變數,
清單中永遠不會包括時間、高度、深度或任何觀察變數 。
    * 數據集 MUST 包含全局屬性 cdm\\_profile\\_vatiables, 其中的數值是一個逗號分隔的變數列表, 其中包含每個描述檔的資訊 。 對於指定的剖面檔, 這些變數的值必須是常數 。 例如,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
列表 MUST 包含 Cf\\_role = profile\\_id 變數和其他所有有設定檔資訊的變數, 幾乎總是包含時間 。
清單永遠不會包括經度、高度、深度或任何觀察變數。
###### 曲線{#trajectory} 
*   [曲線](#trajectory)- 是沿軌道進行的測量序列 (穿越時空的路徑)   (例如,船舶在水中行走時的海水溫度) . 數據集可能是這些傳統的集合, 例如4艘不同艦只的序列。
    * 變數之一 (例如,船) MUST 的屬性為 cf\\_role=trajectory\\_id , 以辨識獨一辨識軌道的變數 。
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### 可變性{#cdm_trajectory_variables} 
* 數據集 MUST 包含全局屬性[可變性](#cdm_trajectory_variables),其中的值是數值的逗號分隔列表,其中包含每個軌道的資訊。 給定的軌道, 這些變數的數值必須是常數 。 例如,
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
列表 MUST 包含 Cf\\_role=trajectory\\_id 變數以及其它所有變數,
清單中永遠不會包括時間、經度、經度或任何觀察變數。
###### 傳染器Profile{#trajectoryprofile} 
*   [傳染器Profile](#trajectoryprofile)-是一系列沿軌道拍攝的圖片 數據集可能是這些傳統文件的集合, 例如14艘不同艦只拍攝的剖面圖序列。
    * 變數之一 (例如,船) MUST 具有變數屬性 CfQXrole=trajectory\\_id , 以辨識唯一能辨識軌道的變數 。
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * 變數之一 (例如, profile QQ 數字) MUST 有變數屬性 CfQXrole=profile====d 以辨識唯一能辨識設定檔的變數 。
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (給定的 profile 只需對給定的 profile 的 profile 。) 如果沒有其他變數适合, 請考慮使用時間變數 。
    * 數據集 MUST 包含全局屬性 cdm\\_trajectory\\_vatiables, 其中的數值是一個逗號分隔的變數列表, 其中包含每個軌道的資訊 。 給定的軌道, 這些變數的數值必須是常數 。 例如,
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
列表 MUST 包含 Cf\\_role=trajectory\\_id 變數以及其它所有變數,
清單中永遠不會包括與剖面相關的變數、時間、經度、經度或任何觀察變數。
    * 數據集 MUST 包含全局屬性 cdm\\_profile\\_vatiables, 其中的數值是一個逗號分隔的變數列表, 其中包含每個描述檔的資訊 。 對於指定的剖面檔, 這些變數的值必須是常數 。 例如,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
列表中包含 Cf\\_role=profile\\_id 變數, 以及其它所有包含剖面資訊的變數,
清單中永遠不會包括高度、深度或任何觀測變數 。
###### 其他{#other} 
*   [其他](#other)- 不需要 如果數據集不適合其他選項之一, 特别是如果數據集不包括經度、經度和時間變數, 請使用它 。
     
###### 附注{#related-notes} 
* 除「 其它 」 MUST 外, 所有 EDDTable 資料集都有經度、 纬度和時間變數 。
* 有剖面圖的數據集 MUST 有高度變數、深度變數或[cdm 高度 +oxy](#cdm_altitude_proxy)變數 。
* 如果您不能讓數據集符合理想的 cdm\\_data\\_ 類型的所有要求, 請使用「 點」 (要求很少) 或“ 其他” (不需要的) 相反。
* 此資訊被使用於ERDDAP™例如,以各种方式,但大多用于制作.ncCF 文件 (.nc符合與數據集的 cdm\\_data\\_%%%%%% 類型相關的相關的 Rgged 陣列顯示檔) 和.ncCFMA 檔案 (.nc符合數據集的 cdm\\_data\\_%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%) A. 概 述[分解采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)章次[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)先前被命名為「CF點觀察公约」。
* 提示 : 這些數據集的正确設定[subsetVariables](#subsetvariables)通常為 cdm\\_... 例如, 在 TimeSeriesProfile 中, 使用 cdm\\_time 序列 + cdm\\_ profile\\_ variables 。
###### contributor\\_name {#contributor_name} 
*   [ **contributor\\_name** ](#contributor_name)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 以建議的方法來辨識對此數據集有贡献的人、組織或專案 (例如, 資料的原始建立者, 在由此數據集的建立者重新處理之前) . 例如,
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
如果「 贡献者 」 不真正應用於數據集, 請省略此屬性 。 相比[creator\\_name](#creator_name),
###### contributor\\_role {#contributor_role} 
*   [ **contributor\\_role** ](#contributor_role)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 以建議的方法來辨識[contributor\\_name](#creator_name). 例如,
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
如果「 贡献者 」 不真正應用於數據集, 請省略此屬性 。
###### 公约{#conventions} 
*   [ **公约** ](#conventions)  (從[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)中繼資料標準) 大力推荐。 (未來可能會需要它) 數值是此數據集遵循的以逗號分隔的元数据標準清單 。 例如:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
常用的元数据常规ERDDAP™即:
    
    *   [COARDS公约](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)是CF的前身。
    *   [气候和预报 (CF) 公约](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)是其中很多建議和需要的屬性的来源ERDDAP. 目前版本的CF被确定为"CF-1.6".
    * 其NetCDF數據集發現屬性常规 (ACDD) 是其中很多建議和需要的屬性的来源ERDDAP. 最初的 1.0 版本的 ACDD (伊森·戴維斯的精彩作品) ,[Unidata數據集探索 v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)目前 (自2015年起) 1.3版本的ACDD被确定为[ACDD-1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3). 如果您的數據集一直在使用UnidataDataset Discovery v1.0, 我們鼓勵你[切換您的數據集以使用 ACDD- 1. 3](#switch-to-acdd-13).
    
如果您的數據集遵循一些附加的中繼資料標準, 請在 CSV 清單中加入此名稱 。
###### coverage\\_content\\_type {#coverage_content_type} 
*   [ **coverage\\_content\\_type** ](#coverage_content_type)  (從[ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata)中繼資料標準) 是以建議的方法來辨識網格化資料的類型 ( inEDDGrid数据集) . 例如,
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
唯一允許的數值是辅助資訊、影像、模型 量 度 (生成 ISO 19115 中繼資料時的默认值) ,質量資訊,參考資訊,以及主题分類。 (不要使用此標籤來建立 EDDTable 資料集 。)   
###### creator\\_name {#creator_name} 
*   [ **creator\\_name** ](#creator_name)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 以建議的方式辨識人物、組織或專案 (如果不是特定的人或组织) , (或最近的后处理) 中。 例如,
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
如果數據被大量重新處理 (例如,從第2層到第3或第4層的衛星資料) ,然后通常重新處理器被列為創始者,原始創始者通过[contributor\\_name](#contributor_name). 相比[專案](#project)這更灵活,因為它可能會認出一個人,一個組織,或者一个项目。
###### creator\\_email {#creator_email} 
*   [ **creator\\_email** ](#creator_email)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 是以建議的方式确定電子郵件地址 (格式正确) 提供與創造者聯繫的方法 例如,
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
###### creator\\_url {#creator_url} 
*   [ **creator\\_url** ](#creator_url)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 是由建議的方法來辨識建立數據集的組織的 URL , 或是有建立者關於此數據集資訊的 URL (但這才是目的[infoUrl](#infourl)) . 例如,
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
###### date\\_created {#date_created} 
*   [ **date\\_created** ](#date_created)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 表示數據最早建立的日期的方法 (例如, 加工成此表格) ,以ISO 8601格式。 例如,
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
如果數據定期新增資料, 這是首次提供原始資料的日期 。
###### date\\_modified {#date_modified} 
*   [ **date\\_modified** ](#date_modified)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 是以建議的方法來辨識上次修改資料的日期 (例如,修正錯誤或新增最新資料時) ,以ISO 8601格式。 例如,
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
###### date\\_issued {#date_issued} 
*   [ **date\\_issued** ](#date_issued)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 是以 ISO 8601 格式,例如 2012-03-15 的推荐方法,以确定首次向他人提供資料的日期。 例如,
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
例如,數據集可能有[date\\_created](#date_created)2010-01-30,但只公布于2010-07-30。date\\_issued使用率低于date\\_created和date\\_modified. 如果date\\_issued被省略,假定它和date\\_created.
###### 全球drawLandMask {#global-drawlandmask} 
*   [ **drawLandMask** ](#global-drawlandmask)-- 這是 OPTIONAL 全球屬性 。ERDDAP™  (沒有元数据標準) 指定數據集 Make A Graph 表格上的「 Draw Land Mask 」 選項的預設值 ( *datasetID* 圖片) 和 &. 例如,
    ```
    <att name="drawLandMask">over</att>  
    ```
看[drawLandMask概述](#drawlandmask).
###### featureType {#featuretype} 
*   [ **featureType** ](#featuretype)  (從[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)中繼資料標準) 是IGNED和/或重置。 如果數據集[cdm\\_data\\_型態](#cdm_data_type)合适ERDDAP™會自動使用它來建立featureType屬性。 所以,你不需要加上它。
    
然而,如果你正在使用[来自 NcCFF 的 EDD 表格](#eddtablefromnccffiles)以建立從跟隨[CF 分解采样 (副秘书长) 標準](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)檔案本身一定有featureType正确定義, 所以ERDDAP™可以正确讀取檔案。 這是CF DSG對這類檔案的要求的一部分。
     
###### 歷史{#history} 
*   [ **歷史** ](#history)  (從[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)和[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 是一個建議的多行串列全局屬性, 包含數據所經過的每個處理階段的行 。 例如,
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * 最理想的是,每行都有ISO 8601:2004 (英) 格式化日期+時間Z (例如,2011-08-05T08:55:02Z) 之后是處理階段的描述 。
    *   ERDDAP™如果它不存在,就建立它。
    * 如果它已經存在ERDDAP™將新增資訊附加到已有資訊中 。
    * 歷史很重要, 因為它讓客戶端可以回溯到原始資料來源 。
###### infoUrl {#infourl} 
*   [ **infoUrl** ](#infourl)是 REQUIRED 的全局屬性, 包含更多關於此資料集的網址 (通常在源碼機構的網站上) . 例如,
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * 要么數據集是全局的[源屬性](#global-attributes)或全球&lt;addAttributes&gt; 包含此屬性 。
    *   infoUrl因為它讓客戶端能從原始來源找到更多資料。
    *   ERDDAP™顯示連結到infoUrl資料存取表 ( *datasetID* .html) 建立圖面網頁 ( *datasetID* 圖片) 和其他网页。
    * 如果網址有查詢部分 (在""之后?) 肯定已經是了[編碼百分比](https://en.wikipedia.org/wiki/Percent-encoding). 你需要在限制中編碼特殊字元 (除了初始的“ & ” 和主'=',如果有) 輸入表單% HH, 其中 HH 是字元的二位十六進位值 。 通常您只需要將一些 punctuation 字元 :% 轉換成% 25, &% 26, " 轉換成% 22,&lt;進入% 3C, = 到% 3D, &gt; 到% 3E, + 到% 2B,|進入% 7C,\\[進入% 5B,\\]轉換為% 5D, 空間轉換為% 20, 將 # 127 以上所有字元轉換為 UTF-8 格式, 然后% 將 UTF-8 格式的每個字節編碼為% HH格式 (向程序員求助) .
例如,( S)stationID「41004」
變成 &stationID% 3E% 2241004% 22
存取時一般需要百分比編碼ERDDAP透過瀏覽器以外的軟體。 瀏覽器通常會處理您的% 編碼 。
有些情況下, 您需要% 編碼除 A- Za- z0- 9_%之外的所有字元 &#33; ' ' () QQ, 但還是不要編碼初始的 '() 或主 。'='.
程式語言有做此工作的工具( 例如, 請參考Java是[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)  
和Java文稿的encodeURIComponent()[ [ ] ] ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) 而有
        [百分比為您編碼/解碼的网站](https://www.url-encode-decode.com/).
    * 自datasets.xml是 XML 檔案, 您也必須用 & - encode All ' &,' 。&lt;URL 中的 '和 '&gt;' 如 '和amp;' ,'&lt;', 和 'gt;' 在% 編碼后 。
    *   infoUrl是獨特的ERDDAP. 它不是任何元数据標準。
###### 机构{#institution} 
*   [ **机构** ](#institution)  (從[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)和[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 是 REQUIRED 的全局屬性, 其簡稱是此資料的來源( 通常為縮寫, 通常為&lt;20個字). 例如,
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * 要么數據集是全局的[源屬性](#global-attributes)或全球&lt;addAttributes&gt; 包含此屬性 。
    *   ERDDAP™顯示所有資料。 如果一個機構的名字長於20個字元, 在數據集清單中只可以看到前20個字元 (但可以把滑鼠游標放在相邻的「? 」 圖示上看到整個機構。) .
    * 若您將機構加入&lt;categoryAttributes&gt;  inERDDAP是[設定. xml](/docs/server-admin/deploy-install#setupxml)資料集ERDDAP主頁上的「按類別搜尋數據集」 。
###### 關鍵{#keywords} 
*   [ **關鍵** ](#keywords)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 是被建議的逗號分隔的單字列表和短句 (例如,[GCMD 科學關鍵字](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access)) 以一般方式描述數據集,而不假設數據集的任何其他知識 (例如,海洋数据包括海洋) . 例如,
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
自datasets.xml是 XML 文件, 字元和 ,&lt;,并且 &gt; 在象关键字一樣的屬性中 (例如,GCMD 科學关键字中的 &gt; 字符) 必須編碼為 &amp;,&lt;, 以及 & gt; 。
當數據集被載入ERDDAP,
    
    * 在任何GCMD關鍵字的开头加入「地球科學&gt;」。
    * GCMD 关键字轉換為標題大小寫 (即第一個字母是資本化的) .
    * 關鍵字重新排列為排序顺序, 並移除任何新行字元 。
     
###### keywords\\_vocabulary {#keywords_vocabulary} 
*   [ **keywords\\_vocabulary** ](#keywords_vocabulary)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 是一個建議的屬性: 如果您在关键字屬性中遵循了對單詞的指標 (例如,GCMD 科學關鍵字) 把指標的名字放在這裡 例如,
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### 授權{#license} 
*   [ **授權** ](#license)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 使用權限限制, 例如,
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * 如果 "\\[標準\\]在屬性值中發生, 它將被標準取代ERDDAP™授權&lt;標籤ERDDAP是
        \\[湯姆卡\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml檔案.
         
###### Metadata\\_Conventions {#metadata_conventions} 
*   [ **Metadata\\_Conventions** ](#metadata_conventions)來自已过时的[ACDD 1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)  (中Metadata\\_Conventions如 "Unidata數據集探索 v1.0") 元数据標準 。 屬性值是此数据集使用的以逗號分隔的元数据常规清單 。
如果數據集使用ACDD 1.0, 這個屬性是強烈建議的, 例如,
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
但是ERDDAP™現在建議使用ACDD-1.3。 如果你有[切換您的數據集以使用 ACDD- 1. 3](#switch-to-acdd-13),使用Metadata\\_Conventions使用&lt;公约 &gt;] (傳統) 相反。
###### processing\\_level {#processing_level} 
*   [ **processing\\_level** ](#processing_level)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 對處理的文字描述 (例如,[NASA 衛星數據處理水平](https://en.wikipedia.org/wiki/Remote_sensing#Data_processing_levels)例如,三级) 或质量控制水平 (例如,科學质量) 中。 例如,
    ```
    <att name="processing\\_level">3</att>  
    ```
###### 專案{#project} 
*   [ **專案** ](#project)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 是一個 OPTIONAL 屬性, 以辨識數據集是其组成部分的專案 。 例如,
    ```
    <att name="project">GTSPP</att>  
    ```
如果數據集不是專案的一部分, 請不要使用此屬性 。 相比[creator\\_name](#creator_name)中, (可能參與多項計畫的人或組織) .
###### publisher\\_name {#publisher_name} 
*   [ **publisher\\_name** ](#publisher_name)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 是以建議的方法來辨識要公布此數據集的人、組織或專案。 例如,
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
例如,你就是出版商,如果其他人或團體[已建立](#creator_name)數據集,你只是通過它重新使用ERDDAP. 如果「 publisher 」 不是真的應用於數據集, 請省略此屬性 。 相比[creator\\_name](#creator_name)出版商可能沒有大量修改或重新處理資料;
###### publisher\\_email {#publisher_email} 
*   [ **publisher\\_email** ](#publisher_email)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 是以建議的方式确定電子郵件地址 (格式化正確, 例如 : John\\_smith@ great.org) 提供與出版商聯繫的方法 例如,
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
如果「 publisher 」 不是真的應用於數據集, 請省略此屬性 。
###### publisher\\_url {#publisher_url} 
*   [ **publisher\\_url** ](#publisher_url)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 是以建議的方法來為發表數據集的組織确定網址, 或是用出版商對此數據集的資訊确定網址 (但這才是目的[infoUrl](#infourl)) . 例如,
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
如果「 publisher 」 不是真的應用於數據集, 請省略此屬性 。
###### real\\_time {#real_time} 
*   [ **real\\_time** ](#real_time)是全局字串屬性 (不從任何標準) 表示是否是實時數據集 。 例如,
    ```
    <att name="real\\_time">true</att>  
    ```
如果這是假的 (默认) ,ERDDAP™會缓存對檔案類型的回覆, 因為要先建立整個檔案ERDDAP™可以開始將回應寄給使用者, 再用到15分鐘左右 (例如,.nc,.png) .
如果這是真的ERDDAP™永遠不會缓存回應檔案, 永遠會傳回新建立的文件 。
###### sourceUrl屬性{#sourceurl-attribute} 
*   [ **sourceUrl** ](#sourceurl-attribute)是一個全球屬性, 包含資料來源的 URL。 例如,
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (但都放在一線) 
    *   ERDDAP™通常會自動建立此全局屬性 。 二個例外是 EDD Table fromHyrax檔案與 EDD Table from ThreddsFiles 。
    * 如果來源是本地檔案, 而檔案是由您的組織建立, 請使用
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * 如果來源是本地資料庫, 而資料是由您的組織建立, 請使用
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *   sourceUrl它讓客戶端可以回溯到原始資料來源。
    *   sourceUrl是獨特的ERDDAP. 它不是任何元数据標準。
        
###### standard\\_name\\_vocabulary {#standard_name_vocabulary} 
*   [ **standard\\_name\\_vocabulary** ](#standard_name_vocabulary)  (從[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 是個建議的屬性, 以表示受控字串的名稱 。[standard\\_name](#standard_name)s被拿走。 例如,
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
第77版[CF 標準名稱表](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html).
         
##### subsetVariables {#subsetvariables} 
*    **subsetVariables**   (只限 EDD Table 数据集) 是建議的全局屬性, 讓您指定一個以逗號分隔的列表 [S]&lt;dataVariable&gt;] (可數據變化)  [destinationName](#destinationname)s 以辨識數值有限的變數 (說明另一种方式:每個數值都有許多重复的變數) . 例如,
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
如果存在此屬性, 數據集將會有 *datasetID* . 子集網頁 (和每個數據集清單的連結) 它讓使用者可以快速和輕鬆地選擇數據中的各种子集。
    * 每次數據集被載入,ERDDAP載入並儲存在磁碟上 。 () 子集的组合 變數的值 。ERDDAP™可以看到subsetVariables表格和處理非常快 (尤其與讀取數量數據檔或從數據庫或其他外部服務取得資料相比) .
    * 可以ERDDAP™做三件事:
        1. 它允許ERDDAP™在資料存取表、 Make A Graph 網頁和. subset 網頁上放入可能值清單。
        2. 它允許ERDDAP™提供數據集的 . subset 網頁。 這個頁面很有趣, 因為它很容易找到這些變數的數值的合併, 對一些數據集和一些變數來說非常非常難。 (幾乎不可能) . 那麼,所有使用者都要求分開 () 子集 變數會很快的
        3. 如果有使用者要求只指那些變數的子集,ERDDAP™可以快速讀取subsetVariables表格,并回复要求。 這能省下很多時間和精力ERDDAP.
    * 命令destinationName排序 *datasetID* . subset 網頁, 所以您通常會先指定最重要的變數, 然后指定最不重要的變數 。 例如,對數個站點的時序數據集,你可能會用到,例如,
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
數值按站點排序。
    * 顯然是您選擇的變數subsetVariables列表,但建議的用法是:
        
通常包含您想要的變數ERDDAP™在數據集的資料存取表格中顯示下載選項清單 (.html) 和 Make-A- Graph 圖片 (圖片) 网页。
        
一般情况下, 包含有數據集功能資訊的變數 (台站、剖面和/或轨距,尤其是[cdm\\_time序列](#cdm_timeseries_variables),[cdm\\_profile 變化](#cdm_profile_variables),[可變性](#cdm_trajectory_variables)) . 這些變數只有幾個不同的數值, 所以它們在下載清單中效果良好 。
        
不要包含任何與個人觀察相關的數據變數 (例如,時間、溫度、盐度、流速) 在subsetVariables列表。 這些變數有太多不同的數值, 所以下載清單會很慢, 很難用 (或者不工作) .
        
    * 如果這些變數的不同組合數量大于 1,000,000 左右, 你应该考虑限制subsetVariables指定把不同组合的数量减少到100万以下;否则, *datasetID* . subset 網頁可能會慢慢產生 。 在极端情况下, 數據集可能無法載入ERDDAP™因為產生不同組合的清單使用太多的記憶力。 如果是, 您必須移除一些變數subsetVariables列表。
    * 如果一個子集變數的區別數值大于 20,000, 您就应当考虑不將這個變數列入清單中 。subsetVariables; 否則要花很長時間傳送 *datasetID* ...子集, *datasetID* 圖片和 *datasetID* .html網頁. 在Mac上, 折中方案是: 在使用者不可能從下載清單中選擇數值時, 從清單中移除變數 。
    * 你應該檢查每個數據集 看看是否subsetVariables設定是好的。 如果來源數據伺服器慢而耗時太長 (失敗) 以下載資料,或減少指定的變數,或移除subsetVariables全球屬性。
    * 子集 變數很有用 所以如果您的數據集適合, 請建立subsetVariables屬性。
    * 從 EDD 表格SOS自動新增
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
當建立數據集時。
        * 可能的警告:如果使用者使用 *datasetID* . subset 網頁選擇一個有馬車回轉或新線字元的值, *datasetID* . subset 將會失敗 。ERDDAP™因為一些HTML的細節, 總之, 從資料中移除馬車回轉和新線字元, 幫助您解決問題, 如果 EDD Table 。subsetVariables資料表方法ERDDAP測試會造成麻煩的數據值, 它會發送一個警告, 并附上一份違法數值清單到電子郵件中 一切 到 setup.xml 指定的電子郵件位址 。 那樣的話,你知道需要修好什麼
        *    **預產生的子集表格 。** 通常,當ERDDAP™載入數據集,它要求有區別 () 數據來源的子集變數數據表, 只是通過正常的數據要求 。 在某些情况下, 此資料不能從資料來源取得, 或是從資料來源取得可能很難於資料來源伺服器 。 如果有,您可以提供表格,其中包含信息.json或 .csv 檔名 *湯姆卡* /内容/erddap/子集/ *datasetID* .json  (或.csv) . 如果現在ERDDAP™當數據集被載入並用作子集數據的來源時, 會讀取一次 。
            * 如果讀取它時有錯誤, 數據集將無法載入 。
            * 它必須有完全相同的列名 (例如,同一案件) 如&lt;subsetVariables&gt;,但柱子可能依次排列。
            * 它可能會增加列 (它們會被移除 新的冗余行會被移除) .
            * 缺失的數值應該是缺失的數值 (不是假數字像 -99) .
            *   .json檔案可能更難建立, 但會處理好 Unicode 字元 。.json如果您用它建立檔案, 檔案很容易建立ERDDAP.
            * .csv 檔案很容易使用, 但只适合 ISO 8859-1 字元 。 .csv 檔案 MUST 在第一行有列名, 在之後的列上有資料 。
        * 大型數據集或什麼時候&lt;subsetVariables&gt; 設定錯誤, 數值的組合表可以大到造成太多資料或數值錯誤 。 解答是從清單中移除變數&lt;subsetVariables&gt; 數值很多, 或是按需要移除變數, 直到表格大小合理 。 不管錯誤, 部份ERDDAP™使用subsetVariables系統不起作用 (例如,網頁載入速度非常慢) 當有太多的行 (例如,100多万) 在桌子上。
        *   subsetVariables與指定哪些變數使用者可以在限制下使用無關, 即使用者如何要求數據集子集 。ERDDAP™總是允許限制指向任何變數 。
###### 時間單位{#time-units} 
[時間和時間戳](#time-units)列應該有 ISO 8601: 2004 (英) 格式化日期+時間 Z弦 (例如,1985-01-31T15:31:00Z) .
             
###### 摘要{#summary} 
*   [ **摘要** ](#summary)  (從[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)和[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 是 REQUIRED 全局屬性, 對數據集的描述很長( 通常是 )&lt;五百字). 例如,
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * 要么數據集是全局的[源屬性](#global-attributes)或全球&lt;addAttributes&gt; 包含此屬性 。
    * 摘要非常重要, 因為它讓客戶端可以讀取對數據集的描述, 其信息比標題多,
    * 建議:請將摘要寫下來, 記住要包括[五W和一H](https://en.wikipedia.org/wiki/Five_Ws): 誰創造了數據集 ? 收集了哪些信息? 數據是什麼時候收集的? 在哪里收集的? 為什麼收集? 怎么收集的?
    *   ERDDAP™在資料集的資料存取表單上顯示摘要 ( *datasetID* .html) 建立圖面網頁 ( *datasetID* 圖片) 和其他网页。ERDDAP™在建立FGDC和ISO 19115文件時使用摘要。
###### testOutOfDate {#testoutofdate} 
*   [ **testOutOfDate** ](#testoutofdate)  (選擇性ERDDAP- 特定的全局元数据屬性, 而不是任何標準) 以簡化方式指定,當近实时数据集的資料被視為过时,指定為now- *n 單位* 例如,now-通常在時間值後24 -48小時出現的數據 2 天 。 預測數據, 請使用 **+**  *n 單位* 例如,目前+6天的預測數據最多是8天。 (看[now- *n 單位* 語法描述](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now).) 如果數據集的最大時間值比指定的時間更近, 數據集會被視為更新 。 如果最大時間值比指定時間要大, 數據集會被认为是最新的 。 對於过时的數據集來說 資料來源大概有問題 所以ERDDAP™無法從最近時點存取資料 。
    
其testOutOfDate值在[allDatasets数据集](#eddtablefromalldatasets)在您的ERDDAP. 也用于計算 OutDate 索引中的另一列allDatasets數據集。
如果索引是&lt;1, 數據集被认为是最新的 。
如果索引是&lt;=1,此数据集被视为过时。
如果索引是&lt;=2,此数据集被視為非常过时 。
    
其testOutOfDate值也被使用ERDDAP™生成 https://*yourDomain*/erddap/outOfDateDatasets.html 网页 ([示例](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) 顯示有&lt;testOutOfDate&gt; 標籤, 數據集的排名為超時 。 如果您改變了檔案型態 (從.html到.csv,.jsonlCSV,.nc,.tsv...) ,您可以以不同的文件格式得到此信息。
    
如果可能,[產生 DatasetsXml](#generatedatasetsxml)新增atestOutOfDate全局屬性addAttributes數據集 此值是根據 Generate DatasetsXml 可用的資訊提出的建議 。 如果價值不適合,改一下吧
    
"过时"和[&lt;重新載入 每一個NMinutes &gt;] (每分鐘重載) ,它涉及如何更新ERDDAP數據集的知識是。 其&lt;testOutOfDate&gt; 系統假定ERDDAP資料集的知識是最新的 。 問題&lt;testOutOfDate&gt; deals is: 資料來源似乎有問題,ERDDAP?
    
###### 標題{#title} 
*   [ **標題** ](#title)  (從[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)和[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 是 REQUIRED 的全局屬性, 包含對數據集的簡稱( 通常是 )&lt;=95字符). 例如,
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * 要么數據集是全局的[源屬性](#global-attributes)或全球&lt;addAttributes&gt; 包含此屬性 。
    * 標題很重要, 因為每個顯示的數據集清單ERDDAP  (搜索結果以外的) 以字母順序列出數據集。 所以, 如果您要指定數據集的順序, 或是把一些數據集集中在一起, 您必須以此來建立標題 。 很多數據集清單 (例如,應答類別搜尋) ,以不同的顺序顯示完整列表的子集。 所以每個數據集的標題應該獨立
    * 如果標題有「DEPECATED」二字, (所有大寫字母) ,那么数据集在搜索中會得到较低的排名。
             
##### &lt;axisVariable& gt; Name{#axisvariable} 
* [ ** &lt;axisVariable&gt; ** [ [ ] ] (轴可變) 用于描述尺寸 (也叫做"轴") .
為EDDGrid數據集, 一个或多个axisVariable標籤是 REQUIRED, 以及所有的[dataVariables](#datavariable)總是共享/ 使用所有轴變數 。 ([為什麼?](#why-just-two-basic-data-structures) [如果他們沒有呢?](#dimensions))   
數據變數的每個維度都有一個轴變數 。
Axis 變數必須指定為數據變數使用的順序 。
(EDDT 数据集不能使用)&lt;axisVariable&gt; 標籤。 )
例如:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt;axisVariable&gt; 支援以下子目 :
###### &lt;sourceName* 格特;{#sourcename} 
* [&lt;sourceName\\&gt; (# 源碼名稱) -- 此變數的資料來源名稱 。 這就是這個名字ERDDAP™將在從資料來源要求資料時使用。 這就是這個名字ERDDAP™當資料來源傳回資料時會尋找。 這很敏感 這是需要的。
###### &lt;destinationName* 格特;{#destinationname} 
* [&lt;destinationName\\&gt; (目的地名) 要顯示的變數的名稱ERDDAP™使用者。
    * 這是選擇 如果缺席,sourceName被使用。
    * 這有用,因為它讓您改變了密碼或奇跡sourceName.
    *   destinationName案件敏感。
    *   destinationNameS 必须從字母開始 (阿 -Z 阿 -Z) 和 一定要有 0 或更多字符 (A -Z, A -z, 0 -9, 和...) . (之前是允許的ERDDAP™1.10版。) 此限制可以讓轴變數名稱在ERDDAP™,在回應檔案中,以及在使用這些檔案的所有軟體中,包括程式語言 (像Python,Matlab和Java文稿) 。
    * 在EDDGrid數據集[經度、纬度、高度、深度和時間](#destinationname)轴變數特殊 。
         
###### axisVariable &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [&lt;addAttributes&gt;] (# 可變的補充屬性) 定義一套屬性 ( *名稱* = *值* ) 被加入到變數的來源屬性中, 以建立變數的综合屬性 。
如果變數[源屬性](#variable-addattributes)或&lt;addAttributes&gt; 包含[scale\\_factor和/或add\\_offset](#scale_factor)屬性, 它們的數值會被用來解開資料來源, 然后再分发到客戶端
     (成果 值=來源 值 QQscale\\_factor+add\\_offset) . 已解開的變數會是同樣的資料類型 (例如浮) 如scale\\_factor和add\\_offset值。
         
##### &lt;dataVariable& gt; Name{#datavariable} 
* [ ** &lt;dataVariable&gt; ** [ [ ] ] (可數據變化) 是需要的 (几乎所有的數據集) 標籤&lt;用于描述數據變數的 data set &gt; 標籤。 此標籤必須有 1 個或更多例 。 例如:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt;dataVariable&gt; 支援以下子目 :
###### &lt;sourceName& gt; Name{#sourcename-1} 
* [&lt;sourceName&gt;] (# 源碼名稱) -- 此變數的資料來源名稱 。 這就是這個名字ERDDAP™將在從資料來源要求資料時使用。 這就是這個名字ERDDAP™當資料來源傳回資料時會尋找。 這很敏感 這是需要的。
###### 群組{#groups} 
CF增加了對使用CF v1.8的群組的支持. 從2020年起NetCDF工具支援 將變數放入群組.nc文件。 實際上,這只是意味著變數有很長的名稱來辨識群組 (s) 和變數名稱, 例如 group1a/ group2c/ varName 。ERDDAP™轉換變數中的 "/" 支援群組&lt;sourceName&gt; into "\\_" 在變數中&lt;destinationName&gt;, 例如 group1a QQGroup2c\\_varName. (當你看到這個時,你應該明白, 群組只是一個語法會議。) 當變數列出於ERDDAP™,一個群組中的所有變數會一起出現,模仿下一個群組.\\[如果ERDDAP™生成達塔斯 Xml, 執行不及有群組的來源檔案, 請發送樣本檔案給Chris 。 約翰在諾亞戈夫\\]

EDD Table FromFiles 資料集可以使用一些特別編碼, 假的sourceNames 以定義新的數據變數, 例如, 推廣全局屬性為數據變數 。 看[此文件](#pseudo-sourcenames).
###### HDF结构{#hdf-structures} 
從開始ERDDAP™v2.12,EDDGrid來自 NcFiles 和EDDGrid來自 Nc 檔案 未包裝可讀取「 結構」 中的資料 。.nc4和.hdf4份文件。 要辨識從一個結構中產生的變數,&lt;sourceName&gt; 必須使用格式 : *完全結構Name* | *成員Name* ,例如群組1/myStruct|我的會員

###### 固定值來源名稱{#fixed-value-sourcenames} 
在 EDDTable 資料集中, 如果您要建立變數 (單一固定值) 使用 :
```
    <sourceName>=*fixedValue*</sourceName>  
```
初始等值符號顯示ERDDAP™固定 價值會跟隨。

* 对于數值變數, 定值必須是單一個限值或 NaN (案件不敏感,例如:QQNAN) .
* 对于字符串變數,定值必須是單一的,[JSON 樣式字串](https://www.json.org/json-en.html)  (用\\ 字符逃出的特殊字符) ,例如,"我的""Special\""弦"。
* 对于時間戳變數, 請指定固定值為數字"seconds since 1970-01-01T00:00:00Z"和使用
單位=自1970-01-01T00:00Z.
    
其他標籤&lt;dataVariable&gt; 工作似乎是個常數。
例如, 要建立一個叫做高度的變數, 固定值為 0.0 (浮) ,使用:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

特殊情況下,您甚至可以指定actual\\_range新增屬性, 它會取代目的Min 和目的Max 的期望值 (不然,必等于 值) .
 
###### 文稿來源名稱/已執行變數{#script-sourcenamesderived-variables} 
從開始ERDDAP™v2.10, a[檔案中的 EDD 表格](#eddtablefromfiles),[數據庫中的 EDD 表格](#eddtablefromdatabase),或[檔案名稱中的 EDD 表格](#eddtablefromfilenames)數據集&lt;sourceName&gt; 可以
表示式 (數值為單值的方程式) ,使用格式
```
    <sourceName>=*expression*</sourceName>  
```
或文稿 (傳回單值的一串語言) ,使用格式
```
    <sourceName>=*script*</sourceName>  
```
ERDDAP™依靠[Apache 專案](https://www.apache.org/) [Java表示語言 (切斯勒) ](https://commons.apache.org/proper/commons-jexl/)  (授權 :[阿帕奇語Name](https://www.apache.org/licenses/LICENSE-2.0)) 以評估表达式並執行文稿。
一個給定的新變數的計算是在結果的一行內完成的, 对所有一行都重复 。
表示式和文稿使用 aJava-而且Java文稿類型的語法和可以使用任意
[JEXL 中包含的操作符和方法](https://commons.apache.org/proper/commons-jexl/reference/syntax.html).
文稿也可以使用方法 (函數) 從這些課:
*   [行事曆2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2),它是 com.cohort.util.Calendar2 中一些靜态、時間和行事曆相關方法的包裝工具 ([授權](/acknowledgements#cohort-software)) . 例如,
行事曆2. Parse ToEpochseconds ( *來源時間, 日期 時間格式* ) 會解析來源 時光字串通過日期 Time Format 字串返回 a"seconds since 1970-01-01T00:00:00Z"  (時區秒) 雙值。
*   [數學](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math),它可以包裝几乎所有的靜態數學方法[java.lang。 數學](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html). 例如, Math.atan2 ( *y, x* ) 接收矩形座標 (y, x) 返回极地座標 (雙倍數列\\[r, 西塔\\]) .
*   [數學2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2)以 com. cohort. util 表示。 數位2 ([授權](/acknowledgements#cohort-software)) . 例如,
數位圓形 ( *d, nPlaces 中* ) 到小數點右邊的指定數字數字 。
* 字符串, 它讓您可以存取所有 靜态的, 字串相關的方法 。[java.lang。 字符串](https://docs.oracle.com/javase/8/docs/api/java/lang/String). 字符串物件在ERDDAP™表示式和文稿可以使用任何相關的Java如Java.lang所述。 字符串文件 。 例如, String. value of (d) 將雙數值 d 轉換為字串 (雖然您也可以使用"'+d") .
*   [字符串2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2),是 com.cohort.util.String2 中大部分靜态、弦和陣列相關方法的包裝工具 ([授權](/acknowledgements#cohort-software)) . 例如, String2.zeroPad ( *數字, n 數字* ) 將在數字字串的左邊加上0's, 使數字總數為 nDigits (例如,字符串2.zeroPad ("6",2) 返回"06") .
*   [行](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row),它有非穩定的方法來存取來源資料表格目前行中各列的資料。 例如, 行. 欄 ("年份") 將"年份"一欄的值讀作字符串,而第1行. 英寸 ("年份") 將「 年份 」 欄的值讀作整數。

出于安全原因,表情和文稿不能使用除那6种之外的其他類別.ERDDAP™建立預設的黑名單來實施此限制 (列出所有類別的黑名單) 然后是白名單 (特別允許以上6個課) . 如果您需要其他方法或課程來做您的工作, 請將您的請求郵件給克里斯 。 約翰在諾亞戈夫
    
###### 效率
就從檔案數據集看 EDD Table 而言, 只有非常,非常微小的 (可能不明显) 減慢這些變數的數據要求 。 對 EDD Table FromDatabase 來說, 包含這些變數限制的要求有巨大的速度罰( 例如, ( & 經度0360 &gt; 30&經度0360) 。&lt;數據庫必須把更多數據還給ERDDAP™  (很耗時的) 所以ERDDAP™可以建立新的變數并施用限制。 為了避免最糟糕的情況 (沒有限制被傳送到數據庫) ,ERDDAP™輸出錯誤訊息, 以便資料庫不必返回表格的全部內容 。 (如果您要绕過此項目, 在非標籤列中加入限制, 它將永遠是真實的, 例如( T)&lt;3000-01-01. ) 因此,有了EDDTable FromDatabase,在數據庫中建立一個衍生列可能總是更好,而不是使用sourceName= 寫入ERDDAP.

###### 如何表達的概述 (文稿) 已使用 :
對於一個使用者的表格資料要求,ERDDAP™從一系列來源檔案中取得資料 。 每個來源檔案會產生原始表格 (直接從來源) 數據ERDDAP™然后逐行翻過原始資料表格, 評估每個行的表示式或文稿一次, 以建立一個新的欄位, 將這個表示式或文稿作為sourceName.
    
###### 產生 DatasetsXml
注意生成達塔斯 需要建立變數時, Xml 完全不知道&lt;sourceName&gt;= *表示式* &lt;/sourceName&gt;. 您必須在datasets.xml手

###### 表示式示例 :
以下是一些完整的數據變數例子, 這些變數用表示式來建立一列新的數據 。 我們期望這些例子 (及其變體) 包含所有表达式的95%sourceNames.

###### 合并单独的"日期"和"time"列為 :
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
那sourceName表示式會新增"time"從「 日期」 調整字符串值 (yyyy-MM-dd) 和"time"  (HH:mm:s:s) 在來源檔案每行的列上,並將字串轉換成 a"seconds since 1970-01-01"  (時區秒) 雙值。

或者說,你必須自訂時間格式字串來處理每個數據集的來源日期和時間列中的特定格式,看看
[文件](#string-time-units).

技術上,你不用用 行事曆2. Parse ToEpochseconds () 以將日期+時間合併成時空 。 你可以把日期+時間串傳到ERDDAP™并指定格式(例如,
yyyy-MM-ddT'HH: mm: s' Z') 通过單位屬性 。 但轉換成 objectSeconds 有很大的優點, 特別是 EDD Table FromFiles 可以輕易地追蹤到每個檔案中的時間數值範圍,

一個相關的問題是需要從來源建立一個统一的日期+時間欄, 答案非常相似,但你通常需要零打很多字段,例如,月份 (1 - 12) 和日期 (1 - 31) 總有兩個數字 以下是年、月、日期的例子:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
一個相關的問題是需要將來源表的分度、分數和秒列中的資料合并, 以整數的形式建立一個统一的纬度或經度欄。 例如,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### 將經度為 0 - 360 ° 的「 龍 」 列轉換為經度為 -180 - 180 ° 的「 龍 」 列 。
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
那sourceName表示式會從來源檔案每行的「 lon」 欄中轉換雙數值, 產生新的「 經度 」 欄位 (估計值為 0 - 360) ,並將它轉換成 -180 至 180 倍值。

如果您想要將 -180 - 180 ° 的來源經度值轉換為 0 - 360 °, 請使用
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
命名兩個經度變數 :
如果數據集有兩個經度變數 我們建議使用destinationName= 180 - 180°變數的經度和destinationName=經度0360 (經度 0-360°) 0 - 360°變數。 這很重要, 因為使用者有時會使用Advanced Search來搜尋特定經度範圍內的資料 。 如果所有數據集的經度一致為 -180 - 180 °, 搜尋效果會更好 。 另外,數據集的地理空间的Grabelon\\_min,地理空间的Grabelon\\_max,最西端的東方的Easting和最東端的Eastings全球屬性將以一致的方式被設定. (經度值 -180 至 180 °) ;
    
###### 轉換一欄名為“ tempF ” , 其溫度值為%%% 。 F 變成一列, 命名為「 tempC 」, 溫度為%%% 丙:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
那sourceName表示式轉換浮動度 &#123;&#125; 產生新的「 tempC 」 欄位 從來源檔案每行的"tempF"欄中的 F 值到浮度 C值

注意, 您的數據集可以有兩個原始的臨時 F 變數與新臨時 C 變數與另一個變數
```
    <sourceName>tempF</sourceName>
```
###### 將風速和方向列轉換成兩列, 包含 u, v 元件
* 要制作 u 變數, 使用
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* 要產生 v 變數, 使用
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
或者,給你,v:
* 要制作速度變數, 使用
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* 要做方向變數, 使用
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### 文稿示例:
以下是使用劇本, 不只是表示,sourceName. 我們期望劇本,而不是表情, 不會經常需要。 在此情况下, 目標是返回一個非NaN 缺失的值 (-99) 的溫度值。 注意文稿是"="之后的部分.
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### 硬旗
如果您改變了定義於 a 中的表示式或文稿sourceName您必須設定[硬旗](/docs/server-admin/additional-information#hard-flag)數據集的ERDDAP™刪除所有資料集的快取資訊, 重新讀取每個資料檔 (使用新表达式或文稿) 下次它加載数据集。 或者,你可以使用[達斯Dds](#dasdds)也就是設立硬旗

###### 百分比編碼
這只是很少相关的: 因為表情和腳本都寫在datasets.xml,是 XML 文件,您必須% 編碼任何&lt;, & 字元&lt;, & gt; 和 &amp; 。

###### 共同的問題
一個共同的問題是您會與sourceName= *表示式* 但結果的數據一欄只是缺少數值。 或者,新列的某些行有缺失值,你認為他們不該。 根本的問題是 表情有些不對勁ERDDAP將此錯誤轉換成缺失值。 為了解決問題

* 看看這個表情 看看問題可能是什么
* 看里面[log.txt](/docs/server-admin/additional-information#log),它會顯示每個新欄目建立过程中產生的第一個錯誤訊息。

共同原因有:

* 你用錯案子了 表示式和文稿對大小寫敏感 。
* 你漏掉了課名 例如,您必須使用 Math.abs () 不只是腹肌 () .
* 你沒有轉換字型 例如, 如果參數值的數據型態是 String 且您有雙倍數值, 您需要將雙倍數值轉換成 String 。
* 表示式中的列名稱不完全符合檔案中的列名稱 (或者某些檔案中的名字可能不同) .
* 表示式中有語法錯誤 (例如,缺失或额外 ") ' )

如果你被困住或需要幫助
請包含細節,看看我們[部分](/docs/intro#support).
        
###### &lt;destinationName& gt; Name{#destinationname-1} 
* [&lt;destinationName&gt;] (目的地名) -- 要顯示和使用的變數的名稱ERDDAP™使用者。
    * 這是選擇 如果缺席,[sourceName](#sourcename)被使用。
    * 這有用,因為它讓您改變了密碼或奇跡sourceName.
    *   destinationName案件敏感。
    *   destinationNameS 必须從字母開始 (阿 -Z 阿 -Z) 和 一定要有 0 或更多字符 (A -Z, A -z, 0 -9, 和...) . (之前是允許的ERDDAP™1.10版。) 此限制可以讓資料變數名稱在ERDDAP™,在回應檔案中,以及在使用這些檔案的所有軟體中,包括程式語言 (像Python,Matlab和Java文稿) 。
    * 在 EDDTable 資料集中,[經度、纬度、高度 (深度) 時間](#destinationname)數據變數是特殊的。
             
###### &lt;資料 類型( G) ;{#datatype} 
* [&lt;資料Type &gt; (# 資料類型) -- 指定來源的資料類型。 (在某些情况下, 例如, 當讀取 ASCII 檔案的資料時, 它會指定如何儲存來源的資料 。) 
    * 這是一些數據集類型的 REQUIRED 而其他的 INGOID 。 需要此功能的數據集類型dataVariables 是:EDDGrid從 Xxx 檔案, EDD Table From Xxx Films, EDD Table From MWFS的 EDD 表格SOS. 其他數據集類型忽略此標籤, 因為它們從來源得到資訊 。
         
    * 合法值是任何標準[ERDDAP™資料型態](#data-types)加布林 (见下文) . 資料 Type 名稱對大小寫敏感 。
         
###### 布尔資料{#boolean-data} 
*   ["布林"](#boolean-data)特例
    * 在內部,ERDDAP™不支持布林型態, 因為布林不能儲存缺失的數值, 大多数檔案型態都不支持布林型態 。 而且,DAP不支持布林斯, 所以找不到標準的搜尋布林變數方法 。
    * 指定資料的「 布尔 」 輸入datasets.xml會使布尔值被儲存並以字節表示 : 0=假, 1=真, 127=missing\\_value.
    * 使用者可以使用數值指定限制 (例如, "IsAlive=1") .
    *   ERDDAP™管理員有時需要使用「 boolean 」 資料 輸入datasets.xml要告訴ERDDAP™如何與資料來源互動 (例如, 從關聯資料庫讀取布林值並轉換到 0, 1, 或 127) .
         
* 如果您要從來源檔案中的資料Type中變更資料變數 (例如,短) 輸入其他資料 在數據集中輸入 (例如, int) 不要用&lt;數據 Type &gt; 以指定您要什麼 。 (它對某些類型的數據集有效 但對其它的卻不行) 相反:
    * 使用&lt;dataType &gt; 指定檔案中的內容 (例如,短) .
    * 在&lt;addAttributes&gt; 變數, 新增 a[scale\\_factor](#scale_factor)屬性與新資料 類型 (例如, int) 和1的值,例如,
```
            <att name="scale\\_factor" type="int">1</att>  
```
###### dataVariable &lt;addAttributes&gt; {#datavariable-addattributes} 
* [&lt;addAttributes&gt;] (# 可變的補充屬性) -- 定義一套屬性 ( *名稱* = *值* ) 被加入到變數的來源屬性中, 以建立變數的综合屬性 。 這是選擇
如果變數[源屬性](#variable-addattributes)或&lt;addAttributes&gt; 包含[scale\\_factor和/或add\\_offset](#scale_factor)屬性,它們的數值會用來解析來源的資料,然后再分发到客戶端 。 已解開的變數會是同樣的資料類型 (例如浮) 如scale\\_factor和add\\_offset值。
        
###### 變數&lt;addAttributes&gt; {#variable-addattributes} 
* [ ** 變數屬性/ 變數&lt;addAttributes&gt; ** [ [ ] ] (# 可變的補充屬性) --&lt;addAttributes&gt; 是在一個&lt;axisVariable&gt; 或&lt;dataVariable&gt; 用于變數屬性改變的標籤 。
    
    *    ** 使用變數&lt;addAttributes&gt; 改變變數的屬性 。 ** ERDDAP™结合數據集來源的變數屬性( N)** 源屬性 **)和變數的** addAttributes **您所定义的datasets.xml  (优先) 使變數的"** 合并屬性 ** ",即是什么ERDDAP™使用者看到。 所以,你可以使用addAttributes重新定義來源屬性值, 新增屬性, 或是移除屬性 。
    * 看 ** &lt;addAttributes&gt; **信息] (# 附加) 适用于全局和變數** &lt;addAttributes&gt; ** .
    *   ERDDAP™尋找並使用許多這些屬性, 例如,要讓變數通過WMS,使地圖可以使用一致的顏色bar。
    *   [經度 纬度 高度 (深度) 時間變數](#destinationname)自動取得許多相當的中繼資料 (例如,[單位](#units)) .
    * 樣本&lt;addAttributes&gt; 对于數據變數是:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

空數 OffObservates 屬性會產生源碼 OfObservates 屬性 (如果有) 要從最後的、 合并的屬性清單中移除。
    * 提供此資訊有幫助ERDDAP™幫助使用者了解數據集。
良好的中繼資料可以使用 。
中繼資料不足,
請花點時間做個好工作 。
    
###### 關於特殊於其中的變數屬性的评论ERDDAP:

###### actual\\_range {#actual_range} 
*   [ **actual\\_range** ](#actual_range)是推荐變數屬性。 例如,

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* 此屬性來自[疾控中心COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)和[CF 1.7+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)元数据標準 。
* 如果存在, 它必然是兩個數值的陣列, 和變數的目標數據型態相同, (不是理論或允許的) 此變數的數值最小與最大值 。
* 如果數據是用[scale\\_factor和/或add\\_offset](#scale_factor),actual\\_range必須已解開的數值, 並且與解開的數值類型相同 。
* 某些資料來源 (例如,所有的 EDD Table 從... 文件数据集) ,ERDDAP™确定actual\\_range指定actual\\_range屬性。 与其他資料來源一起 (例如,關係數據庫 卡珊德拉DAPPER,Hyrax) 推算範圍可能會很麻煩或很累ERDDAP™不要求它。 這樣的話,你最好安排一下actual\\_range  (特别是經度、經度、高度、深度和時間變數) 新增actual\\_range每個變數的屬性 [&lt;addAttributes&gt;] (# 附加) 此數據集在datasets.xml例如,

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* 數字[時間和時間戳變數](#time-units),指定的數值应为相關來源 (非目的地) 數值 。 例如,如果來源時間值被儲存為"1985-01-01起的天",那么actual\\_range应在"1985-01-01起的天数"中指定。 若你想提到現今, 例如, 要指定1985-01-17 的數據範圍, 使用

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* 如果actual\\_range已知( 由ERDDAP™計算它或由您新增它通過&lt;addAttributes&gt;),ERDDAP™將在資料存取表單上顯示給使用者 ( *datasetID* .html) 建立圖形網頁 ( *datasetID* 圖片) 在生成 FGDC 和 ISO 19115 中繼資料時使用。 而且,最后的七天actual\\_range。
* 如果actual\\_range已知道,使用者可以使用[分 () 最大值 () 函數](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)在要求中,這往往非常有用。
* 所有 EDD 表格... 数据集,如果actual\\_range已知 (由您指定或指定ERDDAP™算吧) ,ERDDAP™將會迅速拒絕任何對此範圍以外的資料的要求。 例如, 如果數據集中最低的時間值對應於1985-01-17, 那麼1985-01-01至1985-01-16年的所有資料的要求會立即被拒絕, 錯誤訊息「您的查詢沒有取得匹配結果」 。 所以actual\\_range一個非常重要的元件, 因為它可以儲存ERDDAP™大量的努力和省下很多時間。 這更突出了actual\\_range值不能小于數據的實際範圍;否则,ERDDAP™可能說錯了 「沒有匹配的資料」,
* 當使用者選擇數據的子集, 要求包含中繼資料的檔案類型 (例如,.nc) ,ERDDAP™修改actual\\_range以反射子集的範圍。
* 看[data\\_min和data\\_max](#data_min-and-data_max),是指定actual\\_range. 然而,這些已經被腐化了actual\\_range由CF 1.7+定義。
         
###### 顏色列屬性{#color-bar-attributes} 
有數個 OPTIONAL 變數屬性指定顏色列的預設屬性 (用於將影像上的數值轉換成顏色) 此變數。
* 如果存在, 此資訊被 gradap 和tabledap當您要求使用顏色列的影像時 。
* 例如, 當經度網格化的資料被繪製成地圖上的覆蓋時, 彩色列指定資料值如何轉換成顏色 。
* 有了這些值ERDDAP™以建立影像, 在不同的要求中使用一致的顏色列, 即使時間或其他維度值不一樣 。
* 這些屬性名稱建立於ERDDAP. 它們不是根據元数据標準。
* 与顏色列相關的屬性有:
    *    **colorBarMinimum** 指定顏色巴的最小值。 例如,

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * 如果數據是用[scale\\_factor和/或add\\_offset](#scale_factor),指定colorBarMinimum作為已解開的數值。
    * 資料值低于colorBarMinimum以與colorBarMinimum值。
    * 屬性應該是[類型="雙倍"](#attributetype),不管資料變數的類型。
    * 數值通常是一個很好的圓形數字 。
    * 最佳做法: 我們建議的值比最低數值稍高一點
    * 沒有預設值 。
*    **colorBarMaximum** 指定顏色Bar上的最大值。 例如,

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * 如果數據是用[scale\\_factor和/或add\\_offset](#scale_factor),指定colorBarMinimum作為已解開的數值。
    * 數據值高于colorBarMaximum以與colorBarMaximum值。
    * 屬性應該是[類型="雙倍"](#attributetype),不管資料變數的類型。
    * 數值通常是一個很好的圓形數字 。
    * 最佳做法: 我們建議的值略低于最大數值 。
    * 沒有預設值 。
*    **顏色 巴勒特** 指定顏色列的調色板。 例如,
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * 全部ERDDAP™安裝支援這些標準調色板 : 黑藍白 黑紅白 黑白 藍白紅 光彩虹 海洋 大洋深度 彩虹 紅白藍 反光虹 地形 地形深度\\[增加于v1.74\\]白黑 白黑 白紅黑
    * 如果您已安裝[新增調色板](/docs/server-admin/additional-information#palettes)你可以指其中之一。
    * 如果此屬性不存在, 預設值為 lueWhiteRed, 如果 \\-1\\%%%%% 1colorBarMinimum=colorBarMaximum否則就是彩虹
*    **顏色框** 指定顏色巴的大小。 例如,
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * 有效的數值為 Linear 和 Log 。
    * 如果值是 Log,colorBarMinimum一定大于 0。
    * 如果此屬性不存在, 預設是 Linear 。
*    **顏色 连续** 指定顏色巴是否有连续的顏色調色板,或者色彩巴是否有一些离散的顏色。 例如,
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * 有效的數值是真假的字串 。
    * 如果此屬性不存在, 預設是真實的 。
*    **顏色BarN 段落** 指定顏色Bar上的預設區次。 例如,
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * 有效值是正整數 。
    * 如果此屬性不存在, 預設值是 & 1 , 它會顯示ERDDAP™要根據顏色Bar的範圍選擇區段數。
###### WMS {#wms} 
可存取變數的主要要求ERDDAP是WMS伺服器是 :
* 數據集必須是EDDGrid...數據集。
* 數據變數 MUST 是網格化的變數 。
* 數據變數 MUST 有經度和纬度轴變數 。 (其他轴變數是 OPTIONAL 。) 
* 一定有一些經度值在 -180 與 180 之間 。
* 其colorBarMinimum和colorBarMaximum屬性必須指定。 (其他顏色列屬性是 OPTIONAL.) 

###### data\\_min和data\\_max {#data_min-and-data_max} 
*   [ **data\\_min** 和 **data\\_max** ](#data_min-and-data_max)-- 這些是世界海洋环流實驗中定義的變數屬性 (哇) 中繼描述 。 例如,

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * 我們建議你用[actual\\_range](#actual_range),而不是data\\_min和data\\_max因為actual\\_range現在由 CF 规格來定義。
    * 如果存在, 它們必須與變數的目標數據型態相同, 並指定實際 (不是理論或允許的) 此變數的數值最小與最大值 。
    * 如果數據是用[scale\\_factor和/或add\\_offset](#scale_factor),data\\_min和data\\_max必須用已解開的資料類型解開數值。
         
###### 變數drawLandMask {#variable-drawlandmask} 
*   [ **drawLandMask** ](#variable-drawlandmask)-- 這是 OPTIONAL 變數屬性ERDDAP™  (沒有元数据標準) 指定數據集 Make A Graph 表格上的「 Draw Land Mask 」 選項的預設值 ( *datasetID* 圖片) 和 &. 例如,
    ```
        <att name="drawLandMask">under</att>  
    ```
看[drawLandMask概述](#drawlandmask).
###### 編碼{#encoding} 
*   [ **編碼** ](#encoding)
    * 此屬性只能用於字符串變數 。
    * 此屬性被強烈建議 。
    * 此屬性來自[NetCDF使用者指南 (努格) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html).
    * 內在ERDDAP™,字符串是使用[Unicode UCS-2 字符集](https://en.wikipedia.org/wiki/UTF-16).
    * 許多檔案類型只支持字串中的 1字节字元, 因此需要此屬性來辨識相關
        [字元集 (AKA 密碼頁面) ](https://en.wikipedia.org/wiki/Code_page)它定义了如何將256個可能值映射到從UCS-2字符集和/或編碼系統中抽取的256個字符集,例如,[UTF-8](https://en.wikipedia.org/wiki/UTF-8)  (每個字元需要 1 到 4 位元組) .
    * QQ 編碼值對大小寫不敏感 。
    * 理論上ERDDAP™可以支援 XQE 編碼身份[此 IANA 清單](https://www.iana.org/assignments/character-sets/character-sets.xhtml)但實際上ERDDAP™目前只是支持
        * ISO-8859-1 (注意它有破折片,而不是强调) ,其优点是它与Unicode的前256字符相同,以及
        * UTF -8。
    * 在讀取來源檔案時, 預設值是 ISO- 8859-1, 除了 netcdf-4 檔案, 預設值是 UTF-8 。
    * 因為許多來源檔案使用與ISO- 8859-1不同的字元集或編碼, 例如,很多來源資料檔案都有從Windows上的 Microsoft Word 复制和貼上的一些中繼資料,因此有Windows 特定字元集的花式连字符和套接字,而不是ASCII 連字符和套接字。 這些角色會以奇特角色或 '?' 出現在其中ERDDAP.
         
###### 檔案存取BaseUrl{#fileaccessbaseurl} 
*    **[檔案存取BaseUrl](#fileaccessbaseurl)文件存取后缀** 很少用到任何標準的屬性。 如果 EDDTable 欄位有網路可存取檔案的檔名 (例如影像、影像或音效檔案) 添加
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
指定基底網址 (結束于 /) 需要將檔名變成完整的 URL 。 在不尋常的情況下, 例如一列引用了 . png 檔案, 但數值缺少 ". png", 您可以加入
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(例如,&lt;atname=“ file AccessSunix” &gt;.png&lt;/a &gt;)
指定要新增的後缀, 讓檔案檔成為完整的 URL 。 那是為了.htmlTable答复,ERDDAP™將檔案名稱顯示為完整網址的連結 (底部 Url 加上文件名加上后缀) .

如果你想ERDDAP™要服務相關檔案, 請另做一個[檔案名稱中的 EDD 表格](#eddtablefromfilenames)檔案的數據集 (它可能是私人的數據集) .
    
###### 檔案存取Archive 網址{#fileaccessarchiveurl} 
*   [ **檔案存取Archive 網址** ](#fileaccessarchiveurl)是一個很少使用的屬性, 如果 EDDTable 欄位有網路可存取檔案的檔名 (例如影像、影像或音效檔案) 可通过檔案檔存取 (例如,.zip文件) 透過網址存取, 使用&lt;att name=“ file Access ArchiveUrl ” *烏拉* &lt;指定歸檔的網址 。
    
如果你想ERDDAP™要服務歸檔檔檔, 請另做一個[檔案名稱中的 EDD 表格](#eddtablefromfilenames)此檔案的數據集 (它可能是私人的數據集) .
    
###### ioos\\_category {#ioos_category} 
*   [ **ioos\\_category** ](#ioos_category)-- 如果&lt;變數MustHaveIoosCategory &gt; 已設定為真實 (默认)  in[設定. xml](/docs/server-admin/deploy-install#setupxml)不然,它就是另類的。
例如,&lt;姓名="ioos\\_category" &gt;&lt;/at &gt;
分類來自[NOAA海洋综合观测系统 (iOOS) ](https://ioos.noaa.gov/).
    
    *    (至此) 我們不知道這些名字的正式定義
    * 其核心名稱來自Zdenka Willis'.ppt"综合海洋观测系统" (iOOS)  NOAA建立初步操作能力的方法[US IOOS 地圖](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)  (第1-5页) .
    * 未來可能會修改此清單。 如果你有要求,請發郵件給克里斯。 約翰在Noaa.gov。
    *   ERDDAP™支持比 IOOS 更大的類別清單, 因為 Bob Simons 新增了更多名稱 。 (大多基于科學領域的名稱,例如生物學、生态學、气象學、統計學、生物學) 其他類型的資料。
    * 目前有效的值 :ERDDAP™包括水深、生物、底部特征、CO2、彩色溶解的有机物、污染物、海流、溶解的营养物、溶解的O2、生态學、魚種、熱流、水學、冰分配、辨識器、位置、气象學、海洋彩色、光學屬性、其他、病原體、植物浮游生物、壓力、生产力、質量、咸度、海平面、统计、流流、表面波、生物學、溫度、時間、全面悬浮物、未知物、風、 Zo浮游生物和 Zo浮游生物。
    * 不同名詞之間有些重叠和模糊 -- -- 盡力。
    * 如果你添加ioos\\_category至&lt;categoryAttributes&gt;  inERDDAP是[設定. xml](/docs/server-admin/deploy-install#setupxml)檔案中,使用者可以很容易地通过ERDDAP主頁上的「按類別搜尋數據集」 。
        [試用ioos\\_category以搜索感兴趣的数据集。](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * 有[關於ERDDAP™和ioos\\_category在ERDDAP™谷歌集團.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w)
    
你可能想陷害我&lt;變數MustHaveIoosCategory &gt; 到錯誤, 因此不需要此屬性 。 ("P&#33; 与我何异?") 某些原因讓它成真 (默认) 和使用ioos\\_category即:
    
    * 如果建立.xml's&lt;變數MustHaveIoosCategory &gt; 已成真,[產生 DatasetsXml](#generatedatasetsxml)總是建立/建議ioos\\_category屬性。 為什麼不放進去?
    *   ERDDAP™讓使用者按類別搜尋有興趣的数据集 。ioos\\_category是一個非常有用的搜尋類別, 因為 ioosQQ 類別 (例如,溫度) 很寬敞 所以ioos\\_category比例如更精美的CF更好standard\\_names (這對這個目的來說不是那么好 因為所有的同义詞和微小的變化 比如海\\_表溫度對比 海水) .
(使用)ioos\\_category由&lt;categoryAttributes&gt; 在您的設定中. xml 檔 。 )
        [試用ioos\\_category以搜索感兴趣的数据集。](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * 這些分類來自[NOAA海洋综合观测系统 (iOOS) ](https://ioos.noaa.gov/). 這些類別是IOOS描述IOOS任務的根本. 如果你在NOAA,支持ioos\\_category好 一...NOAA事情做。 (你看[一NOAA影像](https://www.youtube.com/watch?v=nBnCsMYm2yQ)你應當受啟示,) 如果你在某個其他美國或國際機構, 或是與政府機構合作, 或是與其他海洋觀察系統合作,
    * 遲早,你可能要吃其他的ERDDAP™連結到您的數據集[EDDGrid來自 Erddap](#eddfromerddap)和[EDD 表格來自 Erddap](#eddfromerddap). 如果另一個人ERDDAP™需要ioos\\_category您的數據集必須是ioos\\_category以EDDGrid從Erddap和EDDTable從Erddap到工作。
    * 心理上更容易ioos\\_category當您建立數據集時 (只是另一件事ERDDAP™需要新增數據集到ERDDAP) 而不是在事實之後加上 (如果你決定在未來使用它) .
         
###### long\\_name {#long_name} 
*   [ **long\\_name** ](#long_name)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)和[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 是在ERDDAP. 例如,
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *   ERDDAP™使用long\\_name用于圖示上的標籤。
    * 最佳做法: 大寫long\\_name就像是名片 (利用第一個單詞和所有非文章單詞) . 不要把單位都包含在long\\_name. 名字應該不長(通常)&lt;20個字),但比[destinationName](#destinationname)通常非常簡洁。
    * 如果 "long\\_name變數中沒有定義[源屬性](#variable-addattributes)或&lt;addAttributes&gt;,ERDDAP™清理[standard\\_name](#standard_name)  (如果存在) 或destinationName.
         
###### missing\\_value {#missing_value} 
*   [ **missing\\_value** ](#missing_value)和 **填充 值**   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)和[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) 是描述數字的變數屬性 (例如,-9999年) 表示缺失值。 例如,

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

对于字串變數,兩者都缺省為「 」 (空字串) .
數字變數的預設值為 NaN 。
*   ERDDAP™支持兩者missing\\_value因為有些資料來源對它們的意義有些不同。
* 如果存在, 它們應該與變數同樣的數據型態 。
* 如果數據是用[scale\\_factor和/或add\\_offset](#scale_factor),missing\\_value和 QQ 填充值 。 類似地, 对于使用本地端的字串日期/ 時間值的列[time\\_zone](#time_zone),missing\\_value而 QQFillValue 值應該使用本地時區 。
* 如果變數使用這些特殊值,missing\\_value和/或 QQ 檔案屬性是需要的。
* 為[時間和時間戳變數](#time-units)  (不管來源是字串還是數字) ,missing\\_values和QQFillValues 以 "" 出現 。 (空字串) 時 候 寫 為 弦 、 寫 為 納 。 時 候 寫 為 雙 倍 源值missing\\_value而 QFillValue 不會出現在變數的中繼資料中 。
* 对于字符串變數,ERDDAP™總是轉換任何missing\\_values 或 QQFillValue 數據值輸入"" (空字串) . 源值missing\\_value而 QFillValue 不會出現在變數的中繼資料中 。
* 數字變數 :
其missing\\_value和 QQFillValue 將會出現在變數的中繼資料中 。
某些輸出數據格式,ERDDAP™這些特殊數字會保持完整, 例如,你會看到 -9999。
其他輸出資料格式 (特别是文本格式如.csv和.htmlTable) ,ERDDAP™以 NaN 或 "."取代這些特殊數字。
* 有些數據類型有內在缺失的值標記,不需要明确辨識missing\\_value或 QQFillValue 屬性: 浮點數和雙倍變數有 NaN (不是數字) ,字符串值使用空字符串,字符串值具有性格\\uffff  (字元 # 65535, 是 Unicode 的值 。) . 整數資料型態沒有內在的缺失值標記 。
* 如果整數變數有缺失值 (例如, . csv 文件中的空位置) ,ERDDAP™將解析數值為定義missing\\_value或為變數填表。 如果沒有定義,ERDDAP™會將數值解釋為此資料類型的預設缺失數值, 它永遠是該資料類型可以持有的最大數值 :
127個字节變數,32767個字節,2147483647個字節,9223372036854775807 很久了
ubyte255, ushort65535, uint4294967295, ulong1844744073709551615。
###### ADD \\_FillValue ATTRIBUTES?{#add-_fillvalue-attributes} 
*   [ADD \\_FillValue ATTRIBUTES?](#add-_fillvalue-attributes)  
每一次ERDDAP™載入數據集, 它檢查有整數源資料型態的變數是否有定義值missing\\_value或 FillValue 屬性 。 如果變數沒有的話ERDDAP™將信件打印到日志檔 (從「 新增 QFALVALUE 屬性 」 開始 。) 建议ERDDAP™管理員新增 QQFill 此變數的值屬性datasets.xml. 每個變數都有一個 QQFillVale 或missing\\_value因為缺失的數值總是可能的, 例如, 如果數據集中的指定檔案沒有指定變數,ERDDAP™需要能將變數顯示為所有缺失的數值。 如果您決定變數不應該有 QQFillValue 屬性, 您可以加入
    &lt;atnames="QQ FillValue" &gt; nall&lt;反之,它會壓抑此訊息datasetID+ 未來可變的组合 。
    
每一次ERDDAP™它會把所有的建議收集到寫到日志檔的訊息中 (從 " 開始ADD \\_FillValue ATTRIBUTES?") ,電子郵件至ERDDAP™管理員,並寫入 CSV 資料檔\\[大家长會\\]/日志/目錄。 如果您愿意, 您可以使用 GenerateDatasetsXml 程式 (和添加的 FillValue 屬性選項) 將 CSV 檔案中的所有建議套用到datasets.xml文件。 任何一個datasetID/ 變化的檔案中的组合, 如果您決定不需要新增屬性, 您可以將屬性變更為&lt;atnames="QQ FillValue" &gt; nall&lt;/att &gt; 以壓縮此項的建議datasetID+ 未來可變的组合 。
    
這很重要&#33;
正如鮑勃常說的: (和羞愧) 如果全球暖化的一些證據 是由數據中不明數值造成的 (例如,99度或127度的溫度值 C應標示為缺失的數值,) .

* 火花和missing\\_value不同來源檔案中指定的變數值必須一致;否则,ERDDAP™將接受一組數值的檔案, 並拒絕其他所有檔案為「 壞文件 」 。 為了解決問題
    * 如果檔案被網格化.nc文件,你可以使用[EDDGrid來自 NcFiles 未包裝](#eddgridfromncfilesunpacked).
    * 如果檔案是表格資料檔, 您可以使用 EDDTable from...Files ' '[标准化 什么](#standardizewhat)要告訴ERDDAP將來源檔案在讀取時标准化ERDDAP.
    * 更嚴重的問題,你可以用[NcML](#ncml-files)或[NCO](#netcdf-operators-nco)解決問題
             
###### scale\\_factor {#scale_factor} 
*   [ **scale\\_factor** ](#scale_factor)  (缺省=1) 和 **add\\_offset**   (缺省=0)   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)和[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) 是 OPTIONAL 變數屬性, 它描述的資料是用簡單的變換被打包成更簡單的資料類型 。
    * 如果存在, 其資料類型與來源資料類型不同, 並描述目的值的資料類型 。
例如, 數據來源可能儲存了一個小數位數的浮點數數值, 以短點表示 (英寸16) ,使用scale\\_factor=0.1和add\\_offset= 0. 例如,

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

在這個例子中,ERDDAP™以浮點數值向使用者顯示 。
    * 如果現在ERDDAP™將從這些屬性中提取數值, 移除屬性, 並自動解開使用者的資料 :
目的地 值=來源 值 QQscale\\_factor+add\\_offset  
或者說 另一种方式
已打包的value = 已打包 值 QQscale\\_factor+add\\_offset
    * 其scale\\_factor和add\\_offset不同來源檔案中指定的變數值必須一致;否则,ERDDAP™將接受一組數值的檔案, 並拒絕其他所有檔案為「 壞文件 」 。 為了解決問題
        * 如果檔案被網格化.nc文件,你可以使用[EDDGrid來自 NcFiles 未包裝](#eddgridfromncfilesunpacked).
        * 如果檔案是表格資料檔, 您可以使用 EDDTable from...Files ' '[标准化 什么](#standardizewhat)要告訴ERDDAP將來源檔案在讀取時标准化ERDDAP.
        * 更嚴重的問題,你可以用[NcML](#ncml-files)或[NCO](#netcdf-operators-nco)解決問題
             
###### standard\\_name {#standard_name} 
*   [ **standard\\_name** ](#standard_name)  (從[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)中繼資料標準) 是在ERDDAP. CF 維持允許的清單[CF 標準名稱](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). 例如,
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * 如果你添加standard\\_name加入standard\\_name至&lt;categoryAttributes&gt;  inERDDAP是[設定. xml](/docs/server-admin/deploy-install#setupxml)檔案中,使用者可以很容易地通过ERDDAP主頁上的「按類別搜尋數據集」 。
    * 如果您指定了 CFstandard\\_name對變數, 變數的單位屬性不必與 CF 標準名稱表中為標準名稱指定的單位完全相同, 但單位 MUST 卻可以轉換為單位 。 例如,所有與溫度相關的CFstandard\\_name有"K" (開爾文) 作為冠軍單位 所以一個與溫度相關的變數standard\\_name因為它們都是互動的。
    * 最佳做法: 部分力量[控制词汇](https://en.wikipedia.org/wiki/Controlled_vocabulary)來自只使用清單中的條件。 所以我們建議繼續使用受控詞典中定義的名詞, 如果你需要附加名詞, 看看標準委員會是否會將它們加入受控詞典中.
    *   standard\\_name值是唯一具有大小寫敏感的 CF 屬性值。 它們總是小寫的 起始於ERDDAP™v1.82, 產生 Datasets 會將大寫字母轉換成小寫字母 。 當數據集被載入ERDDAP,大寫字母悄悄變為小寫字母。
         
###### time\\_precision {#time_precision} 
*   time\\_precision是使用於ERDDAP™  (沒有元数据標準) 用于[時間和時間戳變數](#time-units),可能放在格子数据集或表格数据集,以及axisVariable或dataVariables. 例如,
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
    time\\_precision指定每次使用的精度ERDDAP™將變數中的時間值格式化為網頁上的字串,包括.htmlTable答复。 在檔案格式中ERDDAP™格式乘以字串 (例如.csv和..json) ,ERDDAP™只使用time\\_precision- 指定格式,如果它包括分數秒;否则,ERDDAP™使用1970-01-01T00:00 Z格式。
* 有效值為1970-01、1970-01-01、1970-01-01T00Z、1970-01-01T00Z、1970-01-01T00Z、1970-01-01T0000Z (默认) ,1970-01-01T00:00.0Z,1970-01-01T00:00.00Z,1970-01-01T00:00.00Z.\\[1970年不是選擇 因為是單數 所以ERDDAP™無法知道它是否是格式化的時間串 (一年) 或者說是1970-01-01T00:00Z之后的幾秒\\]
* 如果time\\_precision未指定或數值不符,會使用預設值。
* 這里,和其他地方一樣ERDDAP™,任何未顯示格式化時間的字段都假定有最小值。 例如,1985-07、1985-07-01、1985-07-01T00Z、1985-07-01T00Z和1985-07-01-00:00 Z被視為等效, 此符合[ISO 8601:2004"extended"時間格式](https://www.iso.org/iso/date_and_time_format).
*    **警告:** 你只應該使用限制time\\_precision如果 **全部** 的值。
    * 例如,你可以使用time\\_precision如果所有數值都有小時=0、分鐘=0、秒=0 (例如2005-03-04T00:00Z和2005-03-05T00:00Z) .
    * 比如,不要用time\\_precision如果有0小時、1分鐘或2秒的值 (例如,2005-03-05T12:00Z) 因為不預設時數值不會顯示 。 若使用者以時間=2005-03-05來要求所有資料,
             
###### time\\_zone {#time_zone} 
*   [ **time\\_zone** ](#time_zone)
    *   time\\_zone是使用於ERDDAP™  (沒有元数据標準) 用于[時間和時間戳變數](#time-units),它可能存在于网格数据集或表格数据集。
    * 缺省是 "Zulu" (這是現代時區版本的 GMT) .
    * 背 景 : (例如太平洋標準時間 -08: 00, GMT-8) 固定、特定、偏移Zulu  (格林尼治平时) . 反之,「時空區域」是更複雜的事物, (例如,“美国/太平洋”) 不同時代不同地方有不同的規矩 時區總是有名字 因為不能用簡單的抵消值來概括 (參考表格中的 TZ 數據庫名稱[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .ERDDAP是time\\_zone屬性會幫助您處理某些時區的本地時數資料 (例如,1987-03-25T17:32:05 太平洋 時間) . 如果您有串或數值時間數據 (固定) 時間偏移, 您應該簡單調整數據到Zulu  (是什么ERDDAP™想要) 在單位屬性中指定不同的基時 (例如,自1970-01-01T08:00Z起的小時,注意T08以指定時間偏移) ,總是檢查結果,以确保得到你想要的結果。
    * 使用 Strings 的來源資料的時間戳變數, 此屬性讓您指定一個時區 。ERDDAP™以轉換本地時區來源時間 (有的在標準時間,有的在日光節) 成Zulu倍 (總在標準時間) . 有效的時區名稱列表可能與 TZ 列中的列表完全相同 。[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). 美國的時區是:美國/哈瓦伊、美國/阿拉斯卡、美國/太平洋、美國/山地、美國/阿里索納、美國/中部、美國/東部。
    * 对于有數字來源數據的時間戳變數, 您可以指定 "time\\_zone" 屬性,但值必須是 "Zulu"或"UTC"。 如果你需要其他時區的支援 請發郵件給克里斯 約翰在諾亞戈夫
         
###### 單位{#units} 
*   [ **單位** ](#units)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)和[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)中繼資料標準) 定义數值的單位。 例如,
    ```
        <att name="units">degree\\_C</att>
    ```
    * “ 單位” 是 REQUIRED 的來源屬性或新增屬性"time"變數,并在任何適當的情況下,強烈建議其他變數 (几乎總是) .
    * 總而言之,我們建議[UD 單位](https://www.unidata.ucar.edu/software/udunits/)\\ 兼容的單位, 符合[COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)和[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)标准。
    * 另一共同的標準是[城市](https://unitsofmeasure.org/ucum.html)- 计量單位的统一代碼。[OGC](https://www.ogc.org/)例如,[SOS](https://www.ogc.org/standards/sos),[WCS](https://www.ogc.org/standards/wcs)和[WMS](https://www.ogc.org/standards/wms)需要UCUM,並常稱UCUM為UOM (量度單位) .
    * 我們建議您用一個單位標準來處理您的所有資料ERDDAP. 你應該告訴ERDDAP™您使用的標準&lt;單位標準 &gt;, 在您的[設定. xml](/docs/server-admin/deploy-install#setupxml)文件。
    * 不同來源檔案中指定的變數的單位必須一致 。 如果您有數據檔案集, 其中一個子集會使用不同的單位數值, 而不是其他檔案的一個或更多子集( 例如, )
"自1985-01-01起"和"自2000-01-01起"
"Celsius"和"deg\\_C"
"knots"對"m/s",你需要找到一种方法使單位值标准化,否则,ERDDAP™只載入檔案的一個子集。 想想看: 如果一個檔案有風速單位=knots, 而另一個檔案有風速單位=m/s, 那么兩個檔案的數值就不該包含在相同的集合數據集中 。
        * 如果檔案被網格化.nc文件,在很多情况下都可以使用[EDDGrid來自 NcFiles 未包裝](#eddgridfromncfilesunpacked).
        * 如果檔案是表格式資料檔, 在很多情况下, 您可以使用 EDDTable from...Files ' '[标准化 什么](#standardizewhat)要告訴ERDDAP將來源檔案在讀取時标准化ERDDAP.
        * 更嚴重的問題,你可以用[NcML](#ncml-files)或[NCO](#netcdf-operators-nco)解決問題
    * CF 標準第8.1段說,如果變數的數據是通過[scale\\_factor和/或add\\_offset](#scale_factor),"變數的單位應該代表已解開的數據"
    *   [時間和時戳變數](#time-units)或變數的[源屬性](#variable-addattributes)或&lt;addAttributes&gt; (优先) 一定有[單位](#units)要么
        
        * 時間轴變數或數值數據的時間數據變數 :[UD 單位](https://www.unidata.ucar.edu/software/udunits/)符合的字串(- compatible) (格式 *單位* 自 *基底時間* ) 描述如何解析來源時間值 (例如,自1970-01-01T00:00Z起的秒) .
            
         *單位* 可以是:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
技術上ERDDAP™不遵循UDUNITS轉換時的標準"years since"和"months since"時間值至"seconds since". 其UDUNITS標準定義年份為固定單值: 3.15569259747e7秒。 而且UDUNITS定義一個月為12年。 不幸的是,我們看到的數據集"years since"或"months since"明确打算將數值定为历年或历月。 例如,3"months since 1970-01-01"通常是指1970-04-01年。 所以ERDDAP™解析"years since"和"months since"作為曆年月,而不严格遵循UDUNITS标准。
            
其 *基底時間* 必須是 ISO 8601: 2004 (英) 格式化日期時間字串 (yyyy-MM-dd例如,THH:mm:sZ,1970-01-01T00:00Z) 或一些變化 (例如,末端缺少部件) .ERDDAP™試著使用理想格式的廣泛變化, 例如「1970-1-1 0: 0: 0: 0」 被支持 。 如果時區資訊缺失, 假設是Zulu時區 (阿卡·格林尼治) . 即使指定了下次抵消ERDDAP™從不使用日光節拍時間。 如果 BaseTime 使用其他格式, 您必須使用&lt;addAttributes&gt; 指定使用 ISO 8601: 2004 變更的新單位字串 (英) 格式(例如自1985年1月1日起更改为自1985-01-01起更改的天数)。
        
你可以測試ERDDAP處理特定問題的能力 *單位* 自 *基底時間* 與ERDDAP是[時間轉換器](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html). 希望您能插上數字 (資料來源的首次數值 ?) 和單位字符串,點擊轉換,以及ERDDAP™能夠轉換成 ISO 8601: 2004 (英) 格式化的日期時間字串 。 如果單位字串無法辨識, 轉換器會傳回錯誤訊息 。

###### 字符串時間單位{#string-time-units} 
*   [使用 String 資料的時間或時間戳數據變數的單位屬性,](#string-time-units)您必須指定[Java. Time. Date Time For matter (日文) 日文版 日文版](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)模式 (大多符合java.text。 簡單日期格式) 描述如何解析字串時間。
    
常用的 ISO 8601: 2004 變化的時間格式 (英) 标准格式 (例如,2018-01-02T00:00Z) ,您可以指定yyyy-MM-dd'T'HH:mm:sZ,例如,使用yyyy-MM-dd如果字串時間只有日期。 任何從yyyy-M開始的格式,ERDDAP使用特殊的解析器, 非常允許格式的微小變化 。 剖析器可以處理時區, 格式為 Z 、 "UTC 、 "GMT" 、 QQ: XX、 QQ 和 QQ 。 如果未指定部分日期 (例如,分秒) ,ERDDAP™假定此字段的最低值 (例如,如果未指定秒數, 則假定秒=0) .
    
其他所有字串時代格式, 您需要精确指定 DateTime Formatter 符合時代格式的字串 。 就像yyyy-MM-dd'T'HH: mm: sZ, 這些格式字串是由字符建構而成的, 這些字串能從時空字串中辨識出特定類型的信息, 例如, m 表示時空的分鐘 。 如果您重複格式字元數數次, 它會进一步完善意思, 例如 m 表示數值可能由任何數字指定, mm 表示數值必須由 2 位數字指定 。 其JavaDateTimeFormatter 的文檔是粗略的概述, 無法澄清這些細節 。 這是一個格式字元變化清單 以及它們在ERDDAP™  (有時與Java日期) :
    
    |字符|示例|意思|
    |-- --|-- --|-- --|
    |你,你,你|\\ 4712, 0, 1, 10, 100, 2018|一年的數字,任意數字。ERDDAP™對你 (年份) 和 Y (以週為基年, 因為這常常被錯誤使用而非y) 就像你,[天文年數](https://en.wikipedia.org/wiki/Astronomical_year_numbering). 天文年數是正反整數, 不使用 BCE (BC) 或 CE (自动) 代號:2018=2018CE,...,2=2CE,1=1CE,0=1BCE, -1=2BCE, -2=3BCE,......|
    |u, y也. YYYYYYY (YYYYYYYY) (法语)|\\4712,000,0001,0010,0100,2018|a 4 位元天文年數 (忽略任何先前的 '...')  |
    |M|1,01,12|月數, 任意數字 (1=1月)  |
    |毫米|01、12|a 2 位數字 (零加法) 月數|
    |毫米|楊,詹,詹|a 英文月名,大小寫不敏感|
    |毫米|Jan, Jan, 1月, January, 1月|3 封信或英文全月名稱,大小寫不敏感|
    |d|1,01,31|月日數字, 任何數字|
    |dd :|01, 31|a 2 位數字 (零加法) 月日。 第一個數字可能是空間|
    |D|1,001,366|任何數字,001=Jan 1|
    |DDD |001、366|2001=Jan 1|
    |EEE|t, T, Thu|a 每周3封信, 分析時值被忽略|
    |英,英,英|周四,周四,周四|分析時忽略了 3 個字母或完整的英文 周日, 大小寫不敏感, 值|
    |H|0、00、23|每天下午 (0-23) ,任意數字|
    |哈|00、23|每天的HH (00-23) 兩位數 第一個數字可能是空間|
    |a|午,午,午,午|AM或PM, 大小寫不敏感|
    |h|12、1、01、11|午后時鐘 (12, 1, 2,... 11) ,任意數字|
    |哼|12,01,11|午后時鐘 (12, 1, 2,... 11) 兩位數 第一個數字可能是空間|
    |K|0, 1, 11|下午一小時 (0, 1, ... 11) ,任意數字|
    |KK|00、01、11|下午2點|
    |m|0、00、59|任何數字|
    |毫米|00, 59|下午2點|
    |s|0、00、59|第二分鐘,任意數字|
    |秒|00, 59|第二分鐘, 2 位數字|
    |S|0 000、9 999|分秒數,好像在小數點之后,任意數字|
    |SS|00、99|一百分之一秒,二位數|
    |SSS|000, 999|千秒,三位數|
    |A|0 000 0 8639999|毫秒,任意數字|
    |AAAAA|0000000, 86399999|毫秒 8 位數字|
    |N|0,00000000000,86399999999999|數位數字 在ERDDAP™這是NMillis的短路|
    |南宁|000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000|4位數字 在ERDDAP™已切斷到 nMillis 。|
    |n|0,0000000,5999999999|數位數字 在ERDDAP™已切斷到 nMillis 。|
    |nnnnnnnnnnnnnnnn|0000000、599999999999|毫秒,11位數字 在ERDDAP™已切斷到 nMillis 。|
    |XXX, ZZZ|Z, -08: 00,+01:00|格式為 Z 或 ± 的時區 (2000年12月31日,星期二) : (2000年12月2日) . 這個 *空白* 作为 + (非標準) . ZZZ 支援 'Z' 是非標準的, 但處理常用的使用者錯誤 。|
    |XX, ZZ|Z - 0800, +0100|格式為 Z 或 ± 的時區 (2000年12月31日,星期二) : (2000年12月2日) . 這個 *空白* 作为 + (非標準) . ZZ 支援 'Z' 是非標準的, 但處理常用的使用者錯誤 。|
    |X, Z|Z, -08,+01|格式為 Z 或 ± 的時區 (2000年12月31日,星期二) : (2000年12月2日) . 這個 *空白* 作为 + (非標準) . Z 支援 'Z' 是非標準的, 但處理常用的使用者錯誤 。|
    | |\\-08:00,+01:00|格式 ± 的時區 (2000年12月31日,星期二) : (2000年12月2日) . 這個 *空白* 作为 + (非標準) .|
    |xx|\\-0800,+0100|格式 ± 的時區 (2000年12月31日,星期二)  (2000年12月2日) . 這個 *空白* 作为 + (非標準) .|
    |十|\\-08,+01|格式 ± 的時區 (2000年12月31日,星期二) . 這個 *空白* 作为 + (非標準) .|
    |' '|'T', 'Z', 'GMT'|一系列字元的始末|
    |' ' ' ' (2 個單引號)  |' ' ' '|兩個單引號表示字面單引號|
    | \\[\\] | \\[ \\] |開始 ("\\[") 末端 ("\\]") 可選擇的區域。 此註解只支援字元和格式字串的末尾 。|
    |#, &#123;, &#125;|#, &#123;, &#125;|保留供今后使用|
    |G,L,Q,e,c,V,z,O,p|     |這些格式化的字元由Java'DateTime Formatter, 但目前不支援ERDDAP. 如果你需要支援,就發郵件給克里斯 約翰在諾亞戈夫|
    
注:
    
    * 在有點數的日期期間,數值可能有可變數字 (例如,在美國斜拉日期格式"1/2/1985"中,月份和日期可能是1或2位數) 因此格式必須使用 1 字母符號, 例如 M/d/yyyy, 接受月份和日期的任何數字 。
    * 如果一個項目的數字是常數, 如 01/ 02/ 1985, 那么指定格式中的數字數, 如 2 位月的 MM/ dd/yyyy, 2 位月, 4 位年 。
    * 這些格式很難用 給定格式可能會對給定變數的大多數而不是全部時間字串有效 。 總是檢查您指定的格式是否按預期工作ERDDAP所有變數的時間串。
    * 如果可能, GenerateDatasetXml 會建議時間格式字串 。
    * 如果您需要幫助產生格式字串, 請發送 Chris 。 約翰在諾亞戈夫

主要時間數據變數 (表格数据集) 和主時轴變數 (格子化的數據集) 由[destinationName](#destinationname)時間到了 它們的單位中繼資料必須是數值的UDUDS兼容單位字串,例如"1970-01-01起的天" (表格或网格数据集) ,或[适合字符串時間的單位](#string-time-units),例如"M/d/yyyy" (表格数据集) .

不同格子的時間單位.nc文件 - 如果你有收藏的网格.nc檔案,對於時間變數,檔案的一個子集使用不同的時間單位與其他檔案的一個或多個子集,您可以使用[EDDGrid來自 NcFiles 未包裝](#eddgridfromncfilesunpacked). 它將時間值轉換為"seconds since 1970-01-01T00:00:00Z"低層, 从而隱藏差異, 這樣您就可以從不同檔案的收集中做出一個數據集 。

###### 時間戳變數{#timestamp-variables} 
[時間戳變數](#timestamp-variables)-- 任何其他變數 (axisVariable或dataVariable在EDDGrid或 EDD 表格数据集) 可以是時序變數。 時序變數是具有時間相關單位和時間數據的變數,但有&lt;destinationName&gt; 除了時間。 TimeStamp 變數的行為類似主時間變數, 因為它們將來源的時間格式轉換為"seconds since 1970-01-01T00:00:00Z"和/或ISO 8601:2004 (英) 格式)。ERDDAP™承認時間 印花變數, 按時間來看 "[單位](#units)" 中繼資料, 它必須符合此正規表示式 "\\[a-zA-Z\\]+ + 自 +\\[0-9\\].+” (數字日期 例如,"seconds since 1970-01-01T00:00:00Z") 或是約會 包含 "uuuu" 、 "yyyyy" 或 "YYYYYY" 的時代格式字串 (例如, "yyyy-MM-dd'不'HH:mm:sZ') . 但請繼續使用destinationName "time"主日期 時間變數 。

 **總是檢查你的工作,以确保顯示在其中的時間數據ERDDAP™是正確的時間數據。** 使用時間數據總是很棘手,

看[更多關於時間變數的資訊](#destinationname).
ERDDAP™有用於[轉換數字 時間到/ 從字符串時間](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
看[怎么ERDDAP™處理時間](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
        
###### valid\\_range {#valid_range} 
*   [ **valid\\_range** ,或 **valid\\_min** 和 **valid\\_max** ](#valid_range)-- 這些是於[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)元数据會議。 例如,

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

或

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * 如果存在, 它們應該與變數同樣的數據類型, 并指定該變數的數據的合法最小值和最大值 。 使用者應該認為此範圍以外的數值是無效的 。
    *   ERDDAP™不应用valid\\_range. 另一种方式是:ERDDAP™不轉換數據值valid\\_range到 QQ 檔案 值或missing\\_value.ERDDAP™只要傳遞這個中繼資料 就交給你了
為什麼? 這就是這個元数据的目的 如果數據提供商想要, 數據提供商可以將數據轉換到數值之外valid\\_range成為火奴隸ERDDAP™數據提供商的猜測 。 此方法更安全:valid\\_range太窄了或太不正确,ERDDAP™不會抹去數據的
    * 如果數據是用[scale\\_factor和/或add\\_offset](#scale_factor),valid\\_range,valid\\_min和valid\\_max。 自ERDDAP™應用scale\\_factor和add\\_offset當它載入數據集時,ERDDAP™會解開valid\\_range,valid\\_min和valid\\_max值使目的中繼資料 (顯示給使用者) 表示已解開的資料類型與範圍。
或者,如果一個解開的... ...valid\\_range屬性存在, 將會重新命名valid\\_range何时ERDDAP™載入數據集。
##### &lt;移除 MVRows & gt;{#removemvrows} 
* [ ** &lt;移除MVRows &gt; ** [ [ ] ] (重新移動) 在其中的標籤內是 OPTIONAL 標籤datasets.xml檔案中的 EDD 表格 (包含所有子類) 數據集,雖然它只用於從 MultidimNcFiles 的 EDD Table 。 它可以有真假的價值 例如,真
這可以移除所有數值都存在的群組末端的任何列區塊missing\\_value,%% 1, 或 COHORT... Arrray 本地缺失值 (或 CharArrays 的 Char% 32) . 這是為 CF DSG 多元陣列檔案類型及類似檔案提供的 。 如果是真的, 這會做正確的測試, 所以總是加載所有最暗的變數, 所以可能需要更多的時間 。
預設值為假 。
建議 如果可能的話 我們建議您把 MVRows 設置成假的 將 MVRows 設置為真可以大大減慢要求, 但有些數據集可能需要 。
