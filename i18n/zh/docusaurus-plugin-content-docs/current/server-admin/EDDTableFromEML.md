---
title: "EDDTableFromEML"
sidebar_position: 6
---
# 来自EML的EDD表和来自EMLBatch的EDD表 生成数据中的选项 xml 数据

 \\[ 本网页只涉及 ERDDAP™ 从事 EML 文件工作的管理员 。
这份文件最初创建于2016年. 最近一次编辑于2020-11-30. \\] 

 [ ** ERDDAP™ ** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 是一个数据服务器,它为用户提供了一个简单,一致的方法,以通用文件格式下载网格化和表格化的科学数据集子集,并制作图表和地图. ERDDAP™ 作为一组多维网格变量与给定数据集一起工作 (例如,卫星或模型数据) 或作为类似数据库的表格 (每类信息各有一栏,每条观察各有一行) 。 。 。 。 ERDDAP™ 是自由开源软件,所以任何人都可以 [下载和安装 ERDDAP™ ](/docs/server-admin/deploy-install) 服务他们的数据。

将数据集添加到 ERDDAP™ 安装 ERDDAP™ 管理员必须将描述数据集的 XML 块添加到名为文件中 datasets.xml 。 。 。 。 (有个 [完整文档 datasets.xml ](/docs/server-admin/datasets) 。 。 。 。) 虽然可以生成 XML 块,用于 datasets.xml 完全通过手, ERDDAP™ 带一个工具来,叫做 [ **生成 DatasetsXml** ](/docs/server-admin/datasets#tools) 它可以生成基于数据集某些信息来源的给定数据集所需的XML块的粗略草稿。

第一件事就是创造Datasets Xml 询问您想要创建什么样的数据集 。 生成数据 Xml有一个特别的选择, **EDD 表来自EML** 中,它使用一个 [生态元数据语言 (EML 电子邮件) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) 生成 XML 块的 XML 文件 datasets.xml 创建一个 [来自 Ascii 文件夹的 EDD 表格](/docs/server-admin/datasets#eddtablefromasciifiles) EML文件中每个数据表中的数据集。 这对大多数EML文件来说非常有效,这主要是因为EML文件在以易于操作的格式存储数据集所需的所有元数据方面做了出色的工作. GenerateDatasetsXml创建数据集需要的信息在EML文件中,包括数据文件的URL,它生成DatasetsXml的下载,解析,并与EML文件中的描述进行比较. (许多组会很好地切换到EML,这是一个很好的系统,可以记录任何表格式科学数据集,而不仅仅是生态数据. 许多创建XML schemas的团体 最好将 EML 用作 XML schema 的案例研究。 (也就是说,过多的级别) 也方便人类和计算机工作) 

## 问题{#questions} 

这里有所有的问题 生成 Datasets Xml 将询问, 以及您要处理一个 EML 文件或一组 EML 文件应如何回答 :

* 哪个EDDTYPE?
如果您想要处理一个文件, 请回答: EDDTable FromEML
如果您想要处理一组文件, 请回答: EDDTable FromEMLBatch
* 要存储文件的目录 ?
输入用于存储已下载的 EML 和/或数据文件的目录名称 。
如果目录不存在,将会被创建.
*    (对于 EDD 表从EML 仅限) EML URL 或本地文件Name
输入 EML 文件的 URL 或本地文件名 。
*    (仅用于 EMLBatch 的 EDD 表格) EML 目录 (URL 或当地) ? 。 。 。
使用 EML 文件输入目录名称 (URL 或本地目录) 。 。 。 。
例如:http://sbc.lternet.edu/data/eml/files/
*    (仅用于 EMLBatch 的 EDD 表格) 文件名 regex 吗 ?
输入用于识别 EML 目录中想要的 EML 文件的正则表达式 。
例如: knb-lter-sbc\\.\\d+
* 显示时使用本地文件 (真实 | 虚假) ? 。 。 。
输入真实性以使用现有的本地 EML 文件和数据文件, 如果它们存在的话 。
输入错误以总是重新下载 EML 文件和/或数据文件 。
* 无障碍 要吗?
如果您想让新数据集成为私人数据集 ERDDAP ,指定组的名称 (编号) 这将会被允许进入。
建议使用 LTER 组: 组合“ lter” + 组, 如 liter (原始内容存档于2018-09-21). Sbc.
如果输入“ null” , 就不会&lt;无障碍 输出中的togt; 标记 。
见 [无障碍 改为](/docs/server-admin/datasets#accessibleto) 。 。 。 。
* 当地 时区 (例如,美国/太平洋) ? 。 。 。
如果一个时间变量表示它有本地时间值,这个时区会被指定.
这一定是从 [TZ 时区名称列列表](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) 。 。 。 。
注意列表末尾所有易于使用的"US/..."名称.
如果你后来发现这不正确,你可以改变 time\\_zone 块 datasets.xml 。 。 。 。

EML 加号 ERDDAP™ 这是一个伟大的组合,因为 ERDDAP™ 可让用户更直接地获得 [生物复杂知识网络 (国家银行) ](https://knb.ecoinformatics.org/) 和 [长期生态研究 (升) ](https://lternet.edu/) 数据 帮助这些项目满足美国政府的要求 [公众获取研究成果的机会 (牧师) 所需经费](https://nosc.noaa.gov/EDMC/PD.DSP.php) 通过网络服务提供数据。 还有,EML+ ERDDAP™ 似乎是一个伟大的桥梁 科学家在学术/NSF 资助的领域 和科学家 在联邦机构 ( NOAA 美国航天局,USGS) 领域。

看我们的 [关于获得额外支助的章节](/docs/intro#support) 。 。 。 。
 
## 设计细节{#design-details} 

以下是GenerateDatasetsXml中的EDDTable FromEML选项的设计细节.
有些与EML和E/C.12/1/Add.1和E/C.12/1/Add.1和E/C.12/Add.1和E/C.12/Add.1和E/C.12/Add.1和E/C.12/Add.1和E/C.12/Add.1和E/C.12/Add.1和E/C.12/Add.1和E/C.12/Add.1和E/C.12/Add.1和E/C.12/Add.1和E/C.12/Add.1和E/C.12/Add.1和E/C.12/Add.1和E/C.12/Add.1和E/C.12/Add.1和E/C.12/1/Add.1和E/C.12/1/Add.1和E/C.1/C.1/Add.1和E/C.5/Add.1和E/C.5和E/C.5和E/C.5和E/C.5和E/C.5和E/C.5和E/C.5和E/C.5和E/C.5和E/C.5和E/C.5和E/C.5和E/C.6和E/C.6和E/C.6和E/C.6和E/C.6和E/C.6和E/C.6和E/C ERDDAP™ 做事和如何创造达塔斯 Xml处理这些问题.

### 一个数据表变成一个 ERDDAP™ 数据集{#one-datatable-becomes-one-erddap-dataset} 
一个 EML 文件可能有多个&lt;数据 表格( G) 。 ERDDAP™ 制作一个 ERDDAP™ eML数据表。 那个 datasetID 数据集为
 *EML 语句Name* \\_t *数量*   (当 EML 名称为文本时) 或
 *系统QQEML Name* \\_t *数量*   (当 EML 名称是一个数字时) 。 。 。 。
例如,文件 knb- lter- sbc.28 中的表 1 变成 ERDDAP™   datasetID &#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;我很高兴见到你
     
### EML 对 CF+ACDD{#eml-versus-cfacdd} 
EML 文件中几乎所有元数据都进入 ERDDAP ,但格式不同。 ERDDAP™ 使用 [CF 数字](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 和 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准。 它们是互补的元数据系统,对全球元数据和每个变量的元数据使用按键=值对。
是的,元数据的EML代表比CF+ACDD代表更好. 我不是建议使用CF+ACDD代表作为EML的替代. 请考虑将CF+ACDD作为从EML世界到 OPeNDAP /CF/ACDD世界.
     
### 小变化{#small-changes} 
 ERDDAP™ 做了很多小改变。 举例来说, ERDDAP™ 使用 EML 非- DOI 候补 标识符加数据表编号为 ERDDAP™   datasetID ,但略有变化 在大多数计算机语言中使其成为有效变量名称的标识符,例如 knb-lter- sbc.33 数据 表1成为knb\\_lter\\_sbc\\_33\\_t1.
     
### 多库{#docbook} 
EML使用DocBook的标记系统为EML文件中的文本块提供结构. CF和ACDD要求元数据为纯文本. 因此生成 Datasets Xml 将标注的文本转换成纯文本,看起来像文本的格式版本. 内衬标签用方括号进行消毒,例如, \\[ 强调 \\] ,然后在正文中留下。
     
### 数据文件{#data-files} 
由于 EML 数据表包含实际数据文件的 URL, 生成 Datasets Xml 会:
1. 下载数据文件 。
2. 存储在与 EML 文件相同的目录中 。
3. 读数据
4. 将EML中的数据描述与文件中的实际数据进行比较.
5. 如果生成 Datasets Xml 找到差异, 它处理这些差异, 或者询问操作员这些差异是否正常, 或者返回错误消息 。 详情见下文各项目。
         
###  .zip 'd 数据文件{#zipd-data-files} 
如果引用的数据文件是 .zip 文件,它必须包含一个文件。 该文件将被用于 ERDDAP™ 数据集。 如果有超过一个文件 。 ERDDAP™ 将拒绝该数据集。 如果需要,可以修改。 (实际上,所有的SBC LTER zip文件只有一个数据文件.)   
     
### 存储类型{#storagetype} 
如果列的存储 未指定类型, ERDDAP™ 使用基于数据文件中数据的最佳猜测。 这很有效
     
### 单位{#units} 
 ERDDAP™ 用途 [ UDUNITS 单位的格式](https://www.unidata.ucar.edu/software/udunits/) 。 。 。 生成数据 Xml 能够将 EML 单元转换为 UDUNITS 95%的时间是干净的 其余5%对单位进行可读描述,例如,EML中的“生物物质敏感度UnitPerAfundance Unit”成为“每个丰度单位的生物物质密度单位”。 ERDDAP 。 。 。 从技术上讲,这是不允许的。 在当时的形势下,我不觉得这么糟糕. \\[ 必要的话,不能制造的单位 UDUNITS 兼容可以移动到变量的注释属性。 \\]   
     
### EML 版本 2.1.1{#eml-version-211} 
对 EML v2.1.1 文件的这种支持被添加到 GenerateDatasets 2016年的Xml,希望EML社区会有一些吸收. 截至2020年,这种情况尚未发生。 那个 ERDDAP™ 开发者将乐于为更近期的EML版本添加支持,但前提是新功能将实际使用. 请发电子邮件 erd.data at noaa.gov 如果您想要支持最近版本的 EML , 并且将实际使用此功能。
     

## 与 EML 文件有关的问题{#issues-with-the-eml-files} 

EML 文件存在一些问题/问题, 当软件客户端出现问题时会产生问题 (例如生成DatasetXML中的 EDDTable FromEML 选项) 尝试解释/处理 EML 文件 。

* 虽然这里列出了几个问题,但它们大多是小的,可以解决的问题. 总的来说,EML是一个伟大的系统,我很高兴与它合作。
* 这些大致从最差/最常见到最差/不太常见。
* 大部分与特定EML文件中的小问题有关 (不是EML的错) 。 。 。 。
* 大多数可以通过对EML文件或数据文件的简单修改来固定.
* 鉴于LTER人员正在建立一个EML检查器以测试EML文件的有效性,我在下文中增加了一些关于可以添加到检查器中的特性的建议.

以下是问题:

### 单独的日期和时间列{#separate-date-and-time-columns} 
一些数据文件有独立的日期和时间栏,但没有统一的日期+时间栏. 目前, 生成数据 Xml 创建了带有这些独立的列的数据集,但并不理想,因为:

* 最好把数据集输入 ERDDAP™ 有合并日期+时间栏 "time" 。 。 。 。
* 数据集往往不会装入 ERDDAP™ 因为 "time" 栏中没有日期+时间数据。

有两种可能的解决办法:
1. 编辑源数据文件以便在数据文件中添加新列 (并在EML中描述) 其中日期和时间栏合并为一个栏。 然后重运行生成数据 Xml,所以它找到新的一栏。
2. 使用 [衍生变量](/docs/server-admin/datasets#script-sourcenamesderived-variables) 特性在 ERDDAP™ 中定义新变量 datasets.xml 它通过调和日期和时间柱而建立。 其中一个例子专门涉及这种情况。
         
### 不一致的列名称{#inconsistent-column-names} 
EML文件列出了数据文件的列及其名称. 不幸的是,它们往往不同于实际数据文件中的列名. 通常,EML文件中的列顺序与数据文件中的列顺序相同,即使名字略有不同,但并不总是. 生成数据 Xml 试图匹配列名 。 当它不能 (常见) ,它将停止,显示 EML/数据文件名对齐,并询问它们是否对齐。 如果您要跳过表格输入“ s ” , 生成 DatasetsXml 会打印一个错误消息, 并转到下一个表格 。
解决方案是更改EML文件中错误的列名,以匹配数据文件中的列名.
     
### 不同的列顺序{#different-column-order} 
有几种情况,EML以不同于数据文件中存在的列的顺序指定列. 生成数据 Xml 将停止并询问操作员匹配是否正常, 或者是否应该跳过数据集 。 如果它被跳过,则结果文件中会有错误消息,例如:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
解决方案是固定这些EML文件中的列顺序,使其与数据文件中的顺序相符.

如果EML检查器检查出源文件中的列和列顺序与EML文件中的列和列顺序相匹配,那会很好.
    
### 不正确的数字头线{#incorrect-numheaderlines} 
若干数据 表格错误地表示数字头线=1,例如.sbc.4011。 这导致 ERDDAP™ 将第一行数据读作列名。 我尝试了手动SKIP 所有这些数据表。 它们很明显,因为没有匹配的源 col 名称都是数据值. 如果有文件有错误的 数字头线=0, 我的系统不使它明显。 以下是SBC LTER失败文件的一个例子:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
因此错误可能出现为生成 Datasets Xml 认为文件中有数据的第一行 (例如,与2008-10-01T00:00等.) 是列名称的直线 (如2008-10-01T00:00是一个列名) 。 。 。 。

如果EML 检查器检查了数字头线值, 将会很好 。
    
### 数字头线= 0{#numheaderlines--0} 
一些源文件没有列名. ERDDAP™ 接受,如果EML描述的列数相同。

我认为:这似乎非常危险。 可能有不同顺序或不同单位的列 (见下文) 没有办法抓住这些问题。 如果所有 ASCII 数据文件都有列名,则要好得多 。
    
### 日期时间格式字符串{#datetime-format-strings} 
EML有一个标准的方法来描述日期时间格式. 但它在EML文件中的使用有相当大的差异. (我之前对这件事有错误 我看到EML文档中的格式String似乎与 [ Java 日期时间](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html) ,但是缺乏关于使用它的重要准则,结果格式String经常/通常被不当使用。) 有几起情况不正确和(或)信件重复和(或)格式不标准。 这给客户端带来了不合理的负担,特别是GenerateDatasetsXml等软件客户端. 生成数据 Xml 试图将 EML 文件错误定义的格式转换为
 [日期/时间格式 ERDDAP™ 要求](/docs/server-admin/datasets#string-time-units) ,这几乎与 Java /Joda时间格式规格,但稍加宽释.

如果EML检查器要求严格遵守 Java 约达/ ERDDAP 时间单位规格,并核实数据表中的日期时间值可以用规定的格式正确分析。
    
### 约会时间但无时区{#datetime-but-no-time-zone} 
生成数据 Xml 寻找带有日期的列 时间和指定时区 (无论是 Zulu : 从结束于“ Z” 的时间单位或包含“ gmt” 或“ utc” 的列名或属性定义, 或本地: 从列名或属性定义中的“ 本地”) 。 。 。 也可以接受的是带有日期栏但无时间栏的文件. 也可以接受没有日期或时间资料的文件。

生成数据 Xml 将所有“ 本地” 时间视为您可以指定某一批文件的时区, 例如, SBC LTER, 使用 US/ Pacific 。 这些信息有时出现在评论中,但并不以计算机程序易于解析的形式出现.

不符合此标准的文件会被拒绝, 信件“ NO Good Date ” (时间) 可变。 共同的问题有:

* 有一栏有日期,一栏有时间,但没有日期 时间专栏.
* 虽然有时间单位,但时区没有指定.

其他评论:
如果时区栏有好的日期+时间,则该栏将被命名 "time" 输入 ERDDAP 。 。 。 。 ERDDAP™ 要求时间栏数据可理解/可转换为 Zulu /UTC/GMT 时区日期 Times. \\[ 我相信:使用当地时间和不同的日期/时间格式 (2位数年&#33; mm/dd/yy对dd/mm/y对s.) 在数据文件中迫使终端用户进行复杂的转换 Zulu 时间来比较一个数据集的数据和另一个数据集的数据。 这么说 ERDDAP™ 将所有时间数据标准化 : 对于字符串时间, ERDDAP™ 总是使用 ISO 8601:2004 (英) 标准格式,例如1985-01-02T00:00Z. 对于数字时间, ERDDAP™ 总是使用 "seconds since 1970-01-01T00:00:00Z" 。 。 。 。 ERDDAP™ 总是使用 Zulu   (协调世界时,格林尼治标准时) 消除不同时区和标准时段工作与节日时间工作之间的困难。 因此生成 Datasets Xml 寻求带有日期+时间的 EML 数据表列 Zulu 。 。 。 这很困难,因为EML没有使用正式的词汇/系统 (喜欢 [ Java / 乔达时间格式](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html) ) 用于指定数据 时间格式 :
如果有一个带有数字时间值的曲线 (例如, Matlab 时间) 和 Zulu 时区 (或只是日期,没有时间栏) ,用作 "time" 。 。 。 。
如果与日期和时间数据相匹配,请使用 Zulu 时区,它被用作 "time" 并删除任何其他日期或时间栏。
如果找到有日期信息的相机,则用作 "time" 变量 (无时区) 。 。 。 。
如果有数据栏和时间栏但没有合并日期 时间栏,数据集是REJEETED——但数据集可以通过增加一个合并日期来使用. 时间栏 (最好是这样 Zulu 时区) 在数据文件中添加其描述。
从SBC LTER的演示: [https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/) 数据表2。

如果EML/LTER要求包含一个列,并带有 Zulu   (协调世界时,格林尼治标准时) 所有相关源数据文件中的时间。 下一个最佳办法是在EML中添加一个系统来指定一个 time\\_zone 使用标准名称的属性 (从 [TZ 栏](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ) 。 。 。 。
    
### 失踪 missing\\_value  {#missing-missing_value} 
一些栏使用a missing\\_value 但不要在EML元数据中列出它,例如Knb-lter-sbc.5011中的降水量XXmm使用-999. 如果 EML 没有指定缺失值, 生成 DatasetsXml 将自动搜索常见缺失值 (例如,99、99、999、999、9999、9999等。) 并创建元数据。 但其他失踪 missing\\_value s没有被抓住。

如果EML检查器找不到就好了 missing\\_value 编号
    
### 小问题{#small-problems} 
有很多小问题 (拼写, 缩写) 可能只有检查每个数据集的人才能找到

如果EML检查器能查找拼写和语法错误,那会很好. 这是一个困难的问题,因为科学中的词语经常被拼写检查符标记. 很可能需要人文编辑。
    
### 无效的 Unicode 字符{#invalid-unicode-characters} 
一些EML内容包含无效的Unicode字符. 这些可能是Windows字符集中错误复制并粘贴到UTF-8 EML文件中的字符. 生成数据 Xml对这些字符进行消毒,例如, \\[ 128号 \\] 因此,他们很容易在 ERDDAP™   datasets.xml 文档。

如果EML检查器能检查一下就好了 很容易找到,很容易解决。
    
### 不同的列单位] (不同的单位)  {#different-column-unitsdifferentcolumnunits} 
一些EML数据表定义了与数据文件中的列不一致的列,特别是因为它们有不同的单位. 生成数据 Xml标记这些。 分歧是否成立,由经营者决定。 这些在失败文件中作为"SKIPPED"数据表出现. SBC LTER 失败文件中的EXAMPLE :
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
如果EML检查器检查单位是否匹配,那会很好. 不幸的是,由于源文件不包括单位,如果不与数据集创建者联系,这很可能是不可能抓住的,然后是不可能解决的. 以上例子的差异之所以明显,只是因为这些单位被列入源列名称和EML列名称。 有多少其他数据表存在这个问题,但无法检测?
    
### EML 的不同版本{#different-versions-of-eml} 
生成数据 Xml设计与EML 2.1.1合作. 其他版本的EML将工作到匹配2.1.1或者GenerateDatasetsXml有特殊代码处理的程度. 这是一个罕见的问题。 当它发生时,解决方案是将您的文件转换为 EML 2.1.1, 或者将 EML 文件发送到 erd.data at noaa.gov ,所以我可以修改 生成达塔斯 Xml 处理差异。

Bob 向 GenerateDataset 添加了对 EML 文件的支持 2016年的Xml,希望EML社区会有一些吸收. 截至2020年,这种情况尚未发生。 鲍勃很高兴加入对更近期的EML版本的支持,但只有在新功能实际使用的情况下. 请发电子邮件 erd.data at noaa.gov 如果您想要支持最近版本的 EML , 并且将实际使用此功能。
    
### 分析数据文件的问题{#trouble-parsing-the-data-file} 
极少数情况下,一个数据表可能会被拒绝,错误是"第120行中不预期的项目数量" (观测值=52,预期值=50) " , " 像这样的错误消息意味着数据文件中的一行的数值与其他行不同. 这可能是个问题 ERDDAP™   (例如,没有正确解析文件) 或在文件中。 从SBC LTER的演示:
 [https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/) 数据表3,参见datafile=LTER=月度QQBottledata=已注册\\_站\\_20140429.txt
