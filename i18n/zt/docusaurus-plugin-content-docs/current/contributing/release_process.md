---
sidebar_position: 3
---
# ERDDAP™釋放流程
* 確保影像比對檔案可用 (這可能意味著要執行「 mvn 驗證 」 , 如果您要加速此限制只限影像比對群組, 雖然需要做 Jetty 測試 。) 
* 更新依赖性
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* 更新插件
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* 執行測試, 確保所有主要設定的依赖性更新沒有損壞任何東西 (數據集特別解析, 雖然其他重要設定) 
```
mvn verify
```
* 使用翻譯 () 需要更新翻譯
* EDStatic.java 設定發展 模式變假, 更改版本號并指定發行日期 。
* 建造
```
mvn clean
mvn compile
mvn package
```
## 加那利
將戰爭檔案傳送至 Coastwatch 伺服器或其他使用數據集類型且接收大量流量的伺服器上分发。
我們想先找出錯誤,

提到新放行時包含訊息 。

通常的程序是:
* 上傳 . war 檔案到海岸觀察\\[湯姆卡\\]/内容/erddap/
* 使用者= tomcat :
  * 在\\[湯姆卡\\]/bin/:
. / shutdown.sh // 使用"ps - fu tomcat",以确保它已停止
  * 在\\[湯姆卡\\]/webapps/ :
rm -rf erddap
厄德達普 戰爭
cp ./内容/erddap/erddap2.22. war 或不管數字是多少
  * 在\\[湯姆卡\\]/bin/:
/啟動.sh
  * 之后ERDDAP已傳回網頁, in\\[湯姆卡\\]/webapps/ :
chgrp - R arddap irdddap
chmod - R g+rw erddap
chmod - R o- rwx erddap

## GitHub 釋放
包括 erddap..zip  (沒有版本編號) 

title: The official v2.25 version
描述: 在
       https://erddap.github.io/changes#version-225
 

## 文件更新
* 更新 docusaurus.config.ts文件中的版本號 (在尾部) .
* 編輯文件頁面 (部署/安装/更新/部署) .
  * 搜尋\\[戰爭\\] 
  * 复制已有信息 (稍稍重排) 移至前一個裝置清單 2.
  * 變更目前 erddap 的放行資訊 。 戰爭\\[戰爭\\]
* 執行文件網站的翻譯 。
* 提出拉動要求並合并變更 。
* 部署文件站 (讀取) .

## 确保其他重存按需要更新
這主要意味著ErddapContent和ErddapTest, 但是在發展變更期間應該保持更新。

## 通知使用者
先通知任何要求更改的使用者 (或者誰的蟲子被修好了) . 讓他們有時間驗證改變和/或提出問題。

ERDDAP2.25版本已可用&#33;

您可以在
 https://erddap.github.io/changes#version-225
 

有些變化是你建議的變化。 謝謝你的建議 在變更清單中搜尋您的名稱以查看細節 。 希望你們能盡快試試新功能,

如果你是...ERDDAP管理員, 升級指令已於
 https://erddap.github.io/docs/server-admin/deploy-update
 

如果你有任何問題、問題、建議 請發郵件給我

謝謝你的用法ERDDAP.

### 宣告发布
傳送通知郵件清單 。
