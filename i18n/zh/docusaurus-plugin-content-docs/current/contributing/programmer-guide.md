---
sidebar_position: 2
---

# 程序员指南

这些只是程序员想配合的 ERDDAP 因为 Java 课堂需要知道。

###  **获取源代码**  {#getting-the-source-code} 
   

  - GitHub 上的 Via 源代码
近期公开版本和开发中版本的源代码也可通过下列途径获取: [GitHub 图像](https://github.com/ERDDAP) 。 。 。 。 请读一下 [维基](https://github.com/ERDDAP/erddap/wiki) 为这个项目。 如果您想要修改源代码 (并可能将修改纳入标准 ERDDAP™ 分发) ,这是建议的方法。

###  ** ERDDAP™ 依赖关系**  {#erddap-dependencies} 
 ERDDAP™ 使用 Maven 来装入代码依赖以及一些静态引用文件 (WEB-INF/ ref (英语).) 。 。 。 这是为了避免在寄存器中存储许多大文件.
你可以用来 `mvn 编译` 这将获取依赖和校对文件。 您还可以使用 `mvn 软件包` 生成战争文件。
您可以手动下载参考文件 :

  -  [etopo1\\_ice\\_g\\_i2 .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip) 并解析为/WEB-INF/ref/.

  -  [参考文件 .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip) 并解析为/WEB-INF/ref/.

  -  [erddap 组件 .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip)   (1.0.0,2033字节,MD5=2B8D2A5AE5ED73E3A42B529C168C60B5,日期为2024-10-14) 并将其解析为 _tomcat_,创建 _tomcat_/content/erddap 。 。 。 。

注:默认情况下,Maven会缓存静态引用和测试数据存档下载,仅在下载新版本时才提取. 要跳过全部下载, 您可以设置 `跳过资源下载` 和(或) `跳过测试资源下载` 属性到 Maven (譬如说. `mvn - Dskip 资源下载包` ) 。 。 。 。 要强制提取, 设置 `- 卸载量。 unpack= true` 和 `- Ddownload.unpack 当变化=虚假` 。 。 。 。

-  ERDDAP™ 及其子组件具有非常宽松,开源 [许可证](/license) ,这样你就可以为任何目的使用和修改源代码,无论是盈利还是非营利. 请注意: ERDDAP™ 并且许多子组件拥有许可证,需要您确认您使用的代码来源。 见 [贷项](/credits) 。 。 。 无论是否需要,承认所有这些贡献者只是好的形式。
  

-  **对其它项目使用代码** 

欢迎您使用 ERDDAP™ 用于其他工程的代码,警告该代码可以并且将会改变。 我们不承诺支持我们代码的其他用途. Git 和 GitHub 将是您处理这个问题的主要解决方案 -- Git 允许您将我们的更改合并到您的更改中。
   **在很多情况下,你可能会 试图使用部分 ERDDAP™ 在你的工程中,我们认为你会发现 安装和使用更容易 ERDDAP™ 同样,** 然后写其他使用 ERDDAP 服务。 你可以自己设 ERDDAP™ 在一两个小时后就安装了 你可以自己设 ERDDAP™ 几天后以抛光方式安装 (取决于数据集的数量和复杂程度) 。 。 。 。 但是,黑进部分 ERDDAP™ 可能要花上几周时间 (和数月捕捉微妙) 然后您将失去后续修改和错误修正的能力 ERDDAP™ 释放 我们 (很明显) 认为使用 ERDDAP™ 也让你 ERDDAP™ 安装可公开访问。 然而,在某些情况下,你可能不想做你的 ERDDAP™ 安装可公开访问。 那么,你的服务可以进入和使用你的私人 ERDDAP™ 你的客户不需要知道 ERDDAP™ 。 。 。 。

  ####  **半径** 

或者,还有一种方法,你可能会发现有用 在探索之间 ERDDAP 代码和使用 ERDDAP™ 作为一个独立的网络服务: 在EDD 类中,有一个静态方法,可以让你制作一个数据集实例 (基于 datasets.xml ) 数字 :
'一个来自数据集' xml 数据 (字符串 tDatasetID) 
返回 EDD表或 EDDGrid 数据集。 既然如此,你可以打电话
“ make NewFileForDap查询 (字符串用户DapQuery、字符串目录、字符串文件Name、字符串文件 类型Name) 
`让实例制作特定文件的数据文件Type,并附上用户查询的结果。 因此,这是一个简单的使用方式 ERDDAP 正如客户端会使用 ERDDAP™ 网络应用程序。 但是这个方法在你的 Java 程序并绕过像Tomcat这样的应用程序服务器的需要. 我们在EDD Table和 EDDGrid 子类,所以您可以在源代码中看到所有这些类的例子。

###  **发展环境**  {#development-environment} 

  - 有配置用于 [洁蒂,你好吗?](https://github.com/ERDDAP/erddap/blob/main/development/jetty) 和 [插头](https://github.com/ERDDAP/erddap/blob/main/development/docker) 在GitHub中,虽然预计发布会运行在Tomcat中.

  -  **可选** 数字 : 设置 ERDDAP™ 在汤姆卡特
从 ERDDAP™ 我们强烈建议你们遵守标准 [安装指令](/docs/server-admin/deploy-install) 安装Tomcat,然后安装 ERDDAP™ 在Tomcat的网络应用目录中。 除其他事项外, ERDDAP™ 被设计为安装在Tomcat的目录结构中,并期望Tomcat提供一些.jar文件.

  -  ERDDAP™ 不需要特定的IDE (Chris主要使用Visual Studio代码,Bob使用EditPlus) 。 。 。 我们不使用Eclipse、Ant等;我们也不提供 ERDDAP - 与他们相关的支持。 工程确实使用了马文.

  - 我们使用一个批量文件删除源树中所有 . class 文件,以确保我们有一个干净的编译 (带Javac) 。 。 。 。

  - 目前我们使用领养的javac jdk-25.0.1+8来编译gov.noaa.pfeg.coastwatch.Testall. (它有链接到几个类,否则不会编译) 并进行测试。 出于安全考虑,几乎总是最好使用最新的版本。 Java 25和汤姆卡特10。

    - 当运行 javac 或 java 时, 当前目录为 _tomcat_/webapps/erddap/WEB-INF 。

    - 我们的Javac和Java阶级是
       `类;./././lib/servlet-api.jar;lib/*` 

    - 所以,你的Javac指挥线 会是类似的东西
       `javac - 编码 UTF-8 - cp 类;././lib/servlet-api.jar;lib/* 类/gov/noaa/pfel/coastwatch/TestAll.java` 

    - 你的Java指挥线会像...
`java-cp班;./././lib/servlet-api.jar;lib/*-Xmx4000M-Xms4000M /政府/noaa/pfel/海岸监视/试验
       `可选:您可以添加` - 动词:gc`,它告诉 Java 打印垃圾收集统计数据。

    - 如果测试 所有编译,一切 ERDDAP™ 已经汇编了需求。 几门课是编的 不需要用于 ERDDAP™ 。 。 。 如果编译TestAll成功,但不编译一些类,那类就不需要了. (有一些未完成/未使用的课程。) 

  - 在少数情况下,我们使用第三方源代码而不是.jar文件 (特别针对 DODS ) 并稍作修改,以避免出现与 Java 25. 我们经常作出其他微小修改。 (目标 DODS ) 由于其他原因。

  - 大多数班级在其相关的src/test文件中都有测试方法. 您可以使用 `mvn 测试` 命令。 这将下载从最近发布的测试中依赖的数个数据zip文件 [ ERDDAP /埃尔达普 测试](https://github.com/ERDDAP/erddapTest/releases/) 。 。 。 。 。
     
注:Maven缓存下载,但会解析每次执行中下载的档案,这需要时间。 跳过下载
中,您可以指定 `跳过测试资源下载` 属性到 Maven (譬如说. `mvn - Dskip 资源测试软件包` ) 。 。 。 。

###   **重要类**  {#important-classes} 

如果你想看看源代码 并试图找出如何 ERDDAP™ 工作,请。

  - 密码有 Java 医生评论,但 Java 医生还没有生成。 自由产生它们吧

  - 最重要的班级 (包括以下所述) 在政府/noaa/pfel/erddap范围内。

  - 那个 ERDDAP™ 类有最高级别的方法。 它扩展了HttpServlet.

  -  ERDDAP™ 将请求转到以下类别: EDDGrid 或 EDD表,代表单个数据集。

  - EDStatic 拥有大部分静态信息和设置 (例如,从设置.xml和消息.xml文件) 并提供静态服务 (例如,发送电子邮件) 。 。 。 。

  -  EDDGrid 和 EDDTable 子类解析请求,从子类特定方法获取数据,然后为响应格式化数据.

  -  EDDGrid 子类将数据推入 GridData 访问器 (网格数据的内部数据容器) 。 。 。 。

  - EDDTable子类将数据推入TableWriter子类,这些子类将数据写入一个特定的文件类型上飞.

  - 其他课程 (例如,低级班级) 也是很重要的,但你不太可能 努力改变它们。
     

###  **代码贡献**  {#code-contributions} 

- GitHub 问题
如果您愿意贡献但没有项目,请参见列表 [GitHub 问题](https://github.com/ERDDAP/erddap/issues) ,其中许多都是你可以承担的项目。 如果你想就一个问题开展工作,请自行指定,向其他人表明你正在研究的问题。 GitHub问题是讨论任何问题的最佳场所,以便开展有关该问题的工作。

- 若您想做出改变, [GitHub 问题](https://github.com/ERDDAP/erddap/issues) 表示您打算作出的更改。 然后,一旦修改完成,就发出拉动请求,请求合并. 共同变化包括:

  - 您想要写另一个子类 EDDGrid 或 EDD Table 处理另一个数据源类型。 如果是这样,我们建议你们找到最接近的现有子类,并使用该代码作为起点.

  - 您想要写入另一个保存 As_ FileType_ 方法 。 如果是的话,我们建议您在其中找到最近的保存 As_ FileType_ 方法 EDDGrid 或 EDD Table 并使用该代码作为起点。

这些情形的优点是 你写的代码是自成一体的 你不需要知道所有细节 ERDDAP '内经曰. 我们很容易把密码输入 ERDDAP 。 。 。 请注意,如果您确实提交了代码,许可证需要与该代码兼容。 ERDDAP™   [许可证](/license)   (例如, [阿帕奇语Name](https://www.apache.org/licenses/) , (中文). [BSD 软件](https://www.opensource.org/licenses/bsd-license.php) ,或 [麻省理工学院-X](https://www.opensource.org/licenses/mit-license.php) ) 。 。 。 我们将列出你的贡献 [贷方](/credits) 。 。 。 。

- 如果您有一个上面没有覆盖的特征,您希望添加到 ERDDAP ,建议首先在 [GitHub 讨论](https://github.com/ERDDAP/erddap/discussions/categories/ideas) 。 。 。 对于重大特点/改变,技术委员会将讨论这些特点,并决定是否核准将其添加到 ERDDAP™ 。 。 。 。

###  **判断您的代码贡献**  {#judging-your-code-contributions} 
如果您想要提交要包含在其中的代码或其他修改 ERDDAP 这是伟大的。 你的贡献必须符合某些标准才能被接受。 如果你遵循以下准则,你将大大增加你的贡献被接受的机会。
   

  - 那个 ERDDAP™ 项目由NATD管理 ( NOAA 任命的技术主任) 由技术委员会提供投入。
从2007年起 (开始 ERDDAP ) 2022年,鲍勃・西蒙斯 (也是创始人-领导者) 。 。 。 从2023年1月开始,这就是克里斯·约翰. 基本上,NATD负责 ERDDAP ,所以S/他对决定有最后的发言权 ERDDAP™ 代码,尤其是关于设计以及是否接受给定的拉动请求。 一定是因为效率的原因 (这对Linus Torvalds和Linux很有用) 部分出于安全原因: 必须有人告诉IT安全人员 他/他负责代码的安全性和完整性.
     

  - NATD不能保证他接受你的代码
如果一个项目没有如我们所希望的那样成功 如果无法挽救的话 NATD就不会把该项目列入 ERDDAP™ 分发。 请不要感到难过。 有时项目会不尽如人意 它发生在所有软件开发者身上. 如果你遵循以下准则,你就会大大增加成功的机会.
     

  - 如果这些变化具有普遍的利益和效用,那是最好的.
如果代码是您的组织特有的, 最好保持一个单独的分支 ERDDAP™ 供你们使用。 Axiom这样做。 幸运的是,吉特让这件事变得容易了. NATD希望保持对 ERDDAP ,不允许它成为一个厨房水槽项目,每个人都在其中为其项目添加一个定制的特性.
     

  - 跟着 Java 《守则公约》。
一般来说,你的代码应该质量好,应该遵循原来的 [ Java 守则公约](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf) : 将. class 文件放在目录结构的适当位置, 给. class 文件一个适当的名称, 包括 proper Java Doc 注释,在代码的每一段开头包含//注释,缩进4个空格 (没有标签) ,避免行 &gt;80字符等. 传统改变, 源代码并不总是完全更新。 当出现疑问时,将代码与公约而不是现有的代码相匹配。

- 使用描述类,方法和可变名称.
这让其他人更容易阅读代码.
   

- 避免奇异的代码。
从长远来看,你或其他人必须找出代码才能维持. 所以,请使用简单的编码方法,这样对其他人更容易 (包括你的未来) 找出来。 很明显,如果有真正的优势 使用一些花哨 Java 编程功能,使用它,但大量记录你做了什么,为什么,以及它是如何工作的.
   

- 在你开始之前跟技术委员会合作
如果你想让您的代码更改进入 ERDDAP™ 技术委员会绝对会想在修改代码之前 谈谈你要做什么和怎么做 这样我们就可以避免你做出NATD最终不接受的改变. 在你做这项工作时,NATD和技术委员会愿意回答问题,以帮助你找出现有的代码和 (总计) 如何解决您的项目。
   

- 独立工作 (尽可能多) 你开始后
与上述"与技术委员会合作"相对,在项目开始后,NATD鼓励您尽可能独立工作. 如果NATD要告诉你几乎所有的事情 回答很多问题 (特别是那些你可以通过阅读文档或代码来回答的) 那样你的努力就不是 NATD的节省时间了 他也可以自己做 这是 [神话人物月](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) 问题。 当然,我们还是应该沟通。 最好能定期看到你的工作进展,以确保项目走上正轨。 不过你越能独立工作 (在技术委员会商定手头的任务和一般办法之后) - 越好越好
   

- 避开虫子。
如果一个错误在发布前没有被抓住,会对用户造成问题 (最多不过) ,返回错误的信息 (最糟的时候) ,是一个blot上 ERDDAP 名声远扬 将持续过时 ERDDAP™ 设施使用年限。 十分努力地避免虫虫. 一部分是写干净的代码 (所以更容易看到问题) 。 。 。 这部分是写作单位测试. 其中一部分是写代码时对避虫的恒定态度. 不要让NATD后悔 加上你的代码 ERDDAP™ 。 。 。 。
   

- 写出单位测试或测试.
对于新代码,您应该在测试文件中写入JUnit测试.
请至少写出一种个体测试方法, 彻底测试您所写的代码, 并将其添加到类的“ JUnit” 测试文件中, 以便自动运行 。 单位 (及有关事项) 测试是捕虫的最好方法之一 首先,从长远来看 (随着其他事物的变化 ERDDAP™ ) 。 。 。 正如鲍勃所说, "单位测试让我晚上睡觉。"
   

- 让NATD容易理解并接受你拉力请求中的变动.
其中一部分是写一个单位测试方法 (编号) 。 。 。 其中一部分是限制您修改代码的一节 (或一个类别) 如果可能的话。 NATD不会接受任何拉动请求,在整个代码中会有数百个修改. NATD告诉IT安全人员,他/他负责代码的安全性和完整性. 如果有太多的改变或者它们太难想出,那么就很难核实这些改变是正确的,并且不要引入错误或安全问题.
   

- 简单点
你代码的一个好的总主题是:保持简单. 简单的代码对其他人来说很简单 (包括你的未来) 阅读和维护。 NATD很容易理解从而接受.
   

- 承担你代码的长期责任
从长远来看,你最好承担持续的责任 维持你的代码,回答关于它的问题 (例如, ERDDAP™ 谷歌集团) 。 。 。 正如一些作者指出,代码既是负债也是资产。 如果将来发现一个虫子,最好还是把它修好 因为没有人比你更了解你的密码 (也是为了防止虫子出现) 。 。 。 NATD并不是要求坚定承诺提供持续的维护. NATD只是表示,做维修工作会非常感激.
