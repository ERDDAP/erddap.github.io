---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## " 播放信息 " 和 " 播放属性 " 标记

### 说明
该功能允许您在“信息”行的数据集页面上显示您选择的全局属性。

### 使用说明
这些标记只能与“Sax parser”使用。 为了实现和使用这些步骤,遵循这些步骤:

1.  **启用 SAX 解析器** 数字 :
在您的“ setup.xml” 文件中添加以下行:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **在“ ” 中添加标记datasets.xml`** 数字 :
 Indatasets.xml`文件,包括两个顶级标记:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **默认行为** 数字 :
   - 如果这些标签没有添加或留空于 `datasets.xml`文件,默认值应用如下:
     - `播放信息 ' : `摘要,License `
     - `散布属性 ' :`摘要、许可证 ' `

4.  **确保一致性** 数字 :
" 播放Info " 和 " 播放属性 " 标记中的逗号分隔值必须相同。

### 如何运作
- " 播放属性 " 标签指定全局属性 (`定义 '<addAttributes>标记) 用于显示每个数据集。
- `DisplayInfo ' 标签中的相应值作为标签显示在UI的`Information ' 栏中。
- 当用户在显示的标签上徘徊时,会出现一个工具提示,显示全局属性的值.

### 示例
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### 数据集全局属性示例:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### UI行为 :
- `Display1 ' 和`Display2 ' 等字将显示在UI的`信息 ' 一行。
- 当徘徊时,工具提示会显示相应的属性值:
  - `Display1':工具提示显示_这是at1_
  - `Display2':工具提示显示_这是at2_

### 页:1
- 确保“发布属性”标记中指定的属性名称与数据集中定义的全局属性匹配。
- 不正确或缺失的属性会日志错误消息 。

通过这些步骤,您可以自定义数据集页面上的“信息”行,以显示带有相应工具提示的相关全局属性。
