---
title: "NCCSV 1.00"
---

# NC CSV-
একটিও নয়NetCDF- প্রবেশীয় ASCII CSV ফাইল,
সংস্করণ

বব সাইমনস এবং স্টিভ হ্যাঙ্কিন
বব সাইমন্স এবং স্টিভ হ্যাঙ্কিনের "এনসি CSস" লাইসেন্সের আওতায় ব্যবহৃত[সিসি বাই ৪.](https://creativecommons.org/licenses/by/4.0/)

## [ভূমিকা](#introduction) {#introduction} 

এই ডকুমেন্টটি একটি ASCII অক্ষরের বিন্যাসের যা সমস্ত তথ্য ধারণ করে (মিটা-ডাটা এবং তথ্য) যে একটি মধ্যে পাওয়া যাবেNetCDF .ncঅন্তর্ভুক্ত ফাইলটিতে একটি CSV-র ধরনের ফাইল আছে। ASCII CSV টেক্সট ফাইলের জন্য এই এক্সটেনশনটি ASCII অক্ষরের ফাইল। এই বৈশিষ্ট্যের সাহায্যে সহজে পড়া যাবে ও তখন মনে হয় যে, ASCII সংখ্যা এবং গুগল শিটের মত হতে পারে । বব সাইমন্স একজন NC CSV ফাইলকে একটি ফাইলে রূপান্তর করার সফটওয়্যার লিখতে হবেNetCDF-৩ (আর সম্ভবতNetCDF- ৪)  .ncকোনো তথ্য নেই। বব সাইমন্স পরিবর্তিত হয়েছে[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)এই ধরনের ফাইল পড়তে ও লেখা সমর্থন করতে।

এনসি CSV ফরম্যাটের ডিজাইন করা হয়েছে যাতে মাল্টিসেল এবং গুগল শিটস একটি NA CSV ফাইল ইম্পোর্ট করতে পারে, যেখানে স্প্রেডশীটের কোষগুলো সম্পাদনার জন্য সকল তথ্য আছে। অথবা, এনসিপিডের কনভেনশনের পর থেকে একটি স্প্রেডশীট তৈরি করা যাবে। স্প্রেডশীটের উৎস যাই হোক না কেন, যদি এটি একটি csv ফাইল হিসাবে রপ্তানি করা হয়, এটি এনসি CSV এর নির্ধারিত তথ্য এবং কোন তথ্য হারিয়ে যাবে। NC NC CSV ফাইল এবং অনোলোস স্প্রেডশীট ফাইলের মধ্যে যে পার্থক্য তা হলো:

* কমা চিহ্ন দ্বারা বিভাজিত করে একটি লাইন বিভাজন করে NCV মান উপেক্ষা করা হয়।
স্প্রেড-শিটের মধ্যে পার্শ্ববর্তী কোষগুলোর ক্ষেত্রে কোনো মান উপস্থিত নেই ।
* NC CSV ফাইলের স্ট্রিংগুলো প্রায়ই দুইবার উদ্ধৃতি দ্বারা পরিবেষ্টিত।
স্প্রেডশীটের স্ট্রিংগুলো কখনো দ্বৈত উক্তি দ্বারা পরিবেষ্টিত হয় না।
* অভ্যন্তরীণ উদ্ধৃতি ("") BC NC CSV ফাইলের স্ট্রিং হিসাবে 2 জোড়া উদ্ধৃতি হিসাবে চিহ্নিত করা হয়।
স্প্রেডশীটে অভ্যন্তরীণ দ্বৈত উদ্ধৃতি হিসাবে দেখা হয়েছে।

দেখুন[স্প্রেড-শিট](#spreadsheets)আরও তথ্যের জন্য নীচে দেওয়া হল।

### স্ট্রিম করার যোগ্য{#streamable} 
সাধারণ ফাইলের মত NCVA CSV ফাইল উপলব্ধ রয়েছে। তাই, যদি একটি তথ্য সার্ভার যেমন একটি তথ্য সার্ভার দ্বারা Nvod করা হয়[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)সার্ভার দ্বারা অনুরোধকৃত সমস্ত তথ্য একত্রিত হওয়ার পূর্বে অনুরোধকারীর তথ্য স্ট্রিম করতে পারবেন । ( হিতো.NetCDF( প্রকা.

### ERDDAP™ {#erddap} 
এই নির্ধারিত হয় তাই NC CSV ও ফাইল তৈরি করা হয়.ncযে কেউ একটি ফাইল থেকে তৈরি করা যাবে[ERDDAP™সার্ভার সংক্রান্ত তথ্য](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (মাধ্যমে[EDDT টেবিল AFON csv ফাইল](/docs/server-admin/datasets#eddtablefromnccsvfiles)এবং[EDDT টেবিলForc ফাইল](/docs/server-admin/datasets#eddtablefromncfiles)ডাটা টাইপ) বাতিলERDDAP. .ERDDAP™বেশ কয়েকটি আবশ্যক বিশ্ব বৈশিষ্ট্য রয়েছে এবং অনেক ক্ষেত্রে গ্লোবাল ভয়েসেস এবং ভেরিয়েবলের বৈশিষ্ট্যের ক্ষেত্রে সুপারিশ করা হয়েছে, বিশেষ করে সিএফ এবং এডি বৈশিষ্ট্য (দেখুন)
[/doc/server/s-server/data/config/data-s](/docs/server-admin/datasets#global-attributes)- হ্যা.

### ভারসাম্য{#balance} 
NCA CSV ফরম্যাটের ডিজাইন বেশ কিছু চাহিদার ভারসাম্য:

* ফাইলগুলির মধ্যে উপস্থিত সকল তথ্য ও মিটা-ডাটা তথ্য বিশিষ্ট একটি ট্যাবের মধ্যে উপস্থিত থাকা আবশ্যকNetCDFবিশেষ ধরনের তথ্য সহ ফাইল
* ফাইলটিতে পড়া হতে পারে এবং তারপর একটি স্প্রেডশীটের মধ্যে লেখা হবে যার কোনো তথ্য নেই ।
* মানুষের সৃষ্টি, সম্পাদনা এবং বোঝার জন্য ফাইল সহজে হতে হবে।
* কম্পিউটার প্রোগ্রাম দ্বারা সর্বাধিক যে ফাইলটি পার্স করা সম্ভব নয়।

এই দলিলে যদি কিছু প্রয়োজন বলে মনে হয়, তা হলে এই চাহিদাগুলো পূরণ করা প্রয়োজন ।

### অন্য পেইন{#other-specifications} 
এই নির্ধারিত মান দ্বারা অন্য কয়েকটি সুনির্দিষ্ট বর্ণনা ও লাইব্রেরীর উল্লেখ করে। এটি কাজ করার জন্য ব্যবহৃত হয় কিন্তু এই সুনির্দিষ্ট বিবরণের অংশ নয়, অথবা সেগুলির কোনো পরিবর্তন করার প্রয়োজন নেই। এই ধরনের কোনো মান নির্ধারিত না হলে, সংশ্লিষ্ট বর্ণনাটি দেখুন । লক্ষণীয় যে, এর মধ্যে রয়েছে:

* ডিসকভারিName (ACD) মিটা-ডাটা:
    [ https://wiki.esipfed.org/Attribute\\_Convention\\_for\\_Data\\_Discovery\\_1-3 ](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3). .
* জলবায়ু এবং পূর্বাভাস (সি. সি.) মিটা-ডাটা:
    [ https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). .
* এটাNetCDFঅন্যান্য ব্যবহারকারী (প্রয়োজনীয়) :
    [ https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html). .
* এটাNetCDFসফ্টওয়্যার লাইব্রেরিNetCDF-জাভা এবংNetCDF-c:
    [ https://www.unidata.ucar.edu/software/netcdf/ ](https://www.unidata.ucar.edu/software/netcdf/). . এই লাইব্রেরি দ্বারা NC CSV ফাইল পড়া সম্ভব নয়.ncNC CSV ফাইল থেকে ফাইল নির্মাণ করা হয়েছে।
* JSON:[ https://www.json.org/ ](https://www.json.org/)

### নয়{#notation} 
রং নির্ধারণ, বন্ধনী\\[ \\]- উল্লেখকৃত ঐচ্ছিক বস্তু।

## [ফাইল কাঠামো](#file-structure) {#file-structure} 

একটি সম্পূর্ণ NC CSV ফাইলের মধ্যে দুটি বিভাগ উপস্থিত রয়েছে: মিটা- ডাটা বিভাগ, এর পরবর্তী অংশ হল:

NC CSV ফাইল শুধুমাত্র ৭-বিট অক্ষর বিশিষ্ট হওয়া আবশ্যক। এই কারণে, ক্যারেক্টার-সেটের ক্ষেত্রে ব্যবহারযোগ্য ক্যারেক্টার- সেট ও এনকোডিং সহযোগে লেখা যাবে। সম্ভবত কোনো অক্ষরের ক্ষেত্রে অক্ষর অথবা এনকোডিং প্রয়োগ করা যাবে। উদাহরণ, ৭-বিট অক্ষরের ক্ষেত্রে এই বৈশিষ্ট্য প্রয়োগ করা হয়।ERDDAP™ISO-8859-1 বর্ণমালার মাধ্যমে NC CSV ফাইল পড়ুন ও লিখুন।

NC CSV ফাইল নির্বাচনের সময় সীমা ব্যবহার করা হবে (\\n)   (লিনাক্স এবং Mac OS X কম্পিউটারের মধ্যে যে মিল রয়েছে) গাড়ি রোলিট এবং নতুন লাইন (\\r\\n)   (Windows কম্পিউটারের মধ্যে যে সাধারণ তা) শেষ সীমা মার্কার হিসাবে, কিন্তু দুটোই নয়।

### .nccsvচিত্রটি ছাপা হোক এই প্রিন্টারে{#nccsvmetadata} 
যখন সৃষ্টিকর্তা এবং পাঠক উভয়ে এটা আশা করছেন, তখন তারা একই সাথে এটি আশা করছে এবং কখনো কখনো এটি সম্ভব হবে একটি NC CSV ফাইল তৈরির। (সহ\\*শেষ:\\*লাইন) . . ফলাফল ফাইলের বৈশিষ্ট্যের সম্পূর্ণ বর্ণনা, ভেরিয়েবল এবং উপাত্তের ধরন, অনুরূপ রূপে কাজ করার জন্য একই ধরনের.OPeNDAPসার্ভার।ERDDAP™আপনার অনুরোধ করলে এই মান ফিরিয়ে নেওয়া হবে ধরন.nccsvচিত্রটি ছাপা হোক এই প্রিন্টারেERDDAP™ডাটাসেট.

## [চিহ্নিত বস্তুটির বিন্যাস](#the-metadata-section) {#the-metadata-section} 

NC CSV ফাইলের মধ্যে প্রতিটি লাইন মিটা-লিস্ট, বিন্যাসের বিন্যাস ব্যবহার করা হয়
[ভেরিয়েবল নাম](#variablename)'%s'[বৈশিষ্ট্য নাম](#attributename)'%s'[মান](#value)\\[% 1 সেকেন্ড\\]\\[% 1 সেকেন্ড\\]\\[%s, সর্বমোট4\\]\\[...\\]  
স্প্রেড-শিট প্রোগ্রামের মধ্যে ফাইল ইম্পোর্ট করার সময় উদ্দিষ্ট সামগ্রী নির্বাচনের পূর্বে ও পরে ব্যবহারের অনুমতি প্রদান করা হবে না।

### সম্মেলনগুলো{#conventions} 
NC CSV ফাইলের প্রথম পংক্তি হল মিটা- ডাটা ফাইলের প্রথম লাইন, ও একটি আবশ্যক[\\*গ্লোলিন\\*](#global)সম্মেলনগুলোর বৈশিষ্ট্য
\\*গ্লোলিন\\*- ব্যাতিক্রম,"COARDS- CF-1, ACD--1.3, NC-25
কনসেন্ট তালিকাভুক্ত হওয়া একজন হতে হবে NC-1.0 ১, যার বর্তমান সংস্করণটিতে উল্লেখ করা হয়েছে ।

### শিক্ষা (_A){#end_metadata} 
NC NC CSV ফাইলের সমাপ্তির জন্য শুধুমাত্র একটি পংক্তি দ্বারা চিহ্নিত হওয়া আবশ্যক
\\*শেষ:\\*

এটির পরামর্শ ছাড়া, মিটা-ডাটা বিভাগে প্রদত্ত একটি ভেরিয়েবলের সকল বৈশিষ্ট্য উপস্থিত থাকা আবশ্যক নয়। যদি NC CSV ফাইল একটি ফাইলে রূপান্তর করা হয়NetCDFফাইল, মিটা-ডাটা বিভাগে প্রথমে যে ভেরিয়েবলগুলি দেখা যাবে তা এই ফাইলের মধ্যে উপস্থিত রয়েছেNetCDFফাইল.

প্রয়োজনে উপস্থিত পংক্তিতে ঐচ্ছিক রেখার পরিবর্তে মিটা-ডাটার ব্যবহার করা যাবে[\\*গ্লোলিন\\*](#global) [সম্মেলনগুলো](#conventions)তথ্য (নীচে) এবং শেষ রেখার আগে\\*শেষ:\\*. .

যদি একটি স্প্রেড-শিট একটি NCDO ফাইল থেকে তৈরি করা হয়, তাহলে মিটা- ডাটা বিভাগটি কলাম বি- র মধ্যে উপলব্ধ করা হবে ।

এই স্প্রেডশীট অনুসরণ করা হলে, একটি CSV ফাইল রূপে সংরক্ষণ করা হয়, বিশেষ অক্ষরের শেষে একাধিক পংক্তি চিহ্নিত করা হবে । যে সফটওয়্যারটি NC CSV ফাইল রূপান্তর করে.ncকমা চিহ্ন দ্বারা উপেক্ষা করা হবে।

### [ভেরিয়েবল নাম](#variablename) {#variablename} 

 *ভেরিয়েবল নাম* তথ্যের মধ্যে উপস্থিত ফাইলের নাম অত্যাধিক লম্বা ফাইলের নাম । সমস্ত ভেরিয়েবল ASCII অক্ষর বা ASCII অক্ষর দিয়ে শুরু হতে হবে এবং ৭-বিট অক্ষর, অকার্যকর এবং ৭-বিট ASCII সংখ্যা দিয়ে গঠিত হবে।
#### গ্লোলিন{#global} 
বিশেষ ভেরিয়েবলName[\\*গ্লোলিন\\*](#global)বৈশ্বিক মিটা-ডাটা চিহ্নিত করার জন্য ব্যবহৃত।

### [বৈশিষ্ট্য নাম](#attributename) {#attributename} 

 *বৈশিষ্ট্য নাম* ভেরিয়েবলের সাথে সুসংগত বৈশিষ্ট্যের মান হওয়া আবশ্যক[\\*গ্লোলিন\\*](#global). . সকল বৈশিষ্ট্য ASCII অক্ষর অথবা ASCII অক্ষর সহ আরম্ভ করা আবশ্যক।

#### চিন{#scalar} 
বিশেষ বৈশিষ্ট্য নাম\\*চিন\\*aribara তথ্য ভেরিয়েবল করার জন্য ব্যবহার করা যাবে। ডাটা টাইপ\\*চিন\\*ভেরিয়েবল- এর ধরন উল্লেখ করে, ফলে ভেরিয়েবলের ধরন নির্ধারণ করা হয় না\\*DATA_BAR_\\*slar ভেরিয়েবলের বৈশিষ্ট্য। উল্লেখ্য, NC CSV ফাইলের উপাত্তের মধ্যে পর্যাপ্ত তথ্য উপস্থিত নেই ।

উদাহরণস্বরূপ, "অকেনোস এক্সপ্লোরার" এবং একটি cfli\\ lical বৈশিষ্ট্যের মাধ্যমে "অকেনো এক্সপ্লোরার" নামের একটি স্ক্রিভার ভেরিয়েবল তৈরি করতে হবে:
জাহাজ,\\*চিন\\*"ওকেনোস এক্সপ্লোরার"
জাহাজ, cf\\_get_properties, propertition
যখন একটি arive তথ্য ভেরিয়েবল পড়া হয়ERDDAP™একটি সারির মধ্যে একই রঙের অপর একটি কলামের মধ্যে রূপান্তর করা হয়েছে।

### [মান](#value) {#value} 

 *মান* মিটা-ডাটা বৈশিষ্ট্যের মান ও একটি অ্যারের মধ্যে উপস্থিত থাকা আবশ্যক, এক অথবা একাধিক বাইট বিশিষ্ট একটি হওয়া আবশ্যক। অন্যান্য কোনো তথ্য সমর্থিত নয়। কোনো মান অন্তর্ভুক্ত করা হবে না একর বেশি সাব-মান রয়েছে যদি, উপ-value একই ধরনের তথ্য অবশ্যই হতে হবে এবং কমা দ্বারা পৃথক করা হবে:
sst'%s'actual\\_range;0.17f,২৩.
যদি একাধিক স্ট্রিং থাকে, তবে স্ট্রিং ব্যবহার করে একটি স্ট্রিং ব্যবহার করুন\\n  (নতুন পংক্তি) সাব-স্ট্রিং-র মধ্যে বিভাজন করা অক্ষরগুলি পৃথক করে।

বৈশিষ্ট্যের ধরন:

#### বাইট{#byte} 
* বাইটের বৈশিষ্ট্যের মান (৮-বিট, স্বাক্ষরিত) 'বি' দিয়ে অবশ্যই লেখা হবে, যেমন, 77b, 7b, 7b. বৈধ বাইটের সীমা হল - 3128. একটি বাইটের মতো অন্য একটি সংখ্যা বৈধ নয় (উদাহরণ, ১২৮বি) একটি বার্তা তৈরি করো
     
#### স্বল্প{#short} 
* বৈশিষ্ট্যের মান (১৬-বিট, স্বাক্ষর) চিহ্ন প্রতি লেখা আবশ্যক, উদাহরণ 'utplay', e -30000, 0, 30000,০০০, 30000,০০০. বৈধ স্বল্পতার সীমা হল - ৩২৬৮ সাল থেকে ৩২৬৭। একটি ছোট সংখ্যা যা একটি সংক্ষিপ্ত কিন্তু অকার্যকর (উদাহরণ, ৩২৭৬৮) একটি বার্তা তৈরি করো
     
#### পূর্ণসংখ্যা{#int} 
* মধ্যে রেখাঙ্কনের মান (৩২-বিট, স্বাক্ষর) অবশ্যই দশমিক পয়েন্ট ছাড়া JSON হিসেবে লিখতে হবে, কিন্তু 'আই', 'আই', প্রতি সেকেন্ডে 'আই. এই মূল্যবোধের সীমা হচ্ছে-২১৪৮৪৮৪৮৪৮,৪৮৪৮৪৮৪৪। একটি সংখ্যা যা একটি বিট কিন্তু অকার্যকর (উদাহরণ, ২১৪৮৪৮৪৮৪৮৪৮) একটি বার্তা তৈরি করো
     
#### দীর্ঘ{#long} 
* অ্যাট্রিবিউটের মান (৬৪-বিট, স্বাক্ষরিত ব্যবহারকারী ও %s দ্বারা সমর্থিতERDDAP™সমর্থিত নয়) দশমিক পয়েন্ট ছাড়া লেখা আবশ্যক এবং 'L', e. যেমন 3338888884644L, 0L,66667444LLL ফাইলের নাম পরিবর্তন করা হলে, একটি দীর্ঘ মাপের মান প্রতি NC CSV ফাইল পরিবর্তিত হবেNetCDF-৩ ফাইল, যে কোন লম্বা মানকে দ্বিগুণ মানের দিকে রূপান্তর করা হবে। বৈধ মূল্যবোধের পরিধি হলো-৯২৩৩৭৩৭৪৪৮৭৮০ থেকে ৯২,৩৩৭৩৩৭৭৭৭৭৭৭৭৭৭৭৭৭৭৭। একটি সংখ্যা যা অনেক দীর্ঘ কিন্তু অবৈধ (এম.জি, ৯২২৩৮৫৮৫৮৫৭৮০২) একটি বার্তা তৈরি করো
     
#### ভগ্নাংশ{#float} 
* ভগ্নাংশের বৈশিষ্ট্য (৩২-বিট) 'f' দিয়ে লিখতে হবে এবং হয়তো একটি দশমিক পয়েন্ট বা/অথবা/অথবা/বায়ল পয়েন্ট থাকতে পারে, যেমন ১. float NNE এর জন্য NNf ব্যবহার করা হবে (অনুপস্থিত) মান। প্রায় +/-3. (কে. ডি. ই. ১- টি গুরুত্বপূর্ণ সংখ্যা) . . যে সংখ্যক সংখ্যাকে float বলে মনে হচ্ছে, কিন্তু কোন অবৈধ (উদাহরণ, ১.) একটি বার্তা তৈরি করো
     
#### দ্বিগুণ{#double} 
* বৈশিষ্ট্যের মান (৬৪-বিট) 'প্রজেক্ট' দিয়ে লিখতে হবে এবং হয়তো একটি দশমিক পয়েন্ট বা/অথবা/অথবা/বাটিওল পয়েন্ট থাকতে পারে, dddd, 1.412d, 12222x+12d, 19312d, 1. দুই নাকের জন্য নাইন ব্যবহার করা হবে (অনুপস্থিত) মান। দ্বিগুণের সংখ্যা প্রায় +-১. ৭৯৭৯৩২৩৭০-৩৭০৭০+৮৮ডি। (কে. ডি. ই. ১ গুরুত্বপূর্ণ সংখ্যা) . . যে একটি সংখ্যাকে ডাবল বলে মনে হচ্ছে কিন্তু তা অবৈধ (উদাহরণ, ১.) একটি বার্তা তৈরি করো
     
#### স্ট্রিং{#string} 
* অ্যাট্রিবিউটের ক্ষেত্রে অপ্রত্যাশিত মান (আই., এম.Java) যে অক্ষর- ASCII অক্ষরে লেখা আবশ্যক, এই ধরনের ASCII অক্ষর ব্যবহার করা যাবে না।
    * দ্বিগুণ উদ্ধৃতি ("") দুটি উদ্ধৃতি হিসাবে অপরিবর্তিত থাকা আবশ্যক ("") . . 'csv' পড়ার সময় স্প্রেড-শিট প্রোগ্রাম এটাই প্রয়োজন। স্প্রেড-শিটের ফাইল সংরক্ষণ করার সময় স্প্রেডশীট প্রোগ্রাম এভাবেই লেখা হয়।
    * বিশেষ JSON ব্যাক- এন্ডের মধ্যে অনুমোদিত অক্ষর (সম্ভবত JSON রূপে এনকোড করা হয় না)\\n(নতুন পংক্তি, কিন্তু \\F (সম্মুখে), \\f, \\at (তা), \\at (রলি প্রাপ্ত) অথবা (রপেজ)[\\V *ও'হ* ](#uhhhh)বাক্যরীতি. একটি স্প্রেডশীটে, টেক্সট কক্ষের মধ্যে নতুন রেখা ব্যবহার করা হবে না; পরিবর্তে ব্যবহার করুন\\n  (২ অক্ষর: 'আ') নতুন লাইন নির্দেশ করার জন্য।
##### \\uhhhঘন্টা{#uhhhh} 
    * ফাইলের মধ্যে উপস্থিত সকল অক্ষর #৩২ অথবা তার চেয়ে বেশি অক্ষর বিশিষ্ট হওয়া উচিত নয় *ও'হ* যেখানে ওহ-হোহ'র ৪ সংখ্যা, অক্ষরের সংখ্যা। কোডের রেফারেন্সে দেখুন[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode)কোন নির্দিষ্ট অক্ষর অথবা সফটওয়্যার লাইব্রেরি ব্যবহার করে হেক্সাডেসিমাল সংখ্যা খুঁজে বের করুন।
    * পংক্তির প্রথম অথবা শেষ প্রান্তে যদি কোনো স্ট্রিং থাকে, বা যোগ করা হবে (অনুরূপ উদ্ধৃতি) কমা অথবা অন্য কোনো ধরনের বর্ণনা দ্বারা ব্যাখ্যা করা হয় (উদাহরণ, একট) অথবা “নরল” শব্দটি হচ্ছে, পুরো লাইনকে অবশ্যই দ্বৈত উক্তিতে আটকে থাকতে হবে; অন্যথায় এখানে দু'টি উল্লেখ করা উক্তি ঐচ্ছিক। আমরা সুপারিশ করছি: যখন সন্দেহের মধ্যে, পুরো লাইন দু'টি উক্তির মধ্যে পড়ে যাবে। প্রথম অথবা শেষে স্ট্রিংটি প্রবলভাবে নিরুৎসাহিত।
    * এখন পর্যন্ত, #২৫৫ এর থেকে বেশী অক্ষর ব্যবহার নিরুৎসাহিত। এনসি সমর্থিতদের সমর্থন করে।ERDDAP™অভ্যন্তরীণভাবে সমর্থন করে। কিছু আউটপুট ফাইল টাইপ সমর্থিত (জি,.jsonএবং.nccsv) . . কিন্তু অনেক আউটপুট ফাইলের ধরন তাদের সমর্থন করে না । যেমন,NetCDF- ৩-ডি ফাইল সমর্থন করে নাNetCDFবর্তমানে ব্যবহৃত ইউনিকোড অক্ষর ও সি-এফ-এর ক্ষেত্রে ১-ডি অক্ষরের ব্যবহার করা হয় নাNetCDFস্ট্রিং (উদাহরণ, UTF-8) . . এটা সম্ভবত সময় মত উন্নত হবে।
         
#### অক্ষর{#char} 
* বৈশিষ্ট্যের মান হিসাবে "%c" অক্ষরের ব্যবহার করা যাবে (আই., এম.Java) অক্ষর হিসেবে ৭-বিট অক্ষরের ব্যবহার করা যাবে, যা অন্য অক্ষর ব্যবহার করা যাবে (বিশেষ অক্ষরের এনকোডিংয়ের মধ্যে প্রাপ্ত পংক্তির বিন্যাসের নামের মধ্যে একটি পংক্তি দেখতে পারবেন 'আ') . . বৈশিষ্ট্যের মান একটি ট্যাগ বিনা দ্বন্দ্বে সুসংগত হওয়া আবশ্যক (ভেতরের উদ্ধৃতি) এবং দ্বৈত উদ্ধৃতি (বাইরের উদ্ধৃতি) "কে, "," (একটি অনুরূপ বন্ধনীচিহ্ন) "অভিযান" (একটি উদ্ধৃতিচিহ্ন যোগ করো) "" (একটি ট্যাব-এ স্থানান্তর করুন) - "\\u20A" (একটি ইউরো অক্ষর) . . একটি একক এবং দ্বৈত উক্তি ব্যবহার করে এই পদ্ধতিটি অদ্ভুত এবং বেশ কিছু লোক, কিন্তু এটা এমন এক উপায়, যেগুলোকে স্প্রেডশীটের সঙ্গে কাজ করে থাকে। ের মান 0 (% 1) ধার্য করা হলেও একটি অক্ষর বিশিষ্ট ফলাফল বৈধ নয় । স্ট্রিং হিসাবে, #২৫৫ এর থেকে বেশি অক্ষর ব্যবহৃত অক্ষরগুলি বর্তমানে নিরুৎসাহিত।

### সাফিক্স{#suffix} 
উল্লেখ্য, NC CSV ফাইলের মধ্যে উপস্থিত সকল বৈশিষ্ট্যের মান দ্বারা চিহ্নিত হওয়া আবশ্যক (উদাহরণ, জি.) সংখ্যাসূচক ডাটা নির্দেশকের ধরন (eg, বাইট) . . কিন্তু NC CSV ফাইলের উপাত্তের মধ্যে উপস্থিত সংখ্যা, সংখ্যাসূচক তথ্য অবশ্যই লিখতে হবে না (দীর্ঘ সংখ্যার জন্য 'L' এর ব্যতিক্রম) তথ্য উল্লিখিত হয়েছে\\*DATA_BAR_\\*ভেরিয়েবলটার বৈশিষ্ট্য।

#### DATAপি (_a){#data_type} 
প্রতিটি বস্তুর জন্য ডাটা টাইপ[পাতন](#scalar)উল্লেখ করার জন্য একটি ভেরিয়েবল নির্ধারণ করা আবশ্যক\\*DATA_BAR_\\*বৈশিষ্ট্যের মান; বাইট, স্বল্প, লম্বা, float, ডাবল, পংক্তি অথবা অক্ষর (হরফের ছাঁদ সম্পর্কে সচেতন) . . যেমন,
qc\\_ যুক্তি\\*DATA_BAR_\\*এম- বি
সতর্কবার্তা: ডানদিকে বোধগম্য নয়\\*DATA_BAR_\\*তোমার দায়িত্ব. ভুল তথ্যের ধরন নির্ধারণ করা হচ্ছে (উদাহরণের সাহায্যে চিহ্নিতকরণের সময়, ত্রুটিবিহীন) কোনো প্রাপক উল্লেখ না করার দরুন এই বার্তাটি প্রেরণ করা সম্ভব হয়নি এবং একটি ত্রুটির বার্তা নির্বাচন করুন (উদাহরণ, float মান পুনরায় নির্ধারণ করা হবে) যখন NC CSV ফাইল পড়া হয়ERDDAP™নতুন করেতে রূপান্তর করা হয়েছেNetCDFফাইল.

### আপনি কীভাবে উত্তর দেবেন?{#char-discouraged} 
অক্ষরের তথ্যের ব্যবহার সুদৃঢ় নয় কারণ অন্যান্য ধরনের ফাইলের মধ্যে এই বৈশিষ্ট্য সমর্থিত হয় না । তথ্যকে স্ট্রিং হিসেবে লেখা যাবে নাকি স্ট্রিং হিসাবে লেখা যাবে (উল্লেখযোগ্য নয়, যদি আপনি একটি বিশেষ অক্ষর লিখতে চান) . . যদি স্ট্রিংটি পাওয়া যায়, তবে পংক্তির প্রথম অক্ষর হিসাবে ব্যবহৃত হবে । শূন্যের দৈর্ঘ্য ও অনুপস্থিত মান অত্যাধিক লম্বা হলে কি-র পরিবর্তে পংক্তিতে রূপান্তর করা হবে। নোট যেNetCDFশুধুমাত্র একটি বাইট অক্ষর বিশিষ্ট ফাইল সমর্থন করে, সুতরাং অক্ষর হিসাবে অক্ষরের এর চেয়ে বড় অক্ষর পরিবর্তিত হবে, লেখার সময়?NetCDFফাইল একটি নতুন বর্ণমালা উল্লেখ করার জন্য ব্যবহার করা হলে যে বর্ণমালা ব্যবহার করা হবে তার একটি ভিন্ন বর্ণমালা উল্লেখ করা হবে ।

### দীর্ঘ আশা{#long-discouraged} 
ফাইলের অনেক ধরন (জি,NetCDF- ৪ এবং জেসন) এবংERDDAP™দীর্ঘ মাপের তথ্যের পরিমাণ, NC CSV'র ক্ষেত্রে দীর্ঘ তথ্য ব্যবহার হ্রাস করা হবে না এবং এটি বর্তমানে এক্সel, CF ওF-র সমর্থন দ্বারা সমর্থিত নয়NetCDF- ৩ ফাইল। NC CSV ফাইলের মধ্যে দীর্ঘ সময়ব্যাপী তথ্য উল্লেখ করতে হলে তা নির্ধারণ করা যাবে (অথবা সংশ্লিষ্ট এক্সিল স্প্রেডশীট) আপনি অবশ্যই 'L' ব্যবহার করতে হবে যাতে এক্সলকেল সংখ্যাসূচক সংখ্যাকে ওয়াই- অক্ষীয় সীমার সঙ্গে ব্যবহার না করে । বর্তমানে, যদি NC CSV ফাইল রূপান্তর করা হয়NetCDF-৩.ncফাইলের মান অত্যাধিক বড় মান বিশিষ্ট রূপান্তর করা হবে ও অত্যাধিক বড় মান বিশিষ্ট মান বিশিষ্ট হওয়া আবশ্যক (এর চেয়ে ছোট - বা বড়) . .

### CF, ACDD, এবংERDDAP™চিত্রটি ছাপা হোক এই প্রিন্টারে{#cf-acdd-and-erddap-metadata} 
যেহেতু এটা কল্পনা করা হয় যে অধিকাংশ NC CSV ফাইল বা ফাইল.ncতাদেরকে তৈরি করা হয়েছে, তাদেরকে পড়া হবেERDDAPআবশ্যক বৈশিষ্ট্য বিশিষ্ট মিটা-ডাটা ফাইলের মধ্যে এটি উপস্থিত রয়েছে অথবা সুপারিশ করার প্রণালীERDDAP™(বড় করে দেখুন)
[/doc/server/s-server/data/config/data-s](/docs/server-admin/datasets#global-attributes)- হ্যা. এই বৈশিষ্ট্য প্রায় সিএফ এবং ACD মিটা-ডাটা মান থেকে প্রায় সব ধরনের (কে, কি, কখন, কোথায়, কেন, কিভাবে) এমন কেউ যে ডাটাসেট সম্পর্কে কিছুই জানে না। বিশেষ গুরুত্বের সাথে, প্রায় প্রতিটি সংখ্যার একটি একক ভেরিয়েবল থাকা উচিতUDUNITS- ভালোভাবে বর্ণনা, যেমন,
sstসক্রিয়, অগ্রাহ্য করা হবে (_C)\t

CF বা ACDD মান থেকে নয় এমন অতিরিক্ত বৈশিষ্ট্য অন্তর্ভুক্ত করা যেতে পারেERDDAP. .

## [তথ্যের বিভাগ](#the-data-section) {#the-data-section} 

### [কাঠামো](#structure) {#structure} 

তথ্য বিভাগের প্রথম লাইন, কমা চিহ্ন দ্বারা বিভাজিত হওয়া আবশ্যক। এই তালিকার মধ্যে উপস্থিত সকল ভেরিয়েবলের মান মিটা-ডাটা বিভাগে, এবং বিপরীত দিশায় ব্যাখ্যা করা আবশ্যক (অন্য[\\*গ্লোলিন\\*](#global)বৈশিষ্ট্য ও বৈশিষ্ট্য[\\*চিন\\*](#scalar)ভেরিয়েবল) . .

তথ্য বিভাগের পেনটি কমেন্টের পংক্তির দ্বিতীয় অংশ, কমা চিহ্ন দ্বারা বিভাজিত হওয়া আবশ্যক। কমা চিহ্ন দ্বারা বিভাজিত করে একাধিক রঙের সংখ্যা উল্লেখ করার জন্য এই মান প্রয়োগ করা আবশ্যক। বিপরীত দিশায়, স্প্রেডশীট প্রোগ্রামের মধ্যে ফাইল ইম্পোর্ট করার সময় কিছু সমস্যার সৃষ্টি হওয়ার সম্ভাবনা রয়েছে বলে গণ্য করা হয় না । এই বিভাগে প্রতিটি কলামের জন্য শুধুমাত্র মান উপস্থিত থাকা আবশ্যক\\*DATA_BAR_\\*উল্লিখিত ভেরিয়েবল সহযোগে প্রাপ্ত\\*DATA_BAR_\\*এটার জন্য দায়ী। বৈশিষ্ট্য বিভাগে নয়, তথ্য বিভাগে সংখ্যাসূচক সংখ্যার মধ্যে উপস্থিত থাকা আবশ্যক। ডেটা টাইপ করার জন্য কোনো অক্ষরের ধরন উল্লেখ করার প্রয়োজন নেই। বৈশিষ্ট্য বিভাগে এর বিপরীতে, তথ্য বিভাগে অক্ষরের মান হয়ত একক উদ্ধৃতি বাদ দিতে পারে, যদি তাদের অবিন্যস্ততার প্রয়োজন না হয়। (এইভাবে, ',' ও '\\'-র ক্ষেত্রে এইখানে উল্লেখ করা আবশ্যক) . . একটি NC CSS ফাইলের মধ্যে এই সংখ্যক তথ্য উপস্থিত রয়েছেERDDAP™২ বিলিয়ন সারি নিয়ে এনসি CSV ফাইল পড়তে পারে। সাধারণ ভাবে বলা যায় যে আপনি একাধিক NCBV ডাটা ফাইলের মধ্যে বিভক্ত করেছেন যেখানে প্রতি ১০ মিলিয়ন সারি রয়েছে।

#### সমাপ্তি তথ্য{#end-data} 
তথ্যের সমাপ্তিগুলি শুধুমাত্র একটি রেখার সাথে প্রয়োগ করা আবশ্যক
\\*শেষ করা হবে (_a)\\*

ফাইলের শেষে যদি অতিরিক্ত তথ্য উপস্থিত থাকে\\*শেষ করা হবে (_a)\\*লাইন, যখন NC CSV ফাইল রূপান্তর করার সময় এটি উপেক্ষা করা হবে.ncফাইল. ( ২ তীম.

এই সম্মেলনগুলোর পর, ভেরিয়েবলের নাম ও তথ্যকে একাধিক কলামের মধ্যে অন্তর্ভুক্ত করা হবে । নীচে দেওয়া উদাহরণটি দেখুন ।

### [অনুপস্থিত মান](#missing-values) {#missing-values} 

সংখ্যাসূচক চিহ্নের ক্ষেত্রে সংখ্যাসূচক মান অনুপস্থিতmissing\\_valueএই ভেরিয়েবলের মান অথবা &#33; বৈশিষ্ট্যের মান । উদাহরণস্বরূপ, এই তথ্য সারিতে দ্বিতীয় মান দেখুন:
বেল এম.
বাইট, স্বল্প ও লম্বা ভেরিয়েবলের ক্ষেত্রে হারিয়ে যাওয়ার সম্ভাবনা রয়েছে।

নীল অথবা ডাবল NN মান ননিক হিসেবে লেখা যেতে পারে। উদাহরণস্বরূপ, এই তথ্য সারিতে দ্বিতীয় মান দেখুন:
বেল এম. শিাদা, নান, ১২৩৪

লাইন ও সংখ্যা কোনো ফাঁকা ক্ষেত্র উল্লেখ করা নেই। উদাহরণস্বরূপ, এই তথ্য সারিতে দ্বিতীয় মান দেখুন:
বেল এম. শিাদা, ১২৩৪

বাইট, সংক্ষিপ্ত ও লম্বা ভেরিয়েবল, created পরিবর্তক ও packagevina ব্যবস্থাERDDAP™তথ্যের উপরি চিহ্নের সর্বাধিক যে সংখ্যক ক্ষেত্রে ফাঁকা মান ধার্য করা হবে (উদাহরণ, 1. 27 বাইটের জন্য 31) . . যদি আপনি এটা করেন, তবে যোগ করার জন্য নিশ্চিত হোনmissing\\_value\\ t\\ t এই মানকে সনাক্ত করতে হলে যে ভেরিয়েবলটি ব্যবহার করা হবে তার মান । উদাহরণের ক্ষেত্রে এই মান প্রয়োগ করুন ।
 *ভেরিয়েবল নাম* প্রদর্শন করুন (_o)
float ও দ্বৈত ভেরিয়েবলের জন্য, একটি ফাঁকা ক্ষেত্র NN হতে হবে।

### [পূর্বাহ্ন মান](#datetime-values) {#datetime-values} 

বিবৃতি: (_D) (তারিখের মান নির্ধারণের সময় নাই) NC CSV ফাইলের মধ্যে অন্তর্ভুক্তগুলির বিন্যাস অথবা পংক্তি রূপে চিহ্নিত করা যাবে। একটি প্রদত্ত তারিখের ভেরিয়েবল শুধুমাত্র স্ট্রিং অথবা শুধুমাত্র সংখ্যা উল্লেখ করা আবশ্যক। NC CSV সফটওয়্যার দ্বারা তারিখের সময় স্ট্রিং পরিবর্তন করা হবে ফাইল পরিবর্তনের সময়.ncফাইল (CF এর প্রয়োজন অনুসারে) . . কীভাবে আমরা তা করতে পারি?

আর্গুমেন্টের মান নির্ধারণের জন্য চিহ্নিতকরণের মান বৈধ নয় *একক* থেকে *তারিখ সময়* "CF"-র ক্ষেত্রে আবশ্যকUDUNITSআর.
সময়, ১৯৭০ থেকে ০০:০০: ০০

স্ট্রিং হিসেবে ডোমেইনের মান আবশ্যক\\*DATA_BAR_\\*বৈশিষ্ট্য নির্ধারণ এবং একটি ইউনিট উল্লেখ করুন বিন্যাস অনুযায়ী উল্লিখিত বিন্যাসJavaপূর্বাহ্ন বিন্যাসের ক্লাস
 ([ https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html ](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)) . . যেমন,
সময়, যোগদান,yyyy-MM-dd'HHH:mmZ':
একটি ডাটা ভেরিয়েবল- এর জন্য সব তারিখের মান এক হতে হবে ।
অধিকাংশ ক্ষেত্রে, সময় বিন্যাসের যে বিন্যাস ব্যবহৃত হবে, তা এই বিন্যাসের সাথে মিলে যায়:

*   yyyy-MM-dd'H':mms. SSSZ — ISO 8601:4 (ই-মেইল) তারিখ সময় বিন্যাস আপনি হয়ত এর একটি সংক্ষিপ্ত সংস্করণ প্রয়োজন, উদাহরণ,yyyy-MM-dd'HHH:mmZ': (শুধুমাত্র ফরম্যাটের তথ্য প্রদর্শনের বিন্যাস) অথবাyyyy-MM-dd. . তারিখের বিন্যাস পরিবর্তন হলে NCTE CSV বিন্যাস পরিবর্তন করা হবে (হয়তো কম গুরুত্বপূর্ণ) . . যে বিন্যাসERDDAP™এটি যখন NC CSV ফাইল লেখা হবে তখন ব্যবহার করা হবে।
* yiymmHmms.S. এস. - যেটি ISO 861 এর সংক্ষিপ্ত সংস্করণ সময় বিন্যাস এর একটি সংক্ষিপ্ত সংস্করণ লাগবে, যেমন, ইইইইমুএমড।
* মিটার/ কিংবায় হুম। এসএসএস (এসএসএসএস)- যা যুক্তরাষ্ট্রের ধারার তারিখ এবং তারিখ নির্ধারণ করে, যেমন "৩/২৩/২০১৬:২২:০৩. আপনার হয়ত এর একটি সংক্ষিপ্ত সংস্করণ প্রয়োজন, যেমন, এম.
* YeyeyDHmmsSSSS — যে বছরটি ছিল বছর আর বছরের শূন্য-পান্ড দিন (উদাহরণ, ০০১ = জানুয়ারি ১, ৩৬৫= ৩১, একটি নন-আটম্বী বছরে; কখনো কখনো এটাকে জুলিয়ান তারিখ বলে) . . আপনি হয়ত এর একটি সংক্ষিপ্ত সংস্করণ, যেমন, ইইইইইডি.

#### দশমিক{#precision} 
যখন একটি সফটওয়্যার লাইব্রেরীতে রুপান্তর করা হয়.ncNC CSV ফাইলের মধ্যে ফাইল নির্মাণ করা হবে আই.এস.ও. - এর সঙ্গে পংক্তি হিসেবে প্রদর্শন করা হবে । (ই-মেইল) তারিখ সময় বিন্যাস, উদাহরণ, ১৯৭০:০০:০০. আপনি সঙ্গে স্পষ্ট নিয়ন্ত্রণ করতে পারেনERDDAP- নির্দিষ্ট বৈশিষ্ট্যtime\\_precision. . দেখুন
[/doc/server/server/data/config/data-s #time\\_precision](/docs/server-admin/datasets#time_precision). .

#### সময়ের অঞ্চল{#time-zone} 
তারিখের ডিফল্ট সময়ের অঞ্চল সময়-অঞ্চল (_Z)Zulu  (বারাকাটা) সময় যে, দিনের আলোর সময় অতিক্রান্ত হয়নি। সময় অঞ্চল থেকে একটি তারিখের মান নির্ধারণ করুনERDDAP- নির্দিষ্ট বৈশিষ্ট্যtime\\_zone. . এটা একটা চাহিদাERDDAP™(বড় করে দেখুন)
[/doc/server/server/data/config/data-s #time\\_zone](/docs/server-admin/datasets#time_zone)- হ্যা.

### [ডিসপ্লে মান](#degree-values) {#degree-values} 

আবশ্যকরূপে, সকল ডিগ্রি মান (উদাহরণ, দ্রাঘিমাংশ ও অক্ষাংশের জন্য) কোণের মান 0.0 হিসাবে ধার্য হওয়া আবশ্যক, ডিগ্রি ডিগ্রির মান হিসাবে নির্ধারিত হওয়া আবশ্যক। সংকেত নির্মাতা এন. পশ্চিম দ্রাঘিমাংশ ও দক্ষিণ অক্ষাংশের জন্য নেতিবাচক মান ব্যবহার করুন।

## [ডি. এস. জি. বৈশিষ্ট্য](#dsg-feature-types) {#dsg-feature-types} 

NCVA CSS ফাইলের মধ্যে CPLIOC দ্বারা প্রতিস্থাপন করা সম্ভব হবে
 ([ https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) তথ্য. এটি হচ্ছে এমন একটি বৈশিষ্ট্য যা এই কাজটি করতে পারে:

1. CF ফাইলের প্রয়োজন অনুসারে, NCRA CSV শ্রেণীতে একটি লাইন অন্তর্ভুক্ত করা আবশ্যক[\\*গ্লোলিন\\*](#global) featureTypeবৈশিষ্ট্য, উদাহরণ,
    \\*গ্লোলিন\\*'%s'featureTypeঅবচিত
2. ব্যবহারের জন্য চিহ্নিত হোস্টERDDAP™NC CSV ফাইল অন্তর্ভুক্ত করতে হলে মিটা- ডাটা বিভাগে একটি লাইন অথবা লাইন অন্তর্ভুক্ত করা আবশ্যক। Comment
জাহাজ, cf\\_get_properties, propertition
সিএফ-এর জন্য এটি ঐচ্ছিক, কিন্তু এনসিএডির প্রয়োজন।
3. ব্যবহারের জন্য চিহ্নিত হোস্টERDDAP™NC CSV ফাইল অন্তর্ভুক্ত করা আবশ্যক মিটা- বিভাগে একটি লাইন অথবা পংক্তি অন্তর্ভুক্ত করা হবে, যে সব সময়ে ভেরিয়েবলের সঙ্গে যুক্ত থাকে, acquotation, অথবা প্রোফাইল আবশ্যকERDDAP™(বড় করে দেখুন)
    [doc_server/server/apps/data/config/data_config/data_data_dirs\\cd_config/data_dirs)](/docs/server-admin/datasets#cdm_data_type)আর...
    \\*গ্লোলিন\\*নিষ্ক্রিয় (_c)\tInknown_jound
অথবা
    \\*গ্লোলিন\\*Acdm_times\\ t\\ tপ্রতিরোধ,\\ tস্টাইল, ল্যাডাল, ল্যাঁচ, ল্যাড, ল্যাম, ল্যাড”

## [নমুনা ফাইল](#sample-file) {#sample-file} 

এখানে একটি নমুনা ফাইল রয়েছে যা NC CSV ফাইলের অনেক বৈশিষ্ট্য প্রদর্শন করে:
```
\\*GLOBAL\\*,Conventions,"COARDS, CF-1.6, ACDD-1.3, NCCSV-1.0"
\\*GLOBAL\\*,cdm\\_trajectory\\_variables,"ship"
\\*GLOBAL\\*,creator\\_email,erd.data@noaa.gov
\\*GLOBAL\\*,creator\\_name,Bob Simons
\\*GLOBAL\\*,creator\\_type,person
\\*GLOBAL\\*,creator\\_url,https://www.pfeg.noaa.gov
\\*GLOBAL\\*,featureType,trajectory
\\*GLOBAL\\*,infoUrl,https://erddap.github.io/docs/user/nccsv-1.00
\\*GLOBAL\\*,institution,"NOAA NMFS SWFSC ERD, NOAA PMEL"
\\*GLOBAL\\*,license,"""NCCSV Demonstration"" by Bob Simons and Steve Hankin is
    licensed under CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ ."
\\*GLOBAL\\*,keywords,"NOAA, sea, ship, sst, surface, temperature, trajectory"
\\*GLOBAL\\*,standard\\_name\\_vocabulary,CF Standard Name Table v55
\\*GLOBAL\\*,subsetVariables,"ship"
\\*GLOBAL\\*,summary,"This is a paragraph or two describing the dataset."
\\*GLOBAL\\*,title,"NCCSV Demonstration"
ship,\\*DATA\\_TYPE\\*,String
ship,cf\\_role,trajectory\\_id
time,\\*DATA\\_TYPE\\*,String
time,standard\\_name,time
time,units,"yyyy-MM-dd'T'HH:mm:ssZ"
lat,\\*DATA\\_TYPE\\*,double
lat,units,degrees\\_north
lon,\\*DATA\\_TYPE\\*,double
"lon","units","degrees\\_east"
status,\\*DATA\\_TYPE\\*,char
status,comment,"From http://some.url.gov/someProjectDocument , Table C"
testLong,\\*DATA\\_TYPE\\*,long
testLong,units,1
sst,\\*DATA\\_TYPE\\*,float
sst,standard\\_name,sea\\_surface\\_temperature
sst,actual\\_range,0.17f,23.58f
sst,units,degree\\_C
sst,missing\\_value,99f
sst,testBytes,-128b,0b,127b
sst,testShorts,-32768s,0s,32767s
sst,testInts,-2147483648i,0i,2147483647i
sst,testLongs,-9223372036854775808L,0L,9223372036854775807L
sst,testFloats,-3.40282347e38f,0f,3.40282347E+38f
sst,testDoubles,-1.79769313486231570e308d,0d,1.79769313486231570E+308d
sst,testChars,"','","'""'","'\\u20AC'"
sst,testStrings," a~,\\n'z""\\u20AC"

\\*END\\_METADATA\\*
ship,time,lat,lon,status,testLong,sst
Bell M. Shimada,2017-03-23T00:45:00Z,28.0002,-130.2576,A,-9223372036854775808L,10.9
Bell M. Shimada,2017-03-23T01:45:00Z,28.0003,-130.3472,\\u20AC,-1234567890123456L,
"Bell M. Shimada","2017-03-23T02:45:00Z",28.0001,-130.4305,"'\\t'",0L,10.7
Bell M. Shimada,2017-03-23T12:45:00Z,27.9998,-131.5578,"'""'",1234567890123456L,99
Bell M. Shimada,2017-03-23T21:45:00Z,28.0003,-132.0014,\\u00fc,9223372036854775806L,10.0
Bell M. Shimada,2017-03-23T23:45:00Z,28.0002,-132.1591,,NaN
```
উল্লেখ্য:

* নমুনা ফাইলের মধ্যে অনেক কঠিন ফাইল উপস্থিত রয়েছে (উদাহরণ, অক্ষর এবং লম্বা পংক্তি) . . বেশিরভাগ এনসি CSV ফাইল সহজ হবে।
* লাইসেন্স লাইন এখানে দুই লাইনে ভাঙ্গা হয়েছে, কিন্তু নমুনা ফাইলের একটি লাইন মাত্র।
* \\u20AC ইউরো অক্ষর এবং \\00FC এর এনকোডিং হল 'মুর'।
* অনেক উদাহরণ হিসেবে বলা যায়, দ্বৈত উদ্ধৃতি দিয়ে এই দুটি উক্তি করা হয়েছে, যদিও সেগুলো হতে পারে না। যেমন, এর শিরোনাম, লিন ইউনিট বৈশিষ্ট্য, এবং তথ্যের তৃতীয়তম লাইন।
* এটা আরও পরিষ্কার এবং আরও ভাল হবে যদি পরীক্ষাগারের জন্য একক বৈশিষ্ট্য দুই উদ্ধৃতিতে লেখা হয় এটি একটি স্ট্রিং মূল্য। কিন্তু বর্তমান উপস্থাপনা (১, উদ্ধৃতি ছাড়া) স্ট্রিং হিসাবে সংজ্ঞায়িত করা হবে, পূর্ণসংখ্যা নয়, কারণ 'i' অনুপস্থিত ।
* তথ্যের মধ্যে উপস্থিত অন্যান্য তথ্যের পরিমাণ, তথ্যের বিভাগের মধ্যে উপস্থিত লম্বা মান রয়েছে ('L') স্ক্রোল-বারীয় তথ্য সনাক্ত করতে ব্যবহৃত হয়। এতে স্প্রেডশীটগুলোকে ভাসমান বিন্দুর সংখ্যা হিসাবে ব্যাখ্যা না করতে হবে এবং এর ফলে স্পষ্টতা হারিয়ে যেতে পারে।

## [স্প্রেডশীট সমূহ](#spreadsheets) {#spreadsheets} 

একটি স্প্রেডশীটে, এনসি CSV ফাইলের মতো:

* NC CSV ফাইলের জন্য উল্লিখিত মান নির্ধারণ করুন (উদাহরণ, অপ্রত্যাশিত অক্ষরসহ চিহ্ন (যেমন ',', 'f', 'f', 'f', & ধরন) . .
* পংক্তিতে, ASCII অক্ষর #৩২ বা তার চেয়েও বড় অক্ষরগুলো অক্ষরগুলো লিখুন, সাধারণত একটি JSON অক্ষরের অনুরূপ (জি,\\nনতুন পংক্তি নির্মাণের জন্য) হেক্সাডেসিমাল অক্ষর হিসেবে প্রত্যাশিত (হরফের ছাঁদ সম্পর্কে সচেতন) বাক্যরীতি হাইলাইট করুন[\\V *ও'হ* ](#uhhhh)  (উদাহরণ, ইউরো চিহ্নের জন্য \\u20ACTE,) . . ব্যবহার\\n  (২ অক্ষর: 'আ') নতুন লাইন নির্দেশ করতে, Alt-র ক্ষেত্রে প্রযোজ্য নয়।

NC NC CSVs ফাইল এবং অনোলোস স্প্রেডশীটের মধ্যে যে পার্থক্য তা হলো:

* কমা চিহ্ন দ্বারা বিভাজিত করে একটি লাইন বিভাজন করে NCV মান উপেক্ষা করা হয়।
স্প্রেড-শিটের মধ্যে পার্শ্ববর্তী কোষগুলোর ক্ষেত্রে কোনো মান উপস্থিত নেই ।
* NC CSV ফাইলের স্ট্রিংগুলো প্রায়ই দুইবার উদ্ধৃতি দ্বারা পরিবেষ্টিত।
স্প্রেডশীটের স্ট্রিংগুলো কখনো দ্বৈত উক্তি দ্বারা পরিবেষ্টিত হয় না।
* অভ্যন্তরীণ উদ্ধৃতি ("") BC NC CSV ফাইলের স্ট্রিং হিসাবে 2 জোড়া উদ্ধৃতি হিসাবে চিহ্নিত করা হয়।
স্প্রেডশীটে অভ্যন্তরীণ দ্বৈত উদ্ধৃতি হিসাবে দেখা হয়েছে।

এই স্প্রেডশীট অনুসরণ করা হলে, একটি CSV ফাইল রূপে সংরক্ষণ করা হয়, একাধিক পংক্তির শেষে প্রায়ই অতিরিক্ত পংক্তি চিহ্নিত করা হবে । যে সফটওয়্যারটি NC CSV ফাইল রূপান্তর করে.ncকমা চিহ্ন দ্বারা উপেক্ষা করা হবে।

### [এক্স- বি- এমName](#excel) {#excel} 

সংরক্ষণ করার উদ্দেশ্যে NCVA CSS-র একটি ফাইল ইম্পোর্ট করুন:

1. ফাইল খোলো
2. টেক্সট ফাইলের ধরন পরিবর্তন করুন (\\*মহান;\\*..gtx;*.csv) . .
3. NC Filecd দ্বারা অনুসন্ধান ও কর্ম সংক্রান্ত পূর্ববর্তী তথ্য ক্লিক করুন।
4. ক্লিক করে খুলুন ।

এক্সক্রিল্‌ল স্প্রেডশীটের একটি NC CSV ফাইল তৈরি করতে:

1. ফাইল সংরক্ষণ করো
2. প্রকার হিসাবে সংরক্ষণ করো: (কমাচিহ্ন দ্বারা বিভক্ত)   (\tcsv) . .
3. পূর্ব সতর্কবার্তার প্রতি সাড়া দিতে, হ্যাঁ ক্লিক করুন।
4. ফলাফল csv ফাইলের শেষে উপস্থিত সকল সারির তালিকা থেকে অতিরিক্ত পংক্তি চিহ্নিত হবে । তুমি তাদের উপেক্ষা করতে পারো।

এক্স্টেল, synectory Navde ফাইলের অনুরূপ

![png.png.png](/img/sampleExcel.png)

### [গুগল শিটComment](#google-sheets) {#google-sheets} 

গুগল শিটে একটি NC CSV ফাইল ইম্পোর্ট করতে:

1. ফাইল খোলো
2. আপনার কম্পিউটার থেকে একটি ফাইল আপলোড করতে এবং ফাইলে ক্লিক করুন ফাইলটি বেছে নিন, তারপর 'বাতিল' চাপুন ।
      
অথবা, আমার ড্রাইভ নির্বাচন করে ফাইল নির্বাচন করুন ও সব ফাইল নির্বাচন বাতিল করুন । ফাইলটি বেছে নিন, তারপর 'বাতিল' চাপুন ।

গুগল শিটস স্প্রেডশীট থেকে এন এনসি এডিড ফাইল তৈরি করার জন্য:

1. ফাইল সংরক্ষণ করো
2. প্রকার হিসাবে সংরক্ষণ করো: (কমাচিহ্ন দ্বারা বিভক্ত)   (\tcsv) . .
3. পূর্ব সতর্কবার্তার প্রতি সাড়া দিতে, হ্যাঁ ক্লিক করুন।
4. ফলাফল csv ফাইলের শেষে উপস্থিত সকল সারির তালিকা থেকে অতিরিক্ত পংক্তি চিহ্নিত হবে । তাদের উপেক্ষা করো।

## [সমস্যা/ বিশ্লেষণ](#problemswarnings) {#problemswarnings} 

* যদি আপনি NC CSV ফাইল নির্মাণ করে থাকেন অথবা স্প্রেডশীটের একটি স্প্রেডশীট প্রোগ্রামে ঘনিষ্ট স্প্রেডশীট তৈরি করলে, টেক্সট সম্পাদক অথবা স্প্রেডশীট প্রোগ্রামটি পরীক্ষা করবেন না । এই সম্মেলনগুলোকে সঠিকভাবে অনুসরণ করা আপনার জন্য উপযুক্ত ।
* csv ফাইলের মধ্যে এই সম্মেলন শেষে স্প্রেডশীটের রূপান্তর (এইভাবে, NC CSV ফাইল) সকল সারি অবাছাই করো তাদের উপেক্ষা করো। সফটওয়্যার দ্বারা NC CSV ফাইল রূপান্তর করা হয়.ncফাইল উপেক্ষা করা হবে।
* যদি NC CSV'র শেষে অতিরিক্ত অক্ষর উপস্থিত থাকে, ফাইলগুলিকে একটি ফাইলে রূপান্তর করতে পারবেনNetCDFফাইল নির্মাণ ও পরিবর্তন করা হবেNetCDFএটি একটি NC CSV ফাইল.
* ফাইলের মধ্যে সংযোজনের সময় NC CSV ফাইল রূপান্তর করার চেষ্টা করা হবেNetCDFসফটওয়্যারের ভেতর থেকে কিছু ত্রুটি সনাক্ত করা হবে এবং রূপান্তরকৃত ত্রুটির ফলে রূপান্তর করা হবে। অন্য কোনো সমস্যা প্রতিরোধ করা সম্ভব নয় অথবা সমস্ত বার্তা আহরণ করা অসম্ভব। অন্যান্য সমস্যা (উদাহরণ..) উপেক্ষা করা হবে। ফাইল স্বয়ংক্রিয়ভাবে সম্প্রসারণের উদ্দেশ্যে চিহ্নিত ফাইলের সঠিক মাত্রা প্রয়োগ করা হবেNetCDFফাইল, যেমন সিএফ-তে, সি-এফ-এর ব্যাপারে। এটি স্রষ্টার নির্মাতা এবং ব্যবহারকারীর দায়িত্ব যে রূপান্তর করা হবে তার উপর নির্ভর করে। দুটো উপায় আছে:
    * তালিকার বিষয়বস্তু মুদ্রণ করুন.ncncs ফাইলের সাথে ফাইল ব্যবহার করা হবে
         ([ https://linux.die.net/man/1/ncdump ](https://linux.die.net/man/1/ncdump) ) . .
    * বার্তার মধ্যে উপস্থিত তথ্যের বিষয়বস্তু প্রদর্শন করা হবেERDDAP. .
