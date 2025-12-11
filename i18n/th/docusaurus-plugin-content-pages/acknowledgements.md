# คุณสมบัติต่าง ๆ

ผู้จัดทํา [เครดิต](https://github.com/erddap/erddap/blob/main/CREDITS.md) สําหรับ ERDDAP™ ตอนนี้อยู่คนละหน้ากัน ERDDAP™ เป็นผลคูณของ [ NOAA ](https://www.noaa.gov "National Oceanic and Atmospheric Administration")   [ NMFS ](https://www.fisheries.noaa.gov "National Marine Fisheries Service")   [ SWFSC ](https://swfsc.noaa.gov "Southwest Fisheries Science Center")   [ ERD ](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division") .

Bob Simons เป็นนักเขียนหลักของ ERDDAP™   (ผู้พัฒนาและนักพัฒนาซอฟต์แวร์ ERDDAP - รหัสเฉพาะ) . จุดเริ่มต้นคือรอย เมนเดลสัน (เจ้านายของบ็อบ) คําแนะนําที่บ๊อบเปิดโปรแกรมแปลง (เครื่องมือขนาดเล็กที่แปลงข้อมูล tabular จากรูปแบบหนึ่งไปเป็นอีกรูปแบบหนึ่ง ซึ่งส่วนใหญ่เป็นรหัสจาก Bob's pre- NOAA งานที่บ็อบทําใหม่เพื่อเปิดแหล่ง) เข้าสู่บริการเว็บ

และเป็นความคิดของรอย เมนเดลสัน เกี่ยวกับระบบข้อมูล ข้อเสนอแนะแรกของเขากับบ็อบ (รวมถึงฮาร์ดแวร์ เครือข่าย และการสนับสนุนซอฟต์แวร์อื่น ๆ และด้วยการปล่อยเวลาของบ๊อบให้เป็นอิสระ เพื่อที่เขาจะได้ใช้เวลามากขึ้น ERDDAP™ รหัส) ซึ่งทําให้โครงการนี้เป็นไปได้ และทําให้เกิดการเติบโต

เดอะ ERDDAP - รหัสระบุมีใบอนุญาตเป็นโอเพนซอร์สลิขสิทธิ์ [ NOAA ](https://www.noaa.gov) ถือลิขสิทธิ์ ดู [ ERDDAP™ สัญญาอนุญาตสิทธิ์](/license) .
 ERDDAP™ ใช้ open sources, Apache, LGPL, MIT/X, Mozilla, และห้องสมุดโดเมนและข้อมูล
 ERDDAP™ ไม่ต้องการรหัส GPL หรือโปรแกรมพาณิชย์ใด ๆ

เงินทุนจํานวนมากสําหรับการทํางาน ERDDAP™ มาจาก NOAA เงินเดือนของบ๊อบ ไซมอน สําหรับปีแรกของ ERDDAP™ ตอนที่เขาเป็นลูกจ้างของรัฐบาล เงินทุนมาจาก [ NOAA เฝ้าดูชายฝั่ง](https://coastwatch.noaa.gov/) โปรแกรม, [ NOAA ไอโอเอส](https://ioos.noaa.gov/) รายการและปัจจุบันการรื้อถอนมหาสมุทรแปซิฟิก (POST) โปรแกรม

เครดิตมากเป็นจํานวนมาก ERDDAP™ ผู้ดูแลระบบและผู้ใช้ที่ได้ให้คําแนะนําและความคิดเห็นซึ่งได้นําไปสู่การปรับปรุงใน ERDDAP . หลาย คน ได้ รับ การ กล่าว ถึง ใน ชื่อ [รายการเปลี่ยนแปลง](/changes) . ขอบคุณทุกคน (ชื่อและไม่มีชื่อ) มาก ดังนั้น ERDDAP™ เป็นตัวอย่างที่ดี [นวัตกรรมของผู้ใช้](https://en.wikipedia.org/wiki/User_innovation) นวัตกรรมผลิตภัณฑ์มักมาจากผู้บริโภค ( ERDDAP™ ผู้ใช้) ไม่ใช่แค่โปรดิวเซอร์ ( ERDDAP™ ผู้พัฒนา) .

นี่คือรายการของซอฟต์แวร์และชุดข้อมูลที่อยู่ใน ERDDAP™ การกระจายตัว เรา รู้สึก ขอบคุณ มาก สําหรับ สิ่ง เหล่า นี้. ขอบคุณมากครับ
 \\[ เริ่มตั้งแต่ 2021 แทบเป็นไปไม่ได้ที่จะระบุแหล่งโค้ดทั้งหมด ERDDAP™ เพราะห้องสมุดบางส่วนที่เราใช้ (โดยเฉพาะ Netcdf-java และโดยเฉพาะ AWS) โดย วิธี ใด? ห้องสมุดทั้งหมด ERDDAP™ รหัส ที่ เรียก โดย ตรง อยู่ ข้าง ล่าง นี้ รวม อยู่ ด้วย เช่น ห้อง สมุด หลาย แห่ง ที่ ห้อง สมุด อื่น ๆ เรียก มา. ถ้าคุณเห็นว่าเราได้ยกเลิกโครงการด้านล่างนี้ โปรดแจ้งให้เราทราบด้วย เพื่อที่เราจะได้เพิ่มโครงการด้านล่างนี้ และให้เครดิตกับที่ที่เครดิตเกิดขึ้น \\] 

## ภาพรวม{#overview} 
 ERDDAP™ คือ [ Java ห้อง รับ ใช้](https://www.oracle.com/technetwork/java/javaee/servlet/index.html) โปรแกรม ที่ ERD มันวิ่งอยู่ภายใน [ทอมแคท](https://tomcat.apache.org/) เซิร์ฟเวอร์โปรแกรม (ใบอนุญาต: [อาปาเช](https://www.apache.org/licenses/) ) กับ [อาปาเช](https://httpd.apache.org/) เซิร์ฟเวอร์เว็บ (ใบอนุญาต: [อาปาเช](https://www.apache.org/licenses/) ) ทํางานในคอมพิวเตอร์ที่ใช้ [ลินุกซ์หมวกแดง](https://www.redhat.com/) ระบบปฏิบัติการ (ใบอนุญาต: [แบบ GPL](https://www.gnu.org/licenses/gpl-3.0.html) ) .
     
## ชุดข้อมูล{#datasets} 
ชุดข้อมูลมาจากหลายแหล่ง ดูข้อมูลกํากับ (โดยเฉพาะ sourceUrl "" infoUrl " "institution" และ "โหดร้าย") สําหรับข้อมูลแต่ละชุด ชุดข้อมูลหลายชุดมีข้อห้ามในการใช้ ซึ่งจะเรียกร้องให้คุณอ้างอิงหรืออ้างอิงข้อมูล เมื่อใดก็ตามที่คุณใช้ข้อมูล เป็น รูป แบบ ที่ ดี เสมอ เมื่อ อ้าง ถึง ผู้ ให้ ข้อมูล. ดู [วิธี เขียน ข้อมูล ใน กระดาษ](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset) .
     
## ซอฟต์แวร์ choert{#cohort-software} 
 [คลาสของ Com/coort](#cohort-software) มาจากซอฟต์แวร์ Choert (https://www.cohortsoftware.com) ซึ่งทําให้คลาสนี้ใช้ได้กับใบอนุญาตแบบ MIT/X (ดูคลาส/com/coort/util/LICE.txt) .
     
## เว็บดูโคสต์{#coastwatch-browser} 
 ERDDAP™ ใช้โค้ดจากโครงการดูดาวโคสต์โคสต์ (ตอนนี้ถูกปลดประจําการแล้ว) จาก [ NOAA เฝ้าดูชายฝั่ง](https://coastwatch.noaa.gov)   [โหนดภูมิภาคตะวันตก](https://coastwatch.pfeg.noaa.gov/)   (ใบรับรอง:) . โปรเจกต์นั้นถูกริเริ่มและจัดการโดย เดฟ โฟเลย์ อดีตนักฟุตบอล NOAA Node ภาคตะวันตกของโคสต์ โค้ดของโคสต์วอทเวิรค์ทั้งหมด เขียนโดยบ๊อบ ไซมอนส์
     
##  OPeNDAP  {#opendap} 
ข้อมูลจาก [ OPeNDAP ](https://www.opendap.org) เซิร์ฟเวอร์ถูกอ่านด้วย [ Java   DAP 1. 7](https://www.opendap.org/deprecated-software/java-dap)   (ใบอนุญาต: LGPL) .
     
##  NetCDF -จาวา{#netcdf-java} 
 NetCDF แฟ้ม ( .nc ) รูปแบบ GMT NetCDF แฟ้ม (สลับ) GRIB และ BUFR จะอ่านและเขียนด้วยรหัสใน [ NetCDF   Java ไลบรารี](https://www.unidata.ucar.edu/software/netcdf-java/)   (ใบอนุญาต: [ขนาด BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE) ) จาก [ Unidata ](https://www.unidata.ucar.edu/) .

ซอฟต์แวร์ที่รวมอยู่ใน NetCDF   Java จาร์:

* ขนาด Sf4j
เดอะ NetCDF   Java ห้อง สมุด และ คาส ซาน [Sf4j จาก Looking Faceade แบบธรรมดา Java ](https://www.slf4j.org/) โครงการ ตอนนี้ ERDDAP™ ใช้ Sf4j-gener-xxxx.jr เปลี่ยนชื่อเป็น Sf4j.jr เพื่อตอบสนองความต้องการนี้ (ใบอนุญาต: [MIT/X](https://www.slf4j.org/license.html) ) .
     
* พ.ศ.
เดอะ NetCDF   Java .jur รวมโค้ดการประมวลผล XML จาก [พ.ศ.](http://www.jdom.org/)   (ใบอนุญาต: [อาปาเช](http://www.jdom.org/docs/faq.html#a0030) ) ซึ่งรวมอยู่ใน Netcdfall.jar
     
* โยดา
เดอะ NetCDF   Java ยาร์รวม [โยดา](https://www.joda.org/joda-time/) สําหรับคํานวณปฏิทิน (ซึ่งอาจจะไม่ถูกใช้โดย ERDDAP ) . (ใบอนุญาต: [Apache 2. 0](https://www.joda.org/joda-time/licenses.html) ) .
     
* อาปาเช
เดอะ NetCDF   Java .jar รวมแฟ้ม .jar จากหลายแฟ้ม [โครงการ Apache](https://www.apache.org/) .
     [รหัสทั่วไป](https://commons.apache.org/proper/commons-codec/) .
     [การค้นพบทั่วไป](https://commons.apache.org/discovery/) .
     [สามัญชน http ลูกค้า](https://hc.apache.org/httpcomponents-client-ga/) .
     [การขีดเขียนทั่วไป](https://commons.apache.org/proper/commons-logging/)   
     [ผู้ร่วมประชุม](https://hc.apache.org) .
     (ใบอนุญาต: [อาปาเช](https://www.apache.org/licenses/LICENSE-2.0) )   
นี่รวมอยู่ใน Netcdfall.jar.
     
* อื่นๆ
เดอะ NetCDF   Java .jur ยังรวมโค้ดจาก: com.google.code. findbugs. com.google.com.google.goague, com.google.com.jogle.com.google.com.google.com.com.google. progle, edujo.c. org.c.com.com.com.com.com.com.com.comgogle.com, Comgogle.com, jogo.jo. (กูเกิลใช้ใบอนุญาตแบบ Apache และ BSD)   
         
## ขนาด SGT{#sgt} 
กราฟและแผนที่ถูกสร้างขึ้นบนแผ่นฟลายที่มีการแก้ไขรุ่นของ NOAA ขนาด SGT (เคยอยู่ที่https://www.pmel.noaa.gov/epic/java/sgt/ตอนนี้เลิกแล้ว) รุ่น 3 (คือ Java Trafts Profiles Pictures Toolkit เขียนโดย โดนัลด์ Denbo ที่ [ NOAA PML](https://www.pmel.noaa.gov/) )   (ใบรับรอง: (เคยอยู่ที่https://www.pmel.noaa.gov/epic/java/license.html) ) .
     
## วอลเตอร์ ซอร์น{#walter-zorn} 
ขนาดใหญ่,ทูลทิป HTML บน ERDDAP หน้า HTML สร้างจาก wz\\_tooltip ของวอลเตอร์ ซอร์น ขนาด j (ใบอนุญาต: LGPL) .
สไลด์และคุณสมบัติการลากและวางของตัวแยกภาพนิ่งถูกสร้างโดย wz/ drange.j (ใบอนุญาต: LGPL) .
     
## เปิด PDF{#openpdf} 
แฟ้ม .pdf ถูกสร้างด้วย [เปิด](https://github.com/LibrePDF/OpenPDF) เป็นอิสระ Java - ห้องสมุดพีดีเอฟ
     
## แบบ GHHS{#gshhs} 
ข้อมูลชายฝั่งและทะเลสาบมาจาก [แบบ GHHS](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html) -- ฐานข้อมูลความเหลื่อมล้ําในตัวเองแบบสากล, เรขาคณิตชั้นสูง (ใบอนุญาต: [แบบ GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT) ) และสร้างโดย พอล เวสเซิล และ วอลเตอร์ สมิธ

เรา ไม่ ได้ เชื่อ เรื่อง ความ ผิด พลาด ของ คน ใน ครอบครัว ที่ มี ปัญหา ERDDAP™ -- อย่าใช้มันเพื่อสื่อถึงความแตกต่าง
     
    
## คลาส mpcoast ของ GMT{#gmt-pscoast} 
ขอบเขตการเมืองและข้อมูลแม่น้ํา มาจาก [แบบ pscoast](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html) โปรแกรมใน [แบบ GMT](https://www.soest.hawaii.edu/gmt/) ซึ่งใช้ข้อมูลจาก [CIA ธนาคาร ข้อมูล โลก ที่ 2](https://www.evl.uic.edu/pape/data/WDB/)   (อนุญาต:) .

เรา ไม่ ได้ คิด ถึง ความ ผิด พลาด ของ ความ ผิด พลาด ทาง ด้าน กฎหมาย ที่ เกิด ขึ้น ERDDAP .
    
## ETOPO{#etopo} 
ข้อมูลการอาบน้ํา/ mographic ที่ใช้ในพื้นหลังของบางแผนที่คือ [ETOPO1 Global 1-Mitute Gried Dtaination Date](https://www.ngdc.noaa.gov/mgg/global/global.html)   (พื้นผิวน้ําแข็ง, ตารางลงทะเบียนฐานสอง, Int 2 byte: etopo1\\ ce\\_g/i2 .zip )   (ใบอนุญาต: [โดเมนสาธารณะ](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright) ) ซึ่งถูกแจกจ่ายไปอย่างอิสระ [ NOAA แบบ NGDC](https://www.ngdc.noaa.gov) .

เรา ไม่ ได้ คิด ถึง เรื่อง ความ ผิด พลาด ของ ความ ผิด ฐาน ทํา ให้ เลือด ตก ERDDAP . อย่าใช้มันเพื่อสื่อถึงความสัมพันธ์
    
##  Java จดหมาย{#javamail} 
อีเมลถูกส่งมาทางจดหมาย ขวดจาก Oracle ' [ Java จดหมาย API](https://javaee.github.io/javamail/)   (ใบอนุญาต: [การ ปกครอง โดย มนุษย์ และ การ ปกครอง โดย มนุษย์ (CDDL) รุ่น 1. 1](https://javaee.github.io/javamail/LICENSE) ) .
     
## เจ สัน{#json} 
 ERDDAP™ ใช้ [Json.org's Java ไลบรารี Json แบบพื้นฐาน](https://www.json.org/index.html) เพื่อวิเคราะห์ [เจ สัน](https://www.json.org/) ข้อมูล (ใบอนุญาต: [แหล่งโอเพนซอร์สลิขสิทธิ์](https://www.json.org/license.html) ) .
     

## PostgragSQL{#postgrsql} 
 ERDDAP™ รวมไปถึง [PostGres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql) ไดรเวอร์ (ใบอนุญาต: [แบบ BSD](https://www.postgresql.org/about/licence/) ) . ไดรเวอร์เป็นลิขสิทธิ์ (c) 1997-2010, PostgrestQL Global Developy Group. สงวน ลิขสิทธิ์.
     
## ลูซีน{#lucene} 
 ERDDAP™ ใช้โค้ดจาก Apache [ลูซีน](https://lucene.apache.org/) . (ใบอนุญาต: [อาปาเช](https://www.apache.org/licenses/LICENSE-2.0) ) สําหรับตัวเลือกการค้นหา "luxen" (แต่ไม่ใช่สําหรับเครื่องมือค้นหา "ปกติ" ปริยาย) .
     
## การบีบข้อมูลทั่วไป{#commons-compress} 
 ERDDAP™ ใช้โค้ดจาก Apache [การบีบข้อมูลทั่วไป](https://commons.apache.org/compress/) . (ใบอนุญาต: [อาปาเช](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## JEXL{#jexl} 
 ERDDAP™ รองรับการคํานวณนิพจน์และสคริปต์&lt; sourceName S&gt; ขึ้นอยู่กับ [โครงการ Apache](https://www.apache.org/) . [ Java นิพจน์ภาษา (JEXL) ](https://commons.apache.org/proper/commons-jexl/)   (ใบอนุญาต: [อาปาเช](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## คาสเซนดร้า{#cassandra} 
 ERDDAP™ รวม อาปาเช [คาสเซนดร้า](https://cassandra.apache.org/)   [เคสซานดรา-ดริเออร์คอร์](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)   (ใบอนุญาต: [Apache 2. 0](https://github.com/datastax/java-driver/blob/2.1/LICENSE) ) .
คาสซานดรา-ดรอยเตอร์ (และดังนั้น ERDDAP™ รวม) .
*    [กัววา จาร์](https://github.com/google/guava)   (ใบอนุญาต: [Apache 2. 0](https://github.com/google/guava/blob/master/LICENSE) ) .
*    [Iz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)   (ใบอนุญาต: [Apache 2. 0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt) ) .
*    [ขนาดเมตริก](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)   (ใบอนุญาต: [MIT](https://github.com/codahale/metrics/blob/master/LICENSE) ) .
*    [ตาข่ายทั้งหมด](https://netty.io/downloads.html)   (ใบอนุญาต: [Apache 2. 0](https://netty.io/downloads.html) ) .
*    [กระเด้งกระดอน](https://xerial.org/snappy-java/)   (ใบอนุญาต: [Apache 2. 0](https://github.com/xerial/snappy-java/blob/develop/LICENSE) ) .
         
##  KT\\_ จานสี{#kt_-palettes} 
จานสีที่มีคํานําหน้า " KT\\_ "คือ [ชุดจานสี .cpt โดยคริสเตน ท็อง](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)   (ใบอนุญาต: [MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html) ) แต่ถูกปฏิรูปเล็กน้อย โดยเจนนิเฟอร์ เซวาดจิอัน ของ NOAA แล้วพวกเขา (มะลาอิกะฮฺ) ผู้บริหารกิจการ ERDDAP ความต้องการ.cpt.
     
##  Leaflet  {#leaflet} 
 ERDDAP™ ใช้ Java ไลบรารีสคริปต์ [ Leaflet ](https://leafletjs.com/)   (ใบอนุญาต: [ขนาด BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) ) คือ WMS โปรแกรมลูกข่ายบน WMS หน้าเว็บใน ERDDAP . มันเป็นซอฟต์แวร์ที่ยอดเยี่ยม (ถูก ออก แบบ มา อย่าง ดี, ใช้ ง่าย, เร็ว, และ อิสระ) จากวลาดิเมียร์ อาฟฟอนคิน
     
## ขนาด AWS{#aws} 
สําหรับการทํางานร่วมกับ Amazon AWS (รวม S3 ด้วย) . ERDDAP™ ใช้ v2 ของ [ขนาด AWS SDK สําหรับ Java ](https://aws.amazon.com/sdk-for-java/)   (ใบอนุญาต: [อาปาเช](https://www.apache.org/licenses/) ) .

เอดับเบิลยูเอสต้องการมาเวน เพื่อดึงความยุ่งยาก รวมแฟ้ม .jar ต่อไปนี้ด้วย (ที่ที่ xx เป็นเลขรุ่นซึ่งมีการเปลี่ยนแปลงเมื่อเวลาผ่านไป และชนิดของใบอนุญาตอยู่ในวงเล็บ) หมายเหตุประกอบ-xxxjar (อาปาเช) , อะปุช-โคไลต์-ซ็อกเกอร์ (อาปาเช) (เพลง) (แบบ BSD) อัมฮุย (แบบ BSD) อัม-นาลิปซิส (แบบ BSD) Alem-commons-xxx.jar (แบบ BSD) (เพลง) (แบบ BSD) อัม-อุสติล-ซือ (แบบ BSD) (เพลง) (?) (เพลง) (อาปาเช) วัฒนา โพรโตคอล-ซ็อกเกอร์ (อาปาเช) [aught] (อาปาเช) เช็กเกอร์-คอล-ซ็อกส์ (MIT) มีข้อผิดพลาด/ _หมายเหตุ-xx.jar (อาปาเช) 2551. เหตุการณ์ที่เกิดขึ้นใน ค.ศ. (อาปาเช) (เสียงรบกวน) (อาปาเช) . http ช่องสัญญาณหลัก (อาปาเช) J2obc-หมายเหตุประกอบ-xxx.jar (อาปาเช) JACK-หมายเหตุ-xxxxx.jar (อาปาเช) แจ็กสัน-คอร์-ซ็อกส์ (อาปาเช) Jason-Databind-xxx.jar (อาปาเช) [Jaxen-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (แบบ BSD) jef-xxjar (อาปาเช) JFF-xx.native. ขวด (อาปาเช) Jn-contints-xxx.jr (อาปาเช) [Jn-fair-xxxx] (อาปาเช) Jn-posix-xxx.jar (อาปาเช) (jn-x86asm-x).jr (อาปาเช) [Json-xxxxx] (แหล่งโอเพนซอร์สที่มีลิขสิทธิ์) [jr305-x2.jar] (อาปาเช) (เสียงฟัง) (อาปาเช) ประมาณโหลตาข่าย ขวดโหล (อาปาเช) โพรไฟล์... (อาปาเช) โปรโตคอล-คอร์-ซ็อก (อาปาเช) ปฎิกริยาแบบตอบสนอง-สตรีม (ซีซี 1. 0) (เพลง) (อาปาเช) , s3-xxx.jar (อาปาเช) [help] (อาปาเช) (เพลง) (?) . เพื่อดูใบอนุญาตจริง สืบค้นชื่อ .jar ใน [อพาร์ตเมนต์หลัก](https://mvnrepository.com/) แล้วก็รื้อค้นในไฟล์ของโครงการ เพื่อหาใบอนุญาต
    

นอกจากนี้เรายังขอขอบคุณอย่างมาก สําหรับซอฟต์แวร์และเว็บไซต์ทั้งหมดที่เราใช้เมื่อกําลังพัฒนา ERDDAP รวมทั้ง
 [บ้าน](https://www.google.com/chrome/browser/desktop/) .
 [ curl ](https://curl.haxx.se/) .
 [ดั๊กดั๊กไป](https://duckduckgo.com/?q=) .
 [แก้ไขค่า Plus](https://www.editplus.com/) .
 [แฟ้ม](https://filezilla-project.org/) .
 [กิตฮับ](https://github.com/) .
 [สืบค้นจากกูเกิ้ล](https://www.google.com/webhp) .
 [พู ตี](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) .
 [เต็มกอง](https://stackoverflow.com/) .
 [สิ่งที่จะทํา](https://todoist.com/?lang=en) .
 [ Wikipedia ](https://www.wikipedia.org/) .
อินเตอร์เน็ต เว็บไซต์ Worldwide และเว็บไซต์อื่น ๆ ทั้งหมดที่ดีประโยชน์
ขอบคุณมากครับ
