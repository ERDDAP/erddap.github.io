---
title: "ERDDAP™ Documentation"
---
## সর্বশেষ ERDDAP™ সংস্করণ{#latest-erddap-version} 

২. [ডকুমেন্টের বৈশিষ্ট্য পরিবর্তন](/changes#version-2290) এবং [ডাউনলোড করা সামগ্রী](https://github.com/ERDDAP/erddap/releases/tag/v2.29.0) . .

##  ERDDAP™ তথ্য{#erddap-information} 

 ERDDAP™ একটি বৈজ্ঞানিক উপাত্ত সার্ভার, যা ব্যবহারকারীদেরকে সাধারণ এবং একটি সাধারণ প্রক্রিয়াতে ডাউনলোড করতে দেয়, যা কিনা একটি বৈজ্ঞানিক উপাত্তের অংশ
সাধারণ ফাইল বিন্যাস ও Pard দ্বারা গ্রাফ এবং ম্যাপকৃত ফাইল বৈজ্ঞানিক উপাত্ত নির্দিষ্ট করুন।
 ERDDAP™ একটি মুক্ত এবং ওপেন সোর্স (অ্যানাকটু এবং অ্যাপাচি-এর মত খেলা)   Java স্ক্যান করা হবে না NOAA   NMFS   SWFSC পরিবেশ গবেষণা বিভাগ ( ERD ) . .

* একটি ব্যবহার করার জন্য ERDDAP™ ইনস্টলেশন: [https://coastwatch.pfeg.noaa.gov/erddap/index.html](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 
* ইনস্টলেশন আরম্ভ করার জন্য [Stack ইনস্টল গাইড](/docs/server-admin/deploy-install) . .
* সমাধানকৃত কোড [প্রোগ্রামারের গাইড](/docs/contributing/programmer-guide) . .


নীচে প্রশ্ন করা এবং কিভাবে অবদান রাখা যায় সে বিষয়ে আপনি প্রাসঙ্গিক লিঙ্ক পাবেন।
* কথোপকথন এবং প্রশ্নের উত্তর [https://groups.google.com/g/erddap](https://groups.google.com/g/erddap) অথবা মধ্যে [https://github.com/erddap/erddap/discussions](https://github.com/erddap/erddap/discussions) 
* ( ১ করি. [https://github.com/erddap/erddap/issues](https://github.com/erddap/erddap/issues) 
* অনুরোধ করার জন্য, এই নির্দেশনা অনুসরণ করুন: [ ERDDAP আলোচনা #৯৩ (মন্তব্য) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427) 


## একাধিক অনুসন্ধান করা হবে ERDDAP™ আইসোবার
একাধিক অনুসন্ধানের উদ্দেশ্যে দুটি উপায় উপস্থিত রয়েছে ERDDAP™ sine- এর জন্য তথ্য: [একাধিক অনুসন্ধান করা হবে ERDDAP™ আইসোবার](/SearchMultipleERDDAPs.html) এবং [ ERDDAP™ তথ্য ডিসকভারি](http://erddap.com/) . .


## নিজের বৈশিষ্ট্য নির্ধারণ করুন ERDDAP™  {#set-up-your-own-erddap} 

 ERDDAP™ এটি একটিও নয় [মুক্ত এবং ওপেন সোর্স](https://en.wikipedia.org/wiki/Free_and_open-source_software) সব- Java   (সেভলেট) অ্যাপ্লিকেশন, ওয়েব অ্যাপ্লিকেশন সার্ভার (যেমন, টম্যাট. (প্রস্তাবিত) বা জেটি (এটা কাজ করে, কিন্তু আমরা এটা সমর্থন করি না) ) . . এই ওয়েব পেজ মূলত জনগণের জন্য। ("" ERDDAP™ অ্যাডমিনস্ট্রেটর&#33;) যারা নিজেদের তৈরি করতে চায় ERDDAP™ তাদের নিজস্ব ওয়েবসাইটে ইনস্টলেশন করুন।

ইনস্টলেশন আরম্ভ করার জন্য [Stack ইনস্টল গাইড](/docs/server-admin/deploy-install) . .

### কেন ব্যবহার ERDDAP™ আপনার তথ্য বিতরণ?{#why-use-erddap-to-distribute-your-data} 

কারণ ছোট প্রচেষ্টা সেট করার জন্য ERDDAP™ ( হিতো.

* আপনার তথ্য বিতরণ করার জন্য যদি আপনার একটি ওয়েব সার্ভিস থাকে,
সেট আপ করা যাবে ERDDAP™ উপস্থিত পরিসেবা উপলব্ধকারী দ্বারা আপনার তথ্য উপলব্ধ করা হয়।
অথবা, আপনি সেট করতে পারেন ERDDAP™ স্থানীয় ফাইল থেকে সরাসরি আপনার তথ্য ব্যবহার করা যাবে।
* প্রতিটি ডাটার জন্য, আপনাকে শুধু একটি XML অংশ লিখতে হবে ERDDAP™ কি ভাবে তথ্য প্রবেশ করতে হবে।
* একবার আপনি পেয়েছিলাম ERDDAP™ আপনার তথ্য সেবা, শেষে ব্যবহারকারীদেরকে ব্যবহার করা যাবে:
    * বিভিন্ন ভাবে তথ্য প্রাপ্তির অনুরোধ করুন ( DAP '%s' WMS এবং তার উপর যা কিছু রয়েছে , তা পার ্ থিব জীবনের ভোগের ,) . .
    * বিভিন্ন বিন্যাসে ফাইল বিন্যাস সংক্রান্ত তথ্য প্রাপ্ত করুন। (এটাই সম্ভবত সবচেয়ে বড় কারণ&#33;) 
    * গ্রাফ এবং মানচিত্র তৈরি করুন। (সবাই সুন্দর ছবি পছন্দ করে।) 
    * উপরে অন্যান্য প্রয়োজনীয় এবং আকর্ষণীয় জিনিস তৈরি করুন ERDDAP ' ওয়েব সার্ভিস' - দেখুন [ Awesome ERDDAP টি- এমName](https://github.com/IrishMarineInstitute/awesome-erddap) চরম তালিকার তালিকা ERDDAP - সম্পর্কিত প্রকল্প।

তুমি পারবে [স্বনির্বাচিত](/docs/server-admin/deploy-install#customize) আপনার ERDDAP চেহারা তাই ERDDAP™ আপনার প্রতিষ্ঠান এবং আপনার বাকি ওয়েবসাইটের সাথে খাপ খাইয়ে নিন।

## ইনস্টলেশন প্রক্রিয়া কি কঠিন? আমি কি এটা করতে পারি?{#is-the-installation-procedure-hard-can-i-do-it} 

প্রথম ইনস্টলেশন কিছু সময় নেয়, কিন্তু এটা কঠিন কিছু নয়। তুমি পারবে। আপনি আটকে থাকলে আমাকে ইমেইল করে erd dot data at noaa dot gov . . আমি তোমাকে সাহায্য করবো।
অথবা আপনি যোগদান করতে পারেন [ ERDDAP™ গুগল গ্রুপ / মেইলিং লিস্ট](https://groups.google.com/g/erddap) এবং সেখানে আপনার প্রশ্ন পোস্ট করুন।

## কে ব্যবহার করে ERDDAP™  {#who-uses-erddap} 

 ERDDAP™ কমপক্ষে ১৭টি দেশে প্রায় ১০০টি সংস্থা ইনস্টল করা হয়েছে।

 (অস্ট্রেলিয়া, বেলজিয়াম, কানাডা, চীন, ফ্রান্স, ভারত, আয়ারল্যান্ড, নিউজিল্যান্ড, রাশিয়া, দক্ষিণ আফ্রিকা, শ্রীলঙ্কা, সুইডেন, যুক্তরাজ্য, যুক্তরাজ্য) এছাড়াও:

*    [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)   (এশিয়া-প্যাসিফিক ডাটা-রেব অনুসন্ধান কেন্দ্র) হাওয়াই বিশ্ববিদ্যালয়ে (ইউহ)  
*    [BCO-DMHI তে BCO-DM](https://erddap.bco-dmo.org/erddap/index.html)   (বায়োলজিক্যাল এবং রাসায়নিক বিশ্লেষণ উডস হোলগ্রাফিকের তথ্য ব্যবস্থাপনা অফিস প্রতিষ্ঠান)  
*    [চিত্র ERDDAP™ ](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)   (কানাডিয়ান পানি সরবরাহকৃত তথ্য নেটওয়ার্ক) পৃথিবীর পর্যবেক্ষণ বিজ্ঞানের কেন্দ্রে (নির্বাহী) বিশ্ববিদ্যালয়
*    [সিডিIP](https://erddap.cdip.ucsd.edu/erddap/index.html)   (UCD তে উপকূলীয় তথ্যের প্রোগ্রাম)  
*    [C-RISP](https://data.iadc.cnr.it/erddap/index.html)   (ইতালির ন্যাশনাল রিসার্চ কাউন্সিল, ইনস্টিটিউট অফ পোলার সায়েন্স)  
* দেশ: (অস্ট্রেলিয়ার কমনওয়েলথ বৈজ্ঞানিক এবং শিল্প বিষয়ক গবেষণা সংস্থা এবং সমন্বিত সামুদ্রিক পর্যবেক্ষণ সংস্থা) 
*    [ডি রিডার ( NOAA আহরণ) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)   ( NOAA প্রতিক্রিয়া এবং পুনরুদ্ধারের অফিস)  
*    [EMoDenet পদার্থবিদ্যা](https://erddap.emodnet-physics.eu/erddap/index.html)   (ইউরোপীয় মেরিন পর্যবেক্ষণ এবং তথ্য নেটওয়ার্ক -- পদার্থবিদ্যা)  
*    [গোরি](https://erddap.griidc.org/erddap/index.html)   (মেক্সিকো গবেষণা উদ্যোগ)  
*    [হ্যাকাই ইনস্টিটিউট](https://catalogue.hakai.org/erddap/index.html)   (কানাডার ব্রিটিশ কলম্বিয়ার সেন্ট্রাল কোস্টের হাাকাই ইনস্টিটিউট) 
*    [উচ্চ বিদ্যালয় প্রযুক্তি পরিসেবা](https://myhsts.org) ছাত্র এবং প্রাপ্তবয়স্কদের জন্য কোড এবং প্রযুক্তি প্রশিক্ষণ
*    [নির্বাচন](https://erddap.ichec.ie/erddap/index.html)   (উচ্চ- উপর- আলোচনার জন্য আইরিশ সেন্টার) 
*    [আমি NCO অনির্দিষ্ট](https://erddap.incois.gov.in/erddap/index.html)   (ভারত জাতীয় কেন্দ্র)  
* IRD (ইনট্যুরেন্স ডিরেচেচে লা ডিভেলপপ, ফ্রান্স)   
সি- এন- জিName (সেন্ট্রাল ন্যাশনাল রেচিয়েটিক্সিক, ফ্রান্স)   
কাজ: (অভেরিয়েত CURIE, প্যারিস, ফ্রান্স)   
ইউসিদ্দো (ইউনিভার্সইত চেইখ আনাটা দে ডাকার, সিগাল)   
ইউজি (ইউনিভারএসে গ্যাস্টন বার্গার - সেন্ট-লুই ডু সিগাল)   
UFHB (বিশ্ব নিরীক্ষা আইভরি কোস্ট)   
IPSL (শিক্ষানংয়ের পিয়ের সিমন লাস্টেন্স ডে ডে লিভিরেন্স, প্যারিস, ফ্রান্স)   
এল. এম. এল. (মাটোতোরে মিটো আন্তর্জাতিক  এতে করে আমি সবচেয়ে বেশী বিস্মিত হয়েছি।) 
* জি- আর- সিName (ইউরোপীয় কমিশন - গবেষণা কেন্দ্র, ইউরোপীয় ইউনিয়ন) 
*    [মেরিন ইনস্টিটিউট](https://erddap.marine.ie/erddap/index.html)   (আয়ারল্যান্ড)  
* মেরিন ইনস্টিরাস এস. (স্পেন) 
* NCI (অস্ট্রেলিয়ার জাতীয় উন্নতি) 
*    [ NOAA বিশ্ব নিরীক্ষা](https://coastwatch.noaa.gov/erddap/index.html)   (মধ্য)  
*    [ NOAA কোস্টওয়াচ সিজিএম](https://cwcgom.aoml.noaa.gov/erddap/index.html)   (মেক্সিকো নোদে)  
*    [ NOAA বিশ্ব নিরীক্ষা](https://coastwatch.glerl.noaa.gov/erddap/index.html)   (গ্রেট লেক নোক্স)  
*    [ NOAA আইভরি কোস্ট](https://coastwatch.pfeg.noaa.gov/erddap/index.html) যা জোড় ও যা বিজোড়
     [ NOAA   ERD ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (পরিবেশ গবেষণা বিভাগ SWFSC এর NMFS ) 
*    [ NOAA IOOS সেনসর](https://erddap.sensors.ioos.us/erddap/index.html)   (সমন্বিত ওশান পর্যবেক্ষণ সিস্টেম)  
*    [ NOAA IOOS C NCO OS](https://erddap.axiomdatascience.com/erddap/index.html)   (মধ্য এবং উত্তর ক্যালিফোর্নিয়া ওশান পর্যবেক্ষণ সিস্টেম, Aalxym উপাত্ত বিজ্ঞানের পরিচালিত)  
*    [ NOAA IOCIOSS একটি বায়ুমণ্ডলীয় এবং সামুদ্রিক জীববিদ্যা: পর্যবেক্ষণ সিস্টেম](https://erddap.gcoos.org/erddap/index.html)   
     [ NOAA IOCIOSS একটি বায়ুমণ্ডলীয় এবং মহাসাগরের তথ্য: ক্যালসিয়াম](https://gcoos5.geos.tamu.edu/erddap/index.html)   
     [ NOAA IOOSS বায়োলজিক্যাল এবং Soiciasity](https://gcoos4.tamu.edu/erddap/index.html)   (গাল্ফ কোস্ট পর্যবেক্ষণ সিস্টেম) 
*    [ NOAA IO অনুমতি](http://www.neracoos.org/erddap/index.html)   (উত্তর-পূর্বাঞ্চলীয় আঞ্চলিক সংস্থা)  
*    [ NOAA IOOS NGADC](https://data.ioos.us/gliders/erddap/index.html)   (জাতীয় সংগীত তথ্য সম্মেলন কেন্দ্র)  
*    NOAA আই- ও- ডি (উত্তরপশ্চিম অফ-লাইন নেটওয়ার্ক বিনিময় ব্যবস্থা) 
*    [ NOAA IOSILILS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)   (প্যাসিফিক দ্বীপপুঞ্জ) হাওয়াই বিশ্ববিদ্যালয়ে (ইউহ)  
*    NOAA IOSIBS (দক্ষিণ ক্যালিফোর্নিয়া কোস্ট ওশান টেরিটোরি) 
*    [ NOAA IOOSS নিরাপত্তা](https://erddap.secoora.org/erddap/index.html)   (দক্ষিণ উপকূলীয় সামুদ্রিক পর্যবেক্ষণ সংস্থা)  
*    [ NOAA বরফ](https://www.ncei.noaa.gov/erddap/index.html)   (পরিবেশ বিষয়ক তথ্য কেন্দ্র)    
*    NOAA NGDP STP (জাতীয় বিজ্ঞান তথ্য কেন্দ্র, সৌরজগৎ — টেরিট্রিক্স) 
*    NOAA   NMFS NEFSC (উত্তরপূর্ব ফিসিস সায়েন্স সেন্টার) 
*    [ NOAA NOS-OOP](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)   (অপারেশনাল ওশান জীববিদ্যা উৎপাদন এবং সেবা কেন্দ্র)  
*    [ NOAA OSMC](http://osmc.noaa.gov/erddap/index.html)   (পর্যবেক্ষণ সিস্টেম নিরীক্ষণ ব্যবস্থা)  
*    [ NOAA PIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)   (প্যাসিফিক দ্বীপপুঞ্জ)  
*    [ NOAA পিএমএল](https://data.pmel.noaa.gov/pmel/erddap/index.html) 
*    [ NOAA পোলারওয়াচ](https://polarwatch.noaa.gov/erddap/index.html) 
*    [ NOAA মার্কিন যুক্তরাষ্ট্র](https://upwell.pfeg.noaa.gov/erddap/index.html)   (গঠনবিহীন কাঠামো)  
*    [ওশান নেটওয়ার্ক কানাডা](http://dap.onc.uvic.ca/erddap/index.html)  
*    [ওশান অনুসরণ নেটওয়ার্ক](https://members.oceantrack.org/erddap/index.html)  
*    [ওআই / অল সকল তথ্য](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)   (সামুদ্রিক পর্যবেক্ষণ)   
OOI / Unaborcusor উপাত্ত
* প্রিন্সটন, Hyd moretris রিসার্চ গ্রুপ
* আর.
*    [রুটেরস্‌ বিশ্ববিদ্যালয়, মেরিন এবং উপকূলীয় বিজ্ঞান বিভাগ](https://tds.marine.rutgers.edu/erddap/index.html)   
* সান ফ্রান্সিসকো এসটিরিয়া ইনস্টিটিউট
*    [সার্দ্দিগ্রাফিশন অব ওশানোগ্রাফি, স্প্রেয়ার পানির নীচে প্রার্থনা](https://spraydata.ucsd.edu/erddap/index.html)  
*    [স্মার্ট-কার্ড](https://www.smartatlantic.ca/erddap/index.html) সা. কা.
* দক্ষিণ আফ্রিকান পরিবেশ পর্যবেক্ষণ নেটওয়ার্ক
* নমুনা
* স্ট্যানফোর্ড বিশ্ববিদ্যালয়, হপকিন্স মেরিন স্টেশন
*    [ইউনেস্কো IODE](https://erddap.oa.iode.org/erddap/index.html)   (আন্তর্জাতিক ওশানগ্রাফিক এবং তথ্য Exchange সংক্রান্ত তথ্য)  
*    [ব্রিটিশ কলম্বিয়া, পৃথিবী, সমুদ্র ও বায়ুমণ্ডলের বিশ্ববিদ্যালয় বিজ্ঞান বিভাগ](https://salishsea.eos.ubc.ca/erddap/index.html)  
*    [ডেভিসের ক্যালিফোর্নিয়া বিশ্ববিদ্যালয় বোধিগা মেরিন শ্রম গবেষণা](http://bmlsc.ucdavis.edu:8080/erddap/index.html)  
*    [টরটার বিশ্ববিদ্যালয়, স্যাটেলাইট আহরণ স্টেশন](https://basin.ceoe.udel.edu/erddap/index.html)  
* ওয়াশিংটন বিশ্ববিদ্যালয়, আ্যসপিরিন ফিজিক্স ল্যাবরেটরি
*    [USGMP](https://geoport.usgs.esipfed.org/erddap/index.html)   (উপকূলীয় ও মেরিন জিওজি প্রোগ্রাম)  
*    [ভিটো](https://erddap.observations.voiceoftheocean.org/erddap/index.html)   (ভয়েস অফ দ্যা ওশান, সুইডেন)  

এটা এমন কিছু সংস্থার তালিকা যেখানে লেখা আছে: ERDDAP™ কিছু ব্যক্তি অথবা কিছু দল দ্বারা ইনস্টল করা হয়েছে । এর মানে এই নয় যে, ব্যক্তি, দল বা সংগঠন সুপারিশ করে বা সুপারিশ করে । ERDDAP . .

###  ERDDAP™ এর মধ্যে রয়েছে NOAA আর্তর{#erddap-is-recommended-within-noaa-and-cnrs} 
 [ NOAA 'তথ্যের ব্যবহার প্রডিনরাল ডিরেক্টিভ'](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) অন্তর্ভুক্ত ERDDAP™ দলের মধ্যে উপস্থিত তথ্যমূলক দলের তালিকা ব্যবহার করার জন্য সুপারিশকৃত তথ্য তালিকার মধ্যে উপস্থিত রয়েছে NOAA . . ERDDAP™ সেকশন ৪. ২.৩ - তে বলা হয়
[গুদা ডি বেন্টিকের শব্দ ]
 (তথ্য ব্যবস্থাপনা সর্বোত্তম চর্চা সহায়িকাName) ( প্রকা. (https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales) কেন্দ্রের জাতীয় পরিবর্তন (সি- এন- জিName) ফ্রান্সে.

## স্লাইড-শো{#slide-shows} 

এখানে কিছু পাওয়ার পয়েন্ট স্লাইড শো এবং নথি রয়েছে যা বব সাইমন্স তৈরি করেছেন ERDDAP . .

 **ডিস্ক: এই নথিগুলির বিষয়বস্তু এবং মতামত হলো বব সাইমনের ব্যক্তিগত মতামত এবং তা সরকারের কোন অবস্থান প্রতিফলিত করে না। National Oceanic and Atmospheric Administration . .** 

চারটি মূল নথি:

*    [মূল পরিচিতি ERDDAP™   (সংস্করণ ৫) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx) . .
তুমিও পারবে [ববের এই ভিডিওটা দেখ![ইউটিউব](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4) . .
*    [এক পৃষ্ঠার বিবরণ ERDDAP™   (. . . .) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf) 
*    [ ERDDAP : ভারি লোড লোড, গ্রিড, স্তবক, ফেডারেশন এবং ক্লাউডু](/docs/server-admin/scaling) 
*    [ডাটা ডিস্ট্রিবিউশনের জন্য ববের গাইডলাইন](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) 

অন্যান্য উপস্থাপনা:

*    [২০২০ ই-মেইল: নতুন বৈশিষ্ট্য ERDDAP™ v210](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx) 
*    [২০-০৫-১৯ ডিএমটি: তথ্যের স্তর](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)   (অথবা [ববের এই ভিডিওটা দেখ](https://www.youtube.com/watch?v=9ArYxgwON2k) . .) 
*    [২০১৯ IOODC: নতুন বৈশিষ্ট্য ERDDAP™ v2](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx) 
*    [১৮১৮ সামার ESIP: দুর্দশা ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx) 
*    [১৮১৮ সামার ESIP: JSON সমর্থন ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx) 
*    [২০১৮ ইডিএম: ওয়েব সার্ভিসের একটি যৌথ পদ্ধতি (দ্রুত, Esyser, কম খুলুন)   (অথবা, কেন আমি 4 বছর আগে সুখী ছিল.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx) 
*    [২০১৮ ইডিএম: ERDDAP™ ২০১৮ সালে](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx) 
*    [২০১৮ ই-মেইল: নতুন বৈশিষ্ট্য ERDDAP™ ছবি, অডিও, এবং ভিডিও তথ্য জন্য](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx) 
*    [২০১৮ ইডিএম: UAF এবং ERDDAP™ তথ্যের সমন্বয়](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx) 
*    [২০১৭ ইডিএম: দ্রুত ভূমিকা ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx) 
*    [২০১৭ ইডিএম এবং ২০১৭ IOOS: নতুন বা স্বল্প জানা ERDDAP™ IMAP-র বৈশিষ্ট্য (ব্যবহারকারীদের জন্য) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx) 
*    [২০১৭ ইডিএম এবং ২০১৭ IOOS: নতুন বা স্বল্প জানা ERDDAP™ IMAP-র বৈশিষ্ট্য (অ্যাডমিনিস্ট্রেটরর জন্য) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx) 
*    [২০১৭-এ: ইএমএল, কেএনবি এবং ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx) 
*    [২০১৭ EDM: উৎস থেকে ব্যবহারকারীদের তথ্য কীভাবে পাওয়া যায়? পুরনো স্কুল বনাম নতুন স্কুল](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx) 
*    [২০১৬ সামার ESIP: বিগ ছবি: PR, OPeNDAP '%s' ERDDAP™ যারা যাকাত দান করে থাকে](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx) 
*    [২০১৬ঃ এক সমাপ্ত](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx) 
*    [২০১৬ Gov API: পরবর্তী জেনারেশন তথ্য সার্ভার](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx) 
*    [২০১৫ সামার ESIP: ট্যাবলার প্রস্তাবিত](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx) 
*    [২০১৪ ইডিএম: ট্যাবলার ডাটার জন্য ববের ডোস এবং না](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx) 
*    [২০১৪ ইডিএম: আদর্শিক ব্যবহারকারী ইন্টারফেস](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx) 
*    [২০১৪ সামার ESIP: ট্যাবলার তথ্য](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx) 
*    [২০১৩: D-Situ এবং ট্যাবের ডাটা গ্রিডের মতো চুক্তি করবেন না](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html) 
*    [২০১৩ সালের EDM: আরো কম করে দেখুন](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt) 
*    [২০১২ ই-মেইল: উপাত্ত বিতরণ পদ্ধতির জন্য সহায়িকা](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt) 

অন্য মানুষের দ্বারা প্রদর্শিত উপস্থাপনা:

*    [গ্লোবাল ডাটা শেয়ারের জন্য একটি FAIRI ভিত্তিক টুল![ইউটিউব](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)   
গ্লোবাল ওশান পর্যবেক্ষণ সিস্টেমের কেভিন ও'ব্রাইন এর সৌজন্যে (GuOS) ওয়েবইনার / পর্যবেক্ষণ কেন্দ্র (অগ) সচেতন থাক&#33;
*    [আপনার নিজস্ব আবহাওয়া ব্যবহার করা NOAA ডাটা এবং জুপার নোটবই![ইউটিউব](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)   
ছবি ফিলিপ ফার্নান্দেজ-এর।
*    [OOI ব্যবহার করুন ERDDAP ![ইউটিউব](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)   
ছবি তুলেছেন রিচ সাইনেল, ২০১৮।
*    [এস- এস- আইName টেক ডিভেলপ: " ERDDAP হালকা কথা বলে![ইউটিউব](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)   
৮-মন্ধু আলোচনা করছেন আগ্রহী ব্যক্তিদের নিয়ে ERDDAP জেনিয়েভাদজিয়ান, জিম পটেরা, কনর ডেলেটি, কেভিন ও'ব্রান, জন কিরফ পেটিলো, চার্লস কার্ল্টন এবং এলি হান্টন ৩১ আগস্ট, ২০১৭ তারিখে এএসপি টেক ডাইভ হিসেবে উপস্থাপন করেন।
*    [ব্যবহার করা হচ্ছে ERDDAP™ ট্যাবলার উপাত্তের জন্য ব্যবহার![ইউটিউব](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)   
ছবি তুলেছেন রিচ সাইনেল, ২০১৫।
*    [ব্যবহৃত পরীক্ষা ERDDAP™ নীল কার্বন তথ্যের জন্য![ইউটিউব](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)   
ছবি তুলেছেন রিচ সাইনেল, ২০১৫।
*    [প্রেরক থেকে তথ্য ব্যবহার করা হচ্ছে ERDDAP™ এর মধ্যে NOAA `%s' GNOME সফ্টওয়্যার![ইউটিউব](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM) . .
এই ভিডিওতে, রিচ সাইনেল সমুদ্রের বর্তমান পূর্বাভাস থেকে তথ্য ডাউনলোড করুন ERDDAP™ সমুদ্রে বিষাক্ত বিষ ছড়িয়ে পড়ার যন্ত্র [ NOAA `%s' GNOME সফ্টওয়্যার](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)   (৫ মিনিটের মধ্যে&#33;) . . (ভিডিওর মধ্যে একটি ক্ষুদ্র সমস্যা: তথ্যাধিকার অনুসন্ধান করার সময়, অনুসন্ধানের ক্ষেত্রে ব্যবহার করা হবে না। এটা পুরোপুরি পরিষ্কার।) ছবি তুলেছেন রিচ সাইনেল, ৮ই এপ্রিল, ২০১১।
