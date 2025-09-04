---
sidebar_position: 1
---

# 安装
如何进行初始设置 ERDDAP™ 在您的服务器上

 ERDDAP™ 可以在任何支持的服务器上运行 Java 和汤姆卡特 (还有Jetty等其他应用服务器 但我们不支持它们) 。 。 。 。
 ERDDAP™ 已在 Linux 上测试 (包括亚马逊AWS) 麦克和Windows电脑

*  **夹克** - 说吧 我们提供 [ ERDDAP™ 在多克容器中](https://hub.docker.com/r/erddap/erddap) 
监督办现在提供 [快速启动指南 ERDDAP™ 在一个多克容器中](https://ioos.github.io/erddap-gold-standard/index.html) 。 。 。 。
这是标准 ERDDAP™ 安装,在一个多克容器。
通过多克 组成我们提供方便的方法 设置 sl 和监控, 更多读出 [嵌入器文档](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) 。 。 。 。
如果您已经使用多克, 您可能更喜欢多克版本 。
如果您想要运行云服务, 您可能更喜欢多克版本 。
*  **亚马逊** - 说吧 如果你正在安装 ERDDAP™ 在亚马逊网络服务EC2实例中,请参见此 [亚马逊网络服务概览](/docs/server-admin/additional-information#amazon) 先说
*  **Linux 和 Macs 数据** - 说吧 ERDDAP™ 在Linux和Mac电脑上很有用 见以下指示.
*  **窗口** - 说吧 窗口可以测试 ERDDAP™ 供个人使用 (参见以下说明:) , (中文(简体) ).
但是我们不建议公开使用 ERDDAP™ 部署。 运行 ERDDAP™ 在Windows上可能存在问题:
特别是, ERDDAP™ 可能无法快速删除和(或)重命名文件。 这可能是因为防病毒软件
   (例如,来自麦可菲和诺顿) 它正在检查病毒的文件。 如果你遇到这个问题
(可以通过错误消息在 [日志.txt](/docs/server-admin/additional-information#log) 类似文件
"无法删除."),改变抗病毒软件的设置可能会部分缓解问题. 或考虑取而代之使用Linux或Mac服务器.

 **标准 ERDDAP™ Linux、Macs和Windows计算机的安装指令是:** 

0. 确保安装任何依赖性。 在非窗口机器上 (Linux 和 麦克) ,你需要的csh。 \\ N

##  Java  {#java} 

1.  [对于 ERDDAP™ v2.19+,设置. Java 21岁](#java) 
出于安全考虑,几乎总是最好使用最新版本的 Java 21岁
请下载并安装最新版本
    [收养的 OpenJDK (特穆林语Name) 21国 (长期) ](https://adoptium.net/temurin/releases/?version=21) 。 。 。 。
为核实安装情况,例如运行“/javaJreBin Directory/java-version”
`/usr/local/jdk-21.0.3+9/jre/bin/java ' - 转写。

    ERDDAP™ 与 Java 但是我们建议领养,因为它是主要的、社区支持的,
免费 (就像啤酒和演讲) 版本 Java 21个国家提供长期支助 (初版后多年免费升级) 。 。 。 。
出于安全考虑,请更新您的 ERDDAP 其版本为 Java 定期作为新版本 Java 21 从领养处获得。

    ERDDAP™ 已经测试并广泛使用了21个版本,而不是其他版本。 出于各种原因,我们不测试也不支持其他版本的 Java 。 。 。 。
     
## 汤姆猫{#tomcat} 

2.  [设置](#tomcat)   [汤姆猫](https://tomcat.apache.org) 。 。 。 。 Tomcat是最广泛使用的 Java 应用程序服务器,
这是 Java 介于操作系统网络服务和 Java 服务器软件类 ERDDAP™ 。 。 。 。
它是自由开放源码软件 (自由和开放源码软件) 。 。 。 。

再来一杯 Java 应用程序服务器 (例如,杰蒂公司) 但我们只和Tomcat一起测试和支援

   * 下载Tomcat并把它解开 在您的服务器或个人电脑上。
出于安全考虑,几乎总是最好使用最新的"Tomcat 10"版本. (无法接受第9版及以下) 
旨在与 Java 21岁或更新. 下面,Tomcat目录将称为`Tomcat'.

警告 警告 警告 警告 警告 警告 如果您已经有一个 Tomcat 运行其他的网络应用程序 (特别是热带木材) 我们建议你安装 ERDDAP™ 内
      [第二个汤姆卡特](/docs/server-admin/additional-information#second-tomcat) ,因为 ERDDAP™ 需要不同的Tomcat设置
也不应该为了记忆而与其他应用程序竞争

     * 在Linux上, [下载“ 核心” tar .gz " Tomcat分发](https://tomcat.apache.org/download-10.cgi) 把它拆开
我们建议在`/usr/local'中拆开。
     * 在Mac上,Tomcat可能已经安装在"/Library/Tomcat"中,但应该更新到最新的Tomcat 10.
如果你下载它, [下载“ 核心” tar .gz " Tomcat分发](https://tomcat.apache.org/download-10.cgi) 并将其拆入 " /图书馆/Tomcat " 。
     * 在视窗上,你可以 [下载“ Core” “ zip” Tomcat 发行版](https://tomcat.apache.org/download-10.cgi) 
        (它不会弄乱 Windows 的注册, 而您从 DOS 命令行控制它) 并把它装入适当的目录中。
        (为了发展,我们使用"Core""zip"发行. 我们制作一个 " /方案 " 目录,并在那里取出。) 
或者可以下载"Core""64位Windows zip"的发售,其中包含更多的功能.
如果发行是Windows安装器,它可能会将Tomcat放入,例如"/Program File/apache-tomcat-10.0.23".
             
### 服务器.xml{#serverxml} 

*  [服务器.xml](#serverxml) - 在`tomcat/conf/server.xml'文件中,你应该对这两个文件作两个改动。 <Connector> 标签
   (一个是""Connector"口="8080",一个是""Connector"口="8443".) 。 。 。 。
   1.  (建议) 将“连接时间”参数值增加,也许增加到30万 (毫秒,5分钟) 。 。 。 。
   2.  (建议) 添加新参数:`松动的QueryChars='[] | "`. 这是可选的 安全性稍低
但是,当这些字符出现在用户请求的 URL 的参数中时,用户就不需要将其编码为%。
             
### 内容.xml{#contentxml} 

* 语境.xml - 说吧 资源缓存 - 在`tomcat/conf/context.xml',正前方 </Context> `标签, 更改资源标签
   (或者说,如果它还没有出现) 设置缓存 最大Size参数为80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
这避免了卡塔琳娜的多次警告. 从头开始
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache 超时{#apache-timeout} 

* 在 Linux 计算机上, 更改 Apache 超时设置, 以便耗时的用户请求不会超时
   (与经常出现的“ Proxy” 或“ 坏关口” 错误) 。 。 。 。 作为根用户 :
  * 修改 Apache 选项 ` http d.conf ' 文件 (通常载于`/etc/ http (单位:千美元) `(a). `) 数字 :
    * 改变现有的` <Timeout> `设置 ' (在文件末尾添加一个) 改为3600 (秒数) ,而不是默认的60或120秒。
    * 改变现有的` <ProxyTimeout> `设置 ' (在文件末尾添加一个) 改为3600 (秒数) ,而不是默认的60或120秒。
  * 重新启动 Apache: `/usr/sbin/apachectl' - 宽宏大量 `(a). ` (但有时它出现在不同的目录中) 。 。 。 。

### 警卫{#security} 
         
* 安保建议: 见 [这些指示](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) 安全,加强
您的Tomcat安装, 特别是公共服务器。
         
* 公众 ERDDAP™ 在Linux 和 Macs 上安装设备, 最好设置 Tomcat (程序) 属于用户“ tomcat” `(a). `
   (单独的用户,但权限有限,且 [没有密码](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) 。 。 。 。
因此,只有超级用户可以切换为用户"tomcat". 这使得黑客无法作为用户“tomcat”登录到您的服务器。
无论如何,你应该让“tomcat”用户在服务器的文件系统中拥有非常有限的权限(read+write+execute权限)
用于“apache-tomcat”目录树和“ <bigParentDirectory> `和只读权限的目录,其数据 ERDDAP™ 需要查阅)。
  * 您可以创建“ tomcat” 用户账户 (没有密码) 通过使用命令:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * 您可以切换为用户 Tomcat 工作 通过使用命令
    ```
    sudo su - tomcat
    ```
     (它会要求你 超级用户密码 允许这样做。) 
    * 您可以使用命令停止作为用户的 tomcat 工作
    ```
    exit
    ````
    * 做大部分的汤姆卡特和 ERDDAP™ 作为用户“tomcat”设置指令。 稍后,将“启动.sh”和“shutdown.sh”脚本作为用户“tomcat”运行。 `(a). `
因此Tomcat有权限写入其日志文件.
    * 在解开Tomcat后,从`apache-tomcat'目录的父端:
      * 将 apache-tomcat 目录树的所有权更改为 tomcat 用户 。
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (但替换您的 tomcat 目录的实际名称) 。 。 。 。
      * 更改“ 组” 为 tomcat, 您的用户名, 或包含 tomcat 和 Tomcat / 的所有管理员的小组的名称 。 ERDDAP 数字 :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * 更改权限, 以使 tomcat 和组能够读取、 写入、 执行权限 :
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * 删除“ 其他” 用户的读取、 写入或执行权限 :
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
这一点很重要,因为它使其他用户无法阅读可能敏感的信息。 ERDDAP™ 设置文件 。

### 内存{#memory} 

设置Tomcat 的环境变量

* 关于 Linux 和 Macs :
创建文件“ tomcat/ bin/ setenv.sh ” `(a). ` (或红帽企业 Linux \\[ 莱尔 \\] ,编辑 QQtomcat/conf/tomcat10.conf `(a). `) 设置 Tomcat 的环境变量。
该文件将由`tomcat/bin/startup.sh'和`shutdown.sh'使用。 文件应该包含诸如:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (但替换您的计算机中的目录名称) 。 。 。 。
   (如果您先前设置了 “ JRE_HOME ” , 您可以删除它 。) 
在Macs上,你可能不需要设置"JAVA-HOME".

* 在视窗上 :
创建文件 “ tomcat\\ bin\\ setenv. bat ” 来设置Tomcat 的环境变量 。
此文件将被“ tomcat\\ bin\\ startup. bat” 和“ ” 使用 。 shutdown.bat  .
文件应该包含诸如:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (但替换您的计算机中的目录名称) 。 。 。 。
如果这只是局部测试,请去掉"-server".
   (如果您先前设置了 “ JRE_HOME ” , 您可以删除它 。) 

" Xmx " 和 " Xms " 记忆设置很重要,因为 ERDDAP™ 更多的记忆会更好
总是将`-Xms'设定为与`-Xmx'相同的值。

* 32位操作系统和32位 Java 数字 :
64个位 Java 比32点好得多 Java ,但32点 Java 只要服务器不忙,它就会工作
服务器中物理内存越多越好: 4+GB真的好,2GB是好的,少部分不推荐.
用32个比特 Java 即使有丰富的物理记忆,汤姆卡特和 Java 如果你把“-Xmx”设置在1500M以上,就不会跑 (1200兆台电脑) 。 。 。 。
如果您的服务器内存小于 2GB, 请减少 `- Xmx' 值 (在“ M'egaBytes” 中) 计算机物理记忆的1/2.

* 64位操作系统和64位 Java 数字 :
64个位 Java 将只操作64位操作系统。
  * 与 Java 8,您需要在`setenv.bat'中的Tomcat `CATALINA_OPTS'参数中添加`-d64'。
  * 与 Java 21,你选64位 Java 当你下载一个版本时 Java 标记为"64位".

有64个位 Java 汤姆卡特和 Java 可使用很高的“-Xmx”和“-Xms”设置。 服务器中物理内存越多越好.
作为一个简单的建议:我们建议你设定`-Xmx'和`-Xms',以便 (在“ M'egaBytes” 中) 改为1/2 (或更少) 电脑的物理记忆。
你可以看到如果Tomcat, Java ,以及 ERDDAP™ 正在通过搜索“ 位” 而以 64 位模式运行 。 ERDDAP 每日报告电子邮件
或载于`大家长董事/日志/ [日志.txt](/docs/server-admin/additional-information#log) 档案 (`大家长指导 ' 在 [设置. xml](#setupxml) ) 。 。 。 。

#### 垃圾收集{#garbage-collection} 

* 单位 ERDDAP™ 是因为 [日志.txt](/docs/server-admin/additional-information#log) 文件中,您可以看到许多“ GC ” (分配失败) " 信息。
这通常不是一个问题。 这是正常操作者经常发出的信息 Java 说它刚刚完成了一个小垃圾
藏品因为伊甸园房间用光了 (本节 Java 非常年轻的物体堆积) 。 。 。 。 通常消息会显示
`记忆使用前-&gt;记忆使用后'。 如果这两个数字是相近的,那就意味着垃圾收集没有产生效果.
信息只是麻烦的征兆 如果它非常频繁 (每几秒钟) 并且数量庞大而且没有增长,
说明 Java 需要更多的内存, 正在努力释放内存, 并且无法释放内存。
这可能是在紧张时期发生的,然后消失。 但是,如果它持续下去,那就是麻烦的迹象。
* 如果你看到`java.lang.Out Of Memory Error's in ERDDAP™ 是因为 [日志.txt](/docs/server-admin/additional-information#log) 文档,
见 [记忆错误](/docs/server-admin/additional-information#outofmemoryerror) 关于如何诊断和解决问题的提示。
         
### 权限{#permissions} 

*  [在 Linux 和 Macs 上更改权限](#permissions) 在“tomcat/bin/”中所有要由所有者执行的文件:
  ```
  chmod +x *.sh
  ```

### 字体{#fonts} 

*  [图像字体 :](#fonts) 我们更喜欢免费的 [DejaVu 字体](https://dejavu-fonts.github.io/) 对另一方 Java 字体。
强烈建议使用这些字体,但不需要。

如果您选择不使用 DejaVu 字体, 您需要将设置. xml 中的字体家庭设置更改为 ` <fontFamily> 桑瑟夫语Name </fontFamily> `,
包含所有 Java 分发。 如果你设定 ` <fontFamily> ' 对于一个不存在的字体, ERDDAP™ 不载
并打印“log.txt”文件中可用的字体。 您必须使用其中的一种字体 。

如果您选择使用 DejaVu 字体, 请确定 ` <fontFamily> `设置在设置.xml是' <fontFamily> 德贾武桑斯 </fontFamily>  .

要安装 DejaVu 字体, 请下载 [德亚武丰 .zip ](/DejaVuFonts.zip)   (5,522,795字节,MD5=33E1E61FAB06A547851ED308B4FFEF42) 
,然后将字体文件解析为临时目录。

  * 在 Linux 上 :
    * 用于 Linux 收养 Java 分发,见 [这些指示](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) 。 。 。 。
    * 与其他 Java 分布: 作为“tomcat”用户,将字体文件复制到“$JAVA_HOME/lib/fonts” ,这样 Java 可以找到字体。
记住:如果/当你后来升级到更新版本时 Java ,需要重新安装这些字体。
  * 在Macs上:对于每个字体文件,双击后再点击安装字体.
  * 在Windows 7和10上:在Windows Explorer中,选择所有字体文件. 右键 点击安装 。
             
### 测试 Tomcat{#test-tomcat} 

* 测试你的Tomcat安装。
  * 林纳:
    * 作为用户"tomcat",运行"tomcat/bin/startup.sh".
    * 在浏览器中查看您的 URL + ": 8080/" (例如, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) 。 。 。 。
  * 麦克 (作为系统管理员用户运行 tomcat) 数字 :
    * 运行"tomcat/bin/stallup.sh".
    * 在浏览器中查看您的 URL + ": 8080/" (例如, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) 。 。 。 。
请注意,默认情况下,你的Tomcat只有你才能访问。 它不向公众开放。
  * 视窗本地主机 :
    * 右键点击系统托盘中的Tomcat图标,选择"Start Service".
    * 视图 [http://127.0.0.1:8080/](http://127.0.0.1:8080/) ,或者也许 [http://localhost:8080/](http://localhost:8080/) 在您的浏览器中。 请注意,默认情况下,你的Tomcat只有你才能访问。 它不向公众开放。

你应该看看Tomcat"恭喜"的一页

如果有问题,请见Tomcat日志文件,at `Tomcat/logs/catalina.out'。

### Tomcat装置有问题吗?{#troubles-with-the-tomcat-installation} 

* 在Linux和Mac上,如果你无法到达Tomcat或 ERDDAP™   (或许你无法从防火墙外的电脑上找到他们) , (中文(简体) ).
您可以通过输入来测试 Tomcat 是否正在听端口 8080 。 (作为根) 在服务器的命令行上 :

  ```
  netstat -tuplen | grep 8080
  ```

这应该可以回到一行 类似的东西:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (哪里是数字) ,表明`java'进程 (大概是汤姆卡特吧) 正在"8080"号港口监听"tcp"的流量。
如果没有回行,如果回行有显著不同,或者回行有两行或多行,那么端口设置可能会出问题.

* 见Tomcat日志文件`Tomcat/logs/catalina.out'。 Tomcat问题和一些 ERDDAP™ 启动问题几乎总是在那里出现。
这是常见的 当你第一次设置 ERDDAP™ 。 。 。 。

* 见 [汤姆猫](https://tomcat.apache.org/) 网站或搜索网页寻求帮助,但请让我们知道您遇到的问题和您找到的解决方案。

* 看我们的 [关于获得额外支持的章节](/docs/intro#support) 。 。 。 。
             
###  ERDDAP™ 内容{#erddap-content} 
3.   [设置“ tomcat/content/erddap”配置文件。](#erddap-content) 
在Linux、Mac和Windows上下载 [erddap 组件 .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
并将其解入“tomcat”目录,创建“tomcat/content/erddap”。

^ Version 1.0.0, 20333字节, MD5=2B8D2A5 AE5ED73E3A42B529C168C60B5,日期 2024-10-14___

先前的一些版本也有:

    *  [2.17 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792字节,MD5=8F892616BAEF2DF0F4B036DCB4AD7C,日期为2022-02-16) 
    *  [2.18 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792字节,MD5=8F892616BAEF2DF0F4B036DCB4AD7C,日期为2022-02-16) 
    *  [2.21 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810字节,MD5=1E26F62E7A06191EE6868C40B9A29362,日期为2022-10-09) 
    *  [2.22 (中文(简体) ).](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810字节,MD5=1E26F62E7A06191EE6868C40B9A29362,日期为2022-12-08) 
    *  [2.23 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810字节,MD5=1E26F62E7A06191EE6868C40B9A29362,日期为2023-02-27) 

#### 其他目录{#other-directory} 

红帽企业 Linux (莱尔) 或其他不允许修改Tomcat目录或您需要/需要的地方
来放 ERDDAP™ 出于其他原因, 某些其他位置的内容目录 (例如,如果你使用Jetty而不是Tomcat) , (中文(简体) ).
unzip `erddap Content' 语句 .zip `进入理想目录 (只有 " tomcat " 用户才能进入) 并设定` erddapContentDirectory " 系统财产 "
 (例如,` erddapContentDirectory  =~tomcat/content/erddap `(a). `) 这么说 ERDDAP™ 可以找到此新内容目录。

### 设置. xml{#setupxml} 

*  [以“tomcat/content/erddap/ setup.xml”读取注释 `(a). `](#setupxml) 并进行所要求的修改。 setup.xml 是指定您如何设置的所有设置的文件 ERDDAP™ 行为

对于初始设置, 您至少必须更改这些设置 :
      * `(a). ` <bigParentDirectory> `(a). `
      * `(a). ` <emailEverythingTo> `(a). `
      * `(a). ` <baseUrl> `(a). `
      * `(a). ` <email...> 设置
      * `(a). ` <admin...> 设置
      * `(a). ` <baseHttpsUrl> `(a). ` (当你建立的时候, https ) 

当你从大家长董事会的父目录创建大家长董事会时:

    * 让`tomcat'用户成为`大家长董事会'的所有人:
      ```
      chown -R tomcat bigParentDirectory
      ```
    * 更改“ 组” 为 tomcat, 您的用户名, 或包含 tomcat 和 Tomcat / 的所有管理员的小组的名称 。 ERDDAP 数字 :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * 更改权限, 以使 tomcat 和组能够读取、 写入、 执行权限 :
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * 删除“ 其他” 用户的读取、 写入或执行权限 。 这对防止读取可能敏感的信息很重要
内 ERDDAP™ 登录文件和带有私人数据集信息的文件。
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### 环境变量{#environment-variables} 

从开始 ERDDAP™ (五) 第2.13节, ERDDAP™ 管理员可以通过指定环境变量来覆盖设置.xml中的任何值
名称 ERDDAP 运行前的值(_V) ERDDAP™ 。 。 。 。 例如,使用` ERDDAP _baseUrl' 超过 ` <baseUrl> `价值'。
部署时可以方便 ERDDAP™ 带有像 Docker 这样的容器,因为您可以在设置.xml 中设置标准设置
然后通过环境变量提供特殊设置。 如果向下列人员提供秘密信息: ERDDAP™ 通过这种方法,
请检查信息是否保密。 ERDDAP™ 每次启动时只读取环境变量,
在启动的第一秒,所以使用的方法之一是:设置环境变量,启动 ERDDAP , (中文(简体) ).
等待,直到 ERDDAP™ ,然后取消环境变量。

###  datasets.xml  {#datasetsxml} 

* 阅读注释 [ **与 datasets.xml 文件** ](/docs/server-admin/datasets) 。 。 。 。 等会,你得到后 ERDDAP™ 运行
这是第一次 (通常只有默认数据集) ,您将在“tomcat/content/erddap/”中修改 XML datasets.xml `(a). `
指定您想要的所有数据集 ERDDAP™ 服务。 这就是你花大部分时间的地方
设置时 ERDDAP™ 以后在维持你 ERDDAP™ 。 。 。 。

你可以看到一个例子 [ datasets.xml 关于 GitHub 的](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) 。 。 。 。
     
*  (不太可能,也许) 现在或 (略多一点) 如果您想要修改 erddap 的 CSS 文件, 请复制
`tomcat/content/erddap/images/erddapStart2.cs'改为`tomcat/content/erddap/images/erddap2.cs'并作出修改。
修改“ erddap2. css” 时才生效。 ERDDAP™ 并经常要求用户清除浏览器缓存文件。
     
 ERDDAP™ 如果设置. xml 或 datasets.xml 文件不是一个很好组成的 XML 文件。 所以,在你编辑这些文件后,
通过将 XML 文本粘贴到像 XML 这样的 XML 检查器中来验证结果是否是完善的 XML 是一个好主意 [xml 验证](https://www.xmlvalidation.com/) 。 。 。 。
     
### 安装 erddap 。 战争文件{#install-the-erddapwar-file} 

4. 在 Linux, Mac 和 Windows 上, 下载 [战争](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war) - 输入“tomcat/webapps”:

^ Version 2.28.0, 620, 824, 288字节, MD5=f948b2ba603f65a83ac67af43da9e4c2,日期为2025-08-29_

.战争文件很大,因为它包含了高分辨率的海岸线,边界,以及创建地图所需的高地数据.

之前的一些版本也提供.

   *  [2.17 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245字节,MD5=5FEA912B5D42E50EAB9591F773EA848D,日期为2022-02-16) 
   *  [2.18 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551 069 844字节,MD5=461325E97E7577EC671DD50246CFB8B,日期为2022-02-23) 
   *  [2.21 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411字节,MD5=F2CFF805893146E932E498 FDDBD519B6,日期为2022-10-09) 
   *  [2.22 (中文(简体) ).](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765字节,MD5=2B3354F633294213AE2A FDDFCF4DA6D0,2022-12-08) 
   *  [2.23 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953字节,MD5=D843A043C506725EBD6F8EFDCA8FD5F,日期为2023-03-03) 
   *  [2.24 (中文(简体) ).](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187字节,MD5=970fbee172e28b0b8a07756ecbc898e,日期为2024-06-07) 
   *  [2.25 国家](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039字节,MD5=652AFC9D1421F00B5F789DA2C4732D4C,日期为2024-11-07) 
   *  [2.26 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032字节,MD5=99a725108b37708e5420986c1616a119,日期为2025-03-31) 
   *  [2.27.0 (简体中文).](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403字节,MD5=3b2086c659ee4145ca2dff447bf4ef7,日期为2025-06-11) 

### 配置代理服务器 (具体部署)  {#proxy} 

 ERDDAP™ 通常部署在 Webserver 反向代理服务器后,以允许在标准的 HTTP 端口上服务 (第80和443条) 。 。 。 。
SSL/TLS终止也常常被网服务器代理层所覆盖. 具体要求取决于每次部署的要求。

#### 阿帕奇语Name{#apache} 

1. 确保“mod_proxy”和“mod_proxy_” http 装入:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. 修改现有的` <VirtualHost> 标签 (如果有一个) ,或在文件末尾添加一个:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

若为 ERDDAP™ 在“/erddap”以外的路径上服务,还将“QQ-Forwarded-Prefix”标题设置到
路径段 _ 在 `/erdap' 之前。 这种设置适合: ERDDAP™ 任职于
`/子路径/erddap':

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. 然后重新启动 Apache : “/usr/ sbin/ apachectl ” - 宽宏大量 `(a). ` (但有时它出现在不同的目录中) 。 。 。 。
         
#### 纳吉林克斯{#nginx} 

在 nginx 配置文件中,设置这些标题 :
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

若为 ERDDAP™ 在“/erddap”以外的路径上服务,还将“QQ-Forwarded-Prefix”标题设置到
路径段 _ 在 `/erdap' 之前。 这种设置适合: ERDDAP™ 任职于
`/子路径/erddap':

```
proxy_set_header X-Forwarded-Prefix /subpath
```


为了获得NGINX和 ERDDAP™ 正确操作 https ,您需要将以下片段放入Tomcat服务器.xml 中 。 <Host> `块:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### 开始 Tomcat{#start-tomcat} 

*  (我不建议使用Tomcat网络应用管理器. 如果你不完全关闭和启动Tomcat, 你迟早会有PermGen的记忆问题。) 
*  (在Linux或Mac OS中,如果您创建了运行Tomcat的特殊用户,例如tomcat,请记住作为该用户执行以下步骤.) 
* 如果Tomcat已经运行, 关闭Tomcat与 (在 Linux 或 Mac OS 中) `tomcat/bin/shutdown.sh' (中文(简体) ).
或者说 (在窗口中) 汤姆卡特宾 shutdown.bat `(a). `

在 Linux 上, 使用“ ps- ef ” | `shutdown.sh'前后的grep tomcat',以确保tomcat过程停止.
该流程应当在停产前列出,最终在停产后不列出.
可能要花一两分钟 ERDDAP™ 完全关闭。 耐心点 或者,如果看起来它不会 停止自己,使用:
杀 -9 <processID> `(a). `
* 开始汤姆卡特 (在 Linux 或 Mac OS 中) `tomcat/bin/起动.sh'或 (在窗口中) 汤姆卡特 宾克 开始 `(a). `

## 这是 ERDDAP™ 运行?{#is-erddap-running} 

使用浏览器尝试查看http://www.YourServer.org/erddap/status.html.
 ERDDAP™ 启动时没有装入任何数据集。 数据集被装入了背景线条,因此可以逐一使用.

### 解决问题{#troubleshooting} 

* 当一个用户的请求出现时,它会转到Apache (在 Linux 和 Mac OS 计算机上) 然后,然后汤姆卡特,然后 ERDDAP™ 。 。 。 。
* 你可以看到阿帕奇的结局 (和相关错误) 在 Apache 日志文件中。
*    [你个](/docs/server-admin/additional-information#tomcat-logs) 能看到Tomcat的结局 (和相关错误) 
在Tomcat日志文件中 (`tomcat/logs/catalina.out'和该目录中的其他文件) 。 。 。 。
*    [你个](/docs/server-admin/additional-information#log) 看得出来 ERDDAP ,从 ERDDAP , (中文(简体) ).
和错误消息 ERDDAP ,在 ERDDAP™ `(a). ` <bigParentDirectory> /logs/log.txt'文件.
* Tomcat没有开始 ERDDAP™ 直到Tomcat收到请求 ERDDAP™ 。 。 。 。 这样你就可以在Tomcat日志文件中看到它
开始 ERDDAP™ 或者如果存在与该尝试相关的错误信息。
* 何时 ERDDAP™ 开始,它重命名旧的 ERDDAP™ 日志.txt 文件 (`日志' 时 <CurrentTime> .txt " (中文(简体) ).) 并创建新日志.txt文件。
因此,如果“log.txt”文件是陈旧的,那就是一个迹象: ERDDAP™ 最近没有重新开始。 ERDDAP™ 将日志信息写入缓冲器
并仅将缓冲器定期写入日志文件,但您可以强制 ERDDAP™ 通过访问将缓冲写入日志文件
`(a). ` /erddap/status.html  .

### 问题: Java  {#trouble-old-version-of-java} 

如果你正在使用一个版本 Java 这太老了 ERDDAP , (中文(简体) ). ERDDAP™ 将不会运行, 您会在 Tomcat 的日志文件中看到错误消息 。

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

解决办法是更新最新版本的文本。 Java 并且确保Tomcat正在使用它。

### 问题: 第一次启动缓慢{#trouble-slow-startup-first-time} 

Tomcat在第一次申请的时候必须做很多工作 ERDDAP™ 它必须解开`erddap.war ' 文件。
 (这就像一个 .zip 文件) 。 。 。 。 在一些服务器上,第一次尝试查看 ERDDAP™ 摊位 (30秒钟?) 直到完成这项工作。
在其他服务器上,第一次尝试会立即失败. 但是如果你再等30秒再试一次 它就会成功 ERDDAP™ 已正确安装。

没有办法解决这个问题。 汤姆卡特就是这样工作的 但这只是你安装新版本之后的第一次 ERDDAP™ 。 。 。 。

## 关闭并重新启动{#shut-down-and-restart} 

将来要关闭 (并重新启动)   ERDDAP™ ,参见 [如何关闭和重新启动汤姆卡特 ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) 。 。 。 。

## 麻烦?{#trouble} 

安装Tomcat或 ERDDAP™ ? 吗? 看我们的 [关于获得额外支持的章节](/docs/intro#support) 。 。 。 。

## 关于新版本的电子邮件通知 ERDDAP  {#email-notification-of-new-versions-of-erddap} 

如果您想在新版本时收到电子邮件 ERDDAP™ 具备或其他重要 ERDDAP™ 通知 :
你可以参加 ERDDAP™ 通知列表 [这里](https://groups.google.com/g/erddap-announce) 。 。 。 。 本列表平均每三个月发送一封邮件。

## 自定义{#customize} 

*  [自定义 ERDDAP™ 以突出您的组织 (没有 NOAA   ERD ) 。 。 。 。](#customize) 
* 更改出现在顶端的横幅 ERDDAP™ .html 通过编辑 <startBodyHtml5> "在你的标签" datasets.xml 档案。
(如果没有,请从 ERDDAP™ `tomcat/webapps/erddap/WEB-INF/class/gov/noaa/pfel/erddap/util/messages.xml' 文件
改为: datasets.xml `并编辑其内容. ) 例如,你可以:
  * 使用不同的图像 (即你的组织的标志) 。 。 。 。
  * 更改背景颜色 。
  * 变化 " ERDDAP™ "到"你的组织" ERDDAP™ " (中文(简体) ).
  * 将"方便获取科学数据"改为"方便获取_你的组织_数据".
  * 更改“ 带给你的” 链接, 成为您的组织和资金来源的链接 。
* 修改主页左侧的信息,编辑 <theShortDescriptionHtml> "在你的标签" datasets.xml 档案。
(如果没有,请从 ERDDAP™ `tomcat/webapps/erddap/WEB-INF/class/gov/noaa/pfel/erddap/util/messages.xml' 文件
改为: datasets.xml `并编辑其内容. ) 例如,你可以:
  * 描述你的组织和/或团体的工作。
  * 描述这一类数据 ERDDAP™ 已经。
  * 要更改浏览器标签上出现的图标, 请设置您的组织的favicon 。 o 在“tomcat/content/erddap/images/”中。
见https://en.wikipedia.org/wiki/Favicon.
