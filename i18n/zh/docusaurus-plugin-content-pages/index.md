---
title: "ERDDAP™ Documentation"
---
## 最新数据ERDDAP™版本{#latest-erddap-version} 

2.28.0, 见[更改文档](/changes#version-2280)和[下载](https://github.com/ERDDAP/erddap/releases/tag/v2.28.0)。 。 。 。

## ERDDAP™资料{#erddap-information} 

ERDDAP™是一个科学数据服务器,它为用户提供了一个简单、一致的下载子集的方法。
以通用文件格式编成网格和表格式科学数据集,并制作图表和地图。
ERDDAP™是一个自由和开放源代码 (阿帕奇语和阿帕奇语)  Java来自NOAA NMFS SWFSC环境研究司 (ERD) 。 。 。 。

* 见/使用ERDDAP™安装 :[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* 要从安装开始读取[部署安装指南](/docs/server-admin/deploy-install)。 。 。 。
* 输入代码请查看[程序员指南](/docs/contributing/programmer-guide)。 。 。 。


下面将找到相关链接,用于提问和如何作出贡献。
* 复议谈话和提问[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)或时[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* 审查问题并提交[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* 要提出专题请求,请遵循本指导意见:[ERDDAP讨论93号 (注释) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## 多次搜索ERDDAP™编号
搜索有两种方法ERDDAP™s 用于数据集:[多次搜索ERDDAP™编号](/SearchMultipleERDDAPs.html)和[ERDDAP™数据集发现](http://erddap.com/)。 。 。 。


## 设置自己的位置ERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™是一个[自由和开放源码](https://en.wikipedia.org/wiki/Free_and_open-source_software)┮Τ...Java  (服务器) ,在网络应用程序服务器中运行的网络应用程序 (例如,汤姆卡特 (建议) ,或杰蒂 (有用,但我们不支持) ) 。 。 。 这个网页主要面向人们 (" , "ERDDAP™管理员") 他们想建立自己的ERDDAP™在自己的网站上安装。

要从安装开始读取[部署安装指南](/docs/server-admin/deploy-install)。 。 。 。

### 为什么用ERDDAP™要分发你的数据吗?{#why-use-erddap-to-distribute-your-data} 

因为小努力建立ERDDAP™带来很多好处。

* 如果你已经有一个网络服务来分发你的数据,
你可以设置ERDDAP™可以通过现有服务访问您的数据。
或者,你可以设置ERDDAP™直接从本地文件中获取您的数据。
* 对于每个数据集,只需要写一小块 XML即可告诉ERDDAP™如何访问数据集。
* 一旦你发现ERDDAP™为您提供数据,终端用户可以:
    * 以各种方式要求数据 (DAP, (中文).WMS,以及未来的更多) 。 。 。 。
    * 以各种文件格式获取数据响应. (这可能是最大的原因&#33;) 
    * 制作图表和地图。 (每个人都喜欢漂亮的照片。) 
    * 将其他有用和有趣的东西建在ERDDAP'web 服务 - 见[Awesome ERDDAPTM 电话](https://github.com/IrishMarineInstitute/awesome-erddap)帅呆了ERDDAP- 相关项目。

你当然可以[自定义](/docs/server-admin/deploy-install#customize)您的电话ERDDAP看来如此ERDDAP™反映您的组织,并适应您的其他网站。

## 安装程序有困难吗? 我可以吗?{#is-the-installation-procedure-hard-can-i-do-it} 

初始安装需要一些时间,但并不难. 你可以做到这一点。 如果你被卡住了,给我发邮件erd dot data at noaa dot gov。 。 。 。 我会帮你的
或者,你可以参加[ERDDAP™谷歌集团/ 邮件列表](https://groups.google.com/g/erddap)把你的问题张贴在那里。

## 谁使用ERDDAP™ {#who-uses-erddap} 

ERDDAP™至少有17个国家的约100个组织已安装

 (澳大利亚、比利时、加拿大、中国、法国、印度、爱尔兰、意大利、新西兰、俄罗斯、南非、西班牙、斯里兰卡、瑞典、泰国、联合王国、美国) ,包括:

*   [APDRC 软件](https://apdrc.soest.hawaii.edu/erddap/index.html)  (国际太平洋研究中心亚太数据研究中心) 夏威夷大学 (额)  
*   [在卫生组织的BCO-DMO](https://erddap.bco-dmo.org/erddap/index.html)  (生物和化学海洋学 伍兹霍尔海洋学数据管理办公室 机构)  
*   [罐头ERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (加拿大流域信息网) 地球观测科学中心 (地球观测卫星委员会) 马尼托巴大学
*   [土发委会](https://erddap.cdip.ucsd.edu/erddap/index.html)  (可持续发展大学沿海数据信息方案)  
*   [CNR-ISP 国家信息系统](https://data.iadc.cnr.it/erddap/index.html)  (意大利国家研究理事会,极地科学研究所)  
* CSIRO和海事组织 (澳大利亚的英联邦科学和工业研究组织和综合海洋观测系统) 
*   [驾驶员 (NOAAORR (英语).) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAA反应和恢复办公室)  
*   [EMODnet 物理学](https://erddap.emodnet-physics.eu/erddap/index.html)  (欧洲海洋观测和数据网络 -- -- 物理学)  
*   [戈马里](https://erddap.griidc.org/erddap/index.html)  (墨西哥湾研究倡议)  
*   [哈凯研究所](https://catalogue.hakai.org/erddap/index.html)  (加拿大不列颠哥伦比亚中海岸Hakai研究所) 
*   [高中技术服务](https://myhsts.org)为学生和成年人提供编码和技术培训
*   [化学和化学中心](https://erddap.ichec.ie/erddap/index.html)  (爱尔兰高端电子计算中心) 
*   [页:1NCO页:1](https://erddap.incois.gov.in/erddap/index.html)  (印度国家海洋信息服务中心)  
* IRD (英语). (法国发展研究所)   
国家遥感中心 (法国国家科学研究中心)   
UPMC 网络 (皮埃尔和玛丽大学 巴黎库里 法国)   
城市发展联盟 (塞内加尔达喀尔谢赫·安塔·迪奥普大学)   
UGB 数字 (Gaston Berger大学 -- -- 圣路易斯-塞内加尔)   
UFHB 数字化 (费利克斯大学 科特迪瓦阿比让HOUPHOUT-BIGNY)   
IPSL 软件 (巴黎Pierre Simon Laplace 科学研究所 法国)   
利比里亚 (混合体国际 “非洲西部气候和相互影响环境,以及支持气候服务”) 
* 联合来文委员会 (欧洲联盟委员会-欧洲联盟联合研究中心) 
*   [海洋研究所](https://erddap.marine.ie/erddap/index.html)  (爱尔兰)  
* 海洋仪器公司 (页:1) 
* 国家儿童研究所 (澳大利亚的国家计算基础设施) 
*   [NOAA海岸观察](https://coastwatch.noaa.gov/erddap/index.html)  (中央区)  
*   [NOAA海岸观测中心](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (加勒比/墨西哥海湾节点)  
*   [NOAA海岸观察组](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (大湖区节点)  
*   [NOAA海岸观察西海岸](https://coastwatch.pfeg.noaa.gov/erddap/index.html)和工作室合用
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (环境研究司SWFSC页:1NMFS) 
*   [NOAAIOOS 传感器](https://erddap.sensors.ioos.us/erddap/index.html)  (综合海洋观测系统)  
*   [NOAAIOOS Ce (英语:NCO业务办](https://erddap.axiomdatascience.com/erddap/index.html)  (Axiom数据科学公司运营的加利福尼亚中部和北部海洋观测系统)  
*   [NOAAIOOS GCOOS 大气和海洋学数据:观测系统](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOOS 大气和海洋学数据:历史收藏](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAIOOS GCOOS 生物和社会经济](https://gcoos4.tamu.edu/erddap/index.html)  (海湾沿岸海洋观测系统) 
*   [NOAAIOOS 纳拉科斯](http://www.neracoos.org/erddap/index.html)  (东北沿海和海洋观测系统区域协会)  
*   [NOAAIOOS NGDAC (美国)](https://data.ioos.us/gliders/erddap/index.html)  (国家滑翔器 数据大会中心)  
*   NOAAIOOS 纳诺斯 (西北联网海洋观测系统协会) 
*   [NOAAIOOS 帕西奥斯](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (太平洋岛屿海洋观测系统) 夏威夷大学 (额)  
*   NOAAIOOS SCCOOS (英语: (南加州沿海海洋观测系统) 
*   [NOAA监督办](https://erddap.secoora.org/erddap/index.html)  (东南沿海海洋观测区域协会)  
*   [NOAA国家教育倡议](https://www.ncei.noaa.gov/erddap/index.html)  (国家环境信息中心)    
*   NOAANGDC STP (国家地球物理 太阳 -- -- 地面物理数据中心) 
*   NOAA NMFS国家粮食安全委员会 (东北渔业科学中心.) 
*   [NOAANOS CO-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (业务海洋学产品和服务中心)  
*   [NOAAOSMC公司](http://osmc.noaa.gov/erddap/index.html)  (观测系统监测中心)  
*   [NOAAPIFSC 系统](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (太平洋岛屿渔业科学中心)  
*   [NOAA组合](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAA极地观察](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAA乌阿联](https://upwell.pfeg.noaa.gov/erddap/index.html)  (统一访问框架)  
*   [加拿大海洋网络](http://dap.onc.uvic.ca/erddap/index.html) 
*   [海洋跟踪网络](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / 所有数据](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (海洋观测站倡议)   
OOI / 无法读取的数据
* 普林斯顿水文气象研究小组
* 法国R.Tech工程公司
*   [Rutgers大学海洋和沿海科学系](https://tds.marine.rutgers.edu/erddap/index.html)  
* 旧金山研究院
*   [斯克里普斯海洋学研究所](https://spraydata.ucsd.edu/erddap/index.html) 
*   [聪明的大西洋](https://www.smartatlantic.ca/erddap/index.html)纽芬兰纪念大学
* 南非环境观测网
* 玻璃技术
* 斯坦福大学,霍普金斯海洋站
*   [教科文组织](https://erddap.oa.iode.org/erddap/index.html)  (国际海洋学和信息 数据交换)  
*   [不列颠哥伦比亚大学,地球、海洋和大气 科学部](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [加州大学戴维斯分校 博德加海洋实验室](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [特拉华大学卫星接收站](https://basin.ceoe.udel.edu/erddap/index.html) 
* 华盛顿大学应用物理实验室
*   [USGS CMGP 移动](https://geoport.usgs.esipfed.org/erddap/index.html)  (沿海和海洋地质方案)  
*   [瓦努阿图](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (瑞典海洋之声)  

这是一份仅列出一些组织的清单。ERDDAP™由某些个人或某些团体安装。 并不意味着个人、团体或组织建议或赞同ERDDAP。 。 。 。

### ERDDAP™建议在NOAA国家遥感中心{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAA数据访问程序指令](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)包含ERDDAP™建议的数据服务器清单,供内部各组使用NOAA。 。 。 。ERDDAP™第4.2.3节中提及
[关于管理研究的指南
 (研究数据管理 最佳做法指南) [ . ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) 国家科学研究中心 (国家遥感中心) 在法国。

## 幻灯片放映{#slide-shows} 

以下是一些PowerPoint幻灯片放映和鲍勃·西蒙斯所创建的文档,涉及ERDDAP。 。 。 。

 **DISCLAIMER:这些文件的内容和意见是鲍勃·西蒙斯的个人意见,并不一定反映政府或政府的任何立场。National Oceanic and Atmospheric Administration。 。 。 。** 

四个主要文件:

*   [主要介绍ERDDAP™  (版本 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx)。 。 。 。
你们也可以[看这段关于鲍勃的录像![视频](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4)。 。 。 。
*   [一页ERDDAP™  (.pdf (英语).) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAP:重载、网格、集群、联合会和云计算](/docs/server-admin/scaling)
*   [Bob的数据分配系统准则](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

其他发言:

*   [2020 EDM: 中新地物ERDDAP™页:1](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 (中文(简体) ). DMIT:数据错误](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (或者说[看这段关于鲍勃的录像](https://www.youtube.com/watch?v=9ArYxgwON2k)。 。 。 。) 
*   [2019 IOOS DMAC:新特征在ERDDAP™页:1](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 (英语). 夏季 ESIP : 子设置ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 (英语). 夏季 ESIP: JSON 支持 InERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM:一个分布式网络服务系统 (快点,轻松,便宜点)   (或者,为什么四年前我很开心。) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EMDM: (英语).ERDDAP™2018年统计](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: 内置新功能ERDDAP™图像、音频和视频数据](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF 和ERDDAP™数据整合解决方案](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM:一个快速介绍ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM和2017 IOOS:新知或小知ERDDAP™特征 (用户) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM和2017 IOOS:新知或小知ERDDAP™特征 (为管理员服务) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017 EMM: EML, KNB, 和ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 (英语). 行政领导和管理: 数据是如何从源到终端用户的? 老学校与新学校](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 (英语). Summer ESIP: The Big Pictures: PARR, 互联网档案馆的存檔,存档日期2014-09-02.OPeNDAP, (中文).ERDDAP™和数据分布](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016年EDM:一个并完成](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 (英语). Gov API:下一代 数据服务器](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015 (英语). Summer ESIP:表型聚合](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014. EDM: Bob's Do's and Don't for Tabular Data (中文(简体) ).](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM:理想用户界面](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014 (中文(简体) ). Summer ESIP: 表格数据](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013年:不要像刻版数据那样处理内置和表格式数据](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013. EDM: 少花钱多办事](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: 数据发布系统指南](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

其他人的发言:

*   [改进全球数据共享的基于公平评估工具![视频](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
由凯文·奥布莱恩在全球海洋观测系统 (海鸥) 韦比纳尔/观察协调小组 (主计长) 系列 / 1, 2020年11月12日.
*   [构建自己的天气应用NOAA打开数据和Jupyter笔记本![视频](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
由Filipe Fernandes和Rich Signell在SciPy 2018,2018年7月13日拍摄.
*   [使用 OOI( OOI) 系统ERDDAP![视频](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
由Rich Signell著,2018年2月.
*   [欧统局 技术潜水: "ERDDAP闪电谈话"![视频](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
八次关于人们所经历的有趣事情的5分钟会谈ERDDAP由Jenn Sevadjian,Jim Potemra,Conor Delaney,Kevin O'Brien,John Kerfoot,Stephanie Petillo,查尔斯·卡莱顿和Eli Hunter于2017年8月31日作为ESIP Tech Dive提交.
*   [使用ERDDAP™访问表格数据![视频](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
由Rich Signell著,2015年8月.
*   [测试使用ERDDAP™用于蓝碳数据![视频](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
由Rich Signell著,2015年8月.
*   [使用数据来源ERDDAP™输入NOAA因为GNOME软件![视频](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM)。 。 。 。
在这部视频中,Rich Signell下载洋流预报数据ERDDAP™模拟海洋中的有毒溢出物[NOAA因为GNOME软件](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (五分钟后&#33;) 。 。 。 。 (视频中的一个小错误:在搜索数据集时,不要使用和搜索术语之间. 这是隐含的。) 由Rich Signell著,2011年4月8日.
