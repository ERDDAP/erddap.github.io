---
sidebar_position: 4
---
ERDDAP™- 摆平你自己ERDDAP™    

## 你该知道的事{#things-you-need-to-know} 
     
###    **[代理错误](#proxy-errors)**  {#proxy-errors} 
有时,要求ERDDAP™将返回代理错误、 HTTP 502 坏网关错误或一些类似的错误。 这些错误被Apache或Tomcat抛出,不是ERDDAP™它本身。
* 如果每个请求都产生这些错误, 特别是当你第一次设置您ERDDAP™,那么它可能是一个代理或坏的网关错误, 解决方案可能是修复[ERDDAP代理设置](/docs/server-admin/deploy-install#proxypass)。 。 。 这一点也可能是:ERDDAP™突然开始为每一个请求抛出这些错误.
* 否则,"代理"错误通常实际上就是Apache或Tomcat抛出的超时错误. 即使它们发生得比较快 也是阿帕奇或汤姆卡特的反应ERDDAP™十分繁忙,内存有限,或受到其它资源的限制. 在这些情况下,见下文关于处理下列情况的建议:[ERDDAP™慢慢反应](#responding-slowly)。 。 。 。
        
长期请求 (&gt; 30 个时间点) 从网格化的数据集中容易出现超时故障,这些故障经常作为代理错误出现,因为它需要相当长的时间才能实现ERDDAP™以打开所有数据文件。 若为ERDDAP™在请求期间,由于工作繁忙,问题更有可能发生。 如果数据集的文件被压缩,问题更有可能发生,尽管用户很难确定数据集的文件是否被压缩.
解决办法是提出几个请求,每个请求的时间范围较小。 时间范围有多小? 我建议从小开始 (~30时间点?) ,则 (大约) 在请求失败前将时间范围翻倍, 然后返回一个加倍 。 那就做所有的请求 (每一段不同的时间) 需要获得所有数据。
一个ERDDAP™管理员可以通过增加[Apache 超时设置](/docs/server-admin/deploy-install#apache-timeout)。 。 。 。
        
### 监测{#monitoring} 
我们都希望我们的数据服务 找到他们的受众和被广泛使用, 但有时你ERDDAP™可能会被使用过多,造成问题,包括对所有请求的反应超慢。 我们避免问题的计划是:

* 监视器ERDDAP™通过[状态.html网页](#status-page)。 。 。 。
它拥有大量有用的信息。 如果您看到大量请求正在出现,或者正在使用吨内存,或者数以吨计的失败请求,或者每个重载Datasets少校要花很长时间,或者看到任何事物被困在下方并缓慢响应的迹象,请查看ERDDAP因为[日志.txt 文件](#log)以观其事.
    
简单地指出状态页的反应速度有多快也是有用的. 如果反应缓慢,这是一项重要指标:ERDDAP™忙着呢
    
* 监视器ERDDAP™通过[每日报告](#daily-report)电子邮件。
     
* 注意通过 *基数Url* /erddap/outOfDateDatasets.html基于可选的网页[testOutOfDate](/docs/server-admin/datasets#testoutofdate)全球属性。
     
#### 外部监视器{#external-monitors} 
上述方法如下:ERDDAP自我监控的方法 也可以制作或使用外部系统来监视您ERDDAP。 。 。 。 一个计划就是[Axiom 的计量工程](https://github.com/axiom-data-science/erddap-metrics)。 。 。 这种外部系统有一些优点:
* 它们可以被定制以提供您想要的信息,以您想要的方式显示.
* 它们可以包括下列信息:ERDDAP™那个ERDDAP™无法轻易或完全访问(例如,CPU的使用,磁盘自由空间,ERDDAP™从用户角度来看,反应时间,ERDDAP™起床时间,
* 他们可以提供警报 (电子邮件、电话、短信) 当问题超过某个阈值时, 给管理员。
             
### 多个同时 请求{#multiple-simultaneous-requests} 
*    **黑名单用户同时提出多个请求&#33;** 
如果某些用户显然在重复和连续地同时提出不止一个请求,那么就将其IP地址添加到ERDDAP'是[&lt;请求黑名单 &gt;] (/docs/server-admin/datas# 请求黑名单) 在你身边datasets.xml文档。 有时请求都是来自一个IP地址. 有时它们来自多个IP地址,但很明显是同一个用户. 也可以将提出数吨无效请求或数吨心智低效请求的人列入黑名单.
    
然后,对于他们提出的每一项请求,ERDDAP™返回:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
希望用户会看到这个消息并联系你,找出如何解决问题并脱离黑名单. 有时,他们只是切换IP地址,再试一次.
    
这就像战争中进攻性和防御性武器之间的力量平衡。 在这里,防御武器 (ERDDAP) 具有固定容量,受CPU中芯数,磁盘访问带宽,网络带宽的限制. 但进攻性武器 (用户,特别是脚本) 具有无限容量:
    
    * 单个请求从许多时间点获取数据可能会引起ERDDAP打开大量文件 (顺序或部分多线程) 。 。 。 在极端情况下,一个“简单”请求可以很容易地将所附RAID捆绑起来。ERDDAP™一分钟,有效阻止处理其他请求。
         
    * 单项请求可能消耗大量内存 (虽然ERDDAP™以最小化处理大请求所需的内存) 。 。 。 。
         
    * 平行 - 怎么样?
一个聪明的用户很容易通过生成大量线程来并行一个大任务,每个线程都会提交单独的请求 (大小) 。 。 。 这个行为受到计算机科学界的鼓励,作为处理大问题的有效方法. (在其他情况下,平行是有效的) 。 。 。 回到战争类比:用户可以提出基本上无限数量的同时请求,每个请求的费用基本上为零,但每个请求的费用都进入ERDDAP™能够很大,ERDDAP反应能力是有限的。 显然,ERDDAP™将会输掉这场战斗 除非ERDDAP™管理员黑名单用户同时提出多个请求, 不公平地排挤其他用户 。
         
    * 多个脚本 -
现在想想,当有好几个聪明的用户 每一个运行平行的脚本时,会发生什么。 如果一个用户能生成如此众多的请求,以至于其他用户挤出,那么多个这样的用户就能生成如此众多的请求,以至于ERDDAP™变得不堪重负 似乎没有反应 它实际上是一个[DDOS攻击](https://en.wikipedia.org/wiki/Denial-of-service_attack)再说一遍 唯一的辩护人ERDDAP™黑名单用户同时提出多个请求,不公平地排挤其他用户。
         
    * 膨胀的期望
在这个大型技术公司的世界里 (亚马逊 谷歌 Facebook...) ,用户开始期望供应商基本上拥有无限的能力. 由于这些公司是赚钱经营,用户越多,就越需要增加收入来扩大信息技术基础设施. 这样他们就可以买得起一个庞大的IT基础设施来处理请求. 他们巧妙地限制用户的每项请求的数量和成本,限制用户可以提出的各类请求,使任何单一请求都无法负担,从没有任何理由 (或一种方式) 用于用户同时提出多个请求。 因此,这些巨大的技术公司拥有的用户可能远远多于ERDDAP™,但它们拥有大量更多的资源和巧妙的方法来限制每个用户的请求. 对大型IT公司来说,这是可以控制的 (他们发财了&#33;) 但不是为了ERDDAP™设施。 再说一遍 唯一的辩护人ERDDAP™黑名单用户同时提出多个请求,不公平地排挤其他用户。
         
    
所以用户:不要同时提出多个请求,否则会被列入黑名单&#33;
     

显然,如果你的服务器 有很多核心,很多内存,那最好 (这样你就可以分配很多内存ERDDAP™比它需要的还要多) ,以及高带宽互联网连接。 然后,内存很少或永远不是一个限制因素,但网络带宽成为更常见的限制因素. 基本上,随着越来越多的同时请求,任何给定用户的速度都会降低. 如果每个用户只是一次提交一个请求,这自然会减少收到的请求数量。
    
### ERDDAP™从 THREDDS 获取数据{#erddap-getting-data-from-thredds} 
狦ERDDAP™从您网站的 THREDDS 获取一些数据, 将 THREDDS 数据文件复制出来有一些好处 。 (至少最受欢迎的数据集) 在另一个RAID,ERDDAP™能够进入ERDDAP™可以直接服务文件的数据。 时ERD我们这样做是为了我们最流行的数据集。

*   ERDDAP™可以直接获得数据,而不必等待THREDDS重新装入数据集或.
*   ERDDAP™可以立即注意到并输入新的数据文件,因此它不需要经常捕虫THREDDS来查看数据集是否已经改变. 见[&lt;更新EveryNMILIS &gt; (/docs/server-admin/datas#update Everynmilis / 服务器/数据集) 。 。 。 。
* 负载由2个RAIDS和2个服务器分担,而不是两个服务器都很难要求ERDDAP™和THREDDDS。 和THREDDS。
* 你避免了THREDDS小的不匹配问题 (默认) 最大请求大小。ERDDAP™有一种系统可以处理不匹配,但避免问题更好。
* 你有一个备份的数据副本 这总是一个好主意。

无论如何,不要运行THREDDS和ERDDAP™在同一个Tomcat。 在单独的Tomcats上运行,或者更好,在单独的服务器上运行.

我们发现,THREDDS 定期得到的状态 请求只是悬浮。 狦ERDDAP™正在从THREDDS获取数据 而THREDDS是在这个状态,ERDDAP™有个辩护人 (它说基于THREDDS的数据集是没有的) 但它仍然是麻烦的ERDDAP™因为ERDDAP™每次尝试从挂载的 THREDDS 重新装入数据集时,必须等待超时。 一些团体 (包括ERD) 通过频繁主动重启 THREDDS 来避免这种情况 (例如,在夜间工作) 。 。 。 。

### 慢慢反应{#responding-slowly} 
*    **若为ERDDAP™正在缓慢响应** 或者如果只是某些请求 反应缓慢,
你也许可以找出慢速是否合理和暂时 (例如,由于许多来自脚本的请求或WMS用户) 或者,如果某件事是 不可解释的错误,你需要[关闭并重新启动Tomcat和ERDDAP™](#shut-down-and-restart)。 。 。 。
    
若为ERDDAP™反应缓慢,请参看下面的建议来确定原因,希望这将使你能够解决问题。
你可能有一个具体的起点 (例如,特定请求 URL) 或模糊的起点 (例如,ERDDAP™缓慢) 。 。 。 。
你可能知道这个用户 (例如,因为他们发邮件给你) 或无.
你可能还有其他线索,或者没有。
由于所有这些情况以及所有可能的问题起因都模糊不清,下面的建议试图处理所有可能的起点和与反应缓慢有关的所有可能的问题。
    
    *    **寻找线索[ERDDAP日志文件](#log)**   ( *大家长会* /logs/log.txt (英语).) 。 。 。 。
        \\[在罕见的场合,有线索在[Tomcat 日志文件](#tomcat-logs)  ( *移动猫* /日志/目录。) 。 。 。 。\\]  
查找错误消息 。
寻找大量来自一个的请求 (或几个) 用户或可能占用您服务器的大量资源 (内存、 CPU 时间、 磁盘访问、 互联网带宽) 。 。 。 。
        
如果有麻烦的话 **一个用户** ,您常常可以通过网络服务获取关于用户身份的线索,例如:[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)可以提供用户IP地址相关信息 (您可以在ERDDAP因为[日志.txt](#log)文件) 。 。 。 。
        
        * 如果用户似乎是一个 **机器人** 表现不好 (特别是搜索引擎试图填写ERDDAP™包含每个可能的输入值的窗体) 中,确保您已正确设置您的服务器[机器人.txt](#robotstxt)文档。
        * 如果用户似乎是一个 **脚本 (编号) ** 正在同时进行多个请求,联系用户,解释您ERDDAP™资源有限 (例如内存、CPU时间、磁盘访问、互联网带宽) ,请他们考虑其他用户,一次提出一个请求。 你也可以提到,如果他们不退缩,你将会列入黑名单。
        * 如果用户似乎是一个 **脚本** 制作大量耗时的请求,请用户通过稍稍暂停来考虑其他用户 (2秒钟?) 在请求之间的脚本中。
        *    **WMS客户端软件** 可能会要求很高 一个客户端经常一次要求6个定制图像. 如果用户似乎是一个WMS您可以:
            * 别管它。 (被推荐了,因为他们很快就要行动了) 
            * 关闭您的服务器WMS服务通过ERDDAP's setup.html file. [永久失效連結] (中文(简体) ). (未建议) 
        * 如果这些请求似乎 **愚蠢、疯狂、过度或恶意,** 或者如果你无法以其他方式解决问题,考虑暂时或永久将用户的IP地址添加到[&lt;请求黑名单 &gt; in yourdatasets.xml文档] (/docs/server-admin/datas# 请求黑名单) 。 。 。 。
             
    *    **从电脑上复制问题**   
找出问题是否是一个数据集或所有数据集,对于一个用户或所有用户,仅针对某些类型的请求等等.
如果可以重复问题,请尽量缩小问题范围.
如果你不能重复问题,那么问题可能与用户的计算机,用户的互联网连接,或者你的机构互联网连接有关.
         
    * 如果是这样的话 **一个数据集** 反应缓慢 (也许只是为了 **一类请求** 从一个用户) ,问题可能是:
        *   ERDDAP访问数据集的源数据 (特别是关系数据库、卡桑德拉和远程数据集) 可能暂时或永久缓慢。 尝试检查源的速度独立于ERDDAP。 。 。 如果它慢,也许你可以改进它。
        * 问题是否与具体请求或一般类型的请求有关?
请求的数据集子集越大,请求就越可能失败. 如果用户正在提出巨大的请求,请用户提出更小的请求,这些请求更有可能得到快速成功的响应.
            
几乎所有的数据集都比其他类型的请求更能处理某些类型的请求. 例如,当一个数据集存储不同时间块在不同文件中时,从大量时间点获取数据的请求可能非常缓慢. 如果当前请求属于困难类型,则考虑为这些请求提供一个最优化数据集的变体。 或者只是向用户解释,这种类型的请求是困难的和耗费时间的,要求他们的耐心.
            
        * 数据集可能没有优化配置. 您可以对数据集进行修改 。datasets.xml要帮助的块ERDDAP™更好地处理数据集。 举例来说,
            
            *   EDDGrid来自NcFiles的数据集,从压缩的nc4/hdf5文件中获取数据的速度在获取整个地理范围的数据时很慢. (例如,世界地图) 因为整个文件必须解压。 您可以将文件转换为未压缩的文件, 但是磁盘空间要求会大得多 。 在某些情况下,也许最好接受这种数据集将缓慢。
            * [&lt;subsetVariables&gt;] (中文(简体) ). (/docs/server-admin/dataset#可变子) 标签对如何ERDDAP™处理 EDDTable 数据集。
            * 你也许可以增加[来自数据库的 EDD Table 速度](/docs/server-admin/datasets#database-speed)数据集。
            * 许多 EDDTable 数据集可以通过[存储数据副本于NetCDF相邻的标记阵列文件](/docs/server-admin/datasets#eddtablefromfiles),哪个ERDDAP™读得很快
            
如果您需要帮助加速一个特定的数据集,请包括问题描述和数据集的块datasets.xml看到我们的[关于获得额外支助的章节](/docs/intro#support)。 。 。 。
             
    * 若为 **所有的东西** 输入ERDDAP™这是 **永远** 缓慢,问题可能是:
        * 运行中的计算机ERDDAP™可能没有足够的内存或处理能力。 跑起来真好ERDDAP™在现代的多核心服务器上 对于重用,服务器应拥有64位操作系统以及8GB或更多内存.
        * 运行中的计算机ERDDAP™可能还运行着消耗大量系统资源的其他应用程序。 如果是的话,您能否获得一个专用服务器ERDDAP? 。 。 。 比如说 (这不是认可) ,您可以得到一个四核的Mac Mini服务器,8GB的内存为~1100美元.
             
    * 若为 **所有的东西** 输入ERDDAP™这是 **临时** 慢点,快看ERDDAP因为[ **/erddap/status.html页 次** ](#status-page)在您的浏览器中。
        * 这是否ERDDAP™状态页面无法装入 ?
如果是这样,[重新启动ERDDAP™](#shut-down-and-restart)。 。 。 。
        * 那个ERDDAP™状态页面缓慢加载 (例如, &gt; 5秒) ? 。 。 。
这表示一切ERDDAP™运行缓慢,但它不一定是麻烦。ERDDAP™也许只是真的很忙。
        * 对于“响应失败时间” (自上次主要装入时起) ",是n=一个大的数字?
这表明最近有许多请求未获通过。 这也许是麻烦或麻烦的开始。 失败的中位数时间往往很大 (例如,2100毫秒) , (中文).
这意味着有 (是吗?) 很多活动线程。
将大量资源捆绑在一起 (如内存,打开文件,打开套接字,......) , (中文).
这是不好的。
        * 对于"回应成功的时间" (自上次主要装入时起) ",是n=一个大的数字?
这表明最近有许多成功的请求。 这不是麻烦。 意思是说你ERDDAP™越来越重的使用。
        * "非汤姆卡特等待线条的数量"是典型值的两倍吗?.
这经常是严重的麻烦 会导致ERDDAP™减速并最终冻结。 如果这种情况持续数小时,你可能会想主动[重新启动ERDDAP™](#shut-down-and-restart)。 。 。 。
        * 在"记忆使用总结"列表的底部,最后一个"记忆:目前使用"值是否很高?
这可能只是表示使用率很高,也可能是麻烦的迹象。
        * 看看线程列表及其状态. 他们当中有不少人做不寻常的事吗?
             
    * 已经 **您所在机构的互联网连接** 目前慢吗?
搜索互联网进行"网际网络速度测试",并使用免费在线测试之一,例如:[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/)。 。 。 如果您的机构互联网连接缓慢, 那么连接ERDDAP™和远程数据源的连接将十分缓慢ERDDAP™而用户将缓慢。 有时候,你可以解决这一点 通过停止不必要的互联网使用 (例如,观看流视频或视频会议电话的人) 。 。 。 。
         
    * 已经 **用户的互联网连接** 目前慢吗?
让用户搜索互联网进行"网间网速测试",并使用免费在线测试之一,例如:[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/)。 。 。 如果用户的互联网连接缓慢,会减慢他们的访问ERDDAP。 。 。 有时,他们可以解决这个问题 通过停止不必要的互联网使用 在他们的机构 (例如,观看流视频或视频会议电话的人) 。 。 。 。
         
    *    **粘着?**   
看我们的[关于获得额外支助的章节](/docs/intro#support)。 。 。 。

### 关闭并重新启动{#shut-down-and-restart} 
*    **如何关闭和重新启动汤姆卡特ERDDAP™**   
你不需要关闭 重新启动Tomcat和ERDDAP若为ERDDAP™是暂时的慢, 慢一些已知的原因 (比如从脚本中请求很多,或者WMS用户) ,或应用到datasets.xml文档。
    
你需要关闭并重新启动Tomcat和ERDDAP™如果您需要对设置. xml 文件应用修改,或者ERDDAP™冷冻、绞刑或锁锁 在极端的情况下,Java可在收集全部垃圾时冻结一两分钟,但随后恢复。 所以最好等一两分钟看看Java页:1ERDDAP™如果它只是做一个漫长的垃圾收集。 (如果垃圾收集是一个常见的问题,[向Tomcat分配更多内存](/docs/server-admin/deploy-install#memory)。 。 。 。) 
    
我不建议使用Tomcat网络应用管理器启动或关闭Tomcat. 如果你不完全关闭和启动Tomcat, 你迟早会有PermGen的记忆问题。
    
关闭并重新启动TomcatERDDAP数字 :
    
    * 如果您使用 Linux 或 mac ,则:
         (如果您创建了运行Tomcat的特殊用户, 例如 tomcat, 请记住作为该用户执行以下步骤 。)   
         
        1. 使用 cd 数据 *移动猫* 备忘
             
        2. 使用 ps -ef 键|grep tomcat 找到 java/ tomcat 进程 身份证 (希望只列出一个过程) ,我们会叫 *Java 处理器* 见下文。
             
        3. 若为ERDDAP™冷冻/饥饿/锁住,使用杀 - 3 *Java 处理器* 告诉Java  (正在运行的 Tomcat) 要对 Tomcat 日志文件进行线程倾销 : *移动猫* &#123;\fn黑体\fs22\bord1\\shad0\\3aHBE\\4aH00\fscx67\fscy66\\2cHFFFFFF\\3cH808080&#125;我还没说完呢 重启后,您可以通过找到线程倾销信息来分析问题 (以及上面任何其他有用的信息) 输入 *移动猫* /logs/catalina.out 和通过阅读相关部分[ERDDAP™日志归档](#log)。 。 。 如果你愿意,你可以包括这个信息 并看到我们[关于获得额外支助的章节](/docs/intro#support)。 。 。 。
             
        4. 使用./shutdown. 请检查date=中的日期值 (帮助). 嘘
             
        5. 使用 ps -ef 键|在java/tomcat进程未列出之前,grep tomcat会反复出现.
            
有时,java/tomcat过程需要2分钟才能完全关闭. 原因是:ERDDAP™向它的背景线条发出一个信息,让他们停止,但有时这些线条需要很长时间才能到达一个好的停止地点.
            
        6. 如果过了一分钟左右,java/tomcat不是自己停留,你可以使用
杀死 -9 *Java 处理器*   
迫使java/tomcat进程立即停止。 如果可能,仅作为最后手段使用。 -9开关很强大,但可能会引发各种问题.
             
        7. 要重新启动ERDDAP™,使用./启动.sh
             
        8. 视图ERDDAP™在浏览器中检查重新启动是否成功。 (有时候,你需要等待30秒 并尝试加载ERDDAP™。在浏览器中再次显示它是否成功。)   
             
    * 如果您使用 Windows :
         
        1. 使用 cd 数据 *移动猫* 备忘
             
        2. 使用shutdown.bat  
             
        3. 您可能想要/需要使用 Windows 任务管理器 (可通过 Ctrl Alt Del 访问) 以确保Java/汤姆卡特/ERDDAP™进程/应用程序已完全停止。
有时,程序/应用程序需要两分钟才能关闭。 原因是:ERDDAP™向它的背景线条发出一个信息,让他们停止,但有时这些线条需要很长时间才能到达一个好的停止地点.
             
        4. 要重新启动ERDDAP™,使用启动.bat
             
        5. 视图ERDDAP™在浏览器中检查重新启动是否成功。 (有时候,你需要等待30秒 并尝试加载ERDDAP™。在浏览器中再次显示它是否成功。)   
             
### 频繁的崩溃或冻结{#frequent-crashes-or-freezes} 
若为ERDDAP™变得缓慢,崩溃或冻结, 有些事情是错的。 进去看看[ERDDAP日志文件](#log)试着找出原因 如果你做不到,请包括细节,看看我们[关于获得额外支助的章节](/docs/intro#support)。 。 。 。

最常见的问题是一个麻烦的用户,他同时运行数个脚本和/或有人提出大量无效请求. 如果发生这种情况,你也许应该把用户列入黑名单。 当一个黑名单用户提出请求时,回复中的错误信息鼓励他们通过电子邮件将问题解决. 那你可以鼓励他们一次只运行一个脚本 并解决他们的脚本中的问题 (例如,请求从远程数据集中获取数据,在计时截止前无法响应) 。 。 。 。 见[&lt;请求黑名单 &gt; in yourdatasets.xml文档] (/docs/server-admin/datas# 请求黑名单) 。 。 。 。

在极端的情况下,Java可在收集全部垃圾时冻结一两分钟,但随后恢复。 所以最好等一两分钟看看Java页:1ERDDAP™如果它只是做一个漫长的垃圾收集。 (如果垃圾收集是一个常见的问题,[向Tomcat分配更多内存](/docs/server-admin/deploy-install#memory)。 。 。 。) 

若为ERDDAP™问题不是麻烦的用户,也不是长长的垃圾收集,你通常可以通过[重新启动ERDDAP™](#shut-down-and-restart)。 。 。 。 我的经验是ERDDAP™可以运行数月而无需重启.
     

### 监视器{#monitor} 
你可以监视你ERDDAP'通过查看[/erddap/status.html页 次](#status-page),特别是上一节的统计数据。 若为ERDDAP™变得缓慢或冷冻 问题不光是极其沉重的用法 你通常可以解决问题[重新启动ERDDAP™](#shut-down-and-restart)。 。 。 在/erddap/度量衡上通过普罗米修斯集成可以得到额外的度量衡.

我的经验是ERDDAP™可以运行数月而无需重启. 如果您想要应用一些修改, 您只需重新启动它ERDDAP设置. xml 或需要安装新版本时ERDDAP™, (中文).Java汤姆卡特,或者操作系统 如果您需要重新启动ERDDAP™经常出事 进去看看[ERDDAP日志文件](#log)试着找出原因 如果你做不到,请包括细节,看看我们[关于获得额外支助的章节](/docs/intro#support)。 。 。 作为临时解决方案,你可能会尝试使用[纪念](https://mmonit.com/monit/)监视您的ERDDAP™并在需要时重新启动。 或者,你可以做一个CRON工作重新开始ERDDAP™  (主动) 定期。 编写脚本实现监控和重启自动化可能有点困难ERDDAP。 。 。 。 一些可能有助于:

* 如果Tomcat进程仍在运行中, 您可以使用 grep 的 -c 切换来简化测试 :
ps -u (韩语) *移动猫 用户*  |grep - c java (英语).
这将减少输出为"1",如果Tomcat进程还活着,或者如果进程停止了"0".
     
* 如果你对gawk很在行,可以从结果中提取进程ID
ps -u (韩语) *移动猫 用户*  |grep java,并在脚本的其他行中使用进程ID.
     

如果你真的设立Monit或一个cron工作, 它会很好 如果你可以分享的细节 这样其他人可以获益于我们[关于获得额外支助的章节](/docs/intro#support)你可以分享的地方。

#### 常温{#permgen} 
如果您多次使用Tomcat 管理器重新装入 (停止并启动)  ERDDAP™, (中文).ERDDAP™可能无法启动 扔java.lang。 (原始内容存档于2019-09-21). Out out Memory Error: PermGen. 解决办法是定期 (还是每次?)  [关闭并重新启动 tommcat,ERDDAP™](#shut-down-and-restart),而不是仅仅重新装入ERDDAP。 。 。 。
\\[更新 : 这一问题已大大降低或固定在ERDDAP™第1.24版 (中文(简体) ).\\]  
     
#### 日志{#log} 
*    **[日志.txt](#log)**   
若为ERDDAP™如果事情不能如预期的那样奏效的话, 研究一下错误和诊断信息是非常有用的。ERDDAP™日志文件。
    * 日志文件是 *大家长会* /logs/log.txt (英语).
         ( *大家长会* 指定在[设置. xml](/docs/server-admin/deploy-install#setupxml)) 。 。 。 若无日志. txt 文件或日志 。 txt 文件自您重启以来没有更新ERDDAP™时,请看[Tomcat 日志文件](#tomcat-logs)以查看是否有错误信息。
    * 日志文件中的诊断信息类型 :
        * "错误"一词在某事出错以致程序未能完成时使用. 虽然犯错误很烦人,但错误迫使你处理问题。 我们的想法是, 投出一个错误比有ERDDAP™沿着你没想到的路走
        * "警告"一词在某事出错时被使用,但程序得以完成. 这些很罕见。
        * 任何其他信息都只是信息。 您可以控制登录的信息量 [&lt;日志级别 &gt;] (/docs/server-admin/datasets#日志级别)  datasets.xml。 。 。 。
        * 数据集重装和用户回复需要 &gt; 10秒完成 (成功或失败) 标记为 " (超过10个&#33;) " .. 因此,您可以为此短语搜索log.txt文件,以找到重新装入速度缓慢的数据集或完成速度缓慢的请求请求号. 然后可以在log.txt文件中看起来更高一些,以查看数据集问题是什么,用户要求的是什么,以及来自谁. 这些缓慢的数据集载荷和用户请求有时会征税ERDDAP。 。 。 所以更多了解这些请求可以帮助你识别和解决问题.
    * 信息以相当大块写入磁盘驱动器上的日志文件 。 好处是,这非常有效 --ERDDAP™永远不会屏蔽等待信息写入日志文件。 缺点是日志几乎总是以部分消息结尾,直到下块写完才会完成. 随时可以更新 (瞬间) 通过观看你的ERDDAP状态网页 : https://*your.domain.org*/erddap/status.html   (或http://若为https未启用) 。 。 。 。
    * 当log.txt文件达到20 MB时,
文件被重新命名为日志。 txt. previous and a new log.txt 文件创建. 因此日志文件不会累积.
        
在设置.xml中,可以指定日志文件的不同最大大小,在MegaBytes中. 最低允许是1 (甲基溴) 。 。 。 。 最多2000块 (甲基溴) 。 。 。 。 默认是20 (甲基溴) 。 。 。 。 例如:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * 当你重新开始时ERDDAP™, (中文).
        ERDDAP™创建log.txt和log的存档副本。 txt. 先前的文件在文件名称中带有时间戳. 如果在重启之前有麻烦,也许应该分析这些存档文件,以找出问题所在的线索. 如果不再需要归档文件, 您可以删除它们 。
         
##### 解析日志.txt{#parsing-logtxt} 
ERDDAP木头 txt 文件不是用于解析的 (尽管您可能能够创建正则表达式来提取想要的信息) 。 。 。 它旨在帮助人类发现 出错时会发生什么 当您向错误或问题报告时ERDDAP™开发者,如果可能,请包含log.txt文件中与麻烦请求有关的所有信息.

出于效率原因,ERDDAP™仅将信息写入日志。 在积累了大量信息后 txt. 所以,如果你访问日志。 txt 就在错误发生后,与错误相关的信息可能尚未写入log.txt. 为了从 log.txt 获得完整的最新资料, 请访问您ERDDAP因为[状态.html页面](#status-page)。 。 。 。 何时ERDDAP™进程,它将所有待决信息冲进日志.txt。

对于ERDDAP™请使用[Apache 和/或Tomcat 日志文件](#tomcat-logs)改为ERDDAP'log.txt. (中文(简体) ). 请注意:ERDDAP因为[状态.html页面](#status-page)  (有点) 和[每日报告](#daily-report)  (更多) 拥有大量预估使用量的统计数据。
    
### Tomcat 日志{#tomcat-logs} 
若为ERDDAP™不启动, 因为错误发生在很早ERDDAP启动时, 错误消息会出现在Tomcat的日志文件中 ( *移动猫* /logs/catalina. (原始内容存档于2018-09-29). *今日( E)* 记录或 *移动猫* /日志/目录。) 输入[ERDDAP日志. txt 文件](#log)。 。 。 。

使用统计: 对于人们想要从日志文件中收集的大部分信息 (例如,使用统计) 请使用 Apache 和/或 Tomcat 日志文件。 它们的格式很好,有这类信息。 有许多分析工具,例如,[AWStats 数据](https://www.awstats.org), (中文).[弹性Search的基巴纳](https://www.elastic.co/products/kibana),以及[计数器](https://jmeter.apache.org),但搜索网页以找到适合您目的的工具。

注意日志文件只识别用户为IP地址. 有些网站可以帮助您获取与特定IP地址相关的信息,例如,[何为我的地址](https://whatismyipaddress.com/ip-lookup),但通常无法找到用户名。

而且,因为[DHCP 人权方案](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol),特定用户的IP地址在不同的日子可能不同,或者不同的用户在不同的时间可能拥有相同的IP地址.

或者,你可以使用类似的东西[谷歌分析](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision)。 。 。 但请注意:当您使用Google Analytics等外部服务时,您会放弃您的用户隐私,让Google完全访问您网站上的活动,Google (还有其他人?) 能够永远保存 并用于任何目的 (也许不是在技术上,但可能在实践中) 。 。 。 你的用户没有同意 可能不知道他们会在你的网站上被跟踪 就像他们可能不知道 他们被跟踪的程度 在几乎所有的网站。 现在许多用户非常担心 他们在网上所做的一切 都被这些大公司监控 (谷歌,脸书等.) 以及政府, 并认定这是无端 侵入他们的生活 (1984年,如该书) 。 。 。 这促使许多用户安装产品,如[隐私徽章](https://www.eff.org/privacybadger/faq)最小化跟踪,使用替代浏览器,例如[Tor 浏览器](https://www.torproject.org/)  (或关闭传统浏览器中的跟踪) ,并使用替代搜索引擎,如[鸭子走](https://duckduckgo.com/)。 。 。 如果您使用Google Analytics等服务, 请至少记录其使用及后果,&lt;标准隐私政策 &gt; 标记在ERDDAP因为
\\[移动猫\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml文件.
    
### 电子邮件日志{#e-mail-log} 
*    **电子邮件LogYear-MM-DD.txt**   
    ERDDAP™总是在当日的电子邮件中写入所有正在发送的邮件的文本 LogYEAR-MM-DD.txt 文件 输入 *大家长会* 备注 ( *大家长会* 指定在[设置. xml](/docs/server-admin/deploy-install#setupxml)) 。 。 。 。
    * 如果服务器无法发送电子邮件, 或者您已经配置ERDDAP™不发送电子邮件信息, 或者如果你只是好奇, 这个文件是一个方便的方式 来查看所有已经发送的电子邮件信息 。
    * 如果前几天的电子邮件日志文件不再需要, 您可以删除它们 。
         
### 每日报告{#daily-report} 
《每日报告》有许多有用的信息 -- -- 所有来自你ERDDAP因为[/erddap/status.html页 次](#status-page)还有更多
    * 这是你最完整的总结ERDDAP状态
    * 在其他统计中,它包括一个没有加载的数据集列表以及它们产生的例外.
    * 当你开始的时候它就会生成ERDDAP™  (刚刚之后ERDDAP™尝试装入所有数据集) 每天早上7点后,
    * 无论何时生成,都写给[ERDDAP日志. txt 文件](#log)。 。 。 。
    * 每当生成时,都会通过电子邮件发送给&lt;电子邮件 Daily Reports To &gt; 和&lt;电子邮件 改为 &gt; (中指定的[设置. xml](/docs/server-admin/deploy-install#setupxml)) 如果您已经设置了电子邮件系统 (在设置.xml) 。 。 。 。

### 状况 页次{#status-page} 
你可以查看你的状态ERDDAP™从任何浏览器中选择&lt;基数Url &gt;/erddap/status.html
* 此页面是动态生成的, 因此它总是有您的最新动态统计ERDDAP。 。 。 。
* 它包括有关请求数量,内存使用,线程堆栈痕迹,任务Thread等的统计数据.
* 因为任何人都可以浏览状态页面,所以它没有包含相当多的信息,比如:[每日报告](#daily-report)。 。 。 。
         
### 增加/改变数据集{#addingchanging-datasets} 
ERDDAP™通常重读datasets.xml每个 *装入 Datasets 最小值*   (指定于[设置. xml](/docs/server-admin/deploy-install#setupxml)) 。 。 。 。 这样你就可以改变到datasets.xml任何时候,即使ERDDAP™正在运行。
不久将检测到一个新的数据集,通常是在 *装入 Datasets 最小值* 。 。 。 。
已更改的数据集在启用时将重新装入 *重新装入每个 NMinutes* 旧 (一、导 言datasets.xml) 。 。 。 。
    
#### 旗帜{#flag} 
*    **[旗舰文件](#flag)告诉ERDDAP™尝试尽快重装数据集** 
    
    *   ERDDAP™将不会注意到一个数据集设置的任何变化 。datasets.xml直至ERDDAP™重新装入数据集。
         
    * 告诉ERDDAP™以尽快重装数据集(在数据集之前)&lt;重新装入 EveryNiminutes &gt; 会导致重新装入, 将文件放入 *大家长会* /旗帜 ( *大家长会* 指定在[设置. xml](/docs/server-admin/deploy-install#setupxml)) 名称与数据集的相同datasetID。 。 。 。
这说明ERDDAP™尝试尽快重新装入数据集。
旧版本的数据集将一直供用户使用,直到新版本可用并进行解剖交换。
对于EDDGrid从文件夹和 EDD 表格 从 Files 中,重新加载的数据集将查找新的或更改的文件,读取,并将其纳入数据集. 因此重新装入的时间取决于新文件或更改文件的数量.
如果数据集有活动="假",ERDDAP™将删除数据集。
         
##### 不良文件标记{#bad-files-flag} 
* /flag目录的一个变体是/badFilesFlag目录. (已添加ERDDAP™v2.12 (英语).)   
如果你把文件放进 *大家长会* / bad FilesFlag 目录带有一个datasetID作为文件名称 (文件内容不重要) ,然后尽快ERDDAP™见坏的档案 旗舰文件,ERDDAP™将:
    
    1. 删除错误的 FilesFlag 文件 。
    2. 删除不良的档案.nc文件 (如果有一个) ,它有该数据集的不良文件列表。
对于数据集,如EDDGrid有孩子的 SideBySideDatasets , 此选项也删除不良的Files 。.nc所有儿童数据集的文件。
    3. 尽快重装数据集 。
    
因此,这导致ERDDAP™重新尝试之前的文件 (错了吗?) 标记为坏。
         
##### 硬旗{#hard-flag} 
* /flag目录的另一个变体是/hardFlag目录. (已添加ERDDAP™页:1)   
如果你把文件放进去 *大家长会* 硬旗有一个datasetID作为文件名称 (文件内容不重要) ,然后尽快ERDDAP™看见硬的 旗舰文件,ERDDAP™将:
    
    1. 删除硬旗文件 。
    2. 删除数据集ERDDAP。 。 。 。
    3. 删除全部信息ERDDAP™已存储此数据集。
对于EDDGrid从文件夹和 EDD 表格 从 Files 子类中删除数据文件及其内容的内部数据库 。
对于数据集,如EDDGridSideBySide有子Datasets,它也删除了所有子数据集的数据文件及其内容的内部数据库.
    4. 重新装入数据集 。
对于EDDGrid从文件夹和 EDD 表格 从 Files 子类, 导致ERDDAP™要重读 **全部** 数据文件。 因此,重装时间取决于数据集中的数据文件总数. 因为数据集被从ERDDAP™当注意到硬旗时,数据集将无法使用,直到数据集完成重新加载. 耐心点 看着[日志.txt](#log)文档,如果你想看看发生了什么。
    
硬旗变体删除数据集存储的信息, 即使数据集目前尚未装入ERDDAP。 。 。 。
    
难 旗子很有用 当你做一些事情 导致改变如何ERDDAP™例如,当您安装新版本时,读取并解释源数据ERDDAP™或当您在datasets.xml
    
* 旗帜的内容,badFilesFlag,以及硬旗文件无关紧要.ERDDAP™只要看看文件名 就能拿到datasetID。 。 。 。
     
* 在主要数据集重载之间,ERDDAP™不断寻找旗子、坏FilesFlag和硬旗文件。
     
* 注意当重新装入数据集时,所有文件在 *大家长会* 页:1[缓存](#cached-responses)页:1 *datasetID* 目录被删除。 其中包括:.nc和通常缓存到~15分钟的图像文件。
     
* 注意如果数据集的 xml 包含[活动=“虚假”](/docs/server-admin/datasets#active),一个旗帜将使数据集变得不活动 (如果活动) ,而且无论如何,不会重新装入。
     
* 随时ERDDAP™运行 LoadDatasets 以进行大重装( 时间重装由&lt;装入 Datasets MinMinutes &gt; 或小重装 (由于外部或内部旗帜) , (中文).ERDDAP™全部读取&lt;已解压CacheMaxGB&gt;,&lt;已解压的CacheMaxMinutesOld &gt;,&lt;用户 &gt;,&lt;请求黑名单 &gt;,&lt;缓慢的TroubleMillis &gt; ,以及&lt;订阅 Email Blacklist &gt; 标记和切换到新设置 。 这样你就可以用旗子来获得ERDDAP™尽快通知这些标签的更改。

##### 设置数据集旗{#set-dataset-flag} 
*  ERDDAP™拥有网络服务,以便通过 URL 设置旗帜。
    
    * 举例来说,
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (这是假旗 密钥) 将设置 RPmelTao 数据集的旗帜。
    * 每个都有不同的旗键datasetID。 。 。 。
    * 管理员可以通过查看所有数据集的底部来查看其旗帜 URL 列表[每日报告](#daily-report)电子邮件。
    * 管理员应该将这些URL视为机密,因为这样可以给人任意重设数据集的权利.
    * 如果你认为旗钥匙落入了滥用它们的人的手中 你可以改变&lt;旗帜KeyKey &gt; 英寸[设置. xml](/docs/server-admin/deploy-install#setupxml)并重新启动ERDDAP强制ERDDAP™生成并使用不同的旗钥。
    * 如果你改变了&lt;flangKeyKey&gt;,删除所有旧订阅 (请参看您每日报告中的清单) 并记住将新的URL发送给您想要的人。
    
旗帜系统可作为更高效的ERDDAP™何时重新装入数据集。 例如,您可以设置一个数据集的&lt;重装 EveryNminutes &gt; 至大量 (例如,10080 = 1周) 。 。 。 然后,当你知道 数据集已经改变 (或许是因为您在数据集的数据目录中添加了文件) ,设置一个旗帜,以便尽快重新装入数据集。 通常会很快看到旗帜. 但如果LadyDatasets线程已经很繁忙,可能还需要一段时间才能在旗帜上行动. 但国旗系统比设定要灵敏得多 效率更高&lt;将 EveryNMInuts &gt; 重新装入到少量 。
    
#### 删除数据集{#removing-datasets} 
如果一个数据集活动于ERDDAP™您想要暂时或永久关闭它 :
1. 内datasets.xml数据集,数据集[活动=“虚假”](/docs/server-admin/datasets#active)在数据集标记中。
2. 等着ERDDAP™在下次重载时删除数据集或[设置旗帜](#flag)要显示的数据集ERDDAP™尽快注意到这一变化。 当你这样做,ERDDAP™并没有丢掉它可能存储的关于数据集的任何信息,当然也没有对实际数据做任何事情.
3. 然后可以将活动=“虚假”数据集留在datasets.xml或去除它。
         
#### 何时重新装入数据集 ?{#when-are-datasets-reloaded} 
一个名为RunLoadDatasets的线程是重新装入数据集时控制的主线程. 运行记录 数据集永远循环 :

1. 运行LoadDatasets 注意到当前时间 。
2. Run LoadDatasets 启动一个 LoadDataset 线程来做一个“ MajorLoad ” 。 您可以在您的顶端看到当前/之前的主要Load的信息ERDDAP因为
    [/erddap/status.html页 次](#status-page)  (比如说,[状态页面示例](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) 。 。 。 。
    
    1. 装入 Datasets 复制datasets.xml。 。 。 。
    2. 装入 Dataset 读取副本datasets.xml对于每个数据集,请查看数据集是否需要 (内容) 装入或移除。
        * 如果一个[旗帜](#flag)此数据集的文件已存在,如果活动=“虚假”或 (内容) 如果活动为“ true” 则装入 (无论数据集的年龄) 。 。 。 。
        * 如果数据集的数据集.xml块有活动="虚假",数据集目前已加载 (活动) 已经卸下 (删除) 。 。 。 。
        * 如果数据集有活动="真",且数据集尚未加载,则已加载.
        * 如果数据集有活动="真",且数据集已经加载,则如果数据集的年限,数据集会被重新加载 (自上次装入以来的时间) 大于其&lt;重新装入 每个NMinutes &gt; (默认 = 10080分钟) ,否则,数据集将单独存在。
    3. 装入 Dataset 完成 。
    
RunLoadDatasets线程等待LoadDatasets线程完成. 如果加载Datasets需要比加载Datasets更长的时间 最小数 (在设置.xml中指定的) , RunLoadDatasets 中断 LongDataset 线程。 理想的情况是,LoadDatasets注意到中断和结束。 但如果它没有注意到一分钟内中断,RunLoadDatasets就称负载Datasets. 停下来 () ,这是不可取的。
3. 虽然上一个主要LOAD的开始时间小于负载Datasets 最小数 (按设置.xml的规定,例如15分钟) ,运行LoadDatasets 反复寻找[旗帜](#flag)文档中 *大家长会* /flag目录. 如果找到一个或多个旗舰文件,它们会被删除,而 RunLoadDatasets 启动一个 LoadDataset 线程来做一个“ minorLoad ” (主要标签=虚假) 。 。 。 你看不到小线索ERDDAP因为[/erddap/status.html页 次](#status-page)。 。 。 。
    1. 装入 Datasets 复制datasets.xml。 。 。 。
    2. 装入 Dataset 读取副本datasets.xml而,对于每个有旗帜文件的数据集:
        * 如果数据集的数据集.xml块有活动="虚假",数据集目前已加载 (活动) 已经卸下 (删除) 。 。 。 。
        * 如果数据集有活动="真",则数据集是 (内容) 无论年龄大小 都装满了 未标记的数据集被忽略 。
    3. 装入 Dataset 完成 。
4. 运行记录 数据集回溯到第1步.

注释:
* 启动
当您重新开始时ERDDAP™,每个带有“ true”的数据集都被装入。
* 快递
当一个数据集是 (内容) 已装入, 它的缓存 (包括任何数据响应文件和/或图像文件) 已经空出。
* 许多数据集
如果您拥有许多数据集和/或一个或多个数据集,则会缓慢到 (内容) 装入, 装入Datasets 线程可能需要很长时间才能完成工作, 甚至比装入Datasets 更长 明弥努特人.
* 一个装入数据串
一次性运行的LoadDataset线程从未超过一个。 如果在 LoadDatasets 已经运行时设置了旗帜,那么在 LoadDataset 线程完成运行之前,该旗帜可能不会被注意或被操作. 你可能会说:"这是愚蠢的。 为什么你不开始一串新的线程来装入数据集呢?" 但是,如果你有很多数据集 从一个远程服务器获得数据, 甚至一个LadyDatasets线程会给远程服务器带来很大的压力。 如果您拥有大量从一个RAID上的文件获取数据的数据集,情况也是如此。 拥有一个以上 LoadDataset 线程的回报率迅速下降。
* 旗帜 = ASAP
设置一个旗帜只是表示数据集应该是 (内容) 尽快装入,不一定立即装入。 如果当前没有 LoadDataset 线索运行,数据集将在几秒内开始重新装入. 但是,如果一个LoadDatasets线程正在运行中,那么在LoadDatasets线程完成之前,数据集很可能不会重新装入.
* 旗舰文件已删除
一般来说,如果你在 *大家长会* /erddap/旗下目录 (通过访问数据集的旗帜 Url 或者放一个实际文件) ,通常在删除该旗帜文件后很快会重新装入数据集.
* 旗帜对小型重装 每分钟一次
如果您有某种外部方式知道何时需要重新装入数据集, 如果您方便的话, 确保数据集总是更新的最佳方式是设置其重新装入 每个NMinute到大量 (10080号?) 并设置旗帜 (通过剧本?) 当它需要重新装入时。 这就是系统EDDGrid从Erddap和EDDTable FromErddap的使用收到需要重新装入数据集的消息.
* 查看日志.txt
许多相关信息都写给 *大家长会* /logs/log.txt文件存档. 如果事情不像你所期望的那么顺利,看看日志. txt让你通过找出什么来判断问题ERDDAP™没错
    
    * 搜索“ MajorLoad= true ” 以启动主要 LoadDataset 线程 。
    * 搜索“ MajorLoad=false ” , 以启动小的 LongDataset 线程 。
    * 搜索给定的数据集datasetID以了解情况 (内容) 装入或询问。
        
          
         
#### 缓存的答复{#cached-responses} 
总之,ERDDAP™不缓存 (存储) 对用户要求的回应。 理由是,大多数请求会略有不同,这样缓存就不会非常有效. 最大的例外是请求图像文件 (缓存自浏览器和程序Google Earth经常重新请求图像) 请求.nc文件 (因为它们不能在空中产生) 。 。 。 。ERDDAP™在不同的目录中存储每个数据集的缓存文件 : *大家长会* /缓冲/ *datasetID* 由于单个缓存目录可能有大量的文件,可能变得访问缓慢.
文件从缓存中删除的原因有三:
* 此缓存中的所有文件在ERDDAP™正在重新启动。
* 周期性地,任何文件都多于&lt;缓存Minutes &gt; 旧 (一、导 言[设置. xml](/docs/server-admin/deploy-install#setupxml)) 将删除。 根据年龄删除缓存中的文件 (非最近使用过的) 确保文件不会在缓存中呆太久。 虽然某个请求似乎应该总是回回同样的回复,但事实并非如此。 例如,atabledap包含时间的请求( T) *有点 时间* 如果新数据到达数据集,则会更改。 和一个网格dap请求,包括\\[最后一个\\]如果新的数据到达数据集,时间维度将发生变化。
* 显示错误条件的图像被缓存, 但只保存几分钟 (情况很困难) 。 。 。 。
* 每次重新装入数据集时,该数据集缓存中的所有文件都会被删除. 因为可能要求"last"网格数据集中的索引,当重新装入数据集时,缓存中的文件可能会变得无效.
         
#### 存储数据集信息{#stored-dataset-information} 
对于所有类型的数据集,ERDDAP™当一个数据集被装入时收集大量信息,并保存在内存中. 允许ERDDAP™对搜索、对数据集清单的要求和对数据集信息的要求迅速作出反应。

用于几类数据集 (重点EDDGrid复制, EDD Table Copy, 复制EDDGrid从 *页:1* 文件, 以及 EDD 表格从 *页:1* 文件) , (中文).ERDDAP™在磁盘上存储一些关于重新装入数据集时重用数据集的信息。 这大大加快了重装过程.

* 一些数据集信息文件是人可读的.json文件并存储于 *大家长会* /数据集/ *最后2LettersOf DatasetID/ 数据集编号datasetID* 。 。 。 。
*   ERDDAP™仅在异常情况下删除这些文件,例如,如果从数据集中添加或删除变量datasets.xml块。
* 对数据集的大多数更改datasets.xml块 (例如,改变一个全局属性或可变属性) 不需要删除这些文件。 常规数据集重载将处理这些类型的变化. 你看得出来ERDDAP™通过设置[旗帜](#flag)用于数据集。
* 同样,数据文件的添加、删除或更改也将在ERDDAP™重新装入数据集。 不过ERDDAP™如果数据集正在使用[&lt;更新EveryNMILIS &gt; (/docs/server-admin/datas#update Everynmilis / 服务器/数据集) 系统。
* 您很少需要删除这些文件 。 需要强迫的最常见情况ERDDAP™删除存储的信息 (因为它过时/不正确,不会被自动固定ERDDAP) 当您修改数据集时datasets.xml块影响如何ERDDAP™解释源数据文件中的数据,例如改变时间变量格式字符串.
* 从一个ERDDAP™运行中 (即使数据集目前尚未装入) ,设置[难 旗帜](#hard-flag)为数据集。 记住,如果数据集是大量文件的集合,重新装入数据集可能需要相当长的时间.
* 删除一个数据集存储的信息文件ERDDAP™没有运行,运行[达斯德](/docs/server-admin/datasets#dasdds)用于该数据集 (它比查找信息所在目录和手工删除文件容易) 。 。 。 记住,如果数据集是大量文件的集合,重新装入数据集可能需要相当长的时间.
         
### 内存状态{#memory-status} 
ERDDAP™不应该崩溃或冻结。 如果是的话,最可能的原因之一是记忆力不足. 您可以通过查看状态.html网页来监视内存的使用情况,该网页包括一条行,如

0 gc呼叫,0请求流出,0危险 自上次主要装入时起的内存邮件

 (这些是越来越严重的事件)   
和 MB inuses 和 gc 调用统计表中的列。 你能分辨出你的记忆是如何紧张的ERDDAP™是通过看这些数字。 数字较高表明压力更大。

* 甲基溴的用途应始终低于[\\- Xmx 内存设置](/docs/server-admin/deploy-install#memory)。 。 。 数字越大,就是一个坏兆头。
* gc 调用表示次数ERDDAP™呼叫垃圾收集器 试图缓解高内存使用。 如果这个是大于100,那就代表了严重的麻烦.
* 框中显示收到请求的数量 (HTTP 错误编号为 503, 服务不可用) 因为内存的使用已经太高了。 理想的情况是,不应放弃任何请求。 如果有几个请求被放弃了,那也没关系, 但是如果很多人被放弃了,就会有严重的麻烦。
* 危险 内存邮件 - 如果内存使用率变得危险,ERDDAP™向列表中的电子邮件地址发送电子邮件&lt;电子邮件 改为 &gt; (在设置.xml) 带有活动用户请求列表。 正如电子邮件所说,请将这些邮件转发给克里斯. 约翰在诺阿。 戈夫 这样我们就能利用这些信息 改进未来的版本ERDDAP。 。 。 。
     

狦ERDDAP™由内存支撑 :
* 考虑分配更多服务器的内存到ERDDAP™通过改变Tomcat[QQmx 内存设置](/docs/server-admin/deploy-install#memory)。 。 。 。
* 如果你已经分配了尽可能多的记忆ERDDAP™通过 -Xmx,考虑为您的服务器购买更多的内存 。 记忆是便宜的 (相对于新服务器的价格或您的时间) 来啊&#33; - 然后增加 - Xmx. (笑声)
* 内datasets.xml设置&lt;nGridThreads &gt; 到 1, 设置&lt;table Threads &gt; to 1, 并设定&lt;ipAddressMax RequestsActive &gt; 改为 1.
* 查看日志.txt中对于低效或麻烦的要求 (合法但合法) 请求。 将IP地址添加到&lt;请求黑名单 &gt; 输入datasets.xml。 。 。 黑名单错误消息包括ERDDAP™管理员的电子邮件地址, 希望这些用户会联系您, 这样您就可以与他们合作使用 。ERDDAP™更高效地进行。 保存一个IP地址列表对于您黑名单和原因是有好处的,这样您就可以与用户联系到您.
* 查看log.txt中对恶意用户请求的请求. 将他们的IP地址添加到&lt;请求黑名单 &gt; 输入datasets.xml。 。 。 如果类似的请求来自多个类似的IP地址, 您可以使用一些 Who- is Services (例如,[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) 要从源代码中找出IP地址的范围, 并列出整个范围的黑名单 。 见[&lt;请求黑名单 &gt; 文档] (/docs/server-admin/datas# 请求黑名单) 。 。 。 。
         
#### 记忆错误{#outofmemoryerror} 
当你建立ERDDAP™,您指定最大内存量Java可通过[\\- Xmx 设置](/docs/server-admin/deploy-install#memory)。 。 。 。 若为ERDDAP™永远需要更多的记忆, 它会扔一个java。 兰曰. 出忆摩耶经.ERDDAP™做了很多检查,以使其能够优雅地处理错误 (例如,一个麻烦的请求会失败, 但系统保持其完整性) 。 。 。 但有时错误会损害系统的完整性 你必须重新开始ERDDAP。 。 。 。 希望,这是罕见的。

快速而容易的解决出记忆错误的方法是增加[\\- Xmx 设置](/docs/server-admin/deploy-install#memory),但您不应将 -Xmx 设置增加到服务器内存的80%以上 (例如,对于一个 10GB 服务器,不要设置 - Xmx 高于 8GB) 。 。 。 内存相对便宜,因此增加服务器内存可能是一个很好的选择. 但是,如果您已经将服务器中的内存最大化,或者由于其他原因无法增加,则您需要更直接地处理OutOutMemoryError的起因.

如果你往里看的话[日志.txt](#log)要查看什么的文件ERDDAP™当错误发生时,你通常可以得到 一个很好的线索,说明 出记忆错误的原因。 可能的原因很多,包括:

* 一个单一的巨大数据文件可以引起OutOfMemoryError,显著的是,巨大的ASCII数据文件. 如果这就是问题所在,那就应该很明显,因为ERDDAP™将无法装入数据集 (表格数据集) 或从该文件读取数据 (用于网格数据集) 。 。 。 如果可行,解决方案是将文件分割成多个文件. 理想情况下,您可以将文件分割成逻辑块. 例如,如果文件有20个月的数据值,则将其分为20个文件,每个文件有1个月的数据值. 但即使主文件被任意分割,也有优势. 这种办法有多种好处:(a) 这将将读取数据文件所需的内存减少到1/20th,因为每次只读一个文件. (b) 财务 经常ERDDAP™能够更快地处理请求,因为它只需要查看一个或几个文件就可以找到特定请求的数据. (c) 国家 如果数据收集正在进行,那么现有的20个文件可以保持不变,你只需要修改一个,小的,新的文件就可以将下一个月的数据值添加到数据集.
* 单项巨大的请求可以引起"OutOutMemoryError". 特别是:orderBy选项将整个响应保存到内存中 (例如,做某种工作) 。 。 。 如果反应巨大,可能导致错误. 总会有一些要求,从不同方面来说,都太大了。 您可以通过增加 - Xmx 设置来解决这个问题 。 或者,可以鼓励用户提出一系列较小的请求.
* 大量文件不太可能导致文件索引ERDDAP™创建为大小如此之大, 以至于文件会引发错误 。 如果我们假设每个文件都使用300字节,那么100万个文件只能占用300MB. 但是,数据文件数量庞大的数据集也会引起其他问题。ERDDAP很明显,这需要很长时间ERDDAP™在响应用户的数据请求时打开所有这些数据文件。 在这种情况下,解决方案可能是汇总文件,以便减少数据文件. 对于表格数据集,如果将当前数据集的数据保存在[CF 数字 断层采样 (副秘书长) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)相邻的标记矩阵数据文件 (请求.ncCF 文件来自ERDDAP) 然后制作一个新的数据集。 这些文件可以非常有效地处理ERDDAP因为[来自 NcCFF 的 EDD 表格](/docs/server-admin/datasets#eddtablefromnccffiles)。 。 。 。 如果有逻辑组织 (每个都有一块空间和时间的数据) , (中文).ERDDAP™可以非常迅速地从它们中提取数据.
* 对于使用[&lt;subsetVariables&gt;] (中文(简体) ). (/docs/server-admin/dataset#可变子) 属性,ERDDAP™制作一个表格,列出这些变量值的独特组合。 用于大型数据集或何时&lt;subsetVariables&gt; 配置错误, 本表可能足够大, 以引起出记忆错误 。 解决方案是从列表中删除变量&lt;subsetVariables&gt; 数值众多,或根据需要删除变量,直到该表的大小合理为止。 内容ERDDAP™使用subsetVariables系统不起作用 (例如,网页负载非常缓慢) 当桌子上有超过10万行时。
* 总是可能有几个同时提出的大请求 (非常忙的时候ERDDAP) 可以结合造成记忆障碍. 例如,8项请求,每个请求使用1GB,将给-Xmx=8GB设置造成问题。 但很少每个请求同时处于内存使用高峰. 你会很容易看到,你的ERDDAP™非常忙于处理大的要求 但是,这是可能的。 除了增加-Xmx设置外,这个问题很难解决.
* 还有其他情况。 如果你看着[日志.txt](#log)要查看什么的文件ERDDAP™当错误发生时,你通常可以得到关于原因的线索。 在大多数情况下,有办法将这个问题降到最低 (见上文) ,但有时你只需要更多的内存和更高的 - Xmx 设置.
         
### 太多的打开文件{#too-many-open-files} 
开始ERDDAP™v2.12, (中文(简体) ).ERDDAP™拥有监视打开文件数量的系统 (包括套接字和其他一些东西,而不仅仅是文件) Linux电脑上的Tomcat。 如果一些文件被错误地拒绝关闭 (a "资源泄漏") ,打开的文件数量可能会增加,直到超过操作系统允许的最大数量,并发生许多真正的坏事. 现在Linux电脑上 (因为Windows没有信息) 数字 :

* 在状态的极右.html网页上有一个“打开文件”栏,显示最大文件打开的百分比。 在Windows上,它只是显示"?".
* 何时ERDDAP™生成在每个主要数据集重载结束时的信息,它将打印到日志中。 txt 文件 :
打开FileCount= *当前* 最大数= *最大数* %= *百分比* 
* 如果百分比大于50%,则发送电子邮件给ERDDAP™管理员和电子邮件 所有的东西 去电子邮件地址

如果百分比为100%,ERDDAP™麻烦大了 别让这事发生
如果百分比大于75%,ERDDAP™接近可怕的麻烦。 这不好。
如果百分率大于50%,则极有可能出现猛增,导致百分率达到100。
如果百分比大于50%,您应当:
* 增加允许打开文件的最大数量 :
    * 在你开始TOMCAT前,每次都做这些改变 (把它们放进Tomcat启动器里?) 数字 :
无限制 - Hn 16384
ulimit -Sn 16384 (英语).
    * 或者通过编辑永久更改 (作为根) /etc/security/limits.conf 并添加线条:
Tomcat 软无文件 16384
Tomcat 硬无文件 16384
这些命令假设运行Tomcat的用户被称为"Tomcat".
在许多 Linux 变体上, 您必须重新启动服务器来应用这些更改 。 对于这两种选择,上面的"16384"就是一个例子. 你选择你认为最好的号码。
* 重新开始ERDDAP。 。 。 操作系统将关闭任何打开的文件 。
         
### 请求失败{#failed-requests} 
*    **异常活动: &gt; 25%的请求失败**   
作为每一次重装Datasets的一部分,通常每15分钟一次,ERDDAP™查看自上次重新装入 Datasets 以来请求失败的百分比 。 如果是大于25%,ERDDAP™发送电子邮件到ERDDAP™具有“ 异常活动 : &gt; 25% 请求失败” 主题的管理员 。 该电子邮件包含一个位于底部附近的计数器,名为“请求者IP地址” (失败)   (自上次加载主要任务以来) " .. 寻找这个。 它告诉你计算机的IP地址 最失败的请求。 您可以在\\[大家长会\\]/日志/[日志.txt](#log)文档,看看他们正在提出什么样的请求。
    
您可以使用用户的 IP 号码 (例如,与[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) 试图找出用户是谁或是什么。 有时会非常准确地告诉你用户是谁 (例如,它是一个搜索引擎的网络爬行器) 。 。 。 大多数时候它只是给你一个线索 (比如说,它是一个Amazonaws电脑, 它来自一些大学, 它是某个特定城市的人) 。 。 。 。
    
查看实际请求、IP号码和错误消息 (全部从[日志.txt](#log)) 对于一系列错误,你通常可以 基本上找出什么是错的。 根据我的经验,许多请求失败的原因有四个:
    
(1) 请求是恶意的 (例如,寻找安全弱点,或提出请求,然后在完成这些请求之前予以取消) 。 。 。 。 你应该用&lt;请求黑名单 &gt; 输入datasets.xml将IP地址列入黑名单。
    
2)搜索引擎天真地尝试了列表中的 URLERDDAP™网页和ISO 19115文档. 例如,有许多地方列出基点OPeNDAP例如,URL, https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST ,用户应该添加文件类型 (例如,.das、.dds、.dds、.dds、.dds .html (中文(简体) ).) 。 。 。 但搜索引擎并不知道这一点. 而对基址的请求失败 。 一个相关的情况是,搜索引擎生成奇异的请求或试图填写表格,以便"隐藏"网页. 但搜索引擎经常做坏事,导致故障. 解决办法是:[机器人.txt](#robotstxt)文档。
    
3)一些用户正在运行一个脚本,它不断要求一些不存在的东西. 也许它是一个数据集 曾经存在,但现在已经消失 (暂时或永久) 。 。 。 脚本经常不期望这样,所以不要明智地处理. 因此,脚本只是不断提出请求,而请求一直失败. 如果你能猜到谁是用户 (从上面的IP号码) ,联系他们,告诉他们数据集已经不可用,请他们更改脚本。
    
4)一些数据集确实有问题. 通常,ERDDAP™将会使麻烦的数据集不活动。 有时候不会,所以所有的要求都只会导致错误. 如果是,请解决数据集的问题,或 (如果你做不到的话) 将数据集设置为[活动=“虚假”](/docs/server-admin/datasets#active)。 。 。 当然,这可能导致问题2。
    
有时错误并不那么严重 特别是如果ERDDAP™能够发现错误并迅速作出反应(&lt;=1ms) (中文(简体) ). 所以你可以决定不采取行动。
    
如果其他所有失败,则有一个通用的解决方案:将用户的IP号码添加到 [&lt;请求黑名单 &gt;] (/docs/server-admin/datas# 请求黑名单) 。 。 。 这不是那么糟糕 也不是那么激烈的选择 用户会收到一个错误消息 说s/he已经被列入黑名单 并告诉他们你的 (联合国ERDDAP™管理员) 电子邮件地址 。 有时用户会联系您,您可以解决问题. 有时用户不联系你,你第二天就会看到来自不同IP号码的完全相同的行为. 黑名单新IP号码,希望他们最终能收到消息. (或者这是你的土拨鼠节,你们绝不能逃避它。 对不起) 
    
### 机器人.txt{#robotstxt} 
搜索引擎公司使用网络爬行器 (例如,谷歌 瓶装) 来检查网上的所有网页,以便将内容添加到搜索引擎中。 对于ERDDAP™这基本上是好的。ERDDAP™页面之间有很多链接,所以爬行者会找到所有网页并添加到搜索引擎中. 这样,搜索引擎的用户就可以在您身上找到数据集ERDDAP。 。 。 。
    
可惜的是,有些网路爬行者 (例如,谷歌 瓶装) 目前正在填写和提交表格,以便找到其他内容。 对于网站商业网站来说,这是伟大的。 但这太可怕了ERDDAP™因为它只是导致一个 **无限** 试图获取实际数据的次数。 这可能导致对数据的要求比所有其他用户的要求加起来还要多。 它让搜索引擎充满了愚蠢的,无意义的数据子集。
    
要让网络爬行者停止填写表格, 只是一般不查看他们不需要查看的网页, 您需要创建名为“ 文本文件” 的文本文件 。[机器人.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)在您网站文档等级的根目录中,这样任何人都可以将其视为,例如, http://*www.your.domain*/robots.txt 。 。 。 。
如果你正在创造一个新的机器人。 txt 文件, 这是一个好的开始 :
```
    User-Agent: \\*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\\*?
    Disallow: /\\*?\\*
    Disallow: /\\*.asc\\*
    Disallow: /\\*.csv\\*
    Disallow: /\\*.dods\\*
    Disallow: /\\*.esriAscii\\*
    Disallow: /\\*.esriCsv\\*
    Disallow: /\\*.geoJson\\*
    Disallow: /\\*.htmlTable\\*
    Disallow: /\\*.json\\*
    Disallow: /\\*.mat\\*
    Disallow: /\\*.nc\\*
    Disallow: /\\*.odvTxt\\*
    Disallow: /\\*.tsv\\*
    Disallow: /\\*.xhtml\\*
    Disallow: /\\*.geotif\\*
    Disallow: /\\*.itx\\*
    Disallow: /\\*.kml\\*
    Disallow: /\\*.pdf\\*
    Disallow: /\\*.png\\*
    Disallow: /\\*.large\\*
    Disallow: /\\*.small\\*
    Disallow: /\\*.transparentPng\\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
     (但换掉 *您所在的机构 url* 还有你的ERDDAP基础 URL 。)   
搜索引擎可能需要几天的时间才能注意到,更改才能生效。
     
### 站点地图.xml{#sitemapxml} 
作为[ https://www.sitemaps.org ](https://www.sitemaps.org/)网站说:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

其实,自从ERDDAP™这是RESTful搜索引擎蜘蛛可以轻松爬行ERDDAP。 。 。 但他们经常这样做 (日报&#33;) 必要时 (一个月?) 。 。 。 。

* 由于每个搜索引擎 可能正在爬你的全部ERDDAP™每天,这会导致大量不必要的请求.
* 这么说ERDDAP™为您生成 sitemap.xml 文件ERDDAP™它告诉搜索引擎ERDDAP™只是每个月都要爬起来
* 您应该添加一个引用ERDDAP' sitemap.xml 到您的网站[机器人.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)文件 :
对象 : http://**www.yoursite.org**/erddap/sitemap.xml
 
* 如果这似乎没有给爬行者带来信息,您可以通过访问这些 URL 来告诉各个搜索引擎有关 sitemap.xml 文件的信息 (但变化 **您的学院** 缩略语或缩略语 **网址:www.yoursite.org** 给您的ERDDAP' URL( URL )) 数字 :
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I 想想看,你只需要打每个搜索引擎一次,永远。 然后,搜索引擎将定期检测到对sitemap.xml的更改。
     
### 数据传播/数据分发 网络 :Push和Pull技术{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* 一般情况下ERDDAP™充当中介:它需要用户的请求;从远程数据源获取数据;重构数据;并将其发送给用户。
*   [Pull技术](https://en.wikipedia.org/wiki/Pull_technology)数字 :ERDDAP™还能够积极从远程数据来源获取所有现有数据,[存储本地数据副本](/docs/server-admin/datasets#eddgridcopy)。 。 。 。
*   [Push技术](https://en.wikipedia.org/wiki/Push_technology)数字 : 通过使用ERDDAP因为[订阅服务](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions),一旦有了新的数据,其他数据服务器就可以立即通知,以便它们可以请求数据 (通过拉动数据) 。 。 。 。
*   ERDDAP因为[EDDGrid从埃尔达普](/docs/server-admin/datasets#eddfromerddap)和[来自Erddap的EDD表](/docs/server-admin/datasets#eddfromerddap)使用情况ERDDAP订阅服务[旗帜系统](#flag)因此,一旦有了新的数据,将立即通知委员会。
* 你可以把这些结合到大效果: 如果你包起来EDDGrid复制周围一个EDDGrid从Erddap 数据集 (或将 EDDTable Copy 绕过 EDDTable 从 Erddap 数据集包起来) , (中文).ERDDAP™将自动创建和维护另一个的本地副本ERDDAP数据集 。
* 由于订阅服务一有新数据就发挥作用,推技术就迅速传播数据 (在秒内) 。 。 。 。

这个建筑每个ERDDAP™负责确定其数据所在的管理人ERDDAP™来从.

* 其他人员ERDDAP™管理员也可以这样做. 行政管理人员之间没有必要进行协调。
* 若数ERDDAP™管理员相互连接ERDDAPs,形成数据发布网络.
* 数据将迅速、高效和自动从数据来源传播 (ERDDAPs 和其他服务器) 到数据再分配站点 (ERDDAP编号) 在网络的任何地方。
* 给定ERDDAP™既可以成为一些数据集的数据来源,也可以成为其他数据集的再分配站点.
* 由此形成的网络大致类似于通过程序建立的数据发布网络,例如:[Unidata缺碘症/缺碘症](https://www.unidata.ucar.edu/projects/index.html#idd),但结构不太僵硬。
         
### 安全、认证和授权{#security-authentication-and-authorization} 
默认ERDDAP™作为完全公开的服务器运行 (使用http和(或)https) 没有登录 ([认证](https://en.wikipedia.org/wiki/Authentication)) 对数据访问的限制 ([授权](https://en.wikipedia.org/wiki/Authorization)) 。 。 。 。

#### 警卫{#security} 
如果您想要限制某些用户访问部分或全部数据集,您可以使用ERDDAP是内置的安全系统 当使用安全系统时:

*   ERDDAP™用途[以角色为基础的访问控制](https://en.wikipedia.org/wiki/Role-based_access_control)。 。 。 。
    * 那个ERDDAP™管理员用 [] 定义用户&lt;用户 &gt;] (/docs/server-admin/数据集#用户) 标记datasets.xml。 。 。 每个用户都有用户名、密码 (如果认证=海关) ,以及一个或多个角色。
    * 那个ERDDAP™管理员定义哪些角色可以通过[&lt;可访问工具 &gt;] (/docs/server-admin/数据集#可访问) 标记datasets.xml任何不该公开访问的数据集
* 用户的登录状态 (和登录/退出的链接) 将在每个网页的顶端显示。 (但一个登录的用户似乎ERDDAP™如果使用httpURL (中文(简体) ).) 
* 如果&lt;baseUrl &gt; 您在设置中指定的. xml 是一个 **http** URL,未登录的用户可使用ERDDAP因为 **http** URLs (英语). 若为&lt;也指定了 baseHttpsUrl&gt;,没有登录的用户也可以使用httpsURLs (英语).
* 仅限 HTTPS -- 如果&lt;baseUrl &gt; 您在设置中指定的. xml 是一个 **https** 鼓励未登录的 URL 用户 (非强迫) 用于ERDDAP因为 **https** URL - 所有已打开的链接ERDDAP™网页将参考httpsURLs (英语).
    
如果你想强迫用户使用httpsURL,在&lt;在您的 Apache 配置文件中的 VirtualHost QQ: 80 &gt; 区域 (通常httpd.conf 数据) 例如,
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

如果需要的话,还有另一种方法强迫使用https: [HTTP 严格的运输安全 (危险) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)。 。 。 。 用来:
    
    1. 启用 Apache 信头模块: a2enmod 信头
    2. 在 HTTPS VirtualHost 指令中添加额外的标题 。 最大年龄以秒计,可以设定为一定的长值.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
请注意, 此信头只在 HTTPS 虚拟Host 上有效 。
    
不强迫用户使用的理由httpsURL是:基础的SSL/TLS链接需要时间建立,然后需要时间加密和解密用户和服务器之间传输的所有信息. 但有些机构要求https仅此而已。
    
* 登录在 MUST 使用的用户ERDDAP因为 **https** URLs (英语). 如果他们使用httpURL,它们看起来ERDDAP™不得登录。 这确保了通信的隐私,有助于防止[会议劫持和侧面劫持](https://en.wikipedia.org/wiki/Session_hijacking)。 。 。 。
* 没有登录的任何人都可以访问和使用公共数据集. 默认情况下,如果用户没有登录,私人数据集不会出现在数据集列表中. 如果管理员设置了.xml's&lt;列表 PrivateDatasets &gt; 为真,它们将会出现。 试图从私人数据集请求数据 (如果用户知道 URL) 将重定向到登录页面。
* 任何登录的人均能够查看和要求从任何公共数据集和任何个人数据集获得数据,而他们的作用允许他们访问这些数据集。 默认情况下,用户无法访问的私人数据集并不出现在数据集列表中. 如果管理员设置了.xml's&lt;列表 PrivateDatasets &gt; 为真,它们将会出现。 试图从用户无法访问的私人数据集中请求数据,将会被重定向到登录页面.
* 那个RSS完全私有数据集的信息只提供给用户 (和RSS读者) 被登录并获准使用该数据集。 这样就可以RSS对完全私有的数据集不甚有用。
    
如果数据集是私有的,但[&lt;图表可访问 &gt; (/docs/server-admin/datasets#graphsauncessableto 页面存档备份,存于互联网档案馆.) 设置在公共,数据集的RSS任何人都可以进入。
    
* 电子邮件订阅只有在用户可以访问数据集时才能设置. 如果用户订阅一个私人数据集,则用户登录完毕后,订阅继续运行.

##### 设置安全{#setup-security} 
建立安全/认证/授权系统:

* 执行标准ERDDAP™ [初始设置](/docs/server-admin/deploy-install)。 。 。 。
* 内[设置. xml](/docs/server-admin/deploy-install#setupxml), (中文).
    * 添加/更改&lt;认证 &gt; 从无到自定义的值 (别用这个) 电子邮件 (别用这个) ,谷歌 (建议) 圆形 (建议) ,或 oaut2 键 (google+orcid, 建议使用) 。 。 。 见下文关于这些备选方案的评论。
    * 添加/更改&lt;baseHttpsUrl &gt; 数值。
    * 插入/解说&loginInfo;输入&lt;启动 BodyHtml &gt; ,在每个网页的顶端显示用户的输入/输出信息。
* 为了在个人电脑上测试[遵循这些指令配置 tomcat 支持 SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (基础https连接) 通过创建带有[自签名证书](https://en.wikipedia.org/wiki/Self-signed_certificate)通过修改 *移动猫* /conf/server.xml 解析端口8443的连接器. 在 Windows 上,您可能需要将 . keystore 从“ c:\\ users\\ ” 移动 *老师* \\. keystore 改为“ c:\\ 用户\\ default 用户\\. keystore ” 或“ c:\\. keystore ” (见 *移动猫* /logs/catalina. (原始内容存档于2018-09-29). *今日( E)* 如果应用程序没有加载或用户无法在页面中看到日志,则登录) 。 。 。 您可以通过登录时检查证书来看到. keystore 证书何时过期 。
    
对于可公开访问的服务器,强烈建议您购买并安装由用户签名的证书,而不是使用自签名的证书。[证书权威](https://en.wikipedia.org/wiki/Certificate_authority)因为它让你的客户更加确信 他们确实与你的ERDDAP™而不是一个男人的 中间版本你的ERDDAP。 。 。 。 许多供应商出售数字证书。 (寻找网.) 它们并不昂贵。
    
* 在Linux电脑上,如果Tomcat在Apache中运行,请修改 /etc/httpd/conf.d/sl.conf文件允许 HTTPS 流量到/从ERDDAP™不要求 URL 中的 :8443 端口号 :
    1. 修改现有的&lt;VirtualHost &gt; 标签 (如果有一个) ,或者在文件结尾处添加一个,这样它至少有这些行:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. 然后重新启动 Apache : /usr/ sbin/ apachectl - 宽宏大量 (但有时它出现在不同的目录中) 。 。 。 。
* 内 *移动猫* /conf/server.xml,不评论端口=8443&lt;连接器 &gt; 标记 :
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
并更改证书KeystoreFile的位置。
##### 授权{#authorization} 
*   [内datasets.xml,创建](#authorization)[&lt;用户 &gt;] (/docs/server-admin/数据集#用户) 标记每个用户的用户名、密码 (如果授权=海关) ,以及角色信息. 这是授权部分ERDDAP安全系统
     
* 内datasets.xml,添加 [&lt;可访问工具 &gt;] (/docs/server-admin/数据集#可访问) 标记不应公开访问的每个数据集。&lt;accessableTo &gt; 允许您指定哪些角色可以访问该数据集。
     
* 重新开始汤姆卡特。 麻烦? 请检查tomcat日志。
     
* 检查你的工作&#33; 任何错误都可能导致安全缺陷。
     
* 检查登录页面是否使用https  (没有http) 。 。 。 。 尝试通过http应自动重定向到https和港口 (尽管端口号码可能通过Apache 代理隐藏) 。 。 。 您可能需要与您的网络管理员合作, 允许外部的网络请求访问您的服务器上的端口 8443 。
     
* 你可以改变&lt;用户 &gt; 和&lt;随时可访问To &gt; 标记。 这些修改将在任何数据集的下一次常规重载时应用,或者如果使用一个[旗帜](#flag)。 。 。 。

##### 认证{#authentication} 
[ **认证 (登录) ** ](#authentication)  
如果您不想让用户登录, 请不要指定一个值&lt;认证&gt; in setup.xml.
如果您想要让用户登录, 您必须指定一个值&lt;认证&gt;. 目前,ERDDAP™支持
[自定义](#custom)  (别用这个) , (中文).
[电子邮件](#email)  (别用这个) , (中文).
[谷歌](#google)  (建议) , (中文).
[圆形](#orcid)  (建议) ,以及
[欧斯2](#oauth2)  (建议) 用于认证方法。
如果您想要启用登录, 我们强烈推荐google, orcid, 或 oauth2 选项, 因为这些选项使您无法存储和处理用户的密码 (定制需要) 并且比电子邮件选项更安全。 记住,用户在不同的网站经常使用相同的密码. 所以他们可能用同样的密码来对付你ERDDAP™就像他们在银行一样 这使得他们的密码非常宝贵——对用户来说比他们所要求的数据更有价值。 所以你需要尽你所能 保持密码的保密。 这是一项重大的责任。 电子邮件,google,orcid,和oauth2选项会处理密码,所以不需要收集,存储,或与它们合作. 所以,你摆脱了这种责任。

全体&lt;认证 &gt; 选项使用 a[饼干](https://en.wikipedia.org/wiki/HTTP_cookie)在用户的计算机上,所以必须设置用户的浏览器允许cookie. 如果用户正在制作ERDDAP™来自计算机程序的请求 (不是浏览器) 饼干和认证很难用 这是所有认证系统的共同问题. 对不起

详细情况&lt;认证 &gt; 选项是:

###### 自定义{#custom} 
自定义是ERDDAP通过在网页上输入用户名称和密码的表格来允许用户登录的自定义系统. 如果用户在10分钟内尝试并未能登录3次,则该用户被禁止尝试登录10分钟. 这使得黑客无法简单地尝试数百万个密码直到找到正确的密码.

这有些安全,因为用户名和密码是通过https  (没有http) ,但认证=google, orcid, 或 oauth2 更好,因为它们可以让你不必处理密码。 自定义方法要求您收集用户姓名和密码的散列摘要 (用你的电话&#33; 电子邮件不安全&#33;) 并储存在datasets.xml[&lt;用户 &gt;] (/docs/server-admin/数据集#用户) 标记。

使用自定义选项, 在您之前没有人可以登录 (联合国ERDDAP™管理员) 创建一个&lt;用户&gt;标记给用户,指定用户名为用户名,将其密码作为密码的散列摘要,以及他们的角色.

未建议
由于生成和传输用户密码的散列摘要的尴尬性,也由于与ERDDAP™保存密码的散列摘要,不建议使用此选项。

为增加此选项的安全性:

* 您必须确保服务器上的其他用户 (即 Linux 用户, 不ERDDAP™用户) 无法在 Tomcat 目录中读取文件 (特别是datasets.xml档案&#33;) 或ERDDAP"大家长董事会".
在Linux上,作为用户=tomcat,使用:
chmod - R g - rwx 图像 *大家长会*   
chmod - R 欧鲁克斯 *大家长会*   
chmod - R g - rwx 图像 *Tomcat 编目*   
chmod - R 欧鲁克斯 *Tomcat 编目*   
     
* 使用UEPSHA256来进行&lt;密码编码&gt; in setup.xml.
     
* 使用安全可用方法将用户密码的散列摘要从用户传递到用户ERDDAP™管理员 (电话?) 。 。 。 。
         
###### 电子邮件{#email} 
电子邮件认证选项使用用户的电子邮件账户认证用户 (发送电子邮件,并附有他们必须访问的特殊链接,以便登录) 。 。 。 。 不像其他邮件ERDDAP™发送ERDDAP™不将这些邀请邮件写入电子邮件日志文件,因为它们包含机密信息。
在理论上,这并非非常安全,因为电子邮件并不总是加密的,所以一个有能力截取电子邮件的坏人可以通过使用有效的用户的电子邮件地址和截取邀请邮件来滥用这个系统.
在实际中,如果你设置ERDDAP™使用 Google 电子邮件账户发送电子邮件,如果设置该账户用于连接的 TLS 选项之一,如果用户有 Google 电子邮件账户,则该账户的安全性一定,因为电子邮件是加密的。ERDDAP™给用户。

为增加此选项的安全性:

* 确保服务器上的其他用户 (即 Linux 用户, 不ERDDAP™用户) 无法在Tomcat目录中读取文件或ERDDAP"大家长董事会".
在Linux上,作为用户=tomcat,使用:
chmod - R g - rwx 图像 *大家长会*   
chmod - R 欧鲁克斯 *大家长会*   
chmod - R g - rwx 图像 *Tomcat 编目*   
chmod - R 欧鲁克斯 *Tomcat 编目*   
     
* 为发送的电子邮件设置端到端的安全性ERDDAP™给用户。 例如,你只能创建以谷歌为中心的系统&lt;用于 Google 管理的电子邮件地址的用户 &gt; 标签, 并设置您的地址ERDDAP™通过安全/ TLS 连接使用 Google 电子邮件服务器: 在您的设置中. xml, 例如使用
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

未建议
不推荐电子邮件认证选项 。 请使用google, orcid, 或 oauth2 选项代替 。

如同谷歌、圆形和Oauth2选项一样,电子邮件非常方便ERDDAP™管理员--你不需要处理密码或他们的散列文摘。 你只需要创造一个&lt;用户 &gt;] (/docs/server-admin/数据集#用户) 用户的标签datasets.xml是用户的电子邮件地址, 该地址ERDDAP™用作用户名。 (密码属性在认证=电子邮件,google,orcid,或oauth2时不使用.) 

使用电子邮件选项时,只有拥有&lt;用户 &gt; 标记在datasets.xml可以尝试登录到ERDDAP™通过提供电子邮件地址和点击电子邮件中的链接ERDDAP™派他们来

ERDDAP™将电子邮件地址视为对大小写不敏感。 它通过转换您输入的电子邮件地址( 在&lt;用户 &gt; 标记)或用户输入 (登录窗体) 所有小写版本。

要设置认证=电子邮件 :

1. 在您的设置. xml, 更改&lt;baseHttpsUrl &gt; 标记值。
用于实验/操作您的个人计算机,使用
     https://localhost:8443   
为了你的公众ERDDAP™编辑
     https://*your.domain.org*:8443   
或者不使用:8443 如果你使用阿帕奇语[代理密码](/docs/server-admin/deploy-install#proxypass)这样就不需要端口号码了
     
2. 在您的设置. xml, 更改&lt;认证 &gt; 标签对电子邮件的值 :
```
    <authentication>email</authentication>  
```

3. 在您设置的. xml 中, 确保电子邮件系统通过所有&lt;电子邮件... &gt; 标记, 因此ERDDAP™可以发送电子邮件。 如果可能, 请设置此选项以使用安全连接 (SSL / TLS 软件) 到电子邮件服务器。
     
4. 在你身边datasets.xml,创建 [&lt;用户 &gt;] (/docs/server-admin/数据集#用户) 标记给每个可以访问私人数据集的用户。
使用用户的电子邮件地址作为标签中的用户名 。
不要在用户标签中指定密码属性 。
     
5. 重新开始ERDDAP™以便更改设置.xml和datasets.xml生效。
         
###### Google, orcid, oauth2 (英语).{#google-orcid-oauth2} 
*   [ **谷歌** ](#google), (中文).[ **圆形** ](#orcid),以及[ **欧斯2** ](#oauth2)   (建议)   
建议采用这三项备选方案。ERDDAP™认证选项。 这些都是最安全的选项。 其他选择的安全性明显薄弱。
     
###### 谷歌{#google} 
* Google 认证选项使用[签名 进入谷歌](https://developers.google.com/identity/gsi/web/guides/overview),执行[OAuth 2.0 认证协议](https://oauth.net/2/)。 。 。 。ERDDAP™用户在他们的Google电子邮件账户上签名,包括Google管理的账户,例如@noaa.gov账户。 允许ERDDAP™以验证用户身份 (名称和电子邮件地址) 并访问其配置图像,但不给出ERDDAP™访问他们的电子邮件,他们的Google Drive,或任何其他私人信息。
    
对于ERDDAP™v2.22及以下,ERDDAP™使用"Google Sign-In". Google说,该系统在2023年3月31日之后贬值. 如果你还没有这样做,请切换到ERDDAP™v2.23+使用新的基于Google的认证系统.
    
对于ERDDAP™v2.23 配置并使用 Google 认证的内容- 安全政策实例, 您需要添加 https://accounts.google.com 到允许脚本的列表 (或脚本字符串) 。 。 。 。ERDDAP™不再使用 https://apis.google.com ,所以如果你有 允许,你也许可以删除它了。
    
对于ERDDAP™v2.24+ 您可能需要添加 https://accounts.google.com/gsi/style 以斜弧和 https://accounts.google.com/gsi/ 以连接-src。 现在可以使用脚本弧 https://accounts.google.com/gsi/client.
 
    
欲了解更多信息,请前往[谷歌页面](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)关于CSP配置. 如果有任何问题,请联系noaa.gov的chris.john.
         
###### 兽人{#orcid} 
* 整形认证选项用途[兽科认证](https://members.orcid.org/api/integrate/orcid-sign-in),执行[OAuth 2.0 认证协议](https://oauth.net/2/)。 。 。 。ERDDAP™用户在他们的[兽科账户](https://members.orcid.org/api/integrate/orcid-sign-in),这被研究人员通常用来识别自己. 允许ERDDAP™以验证用户的 Orcid 身份并获得其 Orcid 帐号,但不给出ERDDAP™获取其他Orcid账户信息。

###### 奥氏2型{#oauth2} 
* oauth2选项让用户用他们的Google账户或Orcid账户签名.

google, orcid, 和 oauth2 选项是 Openid 选项的后继者, 它在 Openid 选项之后中止了 。ERDDAP™1.68版本,基于开放版本 身份证明已经过时了 请切换到google, orcid, 或者 oauth2 选项 。

这些选择非常方便ERDDAP™管理员--你不需要处理密码或他们的散列文摘。 你只需要创造一个&lt;用户 &gt;] (/docs/server-admin/数据集#用户) 用户的标签datasets.xml指定用户的 Google 电子邮件地址或 Orcid 帐号为用户名属性。 (密码属性在认证=电子邮件,google,orcid或oauth2时不使用.) 

通过这些选项,任何人都可以登录到ERDDAP™在Google电子邮件账户或Orcid账户上签字,但除非你 (联合国ERDDAP™管理员) 创建一个&lt;用户&gt;标签,指定他们的Google电子邮件地址或Orcid帐号为用户名,并指定他们的角色.

ERDDAP™将电子邮件地址视为对大小写不敏感。 它通过转换您输入的电子邮件地址( 在&lt;用户 &gt; 标记)或用户输入 (登录窗体) 所有小写版本。

要设置google, orcid, 或 oauth2 认证 :

* 在您的设置. xml, 更改&lt;baseHttpsUrl &gt; 标记值。
用于实验/操作您的个人计算机,使用
     https://localhost:8443   
为了你的公众ERDDAP™编辑
     https://*your.domain.org*:8443   
或者,更好的,没有:8443 如果你使用阿帕奇[代理密码](/docs/server-admin/deploy-install#proxypass)这样就不需要端口号码了
     
* 在您的设置. xml, 更改&lt;认证 &gt; 标记对 google, orcid, 或 oauth2 的值, 例如 :
```
    <authentication>oauth2</authentication>  
```
###### 谷歌设置{#google-setup} 
* 对于google和oath2选项:
遵循以下指令为您设置 Google 认证ERDDAP。 。 。 。
     
    1. 如果你没有谷歌电子邮件账户[创建一个](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. 跟着[这些指示](https://developers.google.com/identity/sign-in/web/devconsole-project)创建 Google 开发者控制台项目,并获得客户端ID。
        
当Google表格要求授权时Java脚本来源, 输入从&lt;BaseHttpsUrl&gt; 来自您的个人计算机ERDDAP™设置.xml,例如,
         https://localhost:8443   
在第二行,添加&lt;baseHttpsUrl&gt; 来自您的公众ERDDAP™设置.xml,例如,
         https://*your.domain.org*:8443
 
        
不要指定任何授权重定向核磁共振。
        
当您看到此工程的客户端标识时, 请复制并粘贴到您的设置. xml( 通常在下面)&lt;认证 &gt; 要有序, 但放置实际上并不重要), 在&lt;googleClientID &gt; 标签,例如,
        &lt;google 客户端ID &gt; *您的客户端* &lt;/googleclientID] (中文(简体) ).
客户端ID将是一个约75个字符的字符串,可能从几个数字开始,最后是.apps.googleusercontent.com.
         
        
    3. 在你身边datasets.xml,创建 [&lt;用户 &gt;] (/docs/server-admin/数据集#用户) 标记将访问私人数据集的每个用户。 对于标签中的用户名属性 :
        
        * 对于将使用google签名的用户,使用用户的Google电子邮件地址.
        * 用户使用 Orcid 的帐号 (带有破折号) 。 。 。 。
        
不要指定用户标签的密码属性 。
         
    4. 重新开始ERDDAP™以便更改设置.xml和datasets.xml生效。
         
###### 兽科设置{#orcid-setup} 
* 对于圆形和欧氏2号选项:
遵循以下指令为您设置 Orcid 认证ERDDAP。 。 。 。
     (详情见[Orcid 认证 API 文档](https://members.orcid.org/api/integrate/orcid-sign-in)。 。 。 。)   
     
    1. 如果你没有兽人账户[创建一个](https://orcid.org/signin)  
         
    2. 登录到 Orcid[ https://orcid.org/signin ](https://orcid.org/signin)使用你的私人兽人账户。
         
    3. 点击“ 开发工具” (在顶端的“为研究人员”栏下) 。 。 。 。
         
    4. 点击"免费ORCID公共API的注册". 输入此信息 :
名称 :ERDDAP™时间\\[您的组织\\]  
网站:\\[您的电话ERDDAP域名\\]  
说明 :ERDDAP™是一个科学数据服务器。 用户需要通过Google或Orcid认证才能访问非公共数据集.
重定向 URI :\\[您的电话ERDDAP域名\\]/erddap/loginOrcid.html (中文(简体) ).
         
    5. 点击保存图标 (它看起来像一个3.5"磁盘&#33;) 。 。 。 。
然后可以看到您的 ORCID AP 客户端 ID 和 ORCID 客户端 机密 。
         
    6. 复制并粘贴 ORCID AP 客户端 ID (从"APP -"开始) 输入设置.xml&lt;orcidClientID &gt; 标记,例如,
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. 复制并粘贴 ORCID 客户端机密 (小写带有破折号的字母数字字符) 输入设置.xml&lt;orcidClientSecret &gt; 标记,例如,
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. 在你身边datasets.xml,创建 [&lt;用户 &gt;] (/docs/server-admin/数据集#用户) 标记将访问私人数据集的每个用户。 对于标签中的用户名属性 :
        
        * 对于将使用google签名的用户,使用用户的Google电子邮件地址.
        * 用户使用 Orcid 的帐号 (带有破折号) 。 。 。 。
        
不要指定用户标签的密码属性 。
         
    9. 重新开始ERDDAP™以便更改设置.xml和datasets.xml生效。
             

###### 以任意方式登录{#log-in-either-way} 
如果您使用google, orcid, 或 oauth2 认证选项, 以及 Google Sign- In 或 Orcid 认证 API 突然停止工作 (无论出于什么原因) 或停止从事ERDDAP™用户无法登录到您ERDDAP。 。 。 。 暂时的 (或常设) 解决方案,您可以要求用户与其他系统签约 (获取 Google 电子邮件账户或 Orcid 账户) 。 。 。 。 要做到这一点:

1. 改变&lt;认证&gt; 标记使其允许其他认证系统. oauth2 选项允许用户登录其中任一系统。
2. 复制每张&lt;用户&gt; 标记和用户名属性从 Google 电子邮件地址更改为相应的 Orcid 帐号 (或反之为) ,但角色属性不变。

###### 打开文件{#openid} 
ERDDAP™不再支持基于一个版本的 Openid 认证选项 身份证明已经过时了 请使用google, orcid, 或者 oauth2 选项 。

###### 基础{#basic} 
ERDDAP™不支持BASIC认证,因为:
* BASIC似乎倾向于预先定义的网页,需要安全进入或覆盖整个网站,但ERDDAP™允许 (限制进入) 数据集将添加在“飞行”上。
* BASIC认证不提供用户登录的方法&#33;
* BASIC认证已知不安全.

##### 安全数据源{#secure-data-sources} 
如果数据集限制进入ERDDAP™用户,数据源 (从何处ERDDAP™获取数据) 不应向公众开放。 怎么会ERDDAP™获取限制访问数据集的数据吗? 一些选项是:

*   ERDDAP™能够服务本地文件的数据 (例如,通过EDD表 从文件或EDDGrid从文件) 。 。 。 。
     
*   ERDDAP™可以在一个[非军事区](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing))和数据源 (例如,aOPeNDAP服务器或数据库) 可能背后是一个[防火墙](https://en.wikipedia.org/wiki/Firewall),在可以进入的地方ERDDAP™但不对公众。
     
* 数据来源可以在公共网站上,但需要登录才能获得数据. 这两类数据集ERDDAP™可以登录访问是[数据库中的 EDD 表格](/docs/server-admin/datasets#eddtablefromdatabase)和[来自卡桑德拉的EDD表](/docs/server-admin/datasets#eddtablefromcassandra)。 。 。 。 这些数据集支持 (应始终使用) 用户名 (创建一个ERDDAP™只拥有只读权限的用户) 、密码、SSL连接和其他安全措施。
    
但总的来说,目前,ERDDAP™无法处理这些数据源,因为它没有记录数据源的规定. 这就是为什么进入[EDDGrid从 Erddap 和 EDD 表格 从埃尔达普](/docs/server-admin/datasets#eddfromerddap)数据集不能被限制. 目前,当地ERDDAP™无法登录和访问远程元数据信息ERDDAP。 。 。 并且把"远"ERDDAP™在防火墙后移除可以访问的数据集 限制并不能解决问题:因为用户请求EDDXxx 从Erddap数据需要重定向到远程ERDDAP™,遥控器ERDDAP™必须是无障碍的。
    
#### 保护黑客{#defenses-against-hackers} 
有坏人黑客试图利用服务器软件的安全弱点,比如ERDDAP。 。 。 。ERDDAP™遵循共同的安全建议,有几层防线:

* 限制性特权 -- -- 最重要的防御之一是通过一个没有密码的用户运行Tomcat (所以没有人可以登录为用户) 且文件系统权限有限 (例如,只读访问数据) 。 。 。 。 见ERDDAP说明[设置Tomcat](/docs/server-admin/deploy-install#tomcat)。 。 。 。
* 重型用途 - 总之,ERDDAP™是为大量使用而建造的,包括提出数万项请求的脚本。 这很难ERDDAP™(b) 既允许大量合法使用,又防止滥用。 有时很难区分重型合法使用、过度合法使用和非法使用。 (有时候也很容易) 。 。 。 。 除其他辩护人外ERDDAP™有意不允许单项请求使用系统资源的过小部分 (除非系统在其他方面没有活动) 。 。 。 。
* 识别有问题的用户 - 如果ERDDAP™正在减速或冻结 (也许因为一个天真用户或机器人正在运行多个脚本来同时提交多个请求,也可能是因为一个坏人[拒绝服务](https://en.wikipedia.org/wiki/Denial-of-service_attack)攻击) 你可以看着[每日报告电子邮件](#daily-report)  (更频繁的相同信息[ERDDAP™日志文件](#log)) 显示最活跃用户提出的请求数 (见“请求者的IP地址” (允许) " , ") 。 。 。 。ERDDAP™并随时向管理员发送电子邮件["不寻常的活动: &gt; 25%的请求失败"](#failed-requests)。 。 。 。 那你可以进去看看ERDDAP™日志文件以查看其请求的性质。 如果你觉得有人提出了太多的要求 奇怪的要求 (你不会相信我所见所闻) ,或攻击类型的请求,可以将其IP地址添加到黑名单中.
* 黑名单 - 您可以添加麻烦用户的 IP 地址, bots, 以及[拒绝服务](https://en.wikipedia.org/wiki/Denial-of-service_attack)攻击者:ERDDAP [黑名单](/docs/server-admin/datasets#requestblacklist)因此,他们今后的请求将立即被拒绝。 此设置在datasets.xml这样您就可以在列表中快速添加一个 IP 地址,然后[旗帜](#flag)数据集,以便ERDDAP™立即通知并应用更改。 发送给黑名单用户的错误消息鼓励他们联系ERDDAP™管理员,如果他们觉得自己被错误地列入黑名单。 (根据我们的经验,几个用户一直不知道他们同时运行多个脚本,或者他们的脚本正在提出无稽之谈的要求.) 
* 数据集安全 - 一些类型的数据集 (特别是数据库中的EDD表) 新的安全风险 (例如,SQL注射) 并且有自己的安全措施。 参见关于这些类型数据集的信息[与datasets.xml文件](/docs/server-admin/datasets),特别是,[数据库安全](/docs/server-admin/datasets#database-security)。 。 。 。
* 安保审计 -- -- 虽然NOAAIT安全部门拒绝了我们多年的扫描请求 他们现在例行扫描我 (鲍勃的)  ERDDAP™安装。 虽然最初的扫描发现了一些问题,我后来解决了,但后来的扫描没有发现问题。ERDDAP。 。 。 扫描很担心很多事情 特别是因为tabledap请求看起来像 SQL 请求, 他们担心 SQL 注射弱点。 但是这些关切是没有根据的,因为ERDDAP™总是解析和验证查询,然后单独构建SQL查询,以避免注入弱点. 他们有时抱怨的另外一件事 就是我们Java版本或Tomcat版本并没有像他们想要的那样最新,所以我们更新它们以回应. 我之前曾提出要向人们展示安全报告,但现在被告知我不能这么做.

#### 有问题吗? 建议?{#questions-suggestions} 
如果你有任何问题ERDDAP安全系统 或对系统设置有任何疑问、怀疑、关切或建议[关于获得额外支助的章节](/docs/intro#support)。 。 。 。
    

## 你不需要知道的东西{#things-you-dont-need-to-know} 

这些细节你不需要知道 直到有需要。

### 第二届ERDDAP™ {#second-erddap} 
*    **设置第二个ERDDAP™测试/开发**   
如果你想这样做,有两种办法:
    *    (最佳) 安装 Tomcat 和ERDDAP™除了你公开的计算机之外ERDDAP。 。 。 如果你使用个人电脑:
        1. 一步一步安装. 让Tomcat起来先跑
Tomcat在跑的时候 Tomcat经理应该在场
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (也许[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. 安装ERDDAP。 。 。 。
        3. 不要使用代理Pass来删除端口编号ERDDAP™URL (中文(简体) ).
        4. 内[设置. xml](/docs/server-admin/deploy-install#setupxml),设置基数 http://127.0.0.1:8080
 
        5. 在你开始这个之后ERDDAP™你应该能在
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (也许[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### 第二个汤姆卡特{#second-tomcat} 
*    (第二个最佳) 在您的公开电脑上安装另一个 TomcatERDDAP。 。 。 。
    1. 一步一步安装. 让Tomcat起来先跑
更改与第二个 Tomcat 相关的所有端口编号 (例如,将8080改为8081)   (见[多个 Tomcat 实例部分](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)过了一半的文件) 。 。 。 。
    2. 安装ERDDAP™在新的汤姆卡特。
    3. 不要使用代理Pass来删除端口编号ERDDAP™URL (中文(简体) ).
    4. 内[设置. xml](/docs/server-admin/deploy-install#setupxml),设置基数 http://www.*yourDomainName*:8081
 
    5. 在你开始这个之后ERDDAP™你应该能在
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### 固态驱动器{#solid-state-drives} 
*    **固态驱动器 (SSD 系统定义) 不错&#33;**   
最快、最简单、最便宜的加速方式ERDDAP访问表格数据是将数据文件放到固态驱动器上 (SSD 软件) 。 。 。 大多数表格数据集相对较小,因此1或2 TB SSD可能足以保存所有表格数据集的所有数据文件. SSD最终会磨损,如果你将数据写入一个单元格,删除它,并将新数据写入该单元格太多次. 所以,如果你仅仅使用你的SSD来写入数据一次并多次读取,即使一个消费级的SSD也会持续很长的时间,可能比任何硬盘驱动器要长得多. (HDD 数据) 。 。 。 消费者级SSD现在便宜了 (2018年,1TB为~200美元,2TB为~400美元.) 价格仍在迅速下跌。 何时ERDDAP™访问数据文件, SSD 提供两个较短的空闲度 (HDD为~0.1ms,对~3ms,对~10 (? 。 。 。) 亚马逊S3的RAID对 ~55ms) 和较高的吞吐量 (HDD为~500 MB/S,而RAID为~75 MB/s,而RAID为~500 MB/s) 。 。 。 这样你就可以得到一个巨大的 性能提升 (最高为10X/HDD) 200块&#33; 比较您系统中其他可能的改动 (10 000美元的新服务器? 35,000美元的新瑞德吗? 5千元的新网络开关? 页:1) ,这是迄今为止最好的 回报投资 (罗伊) 。 。 。 如果/ 当SSD 死亡时 (一、二、八岁) ,替换它。 不要依赖它作为长期,档案存储数据,只是数据前端副本.\\[SSD对网格化数据来说也是很好的,但大多数网格化数据集都大得多,使得SSD非常昂贵.\\]
    
如果您的服务器没有装入内存, 您的服务器的额外内存也是一种大而相对廉价的方式, 以加速所有内容ERDDAP。 。 。 。
     
    
### [重载/限制](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
大量使用,一个独立ERDDAP™可能会受到各种问题的限制。 更多信息,见[限制和解决办法清单](/docs/server-admin/scaling#heavy-loads--constraints)。 。 。 。
     
### 网格、集群和联合会{#grids-clusters-and-federations} 
在非常重的使用下,一个单独的ERDDAP™将会遇到一个或多个限制,即使是所建议的解决办法也是不够的。 在这种情况下,ERDDAP™具有便于构建可伸缩网格的特性 (也称为集群或联合会) 页:1ERDDAPs 允许系统处理非常重的使用 (例如,一个大型数据中心) 。 。 。 。 更多信息见[网格、集群和联合会ERDDAP编号](/docs/server-admin/scaling)。 。 。 。
     
### 云计算{#cloud-computing} 
几家公司开始提供[云计算服务](https://en.wikipedia.org/wiki/Cloud_computing)  (例如,[亚马逊网络服务](https://aws.amazon.com/)) 。 。 。 。[网络托管公司](https://en.wikipedia.org/wiki/Web_hosting_service)自1990年代中期以来就提供了更简单的服务,但“云”服务大大扩大了系统的灵活性和所提供的服务范围。 你可以利用这些服务来建立单一的ERDDAP™或网格/组ERDDAPs的处理非常重的使用。 更多信息见[云计算方式ERDDAP™](/docs/server-admin/scaling#cloud-computing)。 。 。 。

### 亚马逊{#amazon} 
*    **[亚马逊网络服务 (自动取款机) EC2 安装概况](#amazon)**   
    [亚马逊网络服务 (自动取款机) ](https://aws.amazon.com/)是一个[云计算服务](https://en.wikipedia.org/wiki/Cloud_computing)它提供广泛的计算机基础设施,你可以租到一个小时。 您可以安装ERDDAP™一个[弹性计算云 (欧共体2) ](https://aws.amazon.com/ec2/)实例 (他们的名字是电脑,您可以租一个小时) 。 。 。 。 AWS有一个优秀的[AWS 用户指南](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)你可以用Google来找到你可能遇到的具体问题的答案. 振作起来,这是相当多的工作开始。 但是,一旦你得到一个服务器 并运行,你可以轻松租 尽可能多的额外资源 (服务器、数据库、SSD空间等。) 以合理的价格\\[这不是亚马逊网络服务的推荐或认可. 其他云供养者.\\]
    
概述你需要做的事ERDDAP™在 AWS 上运行是 :
    
    * 一般来说,你会做所有的事情 在描述在[AWS 用户指南](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)。 。 。 。
    * 建立AWS账户.
    * 在该账户中设置一个具有管理员权限的 AWS 用户 。 登录为此用户, 以进行以下所有步骤 。
    * 弹性块存储 (统计局) 是AWS等效于您服务器上的硬盘。 当您首先创建 EC2 实例时, 将会分配一些 EBS 空间 。 这是持续的存储——当你停止EC2实例时,信息不会丢失。 如果改变实例类型, EBS 空间会自动连接到新实例上。
    * 创建一个弹性 IP 地址, 以便您的 EC2 实例有一个稳定、 公开的 URL (而不是仅仅一个私人的 URL, 每次您重启实例时都会改变) 。 。 。 。
    * 创建并启动 EC2 实例 (计算机) 。 。 。 。 范围很广[实例类型](https://aws.amazon.com/ec2/instance-types/),每个价格不同。 M4. 大或m4.x大实例很强,可能适合大多数用途,但选择任何符合你需要的地方。 您可能想要使用 Amazon 的 Linux 作为操作系统 。
    * 如果您的桌面/膝上型计算机是 Windows 计算机, 您可以使用[PutTY 语录](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html),用于 Windows 的免费 SSH 客户端,以访问您的 EC2 实例命令行。 或者,你可能有你喜欢的其他SSH程序。
    * 当您登录到您的 EC2 实例时, 您将被登录为使用“ ec2 user” 的行政用户 。 ec2-user拥有sudo权限. 所以,当你需要做一些作为根用户的事情时,使用:sudo *一些命令* 
    * 如果您的桌面/膝上型计算机是 Windows 计算机, 您可以使用[文件Zilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp),一个免费的 SFTP 程序,将文件传输到/从您的 EC2 实例。 或者,你可能有你喜欢的其他SFTP程序.
    *   [安装 Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)在你的EC2实例。
    * 遵循标准[ERDDAP™安装指令](/docs/server-admin/deploy-install)。 。 。 。
         
### 等一等,再来一次{#waitthentryagain-exception} 
用户可能会收到错误消息, 如
等待,然后再次例外:
有一个 (暂时的?) 问题。 等等,再试一次 (在浏览器中,单击重装按钮。)   
详情: GridData Accessor.increment: 部分结果\\[0 个\\]="123542730"预计为"123532800".

"Waitness Try AgainException"的概括解释是:
何时ERDDAP™正在响应用户请求,数据集可能有出乎意料的错误 (例如,从文件读取数据时出错,或者访问远程数据集时出错) 。 。 。 等一等,然后再次发出信号ERDDAP™请求失败 (到目前为止) 不过ERDDAP™应尝试快速重新装入数据集 (它呼唤[请求重装](#requestreloadasap)) 并重试请求。 通常,这种情况是成功的,用户只是看到对请求的反应很慢. 其它时候,重装失败或太慢,或者随后处理请求的尝试也失败,并扔出另一个WaitnessTryAgain. 如果那样的话ERDDAP™标记要重新装入的数据集, 但告诉用户 (通过等待,然后再尝试一次例外) 答复请求时出现失败。

这是正常的行为。 这个系统可以处理许多共同的问题.
但这种系统有可能被过度触发。 最常见的原因是ERDDAP数据集的加载没有问题,但是ERDDAP数据请求的响应确实存在问题。 不管原因是什么 解决方案都是由你来应对 数据集的错 在log.txt中查看实际错误消息并处理问题. 如果许多文件有有效的信头但数据无效 (损坏的文件) ,将文件替换为未损坏的文件。 如果一个RAID的连接是flakey的,修复它。 如果远程服务的连接是 Flakey ,请找到一种方法使其不是 Flakey 或从远程源下载全部文件,并服务本地文件的数据 。

对这一具体错误的详细解释 (上文) 为:
每个EDDGrid数据集,ERDDAP™在内存中保留轴变量值。 例如,它们被用来转换使用 " () " 格式化为索引编号。 例如,如果轴值是“10、15、20、25”,则请求 (20 (简体中文).) 将被解释为请求索引 2 (零指数) 。 。 。 。 何时ERDDAP™它验证它从源得到的轴值与内存中的轴值匹配。 通常,他们这样做。 但有时数据源发生了显著变化:例如,从轴变量开头的索引值可能已被删除 (例如,"10,15,20,25"可能会变成"20,25,30".) 。 。 。 如果发生这种情况,显然ERDDAP对请求的解释 (例如, " (20 (简体中文).) " 是指数2) 现在错了。 这么说ERDDAP™丢弃例外并呼叫 RequestReloadASAP 。ERDDAP™将很快更新数据集 (通常在几秒钟之内,通常在一分钟之内) 。 。 。 其它类似的问题也提出了Waitness Try Again例外.
    
#### 请求重装{#requestreloadasap} 
您可以在log.txt文件中看到ReadyReloadASAP在错误消息之后并经常靠近[等一等,再来一次](#waitthentryagain-exception)。 。 。 它基本上是一种内部、方案方式,用于ERDDAP™设置[旗帜](#flag)以表示数据集应当ASAP重新装入。
     
### 未删除的文件{#files-not-being-deleted} 
为少数ERDDAP™设置时,有些临时文件由ERDDAP™保持开放 (搞错了) 而不因此被删除。 在少数情况下,其中许多文件积累并占用了大量的磁盘空间.

希望这些问题可以解决 (截止ERDDAP™v2.00 (韩语).) 。 。 。 如果您看到这个问题, 请将违法文件的目录+名称发送至 Chris 。 约翰在Noaa.gov。 您有几种解决问题的选项:

* 如果文件不大,而且不会导致磁盘空间耗尽,可以忽略问题.
* 最简单的解决方案是关闭 Tomcat/ERDDAP™  (小时后受影响的用户减少) 。 。 。 在关闭期间,如果操作系统不删除文件,则用手删除. 然后重新开始ERDDAP。 。 。 。
         
### JSON - 尔德{#json-ld} 
*    **[带有 json-ld 的数据集语义标记 (贾森 链接数据) ](#json-ld)**   
    ERDDAP™现在使用[json -ld (英语). (贾森 链接数据) ](https://json-ld.org)使您的数据目录和数据集成为[语义网](https://en.wikipedia.org/wiki/Semantic_Web),这就是蒂姆·伯纳斯-李的主意,让网络内容更具有机器可读性和机器"可以理解". json- ld 内容使用[计划( schema.org)](https://schema.org/)术语和定义。 搜索引擎 ([特别是谷歌](https://developers.google.com/search/docs/data-types/datasets)) 以及其他语义工具可以使用这种结构化的标记来方便发现和索引. json-ld结构化的标记 显示为隐形人对人&lt;脚本 &gt; 代码 https://.../erddap/info/index.html 网页 (语义网[数据目录](https://schema.org/DataCatalog)) 和每个 https://.../erddap/info/*datasetID*/index.html 网页 (语义网[数据集](https://schema.org/Dataset)) 。 。 。 。 (特别感谢爱尔兰海洋研究所的Adam Leadbetter 和Rob Fuller 努力使这部分工作成为ERDDAP。 。 。 。)   
     
### 日期外 URL{#out-of-date-urls} 
数据提供者输入到数据文件的 URL 正在慢慢但肯定地变得过时 (比如说,http变成https重组网站,将NODC/NGDC/NCDC等组织重组为NCEI) 。 。 。 由此产生的断开链接是所有网站始终面临的问题。 为了对付这个ERDDAP™现在有一个系统可以自动更新过时的URL. 如果生成 Datasets Xml 看到了过时的 URL, 它将最新的 URL 添加到&lt;addAttributes&gt; &gt;. 此外,当一个数据集装入时,如果ERDDAP™看到过时的 URL, 它默默地将其更改为更新的 URL. 更改由一系列搜索/替换组合控制,定义如下:&lt;更新Urls &gt; 输入ERDDAP因为
\\[移动猫\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml文件. 你可以在那里做出改变。 如果你有修改建议 或者你觉得应该把它变成服务 (就像转换器) 请发电子邮件给克里斯 约翰在Noaa.gov。
     
### 中央统计局{#cors} 
* 中央统计局 ([跨欧林资源共享](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
"是一种允许有限资源的机制 (例如字体或ERDDAP™数据) 在从第一个资源服务域外的另一个域请求的网页上” (阿伦·朗加纳坦) 。 。 。 基本上,CORS是一个信息,可以放入回复的HTTP头条,基本上说:"如果某些其他网站,这个网站是好的. (具体或所有) 抓取资源 (例如,数据) 并公布在他们的网站上”。 因此,它是替代[贾松普](https://en.wikipedia.org/wiki/JSONP)。 。 。 。
    
开发者ERDDAP™不要自称是安全专家。 我们并不完全清楚有关中央应急部队的安全问题。 我们不想发表任何声明,支持降低安全性的行动. 所以我们就保持中立 由每个人决定ERDDAP™负责确定效益或使CORS头值风险。 一如既往,如果你ERDDAP™任何私人的数据集, 这是一个好主意 是特别小心的安全。
    
如果您想要为您的ERDDAP™,还有[现成的指示](https://enable-cors.org/index.html)描述网站管理员如何通过下级服务器软件启用 CORS 头条 (例如, Apache 或 nginx 语句) 。 。 。 。
    
### 调色板{#palettes} 
* 调色板用于ERDDAP™用于在制作图表和地图时将一系列数据值转换成一系列颜色。
    
每个调色板在 .cpt 风格调色板文件中定义,用于[格林尼治标准时](https://www.soest.hawaii.edu/gmt/)。 。 。 。 全体ERDDAP™.cpt文件是有效的 GMT .cpt 文件,但相反的不是真实的. 用于ERDDAP™,.cpt文件有:
    
    * 文件开头的可选评论行,以"#"开头.
    * 一个主节,说明调色板的片段,每行一个片段. 每个段描述线有8个值:
开始 数值, 启动Red, 启动 绿色,开始 蓝色,末端Value,末端红色,末端绿色,末端蓝色.
可能有多个段。ERDDAP™使用每段起始红/绿色/蓝色和端红/绿色/蓝色之间的线性插值。
        
我们建议每个片段指定不同的起始颜色和结束颜色,每个片段的起始颜色与上一个片段的结束颜色相同,这样调色板就可以描述一种连续混合的颜色.ERDDAP™拥有从调色板上创建带有连续混合颜色的离散颜色调色板的系统。 一个ERDDAP™用户可以指定是否要调色板是连续的 (原始内容) 或细微 (来源于原文) 。 。 。 但对于某些调色板来说,不遵循这些建议是有正当理由的.
        
    * 起始值和结束值必须是整数。
第一段必须有启动Value=0和结束Value=1.
第二段必须有启动Value=1和结束Value=2.
(原始内容存档于2018-09-26). Etc.
    * 红色、绿色和蓝色值必须是整数,从 0 开始 (无) . 255 (英语). (满载) 。 。 。 。
    * 文件的结尾必须有3行:
        1. 数据值小于最小色条的背景 rgb 颜色, 例如: B 128 128 128
它往往是第一段的启动Red,启动Green和启动Blue.
        2. 数据值大于色条最大值的前景 rgb 颜色, 例如: F 128 0 0 0
它常常是最后一段的端红,端绿,端蓝.
        3. NaN 数据值的 rgb 颜色,例如 N 128 128 128
经常是中灰色的 (页:1) 。 。 。 。
    * 每行的值必须用制表符分隔,没有外在的空格.
    
.cpt文件样本为BlueWhiteRed.cpt:
    
\\# 这是蓝白红网
0 0 128 1 0 255 (韩语).
1 0 0 255 2 0 255 255
2 0 255 255 3 255 255 255
3 255 255 255 4 255 0
4 255 255 0 5 255 0
5 255 0 6 128 0
B0 0 128号
F 128 0 0 法国
编号128 128
    
其它示例参见现有的.cpt文件. 如果一个.cpt文件有问题,ERDDAP™当 .cpt 文件被解析时, 可能会丢出错误 (这比滥用信息好) 。 。 。 。
    
您可以添加额外的调色板到ERDDAP。 。 。 你可以自己做,也可以在网上找到 (例如,在[cpt- 城市( 城市)](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) 虽然您可能要稍稍编辑其格式以符合ERDDAP.cpt的要求。 为了得到ERDDAP™要使用新的.cpt文件,将文件存储到 *移动猫* /webapps/erddap/WEB-INF/cpt文件 (每一个新版本的ERDDAP) 并且:
    
    * 如果您使用默认信件. xml 文件: 将文件名添加到&lt;调色板 &gt; 标记在
         *移动猫* /webapps/erddap/WEB-INF/class/gov/noaa/pfel/erddap/util/messages.xml.
如果你这样做,你需要做到这一点 每次升级ERDDAP。 。 。 。
    * 如果您使用自定义消息. xml 文件: 将文件名添加到&lt;调色板 &gt; 自定义信件中的标签. xml 文件 : *移动猫* /内容/erddap/消息.xml. 如果你这样做,你只需要做一次 (但是还有其它维护自定义消息的工作.xml 文件) 。 。 。 。
    
然后重新开始ERDDAP™这样ERDDAP™注意变化。 这个方法的一个优点是,可以在提交用户的列表中指定调色板的顺序. 如果您添加了收藏, 我们鼓励您添加作者首字母的前缀 。 (例如, "KT\\_" , ") 改为每个调色板的名称,以识别收藏,从而可以有多个调色板,否则,这些调色板将具有相同的名称。
    
请不要删除或更改任何标准调色板. 它们都是标准特征ERDDAP™设施。 如果您认为标准中应当包含调色板或调色板的收藏ERDDAP™因为它/它们具有普遍用途,请发电子邮件给克里斯。 约翰在Noaa.gov。
    
### 颜色栏{#colorbars} 
*    **怎么样ERDDAP™生成颜色栏中的颜色 ?** 
    
    1. 用户选择一个预定义[调色板](#palettes)或者使用默认,例如彩虹。 调色板在 GMT 风格的 .cpt 色彩调色板表格文件中存储/定义. 每一个ERDDAP预定义调色板有一个简单的整数范围, 例如 0 到 1 (如果调色板中只有一个区域) ,或0至4个 (如果调色板中有四个部分) 。 。 。 文件的每个段从n=0开始覆盖n至n+1.
    2.  ERDDAP™通过缩放预定义的调色板范围,生成一个新的.cpt文件在飞行中 (例如,0比4) 到用户所需的调色板范围 (例如,0.1至50) 然后在新调色板中为新调色板的每一节生成一节 (例如,在0.1、0.5、1、5、10、50的日志比例尺中,将有5节) 。 。 。 每个区段终点的颜色是通过在.cpt文件中查找调色板的相关区段生成的,然后线性地插入R,G,和B值. (这与GMT如何从它的彩色调色板表格文件中生成颜色相同.) 此系统允许ERDDAP™从通用调色板开始 (例如,彩虹8段,共计0至8段) 并创建自定义调色板 (例如,一种定制的彩虹,它将0.1至50毫克/升的彩虹颜色映射) 。 。 。 。
    3.  ERDDAP™然后使用新 .cpt 文件生成颜色栏中每个不同颜色像素的颜色 (,然后在图形或地图上绘制数据时对每个数据点) ,再次通过在.cpt文件中找到调色板的相关部分,然后线性地插入R、G和B值。
    
这一进程可能不必要的复杂。 但是,它解决了与日志尺度有关的问题,这些问题难以解决其他方法.
    
所以,你怎么能模仿什么ERDDAP™是做吗? 这可不容易 基本上你需要重复这个过程ERDDAP™正在使用。 如果你是一个Java程序员,可以使用同样的Java课ERDDAP™用于完成所有这些:
     *移动猫* /webapps/erddap/WEB-INF/class/gov/noaa/pfel/coastwatch/sgt/CompoundColorMap.java. 互联网档案馆的存檔,存档日期2013-12-21.
    
### 数据分发系统准则{#guidelines-for-data-distribution-systems} 
关于数据分配系统的设计和评价,可以找到更一般性的意见。[这里](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)。 。 。 。
     
### 存档 ADataset{#archiveadataset} 
包含在您的ERDDAP™安装是一个名为ArchiveADataset的命令行工具,可以帮助您归档 ((单位:千美元).zip或.tar.gz文件) 将数据集部分或全部存储在 netcdf-3 系列中.nc适合提交到的文件格式的数据文件NOAA'NCEI 存档 (.nc用于网格数据集或[.nc索马里](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)表格数据集,按[国家教育倡议NetCDF模板 v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) 。 。 。 。

存档A 数据集可以制作两种不同的归档格式:

* "原始"格式遵循这些[NCEI 存档指南](https://www.ncdc.noaa.gov/atrac/guidelines.html),此指南用于[将您的数据存档于 NCEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1),以及相关的[确保数据完整性的做法](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity)。 。 。 。
* “ Bag It” 格式制作[BagIt 文件](https://en.wikipedia.org/wiki/BagIt),美国国会图书馆所推广的标准化档案格式,由美国国会图书馆规定[BagIt v 0.97 规格](https://tools.ietf.org/html/draft-kunze-bagit-14)。 。 。 。NOAA'NCEI可能会在BagIt文件中标准化提交归档.

这并不奇怪,[全球和可变元数据](/docs/server-admin/datasets#global-attributes)那个ERDDAP™鼓励/要求几乎与NCEI鼓励/要求的文件中的CF和ACDD元数据完全相同,因此,您的所有数据集应准备通过NCEI提交[发送2NCEI](https://www.nodc.noaa.gov/s2n/)或[TRAC 目标](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI 用于档案收藏的高级跟踪和资源工具) 。 。 。 。

如果你们 (联合国ERDDAP™管理员) 使用ArchiveADataset向NCEI提交数据,然后是您 (非国家竞争性考试) 将决定何时向国家竞争性考试提交一个数据块,以及该数据块将是什么,因为你会知道何时有新数据以及如何指定该数据块 (和NCEI不会) 。 。 。 因此,ArchiveAdataset是您用来创建软件包以提交NCEI的工具.

存档A 数据集在其他情况下可能有用,例如:ERDDAP™需要转换数据集子集的管理员 (一个私人ERDDAP) 从其本地文件格式变为一组[.ncCF 文件](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA),使公众ERDDAP™可以服务于来自.ncCF文件代替原始文件.

一旦你建立了ERDDAP™运行它 (至少有一次) , 您可以在 *移动猫* /webapps/erddap/WEB-INF目录. 有一个贝壳脚本 (存档 ADataset.sh) 用于 Linux/ Unix 和批次文件 (存档 ADataset.bat) 用于 Windows 。

在Windows上,你第一次运行ArchiveADataset时,需要编辑ArchiveADataset. 带有文本编辑器的bat文件将路径更改为java. exe 文件, 以便 Windows 找到Java。 。 。 。

当你运行 ArchiveAdataset, 它会问你一系列的问题。 对于每个问题,键入一个响应,然后按 Enter. 或者按 ^C 在任何时候退出一个程序 。

或者,你可以把问题的答案, 顺序,命令行。 为此,运行程序一次并输入并写下答案. 然后,你可以创建单一的命令行 (作为参数的答案) 操作程序并回答所有问题。
如果您想要为给定参数使用默认值,则使用默认值。
使用"(") (两个双引号) 作为空字符串的占位符。
在命令行上指定参数可能非常方便,例如,如果您每月使用一次ArchiveADataset来归档一个月的数据价值. 一旦您用参数创建了命令行并保存在您的笔记或 shell 脚本中, 您只需要每个月做一些小的修改, 就可以完成该月份的存档 。

ArchiveAdataset提出的问题允许您:

* 指定原始文件或 Bagit 文件包装。 对于NCEI,使用Bagit.
* 指定拉链或柏油.gz压缩软件包 。 NCEI 使用焦油.gz。 。 。 。
* 为此归档指定联系人电子邮件地址 (它将被写入归档中的 READQQME.txt 文件) 。 。 。 。
* 指定datasetID中。
* 指定要归档的数据变量 (通常都是这样) 。 。 。 。
* 指定要归档的数据集的哪个子集。 您需要格式化子集的方式与您为数据请求格式化子集的方式相同,因此格网化的子集将不同于表格数据集.
    * 对于网格化的数据集,可以指定最左维的数值范围,通常就是时间范围. ArchiveADataset将单独提出请求,并为数值范围内的每个值生成单独的数据文件. 由于网格数据集通常很大,你几乎总是需要相对于整个数据集的大小指定一个小子集.
举例来说,\\[ (2015-12-01 (中文(简体) ).) 数字 : (2015-12-31 (中文(简体) ).) \\]\\[\\]\\[\\]\\[\\]
    * 对于表格数据集,您可以指定任何约束的收集,但往往是一定的时间范围. 由于表格数据集通常很小,所以往往可以不指定约束,这样整个数据集就可以存档.
例如, & Time &#123;&#123;&#125;2015-12-01&#125; 时间&lt;2016-01-01 (中文(简体) ).
* 对于表格数据集:指定一个包含0个或更多变量的逗号分隔列表,以确定存档数据如何被进一步子集到不同的数据文件中. 用于拥有
    [cdm\\_data\\_ 类型](/docs/server-admin/datasets#cdm_data_type)时间序列|时间序列文件|轨迹|轨迹文件
您应该几乎总是指定一个变量,该变量具有 CfQQX role=time 序列QQid (例如,stationID) 或cf\\_role=trajectory\\_id属性. ArchiveAdataset将单独提出请求,并为这些变量的每个值组合生成一个单独的数据文件,例如每个变量的数据组合stationID。 。 。 。
对于所有其他表格数据集,您可能不会为此指定任何变量。
警告: 如果您正在归档的数据集子集非常大 (&gt;2GB 常规) 并且没有适合此目的的变量, 那么 ArchiveAdataset 无法使用此数据集 。 这应该很罕见
* 指定将创建的数据文件的文件格式。
用于网格数据集,用于NCEI.nc。 。 。 。
用于表格数据集,用于NCEI,使用[.nc索马里](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)如果它是一个选项; 否则使用.nc。 。 。 。
* 指定要为每个数据文件和整个归档包创建的文件摘要类型:MD5,SHA-1,或SHA-256. 文件摘要为客户端提供了一种方式 (例如,国家教育倡议) 以测试数据文件是否已损坏。 传统上,这些是:[.md5 文件](https://en.wikipedia.org/wiki/MD5)但现在还有更好的选择 对NCEI来说,使用SHA-256.

在回答所有问题后,ArchiveAdataset将:

1. 向数据集提出一系列请求,并在其中分级生成的数据文件 *大家长会* /阿奇维阿达塔塞/ *datasetID时间戳* (原始内容存档于2018-09-26). /.
对于网格化数据集,最左维的每个值都将有一个文件 (例如,时间) 。 。 。 文件的名称将是该值 (例如,时间值) 。 。 。 。
对于表格数据集,将针对.变量的每个值有一个文件 (编号) 。 。 。 文件名称将是该值 。 如果变量不止一个,则左变量将用来制作子目录名称,最右的变量将用来制作文件名.
每个数据文件必须是&lt;2GB 常规 (允许的最大值.nc版本 3 文件) 。 。 。 。
2. 用数据文件的文摘来制作每个数据文件的相关文件. 例如,如果数据文件为46088.nc和文摘类型为.sha256,然后文摘文件将命名为46088.nc.sha256 (英语).
3. 制作包含归档信息的 READQME.txt 文件,包括您为生成此归档而指定的所有设置列表 。
4. 制作3个文件 *大家长会* /ArchiveADataset/ : (中文(简体) ).
    
    * 页:1.zip或.tar.gz归档文件名称 *datasetID时间戳* .zip  (或.tar.gz) 包含所有已上演的数据文件和摘要文件。 此文件可能是任意大小, 仅限于磁盘空间 。
    * 例如存档文件的文摘文件, *datasetID时间戳* .zip.sha256.txt (法语).
    * 对于"原始"类型的归档,一个名为 *datasetID时间戳* .zip. list offiles.txt (或.tar.gz) 中列出全部文件.zip  (或.tar.gz) 文档。
    
如果您正在准备NCEI的归档,这些是您将发送给NCEI的文件,也许通过[发送2NCEI](https://www.nodc.noaa.gov/s2n/)或[TRAC 目标](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI 用于档案收藏的高级跟踪和资源工具) 。 。 。 。
5. 删除所有已处理的文件, 只保存归档文件 (例如,.zip) ,摘要 (例如.sha256.txt) 档案,和 (可选) 保留 Files.txt 文件列表。

#### ISO 19115.xml (英语). 元数据文件{#iso-19115-xml-metadata-files} 
ArchiveADataset存档包不包括数据集的ISO 19115.xml元数据文件. 如果您想要/需要为您的数据集提交 ISO 19115 文件, 您可以将 ISO 19115. xml 元数据文件发送给 NCEI 。ERDDAP™为数据集创建 (不过NMFS如果ERDDAP™尚未提供此文件) 。 。 。 。

问题? 建议? 存档ADataset为新版本 。 如果你有问题或建议,见我们[关于获得额外支助的章节](/docs/intro#support)。 。 。 。
     
