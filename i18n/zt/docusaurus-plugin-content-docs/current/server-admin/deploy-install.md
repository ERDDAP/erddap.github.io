---
sidebar_position: 1
---

# 安裝
如何完成初始設定 ERDDAP™ 在您的伺服器上

 ERDDAP™ 可以在任何支持的伺服器上執行 Java 和 Tomcat (以及杰蒂等其他應用服務器 但我們不支持他們) .
 ERDDAP™ 已在 Linux 上驗證 (包括亞馬遜的AWS) 麥克和Windows電腦

*  **嵌入器** -- 我們提供 [ ERDDAP™ 嵌入容器](https://hub.docker.com/r/erddap/erddap) 
而IOOS現在提供 [快速啟動指南 ERDDAP™ 在容器中](https://ioos.github.io/erddap-gold-standard/index.html) .
這是標準 ERDDAP™ 安裝,在多克容器。
透過嵌入器 撰寫我們提供簡單的設置SL和監控方法, [Docker 文件](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
如果您已經使用 Docker, 您可能會更喜歡 Docker 版本 。
如果你想要運行云端服務 你可能會更喜歡Docker版本
*  **亞馬遜** -- 如果你正在安裝 ERDDAP™ 在 Amazon 網路服務 EC2 實例中,請參考此 [Amazon 網路服務概述](/docs/server-admin/additional-information#amazon) 先
*  **Linux 和 macs** -- ERDDAP™ 在Linux和Mac電腦上做得很好 參考以下指示.
*  **視窗** -- 視窗可以做測試 ERDDAP™ 供私人使用 (参见以下指令) ,
但我們不建議公開使用 ERDDAP™ 部署。 執行 ERDDAP™ 在 Windows 上可能有問題:
特别是, ERDDAP™ 可能無法快速刪除和(或)重命名檔案 。 可能是因為防病毒軟體
   (例如,McAfee和Norton) 是檢查病毒的檔案 如果你碰到這個問題
(可以在 [log.txt](/docs/server-admin/additional-information#log) 文件如
改變抗病毒軟體的設定, 或者考慮使用 Linux 或者 Mac 伺服器 。

 **標準 ERDDAP™ Linux、Macs和Windows 電腦的安裝指令是:** 

0. 確保任何依賴性被安裝 。 在非窗口機上 (Linux 和 Mac) 你需要csh。

##  Java  {#java} 

1.  [為 ERDDAP™ v2.19+, 设置 Java 21.](#java) 
出于安全原因,使用最新版本的 Java 21.
請下載並安裝最新版本
    [領養的 OpenJDK (特穆林) 21 (升) ](https://adoptium.net/temurin/releases/?version=21) .
檢查安裝, 例如執行 `/ javaJreBin Directory/ java - version' 。
`/usr/ 本地/jdk-21.0.3+9/jre/bin/java -反正

    ERDDAP™ 合作 Java 但我們建議領養, 因為這是主要的,社區支持的,
自由 (就像啤酒和演講) 版本 Java 21 提供长期支持 (初版后多年的免費更新) .
出于安全原因,請更新您的 ERDDAP 版本 Java 定期作为新版本 Java 21人由收养所提供。

    ERDDAP™ 已與 21 個版本相關, 由於种种原因 我們不試驗也不支持其他版本 Java .
     
## 托姆卡特{#tomcat} 

2.  [設定](#tomcat)   [托姆卡特](https://tomcat.apache.org) . Tomcat是使用最广泛的 Java 應用程式伺服器,
就是 Java 介于操作系統的網路服務與 Java 伺服器軟體類似 ERDDAP™ .
它是自由開源軟體 (自由和开放源码软件) .

你可以再用一個 Java 應用程式伺服器 (例如,杰蒂) 但我們只和Tomcat一起做測試

   * 下載Tomcat並在您的伺服器或電腦上解開它 。
為了安全起见, 使用最新版本的Tomcat 10 幾乎總是最好的 (第9版及以下不能接受) 
它旨在配合 Java 21或更新。 以下是Tomcat目錄,

警告&#33; 如果您已經有 Tomcat 執行其他的網絡應用程式 (特别是THREDDS) 我們建議你安裝 ERDDAP™  in
      [第二隻湯姆貓](/docs/server-admin/additional-information#second-tomcat) 因為 ERDDAP™ 需要不同的Tomcat設定值
也不必與其他應用程式爭取記憶體

     * 在Linux, [下載「 核心 」 tar .gz " Tomcat分布](https://tomcat.apache.org/download-10.cgi) 拆開它
我們建議在`/usr/local'中拆解。
     * 在Mac上,Tomcat可能已經安裝在‘/Library/Tomcat',但應該更新到最新的Tomcat 10.
如果你下載 [下載「 核心 」 tar .gz " Tomcat分布](https://tomcat.apache.org/download-10.cgi) 并用`/图书馆/Tomcat ' 拆解。
     * 在視窗上,你可以 [下載「 Core」 「 Zip」 Tomcat 發布](https://tomcat.apache.org/download-10.cgi) 
        (它不與 Windows 登記器相混, 您從 DOS 命令列控制它) 并把它打包在适当的目錄中。
        (為了發展,我們使用"Core""zip"分配. 我們做了一個 '/程序 ' 的目錄, 并在那里解開它。) 
或者你可以下載"Core""64位Windows zip"的發行,其中包括更多的功能.
如果发行是 Windows 安裝器, 它可能會放入Tomcat, 例如 `/ 程式檔案/ apache- tomcat-10.0.23' 。
             
### 伺服器.xml{#serverxml} 

*  [伺服器.xml](#serverxml) - 在 'tomcat/conf/ server.xml' 檔案中,你應該對其中的每一個做兩個變更。 <Connector> " 標籤
   (一個是「8080」,一個是「8443」) .
   1.  (推荐) 增加 `連接Timeout' 參數值, 可能增加到 300 000 (毫秒,5分鐘) .
   2.  (推荐) 新增參數 : 'laxedQueryChars=' [] | "`. 這是可選的 安全性稍低一點
但當這些字元出現在使用者要求的 URL 參數中時, 使用者就不需要用%- encode 。
             
### 內容. xml{#contentxml} 

* 上下文. xml -- 資源快取 - 在 Tomcat/conf/conf/context.xml 中,正前方 </Context> " 標籤, 更改資源標籤
   (如果還沒到,就加上去) 設定快取 最大大小參數為 80000 :
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
在卡塔琳娜, 從那開始
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache 超時{#apache-timeout} 

* 在 Linux 電腦上, 變更 Apache 超時設定, 讓耗時的使用者要求不超時
   (常常出現的「 Proxy 」 或「 Bad Gateway 」 錯誤) . 根使用者 :
  * 修改 Apache 。 http d.conf ' 文件 (通常在`/etc/ http d/conf/ `) :
    * 更改现有的` <Timeout> `背景 (或 在檔案的尾端添加一個) 至3600 (秒) ,而不是預設的60或120秒。
    * 更改现有的` <ProxyTimeout> `背景 (或 在檔案的尾端添加一個) 至3600 (秒) ,而不是預設的60或120秒。
  * 重新啟動 Apache : `/usr/ sbin/ apachectl -好极了 ` (但有時它會在不同的目錄中) .

### 安全{#security} 
         
* 安保: 看 [這些指令](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) 提高安全性
您的 Tomcat 安裝, 尤其是公用伺服器 。
         
* 公開 ERDDAP™ Linux 和 Macs 上的設置, 最好建立 Tomcat (程式) 屬于使用者 Tomcat `
   (使用權限有限的單一使用者 [沒有密碼](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
因此,只有超級使用者才能轉換成使用者`Tomcat'。 讓黑客無法登入您的伺服器,
不管怎樣, 您應該讓 'tomcat' 使用者在伺服器的檔案系統( read+write+execution 權限) 上的權限非常有限
用于“ apache- tomcat” 目錄樹和 ” <bigParentDirectory> ` 和只讀權限對有資料的目錄 ERDDAP™ )
  * 您可以建立 Tomcat 使用者帳號 (沒有密碼) 命令:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * 您可以切換為使用者 Tomcat 工作 使用命令
    ```
    sudo su - tomcat
    ```
     (它會要求您提供超過使用者的密碼 以便您允許這麼做) 
    * 您可以使用命令停止使用 Tomcat 。
    ```
    exit
    ````
    * 做大部分的托姆卡特和 ERDDAP™ 設定指令為使用者 Tomcat 。 後來, 執行 'startup.sh' 和 'shutdown.sh' 文稿為使用者的 'tomcat' `
讓Tomcat有權寫入它的日志檔案 。
    * 從「 apache- tomcat」 目錄的母端解開Tomcat後:
      * 將 apache-tomcat 目錄樹的擁有權變更為 tomcat 使用者 。
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (但取代您的 Tomcat 目錄的實名) .
      * 變更「 群組 」 以成為 tomcat, 您的使用者名稱, 或是包含 tomcat 和 Tomcat 的所有管理者的小群組的名稱 。 ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * 變更權限, 讓 tomcat 與群組有讀、 寫、 執行權限 :
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * 移除使用者的讀、寫或執行權限 :
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
這很重要 因為它阻止其他使用者讀取可能敏感的資訊 ERDDAP™ 設定檔案 。

### 記憶{#memory} 

設定Tomcat 的環境變數

* 在 Linux 和 Macs 上 :
建立檔案 Tomcat/ bin/ setenv.sh ` (在紅帽企業 Linux 中 \\[ 瑞爾 \\] ,編輯 QQtomcat/conf/tomcat10.conf `) 設定Tomcat的環境變數。
此檔案將被 'tomcat/bin/ startup.sh' 和 'shutdown.sh' 使用 。 檔案中應該有類似的東西:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (但取代您電腦上的目錄名稱) .
   (如果你以前設置了`JRE_HOME',你可以移除它。) 
在Macs上,你可能不需要设置‘JAVA_HOME'.

* 在視窗上 :
建立檔案 Tomcat\\ bin\\ setenv. bat 以設定Tomcat 的環境變數 。
此檔案將被 'tomcat\bin\\ startup. bat' 和 't' 使用 。 shutdown.bat `.
檔案中應該有類似的東西:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (但取代您電腦上的目錄名稱) .
如果這只是當地試驗, 請移除「 伺服器 」 。
   (如果你以前設置了`JRE_HOME',你可以移除它。) 

`-Xmx ' 和`-Xms ' 記憶體設定很重要,因为 ERDDAP™ 更有記憶力更好
總是把`-Xms'設為與`-Xmx'相同的值。

* 32位操作系統和32位操作系統 Java :
64 位 Java 比32比特好多了 Java 但32位 Java 只要伺服器不忙,它就會工作
伺服器內存越多越好: 4+ GB真的很好, 2 GB是好的,
32 位 Java 即便有丰富的物理記憶 Tomcat和 Java 如果你把 '- Xmx' 設置在 1500M 以上, 不會跑 。 (1200M上一些電腦) .
如果您的伺服器內存小于 2GB, 請減少 `- Xmx' 值 (在 M'egaBytes 中) 至電腦物理記憶體的1/2.

* 64位操作系統和64位操作系統 Java :
64 位 Java 只工作於64位操作系統。
  * 用 Java 8, 你需要在`Setenv.bat'中的Tomcat `CATALINA_OPTS'參數中加入`-d64'。
  * 用 Java 21,你選64位 Java 下載版本 Java 標記為"64位"

有64位 Java 托姆卡特和 Java 可使用很高的“-Xmx”和“-Xms”設定值。 伺服器內存越多越好
我們建議你設置「Xmx」和「Xms」, (在 M'egaBytes 中) 至 1/2 (或以下) 電腦的物理記憶體
你可以看到如果Tomcat, Java 和 ERDDAP™ 正在以 64 位模式執行 。 ERDDAP 每日報告電子郵件
或者在`大父母的董事/ [log.txt](/docs/server-admin/additional-information#log) ' 文件 (`大父母 ' 在 [設定. xml](#setupxml) ) .

#### 垃圾收集{#garbage-collection} 

* 在 ERDDAP™ 是 [log.txt](/docs/server-admin/additional-information#log) 檔案,你會看到很多「GC」 (分配失敗) " 消息。
這通常不是問題 通常由正常操作者發出的訊息 Java 說它剛完成了一個小垃圾
藏品因為在伊甸園的房間沒了 (區域 Java 堆放非常年輕的物件) . 通常訊息會顯示你
`记忆使用前-&gt;记忆使用后 ' 。 如果這兩個數字是相關的 這意味著垃圾收集沒有效果
這個訊息只是很常見的麻煩 (每幾秒) 數量大而不增長
共同表明 Java 需要更多的記憶力,
這可能發生在壓力大的時候,然後消失。 但如果它持續,那就代表了麻煩。
* 如果你看到 `java.lang. ' 。 ERDDAP™ 是 [log.txt](/docs/server-admin/additional-information#log) 文件,
你看 [出自記憶錯誤](/docs/server-admin/additional-information#outofmemoryerror) 如何判斷和解決問題
         
### 權限{#permissions} 

*  [在 Linux 和 Macs 上更改權限](#permissions) 在 Tomcat/ bin/ 中要被擁有者執行的所有檔案:
  ```
  chmod +x *.sh
  ```

### 字体{#fonts} 

*  [影像字体 :](#fonts) 我們更喜歡自由人 [DejaVu 字型](https://dejavu-fonts.github.io/) 至彼 Java 字体。
強烈建議使用這些字型, 但不需要 。

如果您選擇不使用 DejaVu 字型, 您需要將設定中的字体 Family 設定變更為 ` <fontFamily> 桑瑟里夫 </fontFamily> `,
全部可用 Java 分配。 如果你設置 <fontFamily> 以不可用字体命名, ERDDAP™ 不載
并會在 log.txt 檔案中列印可用的字型清單。 您必須使用其中一個字型 。

如果您選擇使用 DejaVu 字型, 請確定 ` <fontFamily> `设置.xml是' <fontFamily> 德雅武桑斯 </fontFamily> `.

要安裝 DejaVu 字型, 請下載 [德雅弗恩茨 .zip ](/DejaVuFonts.zip)   (5,522,795字節,MD5=33E1E61FAB06A547851ED308B4FFEF42) 
將字型檔案解析到暫時目錄。

  * 在 Linux 上 :
    * 用于 Linux 收养 Java 分布,参见 [這些指令](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * 与其他 Java 分布 : 以 'tomcat' 使用者身份, 將字型檔案复制到 '$JAVA_HOME/ lib/ fonts' 所以 Java 能找到字型。
記住:如果/當你稍后升級到更新版本時 Java ,您需要重新安裝這些字型 。
  * 在 Macs 上: 對每個字型檔案, 請雙擊它, 然後點擊安裝字型 。
  * 在 Windows 7 和 10 上: 在 Windows Explorer 中, 選擇所有的字型檔案 。 右按 點擊安裝
             
### 測試Tomcat{#test-tomcat} 

* 試試你的Tomcat設置。
  * Linux :
    * 作為使用者「 Tomcat」 , 執行「 Tomcat/ bin/ startup.sh 」 。
    * 在瀏覽器中檢視您的 URL + ": 8080/" (例如, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * 麥克 (以系統管理員使用者身份執行 tomcat) :
    * 啟動 。
    * 在瀏覽器中檢視您的 URL + ": 8080/" (例如, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
注意你的Tomcat只有你才能使用 它不向公众开放。
  * Windows 本地端主機 :
    * 右擊系統托盤中的 Tomcat 圖示, 選擇「 啟動服務 」 。
    * 查看 [http://127.0.0.1:8080/](http://127.0.0.1:8080/) 或者 [http://localhost:8080/](http://localhost:8080/) 在您的瀏覽器中。 注意你的Tomcat只有你才能使用 它不向公众开放。

你應該看看Tomcat"恭喜"的頁面

如果有問題, 請參考Tomcat的紀錄檔,

### Tomcat設置有問題嗎?{#troubles-with-the-tomcat-installation} 

* 在Linux和Mac上 如果你找不到Tomcat或者 ERDDAP™   (也許你無法從防火牆外面的電腦 找到他們) ,
您可以用輸入來測試托姆卡特是否在聽端口 8080 。 (作为根) 在伺服器的命令行上:

  ```
  netstat -tuplen | grep 8080
  ```

這應該是一行的

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (哪里是數字) ,表示 " java " 程序 (大概是Tomcat吧) 8080號港口的交通量
如果沒有返回行, 如果返回的行相差很大, 或者如果返回了兩條或多條行, 那么端口設定可能有問題 。

* 參考Tomcat紀錄檔案「tomcat/logs/catalina. Tomcat的問題和一些 ERDDAP™ 啟動問題幾乎總是被指出。
這在您第一次建立時很常见 ERDDAP™ .

* 看 [托姆卡特](https://tomcat.apache.org/) 但請告訴我們你有什麼問題,

* 看我們的 [部分](/docs/intro#support) .
             
###  ERDDAP™ 內容{#erddap-content} 
3.   [設定 Tomcat/content/erddap 設定檔 。](#erddap-content) 
在Linux、Mac和Windows上下載 [erddap 內容 .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
并解開它到 'tomcat' 目錄,建立 'tomcat/content/erddap' 。

__ 1. 0.0, 20333字節, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, 日期 2024-10-14___

先前的一些版本也有:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792字節,MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C,日期2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792字節,MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C,日期2022-02-16) 
    *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810字節,MD5=1E26F62E7 A06191E6868C40B9A29362,日期2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810字节,MD5=1E26F62E7A06191E6868C40B9A29362,日期2022-12-08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810字節,MD5=1E26F62E7A06191E6868C40B9A29362,日期2023-02-27) 

#### 其他目錄{#other-directory} 

紅帽企業 Linux (瑞爾) 或不能修改Tomcat目錄或您需要/需要的地方
放在 ERDDAP™ 某些其它位置的內容目錄 (例如,如果你用Jetty代替Tomcat) ,
unzip 命令 .zip ` 進入想要的目錄 (只有“tomcat”使用者才能存取) 并设定` erddapContentDirectory ` 系統屬性
 (例如,` erddapContentDirectory  =~tomcat/content/erddap `) 所以 ERDDAP™ 找到此新內容目錄。

### 設定. xml{#setupxml} 

*  [在 Tomcat/content/erddap/ setup.xml 中讀取註解 `](#setupxml) 并做要求的修改。 設定. xml 是所有設定值的檔案, 指定您如何設定 ERDDAP™ 行為

在初始設定中, 您至少必須改變這些設定 :
      * ` <bigParentDirectory> `
      * ` <emailEverythingTo> `
      * ` <baseUrl> `
      * ` <email...> ' 設定值
      * ` <admin...> ' 設定值
      * ` <baseHttpsUrl> ` (當你們建立的時候, https ) 

當您從大家长會的父目錄中建立大家长會:

    * 讓 'tomcat ' 使用者成為`BigParent Directory ' 的主人:
      ```
      chown -R tomcat bigParentDirectory
      ```
    * 變更「 群組 」 以成為 tomcat, 您的使用者名稱, 或是包含 tomcat 和 Tomcat 的所有管理者的小群組的名稱 。 ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * 變更權限, 讓 tomcat 與群組有讀、 寫、 執行權限 :
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * 移除使用者的讀取、寫入或執行權限 。 這對防止讀取敏感信息很重要
 in ERDDAP™ 紀錄有私密數據集資訊的檔案與檔案。
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### 環境變數{#environment-variables} 

從開始 ERDDAP™ v2.13, ERDDAP™ 管理員可以指定環境變數, 以設定. xml 取代任何值
命名 ERDDAP 執行前的值(_V) ERDDAP™ . 例如,使用` ERDDAP _baseUrl 取代 ` <baseUrl> `价值。
部署時可以方便 ERDDAP™ 使用像 Docker 這樣的容器, 因為您可以將標準設定值放在設定值. xml
,然后通过環境變數提供特殊設定值。 如果你提供秘密信息 ERDDAP™ 通過這個方法,
確保信息保密 ERDDAP™ 每次啟動時只讀取環境變數,
設定環境變數, 啟動 ERDDAP ,
等待到 ERDDAP™ 已啟動,然後取消環境變數。

###  datasets.xml  {#datasetsxml} 

* 讀取註解 [ **与 datasets.xml 文件** ](/docs/server-admin/datasets) . 等會兒,等會兒再說 ERDDAP™ 執行
第一次 (通常只有預設的數據集) ,您會在 Tomcat/content/erddap/ 修改 XML datasets.xml `
指定您想要的所有数据集 ERDDAP™ 服侍。 這就是你大部分時間要花的地方
設置中 ERDDAP™ 后來在維持你的 ERDDAP™ .

你可以看到一個例子 [ datasets.xml 在 GitHub 上](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (不太可能) 現在或 (稍稍可能) 如果您要修改 erddap 的 CSS 檔案, 請复制
`tomcat/content/erddap/images/erddapStart2.cs'到`tomcat/content/erddap/images/erddap2.cs',然后修改。
變更到 erddap2. css 時才生效 ERDDAP™ 重新啟動, 也常常需要使用者清除瀏覽器的缓存檔案 。
     
 ERDDAP™ 如果設定. xml 或 datasets.xml XML 檔案不是很好的檔案。 在你編輯這些檔案后
最好將 XML 文字貼入 XML 檢查器, 以驗證XML 結構良好 [xml 驗證](https://www.xmlvalidation.com/) .
     
### 安裝 erddap 。 戰爭檔案{#install-the-erddapwar-file} 

4. 在 Linux 、 Mac 和 Windows 上, 下載 [戰爭](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war) __ 切入`Tomcat/webapps' :

MD5=48b4226045f950c8a8d69ef9521b9bc9,日期2025-09-05_

. war 檔案很大, 因為它包含高分辨率的海岸线、 邊界、 以及建立地圖所需的海拔資料 。

先前的一些版本也有。

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245字節,MD5=5FEA912B5D42E50EAB9591F773EA848D,日期2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844字節,MD5=461325E97E7577EC671DD50246CCFB8B,日期2022-02-23) 
   *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411字節,MD5=F2CFF805893146E932E498 FDDBD519B6,日期2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765字節,MD5=2B3354F633294213AE2A FDDFCF4DA6D0,日期2022-12-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953字節,MD5=D843A043C506725EBD6F8EFDCA8FD5F,日期2023-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187字節,MD5=970fbee172e28b0b8a07756ecbc898e,日期2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039字節,MD5=652AFC9D1421F00B5F789DA2C4732D4C,日期2024-11-07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032字節,MD5=99a725108b37708e5420986c1616a119,日期2025-03-31) 
   *  [2.2.7.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403字節,MD5=3b2086c659ee4145ca2dff447bf4ef7,日期2025-06-11) 

### 配置代理伺服器 (特定部署)  {#proxy} 

 ERDDAP™ 通常部署在 webserver 反向代理伺服器后面, 以讓它被服務到标准的 HTTP 端口 (80和443) .
SSL/ TLS 终止也常在 webserver 代理層中被套用 。 具体要求取决于每次部署的要求。

#### 阿帕奇語Name{#apache} 

1. 确保“mod_proxy”和“mod_proxy_” http `已載入:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. 修改现有的` <VirtualHost> ' 標籤 (如果有的話) ,或者在檔案尾部添加 :
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

如果 ERDDAP™ 在除 `/ erddap' 之外的其他路徑上, 也將 QQ- prewarded- prefix 信頭設定到
路段 _ 在 `/erddap' 之前。 此設定适合 ERDDAP™ 在
`/子路径/erddap':

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. 重新啟動 Apache : `/usr/ sbin/ apachectl -好极了 ` (但有時它會在不同的目錄中) .
         
#### 尼金克斯{#nginx} 

在 nginx 設定檔中, 設定這些信頭 :
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

如果 ERDDAP™ 在除 `/ erddap' 之外的其他路徑上, 也將 QQ- prewarded- prefix 信頭設定到
路段 _ 在 `/erddap' 之前。 此設定适合 ERDDAP™ 在
`/子路径/erddap':

```
proxy_set_header X-Forwarded-Prefix /subpath
```


要得到NGINX和 ERDDAP™ 正确工作 https ,您需要將以下片段放入Tomcat伺服器.xml 中 。 <Host> `區塊 :
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### 啟動Tomcat{#start-tomcat} 

*  (我不建議使用Tomcat網站應用程式管理員。 如果你不完全關閉和啟動Tomcat, 你遲早會有PermGen記憶體的問題。) 
*  (在 Linux 或 Mac OS 中, 如果您已建立特殊使用者來執行 Tomcat, 例如 Tomcat, 請記住要做以下的步數 。) 
* 如果Tomcat已經在跑,就關閉Tomcat (在 Linux 或 Mac OS 中) `Tomcat/bin/shutdown.sh '
或 (在視窗中) 玩具 shutdown.bat `

在 Linux 上,使用 ps - ef | 在`shutdown.sh'之前和之后,
該行程应在關閉前列出,
可能需要一兩分鐘 ERDDAP™ 完全關閉。 耐心點 或者,如果看起來它不會 自己停止,使用:
"殺 -9" <processID> `
* 用 Tomcat 啟動 (在 Linux 或 Mac OS 中) `Tomcat/bin/startup.sh'或 (在視窗中) 托姆卡特 賓 啟動 `

## 是 ERDDAP™ 跑?{#is-erddap-running} 

使用瀏覽器試圖查看http://www.YourServer.org/erddap/status.html.
 ERDDAP™ 開始時沒有載入任何數據集 。 數據集在背景線中載入, 所以可以逐一使用 。

### 找麻煩{#troubleshooting} 

* 當用戶的請求出現時,它會傳到Apache (在 Linux 和 Mac OS 電腦上) 然后,然后Tomcat,然后 ERDDAP™ .
* 你可以看到阿帕奇的下場 (及相關錯誤) 在 Apache 日志文件中。
*    [你](/docs/server-admin/additional-information#tomcat-logs) 能看到湯姆卡特的下場 (及相關錯誤) 
Tomcat 紀錄檔 (此目錄中的 Tomcat/ logs/ catalina. 和其他檔案) .
*    [你](/docs/server-admin/additional-information#log) 看得到 ERDDAP ,從 ERDDAP ,
而錯誤訊息來自 ERDDAP 在 ERDDAP™ ` <bigParentDirectory> /logs/log.txt ' 文件。
* Tomcat不是開始的 ERDDAP™ 直到Tomcat收到要求 ERDDAP™ . 您可以在Tomcat 紀錄檔中看到它
開始 ERDDAP™ 或者有與此試驗相關的錯誤訊息 。
* 什麼時候 ERDDAP™ 開始,它重命名舊的 ERDDAP™ log.txt 文件 (`日志' 在 <CurrentTime> .txt ') 并建立新的 log.txt 文件。
因此,如果 log. txt 檔案是舊的, 這代表 ERDDAP™ 尚未重新啟動 。 ERDDAP™ 將紀錄信息寫入缓冲器
只將缓冲器定期寫入日志檔, 但你可以強制 ERDDAP™ 透過訪問將缓存寫入日志檔案
` /erddap/status.html `.

### 麻煩: 舊版本 Java  {#trouble-old-version-of-java} 

如果你正在使用版本 Java 太老了 ERDDAP , ERDDAP™ 不會跑, 您會看到Tomcat 日志檔中的錯誤訊息, 如

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

解決辦法是更新最新版本 Java 確保Tomcat在用它

### 麻煩: 第一次慢點啟動{#trouble-slow-startup-first-time} 

Tomcat 第一次應用程式要做很多工作 ERDDAP™ 已啟動; 特別的是, 它必須解開 erddap. war 檔案 。
 (就像是... .zip 文件) . 在一些伺服器上,第一次試圖查看 ERDDAP™ 摊位 (30秒?) 直到這工作完成
在其他伺服器上,第一次試試將立即失敗. 但是如果你再等30秒再試一次 它就會成功 ERDDAP™ 已正确安裝 。

這事沒法解決 托姆卡特就是這麼工作的 但這只是你安裝新版本后第一次 ERDDAP™ .

## 關閉並重新啟動{#shut-down-and-restart} 

以後要關門 (重新啟動)   ERDDAP™ ,看 [如何關閉和重新啟動Tomcat和 ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## 麻煩?{#trouble} 

安裝Tomcat或 ERDDAP™ ? 看我們的 [部分](/docs/intro#support) .

## 新版本的電子郵件通知 ERDDAP  {#email-notification-of-new-versions-of-erddap} 

如果您要收到任何新版本的電子郵件 ERDDAP™ 可用或其他重要 ERDDAP™ 通知,
你可以加入 ERDDAP™ 通知列表 [這裡](https://groups.google.com/g/erddap-announce) . 這張清單平均每三個月大概一個郵件。

## 自訂{#customize} 

*  [自訂您的 ERDDAP™ 要突出您的組織 (不是 NOAA   ERD ) .](#customize) 
* 更改最上面的標籤 ERDDAP™ .html 頁面, <startBodyHtml5> "在你的標籤" datasets.xml 檔案
(如果沒有,就抄送缺省) ERDDAP™ ======================================= 文件
改为` datasets.xml 」。 ) 例如,你可以:
  * 使用不同的影像 (也就是你的組織的標誌) .
  * 變更背景顏色 。
  * 更改 " ERDDAP™ 「你的組織」 ERDDAP™ "
  * 變更「容易存取科學資料」為「方便存取_ Your Organization_'s data」。
  * 改變「帶給你」的連結,
* 更改主頁左邊的資訊, <theShortDescriptionHtml> "在你的標籤" datasets.xml 檔案
(如果沒有,就抄送缺省) ERDDAP™ ======================================= 文件
改为` datasets.xml 」。 ) 例如,你可以:
  * 描述你的組織和/或團體的工作。
  * 描述此資料的類型 ERDDAP™ 有
  * 要改變瀏覽器分頁上的圖示, 請將您的組織的favicon 。 o 在“tomcat/content/erddap/images/”中。
看https://en.wikipedia.org/wiki/Favicon.
