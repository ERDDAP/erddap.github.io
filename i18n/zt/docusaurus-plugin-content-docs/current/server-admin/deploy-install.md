---
sidebar_position: 1
---

# 安裝
如何完成初始設定ERDDAP™在您的伺服器上


ERDDAP™可以在任何支持的伺服器上執行Java和 Tomcat (以及杰蒂等其他應用服務器 但我們不支持他們) .ERDDAP™已在 Linux 上驗證 (包括亞馬遜的AWS) 麥克和Windows電腦
*    **嵌入器** -- 我們提供[ERDDAP™嵌入容器](https://hub.docker.com/r/erddap/erddap)而IOOS現在提供[快速啟動指南ERDDAP™在容器中](https://ioos.github.io/erddap-gold-standard/index.html).
這是標準ERDDAP™安裝,在多克容器。
透過嵌入器 撰寫我們提供簡單的設置SL和監控方法,[Docker 文件](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md).
如果您已經使用 Docker, 您可能會更喜歡 Docker 版本 。
如果你想要運行云端服務 你可能會更喜歡Docker版本
*    **亞馬遜** -- 如果你正在安裝ERDDAP™在 Amazon 網路服務 EC2 實例中,請參考此[Amazon 網路服務概述](/docs/server-admin/additional-information#amazon)先
*    **Linux 和 macs** --ERDDAP™在Linux和Mac電腦上做得很好 參考以下指示.
*    **視窗** -- 視窗可以做測試ERDDAP™供私人使用 (参见以下指令) 但我們不建議公開使用ERDDAPs. 執行ERDDAP™在 Windows 上可能會有問題:ERDDAP™可能無法快速刪除和(或)重命名檔案 。 可能是因為防病毒軟體 (例如,McAfee和Norton) 是檢查病毒的檔案 如果你碰到這個問題 (以錯誤訊息在[log.txt](/docs/server-admin/additional-information#log)檔案如"無法刪除...") 改變抗病毒軟體的設定, 或者考慮使用 Linux 或者 Mac 伺服器 。

 **標準ERDDAP™Linux、Macs和Windows 電腦的安裝指令是:** 

0. 確保任何依賴性被安裝 。 在非窗口機上 (Linux 和 Mac) 你需要csh。
## Java {#java} 
1.  [為ERDDAP™v2.19+, 设置Java21.](#java)
出于安全原因,使用最新版本的Java21.
請下載並安裝最新版本
    [領養的 OpenJDK (特穆林) 21 (升) ](https://adoptium.net/temurin/releases/?version=21). 要驗證安裝, 輸入 "/_javaJreBin Directory_/java - version" , 例如 :
本地/jdk-21.0.3+9/jre/bin/java - 版本
    
    ERDDAP™合作Java但我們建議領養, (就像啤酒和演講) 版本Java21 提供长期支持 (初版后多年的免費更新) . 出于安全原因,請更新您的ERDDAP版本Java定期作为新版本Java21人由收养所提供。
    
    ERDDAP™已與 21 個版本相關, 由於种种原因 我們不試驗也不支持其他版本Java.
     
## 托姆卡特{#tomcat} 
2.  [設定](#tomcat) [托姆卡特](https://tomcat.apache.org).
Tomcat是使用最广泛的Java應用程式伺服器, 就是Java介于操作系統的網路服務與Java伺服器軟體類似ERDDAP™. 它是自由開源軟體 (自由和开放源码软件) .
    
你可以再用一個Java應用程式伺服器 (例如,杰蒂) 但我們只和Tomcat一起做測試
     
    
    * 下載Tomcat並在您的伺服器或電腦上解開它 。
為了安全起见, 使用最新版本的Tomcat 10 幾乎總是最好的 (第9版及以下不能接受) 它旨在配合Java21或更新。 下面的Tomcat目錄將被稱為_tomcat_.
        
警告&#33; 如果您已經有 Tomcat 執行其他的網絡應用程式 (特别是THREDDS) 我們建議你安裝ERDDAP™ in[第二隻湯姆貓](/docs/server-admin/additional-information#second-tomcat)因為ERDDAP™需要不同的 Tomcat 設定, 並不需要與其他應用程式對抗內存。
        
        * 在Linux,[下載「 核心 」 tar.gz" Tomcat分布](https://tomcat.apache.org/download-10.cgi)拆開它 我們建議用本地語言來解開它
        * 在Mac上,Tomcat可能已經安裝在/Library/Tomcat中,但應該更新到最新的Tomcat 10.
如果你下載[下載「 核心 」 tar.gz" Tomcat分布](https://tomcat.apache.org/download-10.cgi)把它打包在/Library/Tomcat中。
        * 在視窗上,你可以[下載「 Core」 「 Zip」 Tomcat 發布](https://tomcat.apache.org/download-10.cgi)  (它不與 Windows 登記器相混, 您從 DOS 命令列控制它) 并把它打包在适当的目錄中。 (為了發展,我們使用"Core""zip"分配. 我們做一個/程式目錄 并在那里解開它。) 或者你可以下載"Core""64位Windows zip"的發行,其中包括更多的功能. 如果发行是 Windows 安裝器, 它可能會放入 Tomcat, 例如 / Program 檔案/ apache- tomcat-10.0.23 。
             
### 伺服器.xml{#serverxml} 
*   [伺服器.xml](#serverxml)- 在_tomcat_/conf/server.xml 檔案中,您要對兩者各做兩項變更&lt;連接器 & gt; 標籤 - 1 for
```
        <Connector port="8080" 
```
和一個為
```
        <Conector port="8443"
```
    1.   (推荐) 增加連接Timeout 參數值, 可能增加到 3000 (毫秒)   (5分鐘) .
    2.   (推荐) 新增參數: relaxed QueryChars="\\[\\]|" 這是可選的, 安全性稍低, 但當這些字元出現在使用者要求的 URL 的參數中時, 使用者不需要用% 编码 。
             
### 內容. xml{#contentxml} 
* 上下文. xml - 資源快取 - 在_tomcat_/conf/context.xml,正前方&lt;/ context&gt; 標籤, 變更資源標籤 (如果還沒到,就加上去) 設定快取 最大大小參數為 80000 :
    &lt;資源缓存Allowed="真"缓存MaxSize="80000"/ & gt;
在卡塔琳娜, 從那開始
汪汪\\[主要\\]org.apache.catalina.webresources.cache.get 資源 無法新增資源於\\[/WEB-INF/类/...]".
         
### Apache 超時{#apache-timeout} 
* 在 Linux 電腦上, 變更 Apache 超時設定, 讓耗時的使用者要求不超時 (常常出現的「 Proxy 」 或「 Bad Gateway 」 錯誤) . 根使用者 :
    1. 修改 Apachehttpd.conf 文件 (通常在/etc/httpd/conf/) :
變更已存在的&lt;超時( gt; ) 設定 (或 在檔案的尾端添加一個) 至3600 (秒) ,而不是預設的60或120秒。
變更已存在的&lt;代理超時 & gt; 設定 (或 在檔案的尾端添加一個) 至3600 (秒) ,而不是預設的60或120秒。
    2. 重新啟動 Apache: /usr/ sbin/ apachectl -好极了 (但有時它會在不同的目錄中) .
             
    * 安保: 看[這些指令](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)增加您的Tomcat安裝的安全性, 特别是公共伺服器的安全性 。
         
    * 公開ERDDAP™Linux 和 Macs 上的設置, 最好建立 Tomcat (程式) 屬於使用者「 Tomcat 」 (使用權限有限的單一使用者[沒有密碼](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) . 因此,只有超使用者可以切換成使用者Tomcat。 這讓黑客無法登入您的伺服器為使用者tompcat。 不管怎樣,你應該讓 tomcat 使用者在伺服器的檔案系統上有非常有限的權限(read+write+execution權限的 apache-tomcat 目錄樹和&lt;bigParrent Briedery&gt; 和對有資料的目錄只讀權限ERDDAP™)
        * 您可以建立 tomcat 使用者帳號 (沒有密碼) 使用命令
sudo 使用者添加 tomcat -s /bin/bash - p '\\* ' '
        * 您可以用命令切換為使用者 Tomcat 工作
sudo su - Tomcat
             (它會要求您提供超過使用者的密碼 以便您允許這麼做) 
        * 您可以使用命令停止使用 Tomcat 。
退出
        * 做大部分的托姆卡特和ERDDAP™設定指令為使用者「 Tomcat 」 。 後來, 將啟動的.sh 和關閉的.sh 文稿做成使用者的「 Tomcat 」 , 讓Tomcat 有權寫入它的日志檔案 。
        * 從 apache- tomcat 目錄的母目錄中解開Tomcat:
            
            * 將 apache-tomcat 目錄樹的擁有權變更為 tomcat 使用者 。
彩色 - R 圖片格式 - _ 0.0.23_
                 (但取代您的 Tomcat 目錄的實名) .
            * 變更「 群組 」 以成為 tomcat, 您的使用者名稱, 或是包含 tomcat 和 Tomcat 的所有管理者的小群組的名稱 。ERDDAP例如,
chgrp -R _你的 使用者名稱_ apache-tomcat_10.0.23_
            * 變更權限, 讓 tomcat 與群組有讀、 寫、 執行權限, 例如 。
chmod - Rug+rwx apache-tomcat - _1.0.23_
            * 移除使用者的讀、寫或執行權限 :
chmod - R o-rwx apache-tomcat - _1.0.23_
這很重要 因為它阻止其他使用者讀取可能敏感的資訊ERDDAP™設定檔案 。
            
              
### 記憶{#memory} 
* 設定Tomcat 的環境變數
    
在 Linux 和 Macs 上 :
建立檔案 _tomcat_/bin/setenv.sh (在紅帽企業 Linux 中\\[瑞爾\\],編輯 ~tomcat/conf/tomcat10.conf) 設定Tomcat的環境變數。 此檔案將被 _tomcat_/bin/ sartup.sh 及關閉.sh 使用 。 檔案中應該有類似的東西:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (但取代您電腦上的目錄名稱) .
 (如果你之前設置了JREXHOME,你可以移除它。)   
在Macs上,你可能不需要设置JAVAQHOME。

在視窗上 :
建立檔案 _tomcat_\\bin\\setenv.bat 來設定Tomcat的環境變數 。 此檔案將用於 _tomcat_%bin\\ startup. bat 與shutdown.bat. 檔案中應該有類似的東西:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (但取代您電腦上的目錄名稱) .
如果這只是當地試驗, 請移除「 伺服器 」 。
 (如果你之前設置了JREXHOME,你可以移除它。) 

Xmx 和 -Xms 記憶體設定值很重要, 因為ERDDAP™更有記憶力更好 總是設定 - Xms 與 - Xmx 相同 。

* 32位操作系統和32位操作系統Java:
64 位Java比32比特好多了Java但32位Java只要伺服器不忙,它就會工作 伺服器內存越多越好: 4+ GB真的很好, 2 GB是好的, 32 位Java即便有丰富的物理記憶 Tomcat和Java如果您試著設定 - Xmx 遠超 1500M , 不會跑 。 (1200M上一些電腦) . 如果您的伺服器內存小于 2GB, 請減少 - Xmx 值 (在 M'egaBytes 中) 至電腦物理記憶體的1/2.
* 64位操作系統和64位操作系統Java:
64 位Java只工作於64位操作系統。
    
    * 用Java8, 您需要在 setenv. bat 的 Tomcat CATALINA OPTS 參數中加入 \\-d64 。
    * 用Java21,你選64位Java下載版本Java標記為"64位"
    
有64位Java托姆卡特和Java可使用很高的 - Xmx 和 - Xms 設定值。 伺服器內存越多越好 我們建議您設定 - Xmx 和 - Xms (在 M'egaBytes 中) 至 1/2 (或以下) 電腦的物理記憶體 你可以看到,如果Tomcat,Java和ERDDAP™正在以 64 位模式執行 。ERDDAP每日報告電子郵件, 或是在_ BigParent Birdy_/logs/ 中[log.txt](/docs/server-admin/additional-information#log)文件 (大家长介面(_B)[設定. xml](#setupxml)) .
#### 垃圾收集{#garbage-collection} 
* 在ERDDAP™是[log.txt](/docs/server-admin/additional-information#log)檔案,你會看到很多「GC」 (分配失敗) " 消息。
這通常不是問題 通常由正常操作者發出的訊息Java因為伊甸園裡沒有房間了 (區域Java堆放非常年輕的物件) . 通常訊息會顯示您的 _ memory uses before_Q&gt;_memory uses befter_。 如果這兩個數字是相關的 這意味著垃圾收集沒有效果 這個訊息只是很常見的麻煩 (每幾秒) 數量大且不增長,Java需要更多的記憶力, 這可能發生在壓力大的時候,然後消失。 但如果它持續,那就代表了麻煩。
* 如果你看到java.lang。ERDDAP™是[log.txt](/docs/server-admin/additional-information#log)文件,参见[出自記憶錯誤](/docs/server-admin/additional-information#outofmemoryerror)如何判斷和解決問題
         
### 權限{#permissions} 
*   [在 Linux 和 Macs 上更改權限](#permissions)全部\\*.sh檔案在 _tomcat_/bin/ 中由所有者執行,例如,與
```
    chmod +x \\*.sh  
```
### 字体{#fonts} 
*   [影像字体 :](#fonts)我們更喜歡自由人[DejaVu 字型](https://dejavu-fonts.github.io/)至彼Java字体。 強烈建議使用這些字型, 但不需要 。
    
如果您選擇不使用 DejaVu 字型, 您需要更改設定中的字型家庭設定 。 xml 。&lt;字型家庭 & gt; SansSerif&lt;/ font Family&gt; , 全部可用Java分配。 如果你把字型「家庭」設為不可用字型的名稱,ERDDAP™不會載入並會在log.txt 檔案中列印可用的字型清單 。 您必須使用其中一個字型 。
    
如果您選擇使用 DejaVu 字型, 請確定設定中的字型家庭設定 。 xml 是&lt;字体 家庭 & gt; DejaVu Sans&lt;/font Family&gt;.
    
要安裝 DejaVu 字型, 請下載[德雅弗恩茨.zip](/DejaVuFonts.zip)  (5,522,795字節,MD5=33E1E61FAB06A547851ED308B4FFEF42) 將字型檔案解析到暫時目錄。
    
    * 在 Linux 上 :
        * 用于 Linux 收养Java分布,参见[這些指令](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/).
        * 与其他Java分布 : 作为 Tomcat 的使用者, 將字型檔案複製成 _JAVAXHOME_/lib/fonts 以至Java能找到字型。 記住:如果/當你稍后升級到更新版本時Java,您需要重新安裝這些字型 。
    * 在 Macs 上: 對每個字型檔案, 請雙擊它, 然後點擊安裝字型 。
    * 在 Windows 7 和 10 上: 在 Windows Explorer 中, 選擇所有的字型檔案 。 右按 點擊安裝
             
### 測試Tomcat{#test-tomcat} 
* 試試你的Tomcat設置。
    * Linux :
        * 以使用者「 Tomcat 」 身份執行 _ tomcat_/ bin/ startup.sh
        * 在瀏覽器中檢視您的 URL + ": 8080/" (例如,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .
        * 你應該看看Tomcat"恭喜"的頁面
如果有麻煩, 請參考Tomcat 紀錄檔_ tomcat_/logs/catalina.
    * 麥克 (以系統管理員使用者身份執行 tomcat) :
        * 執行 _tomcat_/bin/啟動.sh
        * 在瀏覽器中檢視您的 URL + ": 8080/" (例如,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) . 注意你的Tomcat只有你才能使用 它不向公众开放。
        * 你應該看看Tomcat"恭喜"的頁面
如果有麻煩, 請參考Tomcat 紀錄檔_ tomcat_/logs/catalina.
    * Windows 本地端主機 :
        
        * 右擊系統托盤中的 Tomcat 圖示, 選擇「 啟動服務 」 。
        * 查看[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/)或者[ http://localhost:8080/ ](http://localhost:8080/)在您的瀏覽器中。 注意你的Tomcat只有你才能使用 它不向公众开放。
        * 你應該看看Tomcat"恭喜"的頁面
如果有麻煩, 請參考Tomcat 紀錄檔_ tomcat_/logs/catalina.
            
### Tomcat設置有問題嗎?{#troubles-with-the-tomcat-installation} 
* 在Linux和Mac上 如果你找不到Tomcat或者ERDDAP™  (也許你無法從防火牆外面的電腦 找到他們) ,您可以通过輸入來測試Tomcat是否在聽端口 8080 。 (作为根) 在伺服器的命令行上:
```  
    netstat -tuplen | grep 8080  
```
這應該是一行的
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     ("#"是位數字) ,表示"java"程序 (大概是Tomcat吧) 8080號港口的交通量 如果沒有返回行, 如果返回的行相差很大, 或者如果返回了兩條或多條行, 那么端口設定可能有問題 。
* 參考Tomcat紀錄檔_tomcat_/logs/catalina. out. Tomcat的問題和一些ERDDAP™啟動問題幾乎總是被指出。 這在您第一次建立時很常见ERDDAP™.
* 看[托姆卡特](https://tomcat.apache.org/)但請告訴我們你有什麼問題,
* 看我們的[部分](/docs/intro#support).
             
### ERDDAP™內容{#erddap-content} 
3.  [建立_tomcat_/content/erddap配置文件 。](#erddap-content)  
在Linux、Mac和Windows上下載[erddap 內容.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (版本 1.0.0, 20333字節, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5,日期2024-10-14) 將它解析成 _tomcat_, 建立_tomcat_/content/erddap.

    \\[先前的一些版本也有:
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792字節,MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C,日期2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792字節,MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C,日期2022-02-16)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810字節,MD5=1E26F62E7 A06191E6868C40B9A29362,日期2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810字节,MD5=1E26F62E7A06191E6868C40B9A29362,日期2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810字節,MD5=1E26F62E7A06191E6868C40B9A29362,日期2023-02-27) 
將它解析成 _tomcat_, 建立_tomcat_/content/erddap.\\]
    
#### 其他目錄{#other-directory} 
紅帽企業 Linux (瑞爾) 或是你無法修改Tomcat目錄 或者你想/需要放進ERDDAP™某些其它位置的內容目錄 (例如,如果你用Jetty代替Tomcat) , 解字串.zip進入想要的目錄 (只有使用者=tomcat才有存取權) 設置erddapContentDirectory系統屬性 (例如,erddapContentDirectory=~tomcat/content/erddap) 所以ERDDAP™找到此新內容目錄。
    
### 設定. xml{#setupxml} 
*   [讀取註解_tomcat_/content/erddap/ **設定. xml** ](#setupxml)并做要求的修改。 設定. xml 是所有設定值的檔案, 指定您如何設定ERDDAP™行為
在初始設定中, 您至少必須改變這些設定 :
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
當您從大家长會的父目錄中建立大家长會:
    
    * 使使用者=tomcat 成為大家长會的主人,例如,
```
        chown -R tomcat _bigParentDirectory_
```
    * 變更「 群組 」 以成為 tomcat, 您的使用者名稱, 或是包含 tomcat 和 Tomcat 的所有管理者的小群組的名稱 。ERDDAP例如,
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * 變更權限, 讓 tomcat 與群組有讀、 寫、 執行權限, 例如 。
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * 移除使用者的讀取、寫入或執行權限 。 這對防止讀取可能敏感的資訊很重要ERDDAP™使用私密數據集資訊紀錄檔案與檔案 :
```
        chmod -R o-rwx _bigParentDirectory_
```

### 環境變數{#environment-variables} 
從開始ERDDAP™v2.13,ERDDAP™管理員可以指定一個命名的環境變數, 以設定. xml 取代任何值ERDDAPXQ值Name _ 在執行前ERDDAP™. 例如,使用ERDDAPQQBaseUrl 覆蓋&lt;baseUrl&gt; 值。 部署時可以方便ERDDAP™使用像 Docker 的容器, 因為您可以在 setup. xml 中設定標準設定值, 並通過環境變數提供特殊設定值 。 如果你提供秘密信息ERDDAP™確保這些資訊將保密。ERDDAP™每個啟動的第一秒只讀取一次環境變數, 所以使用的方法之一是: 設定環境變數, 啟動ERDDAP,直到ERDDAP™已啟動,然後取消環境變數。
    
### datasets.xml {#datasetsxml} 
* 讀取註解[ **与datasets.xml文件** ](/docs/server-admin/datasets). 等會兒,等會兒再說ERDDAP™第一次跑 (通常只有預設的數據集) 您將修改 XML 中的 XML 。_tomcat_/content/erddap/ **datasets.xml** 指定您想要的所有数据集ERDDAP™服侍。 在這裡你可以花你大部分時間來設置ERDDAP™后來在維持你的ERDDAP™.

你可以看到一個例子[datasets.xml在 GitHub 上](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).
     
*    (不太可能) 現在或 (稍稍可能) 如果您要修改 Erdddap 的 CSS 檔案, 請將檔案複製成_tomcat_/content/erddap/ images/ erddapStart2. cs 叫做 erddap2. cs, 然后修改它 。 變更到 erddap2. cs 才生效ERDDAP™重新啟動, 也常常需要使用者清除瀏覽器的缓存檔案 。
     
ERDDAP™如果設定. xml 或datasets.xmlXML 檔案不是很好的檔案。 因此,在您編輯這些檔案後, 最好將 XML 文字貼入 XML 檢查器, 以確認結果是否是好的 XML 。[xml 驗證](https://www.xmlvalidation.com/).
     
### 安裝 erddap.war 檔案{#install-the-erddapwar-file} 
4. 在Linux、Mac和Windows上下載[戰爭](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war)輸入 _tomcat_/webapps 。
     (2.28.0, 620, 824, 288字節, MD5=f948 b2ba603f65a83ac67af43da9e4c2, 日期08- 29-2025) 
    
. war 檔案很大, 因為它包含高分辨率的海岸线、 邊界、 以及建立地圖所需的海拔資料 。
    
    \\[先前的一些版本也有。
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245字節,MD5=5FEA912B5D42E50EAB9591F773EA848D,日期2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069,844字節,MD5=461325E97E7577EC671DD50246CCFB8B,日期2022-02-23)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411字節,MD5=F2CFF805893146E932E498 FDDBD519B6,日期2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765字節,MD5=2B3354F633294213AE2A FDDFCF4DA6D0,日期2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953字節,MD5=D843A043C506725EBD6F8EFDCA8FD5F,日期2023-03-03) 
    [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187字節,MD5=970fbee172e28b0b8a07756ecbc898e,日期2024-06-07) 
    [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039字節,MD5=652AFC9D1421F00B5F789DA2C4732D4C,日期2024-11-07) 
    [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)  (607,404,032字節,MD5=99a725108b37708e5420986c1616a119,日期2025-03-31) 
    [2.2.7.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)  (620,554,403字節,MD5=3b2086c659ee4145ca2dff447bf4ef7,日期: 06-11-2025) 
    \\]
    
#### 代理 Pass{#proxypass} 
5. 使用代理伺服器 傳球讓使用者不必把端口號碼, 例如: 8080, 放到網址中 。
在 Linux 電腦上, 如果Tomcat 用 Apache 執行, 請修改 Apache 。httpd.conf 文件 (通常在/etc/httpd/conf/) 以允許 HTTP 通訊到或從ERDDAP™不需要端口號碼, 例如 : 8080, 在 URL 中 。 根使用者 :
    1. 修改已有的&lt;VirtualHost&gt; 標籤 (如果有的話) ,或者在檔案尾部添加 :
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. 重新啟動 Apache: /usr/ sbin/ apachectl -好极了 (但有時它會在不同的目錄中) .
         
### 尼金克斯{#nginx} 
 (UNCO蒙古) 如果您使用[尼金克斯](https://www.nginx.com/)  (網頁伺服器與載入平衡器) :
以取得NGINX和ERDDAP™正确工作https,您需要將以下片段放入Tomcat伺服器.xml&lt;主機 & gt; 區塊 :
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
在 nginx 設定檔中, 您需要設定這些信頭 :
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (多虧了凱爾·威爾科克斯)   
     
### 啟動Tomcat{#start-tomcat} 
*    (我不建議使用Tomcat網站應用程式管理員。 如果你不完全關閉和啟動Tomcat, 你遲早會有PermGen記憶體的問題。)   
     
*    (在 Linux 或 Mac OS 中, 如果您已建立特殊使用者來執行 Tomcat, 例如 Tomcat, 請記住要做以下的步數 。)   
     
* 如果Tomcat已經在跑,就關閉Tomcat (在 Linux 或 Mac OS 中) _tomcat_/bin/ shutdown.sh
或 (在視窗中) 垃圾桶(_T)shutdown.bat
    
在 Linux 上,使用 ps - ef|關閉前后的 grep tomcat.sh 以確保 tomcat 行程已停止 。 該行程应在關閉前列出, 可能需要一兩分鐘ERDDAP™完全關閉。 耐心點 或者,如果看起來它不會 自己停止,使用:
取消 -9 _ processID_
    
* 用 Tomcat 啟動 (在 Linux 或 Mac OS 中) _tomcat_/bin/啟動.sh
或 (在視窗中) _tomcat_\\bin\\ 啟動。 bat

## 是ERDDAP™跑?{#is-erddap-running} 
使用瀏覽器試圖查看 http://_www.YourServer.org_/erddap/status.html   
ERDDAP™開始時沒有載入任何數據集 。 數據集在背景線中載入, 所以可以逐一使用 。

### 找麻煩{#troubleshooting} 
* 當用戶的請求出現時,它會傳到Apache (在 Linux 和 Mac OS 電腦上) 然后,然后Tomcat,然后ERDDAP™.
* 你可以看到阿帕奇的下場 (及相關錯誤) 在 Apache 日志文件中。
*   [你](/docs/server-admin/additional-information#tomcat-logs)能看到湯姆卡特的下場 (及相關錯誤) Tomcat 紀錄檔 (tomcat_/logs/catalina. 出局與該目錄中的其他檔案) .
*   [你](/docs/server-admin/additional-information#log)看得到ERDDAP,從ERDDAP錯誤訊息ERDDAP在ERDDAP™ &lt;bigParrent Directory&gt;logs/log.txt 檔案。
* Tomcat不是開始的ERDDAP™直到Tomcat收到要求ERDDAP™. 如果啟動, 您可以在Tomcat 紀錄檔中看到ERDDAP™或者有與此試驗相關的錯誤訊息 。
* 什麼時候ERDDAP™開始,它重命名舊的ERDDAP™log.txt 文件 (對數ArchivedAt_Currenttime_.txt) 并建立新的 log.txt 文件。 所以,如果木。 txt 檔案已舊, 表示ERDDAP™尚未重新啟動 。ERDDAP™寫入資訊到缓冲器, 只定期將缓冲器寫入紀錄檔, 但你可以強制ERDDAP™以訪問方式將缓冲器寫入紀錄檔.../erddap/status.html.

### 麻煩: 舊版本Java {#trouble-old-version-of-java} 
如果你正在使用版本Java太老了ERDDAP,ERDDAP™不會跑, 您會看到Tomcat 日志檔中的錯誤訊息, 如
線中的例外 java. lang。 未支援的 ClassVersion Error :
某些/ 类/ 名稱(_S): 不支援的主要. minor 版本 _ some Number_
解決辦法是更新最新版本Java確保Tomcat在用它

### 麻煩: 第一次慢點啟動{#trouble-slow-startup-first-time} 
Tomcat 第一次應用程式要做很多工作ERDDAP™已啟動; 顯然它必須解開 erddap 。 戰爭檔案 (就像是....zip文件) . 在一些伺服器上,第一次試圖查看ERDDAP™摊位 (30秒?) 直到這工作完成 在其他伺服器上,第一次試試將立即失敗. 但是如果你再等30秒再試一次 它就會成功ERDDAP™已正确安裝 。
這事沒法解決 托姆卡特就是這麼工作的 但這只是你安裝新版本后第一次ERDDAP™.

## 關閉並重新啟動{#shut-down-and-restart} 
以後要關門 (重新啟動)  ERDDAP,看[如何關閉和重新啟動Tomcat和ERDDAP](/docs/server-admin/additional-information#shut-down-and-restart).
## 麻煩?{#trouble} 
安裝Tomcat或ERDDAP? 看我們的[部分](/docs/intro#support).
## 新版本的電子郵件通知ERDDAP {#email-notification-of-new-versions-of-erddap} 
如果您要收到任何新版本的電子郵件ERDDAP™可用或其他重要ERDDAP™通知,你可以加入ERDDAP™通知列表[這裡](https://groups.google.com/g/erddap-announce). 這張清單平均每三個月大概一個郵件。
## 自訂{#customize} 
[自訂您的ERDDAP™要突出您的組織 (不是NOAA ERD) .](#customize)
    * 更改最上面的標籤ERDDAP™.html 頁面&lt;啟動您的 BodyHtml5 & gt; 標籤datasets.xml文件。 (如果沒有,就抄送缺省)ERDDAP是
        \\[湯姆卡\\]/webapps/erddap/WEB-INF/class/gov/noaa/pfel/erddap/util/messages.xml 檔案進入datasets.xml并編輯它。 ) 例如,你可以:
        * 使用不同的影像 (也就是你的組織的標誌) .
        * 變更背景顏色 。
        * 更改 "ERDDAP「你的組織」ERDDAP"
        * 變更「容易存取科學資料」為「方便存取_ Your Organization_'s data」。
        * 改變「帶給你」的連結,
    * 通过編輯&lt;描述 Html & gt; 標籤datasets.xml文件。 (如果沒有,就抄送缺省)ERDDAP是
        \\[湯姆卡\\]/webapps/erddap/WEB-INF/class/gov/noaa/pfel/erddap/util/messages.xml 檔案進入datasets.xml并編輯它。 ) 例如,你可以:
        * 描述你的組織和/或團體的工作。
        * 描述此資料的類型ERDDAP™有
    * 要改變瀏覽器分頁上的圖示, 請將您的組織的favicon 。 ico 英寸_tomcat_/content/erddap/影像/. 看[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon).
