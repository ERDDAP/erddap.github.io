---
title: "ERDDAP™ Documentation"
---
## नवीनतमERDDAP™संस्करण{#latest-erddap-version} 

2.28.0, देखें[दस्तावेज़ीकरण](/changes#version-2280)और[इसे डाउनलोड करें](https://github.com/ERDDAP/erddap/releases/tag/v2.28.0)।

## ERDDAP™सूचना{#erddap-information} 

ERDDAP™एक वैज्ञानिक डेटा सर्वर है जो उपयोगकर्ताओं को सबसेट डाउनलोड करने का एक सरल, सुसंगत तरीका देता है
सामान्य फ़ाइल प्रारूपों में ग्रिड और सारणीबद्ध वैज्ञानिक डेटासेट और ग्राफ और मानचित्र बनाते हैं।
ERDDAP™एक मुक्त और खुला स्रोत है (अपाचे और अपाचे की तरह)  Javaसे सेवNOAA NMFS SWFSCपर्यावरण अनुसंधान प्रभाग (ERD) ।

* देखने/उपयोग करने के लिएERDDAP™स्थापना:[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* एक स्थापना पढ़ने के साथ शुरू करने के लिए[परिनियोजित इंस्टॉल गाइड](/docs/server-admin/deploy-install)।
* कोड का योगदान करने के लिए[प्रोग्रामर गाइड](/docs/contributing/programmer-guide)।


नीचे आपको प्रश्न पूछने और कैसे योगदान करने के लिए प्रासंगिक लिंक मिलेंगे।
* बातचीत की समीक्षा करें और प्रश्न पूछें[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)या[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* समीक्षा और मुद्दों को जमा करने के लिए[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* सुविधा अनुरोध का प्रस्ताव करने के लिए, इस मार्गदर्शन का पालन करें:[ERDDAPचर्चा #93 (टिप्पणी) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## एकाधिक खोजेंERDDAP™s
एकाधिक खोज करने के दो तरीके हैंERDDAP™डेटासेट के लिए S:[एकाधिक खोजेंERDDAP™s](/SearchMultipleERDDAPs.html)और[ERDDAP™डेटासेट डिस्कवरी](http://erddap.com/)।


## अपना खुद का सेट करेंERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™एक है[मुक्त और खुला स्रोत](https://en.wikipedia.org/wiki/Free_and_open-source_software)सभीJava  (जलाशय) वेब एप्लिकेशन जो वेब एप्लिकेशन सर्वर में चलता है (उदाहरण के लिए, टॉमकैट (अनुशंसित) जेटी (यह काम करता है, लेकिन हम इसे समर्थन नहीं देते) ) । यह वेब पेज ज्यादातर लोगों के लिए है ("ERDDAP™व्यवस्थापक) जो अपने आप को स्थापित करना चाहते हैंERDDAP™अपनी वेबसाइट पर स्थापना।

एक स्थापना पढ़ने के साथ शुरू करने के लिए[परिनियोजित इंस्टॉल गाइड](/docs/server-admin/deploy-install)।

### उपयोग क्यों करेंERDDAP™अपने डेटा को वितरित करने के लिए?{#why-use-erddap-to-distribute-your-data} 

क्योंकि स्थापित करने का छोटा प्रयासERDDAP™कई फायदे लाता है।

* यदि आपके पास पहले से ही आपके डेटा को वितरित करने के लिए एक वेब सेवा है, तो आपके पास डेटा को वितरित करने के लिए एक वेब सेवा है।
आप स्थापित कर सकते हैंERDDAP™मौजूदा सेवा के माध्यम से अपने डेटा तक पहुंचना।
या, आप स्थापित कर सकते हैंERDDAP™स्थानीय फ़ाइलों से सीधे अपने डेटा तक पहुंचना।
* प्रत्येक डेटासेट के लिए, आपको केवल XML का एक छोटा सा हिस्सा लिखना होगाERDDAP™डेटासेट का उपयोग कैसे करें।
* एक बार जब तुम होERDDAP™अपने डेटा की सेवा, अंत उपयोगकर्ता कर सकते हैं:
    * विभिन्न तरीकों से डेटा का अनुरोध करें (DAP,WMSभविष्य में) ।
    * विभिन्न फ़ाइल स्वरूपों में डेटा प्रतिक्रिया प्राप्त करें। (यह शायद सबसे बड़ा कारण है&#33;) 
    * ग्राफ और मानचित्र बनाते हैं। (हर कोई सुंदर चित्र पसंद करता है।) 
    * शीर्ष पर अन्य उपयोगी और दिलचस्प चीजें बनाएंERDDAP'वेब सेवाएँ -- देखें[Awesome ERDDAPटीएम](https://github.com/IrishMarineInstitute/awesome-erddap)भयानक की सूचीERDDAP- संबंधित परियोजनाएं।

आप कर सकते हैं[अनुकूलित](/docs/server-admin/deploy-install#customize)आपकाERDDAPइसलिए उपस्थितिERDDAP™अपने संगठन को प्रतिबिंबित करता है और आपकी बाकी वेबसाइट के साथ फिट बैठता है।

## क्या स्थापना प्रक्रिया कठिन है? क्या मैं इसे कर सकता हूँ?{#is-the-installation-procedure-hard-can-i-do-it} 

प्रारंभिक स्थापना कुछ समय लेती है, लेकिन यह बहुत मुश्किल नहीं है। आप इसे कर सकते हैं। यदि आप अटक जाते हैं, तो मुझे ईमेल करेंerd dot data at noaa dot gov। मैं आपकी मदद करूँगा।
या, आप जुड़ सकते हैं[ERDDAP™गूगल ग्रुप / मेलिंग सूची](https://groups.google.com/g/erddap)और वहाँ अपने सवाल पोस्ट।

## कौन उपयोग करता हैERDDAP™ {#who-uses-erddap} 

ERDDAP™कम से कम 17 देशों में लगभग 100 संगठनों द्वारा स्थापित किया गया है

 (ऑस्ट्रेलिया, बेल्जियम, कनाडा, चीन, फ्रांस, भारत, आयरलैंड, इटली, न्यूजीलैंड, रूस, दक्षिण अफ्रीका, स्पेन, श्रीलंका, स्वीडन, थाईलैंड, ब्रिटेन, संयुक्त राज्य अमेरिका) सहित:

*   [एपीडीआरसी](https://apdrc.soest.hawaii.edu/erddap/index.html)  (एशिया प्रशांत डेटा अनुसंधान केंद्र) हवाई विश्वविद्यालय में (यूएच)  
*   [डब्ल्यूएचओआई में BCO-DMO](https://erddap.bco-dmo.org/erddap/index.html)  (जैविक और रासायनिक महासागर वुड्स होल ओशनोग्राफिक पर डाटा मैनेजमेंट ऑफिस संस्था)  
*   [कैनविनERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (कनाडाई वाटरशेड सूचना नेटवर्क) पृथ्वी अवलोकन विज्ञान केंद्र में (सीईओ) मैनिटोबा विश्वविद्यालय
*   [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)  (यूसीएसडी में तटीय डेटा सूचना कार्यक्रम)  
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)  (नेशनल रिसर्च काउंसिल ऑफ इटली, इंस्टीट्यूट ऑफ पोलर साइंस)  
* सीएसआईआरओ और आईएमओएस (ऑस्ट्रेलिया के राष्ट्रमंडल वैज्ञानिक और औद्योगिक अनुसंधान संगठन और एकीकृत समुद्री अवलोकन प्रणाली) 
*   [डेवलपर (NOAAओआरआर) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAAप्रतिक्रिया और बहाली का कार्यालय)  
*   [EMODNET भौतिकी](https://erddap.emodnet-physics.eu/erddap/index.html)  (यूरोपीय समुद्री अवलोकन और डेटा नेटवर्क - भौतिकी)  
*   [गोमरी](https://erddap.griidc.org/erddap/index.html)  (मेक्सिको अनुसंधान पहल की खाड़ी)  
*   [हकाई संस्थान](https://catalogue.hakai.org/erddap/index.html)  (ब्रिटिश कोलंबिया, कनाडा के केंद्रीय तट पर Hakai संस्थान) 
*   [हाई स्कूल टेक्नोलॉजी सर्विसेज](https://myhsts.org)जो छात्रों और वयस्कों के लिए कोडिंग और प्रौद्योगिकी प्रशिक्षण प्रदान करता है
*   [ICHEC](https://erddap.ichec.ie/erddap/index.html)  (आयरिश सेंटर फॉर हाई-एंड कम्प्यूटिंग) 
*   [INCOIS](https://erddap.incois.gov.in/erddap/index.html)  (महासागर सूचना सेवाओं के लिए भारतीय राष्ट्रीय केंद्र)  
* IRD (संस्थान de Recherche le Développement, फ्रांस डालना)   
सीएनएस (सेंटर नेशनल डे ला रेचेरी वैज्ञानिक, फ्रांस)   
यूपीएमसी (Université Pierre एट मैरी CURIE, पेरिस, फ्रांस)   
यूसीएडी (Université Cheikh Anta Diop de Dakar, Sénégal)   
जीबी (Université Gaston Berger)   
UFHB (Université Félix Abidjan, Côte d'Ivoire)   
आईपीएसएल (इंस्टिट्यूट पिएरे साइमन लाप्लेस डे साइंस डी l'environnement, पेरिस, फ्रांस)   
एलएमआई ECLAIRS (लेबरतोयर मिक्सटे इंटरनेशनल "Etude du Climat en Afrique de l'Ouest et de ses Interactions avec l'Environnement Régional, et appui aux Services climatiques") 
* जेआरसी (यूरोपीय आयोग - संयुक्त अनुसंधान केंद्र, यूरोपीय संघ) 
*   [समुद्री संस्थान](https://erddap.marine.ie/erddap/index.html)  (आयरलैंड)  
* समुद्री उपकरण S.A. (स्पेन) 
* एनसीआई (ऑस्ट्रेलिया की राष्ट्रीय कम्प्यूटेशनल इन्फ्रास्ट्रक्चर) 
*   [NOAAकोस्ट वाच](https://coastwatch.noaa.gov/erddap/index.html)  (केंद्रीय)  
*   [NOAAकोस्ट वाच CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (कैरेबियाई / खाड़ी मेक्सिको नोड)  
*   [NOAAकोस्टवॉच GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (ग्रेट झील नोड)  
*   [NOAAकोस्ट वाच वेस्ट कोस्ट](https://coastwatch.pfeg.noaa.gov/erddap/index.html)जो सह-स्थानित है और साथ में काम करता है
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (पर्यावरण अनुसंधान प्रभागSWFSCofNMFS) 
*   [NOAAIOOS सेंसर](https://erddap.sensors.ioos.us/erddap/index.html)  (एकीकृत महासागर अवलोकन प्रणाली)  
*   [NOAAIOOS CeNCOओएस](https://erddap.axiomdatascience.com/erddap/index.html)  (केंद्रीय और उत्तरी कैलिफोर्निया महासागर अवलोकन प्रणाली, Axiom Data Science द्वारा संचालित)  
*   [NOAAIOOS GCOOS वायुमंडलीय और महासागरीय डेटा: अवलोकन प्रणाली](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOOS वायुमंडलीय और महासागरीय डेटा: ऐतिहासिक संग्रह](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAIOOS GCOOS जैविक और सामाजिक अर्थशास्त्र](https://gcoos4.tamu.edu/erddap/index.html)  (खाड़ी तट महासागर अवलोकन प्रणाली) 
*   [NOAAIOOS NERACOOS](http://www.neracoos.org/erddap/index.html)  (तटीय और महासागर अवलोकन प्रणाली के पूर्वोत्तर क्षेत्रीय संघ)  
*   [NOAAIOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)  (नेशनल ग्लाइडर डाटा असेंबली सेंटर)  
*   NOAAआईओएस (नॉर्थवेस्ट एसोसिएशन ऑफ नेटवर्क महासागर अवलोकन प्रणाली) 
*   [NOAAआईओएस](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (प्रशांत द्वीप महासागर अवलोकन प्रणाली) हवाई विश्वविद्यालय में (यूएच)  
*   NOAAIOOS SCCOOS (दक्षिणी कैलिफोर्निया तटीय महासागर अवलोकन प्रणाली) 
*   [NOAAIOOS SECOORA](https://erddap.secoora.org/erddap/index.html)  (दक्षिणपूर्व तटीय महासागर क्षेत्रीय एसोसिएशन का अवलोकन)  
*   [NOAAएनसीईआरटी](https://www.ncei.noaa.gov/erddap/index.html)  (पर्यावरण सूचना के लिए राष्ट्रीय केंद्र)    
*   NOAANGDC STP (राष्ट्रीय भूभौतिक डाटा सेंटर, सौर -- स्थलीय भौतिकी) 
*   NOAA NMFSएनईएफएससी (पूर्वोत्तर मत्स्य विज्ञान केंद्र) 
*   [NOAANOS CO-OP](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (ऑपरेशनल ओशनोग्राफिक प्रोडक्ट्स और सर्विसेज के लिए केंद्र)  
*   [NOAAOSMC](http://osmc.noaa.gov/erddap/index.html)  (अवलोकन प्रणाली निगरानी केंद्र)  
*   [NOAAपीआईएफएससी](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (प्रशांत द्वीप मत्स्य विज्ञान केंद्र)  
*   [NOAAPMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAAध्रुवीय वाच](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAयूएएफ](https://upwell.pfeg.noaa.gov/erddap/index.html)  (एकीकृत एक्सेस फ्रेमवर्क)  
*   [महासागर नेटवर्क कनाडा](http://dap.onc.uvic.ca/erddap/index.html) 
*   [महासागर ट्रैकिंग नेटवर्क](https://members.oceantrack.org/erddap/index.html) 
*   [OI / All Data](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (महासागर अवलोकन)   
OI / Uncabled डेटा
* प्रिंसटन, हाइड्रोमेटियोरोलॉजी रिसर्च ग्रुप
* आर.टेक इंजीनियरिंग, फ्रांस
*   [Rutgers विश्वविद्यालय, समुद्री और तटीय विज्ञान विभाग](https://tds.marine.rutgers.edu/erddap/index.html)  
* सैन फ्रांसिस्को Estuary संस्थान
*   [महासागर विज्ञान के स्क्रिप्स इंस्टीट्यूशन, स्प्रे अंडरवाटर ग्लाइडर्स](https://spraydata.ucsd.edu/erddap/index.html) 
*   [स्मार्ट अटलांटिक](https://www.smartatlantic.ca/erddap/index.html)न्यूफाउंडलैंड के मेमोरियल यूनिवर्सिटी
* दक्षिण अफ़्रीकी पर्यावरण अवलोकन नेटवर्क
* स्पाइग्लास टेक्नोलॉजी
* स्टैनफोर्ड यूनिवर्सिटी, हॉपकिंस मरीन स्टेशन
*   [यूनेस्को IODE](https://erddap.oa.iode.org/erddap/index.html)  (अंतर्राष्ट्रीय महासागर विज्ञान और सूचना डाटा एक्सचेंज)  
*   [विश्वविद्यालय ब्रिटिश कोलंबिया, पृथ्वी, महासागर और वायुमंडलीय विज्ञान विभाग](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [डेविस विश्वविद्यालय, Bodega समुद्री प्रयोगशाला](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [डेलावेयर विश्वविद्यालय, सैटेलाइट रिसीवर स्टेशन](https://basin.ceoe.udel.edu/erddap/index.html) 
* वाशिंगटन विश्वविद्यालय, एप्लाइड भौतिकी प्रयोगशाला
*   [यूएसजीएस सीएमजीपी](https://geoport.usgs.esipfed.org/erddap/index.html)  (तटीय और समुद्री भूगोल कार्यक्रम)  
*   [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (वॉयस ऑफ द ओशन, स्वीडन)  

यह सिर्फ कुछ संगठनों की सूची है जहांERDDAP™कुछ व्यक्तिगत या कुछ समूह द्वारा स्थापित किया गया है। यह नहीं है कि व्यक्ति, समूह, या संगठन सिफारिश करता है या समर्थन करता हैERDDAP।

### ERDDAP™भीतर की सिफारिश की जाती हैNOAAसीएनएस{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAAडेटा एक्सेस प्रक्रियात्मक निर्देश](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)शामिलERDDAP™समूहों के भीतर उपयोग के लिए अनुशंसित डेटा सर्वरों की सूची मेंNOAA।ERDDAP™विशेष रूप से अनुभाग 4.2.3 में उल्लेख किया गया है
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (अनुसंधान डेटा प्रबंधन सर्वश्रेष्ठ अभ्यास गाइड) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) सेंटर नेशनल डे ला रेचेरी वैज्ञानिक (सीएनएस) फ्रांस में।

## स्लाइड शो{#slide-shows} 

यहां कुछ पावरपॉइंट स्लाइड शो और दस्तावेज़ हैं जो बॉब सिमोन ने संबंधित बनाया हैERDDAP।

 **अस्वीकरण: इन दस्तावेजों में व्यक्त की गई सामग्री और राय बॉब सिमन्स की व्यक्तिगत राय हैं और जरूरी नहीं कि सरकार या सरकार की किसी भी स्थिति को प्रतिबिंबित करें।National Oceanic and Atmospheric Administration।** 

चार मुख्य दस्तावेज़:

*   [मुख्य परिचयERDDAP™  (संस्करण 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx)।
आप भी कर सकते हैं[इस बात को देखते हुए बॉब के इस वीडियो को देखें![यूट्यूब](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4)।
*   [एक पृष्ठ का विवरणERDDAP™  (पीडीएफ) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAPभारी लोड, ग्रिड, क्लस्टर्स, फेडरेशन और क्लाउड कम्प्यूटिंग](/docs/server-admin/scaling)
*   [डेटा वितरण प्रणाली के लिए बॉब के दिशानिर्देश](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

अन्य प्रस्तुतियाँ:

*   [2020 EDM: नई सुविधाएँERDDAP™v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 DMIT: Data Ingest](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (या[इस बात को देखते हुए बॉब के इस वीडियो को देखें](https://www.youtube.com/watch?v=9ArYxgwON2k)।) 
*   [2019 IOOS DMAC: नई सुविधाएँERDDAP™v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 ग्रीष्मकालीन ESIP: सबसेटिंग इनERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 ग्रीष्मकालीन ESIP: JSON समर्थन मेंERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 ईडीएम: वेब सर्विसेज की एक वितरित प्रणाली (तेज़, आसान, कम महंगी)   (क्यों मैं 4 साल पहले खुश था?) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EDM:ERDDAP™2018 में](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: नई सुविधाएँERDDAP™छवि, ऑडियो और वीडियो डेटा के लिए](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF औरERDDAP™डेटा एकीकरण के लिए समाधान](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: एक त्वरित परिचयERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 ईडीएम और 2017 आईओओएस: न्यू या लिटिल नोनERDDAP™सुविधाएँ (उपयोगकर्ताओं के लिए) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 ईडीएम और 2017 आईओओएस: न्यू या लिटिल नोनERDDAP™सुविधाएँ (प्रशासकों के लिए) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017 EDM: EML, KNB, औरERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 EDM: डेटा स्रोत से अंत उपयोगकर्ता तक कैसे प्राप्त होता है? ओल्ड स्कूल बनाम न्यू स्कूल](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 ग्रीष्मकालीन ESIP: बिग पिक्चर: PARR,OPeNDAP,ERDDAP™डेटा वितरण](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016 EDM: वन एंड डोन](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 Gov API: अगली पीढ़ी डेटा सर्वर](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015 ग्रीष्मकालीन ESIP: सारणीबद्ध एकत्रीकरण](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 ईडीएम: बॉब की डो और टैबुलर डेटा के लिए मत करो](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM: आदर्श उपयोगकर्ता इंटरफ़ेस](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014 ग्रीष्मकालीन ESIP: सारणीबद्ध डेटा](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: ग्रिड डेटा की तरह इन-सिटू और सारणीबद्ध डेटा का इलाज न करें](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDM: कम से कम](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: डेटा वितरण प्रणाली के लिए दिशानिर्देश](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

अन्य लोगों द्वारा प्रस्तुतियाँ:

*   [ग्लोबल डाटा शेयरिंग में सुधार के लिए एक FAIR आधारित उपकरण![यूट्यूब](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
केविन ओ'ब्रायन द्वारा ग्लोबल ओशन अवलोकन प्रणाली में (GOOS) वेबिनार / अवलोकन समन्वय समूह (OCG) श्रृंखला / 1, नवंबर 12, 2020।
*   [अपने खुद के मौसम ऐप का उपयोग करनाNOAAओपन डेटा और जुपीटर नोटबुक![यूट्यूब](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
Filipe Fernandes और रिच Signell द्वारा SciPy 2018, जुलाई 13, 2018.
*   [OOI का उपयोग करनाERDDAP![यूट्यूब](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
रिच साइनेल, फरवरी 2018 द्वारा।
*   [साइटमैप टेक डाइव: "ERDDAPलाइटनिंग टॉक्स![यूट्यूब](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
आठ 5-मिनट वार्ता के बारे में दिलचस्प बातें लोग के साथ क्या कर रहे हैंERDDAPजेन्न सेवाड्जियन, जिम पोटेमरा, कोनोर डेलनी, केविन ओ'ब्रायन, जॉन केरफुट, स्टेफ़नी पेटिलो, चार्ल्स कार्लटन और एली हंटर ने 31 अगस्त, 2017 को एक ESIP Tech Dive के रूप में प्रस्तुत किया।
*   [उपयोगERDDAP™Access Tabular Data![यूट्यूब](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
द्वारा रिच Signell, अगस्त 2015.
*   [टेस्ट का उपयोग करनाERDDAP™ब्लू कार्बन डाटा![यूट्यूब](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
द्वारा रिच Signell, अगस्त 2015.
*   [डेटा का उपयोग करनाERDDAP™मेंNOAA'GNOMEसॉफ्टवेयर![यूट्यूब](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM)।
इस वीडियो में, रिच साइनेल ने महासागरीय धाराओं को डेटा का पूर्वानुमान लगायाERDDAP™समुद्र में एक विषाक्त फैलने के लिए उपयोग करना[NOAA'GNOMEसॉफ्टवेयर](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (5 मिनट में&#33;) । (वीडियो में एक छोटी त्रुटि: जब डेटासेट की खोज की जाती है, तो खोज शर्तों के बीच और उपयोग नहीं किया जाता है। यह निहित है।) द्वारा रिच सिनेल, अप्रैल 8, 2011.
