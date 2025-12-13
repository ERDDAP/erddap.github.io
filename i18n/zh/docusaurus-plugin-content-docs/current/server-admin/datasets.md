---
sidebar_position: 3
---
# 与 datasets.xml 文件

 \\[ 本网页只涉及 ERDDAP™ 行政人员。 \\] 

在你跟随之后 ERDDAP™   [安装指令](/docs/server-admin/deploy-install) ,您必须编辑 datasets.xml 文件输入 *移动猫* /content/erddap/,用来描述您的数据集 ERDDAP™ 安装将服务。

你可以看到一个例子 [ datasets.xml 关于 GitHub 的](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) 。 。 。 。

- - 说吧

##  [导言](#introduction)  {#introduction} 

### 需要一些大会{#some-assembly-required} 
设置一个数据集 ERDDAP™ 不只是指向数据集的目录或 URL 。 您必须写一块 XML 用于 datasets.xml 用于描述数据集。

* 用于网格数据集,以使数据集符合 ERDDAP 用于网格化数据的数据结构,您必须确定一个数据集变量的子集,这些变量具有相同的维度. ( [为什么?](#why-just-two-basic-data-structures)   [怎么会?](#dimensions) ) 
* 数据集当前元数据自动导入. 但如果要修改元数据或添加其他元数据,则必须在 datasets.xml 。 。 。 。 还有 ERDDAP™ 需要其他元数据,包括 [全局属性](#global-attributes)   (例如, infoUrl 机构, sourceUrl 、摘要和标题) 和 [变量属性](#variable-addattributes)   (例如, long\\_name 单位) 。 。 。 正如目前数据集中的元数据为数据集添加描述性信息一样, ERDDAP™ 在数据集中添加描述性信息. 添加的元数据是您数据集的一个很好的添加, 并有助于 ERDDAP™ 做好向不熟悉的用户展示数据的工作.
*    ERDDAP™ 需要你做一些特别的事情 与 [经度、纬度、高度 (或深度) 时间变量](#destinationname) 。 。 。 。

如果你买进这些想法 并花费精力创建 XML datasets.xml ,你得到了所有的优势 ERDDAP™ ,包括:

* 数据集的全文搜索
* 按类别搜索数据集
* 数据访问表 ( * datasetID * .html (中文(简体) ).) 因此,您可以请求一个不同格式的数据子集
* 请求图表和地图的表格 ( * datasetID * 图片) 
* 网络地图服务 ( WMS ) 用于网格数据集
*    RESTful 访问您的数据

创造 datasets.xml 最初的几个数据集需要大量努力,但 **变容易了** 。 。 。 在第一个数据集之后,您可以经常为下一个数据集重新使用很多工作. 幸运的是, ERDDAP™ 来两个 [工具](#tools) 帮助您为每个数据集创建 XML datasets.xml 。 。 。 。
如果你卡住了,见我们的 [关于获得额外支助的章节](/docs/intro#support) 。 。 。 。

### 变量在 datasets.xml  {#varaibles-in-datasetsxml} 

截止 ERDDAP™ 2.2.9.0版本, datasets.xml 现在 (可选) a 处理 [字符串替代器](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) 。 。 。 这有许多用途,包括设置私有值 (如密码) 使用环境变量。 可以通过设置 EnvParsing 在设置. xml 中设置为假来禁用此选项 。

### 数据提供者 表单{#data-provider-form} 
当一个数据提供者来 想要添加一些数据到您的 ERDDAP 收集所有元数据可能既困难又费时 (关于数据集的信息) 需要将数据集添加到 ERDDAP 。 。 。 。 许多数据来源 (例如,.csv文件, Excel 文件、数据库) 没有内部元数据,所以 ERDDAP™ 拥有一个数据提供者表格,从数据提供者收集元数据,并向数据提供者提供一些其他指导,包括广泛的指导 [数据库中的数据](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases) 。 。 。 所提交的信息转换成 datasets.xml 格式,然后发电子邮件到 ERDDAP™ 管理员 (老师) 并写入 (附 录) 改为 *大家长会* /logs/data ProviderForm.log. (原始内容存档于2018-03-09). 因此,表格半自动化了将数据集输入 ERDDAP 不过 ERDDAP™ 管理员仍然需要完成 datasets.xml 块并处理获取数据文件 (编号) 从提供者或连接到数据库。

从外部来源提交实际数据文件是一个巨大的安全风险,所以 ERDDAP™ 不处理这一点。 您必须想出一个对您和数据提供者有效的解决方案, 例如电子邮件 (用于小文件) 从云中拉出 (例如, DropBox 或 Google 驱动器) ,一个 sftp 站点 (带有密码) ,或运动鞋 净额 (USB 拇指驱动器或外部硬盘) 。 。 。 你也许应该只接受你认识的人的文件 您需要扫描病毒的文件,并采取其它安全防范措施。

没有联系 ERDDAP™ 到数据提供者表格 (例如,关于 ERDDAP™ 主页) 。 。 。 相反,当有人告诉你,他们希望 他们的数据服务于你 ERDDAP 你可以发电子邮件给他们说:
是的,我们可以把数据输入 ERDDAP 。 。 。 要开始,请填写表格https://*yourUrl*/erddap/dataProviderForm.html  (或 http:// 若为 https:// 未启用) 。 。 。 。
完事后 我会联系你 确定最后的细节
如果你只是想看看表格的话 (没有填满它) ,可见表格上 ERD 因为 ERDDAP 数字 : [导言](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html) , (中文). [第一编](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html) , (中文). [第2编](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html) , (中文). [第三编](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html) ,以及 [第四编](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html) 。 。 。 。 这些链接在 ERD   ERDDAP™ 所以不要跟他们提交信息 除非你真的想把数据添加到 ERD   ERDDAP 。 。 。 。

如果您想要删除数据提供者表格 ERDDAP™ 设置
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
在您的设置.xml文件中。

其动力是 NOAA 截止2014年 [公众获取研究成果的机会 (牧师) 指令](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf) ,这要求所有 NOAA 以纳税人美元供资的环境数据可通过数据服务提供 (不仅仅是文件) 在创建后的12个月内。 因此人们越来越有兴趣使用 ERDDAP™ 通过ASAP服务提供数据集。 我们需要一个更有效的方法来对付大量的数据提供者。

反馈/建议? 此表格是新格式, 请通过电子邮件 。 erd dot data at noaa dot gov 如果你有任何反馈或建议来改进这一点。

### 工具{#tools} 
 ERDDAP™ 包含两个命令行程序,它们是帮助您为您想要的每个数据集创建 XML 的工具 ERDDAP™ 服务。 一旦你建立了 ERDDAP™ 运行它 (至少有一次) ,您可以在 *移动猫* /webapps/erddap/WEB-INF目录. 有 Linux/ Unix  shell 脚本 (与扩展.sh) 和 Windows 脚本 (与扩展.bat) 每个程序。 \\[ 在 Linux 上,将这些工具作为同一个用户运行 (汤姆猫?) 这会运行汤姆卡特。 \\] 当你运行每个程序, 它会问你的问题。 对于每个问题,键入一个响应,然后按 Enter. 或者按 ^C 在任何时候退出一个程序 。

#### 程序不会运行?{#program-wont-run} 

* 如果您获得未知的程序 (或类似) 错误消息,问题可能是操作系统找不到 Java 。 。 。 。 你该知道在哪里 Java 在您的电脑上,然后编辑您想要使用的.bat或.sh文件中的java引用。
* 如果您得到一个没有找到的 jar 文件或类没有找到错误消息, 那么 Java 找不到您想要使用的 . bat 或 .sh 文件中列出的一个类 。 解决方案是找出 .jar 文件的位置 编辑 .bat 或 .sh 文件中的 Java 引用 。
* 如果你正在使用一个版本 Java 对程序来说太老了,程序不会运行,你会看到错误消息,比如
线索"main" java.lang中的例外 。 未支持的 ClassVersion Error :
     *部分/ 类/ 名称* : 不支持的主要. minor 版本 *数量*   
解决办法是更新最新版本的 Java 并且确定程序的 .sh 或.bat 文件正在使用它。

#### 这些工具打印各种诊断信息:{#the-tools-print-various-diagnostic-messages} 

* “错误”一词是当某事出错以致程序未能完成时使用的。 虽然犯错误很烦人,但错误迫使你处理问题。
* "WARNING"一词在某事出错时被使用,但程序得以完成. 这些很罕见。
* 任何其他信息都只是信息。 您可以添加 &- 动词到 [生成 DatasetsXml](#generatedatasetsxml) 或 [达斯德](#dasdds) 命令行以获取额外信息消息,这有时有助于解决问题。

这两个工具是很大的帮助,但是你仍然必须仔细阅读这页上的所有这些指示,自己作出重要的决定.

### 生成 DatasetsXml{#generatedatasetsxml} 
*    **生成 DatasetsXml** 是一个命令行程序,可以为几乎所有类型的数据集生成一个数据集XML的粗略草稿。
    
我们强烈建议你用创世纪游戏 Xml 而不是创建块 datasets.xml 由于:
    
    * 生成数据 Xml工作在几秒钟。 手工做这个至少是一小时的工作,即使你知道自己在做什么.
    * 生成数据 Xml做一个更好的工作。 手动做到这一点需要广泛了解如何 ERDDAP™ 工作时 你不可能亲手做得更好 (鲍勃・西蒙斯总是使用生成的Datasets 初稿的Xml 他写道 ERDDAP 。 。 。 。) 
    * 生成数据 Xml 总是生成一个有效的块 datasets.xml 。 。 。 。 任意块 datasets.xml 您所写的至少会有一些错误可以防止 ERDDAP™ 从装入数据集。 人们往往要花几个小时才能诊断出这些问题。 别浪费时间 让生成 数据集 XML做艰苦的工作。 如果你愿意,你可以用手提炼.xml。
    
当您使用生成时 Xml 程序 :
    
    * 在Windows上,您第一次运行GenerateDatasetsXml时,需要用文本编辑器编辑GenerateDatasetsXml.bat文件,以更改java的路径. exe 文件, 以便 Windows 找到 Java 。 。 。 。
    * 生成数据 Xml 第一次请求您指定 EDDType (Erd Dap 数据集 类型) 数据。 见 [数据集类型列表](#list-of-types-datasets)   (在本文档中) 以了解适合您正在研究的数据集的类型。 除了普通的EDDTyps以外,还有少数 [特殊/专题数据集类型](#specialpseudo-dataset-types)   (例如,一个爬行THREDDS目录生成块 datasets.xml 对于目录中的每个数据集) 。 。 。 。
    * 生成数据 Xml然后问你一系列关于EDDType的具体问题. 问题收集所需的资料,以便: ERDDAP™ 访问数据集的来源。 来了解什么 ERDDAP™ 中,请参见您单击该数据库中的同一数据集类型所指定的 EDDType 文档。 [数据集类型列表](#list-of-types-datasets) 。 。 。 。
        
如果您需要输入带有特殊字符的字符串 (例如,开头或结尾的白空字符,非 ASCII 字符) 输入 [JSON 风格字符串](https://www.json.org/json-en.html)   (用\\ 字符逃脱的特殊字符) 。 。 。 例如,只需输入一个标签字符,就输入“\\t”(加上周围的双引号,该引号显示 ERDDAP™ 这是JSON风格的弦
        
    * 通常,你的答案之一 将不会是生成DatasetXml需要的。 然后您可以再次尝试, 并修改对问题的答案, 直到生成 Datasets Xml能够成功找到和理解源数据.
    * 如果你答对了问题 (或足够正确) ,生成数据 Xml 会连接到数据集的来源并收集基本信息 (例如,可变名称和元数据) 。 。 。 。
用于本地数据集 NetCDF   .nc 和相关文件,生成 Datasets Xml在文件首次读取后会经常打印文件的 ncdump 类似结构. 这可能为您提供信息, 以更好的方式通过 GenerateDatasetsXml 在随后的循环中回答问题 。
    * 生成数据 Xml 然后为该数据集生成一个数据集XML的粗略草稿.
    * 诊断信息和数据集XML的粗略草稿将写给 *大家长会* /logs/GenerateDatasetsXml.log. 互联网档案馆的存檔,存档日期2013-03-02.
    * 数据集 XML 的粗略草稿将写入 *大家长会* /logs/GenerateDatasetsXml.out. [永久失效連結] (中文(简体) ).
#### "0档案" 错误消息{#0-files-error-message} 
如果您运行生成数据 Xml 或 缩写 [达斯德](#dasdds) ,或者如果你试图加载一个 EDDGrid 从... 文件数据集在 ERDDAP™ ,然后得到“0文件”错误消息,表明 ERDDAP™ 在目录中找到 0 匹配文件 (当你认为目录中有匹配的文件时) 数字 :
* 检查您是否指定了目录的全名 。 如果您指定了样本文件名, 请确保您指定文件的全名, 包括全目录名称 。
* 检查文件是否真的在目录中 。
* 检查目录名称的拼写.
* 检查文件Name Regex. 它真的,真的很容易 犯错误与regexes。 为测试目的, 请尝试符合所有文件名的 regex 。 (看这个 [正则文档](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) 和 [regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) 。 。 。 。) 
* 检查运行程序的用户 (例如,用户=tomcat (? 。 。 。) 用于托姆卡特/ ERDDAP ) 拥有这些文件的“ read” 权限 。
* 在一些操作系统中 (例如, SELinux) 并取决于系统设置,运行程序的用户必须拥有"读取"权限,以获得通往拥有文件的目录的整个目录.


* 如果你有无法解决的问题 [请求支持](/docs/intro#support) 尽可能多的信息。 同样,如果一个数据集似乎合适的EDDType与该数据集不相符合,或者没有合适的EDDType,请存档 。 [GitHub 上的问题](https://github.com/ERDDAP/erddap/issues) 细节 (和样本文件(如果相关)) 。 。 。 。
         
#### 您需要编辑 GenerateDatasets 的输出 XML让它更好。{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* 分局:
车库 datasets.xml MADE 生成数据 Xml不完美。 你必须读和编辑 XML 在使用它 在公众 ERDDAP 。 。 。 生成数据 Xml Relis on a lot -OF -THUMB 规则的很多 总是不正确的。 你有责任确保你所爱的XML的校正 ERDDAP '是, datasets.xml 档案。
    
     (趣味事实:我没有喊. 出于历史法律原因,免责书必须写在所有封顶上.) 
    
GenerateDatasetsXml的输出是一个粗略的草稿.
你几乎总是需要编辑它。
我们已经并且继续作出巨大的努力,使产出尽可能地准备就绪,但是是有限度的. 往往根本无法从源元数据中获得所需的信息。
    
一个根本的问题是,我们要求计算机程序 (生成 DatasetsXml) 如果你给100人同样的任务 你会得到100个不同的结果 没有单一的"正确"答案。 很明显,这个节目最接近读鲍勃的心思 (不是给你的) 但即使如此,它也不是一个全能的AI程序, 只是一堆heuristics拼凑在一起来完成类似AI的任务. (完全理解的AI程序的那一天可能来临,但还没有. 如果/当它发生的时候,我们人类可能会有更大的问题。 当心所愿.) 
    
* 为了提供信息,产出将全球源属性和可变源属性作为注释。 ERDDAP™ 组合源属性和 addAttributes   (具有优先权的) 合并 向用户显示的属性。 (其它属性自动添加到经度、纬度、高度、深度和时间变量中 ERDDAP™ 实际使数据集) 。 。 。 。
     
* 如果您不喜欢源属性, 请通过添加一个同名但值不同的附加属性来覆盖它 。 (或没有值, 如果您想要删除它) 。 。 。 。
     
* 所有电话 addAttributes 是计算机生成的建议。 编辑他们&#33; 不喜欢附加属性的,改换.
     
* 如果您想要添加其它内容 addAttributes ,添加它们。
     
* 如果你想改变一个 destinationName ,改变它。 但不要改变 sourceName 编号
     
* 你可以改变顺序 dataVariable 或删除其中任何一项。


    * 然后可以使用 [达斯德](#dasdds)   (见下文) 以反复测试该数据集的XML,以确保生成的数据集在您想要的情况下显示 ERDDAP 。 。 。 。
    * 随便你做点小改变 datasets.xml 生成的块,例如,提供更好的 infoUrl 、摘要或标题。
#### 不添加标准名称{#donotaddstandardnames} 
如果您运行生成时将 \\- doNoteAddStandardNames 作为命令行参数 数据集 Xml, 生成 数据集 Xml 将不添加 standard\\_name 页:1 addAttributes 除以纬度、经度、高度、深度或时间命名的变量以外的任何变量 (很明显 standard\\_name 编号) 。 。 。 如果您正在使用生成的输出, 这将会有用 数据集 Xml 直接输入 ERDDAP™ 不编辑输出, 因为生成 数据集 Xml 经常猜测 standard\\_name 错的 (请注意,我们总是建议您在使用输出前先编辑输出 ERDDAP 。 。 。 。) 使用此参数将具有其他次要的相关效果, 因为猜测 standard\\_name 经常用于其他目的,例如,创建新的 long\\_name ,并创建颜色Bar设置。
#### 脚本{#scripting} 
作为在键盘上交互回答问题和循环生成额外数据集的替代,您可以提供命令行参数来回答所有问题以生成一个数据集. 生成数据 Xml将处理这些参数,将输出写入输出文件,然后退出程序.
        
要设置此选项, 首先使用交互模式的程序并写下您的答案 。 以下是部分例子:
假设你运行剧本:./Generate DatasetsXml.sh
然后输入: EDD Table From Ascii Files
然后输入:/u00/data/
然后输入:.asc
然后输入:/u00/data/sampleFile.asc
然后输入: ISO-8859-1
        
要以非交互方式运行, 请使用此命令行 :
./GenerateDatasetsXml.sh EDD Table FromAsiiFiles /u00/data/.\\*\\.asc/u00/data/sampleFile.asc ISO-8859-1
所以基本上,你只是列出所有答案 在命令行。
这对经常变化的数据集应有用,从而需要重新运行生成数据 xml 数据 (重点 EDDGrid 从 ThreddsCatalog 调用) 。 。 。 。
        
细节 :

* 如果一个参数包含一个空间或某个特殊字符,那么将参数编码为 [JSON 风格字符串](https://www.json.org/json-en.html) ,例如“我的参数带有空格和两个 \\n 线条。
* 如果您想要将空字符串指定为参数, 请使用: 无
* 如果您想要指定一个参数的默认值, 请使用: 默认
             
* 生成数据 Xml 支持 a -i *数据集 Xml 语法Name* &#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125; *标签Name* 将输出插入到指定的命令行参数 datasets.xml 文件 (默认为 *移动猫* /内容/erddap/ datasets.xml ) 。 。 。 生成数据 Xml 查找数据集中的两行 Xml 名称 :
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
和
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
并用新内容替换这些行之间的所有内容,并更改一些时间。
* -i 开关只经过处理 (更改 datasets.xml 仅制作) 如果您运行生成数据 Xml 带有命令行参数,用于指定程序一个循环的所有问题的答案. (见上文"文稿".)   (思考是:这个参数用于脚本. 如果您以交互模式使用程序 (键盘上输入信息) ,您可能会在生成您想要的 XML 之前生成一些不正确的块 。) 
* 如果找不到 Begin 和 End 线条, 那么这些线条和新内容就在前面插入&lt;/erdapDatasets&gt; (英语).
* 还有一个 -I (资本一) 用于测试目的的切换与 -i 相同,但创建名为的文件 datasets.xml  *日期时间* 并且不会改变 datasets.xml 。 。 。 。
* 不要运行生成数据 Xml 与 -i 并用两个进程. 只有一组更改有可能保留下来。 可能会有严重的麻烦 (例如,已损坏的文件) 。 。 。 。
    
如果您使用"Generate DatasetsXml - 动词",它将打印比通常更多的诊断信息.
    
#### 特殊/专题数据集类型{#specialpseudo-dataset-types} 
一般来说,生成Datasets中的 EDDType 选项 本文档描述的 EDD 类型的 Xml 匹配 (见 [数据集类型列表](#list-of-types-datasets) ) 生成一个 datasets.xml 从一个特定数据源创建一个数据集的块 。 有一些例外和特殊情况:
    
#####  EDDGrid 从埃尔达普{#eddgridfromerddap} 
此 EDDType 生成所有 datasets.xml 所需块块 [ EDDGrid 从埃尔达普](#eddfromerddap) 来自所有 EDDGrid 远程数据集 ERDDAP 。 。 。 你可以选择保留原来的 datasetID 编号 (可能会重复一些 datasetID 已经进入您 ERDDAP ) 或生成将独一无二的新名称 (但通常不是人能读的) 。 。 。 。
     
##### 来自Erddap的EDD表{#eddtablefromerddap} 
此 EDDType 生成所有 datasets.xml 所需块块 [来自Erddap的EDD表](#eddfromerddap) 远程 EDDTable 数据集中的数据集 ERDDAP 。 。 。 你可以选择保留原来的 datasetID 编号 (可能会重复一些 datasetID 已经进入您 ERDDAP ) 或生成将独一无二的新名称 (但通常不是人能读的) 。 。 。 。
     
#####  EDDGrid 从 ThreddsCatalog 调用{#eddgridfromthreddscatalog} 
此 EDDType 生成所有 datasets.xml 全部所需块数 [ EDDGrid 从 Dap 中](#eddgridfromdap) 通过THREDDS递归爬行可以找到的数据集 (次级) 目录. THREDDS目录URL有很多形式. 此选项需要带有/ catalog/ 的 THREDDS .xml URL, 例如 ,
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xml或
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml  
(一个相关的.html目录在
https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html,则不能接受 EDDGrid From ThreddsCatalog) (英语).
如果你有问题 EDDGrid 从垃圾 目录 :
* 确定您使用的 URL 是有效的, 包括 / catalog/, 并以 / catalog. xml 结尾 。
* 如果可能,请使用公共IP地址 (比如说,https://oceanwatch.pfeg.noaa.gov) 在 URL 中,不是本地数字 IP 地址 (比如说,https://12.34.56.78) 。 。 。 如果 THREDDS 只能通过本地数字 IP 地址访问, 您可以使用 [&lt;转换为 PublicSourceUrl &gt;] (#转换为公共源代码) 这样 ERDDAP™ 用户可以看到公共地址, 尽管 ERDDAP™ 从本地数字地址获取数据。
* 如果你有无法解决的问题 [检查故障排除提示](#troubleshooting-tips) 。 。 。 。
* 低级代码现在使用 Unidata netcdf-java 目录爬行器代码 (鞭打声 分类类) 这样它就能处理所有 THREDDS 目录 (非常复杂) 感谢 Unidata 密码
         
#####  EDDGrid LonPM180 从ErddapCatalog 读取{#eddgridlonpm180fromerddapcatalog} 
这个 EDDType 生成 datasets.xml 准备 [ EDDGrid 龙PM180](#eddgridlonpm180) 来自所有 EDDGrid 数据集在一个 ERDDAP 其经度值大于180。
* 如果可能,请使用公共IP地址 (比如说,https://oceanwatch.pfeg.noaa.gov) 在 URL 中,不是本地数字 IP 地址 (比如说,https://12.34.56.78) 。 。 。 。 如果 ERDDAP™ 只能通过本地数字 IP 地址访问, 您可以使用 [&lt;转换为 PublicSourceUrl &gt;] (#转换为公共源代码) 这样 ERDDAP™ 用户可以看到公共地址, 尽管 ERDDAP™ 从本地数字地址获取数据。
         
#####  EDDGrid Lon0360 来自 ErddapCatalog{#eddgridlon0360fromerddapcatalog} 
这个 EDDType 生成 datasets.xml 准备 [ EDDGrid 龙0360](#eddgridlon0360) 来自所有 EDDGrid 数据集在一个 ERDDAP 的经度值小于 0。
* 如果可能,请使用公共IP地址 (比如说,https://oceanwatch.pfeg.noaa.gov) 在 URL 中,不是本地数字 IP 地址 (比如说,https://12.34.56.78) 。 。 。 。 如果 ERDDAP™ 只能通过本地数字 IP 地址访问, 您可以使用 [&lt;转换为 PublicSourceUrl &gt;] (#转换为公共源代码) 这样 ERDDAP™ 用户可以看到公共地址, 尽管 ERDDAP™ 从本地数字地址获取数据。
         
##### 文档中的 EDDs{#eddsfromfiles} 
设定一个启动目录, 将目录和所有子目录翻转, 并尝试为它找到的每组数据文件创建一个数据集 。
* 这假设当找到数据集时,数据集包括所有子目录.
* 如果找到数据集, 类似的兄弟姐妹目录将作为单独的数据集处理 (例如,1990年代、2000年代、2010年代的目录将生成单独的数据集) 。 。 。 它们应该很容易手动结合 -- 只要改变第一个数据集的&lt;fileDir&gt; 到父目录并删除所有随后的兄弟姐妹数据集。
* 仅试图生成一块 datasets.xml 对于目录中最常见的文件扩展名类型 (未计为 . md5, 忽略) 。 。 。 所以,给一个目录与10 .nc 文件与 5.txt 文件,将生成一个数据集。 .nc 仅存文件。
* 这假设一个目录中所有具有相同扩展名的文件都属于同一个数据集. 如果一个目录有 .nc 带有 SST 数据的文件和一些文件 .nc 有叶绿素数据的文件,只有一个样本 .nc 文件将被读取 (SST (英语). 叶绿素?) 并且将为此类文件创建一个数据集。 由于试图将两种类型的文件加载到同一个数据集的复杂情况,该数据集很可能无法加载.
* 如果目录中最常用扩展名的文件少于4个,则假设它们不是数据文件,只是跳过目录.
* 如果目录中有4个或更多文件,但这无法成功生成一个块 datasets.xml 用于文件 (例如,不支持的文件类型) ,这将生成 [来自文件名的 EDD 表格](#eddtablefromfilenames) 文件的数据集。
* 在最后的诊断,这个写到日志文件, 就在之前 datasets.xml 块, 这将打印一个表格, 并附上所有子目录中收集的信息摘要 。 表格将列出每个子目录, 并显示文件扩展名的最常见类型、 文件总数和为这些文件创建的数据集类型 (如果有的话) 。 。 。 如果您面临复杂且深层嵌入的文件结构, 请考虑运行 GenerateDatasets 使用 EDType=EDDsFromFiles 的 Xml 生成此信息,
* 这个选项可能不会很好地为特定数据文件组猜测最好的 EDDType , 但它是快速, 简单, 值得尝试 。 如果源文件合适,它效果良好,是生成源文件的第一步。 datasets.xml 用于一个包含许多子目录的文件系统,每个子目录都有不同数据集的数据文件。
         
##### EML 和 EMLBatch 的 EDD 表格{#eddtablefromeml-and-eddtablefromemlbatch} 
这些特殊的EDDType生成 datasets.xml 制作一个 [来自 Ascii 文件夹的 EDD 表格](#eddtablefromasciifiles) a/ 数据集来自以下表格: [生态元数据语言](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) XML 文件 。 "Batch"变体在本地或远程目录中的所有EML文件中工作. 请参看单独的 [EDD Table 文档](/docs/server-admin/EDDTableFromEML) 。 。 。 。
     
##### 来自端口的 EDD 表格{#eddtablefrominport} 
这个特殊的 EDDType 生成 datasets.xml 制作一个 [来自 Ascii 文件夹的 EDD 表格](#eddtablefromasciifiles) 从信息中获取的数据集 [输入xml](https://inport.nmfs.noaa.gov/inport) 文档。 如果您可以访问源数据文件 (Inport-xml 文件应该有线索可以找到它) ,可以在 ERDDAP 。 。 。 。

以下步骤概述了如何使用 GenerateDatasets Xml 带有导入- xml 文件, 以便获取工作数据集 ERDDAP 。 。 。 。

1. 一旦您可以访问 Inport- xml 文件 (作为 URL 或本地文件) : 运行生成数据 Xml, 指定 EDDType= EDDTable From InPort, 指定导入- xml URL 或完整文件名, 指定哪个Child=0, 并指定请求的其他信息 (如果知道的话) 。 。 。 。 (此时,您不需要拥有源数据文件或指定其名称.) 儿童=0 的设置告诉生成 Datasets Xml 写入信息 **全部** 会 议 日 程 和 议 程&lt;实体属性信息&gt;&lt;实体 &gt; 位于 inport- xml 文件 (如果有的话) 。 。 。 它还打印出一份背景资料摘要,包括所有在inport-xml文件中列出的下载-url.
2. 仔细看看所有的信息 (包括生成 Datasets 的背景资料 Xml 指纹) 访问下载url (编号) 以尝试找到源数据文件 (编号) 。 。 。 。 如果你能找到的话 (他们) ,下载 (他们) 输入可访问的目录 ERDDAP 。 。 。 。 (如果您找不到任何源数据文件, 程序没有意义 。) 
3. 运行生成 数据集 再来一次
如果源数据文件对应的是一个inport-xml文件&lt;实体属性信息&gt;&lt;实体&gt;,指定哪个Child= *实体数量*   (例如,1,2,3,......) 。 。 。 。 ERDDAP™ 将尝试将源数据文件中的列名与实体信息中的名称匹配,并提示接受/拒绝/修正任何差异。
或者,如果inport -xml文件没有任何&lt;实体属性信息&gt;&lt;object&gt;'s,指定哪个Child=0.
4. 在块 datasets.xml 由 GenerateDatasets 制作 。 Xml, 修订 [全球&lt; addAttributes &gt;] (中文(简体) ). (# 全球属性) 根据需要/需要。
5. 在块 datasets.xml 由 Generate DatasetsXml 制作,添加/重写 [&lt; dataVariable &gt;] (中文(简体) ). (数据可变) 根据需要/需要提供信息,说明每个变量。 请确认每个变量是否正确
[&lt; sourceName &gt;] (中文(简体) ). (# 来源名称)   (如来源所示) , (中文).
[&lt; destinationName &gt;] (中文(简体) ). (# 目的地名称 #)   (对允许字符的限制大于 sourceName ) , (中文).
[&lt;单位 &gt;] (单位)   (特别是如果它是一个 [时间或时间戳变量](#timestamp-variables) 单元需要指定格式的地方) ,以及
[&lt; missing\\_value &gt;] (中文(简体) ). (缺少值) , (中文).
6. 在接近完成时,反复使用 [达斯德](#dasdds) 工具,以快速查看数据集描述是否有效,数据集是否会出现在 ERDDAP™ 随你便
     

如果使用InPort记录数据集的组也会使用 ERDDAP™ 提供实际数据:

*    ERDDAP™ 一个解决方案,现在可以使用 这样你就可以完成 NOAA 因为 [公众获取研究成果的机会 (牧师) 所需经费](https://nosc.noaa.gov/EDMC/PD.DSP.php) 现在,不是在某个模糊的时间 在未来。
*    ERDDAP™ 向用户提供实际数据,而不仅仅是元数据。 (没有数据,元数据有什么好处?) 
*    ERDDAP™ 支持元数据 (特别是变量的单位) ,不同于正在考虑的其他数据服务器软件。 (没有元数据有什么好处?) 使用不支持元数据的软件就是邀请数据被误解和滥用.
*    ERDDAP™ 是自由的和开源的软件,与正在考虑的其他一些软件不同。 正在开发 ERDDAP™ 已经支付。 支助 ERDDAP™ 用户是免费的。
*    ERDDAP 其外观可以轻松定制以反映和突出您的组 (没有 ERD 或 ERDDAP ) 。 。 。 。
*    ERDDAP™ 提供了访问所有数据集的一致方式。
*    ERDDAP™ 可以从许多类型的数据文件和关系数据库读取数据.
*    ERDDAP™ 可以处理大型数据集,包括许多数据文件中源数据所在的数据集.
*    ERDDAP™ 可以应用户的请求,将数据写入许多类型的数据文件,包括科学数据文件类型,如netCDF,ESRI.csv,以及 ODV .txt 。 。 。 。
*    ERDDAP™ 可以根据用户的规格,制作数据子集的自定义图表和地图.
*    ERDDAP™ 可以处理非数据数据集,如图像,视频,或音频文件的集合.
*    ERDDAP™ 已安装和使用于 [全世界60多个机构](/#who-uses-erddap) 。 。 。 。
*    ERDDAP™ 被列为建议在 NOAA 输入 [ NOAA 数据访问程序指令](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) ,不同于正在考虑的其他一些软件.
*    ERDDAP™ 是一种产物 NMFS 页:1 NOAA 因此在内部使用 NMFS 和 NOAA 应该是值得骄傲的一点 NMFS 和 NOAA 。 。 。 。

请给我 ERDDAP™ 一个尝试。 如果您需要帮助,请在 ERDDAP™ 谷歌集团.
     
##### 添加 FillVale 属性{#addfillvalueattributes} 
这个特殊的EDDType选项不是数据集类型. 它是一个可以将QQFillValue属性添加到一些数据集中的一些变量的工具. 见 [添加 FillVale 属性](#add-_fillvalue-attributes) 。 。 。 。
     
##### 查找重复 时间{#findduplicatetime} 
这个特殊的EDDType选项不是数据集类型. 相反,它告诉生成达泰 Xml 要通过网格集搜索 .nc   (及有关事项) 要查找和打印带有重复时间值的文件列表。 当它查看时间值时,它会将它们从原来的单位转换为 "seconds since 1970-01-01" 如果不同的文件使用不同的单位字符串。 您需要提供起始目录 (不论有没有后遗症) ,文件名正则表达式 (例如, . .nc  ) ,以及文件中时间变量的名称。
     
##### 数字{#ncdump} 
这个特殊的EDDType选项不是数据集类型. 相反,它告诉生成达泰 要打印的 Xml [数字](https://linux.die.net/man/1/ncdump) 像打印出一个 .nc , (中文). .nc ML,或者说 .hdf 文档。 它实际上使用 netcdf -java的 [NCdump 调用](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html) ,这个工具比NCdump的C版本更为有限。 如果您使用此选项, GenerateDatasetsXml 会要求您使用其中的一个选项 : “ - h ” (标题) ,"-c" (中文(简体) ). (坐标 vars) ,"-vall" (英语). (默认) ,"-v var1;var2","-v var1" (中文(简体) ). (0,0:10,0:20 (英语).) " .. 这是有用的,因为,没有cdump 它很难知道什么是在一个 .nc , (中文). .nc ML,或者说 .hdf 文件, 以及您应该为 GenerateDatas 指定哪个 EDDType Xml (英语). 对于一个 .nc ml 文件,这将打印 ncdump 输出,以获取结果 .nc 应用到下面的 ml 文件更改 .nc 或 .hdf 文档。
         
### 达斯德{#dasdds} 
*    [ **达斯德** ](#dasdds) 是一个命令行程序,在您创建了 XML 的首次尝试后,您就可以使用该程序。 datasets.xml 。 。 。 通过DasDds,可以反复测试和完善XML. 当您使用 DasDds 程序时 :
    1. 在Windows上,第一次运行DasDds时,需要编辑DasDds. 带有文本编辑器的bat文件将路径更改为java. exe 文件, 以便 Windows 找到 Java 。 。 。 。
    2. DasDds问你 datasetID 用于您正在工作的数据集。
    3. DasDds 试图以此创建数据集 datasetID 。 。 。 。
        * DasDds总是打印大量的诊断信息.
如果使用"DasDds - 动词",DasDds会打印比通常更多的诊断信息.
        * 为了安全起见, DasDds 总是删除所有缓存数据集信息 (文件) 用于在试图创建数据集之前的数据集。 这相当于设置 [硬旗](/docs/server-admin/additional-information#hard-flag) 因此,对于汇总数据集,您可能想要暂时调整文件NameRegex,以限制数据构造器找到的文件数量.
        * 如果数据集无法装入 (无论出于什么原因) ,DasDds将停止并显示它发现的第一个错误的错误信息。
             **别试图猜测问题所在 仔细读取错误消息 。**   
必要时,阅读前述诊断信息,以找到更多的线索和信息.
        *    **更改数据集的 XML 以尝试解决这个问题**   
并让 DasDds 再次尝试创建数据集。
        *    **如果你一再解决每个问题,你最终会解决所有问题**   
并会装入数据集。
    4. 全部 DasDds 输出 (诊断和结果) 写入屏幕和 *大家长会* /logs/DasDds.log. (原始内容存档于2018-09-29).
    5. 如果 DasDds 能够创建数据集, DasDds 将会显示 [达斯 (数据集属性结构) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das) , (中文). [数字 (数据集描述符 结构) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds) ,以及 [时间图 (时间间隔) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) 用于屏幕上数据集的信息并写入 *大家长会* /logs/DasDds.out. (原始内容存档于2019-09-03).
    6. 通常,您会想要对数据集的 XML 做一些小的更改,以清理数据集的元数据并重新运行 DasDds 。

### 奖金 第三方工具: ERDDAP - lint (英语){#bonus-third-party-tool-erddap-lint} 
 ERDDAP -lint是一个来自爱尔兰海洋研究所的Rob Fuller和Adam Leadbetter的程序,你可以用来改进你的元数据 ERDDAP™ 数据集。 ERDDAP -lint 包含规则和一个简单的静态网络应用程序,用于对您进行一些验证测试 ERDDAP™ 服务器。 所有测试都在网页浏览器中运行". 喜欢 [Unix/ Linux 林特工具](https://en.wikipedia.org/wiki/Lint_(software) ),可以编辑现有的规则或添加新的规则。 见 [ ERDDAP - lint (英语)](https://github.com/IrishMarineInstitute/erddap-lint) 更多信息。

这个工具对于您之前创建的数据集特别有用, 现在想要更新您当前元数据偏好 。 例如, GenerateDatasets 的早期版本 Xml没有做出任何努力来创建全球 creator\\_name , (中文). creator\\_email 创建者类型,或 creator\\_url 元数据。 你用得着 ERDDAP - 显示缺少元数据属性的数据集。

多亏了罗布和亚当 创造了这个工具 并把它提供给 ERDDAP™ 社区。
 
## 联合国的基本结构 datasets.xml 文件{#the-basic-structure-of-the-datasetsxml-file} 
在 a 中允许的必需和可选标记 datasets.xml 文件 (及其可能出现的次数) 如下所示。 在实践中,你的 datasets.xml 会有很多&lt;数据集&gt;的标记,只使用内部的其他标记&lt;需要的话 。

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

将来有可能允许其他编码,但目前只推荐ISO-8859-1.
 
### 包含{#xinclude} 
新的2.25版本是支持XInclude. 这需要您使用 SAX 解析器&lt;使用SaxPaerser &gt; true(正则)&lt;/使用SaxParser &gt; 在您的设置中. xml. 这可以允许您将每个数据集写入自己的文件中,然后将它们全部包含在主文件中 datasets.xml ,重新使用数据集定义的部分,或两者兼有。 如果你想看看一个例子, [EDD TestedDataset.java (英语).](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java) 设置 XInclude 以再利用变量定义.
 

- - 说吧

## 页:1{#notes} 

与 datasets.xml 文件是一个非三角工程。 请仔细阅读所有这些注释。 你选一个后 [数据集类型](#list-of-types-datasets) 请仔细阅读详细描述。
     
### 选择数据集类型{#choosing-the-dataset-type} 
在大多数情况下,只有一个 ERDDAP™ 适合特定数据源的数据集类型。 在少数情况下 (例如, .nc 文件) 有一些可能性, 但通常其中之一绝对是最好的。 您必须做出的第一个也是最大的决定是: 将数据集作为多维数组处理是否合适 。 (如果是这样,请看 [ EDDGrid 数据集类型](#eddgrid) ) 或作为类似数据库的数据表 (如果是这样,请看 [EDDTable 数据集类型](#eddtable) ) 。 。 。 。
     
### 正在保存数据{#serving-the-data-as-is} 
通常不需要修改数据源 (例如, 将文件转换为其它文件类型) 这样 ERDDAP™ 能为它服务。 假设之一: ERDDAP™ 数据源将一如既往地使用。 通常这样很好 例外情况包括:
* 关系数据库和卡桑德拉 - —— - 说 ERDDAP™ 可以直接从关系数据库和卡珊德拉服务数据. 但对于安全性,负载平衡和性能问题,您可以选择用相同的数据建立另一个数据库,或者将数据保存到 NetCDF 页:1 .nc 文档和有 ERDDAP™ 为来自新数据源的数据服务。 见 [数据库中的 EDD 表格](#eddtablefromdatabase) 和 [来自卡桑德拉的EDD表](#eddtablefromcassandra) 。 。 。 。
* 不支持的数据源 - ERDDAP™ 可以支持大量类型的数据源,但世界充满了1000's (数百万?) 不同数据来源 (特别是数据文件结构) 。 。 。 。 若为 ERDDAP™ 不支持您的数据源 :
    * 如果数据源是 NetCDF   .nc 文件,可以使用 [NcML 数据](#ncml-files) 修改“飞行”上的数据文件,或者使用 [ NCO ](#netcdf-operators-nco) 以永久修改数据文件。
    * 您可以将数据写入数据源类型 ERDDAP™ 支持 。 NetCDF - 3号 .nc 文件是很好的,一般的建议,因为它们是二进制文件 ERDDAP™ 读得很快 就表格式数据而言,考虑将数据储存在以下汇编中: .nc 使用 [CF 数字 断层采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 相邻的标记矩阵数据结构,因此可以处理 ERDDAP 因为 [来自 NcCFF 的 EDD 表格](#eddtablefromnccffiles) ) (中文(简体) ). 如果有逻辑组织 (每个都有一块空间和时间的数据) , (中文). ERDDAP™ 可以非常迅速地从它们中提取数据.
    * 您可以请求将数据源的支持添加到 ERDDAP™ 通过电子邮件克里斯。 约翰在Noaa.gov。
    * 您可以通过写入代码来补充对数据源的支持 。 见 [联合国 ERDDAP™ 程序员指南](/docs/contributing/programmer-guide) 
* 速度 -- -- ERDDAP™ 可以比其他数据来源更快地读取数据。 例如,阅读 NetCDF 页:1 .nc 文件速度快,读取ASCII文件速度慢。 如果有一个大 (&gt; 1 000 个) 或巨大的 (&gt; 1万美元) 源数据文件数量, ERDDAP™ 将缓慢地响应一些数据要求。 通常,对人类来说,这种区别并不明显. 但是,如果你认为 ERDDAP™ 对于给定的数据集来说是缓慢的,您可以选择通过将数据写入一个更有效率的设置来解决问题 (通常: 少数,结构完善, NetCDF 页:1 .nc 文件) 。 。 。 。 表格数据见 [本建议](#millions-of-files) 。 。 。 。
         
### 提示{#hint} 
通过在dataset.xml中制作一个工作数据集描述的副本,然后修改,生成一个数据集的XML往往比较容易.
    
### 编码特殊字符{#encoding-special-characters} 
从 datasets.xml 是一个 XML 文件, 您必须 [编码( E)](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML) "()", "(")&lt;“,以及任何内容中的“&gt;”为“和amp;”,“&lt;",和"&gt;".
错误 :&lt;标题 &gt; 时间( T)&lt;/标题 &gt;
对:&lt;标题 &gt; 时间( P) :&lt;/标题 &gt;
     
### XML 无法容忍语法错误{#xml-doesnt-tolerate-syntax-errors} 
在您编辑dataset.xml文件后,验证结果是 [形状良好的 XML](https://www.w3schools.com/xml/xml_dtd.asp) 将 XML 文本粘贴到类似 XML 的检查器中 [xml 验证](https://www.xmlvalidation.com/) 。 。 。 。
     
### 解决问题提示{#troubleshooting-tips} 
*    **分析数据集问题的其他方法**   
除了两个主要 [工具](#tools) , (中文).
    *    [日志.txt](/docs/server-admin/additional-information#log) 是一个包含全部的日志文件 ERDDAP 诊断信息
    * 那个 [每日报告](/docs/server-admin/additional-information#daily-report) 拥有比状态页面更多的信息,包括没有加载的数据集列表和例外 (错误) 他们创造了。
    * 那个 [状况 页次](/docs/server-admin/additional-information#status-page) 是个快速检查的方法 ERDDAP 任何网页浏览器的状态 。 它包括一个没有加载的数据集列表 (虽然没有相关的例外) 和任务图统计 (显示进展情况 [ EDDGrid 复制](#eddgridcopy) 和 [EDD 表格复制](#eddtablecopy) 数据集和任何 [ EDDGrid 从文件](#eddgridfromfiles) 或 [来自文件的 EDD 表格](#eddtablefromfiles) 使用的数据集 [来自Url的缓存](#cachefromurl)   (但不是缓存 大小GB) ) 。 。 。 。
    * 如果你卡住了,见我们的 [关于获得额外支助的章节](/docs/intro#support) 。 。 。 。
         
### 特殊变量{#special-variables} 
*    ** [经度、纬度、高度、深度、压力和时间 (法学) 变量](#destinationname)   [ destinationName ](#destinationname) s是特别的。** 
    * 总的来说:
        * LLAT 变量为 ERDDAP™ 如果轴变量是 ((单位:千美元) EDDGrid 数据集) 或数据变量的 (EDD表数据集)   [ destinationName ](#destinationname) 是"经度","纬度","纬度","深度",或 "time" 。 。 。 。
        * 我们强烈鼓励您尽可能使用这些变量的标准名称。 不需要他们。 如果你不使用这些特殊的变量名称, ERDDAP™ 无法识别它们的意义 例如, LLAT 变量由 Make A Graph 特别处理 ( * datasetID * 图片) :如果 X 轴变量是"经度", Y 轴变量是"纬度",则您将得到地图 (使用标准投影,并带有土地面具,政治界限等.) 而不是一个图表。
        *    ERDDAP™ 将自动添加大量元数据到 LLAT 变量 (例如, " [ ioos\\_category ](#ioos_category) " , " [单位](#units) ",以及几个与标准相关的属性,如"QQ协调轴线") 。 。 。 。
        *    ERDDAP™ 将在飞行时自动添加许多与选定数据子集的 LLAT 值相关的全局元数据 (例如"地理空间") 。 。 。 。
        * 支持这些元数据标准的客户将能够利用新增元数据将数据定位在时间和空间.
        * 客户端会发现更容易生成包含LLAT变量的查询,因为变量的名称在所有相关数据集中都是相同的.
    * 对于"经度"变量和"纬度"变量:
        * 使用 [ destinationName ](#destinationname) s "经度"和"纬度"只有 [单位](#units) 分别是东度和北度。 如果数据不符合这些要求,请使用不同的变量名称 (例如,x、y、lonRadians、latRadians) 。 。 。 。
        * 如果您有以不同单位表示的经度和纬度数据,从而具有不同的经度和纬度数据 destinationName s,例如: LonRadians 和 latRadians, Make A Graph ( * datasetID * 图片) 将制作图表 (例如,时间序列) 而不是地图。
    * 对于"海拔","预测",或"深度"变量:
        * 使用 [ destinationName ](#destinationname) "海拔"以识别数据在海拔上的距离 (正=“上”值) 。 。 。 可以选择的是,如果海平面以下的数值为负值(或者如果使用,例如,
[&lt;名称=" scale\\_factor "类型="int"&gt;- 页:1&lt;/att &gt; (中文(简体) ). (# 缩放_因素) 将深度值转换为高度值。
        * 使用 destinationName "深度"确定数据低于海平面的距离. (正值=“下”值) 。 。 。 。
        * 或者,对于按气压水平界定的高度 (例如, [同位素](https://en.wikipedia.org/wiki/Contour_line#Barometric_pressure) ) ,您应该设置 destinationName 到"压力"。 这支持单位在“hPa”、“Pa”和“mbar”中 (正值=“下”值) 。 。 。 。
        * 一个数据集可能只有一个"高度","压力",或"深度"变量.
        * 对于这些"高度"和"深度"变量, [单位](#units) 必须是“m”、“meter”或“meters”。 如果单位不同 (例如,法特姆语) 时,您可以使用
[&lt;名称=" scale\\_factor " &gt; *有点 数值* &lt;/att &gt; (中文(简体) ). (# 缩放_因素) 页:1&lt;atname=“单位”&gt;米&lt;/att &gt; (中文(简体) ). (单位) 将单位转换为米。
        * 如果你的数据不符合这些要求,请使用不同的 destinationName   (例如,在Ground上方,距离 切换到Bottom) 。 。 。 。
        * 如果您知道垂直 CRS, 请在元数据中指定它, 如“ EPSG: 5829 ” 。 (海平面上瞬间高度) ,"EPSG:5831" (英语). (海平面以下瞬时深度) ,或"EPSG:5703" (NAVD88高处) 。 。 。 。
    * 对于 "time" 变量 :
        * 使用 [ destinationName ](#destinationname)   "time" 仅针对包含全部日期+时间的变量 (或日期,如果仅此而已) 。 。 。 例如,如果日期和时间有单独的列,则不要使用变量名称 "time" 。 。 。 。
        * 见 [单位](#time-units) 对于时间和时标变量的单位属性的更多信息。
        * 时间变量和相关 [时间 印花变量](#timestamp-variables) 它们总是从源的时间格式转换数据值 。 (无论是什么) 输入数值 (自1970-01-01T00:00Z以来的秒) 或字符串值 (ISO 8601:2004 (英语). (英) 格式) 视情况而定。
        * 当用户请求时间数据时,可以通过指定时间为数字值来请求 (自1970-01-01T00:00Z以来的秒) 或字符串值 (ISO 8601:2004 (英语). (英) 格式) 。 。 。 。
        *    ERDDAP™ 具有用于 [转换数字 时间到/ 从字符串时间](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) 。 。 。 。
        * 见 [怎么样 ERDDAP 处理时间](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) 。 。 。 。
            
### 为什么只有两个基本数据结构?{#why-just-two-basic-data-structures} 
* 由于人类客户和计算机客户难以处理一套复杂的可能数据集结构, ERDDAP™ 仅使用两个基本数据结构:
    * (单位:千美元) [网格数据结构](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)   (例如,卫星数据和模型数据) 和
    * (单位:千美元) [表格数据结构](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)   (例如,现场浮标、站点和轨迹数据) 。 。 。 。
* 当然,并非所有数据都可以用这些结构来表示,但其中很多数据都可以。 表格尤其是非常灵活的数据结构 (查看关系数据库程序的成功情况) 。 。 。 。
* 这使得数据查询更容易构建.
* 这使得数据响应有一个简单的结构,这样就更容易在更广泛的标准文件类型中服务数据. (往往只是支持简单的数据结构) 。 。 。 这也是我们设置的原因 ERDDAP™ 这边
* 这反过来又让我们变得很容易 (或任何人) 用于编写与所有软件一起工作的客户端软件 ERDDAP™ 数据集。
* 这使得比较不同来源的数据更加容易.
* 我们非常清楚,如果你习惯于与其他数据结构中的数据合作,你最初可能认为这种方法是简单或不充分的. 但所有的数据结构都有权衡. 没有一个是完美的。 甚至Do-it- all架构也有其缺点:与它们合作是复杂的,文件只能通过特殊的软件库来写作或阅读. 如果你接受的话 ERDDAP 你可能会发现它有它的优点 (特别是支持能够保存数据响应的多个文件类型) 。 。 。 。 那个 [ ERDDAP™ 幻灯片放映](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)   (特别是 [数据结构幻灯片](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures) ) 谈论这些问题很多。
* 即使这个方法听起来很奇怪,你大多数 ERDDAP™ 客户端永远不会注意到——他们会简单地看到所有数据集都有很好的简单结构,他们会感激地看到,它们能够从各种各样的来源获得以各种文件格式返回的数据.
         
### 尺寸{#dimensions} 
*    **如果源数据集中的网格变量不共享相同的轴变量呢?**   
内 EDDGrid 数据集,所有数据变量使用MUSST (份额) 所有轴变量。 因此,如果一个源数据集有一些带有一组维度的变量,而其他具有不同维度的变量,则您必须在其中制作两个数据集。 ERDDAP 。 。 。 比如说,你可能会做一个 ERDDAP™ 名为“一些标题”的数据集 (在表面) " 以持有刚刚使用的变量 \\[ 时间 \\]  \\[ 纬度 \\]  \\[ 经度 \\] 维度并制作另一个 ERDDAP™ 名为“一些标题”的数据集 (深处) " 以持有所使用的变量 \\[ 时间 \\]  \\[ 高度 \\]  \\[ 纬度 \\]  \\[ 经度 \\] 。 。 。 或者您可以更改数据源, 添加单个值的维度 (例如,高度=0) 使变量保持一致。
    
     ERDDAP™ 不处理更复杂的数据集 (例如,使用三角网的模型) 不错 您可以在 ERDDAP™ 创建两个或多个数据集 ERDDAP™   (这样,每个新数据集中的所有数据变量都共享相同的轴变量集) 但这不是用户想要的 对于一些数据集,您可以考虑对数据集进行常规的网格化版本,并且除了提供原始数据外,还提供该版本. 一些客户端软件只能处理一个普通的网格,所以通过这样做,你就能接触到更多的客户端.
     
    
### 预测的网格数据{#projected-gridded-data} 
一些网格化的数据结构复杂. 例如,卫星二级 ("漫长的轨道") 数据不使用简单的投影。 建模师 (和其他事项) 经常利用各种非圆柱预测的网格数据 (例如,锥形、极地、三极) 或无结构网格 (更为复杂的数据结构) 。 。 。 一些终端用户想要这个数据,所以信息不会丢失. 对于这些客户, ERDDAP™ 只有在以下情况下,才能提供数据: ERDDAP™ 管理员将原始数据集分解为几个数据集,每个部分包含共享相同轴变量的变量. 是的,这似乎奇怪的人 并且它与大多数 OPeNDAP 服务器。 不过 ERDDAP™ 强调以多种形式提供数据。 这是可能的,因为 ERDDAP™ 使用/需要更加统一的数据结构。 虽然有点尴尬 (即与预期不同) , (中文). ERDDAP™ 可分发预测数据。

 \\[ 对 ERDDAP™ 对数据结构的要求可能比较松散,但保留对输出格式的要求。 但这将导致许多用户,特别是新人之间的混乱,因为许多似乎有效的数据要求具有不同结构,将会无效,因为数据不会与文件类型相适应. 我们继续回到目前的系统设计。 \\] 

一些终端用户想要在像 Equirectangular / 盘卡雷 或 Mercator 这样的 lat lon 圆柱形投影中的数据,以在不同情况下方便使用. 对于这些情况,我们鼓励 ERDDAP™ 使用其它软件的管理员 ( NCO ? 。 。 。 Matlab ? 。 。 。 兰? IDV吗? ... 吗?) 将数据重新投影到地理上 (平方形投影/板车雷) 或其他圆柱形投影,并服务于该形式的数据。 ERDDAP™ 作为不同的数据集。 这与人们在将卫星二级数据转换为三级数据时所做的类似. 其中一个工具是 [ NCO ](https://nco.sourceforge.net/nco.html#Regridding) 它为重新网格数据提供了扩展选项。

#### 地理信息系统和重新预测数据{#gis-and-reprojecting-data} 
由于GIS世界往往面向地图,GIS程序通常为重新预测数据提供支持,即用不同的投影图绘制地图上的数据.

目前, ERDDAP™ 没有重新预测数据的工具。 相反,我们建议您使用一个外部工具来制作一个数据集的变体,其中数据已经从原始形式重新投影到长方形上. (纬度) 适合用于 ERDDAP 。 。 。 。

我们认为,CF/ DAP 世界与GIS世界略有不同,工作水平略低。 ERDDAP™ 反映这一点。 总之, ERDDAP™ 旨在主要利用数据 (不是地图) 不想改变 (例如,重新预测) 那个数据 对于 ERDDAP™ ,网格化的数据经常/通常/最好与lat lon值和圆柱形投影有关,而不是某些投影的x,y值. 无论如何, ERDDAP™ 数据投影没有做任何事情。 它只是传递数据,就像它目前的投影一样, 理论认为重投影是对数据的重大改变, ERDDAP™ 不想参与重大改变 此外,随后的用户可能天真地再次重投数据,这不会像一次重投数据那样好。 (所以,如果 ERDDAP™ 管理员希望在不同的投影中提供数据, 精细; 只需将数据重新投影到线下, 作为不同的数据集在 ERDDAP 。 。 。 许多基于卫星的数据集都是美国国家航空航天局所称的二级 (斜线) 作为第三级 (平方形投影) 各个版本。) 何时 ERDDAP™ 绘制地图 (直接或通过 WMS 或 KML 函数) , (中文). ERDDAP™ 目前只提供使用 Equirectangular / 板块 Carrée 投影的地图,幸运的是,大多数绘图程序都接受了这种投影。

我们鼓励 ERDDAP™ 管理员使用其他软件 ( NCO ? 。 。 。 Matlab ? 。 。 。 兰? IDV吗? ... 吗?) 将数据重新投影到地理上 (平方形投影/板车雷) 或其他圆柱形投影,并服务于该形式的数据。 ERDDAP™ 作为不同的数据集。 这与人们在将卫星二级数据转换为三级数据时所做的类似. 其中一个工具是 [ NCO ](https://nco.sourceforge.net/nco.html#Regridding) 它为重新网格数据提供了扩展选项。

我们希望, ERDDAP™ 今后将拥有内置工具,提供地图和其他预测。 我们还希望今后能更好地与地理信息系统世界建立联系。 (除当前 WMS 服务) 。 。 。 可怕的是,在这个“现代”世界中,CF/ DAP 世界和地理信息系统仍然如此脆弱。 这两样东西都列在"To Do"的名单上. (如果你想帮助,特别是连接 ERDDAP™ 致 MapsServer 请发电子邮件给Chris. 约翰在Noaa.gov。) 
    
### 数据类型{#data-types} 
 ERDDAP™ 支持下列数据类型
 (姓名对案件敏感; 'u' 前缀表示“ 未签名的” ; 其他系统中许多名称的数字是位数) 数字 :

#### 字节{#byte} 
*    **字节** 已签名的整数值范围为 -128 到 127。
在其他系统中,这有时被称为int8.
这被SQL和卡珊德拉称为"tinyint".
     ERDDAP™ 转换 [布尔](#boolean-data) 某些来源 (例如,SQL和Cassandra) 输入字节 ERDDAP™ 值为0=虚假,1=真实,127=真实 missing\\_value 。 。 。 。
#### 字节{#ubyte} 
*    **字节** 具有0至255之间的无符号整数。
在其他系统中,这有时被称为int8.
#### 简称{#short} 
*    **简称** 已经签署了整数值,范围为 - 32768 到 32767.
在其他系统中,这有时被称为int16.
这被SQL和卡桑德拉称为"小".
#### 超时速{#ushort} 
*    **超时速** 具有0至65535之间的无符号整数值。
在其他系统中,这有时被称为int16.
#### 单位{#int} 
*    **单位** 已经签署了整数值,范围为 -2147483648 - 2147483647。
在其他系统中,这有时被称为int32.
这叫做"整形" | 数字 (? 。 。 。) ",由SQL和卡桑德拉的"int"组成.
#### 宾特{#uint} 
*    **宾特** 具有0至4294967295之间的无符号整数。
在其他系统中,这有时被称为int32.
#### 长{#long} 
*    **长** 已经签署了整数值,其范围为-922337203685475808至-922337203685475807。
在其他系统中,这有时被称为int64.
这叫做"大" | 数字 (? 。 。 。) ",由SQL和卡桑德拉的"比金特"组成.
由于许多文件类型不支持长数据,因此其使用被劝阻. 如果可能,请使用双倍 (见下文) 。 。 。 。
#### 乌龙{#ulong} 
*    **乌龙** 无符号整数, 范围为 0 到 184464744073709551615
在其他系统中,这有时被称为int64.
由于许多文件类型不支持乌龙数据,因此其使用被劝阻. 如果可能,请使用双倍 (见下文) 。 。 。 。
#### 浮动{#float} 
*    **浮动** 是一个IEEE 754浮点,范围约为+/- 3.402823466e+38。
在其他系统中,这有时被称为浮32.
这叫做"真正的" | 浮动 (? 。 。 。)  | 小数 (? 。 。 。)  | 数字 (? 。 。 。) " 由SQL和卡珊德拉的"浮".
特殊值NaN表示非数字.
     ERDDAP™ 将正负无限值转换为 NaN。
#### 双{#double} 
*    **双** 是一个IEEE 754双倍,范围约为
+/- 1.7976931348623157 E+308 (英语).
在其他系统中,这有时被称为浮点64.
这叫做"双精度" | 浮动 (? 。 。 。)  | 小数 (? 。 。 。)  | 数字 (? 。 。 。) " 由SQL和卡珊德拉"双人"组成.
特殊值NaN表示非数字.
     ERDDAP™ 将正负无限值转换为 NaN。
#### 字符{#char} 
*    **字符** 是一个单字节, 2字节 (16 位数)   [Unicode UCS-2 字符](https://en.wikipedia.org/wiki/UTF-16) 范围从 \\u0000   (#0 # # 开始吧 # # 0 #) 结束 \\uffff   (65535号) 。 。 。 。
     \\uffff 其定义是"不-a-Character",类似于NaN的双值.
由于许多文件类型要么不支持字符,要么只支持 1字节字符,所以不鼓励使用字符 (见下文) 。 。 。 。 考虑使用字符串 。
用户可以使用字符变量来制作图表. ERDDAP™ 将把字符转换成其Unicode代码点号,该代码点号可作为数字数据。
#### 字符串{#string} 
*    **字符串** 是 0 或以上的序列, 2 字节 (16 位数)   [Unicode UCS-2 字符](https://en.wikipedia.org/wiki/UTF-16) 。 。 。 。
     ERDDAP™ 使用/解释一个0长字符串作为缺失值。 ERDDAP™ 不支持一个真实的无效字符串。
理论上的最大字符串长度为2147483647字符,但即使有略短的字符串,各个地方也可能存在各种问题.
使用 ERDDAP 's String for SQL 字符, varchar, 字符变化, 二进制, varbinary, 间隔, 数组, 多集, xml, 以及任何其他不与其他数据库数据类型完全匹配 。 ERDDAP™ 数据类型。
使用 ERDDAP 'S String for Cassandra's "text" and any other Cassandra data type 与其它任何数据不完全吻合的 Cassandra 数据类型 ERDDAP™ 数据类型。
     

在此之前 ERDDAP™ 页:1 ERDDAP™ 未在内部支持未签名的整数类型,并且在其数据读取器和写作器中提供了有限的支持。
    
### 数据类型限制{#data-type-limitations} 
你可以考虑 ERDDAP™ 作为具有虚拟数据集的系统,通过将数据集源数据读取到内部数据模型并写入各种服务(例如,(OPeN)DAP, (中文). WMS )和针对用户请求的文件类型。

* 每个输入读取器支持一个数据类型的子集,该子集 ERDDAP™ 支持 。 所以读数据到 ERDDAP '内部数据结构不是问题.
* 每个输出写入器还支持一个数据类型的子集. 那是个问题,因为 ERDDAP 例如,必须将长数据压缩到不支持长数据的文件类型.
     

以下是对限制的解释。 (或无) 各种产出作者和如何 ERDDAP™ 处理问题。 此类并发症是: ERDDAP 使不同的系统互操作

#### 第二届特别会议{#ascii} 
* 第二届特别会议 (.csv, . . 克西夫, . .tsv 等 类.) 文本文件 -
    * 所有数字数据都通过字符串表示法写入 (以 0 长字符串显示的数据值缺失) 。 。 。 。
    * 虽然 ERDDAP™ 向 ASCII 文本文件正确写入长和 ulong 值, 许多读者 (例如,电子表格程序) 无法正确处理长值和乌龙值,转而将其转换为双值 (在某些情况下缺乏精确度) 。 。 。 。
    * 字符串和字符串数据是通过 JSON 字符串编写的,它处理所有 Unicode 字符 (特别是ASCII #127以外的"不寻常"字符,例如,欧元字符显示为"\\u20ac") 。 。 。 。
    
        
#### 贾森{#json} 
* 贾森 ( .json , (中文). .jsonlCSV 等 类.) 文本文件 -
    * 所有数字数据都是通过其字符串表示书写.
    * 字符和字符串数据以 JSON 字符串写, 处理所有 Unicode 字符 (特别是ASCII #127以外的"不寻常"字符,例如,欧元字符显示为"\\u20ac") 。 。 。 。
    * 所有数字数据类型的缺失值为无效。
         
####  .nc 3个文件{#nc3-files} 
*    .nc 3文件在本地不支持任何未签名的整数数据类型. 在CF v1.9之前,CF不支持无符号整数类型. 为了对付这个 ERDDAP™ 2.10+遵循NUG标准,总是添加一个"QQ未签名"属性,其值为"真"或"假",以表示数据是否来自一个未签名或签名的变量. 所有整数属性都作为签名属性写入 (例如,字节) 带有已签名值( 如 ubyte) actual\\_range 属性,其值为 0 至 255,作为字节属性,其值为 0 至 -1 (两者外值的补充值的反向值)。 很难知道哪个(签名)整数属性应读作无签名属性。 ERDDAP™ 支持“ 未签名” 属性, 当它读取 .nc 3个档案。
*    .nc 3文件不支持长或乌龙数据类型. ERDDAP™ 处理方式是将其暂时转换为双变量。 双倍可以精确地代表 +/- 9,007,199,254,740,992 的所有值 这是2^53。 这是一种不完善的解决办法。 Unidata 拒绝略作升级 .nc 3 以处理这一问题和有关问题,援引 .nc 页:1 (重大改变) 作为解决方案。
* CF 规格 (在v1.9之前) 说它支持字符数据类型,但尚不清楚字符是否只是作为字符组数组的构件,它们实际上是字符串. 他们的邮寄名单中的问题只产生令人困惑的答案。 由于这些复杂因素,最好避免在 ERDDAP™ 并尽可能使用字符串变量。
* 传统上, .nc 3 个文件只支持 ASCII 编码的字符串 (7位数, 0 - 127号) 字符键。 努格语 (和 ERDDAP ) 扩大范围 (从~2017年开始) 包含属性“QQ编码”,其值为“ISO-8859-1” (定义每个 8 位字符的全部 256 个值的 ASCII 扩展名) 或“UTF-8”表示字符串数据是如何编码的。 其他编码可能是合法的,但劝阻。
         
####  .nc 4个文件{#nc4-files} 
*    .nc 4 文件支持全部 ERDDAP 数据类型。
    
#### NCCSV 文件{#nccsv-files} 
NCCSV 1.0文件不支持任何未签名的整数数据类型.
 [NCCSV 1.1+ 文件](/docs/user/nccsv-1.00) 支持所有未签名的整数数据类型。
     
####  DAP  {#dap} 
*   (OPeN)DAP  (.das、.dds、.asc ASCII 文件和.dods 二进制文件) - 怎么样?
    *   (OPeN)DAP处理短、短、短、小、小、小、浮和双值。
    *   (OPeN)DAP具有“字节”数据类型,定义为未签名,而历史上,THREDDS和 ERDDAP™ 已经把字节当作他们(OPeN)DAP服务。 为了更好的处理这件事 ERDDAP™ 2.10+ 遵循 NUG 标准,并总是添加一个"QQ未签名"属性,其值为"真"或"假",以表示数据是否为什么 ERDDAP™ 调用字节或ubyte。 所有字节和ubyte属性都写为带有签名值的"字节"属性(例如一个ubyte) actual\\_range 属性,其值为 0 至 255,作为字节属性,其值为 0 至 -1 (两者外值的补充值的反向值)。 很难知道哪个"字节"属性应该读作ubyte属性.
    *   (OPeN)DAP不支持签名或未签名长。 ERDDAP™ 处理方式是将其暂时转换为双变量和属性。 双倍可以精确地代表所有值,最高值为9,007,199,254,740,992 这是2^53。 这是一种不完善的解决办法。 OPeNDAP   (该组织) 拒绝略作升级 DAP 2.0用于处理该问题和有关问题,引用: DAP 页:1 (重大改变) 作为解决方案。
    * 因为(OPeN)DAP没有单独的字符数据类型,技术上只支持1字节的 ASCII 字符 (0 - 127号) 在字符串中,字符数据变量将显示为 1-字符长字符串(OPeN)DAP.das,.dds,和.dods的响应.
    * 从技术上讲,(OPeN)DAP规格只支持带有 ASCII 编码字符的字符串 (0 - 127号) 。 。 。 。 努格语 (和 ERDDAP ) 扩大范围 (从~2017年开始) 包含属性“QQ编码”,其值为“ISO-8859-1” (定义每个 8 位字符的全部 256 个值的 ASCII 扩展名) 或“UTF-8”表示字符串数据是如何编码的。 其他编码可能是合法的,但劝阻。
         
### 数据类型注释{#data-type-comments} 
* 由于许多文件类型对长、乌龙和字符数据的支持不足,我们劝阻使用这些数据类型。 ERDDAP 。 。 。 可能时,使用双倍代替长和乌龙,使用字符串代替字符串.
     
* 元数据 - 因为(OPeN)DAP'.das和.dds的响应不支持长或乌龙属性或数据类型 (并显示他们为双人) ,您可能想要使用 ERDDAP 表格中元数据的表述情况,见 http .../erddap/ (英语). **信息** 页:1 * datasetID * .html网页 (比如说, [https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  )   (也可以在其它文件类型中获取,例如.csv, .htmlTable , (中文). .itx , (中文). .json , (中文). .jsonlCSV1 , (中文). .jsonlCSV , (中文). .jsonlKVP , (中文). .mat , (中文). .nc , (中文). .nccsv , (中文). .tsv , (中文). .xhtml ) 或 .nccsv 元数据响应 (比如说, [https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) 虽然 .nccsv 元数据只可用于表格数据集) ,两者都支持所有数据类型 (特别是,长,乌龙,和Char) 。 。 。 。
         
### 媒体文件{#media-files} 
并非所有数据都是数字或文本的数组。 一些数据集包括或包含媒体文件,如图像,音频和视频文件. ERDDAP™ 有一些特殊功能,使用户更容易访问媒体文件. 这是两个步骤:
 

1. 通过自己的URL,通过一个支持字节范围请求的系统,使每个文件都可以访问.
最简单的方法是将文件放入目录中 ERDDAP™ 能够进入。 (如果它们像在容器里 .zip 尽管您可能想要提供 .zip 文件也提供给用户。) 然后,做一个 [来自文件名的 EDD 表格](#eddtablefromfilenames) 数据集,通过 ERDDAP™ ,尤其是通过 ERDDAP 因为 [ "files" 系统](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) 。 。 。 。
    
所有文件通过 EDDTable 从文件名和 ERDDAP 因为 "files" 系统支持 [字节范围请求](https://en.wikipedia.org/wiki/Byte_serving) 。 。 。 。 通常,当客户端 (例如,浏览器) 向 URL 请求,它得到整个文件作为响应。 但随着字节范围请求,请求指定了文件的字节范围,服务器只返回这些字节. 这一点在这里是相关的,因为浏览器中的音频和视频播放器只有在文件可以通过字节范围请求访问的情况下才能工作.
    
可选 : 如果您有多个与关联的媒体文件相关的数据集, 您可以只制作一个 EDDTable FromFileNames, 每组文件都有子文件夹 。 其优点是,当您想要为新数据集添加新媒体文件时,只需创建一个新文件夹,并将文件放入该文件夹. 文件夹和文件将自动添加到 EDDTable FromFileNames 数据集。
    
2. 可选 : 如果您有包含媒体文件引用的数据集,请添加到 ERDDAP 。 。 。 。
例如,每次有人看到鲸鱼时,你可能有一个 .csv 文件,并有一个列,其中包括一个图像文件的名称 与目击有关。 如果图像文件的名称仅仅是文件名, 例如 Img20141024T192403Z , 而不是完整的 URL, 那么您需要添加 [文件 Access 库 乌尔和/或文件 Access 后缀](#fileaccessbaseurl) 元数据属性 dataVariable 指定这些文件名的基础URL和后缀。 如果您通过 EDDTable FromFileNames 使文件可以访问, 则 URL 将会在窗体中
     *基数Url* /erddap/文件/存档 * datasetID * 页:1
举例来说,
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
如果有的话 .zip 或者包含所有与数据变量相关的媒体文件的其他容器文件,我们建议您也让用户访问该文件 (见上文步骤1。) 然后用一个 [文件访问Archive 乌尔尔](#fileaccessarchiveurl) 属性。
    

 \\[ 开始于 ERDDAP™ 页:1 \\] 如果你做的第一步以上 (或两个步骤) ,然后当用户查看 ERDDAP™   "files" 该数据集的系统 (或请求通过一个 .htmlTable 请求,如果你做了第二步) , (中文). ERDDAP™ 将在文件名左边显示“?”图标。 如果用户在图标上徘徊,他们会看到一个弹出显示图像,或者一个音频播放器,或者一个视频播放器. 浏览器只支持数量有限的类型

* 图像 (通常为.gif,.jpg,和.png.) , (中文).
* 音频 (通常为.mp3,.ogg,和.wav.) ,以及
* 视频文件 (通常为.mp4,.ogv,和. 网络) 。 。 。 。

不同操作系统中不同版本的不同浏览器支持不同. 所以,如果你可以选择要提供哪种类型的文件,那么提供这些类型的文件是有道理的。

或者,如果用户点击显示在 ERDDAP™ 网页,他们的浏览器会将图像,音频或视频文件作为单独的网页显示. 这对看到一个非常大的图像或视频缩放到全屏幕,而不是在弹出中,是非常有用的.
    
### 使用 AWS S3 文件工作{#working-with-aws-s3-files} 
 [亚马逊网络服务 (自动取款机) ](https://aws.amazon.com) 卖方 [云计算](https://en.wikipedia.org/wiki/Cloud_computing) 服务。 [第3节](https://aws.amazon.com/s3/) 是一个由 AWS 提供的对象存储系统。 而不是传统文件系统的目录和文件的分级系统 (就像电脑里的硬盘) , S3 提供的只是 "buckets" 持有"对象" (我们打给他们 "files" ) 。 。 。 。

对于 ASCII 文件 (例如,.csv) , (中文). ERDDAP™ 可直接与桶中的文件一起工作。 你只需要说明&lt;使用 AWS 桶特定格式的数据集文件Dir&gt;,例如,https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/。 。 。 。 你不应该用&lt;缓存从Url &gt; 。 详情见下文。

但对于二进制文件 (例如, .nc , .grib, .bufr, 和 .hdf 文件) 时,您需要使用&lt;缓存FromUrl&gt; 系统描述如下. ERDDAP ,网易新闻 (哪个 ERDDAP™ 用于从这些文件读取数据) ,而其他科学数据软件则旨在与传统文件系统中提供的文件合作。 [块级](https://en.wikipedia.org/wiki/Block-level_storage) 访问文件 (它允许读取文件块) ,但S3只提供 [文件级别 (对象) ](https://en.wikipedia.org/wiki/Block-level_storage) 访问文件 (它只允许读取整个文件) 。 。 。 AWS提供了S3的替代品, [弹性块存储器 (统计局) ](https://aws.amazon.com/ebs/) ),它支持块级访问文件,但比S3更昂贵,因此很少用于大量数据文件的批量存储. (所以当人们说在云中存储数据 (第3节) 价格低廉 通常是苹果和橙子的比较) 

#### S3 弹匣{#s3-buckets} 
 **水桶的内涵 钥匙 物体 标记器**   
技术上,S3桶不像计算机上的文件系统那样被组织在一个分级的文件结构中. 相反,桶只包含"物体" (文件) ,每个都有"钥匙" (名称) 。 。 。 诺阿戈斯17桶里的钥匙就是

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
该对象的相应 URl 是

 [https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc) 

AWS 支持该 URL 构建方式的微小变化, 但是 ERDDAP™ 需要这个特定格式:
  https://*bucketName*.s3.*region*.amazonaws.com/*key*  

截止 ERDDAP v2.29,现在可以使用 `第3条` URI 格式代替桶 URL 。 此格式用于 [AWS s 3 cli (英语).](https://docs.aws.amazon.com/cli/latest/reference/s3/) 。 。 。 。
第3条 *桶Name* 页:1 *键* 

那个 *区域* 对于S3 URI,可以用三种方式之一指定:
- 那个 *区域* 在 Tomcat 用户中 `~/.aws/配置` 配置文件
- 那个 `区域` 环境变量
- 那个 `区域` JVM 变量 (以 setenv.sh 表示托姆卡特) 

通常的做法是,像这个例子一样,使密钥名称看起来像一个等级路径加上一个文件名称,但技术上它们不是. 因为它是常见和有用的, ERDDAP™ 将 /' 的密钥当作是等级路径加文件名,此文档会这样称呼它们. 如果一个桶的键不使用 /'(例如,一个键像
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s20180522247575),后改编. ERDDAP™ 将整个密钥当作一个长的文件名。

私人对公共桶 - —— - 说 S3水桶的管理者可以将水桶及其内容公之于众或私之于众. 如果公开,任何使用 URL 文件的人都可以下载桶中的任何文件. 亚马逊有一个 [打开数据](https://aws.amazon.com/opendata/) 公共数据集主机的程序 (包括来自 NOAA 美国航天局和USGS) 免费的 不收费任何人下载文件 从这些桶。 如果一个桶是私有的,桶中的文件只能被授权用户访问,AWS收费 (通常由桶主支付) 用于向非AWS S3 计算机下载文件。 ERDDAP™ 可以使用公共和私人桶中的数据。

#### AWS 全权证书{#aws-credentials} 
为了让它这样 ERDDAP™ 可以读取私人桶的内容, 您需要 AWS 证书, 您需要将证书文件存储在标准位置 。 ERDDAP™ 能够找到信息。 见AWS SDK Java 2.x 文件: [设置默认证书](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) 。 。 。 。 (将数值存储为 Java 命令行参数 \\[ 移动猫 \\] /bin/setenv.sh 可能是一个很好的选择.) 
#### AWS / 文件/文件{#aws-files} 
* /文件/系统 -- 那个 ERDDAP™   [/文件/系统](#accessibleviafiles) 允许用户下载数据集的源文件。 我们建议您打开所有带有源文件的数据集, 因为许多用户想要下载原始源文件 。
    * 如果文件位于一个私有的 S3 桶中, 用户下载文件的请求将由 ERDDAP™ ,将读取文件中的数据,然后转发给用户,从而增加您的负载 ERDDAP™ ,使用进出带宽,使您 (联合国 ERDDAP™ 管理员) 向AWS支付数据入侵费。
    * 如果文件在公共 S3 桶中,用户下载文件的请求会被重定向到文件的 AWS S3 URL,所以数据不会流过 ERDDAP™ ,从而减少负载 ERDDAP 。 。 。 如果文件在亚马逊开放数据中 (免费) 公桶,然后你来 (联合国 ERDDAP™ 管理员) 不需要向AWS支付任何数据入侵费. 因此,公众提供的数据具有很大优势。 (非非公开) S3桶, 以及提供来自 Amazon Open Data 的数据的巨大优势 (免费) 桶头.

 ERDDAP 还支持公开桶的匿名证明. 要使用匿名证书,请添加 ` <useAwsAnonymous> 真实 </useAwsAnonymous> ` 到您的设置. xml。

#### 自定义 S3 终点{#custom-s3-endpoints} 
对于不是亚马逊主机的 S3 兼容对象存储, 您需要配置 [结束点(_URL)](https://docs.aws.amazon.com/sdkref/latest/guide/feature-ss-endpoints.html) 并使用 `第3条` URI (英语).

那个 *结束点(_URL)* 可以用三种方式之一说明:
- 那个 *结束点(_URL)* 在 Tomcat 用户中 `~/.aws/配置` 配置文件
- 那个 `AWS_ENDPOINT_URL (英语).` 环境变量
- 那个 `aws.endpoint (英语). 乌尔尔` JVM 变量 (以 setenv.sh 表示托姆卡特) 

对于完整的S3配置变量列表, [见亚马逊文件](https://docs.aws.amazon.com/cli/latest/topic/config-vars.html) 。 。 。 。

 **自签名证书** 
对于自办的S3桶,您往往会拥有自签的SSL证书. 对于 ERDDAP 要从这些桶读取, 您需要将您的证书链添加到 JVM 信任列表 。 `$JAVA_HOME/jre/lib/安全/cacerts` 。 。 。 。 还有, ERDDAP 使用 [AWS 常见运行时间](https://docs.aws.amazon.com/sdkref/latest/guide/common-runtime.html) 以同步方式进入水桶。 这提高了性能,但也需要将您自签名的证书添加到您的OS特定托拉斯中. 如果您想要避免这样做, 您可以禁用 AWS CRT ` <useAwsCrt> 虚假 </useAwsCrt> ` 在您的设置.xml。

####  ERDDAP™ 和 AWS S3 弹匣{#erddap-and-aws-s3-buckets} 
 [ ** ERDDAP™ 和 AWS S3 弹匣** ](#erddap-and-aws-s3-buckets)   
幸运的是 经过很多努力 ERDDAP™ 具有一些特点,使其能够以合理高效的方式处理S3的块级访问文件的内在问题:

*    \\[ 免责声明: 与AWS S3水桶合作是大量的额外工作. AWS是一个巨大的服务和特征生态系统. 修习甚深. 它需要时间和努力,但它是可以做到的。 耐心点,你会让事情正常的 寻找/任务求救
(单位:千美元) [AWS 文档](https://aws.amazon.com/documentation/gettingstarted/) ,网站类 [叠叠流](https://stackoverflow.com/) ,和经常
     [ ERDDAP™ 支持选项](/docs/intro#support) 如果/当你被卡住。 \\]   
     
* 甚至很难在S3桶中找到文件的目录结构和文件名称. ERDDAP™ 已有解决这个问题的解决方案: EDDTable FromFileNames 有特殊的 [\\*\\*"从飞行中"](#fromonthefly) 选项,允许您制作 EDDTable FileNames 数据集,允许用户浏览 S3 桶的内容 (并下载文件) 通过数据集 "files" 选项。 有一个 [实例如下:](#viewing-the-contents-of-a-bucket) 。 。 。 。
     
*    ERDDAP™ 可以从 [外部压缩的数据文件](#externally-compressed-files) 因此,如果S3上的文件被存储为 .gz , (中文). .gzip , (中文). .bz2 , .Z, 或其他类型的外部压缩数据文件, 它可以显著地 (2 - 20X (英语).) 降低文件存储成本。 使用外部压缩文件往往没有时间处罚,因为将一个较小的文件从S3转到S3所节省的时间 ERDDAP 大致平衡所需额外时间 ERDDAP™ 解压缩文件。 要使用此特性,只需确保数据集的&lt;文件Name Regex &gt; 允许压缩文件类型 (例如,通过添加 ( |  .gz ) 到正则尾端) 。 。 。 。
     
* 对于最常见的情况,你有一个 ERDDAP™ 安装在您的个人电脑上进行测试/开发,如果数据集有二进制数据文件作为对象存储在 S3 桶中,那么将数据集输入的方法之一 ERDDAP™ 为:
    1. 在您的 PC 上创建目录以保存一些测试数据文件 。
    2. 从源头下载两个数据文件到您刚刚创建的目录 。
    3. 使用 [生成 DatasetsXml](#generatedatasetsxml) 生成块 datasets.xml 用于基于两个本地数据文件的数据集。
    4. 请检查date=中的日期值 (帮助) [达斯德](#dasdds) 和/或当地 ERDDAP 。 。 。 。
        
         **以下步骤将复制该数据集 (这将从 S3 桶中获取数据) 关于公众的 ERDDAP 。 。 。 。** 
        
    5. 复制块 datasets.xml 的数据集 datasets.xml 为公众服务 ERDDAP™ 这将服务于数据。
    6. 在公众上创建目录 ERDDAP 本地硬盘来保存临时文件的缓存 。 目录不会使用很多磁盘空间 (参见缓存) 。 。 。 。
    7. 更改数据集的值&lt;fileDir &gt; 标记以指向您刚刚创建的目录 (即使目录是空的) 。 。 。 。
    8. 添加一个 [来自Url的缓存](#cachefromurl) 指定数据集桶名和可选前缀的标签 (即目录) 特定 [Aws S3 URL 格式 ERDDAP™ 要求](#accessing-files-in-an-aws-s3-bucket) 。 。 。 。
    9. 添加一个[&lt;缓存SizeGB &gt;] (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;我的宝贝) 标记到数据集的 xml (例如,对于大多数数据集来说, 10 是很好的值) 告诉 ERDDAP™ 以限制本地缓存大小 (即,不要试图缓存所有远程文件) 。 。 。 。
    10. 看看这在公众中是否有效 ERDDAP 。 。 。 。 请注意,第一次 ERDDAP™ 装入数据集,需要很长时间才能装入,因为 ERDDAP™ 需要下载和读取所有的数据文件。
        
如果数据集是一个庞大的网格化数据文件集,这将需要很长的时间,并且是不切实际的. 在某些情况下,对于网格化的数据文件, ERDDAP™ 能够提取所需的信息 (例如,网格数据文件中数据的时间点) 从文件名中选择并避免这个问题。 见 [通过 文件名称](#aggregation-via-file-names-or-global-metadata) 。 。 。 。
        
    11. 可选 (特别是从文件数据集获取的EDD表) ,您可以添加一个 [无线](#nthreads) 标记到要告诉的数据集 ERDDAP 用于在响应用户的数据请求时使用超过一个线程。 这可以最大限度地减少在下列情况下发生的延迟的影响: ERDDAP™ 读取数据文件 (远程) AWS S3 桶进入本地缓存 (也许) 驱散他们

#### AWS S3 打开数据{#aws-s3-open-data} 
作为 NOAA 因为 [大数据程序](https://www.noaa.gov/nodd/about) , (中文). NOAA 与包括AWS在内的5个组织建立了伙伴关系,"探讨在云中存储关键观测和模型输出的副本的潜在好处,以便可以直接在数据上计算,而无需进一步分发". AWS 包括它从 NOAA 作为其方案的一部分,为公众提供大量收集资料的机会。 [在 AWS S3 上打开数据](https://registry.opendata.aws/) 无论它是亚马逊计算实例 (租用的计算机) 在AWS网络上,或者在任何网络上,你自己的PC上。 下面的例子假设您正在使用一个公开的数据集。

#### 在 AWS S3 密钥中访问文件{#accessing-files-in-an-aws-s3-bucket} 
对于私人S3数据桶,桶主必须允许您访问该桶. (见AWS文档.) 

在所有情况下,都需要一个 AWS 账户,因为 AWS SDK 用于 Java   (哪个 ERDDAP™ 用于获取有关桶内内容的信息) 需要 AWS 账户证书。 (更多关于这一点,下面) 

 ERDDAP™ 只能访问 AWS S3 桶,前提是您指定 [&lt;缓存从Url&gt;] (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;我的宝贝) (或&lt;以特定格式:
https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*  
地点

* 桶名(英語:bandle)是桶名的简称,例如noaa-goes17.
* Aws-region,例如我们东一号,来自其中一张表格中的"Region"一栏. [AWS 服务端点](https://docs.aws.amazon.com/general/latest/gr/rande.html) 水桶实际位于何处.
* 前缀可选. 如果存在,它必须结束于 '/' 。 。 。 。

举例来说,https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
此 URL 格式是 AWS S3 建议之一 : [正在访问 Bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) 和 [此前缀描述](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html) 。 。 。 。 ERDDAP™ 要求您将桶 URL 和可选的前缀合并为一个 URL ,以便指定&lt;从Url处缓存 &gt; (或&lt;文件所在位置。

#### 测试公用 AWS S3 桶{#test-public-aws-s3-buckets} 
对于公共桶,您可以也应该在浏览器中测试 AWS S3 目录的桶 URL,例如,
 [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) 如果桶 URL 正确且适合 ERDDAP ,它将返回 XML 文档,该文档已经 (部分) 列出该桶的内容。 不幸的是,整个URL (即桶 URL 加上前缀) 那个 ERDDAP™ 想要给定的数据集不能在浏览器中工作 。 AWS 不提供系统可以轻松浏览浏览浏览器中的桶的等级. (如果这不正确,请发电子邮件给克里斯。 约翰在Noaa.gov。 否则,亚马逊,请增加支持&#33;) 

#### 查看密钥的内容{#viewing-the-contents-of-a-bucket} 
S3桶经常包含几类文件,在几个伪副目录中,这可能成为几类文件. ERDDAP™ 数据集。 来做 ERDDAP™ 数据集,您需要知道起始目录&lt;从Url处缓存 &gt; (或&lt;fileDir&gt;)和识别该子集文件的文件名称格式。 如果尝试在浏览器中查看一个桶的全部内容,S3将只显示前1000个文件,这是不够的. 目前,你查看水桶所有内容的最好方式是制作一个 [来自文件名的 EDD 表格](#eddtablefromfilenames) 数据集 (在你的电脑上 ERDDAP™ 和/或公众 ERDDAP ) ,这也为您提供了浏览目录结构和下载文件的简单方法。 那个&lt;fileDir&gt; 对于此操作,将是您在上面绘制的 URL, 例如 。https://noaa-goes17.s3.us-east-1.amazonaws.com。 。 。 。 \\[ 为什么AWS S3不为任何人提供一个没有AWS账户的快速而简单的方法? \\] 请注意 当我在非亚马逊网络的PC上做这个时 亚马逊似乎减缓了对微风的反应 (约100人 (? 。 。 。) 每个块的文件) 前几块之后 (每块1,000个文件) 正在下载。 因为桶里可能有很多文件 (Noaa-goes17有2 600万) ,获取一个桶的所有内容可能会从文件名中提取 EDDTable 数小时 (例如,12岁&#33;) 结束。 \\[ 亚马逊,是吗? \\] 

#### 制作 EDD 表格 从带有 AWS S3 弹匣的文件名数据集{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
如果您有桶名, 但请不要在 S3 桶或前缀中列出文件列表, 以识别桶中相关文件的位置, 请使用下面的指令来制作 EDDTable FromFileNames 数据集, 这样您就可以浏览 S3 桶的目录等级 。 ERDDAP 因为 "files" 系统。

1. 打开 AWS 账户
     ERDDAP™ 使用 [AWS SDK 为 Java ](https://docs.aws.amazon.com/sdk-for-java/index.html) 从 AWS 获取桶信息,所以您需要 [创建并激活 AWS 账户](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/) 。 。 。 这是一个相当大的工作,有很多事情要学习。
     
2. 将您的 AWS 证书放在哪里 ERDDAP™ 可以找到他们。
遵守指示时 [建立AWS证书和开发区](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) 这样 ERDDAP™   (特别是,AWS SDK用于 Java ) 将会找到和使用您的 AWS 证书。 若为 ERDDAP™ 找不到证书,你会看到
java.lang (法语). 非法参数例外: 配置文件不能为无效错误 ERDDAP 'log.txt文件 。
    
Linux 和 Mac OS 的提示: 证书文件必须位于运行 Tomcat 的用户的主目录中 (和 ERDDAP )   (对于此段落,我们假设用户=tomcat) 在名为~/.aws/证书的文件中。 不要假设~是/home/tomcat——实际上用cd~来找出操作系统认为~是给用户=tomcat的. 如果目录不存在, 则创建目录 。 另外,在您将证书文件设置好后,请确保文件的用户和组是tomcat,然后使用chmod 400证书,确保文件只读用户=tomcat.
    
3. 创建桶 URL [格式为 ERDDAP™ 要求](#accessing-files-in-an-aws-s3-bucket) 例如,
     [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) ,以及 (公共水桶) 在浏览器中测试它,以确保它返回 XML 文档,该文档部分列出该桶的内容。
     
4. 使用 [生成 DatasetsXml](#generatedatasetsxml) 创建一个 [来自文件名的 EDD 表格](#eddtablefromfilenames) 数据集 :
    * 对于起始目录,请使用此语法:
        \\*\\*&#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;你觉得呢? *从飞行,* 你的小宝贝
比如说,
        \\*\\*从飞行,https://noaa-goes17.s3.us-east-1.amazonaws.com/
    * 文件名Regex吗? ._____________________________________________
    * 递归? 真实
    * 重新装入 每一个NMinute? 10080 (英语).
    *    infoUrl ? 。 。 。https://registry.opendata.aws/noaa-goes/
    * 机构? NOAA 
    * 总结? 无 ( ERDDAP™ 将自动创建一个像样的摘要。) 
    * 标题 ? 无 ( ERDDAP™ 将自动创建像样的标题。) 和往常一样,您应该编辑产生的XML,以验证正确性,并在使用它的数据集块之前作出改进 datasets.xml 。 。 。 。
5. 如果您遵循上面的指令并加载数据集 ERDDAP ,您创建了 EDD Table fromFiles 数据集。 例如,为了方便任何人浏览和下载 AWS 开放数据桶中的文件,我们创建了 EDDTable FromFileNames 数据集(见列表 at
     [https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_) 对于几乎所有 [AWS S3 打开数据桶](https://registry.opendata.aws/) 。 。 。 。
     \\[ 我们没有加入的几个桶 也有很多文件在根目录里 (无法在合理时间内下载) ,或者不允许公众访问 (难道他们都不应该公开吗?) 或请求者支付桶 (例如,哨兵) 。 。 。 。 \\]   
如果点击 "files" 链接中,您可以浏览S3桶中的目录树和文件。 因为路\\*\\*来自On The Fly EDD Table FromFiles作品的这些目录列表总是完美地更新,因为 ERDDAP™ 让他们飞起来。 如果您点击目录树到一个实际文件名并点击文件名, ERDDAP™ 将会将您的请求重定向到 AWS S3,这样您就可以直接从 AWS 下载文件 。 你可以检查那个文件。
    
麻烦?
如果您的 EDD Table from Files 不装入 ERDDAP™   (或达斯Dds) ,在log.txt文件中查找错误消息。 如果你看到一个
java.lang (法语). 非法参数例外: 配置文件不能为无效错误, 问题在于 AWS SDK for Java   (用于 ERDDAP ) 找不到证书文件 。 见上文全权证书说明。
     

不幸的是,AWS并没有简单地允许人们使用浏览器查看公共桶的内容.

 **那样你就能 ERDDAP™ 数据集,使用户能够访问文件中的数据。**   
见说明 [ ERDDAP™ 和 S3 键](#erddap-and-aws-s3-buckets)   (上文) 。 。 。 。
对于您在上面制作的 EDDTable FromFileNames 数据集样本, 如果您在目录树上对目录和文件名称稍作浏览, 就会发现顶级目录名称 (例如,ABI-L1b-RadC) 对应什么 ERDDAP™ 将调用单独的数据集。 你用过的桶可能很相似 然后,您可以在 ERDDAP™ 使用,例如,
https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
作为&lt;缓存从Url&gt;. 不幸的是,就这个具体例子而言,桶中的数据集似乎都是一级或二级数据集。 ERDDAP™   [不太擅长](#dimensions) ,因为数据集是使用不同维度的变量比较复杂的集合.
     
    
### NcML 文件{#ncml-files} 
NcML 文件允许您向一个或多个原始源指定飞行时的更改 NetCDF   (v3 或 v4 类型)   .nc , .grib, .bufr, 或 .hdf   (v4 或 v5 类型) 文档,然后有 ERDDAP™ 治疗 .nc ml 文件作为源文件. ERDDAP™ 数据集将接受 .nc ml 文件任何时候 .nc 需要文件 。 NcML 文件 MUST 有扩展名 .nc m. 见 [ Unidata NcML 文档](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) 。 。 。 NcML 有用, 因为您可以用它做一些事情 (例如,对收藏中不同的文件进行不同的修改,包括在文件中添加一个具有特定值的维度) ,你不能做到这一点 ERDDAP 因为 datasets.xml 。 。 。 。

* 更改为a .nc ml 文件上一个修改的时间会使得文件在重新装入数据集时被重新装入,但修改基础 .nc 数据文件不会被直接注意到.
* 提示: NcML 是\\*非常喜欢\\*对 NcML 文件中某些项目的顺序敏感。 将 NcML 视为在指定的顺序中指定一系列指令, 目的是更改源文件 (NcML 文件起始/顶端的状态) 输入目标文件 (NcML 文件末尾/底部的状态) 。 。 。 。

NcML 的替代品是 [ NetCDF 运算符 ( NCO ) ](#netcdf-operators-nco) 。 。 。 最大的区别是NcML是一个在飞行时进行更改的系统 (所以源文件没有更改) ,则 NCO 可用于修改 (或新版本的) 档案。 两者 NCO 而NcML非常,非常灵活,并允许您对文件几乎任意修改。 对两者来说,要确切地确定如何做你想做的事可能具有挑战性——检查网页以了解类似的例子。 两者都是编制综合发展框架和 HDF 用于文档 ERDDAP 特别是,做出超越 ERDDAP 操纵系统可以

例 # 1: 添加单个值的时间尺寸
这个 .nc 创建新外维的 ml 文件 (时间, 1 值: 1041379200) 并在名为 A2003001.L3m\\_DAY\\_PIC\\_pIC\\_4km 的文件中的pic变量中添加此维度 .nc 数字 :
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
示例 2 : 更改现有时间值
有时来源 .nc 文件已经具有时间维度和时间值,但数值不正确 (为了你的目的) 。 。 。 。 这个 .nc ml文件表示: 对于名为""1981082523030-NCEI..."的数据文件,用于维度变量 "time" ,将单位属性设置为"1970-01-01T0000:00Z"后的秒,并将时间值设定为367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
###  NetCDF 运算符 ( NCO )  {#netcdf-operators-nco} 
"网易CDF运营商 ( NCO ) 包含十几个独立命令行程序,使用净CDF \\[ v3 或 v4 类型 \\] , (中文). HDF   \\[ v4 或 v5 类型 \\] , (中文). \\[ .格里布, . bufr, . . \\] 和(或) DAP 文件作为输入,然后操作 (例如,获取新数据、计算统计数据、打印、超音速板、操纵元数据) 并输出结果,以文本、二进制或netCDF格式显示。 NCO 网格化科学数据的辅助分析. 贝壳命令样式 NCO 允许用户交互地操纵和分析文件,或者使用表达式脚本避免一些高层次编程环境的间接费用". (从 [ NCO ](https://nco.sourceforge.net/) 主页) 。 。 。 。

替代 NCO 这是 [NcML 数据](#ncml-files) 。 。 。 最大的区别是NcML是一个在飞行时进行更改的系统 (所以源文件没有更改) ,则 NCO 可用于修改 (或新版本的) 档案。 两者 NCO 而NcML非常,非常灵活,并允许您对文件几乎任意修改。 对两者来说,要确切地确定如何做你想做的事可能具有挑战性——检查网页以了解类似的例子。 两者都是编制综合发展框架和 HDF 用于文档 ERDDAP 特别是,做出超越 ERDDAP 操纵系统可以

例如,你可以使用 NCO 使时间变量的单位在原来不一致的一组文件中保持一致。 或者,你可以用来 NCO 应用 scale\\_factor 和 add\\_offset 在一组文件中 scale\\_factor 和 add\\_offset 在不同源文件中具有不同的值。
 (或者,你现在可以处理 这些问题在 ERDDAP™ 通过 [ EDDGrid 从 NcFiles 未包装](#eddgridfromncfilesunpacked) ,这是 EDDGrid 从NcFiles中解包数据,并将时间值标准化到低水平,以便处理不同收集文件 scale\\_factor s 和 add\\_offset ,或者不同的时间单位。) 

 NCO 是使用此软件的自由和开源软件 [GPL 3.0 常规](https://www.gnu.org/licenses/gpl-3.0.html) 执照。

示例1:使单位一致
 EDDGrid 从文件夹和 EDD 表格 从文件坚持给定变量的单位在所有文件中是相同的. 如果一些文件是微不足道的 (没有功能) 与其它不同(例如:
"自1970-01-01 00:00 UTC下午1点起的秒数"对战
 "seconds since 1970-01-01T00:00:00Z" ,您可以使用 NCO 因为 [无](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor) 来更改所有文件中的单位,使其与
nco/ncatted - a单位,时间,o,c,秒数自1970-01-01T00:00Z'QQ .nc   
 \\[ 在EDDTable From中,很多这样的问题... 文件数据集,现在可以使用 [标准化 什麽?](#standardizewhat) 告诉 ERDDAP 在读入源文件时实现标准化 ERDDAP 。 。 。 。 \\] 
    
### 对数据集大小的限制{#limits-to-the-size-of-a-dataset} 
下方会看到许多"20亿"的参考文献. 更准确地说,这指的是2 147 483 647 (2^31-1 (英语).) ,这是32位签名整数的最大值。 例如,在某些计算机语言中 Java   (哪个 ERDDAP™ 写入) ,这是可用于许多数据结构的最大数据类型 (例如,数组的大小) 。 。 。 。

对于字符串值 (例如,对于变量名称、属性名称、字符串属性值和字符串数据值,) ,每个字符串的最大字符数 ERDDAP™ 是~20亿。 但是,在几乎所有情况下,如果一个字符串超过合理的尺寸,就会出现小问题或大问题. (例如,80个字符用于变量名称和属性名称,255个字符用于大多数字符串属性值和数据值) 。 。 。 例如,显示长变量名的网页会尴尬地宽一些,长变量名如果超过响应文件类型的限制,则会截断.

对于网格数据集:

* 最多数量 axisVariable s是~20亿.
最多数量 dataVariable s是~20亿.
但如果一个数据集有 &gt; 100个变量,则用户使用会很麻烦.
如果一个数据集有&gt;100万个变量,则您的服务器将需要大量的物理内存,并会出现其他问题.
* 每个维的最大大小 ( axisVariable ) 是~20亿值。
* 我认为细胞总数最多 (所有尺寸的产物) 是无限的,但可能是~9e18。

表格数据集:

* 最多数量 dataVariable s是~20亿.
但如果一个数据集有 &gt; 100个变量,则用户使用会很麻烦.
如果一个数据集有&gt;100万个变量,则您的服务器将需要大量的物理内存,并会出现其他问题.
* 源的最大数量 (例如,文件) 总共是20亿
* 在某些情况下,单个来源的最大行数 (例如,一个文件,但不是数据库) 是~20亿行。
* 我觉得没有其他限制

对于网格化和表格化的数据集,用户在一次请求中可以要求的子集大小有一些内部限制. (经常与 &gt; 20亿某物或~9e18某物有关) ,但用户更可能击中文件类型的特定限制。

*    NetCDF 版本 3 .nc 文件仅限于2GB字节. (如果这真的对某人有问题,告诉我: 我可以补充支持 NetCDF 版本 3 .nc 64位扩展或 NetCDF 第4版将大大增加限制,但并非无限。) 
* 浏览器仅在数据 ~ 500MB 后崩溃, 所以 ERDDAP™ 限制响应到 .htmlTable 请求数据~400MB。
* 许多数据分析程序都有类似的限制 (例如,一个维度的最大尺寸往往为~20亿值.) ,所以没有理由努力绕过文件类型的特定限制.
* 文件类型的限制是有用的,因为它们可以防止天真地要求获得真正巨大的数据 (例如,当数据集有20TB数据时,“给我所有此数据集”) ,下载需要数周或数月。 下载时间越长,就越可能因各种原因失败.
* 文件类型的特定限制是有用的,因为它迫使用户处理大小合理的子集 (例如,通过各一个时间点的数据文件处理大型网格数据集) 。 。 。 。
         
### 切换到 ACDD-1.3{#switch-to-acdd-13} 
我们 (重点 [生成 DatasetsXml](#generatedatasetsxml) ) 目前建议 [ACDD 版本 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) ,于2015年初批准,并在全球公约属性中被称为"ACDD-1.3". 在此之前 ERDDAP™ 1.62版本 (2015年6月发布.) , (中文). ERDDAP™ 使用/建议原版,1.0版 [ NetCDF 数据集发现属性公约](https://wiki.esipfed.org/ArchivalCopyOfVersion1) 被称为 " Unidata 全球公约和 Metadata\\_Conventions 属性。

如果您的数据集使用早期版本的ACDD,我们建议您切换到ACDD-1.3。 不难 ACDD-1.3与1.0版本高度后向兼容. 要切换所有数据集 (除外 EDDGrid 从 Erddap 和 EDD 表格 从 Erddap 数据集) 数字 :

1. 删除新贬值的全局 Metadata\\_Conventions 添加属性 (或者通过修改现有的 Metadata\\_Conventions 属性)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
到数据集的全局&lt; addAttributes &gt; &gt;.
     
2. 如果数据集在全局中具有公约属性&lt; addAttributes &gt;,全部更改 " Unidata Dataset Discovery v1.0"提到"ACDD-1.3".
如果数据集在全球没有公约属性&lt; addAttributes &gt;,然后添加一个提及ACDD-1.3. 举例来说,
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. 如果数据集为全局 standard\\_name\\_vocabulary 属性,请将数值的格式修改为,例如,
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
如果参考的是旧版本的 [CF 标准名称表](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) 。 。 。 切换到当前版本也许是个好主意 (65,我们写这个) ,因为新的标准名称与后续版本一起加入该表,但旧的标准名称很少被贬值,并且从未被删除.
     
4. 虽然 ACDD-1.0 包含了用于 creator\\_name , (中文). creator\\_email , (中文). creator\\_url , (中文). [生成 DatasetsXml](#generatedatasetsxml) 直到某个时候才自动加入 ERDDAP™ v1.50 (英语). 这是重要信息:
        
    *    creator\\_name 让用户知道/点击数据集的创建者。
    *    creator\\_email 告诉用户用于联系数据集创建者的首选电子邮件地址,例如如果用户对数据集有疑问.
    *    creator\\_url 给用户一个了解更多创作者的方法.
    *    ERDDAP™ 在为每个数据集生成FGDC和ISO 19115-2/19139元数据文档时,使用所有这些信息。 外部搜索服务经常使用这些文件。
    
请将这些属性添加到数据集的全局&lt; addAttributes &gt; &gt;.
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
就是这样。 我希望那不会太难
     
### 扎尔{#zarr} 
截至第2.25版 ERDDAP™ 能够读取本地 使用 Zarr 文件 [来自 NcFiles 的 EDD 表格](#eddtablefromncfiles) 和 [ EDDGrid 从NcFiles调用](#eddgridfromncfiles) 。 。 。 。

 (截止2019年8月) 我们很容易就错了,但我们还没有相信 [扎尔](https://github.com/zarr-developers/zarr-python) ,或者类似系统,将数据文件分解成小块,是解决以下问题的最佳办法: ERDDAP™ 读取存储在亚马逊AWS S3等云服务中的数据. Zarr是一种伟大的技术, 已经显示出它在各种情况下的用处, 我们只是不确定 ERDDAP +S3将是这种情况之一。 多数情况下,我们是在说:在我们匆忙地努力将我们的所有数据存储在扎尔之前,让我们做一些测试,看看它是否真的是一个更好的解决方案.

获取云中数据的问题在于耐久性 (首先获取数据的滞后) 和文件级访问 (而不是块级访问) 。 。 。 Zarr)解决了文件级访问问题,但对延迟问题却无动于衷. 与仅仅下载文件相比 (因此它可以作为本地文件读取, 并有块级访问) ,Zarr甚至可能加剧 暂时性的问题,因为,随着Zarr,读一个文件 现在涉及一系列的呼叫 阅读文件的不同部分 (每个都有自己的落后) 。 。 。 暂时性问题可以通过并行请求来解决,但这是一个更高层次的解决方案,不依赖于扎尔.

和扎尔 (关系数据库) ,我们失去了将一个数据文件变成一个简单、单一文件的便利性,而您可以很容易地验证其完整性,或者制作/下载一个副本。

 ERDDAP™   (截至二年级) 拥有维护本地缓存 URL 源文件的系统 (例如,S3) (见[&lt;来自Url的缓存 &gt; 和&lt;缓存MaxGB &gt;] (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;我的宝贝) ) (中文(简体) ). 和新的&lt;nThreads &gt;] (英语). (无线) 通过在高水平上并行数据检索,应尽量减少延迟问题。&lt;缓存FromUrl &gt; 似乎在许多情景中效果很好。 (我们不知道有多有益)&lt;n Threads &gt; 没有进一步的测试。 ) 我们承认,我们还没有在网络连接良好的AWS实例上进行计时测试,但我们已经成功测试了各种远程URL文件来源. 还有 ERDDAP 因为&lt;缓存FromUrl&gt; 与任何类型的数据文件一起工作 (例如, .nc , (中文). .hdf , .csv, (英语). .jsonlCSV ) ,即使外部压缩 (例如, .gz ) ,对文件没有任何修改 (例如,将其改写为Zarr收藏) 。 。 。 。

不同的情景可能有利于不同的解决方案,例如只需要读取文件的一部分一次 (扎尔会赢的) , vs. 需要读取所有文件一次, vs. 需要反复读取部分或全部文件(&lt;缓存FromUrl &gt; 将获胜).

多数情况下,我们是在说:在我们匆忙地努力将我们的所有数据存储在扎尔之前,让我们做一些测试,看看它是否真的是一个更好的解决方案.

- - 说吧
## 类型数据集列表{#list-of-types-datasets} 
如果您需要帮助选择正确的数据集类型,请参见 [选择数据集类型](#choosing-the-dataset-type) 。 。 。 。

数据集的类型分为两类. ( [为什么?](#why-just-two-basic-data-structures) ) 

###  EDDGrid  {#eddgrid} 
*    [ ** EDDGrid ** ](#eddgrid) 数据集处理网格数据。
    * 内 EDDGrid 数据集,数据变量是多维数据阵列.
    * 每个维都有一个轴变量。 轴变量 MUSST 以数据变量使用它们的顺序指定。
    * 内 EDDGrid 数据集,所有数据变量使用MUSST (份额) 所有轴变量。
         ( [为什么?](#why-just-two-basic-data-structures)   [如果他们不呢?](#dimensions) ) 
新建于 ERDDAP™ 2.2.9.0版本为 EDDGrid From NcFiles 是对不支持所有轴变量的数据变量的实验支持 (或像有人在同一个数据集中称之为 1D 和 2D 数据) 。 。 。 。
    * 排序的维度值 - 总之 EDDGrid 数据集,每个维度必须排序 (上升或下降) 。 。 。 每个空间都可以不规则。 没有联系 这是法院的一项要求。 [CF 元数据标准](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 。 。 。 如果任何维度的值没有排序顺序,数据集将不会被加载,并且 ERDDAP™ 将识别日志文件中的第一个未排序的值, *大家长会* /logs/log.txt (英语).
        
少数子类有额外的限制(尤其是: EDDGrid 聚合分化要求外(最左,第一)维度是上升的.
        
未排序的维度值几乎总是表示源数据集存在问题. 最常见的情况是在集合中包含一个错误名称或不适当的文件,从而导致一个不排序的时间维度. 要解决这个问题,请在 ERDDAP™ 查找违法时间值的log.txt文件 。 然后在源文件中查找相应的文件 (之前或之后一个) 这不属于集合。
        
    * 详见关于 [ EDDGrid 数据模型](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel) 。 。 。 。
    * 那个 EDDGrid 数据集类型为:
        *    [ EDDGrid 从AudioFiles 调用](#eddfromaudiofiles) 汇总一组本地音频文件的数据。
        *    [ EDDGrid 从 Dap 中](#eddgridfromdap) 处理网格数据 DAP 服务器。
        *    [ EDDGrid 可处理文件](#eddgridfromeddtable) 将表格数据集转换成网格数据集。
        *    [ EDDGrid 从埃尔达普](#eddfromerddap) 处理远程的网格数据 ERDDAP 。 。 。 。
        *    [ EDDGrid 从埃托波](#eddgridfrometopo) 只是处理内置的ETOPO地形数据。
        *    [ EDDGrid 从文件](#eddgridfromfiles) 是一切的超级阶级 EDDGrid 从...
        *    [ EDDGrid 从MorgeIRFiles 调用](#eddgridfrommergeirfiles) 集合来自本地合并的一组数据 .gz 文档。
        *    [ EDDGrid 从NcFiles调用](#eddgridfromncfiles) 汇总一组本地数据 NetCDF   (v3 或 v4 类型)   .nc 和相关文件。
        *    [ EDDGrid 从 NcFiles 未包装](#eddgridfromncfilesunpacked) 是变体,如果 EDDGrid 来自NcFiles,它同时汇总来自本地一组的数据 NetCDF   (v3 或 v4 类型)   .nc 和相关文件,哪些 ERDDAP™ 低水平的拆包
        *    [ EDDGrid 龙PM180](#eddgridlonpm180) 修改儿童的经度值 EDDGrid 以便他们在180至180之间。
        *    [ EDDGrid 龙0360](#eddgridlon0360) 修改儿童的经度值 EDDGrid 使他们在0至360之间。
        *    [ EDDGrid 侧边线](#eddgridsidebyside) 两个或两个以上 EDDGrid 数据集并存。
        *    [ EDDGrid 总计](#eddgridaggregateexistingdimension) 两个或两个以上 EDDGrid 数据集,每个数据集第一维的值范围不同,但其他维的值相同。
        *    [ EDDGrid 复制](#eddgridcopy) 可以制作一个本地拷贝另一个 EDDGrid 本地副本中的数据和服务。
             
    * 全体 EDDGrid 数据集支持 nThreads 设置,它告诉 ERDDAP™ 响应请求时要使用多少线索 。 见 [无线](#nthreads) 详细文件。
         
### 电子数据交换表{#eddtable} 
*    [ **电子数据交换表** ](#eddtable) 数据集处理表格数据。
    * 表格数据可以作为类似数据库的表格,包含行和列. 每栏 (一个数据变量) 拥有一个名称,一组属性,只存储一类数据. 每行都有观察 (或一组相关数值) 。 。 。 数据源可能拥有不同数据结构,更复杂的数据结构和/或多个数据文件的数据,但是. ERDDAP™ 需要将源数据平整成类似数据库的表格,以便将数据作为表格数据集提交用户。 ERDDAP 。 。 。 。
    * 详见关于 [EDDTable 数据模型](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel) 。 。 。 。
    * EDDTable数据集类型为:
        *    [AllDatasets 中的 EDD 表格](#eddtablefromalldatasets) 是一个更高层次的数据集,该数据集包含关于您 ERDDAP 。 。 。 。
        *    [来自 Ascii 文件夹的 EDD 表格](#eddtablefromasciifiles) 汇总来自逗号、标签、分号或空格分隔的ASCII数据文件的数据。
        *    [来自Ascii 服务的 EDD 表](#eddtablefromasciiservice) 是所有EDDTableFromAsciiServicice... 类的超级阶级.
        *    [来自Ascii Servicicenos的EDD表](#eddtablefromasciiservicenos) 处理来自一些 NOAA NOS网络服务.
        *    [来自音频文件夹的 EDD 表格](#eddfromaudiofiles) 汇总一组本地音频文件的数据。
        *    [从 EDD 表格 AwsXml 文件夹](#eddtablefromawsxmlfiles) 从一组自动气象站汇总数据 (自动取款机) XML 文件.
        *    [来自卡桑德拉的EDD表](#eddtablefromcassandra) 处理一个卡桑德拉表格中的表格数据。
        *    [来自 ColumnarAsii 文件的 EDD 表格](#eddtablefromcolumnarasciifiles) 将表格 ASCII 数据文件中的数据与固定宽度数据列汇总。
        *    [来自 DapSequence 的 EDD 表](#eddtablefromdapsequence) 处理来自 DAP 序列服务器。
        *    [数据库中的 EDD 表格](#eddtablefromdatabase) 处理一个数据库表格中的表格数据。
        *    [从 EDD 表格 EDDGrid ](#eddtablefromeddgrid) 允许您从一个 EDDGrid 数据集。
        *    [来自Erddap的EDD表](#eddfromerddap) 处理远程的表格数据 ERDDAP 。 。 。 。
        *    [来自文件名的 EDD 表格](#eddtablefromfilenames) 从服务器文件系统中一组文件的信息中创建一个数据集,但它并不服务于文件内部的数据.
        *    [来自文件的 EDD 表格](#eddtablefromfiles) 是所有 EDD Table 从... Files 类的超级类。
        *    [来自 HttpGet 的 EDD 表格](#eddtablefromhttpget) 这是 ERDDAP '是数据导入和数据导出的唯一系统.
        *    [从 EDD 表格 Hyrax 文件](#eddtablefromhyraxfiles)   (过期) 汇总文件数据,其中包含若干变量,具有共享维度 [ Hyrax   OPeNDAP 服务器](https://www.opendap.org/software/hyrax-data-server) 。 。 。 。
        *    [来自 InvalidCRA 文件的 EDD 表](#eddtablefrominvalidcrafiles) 数据汇总 NetCDF   (v3 或 v4 类型)   .nc 使用 CF DSG 相邻标记阵列的特定、无效的变体的文件 (庇护上诉委员会) 文档。 虽然 ERDDAP™ 支持此文件类型, 这是一个无效的文件类型, 任何人都不应开始使用 。 强烈鼓励当前使用此文件类型的组使用 ERDDAP™ 生成有效的 CF DSG CRA 文件,并停止使用这些文件。
        *    [来自 JsonlCSV 的 EDD 表格](#eddtablefromjsonlcsvfiles) 数据汇总 [贾森 线条 CSV 文件](https://jsonlines.org/examples/) 。 。 。 。
        *    [来自多分位Nc Files的 EDD表](#eddtablefrommultidimncfiles) 数据汇总 NetCDF   (v3 或 v4 类型)   .nc 带有多个具有共享维度的变量的文件。
        *    [来自Mqtt的 EDD 表格](/docs/server-admin/mqtt-integration) 基于 MQTT 消息构建数据集。 注意文件在专页上。 注意有很多相似之处 [来自 HttpGet 的 EDD 表格](#eddtablefromhttpget) 。 。 。 。
        *    [来自 NcFiles 的 EDD 表格](#eddtablefromncfiles) 数据汇总 NetCDF   (v3 或 v4 类型)   .nc 带有多个具有共享维度的变量的文件。 继续使用该数据集类型用于现有数据集是好的,但对于新的数据集,我们建议使用EDDTable From MultidimNcFiles。
        *    [来自 NcCFF 的 EDD 表格](#eddtablefromnccffiles) 数据汇总 NetCDF   (v3 或 v4 类型)   .nc 使用文件格式之一的文件 [CF 数字 断层采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 公约。 但对于使用一个多维CF DSG变体的文件,请使用 [来自多分位Nc Files的 EDD表](#eddtablefrommultidimncfiles) 相反。
        *    [来自 Nccsv 文件的 EDD 表格](#eddtablefromnccsvfiles) 数据汇总 [NCCSV 网络](/docs/user/nccsv-1.00) ASCII.csv 文档.
        *    [来自NOS的EDD表](#eddtablefromnos)   (过期) 处理来自NOS XML服务器的表格数据。
        *    [EDD 表从OBIS](#eddtablefromobis) 处理 OBIS 服务器的表格数据。
        *    [来自Parquet Files的 EDD 表格](#eddtablefromparquetfiles) 处理来自 [公园](https://parquet.apache.org/) 。 。 。 。
        *    [从 EDD 表格 SOS ](#eddtablefromsos) 处理来自 SOS 服务器。
        *    [来自垃圾的 EDD 表格](#eddtablefromthreddsfiles)   (过期) 汇总文件数据,其中包含若干变量,具有共享维度 [红色 OPeNDAP 服务器](https://www.unidata.ucar.edu/software/tds/) 。 。 。 。
        *    [从 EDD 表格 WFS 文件](#eddtablefromwfsfiles)   (过期) 制作一个本地副本,复制来自 ArcGIS 地图服务器 WFS 服务器,这样数据就可以快速重新保存到 ERDDAP™ 用户。
        *    [EDD 表格外观](#eddtableaggregaterows) 可以从一组EDDTable数据集中生成一个EDDTable数据集.
        *    [EDD 表格复制](#eddtablecopy) 可以制作许多类型的EDDTable数据集的本地拷贝,然后从本地拷贝中快速重新保存数据.

  
- - 说吧

## 数据集类型的详细说明{#detailed-descriptions-of-dataset-types} 

###  EDDGrid 从 Dap 中{#eddgridfromdap} 
 [ ** EDDGrid 从 Dap 中** ](#eddgridfromdap) 处理网格变量 [ DAP ](https://www.opendap.org/) 服务器。

* 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 您可以收集所需的信息来修补它或者创建自己的 XML 用于 EDDGrid 通过查看您浏览器中源数据集的 DDS 和 DAS 文件从 Dap 数据集中获取 (将 .das 和.dds 添加到 sourceUrl 例如, [https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds) ) 。 。 。 。
     
*    EDDGrid 从Dap中可以从任何多维变量中获取数据 DAP 数据服务器。 (先前, EDDGrid FromDap仅限于被指定为"grid"的变量,但这已不再是一个要求.)   
     
* 排序的维度值 - 每个维度的值按顺序排序 (上升或下降) 。 。 。 值可以不规则地间隔. 没有联系 这是法院的一项要求。 [CF 元数据标准](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 。 。 。 如果任何维度的值没有排序顺序,数据集将不会被加载,并且 ERDDAP™ 将识别日志文件中的第一个未排序的值, *大家长会* /logs/log.txt (英语).
    
未排序的维度值几乎总是表示源数据集存在问题. 最常见的情况是在集合中包含一个错误名称或不适当的文件,从而导致一个不排序的时间维度. 要解决这个问题,请在 ERDDAP™ 查找违法时间值的log.txt文件 。 然后在源文件中查找相应的文件 (之前或之后一个) 这不属于集合。
    
####  EDDGrid 从 Dap 骨架 XML 数据{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
###  EDDGrid 可处理文件{#eddgridfromeddtable} 
 [ ** EDDGrid 可处理文件** ](#eddgridfromeddtable) 将 EDD表表格数据集转换为 EDDGrid 网格数据集。 记住 ERDDAP™ 将数据集视为任意 [网格数据集 (子类 EDDGrid ) 或表格数据集 (EDD 表的子类) ](#why-just-two-basic-data-structures) 。 。 。 。

* 通常情况下,如果你有 网格数据,你刚刚设置 EDDGrid 数据集直接。 有时这是不可能的,例如,当你把数据存储在一个关系数据库中, ERDDAP™ 只能通过 EDDTable 从数据库访问。 EDDGrid 从EDDable课程 让你纠正这种情况。
     
* 显然,基本的EDDTable数据集中的数据必须是: (基本上是这样) 网格数据,但以表格形式。 例如,EDDTable数据集可能拥有CTD数据:测量东向和北向电流,在几个深度,几次. 由于每个时间点的深度都是一样的 EDDGrid 从EDDTable中可以创建具有时间和深度维度的网格数据集,通过基础的EDDTable数据集访问数据.
     
* 生成数据 Xml - 打开 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 你可以收集所需的信息来改进粗略的草稿.
     
* 源属性 - 如同所有其他类型的数据集, EDDGrid 从表格中可以找到全球源属性 [全球 addAttributes ](#global-attributes)   (指定于 datasets.xml ) 合并,使全球综合 属性,这是用户看到的. 对于全球源属性, EDDGrid 来自EDDTable系统使用全球综合 基本 EDDTable 数据集的属性。 (如果你考虑一下,这是有道理的。) 
    
同样,每个 axisVariable &#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;还有... dataVariable 因为 [ addAttributes ](#addattributes) , (中文). EDDGrid 使用变量的组合 基本 EDDTable 数据集的属性 EDDGrid 从EDDTable变量的源属性. (如果你考虑一下,这是有道理的。) 
    
因此,如果EDD表有良好的元数据,则 EDDGrid 从EDDable 往往不需要多少 addAttributes 元数据,只是一些微调。
    
*    dataVariable s 对 axisVariable s -- 翻译: 基本的EDD表只有 dataVariable 编号 一个 EDDGrid 从 EDDT 可读数据集将有一些 axisVariable 编号 (从一些 EDD 表格创建 dataVariable 编号) 还有一些 dataVariable 编号 (从剩余的 EDD 表格创建 dataVariable 编号) 。 。 。 。 [生成 DatasetsXml](#generatedatasetsxml) 将猜测哪个 EDD表 dataVariable s 应该成为 EDDGrid 可处理文件 axisVariable s,但这只是一个猜测。 您需要修改 GenerateDatasetsXml 的输出以指定哪个 dataVariable 将会变成 axisVariable s, 并按哪个顺序排列.
     
* 轴值 - 根本的EDD表没什么可说的 EDDGrid 可从EDDD中分解 axisVariable s 在数据集的网格化版本中,所以您必须提供每个数据集的信息 axisVariable 通过其中一个属性:
    
    * 轴值 - 让您指定一个数值列表。 举例来说,
        &lt;名称=“轴值” [类型=“双重列表”](#attributetype) \\&gt;2、2.5、3、3.5、4&lt;/att &gt; (单位:千美元)
注意使用 [数据类型](#data-types) 加上单词列表。 此外,清单的类型 (例如,双倍) ,必须匹配数据 EDD表中的变量类型和 EDDGrid 从EDDT可读数据集.
    * 轴式ValuesStartStread - 让您通过指定开始、步态和停止值来指定一个定期间隔值的序列。 以下是一个相当于以上轴值的例子:
        &lt;att name="轴式 Values Start Stop" (自动停止) [类型=“双重列表”](#attributetype) \\&gt;2、0.5、4&lt;/att &gt; (单位:千美元)
请注意使用列表数据类型。 此外,清单的类型 (例如,双倍) ,必须匹配数据 EDD表中的变量类型和 EDDGrid 从EDDT可读数据集.
         
    
更新 - 就像没有办法 EDDGrid 从EDDTable开始确定EDD表的轴值,也没有任何可靠的方法。 EDDGrid 从 EDDD 可从 EDD 表格中确定轴值何时改变 (特别是当时间变量出现新值时) 。 。 。 目前,唯一的解决方案是改变轴变量属性 datasets.xml 并重新装入数据集。 例如,你可以写一个脚本给
    
    1. 搜索 datasets.xml (单位:千美元)
         datasetID =" *数据集ID* " , "
所以你正在使用正确的数据集。
    2. 搜索 datasets.xml 发生时间
         <sourceName>  *变量来源Name*  </sourceName>   
因此,你的工作 正确的变量。
    3. 搜索 datasets.xml 发生时间
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
所以你知道标签的起始位置。
    4. 搜索 datasets.xml 发生时间
```
        </att>  
```
因此,你知道轴值的终点位置。
    5. 用新值替换旧的开始, 脚步, 停止值 。
    6. 联系 [旗帜 URL](/docs/server-admin/additional-information#set-dataset-flag) 要显示的数据集 ERDDAP™ 以重新装入数据集。
    
这不是理想的,但它的工作。
     
* 精确度 - 何时 EDDGrid 从EDDTable中响应用户的数据请求,将EDDTable响应表的一行数据移动到 EDDGrid 响应网格。 要做到这一点,它必须弄清楚表中某一行的"轴"值是否与网格中轴值的某些组合相匹配. 对于整数数据类型,很容易确定两个值是否相等. 但对于浮点数和双点数来说 这会引起浮点数的可怕问题 [不完全匹配](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) 。 。 。 。 (例如,0.2对0.19999999999996) 。 。 。 。 改为 (尝试) 处理这个, EDDGrid 从表格中,您可以指定其中任一的精确属性 axisVariable s,指定必须相同的小数位数的总数。
    * 举例来说,&lt;att name=“精度”类型=“int”=5&lt;/att &gt; (单位:千美元)
    * 对于不同类型的数据变量,有不同的默认精度值. 默认通常是适当的. 如果不是,则需要指定不同的值.
    * 对于 axisVariable 已经是 [时间或时间 印花变量](#timestamp-variables) ,默认为完全精确 (准确匹配) 。 。 。 。
    * 对于 axisVariable s为浮标,默认精度为5.
    * 对于 axisVariable s为双倍,默认精度为9.
    * 对于 axisVariable s 具有整数数据类型, EDDGrid From EDDTable 忽略精度属性,总是使用全精度 (准确匹配) 。 。 。 。
         
    *    **警报&#33;** 将一组表格数据转换成一组网格数据时,如果 EDDGrid 从 EDDTable 无法将 EDD表“轴” 值匹配到预期值之一 EDDGrid 从 EDDD 轴值, EDDGrid 从EDDTable无声 (无错误) 丢弃表格中该行的数据。 例如,可能还有其他数据 (没有在网格上) 在 EDDTable 数据集中。 (如果脚踏实地 &gt; 1,这是不明显的 EDDGrid 从表格中,哪些轴值是理想的值,哪些是因速度而需要跳过的值。) 因此,如果精度值过高,当有效数据值实际存在时,用户会在数据响应中看到缺失值.
        
相反,如果精确值设置得太低,则EDDTable “轴”值不应匹配 EDDGrid 从 EDDD 轴值将 (错了) 比赛。
        
这些潜在的问题是可怕的,因为用户得到的数据是错误的 (或缺失值) 当他们应该得到正确的数据 (或至少一个错误消息) 。 。 。 。
这不是一个缺陷 EDDGrid 从表. EDDGrid 从表不能解决这个问题。 问题在于将表格数据转换成网格数据。 (除非可以做出其他假设 但不能在这里做出) 。 。 。 。
这取决于你, ERDDAP™ 管理员, 到 **测试你的 EDDGrid 从EDD可彻底** 确保确定精确值以避免这些潜在的问题。
        
#### 间距{#gapthreshold} 
*    [间距](#gapthreshold) - —— - 说 这是一个非常不寻常的数据集类型。 由于可以查询的种类 (由) a 是一个 EDDGrid 数据集 (范围与进展 axisVariable 编号) 与可查询的类型大不相同 (由) EDD表数据集 (仅仅与一些变量的范围有关) ,则 EDDGrid 从EDDTable数据集中得出的数据将有很大差异,这取决于所提出的确切请求和基本的EDDTable数据集的速度。 具有超速值的请求 &gt; 第1条, EDDGrid 可从 EDDDable 中查询基本的 EDD 表格,以获取相对较大的数据 (似乎脚步=1) 然后通过结果进行筛选,将数据从一些行中保存下来,然后将数据从其他行中丢弃. 如果它需要通过大量数据筛选来获取它所需要的数据,则请求需要更长的时间来填充.
    
若为 EDDGrid 从EDDable中可以看出,将存在巨大的差距 (有行不想要的数据) 在有所需数据的行间, EDDGrid 从EDDTable中可以选择向基本的EDD表提出几个子请求,而不是一个大请求,从而跳过大缺口中不想要的数据行. 本决定的灵敏度由以下条目中指定的差值控制:&lt;间隙阈值 &gt; 标记 (默认=1,000行源数据) 。 。 。 将空档设置为较小的数目会导致数据集生成 (概况) 更多的子请求。 将空档设为较大数目的门槛将会导致数据集的制作 (概况) 子请求更少.
    
如果缺口太大了, EDDGrid 来自EDDTable的操作会比较慢,因为多个请求的间接费用将超过通过获取一些多余数据节省的时间. 如果缺口太大的话 EDDGrid 从EDDTable中调取的数据会比较慢,因为会从EDD表格中获取过多的数据,只能丢弃。 (正如Goldilocks发现的,中间是"恰到好处".) 不同类型EDDTable数据集的间接费用差异很大,所以了解您数据集实际最佳设置的唯一方法是通过实验. 但你不会犯错 坚持违约。
    
一个简单的例子是: EDDGrid 从桌上只用一个 axisVariable   (时间, 大小为 100 000) 一个 dataVariable   (温度) ,而默认值为1000。
    
    * 如果用户要求温度 \\[ 0&#58;100&#58;5000 \\] ,脚步是100,所以空隙大小是99,比空隙危险小. 这么说 EDDGrid 从表格中只向EDD表格提出一个请求,用于请求所需的所有数据 (等于温度 \\[ 0:5 000 (中文(简体) ). \\] ) 丢掉所有它不需要的数据
    * 如果用户要求温度 \\[ 0:2500:5000 (英语). \\] ,这个速度是2500,所以空隙大小是2499,比空隙危险值大。 这么说 EDDGrid 从表格中向EDD表格分别提出请求,这些请求相当于温度 \\[ 0 个 \\] 温度 \\[ 2500号 \\] 温度 \\[ 5000块 \\] 。 。 。 。
    
当有多个轴时,差距大小的计算更为复杂.
    
对于每个用户请求, EDDGrid 从EDDT可读打印出与此相关的诊断信息 [日志.txt](/docs/server-admin/additional-information#log) 文档。
    
    * 若[&lt;日志级别 &gt;] (# 日志级别) 输入 datasets.xml 被设定为信息,此打印信件如
nouterAxes=1 4 nouter请求=22
如果nOuterAxes=0,空隙屏障没有被突破,只向EDDTable提出一个请求.
如果 nOuterAxes &gt; 0, 空格危险值被突破, 并向 EDD Table 提交 nOuter 请求, 与请求的每个最左边的 nOuterAxs 组合相对应 。 例如,如果数据集有 4 axisVariable s 和 dataVariable 就像东边 \\[ 时间 \\]  \\[ 纬度 \\]  \\[ 经度 \\]  \\[ 深度 \\] 最左边 (第一个) 轴变量是时间。
    * 若为&lt;日志级别 &gt; 输入 datasets.xml 设置为全部,附加信息写入log.txt文件。
         
####  EDDGrid 从EDDD 骨架 XML 数据{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### EDD* 从 ERDDAP  {#eddfromerddap} 
 ** EDDGrid 从埃尔达普** 处理远程的网格数据 ERDDAP™ 服务器。
 **来自Erddap的EDD表** 处理远程的表格数据 ERDDAP™ 服务器。

*    EDDGrid 从 Erddap 和 EDDTable From Erdddap 中与所有其他类型数据集的行为不同 ERDDAP 。 。 。 。
    * 和其他类型的数据集一样,这些数据集从源头获得数据集的信息,并将其保存在内存中.
    * 像其他类型的数据集,何时 ERDDAP™ 搜索数据集,显示数据访问表 ( * datasetID * .html (中文(简体) ).) ,或显示 Make 图形窗体 ( * datasetID * 图片) , (中文). ERDDAP™ 使用内存中的数据集信息。
    *    EDDGrid 从 Erddap 和 EDD 表格 From Erddap 是基础 [网格/集群/联邦](/docs/server-admin/scaling) 页:1 ERDDAP s, 高效分配 CPU 使用量 (主要用于制作地图) 、大型数据中心的内存使用、数据集存储和带宽使用。
#### 重定向{#redirect} 
* 不同于其他类型的数据集,当 ERDDAP™ 收到从这些数据集获取数据或图像的请求, ERDDAP   [重定向](https://en.wikipedia.org/wiki/URL_redirection) 请求远程 ERDDAP™ 服务器。 结果是:
    * 这很有效率 (CPU、内存和带宽) 因为不然
        1. 综合说明 ERDDAP™ 必须把请求发送给对方 ERDDAP™   (需要时间) 。 。 。 。
        2. 另一个 ERDDAP™ 必须获取数据,重塑数据,并将数据传送到复合数据 ERDDAP 。 。 。 。
        3. 综合说明 ERDDAP™ 必须收到数据 (使用带宽) ,重塑它 (使用 CPU 和内存) ,并将数据传送给用户 (使用带宽) 。 。 。 通过重新定向请求并允许对方 ERDDAP™ 将响应直接发送给用户,复合 ERDDAP™ 基本上没有在请求上花费CPU时间,内存,或带宽.
    * 重定向对用户透明, 不管客户端软件如何 (浏览器或任何其他软件或命令行工具) 。 。 。 。
*    [你看得出来 ERDDAP™ ](#redirect) 不通过设置重定向任何用户请求&lt;重定向 &gt; 虚假&lt;/redirect&gt;,但这否定了.FromErddap数据集类型的大部分优点. (特别是把负载分散在前端 ERDDAP™ 到远程/后端 ERDDAP ) 。 。 。 。
         
     
#### 订阅{#subscriptions} 
通常,当 EDDGrid 从 Erddap 和 EDD 表格 从Erddap是 (内容) 装入您的 ERDDAP ,它们试图通过远程添加远程数据集的订阅 ERDDAP 电子邮件/URL订阅系统。 这样,每当远程数据集改变,远程 ERDDAP™ 联系人 [设置数据集 旗帜 URL](/docs/server-admin/additional-information#set-dataset-flag) 在你身边 ERDDAP™ 这样可以重新装入本地数据集ASAP,使本地数据集总是完美地更新并模仿远程数据集. 因此,第一次发生这种情况时,你应该收到一封电子邮件,请求你验证订阅。 但是,如果当地 ERDDAP™ 无法发送电子邮件或远程 ERDDAP 电子邮件/ URL 订阅系统没有活动, 您应该将远程电子邮件 ERDDAP™ 管理员和请求手工添加 s/he [&lt;更改 &gt; ] (改变) . .  ....&lt;/在切换 &gt; 标记到所有相关的数据集以调用您的数据集的 [设置数据集 旗帜 URL](/docs/server-admin/additional-information#set-dataset-flag) 。 。 。 。 再见 ERDDAP™ 设置列表的每日报告 旗帜 URL,但只是发送 EDDGrid 从Erddap和EDDTable 从Erddap数据集到远程 ERDDAP™ 管理员。
    
这不行吗? 您的本地数据集是否与远程数据集同步 ?
要让这个系统运作起来 就必须有好几种方法 才能让你的数据集随时更新 检查这些东西的每个顺序:
    
    1. 你们 ERDDAP™ 必须能够发送电子邮件。 查看您的设置中的电子邮件设置. xml 。
    2. 一般情况 (但并不总是) 、 ERDDAP 因为&lt;基准Url &gt; 和&lt;baseHttpsUrl &gt; 必须没有端口号码 (例如:8080、8443。) 。 。 。 。 如果有的话,用一个 [代理密码](/docs/server-admin/deploy-install#proxypass) 从Url中移除端口。
    3. 在你的设置.xml,&lt;订阅TremoteErddapDataset&gt; 必须设定为真实 。
    4. 当您的本地 EDD... 从Erddap数据集重新装入,它应该向远程发送请求 ERDDAP™ 以订阅远程数据集。 在log.txt中查看是否发生这种情况.
    5. 您应该收到电子邮件, 请求您验证订阅请求 。
    6. 您必须点击电子邮件中的链接来验证订阅请求 。
    7. 遥控器 ERDDAP™ 应当说验证是成功的。 您可以随时请求远程电子邮件 ERDDAP™ 包含您待定和有效订阅的列表。 见表格 *远程 ErddapBase 乌尔尔* /erddap/订阅/list.html.
    8. 当远程数据集发生变化时 (例如,获得额外数据) ,遥控器 ERDDAP™ 应该试着联系您身上的旗手 ERDDAP 。 。 。 你不能检查这个,但你可以问遥控器的管理员 ERDDAP™ 检查这个。
    9. 你们 ERDDAP™ 应接到设立该旗号的请求。 在您的日志中查找“ setDatasetFlag.txt” 请求 (编号) ,并查看是否有与请求相关的错误消息。
    10. 你们 ERDDAP™ 然后应该尝试重新装入该数据集 (也许不是立即,但尽快) 。 。 。 。
         
#### 最新最多数 (时间) ? 。 。 。{#up-to-date-maxtime} 
 EDDGrid /Table FromErddap数据集仅在源数据集为时更改其存储的关于每个源数据集的信息 ["重装"](#reloadeverynminutes) 和一些元数据变化 (例如,时间变量的 actual\\_range ) ,从而生成订阅通知。 如果源数据集的数据经常变化 (例如,每秒有新数据) 并使用 ["更新"](#updateeverynmillis) 系统注意到基础数据经常变化, EDDGrid /Table FromErddap不会被通知这些频繁的更改,直到下一个数据集"重装",所以 EDDGrid /表 从Erddap不会完全更新。 您可以通过更改源数据集的&lt;将 EveryNiminutes &gt; 重新装入更小的值 (60岁?) 以便有更多的订阅通知告知 EDDGrid /Table FromErddap来更新关于源数据集的信息.

或者,如果您的数据管理系统知道源数据集是否有新数据 (例如,通过复制数据文件的脚本) 如果这不是超频繁的 (例如,每5分钟,或频率较低) ,有一个更好的解决方案:

1. 别用&lt;更新 Everynimillis &gt; 以保持源数据集的更新.
2. 设置源数据集&lt;将 EveryNiminutes &gt; 重装到更大的数 (1440号?) 。 。 。 。
3. 让脚本联系源数据集 [旗帜 URL](/docs/server-admin/additional-information#set-dataset-flag) 复制到新数据文件后立即生效。
     

这将导致源数据集完全更新,并导致其生成订阅通知。 EDDGrid /表从Erddap数据集. 这将会导致 EDDGrid / Table from Erddap 数据集要完美更新 (5秒内,新的数据被添加) 。 。 。 和所有将会高效完成的工作 (无需重新装入数据集) 。 。 。 。
     
#### 没有 addAttributes , (中文). axisVariable ,或 dataVariable  {#no-addattributes-axisvariable-or-datavariable} 
与其他类型的数据集不同,EDDTable FromErddap和 EDDGrid 来自Erddap数据集不允许全局&lt;addAttributes&gt;, (中文).&lt; axisVariable & gt; , 或 (G)&lt; dataVariable 在 &gt; 区域中 datasets.xml 为数据集。 问题在于,允许这些结果会导致不一致:
    
1. 让我们假设这是允许的, 你增加了一个新的全球属性。
2. 当用户询问您时 ERDDAP™ 对于全局属性,将出现新的属性。
3. 但当一个用户问你 ERDDAP™ 对于数据文件,您 ERDDAP™ 将请求重定向到源头 ERDDAP 。 。 。 。 那个 ERDDAP™ 并不知道新的属性。 因此,如果它创建了带有元数据的数据文件,例如a .nc 文件,元数据不会有新的属性。

有两条路要走:

1. 说服源头的管理员 ERDDAP™ ,用于修改元数据。
2. 而不是 EDD Table from Erddap, 使用 [来自 DapSequence 的 EDD 表](#eddtablefromdapsequence) 。 。 。 。 或者说 EDDGrid 从Erddap, 使用 [ EDDGrid 从 Dap 中](#eddgridfromdap) 。 。 。 这些 EDD 类型允许您高效地连接到远程的数据集 ERDDAP™   (但不重定向数据请求) 他们允许你包括全球&lt;addAttributes&gt;, (中文).&lt; axisVariable & gt; , 或 (G)&lt; dataVariable 在 &gt; 区域中 datasets.xml 。 。 。 另一个区别是:您需要手动订阅远程数据集,以便您能够手动订阅远程数据集。 ERDDAP™ 将通知 (通过 [旗帜 URL](/docs/server-admin/additional-information#set-dataset-flag) ) 当远程数据集有变化时。 因此,您正在创建一个新的数据集,而不是链接到远程数据集。
         
#### 其他说明{#other-notes} 
* 出于安全考虑 EDDGrid 从 Erddap 和 EDD 表格 从Erddap不支持 [&lt;可访问工具 &gt;] (能够进入) 标记和不能使用需要登录的远程数据集(因为它们使用[&lt;可访问工具 &gt;] (能够进入) . . . . . . 见 ERDDAP 因为 [安保系统](/docs/server-admin/additional-information#security) 限制某些用户访问某些数据集。
     
* 开始 ERDDAP™ 页:1 EDDGrid 从Erddap和EDDTable FromErddap支持 [&lt;可访问的ViaFiles &gt; (# 无障碍文件) 标记 。 与其他类型的数据集不同的是,默认是真实的,但只有源数据集也存在的情况下,数据集的文件才能访问ViaFiles&lt;可访问ViaFiles &gt; 设置为真。
     
* 你可以用这个 [生成数据 Xml 程序](#generatedatasetsxml) 来做 datasets.xml 这类数据集的块 。 但你可以轻松地用手来做这些类型的数据集.
     
####  EDDGrid 从Erddap骨架 XML 数据{#eddgridfromerddap-skeleton-xml} 
*    EDDGrid 从Erddap骨架 XML 数据集非常简单,因为其意图只是模仿已经适合用于 ERDDAP 数字 :
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### EDD Table 来自 Erddap 骨架 XML 数据{#eddtablefromerddap-skeleton-xml} 
* 用于EDDTable FromErddap数据集的骨架XML非常简单,因为本意只是模仿远程数据集,这已经适合用于 ERDDAP 数字 :
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid 从埃托波{#eddgridfrometopo} 
 [ ** EDDGrid 从埃托波** ](#eddgridfrometopo) 只是服务于 [ETOPO1 全球 1- minute 嵌入梯形数据集](https://www.ngdc.noaa.gov/mgg/global/global.html)   (冰面, 已注册的网格, 二进制, 2字节整数 : etopo1============================ .zip ) 与 ERDDAP 。 。 。 。

* 只有两个 datasetID s 支持用于 EDDGrid 从Etopo,可以访问经度值 -180到180,或经度值 0到360的数据.
* 从来没有子标签, 因为数据已经在其中描述 ERDDAP 。 。 。 。
* 所以,两个选项 EDDGrid Etopo 数据集为 (从字面上) 数字 :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

###  EDDGrid 从文件{#eddgridfromfiles} 
 [ ** EDDGrid 从文件** ](#eddgridfromfiles) 是一切的超级阶级 EDDGrid 从... 你用不着 EDDGrid 从Files直接。 相反,使用一个子类: EDDGrid 从文件处理特定文件类型 :

*    [ EDDGrid 从MorgeIRFiles 调用](#eddgridfrommergeirfiles) 处理网格数据 [合并 .gz ](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) 文档。
*    [ EDDGrid 从AudioFiles 调用](#eddfromaudiofiles) 汇总一组本地音频文件的数据。
*    [ EDDGrid 从NcFiles调用](#eddgridfromncfiles) 处理网格数据 [GRIB . grb (英语).](https://en.wikipedia.org/wiki/GRIB) 文档, [ HDF   (v4 或 v5 类型)   .hdf ](https://www.hdfgroup.org/) 文档, [ .nc 门L](#ncml-files) 文件,和 [ NetCDF   (v3 或 v4 类型)   .nc ](https://www.unidata.ucar.edu/software/netcdf/) 文档。 这与其他文件类型可能有效 (例如,BUFR) 我们只是还没有测试过 -- 如果你有兴趣的话,请给我们一些样本文件。
*    [ EDDGrid 从 NcFiles 未包装](#eddgridfromncfilesunpacked) 是一个变体,由 EDDGrid 处理网格数据的文件 NetCDF   (v3 或 v4 类型)   .nc 和相关文件,哪些 ERDDAP™ 低水平的拆包

目前,没有支持其他文件类型. 但通常比较容易为其他文件类型添加支持. 有要求就联系我们 或者,如果你的数据是旧文件格式的,而你希望从这个格式移开,我们建议转换文件。 NetCDF 页:1 .nc 文档。 NetCDF 是一种得到广泛支持的二进制格式,允许快速随机访问数据,并已被 ERDDAP 。 。 。 。

#### 从文件细节{#from-files-details} 
以下信息适用于下列所有类别: EDDGrid 从Files.

##### 现有层面的汇总{#aggregation-of-an-existing-dimension} 
所有变化 EDDGrid 从 Files 中可以汇总本地文件的数据, 每个文件都有 1 (或超过) 最左边的不同值 (第一个) 维度,通常 \\[ 时间 \\] ,将加以汇总。 例如,维度可能是: \\[ 时间 \\]  \\[ 高度 \\]  \\[ 纬度 \\]  \\[ 经度 \\] ,文件可能有一个数据 (或几个) 时间值 (编号) 每个文件。 由此产生的数据集似乎已经合并了文件的所有数据。 汇总的主要优点是:

* 集成数据集的大小可以大大大于单个文件的方便度 (~2GB 键) 。 。 。 。
* 对于近实时数据,很容易添加包含最新数据块的新文件. 你不必重写整个数据集.

汇总要求如下:
* 本地文件不需要同样的 dataVariable 编号 (数据集中定义的 datasets.xml ) 。 。 。 。 数据集将包含 dataVariable s 定义 datasets.xml 。 。 。 如果给定的文件没有给定 dataVariable , (中文). ERDDAP™ 将按需要添加缺失值。
* 所有电话 dataVariable S MUST 使用同样的 axisVariable s/dimensions (日语) (数据集中定义的 datasets.xml ) 。 。 。 文件将基于第一个 (最左边) 维度,按升序排序。
* 每个文件May都有第一个维度的一个或多个值的数据,但文件之间不能有任何重叠. 如果一个文件对第一个维度有多个值,则该值按上升顺序排序,无链接.
* 所有文件 MUST 对于其他所有维度都有完全相同的值. 测试的精度由 [匹配轴线](#matchaxisndigits) 。 。 。 。
* 所有文件都一样 [单位](#units) 全部元数据 axisVariable s 和 dataVariable 编号 如果有问题,也许可以使用 [NcML 数据](#ncml-files) 或 [ NCO ](#netcdf-operators-nco) 来解决这个问题。
         
##### 通过文件名称或全局元数据聚合{#aggregation-via-file-names-or-global-metadata} 
所有变化 EDDGrid 从Files也可以通过添加新的最左侧文件来聚合一组文件 (第一个) 维度,通常是时间,基于每个文件名或每个文件中一个全局属性的值。 例如,文件名可能包含文件中数据的时间值. ERDDAP™ 然后将创造一个新的时间维度。

与THREDDS中的类似特征不同, ERDDAP™ 总是创建一个 axisVariable 有数值 (按照CF的要求) ,从不字符串值 (CF不允许的) 。 。 。 。 还有, ERDDAP™ 将根据数字排序汇总中的文件 axisVariable 用于每个文件的值,这样轴变量将始终有CF所要求的排序值。 THREDDS 方法在文件名称的基础上进行词典排序, 导致集合, 轴值不排序 (CF 不允许使用) 当文件名称排序与来源不同时 axisVariable 数值。

建立其中的一个集合 ERDDAP™ ,您将定义一个新的最左边 (第一个)   [ axisVariable ](#axisvariable) 有特别的,假的&lt; sourceName &gt;,它告诉 ERDDAP™ 从每个文件中找到新维度的值。

* 假名的格式 sourceName 从文件名获得值 (只是文件名.ex) 这是
    \\*\\*&#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;你觉得呢? *文件Name*  [数据 类型](#data-types)  *, (中文).* 提取Regex *, (中文).* 捕获组数量*
* 假名的格式 sourceName 从文件的绝对路径名称中获取值的
    \\*\\*&#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;你觉得呢? *路径Name*  [数据 类型](#data-types)  *, (中文).* 提取Regex *, (中文).* 捕获组数量*
     \\[ 为此,路径名称总是使用 '/' 作为目录分隔符字符,从“\\”开始。 \\] 
* 假名的格式 sourceName 从全局属性获得的值是
    \\*\\*&#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;你觉得呢? *全球:* 属性 名称 *, (中文).*  [数据 类型](#data-types)  *, (中文).* 提取Regex *, (中文).* 捕获组数量*
* 这个假的 sourceName 选项与其它选项不同:而不是创建新的最左 (第一个)   axisVariable ,以此取代当前值 axisVariable 从文件名中提取值 (只是文件名.ex) 。 。 。 。 格式为
    \\*\\*&#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;你觉得呢? *替换 从文件Name*  [数据 类型](#data-types)  *, (中文).* 提取Regex *, (中文).* 捕获组数量*
     

所需部分的说明如下:

*    *属性 名称* - 每个文件中包含尺寸值的全局属性名称。
*    *数据 类型* - —— - 说 此选项指定用于存储值的数据类型 。 参见标准列表 [数据 类型](#data-types) 那个 ERDDAP™ 支持,但这里不允许字符串,因为轴变量位于 ERDDAP™ 不能是字符串变量。
    
另有伪数据Type,时间Format= *字符串 时间格式* ,说明 ERDDAP™ 该值为字符串时间戳 [适合字符串时间的单位](#string-time-units) 。 。 。 在大多数情况下,您需要的字符串TimeFormat将是其中一种格式的变体:
    
    *    yyyy-MM-dd 'T'HH:mm:s.SSSZ - 该ISO 8601:2004 (英) 日期时间格式。 您可能需要缩短版本, 例如, yyyy-MM-dd '不'HH:mm:s或 yyyy-MM-dd 。 。 。 。
    * yyyMMddHhmms.SS-是ISO 8601日期时间格式的紧凑版本. 您可能需要缩短版本, 例如 YyyyMMddHhmms 或 YyyyMMdd 。
    * 妇女/青年 H:mm:s.SS——即美国斜日格式. 您可能需要缩短版本, 例如 M/d/yyyy 。
    * yyyDDHHHmmsSS - 一年加零加法日 (例如,001 = Jan 1, 365 = Dec 31 在非 Leap年;这有时被错误地称为Julian日期) 。 。 。 您可能需要缩短版本, 例如 YyyDDD 。
    
如果您使用此伪数据, 请将此添加到新变量的&lt; addAttributes &gt; :
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
如果要移动全部时间值,则以单位移动时间值,例如,
1970-01-01T12:00Z (中文(简体) ).
*    *提取Regex* - —— - 说 这是 [正则表达式](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) 包括捕获组 (括号中) 它描述如何从文件名或全局属性值中提取值。 例如,给定文件名如S19980011998031.L3b\\_MO\\_CHL .nc ,捕获组 #1, "\\ \\d教程 ",在正则表达式S中 (&#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;你觉得呢? \\d教程 ) &#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;你觉得呢? \\d教程 \\.L3b. \\ 将抓取“ S” 之后的前7位数字: 1998001 。
*    *抓取组数* - —— - 说 这是抓取组的号码 (在括号内) 包含相关信息的正则表达式。 通常为1,是第一个捕获组. 有时候你需要使用捕获组在regex中用于其他目的,所以重要的捕获组号将是2 (第二捕捉组) 或3个 (第三届) 等 类.

一个完整的例子 axisVariable 它使一个带有新时间轴的汇总数据集从每个文件的文件名中获取时间值:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
当使用“time Format=”伪数据时 类型, ERDDAP™ 将添加2个属性到 axisVariable 因此他们似乎来自来源:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
因此,在这种情况下, ERDDAP™ 将创建一个新轴,命名为 "time" 双值 (自1970-01-01T00:00Z以来的秒) 在文件名中提取“S”之后和“.L3m”之前的7位数字,并将这些数字解释为格式化为yyyDD的时间值。

您可以覆盖默认的基准时间 (1970-01-01T00:00Z (英语).) 通过添加 [添加属性](#addattributes) 它指定了不同基时间的不同单位属性。 一个常见的情况是:有数据文件组,每个组都有卫星数据集的1天复合件,在此您希望文件名中提及的当天的正午时间值 (每天的中心时间) 想要变数 long\\_name 成为"核心时间"。 这方面的一个例子是:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
注数小时=基准时间12,相对于1970-01-01T00:00Z的原始基准时间增加了12小时.

一个完整的例子 axisVariable 它使集成数据集具有新的“运行”轴 (包含内置值) 从每个文件中的“ runID” 全球属性获取运行值 (包含“ r17QQGlobal ” 等值, 其中 17 是运行数) 这是
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
注意使用抓取组 2 来捕捉“ r” 或“ s” 之后和“ QQGlobal” 之前出现的位数 。 此示例还显示如何添加附加属性 (例如, ioos\\_category 单位) 到轴变量。
     
#### 外部压缩文件{#externally-compressed-files} 
* 属于 EDDGrid 从文件夹和 EDD 表格 从Files可以直接从外部压缩的数据文件服务数据,包括 .tgz , (中文). .tar  .gz , (中文). .tar  .gzip , (中文). .gz , (中文). .gzip , (中文). .zip , (中文). .bz2 ,还有.Z文件.
     
*    **这工作很出色&#33;**   
在大多数情况下,与中小数据文件解压有关的减速不大。 如果您需要保存磁盘空间,我们强烈鼓励使用此功能,特别是对于很少访问的旧文件.
     
*    **省钱&#33;**   
这是其中少有的特征之一 ERDDAP™ 让你有机会省很多钱 (尽管以业绩略有下降为代价) 。 。 。 如果压缩比是例如 6:1 (有时候会高得多) ,那么数据集的数据文件只需要磁盘空间的1/6. 那也许你可以用1RAID通过 (特定大小) 而不是6例艾滋病 (大小相同的国家) 。 。 。 这是巨大的成本节省。 希望能够压缩收藏中的一些文件 (旧的?) 而不压缩他人 (新来的?) ,为了随时改变这一点,让我们尽量缩小缺点,以压缩一些文件 (访问速度较慢) 。 。 。 如果选择是在磁带上存储文件 (并且只能根据请求,在延误之后才能进入) vs 将其存储在 RAID 上 (并可通过 ERDDAP ) ,那么使用压缩,使用户能够交互和 (相对) 快速访问数据。 如果这样可以节省你购买额外的RAID,这个功能可以节省大约3万美元.
     
* 为所有人 EDDGrid 从 Files 子类, 如果数据文件有扩展名显示它们是外部压缩文件 (目前: .tgz , (中文). .tar  .gz , (中文). .tar  .gzip , (中文). .gz , (中文). .gzip , (中文). .zip , (中文). .bz2 ,或.Z) , (中文). ERDDAP™ 读取时会解压缩文件到数据集的缓存目录 (如果它们不在缓存中) 。 。 。 二进制文件也是如此 (例如, .nc ) EDDTable FromFiles 的子类。
     
* 对于非二进制文件的 EDDTable fromFiles 子类 (例如,.csv) ,带有扩展名的数据文件,表明它们是外部压缩文件,在读取文件时将解压缩。
     
* 需要: 如果使用的外部压缩文件类型 (例如, .tgz 或 .zip ) 支持压缩文件中超过一个文件,压缩文件只必须包含一个文件.
     
* REQUIREMENT:这个特性假设外部压缩文件的内容不会改变,这样一个缓存的解压缩文件就可以被重用. 如果一个数据集的部分或全部数据文件有时被更改,那么不要压缩这些文件. 这与常用一致,因为人们通常不会压缩他们有时需要修改的文件.
     
*   &lt;文件Name Regex &gt; 为了让这个工作,数据集的&lt;文件Name Regex&gt;必须匹配压缩文件的名称。 显然,regexs喜欢。\\*将匹配所有文件名。 如果指定特定文件类型,例如,.\\*键 .nc ,然后需要修改正则ex以包含压缩扩展,例如.\\ *键 .nc 键 .gz (如果所有文件都将是* 东西* .nc  .gz 文档).
     
* 如果您的数据集包含一个压缩而非压缩文件的组合,则不难。 如果您相信一些文件, 这可能有用 (例如,旧文件) 将较少使用,因此通过压缩来节省磁盘空间将是有益的。 为了让这个工作,&lt;文件NameRegex &gt; 必须匹配压缩文件的名称,例如 。\\*或为.\\*键 .nc  ( | 键 .gz ) (在该句结尾处的捕获组中指定: .gz 是可选的。
     
* 如果您在任何时间压缩或解压缩收藏中的特定文件,则会很好。
如果数据集不使用[&lt;更新EveryNMILIS &gt; (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;更新每个人) ,设置数据集的 [旗帜](/docs/server-admin/additional-information#flag) 告诉 ERDDAP™ 以重新装入数据集,从而注意更改。 有趣的是,您可以使用不同的压缩算法和设置来在同一数据集中使用不同的文件 (例如, .bz2 对于很少使用的文件, .gz 用于不常使用的文件,而不压缩常用文件) ,只需确定regex支持所有正在使用的文件扩展名,例如 . .nc  ( | 键 .gz  | 键 .bz2 ) 。 。 。 。
     
* 当然,不同压缩算法的压缩比率和速度随源文件和设置而不同 (例如,压缩级别) 。 。 。 如果您想要优化此系统的文件, 请使用您的文件和一系列的压缩设置来测试不同的压缩方法 。 如果你想要一个可靠的好 (不一定是最棒的,我爱他) 准备,我们稍作建议 gzip   ( .gz ) 。 。 。 。 gzip 不使最小的压缩文件 (相当接近) ,但它会快速压缩文件 (对 ERDDAP™ 用户) 很快解压缩文件. 还有 gzip 软件随着每个Linux和Mac OS的安装而达到标准,并且通过7Zip和Git Bash等Linux加载工具随时可供Windows使用. 例如,将源文件压缩到 .gz 文件的版本 (相同的文件名, 但使用 .gz 附 录) 编辑 (在 Linux 、 Mac OS 和 Git Bash 中)   
     gzip   * sourceName *   
为了解压 .gz 文件返回原文件, 使用
枪响 * sourceName  .gz *   
要压缩目录及其子目录中的每个源文件, 递归, 使用
     gzip -对 *导演Name*   
解压每个 .gz 目录及其子目录中的文件, 递归, 使用
枪尾-r *导演Name*   
     
* 警告:不要外部压缩 ( gzip ) 已经内部压缩的文件 &#33;
许多文件内部已经压缩了数据. 如果你们 gzip 这些文件,产生的文件不会小很多(&lt;(5%)和 ERDDAP™ 当它需要读它们时,会浪费时间去压抑它们。 例如:
    
    * 数据文件:例如, .nc 第4条, .hdf 5个文件 : 有些文件使用内部压缩;有些则不使用. 如何分辨:压缩变量具有"QQChunkSize"属性. 而且,如果一组网状 .nc 或 .hdf 文件都是不同的大小,它们很可能是内部压缩的。 如果它们都一样大小,它们不会被内部压缩.
    * 图像文件:例如:.gif、.jpg和.png
    * 音频文件:例如.mp3和.ogg.
    * 视频文件:例如:.mp4,.ogv,和.webm.
    
        
一个不幸的奇案:.wav音频文件巨大,并非内部压缩. 最好还是压缩一下 ( gzip ) 他们,但一般你不应该,因为如果你这样做,用户将无法在他们的浏览器中播放压缩文件.
     
* 测试大小写: 压缩 (与 gzip ) 装有1523网格的数据集 .nc 文档。
    
    * 来源文件中的数据很少 (许多缺失的值) 。 。 。 。
    * 总磁盘空间在压缩前从57GB变为7GB之后.
    * 一个时间点的很多数据请求是&lt;1 s在压缩前后.
    * 请求提供365个时间点的1个数据点 (最坏的情况) 从4秒到71秒
         
    
对我来说,这是任何数据集的合理权衡,当然,对于很少使用的数据集来说,也是合理的权衡。
     
* 内部对外部压缩-
与内部文件压缩相比 .nc 经常预算: .hdf 5个文件, ERDDAP '外部压缩二进制文件的方法有优点和缺点. 缺点是:一次性读取一个文件的一小部分,内部压缩更好,因为 EDDGrid Files 只需解压缩几个块 (编号) 文件,而不是整个文件。 不过 ERDDAP 这种方法有一些优点:
    
    *    ERDDAP™ 支持所有类型数据文件的压缩 (二进制和非二进制,例如, .nc 3号和.csv号) 不仅仅是 .nc 经常预算: .hdf 4个
    * 如果一个文件的绝大部分需要在短时间内被读取一次以上,那么它会节省时间去解压文件一次并多次读取. 这发生在 ERDDAP™ 当一个用户使用 Make-A-Graph 来进行数据集,并对图表进行一系列小的修改时.
    * 在同一收藏中拥有压缩文件而不是压缩文件的能力,可以让您对哪些文件被压缩而不是进行更多的控制. 而这个添加的控件不会真正修改源文件 (由于您可以压缩一个文件,例如, .gz 然后解压缩以获取原始文件) 。 。 。 。
    * 随时改变文件是否压缩以及如何压缩的能力 (不同的算法和设置) 赋予你更多的系统性能控制。 而且可以随时轻易地恢复原始的未压缩文件.
    
虽然这两种方法在所有情况下都不是赢家,但很明显, ERDDAP 外部压缩能为外部压缩文件的数据服务,使得外部压缩可以合理地替代由外部压缩提供的内部压缩. .nc 经常预算: .hdf  5.五. 这一点很重要,因为内部压缩是人们选择使用的主要原因之一。 .nc 经常预算: .hdf  5.五.
     
##### 已解压缓存{#decompressed-cache} 
 ERDDAP™ 使任何压缩二进制的解压缩版本 (例如, .nc ) 需要读取文件时的数据文件。 解压缩文件保存在数据集目录内 *大家长会* /减press/. 在累积文件大小 &gt; 10GB 时, 解压缩后的文件如果最近没有使用, 将被删除以腾出空间 。 您可以通过设置来改变&lt;已解压CacheMaxGB &gt; (默认=10) 在数据集中 Xml.xml,例如,
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
另外,在过去15分钟里还没有被使用过的解压缩文件将在每个主要数据集重载的开始时删除. 您可以通过设置来改变&lt;已解压的CacheMaxMinutesOld &gt; (默认=15) 在数据集中 Xml.xml,例如,
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
更大的数字是不错的,但累积大小 解压文件可能导致 *大家长会* 以耗尽磁盘空间,从而造成严重的问题。
     
* 因为解压文件需要很多时间 (0.1至10秒) ,带有压缩文件的数据集可能从设置数据集的[&lt;nThreads &gt;] (英语). (无线) 设置到较高数字 (两个? 三个? 四点?) 。 。 。 人数越多越少 (例如,5个? 六点? 七点?) 正在减少回报,一个用户的请求随后可以使用高百分比的系统资源,从而大大减缓了对其他用户请求的处理。 因此,没有理想的nThreads设置,只是在不同环境的不同情况下的不同后果.
         
#### 排序的尺寸值{#sorted-dimension-values} 
每个维度的值按顺序排序 (升降,但第一个 (最左边) 必须上升的维度) 。 。 。 值可以不规则地间隔. 不能有任何联系。 这是法院的一项要求。 [CF 元数据标准](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 。 。 。 如果任何维度的值没有排序顺序,数据集将不会被加载,并且 ERDDAP™ 将识别日志文件中的第一个未排序的值, *大家长会* /logs/log.txt (英语).
    
未排序的维度值几乎总是表示源数据集存在问题. 最常见的情况是在集合中包含一个错误名称或不适当的文件,从而导致一个不排序的时间维度. 要解决这个问题,请在 ERDDAP™ 查找违法时间值的log.txt文件 。 然后在源文件中查找相应的文件 (之前或之后一个) 这不属于集合。
    
#### 目录{#directories} 
文件可能在一个目录中,或者在一个目录及其子目录中 (递归) 。 。 。 如果有大量文件 (例如, &gt;1,000) ,操作系统 (并由此而来 EDDGrid 从文件) 如果您将文件存储在一系列子目录中, 操作效率会高得多 。 (每年一个,或每月一个,用于文件非常频繁的数据集) ,这样在给定目录中就不会有大量的文件。
     
#### &lt;来自Url的缓存 &gt;{#cachefromurl} 
全体 EDDGrid 从Files和所有 EDDTable FromFiles 数据集支持一组显示的标签 ERDDAP™ 下载和维护远程数据集所有文件的副本,或少数文件的缓存 (视需要下载) 。 。 。 。 这可能非常有用。 见 [缓存 从Url 文档](#cachefromurl) 。 。 。 。
    
#### 远程目录和 HTTP 区域请求{#remote-directories-and-http-range-requests} 
 (AKA 字节服务、字节范围请求、接受范围 http 标题)   
 EDDGrid 从 Nc Files 、 从 MultidimNcFiles 、 从 NcFiles 和 从 NcCFFiles 中获取 EDD Table 可以 *有时* 服务数据来自 .nc 远程服务器上的文件,如果服务器支持,则通过 HTTP 访问 [字节服务](https://en.wikipedia.org/wiki/Byte_serving) 通过 HTTP 范围请求 (字节服务的 HTTP 机制) 。 。 。 这是可能的,因为Netcdf -java (哪个 ERDDAP™ 用于读 .nc 文件) 支持从远程读取数据 .nc 文件通过 HTTP 范围请求。

 **别这样&#33;** 它极其低效和缓慢。
相反,使用[&lt;缓存从Url&gt;系统] (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;我的宝贝) 。 。 。 。

访问 ERDDAP™ 通过字节范围请求将数据集作为文件 --
翻转这个,如果你可以 (理论上) 考虑在 ERDDAP™ 作为巨人 .nc 通过附加文件 " .nc " 到基地OPEN DAP 给定数据集的 URL (例如,https://myserver.org/erddap/griddap/datasetID.nc并在此之后添加一个 ? query 以指定子集) 问一下你是否可以使用Netcdf-java,也许是合理的, Ferret ,或者其他一些 NetCDF 可以通过客户端软件读取数据 HTTP 区域请求 ERDDAP 。 。 。 答案是否定的,因为实际上没有巨大的 " .nc " 文件。 如果你想这样做,就做其中一种选择:

* 使用(OPeN)DAP用户端软件,可以连接到由 ERDDAP 。 。 。 。 就是这样 DAP   (并由此而来 ERDDAP ) 被设计。 它非常有效。
* 或者,下载源文件 (编号) 从 "files" 系统 (或通过一个 .nc ? 。 。 。 查询) 到你的电脑上 使用netcdf -java, Ferret ,或者其他一些 NetCDF 要读取的客户端软件 (现在) 本地文件 (编号) 。 。 。 。
         
#### 缓存文件信息{#cached-file-information} 
当 EDDGrid 从 Files 数据集首先装入, EDDGrid 从 Files 读取所有相关文件中的信息并创建表格 (每个文件一行) 包含每个有效文件和每个“坏”的信息 (不同或无效) 文档。
* 这些表格还存储在磁盘上,因为 NetCDF 页:1 .nc 文件在 *大家长会* /数据集/ *上一个 2 CharsOfDatasetID* 页:1 * datasetID * / 在命名的文件中 :
目录 .nc   (中包含一个唯一目录名称的列表) , (中文).
文件 图表 .nc   (以每个有效文件的信息保存表格) , (中文).
坏文件 .nc   (包含每个不良文件信息的表格) 。 。 。 。
* 以加快进入 EDDGrid 从 Files 数据集 (但牺牲了更多的记忆) ,可以使用 [&lt;文件目录( I) &gt; true&lt;/fileTable InMemory &gt;] (中文(简体) ). (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;档案集) 告诉 ERDDAP™ 保存文件信息表副本。
* 当 ERDDAP™ 关闭并重新启动:它保存 EDDGrid 从 Files 从需要重读所有的数据文件开始 。
* 当重新装入数据集时, ERDDAP™ 只需读取已更改的新文件和文件中的数据。
* 如果一个文件的结构与其他文件不同 (例如,一个变量的数据类型不同,或者一个值不同 " [单位](#units) " 属性) , (中文). ERDDAP 将文件添加到"坏"文件列表中. 有关文件问题的信息将写入 *大家长会* /logs/log.txt文件 (中文(简体) ).
* 你不需要删掉这些文件 也不必用这些文件 一个例外是: 如果您仍在修改一个数据集的 datasets.xml 设置, 您可能想要删除这些文件以强制 ERDDAP™ 以重新读取所有文件,因为文件会被不同的读取/解释。 如果您真的需要删除这些文件, 您可以在 ERDDAP™ 正在运行。 (然后设置一个 [旗帜](/docs/server-admin/additional-information#set-dataset-flag) 以便尽快重新装入数据集。) 不过, ERDDAP™ 通常注意到: datasets.xml 信息与文件不符 表格信息并自动删除文件表格。
* 如果你想鼓励 ERDDAP™ 以更新存储的数据集信息 (例如,如果您只是在数据集的数据目录中添加、删除或更改一些文件) ,使用 [旗帜系统](/docs/server-admin/additional-information#flag) 强制 ERDDAP™ 以更新缓存文件信息。
         
#### 处理请求{#handling-requests} 
当处理客户的数据请求时, EDDGrid 从Files可以快速地在表格中查找有效的文件信息,以查看哪些文件有所要求的数据.
     
#### 更新缓存文件信息{#updating-the-cached-file-information} 
每当重新装入数据集时,都会更新缓存的文件信息.
    
* 数据集定期重新装入,由&lt;重新装入 EveryNiminutes &gt; 中的数据集信息 datasets.xml 。 。 。 。
* 任何时间都尽快重新装入数据集 ERDDAP™ 检测到您添加,删除, [抚摸'd](https://en.wikipedia.org/wiki/Touch_(Unix) 页:1 (更改文件的最后一个 修改时间) ,或更改数据文件。
* 如果您使用该数据集, 将尽快重新装入该数据集 [旗帜系统](/docs/server-admin/additional-information#flag) 。 。 。 。

当重新装入数据集时, ERDDAP™ 比较当前可用的文件到缓存的文件信息表。 读取新文件并添加到有效文件表中. 已不存在的文件从有效的文件表格中丢弃 。 文件时间戳已更改的文件会被读取并更新其信息. 新表格取代了旧表格的内存和磁盘。
     
#### 错误文件{#bad-files} 
错误文件表和文件被宣布错误的原因 (文件损坏, 变量缺失等 。) 已发送到电子邮件 所有的东西 到电子邮件地址 (也许是你) 每次重新装入数据集时. 您应该尽快替换或修复这些文件 。
     
#### 缺少变量{#missing-variables} 
如果一些文件没有 dataVariable s 在数据集中定义 datasets.xml 块,没关系。 何时 EDDGrid 从 Files 读取其中之一的文件, 它将像文件有变量一样发挥作用, 但有所有缺失的值 。
     
#### FTP 问题/咨询{#ftp-troubleadvice} 
如果您是 FTP 新的数据文件到 ERDDAP™ 服务器时 ERDDAP™ 正在运行, 有可能 ERDDAP™ 将在FTP过程中重新装入数据集。 这种事发生得比你想象的还频繁&#33; 如果发生这种情况, 文件将会显得有效 (它有一个有效的名称) ,但该文件尚未有效。 若为 ERDDAP™ 尝试从该无效文件读取数据,因此产生的错误将导致文件被添加到无效文件的表格中。 这可不妙 为了避免这个问题, 在 FTP 处理文件时使用临时文件名, 例如 ABC2005 .nc XQTEMP. 然后, 文件Name Regex 测试 (见下文) 将显示这不是一个相关的文件。 FTP进程完成后,将文件重命名为正确的名称. 重命名过程会让文件在瞬间变得相关.
     
#### "0档案" 错误消息{#0-files-error-message-1} 
如果你运行 [生成 DatasetsXml](#generatedatasetsxml) 或 [达斯德](#dasdds) ,或者如果你试图加载一个 EDDGrid 发件人... ERDDAP™ ,然后得到“0文件”错误消息,表明 ERDDAP™ 在目录中找到 0 匹配文件 (当你认为目录中有匹配的文件时) 数字 :
    * 检查文件是否真的在目录中 。
    * 检查目录名称的拼写.
    * 检查文件Name Regex. 它真的,真的很容易 犯错误与regexes。 为测试目的, 请尝试符合所有文件名的 regex 。 (看这个 [正则文档](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) 和 [regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) 。 。 。 。) 
    * 检查运行程序的用户 (例如,用户=tomcat (? 。 。 。) 用于托姆卡特/ ERDDAP ) 拥有这些文件的“ read” 权限 。
    * 在一些操作系统中 (例如, SELinux) 并取决于系统设置,运行程序的用户必须拥有"读取"权限,以获得通往拥有文件的目录的整个目录.
         
####  EDDGrid 从档案骨架 XML 数据{#eddgridfromfiles-skeleton-xml} 
*    **骨架 XML** 向所有人开放 EDDGrid 从Files子类为:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD* 来自音频文件夹{#eddfromaudiofiles} 
 ** EDDGrid 从AudioFiles 调用** 和 **来自音频文件夹的 EDD 表格** 本地音频文件集合数据 。 (这些最早出现于 ERDDAP™ v1.82 (英语).) 区别在于 EDDGrid 从AudioFiles将数据视为一个多维数据集 (通常有2维: \\[ 文件开始 时间 \\] 和 \\[ 已过期 文件内的时间 \\] ) ,而EDD Table FromAudioFiles将数据作为表格数据处理 (通常为文件启动设置列 时间,文件的通过时间,以及音频频道的数据) 。 。 。 。 EDDGrid 从AudioFiles中需要所有文件的样本数量相同,所以如果这不是真的,则必须使用EDDTable FromAudioFiles. 否则,选择哪一种EDD类型完全由你来选择. EDDTable FromAudioFiles的一个优点是:你可以与其他信息一起添加其他变量,例如, stationID 台词 在这两种情况下,由于缺乏统一的时间变量,更难使用这些EDD类型的数据,但是没有建立统一的时间变量的好办法.

看这些阶级的超级阶级 [ EDDGrid 从文件](#eddgridfromfiles) 和 [来自文件的 EDD 表格](#eddtablefromfiles) ,以了解该类如何运作和如何使用。

我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 由于音频文件除了与声音数据编码有关的信息之外,没有其他元数据,所以您必须编辑来自GenerateDatasets的输出 Xml 提供重要信息 (例如,标题、摘要、 creator\\_name 机构、历史) 。 。 。 。

细节 :

* 音频文件格式很多. 目前, ERDDAP™ 可以读取大多数.wav和.au文件中的数据。 它目前无法读取其他类型的音频文件,例如.aiff或.mp3. 如果您需要支持其它的音频文件格式或.wav和.au的其他变体,请通过电子邮件向Chris提出请求. 约翰在Noaa.gov。 或者,作为你现在可以使用的工作, 你可以将您的音频文件转换成PCMQQ 签字 (用于整数数据) 或 PCM +FLOAT 软件 (用于浮点数据) .wav 文件这样 ERDDAP™ 可以和他们一起工作。
* 目前, ERDDAP™ 可以用什么读取音频文件 Java PCMQFLOAT、PCMXSIGNED、PCMXUNSIGNED、ALAW、ULAW编码。 ERDDAP™ 转换 PCMQUNSIGNED 值 (例如,0至255) 输入已签名值 (例如, -128至128) 通过重排数据值中的位数。 ERDDAP™ 将原编码字节格式中的 ALAW 和 ULAW 转换为短 (单位16) 数值。 从 Java 想要大恩迪安的真数据, ERDDAP™ 重新安排用 BigEndian=false 存储的数据字节 (小小的异种) 以正确读取数值。 其他编码 (PCM 移动) , (中文). ERDDAP™ 按原样读取数据。
* 何时 ERDDAP™ 从音频文件读取数据,它将文件可用的音频元数据转换成全局属性. 这将永远包括 (显示样本值) 
    
字符串音频BigEndian "假"; // 真实或虚假
内置音频 1频道;
字符串音频编码“PCMQSIGNED”;
浮动音频FrameRate 96000.0; //每秒
int 音频FrameSize 2; //# 每个帧的数据字节
浮式音频样本 96000.0; //每秒
 int 音频SampleSize InBits 16; // # 每个频道每个样本的比特
    
对于 ERDDAP '目的,一个帧与一个样本是同义词,即一个时间点的数据.
属性在 ERDDAP™ 将获得描述源文件中的数据的信息。 ERDDAP™ 读取数据时会经常更改此内容, 例如 PCM\\ UNSIGNED, ALAW, 和 ULAW 编码数据转换为 PCM\\\ SIGNED, 而 bigEndians=假数据转换为 bigEndians=真数据 (就是这样 Java 想读它) 。 。 。 最后,数据值在 ERDDAP™ 永远是 [PCM 编码](https://en.wikipedia.org/wiki/Pulse-code_modulation) 数据值 (即声音波的简单数字化样本) 。 。 。 。
* 何时 ERDDAP™ 从音频文件读取数据,它读取整个文件. ERDDAP™ 每个通道可以读取大约20亿个样本。 例如,如果样本率是每秒44100个样本,那么20亿个样本就翻译为每个文件大约756分钟的音效数据. 如果您有超过这个数量的音频文件, 您需要将文件分割成小块, 以便 ERDDAP™ 可以读懂它们。
* 因为 ERDDAP™ 读取整个音频文件, ERDDAP™ 必须能够访问大量内存才能与大型音频文件一起工作. 见 [ ERDDAP 内存设置](/docs/server-admin/deploy-install#memory) 。 。 。 再说一遍,如果这是个问题,你现在可以做的就是把文件拆成小块,这样就可以了 ERDDAP™ 可以用更少的记忆读取它们.
* 一些音频文件被错误地写入. ERDDAP™ 为处理这类案件作出微小努力。 但总而言之,当有错误时, ERDDAP™ 将有一个例外, (拒绝该文件) 或 (如果错误无法检测) 读取数据 (但数据会不正确) 。 。 。 。
*    ERDDAP™ 不检查或更改音量。 理想的情况是,整数音频数据被缩放到使用数据类型的整个范围.
* 音频文件和音频播放器没有缺失值的系统 (例如,-999 或 Float.NaN) 。 。 。 所以音频数据不应该有任何缺失值. 如果缺少数值 (例如,如果需要加长音频文件) ,使用一系列0's 将被解释为完美的沉默。
* 何时 ERDDAP™ 从音频文件读取数据, 它总是创建一个叫做已过期的列 每个样本的时间为秒 (存储为双倍) ,相对于第一个样本 (指定已过期 时间=0.0s) 。 。 。 。 与 EDDGrid 从AudioFiles开始,它成为了经过时间轴变量.
*    EDDGrid From AudioFiles要求所有文件的样本数量相同. 所以如果不是这样的话,你必须使用EDDTable FromAudioFiles。
* 对于 EDDGrid 从AudioFiles,我们建议你设置&lt;维度值在记忆中 &gt;] (#二元价值模拟器) 改为虚假 (由 GenerateDatasets 推荐 。 xml 数据) ,因为时间维度往往具有大量的价值.
* 对于 EDDGrid 从AudioFiles,你几乎应该总是使用 EDDGrid 从Files系统获取 [通过 文件名称](#aggregation-via-file-names-or-global-metadata) 几乎总是通过提取录音的开始日期 来自文件名的时间 。 举例来说,
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
生成数据 Xml会鼓励和帮助你做到这一点。
* 对于EDDTable FromAudioFiles,你几乎应该总是使用EDDTable FromFiles系统,用于 [\\*\\*虚伪文件Name sourceName 编号](#filename-sourcenames) 从文件名中提取信息 (几乎总是开始日期 录音时间) 并宣传它成为一栏数据。 举例来说,
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
然后,时间格式应指定为单位属性:&lt;atname=“ 单位” &gt; yyyMMdd'\\_' HHmmss&lt;/att &gt; (单位:千美元)
     
###  EDDGrid 从MorgeIRFiles 调用{#eddgridfrommergeirfiles} 
 [ ** EDDGrid 从MorgeIRFiles 调用** ](#eddgridfrommergeirfiles) 汇总当地、 [合并](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) 文档,这些文档来自 [热带降雨量测量飞行任务 (热带) ](https://trmm.gsfc.nasa.gov) 这是美国航天局和日本宇宙航空研究开发机构的联合任务 (日本) 。 。 。 合并 IR 文件可以从 [美国航天局](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/) 。 。 。 。

 EDDGrid 从MorgeIRFiles.java写作, ERDDAP™ R.Tech工程公司的Jonathan Lafite和Philippe Makowski的项目 (许可证: 版权开源) 。 。 。 。

 EDDGrid 从MorgeIRFiles 来看,

*    EDDGrid 从MorgeIRFiles支持压缩或未压缩的源数据文件,任何组合,在同一数据集中. 例如,这使得您可以压缩很少访问的旧文件,但是不压缩经常访问的新文件. 或者,你可以改变压缩的类型 从原始。 以Z为例, .gz 。 。 。 。
* 如果您在同一目录中有相同数据文件的压缩和未压缩版本,请确保&lt;文件名Regex &gt; 用于您的数据集,匹配您想要匹配的文件名,而不匹配您不希望匹配的文件名。
* 未压缩的源数据文件必须没有文件扩展名 (即文件名中没有“.”) 。 。 。 。
* 压缩源数据文件必须有文件扩展名,但 ERDDAP™ 通过检查文件内容而不是查看文件的文件扩展名来确定压缩类型 (例如,“.Z”) 。 。 。 支持的压缩类型包括"gz","bzip2","xz","lzma","snappy-raw","snappy-framed","pack200"和"z". 何时 ERDDAP™ 读取压缩文件,它会解压于飞行,而不写入临时文件.
* 所有源数据文件必须使用原始文件命名系统:即:mergQQ *(YYYYMMDHHH) (YYYYMUMDHH) (英语).* QQ4km 像素 (地点 *(YYYYMMDHHH) (YYYYMUMDHH) (英语).* 表示与文件中的数据相关的时间) ,如果文件被压缩,则加上文件扩展名。

看这个班级的超级班级 [ EDDGrid 从文件](#eddgridfromfiles) ,以了解该类如何运作和如何使用。

我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 然后您可以编辑它来调谐它。
 
###  EDDGrid 从NcFiles调用{#eddgridfromncfiles} 
 [ ** EDDGrid 从NcFiles调用** ](#eddgridfromncfiles) 本地、网格、 [GRIB . grb和. grb2 (英语).](https://en.wikipedia.org/wiki/GRIB) 文档, [ HDF   (v4 或 v5 类型)   .hdf ](https://www.hdfgroup.org/) 文档, [ .nc 门L](#ncml-files) 文档, [ NetCDF   (v3 或 v4 类型)   .nc ](https://www.unidata.ucar.edu/software/netcdf/) 文件,和 [扎尔](https://github.com/zarr-developers/zarr-python) 文件 (第2.25号版本) 。 。 。 Zarr文件行为略有不同,需要文件NameRegex或路径Regex包含"zarr".

新建于 ERDDAP™ 2.29.0版本是对不支持所有轴变量的数据变量的实验支持 (或像有人在同一个数据集中称之为 1D 和 2D 数据) 。 。 。 请联系GitHub (讨论或议题) 有反馈和错误。

这与其他文件类型可能有效 (例如,BUFR) 我们只是还没有测试过 -- 请给我们一些样本文件。

* 对于GRIB文件, ERDDAP™ 将在其第一次读取每个 GRIB 文件时制作一个 .gbx 索引文件。 因此,GRIB文件必须在运行Tomcat的"用户"读取+write权限的目录中.
* 看这个班级的超级班级 [ EDDGrid 从文件](#eddgridfromfiles) ,用于了解这个班级是如何工作的以及如何使用.
* 开始 ERDDAP™ v2.12, (中文(简体) ). EDDGrid 从NcFiles和 EDDGrid 从NcFiles调用 未包装可读取“ 结构” 中的数据 。 .nc 经常预算: .hdf 4个档案。 要识别一个来自结构的变量,&lt; sourceName &gt; 翻译: 必须使用格式 : *完整结构Name*  |  *成员Name* ,例如组1/我的Struct | 我的成员。
* 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 然后您可以编辑它来调谐它。
    
#### Grided Nc 文件中的组{#groups-in-gridded-nc-files} 
     [Netcdf4文件可以包含组.](#groups-in-gridded-nc-files)   ERDDAP™ 仅仅从一个组的变量 和它所有母组的变量 来制作一个数据集。 您可以在 GenerateDatasets 中指定特定组名称 xml 数据 (省略后面的斜线) ,或使用“'”来生成 Datasets Xml 搜索所有使用最大维度的变量组,或使用 " \\[ 根号 \\] " 让GenerateDatasets在根组中寻找变量.
    
在您回答问题后, GenerateDatasetsXml 为这类数据集所做的第一件事就是打印样本文件的 ncdump 类结构。 因此,如果您通过 GenerateDatasets 输入第一个循环的几个愚蠢的答案 Xml,至少你会看到 ERDDAP™ 可读取文件,并查看文件中的尺寸和变量。 然后可以通过GenerateDatasetsXml为第二个循环给出更好的答案.
    

###  EDDGrid 从 NcFiles 未包装{#eddgridfromncfilesunpacked} 
 [ ** EDDGrid 从 NcFiles 未包装** ](#eddgridfromncfilesunpacked) 是一个变体,由 [ EDDGrid 从NcFiles调用](#eddgridfromncfiles) 用于汇总本地、网格数据 NetCDF   (v3 或 v4 类型)   .nc 和相关文件。 不同之处在于,此类在数据文件打开之前 EDDGrid 从 File 查看文件 :

* 它可以解开包含的变量 [ scale\\_factor 和(或) add\\_offset ](#scale_factor) 。 。 。 。
* 它能转换QQFillValue和 missing\\_value 数值为 NaN (或 MAX\\_VALUE 表示整数数据类型) 。 。 。 。
* 它将时间和时间戳值转换为 "seconds since 1970-01-01T00:00:00Z" 。 。 。 。

这个阶级的最大优势在于它提供了一种处理不同价值观的方法: scale\\_factor , (中文). add\\_offset 火药店, missing\\_value ,或集合中不同源文件中的时间单位。 否则你就得用一个工具 [NcML 数据](#ncml-files) 或 [ NCO ](#netcdf-operators-nco) 修改每个文件以删除差异,以便文件可以由 EDDGrid 从NcFiles。 为了使这一类能正常工作,文件必须遵循相关属性的CF标准.

* 如果尝试做一个 EDDGrid 从NcFiles调用 从您以前尝试过且未能使用的文件组中解包 EDDGrid 从NcFiles, cd 到
     *大家长会* /数据集/ *最后一个 2 信封* 页:1 * datasetID * 页:1
地点 *最后一个 2 信封* 表示为 datasetID , (中文).
并删除目录中的所有文件。
* 开始 ERDDAP™ v2.12, (中文(简体) ). EDDGrid 从NcFiles和 EDDGrid 从NcFiles调用 未包装可读取“ 结构” 中的数据 。 .nc 经常预算: .hdf 4个档案。 要识别一个来自结构的变量,&lt; sourceName &gt; 翻译: 必须使用格式 : *完整结构Name*  |  *成员Name* ,例如组1/我的Struct | 我的成员。
* 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 然后您可以编辑它来调谐它。
    
Netcdf4文件可以包含组. 见 [本文档](#groups-in-gridded-nc-files) 。 。 。 。
    
在您回答问题后, 生成 DatasetXml 对此类数据集的第一件事就是打印样本文件的 ncdump 结构 **在此之前** 已经拆了 因此,如果您通过 GenerateDatasets 输入第一个循环的几个愚蠢的答案 Xml,至少你会看到 ERDDAP™ 可读取文件,并查看文件中的尺寸和变量。 然后可以通过GenerateDatasetsXml为第二个循环给出更好的答案.
    
###  EDDGrid 龙PM180{#eddgridlonpm180} 
 [ ** EDDGrid 龙PM180** ](#eddgridlonpm180) 修改儿童的经度值 (附录)   EDDGrid 某些经度值大于180的数据集 (例如,0至360) 以便他们在180至180之间; (经度加号或减号180,因此名称) 。 。 。 。

* 这使经度值大于180的数据集符合/符合 OGC 服务 (比如说 WMS 服务器在 ERDDAP ) ,因为所有 OGC 服务需要经纬度值在 -180 至 180 之内。
* 接近不连续的工作会造成问题,无论不连续是在经度0还是经度180。 这个数据集类型通过提供两个版本的同一数据集,可以避免给每个人带来这些问题:
一个经度值在 0 到 360 之间 ("太平洋学生"?) , (中文).
一个经度值在 -180 至 180 之间 ("大西洋医学"?) 。 。 。 。
* 对于所有经度值均大于180的儿童数据集,所有新的经度值都只是降低360度. 例如,经度值为180至240的数据集将成为经度值为-180至-120的数据集。
* 用于具有全球经度值的儿童数据集 (大约0到360) ,新的经度值将被重新安排为 (大约) -180至180岁:
最初的0到近180个数值不变.
最初的180到360的值被转换为-180到0,并转向经度数组的起始.
* 对于超过180个但并不覆盖全球的儿童数据集, ERDDAP™ 根据需要插入缺失值,以制作覆盖全球的数据集。 例如,经度值为140至200的儿童数据集将成为经度值为-180至180的数据集。
儿童价值180至200将变为180至160。
新的经度值将从-160插入到140。 相应的数据值将是QQFillValues.
140至近180的儿童数值将保持不变。
缺失值的插入可能看起来很奇怪,但它避免了因经度值突然跳跃而引发的几个问题. (例如,从 -160 到 140) 。 。 。 。
* 内 [生成 DatasetsXml](#generatedatasetsxml) ,有一个特殊的"数据集类型", EDDGrid LonPM180 From ErddapCatalog, 让你生成 datasets.xml (单位:千美元) EDDGrid 每一集的LonPM180数据集 EDDGrid 数据集在一个 ERDDAP 其经度值大于180。 这有助于提供两个版本的数据集:
原值,经度值在 0 到 360 之间,
和新数据集,经度值介于 -180 至 180 之间。
    
每一数据库中的儿童数据集 EDDGrid LonPM180数据集将是一个 EDDGrid 从 Erddap 数据集指向原始数据集 。
新数据集的 datasetID 将会是原始数据集的名称加上“\\ LonPM180”。
举例来说,
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
拿着 EDDGrid LonPM180 数据集 **下级** 原始数据集在 datasets.xml 。 。 。 这避免了一些可能的问题。
    
或者,你可以替换 EDDGrid 从Erddap儿童数据集与原始数据集的 datasets.xml 。 。 。 然后,将只有一个版本的数据集:一个在 -180 至 180 内有经度值的数据集. 我们劝阻这一点,因为有时每个版本的数据集更方便。
    
* 如果提供两个版本的数据集,例如经度0至360和经度180:
    * 您可以使用可选 [&lt;无障碍 维亚 WMS &gt;虚假&lt;/可访问 维亚 WMS &gt;] (中文(简体) ). (# 一个无障碍的viawms) 用 0-360 数据集强制禁用 WMS 为该数据集提供服务。 然后,只有LonPM180版本的数据集才能通过 WMS 。 。 。 。
    * LonPM180数据集随着基础数据集的变化而不断更新,有几种方法:
        * 如果儿童数据集是 EDDGrid 从 Erddap 数据集中引用同一数据集 ERDDAP™ , LonPM180 数据集将尝试直接订阅基础数据集,使其始终是最新的. 直接订阅不会生成请求您验证订阅的电子邮件 - 验证应当自动进行.
        * 如果儿童数据集不是 EDDGrid 从相同的 Erddap 数据集 ERDDAP™ , LonPM180数据集将尝试使用常规订阅系统来订阅基础数据集. 如果你的订阅系统 ERDDAP™ 打开后,您应该收到电子邮件,请求您确认订阅内容 。 请便
        * 如果你的订阅系统 ERDDAP™ 关闭时,LonPM180数据集有时可能会有过时的元数据,直到LonPM180数据集重新装入. 因此,如果订阅系统被关闭,你应该设置[&lt;重新装入 –每分钟一次&gt;] (每分钟都装满) 将 LonPM180 数据集设定为数量较少的数据集,从而更有可能更快地捕捉到儿童数据集的变化。

* 对于最大经度 &gt; 360的数据集,使用以下可选配置设置最大值,数据集会被更正为-180至180.
```
    <maxSourceLon>540</maxSourceLon>
```

####  EDDGrid 龙PM180骨架 XML 数据{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid 龙0360{#eddgridlon0360} 
 [ ** EDDGrid 龙0360** ](#eddgridlon0360) 修改儿童的经度值 (附录)   EDDGrid 某些经度值小于 0 的数据集 (例如, -180至180) 让他们在0到360之间 (因此名称) 。 。 。 。

* 接近不连续的工作会造成问题,无论不连续是在经度0还是经度180。 这个数据集类型通过提供两个版本的同一数据集,可以避免给每个人带来这些问题:
一个经度值在 -180 至 180 之间 ("大西洋医学"?) 。 。 。 。
一个经度值在 0 到 360 之间 ("太平洋学生"?) , (中文).
* 对于所有经度值均小于0的儿童数据集,所有新的经度值都只是高出360度. 例如,经度值为-180至-120的数据集将成为经度值为180至240的数据集。
* 用于具有全球经度值的儿童数据集 (大约180到180) ,新的经度值将被重新安排为 (大约) 0 到 360 个 :
原始的 -180 到 0 值转换为 180 到 360 ,并转移到经度数组的末尾.
最初的0到近180个数值不变.
* 对于跨越lon=0但不能覆盖全球的儿童数据集, ERDDAP™ 根据需要插入缺失值,以制作覆盖全球的数据集。 例如,经度值为-40至-20的儿童数据集将成为经度值为0至360的数据集。
0至20的儿童数值不变。
新的经度值将从20插入到320。 相应的数据值将是QQFillValues.
儿童值为-40至0,将变为320至360。
缺失值的插入可能看起来很奇怪,但它避免了因经度值突然跳跃而引发的几个问题. (例如,从20岁到320岁) 。 。 。 。
* 内 [生成 DatasetsXml](#generatedatasetsxml) ,有一个特殊的"数据集类型", EDDGrid Lon0360 从 ErddapCatalog, 允许您生成 datasets.xml (单位:千美元) EDDGrid Lon0360 各集的数据集 EDDGrid 数据集在一个 ERDDAP 其经度值大于180。 这有助于提供两个版本的数据集:
原值,经度值在 0 到 360 之间,
和新数据集,经度值介于 -180 至 180 之间。
    
每一数据库中的儿童数据集 EDDGrid Lon0360数据集将是一个 EDDGrid 从 Erddap 数据集指向原始数据集 。
新数据集的 datasetID 将会是原始数据集加上"QQLon0360"的名称.
举例来说,
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
拿着 EDDGrid Lon0360 数据集 **下级** 原始数据集在 datasets.xml 。 。 。 这避免了一些可能的问题。
    
或者,你可以替换 EDDGrid 从Erddap儿童数据集与原始数据集的 datasets.xml 。 。 。 然后,将只有一个版本的数据集:一个经度值在0到360范围内的数据集. 我们劝阻这一点,因为有时每个版本的数据集更方便。
    
* 如果提供两个版本的数据集,例如经度0至360和经度180:
    * 您可以使用可选 [&lt;无障碍 维亚 WMS &gt;虚假&lt;/可访问 维亚 WMS &gt;] (中文(简体) ). (# 一个无障碍的viawms) 使用 0 到 360 数据集强制禁用 WMS 为该数据集提供服务。 然后,只有 -180-180 版本的数据集才能通过 WMS 。 。 。 。
    * Lon0360数据集随着基础数据集的改变而不断更新,有几种方法:
        * 如果儿童数据集是 EDDGrid 从 Erddap 数据集中引用同一数据集 ERDDAP™ , Lon0360 数据集将尝试直接订阅基础数据集,以便始终更新. 直接订阅不会生成请求您验证订阅的电子邮件 - 验证应当自动进行.
        * 如果儿童数据集不是 EDDGrid 从相同的 Erddap 数据集 ERDDAP™ ,Lon0360数据集将尝试使用常规订阅系统来订阅基础数据集. 如果你的订阅系统 ERDDAP™ 打开后,您应该收到电子邮件,请求您确认订阅内容 。 请便
        * 如果你的订阅系统 ERDDAP™ 关闭后,Lon0360数据集有时可能会有过时的元数据,直到Lon0360数据集重新装入. 因此,如果订阅系统被关闭,你应该设置[&lt;重新装入 –每分钟一次&gt;] (每分钟都装满) 将 Lon0360 数据集设定为数量较少的数据集,从而更有可能更快地捕捉到儿童数据集的变化。
####  EDDGrid 龙0360骨架 XML 数据{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid 侧边线{#eddgridsidebyside} 
 [ ** EDDGrid 侧边线** ](#eddgridsidebyside) 两个或两个以上 EDDGrid 数据集 (儿童) 并肩作战

* 由此产生的数据集包含所有儿童数据集的所有变量。
* 父数据集和所有的孩子数据集 MUST 不同 datasetID 编号 如果家族中的任何名字完全相同,数据集将无法加载 (错误消息显示集合轴的值没有排序顺序) 。 。 。 。
* 所有儿童都必须具备相同的源值。 axisVariable 编号 \\[ 1个+ \\]   (例如,纬度,经度) 。 。 。 测试的精度由 [匹配轴线](#matchaxisndigits) 。 。 。 。
* 这些儿童可能有不同的来源价值。 axisVariable 编号 \\[ 0 个 \\]   (例如,时间) 但它们通常是相同的。
* 母数据集似乎拥有全部 axisVariable 编号 \\[ 0 个 \\] 所有孩子的源值。
* 例如,这使得您可以将一个源数据集与一个矢量的u组件和另一个源数据集与一个矢量的v组件合并,从而可以服务于合并的数据.
* 通过这种方法创造的儿童是私下关押的。 它们不是单独的数据集 (例如,通过客户数据请求或 [旗帜文件](/docs/server-admin/additional-information#flag) ) 。 。 。 。
* 父母的全球元数据和设置来自第一个孩子的全球元数据和设置。
* 如果创建第一个孩子时有例外,则不会创建父母。
* 如果创建其他孩子时有例外, 这将发送电子邮件给 Everything To (一、导 言 [设置. xml](/docs/server-admin/deploy-install#setupxml) ) 继续跟其他孩子在一起
####  EDDGrid 侧边骨架 XML 数据{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid 总计{#eddgridaggregateexistingdimension} 
 [ ** EDDGrid 总计** ](#eddgridaggregateexistingdimension) 两个或两个以上 EDDGrid 数据集,每个数据集对第一个维度有不同的值范围,但对其他维度有相同的值。

* 例如,一个儿童数据集可能有366个值。 ((单位:千美元)) 对于时间维度,另一个孩子可能有365个值 ((单位:千美元)) 对于时间维度。
* 所有其他方面的价值 (例如,纬度,经度) 所有儿童都必须相同。 测试的精度由 [匹配轴线](#matchaxisndigits) 。 。 。 。
* 排序的维度值 - 每个维度的值按顺序排序 (上升或下降) 。 。 。 值可以不规则地间隔. 没有联系 这是法院的一项要求。 [CF 元数据标准](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 。 。 。 如果任何维度的值没有排序顺序,数据集将不会被加载,并且 ERDDAP™ 将识别日志文件中的第一个未排序的值, *大家长会* /logs/log.txt (英语).
    
未排序的维度值几乎总是表示源数据集存在问题. 最常见的情况是在集合中包含一个错误名称或不适当的文件,从而导致一个不排序的时间维度. 要解决这个问题,请在 ERDDAP™ 查找违法时间值的log.txt文件 。 然后在源文件中查找相应的文件 (之前或之后一个) 这不属于集合。
    
* 父数据集和子数据集 MUST 不同 datasetID 编号 如果家族中的任何名字完全相同,数据集将无法加载 (错误消息显示集合轴的值没有排序顺序) 。 。 。 。
* 目前,儿童数据集必须是 EDDGrid 从 Dap 数据集和 MUST 中汇总维度的最低值 (通常最古老的时间值) 。 。 。 所有其他儿童都必须是几乎相同的数据集 (第一个维度的数值不同) 并被指定 sourceUrl 。 。 。 。
* 集合数据集从第一个子获得它的元数据.
* 那个 [生成数据 Xml 程序](#generatedatasetsxml) 可以做一个粗略的草稿 datasets.xml 用于 EDDGrid 根据某单位所服务的文件集汇总汇总索引 Hyrax 或者THREDDS服务器。 例如,在程序中使用此输入 (URL中的“ 1988 ” 使示例运行得更快) 数字 :
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
你可以使用结果&lt; sourceUrl &gt; 标记或删除这些标记并取消注释&lt; sourceUrl &gt; tag(这样每次重新装入数据集时都会注意到新文件).
####  EDDGrid 综合差异骨架 XML 数据{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid 复制{#eddgridcopy} 
 [ ** EDDGrid 复制** ](#eddgridcopy) 制作并维护另一个的本地副本 EDDGrid 本地副本中的数据和服务。

*    EDDGrid 复制 (对于表格数据, [EDD 表格复制](#eddtablecopy) ) 非常容易使用,而且非常有效
     **解决远程数据源数据服务的一些最大问题:** 
    * 从远程数据源获取数据可能很慢.
        * 可能很慢,因为它本来就很慢 (例如,无效的服务器类型) , (中文).
        * 因为它被太多的要求所淹没,
        * 或者因为您的服务器或远程服务器带宽有限。
    * 远程数据集有时无法使用 (同样,出于各种原因) 。 。 。 。
    * 依赖一个数据来源,不能很好地衡量 (例如,许多用户和许多 ERDDAP 使用它 使用它) 。 。 。 。
         
* 如何运作 -- EDDGrid 复制通过自动制作和维护本地的数据副本和从本地副本提供的数据来解决这些问题. ERDDAP™ 可以非常非常非常迅速地提供本地副本中的数据. 而制作本地拷贝可以减轻远程服务器的负担. 而本地副本是原作的备份,在原作发生意外时有用.
    
在本地复制一个数据集方面没有任何新情况。 新的是这个班级能办到\\*简单\\*创建和\\*维护\\*本地数据副本\\*变量\\*各类远程数据源和\\*添加元数据\\*在复制数据时。
    
* 数据块 -- EDDGrid 通过请求远程数据块来复制本地数据&lt;数据集 &gt; 。 最左边的每个值都会有一个块 (第一个) 轴变量。 EDDGrid 复制不依靠远程数据集的索引编号来表示轴线——这些可能改变.
    
警告:如果一个数据块的大小如此之大 (&gt; 翻译: 2GB 常规) 导致问题, EDDGrid 复制无法使用. (抱歉,我们希望今后能够解决这个问题。) 
    
*    \\[ 替代 EDDGrid 复制 -
如果远程数据是通过可下载文件而不是网络服务提供的,则使用 [缓存 从Url 选项 EDDGrid 从文件](#cachefromurl) ,它使远程文件的本地拷贝并服务于本地文件的数据。 \\] 
* 本地文件 - 每一块数据分别储存在 NetCDF 文件的子目录 *大家长会* /副本/ * datasetID * 页:1 (一、导 言 [设置. xml](/docs/server-admin/deploy-install#setupxml) ) 。 。 。 从轴值创建的文件名被修改, 使其安全文件名 (例如,连字符被“ x2D” 取代) 这不影响实际数据。
     
* 新建数据 - —— - 说 每次都这样 EDDGrid 复制已重新装入, 它检查远程&lt;数据集 &gt; 以查看可用的块。 如果一个数据块的文件已经不存在,则请求获取该块会被添加到队列中. ERDDAP 任务Thread 处理所有排队的数据块请求, 逐个处理 。 您可以看到关于任务Thread活动的统计数据 。 [状况 页次](/docs/server-admin/additional-information#status-page) 和在 [每日报告](/docs/server-admin/additional-information#daily-report) 。 。 。 。 (对 ERDDAP™ 可以为此进程分配多个任务, 但是这将使用许多远程数据源的带宽、内存和 CPU 时间, 以及很多本地 ERDDAP 带宽、内存和CPU时间,都不是好主意。) 
    
注:第一次 EDDGrid 复制已装入 (如果一切顺利) 任务Thread 的队列中会添加很多对块数据的请求, 但是没有创建本地数据文件 。 因此构造器将失败, 但任务Thread将继续工作并创建本地文件 。 如果一切顺利, 任务Thread 将制作一些本地数据文件, 并进行下一次重新装入数据集的尝试 (15分钟后) 将会成功,但一开始数据非常有限。
    
注:在本地数据集获得一些数据并出现在您 ERDDAP ,如果远程数据集暂时或永久无法访问,则本地数据集仍将有效。
    
警告: 如果远程数据集是大型的和/或远程服务器是慢的 (这就是问题所在,不是吗?) ,需要很长时间才能制作完整的本地副本。 在某些情况下,所需时间是不可接受的。 例如,通过T1线传输1 TB 数据 (0.15 GB/s (单位:千兆克)) 在最佳条件下至少需要60天。 此外,它还在远程和本地计算机上使用了大量的带宽,内存和CPU时间. 解决方案是将一个硬盘寄给远程数据集的管理员,这样 s/他就可以制作一个数据集的副本,并将硬盘寄回给您. 将这些数据用作起点, EDDGrid 复制会增加数据。 (就是这样 [亚马逊EC2云服务](https://aws.amazon.com/importexport/) 处理问题,即使他们的系统有很多带宽。) 
    
警告: 如果最左边的某个值 (第一个) 轴变量从远程数据集消失, EDDGrid 复制不删除本地复制的文件 。 欲者可自删.
    
#### 网格复制检查来源 数据{#grid-copy-checksourcedata} 
那个 datasets.xml 用于此数据集的可选标签
```
    <checkSourceData>true</checkSourceData>  
```
默认值为真 。 如果/当你将其设定为虚假时,数据集将永远不会检查源数据集,以查看是否有其他可用的数据.

#### 仅自{#onlysince} 
你看得出来 EDDGrid 通过在表单中添加标记来复制源数据集的子集,而不是整个源数据集&lt;仅自 &gt; *有点 数值* &lt;/只有Since&gt; 到数据集的 datasets.xml 块。 EDDGrid 复制将只下载与第一个维度值相关的数据值 (通常时间维度) 大于 *有点 数值* 。 。 。 。 *有点 数值* 可以是:
    * 通过下列方式指定的相对时间: now-  *n 单位* 。 。 。 。
举例来说,&lt;仅自 &gt; now- 两年&lt;/ onlySince &gt; 告诉数据集只为外部维度值的数据提供本地副本 (通常时间值) 最近两年内 (每次重新装入数据集时都会重新评价它,即当它寻找复制的新数据时) 。 。 。 。 见 [ now-  *n 单位* 语法描述](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) 。 。 。 如果第一个维度有时间数据,这是有用的,通常是时间数据。
        
         EDDGrid 复制不会删除本地数据文件,这些本地数据文件的数据会随着时间推移变得比 now-  *n 单位* 。 。 。 如果您愿意, 你可以随时删除这些文件 。 如果你这样做,我们强烈建议你设置一个 [旗帜](/docs/server-admin/additional-information#flag) 删除要告诉的文件后 EDDGrid 复制以更新缓存文件列表 。
        
    * 作为 ISO 8601 字符串指定的固定时间点 yyyy-MM-ddTHH:mm:ssZ 。 。 。 。
举例来说,&lt;仅自2000-01-01T00:00Z&lt;/只有Since&gt;只告诉数据集在第一个维度值为QQ2000-01-01T00:00Z. 如果第一个维度有时间数据,这是有用的,通常是时间数据。
         
    * 浮点数.
举例来说,&lt;仅自 &gt; 9466848000.&lt;/只从此. 这些单位将是第一维的目的地单位。 例如,对于时间维度来说, ERDDAP™ 总是 "seconds since 1970-01-01T00:00:00Z" 。 。 。 。 因此,946684800.0 (英语). "seconds since 1970-01-01T00:00:00Z" 相当于2000-01-01T00:00Z. 这始终是一个有用的选择,但是在第一个维度没有时间数据时特别有用.

####  EDDGrid 复制推荐使用{#eddgridcopy-recomended-use} 
1. 创建&lt;数据集 &gt; 条目 (本地类型,而非 EDDGrid 复制) 用于远程数据源。
     **让它正确运作,包括所有想要的元数据.** 
2. 如果速度太慢,请添加 XML 代码, 将其包裹在 EDDGrid 复制数据集。
    * 使用不同的语言 datasetID   (也许通过改变 datasetID 老年人 datasetID 一点点) 。 。 。 。
    * 复制&lt;无障碍 改为 &gt;,&lt;重新装入 EveryNminutes &gt; 和&lt;更改从远程 EDDGrid 'XML 到 EDDGrid 复制的XML。 (他们的价值观 EDDGrid 复制物质;它们对于内置数据集的值变得无关紧要.) 
3.   ERDDAP™ 将制作并维护当地的数据副本。
         
* 警报: EDDGrid 复制假设每个块的数据值永远不变. 如果/当它们出现时,您需要手动删除块文件 *大家长会* /副本/ * datasetID * 改变和 [旗帜](/docs/server-admin/additional-information#flag) 要重新装入的数据集将替换已删除的块。 如果您对数据集有电子邮件订阅, 您将得到两个电子邮件: 一个是数据集第一次重新装入并开始复制数据, 另一个是再次装入数据集 (自动) 并检测新的本地数据文件。
     
* 所有轴值必须平等。
除了最左边的斧头 (第一个) 所有价值观都必须对所有儿童平等。 测试的精度由 [匹配轴线](#matchaxisndigits) 。 。 。 。
     
* 设置、元数据、变量 -- EDDGrid 复制使用从封装的源数据集中的设置,元数据和变量.
     
* 更改元数据 - —— - 说 如果您需要改变任何 addAttributes 或更改与源数据集相关的变量的顺序:
    1. 改变 addAttributes 用于源数据集 datasets.xml 根据需要。
    2. 删除复制的文件之一 。
    3. 设定 [旗帜](/docs/server-admin/additional-information#flag) 要立即重新装入数据集。 如果您确实使用一个旗子,而且您对数据集有电子邮件订阅,您将获得两个电子邮件:一个是数据集第一次重新装入并开始复制数据,另一个是再次装入数据集时 (自动) 并检测新的本地数据文件。
    4. 删除的文件将随着新的元数据重新生成 。 如果源数据集永远无法使用,则 EDDGrid 复制数据集会从重生成的文件中获得元数据,因为它是最年轻的文件.
####  EDDGrid 复制骨架 XML 数据{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### 来自卡桑德拉的EDD表{#eddtablefromcassandra} 
 [ **来自卡桑德拉的EDD表** ](#eddtablefromcassandra) 处理一个数据 [卡桑德拉岛](https://cassandra.apache.org/) 表单。 卡珊德拉是一个无SQL数据库.

*    ERDDAP™ 能够与 Cassandra v2 和 v3 一起工作,在设置上没有变化或差异. 我们已经测试过 [卡珊德拉 v2 和 v3 从 阿帕奇语Name](https://cassandra.apache.org/download/) 。 。 。 。 很可能是这样的 ERDDAP™ 也可以与DataStax下载的卡桑德拉合作.
     
* 2019年8月 - 2021年5月,我们很难让卡珊德拉与领养OpenJdk合作. Java v8. 它投出了一个例外的X射线。 但现在 (2021年5月 (中文(简体) ).) ,该问题已经消失:我们可以成功使用 Cassandra v2.1.22 和 AppoenJdk jdk8u292-b10。
     
#### 一个表格{#one-table} 
卡桑德拉不支持关系数据库那样的"joins". 一个 ERDDAP™ EDD Table FromCassandra 数据集地图为 1 (也许是一个子集) 卡桑德拉桌(英语:Cassandra).

#### 卡桑德拉岛 datasets.xml  {#cassandra-datasetsxml} 
*    ERDDAP™ 带着卡珊德拉号来 Java 驱动程序,所以不需要单独安装.
* 仔细阅读本文关于EDDTable FromCassandra的所有信息. 一些细节非常重要。
* 卡桑德拉号 Java 司机打算和Apache Cassandra合作 (1.2+ (单位:千美元)) 和数据税企业 (3.1+ (韩语)) 。 。 。 如果您使用 Apache Cassandra 1.2.x, 您必须编辑每个节点的 cassandra. yaml 文件, 以设置 startQinativeQQ Transport: true, 然后重新启动每个节点 。
* 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 然后,你可以编辑它来细化它(特别是[&lt;分区 密钥來源名稱&gt; (# 分区密钥源名称) ) (中文(简体) ). 您可以通过联系卡珊德拉管理员和搜索网络来收集创建 EDTableFromCassandra 数据集所需的大多数信息 。
    
生成数据 Xml 对 EDTable FromCassandra 有两种特殊选项:
    
    1. 如果你输入"&#33; (没有引用) 对于密钥空间,程序将显示密钥空间列表
    2. 如果输入特定键位,然后输入“&#33;&#33;&#33;&#33;&#33;LIST&#33;” (没有引用) 对于表格名称,程序将显示该密钥空间及其列中的表格列表。
##### 案件敏感性{#case-sensitivity} 
* 对大小写不敏感的密钥空间和表格名称 -
Cassandra以对大小写不敏感的方式处理密钥空间和表格名称. 因此,你永远不要用保留词 (但情况不同) 作为 Cassandra 键空间或表格名称。
* 对大小写不敏感列名 -
默认情况下,卡桑德拉以对大小写不敏感的方式处理列名. 如果您使用 Cassandra 的保留词作为列名 (请不要&#33;) ,您必须使用
```
        <columnNameQuotes>"<columnNameQuotes>  
```
输入 datasets.xml 用于此数据集,以便 Cassandra 和 ERDDAP™ 将以区分大小写的方式处理列名。 这对你来说可能是一个巨大的头痛,因为很难确定列名的对大小写敏感的版本——卡珊德拉几乎总是将列名作为所有小写显示,无论真实情况如何.
* 与可能具有相关经验的卡桑德拉管理员密切合作. 如果数据集无法装入,请读取 [错误消息](#troubleshooting-tips) 仔细找出原因
         
#### 卡桑德拉岛&lt;连接 属性( G){#cassandra-connectionproperty} 
Cassandra 有连接属性,可在 datasets.xml 。 。 。 其中许多会影响卡珊德拉的性能 ERDDAP™ 连接。 不幸的是,卡珊德拉的属性必须按程序设置 Java 这样 ERDDAP™ 每个属性必须有代码 ERDDAP™ 支持 。 目前, ERDDAP™ 支持这些属性 :
 (显示的默认就是我们看到的。 你的系统默认值可能不同) 

*    **常规选项**   
    &lt;连接 财产名称=". **压缩** " &gt; *无 | LZ4 坐标 | 简单* &lt;/连接 属性 &gt; (不区分大小写, 默认值=无)   
     (一般压缩建议:如果卡桑德拉和 ERDDAP™ 是本地/快速的,如果连接是远程/慢的,则使用“LZ4”。)   
    &lt;连接 财产名称=". **全权证书** " &gt; *用户名/密码* &lt;/连接 属性 &gt; (这是文字 '/' )   
    &lt;连接 财产名称=". **计量** " &gt; *真实 | 虚假* &lt;/连接 属性 &gt; (2021-01-25 是默认=真实, 现在被忽略,总是虚假)   
    &lt;连接 财产名称=". **端口** " &gt; *整数* &lt;/连接 属性 &gt; (本地二进制协议默认值=9042)   
    &lt;连接 财产名称=". **静** " &gt; *真实 | 虚假* &lt;/连接 属性 &gt; (默认=虚假)   
     (我的快速尝试使用sl失败。 如果你成功,请告诉我你怎么做到的。) 
*    **查询选项**   
    &lt;连接 财产名称=". **一致性 职等** " &gt; *全部 | 任何 | 法定人数 | 本地( 1) | 当地法定人数 | 本地线性 | 一个 | 法定人数 | 序列 | 3个 | 两个* &lt;/连接 属性 &gt; (不区分大小写, 默认值=ONE)   
    &lt;连接 财产名称=". **获取Size** " &gt; *整数* &lt;/连接 属性 &gt; (默认=5000)   
     (不要设置获取Size到较小的值 。)   
    &lt;连接 财产名称=". **序列一致性级别** " &gt; *全部 | 任何 | 法定人数 | 本地( 1) | 当地法定人数 | 本地线性 | 一个 | 法定人数 | 序列 | 3个 | 两个* &lt;/连接 属性 &gt; (不区分大小写,默认值=SERIAL) 
*    **套接字选项**   
    &lt;连接 财产名称=". **连接TimeoutMillis** " &gt; *整数* &lt;/连接 属性 &gt; (默认=5000)   
     (不设置连接 超时Millis的数值较小.)   
    &lt;连接 财产名称=". **保留Alive** " &gt; *真实 | 虚假* &lt;/连接 属性 &gt;
    &lt;连接 财产名称=". **读取 TimeoutMillis** " &gt; *整数* &lt;/连接 属性 &gt;
     (卡珊德拉的默认读数是12000,但是 ERDDAP™ 将默认值改为120 000。 如果Cassandra正在推出读取时间,增加读取时间可能无济于事,因为Cassandra有时会在这个时候之前推出读取时间. 问题更可能是每个分区存储过多的数据 钥匙组合。)   
    &lt;连接 财产名称=". **收到缓冲大小** " &gt; *整数* &lt;/连接 属性 &gt;
     (目前尚不清楚默认接收的Buffersize是什么. 别设为小值.)   
    &lt;连接 财产名称=". **铃声** " &gt; *整数* &lt;/连接 属性 &gt;
    &lt;连接 财产名称=". **tcp 无延迟** " &gt; *真实 | 虚假* &lt;/连接 属性 &gt; (默认=无效) 

如果您需要设置其它连接属性, 请见 our [关于获得额外支助的章节](/docs/intro#support) 。 。 。 。

对于给定的Tomcat启动,连接Properties只在第一次为给定的Cassandra URL创建数据集时才使用. 所有重新装入该数据集和所有随后共享同一URL的数据集将使用这些原始连接Properties.
    
#### CQL 数据{#cql} 
卡桑德拉查询语言 (CQL 数据) 表面类似于SQL,即传统数据库使用的查询语言. 因为 OPeNDAP 表格数据请求旨在模仿SQL表格数据请求,有可能 ERDDAP™ 将表格数据请求转换为 CQL 约束/准备声明。 ERDDAP™ 将语句记录在 [日志.txt](/docs/server-admin/additional-information#log) 作为
作为文本的语句 : *声明文本*   
您看到的语句版本将是该语句的文字表述,只有“?” 才会将约束值放在其中。
       
没那么简单... 不幸的是,CQL有许多限制,可以对哪些类型的限制进行查询,例如,分区键列可以用=和IN来限制,所以 ERDDAP™ 向卡桑德拉发送一些限制,并在从卡桑德拉收到数据后应用所有限制. 帮忙 ERDDAP™ 高效处理卡桑德拉,您需要指定 [&lt;分区 密钥來源名稱&gt; (# 分区密钥源名称) ,[&lt;组图源名称&gt; (# 组列源名称) ,并 [&lt;索引 Column 源名 &gt; (#索引列源名称) 输入 datasets.xml 用于此数据集。 这些是最重要的帮助方式 ERDDAP™ 与卡珊德拉高效合作. 如果你不说 ERDDAP™ 此信息,数据集在 ERDDAP™ 并使用吨卡桑德拉资源。
     
#### &lt;分区 密钥源名( G){#partitionkeysourcenames} 
因为分区键在卡珊德拉表格中扮演中心角色, ERDDAP™ 需要知道他们 sourceName s,如果相关的话,关于如何与他们合作的其他信息。
* 您指定一个以逗号分隔的分区密钥源列名称列表 datasets.xml 通过&lt;分区 密钥來源名稱&gt;.
简单的例子,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
更复杂的例子,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* 时间戳分区键 - 如果分区键列之一是一个时间戳列,具有另一个时间戳列的剪切版本,请通过
     *分区 KeySourc Name/ 其它颜色来源Name time\\_precision *   
地点 time\\_precision 这是其中之一 [ time\\_precision ](#time_precision) 其它处使用的字符串 ERDDAP 。 。 。 。
尾随的Z time\\_precision 字符串是默认的,所以如果 time\\_precision 字符串是否以 Z 结尾 。
举例来说, ERDDAP™ 将解释日期/样本(1970-01-01) 对日期的限制可以通过使用这个来从对样本时间的限制中构建 time\\_precision """我们" 限制的实际转换更为复杂,但这就是概述。
     **相关时使用此功能.** 它能够 ERDDAP™ 与卡珊德拉高效合作. 如果列之间的这种关系存在于卡桑德拉表里 而你却不说 ERDDAP™ ,数据集将痛苦地缓慢在 ERDDAP™ 并使用吨卡桑德拉资源。
* 单身 值分区键 - 如果你想要一个 ERDDAP™ 数据集,用于只使用一个分区键的一个值的工作,指定 *分区Key 来源Name=值* 。 。 。 。
数字列不要使用引号, 例如 ubid=1007
对字符串列使用引文,例如 standid=“Point Pinos”
* 数据集默认排序顺序 -- 分区键的顺序&lt; dataVariable &gt; 输入 datasets.xml 确定 Cassandra 的结果的默认排序顺序。 当然,用户可以通过附加( C) 请求给定的一组结果另作排序( C) orderBy  (" , " *逗号变量列表* " , ") 以结束查询。
* 默认,卡珊德拉和 ERDDAP™ 用对大小写不敏感的方式处理列名。 但是如果你准备好了 [列名称](#case-sensitivity) 改为 " , ERDDAP™ 将以对大小写敏感的方式处理 Cassandra 列名。
         
#### &lt;分区 密钥CSV&gt;{#partitionkeycsv} 
如果这是指定的, ERDDAP™ 将使用它而不是要求卡珊德拉进行分区 每次重新装入数据集时都提供关键信息. 这提供了不同的分区密钥值列表,按其使用顺序排列. 时间必须指定为自1970-01-01T00:00Z以来的秒. 但也有两种特殊的替代方式来指定时间 (每个编码为字符串) 数字 :

1) 时间 (页:1 时间)   (可能编码为字符串)   
2)"时间 (aISO8601 开始时间, 脚步秒, 停止时间) " , " (一定要编码为字符串)   
停下来 时间可以是ISO8601 时间或时间 " now- n 单位时间 (例如, " now- 3分钟") 。 。 。 。
停下来 时间不一定就是开始的时间 时间 + x strideseconds.
一排一排一连串 () 值在每次查询之前被扩展成多个行, 因此分区列表 钥匙总是可以完美地更新。
举例来说,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
扩展到此分区键组合表 :
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;组色素源名称和gt;{#clustercolumnsourcenames} 
Cassandra 接受集群列的类似 SQL 的限制,这些列构成主键的第二部分 (分区键后 (编号) ) 。 。 。 因此,必须确定这些列通过&lt;组图源名称&gt;。 这样可以 ERDDAP™ 与卡珊德拉高效合作. 如果有组列而你却不说 ERDDAP ,数据集将痛苦地缓慢在 ERDDAP™ 并使用吨卡桑德拉资源。
    * 举例来说,&lt;组色素源名称 &gt; *我的ClusterColumn1,我的ClusterColumn2* &lt;/ 组色素来源名称 &gt;
    * 如果一个 Cassandra 表格没有组列, 请不要指定&lt;集群Column SourceNames&gt;,或指定无值。
    * 默认,卡珊德拉和 ERDDAP™ 用对大小写不敏感的方式处理列名。 但是如果你准备好了 [列名称](#case-sensitivity) 改为 " , ERDDAP™ 将以对大小写敏感的方式处理卡珊德拉列名。
         
#### &lt;索引 Column 源名称和gt;{#indexcolumnsourcenames} 
卡珊德拉接受这个 '=' 二级索引列的制约,这是您明确创建通过
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (是的,需要括号。)   
因此,如果你通过下列方式识别这些列是非常有用的:&lt;索引Column SourceNames &gt;. 这样可以 ERDDAP™ 与卡珊德拉高效合作. 如果有指数栏,你不告诉 ERDDAP 有些查询会毫无必要 痛苦地缓慢 ERDDAP™ 并使用吨卡桑德拉资源。
* 举例来说,&lt;索引 Column 源名称 &gt; *我的Index Column1, 我的Index Column2 密码* &lt;/index Column 源名称 &gt;
* 如果卡桑德拉表格没有索引栏,请不要指定&lt;索引 Column SourceNames &gt;,或指定无值。
* 卡珊德拉指数不像数据库指数 卡桑德拉指数只帮助 '=' 限制。 他们只是 [建议](https://cassandra.apache.org/doc/latest/cql/indexes.html) 用于比总值少得多的列。
* 默认,卡珊德拉和 ERDDAP™ 用对大小写不敏感的方式处理列名。 但是如果你准备好了 [列名称](#case-sensitivity) 改为 " , ERDDAP™ 将以对大小写敏感的方式处理卡珊德拉列名。
         
#### &lt;最大请求Fraction&gt;{#maxrequestfraction} 
何时 ERDDAP™   (内容) 装入数据集, ERDDAP™ 从 Cassandra 得到分区键的不同组合列表。 对于一个庞大的数据集来说,组合的数量将会是巨大的. 如果您想要阻止用户请求大部分或全部数据集 (甚至一个要求 ERDDAP™ 下载大部分或全部数据,以便进一步过滤) ,你可以告诉 ERDDAP™ 仅允许通过&lt;最大请求Fraction &gt;,是1e- 10之间的浮动点数 (也就是说,要求不能超过10亿的1个组合) 第1条 (默认,这意味着请求可以针对整个数据集) 。 。 。 。
例如,如果一个数据集有10000个分区键的不同组合,最大请求方块被设定为0.1,
然后需要1001或更多组合数据的请求将生成错误消息,
但需要1000个或更少的组合数据的请求将被允许。
    
一般来说,数据集越大,应该设置越低&lt;最大请求格式 &gt; 。 你可以把它设定为 1 一个小数据集,0.1 一个中型数据集,0.01 一个大数据集,0.0001 一个大数据集。
    
这种做法远非完美。 这将导致一些合理的请求被拒绝,一些太大的请求被允许。 但是,这是一个困难的问题,这种解决办法远胜于无。
    
#### 卡桑德拉岛 subsetVariables  {#cassandra-subsetvariables} 
与其他 EDDTable 数据集一样,您可以指定一个以逗号分隔的列表&lt; dataVariable &gt; 翻译: destinationName s 在一个叫做 " [ subsetVariables ](#subsetvariables) " 确定数值有限的变量。 然后数据集将有一个.子集网页,并在许多网页的下拉列表中显示这些变量的不同值清单。
    
列表中仅包含分区关键变量和静态列是强 E NCO 愤怒。 Cassandra将能够非常迅速和方便地生成数据集每次重新装入的明显组合列表. 一个例外是时间戳分区键是其他一些时间戳列粗糙的版本——也许最好把这些放在列表中。 subsetVariables 因为数值很多,对用户没有多大用处.
    
如果您在列表中包含非分区密钥, 非静态变量, 很可能是 **非常喜欢** Cassandra每次重新装入数据集,计算成本都很高,因为 ERDDAP™ 需要查看数据集的每一行来生成信息。 事实上,查询可能失败。 所以,除了非常小的数据集, 这是强烈的分散。
    
#### 卡桑德拉数据类型{#cassandra-datatypes} 
因为有些模糊不清 [卡桑德拉数据类型](https://cassandra.apache.org/doc/latest/cql/types.html) 地图 ERDDAP™ 数据类型,需要指定 [&lt;数据类型&gt;] (# 数据类型) 每个 [ 标记&lt; dataVariable &gt;] (中文(简体) ). (数据可变) 告诉 ERDDAP™ 要使用的数据类型 。 标准 ERDDAP™ 数据 类型 (和最常见的 Cassandra 数据类型) 它们是:
    
*    [布尔](#boolean-data)   (布尔) ,哪个 ERDDAP™ 然后存储为字节
* 字节 (英寸,如果范围为 -128 至 127) 
* 简称 (英寸,如果范围为 -32768 至 32767) 
* 单位 (如果范围是 -2147483648 -2147483647) 
* 长 (如果射程是 -922337203685475808 到922337203685475807) 
* 浮动 (浮动) 
* 双 (双倍, 小数 (可能丧失精度) 时间戳) 
* 字符 (ascii 或文本,如果它们从未超过 1 个字符) 
* 字符串 (acii, 文本, varchar, inet, uuid, timuid, blob, 地图, 设定, 列表 ?) 

卡珊德拉餐厅 [时间戳](#cassandra-timestamp-data) 属于特殊情形:使用 ERDDAP 双重数据 类型

如果您在其中指定字符串数据类型 ERDDAP™ 对于卡桑德拉地图,设置或列表,每个卡桑德拉行的地图,设置或列表将转换为单行的单字符串,在 ERDDAP™ 表单。 ERDDAP™ 清单有替代系统;见下文。

 *类型* 列表 - ERDDAP '是[&lt;数据类型&gt;] (# 数据类型) 卡桑德拉标签 dataVariable s 可包括经常 ERDDAP™ 数据 类型 (见上文) 加几个可用于卡桑德拉列表列的特殊数据Types:布林莱斯特,字节列表,ubyteList,短线列表,ushortList,intList,uintList,长线列表,ulongList,浮线列表,双线列表,CharList,StringList. 当这些列表中的一列被传送到 ERDDAP™ ,则每行源数据将被扩展为列表。 大小 () 数据行数 ERDDAP ; 简单数据 类型 (例如, 输入) 在该源数据行中,将重复列表。 大小 () 时间。 如果结果包含多个列表变量,则特定一行数据MUST上的所有列表大小相同,MUST为"平行"列表,或者 ERDDAP™ 将生成错误消息。 例如,对于来自ADCP的电流测量,
深度 \\[ 0 个 \\] ,当前 \\[ 0 个 \\] ,当前 \\[ 0 个 \\] ,且当前 \\[ 0 个 \\] 都相关
深度 \\[ 页:1 \\] ,当前 \\[ 页:1 \\] ,当前 \\[ 页:1 \\] ,且当前 \\[ 页:1 \\] 这些都是相关的,...
或者,如果你不想的话 ERDDAP™ 将列表扩展为 ERDDAP™ 表格,指定字符串为 dataVariable 数据 键入后, 整个列表将作为一个字符串在一行中显示 。 ERDDAP 。 。 。 。
    
#### 卡桑德拉时间戳数据{#cassandra-timestamp-data} 
卡珊德拉的时标数据总是意识到时区. 如果输入时间戳数据而不指定时区,卡桑德拉假定时间戳使用当地时区.
    
 ERDDAP™ 支持时间戳数据,并总是在 Zulu /GMT时区. 因此,如果你在卡桑德拉输入时间戳数据时使用一个时区,而不是 Zulu / GMT, 请记住, 您需要进行所有的时间戳数据查询 。 ERDDAP™ 使用 Zulu /GMT时区. 所以不要惊讶 当时间戳值出来 ERDDAP 由于时区从本地切换到 Zulu /GMT时间。

* 内 ERDDAP 因为 datasets.xml 时,&lt; dataVariable &gt; 时间戳变量的标记, 设置
```
          <dataType>double</dataType>  
```
内&lt; addAttributes &gt; 设定
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* 建议 : 如果数据是一个时间范围,那么将时间戳值指向隐含的时间范围中心是有用的 (比如说,中午) 。 。 。 例如,如果一个用户从另一个数据集得到2010-03-26T13:00Z的数据,他们想要从这个卡桑德拉数据集获得每天有数据的最接近的数据,那么2010-03-26T12:00Z的数据就会得到. (代表该日期的卡桑德拉数据) 很明显是最好的 (而不是之前或之后的午夜, 在不太明显的情况下,最好) 。 。 。 。
*    ERDDAP™ 具有用于 [转换数字 时间到/ 从字符串时间](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) 。 。 。 。
* 见 [怎么样 ERDDAP™ 处理时间](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) 。 。 。 。
         
#### 整数无值{#integer-nulls} 
卡桑德拉支持卡桑德拉内装的无能 ( ERDDAP™ 单位) 和宽度 ( ERDDAP™ 长) 栏,但 ERDDAP™ 不支持任何整数数据类型的真假。
默认情况下, Cassandra 整数空将转换为 ERDDAP™ 改为2147483647 用于整列,或长列922337203685475807。 这些会在某些类型的文本输出文件中作为“ NAN” 出现 (例如,.csv) ,在其他类型的文本输出文件中“” (比如说, .htmlTable ) 和具体数字 (2147483647 缺漏净值) 其他类型的文件 (例如二进制文件 .nc 和垫子) 。 。 。 用户可以通过引用"NaN",例如"&windSpeed=NaN"来搜索该类型缺失值的数据行.
    
如果您使用其他的整数表示卡桑德拉表中缺失的值,请在 datasets.xml 数字 :

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

对于 Cassandra 浮点列, 无效者在 ERDDAP 。 。 。 对于转换为 Strings 中的 Cassandra 数据类型 ERDDAP™ ,无字符串转换为空字符串。 这不应该是一个问题。
    
#### "WARNING:重新准备已经准备好的查询"{#warning-re-preparing-already-prepared-query} 
* "WARNING:重新准备已经准备好的查询",载于 *移动猫* /日志/目录。 (或其它 Tomcat 日志文件)   
Cassandra的文档说,如果同样的查询被写成两次,就会有麻烦。 (或超过) 。 。 。 。 (看这个 [错误报告](https://datastax-oss.atlassian.net/browse/JAVA-236) 。 。 。 。) 为了避免让卡珊德拉发疯 ERDDAP™ 缓存所有备忘声明,以便重新使用。 如果/ 当Tomcat/时, 缓存丢失 ERDDAP™ 重新启动,但我认为这没关系,因为 准备声明与特定会话有关 (介于 Java 卡桑德拉岛) ,这也丢失了。 所以,你可以看到这些消息。 我知道没有别的办法 幸好这是警告,不是错误 (虽然卡珊德拉威胁说这会导致性能问题) 。 。 。 。
    
卡珊德拉声称"准备声明"永远是好的 所以 ERDDAP 缓存的已编写声明绝不应过时或无效。 如果这不是真的,你得到错误 某些准备声明是过时/无效的, 那你需要重新启动 ERDDAP™ 要清除 ERDDAP 准备声明的缓存。
    
#### 卡桑德拉安保处{#cassandra-security} 
见 [保护卡桑德拉](https://cassandra.apache.org/doc/latest/operating/security.html) 

在与卡桑德拉合作时,你需要尽可能安全稳妥地做一些事情,以避免让恶意用户破坏你的卡桑德拉,或获得他们不该访问的数据. ERDDAP™ 也试图以安全的方式行事

* 我们鼓励你们建立 ERDDAP™ 连接到 Cassandra 作为 Cassandra 的用户,该用户只能访问 **相关** 页:1 (编号) 并且只有读取权限。
* 我们鼓励你们建立连接 ERDDAP™ 给卡桑德拉的
    * 总是使用SSL,
    * 只允许从一个 IP 地址连接 (或一个地址块) 从一个 ERDDAP™ 用户,以及
    * 仅以 MD5 散列形式传输密码。
*    \\[ 已知的问题 \\] 连接 (包括密码&#33;) 保存为纯文本 datasets.xml 。 。 。 我们还没找到办法 允许管理员输入卡桑德拉密码 ERDDAP 开始于Tomcat (没有用户输入而发生) ,因此密码必须在文件中访问。 为了更加安全:
    * 你们 (联合国 ERDDAP™ 管理员) 应该是所有者 datasets.xml 并有阅读和WRITE访问。
    * 制作只包含用户=tomcat的组. 使用 chgrp 使该组用于 datasets.xml ,只有读取权限。
    * 使用chmod来指定 o- rwx 权限 (“ 其他” 用户没有 READ 或 WRITE 访问权限) (单位:千美元) datasets.xml 。 。 。 。
* 输入时 ERDDAP™ ,将密码和其他连接属性存储在“私人”中 Java 变量。
* 在生成 CQL 的 Cassandra 请求之前, 对客户的请求进行解析并检查其有效性 。
* 向Cassandra提出的请求是用CQL Bund/Prepared Statements提出的,以防止CQL注射. 无论如何,与传统数据库相比,卡桑德拉从本质上来说较少受到CQL注射的影响。 [SQL 注射](https://en.wikipedia.org/wiki/SQL_injection) 。 。 。 。
         
#### 卡桑德拉速度{#cassandra-speed} 
卡桑德拉可以快速或缓慢. 有一些事情你可以做 使它快速:
* 将军
CQL的性质是查询是 [声明](https://en.wikipedia.org/wiki/Declarative_programming) 。 。 。 他们只是具体说明用户想要什么。 他们没有包含如何处理或优化查询的规格或提示. 所以没有办法 ERDDAP™ 生成查询,以便帮助卡桑德拉优化查询 (或以任何方式规定如何处理查询) 。 。 。 总而言之,由卡桑德拉管理员来安排 (例如,指数) 用于优化某些类型的查询。
     
* 指定与 coarser-精密时间戳 分区密钥有关的时间戳列,通过 [&lt;分区 密钥來源名稱&gt; (# 分区密钥源名称) 是最重要的帮助方式 ERDDAP™ 与卡珊德拉高效合作. 如果这种关系存在于卡珊德拉的桌子上 你却不说 ERDDAP™ ,数据集将痛苦地缓慢在 ERDDAP™ 并使用吨卡桑德拉资源。
     
* 通过[&lt;组图源名称&gt; (# 组列源名称) 是第二重要的帮助方式 ERDDAP™ 与卡珊德拉高效合作. 如果有组列而你却不说 ERDDAP 中,大量可能的数据查询将不必要的、痛苦的缓慢 ERDDAP™ 并使用吨卡桑德拉资源。
     
* 制作 [索引](https://cassandra.apache.org/doc/latest/cql/indexes.html) 用于常用约束变量 --
您可以通过为经常受到"="限制的卡桑德拉列创建索引来加速一些查询.
    
卡桑德拉无法为列表,设置或映射列制作索引.
    
* 通过 [ 指定索引列&lt;索引 Column 源名 &gt; (#索引列源名称) 是一种重要的帮助方式 ERDDAP™ 与卡珊德拉高效合作. 如果有指数栏,你不告诉 ERDDAP ,一些数据查询将不必要的、痛苦的慢于 ERDDAP™ 并使用吨卡桑德拉资源。
     
#### 卡桑德拉·斯塔兹{#cassandra-stats} 
*    ["卡桑德拉统计"诊断信息](#cassandra-stats) - —— - 说 每笔 ERDDAP™ 用户查询卡桑德拉数据集, ERDDAP™ 将打印日志文件中的行, *大家长会* /logs/log.txt,有一些与查询相关的统计,例如,
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
根据上述例子中的数字,这意味着:

* 何时 ERDDAP™ 最后一个 (内容) Cassandra 告诉了装入此数据集 ERDDAP™ 分区键有1000个不同的组合。 ERDDAP™ 在文件中缓存了所有不同的组合 。
* 由于用户的限制, ERDDAP™ 在可能掌握所需数据的10 000个组合中,确定了两个组合。 这么说 ERDDAP™ 给卡珊德拉打两通电话 每个分区键组合一个 (这就是卡珊德拉的要求.) 显然,如果一个大数据集拥有大量分区密钥的组合,而给定的请求并没有大幅降低这种组合,那就麻烦了. 您可以要求每个请求通过设置缩小密钥空间 [&lt;最大请求格式 &gt; ] (# 最大请求违反) 。 。 。 这里,2/1000=2e-4, 低于最大请求分数 (0.1 (中文(简体) ).) ,所以请求被允许。
* 在应用分区键的限制后, [组列](#clustercolumnsourcenames) ,以及 [索引列](#indexcolumnsourcenames) 发送日期 ERDDAP™ 卡珊德拉将1200行数据还给 ERDDAP™ 在结果集。
* 结果 设定一定有 [数据 类型= *某类* 列表](#cassandra-datatypes) 栏 (每个清单平均10项) ,因为 ERDDAP™ 将卡珊德拉的1200行扩展为2000行 ERDDAP 。 。 。 。
*    ERDDAP™ 总是对卡珊德拉的数据应用所有用户的限制. 在这种情况下,卡桑德拉没有处理的限制将排数减少到7405. 这是发送给用户的行数。

这些诊断信息的最重要用途是确保 ERDDAP™ 正在做你认为它在做什么。 如果不是的话 (例如,它不象预期的那样减少不同的组合数目吗?) ,然后你可以使用信息 试图找出什么是错的。
 
* 研究和实验以找到和更好地安排[&lt;连接 Property &gt;] (#卡桑德拉-连接财产) 对
 
* 检查卡珊德拉和 ERDDAP 。 。 。 如果连接缓慢,请看能否改进. 最好的情况是什么时候 ERDDAP™ 正在运行在同一个服务器上 (快速) 切换为运行您正在连接的 Cassandra 节点的服务器。
 
* 请耐心点 仔细阅读这里和卡桑德拉文献中的信息. 实验 检查你的工作。 如果卡珊德拉号... ERDDAP™ 连接仍然比预期慢, 请包括您的 Cassandra 表的策略和您的 ERDDAP™ 块 datasets.xml 看到我们的 [关于获得额外支助的章节](/docs/intro#support) 。 。 。 。
 
* 如果其他都失败了
考虑将数据储存在收集中 NetCDF 页:1 .nc 文件 (特别是 .nc 使用 [CF 数字 断层采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 相邻的标记矩阵数据结构,因此可以处理 ERDDAP 因为 [来自 NcCFF 的 EDD 表格](#eddtablefromnccffiles) ) 。 。 。 。 如果有逻辑组织 (每个都有一块空间和时间的数据) , (中文). ERDDAP™ 可以非常迅速地从它们中提取数据.
         
#### EDD Table FromCassandra 骨架 XML{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### 来自 DapSequence 的 EDD 表{#eddtablefromdapsequence} 
 [ **来自 DapSequence 的 EDD 表** ](#eddtablefromdapsequence) 处理 1 级和 2 级序列中的变量 [ DAP ](https://www.opendap.org/) 服务器等 DAP 临 时 (当时是https://www.pmel.noaa.gov/epic/software/dapper/,现已终止) 。 。 。 。

* 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 然后您可以编辑它来调谐它。 您可以在浏览器中查看源数据集的 DDS 和 DAS 文件( 将.das 和.dds 添加到 sourceUrl (一个实例是:https://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds) (中文(简体) ).
    
* 一个变量在 DAP 如果 .dds 响应表示持有变量的数据结构是“序列” (大小写不敏感) 。 。 。 。
* 在某些情况下,你会看到一个序列中的序列,一个2级序列——EDDTable FromDapSequence也处理这些序列.
#### 来自 DapSequence 骨架的 EDD 表格 XML 数据{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### 数据库中的 EDD 表格{#eddtablefromdatabase} 
 [ **数据库中的 EDD 表格** ](#eddtablefromdatabase) 处理一个关系数据库表格中的数据或 [视图](https://en.wikipedia.org/wiki/View_(database) ) (中文(简体) ).

#### 一个表格或视图{#one-table-or-view} 
如果您想要服务的数据在两个或多个表格中 (因此需要JOIN 立即从两个表格中提取数据) 你需要做一个 [非正常状态](https://en.wikipedia.org/wiki/Denormalization)   (已经加入) 表格或 [视图](https://en.wikipedia.org/wiki/View_(SQL) ) 与您想要作为一个数据集在 ERDDAP 。 。 。 。

对于大型、复杂的数据库来说,将几个块作为非正常化的表格分开可能是合理的,每个块的数据类型不同,它们将成为独立的数据集。 ERDDAP 。 。 。 。

使用非正常化的表格 ERDDAP™ 听起来像是个疯狂的主意 请相信我们 有几个原因 ERDDAP™ 使用非正常化的表格:

* 这对用户来说要容易得多.
何时 ERDDAP™ 将数据集呈现为一个,简单,非正常,单一的表格,任何人都很容易理解数据. 大多数用户从来没有听说过普通的表格,很少有人理解密钥,外国密钥,或表格加入,他们几乎肯定不知道不同类型加入的细节,或者如何指定SQL来进行加入 (或多个连接) 对 使用非正常化的表格可以避免所有这些问题。 光是这一原因,就有理由使用非正常化的单一表格来提交数据集。 ERDDAP™ 用户。
     
* 正规化表格 (按关键栏分列的多个表格) 用于将数据存储在数据库中。
但即使是在SQL中,返回用户的结果也是非正常化的 (已加入) 单表。 因此,将数据集呈现给用户似乎是合理的,因为它是一个巨大的,非正常的,单一的表格,然后他们可以从中请求子集 (例如,显示温度所在的表格的行数 " 30个) 。 。 。 。
     
* 您可以为 ERDDAP™ 没有改变你的桌子。
     ERDDAP™ 有一些可能不同于您如何建立数据库的要求。
举例来说, ERDDAP™ 要求将时间戳数据存储在“时间戳与时区”字段。
通过制作单独的表格/视图 ERDDAP™ ,您可以做这些更改 当你做非正常的表格,用于 ERDDAP 。 。 。 所以,你不需要做任何改变 你的桌子。
     
*    ERDDAP™ 将重新创建一些规范表格的结构。
您可以指定哪些列数据来自“ outer” 表格, 因此具有数量有限的不同值 。 ERDDAP™ 将收集这些列中所有不同组合的值,并在一个特殊 上向用户显示。 子集网页,帮助用户快速选择数据集的子集. 每个列的不同值也在数据集其他网页的下拉列表中显示.
     
* 一个非正常化的表格可以使数据从您手中传递到 ERDDAP 管理员简单。
你是这个数据集的专家,所以你决定要加入哪些表格和哪一列表格以及如何加入这些表格是有意义的。 所以你不用交给我们 (更糟糕的是,最终用户) 几张表格和如何加入的详细指示 你只需要让我们进入非正常化的桌子
     
* 一个非正常化的表格能够有效地获取数据。
非正常化的形态通常比普通化的形态更快的进入. 加入会很慢的 多个加入会非常缓慢.
     

为了将数据库中两个或两个以上表格的数据输入 ERDDAP™ ,有三种选择:
 

* 建议的备选办法:
您可以用非正常化表格的数据创建逗号或标签分隔值文件。
如果数据集是巨大的,那么创建几个文件是合情合理的,每个文件都有非正常化表格的一致子集 (例如,来自较小时间范围的数据) 。 。 。 。
    
最大的优势是 ERDDAP™ 将无需数据库进一步努力就能处理用户对数据的要求。 这么说 ERDDAP™ 也不会成为你数据库的负担或安全隐患 这是几乎所有情况下最好的选择,因为 ERDDAP™ 通常可以比数据库更快地从文件中获取数据 (如果我们将 .csv 文件转换为 .nc CF 文件) 。 。 。 。 (部分原因是 ERDDAP +文件是一个只读系统,在提供时不需要处理更改 [刑事调查](https://en.wikipedia.org/wiki/ACID)   (原子性、一致性、隔离性、可达性) 。 。 。 。) 而且,你可能不需要单独的服务器,因为我们可以把数据存储在我们的RAID上,并用现有的 ERDDAP™ 在已有服务器上。
    
* 选项 :
你在另一台电脑上建立了一个新的数据库 上面只有非正常的表格
由于该数据库可以像MariaDB,MySQL,和PostgreSQL一样成为自由开放的源数据库,所以这个选项不需要花费很多.
    
最大的优势是 ERDDAP™ 将可以处理用户对数据的要求,而无需您目前的数据库做出任何进一步努力。 这么说 ERDDAP™ 不会是您当前数据库的负担。 这也消除了许多安全关切,因为 ERDDAP™ 将无法访问您的当前数据库。
    
* 失败选项 :
我们可以连接 ERDDAP™ 到当前数据库。
要做到这一点,你需要:
    
    * 用非正常化的数据表创建单独的表格或视图。
    * 创建一个“ erddap” 用户, 只读访问到已非正常化的表格 (编号) 。 。 。 。
         
    
如果数据变化频繁, 您想要给出 ERDDAP™ 用户立即访问这些更改;然而,即使如此,使用上面和定期的文件选项可能是合理的 (每30分钟?) 替换拥有今天数据的文件。
这种方法的巨大缺点是: ERDDAP™ 用户请求可能会给您的数据库带来无法承受的沉重负担,而且 ERDDAP™ 连接是一种安全风险 (虽然我们可以尽量减少/管理风险) 。 。 。 。

使表格或视图非正常化 ERDDAP™ 是一个很好的机会 做一些改变, ERDDAP™ 需要,以不影响您原有表格的方式:

* 更改日期和时间戳字段/列以使用 Postgres 调用的数据类型 [有时区的时间戳](#database-date-time-data)   (或数据库中的等同数据) 。 。 。 。
没有时区信息的时间戳不能正常工作 ERDDAP 。 。 。 。
* 为用户经常搜索的列制作索引。
* 记住 [字段/列名称](#quotes-for-names-and-case-sensitivity)   (例如,使用所有小写) 当你打他们。
* 不使用保留词表和字段/栏名.

如果您需要帮助, 请联系数据库管理员 。
如果你想谈论整个方法 或者制定如何最好地做到这一点的战略, 请电子邮件克里斯。 约翰在Noaa.gov。
    
#### 数据库中 datasets.xml  {#database-in-datasetsxml} 
很难创造出正确的 datasets.xml 所需资料 ERDDAP™ 与数据库建立连接。 耐心点 须有条理.
* 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 然后您可以编辑它来调谐它。
        
生成数据 Xml 对 EDD Table FromDatabase 有三个特殊选项:
1. 如果你输入"&#33; (没有引用) 对于目录名称,程序将显示目录名称列表。
2. 如果你输入"&#33; (没有引用) 对于计划名称,程序将显示计划名称列表。
3. 如果你输入"&#33; (没有引用) 对于表格名称,程序将显示表格及其列的清单。 第一个"&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;",你所制作的条目是将使用的条目。
* 仔细阅读本文关于EDDTable FromDatabase的所有信息.
* 您可以通过联系数据库管理员和搜索网页来收集创建 EDD Table FromDatabase 数据集所需的大多数信息。
* 虽然数据库经常以对大小写不敏感的方式处理列名和表格名,但它们在 ERDDAP 。 。 。 因此,如果数据库中的一条错误消息说列名未知 (例如,“未知标识符=  ' *列名称* '" """) 即使你知道它存在, 尝试利用所有首都,例如, *美国* ,这常常是栏名的真实的,对大小写敏感的版本。
* 与可能具有相关经验的数据库管理员密切合作. 如果数据集无法装入,请读取 [错误消息](#troubleshooting-tips) 仔细找出原因
         
#### JDBC 驱动程序{#jdbc-driver} 
* [JDBC 驱动程序&lt;驱动程序Name &gt;] (#Jdbc驱动程序) - —— - 说 您必须获取合适的 JDBC 3 或 JDBC 4 驱动程序 .jar 文件以用于您的数据库和
放进去 *移动猫* 安装后/webapps/erddap/WEB-INF/lib ERDDAP 。 。 。 。 在你身边 datasets.xml 对于此数据集,您必须指定&lt;驱动程序Name &gt; 此驱动程序, 即 (很遗憾) 与文件名不同。 在网络上搜索您的数据库和驱动程序 JDBC 驱动程序Name Java 必须使用它。
    
    * 马里亚DB,试试 [https://mariadb.com/kb/en/about-the-mariadb-java-client/](https://mariadb.com/kb/en/about-the-mariadb-java-client/)   
那个&lt;要使用的驱动程序Name &gt; datasets.xml   (见下文) 可能是org.mariadb.jdbc。 驾驶员。
    * 对于 MySQL 和 Amazon RDS , 请尝试 [https://dev.mysql.com/downloads/connector/j/](https://dev.mysql.com/downloads/connector/j/)   
那个&lt;要使用的驱动程序Name &gt; datasets.xml   (见下文) 也许是com.mysql.jdbc。 驾驶员。
    * 对于 Oracle ,尝试 [https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html) 。 。 。 。
那个&lt;要使用的驱动程序Name &gt; datasets.xml   (见下文) 可能是神谕 jdbc.driver。 Oracle 驾驶员。
    * 对于Postgresql,我们得到了JDBC 4驱动从 [https://mvnrepository.com/artifact/org.postgresql/postgresql](https://mvnrepository.com/artifact/org.postgresql/postgresql)   
那个&lt;要使用的驱动程序Name &gt; datasets.xml   (见下文) 也许是org.postgresql。 驾驶员。
    * 对于 SQL 服务器,您可以从中获取 JTDS JDBC 驱动程序 [https://jtds.sourceforge.net](https://jtds.sourceforge.net) 。 。 。 。
那个&lt;要使用的驱动程序Name &gt; datasets.xml   (见下文) (原始内容存档于2018-03-29). probably net. sourceforge.jtds.jdbc. 驾驶员。
    
把JDBC司机放进去后 ERDDAP™ lib 目录中,您需要在 .bat 和/或 GenerateDatasets 的 .sh 脚本文件中添加引用 .jar 文件 Xml 、 DasDds 和 ArchiveADataset 中包含的 *移动猫* /webapps/erddap/WEB-INF/目录;否则,您在运行这些脚本时会得到一个Class NotFoundExcepion.
    
不幸的是,JDBC有时是麻烦的根源. 作为中间人 ERDDAP™ 和数据库,它有时对标准/基因数据库SQL进行细微修改,要求 ERDDAP™ 创建,从而造成问题 (例如,涉及 [大小写标识符](#quotes-for-names-and-case-sensitivity) 相关 [日期/时间段](#database-date-time-data) ) 。 。 。 请耐心一点,仔细读一下这里的资料,检查一下你的作品,看看我们 [关于获得额外支助的章节](/docs/intro#support) 。 。 。 。
    
#### 数据库&lt;连接 属性( G){#database-connectionproperty} 
* [&lt;连接 Property &gt;] (# 数据库连接财产) - —— - 说 在那个 datasets.xml 对于您的数据集, 您必须定义多个连接 要告诉的属性标签 ERDDAP™ 如何连接到您的数据库 (例如,指定用户名称、密码、sl连接,以及 [获取大小](#set-the-fetch-size) ) 。 。 。 这些对于每一种情况来说都是不同的,而且有些难以理解。 搜索网络中使用 JDBC 驱动程序连接到您数据库的实例 。 那个&lt;连接Property &gt; 名称 (例如"用户","密码","ssl") , 以及一些连接 Property 值可以通过搜索网络查找“ JDBC 连接属性” *数据库 类型* " , " (比如说, Oracle , MySQL, 亚马逊 RDS, MariaDB, PostgreSQL) 。 。 。 。
     
#### 名称和案例敏感性引文{#quotes-for-names-and-case-sensitivity} 
*    [字段/颜色名称引文; 大小写敏感性](#quotes-for-names-and-case-sensitivity) - 默认情况下, EDDTable FromDatabase 在 SELECT 语句中将 ANSI-SQL 标准双引号置于字段/列名周围,以防您使用保留词作为字段/列名,或字段/列名中的特殊字符. 双引号也挫败了某些类型的SQL注射攻击. 你看得出来 ERDDAP™ 用于通过 " 、 " 或无引号&lt;列词Name 引文&gt; 输入 datasets.xml 用于此数据集。
    
对许多数据库来说,使用任何类型的引文都会导致数据库以对案例敏感的方式与字段/列名合作 (而不是默认数据库大小写不敏感的方式) 。 。 。 数据库经常将文件/栏名显示为所有大写,而实际情况是敏感格式不同。 内 ERDDAP™ ,请始终将数据库列名称视为对大小写敏感。
    
    * 为了玛丽亚 DB, 您需要使用 [&#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;你觉得呢?](https://mariadb.com/kb/en/mysql-command-line-client/) 。 。 。 。
    * 对于 MySQL 和 Amazon RDS, 您需要使用 [&#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;你觉得呢?](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes) 。 。 。 。
    *    Oracle 支持 ANSI- SQL- 标准双引号 [默认](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223) 。 。 。 。
    * PostgreSQL默认支持ANSI-SQL标准双引号.
    
      
别用保留词来表示数据库,目录,计划或表名. ERDDAP™ 不把引文 周围他们。
    
如果可能, 在创建数据库表格时, 将所有小写用于数据库、 目录、 方案、 表格名称和字段名称 (视图) 和在提及字段/栏名时 datasets.xml 输入 ERDDAP 。 。 。 否则, 您可能会收到一个错误消息, 表示数据库、 目录、 计划、 表格和/ 或字段没有找到 。 如果您真的收到错误消息, 请尝试使用大小写敏感版本, 所有大写版本, 以及所有小写版本的名称 。 ERDDAP 。 。 。 其中一个可能有用。 如果没有,则需要将数据库名称、目录、计划和/或表格更改为全部小写。
    
#### 数据库&lt;数据 类型( G);{#database-datatype} 
*    [数据库](#database-datatype) [&lt;数据类型&gt;] (# 数据类型) 标记 - 因为有些模糊不清 [数据库数据类型](https://www.w3schools.com/sql/sql_datatypes_general.asp) 地图 ERDDAP™ 数据类型,需要指定 [&lt;数据类型&gt;] (# 数据类型) 每个 [ 标记&lt; dataVariable &gt;] (中文(简体) ). (数据可变) 告诉 ERDDAP™ 要使用的数据类型 。 部分问题是不同的数据集对各种数据类型使用不同的术语——所以总是尝试与定义相匹配,而不仅仅是名称. 参见关于 [标准 ERDDAP™ 数据 类型](#data-types) ,包括参考相应的SQL数据类型。 [日期和时间戳](#database-date-time-data) 属于特殊情况: ERDDAP 双重数据 类型
     
#### 数据库日期时间数据{#database-date-time-data} 
一些数据库日期时间栏没有明确的时区. 这样的栏是麻烦 ERDDAP 。 。 。 数据库支持日期的概念 (无论有没有时间) 没有时区,作为大概的时间范围。 不过 Java   (并由此而来 ERDDAP ) 仅处理时区即时日期+时间。 所以你可能知道日期时间数据是基于当地时区 (不论是否节省日光时间) 或格林尼治标准值/ Zulu 时区,但是 Java   (和 ERDDAP ) 别 我们原来以为可以解决这个问题 (例如,通过指定列的时区) ,但数据库+JDBC+ Java 互动使得这个解决方案不可靠。
* 这么说 ERDDAP™ 需要将所有日期和日期数据存储在数据库表格中,并带有一个数据库数据类型,该数据类型与JDBC类型"带有时区的时间戳"相对应. (理想的做法是使用格林尼治标准/ Zulu 时区) 。 。 。 。
* 内 ERDDAP 因为 datasets.xml 时,&lt; dataVariable &gt; 时间戳变量的标记, 设置
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

内&lt; addAttributes &gt; 设定
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* 建议 : 如果数据是一个时间范围,那么将时间戳值指向隐含的时间范围中心是有用的 (比如说,中午) 。 。 。 例如,如果一个用户从另一个数据集得到2010-03-26T13:00Z的数据,他们想要从一个拥有每天数据的数据库数据集获得最接近的数据,那么,该数据库的数据就是2010-03-26T12:00Z的数据. (表示该日期的数据) 很明显是最好的 (而不是之前或之后的午夜, 在不太明显的情况下,最好) 。 。 。 。
*    ERDDAP™ 具有用于 [转换数字 时间到/ 从字符串时间](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) 。 。 。 。
* 见 [怎么样 ERDDAP 处理时间](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) 。 。 。 。
       
#### 整数无值{#integer-nulls-1} 
数据库支持整数的无值 (英寸, 小英寸, 小英寸, 小英寸) 栏,但 ERDDAP™ 不支持真实的虚无。
数据库空将转换为 ERDDAP™ 字节栏127条,ubyte栏255条,短列32767条,ushort栏65535条,整列2147483647条,坤特栏4294967295条,长列92243372036854775807条,乌龙栏1844744073709551615条. 如果使用这些默认值,请识别 missing\\_value s 用于数据集中的用户 ERDDAP™ 与

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

或

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

或者,你可以使用 " missing\\_value "属性"而不是"QQFillValue".
生成数据 Xml 生成建议时自动添加这些 QQFillVale 属性 datasets.xml 用于数据库数据集。

对于数据库浮点列,无值在 ERDDAP 。 。 。 。
对于转换为 Strings 中的数据库数据类型 ERDDAP™ ,无字符串转换为空字符串。
    
#### 数据库安全{#database-security} 
* 在与数据库合作时,你需要尽可能安全稳妥地做一些事情,以避免让恶意用户破坏你的数据库或获得他们不应该访问的数据. ERDDAP™ 也试图以安全的方式行事
    * 考虑在另一台计算机上复制数据库和数据库表格以及您想要的数据 ERDDAP™ 服务。 (是的,对于商业数据库,例如: Oracle ,这涉及额外的许可费。 但对于开放源代码数据库,如PostgreSQL,MySQL,Amazon RDS,以及MariaDB,这都毫无代价.) 这给你一个高度的安全 也防止 ERDDAP™ 请求减慢原始数据库。
    * 我们鼓励你们建立 ERDDAP™ 以数据库用户的身份连接数据库 **相关** 数据库 (编号) 并且只有读取权限。
    * 我们鼓励你们建立连接 ERDDAP™ 输入数据库
        * 总是使用SSL,
        * 只允许从一个 IP 地址连接 (或一个地址块) 从一个 ERDDAP™ 用户,以及
        * 仅以 MD5 散列形式传输密码。
    *    \\[ 已知的问题 \\] 连接 (包括密码&#33;) 保存为纯文本 datasets.xml 。 。 。 我们没有找到方法允许管理员在数据库中输入密码 ERDDAP 开始于Tomcat (没有用户输入而发生) ,因此密码必须在文件中访问。 为了更加安全:
        * 你们 (联合国 ERDDAP™ 管理员) 应该是所有者 datasets.xml 并有阅读和WRITE访问。
        * 制作只包含用户=tomcat的组. 使用 chgrp 使该组用于 datasets.xml ,只有读取权限。
        * 使用chmod来指定 o- rwx 权限 (“ 其他” 用户没有 READ 或 WRITE 访问权限) (单位:千美元) datasets.xml 。 。 。 。
    * 输入时 ERDDAP™ ,将密码和其他连接属性存储在“私人”中 Java 变量。
    * 在生成用于数据库的SQL请求之前,会解析客户的请求并检查其有效性.
    * 向数据库提出请求时附有SQL准备声明,以防止 [SQL 注射](https://en.wikipedia.org/wiki/SQL_injection) 。 。 。 。
    * 向数据库提出的请求已执行 查询 (未执行声明) 限制只读的请求 (因此试图用 SQL 注入来改变数据库也会因此失败) 。 。 。 。
         
#### SQL 组合键{#sql} 
* 因为 OPeNDAP 表格数据请求旨在模仿SQL表格数据请求,很容易 ERDDAP™ 将表格数据请求转换为简单的 SQL 准备状态。 例如, ERDDAP™ 请求
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
将转换为 SQL 准备状态
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
 ERDDAP™ 使用 & diction 请求 () 和/或 & orderBy  ( *变量* ) 将添加命令和/或命令 *变量* 对SQL准备的声明。 一般而言,这将大大减缓数据库中的反应。
 ERDDAP™ 日志 [日志.txt](/docs/server-admin/additional-information#log) 作为
```
    statement=*thePreparedStatement*  
```
这将是 " 书面声明 " 的案文说明,可能与实际的 " 书面声明 " 略有不同。 例如,在"编译说明"中,时间以特殊的方式编码. 但在文本表述中,它们作为ISO 8601日期时间出现.
     
#### 数据库速度{#database-speed} 
* 数据库可能很慢。 有些事情你可以做:
    * 将军
SQL的性质是查询是 [声明](https://en.wikipedia.org/wiki/Declarative_programming) 。 。 。 他们只是具体说明用户想要什么。 他们没有包含如何处理或优化查询的规格或提示. 所以没有办法 ERDDAP™ 生成查询,以便帮助数据库优化查询 (或以任何方式规定如何处理查询) 。 。 。 一般由数据库管理员来设置 (例如,指数) 用于优化某些类型的查询。
##### 设定获取大小{#set-the-fetch-size} 
数据库返回数据到 ERDDAP™ 成块 默认情况下,不同的数据库会返回块中不同的行数. 这个数字往往很小,而且效率非常低。 例如,默认 Oracle 10岁&#33; 为您数据库的 JDBC 驱动程序读取 JDBC 文档, 以找到要设置的连接属性, 以便增加此属性, 并将此添加到数据集的描述中 datasets.xml 。 。 。 。 举例来说,
对于 MySQL 和 Amazon RDS, 使用
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
对于MariaDB来说,目前无法改变获取大小. 但它是一个请求的特性,所以搜索网络看看是否已经执行.
对于 Oracle 编辑
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
用于 PostgreSQL ,使用
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
但可以随意更改号码 设置数字太大将导致 ERDDAP™ 使用大量内存,并更有可能耗尽内存。
#### 连接属性{#connectionproperties} 
每个数据库都有其他连接属性,可以在 datasets.xml 。 。 。 其中许多将影响数据库的运行。 ERDDAP™ 连接。 请读取您数据库的 JDBC 驱动程序的文件以查看选项 。 如果您找到有用的连接属性, 请发送电子邮件 。 erd dot data at noaa dot gov 。 。 。 。
* 制作一个表格 --
如果你能定期得到更快的答复 (每天吗? 何时有新数据?) 生成一个实际表格 (就像你如何创造VIEW) 告诉 ERDDAP™ 要从表格中获取数据,而不是 VEW。 由于对表格的任何请求都可以在不加入另一个表格的情况下得到满足,因此反应会更快。
* 真空表 -
MySQL 和 Amazon RDS 如果您使用, 响应会快得多 [选择性表格](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html) 。 。 。 。
玛丽亚 如果使用, DB 响应会快得多 [选择性表格](https://mariadb.com/kb/en/optimize-table/) 。 。 。 。
PostgreSQL 响应速度要快得多 [瓦努阿图](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html) 那个桌子
     Oracle 没有或需要类似的命令。
* 制作 [索引](https://en.wikipedia.org/wiki/Database_index) 用于常用约束变量 --
通过在数据库中为变量创建索引,您可以加快许多/ 大多数查询 (哪个数据库称为“列”) 在用户查询中经常受到限制。 一般来说,这些变量与[&lt; subsetVariables &gt;] (中文(简体) ). (# 亚位变量) 和/或纬度、经度和时间变量。
##### 使用连接集合{#use-connection-pooling} 
一般情况下 ERDDAP™ 为每个请求单独连接数据库。 这是最可靠的办法。 更快的选择是使用支持连接集合的数据源. 要设置它,请具体说明 (举例来说,)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
旁边&lt; sourceUrl &gt;, (中文(简体) ).&lt;驱动程序Name &gt;,以及&lt;连接 财产&gt;。
进 *移动猫* /conf/context.xml,定义具有相同信息的资源,例如,
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
关于使用数据源的一般信息 [https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html) 。 。 。 。
见 [Tomcat 数据来源信息](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources) 和 [Tomcat 数据来源示例](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html) 或与其他应用程序服务器一起搜索网络中使用数据源的例子。
* 如果其他都失败了
考虑将数据储存在收集中 NetCDF 页:1 .nc 文件 (特别是 .nc 使用 [CF 数字 断层采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 相邻的标记矩阵数据结构,因此可以处理 ERDDAP 因为 [来自 NcCFF 的 EDD 表格](#eddtablefromnccffiles) ) 。 。 。 。 如果有逻辑组织 (每个都有一块空间和时间的数据) , (中文). ERDDAP™ 可以非常迅速地从它们中提取数据.
         
#### 来自数据库的 EDD Table 骨架 XML 数据{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### 从 EDD 表格 EDDGrid  {#eddtablefromeddgrid} 
 [ **从 EDD 表格 EDDGrid ** ](#eddtablefromeddgrid) 允许您从任意一个 EDDGrid 数据集。

* 这样做的一些共同原因是:
    * 这样可以查询数据集 OPeNDAP 选择约束,是一类“按数值清点” (用户可能要求的) 。 。 。 。
    * 数据集本质上是一个表格数据集.
* 全球属性"maxAxis0"的值 (通常类型=“int”) , (中文). (默认为 10) 将用来限制轴数 \\[ 0 个 \\]   (通常为 "time" 轴) 所附数值 EDDGrid 数据集,每个数据请求都可以访问。 如果你不想有任何限制,请指定0的值. 此设置很重要, 因为否则用户会太容易向 EDDTable From 询问 EDDGrid 查看所有网格数据集的数据。 这将需要很长的时间,而且几乎肯定会因一个超时错误而失败。 这是让EDD表从这里安全 EDDGrid 您的数据集 ERDDAP 不用担心它们会导致不合理地使用计算资源。
* 如果附件 EDDGrid 是一个 [ EDDGrid 从埃尔达普](#eddfromerddap) 页:1 ERDDAP™ 一样 ERDDAP ,然后从 EDD 表格 EDDGrid 将始终直接使用当前可用的引用数据集。 对于 EDD Table From来说,这是一个非常有效的方法 EDDGrid 访问网格数据。
* 这个班&lt;重新装入 –每分钟一次&gt;] (每分钟都装满) 这一点很重要。 随函附上 EDDGrid 因为&lt;重新装入 EveryNMInuts &gt; 会被忽略 。
* 如果值为:&lt;更新EveryNMILIS &gt; (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;更新每个人) 为此数据集提供,则忽略。 随函附上 EDDGrid 因为&lt;更新EveryNMillis&gt;才是关键。
*    [生成 DatasetsXml](#generatedatasetsxml) 有数据集类型=EDDTable From的选项 EDDGrid 它要求 URL 一个 ERDDAP   (通常一样 ERDDAP )   (以“/erddap/”结尾) 和正则表达式。 生成数据 Xml 将生成 XML 用于 EDD Table from EDDGrid 中每个网格数据集的数据集 ERDDAP™ 具有 datasetID 匹配正则表达式 (使用 .Q 来匹配全部 datasetID s 用于网格数据集) 。 。 。 。
    
GenerateDatasetsXml为每个数据集生成的 XML 块包括:
    
    * 页:1 datasetID 这是 EDDGrid 因为 datasetID 加上"AsAtTable"。 (笑声)
    * 一个新的全球属性摘要,即: EDDGrid “摘要”加新的第一段,说明该数据集是什么。
    * 一个新的标题全局属性,即 EDDGrid '标题加', (作为表格) " ..
    * 一个新的最大轴0全局属性,值为10.
#### 从 EDD 表格 EDDGrid 模板 XML{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### 来自文件名的 EDD 表格{#eddtablefromfilenames} 
 [ **来自文件名的 EDD 表格** ](#eddtablefromfilenames) 从服务器文件系统中一组文件的信息中创建一个数据集,包括每个文件的URL,这样用户就可以通过 ERDDAP 因为 [ "files" 系统](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) 。 。 。 。 和所有的不一样 [来自文件的 EDD 表格](#eddtablefromfiles) 子类,此数据集类型不服务文件内的数据。

* 当 :
    * 您拥有一组文件, 您想要将其作为整个文件分发, 因为它们不包含“ 数据 ” , 与普通数据文件拥有数据的方式相同 。 例如,图像文件,视频文件,Word文档,Excel电子表格文件,PowerPoint演示文件,或者文本文件无结构文本.
    * 您有一组文件,其中的数据格式为 ERDDAP™ 尚不能读. 例如,一个项目特定,自定义,二进制格式.
         
#### 来自文件名数据的 EDD表{#eddtablefromfilenames-data} 
*    [EDD Table FromFileNames 数据集中的数据](#eddtablefromfilenames-data) 是一个表格, ERDDAP™ 以关于一组本地文件的信息创建在线。 在表格中,每个文件都有一个行. 四个特殊属性 [ datasets.xml 用于此数据集](#eddtablefromfilenames-skeleton-xml) 确定将包含在本数据集中的文件 :
    
##### 文件 目录{#filedir} 
    *   &lt;文件目录 &gt; -- 此处指定了服务器文件系统中的源目录与此数据集的文件. 位于服务器文件系统中的文件&lt;文件 Dir&gt; 将出现在本数据集的url 列中, 包含在命名的虚拟目录中https://*serverUrl*/erddap/files/*datasetID/*。 。 。 。
例如,如果 datasetID 是 jplMU 语句 RSS 东,
页:1&lt;fileDir &gt; 是/home/data/mur/ , (中文).
而该目录有一个名为jplMU的文件 RSS T20150103000000.png, (中文(简体) ).
然后向用户显示该文件的 URL 将是
        https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png。 。 。 。
        
除了使用本地目录外,&lt;文件 Dir&gt;,您也可以指定远程目录类网页的URL。 这项工作涉及:
        
        * THREDDS中的未分类数据集,例如,
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[ 2020-10-21 (中文(简体) ). 此服务器已不再可靠可用 。 \\] 
        * 未分类数据集 Hyrax 例如,
             [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/) 
        * 大多数类似Apache的目录列表,例如,
             [https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/) 
##### 飞翔时{#fromonthefly} 
 [\\*\\*"从飞行中"](#fromonthefly) - —— - 说 为了一些巨大的S3桶 (像Noaa -goes17, 它有2600万文件) ,也许需要 ERDDAP™ 最多12小时下载所有关于桶内内容的信息 (还有其他问题) 。 。 。 要绕过这个圈子,有特别的方法&lt;文件 Dir&gt; 在 EDDTable FromFileNames 中,可以使用 AWS S3 桶中的目录和文件名制作数据集。 数据集不会有用户可以通过请求到数据集搜索的全部S3桶目录和文件名列表. 但是,如果用户将目录等级与数据集的等级进行交叉,数据集将获得目录和文件的名称。 "files" 选项。 因此,这允许用户通过数据集浏览 S3 桶的文件等级和文件 "files" 系统。 要做到这一点, 而不是将 S3 桶的 URL 指定为“ 启动目录 ” (生成数据 xml 数据) 或&lt;文件目录 &gt; (输入 datasets.xml ) ,使用:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
例如:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
见文件 [与 S3 弹匣一起工作 ERDDAP™ ](#working-with-aws-s3-files) ,特别是S3桶 URL必须使用的具体格式的描述. 看到没?
 [这些细节和一个例子](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket) 使用时间\\*\\*从"On The Fly"。
        
##### 递归{#recursive} 
*   &lt;递归 &gt; -- 子目录中的文件&lt;文件目录 &gt; 与匹配的名称&lt;文件Regex&gt; 将出现在同一子目录中 "files" 如果&lt;递归&gt; 设定为真 。 默认是虚假的。
* [&lt;路径Regex &gt;] (&#123;\fn方正黑体简体\fs18\b1\bord1\\shad1\\3cH2F2F2F&#125;"Pathregex &#123;\fn方正黑体简体\fs18\b1\bord1\\shad1\\3cH2F2F2F&#125;"Pathregex") - —— - 说 如果递归= true, 只有符合路径的目录名称 (默认=. ...... ......") 将被接受。 如果递归=虚假,则忽略了这个. 这很少被使用,但在不寻常的情况下可能非常有用. (看这个 [正则文档](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) 和 [regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) 。 。 。 。) 
##### 文件 Regex{#fileregex} 
*   &lt;文件Regex &gt; -- 只有整个文件名所在的文件名 (不包含目录名称) 与&lt;文件Regex&gt;将包含在本数据集中。 例如, jplMU RSS T.&#123;14&#125;\\.png. (看这个 [正则文档](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) 和 [regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) 。 。 。 。)   
         
##### 从文件名称数据表内容{#from-file-names-data-table-contents} 
在表中,将有下列栏目:
* url - 打开 用户可以通过 URL 下载文件 ERDDAP 因为 [ "files" 系统](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) 。 。 。 。
* 名称 - 文件名称 (没有目录名称) 。 。 。 。
* 上次修改的 -- 文件上次修改的时间 (存储为双倍 "seconds since 1970-01-01T00:00:00Z" ) 。 。 。 此变量是有用的, 因为用户可以看到某个文件的内容是否在上次更改时 。 这个变量是 [时间 印花变量](#timestamp-variables) ,因此数据可能作为数值出现 (自1970-01-01T00:00Z以来的秒) 或字符串值 (ISO 8601:2004 (英语). (英) 格式) 视情况而定。
* 大小 - 以字节表示的文件大小, 以双倍存储 。 它们是作为双倍存储的,因为一些文件可能比ints允许的要大,并且一些响应文件类型不支持长. 双胞胎会给出精确的大小,即使对于非常大的文件.
* 添加列定义 ERDDAP™ 从文件名中提取信息的管理员 (例如,与文件中的数据相关的时间) 基于您在元数据中为每个新增列/ 指定的两个属性 dataVariable 数字 :
    
    * 提取Regex - 这个 [正则表达式](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) 。 。 。 整个正则名必须匹配整个文件名 (不包含目录名称) 。 。 。 Regex 必须包含至少一个捕获组 (括号内正则表达式的一节) 哪个 ERDDAP™ 用于确定文件名的哪个部分来提取数据。
    * 提取 组 - 这是抓取组的号码 (#1是第一个捕获组) 在正则表达式中。 默认为 1. 捕捉组是正则表达式的一个部分,括号内加括号.
    
以下是两个例子:
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
对于时间变量,如果文件的名称为 jplMU RSS T20150103000000.png, 提取Regex 将匹配文件名, 提取与第一个捕获组匹配的字符 ("201501030000000" (中文(简体) ).) 作为数据Type=字符串,然后使用 [适合字符串时间的单位](#string-time-units) 将字符串分析为时间数据值 (2015-01-03 T00:00-00Z (英语).) 。 。 。 。

如果是日变量, 如果一个文件有 jplMU 名称 RSS T20150103000000.png, 提取Regex 将匹配文件名, 提取与第一个捕获组匹配的字符 (03号) 作为[&lt;数据类型&gt;] (# 数据类型)  int,生成数据值为3.
        
#### 其他资料{#other-information} 
* 没有[&lt;更新EveryNMILIS &gt; (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;更新每个人) - —— - 说 这种数据集不需要,也不能使用&lt;更新 EveryNMILIS &gt; 标记,因为 EDDTable FromFileNames 所服务的信息总是完全更新的,因为 ERDDAP™ 查询文件系统,以响应每个数据请求。 即使有大量的档案,这一办法也应该合理有效。 如果文件数量庞大,而且数据集有一段时间没有被询问,那么回复可能很慢. 但之后几分钟,操作系统将信息保存在缓存中,因此回复速度应该非常快.
     
* 你可以用这个 [生成数据 Xml 程序](#generatedatasetsxml) 来做 datasets.xml 这类数据集的块 。 如上所示,您可以用从文件名中提取的信息添加/定义额外的列。
     
#### 来自文件名的 EDD 表格骨架 XML 数据{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### 来自文件的 EDD 表格{#eddtablefromfiles} 
 [ **来自文件的 EDD 表格** ](#eddtablefromfiles) 是所有 EDD Table 从... Files 类的超级类。 不能直接使用 EDD Table from Files 。 相反,使用 EDDTable FromFiles 的子类来处理特定文件类型:

*    [来自 Ascii 文件夹的 EDD 表格](#eddtablefromasciifiles) 汇总来自逗号、标签、分号或空格分隔的ASCII数据文件的数据。
*    [来自音频文件夹的 EDD 表格](#eddfromaudiofiles) 汇总一组本地音频文件的数据。
*    [从 EDD 表格 AwsXml 文件夹](#eddtablefromawsxmlfiles) 从一组自动气象站汇总数据 (自动取款机) XML 文件.
*    [来自 ColumnarAsii 文件的 EDD 表格](#eddtablefromcolumnarasciifiles) 将表格 ASCII 数据文件中的数据与固定宽度数据列汇总。
*    [从 EDD 表格 Hyrax 文件](#eddtablefromhyraxfiles)   (过期) 以若干变量汇总数据,每个变量都有共同的维度 (例如,时间,高度 (或深度) ,经度) ,服务于 [ Hyrax   OPeNDAP 服务器](https://www.opendap.org/software/hyrax-data-server) 。 。 。 。
*    [来自 InvalidCRA 文件的 EDD 表](#eddtablefrominvalidcrafiles) 数据汇总 NetCDF   (v3 或 v4 类型)   .nc 使用 CF DSG 相邻标记阵列的特定、无效的变体的文件 (庇护上诉委员会) 文档。 虽然 ERDDAP™ 支持此文件类型, 这是一个无效的文件类型, 任何人都不应开始使用 。 强烈鼓励当前使用此文件类型的组使用 ERDDAP™ 生成有效的 CF DSG CRA 文件,并停止使用这些文件。
*    [来自 JsonlCSV 的 EDD 表格](#eddtablefromjsonlcsvfiles) 数据汇总 [贾森 线条 CSV 文件](https://jsonlines.org/examples/) 。 。 。 。
*    [来自多分位Nc Files的 EDD表](#eddtablefrommultidimncfiles) 数据汇总 NetCDF   (v3 或 v4 类型)   .nc   (或 [ .nc 门L](#ncml-files) ) 带有多个变量的文件,每个变量都有共享的尺寸 (例如,时间,高度 (或深度) ,经度) 。 。 。 。
*    [来自 NcFiles 的 EDD 表格](#eddtablefromncfiles) 数据汇总 NetCDF   (v3 或 v4 类型)   .nc   (或 [ .nc 门L](#ncml-files) ) 带有多个变量的文件,每个变量都有共享的尺寸 (例如,时间,高度 (或深度) ,经度) 。 。 。 继续使用该数据集类型用于现有数据集是好的,但对于新的数据集,我们建议使用EDDTable From MultidimNcFiles。
*    [来自 NcCFF 的 EDD 表格](#eddtablefromnccffiles) 数据汇总 NetCDF   (v3 或 v4 类型)   .nc   (或 [ .nc 门L](#ncml-files) ) 使用文件格式之一的文件 [CF 数字 断层采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 公约。 但对于使用一个多维CF DSG变体的文件,请使用 [来自多分位Nc Files的 EDD表](#eddtablefrommultidimncfiles) 相反。
*    [来自 Nccsv 文件的 EDD 表格](#eddtablefromnccsvfiles) 数据汇总 [NCCSV 网络](/docs/user/nccsv-1.00) ASCII.csv 文档.
*    [来自Parquet Files的 EDD 表格](#eddtablefromparquetfiles) 处理来自 [公园](https://parquet.apache.org/) 。 。 。 。
*    [来自垃圾的 EDD 表格](#eddtablefromthreddsfiles)   (过期) 汇总文件数据,其中包含若干变量,具有共享维度 [红色 OPeNDAP 服务器](https://www.unidata.ucar.edu/software/tds/) 。 。 。 。
*    [从 EDD 表格 WFS 文件](#eddtablefromwfsfiles)   (过期) 制作一个本地副本,复制来自 ArcGIS 地图服务器 WFS 服务器,这样数据就可以快速重新保存到 ERDDAP™ 用户。

目前,没有支持其他文件类型. 但通常比较容易为其他文件类型添加支持. 有要求就联系我们 或者,如果你的数据是旧文件格式的,而你希望从这个格式移开,我们建议转换文件。 NetCDF 页:1 .nc 文件 (特别是, .nc 带有 [CF 数字 断层采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 相邻的标记矩阵数据结构 -- ERDDAP™ 可以很快从中提取数据) 。 。 。 。 NetCDF 是一种得到广泛支持的二进制格式,允许快速随机访问数据,并已被 ERDDAP 。 。 。 。

#### 从文件细节{#fromfiles-details} 
以下信息适用于EDDTable FromFiles的所有子类.
##### 合计{#aggregation} 
此类汇总本地文件的数据 。 每个文件都有一个 (相对) 小数据表。
    * 生成的数据集似乎文件的所有表格都合并了 (文件 # 1 的所有行数据加上文件 # 2 的所有行数据...) 。 。 。 。
    * 文件并非全部都拥有所有指定的变量. 如果给定文件没有指定变量, ERDDAP™ 将按需要添加缺失值。
    * 所有文件中的变量 MUST 的值与 [ add\\_offset ](#scale_factor) , (中文). [ missing\\_value ](#missing_value) , (中文). [填充时间 数值](#missing_value) , (中文). [ scale\\_factor ](#scale_factor) ,以及 [单位](#units) 属性 (如果有的话) 。 。 。 。 ERDDAP™ 检查,但它是一个不完美的测试 -- 如果有不同的值, ERDDAP 并不知道哪些文件是正确的,因此哪些文件无效。 如果有问题,也许可以使用 [NcML 数据](#ncml-files) 或 [ NCO ](#netcdf-operators-nco) 来解决这个问题。
         
##### 压缩文件{#compressed-files} 
所有 EDDTable FromFiles 子类的源数据文件可以外部压缩 (例如, .tgz , (中文). .tar  .gz , (中文). .tar  .gzip , (中文). .gz , (中文). .gzip , (中文). .zip , (中文). .bz2 ,或.Z) 。 。 。 。 见 [外部压缩文件文档](#externally-compressed-files) 。 。 。 。
     
##### 缓存文件信息{#cached-file-information-1} 
* 当一个 EDD Table FromFiles 数据集首次加载时, EDDTable FromFiles 读取所有相关文件中的信息并创建表格 (每个文件一行) 包含每个有效文件和每个“坏”的信息 (不同或无效) 文档。
    * 这些表格还存储在磁盘上,因为 NetCDF 页:1 .nc 文件在 *大家长会* /数据集/ *上一个 2 CharsOfDatasetID* 页:1 * datasetID * / 在命名的文件中 :
目录 .nc   (中包含一个唯一目录名称的列表) , (中文).
文件 图表 .nc   (以每个有效文件的信息保存表格) , (中文).
坏文件 .nc   (包含每个不良文件信息的表格) 。 。 。 。
    * 加速访问 EDD Table fromFiles 数据集 (但牺牲了更多的记忆) 时,您可以使用
[&lt;文件目录( I) &gt; true&lt;/fileTable InMemory &gt;] (中文(简体) ). (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;档案集)   
告诉 ERDDAP™ 保存文件信息表副本。
    * 当 ERDDAP™ 关闭并重新启动 : 它保存 EDD Table 从 Files 从需要重读所有的数据文件开始 。
    * 当重新装入数据集时, ERDDAP™ 只需读取已更改的新文件和文件中的数据。
    * 如果一个文件的结构与其他文件不同 (例如,一个变量的数据类型不同,或者一个值不同 " [单位](#units) " 属性) , (中文). ERDDAP 将文件添加到"坏"文件列表中. 有关文件问题的信息将写入 *大家长会* /logs/log.txt文件 (中文(简体) ).
    * 你不需要删掉这些文件 也不必用这些文件 一个例外是: 如果您仍在修改一个数据集的 datasets.xml 设置, 您可能想要删除这些文件以强制 ERDDAP™ 以重新读取所有文件,因为文件会被不同的读取/解释。 如果您真的需要删除这些文件, 您可以在 ERDDAP™ 正在运行。 (然后设置一个 [旗帜](/docs/server-admin/additional-information#set-dataset-flag) 以便尽快重新装入数据集。) 不过, ERDDAP™ 通常注意到: datasets.xml 信息与文件不符 表格信息并自动删除文件表格。
    * 如果你想鼓励 ERDDAP™ 以更新存储的数据集信息 (例如,如果您只是在数据集的数据目录中添加、删除或更改一些文件) ,使用 [旗帜系统](/docs/server-admin/additional-information#flag) 强制 ERDDAP™ 以更新缓存文件信息。
         
##### 处理请求{#handling-requests-1} 
*    ERDDAP™ 表格数据请求可以限制任何变量。
    * 当处理客户端的数据请求时,EDDTable FromFiles可以快速在表格中以有效的文件信息查看哪些文件可能有相关数据. 例如,如果每个源文件都有一个固定位置浮标的数据,EDDTable FromFiles可以非常高效地确定哪些文件可能拥有一定经度范围和纬度范围内的数据.
    * 由于有效的文件信息表包括每个有效文件的每个变量的最低值和最大值,EDDTableFromFiles往往能够相当高效地处理其他查询. 例如,如果部分浮标没有气压传感器,客户端请求提供空气压力的数据&#33;=NaN,EDDTable FromFiles可以有效确定哪些浮标有气压数据.
         
##### 更新缓存文件信息{#updating-the-cached-file-information-1} 
每当重新装入数据集时,都会更新缓存的文件信息.
    
* 数据集定期重新装入,由&lt;重新装入 EveryNiminutes &gt; 中的数据集信息 datasets.xml 。 。 。 。
* 任何时间都尽快重新装入数据集 ERDDAP™ 检测到您添加,删除, [抚摸'd](https://en.wikipedia.org/wiki/Touch_(Unix) 页:1 (更改文件的最后一个 修改时间) ,或更改数据文件。
* 如果您使用该数据集, 将尽快重新装入该数据集 [旗帜系统](/docs/server-admin/additional-information#flag) 。 。 。 。

当重新装入数据集时, ERDDAP™ 比较当前可用的文件到缓存文件信息表。 读取新文件并添加到有效文件表中. 已不存在的文件从有效的文件表格中丢弃 。 文件时间戳已更改的文件会被读取并更新其信息. 新表格取代了旧表格的内存和磁盘。
     
##### 错误文件{#bad-files-1} 
错误文件表和文件被宣布错误的原因 (已损坏的文件, 缺少变量, 错误的轴值等 。) 已发送到电子邮件 所有的东西 到电子邮件地址 (也许是你) 每次重新装入数据集时. 您应该尽快替换或修复这些文件 。
     
##### 缺少变量{#missing-variables-1} 
如果一些文件没有 dataVariable s 在数据集中定义 datasets.xml 块,没关系。 当 EDDTable FromFiles 读取其中之一文件时,它会表现为文件有变量,但有所有缺失的值.
     
##### 近实时数据{#near-real-time-data} 
* EDDTable FromFiles将最近数据的请求视为特殊案例. 问题在于: 如果构成数据集的文件经常更新,那么每次修改一个文件时,数据集很可能不会更新. 因此EDDTable FromFiles将不会意识到文件的更改. (你可以用这个 [旗帜系统](/docs/server-admin/additional-information#flag) ,但这可能导致 ERDDAP™ 几乎不断重装数据集 。 因此,在大多数情况下,我们不推荐.) 相反,EDDTable FromFiles通过下列系统处理: 何时 ERDDAP™ 在最近20小时内收到数据请求 (比如说,8小时前到现在) , (中文). ERDDAP™ 将搜索所有在过去20小时内有数据的文件。 因此, ERDDAP™ 不需要完全掌握所有文件的最新数据才能找到最新数据。 您仍应设置&lt;重新装入 –每分钟一次&gt;] (每分钟都装满) 价值相当小 (例如,60个) 但它不必是微小的 (例如,3项) 。 。 。 。
     
    *    **不建议** 组织文件中的近实时数据: 例如,如果您拥有一个存储众多站点数据的数据集 (或浮标,或轨迹,.) 多年来,你可以安排文件,例如每个站有一个文件。 但之后,每当一个站的新数据到达时,你必须读取一个大旧文件,写一个大新文件. 当 ERDDAP™ 重新装入数据集,它注意到一些文件已被修改,因此它完全读取了这些文件. 这是无效的。
         
    *    **建议** 组织文件中的近实时数据: 例如,将数据以块形式存储,一年中一个站/站/轨距的所有数据 (或一个月) 。 。 。 那么,当一个新的数据到来, 只有今年的文件 (或月数) 数据受到影响。
        
        * 最佳状态 : 使用 NetCDF 页:1 .nc 无限尺寸的文件 (时间) 。 。 。 然后,为了添加新数据,你可以仅仅附加新数据而无需读取和重写整个文件. 改变是非常高效的,本质上是解剖性的,所以文件的状态从来没有不一致.
        * 否则:如果你不能/不能使用 .nc 无限尺寸的文件 (时间) ,然后,当您需要添加新数据时,您必须读取并重写整个受影响的文件 (希望它很小,因为它只有一年 (或月数) 数据价值) 。 。 。 幸运的是,前些年的所有档案 (月数) 该站保持不变。
        
在这两种情况下,何时 ERDDAP™ 重新装入数据集,大多数文件没有变化;只有少数,小文件有变化,需要读取.
         
##### 目录{#directories-1} 
文件可以在一个目录中,也可以在一个目录及其子目录中 (递归) 。 。 。 如果有大量文件 (例如, &gt;1,000) ,操作系统 (并因此从文件中生成 EDD 表格) 如果您将文件存储在一系列子目录中, 操作效率会高得多 。 (每年一个,或每月一个,用于文件非常频繁的数据集) ,这样在给定目录中就不会有大量的文件。
     
##### 远程目录和 HTTP 区域请求{#remote-directories-and-http-range-requests-1} 
*    **远程目录和 HTTP 区域请求**   (AKA 字节服务, 字节范围请求) - —— - 说
     EDDGrid 来自NcFiles的EDD Table from MultidimNcFiles的EDD Table,来自NcFiles的EDD Table和来自NcCFFiles的EDD Table有时可以服务于来自的数据. .nc 远程服务器上的文件,如果服务器支持,则通过 HTTP 访问 [字节服务](https://en.wikipedia.org/wiki/Byte_serving) 通过 HTTP 范围请求 (字节服务的 HTTP 机制) 。 。 。 这是可能的,因为Netcdf -java (哪个 ERDDAP™ 用于读 .nc 文件) 支持从远程读取数据 .nc 文件通过 HTTP 范围请求。
    
     **别这样&#33;**   
相反,使用[&lt;缓存从Url&gt;系统] (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;我的宝贝) 。 。 。 。
    
##### 从Url 缓存{#cachefromurl} 
* [ ** &lt;来自Url的缓存 &gt; ** [ . ] (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;我的宝贝) - 怎么样?
全体 EDDGrid 从Files和所有 EDDTable FromFiles 数据集支持一组显示的标签 ERDDAP™ 下载和维护远程数据集所有文件的副本,或少数文件的缓存 (视需要下载) 。 。 。 。 **这是一个非常有用的特点。** 
    * 那个&lt;缓存 FromUrl &gt; 标记允许您从远程文件列表中指定包含远程数据集文件列表的 URL 。
        
        * THREDDS中的未分类数据集,例如,
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[ 2020-10-21 (中文(简体) ). 此服务器已不再可靠可用 。 \\] 
        * 未分类数据集 Hyrax 例如,
             [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/) 
        * 大多数类似Apache的目录列表,例如,
             [https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/) 
        * S3桶,例如,
             [https://noaa-goes17.s3.us-east-1.amazonaws.com/](https://noaa-goes17.s3.us-east-1.amazonaws.com/)   
然而,这可能需要一个AWS账户和更多的设置.
见 [与 S3 弹匣一起工作 ERDDAP™ ](#working-with-aws-s3-files) 。 。 。 。
而且,你通常不需要使用缓存 如果文件为 ASCII 文件, 则 FromUrl 有 S3 桶中的文件 (例如,.csv) ,因为 ERDDAP™ 可以通过流直接读取桶中的数据。
        
         ERDDAP™ 将在数据集中复制或缓存这些文件&lt;文件目录。 如果您需要支持其它类型的远程文件列表 (例如,FTP) 请通过电子邮件向克里斯提出请求。 约翰在Noaa.gov。
        
        * 默认值&lt;缓存FromUrl &gt; 标记无效 。 如果您没有指定值 。&lt;缓存 FromUrl &gt; 标记, 本数据集不会使用副本/缓存系统 。
        * 如果数据集&lt;文件 Regex &gt; 设置不是... ERDDAP™ 将只下载符合文件Regex的文件。
        * 如果数据集&lt;递归性&gt; 设置是真实的, 远程文件处于子目录中 , ERDDAP™ 将查找符合数据集的远程子目录 [&lt;路径Regex &gt;] (&#123;\fn方正黑体简体\fs18\b1\bord1\\shad1\\3cH2F2F2F&#125;"Pathregex &#123;\fn方正黑体简体\fs18\b1\bord1\\shad1\\3cH2F2F2F&#125;"Pathregex") ,在本地创建相同的目录结构,并将本地文件放在同一个子目录中。
        * 在生成时 Xml,如果您指定一个&lt;缓存来自Url &gt; 值,生成 数据集 Xml 将创建本地&lt;fileDir&gt; 目录和复制 1 远程文件。 生成数据 Xml 然后生成 datasets.xml 基于样本文件的块 (指定样本 文件=无) 。 。 。 。
        * 如果数据源为远程 ERDDAP™ 编辑 [ EDDGrid 从埃尔达普](#eddfromerddap) 或 [来自Erddap的EDD表](#eddfromerddap) 改为&lt;缓存从Url&gt;. 那边,你的地方 ERDDAP™ 将显示有数据集,但不需要在本地存储任何数据。 使用的唯一原因&lt;要从远程获取数据 ERDDAP™ 当您有其他原因想要本地数据文件副本时。 在这种情况下:
            * 此数据集将尝试订阅远程 ERDDAP 这样,该数据集的更改将称为此数据集的旗 Url,导致此本地数据集重新装入并下载已更改的远程文件. 因此,在对远程数据集进行修改之后,本地数据集将很快更新。
            * 您应该电子邮件远程管理器 ERDDAP™ 请求 datasets.xml 用于远程数据集,以便您在本地 ERDDAP™ 看起来像远程的数据集 ERDDAP 。 。 。 。
        * 如果数据源为远程 ERDDAP™ ,本地数据集将尝试订阅远程数据集。
            * 如果订阅成功, 只要远程 ERDDAP 重新装入并拥有新数据,它会联系旗下URL来获取此数据集,使其重新装入并下载新的和/或更改的数据文件.
            * 如果订阅失败 (无论出于什么原因) 或者如果仅仅想要确保本地数据集是最新的,可以设置 [旗帜](/docs/server-admin/additional-information#flag) 对于本地数据集,它会重新装入,从而检查新的和(或)已更改的远程数据文件。
        * 如果数据源不是远程 ERDDAP :当重新装入时,数据集会检查新的和/或更改的远程文件. 这通常由[&lt;重新装入 –每分钟一次&gt;] (每分钟都装满) 。 。 。 但如果你知道什么时候有新的远程文件,你可以设置 [旗帜](/docs/server-admin/additional-information#flag) 用于本地数据集,因此它将重新装入和检查新的和/或更改的远程数据文件。 如果在一天的某个时间经常发生 (例如,上午7时) ,你可以做一个 cron 工作来使用 curl 联系国旗 此数据集的 Url, 因此它将重新装入并检查新的和/或更改的远程数据文件 。
    * 那个&lt;缓存SizeGB&gt;标记指定了本地缓存的大小. 你可能只需要在使用云存储系统时使用这个 [亚马逊 S3](https://aws.amazon.com/s3/) 是一个常用的存储系统,属于 [亚马逊网络服务 (自动取款机) ](https://aws.amazon.com/) 。 。 。 。 默认值为 -1.
        * 如果数值是&lt;=0 (单位:千美元) (例如, -1 的默认值) , (中文).
             ERDDAP™ 将下载并维护 **完整副本** 数据集中所有远程数据集的文件&lt;文件目录。
            * 这是尽可能建议采用的设置。
            * 每次重新装入数据集,它都会比较远程文件与本地文件的名称,大小,以及最后修改的时间,并下载任何新旧或已更改的远程文件.
            * 如果远程服务器上的文件消失 ERDDAP™ 将不会删除相应的本地文件 (否则 如果远程服务器暂时出了问题 ERDDAP™ 可能删除部分或全部本地文件 &#33;) 。 。 。 。
            * 使用此设置,通常您会设定&lt;将 Everynimillis &gt; 更新到 -1, 因为数据集知道它什么时候复制了新的数据文件。
        * 如果值为 &gt; 0,则
             ERDDAP™ 将根据需要将文件从远程数据集下载到本地 **缓存** (在数据集中)&lt;fileDir &gt;),阈值大小为指定的GB数.
            * 缓存必须足够大, 以保存至少几个数据文件 。
            * 一般来说,缓存越大,越好,因为下一个请求的数据文件将更有可能已经存在于缓存中.
            * 缓存只应在 ERDDAP™ 正在云计算服务器中运行 (例如, AWS 计算实例) 和云存储系统中的远程文件 (例如,AWS S3) 。 。 。 。
            * 当本地文件使用的磁盘空间超过缓存时 尺寸GB, ERDDAP™ 很快就会 (也许不是马上) 删除一些缓存文件 (目前,基于最近使用最少的 (路轮) 算法) 直到本地文件使用的磁盘空间&lt;0.75QQ 缓存SizeGB ("目标") 。 。 。 是的,有的LRU表现非常糟糕-- 没有完美的算法。
            *    ERDDAP™ 永远不会试图删除缓存文件 ERDDAP™ 过去10秒开始使用. 这是一个处理缓存系统的不完善的系统,数据文件阅读器系统只是松散的集成. 因为这个规则, ERDDAP™ 可能无法删除足够的文件以达到它的目标,在这种情况下,它会打印一个WARING到log.txt文件,系统会浪费大量时间试图对缓存进行prune,而且缓存中文件的大小可能大大超过缓存SizeGB. 如果发生这种情况, 请使用更大的缓存 。
            * 目前, ERDDAP™ 永远不要检查远程服务器是否有本地缓存中文件的更新版本 。 如果您需要此功能, 请通过电子邮件 Chris 。 约翰在Noaa.gov。
        * 虽然使用相同的标记名称可能意味着复制系统和缓存系统使用相同的基础系统,但这是不正确的.
            * 复制系统主动开始任务Thread任务,每次重新装入数据集时下载新文件和更改文件. 只有实际复制到本地目录的文件可以通过 ERDDAP™ 数据集。
            * 缓存系统每次重新装入数据集时都会得到远程文件列表,并假装所有这些文件都可以通过该程序获取. ERDDAP™ 数据集。 有趣的是,所有远程文件甚至都出现在数据集的/files/网页中,并可供下载 (虽然也许只是在文件从远程服务器下载到本地缓存时出现延迟之后。) 
        * 使用缓存的数据集SizeGB [无线](#nthreads) 设置大于 1,因为这将使数据集能够一次下载超过1个远程文件。
    * 那个&lt;缓存PartialPathRegex &gt; 标记是一种很少使用的标记,它可以指定数据集的[&lt;路径Regex &gt;] (&#123;\fn方正黑体简体\fs18\b1\bord1\\shad1\\3cH2F2F2F&#125;"Pathregex &#123;\fn方正黑体简体\fs18\b1\bord1\\shad1\\3cH2F2F2F&#125;"Pathregex") 。 。 。 。 默认无效 。
        * 只有在您正在通过默认复制整个数据集时才使用此功能&lt;缓存SizeGB &gt; 值为 - 1 。&lt;缓存SizeGB &gt; 值为 &gt; 1, 这将被忽略, 因为它不敏感 。
        * 见[关于&lt;路径Regex &gt;] (&#123;\fn方正黑体简体\fs18\b1\bord1\\shad1\\3cH2F2F2F&#125;"Pathregex &#123;\fn方正黑体简体\fs18\b1\bord1\\shad1\\3cH2F2F2F&#125;"Pathregex") 用于指导如何构建正则ex。
        * 如果指定了,则每次重新装入数据集时都会使用它,除非第一次在一个月初重新装入数据集.
        * 当远程数据集被存储在子目录的迷宫中,以及当绝大多数文件即使有变化也很少变化时,这一点是有用的. (单位:千美元)&lt;咳嗽 &gt; 美国航天局&lt;(咳嗽) 例如,您可以指定&lt;缓存PartialPathRegex &gt; ,它只匹配当年或当月。 这些正则名称非常难于说明,因为所有部分和完整路径名称都必须与&lt;缓存PartialPathRegex &gt; 因为&lt;缓存PartialPathRegex &gt; 必须使用远程 URL 和本地目录 。 一个真实的例子是:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
上面的样本 URL 有基于年份的子目录文件 (例如,2018年。) 年数 (例如,001、002、.365或366) 。 。 。 。
注意到&lt;缓存PartialPathRegex &gt; 从... 开始,
然后有一个特定的子目录,这是远程 URL 和本地目录通用的,例如 /v4\\ 1
然后有一系列嵌入式捕捉组 第一个选项就是什么
而第二个选项是一个特定的值。
            
以上示例只匹配2018年第二个10天的目录,例如,.
            https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[ 2020-10-21 (中文(简体) ). 此服务器已不再可靠可用 。 \\]   
和011,012,019号
             (看这个 [正则文档](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) 和 [regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) 。 。 。 。)   
如果您需要帮助创建&lt;缓存PartialPathRegex &gt;,请发送电子邮件&lt;缓存从Url&gt;到 Chris. 约翰在Noaa.gov。
            
        * 共同办法: 如果你想使用的话&lt;缓存PartialPathRegex &gt;, 最初不要使用, 因为您想要 ERDDAP™ 以下载所有文件。 之后 ERDDAP™ 已下载所有文件,请添加到数据集的块中 datasets.xml 。 。 。 。
             
##### 千个文件{#thousands-of-files} 
如果你的数据集有成千上万的文件, ERDDAP™ 对从该数据集获取数据的请求作出反应可能很慢。 这里有两个问题:
 

1. 每个目录的文件数量 。
内部, ERDDAP™ 无论 n 文件在一个目录中还是分散在几个目录中,其运行速度都是一样的.
     
但有一个问题: 给定目录中的文件越多, 操作系统返回目录中文件列表的速度就越慢 (每个文件) 改为 ERDDAP 。 。 。 。 反应时间可能是O (n 对数n) 。 。 。 很难说一个目录中有多少文件是太多的,但一万可能太多. 因此, 如果您的设置正在生成大量文件, 这里可能有一个建议 : 将文件放入逻辑排列的子目录 (例如,车站或车站/年) 。 。 。 。
    
使用子目录的另一个原因: 如果用户想要使用 ERDDAP 因为 "files" system for find the older file name for station X,如果文件处于站/年子目录中,则更快速,更有效率,因为需要传输的信息要少得多.
    
2. 文件总数.
对于表格数据集, ERDDAP™ 跟踪每个文件中每个变量的数值范围。 当用户提出要求时, ERDDAP™ 必须读取所有文件中可能与用户请求相匹配的所有数据。 如果用户在有限的时间内询问数据 (例如,一天或一个月) ,则 ERDDAP™ 在您的数据集中不需要打开太多的文件 。 但有些极端的情况 几乎每个文件都有匹配的数据 (例如,当水温度=13.2C时。) 。 。 。 。 既然这样 ERDDAP™ 一点时间 (HDD 上的搜索时间, 读取文件头的时间) 只是为了打开给定文件 (如果目录中有大量文件, 则更多) ,如果档案总数 ERDDAP™ 不得不打开非常大。 即使打开1000个文件也需要大量时间. 因此,定期将日常文件合并成更大的块有好处 (例如,1个车站1年) 。 。 。 我知道,由于各种原因,你可能不想这样做,但这确实导致更快的反应。 在极端情况下 (例如,我处理一个GTSPP数据集,该数据集有~3500万个源文件) ,服务大量源文件的数据是不切实际的,因为 ERDDAP '对简单的查询的回答需要几个小时,并使用吨内存. 通过将源文件合并到小数字 (给GTSPP,我现在有720个,每个月2个) , (中文). ERDDAP™ 可以相当迅速地作出反应。 见 [百万个文件](#millions-of-files)   
     

N. B. 固态驱动器是伟大的&#33; 最快,最简单,最便宜的帮助方式 ERDDAP™ 处理大量 (小型) 文件将使用固态驱动器。 见 [固态驱动器是伟大的&#33;](/docs/server-admin/additional-information#solid-state-drives)   
     
##### 百万个文件{#millions-of-files} 
* 一些数据集拥有数百万个源文件. ERDDAP™ 可以处理,但结果参差不齐。
    
    * 对于仅涉及[&lt; subsetVariables &gt;] (中文(简体) ). (# 亚位变量) , (中文). ERDDAP™ 已经从数据文件中提取并存储在一个文件中的所有所需信息,因此它能够非常非常非常迅速地作出反应。
    * 对于其他请求, ERDDAP™ 可以扫描数据集 [缓存的文件信息](#cached-file-information) 并找出只有少数文件可能有与请求相关的数据,从而迅速作出反应。
    * 但对于其他请求 (例如,水温度=18°C) * 任何档案可能有相关数据, ERDDAP™ 需要打开大量文件,看每个文件是否有与请求相关的数据。 文件依次打开。 在任何操作系统和任何文件系统中 (除了固态驱动器) 这需要很长时间 (这样 ERDDAP™ 慢慢回复) 并真正连接到文件系统 (这样 ERDDAP™ 缓慢回应其他请求) 。 。 。 。
    
幸运的是,有一个解决办法。
    
    1. 设置非公用数据集 ERDDAP™   (你的私人电脑?) 。 。 。 。
    2. 创建并运行一个请求一系列的脚本 .nc CF 文件,每个文件都有一大块数据集,通常是一个时间段 (例如,特定月份的所有数据) 。 。 。 选择时间段, 所有产生的文件都小于 2GB (但希望能超过1GB) 。 。 。 如果数据集有近实时数据,请运行脚本以重生成当前时间段的文件 (例如,本月) 经常 (每10分钟? 每个小时?) 。 。 。 。 请求 ERDDAP™ (单位:千美元) .nc CF 文件创建 NetCDF 页:1 .nc 使用 [CF 数字 断层采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 相邻的标记矩阵数据结构)。
    3. 设置一个 [来自 NcCFF 的 EDD 表格](#eddtablefromnccffiles) 公众数据集 ERDDAP™ 数据从 .nc  (CF 数字) 文档。 ERDDAP™ 可以非常快地从这些文件中提取数据. 既然现在有几十个或几百个 (而不是数百万) 文件,即使 ERDDAP™ 必须打开所有的文件,它可以这样做很快。
    
是的,这个系统需要一些时间和努力来建立,但它非常,非常好。 大多数数据请求的处理速度可以比以前快100倍.
     \\[ 鲍勃知道这是个可能性,但首先这样做的却是凯文·奥布莱恩(Kevin O'Brien),并表明它效果很好. 现在, Bob将这个用于GTSPP数据集,该数据集拥有约1800万个源文件,并且是 ERDDAP™ 现在通过大约500个 .nc  (CF 数字) 文档。 \\] 
    
N. B. 固态驱动器是伟大的&#33; 最快,最简单,最便宜的帮助方式 ERDDAP™ 处理大量 (小型) 文件将使用固态驱动器。 见 [固态驱动器是伟大的&#33;](/docs/server-admin/additional-information#solid-state-drives)   
     
    
##### 宏大的文件{#huge-files} 
* 一个巨大的数据文件 (特别是巨大的 ASCII 数据文件) 会导致记忆错误。 如果这就是问题所在,那就应该很明显,因为 ERDDAP™ 将无法装入数据集。 如果可行,解决方案是将文件分割成多个文件. 理想情况下,您可以将文件分割成逻辑块. 例如,如果文件有20个月的数据值,则将其分为20个文件,每个文件有1个月的数据值. 但即使主文件被任意分割,也有优势. 这种办法有多种好处:(a) 这将将读取数据文件所需的内存减少到1/20th,因为每次只读一个文件. (b) 财务 经常 ERDDAP™ 能够更快地处理请求,因为它只需要查看一个或几个文件就可以找到特定请求的数据. (c) 国家 如果数据收集正在进行,那么现有的20个文件可以保持不变,你只需要修改一个,小的,新的文件就可以将下一个月的数据值添加到数据集.
     
##### FTP 问题/咨询{#ftp-troubleadvice-1} 
* 如果您是 FTP 新的数据文件到 ERDDAP™ 服务器时 ERDDAP™ 正在运行, 有可能 ERDDAP™ 将在FTP过程中重新装入数据集。 这种事发生得比你想象的还频繁&#33; 如果发生这种情况, 文件将会显得有效 (它有一个有效的名称) ,但文件无效。 若为 ERDDAP™ 尝试从该无效文件读取数据,因此产生的错误将导致文件被添加到无效文件的表格中。 这可不妙 为了避免这个问题, 在 FTP 处理文件时使用临时文件名, 例如 ABC2005 .nc XQTEMP. 然后, 文件Name Regex 测试 (见下文) 将显示这不是一个相关的文件。 FTP进程完成后,将文件重命名为正确的名称. 重命名过程会让文件在瞬间变得相关.
    
##### 文件名称提取{#file-name-extracts} 
 \\[ 这个功能是DEPRECATED的. 请使用 [\\*\\*虚伪文件Name sourceName ](#filename-sourcenames) 相反。 \\]   
EDDTable FromFiles 拥有一个从每个文件名中提取字符串并利用它来制作伪数据变量的系统. 目前,还没有将这些字符串解释为日期/时间的系统. 有多个XML标记可以设置这个系统. 如果您不需要此系统的一部分或全部, 请不要指定这些标记或使用"" 值 。

* extractRegex 是一个 [正则表达式](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) 用于识别要从文件名开头删除的文本。 只有在正则ex匹配时才会被删除 。 这通常以“ ^” 开头, 以匹配文件名的开头 。
* 员额 extractRegex是一个正则表达式,用于识别要从文件名末尾删除的文本. 只有在正则ex匹配时才会被删除 。 这通常以"$"结尾,以匹配文件名的结尾.
* 提取Regex 如果存在, 此正则表达式将使用在 ExtractRegex 和 ExtractRegex 之后, 以识别要从文件名中提取的字符串 (例如, stationID ) 。 。 。 如果正则ex不匹配,则使用整个文件名 (减前列和后列 摘录) 。 。 。 使用".\\*"来匹配在ExtractRegex和后ExtractRegex之后留下的全部文件名.
* 栏 NameFortract是提取的字符串的数据列源名称. 页:1 dataVariable 用这个 [ sourceName ](#sourcename) 必须是在 dataVariable s 列表 (,但通常为字符串) 。 。 。 。

例如,如果一个数据集的文件有像 XYZABL 这样的名称 .nc , XYZBaker 键 .nc , XYZCharlie 语录 .nc ,您想要创建一个新的变量 ( stationID ) 当每个文件被读取时, 其中将包含站名 ID 值 (艾波,贝克,查理, . .  ....) 从文件名中提取, 您可以使用这些标签 :

*   &lt;预览&lt;/前置记录 &gt;
初始 ^ 是一个正则表达式特殊特性,它迫使 ERDDAP™ 要查找文件名开头的 XYZ 。 这使得 XYZ 如果在文件名的开头找到, 将被删除 (例如文件名 XYZAble .nc 变成Able .nc ) 。 。 。 。
*   &lt;输出后regex &#123;&#125; .nc (单位:美元)&lt;/后排出记录 &gt;
结尾的$是正则表达式特殊性,它迫使 ERDDAP™ 要寻找 .nc 在文件名末尾。 由于 . 是一个正则表达式 特殊性 (匹配任意字符的) ,其编码为\\。 这里 (因为 2E 是某个时期的十六进制字符数) 。 。 。 。 这导致 .nc ,如果在文件名末尾找到,则删除 (例如,部分文件名 备 .nc 变成Able) 。 。 。 。
*   &lt;提取Regex &gt;.\\*&lt;/摘录Regex &gt;
.QQ 正则表达式匹配所有剩余字符 (例如,部分文件名 Able 成为第一个文件的摘录) 。 。 。 。
*   &lt;列名称 stationID &lt;/ 栏名Name Extract &gt;
这说明 ERDDAP™ 创建新源列 stationID 当读取每个文件时。 给定文件的每行数据都会从文件名中提取文本 (比如说, 备) 作为 stationID 栏。

在大多数情况下,这些提取标记的值很多,会产生相同的结果——正则表达式非常灵活. 但是,在少数情况下,只有一种方法可以取得预期的结果。
     
##### 修道会 sourceName 编号{#pseudo-sourcenames} 
每个数据集中的每个变量 ERDDAP™ 有[&lt; sourceName &gt;] (中文(简体) ). (# 来源名称) 指定变量的来源名称。 EDD Table FromFiles 支持一些伪 sourceName 从其他地方提取值的 s (例如文件的名称或全局属性的值) 并促进该值成为该数据块的恒值列 (例如,该文件的数据表) 。 。 。 对于这些变量,您必须通过[&lt;数据类型&gt;] (# 数据类型) 标记 。 如果提取的信息是日期时间字符串,请指定日期时间字符串的格式 [单位属性](#string-time-units) 。 。 。 。 伪 sourceName 选项是:
 
###### 全球: sourceName 编号{#global-sourcenames} 
每个源数据文件中的全局元数据属性可以被推广成为数据的一栏. 如果一个变量&lt; sourceName &gt; 有格式
```
        <sourceName>global:*attributeName*</sourceName>
```
然后当 ERDDAP™ 从文件中读取数据, ERDDAP™ 将查找该名称的全球属性 (例如,个人信息) ,并创建一个包含属性值的列。 当属性在不同源文件中有不同的值时,这一点是有用的,因为否则用户只会看到整个数据集的其中一个值. 举例来说,
```
        <sourceName>global:PI</sourceName>
```
当你宣传一个属性成为数据时, ERDDAP™ 删除相应的属性。 这样做是恰当的,因为每个文件中的数值可能不同;而在汇总数据集中,则 ERDDAP™ 它只有一个价值。 如果您想要, 您可以通过添加 。&lt;名称=" *属性 名称* " &gt; *新设 数值* &lt;/att&gt; 到数据集的全球[&lt; addAttributes &gt;] (中文(简体) ). (# 属性) 。 。 。 。 对于全球属性 ERDDAP™ 例如,需要机构,您必须添加属性的新值。
     
###### 变量 : sourceName 编号{#variable-sourcenames} 
每个文件中一个变量的元数据属性可以被提升为数据列. 如果一个变量&lt; [ sourceName ](#sourcename) QQ 具有格式
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
然后当 ERDDAP™ 从文件中读取数据, ERDDAP™ 将查找指定的属性 (例如,身份证) 指定变量 (例如,文书) ,并创建一个包含属性值的列。 父变量 (例如,文书) 不需要成为其中之一 dataVariable s 包含在数据集定义中 ERDDAP 。 。 。 。 举例来说,
```
        <sourceName>variable:instrument:ID</sourceName>
```
当属性在不同源文件中有不同的值时,这一点是有用的,因为否则用户只会看到整个数据集的其中一个值.

当你宣传一个属性成为数据时, ERDDAP™ 删除相应的属性。 这样做是恰当的,因为每个文件中的数值可能不同;而在汇总数据集中,则 ERDDAP™ 它只有一个价值。 如果您想要, 您可以通过添加 。&lt;名称=" *属性 名称* " &gt; *新设 数值* &lt;/att&gt; 到变量的 [&lt; addAttributes &gt;] (中文(简体) ). (# 属性) 。 。 。 。 对于属性 ERDDAP™ 要求,例如, ioos\\_category   (取决于你的设置) ,您必须添加属性的新值。
        
###### 文件Name sourceName 编号{#filename-sourcenames} 
您可以提取文件的部分文件Name 并推广为一列数据 。 此伪格式 [&lt; sourceName &gt;] (中文(简体) ). (# 来源名称) 这是
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
举例来说,
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
当 EDDTable FromFiles 从文件中读取数据时, 它会确保文件Name (例如,A201807041442.slcpV1号机 .nc ) 匹配指定的正则表达式 ("regex" (英语).) 并提取指定的 (在这种情况下,第一个) 抓取组 (由括号环绕的部分) 例如"201804041442". (看这个 [正则文档](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) 和 [regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) 。 。 。 。) regex可以被指定为带有或不带周围引文的字符串. 如果将正则ex指定为带周围引号的字符串,则字符串必须是 [JSON 风格字符串](https://www.json.org/json-en.html)   (用\\ 字符逃脱的特殊字符) 。 。 。 捕获组编号通常为 1 (第一个抓取组) ,但可能是任何数字。
     
###### 路径Name sourceName 编号{#pathname-sourcenames} 
您可以提取文件的全部路径 名称 (/ 目录/文件Name.ext) 并将此作为数据栏目。 此伪格式 [&lt; sourceName &gt;] (中文(简体) ). (# 来源名称) 这是
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
举例来说,
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
当 EDDTable FromFiles 从文件中读取数据时, 它会确保完整路径Name (例如,/data/myDatasetID/BAY17/B201807041442 .nc 。 。 。 对于此测试,目录分离器将永远是 '/' ,从“\\\”  ') 匹配指定的正则表达式 ("regex" (英语).) 并提取指定的 (在这种情况下,第一个) 抓取组 (由括号环绕的部分) 例如"BAY17". (看这个 [正则文档](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) 和 [regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) 。 。 。 。) regex可以被指定为带有或不带周围引文的字符串. 如果将正则ex指定为带周围引号的字符串,则字符串必须是 [JSON 风格字符串](https://www.json.org/json-en.html)   (用\\ 字符逃脱的特殊字符) 。 。 。 捕获组编号通常为 1 (第一个抓取组) ,但可能是任何数字。
         
##### "0档案" 错误消息{#0-files-error-message-2} 
* 如果你运行 [生成 DatasetsXml](#generatedatasetsxml) 或 [达斯德](#dasdds) ,或者如果你试图加载 EDD表从... 文件数据集在 ERDDAP™ ,然后得到“0文件”错误消息,表明 ERDDAP™ 在目录中找到 0 匹配文件 (当你认为目录中有匹配的文件时) 数字 :
    * 检查文件是否真的在目录中 。
    * 检查目录名称的拼写.
    * 检查文件Name Regex. 它真的,真的很容易 犯错误与regexes。 为测试目的, 请尝试符合所有文件名的 regex 。 (看这个 [正则文档](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) 和 [regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) 。 。 。 。) 
    * 检查运行程序的用户 (例如,用户=tomcat (? 。 。 。) 用于托姆卡特/ ERDDAP ) 拥有这些文件的“ read” 权限 。
    * 在一些操作系统中 (例如, SELinux) 并取决于系统设置,运行程序的用户必须拥有"读取"权限,以获得通往拥有文件的目录的整个目录.
         
##### 标准化 什麽?{#standardizewhat} 
* 当 EDDTable FromFiles 的任何子类集合一组源文件时,对于一个给定的变量,所有源文件 MUST 都有多个属性的相同属性值: scale\\_factor , (中文). add\\_offset ,未签名, missing\\_value 和单位). 考虑一下:如果一个文件有windSpeed units=knots,另一个文件有windSpeed units=m/s,那么两个文件的数据值就不应该包含在同一汇总数据集中. 因此,当EDDTable FromFiles首次创建数据集时,它会读取一个文件中的属性值,然后拒绝所有对这些重要属性有不同值的文件. 对于大多数文件集来说,这不是一个问题,因为所有变量的属性都是一致的. 然而,对于其他文件集来说,这会导致1%,10%,50%,90%,甚至99%的文件被作为"坏"文件拒绝. 这是麻烦。
    
EDDTable From 文件有处理这一问题的系统:标准化 你说什么? 标准化 设置让 EDD Table From Files 在读取文件后, 在 EDD Table From Files 查看属性以查看其是否一致之前, 立即将文件标准化 。
    
翻转的一面是:如果数据集没有这个问题,就不要使用标准化 你说什么? 标准化 有潜在风险的东西 (讨论如下:) 效率低下。 所以如果你不需要标准化的功能 没有必要面对潜在的风险和效率低下。 最大的效率低下是: 数据集使用哪些选项,这意味着源文件以显著不同的方式存储数据 (例如,不同 scale\\_factor 和 add\\_offset ,或者使用不同格式的时间字符串) 。 。 。 因此,对于用户请求中的一项特定限制,没有办法 ERDDAP™ ,可以对所有源文件实施单一源级约束。 这么说 ERDDAP™ 只有在更高一级适用受影响的限制。 这么说 ERDDAP™ 在应用更高,目的级的限制之前,必须先从更多的文件中读取数据. 因此请求使用标准化的数据集 需要更长的时间处理。
    
要使用此系统, 您需要指定
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
输入 [ datasets.xml 用于 EDD Table 从... 文件数据集](#eddtablefromfiles-skeleton-xml) (在&lt;数据集 &gt; 标记)。
    
那个 *标准化 什麽?* 值指定要尝试应用哪些修改 EDDTable FromFiles 。 变化是以下几种组合的总和:
    
1. 卸货
这样做可以使文件中的数字列标准化:
    * 若为 scale\\_factor 和(或) add\\_offset 属性存在,将其删除并应用到数据值解析中。
    * 解包包装属性 (例如,实 实 实 实 实 actual\\_range , (中文). data\\_min , (中文). data\\_max 数据范围 valid\\_min , (中文). valid\\_max , (中文). valid\\_range ) ,如果存在,如果变量被包,如果属性值被包 (这很棘手,但很可靠) 。 。 。 。
    * 如果 QQ 过滤和/或 missing\\_value 中,将这些数据值转换为 ERDDAP 缺少的“ 标准” 值: 整数类型的 MAQVALUE (例如,127个字节,32,767个字节,2,147,483,647个字节,9223372036854775807 长) 和纳恩为双胞胎和浮点。
    * 删除旧的 QQ 过滤和/或 missing\\_value 属性 (如果有的话) ,并替换为 QQFillValue= \\[ 联合国 ERDDAP™ 标准缺失值 \\] 。 。 。 。
         
2. 数字时代标准化
如果一个数字列有 CF 风格的数字时间单位 (" , " *时间 单位* 自此以来 *时间* ",例如,"1900-01-01以来的日子".) 转换日期 时间值进入 "seconds since 1970-01-01T00:00:00Z" 值和更改单位属性以表示此值。
如果选中了, 并且这个变量有可能 scale\\_factor 或 add\\_offset , 1 也必须选择。
     
3. 应用字符串 missing\\_value   
如果字符串列有 & &gt; FillValue 和/或 missing\\_value 属性,将这些值转换为“”并删除属性。
     
4. 查找数字 missing\\_value   
如果数字栏没有QQFillValue 或 missing\\_value 属性,此选项试图识别一个未定义的数字 missing\\_value   (例如,999、9999、1e37f) 并将其实例转换为“标准”值 (MAQVALUE 表示整数类型, NAN 表示双倍和浮动) 。 。 。 。
     **此选项有风险:** 如果最大或最小的有效数据值看起来像一个缺失值 (例如,1999年) ,然后将这些有效的数据值转换为缺失值 (例如纳恩) 。 。 。 。
     
5. 将字符串"N/A"改为""
对于每个字符串列,将通常用来表示缺失字符串值的数个字符串转换为". 目前,这里寻找的是".",".","-","??","N/A","NA","None","不适用","null","未知","不明". 字符串搜索对大小写不敏感,并在字符串修剪后应用. "nd"和"other"具体不在列表中.
     **此选项有风险:** 您认为是有效值的字符串可以转换为".
     
6. 标准化为字符串 ISO 8601 日期时间
对于每个字符串列,尝试转换非纯数字字符串日期 Times (例如"Jan 2, 2018"(日语: 2018).) 到 ISO 8601 字符串日期时间 ("2018-01-02" (中文(简体) ).) 。 。 。 。
     **说明** ,该列的所有数据值必须使用相同的格式,否则,此选项不会对某一列作任何修改。
     **此选项有风险:** 如果有一个列带有字符串值, 恰好看起来像一个共同的日期 时间格式,它们将被转换为ISO 8601 String dateTimes.
     
7. 将压缩日期时间标准化到 ISO 8601 日期时间
对于每个字符串或整数类型列,尝试转换纯数字字符串日期 Times (例如,"20180102") 到 ISO 8601 字符串日期时间 ("2018-01-02" (中文(简体) ).) 。 。 。 。
     **说明** ,该列的所有数据值必须使用相同的格式,否则,此选项不会对某一列作任何修改。
     **此选项有风险:** 如果有一个列的值不是紧凑的日期 时间但看起来像紧凑的日期 Times,它们将被转换成ISO 8601 String date Times.
     
8. 单位标准化
这试图使每个变量的单位字符串标准化。 例如,"米每秒","米/秒". "m.s^-1" , (中文). "m s-1" ,"ms-1"将全部转换为"ms-1". 这不会改变数据值. 这很有效 UDUNITS 单位字符串,但可能与无效或复杂的字符串有问题。 可以通过在其中指定从对到对的具体处理问题&lt;单位标准化 &gt; 输入 ERDDAP 因为
     \\[ 移动猫 \\] /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml文件. 请发电子邮件给克里斯 John at noaa.gov 这样它们就可以并入默认消息.xml.
     **此选项有风险:** 这可能会操纵一些复杂或无效的单位;然而,如果问题发生,您可以利用上述工作周旋来规避问题。
         
    
标准化的默认值 什么是0, 它不做任何事情。

如果/当您更改标准化值时 下一次重装数据集时 ERDDAP™ 将重读数据集的所有数据文件,以便重建包含每个文件信息的小型数据库。 如果数据集有大量文件,这将需要很长时间.
    
注释:

* 一件棘手的事情是...
标准化 源文件中所有列所用的设置 。 因此,例如,使用#2048可能会成功地将一列紧凑的字符串日期Times转换成ISO 8601 紧凑日期Times,但它也可能错误地将一列和字符串一起转换成恰好是紧凑的日期Times.
     
*    datasets.xml 生成数据 Xml - 翻译:
将设置校正到 datasets.xml 使您的数据集按照您想要的方式工作。 最佳办法 (一如既往) 为:
    1. 使用 [生成 DatasetsXml](#generatedatasetsxml) 并具体说明标准化的价值 你想用的东西
    2. 使用 [达斯德](#dasdds) 确保数据集正确加载并反映标准化 您指定的什么设置 。
    3. 输入时用手测试数据集 ERDDAP™ 确保受影响的变量如预期的那样发挥作用。
         
* 风险 -
256及以上选项的风险更大,即更有可能 ERDDAP™ 会做出不该做的改变 例如,选项 #2048 可能会意外转换一个带有站点ID字符串的变量,这些变量都只是恰巧出现在 ISO 8601 "compact" 日期上 (例如,20180102号) 输入 ISO 8601 "extended" 日期 ("2018-01-02" (中文(简体) ).) 。 。 。 。
     
* 变化后缓慢...
由于标准化的价值 如果您更改了标准化, 哪些修改了 EDDTable FromFiles 对每个数据文件的数据值 设置什么, EDD Table FromFiles 将丢弃每个文件的所有缓存信息 (它包括每个文件中每个数据变量的分数和最大数) 并重读每个数据文件。 如果一个数据集有大量的文件,这可能非常耗时,所以数据集第一次重新装入需要很长时间. ERDDAP™ 更改后重新装入 。
     
* 高血压
选项 # 256 及以上使用 heuristics 来进行修改. 如果你遇到这样的情况, 高压分子做出一个不好的决定, 请通过电子邮件 描述问题 克里斯。 约翰在诺阿。 戈夫,这样我们就可以改善热力。
     
* 替代品 -- --
如果一个标准化的选项无法解决给定数据集的问题,你也许可以通过制作一个 [ .nc ml 文件](#ncml-files) 与每个数据文件并行,并定义文件中事物的更改,使文件一致。 然后,告诉EDD表 从... 用于聚合的文件数据集 .nc ML文件 存档
    
或者说,使用 [ NCO ](#netcdf-operators-nco) ,以便实际修改文件,使文件保持一致。
        
##### 年份、月份、日期、小时、分钟、秒的单独列{#separate-columns-for-year-month-date-hour-minute-second} 
表格数据文件很常见,在年份、月份、日期、小时、分钟、秒都有单独的栏目。 在此之前 ERDDAP™ v2.10,唯一的解决方案是编辑数据文件,将这些列合并为统一的时列. 与 ERDDAP™ 2.10+,您可以使用
[&lt; sourceName &gt;= *表达式* &lt; sourceName &gt;] (中文(简体) ). (# 来源名称) 告诉 ERDDAP™ 如何将源列合并成一个统一的时列,所以你不再需要编辑源文件了.
##### &lt;跳过标题Tregex & gt;{#skipheadertoregex} 
* [&lt;跳过标题Tregex &gt;] (&#123;\fn方正黑体简体\fs18\b1\bord1\\shad1\\3cH2F2F2F&#125;斯皮赫德·托雷格克斯) - —— - 说
选择。 (对于 EDD Table From Ascii Files 和 EDD Table From ColumnarAscii Files 数据集,仅限使用.)   
当 EDDTable FromAsciiFiles 读取一个数据文件时,它将忽略所有行到并包含匹配此正则表达式的行. 默认是",它不使用此选项. 一个例子是
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
它将忽略所有行,直至并包括一条以 " 开头的行 "\\*\\*"头的尽头"

当你使用这个标签,&lt;列名称&lt;firstDataRow &gt; 在读取文件前将标题删除。 例如,如果列名位于标题后面的行上,则使用列名Row=0。

如果您想要使用生成 数据集 带有需要此标签的数据集的 Xml :

1. 通过复制现有文件并删除标题来制作新的,临时的,样本文件.
2. 运行生成 数据集 Xml 并指定样本文件 。
3. 手动添加&lt;跳过页眉Togex &gt; 标记到 datasets.xml 块。
4. 删除临时,样本文件.
5. 使用数据集在 ERDDAP 。 。 。 。
##### &lt;跳过LinesRegex & gt; 键盘{#skiplinesregex} 
选择。 (对于 EDD Table From Ascii Files 和 EDD Table From ColumnarAscii Files 数据集,仅限使用.)   
当 EDDTable FromAsciiFiles 读取一个数据文件时, 它会忽略所有匹配此正则表达式的行 。 默认是",它不使用此选项. 一个例子是
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
它会忽略以"#"开头的所有行。

当你使用这个标签,&lt;列名称&lt;firstDataRow &gt; 在读取文件之前,似乎所有匹配行都已删除。 例如,即使文件开头有数行开头,例如“#”,您也会使用栏名Row=0。
    
#### 来自 Files 骨架 XML 的 EDD Table{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### 来自Ascii 服务的 EDD 表{#eddtablefromasciiservice} 
 [ **来自Ascii 服务的 EDD 表** ](#eddtablefromasciiservice) 基本上是一个刮屏器。 它旨在处理具有简单的网络服务的数据源,用于请求数据 (经常在网页上的 HTML 窗体) 并可以以某种结构化的 ASCII 格式返回数据 (例如,一个逗号分隔值或专栏的ASCII文本格式,通常与数据前后的其他信息一起) 。 。 。 。

EDDTable FromAscii Service是所有EDDTable FromAscii Service的超级类. 无法直接使用 EDDTable From Ascii Service. 相反,使用EDDTable FromAsciiService的子类来处理特定类型的服务:

*    [来自Ascii Servicicenos的EDD表](#eddtablefromasciiservicenos) 从 NOAA NOS的ASCII服务.

目前,不支持其他服务类型。 但是,如果其他服务以类似方式运作,支持这些服务通常相对容易。 有要求就联系我们

#### 细节{#details} 
以下信息适用于EDDTable FromAsciiService的所有子类.

* 制约因素- ERDDAP™ 表格数据请求可以限制任何变量。 基本服务可能允许也可能不允许限制所有变量。 例如,许多服务只支持对站名,纬度,经度和时间的限制. 因此,当一个EDDTableFromAsciiService子类收到一个数据集子集的请求时,它会尽可能多地传递给源数据服务,然后对服务返回的数据应用剩余的限制,然后将数据交给用户.
* 有效范围 -- 与许多其他数据集类型不同,EDDTableFromAsciiService通常不知道每个变量的数据范围,因此无法迅速拒绝对有效范围以外的数据的请求.
* 解析 ASCII 文本响应 - 当EDDTableFromAsciiService从一个ASCII文本服务处得到回复时,它必须验证该响应具有预期的格式和信息,然后提取数据. 您可以为此数据集使用 XML 块中的各种特殊标记来指定格式 :
    *   &lt;前数据1&gt;通过&lt;在 Data10 &gt; 标记前 - 您可以指定一系列文本 (你想多少就多少,最多10个) EDDTable FromAsciiService 必须在服务返回的 ASCII 文本标题中查找&lt;前数据1&gt;通过&lt;在Data10前进行。 例如,这有利于核实反应是否包括使用预期单位的预期变量. 您指定的最后一个数据前标记表示数据开始前的文本。
    *   &lt;数据后&gt; - —— - 说 此处指定了EDDTable FromAsciiService将在服务返回的ASCII文本中查找的文本,该文本表示数据的结尾。
    *   &lt;无数据 &gt; - —— - 说 如果EDDTableFromAsciiService在服务返回的ASCII文本中找到此文本,则它得出结论,没有匹配请求的数据.
#### 来自 Ascii 服务骨架 XML 的 EDD Table{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### 来自Ascii Servicicenos的EDD表{#eddtablefromasciiservicenos} 
 [ **来自Ascii Servicicenos的EDD表** ](#eddtablefromasciiservicenos) 制作来自 ASCII 文本数据服务的 EDDTable 数据集 NOAA 因为 [国家海洋局 (职位) ](https://oceanservice.noaa.gov/) 。 。 。 关于这个班的工作方式和使用方法,请参看这个班的超级班 [来自Ascii 服务的 EDD 表](#eddtablefromasciiservice) 。 。 。 除了Bob Simons之外,其他任何人都不太可能需要使用这个子类.

由于来自NOS服务的响应中的数据使用专栏ASCII文本格式,因此除纬度和经度以外的数据变量必须有一个特殊属性,指定每个数据行的哪些字符包含该变量的数据,例如,
```
<att name="responseSubstring">17, 25</att>  
```
 
### AllDatasets 中的 EDD 表格{#eddtablefromalldatasets} 
 [ **AllDatasets 中的 EDD 表格** ](#eddtablefromalldatasets) 是一个更高层次的数据集,拥有当前装入的所有其他数据集的信息。 ERDDAP 。 。 。 与其他类型的数据集不同,该数据集没有说明 allDatasets 数据集在 datasets.xml 。 。 。 。 ERDDAP™ 从 AllDataset 数据集自动创建一个 EDD Table (与 datasetID = allDatasets ) 。 。 。 。 因此, allDatasets 每个数据组将创建 ERDDAP™ 安装,并将在每一处工作 ERDDAP™ 安装。

那个 allDatasets 数据集是一个表格数据集。 每个数据集都有一行信息。 它有关于每个数据集的列,例如: datasetID 、可访问性、机构、标题、分钟、最大时间、最低时间、最高时间等。 因为 allDatasets 是一个表格数据集,您可以同样的方式查询该数据集。 ERDDAP™ ,可以指定回复的文件类型。 这使得用户能够以非常强大的方式搜索感兴趣的数据集.
 
### 来自 Ascii 文件夹的 EDD 表格{#eddtablefromasciifiles} 
 [ **来自 Ascii 文件夹的 EDD 表格** ](#eddtablefromasciifiles) 汇总来自逗号、标签、分号或空格分隔的ASCII数据文件的数据。

* 通常情况下,文件会在第一行有列名,数据从第二行开始. (在这里,文件的第一行称为第1行.) 不过你可以用&lt;列名称&lt;在您中的第一个 DataRow &gt; datasets.xml 要指定不同行号的文件。
*    ERDDAP™ 允许各行数据具有不同的数据值。 ERDDAP™ 假设缺失的数据值是行中的最后一列。 ERDDAP™ 为缺失的数据值指定标准缺失值。 (添加 v1.56) 
* ASCII文件容易使用,但它们并不是存储/检索数据的最有效方式. 为了提高效率,将文件保存为 NetCDF 页:1 .nc 文件 (一个维度,“row”,所有变量都共享) 相反。 你当然可以 [使用情况 ERDDAP™ 生成新文件](#millions-of-files) 。 。 。 。
* 看这个班级的超级班级 [来自文件的 EDD 表格](#eddtablefromfiles) ,用于了解这个班级是如何工作的以及如何使用.
* 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 由于ASCII文件中完全缺乏元数据,你总是需要编辑GenerateDatasetsXml的结果.
* 警告:何时 ERDDAP™ 读取 ASCII 数据文件,如果它在给定行上找到错误 (例如,项目数量不正确) ,它记录了警告信息 ("预言:坏行 (编号) 数据"... 后面线路的坏线列表) 页:1 [日志.txt 文件](/docs/server-admin/additional-information#log) 然后继续读取其余的数据文件。 因此,你的责任是定期检查 (或为此编写脚本) 对于日志中的消息。 txt 这样您就可以解决数据文件中的问题 。 ERDDAP™ 这样设置,用户可以继续读取所有可用的有效数据,即使文件的某些行有缺陷。
     
### 从 EDD 表格 AwsXml 文件夹{#eddtablefromawsxmlfiles} 
 [ **从 EDD 表格 AwsXml 文件夹** ](#eddtablefromawsxmlfiles) 从一组自动气象站汇总数据 (自动取款机) 使用 WeatherBug Rest XML API 的 XML 数据文件 (已停止活动) 。 。 。 。

* 这种类型的文件是存储数据的一种简单但效率低的方法,因为每个文件通常似乎只包含一个时间点的观察. 因此可能有大量的文件. 如果要提高业绩,请考虑整合意见组 (一个星期的价值?) 输入 NetCDF 页:1 .nc 文件 (最佳状态 : .nc 带有 [CF 数字 断层采样 (副秘书长) 相邻标记阵列格式](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ) 并使用 [来自多分位Nc Files的 EDD表](#eddtablefrommultidimncfiles)   (或 [来自 NcCFF 的 EDD 表格](#eddtablefromnccffiles) ) 为数据服务。 你当然可以 [使用情况 ERDDAP™ 生成新文件](#millions-of-files) 。 。 。 。
* 看这个班级的超级班级 [来自文件的 EDD 表格](#eddtablefromfiles) ,用于了解这个班级是如何工作的以及如何使用.
     
### 来自 ColumnarAsii 文件的 EDD 表格{#eddtablefromcolumnarasciifiles} 
 [ **来自 ColumnarAsii 文件的 EDD 表格** ](#eddtablefromcolumnarasciifiles) 将表格 ASCII 数据文件的数据汇总,并带有固定宽度的列。

* 通常情况下,文件会在第一行有列名,数据从第二行开始. 文件的第一行/行称为第1行. 不过你可以用&lt;列名称&lt;在您中的第一个 DataRow &gt; datasets.xml 要指定不同行号的文件。
* 那个&lt; addAttributes &gt; 每张&lt; dataVariable &gt; 对于这些数据集,MUST包括这两个特殊属性:
    
    *   &lt;atname=“ start Column” &gt; *整数* &lt;att &gt; -- 指定每行中此数据变量起始的字符列。
    *   &lt;名称=“ stopColumn” &gt; *整数* &lt;att &gt; -- 指定每行中作为本数据变量结束后的1的字符列。
    
第一个字符栏称为第0栏.
例如,对于这个有时间值的文档,其温度值为:
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
时间数据变量会
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
和时间数据变量
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
为所有变量指定这些属性 MUSST, 但 [固定价值](#fixed-value-sourcenames) 和 [文件名- 来源名称](#filename-sourcenames) 变量。
* ASCII文件很容易使用,但它们不是存储/检索数据的有效方法. 为了提高效率,将文件保存为 NetCDF 页:1 .nc 文件 (一个维度,“row”,所有变量都共享) 相反。 你当然可以 [使用情况 ERDDAP™ 生成新文件](#millions-of-files) 。 。 。 。
* 看这个班级的超级班级 [来自文件的 EDD 表格](#eddtablefromfiles) ,用于了解这个班级是如何工作的以及如何使用.
* 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 由于难以确定每个数据列的起始和结束位置,以及ASCII文件中完全缺乏元数据,你总是需要编辑来自GenerateDatasetsXml的结果.
     
### 来自 HttpGet 的 EDD 表格{#eddtablefromhttpget} 
电子数据交换表 FromHttpGet 不同于其它所有类型的数据集 ERDDAP™ 它有一个系统,使特定的“作者”能够增加数据,修改数据,或从数据集中删除数据。 HTTP GET 或 [职位](#http-post) 计算机程序、脚本或浏览器中的请求。 数据集由用户查询的方式与所有其他 EDDTable 数据集的查询方式相同 ERDDAP 。 。 。 看这个班级的超级阶级的描述 [来自文件的 EDD 表格](#eddtablefromfiles) 阅读从超级阶级继承下来的特征。

以下介绍EDDTable FromHttpGet的独特特征. 你需要阅读所有这个开头的章节,并理解它;否则,你可能会有不切实际的期望或者陷入难以解决的麻烦.

#### 预定用途{#intended-use} 
该系统旨在:

* 表格 (现场) 数据,而非网格数据。
* 实时数据 -
目标是允许作者 (例如传感器、自动QC脚本或特定人类) 更改数据集 (通过 [插入或删除命令](#insert-and-delete) ) 并且使这些变化能够 ERDDAP™ 用户,都在不到1秒之内,而且可能更快。 大部分时间是网络时间 ERDDAP™ 可以以大约1ms的速度处理请求,用户可立即获取数据。 这个 [快速](#httpget-speed) , (中文). [强力](#robust) ,以及 [可靠系统](#system-reliability) 。 。 。 。
* 几乎任何数据频率
这个系统可以接受不频繁的数据 (例如,每日活动) 通过非常频繁的数据 (例如,100赫兹数据) 。 。 。 如果你优化系统,它可以处理更高的频率数据 (如果您进入极点, 可能有 10 KHz 数据) 。 。 。 。
* 数据来自一种传感器或类似传感器的集合。
*    [版本](#versioning) 页:1 [可复制科学](https://en.wikipedia.org/wiki/Reproducibility) 页:1 DOI s -- 翻译:
需要修改数据的情况 (例如,改变质量控制标志) ,知道哪个作者做了每次修改,知道作者做出修改的时间戳,以及 (应请求) 能够看到更改前的原始数据。 因此,这些数据集符合下列条件: [ DOI 编号](https://en.wikipedia.org/wiki/Digital_object_identifier) 。 。 。 。 因为他们遇到 DOI 要求除汇总外数据集不变。 一般来说,近实时数据集没有资格 DOI s 因为数据经常被追溯更改 (例如,为质量保证/质量控制目的) 。 。 。 。
     

一旦数据出现在一个EDDTable FromHttpGet数据集中,任何用户都可以以他们从任何其他EDDTable数据集请求数据的方式请求数据.
     
#### 实验: 小心点{#experimental-be-careful} 
由于这个系统是新的,并且由于失去的环境数据不能被重新获得,你应该把EDDTable FromHtpGet当作实验. 如果你正在从另一个系统过渡,请同时运行旧系统和新系统,直到你确信新系统运作良好为止 (数周或数月,不只数小时或数日) 。 。 。 在所有情况下,请确保您的系统分别归档发送到 EDDTable FromHttpGet 数据集的. 插入和删除 URL (即使只是Apache和/或Tomcat日志) 至少有一段时间 在所有情况下, 请确保您的 EDDTable FromHttpGet 数据集创建的数据文件被常规备份到外部的数据存储设备中 。 (请注意: [红外线](https://en.wikipedia.org/wiki/Rsync) .可以非常高效地备份EDDTable FromHttpGet创建的数据文件.)   
     
#### 插入和删除{#insert-and-delete} 

用于在 ERDDAP™ ,当您向 ERDDAP™ 对于数据集中的数据子集,您指定您想要用于响应的文件类型,例如.csv, .htmlTable , (中文). .nc , (中文). .json 。 。 。 来自 Http 的 EDD 表格 获取此系统的扩展支持两个额外的“ 文件类型” , 它可以插入 (或更改) 或删除数据集中的数据:

* 插入
    * 请求格式化为标准的HTML格式响应,键=值对,由"( &)"分隔. 举例来说,
        https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1  
告诉 ERDDAP™ 要添加或修改数据 stationID =46088 为指定时间。
    * 这个变化的作者是JohnSmith,关键是一些Key1.
    * URL 必须包含有效值 (不缺少数值) 为所有人 [ http 获取必要变量](#httpgetrequiredvariables-global-attribute) 
    * 如果值为 http 获取需要 请求中的变量 (例如, stationID 时间) 匹配数据集中已存在的行上的值,新值将有效覆盖旧值 (如果用户请求前一个数据, 旧值仍可访问 [版本](#versioning) 数据组) 。 。 。 。
    * 插入 URL 绝不包括时间戳( T) ( ERDDAP™ 生成该值) 或命令( C) (指定由.插入 (命令为 0) 或删除 (命令为 = 页:1) ) 。 。 。 。
    * 如果 . 插入 URL 不指定数据集中其它列的值, 则假设它们为本地缺失值 (MAQQVALUE 表示整数数据类型,NaN表示浮点数和双点数,“”表示字符串) 。 。 。 。
             
    * 删除
        * 请求格式化为标准的HTML格式响应,键=值对,由"( &)"分隔. 举例来说,
            https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1  
告诉 ERDDAP™ 删除数据 stationID =46088 在指定的时间。
        * 这个变化的作者是JohnSmith,关键是一些Key1.
        * URL必须指定 [ http 获取必要变量](#httpgetrequiredvariables-global-attribute) 请求中 (例如, stationID 时间) 。 。 。 如果这些值与数据集中已经存在的一行值相符 (他们通常会) ,将旧值有效删除 (如果用户请求前一个数据, 旧值仍然可以访问 [版本](#versioning) 数据组) 。 。 。 。
        * 除作者外,不需要为非HttpGet必需变量指定用于认证请求的值.
             
    
细节 :
    * ,插入和.删除请求格式化为标准的HTML形式响应,键=值对,由"( &)"分隔. 数值必须是 [编码百分比](https://en.wikipedia.org/wiki/Percent-encoding) 。 。 。 因此,您需要将特殊字符编码为%HH,其中HH是字符的两位数十六进制值. 通常情况下,您只需要将一些点缀字符 :% 转换为% 25, &% 26, " 转换为% 22,&lt;输入% 3C, = 输入% 3D, &gt; 输入% 3E, + 输入% 2B, | 进入% 7C, \\[ 输入% 5B, \\] 变为% 5D, 空间变为% 20, 并将 # 127 以上所有字符转换为 UTF-8 格式, 然后% 将 UTF-8 格式的每个字节编码为% HH格式 (请求程序员帮助) 。 。 。 。
    * 插入和删除的请求必须包括: [ http 获取必要变量](#httpgetrequiredvariables-global-attribute) 例如, stationID 还有时间 对于.插入请求,则假定请求中未指定的变量为缺失值 (MAQVALUE 用于整数变量, NaN 用于浮点变量和双点变量, 和一个空字符串用于字符串变量) 。 。 。 对于.删除请求, 非 HttpGet 需要的值 变量 (作者以外的作者,必须) 被忽略 。
    * 插入和.删除请求必须包含作者的姓名和作者的密钥,通过格式作者=的参数 *作者键* 作为请求中最后一个参数。 要求这是最后一次确保整个请求已由 ERDDAP 。 。 。 。 只有提交人 (不是密钥) 将存储在数据文件中。 您必须指定允许的列表 *作者键* '通过全局属性 [ http 获取键](#httpgetkeys) 
    * 插入和删除参数可以是缩略语 (单人) 窗体中任意长度的值或数组 \\[ 值 1, 值 2, 值3, ..., 值N \\] 。 。 。 对于给定的请求,所有带有数组的变量都必须有数值相同的数组 (否则就是个错误) 。 。 。 如果一个请求有scalar和数组值,则该scalar值被复制成为与指定的数组长度相同的数组,例如( &) stationID =46088 可能作为 & stationID = \\[ 46088,46088,46088 (中文(简体) ). \\] 。 。 。 阵列是关键 [高吞吐量](#httpget-speed) 。 。 。 没有数组,将难以从远程作者处插入或删除每秒超过8行的数据 (因为网络上所有的管理费用) 。 。 。 有了数组,就很容易从远程传感器中插入或删除每秒1000多行数据。
    * 插入和删除接受 (没有错误消息) 需要整数时的浮点数。 在这种情况下,数据集将数值绕到整数.
    * 插入和删除接受 (没有错误消息) 变量数据类型以外的整数和浮点数。 在这种情况下,数据集将数值存储为 ERDDAP 该数据类型的本地缺失值 (MAQVALUE 表示整数类型,NaN 表示浮动和双倍) 。 。 。 。
         
#### 回应{#response} 
如果插入或删除 URL 成功, HTTP 响应代码将为 200 (还好) 并将答复文本为: .json 对象,例如,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
注意时间戳有毫秒精度.

如果插入或删除 URL 失败, 您将获得 200 以外的 HTTP 响应代码 (还好) ,例如错误 403 不允许提交错误的作者QQkey值 。 ERDDAP™ 发送 HTTP 响应代码 (不,例如,一个 .json 格式化错误) 因为在互联网上 事情就是这样发生的 因为错误可能发生在系统任何地方 (例如, 在网络中, 返回 HTTP 错误) 。 。 。 。 如果错误来自 ERDDAP™ ,答复可能包括一些案文 (没有 .json ) 但HTTP响应代码 (二百分之七,别的事就麻烦了) 是检查.插入或.删除是否成功的适当方法。 如果检查 HTTP 响应代码不可能或不方便, 请在响应文本中搜索“ 状态 ” : “ 成功 ” , 这应该是成功的可靠标志 。
    
#### 日志文件{#log-files} 
当 EDDTable FromHttpGet 接收 . 插入和删除命令时,它只是将信息附加到一组日志文件中的相关文件,每个日志文件都是存储在一个表格中的表格 [贾森 线条 CSV 文件](https://jsonlines.org/examples/) 。 。 。 当用户请求数据时, ERDDAP™ 快速读取相关日志文件,按数据组的顺序应用更改,然后像其他任何用户的制约一样过滤请求 ERDDAP™ 数据请求。 将数据分割到各种日志文件, 存储各种信息 (例如,命令的时间戳,以及命令是.插入还是.删除) ,以及数据集设置的各个方面,都使得 ERDDAP 将数据存储到此数据集,并从中获取数据。
     
#### 安全和作者{#security-and-author} 
每个插入和删除的命令必须包含 & author= *作者键* 作为最后一个参数,其中作者QQKey由作者的标识符组成 (名称、首字母、假名、号码) 和密钥 那个 ERDDAP™ 管理员会与作者合作生成有效的作者QQkey值列表,该列表可随时更改.
当 EDDTable FromHttpGet 接收到. 插入或删除命令时,它会确保作者IDQQkey是最后一个参数并有效. 因为它是最后一个参数,它表明整个命令行到达 ERDDAP™ 并且没有被截断。 密钥确保只有特定的作者才能在数据集中插入或删除数据. ERDDAP™ 然后提取作者ID,并保存在作者变量中,这样任何人都可以看到谁对数据集的某个修改负责。
插入和删除命令只能通过 https:   (安全)   ERDDAP™ URLs (英语). 这确保了转移的信息在过境期间保密。
     
#### 时间戳{#timestamp} 
作为日志系统的一部分, EDDTable FromHttpGet 增加了一个时间戳 (时间 ERDDAP 收到请求) 转到它存储在日志文件中的每个命令。 因为 ERDDAP™ 生成时间戳,而不是作者,不管不同的作者是否在从有时钟设定到略有不同时间的计算机中做出改变. 时间戳可靠地表示对数据集的更改时间.
     
#### HTTP 邮编{#http-post} 
*    ["HTTP POST怎么样?"](#http-post)   
HTTP 软件 [职位](https://en.wikipedia.org/wiki/POST_(HTTP) )是更好的选择 (比较 HTTP GET ) 用于将信息从客户端发送到 HTTP 服务器。 如果可以,或者你真的想改进安全性,请使用POST,而不是发送信息到 ERDDAP 。 。 。 POST比较安全,因为: https , URL以安全的方式传输,但整个URL (包括参数,包括作者) 将写给阿帕奇人、汤姆卡特人和 ERDDAP™ 日志文件,如果文件没有适当的安全性,可以读取这些文件。 使用POST,参数以安全的方式传输,而不写入日志文件. POST对于客户端的工作来说有些困难,并且没有像客户端软件那样得到广泛的支持,但编程语言确实支持. 您通过 GET 或 POST 发送到数据集的内容将会是相同的, 只是格式化为不同 。
     
####  http 获取需要 全球属性变量{#httpgetrequiredvariables-global-attribute} 
使整个系统发挥作用的一个重要部分是所需的全球属性 http 获取需要 变量,这是一个以逗号分隔的列表 dataVariable 唯一识别一行数据的源名称。 这应该尽量少,而且几乎总是包括时间变量。 例如,建议如下: http 获取需要 每个变量 [CF 数字 断层采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)   (当然,在您的数据集中,ID名称可能有所不同.) 数字 :

* 对于时间序列 : stationID 时间
* 对于轨迹: 轨迹ID, 时间
* 配置文件: 时间 (假设时间为 profile ==d) 深处
* 对于时间序列 简介 : stationID 时间 (假设时间为 profile ==d) 深处
* 用于轨道 配置文件:轨迹ID, 时间 (假设时间为 profile ==d) 深处

    
以时间序列为例:
包含 . 插入命令 stationID =46088和时间=2016-06-23T19:53:00Z (其他变量的数值) 数字 :
* 如果该站和该时间没有现有数据,那么效果将是将数据添加到数据集中.
* 如果有该站和该时间的现有数据,那么效果将是用这个新数据取代现有的一行数据. (当然,自从 ERDDAP™ 保留它收到的每个命令的日志,旧数据仍在日志中。 如果用户在此更改之前从数据集的版本中请求数据,他们就会看到旧的数据.)   
         
####  http 获取编程结构{#httpgetdirectorystructure} 
*    [ http 获取Birdy 全球属性和数据结构 (日志) 文件名称](#httpgetdirectorystructure)   
使整个系统高效运作的一部分是 ERDDAP™ 创建一组数据 (日志) 文件,每个文件都有不同的数据集块。 如果这些布局好, ERDDAP™ 将能够对大多数数据请求迅速作出反应。 此设置由 http Get DirectyStructure Global 属性,它是一个像相对文件名的字符串,例如, " stationID 10年),但实际上是目录结构的规格. 说明数据目录和文件名的部分 (日志) 将构建文件。
    
    * 如果一个部分是整数 (&gt;= 页:1) 加时间 (毫秒、秒、分钟、小时、日期、月份、年份或其复数) ,例如,10年,然后EDDTable FromHttpGet数据集将占用数据行的时间值 (例如,2016-06-23T19:53:00Z) ,计算精确的时间 (例如,2010年) ,并从中创建文件夹或文件Name。
        
目标是将相当大块的数据输入每个文件,但远远少于2GB.
        
    * 否则,规格的部分必须是: dataVariable 因为 sourceName 例如, stationID 。 。 。 在此情况下, EDDTable FromHttpGet 将从该变量的值中为新一行数据创建文件夹或文件名 (例如,"46088"("46088")) 。 。 。 。
    
因为插入和删除命令数据存储在具体数据中 (日志) 文件, EDDTable FromHttpGet 通常只需要打开一个或几个数据 (日志) 为给定用户请求查找数据的文件。 因为每个数据 (日志) 文件有其数据集块的所有相关信息, EDDTable FromHttpGet 快速且容易制作特定版本 (或当前版本) 的数据集 (,而无需生成整个数据集的要求版本) 。 。 。 。
    
一般准则基于数据的数量和频率。 如果我们假设每行数据100字节,那么...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
例如,如果目录结构是 stationID 半个月,你输入两个站的数据 (页:1) 包含2015年12月至2016年5月的时间值, EDD Table fromHttp Get 会创建命名为46088和46155的目录,并在每个命名为2015-11的文件中创建文件 .json l, 2016-01 (中文(简体) ). .json l, 2016-03 (英语). .json l, 2016-05 (中文(简体) ). .json 页:1 (每一站拥有价值2个月的有关站点数据) 。 。 。 未来任何时候,如果使用. 插入或. 省略更改或删除数据,例如2016-04-05T14:45:00Z,EDDTable FromHttp等46088站的数据. 将命令附加到46088/2016-03 .json l,相关数据 (日志) 文档。 并且很明显,在未来的任何时候加入其他站点的数据是好的,因为数据集会简单地根据需要创建额外的目录来保存来自新站点的数据.
    
####  http 获取键{#httpgetkeys} 
每个 EDD 表格 从Http 获取数据集必须具有全局属性 http GetKeys 指定允许作者列表及其密钥为逗号分隔列表 *作者键* 例如, JohnSmith=someKey1, HOBO Logger=someKey2, QCScript59=someKey3.
* 作者QQkey's 是大小写敏感, 必须完全为 ASCII 字符 (# 33 - # 126, 并且没有任何逗号, " 或 ' 字符 )
* 密钥就像密码,所以它们MUST是QQ8字符,很难猜到,并且没有内部的字典词. 你应该像对待密码一样对待他们 -- 保密。
* 第一个"QQ"字符将作者与密钥区分开来,所以作者的名字不能包括"QQ"字符 (但钥匙可以) 。 。 。 。
* 任何给定的作者都可以拥有一个或多个作者的QQKey,例如JohnSmith\\_some. 密钥1, JohnSmith##some 键7等.
* 您可以随时更改此属性的值 。 修改在下一次装入数据集时生效.
* 这些信息将在公开之前从数据集的全球属性中删除.
* 请求数据集插入或删除数据必须包含一个 & author= *作者键* 参数。 在验证了密钥的有效性后, ERDDAP™ 只保存作者部分 (不是密钥) 在数据文件中。

#### 设置{#set-up} 

以下是建立EDD Table FromHttpGet数据集的建议步骤:

1. 使主目录保存此数据集的数据. 例如,让我们使用/data/testGet/. 用户运行 GenerateDatasetsXml 和用户运行 ERDDAP™ 两者必须都有读写访问此目录。
     
2. 使用文本编辑器制作样本 .json l 带有扩展名的 CSV 文件 .json 我在目录里
这个名字不重要 例如,你可以把它叫做样本 .json 页:1
做两行 .json l CSV 文件, 第一行有列名和假/典型值 (编号) 在第二线。 这里有一个样本文件,适合收集 featureType =测量空气和水温的时间序列数据。
     \\[ 对于 featureType 弹道,你可能会改变 stationID 要成为轨道ID。 \\]   
     \\[ 对于 featureType Profile,你可能会改变 stationID 并添加深度变量。 \\] 
    
     \\[ " , " stationID " , "time" ,"纬度","经度","气温","水温","时间戳","作者","命令" \\] 
     \\[ "MyStation","2018-06-25T17:00Z","0.0,0.0,0.0,"SomeBody",0 \\] 
    
说明:
    * 实际数据值并不重要,因为您最终会删除这个文件,但它们应该是正确的数据类型. 值得注意的是,时间变量应当使用来源实际数据所使用的格式。
    * 对于所有变量, sourceName 将等于 destinationName ,因此现在使用正确的/最后的变量名称,包括时间、纬度、经度,有时还包括深度或高度,如果将包含该信息的变量。
    * 几乎总会有一个以时间命名的变量记录观测时间。 它可以是数据Type字符串 [适合字符串时间的单位](#string-time-units)   (例如, yyyy-MM-dd 'T'HH:mm:s.SSSZ (英语).) 或数据 类型双 [适合数字时间的单位](#time-units)   (例如,自1970-01-01T00:00Z以来的几秒钟,或者其他一些基时间) 。 。 。 。
    * 三栏 (通常是最后三个) 必须是时间戳、作者、命令。
    * 时间戳栏将被 EDDTable FromHttpGet 用于添加一个时间戳,以表示它何时在数据文件中添加了特定的一行数据. 它将拥有自1970-01-01T00:00Z以来的数据Type双倍和单位秒.
    * 带有数据Type String的作者列将用来记录哪位授权作者提供了此行的数据. 授权作者由 [ http 获取 Keys 全局属性](#httpgetkeys) 。 。 。 。 虽然键被指定为 *作者键* 并在该格式的“请求” URL中,只有作者部分保存在数据文件中。
    * 带有数据Type字节的命令列将显示此行上的数据是否是插入 (0 个) 或删除 (页:1) 。 。 。 。
         
3. 运行生成数据 快说
    
    1. 数据集类型是 EDD Table FromHttpGet
    2. 目录是 (举例来说) /数据/测试 获取/
    3. 样本文件是 (举例来说) /数据/测试Get/启动 .json 页:1
    4. 那个 http 获取需要 变量为 (举例来说)   stationID 时间 见以下说明: [ http 获取必要变量](#httpgetrequiredvariables-global-attribute) 见下文。
    5. 如果每5分钟收集数据, http 获取此示例的 DirectyStructure 是 stationID 半个月。 见以下说明: [ http 获取编程结构](#httpgetdirectorystructure) 见下文。
    6. 那个 [ http 获取键](#httpgetkeys) 
    
添加输出 (块 datasets.xml 用于数据集) 改为 datasets.xml 。 。 。 。
     
4. 编辑 datasets.xml 用于此数据集的块使其正确和完整 。
值得注意的是,替换所有 内容正确。
     
5. 对于&lt;文件目录( I) &gt; 设置 :
    * 如果数据集通常会频繁得到. 插入和/或删除请求, 则将此设定为真实 (例如,每10秒多一次) 。 。 。 帮助 EDDTable FromHttpGet 更快地响应. 插入和/或删除请求 。 如果您将此设定为真, EDDTable FromHttpGet 仍将将文件表和相关信息定期保存到磁盘中 (根据需要,大约每5秒钟) 。 。 。 。
    * 设定为虚假 (默认) 如果数据集通常不会经常出现.插入和/或删除请求 (例如,每10秒少于一次) 。 。 。 。
         
6. 说明: 有可能使用&lt;缓存来自Url&gt; 和相关设置 datasets.xml EDD 表格 从Http 获取数据集作为制作和维护远程 EDDTable FromHttpGet 数据集的本地副本的方法 ERDDAP 。 。 。 然而,在这种情况下,这个本地数据集将拒绝任何.插入和删除请求.

#### 使用 EDD 表格 从HttpGet 数据集{#using-eddtablefromhttpget-datasets} 

* 作者可以提出"请求" [在数据集中插入数据或删除数据](#insert-and-delete) 。 。 。 。
     
* 在将真实数据插入数据集后,可以也应该删除原始样本数据文件.
     
* 用户可以从数据集中请求数据,如同他们在其中为任何其他EDDTable数据集请求数据一样。 ERDDAP 。 。 。 如果请求没有包含对时间戳列的限制,则请求从当前版本的数据集中获取数据 (处理所有插入和删除命令后,然后由 http 获取必要变量) 。 。 。 。
     
* 用户还可以针对 EDDTable FromHttpGet 数据集提出特定请求:
    * 如果请求包括:&lt;或&lt;= 时间戳栏的限制,然后 ERDDAP™ 处理日志文件的行,直到指定的时间戳。 实际上,这暂时删除了自该时间戳值以来对数据集所作的所有更改。 更多信息,见 [版本](#versioning) 。 。 。 。
    * 如果请求中包含 &gt;, QQ, 或 = 时间戳栏的制约, 如( T)&lt;=0,则 ERDDAP™ 返回数据文件中的数据,不处理插入和删除命令。
* 未来,我们设想建立各种工具 (我们? 是你吗?) 用于使用这些数据集。 例如,可能有一个脚本可以读取原始日志文件,应用不同的校准方程,用该衍生信息生成/更新不同的数据集. 注意脚本可以通过请求获取原始数据至 ERDDAP™   (,以文件格式获得数据,而该格式对脚本最容易使用) 通过.插入“请求”生成/更新新数据集 ERDDAP 。 。 。 脚本不需要直接访问数据文件;可以在任何授权作者的计算机上使用.
     

#### 关于从HttpGet获取的EDD表的详细信息{#detailed-information-about-eddtablefromhttpget} 

主题是:

*    [不要改变设置&#33;](#dont-change-the-setup) 
*    [拥挤](#crud) 
*    [无效的请求](#invalidrequests) 
*    [速度](#httpget-speed) 
*    [强壮](#robust) 
*    [系统可靠性](#system-reliability) 
*    [版本](#versioning) 
*    ["HTTP PUT和DELETE怎么办?"](#https-put-and-delete) 
*    [页:1](#httpget-notes) 
*    [感谢CHORDS的基本想法。](#thanks) 

以下是详细资料:

##### 不要改变设置&#33;{#dont-change-the-setup} 
一旦数据集创建并添加了数据:

* 不添加或删除任何 dataVariable 编号
* 不要改变 sourceName 或 destinationName 会 议 日 程 和 议 程 dataVariable 编号
* 不要改变数据 类型 dataVariable 编号 但你可以改变 dataVariable 元数据。
* 不要改变 http 获取需要 变量全局属性 。
* 不要改变 http 获取 DirectyStructure 全球属性 。

如果您需要更改其中的任何一项,请制作一个新的数据集,并将所有的数据传输到新的数据集.
     
##### 拥挤{#crud} 
在计算机科学中,使用数据集工作的四个基本指令是: [创作、阅读、更新、阅读 (拥挤) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) 。 。 。 SQL,与关系数据库工作的语言,在INSERT,SELECT,UPDATE,DELETE中具有等效性. 在EDD Table FromHttpGet中,从EDD Table中,

* 插入是CREATE和UPDATE的组合.
* . delete是迪莱特。
* 请求数据子集的常规系统是READ.

因此,EDDTable FromHttpGet支持所有的基础命令,以便使用数据集工作.
     
* 插入或删除没有错误的请求将返回 HTTP 状态代码=200 和一个 JSON 对象,例如,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
两倍图标值是指同一毫秒,即将存储在插入或删除的数据行的时间戳变量中的毫秒. ERDDAP™ 未来不会改变这些密钥值对的名称和格式. ERDDAP™ 可能在未来为 JSON 对象添加额外的密钥值对。
     
##### 无效的请求{#invalidrequests} 
无效的. 插入或. 删除请求将返回除状态=200以外的 HTTP 错误状态代码,并且不会更改数据集 。 这包括有不正确的作者信息,不正确的变量名称,不同变量的数组长度不同,缺少所需的变量,缺少所需的变量值等请求. 如果请求涉及不止一个数据文件,则部分请求可能会成功,部分失败. 然而,如果发送请求的传感器将任何故障视为完全故障,这不应该是一个问题. 例如,如果你告诉 ERDDAP™ 插入 (或删除) 同样的数据连续两次, 最糟糕的情况是信息被存储两次, 关闭在日志文件中。 很难理解这怎么可能造成麻烦。
     
##### Http 获取速度{#httpget-speed} 
用于插入或删除请求 (不计数 http 间接费用) ,ballpark 计算.插入或删除的速度是
每.插入1行数据
每.插入10行数组数据2ms ( \\[  \\] )   
每.插入100行数组数据 ( \\[  \\] )   
每.插入1 000行数组数据 ( \\[  \\] )   
显然数组是 [高吞吐量](#httpget-speed) 。 。 。 没有数组,将难以从远程作者处插入或删除每秒超过8行的数据 (因为网络上所有的管理费用) 。 。 。 有了数组,就很容易从远程传感器中插入或删除每秒1000多行数据。

每个请求的数据量非常之大,您会达到Tomcat的最大查询长度 (默认为 8KB ?) ,但可以通过编辑您的 maxHttp HeaderSize 设置来增加 *移动猫* /conf/server.xml的HTTP/1.1 连接器条目.

何时 ERDDAP™ 读取 JSON 线 CSV 数据 (日志) 文件,与读取二进制数据文件相比,时间惩罚很小。 我们认为,在阅读时的这一时间惩罚是合理的代价,以支付系统在写数据时的速度和稳健性 (具有重大意义的) 。 。 。 。

##### SSD 软件{#ssd} 
 [为了加快速度](#ssd) 使用一个 [固态驱动器 (SSD 软件) ](https://en.wikipedia.org/wiki/Solid-state_drive) 以存储数据。 他们的文件访问时间要快得多(&lt;0.1ms)比硬盘驱动器 (3 - 12分钟) 。 。 。 数据传输速度也更快 (200 - 2500甲基溴/秒) 比硬盘驱动器 (~200甲基溴/秒) 。 。 。 近年来,它们的费用大幅下降。 虽然早期SSD在给定块大量写作后出现了问题,但这个问题现在已经大大缩小. 如果你只是使用SSD来写数据一次,然后读多次,甚至一个消费级SSD (比企业级SSD便宜得多) 应该持续很长时间。
    
##### 强壮{#robust} 
我们努力使这一系统尽可能容易运作和健全。
* 系统设计有多个线程 (例如,传感器、自动QC脚本和人) 在同一数据集甚至同一文件上工作。 通过使用日志文件方法存储数据以及使用非常简单的文件类型,这在很大程度上是可能的, [贾森 线条 CSV 文件](https://jsonlines.org/examples/) ,用于存储数据。
* JSON Lines CSV的另一个巨大优势是,如果一个文件真的损坏了 (例如,由于行上的错误而无效) ,很容易在文本编辑器中打开文件并修正问题。
* 另一个优点是,如果一个文件中的行出现错误,系统仍然可以在错误行前后读取行上的所有数据. 而该系统仍然可以登录额外的.插入和删除信息.
* 使用可操作的标准文件的巨大优势 (比较关系数据库或卡桑德拉或其他软件) 数字 : 没有任何其他软件需要维护和运行才能存储或检索数据。 随时以递增的方式备份标准文件是容易的,因为数据是块的 (过了一段时间,只有每个站的当前时间文件才会更改) 。 。 。 相比之下,从数据库和卡桑德拉制作外部备份文件需要大量努力和系统故障时间。
         
##### 系统可靠性{#system-reliability} 
期待一个服务器 ERDDAP™ 99.9%的休息时间 -- -- 每年大约9小时的休息时间 (虽然,你可以用在一个糟糕的夜晚&#33;) 。 。 。 。
如果你是勤奋和幸运的, 你可能会得到99.99%的上升时间 (每年53分钟停机时间) ,因为只要重新开始更新就需要那么长时间。
你不得不采取极端措施 (单设备用服务器,不间断供电,备用空调,24×7×365人员监测现场等.) 99.99%的升学率 (每年5.25分钟停机时间) 。 。 。 即使这样,你也极不可能达到99.99%的正常时间 (或甚至99.99% (百分比)) 因为问题常常是你无法控制的。 例如,亚马逊网络服务(Amazon Web Service)和Google(Google)提供惊人的可靠网络服务,然而其中的大型部分有时会下降数小时.

面对现实 每个人都想 ERDDAP™ 百分之百的恢复时间, 或至少被炫耀的"六九" (99.99999%的营业时间相当于每年32秒的停工时间) 但无论花费多少时间、努力和金钱,你都不可能得到它。

不过 ERDDAP™ 正常时间不是真正的目标 目标是建立一个可靠的 **系统** 一个不丢失任何数据。 这是一个可以解决的问题。

解决办法是:在将数据发送到 ERDDAP 。 。 。 具体地说,该软件应该保持一个等待到 ERDDAP 。 。 。 当数据被添加到队列时,软件应该检查来自 ERDDAP 。 。 。 如果答复不包括收到的数据。 没有错误。 那么软件应该将数据留在队列中。 当生成更多数据并添加到队列中时,软件应再次尝试在队列中插入数据. (也许与 \\[  \\] 系统) 。 。 。 它将成功或失败。 如果失败,它以后会再试一次。 如果将软件写成这样工作,如果软件准备排队几天价值的数据,你确实有将传感器100%的数据上传到 ERDDAP 。 。 。 你会做到的,没有付出巨大的努力或代价。

 \\[ 背景情况: 我们没想到会这样 [这就是计算机网络实现可靠性的方式.](https://en.wikipedia.org/wiki/Reliability_(computer_networking) 页:1 计算机网络本质上是不可靠的。 所以当您将一个文件从一台计算机转移到另一台计算机时,发送软件知道/预计一些包可能会丢失. 如果它没有从接收器得到对一个特定包的适当认可,它会重新发送丢失的包. 通过这种方法,相对简单的发送和接收软件可以在不可靠的网络之上建立一个可靠的文件传输系统. \\] 
    
##### 为什么JSON Lines CSV文件?{#why-json-lines-csv-files} 
来自 HttpGet 的 EDD 表格 [贾森 线条 CSV 文件](https://jsonlines.org/examples/) 用于存储数据。 原因是:

* 主要理由是: JSON Lines CSV 文件的简单化提供了快速,简单和可靠的方法,允许多个线程写入给定文件 (例如,在文件名上同步) 。 。 。 。
* 如果JSON Lines CSV文件被损坏 (例如,由于行上的错误而无效) ,来自FromHtpGet的EDDTable仍然可以在错误行前后读取所有行上的所有数据. 而插入和.删除系统可以继续向数据文件添加新数据.
* 因为JSON Lines CSV文件是ASCII文件,如果一个文件真的损坏了,那么很容易修正 (在文本编辑器中) 。 。 。 。
* JSON 线路 CSV 支持 Unicode 字符串 。
* JSON 线条 CSV 支持可变长度字符串 (不仅限于一些最大长度) 。 。 。 。
* JSON 线条 CSV 支持64位整数 (长) 。 。 。 。
* JSON Lines CSV 的正式性质和附加语法 (对老式CSV) 提供一些额外的保证 某条线没有被损坏。

我们一开始试图使用 .nc 3个无限尺寸的文件. 然而,还存在一些问题:

* 主要问题是: 没有可靠方法允许多个线程写入 .nc 3文件,即使线程通过同步进行写作来配合.
* 如果出现 .nc 3文件变得腐败,插入和删除系统无法继续使用文件.
* 因为 .nc 3 文件为二进制, 如果文件损坏 (他们这样做是因为多线程问题) 它们极其艰难或无法修复。 没有工具可以帮助修复.
* CF无法指定字符串的编码,因此没有官方支持Unicode的方法,例如UTF-8编码. 我们试图让CF支持“编码属性”,但未能取得任何进展。 ( Unidata ,以他们的信用,确实支持 QQ编码属性。) 
*    .nc 3 文件只支持固定长度字符串 。 再说一遍,我们试图得到CF和 Unidata 用于支持可变长度字符串,但无法取得任何进展。
*    .nc 3文件不支持从 String 变量中区分单个字符变量的简单方法. 再说一遍,我们试图得到CF和 Unidata 支持区分这两种数据类型的系统,但未能取得任何进展。
*    .nc 3 文件只支持带有未指定编码的8位字符. 再说一遍,我们试图得到CF和 Unidata 支持指定编码的系统,但无法取得任何进展。
*    .nc 3 文件不支持64位整数 (长) 。 。 。 再说一遍,我们试图得到CF和 Unidata 但未能取得任何进展。
         
##### 版本{#versioning} 
因为EDD表 从Http 获取一个带有时间戳的数据集所有更改的日志和每个更改的作者,它可以快速地在任何时间点重现该数据集. 从某种意义上说,任何时间都有一个版本. 如果用户对数据的要求包括时间戳&lt;= 制约,例如( T)&lt;=2016-06-23T16:32:22.128Z (英语). (或任何时间点) ,但没有约束作者或命令, ERDDAP™ 届时将首先生成数据集的版本。 礛 ERDDAP™ 应用用户的其他限制,如从 ERDDAP 。 。 。 EDDTable FromHttpGet的设置使得这个过程非常快速高效,即使是对非常大的数据集来说也是如此.

类似地,用户可以通过请求... 时标和时标=max来查找数据集上次更新的时间 。 (时间戳) 模糊( U) () 

对于任何数据请求,对于任何版本的数据集,用户可以看到哪个作者做了哪些修改,以及何时做了修改.

此版本系统启用 [可复制科学](https://en.wikipedia.org/wiki/Reproducibility) 因为任何人都可以在任何时候从数据集的版本中请求数据. 这种精细的版本化是不可能用我们所知的任何其他系统的. 基本机制非常有效,因为不需要额外的存储空间,处理的间接费用确实很低。

并不是每个人都需要这种精细的版本,但对于一个大型数据管理组织来说,这种版本极其有用,也许是必要的。 (例如OOI、地球立方体、数据一和 NOAA 国家教育局) 一个数据集可以拥有多个作者 (例如传感器、自动QC脚本和人类编辑器) 。 。 。 。

 \\[ 历史:第一次出现这种版本的必要性 (鲍勃) 2008年阅读和讨论OOI时. 当时OOI有一个繁琐,缓慢,低效的基于Git的版本系统. Git对它设计的目的来说是好的,但不是这个. 2008年,在OOI的讨论中,我设计了一个广泛、高效的数据管理替代OOI系统,包括我加入的许多功能。 ERDDAP™ 此后,并包括这个版本系统. 当时和之后,OOI致力于他们的版本系统,对替代品不感兴趣. 2016年,该计划的其他方面落到实处,我开始执行. 由于其他项目的工作中断很多,我直到2018年才完成. 即使在现在,我也不知道还有任何其他科学数据系统 能够提供如此快速和方便的 获取数据版本的机会 从任何时间点,为频繁变化的数据集。 简单的文件系统不能提供这个. 关系数据库没有. 卡珊德拉不会的 \\] 
    
##### HTTPS 设置和删除{#https-put-and-delete} 
*    ["HTTPS PUT和DELETE怎么办?"](#https-put-and-delete)   
     [超文本传输协议 (HTTP 软件) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) 是万维网的基础,也是网页URL开始的原因 "http://"或 "https://"。 。 。 HTTP是带有额外安全层的HTTP. 每天浏览器、脚本和计算机程序都会产生数十亿HTTP (页:1)   **快点** 请求从远程来源获得信息。 HTTP 软件 (页:1) 还包括其他 [动词](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) ,特别是PUT (将数据推向服务器) 并删除 (到服务器的 DELETE 数据) 。 。 。 是, PUT 和 DELETE 是通过 HTTP 将数据插入数据集并从数据集中删除数据的正确方式 (页:1) 。 。 。 GET 由每个可以与 HTTP 合作的软件支持 (页:1) 。 。 。 和他一起工作很轻松 人人都知道怎么和GET合作 很多人知道怎么用POST (基本上与GET相同) ,所以我们做了EDD Table FromHttpGet 工作与GET和POST。 很少有人 (甚至很少计算机程序员) 曾经与PUT和DELETE合作过. PUT和DELETE一般只由计算机语言支持,因此使用它们需要一个技能丰富的程序. 所以PUT和DELETE通常是一种更为繁琐的方法,因为工具的发展方式.
     
##### HttpGet 笔记{#httpget-notes} 
*    [页:1](#httpget-notes) 
    * 没有 dataVariable 可能有数据Type=char。 使用数据Type=字符串代替. 如果你真的需要数据Type=char,请发电子邮件给Chris. 约翰在Noaa.gov。
         
##### 谢谢{#thanks} 
*    [感谢CHORDS的基本想法。](#thanks)   
EDD Table FromHttpGet 的基本构想 (即使用 HTTP GET 请求将数据添加到数据集) 是从UCAR的 (NCAR的吗?)   [云宿实时数据服务 (困难) ](https://github.com/earthcubeprojects-chords) 项目。 请求中参数的格式 (重复 *名称=值* , 由 &'s 分隔) 是网页上HTML表格使用的相同标准格式。 这是一个简单而聪明的主意, 更是这样,因为它是如此完美地与 ERDDAP 现有的表格数据处理系统。 这个想法在事后看来很明显,但我 (鲍勃) 没想到 来自 Http 的 EDD 表格 利用这个基本想法,结合我们如何实施这个想法,建立一个系统 ERDDAP™ 用于上传数据。 除了使用GET将数据推入系统的基本想法外,EDDTable FromHttpGet执行是完全不同的,完全独立于CHORDS,并具有不同的特性. (例如,日志文件、数据块、不同的安全系统、CRUD支持、可复制数据) 。 。 。 我们接触CHORDS只是网球 我们没有看他们的代码,也没有读到他们的计划,因为我们立即知道我们想用另一种方式实施这个系统。 但我们感谢他们的基本想法。 全面提及CHORDS是:
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D. S., Martin, C., Dye, M., Gooch, R., 巴托斯, M., Jones, J., Keiser, K. (2014 (中文(简体) ).) 。 。 。 为地球科学提供云存储实时数据服务 (困难) 软件。 UCAR/NCAR-地球观测实验室。 [https://doi.org/10.5065/d6v1236q](https://doi.org/10.5065/d6v1236q)   
     
### 从 EDD 表格 Hyrax 文件{#eddtablefromhyraxfiles} 
 [ **从 EDD 表格 Hyrax 文件** ](#eddtablefromhyraxfiles)   (已贬值) 汇总带有多个变量的数据文件,每个变量都有一个或多个共享维度 (例如,时间,高度 (或深度) ,经度) ,服务于 [ Hyrax   OPeNDAP 服务器](https://www.opendap.org/software/hyrax-data-server) 。 。 。 。

* 此数据集类型是 **过期** 。 。 。 较新和较普遍的解决办法是使用 [缓存 来自 EDD 表格的 Url 选项 从文件](#cachefromurl)   (或变体) ,它使远程文件的本地拷贝并服务于本地文件的数据。 那个&lt;缓存FromUrl &gt; 选项可用于任意类型的表格数据文件。 **   
如果你因为某种原因不能成功,就发电子邮件给克里斯. 约翰在Noaa.gov。
如果2020年之前没有投诉,此数据集类型可以删除. ** 
* 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 然后您可以编辑它来调谐它。
* 在大多数情况下,每个文件对最左端有多个值 (第一个) 维度,例如时间。
* 文件经常出现 (但没必要) 对其他维度具有单一值 (例如,高度 (或深度) ,经度) 。 。 。 。
* 文件可能有附加维度的字符变量 (例如, nCharacters 键) 。 。 。 。
*    Hyrax 服务器可以通过URL中的"/dods-bin/nph-dods/"或"/opendap/"来识别.
* 这个班级的屏幕 Hyrax 网页,每个目录中都有文件列表。 由于这个原因,它非常具体地适用于目前的格式: Hyrax 网页。 我们会努力调整 ERDDAP™ 如果/当未来版本 Hyrax 更改文件的列表方式。
* 那个&lt;文件 Dir &gt; 设置被忽略。 由于本课下载并制作每个远程数据文件的本地副本, ERDDAP™ 强制文件 将是 *大家长会* /副本/ * datasetID * (原始内容存档于2018-09-26). /.
* 对于&lt; sourceUrl &gt;,使用该数据库中数据集的基础目录的URL Hyrax 例如,服务器,
    &lt; sourceUrl &gt; 翻译:http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/&lt;页:1 sourceUrl &gt; 翻译:
     (但放上一条线)   (抱歉,服务器已经不可用了) 。 。 。 。
那个 sourceUrl 网页通常有 " OPeNDAP 服务器索引 \\[ 目录Name \\] " 在顶上.
* 由于该类总是下载并制作每个远程数据文件的本地副本,所以你不应该将此数据集包在 [EDD 表格复制](#eddtablecopy) 。 。 。 。
* 看这个班级的超级班级 [来自文件的 EDD 表格](#eddtablefromfiles) ,用于了解这个班级是如何工作的以及如何使用.
* 见1D、2D、3D和4D实例 [来自 NcFiles 的 EDD 表格](#eddtablefromncfiles) 。 。 。 。
     
### 来自 InvalidCRA 文件的 EDD 表{#eddtablefrominvalidcrafiles} 
 [ **来自 InvalidCRA 文件的 EDD 表** ](#eddtablefrominvalidcrafiles) 数据汇总 NetCDF   (v3 或 v4 类型)   .nc 使用 CF DSG 相邻标记阵列的特定、无效的变体的文件 (庇护上诉委员会) 文档。 虽然 ERDDAP™ 支持此文件类型, 这是一个无效的文件类型, 任何人都不应开始使用 。 强烈鼓励当前使用此文件类型的组使用 ERDDAP™ 生成有效的 CF DSG CRA 文件,并停止使用这些文件。

细节 : 这些文件有多个行XX大小变量,每个变量都有样本XXDimension属性. 这些文件是非CF标准文件, 因为多个样本 (倾斜) 维度将被解码并与这个附加规则和承诺相关,而该规则和承诺不属于CF DSG规格:"你可以将一个给定的例如温度值联系起来. (微波空间) 带有给定深度值 (z\\_obs 维度,最值的维度) ,因为: 温度行大小 (对于一个特定的铸造者,) 将等于 0 或等于相应的深度行大小 (为了那个铸币局)   (这是规则) 。 。 。 因此,如果温度行的大小不是0,那么这个铸件的n温度值与那个铸件的n深度值直接相关 (这就是承诺) """我们"

这些文件的另一个问题:首席调查官行XXX大小变量没有样本XXDimension属性,没有遵循上述规则.

此数据集类型的样本文件可见于https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[ 2020-10-21 (中文(简体) ). 此服务器已无法可靠使用 \\] 。 。 。 。

看这个班级的超级班级 [来自文件的 EDD 表格](#eddtablefromfiles) ,用于了解这个班级是如何工作的以及如何使用.

我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 然后您可以编辑它来调谐它。

第一件事就是创造Datasets Xml 是在您回答问题后为这类数据集打印样本文件的 ncdump 类似结构。 因此,如果您通过 GenerateDatasets 输入第一个循环的几个愚蠢的答案 Xml,至少你会看到 ERDDAP™ 可读取文件,并查看文件中的尺寸和变量。 然后可以通过GenerateDatasetsXml为第二个循环给出更好的答案.
 
### 来自 JsonlCSV 的 EDD 表格{#eddtablefromjsonlcsvfiles} 
 [ **来自 JsonlCSV 的 EDD 表格** ](#eddtablefromjsonlcsvfiles) 数据汇总 [贾森 线条 CSV 文件](https://jsonlines.org/examples/) 。 。 。 看这个班级的超级班级 [来自文件的 EDD 表格](#eddtablefromfiles) ,用于了解这个班级是如何工作的以及如何使用.

* 正如jsonlines.org所说,这种格式是"比CSV更好". (在法律上,作为一个联邦雇员,我不能同意或不同意他们——这有多疯狂?) 。 。 。 CSV从未被正式定义过,并且受到它与原始电子表格程序连接的相关历史行李的阻碍. 相比之下,JSON线路CSV已得到充分定义,并受益于它与广泛使用的JSON标准的联系,而后者又得益于它与 Java 脚本和 Java 。 。 。 值得注意的是,对长整数和字符串中的Unicode有充分支持,并有明确的方式包括其他特殊字符 (特别是标签和新行) 在字符串内。
    
此格式对数据集特别好, 您需要定期将附加的行附加到给定数据文件的末尾 。 为此原因和其他原因 (见上文) , (中文). [来自 HttpGet 的 EDD 表格](#eddtablefromhttpget) 使用Json Lines CSV文件进行数据存储.
    
* 输入文件被假定为UTF-8编码. 然而,鉴于\\u *ddd 时间轴:* 特殊字符编码格式 (例如,\\ u20ac 是欧元字符的编码) ,您可以选择通过使用\\u来写入文件,使其只包含 7位 ASCII 字符 *ddd 时间轴:* 以编码 # 127 上方的所有字符。
     
* 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 然后您可以编辑它来调谐它。
    
在您回答问题后, GenerateDatasetsXml 为这类数据集所做的第一件事就是打印样本文件的 ncdump 类结构。 因此,如果您通过 GenerateDatasets 输入第一个循环的几个愚蠢的答案 Xml,至少你会看到 ERDDAP™ 可读取文件,并查看文件中的尺寸和变量。 然后可以通过GenerateDatasetsXml为第二个循环给出更好的答案.
    
* 警告:何时 ERDDAP™ 读 JSON 线条 CSV 数据文件, 如果它在给定线上找到错误 (例如,项目数量不正确) ,它记录了警告信息 ("预言:坏行 (编号) 数据"... 后面线路的坏线列表) 页:1 [日志.txt 文件](/docs/server-admin/additional-information#log) 然后继续读取其余的数据文件。 因此,你的责任是定期检查 (或为此编写脚本) 对于日志中的消息。 txt 这样您就可以解决数据文件中的问题 。 ERDDAP™ 这样设置,用户可以继续读取所有可用的有效数据,即使文件的某些行有缺陷。
     
### 来自多分位Nc Files的 EDD表{#eddtablefrommultidimncfiles} 
 [ **来自多分位Nc Files的 EDD表** ](#eddtablefrommultidimncfiles) 数据汇总 NetCDF   (v3 或 v4 类型)   .nc   (或 [ .nc 门L](#ncml-files) ) 带有多个变量的文件,每个变量都有一个或多个共享的维度。 文件可能包含字符变量, 或者没有附加维度 (比如说, 弦乐14) 。 。 。 看这个班级的超级班级 [来自文件的 EDD 表格](#eddtablefromfiles) ,用于了解这个班级是如何工作的以及如何使用.

* 如果文件是多维的 CF DSG 变体,则使用此数据集类型代替 [来自 NcCFF 的 EDD 表格](#eddtablefromncfiles) 。 。 。 。
     
* 新的表格数据集 .nc 文件,在尝试旧文件之前使用此选项 [来自 NcFiles 的 EDD 表格](#eddtablefromncfiles) 。 。 。 这一类的一些优点是:
    * 这个类可以从更广泛的文件结构中读取更多的变量. 如果指定尺寸CSV (以逗号分隔的维度名称列表) 生成数据 Xml (或 数&lt;维度CSV&gt; datasets.xml 用于这些数据集的信息),然后 ERDDAP™ 将只读取源文件中使用部分或所有这些维度的变量,加上所有scalar变量。 如果一个维度在一个组中,您必须指定它的全名,例如, " *组Name/dimensionName* " ..
    * 这个类往往可以非常迅速地拒绝文件,如果它们不符合请求的限制. 因此,从大型集合中读取数据的速度往往要快得多.
    * 此类处理真字符变量 (非线性变量) 对
    * 当创建者没有使用Netcdf-java的写法时,此类可以修剪字符串变量 (将字符串 #0 附加到字符串的结尾) 。 。 。 。
    * 这个类更适合处理缺乏某些变量或维度的单个文件.
    * 此类可删除指定值的行块 [CF 数字 断层采样 (副秘书长) 不完全的多层面阵列文件](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)   
         
* 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 然后您可以编辑它来调谐它。
    
在您回答问题后, GenerateDatasetsXml 为这类数据集所做的第一件事就是打印样本文件的 ncdump 类结构。 因此,如果您通过 GenerateDatasets 输入第一个循环的几个愚蠢的答案 Xml,至少你会看到 ERDDAP™ 可读取文件,并查看文件中的尺寸和变量。 然后可以通过GenerateDatasetsXml为第二个循环给出更好的答案.
    
组 - 生成数据 Xml会要求一个"小组". 您可以输入“ ” 以搜索任何/ 所有组 。 *有点 组* " 或 " *某些组/某些子组* " 让它搜索特定群体,或 " \\[ 根号 \\] "让它只搜索根组。 组合字符串变为&lt;组 &gt; 在 datasets.xml 用于数据集的信息 (虽然 " \\[ 根号 \\] "变成") 。 。 。 。
    
尺寸CSV -- 生成数据 Xml将要求一个"DimensionsCSV"字符串. 这是一组维度的源名称的逗号分隔值列表. 生成数据 Xml 只在样本中读取数据变量 .nc 使用其中部分或全部维度的文档 (而不是其他层面) ,加上文件中的所有scalar变量,并用这些数据变量制作数据集。 如果一个维度在一个组中,您必须指定它的全名,例如, " *组Name/dimensionName* " ..
如果您没有指定 (空字符串) ,生成数据 Xml将寻找最具有维度的变量,其理论是它们将是最有趣的,但有时你可能会想从使用其他维度组的其他数据变量组中制作数据集.
如果你只是指定一个不存在的维度名称 (例如,NOQMATCH) , (中文). ERDDAP™ 只会找到所有的平面变量。
"DimensionsCSV"字符串变成&lt;维度CSV&gt; datasets.xml 用于数据集的信息。
    
#### 治疗DimensionsAs{#treatdimensionsas} 
有一类无效 .nc 文件 (因为他们没有遵守CF规则) 具有多个层面 (例如,拉特,龙,时间) 他们应该只用一个维度 (例如,时间) 例如:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
EDDTable From MultidimNcFiles 具有处理这些文件的特殊功能: 如果您在全局数据集中添加全局属性"treat DimensionAs" addAttributes ,你可以告诉 ERDDAP™ 处理某些维度 (例如,拉特和龙) 仿佛它们是另一个层面 (例如,时间) 。 。 。 属性值必须是一个逗号分隔列表,指定"从"维度,然后是"到"维度,例如,,
 <att name="treatDimensionsAs"> 拉特,龙,时间 </att>   
礛 ERDDAP™ 将读取文件, 如:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
当然,清单中每个维度的现有大小必须相同;否则, ERDDAP™ 将该文件视为“坏文件”。

请注意,这些文件是无效的,因为它们没有遵守CF规则. 所以虽然 ERDDAP™ 我们强烈建议不要这样创建文件 因为其他基于CF的软件工具 无法正确读取它们 如果你已经有这样的文件,我们强烈建议尽快以有效的文件取代它们.
    
### 来自 NcFiles 的 EDD 表格{#eddtablefromncfiles} 
 [ **来自 NcFiles 的 EDD 表格** ](#eddtablefromncfiles) 数据汇总 NetCDF   (v3 或 v4 类型)   .nc   (或 [ .nc 门L](#ncml-files) ) 文档和 [扎尔](https://github.com/zarr-developers/zarr-python) 文件 (第2.25号版本) 包含多个变量,每个变量有一个共同的维度 (例如,时间) 或多个共同层面 (例如,时间,高度 (或深度) ,经度) 。 。 。 文件必须具有相同的尺寸名称. 给定文件可能针对每个维度有多个值,不同源文件的值可能不同. 文件可能有附加维度的字符变量 (比如说, 弦乐14) 。 。 。 看这个班级的超级班级 [来自文件的 EDD 表格](#eddtablefromfiles) ,用于了解这个班级是如何工作的以及如何使用.

Zarr文件行为略有不同,需要文件NameRegex或路径Regex包含"zarr".

* 如果 .nc 文件使用 [CF 数字 断层采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 文件格式,尝试使用 [来自 NcCFF 的 EDD 表格](#eddtablefromncfiles) 在尝试之前
     
* 新的表格数据集 .nc 文件,请尝试更新 [来自多分位Nc Files的 EDD表](#eddtablefrommultidimncfiles) 先说
     
* 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 然后您可以编辑它来调谐它。
    
在您回答问题后, GenerateDatasetsXml 为这类数据集所做的第一件事就是打印样本文件的 ncdump 类结构。 因此,如果您通过 GenerateDatasets 输入第一个循环的几个愚蠢的答案 Xml,至少你会看到 ERDDAP™ 可读取文件,并查看文件中的尺寸和变量。 然后可以通过GenerateDatasetsXml为第二个循环给出更好的答案.
    
尺寸CSV -- 生成数据 Xml将要求一个"DimensionsCSV"字符串. 这是一组维度的源名称的逗号分隔值列表. 生成数据 Xml 将在 .nc 文档使用其中的一些或所有维度,加上所有刻度变量,并生成来自这些数据变量的数据集。 如果您没有指定 (空字符串) ,生成数据 Xml将寻找最具有维度的变量,其理论是它们将是最有趣的,但有时你可能会想从使用其他维度组的其他数据变量组中制作数据集.
    
* 1D 示例:1D文件与2D,3D,4D,.文件有些不同.
    * 你可能会有一套 .nc 数据文件,每个文件有一个漂浮浮浮标上一个月的数据值。
    * 每个文件将有一个维度, 例如时间 (大小 = \\[ 数量 \\] ) 。 。 。 。
    * 每个文件将有一个或多个使用该维度的1D变量,例如时间,经度,纬度,气温,.
    * 每个文件可能有2D字符变量,例如,有尺寸 (时间,nCharacters) 。 。 。 。
         
* 2D 示例:
    * 你可能会有一套 .nc 数据文件,每个文件有一个漂浮浮浮标上一个月的数据值。
    * 每个文件将有两个维度, 例如时间 (大小 = \\[ 数量 \\] ) 编号 (大小 = 1) 。 。 。 。
    * 每个文件将有2个1D变量,其名称与维度相同,并使用同名维度,例如时间 (时间) 编号 (编号) 。 。 。 这些1D变量应当列入&lt; dataVariable &gt;位于数据集的XML中.
    * 每个文件将有一个或多个2D变量,例如经度,纬度,气温,水温,.
    * 每个文件可能有3D字符变量,例如,有尺寸 (时间,id,nCharacters) 。 。 。 。
         
* 3D 示例
    * 你可能会有一套 .nc 数据文件,每个文件有一个固定浮标上一个月的数据值。
    * 每个文件将有三个维度, 例如时间 (大小 = \\[ 数量 \\] ) 鼠标 (大小 = 1) ,和龙 (大小 = 1) 。 。 。 。
    * 每个文件将有3个1D变量,其名称与维度相同,使用同名维度,例如时间 (时间) 鼠标 (号) ,龙 (龙) 。 。 。 这些1D变量应当列入&lt; dataVariable &gt;位于数据集的XML中.
    * 每个文件将有一个或多个3D变量,例如空气温度,水温,.
    * 每个文件可能有4D字符变量,例如,有尺寸 (时间、时间、时间、时间、时间、时间) 。 。 。 。
    * 文件的名字可能在文件名内有浮标的名字.
         
* 4D 示例
    * 你可能会有一套 .nc 数据文件,每个文件有一个月的数据值 一个站。 每个时间点,车站都会进行一系列深度的读数.
    * 每个文件将包含4个维度, 例如时间 (大小 = \\[ 数量 \\] ) 深处 (大小 = \\[ 数量 \\] ) 鼠标 (大小 = 1) ,和龙 (大小 = 1) 。 。 。 。
    * 每个文件将有4个1D变量,其名称与维度相同,并使用同名维度,例如时间 (时间) 深处 (深度) 鼠标 (号) ,龙 (龙) 。 。 。 这些1D变量应当列入&lt; dataVariable &gt;位于数据集的XML中.
    * 每个文件将有一个或多个4D变量,例如气温,水温,.
    * 每个文件可能有5D字符变量,例如,有尺寸 (时间,深度,拉特,伦,n) 。 。 。 。
    * 文件的名字可能在文件名内有浮标的名字.
         
### 来自 NcCFF 的 EDD 表格{#eddtablefromnccffiles} 
 [ **来自 NcCFF 的 EDD 表格** ](#eddtablefromnccffiles) 数据汇总 NetCDF   (v3 或 v4 类型)   .nc   (或 [ .nc 门L](#ncml-files) ) 使用文件格式之一的文件 [CF 数字 断层采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 公约。 看这个班级的超级班级 [来自文件的 EDD 表格](#eddtablefromfiles) ,用于了解这个班级是如何工作的以及如何使用.

对于使用一个多维CF DSG变体的文件,请使用 [来自多分位Nc Files的 EDD表](#eddtablefrommultidimncfiles) 相反。

CF DSG公约定义了数十种文件格式,并包括许多细微的变体. 这个课处理我们所知的所有变异 但我们可能错过了一个 (或超过) 。 。 。 因此,如果这个课不能读取 您的 CF DSG 文件的数据,请 [争取额外支助](/docs/intro#support) 。 。 。 。

我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 然后您可以编辑它来调谐它。
 
### 来自 Nccsv 文件的 EDD 表格{#eddtablefromnccsvfiles} 
 [ **来自 Nccsv 文件的 EDD 表格** ](#eddtablefromnccsvfiles) 数据汇总 [NCCSV 网络](/docs/user/nccsv-1.00) ASCII.csv 文档. 看这个班级的超级班级 [来自文件的 EDD 表格](#eddtablefromfiles) ,用于了解这个班级是如何工作的以及如何使用.

* 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 然后您可以编辑它来调谐它。
    
在您回答问题后, GenerateDatasetsXml 为这类数据集所做的第一件事就是打印样本文件的 ncdump 类结构。 因此,如果您通过 GenerateDatasets 输入第一个循环的几个愚蠢的答案 Xml,至少你会看到 ERDDAP™ 可读取文件,并查看文件中的尺寸和变量。 然后可以通过GenerateDatasetsXml为第二个循环给出更好的答案.
    
* 警告:何时 ERDDAP™ 读取 NCCSV 数据文件,如果它在给定行上发现错误 (例如,项目数量不正确) ,它记录了警告信息 ("预言:坏行 (编号) 数据"... 后面线路的坏线列表) 页:1 [日志.txt 文件](/docs/server-admin/additional-information#log) 然后继续读取其余的数据文件。 因此,你的责任是定期检查 (或为此编写脚本) 对于日志中的消息。 txt 这样您就可以解决数据文件中的问题 。 ERDDAP™ 这样设置,用户可以继续读取所有可用的有效数据,即使文件的某些行有缺陷。
     
### 来自NOS的EDD表{#eddtablefromnos} 
 [ **来自NOS的EDD表** ](#eddtablefromnos)   (过期) 处理来自 a 的数据 NOAA   [职位](https://opendap.co-ops.nos.noaa.gov/axis/) 源,用于 [ SOAP+XML ](https://www.w3schools.com/xml/xml_soap.asp) 请求和答复。 它非常具体 NOAA NOS的XML. (英语). 参见数据集2.xml中的EDDTable FromNOS数据集样本.
 
### EDD 表从OBIS{#eddtablefromobis} 
 [ **EDD 表从OBIS** ](#eddtablefromobis) 处理来自海洋生物地理信息系统的数据 (办公室) 服务器 (当时是http://www.iobis.org ) 。 。 。 可能没有更多的活动服务器使用这种现已过时的OBIS服务器系统.

* OBIS服务器期望有一个XML请求,并返回一个XML响应.
* 因为所有的OBIS服务器都以同样的方式服务于相同的变量 (当时是http://iobis.org/tech/provider/questions) 中,您不需要指定多少设置 OBIS 数据集。 ERDDAP 。 。 。 。
* 你一定要包括一个" creator\\_email " 全球 addAttributes ,因为该信息在许可证内使用。 通过读取源代码URL的XML响应,可以找到合适的电子邮件地址.
* 您可能或无法获得全局属性 [&lt; subsetVariables &gt;] (中文(简体) ). (# 亚位变量) 与 OBIS 服务器合作。 如果你尝试,只要尝试一个变量 (例如,科学名称或基因) 。 。 。 。
#### EDD 表从OBIS 模板 XML{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### 来自Parquet Files的 EDD 表格{#eddtablefromparquetfiles} 
 [ **来自Parquet Files的 EDD 表格** ](#eddtablefromparquetfiles) 处理来自 [公园](https://parquet.apache.org/) 。 。 。 看这个班级的超级班级 [来自文件的 EDD 表格](#eddtablefromfiles) ,用于了解这个班级是如何工作的以及如何使用.

* Parquet被设计为非常高效的压缩,因此它可能会给予你比其他格式更小的文件大小.
* 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 然后您可以编辑它来调谐它。
* 警告:何时 ERDDAP™ 读取 Parquet 数据文件,如果它在给定行上找到错误 (例如,项目数量不正确) ,它记录了警告信息 ("预言:坏行 (编号) 数据"... 后面线路的坏线列表) 页:1 [日志.txt 文件](/docs/server-admin/additional-information#log) 然后继续读取其余的数据文件。 因此,你的责任是定期检查 (或为此编写脚本) 对于日志中的消息。 txt 这样您就可以解决数据文件中的问题 。 ERDDAP™ 这样设置,用户可以继续读取所有可用的有效数据,即使文件的某些行有缺陷。
     
### 从 EDD 表格 SOS  {#eddtablefromsos} 
 [ **从 EDD 表格 SOS ** ](#eddtablefromsos) 处理传感器观测服务提供的数据 (瑞典/ [ SOS ](https://www.ogc.org/standards/sos) ) 服务器。

* 该数据集类型汇总了一组站台的数据,这些站台都由一个站台提供服务。 SOS 服务器。
* 这些站台都为同一组变量服务 (虽然每个站点的源头不必服务所有变量) 。 。 。 。
*    SOS 服务器需要 XML 请求并返回 XML 响应 。
* 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 然后您可以编辑它来调谐它。 生成 XML 数据集并不容易 SOS 手工数据集。 为了找到所需的信息,你必须访问 sourceUrl +吗? 服务= SOS 请求( S) GetCapabilities " 在浏览器中;查看XML;手动制作GetObservation请求;查看XML对请求的回应.
* 偶尔会增加新的类型 SOS 服务器和对旧服务器的更改,对 ERDDAP™ 从服务器的响应中自动检测服务器类型。 使用&lt;sosServerType &gt; (英语). (价值为IOOS\\_NDBC,IOOS\\_NOS, OOSTethys ,或 WHOI) 现在强烈建议。 如果您对此类数据集有问题, 请尝试重运行 GenerateDatasets Xml 为 SOS 服务器。 生成 数据集 Xml会让你试试不同的&lt;sosServerType &gt; 选项,直到您为给定服务器找到正确的选项。
*    SOS 概览:
    * 瑞典 (传感器网络启用) 和 SOS   (传感器观察处) 已经 [OpenGIS 标准](https://www.ogc.org/standards) 。 。 。 该网站有标准文件。
    * 那个 OGC 网页服务共同规格 ( OGC 06-121r3 (韩语).) 覆盖构建 GET 和 POST 查询 (见第7.2.3节和第9节。) 。 。 。 。
    * 如果您向一个 SOS 服务器 ( sourceUrl + "? 服务= SOS 请求( S) GetCapabilities " , ") ,您可以得到一个 xml 的结果,并列出站台和观测到的 他们有数据的属性。
    * 财产法正式提到财产法。 例如,urn:ogc:phenomenon:经度:wgs84或https://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
    * 被观测到的产物不是变量.
    * 不止一个变量可能观测到相同 财产 (例如,Temp内外 时间可能都观察到了 财产https://mmisw.org/ont/cf/parameter/air\\_temperature) 。 。 。 。
    * 如果您向一个 SOS 服务器,您可以得到一个 xml 的结果,在响应中描述字段名称、字段单位和数据。 字段名称包括经度、纬度、深度 (也许) 时间
    * 每个 dataVariable 用于 EDD 表格 SOS 必须包含一个“ observatedProperty ” 属性,该属性可以识别从服务器获取该变量必须请求的可观察到的Property 。 经常是几个 dataVariable s将列出同样的复合观测数据。
    * 每个数据类型 dataVariable 服务器可能不指定。 如果是,您必须查看服务器的XML数据回复,并指定适当的[&lt;数据类型&gt;s] (# 数据类型) 输入 ERDDAP™ 数据集 dataVariable 定义。
    *    (在编写本报告时) 有点 SOS 服务器响应多个观测对象的观测请求 仅通过返回第一个观测到的产物的结果来获取财产。 (没有错误消息 &#33;) 参见构建器参数请求 央视PropertiesSeparately. 腾讯网.
* 从 EDD 表格 SOS 自动添加
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
到数据集创建时的全局属性。
*    SOS 服务器通常表示 [单位](#units) 与 [大学](https://unitsofmeasure.org/ucum.html) 系统。 多数 ERDDAP™ 服务器快递单位 [ UDUNITS ](https://www.unidata.ucar.edu/software/udunits/) 系统。 如果需要在两个系统之间转换,可以使用 [ ERDDAP 将 UCUM 单位转换为/从 UDUNITS ](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) 。 。 。 。
#### 从 EDD 表格 SOS 模板 XML{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### 来自垃圾的 EDD 表格{#eddtablefromthreddsfiles} 
 [ **来自垃圾的 EDD 表格** ](#eddtablefromthreddsfiles)   (已贬值) 汇总带有多个变量的数据文件,每个变量都有一个或多个共享维度 (例如,时间,高度 (或深度) ,经度) ,服务于 [红色 OPeNDAP 服务器](https://www.unidata.ucar.edu/software/tds/) 。 。 。 。

* 此数据集类型是 **过期** 。 。 。 较新和较普遍的解决办法是使用 [缓存 来自 EDD 表格的 Url 选项 从文件](#cachefromurl)   (或变体) ,它使远程文件的本地拷贝并服务于本地文件的数据。 那个&lt;缓存FromUrl &gt; 选项可用于发布类似目录文件列表的任何网络来源的任意类型的表格数据文件. **   
如果你因为某种原因不能成功,就发电子邮件给克里斯. 约翰在Noaa.gov。
如果2020年之前没有投诉,此数据集类型可以删除. ** 
* 我们强烈建议使用 [生成数据 Xml 程序](#generatedatasetsxml) 简略的草案 datasets.xml 此数据集的块 。 然后您可以编辑它来调谐它。
* 在大多数情况下,每个文件对最左端有多个值 (第一个) 维度,例如时间。
* 文件经常出现 (但没必要) 对其他维度具有单一值 (例如,高度 (或深度) ,经度) 。 。 。 。
* 文件可能有附加维度的字符变量 (例如, nCharacters 键) 。 。 。 。
* THREDDS服务器可以通过URL中的"/thredds/"识别. 举例来说,
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* THREDDS服务器在不同的地方都有目录. 此类要求URL包括"/thredds/catalog/". 通常可以在根目录中的浏览器中开始找到这个变量,然后点击想要的子目录.
* 此类可读取THREDDS提供的目录.xml文件,其中包含列表&lt;目录参考文献 &gt; (引用额外的目录.xml 子文件) 和&lt;数据集&gt;s (数据文件) 。 。 。 。
* 那个&lt;文件 Dir &gt; 设置被忽略。 由于本课下载并制作每个远程数据文件的本地副本, ERDDAP™ 强制文件 将是 *大家长会* /副本/ * datasetID * (原始内容存档于2018-09-26). /.
* 对于&lt; sourceUrl &gt;,对THREDDS服务器中的数据集使用目录.xml文件的URL,例如: 对于这个可用于网页浏览器的URL,
    https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[ 2020-10-21 (中文(简体) ). 此服务器已不再可靠可用 。 \\] , (中文).
使用情况&lt; sourceUrl &gt; 翻译:https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml&lt;页:1 sourceUrl &gt; 翻译:
     (但放上一条线) 。 。 。 。
* 由于该类总是下载并制作每个远程数据文件的本地副本,所以你不应该将此数据集包在 [EDD 表格复制](#eddtablecopy) 。 。 。 。
* 此数据集类型支持一个OPTIONAL,很少使用,特殊标记,&lt;特殊模式 &gt; *模式* &lt;/ specialMode&gt;,可用于指定特殊,硬码规则应用于确定哪些文件应从服务器下载. 目前,唯一有效的 *模式* 是SAMOS,使用数据集来自https://tds.coaps.fsu.edu/thredds/catalog/samos只下载最后一个版本编号的文件。
* 看这个班级的超级班级 [来自文件的 EDD 表格](#eddtablefromfiles) ,用于了解这个班级是如何工作的以及如何使用.
* 见1D、2D、3D和4D实例 [来自 NcFiles 的 EDD 表格](#eddtablefromncfiles) 。 。 。 。
     
### 从 EDD 表格 WFS 文件{#eddtablefromwfsfiles} 
 [ **从 EDD 表格 WFS 文件** ](#eddtablefromwfsfiles)   (过期) 制作一个本地副本,复制来自 ArcGIS 地图服务器 WFS 服务器,这样数据就可以快速重新保存到 ERDDAP™ 用户。

* 您需要指定一个特殊格式 sourceUrl 要告诉的全局属性 ERDDAP™ 如何向服务器请求特性信息 。 请使用此示例作为模板 :
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (但都放在一条线上) 
* 您需要添加一个特殊的全局属性 。 ERDDAP™ 如何识别应下载的数据块的名称。 这可能对所有 EDD Table 来自 WFS 文件数据集 :
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* 由于该类总是下载并制作每个远程数据文件的本地副本,所以你不应该将此数据集包在 [EDD 表格复制](#eddtablecopy) 。 。 。 。
* 看这个班级的超级班级 [来自文件的 EDD 表格](#eddtablefromfiles) ,以了解该类如何运作和如何使用。
     
### EDD 表格外观{#eddtableaggregaterows} 
 [ **EDD 表格外观** ](#eddtableaggregaterows) 可以从一组"孩子"的EDDTable数据集中制作一个EDDTable数据集.

* 以下是 EDDTable 外观标记器的一些用途:
    * 您可以从两种不同的文件或数据来源制作一个 EDDTableAggregateRows 数据集,例如,一个数据集,其数据保存在上月底之前 .nc CF文件和一个有本月数据的数据集存储在关系数据库中.
    * 您可以制作一个 EDTableAggregateRows 数据集来处理源文件的更改 (例如,时间格式改变,或者变量名称改变,或者数据 类型/ scale\\_factor 页:1 add\\_offset 已更改) 。 。 。 在这种情况下,一个孩子将从更改前制作的文件获得数据,另一个孩子将从更改后制作的文件获得数据。 这种使用 EDDTableAggregateRows 是使用 [NcML 数据](#ncml-files) 或 [ NCO ](#netcdf-operators-nco) 。 。 。 除非文件名中有显著的特征( 这样您就可以使用)&lt;fileNameRegex&gt; 用于确定属于哪个孩子数据集的文件,您可能需要将两个孩子数据集的文件存储在不同目录中。
    * 您可以制作一个 EDDTableAggregateRows 数据集,该数据集包含一个或多个类似但不同的数据集的共享变量子集,例如,一个数据集,它从配置文件数据集、 TimeSeriesProfile 数据集和一个TraprioryProfile 数据集的组合中生成一个配置文件数据集 (它们有一些不同的变量和一些共同的变量——在这种情况下,你必须为儿童数据集制作特殊的变量,只有常见的变量。) 。 。 。 。
    * 你可以拥有几个独立的数据集,每个数据集都有相同的数据类型,但来自不同的站点. 你可以把这些数据集保持完整,但也可以创建一个 EDDTableAggregateRows 数据集,其中包含来自所有站点的数据 -- 每个孩子数据集可能都很简单 [来自Erddap的EDD表](#eddfromerddap) ,指现有站台数据集之一. 如果您这样做, 请给 EDD Table FromErddap 数据集一个不同的 datasetID 而不是原始的独立数据集,例如,在原始数据集中附加“Child” datasetID 。 。 。 。
* 每个孩子&lt;数据集 &gt; 的指定必须是完整的数据集,仿佛是一个独立的数据集。 每个都一样 [ dataVariable 编号](#datavariable) ,在同一顺序, 与相同 [ destinationName 编号](#destinationname) , (中文). [数据 类型](#datatype) , (中文). [ missing\\_value 编号](#missing_value) , (中文). [QQ 过滤器](#missing_value) ,以及 [单位](#units) 。 。 。 EDDTableAggregateRows数据集每个变量的元数据来自第一个子数据集中的变量,但EDDTableAggregateRows将更新该变量. [ actual\\_range ](#actual_range) 元数据将成为所有儿童的实际范围。
* 建议: 获取每个孩子数据集作为独立的数据集工作. 然后尝试通过剪切和粘贴来制作 EDDTable AggregateRows 数据集 datasets.xml 将每个块划入新的 EDDTable 外加门 行数据集.
* 数据集默认排序顺序 -- 儿童数据集的顺序决定了结果的总体默认排序顺序. 当然,用户可以通过附加( C) 请求给定的一组结果另作排序( C) orderBy  (" , " *逗号变量列表* " , ") 以结束查询。
* "源头" [全球 属性](#global-attributes) 对于EDDTableAggregateRows来说,是第一个儿童数据集的合并全球属性。 EDD 表格标记 行可以有一个全局&lt; addAttributes &gt;提供额外的全局属性或覆盖源全局属性.
#### EDD 表格外观 行骨架 XML{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD 表格复制{#eddtablecopy} 
 [ **EDD 表格复制** ](#eddtablecopy) 可以制作许多类型的EDDTable数据集的本地拷贝,然后从本地拷贝中快速重新保存数据.

* EDD 表格复制 (对于网格数据, [ EDDGrid 复制](#eddgridcopy) ) 非常容易使用,而且非常有效 **解决远程数据源数据服务方面一些最大的问题:** 
    * 从远程数据源获取数据可能很慢.
        * 它们可能很慢,因为它们本来就很慢 (例如,无效的服务器类型) , (中文).
        * 因为他们的请求太多,
        * 或者因为您的服务器或远程服务器带宽有限。
    * 远程数据集有时无法使用 (同样,出于各种原因) 。 。 。 。
    * 依赖一个数据来源,不能很好地衡量 (例如,许多用户和许多 ERDDAP 使用它 使用它) 。 。 。 。
         
* How It Works - EDDTableCopy通过自动制作和维护本地的数据副本以及服务本地副本的数据来解决这些问题. ERDDAP™ 可以非常非常非常迅速地提供本地副本中的数据. 而制作和使用本地副本可以减轻远程服务器的负担. 而本地副本是原作的备份,在原作发生意外时有用.
    
在本地复制一个数据集方面没有任何新情况。 新的是这个班级能办到\\*简单\\*创建和\\*维护\\*本地数据副本\\*变量\\*各类远程数据源和\\*添加元数据\\*在复制数据时。
    
#### EDD Table Copy vs&lt;从Url&gt; 缓存{#eddtablecopy-vs-cachefromurl} 
&lt;缓存FromUrl&gt;是 EDDTable Copy 的替代品. 他们的工作不同。

* 电子数据交换表 通过请求远程服务提供块数据复制作品,并将这些块存储在本地文件中. 因此,EDDTableCopy在某些情况下有用,因为数据可以通过远程服务获取。
* [&lt;缓存从Url&gt;] (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;我的宝贝) 下载远程网站上列出的现有文件。&lt;缓存FromUrl&gt;比较容易使用,也比较可靠,因为它可以很容易地分辨何时有新的远程数据文件,或何时有远程数据文件发生变化,因此需要下载.

如果存在 EDD Table Copy 或&lt;可以从 Url &gt; 处使用缓存, 使用&lt;缓存FromUrl&gt;,因为它比较容易和可靠.
     
#### &lt;提取 名称( G);{#extractdestinationnames} 
电子数据交换表 通过请求远程数据集的块数据来复制本地数据。 电子数据交换表 复制通过请求差异来决定要请求的块( D) () 数值&lt;提取列表名称 &gt; (定义 datasets.xml ,见下文) ,这些是远程数据集中变量的空间分隔目的地名称。 举例来说,
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
可能得出不同的数值组合 漂流器=tig17, profile=1017, profile=1017, profile=1095,... 漂流器=une12, profile=1223, profile=une12, profile=1251,...

在一栏的情况下 (例如,简介) 如果剖面图的数量非常多,也许还需要另外指定一个摘要。 目标 名称 (例如,漂流者) 用于细分简介。 这导致特定目录中的数据文件减少,这可能导致更快的访问.
    
#### 本地文件{#local-files} 
每一块数据分别储存在 NetCDF 文件的子目录 *大家长会* /副本/ * datasetID * 页:1 (一、导 言 [设置. xml](/docs/server-admin/deploy-install#setupxml) ) 。 。 。 除了最后的摘录 Destination 之外, 还有一个子目录级 。 例如,Tig17+1017的数据将储存在
     *大家长会* /副本/样本数据集/tig17/1017 .nc 。 。 。 。
例如,une12+1251的数据将存储在
     *大家长会* /复制/样本数据集/une12/1251 .nc 。 。 。 。
根据数据值创建的目录和文件名被修改, 使其安全文件名 (例如,空格被“ x20” 替换) 这不影响实际数据。
     
#### 新建数据{#new-data} 
每次 EDD 表格 复制被重新装入, 它检查远程数据集, 以查看可用的不同块 。 如果一个数据块的文件已经不存在,则请求获取该块会被添加到队列中. ERDDAP 任务Thread 处理所有排队的数据块请求, 逐个处理 。 您可以看到关于任务Thread活动的统计数据 。 [状况 页次](/docs/server-admin/additional-information#status-page) 和在 [每日报告](/docs/server-admin/additional-information#daily-report) 。 。 。 。 (对 ERDDAP™ 可以为此进程分配多个任务, 但是这将使用许多远程数据源的带宽、内存和 CPU 时间, 以及很多本地 ERDDAP 带宽、内存和CPU时间,都不是好主意。) 
    
注:EDDTable Copy第一次装入EDDTable Copy, (如果一切顺利) 任务Thread 的队列中会添加很多对块数据的请求, 但是没有创建本地数据文件 。 因此构造器将失败, 但任务Thread将继续工作并创建本地文件 。 如果一切顺利, 任务Thread 将制作一些本地数据文件, 并进行下一次重新装入数据集的尝试 (15分钟后) 将会成功,但一开始数据非常有限。
    
注:在本地数据集获得一些数据并出现在您 ERDDAP ,如果远程数据集暂时或永久无法访问,则本地数据集仍将有效。
    
警告: 如果远程数据集是大型的和/或远程服务器是慢的 (这就是问题所在,不是吗?) ,需要很长时间才能制作完整的本地副本。 在某些情况下,所需时间是不可接受的。 例如,通过T1线传输1 TB 数据 (0.15 GB/s (单位:千兆克)) 在最佳条件下至少需要60天。 此外,它还在远程和本地计算机上使用了大量的带宽,内存和CPU时间. 解决方案是将一个硬盘寄给远程数据集的管理员,这样 s/他就可以制作一个数据集的副本,并将硬盘寄回给您. 将数据用作起点,EDDTableCopy将增加数据。 (亚马逊的EC2云服务公司就是这样处理问题的, 即使他们的系统有很多带宽。) 
    
警告(Warning):如果某个数值组合从远程数据集消失,EDDTableCopy不会删除本地复制文件. 欲者可自删.
    
#### 表格复制&lt;检查SourceData&gt;{#tablecopy-checksourcedata} 
那个 datasets.xml 用于此数据集的可选标签
```
    <checkSourceData>true</checkSourceData>  
```
默认值为真 。 如果/当你将其设定为虚假时,数据集将永远不会检查源数据集,以查看是否有其他可用的数据.
     
#### 建议使用{#recommended-use} 
1. 创建&lt;数据集 &gt; 条目 (本地类型,而不是 EDDTable Copy) 用于远程数据源。 **让它正确运作,包括所有想要的元数据.** 
2. 如果速度太慢,请添加 XML 代码,将其包裹在一个 EDDTableCopy 数据集中.
    * 使用不同的语言 datasetID   (也许通过改变 datasetID 老年人 datasetID 一点点) 。 。 。 。
    * 复制&lt;无障碍 改为 &gt;,&lt;重新装入 EveryNminutes &gt; 和&lt;从远程 EDDTable 的 XML 到 EDDTable Copy 的 XML 。 (它们对于 EDDTable Copy 物质的值;它们对内置数据集的值变得无关紧要.) 
    * 创建&lt;提取列表Names &gt; 标记 (见上文) 。 。 。 。
    *   &lt;命令ExtractBy&gt;是远程数据集中目标变量名称的OPTIONAL空间分离列表. 当从远程服务器下载每一块数据时,该块会被这些变量排序 (由第一个变量,然后如果第一个变量是绑定的第二个变量,......) 。 。 。 。 在某些情况下, ERDDAP™ 如果列表中的第一个变量是一个数值变量,则可以更快地从本地数据文件中提取数据 ( "time" 计为数字变量) 。 。 。 但以适合数据集的方式选择这些变量.
3.   ERDDAP™ 将制作并维护当地的数据副本。
         
* 警告: EDDTable Copy 假设每个块的数据值永远不会改变. 如果/当它们出现时,您需要手动删除块文件 *大家长会* /副本/ * datasetID * 改变和 [旗帜](/docs/server-admin/additional-information#flag) 要重新装入的数据集将替换已删除的块。 如果您对数据集有电子邮件订阅, 您将得到两个电子邮件: 一个是数据集第一次重新装入并开始复制数据, 另一个是再次装入数据集 (自动) 并检测新的本地数据文件。
     
* 更改元数据 - —— - 说 如果您需要改变任何 addAttributes 或更改与源数据集相关的变量的顺序:
    1. 改变 addAttributes 用于源数据集 datasets.xml 根据需要。
    2. 删除复制的文件之一 。
    3. 设定 [旗帜](/docs/server-admin/additional-information#flag) 要立即重新装入数据集。 如果您确实使用一个旗子,而且您对数据集有电子邮件订阅,您将获得两个电子邮件:一个是数据集第一次重新装入并开始复制数据,另一个是再次装入数据集时 (自动) 并检测新的本地数据文件。
    4. 删除的文件将随着新的元数据重新生成 。 如果源数据集永远无法提供,EDDTableCopy数据集将会从再生成的文件中获得元数据,因为它是最年轻的文件.
         
*    [ EDDGrid 复制](#eddgridcopy) 与EDDTableCopy非常相似,但与网格化数据集合作.
####  EDDTable 复制骨架 XML{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- - 说吧

## 细节{#details-1} 

以下是常见标记和属性的详细描述.

### &lt;角化单元和gt;{#angulardegreeunits} 
* [ ** &lt;角化单元 &gt; ** [ . ] (#角单位) 是一个很少使用的 OPTIONAL 标签&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 它包含一个逗号分隔的单元字符串列表 ERDDAP™ 应视作为角度单位。 如果一个变量有一个这样的单位, tabledap 因为 orderByMean 过滤器将以特殊方式计算平均值,然后将平均值报告为-180至180的值。 见 ERDDAP 当前默认列表的 EDStatic.java 源代码文件 。 此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。
### &lt;角化DegreeTrue Units&gt; 角化调制器{#angulardegreetrueunits} 
* [ ** &lt;角线 学位单位 &gt; ** [ . ] (#角度对数) 是一个很少使用的 OPTIONAL 标签&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 它包含一个逗号分隔的单元字符串列表 ERDDAP™ 应视为角度真实单位。 如果一个变量有一个这样的单位, tabledap 因为 orderByMean 过滤器将以特殊方式计算平均值,然后将平均值报告为0到360的值. 见 ERDDAP 当前默认列表的 EDStatic.java 源文件 。 此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。
     
### &lt;常见标准名 & gt;{#commonstandardnames} 
* [ ** &lt;普通标准名称 &gt; ** [ . ] (# 通用标准名称) 是一个很少使用的 OPTIONAL 标签&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 以指定一个逗号分隔的常见列表 [CF 标准名称](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) 。 。 。 。 例如,
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
此列表在DataProviderForm3.html中用作用户的方便.
如果您想在 datasets.xml 中,从复制当前默认列表开始&lt;通用标准名称 &gt; 输入 ERDDAP 因为
 \\[ 移动猫 \\] /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml文件.
     
### &lt;缓存Minutes & gt;{#cacheminutes} 
* [ ** &lt;缓存密钥 &gt; ** [ . ] (时间) 是一个很少使用的 OPTIONAL 标签&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 指定年龄 (分钟后) 删除缓存中的文件 (默认=60) 。 。 。 。 例如,
```
    <cacheMinutes>60</cacheMinutes>  
```
一般来说,只有图像文件 (因为同样的图像经常被反复要求) 和 .nc 文件 (因为它们必须在发送给用户之前全部创建) 被缓存。 虽然某个请求似乎应该总是回回同样的回复,但事实并非如此。 例如,a tabledap 包含时间的请求 &gt; *有点 时间* 当新的数据到达数据集时,将会改变。 和一个网格dap请求,包括 \\[ 最后一个 \\] 当新的数据到达数据集时,时间维度将会发生变化。 此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。 在此之前 ERDDAP™ v2.00,此选项在设置. xml 中指定,仍然允许但劝阻.

### &lt;缓存 ClearMinutes & gt;{#cacheclearminutes} 
* [ ** &lt;缓存清除 &gt; ** [ . ] (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;时间清澈) 是一个很少使用的 OPTIONAL 标签&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 指定检查缓存文件并删除旧文件的频率 (分钟后)   (默认=15) 。 。 。 。 例如,
```
    <cacheClearMinutes>15</cacheClearMinutes>  
```
当服务器完成处理一个请求时, 它会检查上次缓存清除的时间有多早 。 如果时间太早,它将在 TaskThread 上排队清除缓存的任务 。 此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 这可以在setup.xml中指定,但劝阻.
     
### &lt;转换 Polticate RequestCvexample & gt;{#convertinterpolaterequestcsvexample} 
* [ ** &lt;转换为刑警组织请求Cvexample &gt; ** [ . ] (#转换内插请求cxample) 是一个可选标记&lt;erddapDatasets &gt; (英语). 标记 datasets.xml   \\[ 开始 ERDDAP™ 页:1 \\] 它包含一个实例,将在Interpoate转换器的网页上显示。 默认值为: jplMU RSS T41/分析 sst /比线性/4.
### &lt;转换 PolitogateDatasetIDVariableList&gt; 数据集{#convertinterpolatedatasetidvariablelist} 
* [ ** &lt;转换 PolitogateDatasetID变异列表 &gt; ** [ . ] (# 转换内插的可变列表) 是一个可选标记&lt;erddapDatasets &gt; (英语). 标记 datasets.xml   \\[ 开始 ERDDAP™ 页:1 \\] 它包含一个 CSV 列表 datasetID 可变 将用作Interpoate转换器网页建议的实例名称。 默认值为: jplMU RSS T41/分析 sst 。 。 。 。
### &lt;转换为 PublicSourceUrl&gt;{#converttopublicsourceurl} 
* [ ** &lt;转换为 PublicSourceUrl &gt; ** [ . ] (#转换为公共源代码) 是一个可选标记&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 包含“ from” 和“ to” 属性,指定如何转换匹配的本地 sourceUrl   (通常为 IP 号码) 进入公众 sourceUrl   (a 域名) 。“从”必须具有形式。 \\[ 东西 \\] / 请检查url=值 (帮助). \\[ 东西 \\] /] (中文(简体) ). 这些标记可以有0个或更多. 更多信息见[&lt; sourceUrl &gt;] (中文(简体) ). (# 来源) 。 。 。 。 举例来说,
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
将生成匹配的本地 sourceUrl   (例如,https://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day)   
进入公众 sourceUrl   (https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day) 。 。 。 。
此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。

但出于安全原因和订阅系统的原因 **别用这个**   
相反,总是在&lt; sourceUrl &gt; 标记和使用 [/etc/主机表](https://linux.die.net/man/5/hosts) 在您的服务器上将本地域名转换为 IP 号,而不使用 DNS 服务器。 您可以通过使用 :
ing *一些.域名. Name*   
     
### 数据:图像/png;base64,{#dataimagepngbase64} 
* 当用户请求时 .htmlTable 来自 ERDDAP™ ,如果字符串单元格中的数据包含数据:image/png;base64,然后是base64编码的.png图像, ERDDAP™ 将显示图标 (这样用户就可以看到图像,如果他们在它上徘徊) 并按键将文本或图像保存到剪贴板。 此特性是在 ERDDAP™ v2.19 作者:马可·阿尔巴.
###  drawLandMask  {#drawlandmask} 
*    [ ** drawLandMask ** ](#drawlandmask) 指定默认设置,用于控制在何时以及如何绘制 Landmask ERDDAP™ 绘制地图。 可在以下三个不同的地方指定: datasets.xml   (从最低优先级列表到最高优先级) 数字 :
    
    1. 若为 drawLandMask 在&lt;erddapDatasets &gt; (英语). (没有与任何特定数据集连接) ,然后指定 drawLandMask 用于所有数据集中的所有变量。 举例来说,
    ```
        <drawLandMask>under</drawLandMask>  
    ```
此标签值的任何更改将在下次生效 ERDDAP 读取 datasets.xml 。 。 。 。
如果此标签不存在, 则下方为默认值 。
         
    2. 若为 drawLandMask 指定为给定数据集的全局属性,然后指定默认值 drawLandMask 以该数据集中的所有变量为准,高于任何较低优先级的设定。 举例来说,
    ```
        <att name="drawLandMask">under</att>  
    ```
此标签值的任何更改将在下次生效 ERDDAP™ 重新装入数据集 。
         
    3. 若为 drawLandMask 在给定数据集中被指定为变量的属性,然后指定默认值: drawLandMask 对于数据集中的变量,压倒任何较低优先级的设定. 举例来说,
    ```
        <att name="drawLandMask">under</att>  
    ```
此标签值的任何更改将在下次生效 ERDDAP™ 重新装入数据集 。
    
用户可以推翻默认 (不论何时) 从数据集的 Make A Graph 网页的下拉列表中选择“ Draw land mask” 的值, 或者包含 &. land= *价值* 在请求地图的 URL 中 ERDDAP 。 。 。 。
    
在所有情况下,属性可能有4个值:
    
    * 在绘制地图上的数据之前,“ 下” 绘制土地掩体。
对于网格化数据集,土地以恒定的浅灰色颜色出现.
对于表格数据集,"under"显示陆地和海洋的地形数据.
    * "结束"... 对于网格化的数据集,"over"在绘制地图上的数据后绘制了landmask,这样它就可以遮掩陆地上的任何数据. 对于表格数据集,"over"显示的是海洋的测深和常态的浅灰色,在有陆地的地方,两者都根据数据绘制.
    * "外线"只是勾画了地表,政治界限,湖泊和河流的轮廓.
    * "关闭"不画任何东西。
### &lt;电子邮件“诊断学”ToErdData&gt;{#emaildiagnosticstoerddata} 
* [ ** &lt;电子邮件诊断ToErdData &gt; ** [ . ] (#电子邮件诊断数据) 是一个很少使用的 OPTIONAL 标签&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 。 。 。 标记的值可以是真的 (默认) 或虚假。 如果真是这样 ERDDAP™ 给Chris发邮件 约翰在诺阿。 页:1 (联合国 ERDDAP™ 开发团队) 。 。 。 这应该是安全的,因为没有机密信息 (例如,请求) 包含在电子邮件中。 这应该能够捕捉到任何导致NullPointerExceptions的模糊,完全出乎意料的bugs. 否则,用户会看到例外,但 ERDDAP™ 开发团队没有 (所以我们不知道有问题需要解决) 。 。 。 。
     
### &lt;图表背景颜色和gt;{#graphbackgroundcolor} 
* [ ** &lt;图背景颜色 &gt; ** [ . ] (# 图形背景颜色) 是一个很少使用的 OPTIONAL 标签&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 在图表上指定默认背景颜色。 这影响到几乎所有的图表。 有一些情况没有受到影响。 该颜色在0xAARRGGB的形态中被指定为8位十六进制值,其中AA,RR,GG,和BB分别是不透明,红色,绿色和蓝色的组件. "0x"对大小写敏感,但十六进制数字并不对小写敏感. 例如,完全不透明 (小时) 绿色蓝色,红色=22,绿色=88,蓝色=ee将是0xff2288ee. 不透明白色为0xffffff. 默认为不透明浅蓝色 (0xffccff (英语).) ,其优点是不同于白色,它是许多用于绘制数据的调色板中的重要颜色. 举例来说,
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。
### &lt;ipAddressMax 请求和gt; 存档副本{#ipaddressmaxrequests} 
* [ ** &lt;ipAddressMax 请求 &gt; ** [ . ] (#ipadersmax 请求) 是一个很少使用的可选标签 (首次支持为 ERDDAP™ 页:1) 内&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 这是一种系统的一部分,用来限制过分激进的合法用户和恶意用户同时提出大量要求的能力,这将降低其他用户的系统性能。 新闻 最大请求指定将从任何特定IP地址接受的同步请求的最大数量. 其他请求将收到 HTTP 429 错误: 请求过多 。 在 erddap/download/ 和 erddap/ images/ 中的小的静态文件不能免除这个计数. 默认为15. 最高允许是1000,这是疯狂的高--不要这样做&#33; ERDDAP™ 因为许多合法用户不会接受少于6的数字 (特别是网页浏览器和 WMS 客户) 一次最多满足6项请求。 那个 ERDDAP™ Daily Report 和与每个主要数据集重装一起写到log.txt文件中的类似信息,现在将包含这些IP地址在标题"请求者的IP地址"下的要求的清点. (请求过多) " ..
此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。
    
状态的"Major LoadDatasets Time Series"部分.html包含一个"TooMany"栏目,列出了超过用户ipAddressMax请求设置,从而出现"Too Many Request"错误的请求数量. 这让你很容易看到 当有活跃的过度攻击性的合法用户和恶意用户,所以你可以 (可选) 请查看log.txt文件,然后决定是否要列出这些用户的黑名单 。
    
设此为高数,并无具体错误. 由你决定. 但这样做可以/鼓励人们建立系统,使用大量线程在项目上工作,然后不给他们任何反馈,让他们知道自己正在做的事情没有得到任何好处.
### &lt;ipAddressMax 请求启用 & gt; 命令{#ipaddressmaxrequestsactive} 
* [ ** &lt;ipAddressMax 请求执行 &gt; ** [ . ] (#ipdesignmax 请求活动) 是一个很少使用的可选标签 (首次支持为 ERDDAP™ 页:1) 内&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 这是一种系统的一部分,用来限制过分激进的合法用户和恶意用户同时提出大量要求的能力,这将降低其他用户的系统性能。 ipAddressMax RequestsActive指定了从任何特定IP地址中积极处理的同步请求的最大数量. 其他请求将排在队列中,直到处理完以前的请求。 在 erddap/download/ 和 erddap/ images/ ARE 中,小的静态文件免除了这个计数和相关节奏. 缺省为2. 最高允许100,这是疯狂的高--不要这样做&#33; 您可以将此设定为 1 , 特别是如果您对过度攻击或恶意用户有问题 。 用户仍然会很快得到他们要求的所有数据 (最多为 ipAddress Max 请求) 但他们无法捕捉系统资源 我们不建议设定这个数目 因为它允许过度攻击的合法用户和恶意用户支配 ERDDAP 处理能力。
此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。
     
### &lt;ipAddress Unlimited & gt; 页面存档备份,存于互联网档案馆{#ipaddressunlimited} 
* [ ** &lt;ipAddress 无限制 &gt; ** [ . ] (#没有限制的语句 #) 是一个很少使用的可选标签 (首次支持为 ERDDAP™ 页:1) 内&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 这是一种系统的一部分,用来限制过分激进的合法用户和恶意用户同时提出大量要求的能力,这将降低其他用户的系统性能。 ipAddress Unlimited 是一个以逗号分隔的 IP 地址列表, 您想要允许无限访问您的地址 ERDDAP 。 。 。 看看你的日志。 txt 文件以查看您的服务器用于 IP 地址的格式 。 在一些服务器上,IP地址将以格式#. (其中 # 是整数从 0 到 255) ;而他人则会采用格式:#:#:#:#:#:#:#:#:#:#:#:#:#. 。 。 。 此列表中的请求人不受ipAddressMax请求或ipAddressMax ArequestsActive设置的约束. 这可能是一个二级 ERDDAP™ 或用于您系统中的某些用户或服务器。 ERDDAP™ 总是添加 " (未知的 IP 地址) ",是指 ERDDAP™ 当无法确定请求者的IP地址时,例如,用于在同一服务器上运行的其他进程。
此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。
    
如果由于某种原因,一个用户的所有请求都得到"等待您其他请求处理的时间退出"的错误消息,那么您可以通过将用户的IP地址添加到ipAddressUnlimited列表中,应用该更改,然后从该列表中删除来解决这个问题.
    
### &lt;装入 Datasets MinMinutes & gt; 中{#loaddatasetsminminutes} 
* [ ** &lt;装入 Datasets minutes &gt; ** [ . ] (# 装入数据集分钟) 是一个很少使用的 OPTIONAL 标签&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 指定最小时间 (分钟后) 在主要负载之间 数据集 (何时 ERDDAP™ 重新处理 datasets.xml ,包括检查每个数据集以查看是否需要根据重新装入 每个NMinutes 设置, 默认为 15) 。 。 。 。 例如,
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
如果给定的载荷Datasets耗时少于这次,加载器只是反复查看旗下目录和/或睡眠,直到剩余时间过去. 缺省时间为15分钟,对几乎所有人都应该很好. 将它设为数量较少的唯一缺点是,它将增加频率,以便 ERDDAP™ 重试有错误无法装入的数据集 (例如,远程服务器已关闭) 。 。 。 如果这类数据集很多,而且经常重新测试,那么数据来源可能会认为它具有骚扰/侵略性行为。 此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。 在此之前 ERDDAP™ v2.00,此选项在设置. xml 中指定,仍然允许但劝阻.
     
### &lt;装入 Datasets MaxMinutes & gt; 中{#loaddatasetsmaxminutes} 
* [ ** &lt;加载DatasetsMaxMinutes &gt; ** [ . ] (# 装入数据集max分钟) 是一个可选标记&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 指定最长时间 (分钟后) 主要负载 允许进行数据集工作 (装入前 数据集线程被处理为“ 已安装”, 并中断)   (默认=60) 。 。 。 。 例如,
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
一般来说,只要你合理认为重新装入所有数据集,这至少应定为两倍 (累计数) 应该拿 (由于计算机和网络有时比预期慢) 这应该总比装填DatasetsMinutes长得多。 默认为60分钟. 有些人会更长时间的 此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。 在此之前 ERDDAP™ v2.00,此选项在设置. xml 中指定,仍然允许但劝阻.
     
### &lt;日志等级( G);{#loglevel} 
* [ ** &lt;日志级别 &gt; ** [ . ] (# 日志级别) 是一个可选标记&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 以指定发送到log.txt文件的诊断信件数量。 可以设定为"警告" (最少的讯息) ,“信息” (默认) ,或"所有" (多数消息) 。 。 。 。 例如,
```
    <logLevel>info</logLevel>  
```
此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。 在此之前 ERDDAP™ v2.00,此选项在设置. xml 中指定,仍然允许但劝阻.
     
### &lt;部分请求MaxBytes & gt; 和&lt;部分请求MaxCells & gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [ ** &lt;部分请求MaxBytes &gt; **[ . ] (部分请求字节和部分请求单元格) 页:1** &lt;部分请求MaxCells &gt; ** [ . ] (部分请求字节和部分请求单元格) 很少使用 OPTIONAL 标记&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 。 。 。 。 可能时 (也并不总是可能的) , (中文). ERDDAP™ 将大数据请求分割成块以保存内存 。
    
带32位 Java ,从简单意义上讲,最多同时数 *大块* 请求大约是可用内存的 3/4 (转至Tomcat的 Xmx 值) 除以块大小 (例如, 1200 MB / 100 MB / 12项请求) 。 。 。 其他的事情需要内存,所以实际的请求数量会减少. 在实践中,块是并不总是可能的。 因此,一个巨大的或几个非常巨大的 同时不可切入的请求 可能会引起32位的问题 Java 。 。 。 。

有64点 Java ,Xmx值可以大得多。 因此,记忆的可能性要小得多,成为制约.

您可以在 datasets.xml   (与此处显示的数值不同) 数字 :
对于网格 :&lt;部分请求MaxBytes &gt; 1000000000&lt;/ 部分请求MaxBytes &gt;
表格:&lt;部分请求MaxCells &gt; 1000000&lt;/部分请求

部分请求MaxBytes是部分网格数据请求的首选字节数 (a 占请求总数的比例) 。 。 。 。 默认=100000000 (第10^8号) 。 。 。 体型大一点也不好 (不要超过500MB 因为THREDDS的默认极限 DAP 答复) 。 。 。 但规模较大的文件可能需要较少的查阅量 (想着 ERD 卫星数据,每个时间点在一个单独的文件中 - 最好从每个文件获得更多的数据 在每一个部分请求中) 。 。 。 。

部分请求MaxCells 是首选的单元格最大数量 (NROWS \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ 数据表中的正色) 部分数据要求 (a 占请求总数的比例) 。 。 。 默认值=10万. 更大的尺寸不一定更好。 它们导致更长时间地等待来自来源的第一批数据。

此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。 在此之前 ERDDAP™ v2.00,这些在设置.xml中指定,仍然允许但劝阻.
     
### &lt;请求黑名单 & gt;{#requestblacklist} 
* [ ** &lt;请求黑名单 &gt; ** [ . ] (请求黑名单)   [是可选标签](/docs/server-admin/additional-information#frequent-crashes-or-freezes) 内&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 它包含一个以逗号分隔的将被列入黑名单的 IP 地址列表。 此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。
    * 这可以用来抵挡 [拒绝服务攻击](https://en.wikipedia.org/wiki/Denial_of_service) 过于狂热 [网络机器人](https://en.wikipedia.org/wiki/Internet_bot) ,或任何其他类型的麻烦用户。
    * 麻烦的用户... 若为 ERDDAP™ 缓慢到一个爬行或冻结/停止,原因往往是一个麻烦的用户,他们一次运行一个以上的脚本和/或提出大量非常大,极低效率或无效的请求,或同时请求. 进去看看 [日志.txt](/docs/server-admin/additional-information#log) 以查看是否如此,并找到麻烦用户的数字IP地址。 如果有问题,你可能应该把用户列入黑名单。
        
何时 ERDDAP™ 从黑名单的 IP 地址获得请求, 它会返回 HTTP Error 403: Forbidden 。 随附的文本错误消息鼓励用户发送电子邮件给您。 ERDDAP 管理员,解决问题。 如果他们需要时间读取错误信息 (很多人显然没有) 然后联系你,你可以和他们合作 让他们一次只运行一个脚本, 提出更高效的请求, 解决他们的脚本中的问题 (例如,请求远程数据集的数据在计时截止前无法响应) 或者其他什么都是麻烦的根源
        
用户往往根本不知道他们的要求很麻烦。 他们常常不知道虫子,严重效率低下,或者他们的剧本存在其他问题. 他们经常这样认为,因为你 ERDDAP™ 免费提供数据,他们可以按自己的意愿要求尽可能多的数据,例如通过运行多个脚本或者同时使用多个线程.
        
        * 你可以向他们解释,每个 ERDDAP™ 现在,无论多么庞大和强大, 拥有有限的资源 (CPU时间,硬盘I/O,网络带宽等.) 如果一个用户以排挤其他用户或负担过重的方式要求数据,这不公平 ERDDAP 。 。 。 。
        * 一旦一个用户知道如何同时提出2项请求,他们往往认为没有理由不同时提出5、10或20项请求,因为额外请求没有付出任何代价。 就像非对称战争: 这里,进攻性武器有巨大的优势 (零成本) 在防御武器之上 (具有实际成本的有限安装) 。 。 。 。
        * 向它们指出,同时提出越来越多的要求的回报率正在下降;额外的要求只是进一步阻止了其他用户的要求;它们并没有给它们带来巨大的改进.
        * 提醒他们还有其他用户 (临时用户和运行脚本的其他用户) 因此,他们不公平 猪全部 ERDDAP 资源
        * 指出技术巨头已诱导用户期望从网络服务获得无限资源. 虽然有办法建立 [网格/集群/联邦 ERDDAP 编号](/docs/server-admin/scaling) 制作一个 ERDDAP™ 资源最多的系统 ERDDAP™ 管理者没有钱和人力来建立这种系统,这种系统仍将是有限的. 时 ERD 例如,有一个人 (и) 写作 ERDDAP™ ,管理两个 ERDDAP 编号 (得到老板的帮助) ,并管理几个数据源,所有数据源的年硬件预算为0美元。 (我们依靠偶尔的赠款来支付硬件) 。 。 。 这不是Google,Facebook,亚马逊等拥有100位工程师,还有数百万美元的收入可以回收到更大的系统. 我们不能只是移动我们的 ERDDAP™ 以亚马逊AWS为例,因为数据存储成本大,数据流转费大且可变,而我们对外服务的预算是固定的0.
        * 我对用户的要求是: 对时间不敏感的请求 (这是迄今为止最常见的案例) 他们的系统应该一次提出一个请求 如果请求时间敏感 (例如,网页上的多个.pngs,一个的多个瓦片 WMS 客户端等。) ,那么也许4个同时请求应该是最大 (并且只是很短的时间) 。 。 。 。
        * 如果您向用户解释情况,大多数用户会理解并愿意作出必要的修改,以便从黑名单中删除他们的IP地址.
             
    * 要列出一个用户的黑名单,请将其数字IP地址添加到以逗号分隔的IP地址列表中&lt;请求黑名单 &gt; in your datasets.xml 文档。 要找到麻烦的用户IP地址,请查看 ERDDAP™   *大家长会* /logs/log.txt 文件 存档 ( *大家长会* 指定在 [设置. xml](/docs/server-admin/deploy-install#setupxml) ) 以查看是否如此,并找到该用户的IP地址。 每个请求的IP地址都列在从"&#123;&#123;&#123;&#123;#123;#"开始的线路上,是按时期分隔的4个数字,例如123.45.67.8. 搜索“ 错误” 将帮助您找到无效请求等问题 。
    * 您也可以将 IP 地址中最后一个号码替换为\\*(例如,202.109.200。)\\*)屏蔽一系列IP地址,0-255.
    * 您也可以将 IP 地址中的最后两个数字替换为\\*。 。 。 。\\*  (例如,121.204页。\\*。 。 。 。\\*) 以屏蔽更广泛的IP地址,0-255.0-255.
    * 举例来说,
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * 你不需要重启 ERDDAP™ 更改为&lt;请求 Blacklist &gt; 生效。 下次会发现这些变化 ERDDAP™ 检查是否需要重新装入任何数据集 。 或者,你可以通过访问一个 [设置数据集 旗帜 URL](/docs/server-admin/additional-information#set-dataset-flag) 用于任何数据集。
    * 你们 ERDDAP™ 每日报告包含一个最活跃的允许和被封禁的请求者列表/全部.
    * 如果您想了解哪个域/机构与一个数字IP地址有关,您可以使用一个免费的,逆向的DNS网络服务,比如: [https://network-tools.com/](https://network-tools.com/) 。 。 。 。
    * 可能有时在更高层次封锁某些用户是有意义的,例如恶意用户. 例如,你可以阻止他们访问服务器上的一切,而不只是 ERDDAP 。 。 。 在Linux上,使用的方法之一是 [平板电脑](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/) 。 。 。 例如,您可以添加一条规则,以命令屏蔽所有来自198.51.10.0的规则
iptables - I INPUT - 第198.51.100.0节 -J 德鲁普
       
### &lt;慢下来的TroubleMillis&gt;{#slowdowntroublemillis} 
* [ ** &lt;缓慢的TroubleMillis &gt; ** [ . ] (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;慢下来的拖鞋) 是一个很少使用的 OPTIONAL 标签&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 它包含一个指定毫秒数的整数 (默认=1000) 以响应所有失败请求时暂停,例如未知的数据集、请求太大、用户在黑名单上。 例如,
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
如果一个脚本一个接一个地发出一个请求,那么它可能会迅速一个接一个地发出一个糟糕的请求. 在此设置下, 您可以慢化一个失败的脚本 。 ERDDAP™ 并没有被坏的要求淹没 如果人类提出不好的要求,他们甚至不会注意到这种拖延. 建议:
    
    * 如果麻烦是分布式拒绝服务 (DDOS 系统) 从100+攻击者发动攻击,设置为较小的数目 (100块?) 。 。 。 拖慢它们的时间太长 导致太多活动线条。
    * 如果问题来自1 -10 来源,请设定为 1000 ms (默认) 数字 (喜欢一万) 也是合理的。 这会减慢他们的速度 所以他们浪费更少的网络资源。 另外,1000毫秒左右不会惹恼提出不良要求的人类用户.
    
此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。
     
### &lt;订阅电子邮件 Blacklist&gt;{#subscriptionemailblacklist} 
* [ ** &lt;订阅 电子邮件黑名单 &gt; ** [ . ] (# 订阅邮件黑名单) 是一个很少使用的 OPTIONAL 标签&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 它包含一个以逗号分隔的电子邮件地址列表,这些地址立即从列表中列出。 [订阅系统](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) ,例如,
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
这是一个对案件不敏感的系统。 如果在此列表中添加一个电子邮件地址, 如果该电子邮件地址有订阅, 订阅将被取消 。 如果列表中的电子邮件地址试图订阅, 请求将被拒绝 。 此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。
     
### 标准文本{#standard-text} 
*    [ **标准文本** ](#standard-text) - —— - 说 有几个选项标签 (多数很少使用) 内&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 以指定在 ERDDAP 。 。 。 如果您想要更改默认文本, 请在
     *移动猫* /webapps/erddap/WEB-INF/class/gov/noaa/pfel/erddap/util.messages.xml 互联网档案馆的存檔,存档日期2013-12-02. 输入 datasets.xml ,然后修改内容。 拥有这些优势 datasets.xml 表示您可以在任何时候指定新值,即使 ERDDAP™ 正在运行。 这些标签的值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 标记名称描述其目的,但在信件.xml中看到默认内容以加深理解.
    
    *   &lt;标准水平 &gt;
    *   &lt;标准联系 &gt;
    *   &lt;标准数据列表 &gt;
    *   &lt;标准免责声明 &gt;
    *   &lt;标准排除外部链接
    *   &lt;标准通用免责声明 &gt;
    *   &lt;标准 隐私政策 &gt;
    *   &lt;启动头Html5 &gt;
    *   &lt;start BodyHtml5 &gt; 是更改的好标签, 以便自定义您每个网页的顶端的外观 ERDDAP 。 。 。 值得注意的是,您可以使用它来方便地在 ERDDAP™ 主页 (例如,“检查新的JPL MUR SST v4.1数据集...”或“这个 ERDDAP™ 2019-05-08T17:00 PDT至2019-05-08T20:00 PDT的维护工作将下线".) 。 。 。 把这个标签放进去 datasets.xml 即: 当您重新启动时 ERDDAP ,第一个请求 ERDDAP™ 将返回默认启动 BodyHtml5 HTML, 但随后的每个请求都会使用在其中指定的 startBodyHtml5 HTML datasets.xml 。 。 。 。
    *   &lt;快速描述 Html&gt; 是用于修改的好标签, 以便自定义您的描述 ERDDAP 。 。 。 注意您可以轻松更改, 在主页上添加临时信件 (例如:"这个... ERDDAP™ 2019-05-08T17:00 PDT至2019-05-08T20:00 PDT的维护工作将下线".) 。 。 。 。
    *   &lt;端点BodyHtml5&gt;
    
      
在此之前 ERDDAP™ v2.00,这些在设置.xml中指定,仍然允许但劝阻.
     
### &lt;不寻常 活动&gt;{#unusualactivity} 
* [ ** &lt;异常活动 &gt; ** [ . ] (不寻常的活动) 是一个很少使用的 OPTIONAL 标签&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 以指定LadyDatasets两次运行之间被认为正常的最大请求数 (默认=10000) 。 。 。 如果超过此数字, 则发送电子邮件给 Email Everything To (在设置.xml中指定的) 。 。 。 。 例如,
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。 在此之前 ERDDAP™ v2.00,此选项在设置. xml 中指定,仍然允许但劝阻.
     
### &lt;更新MaxEvents&gt; 更新 MaxEvents&gt; 更新 MaxEvents&gt;{#updatemaxevents} 
* [ ** &lt;更新MaxEvents &gt; ** [ . ] (# 更新最大事件 #) 是一个很少使用的 OPTIONAL 标签&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 指定文件更改事件的最大数量 (默认=10) 将由[&lt;更新EveryNMILIS &gt; (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;更新每个人) 在切换到重新装入数据集之前使用系统。 举例来说,
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
更新EveryNMILIs系统的目的是在用户请求处理之前迅速运行. 如果有很多文件更改事件,那么推测它不能快速运行,因此它要求重新装入数据集. 狦 ERDDAP™ 处理必须不断更新的数据集,即使大量数据文件有变化,也可以将其设定为更大的数据 (100块?) 。 。 。 。

### &lt;用户 & gt;{#user} 
* [ ** &lt;用户 &gt; ** [ . ] (#用户) 是一个可选标记&lt;erddapDatasets &gt; (英语). 标记 datasets.xml 识别用户名、密码 (如果认证=海关) 和作用 (逗号分隔列表) 。 。 。 用户名和密码的使用根据[&lt;认证&gt;] (/docs/server-admin/额外信息#认证) 在你身边 ERDDAP 's setup.xml 文件.
    * 这是一部分 ERDDAP 因为 [安保系统](/docs/server-admin/additional-information#security) 限制某些用户访问某些数据集。
    * 分开来&lt;每个用户的用户 &gt; 标签。 可选, 如果认证=oauth2, 您可以设置两个&lt;用户 &gt; 每个用户的标签: 用户登录时的标签 Google,一个用户通过Orcid登录时,大概有相同的角色.
    * 如果没有&lt;用户 &gt; 客户端的标记, s/ 他只能访问公共数据集, 即没有 [] 的数据集 。&lt;可访问工具 &gt;] (能够进入) 标记 。
    * 用户名
对于认证=custom,用户名通常是字母,数字,下划线,和时段的组合.
对于认证=电子邮件,用户名是用户的电子邮件地址. 它可能是任何电子邮件地址。
对于认证=google,用户名是用户的完整Google电子邮件地址. 这包括谷歌管理的账户,例如 @noaa.gov 账户。
对于认证=orcid,用户名是用户的Orcid帐号 (带有破折号) 。 。 。 。
对于认证=oaut2,用户名是用户的完整Google电子邮件地址或用户的Orcid帐号. (带有破折号) 。 。 。 。
    * 密码
对于认证=电子邮件,google,orcid,或oauth2,不要指定密码属性.
对于认证=海关,您必须为每个用户指定密码属性。
        * 用户输入的密码对大小写敏感,必须拥有8个或8个以上的字符,所以更难破解. 现在,甚至8个字符都可以被野蛮武力用AWS上的一组计算机迅速和廉价地破解. ERDDAP™ 仅在用户尝试登录时( 而不是当&lt;正在处理用户 &gt; 标记,因为该代码只看到密码的散列摘要,而不是普通文本密码)。
        * 设置.xml's&lt;密码编码&gt; 确定密码如何存储在&lt;用户 &gt; 标记在 datasets.xml 。 。 。 为加强安全,可选择如下:
            *    [MD5 软件](https://en.wikipedia.org/wiki/MD5)   (别用这个&#33;) -- 对于密码属性,指定用户密码的MD5散列摘要.
            * UEPMD 5 (英语). (别用这个&#33;) - 对于密码属性,请指定 MD5 散列摘要 *用户名* 数字 : ERDDAP 数字 : *密码* 。 。 。 。 用户名和 " ERDDAP " 用于 [盐](https://en.wikipedia.org/wiki/Salt_(cryptography) )散列值,使得解码更加困难.
            *    [SHA256 (英语).](https://en.wikipedia.org/wiki/SHA-2)   (未建议) - 对于密码属性,指定用户密码的SHA-256散列摘要.
            * 乌佩沙256 (默认, 建议密码编码 。 但更好:使用google,兰花,或oauth2认证选项.) - 对于密码属性,请指定SHA-256散列摘要 *用户名* 数字 : ERDDAP 数字 : *密码* 。 。 。 。 用户名和 " ERDDAP " 用于盐化散列值,使得解码更加困难.
        * 在Windows上,您可以通过下载一个 MD5 程序生成 MD5 密码文摘值 (例如, [MD5 软件](https://www.fourmilab.ch/md5/) ) 并使用 (举例来说,) 数字 :
md5 - djsmith: (中文(简体) ). ERDDAP 数字 : *实际用词* 
        * 在 Linux/ Unix 上, 您可以使用内置 md5sum 程序生成 MD5 消化值 (举例来说,) 数字 :
回声 -n "史密斯: ERDDAP 数字 : *实际用词* " , " | md5sum 缩写
        * 存储的纯文本密码对大小写敏感 。 MD5和UEPMD5密码的存储形式并不敏感。
        * 比如说 (使用 UEPMD5 数据) 如果用户名=“jsmith”和密码=“MyPassword”,则&lt;用户 &gt; 标记为 :
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
生成存储密码的地方
md5 - djsmith: (中文(简体) ). ERDDAP : MyPassword 语句
        * 角色是用户被授权的角色的逗号分隔列表. 任意&lt;数据集 &gt; 可能有[&lt;可访问工具 &gt;] (能够进入) 标签,其中列出了允许访问该数据集的角色。 对于给定的用户和给定的数据集,如果用户角色列表中的角色之一与数据集列表中的角色之一相匹配的话.&lt;accessableTo &gt; 角色,然后授权用户访问该数据集。
            
每个登录的用户都会自动给角色 \\[ 任何人日志 内 \\] ,是否有&lt;用户 &gt; 标签中 datasets.xml 或无. 所以如果给定的数据集
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
然后,任何登录的用户都会被授权访问该数据集,即使没有&lt;用户 &gt; 标签中 datasets.xml 。 。 。 。
            
    * 此标签值的任何更改将在下次生效 ERDDAP™ 读取 datasets.xml ,包括针对数据集 [旗帜](/docs/server-admin/additional-information#flag) 。 。 。 。
         
### &lt;路径Regex&gt;{#pathregex} 
* [ ** &lt;路径Regex &gt; ** [ . ] (&#123;\fn方正黑体简体\fs18\b1\bord1\\shad1\\3cH2F2F2F&#125;"Pathregex &#123;\fn方正黑体简体\fs18\b1\bord1\\shad1\\3cH2F2F2F&#125;"Pathregex") 让您指定限制路径的正则表达式 (哪个子目录) 将包含在数据集中。 默认是 . , 它匹配所有路径 。 这是很少使用,也很少需要的 OPTIONAL 标记用于 EDDGrid 从Files数据集,EDDTable FromFiles数据集,以及一些其他数据集类型. 然而,当你需要的时候,你确实需要它。
    
要做到这一点,你需要真正好 用常规表达。 看这个 [正则文档](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) 和 [regex 教程](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) 。 。 。 尤其是你需要了解捕捉组 (括号内的东西) ,以及“或”符号。 | " ..
这些选项加在一起可以指定任何选项,例如: (选项1 | 选项2 | 选项3) 。 。 。 。
此外,任何一种选择都可以是无谓的,例如, ( | 选项2 | 选项3) 。 。 。 。
另外,你需要知道捕获组可以嵌入,即捕获组中的任何选项都可以包含另一个捕获组,例如,. ( | 选项2 ( | 选项2 3个P-4 | 选项2c)  | 选项3) 表示选项2后可无选项2b或选项2c。
对于路径Regexes,每个选项将是一个文件夹名称,然后是 /,例如 bar/ 。
    
路径的棘手部分是: ERDDAP™ 递归下目录树,路径Regex必须接受它在前往目录时遇到的所有路径与数据. Regex的巢捕组是处理这个问题的好方法.
    
示例
假设我们的目录结构如下:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
而指定的文件 Directory 是 /foo/bar/, 我们只要 .nc D中的文件 \\[ 0-9 (韩语). \\] &#123;4&#125;/a/ 子目录.
解决方案是设置路径 Regex 到 /foo/bar/ ( | D级 \\[ 0-9 (韩语). \\] &#123;4&#125;/ (中文(简体) ). ( | (单位:千美元)) )   
上面写着:
路径必须从 /foo/ bar/ 开始
之后可能什么都没有,或者D \\[ 0-9 (韩语). \\] &#123;4&#125;/ (中文(简体) ).
之后可能一无所获或
    
是的,路径Regex的 可能很难设计。 如果你被卡住了,请问电脑程序员 (在现实世界里最接近巫师的咒语?) 或者发邮件给克里斯 约翰在Noaa.gov。
    
### &lt;数据集 & gt;{#dataset} 
* [ ** &lt;数据集 &gt; ** [ . ] (# 数据集) 是一个选项 (但总是使用) 标记在一个&lt;erddapDatasets &gt; (英语). 标记 datasets.xml (如果您包含所有信息,则&lt;数据集 &gt; 和&lt;/dataset&gt;)完全描述了一个数据集. 举例来说,
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
您可能存在任何数量的数据集标记 datasets.xml 文档。
三种属性可能出现在&lt;数据集 &gt; 标记 :
     
    *    **类型=” *(单位:千美元) 类型* " , "** 是一个在&lt;数据集 &gt; 标记在 datasets.xml 用于识别数据集类型 (例如,它是否是一个 EDDGrid /网格或EDD表/表格数据集) 和数据来源 (例如,数据库、文件或远程 OPeNDAP 服务器) 。 。 。 。 见 [ **数据集类型列表** ](#list-of-types-datasets) 。 。 。 。
         
#### 数据集 编号{#datasetid} 
*    [ ** datasetID =" *数据集ID* " , "** ](#datasetid) 是一个在&lt;数据集 &gt; 标记,该标记指定短(通常是)&lt;15个字符),独特的,一个数据集的识别名称.
    * 那个 datasetID 必须是字母 (A -Z, a -z, a -z (英语).) 然后是A-Z、A-Z、0-9和QQ(但最好&lt;共32个字符).
    * 数据集 身份证对案件很敏感,但不要创造两个 datasetID s,只用大/小写字母表示。 它会在Windows计算机上造成问题 (您的和/或用户的计算机) 。 。 。 。
    * 最佳做法: 我们建议使用 [骆驼 大小写](https://en.wikipedia.org/wiki/CamelCase) 。 。 。 。
    * 最佳做法: 我们建议第一部分为来源机构名称的缩写或缩写,第二部分为数据集名称的缩写或缩写。 如果可能,我们创建一个名称,反映数据集的来源名称。 比如我们用过 datasetID ="erdPH(英语: sst a8天),用于来自 NOAA   NMFS   SWFSC 环境研究司 ( ERD ) 源指定为卫星/PH/ sst a/8天。
    * 如果您更改了数据集的名称, 旧的数据集 (用旧名) 将仍然活在 ERDDAP 。 。 。 这是一个“孤儿”数据集,因为它的规格在 datasets.xml 现在不见了。 这个问题必须解决:
        1. 对于 ERDDAP™ V2.19 和以后,你不需要做任何事情。 ERDDAP™ 将自动删除这些孤儿数据集。
        2. 对于 ERDDAP™ v2.18 及更早, 您需要做一些事情来删除孤儿数据集 : 制作活动="假"数据集,例如,,
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
下一个重负之后 数据集, 在旧数据集不活动后, 您可以删除该标记 。
                 
#### 活动{#active} 
*    [ **活动=". *布尔* " , "** ](#active) 是一个可选属性&lt;数据集 &gt; 标记在 datasets.xml 表示数据集是否活动 (有资格用于 ERDDAP ) 或无.
    * 有效值为真 (默认) 和虚假的。
    * 由于默认是真实的,在您想要暂时或永久删除此数据集之前,您不需要使用此属性 ERDDAP 。 。 。 。
    * 如果您只是从中删除活动=“ true” 数据集 datasets.xml ,该数据集仍将在 ERDDAP™ 但永远不会更新。 这样的数据集将成为"孤儿",并将在状态上列为孤儿. html 网页位于未加载的数据集列表下方 。
    * 如果设置为“假”, ERDDAP™ 将在下次尝试更新数据集时关闭该数据集。 当你这样做, ERDDAP™ 并没有丢掉它可能存储的关于数据集的任何信息,当然也没有对实际数据做任何事情.
    * 为了删除数据集 ERDDAP™ ,见 [强制数据组删除](/docs/server-admin/additional-information#removing-datasets) 。 。 。 。
         

 ** 可以在&lt;数据集 &gt; 和&lt;/dataset&gt;标签. **   
在哪些类型数据集允许标记时,有一些差异。 具体文件见: [数据集类型](#list-of-types-datasets) 详细情况。

#### &lt;无障碍 togt; 数据{#accessibleto} 
* [ ** &lt;无障碍 改为 &gt; ** [ . ] (能够进入) 是一个可选标签&lt;指定逗号分隔列表的数据集 &gt; 标记 [角色](#user) 允许它们访问此数据集。 举例来说,
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * 这是一部分 ERDDAP 因为 [安保系统](/docs/server-admin/additional-information#security) 限制某些用户访问某些数据集。
    * 如果此标签不存在, 所有用户 (即使他们没有登录) 将访问此数据集。
    * 如果存在此标记, 此数据集将只能被登录的用户所看到和访问, 这些用户拥有指定的角色之一 。 这个数据集不会被没有登录的用户看到.
    * 每个登录的用户都会自动给角色 \\[ 任何人日志 内 \\] ,是否有&lt;用户 &gt; 标签中 datasets.xml 或无. 所以如果给定的数据集
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
然后,任何登录的用户都会被授权访问该数据集,即使没有&lt;用户 &gt; 标签中 datasets.xml 。 。 。 。
         
#### &lt;图表可访问To & gt;{#graphsaccessibleto} 
* [ ** &lt;可用图表 &gt; ** [ . ] (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;可以进入) 是一个可选标签&lt;数据集 &gt; 标记在 datasets.xml 用于确定数据集的图形和元数据是否向公众开放。 它提供了部分覆盖数据集[&lt;可访问工具 &gt;] (能够进入) 设置。 允许的值是:
    * 自动 - 此值( 或没有)&lt;GraphsAublicableTo &gt; 数据集的标记)使得从数据集获取图形和元数据可以模仿数据集的&lt;可访问To &gt; 设置。
所以如果数据集是私有的,它的图表和元数据将是私有的.
而如果数据集公开,其图表和元数据也将公开.
    * 公开 - —— - 说 这个设置使数据集的图表和元数据可以被任何人,甚至没有登录的用户所访问,即使数据集本来是私密的,因为它有一个&lt;可访问To &gt; 标记。
         
#### &lt;无障碍 ViaFiles&gt; (美国英语).{#accessibleviafiles} 
* [ ** &lt;可访问的ViaFiles &gt; ** [ . ] (# 无障碍文件) 是一个可选标签&lt;数据集 &gt; 标记在 datasets.xml (单位:千美元) [ EDDGrid 总计](#eddgridaggregateexistingdimension) , (中文). [ EDDGrid 复制](#eddgridcopy) , (中文). [ EDDGrid 可处理文件](#eddgridfromeddtable) , (中文). [ EDDGrid 从埃尔达普](#eddfromerddap) , (中文). [ EDDGrid 从埃托波](#eddgridfrometopo) , (中文). [ EDDGrid 从文件](#eddgridfromfiles)   (包括所有子类) , (中文). [ EDDGrid 侧边线](#eddgridsidebyside) , (中文). [EDD 表格复制](#eddtablecopy)   [来自Erddap的EDD表](#eddfromerddap) , (中文). [从 EDD 表格 EDDGrid ](#eddtablefromeddgrid) ,以及 [来自文件的 EDD 表格](#eddtablefromfiles)   (包括所有子类) 数据集。 它可以有真假的价值. 举例来说,
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
如果值是真实的 ERDDAP™ 将使用户能够浏览和下载数据集的源数据文件 ERDDAP 因为 [ "files" 系统](https://coastwatch.pfeg.noaa.gov/erddap/files/) 。 。 。 。 见 "files" 系统 [文档](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) 更多信息。
    
默认值为&lt;可访问的ViaFiles &gt; 来源&lt;默认可访问ViaFiles &gt; 输入 [设置. xml](/docs/server-admin/deploy-install#setupxml) 。 。 。 它有一个假的默认值,但我们建议您将这个标记添加到您的设置中,并包含一个真实值.xml.
    
建议- 我们建议通过文件系统提供所有相关数据集。&lt;默认AccessibilityViaFiles &gt; 在设置.xml中为真,因为有一群用户希望获得数据。 除其他原因外, "files" 系统使得用户很容易看到哪些文件是可用的,以及它们最后一次更改时,从而方便用户维护自己的整个数据集副本. 如果您一般不想通过文件系统访问数据集, 设置&lt;默认可访问ViaFiles &gt; 到虚假。 无论是哪种情况,只要使用&lt;可访问ViaFiles &gt; ,用于作为一般政策例外的少数数据集&lt;默认可访问ViaFiles &gt; (例如,当数据集使用时 [ .nc 门L](#ncml-files) 文件,对用户没有真正的用处) 。 。 。 。
     
#### &lt;无障碍 维亚 WMS & gt; (G) 请检查url=值 (帮助) 。{#accessibleviawms} 
* [ ** &lt;无障碍 维亚 WMS &gt; 翻译: ** [ . ] (# 一个无障碍的viawms) 是一个可选标签&lt;数据集 &gt; 标记在 datasets.xml 向所有人开放 [ EDDGrid ](#eddgrid) 子类。 它能有真实的价值 (默认) 或虚假。 举例来说,
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
如果数值是假的, ERDDAP 因为 WMS 此数据集将无法使用服务器 。 通常用于一些经度值大于180的数据集 (技术上无效的 WMS 服务) ,为此,您还提供了经纬度值完全在 -180 到 180 到 [ EDDGrid 龙PM180](#eddgridlonpm180) 。 。 。 。
如果值是真实的 ERDDAP™ 将尝试通过 ERDDAP 因为 WMS 服务器。 但如果数据集完全不适合 WMS   (例如,没有经度或纬度数据) ,那么数据集将无法通过 ERDDAP 因为 WMS 服务器,无论设置如何。
     
#### &lt;添加 变量 在哪里( G) ;{#addvariableswhere} 
* [&lt;添加变异处&gt;] (变异之处) 是一个选项标记&lt;所有 EDDTable 数据集的数据集标记。
    
对任何 EDDTable 数据集的要求可以包含( A) 变量 何处 (" , " *属性 名称* ""," *属性 数值* " , ") ,说明 ERDDAP™ 添加数据集中的所有变量 *属性Name=属性值* 至请求变量列表。 例如,如果用户添加( A) 变量 何处 (" , " ioos\\_category ","风") 到一个查询, ERDDAP 将添加数据集中所有具有 ioos\\_category =wind 属性为请求变量列表 (例如,风速,风向,风向) 。 。 。 。 *属性 名称* 和 *属性 数值* 对案件有敏感认识。
    
内 datasets.xml ,如果数据集的块数据集.xml有
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
比如说,
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
数据访问表 (.html网页) 对于数据集将包含一个部件 (对于逗号分隔列表中的每个属性Name) 右下方允许用户指定属性值的变量列表。 如果用户为一个或多个属性名称选择属性值,则会通过加码方式添加到请求中( A) 变量 何处 (" , " *属性 名称* ""," *属性 数值* " , ") 。 。 。 。 因此,这个标签在 datasets.xml 允许您指定将出现在该数据集的数据访问表格中的属性名称列表,并方便用户添加和添加变量 请求的功能所在 。 那个 *属性名称CSV* 列表是区分大小写。
    
#### &lt;海拔高度MetersPer 源代码Unit&gt;{#altitudemeterspersourceunit} 
* [ ** &lt;高度MetersPer 源单位 &gt; ** [ . ] (#海拔计/源码) 是一个选项标记&lt;数据集中的数据集 &gt; 标记。 用于 EDD 表格的 xxml SOS 数据集 (仅此而已) 指定一个乘以源高度或深度值的数字,将其转换成高度值 (海拔) 。 。 。 。 举例来说,
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
如果数据集的垂直轴值不是米, 正=上,则使用此标记 MUST 。 否则,它是可选的,因为默认值是1. 举例来说,
    * 如果来源已经用海拔米测量,请使用 1 (或者不要使用此标签, 因为 1 是默认值) 。 。 。 。
    * 如果用海平面以下的米测量来源,则使用-1。
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * 如果该来源以海拔公里测量,则使用0.001.
         
#### &lt;默认数据查询 & gt;{#defaultdataquery} 
* [ ** &lt;默认数据查询 &gt; ** [ . ] (# 默认数据计算) 是一个可选标签&lt;数据集 &gt; 标记在 datasets.xml 说明 ERDDAP™ 以使用指定的查询 (URL 在“?”之后的部分。) 如果.html文件 类型 (数据访问表) 请求时没有查询。
    * 你可能很少用这个
    * 您需要 XML 编码 (非% 编码) 默认查询,因为它们在 XML 文档中。 例如,成为 & amp; ,&lt;变成&lt;, &gt; 成为 & gt; 。
    * 请检查您的作品。 犯错很容易,而得不到你想要的东西。 ERDDAP™ 将试图清理你的错误-- 但不要依赖这一点,因为\\*怎么样\\*清理干净后可能会改变
    * 对于网格dap数据集,常用的是指定不同的默认深度或高度维值 (比如说, \\[ 0 个 \\] 改为 \\[ 最后一个 \\] ) 。 。 。 。
无论如何,你总是应该列出所有变量,总是对所有变量使用相同的维值,并且几乎总是使用 \\[ 0 个 \\] , (中文). \\[ 最后一个 \\] ,或 \\[ 0: 最后一个 \\] 对于维度值。
例如:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * 对于 tabledap 数据集,如果您不指定任何约束,则请求会返回整个数据集,这些数据可能不切实际,取决于数据集。 如果你不想指定任何限制 而不是空的&lt;默认数据查询 &gt; (它与未指定默认值相同 数据查询) ,需要明确列出要包含在默认数据查询中的所有变量。
    * 对于 tabledap 数据集,最常见的使用是指定不同的默认时间范围 (相对于最大值 (时间) 例如,时间( T) (时间) -1天,或相对于现在,例如( T) now- 1天(以千美元计)) 。 。 。 。
记住,不请求数据变量与指定所有数据变量是相同的,所以通常你可以只是指定新的时间约束.
例如:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
或
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;默认 GraphQuery & gt;{#defaultgraphquery} 
* [ ** &lt;默认 Graph 查询 &gt; ** [ . ] (# 失职) 是一个可选标签&lt;数据集 &gt; 标记在 datasets.xml 说明 ERDDAP™ 以使用指定的查询 (URL 在“?”之后的部分。) 如果图文件 类型 (创建图表窗体) 请求时没有查询。
    * 你可能很少用这个
    * 您需要 XML 编码 (非% 编码) 默认查询,因为它们在 XML 文档中。 例如,成为 & amp; ,&lt;变成&lt;, &gt; 成为 & gt; 。
    * 请检查您的作品。 犯错很容易,而得不到你想要的东西。 ERDDAP™ 将试图清理你的错误-- 但不要依赖这一点,因为\\*怎么样\\*清理干净后可能会改变
    * 对于网格dap数据集,最常见的用途是指定不同的默认深度或高度维值 (比如说, \\[ 0 个 \\] 改为 \\[ 最后一个 \\] ) 和/或指定一个特定的变量。
无论如何,你几乎总是使用 \\[ 0 个 \\] , (中文). \\[ 最后一个 \\] ,或 \\[ 0: 最后一个 \\] 对于维度值。
例如:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (但都放在一条线上) 
    * 对于 tabledap 数据集,如果您不指定任何约束,请求会绘制整个数据集的图表,这可能需要很长时间,取决于数据集。
    * 对于 tabledap 数据集,最常见的使用是指定不同的默认时间范围 (相对于最大值 (时间) 例如,时间( T) (时间) -1天,或相对于现在,例如( T) now- 1天(以千美元计)) 。 。 。 。
记住,不请求数据变量与指定所有数据变量是相同的,所以通常你可以只是指定新的时间约束.
例如:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
或
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;维度值在记忆和gt;{#dimensionvaluesinmemory} 
* [ ** &lt;维度 记忆中的值 &gt; ** [ . ] (#二元价值模拟器)   (真实 (默认) 或虚假) 是一个 OPTIONAL 并且很少在&lt;任何数据集的标记 EDDGrid 显示的数据集 ERDDAP™ 将维度的源值保存在哪里 (也称为 axisVariable 编号) 数字 :
    
    * 真 = 内存中 (速度快但使用更多的内存) 
    * 虚假 = 在磁盘上 (较慢但不用内存) 
    
举例来说,
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
您只应当使用假的默认值 ERDDAP™ 拥有许多具有非常大维度的数据集 (例如,百万美元的数值,例如: EDDGrid 来自AudioFiles数据集) 和 ERDDAP 'In Use 内存使用率总是太高. 参见内存: 目前使用行 \\[ 您的域名 \\]  /erddap/status.html 用于监测 ERDDAP™ 内存使用.
     
#### &lt;文件列表 InMemory & gt;{#filetableinmemory} 
* [ ** &lt;文件目录内 ** [ . ] (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;档案集)   (真实或虚假 (默认) ) 是一个选项标记&lt;任何数据集的标记 EDDGrid 从 Files 和 EDD 表格 从 Filles 数据集显示 ERDDAP™ 文件表保存在哪里 (包含每个源数据文件的信息) 数字 :
    
    * 真 = 内存中 (速度快但使用更多的内存) 
    * 虚假 = 在磁盘上 (较慢但不用内存) 
    
举例来说,
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
如果您将此设定为任何数据集的真实, 请注意内存: 目前使用行 : \\[ 您的域名 \\]  /erddap/status.html 确保 ERDDAP™ 仍然有很多免费的记忆。
     
#### &lt;fgdc 文件 & gt; 存档副本 。{#fgdcfile} 
* [ ** &lt;fgdc 文件夹 &gt; ** [ . ] (#fgdcfile (法语)) 是一个可选标签&lt;数据集 &gt; 标记在 datasets.xml 说明 ERDDAP™ 要使用预先制作的 FGDC 文件, 而不是有 ERDDAP™ 尝试生成文件。 用法 :
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *满 文件Name* 能够引用本地文件 (服务器文件系统的某处) 或远程文件的 URL。
若为 *满 文件Name* QQ"或文件未找到,数据集将没有FGDC元数据. 因此,如果您想要对特定数据集的 FGDC 元数据进行压缩,这也是有益的。
或者,你可以将&lt;fgdc 动作 &gt; 虚假&lt;/fgdcAactive &gt; in setup.xml 要告诉 ERDDAP™ 不为任何数据集提供FGDC元数据。
     
#### &lt;等值19115 文件( G) ; (G){#iso19115file} 
* [ ** &lt;iso19115 文件夹 &gt; ** [ . ] (#iso19115文件) 是一个可选标签&lt;数据集 &gt; 标记在 datasets.xml 说明 ERDDAP™ 来使用 ISO 19115 文件而不是有 ERDDAP™ 尝试生成文件。 用法 :
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *满 文件Name* 能够引用本地文件 (服务器文件系统的某处) 或远程文件的 URL。
若为 *满 文件Name* QQ"或文件找不到,数据集将没有ISO 19115元数据. 因此,如果想要为特定数据集压制ISO 19115元数据,这也是有益的。
或者,你可以将&lt;iso19115 动作 &gt; 虚假&lt;/iso19115 Aactive &gt; in setup.xml 要告诉的设置. ERDDAP™ 不为任何数据集提供ISO 19115元数据。
     
#### &lt;匹配轴 NDigits & gt; (美国英语).{#matchaxisndigits} 
* [ ** &lt;匹配轴日记 &gt; ** [ . ] (# 数位数) 是一个可选标记 EDDGrid  &lt;数据集 &gt; 标记 EDDGrid 作为聚合的数据集,例如文件集合. 每次重新装入数据集时, ERDDAP™ 检查集合每个组成部分的轴值是否相同。 测试的精度由 [匹配轴线](#matchaxisndigits) ,指定测试双精度轴值时必须匹配的位数总数,0 - 18 (默认) 。 。 。 当测试浮轴值时,测试用匹配的轴线(AxisNDigits/2)位数进行. 值为 18 或以上 EDDGrid 做一个精确的测试。 值为 0 告诉 EDDGrid 除下文所述外,不建议进行任何试验。
    
虽然 EDDGrid 允许集合的组件具有略微不同的轴值,只向用户显示一组轴值. 该集来自提供数据集源元数据的同一组件. 例如,关于 EDDGrid 从 Files 数据集, 由&lt;从"设置"开始的元数据 (默认=最后) 。 。 。 。
    
在大多数情况下,使用匹配的AxisNDigits\\\\\\\\\\\由于它关闭了所有检查,所以强烈劝阻使用匹配的AxisNDigits\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 甚至最低限度的检查也是有用的,因为它能确保组件适合聚合. 我们都认为所有组件都是合适的,但并不总是如此. 因此,这是一个重要的理智测试。 甚至匹配的 AxisNDigits 1, 2, 3 或 4 的值也因不同轴值往往表明组件是创建的而被抑制 (宾客?) 一种不同的方式,因此不适合汇总。
    
有1例使用匹配的AxisNDigits\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 在这种情况下,如果数据集使用缓存FromUrl,缓存SizeGB,匹配AxisNDigits\\=0,以及 EDDGrid 从Files系统获取 [通过 文件名称](#aggregation-via-file-names-or-global-metadata) ,则 EDDGrid 不需要读取所有远程文件来进行聚合。 这使得从 S3 桶中的数据制成的数据集可以快速加载 (而不是荒谬的缓慢,如果 EDDGrid 需要下载和读取所有文件) 。 。 。 。
    
#### &lt;nThreads & gt; (美国英语).{#nthreads} 
* 开始 ERDDAP™ 2.00版本,当 EDDTable From Files 或 EDDGrid 从源数据读取,它可以读取一块数据 (例如, 一个源文件) 一次 (在一个线索中)   (这是默认) 或多个数据块 (例如, 2+ 源文件) 一次 (在 2 或更多线程中) 在处理每个请求时。
     
    * 缩略语规则:
对于大多数系统中的大多数数据集,使用nThreads=1,即默认值. 如果你有强大的电脑 (许多CPU核心, 很多内存) ,然后考虑设置 nThreads 到 2, 3, 4 或更高 (但绝不超过计算机中CPU核心的数量) 用于可能有利于下列数据的数据集:
        
        * 大多数来自Files数据集的EDDTable将会受益.
        * 数据集,如果某件东西在实际处理一整块数据之前造成滞后,将会受益,例如:
            * 数据集为 [外部压缩 (例如, .gz ) ](#externally-compressed-files) 二进制 (例如, .nc ) 文件,因为 ERDDAP™ 在文件开始读取之前,必须解压缩整个文件。
            * 使用的数据集 [缓存大小GB](#cachefromurl) ,因为 ERDDAP™ 经常需要下载文件才能读取.
            * 数据集中的数据文件存储在一个高波段宽平行文件系统上,因为它可以在接到请求时提供更多,更快的数据. 并行文件系统的例子包括: [吉布提](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures) , (中文). [pNFS 系统](http://www.pnfs.com/) , (中文). [粘结FS](https://en.wikipedia.org/wiki/Gluster) 亚马逊S3和谷歌云存储器
                 
        
警告: 当使用 nThreads &gt; 1 时, 注意 ERDDAP 记忆使用、线程使用和总体反应能力 (见 [ ERDDAP 状态页面](/docs/server-admin/additional-information#status-page) ) 。 。 。 见下文关于这些问题的评论。
         
    * 对于给定的数据集,这个nThreads设置可以来自不同的地方:
        
        * 如果 datasets.xml 数据集的块有&lt;nthreads &gt; 标记( 在&lt;数据集 &gt; 标记,而不是全局属性),值为QQ 1,使用nThreads的值. 因此,你可以为每个数据集指定不同的编号.
        * 否则,如果 datasets.xml 有个&lt;ưμ㼯A (EDD 表格 从 Files 数据集) 或一个&lt;nGridThreads &gt; 标签 ((单位:千美元) EDDGrid 数据集) 数值为 QQ 1,a以外&lt;数据集&gt;标记,使用nThreads的值。
        * 否则,使用1线程,这是一个安全的选择,因为它使用最小的内存量.
             
        
对于 [原文 ERDDAP™ 安装](https://coastwatch.pfeg.noaa.gov/erddap/index.html) ,我们使用
        &lt;ưμ㼯A 6个&lt;/nTableThreads &gt; (英语). (这是一个强大的服务器。) 困难的要求现在需要30%的时间。
         
##### 监视资源使用情况{#monitor-resource-usage} 
当尝试不同的 nThreads 设置时 (可能向您提出困难的样本请求 ERDDAP ) ,您可以监视您的计算机的资源使用情况 :
* 在Macs上,使用Finder:应用程序:公用事业:活动监视器
* 在 Linux 上, 使用顶端
* 在 Windows 10 上,使用 *Ctrl + Shift + ESC 组合键* 打开任务管理器
             
##### 警告:反应减少{#warning-decreased-responsiveness} 
孤立无援 ERDDAP™ 将满足对一个数据集的请求,该数据集的nThreads设置比nThreads=1的设置快. 但是,虽然正在处理这一请求,但其他用户提出的其他请求将略为挤出,并得到较慢的答复。 还有,什么时候 ERDDAP™ 响应特定请求, 其他计算资源 (例如磁盘驱动器访问、网络带宽) 可能是在限制,特别是使用更高的nThreads设置. 因此,如果nThreads设置较高,当处理多个请求时,总体系统响应能力会更差 -- -- 这可能会令用户非常讨厌&#33; 由于这个原因:从未将nThreads设置到超过计算机中CPU核心的数量. nThreads=1是自每次请求以来最美丽的设置 (在几个同时提出的请求中) 将获得同等份额的计算资源。 但电脑的威力越大,这个问题就越少.
         
##### 警告: 内存较高 用于 EDDGrid 数据集{#warning-higher-memory-use-for-eddgrid-datasets} 
处理请求时的内存使用与nThreads设置直接成比例. 一个相当安全的拇指规则是: 你需要设置 [ ERDDAP 内存设置](/docs/server-admin/deploy-install#memory) 改为至少 2GB + (2GB QQ 无线) 。 。 。 一些对一些数据集的要求需要更多的内存. 例如,为任意设置 nThreads=3 EDDGrid 数据集表示-Xmx设置至少应为-Xmx8000M. 如果内存设置大于计算机的物理内存 3/4, 请减少 nThreads 设置, 这样您就可以减少内存设置 。

线程处理请求到EDDTable数据集的内存使用率几乎总是较低,因为文件通常要小得多. 然而,如果给定的 EDDTable 数据集庞大 (例如,XQ1 GB) 数据文件,然后上述注释也将适用于这些数据集。

无论 nThreads 设置如何, 请密切关注您的内存使用统计 [ ERDDAP 状态页面](/docs/server-admin/additional-information#status-page) 。 。 。 你永远不应该接近 最大程度的内存使用在 ERDDAP ;否则会有严重的错误和失败。
        
##### 临时设定为 1{#temporarily-set-to-1} 
如果目前的内存使用率甚至略高, ERDDAP™ 将此项请求设置为 nThreads 到 1 。 因此, ERDDAP™ 当记忆稀缺时保存记忆.
         
##### 减少返回{#diminishing-returns} 
增加 nThreads 设置的回报率越来越低: 2 线程将比 1 更好 。 (如果我们忽略动态超过时钟) 。 。 。 但3只比2强 而4将只是略胜于3。

在对一个大型的EDDTable数据集进行困难查询的一次测试中,使用1,2,3,4,5,6线的响应时间为38,36,20,18,13,11秒. (我们现在在服务器上使用nTableThreads=6.) 

无线=2: 虽然,对nThreads=2而不是nThreads=1进行指定往往有很大的好处,但是在响应给定用户请求所需的时钟时间上往往不会产生多大的差别. 原因是: nThreads=1,大多数现代CPU的意志经常是: [动态超时](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)   (涡轮增压) 以临时提高CPU的时钟速度。 因此,用nThreads=1,如果使用nThreads=2,一个核心的时钟速度往往比两个核心的每个都高. 然而,我们仍然认为最好使用nThreads=2而不是nThreads=1,因为这种设置将在更广泛的各种情况下产生更好的结果。 当然,如果你的计算机有足够的CPU核心,一个更高的nThreads设置应该能产生更好的效果.

如上所述,非常高的nThreads设置可能导致更快地响应一些请求,但总体风险降低 ERDDAP™ 反应能力和高内存使用率 (如上所述) 虽然这些请求正在处理中,但这通常不是一个好主意。
        
##### CPU 软件 核心{#cpu-cores} 
你不应该把nThreads设定为比计算机CPU中CPU核心数更大的数字. 基本上所有现代CPU都有多个核心 (例如,2、4或8) 。 。 。 有些计算机甚至有多个CPU (例如,2个CPU → 4个核心/CPU = 8个CPU核心) 。 。 。 要知道一台计算机有多少CPU和核心:

* 在Macs上,使用 *选项密钥* : 苹果菜单 : 系统信息
* 在Linux上,使用猫/proc/cpuinfo
* 在 Windows 10 上,使用 *Ctrl + Shift + ESC 组合键* 打开 任务管理器: 性能 (逻辑处理器显示 CPU 核心的总数) 

是的,大多数处理器说,他们支持每个核心两个线程 (通过 [超导](https://en.wikipedia.org/wiki/Hyper-threading) ) ,但2线程共享计算资源,所以你不会看到重载下CPU的吞吐量的两倍. 例如,一个拥有4个核心的CPU的计算机可能声称支持最多8个线程,但你不应该超过nThreads=4。 ERDDAP 。 。 。 。 记住:

* nThreads 设置在 ERDDAP™ 是每个请求。 ERDDAP™ 经常同时处理多个请求.
*    ERDDAP™ 处理请求以外的事务,例如重新装入数据集。
* 何时 ERDDAP™ 响应特定请求, 其他计算资源 (例如磁盘驱动器访问、网络带宽) 也许是在限制。 你设置的nThread越高,这些其他资源就越有可能被最大化并减速 ERDDAP 反应一般
* 操作系统除了运行之外还做其他事 ERDDAP 。 。 。 。

因此,最好不要将nThreads设置设定到超过计算机CPU中的核心数.
         
##### 您的千里形五月 瓦里语Name (也门)  {#your-mileage-may-vary-ymmv} 
不同nThread设置的结果,对于不同系统上不同的数据集的不同请求,会有很大差异. 如果您真的想知道不同 nThreads 设置的效果, 请运行现实测试 。
         
##### 为什么每个请求都有线索?{#why-nthreads-per-request} 
我听到你们中有些人在想 "为什么每个请求都是nThreads? 如果我在编码这个,我会用一个永久的工人线程池和一个信息队列来提高性能。” 使用一个工人线程池和一个消息队列的问题在于,一个困难的请求会用许多缓慢的任务淹没队列. 这会有效阻止 ERDDAP™ 从甚至开始与其他请求有关的任务,直到初始请求 (基本情况) 结束了。 因此,即使是简单的后续请求也会非常缓慢地做出回应。 ERDDAP '每个请求使用nThreads会导致计算资源的更公平的使用.
         
##### nThreads vs. 多工人计算机{#nthreads-vs-multiple-worker-computers} 
很遗憾, ERDDAP 'nThreads系统永远不会像通过多台工人计算机实现真正的平行一样有效,每一个工作在一块数据上,就像通常使用Hadoop或Apache Spark一样. 当任务真正平行/分配到多台计算机时,每台计算机都可以在任务方面使用全部资源. 与 ERDDAP 'nThreads系统,每个线程都在竞争同一个计算机的带宽,磁盘驱动器,内存等. 不幸的是,我们大部分人没有 资源或资金建立甚至出租 (亚马逊网络服务 (自动取款机) 或谷歌云平台 (全球气候方案) ) 大量的电脑网格。 而且,不像一个关系数据库 允许返回结果行的任何顺序, ERDDAP™ 承诺以一致的顺序返回结果行. 这种限制使得 ERDDAP nThreads 执行效率降低. 不过 ERDDAP 'nThreads 在许多情况下是有用的.

然而,有办法使 ERDDAP™ 缩放以快速处理大量请求 [网格/集群/ ERDDAP 编号](/docs/server-admin/scaling) 。 。 。 。
         
#### &lt;调色板( G);{#palettes} 
* 开始 ERDDAP™ 2.12版本, datasets.xml 可包含一个&lt;调色板 &gt; 标记( 内)&lt;以 erddapDatasets &gt; 来覆盖&lt;调色板 &gt; 标签值来自信件. xml (或返回信件的值。xml 如果标记为 datasets.xml 为空) 。 。 。 您可以在此更改可用的调色板列表 。 ERDDAP™ 正在运行。 它也让你做出改变 当你安装新版本的 ERDDAP 。 。 。 。
警告: 列出的调色板 datasets.xml 必须是消息.xml中列出的调色板的超级集;否则 ERDDAP™ 将丢弃例外并停止处理 datasets.xml 。 。 。 。 这确保了所有 ERDDAP™ 安装至少支持同一核心调色板。
警报: ERDDAP™ 检查信件中指定的调色板文件是否确实存在, 但是它不检查列出的调色板文件 datasets.xml 。 。 。 你有责任确保档案都到齐
    
也是从 ERDDAP™ 2.12版本,如果您在 ERDDAP™ 内容目录, ERDDAP™ 将把目录中的所有 QQ.cpt 文件复制到 \\[ 移动猫 \\] 每次/webapps/erddap/WEB-INF/cptfiles目录 ERDDAP™ 开始 因此,如果你将自定义的cpt文件放入目录,这些文件将被使用 ERDDAP™ ,即使安装了新版本 ERDDAP 。 。 。 。
    
警告:如果在您的调色板中添加自定义调色板 ERDDAP™ 而你已经 EDDGrid 从 Erddap 和/或 EDD Table 从 Erddap 数据集中获取 ERDDAP™ 的调色板选项 ERDDAP™ 制作 Graph 网页, 但是如果用户尝试使用它们, 他们会得到一个默认的图表 (通常是彩虹) 调色板。 这是因为图像是由遥控器制作的 ERDDAP™ 它没有自定义调色板。 现在唯一的解决方案是电子邮件远程 ERDDAP™ 管理员将您的自定义调色板添加到其上 ERDDAP 或电子邮件克里斯。 John at noaa.gov 请求将调色板加入标准 ERDDAP™ 分发。
    
#### &lt;正在更改( G) ;{#onchange} 
* [ ** &lt;变迁 &gt; ** [ . ] (改变) 是一个可选标签&lt;数据集 &gt; 标记在 datasets.xml 指定创建此数据集时将采取的行动 (何时 ERDDAP™ 重新启动) 以及当此数据集以任何方式发生变化时。
    * 目前,为 EDDGrid 子类, 元数据或轴变量的任何更改 (例如,近实时数据的新时间点) 但重新装入数据集不视为更改 (本身) 。 。 。 。
    * 目前,对于EDDTable子类,数据集的任何重新加载都被认为是一个变化.
    * 目前,只允许两种行动:
        * " , "http://"或 "https://"- —— - 说 如果动作以 " 开始http://"或 "https://", (中文). ERDDAP™ 将发送 HTTP GET 请求到指定的 URL。 答复将被忽略。 例如,URL可能会让一些其他的网络服务做一些事情.
            * 如果 URL 有查询部分 (在""之后吗?) ,它必须已经 [编码百分比](https://en.wikipedia.org/wiki/Percent-encoding) 。 。 。 您需要在限制中编码特殊字符 (除初始“ &” 和主 '=' 制约因素) 输入表单%HH,其中HH是字符的两位数十六进制值。 通常情况下,您只需要将一些点缀字符 :% 转换为% 25, &% 26, " 转换为% 22,&lt;输入% 3C, = 输入% 3D, &gt; 输入% 3E, + 输入% 2B, | 进入% 7C, \\[ 输入% 5B, \\] 变为% 5D, 空间变为% 20, 并将 # 127 以上所有字符转换为 UTF-8 格式, 然后% 将 UTF-8 格式的每个字节编码为% HH格式 (请求程序员帮助) 。 。 。 。
例如,( S) stationID "41004" (中文(简体) ).
成为 & stationID % 3E% 2241004% 22
访问时通常需要百分率编码 ERDDAP 通过浏览器以外的软件。 浏览器通常为您处理 % 编码 。
在某些情况下,您需要将除A-Za-z0-9XX之外的所有字符编码%&#33;~&#33;  ' () QQ, 但仍不编码初始“ & ” 或主代码 '=' 限制。
编程语言有这样做的工具(例如,见 Java 因为 [ java.net.URLEncoder ](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html) 和 Java 脚本encodeURIComponent()[ . ] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) 还有
                 [为您编码/解码的百分比网站](https://www.url-encode-decode.com/) 。 。 。 。
            * 从 datasets.xml 是一个 XML 文件, 您也使用 &- encode All ' &,'&lt;在 URL 作为“ &amp;” 的“ ” 和“&gt; ” 中,&lt;', 和' & gt;' 编码% 之后 。
            * 示例 用于输入浏览器的 URL :
                https://www.company.com/webService?department=R%26D&param2=value2  
您应该指定一个&lt;通过 Change &gt; 标记 (单行) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * 邮件: - —— - 说 如果动作以"mailto:"开头, ERDDAP™ 将发送电子邮件到随后的电子邮件地址,表明数据集已经更新/更改。
例如:&lt;互联网档案馆的存檔,存档日期2013-03-02.&lt;/在变化中] 如果你有理由 ERDDAP™ 支持其它类型的动作,请发电子邮件给我们描述你想要什么。
    * 这个标签是可选的。 这些标签可以随你喜欢 每个动作都要使用其中一个标记.
    * 这类似于 ERDDAP 电子邮件/ URL 订阅系统, 但这些动作不是持续的存储 (即,它们只存储在一个 IDD 对象中) 。 。 。 。
    * 要删除订阅,只需删除&lt;在 Change &gt; 标签上。 下次重新装入数据集时将注意到这一变化。
         
#### &lt;重新装入 EveryNiminutes & gt;{#reloadeverynminutes} 
* [ ** &lt;重新装入 每个NMinutes &gt; ** [ . ] (每分钟都装满) 是一个可选标签&lt;数据集 &gt; 标记在 datasets.xml 用于指定数据集应重新装入次数的几乎所有数据集类型。 举例来说,
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * 通常,经常变化的数据集 (例如,获取新数据文件) 例如,每60分钟应经常重新装入。
    * 不经常变化的数据集应不经常重载,例如每1440分钟重载一次 (每日费用) 或10080分钟 (每周) 。 。 。 。
    * 这个标签是可选的,但推荐。 默认值为10080.
    * 一个例子是:&lt;重新装入 EveryNiminutes &gt; 1440&lt;重装 每个NMinutes &gt;
    * 当重新装入数据集时,所有文件在 *大家长会* /缓冲/ * datasetID * 目录被删除。
    * 无论设定到什么位置,一个数据集的加载频率都不会超过&lt;装入 Datasets minutes &gt; (默认 = 15) ,按 [设置. xml](/docs/server-admin/deploy-install#setupxml) 。 。 。 因此,如果想要非常频繁地重新装入数据集,则需要同时设置重新装入EveryNiminutes和加载Datasets 最小值为小值。
    * 不要将每颗NMinutes重新装入到与装入的Datasets相同的值 minminutes, 因为过去的时间很可能是 (举例来说,) 14:58或15:02,因此数据集只能重新装入约一半的主要重新装入. 相反,使用较小的 (例如,10项) 或更大的 (例如,20个) 重新装入 每个NMinute的价值。
    * 无论重新装入每张NMinutes,你都可以手动分辨 ERDDAP™ 通过一个 [旗帜文件](/docs/server-admin/additional-information#flag) 。 。 。 。
    * 给好奇的程序员 -- -- in ERDDAP™ ,所有数据集的重载由两个单一目的线程处理. 一个线程如果找到旗子文件或主重载, 启动小重装 (检查所有数据集以确定是否需要重新装入) 。 。 。 另一个线程是一次对一个数据集进行实际重载. 这些线程在背景中工作,确保所有数据集不断更新. 正在重新装入的线程会准备一个新版本的数据集,然后将其交换到位置 (基本上在解剖上取代旧版本) 。 。 。 所以很可能发生以下一系列事件 (这是好事) 数字 :
        
        1.   ERDDAP™ 开始重新装入数据集 (制作新版本) 在背景中显示。
        2. 用户"A"向数据集提出请求. ERDDAP™ 使用当前版本的数据集创建响应. (这是很好的。 用户没有延迟,目前版本的数据集永远不应该非常僵硬.) 
        3.   ERDDAP™ 完成创建新重新装入的数据集版本,并将该新版本转换为生产. 随后的所有新请求均由新版数据集处理. 为了保持一致性,用户A的请求仍由原版填充.
        4. 用户“ B” 对数据集和 ERDDAP™ 使用新版本的数据集创建响应.
        5. 最终完成用户A和用户B的请求 (也许 A先完成,也许B先完成) 。 。 。 。
        
我听到有人说:"只有两条腿&#33; 汉&#33; 真逊&#33; 他应该设置它,以便重新装入数据集 使用尽可能多的线程, 所以一切都会更快地完成, 并且很少或没有滞后。” 是亦无. 问题在于一次加载一个以上的数据集会产生几个新的难题. 它们都需要得到解决或处理。 现行制度运作良好,存在可处理的问题 (例如,在注意到国旗之前可能出现滞后) 。 。 。 。 (如果你需要帮助管理他们,见我们 [关于获得额外支助的章节](/docs/intro#support) 。 。 。 。) 相关 [更新 每个NMILIs](#updateeverynmillis) . 系统在响应线条内工作,因此能够并且确实导致多个数据集更新 (不重装) 同时。
##### 主动对反应{#proactive-vs-reactive} 
 ERDDAP 重新装入系统是主动的 -- -- 数据集在重新装入后不久就重新装入 时间到了 (也就是说,他们变成了"垃圾", 但从来没有非常 stale) ,该数据集是否收到用户的请求。 这么说 ERDDAP™ 数据集总是最新的,随时可以使用。 这与THREDDS的被动方式形成对比:用户的要求是让THREDDS检查数据集是否停滞的原因. (可能很沉闷) 。 。 。 如果它是 stale, THREDDS 让用户等待 (经常呆几分钟) 在重新装入数据集时。
        
#### &lt;更新 每张NMillis&gt;{#updateeverynmillis} 
* [ ** &lt;更新 EveryNMillis &gt; ** [ . ] (&#123;\fn方正粗倩简体\fs12\\an8\\1cHFFFF00\b0&#125;更新每个人) 是一个可选标签&lt;数据集 &gt; 标记在 datasets.xml 帮助某些数据集类型 ERDDAP™ 与经常变化的数据集合作 (几乎每秒钟) 。 。 。 。 与 ERDDAP 经常的、主动的,&lt;重新装入 –每分钟一次&gt;] (每分钟都装满) 完全重装每个数据集的系统,此 OPTIONAL 附加系统是被动的 (由用户请求触发) 因为它是递增的, (只需要更新需要更新的信息) 。 。 。 例如,如果向某国提出的请求 EDDGrid 自上次更新以来,来自Dap数据集的发生数超过指定的毫秒数, ERDDAP™ 将查看是否有最左边的新值 (首先,通常是 "time" ) 维度,如果是,则在处理用户请求之前下载这些新值。 这个系统非常善于保持一个快速变化的数据集的更新,对数据来源的需求最小,但代价是略微放慢了一些用户请求的处理速度.
    * 要使用此系统,请添加 (举例来说,) 数字 :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
紧接着&lt;重新装入 EveryNminutes &gt; 用于数据集的标记 datasets.xml 。 。 。 您指定的毫秒数可以小到 1 (确保数据集始终是最新的) 。 。 。 。 值为 0 (默认) 或负数关闭系统。
    * 由于它们的递增性质,更新应该非常迅速地完成,因此用户不应该等待很长时间.
    * 如果第二次数据请求在上一次更新完成之前到达,第二次请求将不会触发另一次更新.
    * 在整个文档中,我们将尝试使用"重载"一词来进行常规的,完整的数据集重载,并对这些新的递增的,部分的更新进行"更新".
    * 为了测试目的,如果[&lt;日志级别 &gt;] (# 日志级别) 输入 datasets.xml 被设定为"全部".
    * 如果您使用递增更新, 特别是最左边的更新 (第一个) 例如,时间,轴很大,您可能想要设置&lt;将 EveryNiminutes &gt; 重装到更大的数 (1440号?) ,这样更新就可以完成大部分工作来保持数据集的更新,而全重装工作很少完成.
    * 注:这一新更新系统更新了元数据 (例如,时间 actual\\_range 时间 时间 覆盖 结束...) 但不会引发变化 (电子邮件或触摸 URL) 或更改 RSS 种子 (也许它应该...) 。 。 。 。
    * 对于所有使用子类的数据集, [ EDDGrid 从文件](#eddgridfromfiles) 和 [来自文件的 EDD 表格](#eddtablefromfiles) 数字 :
        *    **警报:** 当您将新数据文件复制到目录中,将它添加到数据集时 ERDDAP™ 你看,有一个危险 ERDDAP™ 将注意部分写入的文件; 尝试读取它, 但因文件不完整而失败; 声明文件为“ 坏” 文件并删除它 (临时) 从数据集。
为了避免这种情况,我们 **大力建议** 用临时名称复制新文件到目录 (例如,20150226号 .nc 倾斜) 这不符合数据集文件 名称Regex (\\*\\ .nc ) ,然后将文件重命名为正确的名称 (例如,20150226号 .nc ) 。 。 。 。 如果你用这种方法, ERDDAP™ 将忽略临时文件,仅在文件完成并准备使用时通知正确命名的文件。
        * 如果您修改了已有的数据文件 (例如,添加一个新的数据点) , (中文).&lt;如果这些变化在解剖学上出现, 更新 EveryNMillis &gt; 将效果良好 (瞬间) 文件总是有效的文件。 例如,netcdf-java库允许添加一个"经典"的无限维度. .nc v3 文件在解剖学上制作.
            &lt;如果文件在修改时无效, 更新 EveryNMILis &gt; 的工作会很糟 。
        *   &lt;更新 Everynimillis &gt; 对于一个或几个文件在短时间内变化的数据集来说,效果很好。
        *   &lt;更新 EveryNMILis &gt; 在短时间内大量文件变化的数据集方面效果不佳 (除非这些变化在解剖学上出现) 。 。 。 对于这些数据集,最好不要使用&lt;更新 EveryNMillis &gt; 和设置 [旗帜](/docs/server-admin/additional-information#set-dataset-flag) 告诉 ERDDAP™ 以重新装入数据集。
        *   &lt;更新 EveryNMillis &gt; 不更新与[&lt; subsetVariables &gt;] (中文(简体) ). (# 亚位变量) 。 。 。 通常,这不是一个问题,因为 subsetVariables 拥有一些不经常改变的信息 (例如,站名、纬度和经度列表) 。 。 。 。 如果 subsetVariables 数据变化 (例如,当数据集中新增一个站点时) ,然后联系 [旗帜 URL](/docs/server-admin/additional-information#set-dataset-flag) 要显示的数据集 ERDDAP™ 以重新装入数据集。 否则 ERDDAP™ 不会注意到新的子集 变量信息,直到下一次重新装入数据集(&lt;重新装入 EveryNminutes &gt; ).
        * 我们的一般建议是:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * 麻烦? 在 Linux 计算机上, 如果您正在使用&lt;更新 EveryNMillis &gt; 与 EDDGrid 从Files 或 EDDTable 从Files 类中,您可能看到一个数据集无法加载的问题 (偶尔或一致) 带有错误消息 : “ IOExcuseion: 用户对已到达或已打开过多的示例的限制 ” 。 原因可能是在 Java 导致不收集垃圾的提示。 这个问题在 ERDDAP™ v1.66 及 更高档. 因此,最好的解决方案是切换最新版本的 ERDDAP 。 。 。 。
如果这样无法解决问题(也就是说,如果你使用的数据组数量确实很大)&lt;),您可以通过拨打:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
或者,如果问题继续存在,使用更高的数字。 手表的默认值为8192. 实例的默认值为128。
    * 你可以放进去&lt;更新MaxEvents &gt; 10&lt;/更新MaxEvents &gt; 输入 datasets.xml   (在接近顶端的其他设置中) 以更改文件更改的最大数量 (默认=10) 由更新的Everynimillis系统处理。 更多的数据对于数据集可能有用,因为数据集必须随时更新。 见 [更新MaxEvents文档](#updatemaxevents) 。 。 。 。
    * 对于好奇的程序员 -- -- 这些递增更新,不同于 ERDDAP 满 [重新装入每个 NMinutes](#reloadeverynminutes) 系统,发生在用户请求线索中。 因此,任何数量的数据集都可以同时更新. 有密码 (还有锁) 以确保在任何特定时刻只有一个线程正在对任何特定数据集进行更新。 允许多次同时更新是很容易的;允许多次同时全装将更难。
         
#### &lt;源代码 Can 约束 EstringEQNE&gt;{#sourcecanconstrainstringeqne} 
* [ ** &lt;来源Can 约束 EstringQNE &gt; ** [ . ] (# 源代码限制 eqne) 是 EDD 表中的可选标签&lt;数据集 &gt; 标记在 datasets.xml 指定源是否能够用 = 和 = 运算符约束字符串变量。
    * 对于 EDD Table FromDapSequence,这仅适用于外序字符串变量. 推测源头无法处理对内序变量的任何限制.
    * 这个标签是可选的。 有效值为真 (默认) 和虚假的。
    * 用于 EDD 表格从 DapSequence 排序 OPeNDAP DRDS 服务器, 这应该设置为真实 (默认) 。 。 。 。
    * 用于 EDD 表格从 DapSequence 排序 Dapper服务器,这应该被设定为虚假的.
    * 一个例子是:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;源代码 Can 约束 GTLT&gt;{#sourcecanconstrainstringgtlt} 
* [ ** &lt;源代码 Can 约束GTLT &gt; ** [ . ] (# 源代码约束gtlt) 是 EDD 表中的可选标签&lt;数据集 &gt; 标记,指定来源是否能够用&lt;, (中文).&lt;=, &gt;,和 &gt;=运算符.
    * 对于 EDD Table FromDapSequence,这仅适用于外序字符串变量. 推测源头无法处理对内序变量的任何限制.
    * 有效值为真 (默认) 和虚假的。
    * 这个标签是可选的。 缺省为真.
    * 用于 EDD 表格从 DapSequence 排序 OPeNDAP DRDS 服务器, 这应该设置为真实 (默认) 。 。 。 。
    * 用于 EDD 表格从 DapSequence 排序 Dapper服务器,这应该被设定为虚假的.
    * 一个例子是:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;源文件 Can 约束Regex & gt;{#sourcecanconstrainstringregex} 
* [ ** &lt;源文件 Can 约束规则 ** [ . ] (# 源代码约束网) 是 EDD 表中的可选标签&lt;数据集 &gt; 标记,指定来源是否能够通过正则表达式限制字符串变量,如果可以,操作员是什么。
    * 有效值为“...” (联合国 DAP 标准) ,"~=" (错误地得到许多 DAP 服务器) ,或“” (表示来源不支持正则表达式) 。 。 。 。
    * 这个标签是可选的。 默认为".
    * 用于 EDD 表格从 DapSequence 排序 OPeNDAP DRDS 服务器, 这应该设置为“ ” (默认) 。 。 。 。
    * 用于 EDD 表格从 DapSequence 排序 Dapper 服务器, 这应该设置为 "" (默认) 。 。 。 。
    * 一个例子是:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;源代码 CanDistinct & gt;{#sourcecandodistinct} 
* [ ** &lt;来源CanDistinct &gt; ** [ . ] (# 源代码) 是 EDD Table 从数据库中的可选标签&lt;数据集 &gt; 标记, 指定源数据库是否应处理 & difficience () 用户查询中的限制。
    * 这个标签是可选的。 有效值为无 ( ERDDAP™ 处理区分; 默认值) 部分 (源处理不同, ERDDAP™ 再来一次) 对 (源处理区分) 。 。 。 。
    * 如果你没有使用 ERDDAP™ 处理区分时, 正在耗尽内存, 使用是 。
    * 如果使用是,而源数据库处理速度太慢,则使用否。
    * 部分地给了你两者中最糟糕的一面:它很慢,因为数据库对特性的处理很慢,而且可能内存耗尽。 ERDDAP 。 。 。 。
    * 数据库将DISTINCT解释为只要求提供独特的一行结果,而 ERDDAP™ 将它解释为请求一个排序后的独特行结果列表. 如果你将此设定为部分或是, ERDDAP™ 还自动告诉数据库排序结果。
    * 结果是一个小的差别:
没有 | 部分, ERDDAP™ 会在结果开始时排序“” (在非“ ” 字符串之前) 。 。 。 。
如果有,数据库可能 (邮递员会) 在结果末尾排序“” (非“ ” 字符串之后) 。 。 。 。
我想这也会影响短词与长词的排序,从短词开始。 举例来说, ERDDAP™ 将在"西蒙斯"之前排序"西蒙".
    * 一个例子是:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;源代码 CanderBy&gt;{#sourcecanorderby} 
* [ ** &lt;来源 CanderBy 命令单 ** [ . ] (# 源代码) 是 EDD Table 从数据库中的可选标签&lt;数据集 &gt; 标签,指定源数据库是否处理( T) orderBy  (. .  ....) 用户查询中的限制。
    * 这个标签是可选的。 有效值为无 ( ERDDAP™ 手柄 orderBy  (. .  ....) ; 默认值) 部分 (源控件 orderBy 和 ERDDAP™ 再来一次) 对 (源控件 orderBy  (. .  ....) ) 。 。 。 。
    * 如果你没有使用 ERDDAP™ 处理时内存已耗尽 orderBy  (. .  ....) ,使用是的。
    * 如果您使用是, 并且源数据库处理 orderBy  (. .  ....) 慢点,不要
    * 部分地给了你两者中最糟糕的:因为数据库处理很慢 orderBy  (. .  ....) 缓慢,并且可能耗尽内存 ERDDAP 。 。 。 。
    * 结果是一个小的差别:
没有 | 部分, ERDDAP™ 会在结果开始时排序“” (在非“ ” 字符串之前) 。 。 。 。
如果有,数据库可能 (邮递员会) 在结果末尾排序“” (非“ ” 字符串之后) 。 。 。 。
这也可能影响从短词开始的短词与长词的排序. 举例来说, ERDDAP™ 将会在"Simons"之前排序“Simon”, 但我不确定数据库会如何排序它们。
    * 一个例子是:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;源代码扩展FPQEGT;{#sourceneedsexpandedfp_eq} 
* [ ** &lt;来源 需求 扩展FPQQQEQQQQQ ** [ . ] (# 源代码需要性pandedfp_eq) 是 EDD 表中的可选标签&lt;指定数据集 &gt; 标记 (真实 (默认) 或虚假) 如果源代码需要帮助查询&lt;数字 变量&lt;浮点值 " (和&#33;=, QQ,&lt;=) (中文(简体) ). 举例来说,
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * 对于一些数据源,涉及=,&#33;=的数值查询.&lt;=,或 &gt;= 可能与浮点数不尽相同。 例如,如果将数值存储为220.20000000000000001,则对经度=220.2的搜索可能会失败.
    * 出现这个问题是因为浮点数 [计算机中不完全代表](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) 。 。 。 。
    * 如果来源需求扩展FPQQQEQ 设置为真 (默认) , (中文). ERDDAP™ 修改发送到数据源的查询以避免这个问题. 永远是安全的和好的 离开这组是真实的。
         
#### &lt; sourceUrl & gt; (G) 请检查url=值 (帮助) 。{#sourceurl} 
* [ ** &lt; sourceUrl &gt; 翻译: ** [ . ] (# 来源) 是一个数据集全局内常见的标签&lt; addAttributes &gt; 指定数据来源的 URL 标记。
    * 一个例子是:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (但都放在一条线上) 
    * 内 ERDDAP™ ,所有数据集将有一个 " sourceUrl " 在向用户显示的综合全球属性中。
    * 对于大多数数据集类型来说,这个标记是REQUIRED. 参见数据集类型描述,以了解是否为REQUIRED.
    * 对于一些数据集,单独的&lt; sourceUrl &gt; 标记不允许。 相反,你必须提供 " sourceUrl " , " [全局属性](#global-attributes) ,通常在全球 QQ 中 addAttributes &lt;。 。 。 如果没有实际源 URL (例如,如果数据存储在本地文件中) ,例如,这个属性往往只是具有占位值,&lt;att name=“ 名称” &gt; (本地文件) &lt;/att&gt; (英语).
    * 对于大多数数据集,这是用于请求数据的URL的基础. 例如,关于 DAP 服务器,这是可以添加.dods,.das,.dds,或.html的 URL 。
    * 从 datasets.xml 是一个 XML 文件, 您必须同时编码“ &, ” 。&lt;在 URL 作为“ &amp;” 的“ ” 和“&gt; ” 中,&lt;',和'&gt;'.
    * 对于大多数数据集类型, ERDDAP™ 添加原样 sourceUrl   (源代码中的“本地源代码 ”) 页:1 [全局属性](#global-attributes)   (在其中成为源代码中的“ 公共源代码 ”) 。 。 。 当数据源为本地文件时, ERDDAP™ 添加 sourceUrl =" (本地文件) " 作为安全防范的全球特征。 当数据源是一个数据库时, ERDDAP™ 添加 sourceUrl =" (源数据库) " 作为安全防范的全球特征。 如果您的一些数据集使用非公开 sourceUrl 因为 (通常因为他们的电脑在您的DMZ或本地局域网上) 您可以使用 [&lt;转换为 PublicSourceUrl &gt;] (#转换为公共源代码) 标记以指定如何转换本地 sourceUrl 向公众开放 sourceUrl 编号
    * 页:1 sourceUrl 可能从 http:// , (中文). https:// ,ftp://,也许还有其他前缀. https 连接读取并检查来源的数字证书,以确保来源是他们所说的人. 在罕见的情况下,由于错误"javax.net.ssl.SSL ProtocolExcession:握手提醒:未识别的QQ名称",此检查可能失败. 这可能是由于证书上的域名与您使用的域名不匹配. 你可以而且应该读读 sourceUrl 在您的网页浏览器中的证书, 特别是“ 对象替代名称” 部分的“ DNS 名称” 列表 。
        
在某些情况下, sourceUrl 您使用的可能是证书上域名的别名。 举例来说,
        https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/将丢出此错误, 但是
        https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/,使用证书上的域名,不会. 因此,在这种情况下的解决办法是找到和使用证书上的域名。 在证书上找不到的,联系数据提供者.
        
在其他情况下,证书上的域名可能为一组名. 如果发生这种情况或问题无法解决,请发电子邮件给Chris。 约翰在Noaa.gov报告问题。
         

#### &lt;addAttributes&gt; {#addattributes} 
* [ ** &lt; addAttributes &gt; 翻译: ** [ . ] (# 属性) 是每个数据集和允许 ERDDAP 管理员控制与数据集及其变量相关的元数据属性.
    *    ERDDAP™ 合并数据集源属性 ("源属性") 和 " addAttributes 您定义的 datasets.xml   (具有优先权的) 来制作“综合属性”,即 ERDDAP™ 用户参见。 这样,你可以使用 addAttributes 以重新定义源属性的值,添加新的属性,或删除属性。
    * 那个&lt; addAttributes &gt; 标签附件 0 或以上 ** &lt;点数 &gt; ** 子标签,用于指定个人属性。
    * 每个属性由一个名称和一个值组成 (具有特定数据类型,例如双倍) 。 。 。 。
    * 只有一个带有给定名称的属性. 如果有更多的,最后一个优先。
    * 值可以是单个值,也可以是空格分隔的值列表.
    * 语法
        * 顺序&lt;att &gt; 内部的子目录 addAttributes 这不重要
        * 那个&lt;att &gt; 子标签格式为
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * 所有属性的目的地名称以字母开头 (A -Z, a -z, a -z (英语).) 和 MUST 中仅包含字符 A-Z, a-z, 0-9, 或 '\\_' 。
        * 如果出现&lt;att&gt; subtag没有值或值为无效,该属性将从合并属性中移除.
举例来说,&lt;att name="rows" / &gt; 将删除合并属性中的行.
举例来说,&lt;att name=“ 坐标” &gt; null&lt;/att &gt; 将从组合属性中删除坐标。
##### 属性 类型{#attributetype} 
* [备选类型值:&lt;att &gt; 子队] (# 属性类型) 表示数值的数据类型。 默认类型是 String 。 字符串属性的一个例子是:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * 单个值的有效类型为字节 (8 位整数) 简称 (16 位签名整数) 缩写 (32 位签名整数) 长 (64 位签名整数) 浮动 (32 位浮点) 双 (64位浮点) 和弦乐。 举例来说,
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
见这些关于 [字符数据类型](#char) 。 。 。 。
见这些关于 [长数据类型](#long) 。 。 。 。
        
    * 以空格分隔的数值清单的有效类型 (单值) 字节列表, 简称列表, 无符号列表, 字符列表, 中间列表, 长列表, 浮列表, 双 名单。 举例来说,
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
未署名的ShortList允许您指定一个未署名的短片列表,但这些短片将被转换成相应的Unicode字符列表(如"65 67 69"将被转换为"A C E").
如果您指定了 CharList,则编码任何特殊字符(例如空间、双引号、反斜线,&lt;# 32, 或 # # # #127, 因为您会在 NCCSV 文件的数据区编码它们 。 (例如,","\"或"","\\\\","\\\\","\\\\". \\n ","\\u20ac",") 。 。 。 。
没有字符串列表 。 将字符串值存储为多行字符串 。 举例来说,
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### 全球属性{#global-attributes} 
* [ ** 全球属性/ 全球&lt; addAttributes &gt; 翻译: ** [ . ] (# 全球属性) - —— - 说
    &lt; addAttributes &gt; 是在&lt;数据集 &gt; 标记,用于改变适用于整个数据集的属性。
    
    *    ** 使用全局&lt; addAttributes &gt;以更改数据集的全局属性. **  ERDDAP™ 组合数据集源的全局属性( Q)** 源属性 **和全球**  addAttributes  **您定义在 datasets.xml   (具有优先权的) 建立全球** 组合属性 ** ,这些是什么 ERDDAP™ 用户参见。 这样,你可以使用 addAttributes 以重新定义源属性的值,添加新的属性,或删除属性。
    * 见[ ** &lt; addAttributes &gt; 翻译: **资料] (# 属性) 适用于全球和变量** &lt; addAttributes &gt; 翻译: ** 。 。 。 。
    *    [氟化烃](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html) 和 [ISO 19115-2/19139 (英语).](https://en.wikipedia.org/wiki/Geospatial_metadata) 元数据 - —— - 说 一般情况下 ERDDAP™ 将自动生成 ISO 19115-2/19139 和 FGDC (FGDC-STD-001-1998) XML 元数据文件用于每个数据集,使用数据集元数据的信息. 这么说 **良好的数据集元数据导致好的 ERDDAP - 生成ISO 19115和FGDC元数据. 请考虑花大量时间和精力来改进您的数据集的元数据 (反正这是件好事) 。 。 。 。** 用于生成ISO 19115和FGDC元数据的数据集元数据属性大多来自: [ACDD 元数据标准](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 现予说明。
    * 许多全球特征在这方面是特殊的。 ERDDAP™ 寻找它们并以各种方式使用它们。 例如,链接到 infoUrl 包含在包含数据集列表的网页上,以及其它地方,这样用户就可以了解更多关于数据集的信息.
    * 当用户选择一个数据子集时, 与变量的经度、 纬度、 高度相关的全局属性 (或深度) 时间范围 (例如,最南端的北边,最北端的北边, 时间的覆盖 开始,时间的覆盖 结束) 自动生成或更新。
    * 一个简单的全球样本&lt; addAttributes &gt; 是:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
空的 cwhdf\\_version 属性导致源 cwhdf\\_version 属性 (如果有的话) 从最终、合并的属性列表中删除。
    * 提供信息有助于 ERDDAP™ 做一个更好的工作,帮助用户理解数据集.
良好的元数据可以使用数据集。
元数据不足使得数据集无用.
请花点时间来完成元数据属性的好工作.
##### 特殊全球属性 ERDDAP™ 
###### 承认{#acknowledgement} 
*    [ **承认** ](#acknowledgement) 和 **承认**   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是一种建议的方式,用以确认提供支持的一个或多个团体; (特别是财政) 用于创建此数据的项目。 举例来说,
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
注意ACDD 1.0和1.1使用拼写"承认". (这是美国常用的拼写法) ,但 ACDD 1.3 修改为“承认” (这是英国常用的拼法) 。 。 。 我的理解是,这种变化基本上是一场意外,他们肯定没有认识到这种变化的后果。 真是一团糟&#33; 现在全世界有上百万个数据文件有"承认",上百万个数据文件有"承认". 这凸显了对标准"简单"修改的愚蠢,强调标准要稳定. 因为ACDD 1.3 (该版本是 ACDD ERDDAP™ 支持) 说"承认",这就是 ERDDAP™   (特别是生成数据 xml 数据) 鼓励。
     
###### cdm=海拔++xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx{#cdm_altitude_proxy} 
*    [ **cdm=海拔++xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx** ](#cdm_altitude_proxy) 仅用于 EDDTable 数据集,这些数据集没有高度或深度变量,但有一个变量是高度或深度的代词 (例如,压力、西格玛、瓶子) ,您可以使用此属性来识别变量。 举例来说,
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
如果 [cdm\\_data\\_ 类型](#cdm_data_type) 是 profile 或 TropjectoryProfile 并且没有高度或深度变量, cdm\\_altitude\\_ proxy MUST 定义 。 如果Cdm\\_altitude\\_proxy被定义, ERDDAP™ 将在变量中添加以下元数据: QQ坐标 轴Type=高和轴=Z.
     
###### cdm\\_data\\_ 类型{#cdm_data_type} 
*    [ **cdm\\_data\\_ 类型** ](#cdm_data_type)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是显示 Unidata   [通用数据模型](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html) 数据集的数据类型。 举例来说,
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
清洁发展机制仍在发展之中,可能会再次发生变化。 ERDDAP™ 遵守相关的更详细的规定 [断层采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 章 次 页 次 [1.6 氟化碳](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 元数据公约 (原称CF点观测公约) 。 。 。 。
    * 无论是数据集的全局 [源属性](#global-attributes) 或全球范围&lt; addAttributes &gt; 翻译: MUST包括 cdm\\_data\\_ type 属性. 几个数据集类型 (如 EDD 表格 从奥比斯) 将自动设置此选项。
    * 对于 EDDGrid 数据集, cdm%% data%%%% 类型选项为 Grid (默认和迄今为止最常见的类型 EDDGrid 数据集) , MovingGrid, Other, Point, Profile, RadialSweep, 时间序列, 时间序列Profile, Swath, Tropetory, 和 TropetoryProfile. 目前, EDDGrid 不需要指定任何相关的元数据,也不检查数据是否匹配 cdm\\_data\\_QQ。 在最近的将来,这种情况可能会改变。
    * EDDTable严格采用cdm\\_data\\_型,遵循CF的DSG规格,而不是CDM,由于某种原因,CDM没有更新以符合DSG. 如果数据集的元数据不符合 ERDDAP 'cdm\\_data\\_型'的要求 (见下文) ,该数据集将无法加载并生成一个 [错误消息](#troubleshooting-tips) 。 。 。 。 (这是好事,因为错误信息会告诉你什么是错的,这样你就可以修复它.) 如果数据集的数据不符合数据集的元数据设置 (例如,如果一个时序数据集中某个空间站有一个以上的纬度值) ,一些数据请求会在回复中返回不正确的数据。 所以,确保你得到这一切的权利。
        
有关所有这些数据集的公约和 Metadata\\_Conventions 全球属性,请参见CF-1.6 (非CF-1.0、1.1、1.2、1.3、1.4或1.5) ,因为CF-1.6是第一个包含Discrete Sampling Geometry相关修改的版本. (副秘书长) 公约。
        *   ** ERDDAP™ 与CF DSG有非简单关系** 
        *    ERDDAP™ 可以从已经有效的 DSG 文件的源数据集中生成有效的 DSG 数据集 (编号) ,或者来自一个不是为 DSG 设置但可以通过修改元数据实现的源数据集 (其中一些是: ERDDAP - 具体化,以便提供一个更笼统的方法,具体确定DSG的设置) 。 。 。 。
        *    ERDDAP™ 当它装入一个数据集时,会进行许多有效性测试。 如果有 cdm\\_data\\_ 类型的数据集 (或 featureType ) 属性成功加载 ERDDAP™ ,则 ERDDAP™ 表示数据集符合DSG要求 (否则, ERDDAP™ 来解释它发现的第一个问题) 。 。 。 。
警告:一个成功装入的数据集似乎符合DSG要求 (它有正确的属性组合) ,但仍可能设置错误,导致结果不正确。 .nc CF和 .nc CFMA响应文件. (软件在某些方面是聪明的,在另一些方面是无稽之谈的。) 
        * 当你查看数据集的元数据时 ERDDAP™ , DSG 数据集似乎在 ERDDAP 内部格式 (类似数据库的巨型表格) 。 。 。 这不是DSG格式的一种 (例如,维度和元数据是不正确的) ,但将数据集作为 DSG 数据集处理所需的信息在元数据中 (例如,cdm\\_data\\_ type=TimeSeries和cdm\\_timseriesseries \\_可变= *aCsvList Official 相关变量* 在全域元数据中, 和 CfQQX role = timeseries% id 对应一些变量) 。 。 。 。
        * 如果用户请求在一个 .nc CF 数字 (a 是一个 .nc 以 DSG 的相邻标记矩阵文件格式编写的文件) 或 .nc CFMA 文件 ((单位:千美元) .nc DSG 的多维矩阵文件格式文件) ,该文件将是有效的 CF DSG 文件。
警告:但如果数据集设置错误 (这样元数据的承诺就不是真的) ,那么响应文件在技术上是有效的,但在某种程度上是不正确的。
             
###### EDD 表格 cdm_data_类型
* 对于 EDDTable 数据集, cdm% data%%%% 类型选项 (相关需求 ERDDAP ) 已经
###### 点{#point} 
*    [点](#point) 用于在不相关的时间和地点进行的一系列测量。
    * 与其它所有cdm\\_data\\_类型一样,Point数据集MUST具有经度,纬度和时间变量.
###### 简介{#profile} 
*    [简介](#profile) 在一个经纬度位置上 在一个以上的深度 (或高度) 。 。 。 数据集可能是这些配置图的集合,例如来自不同地点的7个配置图. 此 cdm\\_data\\_ type 并不意味着任何配置文件之间的任何逻辑联系.
    
* 一个变量 (例如,配置文件编号) MUST拥有可变属性cf\\_role=profile\\_id,以识别唯一识别配置的变量.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
如果没有其他变量适合,请考虑使用时间变量.
###### cdm\\_ profile 变数{#cdm_profile_variables} 
* 数据集 MUST 包含全局属性 [cdm\\_ profile 变数](#cdm_profile_variables) ,其中的值是一个逗号分隔的变量列表,这些变量拥有每个配置信息。 对于给定的配置文件,这些变量的值是恒定的。 举例来说,
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
列表 MUST 包含 cf\\_role = profile\\_d 变量和所有其他变量,包含关于配置,以及时间,纬度和经度的信息.
列表中永远不会包括高度,深度,或任何观测变量.
     

 \\[ 意见: cdm\\_data\\_type=Profile 应很少使用. 在实践中,一个给定的数据集通常要么是一个TimeSeriesProfile (固定位置的配置文件) 或轨迹文件 (沿轨道的剖面图) ,因此,应适当确定这一点。 \\]   
###### 时间序列{#timeseries} 
*    [时间序列](#timeseries) - 是一系列测量 (例如,海水温度) 在一个、固定、纬度、经度、深度拍摄 (或高度) 地点。 (把它当作"站".) 数据集可能是这些时间序列的集合,例如3个不同位置的每个序列.
    * 一个变量 (例如, 站点==) MUST拥有可变属性cf\\_role=timeseries\\_id,以识别唯一识别站点的变量.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### 时间序列{#cdm_timeseries_variables} 
* 数据集 MUST 包含全局属性 [时间序列](#cdm_timeseries_variables) ,其中的值是一个逗号分隔的变量列表,其中包含每个站点的信息. 对于给定的站点,这些变量的值MUST是恒定的. 举例来说,
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
列表 MUST 包含 Cf\\_role=timeseries\\_id 变量和所有其他包含站点信息的变量,这些变量几乎总是包括纬度和经度. (高度或深度,如果有的话) 。 。 。 。
列表永远不会包括时间或任何观测变量.
* 对于一些锚定浮标,数据集可能有两组经纬度变量:
    1. 恒定的一对经纬度值 (即锚的固定位置) 。 。 。 。 内 ERDDAP™ ,给这些变量 destinationName s 的纬度和经度,并将这些变量列入cdm\\_times系列的列表中.
    2. 与每项观测相关的精确纬度和经度值。 内 ERDDAP™ ,给出不同的变量 destinationName 编号 (例如,精确的Lat和精确的 龙) 并且不要将这些变量列入cdm\\_timeseries的可变数列表.
其理由是:从理论角度看,对于一个DSG TimeSeries数据集,纬度和经度 (高度或深度,如果有的话) 车站位置必须保持不变。
###### 时间序列文件{#timeseriesprofile} 
*    [时间序列文件](#timeseriesprofile) ——指在一个固定的经纬度位置拍摄的一系列剖面图. 每个剖面图是在多高度或深度进行的一组测量。 数据集可能是这些TimeSeriesProfile的集合,例如,在12个不同地点中每个地点所拍摄的剖面图序列.
    * 一个变量 (例如, 站点==) MUST拥有可变属性cf\\_role=timeseries\\_id,以识别唯一识别站点的变量.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * 一个变量 (例如,配置文件编号) MUST拥有可变属性cf\\_role=profile\\_id,以识别唯一识别配置的变量.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (给定的 profile=======================================================================================) 如果没有其他变量适合,请考虑使用时间变量.
    * 数据集MUST包括了全球属性cdm\\_timeseries\\_vatiables,其中的值是一个逗号分隔的变量列表,这些变量拥有每个站点的信息. 对于给定的站点,这些变量的值MUST是恒定的. 举例来说,
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
列表 MUST包括cf\\_role=timeseries\\_id变量和所有其他包含该站信息的变量,这些变量几乎总是包括纬度和经度.
该列表永远不会包括时间,高度,深度,或者任何观测变量.
    * 数据集 MUST 包含全局属性 cdm\\_profile\\_vatiables,其中的值是一个逗号分隔的变量列表,其中包含每个配置的信息. 对于给定的配置文件,这些变量的值是恒定的。 举例来说,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
列表 MUST 包含 cf\\_role = profile\\_d 变量和所有其他包含配置信息的变量,这些变量几乎总是包括时间.
该列表永远不会包括纬度,经度,高度,深度,或者任何观测变量.
###### 轨迹{#trajectory} 
*    [轨迹](#trajectory) - 是沿着轨迹进行的一系列测量 (穿越空间和时间的路径)   (例如,船只在水中移动时取的海水温度) 。 。 。 数据集可能是这些轨迹的集合,例如4艘不同舰只的每个序列.
    * 一个变量 (例如,船舶) MUST拥有属性cf\\_role=trajectory\\_id以识别唯一识别轨迹的变量.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### (cdm) 弹射量{#cdm_trajectory_variables} 
* 数据集 MUST 包含全局属性 [(cdm) 弹射量](#cdm_trajectory_variables) ,其中的值是一个逗号分隔的变量列表,这些变量拥有每个轨迹的信息。 对于给定的轨迹,这些变量的值是恒定的。 举例来说,
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
列表 MUST 包含 cf\\_role=trajectory\\_id 变量以及其它所有含有轨迹信息的变量.
该列表永远不会包括时间,纬度,经度,或任何观测变量.
###### 轨迹文件{#trajectoryprofile} 
*    [轨迹文件](#trajectoryprofile) ——是沿轨迹拍摄的一系列剖面图. 数据集可能是这些TrajectoryProfile的集合,例如14艘不同舰只所拍摄的剖面图序列.
    * 一个变量 (例如,船舶) MUST拥有可变属性cf\\_role=trajectory\\_id,以识别唯一识别轨迹的变量.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * 一个变量 (例如,配置文件编号) MUST拥有可变属性cf\\_role=profile\\_id,以识别唯一识别配置的变量.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (给定的 profile======================================================================================) 如果没有其他变量适合,请考虑使用时间变量.
    * 数据集 MUST 包括了全局属性 cdm\\_trajectory\\_vatiables,其中的值是一个逗号分隔的变量列表,其中包含每个轨迹的信息. 对于给定的轨迹,这些变量的值是恒定的。 举例来说,
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
列表 MUST 包含 cf\\_role=trajectory\\_id 变量以及其它所有含有轨迹信息的变量.
该列表永远不会包括与剖面相关的变量,时间,纬度,经度,或任何观测变量.
    * 数据集 MUST 包含全局属性 cdm\\_profile\\_vatiables,其中的值是一个逗号分隔的变量列表,其中包含每个配置的信息. 对于给定的配置文件,这些变量的值是恒定的。 举例来说,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
列表MUST包括cf\\_role=profile\\_id变量和所有其他包含配置信息的变量,这些变量几乎总是包括时间,纬度和经度.
列表中永远不会包括高度,深度,或任何观测变量.
###### 其他人员{#other} 
*    [其他人员](#other) - 没有要求。 如果数据集不符合其他选项之一,特别是如果数据集不包括纬度,经度和时间变量,则使用.
     
###### 相关说明{#related-notes} 
* 除"其他"MUST外,所有带有cdm\\_data\\_Q\\_型的EDDTable数据集都有经度,纬度,时间变量.
* 配置图 MUST 的数据集具有高度变量、深度变量或 [cdm=海拔++xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx](#cdm_altitude_proxy) 变量。
* 如果您无法使数据集符合理想的 cdm\\_data\\_ 类型的所有要求,请使用"Point" (没有什么要求) 或“其他” (没有要求的) 相反。
* 这些信息用于: ERDDAP™ 例如,通过各种方式,但大多用于制作 .nc CF 文件 ( .nc 符合与数据集的 cdm%% data%%%% 类型相关的相近标记矩阵表达式的文件) 和 .nc CFMA 文件 ( .nc 符合与数据集的 cdm%% data%%%%% 类型相关的多维矩阵表达式的文件) 定义 [断层采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 章 次 页 次 [CF 数字](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 元数据公约,以前称为"CF点观测公约".
* 提示 : 对于这些数据集,正确的设置用于 [ subsetVariables ](#subsetvariables) 通常是 cdm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 例如,对于TimeSeriesProfile,使用cdm\\_time序列+cdm\\_profile\\_vals.
######  contributor\\_name  {#contributor_name} 
*    [ ** contributor\\_name ** ](#contributor_name)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 用于确定为本数据集作出贡献的人、组织或项目的建议方式 (例如,数据原始创建者,在本数据集创建者重新处理之前) 。 。 。 。 举例来说,
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
如果"贡献者"没有真正应用于数据集,则省略这个属性. 比较 [ creator\\_name ](#creator_name) ,这有时更侧重于资金来源。
######  contributor\\_role  {#contributor_role} 
*    [ ** contributor\\_role ** ](#contributor_role)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 建议如何确定 [ contributor\\_name ](#creator_name) 。 。 。 。 举例来说,
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
如果"贡献者"没有真正应用于数据集,则省略这个属性.
###### 公约{#conventions} 
*    [ **公约** ](#conventions)   (从 [CF 数字](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 元数据标准) 强烈建议。 (将来也许有需要。) 该值是本数据集所遵循的以逗号分隔的元数据标准列表. 例如:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
通用元数据公约 ERDDAP™ 它们是:
    
    *    [ COARDS 公约](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) 是CF的前体。
    *    [气候和预测 (CF 数字) 公约](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 是许多建议属性和要求属性的来源 ERDDAP 。 。 。 目前版本的CF识别为"CF-1.6".
    * 那个 NetCDF 数据集发现属性公约 (APDD) 是许多建议属性和要求属性的来源 ERDDAP 。 。 。 原1.0版本的ACDD (伊森·戴维斯的精彩作品) ,确定为 [ Unidata 数据集发现 v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1) 当前情况 (2015年开始) 1.3 CDD版本被确定为: [ACDD-1.3 化学文摘社](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 。 。 。 如果您的数据集一直在使用 Unidata 数据集发现v1.0,我们鼓励你 [切换您的数据集以使用 ACDD- 1. 3](#switch-to-acdd-13) 。 。 。 。
    
如果您的数据集遵循了一些额外的元数据标准, 请在公约属性中将名称添加到 CSV 列表中 。
######  coverage\\_content\\_type  {#coverage_content_type} 
*    [ ** coverage\\_content\\_type ** ](#coverage_content_type)   (从 [国际标准化组织 19115](https://en.wikipedia.org/wiki/Geospatial_metadata) 元数据标准) 是用于识别网格数据类型的建议方法 (输入 EDDGrid 数据集) 。 。 。 。 举例来说,
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
唯一允许的值是辅助信息、图像、模型Result、物理 计量 (生成 ISO 19115 元数据时的默认) 信息、参考信息和专题分类。 (不要使用此标签来设置 EDDTable 数据集 。)   
######  creator\\_name  {#creator_name} 
*    [ ** creator\\_name ** ](#creator_name)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 建议的识别个人、组织或项目的方法 (如果不是特定的人或组织) ,对创建负最大责任 (或最近的后处理) 数据。 举例来说,
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
如果数据被大量重新处理 (例如,从二级到三级或四级的卫星数据) ,然后通常将再处理器列为创建者,并通过 [ contributor\\_name ](#contributor_name) 。 。 。 。 比较 [项目](#project) 这比较灵活,因为它可以确定个人、组织或项目。
######  creator\\_email  {#creator_email} 
*    [ ** creator\\_email ** ](#creator_email)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是一个建议识别电子邮件地址的方法 (正确格式化) 提供与创造者联系的方法。 举例来说,
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
######  creator\\_url  {#creator_url} 
*    [ ** creator\\_url ** ](#creator_url)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是用于为创建数据集的组织识别URL的建议方式,或者包含创建者关于此数据集信息的URL (但这更是目的 [ infoUrl ](#infourl) ) 。 。 。 。 举例来说,
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
######  date\\_created  {#date_created} 
*    [ ** date\\_created ** ](#date_created)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是确定数据首次创建日期的建议方式 (例如,加工成本表) ,使用ISO 8601格式。 举例来说,
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
如果数据定期添加到数据集中,这是原始数据的第一个提供日期.
######  date\\_modified  {#date_modified} 
*    [ ** date\\_modified ** ](#date_modified)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是确定上次修改数据的日期的建议方式 (例如,当错误被修正或当添加最新数据时) ,使用ISO 8601格式。 举例来说,
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
######  date\\_issued  {#date_issued} 
*    [ ** date\\_issued ** ](#date_issued)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是确定首次以ISO 8601格式向他人提供数据的日期的建议方式,例如2012-03-15。 举例来说,
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
例如,数据集可能有一个 [ date\\_created ](#date_created) 2010-01-30,但仅公开发布2010-07-30. date\\_issued 使用频率低于 date\\_created 和 date\\_modified 。 。 。 。 若为 date\\_issued 被省略,假设它与 date\\_created 。 。 。 。
###### 全球 drawLandMask  {#global-drawlandmask} 
*    [ ** drawLandMask ** ](#global-drawlandmask) - —— - 说 这是一个 OPTIONAL 全球属性,用于 ERDDAP™   (没有元数据标准) 指定数据集 Make A Graph 窗体上“ Draw Land Mask” 选项的默认值 ( * datasetID * 图片) 并用于请求数据映射的URL中的 &. 举例来说,
    ```
    <att name="drawLandMask">over</att>  
    ```
见 [ drawLandMask 概览](#drawlandmask) 。 。 。 。
######  featureType  {#featuretype} 
*    [ ** featureType ** ](#featuretype)   (从 [CF 数字](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 元数据标准) 已取消和/或撤销。 如果数据集 [cdm\\_data\\_ 类型](#cdm_data_type) 这是适当的, ERDDAP™ 将自动使用它创建一个 featureType 属性。 故不须加.
    
不过,如果你在使用 [来自 NcCFF 的 EDD 表格](#eddtablefromnccffiles) 来创建从后面的文件生成的数据集 [CF 数字 断层采样 (副秘书长) 标准](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ,文件本身必须 featureType 正确定义,这样 ERDDAP™ 可以正确阅读文件。 这是CF DSG对此类文件的要求的一部分。
     
###### 历史{#history} 
*    [ **历史** ](#history)   (从 [CF 数字](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 和 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是一个推荐的多行字符串全局属性,其中对数据经过的每一个处理步骤都有一条线。 举例来说,
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * 理想情况下,每行都有ISO 8601:2004 (英) 格式化日期+时间Z (例如,2011-08-05T08:55:02Z) 之后是处理步骤的说明。
    *    ERDDAP™ 如果它已经不存在的话,就创建它。
    * 如果它已经存在 ERDDAP™ 将对现有信息附加新信息。
    * 历史很重要,因为它允许客户端回溯到原始数据源.
######  infoUrl  {#infourl} 
*    [ ** infoUrl ** ](#infourl) 是一个 REQUIRED 的全局属性,其网页的 URL 含有关于此数据集的更多信息 (通常在源机构的网站) 。 。 。 。 举例来说,
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * 无论是数据集的全局 [源属性](#global-attributes) 或全球范围&lt; addAttributes &gt; 翻译: MUST包括这个属性.
    *    infoUrl 这一点很重要,因为它允许客户从原始来源了解更多数据。
    *    ERDDAP™ 显示链接到 infoUrl 数据访问表 ( * datasetID * .html (中文(简体) ).) ,制作图表网页 ( * datasetID * 图片) ,以及其他网页。
    * 如果 URL 有查询部分 (在""之后吗?) ,它必须已经 [编码百分比](https://en.wikipedia.org/wiki/Percent-encoding) 。 。 。 您需要在限制中编码特殊字符 (除初始“ &” 和主 '=' ,如果有的话) 输入表单%HH,其中HH是字符的两位数十六进制值。 通常情况下,您只需要将一些点缀字符 :% 转换为% 25, &% 26, " 转换为% 22,&lt;输入% 3C, = 输入% 3D, &gt; 输入% 3E, + 输入% 2B, | 进入% 7C, \\[ 输入% 5B, \\] 变为% 5D, 空间变为% 20, 并将 # 127 以上所有字符转换为 UTF-8 格式, 然后% 将 UTF-8 格式的每个字节编码为% HH格式 (请求程序员帮助) 。 。 。 。
例如,( S) stationID "41004" (中文(简体) ).
成为 & stationID % 3E% 2241004% 22
访问时通常需要百分率编码 ERDDAP 通过浏览器以外的软件。 浏览器通常为您处理 % 编码 。
在某些情况下,您需要将除A-Za-z0-9XX之外的所有字符编码%&#33;~&#33;  ' () QQ, 但仍不编码初始“ & ” 或主代码 '=' 。 。 。 。
编程语言有这样做的工具(例如,见 Java 因为 [ java.net.URLEncoder ](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)   
和 Java 脚本encodeURIComponent()[ . ] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) 还有
         [为您编码/解码的百分比网站](https://www.url-encode-decode.com/) 。 。 。 。
    * 从 datasets.xml 是一个 XML 文件, 您也使用 &- encode All ' &,'&lt;在 URL 作为“ &amp;” 的“ ” 和“&gt; ” 中,&lt;', 和' & gt;' 编码% 之后 。
    *    infoUrl 是独一无二的 ERDDAP 。 。 。 这不是任何元数据标准。
###### 机构{#institution} 
*    [ **机构** ](#institution)   (从 [CF 数字](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 和 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是一个 REQUIRED 全球属性,其简短的版本是作为此数据来源的机构名称(通常为缩写,通常为&lt;20个字符). 举例来说,
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * 无论是数据集的全局 [源属性](#global-attributes) 或全球范围&lt; addAttributes &gt; 翻译: MUST包括这个属性.
    *    ERDDAP™ 显示机构的数据集列表。 如果一个机构在这里的名字超过20个字符,那么在数据集列表中只可以看到前20个字符 (但将鼠标光标放在相邻的"?"图标上可以看到整个机构.) 。 。 。 。
    * 如果将机构添加到列表中&lt; categoryAttributes &gt; 翻译: 输入 ERDDAP 因为 [设置. xml](/docs/server-admin/deploy-install#setupxml) 文档中,用户可以通过 ERDDAP '主页上的"按类别搜索数据集".
###### 关键词{#keywords} 
*    [ **关键词** ](#keywords)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是一个被推荐的逗号分隔的单词和短词列表 (比如说, [GCMD (德国地质学家协会) 科学关键词](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access) ) 而非假设对数据集的任何其他了解 (例如,海洋学数据包括海洋) 。 。 。 。 举例来说,
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
从 datasets.xml 是 XML 文档, 字符( A)&lt;,和 &gt; 类似关键词的属性 (例如,GCMD科学关键词中的 &gt; 字符) 必须编码为 &amp;,&lt;,和 & gt; 分别使用。
当一个数据集被装入时 ERDDAP , (中文).
    
    * " Earth Science &gt; " 在任何GCMD关键词的开头加上了缺少该关键词的词.
    * GCMD 关键词转换为标题大小写 (即,第一个字母为资本化) 。 。 。 。
    * 关键字重新排列为排序顺序,并删除任何新行字符。
     
######  keywords\\_vocabulary  {#keywords_vocabulary} 
*    [ ** keywords\\_vocabulary ** ](#keywords_vocabulary)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是一个推荐属性: 如果您正在遵循关键词属性中的单词/单词的指南 (例如,GCMD科学关键词) ,在此列出该准则的名称。 举例来说,
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### 许可证{#license} 
*    [ **许可证** ](#license)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) • 许可证和/或使用限制是严格建议的全球属性。 举例来说,
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * 若 " . \\[ 标准 \\] " 发生在属性值中,它将被标准所取代 ERDDAP™ 许可证来自&lt;标准License &gt; 标记在 ERDDAP 因为
         \\[ 移动猫 \\] /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml文件.
         
######  Metadata\\_Conventions  {#metadata_conventions} 
*    [ ** Metadata\\_Conventions ** ](#metadata_conventions) 是从过时的 [ACDD 1.0 数据交换系统](https://wiki.esipfed.org/ArchivalCopyOfVersion1)   (中识别 Metadata\\_Conventions 作为 " Unidata 数据集发现 v1.0") 元数据标准。 属性值是本数据集使用的以逗号分隔的元数据常规列表.
如果一个数据集使用ACDD 1.0,这个属性是严格推荐的,例如,
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
不过 ERDDAP™ 现在推荐ACDD-1.3。 如果你有的话 [切换您的数据集以使用 ACDD- 1. 3](#switch-to-acdd-13) ,使用 Metadata\\_Conventions 使用 [&lt;公约 &gt;] (公约) 相反。
######  processing\\_level  {#processing_level} 
*    [ ** processing\\_level ** ](#processing_level)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是建议处理的文字说明 (比如说, [NASA的地球观测系统数据与信息系统数据处理级别](https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/data-processing-levels) 例如,三级) 或质量控制级别 (例如,科学质量) 数据。 举例来说,
    ```
    <att name="processing\\_level">3</att>  
    ```
###### 项目{#project} 
*    [ **项目** ](#project)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是一个 OPTIONAL 属性,用来识别数据集是其组成部分的工程。 举例来说,
    ```
    <att name="project">GTSPP</att>  
    ```
如果数据集不是项目的一部分,请不要使用这个属性. 比较 [ creator\\_name ](#creator_name) ,这主要针对项目 (可能参与多个项目的个人或组织) 。 。 。 。
######  publisher\\_name  {#publisher_name} 
*    [ ** publisher\\_name ** ](#publisher_name)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是确定正在发布该数据集的人、组织或项目的建议方式。 举例来说,
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
例如,如果其他人或团体,你就是出版商 [创建](#creator_name) 数据集,你只是通过 ERDDAP 。 。 。 如果"publisher"没有真正应用于数据集,则省略这个属性. 比较 [ creator\\_name ](#creator_name) ,出版商可能并没有对数据进行重大修改或重新处理;出版商只是将数据放在一个新的地点提供.
######  publisher\\_email  {#publisher_email} 
*    [ ** publisher\\_email ** ](#publisher_email)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是一个建议识别电子邮件地址的方法 (正确格式化,例如: John \\_smith@ great.org) 这提供了一种与出版商联系的方法。 举例来说,
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
如果"publisher"没有真正应用于数据集,则省略这个属性.
######  publisher\\_url  {#publisher_url} 
*    [ ** publisher\\_url ** ](#publisher_url)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是建议为发布数据集的组织识别URL的方法,或者是发布者关于此数据集信息的URL (但这更是目的 [ infoUrl ](#infourl) ) 。 。 。 。 举例来说,
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
如果"publisher"没有真正应用于数据集,则省略这个属性.
######  real\\_time  {#real_time} 
*    [ ** real\\_time ** ](#real_time) 是全局字符串属性 (不从任何标准) 表示是否为实时数据集。 举例来说,
    ```
    <att name="real\\_time">true</att>  
    ```
如果这是假的 (默认) , (中文). ERDDAP™ 将缓存对文件类型请求的回复,所有文件必须在之前创建 ERDDAP™ 可以开始向用户发送回复,再利用时间最长可达15分钟 (例如, .nc , . png (中文(简体) ).) 。 。 。 。
如果这是真的 ERDDAP™ 永远不会缓存响应文件,并总是返回新创建的文件。
######  sourceUrl 属性{#sourceurl-attribute} 
*    [ ** sourceUrl ** ](#sourceurl-attribute) 是一个带有数据源 URL 的全球属性。 举例来说,
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (但都放在一条线上) 
    *    ERDDAP™ 通常会自动创建这个全局属性. 两个例外是EDD Table from Hyrax 文件与 EDD Table From Thredds Files. 存档副本.
    * 如果来源是本地文件, 文件由您的组织创建, 请使用
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * 如果来源是本地数据库,且数据由您的组织创建,请使用
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *    sourceUrl 很重要,因为它允许客户端返回到原始数据源。
    *    sourceUrl 是独一无二的 ERDDAP 。 。 。 这不是任何元数据标准。
        
######  standard\\_name\\_vocabulary  {#standard_name_vocabulary} 
*    [ ** standard\\_name\\_vocabulary ** ](#standard_name_vocabulary)   (从 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是一个推荐属性,用于识别变量的受控词汇的名称 [ standard\\_name ](#standard_name) s被带走。 举例来说,
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
第77号版本 [CF 标准名称表](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) 。 。 。 。
         
#####  subsetVariables  {#subsetvariables} 
*    ** subsetVariables **   (仅用于EDD表数据集) 是一个推荐的全局属性,允许您指定一个以逗号分隔的列表 。&lt; dataVariable &gt;] (中文(简体) ). (数据可变)   [ destinationName ](#destinationname) s 以识别数值有限的变量 (说明另一种方式:每个值有许多重复的变量) 。 。 。 。 举例来说,
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
如果该属性存在,数据集将有一个 * datasetID * .subset 网页 (和每个数据集列表中的链接) 它使用户能够快速和容易地选择数据的各种子集。
    * 每次一个数据集被装入, ERDDAP 在磁盘上装入并存储一个表格,其中包含所有不同的 () 子集的组合 变量的值。 ERDDAP™ 可以读到 subsetVariables &#123;\fn华文楷体\fs16\\1cHE0E0E0&#125;并快速处理 (特别是比较阅读大量数据文件或从数据库或其他外部服务获取数据) 。 。 。 。
    * 这样可以 ERDDAP™ 做三个事情:
        1. 它允许 ERDDAP™ 在数据访问表、 Make A Graph 网页和.subset 网页上将可能值列表放在下拉列表中。
        2. 它允许 ERDDAP™ 为该数据集提供一个.子集网页。 该页面很有趣,因为它使得很容易找到这些变量值的有效组合,对于一些数据集和一些变量来说是非常,非常困难的. (简直不可能) 。 。 。 然后,所有用户要求区分 () 子集 可变数据将非常快。
        3. 如果用户请求只提及这些变量的子集, ERDDAP™ 可以快速读取 subsetVariables 表格,并回复请求。 这可以节省一吨时间和精力 ERDDAP 。 。 。 。
    * 顺序 destinationName 排序顺序 * datasetID * .subset网页,所以您通常会先指定最重要的变量,然后指定最不重要的变量. 例如,对于拥有多个台站时间序列数据的数据集,您可以使用,例如,
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
这样,这些值就按点排序。
    * 显然,这是你选择的变量 包含在 subsetVariables 列表,但建议使用如下:
        
通常包括您想要的变量 ERDDAP™ 在数据集的数据访问表格中显示一个下拉选项列表 (.html (中文(简体) ).) 和 Make-A-Graph 图像 (图片) 网页。
        
一般情况下, 包含含有数据集特性信息的变量 (台站、剖面图和/或轨迹,特别是从 [时间序列](#cdm_timeseries_variables) , (中文). [cdm\\_ profile 变数](#cdm_profile_variables) , (中文). [(cdm) 弹射量](#cdm_trajectory_variables) ) 。 。 。 这些变量只有少数不同的值,因此它们与下拉列表配合得很好.
        
永远不要包括任何与单个观测相关的数据变量 (例如,时间、温度、盐度、电流速度) 输入 subsetVariables 列表中选项。 这些变量有太多不同的值,所以下拉列表会很慢的加载,而且很难使用 (或者没有工作) 。 。 。 。
        
    * 如果这些变量的不同组合数大于约1,000,000,你应当考虑限制这些变量。 subsetVariables 指定将不同组合的数量减少到100万个以下;否则 * datasetID * . subset 网页可能会缓慢生成. 在极端情况下,数据集可能无法装入 ERDDAP™ 因为生成不同组合的列表使用过多的内存. 如果是的话,您必须删除一些变量 subsetVariables 列表中选项。
    * 如果任何一个子集变量的单独值数大于约20,000,则您应当考虑不将该变量列入清单。 subsetVariables ;否则需要很长时间才能传送 * datasetID * . 潜水器, * datasetID * 地图,和 * datasetID * .html网页. 另外,在Mac上,由于缺少卷轴栏,很难从500多个项目的下拉列表中作出选择. 一个折中方案是:当用户不可能从下拉列表中选择值时,从列表中删除变量.
    * 您应该测试每个数据集,看看是否 subsetVariables 设置是好的。 如果源数据服务器缓慢且耗时过长 (失败) 或删除 subsetVariables 全球属性。
    * 子集 变量非常有用。 如果您的数据集适合, 请创建 subsetVariables 属性。
    * 从 EDD 表格 SOS 自动添加
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
当数据集创建时。
        * 可能的警告:如果用户使用 * datasetID * .subset网页选择一个具有车厢返回或新线字符的值, * datasetID * . subset 将失败 。 ERDDAP™ 由于一些HTML的细节,无法围绕这个问题工作. 无论如何,从数据中删除马车回归和新线字符几乎总是个好主意. 帮助您解决问题,如果 EDD Table。 subsetVariables 数据表方法 ERDDAP 检测将带来麻烦的数据值, 它会将带有违法值列表的警告邮件到电子邮件中 所有的东西 到设置.xml中指定的电子邮件地址. 这样,你知道什么是需要修复。
        *    **预生成的子集表格 。** 通常,当 ERDDAP™ 装入一个数据集, 它要求区分 () 来自数据源的子集变量数据表,仅通过普通数据请求。 在某些情况下,这些数据无法从数据源获取,或者从数据源获取数据可能对数据源服务器很困难. 如果是的话,您可以提供一张表格,其中包含以下信息: .json 或 .csv 文件名称 *移动猫* /内容/erddap/子集/ * datasetID *  .json   (或 .csv) 。 。 。 。 如果现在 ERDDAP™ 当数据集被装入时,将读取一次,并将它作为子集数据的来源。
            * 如果读取错误, 数据集将无法加载 。
            * 它有完全相同的列名 (例如,同一案件) 作为&lt; subsetVariables &gt;,但各栏按顺序排列。
            * 它可能会有额外的列 (他们将被删除, 和新的冗余行将被删除) 。 。 。 。
            * 缺失值应为缺失值 (不是假数字像 -99) 。 。 。 。
            *    .json 文件可能比较难创建,但处理好Unicode字符。 .json 如果您创建它们, 文件很容易创建 。 ERDDAP 。 。 。 。
            * .csv文件易于使用,但仅适合ISO 8859-1字符. .csv 文件 MUST 第一行有列名,随后各行有数据.
        * 用于大型数据集或何时&lt; subsetVariables &gt; 被错误配置, 数值组合表可以足够大, 从而导致过多的数据或外部记忆错误 。 解决方案是从列表中删除变量&lt; subsetVariables &gt; 数值众多,或根据需要删除变量,直到该表的大小合理为止。 无论出错, ERDDAP™ 使用 subsetVariables 系统不起作用 (例如,网页负载非常缓慢) 当有太多行 (例如,超过100万) 在那个桌子上。
        *    subsetVariables 与指定哪些变量用户可以在制约下使用无关,即用户如何请求数据集子集. ERDDAP™ 总是允许限制引用任何变量。
###### 时间单位{#time-units} 
 [时间和时间戳](#time-units) 列应有 ISO 8601:2004 (英) 格式化日期+时间 Z 字符串 (例如,1985-01-31T15:31:00Z) 。 。 。 。
             
###### 内容提要{#summary} 
*    [ **内容提要** ](#summary)   (从 [CF 数字](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 和 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是一个 REQUIRED 的全局属性, 对数据集有长长的描述( 通常为&lt;500个字符). 举例来说,
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * 无论是数据集的全局 [源属性](#global-attributes) 或全球范围&lt; addAttributes &gt; 翻译: MUST包括这个属性.
    * 摘要非常重要,因为它允许客户端读取一个比标题信息更多的数据集描述,从而快速理解数据集是什么.
    * 建议:请将摘要写成,这样就可以向在街上遇到的某个随机人士或同事描述数据集。 记住要包括 [5W的和1H的车](https://en.wikipedia.org/wiki/Five_Ws) :谁创建了数据集? 收集了哪些信息? 何时收集数据? 在哪里收集来的? 为什么是收集的? 是怎样收集的?
    *    ERDDAP™ 在数据集的数据访问表单上显示摘要 ( * datasetID * .html (中文(简体) ).) ,制作图表网页 ( * datasetID * 图片) ,以及其他网页。 ERDDAP™ 在创建FGDC和ISO 19115文档时使用摘要。
######  testOutOfDate  {#testoutofdate} 
*    [ ** testOutOfDate ** ](#testoutofdate)   (可选 ERDDAP - 特定全球元数据属性,不来自任何标准) 以简单的方式,指定何时一个近实时数据集的数据被视为过时,指定为 now-  *n 单位* 例如, now- 通常出现在时间值后24-48小时的数据为2天. 用于预测数据,现在使用 **+ 键**  *n 单位* 例如,预测数据现在+6天,即未来最多8天。 (见 [ now-  *n 单位* 语法描述](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) 。 。 。 。) 如果数据集的最大时间值比指定时间更近,则数据集被视为最新数据. 如果最大时间值大于指定时间,则数据集视为最新数据. 对于过时的数据集,推测数据源存在问题,所以. ERDDAP™ 无法从最近的时间点获取数据。
    
那个 testOutOfDate 值在 [ allDatasets 数据集](#eddtablefromalldatasets) 在你身边 ERDDAP 。 。 。 它还用于计算OutDate指数,这是该指数中的另一列 allDatasets 数据集。
如果索引是&lt;1,数据集被认为是最新的.
如果索引是&lt;=1,数据集视为过时.
如果索引是&lt;=2,数据集被认为非常过时.
    
那个 testOutOfDate 值也用于 ERDDAP™ 生成https://*yourDomain*/erddap/outOfDateDatasets.html网页 ( [实例](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) 显示有&lt; testOutOfDate &gt; tags,其数据集的排名按其过时程度排序. 如果您更改文件类型 (从.html到.csv, .jsonlCSV , (中文). .nc , (中文). .tsv ,, , , , , , , , , .) ,您可以以不同的文件格式获取这些信息。
    
在可能的情况下, [生成 DatasetsXml](#generatedatasetsxml) 添加a testOutOfDate 属性 addAttributes 数据组。 这个值是基于GenerateDatasetsXml可用信息的建议. 如果价值不合适,就改变它.
    
这里的"过时"与[&lt;重新装入 –每分钟一次&gt;] (每分钟都装满) ,涉及如何更新 ERDDAP 对数据集的了解是。 那个&lt; testOutOfDate &gt; 系统假定 ERDDAP '对数据集的了解是最新的. 问 题&lt; testOutOfDate &gt; 处理方式是:数据来源似乎有问题,导致最近的数据无法被 ERDDAP ? 。 。 。
    
###### 标题{#title} 
*    [ **标题** ](#title)   (从 [CF 数字](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 和 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是带有数据集简短描述的 REQUIRED 全局属性( 通常是)&lt;=95个字符). 举例来说,
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * 无论是数据集的全局 [源属性](#global-attributes) 或全球范围&lt; addAttributes &gt; 翻译: MUST包括这个属性.
    * 标题很重要,因为每个数据集列表由 ERDDAP   (搜索结果除外) 按字母顺序,按标题列出数据集。 因此,如果想要指定数据集的顺序,或将一些数据集组合在一起,就必须铭记这一点创建标题。 许多数据集列表 (例如,针对一个类别搜索) ,以不同的顺序显示完整列表的子集。 因此,每个数据集的标题应该独立存在.
    * 如果标题包含“DEPRECATED”一词 (所有大写字母) ,然后数据集在搜索中会获得较低的排名.
             
##### &lt; axisVariable & gt; (G) 请检查url=值 (帮助) 。{#axisvariable} 
* [ ** &lt; axisVariable &gt; 翻译: ** [ . ] (轴可变) 用于描述一个维度 (也叫"轴") 。 。 。 。
对于 EDDGrid 数据集,一个或多个 axisVariable 标记为 REQUIRED, 以及所有 [ dataVariable 编号](#datavariable) 总是共享/使用所有轴变量。 ( [为什么?](#why-just-two-basic-data-structures)   [如果他们不呢?](#dimensions) )   
数据变量的每个维度都有一个轴变量。
轴变量 MUSST 以数据变量使用它们的顺序指定。
(EDDT数据集不能使用&lt; axisVariable &gt; 标签。 )
一个充实的例子是:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt; axisVariable &gt; 支持以下子项 :
###### &lt; sourceName \\&gt;{#sourcename} 
* [&lt; sourceName \\&gt; (# 来源名称) -- 该变量的数据源名称. 这个名字 ERDDAP™ 将在请求数据源数据时使用。 这个名字 ERDDAP™ 将在数据源返回数据时查找。 这案子很敏感 这是必需的。
###### &lt; destinationName \\&gt;{#destinationname} 
* [&lt; destinationName \\&gt; (# 目的地名称 #) 是用于显示和使用的变量的名称 ERDDAP™ 用户。
    * 这是备选的。 缺席时, sourceName 已使用。
    * 这是有用的,因为它允许您更改密码或奇数 sourceName 。 。 。 。
    *    destinationName 对案件敏感。
    *    destinationName s 以字母开头 (A -Z, a -z, a -z (英语).) 字符数 。 (A -Z, a -z, 0 -9, 和 \\_) 。 。 。 。 (之前允许" -" ERDDAP™ 第1.10版.) 此限制允许轴变量名称在 ERDDAP™ ,在响应文件中,以及在将使用这些文件的所有软件中,包括编程语言 (喜欢 Python , (中文). Matlab ,以及 Java 脚本) 在变量名称有类似限制的地方。
    * 内 EDDGrid 数据集,数据 [经度、纬度、高度、深度和时间](#destinationname) 轴变量是特殊的。
         
######  axisVariable  &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [&lt; addAttributes &gt;] (中文(简体) ). (# 可变添加属性) 定义一组属性 ( *名称* = *价值* ) 它们被添加到变量的源属性中,使变量的合并属性成为变量.
如果变量 [源属性](#variable-addattributes) 或&lt; addAttributes &gt; 包含 [ scale\\_factor 和(或) add\\_offset ](#scale_factor) 属性,它们的值将用来在向客户端分发之前从源数据解析
     (结果 数值=来源 数值 scale\\_factor + 键 add\\_offset ) 。 。 。 无包装的变量将属于同一数据类型 (例如,浮点数) 作为 scale\\_factor 和 add\\_offset 数值。
         
##### &lt; dataVariable & gt; (G) 请检查url=值 (帮助) 。{#datavariable} 
* [ ** &lt; dataVariable &gt; 翻译: ** [ . ] (数据可变) 是必需的 (用于几乎所有数据集) 标记&lt;用于描述数据变量的数据集&gt;标签。 此标签必须有1个或更多实例 。 一个充实的例子是:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt; dataVariable &gt; 支持以下子项 :
###### &lt; sourceName & gt; (G) 请检查url=值 (帮助) 。{#sourcename-1} 
* [&lt; sourceName &gt;] (中文(简体) ). (# 来源名称) -- 该变量的数据源名称. 这个名字 ERDDAP™ 将在请求数据源数据时使用。 这个名字 ERDDAP™ 将在数据源返回数据时查找。 这案子很敏感 这是必需的。
###### 组{#groups} 
CF增加了对CF v1.8. 组的支持. 从~2020年开始, NetCDF 工具支持将变量组合成组 .nc 文档。 在实践中,这只是表示变量有一个长的名称,可以识别组 (编号) 和变量名称,例如,组1a/组2c/varName。 ERDDAP™ 通过转换变量中的“/”来支持组&lt; sourceName &gt; into "QQ" 在变量中&lt; destinationName &gt;, 例如, group1a\\_a\\_group2c\\_varName. (当你看到这一点的时候,你应该意识到,群体只是一种语法公约。) 当变量在 ERDDAP™ ,一个组中的所有变量将一起出现,模仿基础组. \\[ 若为 ERDDAP™ ,特别是生成数据 Xml,在有组的源文件上表现不佳,请通过电子邮件将一个样本文件发送给克里斯. 约翰在Noaa.gov。 \\] 

EDD Table FromFiles 数据集可以使用一些特殊编码的,伪的 sourceName s)定义新的数据变量,例如,促进全球属性成为数据变量. 见 [本文档](#pseudo-sourcenames) 。 。 。 。
######  HDF 结构{#hdf-structures} 
开始 ERDDAP™ v2.12, (中文(简体) ). EDDGrid 从NcFiles和 EDDGrid 从NcFiles调用 未包装可读取“ 结构” 中的数据 。 .nc 经常预算: .hdf 4个档案。 要识别一个来自结构的变量,&lt; sourceName &gt; 翻译: 必须使用格式 : *完整结构Name*  |  *成员Name* ,例如组1/我的Struct | 我的成员。

###### 固定值来源名称{#fixed-value-sourcenames} 
在 EDDTable 数据集中,如果想要创建变量 (具有单一固定价值) 不在源数据集中,使用:
```
    <sourceName>=*fixedValue*</sourceName>  
```
初始等号显示 ERDDAP™ 一个固定的 价值观将随之而来。

* 对于数值变量,固定值必须是单个有限值或NaN (大小写不敏感,例如QQNAN) 。 。 。 。
* 对于字符串变量,固定值必须是单一的, [JSON 风格字符串](https://www.json.org/json-en.html)   (用\\ 字符逃脱的特殊字符) ,例如"我的""特别的""弦".
* 对于时间戳变量,请在 "seconds since 1970-01-01T00:00:00Z" 和使用情况
单位=自1970-01-01T00:00Z.
    
其它标签&lt; dataVariable &gt; 工作似乎是一个常规变量。
例如,创建一个名为高度的变量,其固定值为 0.0 (浮动) ,使用:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

对于不寻常的情况,您甚至可以指定 actual\\_range 添加属性, 将覆盖目的地 Min 和目的地 Max 的预期值 (将等于固定的 数值) 。 。 。 。
 
###### 脚本源名/已启用变量{#script-sourcenamesderived-variables} 
开始 ERDDAP™ v2.10,在一个 [来自文件的 EDD 表格](#eddtablefromfiles) , (中文). [数据库中的 EDD 表格](#eddtablefromdatabase) ,或 [来自文件名的 EDD 表格](#eddtablefromfilenames) 数据集,数据&lt; sourceName &gt; 能够
一个表达式 (计算为单一值的方程) ,使用格式
```
    <sourceName>=*expression*</sourceName>  
```
或脚本 (返回单一值的一系列语句) ,使用格式
```
    <sourceName>=*script*</sourceName>  
```
 ERDDAP™ 依赖 [Apache 项目](https://www.apache.org/)   [ Java 表达式语言 (牙买加) ](https://commons.apache.org/proper/commons-jexl/)   (许可证 : [阿帕奇语Name](https://www.apache.org/licenses/LICENSE-2.0) ) 来评价表达式并运行脚本。
给定新变量的计算是在结果的一行内完成的,对所有行都反复进行.
表达式和脚本使用 a Java - 还有 Java 类似脚本的语法,可以使用任意一种
 [JEXL 中包含的运算符和方法](https://commons.apache.org/proper/commons-jexl/reference/syntax.html) 。 。 。 。
脚本也可以使用方法 (函数) 从这些班级:
*    [日历2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2) ,这是在com.cohort.util.Calendar2中对一些静态、时间和日历相关方法的包装。 ( [许可证](/acknowledgements#cohort-software) ) 。 。 。 。 举例来说,
日历2.parse ToEpochseconds ( *来源时间, 日期 时间格式* ) 将解析源 通过日期 Time Format 字符串返回 a "seconds since 1970-01-01T00:00:00Z"   (时代第二) 双值。
*    [数学](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math) ,这是几乎所有静态数学相关方法的包装 [java.lang (法语). 数学](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html) 。 。 。 例如,Math.atan2 ( *y, x (韩语)* ) 在长方形坐标内 (y, x (韩语)) 返回极坐标 (双倍数组 \\[ r, 西塔语 \\] ) 。 。 。 。
*    [数学2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2) 在com.cohort.util中,它是几乎所有静态数学相关方法的包装。 数学2 ( [许可证](/acknowledgements#cohort-software) ) 。 。 。 。 举例来说,
数学2轮到 ( *d, nPlaces (正数)* ) 将四舍五入到小数点右侧指定的数字。
* 字符串,使您能够访问所有静态,字符串相关的方法 [java.lang (法语). 字符串](https://docs.oracle.com/javase/8/docs/api/java/lang/String) 。 。 。 。 字符串对象在 ERDDAP™ 表达式和脚本可以使用其任何关联的 Java 方法,如java.lang所述。 字符串文档 。 例如, String. value Of (D. 国家) 将双值 d 转换为字符串 (尽管您也可以使用“'+d”) 。 。 。 。
*    [字符串2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2) ,这是在com.cohort.util.String2中大多数静态、字符串和阵列相关方法的包装器 ( [许可证](/acknowledgements#cohort-software) ) 。 。 。 。 例如,字符串2 .z eroPad 软件 ( *数字, n 数字* ) 数字字符串左侧将添加 0's,使数字总数为 nDigits (例如,字符串2 .z eroPad 软件 ("6",2号) 将返回"06") 。 。 。 。
*    [线条](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row) ,它具有非静态方法来获取源数据表当前行中各列的数据。 例如, 行. 栏 ("年份") 将“年”栏中的值读作字符串,而将行.栏 输入 ("年份") 将“年份”栏中的数值读作整数。

出于安全考虑,表达式和脚本不能使用除那6门以外的其他类. ERDDAP™ 通过创建默认的黑名单执行此限制 (黑名单中的所有分类) 然后是白名单 (专门允许上述6类) 。 。 。 如果您需要其他的方法和/或其他课程来完成您的工作,请通过电子邮件向克里斯提出申请. 约翰在Noaa.gov。
    
###### 效率
对于 EDD Table From Files 数据集来说,只有一个非常,非常微小的 (可能不明显) 从这些变量获取数据的要求放缓。 对于EDDTable FromDatabase,包含对这些变量的制约的请求(例如(和经度0360&gt;30和经度0360)有巨大的速度惩罚.&lt;40),因为限制无法传递到数据库,所以数据库必须将更多的数据还给. ERDDAP™   (这很费时) 这样 ERDDAP™ 可创建新的变量并应用制约。 为了避免最坏的情况 (在数据库没有限制的情况下) , (中文). ERDDAP™ 扔出一个错误消息,使数据库不必返回表格的全部内容。 (如果想要绕过此选项, 在非标注列中添加一个约束, 它将永远是真实的, 例如( T)&lt;3000-01-01. (简体中文). 因此,有了EDDTable FromDatabase,在数据库中创建一个衍生列可能总更好,而不是使用 sourceName = 书写 ERDDAP 。 。 。 。

###### 如何表达的概览 (脚本) 已使用 :
应用户对表格数据的要求, ERDDAP™ 从一系列源文件获得数据。 每个源文件将生成原始表格 (直接从源头) 数据。 ERDDAP™ 然后逐行通过原始数据的表格,对每一行的表达式或脚本进行一次评价,以便创建一个新的列,将该表达式或脚本作为一个 sourceName 。 。 。 。
    
###### 生成 DatasetsXml
注意生成 Datasets Xml 当需要创建带有&lt; sourceName &gt;= *表达式* &lt;页:1 sourceName &gt; &gt;. 您必须在 datasets.xml 手边

###### 表达式示例 :
以下是使用表达式创建新一列数据的数据变量的完整实例. 我们期望这些例子 (及其变种) 将涵盖所有表达式使用量的95%左右 sourceName 编号

###### 合并单独的“日期”和 "time" 进入统一时间栏的列:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
那个 sourceName 表达式创建新 "time" 通过将字符串值从“ 日期” 缩合而成 ( yyyy-MM-dd ) 和 "time"   (HH:mm:s:s (韩语)) 在源文件的每行中设置列,并通过将该字符串转换成一个 "seconds since 1970-01-01"   (时代第二) 双值。

或者,您必须自定义时间格式字符串,以便处理每个数据集的源日期和时间列中的特定格式,参见
 [时间单位文件](#string-time-units) 。 。 。 。

从技术上讲,你不用用 日历2.parse ToEpochseconds () 将合并日期+时间转换为时代秒。 你可以把日期+时间字符串传递给 ERDDAP™ 并指定格式(例如,
 yyyy-MM-dd 'T'HH:mm:s'Z')通过单位属性. 但是,转换为划时代的Seconds有很大的好处——特别是,EDDTable FromFiles可以方便地跟踪每个文件中的时间值范围,在回应有时间限制的请求时如此迅速地决定是否在某个文件中查看.

一个相关的问题是需要从一个来源创建一个统一的日期+时间栏,其中单独的年份,月份,日期,小时,分钟,第二. 解决方案非常相似,但你往往需要将许多字段零铺设,以便,例如,月份 (第1至第12条) 和日期 (1 - 31岁) 总是有两个数字。 以年份、月份、日期为例:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
一个相关的问题是,需要通过将来源表格中分别的度,分,秒列中的数据合并,形成一个统一的纬度或经度列,每列存储为整数. 举例来说,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### 将经度值为 0 - 360 度的“lon” 栏转换为数值为 -180 - 180 度的“lon”栏
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
那个 sourceName 表达式通过将源文件每行“lon”栏的双值转换成新的“经度”栏 (估计值为 0 - 360) ,并将它转换为 -180 到 180 倍值。

如果想要将 -180 - 180 ° 的源经度值转换为 0 - 360 °,请使用
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
命名两个经度变量:
如果数据集将有两个经度变量,我们建议使用 destinationName =-180 - 180°变量的经度和 destinationName =经纬度0360 (和长名“ 纬度 0- 360° ”) 0-360°变量。 这一点很重要,因为用户有时会使用Advanced Search来搜索特定经度范围内的数据. 如果所有数据集的经纬度始终为-180 - 180°值,则这一搜索工作会更好。 此外,该数据集的地理空间++lon+\\_min,地理空间++lon+max,最西端的东端和最东端的东端全球属性也将以一致的方式设定. (经度值 - 180 至 180 度) · ;
    
###### 转换一个名为“tempF”的列,其温度值为%%% F 变成一个名为“tempC”的列,温度为%%% 中 国:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
那个 sourceName 表达式通过转换浮动度 &#123;&#125; 来创建一个新的“ tempC” 列 F 值来自源文件每行的“ tempF” 栏, 到一个浮度QQQ C 值(C 值).

请注意,您的数据集可以同时拥有初始的临时 F 变量和新临时 C 变量通过另一个变量
```
    <sourceName>tempF</sourceName>
```
###### 将风速和“方向”栏转换为带有u、v组件的两个栏
* 要制作 u 变量,请使用
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* 要制作 v 变量, 请使用
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
或者,给你,v:
* 要制作速度变量,请使用
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* 要制作方向变量,请使用
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### 脚本示例:
以下是使用一个脚本,而不仅仅是一个表达,作为 sourceName 。 。 。 我们期望剧本相对于表达方式,不会经常需要. 在这种情况下,目标是返回一个非NaN缺失值 (-99号) 对于特定范围以外的温度值。 注意剧本是"="之后的部分.
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### 硬旗
如果您更改了定义的表达式或脚本 sourceName ,必须设置 [硬旗](/docs/server-admin/additional-information#hard-flag) 用于数据集的 ERDDAP™ 删除数据集的所有缓存信息并重新读取每个数据文件 (使用新表达式或脚本) 下次它装入数据集时。 或者,你可以使用 [达斯德](#dasdds) 这相当于设置硬旗。

###### 百分比编码
这一点很少涉及: 因为表达式和脚本都用 datasets.xml ,这是一个 XML 文档,您必须% 编码任意&lt;, 和表达式和脚本中的字符( C)&lt;, & gt; 和 &amp; 。

###### 常见问题
常见的问题是,您会创建一个变量 : sourceName = *表达式* 但由此产生的一列数据只是缺少数值。 或者,新列的某些行有缺失值,你认为它们不应该. 根本问题是 表达和表达有问题 ERDDAP 正在将错误转换为缺失值。 为了解决问题

* 看看表达方式 看看问题可能是什么
* 进去看看 [日志.txt](/docs/server-admin/additional-information#log) ,它将显示每个新列创建过程中生成的第一个错误消息。

常见的原因是:

* 你用错案子了 表达式和脚本对大小写敏感.
* 你省略了班级的名字 例如,您必须使用 Math.abs () 不仅仅是腹肌 () 。 。 。 。
* 你没有做类型转换。 例如,如果一个参数值的数据类型是字符串,且你有双重值,则需要通过"'+d"将一个双数转换成字符串.
* 表达式中的列名与文件中的列名不完全匹配 (或者在某些文件中名称可能不同) 。 。 。 。
* 表达式中存在语法错误 (例如,缺失或额外 ") 页:1

如果你被困或需要帮助,
请包括细节,看看我们 [关于获得额外支助的章节](/docs/intro#support) 。 。 。 。
        
###### &lt; destinationName & gt; (G) 请检查url=值 (帮助) 。{#destinationname-1} 
* [&lt; destinationName &gt;] (中文(简体) ). (# 目的地名称 #) -- 将显示和使用的变量的名称 ERDDAP™ 用户。
    * 这是备选的。 缺席时, [ sourceName ](#sourcename) 已使用。
    * 这是有用的,因为它允许您更改密码或奇数 sourceName 。 。 。 。
    *    destinationName 对案件敏感。
    *    destinationName s 以字母开头 (A -Z, a -z, a -z (英语).) 字符数 。 (A -Z, a -z, 0 -9, 和 \\_) 。 。 。 。 (之前允许" -" ERDDAP™ 第1.10版.) 此限制允许数据变量名称在 ERDDAP™ ,在响应文件中,以及在将使用这些文件的所有软件中,包括编程语言 (喜欢 Python , (中文). Matlab ,以及 Java 脚本) 在变量名称有类似限制的地方。
    * 在EDDTable数据集中, [经度、纬度、高度 (或深度) 时间](#destinationname) 数据变量是特殊的。
             
###### &lt;数据 类型( G);{#datatype} 
* [&lt;数据类型&gt;] (# 数据类型) -- 指定来源的数据类型。 (在某些情况下,例如,在读取ASCII文件中的数据时,它具体规定了来自来源的数据应如何存储.) 
    * 这是一些数据集类型需要的,其他类型需要的。 需要此功能的数据集类型 dataVariable 标准是: EDDGrid From Xxx Files, EDD Table From Xxx Files, EDD Table From M WFS ,来自NOS的EDD表,来自EDD表 SOS 。 。 。 其他数据集类型忽略了这个标记,因为他们从源头得到信息.
         
    * 有效值为任何标准 [ ERDDAP™ 数据类型](#data-types) 加布尔 (见下文) 。 。 。 数据类型名称对大小写敏感。
         
###### 布尔数据{#boolean-data} 
*    ["布尔"](#boolean-data) 是一个特殊的案例。
    * 内部, ERDDAP™ 不支持布尔类型,因为布尔不能存储缺失值,而且大多数文件类型不支持布尔类型. 还有, DAP 不支持布尔变量,所以没有标准的方法查询布尔变量。
    * 为数据指定“布尔” 类型 datasets.xml 会导致布尔值被存储并以字节表示 : 0=虚假,1=真实,127= missing\\_value 。 。 。 。
    * 用户可以通过使用数值来指定限制 (例如,“isAlive=1”) 。 。 。 。
    *    ERDDAP™ 管理员有时需要使用“ boolean” 数据 类型 datasets.xml 告诉 ERDDAP™ 如何与数据源互动 (例如,从关系数据库读取布尔值并将其转换为0、1或127) 。 。 。 。
         
* 如果您想从源文件中的数据类型中更改一个数据变量 (例如,简称) 输入其它数据 在数据集中键入 (例如, 输入) 别用&lt;dataType &gt; 来指定您想要什么。 (它适用于某些类型的数据集,但不适用于其他数据集.) 相反:
    * 使用&lt;dataType &gt; 来指定文件中的内容 (例如,简称) 。 。 。 。
    * 在那个&lt; addAttributes &gt; 对于变量,添加一个 [ scale\\_factor ](#scale_factor) 带有新数据的属性 类型 (例如, 输入) 和1的数值,例如,
```
            <att name="scale\\_factor" type="int">1</att>  
```
######  dataVariable  &lt;addAttributes&gt; {#datavariable-addattributes} 
* [&lt; addAttributes &gt;] (中文(简体) ). (# 可变添加属性) -- 定义一组属性 ( *名称* = *价值* ) 它们被添加到变量的源属性中,使变量的合并属性成为变量. 这是备选的。
如果变量 [源属性](#variable-addattributes) 或&lt; addAttributes &gt; 包含 [ scale\\_factor 和(或) add\\_offset ](#scale_factor) 属性,它们的值将用来在向客户端分发之前从源数据解析。 无包装的变量将属于同一数据类型 (例如,浮点数) 作为 scale\\_factor 和 add\\_offset 数值。
        
###### 变量&lt;addAttributes&gt; {#variable-addattributes} 
* [ ** 可变属性/ 可变属性&lt; addAttributes &gt; 翻译: ** [ . ] (# 可变添加属性) - —— - 说&lt; addAttributes &gt; 是一个可选标记&lt; axisVariable &gt; 或&lt; dataVariable &gt; 用于改变变量属性的标签。
    
    *    ** 使用变量&lt; addAttributes &gt; 更改变量的属性。 **  ERDDAP™ 合并数据集源的变量属性( Q)** 源属性 **)和变量的**  addAttributes  **您定义在 datasets.xml   (具有优先权的) 使变数"** 组合属性 ** ",这是什么 ERDDAP™ 用户参见。 这样,你可以使用 addAttributes 以重新定义源属性的值,添加新的属性,或删除属性。
    * 见[ ** &lt; addAttributes &gt; 翻译: **资料] (# 属性) 适用于全球和变量** &lt; addAttributes &gt; 翻译: ** 。 。 。 。
    *    ERDDAP™ 以各种方式寻找和使用许多这些属性。 例如,需要颜色Bar值来通过 WMS ,使地图能够用一致的颜色Bars制作。
    *    [经度,纬度,高度 (或深度) 时间变量](#destinationname) 自动获得许多合适的元数据 (比如说, [单位](#units) ) 。 。 。 。
    * 样本&lt; addAttributes &gt; 对于数据变量是:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

空数 OfObservations 属性导致源数 OfObservations 属性 (如果有的话) 从最终、合并的属性列表中删除。
    * 提供信息有助于 ERDDAP™ 做一个更好的工作,帮助用户理解数据集.
良好的元数据可以使用数据集。
元数据不足使得数据集无用.
请花点时间来完成元数据属性的好工作.
    
###### 关于特殊于 ERDDAP 数字 :

######  actual\\_range  {#actual_range} 
*    [ ** actual\\_range ** ](#actual_range) 是一个推荐变量属性。 举例来说,

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* 这个属性来自 [疾控中心 COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) 和 [CF 1.7 + 氟化烃](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 元数据标准。
* 如果存在,则它必须是由与变量的目的数据类型相同的两个数据类型的值组成的阵列,指定实际数据 (非理论或允许) 该变量数据的最小和最大值。
* 如果数据被装入 [ scale\\_factor 和(或) add\\_offset ](#scale_factor) , (中文). actual\\_range 必须是已解包的值,并与已解包的值具有相同的数据类型。
* 某些数据来源 (例如,所有 EDD Table 来自... 文件数据集) , (中文). ERDDAP™ 决定 actual\\_range 设置 actual\\_range 属性。 与其他数据来源 (例如,关系数据库,卡桑德拉, DAP 佩尔, Hyrax ) ,可能是麻烦或负担 来源计算范围,所以 ERDDAP™ 不请求它。 这样的话,你最好能准备好 actual\\_range   (特别是经度、纬度、高度、深度和时间变量) 通过添加 actual\\_range 每个变量的属性 [&lt; addAttributes &gt;] (中文(简体) ). (# 属性) 用于此数据集 datasets.xml 例如,

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* 对于数字 [时间和时间戳变量](#time-units) ,指定的数值应为相关来源 (非目标) 数值。 例如,如果源时间值被存储为"1985-01-01以来的天数",那么 actual\\_range 应在"1985-01-01起的天数"中注明. 如果您想要将NOW称为定期更新的近实时数据的第二个值,请使用NaN。 例如,要指定1985-01-17的数据范围直到NOW,请使用

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* 若为 actual\\_range 已知( 由 ERDDAP™ 计算,或者通过您添加&lt; addAttributes &gt;), (中文(简体) ). ERDDAP™ 将在数据访问表上向用户显示 ( * datasetID * .html (中文(简体) ).) 并制作图表网页 ( * datasetID * 图片) 用于该数据集,并在生成FGDC和ISO 19115元数据时使用. 另外,最后7天的时间 actual\\_range 用作默认时间子集。
* 若为 actual\\_range ,用户可以使用 [分钟 () 最大值 () 函数](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) 在请求中,这往往非常有用。
* 对于所有 EDD表... 数据集,如果 actual\\_range 已经知道 (由您指定或指定 ERDDAP™ 计算) , (中文). ERDDAP™ 将可迅速拒绝任何超出此范围的数据请求。 例如,如果数据集的最低时间值对应于1985-01-17,那么一个从1985-01-01到1985-01-16年的所有数据请求将立即以错误消息"你的查询没有产生匹配结果"被拒绝. 这样就可以 actual\\_range 一个非常重要的元数据,因为它可以保存 ERDDAP™ 大量的努力,并节省了用户很多时间. 这凸显出 actual\\_range 数值不得小于数据的实际范围;否则, ERDDAP™ 可能说错了 "没有匹配数据",而事实上有相关数据.
* 当用户选择一个数据子集并请求包含元数据的文件类型时 (比如说, .nc ) , (中文). ERDDAP™ 修改 actual\\_range 在响应文件中反映子集的范围。
* 另见 [ data\\_min 和 data\\_max ](#data_min-and-data_max) ,这是指定 actual\\_range 。 。 。 但是,这些现在被贬值了。 actual\\_range 由CF 1.7+定义.
         
###### 颜色条属性{#color-bar-attributes} 
指定颜色栏建议默认属性的多个 OPTIONAL 变量属性 (用于在图像上将数据值转换成颜色) 用于此变量。
* 如果存在,则通过网格dap和 tabledap 当您请求使用颜色栏的图像时。
* 例如,当经纬度网格化的数据在地图上被绘制成覆盖度时,颜色栏指定数据值如何转换成颜色.
* 拥有这些值 ERDDAP™ 创建图像,在不同的请求中使用一致的颜色栏,即使时间或其他维值不同。
* 创建这些属性名称用于 ERDDAP 。 。 。 它们不是元数据标准。
* 与颜色栏相关的属性为:
    *    ** colorBarMinimum ** 指定颜色栏上的最小值。 举例来说,

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * 如果数据被装入 [ scale\\_factor 和(或) add\\_offset ](#scale_factor) ,指定 colorBarMinimum 作为无包装值。
    * 数据值低于 colorBarMinimum 以与 colorBarMinimum 数值。
    * 属性应该是: [类型=“双”](#attributetype) ,无论数据变量的类型。
    * 值通常是一个很好的圆数.
    * 最佳做法: 我们建议的数值略高于最低数据值。
    * 没有默认值 。
*    ** colorBarMaximum ** 指定颜色栏上的最大值。 举例来说,

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * 如果数据被装入 [ scale\\_factor 和(或) add\\_offset ](#scale_factor) ,指定 colorBarMinimum 作为无包装值。
    * 数据值高于 colorBarMaximum 以与 colorBarMaximum 数值。
    * 属性应该是: [类型=“双”](#attributetype) ,无论数据变量的类型。
    * 值通常是一个很好的圆数.
    * 最佳做法: 我们建议的数值略低于最大数据值。
    * 没有默认值 。
*    **颜色 巴莱特语Name** 指定颜色栏的调色板。 举例来说,
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * 全体 ERDDAP™ 支持这些标准调色板的设施: 黑蓝白 黑红白 黑白 蓝白红 光彩虹 海洋 海洋深度 彩虹 红白蓝色 反光虹 地形学 地形深度 \\[ 增加于v1.74 \\] 白黑 白蓝黑 白红黑
    * 如果您已经安装 [其他调色板](/docs/server-admin/additional-information#palettes) ,你可以指其中之一。
    * 如果此属性不存在, 默认为 蓝色 白色 , 如果 & 1\\%%% 1 colorBarMinimum = colorBarMaximum ;否则默认为彩虹.
*    **颜色框** 指定颜色栏的缩放。 举例来说,
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * 有效值为线性和日志。
    * 如果值是日志, colorBarMinimum 必须是大于 0。
    * 如果该属性不存在,则默认为线性.
*    **颜色 持续** 指定颜色Bar是否有连续的颜色调色板,或者颜色Bar是否有几个离散的颜色。 举例来说,
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * 有效值是字符串的真假.
    * 如果这个属性不存在,默认是真实的.
*    **颜色BarN 区域** 指定颜色栏上的默认区域数。 举例来说,
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * 有效值为正整数.
    * 如果此属性不存在, 默认值为\\ 1 , 它显示 ERDDAP™ 来选择基于颜色Bar范围的段落数。
######  WMS  {#wms} 
可通过下列途径访问变量的主要要求: ERDDAP 因为 WMS 服务器为:
* 数据集必须是 EDDGrid ...数据集。
* 数据变量 MUST 是一个网格化的变量.
* 数据变量MUST有经度和纬轴变量. (其他轴变量为OPTIONAL.) 
* 一定的经度值在 -180 至 180 之间。
* 那个 colorBarMinimum 和 colorBarMaximum 属性必须指定。 (其他色彩条属性是OPTIONAL.) 

######  data\\_min 和 data\\_max  {#data_min-and-data_max} 
*    [ ** data\\_min ** 和 ** data\\_max ** ](#data_min-and-data_max) - —— - 说 这些是世界海洋环流实验中定义的可变属性 (华西) 元数据描述。 举例来说,

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * 我们建议您使用 [ actual\\_range ](#actual_range) ,而不是 data\\_min 和 data\\_max ,因为 actual\\_range 现在由CF规格定义.
    * 如果存在,它们必须与变量的目的数据类型相同,并具体说明实际数据类型。 (非理论或允许) 该变量数据的最小和最大值。
    * 如果数据被装入 [ scale\\_factor 和(或) add\\_offset ](#scale_factor) , (中文). data\\_min 和 data\\_max 必须使用已解开的数据类型进行解开。
         
###### 变量 drawLandMask  {#variable-drawlandmask} 
*    [ ** drawLandMask ** ](#variable-drawlandmask) - —— - 说 这是一个 OPTIONAL 变量属性,用于 ERDDAP™   (没有元数据标准) 指定数据集 Make A Graph 窗体上“ Draw Land Mask” 选项的默认值 ( * datasetID * 图片) 并用于请求数据映射的URL中的 &. 举例来说,
    ```
        <att name="drawLandMask">under</att>  
    ```
见 [ drawLandMask 概览](#drawlandmask) 。 。 。 。
###### 编码{#encoding} 
*    [ **QQ 编码** ](#encoding) 
    * 此属性只能用于字符串变量 。
    * 强烈建议这一属性。
    * 这个属性来自 [ NetCDF 用户指南 (努格语) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html) 。 。 。 。
    * 内部 ERDDAP™ ,字符串是使用 [Unicode UCS-2 字符集](https://en.wikipedia.org/wiki/UTF-16) 。 。 。 。
    * 许多文件类型只支持字符串中的 1字节字符,因此需要此属性来识别关联字符
         [字符集 (AKA 代码页) ](https://en.wikipedia.org/wiki/Code_page) 它定义了如何将256个可能值映射到从UCS-2字符集和/或编码系统抽取的一组256个字符,例如, [UTF-8 导弹](https://en.wikipedia.org/wiki/UTF-8)   (每个字符需要1至4字节) 。 。 。 。
    * QQ编码值对大小写不敏感 。
    * 理论上, ERDDAP™ 能够支持 QQ 编码标识符从 [此 IANA 列表](https://www.iana.org/assignments/character-sets/character-sets.xhtml) 但实际上 ERDDAP™ 目前仅支持
        * ISO-8859-1 (英语). (注意它有破折叠,而不是强调) ,其优点是它与Unicode的前256个字符相同,以及
        * UTF-8 (英语).
    * 在读取源文件时,默认值为ISO-8859-1,但netcdf-4文件除外,其中默认值为UTF-8.
    * 这是一个持续的麻烦问题,因为许多源文件使用与ISO-8859-1不同的字符集或编码,但不要识别字符集或编码. 例如,许多源数据文件在Windows上有一些从Microsoft Word复制和粘贴的元数据,因此有来自Windows特定字符集的奇异连字符和偶数,而不是ASCII连字符和偶数. 这些字符随后以奇数字符或 '?' 在 ERDDAP 。 。 。 。
         
###### 文件 AccessBaseUrl{#fileaccessbaseurl} 
*    ** [文件 AccessBaseUrl](#fileaccessbaseurl) 和文件访问后缀** 很少使用不属于任何标准的属性。 如果 EDDTable 列有网络可访问文件的文件名 (例如,图像、视频或音频文件) ,您可以添加
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
指定基准 URL (结尾为 /) 需要使文件名成为完整的 URL 。 在不寻常的情况下,例如当一列引用了.png文件,但数值缺少".png"时,可以添加
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(例如,&lt;att name=“ file AccessSuptix” &gt;.png&lt;/a &gt; (中文(简体) ).
指定要添加的后缀,以使文件名成为完整的 URL。 那是为了 .htmlTable 答复, ERDDAP™ 将显示文件名作为完整 URL 的链接 (基础 乌尔加文件名加后缀) 。 。 。 。

如果你想的话 ERDDAP™ 为相关文件服务,请另建一个 [来自文件名的 EDD 表格](#eddtablefromfilenames) 这些文件的数据集 (也许是私人数据集) 。 。 。 。
    
###### 文件访问Archive 乌尔尔{#fileaccessarchiveurl} 
*    [ **文件访问Archive 乌尔尔** ](#fileaccessarchiveurl) 是一种很少使用的属性,不是任何标准。 如果 EDDTable 列有网络可访问文件的文件名 (例如,图像、视频或音频文件) 可以通过档案库访问 (例如, .zip 文件) 可通过 URL 访问,使用&lt;att name=“ file Access ArchiveUrl” (“文件名”) *乌拉尔* &lt;/att &gt; 指定归档的 URL 。
    
如果你想的话 ERDDAP™ 以服务归档文件,另做一个 [来自文件名的 EDD 表格](#eddtablefromfilenames) 文件的数据集 (也许是私人数据集) 。 。 。 。
    
######  ioos\\_category  {#ioos_category} 
*    [ ** ioos\\_category ** ](#ioos_category) - —— - 说 如果&lt;变量MustHaveIoosCategory &gt; 设置为真 (默认) 输入 [设置. xml](/docs/server-admin/deploy-install#setupxml) 否则,这是任择性的。
举例来说,&lt;名称=" ioos\\_category " &gt; 盐度&lt;/att &gt; (单位:千美元)
这些类别来自 [ NOAA 综合海洋观测系统 (监督办) ](https://ioos.noaa.gov/) 。 。 。 。
    
    *    (在写这个的时候) 我们不知道这些名字的正式定义。
    * 核心名称来自Zdenka Willis'.ppt"综合海洋观测系统". (监督办)   NOAA “建立初步操作能力的方法”和 [美国IOOS蓝图](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)   (第1-5页) 。 。 。 。
    * 这份清单今后可能会修订。 如果你有要求,请电子邮件克里斯。 约翰在Noaa.gov。
    *    ERDDAP™ 支持比IOOS更大的类别列表,因为Bob Simons添加了额外名称 (主要基于科学领域的名称,如生物学,生态学,气象学,统计学,分类学) 其他类型的数据。
    * 当前有效值在 ERDDAP™ 它们是水深、生物学、底部特征、CO2、有色溶解有机物质、污染物、海流、溶解营养物、溶解的O2、生态学、鱼类丰度、鱼类物种、热流、水文、冰分布、识别器、位置、气象学、海洋颜色、光学属性、其他、病原体、浮游生物物种、压力、生产力、质量、盐度、海平面、统计、流流、表面波、分类学、温度、时间、总悬浮物质、未知、风力、浮游生物物种和浮游生物丰度。
    * 不同术语之间有一些重叠和模糊之处 -- -- 尽力。
    * 如果添加的话 ioos\\_category 名单&lt; categoryAttributes &gt; 翻译: 输入 ERDDAP 因为 [设置. xml](/docs/server-admin/deploy-install#setupxml) 文件,用户可以很容易地通过 ERDDAP '主页上的"按类别搜索数据集".
         [尝试使用 ioos\\_category 以搜索感兴趣的数据集。](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000) 
    * 曾经 [讨论 ERDDAP™ 和 ioos\\_category 输入 ERDDAP™ 谷歌集团.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w) 
    
你可能会想陷害&lt;变量MustHaveIoosCategory &gt; 到虚假, 这样不需要此属性。 ("P&#33; 这对我有什么影响?") 某些理由 让它成真 (默认) 和使用情况 ioos\\_category 它们是:
    
    * 如果设置.xml's&lt;变量MustHaveIoos类型 &gt; 确是真实的, [生成 DatasetsXml](#generatedatasetsxml) 总是创建/建议 ioos\\_category 每个新数据集中每个变量的属性。 那为什么不放进去?
    *    ERDDAP™ 让用户按类别搜索感兴趣的数据集。 ioos\\_category 是一个非常有用的搜索类别, 因为 ioosQQ 类 (例如,温度) 相当广泛。 这样就可以 ioos\\_category 比起更精致的CF, standard\\_name 编号 (由于各种同义词和微小的变异,例如,海\\_表面的温度与海\\_表面的温度比较,所以对于这个目的来说并不那么好。 海水温度) 。 。 。 。
(用户 ioos\\_category 由下列人员控制:&lt; categoryAttributes &gt; 在您的设置中. xml 文件. )
         [尝试使用 ioos\\_category 以搜索感兴趣的数据集。](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000) 
    * 这些类别来自 [ NOAA 综合海洋观测系统 (监督办) ](https://ioos.noaa.gov/) 。 。 。 这些类别是IOOS描述IOOS任务的基础. 狦 NOAA ,支持 ioos\\_category 不错 一个... NOAA 事情做起来。 (看这个 [一个 NOAA 视频](https://www.youtube.com/watch?v=nBnCsMYm2yQ) 受启发吧&#33;) 如果你是在美国或国际机构工作,或与政府机构合作,或与其他一些海洋观测系统合作,那么与IOOS办公室合作是不是个好主意?
    * 迟早,你可能会想要别的 ERDDAP™ 链接到您的数据集 [ EDDGrid 从埃尔达普](#eddfromerddap) 和 [来自Erddap的EDD表](#eddfromerddap) 。 。 。 。 如果另一个 ERDDAP™ 要求 ioos\\_category ,您的数据集必须 ioos\\_category 顺序 EDDGrid 从Erddap和EDDTable 从Erddap到工作。
    * 在心理上更容易纳入 ioos\\_category 当创建数据集时 (这是另一回事 ERDDAP™ 需要将数据集添加到 ERDDAP ) ,而不是在事实之后添加 (如果你决定在未来使用) 。 。 。 。
         
######  long\\_name  {#long_name} 
*    [ ** long\\_name ** ](#long_name)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) , (中文). [CF 数字](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 和 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 是在 ERDDAP 。 。 。 。 举例来说,
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *    ERDDAP™ 使用 long\\_name 用于图上的标签轴。
    * 最佳做法: 将 long\\_name 仿佛是个标题 (使用第一个单词和所有非文章单词) 。 。 。 不要包括单位在 long\\_name 。 。 。 长的名字不应该太长(通常)&lt;但应该比 [ destinationName ](#destinationname) 往往非常简洁。
    * 若 " . long\\_name 变量中没有定义 [源属性](#variable-addattributes) 或&lt; addAttributes &gt;, (中文(简体) ). ERDDAP™ &#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;会通过清理来生成它 [ standard\\_name ](#standard_name)   (如果有的话) 或 destinationName 。 。 。 。
         
######  missing\\_value  {#missing_value} 
*    [ ** missing\\_value ** ](#missing_value) 和 **填充时间 数值**   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) 和 [CF 数字](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ) 是描述数字的可变属性 (例如, -- -- 9999) 用于表示缺失值。 举例来说,

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

对于字符串变量,两者的默认值为"". (空字符串) 。 。 。 。
对于数值变量,两者的默认值都是NaN.
*    ERDDAP™ 支持两者 missing\\_value 和 QQFillValue , 因为有些数据源给它们分配了略有不同的含义。
* 如果存在,它们应该与变量具有相同的数据类型.
* 如果数据被装入 [ scale\\_factor 和(或) add\\_offset ](#scale_factor) ,则 missing\\_value 和 QQFALUE 值应同样装入。 同样,对于使用本地值的带有字符串日期/时间值的列, [ time\\_zone ](#time_zone) ,则 missing\\_value 和 QQFillValue 值应当使用本地时区。
* 如果变量使用这些特殊值,则 missing\\_value 和/或QQFillValue属性是需要的。
* 对于 [时间和时间戳变量](#time-units)   (来源是字符串还是数字) , (中文). missing\\_value s和QQFillValues 出现为"". (空字符串) 当时间被写成字符串,当时间被写成双胞胎时,时间被写成NaN. 源值为 missing\\_value 而QQFillValue 将不会出现在变量的元数据中.
* 对于字符串变量, ERDDAP™ 总是转换任意 missing\\_value s 或 QQFillValue 数据值为“ ” (空字符串) 。 。 。 。 源值为 missing\\_value 而QQFillValue 将不会出现在变量的元数据中.
* 数字变量:
那个 missing\\_value 和 QQFillValue 将出现在变量的元数据中。
对于一些输出数据格式, ERDDAP™ 这些特殊号码将保持不变, 例如,你会看到 -9999。
其他输出数据格式 (特别是文本格式,例如.csv和 .htmlTable ) , (中文). ERDDAP™ 这些特殊编号将替换为NaN或“”。
* 一些数据类型有内在缺失的值标记,不需要明确识别. missing\\_value 或 QQFillValue 属性: 浮点和双变量有 NaN (非数字) ,字符串值使用空字符串,字符串值具有字符 \\uffff   (字符 # 65535, 是 Unicode 对非字符的值) 。 。 。 整数数据类型没有固有的缺失值标记.
* 如果整数变量缺少值 (例如,.csv文件中的空位置) , (中文). ERDDAP™ 将解析该值为定义 missing\\_value 或该变量的 QQFillValue 。 如果没有定义, ERDDAP™ 将该值解释为该数据类型的默认缺失值,该类型始终是该数据类型所能持有的最大值:
127表示字节变量,32767表示短数,2147483647表示整数,9223372036854775807 长久以来
525为ubyte,65535为ushort,4294967295为uint,1844744073709551615为乌龙.
######  ADD \\_FillValue ATTRIBUTES ? 。 。 。{#add-_fillvalue-attributes} 
*    [ ADD \\_FillValue ATTRIBUTES ? 。 。 。](#add-_fillvalue-attributes)   
每次都这样 ERDDAP™ 装入数据集,它检查带有整数源数据类型的变量是否有定义 missing\\_value 或者FillValue属性。 如果一个变量没有,那么 ERDDAP™ 打印信件到日志文件 (从“ 添加 QQFillValue 属性” 开始 。) 建议 ERDDAP™ 管理员添加 QQFill 此变量的值属性 datasets.xml 。 。 。 每个变量都有一个 QQFillValue 或者 missing\\_value 因为缺失值总是可能的,例如如果数据集中的某个文件没有给定变量, ERDDAP™ 需要能够将该变量显示为该变量的所有缺失值。 如果您决定一个变量不应有 QQFillVale 属性, 您可以添加
    &lt;atnames=“%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&lt;/att &gt; 相反,它会抑制为此发出的信息 datasetID +未来可变组合.
    
每次都这样 ERDDAP™ 启动时, 它会把所有的建议收集到一个信件中, 信件会写到日志文件中 (从 " 开始 ADD \\_FillValue ATTRIBUTES ? 吗?) 电子邮件至 ERDDAP™ 管理员,并写入 CSV 数据文件 \\[ 大家长会 \\] /日志/目录. 如果您愿意, 您可以使用 GenerateDatasetsXml 程序 (并添加 FillVale 属性选项) 将 CSV 文件中的所有建议应用到 datasets.xml 文档。 对于任何 datasetID / 可变组合在该文件中, 如果您决定不需要添加归属, 您可以将属性更改为&lt;atnames=“%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&lt;/att &gt; 以删除关于 datasetID +未来可变组合.
    
这很重要&#33;
正如鲍勃经常说的那样: 这将是坏的 (和尴尬) 如果全球变暖的某些证据是由数据中不明的缺失值引起的 (例如,温度值为99度或127度。 C应标为缺失值,从而将平均和/或中位数统计偏差提高) 。 。 。 。

* 电影《最终幻想》 missing\\_value 不同源文件中某个变量的值必须一致;否则, ERDDAP™ 将接受带有一组值的文件,并拒绝所有其他文件为“坏文件”。 为了解决问题
    * 如果文件被网格化 .nc 文件,可以使用 [ EDDGrid 从 NcFiles 未包装](#eddgridfromncfilesunpacked) 。 。 。 。
    * 如果文件是表格数据文件,您可以使用 EDDTable from...Files  ' [标准化 什麽?](#standardizewhat) 告诉 ERDDAP 在读入源文件时实现标准化 ERDDAP 。 。 。 。
    * 对于更困难的问题,你可以使用 [NcML 数据](#ncml-files) 或 [ NCO ](#netcdf-operators-nco) 为了解决问题
             
######  scale\\_factor  {#scale_factor} 
*    [ ** scale\\_factor ** ](#scale_factor)   (默认 = 1) 和 ** add\\_offset **   (默认 = 0)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) 和 [CF 数字](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ) 是OPTIONAL变量属性,用来描述通过简单的转换被打包在一个更简单的数据类型中的数据.
    * 如果存在,其数据类型与源数据类型不同,并描述了目的地值的数据类型.
例如,一个数据源可能存储了一个小数位数的浮点数数据值,作为短英寸 (单位16) ,使用 scale\\_factor =0.1和 add\\_offset =0. 例如,

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

在这个例子中, ERDDAP™ 以浮动数据值的形式向用户显示。
    * 如果现在 ERDDAP™ 将从这些属性中提取值,删除属性,并为用户自动解析数据:
目标 数值=来源 数值 scale\\_factor + 键 add\\_offset   
或者,说另一种方式:
已打包的Value = 已打包 数值 ++ scale\\_factor + 键 add\\_offset 
    * 那个 scale\\_factor 和 add\\_offset 不同源文件中某个变量的值必须一致;否则, ERDDAP™ 将接受带有一组值的文件,并拒绝所有其他文件为“坏文件”。 为了解决问题
        * 如果文件被网格化 .nc 文件,可以使用 [ EDDGrid 从 NcFiles 未包装](#eddgridfromncfilesunpacked) 。 。 。 。
        * 如果文件是表格数据文件,您可以使用 EDDTable from...Files  ' [标准化 什麽?](#standardizewhat) 告诉 ERDDAP 在读入源文件时实现标准化 ERDDAP 。 。 。 。
        * 对于更困难的问题,你可以使用 [NcML 数据](#ncml-files) 或 [ NCO ](#netcdf-operators-nco) 为了解决问题
             
######  standard\\_name  {#standard_name} 
*    [ ** standard\\_name ** ](#standard_name)   (从 [CF 数字](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 元数据标准) 是在 ERDDAP 。 。 。 CF 维护允许列表 [CF 标准名称](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) 。 。 。 。 举例来说,
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * 如果添加的话 standard\\_name 改为变量属性并添加 standard\\_name 名单&lt; categoryAttributes &gt; 翻译: 输入 ERDDAP 因为 [设置. xml](/docs/server-admin/deploy-install#setupxml) 文件,用户可以很容易地通过 ERDDAP '主页上的"按类别搜索数据集".
    * 如果您指定了 CF standard\\_name 对于变量,变量的单位属性不必与CF标准名称表中为标准名称指定的加农单位完全相同,但MUST的单位可转换为加农单位. 例如,所有温度相关CF standard\\_name 说"K" (开尔文) 作为加农科单位。 所以一个与温度有关的变量 standard\\_name MUST的单位为K,度\\_C,度\\_F,或者这些名称的一些UDUnits变体,因为它们都是可互换的.
    * 最佳做法: 权力的一部分 [控制词汇](https://en.wikipedia.org/wiki/Controlled_vocabulary) 来源于只使用列表中的术语. 因此,我们建议坚持控制词汇中定义的术语,我们建议如果列表中没有合适的术语,就不要组成一个术语. 如果您需要附加术语,请查看标准委员会是否会将它们添加到控制词汇中.
    *    standard\\_name 值是唯一对大小写敏感的CF属性值。 他们总是小写。 开始于 ERDDAP™ v1.82,生成Datasets将大写字母转换为小写字母. 当一个数据集被装入 ERDDAP ,大写字母会默化为小写字母.
         
######  time\\_precision  {#time_precision} 
*    time\\_precision 是用于 ERDDAP™   (没有元数据标准) (单位:千美元) [时间和时间戳变量](#time-units) ,可以在网格数据集或表格数据集中,并在 axisVariable 或 (简体中文) dataVariable 编号 举例来说,
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
     time\\_precision 指定何时使用的精确度 ERDDAP™ 将来自该变量的时间值格式化为网页上的字符串,包括 .htmlTable 回应。 在文件格式中 ERDDAP™ 格式化为字符串 (例如.csv和. .json ) , (中文). ERDDAP™ 仅使用 time\\_precision - 指定格式,如果它包括分数秒;否则, ERDDAP™ 使用 1970-01-01T00:00 时间 Z格式化 。
* 有效值为1970-01,1970-01-01,1970-01-01T00Z,1970-01-01T00Z,1970-01-01T00Z,1970-01-01T00:00Z (默认) , 1970-01-01T00:00:00.0Z, 1970-01-01T00:00.00Z, 1970-01-01T00:00:00.000Z. \\[ 1970年不是一个选择,因为它是一个单数,所以 ERDDAP™ 无法知道它是否是一个格式化的时间字符串 (一年) 或者,如果是1970-01-01T00:00Z之后的几秒。 \\] 
* 若为 time\\_precision 未指定或数值不匹配,将使用默认值。
* 这里,如同其他部分 ERDDAP™ ,任何未显示格式化时间的字段都假定具有最小值。 例如1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00Z, 1985-07-01T00:00 Z都被认为是等效的,尽管含精度不同. 这个和 [ISO 8601:2004 (英语). "extended" 时间格式规格](https://www.iso.org/iso/date_and_time_format) 。 。 。 。
*    **警报:** 你应该只使用限制 time\\_precision 若为 **全部** 该变量的数据值中,只有所有隐藏字段的最小值。
    * 例如,你可以使用一个 time\\_precision 如果所有数据值有小时=0、分钟=0和秒=0,则1970-01-01数据值为: (例如,2005-03-04T00:00Z和2005-03-05T00:00Z) 。 。 。 。
    * 比如,不要用一个 time\\_precision 如果有非0小时、分数或秒值, (例如,2005-03-05T12:00Z) 因为不默认小时值不会显示。 否则,如果用户以时间=2005-03-05要求所有数据,则请求会出乎意料地失败.
             
######  time\\_zone  {#time_zone} 
*    [ ** time\\_zone ** ](#time_zone) 
    *    time\\_zone 是用于 ERDDAP™   (没有元数据标准) (单位:千美元) [时间和时间戳变量](#time-units) ,可以在网格数据集或表格数据集中。
    * 默认是 " Zulu " , " (这是格林尼治标准时区的现代版本) 。 。 。 。
    * 背景资料:"时间冲抵" (例如太平洋标准时间-08:00,GMT-8) 相对于 Zulu   (格林尼治标准时) 。 。 。 反之,"时区"是受日光节影响更复杂的事物 (例如,“美国/太平洋”) 它们在不同的时间在不同的地方有不同的规则。 时区总是有名字,因为不能用简单的抵消值来归纳 (请参看表格中的“TZ数据库名称”栏。 [https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ) 。 。 。 。 ERDDAP 因为 time\\_zone 属性帮助您处理来自某个时区的本地时间数据 (例如,1987-03-25T17:32:05 太平洋 时间) 。 。 。 如果您有字符串或数字时间数据 (固定) 时间偏移,您只需将数据调整到 Zulu   (这是什么 ERDDAP™ 请求) 在单位属性中指定不同的基时间 (例如,"1970-01-01T08:00Z以来的小时数",注意T08以指定时间偏移) ,并始终检查结果以确保得到你想要的结果。
    * 对于带有 Strings 源数据的时间戳变量,此属性允许您指定一个导致的时区 ERDDAP™ 转换本地时区源时间 (有些在标准时间,有些在日光节时) 输入 Zulu 时间 (标准时间) 。 。 。 有效时区名称列表可能与TZ列列表完全相同 。 [https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) 。 。 。 美国常见的时区有:美国/夏威夷,美国/阿拉斯加,美国/太平洋,美国/山地,美国/阿里索纳,美国/中部,美国/东部.
    * 对于带有数字源数据的时间戳变量,可以指定 " time\\_zone " 属性,但价值必须是 " Zulu " 或"UTC"(UTC). 如果您需要其他时区的支持,请发电子邮件给克里斯. 约翰在Noaa.gov。
         
###### 遗留时间(_T){#legacy_time_adjust} 
*    [ **遗留时间(_T)** ](#legacy_time_adjust) 开始于 ERDDAP™ 2.29.0 时间变量的作用略有不同。 在极少数情况下,最有可能使用 `日期` 1582年之前的一年 (这样 `从000-01-01起` 或 `1-1-1 00: 00: 0.0起的天数` ) 您需要显示日期变量的调整。 原因是 ERDDAP™ 使用java.time库管理内部日期. 有些数据集确实需要使用旧的GregorianCalendar库来缩短正确的日期.

```
<axisVariable>
    <sourceName>time</sourceName>
    <destinationName>time</destinationName>
    <!-- sourceAttributes>
        ... removed several lines ...
        <att name="units">days since 1-1-1 00:00:0.0</att>
    </sourceAttributes -->
    <addAttributes>
        ... removed several lines ...
        <att name="legacy_time_adjust">true</att>
    </addAttributes>
</axisVariable>
```

###### 单位{#units} 
*    [ **单位** ](#units)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) , (中文). [CF 数字](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 和 [APDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 元数据标准) 定义数据值的单位。 举例来说,
    ```
        <att name="units">degree\\_C</att>
    ```
    * “单位”作为源属性或添加属性 "time" 变量,并酌情为其他变量严格推荐 (这几乎总是) 。 。 。 。
    * 我们一般建议 [UD 单位](https://www.unidata.ucar.edu/software/udunits/) \\ 兼容单位,这是需要的 [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) 和 [CF 数字](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 标准。
    * 另一个共同的标准是: [大学](https://unitsofmeasure.org/ucum.html) - 计量单位统一代码。 [ OGC ](https://www.ogc.org/) 诸如 [ SOS ](https://www.ogc.org/standards/sos) , (中文). [ WCS ](https://www.ogc.org/standards/wcs) ,以及 [ WMS ](https://www.ogc.org/standards/wms) 需要UCUM并经常将UCUM称为UOM (计量单位) 。 。 。 。
    * 我们建议您使用一个单元标准 用于您所有的数据集 ERDDAP 。 。 。 。 你应该告诉 ERDDAP™ 您所使用的标准&lt;单位 QQ标准 &gt;, 在您的 [设置. xml](/docs/server-admin/deploy-install#setupxml) 文档。
    * 不同源文件中给定变量的单位必须一致. 如果您拥有一组数据文件,其中一个文件子集使用不同的单位值而不是文件的一个或多个子集(例如,
"自1985-01-01起的天数"与"自2000-01-01起的天数"相对.
"Celsius"对"deg\\_C",或
"knots"对"m/s",你需要找到一种方法使单位值标准化,否则, ERDDAP™ 只装入文件的一个子集。 考虑一下:如果一个文件有windSpeed units=knots,另一个文件有windSpeed units=m/s,那么两个文件中的数值就不应该包含在同一汇总数据集中.
        * 如果文件被网格化 .nc 文件,在很多情况下可以使用 [ EDDGrid 从 NcFiles 未包装](#eddgridfromncfilesunpacked) 。 。 。 。
        * 如果文件是表格数据文件,则在许多情况下,您可以使用 EDDTable From.Files  ' [标准化 什麽?](#standardizewhat) 告诉 ERDDAP 在读入源文件时实现标准化 ERDDAP 。 。 。 。
        * 对于更困难的问题,你可以使用 [NcML 数据](#ncml-files) 或 [ NCO ](#netcdf-operators-nco) 为了解决问题
    * CF标准第8.1节说,如果一个变量的数据是通过下列方式包装的: [ scale\\_factor 和(或) add\\_offset ](#scale_factor) ,"变量的单位应当代表已解开的数据".
    *    [对于时间和时间戳变量,](#time-units) 或变数 [源属性](#variable-addattributes) 或&lt; addAttributes &gt; 翻译: (优先时间) 必须 [单位](#units) 这其中之一
        
        * 对于带有数字数据的时间轴变量或时间数据变量: [UD 单位](https://www.unidata.ucar.edu/software/udunits/) 相容字符串( O) (带有格式 *单位* 自此以来 *时间* ) 描述如何解释源时间值 (例如,1970-01-01T00:00Z以来的秒数) 。 。 。 。
            
         *单位* 可以是:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
从技术上讲, ERDDAP™ 不跟随 UDUNITS 转换时的标准 "years since" 和 "months since" 时间值至 "seconds since" 。 。 。 。 那个 UDUNITS 标准将一年定义为固定的,单值:3.15569259747e7秒. 还有 UDUNITS 将月份定义为12年。 遗憾的是,我们看到的大多数/所有数据集都使用了 "years since" 或 "months since" 明确打算将数值定为历年或历月。 例如,3项 "months since 1970-01-01" 通常意为1970-04-01. 这么说 ERDDAP™ 解释 "years since" 和 "months since" 作为日历年和日历月,不严格遵循 UDUNITS 标准。
            
那个 *时间* 必须是ISO 8601:2004 (英) 格式化日期时间字符串 ( yyyy-MM-dd 'T'HH:mm:sZ,例如,1970-01-01T00:00Z) ,或其中的一些变体 (例如,结尾缺少部件) 。 。 。 。 ERDDAP™ 尝试与该理想格式的多种变体合作,例如支持"1970-1-1 0:0:0". 如果时区信息缺失,则假定是 Zulu 时区 (阿卡格林尼治时) 。 。 。 即使指定了另一个时间抵消, ERDDAP™ 从不使用日光保存时间。 如果碱基Time使用其他格式,则必须使用&lt; addAttributes &gt; 指定使用 ISO 8601:2004 变量的新单位字符串 (英) 格式(例如自1985年1月1日起改为自1985-01-01起的天数)。
        
你可以测试 ERDDAP 是否有能力处理一个特定的 *单位* 自此以来 *时间* 与 ERDDAP 因为 [时间转换器](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) 。 。 。 希望你能插上一个号码 (数据源的首次值?) 和单位字符串,单击转换,以及 ERDDAP™ 将它转换为 ISO 8601:2004 (英) 格式化日期时间字符串。 如果单位字符串无法识别, 转换器会返回错误消息 。

###### 字符串时间单位{#string-time-units} 
*    [对于带有字符串数据的时间或时间戳数据变量的单位属性,](#string-time-units) 您必须指定 [Java.time. Date Time Formatter 时间主题 主题主题 主题主题 主题 主题 主题](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) 模式 (基本上与java.text兼容。 简单数据格式) 它描述了如何解释字符串时间。
    
通用时间格式,即ISO 8601:2004的变体 (英) 标准格式 (例如,2018-01-02T00:00Z) ,您可以指定 yyyy-MM-dd 'T'HH:mm:sZ,例如,使用 yyyy-MM-dd 如果字符串时间只有一个日期。 对于任何从yyyy-M开始的格式, ERDDAP 使用特别的解析器,该解析器非常宽容格式的细微变化。 解析器可以按格式"Z","UTC","GMT",QQ:XX,QQ,和QQ格式处理时区. 如果未指定部分日期时间 (例如,分数和秒) , (中文). ERDDAP™ 假设该字段的最低值 (例如,如果没有指定秒,则假定秒=0) 。 。 。 。
    
对于所有其他字符串时间格式,您需要精确指定一个 DateTime Formatter-兼容的时间格式字符串. 喜欢 yyyy-MM-dd 'T'HH:mm:sZ,这些格式字符串是用字符构建的,这些字符从时间字符串中识别出特定类型的信息,例如,m表示小时分钟. 如果重复格式字符一些次,它会进一步细化含义,例如,m表示该值可能由任意数字指定,mm表示该值必须由两位数字指定. 那个 Java DateTimeFormatter 的文档是粗略的概述,没有说明这些细节。 这里列出格式字符变化及其含义 ERDDAP™   (它有时与 Java 日期时间) 数字 :
    
     | 字符 | 实例 | 含义 | 
     | - - - 说吧 | - - - 说吧 | - - - 说吧 | 
     | 哟,Y,Y | \\-4712, 0, 1, 10, 100, 2018 (中文(简体) ). | 年数,任意数字。 ERDDAP™ 治疗y (历年) 和 Y 键 (按周计的年份,因为这常常被误用,而不是y) 作为你, [天文年数](https://en.wikipedia.org/wiki/Astronomical_year_numbering) 。 。 。 天文年份为正数或负数整数,不使用BCE (业连) 或 中 英 (自动) 代号:2018=2018CE,.,2=2CE,1=1CE,0=1BCE, -1=2BCE, -2=3BCE,. | 
     | u, y,  Y | \\-4712,0000,0001,0010,0100,2018 | a 4位数天文年数 (忽略任何先前的“ - ”)   | 
     | 管理人员 | 第1、01、12条 | 月数,任意数字 (1=1月 (单位:千美元))   | 
     | 微调 | 01, 12 (英语). | a 2 位数 (无加法) 月数 | 
     | 母亲 | 扬,扬,扬 | a 英文月份名称,大小写不敏感 | 
     | 毫米 | 扬,扬,扬,1月,January,1月 | a 3个字母或英文全月名称,大小写不敏感 | 
     | D. 国家 | 1,01,31 (英语). | 月数,任何数字 | 
     | (单位:千美元) | 01, 31 (英语). | a 2 位数 (无加法) 以月为日. 第一个"数字"可能是一个空格. | 
     | D级 | 1,001,366 (中文(简体) ). | 任何数字,001=Jan 1 | 
     | DDD 函数 | 第001、366页 | 每日,3位数字,001=Jan 1 | 
     | 欧EE | hu, T, Thu | a 每周3个字母,分析时值被忽略 | 
     | 欧EE | 星期四,星期四,星期四,周四,周四,周四 | a 3 个字母或完整的英文周刊,大小写不敏感,在解析时被忽略 | 
     | 页:1 | 0、00、23 (中文(简体) ). | 每天小时 (0-23 (中文(简体) ).) ,任意数字 | 
     | 嘘 | 00, 23 (英语). | 每天HH小时 (00-23 (中文(简体) ).) 两位数 第一个"数字"可能是一个空格. | 
     | (单位:千美元) | 早上,下午,下午,下午 | AM或PM, 对大小写不敏感 | 
     | 页:1 | 第12、1、01、11条 | 午后钟点 (12, 1, 2, 11 (中文(简体) ).) ,任意数字 | 
     | 嘘 | 第12、01、11条 | 午后钟点 (12, 1, 2, 11 (中文(简体) ).) 两位数 第一个"数字"可能是一个空格. | 
     | K级 | 0, 1, 11 (中文(简体) ). | 午后一小时 (0, 1, . 11 (英语).) ,任意数字 | 
     | 韩国克朗 | 00,01,11 (英语). | 下午2点 | 
     | 页:1 | 0, 00, 59 (简体中文). | 任何数字 | 
     | 毫米 | 00, 59 (英语). | 时数分钟,两位数 | 
     | 编号 | 0, 00, 59 (简体中文). | 第二分钟,任意数字 | 
     | 编号 | 00, 59 (英语). | 第二分钟,两位数 | 
     | 页:1 | 0 000人、9 999人 | 分数秒,好像在小数点之后,任意数字 | 
     | 党卫军 | 00, 99 (英语). | 百分之一秒,两位数 | 
     | 特别服务 | 000,999个 | 千秒,三位数 | 
     | 页:1 | 0 0000,863999999 (韩语). | 毫秒,任意数字 | 
     | AAAAAAAAAAA AAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA | 0000000, 863999999 (英语). | 毫秒8位数 | 
     | 无 | 0,00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 | 纳米秒,任意数字。 内 ERDDAP™ ,这个被切换到nMillis。 | 
     | 宁宁县志. | 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 | 纳米秒14位数 内 ERDDAP™ 切换到 nMillis 。 | 
     | 无 | 0,00000000000,59999999999999 | 纳米秒,任意数字。 内 ERDDAP™ 切换到 nMillis 。 | 
     | 农林区 | 0000000 000、599999999999 | 纳米秒11位数 内 ERDDAP™ 切换到 nMillis 。 | 
     | XXX, ZZZ 语句 | Z, -08: 00,+01:00 (中文(简体) ). | 带有 Z 或 ± 格式的时区 (页:1) 数字 : (页:1) 。 。 。 。 这个 *空间* 作为 + (非标准) 。 。 。 ZZZ支持"Z"是非标准的,但处理一个常见的用户错误. | 
     | XX, ZZ 键 | Z -0800, +0100 键 | 带有 Z 或 ± 格式的时区 (页:1) 数字 : (页:1) 。 。 。 。 这个 *空间* 作为 + (非标准) 。 。 。 ZZ支持"Z"是非标准但处理常见的用户错误. | 
     | 页:1 | Z, -08,+01 (中文(简体) ). | 带有 Z 或 ± 格式的时区 (页:1) 数字 : (页:1) 。 。 。 。 这个 *空间* 作为 + (非标准) 。 。 。 Z支持"Z"是非标准的,但处理一个常见的用户错误. | 
     |   | \\-08:00,+01:00 | 带有 ± 格式的时区 (页:1) 数字 : (页:1) 。 。 。 。 这个 *空间* 作为 + (非标准) 。 。 。 。 | 
     | 页:1 | \\-0800,+0100 | 带有 ± 格式的时区 (页:1)  (页:1) 。 。 。 。 这个 *空间* 作为 + (非标准) 。 。 。 。 | 
     | 页:1 | \\-08, +01 时间轴 | 带有 ± 格式的时区 (页:1) 。 。 。 。 这个 *空间* 作为 + (非标准) 。 。 。 。 | 
     |  ' | 'T', 'Z', 'GMT' ' | 一系列文字字符的起始和结尾 | 
     |  '  ' (两个单引号)   |  '  ' | 两个单引号表示一个字面单引号 | 
     |   \\[  \\]   |   \\[   \\]   | 开始 (" , " \\[ " , ") 结束 (" , " \\] " , ") 可选章节。 此标记仅用于字面字符和格式字符串的结尾。 | 
     | #, 123;,&#125; | #, 123;,&#125; | 预留未来使用 | 
     | G、L、Q、e、c、V、z、O、p |       | 这些格式化字符由 Java 'DateTimeFormatter, 但目前不支持 ERDDAP 。 。 。 如果您需要支持,请发电子邮件给克里斯. 约翰在Noaa.gov。 | 
    
注释:
    
    * 在带点的某一日期,数值可能有可变数字 (例如,在美国斜线日期格式"1/2/1985"中,月份和日期可以是1或2位数字.) 因此格式必须使用1个字母的符号,例如M/d/yyyy,接受月份和日期的任何数字。
    * 如果某一项的位数是不变的,例如:01/02/1985,那么就指定格式中的位数,例如:2位数月的MM/dd/yyyy、2位数日期和4位数年。
    * 这些格式很难使用。 给定格式可能对给定变量的大多数(但不是全部)时间字符串有效. 总是检查您指定的格式是否按预期工作 ERDDAP 对于所有变量的时间字符串。
    * 可能时, GenerateDatasetXml 会建议时间格式字符串.
    * 如果您需要帮助生成一个格式字符串, 请电子邮件 Chris 。 约翰在Noaa.gov。

主时间数据变量 (表格数据集) 和主时间轴变量 (用于网格数据集) 获得 [ destinationName ](#destinationname) 时间 它们的单位元数据必须是数字时间值的UDUnits兼容单位字符串,例如"1970-01-01以来的天数". (表格或网格数据集) ,或 [适合字符串时间的单位](#string-time-units) ,例如"M/d/yyyy". (表格数据集) 。 。 。 。

不同格纹中不同的时间单位 .nc 文件 - 如果你有一组网格 .nc 文件,对于时间变量,一个文件的子集使用的时间单位不同于文件的一个或多个子集,可以使用 [ EDDGrid 从 NcFiles 未包装](#eddgridfromncfilesunpacked) 。 。 。 。 它将时间值转换为 "seconds since 1970-01-01T00:00:00Z" 在更低的级别,从而隐藏差异,这样您就可以在收集各种文件时制作一个数据集。

###### 时间戳变量{#timestamp-variables} 
 [时间戳变量](#timestamp-variables) - —— - 说 任何其他变量 ( axisVariable 或 dataVariable ,在一个 EDDGrid 或 EDD Table 数据集) 可以是时标变量。 时间戳变量是具有时间单位和时间数据的变量,但具有&lt; destinationName &gt; 时间除外。 TimeStamp 变量的行为类似主时间变量,它们将源的时间格式转换为 "seconds since 1970-01-01T00:00:00Z" 和/或ISO 8601:2004 (英) 格式)。 ERDDAP™ 确认时间 按时间分列的印花变量 " [单位](#units) " 元数据,它必须与这个正则表达式相符 " \\[ a-zA-Z (韩语) \\] + + 自 + 开始 \\[ 0-9 (韩语). \\] +] (中文(简体) ). (数字日期 例如,时代 "seconds since 1970-01-01T00:00:00Z" ) 或者是约会 包含“ uuuu ” 、 “ yyyyy ” 或 “ YYYYY ” 的时间格式字符串 (例如, " yyyy-MM-dd 'T'HH:mm:sZ' (英语).) 。 。 。 。 但请继续使用 destinationName   "time" 主要日期为 时间变数.

 **总是检查你的工作,以确保显示的时间数据 ERDDAP™ 是正确的时间数据。** 使用时间数据总是棘手的,容易出错。

见 [关于时间变量的更多信息](#destinationname) 。 。 。 。
 ERDDAP™ 具有用于 [转换数字 时间到/ 从字符串时间](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) 。 。 。 。
见 [怎么样 ERDDAP™ 处理时间](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) 。 。 。 。
         
        
######  valid\\_range  {#valid_range} 
*    [ ** valid\\_range ** ,或 ** valid\\_min ** 和 ** valid\\_max ** ](#valid_range) - —— - 说 这些是定义于 [CF 数字](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 元数据公约。 举例来说,

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

或

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * 如果存在,它们应与变量具有相同的数据类型,并指定该变量数据的有效最小值和最大值。 用户应当认为此范围以外的数值无效 。
    *    ERDDAP™ 不适用 valid\\_range 。 。 。 。 换句话说: ERDDAP™ 不转换数据值 valid\\_range 到 QQ 输入 数值或 missing\\_value 。 。 。 。 ERDDAP™ 只需通过这个元数据 然后由你来决定应用程序
为什么? 这就是这个元数据的目的。 如果数据提供者希望这样做,数据提供者可以将数据值转换为数据值。 valid\\_range 成为"FillVales"。 ERDDAP™ 无法再猜测数据提供者。 这种办法比较安全:如果后来表明, valid\\_range 过于狭窄或错误, ERDDAP™ 不会抹去数据
    * 如果数据被装入 [ scale\\_factor 和(或) add\\_offset ](#scale_factor) , (中文). valid\\_range , (中文). valid\\_min 和 valid\\_max 数据类型和数值。 从 ERDDAP™ 应用 scale\\_factor 和 add\\_offset 当它装入数据集时, ERDDAP™ 将打开 valid\\_range , (中文). valid\\_min 和 valid\\_max 值使目标元数据 (显示给用户) 将显示已解开的数据类型和范围。
或者,如果一个无包装的... ... valid\\_range 属性存在, 将重新命名 valid\\_range 何时 ERDDAP™ 装入数据集。
##### &lt;删除 MVRows & gt;{#removemvrows} 
* [ ** &lt;删除MVRows &gt; ** [ . ] (# 重新行动 #) 是标记中的可选择标记 datasets.xml 用于 EDD 文档 (包括所有子类) 数据集,尽管它只用于 EDD Table from MultidimNcFiles。 它可以有真假的价值. 例如,真实的
这将删除组末尾所有值的所有行块 missing\\_value , QQFillValue, 或 CoHort... Arrray 本地缺失值 (或 Char- 32 字符串) 。 。 。 这是针对 CF DSG 多层面阵列文件类型和类似文件的. 如果是真的,这进行适当的测试, 所以总是加载所有最大暗变量, 所以可能需要更多的时间。
默认值为假 。
建议- 如果可能的话,我们建议把MVRows弄虚作假。 将MVRows设置为真可以显著地减慢请求,尽管一些数据集可能需要.
