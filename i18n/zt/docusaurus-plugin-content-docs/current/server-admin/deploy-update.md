---
sidebar_position: 2
---
# 更新
如何更新已有的ERDDAP™在您的伺服器上

## 變更{#changes} 
1. 更改列表于[變更](/changes)中ERDDAP™管理者需要知道和做ERDDAP™版本自你使用的版本。
     
## Java {#java} 
2. 如果你是升級自ERDDAP™2.18或以下版本,需要切換到Java21 (或更新) 和相關的托姆卡特10。 常見ERDDAP™安裝指令[Java](/docs/server-admin/deploy-install#java)和[托姆卡特](/docs/server-admin/deploy-install#tomcat). 你也要抄你_tomcat_/content/erddap從你以前的Tomcat安裝到新的Tomcat安裝

## 下載{#download} 
3. 下載[戰爭](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)輸入 _tomcat_/webapps 。
     (2.27.0, 620, 554, 403字節, MD5=3b2086c659ee4145ca2dff447bf4ef7, 日期 06-11-2025) 
     
## 信件. xml{#messagesxml} 
4. 
    * 常见 : 如果你是升級自ERDDAP™1.46版本 (或以上) 您只需使用標準訊息, 新的標準訊息. xml 會自動安裝 (通過 erddap 的 . class 檔案中 。 戰爭) .
         
    * 稀有 : 如果你是升級自ERDDAP™1.44版本 (或以下) ,
您必須刪除舊信件. xml 檔 :
        _tomcat_/content/erddap/消息.xml.
新的標準訊息. xml 會自動安裝 (通過 erddap 的 . class 檔案中 。 戰爭) .
         
    * 稀有 : 如果您總是修改標準訊息. xml 文件 (已就位) ,
您需要修改新信件.xml 檔(即
WEB-INF/class/gov/noaa/pfel/erddap/util/messages.xml 在 erddap.
         
    * 稀有 : 如果您保持自訂信件. xml 檔在其中_tomcat_/content/erddap/,
你需要弄清楚 (通过 diff) 對預設信件. xml( 在新 erddap 中) 做了什麼變更 。 戰爭
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml),並依此修改您的自訂信件.xml檔案 。
         
## 安裝{#install} 
5. 安裝新ERDDAP™在Tomcat:
\\* 別用Tomcat經理 遲早會有PermGen記憶問題 最好關閉和啟動Tomcat。
用您的電腦上真正的Tomcat目錄來取代下面的引用 。
     
### Linux 和 macs{#linux-and-macs} 
1. 關閉Tomcat: 從命令行, 使用: _tomcat_/bin/shutdown.sh
使用 ps -ef|grep tomcat 看是否/ 當此行程停止 。 (可能需要一兩分鐘) 
2. 移除已解壓ERDDAP™安裝 : 在 _tomcat_/webapps 中,使用
rm -rf erddap
3. 刪除舊的 erddap 。 戰爭檔案: 在 _tomcat_/webapps 中, 使用 rm erddap 。 戰爭
4. 复制新的 erddap 。 從临时目錄到_tomcat_/webapps 的戰爭檔案
5. 重新啟動Tomcat和ERDDAP: 使用_tomcat_/bin/啟動.sh
6. 查看ERDDAP™在您的瀏覽器中檢查重启是否成功 。
     (通常你得試一下 等一等ERDDAP™.)   
             
### 視窗{#windows} 
1. 關閉Tomcat: 從命令行中, 使用: _ tomcat_\\\\\\\\\shutdown.bat
2. 移除已解壓ERDDAP™安裝 : 在 _tomcat_/webapps 中,使用
del/S/Q 厄德達普
3. 刪除舊的 erddap 。 戰爭檔案 : 使用 del erddap 。 戰爭
4. 复制新的 erddap 。 從暫時目錄到 _tomcat_\\_webapps 的戰爭檔案
5. 重新啟動Tomcat和ERDDAP: 使用 _tomcat_%bin\\ sartup.bat
6. 查看ERDDAP™在您的瀏覽器中檢查重启是否成功 。
     (通常你得試一下 等一等ERDDAP™.) 

更新問題ERDDAP? 看我們的[部分](/docs/intro#support).
