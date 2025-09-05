---
title: "ERDDAP™ - Changes"
---
#  ERDDAP™ 變更

 ERDDAP™ 是個很好的例子 [使用者](https://en.wikipedia.org/wiki/User_innovation) 產品創意常常來自於消費者 ( ERDDAP™ 使用者) 不只是制片人 ( ERDDAP™ 發展者) . 這些年來,大部分新點子 ERDDAP™ 來自使用者。 這些使用者的偉大想法被稱為下方。 謝謝你&#33; 請繼續說這些好建議&#33;

以下是與每項變更相關的變更 ERDDAP™ 釋放

## 2.28.1版本{#version-2281} 
 (2025-09-05年) 

*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 新增了 X 前置前置的支援 。 這對管理子路徑上的伺服器有特殊興趣 。 請讀一下我們更新的文件 [阿帕奇語Name](/docs/server-admin/deploy-install#apache) 和 [ Ng](/docs/server-admin/deploy-install#nginx) 更多信息。

多虧了 [@ srstsavage 中](https://github.com/srstsavage) 

## 2.2.8. 版本{#version-2280} 
 (2025-08-29年) 

*    **新特性和變更 (使用者) :** 
    *    [Croissant 方案](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) 已提供。 管理者可以控制預設中繼資料是否使用Croissant, 但從2.28. 0開始, 您可以用新的匯出檔案類型 ". croissant" 來要求 Croissant 的定義 。 (提供 jsonld 檔案) .

*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 新建嵌入器 每個合并的拉拉要求都產生影像 。 這些是α建築,不是版本的釋放。 他們會有像"20250814T034025"的標籤, 如果您想要試試最新的功能, 您可以使用這些功能 。 如果你想要更穩定的東西的話 使用我們用語义版的標籤 (例如,2.28.0) . 我們總是希望α释放能被使用 但對它們的測試比我們版本的释放要少 我們總是建議你使用 至少和我們"最新"的版本一樣新 也就是最新語言版的版本

    * 嵌入器 影像目前可用於 [GitHub 圖片](https://github.com/ERDDAP/erddap/pkgs/container/erddap) 除 [套接字](https://hub.docker.com/r/erddap/erddap) .

多虧了 [@ ocefpaf](https://github.com/ocefpaf) , [@abkfenris : @ abkfenris](https://github.com/abkfenris) , [@ srstsavage 中](https://github.com/srstsavage) 和 [馬修比多](https://github.com/MathewBiddle) 關於他們在 Docker 影像上的贡献。 除了@stsavage之外,
    
    * 現在有人支持產生 [Croissant 方案](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) 文件。 這是預設的 您可以在您的設定中禁用 Croissant schema 。 xml 。 (不建議 -- 如果您需要的話, 請在 GitHub 上聯絡或提交 。) :
    ```
        <generateCroissantSchema>false</generateCroissantSchema>
    ```

    * 有些設定值已變更 。 使用 HeadersForUrl 并使用 Edd Reflection 。 如果他們有問題,你需要把他們弄錯, 請建立問題。 目的是在未來的釋放中除掉他們

    * 已移除一些設定值 。 使用共享監控服務及重定向文件 ToGitHubIo被設計成真, 移除這些可以進行密碼清理 。

    * 一些小變更, 錯誤修正, 以及优化 。

*    **為 ERDDAP™ 發展者 :** 
    * 很多死亡密碼都被移除了 很多警告已生效。

## 2.2.7.0版本{#version-2270} 
 (2025-06-11年) 

*    **新特性和變更 (使用者) :** 
    * 在 /erddap/convert/color.html 的伺服器上新增數據到色彩列轉換器

*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 預設比喻是, 缓存將被清除 。 這樣可以更可靠和定期地清理舊的缓存檔案 。 磁碟空間低時還有更多改善伺服器空間的工作 (傳回可能讓伺服器耗盡空間的要求的錯誤, 並在低磁碟環境下更常地清理快取以試圖防止錯誤) . 在 datasets.xml   (或設定.xml) 您可以新增/ 設定新快取 清除Minutes 參數以控制伺服器檢查清除快取的频率 。 注意, 现有的缓存Minutes 參數控制要保存的檔案的年齡, 新的缓存 清除Minutes是多 频繁做一個 cache 清除。
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
您可以在設定. xml 中設定任务CacheClear 以錯誤的方式關閉新的缓存清查, 雖然這不是建議的 。
快取 清除Minutes也在其中 [數據集文件](/docs/server-admin/datasets#cacheclearminutes) .
    
    * 本地化的數據集元数据支援 。 它支持數值的本地化 addAttributes 章次 只需用附加的 xml: lang 標籤加入一個屬性 。 例如在您的數據集中加入一個法語標題 addAttributes 包括:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
附件 [本地化元数据文件](/docs/server-admin/localized-metadata) .

    * 新建嵌入器 以 SSL 和空骨 Prometheus 伺服器的選項來編譯檔案 。 謝恩·圣薩維奇為SSL和胡家辉為普羅米修斯

    * 支持在信頭中使用資訊來決定伺服器網址, 而不是依靠設定檔 。 這會讓伺服器被多個名稱存取, 並可能简化某些設定 。 請啟用並發送回復 。
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * 一些小變更, 錯誤修正, 以及优化 。

*    **為 ERDDAP™ 發展者 :** 
    * 重設輸出檔案類型的代碼 。 這應該可以讓檔案型態被加入而不需要觸碰很多碼位 。

## 2.26版本{#version-226} 
 (2025-03-31年) 

*    **所有人:** 
    * 我們的檔案網站大部份更新:https://erddap.github.io/
除了更新的外貌外, 還有更好的導航、搜尋、翻譯,

*    **新特性和變更 (使用者) :** 
    * 订阅和 RSS 更新應更可靠地發生於從檔案變更時常更新的數據集 。

*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 預設釋放需要/ 支援 Java 第21版 重回本版 Java 17個相容的二進制

    * 自訂 UI 中顯示的數據集資訊的新功能 。 我們期望這對加入數據集引文等項目尤其有用。 更多細節你可以讀到 [新文件](/docs/server-admin/display-info) . 感謝阿尤什·辛格的貢獻&#33;

    * 附加的普羅米修斯度量衡 最大的是 http _ request_duration_seconds 包括按 request_type 、 "dataset_id"、 "dataset_type"、 "file_type"、 "lang_code"、 "status_code" 细分的應答時間
此機型可讀格式可以更好地收集公制以了解使用者如何使用伺服器 。

    * 產生 ISO19115 XML 檔案的新方式 。 它使用Apache SIS, 是此版本中的新選項 。 請啟用並發送回復 。
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * 使用者介面將建立單位連結, 每個網址的字段如 infoUrl 和摘要。

    * 订阅和 RSS 更新應更可靠地發生於從檔案變更時常更新的數據集 。 如果這會引起問題, 請用 GitHub 聯絡, 並在您的設定中加入以下旗號, 以關閉功能 。
未推荐
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * 子集變數將不再被自動產生 。 如果你靠的就是行為 (偏好的解决办法) 添加 subsetVariables 到您的數據集定義 datasets.xml ,或將下面的旗子加入您的設定. xml 。 如果你覺得有必要打開這個 請聯繫GitHub 這樣我們就能更好地支持你的使用案例
未推荐
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * 伺服器將重新定向文件要求 (已移動的文件) 到新文件网站。 如果您需要的話, 您可以在設定. xml 中禁用此標籤 :
未推荐
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * 一些小變更與錯誤修正 。

*    **為 ERDDAP™ 發展者 :** 
    * 更多代碼質素的改善和死亡代碼清理 。 包括微小的优化、更妥善地處理殘缺的資源, (像矢量) .

    * 大型重製到 EDStatic 以拔出大部分的配置、訊息和公制碼 。 更好的封裝和處理目錄路徑 (最後兩份還有更多事要做) 

    * 在建立官方支持的Docker影像方面, 有很多進展。 計劃是完成並釋放 ERDDAP™ 2.26 已公布。

## 2.25版本{#version-225} 
 (2024-10-31年) 

*    **新特性和變更 (使用者) :** 
    * EDD Table FromFiles 現在只支援衍生的輸出 (全局、 jexl 文稿或變數) .
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 2.25版本要求 Java 21或更新。 這是 LTS 版本, 已使用一年多 。
         
    * 共享監視服務現在是預設的 。 如果您需要關閉, 請聯繫 Chris 。 在Noaa.gov的John讓我知道,
        &lt;使用shared watch Service &gt; false( 共享監控服務)&lt;/ 使用共享監視服務&gt; 到您的設定. xml 。
         
    * 其 ERDDAP™ 伺服器將從伺服器啟動開始 。 這意味著數據集將立即開始加載, 而不是等待到要求被提出 。
         
    * 移除 MVRows 在 EDDTable FromultidimNcFiles 中的參數將有效果 。 假設它會大大加速一些查詢, 但這可能不適合所有的數據集 。 更多信息,请参阅 [參數描述](/docs/server-admin/datasets#removemvrows) .
         
    * 數據集 (NcFiles 和 EDD 表格 EDDGrid 來自 Nc 檔案) 使用 Zarr 檔案已支援 。 它們必須包括「 zarr 」 。 看 [數據集文件中的 zarr secion](/docs/server-admin/datasets#zarr) 更多細節
         
    * 新的數據集類型, EDD Table FromParquetFiles 已支援 。 看 [數據集中從Parquet Files 分離的 EDD表](/docs/server-admin/datasets#eddtablefromparquetfiles) 更多細節
         
    *    [普羅米修斯度量衡](https://prometheus.io/) 目前可使用/erddap/度量衡。
         
    * 已有新的 XML 解析器執行 。 此新解析器允許使用 X Include 。 datasets.xml . 多虧了阿尤什·辛格的特徵
         
    * 新增參數於 datasets.xml 控制不同寻常的活動電子郵件。 非常動性 faultPercent 預設為 25% 的舊值 。 多虧了阿尤什·辛格的特徵
         
    * 在 setup.xml 中新增參數, 在狀態. html 頁面上顯示數據集加載錯誤 。 它預設為真, 禁用狀態頁面上的數據集錯誤, 設定為錯誤的 LoadErrorsOnStatusPage :&lt;顯示 LOADErrors 在狀態Page &gt; false&lt;顯示 LOAD Errors 狀態頁面 &gt;
         
    * 一些小變更與錯誤修正 。
         
*    **為 ERDDAP™ 發展者 :** 
    * 分離到單位與集成 (慢) 測試 也有更多測試被啟動,
         
    * prone 錯誤 (有些支票仍然關閉) 和Spot Bugs整合到馬文.
         
    * 完整碼基底格式化以符合 Google 樣式指南 。
         

## 2.24版本{#version-224} 
 (2024-06-07年) 

*    **新特性和變更 (使用者) :** 
    * 新增音效數據集的調色板 EK80 。 多虧了羅布·塞馬克
         
    * 解決 EDDTable Aggregate Rows 的問題, 多虧了馬爾科·阿爾瓦的修复和蟲子報告
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 安全改變: Google 認證可能需要修改您的 CSP 。
        
具体地說,你可能需要加上https://accounts.google.com/gsi/style到 stlye-src 和https://accounts.google.com/gsi/要連接- src。 您現在可以用到的文稿弧https://accounts.google.com/gsi/client.
        
欲了解更多信息,您可前往 [谷歌頁面](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) 關於 CSP 配置 。
         
        
    * 新增共享監視服務 。 這是監視目錄更新的新選項 。 每個檔案系統有一條線, 而不是每套資料有一條線 。 這很可能會大大減少用于監視變更的線程數 。 這意味著所有的數據集都會一起更新 而不是每個數據集都有自己的更新頻率 這很可能意味著大部分數據集的更新更频繁 。
        
要開啟此新增&lt;使用共享監視服務&gt; true&lt;/ 使用共享監視服務&gt; 到您的設定. xml 。
        
          
請試試看 向Chris回報你的工作原理 在諾亞戈夫的約翰
         
    * 修正日志中的 var 名稱 。 多虧了阿尤什·辛格
         
    * 一些小變更與錯誤修正 。
         
*    **改进 ERDDAP™ 發展者 :** 
    * 使用 Docker 支援本地發展 。 多謝馬特·霍普森和羅杰
         
    * 支持使用Jetty及改善文件的本地發展。 感謝米卡·溫格倫
         
    * 變更測試以减少跨平台的問題 。 謝謝你 肖恩·圣薩瓦奇
         

## 2.23版本{#version-223} 
 (2023-02-27年) 

表示在轉變至繼任者克里斯·約翰時, 所有密碼變更都由奇斯·約翰完成 除非另有說明

*    **新特性和變更 (使用者) :** 
    *    (無)   
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 安全改變: Google認證目前由新的Google身份服務圖書館完成, Google支持舊的"Google Sign In"系統將停用 2023-03-31. 所以,如果你用 Google 認證 ERDDAP™ 安裝, 您必須更新到 ERDDAP™ v2.23+在那之前。 (鮑勃很遺憾 是鮑勃的錯)   
         
    * NCCSV現在是v1.2。 變更是檔案現在是 UTF-8 編碼的檔案 (他們是ASCII) 所以現在可以包含任何Unicode字元, 而不用編碼為\\u_hhh_, 雖然這仍然是允許的 。
在寫入 NCCSV 檔案時, ERDDAP™ 現在寫 v1.2 文件 。
         ERDDAP™ 仍然會讀取符合 v1.0 和 v1.1 规格的 NCCSV 檔案 。
多虧了Pauline-Chauvet、n-a-t-e和thogar-computer的建議, 多虧了鮑勃·西蒙斯的代碼變更
         
    * NEW: 狀態. html 網頁現在有一條線接近頂端, 表示目前載入的數據集載入量與相關的數據, 或是沒有載入數據集, 沒有。 這對我們很有幫助 ERDDAP™ 管理員試圖找出為什麼載入 數據集要花那麼久 另外, nGridDatasets、 nTableDatasets 和 nTotalDatasets 下方數目是即時的 (以前,他們是 最後一個主要載荷的末端 數據集) .
這是給羅伊·門德爾索恩的 多虧了鮑勃·西蒙斯的代碼變更
         
    * 改进:生成達塔斯 Xml 變更為 CF-1.10 。 (是CF-1.6) 在"公约"的屬性中。
多虧了鮑勃·西蒙斯的代碼變更
         
    * 一些小變更與錯誤修正 。
         

## 2.22版本{#version-222} 
 (2022-12-08年) 

表示在轉變至繼任者時,

*    **新特性和變更 (使用者) :** 
    *    (無)   
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 無所事事
         
    * 安全BUGFX: Cross Site 文稿相關的錯誤 。 多虧了 NOAA 安全掃瞄以捕捉到它。 這表明 NOAA 安全局正积极和例行地尋找安全缺陷 ERDDAP .
         
    * 保安: 使用過的數據庫 ERDDAP™ 同往常一樣, 這次包括更新 PostgreSQL 驅動程式 (它有安全漏洞) 至42.5.1。
         
    * 改进: 更小的變更 ERDDAP 內存管理系統應能減少因缺乏內存而失敗的機會。
         
    * 一些小變更與錯誤修正 。
         

## 2.21版本{#version-221} 
 (2022-10-09年) 

*    **新特性和變更 (使用者) :** 
    *    (無)   
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 做: Java 17,你不該在JAVA OPTS中使用\\-d64 在setenv.bat或setenv.sh. 所以,如果它在那里,請移除它。 我想64比特模式已經選擇了 當你下載64比特版本的時候 Java . 多虧了山姆·伍德曼
         
    * Bug FIX: UG: 有時, 新的電子郵件系統試圖太常登入, 現在,電子郵件系統避免了這和關聯的問題。
         

## 2.20版本{#version-220} 
 (2022-09-30年) 

*    **不要用v2.20. 它有缺陷。** 但管理者在升級到 v2. 21+ 時, 仍需要做以下列出的 DO 項目 。
     
*    **新特性和變更 (使用者) :** 
    *    (無)   
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 我們重新啟動了舊的記憶管理系统 (數學 2. 確保記憶) 并修改了新的內存管理系统 (EDStatic. sed 此要求) 以更好的工作。 看 [內存狀態](/docs/server-admin/additional-information#memory-status) 詳情
         
    * 變更: 預設值&lt;ipAddressMax 要求 &gt;  in datasets.xml 由7增加到15。 顯然有些合法 WMS 客戶端可以產生7個以上的同步要求 。
         

## 版本2.19{#version-219} 
 (2022-09-01年) 

*    **不要用v2.19. 它有缺陷。** 但管理員在升級到 v2. 20+ 時, 仍需要做以下列出的 DO 項目 。
     
*    **新特性和變更 (使用者) :** 
    * 有新的伺服器端功能, orderBy 降級,它像 orderBy 但按降序排序 多虧了亞當·萊德比特
         
    * 改善:現在,圖 (但不是地圖) 以填充畫布上的空間, 您可以新增和操控 &. size_%width_ , 以取得高大的圖、 平方圖或寬的圖片 。 | 高度(_H) (其中寬度和高度指定畫布的大小,以像素為單位) 在要求的網址上。 (在 .graph 網頁上不是此選項 。 您必須手動加入網址 。) 如果您不指定 &. 大小參數, 要求 . smallPng, . png, . groupPng, . smallPdf, pdf, 和. 多虧了鮑勃·弗萊明
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 做: ERDDAP™ 現在需要 Java 17和相關的Tomcat 10. 你必須遵循 ERDDAP™ 安裝指令 (或等效的,例如,多克) 要安裝 Java 17和Tomcat 10 复制你的 \\[ 湯姆卡 \\] / 內容目錄, 從您的Tomcat 8 安裝到新的 \\[ 湯姆卡 \\] 目錄。 你不需要做其他的改變 ERDDAP 此變更的安裝 。 也就是說 ERDDAP™ 像以前一樣工作
        
不要忘了做 ERDDAP - 在提升Tomcat時對Tomcat的伺服器. xml 和上下文. xml 的相關變更 。 看 ERDDAP 是 [Tomcat 安裝指令](/docs/server-admin/deploy-install#tomcat) .
        
我的印象 Java 17是它更喜歡更多的處理力和記憶體 長期的,更大的應用程式如 ERDDAP™ ,所以工作速度稍慢于 Java 8台低功率電腦 (例如,2个核心和最小RAM) 工作速度稍快于 Java 8台功率更高的電腦 (例如,4+ 核和充裕的RAM) . 所以,如果你看到糟糕的性能,就使用 Linux 的程式 [上](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/) 以檢查資源用量并考虑提供 ERDDAP™ 更多資源, 記憶很便宜&#33; 大多數手機的處理器和內存都比你們中有些人運行的伺服器多 ERDDAP &#33;
多虧了艾琳·特恩布爾
         
        
    * 做:如果使用 ERDDAP™ 為了卡珊德拉 你需要繼續使用 Java 你用它來運行卡珊德拉號 切換到 Java 17 用于執行Tomcat+ ERDDAP .
         
    * 推荐: 如果您的伺服器的 CPU 有 4+ 核心和 8+ GB 的 RAM, 請考慮改變為您的設定值 datasets.xml 文件 :
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

如果您的伺服器有更少的資源, 請用" 1" 表示其中兩個設定值 。
nThreads 系統 EDDGrid 從檔案與 EDD 表格 Files 已大为改善 。 這些變化使速度大增 (例如, nThreads 設定到 2 或更多時的 2X 速度) 最具挑戰性的要求 (當需要處理大量檔案以收集結果時) . 克里斯·約翰的一些相關變化 也將導致全程普遍加速 ERDDAP . 這些變更的代碼是由克里斯·約翰提供的. 謝謝你 克里斯&#33;
         
    * 警告: 連字符 datasetID 's 已贬值, 不再支持 (雖然技術上仍然允許) . 他們可能會在下次釋放時被拒絕。 若您使用連字符, 請切換為下調 以避免麻煩 。 如果你現在改變了,它以你自己的速度。 如果你等到下一次釋放,你會陷入恐慌,不得不在那天處理.
         
    * 現在,為 .htmlTable 如果 String 儲存格中的資料包含: image/ png; base64 , 以及一個已編碼的 . png 影像, ERDDAP™ 顯示圖示 (讓使用者看到圖片,如果它們在它上面徘徊) 並按鍵儲存文字或影像到剪貼板。 多虧了馬可爾巴 (提供密碼的人) 和鮑勃西蒙斯 (稍稍修改的) .
         
    * 新的 : - 不添加標準名稱
如果您在執行產生時將 \\- doNoteAddStandard Names 作为命令行參數 數據集 Xml, 產生 數據集 Xml 不會新增 standard\\_name 至 addAttributes 除已命名為經度、高度、深度或時間的變數外, (明顯的 standard\\_name s) . 如果您使用產生的輸出, 這可能有用 數據集 直接在 Xml 中 ERDDAP™ 不編輯輸出, 因為產生 數據集 Xml 常猜 standard\\_name 不對 (注意,我們總是建議您先編輯輸出後再用到 ERDDAP .) 使用此參數會有其他次要的相關效果, 因為猜測 standard\\_name 通常用于其他目的,例如: long\\_name ,並建立色彩列設定值。 多虧了凱文·奧布萊恩
         
    * 你可以放&lt;更新MaxEvents &gt; 10&lt;/ 更新 Max 事件 &gt;  in datasets.xml   (与接近頂端的其他設定值) 更改檔案的最大變更數量 (缺省=10) 由更新的 Everynimillis 系統處理。 多數 (100?) 相當重要時, 看 [更新 MaxEvents 文件](/docs/server-admin/datasets#updatemaxevents) . 多虧了約翰·莫雷爾
         
    * 新增全球支持 " real\\_time 真的 | 假的字串屬性 。
如果這是假的 (默认) 如果數據集不使用更新 每一個NMillis, ERDDAP™ 會缓存對檔案類型的回覆, 因為要先建立整個檔案 ERDDAP™ 可以開始將回應寄給使用者, 再用到15分鐘左右 (例如, .nc ,.png) .
如果此設定為真, 或是數據集使用更新 每一個NMillis, ERDDAP™ 永遠不會缓存回應檔案, 永遠會傳回新建立的文件 。
多虧了約翰·莫雷爾
         
    * 電子郵件現在以另外的電子郵件來發送。 這讓加載數據集和其他產生電子郵件的動作更快, 因為載入Datasets不需要等待電子郵件的發送, 有時需要很長時間 。 新的系統可以每封電子郵件發送多封電子郵件, 从而減少電子郵件伺服器登記數量, 在 log. txt- 中尋找「 emailThread 」 。 注意 nEmailsPerSession=0 的數據顯示有麻煩, 即電子郵件會議無法傳送任何電子郵件 。
多虧了鮑勃·西蒙斯
         
    * 發送電子郵件的代碼稍有不同 (因為 Java 17 和電子郵件的變更) . 如果您無法發送郵件, 請用電子郵件 。 erd.data at noaa.gov .
         
    * 新 : 訂閱「 觸碰」 遠端網址的動作, 目前已以單一的觸控目錄處理 。 這讓加載數據集和其他觸摸網址的動作更快, 因為載入達塔塞特並不需要等待觸摸完成, 有时需要很長時間 。 在 log. txt 中, 有 TouchThread 在狀態. html 的頁面和診斷訊息的數據 。
多虧了鮑勃·西蒙斯
         
    * New: 在狀態.html頁面上, 在「主要載入達塔塞斯時空系列」中, 有一個新的「 shed」 欄位, 表示因目前而丟棄的要求數量 。 ERDDAP™ 內存用量太高了 。 HTTP 狀態代碼為 503 。 那些要求不一定有問題 他們只是忙碌時才到 這是修改方法的一部分 ERDDAP™ 處理高記憶體使用率。
         
    * New: 在Unix/Linux電腦上, 狀態. html的網頁上有「 OS Info」 一行, 包括 CPU 載載量和內存使用。
         
    * 現在,當 ERDDAP™ 重新啟動與快速 Restart= true, EDD Table fromFiles 資料集會重新使用子集 .nc 不同 .nc . 對一些數據集來說, 這大大減少了載入數據集的時間 (例如,60秒至0.3秒) . 與新的電子郵件Thread與工作Thread一同 (见上文) ,此應大大加速重启 ERDDAP™ 很多人 ERDDAP™ 设施。 多虧了本·亞當斯和約翰·克福特
         
    * CHANGED:以前,孤兒數據集 (生活在其中的數據集 ERDDAP™ 但不是在 datasets.xml ) 其地位只被提到。 html 和 log.txt 中, 現在,他們被自動移除 ERDDAP™ 並在 log.txt 中註冊,並發送至 mail 所有的一切。 所以,如果你想移除数据集 ERDDAP™ ,現在你要做的就是移除它的塊 xml in datasets.xml 它將被移除 在下一個主要載荷 Datasets 。 多虧了鮑勃·西蒙斯
         
    * 在netcdf-java v5.5.2和v5.5.3中,知道BUG: 其 EDDGrid 從垃圾 產生 Dataset 中的目錄選項 Xml 曾經為 THREDDS 編目工作, 其中包括遠端 THREDDS 編目中的數據集參考 。 現在沒有了 我向Netcdf-java開發商報告了問題。
         
    * BUG FIX:供 Docker 使用者設置.xml 參數通過 ERDDAP XQparam Name _: 表示整體與布尔參數 (例如,電子郵件 Smtp 端口) , ERDDAP™ 所尋找的只是 _paramName_。 現在它在找... ERDDAP * param Name_. 多虧了亞歷山德羅·德·唐諾
         
    * 变化: ERDDAP™ 測試系統現在使用自動系統檢查新建立的測試影像是否完全如預期。 多虧了克里斯 約翰的建議和鮑勃西蒙斯的執行
         

## 版本2.18{#version-218} 
 (2022-02-23年) 

*    **新特性和變更 (使用者) :** 
    * 沒有
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * Bug FIX: UG: .nc 檔案在某些情況下沒有關閉 現在是了 多虧了馬爾科·阿爾瓦 羅蘭·施韋策 約翰·莫雷爾等人
         

## 版本2.17{#version-217} 
 (2022-02-16) 

*    **新特性和變更 (使用者) :** 
    * Bug FIX: UG: 修改后 orderBy 數年前, Tabledap 的 Make A Graph 處理不了很多使用過的查詢 orderBy xxx_. 現在有了 多虧了莫里斯·利比斯
         
    * 前情提要 ERDDAP™ 拒絕了要求 透明 Png是當纬度和/或經度值 部分或完全超出範圍的時候 ( ERDDAP™ GitHub Issues #19, 由Rob Fuller發布 -- -- 感謝您發表Rob) 現在它會傳回影像中任何外延區域的透明像素 。 這對很多客戶端應用程式有用 。 更改密碼以做這個改變 完全由克里斯·約翰完成 謝謝你,克里斯&#33;
         
    * 前情提要 ERDDAP™ 被拒絕的格達普請求, 指定維度的索引值在哪裡 \\[ 高: 低 \\] . 現在它讓這些要求成為有效的 通过互換低高值。 這解決了使用者和Xtracto 等外部程式的长期問題, 它們必須追蹤數據集, 數據集的纬度值從高到低, \\[  (50) : (20)  \\] 因此索引空間中的要求是 \\[ 低:高 \\] . 看https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html現在,像... \\[  (20) : (50)  \\] 其中一個數據集自動被解譯為 \\[  (50) : (20)  \\] .
         
    * CHANGED: . esriAscii 要求現在在使用者的瀏覽器中啟動「 文件: 另存為」 的對話框 。 多虧了喬爾·范·諾德
         
    * Bug FIX: UG: 如果孩子的數據集的經度變數 EDDGrid LonPM180 或 EDDGrid Lon0360 数据集有 valid\\_min 和/或 valid\\_max 屬性,在 EDDGrid LonPM180 或 EDDGrid Lon0360 資料集. 多虧了羅伊·門德爾索恩
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 做:如果你安排&lt;資料 ProviderFormAactive &gt; 假以暫時處理 XSS 的弱點, 請將它放回真實 。
         
    * 安全BUG FIX: 資料提供者表格中的固定XSS脆弱性。 多虧了Genaro Contreras Gutiérrez。
         
    * Bug FIX: UG: 當一個AWS S3 地鐵有1000多個檔案時 ERDDAP™ 扔了「 內部錯誤 」 。 現在修好了 多虧了安迪·齊格勒
         
    * Bug FIX: UG: EDDGrid SideBySide不允許變數 sourceName s 在不同的孩子數據集中是相同的。 現在有了 多虧了約書亞·斯坦福
         

## 2.16版本{#version-216} 
 (2021-12-17年) 

*    **新特性和變更 (使用者) :** 
    * 變化/黑: 多虧各語言編輯員的建議, 多虧了梅蘭妮·阿貝卡斯西 馬爾科·阿爾巴 傑西·巴雷特 菲利佩·費南德斯 艾蒂安·戈丁 詹妮弗·塞瓦吉安 麥克·斯米特
         
    * 根据Google翻譯條款的要求, 而且,&lt;html &gt; 標籤在 HTML 中對每個網頁的標籤, 現在可以正確地辨識非英語網頁已經被機器翻譯 。 多虧了麥克史密特
         
    * Bug FIX: UG: 登入的網頁目前與不同的語言設定正常工作。 多虧了麥克史密特
         
    * 新 orderBy 總和滤波器 重新檢查所有和取消所有按鈕 EDDGrid 資料存取表單網頁 。 多虧了Marco Alba的密碼
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 如果你有
        &lt;疑問 馬克馬格·菲勒&lt;/ 問題 MarkImage 文件 &gt;
在您的設定值. xml 檔案中, 您需要移除整個標籤 (建議, 所以使用預設檔案) 或更改如下:
        &lt;馬克米格·菲勒&lt;/ 問題 MarkImage 文件 &gt;
         
    * 只是讓你知道, [收養](https://adoptium.net/?variant=openjdk8) 已取代 OpenJDK 作为主/推荐來源 Java   (開啟 JDK) .
         
    * 變更: 日志檔案來自 ERDDAP™ 生成達塔斯 Xml, 而 DasDds 現在是 UTF-8, 不是電腦的預設字符集 。 我做了很多檢查,做了一些改變,以确保 ERDDAP™ 總是在讀取或寫入各类檔案時指定正確的字元集, 不再使用 (在若干案件中) 依赖于電腦的默认字符集 。 這更正了幾項錯誤,並盡我所能地接近了使用UTF-8的目標,以尽可能多的檔案類型 (例如.log、.xml、.html, .json , .json 我, .nc 信頭) . 注意很多舊檔案型態需要使用 ISO- 8859-1 (例如, OPeNDAP 達斯 德德 克西夫 .tsv , .nc 3, .nccsv , cpt) . 我之前試過和CF團體合作 Unidata 新增 UTF-8 的支援 .nc 3 份文件; 兩份文件都有阻力 。
         
    * New: 從 AWS S3 下載檔案時, ERDDAP 缓存 從Url系統到 EDDGrid 從檔案與 EDD 表格 從 Files 開始使用新的 AWS 傳輸管理器, 通过平行的區塊下載檔案 (很快) . 目標吞吐量被定為20Gbps, 每個檔案, 所以這與所有 AWS 實驗型態都相當有效, 有了這個改變 ERDDAP 缓存 FromUrl 系統現在提供與 xarray 平行下載預先儲存的檔案的方法相似的速度, 但不需要轉換來源檔案 .nc 和 .hdf 被分割成 xarray 文件 。 其實 ERDDAP 如果後來有人要求從同一檔案讀取, 系統會更好, 因為 ERDDAP™ 現在有一份本地檔案 我們的社區花了好幾年來 .nc 和 .hdf 文件。 現在我們不必把這些都扔出去 只為了在AWS S3中儲存數據時得到好效果 多虧了Rich Signell
         
    * 搜索Engine=Lucene 目前已腐敗 結果與SearchEngine=Index更理想的行為略有不同。 几乎全部 ERDDAP™ 設備 盧塞內省下的時間 無法抵消結果上的差異 如果可能, 請使用 Engine = 原版 。 如果有問題,請發郵件給Bob
         
    * 現在Lucene搜尋引擎的行為更像原始搜尋引擎。 不再有Lucene認為 數據集匹配和原創不符的情況 另外,Lucene的排名 和原著的排名相同 (因為原創性現在總是用於計算排名) .
         
    * Bug FIX: UG: 從最近一版開始 ERDDAP™ 在指定的 AWS S3 桶中不再看到超過 1000 個物件 。 現在 ERDDAP™ 再次看到所有物件。 多虧了安迪·齊格勒
         
    * 現在 EDDTable 外加門 行移除 actual\\_range 當一個或多個孩子的數據集永遠不知道它的變數時屬性 ' ' actual\\_range   (例如,數據庫中的EDD表) . 多虧了埃里克·蓋萊蒂
         

## 2.15版本{#version-215} 
 (2021-11-19年) 

*    **新特性和變更 (使用者) :** 
    *    ERDDAP™ 讓使用者指定所有網頁使用的語言。 如果 ERDDAP™ 設定安裝以使用它, 語言清單會出現在每頁右上角 。 ERDDAP™ 網址來自此版本繼續工作,
        
并非所有文字或所有網頁都被翻譯 。 這項計畫有時間限制,
        
顯然問題是:當Chrome翻譯網頁時, 答案是:這樣,我們對翻譯方式有更大的控制力。 例如數據集的標題與摘要、變數名稱、參數、單位與組織。 翻譯工作大多是找出不該翻譯的字和詞。 另外, 機械翻譯往往會調整某些類型的 HTML 標記 。 管理翻譯讓我們能把問題最小化。
        
翻譯專案由齐曾完成 (a Google 密碼暑假實習生) 和鮑勃西蒙斯使用 Google 的翻譯網頁服務。 是個大工程 謝謝你 琦&#33;
        
    * Bug FIX: UG: ERDDAP™ 現在可以讓ORCID的X成為最後的數字 多虧了莫里斯·利比斯
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 做:
        
        * 您需要做一些與 ERDDAP 讓使用者指定網頁語言的新系統 。
            * 在您的設定的第一行. xml和 datasets.xml 檔案, 變更為 : 編碼=“ UTF-8 ” , 並變更您文字編輯器中的文件編碼, 以儲存為 UTF-8 檔案 。 產生達塔斯 Xml現在假設 datasets.xml 是 UTF-8 檔案。
            * 編譯程式員 ERDDAP : 全部 ERDDAP™ . java 檔案應預設為 UTF-8 檔案 。 您可能需要在 Javac 命令行中加入「 編碼 UTF-8 」 。 (是的) 
            * 要启用此系統 (大力推荐) 在&lt;啟動您指定的BodyHtml5 &gt; 標籤 datasets.xml ,将“ &amp&#33;loginInfo; ” 改为“ &amp&#33;loginInfo; ” | amp&#33; language;" 使語言清單出現在每個語言的右上角 ERDDAP™ 网页。
            *    ERDDAP™ 只使用&lt;啟動您指定的BodyHtml5 &gt; 標籤 datasets.xml 指定每條旗子上方的 HTML 內容 ERDDAP™ 網頁, 不管使用者選擇什麼語言。 如果你改變標籤以使用
" &EasierAccessToScientificData; 而不是"更容易地存取科學資料"和
" &BroughtToYouBy; "而不是"給你帶來," ERDDAP™ 將使用這些語言的翻譯版本。
            * 相似的,新的預設&lt;在 ShortDescriptHtml &gt; 中 datasets.xml 是
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
最後三行內容是將被翻譯的文字取代的東西 。 如果你將其中任何一個轉換 (特別為此( T) 特别是Erddap;) 或所有文字 datasets.xml   (优先排序,如果存在) 或信件. xml, 不管使用者選擇什麼語言, 此文字都會出現 。 這不完美 但我想很少行政官會想編輯&lt;在 35 個不同檔案中提供 35 個不同翻譯的標籤 。
        
          
         
    * 總理:目前有些錯誤處理稍有不同, 所以那些數字可能比以前大一些
         
    * BUG FIX: 產生達塔斯 Xml 表示 EDDGrid Lon0360和 EDDGrid LonPM180 目前排除來源數據集 datasetID "..."\\*和 datasetID "..."\\*Lon0360),
         

## 2.14版本{#version-214} 
 (2021-07-02年) 

*    **新特性和變更 (使用者) :** 
    *    (無)   
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 新: EDDGrid Lon0360 使一個具有經度值 & gt; =0 的網格化的數據集&lt;=360 取自經度值 & gt; =- 180 和&lt;=180. 看 [ EDDGrid Lon0360文件](/docs/server-admin/datasets#eddgridlon0360) . 多虧了戴爾·羅賓森
         
    * 新: ERDDAP™ 管理員現在可以透過一個命名的環境變數, 在設定. xml 中覆蓋任何值 ERDDAP XQ值Name _ 在執行前 ERDDAP . 例如,使用 ERDDAP QQBaseUrl 覆蓋&lt;baseUrl &gt; 值。 部署時可以方便 ERDDAP™ 使用容器, 因為您可以在設定. xml 中設定標準設定, 並通過環境變數提供特殊設定值 。 如果你提供秘密信息 ERDDAP™ 確保這些資訊將保密。 ERDDAP™ 每次啟動時只讀取環境變數一次, 在啟動的第一秒, 所以使用的方法之一是: 設定環境變數, 啟動 ERDDAP™ ,直到 ERDDAP™ 已啟動,然後取消環境變數。 多虧了馬克·波蒂埃
         
    * 改进: 如果在 EDD Table 從... 有很多檔案的檔案數據集有很長的字符串值, 數據集的載入速度會快很多, 對要求的反應會快很多 。 前身 ERDDAP™ 將會為這些數據集的檔案中 min 和 max 字符串值分配很多空間 。 產生的檔案非常大, 讓它被寫作和讀取很慢 。 多虧了OBIS
         
    * 現在, ERDDAP™ 在 CSV 檔案中解釋不同尋常且無效的字元序列的更好工作 。 多虧了OBIS
         
    * FIX:在和卡珊德拉麻煩了一年之后,我終於成功安裝了卡珊德拉. (v2) 所以我們能用卡珊德拉 v2 重新進行測試 所以現在我更有信心地說 ERDDAP™ 卡珊德拉v2和v3合作. 多虧了ONC
         

## 版本2.12{#version-212} 
 (2021-05-14年) 

*    **新特性和變更 (使用者) :** 
    * Bug FIX: UG: 如果你在訂閱黑名單上 現在不能要求你的訂閱清單
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * To Do: New: 系統自動限制恶意使用者和過份強烈合法使用者的能力, 新增 3 個可選標籤 datasets.xml 您可以/應該在之后添加&lt;圖框顏色 &gt; :
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

更多信息,参见: [ipAddressMax 要求](/docs/server-admin/datasets#ipaddressmaxrequests) . ERDDAP™ 也列印「 唯一使用者的數量 」 (自啟動起) " 在狀態.html頁面.
多虧中國人攻擊我 ERDDAP™ 安裝
         
    * 變更至 Postgresql 驅動程式行為 : 當我更新 Postgresql 驅動程式時, Postgresql 和 GenerateDatasetsXml 產生的表格清單中的列名會像以前一樣, 回到所有大寫, 而不是所有小寫 。 我不知道這是否會影響其他事物, 因為數據庫常認為這些名字不敏感。 我的測試數據集仍然正常 但是如果你的數據集停止工作 ERDDAP™ 更新中, 這是可能先追求的原因 。
         
    * Bug FIX: UG: ERDDAP™ 現在也正确處理私人 AWS S3 文件 。 AWS S3 檔案的處理有其他相關的改善 。 多虧了邁克爾·甘格爾和迪倫·普格
         
    * 新: EDDGrid 來自 NcFiles 和 EDDGrid 來自 Nc 檔案 現在可以從「 結構」 讀取資料 。 .nc 4和 .hdf 4份文件。 要辨識從一個結構中產生的變數,&lt; sourceName &gt; 必須使用格式: _ fullStructureName | _會員Name_, 例如群組1/ myStruct | 我的會員 多虧了NRL
         
    * CHANGED: 現在, 如果目前的內存用量加上此要求甚至稍高, 網格化集 此要求的 nThreads 到 1 。 因此, ERDDAP™ 當記憶力稀缺時會保存記憶力 。 多虧中國人攻擊我 ERDDAP™ 安裝
         
    * 監控開啟的檔案數量的新系統 (包括套接字和其他東西, 不只是檔案) 在Linux電腦上的Tomcat。 如果有些檔案錯誤地從未被關閉, 開啟的檔案數量可能會增加, 直到它超过允许的上限, 所以現在在Linux電腦上 (找不到 Windows 的資訊) :
        
        * 狀態最右邊有新的「 開啟檔案」 欄位 。 html 網頁顯示最大檔案開啟百分比 。 在Windows上,它只顯示"?"
        * 什麼時候 ERDDAP™ 產生每個主要數據集重新載入末端的資訊, 它會打印到日志中 。 txt 檔案 :
最大%_%_%%%_%%%_%%%_%%
        * 如果百分比大于50%,會發送郵件至 ERDDAP™ 管理員和電子郵件 一切 去電子郵件地址
        
找出更多 或者你是否看到這問題 ERDDAP™ ,看 [開啟的檔案太多](/docs/server-admin/additional-information#too-many-open-files) .
多虧中國人攻擊我 ERDDAP™ 安裝
         
    * New: 我加入了很多「 太多開啟的檔案」 的檢查與處理, 所以工作只會停止, 使用者會看到錯誤訊息 。 如果讀取資料檔案會造成「 太多開啟的檔案」 錯誤, 資料檔案將不再被標記為糟糕 。
         
    * 新 \\[ 大家长會 \\] / badFilesFlag 目錄 :
如果您在此目錄中放有檔案 datasetID 作为檔案名稱 (文件內容不重要) , ERDDAP™ 將刪除壞的檔案 .nc 此数据集的檔案 (如果有) 盡快重新載入數據集。 原因 ERDDAP™ 重新試著使用先前的檔案 (錯誤?) 標示為壞。 多虧了馬可·艾芭
         
    * 起步時,如果 EDDGrid 來自... 檔案數據集最初在已知有效檔案清單中有 0 個檔案 (例如,它是一個新的數據集) 那么 ERDDAP™ 延遲載入並設立旗號, 以便在主要載入完成後立即載入 。 當有新的數據集時, 這會加速初始啟動 。
         
    * 翻譯: File VisitorDNLS. testAWSS3 () 和檔案 VisitorSubdir.testAWSS3 () ;現在使用 AWS v2 (不是v1) SDK。 所以現在的巨人 ERDDAP™ 發行中現在包含所有需要的檔案, 您不再需要手動加入大體的 v1 AWS SDK 罐檔案 。
         
    * 我改用Maven來探測/加瑟的依赖性 (/lib 中的 .jar 檔案) . 更改為 AWS SDK 的 v2 必須如此 。 未來其他匯入碼需要它 感謝凱爾·威爾科克斯提供他創作和使用的pom.xml 這解決了我很多問題
         
    * 變化: 类路徑參數 (-cp) 用于生成 DatasetXml 、 DasDds 和其他與來源相關的小程式 ERDDAP™ , 而在對程序員的建議中, 現在要簡單得多, 不該再改變, 因為它指的是目錄, 而不是個人檔案 :
\\-cp 課程; C:\\ programs\\ tomcat\\\ lib\\ servlet- api. jar; lib &#123;&#125;
         (或 ':' 代替 ';' 用于 Linux 和 Macs) .
         (我多年前就該這麼做了 當它成為一個選擇)   
         
    * 新 : 產生達塔斯 Xml 有一個新的效用選項 : 尋找重复時刻, 它會通過網格集搜尋 .nc   (相关) 找到重复時間值的檔案。 看 [尋找重复 時間](/docs/server-admin/datasets#findduplicatetime)   
         
    * 新: datasets.xml 可包含&lt;覆蓋此檔案的調色板 &gt; 標籤&lt;調色板 &gt; 標籤值來自信件. xml (或返回信件的值。 xml 如果是空的) . 讓您變更可用的調色板清單 。 ERDDAP™ 正在執行中。 另外,如果你在 ERDDAP™ 內容目錄, ERDDAP™ 將所有在目錄中的 XQ. cpt 檔案复制到 \\[ 湯姆卡 \\] /webapps/erddap/WEB-INF/cptfiles 目錄 ERDDAP™ 開始 這些變更讓您加入調色板, 當您安裝新版本的變更時, 變更會持續 ERDDAP . 看 [調色板文件](/docs/server-admin/datasets#palettes)   
多虧了詹妮弗·塞瓦迪安 梅蘭妮·阿貝卡西斯 也許其他海岸觀察者
         
    * 改:[&lt;慢下來的拖曳物Millis &gt;] (/ docs/ server-admin/ datasets# slow-downtroublemilis / 翻譯) 已用於所有失敗的要求, 不只是幾類。
         
    * CHANGED: RunLAADDASTS 線程在 3/4 載入DASTS 中斷載入DASTS 線程 MaxMinutes 所以LoadDataset有更多時間 注意中断和退出 還有更多更好的診斷訊息
         
    * 從Lucene到v8.7.0.
         
    * 更改: ERDDAP™ 現在以固定寬度字型出現 。
         
    * 變化: EDDGrid 從檔案現在得到轴數值以及 FIRST 的屬性 | Last 檔案, 按&lt;中繼資料自&gt;。 謝謝你 (不是) 致肯·凱西等人
         
    * 無效的單位的 ADDED 支援 。 (自2020-10-01年) AVHRR 先驱者版本 5.3 L3- (L3C) SST 数据集 (第53次 sst d1天和cusipH53 sst n1天) . ERDDAP™ 可以將它們标准化到有效的單位 。 謝謝你 (不是) 致肯·凱西等人
         

## 版本2.11{#version-211} 
 (2020-12-04年) 

*    **新特性和變更 (使用者) :** 
    * BUG FIX:如果變數只有%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 定義值 。 現在它能正确處理情況了 多虧了馬可·艾芭
         
    * Bug FIX: UG: ODV 文字檔有問題 。 ERDDAP™ V2.10。 那些問題已經解決了 多虧了肖恩·貝爾
         
    * Bug FIX: UG: 剛進來 ERDDAP™ v2. 10: 如果在 URL 中指定了 lat Lon 邊界, 世界地圖上沒有畫出邊界框 。 現在又來了 多虧了約翰·莫雷爾
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * Bug FIX: UG: 剛進來 ERDDAP™ v2. 10: ArchiveAdataset、 產生達塔塞特的文稿檔 Xml 和 DasDds 不起作用, 因為他們沒有改變 阶级路徑 ERDDAP™ v2.10 現在是了 多虧了馬可·艾芭
         
    * 在 datasets.xml ,您可能現在有標籤 :
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

目前, 如果是真的 (或是標籤是空的 或者標籤不在檔案中) ,當使用者的請求引發NullPointerException, ERDDAP™ 會傳送堆疊追蹤到 erd.data at noaa.gov   (该 ERDDAP™ 發展团队) . 這應該是安全的 因為沒有保密信息 (例如,要求) 包含在郵件中。 這將可以捕捉到任何 無意之中的不明蟲 導致NullPointer Exceptions。 不然,使用者看例外,但 ERDDAP™ 所以我們不知道有問題需要解決
        
這個標籤有可能導致其他類似的診斷資訊被發送至 erd.data at noaa.gov 未來 電子郵件的內容將永遠是最小的, 多虧了馬可·艾芭
         
        
    * 更改:現在, 常用的壓縮檔案型態 ( .bz2 , .gz , .gzip , .tar , .tgz , .z , .zip ) 也禁止字节範圍要求。 此指定通过&lt;在信件. xml 中, 延伸名不 range requests &gt; 。
         
    * 知道問題: 就像 ERDDAP™ 2.10, .nc ml 檔案要改變屬性, 不要改變屬性 。 據我報導, 這是在Netcdf-java中已知的蟲子,
         

## 2.10版本{#version-210} 
 (2020-11-05年) 

*    **新特性和變更 (使用者) :** 
    * 新的 [插入](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html) 轉換器高效地從格數據集的數值中插入值 。 因此,它对于研究動物軌道數據的研究人员尤其有用。 此轉換器會用一個有經度、經度和時間列的表格 (可能其他列) 返回含有插值的列的表格。 因此,這與流行的 [切變](https://coastwatch.pfeg.noaa.gov/xtracto) 原本由Dave Foley創作的劇本, 但提供優勢, 多虧了戴夫·福里和喬丹·沃森 ( NMFS ) .
         
    * IMPROVED: 高级搜尋目前對非. 它現在會對有永久錯誤的要求提出例外 (例如,在 minLat &gt; 最大Lat 中要求) 或暫時錯誤 (例如: standard\\_name 根本不存在) . 對 . html 的要求, 高级搜尋沒有變化: 和 Google 搜尋一樣, 它盡力而默默地修正或忽略錯誤 。 多虧了Rich Signell
         
    * 改善: 高级搜尋頁面上的地圖現在更大 (你仍然需要看,但更少) 更准确 (但還是不完美) . 多虧了約翰·莫雷爾
         
    * 改善: Make A Graph 網頁上的「 Draw Land magazine」設定,
「外線」只是畫出陸地圖、政治界限、湖泊和河流。
"關"什么也不畫
看 [&. land=... 文件](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) .
多虧了約翰·莫雷爾
         
    * 改进: ERDDAP™ 現在可以使用三种新的標記型態: 無界填充方塊,無界填充方塊,無界填充三角. 此程式的密碼是由 ETT / EMODnet 物理的 Marco Alba 提供 。 多虧了馬可·艾芭
         
    * 新: "files" 系統現在支援平原 文件型態回覆 (...csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv ,或 .xhtml .) 例如, [https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv) .
多虧了凱爾·威爾科克斯
         
    * 改进:當使用者使用資料存取表時產生的網址 (.html) 或 Make-A- Graph (圖片) 網頁現在正確的%- 編碼字元 \\[ 和 \\] . 但從網路安全角度來說, 管理員現在可以設定放鬆的查爾斯= ' ' \\[  \\]  | ' 在 Tomcat 伺服器.xml 檔案中 (不安全) 否 (更安全) .
多虧了安托萬·奎里克 多米尼克·富勒·羅威爾和其他人
         
    * 新 : 如果對 EDD Table 資料集的要求包含( A) 變數 在哪里 (屬性(_A) 名稱, 屬性 值_) , ERDDAP™ 將新增所有屬性(_A) 名稱=屬性 值_ 到要求的變數清單 。
看 [添加( A) 變數 文件](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere) . 多虧了奧瑞莉·布萊恩德等人
         
    * 改: ERDDAP™ 現在拒絕 / files/ 的位元範圍要求 .nc 或 .hdf 文件。 不要試著連接遠端 .nc 或 .hdf 文件仿佛是本地文件。 也常常造成其他問題。 相反:
        * 使用(OPeN)DAP要連接的客戶端軟體 ERDDAP 是 DAP 此数据集的服務 (/ griddap/ 或 / tabledap 在 URL 中) . 就是這樣 DAP 是為我
        * 使用資料集的資料存取表來要求數據的子集 。
        * 如果您需要整個檔案或长时间的重复存取, 請使用 curl , wget ,或您要下載整份文件的瀏覽器,然后從您的本地檔案副本中存取資料。
             
    * 改善: Txt 輸出選項已重新寫入, 以支援新版本的 ODV .txt 檔案,并支援正确顯示軌道、時序和剖面資料。
         
    * 改善 : 現在, 雙引號中的搜尋名詞被解釋成 json 字串, 所以它們可以有\\ 編碼的字元 。 除其他外, 這讓您尋找一個屬性的确切匹配, 例如, "Institution= NOAA  \\n 數據集與機構不符 NOAA   NMFS . 多虧了丹·諾瓦奇
         
    * 改进:在其它地方,浮點數 (特别是轉換成雙倍浮點數) 現在在更多地方以略微四舍五入的形式出現, 例如以前顯示為32.279987296875的雙倍浮標, 多虧了凱爾·威爾科克斯
         
    * BUG FIX: 未簽署的整數音效檔案被略微錯誤讀 。 現在它們被正确讀了
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 你第一次跑 ERDDAP™ v2. 10, 一些基于本地端資料檔的資料集會載入 **非常** 慢慢地因為 ERDDAP™ 需要重製檔案資訊資料庫 。 慢速重新載入后,他們會像以前一樣快速載入. 請耐心點
         
    * 你必須做的事:
        * 當您第一次執行 v2. 10 時, 有些數據集可能無法載入, 因為 ERDDAP™ 現在對一些中繼資料更嚴格 和以前一樣 ERDDAP™ 第一次載入時會發送一份每日報告。 包括未載入的每個數據集的錯誤訊息 。 讀取錯誤訊息以找出問題 。 大多數情况下, 您只需要對數據集的元数据做一點小的變更才能解決問題 。
             
        * 在 datasets.xml 搜索&lt; sourceName & gt; = (注 '=' 表示 [固定值 sourceName ](/docs/server-admin/datasets#fixed-value-sourcenames) ) . 大部分 ERDDAP™ 設置,這些是稀有的。 如果后面有任何值 '=' 是字串 (不是數字) , 您必須將字串用雙引號附加 。 例如,
之前:&lt; sourceName & gt; = KZ401&lt;/ sourceName &gt;
后 :&lt; sourceName & gt; ="KZ401"&lt;/ sourceName &gt;
             
        * 新的:在 setup.xml 有新的選擇設定&lt;預設AccessibilityViaFiles &gt;, 設置預設&lt;可存取 ViaFiles &gt; 的每套資料。 此新標籤的預設是虛假的, 它模仿了以前的 ERDDAP™ 行為 此下關卡設定可以被給定的數據集所推翻&lt;可存取ViaFiles &gt; 設定。
            
建议 (因為有使用者想要這個) :
如果你想做所有的EDD... 從檔案系統可存取的檔案資料集中
            
            1. 新增此標籤到您的設定. xml 檔 :
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (可選擇) 移除所有
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
 in datasets.xml 因為假設現在是真的
                 
        * 新增 QQ 檔案屬性 :
             ERDDAP™ 用於所有整數變數的預設 QQFillValue: 數據類型的最大值 (例如, 127 位元數) . 現在沒有了 为了避免這些值被顯示為數據值 (不缺少值) ,您需要透過 QQFillValue 屬性明确表示這些 。 從現在開始,每次你開始 ERDDAP™ ,它會用 .csv 表格發送管理員的郵件,其中包含整數來源變數列表,這些變數沒有 QQFillValue 或 missing\\_value 屬性,以及建議的新 QQFillVale 屬性。 看 [新增 QQ 檔案 值屬性](/docs/server-admin/datasets#add-_fillvalue-attributes) 需要更多信息和指示。
             
        * 如果您編譯 ERDDAP™ ,您需要修改javac命令行的类路徑參數,以新增這些新罐子的參數 : lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar。 .
             
    * Tomcat 9現在是Tomcat的推荐版本 ERDDAP . 最新版本的Tomcat 8.5+目前也很好。 我們收拾了 ERDDAP 是 [Tomcat 安裝指令](/docs/server-admin/deploy-install#tomcat) .
        
最新版本 Java 8 (不是 Java 9,10,11,...) 從 [采用 OpenJDK](https://adoptopenjdk.net/) 仍保留 Java 用于 ERDDAP . Java 8號有「領養OpenJDK」的長期支援,
        
    * 新的: 文稿來源名稱 / Tabular 資料集中衍生的變數
檔案中的 EDD Table 、 數據庫中的 EDD Table 和 檔案名稱中的 EDD Table 資料集中現在可能包含 sourceName . 這可以讓您根据來源檔案中已有的變數做新的變數 。 一個給定的新變數的計算是在結果的一行內完成的, 对所有一行都重复 。 例如, 使經度變數的值為 -180 - 180 °, 與值在 0 - 360 ° 的變數相距 :
        &lt; sourceName & gt; = Math2. anglePM180 (列 (龍) ) &lt;/ sourceName &gt;
详见 [文稿來源名稱](/docs/server-admin/datasets#script-sourcenamesderived-variables)   
多虧了鮑勃·西蒙斯 (之前的計劃 ERDDAP™ v1.0 并找到實施的方法) Kevin O'Brien, Roland Schweitzer, John Maurer, 以及阿帕奇JEXL圖書館 做非常難的部分。 (做得很好) .
         
    * NEW: 未簽署的整數資料型態 (烏比特 烏比特 烏比特) 已支援。 注意很多檔案類型 (例如,.das,.dds, .nc 3) 不支援所有這些新資料類型 。 看 [資料 文件型態](/docs/server-admin/datasets#data-types) 關於如何 ERDDAP™ 處理這些分歧。 值得注意的是,自(OPeN)DAP, 特别是 .dds 的回應, 不支援簽署的字節、 長節或 ulongs, 您可能想要使用 ERDDAP 以表格形式表示的.das和.das http ./erddap/ . **信息** /_ datasetID _.html 网页 (例如, [https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  ) 您可以在其它檔案類型中或 .nccsv 元数据回复 (例如, [https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)  ) ,兩者都支持在所有情況下的所有資料類型。
        
警告: 对于受此變更影響的數據集, 您可能會看到數據集的問題, 因為數據是 ERDDAP™ 從來源讀取可能不同 (例如, 先前讀作簽署整數的變數現在可以讀作無簽署整數) . 產生的問題包括: 新的檔案沒有被加入到資料集中, 以及/ 或您試圖存取資料時的錯誤 。 如果數據集有問題,首先要試著 [設定硬 旗號](/docs/server-admin/additional-information#hard-flag) 用于數據集。 如果這不能解決問題 那你就得看看紀錄 查看錯誤訊息的 txt, 跳入 datasets.xml 用于數據集, 以及/或重新運用 Datasets. xml 產生數據集 。
多虧了Netcdf -java 5.x (迫使我們發表) 以及將到來的CF 1.9。
        
    * 現在有了 [更好的文件/咨询意见](/docs/server-admin/datasets#s3-buckets) 如何從 AWS S3 桶中的檔案建立數據集 。 多虧了米卡·溫格倫
         
    * 變化 : "files" 系統。
        * 處理此事的密碼被重寫成可以被更多課程使用 。
             
        * New: 使用者要求列出目錄, 現在可以請求此回應為標準的普通表格類型之一, 請附上想要的檔案延伸:.csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv ,或 .xhtml ). 例如,
             [https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)   
多虧了凱爾·威爾科克斯和肖恩·圣薩維奇
             
        * 現在,生成 數據集 Xml 不包含&lt;在輸出中可存取ViaFiles &gt; 標籤。 假設數據集會依賴新的數值&lt;預設可存取ViaFiles &gt; 標籤在設定. xml 中 。 看 [可存取 Via 檔案](/docs/server-admin/datasets#accessibleviafiles) .
             
        * 改进: 新增的數據集類型已支援可存取 Via 檔案 : EDDGrid 邊緣邊緣, EDDGrid 總和的分量, EDDGrid 來自厄德達普的EDD Table 從厄德達普的EDDTable EDDGrid 從EDDDable, EDD表從 EDDGrid 和 EDDGrid 從埃托波。 對於這些, 只有在母體和遠端/ 子體數據集都能存取時, 才能存取從給定的遠端/ 子兒數據集傳來的檔案 。 ViaFiles 設定為真( 可能通過&lt;默认可存取ViaFiles &gt; 。 多虧了達米安·史密斯和羅布·富勒
             
        * 我們建議通過檔案系統建立所有相關資料集&lt;預設 AUccessibilityViaFiles &gt; 在設定值. xml 中為真, 因為有一群使用者希望用此方式取得資料 。 除其他原因外, "files" 系統讓使用者很容易看到哪些檔案是可用的, 以及它們上次變更的時候, 从而讓使用者可以輕鬆地維持自己對整套資料的複製。 如果您一般不想讓數據集透過檔案系統存取, 設定&lt;預設可存取ViaFiles &gt; 到錯誤 。 不管怎樣,只要用&lt;可存取ViaFiles &gt; , 用于數據集, 這些集是一般政策中的例外&lt;預設可存取ViaFiles &gt; (例如,當數據集使用時 .nc ml 檔案, 對使用者沒用) .
             
    * IMPROVED : 現在, 如果來源數據集有 CF 網格映射資訊, 請產生 數據集 網格化數據集的 Xml 會新增資訊到全局&lt;新增 Ats &gt; , 資訊會新增到全局&lt;sourceAts&gt; 每次從檔案讀取資料 。 資訊會出現在數據集的全球屬性中,
         
    * 改善: 在讀取時支援群組 .nc 4 (并在一定程度上 .hdf 5) 文件。 一般 ERDDAP™ 資料集將從檔案群組中的變數建立 。 另外,生成達塔斯 Xml 表示 EDDGrid 來自 NcFiles 和 EDDGrid 來自 Nc 檔案 現在不打包了,要一個團體 (例如,“”指任何/所有群組,“某群”、“某群/某群子群”,或“ \\[ 根 \\] 只有根族) . 多虧了查爾斯·卡爾頓和杰西卡·豪斯曼
         
    * 改进:生成達塔斯 Xml 表示 EDDGrid 來自 NcFiles 和 EDDGrid 來自 Nc 檔案 目前未包裝的支援可選擇的「 DimensionsCSV 」 參數, 讓您指定您想要此数据集使用的维度的來源名稱 。 使用「 」 以取得最使用尺寸的變數 。 另外, 此類型的檔案中發生的相關小錯誤目前已固定 。 多虧了Sujal Manandhar
         
    * BUG FIX: 產生達塔斯 Xml 已正確列出「 EDDable From JsonlCSVFiles 」 (不是"EDDable From JsonlCSV") 作為 EDDType 選項之一。 多虧了安迪·齊格勒
         
    * 改进: EDDGrid 來自 Nc 檔案 將「 單位」 屬性标准化為標準/ 「 奇異性 」 (和單位轉換器相同的方法) . 例如, "meter per second" , "meters/second" , "m.s^-1" 和 "m s-1" 都變成了 "m s-1" . 多虧了安迪·齊格勒
        
警告: 這可能會對一些已存在的數據集造成問題 (例如, 讓新檔案標籤為「 壞 」 。) . 如果是, [設定硬 旗號](/docs/server-admin/additional-information#hard-flag) 以重新讀取所有來源檔案。
        
    * 一個變數&lt; sourceName &gt; 可以指定 = NAN 的固定值,變數可以有 actual\\_range 指定有限範圍的屬性。 這有時是有用的, 這樣可以讓數據集 (特别是從檔案名稱數據集中的 EDD Table) 可以有假變數 (s)   (例如,經度、經度、時間) 有 NaN 的固定值,但有有效的 actual\\_range   (按屬性設定) . 然後,在Advanced Search中,使用者可以搜尋有特定經度、經度、時間範圍內資料的數據集,此數據集可以說它有相關資料 (雖然所有實際的數據列會顯示 NaN) . 看 [固定值文件](/docs/server-admin/datasets#fixed-value-sourcenames) .
多虧了馬修·比德爾
         
    * 現在, datasets.xml 從 Ascii Files 或從 ColumnarAscii Files 資料集 的 EDD Table 的區塊可以包含一個傳達的標籤 ERDDAP™ 要忽略檔案上方的所有行, 包括符合指定正規表示式的行 。 例如,
        &lt;跳過信頭( T)\\*\\\*\\\*末頭。\\*&lt;/skipheaderTregex &gt;
將忽略所有直線, 並包含從 " 開始的直線\\*\\*"頭部末端" 看&lt;跳過頭目Tregex &gt; 文件] (/docs/伺服器-admin/datasets#skipheadertoregex) .
多虧了Eli Hunter
         
    * 現在, datasets.xml ColumnarAscii Filesdatas集的 EDD Tables 或 EDD Tables 的區塊可以包含一個顯示的標籤 ERDDAP™ 以忽略檔案中符合指定正規表示式的所有行 。 例如,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

將跳過所有以"#"开头的行 。 看&lt;跳過LinesRegex&gt; 文件] (/docs/伺服器-admin/datasets#skiplinesregex) .
多虧了Eli Hunter
         
    * 新的: datasets.xml 任何 EDD Table 數據集的區塊可能現在包含 & add 變數 在哪里 (屬性名稱CSV_) . 如果有的話 ERDDAP™ 將為指定的屬性增加一個元件 數據集資料存取表單的名字 (.html 网页) 方便使用者添加( A) 變數 在哪里 (屬性(_A) 名稱, 屬性 值_) 要求。
看 [添加( A) 變數 文件](/docs/server-admin/datasets#addvariableswhere) .
多虧了奧瑞莉·布萊恩德等人
         
    * 新 第三方工具 : ERDDAP -林特
         ERDDAP -林特是愛爾蘭海洋研究所的羅布·富勒和亞當·萊德比特的一個程序 你可以用它來改善你的中繼資料 ERDDAP™ 數據集。 ERDDAP -林特"包含一些規則和一個簡單的靜态網絡應用程式,以對付您 ERDDAP™ 伺服器。 所有測試都在網絡瀏覽器中進行". 就像 [Unix/ Linux 林特工具](https://en.wikipedia.org/wiki/Lint_(software) ),可以編輯已有的規則或新增規則。 看 [ ERDDAP -林特](https://github.com/IrishMarineInstitute/erddap-lint) 更多信息。
        
此工具對您之前建立過的數據集尤其有用, 現在要更新您目前的元数据偏好 。 例如, GenerateDatasets 的早期版本 Xml 沒有用任何努力建立全球 creator\\_name , creator\\_email ,建立者型態,或 creator\\_url 元数据。 你可以用 ERDDAP -林特來辨識那些缺乏元数据屬性的數據集。
        
多虧了羅布和亞當 創造了這個工具 并把它提供给 ERDDAP™ 社区。
        
    * 新的:現在可以了,如果一些檔案在一個 EDDGrid 檔案資料集沒有所有資料集的變數 。 檔案會被包含為有變數 (包含所有缺失的值) .
多虧了戴爾·羅賓森和道格·拉托內爾
         
    * New: 日志檔和每日報告中有新的用法數據, 數據被命名為「出自記憶」 (陣列大小) ","出自回忆 (太大了) "和"出自记忆 (太大了) ". 顯示這些類別的使用者的IP位址, 如果沒有麻煩的要求 這些數據不會出現 "出自回忆" (陣列大小) "和"出自回忆 (太大了) " 要求通常不是問題,因為要求很大,以至于 ERDDAP™ 快速抓取並傳回錯誤訊息 。 "出自回忆" (太大了) 要求更危險, ERDDAP™ 在意識到目前沒有足夠的內存來處理要求之前, (雖然在這些要求之前可能還有其他要求) .
        
也有一些新统计数据叫做「 大要求, IP 位址 」 , 顯示提出大要求的使用者的 IP 位址 (目前,网格 .nc 文件 &gt; 1GB) .
        
另外, 狀態. html 頁面上的時序表目前包含一個「 memFail」 欄目, 顯示用「 OutOf Memory 」 失敗的要求數量 (太大了) 自上次主要載入數據集後的錯誤 。 這里除0之外的任何數字都至少值得擔心。
多虧了鮑勃·西蒙斯
        
    * 新的版本 Hyrax 顯示目錄清單與以前不同。 ERDDAP™ 現在可以讀取新舊目錄清單。
         
    * New: 數據集重載和使用者回應需要 &gt; 10秒才能完成 (成功或失敗) 以 " (&gt;10s&#33;) ". 因此, 您可以搜尋此語言的log. txt 檔案, 以尋找重新載入速度慢的數據集或完成速度慢的要求的數據集 。 您可以在 log. txt 檔案中看起來更高一些, 看看數據集問題是什麼, 或是使用者要求什麼, 以及它來自誰 。 這些慢速的數據集和使用者要求有時會被收費 ERDDAP . 所以了解更多這些要求可以幫助你找出和解決問題。
    * 驗證 CF DSG 数据集時 ERDDAP™ 目前確保有 cf\\_role 屬性 的變數在 cdm\\_... 例如, 如果一個時序Profile 数据集有一個有 cf\\_role = timeseries\\_id 屬性的"station\\_id"變數, 那麼, "station\\_id" 必須在 cf\\_timeseries\\_vals 清單中, 但不能在 cf\\_profile\\_vals 清單中 。
多虧了米卡·溫格倫
         
    * 簡化( 簡化 ) 、 少用記憶體、 並可能還回長箭頭 。 多虧了 Unidata .
         
    * 改善: 快速重啟( R) 目前 EDD Table 從 。 (与 n 相關) 文件 (除了NcCFFiles的EDD表和InvalidCRAFiles的EDD表) 因為制造 预期 (和另一個地方) 現在只是讀取樣本檔案的中繼資料 而不是讀取所有的資料 多虧了杰西卡·奧斯汀
         
    * 如果增加的數字都是0's, 例如"2020-05-22T01:02:03.4560000Z", 現在支持精度大于至毫升的時間串。 多虧了江怡波
         
    * 改善: 產生 DatasetXml 的 EMD。 建議定義Name 用于移除 '(" ) 和所有之後 。 現在它移除(.\\*只有到此為止 sourceName . 現在它也移除了 \\[ .\\* \\] 只有到此為止 sourceName . 多虧了朱利安·保羅
         
    * 改进:生成達塔斯 Xml 變數 destinationName 依需要, 多虧了朱利安·保羅
         
    * 改善: 當 Calendar2. parseDate Time 剖析 dd, hh, 或 HH 時, 第一個數字可能現在是一個空格 。
    * 知道問題: 從開始 ERDDAP™ 2.10, .nc ml 檔案要改變屬性, 不要改變屬性 。 據我報導, 這是在Netcdf-java中已知的蟲子,
         
    * 破碎的林克斯FIX: 我做了一個適當的系統 測試破碎的連結 ERDDAP™ 網頁, 所以目前應該少數斷裂的連結 (至少從每個發行日期起 - 常常會出現新的斷裂連結) .
         
    * BUG FIX: ETDTable FromHttpGet 以某些類型的要求失敗 。 現在沒有了 多虧了BODC的艾瑪
         
    * Bug FIX: UG: 要處理一些要求, EDDTable 為每個要求的變數做了一個暫時的檔案, 檔案名稱以變數的名字結束 。 如果變數名稱也是壓縮型態 (例如,.Z) , ERDDAP 我會試著 (失敗) 要解壓暫時檔案 。 現在暫時檔案名稱以 ". temp" 結束 。 多虧了馬修·比德爾
         
    * BUG FIX:生成 DatasetsXml 和 Calendary2. 轉換 Java 日期 格式在試圖修訂可能无效的日期時間格式時, 可能會發生錯誤的變更 。 值得注意的是, 不會修改自動建議的日期時間格式 。 多虧了馬修·比德爾
         
    * Bug FIX: UG: 如果從遠端 URL 取得內容時出錯, 如果此錯誤被壓縮, ERDDAP™ 現在正确解壓錯誤訊息 。 多虧了鮑勃·西蒙斯
         
    * Bug FIX: UG:&lt;在 EDD 時, 訂閱ToRemoteErddapDataset &gt; 未被使用... 來自 Erddap 的資料集是孩子的資料集 。 現在是了 多虧了克里斯·羅姆索斯
         
    * BUG FIX: 產生達塔斯 Xml 不再認為從「 latin」 開始的來源變數名稱可能是經度 。 多虧了文森特·盧佐
         
    * BUG FIX: 現在, 在處理使用者的請求時讀取數據檔時, 一個 OutOutMemoryError 并不是在 BadFiles 清單中新增檔案的理由 。 多虧了鮑勃·西蒙斯
         

## 2.02版本{#version-202} 
 (2019-08-21年) 

*    **新特性和變更 (使用者) :** 
    * New: 有兩種方法可以搜尋多個數據集 ERDDAP s. 他們的工作有些不同,有不同的介面和選擇。
        
        *    [搜尋多重 ERDDAP s.html](/SearchMultipleERDDAPs.html) 來自鮑勃·西蒙斯/ NOAA   NMFS   SWFSC   ERD .
        *    [http://erddap.com](http://erddap.com) 來自羅布·富勒/愛爾蘭海洋研究所
        
多虧了泰拉·默里最初的要求
         
    * 改善: "files" 下載檔案的系統 (例如,AWS S3) 所以使用者會從來源下載數據, 而不是使用 ERDDAP™ 作為中介 多虧了安迪·齊格勒 NOAA .
         
    * New: 以新的 AWS S3 相關功能為例,
         [~110 樣本數據集](https://registry.opendata.aws/) 可以讓任何人瀏覽幾乎全部的內容
         [AWS S3 開啟資料桶](https://registry.opendata.aws/) . 如果按下 "files" 您可以在 S3 桶中瀏覽目錄樹與檔案。 由于這些資料集的工作方式,這些目錄列表總是完美更新,因為 ERDDAP™ 讓他們飛起來 如果您點擊目錄樹到實際的檔案名稱並點擊檔案名稱, ERDDAP™ 將會將您的請求重定向到 AWS S3, 以便您直接從 AWS 下載檔案 。 ERDDAP™ 管理者可以
         [讀取其他 S3 桶的路徑](/docs/server-admin/datasets#working-with-aws-s3-files) . 多虧了安迪·齊格勒 NOAA .
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 你需要做的事:
         
    * 改进: ERDDAP 儲存串列的方法 (串列) 更有效率的記憶力。 字符串 全部使用陣列 ERDDAP™ ,特别是讀取表格 ASCII 資料檔。 另外, 其他變更讓讀取 CSV/TSV/SSV ASCII, 專欄 ASCII, 以及 jsonlCSV 表格數據檔更快、更有效率。 結果是: 一個764 MB ASCII 資料測試檔 (但压缩到52MB .gz 文件) 3,503,266行和33列,最大內存用量由10GB降至0.6GB (峰值) . 讀到的時間是~7分鐘 (但因電腦裡有多少物理記憶而大不相同) 下至~36秒 (包括用于简化的 10s () 它只被 GenerateDatasets 使用 Xml 命令) . 其他很多地方 ERDDAP™ 這項增強的記憶力效率會有所助益。 多虧了泰拉·默里和馬修·比德爾
        
我探索了另一個辦法 (將字串儲存在 StringArray 中, 以 UTF-8- 編碼字元列) . 這會減少內存使用量, 和現在使用的系統相比 這似乎是個壞交易 給電腦更多記憶更簡單 (用~200美元買更多記憶體) 而不是讓它更快 (買一台全新的電腦) .
        
如果方便, 仍可依某些標準, 將巨大的表格資料檔案分拆成幾個更小的檔案。 stationID 和/或時間。 ERDDAP™ 通常只需按使用者的要求開啟其中一個小檔案, 就能更快的回應 。
        
    * 現在有了 [ ERDDAP™ AWS S3 文件](/docs/server-admin/datasets#working-with-aws-s3-files) 描述如何得到 ERDDAP™ 以使用 AWS S3 桶中的資料檔。
而且, ERDDAP™ 現在在 AWS S3 中使用新功能 Java API.
而且, ERDDAP™ 現在允許 AWS S3 網址包含附加的字元 (周期,连字符,下划線) 在桶名。
而且, ERDDAP™ 目前要求以特定方式辨識 AWS S3 桶 URL :
          https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/  
其中前缀是可選擇的。
多虧了安迪·齊格勒 NOAA .
         
    * 改进:生成達塔斯 Xml 正在處理其他常见 missing\\_value s 立方體為缺失值, 因此更可能將列轉換成數值數據型態 。 另外, 原始箭頭. 簡化 () 現在紀錄了特定數據值讓它把給定的欄列當作字串的欄位 。 多虧了馬修·比德爾
         
    * 改进:&lt;要求 Blacklist &gt; 現在支持 。\\*.\\*  (或 :\\*:\\*用于 IPv6) 在 IP 位址的末端可以列出更大的 IP 位址, 例如 110. 52 。\\*.\\*  (中國Unicom天津) . 參考文件 [&lt;要求Blacklist &gt;] (/docs/server-admin/datasets# 要求黑名單) 多虧了中國Unicom和中國電信
         
    * 如果数据集的來源未指定 "institution" 屬性, 產生代碼 Xml 和載入Dataset 現在從「 建立者」 屬性得到它 (如果有的話) . 多虧了米卡·溫格倫
         
    * 标准化 ASCII 資料檔案中沒有總是被套用的東西.
另外, EDDTable 在來源有 String 時間值及標準化時, 無法妥善處理時間值的限制 正在使用的是什么。
多虧了帕洛瑪·德拉瓦萊
        
我之前沒說清楚 你應該用標準的 當你真正需要的時候,有什麼特徵? (例如, 不同來源檔案以不同方式儲存時間值) , 因為有些對使用标准化的數據集的要求 處理得慢一點
        
    * Bug FIX: UG: 代碼中的錯誤 EDDGrid 從 NcFiles 導致它失敗 .nc 4和 .hdf 5份有「長」的檔案 (英寸64) 變數。 現在修好了 多虧了弗里德曼·沃布斯
         
    * Bug FIX: UG: ISO 19115 檔案的小變更讓不同的驗證符快樂 。 多虧了克里斯·麥克德爾米德和安娜·米蘭
         

## 2.01版本{#version-201} 
 (2019-07-02年) 

*    **新特性和變更 (使用者) :** 
    * 沒有
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * Bug FIX: UG: 產生資料存取表的代碼中的錯誤 tabledap 數據集使一些數據集的網頁空白。 另外,我改进了所有 HTML 頁面上處理意想不到的錯誤的方法 所以他們會 (通常) 顯示錯誤訊息。 多虧了馬可·艾芭
    * 改进:生成達塔斯 Xml 不再在輸出的最上面列印長長的警告 。 你看 [編輯產生 數據集 Xml 輸出](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better) . 多虧了史蒂芬·鮑姆
    * 改进:生成達塔斯 Xml 在不同的情況下,&lt;更新 EDD... from...Files data sets 的 EveryNimillis &gt; 。 另外,生成達塔斯 Xml 正在阻擋 EDDTable FromFiles 数据集的原始「 提取」 系統 。

## 2.00版本{#version-200} 
 (2019-06-26年) 

*    ** ERDDAP™ v2.00終於到了&#33; 耶&#33;**   
     
    * 我們為完成這個版本需要很長的時間而道歉。
謝謝你的耐心
         
    * 好消息是多用時間來增加使用者要求的功能。 壞消息是,即使延遲了, 我們很抱歉,但把這個釋放出來 似乎比拖延更多更重要 (永遠?) 繼續增加新的功能。 我們保證今后會更频繁的釋放
         
    * "第二版? 是否有大改變和不相容?”
新的大特色? 是的
管理員或使用者的大不相容或變更 ? 不
我們從v1.82跳到v2.00:
        * 部分是為了慶祝十年 (現在是11) 自首次公開 ERDDAP™   (在2008-05-06的v1.00, 外表看起來非常像v2.) . 在那時 ERDDAP™ 已經從一個安裝器變成了至少12個國家的近百個安裝器 (澳洲、比利時、加拿大、法國、印度、愛爾蘭、意大利、南非、西班牙、泰國、英國、美國) .
        * 在一個全新的方向上, ERDDAP™ 現在有數據摄入系統可以跟隨现有的數據伺服器服務 (你看 [從 HttpGet 的 EDD 表格](#eddtablefromhttpget) ) ,
        * 部分是因為從1.82到2.00 跳得并不大 所以這看起來是時候了
             
    * 另一個好消息是,現在還有兩個團體 提供密碼給 ERDDAP™   (表示他們將繼續) 愛爾蘭海洋研究所的羅布·富勒和亞當·萊德比特 以及PMEL和Wathertop顧問的羅蘭·施威策 謝謝你 實際上,他們在自己選擇的專案上工作, 但這是經典的開源發展模式, 群組為他們最想看到的功能提供代碼。 撰稿者的附加益惠:一旦完成,他們就可以使用新的功能;他們不必等待下一次發行 ERDDAP . 歡迎你們的團體也出力&#33; 看 [ ERDDAP™ 程式指南](/docs/contributing/programmer-guide) .
         
    * 我們希望你喜歡 ERDDAP™ v2.00. 我們期待未來十年 ERDDAP™ 以及全世界越来越多的使用。
         
*    **新特性和變更 (使用者) :**   
     
    * 新: orderByMean 滤波器
用于 tabledap 數據集會計算指定群組的資源。 而且,所有的 orderBy 選項目前支持另外的設定群組的方法:_numeric Variable \\[ 數字 \\[ 單位 \\]  \\[ : 抵消 \\]  \\] _,例如1天或10:5深度。 例如, stationID 時間、 水位( T) orderByMean  (" stationID ,1天") 將結果排序為 stationID 和時間,然後計算並傳回水的平均值 stationID 每天。 這些是非常有用和有力的新特征。 由愛爾蘭海洋研究所的Rob Fuller和Adam Leadbetter提供, 謝謝你 羅布和亞當&#33;
         
    * 新的:表格数据集的輸出檔案型態 : [資料 表](https://developers.google.com/chart/interactive/docs/reference#dataparam) ,
a JSON 檔案格式化,供使用 Google Visualization 客戶端文庫 ( Google Charts ) . 代碼由羅蘭·施威策提供 經Git提交 謝謝你 羅蘭&#33;
         
    * 新的:表格数据集的輸出檔案型態 : [ .jsonlCSV1 ](https://jsonlines.org/examples/) ,
這就像现存的 .jsonlCSV 选项,但第一行有列名。 多虧了尤金伯格
         
    * 新 : 如果管理員啟用它, 使用者現在可以登入他們的 。 [ORCID](https://orcid.org) 帳號。
這是一個 OAuth 2.0 認證系統, 很像 Google 認證 。 ORCID被研究者广泛用于獨特的自我認同. ORCID帳戶是自由的, 看 ERDDAP 是 [Orcid 認證指令](/docs/server-admin/additional-information#orcid) . 多虧了BCO -DMO (亞當·謝帕德 丹妮·金卡德等) .
         
    * 新 : 一個新的 URL 轉換器會將过时的 URL 轉換成最新的 URL 。
任何 ERDDAP™ 例如,
         [此連結到轉換器 ERD   ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html) . 這對數據管理員有用 。 這在內部亦被 GenerateDatasetsXml 使用 。 多虧了鮑勃·西蒙斯和莎倫·梅西克
         
    * 改进: [時間轉換器](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) 現在有將任何常见的字串時間轉換成 ISO8601 字串時間的選擇, 或是轉換一個 UDUNITS -像時空單位串成正體 UDUNITS 時數單位字符串。 這對 ERDDAP™ 需要為字串時數變數指定「 單位 」 屬性的格式 。 這在內部亦被 GenerateDatasetsXml 及 EDDTable FromFiles 的標準化功能使用 。 多虧了鮑勃·西蒙斯
         
    * 新的: [單位轉換器](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) 有了新的「標準UDUnits」選項。
例如,"deg\\_C/m"和"des\\_C米-1"都轉換成
1度 此功能也被 EDDTable From Files 的標準化使用 。 多虧了鮑勃·西蒙斯
         
    * 用于圖形 (除了表面圖) 在格達普和 tabledap “ Make A Graph” 網頁, 當 x 轴不是時間轴時, 如果只看到 x 轴變數範圍的子集, 現在在圖表上方有按鈕可以讓 X 轴左轉或右轉 。 多虧了Carrie Wall Bell / Hydrophone計畫。
         
    * 新的 : 对于圖, X 和/ 或 Y 轴現在可以使用 Log 比例 。
使用者可以通过 gradap 上新的下拉元件控制 Y 轴大小 tabledap 建立圖面網頁 。 看 [.x 朗格和. 射程文件](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange) . 多虧了Carrie Wall Bell / Hydrophone計畫。
         
    * 改进: ERDDAP™ 現在更好使用 HTTP 錯誤碼, 現在傳回一個(OPeN)DAPv2.0 格式化的錯誤消息有效载荷 。 看 [細節](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors) . 多虧了安托萬·奎里克和奧雷莉·布萊恩德
         
    * 不使用Netcdf-java/c或其他軟體工具連接 .nc 或 .hdf 使用的文件 ERDDAP / files/ system 仿佛是本地檔案 。 ERDDAP™ 現在拒絕了這些要求 也常常造成其他問題。 相反:
        
        * 使用(OPeN)DAP要連接的客戶端軟體 ERDDAP 是 DAP 數據集的服務 (/ griddap/ 或 / tabledap 在 URL 中) . 就是這樣 DAP 是和做得很好。
        * 或者, 使用資料集的資料存取表來要求數據的子集 。
        * 或者,如果你需要整個檔案或者在很長一段時間內重复存取,就使用 curl , wget ,或您要下載整份文件的瀏覽器,然后從您的本地檔案副本中存取資料。
        
          
         
    * 改善: ERDDAP™ 主頁, Full Text Search現在在「檢視所有數據集清單」 之上, 多虧了迪迪埃·馬拉里諾和莫里斯·利比斯
         
    * 改善: 在 Data ProviderForm3.html 上 現在有普通的下載清單 standard\\_name s. 多虧有人在IOOS DMAC會議上
         
    * 在 / files/ web 頁面上, 已連結到新的「 我該怎麼處理這些檔案? 」 。 該部分描述各种檔案類型, 並建議如何與它們合作 。 多虧了莫里斯·利比斯
         
    * 改善:几乎每一份要求 ERDDAP™ 至少要快一點 有時候要快很多
         
    * Bug FIX: UG: 在某些情况下,當 EDDTable 数据集保存某些類型的資料時 .nc 檔案中, 全球的「 id 」 屬性被設定到檔案的建議名稱, 其中包括要讓它成為該要求的獨特名稱 。 現在"id"完全沒變 (如果指定) 或設定到數據集 datasetID   (如果未指定) . 多虧了約翰·莫雷爾
         
*    **事情 ERDDAP™ 管理者需要知道和做:**   
     
    * 這個釋放需要你一些時間和工作。 請耐心點, 打算花上幾小時做必要的改變,
         
    * 為安全起见, 請備份您的目前的設定 。 xml 與 datasets.xml 檔案,以便在不可能的情況下您需要回到 ERDDAP™ v1.82.
         
    * 推荐: Java 現在接受 OpenJDK 的 OpenJDK 8 (升) +熱點。
這是一個開源變數, 包括 Java 其使用不受限制 (不像 Oracle 是 Java 分配) . 它源于 Oracle 是 Java 正在 Oracle 祝福你 出于安全原因, 保持你的 Java 版本最新。 看 ERDDAP 是 [ Java 安裝指令](/docs/server-admin/deploy-install#java) .
         
    * 采用 OpenJDK 的 Java 您的 Tomcat 安裝需要小的新增: 請參考 [資源快取指令](/docs/server-admin/deploy-install#contentxml) . 我想這是取代 -XX: MaxPermSize 設定, (接受) OpenJDK 不再支持 。
         
    * 做:新的預設和建議&lt;字体Family &gt; 設定在設定. xml 是
戴雅武桑斯被建在 收养OpenJDK 中 Java . 看
         [修改字体安裝指令](/docs/server-admin/deploy-install#fonts) .
         
    * 要完成 : 很多標籤從設定. xml 移到 datasets.xml . 優點是你可以改變他們的價值 ERDDAP™ 正在執行, 不重新啟動 ERDDAP . 特別是,你很容易改變&lt;啟動 BodyHtml5 &gt; 以顯示在其中的临时訊息 ERDDAP™ 主頁 (例如, "檢查新的 JPL MUR SST v4.1 數據集..." 或 "這個" ERDDAP™ 2019-05-08T17:00 PDT通到2019-05-08T20:00 PDT") . 如果/當您改變這些標籤時 datasets.xml ,變更將在下次生效 ERDDAP™ 已讀 datasets.xml .
         
        
        1. 將此內容复制到您的 datasets.xml 文件( 任何接近檔案開始的地方, 之后)&lt;erddapDatasets &gt; :
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. 逐一复制值 (如果有) 從您設定的. xml 檔案中傳入您剛貼上的新標籤的每個標籤 (以上)  in datasets.xml . 例如,如果您使用了 30 的值&lt;快取點 &gt; 在 setup.xml 中,您應該將此值复制到新的&lt;快取Minutes &gt; 標籤 datasets.xml   (雖然數值與新的預設值相同, 但最好只留下標籤 datasets.xml 空白) .
            
如果您的值與新建議的預設值不同( 除了&lt;啟動 BodyHtml5 &gt; 和&lt;shortDescriptionHtml&gt;, 用于定制您的 ERDDAP™ 請考慮切換到新的預設值 。 尤其如此&lt;部分要求MaxBytes &gt; 和&lt;部分requestMaxCells&gt;, 預設/ 建議的數值在這些年中已有很大的變化 。
            
复制每個值後, 請從 setup. xml 中刪除此標籤及其描述 。 最好把這些標籤放進去 datasets.xml . 現在有更好的描述 [設定 DatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file) .
            
        
新系統的一個怪點是 當你啟動時的第一個網頁 ERDDAP 會是預設的 ERDDAP™ 网页。 随后的每個網頁都會使用您指定的... Html 內容 datasets.xml .
        
    * 你第一次跑 ERDDAP™ v2.0, 基于本地端資料檔的資料集會載入 **非常** 慢慢地因為 ERDDAP™ 需要以稍稍不同的格式重製檔案資料庫 。 慢速重新載入后,他們會像以前一樣快速載入. 請耐心點
         
#### 從 HttpGet 的 EDD 表格{#eddtablefromhttpget} 
    *    [新的大字串: EDD Table from HttpGet](#eddtablefromhttpget)   
直到現在 ERDDAP™ 只要讀取數據并提供给使用者 現在 ERDDAP™ 有一套簡單高效的系統 可以接收感應器的实时數據 此數據集提供精致的版本: 它記得對數據集的每一個變更, 通常, 使用者只想要最新版本的數據集, 所有變更都應用 。 但使用者可以隨時要求數據庫的資料。 這方便了可复制的科學 因此,与其他大多數近時數據集不同,這些數據集符合資格 [ DOI s](https://en.wikipedia.org/wiki/Digital_object_identifier) . 因為他們遇到 DOI 要求除集合外数据集不變。 看 [從 HttpGet 的 EDD 表格](/docs/server-admin/datasets#eddtablefromhttpget) . 多虧了OOI (從很久以前到現在) 和尤金·漢格 一起提醒大家要努力做重要的事
         
    * 大新面貌: ERDDAP™ 現在可以直接從外部壓縮的資料檔服務資料,包括: .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 ,或 .Z. 數據集可能包括外部壓縮的檔案的混合 (也許是舊數據檔?) 及非外部壓縮的檔案, 您可以隨時壓縮或解壓檔案 。
        
成功了&#33;
在大多數情況下, 我們強烈鼓勵您嘗試, 特別是為數據集和/或數據檔案,
        
這能省你三萬多美元&#33;
這是少有的 ERDDAP™ 可以儲存很多錢的功能 -- 如果你壓縮了很多數據檔案, 您需要少得多的 RAID/ 硬碟來儲存數據, 或者反之, 你可以服務更多數據 (最多10x) 和你已經有的RAID。 如果這個功能能拯救你不再買到另一台RAID,那么它就省下了大约30,000美元.
        
看 [外部壓縮檔案文件](/docs/server-admin/datasets#externally-compressed-files) . 多虧了貝諾特·佩里蒙德和帕洛瑪·德拉瓦萊
        
    * 大新面貌: 全部 EDDGrid 從 Files 和所有 EDD Table 從 Files 資料集中支持 a&lt;取自Url &gt; 標籤和 a&lt;缓存SizeGB &gt; 標籤 。 如果未指定快取SizeGB, 這會下載並維持遠端數據集檔案的完整副本 。 如果指定了缓存SizeGB, 並且是 &gt;0, 這會按需要從遠端數據集下載檔案到本地快取中, 其大小有限, 在與 yude 合作時有用 (例如,S3) 數據檔 。 看 [快取 從Url 文件](/docs/server-admin/datasets#cachefromurl) 詳情 多虧了鮑勃·西蒙斯和羅伊·門德爾索恩 (多年來一直在寫作文稿, 以處理本地複製遠端數據集檔案) 勞埃德·考滕 尤金·漢格 康納·德萊尼 (他在亞馬遜網絡服務公司時) 和谷歌云平台。
         
    * 新的 EDD 表格來自 JsonlCSV 類別可以讀取表格資料
         [杰森 行 CSV 文件](https://jsonlines.org/examples/)   ("比CSV好") . 感謝愛爾蘭海洋研究所的人告訴我這個格式 也感謝尤金·漢格和PMEL 要求支持它作為輸入型態
         
    * 全部 EDDGrid 而所有 File 資料集的 EDD Table 支援 。&lt;nthreads &gt; 設定值, 顯示 ERDDAP™ 應答要求時要使用多少線程 。 看 [nthreads 文件](/docs/server-admin/datasets#nthreads) 詳情 多虧了亞克森數據科學的羅布·博切內克 尤金·漢格 康納·德萊尼 (他在亞馬遜網絡服務公司時) 和谷歌云平台。
         
    * 新标准化 從檔案子類別來看 EDD Table 是什麼?
以前,如果對於指定的變數, 重要屬性的值 (例如, scale\\_factor , add\\_offset , missing\\_value ,%% 1, 單位) EDDTable FromFiles 會為每個屬性選取一個值以「 有效」 , 用其他屬性值標記檔案為「 壞文件 」 。 現在, 有一套系統可以讓檔案在 EDDTable FromFiles 讀取檔案後立即标准化 。 看 [EDD Table from File 的标准化 什么](/docs/server-admin/datasets#standardizewhat) . 其中 ERDDAP 主要目的就是讓資料檔案和數據集以一致的方式存取 。 标准化 新的重要工具是什么? 多虧了馬爾科·阿爾瓦 瑪格麗特·奧布萊恩 (和其他 EML 使用者) 和InPort的使用者。
         
    * 新的 EDD Table 從 InvalidCRA 檔案中可以讓您從 : NetCDF   (v3 或 v4)   .nc 使用 CF DSG 相關列的變體的檔案 (CRA 磁碟) 文件。 此數據集類型的樣本檔案可以在https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[ 2020-10-21 此伺服器目前不可靠 \\] . 雖然 ERDDAP™ 支援此檔案類型, 是無效的檔案類型, 沒有人可以開始使用 。 目前使用此檔案類型的群組被強烈鼓勵使用 ERDDAP™ 以產生有效的 CF DSG CRA 檔案, 並停止使用這些檔案 。 多虧了阿杰·克里希南和蒂姆·博耶爾
         
    * 來自垃圾的 EDD 表格 檔案與 EDD 表格 Hyrax 檔案已贬值 。 請從 NcFiles 切換到 EDD Table (或變體) 加&lt;快取自Url&gt; 。 如果因為某些原因不起作用,就發郵件 erd.data at noaa.gov . 如果2020年之前沒有人抱怨,這些數據集類型可能會被移除.
         
    * 改善 -- 自動轉換非ISO 8601次的系統 (v1.82中引入) 已大為擴展,以處理大量其他格式。 這會影響產生 DatasetsXml 和 ERDDAP 處理來源中繼資料 。
         
    * 改善 -- 其第三次大修改弦時剖析系統 (希望最后) , ERDDAP™ 不再使用 Java 因為有時會影響極時( 年數) 的錯誤, 故使用 DateTime Formatter&lt;=000. ERDDAP™ 現在用自己的系統來解析時間串 。
         
    * 警告:新的弦時剖析系統有些嚴格。 如果您的數據集突然只有時間值缺失值, 原因几乎肯定就是時間格式字串稍有錯誤 。 日志中應該有錯誤訊息 。 txt 與時間格式不符的時間數值有關, 這會幫助您修復數據集的時間格式字串 。 如果您需要幫助, 請使用此選項 ERDDAP "轉換"的時間轉換器 \\[ s \\] 任何常用的字串時間到 ISO 8601 字串時間"——它表示轉換器用于剖析來源字串的格式 。
         
    * 最快、最簡單、最便宜的加速方式 ERDDAP 使用表格資料的權限是把資料檔放到 Solid State Drive上 (SSD) . 多數表格化的數據集相當小, 所以一、二TB SSD可能足以保存您所有表格化的數據集的所有資料檔。 SSD最終會耗盡 如果你把數據寫到一個儲存格裡, 刪除它, 以及寫新數據到那個儲存格裡太多次。 相反,我建議 (越多越好) 你只要用你的SSD寫下數據一次 讀取數據多次 然後,即使是一個消費級的SSD 也應該持續很長的時間, 可能比任何硬碟驱动器要長得多 (厚度) . 消費者級SSD現在便宜了 (2018年,1结核病~200美元或2结核病~400美元) 物价仍然在迅速下跌。 什麼時候 ERDDAP™ 存取資料檔案, SSD 提供兩樣
        
        * 短短的空間 (HDD = ~0.1ms = ~3ms (?) RAID 的 ms, 而 Amazon S3 的 ~55 ms) 和
        * 更高的吞吐量 (HDD = ~ 500 MB/ S, 而 ~ 75 MB/s, 而 RAID = ~ 500 MB/s) .
        
所以,你可以升到 ~10X 性能提升 (對 HDD) 200美元&#33; 與您系統中其他可能的變更相比 (一萬元的新伺服器? 35,000美元的新瑞德? 一個5000美元的新網路開關? 等) 這是目前最好的投資收益 (羅伊) . 如果您的伺服器沒有載入記憶體, 您伺服器的附加記憶體也是一個大且相对便宜的方法, 以加速 。 ERDDAP .
         \\[ SSD對網格化的數據也是很好的, 但大部分網格化的數據集都大得多, 讓SSD非常貴. \\]   
         
    * 每個登記者都會得到角色= \\[ 任何人 在 \\] 即使沒有&lt;使用者 &gt; 標籤 datasets.xml . 如果你設定了數據集&lt;存取到 &gt; to \\[ 任何人 在 \\] 然后任何登入 ERDDAP™   (例如,通过其Gmail或Orcid帳戶) 即使你沒有指定&lt;使用者 &gt; 標籤 datasets.xml . 多虧了莫里斯·利比斯
         
    * 改进: UDUNITS /UCUM 單位轉換器得到了广泛的改进。
它能更好地處理無效的單位字串 (而不是強制有效性) . 結果現在有标准化的語法
         
    * 新的: UDUNITS /UCUM 單位轉換器有新選項,可以標準 UDUNITS 弦。
這很有效 UDUNITS 非標準/ 不合法的字串和 合理好的字串 UDUNITS 弦。 例如, UDUNITS ="米每秒","米/秒", "m.s^-1" 和 "m s-1" 全部返回 M.s-1。 新标准化需要這個 以上所述制度。 多虧了馬爾科·阿爾瓦 瑪格麗特·奧布萊恩 (和其他 EML 使用者) 和InPort的使用者。
         
    * 新的: 多元化的 EDD Table 已存在 [治病](/docs/server-admin/datasets#treatdimensionsas) 選項, 這說明 ERDDAP™ 處理某些維度 (例如,LAT和LON) 好像它們是其他的維度 (例如,) . 這對一些不正確的檔案有用, 這些檔案對不同的變數使用不同的尺寸, 因為它們應該只使用一個維度 (例如,) . 多虧了Marco Alba和Maurice Libes
         
    * 現在,所有 EDDGrid 從... Files 資料集支持新的特殊轴 sourceName 這說明 ERDDAP™ 從檔案中提取資訊Name (只是文件名.ex) 值 **取代** 已存在的最左轴值。 格式是
        \\*\\*取代 FileName,_dataType_,_extractRegex_,_capture group number_
看 [此文件](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . 多虧了 NOAA 开拓者每日聚合数据集 。
         
    * 現在,所有 EDDGrid 從... Files 資料集支持新的特殊轴 sourceName 這說明 ERDDAP™ 從檔案路徑中提取資訊Name (目錄 + 文件名.ext)   
        \\*\\*_pathName,_dataType_,_extractRegex_,_capture group number_
此路徑名稱總是使用 '/' 作為目錄分隔符號, 永遠不要「\\ 」 。
看 [此文件](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . 多虧了帕洛瑪·德拉瓦萊
         
    * 所有EDD表都來自... 檔案數據集支援附加的假變數 sourceName 從檔案中提取資訊的 sName (只是文件名.ex)   (你看 [\\*\\*QQ 文件Name](/docs/server-admin/datasets#filename-sourcenames) ) 或從檔案的完整路徑中找到Name (/ dir1/ dir2/ filename.ext)   (你看 [\\*\\*% path Name](/docs/server-admin/datasets#pathname-sourcenames) ) . 多虧了帕洛瑪·德拉瓦萊
         
    * 如果 EDDGrid 數據集有一個或多個非常大的尺寸 (例如,百万美元的价值) 這會占用很多記憶 你可以設置新的&lt;維度數值( E) (/docs/server-admin/datasets#二元值集) 設定為假 (預設值是真的) ,它會使數據集將數值儲存在磁碟上,并在需要时取回。 多虧大衛·羅德里格斯和瑞奇·辛吉爾 (re: EDDGrid 來自奧迪奧檔案) .
         
    * 之前,如果你重新排序 dataVariable s 对于 EDD Table From Files 資料集並重新載入資料集, EDDTable From Files 會重新讀取所有的資料檔 。 現在,它可以處理重排,而不重新讀取所有資料檔。 多虧了羅蘭·施韋策
         
    * 現在,當 ERDDAP™ 讀取 ASCII, NCCSV 和 JSON Lines CSV 表格資料檔, 如果它找到指定行上的錯誤 (例如,項目數不正確) ,它登入警告信件 ("跳過一行..." "意外的項目數量...") 至 [log.txt 文件](/docs/server-admin/additional-information#log) 然后繼續讀取剩下的資料檔 。 因此,你的責任是定期查看 (或寫作腳本) 在日志中的消息。 txt 可以修正資料檔中的問題 。 ERDDAP™ 以此方式設置, 讓使用者可以繼續讀取所有可用的合法資料, 即使檔案的某些行有缺陷 。 前身 ERDDAP™ 將檔案標示為"壞", 從數據集中移除 。
         
    * 改进: (例如, 到最近的秒或毫秒) 存放在源頭的"分..." (或更大的單位) , ERDDAP™ 現在在讀取數值到 ERDDAP . 否則,浮點數會在特定時刻瘀傷和要求數據 (例如, &time=2018-06-15T01:30) 會失敗的 以前它會盡可能精确計算 (如果單位是"自...) . 最好不要用大單位 (例如,分或小時) 以儲存精确的時間值 (例如,微秒) 電腦處理小數位數的工作很差 多虧了馬可·艾芭
         
    * 切換到 EDD 表從 EDDGrid 那樣就更好了 從 EDD 表格 EDDGrid 讓使用者查詢網格化的數據集, 如表格化的數據集 ("按價值來平靜") .
        
        * 它現在支持&lt;最大轴0 &gt; 標籤 (缺省=10) 指定最大轴數 \\[ 0 \\]   (通常 "time" ) 可立即查詢的值。 這可以防止天真的要求從中取得 EDD Table EDDGrid 以搜尋整個網格化的數據集 (以逾時錯誤失敗) .
        * 產生達塔斯 Xml 現在可以產生 EDD Table 從 EDDGrid 指定中所有網格化数据集的數據集 ERDDAP™ 符合指定的正则 (使用 .QQ 以匹配所有數據集) . 它建立的數據集在摘要屬性中有附加資訊, 表示這是一個被網格化的數據集的表格版本 。 而他們 datasetID 是 datasetID 中,加上“% AsATable”。
        * 最常用的設定有大速度:當網格化的數據集是 EDDGrid 從同樣的 Erddap 数据集 ERDDAP .
        
多虧了詹姆斯·加拉格和艾德·阿姆斯特朗
         
    * 新 : 產生 數據集 所有類型的數據集的 Xml 現在更可能新增 QQFillValue 或 missing\\_value 數字變數的屬性 addAttributes . 例如,在字符串缺失值標示時會發生此事件 (例如",",",","?,"NA,"nd,"NAN") 樣本檔案中的變數會轉換成 ERDDAP 本地缺失值 (127字元列,32767字元列,2147483647 922337203685475807 以長柱表示,以浮點和雙變數表示 NaN) . 在浮點數值和雙倍變數中, NaN 值也會發生 。 另外, “nd” 被加入數字數據列中常见缺失的數值符號清單中。 ERDDAP™ 應該找找看 多虧了BCODMO的馬特·比德爾
         
    * 改进:生成中的 ncdump 選項 數據集 Xml 更像是 ncdump (但仍使用 ncdump 的 netcdf- java 版本) . 現在它會印出一份新的選項清單 現在,為 .nc ml 檔案, 它列印 ncdump 輸出結果 .nc 套用到底部的 ml 文件變更 .nc 或 .hdf 文件。
         
    * Bug FIX: UG: 檔案手柄漏掉了 (最后造成 ERDDAP™ 冷藏) 建立一些類型的輸出檔時引起, 例如 . geotif, 特別是在建立時出錯 。 我想/希望現在都修好了 如果你還看到問題 請告訴我數據庫的類型 (网格或表格) 以及造成問題的檔案類型 。 多虧了史蒂芬·比厄 琳恩·德威特 赵家北等人
         
    * Bug FIX: UG: 其 WMS   Leaflet 演示未完全/ 恰当將「 深度」 轴轉換成「 關節 」 。 現在,它做到了, 破碎的傳說要求是固定的。 另外, 下拉清單中的所有轴式選項都按上升排序 。 多虧了安托萬·奎里克和奧雷莉·布萊恩德
         
    * BUG FIX: EDDTable FromFiles 現在正確地支持對字串變數的限制, 這些變數是從資料檔中的字符變數產生的 。 多虧了安托萬·奎里克和奧雷莉·布萊恩德
         
    * Bug FIX: UG: 當數據集不可用時,數據集會試圖通知 (與信件「 此数据集目前無法使用 」 。) 它的訂閱者, 列出的動作, rs, 以及依赖于它的 LonPM180 資料集 。 多虧了羅伊·門德森和鮑勃·西蒙斯
         
    * Bug FIX: UG: 兩個與 EDDTable Copy 相關的錯誤 。 多虧了山姆·麥克拉奇
         
    * IMPROVED: 狀態. html頁面上顯示的失敗要求數量會增加, 因為比以前計算的失敗數量要多 。
         
    * 改进: ERDDAP 'status.html 現在顯示"要求 (中值( 毫秒 )) " 在時序。 之前,它顯示了中位數 切換到整數秒 。
         
    * 改进: 在 jsonld 輸出中, jsonld "名稱" 來自數據集 "title"  in ERDDAP ,而Jsonld"頭條"現在來自數據集的" datasetID " 在 ERDDAP . 之前是倒轉的 這對我來說是錯的,因為在通常的英文用法中, "姓名"通常是短的, (最好) 很少/ 永不變更的獨有标识符 (例如,羅伯特·米德爾·西蒙斯) 而不是一個不獨一無二的描述, (例如,"一個寫作軟體的人 NOAA 高個子寫軟體的人 NOAA ") . 如果用Schema.org的定義 [姓名](https://schema.org/name) 在數據集中, 軟體開發者應該能單靠规格來寫作规格的執行, 但我只聽谷歌的 (特别是娜塔莎 不) , NEI (尤其是約翰·雷爾夫) 還有羅布·富勒
         
    * 改善: 在 jsonld 輸出中, 4 個「 太空overage GeoShape 盒子」 值現在是 minLat minLon MaxLat MaxLon 。 之前,拉特和倫的位置被反轉。 如果用Schema.org的定義 [地理元件](https://schema.org/GeoShape) 指定正确的顺序。 軟體開發者應該能單靠规格來寫作规格的執行, 多虧了娜塔莎·諾伊和羅布·富勒

## 1.82版本{#version-182} 
 (2018-01-26年) 

*    **新功能 (使用者) :**   
     
    * 外表和外表 ERDDAP™ 网页。
        * 改进: ERDDAP™ 現在使用 HTML 5 并更好的使用 CSS 。
        * 網頁稍作修改, (但希望比以前少得多。) 多虧了John Kerfoot的評論
        * 網頁在手機和其他小裝置上看起來更好, 在桌面瀏覽器中, 在非常小和非常大的視窗中看起來也更好 。
        * 改善安全和其他原因, WMS 演示頁面已被取代 Leaflet .
        * 新的 : 支援影像、 音效與影像檔案的預覽 "files" 系統 (例如, [此測試數據集](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/) ) 中 .htmlTable 當儲存格有影像、音效或影像檔案的網址時回應 (例如, [此要求](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22) ) . 如果您在 '?' 圖示上徘徊, 您應該看到影像、 音效或影像檔案預覽 。 您也可以點擊檔案連結來查看您的瀏覽器中的檔案全螢幕 。 看 [媒體檔案文件](/docs/server-admin/datasets#media-files) . 注意不同的瀏覽器支持不同的檔案類型, 所以這些例子在您的瀏覽器中可能不起作用 。
多虧了這些人/ link 來提供 CSS 唯一的影像工具提示的想法和樣本代碼 (在https://codepen.io/electricalbah/pen/eJRLVd) 而延后的影像載入 (在https://varvy.com/pagespeed/defer-images.html)   (雖然代碼在使用前已變更 ERDDAP ) .
多虧了卡拉·威爾遜、馬修·奧斯汀和亞當·謝泼德/BCO-DMO對影像支持的要求。
多虧了Jim Potemra、Rich Signell、OOI、以及Carrie Wall Bell,
多虧了OOI顯示需要視頻支援。
        * 新 : 任何一個數據的子集 ERDDAP™ 数据集 (但通常都是從音效檔案中的數據集) 可以儲存在 .wav 音效檔中 。 ( [文件](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav) ) 多虧了Jim Potemra、Rich Signell、OOI、以及Carrie Wall Bell,
        * 改善: 網路可存取資料夾的格式 (瓦弗)   (例如,文件/資料夾) 已更新以使用 HTML 表格。 新的格式模仿了Apache最近版本建立的目錄列出的網頁的最新版本。 人類會發現這些改變讓信息更容易讀取. 分析這些文件的軟體 (例如,收割ISO 19115文件的軟體 ERDDAP ) 格式。 (注意 安娜·米蘭) 
        * 新 outOfDateDatasets.html 頁面。 ( [示例](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) 此網頁顯示的表格包含所有有近实时資料集的表格&lt; testOutOfDate &gt; 標籤 (见下文) 排序。 此儀表板對 ERDDAP™ 管理員和終端使用者想知道哪些數據集已过时 。 对于过时的數據集,大概有 問題的資料來源,所以 ERDDAP™ 無法從最近時間點看到/取得資料。
管理員 : 如果您不想要 Out- Date 資料集的網頁, 請將此加入您的設定. xml :
            &lt;出於 DateDatasets 動畫 &gt; 虛假&lt;/ 出於 DatasetsActive &gt;
現在有了 testOutOfDate 退出 日期列 allDatasets 數據集。
多虧了鮑勃·西蒙斯 多年来一直想要這個 也多虧了愛爾蘭海洋研究所的聰明人 他們用他們敬愛的Raspberry Pi 給了我靈感
        * 改进: .htmlTable 和 .xhtml 反應現在有更好的格式化、更緊密, 多虧了HTML5和CSS
    * gradap 数据集的新輸出檔類型:.timeGaps. 它顯示了時間值中大于中位數差距的清單 。 ( [示例](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps) ) 這個有用 ERDDAP™ 管理員和終端使用者想知道某個數據集的時間值是否有意想不到的空間, 而這個數據集的時間值會定期的間距值 。 多虧了鮑勃·西蒙斯和羅伊·門德爾索恩 他們需要這個功能
    * 改进: allDatasets 數據集現在是使用 x=maxLon 和 Y=maxLat 的地圖 。 多虧了John Kerfoot、Rich Signell和OOI -CI
    * 新: [端點](https://github.com/ioos/erddapy) - 不是 ERDDAP™ 特性,但將引起很多人的興趣 ERDDAP™ 使用者。 厄達皮 ( ERDDAP™ + Python ) 是 Python 菲利佩·費南德斯創立的圖書館 ERDDAP 是 RESTful 建立 ERDDAP™ 搜尋數據集、取得中繼資料、下載資料等。 多虧了菲利佩·費南德斯
    * 我早該提的 有一個第三方R套件,旨在更容易與 ERDDAP™ R內: [重排](https://github.com/ropensci/rerddap#rerddap) . 多虧了 [開啟的科學](https://ropensci.org/) 羅伊·門德爾索恩
         
*    **事情 ERDDAP™ 管理者需要知道和做:**   
     
    * 做: 在設置. xml, 就在下面&lt;管理機構&gt;,請新增一個&lt;指定您的機構網址的 adminInstitutionUrl &gt; 標籤 (或群組) .
    * 要完成 : 此設定中的 3 個標籤已不再使用 :
        &lt;開始 HeadHtml &gt;,&lt;啟動BodyHtml &gt; 及&lt;endBodyHtml &gt; 。 由
        &lt;啟動頭部Html5&gt;,&lt;啟動 BodyHtml5 &gt; 和&lt;endBodyHtml5&gt;, 信件中指定的預設值 。 xml (如下所示:) .
        
我們建議使用預設&lt;啟動頭部Html5&gt;和&lt;endBodyHtml5 &gt;.
我們建議:如果你修改了原版&lt;啟動BodyHtml &gt; 和/或想要自訂您的 ERDDAP™ 現在,請复制新的&lt;啟動 BodyHtml5 &gt; 標籤 (自下方) 加入您的設定. xml ,並修改它以自訂您的設定 ERDDAP™ 所以 ERDDAP 網頁反映的是您的組織,而不是 NOAA   ERD . 特別是,請把「帶給你」 轉移到你的組織 (s) . 如果您需要幫助, 請發郵件 erd.data at noaa.gov . (如果你不想自訂) ERDDAP™ 現在使用預設值&lt;start BodyHtml5 &gt;.)
        
刪除您設定中的 3 個舊標籤 。 xml 不再使用 。

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

你還有別的辦法 [自訂 ERDDAP™ ](/docs/server-admin/deploy-install#customize) 所以 ERDDAP 網頁反映的是您的組織而不是 NOAA   ERD .
        
    * 做:&lt; EDDGrid ... 示例 & gt; 標籤( 開始於)&lt; EDDGrid IdExample & gt; 和&lt;EDD表... 示例 & gt; 標籤( 開始於&lt;在您的設定中 EDDTableIdExample&gt; 中, xml 檔用于建立格子和示例 tabledap 文件。 html 在您的網頁 ERDDAP .
        
如果您沒有自訂這些標籤, 請從您的設定. xml 檔案中刪除 。 現在他們都在訊息.xml中有預設,指的是Bob的數據集 ERDDAP™ 在https://coastwatch.pfeg.noaa.gov/erddap/index.html. 所以,你不再需要有 特定的數據集 ERDDAP . 如果您想要超過預設值, 請將部分或全部的標籤复制到您的設定中 。 xml 并變更它們的值 。
如果你想讓例子指向自己 ERDDAP™ ,最容易的方法是:
        
        1. 在您的 ERDDAP™ 加入到您的 datasets.xml :
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. 新增此標籤到您的設定值. xml, 但將網址變更為您的 ERDDAP 是 ( https ?) 網址 :
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
如果您自訂了這些標籤, 請按原樣保留, 請在您的設定中加入這兩個新標籤以指定 ERDDAP™ 這些數據集的網址, 但將網址變更為您的 ERDDAP 是 ( https ?) 網址 :
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * 做: ERDDAP™ 現在使用 erddap2.cs 的 cs 檔案 。 如果你做了修改 \\[ 湯姆卡 \\] /webapps/erddap/images/erddap.cs,考慮做類似於erddap2.cs的變更. (在同一目錄中) .
    * 新: ERDDAP 網頁現在有很多幾乎隱形的内部連結 (文字是黑色而不是下划线) . 如果你徘徊在其中一個連結上 (通常标题和段落的前几字) ,指標會變成手。 如果您點擊了連結, URL 是文件區域的內部連結 。 因此,很容易提及文件的具体部分。 多虧了鮑勃·西蒙斯 多年來一直想要這個
    * 新: ERDDAP™ 現在支援 [位元範圍/ 接受範圍](https://en.wikipedia.org/wiki/Byte_serving) 要求部分/文件/文件。 以支援瀏覽器中的音效與視頻觀眾。
    * 做:現在,改善安全,如果你指明&lt;基數HttpsUrl&gt; in setup.xml (因此支持 https ) , 烏爾是 https 有更安全旗鍵的 URL 。 如果有, 任何先前的標籤 Urls/ flagKeys 都將失效 。 管理者: 如果這些變更适用于您的 ERDDAP™ 如果你 ERDDAP™ 有 EDDGrid 從 Erddap 和 EDD 表格 從Erddap的訂閱到遠端 ERDDAP s,那么,在你更新后 ERDDAP 你的 ERDDAP™ 將自動試著與新 flagUrl 訂閱, 所以當您收到新訂閱驗證電子郵件時, 您應該刪除舊的訂閱, 並驗證新的訂閱 。
    * 做:如果你 ERDDAP™ 有 EDDGrid 從Erddap 數據集來提供 Bob 海岸表上的 erdVH3 數據集 ERDDAP™ 。
    * 如果您在您的 jplAquariussSS 樣本數據集中包含任何 。 ERDDAP™ 請在 datasetID 是"V5"
    * 做: actual\\_range 目前為 CF 標準屬性 (截至CF-1.7) 顯然地說,如果變數使用 add\\_offset 和/或 scale\\_factor 包裝數值,然後是 actual\\_range 數值應使用已解開的資料類型,並解開數值。 不幸的是 這和我們之前的建議相矛盾 產生達塔斯 Xml 已打包 actual\\_range 數值,但這無法修復您的數據集 datasets.xml 文件。
        
請檢查您的數據集: 如果變數的數值被打包, 如果 actual\\_range 請新增&lt; addAttributes &gt; actual\\_range 指定已解開的數值。 否則, 數據集將不載入 ERDDAP . 一個簡單的、幾乎完美的方法 就是搜索你的 datasets.xml 源碼 屬性
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
和 a scale\\_factor 不包括1.0。 那些是 actual\\_range 您可能需要修補的屬性 。
        
於 EDDGrid 數據集, ERDDAP™ 總是設定 actual\\_range 屬性是數值的实际範圍,因為它知道這些數值。
        
對有降值的轴變數 (例如,一些纬度變數) , ERDDAP™ 已建立 actual\\_range 与 \\[ 0 \\] ... \\[ 上次 \\] 價值 高 低 現在它總是用低... 高值來做新的CF定義
        
正确性 actual\\_range 值對 EDDTable 數據集特别重要, 因為 ERDDAP™ 會快速拒絕使用者的數值要求,因為數值小於 actual\\_range 最小值或大于 actual\\_range 最大值。
        
相關的:實際上的\\_,實際上的\\_, data\\_min 和 data\\_max 屬性已贬值。 請轉換您的數據集以使用 actual\\_range 相反。
        
    * 去做 (可選擇, 但建議) : 您的每個近時及預測數據集 ERDDAP™ ,請添加 [&lt; testOutOfDate &gt;] (/docs/server-admin/datasets#測試過期) 在表單中有值的標籤 now- _n Units_,例如, now- 2天 如果數據集的最大時間值比此數值要大, 數據集會被視為过时的數據集, 並且會被標記在 [ outOfDateDatasets.html ](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) 网页。 這能讓你輕鬆地看到 数据集來源有什麼問題
    *    [新 : 使用 json- ld 的數據集的語义標籤 (杰森 已連接的資料) ](/docs/server-admin/additional-information#json-ld)   
         ERDDAP™ 現在使用 [json-ld 中 (杰森 已連接的資料) ](https://json-ld.org) 將您的資料目錄和數據集成為 [語言網](https://en.wikipedia.org/wiki/Semantic_Web) 這是Tim Berners-Lee的主意, 搜索引擎 ( [特别是谷歌](https://developers.google.com/search/docs/data-types/datasets) ) 其他語言工具可以使用這個結構式的標記來方便發現和索引。 Json的標準是隱形的對人類&lt;文稿 &gt; 密碼http://.../erddap/info/index.html网页 (是語言網 [數據庫](https://schema.org/DataCatalog) ) 和每份http://.../erddap/info/_datasetID_/index.html网页 (是語言網 [數據集](https://schema.org/Dataset) ) . (特別感謝愛爾蘭海洋研究所的亞當·萊德比特和羅布·富勒 盡力完成這項工作 ERDDAP .) 
    * New: 有新的數據集類型可以從音效檔案讀取資料 :
         [ EDDGrid 來自奧迪奧檔案](/docs/server-admin/datasets#eddfromaudiofiles) ,它把音效資料當作網格資料。
         [AudioFiles 的 EDD表](/docs/server-admin/datasets#eddfromaudiofiles) ,它把音效資料當做表格資料。 多虧了Jim Potemra、Rich Signell、OOI、以及Carrie Wall Bell,
    * 變更產生達泰斯 Xml 命令 (及相关的變更) :
        * 新: ERDDAP™ 現在有了自動的系統 [更新过期的 URL](/docs/server-admin/additional-information#out-of-date-urls) 兩者都在產生達泰斯 Xml 和載入數據集時 。 如果您有建議新增要抓取和更新的網址, 或是您認為這應變成服務 (就像轉換器) 郵件 erd.data at noaa.gov .
        * 新的:現在,如果產生達塔斯 Xml 看見了 CF standard\\_name   (全部都是小寫) 有大寫字元的,它會把所有小寫版本加入到&lt; addAttributes &gt;. 另外,當數據集載入時,如果 ERDDAP™ 顯示 CF standard\\_name 有大寫字元的, 它默默地把它變為 standard\\_name . 多虧了Rich Signell
        * 新的:現在,如果產生達塔斯 Xml 看到的屬性有時不是 ISO 8601 格式, 它將 ISO 8601 格式化的時間添加到&lt; addAttributes &gt;. 如果 ERDDAP™ 無法辨識格式, 它保持時間值不變 。 如果您看到格式 ERDDAP™ 不認得和修復,請發郵件到 erd.data at noaa.gov .
        * 改进: EDDGrid 從垃圾 產生 Dataset 中的目錄選項 Xml 現在依靠的是 Unidata Netcdf- java 編目爬行程式碼 (鞭打 目錄類別) 讓它能處理所有的 THREDDS 目錄 (可能很複雜) . 多虧了羅蘭·施韋策的建議 Unidata 密碼
        * 新 : 產生達塔斯 Xml 表示 EDDGrid 從 Dap 開始, 將「 、 起始年- 結束年 」 加入到標題的結束 。 如果數據存在於過去150天,
        * 新 : 產生達塔斯 Xml 表示 EDDGrid 從Dap開始, \\[ 分辨率 \\] °" 如果數據集的空間均匀, lat 和 Lon 的位址相同 。
        * IMPROVED : 時間轉換器現在有其他功能, 主要是能以多种通用格式將字符串時間轉換成ISO 8601 字串, 或是轉換成UDUnis 兼容數字 。 所有先前支援的功能都繼續工作,
        * BUG FIX: 產生達塔斯 Xml 與關鍵字轉換器目前包括GCMD Science Keywords開頭的「地球科學&gt;」。 當數據集被載入 ERDDAP™ , ERDDAP™ 現在修正关键字中的 GCMD 關鍵字, 不從「 地球科學」 開始, 也不使用其他任何標題大小寫 。 (每個單字的第一個字母資本) .
        * 改进:&lt; destinationName &gt;'s, 產生代碼 Xml 的 EDD Table From AsciiFiles 使用尾端 sourceName s 与 '/'   (有些像文件名) . 現在它用了全部 sourceName (如"blahblahblah(m/s)"). 這項改變對一些數據集有益, 多虧了莫里斯·利比斯
        * BUG FIX: 產生達塔斯 Xml 和數據集建構器目前確保沒有重复欄名 。 多虧了莫里斯·利比斯
        * BUG FIX: 產生達塔斯 AsciiFiles 的 EDD Table 沒有寫入&lt;列分隔符 &gt; 到輸出。 現在有了 多虧了莫里斯·利比斯
    * 新 : DasDds 工具現在打印出時空資訊 (该 [. timeGaps 資訊](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) ) 如果數據集是網格化的數據集。
    * 新 : 高级搜尋現在接受"現在的QQ- n Units_" 時間值 。 多虧了Rich Signell
    * 改善安全性, 當數據集的中繼資料或資料的電子郵件位址被寫到 html 網頁時, 「@」 被取代為「 at 」 。 這只抓取所有中繼資料或資料值的電子郵件位址, 而不是嵌入更長數值的電子郵件位址 。
    * 提高安全性 RSS 私人數據集的資訊目前只供使用者使用 (和 RSS 讀者) 被登入并被授權使用此數據集的人
    * 新的:現在,當數據集被載入時,如果 date\\_created , date\\_issued , date\\_modified ,或者日期===metadata=== ERDDAP™ 更改為 ISO 8601 格式化時間 。 如果 ERDDAP™ 無法辨識格式, 它保持時間值不變 。 如果您看到格式 ERDDAP™ 不認得和修復,請發郵件到 erd.data at noaa.gov .
    * 改善: EDDGrid 數據集現在要快得多。 多虧了Rich Signell
    * 与 ERDDAP ISO 19115文件的建立:
        * 當建立ISO 19115文件時, dataVariable 單位沒有HTML屬性編碼, % 編碼 。 現在是了 多虧了NGDC的ISO 19115驗證器.
        * 當建立ISO 19115文件時, date\\_created 通常使用錯誤的格式。 現在它被轉換成ISO 8601 Z字符串. 多虧了NGDC的ISO 19115驗證器.
        * 當建立ISO 19115文件時, ERDDAP™ 現在更長的寫作日期, 年份=000 (和氣候數據集一樣) , 因為 ISO 19115 的計划 不允许以 $00 的日期 。 多虧了NGDC的ISO 19115驗證器.
    * 如前要求 http .../erddap/版本會只傳回版本號碼 (作为文字) ,例如, " ERDDAP =1.82"
現在,請求 http .../erddap/version QQstring 會傳回一個數字, 以及一個 '\\_' 加上 ASCII 文字的可選後缀 (沒有空格或控制字元) ,例如, " ERDDAP 約翰斯福克 做叉子的人會修改 EDStatic. erddapVersion 以指定此項 。 這種方式對之前的版本沒有問題 ERDDAP . 多虧了阿心 (尤其是凱爾·威爾科克斯) 和愛爾蘭海洋研究所 (尤其是羅布·富勒) .
    * Bug FIX: UG: Wms版本=1.3.0,要求= GetMap , cras=EPSG: 4326 (不是CRS: 84) 要求: bbox 命令必須是 minLat, minLon, maxLat, maxLon 。 CRS:84的請求 和以前一樣 bbox 定單必須是 minLon minLat maxLon maxLat 。 使用 ERDDAP 是 WMS 1.3.0 在 ArcGIS   (多虧了保拉·阿斯) . 謝謝你 (不是) 至 OGC 讓你變得如此複雜 多虧了 Leaflet 為了正确處理這個 以及給我一個測試這個的方法
    * 改进: RSS 而電子郵件訂閱有: http 您的網址 ERDDAP . 現在是 https URL, 如果已啟動 。
    * 新: EDDGrid 現在复制支援可選取的標籤&lt;只有某個 VALUE _&lt;/只有Since&gt;,其中的值是特定的 ISO- 8601 格式化的時間或 now- n 單位 (例如, now- 2年) 時間到了 看 [只有 文件](/docs/server-admin/datasets#onlysince) . 多虧了德魯·P
    * 改进:如果有, ERDDAP™ 顯示 https URL( 從&lt;baseHttpsUrl &gt;, 如果有的話) 而不是 http URL 當它告訴使用者要新增/ validate/ remove/ 列出訂閱時 。
    * Bug FIX: UG: ERDDAP™ 現在允許訂閱動作從 "https://". (鮑勃打他的前額。) 多虧了詹妮弗·塞瓦迪安
    * Bug FIX: UG: .jsonlKVP 現在在每個金鑰與值之間使用 ':',而不是 '=' . (鮑勃打他的前額。) 多虧了亞歷山大·巴特
    * Bug FIX: UG: 之前,如果你重新啟動 ERDDAP™ 快速 Restart= truth, 如果在數據集正常重新載入之前, 您會呼叫使用更新的 EDDTable FromFiles 數據集, 如果數據檔剛被變更, 要求會以無指標錯誤失敗 。 現在要求會成功 多虧了約翰·克福特
    * 新 : 當數據集被載入 ERDDAP™ ,关键字現在重新排序,任何新行字符都被移除。
    * 如果... .json 或 .nc 奧森的要求 .json p 參數, 反應 MIME 類型是應用程式/ javascript。 注意: .json p 不支援 .jsonlCSV 或 .jsonlKVP 不會成功 多虧了羅布·富勒
    * IMPROVED: json 線檔的 MIME 型態 Type 選項現在為「 應用程式/ x- jsonlines 」 。 這是應用程式/jsonl。 目前,沒有明确的正确選擇。
    * IMPROVED: 狀態. html 頁面上顯示的失敗要求數量會增加, 因為比以前計算的失敗數量要多, 例如: 客戶端豁免 。
    * 如果有來自 ERDDAP™ 不壓縮, 那麼回應的頭會包括「 編碼」 =「 身份 」 。
    * 不需要"許可證" 如果沒有指定, 信件中的標準License. xml (或從設定值. xml (如果存在)) 用作預設值。
    * 現在有了選擇性 [檔案存取後缀屬性](/docs/server-admin/datasets#fileaccessbaseurl) . 可用于现有的 [文件 AccessBaseUrl 屬性](/docs/server-admin/datasets#fileaccessbaseurl) .
    * 改进: 要增加安全性, 此版本已與最新的 Java JDK v8u162. (中文(简体) ).
    * New: 要增加安全性, 提供临时電子郵件地址的多個共同域 (例如, @ mailinator.com) 已登上訂閱系統的永久郵件黑名單。
    * 包括:
設定數據集 Flag IP 位址失敗 (自上次日報以来)   
設定數據集 Flag IP 位址失敗 (自啟動起)   
設定數據集 國旗 IP 位址已成功 (自上次日報以来)   
設定數據集 國旗 IP 位址已成功 (自啟動起)   
"失敗"的數據讓你看看是誰 (黑客?) 正在設立旗子 但失敗了
    * 增加安全性,&lt;訂閱 Email Blacklist &gt; 在您的中 datasets.xml 現在被視為對案件不敏感
         

## 1.80版本{#version-180} 
 (2017-08-04年) 

*    **新功能 (使用者) :**   
     
    * 新 orderByCount  () 過程器讓您指定如何排序結果表 (否) 並只傳回每類群組的一行, 並計算每個變數的非錯誤數值 。
例如, orderByCount  (" stationID ") 排序 stationID 每行返回一行 stationID ,以數據來計算每個變數的不漏值。
如果你只是指定 orderByCount  ("") ,此回應將只是一行,其中包含每個數據變數的不漏值數量。
看 [ orderBy ...文件](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy) 多虧了本·亞當斯
    * 新 .nc oJson 文件 網格化和表格化数据集的輸入選項 。 此選項會使 NCO lvl = 2 "pedantic" JSON 檔案中通常包含的所有資訊 .nc 文件。 看 [http://nco.sourceforge.net/nco.html#json](https://nco.sourceforge.net/nco.html#json) 多虧了查理·詹德
    * Bug FIX: UG: 其 orderBy ... () Make A Graph 網頁上的選項已正确處理。
    * BUG FIX: . geoJson 輸出現今不打印缺失的 lat 或 Lon 值的行 。 另外,高度值 (如果有的話) 已包含在座標中,而不是作為數據值。 多虧了喬納森·威爾金斯
         
*    **事情 ERDDAP™ 管理者需要知道和做:**   
     
    * 安全问题: 用于 OpenLayers 演示到 WMS 頁面 ERDDAP™ 已过期, 且有可能讓它被滥用的錯誤 。 (不幸的是,更新 OpenLayers 和協議。 js不容易。) 這讓圖書館有可能被設置, 然而,自 ERDDAP™ 只使用 OpenLayers 以特定的預置方式且只有特定 ERDDAP 根據數據來源,我們相信沒有跨地點的弱點 ERDDAP 使用 OpenLayers 但是,如果你不相信,你可以停止使用 OpenLayers 演示到 WMS 您的頁面 ERDDAP™ 新增
```
        <openLayersActive>false</openLayersActive>  
```
到您的設定值. xml 檔案 。 假設是"真" 多虧了查爾斯·卡爾頓和NCEI
    * 安全變更: 未使用 .jar 檔案與复制 .jar 檔案 (因為他們也在網絡上,) 已被移除 ERDDAP™ 分配。 已更新过时的 .jar 檔案 。 多虧了查爾斯·卡爾頓和NCEI
    * 安全變化: 分发的 netcdfAll.jar 文件 ERDDAP™ 是最新版本 (目前 4.6.10) 但其中仍包含已知已過期且安全漏洞的 Jackson 檔案, 如果你沒有通過亞馬遜S3存取資料 (如果你是) 這些弱點并不重要
        
Netcdf-java開發者認為,這些脆弱性不相關,因為Netcdf碼使用這些库的方式,而且總之只有在存取亞馬遜S3時才具有相关性. 看 [https://github.com/Unidata/thredds/issues/866](https://github.com/Unidata/thredds/issues/866) . 我相信 若您仍關心此事, 請聯繫 netcdf- java 開發者 。 (注意,如果你不相信 netcdf-java 發展者, 并考慮不使用 ERDDAP™ 也不該使用THREDDS 因為THREDDS使用Netcdf-java比 ERDDAP .) 
        
細節 : 困難的密碼和弱點警告是:
core/jackson-databind/pom.xml
看https://nvd.nist.gov/vuln/detail/CVE-2016-7051-- 高
com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml。
看https://nvd.nist.gov/vuln/detail/CVE-2016-7051-- 高
core/jackson - 通知/pom.xml
看https://nvd.nist.gov/vuln/detail/CVE-2016-7051-- 高
看https://nvd.nist.gov/vuln/detail/CVE-2016-3720- 危急
core/jackson-core/pom.xml/
看https://nvd.nist.gov/vuln/detail/CVE-2016-7051-- 高
看https://nvd.nist.gov/vuln/detail/CVE-2016-3720- 危急
"為4.6.10版本, aws-java-sdk-core拉力在2.6.6版本的Juckson-QQ文物。" (netcdf-java人的電子郵件) .
多虧了查爾斯·卡爾頓和NCEI
        
    * 翻譯: 如果您重新編譯 ERDDAP™ ,注意命令行需要的 -cp 类path 參數現在比以前短得多 。 參觀新的 - cp 設定 [此文件](/docs/contributing/programmer-guide#development-environment) . 多虧了查爾斯·卡爾頓和NCEI
    * 產生代碼中的新操作 Xml: EDD Table FromBcodmo, 它只是供BCO-DMO內用.
多虧了亞當·謝泼德和BCODMO
    * 新的曲目和曲目: 如果 EDDTable 欄位有網路可存取檔案的檔名 (例如影像、影像或音效檔案) 添加
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
指定基底網址 (結束于 /) 需要將檔名變成完整的 URL 。 那是為了 .htmlTable 答复, ERDDAP™ 將檔案名稱顯示為連結到合并網址 (底部 Url 加檔名) .
如果你想 ERDDAP™ 要服務相關檔案, 請為這些檔案另建 EDDTable FromFileNames 資料集 (它可能是私人的數據集) .
多虧了亞當·謝泼德和BCODMO
    * 新的ATTRIBUTE 建議: 如果 EDDTable 欄位有網路可存取檔案的文件檔名 (例如影像、影像或音效檔案) 可通过檔案檔存取 (例如, .zip 文件) 透過網址存取, 使用
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
指定檔案的網址。
如果你想 ERDDAP™ 要服務歸檔檔檔, 請為此檔案另建 EDDTable FromFileNames 資料集 (它可能是私人的數據集) .
多虧了亞當·謝泼德和BCODMO
    * 生成達塔斯的改进 移除無效/ 不良原因的 Xml&lt; subsetVariables &gt; 建議與重复/ 糟糕的建議變數名稱等 。 多虧了瑞奇·辛吉爾 亞當·謝泼德和BCO -DMO
    * 新方案: 政治界限信息 ERDDAP 來自第三方,有些过时 許多人對何為正確, 我們沒有對政治博物館 的不公性提出指控 ERDDAP . 如果你不喜歡政治界限信息 ERDDAP™ 現在你可以看到 ERDDAP™ 永不增加政治界限
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
到您的設定值. xml 檔案 。 假設是"真" 多虧了拉吉·德凡德
    * 新梅塔塔塔: 在 datasets.xml 您可以指定顏色的預設數量 a 列段落 dataVariable 在圖和地圖上
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (默认= 1, 表示要讓 ERDDAP™ 決定) . 看 [顏色 列設定值](/docs/server-admin/datasets#color-bar-attributes) .
    * 改进:地圖上的州界顏色是紫色 (深紫色的給你,寶貝) . 現在是灰色了 (在國界灰色和土地灰色之間) .
    * Bug FIX: UG:&lt;iso19115 檔案 &gt; 和&lt;fgdc 檔案 &gt; 以 datasets.xml 處理不總是正確的 現在是了 多虧了BCODMO

## 1.78版本{#version-178} 
 (2017-05-27年) 

*    **新功能 (使用者) :**   
     
    *    (無)   
         
*    **事情 ERDDAP™ 管理者需要知道和做:**   
     
    * IMPROVED: 狀態. html頁面上目前為最新到最古老的。
    * Bug FIX: UG: ERDDAP™ 現在寫 .nccsv 時數變數的檔案 actual\\_range 作為 ISO-8601 字串時間 。 用 EDDTable FromErdddap 解析遠端數據集和所有 EDDTable From... Files 資料集的快速重啟檔案中的信息來修正錯誤 。 (時間 actual\\_range 在 v1.78 中首次載入數據集會出錯, 但是在重新載入數據集後正确, 例如, 如果您標示了數據集 。) 

## 1.76版本{#version-176} 
 (2017-05-12年) 

*    **新功能 (使用者) :**   
     
    * Tomcat的變化: 要求 ERDDAP™ 來自網路瀏覽器以外的軟體 (例如, curl R Matlab , Python , Java ) :
和之前的Tomcat版本的變更一樣 (執行的低級軟體 ERDDAP ) 自2016年初起,要求 URL 的查詢部分中越来越多的字符必須是 [ **百分比編碼** ](/docs/server-admin/datasets#infourl) 安全原因 瀏覽器會幫你做好編碼 因此使用 ERDDAP™ 在瀏覽器中不受影响, 除非要求重新定向到另一個 ERDDAP .
    * 之前, ERDDAP™ 已接受 **字元變數** 更像是未簽署的短整數 。 現在它對待他們 更像是一元的UCS -2 (單位碼) 弦 看 [字符文件](/docs/server-admin/datasets#char) . 多虧了奧瑞莉·布萊恩德和阿爾戈計劃
    * 之前, ERDDAP™ 很少支持 **Unicode 字符** 上方字符串中的 # 255。 現在,內部, ERDDAP™ 完全支持 2字节 UCS-2 字元 (0至65535的字元) 字串中。 當字串資料被寫入不同的檔案類型, ERDDAP™ 盡其所能支持2字节的字元。 另一个例子是.csv 檔案 ERDDAP™ 用 ISO- 8859-1 字元集寫入 (1字节字元集) 所以 ERDDAP™ 使用 JSON 類似 \\u_hhh_ 語法寫入字元 # 255 以上的字元 。 看 [字符串資料](/docs/server-admin/datasets#string) .
    * 改进: .nc 所寫檔案 ERDDAP™ ,要解釋的字串變數會有屬性
         *** 編碼=ISO-8859-1**   
在 .nc 已讀取的檔案 ERDDAP™ , 含有 QQ Encoding 的字串變數會被解譯為带有指定字串的字符串 。
    * 复曰: ERDDAP™ 支援 **類似 JSON 的反斜面編碼** 指定字串變數的限制。 因此, 您可以要求像 &myString="\\u20ac" 那樣的資料, 因為從20ac 起, MyStringQQ 是歐洲符號的十六進制版本 。 網路上的一些來源顯示Unicode符號的碼點數,例如, [https://en.wikipedia.org/wiki/Unicode](https://en.wikipedia.org/wiki/Unicode) .
    * 之前, ERDDAP™ 提供有限支持 **長整數** 變數。 現在 ERDDAP™ 完全支持內部長度, 在將長度資料寫入各种檔案類型時會盡力 。 看 [長文件](/docs/server-admin/datasets#long) . 多虧了愛爾蘭的海洋研究所 Craig Risien 、 Rich Signell 、 Christopher Wingard 和 OOI
    * 新建: gradap 的輸出檔案型態 tabledap : ** .nccsv ** ,也就是 NetCDF -比如, ASCII, CSV 檔案中包含所有相當的元数据 .nc 文件。 看 [NCCSV 檔案 规格](/docs/user/nccsv-1.00) . 多虧了史蒂夫·漢金
    * 新: ** orderByClosest 滤波器** 讓您指定結果表格的排序方式及間距 (例如,2小時) . 在每類別群組中, 只有最接近間距的行才被保留 。 例如, orderByClosest  (" stationID 兩小時) 排序 stationID 和時間,但只回應每行 stationID 最後一個 orderBy 列 (時間) 最接近2小時间隔。 這是最接近的事情 tabledap 在 gradap 要求中拖曳值。 此選項可通过任何 tabledap 數據集的 .html 網頁, .graph 網頁, 以及您自己產生的任何網址 。 多虧了愛爾蘭海洋研究所和加拿大海洋網絡
    * 新: ** orderByLimit 滤波器** 讓您指定結果表格的排序方式及限制數字 (例如,100) . 在每類群組中, 只保留第一行的「 限制 」 。 例如, orderByMax  (" stationID , 100") 排序 stationID 中,但每行只返回前100行 stationID . 這跟SQL的LIMIT條款相似 此選項可通过任何 tabledap 數據集的 .html 網頁, .graph 網頁, 以及您自己產生的任何網址 。 多虧了愛爾蘭海洋研究所和加拿大海洋網絡
    * 兩種新的反應檔案類型 ** .jsonlCSV 和 .jsonlKVP ** 表格數據集和很多其他位址 ERDDAP   (例如,要求提供有关数据集的信息) . 檔案是 JSON Lines 文件 ( [https://jsonlines.org/](https://jsonlines.org/) ) 其中每行都有单独的 JSON 物件。 .jsonlCSV 只是有CSV格式的值。 .jsonlKVP 有金鑰 : 值对. 每行自守. 線條不包含在更大的 JSON 陣列或物件中 。 例如, [此樣本要求](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z) . 多虧了達米安·史密斯 羅布·富勒 亞當·萊德比特 和愛爾蘭海洋研究所
    * 新的文件描述 [ **如何存取私人數據集 ERDDAP™ 通过文稿** ](/docs/user/AccessToPrivateDatasets) . 多虧了琳恩·德威特
    * 改进: ** OpenLayers ** 地圖是 2 度, 現在是 4 個數據像素 。 多虧了羅斯提·霍勒曼
    * 改进:在一些普通案件中,包括 **正则表示式** 限制會處理得更快 。
         
*    **事情 ERDDAP™ 管理者需要知道和做:**   
     
    *    **慢的第一開始:** 你第一次開始這個新版本 需要很長時間 ERDDAP™ 以載入所有的數據集, 因為它需要重新讀取所有的來源資料檔 (雖然只是網格化資料檔的頭目) . 如果你看看這些紀錄, 你可能會看到一些內部檔案的錯誤訊息, 寫著「 舊/ 不支援的增强版本」 —— 沒關係 -- ERDDAP™ 將做為內部檔案的新版本。 請耐心點
    * 動作 : ERDDAP™ 現在使用新的 **時間** 班 (JSR 310) 而不是喬達把字串時間分析成數字時間 注:
        * 如果 ERDDAP™ 突然對給定的數據集解析字串時間有問題, 因此只會將大部分或所有時間轉換到 NaN 的 (缺少值) 問題就在于日期 您指定為變數的「 單位 」 的時間格式字串 。 新系統有時需要稍微不同的日期時格式字串 。
        * 如果日期中的數月與日數字串不是0加法 (例如,“2016年7月3日”) ,确保格式只是有單 M 和 d (例如"M/d/yyyyy",而不是"MM/dd/yyyyyy".) .
        * 變更使用小寫 s 的分數秒规格 (例如, yyyy-MM-dd 'T'HH:mm:s.sss) 中 S's, (例如, yyyy-MM-dd 'T'HH:mm:s.SS) .
        *    ERDDAP™ 不再支援字串日期 有二位數年數的時間格式 (喂) 含蓄的世紀 (例如,1900年或2000年) . 企業在1990年代後期花了數十億美元來解決這個問題。 科學家不該用兩位數年 請修補來源檔案 (s) 轉換成 4 位元年數,然後在日期中使用 yyyy 時間格式 。
        * 你可以用yyyy或yyyyyyyy (其中 ERDDAP™ 轉換為 uuu) 4位數年數,包括負數年數,例如 -4712 (公元前4713年) . 多虧了SeaDataNet 托馬斯·加德納和BODC
        * 請在日期格式內繼續使用 Z 以取得 ERDDAP 分析時間偏移 (例如,Z,+0200,-08,-0800,-08:30) .
        *    **一定要用 Java 版本 1.8.0==21或更高。** 
        * 程序员 -- 如果你寫 Java 執行的程序 ERDDAP™ 代碼,你需要移除 Joda -time 的參考。 分類路徑參數中的罐子 。
    * 新: ERDDAP 是 [檔案A 數據集工具](/docs/server-admin/additional-information#archiveadataset) 可以建立 [ **BagIt 文件** ](https://en.wikipedia.org/wiki/BagIt) . NCEI 可能在此格式上标准化 。 多虧了斯科特·克勞斯和約翰·雷爾夫
    * 要下載 erddap 的連結 。 戰爭 ERDDAP™ 現在的網頁指向 **GitHub 圖片** . (他們是公眾連結 所以你不用加入GitHub) 這意味著下載速度要快得多 (最高12Mb/s 相对于1Mb/s) 也很少下載出問題。 多虧了達米恩·史密斯 羅布·富勒 亞當·萊德比特 康納·德萊尼 以及愛爾蘭海洋研究所
    * 改进: **狀態.html頁面和每日狀態報告電子郵件** 包含「主要載載達泰斯時空系列」部分, ERDDAP™ 至最後100個主要載荷的末端。 多虧了我們的麻煩
    * 新的,可選的 (但建議) EDDTable FromCassandra 数据集的參數 : [ ** &lt;分区 KeyCSV &gt; ** [ [ ] ] (/docs/伺服器-admin/datasets#partitionkeycsv) . 多虧了加拿大海洋網
    * 新的: EDD Table From AsciiFiles 已支援 ** &lt;列分隔符 &gt; ** 參數。 如果無效或「 」 , 类會像以前一樣猜測, 否則, 第一個字元會在讀取檔案時用作列分隔符 。 多虧了Sky Bristol和Abigail Benson
    * 新增:新數據集類型, [ **Nccsv 檔案中的 IDD 表格** ](/docs/server-admin/datasets#eddtablefromnccsvfiles) 集合 [NCCSV .csv 文件](/docs/user/nccsv-1.00) . 多虧了史蒂夫·漢金
    * 改进: **EDD 表格來自 Erddap** 現在使用 .nccsv 從遠端取得資訊 ERDDAP 以及當地的資料檔 它能完全支持字元和長數據型態,以及Unicode (UCS-2) 字符串的字符集 。 多虧了羅布·富勒和愛爾蘭的海洋研究所
    * 改进:EDD表 EDDGrid 從 Erddap 支援 ** &lt;重定向 &gt; 假設&lt;/重定向 &gt; ** 這說明 ERDDAP™ 從不將要求重定向到遠端 ERDDAP . 假設是真的 這在遙控器時有用 ERDDAP™ 是私人 ERDDAP . 多虧了達米安·史密斯 羅布·富勒 和愛爾蘭海洋研究所
    * 改进: ERDDAP™ 現在抓 **已取消的使用者要求** 早點 而且 ERDDAP™ 因為低層線線關閉得更快 多虧了我們的麻煩
    *    **產生達塔斯 Xml :** 
        * 新 : 新的 EDDType "ndump" 印有 an [弧度](https://linux.die.net/man/1/ncdump) 類似於列印的 。 .nc 文件。 您也可以列印指定變數的數值 (或輸入"無"以不列印任何數據值) . 這是有用的, 因為沒有 ncdump , 很難知道檔案中是什麼, 因此您要為 GenerateDatasetsXml 指定哪個 。 多虧了克雷格·瑞西恩 里奇·辛吉爾 克里斯托弗·溫加德和OOI
        * 新的:供海数据 净數據 :
酌情生成 Datasets Xml 現在使用遠端的 SPARQL 查詢來做特定的語法轉換 : 如果變數的源中繼資料包括 sdn\\_ parameter\\_rn, 例如 sdn\\_ parameter\\_rn = "SDN: P01::: PSLTZZZ01", 產生 Datasets Xml 會加入相应的 P02 屬性, 例如 sdn\\_P02\\_urn = "SDN: P02::: PSAL" 。 如果您有數據集使用這些屬性, 如果您有 ERDDAP 是&lt; categoryAttributes &gt; 在 setup.xml 中包含 sdn\\_parameter\\_ 和 sdn\\_P02\\_ur, 使用者將可以使用 ERDDAP™ 要搜尋這些屬性的特定值的數據集的分類搜尋系統 。 多虧了BODC和Alexandra Kokkinaki
        * 改进:生成達塔斯 Xml 變更了很多 http:// 參考中 https:// 酌情。
        * 改进:生成達塔斯 Xml 正在試圖猜測創作者%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        * IMPROVED: 由 GenerateDatasets 建議的變數的資料類型 Xml現在會好一點了 多虧了瑪格麗特·奧布萊恩、LTER和EML
        * 改进:生成達塔斯 Xml 更能指定&lt;cdm\\_data\\_Q&gt; 并新增相關的, 需要的屬性( 例如, )&lt;cdm\\_time series\\_vals&gt;),所以你可以提供此資訊. 多虧了Rich Signell
        * 改进:在生成達塔斯 Xml, EDDTable 数据集:&lt; subsetVariables 更保守。 多虧了約翰·克福特
        * 改进:如果 datasets.xml 指定数据集 featureType 但不是 cdm\\_data\\_型,即 featureType 。 。 多虧了Rich Signell
        * 產生 數據集 Xml 表示正确&lt;數據變數的資料Type&gt; scale\\_factor , add\\_offset 和/或 QQ 未簽署的屬性。
    * 改进:何时 ERDDAP™ 開啟 .nc 檔案是 **短** 比它應該是 (例如,它沒有被完全复制到原位) , ERDDAP™ 現在把檔案當做壞東西 前身 ERDDAP™ 傳回檔案中任何缺失部分的缺失值, 因為這是 netcdf- java 的預設行為 。 ERDDAP™ 現在使用ucar .nc 2.iosp.netcdf3.N3header.disallow FileTruncation=真; 多虧了我們這麻煩的RAID和克里斯蒂安·沃德 -加里森
    * 改善: ISO 19115 撰寫器正在使用 **建立者%%% 型態** 如果有,
    * 改进: ERDDAP™ 現在使用最新的 netcdf- java v4. 6.9 可以讀取其他類型的 **netcdf-4 檔案** . 多虧了克雷格·瑞西恩 里奇·辛吉爾 克里斯托弗·溫加德和OOI
    * BUG FIX: 如果不同的來源檔案對指定的變數有不同的資料類型, 請避免麻煩 。 多虧了羅伊·門德爾索恩和尤金·漢格
    * Bug FIX: UG: **時間格式轉換** 現在更能防備時空價值不好 多虧了NDBC
    * Bug FIX: UG: EDDGrid 來自 Nc 檔案 正在解包中處理時間值 **"自..."和"自..."** 正确 (增加月或年,而不是粗略地增加,例如,30天) . 多虧了Soda3.3.1.
    * 就在v1.74 **訂閱** 需要動作 (例如, http:// ...) 原本是而且應該是選擇性的
    * Bug FIX: UG: EDDGrid 從 MorgeIRFiles.low 取得來源媒體資料 () 沒有加入任何全球屬性 。 現在有了
         

## 1.74版本{#version-174} 
 (2016-10-07年) 

*    **新功能 (使用者) :**   
     
    * 現在, 當數據集清單 (全部,或搜索) 在網頁上顯示,長名會顯示在多行。 以前,長名的中段被 " ... " 取代。 多虧了瑪格麗特·奧布萊恩、LTER和EML
         
*    **事情 ERDDAP™ 管理者需要知道和做:**   
     
    * 要完成 : 在 Linux 電腦上, 變更 Apache 超時設定, 以便耗時的使用者要求不會超時 (常常出現的「 Proxy 」 或「 Bad Gateway 」 錯誤) . 根使用者 :
        
        1. 修改 Apache http d.conf 文件 (通常在/etc/ http d/conf/) :
變更已存在的&lt;超時 &gt; 設定 (或 在檔案的尾端添加一個) 至3600 (秒) ,而不是預設的60或120秒。
變更已存在的&lt;代理時空&gt; 設定 (或 在檔案的尾端添加一個) 至3600 (秒) ,而不是預設的60或120秒。
        2. 重新啟動 Apache: /usr/ sbin/ apachectl -好极了 (但有時它會在不同的目錄中) .
        
多虧了托馬斯·奧利弗
         
    * 新: \\[ 大父母 旗舰目錄
這類似旗子目錄, 但硬旗版本也刪除所有已儲存的資料集資訊 。 沒有網址可以設定硬旗 。 這只能用於在目錄中 。
硬 當你做一些會改變 ERDDAP™ 例如,當您安裝新版本的來源資料時,會讀取並解釋 ERDDAP™ 或者當您對數據集的定義做了某些類型的變更時 datasets.xml . 看 [此文件](/docs/server-admin/additional-information#hard-flag) . 多虧了John Kerfoot和所有Argo團體
         
    * 新 : 產生達塔斯 Xml 現在有 EDD Table 從EML 選項
它用生态元数据語言讀取數據集描述 (EML) 檔案,下載相關資料檔,並產生一塊 datasets.xml 讓數據集可以添加到 ERDDAP . 也有一個 EDDTable FromEMLBatch 對目錄中的所有 EML 文件做同樣的事情 。 這很有效, 因為EML在描述數據集方面做得非常好, 因為 KNB 和 LTER 提供實際資料檔 。
EML 附加 ERDDAP™ 可能是很棒的组合,因為 ERDDAP™ 幫助這些計畫符合美國政府的資訊。 [公众获取研究成果 (批次) 所需经费](https://nosc.noaa.gov/EDMC/PD.DSP.php) 以網路服務提供數據。
看 [此文件](/docs/server-admin/EDDTableFromEML) . 多虧了瑪格麗特·奧布萊恩、LTER和EML
         
    * 新 : 產生達塔斯 Xml 現在有從InPort 選取的 EDD Table 選項
在 InPort XML 檔案中讀取數據集描述, 並試圖產生一個區塊 datasets.xml 讓數據集可以添加到 ERDDAP . 這很少會產生一個可即時使用的 XML 區塊 datasets.xml 但這會形成一個很好的粗略的草稿,
如果使用InPort來記錄他們的數據集的人也能使用,那就太好了 ERDDAP™ 以提供实际数据。 ERDDAP 和美國政府相遇, NOAA 是 [公众获取研究成果 (批次) 所需经费](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research) 以網路服務提供數據。 這是現在可以使用的解決方案 ( erd.data at noaa.gov 很樂意幫忙)   
看 [此文件](/docs/server-admin/datasets#eddtablefrominport) . 多虧了埃文·豪威爾和梅蘭妮·阿貝卡西斯
         
    * 改进: ERDDAP™ 現在使用netcdf-java 4.6.6.
使用更早的版本, netcdf- java 讀取一些填充值 (也許,就在Netcdf-4檔案中) 作為0's。 現在它讀取了其中的一些 netcdf 標準填充值: 字節為 -127,短節為 -32767,短節為 -2147483647。 Unidata 說新的行為是正常的 如果一個數據集中的變數開始顯示其中一個數值,它們曾顯示 0's,你可以加入,例如,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
到變數 addAttributes 要告訴 ERDDAP™ 將此值視為 missing\\_value 填充 价值 然而,在很多情況下,這無法取得期望的結果:0's. 如果有, 考慮用 NCO 或重寫檔案。 抱怨? 請聯繫 Unidata ;-)
         
    * 要完成: 新增地形深度調色板
我建議您切換所有使用海洋深度調色板的數據集, 以使用新的地形深度調色板, 除了翻轉的顏色外, 這就像地形調色板, 所以它适合深度值 。 (正向下) 高度值 (肯定=上) . 此調色板的建議設定如下:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * 新的感覺: 字符串 missing\\_value 和/或填充值
如果字串變數定義 missing\\_value 和/或「火花」, ERDDAP™ 將這些數值從資料中移除, 換成空字串, 讓缺失的數值以空字串的形式出現, 如其他數據集一樣 ERDDAP . 多虧了瑪格麗特·奧布萊恩、LTER和EML
         
    * 新的感覺: 支援本地時代
有 Strings 的來源數據的時間戳變數現在可以通过 " 指定時區 time\\_zone " 引向的屬性 ERDDAP™ 以轉換本地時區來源時間 (有的在標準時間,有的在日光節) 成 Zulu 時光 有效的時區名稱列表可能與 TZ 列中的列表完全相同 。 [此表格](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) . 缺省是 " Zulu ". 美國的時區是:美國/哈瓦伊、美國/阿拉斯卡、美國/太平洋、美國/山地、美國/阿里索納、美國/中部、美國/東部。 对于有數字來源數據的時間戳變數, 您可以指定 " time\\_zone " 屬性,但值必須是 " Zulu "或"UTC"。 多虧了瑪格麗特·奧布萊恩、LTER和EML
         
    * 新 FEATURE: EDDTable From AsciiFiles 支持分號分隔的檔案
更聰明地找出分隔者 多虧了瑪格麗特·奧布萊恩、LTER和EML
         
    * 新的感覺: 如果載入 Datasets 存在重大錯誤 (主要或次要,例如缺失或無效 datasets.xml 文件) , ERDDAP™ 將在狀態.html 中顯示它, 在 "n Datasets 失敗到載入" 下方為 ERROR: 在處理時 datasets.xml : 详见 log.txt。
         
    * 新的感覺: ERDDAP™ 找孤兒
什麼時候 ERDDAP™ 做大负荷 數據集, 它現在尋找孤兒數據集 (正在使用的數據集 ERDDAP™ 但不是在 datasets.xml ) . 如果找到, 它們會在狀態. html 中列出, 在 "n Datasets 失敗到載入" 下方為 ERROR: n Orphan Dataset (數據集 ERDDAP™ 但不是在 datasets.xml ) ~... ~
如果你想移除 (卸下) 孤兒, ERDDAP™ ,需要添加
        &lt;數據集類型="_任何ValidType_" datasetID ============
至 datasets.xml 直到下一個重載 Datasets 中卸下數據集 。
         
    * Bug FIX: UG: 如果數據集中有數值乘數 "seconds since 1970-01-01T00:00:00Z" 和与&lt;更新 EveryNMillis &gt; 系統啟動中, 時間戳變數的範圍在更新数据集時被設定錯誤 。 多虧了約翰·克福特
         
    * 如果&lt;快速 Restart &gt; 在設定. xml 中是真實的, 您要求從 EDD Table 從... 使用的檔案資料集&lt;更新 EveryNMillis &gt;, 數據集的首個要求會失敗, 但之後的要求會成功 。 現在第一個要求不會失敗 多虧了約翰·克福特
         
    * BUG FIX: 產生達塔塞茨Xml.sh和. 現在是了 多虧了約翰·克福特
         
    * Bug FIX: UG: 新的 EDD Table from MultidimNcFiles 沒有從字串中移除後端空格 。 現在有了 值得注意的是, 這影響了 ARGO 檔案 。 多虧了凱文·奧布萊恩和羅蘭·施韋策
         
    * Bug FIX: UG: 所有遠端存取 DAP 服務現在由更現代的代碼啟動。 它在存取一些 EDD Table FromErdddap 数据集時修正了「 關閉的連接」 錯誤 。 多虧了凱文·奧布萊恩
         
    * Bug FIX: UG: 處理 orderBy ... () 不同 () 現在又回到了最近的變更之前的樣子 : 給定的請求可能有多重 orderBy ... () 和(或) () 滤波器; ERDDAP™ 以指定的顺序處理它們。 多虧大衛·卡魯加
         
    * Bug FIX: UG: 如果數據集是 EDD Table FromDatabase 且有查詢 [源碼命令By](/docs/server-admin/datasets#sourcecanorderby) 和/或 [源碼CanDistinct](/docs/server-admin/datasets#sourcecandodistinct) ,那么數據庫可能會 (依 datasets.xml ) 部分或全部控件 **只有第一次**   orderBy .. () 或不同 () . 多虧大衛·卡魯加
         
    * Bug FIX: UG: 最近增加的百分率編碼引起一些查詢問題 .nc CF 檔案, 例如“ HTTP 狀態 ” 500 - 查詢錯誤: 變數=station 在結果變數清單中列出兩次 。" 多虧了凱文·奧布萊恩
         
    * BUG FIX: 當其中一列為真字元列時, EDDTable FromFiles 重新載入數據集有問題 。 多虧了羅蘭·施韋策
         
    * Bug FIX: UG: EDDGrid 來自 Nc 檔案 現在不打包也轉換 missing\\_value 和 QQFillValue 到標準值, 因此可以將不同值的檔案聚合 。 因此變更, 在您安裝此新版本後 ERDDAP™ 請設置 [硬 旗號](/docs/server-admin/additional-information#hard-flag) 每架 EDDGrid 來自 Nc 檔案 您的未打包數據集 ERDDAP .
         
    * 改善: EDD Table FromNcCFFiles 可以處理有多重樣本的檔案。 給定的數據集必須只使用使用樣本中的一個的變數 。 多虧了阿杰·克里希南
         
    * 在...&lt;排序 FilesBy Source 名稱 &gt; 現在允許分隔逗號 (推荐) 或空格分隔的可變來源名稱列表。 單位變數名稱可能會被雙引號包圍, 例如, 如果名稱有內部空間 。

## 1.72版本{#version-172} 
 (2016-05-12年) 

*    **新功能 (使用者) :** 沒有
     
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 來自多點目錄的新 EDD表 [多晶格檔案的 IDD 表格](/docs/server-admin/datasets#eddtablefrommultidimncfiles) 是 EDD Table From NcFiles 的新替代品。 它旨在處理數個變數的檔案群組, 如 var1 \\[ a \\]  \\[ b \\] , var2 \\[ a \\] , var3 \\[ b \\] 斯卡拉瓦 多虧了阿爾戈計劃 奧雷利·布賴恩德和羅蘭德·施韋策
    * Bug FIX: UG: ERDDAP™   (透過檔案VisitorDNLS與檔案VistorSubdir 類別) 現在跟蹤 Linux 上的符號連結 。 ERDDAP™ 仍然不跟隨. lnk在Windows。
    * 1.70引入的bug FIX: 獨立 + orderBy 在一次要求中,不能一起提出。 現在又來了 它們并不相互排斥/重复。 多虧大衛·卡魯加
    * 更改至 datasets.xml IP 位址黑名單 :
IP v4 位址顯示為 ERDDAP™ 如 4 期分隔的 ix 數字 。
我認為IP v6 位址是 8 冒號分隔的六個數字 。
所以 ERDDAP™ 現在支援該清單中的 IP 位址中的冒號, 以及 :\\\ 在清單的末尾阻擋一系列位址 。
    * 改进: ERDDAP™ 現在使用NetcdfFileWriter來寫入 .nc 檔案取代已贬值的 NetcdfFileWriteable 。 結果的檔案應該沒有可辨別的變更 。 這讓人有可能大 .nc 使用 .nc 3 64 位延伸 。 如果你想/需要,請向 erd.data at noaa.gov .
    * 許多與遠端網站相關的連結已過期。 現在他們是最新的,使用 https: 代替 http :只要可能。
    * 很多小改變

## 1.70版本{#version-170} 
 (2016-04-15年) 

*    **新功能 (使用者) :** 沒有
     
*    **事情 ERDDAP™ 管理者需要知道和做:** 下面是您設定的. xml 檔案中的一些建議變更 。
請現在改一下
30分鐘的工作可以讓你省下 未來的困惑
    * 臭虫修正 : 問題是要求被轉移到遠端 ERDDAP 以無效的字元失敗 。 | ' 錯誤訊息 。 這只發生在 Tomcat 的最新版本。 多虧了羅斯提·霍勒曼 康納·德拉尼和羅伊·門德爾索恩
    * 臭虫修正 : ERDDAP™ 現在使用最新版的Netcdf-java (說來話長) 包含對 NcML 的最新支援, 它可以修正 NcML LogicalReduce 的問題。 可能會有一些小的變更 ERDDAP™ 由 netcdf-java 讀取 。 .nc , .hdf , . grib, 和. bufr 文件 。 多虧了法維奧·梅德拉諾
    * 新的 [EDD 表格外加通道](/docs/server-admin/datasets#eddtableaggregaterows) 允許您從兩套或多套 EDDTable 資料組中建立 EMDDTable 資料集。 感謝凱文·奧布萊恩
    * 從數據庫中新增 EDD Table 選項 ( [源碼命令By](/docs/server-admin/datasets#sourcecanorderby) 和 [源碼CanDistinct](/docs/server-admin/datasets#sourcecandodistinct) ) 指定是否 ERDDAP™ ,數據庫,或兼有,處理不同的和 orderBy   (和所有變體) 限制。 多虧大衛·卡魯加
    * 您可以透過新資料向公眾提供私人數據集的圖片與中繼資料[來源請求]&lt;圖片存取到 &gt; 公開&lt;/graphsAccessibilityTo &gt;] 。 (/docs/server-admin/datasets#graphsaubelto) 标记。 多虧了伊曼紐爾·倫巴第
    * 現在, 如果字串傳到產生達塔塞 Xml 或 DasDds 被雙引號包圍, 是未引用的 (就像JSON弦) . 多虧了約翰·克福特和梅蘭妮·阿貝卡西斯
    * 產生達塔斯 Xml 支持"default" 以取得預設值與" nothing" 來取得空字串 (他們工作與不引用) . 這可以解決一些與傳送空字串相關的問題 。
    * 現在,在產生達塔斯 Xml, 所有人 EDDGrid 從檔案與 EDD 表格 如果樣本來自 Files 資料集 您指定的檔案名稱是 "" (空字串) ,它會使用目錄 + regex + recursive= true 的最後匹配檔案Name 。
    * 更新 : 用于在 Linux 電腦上顯示 GenerateDatasetsXml 和 DasDds 結果的 InBrowser 代碼已过时, 並且給了關於Netscape 的奇怪的訊息 。 這使用現代的 Linux 工具: xdg- open 。 多虧了梅蘭妮·阿貝卡西斯
    * 其 allDatasets 數據集現在有 "files" 列,表示 / files 連結的基址 (如果有的話) 用于數據集。
    * 增加您的安全性 ERDDAP™ 改變與Tomcat目錄和大家长會相關的權限:
         (下面的实际命令是用于 Linux 的 。 對其他操作員來說 做類似的改變) 
        * 變更「 群組 」 以成為 tomcat, 您的使用者名稱, 或是包含 tomcat 和 Tomcat 的所有管理者的小群組的名稱 。 ERDDAP 例如,
chgrp - R _ 您的使用者Name_ apache-tomcat_ 8. 0.23_
chgrp -R _你的 使用者名稱大家长介面_
        * 變更權限, 讓 tomcat 與群組有讀、 寫、 執行權限, 例如 。
chmod - Rug+rwx apache-tomcat - 8.0.23_
chmod - R ug+rwx _ 大家长
        * 移除使用者的讀、寫或執行權限 :
chmod - R o-rwx apache-tomcat - 8.0.23_
chmod - R o - rwx _ 大家长
這很重要 因為它阻止其他使用者讀取可能敏感的資訊 ERDDAP™ 設定檔案、 紀錄檔案和包含私密數據集資訊的檔案 。
    * 認證/登記系統已修改 。 多虧了托馬斯·加德納 伊曼紐爾·倫巴第 和美國政府 [HTTPS 唯一標準](https://home.dotgov.gov/management/preloading/dotgovhttps/) .
        * 驗證=openid 選項已移除 。 是过时的
        * 新的,推荐的, [認證=google](/docs/server-admin/additional-information#google) 選項用途 谷歌簽署 (基于 OAuth 2.0) 允許任何有 Google 電子郵件帳戶的人 (包括 谷歌管理帳戶如 @noaa.gov ) 登入。
        * 新的, [認證=郵件](/docs/server-admin/additional-information#email) 選項是認證=google的備份。 它允許使用者使用 a&lt;使用者 &gt; 標籤在 datasets.xml 登入 。
        * 在您的設定中, xml 請變更描述為&lt;認證 &gt; 要為
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * 在您的設定中, Xml 中, 請在下方加入此項 。&lt;認證&gt; 標籤
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * 沒有登入的使用者可以使用 http 或 https URL( 如果您已設定 )&lt;baseHttpsUrl&gt; 在您的設定中. xml ). 多虧了美國政府的新消息 [HTTPS 唯一標準](https://https.cio.gov/) .
        * 現在,你可以鼓勵所有使用者使用 https   (不是 http ) 设置&lt;baseUrl &gt; 要成為一個 https URL. 強迫使用者只使用 https ,您必須修改您的 Apache/Tomcat 設定以阻擋非... https 存取。 多虧了美國政府的新消息 [HTTPS 唯一標準](https://https.cio.gov/) .
            
在您的設定中, xml 請變更描述為&lt;基底Url &gt; 要為
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * 選擇&lt;密碼編碼 &gt; 變了 在您的設定中, xml 請變更描述為&lt;密碼編碼 &gt; 要為
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * 在您的設定中, xml 請變更描述為&lt;基數HttpsUrl &gt; 要變為
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * 如果列表PrivateDatasets= true in setup.xml, 對使用者無法存取的數據集的資訊會更加少。
    * 現在,特別是當你最初設置你的 ERDDAP 現在你可以看到 ERDDAP™ 不要試著訂閱遠端 ERDDAP™ 數據集。 多虧了菲利佩·羅莎·弗雷爾
在你的設置. xml, 就在之前&lt;字体家庭&gt;, 請添加
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * 在您設定的. xml 中, 在以上指令中&lt;請插入:
如果可能, 設定此項以使用安全連線 (SSL / TLS) 到電子郵件伺服器。
如果您的設定沒有使用安全連接到電子郵件伺服器, 請做變更以完成 。
    * 在你的 datasets.xml 請在描述中加入此行。&lt;訂閱 Email Blacklist &gt; 在您的中 datasets.xml :
你可以用這個名字 "\\*" 列出全部域名,例如,\\*@example.com. .
    * 自 v1.66 中變更紀錄系統後, 紀錄檔從未更新 。 常有信件或部分信件等待寫入日志檔 。 現在,你可以更新它 (瞬間) 查看您的 ERDDAP 狀態網頁 :http://_your.domain.org_/erddap/status.html.
    * 哈斯迪格斯特...
    * 小小的改變 (至字符串2.canonic) 這能幫助我們保持快速發展 ERDDAP™ 也最好處理大量數據集。
    * 強烈 建議: 停止使用&lt;轉換到 Public SourceUrl &gt;  in datasets.xml 在數據集中轉換 IP 數字&lt; sourceUrl &gt; (例如,http://192.168.#.#/) 變成域名 (例如, http :my.domain.org/) . 從現在起,新訂閱http://localhost,http://127.0.0.1和http://192.168.#.#URLS因安全原因不能使用. 所以請用公有域名&lt; sourceUrl &gt; 標籤 (因 DNS 問題而需要的) 你可以使用 [伺服器上的/etc/host 表格](https://linux.die.net/man/5/hosts) 解決問題的辦法是不用 DNS 伺服器將本地域名轉換為 IP 數字。 您可以試試, 如果指定域名用於
ping_ some. domain.name_(某某.域名)
    * 在產生 Datasets.xml 中, 用于遠端數據集 (例如, 從 THREDDS 伺服器中) ,自動產生 datasetID 大部分域 s 未變 。 關於一些域, 第一部分 (即姓名) 自動產生的 datasetID 會有點不同 值得注意的是,有一部分的名字現在更可能有兩部分。 例如,從http://oos.soest.hawaii.edu以前曾导致 datasetID 從哈瓦伊開始,但現在導致 datasetID 以哈瓦伊為首 如果這對你造成麻煩,請發給我 可能會有工作
    * 卡珊德拉司機更新為cassandra-driver-core-3.0.0.jar,因此卡珊德拉 v3. EDDTable FromCassandra並沒有利用卡珊德拉的任何新功能. v3. 卡珊德拉的索引可能更複雜,但 ERDDAP™ 仍然使用 Cassandra v2 索引模型,它假設可以直接查詢索引列 '=' 限制。 產生達塔斯 EMD Table FromCassandra 的 Xml 不再檢測有索引的列; 如果索引很簡單, 您需要指定在 datasets.xml 手 如果您需要支援更複雜的索引或其他新功能, 請用電子郵件 erd.data at noaa.gov .
&#33; 如果你仍然使用 Cassandra 2.x, 請繼續使用 ERDDAP™ v1.68 直到你升級到使用 Cassandra 3.x.
    * Jars and the Classpath — 几乎所有包含的第三方.
        * slf4j.
        * 喬伊德 罐子和Tsik。 罐子被移除 /lib 和流派。
        * 如果您在編譯或執行時得到關于課程的錯誤訊息 ERDDAP™ 或其中一個工具, 比較您的命令行的類型 ERDDAP 是 [目前類型路徑](/docs/contributing/programmer-guide#development-environment) 找出你班上少了哪個Jar

## 1.68版本{#version-168} 
 (2016-02-08年) 

*    **新功能 (使用者) :** 沒有
     
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    *    [ EDDGrid 從檔案名稱或全局中繼資料的檔案聚合](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) --
所有變式 EDDGrid 從 Files 中可以新增最左方的一部份檔案, 通常是時間, 以從每個檔案檔中產生的數值或從每個檔案中一個全局屬性的數值來組合 。
    * 我們之前建議你可能想建立 EDDGrid 從您的 Erddap 資料集中 datasets.xml 引用并重新保留 jplMU RSS 我們的T數據集 ERDDAP . 因為現在有新版本的數據集, 所以如果你的數據集 ERDDAP™ 新增數據集
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
如果您要移除舊的 jplMU RSS 您的 T 資料集 ERDDAP™   (這是你的選擇) ,將它的活性設定由"真"變為"假".
    * 臭虫修正 : 請檢查您在設定. xml 中指定的大家长董事 。 如果你沒有把刀 在末端&lt;大家长介面 &gt; 名稱, 那么 ERDDAP™ 將建立多個目錄, 將單字直接附加到您指定的名稱, 而不是建立子目錄 。 從1.68版開始 ERDDAP™ 在目錄名稱的尾部增加斜線, 如果您沒有指定 。 所以,如果你之前沒有指定 斜片在尾端,那么當你安裝 ERDDAP™ v1.68 您需要移動並重命名這些目錄 **之后** 你關掉舊的 ERDDAP™ 和 **之前** 您啟動新的 ERDDAP . 比方說,如果您錯誤指定了大家长會為/home/erdapBPD (沒有跟蹤的斜線) 和 ERDDAP™ 錯誤建立目錄如
/ 家/ erddapBPDcache 中
/家/erdapBPD副本
/ home/erddapBPD数据集
家/家/erddapBPDflag
/ 家/ erddapBPD 紀錄
/家/家/家/家
和一個名稱為/home/erddapBPD的檔案訂閱V1.txt,
那你需要移動並重命名為
/家/erdapBPD/cache
/家/erdapBPD/副本
/家/erddapBPD/數據集
/家/erdapBPD/旗
/家/erdapBPD/日志
家/家/erdapBPD/露天
和/home/erdapBPD/訂閱V1.txt
    * 臭虫修正 : 里面有蟲子 EDDGrid LonPM180 英寸 ERDDAP™ v1.66 當孩子的數據集是 EDDGrid 來自厄德達普
    * 臭虫修正 : 里面有個蟲子 EDDGrid 從檔案與 EDD 表格 從檔案中 ERDDAP™ v1.66 造成&lt;更新 EveryNMILIS &gt; , 以便在重新啟動後第一次載入數據集時被忽略 。
    * 臭蟲修正/ 新特性 : 如果在 EDDGrid 總和的分量, EDDGrid 收到 EDDGrid 從EDDable, EDDGrid 朗普180, EDDGrid 邊邊邊, EDD Table Copy, 或 EDD Table from EDDGrid 是... 從 Erddap 數據集中, 母數據集現在訂閱到底部 ERDDAP™ 數據集。 如果底部 ERDDAP™ 數據集在同一處 ERDDAP™ , 訂閱與驗證直接完成; 您不會收到要您驗證訂閱的郵件 。 否則,如果您的訂閱系統 ERDDAP™ 關閉, 設定&lt;重新載入 Everyniminutes &gt; 的設定值, 以將母數值套用到小數位 (60?) 以便保持更新。
    * 臭蟲修正/ 新特性 : 如果在 EDDGrid 總和的分量, EDDGrid 收到 EDDGrid 從EDDable, EDDGrid 朗普180, EDDGrid 邊邊邊, EDD Table Copy, 或 EDD Table from EDDGrid 已啟動="假", 孩子的數據集已跳過 。

## 1.66版本{#version-166} 
 (2016-01-19年) 

*    **新功能 (使用者) :** 
    * 圖 (不是地圖) 現在轴上可以有下降值 。 要在使用 Make A Graph 網頁時得到, 請變更新的 Y 轴: 遞增設定 (默认) 到下降。 或者,在需要圖片的網址中,使用新選項 3 ' | ' 參數 [&.x 範圍和/或 & 。 射程切換器](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) ,這不可能 (默认) , true, 或 t 來得到升值, 或是用假值或 f 來得到降值 。 是真的 | 假數值是大小寫不敏感 。 多虧了克里斯·富里洛夫 約翰·克福特 盧克·坎貝爾 和卡拉·威爾遜
    * 使用者現在可以通过新增 &. bgColor=0x_ 來指定圖形的背景顏色 。 AARRGGBB_ 切換到要圖的網址 。 參考 .bg 圖示指令區域中的 .bgColor [网格](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) 和 [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands) 文件。 多虧了約翰·柯福特和盧克·坎貝爾
    * 表格化的數據集,限制可以指: min (可變名稱(_S) _) 最大值 (可變名稱(_S) _) . 看 [分 () 最大值 () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) . 多虧了John Kerfoot
    * 表格化的數據集,使用時間限制 [現在](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) 現在可以指定毫秒或毫秒的時間單位。
    * 要求建立表格化的數據集的圖像, 就會產生地圖 (不是圖) 如果 x 和 Y 變數是經度類型和纬度類型變數 (相容單位) . 多虧了Rich Signell
    * 臭虫修正: 時轴標籤和勾選在同步要求多個圖表時有奇異的不合規則 (例如,在网页上) . 問題是 SGT 圖像庫中的一個錯誤 ERDDAP™ 使用 (一個變數是"穩定的" 這不該是) . 多虧了布拉德福德·布特曼
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 將您的電子郵件密碼放入像 setup. xml 那樣的純文字檔案有安全危險 。 我們強烈建議你:
        1. 建立電子郵件帳號 ERDDAP 使用, 例如 erddap@ your Institution.org 。 也有其他的好處, ERDDAP™ 管理員可以被授權存取電子郵件帳號 。
        2. 建立設定. xml 文件 rw 的權限 (讀取+寫入) 供操作Tomcat和 ERDDAP™   (使用者=tomcat ?) 沒有權限 (不讀或寫) 供群組和其他使用者使用。 多虧了菲利佩·羅莎·弗雷爾
    * 新的 [歸檔ADataset](/docs/server-admin/additional-information#archiveadataset) 工具简化 .tar  .gz 以适合歸檔格式的數據集子集歸檔 (特别是 NOAA '是NCEI) . 這對很多人都是有用的 ERDDAP™ 在很多情況下, NOAA .
    * 新數據集類型 [ EDDGrid 來自 NcFiles 未包裝](/docs/server-admin/datasets#eddgridfromncfilesunpacked) 是 EDDGrid 來自NcFiles。 不同的是,此類別之前會解開每個資料檔 EDDGrid 從檔案查看 :
        
        * 它解開了用來打包的變數 scale\\_factor 和/或 add\\_offset .
        * 它推動有 QQUnsign= true 屬性到更大的整數數型態的整數變數, 讓數值出現為未簽署的數值 。 例如, 未簽署的字節 (8 位) 變數成為簽署短數 (16 位) 變數 。
        * 它會轉換 QFillVale 和 missing\\_value 值為 NaN (整數數型態的 MAQVALUE) .
        
這個班級最大的優點是 它能提供一個方法 處理不同的價值 scale\\_factor , add\\_offset , 填表, 或 missing\\_value 在收藏中的不同檔案中。 不然你就得用工具 [NcML](/docs/server-admin/datasets#ncml-files) 或 [ NCO ](/docs/server-admin/datasets#netcdf-operators-nco) 要修改每個檔案以移除差異, 以便檔案可以由 EDDGrid 來自NcFiles。 要正常工作, 檔案必須遵循相關屬性 CF 標準 。 多虧了菲利普·馬科斯基
    * 新數據集類型 [ EDDGrid 龍PM180](/docs/server-admin/datasets#eddgridlonpm180) 讓您變更一些經度值大于 180 的數據集 (例如, 0 到 360) 成於經度值在 -180 至 180 之间的數據集 (經度加法或減法180,故此名稱) . 提供經度值在 -180 至 180 之间的數據集的最大優點是 OGC 服務 (例如, WMS ) 在此範圍內需要經度值。 多虧了琳恩·塔布斯基 法比恩·吉沙德 菲利普·馬科斯基 馬丁·斯佩爾
2016-01-26年 最新消息:Eeek&#33; 當孩子的數據集是 EDDGrid 從 Erddap 中引用同樣的數據集 ERDDAP . 此錯誤已固定於 ERDDAP™ v1.68.
    * 在 [產生 DatasetsXml](/docs/server-admin/datasets#generatedatasetsxml) ,新的特殊數據集類型, EDDGrid LonPM180 From ErddapCatalog, 讓您產生 datasets.xml 用于 EDDGrid 全部的 LonPM180 数据集 EDDGrid 數據集 ERDDAP 其經度值大于180。
    * 為了所有人 EDDGrid 數據集, 以 datasets.xml 您現在可以使用選項
[&lt;可存取 分 WMS &gt;真切 | 假&lt;/可存取 分 WMS &gt;] (/docs/server-admin/datas集#可存取的viawms)   (缺省=真) . 將此設定為假的強制禁用 WMS 此資料集的服務 。 如果是真的, 数据集可能仍無法通過 WMS 其他原因 (例如,不使用拉特或龍斧) . 這對獨立存在並被包圍的數據集尤其有用 EDDGrid LonPM180,所以只有LonPM180版本可以通过 WMS .
    * 在 setup.xml 中,您可以指定圖形背景的不同預設顏色 。 顏色在 0x_ ARRGGBB_ 表格中指定為 8 位數的十六進位數, 其中 AA, RR, GG, 和 BB 分别为不透明度, 紅色, 綠色和藍色元件, 指定為 2 位數的十六進位數 。 注意帆布總是不透明的白色 所以 (半 - –) 透明的圖形背景顏色混合到白色畫布中。 預設為 浅藍 :
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
多虧了約翰·柯福特和盧克·坎貝爾
    * 在 setup.xml 中,您現在可以指定最大大小 [日志文件](/docs/server-admin/additional-information#log)   (當它重新命名為登記時。 txt。 前一個和新日志。 txt 已建立) 在MegaBytes。 最低限值是1 最多2000年。 缺省是20 (甲基溴) . 例如:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * 在 datasets.xml ,[&lt;fgdcFile &gt;] (日文) (/docs/server-admin/datas集#fgdcfile) 或 [&lt;iso19115 檔案 &gt;] (/docs/server-admin/dataset#iso19115文件) 現在可以成為本地檔案 (和以前一樣) 或網址 (將下載, 所以有本地版本) . 如果 ERDDAP™ 無法下載檔案, 繼續載入數據集, 但數據集沒有 fgdc 或 iso19115 檔案 。
    *    EDDGrid 從檔案與 EDD 表格 從 Files 資料集可以快速重新啟動 (系統 ERDDAP™ 試著在數據集首次載入時使用 ERDDAP™ 重新啟動) . 這會加速重启 ERDDAP .
2016-01-26 最新消息:Eeek&#33; 這會產生一個錯誤&lt;更新 EveryNimillis &gt; , 以便在重新啟動後第一次載入數據集時被忽略 。 此錯誤已固定於 ERDDAP™ v1.68.
    * 快速重新啟動系統的一般改善可以 ERDDAP™ 快速載入數據集 ERDDAP™ 重新啟動 。
    * 全部 EDDGrid 從檔案與 EDD 表格 從檔案子類別接受新的&lt;路徑Regex &gt; 標籤, 一般在下面指定&lt;遞迴&gt;。 如果遞迴是「 true 」, 只有符合路徑的完整子目錄路徑 (缺省=... ...... .........") 會被接受的 同样,a&lt; sourceUrl s &gt; 標籤中 EDDGrid 拼接Dimension 可以包含路徑Regex屬性 (缺省=... ...... .........") .
    * 預設值&lt;部分請求MaxBytes &gt; in setupt.xml 已經是 490000000000 (~490 MB) . 避免一些與從 THREDDS 資料伺服器取得資料相關的問題/超時 。 多虧了萊斯莉·索恩
    * 紀錄系統的小變更應允許 ERDDAP™ 當它非常,非常忙的時候, 更能反應。 資訊現在被寫入磁碟磁碟磁碟的紀錄檔 。 其優點是這很有效率... ERDDAP™ 永遠不會阻擋等待將資訊寫入紀錄檔 。 其缺点是, 紀錄幾乎總會以部分訊息結束, 在下一個區塊被寫入之前不會完成 。
    * 臭蟲修復與無體化相關 [&lt;更新 EveryNMILIS &gt; (/docs/server-admin/datasets#update Everynmillis / 更新所有資料) 系統 EDDGrid 從檔案與 EDD 表格 從 Files 資料集 : 不再需要指定大量 fs. inotify. max\\_user\\_watches 或 fs. inotify. max\\_user\\_intances 。 里面有個蟲子 Java 造成部分 Java 當垃圾完成時, 它們將不被收集; 最终, 僵尸會將手表或例數超過指定的最大數量 。 ERDDAP™ 現在在這裏工作 Java 臭虫。
另外, 狀態. html 的網頁上列出無體線的數量, 這樣您就可以觀察其用法 。 通常每條線有1條不充電 EDDGrid 從檔案與 EDD 表格 來自 Files 資料集 。
    * 臭蟲修正 : 在很多地方, 而不是重排錯誤, 產生了新的錯誤, 它只包含一個短版本的原始錯誤訊息, 沒有堆疊追蹤 。 現在, 當產生新的錯誤時, 它會正確地包含全部原始的例外, 例如, 丟出新的例外 。 ("一些新消息",e) ;
多虧了蘇珊·帕金斯
    * 臭蟲修正: 直到最近 (v1.64?) ,如果.../ datasetID 要求建立網址, ERDDAP™ 將新增 .html 到 URL。 在 v1.64 中, 此失敗 (產生不正確格式化的 URL 後來失敗) . 現在又成功了 多虧了克里斯·富里洛夫

## 1.64版本{#version-164} 
 (2015-08-19年) 

*    **新功能 (使用者) :** 
    * 現在有指南可以存取密碼保護的私人 ERDDAP™ 数据集 ( https:// ) 途 curl 和 Python . 看 [ curl ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl) 和 [ Python ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python) 指令。
多虧了NANOOS的Emilio Mayorga 和玻璃科技的Paul Janecek。
         
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    *    ERDDAP™ 現在需要 Java 1.8+.
         Java 1.7 达到 [死亡](https://www.oracle.com/technetwork/java/eol-135779.html)   (不再更新安全性) 2015年4月。 此版本 ERDDAP™ 不會與版本 Java 低于1.8。 如果你從 Java 1.7x (或更早) 你也要更新Tomcat 看 [ ERDDAP™ 設定指令](/docs/server-admin/deploy-install) 供下載連結和建議。
    * 新增資料提供者表 。
當數據提供者來到您想要將一些數據加入您的 ERDDAP™ , 收集所有需要加入數據集的元数据可能很困難,也很耗時。 ERDDAP . 很多資料來源 (例如,.csv文件, Excel 文件, 資料庫) 沒有內部中繼資料 所以 ERDDAP™ 新的資料提供者表格收集資料提供者的中繼資料, 并給資料提供者一些其他的指導, 包括对數據庫中的數據的广泛指導。 提交的資訊已轉換成 datasets.xml 格式,然后發到 ERDDAP™ 管理者 (你) 已寫入 (附 件) 提供form.log。 因此,窗体半自動將數據集的進化过程 ERDDAP™ 但是 ERDDAP™ 管理員仍然需要完成 datasets.xml 區塊與處理取得資料檔 (s) 從提供者或連接數據庫。 更多信息,参见: [資料提供者 表格描述](/docs/server-admin/datasets#data-provider-form) .
    * 新建&lt;匹配 AxisNDigits &gt;
可用 EDDGrid 從檔案 (因此從NcFiles和MorgeIRFiles中) , EDDGrid 總和的分量, EDDGrid 收到 EDDGrid SideBySide 數據集以指定不同檔案中的轴值的精确等值 (多少位數字) : 0 = 不檢查 (不要用這個&#33;) ,1-18用于提高精度,或20 (默认) 完全平等 N=1-18, ERDDAP™ 確保雙數值的第一個 n 位數 (或 (n+1) 浮點數值 div 2) 平等。
        &lt;匹配 AxisNDigits &gt; 取代&lt;已贬值 。 轉換為與 AxisNDigits = 20 相匹配的「 true」 值 。 假的值 (不要這樣&#33;) 轉換成匹配 轴距=0.
    *    EDDGrid 從檔案與 EDD 表格 當您第一次使用此版本時 Files 會很慢的載入 ERDDAP .
         ERDDAP™ 現在以不同方式儲存內部檔案資訊, 所以要重建這些資料集的內部檔案表 。 別擔心 沒事的 就一次
    * 遠端來源檔案
         EDDGrid 從 NcFiles 、 EDD Table From NcFiles 、 EDD Table From NcCFFiles 現在可以讓檔案在可以存取的目錄中成為遠端檔案 http://   (可能 https:// 和ftp://,但他們沒有試驗) 如果遠端伺服器支援 [範圍要求](https://en.wikipedia.org/wiki/Byte_serving) 。 THREDDS和亞馬遜S3支援範圍要求, Hyrax 不 此系統允許您不下載檔案而存取遠端檔案中的資料 (如果遠端檔案太大, 這有幫助) , 但是這些檔案的存取速度遠慢于本地檔案甚至遠端檔案的存取速度 OPeNDAP 源。
其中包括 "files" 在亞馬遜S3桶中, http:// . 如果 S3 物件名稱像檔案名稱 (內部 / 就像是 Linux 目錄樹) , ERDDAP™ 也可以通過 ERDDAP 是 "files" 系統。 您的 S3 憑證必須在 ~/. (在 Linux 、 OS X 或 Unix 上) ,或 C:\\ 使用者\\ USERNAME\\\.aws\\ 憑證 (在視窗上) 在伺服器上 ERDDAP . 看 [Amazon SDK 文件](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1) .
    * 產生達塔斯 Xml 有新的不同寻常的選擇: EDDs From Files.
這會通過檔案系統 (甚至像亞馬遜S3的遠端系統 如果物件有類似檔案的名字) 建立 datasets.xml 數據集的區塊 。 你的里程可能不一樣 如果檔案排列好, 使指定目錄中的所有資料檔案都有效 (及其子目錄) 适合一個數據集 (例如,所有SST 1天复合材料) . 不然 (例如, 如果目錄中包含一些 SST 檔案和一些 Chlorophyll- a 檔案) 工作不好 但還是有用的
    * 程序員: 新的/lib jar 檔案 。
如果您編譯 ERDDAP™ 中的新 .jar 檔案 ERDDAP™   [程式指南](/docs/contributing/programmer-guide) .
    * 海 水 實 效
如果您對任何變數使用 CF 標準名稱 Sea\\_water\\_salinity, 我建議您切換到 sea\\_water\\_ 实践\\_salinity 。 [CF 標準名稱表第29版](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)   (之前的一些版本 我不知道) . 這個名稱表明, 這確是一個實際的 咸度值 。 Practical Salinity Units   ( PSU ) ,而不是更老的g/kg值。 警犬單位不一樣 但還是很沒用: 1 (可能意味著 PSU /PSS-78) ,而不是 1e-3 (可能暗示g/kg) 海水的酒精 \\[ 嘿 Unidata 和 CF : 我們找出使用其他比例的數值, 例如Fahrent或Central, 通過一個單位串表示比例的名稱或一些變化 。 為什麼我們不能用它們的尺寸來辨別盐度單位,例如PSS-78? 我知道,PSS -78值是"無體的",但有暗示的尺度,不是嗎? 如果我發明一個新的實際的盐度尺度, 其中的值是PSS-78值的0.875倍, 使用者怎麼能分開呢? 1e-3和1的單位對試圖找出數字的使用者既無描述性, \\] 

## 1.62版本{#version-162} 
 (2015-06-08年) 

*    **新功能 (使用者) :** 
    * 為 EDDGrid 數據集, 使用者現在可以製作 Graph Type: Surface 圖, 配有數據轴, 不只是經度對纬度。 這會讓你做x對Y (預期) 圖和各种 [霍夫默勒圖](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram) 例如經度比深度 或時間比深度 \\[ 注意: 如果深度在 Y 轴上, 可能會從你想要的角度翻轉 。 抱歉, 拆掉它不是一個選擇 。 \\] 多虧了卡拉·威爾遜和琳恩·德威特
    * 有新的 [大洋/大气层](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html) 讓您將普通的海洋/大气縮寫轉換成全名 。
    * 有新的 [海洋/大气 可變名稱轉換器](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html) 讓您將共同的海洋/大气變數名稱轉換成/從全名稱。
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    *    Java 7/8
         Oracle 不再支援 (提供安全錯誤修正)   Java 7. 工 作 ERDDAP™ 仍然支持 Java 7,但請移到 Java 8. 下次公布 ERDDAP™ 可能需要 Java 8.
    *    valid\\_min 最大/ 距离
以前和現在,如果 dataVariable 有 scale\\_factor 和 add\\_offset 中繼資料, ERDDAP™ 解開資料數值並移除中繼資料 。 前身 ERDDAP™ 沒有修改/卸下任何 valid\\_range , valid\\_min , valid\\_max 中繼資料 (通常/ 應該包含打包值) 由 scale\\_factor 和 add\\_offset . 現在有了 請搜索你的 ERDDAP™ 並確保所有變數都有 valid\\_range , valid\\_min ,或 valid\\_max 在新版本的 ERDDAP . 看 [ valid\\_range /分/最大文件](/docs/server-admin/datasets#valid_range) .
    * ACDD-1.3
前身 ERDDAP™   (特別產生達塔斯 Xml 命令) 已使用/ 推荐原作 (1.0) 版本 [ NetCDF 數據集發現屬性常规](https://wiki.esipfed.org/ArchivalCopyOfVersion1) 被称作 " Unidata Global Conventions 中的數據集探索 v1.0" Metadata\\_Conventions 屬性。 我們建議 [ACDD 版本 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 于2015年初批准,并称为“ACDD-1.3”。 幸運的是,ACDD-1.3與1.0版本高度的反向兼容. 我們建議你 [切換到 ACDD- 1. 3](/docs/server-admin/datasets#switch-to-acdd-13) . 不難
    * 產生達塔斯 Xml 屬性
做了很多修改&lt; addAttributes &gt; GenerateDatasets 建議的值 Xml為全球公约, creator\\_name /email/url、关键字、摘要和標題屬性以及變數 long\\_name 屬性。 一些變更與ACDD-1.3的新用途有關.
    * 從 EDD 表格 SOS 数据集
偶爾增加了新類型 SOS 伺服器與變更舊的伺服器,對此更難了 ERDDAP™ 從伺服器的回應中自動檢測伺服器型態。 使用[&lt;sosServerType &gt;] (西德語). (/docs/server-admin/datasets #ddable fromsos-skeleton-xml 的資料集)   (有IOOS\\_NDBC的價值,IOOS\\_NOS, OOSTethys 或者) 現在被大力推薦了 如果您的此類型的數據集在新版本有問題 ERDDAP ,試著重新執行生成達塔斯 Xml 表示 SOS 伺服器以產生新的區塊 datasets.xml 那套數據 產生達塔斯 Xml會讓你試試不同的&lt;sosServerType &gt; 選項, 直到您找到給定伺服器的正確的選項 。 如果你還有問題 請告訴我你看到的問題 以及伺服器的網址 我會盡力幫忙
    * 檔案名稱資料集中的 EDD Table
建議的一些屬性 addAttributes 屬性。 您可能不需要改變您已存在的數據集 datasets.xml .
    * 臭蟲修正與對 EDD Table FromNcCFFiles 数据集的某些要求相關 。
在目前數量的單位測試中, (有100种假想) . 多虧了Eli Hunter
    * 臭蟲修正/ 小變更 EDDGrid 從MorgeIR。
多虧了喬納森·拉菲特和菲利普·馬科斯基
    * 臭虫修正 : EDDGrid 從 Erddap 開始工作, 即使遠端數據集沒有 ioos\\_category 變數屬性。
多虧了凱文·奧布萊恩
    * 在.graph網頁中修正臭蟲 EDDGrid 數據集,只有一個有數值以上的轴變數。
多虧了查爾斯·卡爾頓
    * 還有其它小的改进、變更和錯誤修正 。

## 1.60版本{#version-160} 
 (2015-03-12年) 

*    **新功能 (使用者) :** 無
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 強烈建議: 更新您的伺服器 [机器人.txt](/docs/server-admin/additional-information#robotstxt) 要包含的檔案 :
拒絕 : /erddap/文件/
    * 通知問題與解決:
在 Linux 電腦上, 如果您正在使用&lt;更新每一個NIMillis &gt; 有類型=的數據集 EDDGrid 從 Files 、 從 File 的 EDD Table 、 從 Files 的 EDD Table 、 從 Files 的 EDD Table 、 從 Files 的 EDD Table EDDGrid 复制 EDDTable Copy 或它們的子類, 您可以看到一個數據集無法載入的問題 (偶爾或持續) 含有錯誤訊息 : “ IOExcuseion: 使用者限制不指定已達或開啟太多的檔案 ” 。 如果有,你可以打電話解決問題 (作为根) :
回應 fs.inotify.max======= | -a/etc/sysctl.conf
回應 fs.inotify.max====== | -a/etc/sysctl.conf
sysctl - p
或者,如果問題仍然存在,使用更高的數字。 手表的預設值是8192 例的預設值為 128 。 \\[ 更新 : 裡面有個錯誤 Java 造成不收集垃圾。 此問題在 ERDDAP™ v1.66及以上. 所以更好的解決辦法是切換到最新版本 ERDDAP . \\] 
    * 沒有此檔案排除 臭虫修正 :
可能會產生類型=的數據集的錯誤 EDDGrid 從 Files 、 從 File 的 EDD Table 、 從 Files 的 EDD Table 、 從 Files 的 EDD Table 、 從 Files 的 EDD Table EDDGrid 复制 EDDTable Copy, 或他們的子類, 不偶爾載入錯誤的「 NoSuchFileException: _SomeFileName 」 。 此錯誤與 File Visitor 的用途相關, 並且引入於 ERDDAP™ v1.56. 問題少見, 很可能會影響數據集,
    * 有一些小的改进、 變更和錯誤修正 。

## 1.58版本{#version-158} 
 (2015-02-25年) 

*    **新功能 (使用者) :** 
    * 新的 [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) 系統讓您瀏覽虛擬檔案系統, 從多個檔案下載來源資料檔案 ERDDAP™ 數據集。 其 "files" 系統預設作用, 但 ERDDAP™ 管理員可以通过放
```
        <filesActive>false</filesActive>  
```
在 ERDDAP™ setup.xml 文件。 特別感謝Philippe Makowski 在我慢慢體會到這個想法的美時 一直坚持不懈
    * 時間目的地 最大 先前, EDDTable 數據庫中含有近实时數據的時間變數有 NaN 的目的地Max, 表示數據庫的最大時間值是最近, 但並非完全已知, 且常有變更 。 現在,目的地Max有真正的價值, 表示目前已知的上次。 許多數據集已持續更新資料 。 ERDDAP™ 支持存取最新資料, 即使是在目前已知的上次之后 。 注意新的[&lt;更新 EveryNMILIS &gt; (/docs/server-admin/datasets#update Everynmillis / 更新所有資料) 支援 EDDGrid 從檔案與 EDD 表格 從 Files 資料集更新時間變數的目的地 Max 。 改變的另一個后果是 datasetID = allDatasets 數據集現在包括了目前已知的 MaxTime 欄目中的上次 。 多虧了約翰·克福特
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 強烈建議: 更新您的伺服器 [机器人.txt](/docs/server-admin/additional-information#robotstxt) 要包含的檔案 :
拒絕 : /文件/
拒絕 : /erddap/文件/
    * 樣本 datasets.xml -- 去年我們在海岸觀察站 推薦了幾套出色的數據集 ERDDAP™ 你可以加入你的 ERDDAP™ 只要在您身上加上几行 datasets.xml . 如果您新增了 erdVH 数据集, 請切換到更新的 erdVH2 数据集 :
        * 复制所有 erdVH 数据集, 并更改复制的 datasetID 從 erdVH... 到 erdVH2... 並變更參考的 sourceUrl 從 erdVH... 到 erdVH2...
        * 設定 erdVH... 數據集為啟動="假" 。
    * 全部 EDDGrid 從檔案與 EDD 表格 從 Files 子類群中支持 [&lt;可存取ViaFiles &gt;] (/docs/ server-admin/ datasets# accessibilityvia files) 以透過 "files" 制度。 假設, 每個數據集都關閉此系統 。 您需要加入標籤以啟動它 。 多虧了菲利普·馬科斯基
    * 全部 EDDGrid 從檔案與 EDD 表格 從 Files 子類群中支持 [&lt;更新 EveryNMILIS &gt; (/docs/server-admin/datasets#update Everynmillis / 更新所有資料) . 假設, 每個數據集都關閉此系統 。 您需要加入標籤以啟動它 。 多虧了多米尼克·富勒·羅威爾和NGDC
    * 新的 [檔案名稱中的 EDD 表格](/docs/server-admin/datasets#eddtablefromfilenames) 從伺服器檔案系統中的一组檔案的資訊建立數據集, 但是它不服務檔案內的資料 。 例如, 這對分配影像檔案、 音效檔案、 影像檔案、 單字處理檔案及電子表格檔案的收藏有用 。 這和新的一起工作 [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) 系統,以便使用者可以下載檔案。 特別感謝Philippe Makowski 在我慢慢體會到這個想法的美時 一直坚持不懈
    * 新的 [ EDDGrid 從 EDD 可](/docs/server-admin/datasets#eddgridfromeddtable) 讓您將表格数据集轉換成網格化的数据集 。 多虧了加拿大海洋網
    * 新的 [ EDDGrid 來自 MorgeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles) 集合本地端群組的資料 .gz 文件。 EDDGrid 來自MorgeIRFiles的區別是 第一個編碼 ERDDAP . 完全沒有我們的幫助 三聲歡呼和特別感謝R. Tech工程公司的喬納森·拉菲特和菲利普·馬科斯基
    * 有一個新的,可選擇的設定. xml 標籤,&lt;單位 TestDataDir&gt; , 它指定了通過新的 GitHub 主目錄可以提供的與單位試取資料檔相關的目錄 : [https://github.com/ERDDAP/erddapTest](https://github.com/ERDDAP/erddapTest) . 例如:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
這還不是有用的,但是努力讓 尽可能多的單位測試可以被其他人使用的一部分。 多虧了泰瑞·蘭金
    * 有很多小的改进、 變更和錯誤修正 。

## 1.56版本{#version-156} 
 (2014-12-16年) 

*    **新功能 (使用者) :**   (無) 
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 你可能已經知道 [ EDDGrid 來自 Erddap](/docs/server-admin/datasets#eddfromerddap) 和 [EDD 表格來自 Erddap](/docs/server-admin/datasets#eddfromerddap) 讓您連結到其他的數據集 ERDDAP 讓他們出現在你身上 ERDDAP . 使用者要求從這些數據集中取得實際資料會隱形傳送到來源 ERDDAP™ ,所以數據不流過你的系統,也不使用你的頻寬。 樣本中現在有一大堆推荐數據集清單 datasets.xml 中 .zip . 將他們纳入你的 ERDDAP™ 你要做的就是把想要的复制和粘上 datasets.xml . 多虧了康納·德萊尼
    * 如果您編譯 ERDDAP™ 你需要加入一些新的。 罐子檔案到您的 [类路徑 - cp 切換](/docs/contributing/programmer-guide#development-environment) 和Java。
    * 新的 [來自卡桑德拉的EDD表](/docs/server-admin/datasets#eddtablefromcassandra) 處理從 [卡珊德拉](https://cassandra.apache.org/) . 多虧了加拿大海洋網
    * 新的 [ColumnarAscii 檔案中的 EMD 表格](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles) 處理從 ASCII 資料檔取得有固定width 欄位的資料。 多虧了菲利普·馬科斯基
    * 全部 EDDGrid 從檔案與 EDD 表格 Files 子類現在使用新方法, 文件檢視器 (新增到 Java 1.7) 收集檔案的資訊。 這對第一次收集特定數據集的檔案資訊可能無益, 但若能很快完成, 多虧了NGDC
        
我們仍建議: 如果數據集有大量的檔案 (例如, &gt; 1 000) 操作系統 (因此 EDDGrid 從檔案和 EDD 表格從檔案中) 如果您將檔案儲存在一系列子目錄中, 操作效率會高得多 (每年一次, 或每月一次 。) ,所以在指定的目錄中永遠不會有大量的檔案。
        
    * 對 EDD Table From AsciiFiles 的數個小改进 。
    * 對於EDDTable FromAsciiServiceNOS的一些改善, 多虧了琳恩·德威特
    * 一些與 ISO 19115 相關的小錯誤修正 ERDDAP™ 生成。 多虧安娜·米蘭

## 1.54版本{#version-154} 
 (2014-10-24年) 

*    **新功能 (使用者) :** 
    * 一些變數現在在毫秒的精度下與時間配合,例如,2014-10-24T16:41:22.485Z. 多虧了多米尼克·富勒·羅威爾
*    **小變更/ Bug 修正 :** 
    * 蟲子修復: 某種情況的结合, EDDGrid 從NcFile 資料集以降低的精度傳回資料 (例如,浮點而不是雙倍) . 這只會影響數據數值的 8 個重要數字 。 抱歉 (這是一個典型的電腦編程錯誤 一個錯誤的角色) 多虧了多米尼克·富勒·羅威爾
    * 很多小改變
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * Griddap 數據集目前支持时间戳轴變數和數據變數 (即有時間值的變數,但 a destinationName 除 "time" ) . 多虧了多米尼克·富勒·羅威爾
    *    ERDDAP™ 現在正确支持毫秒 time\\_precision "1970-01-01T00:00:00.000Z". 一個有意的怪胎:當寫到面向人類的檔案時 (例如.csv, .tsv , .json , .xhtml ) , ERDDAP™ 使用指定的 time\\_precision 如果它包括秒和/或小數秒;否则它使用秒 time\\_precision "1970-01-01T00:00Z" (一致和反向相容性) . 多虧了多米尼克·富勒·羅威爾
    *    EDDGrid 從 NcFiles 開始支持讀取字串 dataVariable s.
    *    .nc 由 gradap 寫入的檔案現在可以有字串 dataVariable s.
    * 產生達塔斯 Xml 包括更多的冲浪 () 以避免資訊被寫入檔案的問題。 多虧了泰瑞·瓦雷羅
    * GenerateDatasetsXml 的檔案已改进, 主要是要指出 -i 切換只在命令行指定全部答案的情况下才有效 (例如文稿模式) . 并解釋了腳本模式。 多虧了泰瑞·瓦雷羅
    *    ERDDAP™ 不再允許數據集中的兩個變數有相同的變數 sourceName . (如果有人之前做了,那可能會導致錯誤訊息.) 和以前一樣 ERDDAP™ 無法讓數據集中的兩個變數有相同的 destinationName .

## 1.52版本{#version-152} 
 (2014-10-03年) 

*    **新功能 :**   (無) 
*    **小變更/ Bug 修正 :** 
    * 又一個 (小) 更改 ERDDAP™ 快
    * 改进 ISO 19115 檔案 ERDDAP : 新增&lt;gmd: protocol & gt; 值 (信息,搜索, OPeNDAP : OPeNDAP , ERDDAP : griddap,和 ERDDAP : tabledap ) 內&lt;gmd:CI\\_OnlineResource&gt;. 多虧了德里克·斯諾登和約翰·莫雷爾
    * 很多小改變
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * Bug 修復: 產生 DatasetsXml.sh 和 DasDds.sh 在 erddap. war 的 1.48 和 1.50 。 現在是了 多虧了泰瑞·瓦雷羅
    * 在TestAll的一些速度測試上小有改變 以降低它們的機率 多虧了泰瑞·蘭金

## 1.50版本{#version-150} 
 (2014-09-06年) 

*    **新功能 :**   (無) 
*    **小變更/ Bug 修正 :** 
    * 這個 ERDDAP™ 應該比最近的版本快得多 。
*    **事情 ERDDAP™ 管理者需要知道和做:**   (沒什麼) 

## 1.48版本{#version-148} 
 (2014-09-04年) 

*    **新功能 :** 
    *    ERDDAP™ 現在總是建立表格化的數據集, datasetID = allDatasets ,它有關於此中所有數據集的信息表 ERDDAP . 和其他表格數據集一樣, 這是目前系統的有益替代方案, 以取得數據集的資訊 。
    * EDDTable 有兩種新的輸出檔案類型 EDDGrid ,csv0和 .tsv 0 它們是逗號與分頁數值的檔案, 沒有列名或單位的行 。 數據從第一線開始 它們對只想要一個資訊的劇本 尤其有用 ERDDAP .
*    **小變更/ Bug 修正 :** 
    * 地圖現在可以畫到經度 -720到720
    * 新的 .nc ml 回應檔案類型可供所有人使用 EDDGrid 數據集。 它返回 [NCML 檔案](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) \\ 格式化的數據集描述 (和 .dds +.das 相仿) .
    * 臭蟲修正: 儲存表格資料到 an .nc 檔案只限每個變數 100,000 值 。 現在只限2GB總檔案大小. 多虧了凱文·奧布萊恩
    * Bug 修正: 儲存 As Matlab 方法 datasetID s 轉換為安全 Matlab 變數名稱。 但我還是強烈建議你創造 datasetID s是有效的變數名稱:先用字母,然后使用A-Z、a-z、0-9和QQ。 看 [ datasetID ](/docs/server-admin/datasets#datasetid) . 多虧了盧克·坎貝爾
    * 在 EDD Table 從數據庫中修補錯誤 : 有一些類型的數據庫 NOQQ 數據庫的DATA回應造成30秒無意義的延遲 ERDDAP . 多虧了格雷格·威廉姆斯
    * 臭虫修正 : EDDGrid 以圖型=行來做圖 (或標示或標示和線) 強迫 x 轴變數為時間 。 現在它可以是任何一轴。 多虧了琳恩·德威特
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 大力推荐:更新 Java   
此版本 ERDDAP™ 需要 Java 7或更高,但 Java 7會在2015年4月結束 (快了&#33;) 所以現在是轉換到 Java 8. 所以 Java 8是強烈的建議。 我試了一下 Java 8. 注意: Java 6人于2013年2月到期 (不再修復安全漏洞&#33;) .
    * 大力推荐:更新Tomcat
如果你使用Tomcat,請切換到最新的Tomcat版本. Tomcat 8是設計與 Java 8.
    * " ERDDAP " 不再作简称。 現在它只是一個名字 我不想讓名字突出 ERD . 我想 ERDDAP™ 強調你的機構和數據
    * 請 [自訂您的外觀 ERDDAP™ 以突出您的机构和資料](/docs/server-admin/deploy-install#customize) . 有了一個小時的工作,你就能做出很好的改善,永遠保持下去。
    * 在setup.xml,&lt;showDiagnosticInfo &gt; 選項現在總是被忽略, 並且被當作數值是假的 。
建议:移除&lt;顯示DiagnosticInfo &gt; 標籤和您設定的相關資訊。
    * 在 setup.xml 中,默认&lt; drawLandMask # 已經是「 結束 」 , 但現在是「 不足 」 , 這是更好的一般預設 (所有數據集都效果很好) .
    * GenerateDatasetsXml.sh 和 DadDds.sh 的 Linux 文稿目前使用bash 而不是 csh , 并有 .sh 的扩展 。 多虧了埃米利奧·馬約加
    * 產生達塔斯 Xml 和 DasDds 現在建立自己的日志檔 (產生 DatasetsXml.log 與 DasDds.log) 輸出檔案 (生成 DatasetsXml.out 和 DadDds. out 。) 在 _BigPorent Briefy_/logs/ 中,從不將結果放在剪貼板上。
    * 產生達塔斯 Xml 支持在指定位置將輸出插入指定檔案的 -i 命令行參數 。 看 [文件](/docs/server-admin/datasets#generatedatasetsxml) . 多虧了泰瑞·蘭金
    * 現在支援數據庫的 EDD Table&lt;列Name 引文 &gt;&lt;/ 欄位Name 引文 &gt;, 有有效的值 " (默认) 要么就沒有了 此字元 (如果有) 在 SQL 查詢中會使用列名的前后。 以不同方式建立的不同類型的數據庫需要不同的列名引號 。
    * 表格的纬度和經度變數現在可以定制 long\\_name 例如,剖面經度。 之前只有經度和經度
    * 從現在起, 在數據集的全球中繼資料( 即 .&lt;新增Atts &gt; ),不另列&lt;預設的DataQuery &gt; 及&lt;預設 GraphQuery &gt; 標籤 。 (但是 如果你仍然通過標籤指定 ERDDAP™ 以資訊自動建立全局屬性。) 

## 1.46版本{#version-146} 
 (2013-07-09年) 

*    **新功能 :** 
    *    (無) 
*    **小變更/ Bug 修正 :** 
    * 臭虫修正:在EDD Table FromDatabase中,只有1.44版, ERDDAP™ 在 SQL 聲明中不适当地引用資料庫的表格名稱 。 已經修好了 多虧了凱文·奧布萊恩
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    *    ** 如果您不修改信件中的標準訊息. xml,
刪除 \\[ 湯姆卡 \\] / 內容/ erddap/ messages.xml 。 **   
預設信件. xml 檔案現在在 erddap 中 。 戰爭檔案, 不是 erddapContent .zip . 所以,你不再需要手動更新信件.xml.
    * 如果您真的修改信件. xml 中的訊息, 從現在起, 每次更新 ERDDAP™ ,或者:
        * 做你之前的改變到新的
             \\[ 湯姆卡 \\] /webapps/erddap/WEB-INF/class/gov/noaa/pfel/erddap/util/messages.xml.
有一次: 刪除 \\[ 湯姆卡 \\] / 內容/ erddap/ messages.xml 。
        * 或是找出新訊息的變化 (通过 diff) 修改
             \\[ 湯姆卡 \\] /content/erddap/ messages.xml 檔案相關 。

## 1.44版本{#version-144} 
 (2013-05-30年) 

*    **新功能 :** 
    * 查詢 EDD Table 資料集支援( C) orderBy 最小 (...) 和( R) orderByMinMax  (...)   (返回每組兩行,其中最小和最大為最後一行 orderBy 值) . 多虧了琳恩·德威特
    * 有兩個新人 tabledap 文件型態 : .nc CF 頭和 .nc CFMA 信头 (返回對應的 ncdump 類的頭目 .nc CF 和 .nc CFMA 文件型態) . 多虧了史蒂夫·漢金
*    **小變更/ Bug 修正 :** 
    * 臭蟲修正: 加載數據集的.graph和.html網頁時速很慢, 因為 ERDDAP™ 產生時光滑動選項時很慢 。 現在它總是很快。 多虧了邁克爾·巴里 歐西里 和克里斯蒂安·塞巴斯蒂安·布萊利德
    * 臭虫修正 : 在一些 EDDTable 數據集類型中, 時間限制的處理不總是正確的 。 現在是了 多虧了約翰·莫雷爾和凱文·奧布萊恩
    * 臭蟲修正: 數據集不會載入所有資料 subsetVariables 是固定值變數。 現在他們會的 多虧了琳恩·德維特和約翰·彼得森
    * 改善 : 現在所有對子集變數的查詢都像 & different () 是查詢的一部分。
    * 改善:現在, 包含 & .json pQX功能Name _, _ 功能 名稱_ 現在必須是 1 或以上的序列 (隔期) 字 每一個單詞必須從 ISO 8859 個字母或 "QQ" 開始, 然后是 0 或 更多 ISO 8859 個字母、 數字或 "QQ" 。 是的,這比 Java 文稿對函數名稱的要求 。
    * 圖片上的時間轴現在在更長的時間範圍內有效 (80-1000年) 和短時間範圍 (0.003 - 180秒) .
    *    ERDDAP™ 解析 ISO-8601 格式的時間數據的變數時, 更加寬恕 。
    * 還有很多小變更和錯誤修正 。
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    *    **您必須更新到最新版本才能安全 。**   
         ERDDAP™ 做了安全檢查 有一些蟲子和弱點 1.44版本包括若干重要的安全缺陷修正和若干變更,以增加安全和存取 (例如,失明者) . 1.44版通過了后续安全調查 多虧了USGS和Acunetix的好人 才有這個機會 (不應該 NOAA 要這麼做嗎?) 
    * 新的 [從 EDD 表格 WFS 文件](/docs/server-admin/datasets#eddtablefromwfsfiles) 做一個本地複製所有資料 ArcGIS 映射伺服器 WFS 伺服器,因此可以快速重新保存到 ERDDAP™ 使用者。 多虧了克里斯蒂·考迪爾
    * 新的 [從 EDD 表格 EDDGrid ](/docs/server-admin/datasets#eddtablefromeddgrid) 讓您從 : EDDGrid 數據集。 其共同原因是:
        * 這可以讓數據集被查詢 OPeNDAP 選擇限制 (使用者可能要求的) .
        * 數據集本身就是表格化的數據集 。 多虧了OOICI、Jim Potemra、Roy Mendelssohn
    * 可變名稱"深度"現在是"高度"的特殊替代品. 這些單位一定是"米"的變體 數據值必須是正數=下 。 ERDDAP™ 已經完全明白「深度」的意義, (例如, 作为 CF DSG 的元件 cdm\\_data\\_ type=profile 資料集) . 數據集不能有"深度"和"高度"變數 。
    * 在你的 datasets.xml 請移除任何用途。&lt;atname="cdm\\_altitude\\_proxy" &gt; 深度&lt;因為深度現在是海拔的特殊替代物 所以不需要特指
    * 在你的 datasets.xml 請移除任何用途。&lt;高度MetersPer source Unit &gt;, 除了 EDD 表格 從 SOS .
當值是 1 時, 就刪除它 。
當值為 - 1 時, 考慮將變數名稱變更為深度 。
其他值,加入&lt; addAttributes &gt; 例如:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * 所有數據集現在都支持
        
        *   &lt;預設的DataQuery&gt;, 如果要求. html沒有查詢, 則使用它 。
            * 你可能很少用這個
            * 對 gradap 數據集, 常用的是指定不同的預設深度或高度尺寸值 (例如, \\[ 0 \\] 代替 \\[ 上次 \\] ) .
不管怎樣,你總是要列出所有的變數, 總是对所有變數使用相同的維度值, 幾乎總是使用 \\[ 0 \\] , \\[ 上次 \\] ,或 \\[ 0: 最後 \\] 值。
例如:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * 為 tabledap 數據集,最常用的是指定不同的預設時間範圍 (相對於現在, 例如 &time&gt; = now- 1天) .
請記住, 不要求資料變數與指定所有資料變數是相同的, 所以通常您可以指定新的時間限制 。
例如:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;預設 GraphQuery &gt; , 如果需要. graph 卻沒有查詢, 則使用它 。
            * 你可能很少用這個
            * 对于格達普數據集,最常用的用途是指定不同的預設深度或高度尺寸值 (例如, \\[ 0 \\] 代替 \\[ 上次 \\] ) 和( 或) 指定要圖示特定變數 。
不管怎樣,你幾乎總是用 \\[ 0 \\] , \\[ 上次 \\] ,或 \\[ 0: 最後 \\] 值。
例如:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * 為 tabledap 數據集,最常用的用途是指定要圖示的不同變數,不同的預設時間範圍 (相對於現在, 例如 &time&gt; = now- 1天) 和/或不同的預設圖像設定 (例如, 標示型態) .
例如:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

記得你需要XML- encode 或%- encode (兩個都不行) 默认查詢, 因為它們在 XML 文件中 。 例如, & become & amp; amp; ,&lt;成為 &amp;lt; , &gt; 成為 &amp; gt; 。
請檢查你的工作。 犯錯很容易 卻得不到你想要的
多虧了查爾斯·卡爾頓 凱文·奧布萊恩 盧克·坎貝爾等人
    *    EDDGrid 從Dap, EDDGrid 來自 Erddap 和 EDD 表格 EDDGrid 有一個新的系統來處理經常變更的數據集 (通常大概每0.5秒) . 不像 ERDDAP 完全重新載入每個數據集的正常、积极主动的系統, 這個可選擇的附加系統有反應性 (由使用者要求啟動) 增量 (只是更新需要更新的信息) . 例如,如果向 EDDGrid 從 Dap 數據集中發生的數據比上次更新後指定的毫秒數多 , ERDDAP™ 查看左邊是否有新的值 (通常 "time" ) 維度, 如果是, 在處理使用者的要求前, 只需下載這些新值 。 這個系統非常善于保持快速變化的數據集的更新,對數據來源的要求很少,但以略微減慢一些使用者要求的處理為代价. 看&lt;更新 EveryNMILIS &gt; (/docs/server-admin/datasets#update Everynmillis / 更新所有資料)   
多虧了邁克爾·巴里和歐西里
    *    EDDGrid 從 NcFiles 、 從 NcFiles 的 EDD Table 和 從 NcCFFile 的 EDD Table 支援 [NcML .nc 毫升](/docs/server-admin/datasets#ncml-files) 取代來源檔案 .nc 文件。 多虧了何塞·布·罗德里格斯·魯埃達
    * 為 EDDGrid 總和的分量, ERDDAP™ 支援伺服器 Type = "dodsindex" 的新選項 。&lt; sourceUrl s &gt; 標籤。 這與在內部有檔案清單的網頁相關&lt;前一頁&lt;/pre &gt; 且常位于 OPeNDAP 標示。 一个例子是: [https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html) .
    * 用于 EDD 表格 SOS 現在支援可選的標籤
```  
        <sosServerType>_serverType_</sosServerType>  
```
所以你可以指定 SOS 伺服器 (所以 ERDDAP™ 不用想清楚) . 有效值&lt;_serverType_\\&gt; 是IOS\\_NDBC,IOS\\_NOS, OOSTethys 和WHI (新支持的伺服器 類型) . 看 [從 EDD 表格 SOS ](/docs/server-admin/datasets#eddtablefromsos) . 多虧了德里克·斯諾登和珍妮特·弗雷德裏克斯
    * 全部 EDDGrid 從... EDDGrid 复制 EDD 表格 复制支援可選的標籤
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
可以分辨 ERDDAP™ 要保存檔案 表 (包含每個來源資料檔的資訊) 在記憶體中而不是在磁碟上 (默认) . 在內存中保留檔案表可以加速對資料的要求 (特别是如果有 &gt; 1 000 原始資料檔) 但多用點記憶力 如果您將此設定為任何數據集的正則, 請留意記憶: 目前使用行數為 _ yourDomain_ /erddap/status.html 以确保 ERDDAP™ 還有很多自由的記憶 多虧了弗雷德里克·斯特萊
    * 從 ASCIIIFiles 中支持 EDD Table 。&lt;字符集 &gt; 。 最常用的两个字元 (案件敏感&#33;) 是ISO-8859-1 (默认) 和UTF-8。
    * 建議: 在設置. xml 內&lt;啟動 HeadHtml &gt;, 請變更&lt;html &gt; 成
        &lt;html lang= "en-US" &gt; (或不同的 [語言代碼](https://www.w3schools.com/tags/ref_language_codes.asp) 如果您已翻譯信件. xml) .
    * setup.xml 有新選項標籤可以禁用其中的部分 ERDDAP :
        *   &lt;轉換器&lt;/ 轉換符 &gt;&lt;&#33; - - 預設是真實的 - &gt;
        *   &lt;滑動&lt;/ 滑行&lt;&#33; - - 預設是真實的 - &gt;
        *   &lt;wmsAactive &gt; 假名&lt;/wmsActive &gt;&lt;─ 假設是真實的── 總而言之, 我們建議不要把其中任何一個放錯。
    * 產生達塔斯 Xml 現在將結果寫入_BigParrent Birdy_/logs/generateDatasetsXmlLog.txt,而不是log.txt。 多虧了克里斯蒂安·塞巴斯蒂安·布萊德
    * 產生達塔斯 Xml現在給了一個好建議&lt;重新載入 每一個NMinutes &gt;. 多虧了 NOAA UAF專案。
    * 產生 DatasetXml 的許多小改进 。 多虧了 NOAA UAF專案。

## 1.42版本{#version-142} 
 (2012-11-26年) 

*    **新功能 :** 
    *    (沒有新的主要功能。) 
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 如果你是升級自 ERDDAP™ 1.38或 1.40, 沒有需要您變更設定檔的變更 (但您必須使用新信件. xml 文件) .
    *    ERDDAP™ 再來一次 Java 1.6. ( ERDDAP™ v1.40 需要 Java 1.7。) 我們仍然強烈建議使用最新版本 Java 1.7。
    * 新的數據集類型, [從 EDD 表格 AwsXml 檔案](/docs/server-admin/datasets#eddtablefromawsxmlfiles) ,可以讀取自動天氣站的資料 (阿WS) XML 資料檔 。 多虧了琳恩·德威特 和探險家
*    **小變更/ Bug 修正 :** 
    * 調整到 NDBC 的變更 SOS 來源資料伺服器 。
    * 符合NOS COOPS ASCII服務的變更。
    * 做了一些小的變更和錯誤修正 。

## 1.40版本{#version-140} 
 (2012-10-25年) 

*    **新功能 :** 
    * 有新的輸出檔案格式 tabledap 數據集 : .nc CFMA, 將要求的資料儲存到 a .nc 符合 CF 的檔案 [分解采样](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 多元陣列選項, 因此符合 NODC 樣本 \\[ 2021年:現在 [NCEI 模板](https://www.ncei.noaa.gov/netcdf-templates)  \\] 以儲存此類型的資料。 多虧了NODC
    *    tabledap 要求現在可以包含時間限制, 例如( T) now- 5天 看 [文件](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) . 多虧了詹姆斯·戈斯林
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 如果你是升級自 ERDDAP™ 1.38, 沒有需要您變更設定檔的變更 (但您必須使用新信件. xml 文件) .
    *    ERDDAP™ 公共发布和内部里程碑可通过 [ ERDDAP™ 在 GitHub 上](https://github.com/ERDDAP) . 更多信息,参见: [維基](https://github.com/ERDDAP/erddap/wiki) 代表 ERDDAP™ 更一般 [ ERDDAP™ 程式指南](/docs/contributing/programmer-guide) . (此事是在 ERDDAP™ 1.38 釋放。) 
    * 產生達塔斯 Xml 已改进 。
        * 文稿已修改, 所以所有 Linux 電腦應正确工作 (不只是幾) .
        * 現在又加了 creator\\_name , creator\\_email 和 creator\\_url 只要有可能
        * 其他很多小改进。
    * 如何完善 ERDDAP™ 處理時間
        * 在內部, ERDDAP™ 現在以毫秒的精度處理時間 (不是秒) .
        * 您現在可以選擇指定給定數據集的時間精度, 看 [ time\\_precision ](/docs/server-admin/datasets#time_precision) . 例如, 您可以設定一個數據集, 用日期精度顯示時間值 。 (例如,1970-01-01年) .
        * 您目前的數據集會使用預設的設定, 所以它們不會受到這些變更的影響, 並且會繼續以秒的精度顯示時間 。 多虧了塞爾特·西茲梅利和菲利普·戈德斯坦
    *    [来自 NcCFF 的 EDD 表格](/docs/server-admin/datasets#eddtablefromnccffiles) 是您可以在您的 datasets.xml 文件。 它可以讀取由它定義的许多檔案格式中的數據 [CF 分解采样](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 公约。 多虧了NODC和特別的感謝 Kyle Wilcox 為大量有效的 DSG 檔案格式做樣本文件 以及公開提供
*    **小變更/ Bug 修正 :** 
    * 擴展了 [快速重啟](#quick-restart) 所有相關系統 EDDGrid 和 EDD Table 子類。
    * 改进文件,特别是如何使用 [网格](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType) 和 [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) 來自不同的客戶端軟體。
    * 變更前進搜尋支援 minTime 和/ 或 maxTime 表示為 epoctseconds 。 多虧了琳恩·杜威特
    * 已更改 .htmlTable 輸出以顯示 URLs 和電子郵件位址為連結 。
    * 新增"rel="和"rev="到相關&lt;a href &gt; 標籤。 多虧了帕特·卡佩萊爾 OGC   REST 專案。
    * 更能防范不切实际的大數據要求, tabledap 更困難的地方
    * 將更多信件移至信件. xml 。
    * 改速了
    * 固定 EDDGrid 從 Files 啟動下排的斧頭 。 多虧了馬里塞爾·艾切加雷
    * 已移除對 iGoogle 的引用, 因為它會被中止 。
    * 做了一些小的變更和錯誤修正 。

## 1.38版本{#version-138} 
 (2012-04-21年) 

*    **新功能 :** 
    * ISO 19115和FGDC - ERDDAP™ 可以自動產生 ISO 19115 和 FGDC XML 中繼資料檔。 每個數據集清單都可以看到與檔案的連結 (例如,從全文搜尋中) 和在網路可存取資料夾中 (瓦弗)   (看 [FGDC WPAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/) 和 [ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/) ) . 多虧了泰德·哈伯曼 戴夫·諾菲爾德 還有很多其他人
    * 完整文字搜尋數據集目前支援 \\ _ excludedWord _和\\___ 排除的短语__. 多虧了Rich Signell
    * 搜尋數據集時一次傳回一頁結果 。 默认使用參數字串: page=1 & itemsPerPage=1000, 但是您可以更改您要求的 URL 中的值 。 多虧了史蒂夫·漢金和UAF計劃
    *    OpenSearch -- ERDDAP™ 現在支援 [ OpenSearch 1.1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html) 搜索数据集的标准。 除其他外,這可以讓目錄汇总網站做分布式搜索 (將搜尋要求傳送至它知道的每個目錄) .
    * 逗號已分离 值 (CSV 磁碟) 文件 -- ERDDAP™ 現在產生 CSV 檔案, 只需要數值之間的逗號 (Excel喜歡的) ,而不是逗號+空格。 多虧了杰夫·德拉博賈迪耶爾
    * 百萬數據集... 为支持 ERDDAP 有很多數據集 甚至一百萬 多虧了史蒂夫·漢金和UAF計劃
*    **事情 ERDDAP™ 管理者需要知道和做:** 
#### 快速重新啟動{#quick-restart} 
*    [A](#quick-restart) 快速啟動系統 ERDDAP™ 以更快的速度重新啟動 。
     **請加入您的設定值. xml 檔** 之后&lt;/datasetsRegex &gt; :
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * 用 Lucene 搜尋引擎可以完成對數據集的完整文字搜尋 (雖然我們建議使用原始的搜尋引擎 如果你的數據集不足一萬個) 或原始搜索系統。
         **請加入您的設定值. xml 檔** 之后&lt;/ 播放分析信息 &gt; :
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * 在 setup.xml 中,你可以/應該在逗號分隔的清單中新增兩個類別&lt; categoryAttributes &gt; :
        * 全局: 關鍵字 (在全局: 機構之后添加) - 新增的特例, 從全局關鍵字屬性中解析以逗號分隔的關鍵字清單, 為每個關鍵字做一個單一的項目 。
        * 變數 姓名 (在尾部加入) 新的特例, dataVariable   destinationName s.
    * 在設定.xml,你可以 (為什麼?) 告訴 ERDDAP™ 不提供 FGDC 和/或 ISO 19115 任何數據集
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

這些設定值的預設值是真實的 。
    * 在 datasets.xml ,請考慮改善您的數據集的中繼資料。 ERDDAP™ 根據數據集的元数据,
所以 **良好的數據集元数据會導致好的 ERDDAP -生成ISO 19115和FGDC元数据。**   
         **參觀很多新建議的新文件 [全局屬性](/docs/server-admin/datasets#global-attributes) .** 
    * 在 datasets.xml 如果你想說的話 ERDDAP™ 以使用在伺服器檔案系統上某處的 FGDC 和/或 ISO 19115 檔案 ERDDAP™ 產生這些檔案, 使用 :
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
如果找不到檔案 _ fullFileName QQ” , 資料集將沒有 FGDC 和/ 或 ISO 19115 中繼資料 。 所以如果您要壓縮 FGDC 和/或 ISO 19115 中繼資料, 這也是有用的 。
    * 在 datasets.xml 所有人 EDDGrid 侧邊線和 EDDGrid 聚合 Dimension 数据集, 確保孩子的数据集有不同的 datasetID s 胜于父母的數據集,也胜于其他孩子。 (例如,你可以遵循喬治·福爾曼的 簡單而有效的系統 命名他的孩子們。) 如果家族中的任何名字完全相同, 數據集將無法載入 (與錯誤訊息, 集合轴的數值不排序) .
    * 在 datasets.xml ,對合法清單有一些變更 ioos\\_category 中繼數值 :
        * "pCO2"被修改为"CO2".
        * 新增"物理海洋学".
        * 增加了"土壤".
    * 在 datasets.xml , ERDDAP™ 不再允許 '.' in a datasetID . 它被允許,但是不甘心。 (抱歉) 
    * 在 datasets.xml ,從 Thredds Files 和 EDD Table 的設定 Hyrax 檔案稍有變化, 因為兩課都只是重寫, 以便更有效率 (現在兩課都將所有遠端資料檔做成本地版) . 建立這些課目的檔案: [從 EDD 表格 Hyrax 文件](/docs/server-admin/datasets#eddtablefromhyraxfiles) 和 [來自垃圾的 EDD 表格](/docs/server-admin/datasets#eddtablefromthreddsfiles) . 引文&lt;檔案「 Dir」 (現在不重要了) 和&lt; sourceUrl &gt; (現在很重要) . 而且,你不該把這個課程包在 EDDTable Copy 中,以提高效率。
    * 在 datasets.xml ,如果使用 EDD Table From Database Oracle 資料庫中,您需要包含連接 例如
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
指定要一次取取多少行的資料, 因為預設值是 10, 這太低效了 。 看 [ Oracle 文件](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm) . MySql 和 PostgreSQL 似乎對此設定有更好的預設值 。 多虧了凱文·奧布萊恩
    * 如果您使用 EDD Table From Database, 請參考改进的 ["Speed" 文件](/docs/server-admin/datasets#eddtablefromdatabase) 提高性能。 多虧了凱文·奧布萊恩
    * 在 datasets.xml 的數據集 Metadata\\_Conventions 全局屬性,請參考CF-1.6 (非CF-1.0、1.1、1.2、1.3、1.4或1.5) ,因為CF-1.6是第一個包含與 Discrete 采样几何相關的變更的版本。
    * 正在編譯程序 ERDDAP™ 代碼需要將 lib/ lucene- core. jar 加入他們的 javac 和 java 命令行路徑中的 bar 檔案清單 。
    *    ERDDAP™ 有 [新服務](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html) 將 CF 標準名稱轉換成/ 從 GCMD 科學關鍵字 。 當您產生全局性關鍵元資料時, 您可能會發現此有用 。 ERDDAP .
    * 處理 Bots -- 請讀此建議 [防止波斯人爬到你身上 ERDDAP™ 以愚蠢的方式](/docs/server-admin/additional-information#robotstxt) .
    * 翻譯 - 文字在 ERDDAP 現在的網頁大多以訊息. xml為主,因此适合翻譯到不同的語言. (例如,德文、法文) . 目前訊息常使用訊息格式化, 如果您想翻譯, 請用電子郵件 erd dot data at noaa dot gov .
    * 樣本 datasets.xml -- 樣本中有一些小但重大的錯誤 datasets.xml . 如果您使用這些數據集, 請從新樣本中取得新版本 datasets.xml 在新的 erddap 設定中 .zip 文件。 多虧了詹姆斯·威爾金森
    * 吉特... 我會盡力做到的 ERDDAP™ a GitHub 專案在發行後立即完成。
*    **小變更/ Bug 修正 :** 
    * 新的調色板 Ocean Depth 對深度值有用 (正值下降) ,例如,0 (浅) 至 8 000 (深) .
    * 其 .kml 輸出自 tabledap 使用更好的標示圖示 (不模糊) . 現在在標記上徘徊會變得更大
    * 檔案中的 EDD表... 在上次升級中, 新的Netcdf-java 圖書館對變數名稱有更严格的限制 .nc 文件。 如果變數是 EDD Table From Files 的, 這對 EDD Table 造成問題 sourceName 有一些突擊角色。 檔案的 EDD Table 已修改, 以避免此問題 。 多虧了托馬斯·霍科姆
    * . subset 頁面目前支持 0/10/100/1000/1000/1000000 而不是相關資料的复选框。 工具提示警告, 100 000 可能會令您的瀏覽器崩溃 。 多虧了安妮特·德斯羅赫斯 理查 (安倍) 和IOOS生物計畫
    * .../erddap/ info/_ datasetID _/index.html 網頁現在顯示 urls 和 email 地址為可點擊的連結 。 多虧了理查 (安倍) Coughlin和IOOS生物專案。
    * 臭虫修正: in tabledap ,用于具有高度的数据集 MetersPer 來源單位&lt;0,高度限制的查詢處理不正確. 多虧了凱爾·威爾科克斯
    * 臭虫修正 : EDDGrid 總和從目前的 DIMENSION 支持更多样化的 TDS 網址 。 多虧了你?

## 1.36版本{#version-136} 
 (2011-08-01年) 

*    **新功能 :** 
    * 使用者的觀點沒有重大的改變 。
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 常用作樣本的 pmelTao 數據集 tabledap   
不再有文件。 ERDDAP™ 管理員必須做這些變更 :
        * 在你的 datasets.xml 如果你有 datasetID ="pmelTao" 数据集,添加
作用中 = "假" 。
        * 在你的設定.xml,如果你&lt;EDD 表格示例 &gt; 那么是PmelTao,
            * 如果你 datasets.xml 沒有數據集 datasetID ="erdGlobecBottle",加上:
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * 在您的設定中, xml 取代所有標籤&lt;EDD 表格示例 &gt; 至
                &lt;EDD 表格 Matlab 圖片示例 &gt; 與
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * 在數據集中, 類型是 EDDTable FromFiles 的子類, 您可以從中繼資料中產生資料 。
特別是, 您現在可以從一個原始變數的屬性值中產生變數 。
例如,在 datasets.xml ,a&lt; dataVariable &gt; 標籤, 如果您使用
```
        <sourceName>variable:cruise:PI</sourceName>  
```
         ERDDAP™ 以游標變數的 PI 屬性值來做變數 。
多虧了WOD
*    **變更 :** 
    * 小變更

## 1.34版本{#version-134} 
 (2011-06-15年) 

*    **變更 :** 
    * 臭虫修正 : 修復某64位元發生的內存漏漏 Java 设施。
    * 臭虫修正 : ERDDAP™ 當纬度維度的值從高到低時,
        
注意: actual\\_range 不變: 它可能有低高值或高低值, 因為它旨在表示儲存的範圍和顺序 。
        
    * 小小的改變
    *    ERDDAP™ 管理員不需要修改他們的設定. xml 或 datasets.xml .

## 1.32版本{#version-132} 
 (2011-05-20年) 

*    **變更 :** 
    * 支持新批准的CF Discrete Sampling Gometeries (但不幸的是,) 取代拟议的 CF 點觀察公约。
         ERDDAP™ 使用者會看到 cdm\\_feature\\_ type=station 被 TimeSeries 取代, 為此建立的文件有小的變更 .nc CF 文件型態 (平方度現在叫做平方度) .
         ERDDAP™ 管理員需要在 datasets.xml :
        * cdm\\_data\\_%type=station 應更改為 cdm\\_data\\_%type=TimeSeries 。
        * cdm\\_data\\_%type=stationProfile 應更改為 cdm\\_data\\_%type=TimeSeriesProfile 。
        * Cdm\\_station 的變化應變為 cdm\\_times 的變化
        * Cf\\_role=station\\_id 應改成Cf\\_role=timesseriesid 。
    * 新建 ioos\\_category 選項 : “ 彩色溶解的有机物 ” 、 “ pCO2 ” 、 “ Stream Flow ” 、 “ 全部悬浮物 ” 。
    * 可能解決64位記憶體泄漏的辦法 Java . \\[ 沒用 \\] 
    * 小小的改變

## 版本 1.30{#version-130} 
 (2011-04-29年) 

*    **新功能 :** 
    * 64 位的支持 Java . 使用64位元時 Java , ERDDAP™ 現在可以使用更多堆積的記憶體 處理更多同步的要求
    * 支持 .nc 檔案要求最多 2GB (即使沒有64位 Java ) 通过更好地利用 ERDDAP 數據的處理
    * 代碼中很多 2X 速度的改善和 2X 速度的提高 Java 1.6 成 ERDDAP™ 2X到4X比以前快.
    * 內存儲存的改进大大降低 ERDDAP 基本內存用量 。
    * 表格数据集 ERDDAP™ 以及資料地圖對CDM型態的反應。 看 [CF 分解采样](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . 也許很快, Word 檔案會轉換成 . html , 並取代目前網站上的「 OBSOLETE 」 資訊 。 多虧了 NOAA UAF專案。
    * 對於大多數 EDDTable 資料集,新的輸出檔案類型選項, .nc CF, 建立相關的拉格陣列 .nc 符合最新版本的檔案 [CF 分解采样](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . 這些檔案的結構反映了資料集的CDM資料型態 。 自此, netcdf- java 文庫尚未支持讀取由 netcdf- java 建立的文件格式。 ERDDAP 並解讀為CDM 資料檔。 可能會很快的 多虧了 NOAA UAF專案。
    * 檢視 : 在 . subset 網頁上的分類資料選項, 現在是下拉清單, 讓使用者指定要檢視的分類資料的最大行數 (默认 = 1000) . 此變更和其他變更, 允許 ERDDAP™ 以與數據集合作 。 (任何單一變數的獨一數值仍是個問題, 但可能很高 (2萬?) 在 . subset 和其他網頁下載前, 速度非常慢 。) 多虧了 NOAA UAF專案。
    * . subset 網頁有新選項 : 檢視分別數據 。 多虧了GTOPP計畫
    * 幫助使用者, (例如,站名) 。 多虧了 NOAA UAF專案。
    * 透明 Png 要求現在支援所有類型的圖和資料顯示 。 它只是抽取數據, 沒有斧頭,傳說,土地掩蓋,或者其他什麼。 這讓影像成為透明 Png 的層次。 如果 &. 大小 & width _ | 查詢中指定的高度(_H) (推荐) 很榮幸 默认值為 360x360 像素 。 唯一的例外是 EDDGrid &. draw=表面, 默认位置 (和以前一樣) 是每個資料點 ~1/ 像素的影像 (最多3000 x 和 Y 像素) . 多虧了弗雷德·霍赫斯特
    * 其 WMS 網頁現在顯示數據集變數的顏色列 (s) . 多虧了埃米利奥·馬約加和其他人
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 此发布涉及很多變化. 他們都很重要 請耐心點,
    * 此版本的推出比預期的要早一些 Java 安全漏洞。 可惜, ERDDAP™ 版本不在此版本中 。 抱歉 希望下一版很快 (更容易升級到) .
    * 避免多個安全漏洞 Java 6 更新 23 及以下, 下載及安裝最新版本 Java   ( Java 6 更新24或以上) . 如果你有64位操作系統,請得到64位版本 Java .
    * 如果你使用Tomcat 5,你必須升級到Tomcat 6或7 (偏好) . 如果你在使用Tomcat 6, 考慮升級到Tomcat第七版.
    * 請遵守所有的指令 [建立新的 ERDDAP™ ](/docs/server-admin/deploy-install) ,但如果相關,您會將檔案從您的舊安裝中心复制到新的安裝中心, 主要是 \\[ 湯姆卡 \\] / 內容/ erddap 目錄與檔案 。 部分原因如下: [新的Tomcat 設定建議](/docs/server-admin/deploy-install#tomcat) .
    * 預設 erddap.css 已包含在 erddap. war 檔案中 。
        * 要使用預設的 erddap.css, **刪除** 你的老 \\[ 湯姆卡 \\] /内容/erddap/影像/erddap.cs.
        * 如果你修改 \\[ 湯姆卡 \\] /content/erddap/images/erddap.css,并想繼續使用它:只要放在原位上并取代&lt;輸入 &gt; 區段, 使用 :
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * 在你的 \\[ 湯姆卡 \\] / 內容/ erddap/ setup. xml :
        * 取代與&lt;部分要求MaxBytes &gt; 和&lt;部分要求MaxCells &gt; 與
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * 取代與&lt; categoryAttributes &gt; 并考虑修改標籤的值 :
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

個人&lt; categoryAttributes &gt; 現在是全局屬性, 必須透過全球前缀來辨識 : (例如,全球:机构) . 其他屬性被假設為可變屬性 (例如, standard\\_name ) . 此外,机构价值 (只有那些) 原案留下的 現在所有的類別數值都轉換成小寫 。
    * 在你的 \\[ 湯姆卡 \\] /内容/erddap/ datasets.xml :
        * 大改进: ERDDAP™ 有了與表格數據集的 cdm\\_data\\_類型相關的新要求 。 值得注意的是, MUST 每個數據集都有與 cdm% data%%%% 類型相關的正確的中繼資料與變數 。 如果不是, 數據集不會載入, 會丟出錯誤 。 查看文件 [cdm\\_data\\_型態](/docs/server-admin/datasets#cdm_data_type) .
        * 有新的數據集類型: EDDTable FromAsciiServiceNOS 。
        * 對了,有三個新允許的 ioos\\_category 選項 : 水學,质量 (例如,) 和統計 (例如,) .
        * 為 EDD Table 從... 檔案資料集, 移除任何&lt;nDimensions &gt; 標籤。 不再需要或使用。
        * 對有 destinationName 高度, ERDDAP™ 不再強迫 long\\_name 到海拔 請過一遍 datasets.xml 多次搜索&lt; destinationName &gt;海平面和加入變數&lt; addAttributes &gt; :
```
              <att name="long\\_name">Altitude</att>  
```
             (或稍有不同 long\\_name 特殊情况) .
        * 選擇性: 所有 EDD Table 從檔案子類別支援變數 [ sourceName 全球:...](/docs/server-admin/datasets#global-sourcenames) 將每個檔案的全局中繼資料轉換成數據變數。 多虧了琳恩·德威特
    * 數據庫使用者的 EDD Table -- ERDDAP™ Postgres 的新 JDBC 4 驅動程式 。 其它數據庫, 請檢查您的數據庫最近的 JDBC . jar 檔案的網頁 。 自 ERDDAP™ 現在使用 Java 1.6+, JDBC 4 (不是3) 可能會被推薦
    * 略知
        *    EDDGrid 從... 從... 檔案資料集現在將檔案表格資訊儲存在
             \\[ 大家长會 \\] / 數據集 信息/ \\[  datasetID  \\] /\\* .nc 文件。
另外, EDDTable 資料集現在將子集資訊儲存在
             \\[ 大家长會 \\] / 數據集 信息/ \\[  datasetID  \\] /\\* .nc 文件。 這些檔案以前是
             \\[ 大家长會 \\] / 數據集 信息/ \\[  datasetID  \\] ._______________________________________________________ .json 文件。
舊檔案會在 ERDDAP™ 開始 或者,你可以刪除所有的檔案 (但留下空的子目錄)  in \\[ 大家长會 \\] /datasetInfo/. (原始内容存档于2017-03-09).
        * 我研究了一個新的 EDD Table FromNcCFFiles , 它會用拟议的新的 CF 點觀測常规來讀取本地和遠端檔案的資料。 但這不是發布的 在Netcdf-java文庫中, 對於拟议的CF點觀察公约, 當Netcdf-java圖書館固定並更新最新建議後,
        * 執行 ERDDAP™ 在 Windows 上可能有問題: 特別的是, 您可以在 \\[ 大家长介面/ logs/log. txt 文件 ERDDAP™ 有時無法快速刪除和/或重命名檔案。 是因為防病毒軟體 (例如,McAfee和Norton) 是檢查病毒的檔案 如果你碰到這個問題 (可以從log.txt 檔案的錯誤訊息中看到, 如“ 無法刪除... ”) 改變抗病毒軟體的設定,
如果 ERDDAP™ 在 Windows 中, 這是在您的桌面上進行的測試, 這只是一個煩惱 。
如果 ERDDAP™ 在 Windows 中是您的公開 ERDDAP™ ,考慮切換到 Linux 伺服器 。
    * 慢速第一次啟動... 你第一次跑 ERDDAP™ 升級後, ERDDAP™ 裝入數據集可能很慢 。 路 ERDDAP™ 儲存相集檔案的資訊已變更, 所以 ERDDAP™ 需要重新讀取所有檔案中的一些信息。 這需要時間。
    * 啟動時出錯... 根據 cdm\\_data\\_%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 注意讀取每日報告電子郵件 ERDDAP™ 送您到 ERDDAP™ 已開始 。 它會有沒有載入的數據集清單 (在最上面) 以及他們不載貨的原因 (靠近底部) .
    * 如果你被卡住或有其他問題, erd.data at noaa.gov .
    * 程序员 -- 如果你寫 Java 執行的程序 ERDDAP™ 代碼, 您需要變更一些命令行參數參數 :
        * 把Joda -time -1.6.2.jar改成Joda -time。 罐
        * 變更 Postgres JDBC. jar 參考 postgresql.jdbc. jar
*    **小變更與臭蟲修正 :** 
    
    * 改善連接處理以避免掛線 。
    * 改善货币做法,以便更有效地处理几乎同时提出的相同要求。
    *    ERDDAP™ 現在使用 netcdfAll 4.2. jar (重新命名為 netcdfAll-latest 。 罐) . 此切換需要若干次內部變更, 也引起一些小的外部變更, 例如: grib 檔案如何讀取的變更和小的變更 .nc 信頭輸出 。
    * 新功能 : \\[ 厄德達普 \\] / 轉換/ fipscounty.html 轉換 FIPS 郡名的代碼
    * 在地圖上, 州界現在是黑暗的紫羅蘭,
    * 表格 .kml 輸出時再次使用圓形圖示標示點 (不是飛機圖示 谷歌最近切換到) .
    * erdCalcofi 數據集已重排, 現在從本地檔案中傳送 (更快) .
    * 產生達塔斯 Xml 從 項目 Catalog 正在建立結果檔 :
         \\[ 湯姆卡 \\] /webapps/erddap/WEB-INF/temp/ 網頁 EDDGrid 來自ThreddsCatalog.xml。 多虧了凱文·奧布萊恩
    * 產生達塔斯 Xml 從 項目 Catalog 正在試圖從源碼網址移除不必要的連接埠號碼 (例如:8080和:8081) . 多虧了 NOAA 中央的保安隊
    * 對於 . subset 網頁, 分別資料地圖現在有可變的 lat Lon 範圍 。
    * 若干列表 ERDDAP™   (例如,顯示所有数据集的表格) 在A. Z. .z . 現在他們以不敏感的方式排序
    * 包括: 單位已顯示 。
    * 產生達塔斯 Xml 和 DasDds 若無法將結果放入系統剪貼板或顯示在 InBrowser 上, 就不再丟出例外 。 多虧了埃里克·布里奇和格雷格·威廉姆斯
    * 臭虫修正 : 當數據集被載入時, ERDDAP™ 現在移除或調整地理空间全局屬性。 多虧了查爾斯·卡爾頓
    * 臭虫修正: string2. getClassPath () 現在正确解碼課程% 路徑 (显著的是, 在 Windows 上, 文件名中的空格出現於% 20) . 影響 ERDDAP™ EDStatic 呼叫 SSR. GetContext Birectory 。 () 找到內容/erddap。 多虧了安倍·考夫林
    * 臭蟲修正: 在 EDD Table FromFiles 中, 需要取得 DataForDapQuery 不同處理 () 要求。 多虧了埃里克·布里奇
    * 臭虫修正 : tabledap 當數據集的高度時, 要求無法妥善處理高度限制 MetersPer 資源單位是 -1. 多虧了埃里克·布里奇
    * 臭虫修正: EDD Table from... 檔案數據集正在正确處理包括 = NaN 和 = NaN 的要求 。
    
## 1.28版本{#version-128} 
 (2010-08-27年) 

*    **新功能 :** 沒有
*    **事情 ERDDAP™ 管理者需要知道和做:** 沒有
*    **臭虫修正 :** 修正程式錯誤 (只在1.26年) 使 ERDDAP™ 非常慢
     

## 1.26版本{#version-126} 
 (2010-08-25年) 

*    **新功能 :** 沒有
*    **事情 ERDDAP™ 管理者需要知道和做:** 
    * 從你的 \\[ 湯姆卡 \\] / 內容/ erddap/ setup. xml,
        * 在&lt;合法 &gt;, 在下面的新線上 \\[ 標準 資料大小 \\] 插入 \\[ 標準接触 \\] . \\[ 標準接触 \\] 指&lt;adminEmail &gt; 在 setup. xml 中指定更高 。
        * 移除&lt;表格CommonBGColor &gt; 和&lt;表格
        * 建议: 更改&lt;尾端BodyHtml &gt; 至
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * 需要 : 敬你 \\[ 湯姆卡 \\] /content/erddap/images/erddap.cs和erddapAlt.cs,在底部添加:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **臭蟲修正與小變更 :** 
    
    * Bug 修補: 在某些情況下, 表格在一些版本的Internet Explorer 中行不通 。 多謝格雷格·威廉姆斯
    * 臭虫修正 : 如果數據集是遠端的, Make A Graph 按鈕就沒有用 ERDDAP .
    * 臭虫修正 : WMS 如果數據集來自遙控器, 有時會不起作用 ERDDAP .
    * 很多小變更和錯誤修正 。
    

## 1.24版本{#version-124} 
 (2010-08-06年) 

*    **新功能 :** 
    * 新建 [子集網頁](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html) 使用面部搜尋來選擇表格数据集的子集 。 多虧了POST
    * 新建 [高级搜尋](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html) 整合所有其他搜尋選項, 并加入經度、 經度、 經度、 定時框 。 多虧了艾琳蒙哥馬利 (抱歉耽誤了) 
    * 新建 [轉換時間](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) 網頁與服務讓您將數字時間轉換成/從 ISO 字符串時間 。
    * 新建 [轉換單位](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) 網頁與服務讓您轉換 UDUNITS 到/從UCUM單位。 多虧了 NOAA iOOS SOS .
    * 如果a tabledap 要求包括單位( U) ((UCUM)) ,單位名稱將從原名轉換 (通常 UDUNITS ) 至 [城市](https://unitsofmeasure.org/ucum.html) 單位名稱。 這只影響單位\\*姓名\\*值。 多虧了 NOAA iOOS SOS .
    * 改善圖片網頁、圖和地圖:
        * 如果圖是地圖, 就會有新增的 Make A Graph 按鍵來縮放 。 並有新的選項可以點擊以改變地圖的中心點 。 多虧了POST
        * 在底部附近新增了過过滤器設定值 。 多虧了格雷格·威廉姆斯
        * 已更新到 GSHHS v2.0 。 多虧了POST
        * 現在的地圖包括湖泊和河流。 多虧了POST (抱歉, 萨克拉門托河三角洲失蹤了, 因為海岸线數據和湖泊/河流數據集都不處理它。) 
        * 以 pscoast 產生的國家/ 國家檔案建構的檔案已更新 。 多虧了POST
        * Topography.cpt稍作修改. (如果這對你不利的話,抱歉) 多虧了POST
        * 在網格dap's Make A Graph中,如果使用者改變變數,表格會自動重新提交,以便 axisVariable s' showSartAnd stop 總是反映圖形變數。 多虧了華金·崔南
        * png 和 pdf 影像網址 :
            * 新增 &. land%% 值_, 其中 _ 值_ 可以是「 under 」 (顯示地形) 或者"完" (只要顯示水深) . 如果未指定, 預設值由 [ drawLandMask ](/docs/server-admin/datasets#global-drawlandmask)  in datasets.xml 或設置.xml. 多虧了POST
            * 新增: 傳說中的行太長會自動分解成多行 。 多虧了POST
        * png 影像網址 :
            * 新增 &. legend_ value_, 其中 _ value_ 可以是 Bottom 。 (預設) "Off"或"Only". 這會讓你加入傳奇 排除傳奇 或者只得到傳奇 多虧了卡拉·威爾遜
            * 新建 &. trim=_n 像素_ 離開 n 像素的邊框 (例如,10) 在影像底部。 它在 .legend=Off 之后使用。 多虧了卡拉·威爾遜
            * 新建 &. 大小 & width_ | _height_讓您指定影像的寬度和高度, 以像素為單位 。
    * 新增輸出檔案格式 :
        * .csvp和 .tsv p -- 如.csv和 .tsv ,但与 " (單位(_U)) 第一行的列名附后。
        * odvTxt - 制作一個.txt檔案,以簡化資料輸入 [海洋資料 查看 (ODV) ](https://odv.awi.de/) .
        * .esriCsv - 制作适合匯入 ESRI 的 .csv 檔案 ArcGIS . (只有表格数据集) 多虧了楊·梅森 杰夫·德·拉·博賈迪耶爾 NOAA iOOS SOS 專案。
    * GUI 改进 [分类](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html) 网页。 另外, (机构以外的) 現在都是小寫。 接受非小寫要求 (重新定向) 反向兼容性。 多虧了羅伊·門德爾索恩
    * 錯誤訊息現在更短, 更面向使用者 。 多虧了格雷格·威廉姆斯
    * 內在變化 大大減少 ERDDAP 基本內存用量 。
    * 許多只與 POST 專案相關的新功能。
*    **事情 ERDDAP™ 管理者需要知道和做:** 有很多變化 抱歉 但每個人都有好處
    * 生成 DatasetXml 的大變更──它現在常常會問更多的問題 (參考 [数据集 類型](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) 信息) 而現在總會產生 基本上可以隨時使用的內容 datasets.xml . 你還是負責設計的 所以你還是應該看看 datasets.xml 包含在使用前。 人投入工程總比電腦程序做得更好。 多虧了UAF計劃
    * 在設定.xml中,您必須修改 WMS 章次 應該包括這些標籤 (但隨意改變價值) :
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * 在設定. xml 中, 复制並貼上此新建議&lt;啟動 HeadHtml &gt; 以取代您的舊版本 。 但可以隨意改變你的喜好
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

多虧了POST,漢斯·維多和瑞克·布萊爾
    * 在設置.xml, 在&lt;啟動BodyHtml &gt;,變更&lt;body &gt; 標籤只是&lt;body&gt;, 因為目前的樣式由 erddap. css 設定 。
    * 在設定. xml 中, 更改為此&lt;尾端BodyHtml &gt; (但將電子郵件位址變更為您的電子郵件位址, 並可以隨意做其他變更) :
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * 高度建议:在设置.xml中,建议&lt;描述 Html &gt; 已存在
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

特别是第一段最后一句。
    * 在設定. xml 中, mail everything To 和 mailDaily Report 現在可以成為以逗號分隔的電子郵件地址列表 。 第一個電子郵件 要特殊, 例如, 訂閱 EDDXxxxx FromErdddap 數據集使用電子郵件位址 。 多虧了約翰·莫雷爾
    * 郵件錯誤已登入 \\[ 大家长會 \\] /logs/emailLogYYY-MM-DD.txt檔案.
    * 在 setup.xml 中,有一個新的可選參數設定電子帳號屬性( 通常是在之後)&lt;emailPassword &gt; :
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

預設不是什麼 多虧了Rich Signell
    * 需要: 如果您使用 EDD Table Copy 或 EDDGrid 收到,你必須全部去除 \\[ 大家长會 \\] / 副本/ 目錄和檔名中包含「 xh」 的檔案在停止舊檔名後 ERDDAP™ 新的 ERDDAP™ 所以那些文件會被重印 非常抱歉 但改變很重要 希望它能影響到少數管家和檔案
在 Linux 中, 您可以用 cd 找到這些檔案 \\[ 大家长會 \\] 副本
找到...\\*十日\\*  
您可以在 Windows 中找到這些檔案, 啟動 | 搜尋
您要搜索什么: 文件
文件名的全部或部分: xh
查看: 瀏覽 - &gt; \\[ 大家长會 \\] 副本
點擊「 搜尋 」
^A 選擇全部
刪除全部
    * 內部 datasets.xml , 对于 EDDTable FromDatabase 資料集, 对于日期和時間戳變數, 變更資料 自1970-01-01T00:00Z起,打成雙倍,單位成秒。 我們要求你在數據庫中儲存時間戳數據\\*與\\*時區 。 沒有時區資訊, 這些查詢 ERDDAP™ 傳送至數據庫及結果 ERDDAP™ 從數據庫中通過 JDBC 是模糊的,很可能是錯的。 我們試過,但找不到可靠的方法 處理"時區不時區"的資料 我們覺得這是好做法 畢竟,"時區沒有時區的時區"的資料有暗示的時區. 雖然對數據庫管理者來說時區是明顯的, 謝了 抱歉 邁克爾·厄岑
    * 高度建议: datasets.xml ,要啟用 .subset 網頁來面部搜尋您的表格數據集, 您需要新增 [&lt; subsetVariables &gt;] (/docs/ server-admin/ datasets# subsetables 變化) 到數據集的全局屬性。
    * 建议: datasets.xml ,如果您有數據集 datasetID ="pmelGtsppp",請修改為:
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * 建议: datasets.xml ,有新的有效選項&lt;cdm\\_data\\_% type&gt;] (/docs/ server-admin/ datasets#cdm_data_類型) 全局屬性, 因此您應該檢視/ 變更您的數據集的值 。
    * 在 datasets.xml ,新的&lt;源碼( E) (/docs/server-admin/datasets#來源需要性pandedfp_eq) 如果源碼伺服器不持續處理QQvariable_ value_ 測試正確的話, 會有幫助 (因為 [測試浮點數的等效性的一般困難](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) ) . 源碼需求 預設為真 (最安全的地方) ,所以你不需要做任何改變。
    * 新建 [Ascii 檔案中的 EDD 表格](/docs/server-admin/datasets#eddtablefromasciifiles) . 多虧了杰瑞云潘
    * 新建 [來自垃圾的 EDD 表格](/docs/server-admin/datasets#eddtablefromthreddsfiles) . 多虧了羅伊·門德爾索恩
    * 更改至 [NcFiles 的 EDD 表格](/docs/server-admin/datasets#eddtablefromncfiles) 讓它與更广泛的檔案一起使用 。
    * EDD Table From BMDE 已關閉 。 已經沒有可用的 相當的資料來源 。
    * 在生成DatasetXml中,新的 EDDGrid 從垃圾 收割THREDDDS全集 (或子集) 生成 datasets.xml 內容。 多虧了UAF計劃
    * 產生達塔斯 Xml 與 DasDds 也將結果放入 \\[ 大家长會 \\] /日志/log.txt. 多虧了瑞奇·辛吉爾和查爾斯·卡爾頓
    * 登入系統的许多改进 。 多虧了POST
*    **事情 ERDDAP™ 程序员 需要知道和做:** 
    * /WEB-INF/lib/ 目錄有變更 。 請改變您的 javac 和 java 類型的設定 。
    * 有新的 \\[ 您 網址 \\] /erddap/version 服務以決定一個版本 ERDDAP . 答复是文本,例如: ERDDAP =1.24 如果您收到 HTTP 404 不成立錯誤訊息, 請處理 ERDDAP™ 作为1.22或以下版本。 多虧了POST
*    **小變更與臭蟲修正 :** 
    
    * 從 EDD 表格 群變 :
        * 讀取 IOOS 已丟棄支援 SOS XML 回复 。
        * 新增讀取 IOOS 的支援 SOS 文本/csv。 (所以不 SOS 伺服器目前不支援 。) 
        * 做了很多與IOOS相關的變更 SOS 伺服器細節 。
        * 新增對 IOOS 的 BBOX 查詢支援 SOS 和 OOSTethys   SOS 伺服器。 這些變更讓相關的數據要求速度大增。 多虧了IOOS SOS .
    * 文字在 .mat 表格資料檔案已儲存正確 。 多虧了羅伊·門德爾索恩
    *    WMS 
        *    OpenLayers 已捆綁 ERDDAP™ 用于 WMS 网页。 這解決了當 OpenLayers 避免未來的問題。
        * 在 WMS   GetCapabilities 答复,&lt;網路來源 &gt; 值現在為 WMS 服務。 多虧了查爾頓·加爾瓦里諾
        * 傳奇顯示在 WMS 顯示顏色列的網頁。 多虧了埃米利奧·馬爾赫加
    *    EDDGrid 共組化 Dimension 建構器有問題, 如果 轴源 價值與目的地不相等 值,例如,如果來源時間不是 "seconds since 1970-01-01" . 多虧了 Todd 斯賓德勒
    * 在 tableWriterGeoJson 中, bbox 之后的過量 '' \\[ ... \\] 已移除。 多虧了格雷格·威廉姆斯
    * 很多小變更和錯誤修正 。
    
## 1.22版本{#version-122} 
 (2009-07-05年) 

* 在 1. 20 引入的 SlideSorter 錯誤已固定 。
* 1 20 引入的 OBIS 臭蟲已固定 。
* 影像/ gadgets/ GoogleGadgets 頁面上提及 Jason 的資料集已被移除 。
     
## 版本1.20{#version-120} 
 (2009-07-02年) 

*    ERDDAP™ 管理員們, 請加入您的設定. xml 檔 :
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* 新數據集類型 [ EDDGrid 复制](/docs/server-admin/datasets#eddgridcopy) 和 [EDD 表格](/docs/server-admin/datasets#eddtablecopy) 制作并維持另一個本地副本 EDDGrid 或 EDDTable 資料集中的資料, 並提供本地副本中的資料 。 它們很容易用 而且非常有效 **解答遠端資料來源提供數據的最大問題:** 
    
    * 從遠端資料來源存取資料會很慢 (种种原因) .
    * 遠端數據集有時不可用 (再一次,有种种原因) .
    * 依靠一個來源來取得數據,不是很好 (例如,很多使用者和很多使用者 ERDDAP 利用它) .
    
本地版是原作的備份,
    
做一個本地數據集的複製沒有什麼新發現。 新的是,這些班級都來了\\*容易\\*建立和\\*維持\\*本地資料副本\\*品种\\*遠端資料來源的類型和\\*新增中繼資料\\*复制資料。
    
這些數據集類型是一套完整的功能的一部分,可以简化建立 [网格/群組/ ERDDAP s](/docs/server-admin/scaling) 以處理很重的负荷 (例如,在数据中心) .
    
* 新數據集類型 [數據庫中的 EDD 表格](/docs/server-admin/datasets#eddtablefromdatabase) 從本地或遠端數據庫表格中取得資料 。
*    ERDDAP™ 現在有了 [安全](/docs/server-admin/additional-information#security) 支援認證的系統 (讓使用者登入) 和批准 (允許他們存取某些私人數據集) .
* 有 [2, 新的命令行工具](/docs/server-admin/datasets#tools) 幫助 ERDDAP™ 管理員產生 XML 供在 datasets.xml :
    * 產生達塔斯 Xml 可以為幾乎任何類型的數據集產生一個簡略的数据集 XML 草稿 。
    * DasDds 幫助您多次測試並完善 XML 数据集 。 ERDDAP 產生代碼 Xml 網頁已移除 。 由于安全原因, 他們只支援數個數據集類型 。 新的命令行工具是更好的解決方法 。
* 新的 [狀態頁面](/docs/server-admin/additional-information#status-page) 讓任何人 (但主要是管理者) 檢視 ERDDAP™ 從任何瀏覽器中傳到 \\[ 基底Url \\]  /erddap/status.html .
* 表格已支援 [伺服器端功能](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions) :
    * 模糊( D) () 從回應表移除重复的行,
    * 切斷( R) orderBy  (...) 請指定如何排序回應表,
    * 切斷( R) orderByMax  (...) 讓您指定如何排序回應表格,並移除所有行,但最后一列中最大值的行除外。 例如,這可以被用來取得每個站的最後數據。
* 表格數據集現在可以包含更多未命名的日期時變數 "time" . 這些變數被他們的「 單位」 中繼資料所認識, 必須包含 " since "   (數字日期 時間) 或"YY"或"YY" (格式化字串日期) . 但請繼續使用 destinationName   "time" 主日期 時間變數 。
*    ERDDAP™ 現在產生一個 [sitemap.xml](/docs/server-admin/additional-information#sitemapxml) 檔案, 它告訴搜索引擎, 您的 ERDDAP 每個月都要爬起來 ERDDAP™ 管理員,請跟蹤 [這些指令](/docs/server-admin/additional-information#sitemapxml) 以通知搜索引擎新的 sitemap.xml 檔案。
*    ERDDAP 錯誤訊息現在要短得多, 并符合客戶端 (不是程序員) . 多虧了格雷格·威廉姆斯
* [&lt;要求Blacklist &gt;] (/docs/server-admin/datasets# 要求黑名單) 現在也支持 IP 位址, 其中最後的數字已被 QQ 取代 。
* 要求 .json 和... geoJson 檔案目前可能包含可選項 [jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/) 新增「 & 」 .json pQX功能Name_" 到查詢尾端 。 基本上,這只是告訴 ERDDAP™ 要加入“ _功能Name _ (" 至答复的起始和 ") " 答复的末尾。 如果最初沒有查詢, 請不要在查詢中寫上「 & 」 。 多虧了格雷格·威廉姆斯
* 新增數據數據 [每日報告](/docs/server-admin/additional-information#daily-report) .
* 在有數據集清單的網頁上, 將訂閱和其他更有用的列移到窄的電腦螢幕上查看 。
* 在所有的網頁上,頁面的標題(基于&lt;標題 &gt; 在&lt;啟動您在設定. xml 中定义的 HeadHtml &gt; , 以包含對網頁更好的描述 (例如,包含目前的數據集的標題和機構) .
* Xmx資訊已與log.txt、每日報告及狀態. 多虧了艾琳蒙哥馬利
*    ERDDAP™ 具有防所有錯誤的附加一般用途 (例如, 失憶錯誤) . 多虧了查爾斯·卡爾頓
* 已執行回應的錯誤處理改善 。
* 改进: Files和EDD表 EDDGrid 從檔案開始,只要允許&lt;中繼資料來源&gt; 第一個或最後一個 。 倒數第二不再支持。 第一個也是最後一個 都根據了最後的檔案
* 臭蟲修正: 在 EDD 表格中 SOS , 一個站點的無效資訊會丟出一個例外, 导致整個數據集被拒絕 。 現在,那些車站被忽略了 (而錯誤訊息已被登入 log. txt) . 多虧了里克·布萊爾
     

## 1.18版本{#version-118} 
 (2009-04-08年) 

* Bug 修正: 從 1. 14 開始, EDDTable 資料存取表和 Make A Graph 網頁並未妥善處理引用的限制 。
* 臭蟲修正: 從1. 14 開始, EDD Table FromDapSequence 不正确處理時間限制, 如果來源時間單位不是"自1970-01-01T00:00起的秒" 。
     

## 1.16版本{#version-116} 
 (2009-03-26年) 

*    ERDDAP™ 管理者 :
    * 這很重要的釋放 因為它修復了一個留下了 ERDDAP™ 使用 Tomcat 管理器停止/ 啟動或重新載入 。 ERDDAP . 所以當你安裝1.16的時候 不要只用Tomcat經理來解開舊的 ERDDAP™ 部署新的 ERDDAP . 相反: **不部署老的 ERDDAP™ 重新啟動 Tomcat (或伺服器) ,然后部署新的 ERDDAP .** 在安裝新版本時,
    * 請添加 [&lt;要求黑色列表 &gt;&lt;/ 要求黑名單 &gt; ] (/docs/server-admin/datasets# 要求黑名單) 敬你 datasets.xml . 這可以指定要封鎖的客戶端 IP 位址清單 (例如,抵擋拒絕服務攻擊或過份熱心的網路機器人) .
* 現在有了 \\[ 大家长會 \\] / 紀錄目錄以持有 ERDDAP™ 日志文件。 當你開始的時候 ERDDAP™ ,它會提供log.txt和log的存档副本。 txt. 先前有時間戳的檔案 。 如果在重新啟動前有麻煩, 分析這些檔案可能有用 。
*    ERD 是 ERDDAP™ 現在啟動了訂閱系統
*    ERDDAP™ 再一次允許 (但還是不建議) 要求 URL 中的 "% 26" 編碼 (看 [v1.14 更改](#percent26) ) .
* 數個新增的 Tally 部分 [每日報告](/docs/server-admin/additional-information#daily-report) .
* 產生 DatasetsXml 中的小錯誤修正 。
* 几小虫修.
     

## 1.14版本{#version-114} 
 (2009-03-17年) 

* 使用者變更 :
    * 在網格數據要求中, ERDDAP™ 現在支援 : [最后-n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last) 其中n是索引的整數, [ (最后-d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses) D 是數值的地方 (等一等 等一等) .
    * 在表格數據要求中, 字符串限制現在需要 [雙引號](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings) 例如, &id=“NDBC40121” 這是需要的 DAP 程序。
    * 在表格中, ERDDAP™ 現在要求 [所有限制都正确編碼%](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode) . 瀏覽器自動做, 所以這主要會影響正在存取的電腦程式/標籤 ERDDAP .
#### 百分比26{#percent26} 
*    [前身](#percent26) 该 [嵌入圖形網頁](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html) 和 [ ERDDAP™ Google Gadget 網頁](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html) 以% 26 取代影像網址中的「 & 」 。 從現在起, 您應該用「 & amp; 」 取代影像網址中的「 & 」 。 您需要將已有的網頁中的% 26 以及 Google Gadgets 取代為「 & amp; 」 。 (抱歉) 
*    ERDDAP™ 管理者, 請 :
    * 在您的 [設定. xml](/docs/server-admin/deploy-install#setupxml) 文件 (改變旗子 金鑰值) :
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * 之后的線上&lt;在您的電子郵件使用者Name [設定. xml](/docs/server-admin/deploy-install#setupxml) 文件,添加
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
并輸入您真正的密碼。
    * 你可以改變&lt;wmsSampleBBox &gt; 在您的中 [設定. xml](/docs/server-admin/deploy-install#setupxml) 包含經度值至360的檔案,例如,
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * 在你的 datasets.xml 檔案, 將數據集類型 EDD Table 從 Nc4DFiles 重命名為 NcFiles 的 EDD Table (它現在支持任何維度的檔案) . 如果您有來自 Nc4DFiles 的 EDD Table 資料集 :
        
        1. 您必須在您的數據集中更改為「 EDDable From NcFiles 」 。 XML 檔案 。
        2. 你必須加上一個&lt;n dimensions &gt; 4&lt;/nDimensions&gt; 資料集 XML 的標籤 。
        3. 你可以加入新的&lt;排序 FillesBy SourceNames &gt; 標籤以指定檔案的內序, 以決定返回資料的总序 。
        
详见 [檔案中的 EDD 表格](/docs/server-admin/datasets#eddtablefromfiles) .
    * 在过去,為 EDD Table From DapSequence OPeNDAP DRDS 伺服器, 以 datasets.xml 我們用過&lt;源碼Can 限制大小&lt;/ sourceCan constringRegex &gt;. 但現在我們看到DRDS regex的支持比 ERDDAP 所以我們建議&lt;源碼CanControlingsRegex &gt;&lt;/ sourceCan constrainStringRegex &gt; , 以免 regex 限制被傳送到來源, 而是由 ERDDAP .
    * 源碼CanControl的更新處理...  in datasets.xml 由 [從 DapSequence 的 EDD 表格](/docs/server-admin/datasets#eddtablefromdapsequence) 和 (内部) 所有 EDDTable 数据集類型。 新系統更簡單, 您可能需要修改您的數據集的 XML 。 datasets.xml .
* 有一些新的功能是有用的,但如果加以合并,也有利于建立 [网格/群組/ ERDDAP s](/docs/server-admin/additional-information#grids-clusters-and-federations) .
    * 新的数据集類型 :
        *    [ EDDGrid 來自 Erddap](/docs/server-admin/datasets#eddfromerddap) 和 [EDD 表格來自 Erddap](/docs/server-admin/datasets#eddfromerddap) 其中之一 ERDDAP™ 包含從另一個資料集 ERDDAP™ 非常簡單和高效
        *    [ EDDGrid 從檔案](/docs/server-admin/datasets#eddgridfromfiles)   (及其下属, [ EDDGrid 來自 Nc 檔案](/docs/server-admin/datasets#eddgridfromncfiles) 能讀的 NetCDF   .nc ,GRIB grb,和 HDF   .hdf 文件) .
        *    [NcFiles 的 EDD 表格](/docs/server-admin/datasets#eddtablefromncfiles) 能讀的 NetCDF   .nc 它有桌形的結構
    * Run LoadDatasets 和 LoadDatasets 已修改,以便 ERDDAP™ 對基于檔案的重新載入數據集非常有反應 [旗號](/docs/server-admin/additional-information#flag) 目錄( 通常&lt;5 秒, 如果目前完成主載重 Datasets ) 。
    * 允許的新服務 [建立國旗檔案的網址](/docs/server-admin/additional-information#set-dataset-flag) 例如,
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
建立 rPmelTao 的旗下檔案 (雖然旗子 鑰匙錯了) .
    * 新建 [訂閱](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) 服務使任何客戶端都能指定在建立特定數據集時要完成的動作 (何时 ERDDAP™ 重新啟動) 數據集隨時變化 此系統可通过&lt;訂閱SystemAactive &gt; in your [設定. xml](/docs/server-admin/deploy-install#setupxml) 文件。 其 ERDDAP™   [每日報告](/docs/server-admin/additional-information#daily-report) 現在列出所有訂閱, 包括取消每個訂閱所需的網址, 以防你覺得系統被滥用 。 在 datasets.xml ,有新的,可選用 [&lt;訂閱 電子郵件黑清單&gt;] (/docs/server-admin/datasets#訂閱電子郵件黑名單) 標籤, 讓管理員可以指定一個以逗號分隔的電子郵件位址清單, 這些位址將立即從訂閱系統上列入黑名單 。
    * 新建&lt;變更 &gt; ] (/docs/server-admin/datasets#變更) 屬性於 datasets.xml 讓 ERDDAP™ 管理員指定在建立特定數據集時要完成的動作 (何时 ERDDAP™ 重新啟動) 數據集隨時變化
    * 完整文字搜尋的改善: 儲存每個數據集的搜尋字串現在使用內存的1/2. 搜尋算法 (象摩爾一樣) 現在快到3X了
    * 從 ERDDAP™ 現在總是把主題和內容放在 \\[ 厄德達普 網址 \\] 以便知道 ERDDAP™ 這是從 (以防您管理多項 ERDDAP s) .
    * 收集更多 [每日報告](/docs/server-admin/additional-information#daily-report) 電子郵件
    * 新增紀錄檔 \\[ 大家长會 \\] / emailLogYEAR- MM- DD. txt 登入所有電子郵件 ERDDAP™ 每天 如果您的伺服器不能發送電子郵件, 這尤其有用。 您至少可以在日志中讀取 。
    *    ERDDAP™ 現在做個 \\[ 大家长會 \\] /囊/ ( datasetID ) 每個數據集的目錄, 因為可能有許多檔案被快取 。
* 新建 [ RSS 2.01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions) 每個數據集的 feed (找橙子 RSS 圖示網頁) .
*    EDDGrid   .kml 現在的回應使用平面圖片 ("超過覆蓋" - 动态產生的四棵樹影像) . 最初的影像載入GoogleEarth的速度比以前快得多. 地圖的解析度隨你放大而增加, 直至數據集的完全解析度 。 建議:使用者要求 .kml 但數據集的經度 經度範圍 不幸的是, 時間範圍的支援被移除 (我希望它會回來) .
*    ERDDAP™ 現在添加 [过期與缓存控制最大年齡信頭](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) 到所有從 / 影像目錄要求的檔案 。 這大大減少了寄往的靜態檔案要求數量 ERDDAP 从而大大加快了 ERDDAP™ 頁面載入。 而且,很多 Java 文稿檔案參考移到 HTML 頁面的底部, 這也會加速很多 ERDDAP™ 頁面載入。 多虧了史蒂夫·蘇德斯的著作《高性能網站》和FireFox中FireBug插件的ySlow。
*    ERDDAP™ 從netcdf-java 2.2.22 轉換到netcdf-java 4.0. 除其他外, EDDGrid 從 NcFiles 要讀取 HDF   .hdf ,以及GRIB grb和 NetCDF   .nc 文件。
*    EDDGrid 從 Dap 和 EDDGrid 從 NcFiles 現在也支援 Darray (以及DGrid)   dataVariable s. 如果一個維度沒有相应的座標變數 ERDDAP™ 建立有索引值的轴變數 (例如,0、1、2、...、311、312) . 所以,所有其他方面 EDDGrid 保持原樣:
\\* 它仍然以 Grid 為所有資料集服務, 每個維度都有一個轴變數 。
\\* 查詢仍然可以從轴變數中要求值 。
多虧了查爾斯·卡爾頓 托馬斯·伊姆 多里安·雷默等人
* 其 WMS   OpenLayers 頁面現在有預設的經度, 經度範圍比數據集的範圍大一點 。 (不是确切的範圍, 所以小數據集的背景更明顯) . 預設範圍可能也是 0 到 360 , 這可以顯示很多數據集的全部範圍 。 多虧了 Todd 斯賓德勒
* 在一些資料存取表單上新增滑動程式, 並且建立 Graph 網頁 。 簡單的 (粗) 指定需要的數據,并提供良好的視覺反馈。
* 新的選項&lt;数据集 &gt; 標籤 datasets.xml : [作用中="假"](/docs/server-admin/datasets#active) .
* 参考 ERD 是 ERDDAP™ 從海岸觀察器變更 pfel (仍然通过代理工作) 前往海岸觀察。 pfeg (偏好) .
* 新支持 [ data\\_min 和 data\\_max ](/docs/server-admin/datasets#data_min-and-data_max) 變數中繼資料屬性。
* 部分解決 [再等一次/ 部分結果例外](/docs/server-admin/additional-information#waitthentryagain-exception) : 現在,一些先前在發現資料來源變更時失敗的要求會成功,因為 ERDDAP™ 將重新載入數據集並自動重新要求數據, 全部以原要求為背景 。
* 臭虫修正: 產生 數據集 Xml 已禁用 ERDDAP™ 1.12版。 多虧了Ellyn Montgomery指出了這件事
* 處理錯誤的小變更 。
* 避免/處理可能的種族條件 (即: 可能因多線性 ERDDAP ) 造成小的不常見的問題
* 如果影像上寫有錯誤訊息, 影像只會在缓存中停留 ~ 5- 10 分鐘 (不是60) . 多虧了卡拉·威爾遜
* 沒有資料時的標準訊息現在是"你的查詢沒有取得匹配的結果",它更短,更准确,更匹配. OPeNDAP 伺服器。
*    EDDGrid 不再允許帶定轴值 。
* 微小的變更 ver 和. help 要求 。
* 很多小變更和錯誤修正 。
     

## 1.12版本{#version-112} 
 (2008-10-31年) 

* 從 EDD 表格 SOS 再一次與NDBC合作 SOS 與新的NOS合作 SOS .
* BMDE 的 EDD 表現在需要 ERDDAP™ 要指定的管理者 dataVariable s.
*    EDDGrid 不再要求Lat和Lon保持平衡 透明  P或 .kml . 多虧了 Todd 斯賓德勒
* 几小改.
     

## 1.10版本{#version-110} 
 (2008-10-14年) 

* 新增數據變數的“ colorBar” 中繼資料 datasets.xml 定义圖和地圖的預設顏色列設定值。 看 [更多信息](/docs/server-admin/datasets#color-bar-attributes) . 這很重要, 因為它大大改进了 Make A Graph 產生的預設圖和地圖的外觀, 也因為預設的圖和地圖現在即使客戶端改變了要求的時間或地理範圍, 都有一個一致的顏色列 。 而且,這對 WMS .
*    ERDDAP™ 目前通过一個 WMS 服務。 這很重要,因為它顯示 除了從很多類型的數據伺服器得到資料外, ERDDAP™ 可以通过不同的協議傳送資料 ( DAP , WMS ,... 更多的未來) . 看 [客戶端文件](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html) . 或者 [管理者文件](/docs/server-admin/datasets#wms) . 或者 [試試看](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html) .
* 新建經度值支援 &gt; 180 in .kml 文件。
* 新的 cdm\\_data 類型: 其他 。
*    ERDDAP™ 現在支援「 boolean 」 來源資料 Type 。 看 [更多信息](/docs/server-admin/datasets#boolean-data) 這將對未來的數據庫 EDD Table 有用 。
* 新增 EDD Table FromBMDE 支援 DiGIR/ BMDE 資料來源 。
* EDVGridAxis 已允許降序數值 。 Pmelocar數據集需要這個
*    ERDDAP™ 現在傳回 HTTP 錯誤 (例如,“404 for fources/ page 找不到”) 在更多情况下,而不是有錯誤訊息的 HTML 頁面。
* 很多變更/新增 ERDDAP™ 文件。
* 很多小改變。
* 一些虫子修正。
*    **事情 ERDDAP™ 管理員要提升到此版本 :** 
    * 在 datasets.xml ,用于任何 EDD 表格 SOS 數據集, 將“ observatedProperty ” 中繼資料變更為“ source ObservatedProperty ”。
    * 規矩 axisVariable 或 dataVariable 是 destinationName 現在 [更严格](/docs/server-admin/datasets#datavariable-addattributes) . 您需要檢查您的變數名稱是否合法 。 要么親手檢查,要么跑 ERDDAP™ 并查看已發送管理員的報告中的錯誤訊息 。
    * 在 datasets.xml ,如果您想要通过 WMS ,您需要加入色彩Bar元数据。 至少,例如,&lt;姓名=" colorBarMinimum "type="double"&gt;0&lt;/at &gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
看 [更多信息](/docs/server-admin/datasets#wms) .
    * 在您的 [設定. xml](/docs/server-admin/deploy-install#setupxml) 文件 (但用您的資訊自訂它) :

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## 1.08版本{#version-108} 
 (2008-07-13年) 

* 新網頁服務 ERDDAP™ 生成 數據集 Xml, 協助 ERDDAP™ XML 要描述其中的數據集, 需要建立粗略的草稿, 以此建立管理員 datasets.xml 
* 包括: 全球中繼資料已標籤為「NC\\_GLOBAL」。 (而不是"GLOBAL") .
* 其 EDDGrid 而 EDDTable 資料存取表現在使用網址中的查詢資訊 。 所以, 例如, 如果使用者從 Make A Graph 表格到 Data Access Form , 這些限制現在被妥善轉移 。
*    tabledap 現在的「 Make A Graph 」 可以限制字串變數 。
* EDDTable 的 Make A Graph 已允許 NaN 限制 。 多虧了史蒂夫·漢金
* 臭虫修正: EDD 表格保存 影像沒有正确認出 . colorbar min和最大值 。 多虧了史蒂夫·漢金
* 設定 DatasetsXml 的很多改进 。 多虧了艾琳蒙哥馬利
* 已允許網路要求 () - 類型要求略微超出實際轴距 。 這很合適,因為 () - 值四舍五入到最接近的实际值。 多虧了辛迪·貝西
* 我讓浮射箭和雙射箭的測試更精密 永遠不完美 (因為測試需要為每個數據集定制) 但應該更好 多虧了艾琳蒙哥馬利
* 我移動了設定. html和設定Datasets Xml.html erddap 的 / 下載目錄及硬體編碼所有連結 。 現在,我可以做改變 并更新設定信息立即。
* 很多小改變 几小虫修.
*    **事情 ERDDAP™ 管理員要提升到此版本 :** 
    * 走&lt;描述 從您的訊息. xml 到您的 Html &gt; [設定. xml](/docs/server-admin/deploy-install#setupxml) 文件。 它指定了在左邊中間出現的文字 ERDDAP™ 主頁。 加上&lt;h1 &gt; ERDDAP &lt;/h1 &gt; (或者其他頭條) 到其上. **或者** 复制&lt;新建的 ShortDescriptHtml &gt; [設定. xml](/docs/server-admin/deploy-install#setupxml) 文件 (從新的 erddap 連結 .zip ) 在您的設定。 xml 。
         

## 1.06版本{#version-106} 
 (2008-06-20年) 

* 新支持 IOOS DIF SOS 資料來源。
* 很多小改變 几小虫修.
     

## 1.04版本{#version-104} 
 (2008-06-10年) 

* 新增幻灯片排序功能 。
* 新增 Google Gadgets 頁面與示例 。
* Bug 修正 EDDGrid 大小與新增 Offset 的變數 。
     

## 1.02版本{#version-102} 
 (2008-05-26年) 

* 新建 EDDGrid SideBySide 允許不同的 axisVariable s \\[ 0 \\] 來源 價值
* 所有水流和風力數據集被合并成 EDDGrid SideBySide 数据集 。
* 影像要求的影像現在被缓存1小時 。
     

## 1.00版本{#version-100} 
 (2008-05-06年) 

* 在 URL 中建立 Graph 網頁與圖像命令 。
* 支援旗下檔案強迫重新載入数据集 。
* 新的數據集類型: EDD Table from4DFiles (EDD Table From Files 第一子類) .
