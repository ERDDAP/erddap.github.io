---
sidebar_position: 7
---
#  `显示 资讯` 和 `显示属性` 标记

## 说明
此特性允许您在您所选择的数据集页面上显示您的全局属性 。 `资料` 排队

## 使用说明
这些标记只能用在 `萨克斯解析器` 。 。 。 为了实现和使用这些步骤,遵循这些步骤:

1.  **启用 SAX 解析器** 数字 :
在您的 `设置. xml` 文件 :
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **添加标记到 ` datasets.xml ` ** 数字 :
在那个 ` datasets.xml ` 文件,包括两个顶级标签:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **默认行为** 数字 :
   - 如果这些标记未添加或留空于 ` datasets.xml ` 文件,默认值应用如下:
     -  `显示 资讯` 数字 : `概要,语气` 
     -  `显示属性` 数字 : `摘要,许可证` 

4.  **确保一致性** 数字 :
两者的逗号分隔值数 `显示 资讯` 和 `显示属性` 标记必须是相同的。

## 如何运作
- 那个 `显示属性` 标记指定全局属性(定义于&lt; ` addAttributes ` 为每个数据集显示 & gt; 标记 。
- 中的相应值 `显示 资讯` 标签显示为标签 `资料` (原始内容存档于2018-09-21). rain of the UI.
- 当用户在显示的标签上徘徊时,会出现一个工具提示,显示全局属性的值.

## 示例
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### 数据集全局属性示例:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### UI行为 :
- 词 `显示1` 和 `显示2` 将显示在 `资料` 在UI上排队.
- 当徘徊时,工具提示会显示相应的属性值:
  -  `显示1` : 工具提示显示_ 这是 at1_
  -  `显示2` : 工具提示显示 _ 这是 at2_

## 页:1
- 确保指定在 `显示属性` 标记匹配数据集中定义的全局属性。
- 不正确或缺失的属性会日志错误消息 。

通过这些步骤,你可以定制 `资料` 在数据集页面上行以显示带有相应工具提示的相关全局属性。
