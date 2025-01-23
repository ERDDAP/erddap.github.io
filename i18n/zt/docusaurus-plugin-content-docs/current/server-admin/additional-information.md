ERDDAP™- 建立你自己ERDDAP™    

## 你需要知道的事情{#things-you-need-to-know} 
     
###    **[代理錯誤](#proxy-errors)**  {#proxy-errors} 
有時候,要求ERDDAP™傳回代理錯誤、 HTTP 502 壞門錯誤或類似錯誤 。 這些錯誤正被阿帕奇或湯姆卡特拋棄 不是ERDDAP™自己
* 如果每個要求都產生這些錯誤, 尤其是當您第一次設定您的ERDDAP™,那么它可能是代理錯誤或壞的网關錯誤,而解答可能就是修正[ERDDAP代理設定值](/docs/server-admin/deploy-install#proxypass). 這也可能是問題所在,ERDDAP™每個要求都突然發生錯誤
* 否則, "代理" 錯誤通常是 Apache 或 Tomcat 扔出的錯誤。 即使它們發生得比較快 但當它們發生的時候 卻是阿帕奇或湯姆卡特的反應ERDDAP™或受到其他資源的限制。 在這些案件中,请参阅下文的忠告。[ERDDAP™慢慢回應](#responding-slowly).
        
长期要求 (&gt; 30 時點) 從網格化的數據集中會發生超時故障, 它常以代理錯誤的形式出現, 因為它需要大量時間ERDDAP™要逐一開啟所有資料檔。 如果ERDDAP™在要求中, 如果數據集的檔案被壓縮, 問題就更可能發生, 雖然使用者很難決定數據集的檔案是否被壓縮 。
解決方式是提出多項要求, 時間範圍有多小? 我建議小點 (-30分?) 那么 (約) 雙倍的時間範圍, 直到要求失敗, 然後返回一個加倍 。 那就提出所有的要求 (不同時間) 需要得到所有的資料。
安ERDDAP™管理員可以通过增加[Apache 超時設定值](/docs/server-admin/deploy-install#apache-timeout).
        
### 監控{#monitoring} 
我們都希望我們的數據服務能找到觀眾 被廣泛利用 但有時你ERDDAP™可能會被使用太多, 造成問題, 我們避免問題的計劃是:

* 監控器ERDDAP™通過[狀態.html网页](#status-page).
有很多有用的信息 如果你看到大量要求正在出現 或數吨內存被使用 或數吨失敗的要求 或每個主要載入Datasets 需要很長時間 或看到任何東西被困住慢慢回應的跡象ERDDAP是[log.txt 文件](#log)看看發生了什么
    
只需指出狀態頁面的反應速度, 如果回應慢一點,這是重要的指示ERDDAP™非常忙
    
* 監控器ERDDAP™通過[每日報告](#daily-report)電子郵件
     
* 注意透過 : *基底Url* /erddap/outOfDateDatasets.html基于選項的網頁[testOutOfDate](/docs/server-admin/datasets#testoutofdate)全球屬性。
     
#### 外部监视器{#external-monitors} 
上述方法如下:ERDDAP監控自己的方式 也可以建立或使用外部系統來監控您ERDDAP. 一個項目是[Axiom 的 erddap 測量工程](https://github.com/axiom-data-science/erddap-metrics). 這些外部系統有一些优点:
* 以你想要的方式展示
* 其中可以包括:ERDDAP™那ERDDAP™不能輕易或完全存取(例如 CPU 使用量、磁碟空間、ERDDAP™從使用者的角度看,回應時間ERDDAP™起床了
* 他們能提供警報 (電子郵件、電話、短信) 當問題超過某種阈值時,
             
### 多重同時 要求{#multiple-simultaneous-requests} 
*    **黑名單使用者會提出多重同時要求&#33;** 
如果可以清楚知道有些使用者在重复和持續地提出不止一個同步要求,那么就把他們的IP地址添加到ERDDAP'是&lt;要求Blacklist &gt;] (/docs/server-admin/datasets# 要求黑名單) 在您的datasets.xml文件。 有時要求都來自一個IP地址. 有時它們來自多個IP位址, 但顯然是同一個使用者. 您也可以列出數以千計的無效要求,
    
然後,他們為每個要求,ERDDAP™返回 :
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
希望使用者能看到這條訊息, 並聯繫你, 有時候,他們只是切換IP地址再試一次
    
這就像戰爭中攻擊武器與防守武器的力量平衡 來,防守武器 (ERDDAP) 具有固定容量, 以 CPU 中的核心數量、 磁碟存取寬度、 網路寬度為限制 。 但攻擊性武器 (使用者, 尤其是文稿) 具有无限容量 :
    
    * 單一要求從很多時間點得到資料可能會引起ERDDAP開啟大量檔案 (排序或部分多串) . 在極端情況下,一個"簡單"的要求可以輕而易舉地捆綁附在其中的RAIDERDDAP™有效阻止處理其他要求。
         
    * 單一個要求可能消耗一大堆記憶體 (雖然ERDDAP™以最小化處理大要求所需的內存) .
         
    * 平行 - –
聰明的用戶很容易以產生很多線程來平行一個大工作, 每個線程都會提交一個单独的請求 (大小) . 這項行為受到電腦科學界的鼓勵, (在其他情况下,平行是有效的) . 回到戰爭的類比:使用者可以提出無限制的同時要求,ERDDAP™可以大而且ERDDAP反應能力有限 顯然ERDDAP™除非是...ERDDAP™管理員黑名單使用者正在提出多項同步要求,
         
    * 多重文稿 -
想想當有幾個聰明的使用者 每個執行平行的文稿時會發生什麼 如果一個用戶能產生如此多的請求, 以致其他用戶被挤出, 那麼多個用戶能產生如此多的請求, 以至于ERDDAP™變得不知所措 似乎沒有反應 實際上是[DDOS 攻擊](https://en.wikipedia.org/wiki/Denial-of-service_attack)再次,唯一的辯護者是ERDDAP™以黑名單列出多個同步要求的使用者,
         
    * 膨胀的期望...
在大型科技公司的世界中 (亞馬遜 谷歌 Facebook...) 使用者期待提供商提供無限的能力。 因為這些公司是賺錢的, 所以他們能負擔起巨大的IT基礎 處理要求 他們巧妙地限制使用者要求的數量和成本, (或是某種方式) 供使用者同步提出多次要求。 所以這些巨大的技術公司 的使用者可能比ERDDAP™以限制每個使用者的要求。 這對大IT公司來說是可控的情況 (他們就發財了&#33;) 但不是為了ERDDAP™设施。 再次,唯一的辯護者是ERDDAP™以黑名單列出多個同步要求的使用者,
         
    
所以用戶們:不要提出多項同步要求,
     

顯然你的伺服器最好有很多核心 有很多記憶體 (所以,你可以分配很多的記憶體ERDDAP™比以前需要的更多) 和高頻率的網路連接 因此,記憶體很少或從來不是限制因素,但網路寬頻成了更常见的限制因素. 基本上, 隨著越来越多的同步要求, 任何使用者的速度都會降低 。 如果每個使用者只是一次提交一個要求, 這自然會減慢來源的請求數量 。
    
### ERDDAP™從 THREDDS 取得資料{#erddap-getting-data-from-thredds} 
如果你ERDDAP™從您網站上的 THREDDS 取得一些數據, 在 THREDDS 資料檔上做一份複製有某些優點 。 (至少最流行的數據集) 在另一個RAID上ERDDAP™有權使用ERDDAP™可以直接提供檔案中的資料。 在ERD為了我們最受歡迎的數據集

*   ERDDAP™可以直接取得資料,而不必等待THREDDS重新載入数据集或...
*   ERDDAP™可以立刻注意到並輸入新的資料檔, 所以它不必經常捕蟲THREDDS來查看數據集是否變了 。 看&lt;更新 EveryNMILIS &gt; (/docs/server-admin/datasets#update Everynmillis / 更新所有資料) .
* 荷載由2 RADS 和 2 台伺服器分開, 而不是兩個都難求ERDDAP™和THREDDS。
* 您避免了 THREDDS 的小錯誤問題 (默认) 最大要求大小。ERDDAP™有一個系統可以處理不匹配, 但避免問題更好。
* 你有數據的備份 總是個好主意

總之 永遠不要用THREDDS和ERDDAP™在同一個湯姆卡特。 在不同的Tomcats,或更好的,在不同的伺服器上运行。

我們發現THREDDS 定期地在一個狀態 要求只是挂起。 如果你ERDDAP™從THREDDS得到數據 而THREDDS就在這狀態下ERDDAP™有辯護 (上面寫著沒有THREDDS的資料) 但還是很麻煩的ERDDAP™因為ERDDAP™每次它試圖從挂载的 THREDDS 重新載入數據集時, 必須等到超時。 一些群組 (包括ERD) 避免此變更, (比如在夜里工作) .

### 慢慢回應{#responding-slowly} 
*    **如果ERDDAP™慢慢回應** 或者,如果只是某些要求 正在慢慢回應,
你可能會想出慢速是否合理和暫時 (例如,由于文稿中的很多要求或WMS使用者) 或者,如果某件事是不可解釋的錯誤 你需要[關閉並重新啟動Tomcat和ERDDAP™](#shut-down-and-restart).
    
如果ERDDAP™希望這能讓你解決問題。
你可能有個具体的起始點 (例如,特定要求 URL) 或模糊的起始點 (例如,ERDDAP™慢) .
你可能知道涉及的使用者 (例如,因為他們給你發了郵件) 或非.
你可能還有其他的線索
因為所有這些情況以及所有可能的原因都模糊了,
    
    *    **尋找線索[ERDDAP'log 檔](#log)**   ( *大家长會* /logs/log.txt) .
        \\[在少有的情況下 有線索[Tomcat 日志檔](#tomcat-logs)  ( *湯姆卡* /日志/卡塔琳娜。) .\\]  
查找錯誤訊息 。
尋找大量來自其中一個的要求 (或數) 使用者或可能占用您伺服器的大量資源 (內存、 CPU 時間、 磁碟存取、 網路帶宽) .
        
如果有麻煩的話 **1名使用者** 您可以透過網絡服務,[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)可以提供與使用者的 IP 位址相關的資訊 (您可以在ERDDAP是[log.txt](#log)文件) .
        
        * 如果使用者似乎是 **机器人** 做坏事 (特別是,一個搜索引擎試圖填充ERDDAP™包含所有可能輸入值的表單) ,確保您已妥善設定您的伺服器[机器人.txt](#robotstxt)文件。
        * 如果使用者似乎是 **文稿 (s) ** 正在提出多個同步要求, 聯繫使用者, 解釋您ERDDAP™資源有限 (例如內存、 CPU 時間、 磁碟存取、 網路帶宽) , 要求他們考慮其他使用者, 你可能還會說 如果他們不退縮 你會把他們列入黑名單
        * 如果使用者似乎是 **文稿** 做大量耗時的請求, 請用戶稍稍暫停以考慮其他用戶 (2秒?) 中。
        *    **WMS客戶端軟體** 可能要求很高 一個客戶端一次會要求6個自訂影像 。 如果使用者似乎是WMS您可以:
            * 忘了它。 (被推薦了 因為他們很快就會搬家了) 
            * 關閉您的伺服器WMS服務通過ERDDAP's setup.html file. (未推荐) 
        * 如果要求似乎 **愚蠢、瘋狂、過份、惡毒** 或者如果你無法以其他方式解決問題, 考慮將使用者的 IP 位址暫時或永久添加到 [&lt;要求黑色列表&gt;datasets.xml文件] (/docs/server-admin/datasets# 要求黑名單) .
             
    *    **試著重複問題你自己,從你的電腦。**   
找出問題是用一個數據集還是所有數據集, 一個用戶或所有用戶, 只用某些類型的要求等等 。
如果你能重複問題 試著縮小問題
問題可能與使用者的電腦、使用者的網絡連接,
         
    * 如果 **一個數據集** 反應很慢 (也許只是為了 **一种要求** 從一個使用者) ,問題可能是:
        *   ERDDAP存取数据集的來源資料 (Cassandra 和遠端數據集) 可能是暫時或永久的慢。 試著單獨檢查來源的速度ERDDAP. 如果它慢,也許你可以改善它。
        * 是與具体要求或一般要求類型有關嗎?
要求的數據集越大, 要求就越可能失敗 。 要求使用者提出更小的要求,
            
几乎所有的數據集都比其他類型的要求更能處理某些類型的要求. 例如,當數據集儲存不同時點的檔案時, 從大量時點求取數據可能非常慢 。 如果目前要求的類型很困難, 請考慮提供最適合這些要求的數據集的變體 。 或是向使用者解釋,
            
        * 数据集可能不优化配置 。 您可能可以改變數據集datasets.xml要幫助的區塊ERDDAP™處理好數據集。 例如,
            
            *   EDDGrid從 NcFiles 資料集中, 從壓縮的 nc4/ hdf5 檔案存取資料的速度在取得整個地理範圍的資料時很慢 (例如,世界地圖) 因為整個檔案必須解壓。 您可以將檔案轉換成未壓縮的檔案, 但磁碟空間要求會大得多 。 某些情況下,
            * [&lt;subsetVariables&gt;] (/docs/ server-admin/ datasets# subsetables 變化) 標籤對如何ERDDAP™操作 EDDTable 数据集。
            * 你可以增加[數據庫的 EDD Table 速度](/docs/server-admin/datasets#database-speed)數據集。
            * 许多 EDDTable 数据集可以被加速[儲存數據的複本到NetCDF相關的標籤陣列檔案](/docs/server-admin/datasets#eddtablefromfiles),ERDDAP™讀得很快
            
如果需要幫助加速特定數據集, 包括描述問題和數據集的區塊datasets.xml看我們[部分](/docs/intro#support).
             
    * 如果 **一切**  inERDDAP™是 **永遠** 慢,問題可能是:
        * 正在運行的電腦ERDDAP™可能沒有足夠的內存或處理權力 。 跑得好ERDDAP™在現代多核心伺服器上 重用時, 伺服器應該有64位操作系統和 8 GB 或更多內存 。
        * 正在運行的電腦ERDDAP™可能也正在運行其他耗費大量系統資源的應用程式。 如果有, 您能否取得一個專用的伺服器 。ERDDAP? 例如 (這不是背書) , 您可以得到一個有 8 GB 記憶體的四核 Mac Mini 伺服器, 共 ~ 1 100 美元 。
             
    * 如果 **一切**  inERDDAP™是 **暫時** 慢點,看ERDDAP是[ **/erddap/status.html页 次** ](#status-page)在您的瀏覽器中。
        * 是否ERDDAP™要載入狀態頁面嗎 ?
如果是,[重新开始ERDDAP™](#shut-down-and-restart).
        * 做了ERDDAP™狀態頁面慢慢載入 (如, &gt; 5秒) ?
那表示一切ERDDAP™但這不一定是麻煩ERDDAP™也許只是很忙
        * 回答失敗的時間 (自上次主要載入Datasets起) ",是n=大量?
這表示最近有很多要求失敗。 可能是麻煩或麻煩的開始 失敗的中位數時間往往很大 (例如,2100毫秒) ,
也就是說... (是嗎?) 很多活性線索。
正在綁架大量資源 (如記憶體,開啟檔案,開啟套接字,...) ,
那可不好
        * 為"回應成功時刻" (自上次主要載入Datasets起) ",是n=大量?
表明最近有很多成功的要求。 這不是麻煩 意思是你ERDDAP™正在大量使用。
        * "非Tomcat等待線的數量" 是典型的數值嗎?
這常常是嚴重的麻煩ERDDAP™慢慢來 最後冷藏 如果持續數小時,你可能會想先進[重新开始ERDDAP™](#shut-down-and-restart).
        * 在「 Memory Use Summary」 清單的底部, 最後一個「 Memory: 目前使用」 值是否很高 ?
這可能只是表示使用率很高,或可能是麻煩的征兆。
        * 看看線條清單和狀態 他們的數目不一樣嗎?
             
    * 是 **您所在的網路連接** 目前慢?
搜索網路「網路速度測試」,[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). 如果你的機構的網絡連接很慢 那麼我們之間的連接ERDDAP™和遠端資料來源會很慢,ERDDAP™而使用者會很慢。 有時候,你可以停止不必要地使用網路來解決這件事 (例如,觀看流媒体或視頻會議電話的人) .
         
    * 是 **使用者的網路連接** 目前慢?
讓使用者在網路上搜尋「網路速度測試」,[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). 如果使用者的網絡連接速度慢,會拖慢他們的存取ERDDAP. 有時候,他們可以解決這個問題 停止在他們的機構使用不必要的網路 (例如,觀看流媒体或視頻會議電話的人) .
         
    *    **困住?**   
看我們的[部分](/docs/intro#support).

### 關閉並重新啟動{#shut-down-and-restart} 
*    **如何關閉和重新啟動Tomcat和ERDDAP™**   
你不需要關閉和重新啟動Tomcat和ERDDAP如果ERDDAP™暫時是慢的,有些已知原因 (如文稿中的很多要求或WMS使用者) 修改datasets.xml文件。
    
你需要關閉並重新啟動Tomcat和ERDDAP™如果您需要對設定值. xml 檔案套用變更, 或者ERDDAP™冷藏 掛起來 或鎖起來 在极端的情況下,Java可能會冷藏一兩分鐘, 所以最好等一兩分鐘看看Java/ERDDAP™或只是收集垃圾 (如果垃圾收集是共同的問題[將更多內存分配到Tomcat](/docs/server-admin/deploy-install#memory).) 
    
我不建議使用Tomcat網絡應用程式管理員 開始或關閉Tomcat。 如果你不完全關閉和啟動Tomcat, 你遲早會有PermGen記憶體的問題。
    
關閉並重新啟動Tomcat和ERDDAP:
    
    * 如果你使用 Linux 或 Mac :
         (如果您已建立特殊使用者來執行 Tomcat, 例如 Tomcat, 請記住要做為使用者的以下動作 。)   
         
        1. 使用 cd *湯姆卡* /本
             
        2. 使用 ps - ef|找到 java/ tomcat 行程的 grep tomcat 身份 (希望只列出一個流程) ,我們會稱呼 *Java 處理器* 下面。
             
        3. 如果ERDDAP™被冷冻/ 被困/ 被鎖住, 使用 kill - 3 *Java 處理器* 要告訴Java  (它正在執行 Tomcat) 要對 Tomcat 紀錄檔做串排: *湯姆卡* /日志/卡塔琳娜. 出去。 重新啟動後, 您可以找到線的垃圾資訊來分析問題 。 (以及其他任何有用的信息)  in *湯姆卡* 也透過讀取相關部分,[ERDDAP™日志歸檔](#log). 如果你想的話,你可以把這份資訊寫進去 看看我們[部分](/docs/intro#support).
             
        4. 使用... /shutdown。 噓
             
        5. 使用 ps - ef|在 java/ tomcat 行程未列出之前, grep tomcat 重复 。
            
有時, Java/tomcat 行程需要兩分鐘才能完全關閉。 原因是:ERDDAP™但有時要花很長時間才能到一個好的地方。
            
        6. 如果一分鐘后 Java/tomcat 自己不來 你可以用
殺 - 9 *Java 處理器*   
迫使java/tomcat 行程立即停止。 如果可能,只用此作为最后手段。 -9開關很強大 但可能會造成不同問題
             
        7. 要重新啟動ERDDAP™使用/啟動.sh
             
        8. 查看ERDDAP™在您的瀏覽器中檢查重启是否成功 。 (有時候你需要等30秒 試著加載ERDDAP™重新在您的瀏覽器中成功 。)   
             
    * 如果您使用 Windows :
         
        1. 使用 cd *湯姆卡* /本
             
        2. 使用shutdown.bat  
             
        3. 您可能想要/需要使用 Windows 工作管理器 (可通过 Ctrl Alt Del 存取) 确保Java/Tomcat/ERDDAP™行程/應用程式已完全停止 。
有時候, 行程/應用程式需要兩分鐘才能關閉 。 原因是:ERDDAP™但有時要花很長時間才能到一個好的地方。
             
        4. 要重新啟動ERDDAP™,使用啟動。bat
             
        5. 查看ERDDAP™在您的瀏覽器中檢查重启是否成功 。 (有時候你需要等30秒 試著加載ERDDAP™重新在您的瀏覽器中成功 。)   
             
### 常有崩塌或凍結{#frequent-crashes-or-freezes} 
如果ERDDAP™變慢、撞擊或凍結,有些不對勁 看里面[ERDDAP'log 檔](#log)試著找出原因 如果你做不到,請包括細節,看看我們[部分](/docs/intro#support).

最常見的問題是一個麻煩的使用者, 如果發生了這樣的事情,你可能應該列出使用者的黑名單 。 當黑名單使用者要求時, 答覆中的錯誤訊息會鼓勵他們用電子郵件來解決問題 。 那你可以鼓勵他們一次只執行一個腳本 並且解決他們的腳本中的問題 (例如, 要求遠端數據集的數據在時空結束前無法回應) . 看&lt;要求黑色列表&gt;datasets.xml文件] (/docs/server-admin/datasets# 要求黑名單) .

在极端的情況下,Java可能會冷藏一兩分鐘, 所以最好等一兩分鐘看看Java/ERDDAP™或只是收集垃圾 (如果垃圾收集是共同的問題[將更多內存分配到Tomcat](/docs/server-admin/deploy-install#memory).) 

如果ERDDAP™你通常可以解決問題。[重新啟動ERDDAP™](#shut-down-and-restart). 我的經驗是ERDDAP™不需要重新啟動 。
     

### 監控器{#monitor} 
你可以監控你ERDDAP查看[/erddap/status.html页 次](#status-page)上面的數據 如果ERDDAP™問題不僅是極重的用法,[重新啟動ERDDAP™](#shut-down-and-restart). 透過普羅米修斯的整合,

我的經驗是ERDDAP™不需要重新啟動 。 您只需要重新啟動它, 只要您要應用一些變更ERDDAP設定. xml 或當您需要安裝新版本時ERDDAP™,Java湯姆卡特 或者操作系統 如果您需要重新啟動ERDDAP™經常出事 看里面[ERDDAP'log 檔](#log)試著找出原因 如果你做不到,請包括細節,看看我們[部分](/docs/intro#support). 你可能會試著使用[摩尼特](https://mmonit.com/monit/)監控您的ERDDAP™如果需要, 重新啟動它 。 或者,你可以做一個工作 重新開始ERDDAP™  (主动) 定期。 寫作文稿使監控和重啟自动化可能有點挑戰性ERDDAP. 一些可能會有幫助的提示:

* 您可以使用 grep 的 - c 切換來简化測試, 如果 Tomcat 行程仍在執行中:
ps -u *湯姆卡 使用者*  |grep - c java (日文)
如果 tomcat 行程還活著, 輸出會減少到" 1" , 如果行程已停止, 輸出會減少到" 0" 。
     
* 如果你對gawk很在行,你可以從結果中提取處理ID
ps -u *湯姆卡 使用者*  |grep java, 並在文稿的其他行中使用處理ID 。
     

如果你真的安排了Monit或Cron工作 如果你能分享這些細節 這樣其他人就能看到我們[部分](/docs/intro#support)你可以分享的地方。

#### 常量{#permgen} 
如果您多次使用Tomcat 管理器重新載入 (停止并開始)  ERDDAP™,ERDDAP™或許不會開始扔Java.lang。 出自Memory Error:PermGen. 星洲网. 解决办法是定期 (還是每次?)  [關閉並重新啟動 Tomcat 及ERDDAP™](#shut-down-and-restart),而不是重新載入ERDDAP.
\\[更新 : 此問題已大大減少或固定在ERDDAP™1.24版本。\\]  
     
#### 日志{#log} 
*    **[log.txt](#log)**   
如果ERDDAP™如果事情不按預期運作的話,ERDDAP™日志文件。
    * 紀錄檔是 *大家长會* /logs/log.txt
         ( *大家长會* 指定于[設定. xml](/docs/server-admin/deploy-install#setupxml)) . 如果沒有木頭的話 txt 檔案或日志 。 txt 檔案自您重新啟動後沒有更新ERDDAP™你看[Tomcat 紀錄檔](#tomcat-logs)查看是否有錯誤訊息。
    * 紀錄檔中的診斷訊息類型 :
        * 當某件事出錯, 雖然犯錯很煩人, 我們的想法是 投出錯誤比有錯更好ERDDAP™一起走 以你沒想到的方式工作
        * 但程序得以完成。 這些很稀有
        * 其他的只是信息 您可以控制有多少信息被登入 []&lt;日志水平&gt;] (/docs/ server-admin/ datasets# loglevel 檔案)  datasets.xml.
        * 重新載入數據集和使用者回應需要 &gt; 10秒才能完成 (成功或失敗) 以 " (&gt;10s&#33;) ". 因此, 您可以搜尋此語言的log. txt 檔案, 以尋找重新載入速度慢的數據集或完成速度慢的要求的數據集 。 您可以在 log. txt 檔案中看起來更高一些, 看看數據集問題是什麼, 或是使用者要求什麼, 以及它來自誰 。 這些慢速的數據集和使用者要求有時會被收費ERDDAP. 所以了解更多這些要求可以幫助你找出和解決問題。
    * 資訊以相當大的區塊寫入磁碟驱动器上的紀錄檔 。 其優點是這很有效率...ERDDAP™永遠不會阻擋等待將資訊寫入紀錄檔 。 其缺点是, 紀錄幾乎總會以部分訊息結束, 在下一個區塊被寫入之前不會完成 。 你可以更新 (瞬間) 查看您的ERDDAP狀態網頁 : https://*your.domain.org*/erddap/status.html   (或http://如果https沒有開啟) .
    * 當log.txt檔案達到20 MB,
檔案已重新命名為日志。 txt. previous and a new log.txt 檔已建立 。 所以日志文件不堆積 。
        
在 setup.xml 中, 您可以在 MegaBytes 中指定紀錄檔的不同最大大小 。 最低限值是 1 (甲基溴) . 最多2000年 (甲基溴) . 缺省是20 (甲基溴) . 例如:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * 當你重新啟動時ERDDAP™,
        ERDDAP™建立log.txt和log的存档副本。 txt. 先前在檔案名下印有時間戳的檔案 。 如果在重新啟動前有問題, 分析這些已歸檔的檔案, 如果不再需要檔案, 您可以刪除檔案 。
         
##### 剖析日志.txt{#parsing-logtxt} 
ERDDAP日志。 txt 文件不是用于剖析的 (雖然您可能可以建立正規的表达式來提取想要的信息) . 它的設計是幫助一個人 找出出事時發生的問題 當您提交錯誤或問題報告到ERDDAP™開發者, 可能時, 請包含所有與 roadsome request 相關的 log. txt 檔案資訊 。

出于效率原因,ERDDAP™只寫入資訊以登入 。 txt 是在大量資訊累积之后。 所以,如果你看木。 txt 發生錯誤後, 可能尚未寫入與錯誤相關的信息 。 要從 log.txt 得到完整的最新資訊, 請參觀您的ERDDAP是[狀態.html頁面](#status-page). 什麼時候ERDDAP™流程,它會將所有待查資訊冲到log.txt。

為ERDDAP™使用數據, 請使用[Apache 和/或Tomcat 紀錄檔](#tomcat-logs)代替ERDDAP'log.txt. 注意:ERDDAP是[狀態.html頁面](#status-page)  (一些) 和[每日報告](#daily-report)  (更多) 有很多使用量的數據是預計的
    
### Tomcat 日志{#tomcat-logs} 
如果ERDDAP™不啟動, 因為早期發生錯誤ERDDAP啟動時, 會在 Tomcat 的日志檔中顯示錯誤訊息 ( *湯姆卡* /日志/卡塔琳娜。 *今天* ...log 或 *湯姆卡* /日志/卡塔琳娜。) 不在[ERDDAP'log.txt 文件](#log).

用法統計 : 人們想從紀錄檔收集的資訊 (例如,使用统计) ,請使用 Apache 和/或 Tomcat 日志檔。 它們格式化很好,有這種信息。 例如,[AWStats 中](https://www.awstats.org),[精靈Search的基巴納](https://www.elastic.co/products/kibana)和[J米器](https://jmeter.apache.org),但搜索網絡以找到您想要的正確工具。

注意, 日志檔案只辨識使用者是 IP 地址 。 有一些網站可以幫助您取得與指定的IP地址相關的信息,例如,[我的地址是什么](https://whatismyipaddress.com/ip-lookup), 但你通常找不到使用者的名字。

而且,因為[DHCP 程序](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol),特定使用者的IP地址在不同的日子可能不同,或者不同的使用者在不同的时间可能有相同的IP地址.

或者,你可以用一些像[谷歌分析](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision). 當您使用Google Analytics等外部服務時, 您將放棄使用者的隱私, 讓 Google 完全進入您的網站, (其他人呢?) 可以永遠保持 并用于任何目的 (也許不是技術上,而是實際上) . 可能不知道他們會在你的網站上被追蹤, 這些大公司正在監視他們在網路上所做的一切, (谷歌,Facebook等.) 以政府之名, (1984年) . 這促使許多使用者安裝產品,[隱私](https://www.eff.org/privacybadger/faq)要最小化追蹤, 要使用替代瀏覽器, 如[Tor 瀏覽器](https://www.torproject.org/)  (或關閉傳統瀏覽器的追蹤) ,并使用替代搜索引擎,例如[鸭子走](https://duckduckgo.com/). 若您使用 Google Analytics 等服務, 請至少記錄其用法及後果,&lt;標籤ERDDAP是
\\[湯姆卡\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml檔案.
    
### 電子郵件紀錄{#e-mail-log} 
*    **電子郵件LogYEAR-MM-DD.txt**   
    ERDDAP™總是在當天的電子郵件中寫入所有外傳電子郵件的文字 LogYEAR-MM-DD.txt 檔案 。 *大家长會* 紀錄 ( *大家长會* 指定于[設定. xml](/docs/server-admin/deploy-install#setupxml)) .
    * 如果伺服器不能發出電子郵件, 或者您已設定ERDDAP™不發送電子郵件, 或者如果你只是好奇, 這個檔案是看所有已發出的電子郵件的方便方式 。
    * 您可以刪除前幾天的郵件紀錄檔, 如果不再需要的話 。
         
### 每日報告{#daily-report} 
《每日報告》有很多有用的信息,ERDDAP是[/erddap/status.html页 次](#status-page)更多
    * 這是你最完整的概述ERDDAP狀態
    * 包括未載入的數據集清單,
    * 當你開始時它會產生ERDDAP™  (之后ERDDAP™完成試圖載入所有數據集) 每天早上7點後,
    * 每当產生它,它就寫到[ERDDAP'log.txt 文件](#log).
    * 當它被產生時,就會被發送到&lt;電子郵件 Daily Reports To &gt; 及&lt;所有郵件 至 &gt; (指定于[設定. xml](/docs/server-admin/deploy-install#setupxml)) 如果您已設定電子郵件系統 (在設定中.xml) .

### 狀態{#status-page} 
您可以查看您的狀態ERDDAP™從任何瀏覽器中傳到&lt;基底Url &gt;/erddap/status.html
* 此頁面是动态產生的, 所以它總是有您的最新時刻數據ERDDAP.
* 包括要求數量、 內存用量、 線串追蹤、 工作串等數據 。
* 因為狀態頁面可以讓任何人看到,所以它沒有包含太多資訊[每日報告](#daily-report).
         
### 新增/ 變更數據集{#addingchanging-datasets} 
ERDDAP™通常重讀datasets.xml每 *載入達泰斯minutes*   (指定于[設定. xml](/docs/server-admin/deploy-install#setupxml)) . 所以,你可以做修改到datasets.xml任何時間,即使ERDDAP™正在執行中。
很快會發現新的數據集, 通常在內部 *載入達泰斯minutes* .
已變更的數據集將重新載入 *重新載入每一個NMinutes* 舊 (按datasets.xml) .
    
#### 旗號{#flag} 
*    **[旗標檔案](#flag)告訴ERDDAP™試著盡快重載資料集** 
    
    *   ERDDAP™不會注意到數據集的設定有任何變更datasets.xml直到ERDDAP™重新載入數據集。
         
    * 告訴ERDDAP™盡快重新載入數據集( 在數據集之前)&lt;重新載入 EveryNminutes &gt; 會讓它重新載入, 將檔案放入 *大家长會* 旗 ( *大家长會* 指定于[設定. xml](/docs/server-admin/deploy-install#setupxml)) 和數據集同名的datasetID.
這說明ERDDAP™盡快重新載入數據集
數據集的舊版將繼續供使用者使用,直到新版可以使用並在解剖上互換到原位。
為EDDGrid從檔案與 EDD 表格 從 Files 中, 重新載入的數據集會尋找新的或已變更的檔案, 讀取這些檔案, 並將它們整合到數據集中 。 所以重新載入的時間取决于新增或變更的檔案數量 。
如果數據集有活性="假",ERDDAP™會移除數據集。
         
##### 壞文件旗號{#bad-files-flag} 
* /flag目錄的一個變體是/badFilesFlag目錄. (新增ERDDAP™v2.12.)   
如果你把檔案放在 *大家长會* / badFilesFlag 目錄中含有datasetID作为檔案名稱 (文件內容不重要) 即刻ERDDAP™看壞的檔案 旗舰檔案,ERDDAP™将:
    
    1. 刪除壞的 FilesFlag 檔案 。
    2. 刪除壞的檔案.nc文件 (如果有的話) , 它有數據集的不良檔案清單 。
如:EDDGrid有孩子的SideBySideDatasets, 此檔案也刪除壞的檔案.nc所有子數據集的檔案。
    3. 立即重新載入數據集 。
    
因此,原因ERDDAP™重新試著使用先前的檔案 (錯誤?) 標示為壞。
         
##### 硬旗{#hard-flag} 
* /flag目錄的另一变體是/hardFlag目錄. (新增ERDDAP™v1.74.)   
如果你放入檔案 *大家长會* 硬旗datasetID作为檔案名稱 (文件內容不重要) 即刻ERDDAP™看硬的 旗舰檔案,ERDDAP™将:
    
    1. 刪除硬旗檔案 。
    2. 移除數據集ERDDAP.
    3. 刪除所有資訊ERDDAP™已儲存此數據集。
為EDDGrid從檔案與 EDD 表格 從 Files 子类中刪除資料檔案及其內容的内部資料庫 。
如:EDDGridSideBySide 有子 Datasets 的, 此程式也刪除所有子數據集的資料檔案與內容的内部資料庫 。
    4. 重新載入數據集 。
為EDDGrid從檔案與 EDD 表格 從檔案子類別中, 這會造成ERDDAP™要重讀 **全部** 中。 因此,重新載入時間要依據數據集中的資料檔案總數而定 。 因為數據集被移除了ERDDAP™當硬旗被注意到時, 數據集將不可用, 直到數據集完成重新載入 。 耐心點 看里面[log.txt](#log)檔案,如果你想看看發生了什麼。
    
硬旗變體會刪除數據庫中存储的資訊, 即使數據庫目前尚未載入ERDDAP.
    
硬 當你做一些會改變ERDDAP™例如,當您安裝新版本的來源資料時,會讀取並解釋ERDDAP™或當您在datasets.xml
    
* 旗子、壞的FilesFlag和硬的Flag檔案的內容不相干 。ERDDAP™看看文件名datasetID.
     
* 在主要數據集重載之間ERDDAP™持續尋找旗子 壞的FilesFlag 和硬旗檔案 。
     
* 注意,當重新載入數據集時,所有檔案都在 *大家长會* /[快取](#cached-responses)/ *datasetID* 目錄已刪除 。 其中包括.nc和通常缓存 ~15 分鐘的影像檔。
     
* 注意如果数据集的 xml 包含[作用中="假"](/docs/server-admin/datasets#active),國旗會使數據集失去作用 (如果作用中) ,而且不管怎樣,不能重新載入。
     
* 隨時ERDDAP™執行載入Dataset以做大重載( 時間重載控制於&lt;載入 Datasets Minminutes &gt; 或小重載 (外旗或內旗) ,ERDDAP™全部讀取&lt;解壓CacheMaxGB&gt;,&lt;已解壓的CacheMaxMinutesOld &gt;,&lt;使用者 &gt;,&lt;要求黑色列表 &gt;,&lt;慢的TroubleMillis &gt; ,以及&lt;訂閱 Email Blacklist &gt; 標籤和切換到新設定值 。 所以,你可以用旗子來得到ERDDAP™注意這些標籤的變更 。

##### 設定數據集旗號{#set-dataset-flag} 
*  ERDDAP™已建立網頁服務, 以便通過 URL 設定國旗 。
    
    * 例如,
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (那是假旗子 金鑰) 會為 RPmelTao 數據集設立旗子 。
    * 每一個都有不同的旗鍵datasetID.
    * 管理員可以查看所有數據集的旗下網址清單[每日報告](#daily-report)電子郵件
    * 管理員應將這些網址視為機密, 因為這些網址讓人有權任意重設數據集。
    * 如果你覺得旗鑰匙落入了 虐待他們的人手中 你可以改變&lt;lagKeyKey &gt; 以[設定. xml](/docs/server-admin/deploy-install#setupxml)重新啟動ERDDAP強制ERDDAP™以產生和使用不同的旗鍵。
    * 如果你改變&lt;flangKeyKey&gt;,刪除所有的舊訂閱 (參考您每日報告中的清單) 并記住將新的網址發送給您想要的人。
    
國旗系統可以作為更高效的宣傳机制的基础ERDDAP™何时重新載入數據集 。 例如, 您可以設定數據集的&lt;重新載入 EveryNminutes &gt; 至大量 (例如,10080 = 1周) . 當你知道數據集變了 (也許是因為您在資料集的資料目錄中新增了檔案) ,设置旗號,使數據集能盡快重新載入。 通常會很快看到旗子。 但是如果LadyDataset 線線已經很繁忙, 可能要等一陣子才能在國旗上行動 。 但國旗系統比設置更靈敏 更有效率&lt;重載 EveryNminutes &gt; 到小數 。
    
#### 移除數據集{#removing-datasets} 
如果數據集作用於ERDDAP™您要暫時或永久關閉它 :
1. 在datasets.xml數據集, 集[作用中="假"](/docs/server-admin/datasets#active)。
2. 等等ERDDAP™在下次重載中移除數據集或[設定旗標](#flag)要顯示的數據集ERDDAP™盡快注意到這個變化 當你這麼做的時候,ERDDAP™不會丟掉它可能儲存的有關數據集的任何資訊,
3. 然後您可以將活性="假"的數據集留在datasets.xml或移除它。
         
#### 重新載入數據集時嗎 ?{#when-are-datasets-reloaded} 
叫做 RunLoadDatasets 的線程是重載數據集時控制主線程 。 跑步 數據集永續循环 :

1. runLoadDatasets 注意到目前時間 。
2. Run LoadDatasets 啟動一個 LoadDataset 線程來做一個「 MajorLoad 」 。 您可以在您的頂端看到關於目前/ 以前的 LOAD 少校的資訊ERDDAP是
    [/erddap/status.html页 次](#status-page)  (例如,[狀態頁面示例](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) .
    
    1. 載入Datasets 复制datasets.xml.
    2. 載入 Datasets 讀取副本datasets.xml而對於每個數據集,看看数据集是否需要 (re) 已載入或移除 。
        * 如果a[旗號](#flag)此數據集的檔案已存在, 檔案被刪除, 如果作用中 =“ 假的 ” 或 (re) 已載入( 如果作用中 )=" true" (不管數據集的年齡) .
        * 如果數據集的dataset.xml 區塊有作用="假",而數據集目前已載入 (作用中) 已卸下 (移除) .
        * 如果數據集有活性="真",且數據集尚未載入,則已載入.
        * 如果數據集有活性="真",而且數據集已經載入,如果數據集的年齡,數據集會重新載入 (上次載入的時間) 大于其&lt;重新載入 每度* (缺省 = 10080 分鐘) 不然,數據集就剩一個人了。
    3. 載入Datasets完成 。
    
RunLadDatasets 線程等待載入Dataset 線程完成 。 如果載入達塔塞斯比載入達塔塞斯更長 最小值 (按設定值. xml 指定) , RunLoadDatasets 中斷載入Dataset 線程 。 最理想的是, LoadDatasets 注意中斷並完成 。 但是如果它沒注意到一分鐘內就被打斷了 RunLoadDatasets呼叫載重Datasets. 停止 () 這不可取
3. 最後一個主要LOAD 啟動後的時代 不如載入 Datasets 最小值 (指定於 setup.xml, 例如 15 分鐘) , RunLoadDatasets 反复尋找[旗號](#flag)檔案 *大家长會* /lag目錄。 如果找到一個或多個國旗檔案, 它們會被刪除, RunLoadDatasets 啟動一個 LoadDataset 線程來做一個「 minorLoad 」 (主路德=假) . 你看不到小信息ERDDAP是[/erddap/status.html页 次](#status-page).
    1. 載入Datasets 复制datasets.xml.
    2. 載入 Datasets 讀取副本datasets.xml和,每一個有國旗檔案的數據集:
        * 如果數據集的dataset.xml 區塊有作用="假",而數據集目前已載入 (作用中) 已卸下 (移除) .
        * 如果數據集有活性="真",則數據集是 (re) 上膛,不管年齡 未標記的數據集被忽略 。
    3. 載入Datasets完成 。
4. 跑步 數據集回到第一階段

注:
* 啟動
當您重新啟動ERDDAP™,每套有「真」的資料都被載入。
* 快取
當數據集是 (re) 已載入, 它的快取 (包括任何資料回應檔案和/或影像檔案) 已空出。
* 很多數據集
如果您有許多數據集和/或一個或多個數據集會慢到 (re) 載入, 載入Datasets 線程可能需要很長的時間才能完成它的工作, 甚至比載入Datasets還長 明米努特斯
* 一個載入數據串
永遠不會有超過一個 loadDatasets 線程一次執行 。 如果在 LoadDatasets 已啟動時設定了國旗, 在 LoadDataset 線程結束之前, 國旗可能不會被注意到或動作 。 你可能會說:"那太蠢了. 你何不開始一串新線索來載入數據集?" 但是如果你有許多數據集 從一個遠端伺服器得到數據 連一個LoadDatasets線都會讓遠端伺服器壓力很大 如果你有許多數據集 從一個RAID的檔案中获得數據, 也一樣。 有不止一個LOUDDATASETS線線的回報迅速減少。
* 旗號 = ASAP
設立旗子只是表示數據集應該是 (re) 盡快載入, 不一定是立即的 。 如果目前沒有載入 Datasets 線程執行, 數秒內會開始重新載入數據集 。 但是, 如果一個 LoadDatasets 線程正在執行中, 在 LoadDatasets 線程完成之前, 數據集可能不會重新載入 。
* 旗標檔案已刪除
通常,如果你把旗子檔放入 *大家长會* /erddap/旗下目錄 (參考數據集的旗號 要不然就把文件放進去) , 數據集通常會在國旗檔案被刪除後很快重新載入 。
* 旗子對小重新載入 每分每秒
如果您有某些外部方式知道需要重新載入數據集的時機, 如果您方便的話, 确保数据集總是更新的最好方式就是設定其重新載入 每分每秒 (10080?) 建立旗子 (通過劇本?) 當它需要重新載入時。 就是這個系統EDDGrid從 Erddap 和 EDDTable From Erdddap 接收到需要重新載入資料集的信件 。
* 查看日志. txt
很多相關的資訊都寫到 *大家长會* /logs/log.txt檔案. 如果事情不按你所期望的運作 看木頭 txt讓你找出問題所在ERDDAP™是的
    
    * 搜尋「 主要 Load= true 」 以啟動主要載入數據集線程 。
    * 搜尋「 majorLoad=false 」 , 以啟動小的 LoadDatasets 線程 。
    * 搜尋指定的數據集datasetID關於它的信息 (re) 已載入或詢問 。
        
          
         
#### 逾期答复{#cached-responses} 
一般來說,ERDDAP™不快取 (儲存) 回答使用者的要求。 理由就是大多數要求會稍有不同 所以缓存效果不大 最大的例外是對影像檔案的要求 (自瀏覽器及程式類似於Google Earth常常重新要求影像) 和要求.nc文件 (因為它們不能在空中產生) .ERDDAP™將每個數據集的缓存檔案儲存在不同的目錄中 : *大家长會* /囊/ *datasetID* 因為一個缓存目錄可能有很多檔案 可能會變得很慢
文件從缓存中移除的原因有三:
* 此快取中的所有檔案在ERDDAP™重新啟動 。
* 周期性地,任何檔案都比&lt;缓存minutes &gt; 舊 (按[設定. xml](/docs/server-admin/deploy-install#setupxml)) 已刪除。 根據年齡移除快取中的檔案 (非最近使用) 確保檔案不會在缓存中呆太久 。 但這不是真的。 例如,atabledap包含時間的要求( T) &gt; *一些 時間* 如果有新的資料來到資料集, 會變更 。 以及包含\\[上次\\]如果有新的資料來到資料集, 時間維度會變化。
* 顯示錯誤條件的影像被缓存, 但只限幾分鐘 (情況很困難) .
* 每次重新載入數據集時, 數據集中的所有檔案都會被刪除 。 因為要求可能是"last"網格化的數據集中的索引, 当重新載入數據集時, 缓存中的檔案可能會失效 。
         
#### 儲存的資料集信息{#stored-dataset-information} 
各类數據集ERDDAP™當數據集被載入時, 收集大量資訊, 並將它保存在內存中 。 此允許ERDDAP™以快速回應搜尋、 數據集清單的請求,

數類數據集 (显著EDDGrid收到 EDD Table CopyEDDGrid從 *十二* 文件, 以及 EDD Table 從 *十二* 文件) ,ERDDAP™在磁碟上儲存一些重新載入數據集時重新使用的數據集的資訊。 這大大加速了重載行程 。

* 一些數據集資訊檔案是人可讀的.json檔案并儲存在 *大家长會* /dataset/ *last2LettersOf DatasetID/ 中斷datasetID* .
*   ERDDAP™只在不尋常的情況下刪除這些檔案, 例如, 如果您從數據集中新增或刪除變數datasets.xml很大。
* 數據集的大部分變更datasets.xml區塊 (例如, 改變全局屬性或變數屬性) 不需要您刪除這些檔案 。 普通的數據集重載會處理這些變更類型 。 你看得出來ERDDAP™以設定[旗號](#flag)用于數據集。
* 資料檔案的新增、刪除或變更也會在ERDDAP™重新載入數據集。 但是ERDDAP™如果數據集正在使用[&lt;更新 EveryNMILIS &gt; (/docs/server-admin/datasets#update Everynmillis / 更新所有資料) 系統。
* 您很少需要刪除這些檔案 。 你最需要強迫的情況ERDDAP™要刪除已儲存的信息 (因為它已經过时/不正確,不會被自動固定ERDDAP) 是當您修改數據集時datasets.xml區塊如何影響ERDDAP™解析來源資料檔中的資料, 例如更改時數變數格式字串 。
* 要從 anERDDAP™正在執行中 (即使數據集目前尚未載入) ,设置[硬 旗號](#hard-flag)那套數據 如果數據集是大量檔案的集合, 重新載入數據集可能需要大量時間 。
* 要刪除數據集已儲存的資訊檔, 當ERDDAP™不是跑,是跑[達斯Dds](/docs/server-admin/datasets#dasdds)數據集 (這比找出信息所在的目錄和手動刪除檔案容易) . 如果數據集是大量檔案的集合, 重新載入數據集可能需要大量時間 。
         
### 內存狀態{#memory-status} 
ERDDAP™不該撞上或凍死 如果有,最可能的原因是記憶力不足。 您可以透過查看狀態. html的網頁來監控記憶體的用量, 其中包括一行

0 gc 呼叫, 0 求救, 0 危險 自上次主要載入達塔斯後的內存郵件

 (越來越嚴重)   
和 MB inuses 及 gc 呼叫列。 你能分辨出你的記憶有多緊張ERDDAP™就是看這些數字 數目越多,壓力越大

* 使用量總是小于[\\- Xmx 內存設定](/docs/server-admin/deploy-install#memory). 數量大一點就是個壞兆頭
* gc 呼叫表示次數ERDDAP™要求垃圾收集者努力減輕高記憶體使用率。 如果這要大于100,那就代表了嚴重的麻煩。
* 顯示已放出的要求的次數 (HTTP 錯誤號為 503, 服務不可用) 因為內存用量已經太高了 最理想的情況是, 如果有幾個要求被拒絕了就沒事了 但是如果有許多人被釋放 就會有嚴重的麻煩
* 危險 記憶電子郵件 - 如果記憶體使用率變得危險,ERDDAP™發送電子郵件到清單中的電子郵件位址&lt;所有郵件 至 &gt; (在設定中.xml) 包含正在使用的使用者要求清單。 如電子郵件所說 請把這些電子郵件轉寄給克里斯 諾亞的約翰 我們能用這些資訊來改善未來的版本,ERDDAP.
     

如果你ERDDAP™有記憶力 :
* 考慮分配更多您的伺服器記憶體到ERDDAP™更改Tomcat[QQmx 內存設定](/docs/server-admin/deploy-install#memory).
* 如果你已經盡量分配了記憶力ERDDAP™透過 - Xmx, 考慮為您的伺服器购买更多記憶體 。 記憶很便宜 (與新伺服器的價格或您的時間相比) &#33; - 那就增加 - Xmx.
* 在datasets.xml设置&lt;nGridThreads &gt; to 1, 設定&lt;nTablethreads &gt; to 1, 并設定&lt;ipAddressMax RequestsActive &gt; 至 1.
* 看看log.txt中的低效或麻煩的要求 (但合法) 要求。 新增他們的 IP 位址到&lt;要求黑色列表 &gt;  indatasets.xml. 黑名單錯誤訊息包含ERDDAP™管理員的電子郵件地址, 希望這些使用者能聯繫你, 讓您與他們合作使用 。ERDDAP™更有效率。 最好保留一份IP地址清單, 列出黑名單和原因, 讓使用者聯系到您時可以與您合作 。
* 看看 dog.txt 中的恶意使用者的要求 。 新增他們的 IP 位址到&lt;要求黑色列表 &gt;  indatasets.xml. 如果類似要求來自多個類似 IP 位址, 您可以使用一些 Who - is service (例如,[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) 要從源碼中找出 IP 位址的範圍, 並列出整個範圍的黑名單 。 看&lt;Blacklist &gt; 文件] (/docs/server-admin/datasets# 要求黑名單) .
         
#### 出自記憶錯誤{#outofmemoryerror} 
當你建立ERDDAP™,您指定最大內存量Java可以通过[\\- Xmx 設定](/docs/server-admin/deploy-install#memory). 如果ERDDAP™永遠需要更多的記憶, 它會扔一個java。 朗 出自Memory Error。ERDDAP™做很多檢查,讓它能优雅地處理錯誤 (比如說 麻煩的請求會失敗 但系統保持其完整性) . 但有時錯誤會損壞系統的完整,你必須重新啟動ERDDAP. 希望是罕見的

快速而簡單的解答 一個出自記憶的錯誤是增加[\\- Xmx 設定](/docs/server-admin/deploy-install#memory), 但是您不該將 Xmx 設定增加至伺服器內存的80%以上 (例如, 对于 10GB 伺服器, 不要設定 - Xmx 高于 8GB) . 記憶體相对便宜, 所以增加伺服器的記憶體可能是很好的選擇 。 但如果您已將伺服器內存最大化, 或是因為其他原因無法增加, 您需要更直接地處理出記憶錯誤的原因 。

如果你看看[log.txt](#log)要查看的檔案ERDDAP™當錯誤發生時, 你通常可以得到一個很好的線索, 關於"出自記憶"的起因。 可能的原因很多,包括:

* 一個巨大的數據檔可以產生 OutOf MemoryError, 特别是巨大的 ASCII 數據檔 。 如果這是問題所在 那應該是明顯的 因為ERDDAP™無法載入數據集 (表格数据集) 或讀取檔案中的資料 (格子化的數據集) . 如果可行, 解決方案是將檔案分割成多個檔案 。 理想的是, 您可以將檔案分割成邏輯區塊 。 例如, 如果檔案有 20 個月 的 數據, 將它分成 20 個檔案, 每一個檔案都有 1 個月 的數據 。 但即使主檔案被任意分拆,也有其优点. (a) 這會把讀取資料檔所需的記憶體減少到1/20th, 因為每次只讀到一個檔案 。 (b) 常常ERDDAP™可以更快地處理要求, 因為它只需要查看一個或幾個檔案就可以找到給定要求的資料 。 c) 如果正在收集資料, 那麼现有的20個檔案可以保持原狀, 您只需要修改一個小的, 新檔案就可以將下一個月的資料值加入資料集 。
* 一個巨大的要求會造成記憶錯誤 特别是一些orderBy選項有全部回應的內存 (例如,做某種工作) . 如果回應很大,它會導致錯誤. 總有一些要求 以不同的方式 都太大了 您可以增加 - Xmx 設定來解決問題 。 或者, 你可以鼓勵使用者提出一系列小的要求 。
* 大量檔案不太可能會引起檔案索引ERDDAP™建立到檔案會產生錯誤 。 如果我們假設每個檔案都使用300字節,那么100萬個檔案只會占用300MB. 但數據檔數量巨大的數據集引起其他問題ERDDAP尤其要花很長的時間ERDDAP™在回應使用者的數據要求時開啟所有這些資料檔。 在此情况下, 解決辦法可能是將檔案聚合, 以便少數數資料檔案 。 對表格化的數據集來說,如果您從目前的數據集中儲存數據到[CF 分解采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)相關的標籤數據檔 (要求.ncCF 文件來自ERDDAP) 然后制作新的數據集。 這些檔案可以非常高效地處理ERDDAP是[来自 NcCFF 的 EDD 表格](/docs/server-admin/datasets#eddtablefromnccffiles). 如果它們有理有理 (每個都有數量的數據) ,ERDDAP™可以很快地從它們中提取資料。
* 使用 [&lt;subsetVariables&gt;] (/docs/ server-admin/ datasets# subsetables 變化) 屬性,ERDDAP™建立這些變數的數值的獨特组合表。 大型數據集或什麼時候&lt;subsetVariables&gt; 設定錯誤, 此表格可能大到會產生錯誤 。 解答是從清單中移除變數&lt;subsetVariables&gt; 數值很多, 或是按需要移除變數, 直到表格大小合理 。 部分ERDDAP™使用subsetVariables系統不起作用 (例如,網頁載入速度非常慢) 當桌子上有10萬列以上的時候
* 可能會有幾項大要求 (真的很忙ERDDAP) 可以組合在一起引起記憶的麻煩 例如, 8 個請求, 每一個使用 1GB , 會造成 - Xmx= 8GB 設定的問題 。 但每個要求都無法同时使用記憶體, 你很容易就能看到你的ERDDAP™正在忙于大的要求。 但有可能 除了增加 - Xmx 設定之外,
* 還有其他的情況 如果你看[log.txt](#log)要查看的檔案ERDDAP™當錯誤發生時,你通常可以得到 關於原因的線索。 在大多數情況下 有辦法把問題最小化 (见上文) 但有時你只需要更多的記憶力和更高的Xmx設定值
         
### 開啟的檔案太多{#too-many-open-files} 
從開始ERDDAP™v2.12,ERDDAP™有監控開啟的檔案數量的系統 (包括套接字和其他東西, 不只是檔案) 在Linux電腦上的Tomcat。 如果一些檔案錯誤地永遠不會被關閉 ("資源泄露") , 開啟的檔案數量可能會增加, 直至它超越操作系統所允許的上限, 以及發生了很多真正的壞事 。 所以現在在Linux電腦上 (因為Windows沒有資訊) :

* 狀態最右邊有一列「 開啟檔案」 。 html 的網頁顯示最大檔案開啟百分比 。 在Windows上,它只顯示"?"
* 什麼時候ERDDAP™產生每個主要數據集重新載入末端的資訊, 它會打印到日志中 。 txt 檔案 :
開啟檔案 *目前* 最大值= *最大* %= *百分比* 
* 如果百分比大于50%,會發送郵件至ERDDAP™管理員和電子郵件 一切 去電子郵件地址

如果百分比是100%,ERDDAP™麻煩大了 不要讓這發生。
如果百分比大于75%,ERDDAP™近於可怕的麻煩。 不行
如果百分率大于50%,就很可能造成百分率上升。
如果百分比永遠大于50%,您應該:
* 增加任何一個開啟的檔案的最大數量 :
    * 在你開始做tomcat之前每次都做這些改變 (把它們放進Tomcat啟動檔裡?) :
ulimit - Hn 16384
ulimit -Sn 16384
    * 或用編輯來做永久的改變 (作为根) /etc/security/limits.conf 并新增行 :
Tomcat 軟無檔 16384
Tomcat 硬文件 16384
這些指令假設管理Tomcat的使用者叫做"Tomcat".
在很多 Linux 變體上, 您必須重新啟動伺服器來應用這些變更 。 上面的"16384"是例子。 你選擇你認為最好的號碼
* 重新啟動ERDDAP. 操作系統會關閉任何開啟的檔案 。
         
### 要求失敗{#failed-requests} 
*    **异常活動 : &gt; 25%的要求失敗**   
通常每15分鐘一次ERDDAP™檢查自上次重新載入 Datasets 後失敗的請求百分比 。 如果大于25%,ERDDAP™發送郵件到ERDDAP™具有「 异常活動 : &gt; 25% 的要求失敗 」 主题的管理員 。 這封電子郵件包括一個名為「 請求者 IP 地址」 的底部的清點 (失敗)   (自上次主要載入Datasets) ". 找找看 它告訴你電腦的 IP 位址 。 您可以在 :\\[大家长會\\]/日志/[log.txt](#log)看看他們在提出什麼樣的要求。
    
您可以使用使用者的 IP 號碼 (例如,与[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) 試著找出使用者是誰或是什麼。 有時這會很准确地告訴你使用者是誰 (例如,它是搜索引擎的網頁爬行器) . 大多數時候它只是給你一個線索 (比如說,這是一個阿馬佐諾斯電腦, 是某所大學的,是某個城市的人) .
    
查看實際要求、IP號碼和錯誤訊息 (全部來自[log.txt](#log)) 對於一系列的錯誤,你通常可以 基本找出什么是錯的。 根據我的經驗,
    
1) 要求是恶意的 (例如,查找安全缺陷,或提出要求,然后在完成之前取消) . 你應該用&lt;要求黑色列表 &gt;  indatasets.xml以黑名單列出那些IP地址。
    
2) 搜索引擎幼稚地試用其中列出的 URLERDDAP™网页和ISO 19115文件。 例如, 列出底座的地方很多OPeNDAP例如 URL, https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST ,使用者應該加入檔案類型 (例如,.das,.dds, .html) . 但搜索引擎并不知道 向基址的要求失敗 。 或試圖填表以取得「隱藏」網頁。 但搜索引擎常常做壞事 導致失敗 答案是:[机器人.txt](#robotstxt)文件。
    
3)有些使用者正在執行一個文稿, 也許是曾經存在的數據庫 但現在已經不見了 (暂时或永久) . 文稿往往不料如此 所以不要明智地處理 所以文稿總是在要求 要求就一直失敗 如果你能猜到使用者是誰 (從上面的 IP 號碼) 中, 聯繫他們, 告訴他們數據集已不可用, 請他們改變他們的文稿 。
    
4) 一些數據集真的有問題. 通常ERDDAP™將會使困難的數據集失去作用 。 有時它不會 所以所有的要求都會有錯誤 如果有, 請解決數據集的問題或 (如果你做不到) 設定數據集為[作用中="假"](/docs/server-admin/datasets#active). 當然,這可能導致問題2。
    
有時錯誤也不算太嚴重,ERDDAP™能夠偵測錯誤並迅速回應 (S)&lt;=1ms). 所以你可以不動手了
    
如果其他都失敗, 有一個通用的解答: 將使用者的 IP 數字加入 [&lt;要求Blacklist &gt;] (/docs/server-admin/datasets# 要求黑名單) . 這並沒有看起來那么糟糕或激烈的選擇 使用者會收到一個錯誤訊息, 說 s/he 已被列入黑名單, 並告訴他們您的 (该ERDDAP™管理者) 電子郵件地址 有時使用者會聯系你 你可以解決問題 有時使用者不聯繫你,你第二天就會看到不同的IP號碼裡有同樣的行為。 列出新的IP號碼, 希望他們能收到訊息 。 (或 這是 你 們 的 土木 日 、 你 們 必 逃不掉 的 抱歉) 
    
### 机器人.txt{#robotstxt} 
搜索引擎公司使用網頁爬行器 (例如,谷歌 瓶) 以檢視網路上的所有頁面, 將內容加入搜尋引擎。 為ERDDAP™基本上很好ERDDAP™所以爬行者會找到所有的網頁, 加入搜索引擎。 搜尋引擎的使用者可以找到您的數據集ERDDAP.
    
可惜,有些網上爬行者 (例如,谷歌 瓶) 正在填表並提交表格,以便找到其他內容。 對於網路商業網站, 但這太可怕了ERDDAP™因為它只是導致 **無限** 數目中, 這會比其他使用者的數據要求要多。 它讓搜索引擎充斥著 無意义的數據
    
要讓網頁爬行者停止填表, 只是一般不看他們不需要看的網頁, 你需要建立一個叫做文字檔案[机器人.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)在您網站文件階級的根目錄中, 以便任何人都可以將它視為, 例如, : http://*www.your.domain*/robots.txt .
如果你在創造新的機器人 txt 文件, 這是個好開始 :
```
    User-Agent: \\*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\\*?
    Disallow: /\\*?\\*
    Disallow: /\\*.asc\\*
    Disallow: /\\*.csv\\*
    Disallow: /\\*.dods\\*
    Disallow: /\\*.esriAscii\\*
    Disallow: /\\*.esriCsv\\*
    Disallow: /\\*.geoJson\\*
    Disallow: /\\*.htmlTable\\*
    Disallow: /\\*.json\\*
    Disallow: /\\*.mat\\*
    Disallow: /\\*.nc\\*
    Disallow: /\\*.odvTxt\\*
    Disallow: /\\*.tsv\\*
    Disallow: /\\*.xhtml\\*
    Disallow: /\\*.geotif\\*
    Disallow: /\\*.itx\\*
    Disallow: /\\*.kml\\*
    Disallow: /\\*.pdf\\*
    Disallow: /\\*.png\\*
    Disallow: /\\*.large\\*
    Disallow: /\\*.small\\*
    Disallow: /\\*.transparentPng\\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
     (但取代 *你的機構,url* 和你的ERDDAP基址 。)   
搜尋引擎可能需要數天才注意到,
     
### sitemap.xml{#sitemapxml} 
如:[ https://www.sitemaps.org ](https://www.sitemaps.org/)網站上說:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

其實,自從ERDDAP™是RESTful搜索引擎蜘蛛很容易爬到你身上ERDDAP. 但他們更常這樣 (每天&#33;) 必要 (每月?) .

* 因為每個搜索引擎都爬遍了你的全部ERDDAP™每天都會有很多不必要要求
* 所以ERDDAP™產生您的 sitemap.xml 文件ERDDAP™它告訴搜索引擎,你的ERDDAP™每個月都要爬起來
* 您應該加入一個參考ERDDAP' sitemap.xml 到您的[机器人.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)文件 :
項目 : http://**www.yoursite.org**/erddap/sitemap.xml
 
* 如果這似乎沒有把訊息傳給爬行者, 您可以透過這些網址來告訴各種搜尋引擎 。 (但變更 **您的機構** 以及 **www.yoursite.org** 敬你ERDDAP網址) :
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I 你只要按下每一個搜索引擎一次就可以了 搜尋引擎會定期檢測到網站map.xml的變更 。
     
### 資料傳送/ 資料傳送 網路 :Push和Pull科技{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* 通常ERDDAP™充当中介: 它需要使用者的請求; 從遠端資料來源取得資料; 重寫資料; 並傳送給使用者 。
*   [Pull科技](https://en.wikipedia.org/wiki/Pull_technology):ERDDAP™也有能力從遠端資料來源中积极取得所有可用的資料,[儲存本地資料副本](/docs/server-admin/datasets#eddgridcopy).
*   [Push科技](https://en.wikipedia.org/wiki/Push_technology): 使用ERDDAP是[订阅服务](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions),其他數據伺服器一旦有新數據即可通知,以便他們可以要求資料 (通过拉動數據) .
*   ERDDAP是[EDDGrid來自 Erddap](/docs/server-admin/datasets#eddfromerddap)和[EDD 表格來自 Erddap](/docs/server-admin/datasets#eddfromerddap)使用ERDDAP訂閱服務[旗子系統](#flag)以便一旦有新的資料,立即通知。
* 你可以把這些合在一起 效果很好: 如果你包圍一個EDDGrid抄送EDDGrid從 Erddap 資料集 (或用 EDDTable 資料包裝 EDDTable Copy) ,ERDDAP™會自動建立並維持另一個本地副本ERDDAP數據集
* 因為訂閱服務一有新資料就起作用, (秒內) .

此架构各有ERDDAP™主管确定他/她的資料所在的管理人ERDDAP™來自

* 其他ERDDAP™行政官也可以這樣 行政官不需要协调。
* 如果多ERDDAP™管理者互相連接ERDDAPs, 形成數據分配網路 。
* 資料將快速、高效、自動從資料來源傳送 (ERDDAPs 和其他伺服器) 到資料再分配站點 (ERDDAPs) 網絡裡的任何地方
* 給定ERDDAP™既可以是某些数据集的資料來源,也可以是其他数据集的再分配站點。
* 由此建立的網絡大致類似於數據分配網絡,[Unidata'IDD/IDM'](https://www.unidata.ucar.edu/projects/index.html#idd)但不太僵硬
         
### 安全、認證和授權{#security-authentication-and-authorization} 
假設ERDDAP™以完全公開的伺服器執行 (使用http和/或https) 沒有登入 ([認證](https://en.wikipedia.org/wiki/Authentication)) 系統和不限制存取資料 ([批准](https://en.wikipedia.org/wiki/Authorization)) .

#### 安全{#security} 
如果您要限制部分或所有數據集的存取, 您可以使用ERDDAP內置安全系統 使用安全系統時:

*   ERDDAP™使用[基于角色的存取控制](https://en.wikipedia.org/wiki/Role-based_access_control).
    * 其ERDDAP™管理員用 [S] 定義使用者&lt;使用者 &gt;] (/docs/server-admin/dataset#user) 標籤datasets.xml. 每個使用者都有使用者名稱、密碼 (如果認證=自訂) ,以及一个或多个角色。
    * 其ERDDAP™管理員用 [] 定义哪些角色可以存取給定的数据集 。&lt;可存取到 &gt;] (/docs/server-admin/datasets#存取) 標籤datasets.xml任何不能公開存取的數據集
* 使用者的登入狀態 (和登入/登出的連結) 。 (但登入的使用者似乎ERDDAP™如果使用httpURL.) 
* 如果&lt;BaseUrl &gt; 您在設定中指定的. xml 是一種 **http** 未登入的 URL 使用者可能會使用ERDDAP是 **http** URLs. 如果&lt;也指定了 baseHttpsUrl&gt;,未登入的使用者也可以使用httpsURLs.
* 只有 HTTPS -- 如果&lt;BaseUrl &gt; 您在設定中指定的. xml 是一種 **https** URL, 未登入的使用者被鼓勵 (不强制) 要使用ERDDAP是 **https** 網址 - 所有連結在ERDDAP™网页httpsURLs.
    
如果您要強迫使用者使用httpsURL,在內部新增一款重定向永久行&lt;VirtualHost QQ: 80 &gt; 在您的 Apache 配置檔的區域 (通常httpd.conf) 例如,
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

如果你想的話,還有另一种方法 強迫使用https: [HTTP 嚴格交通安全 (重點) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security). 用它:
    
    1. 開啟 Apache 信頭模組: a2enmod 信頭
    2. 在 HTTPS VirtualHost 指令中新增信頭 。 最大年齡以秒計, 可以設定到一些長值 。
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
请注意此信頭只在 HTTPS 虛擬Host 上有效 。
    
不強迫使用者使用的理由httpsURL是: 基本的 SSL/ TLS 連結需要時間建立, 然后需要時間加密和解密使用者和伺服器之間傳送的所有信息 。 但有些机构需要https只有
    
* 在 MUST 使用中登入的使用者ERDDAP是 **https** URLs. 如果他們用httpURL,它們看起來是ERDDAP™不登入。 這能確保通信的隱私,[階段劫持和侧面劫持](https://en.wikipedia.org/wiki/Session_hijacking).
* 沒有登入的任何人都可以存取和使用公共資料集。 假設, 如果使用者沒有登入, 私人數據集不會出現在數據集清單中 。 如果管理員設定了. xml 的設定&lt;將 PrivateDatasets 列為真, 它們會出現。 試圖要求私人數據集提供資料 (如果使用者知道 URL) 將重定向到登入頁面。
* 任何登入者都可以從任何公共數據集和任何私人數據集中看到並要求資料, 假設使用者沒有存取權的私人數據集不出現在數據集清單中 。 如果管理員設定了. xml 的設定&lt;將 PrivateDatasets 列為真, 它們會出現。 試圖從使用者無法存取的私人資料集中要求資料, 會重新定向到登入頁面 。
* 其RSS完全私密數據集的資訊只供使用者使用 (和RSS讀者) 被登入并被授權使用此數據集的人 所以RSS對完全私人化的數據集不甚有用 。
    
如果數據集是私有的, 但是它的 [&lt;圖形存取&gt; (/docs/server-admin/datasets#graphsaubelto) 數據集的RSS任何人都可以
    
* 只有在使用者可以存取數據集時才能建立電子郵件訂閱功能 。 如果使用者訂閱私人數據集, 在使用者登入後, 訂閱仍會繼續運用 。

##### 設定安全{#setup-security} 
建立安全/核证/授权制度:

* 做標準ERDDAP™ [初始設定](/docs/server-admin/deploy-install).
* 在[設定. xml](/docs/server-admin/deploy-install#setupxml),
    * 新增/更改&lt;認證值 &gt; 從無值到自訂值 (不要用這個) 電子郵件 (不要用這個) 谷歌 (推荐) , orcid 。 (推荐) ,或 oauth2 (被建議為 google+orcid) . 以下是對這些選擇的評論。
    * 新增/更改&lt;baseHttpsUrl &gt; 值。
    * 插入/解析&loginInfo; in&lt;啟動 BodyHtml &gt; 在每頁的頂端顯示使用者的輸入/輸出資訊 。
* 為了在你個人電腦上做測試[遵循這些指令設定 tomcat 支援 SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (依据https連接) 建立按鍵[自簽名憑證](https://en.wikipedia.org/wiki/Self-signed_certificate)修改 *湯姆卡* /conf/ server.xml 來解析端口8443的連結器 。 在 Windows 上, 您可能需要將 . keystore 從 "c:\\ users\\\" 移動 。 *你* \\. keystore 至 "c:\\ Users\\ Default User\\. keystore" 或 "c:\\. keystore" (你看 *湯姆卡* /日志/卡塔琳娜。 *今天* 如果應用程式不載入, 或是使用者無法在頁面上看到紀錄, 則log) . 您可以在登入時看到 . keystore 憑證將在何時到期 。
    
對於公開的伺服器, 而不是使用自簽的憑證, 強烈建議您買下並安裝一個簽署的憑證 。[憑證授權](https://en.wikipedia.org/wiki/Certificate_authority)因為這能讓你的客戶更確信 他們真的與你有關ERDDAP™不是中間人的版本ERDDAP. 許多銷售商都賣數位證件。 (搜网.) 不貴的
    
* 在 Linux 電腦上, 如果Tomcat 用 Apache 執行, 請修改 /etc/httpd/ conf.d/ ssl.conf 檔案允許 HTTPS 通訊到/從ERDDAP™不需要 URL 中的 : 8443 端口號碼 :
    1. 修改已有的&lt;VirtualHost &gt; 標籤 (如果有的話) ,或者在檔案的尾部添加一首,以便它至少有這些行 :
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. 重新啟動 Apache: /usr/ sbin/ apachectl -好极了 (但有時它會在不同的目錄中) .
* 在 *湯姆卡* /conf/server.xml,不批判端口=8443&lt;連接器 &gt; 標籤 :
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
并更改憑證KeystoreFile的位置。
##### 授權{#authorization} 
*   [在datasets.xml建立](#authorization)[&lt;使用者 &gt;] (/docs/server-admin/dataset#user) 標籤, 每個使用者都有使用者名稱、 密碼 (如果授權=定制) 角色信息 這是授權部分ERDDAP安全系統
     
* 在datasets.xml,添加 [&lt;可存取到 &gt;] (/docs/server-admin/datasets#存取) 標籤到每個不該有公開存取的資料集 。&lt;可存取的To &gt; 讓您指定哪些角色可以存取此数据集 。
     
* 重新啟動Tomcat。 麻煩? 看看Tomcat的日志
     
* 看看你的工作&#33; 任何錯誤都可能导致安全漏洞
     
* 檢查登入頁面是否使用https  (不是http) . 试图通過登入http自動重定向到https和港口 8443 (雖然端口號碼可能通过 Apache 代理伺服器隱藏) . 您可能需要與您的網路管理員合作, 允許外部的網頁要求存取您的伺服器上的端口 8443 。
     
* 你可以改變&lt;使用者 &gt; 和&lt;可存取的To &gt; 標籤。 變更會在任何數據集的下一個正規重新載入時被套用, 或者如果您使用一個[旗號](#flag).

##### 認證{#authentication} 
[ **認證 (登入) ** ](#authentication)  
如果您不想讓使用者登入, 不要指定數值&lt;認證&gt; in setup.xml.
如果您真的想要讓使用者登入, 您必須指定一個值&lt;認證&gt;。 目前,ERDDAP™支援
[自訂](#custom)  (不要用這個) ,
[郵件](#email)  (不要用這個) ,
[谷歌](#google)  (推荐) ,
[ or](#orcid)  (推荐) 和
[au2](#oauth2)  (推荐) 。
如果你想登入, 我們強烈建議使用google、 orcid 或 oauth2 選項, 因為它們可以讓您免去儲存及處理使用者的密碼 。 (自訂需要) 而且比電子郵件更安全 記住使用者常在不同網站使用相同的密碼。 所以他們可能會用相同的密碼ERDDAP™就像他們在銀行所做的一樣 他們的密碼非常有價值 對使用者來說比他們要求的數據更有價值 所以,你需要盡力 保持密碼的私密性。 責任重大 電子郵件、google、orcid、Oauth2等選項處理密碼, 所以你可以脫離責任

全部&lt;認證 &gt; 選項使用 a[餅乾](https://en.wikipedia.org/wiki/HTTP_cookie)在使用者的電腦上, 所以使用者的瀏覽器必須設定以允許 cookie 。 如果使用者正在做ERDDAP™電腦程式的要求 (不是瀏覽器) 曲奇和認證都很難用 這是所有認證系統的共同問題 抱歉

具体&lt;認證&gt; 选项是:

###### 自訂{#custom} 
自訂ERDDAP用於在網頁上以表格輸入使用者名稱和密碼的自訂系統讓使用者登入 。 如果使用者在10分鐘內試著3次登入, 這阻止了黑客在找到正確的密碼之前 試著使用數百萬的密碼

這有些安全, 因為使用者名稱和密碼是通过https  (不是http) , 但是認證=google, orcid, 或 oauth2 更好, 因為它們讓你不必處理密碼 。 自訂方法要求您收集使用者姓名及密碼的散列文摘 (用你的手機&#33; 電子郵件不安全&#33;) 存放在datasets.xml在 [&lt;使用者 &gt;] (/docs/server-admin/dataset#user) 標籤。

使用自訂選項, 沒有人可以登入, 直到您 (该ERDDAP™管理者) 建立&lt;使用者的標籤, 指定使用者名稱為使用者名稱、 密碼的散列摘要為密碼、 以及作用 。

未推荐
因為產生和傳輸使用者密碼的散列文摘很尷尬,ERDDAP™持有密碼的散列摘要, 此選項不建議 。

要增加此選項的安全性:

* 您必須確保伺服器上的其他使用者 (即 Linux 使用者, 不ERDDAP™使用者) 無法讀取 Tomcat 目錄中的檔案 (尤其是datasets.xml檔案&#33;) 或ERDDAP大父母董事。
Linux 上, 作為使用者=tomcat, 使用 :
chmod - R g - rwx *大家长會*   
chmod - R o - rwx *大家长會*   
chmod - R g - rwx *Tomcat 介面*   
chmod - R o - rwx *Tomcat 介面*   
     
* 使用UEPSHA256&lt;密碼編碼&gt; in setup.xml.
     
* 使用安全即用方法,將使用者密碼的散列摘要從使用者傳送至使用者ERDDAP™管理者 (手机?) .
         
###### 郵件{#email} 
電子郵件認證選項使用使用者的電子帳號來驗證使用者 (發送信件給他們,給他們一個特殊的連結,以便登入) . 不像其他電子郵件ERDDAP™發送ERDDAP™不將這些邀請電子郵件寫入郵件日志檔, 因為其中包含保密資訊 。
這在理論上不是很安全, 因為電子郵件並不都是加密的, 所以一個有能力截取電子郵件的壞人,
實際上,如果你建立ERDDAP™以使用 Google 電子郵件帳號來發送電子郵件, 如果你設置它以使用 TLS 的一個選項來連接, 如果使用者有 Google 的電子郵件帳號, 這會有些安全, 因為電子郵件是加密的 。ERDDAP™到使用者。

要增加此選項的安全性:

* 确保伺服器上的其他使用者 (即 Linux 使用者, 不ERDDAP™使用者) 無法讀取 Tomcat 目錄中的檔案或ERDDAP大父母董事。
Linux 上, 作為使用者=tomcat, 使用 :
chmod - R g - rwx *大家长會*   
chmod - R o - rwx *大家长會*   
chmod - R g - rwx *Tomcat 介面*   
chmod - R o - rwx *Tomcat 介面*   
     
* 設定一些東西, 以取得電子郵件的端到端的安全性ERDDAP™致使用者。 例如,你只能建立以谷歌为中心的系統&lt;使用者&gt; Google 管理的電子郵件地址的標籤, 以及設定您的ERDDAP™用 Google 電子郵件伺服器通過安全/ TLS 連接: 在您的設定中. xml, 例如 :
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

未推荐
不建議使用電子郵件認證選項 。 請使用google、 orcid 或 oauth2 選項 。

和谷歌、野獸和Oauth2的選項一樣,ERDDAP™管理者們 不需要處理密碼或他們的散列文摘 你只需要創造一個&lt;使用者 &gt;] (/docs/server-admin/dataset#user) 使用者的標籤datasets.xml是使用者的電子郵件位址,ERDDAP™使用者名。 (密碼屬性在認證=email, google, orcid 或 oauth2 時不使用 。) 

使用電子郵件選項, 只有使用者有&lt;使用者 &gt; 標籤在datasets.xml可以試著登入ERDDAP™提供他們的電子郵件地址,ERDDAP™派他們來

ERDDAP™將電子郵件地址視為不敏感大小寫 。 它通過轉換您輸入的電子郵件位址( 在&lt;使用者&gt;標籤)或使用者輸入 (登入表單) 全部小寫版本。

要設定認證=電子郵件 :

1. 在您的設定中, xml 更改&lt;baseHttpsUrl &gt; 標籤的值。
在你的個人電腦上實驗/工作,使用
     https://localhost:8443   
為了你的公眾ERDDAP™使用
     https://*your.domain.org*:8443   
或者不使用 :8443 如果你使用 Apache[代理通道](/docs/server-admin/deploy-install#proxypass)所以不需要端口號碼
     
2. 在您的設定中, xml 更改&lt;認證&gt; 標籤的電子郵件值 :
```
    <authentication>email</authentication>  
```

3. 在您的設定中( xml ), 確保電子郵件系統通過所有的設定&lt;電子郵件... &gt; 標籤, 因此ERDDAP™可以發送電子郵件。 如果可能, 設定此項以使用安全連線 (SSL / TLS) 到電子郵件伺服器。
     
4. 在你的datasets.xml,建立 [&lt;使用者 &gt;] (/docs/server-admin/dataset#user) 使用私人數據集的使用者的標籤 。
使用使用者的電子郵件位址做標籤中的使用者名稱 。
不要指定使用者標籤中的密碼屬性 。
     
5. 重新啟動ERDDAP™以變更設定. xml 和datasets.xml生效。
         
###### Google, orcid, oauth2{#google-orcid-oauth2} 
*   [ **谷歌** ](#google),[ ** or** ](#orcid)和[ **au2** ](#oauth2)   (推荐)   
這三項選擇都是建議的ERDDAP™認證選項 。 他們都是最安全的選擇 其他的選擇安全性很弱
     
###### 谷歌{#google} 
* Google 認證選項使用[簽署 加入谷歌](https://developers.google.com/identity/gsi/web/guides/overview),即[OAuth 2.0 認證协议](https://oauth.net/2/).ERDDAP™使用者簽署到他們的 Google 電子郵件帳戶, 包括 Google 管理的帳戶, 例如@noaa.gov帳戶。 此允許ERDDAP™以驗證使用者的身份 (姓名和電子郵件地址) 並存取他們的設定圖像,但不提供ERDDAP™使用他們的電子郵件、Google Drive,
    
為ERDDAP™v2.22及以下,ERDDAP™使用 Google sign- in 。 Google表示, 如果你還沒有做,請切換到ERDDAP™v2.23+ 使用新的基于 Google 的認證系統 。
    
為ERDDAP™v2.23 設定了內容- 安全政策并使用 Google 認證的例, 您需要新增 https://accounts.google.com 到允許的文稿列 (或文稿-src-elem) .ERDDAP™不再使用 https://apis.google.com 所以如果你有權力的話 你可能現在可以移除它
    
為ERDDAP™v2.24+ 您可能需要添加 https://accounts.google.com/gsi/style 到 stlye-src 和 https://accounts.google.com/gsi/ 要連接- src。 您現在可以用到的文稿弧 https://accounts.google.com/gsi/client.
 
    
欲了解更多信息,您可前往[谷歌頁面](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)關於 CSP 設定 。 如果你有任何問題 請聯繫諾亞戈夫的chris.john
         
###### 野獸{#orcid} 
* 硬體認證選項用法[Orcid 認證](https://members.orcid.org/api/integrate/orcid-sign-in),即[OAuth 2.0 認證协议](https://oauth.net/2/).ERDDAP™使用者簽署到他們的[野獸帳號](https://members.orcid.org/api/integrate/orcid-sign-in)研究者通常用它來辨認自己 此允許ERDDAP™以驗證使用者的 Orcid 身份, 并取得其 Orcid 帳號, 但是不提供ERDDAP™使用其他 Orcid 帳號資訊。

###### 奧思2{#oauth2} 
* Oauth2 選項讓使用者用他們的Google帳戶或Orcid帳戶簽署。

google、 orcid 和 oauth2 選項是 Openid 選項的繼承者, 於ERDDAP™1.68版本,它基于开放版本 身份證已經过时了 請切換到google, orcid, 或 oauth2 選項 。

這些選擇非常方便ERDDAP™管理者們 不需要處理密碼或他們的散列文摘 你只需要創造一個&lt;使用者 &gt;] (/docs/server-admin/dataset#user) 使用者的標籤datasets.xml指定使用者的 Google 電子地址或 Orcid 帳號為使用者名稱屬性 。 (密碼屬性在認證=email, google, orcid 或 oauth2 時不使用 。) 

用這些選擇,任何人都可以登入ERDDAP™簽署到他們的Google電子帳戶或Orcid帳戶中, (该ERDDAP™管理者) 建立&lt;使用者&gt; 標籤, 指定他們的 Google 電子郵件地址或 Orcid 帳號為使用者名稱, 並指定他們的角色 。

ERDDAP™將電子郵件地址視為不敏感大小寫 。 它通過轉換您輸入的電子郵件位址( 在&lt;使用者&gt;標籤)或使用者輸入 (登入表單) 全部小寫版本。

要設定 google, orcid, 或 oauth2 認證 :

* 在您的設定中, xml 更改&lt;baseHttpsUrl &gt; 標籤的值。
在你的個人電腦上實驗/工作,使用
     https://localhost:8443   
為了你的公眾ERDDAP™使用
     https://*your.domain.org*:8443   
或者,更好的是,沒有:8443 如果你使用阿帕奇[代理通道](/docs/server-admin/deploy-install#proxypass)所以不需要端口號碼
     
* 在您的設定中, xml 更改&lt;認證&gt; 標籤對 google, orcid, 或 oauth2 的值, 例如 :
```
    <authentication>oauth2</authentication>  
```
###### 谷歌設定{#google-setup} 
* Google 和 oauth2 選項 :
遵循以下指令建立您的 Google 認證ERDDAP.
     
    1. 如果你沒有谷歌電子帳戶[建立一](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. 跟著[這些指令](https://developers.google.com/identity/sign-in/web/devconsole-project)建立 Google 開發者控制台專案并取得客戶端代碼。
        
當 Google 表格要求授權時Java文稿起源, 輸入數值來自&lt;基底HttpsUrl&gt; 來自您的個人電腦ERDDAP™setup.xml,例如,
         https://localhost:8443   
第二行,加上&lt;BaseHttpsUrl 來自您的公開ERDDAP™setup.xml,例如,
         https://*your.domain.org*:8443
 
        
不要指定任何經授權的導引物
        
當您看到此專案的客戶端代碼時, 複製並貼入您的設定值. xml( 通常在下面)&lt;認證 &gt; 要有秩序, 但安放并不重要), in the&lt;googleClientID &gt; 標籤, 例如 ,
        &lt;googleClientID &gt; *您的端點* &lt;/googleClientID &gt;
客戶端的ID將是一串約75個字元的字串,
         
        
    3. 在你的datasets.xml,建立 [&lt;使用者 &gt;] (/docs/server-admin/dataset#user) 標籤。 標籤中的使用者名稱屬性 :
        
        * 使用使用者的Google電子郵件位址。
        * 使用使用者的 Orcid 帳號 (有破折號) .
        
不要指定使用者標籤的密碼屬性 。
         
    4. 重新啟動ERDDAP™以變更設定. xml 和datasets.xml生效。
         
###### 野獸設置{#orcid-setup} 
* orcid 和 oauth2 選項 :
遵循以下指令建立 Orcid 認證您ERDDAP.
     (详见[Orcid 的認證 API 文件](https://members.orcid.org/api/integrate/orcid-sign-in).)   
     
    1. 如果你沒有奧西德的賬戶[建立一](https://orcid.org/signin)  
         
    2. 登入 Orcid[ https://orcid.org/signin ](https://orcid.org/signin)用你個人的Orcid帳戶
         
    3. 點擊「 開發工具 」 (上面的"供研究者") .
         
    4. 點擊「 免費 ORCID 公共 API 的注册 」 。 輸入此資訊 :
名稱 :ERDDAP™在\\[您的組織\\]  
网站 :\\[您ERDDAP'域\\]  
描述 :ERDDAP™是科學數據伺服器。 使用者需要用 Google 或 Orcid 认证才能存取非公開數據集。
重定向 URI :\\[您ERDDAP'域\\]/erddap/loginOrcid.html
         
    5. 點擊儲存圖示 (看起來像3.5"磁碟&#33;) .
然後可以看到您的 ORCID AP 客戶端 ID 和 ORCID 客戶端機密 。
         
    6. 复制並貼上 ORCID AP 客戶端代碼 (從「APP」開始) 建立&lt;orcidClientID &gt; 標籤,例如,
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. 复制並貼上 ORCID 客戶端機密 (小寫有破折號的字母數字) 建立&lt;orcidClientSecret &gt; 標籤,例如,
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. 在你的datasets.xml,建立 [&lt;使用者 &gt;] (/docs/server-admin/dataset#user) 標籤。 標籤中的使用者名稱屬性 :
        
        * 使用使用者的Google電子郵件位址。
        * 使用使用者的 Orcid 帳號 (有破折號) .
        
不要指定使用者標籤的密碼屬性 。
         
    9. 重新啟動ERDDAP™以變更設定. xml 和datasets.xml生效。
             

###### 以任意方式登入{#log-in-either-way} 
如果您使用google、 orcid 或 oauth2 認證選項, 以及 Google Sign- In 或 Orcid 認證 API 突然停止工作 (不管原因如何) 或停止工作ERDDAP™使用者無法登入您的ERDDAP. 暫時的 (或永久) 您可以要求使用者與其他系統簽署 (取得 Google 電子郵件帳戶, 或是取得 Orcid 帳戶) . 要做到這一點:

1. 更改&lt;認證&gt; 標籤以讓它允許其他認證系統 。 oauth2 選項允許使用者登入任一系統 。
2. 复制每份&lt;使用者&gt; 標籤, 將使用者名稱屬性從 Google 電子郵件位址變為相应的 Orcid 帳號 (或相反) 但角色的屬性是一樣的

###### 開啟文件{#openid} 
ERDDAP™不再支援 Openid 認證選項, 該選項是以開啟的版本为基础的 身份證已經过时了 請使用google、 orcid 或 oauth2 選項 。

###### 基本{#basic} 
ERDDAP™不支援 BASIC 認證, 因為 :
* BASIC似乎旨在預定的網頁需要安全存取或封面,ERDDAP™允許 (限制存取) 要加入的數據集 。
* BASIC 認證不能提供使用者登出的方法 &#33;
* BASIC 認證已知不安全 。

##### 安全資料來源{#secure-data-sources} 
如果數據集限制存取ERDDAP™使用者, 資料來源 (從何處ERDDAP™取得資料) 不得公开。 怎么可能呢?ERDDAP™取得限制存取的數據集的資料嗎? 某些選擇是:

*   ERDDAP™可以提供本地檔案的資料 (例如,通过EDD表 從檔案或EDDGrid從檔案) .
     
*   ERDDAP™可以在一個[德明Z](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing))和資料來源 (例如,OPeNDAP伺服器或數據庫) 可能是在后面[防火牆](https://en.wikipedia.org/wiki/Firewall),可以使用的地方ERDDAP™但不公開
     
* 資料來源可以在公共網站上, 但需要登入才能得到資料 。 兩種數據集ERDDAP™可以登入[數據庫中的 EDD 表格](/docs/server-admin/datasets#eddtablefromdatabase)和[來自卡桑德拉的EDD表](/docs/server-admin/datasets#eddtablefromcassandra). 這些數據集支援 (永遠使用) 使用者名稱 (建立ERDDAP™只有只讀權限的使用者) 、密碼、SSL連接和其他安全措施。
    
但总的来说,目前,ERDDAP™無法處理這些資料來源, 因為它沒有登入資料來源的规定。 這就是為什麼我們可以[EDDGrid從 Erddap 和 EDD 表格 來自 Erddap](/docs/server-admin/datasets#eddfromerddap)數據集不能限制 。 目前,ERDDAP™無法登入並存取遠端的中繼資料ERDDAP. 加上"遠"字ERDDAP™在防火牆後面移除數據庫 限制不能解決問題:因為使用者要求 EDDXxx 從Erddap 資料需要重新定向到遠端ERDDAP™遙控器ERDDAP™必須可以使用。
    
#### 防黑客{#defenses-against-hackers} 
有些壞蛋黑客想利用伺服器軟體的安全漏洞ERDDAP.ERDDAP™遵循共同的安全建議,

* 限制權限 -- 最重要的防禦之一是讓Tomcat經過一個沒有密碼的使用者 (所以沒有人可以登入這個使用者) 且檔案系統權限有限 (例如,只讀存取資料) . 看ERDDAP指令[建立 tomcat( 玩具)](/docs/server-admin/deploy-install#tomcat).
* 重用 - 一般來說,ERDDAP™包括數萬份要求的文稿 很難受ERDDAP™并保護自己不被虐待 有時很難分辨出重合法使用、過度合法使用和非法使用 (有時很簡單) . 在其它的辯論中ERDDAP™有意识地不允許單一要求使用系統的過份資源 (除非此系統不起作用) .
* 辨識有問題的使用者 - 如果ERDDAP™是慢或冷 (可能是因為一個天真使用者或一個機器人 正在執行多個文稿來同步提交多份請求 也可能是因為壞人[拒服兵役](https://en.wikipedia.org/wiki/Denial-of-service_attack)攻擊) 你可以看看[每天報告電子郵件](#daily-report)  (更频繁的相同信息[ERDDAP™日志文件](#log)) 顯示最動用者要求的次數 (參觀「 請求者 IP 位址 」 (已允許) ") .ERDDAP™也隨時向管理員發送郵件[“ 异常活動 : &gt; 25%的要求失敗 ”](#failed-requests). 你看看ERDDAP™紀錄檔案以查看其要求的性质 。 如果你覺得有人提出了太多的要求 奇怪的要求 (你不會相信我所看到的,也許你會) ,或者攻擊類型的要求,您可以在黑名單中加入他們的IP地址 。
* 黑名單... 您可以加入問題使用者的 IP 位址 。[拒服兵役](https://en.wikipedia.org/wiki/Denial-of-service_attack)攻擊者ERDDAP [黑名單](/docs/server-admin/datasets#requestblacklist)以便他們未來的要求立即被拒絕。 此設定值在datasets.xml讓您能快速加入 IP 位址到清單中, 然后[旗號](#flag)數據集ERDDAP™立即通知并应用變更 。 傳送到黑名單使用者的錯誤訊息鼓励他們聯絡ERDDAP™管理員如果覺得他們被誤列黑名單的話 (我們的經驗是, 許多使用者一直不知道他們正在同步執行多個腳本, 或是他們的腳本在做無稽的要求。) 
* 數據集安全 - 一些類型的數據集 (特別是,數據庫的 EDD Table) 新增安全風險 (例如, SQL 注射) 并有自己的安全措施。 參考這些類型數據集的資訊[与datasets.xml文件](/docs/server-admin/datasets)特别是[數據庫安全](/docs/server-admin/datasets#database-security).
* 安保审计 雖然NOAA數年來IT安全拒絕了我們的掃瞄要求 他們現在例行掃瞄我 (鮑勃的)  ERDDAP™安裝 雖然最初的掃描發現了一些問題,但之後的掃描沒有發現問題ERDDAP. 掃描很擔心很多事情:tabledap要求看起來像 SQL 要求,他們擔心 SQL 注射的弱點。 但這些擔心是沒有根据的 因為ERDDAP™總是剖析並驗證查詢, 然后分別建立 SQL 查詢, 避免注入漏洞 。 他們有時抱怨的另外一件事 就是我們Java版本或Tomcat版本沒有他們想要的更新, 所以我們更新它們以回應。 我之前說過要給大家看安全報告 但我現在被告知我不能這麼做

#### 有問題嗎? 建議?{#questions-suggestions} 
如果你有任何問題ERDDAP安全系統或任何問題、懷疑、擔心或建議[部分](/docs/intro#support).
    

## 你不需要知道的事{#things-you-dont-need-to-know} 

這是你不需要知道的细节 直到有需要的時候

### 第二批ERDDAP™ {#second-erddap} 
*    **建立秒ERDDAP™測試/發展**   
如果你想這樣做,有兩個方法:
    *    (最佳) 安裝Tomcat和ERDDAP™除了你公開的電腦之外ERDDAP. 如果你用私人電腦:
        1. 一步一步地安裝 先讓Tomcat起來跑
Tomcat跑步的時候 Tomcat經理應該在
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (也許[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. 安裝ERDDAP.
        3. 不要用 PoxyPass 移除端口號碼ERDDAP™URL.
        4. 在[設定. xml](/docs/server-admin/deploy-install#setupxml),设置基底Url 到 http://127.0.0.1:8080
 
        5. 當你開始的時候ERDDAP™你應該能看到
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (也許[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### 第二只湯姆貓{#second-tomcat} 
*    (第二佳) 在您公開的電腦上安裝另一個 TomcatERDDAP.
    1. 一步一步地安裝 先讓Tomcat起來跑
變更所有與第二 Tomcat 相關的連接埠號碼 (例如,8080改为8081)   (看[多重托姆卡特 实例區段](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)中途通過那份文件) .
    2. 安裝ERDDAP™在新的Tomcat。
    3. 不要用 PoxyPass 移除端口號碼ERDDAP™URL.
    4. 在[設定. xml](/docs/server-admin/deploy-install#setupxml),设置基底Url 到 http://www.*yourDomainName*:8081
 
    5. 當你開始的時候ERDDAP™你應該能看到
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### 固态驱动器{#solid-state-drives} 
*    **固态驱动器 (SSD 伺服器) 太棒了&#33;**   
最快、最簡單、最便宜的加速方式ERDDAP使用表格資料的權限是把資料檔放到 Solid State Drive上 (SSD) . 多數表格化的數據集相當小, 所以一、二TB SSD可能足以保存您所有表格化的數據集的所有資料檔。 SSD最終會耗盡 如果你把數據寫到一個儲存格裡, 刪除它, 以及寫新數據到那個儲存格裡太多次。 所以,如果你只用你的SSD來寫入數據一次並多次讀取它,即使是一個消费級的SSD,也應該持續很長時間,可能比任何硬碟驱动器要長得多. (厚度) . 消費者級SSD現在便宜了 (2018年,1结核病~200美元或2结核病~400美元) 物价仍然在迅速下跌。 什麼時候ERDDAP™存取資料檔, SSD 提供更短的空間 (HDD = ~0.1ms = ~3ms (?) RAID 的 ms, 而 Amazon S3 的 ~55 ms) 和更高的吞吐量 (HDD = ~ 500 MB/ S, 而 ~ 75 MB/s, 而 RAID = ~ 500 MB/s) . 這樣你就能大展身手了 (最高 10 X 對 HDD) 200美元&#33; 與您系統中其他可能的變更相比 (一萬元的新伺服器? 35,000美元的新瑞德? 5000美元的新網路開關? 等) 這是目前最好的投資收益 (羅伊) . 如果/ 當 SSD 死亡時 (一、二、八年) 取代它。 不要依靠它來長期的 數據的存檔 只為數據的前端副本\\[SSD對網格化的數據也是很好的, 但大部分網格化的數據集都大得多, 讓SSD非常貴.\\]
    
如果您的伺服器沒有載入記憶體, 您伺服器的附加記憶體也是一個大且相对便宜的方法, 以加速 。ERDDAP.
     
    
### [重載/ 限制](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
重用,獨立ERDDAP™可能受各种問題的制约。 更多信息,参见:[限制和解决办法](/docs/server-admin/scaling#heavy-loads--constraints).
     
### 网格、群組和聯盟{#grids-clusters-and-federations} 
在非常重的用途下,單獨使用ERDDAP™連建議的解決方案都不足。 在這種情況下ERDDAP™具有容易建構可縮放格子的特性 (也叫做群組或聯盟) 四,ERDDAPs 能讓系統處理非常重的用途 (例如,大数据中心) . 更多信息,参见:[网格、群組和聯盟ERDDAPs](/docs/server-admin/scaling).
     
### 云计算{#cloud-computing} 
幾家公司開始提供[云计算服务](https://en.wikipedia.org/wiki/Cloud_computing)  (例如,[亞馬遜網路服務](https://aws.amazon.com/)) .[网站托管公司](https://en.wikipedia.org/wiki/Web_hosting_service)提供更簡單的服務, 您可以使用這些服務建立單一ERDDAP™或ERDDAP重用 更多信息,参见:[云计算ERDDAP™](/docs/server-admin/scaling#cloud-computing).

### 亞馬遜{#amazon} 
*    **[亞馬遜網路服務 (阿WS) EC2 安裝概述](#amazon)**   
    [亞馬遜網路服務 (阿WS) ](https://aws.amazon.com/)是[云计算服務](https://en.wikipedia.org/wiki/Cloud_computing)提供大量電腦基建, 你可以安裝ERDDAP™在一個[弹性計算云 (EC2) ](https://aws.amazon.com/ec2/)例 (他們的名字是一臺電腦 你可以租到一小時) . AWS很出色[AWS 使用者指南](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)你可以用Google 找出你可能遇到的具体问题的答案 振作起來 開始工作是件很重要的事 但一旦你啟動了一個伺服器 你可以輕而易舉地租用更多資源 (伺服器、數據庫、 SSD 空間等。) 按你需要的 合理的價錢\\[這不是亞馬遜網絡服務的建議或背書。 彼云供养者.\\]
    
關於你需要做的事的概述ERDDAP™在 AWS 上執行是 :
    
    * 總而言之,你會做所有的事情[AWS 使用者指南](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).
    * 建立 AWS 帳號 。
    * 在帳號內設置 AWS 用戶, 有管理員權限 。 登入為此用戶以做以下所有步數 。
    * 弹性區塊儲存 (EBS) 是AWS 等效於您伺服器的硬碟 。 在您第一次建立 EC2 實驗時會分配一些 EBS 空間 。 這是持續的儲存 -- 當你停止EC2實驗時, 資訊不會失去。 如果你改變實體類型 你的 EBS 空間會自動連結到新實體上
    * 建立 Elastic IP 位址, 讓您的 EC2 實驗有穩定的公開 URL (而不是每次重新啟動您的實體時會改變的私人網址) .
    * 建立並啟動 EC2 實驗 (電腦) . 有很多[例型態](https://aws.amazon.com/ec2/instance-types/)以不同的價格 M4. 大體或m4.x大體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體 體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體體 你可能會想用亞馬遜的Linux做操作系統
    * 如果您的桌面/平面電腦是 Windows 電腦, 您可以使用[普提](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html), Windows 的免費 SSH 客戶端,以取得您的 EC2 實驗指令行的存取權 。 或者,你可能還有你喜歡的SSH程式
    * 當您登入您的 EC2 實驗時, 您將以行政用戶名「 e2 user」 登入 。 ec2-user有sudo 權限 。 所以,當您需要做一些 root 使用者的時候, 請使用: sudo *一些命令* 
    * 如果您的桌面/平面電腦是 Windows 電腦, 您可以使用[文件Zilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp),一個自由的 SFTP 程式,可以將檔案轉至/從您的 EC2 實驗 。 或者,你可能還有你喜歡的 SFTP 程式。
    *   [安裝 Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)在你的EC2例子。
    * 遵循標準[ERDDAP™安裝指令](/docs/server-admin/deploy-install).
         
### 等一等,再來一次{#waitthentryagain-exception} 
使用者可能會收到類似於
等一等,再走一次:
有一次 (暫時的?) 有問題 等一下,再試一次 (在瀏覽器中, 按下重新載入按鈕 。)   
詳情: GridData Accessor. incrament: 部分成果\\[0\\]="123542730"是"123532800".

"Waitnight Try AgainException"的一般解釋是:
什麼時候ERDDAP™正在應用使用者的要求, 可能會發生意想不到的錯誤 (例如從檔案讀取資料時出錯, 或是存取遠端數據集時出錯) . 等一等,再找回信號ERDDAP™要求失敗 (目前) 但是ERDDAP™應該試著快速重新載入數據集 (它叫[要求立即重新載入](#requestreloadasap)) 重新驗證要求 。 使用者只看到對要求的回應很慢。 其他時刻, 重載失敗或過慢, 或後來處理要求的試圖也失敗, 如果這樣的話ERDDAP™標示要重新載入的數據集, 但告知使用者 (通過等待,然后再試一次) 於是,

這是正常的行為 這個系統能處理很多共同的問題
但這個系統有可能被过度觸發 最常见的原因是ERDDAP裝入數據集並沒有問題,但是ERDDAP根據對數據要求的回應, 不管原因是什么 解決辦法是處理數據庫的錯誤 在 log. txt 中查看真正的錯誤訊息, 並處理問題 。 如果很多檔案都有有效的信頭, 但資料不合法 (已損毀的檔案) 中,用未破解的檔案取代檔案。 如果與RAID的聯系是 flakey,就把它修好. 如果遠端服務的連結是 flakey , 請尋找方法讓它不是 flakey 或從遠端來源下載所有檔案, 並提供本地檔案的資料 。

具体錯誤的詳細解釋 (以上) 即:
每一份EDDGrid数据集,ERDDAP™將轴式變數保留在內存中。 例如,它們被用于轉換使用 " () " 格式化成索引數字。 例如,如果轴數值是"10, 15, 20, 25", 要求 (20) 會被解釋成要求索引 # 2 (基于 0 的索引) . 什麼時候ERDDAP™從來源得到數據的請求, 並從來源得到數據, 它會驗證它從來源得到的轴數值符合內存中的轴數值 。 通常都是 但有時數據來源有重大變化: 例如, 從轴變數起始的索引值可能已被移除 。 (例如,"10,15,20,25"可能是"20,25,30") . 如果這樣的話,很明顯ERDDAP要求的解释 (例如, " (20) " 是索引 # 2) 現在錯了 所以ERDDAP™丟出例外, 呼叫 ReadingASAP 。ERDDAP™很快會更新數據集 (通常在幾秒內 通常在一分鐘內) . 其它類似問題,
    
#### 要求立即重新載入{#requestreloadasap} 
您可以在 log. txt 的檔案中看到 ReloadASAP 在錯誤訊息之後, 常常靠近[等一等,再來一次](#waitthentryagain-exception). 它基本上是一种內在的程式化方法ERDDAP™要設定[旗號](#flag)以表示數據集要立即重新載入 。
     
### 未刪除的檔案{#files-not-being-deleted} 
幾下ERDDAP™設備中, 有些暫時檔案由 :ERDDAP™保持開放 (搞錯了) 而不是被刪除。 在少數情況下,

希望這些問題都解決了 (截至ERDDAP™v2. 00) . 如果您看到這個問題, 請將冒犯檔案的目錄+ 名稱傳送至 Chris 。 約翰在Noaa.gov。 你們有一些解決問題的選擇:

* 如果檔案不大而且沒有讓你耗盡磁碟空間 你可以忽略問題
* 最簡單的解決辦法是關閉Tomcat/ERDDAP™  (數小時後,) . 在關閉時, 如果操作系統不刪除檔案, 請用手刪除 。 然后重新啟動ERDDAP.
         
### 杰森老{#json-ld} 
*    **[使用 json- ld 的數據集的語义標籤 (杰森 已連接的資料) ](#json-ld)**   
    ERDDAP™現在使用[json-ld 中 (杰森 已連接的資料) ](https://json-ld.org)將您的資料目錄和數據集成為[語言網](https://en.wikipedia.org/wiki/Semantic_Web)這是Tim Berners-Lee的主意, Json- ld 內容使用[chema.org](https://schema.org/)术语和定義。 搜索引擎 ([特别是谷歌](https://developers.google.com/search/docs/data-types/datasets)) 其他語言工具可以使用這個結構式的標記來方便發現和索引。 Json的標準是隱形的對人類&lt;文稿 &gt; 密碼 https://.../erddap/info/index.html 网页 (是語言網[數據庫](https://schema.org/DataCatalog)) 和每份 https://.../erddap/info/*datasetID*/index.html 网页 (是語言網[數據集](https://schema.org/Dataset)) . (特別感謝愛爾蘭海洋研究所的亞當·萊德比特和羅布·富勒 盡力完成這項工作ERDDAP.)   
     
### 日期外 URL{#out-of-date-urls} 
資料提供商寫入資料檔的網址正在慢慢地但肯定地變成过时 (例如,http變成https重新排列網站,) . 所有網站都一直面临問題, 為了處理這件事ERDDAP™現在有系統可以自動更新过时的網址 。 如果產生達塔斯 Xml 看到了一個过时的 URL, 它將最新的 URL 添加到&lt;addAttributes&gt;. 另外,當數據集載入時,如果ERDDAP™它默默地將它修改為最新的 URL 。 變更由一系列搜尋/取代的對對控制。&lt;更新Urls &gt;  inERDDAP是
\\[湯姆卡\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml檔案. 你可以在那里做出改變。 如果你有改變的建議 或者你覺得這應該變成服務 (就像轉換器) 請發郵件給克里斯 約翰在Noaa.gov。
     
### 科斯特{#cors} 
* 科斯特 ([跨奧里金資源共享](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
"是允許受限資源的機制 (例如字体或ERDDAP™資料) 在要從第一個資源的域外的另一域要求的網頁上」 (阿倫·朗加那坦) . 總而言之, CORS 是可以放入回應的 HTTP 信頭的訊息, 基本上說, 「如果某些其他網站, (特定或全部) 抓取資源 (例如,) 」。 因此,它是替代[杰森普](https://en.wikipedia.org/wiki/JSONP).
    
開發者ERDDAP™不要自称是安全專家 我們不完全清楚CORS的安全問題。 我們不想做任何聲明 支持降低安全性的行動 所以我們要保持中立 由每個人決定ERDDAP™決定CORS信頭是否值得冒險。 一如既往,如果你ERDDAP™任何私人的數據集, 這是一個很好的主意 是格外小心的安全。
    
如果您要開啟 CORS 以支援您的ERDDAP™有[容易得到的指示](https://enable-cors.org/index.html)描述網站管理員如何通過低級伺服器軟體啟用 CORS 頭目 (例如, Apache 或 nginx) .
    
### 調色板{#palettes} 
* 調色板被使用ERDDAP™以將數據數值轉換成圖和地圖的顏色。
    
每個調色板在 .cpt 樣式的調色板檔案中被定義為[格林尼治平时](https://www.soest.hawaii.edu/gmt/). 全部ERDDAP™.cpt 檔案是有效的 GMT .cpt 檔案, 但反之亦然 。 用于ERDDAP™,.cpt文件有:
    
    * 檔案開始時可選擇的註解行, 從「 #」開始 。
    * 包含調色板片段描述的主區, 每行一個片段 。 每段描述行有8個值:
開始 值, 啟動Red, 啟動 綠色,開始 藍色 末端Value 末端紅色 末端綠色 末端藍色
可能會有一些區段ERDDAP™使用每段的啟動紅/ 綠/ 藍和 endRed/ 綠/ 藍之間的線性插值。
        
我們建議每段指定不同的始末顏色, 每段的始終顏色與前段的終端顏色相同, 讓調色板描述连续混合的顏色 。ERDDAP™有一個系統來建立在飛行中從調色板中產生离散的顏色的調色板, 并有连续的混合顏色。 安ERDDAP™用戶可以指定是否要調色板是连续的 (原件) 分離 (由原始) . 但有些調色板有合理的理由不遵循這些建議。
        
    * 啟動數值和端數值必須是整數 。
第一段必須有啟動Value=0和endValue=1.
第二段必須是啟動Value=1和結束Value=2.
埃特克
    * 紅色、綠色和藍色值必須是 0 的整數 (無) ... 255 (全部) .
    * 文件末端必須有 3 行 :
        1. 數據值小於最小色條的背景 rgb 顏色, 例如: B 128 128 128
它常常是第一段的初紅、初綠和初藍。
        2. 數據值大于顏色列最大值的前景 rgb 顏色, 例如: F128 0 0
它通常是最后一段的末端紅色、末端綠色和末端藍色。
        3. NaN 資料值的 rgb 顏色, 例如 N 128 128 128
常常是中灰色的 (128 128) .
    * 每行的值必須用分頁隔開, 沒有不相關的空格 。
    
. cpt 的樣本是 BlueWhiteRed. cpt :
    
\\# 這是藍白色紅色的cpt。
0 0 0 128 1 0 255
1 0 0 255 2 0 255 255
2 0 255 255 3 255 255 255
3 255 255 255 4 255 0
4 255 255 0 5 255 0
5 255 0 0 6 128 0
B 0 0 128
F128 0 0
N 128 128
    
其它示例請參考 . cpt 檔案 。 如果一個... cpt文件有問題ERDDAP™解析 . cpt 檔案時可能會丟出錯誤 (總比錯用資訊好) .
    
您可以新增調色板到ERDDAP. 你可以自己做,也可以在网上找到 (例如,[cpt- 城市](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) 雖然您可能要稍稍編輯其格式以符合ERDDAP.cpt的要求。 去得到ERDDAP™要使用新的 .cpt 檔案,將檔案儲存在 *湯姆卡* /webapps/erddap/WEB-INF/cpt文件 (每個新版本都得如此ERDDAP) 或:
    
    * 如果您使用預設信件. xml 檔: 將檔名加入到檔案中&lt;調色板 &gt; 標籤在
         *湯姆卡* /webapps/erddap/WEB-INF/class/gov/noaa/pfel/erddap/util/messages.xml.
如果你這樣做,你每升級都要做ERDDAP.
    * 如果您使用自訂的訊息. xml 檔案: 將檔名加入&lt;自訂信件中的調色板 &gt; 標籤. xml 檔 : *湯姆卡* / 內容/ erddap/ messages.xml 。 如果你這樣做,你只需要做一次 (但是有其他工作可以維持自訂信件.xml 檔) .
    
然后重新啟動ERDDAP™所以ERDDAP™注意改變。 此方法的優點是 您可以在提交使用者的清單中指定調色板的順序 。 如果您加入收藏, 我們建議您加入作者首字母的前缀 (例如, "KT\\_") 移到每個調色板的名稱以辨識收藏, 這樣可以有多個調色板, 不然會有同一個名稱 。
    
請不要移除或變更任何標準調色板 。 他們都是標準的特色ERDDAP™设施。 如果您認為應在標準中包含調色板或調色板收藏ERDDAP™因為它/它們將是通用的, 約翰在Noaa.gov。
    
### 顏色列{#colorbars} 
*    **你好ERDDAP™要產生顏色列中的顏色嗎 ?** 
    
    1. 使用者選擇一個預定的[調色板](#palettes)或者使用預設,例如彩虹。 調色板在 GMT 式的.cpt 彩色調色板表格檔案中儲存/定義 。 每人ERDDAP預定的調色板有簡單的整數範圍, 例如 0 到 1 (如果在調色板上只有一區) ,或0至4 (如果調色板中有四段) . 檔案中的每一區段從 n=0 開始覆盖 n 到 n+1 。
    2.  ERDDAP™通过縮放預定的調色板範圍來產生新的 .cpt 檔案 (例如,0至4) 到使用者需要的調色板範圍 (例如,0.1至50) 然后在新調色板中為新調色板的每段產生一段 (例如,勾勾的日志比例尺為0.1、0.5、1、5、10、50。) . 每段末端點的顏色都是在 .cpt 檔案中找到調色板的相關區域, 然后線性地插入 R, G,和 B 值 。 (這和GMT從它的彩色調色板表格檔案中產生顏色的方式相同.) 此系統允許ERDDAP™從一般調色板開始 (例如,彩虹8段,共0至8段) 並建立自訂的飛行調色板 (例如,自訂的彩虹,它將0.1至50毫克/升的彩虹顏色映射) .
    3.  ERDDAP™然后使用新的 .cpt 檔案來產生顏色列中每個不同顏色像素的顏色 (在圖片或地圖上圖繪圖資料時,) ,再次在 .cpt 文件中找到調色板的相关部分,然后線性地插入 R 、 G 和 B 值。
    
這個过程可能不必要地複雜。 但這能解決與紀錄天平有關的問題,
    
所以,你怎么能模仿什么ERDDAP™在做什么? 那可不容易 基本上你需要重複過程ERDDAP™正在使用。 如果你是...Java程序員,您可以使用相同的程式Java課ERDDAP™用來做這些 :
     *湯姆卡* /webapps/erddap/WEB-INF/class/gov/noaa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### 數據分配系統指南{#guidelines-for-data-distribution-systems} 
關於數據分配系統的設計與評估,可以找到更一般的看法[這裡](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html).
     
### 歸檔ADataset{#archiveadataset} 
包含在您的ERDDAP™安裝是叫做ArchiveADataset的指令行工具,可以幫助您建立歸檔 (a.zip或.tar.gz文件) 在 netcdf-3 系列中保存部分或全部數據集.nc以适合提交到的檔案格式的資料檔NOAA'NCEI 歸檔 (.nc或[.ncCFMA 檔案](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)表格数据集[NEINetCDF樣本 v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) .

檔案A Dataset 可以做兩種不同的歸檔格式:

* 「原始」格式遵循這些[NCEI 歸檔指南](https://www.ncdc.noaa.gov/atrac/guidelines.html)此指南[在 NCEI 中歸檔您的資料](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1)和相关的[确保資料完整性的做法](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity).
* “ Bag It” 格式[BagIt 文件](https://en.wikipedia.org/wiki/BagIt)由美國國會圖書館宣傳的標準化檔案格式,[BagIt v. 0. 97 规格](https://tools.ietf.org/html/draft-kunze-bagit-14).NOAANCEI 可以標準在 BagIt 檔案上提交檔案 。

不奇怪,[全球和可變元数据](/docs/server-admin/datasets#global-attributes)那ERDDAP™鼓励/要求是NCEI鼓励/要求的几乎完全相同的文件 CF 和 ACDD 中繼資料,所以您所有的數據集都應該可以通過[傳送2NCEI](https://www.nodc.noaa.gov/s2n/)或[ATRAC 信箱](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI 的高级追蹤與資源工具) .

如果你 (该ERDDAP™管理者) 使用 ArchiveADataset 向 NCEI 提交資料, 然後是您 (不是NCEI) 會決定什麼時候向NCEI提交一塊數據, 以及那塊數據會是什麼, 因為你會知道什麼時候有新數據, 以及如何指定這個數據 (和NCEI不會) . 因此, ArchiveADataset 是您建立套件以提交 NCEI 的工具 。

檔案A 數據集在其他情形中可能有用,例如:ERDDAP™需要轉換數據集子集的管理員 (私人ERDDAP) 從它的原生檔案格式變成一套[.ncCF 文件](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)因此,公眾ERDDAP™服務資料.nc取代原始檔案的 CF 文件 。

一旦你建立ERDDAP™运行它 (至少一次) 中找到并使用 ArchiveADataset *湯姆卡* /webapps/erddap/WEB-INF目錄. 有一個 shell 文稿 (存档 ADataset.sh) Linux/ Unix 和批次檔案 (存档 ADataset. bat) 用于 Windows 。

在 Windows 上, 您第一次執行 ArchiveADataset, 您需要編輯 ArchiveADataset 。 使用文字編輯器的 bat 檔來改變路徑到 java 。 exe 檔案以便 Windows 找到Java.

當您執行 ArchiveAdataset 時, 它會問你一系列的問題 。 每一個問題, 輸入回覆, 然后按 Enter 。 或者按 ^C 以退出程式 。

或者,你可以把答案, 排序,命令行。 要做到這一點, 執行程式一次, 輸入並寫下你的答案 。 然後可以建立單一命令行 (以答案為參數) 操作程序并回答所有問題
如果您要使用指定參數的預設值, 請使用默认值 。
用"" (2 雙引號) 作為空弦的占位符。
指定命令行上的參數可能非常方便, 例如, 如果您每月使用 ArchiveADataset 一次來儲存一個月的數值資料 。 一旦您用參數產生指令行並保存在您的備忘錄或 shell 文稿中, 您只需要每個月做小的變更以建立月的歸檔 。

ArchiveAdataset所問的問題讓您:

* 指定原始文件或 Bagit 檔案容器 。 NCEI,用Bagit。
* 指定拉鏈或焦油.gz套件的壓縮 。 NCEI 使用焦油.gz.
* 指定此歸檔的聯絡人電子郵件位址 (它會寫在 READ%ME.txt 檔案的檔案中) .
* 指定datasetID中。
* 指定要歸檔的數據變數 (通常全部) .
* 指定要歸檔的數據集的哪一個子集 。 您需要格式化子集, 就像您會格式化一個子集的資料要求, 所以格子集的格子與表格数据集的格子不同 。
    * 您可以指定最左方維度的數值範圍, 通常是時間範圍 。 ArchiveADataset 會提出一個单独的要求, 並產生一個對數值範圍中的每個值的獨立的資料檔 。 由于網格化的數據集通常很大, 您幾乎總是需要指定一個與整個數據集大小相對的小子集 。
例如,\\[ (2015-12-01) : (2015-12-31) \\]\\[\\]\\[\\]\\[\\]
    * 表格數據集中, 您可以指定任何限制的收集, 但常常是一段時間 。 由于表格數據集通常很小, 所以常常可以不指定任何限制, 所以整個數據集都歸檔 。
例如( T) 2015- 12-01 時間( T)&lt;2016-01-01
* 表格數據集: 指定一個由 0 或更多變數分隔的逗號清單, 以決定如何將已歸檔的數據分集到不同的數據檔中 。 用于有
    [cdm\\_data\\_型態](/docs/server-admin/datasets#cdm_data_type)時間|時間串文件|曲線|傳染器Profile
您幾乎總要指定哪個變數有 CfQ%role=time series%id (例如,stationID) 或 Cf\\_role = trjectory\\_id 屬性 。 ArchiveADataset 會為這些變數的數值的每個組合, 例如每個變數的數值, 提出一個單一的請求和產生一個單一的數據檔 。stationID.
您可能不會為此指定任何變數 。
警告 : 如果您正在歸檔的數據集的子集非常大 (&gt;2GB) 且沒有适合此目的的變數, 那麼此數據集不能使用 ArchiveADataset 。 這應該是罕見的。
* 指定要建立的資料檔的檔案格式 。
NCEI 的網格化数据集.nc.
表格数据集,NCEI,使用[.ncCFMA 檔案](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)如果它是一种選擇;否则使用.nc.
* 指定要為每個資料檔和整個檔案包建立的文件文摘的類型: MD5, SHA-1, 或 SHA-256 。 文件摘要提供了客戶端的方法 (例如,国家教育倡议) 以測試資料檔是否已損毀。 傳統上,這些是[. md5 文件](https://en.wikipedia.org/wiki/MD5)但現在還有更好的選擇 NCEI,使用SHA-256.

當你回答所有問題後, ArchiveAdataset 會:

1. 向數據集提出一系列的請求,并在其中分階 。 *大家长會* /ArchiveADataset / 命令 *datasetID印章* /.
格子化的數據集會有最左方的每個值的檔案 (例如,) . 檔案名稱會是此值 (例如, 時間值) .
对于表格數據集,會有... 變數的每個值的檔案 (s) . 檔案名稱會是這個值 。 如果有不止一個變數, 左方變數會用於做子目名稱, 右方變數會用於做檔名 。
每個資料檔必須是&lt;2GB (最大限值.nc版本 3 文件) .
2. 用資料檔案的文摘來建立與每個資料檔案相關的檔案 。 例如, 如果數據檔是 46088.nc文摘型號是 .sha256 , 文摘檔的名稱是 46088.nc莎莎256
3. 建立 READQME.txt 檔案, 包括要產生此檔案的所有設定值清單 。
4. 制作 3 份文件 *大家长會* / ArchiveADataset/ :
    
    * A.zip或.tar.gz檔案名稱 *datasetID印章* .zip  (或.tar.gz) 包含所有已演播的資料檔和文摘檔案。 此檔案可能為任意大小, 只限磁碟空間 。
    * 例如, 歸檔檔案的文摘檔, *datasetID印章* .zip.sha256.txt
    * 對「 原始」 檔案類型, 一個文字檔, 命名為 *datasetID印章* .zip. list of Files.txt (或.tar.gz) 列出所有檔案.zip  (或.tar.gz) 文件。
    
如果你正在準備NCEI的歸檔, 這些是您要寄給NCEI的檔案, 也許可以通過[傳送2NCEI](https://www.nodc.noaa.gov/s2n/)或[ATRAC 信箱](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI 的高级追蹤與資源工具) .
5. 刪除所有已演播的檔案, 只讓檔案歸檔 (例如,.zip) 文摘 (例如.sha256.txt) 和 (可選擇) 仍保留 Files.txt 檔案列表 。

#### ISO 19115 .xml 中繼檔案{#iso-19115-xml-metadata-files} 
ArchiveAdataset 檔案包不包括數據集的 ISO 19115.xml 中繼資料檔 。 如果您想要/需要向 NCEI 提交您的數據集 ISO 19115 檔案, 您可以將 ISO 19115. xml 中繼資料檔傳送給它們ERDDAP™為數據集建立 (但是NMFS人們應該從 InPort 取得 ISO 19115 的數據集檔案, 如果ERDDAP™尚未提供此檔案) .

有問題嗎? 建議? ArchiveADataset 是新的 。 如果你有問題或建議,看我們的[部分](/docs/intro#support).
     
