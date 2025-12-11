# घोषणा

योगदानकर्ता [क्रेडिट](https://github.com/erddap/erddap/blob/main/CREDITS.md) के लिए ERDDAP™ अब एक अलग पृष्ठ पर है। ERDDAP™ का एक उत्पाद है [ NOAA ](https://www.noaa.gov "National Oceanic and Atmospheric Administration")   [ NMFS ](https://www.fisheries.noaa.gov "National Marine Fisheries Service")   [ SWFSC ](https://swfsc.noaa.gov "Southwest Fisheries Science Center")   [ ERD ](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division") ।

बॉब सिमोन का मूल मुख्य लेखक है ERDDAP™   (डिजाइनर और सॉफ्टवेयर डेवलपर जिन्होंने लिखा था ERDDAP -विशिष्ट कोड) । शुरुआती बिंदु रॉय मेंडेल्ससोहन का था (बॉब बॉस) सुझाव है कि बॉब अपने परिवर्तित करने योग्य कार्यक्रम बारी (एक छोटी उपयोगिता जो सारणीबद्ध डेटा को एक प्रारूप से दूसरे प्रारूप में परिवर्तित करती है और जो बड़े पैमाने पर बॉब के पूर्व-पूर्व-से-कोडित थी। NOAA काम है कि बॉब फिर से लाइसेंस प्राप्त करने के लिए खुला स्रोत) एक वेब सेवा में।

यह था और रोय मेनडेल्ससोहन के विचारों को वितरित डेटा सिस्टम, बॉब के लिए उनका प्रारंभिक सुझाव और उनके चल रहे समर्थन के बारे में है। (हार्डवेयर, नेटवर्क और अन्य सॉफ्टवेयर समर्थन सहित, और बॉब के समय को मुक्त करके ताकि वह अधिक समय बिता सके ERDDAP™ कोड) इस परियोजना को संभव बनाया है और इसके विकास को सक्षम बनाया है।

The The most of the ERDDAP -विशिष्ट कोड को कॉपीराइट ओपन सोर्स के रूप में लाइसेंस दिया गया है, साथ में [ NOAA ](https://www.noaa.gov) कॉपीराइट रखती है। देखें [ ERDDAP™ लाइसेंस](/license) ।
 ERDDAP™ कॉपीराइट ओपन सोर्स, अपाचे, एलजीपीएल, एमआईटी / एक्स, मोज़िला और सार्वजनिक डोमेन पुस्तकालयों और डेटा का उपयोग करता है।
 ERDDAP™ किसी भी GPL कोड या व्यावसायिक प्रोग्राम की आवश्यकता नहीं है।

काम के लिए वित्तपोषण का थोक ERDDAP™ आया NOAA इसमें बॉब साइमन का वेतन दिया गया। प्रथम वर्ष के लिए ERDDAP™ जब वह एक सरकारी ठेकेदार था, तो वित्त पोषण से आया [ NOAA कोस्ट वाच](https://coastwatch.noaa.gov/) कार्यक्रम [ NOAA आईओएस](https://ioos.noaa.gov/) कार्यक्रम, और अब प्रशांत महासागर शेल्फ ट्रैकिंग defunct (पोस्ट) कार्यक्रम।

बहुत ज्यादा क्रेडिट कई के लिए चला जाता है ERDDAP™ व्यवस्थापक और उपयोगकर्ता जिन्होंने सुझाव और टिप्पणियां की हैं, जिन्होंने कई सुधारों का नेतृत्व किया है ERDDAP । कई में नाम से उल्लेख किया गया है [परिवर्तन की सूची](/changes) । धन्यवाद (नाम और नाम) बहुत ज्यादा। इस प्रकार, ERDDAP™ का एक महान उदाहरण है [उपयोगकर्ता संचालित नवाचार](https://en.wikipedia.org/wiki/User_innovation) जहां उत्पाद नवाचार अक्सर उपभोक्ताओं से आता है ( ERDDAP™ उपयोगकर्ता) सिर्फ निर्माता नहीं ( ERDDAP™ डेवलपर्स) ।

यहाँ सॉफ्टवेयर और डेटासेट की सूची है जो में हैं ERDDAP™ वितरण। हम इन सभी के लिए बहुत आभारी हैं। बहुत धन्यवाद।
 \\[ 2021 में शुरू होकर, कोड के सभी स्रोतों को ठीक से सूचीबद्ध करना लगभग असंभव हो गया है ERDDAP™ क्योंकि कुछ पुस्तकालयों का हम उपयोग करते हैं (विशेष रूप से netcdfjava और विशेष रूप से AWS) बदले में कई अन्य पुस्तकालयों का उपयोग करते हैं। सभी पुस्तकालयों कि ERDDAP™ कोड कॉल सीधे नीचे शामिल हैं, क्योंकि पुस्तकालयों में से कई हैं कि अन्य पुस्तकालयों बारी में बुलाते हैं। यदि आप देखते हैं कि हम नीचे एक परियोजना छोड़ चुके हैं, तो कृपया हमें बताएं ताकि हम नीचे परियोजना जोड़ सकें और क्रेडिट दे सकें जहां क्रेडिट देय है। \\] 

## अवलोकन{#overview} 
 ERDDAP™ एक है [ Java सेवलेट](https://www.oracle.com/technetwork/java/javaee/servlet/index.html) कार्यक्रम। पर ERD यह एक के अंदर चलाता है [टॉमकैट](https://tomcat.apache.org/) अनुप्रयोग सर्वर (लाइसेंस: [अपाचे](https://www.apache.org/licenses/) ) एक साथ [अपाचे](https://httpd.apache.org/) वेब सर्वर (लाइसेंस: [अपाचे](https://www.apache.org/licenses/) ) , कंप्यूटर पर चल रहा है [Red Hat Linux](https://www.redhat.com/) ऑपरेटिंग सिस्टम (लाइसेंस: [जीपीएल](https://www.gnu.org/licenses/gpl-3.0.html) ) ।
     
## डेटासेट{#datasets} 
डेटा सेट विभिन्न स्रोतों से हैं। मेटाडाटा देखें (विशेष रूप से " sourceUrl "," infoUrl ", "institution" "लाइसेंस") प्रत्येक डेटासेट के लिए। कई डेटासेटों में उनके उपयोग पर प्रतिबंध होता है जिसके लिए आपको डेटा प्रदाता को जब भी आप डेटा का उपयोग करते हैं तो डेटा प्रदाता को उद्धृत / प्रमाणित करने की आवश्यकता होती है। यह हमेशा डेटा प्रदाता को उद्धृत / प्रमाणित करने के लिए अच्छा रूप है। देखें [एक पेपर में डेटासेट कैसे उद्धृत करें](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset) ।
     
## CoHort Software{#cohort-software} 
 [कॉम / कोहोर्ट कक्षाएं](#cohort-software) कोहोर्ट सॉफ्टवेयर से हैं (https://www.cohortsoftware.com) जो इन कक्षाओं को एमआईटी/एक्स जैसी लाइसेंस के साथ उपलब्ध कराता है (कक्षाएं / com/cohort/util/LICENSE.txt देखें) ।
     
## कोस्टवॉच ब्राउज़र{#coastwatch-browser} 
 ERDDAP™ कोस्टवॉच ब्राउज़र प्रोजेक्ट से कोड का उपयोग करता है (अब decomissioned) से [ NOAA कोस्ट वाच](https://coastwatch.noaa.gov)   [वेस्ट कोस्ट क्षेत्रीय नोड](https://coastwatch.pfeg.noaa.gov/)   (लाइसेंस: कॉपीराइट ओपन सोर्स) । इस परियोजना की शुरुआत डेव फोले ने की थी, जो एक पूर्व समन्वयक थे। NOAA कोस्टवॉच वेस्ट कोस्ट क्षेत्रीय नोड। सभी कोस्टवॉच ब्राउज़र कोड को बॉब सिमन्स द्वारा लिखा गया था।
     
##  OPeNDAP  {#opendap} 
डेटा से [ OPeNDAP ](https://www.opendap.org) सर्वर के साथ पढ़ा जाता है [ Java   DAP 1.1.7](https://www.opendap.org/deprecated-software/java-dap)   (लाइसेंस: LGPL) ।
     
##  NetCDF -जावा{#netcdf-java} 
 NetCDF फ़ाइलें ( .nc ) , GMT-शैली NetCDF फ़ाइलें (.grd) , GRIB, और BUFR को कोड के साथ पढ़ा और लिखा जाता है। [ NetCDF   Java पुस्तकालय](https://www.unidata.ucar.edu/software/netcdf-java/)   (लाइसेंस: [बीएसडी-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE) ) से [ Unidata ](https://www.unidata.ucar.edu/) ।

सॉफ्टवेयर में शामिल NetCDF   Java .jar:

* slf4j
The The most of the NetCDF   Java पुस्तकालय और Cassandra जरूरत [Slf4j से सरल लॉगिंग Facade के लिए Java ](https://www.slf4j.org/) परियोजना वर्तमान में, ERDDAP™ slf4j-simple-xxx.jar का उपयोग इस आवश्यकता को पूरा करने के लिए slf4j.jar नाम दिया गया। (लाइसेंस: [एमआईटी / एक्स](https://www.slf4j.org/license.html) ) ।
     
* JDOM
The The most of the NetCDF   Java जार में XML प्रोसेसिंग कोड शामिल है [JDOM](http://www.jdom.org/)   (लाइसेंस: [अपाचे](http://www.jdom.org/docs/faq.html#a0030) ) , जो netcdfall.jar में शामिल है।
     
* जोडा
The The most of the NetCDF   Java .jar शामिल हैं [जोडा](https://www.joda.org/joda-time/) कैलेंडर गणना के लिए (जो शायद उपयोग नहीं किया जाता है ERDDAP ) । (लाइसेंस: [अपाचे 2.0](https://www.joda.org/joda-time/licenses.html) ) ।
     
* अपाचे
The The most of the NetCDF   Java .jar शामिल हैं .jar फ़ाइलों से कई [अपाचे परियोजना](https://www.apache.org/) :
     [कॉमन्स-कोडेक](https://commons.apache.org/proper/commons-codec/) ,
     [कॉमन्स-डिस्कवरी](https://commons.apache.org/discovery/) ,
     [आम- http ग्राहक](https://hc.apache.org/httpcomponents-client-ga/) ,
     [लॉग इन](https://commons.apache.org/proper/commons-logging/)   
     [HttpComponents](https://hc.apache.org) ,
     (सभी के लिए: लाइसेंस: [अपाचे](https://www.apache.org/licenses/LICENSE-2.0) )   
ये netcdfall.jar में शामिल हैं।
     
* अन्य
The The most of the NetCDF   Java .jar भी शामिल है कोड से: com.google.codedbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, org.codehaus.mojo, com.beust.jcommander, com.google.common, com.google.re2j, and com.google.thirdparty. (गूगल अपाचे और बीएसडी जैसी लाइसेंस का उपयोग करता है।)   
         
## SGT{#sgt} 
रेखाचित्रों और मानचित्रों को ऑन-द-फ्लाई बनाया जाता है जिसमें एक संशोधित संस्करण होता है। NOAA SGT (पर थाhttps://www.pmel.noaa.gov/epic/java/sgt/अब बंद) संस्करण 3 (a Java - आधारित वैज्ञानिक ग्राफिक्स टूलकिट डोनाल्ड डेनबो द्वारा लिखित [ NOAA PMEL](https://www.pmel.noaa.gov/) )   (लाइसेंस: कॉपीराइट ओपन सोर्स (पर थाhttps://www.pmel.noaa.gov/epic/java/license.html) ) ।
     
## वाल्टर ज़ॉर्न{#walter-zorn} 
बिग, एचटीएमएल टूलटिप ऑन ERDDAP ' HTML पृष्ठों को वाल्टर Zorn' wz \tooltip के साथ बनाया गया है। js (लाइसेंस: LGPL) ।
स्लाइडर और स्लाइड सॉर्टर के ड्रैग एंड ड्रॉप फीचर को वाल्टर ज़ॉर्न के wz \\_dragdrop.js के साथ बनाया गया है (लाइसेंस: LGPL) ।
     
## OpenPDF{#openpdf} 
पीडीएफ फाइलें के साथ बनाई गई हैं [ओपनpdf](https://github.com/LibrePDF/OpenPDF) मुक्त Java -PDF लाइब्रेरी
     
## GSHHS{#gshhs} 
तटरेखा और झील डेटा से हैं [GSHHS](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html) - A Global Self-consistent, Hierarchical, High-resolution Shoreline Database (लाइसेंस: [जीपीएल](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT) ) और पॉल वेसल और वाल्टर स्मिथ द्वारा बनाई गई।

हम कोई दावा नहीं करते हैं कि शोरेलिन डाटा के भ्रष्टाचार के बारे में क्या है? ERDDAP™ - नाभिचार के लिए आईटी का उपयोग न करें।
     
    
## GMT pscoast{#gmt-pscoast} 
राजनीतिक सीमा और नदी डेटा से हैं [Pscoast](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html) कार्यक्रम [GMT](https://www.soest.hawaii.edu/gmt/) जो डेटा का उपयोग करता है [सीआईए वर्ल्ड डाटा बैंक II](https://www.evl.uic.edu/pape/data/WDB/)   (लाइसेंस: सार्वजनिक डोमेन) ।

हम POLITICAL BOUNDARY DATA के CORRECTNESS के बारे में कोई CLAIM नहीं बनाते हैं। ERDDAP ।
    
## ETOPO{#etopo} 
कुछ मानचित्रों की पृष्ठभूमि में उपयोग किए जाने वाले स्नानमेट्री / स्थलाकृति डेटा है [ETOPO1 ग्लोबल 1-मिन्यूट ग्रिड्ड एलिवेशन डेटा सेट](https://www.ngdc.noaa.gov/mgg/global/global.html)   (बर्फ की सतह, ग्रिड पंजीकृत, द्विआधारी, 2 बाइट int: etopo1\\_ice\\_g\\_i2 .zip )   (लाइसेंस: [सार्वजनिक डोमेन](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright) ) द्वारा वितरित किया जाता है [ NOAA एनजीडीसी](https://www.ngdc.noaa.gov) ।

हम कोई दावा नहीं करते हैं कि BATHYMETRY/TOPOGRAPHY DATA के CORRECTNESS के बारे में ERDDAP । नाभिचार के लिए आईटी का उपयोग न करें।
    
##  Java मेल{#javamail} 
मेल में कोड का उपयोग करके ईमेल भेजे जाते हैं। से जार Oracle ' [ Java मेल एपीआई](https://javaee.github.io/javamail/)   (लाइसेंस: [कॉमन विकास और वितरण लाइसेंस (सीडीएल) संस्करण 1.1](https://javaee.github.io/javamail/LICENSE) ) ।
     
## JSON{#json} 
 ERDDAP™ उपयोग [json.org Java JSON पुस्तकालय](https://www.json.org/index.html) to parse [JSON](https://www.json.org/) डेटा (लाइसेंस: [कॉपीराइट ओपन सोर्स](https://www.json.org/license.html) ) ।
     

## PostgrSQL{#postgrsql} 
 ERDDAP™ इसमें शामिल है [पोस्टग्रेस JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql) ड्राइवर (लाइसेंस: [बीएसडी](https://www.postgresql.org/about/licence/) ) । ड्राइवर कॉपीराइट है (c) 1997-2010, PostgreSQL ग्लोबल डेवलपमेंट ग्रुप। सर्वाधिकार सुरक्षित
     
## लुसीन{#lucene} 
 ERDDAP™ अपाचे से कोड का उपयोग करें [लुसीन](https://lucene.apache.org/) । (लाइसेंस: [अपाचे](https://www.apache.org/licenses/LICENSE-2.0) ) "लुसिन" खोज इंजन विकल्प के लिए (लेकिन डिफ़ॉल्ट "मूल" खोज इंजन के लिए नहीं) ।
     
## कॉमन्स-कंप्रेस{#commons-compress} 
 ERDDAP™ अपाचे से कोड का उपयोग करें [कॉमन्स-कंप्रेस](https://commons.apache.org/compress/) । (लाइसेंस: [अपाचे](https://www.apache.org/licenses/LICENSE-2.0) ) ।
     
## JEXL{#jexl} 
 ERDDAP™ अभिव्यक्ति और स्क्रिप्ट का मूल्यांकन करने के लिए समर्थन&lt; sourceName S&gt; पर निर्भर करता है [अपाचे परियोजना](https://www.apache.org/) : [ Java अभिव्यक्ति भाषा (JEXL) ](https://commons.apache.org/proper/commons-jexl/)   (लाइसेंस: [अपाचे](https://www.apache.org/licenses/LICENSE-2.0) ) ।
     
## Cassandra{#cassandra} 
 ERDDAP™ शामिल अपाचे [Cassandra](https://cassandra.apache.org/)   [cassandra-driver-core.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)   (लाइसेंस: [अपाचे 2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE) ) ।
Cassandra के cassandra-driver-core.jar की आवश्यकता है (इसलिए ERDDAP™ शामिल) :
*    [guava.jar](https://github.com/google/guava)   (लाइसेंस: [अपाचे 2.0](https://github.com/google/guava/blob/master/LICENSE) ) ।
*    [lz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)   (लाइसेंस: [अपाचे 2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt) ) ।
*    [metrics-core.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)   (लाइसेंस: [एमआईटी](https://github.com/codahale/metrics/blob/master/LICENSE) ) ।
*    [Netty-all.jar](https://netty.io/downloads.html)   (लाइसेंस: [अपाचे 2.0](https://netty.io/downloads.html) ) ।
*    [Snappy-java.jar](https://xerial.org/snappy-java/)   (लाइसेंस: [अपाचे 2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE) ) ।
         
##  KT\\_ पैलेट{#kt_-palettes} 
रंग पैलेट, जिसमें प्रीफ़िक्स है " KT\\_ " [क्रिस्टन द्वारा .cpt पैलेटों का संग्रह थांग](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)   (लाइसेंस: [एमआईटी / एक्स](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html) ) , लेकिन जेनिफर सेवाड्जियन द्वारा थोड़ा सुधारित NOAA ताकि वे अनुरूप हों ERDDAP .cpt आवश्यकताओं.
     
##  Leaflet  {#leaflet} 
 ERDDAP™ उपयोग Java स्क्रिप्ट पुस्तकालय [ Leaflet ](https://leafletjs.com/)   (लाइसेंस: [बीएसडी 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) ) जैसा WMS ग्राहक पर WMS वेब पेज ERDDAP । यह उत्कृष्ट सॉफ्टवेयर है (अच्छी तरह से डिजाइन, प्रयोग करने में आसान, तेज और मुफ्त) Vladimir Agafonkin से।
     
## एडब्ल्यूएस{#aws} 
अमेज़न AWS के साथ काम करने के लिए (S3 सहित) , ERDDAP™ v2 का उपयोग करता है [AWS SDK Java ](https://aws.amazon.com/sdk-for-java/)   (लाइसेंस: [अपाचे](https://www.apache.org/licenses/) ) ।

AWS को निर्भरता में खींचने के लिए Maven की आवश्यकता होती है। वे निम्नलिखित शामिल हैं। (जहां xxx संस्करण संख्या है, जो समय के साथ बदलता है, और लाइसेंस प्रकार Parentheses में है) Annotation-xxx.jar (अपाचे) Apache-client-xxx.jar. (अपाचे) Ams-xxx.jar (बीएसडी) , asm-xxx.jar (बीएसडी) asm-analysis-xxx.jar (बीएसडी) , asm-commons-xxx.jar (बीएसडी) , asm-tree-xxx.jar (बीएसडी) , asmutil-xxx.jar (बीएसडी) , auth-xxx.jar (?) Aws-core-xxx.jar. (अपाचे) Aws-query-protocol-xxx.jar (अपाचे) Aws-xml-protocol-xxx.jar (अपाचे) , चेकर-qual-xxx.jar (एमआईटी) त्रुटि \\_prone \\_annotation-xxx.jar (अपाचे) , eventstream-xxx.jar (अपाचे) , असफलता xxx.jar (अपाचे) , http xxx.jar (अपाचे) , j2objc-annotation-xxx.jar (अपाचे) जैक्सन-annotations-xxx.jar (अपाचे) जैक्सन कोर-xxx.jar (अपाचे) जैक्सन-databind-xxx.jar (अपाचे) , jaxen-xxx.jar (बीएसडी) , jffi-xxx.jar (अपाचे) Jffi-xxx.native. जार (अपाचे) , jnr-constants-xxx.jar (अपाचे) , jnr-ffi-xxx.jar (अपाचे) , jnr-posix-xxx.jar (अपाचे) , jnr-x86asm-xxx.jar (अपाचे) , jsonxxx.jar (कॉपीराइट ओपन सोर्स) , jsr305-xxx.jar (अपाचे) , श्रृंगार-xxx.jar (अपाचे) , एक दर्जन Netty के बारे में। जार (अपाचे) , प्रोफाइल xxx.jar (अपाचे) , प्रोटोकॉल-कोर-xxx.jar (अपाचे) Reactive-streams-xxx.jar (सीसीओ 1.0) , क्षेत्र-xxx.jar (अपाचे) , s3-xxx.jar (अपाचे) , sdk-core-xxx.jar (अपाचे) , Utils-xxx.jar (?) । वास्तविक लाइसेंस देखने के लिए, .jar नाम की खोज में [Maven Repository](https://mvnrepository.com/) और फिर लाइसेंस खोजने के लिए परियोजना की फ़ाइलों में चारों ओर रुमेज करें।
    

हम सभी सॉफ्टवेयर और वेबसाइटों के लिए भी बहुत आभारी हैं जो हम विकास करते समय उपयोग करते हैं ERDDAP सहित
 [क्रोम](https://www.google.com/chrome/browser/desktop/) ,
 [ curl ](https://curl.haxx.se/) ,
 [DuckDuckGo](https://duckduckgo.com/?q=) ,
 [EditPlus](https://www.editplus.com/) ,
 [फाइलज़िला](https://filezilla-project.org/) ।
 [गिटहब](https://github.com/) ,
 [Google Search](https://www.google.com/webhp) ,
 [पुट्टी](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) ,
 [स्टैक ओवरफ्लो](https://stackoverflow.com/) ,
 [todoist](https://todoist.com/?lang=en) ,
 [ Wikipedia ](https://www.wikipedia.org/) ,
इंटरनेट, वर्ल्ड वाइड वेब, और अन्य सभी, महान, उपयोगी वेबसाइटों।
बहुत धन्यवाद।
