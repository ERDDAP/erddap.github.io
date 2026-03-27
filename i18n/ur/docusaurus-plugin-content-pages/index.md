---
title: "ERDDAP™ Documentation"
---
## تاریخ ERDDAP™ ورژن{#latest-erddap-version} 

2.30.0، دیکھیں [دستاویزات تبدیل کریں](/changes#version-2300) اور [اسے اتار دو](https://github.com/ERDDAP/erddap/releases/tag/v2.30.0) . .

##  ERDDAP™ معلومات{#erddap-information} 

 ERDDAP™ ایک سائنسی ڈیٹا سرور ہے جو صارفین کو ایک سادہ، متوازن طریقہ فراہم کرتا ہے۔
اخذ کردہ اور تبتی سائنسی اعداد و شمار عام فائل فارمیٹ میں شمار کیے جاتے ہیں اور گراف اور نقشہ بناتے ہیں۔
 ERDDAP™ ایک آزاد اور کھلا ماخذ ہے۔ (اپاچی اور اپاچی کی طرح)   Java سرِورق کی تصویر NOAA   NMFS   SWFSC ماحولیاتی تحقیقی تقسیم ( ERD ) . .

* ایک نظر رکھنے کے لئے ERDDAP™ تنصیب: [ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 
* تنصیب کردہ پڑھنے سے شروع [یو آر ایل انسٹال کریں](/docs/server-admin/deploy-install) . .
* کوڈ ملانے کے لئے [پروگرامر ہدایت کار](/docs/contributing/programmer-guide) . .


نیچے سوال کرنے اور دوسروں کو دینے کے لئے متعلقہ تعلقات قائم کریں ۔
* گفتگو کا اعادہ کریں اور سوال پوچھیں [ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap) یا وہ [ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions) 
* اعادہ کرنا اور سر تسلیم خم کرنا [ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues) 
* درخواستوں کی تجویز پیش کرنے کے لیے اس ہدایت پر عمل کریں: [ ERDDAP نمبر93 (تبصرہ) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427) 


## تلاش ERDDAP™ بند
متعدد تلاش کے دو طریقے ہیں۔ ERDDAP™ اعداد و شمار کے لیے Ss: [تلاش ERDDAP™ بند](/SearchMultipleERDDAPs.html) اور [ ERDDAP™ ڈیٹا فہرست](http://erddap.com/) . .


## خود کو بلند کریں ERDDAP™  {#set-up-your-own-erddap} 

 ERDDAP™ ایک ہے [آزاد اور کھلے ماخذ](https://en.wikipedia.org/wiki/Free_and_open-source_software) ... تمام Java   (سرکل) . ، ویب ایپلیکیشن جو ویب ایپلیکیشن سرور میں چلتا ہے۔ (مثال کے طور پر ٹومکاٹ (سفارش) : (یہ کام کرتا ہے، لیکن ہم اس کی حمایت نہیں کرتے) ) . . یہ ویب صفحہ زیادہ تر لوگوں کے لیے ہے۔ (" ERDDAP™ منتظم") جو اپنی جگہ قائم کرنا چاہتے ہیں۔ ERDDAP™ اپنی ویب سائٹ پر نصب.

تنصیب کردہ پڑھنے سے شروع [یو آر ایل انسٹال کریں](/docs/server-admin/deploy-install) . .

### کیوں استعمال کریں ERDDAP™ آپ کے اعداد و شمار کو تقسیم کرنے کے لئے؟{#why-use-erddap-to-distribute-your-data} 

کیونکہ قائم کرنے کی چھوٹی سی کوشش ERDDAP™ بہت سے فوائد حاصل ہوتے ہیں ۔

* اگر آپ کے پاس آپ کے ڈیٹا کو تقسیم کرنے کے لئے ویب سروس ہے تو،
آپ بنا سکتے ہیں ERDDAP™ آپ کی موجودہ سروس کے ذریعے معلومات تک رسائی کے لئے.
یا، آپ قائم کر سکتے ہیں ERDDAP™ آپ کے ڈیٹا کو مقامی فائلوں سے براہ راست رسائی حاصل کرنے کے لئے.
* ہر ڈیٹا سیٹ کے لیے آپ کو صرف ایکس ایم ایل کا ایک چھوٹا چیک لکھنا پڑتا ہے۔ ERDDAP™ ڈیٹا سیٹ تک رسائی کیسے ممکن ہے۔
* ایک بار آپ کے پاس ہے ERDDAP™ اپنے اعداد و شمار کی خدمت، ختم صارفین کر سکتے ہیں:
    * ڈیٹا کی درخواست مختلف طریقوں سے کی جاتی ہے۔ ( DAP : WMS ''اور مستقبل میں زیادہ ہے۔) . .
    * مختلف فائل فارمیٹ میں ڈیٹا کا جواب حاصل کریں۔ (یہ غالباً سب سے بڑی وجہ ہے&#33;) 
    * گراف اور نقشہ بنا لیں۔ (ہر کوئی کافی تصاویر پسند کرتا ہے۔) 
    * اوپر کی جانب دیگر مفید اور دلکش چیزیں بنائیں ERDDAP ' ویب سروسز - دیکھیں [ Awesome ERDDAP ٹی ایم](https://github.com/IrishMarineInstitute/awesome-erddap) یہ فہرست بہت بڑی ہے۔ ERDDAP - متعلقہ منصوبوں.

آپ کر سکتے ہیں [مصر](/docs/server-admin/deploy-install#customize) آپ ERDDAP 'ایسا لگتا ہے ERDDAP™ اپنی تنظیم کی عکاسی کریں اور اپنی باقی ویب سائٹ کے ساتھ مطابقت پیدا کریں۔

## کیا ایسا کرنا مشکل ہے ؟ میں یہ کر سکتے ہیں؟{#is-the-installation-procedure-hard-can-i-do-it} 

ابتدائی تنصیب کچھ وقت لیتا ہے لیکن یہ بہت مشکل نہیں ہوتا۔ آپ یہ کر سکتے ہیں. آپ پھنس گئے تو، مجھ پر ای میل erd dot data at noaa dot gov . . میں تمہاری مدد کروں گا.
یا، آپ میں شامل کر سکتے ہیں [ ERDDAP™ گوگل گروپ / میلنگ فہرست](https://groups.google.com/g/erddap) اور آپ کا سوال وہاں پوسٹ.

## جو استعمال کرتا ہے۔ ERDDAP™  {#who-uses-erddap} 

 ERDDAP™ کم از کم 17 ممالک میں تقریباً 100 تنظیمیں نصب کی گئی ہیں۔

 (آسٹریلیا، بیلجیم، کینیڈا، چین، فرانس، بھارت، آئرلینڈ، اٹلی، نیوزی لینڈ، روس، جنوبی افریقا، ہسپانیہ، سری لنکا، سویڈن، تھائی لینڈ، برطانیہ، امریکا۔) شامل ہیں:

*    [اپریل](https://apdrc.soest.hawaii.edu/erddap/index.html)   (ایشیا-Pacific Data-Research Center, International Pacific ریسرچ سینٹر) ہوائی کی یونیورسٹی میں (مصر)  
*    [ڈبلیو .](https://erddap.bco-dmo.org/erddap/index.html)   (حیاتیاتی اور کیمیاوی علوم Data Management Office at Woods Oceangraphic at Woods Oceangraphic at Woods غیر متصل)  
*    [چین ERDDAP™ ](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)   (کینیڈین آبی معلومات نیٹ ورک) زمین کی حفاظت کے مرکز میں (ڈائریکٹر) یونیورسٹی آف مانیتوبا
*    [سی‌ڈی‌پی](https://erddap.cdip.ucsd.edu/erddap/index.html)   (Coastal Data Information Program at UCD)  
*    [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)   (نیشنل ریسرچ کونسل آف اٹلی، انسٹی ٹیوٹ آف پولر سائنسز ہیں۔)  
* س . ع . (آسٹریلیا کا مجموعی سرمایہ دارانہ سائنسی اور صنعتی تحقیقی ادارہ اور Integrated Marine Control System ہے۔) 
*    [یونان ( NOAA یار) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)   ( NOAA حکومت کا دفتر)  
*    [Ednet Physics](https://erddap.emodnet-physics.eu/erddap/index.html)   (یورپی بحریہ Observation and Data Network -- طبیعیات -)  
*    [منگولیا](https://erddap.griidc.org/erddap/index.html)   (خلیج میکسیکو کے تحقیقی ادارے)  
*    [ہاکا انسٹی ٹیوٹ](https://catalogue.hakai.org/erddap/index.html)   (کینڈا کے صوبے برٹش کولمبیا میں واقع ایک جھیل-) 
*    [ہائی اسکول ٹیکنالوجی سروسز](https://myhsts.org) ، جس میں طالب علموں اور بڑوں کے لیے کوڈ اور ٹیکنالوجی کی تربیت دی جاتی ہے۔
*    [چین](https://erddap.ichec.ie/erddap/index.html)   (آئرش مرکز برائے اعلی) 
*    [I NCO ہے](https://erddap.incois.gov.in/erddap/index.html)   (بحر اوقیانوس انفارمیشن سروسز کے لیے انڈین نیشنل سینٹر)  
* بھارت (فرانس فہرست فرانس کے شہر انگریزی ویکیپیڈیا کے مشارکین. "Institut de Recherche". لی ڈویلپمنٹ (انگریزی: Le Dévelopment) فرانس کا ایک فرانس کے صوبے جو فرانس میں واقع ہے۔)   
CNRS (فرانس فہرست فرانس کے شہر انگریزی ویکیپیڈیا کے مشارکین. "Centre National de la Recherche Scentifique".)   
پِک (Université Pierre et Marie کروئی، پیرس فر انس)   
امریکہ (Université Cheikh Anta Diop de Dakar, Sénégal)   
یوگب (Université Gaston Berger - Saint-Louis du Sénégal -)   
یو . (Université Félix HOUPHUËT-BOIGNY, Abidjan, آئیوری کوسٹ)   
آئی پیSL (Institut Piermon Lapate des Sciences de l'environment) پیرس کا ایک رہائشی علاقہ جو پیرس میں واقع ہے۔ فر انس)   
لِمِس (بین‌الاقوامی رابطہ vEtude du Clymat en Afrique de l'Ouest et de Ses interacts avec L'Environment Régional, et appui Aux Services Clematiques) 
* JRC (یورپی کمیشن - جوائنٹ ریسرچ سینٹر، یورپی یونین -) 
*    [بحریہ انسٹی ٹیوٹ](https://erddap.marine.ie/erddap/index.html)   (آئر يا)  
* بحریہ انڈسٹریز ایس این اے۔ (سپین) 
* ناک (آسٹریلیا کا قومی ترانہ) 
*    [ NOAA ساحل پر](https://coastwatch.noaa.gov/erddap/index.html)   (مرکز)  
*    [ NOAA ساحلی پٹی](https://cwcgom.aoml.noaa.gov/erddap/index.html)   (کیریباتی/گلف آف میکسیکو نودے –)  
*    [ NOAA ساحلی حصہ](https://coastwatch.glerl.noaa.gov/erddap/index.html)   (عظیم جھیلوں نویں)  
*    [ NOAA ساحلی ساحل](https://coastwatch.pfeg.noaa.gov/erddap/index.html) جس سے متصل اور کام ہوتا ہے۔
     [ NOAA   ERD ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (ماحولیاتی تحقیقی تقسیم – SWFSC : NMFS ) 
*    [ NOAA آئیواس سینئر](https://erddap.sensors.ioos.us/erddap/index.html)   (سمندر کی گردش کا نظام)  
*    [ NOAA س . ع . NCO OS](https://erddap.axiomdatascience.com/erddap/index.html)   (مرکزی اور شمالی کیلیفورنیا بحر اوقیانوس (انگریزی: Axiom Data Science) بحر منجمد جنوبی کا نظام ہے۔)  
*    [ NOAA IOS GCOS Atmospheric and Oceangraphic Data: Conferation System](https://erddap.gcoos.org/erddap/index.html)   
     [ NOAA IOS GCOS Atmospheric and Oceangraphic Data: Historical centeration -](https://gcoos5.geos.tamu.edu/erddap/index.html)   
     [ NOAA IOS GCOS Biological and Socioeconomics](https://gcoos4.tamu.edu/erddap/index.html)   (بحرِمُردار کا ساحلی نظام) 
*    [ NOAA آئیوواس](http://www.neracoos.org/erddap/index.html)   (شمال مشرقی علاقائی اتحاد ساحلی اور بحر اوقیانوس کے نظامات ہیں۔)  
*    [ NOAA یونان](https://data.ioos.us/gliders/erddap/index.html)   (قومی گلوکار ڈیٹا اسمبلی سینٹر)  
*    NOAA آئیواس (شمال مغربی اتحاد برائے نیٹ ورک بحر اوقیانوس کے نظامات) 
*    [ NOAA آئیواس پیک](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)   (بحرِمُردار) ہوائی کی یونیورسٹی میں (مصر)  
*    NOAA آئیو ایس سی سی او - (جنوبی کیلیفورنیا ساحلی سمندر کا نظام) 
*    [ NOAA شہر](https://erddap.secoora.org/erddap/index.html)   (جنوب‌مشرقی ساحلی بحرِ اوقیانوس کی علاقائی رفاقت)  
*    [ NOAA نفیس](https://www.ncei.noaa.gov/erddap/index.html)   (ماحولیاتی معلومات کیلئے قومی مرکز)    
*    NOAA چین (قومی GeoNation Data Center, Solar -- Terrestrial Physics -) 
*    NOAA   NMFS نفیس (شمال مشرقی ماہی‌گیری سائنسی مرکز) 
*    [ NOAA NoS Co-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)   (مرکز برائے آپریشنل بحر اوقیانوس پروڈیوس اور خدمات)  
*    [ NOAA اولمپکس](http://osmc.noaa.gov/erddap/index.html)   (حفاظتی نظام نگرانی مرکز)  
*    [ NOAA پی .](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)   (بحرِمُردار کے ساحلوں پر مچھلیوں کا مرکز)  
*    [ NOAA پَل](https://data.pmel.noaa.gov/pmel/erddap/index.html) 
*    [ NOAA پولُس رسول](https://polarwatch.noaa.gov/erddap/index.html) 
*    [ NOAA طےشدہ](https://upwell.pfeg.noaa.gov/erddap/index.html)   (غیر مناسب رسائی فریم ورک)  
*    [بحر نیٹ ورکس کینیڈا](http://dap.onc.uvic.ca/erddap/index.html)  
*    [بحرِمُردار](https://members.oceantrack.org/erddap/index.html)  
*    [OOI / تمام معلومات](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)   (بحرِمُردار)   
OOI / ناقابل استعمال معلومات
* Princeton, Hydrometeology ریسرچ گروپ
* آر ٹی ٹیک انجینئری، فرانس
*    [Rutgers University, Department of Marine and Coastal Sciences](https://tds.marine.rutgers.edu/erddap/index.html)   
* سان فرانسسکو ایسوسی ایشن انسٹی ٹیوٹ
*    [ایس . اے .](https://spraydata.ucsd.edu/erddap/index.html)  
*    [شمالی افریقہ](https://www.smartatlantic.ca/erddap/index.html) میموریل یونیورسٹی آف نیولینڈ
* جنوبی افریقا کا ماحولیاتی تحفظ نیٹ ورک
* سپینش ٹیکنالوجیز
* سٹینفورڈ یونیورسٹی، ہوبسن بحریہ اسٹیشن
*    [یونیسکو آئی‌لینڈ](https://erddap.oa.iode.org/erddap/index.html)   (بین الاقوامی بحر اوقیانوس اور معلومات ڈیٹا ایکسچینج)  
*    [یونیورسٹی آف برٹش کولمبیا، زمینی، بحر اوقیانوس اور ایٹمی خطے میں واقع ہے۔ سائنسی شعبے](https://salishsea.eos.ubc.ca/erddap/index.html)  
*    [ایس . بونگگا بحری بیڑے](http://bmlsc.ucdavis.edu:8080/erddap/index.html)  
*    [یونیورسٹی آف ڈیلاویئر (انگریزی:](https://basin.ceoe.udel.edu/erddap/index.html)  
* یونیورسٹی آف واشنگٹن (انگریزی: University of Washington Physics) ایک جامعہ ہے۔
*    [یو جی ایس ایم سی ایم ایل](https://geoport.usgs.esipfed.org/erddap/index.html)   (ساحل اور بحریہ جیوولوجی پروگرام)  
*    [واٹ](https://erddap.observations.voiceoftheocean.org/erddap/index.html)   (سویڈن کی آواز)  

یہ ان چند تنظیموں کی فہرست ہے جہاں ہیں۔ ERDDAP™ کسی فرد یا گروہ کی جانب سے نصب کیا گیا ہے۔ اس کا مطلب یہ نہیں کہ انفرادی، جماعت یا تنظیم سفارش یا سفارش کرتی ہے۔ ERDDAP . .

###  ERDDAP™ اس کی سفارش اندر کی جاتی ہے۔ NOAA اور CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
 [ NOAA 's Data Access Procedural Republic -](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) شامل ہیں۔ ERDDAP™ اس کی سفارش کردہ ڈیٹا سروروں کی فہرست میں اندر کے گروہوں کی طرف سے استعمال کے لیے NOAA . . ERDDAP™ حصے کے 4,3 میں مثبت مذکور ہے۔
[Guide de Bonnes Permatiques Sur La Gestion des données de la Recherche]۔
 (ریسرچ ڈاٹ انتظام بہترین ہدایات) [] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) مرکز نیشنل ڈی لا رچرچ سسینٹیکی کا ہے۔ (CNRS) فرانس میں.

## ردِعمل{#slide-shows} 

یہاں کچھ پاور پیوینٹ سرجری شوز اور دستاویزات موجود ہیں جن کا تعلق بوب سائمنز سے ہے۔ ERDDAP . .

 **[حوالہ درکار] CLAMER: ان دستاویزوں میں بیان کردہ مواد اور نظریات Bob Simons کی ذاتی رائے ہیں اور لازمی طور پر حکومت یا حکومت کے کسی مؤقف کی عکاسی نہیں کرتے۔ National Oceanic and Atmospheric Administration . .** 

چار بنیادی دستاویزات:

*    [بنیادی اندراج ERDDAP™   (نسخہ 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx) . .
آپ بھی کر سکتے ہیں [باب کی یہ ویڈیو اس تقریر کو دیکھ کر![یو ٹیوب](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4) . .
*    [ایک کتاب کی وضاحت ERDDAP™   (. . .) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf) 
*    [ ERDDAP : بھاری بوجھ، گرڈس، کائف، فیڈریشن اور کلاؤڈ کامپلنگ ہیں۔](/docs/server-admin/scaling) 
*    [ڈاٹ نیٹ سسٹمز کے لیے بوب کی گائیڈ لائنیں](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) 

دیگر امور:

*    [2020 ایم آئی ایم: میں نئی معلومات موجود ہیں۔ ERDDAP™ 'وی2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx) 
*    [2020-05-19 ڈی ایم آئی ڈی:](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)   (یا [باب کی یہ ویڈیو اس تقریر کو دیکھ کر](https://www.youtube.com/watch?v=9ArYxgwON2k) . .) 
*    [2019 آئیو ایس او سی: نیو گنی بساؤ میں ERDDAP™ v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx) 
*    [2018 سمرقند : ذیل میں ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx) 
*    [2018 سُم‌پی : جی‌ہاں ۔ ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx) 
*    [2018 EdM: A Distributed System of Web Services (فاسٹر، ایسائر، کم ایکسچینج)   (یا، 4 سال پہلے میں خوش کیوں تھا.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx) 
*    [2018 ایم آئی ڈی: ERDDAP™ 2018ء میں](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx) 
*    [2018 ای میل : میں نئی معلومات ERDDAP™ تصویر، آڈیو اور ویڈیو ڈاٹ کام کے لیے](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx) 
*    [2018 ^ ا ب آئی ایم ڈی بی - ERDDAP™ اعدادوشمار کے حل](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx) 
*    [2017 ^ ا ب آئی ایم: ایک فوری اندراج ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx) 
*    [2017 EM اور 2017 IOS: New یا L Littlele معروف ہے۔ ERDDAP™ محفوظات (صارفین کے لئے) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx) 
*    [2017 EM اور 2017 IOS: New یا L Littlele معروف ہے۔ ERDDAP™ محفوظات (منتظمین کیلئے) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx) 
*    [2017 ای میل: ایم ایل، KNB، اور ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx) 
*    [2017 ای میل: ماخذ سے آخر صارف تک اعداد و شمار کیسے حاصل ہوتا ہے۔ پرانے اسکولی اسکول کی تعلیم](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx) 
*    [2016ء سمرقند: عظیم تصویر: ParR، OPeNDAP : ERDDAP™ . . .](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx) 
*    [2016 ای‌میل : ایک اینڈ‌وین](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx) 
*    [2016ء اگلی نسل : ڈیٹا سرورز](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx) 
*    [2015 سمرقند (انگریزی: Tabular Agregation) پاکستان کا ایک آباد مقام جو ضلع جہلم میں واقع ہے۔](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx) 
*    [2014 ای میل: باب کی دوس اور طبلہ ڈاٹ کام کے لیے نہیں ہے۔](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx) 
*    [2014 ایم آئی ڈی:](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx) 
*    [2014 سمپل : Tableular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx) 
*    [2013: Gridd Data کی طرح In-Setu اور Tabular Data کا علاج مت کریں.](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html) 
*    [2013ء : کم سے کم کام کریں](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt) 
*    [2012 ^ ا ب پ ربط : دائرۃ المعارف بریطانیکا آن لائن آئی ڈی:](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt) 

دیگر لوگوں کی طرف سے پیش‌گوئیاں :

*    [عالمی ڈیٹا شیئر کو بہتر بنانے کے لئے ایک ایف آر آئی کی بنیاد![یو ٹیوب](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)   
عالمی بحر اوقیانوس کے نظام میں کین او برین (جنوب) Webinar / Observation Group (اولمپک) Series / 12 نومبر 2020ء۔
*    [خود کو موسمِ‌سرما کی علامت بنانا NOAA کھلے اعداد و شمار![یو ٹیوب](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)   
فلپ فیرننڈز اینڈ رچ سگنلز at SciPy 2018, 13 جولائی 2018۔
*    [یو . ERDDAP ![یو ٹیوب](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)   
از رچ سگنل، فروری 2018ء۔
*    [میکسیکو کرناٹک: " ERDDAP روشنی کی گفتگو"![یو ٹیوب](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)   
لوگوں کے ساتھ کام کر رہے ہیں ERDDAP Gene Sevadjian, Jim Potemra, Conor Delanney, Kennel O'Brien, John Kerfo, Stephen Petillo, Charles Carleton اور ایلی ہنٹر نے 31 اگست 2017ء کو بطور ایسوسی ایشن ٹیک ڈویژن پیش کیا۔
*    [استعمال ERDDAP™ رسائی حاصل کرنے کے لئے![یو ٹیوب](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)   
از رچ سگنل، اگست 2015ء۔
*    [آزمائش کا استعمال ERDDAP™ نیلی کاربن ڈاٹ کام کے لیے![یو ٹیوب](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)   
از رچ سگنل، اگست 2015ء۔
*    [معلومات کا استعمال ERDDAP™ اندر NOAA ' GNOME سافٹ وئیر![یو ٹیوب](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM) . .
اس ویڈیو میں رچی ہوئی سگنل سے بحر اوقیانوس کرنٹ ڈیٹا ڈاؤن لوڈ کرتا ہے۔ ERDDAP™ سمندر کے استعمال میں ایک زہریلا دھماکا ماڈل بنانے کے لئے [ NOAA ' GNOME سافٹ وئیر](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)   (5 منٹ میں&#33;) . . (ویڈیو میں ایک چھوٹی سی غلطی: جب اعداد و شمار کی تلاش کی جاتی ہے تو استعمال نہ کریں اور تلاش کے اصطلاحات کے درمیان۔ بے شک یہ حق الیقین ہے،) از رچ سگنل، 8 اپریل 2011ء۔
