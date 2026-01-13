---
sidebar_position: 2
---
# 更新
如何对现有文件进行更新 ERDDAP™ 在您的服务器上

## 变动{#changes} 
1. 更改列表 [变动](/changes) 在题为“事项”的一节中 ERDDAP™ 管理者需要知道和做" ERDDAP™ 自你使用的版本以来的版本。
     
##  Java  {#java} 
2. 如果你正在升级 从 ERDDAP™ 2.18或以下版本,需要切换到 Java 第25条 (或更新) 和相关的Tomcat 10. 见常规 ERDDAP™ 安装指令 [ Java ](/docs/server-admin/deploy-install#java) 和 [汤姆猫](/docs/server-admin/deploy-install#tomcat) 。 。 。 你也得复制你的书 _tomcat_/content/erddap 从旧的Tomcat安装到新的Tomcat安装的目录。

## 下载{#download} 
3. 下载 [战争](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) 输入 _tomcat_/webapps 。
     (2.29.0,706,788,135字节,MD5=A5ED0DCC8D46CA27640FFEB8CE4A8560,日期为12-15-2025年) 
     
## 信件. xml{#messagesxml} 
4. 
    * 常见 : 如果你正在升级 从 ERDDAP™ 1.46版本 (或超过) 您只需使用标准消息,新标准消息.xml将自动安装 (在通过 erddap 的类文件中。 战争) 。 。 。 。
         
    * 罕见 : 如果你正在升级 从 ERDDAP™ 1.44版 翻译: (或以下) , (中文).
您必须删除旧信件.xml 文件 :
         _tomcat_/content/erddap (原始内容存档于2018-09-29). messages.xml.
将自动安装新标准消息. xml (在通过 erddap 的类文件中。 战争) 。 。 。 。
         
    * 罕见 : 如果您总是修改标准消息. xml 文件 (到位) , (中文).
您需要修改新信件.xml文件(即
WEB-INF/class/gov/noaa/pfel/erddap/util/messages.xml 在erddap.war后被Tomcat解压.
         
    * 罕见 : 如果您维护自定义信件. xml 文件 。 _tomcat_/content/erddap / , (帮助)
你必须要想清楚 (通过 diff) 对默认信件.xml(在新 erddap 中)做了哪些修改 。 作为战争
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml),并相应修改您的自定义消息.xml文件.
         
## 安装{#install} 
5. 安装新 ERDDAP™ 在汤姆卡特:
\\* 别用Tomcat经理 迟早会有PermGen的记忆问题. 最好实际关闭和启动Tomcat。
将下面的引用_tomcat_替换为计算机上的实际Tomcat目录.
     
### Linux 和 麦克斯{#linux-and-macs} 
1. 关闭 Tomcat: 从命令行,使用:_tomcat_/bin/shutdown.sh
并使用 ps -ef | grep tomcat 以查看进程是否/ 何时停止 。 (可能需要一两分钟。) 
2. 删除已解压 ERDDAP™ 安装 : 在_tomcat_/webapps中,使用
rm -rf erddap (英语).
3. 删除旧的 erddap 。 战争文件:在_tomcat_/webapps中,使用rm erddap. 战争
4. 复制新的 erddap 。 从临时目录到_tomcat_/webapps 的战争文件
5. 重新启动Tomcat和 ERDDAP : 使用_tomcat_/bin/启动.sh
6. 视图 ERDDAP™ 在浏览器中检查重新启动是否成功。
     (经常,你必须尝试几次 等待一分钟,然后你看到 ERDDAP™ 。 。 。 。)   
             
### 窗口{#windows} 
1. 关闭 Tomcat: 从命令行中, 使用: _ tomcat_\\\\\\\\\\ shutdown.bat 
2. 删除已解压 ERDDAP™ 安装 : 在_tomcat_/webapps中,使用
德尔/S/Q 尔达普
3. 删除旧的 erddap 。 战争文件 : 在_tomcat__\\webapps中,使用del erddap. 战争
4. 复制新的 erddap 。 从临时目录到_tomcat__webapps 的战争文件
5. 重新启动Tomcat和 ERDDAP : 使用 _tomcat_\\__bin\\启动.bat
6. 视图 ERDDAP™ 在浏览器中检查重新启动是否成功。
     (经常,你必须尝试几次 等待一分钟,然后你看到 ERDDAP™ 。 。 。 。) 

问题更新 ERDDAP ? 。 。 。 看我们的 [关于获得额外支助的章节](/docs/intro#support) 。 。 。 。
