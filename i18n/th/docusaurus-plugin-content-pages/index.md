---
title: "ERDDAP™ Documentation"
---
## รุ่นล่าสุดERDDAP™รุ่น{#latest-erddap-version} 

2.26 ดู[เปลี่ยนเอกสาร](/changes#version-226)ถึง[ดาวน์โหลดมัน](https://github.com/ERDDAP/erddap/releases/tag/v2.26.0).

## ERDDAP™ข้อมูล{#erddap-information} 

ERDDAP™เป็นเซิร์ฟเวอร์ข้อมูลทางวิทยาศาสตร์ที่ทําให้ผู้ใช้สามารถดาวน์โหลดสับเซตได้ง่ายขึ้น และสอดคล้องกัน
ข้อมูลทางวิทยาศาสตร์แบบฝังตัวและแท็บมอง ในรูปแบบแฟ้มทั่วไป และทํากราฟและแผนที่
ERDDAP™เป็น แหล่ง ที่ มี อิสระ และ เปิด เผย (อาปาเชและอาปาเช่ที่เหมือน)  Javaรับ ใช้ จากNOAA NMFS SWFSCแผนกวิจัยสิ่งแวดล้อม (ERD) .

* เพื่อดู/ใช้ERDDAP™การติดตั้ง:[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* เพื่อเริ่มอ่านการติดตั้ง[คู่มือการติดตั้งที่ใช้งาน](/docs/server-admin/deploy-install).
* เพื่อสนับสนุนโค้ด ดู[คู่มือโปรแกรมโปรแกรม](/docs/contributing/programmer-guide).


ข้าง ล่าง นี้ คุณ จะ พบ จุด เชื่อม ที่ เกี่ยว ข้อง กับ การ ถาม และ วิธี บริจาค.
* ทบทวนการสนทนาและถามคําถามที่[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)หรือที่[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* ทบทวน และ ส่ง ประเด็น ไป ยัง[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* จง ทํา ตาม คํา แนะ นํา นี้:[ERDDAPการสนทนา # 93 (หมายเหตุ) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## ค้นหาหลายรายการERDDAP™วินาที
มีสองวิธีที่จะค้นหาหลาย ๆERDDAP™s สําหรับชุดข้อมูล:[ค้นหาหลายรายการERDDAP™วินาที](/SearchMultipleERDDAPs.html)ถึง[ERDDAP™ค้นพบชุดข้อมูล](http://erddap.com/).


## ตั้งตัวของคุณเองERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™คือ[เปิดและเปิดแหล่ง](https://en.wikipedia.org/wiki/Free_and_open-source_software)ทั้งหมด...Java  (เซรุ่มName) แอพพลิเคชันที่ทํางานในเว็บบริการเว็บ (ยกตัวอย่างเช่น ทอมแคท (แนะนํา) หรือ เจ็ตตี้ (มันได้ผล แต่เราไม่ได้สนับสนุนมัน) ) . หน้าเว็บนี้ส่วนใหญ่สําหรับคน ("ERDDAP™ผู้ดูแลระบบ") ที่ต้องการที่จะตั้งของตัวเองERDDAP™ติดตั้งที่เว็บไซต์ของพวกเขาเอง

เพื่อเริ่มอ่านการติดตั้ง[คู่มือการติดตั้งที่ใช้งาน](/docs/server-admin/deploy-install).

### ทําไมใช้ERDDAP™เพื่อแจกจ่ายข้อมูลของคุณ?{#why-use-erddap-to-distribute-your-data} 

เพราะความพยายามเล็กๆที่จะตั้งERDDAP™นํา มา ซึ่ง ผล ประโยชน์ มาก มาย.

* ถ้าคุณมีบริการเว็บอยู่แล้ว สําหรับการแจกจ่ายข้อมูล
คุณติดตั้งได้ERDDAP™เพื่อเข้าถึงข้อมูลของคุณผ่านทางบริการที่มีอยู่แล้ว
หรือคุณสามารถตั้งค่าERDDAP™เพื่อเข้าถึงข้อมูลของคุณโดยตรงจากแฟ้มภายในระบบ
* สําหรับข้อมูลแต่ละชุด, คุณเพียงแค่เขียนส่วนย่อยของ XML เพื่อบอกว่าERDDAP™วิธีเข้าถึงชุดข้อมูล
* เมื่อคุณได้ERDDAP™ส่งข้อมูลของคุณ ผู้ใช้ปลายทางสามารถ:
    * ร้องขอข้อมูลในรูปแบบต่าง ๆ (DAP.WMSและมากกว่านั้นในอนาคต) .
    * รับข้อมูลในรูปแบบแฟ้มต่าง ๆ (นั่นน่าจะเป็นเหตุผลที่ใหญ่ที่สุด) 
    * ทํากราฟและแผนที่ (ทุกคนชอบรูปสวยๆทั้งนั้น) 
    * สร้างสิ่งอื่น ๆ ประโยชน์และสิ่งที่น่าสนใจบนERDDAPบริการเว็บ ดู[Awesome ERDDAPขนาด TM](https://github.com/IrishMarineInstitute/awesome-erddap)รายการของสุดยอดERDDAP- โครงการที่เกี่ยวข้อง

คุณทําได้[ปรับแต่งเอง](/docs/server-admin/deploy-install#customize)คุณERDDAPรูปลักษณ์ERDDAP™สะท้อนองค์กรของคุณ และเข้ากับเว็บไซต์ที่เหลือ

## ขั้นตอนการติดตั้งเป็นเรื่องยาก? ทําได้ไหม?{#is-the-installation-procedure-hard-can-i-do-it} 

การติดตั้งเริ่มต้นต้องใช้เวลาบางส่วน แต่ก็ไม่ได้ยากมาก คุณทําได้ ถ้าคุณติด จงอีเมลหาผมerd dot data at noaa dot gov. ผมจะช่วยคุณ
หรือคุณสามารถเข้าร่วม[ERDDAP™กูเกิ้ลกรุ๊ป / รายการจดหมายเวียน](https://groups.google.com/g/erddap)และโพสต์คําถามของคุณที่นั่น

## ใคร ใช้ERDDAP™ {#who-uses-erddap} 

ERDDAP™ได้ ติด ตั้ง องค์กร ต่าง ๆ ประมาณ 100 องค์กร ใน 17 ประเทศ

 (ออสเตรเลีย, เบลเยียม, แคนาดา, จีน, อินเดีย, อินเดีย, ไอร์แลนด์, นิวซีแลนด์, นิวซีแลนด์, รัสเซีย, แอฟริกา ใต้, สเปน, ศรีลังกา, สวีเดน, ไทย, USA) - รวมไปถึง:

*   [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)  (Asia-Pacific Day-Research Center, International Pacific Research Center) ที่ มหาวิทยาลัย ฮาวาย (เอ่อ)  
*   [BCODO ที่ WHOI](https://erddap.bco-dmo.org/erddap/index.html)  (ชีวภาพ และ ธรณี วิทยา สํานักงาน การ จัด การ ข้อมูล ณ พิพิธภัณฑ์ สัตว์ ทะเล ตั้งค่า)  
*   [CanwinERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (เครือข่ายข้อมูลน้ําของแคนาดา) ที่ศูนย์วิทยาศาสตร์โลก (CEOS) มหาวิทยาลัยมานิโทบา
*   [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)  (โปรแกรมข้อมูลฝั่งที่ UCSD)  
*   [CNR- ISP](https://data.iadc.cnr.it/erddap/index.html)  (สภา วิจัย แห่ง ชาติ อิตาลี สถาบัน วิทยาศาสตร์ ขั้ว โลก)  
* CSIRO และ IMOS (International Proomic Science and International International and the International System) 
*   [DIV (NOAAผิดพลาด) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAAสํานักงาน บรรเทา ทุกข์ และ ซ่อมแซม)  
*   [ฟิสิกส์ EMODnet](https://erddap.emodnet-physics.eu/erddap/index.html)  (Observation ของนาวิกโยธินยุโรปและเครือข่ายข้อมูล -- ฟิสิกส์)  
*   [ภาษาโกมีรีName](https://erddap.griidc.org/erddap/index.html)  (อ่าว เม็กซิโก)  
*   [สถาบัน ฮากี](https://catalogue.hakai.org/erddap/index.html)  (สถาบัน ฮากี บน ชายฝั่ง ตอน กลาง ของ บริติช โคลัมเบีย แคนาดา) 
*   [บริการเทคโนโลยีโรงเรียนมัธยม](https://myhsts.org)ซึ่งมีการฝึกการเข้ารหัสและเทคโนโลยี สําหรับนักเรียนและผู้ใหญ่
*   [ICHEC](https://erddap.ichec.ie/erddap/index.html)  (ศูนย์รวมชาวไอริชสําหรับคอมไพล์ระดับสูง) 
*   [ฉันNCOคือ](https://erddap.incois.gov.in/erddap/index.html)  (ศูนย์ข้อมูลมหาสมุทรแห่งชาติอินเดีย)  
* หมายเลข IRD (Institut de Recherche Tre deevoppement, ฝรั่งเศส)   
CNRS (Central National de La Recherche Scientific, ฝรั่งเศส)   
UPMC (ยูนิเวอร์เต ปิแอร์ เอต มารี Curie, ปารีส, ฝรั่งเศส)   
แบบ UCAD (ยู นิ เวอร์ ซิ ตี ชี ซัค อัน ตา ดิ โอ ปเด ดาการ์ เซ เนกัล)   
แบบ UGB (Unconsitune Barker -- Saint-lois du Seneagal)   
UFHB (ยู นิ เวอร์ ซิ ตี ฟี ลิกซ์ HUFFULLT-BOIGEY, Abiddjan, Chook d'Organ)   
IMSL (Pierre Pierre Simon Laplas Des De'invronment, ปารีส, ฝรั่งเศส)   
LMI ECLARS (อินเตอร์เนชันแนล สืบค้นเมื่อ 20 พฤษภาคม พ.ศ.) 
* กราฟแสดงความถี่ (คณะ กรรมาธิการ ยุโรป - ศูนย์ วิจัย ร่วม สหภาพ ยุโรป) 
*   [สถาบัน ทะเล](https://erddap.marine.ie/erddap/index.html)  (ไอร์แลนด์)  
* นาวิกโยธิน พ.ศ. (สเปน) 
* NCI (โครงสร้างการปกครองแห่งชาติของออสเตรเลีย) 
*   [NOAAเฝ้าดูชายฝั่ง](https://coastwatch.noaa.gov/erddap/index.html)  (กลาง)  
*   [NOAACGOM ชายฝั่ง](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (แคริบเบียน/ กวาล์ฟแห่งเม็กซิโก)  
*   [NOAAคอ ล พอร์ เท อร์](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (ทะเลสาบ ใหญ่)  
*   [NOAAชายฝั่ง](https://coastwatch.pfeg.noaa.gov/erddap/index.html)ซึ่งรวมเข้ากับและทํางานกับ
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (แผนกวิจัยสิ่งแวดล้อมของSWFSCของNMFS) 
*   [NOAAตัวตรวจจับ OCOS](https://erddap.sensors.ioos.us/erddap/index.html)  (ระบบสํารวจมหาสมุทร)  
*   [NOAAซี.NCOOS](https://erddap.axiomdatascience.com/erddap/index.html)  (Central and Northern California September System, ดําเนินการโดย Axiom Day Science)  
*   [NOAAIOOS GCOS Atmosphoric และข้อมูลทางทะเล: ระบบสังเกต](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAข้อมูล ทาง ธรณี วิทยา และ มหาสมุทร: คลัง ข้อมูล ทาง ประวัติศาสตร์](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAไอโอโซส ชีวเคมีและเศรษฐกิจสังคม](https://gcoos4.tamu.edu/erddap/index.html)  (ระบบสํารวจมหาสมุทรอ่าวอ่าว) 
*   [NOAAเน รา โคส](http://www.neracoos.org/erddap/index.html)  (สมาคม ส่วน ภูมิภาค ทาง ตะวัน ออก เฉียง เหนือ ของ ระบบ สํารวจ ชายฝั่ง และ มหาสมุทร)  
*   [NOAAIOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)  (กลีเดอร์แห่งชาติ ศูนย์รวมข้อมูล)  
*   NOAAไอโอออส นาโนส (สมาคม ว็ อช เทาเวอร์ ไบเบิล แอนด์ แทร็กต์ แห่ง ออสเตรเลีย) 
*   [NOAAไอโอออส](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (มหาสมุทร แปซิฟิก) ที่ มหาวิทยาลัย ฮาวาย (เอ่อ)  
*   NOAAIOOSCOS (แคลิฟอร์เนียตอนใต้ ระบบสังเกตทะเล) 
*   [NOAAไอโอออส กัสโทเรีย](https://erddap.secoora.org/erddap/index.html)  (สมาคม ท้อง ถิ่น แถบ ชายฝั่ง ตะวัน ออก เฉียง ใต้)  
*   [NOAAเซมิ](https://www.ncei.noaa.gov/erddap/index.html)  (ศูนย์ ข้อมูล สิ่ง แวด ล้อม แห่ง ชาติ)    
*   NOAASTP แบบ NGDC (ธรณี วิทยา แห่ง ชาติ ศูนย์ข้อมูล สุริยุปราคา (Terression Physm)) 
*   NOAA NMFSเนฟสก (ศูนย์ประมงตะวันออกเฉียงเหนือ) 
*   [NOAAเครือข่าย NOS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (ศูนย์วิจัยและบริการ)  
*   [NOAAOSMC](http://osmc.noaa.gov/erddap/index.html)  (ศูนย์เฝ้าดูระบบ)  
*   [NOAAPIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (ศูนย์ ประมง แห่ง หมู่ เกาะ แปซิฟิก)  
*   [NOAAPML](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAAการ เฝ้า ดู ขั้ว โลก](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAUAF](https://upwell.pfeg.noaa.gov/erddap/index.html)  (เรียกใช้เฟรมเวิร์กแบบไม่รวม)  
*   [เครือข่ายมหาสมุทรแคนาดา](http://dap.onc.uvic.ca/erddap/index.html) 
*   [เครือข่ายการติดตามมหาสมุทร](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / ข้อมูลทั้งหมด](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (Institute ของมหาสมุทร)   
OOI / ข้อมูลที่อ่านไม่ได้
* Princeton, กลุ่มวิจัยดาราศาสตร์
* วิศวกรรมอาร์เทค ฝรั่งเศส
*   [จุลชีพ](https://tds.marine.rutgers.edu/erddap/index.html)  
* สถาบัน ซานฟรานซิสโก
*   [การ สังเคราะห์ แสง ทาง ด้าน สมุทรศาสตร์, การ พ่น น้ํา ใต้ น้ํา](https://spraydata.ucsd.edu/erddap/index.html) 
*   [แอตแลนติกแบบฉลาด](https://www.smartatlantic.ca/erddap/index.html)ม.
* เครือข่าย Observation สิ่ง แวด ล้อม แอฟริกา ใต้
* อุปกรณ์ สเปกตรัม
* สถานีนาวิกโยธินสแตนฟอร์ด ฮอปกินส์
*   [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html)  (ฐานข้อมูลมหาสมุทรสากลและข้อมูล สลับข้อมูล)  
*   [University of British Columbia, Earth, Ocean & Atmosporic แผนกวิทยาศาสตร์](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [มหาวิทยาลัยแคลิฟอร์เนียที่เดวิส ห้อง ปฏิบัติ การ ทาง ทะเล โบ เด กา](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [มหาวิทยาลัยเดลาแวร์ สถานีรับดาวเทียม](https://basin.ceoe.udel.edu/erddap/index.html) 
* มหาวิทยาลัยวอชิงตัน ห้องปฏิบัติการฟิสิกส์ประยุกต์
*   [ขนาด USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)  (โครงการ ธรณี วิทยา ชายฝั่ง และ ทะเล)  
*   [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (เสียง ของ มหาสมุทร สวีเดน)  

นี่เป็นรายการขององค์กรบางส่วนERDDAP™ได้ติดตั้งโดยบางคนหรือบางกลุ่ม ไม่ ได้ หมาย ความ ว่า ปัจเจกบุคคล, กลุ่ม, หรือ องค์การ นั้น เสนอ แนะ หรือ สนับสนุนERDDAP.

### ERDDAP™ขอแนะนําให้อยู่ภายในNOAAและ CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAAการเข้าถึงข้อมูล โดยตรง](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)รวมERDDAP™ในรายการของเซิร์ฟเวอร์ข้อมูลที่ขอแนะนําให้ใช้โดยกลุ่มภายในNOAA.ERDDAP™มี การ กล่าว ถึง อย่าง เหมาะ สม ใน ตอน 4.2.3 ของ
[Guide de Bonnes Pratiques sur la gression de Donneés de la Recherches
 (การจัดการข้อมูลวิจัย คู่มือ ฝึก อบรม ที่ ดี ที่ สุด) ) ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) ของ National National de la Recherche Scientific (CNRS) ที่ฝรั่งเศส

## แสดงภาพนิ่ง{#slide-shows} 

นี่เป็นภาพสไลด์ PowerPoint และเอกสารที่บ็อบ ไซมอนสร้างERDDAP.

 **DECLIMER: เนื้อหาและความคิดเห็นที่แสดงในเอกสารเหล่านี้เป็นความคิดเห็นส่วนบุคคลของบ๊อบไซม่อนและไม่จําเป็นต้องสะท้อนสถานะของรัฐบาลใด ๆ หรือNational Oceanic and Atmospheric Administration.** 

สี่เอกสารหลัก:

*   [คํานําหลักสําหรับERDDAP™  (รุ่นที่ 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx).
คุณยังสามารถ[ดูวีดีโอที่บ็อบพูดนี่สิ![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4).
*   [คําบรรยายหน้าเดียวERDDAP™  (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAP: สัมภาระหนัก, กริด, คลูสเตอร์, สหพันธ์, และ การประกอบเมฆ](/docs/server-admin/scaling)
*   [เส้นนําของบ็อบ สําหรับระบบกระจายข้อมูล](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

การนําเสนออื่น ๆ:

*   [2020 EDM: ลักษณะใหม่ใน พ.ศ.ERDDAP™v2. 10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 DMIT: ข้อมูลสุดท้าย](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (หรือ[ดูวีดีโอที่บ็อบพูดนี่สิ](https://www.youtube.com/watch?v=9ArYxgwON2k).) 
*   [2019 IOOS DMAC: สภาพแวดล้อมใหม่ใน ค.ศ.ERDDAP™v2. 0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 ESIP ฤดู ร้อน: Subetting inERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 ESIP ในฤดูร้อน: Jonson สนับสนุนERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: ระบบบริการเว็บที่ถูกแบ่งแยก (เร็ว, ง่าย, มี เงิน น้อย)   (หรือทําไมผมมีความสุขเมื่อ 4 ปีก่อน) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EDM: พ.ศ.ERDDAP™ใน ปี 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: คุณสมบัติใหม่ใน พ.ศ.ERDDAP™สําหรับข้อมูลภาพ, เสียง, และวิดีโอ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF และ พ.ศ.ERDDAP™วิธี แก้ สําหรับ การ รับ ข้อมูล](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: แนะนําอย่างรวดเร็วERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM และ 2017 IOOS: New หรือ Little knowERDDAP™คุณสมบัติต่าง ๆ (สําหรับผู้ใช้) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM และ 2017 IOOS: New หรือ Little knowERDDAP™คุณสมบัติต่าง ๆ (สําหรับผู้ดูแลระบบ) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017 EDM: EML, KNB, และERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 อีเอ็ม: ข้อมูลได้รับจากแหล่งไปยังผู้ใช้สุดท้ายได้อย่างไร? โรงเรียนเก่ากับโรงเรียนใหม่](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 ESIP ฤดูร้อน: ภาพใหญ่: PAROPeNDAP.ERDDAP™และการกระจายข้อมูล](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016 EDM: หนึ่งและเสร็จ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 Gov API: รุ่นต่อไป เซิร์ฟเวอร์ข้อมูล](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015 ESIP ในฤดูร้อน: Tabular a February](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 EDM: Bob's Dos and Do not for Tabular Dative](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM: ส่วนติดต่อผู้ใช้แบบ ISTIME](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014 ESIP ฤดู ร้อน: ข้อมูลแท็บมอง](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: อย่าทํากับ In-Situ และ Tabular Dtadition เหมือนข้อมูล Gried](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDIM: ทํามากขึ้นกับน้อย](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: เครื่องนําทางสําหรับระบบกระจายข้อมูล พ.ศ.](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

คํา บรรยาย ของ คน อื่น:

*   [เครื่อง มือ พื้น ฐาน สําหรับ การ ปรับ ปรุง ข้อมูล ทั่ว โลก![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
โดย เควิน โอ'ไบรอัน ที่ศูนย์สํารวจมหาสมุทรโลก (โกส) Webinar / Observation กรุ๊ป (OCG) September / 1 พฤศจิกายน 12, 2020.
*   [การ สร้าง สภาพ อากาศ ของ คุณ เองNOAAบันทึกช่วยจําแบบ OpenDescription![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
โดย Filpipe Fernandes และ Rich Signell ที่ SciPy 2018, 13 กรกฎาคม 2018.
*   [ใช้ โอ ไอERDDAP![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
2018 โดย ริช ซินญอล 2018.
*   [ESIP เทคไดฟ:ERDDAPฟ้าผ่าพูด![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
การสนทนาเกี่ยวกับสิ่งที่น่าสนใจที่ผู้คนกําลังทําERDDAPby Jen Sevadjian, Jim Potemra, Corne Delany, Kevin O'Ben, John Kerfoot, Stephy Pattolo,Charles Carleton and Eli Hunter นําเสนอเป็น ESIP Tech Dieve เมื่อวันที่ 31 สิงหาคม 2017.
*   [ใช้ERDDAP™ไปยังข้อมูลแท็บ![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
2015 โดย ริช ซินญอล (Rich Signell) พ.ศ.
*   [ทดสอบโดยใช้ERDDAP™สําหรับข้อมูลคาร์บอนสีน้ําเงิน![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
2015 โดย ริช ซินญอล (Rich Signell) พ.ศ.
*   [ใช้ข้อมูลจากERDDAP™ในNOAA'GNOMEซอฟต์แวร์![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM).
ในวิดีโอนี้ ริชเซ็นเซลล์ดาวน์โหลดข้อมูลพยากรณ์ของมหาสมุทรERDDAP™เพื่อจําลองการรั่วไหลของสารพิษในมหาสมุทร[NOAA'GNOMEโปรแกรม](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (อีก 5 นาที&#33;) . (ความผิดพลาดเล็ก ๆ น้อย ๆ ในวิดีโอ: เมื่อค้นหาชุดข้อมูล อย่าใช้และอยู่ระหว่างคําค้น มันอยู่โดยนัย) 8 เมษายน 2011.
