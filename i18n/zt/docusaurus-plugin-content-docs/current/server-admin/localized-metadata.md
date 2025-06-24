---
sidebar_position: 8
---
# 本地化元数据

### 描述
此功能允許您包含關於您的數據集與變數的本地化中繼資料 。 任何屬性addAttributes標籤可以本地化 。 這是要用於共同的字串屬性, 如標題、摘要、許可證、建設等 。 不建議用於數字 (例如: "FillVale") 或标准化值 (例如,“ioos_ classic”) 可能會有令人驚訝的行為。

### 用法指令
要啟動並使用它們,

1.  **新增標籤到 `datasets.xml`** :
在`datasets.xml`檔案, 在新增屬性區域中加入您的本地化中繼資料 :
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **預設行為** :
   - 如果未提供 xml: lang 標籤, 所有語言都會顯示已提供的信息 。 這和上次的比武很搭配
   - 如果提供了一些 xml: lang 標籤, 這些數值會用於這些語言的要求 。 如果使用者要求的語言沒有提供的 xml: lang 值, 預設語言的值 (注) 使用。
