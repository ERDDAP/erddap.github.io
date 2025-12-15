# 鸣谢

贡献者 [贷方](https://github.com/erddap/erddap/blob/main/CREDITS.md) (单位:千美元) ERDDAP™ 现在在一个单独的页面上。 ERDDAP™ 是一个产物 [ NOAA ](https://www.noaa.gov "National Oceanic and Atmospheric Administration")   [ NMFS ](https://www.fisheries.noaa.gov "National Marine Fisheries Service")   [ SWFSC ](https://swfsc.noaa.gov "Southwest Fisheries Science Center")   [ ERD ](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division") 。 。 。 。

鲍勃·西蒙斯是 ERDDAP™   (设计者和软件开发者 ERDDAP - 特定代码) 。 。 。 起点是罗伊·门德尔索恩 (鲍勃的老板) 建议鲍勃翻转他的转换表程序 (一个小的功能,它将表格数据从一种格式转换到另一种格式,并且主要从Bob的代码前... NOAA 鲍勃重新获得开源许可的工作) 输入网络服务。

这是罗伊·门德尔索恩关于分布式数据系统的想法, 他对鲍勃的初步建议, 以及他不断的支持 (包括硬件、网络和其他软件支持 通过腾出鲍勃的时间 这样他就可以花更多的时间 ERDDAP™ 代码) 这使得这个项目成为可能,并促成其增长。

那个 ERDDAP - 特定代码作为版权开放源码获得许可, [ NOAA ](https://www.noaa.gov) 拥有版权。 见 [ ERDDAP™ 许可证](/license) 。 。 。 。
 ERDDAP™ 使用版权开源,Apache,LGPL,MIT/X,Mozilla,以及公有领域库和数据.
 ERDDAP™ 不需要任何GPL代码或商业程序。

B. 与《公约》有关的 ERDDAP™ 已经来自 NOAA 鲍勃・西蒙斯的工资。 第一年 ERDDAP™ 当他身为政府承包商时,资金来自 [ NOAA 海岸观察](https://coastwatch.noaa.gov/) 程序,该程序 [ NOAA 监督办](https://ioos.noaa.gov/) 和现已停止的太平洋大陆架跟踪 (职位) 程序。

很多人的功劳很多 ERDDAP™ 提出过建议和评论的管理人员和用户,已导致许多改进。 ERDDAP 。 。 。 许多人被指名道姓。 [更改清单](/changes) 。 。 。 。 谢谢大家 (名称和未命名) 非常喜欢 因此, ERDDAP™ 是一个伟大的例子 [用户驱动创新](https://en.wikipedia.org/wiki/User_innovation) ,产品创新往往来自消费者 ( ERDDAP™ 用户) 不仅仅是制片人 ( ERDDAP™ 开发者) 。 。 。 。

以下是该数据库中的软件和数据集列表。 ERDDAP™ 分发。 我们非常感谢所有这些。 非常感谢
 \\[ 从2021年开始,几乎不可能正确列出所有编码来源。 ERDDAP™ 因为我们使用的几个图书馆 (特别是AWS) 转而使用许多其他图书馆。 所有图书馆 ERDDAP™ 下面直接包括了代码调用,其他图书馆依次调用的许多图书馆也是如此. 如果你看到我们省略了下面的一个项目,请告诉我们,这样我们就可以在下面添加该项目,并在应该获得信贷的地方给予信贷。 \\] 

## 概览{#overview} 
 ERDDAP™ 是一个 [ Java 服务器](https://www.oracle.com/technetwork/java/javaee/servlet/index.html) 程序。 时 ERD 它运行在内部 [汤姆猫](https://tomcat.apache.org/) 应用程序服务器 (许可证 : [阿帕奇语Name](https://www.apache.org/licenses/) ) ,带有 [阿帕奇语Name](https://httpd.apache.org/) 网络服务器 (许可证 : [阿帕奇语Name](https://www.apache.org/licenses/) ) ,使用 [红色帽子 Linux](https://www.redhat.com/) 操作系统 (许可证 : [常规](https://www.gnu.org/licenses/gpl-3.0.html) ) 。 。 。 。
     
## 数据集{#datasets} 
这些数据集来自各种来源。 见元数据 (特别是 " sourceUrl " , " infoUrl " , "institution" 和"许可证") 每个数据集。 许多数据集对其使用有限制,要求您在使用数据时引用/认证数据提供者. 引用/认证数据提供者始终是良好的形式。 见 [如何在纸张中显示数据集](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset) 。 。 。 。
     
## Cohort 软件{#cohort-software} 
 [社区/集体班](#cohort-software) 来自CoHort软件 (https://www.cohortsoftware.com) 使这些课程获得麻省理工学院/X类许可证 (见类/类/类/类/类/类/类/类/类/类/类/类/类/类/类/类/类/类/类/类。) 。 。 。 。
     
## 海岸监视浏览器{#coastwatch-browser} 
 ERDDAP™ 使用来自 Coast Watch 浏览器项目的代码 (现已取消) 从 [ NOAA 海岸观察](https://coastwatch.noaa.gov)   [西海岸区域节点](https://coastwatch.pfeg.noaa.gov/)   (许可证: 版权开源) 。 。 。 该项目由前协调员Dave Foley发起和管理。 NOAA 海岸观察西海岸区域节点。 所有海岸观察浏览器代码都是鲍勃·西蒙斯写的.
     
##  OPeNDAP  {#opendap} 
数据来自 [ OPeNDAP ](https://www.opendap.org) 服务器读取 [ Java   DAP 1.1.7 国家](https://www.opendap.org/deprecated-software/java-dap)   (许可证: LGPL) 。 。 。 。
     
##  NetCDF -贾瓦{#netcdf-java} 
 NetCDF 文件 ( .nc ) ,格林尼治标准类型 NetCDF 文件 (刚性) ,GRIB,和BUFR 读和写有代码 [ NetCDF   Java 图书馆](https://www.unidata.ucar.edu/software/netcdf-java/)   (许可证 : [BSD-3 软件](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE) ) 从 [ Unidata ](https://www.unidata.ucar.edu/) 。 。 。 。

软件 NetCDF   Java .jar: (中文(简体) ).

* 斜体4j
那个 NetCDF   Java 图书馆和卡桑德拉需要 [简单日志的slf4j Java ](https://www.slf4j.org/) 项目。 目前, ERDDAP™ 使用slf4j-simple-xxx.jar 重命名为slf4j.jar,以满足这一需要. (许可证 : [麻省理工学院/X](https://www.slf4j.org/license.html) ) 。 。 。 。
     
* 日东
那个 NetCDF   Java .jar 包括来自 [日东](http://www.jdom.org/)   (许可证 : [阿帕奇语Name](http://www.jdom.org/docs/faq.html#a0030) ) ,包含在netcdfall.jar中.
     
* 乔达
那个 NetCDF   Java .jar 包含 [乔达](https://www.joda.org/joda-time/) 用于日历计算 (可能没有被 ERDDAP ) 。 。 。 。 (许可证 : [Apache 2.0 (韩语)](https://www.joda.org/joda-time/licenses.html) ) 。 。 。 。
     
* 阿帕奇语Name
那个 NetCDF   Java jar 包括 .jar 几个文件 [阿帕奇项目](https://www.apache.org/) 数字 :
     [通用代码c](https://commons.apache.org/proper/commons-codec/) , (中文).
     [常见发现](https://commons.apache.org/discovery/) , (中文).
     [常见 http 客户端](https://hc.apache.org/httpcomponents-client-ga/) , (中文).
     [普通博客](https://commons.apache.org/proper/commons-logging/)   
     [Http 组件](https://hc.apache.org) , (中文).
     (所有人:许可证: [阿帕奇语Name](https://www.apache.org/licenses/LICENSE-2.0) )   
这些都包含在netcdfall.jar中.
     
* 其他人员
那个 NetCDF   Java .jar还包括来自:com.google.code.findbugs,com.google.errofulate,com.google.guava,com.google.j2objc,com.google.protobuf,edu.ucar,org.codehaus.mojo,com.beust.jcommander,com.google.common,com.google.re2j,com.google.第三方. (Google使用Apache和类似BSD的许可证.)   
         
## 秘书长{#sgt} 
图表和地图是用修改后的版本在飞行中创建的 NOAA 'SGT' 号 (当时是https://www.pmel.noaa.gov/epic/java/sgt/,现已终止) 版本 3 ((单位:千美元) Java - 唐纳德·登博撰写的科学图形工具包 [ NOAA 组合](https://www.pmel.noaa.gov/) )   (许可证: 版权开源 (当时是https://www.pmel.noaa.gov/epic/java/license.html) ) 。 。 。 。
     
## 沃尔特・佐恩{#walter-zorn} 
打开 HTML 工具提示 ERDDAP 'HTML页面由Walter Zorn的 wz\\_tooltip创建. 页:1 (许可证: LGPL) 。 。 。 。
滑动器和滑动排序器的拖放功能由Walter Zorn的 wz\\_dragdrop.js 创建. (许可证: LGPL) 。 。 。 。
     
## 打开PDF{#openpdf} 
.pdf 文件创建于 [打开pdf](https://github.com/LibrePDF/OpenPDF) 免费 Java -PDF图书馆.
     
## 一般事务人员{#gshhs} 
海岸线和湖泊数据来自 [一般事务人员](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html) - 全球自成一体、分级、高分辨率海岸线数据库 (许可证 : [常规](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT) ) 由保罗·韦塞尔和沃尔特·史密斯创作.

我们没有就短线数据的更正提出索赔 ERDDAP™ - 不要把它用于航海目的。
     
    
## 格林尼治标准时速{#gmt-pscoast} 
政治边界和河流数据来自 [纸币](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html) 程序进入 [格林尼治标准时](https://www.soest.hawaii.edu/gmt/) ,使用来自 [中央情报局 世界银行二.](https://www.evl.uic.edu/pape/data/WDB/)   (许可证:公有领域) 。 。 。 。

我们没有就随之而来的政治证据的缺陷提出索赔 ERDDAP 。 。 。 。
    
## ETOPO (英语).{#etopo} 
一些地图背景中使用的测深/地形数据是: [ETOPO1 全球 1- minute 嵌入梯形数据集](https://www.ngdc.noaa.gov/mgg/global/global.html)   (冰面, 已注册的网格, 二进制, 2 字节英寸 : etopo1============================ .zip )   (许可证 : [公有领域](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright) ) ,免费由 [ NOAA 国家发改委](https://www.ngdc.noaa.gov) 。 。 。 。

我们没有就由此产生的水晶/水晶数据是否准确提出索赔 ERDDAP 。 。 。 不要把它用于导航目的。
    
##  Java 邮件{#javamail} 
电子邮件在邮件中使用代码发送. 罐从 Oracle 因为 [ Java 邮件 API](https://javaee.github.io/javamail/)   (许可证 : [共同发展和分配限制 (CDDL 光盘) 1.1版 语句](https://javaee.github.io/javamail/LICENSE) ) 。 。 。 。
     
## 贾森{#json} 
 ERDDAP™ 用途 [json.org (英语). Java -基于JSON的图书馆](https://www.json.org/index.html) 解析 [贾森](https://www.json.org/) 数据 (许可证 : [版权开源](https://www.json.org/license.html) ) 。 。 。 。
     

## 邮资SQL{#postgrsql} 
 ERDDAP™ 包括 [后Gres JDBC 游戏机](https://mvnrepository.com/artifact/org.postgresql/postgresql) 驱动程序 (许可证 : [BSD 软件](https://www.postgresql.org/about/licence/) ) 。 。 。 。 驱动器是版权 ((c) 联合国) 1997-2010年,PostgreSQL全球开发集团. 版权所有。
     
## 卢塞内{#lucene} 
 ERDDAP™ 使用 Apache 代码 [卢塞内](https://lucene.apache.org/) 。 。 。 。 (许可证 : [阿帕奇语Name](https://www.apache.org/licenses/LICENSE-2.0) ) 用于“ lucene” 搜索引擎选项 (但不是默认的“ 原始” 搜索引擎) 。 。 。 。
     
## 常识压缩{#commons-compress} 
 ERDDAP™ 使用 Apache 代码 [常识压缩](https://commons.apache.org/compress/) 。 。 。 。 (许可证 : [阿帕奇语Name](https://www.apache.org/licenses/LICENSE-2.0) ) 。 。 。 。
     
## 牙买加{#jexl} 
 ERDDAP™ 对评价表达式和脚本的支持&lt; sourceName s &gt; 依赖于 [Apache 项目](https://www.apache.org/) 数字 : [ Java 表达式语言 (牙买加) ](https://commons.apache.org/proper/commons-jexl/)   (许可证 : [阿帕奇语Name](https://www.apache.org/licenses/LICENSE-2.0) ) 。 。 。 。
     
## 卡桑德拉岛{#cassandra} 
 ERDDAP™ 包含 阿帕奇语Name [卡珊德拉餐厅](https://cassandra.apache.org/)   [(原始内容存档于2018-09-21). Cassandra-Driver-core.jar.](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)   (许可证 : [Apache 2.0 (韩语)](https://github.com/datastax/java-driver/blob/2.1/LICENSE) ) 。 。 。 。
卡桑德拉的卡桑德拉-司机核心。 (这样 ERDDAP™ 包含) 数字 :
*    [木瓜酱](https://github.com/google/guava)   (许可证 : [Apache 2.0 (韩语)](https://github.com/google/guava/blob/master/LICENSE) ) 。 。 。 。
*    [lz4.jar (英语).](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)   (许可证 : [Apache 2.0 (韩语)](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt) ) 。 。 。 。
*    [度数核心.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)   (许可证 : [麻省理工学院](https://github.com/codahale/metrics/blob/master/LICENSE) ) 。 。 。 。
*    [(原始内容存档于2018-09-13). Netty-all.jar](https://netty.io/downloads.html)   (许可证 : [Apache 2.0 (韩语)](https://netty.io/downloads.html) ) 。 。 。 。
*    [snappy-java.jar (英语).](https://xerial.org/snappy-java/)   (许可证 : [Apache 2.0 (韩语)](https://github.com/xerial/snappy-java/blob/develop/LICENSE) ) 。 。 。 。
         
##  KT\\_ 调色板{#kt_-palettes} 
带有前缀的调色板 " KT\\_ " 是一个 [Kristen 收藏的 .cpt 调色板 锡根](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)   (许可证 : [麻省理工学院/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html) ) 但Jennifer Sevadjian稍稍改过自新 NOAA 以便他们遵守 ERDDAP .cpt的要求。
     
##  Leaflet  {#leaflet} 
 ERDDAP™ 使用 Java 脚本库 [ Leaflet ](https://leafletjs.com/)   (许可证 : [BSD 2 数据](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) ) 作为 WMS 客户端打开 WMS 网页 ERDDAP 。 。 。 。 软件很棒 (设计良好、易于使用、快速和免费) 从弗拉基米尔·阿加丰金。
     
## 自动取款机{#aws} 
与 Amazon AWS 合作 (包括S3) , (中文). ERDDAP™ 使用该表的 v2 [AWS SDK 为 Java ](https://aws.amazon.com/sdk-for-java/)   (许可证 : [阿帕奇语Name](https://www.apache.org/licenses/) ) 。 。 。 。

AWS需要马文拉动依赖关系. 它们包括以下.jar文件 (其中xxxx为版本编号,该版本随时间变化,许可证类型在括号中) : 说明-xxx.jar (阿帕奇语Name) 用户名 (阿帕奇语Name) , ams- xxx.jar (中文(简体) ). (BSD 软件) ,asm-xxx.jar (中文(简体) ). (BSD 软件) 分析 - xxxx.jar (BSD 软件) ,asm -commons -xxxx.jar (英语). (BSD 软件) (原始内容存档于2018-09-21). asm-tree-xxx.jar (BSD 软件) (原始内容存档于2017-09-22). asm-util-xxxxx.jar (BSD 软件) , Auth-xxx.jar (中文(简体) ). (? 。 。 。) , aws -core -xxx.jar (英语). (阿帕奇语Name) (原始内容存档于2017-09-26). aws-query-protocol-xxxx.jar (阿帕奇语Name) , aws-xml-protocol-xxxxxxxxxxx.jar (中文(简体) ). (阿帕奇语Name) ,检查器-qual-xxxx.jar (麻省理工学院) ,错误的%%%%%xxxx.jar (阿帕奇语Name) ,事件流-xxxxjar (阿帕奇语Name) ,失败访问xxxxjar (阿帕奇语Name) , (中文). http core-xxx.jar (英语). (阿帕奇语Name) , j2objc - 注释 - xxxx.jar (阿帕奇语Name) ,杰克森注释-xxx.jar. (阿帕奇语Name) , Jackson-core-xxxx.jar (英语). (阿帕奇语Name) (原始内容存档于2017-09-29). jar. (阿帕奇语Name) , jaxenxxxxxjar (英语). (BSD 软件) , jffi - xxx.jar (英语). (阿帕奇语Name) , jffi -xxxx. native. (原始内容存档于2018-09-31). 罐头 (阿帕奇语Name) jnr -constants -xxxx.jar (英语). (阿帕奇语Name) , jnr-ffi- xxxx.jar (英语). (阿帕奇语Name) , jnr-posix-xxxxxx.jar (中文(简体) ). (阿帕奇语Name) jnr-x86asm-xxxxxxx.jar (中文(简体) ). (阿帕奇语Name) , json–xxx.jar (英语). (版权开放源码) , jsr305-xxxx.jar (中文(简体) ). (阿帕奇语Name) ,可听的未来-xxx.jar (阿帕奇语Name) 大约一打网球 罐头 (阿帕奇语Name) 页:1 (阿帕奇语Name) 协议 (阿帕奇语Name) 反应流-xxxxjar (反腐败委员会 1.0 对) 区域-xxxjar (阿帕奇语Name) , s3–xxx.jar (中文(简体) ). (阿帕奇语Name) sdk -core -xxxx.jar (英语). (阿帕奇语Name) (原始内容存档于2018-09-31). utils-xxx.jar (? 。 。 。) 。 。 。 要查看实际许可证,请在 [马文仓库](https://mvnrepository.com/) 然后在项目档案里到处翻查 找到执照
    

我们还非常感谢我们在开发时使用的所有软件和网站。 ERDDAP ,包括:
 [颜色](https://www.google.com/chrome/browser/desktop/) , (中文).
 [ curl ](https://curl.haxx.se/) , (中文).
 [鸭子走](https://duckduckgo.com/?q=) , (中文).
 [编辑笔记](https://www.editplus.com/) , (中文).
 [文件Zilla](https://filezilla-project.org/) 。 。 。 。
 [GitHub 图像](https://github.com/) , (中文).
 [谷歌搜索](https://www.google.com/webhp) , (中文).
 [PutTY 语录](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) , (中文).
 [堆栈溢出](https://stackoverflow.com/) , (中文).
 [待办事宜](https://todoist.com/?lang=en) , (中文).
 [ Wikipedia ](https://www.wikipedia.org/) , (中文).
互联网、万维网和所有其他大有帮助的网站。
非常感谢
