---
title: "Access to Private Datasets"
---
# Paglapit sa Pribadong mga Date saERDDAP™

MaramiERDDAP™Ang mga instalasyon ay walang awtentasyon na nakapagdurulot at kaya ay hindi nagbibigay ng anumang paraan para sa mga tagagamit na magtala, ni mayroon man silang anumang pribadong datasets.

IlanERDDAP™Ang mga instalasyon ay nagkaroon ng kakayahan sa pagiging totoo. Sa kasalukuyan,ERDDAP™Sinusuportahan lamang ang mapagkakatiwalaan sa pamamagitan ng Google-maned email accounts, na kinabibilangan ng mga email account saNOAAat maraming unibersidad. Kung mayroonERDDAP™ay nagawa ng realityation, ang sinuman na may Google-maned email account ay maaaring mag- log in, ngunit sila ay magkakaroon lamang ng access sa pribadong datasets na ang mga ito ay angERDDAP™Ang administrador ay maliwanag na nagbigay sa kanila ng karapatang makapasok.

## Binago ang mga tagubilin{#updated-instructions} 

Ang ilan sa impormasyong nasa ibaba ay lipas na. Hanggang sa ito ay baguhin ay magagamit mo[ang blog post na ito](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)para sa kamakailang mga hakbang sa pagkuha ng impormasyon mula sa isang pribadong dataset na may mga iskrip.

## Mga Taong May Browser{#humans-with-browsers} 

Mga taong gumagamit ngERDDAP™makakapasokERDDAP™sa browser upang makuha ang mga pribadong dataset na awtorisadong gamitin.

Upang makapasok:

1. Ikabit ang click sa troso sa itaas na kaliwa ng alinmanERDDAP™web page.
Kung walang link na log, angERDDAP™Ang pagluklok ay walang mapagkakatiwalaang kakayahan at walang mga pribadong dataset.
     
2. Klick sa Sign sa button upang i-sign sa iyong Google account.
Ang teksto ng button ay dapat magbago sa "Isinilang sa".
     
3. Pagsakay sa LogERDDAPbuton.
Ang pahinang web ay dapat magbago upang magsabi Nakasulat ka bilang *ng iyong EmailAddress* .
Kung hindi, maghintay ng 5 segundo at i- click ang LogERDDAPbutton muli.
Sa sukdulang mga kalagayan, baka kailanganin mong maghintay at pagkatapos ay sumubok muli nang ilang ulit.
     
4. Huwag gamitin ang iyong browser's Back button. Gamitin ang "ERDDAP" I - link sa itaas, saka gamitin ang iba pang linkERDDAP™sa mga pahinang interesado ka. Kung sabihin ng isang pahinang web na may cached na ikaw ay hindi napapasok, muling ikarga ang pahina.
     

## Mga Eskripto{#scripts} 

\\[Ito ay bahagyang binago mula sa impormasyong inilaan ni Lynn DeWitt, na gumawa ng mahirap na trabaho na pag - isipan ito. Lynn, maraming salamat&#33;
Kung mayroon kang mga pagtutuwid o mungkahi, pakisuyong mag-mail erd.data @ noaa.gov .\\]

Maaari ring mag - log inERDDAP™at i-access ang mga pribadong dataset sa pamamagitan ng isang script. Narito ang isang halimbawa na gumagamit ngcurl:

1. Ang mga tagubiling ito ay nagpapalagay na ikaw ay gumagamit ng isang gmail address kung saan ang 2-factor realityation ay hindi na-redirect. Kung ang iyong pangunahing gmail address ay may 2-factor realityation na binuksan, isaalang-alang ang paglikha ng isa pang gmail address na may 2-factor realityation off.
     
2. Patungo saERDDAP™Sa manu - manong paggamit ng gmail address na gusto mong gamitin sa iyong script at tanggapin ang anumang kailangan mong permiso, pagkatapos ay mag - log out.
     
3. Buksan ang browser developer Tools, at pumunta sa task ng Network.
     
4. Pagsakay sa KlickERDDAP™"log sa" link, pagkatapos ay ang "Sign in" button at piliin ang angkop na adres ng email kung naudyok.
     
5. Pagkatapos ng "Sign in" button change to "Signed in", ang developer Tools Network task ay magpapakita ng dalawang entry na parang sumusunod (halimbawa mula sa Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Gamitin ang mouse right-click konteksto menu sa "copy as cURL" na parehong mga url na ito at i-click ang mga ito upang maging simpleng text editor
     
6. Klick sa "Log toERDDAP"Punton at "copy as cURL" ang link na mukhang:
```
    login.html  
```
at paste itong ikatlocurlIlagay sa text file.
     
7. Sa talaan ng mga teksto, magkakaroon ka ngayon ng 3 linya na gaya ng sumusunod, kung saan ikaw ay nakapasok sa loob ng isang linyaERDDAP™server sa ' * https://host.somewhere.com/erddap * ' Ang unacurlI-order ang inyong user profile sa "login\\_hint" at lumikha ng isang "id\\_token". Ang ikalawa ay gumagamit ng id\\_token upang mag - log sa Google, at ang ikatlo naman ay sa mga troso patungo saERDDAP.
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. Ang nabanggit na 3 linya, kapag tumakbo mula sa isang command line, ay mag - uugnay sa iyoERDDAP. Upang magamit ang mga ito sa isang iskrip na kailangan mo upang makuha ang id\\_token mula sa unang linya, dalhin ito sa ikalawang linya, at isulat ang isang cookie upang mabasa sa pamamagitan ng kasunod na mga linya.
     
9. Upang makagawa ng isang iskrip, patakbuhin ang una (' https://accounts.google.com )  curllinya na kagayang - kagaya ng pagkakopya rito mula sa mga kagamitan sa paggawa, at makuha ang pagtugon (maaaring makakuha ka ng isangcurlerror tungkol sa bandila "-2.0" tanggalin na lang) . Sa php ay parang sumusunod:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Log in to Google sa pamamagitan ng paglalapat ng ikalawang linya gamit ang $id\\_token, una ay pagtanggal ng "-H 'Cookie: play'" parameter at sa halip ay pagsasabi ngcurlupang isulat ang isang cookie:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
Patungo saERDDAP™, muling inaalis ang "-H 'Cookie: affunt'" parameter, at ginagamit ang dating nakasulat na cookie:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Makahihiling ka ngayon ng impormasyon mula sa server, na ginagamit ang iisang cookie:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
