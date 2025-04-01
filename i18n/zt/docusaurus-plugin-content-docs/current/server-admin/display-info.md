---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## 播放信息與播放屬性 標籤

### 描述
此功能可以讓您在「 資訊」 一行的數據集頁面上顯示您選擇的全局屬性 。

### 用法指令
這些標籤只能使用 'Sax parser' 。 要啟動並使用它們,

1.  **開啟 SAX 解析器** :
在您的 ` setup. xml' 檔案中加入以下一行 :
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **新增標籤到 `datasets.xml`** :
在`datasets.xml檔案, 包括兩個頂級標籤 :
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **預設行為** :
   - 如果這些標籤沒有在 `datasets.xml`檔案, 預設值如下 :
     - " 播放信息 " : 概要,License `
     - `播放屬性 ' :`摘要、许可证 `

4.  **确保一致性** :
“ 播放Info” 和“ 播放屬性” 標籤中的逗號分隔數值必須相同 。

### 如何工作
- " 播放屬性 " 標籤指定了全局屬性( 在&lt;`addAttributesQQgt; 標籤) 要顯示每個數據集 。
- 在 UI 的“ 資訊 ” 一行中, 以標籤顯示 。
- 當使用者在顯示的標籤上徘徊時, 會出現一個工具提示, 顯示全局屬性值 。

### 示例
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### 數據集全球屬性示例 :
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### UI 行為 :
- `Display1 ' 和`Display2 ' 的字句将在UI的`Information ' 一行中展出。
- 當徘徊時, 工具提示會顯示相应的屬性值 :
  - `Display1':工具提示顯示 _ 這是at1_
  - `Display2':工具提示顯示 _ 這是 at2_

### 注
- 確保「 播放屬性」 標籤中指定的屬性名稱符合數據庫中定义的全局屬性 。
- 不正確或錯誤的屬性會記錄錯誤訊息 。

您可以遵循這些步數, 在數據集頁面自訂「 資訊」 一行, 用相应的工具提示顯示相關的全局屬性 。
