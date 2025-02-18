---
sidebar_position: 2
---

# 程式指南

這些只是一個程序員打算合作的ERDDAP是Java課程需要知道。

###  **取得源碼**  {#getting-the-source-code} 
   

  - GitHub 上的 Via 源碼
最近公開版和開發版的源碼也可通过[GitHub 圖片](https://github.com/ERDDAP). 請讀一下[維基](https://github.com/ERDDAP/erddap/wiki)為了那個計劃 如果你想修改源碼 (并可能把修改纳入标准ERDDAP™分配) ,

###  **ERDDAP™依赖性**  {#erddap-dependencies} 
ERDDAP™使用 Maven 來載入編碼依赖性以及一些靜態參考檔 (WEB-INF/ ref) . 這是為了避免在寄存器中儲存很多大檔案 。
您可以使用“ mvn 編譯 ” , 這可以取回依賴檔和參考檔 。 您也可以使用「 mvn 套件」 來產生戰爭檔案 。
您可以手動下載參考檔 :

  - [etopo1\\_ice\\_g\\_i2.zip](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip)并解析到 /WEB-INF/ref/ 。

  - [翻譯檔案.zip](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip)并解析到 /WEB-INF/ref/ 。

  - [erddap 內容.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (版本 1.0.0, 20333字節, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5,日期2024-10-14) 將它解析成 _tomcat_, 建立_tomcat_/content/erddap.

注意 : 預設 Maven 會缓存靜态參考和測試資料檔案的下載, 只有在新版本下載時才提取 。 要完全跳過下載, 您可以設定「 skipResourceDownload 」 和/ 或「 skip TestResourceDownload 」 的屬性到 Maven (例如,`mvn - Dskip 资源下載套件 `) . 要強制提取, 設置 `- Ddownload. unpack= true' 和`- Ddownload. unpack when Changed=false' 。

- ERDDAP™及其子元件有非常自由的開源[授權](/license),所以您可以為任何目的使用和修改源碼,以营利或非牟利. 注意:ERDDAP™而很多子元件都有許可證 要求您承認您使用的密碼來源 。 看[信用](/credits). 不管是否有必要,
  

-  **其他工程使用程式碼** 

歡迎您使用部分ERDDAP™其它專案的程式碼, 警告此程式碼可以而且會變更 。 我們不保證會支持我們密碼的其他用途 Git 和 GitHub 是您處理這個問題的主要解決方案 -- Git 允許您將我們的變更整合到您的變更中 。
   **在很多情況下 你可能會想用部分ERDDAP™在你的計畫中,我們認為你會發現更容易安裝和使用ERDDAP™也是** 然后寫入其他使用ERDDAP服務 你可以自己安排ERDDAP™一兩小時內就安裝好 你可以自己安排ERDDAP™再過幾天就用磨光的方法安裝 (依數據集的數量與複雜度而定) . 但黑掉部分ERDDAP™可能要花上幾周 (和抓住微妙的月份) 而您將失去加入變更和錯誤修正的能力ERDDAP™釋放 我們 (顯然) 使用有許多利益ERDDAP™以及你ERDDAP™公開存取安裝。 然而,在某些情况下,你可能不想做你的ERDDAP™公開存取安裝。 那麼,你的服務 可以存取和使用你的私人ERDDAP™你的客戶不需要知道ERDDAP™.

  ####  **半途** 

或者,還有一種方法,你可能覺得有用 在探索的中間ERDDAP代碼與使用ERDDAP™作為獨立的網路服務: 在 EDD 類別中, 有一種靜態方法讓您做個數據集的例 (根據datasets.xml) :
資料集中的一個 Xml 命令 (字符串 tDatasetID) 
返回 EDD表或EDDGrid數據集。 既然如此,你可以打電話
做新檔案ForDapQuery (字符串使用者 DapQuery, 字串 dir, 字串檔案Name, 字串檔案 型態Name) 
由使用者查詢結果。 因此,這是一個簡單的用法ERDDAP要求資料和取得檔案回應的方法, 就像客戶端會使用ERDDAP™網頁應用程式。 但這方法在你的內心Java程式並绕過 Tomcat 等應用程式伺服器的需要 。 我們用這個方法來做 EDD Table 的很多單位測試EDDGrid子類, 您可以在源碼中看到這些類別的示例 。

###  **發展環境**  {#development-environment} 

  - 有配置[杰蒂](https://github.com/ERDDAP/erddap/blob/main/development/jetty)和[嵌入器](https://github.com/ERDDAP/erddap/blob/main/development/docker)在GitHub中,

  -  **可選擇** : 設定ERDDAP™在 Tomcat 中
自ERDDAP™我們強烈建議你們遵守標準[安裝指令](/docs/server-admin/deploy-install)以安裝Tomcat,然后安裝ERDDAP™在Tomcat的 Webapps 目錄中。 除其他外,ERDDAP™被設計為安裝在 Tomcat 的目錄結構中, 並期望 Tomcat 會提供一些 .jar 檔案 。

  - ERDDAP™不需要特定的IDE (Chris主要使用Visual Studio碼, Bob 使用 EditPlus) . 我們不使用Eclipse、Ant等。ERDDAP- 支持他們 這項工程是用馬文的

  - 我們使用一個批次檔案來刪除來源樹上的 . class 檔案,以确保我們有清潔的編譯 (使用 Javac) .

  - 我們目前使用領養的javac jdk-21.0.3+9來編譯 gov.noaa.pfeg.coastwatch。 (它有幾個課程的連結 否則不會編譯) 做測試 出于安全原因,使用最新版本的Java21和Tomcat 10.

    - 目前的目錄為_tomcat_/webapps/erddap/WEB-INF。

    - 我們的Javac和Java的流派是
`类;./././lib/servlet-api.jar;lib/*`'

    - 所以你的Javac命令會像這樣
`javac-編碼 UTF-8-cp 班;././lib/servlet-api.jar;lib/* 班/gov/noaa/pfel/coastwatch/TestAll.java'

    - 你的Java命令會像這樣
`java - cp 課程;./././lib/servlet-api.jar;lib/ * - Xmx4000M - Xms4000M /政府/noaa/pfel/海岸表/
`可選擇性:你可以加上`-動詞:gc',它表明Java以列印垃圾收集數據。

    - 如果測試 所有編譯,一切ERDDAP™需求已汇编。 幾堂課是不需要的ERDDAP™. 如果編譯 TestAll 成功但沒有編譯一些課程,那就不需要了. (有一些未完成/未使用的課程。) 

  - 在少數情況下,我們使用第三黨源碼而不是.jar檔案 (特别是DODS) 並稍作修改,以避免編譯有問題Java21. 我們常做其他微小的修改 (特别是DODS) 其他原因。

  - 大多數課程在相關的src/test文件中都有測試方法. 您可以使用 ' mvn 測試 ' 指令執行 JUnit 測試 。 這會下載數個測試所依赖的 zip 檔案[ERDDAP/ erddap 中 測試](https://github.com/ERDDAP/erddapTest/releases/).\\
     
注: Maven 缓存下載, 但會解開每次執行中已下載的檔案, 這需要時間 。 要跳過下載
您可以指定 Maven 的 skip TestReferenceDown 屬性 (如 `mvn - Dskip TestResource' 套件 `) .

###   **重要類別**  {#important-classes} 

如果你想看看源碼,試著想想辦法ERDDAP™工作,請做。

  - 密碼是Java醫生評論,但Java醫生還沒產生 隨你便 發育它們吧

  - 最重要的班 (包括下文提到的) 在gov/noaa/pfel/erddap。

  - 其ERDDAP™課程有最高水平的方法。 它延伸了HttpServlet。

  - ERDDAP™傳送請求至EDDGrid或 EDD Table,代表各個數據集。

  - EDStatic 拥有大部分靜態資訊與設定 (例如, 從設定的. xml 與信件. xml 檔案中) 提供靜態服務 (例如,發送電子郵件) .

  - EDDGrid和 EDDTable 子類分解要求, 從子類特定方法取得資料, 然后格式化 。

  - EDDGrid子类將資料推進 GridData 存取器 (网格化資料的内部資料容器) .

  - EDDTable 子類別將資料推進 TableWriter 子類別, 將資料寫入飛行中的特定檔案類型 。

  - 其他班 (例如低級班) 也很重要,但你更不可能 努力改變它們。
     

###  **密碼贡献**  {#code-contributions} 

- GitHub 問題
如果你想投資但沒有項目,請參考[GitHub 問題](https://github.com/ERDDAP/erddap/issues)其中很多都是你能完成的項目 如果你想研究一個問題 請自己去告訴別人你正在研究 GitHub問題是討論任何問題的最佳地方,

- 若您想要改變的情況是以下常见的,[GitHub 期](https://github.com/ERDDAP/erddap/issues)表示你打算做的改變。 一旦變更完成, 請提出拉動要求以要求合并 。 共同的修改包括:

  - 您要寫下另一個子類EDDGrid或 EDD Table 處理其他資料來源類型。 如果有,我們建議你找到最接近的子類 并使用這個代碼作為起始點

  - 您要寫入另一個儲存 As_ FileType_ 方法 。 如果有, 我們建議您在其中找到最近的儲存 As_ FileType_ 方法EDDGrid或 EDD Table 并使用此碼為起始點 。

你寫的密碼是自成一体的 你不需要知道所有的細節ERDDAP內部的 我們很容易把您的密碼寫進ERDDAP. 注意, 如果您提交代碼, 執照需要符合ERDDAP™ [授權](/license)  (例如,[阿帕奇語Name](https://www.apache.org/licenses/),[BSD 中](https://www.opensource.org/licenses/bsd-license.php),或[MIT-X](https://www.opensource.org/licenses/mit-license.php)) . 我們會列出你們在[信用](/credits).

- 如果您有上面未包含的功能, 您希望加入其中ERDDAP中,[GitHub 討論](https://github.com/ERDDAP/erddap/discussions/categories/ideas). 技術委員會將討論,ERDDAP™.

###  **判斷您的編碼贡献**  {#judging-your-code-contributions} 
如果您要提交要包含的代碼或其他變更ERDDAP太好了 你的贡献需要符合某些标准才能被接受 如果你遵循以下的指引,你就會大大增加你的贡献被接受的機會.
   

  - 其ERDDAP™專案由 NATD 管理 (NOAA任命) 由技術委員會提供
2007年 (開始ERDDAP) 直到2022年 那是鮑勃·西蒙斯 (也是創始者領導者) . 從2023年1月开始,那是克里斯·約翰 基本上,NATD是負責的ERDDAP,所以他/他對決定有最后的消息ERDDAP™程式碼, 主要是關於設計和是否接受給定的拉力要求 。 一定是因為效率原因 (它對Linus Torvalds和Linux有好處) 部分出于安全原因: 總得有人告訴IT安全人員 他對密碼的安全和完整負責
     

  - NATD不能保證他會接受你的密碼
如果一個項目沒有我們所希望的那樣成功 如果它不能被拯救 NATD就不會把這個項目列入ERDDAP™分配。 請不要感到難過。 有時計畫效果不盡如人意 所有軟體開發者都會這樣 如果你遵循下面的規矩, 你大大地增加了你的成功機會。
     

  - 如果改變是普遍的利益和效用,那最好.
如果密碼是你們組織的 最好保持一個單獨的分支ERDDAP™供你使用。 Axiom干的 幸好吉特讓事情變得很容易 NATD希望保持對ERDDAP並不讓它成為廚房水槽專案,
     

  - 跟著Java法典公约。
一般說來,你的密碼應該是品質好的 而且應該遵循原則[Java法典](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf): 將 . class 檔案放在目錄结构的适当位置, 給 . class 檔案一個适当的名稱, 包括 roalJavaDoc 註解, 包含 // 註解在每段碼首, 縮排為 4 個空格 (沒有分頁) ,避免行 &gt;80字符等。 傳統改變, 如果有疑問, 代碼要符合約法而不是现有的代碼。

- 使用描述類, 方法和變數名稱 。
讓其他人更容易讀到密碼
   

- 避免花式代碼 。
從长远看,你或其他人必須找出密碼才能維持下去 所以請使用簡單的編碼方法 讓其他人更容易 (包括你未來) 想清楚 顯然,如果用花招有真正的優點Java編程功能, 使用它, 但大量記錄你所做的, 原因, 以及它是如何工作的 。
   

- 在你開始之前和技術委員會合作
如果你希望得到您的密碼變更ERDDAP™技術委員會肯定會想在您修改密碼之前 談一下您要做什麼 該怎麼做 這樣我們就可以避免你做出NATD最後不接受的改變 當你工作時,NATD和技術委員會 愿意回答問題 幫助你找出现有的密碼 (概述) 如何處理你的專案
   

- 独立工作 (越多越好) 在你開始之后
相對於以上「與技術委員會合作」, 如果NATD要告訴你幾乎一切 回答很多問題 (特別是那些你可以通過讀取文件或密碼來回答的) 那麼你的努力並不是 NATD的時間节省 而且他也可以自己做 是[神話人物月](https://en.wikipedia.org/wiki/The_Mythical_Man-Month)有問題 當然,我們應該繼續交流 以確保計畫能如期進行, 但你越能獨立工作 (在技術委員會同意手頭的工作和一般方法之后) 越好
   

- 避免虫子 。
如果在發行前未抓到錯誤, 這會引起使用者的問題 (最多) ,返回錯誤的信息 (最糟糕的) ,是污點上ERDDAP名聲,將不斷ERDDAP™設置多年。 努力避免虫子 一部分是寫清潔碼 (所以更容易看到問題) . 一部分是寫作單位的測試 一部分是寫程式碼時的避蟲態度 不要讓NATD后悔 加上你的密碼ERDDAP™.
   

- 寫單位測試或測試
要用新的代碼, 您應該將 JUnit 測試寫入測試檔 。
請至少寫下一個單位的測試方法, 徹底檢查您寫的代碼, 並加入到課程的 JUnit 測試檔中, 讓它自動執行 。 單位 (相关) 測試是捕捉蟲子的最好方法之一, (隨著其他事物的改變ERDDAP™) . 如鮑勃所言 「單身檢查讓我晚上睡覺」
   

- 讓NATD容易理解并接受你拉力要求中的變更.
一部分是寫單位測試方法 (s) . 其中一部分是限制您的變更 。 (或一個類別) 如果有可能的話 NATD不會接受任何拉力要求 隨著數以百計的變化 NATD告訴IT安全人士, 若改變過多, 或是太難解析,
   

- 保持簡單。
您的密碼的一個好主題是: 簡單點。 簡單的密碼對其他人來說很簡單 (包括你未來) 以讀取和维护。 NATD很容易理解并接受
   

- 做你的密碼的長期責任
從长远看,你最好繼續負責 維持你的密碼,回答問題 (例如,ERDDAP™谷歌群組) . 有些作者指出,代碼既是財產也是负债。 如果未來發現了蟲子 最好能修好 因為沒人比你更瞭解你的密碼 (也因此有避免蟲子的刺激) . NATD並非要求堅定承諾, NATD只是說,做維修會非常感謝。
