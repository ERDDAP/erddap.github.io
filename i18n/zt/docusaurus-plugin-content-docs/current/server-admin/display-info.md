---
sidebar_position: 7
---
#  `顯示 信息` 和 `顯示屬性` 標籤

## 描述
此功能可以讓您在數據集頁面上顯示您選擇的全局屬性 `信息` 划

## 用法指令
這些標籤只能用於 `Sax 解析器` . 要啟動並使用它們,

1.  **開啟 SAX 解析器** :
在您的 `設定. xml` 文件 :
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **新增標籤 ` datasets.xml ` ** :
在 ` datasets.xml ` 檔案,包括兩個頂層標籤 :
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **預設行為** :
   - 如果這些標籤不是新增或留空的 。 ` datasets.xml ` 預設值如下:
     -  `顯示 信息` : `摘要,License` 
     -  `顯示屬性` : `摘要,牌照` 

4.  **确保一致性** :
二者的逗號分隔值數量 `顯示 信息` 和 `顯示屬性` 標籤必須是相同的 。

## 如何工作
- 其 `顯示屬性` 標籤指定全局屬性( 在&lt; ` addAttributes ` 要為每個數據集顯示 & gt; 標籤 。
- 中的相应值 `顯示 信息` 標籤在 `信息` UI的一排。
- 當使用者在顯示的標籤上徘徊時, 會出現一個工具提示, 顯示全局屬性值 。

## 示例
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### 數據集全球屬性示例 :
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### UI 行為 :
- 字 `顯示1` 和 `顯示2` 顯示于 `信息` 排在UI。
- 當徘徊時, 工具提示會顯示相应的屬性值 :
  -  `顯示1` : 工具提示顯示 _ 這是 at1_
  -  `顯示2` : 工具提示顯示 _ 這是 at2_

## 注
- 确保指定的屬性名稱 `顯示屬性` 標籤符合數據集中定义的全局屬性。
- 不正確或錯誤的屬性會記錄錯誤訊息 。

遵循這些步徑,你可以自訂 `信息` 在數據集頁面上排行以顯示相關的全局屬性與相应的工具提示 。
