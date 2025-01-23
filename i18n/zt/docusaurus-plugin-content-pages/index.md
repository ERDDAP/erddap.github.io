---
title: "ERDDAP™ Documentation"
---

## ERDDAP™信息{#erddap-information} 

ERDDAP™是一款科學數據伺服器,它讓使用者有簡單、一致的方式下載子集
以普通檔案格式建立格子化和表格化的科學數據集,並制作圖和地圖。
ERDDAP™是自由開放的來源 (阿帕奇和阿帕奇類型)  Java服務來自NOAA NMFS SWFSC司 (ERD) .

* 看/使用ERDDAP™安裝 :[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* 要從安裝開始讀取[部署安裝指南](/docs/server-admin/deploy-install).
* 提供代碼[程式指南](/docs/contributing/programmer-guide).


問問及如何協助,
* 評論對話,[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)或于[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* 审查和提交[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* 要提出特征要求,请遵循本指南:[ERDDAP討論 #93 (註解) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## 多重搜尋ERDDAP™s
搜索有兩種方法ERDDAP™s 指數集:[多重搜尋ERDDAP™s](/SearchMultipleERDDAPs.html)和[ERDDAP™數據集探索](http://erddap.com/).


## 設置自己的位置ERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™是[自由開放源碼](https://en.wikipedia.org/wiki/Free_and_open-source_software)全部...Java  (伺服器) ,在網頁應用程式伺服器中執行的網頁應用程式 (例如,Tomcat (推荐) ,或杰蒂 (但我們不支持) ) . 這個網頁大多是給人看的 ("ERDDAP™管理者") 想要建立自己的ERDDAP™在自己的网站上安裝。

### 為何使用ERDDAP™要傳播你的資料嗎?{#why-use-erddap-to-distribute-your-data} 

因為小努力的建立ERDDAP™帶來很多利益

* 如果你已經有網路服務來分配你的資料
你可以設置ERDDAP™以存取您的資料。
或者,你可以設置ERDDAP™直接從本地檔案存取您的資料 。
* 您只需寫入小塊 XML 就可以告訴ERDDAP™如何存取數據集。
* 一旦你有了ERDDAP™提供您的數據, 最终用户可以:
    * 以各种方式要求資料 (DAP,WMS以及未來更多) .
    * 以不同的檔案格式取得資料回應 。 (這可能是最大的原因&#33;) 
    * 做圖和圖 (每個人都喜歡漂亮的照片) 
    * 在上面建有其他有用和有趣的東西ERDDAP'web services - 參考[Awesome ERDDAPTM](https://github.com/IrishMarineInstitute/awesome-erddap)真棒ERDDAP- 相關計畫

你可以[自訂](/docs/server-admin/deploy-install#customize)您ERDDAP看起來如此ERDDAP™反映您的組織 并符合您的其他網站。

## 安裝程序難嗎? 我能做嗎?{#is-the-installation-procedure-hard-can-i-do-it} 

最初的安裝需要一些時間,但并不難. 你能做到的。 如果你被卡住了,發郵件給我erd dot data at noaa dot gov. 我會幫你的
或者,你可以加入[ERDDAP™Google 群組/ 郵件清單](https://groups.google.com/g/erddap)把你的問題放在那裡

## 使用ERDDAP™ {#who-uses-erddap} 

ERDDAP™至少17個國家的約100個組織已安裝

 (澳洲、比利時、加拿大、中國、法國、印度、愛爾蘭、意大利、紐西蘭、俄羅斯、南非、西班牙、斯里蘭卡、瑞典、泰國、英國、美國) ,包括:

*   [APDRC 檔案](https://apdrc.soest.hawaii.edu/erddap/index.html)  (太平洋研究中心) 夏威夷大學 (嗯)  
*   [在WHOI的BCO -DMO](https://erddap.bco-dmo.org/erddap/index.html)  (生物和化学海洋学 Woods Hole海洋学研究所 机构)  
*   [罐頭ERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (加拿大流域信息网) 在地球观测科學中心 (地球观测卫星委员会) 馬尼托巴大學
*   [CDIP 檔案](https://erddap.cdip.ucsd.edu/erddap/index.html)  (UCSD 海岸資料資訊程式)  
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)  (意大利國家研究會极地科學研究所)  
* CSIRO和IMOS (聯邦科學和工業研究組織及海洋综合观测系统) 
*   [滴 (NOAAERR( 公文)) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAA答复和恢复办公室)  
*   [EMODnet 物理](https://erddap.emodnet-physics.eu/erddap/index.html)  (歐洲海洋觀測與數據網絡-物理)  
*   [戈米里](https://erddap.griidc.org/erddap/index.html)  (墨西哥湾研究倡议)  
*   [夏井研究所](https://catalogue.hakai.org/erddap/index.html)  (加拿大不列颠哥伦比亚省中海岸的Hakai研究所) 
*   [高中技術](https://myhsts.org)它為學生和成人提供編碼和技術訓練
*   [ICHEC( 芝加哥)](https://erddap.ichec.ie/erddap/index.html)  (愛爾蘭高端計算中心) 
*   [我NCOIS](https://erddap.incois.gov.in/erddap/index.html)  (印度国家海洋信息服务中心)  
* IRD (法國发展研究所)   
CNRS (法國科学研究中心)   
UPMC 中 (皮埃爾和瑪麗大學 巴黎的庫里 法國)   
加州 (塞內加爾达喀尔谢赫·安塔·迪奥普大學)   
UGB 檔案 (Gaston Berger大学 -- -- 圣路易斯-塞内加尔)   
UFHB 語言 (菲利克斯大學 科特迪瓦,阿比让)   
IPSL (巴黎Pierre Simon Laplace 科學研究所 法國)   
利米 (混合国际 “非洲气候与生态互动之旅”) 
* JRC 聯合 (歐洲聯合研究中心) 
*   [海洋研究所](https://erddap.marine.ie/erddap/index.html)  (愛爾蘭)  
* 海洋仪器公司 (西班牙) 
* NCI (澳洲國家計算基建) 
*   [NOAA海岸觀察](https://coastwatch.noaa.gov/erddap/index.html)  (中央)  
*   [NOAA海岸觀察中心](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (加勒比/墨西哥海湾)  
*   [NOAA海岸觀察](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (大湖区節點)  
*   [NOAA海岸觀察西海岸](https://coastwatch.pfeg.noaa.gov/erddap/index.html)和它合用
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (司SWFSC四,NMFS) 
*   [NOAAIOOS 感應器](https://erddap.sensors.ioos.us/erddap/index.html)  (海洋综合观测系统)  
*   [NOAAiOOS Ce( 歐塞)NCOOS](https://erddap.axiomdatascience.com/erddap/index.html)  (中北加州海洋觀察系統,由Axiom數據科學管理)  
*   [NOAAIOOS GCOOS 大气和海洋学資料:观测系统](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOOS 大气和海洋学資料:歷史收藏](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAIOOS 生物和社会经济](https://gcoos4.tamu.edu/erddap/index.html)  (海湾海岸海洋观测系统) 
*   [NOAA伊奧斯·內拉科斯](http://www.neracoos.org/erddap/index.html)  (东北沿海和海洋观测系统)  
*   [NOAAIOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)  (國家滑翔機 資料會議中心)  
*   NOAA伊奧斯·納諾斯 (网络海洋观测系统西北协会) 
*   [NOAAIOOS 帕西奧斯](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (太平洋群島海洋观测系统) 夏威夷大學 (嗯)  
*   NOAAIOOS SCCOOS (南加州沿海海洋观测系统) 
*   [NOAA伊奧斯·塞奧拉](https://erddap.secoora.org/erddap/index.html)  (东南沿海海洋观测局)  
*   [NOAANEI](https://www.ncei.noaa.gov/erddap/index.html)  (國家環境信息中心)    
*   NOAANGDC STP (國家地球物理 資料中心, Solar -- -- 地面物理) 
*   NOAA NMFSNEFSC (东北渔业科學中心) 
*   [NOAANOS CO-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (海洋产品和服务中心)  
*   [NOAAOSMC](http://osmc.noaa.gov/erddap/index.html)  (观测系统監控中心)  
*   [NOAAPIFSC 檔案](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (太平洋群島渔业科學中心)  
*   [NOAA平面](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAA极地觀察](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAUAF](https://upwell.pfeg.noaa.gov/erddap/index.html)  (统一存取框架)  
*   [加拿大海洋网](http://dap.onc.uvic.ca/erddap/index.html) 
*   [海洋跟踪网](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / 所有資料](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (海洋观测站倡议)   
OOI / 找不到資料
* 普林斯顿水文气象研究小组
* R.Tech工程公司,法國
*   [Rutgers大學海洋和沿海科學系](https://tds.marine.rutgers.edu/erddap/index.html)  
* 旧金山愛思堡研究所
*   [斯克里普斯海洋学研究所,喷射水下滑翔機](https://spraydata.ucsd.edu/erddap/index.html) 
*   [智慧大西洋](https://www.smartatlantic.ca/erddap/index.html)纽芬兰紀念大學
* 南非环境观测网
* 玻璃科技
* 斯坦福大學,霍普金斯海洋站
*   [教科文社](https://erddap.oa.iode.org/erddap/index.html)  (海洋学和信息 資料交流)  
*   [英屬哥倫比亞大學,地球,海洋和大气 科學部](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [加州大學戴維斯分校 博德加海洋实验室](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [特拉華大學卫星接收站](https://basin.ceoe.udel.edu/erddap/index.html) 
* 華盛頓大學应用物理實驗室
*   [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)  (沿海和海洋地质方案)  
*   [伏托](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (瑞典海洋之聲)  

這只是一些組織的列表ERDDAP™已安裝 。 這不意味著個人、團體或組織建議或贊成ERDDAP.

### ERDDAP™在NOAA和 CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAA資料存取程序指令](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)包括ERDDAP™供內部群組使用NOAA.ERDDAP™第4.2.3款
研究管理指南
 (研究資料管理 最佳做法指南) [ [ ] ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) 科研中心 (CNRS) 在法國

## 投影片放映{#slide-shows} 

以下是一些PowerPoint幻灯片放映和鮑勃·西蒙斯建立的文件,與ERDDAP.

 **這些文件的内容和意見是Bob Simons的个人意見,National Oceanic and Atmospheric Administration.** 

四大文件:

*   [主要引言ERDDAP™  (版本5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx).
你也可以[看這段關於鮑勃的影片![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4).
*   [一頁描述ERDDAP™  (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAP: 重载、网格、群組、聯盟和云计算](/docs/server-admin/scaling)
*   [Bob的數據分配系統指南](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

其他演示文稿:

*   [2020 EDM: 新的功能ERDDAP™v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 DMIT: 數據失誤](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (或者[看這段關於鮑勃的影片](https://www.youtube.com/watch?v=9ArYxgwON2k).) 
*   [2019年 IOOS DMAC: 新地物在ERDDAP™v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018年 夏季 ESIP: 子集ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018年 夏季 ESIP: JSON 支援 inERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: 分布式的Web服務系統 (更快, 容易, 便宜)   (或者,為什麼我四年前快樂。) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EDM:ERDDAP™2018年](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: 在ERDDAP™影像、音效和影像資料](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF 和ERDDAP™數據整合解决方案](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017EDM:快速介紹ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM 和 2017 IOOS:新或小已知ERDDAP™特征 (使用者) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM 和 2017 IOOS:新或小已知ERDDAP™特征 (供管理員使用) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017 EDM:EML、KNB和ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017年 EDM : 資料如何從來源傳到終端使用者? 老學校對新學校](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016年 Summer ESIP:大圖片:PARR,OPeNDAP,ERDDAP™資料分配](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016年 EDM: 一并完成](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016年 Gov API: 下一代 資料伺服器](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015年 夏季 ESIP: 表格聚合](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014. EDM: Bob's Do's and Don't for Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014. EDM:理想使用者介面](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014年 Summer ESIP: 表格資料](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013年: 不要像文字資料一樣對待內部和表格資料](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013年 EDM: 用少點做更多](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012年 EDM: 數據分配系統指南](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

其他人的演講:

*   [改善全球數據共享的基于 FAIR 的工具![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
作者:凱文·奧布萊恩 (海豹) 維比納(Webinar) (OCG :) 第1系列 2020年11月12日.
*   [建立自己的天氣應用程式NOAA開啟資料和 Jupyter 便條![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
2018年7月13日,
*   [使用OOIERDDAP![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
2018年2月,
*   [西班牙 科技潛水: "ERDDAP閃電談話![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
八次五點的談判 人們正在做的有趣的事情ERDDAP由Jenn Sevadjian、Jim Potemra、Conor Delaney、Kevin O'Brien、John Kerfoot、Stephanie Petillo、Charles Carleton和Eli Hunter於2017年8月31日以ESIP Tech Dive的身分發表。
*   [使用ERDDAP™存取表格資料![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
2015年8月,
*   [測試使用ERDDAP™藍碳數據![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
2015年8月,
*   [使用資料來源ERDDAP™ inNOAA是GNOME軟體![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM).
Rich Signell在影片中下載洋流預測數據ERDDAP™在海洋中建模有毒的溢出物[NOAA是GNOME軟體](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (5分鐘后&#33;) . (影片中一個小錯誤:在搜尋數據集時, 意思是...) 2011年4月8日,
