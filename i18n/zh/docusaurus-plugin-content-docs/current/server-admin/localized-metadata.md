---
sidebar_position: 8
---
# 本地化元数据

### 说明
此功能允许您包含关于您的数据集和变量的本地化元数据 。 定义于addAttributes标记可以本地化 。 这是为了用于常见的字符串属性,如标题,摘要,许可证,内置. 不建议用于数字 (例如,“填充值”) 或标准化价值 (例如“ioos_分类”) 将这些类型的价值观本地化可能会有令人惊讶的行为。

### 使用说明
为了实现和使用这些步骤,遵循这些步骤:

1.  **在“ ” 中添加标记datasets.xml`** 数字 :
 Indatasets.xml`文件,在添加属性部分添加本地化元数据:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **默认行为** 数字 :
   - 如果不提供xml:lang标记,则所有语言都将显示所提供的信息。 这和上次的比武吻合
   - 如果提供了一些 xml:lang 标记,这些值将被用于这些语言的请求。 如果用户要求的语言没有提供的xml:lang值,则默认语言的值 (联合国) 将被使用。
