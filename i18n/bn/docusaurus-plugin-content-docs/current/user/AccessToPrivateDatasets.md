---
title: "Access to Private Datasets"
---
# ব্যক্তিগত ডেটাতে প্রবেশাধিকারERDDAP™

অনেকERDDAP™ইনস্টলেশনের কোনো অনুমোদন সক্রিয় করা হয়নি এবং এর ফলে ব্যবহারকারীদের লগ-ইন করার কোনো উপায় উপলব্ধ নেই অথবা ব্যক্তিগত তথ্য উপলব্ধ রয়েছে।

কিছুERDDAP™ইনস্টলেশনের ব্যবস্থা সক্রিয় করা হয়েছে। বর্তমানে,ERDDAP™গুগল ই-মেইল অ্যাকাউন্টের মাধ্যমে সমর্থিত অনুমোদন, যার মধ্যে ইমেইল অ্যাকাউন্ট রয়েছে।NOAAএবং অনেক বিশ্ববিদ্যালয়। যদি থাকেERDDAP™এর অনুমতি আছে, যে কেউ গুগল-মেনড অ্যাকাউন্টের মাধ্যমে লগ ইন করতে পারেন, কিন্তু তারা শুধু ব্যক্তিগত তথ্য যোগাযোগ করতে পারবেন।ERDDAP™অ্যাডমিনস্ট্রেটর তাদেরকে অনুমতি দিয়েছেন।

## আপডেট করা নির্দেশ{#updated-instructions} 

নিচের কিছু তথ্য তারিখের বাইরে। আপডেট পাওয়া না পর্যন্ত আপনি এটি ব্যবহার করতে পারেন[এই ব্লগ পোস্ট](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)স্ক্রিপ্ট থেকে ব্যক্তিগত তথ্য প্রাপ্ত করার জন্য সম্প্রতি ব্যবহৃত পদক্ষেপ।

## ব্রাউজারসহ মানুষ{#humans-with-browsers} 

ব্যবহারকারীদেরERDDAP™লগ-ইন করতে ব্যর্থERDDAP™ব্যক্তিগত তথ্য ব্যবহারের জন্য একটি ব্রাউজারের মধ্যে ব্যবহারের অনুমতি রয়েছে।

লগ-ইন করার উদ্দেশ্যে লগ-ইন:

1. যে কোনো বিষয়ের ওপর মাউসের বাঁদিকের বাটন ক্লিক করুনERDDAP™ওয়েব পেজ।
লিংক পাওয়া যায়নিERDDAP™ইনস্টলেশনের ব্যবস্থা সক্রিয় করা হয়নি এবং এর মধ্যে কোনো ব্যক্তিগত তথ্য উপস্থিত নেই।
     
2. আপনার গুগল অ্যাকাউন্টে সাইন ইন করতে সাইন ইন করুন।
বাটন টেপা হলে যে টেক্সটটি ব্যবহার করা হবে "Sign."
     
3. লগিনে ক্লিক করুনERDDAPবোতাম.
এই ওয়েব পেজের নাম পরিবর্তন করা উচিত আপনি লগ-ইন করেছেন *আপনার ই-মেইল ঠিকানা* . .
এটি না থাকলে, ৫ সেকেন্ড অপেক্ষা করুন এবং লগ-ইনে ক্লিক করুনERDDAPআবার বাটন.
আপনার হয়তো কিছু সময়ের জন্য অপেক্ষা করতে হতে পারে ।
     
4. আপনার ব্রাউজারের পূর্ববর্তী বাটন ব্যবহার করা হবে না। ব্যবহার করুনERDDAP"উপরের উপরের অংশে লিংক, তারপর অন্যান্য লিঙ্ক ব্যবহার করুন"ERDDAP™আপনি আগ্রহী। ক্যাশে করা ওয়েব পেজের মধ্যে লগ-ইন করা না হলে, পৃষ্ঠা পুনরায় লোড করা হবে না।
     

## স্ক্রিপ্ট{#scripts} 

\\[লিন ডি উইট-এর দেয়া তথ্য থেকে কিছুটা পরিবর্তিত হয়েছে। লিন, অনেক ধন্যবাদ&#33;
যদি আপনার কাছে সংশোধন বা পরামর্শ থাকে, দয়া করে ই-মেইল ই-মেইল করুন.\\]

লগ-ইন করা যাবেERDDAP™একটি স্ক্রিপ্ট থেকে ব্যক্তিগত তথ্য এবং প্রবেশাধিকার. এখানে একটি উদাহরণ রয়েছে যা ব্যবহার করা হচ্ছেcurl:

1. এই নির্দেশ অনুযায়ী আপনি একটি gmail ঠিকানা ব্যবহার করছেন যেখানে 2-ond অনুমোদন চালু করা হয় না. যদি আপনার প্রধান ই- মেইল ঠিকানা থাকে তাহলে ২- লিঙ্ক চালু হয়, অন্য একটি ই- মেইল ঠিকানার কথা বিবেচনা করুন ।
     
2. লগ-ইন করুনERDDAP™আপনার স্ক্রিপ্টে যে ঠিকানা ব্যবহার করতে চান সেটি নিজে থেকে নিয়ে আসুন এবং যে কোনো প্রয়োজন অনুসারে সেটি গ্রহণ করুন।
     
3. ব্রাউজার ডেভেলপার টুল খোলো, এবং নেটওয়ার্ক ট্যাব-এ যান।
     
4. ক্লিক করুনERDDAP™"লগ-ইন" এ যোগ করা হলে, "কিছু স্বাক্ষর" বাটন টিপে এবং "যোগ করুন।
     
5. "Spic" বাটন টেপা হলে, ডিভেলপর সরঞ্জাম সংক্রান্ত ট্যাবগুলি প্রদর্শিত হবে (ফায়ারফক্স থেকে উদাহরণ) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
মেনুর মধ্যে মাউসের ডান বাটন ক্লিক করে " SICT" শীর্ষক মেনু থেকে "URL" নির্বাচন করুন ও "URL" শীর্ষক বাটন সহযোগে সেগুলি পেস্ট করুন
     
6. "লগ-ইন" এ ক্লিক করুনERDDAP"কেসি ইউ- আর- এল" হিসাবে সংরক্ষণ করা হবে এমন লিংক যা দেখায়:
```
    login.html  
```
এবং এই তৃতীয়টি পেস্ট করুনcurlটেক্সট ফাইলে কমান্ড ।
     
7. টেক্সট ফাইলে আপনি এখন তিনটি লাইন যেমন নীচের লাইন আছে, যেখানে আপনি লগইন করেছেনERDDAP™সার্ভার- এ * https://host.somewhere.com/erddap * '. প্রথমcurl"লগ-ইন" নামক ব্যবহারকারীর প্রোফাইল প্রয়োগ করে "লগ-ইন উইন্ডো" -এ উল্লিখিত কমান্ড সঞ্চালিত হবে। দ্বিতীয় আইডি_token-এ লগ-ইন করার জন্য ব্যবহার করে, এবং তৃতীয় লগ-ইনকৃত লগ-ইন করেERDDAP. .
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. উপরের ৩ লাইন, কোনো কমান্ড থেকে শুরু হলে লগ- ইন করা হবেERDDAP. . স্ক্রিপ্ট- এ এই স্ক্রিপ্টটি ব্যবহার করার জন্য প্রথম লাইন থেকে আই- ডি_tokenকে বাগে ধারণ করতে হবে, দ্বিতীয় লাইনে খাবার দিন এবং পরবর্তী লাইন থেকে একটি কুকি লিখুন ।
     
9. স্ক্রিপ্ট বানাতে প্রথম ধাপ ('আ' https://accounts.google.com )  curlডেভেলপার টুল থেকে কপি করে, এবং প্রতিক্রিয়া প্রাপ্ত করার মতো অবস্থায় ঠিক একই লাইন (আপনি একটি পেতে পারেcurlফ্ল্যাগ সম্বন্ধে ত্রুটি (0 =2.0. 0x], শুধু এটি অপসারণ করুন") . .php এ দেখতে নিচে দেখুন:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
$id_token ব্যবহার করে দ্বিতীয় লাইনে লগ-ইন করুন, প্রথমে "Hoky" নামক ফাইলটি সরিয়ে নিন এবং পরিবর্তে বলা" পরামিতিটি মুছে ফেলুনcurlকুকি লিখতে:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
লগ-ইন করুনERDDAP™এবং পূর্বে লিখিত কুকি ব্যবহার করে "এইচ-এইচ কিসি" পরামিতি সরিয়ে ফেলা হয়েছে:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
সার্ভার থেকে তথ্য এখন আপনি অনুরোধ করছেন:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
