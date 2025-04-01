---
sidebar_position: 1
---

# 安装
如何完成初始设置ERDDAP™在您的服务器上


ERDDAP™可以在任何支持的服务器上运行Java和汤姆卡特 (还有Jetty等其他应用服务器 但我们不支持它们) 。 。 。 。ERDDAP™已在 Linux 上测试过 (包括亚马逊的AWS) 麦克和Windows电脑

*    **亚马逊** - —— - 说 如果你正在安装ERDDAP™在亚马逊网络服务EC2实例中,请参见此[亚马逊网络服务概览](/docs/server-admin/additional-information#amazon)先说
*    **插头** - —— - 说 Axiom现在出价了[ERDDAP™嵌入容器](https://hub.docker.com/u/axiom/)监督办现在提供[快速启动指南ERDDAP™在一个容器中](https://ioos.github.io/erddap-gold-standard/index.html)。 。 。 。
这是标准ERDDAP™安装,但Axiom已经把它放在一个容器里。
如果您已经使用 Docker , 您可能更喜欢 Docker 版本 。
如果你不已经使用Docker, 我们一般不建议这样做。
如果您选择安装ERDDAP™通过Docker,我们不为安装过程提供任何支持.
我们还没和多克合作呢 如果你用这个工作, 请给我们你的评论。
*    **Linux 和 麦克斯** - —— - 说ERDDAP™在Linux和Mac电脑上很出色 参见以下说明.
*    **窗口** - —— - 说 窗口可以测试ERDDAP™供个人使用 (参见以下说明:) 但是我们不建议公开使用它ERDDAP编号 运行ERDDAP™在Windows上可能会有问题:ERDDAP™可能无法快速删除和/或重命名文件。 这大概是因为防病毒软件 (例如,来自McAfee和Norton) 正在检查病毒的文件。 如果你遇到这个问题 (中的错误信息可查看[日志.txt](/docs/server-admin/additional-information#log)文件如“无法删除...”) ,改变抗病毒软件的设置可能会部分缓解问题. 或者考虑使用Linux或Mac服务器代替.

 **标准ERDDAP™Linux、Macs和Windows计算机的安装指令是:** 

0. 确保安装任何依赖性。 在非窗口机器上 (Linux 和 Mac 数据) ,你需要的csh。 \\ N
## Java {#java} 
1.  [对于ERDDAP™v2.19+,设置.Java21岁](#java)
出于安全考虑,几乎总是最好使用最新版本的Java21岁
请下载并安装最新版本
    [收养的 OpenJDK (特穆林语Name) 页:1 (长期) ](https://adoptium.net/temurin/releases/?version=21)。 。 。 要验证安装, 请输入“ /_ javaJreBin Directory_/ java - version”, 例如 。
/usr/当地/jdk-21.0.3+9/jre/bin/java - 转换
    
    ERDDAP™与Java我们建议领养,因为它是主要的、社区支持的、免费的。 (如啤酒和演讲) 版本Java21个提供长期支助的国家 (初版后多年免费升级) 。 。 。 出于安全考虑,请更新您ERDDAP其版本为Java定期作为新版本Java21从领养处获得。
    
    ERDDAP™已经与21个版本而不是其他版本进行了广泛测试和使用。 出于各种原因,我们不测试也不支持其他版本的Java。 。 。 。
     
## 汤姆猫{#tomcat} 
2.  [设置](#tomcat) [汤姆猫](https://tomcat.apache.org)。 。 。 。
Tomcat是最广泛使用的Java应用程序服务器, 即Java软件,位于操作系统的网络服务与Java服务器软件类ERDDAP™。 。 。 它是自由开放源码软件 (自由和开放源码软件) 。 。 。 。
    
再来一杯Java应用程序服务器 (例如,Jetty公司:) 但我们只和Tomcat一起测试和支持他
     
    
    * 下载Tomcat并在您的服务器或个人电脑上打开它。
出于安全考虑,几乎总是最好使用最新版本的Tomcat 10 (无法接受第9版及以下) 旨在与Java21岁或更新. 下面的Tomcat目录将称为_tomcat_.
        
警告你们&#33; 如果您已经有一个 Tomcat 运行一些其他的网络应用程序 (特别是热带木材) 我们建议你安装ERDDAP™输入[第二个汤姆猫](/docs/server-admin/additional-information#second-tomcat),因为ERDDAP™需要不同的 Tomcat 设置, 并且不应该与其他应用程序争夺内存.
        
        * 在Linux上,[下载“ 核心” tar.gz" Tomcat分发](https://tomcat.apache.org/download-10.cgi)并打开它。 我们建议用本地/用户/地方来拆包。
        * 在Mac上,Tomcat可能已经安装在/Library/Tomcat中,但应该更新到最新的Tomcat 10.
如果你下载它,[下载“ 核心” tar.gz" Tomcat分发](https://tomcat.apache.org/download-10.cgi)并装入/图书馆/Tomcat。
        * 在视窗上,你可以[下载“ 核心” “ 齐普” Tomcat 发行](https://tomcat.apache.org/download-10.cgi)  (它不会弄乱 Windows 的注册, 您从 DOS 命令行控制它) 并把它装入适当的目录中。 (为了发展,我们使用"Core""zip"分布. 我们制作一个/程序目录 并在那里解开它。) 或者可以下载"Core""64位Windows zip"发行版,其中包含更多的功能. 如果发行是Windows安装器,它很可能会将Tomcat放入,例如/Program文件/apache-tomcat-10.0.23 .
             
### 服务器.xml{#serverxml} 
*   [服务器.xml](#serverxml)- 在 _tomcat_/conf/server.xml 文件中,您应该对两个文件进行两个修改&lt;连接器 & gt; 标记 - 1 for
```
        <Connector port="8080" 
```
一个给
```
        <Conector port="8443"
```
    1.   (建议) 将连接Timeout参数值增加, 可能增加到30万 (毫秒( M))   (5分钟) 。 。 。 。
    2.   (建议) 添加新参数: 放松查询QeryChars="\\[\\]|" , " 这是可选的,而且安全性略低,但当这些字符出现在用户请求的URL参数中时,用户就不再需要将其编码为%。
             
### 内容.xml{#contentxml} 
* 语境.xml - 资源缓存 - 在_tomcat_/conf/context.xml,正前方&lt;/ context&gt; 标签, 更改资源标签 (或者说如果它还没有出现的话) 设置缓存 最大Size参数为80000:
    &lt;资源缓存Allowed="真"缓存MaxSize="80000"/&gt;
这避免了卡塔琳娜的多次警告. 全部从
醒来\\[主要\\]org.apache.catalina.webresources.cache.get 资源 无法添加资源到\\[/WEB-INF/类/.]".
         
### Apache 超时{#apache-timeout} 
* 在 Linux 计算机上, 更改 Apache 超时设置, 以便耗时的用户请求不会超时 (与经常出现的“ Proxy” 或“ Bad Gateway” 错误) 。 。 。 。 作为根用户 :
    1. 修改 Apachehttpd.conf 文件 (通常为/etc/http(单位:千美元)) 数字 :
更改现有的&lt;超时 & gt; 设置 (在文件末尾添加一个) 改为3600 (秒数) ,而不是默认的60或120秒。
更改现有的&lt;代理时空 & gt; 设置 (在文件末尾添加一个) 改为3600 (秒数) ,而不是默认的60或120秒。
    2. 重新启动 Apache: /usr/sbin/apachectl - 宽宏大量 (但有时它出现在不同的目录中) 。 。 。 。
             
    * 安保建议: 见[这些指示](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)提高你的Tomcat安装的安全性 特别是公共服务器的安全性
         
    * 面向公众ERDDAP™在 Linux 和 Macs 上安装设备, 最好设置 Tomcat (程序) 属于用户“ tomcat” (一个权限有限的单独用户,该用户[没有密码](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) 。 。 。 因此,只有超级用户可以切换为作为用户的Tomcat. 这使得黑客无法作为用户Tomcat登录到您的服务器. 无论如何,你应该让 tomcat用户在服务器的文件系统中拥有非常有限的权限(read+write+execution权限用于 apache-tomcat目录树和&lt;bigParrent Briedery & gt; 和只读权限的目录ERDDAP™需要查阅)。
        * 您可以创建 tomcat 用户账户 (没有密码) 通过使用命令
sudo 用户添加 tomcat -s /bin/bash -p '\\*  '
        * 您可以使用命令切换为用户 Tomcat 工作
sudo su - Tomcat (英语)
             (它会要求你 超级用户密码 允许这样做。) 
        * 您可以通过使用命令停止作为用户 Tomcat 工作
退出
        * 做大部分的汤姆卡特和ERDDAP™设置指令为用户"tomcat". 后来,将启动的.sh和关闭的.sh脚本作为用户"tomcat"运行,以便Tomcat有权限写入其日志文件.
        * 在解开Tomcat后, 从 apache-tomcat 目录的父端:
            
            * 将 apache-tomcat 目录树的所有权更改为tomcat 用户 。
颜色 - R 托姆卡特- 托姆卡特_ 10.0.23_
                 (但替换您的 Tomcat 目录的实际名称) 。 。 。 。
            * 更改“ group ” 为 tomcat, 您的用户名, 或包含 tomcat 和 Tomcat / 的所有管理员的小组的名称 。ERDDAP例如,
-R -你的车 用户名_ apache-tomcat_10.0.23_
            * 更改权限,以使tomcat和组有读,写,执行权限,例如,
chmod - R ug+rwx apache-tomcat - _1.0.23_
            * 删除“ 其他” 用户的读、 写或执行权限 :
chmod - R o-rwx apache-tomcat - _1.0.23_ (韩语).
这一点很重要,因为它阻止其他用户读取可能敏感的信息。ERDDAP™设置文件。
            
              
### 内存{#memory} 
* 设置Tomcat 的环境变量
    
在 Linux 和 Macs 上 :
创建文件 _tomcat_/bin/setenv.sh (或红帽企业 Linux\\[莱尔\\],编辑 ~tomcat/conf/tomcat10.conf) 设置Tomcat的环境变量。 此文件将由_tomcat_/bin/startup.sh 和 sh 使用 。 文件应该包含诸如:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (但替换您计算机中的目录名称) 。 。 。 。
 (如果你之前设置了JREQHOME,你可以去掉它.)   
在Macs上,你可能不需要设置JAVAQHOME.

在视窗上 :
创建文件 _tomcat_\\bin\\setenv.bat 设置Tomcat的环境变量 。 此文件将被 _tomcat_%bin\\stallup.bat 和shutdown.bat。 。 。 文件应该包含类似的东西:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (但替换您计算机中的目录名称) 。 。 。 。
如果这只是局部测试,请删除"-server".
 (如果你之前设置了JREQHOME,你可以去掉它.) 

-Xmx和-Xms的内存设置很重要,因为ERDDAP™用更多的记忆效果更好 总是将 - Xms 设定为与 - Xmx 相同的值.

* 32位操作系统和32位Java数字 :
64 位数Java比32点好得多Java,但32点Java只要服务器不忙,它就会工作 服务器中物理内存越多越好: 4+GB真的很好,2GB是好的,较少不推荐. 带32位Java即使有丰富的物理记忆,汤姆卡特和Java如果您尝试设置 - Xmx 大于 1500M, 将不会运行 (1200M在一些电脑上) 。 。 。 如果您的服务器内存小于 2GB, 请减少 - Xmx 值 (在“M'egaBytes”中) 计算机物理记忆的1/2.
* 64位操作系统和64位Java数字 :
64 位数Java只有64位操作系统才能工作。
    
    * 与Java8, 您需要在 setenv. bat 中的Tomcat CATALINA OPTS 参数中添加 \\-d64
    * 与Java21,你选64位Java当下载一个版本时Java标记为"64位".
    
有64点Java汤姆卡特和Java可使用非常高的 - Xmx 和 - Xms 设置。 服务器中物理内存越多越好. 作为一个简单的建议:我们建议您设置 - Xmx 和 - Xms (在“M'egaBytes”中) 改为1/2 (或更少) 计算机的物理记忆。 你可以看到如果Tomcat,Java,以及ERDDAP™正在通过搜索“ 位” 以 64 位模式运行 。ERDDAP每日报告电子邮件或_BigPorentBirdy_/logs/[日志.txt](/docs/server-admin/additional-information#log)文件 (_BigPorent Birdy_ 指定在[设置. xml](#setupxml)) 。 。 。 。
#### 垃圾收集{#garbage-collection} 
* 内ERDDAP™因为[日志.txt](/docs/server-admin/additional-information#log)文件,你会看到很多“GC” (分配失败) " 信息。
这通常不是一个问题。 经常从正常操作者那里得到信息Java说它刚刚完成了一个小垃圾收集工作,因为它在伊甸园没有房间了 (本节Java非常年轻的物体堆积) 。 。 。 通常消息会显示 _memory Use Before_Q&gt;_memory Useafter_. 如果这两个数字是相近的,那就意味着垃圾收集没有产生效果. 如果消息很频繁,那只是麻烦的征兆 (每隔几秒钟) ,没有生产力,而且数量庞大,没有增长,这些都表明,Java需要更多的内存, 正在努力释放内存, 并且无法释放内存。 这可能是在紧张时期发生的,然后消失。 但是,如果它持续下去,那就是麻烦的迹象。
* 如果你看到java.lang. 出自"记忆的爱"ERDDAP™因为[日志.txt](/docs/server-admin/additional-information#log)文件,参见[记忆错误](/docs/server-admin/additional-information#outofmemoryerror)关于如何诊断和解决问题的提示。
         
### 权限{#permissions} 
*   [在 Linux 和 Macs 上更改权限](#permissions)总计\\*.sh在 _tomcat_/bin/ 中要由所有者执行的文件,例如,与
```
    chmod +x \\*.sh  
```
### 字体{#fonts} 
*   [图像字体 :](#fonts)我们更喜欢免费的[DejaVu 字体](https://dejavu-fonts.github.io/)给对方的Java字体。 强烈建议使用这些字体,但不需要。
    
如果您选择不使用DejaVu字体,则需要在设置.xml中将字体家庭设置更改为&lt;字体 Family&gt; SansSerif&lt;/font Family&gt; , 全部可用Java分发。 如果您将字体Family设置为无法使用的字体名称,ERDDAP™将不加载, 并将打印日志. txt文件中可用的字体列表 。 您必须使用其中的字体 。
    
如果您选择使用DejaVu字体,请确保设置中的字体Family设置.xml是&lt;字体 家庭 & gt; DejaVu 桑斯&lt;/font Family&gt; (中文(简体) ).
    
要安装 DejaVu 字体, 请下载[德贾武丰.zip](/DejaVuFonts.zip)  (5,522,795字节,MD5=33E1E61FAB06A547851ED308B4FFEF42) ,然后将字体文件解析为临时目录。
    
    * 在 Linux 上 :
        * 用于 Linux 收养Java分发,见[这些指示](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/)。 。 。 。
        * 与其他Java分布: 作为Tomcat用户,将字体文件复制到 _JAVAQHOME_/lib/fonts soJava可以找到字体。 记住:如果/当你后来升级到更新版本时Java,需要重新安装这些字体。
    * 在Macs上:每个字体文件,双击后点击安装字体.
    * 在Windows 7和10上:在Windows Explorer中,选择所有字体文件. 右键 点击安装 。
             
### 测试Tomcat{#test-tomcat} 
* 测试你的Tomcat安装。
    * 林纳:
        * 作为用户"tomcat",运行_tomcat_/bin/startup.sh
        * 在浏览器中查看您的 URL + ": 8080/" (例如,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) 。 。 。 。
        * 你应该看看Tomcat"恭喜"的一页
如果有麻烦,请参见Tomcat日志文件_tomcat_/logs/catalina.out.
    * 麦克 (作为系统管理员用户运行 tomcat) 数字 :
        * 运行 _tomcat_/bin/启动.sh
        * 在浏览器中查看您的 URL + ": 8080/" (例如,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) 。 。 。 请注意,默认情况下,你的Tomcat只有你才能访问. 它不向公众开放。
        * 你应该看看Tomcat"恭喜"的一页
如果有麻烦,请参见Tomcat日志文件_tomcat_/logs/catalina.out.
    * 视窗本地主机 :
        
        * 右键点击系统托盘中的Tomcat图标,并选择"Start service".
        * 视图[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/),或者也许[ http://localhost:8080/ ](http://localhost:8080/)在您的浏览器中。 请注意,默认情况下,你的Tomcat只有你才能访问. 它不向公众开放。
        * 你应该看看Tomcat"恭喜"的一页
如果有麻烦,请参见Tomcat日志文件_tomcat_/logs/catalina.out.
            
### Tomcat装置有问题吗?{#troubles-with-the-tomcat-installation} 
* 在Linux和Mac上,如果你无法到达Tomcat或ERDDAP™  (或许你无法从防火墙外的电脑上找到他们) ,您可以通过输入来测试Tomcat是否在听端口 8080 。 (作为根) 在服务器的命令行上:
```  
    netstat -tuplen | grep 8080  
```
这应该可以回到一行 类似的东西:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     ("#"是数字) ,表示"java"过程 (大概是汤姆卡特吧) 正在"8080"号港口监听"tcp"的流量。 如果没有返回线路,如果返回的线路有显著差异,或者返回两条或两条以上的线路,那么端口设置可能会有问题.
* 见Tomcat日志文件_tomcat_/logs/catalina.out. Tomcat问题和一些ERDDAP™这里几乎总是提到启动问题。 这是常见的 当你第一次设置ERDDAP™。 。 。 。
* 见[汤姆猫](https://tomcat.apache.org/)网站或搜索网页寻求帮助,但请告诉我们你遇到的问题和找到的解决方案。
* 看我们的[关于获得额外支助的章节](/docs/intro#support)。 。 。 。
             
### ERDDAP™内容{#erddap-content} 
3.  [设置_tomcat_/content/erddap配置文件。](#erddap-content)  
在Linux、Mac和Windows上下载[erddap 组件.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (1.0.0,2033字节,MD5=2B8D2A5AE5ED73E3A42B529C168C60B5,日期为2024-10-14) 并将其解析为 _tomcat_,创建_tomcat_/content/erddap。 。 。 。

    \\[以前的一些版本也有:
    [2.17 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792字节,MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C,日期为2022-02-16)   
    [2.18 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792字节,MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C,日期为2022-02-16)   
    [2.21 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810字节,MD5=1E26F62E7 A06191E6868C40B9A29362,日期2022-10-09)   
    [2.22 (中文(简体) ).](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810字节,MD5=1E26F62E7A06191E6868C40B9A29362,日期2022-12-08) 
    [2.23 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810字节,MD5=1E26F62E7A06191E6868C40B9A29362,日期为2023-02-27) 
并将其解析为 _tomcat_,创建_tomcat_/content/erddap。 。 。 。\\]
    
#### 其他目录{#other-directory} 
红帽企业 Linux (莱尔) 或对于不允许修改Tomcat目录或需要/需要放入ERDDAP™出于其他原因, 某些其他地点的内容目录 (例如,如果你使用Jetty而不是Tomcat) , 解析器.zip输入想要的目录 (只有用户=tomcat有访问权限) 设置erddapContentDirectory系统属性 (例如,erddapContentDirectory=~tomcat/content/erddap) 这样ERDDAP™可找到此新内容目录。
    
### 设置. xml{#setupxml} 
*   [阅读注释_tomcat_/content/erddap页:1 **设置. xml** ](#setupxml)并进行所要求的修改。 设置. xml 是所有设置中指定您如何设置的文件ERDDAP™行为
对于初始设置, 您至少必须更改这些设置 :
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
当你从大家长董事会的父目录创建大家长董事会时:
    
    * 让用户=tomcat成为大家长董事会的老板,例如,
```
        chown -R tomcat _bigParentDirectory_
```
    * 更改“ group ” 为 tomcat, 您的用户名, 或包含 tomcat 和 Tomcat / 的所有管理员的小组的名称 。ERDDAP例如,
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * 更改权限,以使tomcat和组有读,写,执行权限,例如,
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * 删除“ 其他” 用户的读、 写或执行权限 。 这对于防止阅读可能敏感的信息十分重要。ERDDAP™记录与私人数据集相关的文件 :
```
        chmod -R o-rwx _bigParentDirectory_
```

### 环境变量{#environment-variables} 
开始ERDDAP™页:1ERDDAP™管理员可以通过指定一个命名的环境变量来覆盖设置.xml中的任何值ERDDAP运行前的 XQ值Name _ERDDAP™。 。 。 。 例如,使用ERDDAPQQBaseUrl 覆盖&lt;baseUrl&gt; 数值。 部署时可以方便ERDDAP™带有像Docker这样的容器,因为您可以在设置.xml中设置标准设置,然后通过环境变量提供特殊设置. 如果向下列人员提供秘密信息:ERDDAP™通过这一方法,确保检查信息是否仍然保密。ERDDAP™每个启动时只读一次环境变量, 在启动的第一秒, 所以使用的方法之一是: 设置环境变量, 启动ERDDAP时,等待ERDDAP™,然后取消环境变量。
    
### datasets.xml {#datasetsxml} 
* 阅读注释[ **与datasets.xml文件** ](/docs/server-admin/datasets)。 。 。 。 以后,你得到后,我给你ERDDAP™第一次运行 (通常只有默认数据集) ,您将在_tomcat_/content/erddap页:1 **datasets.xml** 指定您想要的所有数据集ERDDAP™服务。 在那里你会花你的大部分时间 设置ERDDAP™以后在维持你的ERDDAP™。 。 。 。

你可以看到一个例子[datasets.xml关于 GitHub 的](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml)。 。 。 。
     
*    (不太可能,也许) 现在或 (略为可能) 如果您想要修改 erddap 的 CSS 文件, 请复制_tomcat_/content/erddap/images/erddapStart2.cs称为erddap2.cs,然后对其进行修改. 对 erddap2.cs 的修改只有在ERDDAP™并经常要求用户清除浏览器缓存文件。
     
ERDDAP™如果设置. xml 或datasets.xml文件不是一个很好组成的 XML 文件。 因此,在您编辑这些文件后,通过将 XML 文本粘贴到像 XML 这样的 XML 检查器中来验证结果是否是好的 XML 是一个好主意.[xml 验证](https://www.xmlvalidation.com/)。 。 。 。
     
### 安装 erddap.war 文件{#install-the-erddapwar-file} 
4. 在Linux、Mac和Windows上下载[战争](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)输入 _tomcat_/webapps 。
     (2.26版本,607,404,032字节,MD5=99a725108b37708e5420986c1616a119,日期03-31-2025) 
    
.war文件很大,因为它包含了高分辨率的海岸线,边界,以及创建地图所需的海拔数据.
    
    \\[先前的一些版本也提供.
    [2.17 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245字节,MD5=5FEA912B5D42E50EAB9591F773EA848D,日期为2022-02-16)   
    [2.18 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069,844字节,MD5=461325E97E7577EC671DD50246CCFB8B,日期为2022-02-23)   
    [2.21 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411字节,MD5=F2CFF805893146E932E498 FDDBD519B6,日期为2022-10-09)   
    [2.22 (中文(简体) ).](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765字节,MD5=2B3354F633294213AE2A FDDFCF4DA6D0,日期2022-12-08) 
    [2.23 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953字节,MD5=D843A043C506725EBD6F8EFDCCA8FD5F,日期为2023-03-03) 
    [2.24 (中文(简体) ).](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187字节,MD5=970fbee172e28b0b8a07756ecbc898e,日期2024-06-07) 
    [2.25 联合国](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039字节,MD5=652AFC9D1421F00B5F789DA2C4732D4C,日期为2024-11-07) 
    \\]
    
#### 代理密码{#proxypass} 
5. 使用代理服务器 通过后用户无需将端口号码,如:8080,输入URL.
在Linux电脑上,如果Tomcat是用Apache语运行,请修改Apache语httpd.conf 文件 (通常为/etc/http(单位:千美元)) 允许 HTTP 流量进入/从ERDDAP™不要求端口号码,例如:8080,在URL中。 作为根用户 :
    1. 修改现有的&lt;虚拟Host&gt; 标签 (如果有一个) ,或在文件末尾添加一个:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. 然后重新启动 Apache : /usr/ sbin/ apachectl - 宽宏大量 (但有时它出现在不同的目录中) 。 。 。 。
         
### 纳吉林克斯{#nginx} 
 (吴NCO货币) 如果你正在使用[纳吉林克斯](https://www.nginx.com/)  (一个网络服务器和装入平衡器) 数字 :
为了获得NGINX和ERDDAP™正确操作https,您需要将以下片段放入Tomcat服务器.xml&lt;主机( G) 块 :
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
在 nginx 配置文件中, 您需要设置这些信头 :
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (多亏了凯尔·威尔科克斯)   
     
### 启动 Tomcat{#start-tomcat} 
*    (我不建议使用Tomcat网络应用管理器. 如果你不完全关闭和启动Tomcat, 你迟早会有PermGen的记忆问题。)   
     
*    (在Linux或Mac OS中,如果您创建了运行Tomcat的特殊用户,例如Tomcat,请记住作为该用户做以下步骤.)   
     
* 如果Tomcat已经运行, 关闭Tomcat与 (在 Linux 或 Mac OS 中) _tomcat_/bin/shutdown.sh (中文(简体) ).
或 (在窗口中) 缩略语(_T)shutdown.bat
    
在 Linux 上,使用 ps - ef|grep tomcat在关闭前后.sh确保tomcat进程停止. 这一过程应当在停产前列出,最终在停产后不列出. 可能需要一两分钟ERDDAP™完全关闭。 耐心点 或者,如果看起来它不会停止 自己,使用:
杀死 -9_进程ID_
    
* 开始汤姆卡特 (在 Linux 或 Mac OS 中) _tomcat_/bin/启动.sh
或 (在窗口中) _tomcat_\\bin\\启动.bat

## 已经ERDDAP™运行?{#is-erddap-running} 
使用浏览器尝试查看 http://_www.YourServer.org_/erddap/status.html   
ERDDAP™启动时没有装入任何数据集。 数据集被装入一个背景线条,因此可以逐一使用.

### 解决问题{#troubleshooting} 
* 当用户的请求出现时,它会变成Apache (在 Linux 和 Mac OS 计算机上) 然后汤姆卡特,然后ERDDAP™。 。 。 。
* 你可以看到阿帕奇会怎样 (及相关错误) 在 Apache 日志文件中。
*   [你们](/docs/server-admin/additional-information#tomcat-logs)能看到汤姆卡特的遭遇 (及相关错误) 在 Tomcat 日志文件中 (_tomcat_/logs/catalina.out 和该目录中的其他文件) 。 。 。 。
*   [你们](/docs/server-admin/additional-information#log)看得出来ERDDAP,从ERDDAP错误消息ERDDAP时,ERDDAP™ &lt;bigParrent Directory&gt;logs/log.txt文件.
* Tomcat没有开始ERDDAP™直到Tomcat收到请求ERDDAP™。 。 。 如果开始, 您可以在 Tomcat 日志文件中看到ERDDAP™或者如果存在与该尝试有关的错误信息。
* 何时ERDDAP™开始,它重命名旧的ERDDAP™日志.txt 文件 (对数ArchivedAt_当前时间_.txt) 并创建新的log.txt文件。 所以,如果木头。 txt 文件是旧的, 这是一个标志ERDDAP™最近还没有重启。ERDDAP™将信息日志写入缓冲器, 只将缓冲器定期写入日志文件, 但是您可以强制ERDDAP™通过访问将缓冲写入日志文件.../erddap/status.html。 。 。 。

### 问题:Java {#trouble-old-version-of-java} 
如果你正在使用一个版本Java这太老了ERDDAP, (中文).ERDDAP™将不会运行, 您将会在 Tomcat 的日志文件中看到错误信息 。
线索"main" java.lang中的例外 。 未支持的 ClassVersion Error :
某些/ 类/ 名称(_S): 未支持的主. minor 版本 _ some number_
解决办法是更新最新版本的Java并且确保Tomcat正在使用它。

### 麻烦: 第一次启动缓慢{#trouble-slow-startup-first-time} 
Tomcat在第一次申请的时候必须做很多工作ERDDAP™开始; 值得注意的是, 它必须解开 erddap。 战争文件 (这就像一个.zip文件) 。 。 。 在一些服务器上,第一次尝试查看ERDDAP™摊位 (30秒钟?) 直到完成这项工作。 在其他服务器上,第一次尝试会立即失败. 但是如果你再等30秒再试一次,它就会成功,如果ERDDAP™已正确安装。
这一点是无法解决的。 汤姆卡特就是这样工作的 但这只是你安装新版本之后的第一次ERDDAP™。 。 。 。

## 关闭并重新启动{#shut-down-and-restart} 
将来要关门 (并重新启动)  ERDDAP,见[如何关闭和重新启动汤姆卡特ERDDAP](/docs/server-admin/additional-information#shut-down-and-restart)。 。 。 。
## 麻烦?{#trouble} 
安装Tomcat或ERDDAP? 。 。 。 看我们的[关于获得额外支助的章节](/docs/intro#support)。 。 。 。
## 关于新版本的电子邮件通知ERDDAP {#email-notification-of-new-versions-of-erddap} 
如果您想要在新版本时收到电子邮件ERDDAP™可用或其他重要ERDDAP™通知时,您可以加入ERDDAP™通知列表[这里](https://groups.google.com/g/erddap-announce)。 。 。 该列表平均每三个月发送一次电子邮件。
## 自定义{#customize} 
[自定义ERDDAP™以突出您的组织 (没有NOAA ERD) 。 。 。 。](#customize)
    * 更改显示在顶端的横幅ERDDAP™.html 通过编辑&lt;在您的标签中启动 BodyHtml5 & gt; 标记datasets.xml文档。 (如果没有,请从ERDDAP因为
        \\[移动猫\\]/webapps/erddap/WEB-INF/class/gov/noaa/pfel/erddap/util/messages.xml 文件输入datasets.xml并编辑其内容. ) 例如,你可以:
        * 使用不同的图像 (即你的组织的标志) 。 。 。 。
        * 更改背景颜色 。
        * 变化 "ERDDAP"给"你的组织"ERDDAP" , "
        * 将"方便获取科学数据"改为"方便获取_你的组织_数据".
        * 更改“ 带给你的” 链接, 成为你的组织和资金来源的链接 。
    * 通过编辑&lt;在您的标记中描述Html & gt; 标记datasets.xml文档。 (如果没有,请从ERDDAP因为
        \\[移动猫\\]/webapps/erddap/WEB-INF/class/gov/noaa/pfel/erddap/util/messages.xml 文件输入datasets.xml并编辑其内容. ) 例如,你可以:
        * 描述你的组织和/或团体的工作。
        * 描述这种数据类型ERDDAP™对
    * 要更改浏览器标签上出现的图标, 请将您的组织的favicon 。 进入_tomcat_/content/erddap/图/. 见[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon)。 。 。 。
