---
title: "ERDDAP™ - Changes"
---
# ERDDAP™变动

ERDDAP™是一个伟大的例子[用户驱动创新](https://en.wikipedia.org/wiki/User_innovation),产品创新往往来自消费者 (ERDDAP™用户) 不仅仅是制片人 (ERDDAP™开发者) 。 。 。 多年来,大多数关于新特征和变化的想法ERDDAP™已经来自用户。 这些用户的伟大想法列在下面。 谢谢&#33; 请保持这些伟大的建议&#33;

以下是与每个ERDDAP™释放

## 第2.26号版本{#version-226} 
 (2025-03-31 (韩语).) 

*    **为所有人:** 
    * 我们的文件网站大量更新: https://erddap.github.io/
 
除了更新的外观外,还有改进的导航,搜索,翻译,应该更便于维持前进&#33;

*    **新特征和变化 (用户) 数字 :** 
    * 订阅费和RSS对从文件更改中频繁更新的数据集,更新应当更加可靠。

*    **东西ERDDAP™管理员需要知道和做:** 
    * 默认发布需要/支持Java第21版. 回到本版后,人们可以很容易地Java17个兼容二进制.

    * 用于自定义UI中显示的数据集信息的新功能. 我们期望这特别有助于增加数据引用。 详情请阅读[新文档](/docs/server-admin/display-info)。 。 。 感谢阿尤什·辛格的贡献&#33;

    * 额外的普罗米修斯度量衡. 最大的一个是...http_ request_dult_seconds' 包括按“request_type”、“dataset_id”、“dataset_type”、“file_type”、“lang_code”、“status_code”细分的请求响应时间
这种机器可读格式可以更好地收集度量衡来理解用户是如何使用服务器的.

    * 生成 ISO19115 XML 文件的新方式. 它使用Apache SIS,是本版中的新选项. 请启用并发送反馈 。
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * 用户界面现在将创建单个链接。infoUrl和摘要。

    * 订阅费和RSS对从文件更改中频繁更新的数据集,更新应当更加可靠。 如果这造成问题, 请联系 GitHub 并禁用功能, 在您的设置中添加下面的旗帜 。 xml 。
未建议
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * 对于数据集类型EDD Table FromNcCFFiles,子集变量将不再自动生成. 如果你依赖于行为,你也可以 (首选解决方案) 添加subsetVariables到您的数据集定义datasets.xml,或者在您的设置中添加下面的旗帜.xml. 如果你觉得需要打开这个 请联系GitHub 这样我们就能更好地支持你的使用案例
未建议
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * 服务器现在将重定向文档请求 (下载/ 这是已迁移的文件) 到新文档网站。 如果需要, 您可以在设置. xml 中禁用此标记 :
未建议
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * 一些小的更改和错误修正 。

*    **对于ERDDAP™开发者 :** 
    * 更多代码质量改进和死代码清理. 其中包括微小优化、更好地处理可消耗资源以及从长期过时的数据类型中迁移出去 (像矢量一样) 。 。 。 。

    * 大量重构到EDStatic,以拔出大部分的配置,消息,和度量码. 它还更好地封装目录路径的初始化和处理 (最后两个方面还有许多工作要做。) 

    * 在正式支持的Docker图像上取得了很多进展. 计划在ERDDAP™2.26 发布。

## 第2.25号版本{#version-225} 
 (2024-10-31年发布) 

*    **新特征和变化 (用户) 数字 :** 
    * EDDTable FromFiles 现在只能支持输出的查询 (全局、 jexl 脚本或变量) 。 。 。 。
         
*    **东西ERDDAP™管理员需要知道和做:** 
    * 2.25版本要求Java21岁或更新. 这是LTS版本,已有一年多时间可供使用.
         
    * 共享监视服务现在是默认值 。 如果需要禁用,请联系chris. John at Noaa.gov 让我知道, 这样我就可以在未来的版本中加以改进,并补充:
        &lt;使用共享监视服务&gt; false&lt;/ 使用共享监视服务&gt; 到您的设置. xml 。
         
    * 那个ERDDAP™服务器从服务器启动开始 。 这意味着数据集会立即开始加载,而不是等待到提出请求.
         
    * 从MultidimNcFiles中移除的 MVRows 参数现在将产生效果. 设为虚假可能大大加快一些查询,但这可能不适合所有数据集. 更多信息见[参数描述](/docs/server-admin/datasets#removemvrows)。 。 。 。
         
    * 数据集 (从NcFiles和EDDGrid从NcFiles调用) 现在支持使用 Zarr 文件。 它们必须在文件NameRegex或路径Regex中包含"zarr". 见[数据集文档中的 sarr secion](/docs/server-admin/datasets#zarr)更多细节。
         
    * 新的数据集类型, EDDTable FromParquetFiles 现在被支持 。 见[数据集文档中的 EDD Table FromParquetFiles secion](/docs/server-admin/datasets#eddtablefromparquetfiles)更多细节。
         
    *   [普罗米修斯度量衡](https://prometheus.io/)现以/erddap/度量衡提供。
         
    * 提供了新的 XML 解析器执行 。 此新解析器允许在datasets.xml。 。 。 感谢阿尤什·辛格的特写.
         
    * 新参数在datasets.xml控制异常活动的电子邮件。 异常活动 失败率默认为 25% 的旧值 。 感谢阿尤什·辛格的特写.
         
    * 在设置.xml中新建参数,用于控制在状态.html页面上显示数据集加载错误的情况. 它默认为真, 禁用状态页面上的数据集错误, 设置显示 LoadErrorsOnStatusPage为假 :&lt;显示 LOADErrors 关于StatusPage &gt; 虚假&lt;/显示 LOADErrors 关于状态页 &gt;
         
    * 一些小的更改和错误修正 。
         
*    **对于ERDDAP™开发者 :** 
    * 测试分离到单位和集成 (缓慢) 测试。 此外,还进行了更多的试验,并减少了片状试验。
         
    * 错误 Prone (一些支票仍然被禁用) 和Spot Bugs通过马文整合.
         
    * 完整代码基础格式化,以匹配Google样式指南.
         

## 第2.24号版本{#version-224} 
 (2024-06-07年发布) 

*    **新特征和变化 (用户) 数字 :** 
    * 用于音响数据集的新色调调调色板 EK80. 多亏了罗布·塞马克
         
    * 解决一个EDDTable AggregateRows没有显示所有儿童的合适范围的问题。 感谢Marco Alba的修复和错误报告。
         
*    **东西ERDDAP™管理员需要知道和做:** 
    * 安全变化: 谷歌认证可能需要修改您的CSP.
        
具体来说,您可能需要添加 https://accounts.google.com/gsi/style 以斜弧和 https://accounts.google.com/gsi/ 以连接-src。 现在可以使用脚本弧 https://accounts.google.com/gsi/client.
 
        
欲了解更多信息,请前往[谷歌页面](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)关于CSP配置.
         
        
    * 新共享监视服务. 这是查看目录更新的新选项 。 它每个文件系统都有一条线程,而不是每个数据集一条线程. 这很可能会大大减少用于监视变化的线程数量. 这确实意味着所有数据集都会一起更新,而不是每个数据集都有自己的更新频率. 这很可能意味着对大多数数据集进行更频繁的更新。
        
启用此添加&lt;使用共享监视服务&gt; true&lt;/ 使用共享监视服务&gt; 到您的设置. xml 。
        
          
请试试这个 向克里斯汇报一下 约翰在noaa.gov。
         
    * 修复日志中不正确的 var 名称 。 感谢阿尤什·辛格的帮助
         
    * 一些小的更改和错误修正 。
         
*    **改进ERDDAP™开发者 :** 
    * 支持使用Docker本地开发. 谢谢马特·霍普森和罗杰
         
    * 利用Jetty和文献改进支持地方发展。 谢谢米卡・温格伦
         
    * 修改测试以减少问题跨平台. 谢谢 谢恩圣萨维奇.
         

## 2.23号版本{#version-223} 
 (2023-02-27年发布) 

注意这次发布是由鲍勃·西蒙斯完成的,从而表明他在向继任者克里斯·约翰过渡期间仍然在身边并活跃. 标注于此发行时,所有代码更改均由奇斯·约翰完成,除非另有说明.

*    **新特征和变化 (用户) 数字 :** 
    *    (无)   
         
*    **东西ERDDAP™管理员需要知道和做:** 
    * 安全变化: Google认证现在通过新的Google身份服务图书馆完成,该图书馆是“与Google一起签名”的一部分。 Google支持旧的"Google Sign In"系统将停用 2023-03-31. 因此,如果你在你的Google认证中ERDDAP™安装,您必须更新到ERDDAP™v2.23+ 在此之前. (鲍勃对通知时间太短感到抱歉 这是鲍勃的错。)   
         
    * 改进:NCCSV现在是v1.2. 更改是文件现在是UTF-8编码文件 (他们是ASCII) ,所以现在可以像现在这样包含任何 Unicode 字符,而不编码为\\u_hhh_,尽管这仍然是允许的。
撰写 NCCSV 文件时,ERDDAP™现在写 v1.2 文件 。
        ERDDAP™将仍然读取符合 v1.0 和 v1.1 规格的 NCCSV 文件。
多亏了Pauline-Chauvet,n-a-t-e,和thogar-computer的建议,并进行了测试以确保各种电子表格程序可以导入UTF-8文件. 多亏了Bob Simons改变了代码
         
    * NEW:状态.html的网页现在有一个接近顶端的行,该行表明数据集载荷Datasets正在装入哪个和相关的统计数据,或者如果没有装入数据集则没有. 这会很有帮助ERDDAP™管理员试图解析为什么加载 数据集要花这么长时间 另外,nGridDatasets、nTableDatasets和nTotalDatasets下面的计数现在是瞬间 (之前,他们都是最后的负载结束 数据集) 。 。 。 。
这个变化是给罗伊·门德尔索恩的. 多亏了Bob Simons改变了代码
         
    * 改进:生成数据 Xml 现在改为CF-1.10 (是CF-1.6, 数据为:) 在"公约"属性中.
多亏了Bob Simons改变了代码
         
    * 一些小的更改和错误修正 。
         

## 第2.22号版本{#version-222} 
 (发布 2022-12-08) 

请注意这次发布是由鲍勃·西蒙斯完成的,从而表明他在向继任者过渡期间仍然在身边并活跃.

*    **新特征和变化 (用户) 数字 :** 
    *    (无)   
         
*    **东西ERDDAP™管理员需要知道和做:** 
    * 没什么
         
    * 安全炸弹: 在语言选择降级的代码中有一个Cross Site脚本相关的错误. 感谢NOAA安全扫描以获取这个。 这说明NOAA安保部门正在积极和经常地寻找安保方面的弱点ERDDAP。 。 。 。
         
    * 安全资料: 使用许多图书馆ERDDAP™与往常一样,作为本版的一部分更新。 这次包括更新 PostgreSQL 驱动程序 (它有一个安全错误) 改为42.5.1。
         
    * 改进:对ERDDAP'内存管理系统应减少因缺乏可用的内存而导致特定请求失败的机会.
         
    * 一些小的更改和错误修正 。
         

## 第2.21版 (中文(简体) ).{#version-221} 
 (2022-10-09年发布) 

*    **新特征和变化 (用户) 数字 :** 
    *    (无)   
         
*    **东西ERDDAP™管理员需要知道和做:** 
    * 为了:Java17,你不应该使用\\-d64 在JAVA OPTS 在setenv.bat或setenv.sh。 所以,如果它在那里,请移除它。 我认为64位模式现在被选中 当你下载64位版本Java。 。 。 。 多亏了山姆·伍德曼
         
    * 布鲁克斯: 有时,新的电子邮件系统试图太频繁地登录,这导致Google电子邮件服务器尝试拒绝所有未来的日志. 现在,电子邮件系统避免了这个问题和相关的问题.
         

## 第2.20版 (中文(简体) ).{#version-220} 
 (2022-09-30 发布) 

*    **别用v2.20. 这是有缺陷的。** 但管理员在升级到v2.21+时仍需要完成以下列出的to DO项目.
     
*    **新特征和变化 (用户) 数字 :** 
    *    (无)   
         
*    **东西ERDDAP™管理员需要知道和做:** 
    * 我们重新启用了旧记忆管理系统 (数学2. 记忆可操作) 并修改了新的内存管理系统 (EDStatic. shed 此请求) 以更好的工作与它。 见[内存状态](/docs/server-admin/additional-information#memory-status)详细情况。
         
    * 更改: 默认值&lt;ipAddressMax 请求 &gt; 输入datasets.xml从7个增加到15个。 很明显,一些合法的WMS客户端可以生成超过7个同步请求.
         

## 第2.19号版本{#version-219} 
 (发布 2022-09-01) 

*    **别用v2.19. 这是有缺陷的。** 但管理员在升级到v2.20+时仍需要做下面列出的to DO项目.
     
*    **新特征和变化 (用户) 数字 :** 
    * NEW:有一个新的服务器侧功能,orderBy降级,这就像orderBy但按降序排列 多亏了亚当·莱德比特
         
    * 改进:现在,图表 (但不是地图) 将扩展以填充画布上可用的空间,即传说中没有使用的空间. 您可以通过添加和操纵 &. size_%width_ 来获取高高的图表、 平方图表或宽的图表|高度_参数 (宽度和高度以像素表示画布的大小) 请求的 URL。 (这不是.graph网页上的选项 。 您必须手动将其添加到 URL 中 。) 如果您不指定 &. 大小参数, 对 . smallPng, . png, . groupPng, . smallPdf, pdf, 和. smallpdf. pdf 的请求会预设画布大小, 因此您的图表会扩展以填充可用的空间, 但通常大致是正方形 。 多亏了鲍勃·弗莱明
         
*    **东西ERDDAP™管理员需要知道和做:** 
    * 这样做:ERDDAP™现在需要Java17和相关的Tomcat 10. 你必须跟着ERDDAP™安装指令 (或等效物,例如,多克) 要安装Java17号 Tomcat 10号 复制你的\\[移动猫\\]从您的 Tomcat 8 安装到新的内容目录\\[移动猫\\]目录。 你不需要做其他改变ERDDAP与此更改有关的安装。 也就是说,ERDDAP™像以前一样工作
        
别忘了做ERDDAP- 更新Tomcat时对Tomcat的服务器.xml和上下文.xml的相关更改. 见ERDDAP因为[Tomcat 安装指令](/docs/server-admin/deploy-install#tomcat)。 。 。 。
        
我的感觉Java17是它更喜欢更多的处理功率和内存 对于长期运行,更大的应用程序,例如ERDDAP™,所以工作速度比Java8台低功率计算机 (例如,2个核心和最小内存) 并且工作速度略快于Java8台有较高功率的计算机 (例如,4+核心和丰富的内存) 。 。 。 因此,如果你看到糟糕的性能,使用Linux这样的程序[顶端](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)检查资源使用情况并考虑提供ERDDAP™更多的资源,尤其是更多的记忆。 记忆是便宜的&#33; 大多数手机的处理器和内存都比你们中有些人用来运行的服务器多ERDDAP来啊&#33;
感谢艾琳・特恩布尔
         
        
    * 要做到这一点:如果你使用ERDDAP™为了进入卡珊德拉,你需要继续使用Java你用来经营卡珊德拉号 切换到Java17 用于运行Tomcat+ERDDAP。 。 。 。
         
    * 建议: 如果您的服务器的CPU有 4+ 核心和 8+ GB RAM, 请考虑在您的服务器中更改这些设置datasets.xml文件 :
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

如果您的服务器资源较少, 请在这两个设置中坚持“ 1 ” 。
nThreads 系统用于EDDGrid从文件夹和 EDD 表格 Files大有改进。 这些变化带来了巨大的速度改进 (例如, nThreads 设置为 2 或更多时的 2X 速度) 对最具挑战性的请求 (当需要处理大量文件以收集结果时) 。 。 。 克里斯·约翰的一些相关修改 也会导致整个速度的提高ERDDAP。 。 。 这些修改的代码是由克里斯·约翰(Chris John)贡献的. 谢谢 克莉丝&#33;
         
    * 警告: 连字符输入datasetID's 已贬值,不再支持 (尽管技术上仍然允许) 。 。 。 他们可能在下次释放时被拒绝。 如果使用连字符,现在切换为下划线以避免麻烦. 如果你现在做出改变, 它以你自己的速度。 如果你等到下一次释放,你就会惊慌失措,不得不在当天处理.
         
    * 现在,为.htmlTable数据响应,如果字符串单元格中的数据包含数据:image/png;base64,然后是base64编码的.png图像,ERDDAP™将显示图标 (这样用户就可以看到图像,如果他们在它上徘徊) 并按键将文本或图像保存到剪贴板。 多亏了马可阿尔巴 (提供代码的人) 鲍勃·西蒙斯 (谁稍微修改了一下) 。 。 。 。
         
    * 新的: - 不添加标准名称
如果您运行生成时将 \\- doNoteAddStandardNames 作为命令行参数 数据集 Xml, 生成 数据集 Xml 将不添加standard\\_name页:1addAttributes除以纬度、经度、高度、深度或时间命名的变量以外的任何变量 (很明显standard\\_name编号) 。 。 。 如果您正在使用生成的输出, 这将会有用 数据集 Xml 直接输入ERDDAP™不编辑输出, 因为生成 数据集 Xml 经常猜测standard\\_name错的 (请注意,我们总是建议您在使用输出前先编辑输出ERDDAP。 。 。 。) 使用此参数将具有其他次要的相关效果, 因为猜测standard\\_name经常用于其他目的,例如,创建新的long\\_name,并创建颜色Bar设置。 感谢凯文·奥布莱恩。
         
    * 现在可以放&lt;更新MaxEvents &gt; 10&lt;/更新MaxEvents &gt; 输入datasets.xml  (在接近顶端的其他设置中) 以更改文件更改的最大数量 (默认=10) 由更新的Everynimillis系统处理。 数字 (100块?) 如果数据集必须随时更新,则可能有用。 见[更新MaxEvents文档](/docs/server-admin/datasets#updatemaxevents)。 。 。 感谢约翰·莫伊雷尔.
         
    * NEW:增加全球支持 "real\\_time事实|假的"字符串属性.
如果这是假的 (默认) 如果数据集不使用更新 每个NMillis,ERDDAP™将缓存对文件类型请求的回复,所有文件必须在之前创建ERDDAP™可以开始向用户发送回复,再利用时间最长可达15分钟 (例如,.nc, . png (中文(简体) ).) 。 。 。 。
如果设置为真, 或者数据集确实使用更新 每个NMillis,ERDDAP™永远不会缓存响应文件,并总是返回新创建的文件。
感谢约翰·莫伊雷尔.
         
    * 新:电子邮件现在以单独的电子邮件Thread发送. 这使得加载数据集和其他生成电子邮件的动作更快,因为loadDatasets不需要等待电子邮件的发送,这有时需要很长时间. 新系统每个电子邮件会话可以发送多封电子邮件,从而减少电子邮件服务器登录数量,并减少因电子邮件过于频繁而失败的风险. emailThread在状态.html的页面和诊断信息在log.txt-查找"emailThread"中有统计. 请注意, nEmailsPersession=0 的清点显示有问题, 即电子邮件会话无法发送任何邮件 。
多亏了鲍勃·西蒙斯
         
    * CHANGED:电子邮件现在发送的代码略有不同 (因为Java17 和更改为电子邮件Thread) 。 。 。 如果您无法发送电子邮件, 请发送电子邮件erd.data at noaa.gov。 。 。 。
         
    * New: 订阅动作, 即“ 触摸” 远程 URL 现在被处理为单独的触控 。 这使得加载数据集和其他能更快触摸URL的动作,因为加载Datasets不需要等待触摸完成,这有时需要很长的时间. 在log.txt-寻找"touchThread"中,有关于状态.html页面的触觉和诊断消息的统计.
多亏了鲍勃·西蒙斯
         
    * NEW:在状态.html的页面上,在"Major LoadDatasets Time Series"中,有一个新的"shed"栏,表示由于当前而降级的请求数量.ERDDAP™内存使用率太高。 被解析的请求将返回 HTTP 状态代码 503 “ 服务可用 ” 。 这些请求不一定是个问题。 他们只是忙着赶来 这是修改如何ERDDAP™处理高内存使用问题。
         
    * NEW:在Unix/Linux电脑上,现在状态.html的网页上有一条"OS Info"的行,有包括CPU负载和内存使用在内的当前操作系统信息.
         
    * 现在,何时ERDDAP™正在重新启动, 快速重开= true, 来自 Files 数据集的 EDDTable 将重用子集.nc独立.nc。 。 。 对于一些数据集来说,这大大缩短了装入数据集的时间 (例如,从60秒到0.3秒) 。 。 。 与新的电子邮件 Thread 和任务 Thread 一起 (见上文) ,这应大大加快重新启动ERDDAP™对许多人来说ERDDAP™设施。 感谢本·亚当斯和约翰·凯尔福特.
         
    * 改变:以前,孤儿数据集 (生活在ERDDAP™但没有在datasets.xml) 人们只是注意到了现状。 html 和 log.txt 在每次主要负载 Datasets 之后. 现在,他们自动从ERDDAP™并在状态.html和log.txt中注明,并发电子邮件到电子邮件 所有的东西。 因此,如果你想从中移除一个数据集ERDDAP™,现在你只需要移除它的块 xml indatasets.xml并在下一个大型负载Datasets中被移除。 多亏了鲍勃·西蒙斯
         
    * 在netcdf-java v5.5.2和v5.5.3中,知道BUG: 那个EDDGrid从垃圾 生成 Datasets 中的目录选项 Xml曾为THREDDS目录工作,其中包括远程THREDDS目录中对数据集的引用. 现在它没有了。 我向Netcdf-java开发商报告了这个问题。
         
    * BUG FIX:用于Docker用户通过设置设置.xml参数ERDDAPQQparam Name_: 用于整数和布尔参数 (电子邮件 Smtp 端口) , (中文).ERDDAP™正在错误地寻找仅仅 _paramName_。 现在它寻找...ERDDAP(原始内容存档于2017-09-29). QQparamName_. 多亏了亚历山德罗·德·唐诺
         
    * 变化:ERDDAP™测试系统现在使用自动系统来检查新创建的测试图像是否完全如预期. 感谢克里斯 约翰为建议,鲍勃·西蒙斯为执行.
         

## 版本2.18{#version-218} 
 (2022-02-23年发布) 

*    **新特征和变化 (用户) 数字 :** 
    * 无
*    **东西ERDDAP™管理员需要知道和做:** 
    * 布鲁克斯:.nc档案在某些情况下没有关闭。 瞷琌 感谢马可·阿尔巴,罗兰·施韦策,约翰·莫伊雷尔等人.
         

## 版本2.17{#version-217} 
 (2022-02-16号) 

*    **新特征和变化 (用户) 数字 :** 
    * 布鲁克斯: 修改后orderBy几年前,Tabledap's Make A Graph 处理不了很多使用orderBy_Xxx_. 现在有了 多亏了莫里斯·利比斯
         
    * 变化:前,ERDDAP™拒绝了关于.的请求。 透明 Png是当纬度和/或经度值部分或完全超出距离时. (ERDDAP™GitHub Issues #19, Rob Fuller发帖--感谢您发帖Rob) 现在它返回图像任何外延区域的透明像素. 这对许多客户端的应用程序是有用的. 更改代码以作出这种更改完全由克里斯·约翰完成. 非常感谢,克里斯&#33;
         
    * 变化:前,ERDDAP™在某个维度的索引值中拒绝网格dap请求\\[高: 低\\]。 。 。 现在它通过交换低值和高值使这些请求成为有效的. 这解决了用户和xtracto等外部程序的长期问题,它们必须跟踪少数纬度值从高到低的数据集,以便像请求那样进行请求\\[ (50个) 数字 : (20 (简体中文).) \\]因此,索引空间中的请求是\\[低:高\\]。 。 。 。 见 https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html 现在,一个请求像\\[ (20 (简体中文).) 数字 : (50个) \\]对于其中一个数据集,自动解释为\\[ (50个) 数字 : (20 (简体中文).) \\]。 。 。 。
         
    * CHANGED:.esriAscii 请求现在触发用户浏览器中的“文件:保存为”对话框。 感谢乔尔·范·诺德.
         
    * 布鲁克斯: 现在,如果一个儿童数据集的经度变量EDDGrid龙PM180或EDDGridLon0360数据集有一个valid\\_min和(或)valid\\_max属性,在EDDGrid龙PM180或EDDGridLon0360数据集. 多亏了罗伊·门德尔索恩
         
*    **东西ERDDAP™管理员需要知道和做:** 
    * 如果你已经设置&lt;数据 提供FormActive &gt; 为临时处理 XSS 脆弱性而弄虚作假,请将其放回真实状态。
         
    * 安全BUG FIX:数据提供者表格中的固定XSS脆弱性。 感谢热纳罗·康特雷拉斯·古铁雷斯.
         
    * 布鲁克斯: 当一个AWS S3 dirctory拥有超过1000个文件时,ERDDAP™扔了一个“ 内部错误 ” 。 现在修好了 多亏了安迪·齐格勒
         
    * 布鲁克斯:EDDGridSideBySide不允许变数sourceNames 在不同的儿童数据集中相同。 现在有了 多亏了约书亚·斯坦福
         

## 第2.16号版本{#version-216} 
 (2021-12-17年发布) 

*    **新特征和变化 (用户) 数字 :** 
    * 变化/后果: 由于各语文编辑的建议,翻译系统发生了许多小的改变。 感谢梅兰妮·阿贝卡斯西,马可·阿尔瓦,杰西·巴雷特,菲利佩·费尔南德斯,艾蒂安·戈丁,珍妮弗·塞瓦德詹,以及迈克·斯米特.
         
    * 根据Google Translate条款的要求,ADDD为Google Translate提供了适当的免责声明和归属. 还有&lt;html &gt; 在HTML中为每个网页贴上标记,现在正确识别非英文网页是机器翻译的。 多亏了迈克·斯密特
         
    * 布鲁克斯: 登录网页现在与不同的语言设置进行适当工作. 多亏了迈克·斯密特
         
    * 新建orderBy清点过滤器。 打开所有按钮EDDGrid数据访问表网页. 多亏了Marco Alba的代码贡献.
         
*    **东西ERDDAP™管理员需要知道和做:** 
    * 如果你有的话
        &lt;问 题 MarkImageFile &#123;&#125; 问 题 Mark.jpg&lt;/ 问 题 MarkImage 文件 &gt;
在您的设置. xml 文件中, 您需要删除整个标签 (建议使用默认文件) 或改为:
        &lt;(原始内容存档于2018-09-26). Question MarkImageFile &#123;&#125; Question Mark.png.&lt;/ 问 题 MarkImage 文件 &gt;
         
    * 变化:只是让你知道,[收养](https://adoptium.net/?variant=openjdk8)已取代 OpenJDK 作为主要/推荐来源Java  (打开JDK) 。 。 。 。
         
    * 变化: 日志文件来自ERDDAP™,生成数据 Xml,和DasDds现在是UTF-8,而不是计算机的默认字符集. 我做了很多检查,做了一些修改,以确保ERDDAP™总是在读或写各种文件时指定合适的字符集, 不再使用 (在若干案件中) 依赖于计算机的默认字符集. 这纠正了一些错误,并尽可能接近于尽可能多使用UTF-8的文件类型的目标 (例如,.log,.xml,.html,.json, (中文)..json升,.nc页眉) 。 。 。 注意许多较老的文件类型需要使用 ISO-8859-1 (例如,OPeNDAP.das, .dds,.csv, (英语)..tsv, (中文)..nc3个,.nccsv时,) 。 。 。 之前我曾试图与CF集团合作Unidata添加对 UTF-8 的支持.nc3个文件;两个文件都有阻力。
         
    * NEW:从 AWS S3 下载文件时,ERDDAP缓存 从Url系统进入EDDGrid从文件夹和 EDD 表格 从 Files 现在使用新的 AWS 传输管理器通过平行块下载文件 (这么快) 。 。 。 目标吞吐量设定为20Gbps,每个文件,因此这与所有AWS实例类型都效果良好,但尤其是那些具有优秀的"网络工作性能". 有了这个变化ERDDAP缓存 FromUrl系统现在提供了与xarray并行下载预切文件的方法相似的速度,但无需转换源文件..nc和.hdf输入块的 xarray 文件。 事实上,ERDDAP如果随后有人要求从同一文件读取,系统会更好,因为ERDDAP™现在有一个本地文件副本。 我们这个社区花了多年的时间来实现.nc和.hdf文档。 现在,我们不必把这些都扔出去,只是为了在AWS S3存储数据时获得良好的性能. 多亏了Rich Signell
         
    * 变换:搜索Engine=Lucene 目前已贬值. 它是一个复杂的系统,经常产生结果,结果与SearchEngine=Industrial的更理想行为略有不同。 对于几乎所有ERDDAP™设备 卢塞内节省的时间 并不能抵消结果的差异 如果可能, 请使用搜索 Engine= 原版 。 如果造成问题,请通过电子邮件Bob。
         
    * 变换:Lucene搜索Engine现在的行为更像原版搜索Engine. 不再有Lucene认为数据集匹配而原版不匹配的情况. 另外,卢塞内的排名 现在等于原创的排名 (因为原创现在总是用来计算排名) 。 。 。 。
         
    * 布鲁克斯: 从最近一期开始ERDDAP™在给定的AWS S3桶中不再看到超过前1000个对象. 现在,ERDDAP™再次看到所有物体。 多亏了安迪·齐格勒
         
    * BUG FIX: 现在 EDDTable 外加门 删除行actual\\_range属性,当一个或数个儿童数据集不知道其变量时  'actual\\_range  (例如,数据库中的EDD表) 。 。 。 多亏了埃里克·盖莱蒂
         

## 2.15版本{#version-215} 
 (2021-11-19 发布) 

*    **新特征和变化 (用户) 数字 :** 
    *   ERDDAP™拥有一个新的系统让用户指定所有网页所使用的语言. 如果出现ERDDAP™设置使用,语言列表将出现在每个网页的右上角。ERDDAP™URL来自这个版本继续工作之前,总是像以前一样返回英文内容.
        
并非所有文本或所有网页都翻译过。 这个项目有时间限制,使得齐和鲍勃无法达到100%.
        
显而易见的问题是:当Chrome将翻译网页时,我们为什么为此付出了如此大的努力? 答案是:这样,我们就能对翻译工作进行更多的控制。 值得注意的是,有许多词语不应该在网页上翻译,比如数据集的标题和摘要,变量的名称,参数,单位和组织. 翻译工作的大部分工作是找出不应该翻译的词汇和短语. 此外,机器翻译倾向于操纵某些类型的HTML标记。 管理翻译使我们能够尽量减少这一问题。
        
翻译工程由齐 Zen做 (a Google 代码暑假实习生) 和鲍勃西蒙斯使用 Google 的翻译网络服务。 这是一个巨大的项目。 谢谢 齐&#33;
        
    * 布鲁克斯:ERDDAP™现在允许ORCIDID拥有X作为最后一个数字. 多亏了莫里斯·利比斯
         
*    **东西ERDDAP™管理员需要知道和做:** 
    * 这样做:
        
        * 您需要做一些与ERDDAP'让用户指定网页语言的新系统.
            * 在您的设置的第一行. xml和datasets.xml文件,更改为: 编码="UTF-8",并更改文档在文本编辑器中的编码,以保存为UTF-8文件. 生成数据 Xml现在假设datasets.xml是一个 UTF-8 文件。
            * 编译程序员ERDDAP数字 : 全体ERDDAP™.java文件默认应作为UTF-8文件处理. 您可能需要在 Javac 命令行中添加“ 编码 UTF-8 ” 。 (没错) 
            * 启用此系统 (强烈建议) 时,&lt;启动您指定的BodyHtml5 &gt; 标签datasets.xml,将“ &amp&#33;loginInfo;”改为“ &amp&#33;loginInfo;”|amp&#33; language;" 这样语言列表就会出现在每个语言的右上角ERDDAP™网页。
            *   ERDDAP™仅使用&lt;启动您指定的BodyHtml5 &gt; 标签datasets.xml指定每条横幅上方的 HTML 内容ERDDAP™网页,无论用户选择何种语言。 如果您更改了要使用的标记
" , "&EasierAccessToScientificData;" 而不是“更容易获得科学数据”和
" , "&BroughtToYouBy;"而不是"给你带来,"ERDDAP™将使用翻译版的这些语句在横幅上。
            * 同样,新的默认&lt;字符串描述Html&gt; indatasets.xml这是
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
最后3行的内容是将被翻译文本取代的东西. 如果你把其中任何一种改变 (特别是这个( This) 特别是埃尔达普;) 或所有案文改为:datasets.xml  (如果有优先权,则) 或信件.xml,无论用户选择何种语言,该文本都会出现. 这不完美 但我觉得很少有管理员想编辑&lt;在35个不同文件中提供35个不同版本的该标签翻译版本。
        
          
         
    * CHANGED:一些错误现在处理略有不同,因此可以添加到状态.html和每日报告电子邮件上的"失败请求"的清点中. 所以这些数字可能比以前大一些。
         
    * BUG FIX: 生成数据 Xml 为EDDGrid(原始内容存档于2017-03-30). Lon0360 and.EDDGridLonPM180 现在排除了源数据集datasetID。 。 (笑声)\\*(原始内容存档于2018-09-26). LonPM180" and.datasetID。 。 (笑声)\\*(原始内容存档于2018-03-30). LON0360, 分别是.
         

## 第2.14号版本{#version-214} 
 (2021-07-02版发布.) 

*    **新特征和变化 (用户) 数字 :** 
    *    (无)   
         
*    **东西ERDDAP™管理员需要知道和做:** 
    * 纽约:EDDGridLon0360,它使一个带网格的数据集具有经度值 & gt;=0 和&lt;=360来自经度值(gt;)的网格数据集=-180和&lt;=180 (韩语). 见[EDDGridLon0360 文档](/docs/server-admin/datasets#eddgridlon0360)。 。 。 。 多亏了戴尔·罗宾逊
         
    * 纽约:ERDDAP™管理员现在可以通过一个命名的环境变量来覆盖设置.xml中的任何值ERDDAP运行前的 XQ值Name _ERDDAP。 。 。 。 例如,使用ERDDAPQQBaseUrl 覆盖&lt;baseUrl &gt; 值。 部署时可以方便ERDDAP™带有容器,因为您可以在设置.xml中设置标准设置,然后通过环境变量提供特殊设置。 如果向下列人员提供秘密信息:ERDDAP™通过这一方法,确保检查信息是否仍然保密。ERDDAP™每个启动时只读一次环境变量, 在启动的第一秒钟, 所以使用的方法之一是: 设置环境变量, 启动ERDDAP™时,等待ERDDAP™,然后取消环境变量。 多亏了马克·波蒂埃
         
    * 改进:如果在EDD表里有些文件来自... 有很多文件的文件数据集具有一些非常长的字符串值,数据集会更快地加载,并更快地响应请求. 前情提要,前情提要,ERDDAP™将分配许多空间,用于存储在此类数据集文件信息的文件中的分钟和最大字符串值。 由此产生的文件非常庞大,导致其写作和阅读缓慢. 感谢OBIS。
         
    * 现在,ERDDAP™在 CSV 文件中更好地解释异常和无效字符序列。 感谢OBIS。
         
    * FIX:在与卡珊德拉遭遇了一年的麻烦之后,我终于成功安装了卡珊德拉. (数字 2) 和卡珊德拉V2一起重新运行测试 所以现在我可以更自信地说ERDDAP™与卡珊德拉v2和v3合作. 多亏了ONC.
         

## 第2.12号版本{#version-212} 
 (2021-05-14年发布) 

*    **新特征和变化 (用户) 数字 :** 
    * 布鲁克斯: 如果你在订阅黑名单中,你现在不能要求你的订阅名单.
         
*    **东西ERDDAP™管理员需要知道和做:** 
    * To Do: New:系统自动限制恶意用户和过度激进的合法用户同时提出大量请求的能力,这会降低其他用户的系统性能. 有3个新的可选标签datasets.xml可以在之后添加&lt;图背景颜色 &gt; :
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

详情见[ipAddressMax 请求](/docs/server-admin/datasets#ipaddressmaxrequests)。 。 。 。ERDDAP™现在还打印了“唯一用户的数目”。 (自启动以来) " 在状态.html页面.
多亏了那个在中国攻击我的人ERDDAP™安装。
         
    * 变换为 Postgresql 驱动行为 : 当我更新 Postgresql 驱动程序时, Postgresql 和 GenerateDatasetsXml 生成的表格列表中的列名会像以前一样,回到所有大写,而不是所有小写. 我不知道这是否会影响其他事物 因为数据库常常认为这些名字对案件不敏感 我的测试数据组仍然有效 但是,如果你的数据集停止工作ERDDAP™更新后,这是可能先追求的原因。
         
    * 布鲁克斯:ERDDAP™现在也正确处理私有的 AWS S3 文件 。 对AWS S3文件的处理也有其他相关改进. 多亏了迈克尔·甘格尔和迪伦·普格
         
    * 纽约:EDDGrid从NcFiles和EDDGrid从NcFiles调用 现在可以从“结构”中读取数据。.nc经常预算:.hdf4个档案。 要识别一个来自结构的变量,&lt;sourceName&gt; 翻译: 必须使用格式:_fullStructureName|_会员Name_, 例如 group1/myStruct|我的成员。 感谢NRL。
         
    * CHANGED: 现在, 如果当前内存使用量加上这个请求甚至略高, 网格dap 集 此请求的 nThreads 到 1 。 因此,ERDDAP™当记忆稀缺时保存记忆. 多亏了那个在中国攻击我的人ERDDAP™安装。
         
    * 监视打开文件数量的新系统 (包括套接字和其他一些东西,而不仅仅是文件) Linux电脑上的Tomcat。 如果一些文件错误地从未被关闭,打开的文件数量可能会增加,直到超过允许的最大数量,并发生许多真正的坏事. 现在Linux电脑上 (无法为 Windows 提供信息) 数字 :
        
        * 状态的极右侧有一个新的“ 打开文件” 栏目. html 网页显示最大文件打开百分比 。 在Windows上,它只是显示"?".
        * 何时ERDDAP™生成在每个主要数据集重载结束时的信息,它将打印到日志中。 txt 文件 :
打开“%%%%%%%%%%%% ”
        * 如果百分比大于50%,则发送电子邮件给ERDDAP™管理员和电子邮件 所有的东西 去电子邮件地址
        
找到更多, 或者你是否看到这个问题 在你的ERDDAP™,见[太多的打开文件](/docs/server-admin/additional-information#too-many-open-files)。 。 。 。
多亏了那个在中国攻击我的人ERDDAP™安装。
         
    * NEW:我增加了很多检查和处理"太多打开的文件",所以任务只是停止了,用户看到错误消息. 如果读取数据文件导致"太多打开的文件"错误,则数据文件将不再被标记为不良.
         
    * 新建\\[大家长会\\]/ badFilesFlag 目录 :
如果您在此目录中添加一个文件datasetID作为文件名称 (文件内容不重要) , (中文).ERDDAP™将删除不良的文件夹.nc该数据集的文件 (如果有的话) 并尽快重新装入数据集。 这导致ERDDAP™重新尝试之前的文件 (错了吗?) 标记为坏。 多亏了马可阿尔巴
         
    * 更改: 启动时, 如果EDDGrid从... 文件数据集最初在其已知有效文件列表中有0个文件 (例如,它是一个新的数据集) ,则ERDDAP™推迟加载并设置一个标记,以便在完成主要加载Datasets后,它可以ASAP加载. 这将在新数据集出现时加快初始启动.
         
    * 更改: 文件 VisitorDNLS.testAWSS3 () 和文件查看器Subdir.testAWSS3 () ; 现在使用 AWS v2 (不为v1) (原始内容存档于2017-09-21). SDK. 所以现在的基特人ERDDAP™现在的分发包含所有需要的文件,您不再需要手动添加巨大的 v1 AWS SDK 罐文件了.
         
    * 我转而使用Maven来检测/采集依赖性 (/lib中的 .jar 文件) 。 。 。 AWS SDK 的 v2 更改就有必要这样做。 今后其他进口代码也需要该编码。 非常感谢凯尔·威尔科克斯,他提供了他创造和使用的pom.xml,这为我解决了几个问题.
         
    * CHANGED:类路径参数 (- 密码) 用于生成DatasetXml、 DasDds 和其他随附的小程序ERDDAP™,在给程序员的建议中,现在要简单得多,不应该再改变,因为它指的是目录,而不是单个文件:
\\-cp 类; C:\\ programs \\ tomcat\\ lib\\ servlet- api. jar; lib &#123;&#125;
         (或 “:” 代替“;” 用于 Linux 和 Macs) 。 。 。 。
         (几年前我应该这么做 当它成为一个选择。)   
         
    * 新建: 生成 Datasets Xml 有一个新的工具选项: 查找重复时间, 它将通过网格集搜索.nc  (及有关事项) 查找具有重复时间值的文件的文件。 见[查找重复 时间](/docs/server-admin/datasets#findduplicatetime)  
         
    * 纽约:datasets.xml现在可以包括&lt;调色板 &gt; 覆盖该调色板的标签&lt;调色板 &gt; 标签值来自信件. xml (或返回信件的值。xml 如果它是空的) 。 。 。 您可以在此更改可用的调色板列表 。ERDDAP™正在运行。 另外,如果你在目录中有一个cptfiles子目录ERDDAP™内容目录,ERDDAP™将把目录中的所有 QQ.cpt 文件复制到\\[移动猫\\]每次/webapps/erddap/WEB-INF/cptfiles目录ERDDAP™开始 这些更改加在一起,可以添加调色板,并且在安装新版本的调色板时,使这些更改保持不变。ERDDAP。 。 。 。 见[调色板文档](/docs/server-admin/datasets#palettes)  
多亏了詹妮弗·塞瓦吉安 梅兰妮·阿贝卡西斯 还有也许其他海岸观察者
         
    * 改变: [&lt;慢下来的TroubleMillis &gt;] (/docs/server-admin/datas# slowdowntroublemilis 页面存档备份,存于互联网档案馆 互联网档案馆的存檔,存档日期2014-12-22.) 现在用于所有失败的请求,而不仅仅是少数类型。
         
    * CHANGED: 运行LOADDASTS 线程在 3/4 装入DASTS 时中断 LOUDDASTS 线程 MaxMinutes 所以LoadDataset有更多时间注意中断和优雅的退出. 还有更多更好的诊断信息。
         
    * CHANGED 从旧版的卢塞内到v8.7.0.
         
    * 更改:ERDDAP™现在以固定宽度字体出现。
         
    * 变化:EDDGrid从 FIRST 获取轴值和属性|LAST 文件, 按&lt;元数据从&gt;。 谢谢 (没有) 参见Ken Casey等人。
         
    * 对最近文件错误使用的无效单位“度北”和“度东”的 ADDED 支持 (2020-10-01年以来) 在AVHRR开拓者版本5.3 L3-编译 (L3C级) SST 数据集 (编号PH53sstd1天和ncePH53 时间sst无1天) 。 。 。 。ERDDAP™现在可以将它们标准化为有效的单位。 谢谢 (没有) 参见Ken Casey等人。
         

## 第2.11号版本{#version-211} 
 (2020-12-04年发布) 

*    **新特征和变化 (用户) 数字 :** 
    * BUG FIX:如果一个变量只有一个QQFillValue或缺少QQ, OrderByMean会扔出一个 NullPointer Exception 数值定义 。 现在它正确处理情况。 多亏了马可阿尔巴
         
    * 布鲁克斯: 由 ODV 创建的 ODV 文本文件存在问题ERDDAP™在v2.10中。 这些问题已经解决。 多亏了肖恩·贝尔
         
    * 布鲁克斯: 刚刚进来ERDDAP™v2.10:如果在 URL 中指定了 lat lon 边框,那么在世界地图上没有绘制边框. 现在又来了 感谢约翰·莫伊雷尔.
         
*    **东西ERDDAP™管理员需要知道和做:** 
    * 布鲁克斯: 刚刚进来ERDDAP™v2.10: ArchiveAdataset, GenerateDataset 的脚本文件 Xml 和 DasDds 不起作用,因为他们没有 改变阶级路径ERDDAP™v2.10,现在有了 多亏了马可阿尔巴
         
    * 内:datasets.xml,您现在可能有标记:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

目前, 如果为真 (如果标签是空的, 或者标签不在文件中) ,当用户的请求导致NullPointerException,ERDDAP™将发送堆栈追踪到erd.data at noaa.gov  (联合国ERDDAP™开发团队) 。 。 。 这应该是安全的,因为没有机密信息 (例如,请求) 包含在电子邮件中。 这应该能够捕捉到任何导致NullPointerExceptions的模糊,完全出乎意料的bugs. 否则,用户会看到例外,但ERDDAP™开发者不会,所以我们不知道有问题需要解决.
        
这个标签有可能导致其他类似的诊断信息被电子邮件到erd.data at noaa.gov未来 电子邮件的内容将永远是最小的,并且与错误有关,而不是例如使用信息. 多亏了马可阿尔巴
         
        
    * 更改: 现在, 常用压缩文件类型 (.bz2, (中文)..gz, (中文)..gzip, (中文)..tar, (中文)..tgz, (中文)..z, (中文)..zip) 也禁止字节范围请求。 可通过&lt;在信件.xml 中不请求扩展名。
         
    * 问题: 一样ERDDAP™2.10, (中文(简体) )..ncml 文件试图改变属性,不要改变属性. 这是我报告过的Netcdf-java中已知的bug, 他们说在Netcdf-java的下一次发布时会固定.
         

## 第2.10版 (中文(简体) ).{#version-210} 
 (2020-11-05发布.) 

*    **新特征和变化 (用户) 数字 :** 
    * 新的:[内插](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)转换器从网格化数据集的值中高效地插入值. 因此,它对于研究动物轨道数据的研究人员特别有用。 此转换器在带有经度、经度和时间列的表格中 (可能还有其他栏) 并返回带有内插值的额外列的表格。 因此,这类似于大众[X 实际](https://coastwatch.pfeg.noaa.gov/xtracto)剧本最初由Dave Foley创建,但提供每个请求最多100分的处理优势. 感谢戴夫·福里和乔丹·沃森 (NMFS) 。 。 。 。
         
    * IMPROVED:高级搜索现在对非.html请求严格. 它现在将对有永久错误的请求提出例外 (例如,在 minLat &gt; 最大Lat 中请求) 或临时错误 (例如,请求standard\\_name这根本不存在) 。 。 。 对于.html请求,Advanced Search是不变的:和Google搜索一样,它尽其所能,默默地修正或忽略错误. 多亏了Rich Signell
         
    * 改进:高级搜索页面上的地图现在更大 (你还是要偷看,但少看) 更准确 (但仍不完美) 。 。 。 感谢约翰·莫伊雷尔.
         
    * IMPROVED: Make A Graph网页上的"草地面具"设置和请求地图的URL中的 &.land=.设置现在支持另外两个选项:
"外线"只是绘制了陆地表大纲,政治界限,湖泊和河流.
"关闭"不画任何东西。
见[&. land=... 文档](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)。 。 。 。
感谢约翰·莫伊雷尔.
         
    * 改进:ERDDAP™现在可以使用三种新的标记类型: 无边界填充广场,无边界填充圈,无边界填充三角. 其代码由ETT/EMODnet物理的Marco Alba提供. 多亏了马可阿尔巴
         
    * 纽约:"files"系统现在支持 plain 文件类型回复 (.csv, . . 克西夫, ..htmlTable, (中文)..itx, (中文)..json, (中文)..jsonlCSV1, (中文)..jsonlCSV, (中文)..jsonlKVP, (中文)..mat, (中文)..nc, (中文)..nccsv, (中文)..tsv,或.xhtml。 。 。 。) 例如,[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)。 。 。 。
多亏了凯尔·威尔科克斯
         
    * 改进:用户使用数据访问表时生成的 URL (.html (中文(简体) ).) 或一个 Make-A-Graph (图片) 网页现在正确 %- 编码字符\\[和\\]。 。 。 这使得URL对人类的阅读有些困难,但从网络安全的角度来说更好. 管理员现在可以选择设置宽松查询QeryChars=  '\\[\\]|' 在Tomcat服务器.xml 文件 (不安全) 或者没有 (较安全) 。 。 。 。
感谢安托万·奎里克,多米尼克·富勒-罗威尔等人.
         
    * NEW: 如果对 EDDTable 数据集的请求包含( A) 变量 何处 (属性(_A) 名称、属性 数值_) , (中文).ERDDAP™将添加所有属性(_A) 名称=属性 值 _ 到请求变量列表 。
见[添加( A) 变量 文档](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere)。 。 。 感谢奥雷利·布赖恩德等.
         
    * 改变:ERDDAP™现在拒绝 / files/ 的字节区域请求.nc或.hdf文档。 不要试图连接到远程.nc或.hdf文件如同本地文件。 它效率低下,常常造成其他问题。 相反:
        * 使用(OPeN)DAP要连接的客户端软件ERDDAP因为DAP本数据集的服务 (具有/网格/或/tabledap/ 在 URL 中) 。 。 。 。 就是这样DAP这是为。
        * 使用数据集的数据访问表请求一个数据子集.
        * 如果您长期需要整个文件或重复访问, 请使用curl, (中文).wget,或下载整个文件的浏览器,然后从本地文件副本中获取数据。
             
    * 改进:.odv Txt 输出选项已被重写以支持新版本的ODV .txt文档,并支持正确显示轨迹、时间序列和剖面数据。
         
    * IMPROVED:现在,双引号中的搜索词被解释为json字符串,因此可以有\\编码字符. 除其他外,这可以让你搜索一个属性的确切匹配,例如"Institution=NOAA\\n"不会匹配一个数据集与机构=NOAA NMFS。 。 。 多亏了丹·诺瓦茨基
         
    * 改进:在其它地方,浮点数 (特别是转换成双倍浮点数) 现在作为数字的略微四舍五入的版本出现在其他地方,例如以前显示为32.279987296875的双倍浮标,现在可能显示为32.28。 多亏了凯尔·威尔科克斯
         
    * BUG FIX:未签名的整数音频文件被略微误读. 现在他们被正确解读。
         
*    **东西ERDDAP™管理员需要知道和做:** 
    * 警告:你第一次逃跑ERDDAP™v2.10, 一些基于本地数据文件的数据集将装入 **非常喜欢** 慢慢来 因为ERDDAP™需要重建其文件信息数据库。 在缓慢的初始重载后,它们会像以前一样快速加载. 请耐心点
         
    * 事情你必须做:
        * 当您第一次运行 v2. 10 时, 有些数据集可能不会加载, 因为ERDDAP™现在对一些元数据更为严格。 和以前一样ERDDAP™第一次装入时, 将发送电子邮件给您 。 这将包括未加载的每个数据集的错误消息 。 读取错误消息以找出问题 。 在大多数情况下,你只需要对数据集的元数据做一个小的改变来解决问题.
             
        * 内datasets.xml搜索&lt;sourceName& gt; = (帮助) (说明'='符号,表示[固定价值sourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) 。 。 。 。 对大多数ERDDAP™设置,这是罕见的。 如果后面有任何数值'='是字符串 (非数字) ,您现在必须把字符串用双引号附加。 举例来说,
在此之前:&lt;sourceName& gt; = KZ401 数据&lt;页:1sourceName&gt; 翻译:
之后:&lt;sourceName& gt; = “ KZ401 ”&lt;页:1sourceName&gt; 翻译:
             
        * NEW:在设置.xml中有一个新的可选设置,&lt;默认可访问ViaFiles&gt;,设置默认&lt;每个数据集都可以访问ViaFiles。 此新标签的默认是虚假的, 它模仿了上一个ERDDAP™行为 此低级设置会被给定的数据集所推翻&lt;可访问ViaFiles &gt; 设置。
            
建议 (因为有用户想要这个) 数字 :
如果你想让所有的EDD... 从文件系统访问的 Files 数据集,然后
            
            1. 将此标签添加到您的设置. xml 文件 :
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (可选) 删除全部
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
输入datasets.xml因为默认是真实的
                 
        * 添加 QQ 过滤属性 :
            ERDDAP™用于所有整数变量的默认 QQFillValue: 数据类型的最大值 (例如,127个字节变量) 。 。 。 现在它没有了。 为了避免将这些值显示为数据值 (不缺少数值) ,您需要通过 QQFillValue 属性明确声明这些属性。 从现在开始,每次你开始ERDDAP™,它将向管理员发送一个带有 .csv 表格的电子邮件,其中包含没有 QQFillValue 的整数源变量列表或missing\\_value属性,以及建议的新 QQFillVale 属性。 见[添加 QQ 过滤 数值属性](/docs/server-admin/datasets#add-_fillvalue-attributes)需要更多信息和指示。
             
        * 如果您编译ERDDAP™,您需要修改javac命令行上的类路径参数,以添加这些新罐子的引用:lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar. 。 。 。
             
    * CHANGED:Tomcat 9现在是Tomcat的推荐版本,用于ERDDAP。 。 。 最新版本的Tomcat 8.5+目前也很好. 我们打扫干净了ERDDAP因为[Tomcat 安装指令](/docs/server-admin/deploy-install#tomcat)。 。 。 。
        
最新版本为:Java第8条 (没有Java9, 10, 11, ...... (英语).) 从[通过 OpenJDK](https://adoptopenjdk.net/)建议的版本Java(单位:千美元)ERDDAP。 。 。 。Java8有长期支持从领养OpenJDK,所以仍然安全使用,但记得为了安全原因定期获得最新版本.
        
    * NEW: 脚本源名称/ Tabular 数据集中的衍生变量
EDD Table fromFiles, EDD Table from Database, 以及 EDD Table from FileNames 数据集现在可能包含下列表达式和脚本:sourceName。 。 。 这使得您可以根据源文件中的现有变量来制作新的变量。 给定新变量的计算是在结果的一行内完成的,对所有行都反复进行. 例如,将数值在−180 - 180°之间的经度变量与数值在0 - 360°之间的变量制成:
        &lt;sourceName& gt; = Math2. anglePM180 数据 (行. 栏 ("龙") ) &lt;页:1sourceName&gt; 翻译:
详情见[脚本源名](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
多亏了鲍勃・西蒙斯 (之前策划的ERDDAP™v1.0 最终找到了执行的方法) Kevin O'Brien, Roland Schweitzer, John Maurer, 以及Apache JEXL 图书馆 做真正的困难部分 (和做得很好,并做到这一点) 。 。 。 。
         
    * NEW: 未签名的整数数据类型 (ubyte, ushort, uint, ulong (乌比特语)) 现在被支持。 注意许多文件类型 (例如,.das、.dds、.dds、.dds、.dds.nc3个) 不要支持所有这些新的数据类型。 见[数据 文件类型](/docs/server-admin/datasets#data-types)详细介绍如何ERDDAP™处理这些差异。 值得注意的是,由于(OPeN)DAP, 特别是 .dds 响应, 不支持签名字节、 长或 ulongs, 您可能想要使用ERDDAP以表格形式表示的.das和.das,见于http.../erddap/ (英语). **信息** / _ 时间datasetID_.html 网页 (比如说,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) 您也可以在其它文件类型或.nccsv元数据响应 (比如说,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) ,两者都支持所有情况下的所有数据类型.
        
警告:对于受这一变化影响的数据集,你可能会看到数据集存在问题,因为数据ERDDAP™从来源读取可能不同 (例如,先前被读作签名整数的变量现在可读作无签名整数) 。 。 。 由此产生的问题包括:没有在数据集中添加新文件,以及/或尝试访问数据时出现错误. 如果数据集有问题,首先要尝试[设置困难 旗帜](/docs/server-admin/additional-information#hard-flag)用于数据集。 如果这不能解决问题 那你就得看看日志 txt 查看错误消息, 深入到datasets.xml用于数据集,和/或可能为数据集重新运行生成Datasets.xml。
感谢Netcdf-java 5.x (迫使这一问题) 以及即将到来的CF 1.9。
        
    * 现在有了[更好的文件/咨询](/docs/server-admin/datasets#s3-buckets)用于从 AWS S3 桶中的文件创建数据集。 多亏了米迦温格伦
         
    * 更改: 与"files"系统。
        * 处理这个的代码被重写为可供更多类使用.
             
        * NEW:用户请求目录列表现在可以通过附加想要的文件扩展名:.csv,请求将响应作为标准普通表格类型之一..htmlTable, (中文)..itx, (中文)..json, (中文)..jsonlCSV1, (中文)..jsonlCSV, (中文)..jsonlKVP, (中文)..mat, (中文)..nc, (中文)..nccsv, (中文)..tsv,或.xhtml) (中文(简体) ). 举例来说,
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
感谢凯尔·威尔科克斯和谢恩·圣萨维奇.
             
        * 改进:现在,生成 数据集 Xml不会包括一个&lt;在输出中可访问ViaFiles &gt; 标记。 假设是,数据集将依赖于新数据的价值。&lt;默认可访问ViaFiles &gt; 在设置.xml中标记。 见[无障碍 虚拟文件](/docs/server-admin/datasets#accessibleviafiles)。 。 。 。
             
        * 改进:其他数据集类型现在可以访问 虚拟文件 :EDDGrid侧翼,EDDGrid综合差异,EDDGrid从Erddap,EDD Table 从Erddap,EDDGrid从EDDDable, EDD表从EDDGrid,以及EDDGrid从伊陀波. 对于这些,只有在父母和远程/儿童数据集都能够访问的情况下,才能调阅来自某一远程/儿童数据集的文件 ViaFiles 设置为真( 可能通过&lt;默认可访问ViaFiles &gt; 。 多亏了达米安·史密斯和罗布·富勒
             
        * 完成/建议:我们建议通过设置使所有相关数据集可通过文件系统访问&lt;默认AccessibilityViaFiles &gt; 在设置.xml中为真,因为有一群用户希望获得数据。 除其他原因外,"files"系统使得用户很容易看到哪些文件是可用的,以及它们最后一次更改时,从而方便用户维护自己的整个数据集副本. 如果您一般不想通过文件系统访问数据集, 设置&lt;默认可访问ViaFiles &gt; 到虚假。 无论是哪种情况,只要使用&lt;可访问ViaFiles &gt; ,用于作为一般政策例外的少数数据集&lt;默认可访问ViaFiles &gt; (例如,当数据集使用时.ncml 文件,对用户并不真正有用) 。 。 。 。
             
    * 改进:现在,如果一个源数据集有 CF 网格映射信息,则生成 数据集 用于网格数据集的 Xml 会将信息添加到全局&lt;页:1&lt;sourceAts &gt; 每次从文件中读取数据。 信息将出现在数据集的全局属性中,作为一组带有前缀格点的属性.
         
    * 改进:在阅读时支持群体.nc页:1 (并在某种程度上.hdf页:1) 文档。 一般来说,ERDDAP™数据集将从文件组中的一个变量中构建。 同时,生成 Datasets Xml 为EDDGrid从NcFiles和EDDGrid从NcFiles调用 现在没有包装了,要组 (例如,对于任何/所有组,“某些组”,“某些组/某些子组”,或“\\[根号\\]" 只为根组) 。 。 。 感谢查尔斯·卡莱顿和杰西卡·豪斯曼.
         
    * 改进:生成数据 Xml 为EDDGrid从NcFiles和EDDGrid从NcFiles调用 现在未包装支持一个可选的“ DimensionsCSV” 参数, 它允许您指定您想要此数据集使用的维度的源名称 。 使用""来获取最使用维度的变量,和以前一样. 另外,与这类文件一起发生的一个相关的小错误现在被固定了. 感谢苏雅尔·马南达尔.
         
    * BUG FIX: 生成数据 Xml 现在正确列出“ EDDable From JsonlCSVFiles ” (而非"EDDTable From JsonlCSV" (美国英语).) 作为 EDDType 选项之一. 多亏了安迪·齐格勒
         
    * 改进:EDDGrid从NcFiles调用 将“单位”属性标准化为标准/“分类”单位 (与单位转换器相同的方法) 。 。 。 。 举例来说,"meter per second", (中文)."meters/second", (中文)."m.s^-1",以及"m s-1"所有变成"m s-1"。 。 。 。 多亏了安迪·齐格勒
        
警告: 这可能会给一些现有数据集带来问题 (例如, 使新文件被标记为“ 坏 ”) 。 。 。 。 如果是这样,[设置困难 旗帜](/docs/server-admin/additional-information#hard-flag)用于数据集,以便所有源文件都将与新系统重读。
        
    * 现在,一个变量的&lt;sourceName&gt; 可指定一个=NaN的固定值,变量可以有一个actual\\_range属性,指定一个有限范围。 这有时有用 这样一个数据集 (特别是文件名数据集的 EDD Table) 可以有假变量 (编号)   (例如纬度、经度、时间) 中,有 NaN 的固定值,但有一个有效的actual\\_range  (由属性设置) 。 。 。 然后,在高级搜索中,一个用户可以搜索有特定纬度、经度、时间范围数据的数据集,而这个数据集将能够说它确实有相关数据 (虽然所有实际的数据行都会显示 NaN) 。 。 。 。 见[固定价值文件](/docs/server-admin/datasets#fixed-value-sourcenames)。 。 。 。
多亏了马修·比德尔
         
    * 现在,datasets.xml用于 EDD Table FromAsii Files 或 EDD Table FromColumnarAsii Files 数据集的块可以包含一个告诉ERDDAP™以忽略文件顶端的所有行,包括匹配指定正则表达式的行。 举例来说,
        &lt;跳过标题Tregex &#123;&#125;\\*键\\*键\\*结束头部。\\*&lt;/skipheaderTregex] (英语).
将忽略所有行到并包含一条以 " 开头的行 "\\*\\*"头的尽头" 见[&lt;跳过标题Trogex &gt; 文档] (/docs/server-admin/数据集#skipheadertoregex) 。 。 。 。
多亏了Eli Hunter
         
    * 现在,datasets.xmlColumnarAscii Filesdataset的 EDD Tables 或 EDD Tables 的块可以包含一个标签,该标签显示ERDDAP™以忽略文件中符合指定正则表达式的所有行。 举例来说,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

将跳过所有以"#"开头的行。 见[&lt;跳动LinesRegex &gt; 文档] (/docs/server-admin/datasets#skiplinesregex 页面存档备份,存于互联网档案馆) 。 。 。 。
感谢Eli Hunter。
         
    * 纽:datasets.xml用于 EDD Table 数据集的块现在可能包括添加( A) 变量 何处 (属性名称CSV_) 。 。 。 。 如果是这样ERDDAP™将为每个指定属性添加部件 数据集数据访问表的名称 (.html网页) 以方便用户添加( A) 变量 何处 (属性(_A) 名称、属性 数值_) 对请求。
见[添加( A) 变量 文档](/docs/server-admin/datasets#addvariableswhere)。 。 。 。
感谢奥雷利·布赖恩德等.
         
    * 新建 第三方工具:ERDDAP- lint (英语)
        ERDDAP-lint是一个来自爱尔兰海洋研究所的Rob Fuller和Adam Leadbetter的程序,你可以用来改进你的元数据ERDDAP™数据集。ERDDAP-lint 包含规则和一个简单的静态网络应用程序,用于对您进行一些验证测试ERDDAP™服务器。 所有测试都在网页浏览器中运行". 喜欢[Unix/ Linux 林特工具](https://en.wikipedia.org/wiki/Lint_(software)),可以编辑现有的规则或添加新的规则。 见[ERDDAP- lint (英语)](https://github.com/IrishMarineInstitute/erddap-lint)更多信息。
        
这个工具对于您之前创建的数据集特别有用, 现在想要更新您当前元数据偏好 。 例如, GenerateDatasets 的早期版本 Xml没有做出任何努力来创建全球creator\\_name, (中文).creator\\_email创建者类型,或creator\\_url元数据。 你用得着ERDDAP- 显示缺少元数据属性的数据集。
        
多亏了罗布和亚当 创造了这个工具 并把它提供给ERDDAP™社区。
        
    * NEW:现在可以了,如果一些文件在一个EDDGrid从Files数据集没有所有数据集的变量. 文件将被包含为有变量 (包含所有缺失的值) 。 。 。 。
多亏了戴尔·罗宾逊和道格·拉托内尔
         
    * NEW:日志文件中有新的使用统计,"每日报告"帮助管理员识别造成内存问题的用户. 统计被命名为"出自记忆" (矩阵大小) ","出自记忆 (过大) "和"出自记忆 (过大了) " .. 它们显示了在这些类别中提出请求的用户的IP地址以及他们提出的请求的数量. 如果没有麻烦的要求,这些统计就不会出现. "出自记忆 (矩阵大小) "和"出自记忆 (过大了) " 请求通常不是问题,因为请求如此之大,以致于ERDDAP™快速捕捉到它们并返回错误消息 。 "记忆的尽头" (过大) " 请求更为危险,因为ERDDAP™在认识到目前没有足够的内存来处理请求之前,已作出一些努力。 (虽然问题可能在于其他请求 紧接着这些请求) 。 。 。 。
        
还有一些名为"Large Request, IP 地址"的新统计显示提出大请求的用户的IP地址 (当前, 网格.nc文件 &gt; 1GB (英语).) 。 。 。 。
        
另外,状态.html页面上的时间序列表现在包含一个"memFail"栏,显示与"OutOfMemory"失败的请求数量. (过大) " 自上次主要装入数据集以来的错误。 这里除0之外的任何数字至少都值得关注。
多亏了鲍勃·西蒙斯
        
    * NEW:新版本的Hyrax显示目录列表与以前不同。ERDDAP™现在可以读取新旧目录列表。
         
    * NEW: 数据集重装和用户回复需要 &gt; 10秒完成 (成功或失败) 标记为 " (超过10个&#33;) " .. 因此,您可以为此短语搜索log.txt文件,以找到重新装入速度缓慢的数据集或完成速度缓慢的请求请求号. 然后可以在log.txt文件中看起来更高一些,以查看数据集问题是什么,用户要求的是什么,以及来自谁. 这些缓慢的数据集载荷和用户请求有时会征税ERDDAP。 。 。 所以更多了解这些请求可以帮助你识别和解决问题.
    * 改进:在验证一个CF DSG数据集时,ERDDAP™现在确保具有cf\\_role属性的变量在相应的cdm\\_. \\_变量列表中,而不在其他cdm\\_. \\_变量列表中. 例如,如果一个时间序列 Profile 数据集有一个“station\\_d”变量,该变量具有 Cf\\_role=timesseriesd属性,那么“station\\_d”必须在 Cf\\_timeseries \\_vals 列表中,但不能在 Cf\\_profile\\_vals 列表中。
多亏了米迦温格伦
         
    * IMPROVED:"简化"现在更快,使用较少的内存,可能还原长箭头. 感谢Unidata。 。 。 。
         
    * 改进:从EDD表开始快速重新启动的速度现在要快得多。 (与nc有关) 文件 (除了来自NcCFFiles的EDD表和来自无效CRAFiles的EDD表) 因为制造 预期 (和另一个地方) 现在刚刚读取了样本文件的元数据,而不是读取所有的数据. 多亏了杰西卡·奥斯汀
         
    * IMPROVED:现在有支持时间字符串精度大于to-the-milisecond,如果附加数字都是0's,例如"2020-05-22T01:02:03.4560000Z". 谢宜宝江.
         
    * 改进: 生成 DatasetsXml 的 EDD. suggestDestinationName 用于删除 '(") 和之后的一切 。 现在它去除(.\\*只有到此为止sourceName。 。 。 。 现在它也删除\\[。 。 。 。\\*\\]只有在结束的时候sourceName。 。 。 。 感谢朱利安保罗。
         
    * 改进:生成数据 Xml 现在使变量destinationName由需要时添加的 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 感谢朱利安保罗。
         
    * 改进: 当 Calendar2. parseDateTime 剖析 dd, hh, 或 HH 时, 第一个“ 数字” 现在可能是一个空格 。
    * 问题: 开始ERDDAP™2.10, (中文(简体) )..ncml 文件试图改变属性,不要改变属性. 这是我报告过的Netcdf-java中已知的bug, 他们说在Netcdf-java的下一次发布时会固定.
         
    * &#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125; 我做了一个合适的系统 测试断开的链接ERDDAP™网页,所以现在应该很少有断开的链接 (至少在每个发布日期 -- -- 经常出现新的断开链接) 。 。 。 。
         
    * BUG FIX: EDD Table FromHttpGet 在某些类型的请求中失败. 现在它没有了。 多亏了BODC的艾玛
         
    * 布鲁克斯: 为了处理一些请求,EDDTable为每个请求的变量做了一个临时文件,文件名以变量的名字结尾. 如果变量的名称也是压缩类型 (例如.Z) , (中文).ERDDAP会尝试 (失败) 解压缩临时文件。 现在临时文件名以".temp"结尾. 多亏了马修·比德尔
         
    * BUG FIX:生成 DatasetsXml 和 Calendary2. 转换为Java日期时间 格式在试图修正可能无效的日期时间格式时,现在发生错误变化的可能性要小得多。 值得注意的是,不会修改自动建议的日期时间格式。 多亏了马修·比德尔
         
    * 布鲁克斯: 如果从远程 URL 获取内容时出错, 如果错误Stream 内容被压缩,ERDDAP™现在正确解压缩错误消息 。 多亏了鲍勃·西蒙斯
         
    * 布鲁克斯:&lt;订阅 ToRemoteEddapDataset &gt; 在 EDD 时没有被应用... 从Erddap数据集是一个儿童数据集. 现在它。 多亏了克里斯·罗姆索斯
         
    * BUG FIX: 生成数据 Xml不再认为以"纬度"开头的源变量名称可能是纬度. 多亏了文森特·卢佐
         
    * BUG FIX:现在,一个OutOutMemoryError在读取一个数据文件的同时处理一个用户的请求并不是将一个文件添加到BadFiles列表的理由. 多亏了鲍勃·西蒙斯
         

## 第2.02版 (中文(简体) ).{#version-202} 
 (2019-08-21年发布) 

*    **新特征和变化 (用户) 数字 :** 
    * NEW:现在有两种方法可以搜索多个数据集ERDDAP编号 它们的工作略有不同,有不同的接口和选项.
        
        *   [搜索复数ERDDAPs.html (中文(简体) ).](/SearchMultipleERDDAPs.html)从鲍勃·西蒙斯/NOAA NMFS SWFSC ERD。 。 。 。
        *   [ http://erddap.com ](http://erddap.com)来自罗布·富勒/爱尔兰海洋研究所
        
感谢泰拉尔·默里最初的请求.
         
    * 改进:向人权理事会提出的请求"files"下载文件的系统 (例如,AWS S3) 现在导致重定向,因此用户会实际从源头下载数据,而不是使用ERDDAP™作为中间人 感谢安迪・齐格勒和NOAA。 。 。 。
         
    * NEW:作为新的AWS S3相关功能的一个例子,为了方便任何人浏览和下载公共AWS S3桶的文件,我们创建了
        [~110个样本数据集](https://registry.opendata.aws/)它可以让任何人浏览 几乎所有内容
        [AWS S3 打开数据桶](https://registry.opendata.aws/)。 。 。 。 如果点击"files"链接到这些样本数据集,您可以在S3桶中浏览目录树和文件。 由于这些数据集的运作方式,这些目录列表总是完美更新,因为ERDDAP™让他们飞起来。 如果您点击目录树到一个实际文件名并点击文件名,ERDDAP™将会将您的请求重定向到 AWS S3,这样您就可以直接从 AWS 下载文件 。ERDDAP™管理员可以
        [读取其他 S3 桶的操作方向](/docs/server-admin/datasets#working-with-aws-s3-files)。 。 。 。 感谢安迪・齐格勒和NOAA。 。 。 。
         
*    **东西ERDDAP™管理员需要知道和做:** 
    * 你需要做的事情:无
         
    * 改进:ERDDAP存储字符串数组的方法 (字符串阵列) 现在的记忆效率要高得多。 字符串 全部使用阵列ERDDAP™,特别是在读取表格ASCII数据文件时。 另外,其他的修改使得读取CSV/TSV/SSV ASCII,专栏ASCII,以及jsonlCSV表格式数据文件更快,更有效率的内存. 结果是: 对于一个764 MB ASCII 数据测试文件 (压缩到52MB.gz文件) 有3,503,266行和33列,最大内存用量从10GB降至0.6GB (高峰时) 。 。 。 阅读时间为~7分钟 (但随着计算机中物理内存的多少而变化很大) 降至~36秒 (包括用于简化的10种 () 仅用于生成 Datasets xml 数据) 。 。 。 。 其它许多地方ERDDAP™将受益于这种提高的内存效率。 感谢泰拉尔·默里和马修·比德尔.
        
我探索了一个不同的解决方案 (将字符串阵列中的字符串存储为 UTF-8 编码字节数组) 。 。 。 这又降低了内存使用率~33%,但代价~33%减速. 与现在使用的系统相比,这似乎是一个糟糕的交易。 给一台电脑增加内存比较容易 (为~200美元购买更多内存) 而不是让它更快 (购买全新的电脑) 。 。 。 。
        
如果方便的话,根据一些标准将庞大的表格数据文件分成几个较小的文件仍然是个好主意,比如:stationID和/或时间。ERDDAP™通常只需根据用户的要求打开一个小文件,从而能够更快的响应.
        
    * 现在有了[ERDDAP™AWS S3 文档](/docs/server-admin/datasets#working-with-aws-s3-files),说明如何获得ERDDAP™以 AWS S3 桶中的数据文件工作。
还有,ERDDAP™现在使用 AWS S3 中的新特性JavaAPI (英语).
还有,ERDDAP™现在允许 AWS S3 URL 包含额外的字符 (周期,连字符,下划线) 在桶名。
还有,ERDDAP™现在要求以特定方式识别 AWS S3 桶 URL :
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
前缀是可选的。
感谢安迪・齐格勒和NOAA。 。 。 。
         
    * 改进:生成数据 Xml 现在处理额外的常见missing\\_values作为缺失值的站点,因此更可能将一列转换为数字数据类型。 简写 () 现在记录导致它将某一列作为字符串的列。 多亏了马修·比德尔
         
    * 改进:&lt;blacklist &gt; 现在支持。\\*。 。 。 。\\*  (或 :\\*数字 :\\*用于 IPv6) 在 IP 地址的末尾,这样您就可以将更大的 IP 地址列出黑名单,例如 110.52。\\*。 。 。 。\\*  (中国联合通讯天津) 。 。 。 。 见以下文件:&lt;请求黑名单 &gt;] (/docs/server-admin/datas# 请求黑名单) 感谢中国Unicom和中国电信.
         
    * 改进:如果一个数据集的来源没有指定一个"institution"属性,生成数据 Xml 和 loadDataset 现在从“ 创建器 ” 属性获得 。 (如果有的话) 。 。 。 多亏了米迦温格伦
         
    * BUG FIX: 标准化 ASCII数据文件并不总是应用的.
另外,EDDTable在源代码有字符串时间值并实现标准化时,没有妥善处理时间值的限制 正在使用的东西。
感谢帕洛玛·德拉瓦莱。
        
我之前没说清楚 你应该用标准化 当你真正需要它们时有什么特点 (例如,当不同的源文件以不同的方式存储时间值时) ,因为有些请求需要使用标准化的数据集 处理得慢一点
        
    * 布鲁克斯: 使用代码中的错误EDDGrid从NcFiles导致它失败.nc经常预算:.hdf5个文件有"长" (单位64) 变量。 现在修好了 感谢弗里德曼·沃布斯.
         
    * 布鲁克斯: 对ISO 19115文件的小改动,使不同的验证器快乐. 感谢克里斯·麦克德米德和安娜·米兰.
         

## 第2.01版 (中文(简体) ).{#version-201} 
 (2019-07-02发布.) 

*    **新特征和变化 (用户) 数字 :** 
    * 无。
*    **东西ERDDAP™管理员需要知道和做:** 
    * 布鲁克斯: 在代码中生成数据访问表的错误tabledap数据集导致某些数据集的网页空白。 此外,我还改进了所有HTML网页上处理出乎意料的错误的工作,以便它们能够 (通常) 显示错误消息。 多亏了马可阿尔巴
    * 改进:生成数据 Xml 不再打印输出顶端的长长警告. 相反,请看[编辑生成 数据集 Xml 输出](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better)。 。 。 。 多亏了史蒂芬·鲍姆
    * 改进:生成数据 Xml现在对不同情况提出略有不同的建议。&lt;为 EDD 更新 EveryNMILIS &gt;... from...Files datas。 同时,生成 Datasets Xml 现在劝阻 EDDTable FromFiles 数据集的原始"摘录"系统.

## 版本2.00{#version-200} 
 (2019-06-26发布.) 

*    **ERDDAP™v2.00终于来了&#33; 没错&#33;**   
     
    * 我们对完成这一版本需要长时间拖延表示歉意。
谢谢你的耐心
         
    * 好消息是额外时间被用来增加用户要求的更多功能. 坏消息是,即使延迟了,并不是所有请求的功能都被添加. 我们很抱歉,但比起拖延更多时间 更有必要把释放释放出去 (永远?) 不断增加新的功能。 我们承诺今后将更频繁地释放。
         
    * 2号车厢? 是否有大的变化和不相容之处?"
新的大特色吗? 对
对于管理员或用户来说,大不相容或更改? 没有
我们从v1.82跳到v2.00:
        * 庆祝十年 (现在11) 自第一次公开发布以来ERDDAP™  (v1.00 on 2008-05-06, 外表看起来非常像v2.00) 。 。 。 。 那时ERDDAP™至少12个国家已经从一个装置变为近100个装置 (澳大利亚、比利时、加拿大、法国、印度、爱尔兰、意大利、南非、西班牙、泰国、联合王国、美国) 。 。 。 。
        * 部分地标志着一个全新的方向上的重大增加:ERDDAP™现在有一个数据摄入系统 与现有的数据服务器服务 (见[来自 HttpGet 的 EDD 表格](#eddtablefromhttpget)) , (中文).
        * 部分原因是从1.82到2.00的跳跃并不大 所以这似乎是合适的时机
             
    * 另一个好消息是,现在还有另外两个团体提供密码。ERDDAP™  (和表示将继续) :罗布·富勒(Rob Fuller)和爱尔兰海洋研究所的亚当·莱恩伯特(Adam Leadbetter),以及PMEL和韦瑟托普咨询公司的罗兰·施韦策(Roland Schweitzer). 非常感谢 的确,他们正在自己选择的项目上工作, 但这是经典的开源开发模式—— 团体为他们最希望看到的功能提供代码。 给贡献者带来的附加好处:一旦完成,他们就可以使用新的特性;他们不必等待下一次发布ERDDAP。 。 。 也欢迎你们集团出力&#33; 见[ERDDAP™程序员指南](/docs/contributing/programmer-guide)。 。 。 。
         
    * 我们希望你喜欢ERDDAP™v2.00. 我们期待着未来十年的到来。ERDDAP™以及全世界越来越多的利用。
         
*    **新特征和变化 (用户) 数字 :**   
     
    * 纽约:orderByMean过滤器
(单位:千美元)tabledap数据集将计算特定组的资源。 还有,所有的orderBy选项现在支持另一种定义组的方法:_numeric Variable\\[数目\\[时间 单位\\]\\[: 关闭\\]\\]_,例如时间/1天或深度/10:5. 举例来说,stationID时间、 水调图( T)orderByMean (" , "stationID时间/天") 将结果排序为stationID和时间,然后计算并返回水的平均值stationID每日费用。 这些都是非常有用和强大的新特点。 这些特征的新代码和旧代码的修改是由爱尔兰海洋研究所的罗布·富勒(Rob Fuller)和亚当·莱恩贝特(Adam Leadbetter)贡献的,并通过Git提交. 谢谢 罗布和亚当&#33;
         
    * NEW: 表格数据集输出文件类型 :[数据 图表](https://developers.google.com/chart/interactive/docs/reference#dataparam), (中文).
a JSON 文件格式,用于Google Visualization客户端库 (Google Charts) 。 。 。 其代码由Roland Schweitzer提供,并通过Git提交. 谢谢 罗兰&#33;
         
    * NEW: 表格数据集输出文件类型 :[.jsonlCSV1](https://jsonlines.org/examples/), (中文).
这就像现有的.jsonlCSV选项,但第一行有列名。 多亏了尤金·伯格
         
    * New:如果管理员允许,用户现在可以登录他们的[ORCID 组织](https://orcid.org)账户。
它是一个OAuth 2.0认证系统,很像谷歌认证. ORCID被研究者广泛用于独特的自我识别. ORCID账户是免费的,没有Google账户的隐私问题. 见ERDDAP因为[Orcid 认证指令](/docs/server-admin/additional-information#orcid)。 。 。 多亏了BCO -DMO (亚当·谢帕德,达尼·金卡德等.) 。 。 。 。
         
    * NEW:一个新的URL转换器将过时的URL转换成最新的URL.
见./erddap/convert/urls.html上的任何ERDDAP™安装,例如,
        [中转换器的链接ERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html)。 。 。 这对数据管理人员应有用。 这也被GenerateDatasetsXml内部使用. 多亏了鲍勃·西蒙斯和莎伦·梅西克
         
    * 改进:[时间转换器](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)现在可以将任何常见的字符串时间转换为 ISO8601 字符串时间,或者转换一个UDUNITS- 就像时间单位串成一个正则UDUNITS时间单位字符串。 这也将有助于:ERDDAP™需要知道为字符串时间变量的"单位"属性指定什么格式的管理员. 这在内部也被GenerateDatasetsXml和EDDTable FromFiles的标准化What特性使用. 多亏了鲍勃·西蒙斯
         
    * 纽:[单位转换器](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)有了一个新的“标准UDUdUnits”选项。
例如,"degQQC/m"和"desQQC米-1"都转换为
(原始内容存档于2018-09-01). DucQQC m-1. EDDTable FromFiles的What特性标准化也使用了这个特性. 多亏了鲍勃·西蒙斯
         
    * 新的:用于图表 (除了表面图) 在网格上和tabledap'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' 感谢Carrie Wall Bell / Hydrophone项目.
         
    * NEW:对于图表,X和/或Y轴现在可以使用Log比例表.
用户可以通过网格dap上的新下拉部件控制 Y 轴缩放tabledap制作图表网页。 见[.x 兰格和. 距离文档](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange)。 。 。 感谢Carrie Wall Bell / Hydrophone项目.
         
    * 改进:ERDDAP™现在更好地利用各种 HTTP 错误代码, 现在返回一个(OPeN)DAPv2.0 格式化错误消息有效载荷 。 见[细节](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors)。 。 。 感谢安托万·奎里克和奥雷莉·布赖恩德.
         
    * 改进:不要使用Netcdf-java/c或其他软件工具连接.nc或.hdf服务的文件ERDDAP''s / files/ system 仿佛它们是本地文件.ERDDAP™现在拒绝这些请求。 它效率低下,常常造成其他问题。 相反:
        
        * 使用(OPeN)DAP要连接的客户端软件ERDDAP因为DAP数据集服务 (具有/网格/或/tabledap/ 在 URL 中) 。 。 。 。 就是这样DAP和做得很好。
        * 或者,使用数据集的数据访问表请求一个数据子集.
        * 或者,如果长时间需要整个文件或重复访问,使用curl, (中文).wget,或下载整个文件的浏览器,然后从本地文件副本中获取数据。
        
          
         
    * 改进:在ERDDAP™主页 Full Text Search 现在在"查看所有数据集列表"之上,因为它是大多数用户最好的起点. 多亏了迪迪埃·马拉里诺和莫里斯·利比斯.
         
    * (原始内容存档于2018-03-03). IMPROVED: on Data ProviderForm3.html 现在有普通的下拉列表standard\\_name编号 多亏了IOOS DMAC会议上的某人.
         
    * IMPROVED:在/files/网页上,现在有一个链接到新的"这些文档我能做什么?"的/files/文档部分. 该部分描述了各种文件类型,并就如何与它们合作提出了建议。 多亏了莫里斯·利比斯
         
    * 改进:几乎每一项要求ERDDAP™至少要快一点 有时还要快很多
         
    * 布鲁克斯: 在某些情况下,当一个EDDTable数据集保存某些类型的数据时.nc文件, Global "id" 属性被设定为文件建议的名称,其中包含一个散列使其成为该请求的独有. 现在,"id"是适当的没有改变 (如果指定) 或设置到数据集datasetID  (未指明的) 。 。 。 感谢约翰·莫伊雷尔.
         
*    **东西ERDDAP™管理员需要知道和做:**   
     
    * (笑声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声)(掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) (掌声) 请耐心一点,并计划用几个小时来做所需的改动,再用几个小时来试验新的特性.
         
    * 为安全起见, 请提供您当前设置的备份。 xml 和datasets.xml文档,以便您在您需要返回的不可行情况下可以重回文档ERDDAP™v1.82 (英语).
         
    * 建议:Java现在采用 OpenJDK 的 OpenJDK 第8条 (长期) +热点。
这是一个开源变体Java其使用不受限制 (与Oracle因为Java分发) 。 。 。 。 它来源于Oracle因为Java以持续的方式,Oracle祝福你们 出于安全考虑,必须保留你的Java版本更新。 见ERDDAP因为[Java安装指令](/docs/server-admin/deploy-install#java)。 。 。 。
         
    * 收养OpenJDKJava您的Tomcat 安装需要小的添加: 请参见[资源缓存指令](/docs/server-admin/deploy-install#contentxml)。 。 。 我认为,这是替代 -XX: MaxPermSize 设置。 (通过) OpenJDK不再支持.
         
    * 做: 新的默认和建议&lt;字体Family &gt; 设置在设置. xml 是
DejaVu Sans 包含在领养开放JDK中Java。 。 。 。 见
        [修改字体安装指令](/docs/server-admin/deploy-install#fonts)。 。 。 。
         
    * 要完成 : 许多标记正在从设置. xml 移动到datasets.xml。 。 。 优点是,你可以改变他们的价值观,同时ERDDAP™正在运行, 不重新启动ERDDAP。 。 。 。 值得注意的是,你很容易改变&lt;启动 BodyHtml5 &gt; 以显示临时信件ERDDAP™主页 (例如,“检查新的JPL MUR SST v4.1数据集...”或“这个ERDDAP™2019-05-08T17:00 PDT至2019-05-08T20:00 PDT的维护工作将下线".) 。 。 。 如果/当你更改这些标记时datasets.xml,这些变化将在下一次生效ERDDAP™读取datasets.xml。 。 。 。
         
        
        1. 将此内容复制到您的datasets.xml文件( 文件开始附近的任何地点, 之后)&lt;erddapDatasets&gt;) (中文(简体) ).
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. 逐一复制值 (如果有的话) 从您设置的. xml 文件到您刚刚粘贴的新标签的每个标签 (上文) 输入datasets.xml。 。 。 例如,如果您使用了 30 的值作为&lt;缓存密钥 &gt; 在设置.xml中,您应该将该值复制到新的&lt;缓存Minutes &gt; 标记在datasets.xml  (虽然该值与新的默认值相同,但最好只留下标记datasets.xml空白) 。 。 。 。
            
如果您的数值不同于新建议的默认值(除&lt;启动BodyHtml5&gt;和&lt;用于自定义您ERDDAP™请考虑切换到新的默认值。 这尤其是&lt;部分请求MaxBytes &gt; 和&lt;部分请求MaxCells&gt;,默认/建议值多年来发生了显著变化。
            
复制每个值后,请从设置.xml中删除标记及其描述. 最好把这些标签放进去datasets.xml。 。 。 现在有更好的描述[设置 DatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file)。 。 。 。
            
        
新系统的一个怪点是,当你开始的时候,第一个网页ERDDAP将是默认值ERDDAP™网页。 之后的每一个网页都将使用您指定的... Html 内容datasets.xml。 。 。 。
        
    * 警告:你第一次逃跑ERDDAP™v2.0, 基于本地数据文件的数据集将加载 **非常喜欢** 慢慢来 因为ERDDAP™需要以略微不同的格式重建其文件数据库。 在缓慢的初始重载后,它们会像以前一样快速加载. 请耐心点
         
#### 来自 HttpGet 的 EDD 表格{#eddtablefromhttpget} 
    *   [Big New Featre: 来自HttpGet的EDD表](#eddtablefromhttpget)  
直到现在ERDDAP™只读数据 并提供给用户。 现在,ERDDAP™拥有一个简单,高效的系统从传感器中摄取实时数据. 除其他功能外,这个数据集还提供了精细的刻度版本:它记得对数据集所做的每一个修改,是何时作出的,以及由谁作出的. 通常,用户只需要数据集的最新版本,并应用所有更改. 但是,用户可以选择像以往任何时候一样从数据集中请求数据。 这有利于可复制的科学。 因此,与大多数其他近实时数据集不同,这些数据集有资格获得[DOI编号](https://en.wikipedia.org/wiki/Digital_object_identifier)。 。 。 。 因为他们遇到DOI要求除汇总外数据集不变。 见[来自 HttpGet 的 EDD 表格](/docs/server-admin/datasets#eddtablefromhttpget)。 。 。 。 多亏了OOI (从很久以前到现在) 和尤金. 布尔格 来提醒我们 如何解决重要的问题
         
    * 大新风云:ERDDAP™现在可以直接从外部压缩的数据文件服务数据,包括:.tgz, (中文)..tar.gz, (中文)..tar.gzip, (中文)..gz, (中文)..gzip, (中文)..zip, (中文)..bz2,或.Z.数据集可能包括外部压缩文件的组合 (也许旧的数据文件?) 以及非外部压缩文件,可以随时压缩/解压缩文件.
        
这行得通&#33;
在大多数情况下,与解压档案有关的减速不大。 我们强烈鼓励你们尝试这个方法,特别是为了不经常使用的数据集和/或数据文件。
        
这样可以省下三万元或更多
这是为数不多的ERDDAP™能够保存大量钱的特性——如果压缩大量数据文件,则需要更少的RAID/硬盘来存储数据,或者反之,你可以服务更多的数据 (最多10个) 与你已经拥有的RAID。 如果这个功能可以让你免于购买另一个RAID,那么它可以节省大约3万美元.
        
见[外部压缩文件文档](/docs/server-admin/datasets#externally-compressed-files)。 。 。 感谢贝诺伊特·佩里蒙德和帕洛马·德拉瓦莱.
        
    * 大新风云: 全体EDDGrid从 Files 和所有 EDD Table 从 Files 数据集支持 a&lt;从Url ' 缓存标记和 a&lt;缓存SizeGB&gt;标签。 如果不指定缓存SizeGB,这将下载和维护远程数据集文件的完整副本. 如果指定缓存SizeGB, 并且是 &gt;0, 这将根据需要将文件从远程数据集下载到本地缓存中, 其尺寸有限, 在与基于云的工作时有用 (例如,S3) 数据文件。 见[缓存 从Url 文档](/docs/server-admin/datasets#cachefromurl)详细情况。 多亏了鲍勃·西蒙斯和罗伊·门德尔索恩 (多年来一直在编写脚本, 处理远程数据集文件的本地副本) 劳埃德·考滕 尤金·伯格 康纳·德莱尼 (他在亚马逊网络服务公司时) ,还有谷歌云平台.
         
    * New: 来自JsonlCSV的新EDD表 类可读取表格数据
        [贾森 线条 CSV 文件](https://jsonlines.org/examples/)  ("比CSV强") 。 。 。 感谢爱尔兰海洋研究所的人告诉我这个格式,感谢尤金·布尔格和PMEL请求作为输入类型支持它.
         
    * 新来:EDDGrid和所有 EDD Table fromFiles 数据集支持&lt;nthreads &gt; 设置, 它告诉ERDDAP™响应请求时要使用多少线索 。 见[n 线索文档](/docs/server-admin/datasets#nthreads)详细情况。 感谢Axiom数据科学的罗布·博切内克,尤金·伯格,康诺·德莱尼 (他在亚马逊网络服务公司时) ,还有谷歌云平台.
         
    * 新标准化 所有从档案子类的 EDD表怎么办?
以前,如果对某个变量,则重要属性的值 (例如,scale\\_factor, (中文).add\\_offset, (中文).missing\\_value, 填充值, 单位) 并非一致, EDDTable FromFiles 将为每个属性选择一个“ 有效” 值, 用其他属性值标记文件为“ 坏文件 ” 。 现在,一旦EDDTable FromFiles读取文件,就有一个系统来规范文件. 见[EDD Table File 标准化 什麽?](/docs/server-admin/datasets#standardizewhat)。 。 。 。 一个ERDDAP其主要目标是使数据文件和数据集以一致的方式获得. 标准化 实现这一点的一个重要的新工具是什么。 多亏了马可·阿尔瓦 玛格丽特·奥布莱恩 (和其他 EML 用户) ,BCO-DMO,和InPort用户.
         
    * 来自 InvalidCRAFles 的新 EDD Table 允许您从 :NetCDF  (v3 或 v4 类型)  .nc使用 CF DSG 相邻标记阵列的特定、无效的变体的文件 (庇护上诉委员会) 文档。 此数据集类型的样本文件可见于 https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 (中文(简体) ). 此服务器现在不可靠可用\\]。 。 。 。 虽然ERDDAP™支持此文件类型, 这是一个无效的文件类型, 任何人都不应开始使用 。 强烈鼓励当前使用此文件类型的组使用ERDDAP™生成有效的 CF DSG CRA 文件,并停止使用这些文件。 感谢Ajay Krishnan和Tim Boyer。
         
    * 来自垃圾的 EDD 表格Hyrax文件现已贬值。 请从 NcFiles 切换到 EDD Table (或变体) 加号&lt;缓存从Url&gt;. 如果因为某种原因不行,就发电子邮件erd.data at noaa.gov。 。 。 如果2020年之前没有投诉,这些数据集类型可以删除.
         
    * 改进 -- 自动将非ISO 8601次转换为ISO 8601次的系统 (v1.82中介绍) 已经大大扩展,以处理大量其他格式。 这影响了生成DatasetsXml和ERDDAP处理源元数据。
         
    * 改进 -- 对弦乐时间分析系统的第三次重大修订 (并且希望是最后一个) , (中文).ERDDAP™不再使用Java'DateTime Formatter 因为有时会影响极端时间(年份)的bugs&lt;=000(单位:千).ERDDAP™现在使用自己的系统解析时间字符串。
         
    * 警告:新的字符串时间剖析系统比较严格。 如果一个数据集突然只有时间值的缺失值,原因几乎肯定就是时间格式字符串稍有错误. 日志中应该有错误信息 。 txt与时间格式不匹配的时间值有关——这应该可以帮助您修复该数据集的时间格式字符串. 如果您需要帮助, 请使用此选项ERDDAP转换“ 转换” 的时间转换器\\[编号\\]任何常见的字符串时间进入 ISO 8601 字符串时间"——它表示转换器用来解析源字符串的格式.
         
    * 建议:加快速度的最快捷、最简单和最廉价的方法ERDDAP访问表格数据是将数据文件放到固态驱动器上 (SSD 软件) 。 。 。 大多数表格数据集相对较小,因此1或2 TB SSD可能足以保存所有表格数据集的所有数据文件. SSD最终会磨损,如果你将数据写入一个单元格,删除它,并将新数据写入该单元格太多次. 相反,我建议 (尽可能多) 您只需使用您的 SSD 来写入数据一次, 并多次读取它。 然后,即使是消费级的SSD 也应该持续很长的时间, 可能比任何硬盘驱动器要长得多 (HDD 数据) 。 。 。 消费者级SSD现在便宜了 (2018年,1TB为~200美元,2TB为~400美元.) 价格仍在迅速下跌。 何时ERDDAP™访问一个数据文件, 一个 SSD 既提供又提供
        
        * 较短的延迟 (HDD为~0.1ms,对~3ms,对~10 (? 。 。 。) 亚马逊S3的RAID对 ~55ms) ,以及
        * 较高的吞吐量 (HDD ~ 500 MB/S, 相对于 ~ 75 MB/s, 相对于 ~ 500 MB/s, 相对于 RAID) 。 。 。 。
        
这样你就能达到~10X的性能提升 (对 HDD 数据) 200块&#33; 比较您系统中其他可能的改动 (10 000美元的新服务器? 35,000美元的新瑞德吗? 一个新的网络交换机 $5000? 页:1) ,这是迄今为止最好的 回报投资 (罗伊) 。 。 。 如果您的服务器没有装入内存, 您的服务器的额外内存也是一种大而相对廉价的方式, 以加速所有内容ERDDAP。 。 。 。
        \\[SSD对网格化数据来说也是很好的,但大多数网格化数据集都大得多,使得SSD非常昂贵.\\]  
         
    * NEW:每个被登录的人都得到角色=\\[任何人日志 内\\]即使没有&lt;用户 &gt; 标签中datasets.xml。 。 。 如果您设置了数据集&lt;访问到 &gt; to\\[任何人日志 内\\],然后任何人 谁登录到ERDDAP™  (例如,通过他们的Gmail或Orcid账户) 将被授权访问数据集,即使你还没有指定&lt;用户 &gt; 标签中datasets.xml。 。 。 。 多亏了莫里斯·利比斯
         
    * 改进:UDUNITS/UCUM单位转换器得到了广泛的改进。
它能更好地处理无效的单位字符串 (首先是强调保存信息,而不是强制执行有效性) 。 。 。 此外,结果现在有一个标准化的语法。
         
    * 纽:UDUNITS/UCUM 单位转换器有一个新的选项,可以实现标准化。UDUNITS字符串 。
这很有效UDUNITS非标准/ 无效的字符串和 合理良好UDUNITS字符串。 例如,UDUNITS=“每秒公尺”,“公尺/秒”,"m.s^-1",以及"m s-1"将全部返回“ m.s-1”。 这对新的标准化是必要的。 上述制度。 多亏了马可·阿尔瓦 玛格丽特·奥布莱恩 (和其他 EML 用户) ,BCO-DMO,和InPort用户.
         
    * NEW: 来自多晶片的 EDD Table 现在有一个[治疗DimensionsAs](/docs/server-admin/datasets#treatdimensionsas)选项,也就是说ERDDAP™处理某些维度 (例如,LAT和LON) 仿佛是其他维度 (例如,时间) 。 。 。 这对于一些错误文件有用,它们使用不同的维度处理不同的变量,而它们应该只使用一个维度 (例如,时间) 。 。 。 感谢马可·阿尔巴和莫里斯·利贝斯.
         
    * 现在,所有EDDGrid来自... Files 数据集支持一个新的特殊轴sourceName说明ERDDAP™从文件中提取信息Name (只是文件名.ex) 并使用该值 **替换** 现有的最左轴值。 格式为
        \\*\\*从文件替换 Name,_dataType_,_extractRegex_,_capture group number_
见[本文档](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)。 。 。 。 谢谢你NOAA开拓者每日汇总数据集.
         
    * 现在,所有EDDGrid来自... Files 数据集支持一个新的特殊轴sourceName说明ERDDAP™从文件路径提取信息Name (目录 + 文件名.ext)   
        \\*\\*_pathName,_dataType_,_extractRegex_,_capture Group 编号_
为此,路径名称总是使用'/'作为目录分隔符字符,从“\\”开始。
见[本文档](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)。 。 。 感谢帕洛玛·德拉瓦莱。
         
    * 现在,所有的EDD表从... 文件数据集支持额外的伪变量sourceName从文件提取信息的 sName (只是文件名.ex)   (见[\\*\\*QQ文件Name](/docs/server-admin/datasets#filename-sourcenames)) 或从文件的完整路径获取Name (/ dir1/ dir2/ filename.ext 数据)   (见[\\*\\*路径Name](/docs/server-admin/datasets#pathname-sourcenames)) 。 。 。 感谢帕洛玛·德拉瓦莱。
         
    * 纽:如果EDDGrid数据集有一个或多个非常大的维度 (例如,价值数百万) 它占用了很多记忆, 你可以设置新的 [&lt;维度值在记忆中 &gt;] (/docs/server-admin/datasets#dimension价值模拟器) 设置为虚假 (默认为真) ,这使得数据集将值存储在磁盘上,并在需要时进行检索。 多亏了大卫·罗德里格兹和里奇·辛吉尔 (关于:EDDGrid从AudioFiles 调用) 。 。 。 。
         
    * 之前,如果你重新订购dataVariables 用于 EDD Table FromFiles 数据集并重新装入数据集, EDDTable FromFiles 将重新读取所有数据文件 。 现在,它可以在不重读所有数据文件的情况下处理重排. 感谢罗兰·施韦策.
         
    * 现在,何时ERDDAP™读取 ASCII, NCCSV, 和 JSON Lines CSV 表格数据文件, 如果它在给定的行上发现错误 (例如,项目数量不正确) ,它记录了警告信息 ("WARING:跳过行#..." "意外的项目数量...") 页:1[日志.txt 文件](/docs/server-admin/additional-information#log)然后继续读取其余的数据文件。 因此,你的责任是定期检查 (或为此编写脚本) 对于日志中的消息。 txt 这样您就可以解决数据文件中的问题 。ERDDAP™这样设置,用户可以继续读取所有可用的有效数据,即使文件的某些行有缺陷。 前情提要,前情提要,ERDDAP™将文件标记为"坏",并从数据集中删除.
         
    * 改进:准确时间 (例如,到最近的第二秒或毫秒) 保存在源头 作为"分钟从..." (或更大的单位) , (中文).ERDDAP™现在在读取值时将其绕到最近的毫秒ERDDAP。 。 。 否则,浮点数会在具体时间被擦伤并请求数据 (例如, & time=2018-06-15T01:30) 将失败。 以前,它尽可能精确地计算 (如果单位是"从... 秒"或"从...) 。 。 。 最好不用大单位来避免这个问题 (例如,分钟或小时) 以存储精确的时间值 (例如,微秒数) - 计算机处理小数点的工作做得不好。 多亏了马可阿尔巴
         
    * 切换到 EDD 表EDDGrid这使得它变得更好。 从 EDD 表格EDDGrid让用户查询网格化数据集,如同表格化数据集 ("按价值计算") 。 。 。 。
        
        * 现在它支持&lt;最大轴0 &gt; 标记 (默认=10) 指定轴的最大数量\\[0 个\\]  (通常"time") 可立即查询的值。 这样可以防止天真的请求从 EDD Table 中获取EDDGrid以搜索整个网格化数据集 (以超时出错失败) 。 。 。 。
        * 生成数据 Xml 现在可以生成 EDD Table 从EDDGrid给定中所有网格数据集的数据集ERDDAP™匹配指定的正则x的 (使用 .Q 来匹配所有数据集) 。 。 。 其创建的数据集在汇总属性中有额外信息,表明这是一个网格数据集的表格版本. 和他们的datasetID这是datasetID,加上“QQAATable”。
        * 最常见的设置有大速度:当网格数据集是EDDGrid从Erddap 数据集发送到同一处ERDDAP。 。 。 。
        
感谢詹姆斯·加拉格和埃德·阿姆斯特朗.
         
    * 新: 生成 数据集 用于所有类型数据集的 Xml 现在更可能添加 QQFillValue 或missing\\_value属性到数值变量的addAttributes。 。 。 例如,在字符串缺失值标记时发生 (例如,",",",","","NA,"nd,"NAN.) 用于将样本文件中的变量转换为ERDDAP本地缺失值 (127个字节栏,32767个短列,2147483647 第922337203685475807号 以长柱表示,以浮点数和双变量表示NaN) 。 。 。 在浮动变量和双变量中也会出现NaN值. 另外,在数字数据列中,"nd"被添加到常见缺失值标记列表中,ERDDAP™应该寻找。 多亏了BCODMO的马特·比德尔
         
    * 改进:生成中的 ncdump 选项 数据集 Xml 现在更像NCDUP (但仍使用 ncdump 的 netcdf- java 版本) 。 。 。 现在,它打印出一个新的选项列表。 现在,为了.ncml 文件,它会打印 ncdump 输出结果.nc应用到下面的 ml 文件更改.nc或.hdf文档。
         
    * 布鲁克斯: 有个文件柄漏了 (最终导致ERDDAP™冰冻起来) 当创建一些类型的输出文件时引起,例如.geotif,特别是当创建时发生错误。 我想/希望现在都修好了。 如果你还看到问题 请告诉我数据集的类型 (网格或表格) 以及造成问题的文件类型。 多亏了史蒂芬·比厄,林恩·德维特,赵济北等人.
         
    * 布鲁克斯: 那个WMS Leaflet演示没有完全/适当地将"深度"轴转换为"elevation". 现在,它做到了, 破碎的传说请求是固定的。 另外,下拉列表中的所有轴选项总是按递升排序顺序排列. 感谢安托万·奎里克和奥雷莉·布赖恩德.
         
    * BUG FIX:EDDTable FromFiles现在正确地支持对从数据文件中的字符变量创建的字符串变量的限制. 感谢安托万·奎里克和奥雷莉·布赖恩德.
         
    * 布鲁克斯: 现在,当一个数据集无法使用时,该数据集试图通知 (与信件“ 此数据集目前无法使用 ” 。) 它的订阅者,列出的动作,rs,以及依赖它的lonPM180数据集. 多亏了罗伊·门德尔索恩和鲍勃·西蒙斯.
         
    * 布鲁克斯: 两个错误与 EDDTable Copy 有关. 多亏了山姆·麦克拉奇
         
    * IMPROVED:状态.html页面上显示的失败请求数量将会增加,因为比以前更多的事情被算作失败.
         
    * 改进:ERDDAP'status.html 现在显示"请求 (中值( 毫秒)) " 在时间序列。 之前,它显示中位数切换到整数秒。
         
    * IMPROVED:在jsonld输出中,jsonld"名称"现在来自数据集的"title"输入ERDDAP,而jsonld"标题"现在来自数据集的".datasetID" 在ERDDAP。 。 。 此前,它被逆转。 这似乎是错误的,因为正常的英语用法, "名字"通常是一个短, (最好这样) 很少/从未更改的独有标识符 (例如,罗伯特·米德尔·西蒙斯) ,而不是一个不独有的描述, 很容易而且经常改变 (例如,“一个为下列项目撰写软件的人:NOAA"对 "一个高个子写软件的人NOAA" , ") 。 。 。 如果用schema.org定义[名称](https://schema.org/name)在数据集方面,更为具体。 软件开发人员应当在没有专家指导的情况下,仅根据规格写出规格的落实. 但我服从谷歌 (特别是娜塔莎 号) ,国家教育研究所 (特别是约翰·雷尔夫) 还有罗布·富勒
         
    * IMPROVED:在jsonld输出中,四个"空间overage GeoShape box"值现在是minLat minLon maxLat maxLon. 以前,拉特和龙的位置被逆转。 如果用schema.org定义[地理形状](https://schema.org/GeoShape)指定正确的顺序。 软件开发人员应当在没有专家指导的情况下,仅根据规格写出规格的落实. 感谢娜塔莎·诺伊和罗布·富勒

## 1.82版本 翻译:{#version-182} 
 (2018-01-26发布.) 

*    **新特性 (用户) 数字 :**   
     
    * 外观和外观的很多微妙变化ERDDAP™网页。
        * 改进:ERDDAP™现在使用HTML 5并更好地使用 CSS.
        * 改进:网页稍作修改,使其更清洁,减少"繁忙". (他们仍然稠密,仍然有一些事情可以抱怨,但希望比以前少得多。) 多亏了约翰·凯尔福特
        * 改进:手机和其他小型设备的网页现在看起来要好得多,特别是当你在景观导向时。 在桌面浏览器中的非常小和非常大的窗口中,它们也看起来更好.
        * 改进:为了提高安全性和其他原因,使用过时的 " 开放层 " 版本。WMS演示页面已被替换为Leaflet。 。 。 。
        * NEW: 对图像、音频和视频文件预览的支持"files"系统 (比如说,[本测试数据集](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) 内.htmlTable当单元格拥有图像、音频或视频文件的 URL 时响应 (比如说,[本请求](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) 。 。 。 如果您在“?” 图标上徘徊, 您应该看到图像、 音频或视频文件预览 。 您也可以点击文件链接查看浏览器中的文件全屏. 见[媒体文件文档](/docs/server-admin/datasets#media-files)。 。 。 注意不同的浏览器支持不同的文件类型,因此实例可能无法在您的浏览器中工作.
多亏了这些人/链接为CSS唯一的图像工具提示提供想法和样本代码 (当时是 https://codepen.io/electricalbah/pen/eJRLVd ) 和推迟的图像加载 (当时是 https://varvy.com/pagespeed/defer-images.html )   (虽然该代码在使用前已被修改ERDDAP) 。 。 。 。
感谢卡拉·威尔逊,马修·奥斯汀和亚当·谢泼德/BCO-DMO请求图像支持.
感谢Jim Potemra,Rich Signell,OOI,以及Carrie Wall Bell对音频/氢手机文件支持的请求.
感谢OOI显示需要视频支持.
        * NEW: 任意数据的一个子集ERDDAP™数据集 (但通常是音频文件的数据集) 可以在 .wav 音频文件中保存。 ([文档](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) 感谢Jim Potemra,Rich Signell,OOI,以及Carrie Wall Bell对音频/氢手机文件支持的请求.
        * 改进:网络可访问文件夹的格式 (妇女论坛)   (例如,文件/文件夹) 已更新以使用 HTML 表格。 新格式模仿了Apache最新版本创建的目录列表网页的较近期版本. 人类会发现这些变化使得信息更容易读取. 分析这些文件的软件 (例如,收集ISO 19115文件的软件ERDDAP) ,但新格式比以前的格式更容易分析。 (请注意,安娜米兰。) 
        * 新建outOfDateDatasets.html页面。 ([实例](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) 此网页显示一个表格,其中包含所有近实时数据集。&lt;testOutOfDate&gt; 标签 (见下文) ,按数据集过时程度排序。 这个仪表板对ERDDAP™管理员和终端用户想知道哪个数据集过时时. 对于过时数据集,推测数据来源存在问题,因此ERDDAP™无法从最近的时间点看到/获取数据。
管理员:如果您不想要Out-Out-Date数据集网页,请将此添加到您的设置中. xml:
            &lt;出自 DateDatasets Active &gt; 虚假&lt;/Out Out DatasetsActive 数据转换
现在有了testOutOfDate离开 日期栏allDatasets数据集。
多亏了鲍勃·西蒙斯 多年来一直想要这个 也多亏了爱尔兰海军陆战队的聪明人 通过他们敬业的Raspberry Pi 和监视器 给了我灵感
        * 改进:.htmlTable和.xhtml反应现在有更好的格式,更紧凑,从而更快地加载。 感谢HTML5和CSS.
    * gradap 数据集的新输出文件类型:.timeGaps. 它显示了时间值中大于中位数差距的空白列表. ([实例](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) 这对ERDDAP™当管理员和终端用户想知道某一数据集的时间值是否有出乎意料的缺口,预计该数据集会定期间隔时间值. 感谢鲍勃·西蒙斯和罗伊·门德尔索恩需要这个特征.
    * 改进:allDatasets数据集现在是一个带有x=maxLon和y=maxLat的地图. 多亏了John Kerfoot、Rich Signell和OOI -CI
    * 纽约:[错误](https://github.com/ioos/erddapy)- 这不是一个ERDDAP™特性,但许多人将感兴趣ERDDAP™用户。 埃尔达皮 (ERDDAP™+ 键Python) 是一个Python菲利佩·费尔南德斯创建的“利用ERDDAP因为RESTful创建网络服务ERDDAP™搜索数据集,获取元数据,下载数据等任何请求的URL". 多亏了菲利佩·费尔南德斯
    * 我之前应该提到: 还有一个第三方R包,旨在方便与ERDDAP™从 R 内部:[重拨](https://github.com/ropensci/rerddap#rerddap)。 。 。 。 感谢[打开科学](https://ropensci.org/)还有罗伊·门德尔索恩
         
*    **东西ERDDAP™管理员需要知道和做:**   
     
    * 在设置.xml, 就在下面&lt;请添加一个&lt;指定您所在机构的 URL 标签 (或组) 。 。 。 。
    * 要完成: 设置. xml中的这3个标记不再使用 :
        &lt;开始 头Html &gt;,&lt;启动BodyHtml &gt; 和&lt;端点BodyHtml&gt;。 改为:
        &lt;启动头Html5&gt;,&lt;启动BodyHtml5&gt;和&lt;endBodyHtml5&gt;,其默认值在信件中指定.xml (如下所示) 。 。 。 。
        
我们建议使用默认&lt;启动头Html5&gt;和&lt;endBodyHtml5&gt; (英语).
我们建议:如果你修改了原来的&lt;启动BodyHtml &gt; 和/或想要自定义您ERDDAP™现在,请复制新的&lt;启动BodyHtml5 &gt; 标记 (从下方) 输入您的设置. xml 并修改它以自定义ERDDAP™这样ERDDAP网页反映的是您的组织,而不是NOAA ERD。 。 。 特别的,请改变 "给你带来的" 组织 (编号) 。 。 。 如果您需要帮助,请通过电子邮件erd.data at noaa.gov。 。 。 (如果你不想自定义)ERDDAP™现在使用默认值&lt;启动BodyHtml5&gt;. )
        
然后删除您设置中的3个旧标签 。 xml 已经不再使用 。

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

还有别的办法[自定义ERDDAP™](/docs/server-admin/deploy-install#customize)这样ERDDAP网页反映的是您的组织,而不是NOAA ERD。 。 。 。
        
    * 接下来:&lt;EDDGrid... 示例 & gt; 标记( 开始于&lt;EDDGridIdExample & gt;) 和 数据&lt;电子数据表... 示例 & gt; 标记( 开始于&lt;EDDTableIdExample&gt;) 在您的设置中.xml文件中用于创建网格dap和tabledap文档。 html 在您的网页ERDDAP。 。 。 。
        
如果您没有定制这些标记, 请从您的设置. xml 文件中删除 。 现在他们都在信件中存在默认值.xml中提到了Bob的数据集.ERDDAP™时间 https://coastwatch.pfeg.noaa.gov/erddap/index.html 。 。 。 所以,你不再需要有 特定的数据集在你的ERDDAP。 。 。 如果您想要覆盖默认值, 请将其中的部分或全部标记复制到您的设置. xml 中并更改它们的值 。
如果你想让例子指向ERDDAP™,最简单的方法是:
        
        1. 在您的ERDDAP™将此添加到您的datasets.xml数字 :
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. 将此标签添加到您的设置. xml, 但将 URL 更改为您ERDDAP因为 (https? 。 。 。) URL :
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
如果您确实自定义了这些标签, 请按原样保留, 请在您的设置中添加这 2 个新标签 。 xml 以指定ERDDAP™这些数据集的 URL, 但将 URL 更改为您ERDDAP因为 (https? 。 。 。) URL :
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * 这样做:ERDDAP™现在使用一个叫做 erddap2.cs 的 css 文件. 如果你做了修改\\[移动猫\\]/webapps/erddap/images/erddap.cs,考虑作出与erddap2.cs类似的修改. (在同一目录中) 。 。 。 。
    * 纽约:ERDDAP网页现在有很多几乎看不见的内部链接 (文本为黑色,而不下划线) 。 。 。 如果你徘徊在这些链接上 (标题和段落的前几个字) ,光标变成手。 如果点击链接,URL是文档该部分的内部链接. 这使得参考文件的具体章节变得容易。 多亏了鲍勃·西蒙斯 他多年来一直想要这个
    * 纽约:ERDDAP™现在支持[字节范围/ 接受范围](https://en.wikipedia.org/wiki/Byte_serving)请求提供部分/文件/文件。 这样做是为了支持浏览器中的音频和视频观众。
    * 做:现在,改善安全,如果你指定&lt;baseHttpsUrl &gt; 在设置.xml中 (从而支持https) ,建议旗 乌尔是一个https带有更安全旗键的 URL 。 如果是的话,任何前旗Urls/flagKeys都会变为无效. 管理员 : 如果这些修改适用于您ERDDAP™还有如果你ERDDAP™已经EDDGrid从 Erddap 和 EDD 表格 从Erddap的订阅远程ERDDAPs,那么,在你更新后ERDDAP、ERDDAP™将自动尝试与新 flagUrl 订阅, 因此您应该删除旧的订阅, 并在获得新订阅验证电子邮件时验证新订阅 。
    * 做: 如果你的ERDDAP™已经EDDGrid来自Erddap数据集的ErdVH3数据集在鲍勃的海岸观察ERDDAP™,请修改以参考新的 erdVH2018 数据集。
    * 若您将 jplAquariusSS 样本数据集包含在您的ERDDAP™中,请修改datasetID给"V5"
    * 这样做:actual\\_range现在是一个 CF 标准属性 (截至2004年12月31日的) 并明确指出,如果变量使用add\\_offset和(或)scale\\_factor数据值,然后是actual\\_range值应当使用已解包的数据类型,并被解包。 不幸的是,这与我们先前的建议相冲突。 生成数据 Xml 现在打包actual\\_range值,但不会修正您中的现有数据集datasets.xml文档。
        
因此,请检查您的数据集:如果一个变量的值被打包,如果actual\\_range请添加一个&lt;addAttributes&gt; 翻译:actual\\_range以指定未打开的值。 否则,数据集将不会加载ERDDAP。 。 。 一个简单和几乎完美的方法 做到这一点 是搜索你的datasets.xml用于源代码 属性
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
(单位:千美元)scale\\_factor不包括1.0。 这些是actual\\_range属性。
        
对于轴变量EDDGrid数据集,ERDDAP™总是设置actual\\_range属性是数值的实际范围,因为它知道这些值。
        
对于带有降值的轴变量 (例如,一些纬度变量) , (中文).ERDDAP™创建actual\\_range与\\[0 个\\]. .  ....\\[最后一个\\]价值,是高... 低。 现在它总是使用低... 高值来做出新的CF定义.
        
正确性actual\\_range值对于EDDTable数据集特别重要,因为ERDDAP™将快速拒绝用户对数据值小于actual\\_range最小值或大于actual\\_range最大值。
        
相关:实际的QQMIN,实际的XMX,data\\_min和data\\_max属性现已贬值。 请将您的数据集转换为使用actual\\_range相反。
        
    * 这样做 (可选,但建议) 数字 : 您的每个近实时和预测数据集ERDDAP™,请添加[&lt;testOutOfDate&gt;] (中文(简体) ). (/docs/server-admin/datas#测试过时) 在窗体中带有值的标记now-_n 单位_,例如,now-两天。 如果数据集的最大时间值大于该值,则该数据集被视为过时,并将在[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)网页。 这为您提供了一种简单的方法,可以查看数据集源头出问题时的情况.
    *   [NEW: 带有 json- ld 的数据集的语义标记 (贾森 链接数据) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™现在使用[json -ld (英语). (贾森 链接数据) ](https://json-ld.org)使您的数据目录和数据集成为[语义网](https://en.wikipedia.org/wiki/Semantic_Web),这就是蒂姆·伯纳斯-李的主意,让网络内容更具有机器可读性和机器"可以理解". 搜索引擎 ([特别是谷歌](https://developers.google.com/search/docs/data-types/datasets)) 以及其他语义工具可以使用这种结构化的标记来方便发现和索引. json-ld结构化的标记 显示为隐形人对人&lt;脚本 &gt; 代码 http://.../erddap/info/index.html 网页 (语义网[数据目录](https://schema.org/DataCatalog)) 和每个 http://.../erddap/info/_datasetID_/index.html 网页 (语义网[数据集](https://schema.org/Dataset)) 。 。 。 。 (特别感谢爱尔兰海洋研究所的Adam Leadbetter 和Rob Fuller 努力使这部分工作成为ERDDAP。 。 。 。) 
    * NEW: 有新的数据集类型可以从音频文件中读取数据 :
        [EDDGrid从AudioFiles 调用](/docs/server-admin/datasets#eddfromaudiofiles),将音频数据作为网格数据处理。
        [来自音频文件夹的 EDD 表格](/docs/server-admin/datasets#eddfromaudiofiles),将音频数据作为表格数据。 感谢Jim Potemra,Rich Signell,OOI,以及Carrie Wall Bell对音频/氢手机文件支持的请求.
    * 更改生成 Datasets xml 数据 (及相关变动) 数字 :
        * 纽约:ERDDAP™现在有一个自动的系统[更新过时的 URL](/docs/server-admin/additional-information#out-of-date-urls)都在生成 Datasets 中 Xml 和装入数据集时. 如果您有关于额外 URL 的建议, 需要被抓取和更新, 或者您认为应该将它变成服务 (就像转换器) 电子邮件erd.data at noaa.gov。 。 。 。
        * NEW:现在,如果生成Datasets Xml 看到一个CFstandard\\_name  (应该都是小写) 有大写字符的,它将所有小写版本添加到&lt;addAttributes&gt; &gt;. 此外,当一个数据集装入时,如果ERDDAP™见一个CFstandard\\_name有大写字符, 它默默地将其更改为standard\\_name。 。 。 。 多亏了瑞奇·辛吉尔
        * NEW:现在,如果生成Datasets Xml 看到了一个没有ISO 8601格式的属性,它将ISO 8601格式化的时间添加到&lt;addAttributes&gt; &gt;. 若为ERDDAP™无法识别格式,它使时间值保持不变。 如果你看到一个格式ERDDAP™不识别和修复, 请通过电子邮件erd.data at noaa.gov。 。 。 。
        * 改进:EDDGrid从垃圾 生成 Datasets 中的目录选项 Xml 现在依赖于Unidatanetcdf-java 目录爬行器代码 (鞭打声 分类类) 这样它就能处理所有 THREDDS 目录 (非常复杂) 。 。 。 感谢罗兰·施韦策提出这一改变,并感谢Unidata代码。
        * 新建: 生成 Datasets Xml 为EDDGrid从Dap现在根据实际时间轴值添加",开始年份-结束年份"到标题结束. EndYear="现在",如果数据存在在过去150天.
        * 新建: 生成 Datasets Xml 为EDDGrid从Dap开始添加 ",\\[决议\\]°" 如果数据集的间距均匀,对拉特和龙相同,则改为标题。
        * IMPROVED:时间转换器现在具有额外的功能,主要是能够将各种常见格式的字符串时间转换成ISO 8601字符串或转换成UDUnits兼容数. 所有先前得到支持的特征继续发挥作用,没有改变。
        * BUG FIX: 生成数据 Xml和关键词转换器现在包括GCMD科学关键词开头的"地球科学&gt;". 当一个数据集被装入时ERDDAP™, (中文).ERDDAP™现在修正关键词属性中不以 " 地球科学 &gt; 开头的任何GCMD关键词, 或使用除标题大小写以外的任何东西的关键词 (将每个字的第一个字母资本化) 。 。 。 。
        * 改进:建议时&lt;destinationName&gt;s, 生成数据 Xml 用于 EDD Table FromAsii Files 的 Xml 仅使用尾端sourceName与'/'  (有的类似文件名) 。 。 。 。 现在它用整个sourceName(如"blahblahblah(m/s)"). 这种变化对于一些数据集是好的,对于其他数据集则不是,但它是更安全的行为. 多亏了莫里斯·利比斯
        * BUG FIX: 生成数据 Xml 和数据集构建器现在确保没有重复的列名称. 多亏了莫里斯·利比斯
        * BUG FIX: 生成数据 Xml 用于 EDD Table From AsciiFiles 没有写入&lt;列分隔符 &gt; 到输出。 现在有了 多亏了莫里斯·利比斯
    * New: DasDds 工具现在打印出时间间隔信息 (联合国[时间图像信息](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) 如果数据集是一个网格化的数据集。
    * NEW:高级搜索现在接受"现在的QQ-nUnits_"时间值. 多亏了Rich Signell
    * IMPROVED:为了提高安全性,当数据集元数据或数据中的电子邮件地址被写入html网页时,"@"改为"at". 这只抓取整个元数据或数据值的电子邮件地址,而不是嵌入较长值的电子邮件地址。
    * 改进:为加强安全,RSS用于私人数据集的信息现在只提供给用户 (和RSS读者) 被登录并获准使用该数据集。
    * New:现在,当一个数据集被装入时,如果date\\_created, (中文).date\\_issued, (中文).date\\_modified,或者date \\_metadata\\_ 已修改的属性具有时间值,而不在ISO 8601格式中,ERDDAP™将其更改为ISO 8601格式化时间。 若为ERDDAP™无法识别格式,它使时间值保持不变。 如果你看到一个格式ERDDAP™不识别和修复, 请通过电子邮件erd.data at noaa.gov。 。 。 。
    * 改进:.从EDDGrid数据集现在应大大加快。 多亏了Rich Signell
    * 与ERDDAP创建 ISO 19115 文件:
        * BUG FIX: 当创建ISO 19115文档时,dataVariable单位没有HTML属性编码, %没有编码。 瞷琌 感谢NGDC的ISO 19115验证器.
        * BUG FIX: 当创建ISO 19115文档时,date\\_created通常使用错误的格式。 现在它被转换成ISO 8601 Z字符串. 感谢NGDC的ISO 19115验证器.
        * BUG FIX: 当创建ISO 19115文档时,ERDDAP™现在写得更长, 年份=000 (气候数据集) ,因为ISO 19115 schema不允许与年份=000的日期. 感谢NGDC的ISO 19115验证器.
    * 纽:如在要求http.../erddap/版本将只返回版本编号 (作为文本) 例如, "ERDDAP=1.82" (中文(简体) ).
现在,一个请求http.../erddap/version QQstring 将返回一个数字和一个“ + + + SCII 文本的可选后缀 (没有空格或控制字符) 例如, "ERDDAP&#123;\fn华文楷体\fs16\\1cHE0E0E0&#125;"约翰斯福克" 做叉子的人会通过改变EDStatic.erddapVersion来说明这一点. 这样做不会给以前的版本带来问题ERDDAP。 。 。 。 多亏了阿心 (特别是凯尔·威尔科克斯) 爱尔兰海洋研究所 (特别是罗布·富勒) 。 。 。 。
    * 布鲁克斯: wms版本=1.3.0,请求=GetMap, crs=EPSG: 4326 (韩语). (非中央RS:84) 请求: bbox 命令必须是 minLat, minLon, maxLat, maxLon 。 对于CRS:84请求,和以前一样,bbox订单必须是minLon,minLat,maxLon,maxLat. 这可能会使用ERDDAP因为WMS1.3.0 服务于ArcGIS  (感谢保拉·阿尔塞) 。 。 。 。 谢谢 (没有) 改为OGC因为这让事情变得如此复杂 感谢Leaflet为了正确处理 并且给我一个测试的方法
    * 改进:前,建议链接:RSS电子邮件订阅有:http用于您的 URLERDDAP。 。 。 。 现在是httpsURL,如果是活动 。
    * 纽约:EDDGrid现在复制支持可选标签&lt;仅凭SomeValue _&lt;/仅是Since&gt;,其中的值是一个特定的ISO-8601格式化时间或一个now-n 单位 (例如,now-两年) 时间 见[仅限 自文件以来](/docs/server-admin/datasets#onlysince)。 。 。 。 感谢德鲁·P.
    * 改进:如果有,ERDDAP™将显示httpsURL( 来自&lt;baseHttpsUrl &gt;,如果有的话)而不是http当URL告诉用户添加/验证/重新移动/列出订阅时.
    * 布鲁克斯:ERDDAP™现在允许订阅动作从 " https://" 。 。 。 。 (鲍勃打他的额头。) 多亏了詹妮弗·塞瓦杰
    * 布鲁克斯:.jsonlKVP现在在每个键和值之间使用“:”而不是“'='。 。 。 。 (鲍勃打他的额头。) 多亏了亚历山大·巴特
    * 布鲁克斯: 之前,如果你重新开始ERDDAP™如果在数据集正常重新装入之前, 您会调用一个使用 EveryNMIlis 更新的 EDDTable FromFiles 数据集, 如果数据文件刚刚更改, 则请求会以无效指针错误失败 。 现在这个请求将会成功。 多亏了约翰·凯尔福特
    * NEW: 当一个数据集装入时ERDDAP™,关键词现在重新排列为排序顺序,并删除任何新行字符。
    * 现在,如果....json或.ncoJson的要求已经.jsonp参数,反应MIME类型为应用程序/javascript. 请注意:.jsonp 不支持用于.jsonlCSV或.jsonlKVP因为它不会工作。 多亏了罗布·富勒
    * IMPROVED: json 线条文件的 MIME 类型 Type 选项现在是"应用程序/x-jsonlines". 这是应用/jsonl。 目前,没有明确的正确选择。
    * IMPROVED:在状态.html页面上显示的失败请求数量将会增加,因为比以前更多的事物被算作失败,例如ClientAbortExcution.
    * 现在,如果来自ERDDAP™不被压缩,然后响应头将包含"Content-Encoding"="身份".
    * IMPROVED:不需要"许可证"属性. 现在,如果它没有被指定的话,来自消息.xml的标准License (或从设置.xml(如果存在)) 用作默认值。
    * 现在有一个选择[文件 Access 后缀属性](/docs/server-admin/datasets#fileaccessbaseurl)用于现有[文件 AccessBaseUrl 属性](/docs/server-admin/datasets#fileaccessbaseurl)。 。 。 。
    * 改进:为了增加安全性,本版本与最新的JavaJDK v8u162 (英语).
    * New:为了增加安全,提供临时电子邮件地址的几个共同域名 (例如,@mailinator.com) 现在在订阅系统的永久电子邮件黑名单中。
    * 新:为了加强安全,《每日报道》现在的清点包括:
设置数据集 旗下 IP 地址失败 (自上次每日报告以来)   
设置数据集 旗下 IP 地址失败 (自启动以来)   
设置数据集 旗舰 IP 地址已成功 (自上次每日报告以来)   
设置数据集 旗舰 IP 地址已成功 (自启动以来)   
"失败"的清点 让你看看是谁 (一个黑客?) 试图设置旗帜,但失败了。
    * 改进:为了增加安全性,&lt;在您的订阅中datasets.xml现在被认为是对案件不敏感。
         

## 1.80号版本{#version-180} 
 (2017-08-04发布.) 

*    **新特性 (用户) 数字 :**   
     
    * 新建orderByCount () 过滤器允许您指定结果表的排序方式 (或者没有) 并只返回每类组的一行,并计算每个变量的非缺失值。
举例来说,orderByCount (" , "stationID" , ") 将排序stationID返回每行一行stationID,并计算每个变量的非缺失值。
如果你只是具体说明orderByCount (""(")) ,该响应将只包含每个数据变量的非缺失值的一行。
见[orderBy...文档](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)多亏了本·亚当斯
    * 新建.ncoJson 文件 网格和表格数据集的类型选项。 这个选项是NCOlvl=2 "pedantic" JSON 文件,其中包含通常在a中找到的所有信息.nc文档。 见[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)感谢查理・詹德。
    * 布鲁克斯: 那个orderBy. .  .... () 选项。
    * BUG FIX:. geoJson 输出现在不打印缺失拉特值或龙值的行. 此外,高度值 (如果有的话) 现在列入坐标,而不是作为数据值。 多亏了乔纳森·威尔金斯
         
*    **东西ERDDAP™管理员需要知道和做:**   
     
    * 安全议题: 用于OpenLayers演示到WMS页面ERDDAP™已经过时,并且有一个可能允许它被滥用的bug。 (不幸的是,更新OpenLayers和协议。 js不简单。) 这为建立图书馆提供了可能性,以允许跨地点的脆弱性。 然而,由于ERDDAP™仅使用OpenLayers以特定预设方式且仅限特定ERDDAP- 基于数据来源,我们认为,在ERDDAP使用OpenLayers和协议.js。但是,如果你不相信这一点,现在可以停止使用OpenLayers演示到WMS您的页面ERDDAP™通过添加
```
        <openLayersActive>false</openLayersActive>  
```
到您的设置. xml 文件 。 默认是"真". 感谢查尔斯·卡莱顿和NCEI.
    * 安全变换:未使用.jar文件和复制.jar文件 (因为他们也住在Netcdfall.jar) 已删除ERDDAP™分发。 过时的.jar文件已经更新 。 感谢查尔斯·卡莱顿和NCEI.
    * 安全变化: 分发的 netcdfal.jar 文件ERDDAP™是最新版本 (现为4.6.10) ,但它仍然包含内部的Jackson .jar文件,这些文件已知已经过时,并且有安全漏洞,特别是杰克逊图书馆,它们仅在访问亚马逊S3数据源时才使用. 如果你不通过亚马逊S3访问数据 (狦琌) 这些脆弱性并不相关。
        
netcdf-java开发者认为,由于Netcdf代码使用这些库的方式,这些弱点并不相关,而且无论如何只有在访问亚马逊S3时才相关. 见[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866)。 。 。 我相信他们 如果您对此事仍有顾虑,请联系netcdf-java开发者. (请注意,如果你不相信 netcdf-java 开发者 并且正在考虑不使用ERDDAP™因为这样,你也不应该使用THREDDS, 因为THREDDS使用netcdf-java比ERDDAP。 。 。 。) 
        
细节 : 麻烦的代码和弱点警告是:
(原始内容存档于2018-09-26). netcdf All-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml.
见 https://nvd.nist.gov/vuln/detail/CVE-2016-7051 - —— - 说 高级
netcdfall-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml 互联网档案馆的存檔,存档日期2014-03-02.
见 https://nvd.nist.gov/vuln/detail/CVE-2016-7051 - —— - 说 高级
core/jackson-anotations/pom.xml) (中文(简体) ).
见 https://nvd.nist.gov/vuln/detail/CVE-2016-7051 - —— - 说 高级
见 https://nvd.nist.gov/vuln/detail/CVE-2016-3720 - 关键
(原始内容存档于2018-09-21). All-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml.
见 https://nvd.nist.gov/vuln/detail/CVE-2016-7051 - —— - 说 高级
见 https://nvd.nist.gov/vuln/detail/CVE-2016-3720 - 关键
"对于4.6.10版本,aws-java-sdk-core拉力在2.6.6版本的杰克逊-QQ文物". (来自netcdf-java人的电子邮件) 。 。 。 。
感谢查尔斯·卡莱顿和NCEI.
        
    * 相声变化: 如果你重新编译ERDDAP™,注意命令行所需的-cp类路径参数现在比以前短得多。 参见新- cp 设置[本文档](/docs/contributing/programmer-guide#development-environment)。 。 。 感谢查尔斯·卡莱顿和NCEI.
    * 生成时的新选项 Xml: EDD Table FromBcodmo,仅供BCO-DMO内部使用.
感谢亚当·谢泼德和BCODMO.
    * 新的图解和构象: 如果 EDDTable 列有网络可访问文件的文件名 (例如,图像、视频或音频文件) ,您可以添加
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
指定基准 URL (结尾为 /) 需要使文件名成为完整的 URL 。 那是为了.htmlTable答复,ERDDAP™将文件名显示为合并 URL 的链接 (基础 乌尔加文件名) 。 。 。 。
如果你想的话ERDDAP™为相关文件服务,为这些文件制作单独的 EDDTable FromFileNames 数据集 (也许是私人数据集) 。 。 。 。
感谢亚当·谢泼德和BCODMO.
    * 新ATTRIBUTE建议:如果一个 EDDTable 列有网页可访问文件的文件名 (例如,图像、视频或音频文件) 可以通过档案库访问 (例如,.zip文件) 可通过 URL 访问,使用
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
为归档指定 URL。
如果你想的话ERDDAP™要为归档文件服务,请为该文件制作单独的 EDDTable FromFileNames 数据集 (也许是私人数据集) 。 。 。 。
感谢亚当·谢泼德和BCODMO.
    * 改进生成任务 Xml 以去除无效/坏的原因&lt;subsetVariables&gt; 建议和重复/坏建议变量名称等。 感谢Rich Signell、Adam Shepherd和BCO - DMO。
    * 新选项: 政治边界信息ERDDAP是来自第三方 有点过时。 另外,世界上有几个地方存在争议的边界,不同的人会对正确之处有不同的想法. 我们没有就随之而来的政治证据的缺陷提出索赔ERDDAP。 。 。 如果你不喜欢政治边界信息ERDDAP™,现在你可以告诉ERDDAP™绝不通过添加来划定政治界限
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
到您的设置. xml 文件 。 默认是"真". 感谢拉吉·德文德.
    * 新气象台塔格: 在那个datasets.xml对于数据集,您现在可以指定默认的颜色数 a 的条块dataVariable图表和地图
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (默认= 1, 表示要让ERDDAP™决定) 。 。 。 。 见[颜色 栏设置](/docs/server-admin/datasets#color-bar-attributes)。 。 。 。
    * 改进:地图上的国家边界颜色是紫色 (深紫色给你,宝贝) 。 。 。 。 现在灰了 (在国家边界灰色和陆地灰色之间) 。 。 。 。
    * 布鲁克斯:&lt;iso19115文件 &gt; 和&lt;fgdcFile &gt; 单位为datasets.xml处理得并非总是正确。 瞷琌 感谢BCO -DMO。

## 版本1.78{#version-178} 
 (2017-05-27发布.) 

*    **新特性 (用户) 数字 :**   
     
    *    (无)   
         
*    **东西ERDDAP™管理员需要知道和做:**   
     
    * IMPROVED:状态上"Major LoadDatasets Time Series"中的行序.html页面目前是上到下行最古老的.
    * 布鲁克斯:ERDDAP™现在写.nccsv带有时间变量的文件actual\\_range作为 ISO-8601 字符串时间。 用 EDD Table From Erddap 解析远程数据集和所有 EDD Table From... Files 数据集快速重开文件的信息来修正错误 。 (时间actual\\_range在 v1.78 中,数据集的负载第一次会错误,但在重新装入后正确,例如,如果您标记数据集。) 

## 第1.76版 (中文(简体) ).{#version-176} 
 (2017-05-12发布.) 

*    **新特性 (用户) 数字 :**   
     
    * Tomcat的变化: 请求ERDDAP™来源于网页浏览器以外的软件 (例如,curl韩语Matlab, (中文).Python, (中文).Java) 数字 :
和之前Tomcat版本的修改一样 (运行的低级软件ERDDAP) 自2016年初以来,请求 URL 查询部分中越来越多的字符必须是[ **编码百分比** ](/docs/server-admin/datasets#infourl)出于安全考虑 浏览器为您负责%编码。 这样使用ERDDAP™在浏览器中不受影响,除非请求被重定向到另一个ERDDAP。 。 。 。
    * 改进:前,ERDDAP™治疗 **字符变量** 更像是未签名的短整数而不是字符。 现在它更像一个特征的UCS -2 (统一编码) 弦乐 见[字符文档](/docs/server-admin/datasets#char)。 。 。 多亏了奥雷利·布赖恩德和阿尔戈项目.
    * 改进:前,ERDDAP™几乎没有人支持 **Unicode 字符** 高于字符串中的 # 255。 现在,内部,ERDDAP™完全支持 2 字节 UCS-2 字符 (字符编号为 0 到 65535) 在字符串中。 当字符串数据被写入各种文件类型时,ERDDAP™尽力支持2字节字符。 另一个例子是.csv文件ERDDAP™使用 ISO- 8859-1 字符集写入 (1字节字符集) 这样ERDDAP™使用 JSON 相似的\\u_hhh_语法写上字符 # 255 。 见[字符串数据](/docs/server-admin/datasets#string)。 。 。 。
    * 改进:.nc编写文件ERDDAP™,将被解释为字符串的字符变量将具有属性
         **编码=ISO-8859-1**   
内.nc读取的文件ERDDAP™,带有“QQ编码”的字符变量将被解释为带有指定字符集的字符串。
    * 重审:ERDDAP™支持 **类似JSON的反斜码编码** 当指定字符串变量和字符串变量的制约时,将指定特殊字符。 因此,您可以请求类似 &myString="\\u20ac"的数据,因为从20ac开始, MyStringQQ是欧洲符号代码点的十六进制版本。 网络上的几个来源显示Unicode符号的代码点号,例如,[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode)。 。 。 。
    * 改进:前,ERDDAP™提供有限的支助 **长整数** 变量。 现在ERDDAP™完全支持内延,并在将长长数据写入各种文件类型时尽力. 见[长文档](/docs/server-admin/datasets#long)。 。 。 感谢爱尔兰的海洋研究所,克雷格·里西安,里奇·辛吉尔,克里斯托弗·温加德和OOI.
    * 新建: gradap 输出文件类型tabledap数字 : **.nccsv** ,它使一个NetCDF- 类似,ASCII,CSV文件 包含所有元数据,可以比较.nc文档。 见[NCCSV 网络 规格](/docs/user/nccsv-1.00)。 。 。 。 多亏了史蒂夫·汉金
    * 纽约: **orderByClosest过滤器** 让您指定结果表格的排序方式和间隔 (例如,2小时) 。 。 。 在每个排序组中,只保留最接近间隔的行。 举例来说,orderByClosest (" , "stationID时间,两个小时") 将排序stationID和时间,但只返回每行stationID在最后一个orderBy栏 (时间) 最接近2小时间隔。 这是最接近的东西tabledap在网格dap请求中显示值。 此选项可以通过任意tabledap数据集的.html网页,.graph网页,以及您自己创建的任何URL。 感谢爱尔兰海洋研究所和加拿大海洋网络。
    * 纽约: **orderByLimit过滤器** 让您指定结果表的排序方式和限制号 (例如,100) 。 。 。 在每类组中,仅保留第一行的“限制”。 举例来说,orderByMax (" , "stationID,100" (韩语).) 将排序stationID,但每行仅返回前100行stationID。 。 。 这与SQL的LIMIT条款类似. 此选项可以通过任意tabledap数据集的.html网页,.graph网页,以及您自己创建的任何URL。 感谢爱尔兰海洋研究所和加拿大海洋网络。
    * 两种新的响应文件类型, **.jsonlCSV和.jsonlKVP** 用于请求设置网格的数据集、表格数据集和许多其他地方。ERDDAP  (例如,要求提供关于数据集的信息) 。 。 。 文件是 JSON Lines 文件 ([ https://jsonlines.org/ ](https://jsonlines.org/)) 其中每行有一个单独的 JSON 对象。.jsonlCSV仅仅有 CSV 格式的值。.jsonlKVP有密钥 : 值对. 每条线都靠自己 这些线条不包含在更大的JSON阵列或对象中. 例如,见[此样本请求](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z)。 。 。 多亏了达米安·史密斯,罗布·富勒,亚当·莱恩比特,以及爱尔兰的海洋研究所.
    * New:有新的文件描述[ **如何在ERDDAP™通过脚本** ](/docs/user/AccessToPrivateDatasets)。 。 。 感谢林恩·德维特.
    * 改进: **OpenLayers** 地图是2度,现在是4个数据像素。 多亏了罗斯蒂·霍勒曼
    * 改进:在某些常见情况下,请求包括: **正则表达式** 限制的处理速度要快得多。
         
*    **东西ERDDAP™管理员需要知道和做:**   
     
    *    **慢慢地开始:** 你第一次开始这个新版本 需要很长时间ERDDAP™装入所有数据集,因为它需要重新读取所有源数据文件 (虽然只是网格数据文件的标题) 。 。 。 如果你查看日志,你可能会看到一些内部文件“旧/不支持的增强版本”的错误消息——没关系——ERDDAP™将制作内部文件的新版本。 请耐心点
    * 行动:ERDDAP™现在使用新的 **时间** 类 (也称为JSR 310) 而不是乔达将字符串时间分析成数字时间. 注释:
        * 若为ERDDAP™给定数据集的字符串解析时间突然出现问题,因此只是将大部分或所有时间转换为 NaN (缺少值) 问题几乎总是与日期有关 您指定为变量“ 单位” 的时间格式字符串。 新系统有时需要稍微不同的日期时格式字符串.
        * 如果日期中的数月和数日时间字符串不是0加法 (例如,“3/7/2016”) ,确保格式只有一个M和d (例如"M/d/yyyy",而不是"MM/dd/yyyyy".) 。 。 。 。
        * 更改使用小写 s 的分数秒规格 (例如:yyyy-MM-dd'T'HH:mm:s.sss (英语).) 输入资本 苏 (例如,yyyy-MM-dd'T'HH:mm:s.SS (英语).) 。 。 。 。
        *   ERDDAP™不再支持字符串日期 2位数年的时间格式 (哟) 与一个隐含的世纪 (例如,1900年或2000年) 。 。 。 企业在1990年代后期花费了数十亿美元来解决这个问题。 科学家不应使用两位数年。 请修复源文件 (编号) 转换为4位数的年份,然后在日期中使用yyyyy 时间格式.
        * 你可以用yyyyyyyyyyyyyyyyyyyyyyyyyyyyyiyyyyyyyyyyyyyyyyyyyyyyyyi. kgm (哪个ERDDAP™转换为uuu) 4位数年,包括负数年,例如 -4712 (这是公元前4713年) 。 。 。 感谢SeaDataNet,托马斯·加德纳和BODC.
        * 请在日期格式中继续使用 ZERDDAP分析时间 (例如,Z,+0200,-08,-0800,-08:30) 。 。 。 。
        *    **请务必使用Java1.8.0\\_21或更高版本.** 
        * 程序员 - —— - 说 如果你写Java运行的程序ERDDAP™代码,您需要删除 joda -time 的引用。 在类路径参数中。
    * 纽约:ERDDAP因为[存档A 数据集工具](/docs/server-admin/additional-information#archiveadataset)现在可以创建[ **BagIt 文件** ](https://en.wikipedia.org/wiki/BagIt)。 。 。 国家环境倡议可在此格式上标准化。 感谢斯科特·克罗斯和约翰·雷尔夫.
    * IMPROVED:下载erddap的链接. 战争ERDDAP™现在的网页指向 **GitHub 图像** 。 。 。 。 (他们是公共链接, 所以你不必加入GitHub。) 这意味着更快的下载 (最高12兆布/秒对1兆布/秒) 并且下载时很少出现问题。 感谢达米安·斯迈思,罗布·富勒,亚当·莱恩比特,康诺·德莱尼,以及爱尔兰的海洋研究所.
    * 改进: **status.html 页面和每日状态报告电子邮件** 现在包括一个"主要负载Datasets时间序列"部分,该部分显示有关ERDDAP™截至最后100个主要负载Dataset的每个主要负载的结束。 多亏了我们的麻烦瑞德
    * 一个新的,可选的 (建议) EDDTable FromCassandra数据集参数: [ ** &lt;分区KeyCSV&gt; ** [ . ] (/docs/服务器-admin/数据集#partitionkeycsv) 。 。 。 感谢加拿大海洋网络。
    * 新建: EDD Table from AsciiFiles 现在支持 ** &lt;列分隔符 &gt; ** 参数。 如果无效或“ ” , 类会像以前一样猜测, 否则, 第一个字符会在读取文件时作为列分隔符 。 感谢天空布里斯托尔和阿比盖尔·本森.
    * 新建:新数据集类型,[ **来自 Nccsv 文件的 EDD 表格** ](/docs/server-admin/datasets#eddtablefromnccsvfiles),可以通过汇总生成数据集[NCCSV .csv 文件](/docs/user/nccsv-1.00)。 。 。 。 多亏了史蒂夫·汉金
    * 改进: **来自Erddap的EDD表** 现在使用.nccsv从远程获取信息ERDDAPs和用于元数据信息的地方档案。 这使得对字符和长数据类型以及Unicode 的全力支持成为可能 (UCS-2 导弹) 字符串的字符集 。 感谢罗布·富勒和爱尔兰海洋研究所.
    * 改进:EDD表从Erddap和EDDGrid从Erddap开始支持 ** &lt;重定向 &gt; 虚假&lt;/定向 &gt; ** 说明ERDDAP™永远不要将请求重定向到远程ERDDAP。 。 。 。 缺省为真. 遥控器时此功能有用ERDDAP™是一个私人ERDDAP。 。 。 感谢达米安·史密斯,罗布·富勒和爱尔兰的海洋研究所.
    * 改进:ERDDAP™现在捕获 **用户请求已取消** 快点 还有ERDDAP™现在关闭得更快 因为低层线条关闭得更快 多亏了我们的麻烦瑞德
    *    **生成数据 Xml : (帮助)** 
        * 新:新的EDDType“ndump”打印为[数字](https://linux.die.net/man/1/ncdump)类似打印一个字头的打印.nc文档。 您也可以打印指定变量的数据值 (或输入“无”以不打印任何数据值) 。 。 。 这样做是有用的,因为如果没有 ncdump, 很难知道文件中的内容, 以及您应该为 GenerateDatasetsXml 指定哪个 EDDType 。 感谢克雷格·瑞西恩,里奇·辛吉尔,克里斯托弗·温加德和OOI.
        * 新: 对于海数据 净数据:
酌情生成 Datasets Xml 现在使用远程的 SPARQL 查询进行特定的语义转换: 如果变量的源元数据包括 sdn\\_参数\\_n, 例如 sdn\\_参数\\_n = "SDN: P01:: PSLTZZZ01", 生成 Datasets Xml 将添加相应的 P02 属性,例如 sdn\\_P02\\_urn = "SDN: P02:: PSAL". 如果您有使用这些属性的数据集,如果ERDDAP因为&lt;categoryAttributes&gt; in setup.xml 包括 sdn\\_parameter\\_ 和 sdn\\_P02\\_ur,用户将能够使用ERDDAP™类搜索系统可以搜索这些属性的特定值的数据集. 感谢BODC和亚历山德拉·科基纳基.
        * 改进:生成数据 Xml 现在改变很多http://元数据中提及https://适当时。
        * 改进:生成数据 Xml 现在尝试猜测创建者QQ类型和发布者QQ类型.
        * IMPROVED: GenerateDatasets建议的变量数据类型 Xml现在会好一点。 感谢玛格丽特·奥布莱恩,LTER和EML.
        * 改进:生成数据 Xml 更能指定&lt;cdm\\_data\\_ type&gt; 并添加相关,需要的属性(例如,&lt;cdm\\_timeseries & gt;),所以你可以提供这些信息. 多亏了Rich Signell
        * 改进:生成数据 Xml, EDDTable数据集,建议:&lt;subsetVariables&gt; 现在更加保守。 多亏了约翰·凯尔福特
        * 改进:如果datasets.xml指定数据集featureType但不包括 cdm\\_data\\_ 类型,featureType将用作 cdm\\_data\\_ 类型。 多亏了Rich Signell
        * BUG FIX: 生成 数据集 Xml 现在建议正确&lt;数据Type &gt; ,用于数据变量scale\\_factor, (中文).add\\_offset和/或QQ未签名属性。
    * 改进:何时ERDDAP™打开一个.nc文件为 **缩短** 而不是它应该是 (例如,没有完全复制到原地) , (中文).ERDDAP™现在视文件为坏。 前情提要,前情提要,ERDDAP™返回文件任何缺失部分的缺失值, 因为这是 netcdf- java 的默认行为 。ERDDAP™现在使用ucar.nc2.iosp.netcdf3.N3header.disallow File Truncation=为真; 2. 感谢我们麻烦的RAID和克里斯蒂安・沃德・加里森
    * 改进: ISO 19115 编写器现在使用 **创建者QQ 类型** ,如果在场。
    * 改进:ERDDAP™现在使用最新的netcdf-java v4.6.9,它可以读取更多类型的 **netcdf-4 文件 存档** 。 。 。 感谢克雷格·瑞西恩,里奇·辛吉尔,克里斯托弗·温加德和OOI.
    * BUG FIX:如果不同的源文件对给定变量有不同的数据类型,则避免麻烦. 多亏了罗伊·门德尔索恩和尤金·伯格.
    * 布鲁克斯: **时间格式转换** 现在,更好地保护人们免受不良时间价值的影响。 感谢NDBC。
    * 布鲁克斯:EDDGrid从NcFiles调用 现在未打包处理时间值 **"几个月后..." "几年后..."** 没错 (通过逐月或逐年递增,而不是粗略地增加,例如重复30天) 。 。 。 。 感谢Soda3.3.1。
    * 刚刚在v1.74, **订阅** 需要采取行动 (例如,http://. .  ....) ,这是并且应该是可选的。
    * 布鲁克斯:EDDGrid从 MorgeIRFiles.lowGet SourceMetadata 获取源代码 () 没有添加任何全局属性. 现在有了
         

## 第1.74号版本{#version-174} 
 (2016-10-07年发布) 

*    **新特性 (用户) 数字 :**   
     
    * 现在, 当一个数据集列表时 (全部,或者从搜索) 在网页上显示,在多行上显示长标题。 以前,长标题的中间部分改为 " . " 。 感谢玛格丽特·奥布莱恩,LTER和EML.
         
*    **东西ERDDAP™管理员需要知道和做:**   
     
    * 要完成: 在 Linux 计算机上, 更改 Apache 超时设置, 以便耗时的用户请求不超时 (与经常出现的“ Proxy” 或“ Bad Gateway” 错误) 。 。 。 。 作为根用户 :
        
        1. 修改 Apachehttpd.conf 文件 (通常为/etc/http(单位:千美元)) 数字 :
更改现有的&lt;超时 &gt; 设置 (在文件末尾添加一个) 改为3600 (秒数) ,而不是默认的60或120秒。
更改现有的&lt;代理时空 &gt; 设置 (在文件末尾添加一个) 改为3600 (秒数) ,而不是默认的60或120秒。
        2. 重新启动 Apache: /usr/sbin/apachectl - 宽宏大量 (但有时它出现在不同的目录中) 。 。 。 。
        
多亏了托马斯·奥利弗
         
    * 纽约:\\[大家长会 旗帜目录
这类似旗舰目录,但硬旗版也删除了所有缓存数据集信息. 没有设置硬旗的 URL 。 这只能通过在目录中放置一个文件来使用.
难 旗子很有用 当你做一些事情 导致改变如何ERDDAP™例如,当您安装新版本时,读取并解释源数据ERDDAP™或当您对数据集定义在datasets.xml。 。 。 。 见[本文档](/docs/server-admin/additional-information#hard-flag)。 。 。 多亏了John Kerfoot和所有Argo团体.
         
    * 新建: 生成 Datasets Xml 现在有一个 EDD Table FromEML 选项
在生态元数据语言中读取数据集描述 (EML 电子邮件) 文件,下载相关的数据文件,并生成块datasets.xml这样可以将数据集添加到ERDDAP。 。 。 还有一个EDDTable FromEMLBatch,它对目录中的所有EML文件都做同样的事情. 这非常有效,因为EML在描述数据集方面做了出色的工作,而且KNB和LTER提供了实际的数据文件.
EML 加号ERDDAP™可以是一个伟大的组合,因为ERDDAP™可以让用户更直接地获取KNB和LTER的丰富数据,并帮助这些项目满足美国政府的要求。[公众获取研究成果的机会 (牧师) 所需经费](https://nosc.noaa.gov/EDMC/PD.DSP.php)通过网络服务提供数据。
见[本文档](/docs/server-admin/EDDTableFromEML)。 。 。 感谢玛格丽特·奥布莱恩,LTER和EML.
         
    * 新建: 生成 Datasets Xml 现在有一个来自InPort 的 EDD Table 选项
它在 InPort XML 文件中读取数据集描述,并试图生成一个块datasets.xml这样可以将数据集添加到ERDDAP。 。 。 这很少产生一个可随时使用的 XML 块datasets.xml,但它会创造一个很好的粗略的草稿,成为人类编辑的好起点.
如果使用InPort记录数据集的人也能使用ERDDAP™通过下列途径提供实际数据:ERDDAP网络服务,从而满足美国政府和NOAA因为[公众获取研究成果的机会 (牧师) 所需经费](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)通过网络服务提供数据。 这是现在可以使用的解决方案。 (erd.data at noaa.gov很乐意帮忙)   
见[本文档](/docs/server-admin/datasets#eddtablefrominport)。 。 。 感谢埃文·豪威尔和梅兰妮·阿贝卡西斯.
         
    * 改进:ERDDAP™现在使用netcdf-java 4.6.6.
与早期版本, netcdf- java 读取一些填充值 (也许,就在Netcdf-4文件中) 作为0's。 现在它把其中一些读作netcdf标准填充值:字节为 -127,短节为 -32767,英寸为 -2147483647.Unidata说新行为是适当的行为. 如果一个数据集中的变量开始显示其中的一个数值,它们用来显示0's,则可以添加,例如,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
到变量的addAttributes告诉ERDDAP™将这一数值视为missing\\_value/\\_ 填充 价值. 然而,在许多情况下,这不会产生预期的结果:0's. 如果是的话,考虑修改文件。NCO或重写文件。 投诉? 请联系Unidata;-) (中文(简体) ).
         
    * 待办:新的地形深度调色板
我鼓励您切换所有使用海洋深度调色板的数据集,以使用新的地形深度调色板,这种调色板除了带有翻转的颜色外,都类似于地形,从而适合深度值 (正负=下) ,而不是高度值 (正数=上) 。 。 。 此调色板建议设置如下:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * 新风: 字符串missing\\_value和/或QQ 过滤
如果字符串变量定义了missing\\_value和/或QQ 消防车,ERDDAP™将会从数据中删除这些值并以空字符串替换,这样缺失的值就如同其他数据集一样出现空字符串ERDDAP。 。 。 感谢玛格丽特·奥布莱恩,LTER和EML.
         
    * 新风: 支持本地时间
带有 Strings 源数据的时间戳变量现在可以通过 " 指定一个时区time\\_zone" 导致的属性ERDDAP™转换本地时区源时间 (有些在标准时间,有些在日光节时) 输入Zulu时间。 有效时区名称列表可能与TZ列列表完全相同[此表格](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)。 。 。 。 默认是 "Zulu" .. 美国常见的时区有:美国/夏威夷,美国/阿拉斯加,美国/太平洋,美国/山地,美国/阿里索纳,美国/中部,美国/东部. 对于带有数字源数据的时间戳变量,可以指定 "time\\_zone" 属性,但价值必须是 "Zulu" 或"UTC"(UTC). 感谢玛格丽特·奥布莱恩,LTER和EML.
         
    * New FEATURE: EDDTable FromAsciiFiles 现在支持分号分隔文件
更聪明地想出分离器。 感谢玛格丽特·奥布莱恩,LTER和EML.
         
    * 新风: 如果负载 Datasets 出现重大错误 (主要或次要,例如失踪或无效datasets.xml文档) , (中文).ERDDAP™将在状态.html中显示它,位于“ n Datasets 失败后装入” 下方为 ERROR: 处理时datasets.xml:详情请参见log.txt.
         
    * 新风:ERDDAP™寻找孤儿。
何时ERDDAP™执行主要负载 数据集,它现在寻找孤儿数据集 (正在使用的数据集ERDDAP™但没有在datasets.xml) 。 。 。 如果找到, 则在状态. html 中列出, 在“ n Datasets 失败到装入” 下方为 ERROR: n Orphan Dataset (数据集在ERDDAP™但没有在datasets.xml) &#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;你觉得呢?
如果你想删除 (卸货) 孤儿ERDDAP™,需要添加
        &lt;数据集类型="_任何ValidType_"datasetID="_数据集_"活动="虚假"/&gt;
改为datasets.xml直到在下一个主要负载Datasets中卸下数据集。
         
    * 布鲁克斯: 如果一个数据集有一个数字时间戳变量,其单位不包含"seconds since 1970-01-01T00:00:00Z"和与&lt;更新 EveryNMillis &gt; 系统活动,在更新数据集时,时间戳变量的范围被错误设定. 多亏了约翰·凯尔福特
         
    * - 狦&lt;快速 Restart &gt; 在设置. xml 中是真实的, 您要求从 EDD Table 从... 使用的文件数据集&lt;更新EveryNMillis&gt;,数据集的第一个请求会失败,但随后的请求会成功. 现在第一个请求不会失败. 多亏了约翰·凯尔福特
         
    * BUG FIX:GenerateDatasetsXml.sh和.bat在命令行上没有使用&gt;9参数. 现在,他们做到了。 多亏了约翰·凯尔福特
         
    * 布鲁克斯: 新的 EDD Table From MultidimNcFiles 没有始终从字符串中删除后缀空格 。 现在有了 值得注意的是,这影响了ARGO文件。 感谢凯文·奥布莱恩和罗兰·施韦策.
         
    * 布鲁克斯: 所有远程访问DAP现在由更现代的代码发起服务. 这将在访问一些 EDD Table FromErdddap 数据集时修正“ 连接关闭” 错误 。 感谢凯文·奥布莱恩。
         
    * 布鲁克斯: 处理orderBy. .  .... () 独立 () 现在又回到了最近变化之前的状态: 给定请求可能有多个orderBy. .  .... () 和/或单独的 () 过滤器;ERDDAP™将按指定的顺序处理它们。 多亏了大卫·卡鲁加
         
    * 布鲁克斯: 如果数据集是 EDD Table FromDatabase 并且有一个查询[源代码](/docs/server-admin/datasets#sourcecanorderby)和(或)[源代码CanDistinct](/docs/server-admin/datasets#sourcecandodistinct),然后数据库可能 (取决于设置在datasets.xml) 部分或全部处理 **只有第一个**  orderBy. . . . . . . () 或单独 () 。 。 。 。 感谢大卫·卡鲁加.
         
    * 布鲁克斯: 最近的额外百分率编码引起了一些查询的问题.ncCF文件,例如“HTTP状态” 500 - 查询错误:变量=站点在结果变量列表中两次列出". 感谢凯文·奥布莱恩。
         
    * BUG FIX: EDDTable FromFiles在其中一列为真字符列时重装数据集有困难. 感谢罗兰·施韦策.
         
    * 布鲁克斯:EDDGrid从NcFiles调用 现在不包装也转换missing\\_value和 QQFillValue 到标准值, 从而可以对不同值的文件进行聚合。 由于这个变化,在您安装这个新版本后,ERDDAP™请设置一个[难 旗帜](/docs/server-admin/additional-information#hard-flag)每人EDDGrid从NcFiles调用 您的未包装数据集ERDDAP。 。 。 。
         
    * 改进:EDD Table FromNcCFFiles现在可以处理有多个样本的文档。 一个给定的数据集必须只使用一个样本的变量。 感谢Ajay Krishnan。
         
    * 改进:从...&lt;排序FilesBy Source名称 &gt; 现在允许逗号分隔 (建议) 或空格分隔的变量源名称列表。 无论是哪种情况,单个变量名称都可能被双引号包围,例如,如果该名称有内部空间.

## 1.72号版本{#version-172} 
 (2016-05-12发布) 

*    **新特性 (用户) 数字 :** 无。
     
*    **东西ERDDAP™管理员需要知道和做:** 
    * 新的多边形窗表[来自多分位Nc Files的 EDD表](/docs/server-admin/datasets#eddtablefrommultidimncfiles)是 EDD Table From NcFiles 的新替代品。 它旨在处理若干具有共同维度的变量的文件组,例如 var1\\[(单位:千美元)\\]\\[3个P-4\\], var2 数据\\[(单位:千美元)\\], var3 数据\\[3个P-4\\]斯卡拉瓦尔 感谢阿尔戈计划,奥雷利·布赖恩德和罗兰·施韦策.
    * 布鲁克斯:ERDDAP™  (通过 FileVisitorDNLS 和 FileVistorSubdir 类) 现在跟随Linux上的符号链接.ERDDAP™仍然不跟随.lnk在Windows上.
    * 1.70中引入的bug的BUG FIX:显式+orderBy在一个请求中不允许一起提出。 现在又来了 它们并非相互排斥/重复。 多亏了大卫·卡鲁加
    * 改为:datasets.xmlIP地址黑名单 :
IP v4 地址显示为ERDDAP™作为4个间隔的十六进制数字。
我认为IP v6地址 显示为8个结肠分隔的六联号。
这么说ERDDAP™现在支持该列表中的IP地址中的冒号,并且:\\\在列表的末尾屏蔽一系列地址.
    * 改进:ERDDAP™现在使用 NetcdfFileWriter 写入.nc文件代替已贬值的NetcdfFileWriteble。 由此产生的文件不应有明显的变化。 这打开了让大.nc使用.nc3,64位扩展. 如果你想/需要,请向erd.data at noaa.gov。 。 。 。
    * 改进:远程网站的许多链接已经过时。 现在它们已经更新并使用https:改为http: 只要有可能。
    * 许多小变化.

## 第1.70版 (中文(简体) ).{#version-170} 
 (2016-04-15发布.) 

*    **新特性 (用户) 数字 :** 无。
     
*    **东西ERDDAP™管理员需要知道和做:** 下面是您设置的. xml 文件对文档的几个建议修改 。
请现在做出这些改变。
现在30分钟的工作 可能节省你的时间 混乱的未来。
    * 错误修正 : 问题在于,这些请求被重新导向远程ERDDAP无效字符失败 。|' 错误消息 。 这只发生在最近版本的Tomcat上. 感谢罗斯蒂·霍勒曼,康诺·德拉尼,以及罗伊·门德尔索恩.
    * 错误修正 :ERDDAP™现在使用最新版本的Netcdf-java (说来话长) 它包括对NcML的最新支持,它解决了NcML逻辑Reduce不按预期工作的问题。 元数据可能有几处小的改变ERDDAP™通过 netcdf-java 从.nc, (中文)..hdf, .grib, 和.bufr文件。 多亏了法维奥·梅德拉诺
    * 新的[EDD 表格外观](/docs/server-admin/datasets#eddtableaggregaterows)允许您从两个或多个 EDDTable 数据集中创建合并的 EDDTable 数据集,这些数据集使用相同的单位具有相同的数据变量。 谢谢凯文·奥布莱恩
    * 数据库中的 EDD Table 新选项 ([源代码](/docs/server-admin/datasets#sourcecanorderby)和[源代码CanDistinct](/docs/server-admin/datasets#sourcecandodistinct)) 请具体说明是否ERDDAP™,数据库,或两者兼有,处理不同的和orderBy  (和所有变体) 限制。 感谢大卫·卡鲁加.
    * 现在,您可以通过新的数据向公众提供私有数据集的图表和元数据[。]&lt;图表可访问到 &gt; 公开&lt;/graphsAccessibilityTo &gt;] (中文(简体) ). (/docs/server-admin/datasets#graphsauncessableto 页面存档备份,存于互联网档案馆.) 标记 。 多亏了伊曼纽尔·伦巴第
    * 现在,如果一个字符串传递给生成达塔斯 Xml 或 DasDds 被双引号包围, 它未被引用 (就像JSON弦一样) 。 。 。 感谢约翰·凯尔福特和梅兰妮·阿贝卡西斯.
    * 生成数据 Xml 现在支持“ 默认” 以获得默认和“ 无” 以获得空字符串 (他们工作 或不引文) 。 。 。 这解决了一些与通过空字符串有关的问题.
    * 现在,在生成 Datasets 中 Xml,为所有人服务EDDGrid从文件夹和 EDD 表格 如果样本来自 Files 数据集 您指定的文件名为“ ” (空字符串) ,它将使用目录中最后一个匹配文件Name + regex + recursive= true。
    * 更新: 用于在Linux计算机上显示GenerateDatasetsXml和DasDds结果的显示器InBrowser代码已经过时,并给出了关于Netscape的奇怪消息。 现在,这使用了现代的Linux工具:xdg-open. 多亏了梅兰妮·阿贝卡西斯
    * 那个allDatasets数据集现在有一个"files"列,表示/文件链接的基础 URL (如果有一个) 用于数据集。
    * 增强您的总体安全性ERDDAP™更改与Tomcat目录和大家长目录相关的权限:
         (下面的实际命令是给Linux的. 对于其他操作员,做类似的修改.) 
        * 更改“ group ” 为 tomcat, 您的用户名, 或包含 tomcat 和 Tomcat / 的所有管理员的小组的名称 。ERDDAP例如,
chgrp - R _ 您的用户Name_ apache-tomcat_ 8.0.23_
-R -你的车 用户名大家长目录_
        * 更改权限,以使tomcat和组有读,写,执行权限,例如,
chmod - R ug+rwx apache-tomcat - - 8.0.23_
chmod - R ug+rwx _ 大家长食堂_
        * 删除“ 其他” 用户的读、 写或执行权限 :
chmod - R o-rwx apache-tomcat - - 8.0.23 _ 风景名胜区
chmod - R o - rwx _ 大家长
这一点很重要,因为它阻止其他用户读取可能敏感的信息。ERDDAP™设置文件,日志文件,以及包含私人数据集信息的文件.
    * 认证/登录系统进行了修改。 多亏托马斯·加德纳、伊曼纽尔·伦巴第 和美国政府的新情报[HTTPS - 只有标准](https://home.dotgov.gov/management/preloading/dotgovhttps/)。 。 。 。
        * 认证=openid 选项已删除 。 这是过时的。
        * 新的,建议,[认证=google](/docs/server-admin/additional-information#google)选项用途 谷歌签名 (基于 OAuth 2.0) 允许任何拥有 Google 电子邮件账户的人 (包括 Google 管理诸如@noaa.gov) 要登录。
        * 新来的[认证=电子邮件](/docs/server-admin/additional-information#email)选项是认证=google的备份。 它允许用户有一个&lt;用户 &gt; 标记在datasets.xml通过发送带有特殊链接的电子邮件来登录。
        * 请在设置.xml中更改描述&lt;认证 &gt; 为
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * 在您的设置. xml中,请在下面添加此右键&lt;认证 &gt; 标签
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * 现在,没有登录的用户可以使用http或httpsURL( 如果您已经设置)&lt;baseHttpsUrl &gt; 在您的设置中。 xml) 。 感谢美国政府的新计划[HTTPS - 只有标准](https://https.cio.gov/)。 。 。 。
        * 现在,你可以鼓励所有用户使用https  (没有http) 设置&lt;baseUrl &gt; 要成为httpsURL (中文(简体) ). 强制用户只使用https,您还必须修改您的 Apache/Tomcat 设置以屏蔽非https进入。 感谢美国政府的新计划[HTTPS - 只有标准](https://https.cio.gov/)。 。 。 。
            
请在设置.xml中更改描述&lt;基数Url &gt; 要为
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * 选项&lt;密码编码&gt; 已更改。 请在设置.xml中更改描述&lt;密码编码 &gt; 要为
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * 请在设置.xml中更改描述&lt;基数HttpsUrl &gt; 要成为
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * 现在,如果列表PrivateDatasets= true in setup.xml,则用户无法访问的数据集信息会更少.
    * 现在,特别是当你开始设置你的ERDDAP,现在你可以告诉ERDDAP™不尝试订阅远程ERDDAP™数据集。 感谢菲利佩·罗莎·弗雷尔.
在您的设置. xml, 就在之前&lt;请添加
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * 在您的设置. xml 中, 在以上指示中&lt;请插入:
如果可能, 请设置此选项以使用安全连接 (SSL / TLS 软件) 到电子邮件服务器。
如果您的设置没有使用电子邮件服务器的安全连接, 请进行更改以完成 。
    * 在你身边datasets.xml,请在描述中添加此行。&lt;在您的订阅中datasets.xml数字 :
您可以使用名称 "\\*" 列出整个域名,例如,\\*@example.com. (原始内容存档于2018-09-27).
    * 自v1.66中更改日志系统后,日志文件从未更新. 总是有信件或部分信件等待写入日志文件. 现在,你可以更新它 (瞬间) 通过观看你的ERDDAP状态网页 : http://_your.domain.org_/erddap/status.html 。 。 。 。
    * 哈希迪盖斯特...
    * 一个小变化 (改为字符串2.canonical) 这会帮助保持 事情快速前进,当ERDDAP™工作非常繁忙,而且更好地处理大量数据集。
    * 强烈的 建议:停止使用&lt;转换为 PublicSourceUrl &gt; 输入datasets.xml转换数据集中的 IP 号码&lt;sourceUrl&gt; 翻译: (例如, http://192.168.#.#/ ) 输入域名 (例如,http: my.domain.org/ (中文(简体) ).) 。 。 。 从现在开始,新的订阅者 http://localhost , (中文). http://127.0.0.1 ,以及 http://192.168.#.# URLS不会因为安全原因被允许. 所以请始终使用公共域名&lt;sourceUrl&gt; 标签 (由于DNS问题而需要时) ,您可以使用[服务器上的/etc/host表](https://linux.die.net/man/5/hosts)通过将本地域名转换为IP数字而不使用DNS服务器来解决问题. 您可以通过使用 :
 ping _some.domain.name_ (原始内容存档于2017-09-09).
    * 在生成 Datasets.xml 中,用于远程数据集 (例如,来自THREDDS服务器) ,自动生成datasetIDs对大多数域没有变化。 关于几个领域,第一部分 (即名称) 自动生成的datasetID这将是有点不同。 值得注意的是,有一个部分的名字现在更有可能有两个部分。 例如,来自 http://oos.soest.hawaii.edu 曾导致datasetID但现在却导致datasetID&#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;从哈瓦伊开始 如果这给您带来问题,请通过电子邮件. 可能还有工作
    * 卡桑德拉驱动器更新为cassandra-driver-core-3.0.0.jar,因此卡桑德拉 v3. EDDTable FromCassandra没有利用卡桑德拉的任何新功能.  v三. 卡桑德拉的指数现在可以比较复杂,但是ERDDAP™仍然使用 Cassandra v2 索引模型,该模型假设可以直接查询索引列。'='限制。 生成数据 Xml 用于 EDD Table FromCassandra 的 Xml 不再检测带有索引的列; 如果索引简单, 您需要指定在datasets.xml手边 如果您需要更复杂的索引或其他新功能的支持,请通过电子邮件erd.data at noaa.gov。 。 。 。
快点&#33; 如果你仍然使用 Cassandra 2.x,请继续使用ERDDAP™v1.68,直到升级到使用卡桑德拉3.x.
    * Jars and the Classpath -- -- 几乎所有包含的第三方.jar文件都更新到最新版本.
        * slf4j.jar被添加到/lib和类路径中.
        * 乔伊德。 罐子和齐克。 罐子被从/lib和类路径中移除。
        * 如果您在编译或运行时未找到关于类的错误消息ERDDAP™或其中一个工具,比较命令行的类路径到ERDDAP因为[当前类路径](/docs/contributing/programmer-guide#development-environment)找出哪个贾尔在你的阶级中失踪了

## 1.68号版本{#version-168} 
 (2016-02-08发布.) 

*    **新特性 (用户) 数字 :** 无。
     
*    **东西ERDDAP™管理员需要知道和做:** 
    *   [EDDGrid通过文件名称或全局元数据从 Files 聚合](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)- —— - 说
所有变化EDDGrid从Files现在可以通过添加一个新的最左边的维度,通常是时间,根据每个文件名或每个文件中一个全局属性的值得出的值来聚合一组文件.
    * 改进:我们以前曾建议,你不妨建立一个EDDGrid从您中的 Erddap 数据集datasets.xml引用并重新维护 jplMURSS我们的T数据集ERDDAP。 。 。 由于该数据集现在有较新的版本,该数据集现在已贬值。 所以,如果你有 数据集在你的ERDDAP™,请添加此新数据集
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
如果你想删除旧的 jplMURSS从您的 T 数据集ERDDAP™  (这是你的选择) ,将其活动设置从"真"改为"假".
    * 错误修正 : 请检查access-date=中的日期值 (帮助) 大家长指导,请检查access-date=中的相关内容。 如果你没有把刀 在结尾&lt;大家长董事会 &gt; 名称, 那么ERDDAP™将创建多个目录,将单词直接附加到您指定的名称,而不是创建子目录。 从1.68版本开始ERDDAP™在目录名称的末尾添加斜线, 如果您没有指定一个 。 所以如果你之前没有在结尾指定斜线, 那么当你安装时ERDDAP™v1.68 您需要移动并重命名这些目录 **之后** 你关闭旧的ERDDAP™和 **在此之前** 您启动新ERDDAP。 。 。 例如,如果错误地指定大家长指导为/home/erdapBPD (没有后面的斜线) 和ERDDAP™错误地创建了目录
/家/家/庄园BPDcache
/家庭/erdapBPD副本
/home/erdapBPD数据集
/家/erdapBPD旗
/home/erdapBPDlogs 页面存档备份,存于互联网档案馆
/家用/家用BDPDlucene
和一个名为/home/erddapBPD订阅V1.txt的文件,
然后,你需要移动 并重命名它们为
/家庭/erdapBPD/隐患
/家/erdapBPD/副本
/home/erdapBPD/数据集
/家庭/erdapBPD/旗帜
/家/erdapBPD/日志
/家/庄/庄园BPD/露天
和/home/erdapBPD/订阅 V1.txt
    * 错误修正 : 里面有窃听器EDDGridLonPM180 装入ERDDAP™v1.66 当儿童数据集为EDDGrid从额尔达普.
    * 错误修正 : 里面有个虫子EDDGrid从 Files 和 EDD 表格 从 Files 进入ERDDAP™造成死亡和死亡的&lt;更新 EveryNMillis &gt; 在重启后第一次装入数据集时被忽略 。
    * 错误修正/ 新特性 : 如果儿童数据集在EDDGrid综合差异,EDDGrid收到 长官EDDGrid从EDDable,EDDGrid龙PM180,EDDGrid侧边、 EDD 表格复制或 EDD 表格从EDDGrid是一个... 从 Erddap 数据集, 父数据集现在订阅到基础ERDDAP™数据集。 如果基础ERDDAP™数据集在同一处ERDDAP™,订阅及其验证是直接完成的;您不会收到电子邮件要求您验证订阅. 否则,如果您的订阅系统ERDDAP™关闭,设置&lt;将母数据集的“ EveryNiminutes” 设置重新装入到小数字 (60岁?) 以便保持最新状态。
    * 错误修正/ 新特性 : 如果儿童数据集在EDDGrid综合差异,EDDGrid收到 长官EDDGrid从EDDable,EDDGrid龙PM180,EDDGrid侧边、 EDD 表格复制或 EDD 表格从EDDGrid有活动=“虚假”,该子数据集现已跳过。

## 1.66号版本{#version-166} 
 (2016-01-19发布.) 

*    **新特性 (用户) 数字 :** 
    * 图表 (不是地图) 现在可以在轴上显示下降值。 要在使用 Make AGraph 网页时获取此内容, 请更改新的 Y 轴: 升起设置 (默认) 降级。 或者,在请求图表的URL中,使用新的可选 3 '|' 参数[&.x 数据 范围和/或 &. 离线开关](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands),这可能没什么 (默认) , true, 或 t 来获取升值, 或使用假值或 f 来获取降值 。 事实|错误值是大小写不敏感。 感谢克里斯·富里洛夫,约翰·凯尔福特,卢克·坎贝尔和卡拉·威尔逊.
    * 现在用户可以通过添加一个 &.bgColor=0x_来指定图形的背景颜色. AARRGGBB_ 切换到请求图表的 URL 。 参见 .bg 图形命令部分中的 .bgColor[格点](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)和[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)文档。 感谢约翰·凯尔福特和卢克·坎贝尔.
    * 对于表格数据集,现在可参考min。 (可变名称(_S) _) 或最大值 (可变名称(_S) _) 。 。 。 。 见[分钟 () 最大值 () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)。 。 。 。 感谢约翰·凯尔福特
    * 关于表格数据集,使用的时间限制[现在](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)现在可以指定毫秒或毫秒的时间单位。
    * 现在,一个表格数据集的图像请求可以制作一个地图 (不是图) 如果 x 和 Y 变量是经度类和纬度类变量 (兼容单位) 。 。 。 。 多亏了瑞奇·辛吉尔
    * Bug 修正: 时间轴标签和勾选在同时请求多个图表时有时有奇怪的异常 (例如,在网页上) 。 。 。 问题在于 SGT 图形库中的一个错误ERDDAP™用途 (一个变量是"静态" 这不应该是) 。 。 。 感谢布拉德福德·布特曼
         
*    **东西ERDDAP™管理员需要知道和做:** 
    * 将您的电子邮件密码放入像设置. xml 这样的纯文本文件有安全风险 。 为缓解这一问题,我们强烈建议你:
        1. 设置一个邮件账户ERDDAP使用, 例如 erddap@ your Institution.org 。 这也有其他好处,特别是不止一种好处。ERDDAP™然后管理员可以访问该电子邮件账户。
        2. 设置. xml 文件 rw 的权限 (读作+写入) 用于运行Tomcat和ERDDAP™  (用户=tomcat?) 没有权限 (未读或写) 用于组和其他用户。 感谢菲利佩·罗莎·弗雷尔.
    * 新的[存档 ADataset](/docs/server-admin/additional-information#archiveadataset)工具简化制作.tar.gz以适合归档的格式将数据集子集归档 (特别是,在NOAA国家教育局) 。 。 。 。 这对许多人应该有用ERDDAP™在很多情况下,特别是针对土著群体而言,NOAA。 。 。 。
    * 新数据集类型[EDDGrid从 NcFiles 未包装](/docs/server-admin/datasets#eddgridfromncfilesunpacked)是一个变体,由EDDGrid从NcFiles。 不同之处在于,此类在数据文件打开之前EDDGrid从 File 查看文件 :
        
        * 它解包了用到的已包装变量scale\\_factor和(或)add\\_offset。 。 。 。
        * 它促进具有QQUUnsign= true属性的整数变量到更大的整数数据类型,从而使数值作为无符号值出现. 例如, QQ未签名=真字节 (8 点) 变量变为签名短 (16 位点) 变量。
        * 它能转换QQFillValue和missing\\_value数值为 NaN (或 MAX\\_VALUE 表示整数数据类型) 。 。 。 。
        
这个阶级的最大优势在于它提供了一种处理不同价值观的方法:scale\\_factor, (中文).add\\_offset,“FillVale”,或“FillVale,”missing\\_value在收藏中的不同文件中。 否则你就得用一个工具[NcML 数据](/docs/server-admin/datasets#ncml-files)或[NCO](/docs/server-admin/datasets#netcdf-operators-nco)修改每个文件以删除差异,以便文件可以由EDDGrid从NcFiles。 为了使这一类能正常工作,文件必须遵循相关属性的CF标准. 多亏了菲利普·马科斯基
    * 新数据集类型[EDDGrid龙PM180](/docs/server-admin/datasets#eddgridlonpm180)让您更改一些经度值大于180的数据集 (例如,0至360范围) 输入经度值在 -180 至 180 之间的数据集 (经度加号或减号180,因此名称) 。 。 。 提供经度值在 -180 至 180 之间的数据集的最大优势是:OGC服务 (例如,WMS) 需要在此范围内的经度值。 感谢林恩·托普斯基,费边·吉沙尔,菲利普·马科斯基,和马丁·斯佩尔.
2016-01-26 (中文(简体) ). 最新消息:Eeek&#33; (英语). 当孩子的数据集是EDDGrid从 Erddap 中引用同一数据集ERDDAP。 。 。 。 此错误已固定在ERDDAP™v1.68 (英语).
    * 内[生成 DatasetsXml](/docs/server-admin/datasets#generatedatasetsxml),一个新的特殊数据集类型,EDDGridLonPM180 From ErddapCatalog, 让您生成datasets.xml(单位:千美元)EDDGrid全部LonPM180数据集EDDGrid数据集在一个ERDDAP其经度值大于180。
    * 为所有人EDDGrid数据集,单位:datasets.xml您现在可以使用可选的
[&lt;无障碍 维亚WMS&gt;对|虚假&lt;/可访问 维亚WMS&gt;] (中文(简体) ). (/docs/server-admin/datas#可访问视频)   (默认为真) 。 。 。 设置为假的强制禁用WMS用于此数据集的服务。 如果数据是真实的,则可能仍无法通过WMS由于其他原因 (例如,没有拉特或龙斧) 。 。 。 这对单独存在、由下列数据包裹的数据集特别有用:EDDGridLonPM180,因此只有LonPM180版本可以通过WMS。 。 。 。
    * 在设置.xml中,可以指定图形背景的不同默认颜色. 颜色在0x_ARRGGBB_形式中被指定为8位十六进制值,其中AA,RR,GG,和BB分别是不透明,红色,绿色和蓝色的组件,被指定为2位十六进制数. 注意画布总是不透明的白色 所以 (半边 - 怎么样?) 透明图形背景颜色混合到白色画布中。 默认为浅蓝色:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
感谢约翰·凯尔福特和卢克·坎贝尔.
    * 在 setup.xml 中,您现在可以指定此选项的最大大小 。[日志文件](/docs/server-admin/additional-information#log)  (当它重新命名为日志时。  . 前一个和新日志。 txt 创建) 在MegaBytes语录中 最低允许为1. 允许的最大时间是2000年。 默认是20 (甲基溴) 。 。 。 。 例如:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * 内datasets.xml,[&lt;fgdcFile &gt;] (法语). (/docs/server-admin/数据集#fgdcfile) 或 [&lt;iso19115 文件 &gt; (/docs/server-admin/数据集#iso19115文件) 现在可以成为本地文件 (和以前一样) 或一个 URL (将会下载,所以有本地副本) 。 。 。 。 若为ERDDAP™无法下载文件, 数据集的加载将继续下去, 但数据集将没有 fgdc 或 iso19115 文件 。
    *   EDDGrid从文件夹和 EDD 表格 从 Files 数据集可以快速启动 (系统ERDDAP™尝试在数据集首次装入时使用ERDDAP™重新启动) 。 。 。 。 这可以加速重启ERDDAP。 。 。 。
2016-01-26 (中文(简体) ). 最新消息:Eeek&#33; (英语). 这有一个错误引起&lt;更新 EveryNMILIS &gt; 在重启后第一次装入数据集时被忽略 。 此错误已固定在ERDDAP™v1.68 (英语).
    * 快速启动系统的总体改进允许ERDDAP™以在ERDDAP™正在重新启动。
    * 全体EDDGrid从文件夹和 EDD 表格 从Files子类开始接受新的&lt;路径Regex &gt; 标记,通常在下面右侧指定&lt;递归性&gt;。 如果递归是“ true ” , 则只有符合路径的完整子目录路径 (默认=. ...... ......") 将被接受。 同样,a&lt;sourceUrls &gt; 标记在一个EDDGrid聚合函数现在可以包含路径Regex属性 (默认=. ...... ......") 。 。 。 。
    * 默认值&lt;部分请求MaxBytes &gt; in setup.xml 现在为490000000000 (~ 490 MB 键) 。 。 。 这避免了与从THREDDS数据服务器获取数据有关的一些问题/超时. 多亏了莱斯利·索恩
    * 对日志系统进行小的更改应允许ERDDAP™当它非常,非常忙的时候,更能回应。 信息现在被写入磁盘驱动器上的日志文件, 以相当大的块显示 。 好处是,这非常有效 --ERDDAP™永远不会屏蔽等待信息写入日志文件。 缺点是日志几乎总是以部分消息结尾,直到下块写完才会完成.
    * 错误修正与无水化和 [&lt;更新EveryNMILIS &gt; (/docs/server-admin/datas#update Everynmilis / 服务器/数据集) 系统EDDGrid从文件夹和 EDD 表格 从 Files 数据集 : 不再需要指定大量 fs.inotify.maxXuser_\\_watches 或 fs.inotify.maxXuser_instances. 里面有个虫子Java导致部分Java无法将垃圾收集完毕; 最终僵尸会将手表或实例数量超过规定的最大数量。ERDDAP™现在工作围绕这个Java错误。
另外,在status.html网页上列出的不摄入线程数量,这样您就可以注意它的用法. 通常每条线有一条无水线EDDGrid从 Files 和 EDD 表格 从Files数据集.
    * 错误修正:在很多地方,没有重写错误,而是产生了新的错误,其中只包含一个简短的原始错误信息,没有堆栈跟踪。 现在,当产生新错误时,它应该包括整个原始例外,例如,抛出新的例外 ("一些新消息",e) · ;
多亏了苏珊·珀金斯
    * 错误修复: 直到最近 (v1.64吗?) ,如果一个.../datasetID请求使用URL,ERDDAP™将在 URL 中添加 .html 。 在 v1.64 中, 失败 (生成错误格式化的 URL 失败) 。 。 。 这又成功了 多亏了克里斯·富里洛夫

## 1.64版 互联网档案馆的存檔,存档日期2014-09-02.{#version-164} 
 (2015-08-19发布.) 

*    **新特性 (用户) 数字 :** 
    * 现在有指南可以访问密码保护的私人ERDDAP™数据集 (https://) 通过curl和Python。 。 。 。 见[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)和[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)说明。
感谢NANOOS的埃米利奥·马约加和斯皮格拉斯科技的保罗·简切克.
         
*    **东西ERDDAP™管理员需要知道和做:** 
    *   ERDDAP™现在需要Java1.8+ (英语).
        Java1.7 达到[寿命终止](https://www.oracle.com/technetwork/java/eol-135779.html)  (没有安全更新) 2015年4月参加. 这个版本ERDDAP™将不与版本Java1.8级以下。 若您从Java1.7x 单曲 (或更早一点) ,你也应该更新Tomcat。 见[ERDDAP™设置指令](/docs/server-admin/deploy-install)用于下载链接和建议。
    * 新建数据提供者表格 。
当一个数据提供者来 想要添加一些数据到您的ERDDAP™,收集将数据集添加到ERDDAP。 。 。 。 许多数据来源 (例如,.csv文件, Excel 文件、数据库) 没有内部元数据,所以ERDDAP™有了一个新的数据提供者表格,从数据提供者收集元数据,并向数据提供者提供其他一些指导,包括对数据库中的数据的广泛指导。 所提交的信息转换成datasets.xml格式,然后发电子邮件到ERDDAP™管理员 (老师) 并写入 (附 录) (原始内容存档于2018-09-29). to bigPorent Briefy/logs/data ProviderForm.log. 因此,表格半自动化了将数据集输入ERDDAP™不过ERDDAP™管理员仍然需要完成datasets.xml块并处理获取数据文件 (编号) 从提供者或连接到数据库。 更多信息,见[数据提供者 表格说明](/docs/server-admin/datasets#data-provider-form)。 。 。 。
    * 新设&lt;匹配轴日记 &gt;
可用于EDDGrid从文件 (因此,来自NcFiles和MorgeIRFiles) , (中文).EDDGrid综合差异,EDDGrid复制,和EDDGridSideBySide 数据集,用于指定不同文件中的轴值必须精确等值 (数字) : 0=无检查 (别用这个&#33;) ,1-18用于提高精度,或 20 (默认) 为了完全平等。 对于n=1-18,ERDDAP™确保双值的第一个n位数 (或 (数字+1) div 2 为浮点值) 平等无边.
        &lt;匹配 AxisNDigits &gt; 替换&lt;正在贬值。 “ true” 的值将转换为匹配 AxisNDigits=20 。 虚构值 (别这样&#33;) 将转换为匹配 AxisNDigits=0 (英语).
    *   EDDGrid从文件夹和 EDD 表格 第一次使用此版本时, 从 Files 将非常缓慢地装入ERDDAP。 。 。 。
        ERDDAP™现在将内部文件信息存储得稍有不同,因此每个数据集的内部文件表必须重建. 所以别担心 没什么错 这是一次
    * 远程源文件
        EDDGrid从 NcFiles 、 EDD Table From NcFiles 、 EDD Table From NcCFFiles 现在允许文件在可访问目录中成为远程文件http://  (也许https://和ftp://,但他们还没有测试) 如果远程服务器支持[区域请求](https://en.wikipedia.org/wiki/Byte_serving)在请求标题中。 THREDDS和亚马逊S3支持范围请求,Hyrax没有。 此系统允许您不下载文件而访问远程文件中的数据 (如果远程文件过多, 则会有帮助) ,但访问这些文件的速度远慢于访问本地文件甚至远程文件的速度。OPeNDAP来源.
其中包括:"files"在亚马逊S3水桶中 因为可以通过http://。 。 。 如果 S3 对象名称类似文件名 (内部 / 类似 Linux 目录树) , (中文).ERDDAP™也可以通过ERDDAP因为"files"系统。 要做到这一点,你的S3证书必须是~/.aws/证书 (关于 Linux、 OS X 或 Unix 的) ,或 C:\\ 用户\\ USERNAME\\\.aws\\ 证书 (在窗口上) 在服务器上ERDDAP。 。 。 。 见[亚马逊 SDK 文档](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1)。 。 。 。
    * 生成数据 Xml有一个新的,不寻常的选项: EDDs FromFiles.
这将通过一个文件系统 (如果对象有类似文件的名称, 甚至像亚马逊 S3 这样的远程系统) 创建datasets.xml用于一系列数据集的块 。 你的里程可能会不同 如果将文件组织起来, 使给定目录中的所有数据文件都有效 (及其子目录) 适合一个数据集 (例如,所有SST 1天复合材料) 。 。 。 。 否则 (例如,如果一个目录包含一些 SST 文件和一些 Chlorophyll-a 文件) 这工作不好,但还是有用的。
    * 程序员:新/lib.jar文件.
如果您编译ERDDAP™中,请注意列表中的类path -cp参数中的新 .jar 文件。ERDDAP™ [程序员指南](/docs/contributing/programmer-guide)。 。 。 。
    * 水的实用性
如果您使用 CF 标准名称 Sea\\_water\\_salinity 对于任何变量, 我鼓励您切换到 sea\\_water\\_ 实践\\_salinity 。[CF 标准名称表第29版](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (和以前的一些版本 -- 我不知道) 。 。 。 这个名称表明,这确实是一个实用的盐度值。Practical Salinity Units  (PSU) ,相对于较旧的g/kg值。 峡谷单位不同,但依然令人难以置信地无济于事: 页:1 (可能意味着PSU/方案支助-78) ,相对于 1e-3 (估计意味着g/kg) &#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;为了海水的盐度\\[顿Unidata和 CF 键: 我们通过一个单位字符串来识别使用其他尺度的值,例如华氏或摄氏度,这个单位字符串是尺度的名称或一些变异. 为什么我们不能通过盐度单位来识别盐度单位,例如PSS-78? 我知道:PSS-78的值是"无单位"的,但有一个暗示的尺度,不是吗? 如果我发明了一个新的实际盐度尺度,其中的值是PSS-78值的0.875倍,那么舟子单位应该还是"1"吗? 一个用户怎么能把他们分开? 1e-3和1的单位既无描述性,也无助于试图弄清数字的用户.\\]

## 第1.62号版本{#version-162} 
 (2015-06-08年发布) 

*    **新特性 (用户) 数字 :** 
    * 对于EDDGrid数据集,用户现在可以将数字轴的任何组合,而不仅仅是经纬度对纬度,制作出图型:表面图. 这样你就可以做到x对Y (预计数) 图表和各种[霍夫默勒图](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram)例如,绘制经度相对于深度,或时间相对于深度。\\[注意:如果深度位于Y轴上,很可能会从你想要的角度翻转. 抱歉, 无法打开它 。\\]感谢卡拉·威尔逊和林恩·德维特.
    * 有一个新的[大洋/大气缩略语转换器](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)将普通的海洋/大气缩写转换为/从全名。
    * 有一个新的[海洋/大气 变量名称转换器](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)它允许您将一个普通的海洋/大气变量名称转换为/从一个全名。
*    **东西ERDDAP™管理员需要知道和做:** 
    *   Java第7/8号决定
        Oracle不再支持 (提供安全错误修正)  Java7个ERDDAP™仍然支持Java7,但请移动到Java8. 下一次发布ERDDAP™可能还需要Java8. 国家
    *   valid\\_min/最大/距离
以前和现在,如果dataVariable有过scale\\_factor和add\\_offset元数据,ERDDAP™解开数据值并删除元数据。 前情提要,前情提要,ERDDAP™没有修改/卸下任何valid\\_range, (中文).valid\\_min, (中文).valid\\_max元数据 (通常/应该包含打包值) 由scale\\_factor和add\\_offset。 。 。 。 现在有了 请搜索你的ERDDAP™用于“ valid QQ” , 并确保所有变量valid\\_range, (中文).valid\\_min,或valid\\_max当数据集出现在新版本时,有正确的值ERDDAP。 。 。 。 见[valid\\_range/分钟/最大文件](/docs/server-admin/datasets#valid_range)。 。 。 。
    * ACDD-1.3 化学文摘社
先前,ERDDAP™  (特别是生成数据 xml 数据) 已使用/建议使用 (1.0 对) 版本[NetCDF数据集发现属性公约](https://wiki.esipfed.org/ArchivalCopyOfVersion1)被称为 "Unidata全球公约和Metadata\\_Conventions属性。 我们建议[ACDD 版本 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)于2015年初批准,并称为"ACDD-1.3". 幸运的是,ACDD-1.3与1.0版本高度后向兼容. 我们建议你[切换到 ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13)。 。 。 。 不难
    * 生成数据 Xml 属性
为改善《公约》执行情况进行了大量改革。&lt;addAttributes&gt; GenerateDatasets建议的值 用于全球公约的 Xml,creator\\_name/email/url、关键词、摘要和标题属性以及变量long\\_name属性。 一些变化与ACDD-1.3的新用途有关.
    * 从 EDD 表格SOS数据集
偶尔会增加新的类型SOS服务器和对旧服务器的更改,对ERDDAP™从服务器的响应中自动检测服务器类型。 使用[&lt;sosServerType &gt;] (英语). (/docs/server-admin/datas#eddable fromsos-skeleton-xml 页面存档备份,存于互联网档案馆 互联网档案馆的存檔,存档日期2014-09-02.)   (价值为IOOS\\_NDBC,IOOS\\_NOS,OOSTethys,或 WHOI) 现在强烈建议。 如果您的这类数据集在新版本中有任何问题ERDDAP中,尝试重运行生成数据 Xml 为SOS服务器生成新块datasets.xml为数据集。 生成数据 Xml会让你试试不同的&lt;sosServerType &gt; 选项,直到您为给定服务器找到正确的选项。 如果你还有问题,请告诉我 你看到的问题和服务器的URL 我会尽力帮助。
    * 来自文件名数据集的 EDD Table
建议的一些属性addAttributes现在为源属性。 您可能不需要更改您现有的数据集datasets.xml。 。 。 。
    * Bug 修正与 EDD Table FromNcCFFiles 数据集的某些请求有关.
在目前对基本方法进行的大量单元测试中,我还增加了大量的单元测试 (有100种情景) 。 。 。 。 感谢Eli Hunter。
    * 错误修正/ 小更改为EDDGrid从MorgeIR.
多亏了乔纳森·拉菲特和菲利普·马科斯基
    * 错误修正 :EDDGrid即使一个远程数据集没有ioos\\_category变量属性。
感谢凯文·奥布莱恩。
    * 在.graph网页中修复错误EDDGrid当只有一个轴变量具有一个以上值时,数据集。
多亏了查尔斯·卡莱顿
    * 还有其他小的改进、更改和错误修正。

## 1.60版本 翻译:{#version-160} 
 (2015-03-12发布.) 

*    **新特性 (用户) 数字 :** 无
*    **东西ERDDAP™管理员需要知道和做:** 
    * 强烈建议: 更新您的服务器[机器人.txt](/docs/server-admin/additional-information#robotstxt)要包含的文件 :
拒绝 : /erddap/文件/存档
    * 通知问题和解决办法:
在 Linux 计算机上, 如果您正在使用&lt;更新 EveryNMillis &gt; 数据集类型=EDDGrid从Files, EDD Table 从Files,EDDGrid复制 EDDTable Copy 或它们的子类,您可能会看到一个数据集无法加载的问题 (偶尔或一致) 带有错误消息 : “ IOExcuseion: 用户对已到达或已打开过多的示例的限制 ” 。 如果有的话,你可以打电话解决这个问题 (作为根) 数字 :
回声 fs.inotify.max========|-a/etc/sysctl.conf 电话
回声 fs. inotify.max user = 1024|-a/etc/sysctl.conf 电话
sysctl - p (韩语)
或者,如果问题继续存在,使用更高的数字。 手表的默认值为8192. 实例的默认值为128。\\[更新: 里面有个错误Java造成不收集垃圾的提示。 这个问题在ERDDAP™v1.66 及 更高档. 因此,更好的解决方案是切换到最新版本的ERDDAP。 。 。 。\\]
    * 无例外文件 错误修正 :
有错误可能导致类型=的数据集EDDGrid从Files, EDD Table 从Files,EDDGrid复制, EDDTableCopy, 或其子类不偶尔加载“ NoSuchFileException: _someFileName_” 错误 。 错误与 FileVisitor 的使用有关, 并且引入于ERDDAP™v1.56 (英语). 这个问题是罕见的,最有可能影响大量经常变化的数据文件的数据集.
    * 有一些小的改进、更改和错误修正。

## 1.58号版本{#version-158} 
 (2015-02-25发布.) 

*    **新特性 (用户) 数字 :** 
    * 新的["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)系统允许您浏览虚拟文件系统并从许多文件下载源数据文件ERDDAP™数据集。 那个"files"系统默认活动,但ERDDAP™管理员可以通过设置来禁用它
```
        <filesActive>false</filesActive>  
```
输入ERDDAP™设置.xml 文件. 特别感谢菲利普·马科斯基(Philippe Makowski),他在我慢慢地欣赏这个想法的美丽时坚持了下来.
    * 时间目标 麦克斯... 以前,带有近实时数据的EDDTable数据集的时间变量有一个目的地Max of NaN,这意味着数据集的最大时间值是近期的,但并不准确,变化频繁. 现在,目的地Max有实际价值,表示目前已知的上次. 许多数据集不断更新数据.ERDDAP™支持访问最新数据,即使它是在目前已知的上次数据之后。 注意新的[&lt;更新EveryNMILIS &gt; (/docs/server-admin/datas#update Everynmilis / 服务器/数据集) 支持在EDDGrid从文件夹和 EDD 表格 从Files数据集更新时间变量的目的地Max. 这一变化的另一个后果是:datasetID=allDatasets数据集现在包括目前已知的在最大时间列中最后一次的数据。 多亏了约翰·凯尔福特
*    **东西ERDDAP™管理员需要知道和做:** 
    * 强烈建议: 更新您的服务器[机器人.txt](/docs/server-admin/additional-information#robotstxt)要包含的文件 :
拒绝 : /档案/
拒绝 : /erddap/文件/存档
    * 样本datasets.xml- —— - 说 去年我们推荐了海岸观测站的几个优秀数据集ERDDAP™你可以加进你的ERDDAP™只要在您身上添加几行线datasets.xml。 。 。 如果您添加了 erdVH 数据集, 请切换到更新的 erdVH2 数据集 :
        * 复制所有 erdVH 数据集并更改复制的datasetID从 erdVH... 到 erdVH2... 并更改引用sourceUrl从 erdVH... 到 erdVH2.
        * 设置 erdVH... 数据集为活动="假".
    * 全体EDDGrid从文件夹和 EDD 表格 现在从Files子类支持 [&lt;可访问的ViaFiles &gt; (/docs/server-admin/datas#可访问文件) 以通过"files"系统。 默认情况下,每个数据集都会关闭此系统. 您需要添加标记以启用它 。 多亏了菲利普·马科斯基
    * 全体EDDGrid从文件夹和 EDD 表格 现在从Files子类支持 [&lt;更新EveryNMILIS &gt; (/docs/server-admin/datas#update Everynmilis / 服务器/数据集) 。 。 。 默认情况下,每个数据集都会关闭此系统. 您需要添加标记以启用它 。 感谢多米尼克·富勒-罗威尔和NGDC.
    * 新的[来自文件名的 EDD 表格](/docs/server-admin/datasets#eddtablefromfilenames)从服务器文件系统中一组文件的信息中创建一个数据集,但它并不服务于文件内部的数据. 例如,这对分发图像文件,音频文件,视频文件,文字处理文件,以及电子表格文件的集合很有用. 和新人携手合作["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)系统,这样用户就可以下载文件。 特别感谢菲利普·马科斯基(Philippe Makowski),他在我慢慢地欣赏这个想法的美丽时坚持了下来.
    * 新的[EDDGrid可处理文件](/docs/server-admin/datasets#eddgridfromeddtable)将表格数据集转换成网格数据集。 感谢加拿大海洋网络。
    * 新的[EDDGrid从MorgeIRFiles 调用](/docs/server-admin/datasets#eddgridfrommergeirfiles)集合来自本地合并的一组数据.gz文档。EDDGrid从MorgeIRFiles的区别是,它是第一块代码 贡献给ERDDAP。 。 。 完全没有我们的帮助 三次欢呼和特别感谢R.Tech Engine的乔纳森·拉菲特和菲利普·马科斯基.
    * 有一个新的,可选的设置.xml标签,&lt;unit TestDataDir&gt;,它指定了通过新的 GitHub 寄存器提供的带有单位测试数据文件的目录 :[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest)。 。 。 。 例如:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
这还不是有用的, 但它是努力的一部分 使尽可能多的单位测试 运行 其他人尽可能。 多亏了泰瑞·兰金
    * 有许多小的改进、更改和错误修正。

## 第1.56号版本{#version-156} 
 (2014-12-16年发布) 

*    **新特性 (用户) 数字 :**   (无) 
*    **东西ERDDAP™管理员需要知道和做:** 
    * 你可能已经知道[EDDGrid从埃尔达普](/docs/server-admin/datasets#eddfromerddap)和[来自Erddap的EDD表](/docs/server-admin/datasets#eddfromerddap)让您链接到其他ERDDAP让他们出现在你身上ERDDAP。 。 。 用户要求从这些数据集获得实际数据时,将路由隐蔽到源头ERDDAP™,因此数据不会流经您的系统或使用您的带宽。 现在样本中有一大堆推荐数据集datasets.xml在 erddap 关联中.zip。 。 。 。 把他们纳入你ERDDAP™你只需要把想要的复制和粘贴放进你的datasets.xml。 。 。 感谢康纳·德莱尼
    * 如果您编译ERDDAP™,需要添加一些新的。 打开您的 jar 文件[类路径 - cp 开关](/docs/contributing/programmer-guide#development-environment)给贾瓦奇和贾瓦
    * 新的[来自卡桑德拉的EDD表](/docs/server-admin/datasets#eddtablefromcassandra)处理从[卡桑德拉岛](https://cassandra.apache.org/)。 。 。 感谢加拿大海洋网络。
    * 新的[来自 ColumnarAsii 文件的 EDD 表格](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)处理从 ASCII 数据文件中获取有固定宽列的数据。 多亏了菲利普·马科斯基
    * 全体EDDGrid从文件夹和 EDD 表格 从 Files 子类开始, 现在使用新方法, 文件查看器 (添加到Java在1.7个中) 以收集文件信息。 这对第一次收集特定数据集的文件信息可能没有任何好处,但如果很快完成,对于以后的收集似乎有很大的好处,而OS仍然拥有信息缓存. 感谢NGDC。
        
我们仍然建议: 如果一个数据集有大量文件 (例如, &gt; 1 000) ,操作系统 (并由此而来EDDGrid从 Files 和 EDD 表格从 Files 中) 如果您将文件存储在一系列子目录中, 操作效率会高得多 。 (每年一个,或每月一个,用于文件非常频繁的数据集) ,这样在给定目录中就不会有大量的文件。
        
    * 对EDDTable FromAsciiFiles进行了一些小的改进.
    * 对EDDTable FromAsciiServiceNOS的一些改进,主要是从来源获得一些额外的栏目信息. 感谢林恩·德维特.
    * 一些小错误修正与 ISO 19115 相关ERDDAP™生成。 多亏安娜·米兰

## 第1.54号版本{#version-154} 
 (2014-10-24年发布) 

*    **新特性 (用户) 数字 :** 
    * 一些变量现在随着时间在毫秒精度上起作用,例如,2014-10-24T16:41:22.485Z. 多亏了多米尼克·富勒-罗威尔
*    **小型变化/ Bug 修正 :** 
    * 虫修复:在某种情况下,EDDGrid从NcFile 数据集以降低的精确度返回数据 (例如,浮点而不是双倍) 。 。 。 这只能影响数据值大于8个重要数字。 对不起 (这是一个经典的计算机编程错误:一个错误的角色。) 多亏了多米尼克·富勒-罗威尔
    * 许多小变化.
*    **东西ERDDAP™管理员需要知道和做:** 
    * Griddap 数据集现在支持时间戳轴变量和数据变量 (即带有时间值的变量,但destinationName除外"time") 。 。 。 多亏了多米尼克·富勒-罗威尔
    *   ERDDAP™现在正确支持毫秒time\\_precision"1970-01-01T00:00:00.000Z". 一个有意的怪胎:当写给面向人类的文件时 (例如,.csv,.tsv, (中文)..json, (中文)..xhtml) , (中文).ERDDAP™使用指定的time\\_precision如果它包括秒和/或小数秒;否则它使用秒time\\_precision"1970-01-01T00:00Z" (中文(简体) ). (用于一致性和后向兼容性) 。 。 。 多亏了多米尼克·富勒-罗威尔
    *   EDDGrid从 NcFiles 现在支持读取字符串dataVariable编号
    *   .nc通过网格dap编写的文件现在可以有字符串dataVariable编号
    * 生成数据 Xml 现在包含更多的冲浪 () 以避免信息不写入文件的问题。 多亏了泰瑞·瓦莱罗
    * GenerateDatasetsXml 的文档得到了改进,特别是要指出, -i 切换只有在命令行上指定全部答案时才有效 (例如脚本模式) 。 。 。 。 并解释了脚本模式. 多亏了泰瑞·瓦莱罗
    *   ERDDAP™不再允许数据集中的两个变量具有相同的sourceName。 。 。 。 (如果之前有人这样做,那很可能会导致错误消息.) 和以前一样ERDDAP™不允许数据集中的两个变量有相同的destinationName。 。 。 。

## 1.52版本{#version-152} 
 (2014-10-03年发布) 

*    **新特性 :**   (无) 
*    **小型变化/ Bug 修正 :** 
    * 又一个 (较小) 更改ERDDAP™快点
    * 对 ISO 19115 文件的改进ERDDAP: 新建议增加&lt;gmd: protocol&gt; 数值 (信息,搜索,OPeNDAP数字 :OPeNDAP, (中文).ERDDAP: 格丽达普,和ERDDAP数字 :tabledap) 内部&lt;gmd:CI\\_OnlineResource&gt; (原始内容存档于2017-09-29). 感谢德里克·斯诺登和约翰·莫雷尔.
    * 许多小变化.
*    **东西ERDDAP™管理员需要知道和做:** 
    * 臭虫修补:生成DatasetsXml.sh和DasDds.sh没有在erddap.war中为1.48和1.50. 瞷琌 多亏了泰瑞·瓦莱罗
    * 对TestAll的一些速度测试做了小的改变,以降低它们的机会. 多亏了泰瑞·兰金

## 1.50版本 (简体中文).{#version-150} 
 (2014-09-06年发布) 

*    **新特性 :**   (无) 
*    **小型变化/ Bug 修正 :** 
    * 这个ERDDAP™应该比最近的版本快得多。
*    **东西ERDDAP™管理员需要知道和做:**   (无) 

## 1.48号版本{#version-148} 
 (2014-09-04年发布) 

*    **新特性 :** 
    *   ERDDAP™现在总是创建一个表格数据集,datasetID=allDatasets,它有一个列表,其中包含关于此中所有数据集的信息 。ERDDAP。 。 。 可以像其他表格数据集一样进行查询。 这是现有系统在程序上获取数据集信息的有用替代办法。
    * EDDTable 有两种新的输出文件类型EDDGrid时,csv0和.tsv零点 它们是逗号与标签分隔的值文件,没有列名或单位的行. 数据从第一线开始. 它们对于只想要从中获取一条信息的脚本特别有用.ERDDAP。 。 。 。
*    **小型变化/ Bug 修正 :** 
    * 地图现在可以绘制到720至720之间的经度.
    * 新的.ncml 响应文件类型可供所有人使用EDDGrid数据集。 它还原[国家反洗钱委员会](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)\\ 格式化的数据集描述 (类似于组合的 .dds +.das) 。 。 。 。
    * 错误修正: 将表格数据保存到一个.nc文件仅限于每个变量的10万个值。 现在它仅限于2GB的总文件大小. 感谢凯文·奥布莱恩。
    * 错误修复: 保存AsMatlab现在的方法确保datasetIDs 转换为安全Matlab变量名称。 但我还是强烈建议你创造datasetIDs是有效的可变名称:从字母开始,然后仅仅使用A-Z,a-z,0-9和QQ. 见[datasetID](/docs/server-admin/datasets#datasetid)。 。 。 。 感谢卢克坎贝尔。
    * 数据库中的 EDD Table 错误修复 : 有一些类型的数据库,一个NOQQ 数据库中的数据交换回复导致30秒无意义的延迟ERDDAP。 。 。 。 多亏了格雷格・威廉姆斯
    * 错误修正 :EDDGrid以图类型 = 行创建图表 (或标记或标记和线条) 强制 x 轴变量为时间 。 现在它可以是任何轴. 感谢林恩·德维特.
*    **东西ERDDAP™管理员需要知道和做:** 
    * 大力建议:最新情况Java  
这个版本ERDDAP™要求Java7岁或以上,但Java7个将于2015年4月结束 (快点&#33;) ,所以现在是一个好时机切换到Java8. 因此,Java8是强烈建议。 我用测试Java8. 注意到Java6个于2013年2月到期 (不再修复安全漏洞&#33;) 。 。 。 。
    * 大力建议:更新Tomcat
如果你使用Tomcat,请切换到最新的Tomcat版本. Tomcat 8的设计与工作Java8. 国家
    * " , "ERDDAP" 不再是缩写。 现在它只是一个名字。 我不想让名字突出ERD。 。 。 。 и稱ERDDAP™以突出你的机构和数据。
    * 请[自定义您的外观ERDDAP™安装以突出显示您的机构和数据](/docs/server-admin/deploy-install#customize)。 。 。 只要工作一个小时,你就能做出很好的改进,永远地保持下去.
    * 在设置.xml中,&lt;显示“分析信息”选项现在总是被忽略,并被当做值是假的对待。
建议:删除&lt;显示DiagnosticInfo &gt; 标记和来自您的设置.xml的相关信息。
    * 在设置.xml中,默认为&lt;drawLandMask已经是"结束",但现在是"低于",这是更好的一般默认 (所有数据集都运行良好) 。 。 。 。
    * GenerateDatasetsXml.sh和DadDds.sh Linux脚本现在使用bash而不是csh,并有扩展.sh. 感谢埃米利奥·马约加
    * 生成数据 Xml 和 DasDds 现在创建自己的日志文件 (生成 DatasetsXml.log 和 DasDds.log) 和输出文件 (生成 DatasetsXml.out 和 DadDds.out) 在 _BigParent Briedery_/logs/ 中,并且从不将其结果放在剪贴板上。
    * 生成数据 Xml 现在支持在指定位置将输出插入指定文件的 -i 命令行参数 。 见[文档](/docs/server-admin/datasets#generatedatasetsxml)。 。 。 。 多亏了泰瑞·兰金
    * 现在从数据库支持 EDD Table&lt;列词Name 引文&gt;&lt;/ 栏名引文&gt;,有有效值 " (默认) ,",或无。 此字符 (如果有的话) 将在SQL查询的列名前后使用。 以不同方式建立的不同类型的数据库将需要不同的列名引号.
    * 表格纬度和经度变量现在可以定制long\\_name's,例如"剖面纬度". 以前,它们只能是纬度和经度。
    * 从现在开始,在数据集的全局元数据中指定"默认数据查询"和"默认Graph查询"作为属性(即.&lt;添加Ats &gt; ),不作为单独&lt;默认数据查询 &gt; 和&lt;默认GraphQuery &gt; 标记 。 (但是,如果你仍然通过标签来指定它们,ERDDAP™将自动创建全局属性。) 

## 版本1.46{#version-146} 
 (2013-07-09年发布) 

*    **新特性 :** 
    *    (无) 
*    **小型变化/ Bug 修正 :** 
    * Bug fix:在EDD Table FromDatabase中,仅在1.44版本中,ERDDAP™在 SQL 语句中错误引用数据库的表格名称 。 现在已经修好了 感谢凯文·奥布莱恩。
*    **东西ERDDAP™管理员需要知道和做:** 
    *    ** 如果您不修改信件中的标准信件.xml,
删除\\[移动猫\\]/内容/erddap/消息.xml. **   
默认信件. xml 文件现已在 erddap 中 。 战争文件, 不是 erddapContent.zip。 。 。 因此,你不再需要手动更新消息.xml.
    * 如果您确实修改了信件. xml 中的信件, 从现在开始, 每次更新ERDDAP™,则:
        * 和你之前一样 改变新
            \\[移动猫\\]/webapps/erddap/WEB-INF/class/gov/noaa/pfel/erddap/util/messages.xml.
这一次:删除\\[移动猫\\]/内容/erddap/消息.xml.
        * 或者,看看新消息有什么变化. xml (通过 diff) 修改您的
            \\[移动猫\\]/content/erddap/messages.xml文件相应.

## 版本1.44{#version-144} 
 (2013-05-30发布) 

*    **新特性 :** 
    * 查询 EDDTable 数据集支持( C)orderBy最小数 (. .  ....) 和 &orderByMinMax (. .  ....)   (返回每组中的两行,其中最小和最大为最后一行orderBy价值) 。 。 。 感谢林恩·德维特.
    * 有两个新的tabledap文件类型 :.ncCF 页眉和.ncCFMA 页眉 (返回相应的 ncdump 类标题.ncCF和.ncCFMA 文件类型) 。 。 。 。 多亏了史蒂夫·汉金
*    **小型变化/ Bug 修正 :** 
    * 错误修正: 载入带有大量时间值的数据集的. graph 和.html网页很慢, 因为ERDDAP™生成时间滑动选项时很慢。 现在它总是很快。 感谢迈克尔·巴里、OOICI和克里斯蒂安·塞巴斯蒂安·布莱德.
    * 错误修正 : 在一些EDDTable数据集类型中,时间限制并不总是得到正确处理. 瞷琌 感谢约翰·莫伊雷尔和凯文·奥布莱恩.
    * 错误修正: 当所有数据都装入时, 数据集不会装入subsetVariables是固定值变量。 现在,他们会的。 多亏了琳恩·德维特和约翰·彼得森
    * 改进 : 现在, 所有只针对子集变量的查询都像 & different () 是查询的一部分。
    * 改进:现在,对于包括 &.jsonp__函数Name, _函数 名称_ 现在必须是 1 个以上的系列 (分期执行) 词 每个单词必须从ISO 8859字母或"QQ"开始,然后是0或更多的ISO 8859字母,数字,或"QQ". 是的,这比Java脚本对函数名称的要求.
    * 图表上的时间轴现在在较长的时间范围内运作良好 (80-10 000岁) 和较短的时间范围 (0.003 - 180秒) 。 。 。 。
    *   ERDDAP™当分析ISO-8601-格式时间数据的变化时,现在更加宽容。
    * 还有许多其他小的更改和错误修正.
*    **东西ERDDAP™管理员需要知道和做:** 
    *    **您必须更新到最新版本才能安全 。**   
        ERDDAP™进行了安全审计。 有一些错误和弱点。 1.44版本包括若干重要的安全错误修正和若干修改,以增加安全和无障碍性 (例如,针对视力受损的用户) 。 。 。 1.44版本通过了后续安全审计。 多亏了USGS和Acunetix的好人 才得以实现 (不应该NOAA这样做?) 
    * 新的[从 EDD 表格WFS文件](/docs/server-admin/datasets#eddtablefromwfsfiles)制作一个本地副本,复制来自ArcGIS地图服务器WFS服务器,然后数据可以快速重新保存到ERDDAP™用户。 多亏了克里斯蒂·考迪尔
    * 新的[从 EDD 表格EDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)允许您从一个EDDGrid数据集。 这样做的一些共同原因是:
        * 这样可以查询数据集OPeNDAP甄选限制 (用户可能要求的) 。 。 。 。
        * 数据集本质上是一个表格数据集. 感谢OOICI,吉姆·波滕拉,罗伊·门德尔索恩.
    * 可变名称"深度"现在是"高度"的特殊替代品. 单位必须是"米"的某种变体. 数据值必须是正向下。ERDDAP™现在完全意识到了"深度"的含义 并且支持它无论支持高度 (例如,作为CF DSG cdm\\_data\\_type=profile数据集的一个组件.) 。 。 。 数据集不得同时具有"深度"和"高度"两个变量.
    * 在你身边datasets.xml,请删除其中的任何用途。&lt;att name="cdm\\_altitude +prproxy" &gt; 深度&lt;/att&gt; 由于深度现在是高度的特殊替代品,因此不需要特别识别.
    * 在你身边datasets.xml,请删除其中的任何用途。&lt;高度MetersPer Source Unit &gt;, EDD表除外 从SOS。 。 。 。
当值为1时,只需删除它.
当值为 -1 时,考虑将变量名称更改为深度 。
对于其他数值,加到&lt;addAttributes&gt; 例如:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * 现在所有数据集都支持
        
        *   &lt;默认DataQuery &gt; 如果请求.html时没有查询,则使用它。
            * 你可能很少用这个
            * 对于网格dap数据集,常用的是指定不同的默认深度或高度维值 (例如,\\[0 个\\]改为\\[最后一个\\]) 。 。 。 。
无论如何,你总是应该列出所有变量,总是对所有变量使用相同的维值,并且几乎总是使用\\[0 个\\], (中文).\\[最后一个\\],或\\[0: 最后一个\\]对于维度值。
例如:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * 对于tabledap数据集,最常见的使用是指定不同的默认时间范围 (相对于现在, 例如 &time&gt; =now-1天(以千美元计)) 。 。 。 。
记住,不请求数据变量与指定所有数据变量是相同的,所以通常你可以只是指定新的时间约束.
例如:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;默认GraphQuery &gt; 如果请求的.graph没有查询,则使用它。
            * 你可能很少用这个
            * 对于网格dap数据集,最常见的用途是指定不同的默认深度或高度维值 (例如,\\[0 个\\]改为\\[最后一个\\]) 和/或指定一个特定的变量。
无论如何,你几乎总是使用\\[0 个\\], (中文).\\[最后一个\\],或\\[0: 最后一个\\]对于维度值。
例如:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * 对于tabledap数据集,最常用的用途是指定不同的变量以图示,不同的默认时间范围 (相对于现在, 例如 &time&gt; =now-1天(以千美元计)) 和/或不同的默认图形设置 (例如,标记类型) 。 。 。 。
例如:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

记住你需要 XML 编码或%- 编码 (两者之一,但不是两者) 默认查询,因为它们在 XML 文档中。 例如,成为 &amp;amp; ,&lt;成为 &amp;lt; , &gt; 成为 &amp;gt; 。
请检查你的作品。 犯错很容易,而得不到你想要的东西。
感谢查尔斯·卡莱顿,凯文·奥布莱恩,卢克·坎贝尔等人.
    *   EDDGrid从Dap,EDDGrid从Erddap 和 EDD Table 从EDDGrid有一个新的系统来处理频繁变化的数据集 (大约每0.5秒) 。 。 。 。 与ERDDAP这个可选的附加系统是被动的 (由用户请求触发) 和递增 (只需要更新需要更新的信息) 。 。 。 例如,如果向某国提出的请求EDDGrid自上次更新以来,来自Dap数据集的发生数超过指定的毫秒数,ERDDAP™将查看是否有最左边的新值 (通常"time") 维度,如果是,则在处理用户请求之前下载这些新值。 这个系统非常善于保持一个快速变化的数据集的更新,对数据来源的需求最小,但代价是略微放慢了一些用户请求的处理速度. 见[&lt;更新EveryNMILIS &gt; (/docs/server-admin/datas#update Everynmilis / 服务器/数据集)   
感谢迈克尔·巴里和OOICI。
    *   EDDGrid来自 NcFiles 、 来自 NcFiles 的 EDD Table 和 来自 NcCFFiles 的 EDD Table 现在支持[NcML 数据.nc门L](/docs/server-admin/datasets#ncml-files)源文件替换.nc文档。 多亏了何塞·布·罗德里格斯·鲁埃达
    * 对于EDDGrid综合差异,ERDDAP™支持用于服务器的“ dodsindex”选项&lt;sourceUrls &gt; 标记。 这与网页有关,这些网页载有内部的文件清单。&lt;预览 &gt;&lt;/pre &gt; 并经常位于OPeNDAP图标。 一个例子是[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)。 。 。 。
    * 用于 EDD 表格SOS现在支持可选标签
```  
        <sosServerType>_serverType_</sosServerType>  
```
因此,您可以指定类型SOS服务器 (这样ERDDAP™不用想出来) 。 。 。 。 有效数值&lt;_服务器Type_\\&gt;是IOOS\\_NDBC,IOOS\\_NOS,OOSTethys,和WHOI (新支持的服务器 类型) 。 。 。 。 见[从 EDD 表格SOS](/docs/server-admin/datasets#eddtablefromsos)。 。 。 感谢德里克·斯诺登和珍妮特·弗雷德里克斯.
    * 全体EDDGrid来自...EDDGrid复制和 EDD 表格 现在复制支持可选标签
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
可见ERDDAP™要保存文件 图表 (包含每个源数据文件的信息) 在记忆中,而不是仅仅在磁盘上 (默认) 。 。 。 在内存中保存文件表会加快对数据的要求 (特别是如果有 &gt; 1 000 源数据文件) ,但使用更多的记忆。 如果您将此设定为任何数据集的正则, 请注意内存: 目前使用 _ yourDomain_ 的行/erddap/status.html确保ERDDAP™仍然有很多免费的记忆。 多亏了弗雷德里克·斯特莱
    * 现在支持 EDD Table FromASCIIFiles&lt;字符集&gt; (中文(简体) ). 两个最常见的字符集 (案件敏感&#33;) 为 ISO-8859-1 (默认) (原始内容存档于2018-09-21). and UTF-8.
    * 建议:在设置.xml内&lt;请更改&lt;html &gt; (简体中文). 输入
        &lt;html lang="en-US" (中文(简体) ). (或不同的[语言代码](https://www.w3schools.com/tags/ref_language_codes.asp)如果您已翻译信件. xml) 。 。 。 。
    * setup.xml 有新的可选标记来禁用其中的部分ERDDAP数字 :
        *   &lt;转换器&lt;/转换器&lt;&#33; - 默认是真实的 - &gt;
        *   &lt;幻灯片Sorter 动作 &gt; 虚假&lt;/ 滑动吸附剂 &gt;&lt;&#33; - 默认是真实的 - &gt;
        *   &lt;wmsActive &gt; 虚假&lt;/wmsActive] (英语).&lt;&#33; - 默认是真实的 - &gt; 一般来说,我们建议不要将其中任何一种设定为虚假的。
    * 生成数据 Xml 现在将结果写入_BigParent Bircey_/logs/generateDatasetsXmlLog.txt,而不是log.txt. 多亏了克里斯蒂安·塞巴斯蒂安·布莱德
    * 生成数据 Xml现在对&lt;重新装入 EveryNiminutes &gt;. (法语). 谢谢你NOAAUAF项目.
    * 对GenerateDatasetsXml的许多小改进. 谢谢你NOAAUAF项目.

## 版本1.42{#version-142} 
 (2012-11-26年发布) 

*    **新特性 :** 
    *    (无重大新特点.) 
*    **东西ERDDAP™管理员需要知道和做:** 
    * 如果你正在升级 从ERDDAP™1.38 或 1.40, 没有更改需要您修改配置文件 (但是您必须使用新信件. xml 文件) 。 。 。 。
    *   ERDDAP™再来一次Java1.6 (中文(简体) ). (ERDDAP™v1.40 所需数额Java1.7 (韩语).) 我们仍强烈建议使用最新版本Java1.7 (韩语).
    * 一个新的数据集类型,[从 EDD 表格 AwsXml 文件夹](/docs/server-admin/datasets#eddtablefromawsxmlfiles),可以读取一组自动气象站的数据 (自动取款机) XML 数据文件. 多亏了Lynn Dewitt和探索馆
*    **小型变化/ Bug 修正 :** 
    * 根据NDBC的变动调整SOS源数据服务器.
    * 根据NOS COOPS ASCII服务的变化进行调整.
    * 做了几个小的更改和错误修正 。

## 第1.40号版本{#version-140} 
 (2012-10-25年发布) 

*    **新特性 :** 
    * 有一个新的输出文件格式tabledap数据集 :.ncCFMA 将请求的数据保存在.nc符合 CF 的文件[断层采样](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)多层面矩阵选项,因此符合NODC模板\\[2021年:现在[NCEI 模板](https://www.ncei.noaa.gov/netcdf-templates)\\]用于存储此类数据。 感谢NODC。
    *   tabledap请求现在可以包含时间限制, 如时间( T)now-5天时间。 见[文档](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)。 。 。 多亏了詹姆斯·高斯林
*    **东西ERDDAP™管理员需要知道和做:** 
    * 如果你正在升级 从ERDDAP™1.38, 没有更改需要您修改配置文件 (但是您必须使用新信件. xml 文件) 。 。 。 。
    *   ERDDAP™公众发布和内部里程碑可通过[ERDDAP™关于 GitHub 的](https://github.com/ERDDAP)。 。 。 。 更多信息,见[维基](https://github.com/ERDDAP/erddap/wiki)联 合 国ERDDAP™项目和较一般性项目[ERDDAP™程序员指南](/docs/contributing/programmer-guide)。 。 。 。 (此事是于ERDDAP™1.38发布.) 
    * 生成数据 Xml 已经改进。
        * 修改了脚本,使其能正确操作所有 Linux 计算机 (不只是几个) 。 。 。 。
        * 现在又说creator\\_name, (中文).creator\\_email,以及creator\\_url尽可能
        * 许多其他小改进.
    * 如何改进ERDDAP™处理时间。
        * 内部,ERDDAP™现在以毫秒精度处理时间 (非秒数) 。 。 。 。
        * 您现在可以选择指定特定数据集的时间精确度,参见[time\\_precision](/docs/server-admin/datasets#time_precision)。 。 。 例如,您可以设置一个数据集,以精确显示时间值 (例如,1970-01-01年) 。 。 。 。
        * 您的当前数据集将使用默认设置, 因此它们不会受到这些变化的影响, 并且将继续以秒精确显示时间 。 感谢塞尔维特·西兹梅利和菲利普·戈尔德斯坦.
    *   [来自 NcCFF 的 EDD 表格](/docs/server-admin/datasets#eddtablefromnccffiles)是一种新的数据集类型,可以在您的datasets.xml文档。 它可以从其中定义的众多文件格式中的任何一种读取数据[CF 数字 断层采样](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)公约。 感谢NODC和特别感谢Kyle Wilcox为大量有效的DSG文件格式制作样本文件并公开它们.
*    **小型变化/ Bug 修正 :** 
    * 扩大了[快速重新启动](#quick-restart)系统与所有相关EDDGrid和 EDDTable 子类。
    * 改进文件,特别是如何使用[格点](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)和[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)从各种客户端软件。
    * 更改了高级搜索, 以支持时间和/或最大时间表示为时代秒 。 多亏了琳恩·杜威特
    * 已更改.htmlTable输出以显示 urls 和电子邮件地址作为链接。
    * 将“rel=”和“rev=”添加到相关&lt;a 标记。 感谢帕特·卡佩莱尔OGC REST项目。
    * 加强保护,防止出现不切实际的大规模数据请求,特别是在tabledap问题更严重的地方
    * 将更多信件移至信件. xml 。
    * 改进了速度
    * 固定EDDGrid从 Files 到允许降级排序轴 。 感谢马里塞尔·埃切加雷.
    * 已删除对 iGoogle 的引用, 因为它将被中止 。
    * 做了几个小的更改和错误修正 。

## 第1.38号版本{#version-138} 
 (2012-04-21年发布) 

*    **新特性 :** 
    * ISO 19115和FGDC --ERDDAP™可以为每个数据集自动生成ISO 19115和FGDC XML元数据文件. 在每个数据集列表中可见与文件的链接 (例如,从全文搜索) ,也可以在网络可访问文件夹中 (妇女论坛)   (见[FGDC 妇女论坛](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)和[ISO 19115 WAF 标准](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) 。 。 。 多亏了泰德·哈伯曼(英语:Ted Habermann),戴夫·诺伊费尔德(英语:Dave Neufeld)和许多其他人.
    * 现在支持对数据集进行全文搜索 \\ _excludedWord_和\\_____ 排除语句__. 多亏了Rich Signell
    * 搜索数据集现在一次返回一个页面的结果。 默认使用参数字符串: page=1&itemsPerPage=1000,但您可以更改您请求的URL中的值. 感谢史蒂夫·汉金和UAF项目.
    *   OpenSearch- —— - 说ERDDAP™现在支持[OpenSearch1.1 国家](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)用于搜索数据集的标准。 除其他外,这允许目录汇总网站进行分布式搜索 (向它知道的每个目录传递搜索请求) 。 。 。 。
    * 逗号已分离 数值 (简历) 文件 -ERDDAP™现在生成只带逗号的 CSV 文件 (Excel 喜欢的) ,而不是逗号+空间。 感谢杰夫·德拉博贾迪耶尔。
    * 百万个数据集 -- 为支持ERDDAP拥有大量的数据集, 甚至一百万。 感谢史蒂夫·汉金和UAF项目.
*    **东西ERDDAP™管理员需要知道和做:** 
#### 快速重新启动{#quick-restart} 
*   [页:1](#quick-restart)允许快速重启系统ERDDAP™以更快的速度重新启动。
     **请将此添加到您的设置. xml 文件** 紧接着&lt;/数据集Regex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * 现在可以使用 Lucene 搜索引擎对数据集进行全文搜索 (虽然我们推荐原始搜索引擎 如果你的数据集不足10,000个) 或原始搜索系统。
         **请将此添加到您的设置. xml 文件** 紧接着&lt;/播放诊断信息 &gt; :
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * 在设置.xml中,你可以/现在应该在逗号分隔的列表中添加两个新类别&lt;categoryAttributes&gt; :
        * 全局:关键词 (在全球: 机构之后添加) - 一个新特殊例,从全局关键字属性中解析一个逗号分隔的关键字列表,为每个关键字单独制作一个条目.
        * 变量 名称 (在结尾加上) - 一个新的特殊案例,将每个dataVariable destinationName编号
    * 在设置.xml,你可以 (为什么?) 告诉ERDDAP™不为任何数据集提供FGDC和/或ISO 19115元数据
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

这些设置的默认值是真实的 。
    * 内datasets.xml,请考虑改进数据集的元数据。ERDDAP™现在根据数据集的元数据,自动生成每个数据集的ISO 19115和FGDC XML元数据文件.
这么说 **良好的数据集元数据导致好的ERDDAP- 生成ISO 19115和FGDC元数据.**   
         **见许多新建议的新文件[全球属性](/docs/server-admin/datasets#global-attributes)。 。 。 。** 
    * 内datasets.xml如果你想告诉ERDDAP™使用预制的 FGDC 和/或 ISO 19115 文件,该文件位于服务器文件系统中的某个地方,而不是有ERDDAP™生成这些文件,使用:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
如果 _fullFileName_QX"或文件找不到,数据集将没有FGDC和/或ISO 19115元数据. 因此,如果想要为特定数据集压制FGDC和/或ISO 19115元数据,这也是有益的.
    * 内datasets.xml,为所有人EDDGrid侧边线和EDDGrid汇总 Dimension 数据集,确保孩子数据集不同datasetIDs 超过父母的数据集,也高于其他子女。 (例如,你可以遵循乔治·福尔曼的简单但有效的系统来命名他的孩子.) 如果家族中的任何名字完全相同,数据集将无法加载 (错误消息显示集合轴的值没有排序顺序) 。 。 。 。
    * 内datasets.xml,对有效ioos\\_category元数据值 :
        * "pCO2"改为"CO2".
        * 增加了"物理海洋学".
        * "土壤"被添加.
    * 内datasets.xml, (中文).ERDDAP™不再允许“ .” adatasetID。 。 。 。 这是允许的,但劝阻。 (对不起) 
    * 内datasets.xml中,设置 EDD Tables from Thredds Files 和 EDD Tables fromHyrax文件稍有改动,因为两班都只是重写,以提高效率 (两班现在总是对所有远程数据文件进行本地复制) 。 。 。 见设置这些课程的文件:[从 EDD 表格Hyrax文件](/docs/server-admin/datasets#eddtablefromhyraxfiles)和[来自垃圾的 EDD 表格](/docs/server-admin/datasets#eddtablefromthreddsfiles)。 。 。 特别是,见关于&lt;文件目录 &gt; (现在无关) 和&lt;sourceUrl&gt; 翻译: (现在必须) 。 。 。 另外,你不应该在EDDTable Copy中包装这个类,以提高效率.
    * 内datasets.xml中,如果使用 EDD Table From Database,则使用Oracle数据库中,您应当包括连接 诸如
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
,以指定一次要获取的数据行数,因为默认值为10,这效率极低。 见[Oracle文档](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm)。 。 。 MySql和PostgreSQL似乎对这个设置有更好的默认值. 感谢凯文·奥布莱恩。
    * 如果您使用数据库中的EDDTable,请查看改进的[“指定”文档](/docs/server-admin/datasets#eddtablefromdatabase)为改进业绩提出补充建议。 感谢凯文·奥布莱恩。
    * 内datasets.xml,对于所有EDD表.数据集,在公约和Metadata\\_Conventions全球属性,请参见CF-1.6 (非CF-1.0、1.1、1.2、1.3、1.4或1.5) ,因为CF-1.6是第一个包含与Discrete Sampling几何相关的修改的版本.
    * 正在编译ERDDAP™代码需要将 lib/lucene-core.jar 添加到他们的javac 和 java 命令行路径中的 jar 文件列表中.
    *   ERDDAP™有一个[新服务](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)将 CF 标准名称转换为/从 GCMD 科学关键词。 当您为您的数据集生成全局关键字元数据时, 您可能会发现此有用 。ERDDAP。 。 。 。
    * 处理 Bots -- 请向[防止鼠类爬到你身上ERDDAP™一个愚蠢的方式](/docs/server-admin/additional-information#robotstxt)。 。 。 。
    * 翻译 - 内容在ERDDAP现在的网页大多在信件.xml中,因此适合翻译到不同的语言. (例如,德语、法语) 。 。 。 现在的消息经常使用Message Format进行格式化,也用来帮助翻译. 如果您想翻译,请发电子邮件erd dot data at noaa dot gov。 。 。 。
    * 样本datasets.xml- —— - 说 样本中有一些小但重大的错误datasets.xml。 。 。 如果你使用这些数据集,请从新的样本中获取更新版本datasets.xml在新环境中.zip文档。 多亏了詹姆斯·威尔金森
    * 吉特 - 关 我会努力使ERDDAP™a GitHub 项目在发布后尽快完成。
*    **小型变化/ Bug 修正 :** 
    * 新调色板“ Ocean Depth” 对深度值有用 (正数下降) ,例如,0 (浅) 改为8 000 (深处) 。 。 。 。
    * 那个.kml从tabledap使用更好的标记图标 (这不是模糊的) 。 。 。 现在在标记上徘徊 使它变得更大
    * 来自文件的 EDD 表格 - 在上一次升级时,新的netcdf-java库对变量名有更严格的限制.nc文档。 如果变量是 EDD Table From Files , 则给 EDD Tables 带来问题sourceName有一些点缀字符。 现在修改了“从文件”中的EDD表,以避免这个问题。 多亏了托马斯·霍尔科姆
    * .subset 页面现在支持 0/10/100/1000/100000/100000,而非相关数据的复选框. 工具提示警告说,100000可能导致您的浏览器崩溃. 多亏了安妮特·德斯罗彻斯 理查德 (亚伯) Coughlin)和IOOS生物项目.
    * .../erddap/info/_ (中文(简体) ).datasetID_/index.html的网页现在显示urls和电子邮件地址为可点击链接. 感谢理查德 (亚伯) Coughlin和IOOS生物项目.
    * 错误修复: 英寸tabledap,用于具有高度的数据集 MetersPer 来源单位&lt;0,涉及高度限制的询问处理不当. 多亏了凯尔·威尔科克斯
    * 错误修正 :EDDGrid聚合从现有的 Dimension 现在支持更多样化的TDS URL. 谢谢?

## 版本1.36{#version-136} 
 (2011-08-01发布) 

*    **新特性 :** 
    * 从用户的角度来看,没有重大变化。
*    **东西ERDDAP™管理员需要知道和做:** 
    * 通常用作样本数据集的 pmelTao 数据集tabledap  
不再提供文件。ERDDAP™管理员必须进行这些修改 :
        * 在你身边datasets.xml如果你有一个datasetID= "pmelTao" 数据集,添加
active="假"正前方该行末尾的"&gt;".
        * 在你的设置.xml,如果你&lt;EDD TableId 示例 &gt; 那么是PmelTao,然后是:
            * 狦datasets.xml没有数据集与datasetID="erdGlobecBottle",加上
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * 在您的设置. xml 中, 替换全部标记&lt;EDD TableId 示例 &gt; 通过
                &lt;电子数据交换表Matlab绘图实例 &gt; 与
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * 对于该类型是 EDDTable FromFiles 子类的数据集,您现在可以从元数据中生成数据.
具体来说,你现在可以从一个原始变量的属性的值中生成一个变量.
例如,在datasets.xmla 内&lt;dataVariable&gt; 标记,如果使用
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™将使用巡航变量的 PI 属性值制作变量。
感谢WOD。
*    **变化 :** 
    * 小变化

## 第1.34号版本{#version-134} 
 (2011-06-15年发布) 

*    **变化 :** 
    * 错误修正 : 修复大约 64 位的内存泄漏Java设施。
    * 错误修正 :ERDDAP™现在正确设定这些全球属性, 当纬度维度值从高到低: 地理空间- lat\\_min, 地理空间- lat\\_max, 最南端- 北端- 北端。
        
请注意:actual\\_range不变:它可能具有低值、高值或高值、低值,因为它旨在表示储存的范围和顺序。
        
    * 小变化.
    *   ERDDAP™管理员不需要修改他们的设置. xml 或datasets.xml。 。 。 。

## 第1.32号版本{#version-132} 
 (2011-05-20年发布) 

*    **变化 :** 
    * 支持新批准的CF Discrete Sampling Geometries (遗憾的是,目前尚未在网上提供) ,取代拟议的CF点观测公约。
        ERDDAP™用户会看到 cdm_%feature_%type=Station 被 TimeSeries 所取代,并且为该程序创建的文件会有小的修改.ncCF 文件类型 (平面现在叫做样本) 。 。 。 。
        ERDDAP™管理员需要在datasets.xml数字 :
        * cdm\\_data\\_type=station 应更改为cdm\\_data\\_type=TimeSeries.
        * cdm\\_data\\_ type=StationProfile 应更改为cdm\\_data\\_ type=TimeSeriesProfile.
        * cdm\\_station\\_variables 应更改为 cdm\\_tim\\_sseriesvariables.
        * Cf\\_role=station\\_id 应更改为Cf\\_role=time series\\_id.
    * 新设ioos\\_category选项:“彩色溶解有机物质”、“pCO2”、“结构流”、“总悬浮物质”。
    * 可能的64位内存泄漏解决方案Java。 。 。 。\\[没用的\\]
    * 小变化.

## 版本 1.30{#version-130} 
 (2011-04-29查阅) 

*    **新特性 :** 
    * 对 64 位的支持Java。 。 。 。 使用64位时Java, (中文).ERDDAP™现在可以使用更多的堆积内存,并处理更多的同时请求.
    * 支助.nc文件请求最多 2GB (即使没有64位Java) 通过更好地利用ERDDAP数据按块处理。
    * 代码中的许多2X速度改进和2X速度从Java1.6 生产ERDDAP™2X到4X比之前更快.
    * 内存保存改进明显减少ERDDAP'基础内存使用.
    * 对于表格数据集,ERDDAP™现在完全了解了数据集的cdm\\_data\\_ type,以及如何将数据映射到CDM类型. 见[CF 数字 分解取样](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)。 。 。 也许很快,Word文件将被转换成.html,并替换该网页上目前的"OBSOLETE"信息. 谢谢你NOAAUAF项目.
    * 对于大多数 EDDTable 数据集,一个新的输出文件类型选项,.ncCF, 创建相邻的挂线阵列.nc符合最新版本的文件[CF 数字 地理气象公约分层取样](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)。 。 。 这些文件的结构反映了数据集的清洁发展机制数据类型。 由于提议的公约刚刚改变,从此写作开始,netcdf-java库尚不支持读取由ERDDAP并将其解释为清洁发展机制数据文件。 可能很快就会了 谢谢你NOAAUAF项目.
    * 视图 : 在. subset 网页上的区分数据选项现在是一个下拉列表, 允许用户指定要查看的不同数据的最大行数 (默认 = 1000) 。 。 。 这一变化以及其他变化允许ERDDAP™与拥有大量不同数据的数据集合作。 (任何单个变量的独特值数量仍然是个问题,但它可能相当高 (两万?) 在 . subset 和其他网页加载前, 速度非常缓慢 。) 谢谢你NOAAUAF项目.
    * .subset网页有一个新的选项: 查看区分数据数。 感谢GTOPP项目.
    * 为帮助用户,不同的价值观 (例如,站名) 现在显示在 Make-A-Graph 和数据访问表格上。 谢谢你NOAAUAF项目.
    * 透明 Png请求现在支持所有类型的图表和数据表达. 它只是绘制数据-- 没有斧头,传说,土地掩埋,或者其他东西。 这使得将图像作为透明Png层成为可能. 如果 &. size &. width_|查询中指定(_H) (建议) 很荣幸 默认值为360x360像素. 唯一的例外是EDDGrid&.draw=表面, 默认位置 (和以前一样) 是每个数据点~1/像素的图像 (最多3000x和y 像素) 。 。 。 感谢弗雷德·霍赫斯塔德.
    * 那个WMS网页现在显示数据集变量的颜色栏 (编号) 。 。 。 感谢埃米利奥·马约加等人.
*    **东西ERDDAP™管理员需要知道和做:** 
    * 此发行涉及许多变化. 它们都很重要。 请耐心地工作,通过下列所有变化。
    * 这个版本的推出时间比打算处理一些问题要早。Java安全错误。 不幸的是,有几处专门设计ERDDAP™版本不在本版本中。 对不起 希望下一个版本会很快 (更方便升级到) 。 。 。 。
    * 避免多个安全漏洞Java6 更新23及以下,下载并安装最新版本Java  (Java6 更新24或以上) 。 。 。 如果您有64位操作系统,请获得64位版本Java。 。 。 。
    * 如果你使用Tomcat 5,你必须升级到Tomcat 6或7 (首选项) 。 。 。 如果你使用Tomcat 6,考虑升级到Tomcat版本7.
    * 请遵照所有指示[建立一个新的ERDDAP™](/docs/server-admin/deploy-install),但如果相关的话,您将从旧安装复制文件到新安装,特别是\\[移动猫\\]/content/erddap 目录和文件. 为此,请注意[新的Tomcat设置建议](/docs/server-admin/deploy-install#tomcat)。 。 。 。
    * 默认 erddap.css 现在包含在 erddap.war 文件中.
        * 要使用默认 erddap.css, **删除** 你的旧\\[移动猫\\]/内容/erddap/图像/erddap.css.
        * 如果你修改\\[移动猫\\]/content/erddap/images/erddap.css,并想继续使用它:只要把它留在原位上并替换&lt;输入 &gt; 部分,其内容为:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * 在你身边\\[移动猫\\]/内容/erddap/设置.xml:
        * 替换与&lt;部分请求MaxBytes &gt; 和&lt;部分请求MaxCells &gt; 与
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * 替换与&lt;categoryAttributes&gt; 并考虑修改标签的值 :
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

个人&lt;categoryAttributes&gt; 现在属于全球属性的,通过前缀全球识别: (例如:全球:机构) 。 。 。 其他属性被假定为可变属性 (例如,standard\\_name) 。 。 。 。 此外,机构价值 (唯一一个) 被留在原病例中。 现在所有类别值都被转换为小写.
    * 在你身边\\[移动猫\\]/内容/erddap/datasets.xml数字 :
        * 大改进:ERDDAP™拥有与表格数据集的 cdm\\_data\\_ type相关的新要求. 值得注意的是,每个数据集MUST都有正确的元数据和与cdm\\_data\\_ type相关的变量. 如果不是,则数据集不会加载并且会丢出一个错误. 见文件[cdm\\_data\\_ 类型](/docs/server-admin/datasets#cdm_data_type)。 。 。 。
        * 缩略语:有一个新的数据集类型: EDDTable FromAsciiServiceNOS.
        * 报告:有三个新允许ioos\\_category选项: 水文学,质量 (例如,质量旗帜) 统计 (例如, 平均值) 。 。 。 。
        * 对于 EDD Table 从... 文件数据集, 删除任何&lt;nDimensions &gt; 标记。 它们已不再需要或使用。
        * 用于变量destinationName高度 = 高度 = 高度 = 高度 = 高度 = 高度ERDDAP™不再强迫long\\_name成为海拔。 请通过你的datasets.xml并反复搜索&lt;destinationName&gt;海拔并添加到该变量&lt;addAttributes&gt; :
```
              <att name="long\\_name">Altitude</att>  
```
             (或稍有区别long\\_name特殊情况) 。 。 。 。
        * 可选: 来自Files子类的所有 EDD Table 支持变量[sourceName全球:](/docs/server-admin/datasets#global-sourcenames)将每个文件中的全局元数据转换为数据变量。 感谢林恩·德维特.
    * EDD Table from Database 用户 -ERDDAP™带有 Postgres 的新 JDBC 4 驱动程序。 其它数据库请检查您的数据库中最新的 JDBC .jar 文件的网页 。 从ERDDAP™现在使用Java1.6+, JDBC 4号 (不是3个) 可能建议。
    * 报告
        *   EDDGrid发件人... 从. 文件数据集现在存储文件表信息
            \\[大家长会\\]/数据集 资料/\\[datasetID\\]/\\*.nc文档。
此外,EDDTable数据集现在将子集信息存储在
            \\[大家长会\\]/数据集 资料/\\[datasetID\\]/\\*.nc文档。 这些文件曾经是
            \\[大家长会\\]/数据集 资料/\\[datasetID\\]._____________________________________________.json文档。
旧文件将在ERDDAP™开始 或者,你可以删除所有文件 (但留下空的子目录) 输入\\[大家长会\\]/datasetInfo/. 请检查date=中的日期值 (帮助).
        * 我研究了一个新的EDD Table FromNcCFFiles,它将利用拟议的新的CF点观测公约读取本地和远程文件的数据。 但它不是在这个发布。 netcdf-java库中存在一些与阅读这些文件的方法有关的问题. 提议的《CF点观测公约》最近作了一些修改。 当Netcdf-java图书馆固定并更新到最新建议时,我将恢复这方面的工作。
        * 运行ERDDAP™在 Windows 上可能存在问题: 值得注意的是, 您可以在\\[bigParrent Briefy/logs/log.txt 文件 页面存档备份,存于互联网档案馆ERDDAP™有时无法快速删除和/或重命名文件。 是因为防病毒软件 (例如,来自McAfee和Norton) 正在检查病毒的文件。 如果你遇到这个问题 (可以在log.txt文件中看到错误消息,例如“无法删除...”) ,改变抗病毒软件的设置可能会部分缓解问题.
如果ERDDAP™在 Windows 中,这只是在您的桌面上运行的测试,这只是一个烦恼.
如果ERDDAP™在 Windows 中是您的公开ERDDAP™,考虑切换到 Linux 服务器。
    * 慢速启动... 你第一次跑的时候ERDDAP™升级后,ERDDAP™装入数据集可能很慢。 路边ERDDAP™存储关于聚合文件的信息已经改变, 所以ERDDAP™需要从所有这些文件中重新读取一些信息。 这需要时间。
    * 启动时出错... 鉴于与 cdm\\_data\\_ type 相关的更改, 您的一些数据集可能不会加载并丢出错误 。 仔细阅读每日报告电子邮件ERDDAP™什么时候派你来ERDDAP™已启动 。 它会有一个没有装入的数据集列表 (在顶端) 以及他们没上膛的原因 (贴近底部) 。 。 。 。
    * 如果你被卡住或有其他问题,请给我发电子邮件:erd.data at noaa.gov。 。 。 。
    * 程序员 - —— - 说 如果你写Java运行的程序ERDDAP™代码,您需要修改一些命令行参数引用:
        * 将Joda-time -1.6.2.jar改为Joda-time. 罐头
        * 将 Postgres JDBC.jar 改为 postgresql.jdbc.jar
*    **小变化和错误修正 :** 
    
    * 改进连接处理以避免挂线.
    * 改进货币做法,以便更有效地处理几乎同时提出的相同请求。
    *   ERDDAP™现在使用netcdfAll-4.2.jar (重新命名为 netcdfAll-latest 。 罐头) 。 。 。 此切换需要若干内部修改,并导致一些小的外部修改,例如修改grib文件的阅读方式和小的修改.nc标题输出 。
    * 新特性 :\\[错误\\]/convert/fipscounty.html 转换FIPS县名的上/下郡代码.
    * 在地图上,国家边界现在是暗紫色的,所以在所有背景颜色上都比较突出.
    * 表格.kml输出再次使用圆形图标标记点 (不是飞机图标 谷歌最近切换到) 。 。 。 。
    * erdCalcofi数据集已重新排列,现在从本地文件得到服务 (快点) 。 。 。 。
    * 生成数据 Xml 从 线索 现在目录创建了结果文件 :
        \\[移动猫\\]/webapps/erddap/WEB-INF/temp/ (中文(简体) ).EDDGrid从ThreddsCatalog.xml. 感谢凯文·奥布莱恩。
    * 生成数据 Xml 从 线索 现在目录试图从源代码 URL 中删除不必要的端口号 (例如:8080和:8081有时可以删除.) 。 。 。 。 感谢NOAA中央警卫队
    * 对于.subset网页,区别数据地图现在有一个可变的lat lon范围.
    * 几个清单ERDDAP™  (例如,显示所有数据集的表格) 在A. Z. 排序之前。.z。 。 。 现在他们以对案件不敏感的方式排序。
    * 对.subset网页的小改动,包括: 现在标明单位.
    * 生成数据 Xml 和 DasDds 如果无法将结果放入系统剪贴板或显示InBrowser 中,则不再丢弃例外. 感谢埃里克·布里奇和格雷格·威廉姆斯.
    * 错误修正 : 当数据集被装入时,ERDDAP™现在删除或调整地理空间全球属性。 多亏了查尔斯·卡尔顿
    * 错误修复: 字符串2. getClassPath () 现在正确解码该类 路径 (特别是,在 Windows 上,文件名中的空格为% 20) 。 。 。 。 这影响了ERDDAP™EDStatic 呼叫 SSR. GetContext Birectory( 调用 SSR. () 并查找内容/erddap。 多亏了阿贝·考夫林
    * 错误修正: 在 EDD Table From Files 中, 用于获取 DataForDapQuery 处理区分 () 请求。 感谢埃里克·布里奇尔.
    * 错误修正 :tabledap当数据集的高度时,请求没有正确处理高度限制 MetersPer Source Unit当时是−1. 感谢埃里克·布里奇尔.
    * 错误修正: EDD Table from... 文件数据集现在正确处理请求包括=NaN和&#33;=NaN.
    
## 第1.28号版本{#version-128} 
 (2010-08-27发布) 

*    **新特性 :** 无。
*    **东西ERDDAP™管理员需要知道和做:** 无。
*    **错误修正 :** 修正编程错误 (仅1.26级) 达到ERDDAP™非常缓慢。
     

## 第1.26号版本{#version-126} 
 (2010-08-25发布) 

*    **新特性 :** 无。
*    **东西ERDDAP™管理员需要知道和做:** 
    * 从你的\\[移动猫\\]/内容/erddap/设置.xml,
        * 内&lt;法律上,在下面一条新线上\\[标准 数据链接\\],插入\\[标准联系\\]。 。 。 。\\[标准联系\\]提及&lt;adminEmail &gt; 在设置. xml 中指定了更高的内容.
        * 删除&lt;表格CommonBGColor &gt; 和&lt;表格突出显示BGColor&gt;。
        * 建议: 变动&lt;端点BodyHtml &gt; 到
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * 要求 : 给你的\\[移动猫\\]/content/erddap/images/erddap.cs和erddapAlt.cs,在底部添加: .
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **错误修正和小改变 :** 
    
    * 臭虫修正:在某些情况下,表格在一些版本的Internet Explorer中没有作用. 非常感谢格雷格・威廉姆斯。
    * 错误修正 : 如果数据集来自远程, Make A Graph 按钮则无效ERDDAP。 。 。 。
    * 错误修正 :WMS如果数据集来自远程,有时会失效ERDDAP。 。 。 。
    * 许多小改变和错误修正.
    

## 第1.24号版本{#version-124} 
 (2010-08-06发布) 

*    **新特性 :** 
    * 新设[子集网页](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)使用面部搜索来选择表格数据集的子集。 感谢POST。
    * 新设[高级搜索](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)结合所有其他搜索选项,并添加经度,纬度,以及时间界限框. 多亏了艾琳蒙哥马利 (抱歉耽搁了) 
    * 新设[转换时间](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)网页和服务允许您将数字时间转换为/从ISO字符串时间。
    * 新设[转换单位](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)网页和服务允许您转换UDUNITS到/从UCUM单位。 感谢NOAA监督办SOS。 。 。 。
    * 如果一个tabledap请求包括单位( U) ("UCUM" (UCUM) (英语).) ,这些单位名称将从原名称中转换 (通常UDUNITS) 改为[大学](https://unitsofmeasure.org/ucum.html)单位名称。 这只影响单位\\*名称\\*,而不是数据值。 感谢NOAA监督办SOS。 。 。 。
    * 改进图表网页、图表和地图:
        * 如果图形是地图,则有新的 Make A Graph 按钮进行缩放,并有新的选项可以单击以更改地图的中心点。 感谢POST。
        * 在底部附近添加过滤器设置 。 多亏了格雷格・威廉姆斯
        * 在海岸线数据文件中构建的数据更新为GSHHS v2.0. 感谢POST。
        * 现在的地图包括湖泊和河流. 感谢POST。 (抱歉,萨克拉门托河三角洲没有出现,因为海岸线数据或湖泊/河流数据集都没有处理。) 
        * 已更新了由纸币衍生的民族/州档案。 感谢POST。
        * Topography.cpt稍作修改. (如果这对你有不利影响的话,对不起) 感谢POST。
        * 在网格dap's Make A Graph中,如果用户更改变量,则表格会自动重新提交,以便axisVariables' showSartAnd Stop 总是反映图表变量。 多亏了华金·崔南
        * 对于 png 和 pdf 图像 URL :
            * 新建 &. land%% 值_, 其中 _ 值_ 可以是“ under” (显示地形) 或"结束" (只要显示水深) 。 。 。 如果没有指定,则默认设置为[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)输入datasets.xml或设置.xml. 感谢POST。
            * 新建: 传说中的线条太长会自动分解成多行. 感谢POST。
        * 对于 png 图像 URL :
            * 新建 &. legend_ value_, 其中 _ value_ 可以是“ bottom ” (默认) ,"Off"或"Only". ,"Off"或"Only". 这让你包括传说,排除传说,或者只得到传说. 多亏了卡拉·威尔逊
            * 新建 &.trim=_n 像素_ 离开 n 像素的边框 (例如,10项) 在图像的底部。 它在.legend=Off之后应用. 多亏了卡拉·威尔逊
            * 新建 &. size_% width_|_height_让您指定图像的宽度和高度,以像素表示.
    * 新输出文件格式 :
        * .csvp和 (中文(简体) )..tsvp -- -- 如.csv和.tsv,但与 " (单位(_U)) " 附于第一行的栏名。
        * odvTxt - 制作简化数据输入的.txt文件[海洋数据 视图 (ODV 车辆) ](https://odv.awi.de/)。 。 。 。
        * .esriCsv - 制作适合导入的 .csv 文件ArcGIS。 。 。 。 (仅表格数据集) 多亏了扬·梅森 杰夫·德·拉·博贾迪耶尔NOAA监督办SOS项目。
    * 图形用户界面改进[分类](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)网页。 此外,分类值 (非机构) 现在都是小写。 接受非低级请求 (重定向) 用于反向兼容性。 多亏了罗伊·门德尔索恩
    * 错误消息现在更短,更面向用户. 多亏了格雷格・威廉姆斯
    * 内在变化会大大降低ERDDAP'基础内存使用.
    * 仅与POST项目相关的许多新特征.
*    **东西ERDDAP™管理员需要知道和做:** 变化很多。 对不起 但每个都带来一些好的好处。
    * GenerateDatasetXml 的大修改——现在它经常问更多的问题 (参见相关[数据集 类型](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)资料) 并且现在总是产生基本上可以随时使用的内容datasets.xml。 。 。 你仍然负责 设置,所以你仍然应该审查datasets.xml在使用前包含内容。 将努力投入项目的人总是比计算机程序做得更好. 感谢UAF项目.
    * 在设置.xml中,必须修改WMS节。 现在应该包括这些标签 (但可以随意改变价值) 数字 :
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * 在设置.xml中,复制并粘贴新建议&lt;启动 HeadHtml &gt; 以替换您的旧版本。 但可以随意改变你的喜好
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

感谢POST,汉斯·维多和里克·布莱尔.
    * 在设置.xml,在&lt;启动 BodyHtml &gt;,修改&lt;机构 &gt; 标记为&lt;body&gt;,因为样式现在由 erddap.css 设置.
    * 在设置.xml中,更改为此&lt;端点BodyHtml &gt; (但将电子邮件地址更改为您的电子邮件地址, 并可以随意进行其他更改) 数字 :
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * 高度建议:建议设置.xml&lt;描述Html &gt; 现在
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

请随意修改,特别是第1段最后一句。
    * 在设置. xml 中, 邮件“ 万事通” 和“ 每日报告” 现在可以被逗号分隔的电子邮件地址列表 。 第一个邮件 要特殊,例如,EDDXxxxx FromErddap数据集的订阅使用该电子邮件地址. 感谢约翰·莫伊雷尔.
    * 电子邮件错误现已登录到\\[大家长会\\]/logs/电子邮件LogYYY-MM-DD.txt文件.
    * 在设置.xml中,有一个新的,可选的参数设置电子邮件账户属性(通常是在之后)&lt;电子邮件Password &gt; :
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

缺省无为. 多亏了瑞奇·辛吉尔
    * 需要:如果使用 EDD Table Copy 或EDDGrid收到,你必须全部销毁\\[大家长会\\]/ 复制/ 目录和在目录或文件名中包含“ xh” 的文件在停止旧名后ERDDAP™在开始新的程序之前ERDDAP™所以这些文件会被重新复制。 我很抱歉,但改变很重要 希望它影响很少的管理员和档案。
在 Linux 中, 您可以用 cd 找到这些文件\\[大家长会\\]副本
寻找。\\*页:1\\*  
在 Windows 中,您可以找到这些文件。 Start|搜索
您想要搜索什么: 文档
全部或部分文件名: xh
查看: 浏览 - &gt;\\[大家长会\\]副本
点击“ 搜索 ”
^A 选择全部
全部删除
    * 请求:datasets.xml,对于EDDTable FromDatabase数据集,对于日期和时间戳变量,修改数据 从1970-01-01T00:00Z开始,输入为双倍,单位为秒. 我们要求你在数据库中存储时间戳数据\\*与\\*一个时区。 没有时区信息,查询会ERDDAP™发送到数据库和结果ERDDAP™通过JDBC从数据库中获取是模棱两可的,很可能是错误的。 我们试过了,但找不到可靠的方法处理"没有时区时标"的数据. 我们认为这是好的做法。 毕竟,"无时区时标"数据有一个隐含的时区. 虽然时间区对数据库管理员来说是显而易见的,但明确指定时间区是有意义的,以便其他软件能够与数据库进行适当的互动。 谢谢/抱歉迈克尔·乌尔岑。
    * 高建议:datasets.xml,为了启用 .subset 网页进行表格数据集的面对面搜索,需要添加 [&lt;subsetVariables&gt;] (中文(简体) ). (/docs/server-admin/dataset#可变子) 到数据集的全局属性。
    * 建议:datasets.xml,如果您有数据集datasetID="pmelGtsppp",请修改为:
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * 建议:datasets.xml,则对[&lt;cdm\\_data\\_ 类型 & gt;] (/docs/server-admin/datasets#cdm_data_类型) global 属性,所以您应该审查/更改数据集的值。
    * 内datasets.xml,新的&lt;源代码扩展FPQQEQ&gt;] (/docs/server-admin/datasets# source necentspandedfp_eq 互联网档案馆的存檔,存档日期2013-12-21.) 如果源服务器不能始终如一地处理QQ可变QQ值,则有帮助。 (因为[测试浮点数等值的一般困难](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) 。 。 。 来源 需求扩展FPQQEQ 默认设置为真 (最安全的设置) ,所以你不需要做任何改变。
    * 新设[来自 Ascii 文件夹的 EDD 表格](/docs/server-admin/datasets#eddtablefromasciifiles)。 。 。 。 谢杰云潘.
    * 新设[来自垃圾的 EDD 表格](/docs/server-admin/datasets#eddtablefromthreddsfiles)。 。 。 多亏了罗伊·门德尔索恩
    * 变动至[来自 NcFiles 的 EDD 表格](/docs/server-admin/datasets#eddtablefromncfiles)让它与更广泛的文件使用。
    * EDD Table FromBMDE 已禁用 。 不再有任何活跃、适当的数据来源。
    * 在生成DatasetXml中,新建EDDGrid从垃圾 整个THREDDS目录 (或子集) 生成datasets.xml内容。 感谢UAF项目.
    * 生成数据 Xml 和 DasDds 现在将其结果输入\\[大家长会\\]/logs/log.txt (英语). 多亏了瑞奇·辛吉尔和查尔斯·卡莱顿
    * 登录系统的许多改进. 感谢POST。
*    **东西ERDDAP™程序员 需要知道和做:** 
    * /WEB-INF/lib/目录有变化. 请相应更改您的 Javac 和 Java 类路径设置 。
    * 有一个新的\\[您的电话 乌尔尔\\]/erddap/版本服务,以确定一个版本ERDDAP。 。 。 答复是文本,例如:ERDDAP翻译: 如果您收到 HTTP 404 非故障错误消息, 请处理ERDDAP™作为1.22或以下版本。 感谢POST。
*    **小变化和错误修正 :** 
    
    * 从 EDD 表格 群变化 :
        * 读取 IOOS 时已放弃支持SOSXML响应.
        * 添加读取 IOOS 的支持SOS文本/简历。 (所以没有SOS目前不支持服务器 。) 
        * 做了很多与IOOS相关的更改SOS服务器细节 。
        * 为IOOS的 BBOX 查询添加支持SOS和OOSTethys SOS服务器。 这些变化导致相关数据请求速度大增. 感谢IOOSSOS。 。 。 。
    * 文字输入.mat表格数据文件现在保存正确 。 多亏了罗伊·门德尔索恩
    *   WMS
        *   OpenLayers现在捆绑在一起ERDDAP™用于WMS网页。 这解决了当OpenLayers几个月前就变了 并且防止未来出现问题
        * 在那个WMS GetCapabilities反应,&lt;在线资源&gt; 值现在是 URLWMS服务。 多亏了查尔顿·加尔瓦里诺
        * 一个传说显示在WMS显示颜色栏的网页。 多亏了埃米利奥·马约加
    *   EDDGrid如果轴源有问题 。 价值与目的地不相等 值,例如如果源时间不是"seconds since 1970-01-01"。 。 。 。 感谢Todd斯宾德勒
    * 在表WriterGeoJson中,bbox之后的超额“ ”\\[. .  ....\\]已删除。 多亏了格雷格・威廉姆斯
    * 许多小改变和错误修正.
    
## 第1.22号版本{#version-122} 
 (2009-07-05年发布) 

* 在1.20中引入的幻灯片Sorterbug是固定的.
* 1.20中引入的OBISbug是固定的.
* 图像/gadgets/GoogleGadgets页面上对Jason数据集的引用被删除.
     
## 第1.20号版本{#version-120} 
 (2009-07-02发布) 

*   ERDDAP™管理员请将此添加到您的设置. xml 文件中 :
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* 新的数据集类型[EDDGrid复制](/docs/server-admin/datasets#eddgridcopy)和[EDD 表格复制](/docs/server-admin/datasets#eddtablecopy)制作并维护另一个的本地副本EDDGrid或 EDDTable 数据集的数据,并服务本地副本中的数据。 这些非常容易使用,非常有效 **解决远程数据源数据服务方面一些最大的问题:** 
    
    * 从远程数据源获取数据的速度可能很慢 (由于各种原因) 。 。 。 。
    * 远程数据集有时无法使用 (同样,出于各种原因) 。 。 。 。
    * 依赖一个数据来源,不能很好地衡量 (例如,许多用户和许多用户ERDDAP使用它 使用它) 。 。 。 。
    
另外,本地拷贝是原作的备份,在原作发生意外时有用.
    
在本地复制一个数据集方面没有任何新情况。 新的是这些班级能办到\\*简单\\*创建和\\*维护\\*本地数据副本\\*变量\\*各类远程数据源和\\*添加元数据\\*在复制数据时。
    
这些数据集类型是一套完整的功能的一部分,简化了创建[网格/集群/联邦ERDDAP编号](/docs/server-admin/scaling)处理非常沉重的负载 (例如,在数据中心) 。 。 。 。
    
* 新建数据集类型[数据库中的 EDD 表格](/docs/server-admin/datasets#eddtablefromdatabase)获取本地或远程数据库表格中的数据。
*   ERDDAP™现在有一个[警卫](/docs/server-admin/additional-information#security)支持认证的系统 (让用户登录) 和授权 (允许他们访问某些私人数据集) 。 。 。 。
* 有一个[2,新的命令行工具](/docs/server-admin/datasets#tools)帮助ERDDAP™管理员生成 XML 用于在datasets.xml数字 :
    * 生成数据 Xml可以为几乎所有类型的数据集生成数据集XML的粗略草稿.
    * DasDds 帮助您反复测试和完善一个数据集的 XML 。ERDDAP生成数据 Xml网页已删除。 出于安全考虑,他们只支持少数数据集类型. 新的命令行工具是一个更好的解决方案.
* 新的[状态页面](/docs/server-admin/additional-information#status-page)让任何人 (特别是行政人员) 状态ERDDAP™从任何浏览器中选择\\[基数Url\\]/erddap/status.html。 。 。 。
* 表格当前支持[服务器侧功能](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions)数字 :
    * 模糊( U) () 从响应表格中删除重复行,
    * 打开orderBy (. .  ....) 请指定应答表的排序方式,
    * 打开orderByMax (. .  ....) 允许您指定应答表格的排序方式,并删除所有行,但最后一列中最大值的行除外。 例如,这可以用来获取每个台站最后的数据。
* 表格数据集现在可以包括未命名的其他日期时间变量"time"。 。 。 这些变量由它们的"单位"元数据确认,其中必须包含" since "  (数字日期 时间) 或"yy"或"YY"(YY) (用于格式化字符串日期) 。 。 。 。 但请继续使用destinationName "time"主要日期为 时间变数.
*   ERDDAP™现在生成一个[站点地图.xml](/docs/server-admin/additional-information#sitemapxml)文件,它告诉搜索引擎您ERDDAP只是每个月都要爬起来ERDDAP™管理员请跟来[这些指示](/docs/server-admin/additional-information#sitemapxml)以通知搜索引擎关于新网站map.xml文件。
*   ERDDAP'错误消息现在要短得多, 并针对客户端 (不是程序员) 。 。 。 。 多亏了格雷格・威廉姆斯
* [&lt;请求黑名单 &gt;] (/docs/server-admin/datas# 请求黑名单) 现在也支持将最后一个数字替换为QQ的IP地址.
* 请求.json而.geoJson文件现在可能包括可选文件[日语](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)通过添加“( A).jsonpQX函数Name_" 到查询结束 。 基本上,这只是告诉ERDDAP™添加“_函数Name_ (" 直至答复的开头和 ") " 答复的结尾。 如果最初没有查询, 请将查询中的“ &” 省去 。 多亏了格雷格・威廉姆斯
* 增加了许多新的统计数据。[每日报告](/docs/server-admin/additional-information#daily-report)。 。 。 。
* 在有数据集清单的网页上,机构和ID现在位于极右。 这将订阅和其他更有用的列移到窄的计算机屏幕上查看.
* 在所有网页上,页的标题(基于&lt;标题 &gt; 在&lt;启动您在设置. xml 中定义的headHtml &gt; , 以包含对网页的更好描述 (例如,列入当前数据集的标题和机构) 。 。 。 。
* Xmx信息现在包含在log.txt,The Daily Report,以及status.html上打印的内存信息中. 多亏了艾琳蒙哥马利
*   ERDDAP™具有防止所有错误的额外通用保护 (例如,出自记忆错误) 。 。 。 多亏了查尔斯·卡莱顿
* 如果已执行响应, 则改进错误处理 。
* 改进:从档案中提取的EDD表EDDGrid从Files开始,现在只允许&lt;元数据从 &gt; 第一个或最后一个。 倒数第二不再支持。 首先是最后的,现在是基于文件的最后修改时间。
* 错误修正: 在 EDD 表格中SOS,一个站点的无效信息抛出例外,导致整个数据集被拒绝. 现在,这些车站被忽略了 (而错误消息已被登录到log.txt) 。 。 。 。 多亏了里克・布莱尔
     

## 第1.18号版本{#version-118} 
 (2009-04-08年发布) 

* Bug fix:从1.14开始,EDDTable数据访问表和Make A Graph网页没有妥善处理引用的限制.
* Bug fix:从1.14开始,如果源时间单位不是"1970-01-01T00:00以来秒",EDDTable FromDapSequence没有正确处理时间限制.
     

## 第1.16号版本{#version-116} 
 (2009-03-26年发布) 

*   ERDDAP™管理员 :
    * 这是一个重要的释放,因为它修补了留下一个ERDDAP™如果使用Tomcat 管理器停止/ 启动或重新装入, 线索会运行ERDDAP。 。 。 所以,当你安装1.16的时候,不要仅仅使用Tomcat管理器来解除旧的部署.ERDDAP™部署新的ERDDAP。 。 。 。 相反: **不部署旧的ERDDAP™,重新启动Tomcat (或服务器) ,然后部署新的ERDDAP。 。 。 。** 在安装新版本时,这样做总是个好主意.
    * 请添加 [&lt;请求黑名单 &gt;&lt;/ 请求黑名单 &gt; (/docs/server-admin/datas# 请求黑名单) 给您的datasets.xml。 。 。 用于指定要封锁的客户端 IP 地址列表 (例如,抵挡拒绝服务攻击或过于狂热的网络机器人) 。 。 。 。
* 现在有一个\\[大家长会\\]/logs 目录以持有ERDDAP™日志文件。 当你开始ERDDAP™,它使log.txt和log的存档副本。 txt. 先前带有时间戳的文件. 如果重启前有问题,分析这些文件可能是有益的.
*   ERD因为ERDDAP™现在已打开订阅系统。
*   ERDDAP™再次允许 (但还是不建议) 请求 URL 中的 “% 26” 编码 (见[v1.14 相关变动](#percent26)) 。 。 。 。
* 报告Tally部分增加了几个新的内容。[每日报告](/docs/server-admin/additional-information#daily-report)。 。 。 。
* 小错误在生成 DatasetsXml 中修正 。
* 几小虫修习.
     

## 第1.14版 翻译{#version-114} 
 (2009-03-17年发布) 

* 用户更改 :
    * 在网格数据请求中,ERDDAP™现在支持:[最后一个 -n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)其中n是指数和[ (最后一个d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)其中d是一个数值 (时间,是数秒) 。 。 。 。
    * 在表格数据请求中,字符串限制现在需要[双引号](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)环绕数值,例如 &id=“NDBC40121” 这需要DAP协议。
    * 在表格数据请求中,ERDDAP™现在要求[所有限制都正确编码%](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode)。 。 。 浏览器自动这样做,因此这主要影响正在访问的计算机程序/标语ERDDAP。 。 。 。
#### 百分比26{#percent26} 
*   [先前,](#percent26)联合国[嵌入一个图表网页](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)页:1[ERDDAP™Google Gadget 网页](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)将图像的 URL 中的“ &” 替换为 “% 26 ” 。 从现在开始,您应该将图像的URL中的"(&)"替换为"(&amp;)". 因此,您需要将现有网页中的任何"% 26"和Google Gadgets替换为"&amp;". (对不起) 
*   ERDDAP™管理员请:
    * 将以下内容添加到您的[设置. xml](/docs/server-admin/deploy-install#setupxml)文件 (换旗 密钥值) 数字 :
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * 之后的线上&lt;电子邮件用户Name &gt; in your[设置. xml](/docs/server-admin/deploy-install#setupxml)文件,添加
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
输入您的密码。
    * 你可以改变&lt;wmsSampleBBox &gt; 在您体内[设置. xml](/docs/server-admin/deploy-install#setupxml)包含最多360个经度值的文件,例如,
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * 在你身边datasets.xml文件,将数据集类型 EDDTable 从Nc4DFiles 重命名为 EDDTable fromNcFiles (它现在支持任何维度的文件) 。 。 。 如果您有来自Nc4DFiles数据集的EDD表:
        
        1. 您必须在您的数据集中更改为“ EDDTable From NcFiles ” 。 XML 文件 。
        2. 您必须添加一个&lt;n dimensions &gt; (正数) 页:1&lt;/nDimensions &gt; 标记到数据集的XML.
        3. 你可以加入新内容&lt;排序 FilesBySourceNames &gt; 标记以指定文件的内部顺序,从而决定返回的数据的总体顺序。
        
详情见[来自文件的 EDD 表格](/docs/server-admin/datasets#eddtablefromfiles)。 。 。 。
    * 过去,对于EDD Table FromDapSequence, 用于OPeNDAPDRDS 服务器, 以datasets.xml我们用过&lt;源代码 Can 约束程序&lt;/SourceCanContractingStringRegex&gt; (英语). 但我们现在看到DRDS regex的支持比ERDDAP我们建议&lt;源代码 Can 约束规则&lt;/SourceCanControlinStringRegex&gt; 这样,regex的限制不会传递给源,而是由源处理ERDDAP。 。 。 。
    * 源头CanConstruction的更新处理... 输入datasets.xml由[来自 DapSequence 的 EDD 表](/docs/server-admin/datasets#eddtablefromdapsequence)和 (内部) 所有 EDDTable 数据集类型。 新系统更为简单,更好地反映了不同数据来源的可变性。 您可能需要修改您的数据集的 XML 。datasets.xml。 。 。 。
* 有一些新的特点,它们本身是有用的,但如果综合起来,也有利于创建。[网格/集群/联邦ERDDAP编号](/docs/server-admin/additional-information#grids-clusters-and-federations)。 。 。 。
    * 新的数据集类型 :
        *   [EDDGrid从埃尔达普](/docs/server-admin/datasets#eddfromerddap)和[来自Erddap的EDD表](/docs/server-admin/datasets#eddfromerddap)其中一个ERDDAP™包含从另一个数据集ERDDAP™以非常简单和高效的方式。
        *   [EDDGrid从文件](/docs/server-admin/datasets#eddgridfromfiles)  (及其下属,[EDDGrid从NcFiles调用](/docs/server-admin/datasets#eddgridfromncfiles)可读NetCDF .nc,GRIB grb,和HDF .hdf文件) 。 。 。 。
        *   [来自 NcFiles 的 EDD 表格](/docs/server-admin/datasets#eddtablefromncfiles)可读NetCDF .nc具有类似桌子的结构。
    * Run LoadDatasets 和 LoadDatasets 进行了修改,以便ERDDAP™能够对基于文件的重装数据集非常响应[旗帜](/docs/server-admin/additional-information#flag)目录(往往&lt;如果当前完成主负载Datasets,则5秒).
    * 允许的新服务[创建旗帜文件的 URL](/docs/server-admin/additional-information#set-dataset-flag)用于特定数据集,例如,
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
在旗帜目录中为 rPmelTao 创建旗帜文件 (虽然旗帜 这里的钥匙不对) 。 。 。 。
    * 新设[订阅](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)服务,以使任何客户端能够指定在创建特定数据集时将要采取的行动 (何时ERDDAP™重新启动) 当数据集发生任何变化时。 此系统可以通过&lt;订阅系统[设置. xml](/docs/server-admin/deploy-install#setupxml)文档。 那个ERDDAP™ [每日报告](/docs/server-admin/additional-information#daily-report)现在列出所有订阅, 包括取消每个订阅所需的 URL, 以防系统被滥用 。 内datasets.xml,有一个新的,可选 [&lt;订阅 电子邮件黑名单 &gt;] (/docs/server-admin/datasets#订阅邮件黑名单) 标记,以便管理员可以指定一个以逗号分隔的电子邮件地址列表,这些地址立即从订阅系统列入黑名单。
    * 新设 [&lt;更改 &gt; ] (/docs/server-admin/数据集#变更) 属性在datasets.xml让ERDDAP™管理员指定创建特定数据集时要完成的动作 (何时ERDDAP™重新启动) 当数据集发生任何变化时。
    * 对全文搜索的改进:存储每个数据集的搜索字符串现在使用内存的1/2. 搜索算法 (类似波尔摩尔的) 现在快3X。
    * 来自ERDDAP™主题和内容\\[错误 乌尔尔\\]以便你们知道,ERDDAP™这是从 (如果你管理多个ERDDAP编号) 。 。 。 。
    * 收集更广泛的统计数据[每日报告](/docs/server-admin/additional-information#daily-report)电子邮件。
    * 新建日志文件\\[大家长会\\]/电子邮件 LogYEAR-MM-DD.txt 登录所有发送的电子邮件ERDDAP™每天都这样 如果您的服务器无法发送电子邮件, 这尤其有用。 您可以在日志中读取这些邮件 。
    *   ERDDAP™现在做一个\\[大家长会\\]/缓冲/ (datasetID) 用于每个数据集的目录,因为可能缓存了大量文件。
* 新设[RSS2.01 电话](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)每个数据集的种子 (找那个橘子RSS在数据集列表、数据访问表单和 Make A Graph 网页上的图标) 。 。 。 。
*   EDDGrid .kml回复现在使用平板图像 ("超重叠"——动态生成的四面体图像) 。 。 。 最初的图像加载进入GoogleEarth的速度比以前快得多. 地图的分辨率随着你放大而增加,直到数据集的完全分辨率。 建议:用户应提出请求.kml但数据集是整个经度、纬度范围。 不幸的是,取消了对时间范围的支持 (我希望它会回来) 。 。 。 。
*   ERDDAP™现在添加[过期和缓存控制最大年龄信头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)到请求从/图像目录中获取的所有文件。 这将大大减少发送到的静态文件请求数量ERDDAP从而大大加快了ERDDAP™页面负载。 还有,很多Java脚本文件引用移动到 HTML 页面的底部,这也加快了许多ERDDAP™页面负载。 感谢史蒂夫·苏德斯的"高性能网站"一书以及FireFox中FireBug插件的ySlow添加.
*   ERDDAP™从netcdf-java 2.2.22转换为netcdf-java 4.0. 除其他外,这允许EDDGrid从 NcFiles 读取HDF .hdf,以及GRIB .grb和NetCDF .nc文档。
*   EDDGrid从 Dap 和EDDGrid现在从NcFiles也支持Darray (以及DGrid(英语:)  dataVariable编号 如果一个维度没有相应的坐标变量,ERDDAP™创建带有索引值的轴变量 (例如,0、1、2、...、311、312) 。 。 。 。 所以,所有其他方面EDDGrid保持不变:
\\* 它仍然服务于所有数据集作为格子,每个维的轴变量.
\\* 查询仍然可以从轴变量中请求值.
感谢查尔斯·卡莱顿,托马斯·伊姆,多里安·雷默等人.
* 那个WMS OpenLayers页面现在有一个默认的经度,纬度范围比数据集的范围大一点 (而不是精确的范围,所以小数据集的背景更明显) 。 。 。 默认范围现在也可能是0到360,这使得现在可以显示许多数据集的全部范围. 感谢Todd斯宾德勒
* 在一些数据访问表格上新建幻灯片并制作图表网页。 他们简化 (粗体) 说明所希望的数据并提供良好的视觉反馈。
* 用于&lt;数据集 &gt; 标记在datasets.xml数字 :[活动=“虚假”](/docs/server-admin/datasets#active)。 。 。 。
* 参考资料ERD因为ERDDAP™更改自 Coastwatch.pfel 。 (仍然通过代理工作) 到海岸观测站. pfeg (首选项) 。 。 。 。
* 新的支持[data\\_min和data\\_max](/docs/server-admin/datasets#data_min-and-data_max)变量元数据属性。
* 部分解决[等待然后再次尝试/ 部分结果例外](/docs/server-admin/additional-information#waitthentryagain-exception)数字 : 现在,一些先前在检测到数据源变化时失败的请求将会成功,因为ERDDAP™将重新装入数据集并自动重新请求数据,所有数据都是在原始请求的上下文中。
* 错误修正: 生成 数据集 Xml 已禁用于ERDDAP™第1.12版. 多亏了Ellyn Montgomery指出这一点.
* 对错误处理的小改动 。
* 避免/处理可能的种族条件的许多改进 (即,由于多线性的性质,可能出现问题。ERDDAP) 这导致了小的,不常见的问题。
* 现在,如果一个错误消息写在图像上,图像只会在缓存中停留~5-10分钟. (不是60个) 。 。 。 。 多亏了卡拉·威尔逊
* 没有数据时的标准消息现在是"您的查询没有产生匹配结果",它更短,更准确,匹配OPeNDAP服务器。
*   EDDGrid不再允许绑定轴值。
* 对.ver和.help请求的小改动.
* 许多小改变和错误修正.
     

## 第1.12号版本{#version-112} 
 (2008-10-31发布) 

* 从 EDD 表格SOS再次与NDBC合作SOS与新的NOS合作SOS。 。 。 。
* BMDE 的 EDD表现在需要ERDDAP™要指定的管理员dataVariable编号
*   EDDGrid不再要求Lat和Lon保持平衡 透明  P或.kml。 。 。 。 感谢Todd斯宾德勒
* 几微变化.
     

## 第1.10号版本{#version-110} 
 (2008-10-14年发布) 

* 新建数据变量的“ colorBar” 元数据datasets.xml定义图形和地图的默认颜色栏设置。 见[更多信息](/docs/server-admin/datasets#color-bar-attributes)。 。 。 这一点很重要,因为它大大改进了Make A Graph制作的默认图和地图的外观,并且因为默认图和地图现在即使客户端更改了请求的时间或地理范围,也有一个一致的颜色栏. 而且,这对于WMS。 。 。 。
*   ERDDAP™现在通过一个WMS服务。 这一点很重要,因为它表明,除了从许多类型的数据服务器获取数据外,ERDDAP™可以通过不同的协议分发数据 (DAP, (中文).WMS,... 更多的未来) 。 。 。 。 见[客户端文档](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html)。 。 。 。 或者说[管理员的文档](/docs/server-admin/datasets#wms)。 。 。 。 或者说[试试看](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html)。 。 。 。
* 经度值大于180的新支持.kml文档。
* 新的 cdm\\_data\\_ type: 其他.
*   ERDDAP™现在支持"boolean"源数据Type. 见[更多信息](/docs/server-admin/datasets#boolean-data)这将对未来数据库中的EDDTable有用。
* 新的EDDTable FromBMDE支持DiGIR/BMDE数据源.
* EDVGridAxis现在允许降序排序值. Pmeloscar数据集需要这个
*   ERDDAP™现在返回 HTTP 错误 (例如,“404用于未找到的资源/页面”) ,而不是带有错误信息的 HTML 页面。
* 更改/添加到ERDDAP™文档。
* 很多小改变。
* 一些错误修正。
*    **东西ERDDAP™管理员应该做升级到这个版本:** 
    * 内datasets.xml,用于任何 EDD 表格SOS数据集,将"obServateProperty"元数据改为"sourceObServateProperty".
    * 规则:axisVariable或dataVariable因为destinationName现在[更严格](/docs/server-admin/datasets#datavariable-addattributes)。 。 。 您需要检查您的变量名称是否有效 。 要么亲手检查,要么逃跑ERDDAP™,并查看报告中发往管理员的错误消息。
    * 内datasets.xml,如果您想要通过WMS,需要添加颜色Bar元数据。 至少,比如说,&lt;名称="colorBarMinimum"类型="双"&gt;0&lt;/att &gt; (单位:千美元)
```
          <att name="colorBarMaximum" type="double">32</att>  
```
见[更多信息](/docs/server-admin/datasets#wms)。 。 。 。
    * 将以下内容添加到您的[设置. xml](/docs/server-admin/deploy-install#setupxml)文件 (但用您的信息自定义它) 数字 :

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## 版本1.08{#version-108} 
 (2008-07-13年发布) 

* 一个新的网络服务ERDDAP™生成 数据集 Xml, 协助ERDDAP™管理器通过创建描述 XML 数据集所需的粗略草稿datasets.xml
* 一些与允许网格dap被netcdf-java视为开源服务器相关的修改/bug修正,包括: 全球元数据现在被标记为"NCQQGLOBAL". (而不是"GLOBAL" 。) 。 。 。 。
* 那个EDDGrid和 EDDTable 数据访问表现在使用URL中的查询信息。 因此,例如,如果一个用户从一个 Make A Graph 表格到一个数据访问表格,这些限制现在被适当转移.
*   tabledap“ Make A Graph” 现在允许限制字符串变量 。
* EDDTable's Make A Graph 现在允许纳恩限制。 多亏了史蒂夫·汉金
* 错误修复: EDD 表格保存 图像没有正确识别 .colorbar min 和最大值。 多亏了史提夫汉金
* 许多改进设置DatasetsXml. 多亏了艾琳蒙哥马利
* 网络请求现在允许 () - 样式请求略超出实际轴范围。 这是适当的,因为 () - 数值四舍五入到最接近的实际值。 多亏了辛迪·贝西
* 我让浮射箭和双射箭测试 更加精密。 永远不完美 (因为测试需要为每个数据集定制) 但应该更好 多亏了艾琳蒙哥马利
* 我移动了设置.html和设置Datasets Xml.html erddap的/download目录和硬编码了它们的所有链接. 现在,我可以做出改变 并立即更新 设置信息。
* 许多小变化. 几小虫修习.
*    **东西ERDDAP™管理员应该做升级到这个版本:** 
    * 移动&lt;快速描述 从您的消息. xml 到您的[设置. xml](/docs/server-admin/deploy-install#setupxml)文档。 它指定了出现在左侧中间的文字。ERDDAP™主页. 加上&lt;h1 &gt; (韩语)ERDDAP&lt;/h1&gt; (韩语). (或其它标题) 至其顶. **或者说** 复制&lt;新建中描述Html[设置. xml](/docs/server-admin/deploy-install#setupxml)文件 (从新的 erddap 环境.zip) 进入您的设置. xml.
         

## 第1.06号版本{#version-106} 
 (2008-06-20年发布) 

* 新的支持IOOS DIF SOS数据来源。
* 许多小变化. 几小虫修习.
     

## 第1.04版 (中文(简体) ).{#version-104} 
 (2008-06-10 (中文(简体) ).) 

* 新建幻灯片浏览器功能 。
* 新建 Google Gadgets 页面和示例.
* 错误修复EDDGridsaveAsNc 用于带有缩放和添加Offset的变量。
     

## 第1.02版 (英语).{#version-102} 
 (2008-05-26发布) 

* 新设EDDGrid边框允许不同的axisVariable编号\\[0 个\\]来源 价值.
* 所有对流和风力数据集合并为EDDGridSideBySide的数据集.
* 来自图像请求的图像现在被缓存1小时.
     

## 第1.00号版本{#version-100} 
 (2008-05-06年发布) 

* 在 URL 中创建图形网页和图形命令。
* 支持旗舰文件强制重装数据集 。
* 新数据集类型: EDD Table From 4DFiles (来自文件的 EDD Table 的第一个子类) 。 。 。 。
