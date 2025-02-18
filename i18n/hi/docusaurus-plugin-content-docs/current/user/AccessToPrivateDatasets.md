---
title: "Access to Private Datasets"
---
# निजी डेटासेट तक पहुंचERDDAP™

कईERDDAP™प्रतिष्ठानों में प्रमाणीकरण सक्षम नहीं है और इस प्रकार उपयोगकर्ताओं को लॉग इन करने का कोई तरीका नहीं है, न ही उनके पास कोई निजी डेटासेट है।

कुछERDDAP™प्रतिष्ठानों में प्रमाणीकरण सक्षम है। वर्तमान में,ERDDAP™केवल Google प्रबंधित ईमेल खातों के माध्यम से प्रमाणीकरण का समर्थन करता है, जिसमें ईमेल खाते शामिल हैंNOAAऔर कई विश्वविद्यालयों। यदिERDDAP™प्रमाणीकरण सक्षम है, Google-प्रबंधित ईमेल खाता वाले किसी भी व्यक्ति को लॉग इन कर सकते हैं, लेकिन उनके पास केवल निजी डेटासेट तक पहुंच होगी जो कि Google-प्रबंधित ईमेल खाते के साथ कोई भी लॉग इन कर सकता है।ERDDAP™व्यवस्थापक ने स्पष्ट रूप से उन्हें एक्सेस करने के लिए अधिकृत किया है।

## अद्यतन निर्देश{#updated-instructions} 

नीचे दी गई कुछ जानकारी तारीख से बाहर है। जब तक यह अद्यतन हो जाता है आप उपयोग कर सकते हैं[इस ब्लॉग पोस्ट](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)हाल के चरणों के लिए स्क्रिप्ट के साथ एक निजी डेटासेट से डेटा प्राप्त करने पर।

## ब्राउज़र के साथ मानव{#humans-with-browsers} 

मानव उपयोगकर्ताERDDAP™लॉग इनERDDAP™एक ब्राउज़र में निजी डेटासेट तक पहुंच प्राप्त करने के लिए उन्हें एक्सेस करने के लिए अधिकृत किया गया है।

लॉग इन करने के लिए:

1. किसी भी के ऊपरी बाएं में लिंक पर क्लिक करेंERDDAP™वेब पेज
यदि लिंक में लॉग इन नहीं है, तो लिंक में लॉग इन करें।ERDDAP™स्थापना में प्रमाणीकरण सक्षम नहीं है और कोई निजी डेटासेट नहीं है।
     
2. अपने गूगल खाते में साइन इन बटन पर क्लिक करें।
बटन के पाठ को "Signed in" में बदलना चाहिए।
     
3. लॉग इन पर क्लिक करेंERDDAPबटन
वेब पेज को कहना चाहिए आप लॉग इन कर रहे हैं *आपका E-Mail _ साइटमैप* ।
अगर यह नहीं करता है, तो 5 सेकंड का इंतजार करें और लॉग इन पर क्लिक करेंERDDAPफिर से बटन।
अत्यधिक मामलों में, आपको इंतजार करना पड़ सकता है और फिर कुछ बार फिर से प्रयास करना पड़ सकता है।
     
4. अपने ब्राउज़र के बैक बटन का उपयोग न करें। " का प्रयोग करेंERDDAP" उपरोक्त शीर्ष पर लिंक करें, फिर दूसरे लिंक का उपयोग करेंERDDAP™जिन पृष्ठों में आप रुचि रखते हैं। यदि एक कैश वेब पेज कहता है कि आप लॉग इन नहीं हैं, तो पृष्ठ को फिर से लोड करें।
     

## स्क्रिप्ट{#scripts} 

\\[यह लिन डेविट्ट द्वारा प्रदान की गई जानकारी से थोड़ा संशोधित है, जिन्होंने इसे बाहर निकालने की कड़ी मेहनत की थी। लिन, बहुत धन्यवाद&#33;
यदि आपके पास सुधार या सुझाव हैं, तो कृपया ईमेल करें erd.data @ noaa.gov.\\]

लॉग इन करना भी संभव हैERDDAP™और एक स्क्रिप्ट के माध्यम से निजी डेटासेट का उपयोग करें। यहाँ एक उदाहरण है जो उपयोग करता हैcurl:

1. ये निर्देश मानते हैं कि आप एक जीमेल पते का उपयोग कर रहे हैं जहां 2-फैक्टर प्रमाणीकरण चालू नहीं किया गया है। यदि आपके मुख्य जीमेल पते में 2-फैक्टर प्रमाणीकरण चालू है, तो 2-फैक्टर प्रमाणीकरण के साथ एक और जीमेल पता बनाने पर विचार करें।
     
2. लॉग इन करेंERDDAP™मैन्युअल रूप से आप अपने स्क्रिप्ट में उपयोग करना चाहते हैं और आवश्यक किसी भी अनुमति को स्वीकार करते हैं, फिर पूरी तरह से वापस लॉग इन करें।
     
3. ब्राउज़र डेवलपर टूल खोलें और नेटवर्क टैब पर जाएं।
     
4. पर क्लिक करेंERDDAP™"लॉग इन" लिंक, फिर "साइन इन" बटन और संकेतित होने पर उचित ईमेल पते का चयन करें।
     
5. "Sign in" बटन "Signed in" में परिवर्तन के बाद, डेवलपर टूल्स नेटवर्क टैब दो प्रविष्टियों को दिखाएगा जो निम्नलिखित की तरह दिखते हैं (फ़ायरफ़ॉक्स से उदाहरण) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
"CURL के रूप में प्रतिलिपि" करने के लिए माउस राइट-क्लिक संदर्भ मेनू का उपयोग करें और उन्हें एक सादे पाठ संपादक में पेस्ट करें
     
6. "लॉग इन" पर क्लिक करेंERDDAP" बटन और "CURL के रूप में कॉपी" लिंक जो दिखता है:
```
    login.html  
```
और इस तीसरे पेस्टcurlपाठ फ़ाइल में कमांड करें।
     
7. पाठ फ़ाइल में, आपके पास अब निम्नलिखित की तरह 3 लाइनें होंगी, जहां आपने लॉग इन किया हैERDDAP™सर्वर पर ' * https://host.somewhere.com/erddap * '। पहलाcurlआदेश "login \\_hint" में अपने उपयोगकर्ता प्रोफ़ाइल हो जाता है और एक "id\token" उत्पन्न करता है। दूसरा Google में लॉग इन करने के लिए आईडी \token का उपयोग करता है, और तीसरा तब लॉग इन करता है।ERDDAP।
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. उपरोक्त 3 लाइनें, जब एक कमांड लाइन से अनुक्रमिक रूप से चलाते हैं, तो आपको लॉग इन करेगा।ERDDAP। इन का उपयोग करने के लिए एक स्क्रिप्ट में आपको पहली पंक्ति से आईडी-टोकन पर कब्जा करने की आवश्यकता है, इसे दूसरी पंक्ति में खिलाएं और बाद में लाइनों द्वारा पढ़ने के लिए एक कुकी लिखें।
     
9. एक स्क्रिप्ट विकसित करने के लिए, पहले चलाएं (' https://accounts.google.com )  curlवास्तव में लाइन के रूप में यह डेवलपर उपकरणों से कॉपी किया गया था, और प्रतिक्रिया पर कब्जा (हो सकता हैcurlझंडा "-2.0" के बारे में त्रुटि बस इसे हटा दें) । PHP में यह निम्नलिखित की तरह दिखता है:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Google में लॉग इन करके दूसरी पंक्ति को $id \\_token का उपयोग करके, पहले "-H 'Cookie: stuff'" पैरामीटर को हटा दिया और इसके बजाय बताते हुएcurlकुकी लिखने के लिए:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
लॉग इन करेंERDDAP™फिर से "H 'Cookie: stuff'" पैरामीटर को हटा दें और पहले लिखित कुकी का उपयोग करें:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
अब आपको उसी कुकी का उपयोग करके सर्वर से डेटा का अनुरोध करने में सक्षम होना चाहिए:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
