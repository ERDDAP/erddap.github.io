---
sidebar_position: 3
---
#  ERDDAP™ 释放进程
* 确保图像比较文件可用 (这可能意味着跑 `mvn 验证` ,如果您想要加快速度, 请只限制图像比较组, 尽管需要进行 Jetty 测试) 
* 更新依赖关系
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* 更新插件
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* 运行测试以确保依赖性更新不会损坏所有主要配置的任何东西 (数据集特别解析,尽管任何其他重要设置) 。 。 。 。 注意,外部的测试套件可能非常平板. 慢AWS测试套件需要很长的时间.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* 使用 `python 翻译/翻译.py` 如果需要,将更新翻译。
* EDStatic.java 设置开发 模式到虚假,更改版本编号并指定发布日期.
* 做建设。
```
mvn clean
mvn compile
mvn package
```
## 加那利语Name
将战争文件发送到海岸观察服务器或其他使用大部分数据集类型并接收大量流量的服务器上进行分发.
我们想在建筑的更广泛分布之前找出错误.

告诉新发布时包含消息 。

标准程序是:
* 上传. \\[ 移动猫 \\] /内容/erddap/
* 作为用户=tomcat :
  * 单位 \\[ 移动猫 \\] /宾/:
./shutdown.sh // 使用"ps-fu tomcat"以确保它已经停止
  * 单位 \\[ 移动猫 \\] /webapps/ : (中文(简体) ).
rm -rf erddap (英语).
(原始内容存档于2018-10-21). Rm erddap. 战争
页:1 ./内容/erddap/erddap2.22. 瓦尔 erddap.war/或无论数字是什么
  * 单位 \\[ 移动猫 \\] /宾/:
./启动.sh
  * 之后 ERDDAP 已返回网页,单位: \\[ 移动猫 \\] /webapps/ : (中文(简体) ).
chgrp - R 尔德达普 尔德达普
chmod - R g+rw erddap 调制
chmod - R o-rwx erddap (英语:

## GitHub 发布
GitHub发布稿,包括erddap.war和erddapContent .zip   (无版本编号) 

title: The official v2.25 version
说明: 参见更改列表
       https://erddap.github.io/changes#version-225
 

## 文件最新情况
* 更新 docusaurus.config.ts文件中的版本编号 (在页脚中) 。 。 。 。
* 编辑文档页面 (部署/部署/部署/部署/部署/部署) 。 。 。 。
  * 搜索 \\[ 战争 \\]  
  * 复制现有信息 (稍作调整) 以及以往设施清单 2. 联合国
  * 更改当前 erddap 的发布信息 。 战争 \\[ 战争 \\] 
* 运行文档网站的翻译 。
* 请求拉动并合并更改 。
* 部署文件站点 (请参看readme) 。 。 。 。

## 确保根据需要更新其他重置资产
主要指Erddap Content和Erddap Test,但在开发变化期间应当不断更新.

## 通知用户
首先通知任何要求更改的用户 (或谁的虫子被固定) 。 。 。 。 给他们时间核实变化和/或提出问题。

 ERDDAP 2.25版本现在可用&#33;

您可以在
 https://erddap.github.io/changes#version-225
 

其中一些变化是您建议的改变。 非常感谢你的建议。 在更改列表中搜索您的名字以查看细节 。 如果你能很快尝试一下新的特辑, 就能在我向更多的观众宣布这个新版本之前,那将是非常好的。

如果你是一个 ERDDAP 管理员, 升级指令已启用
 https://erddap.github.io/docs/server-admin/deploy-update
 

如果你有什么问题,问题,建议,请发电子邮件给我。

谢谢你使用 ERDDAP 。 。 。 。

### 宣布发布
发送通知邮件列表 。
