---
title: "Access to Private Datasets"
---
# Rochtain ar Shonraí Príobháideacha i ERDDAP™ 

Go leor ERDDAP™ nach bhfuil suiteálacha fíordheimhnithe ar chumas agus dá bhrí sin nach bhfuil ar fáil ar bhealach ar bith d'úsáideoirí a logáil isteach, ná an bhfuil aon tacair sonraí príobháideacha.

Roinnt cuid ERDDAP™ suiteálacha a dhéanamh fíordheimhnithe ar chumas. Faoi láthair, ERDDAP™ ach tacaíonn fíordheimhnithe trí chuntais ríomhphoist Google-bhainistithe, lena n-áirítear cuntais ríomhphoist ag NOAA agus ollscoileanna go leor. Má tá ERDDAP™ Tá fíordheimhnithe ar chumas, Is féidir le duine ar bith a bhfuil cuntas ríomhphoist Google-bhainistithe logáil isteach, ach beidh siad ach rochtain ar na tacair sonraí príobháideacha go bhfuil an ERDDAP™ Tá riarthóir údaraithe go sainráite dóibh rochtain a fháil.

## Treoracha nuashonraithe{#updated-instructions} 

Tá cuid den fhaisnéis thíos as dáta. Go dtí seo faigheann suas chun dáta is féidir leat é a úsáid [seo blog post](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html) do chéimeanna le déanaí maidir le sonraí a fháil ó tacar sonraí príobháideach le scripteanna.

## Daoine Le Brabhsálaithe{#humans-with-browsers} 

úsáideoirí an duine ERDDAP™ Is féidir logáil isteach ERDDAP™ i bhrabhsálaí chun rochtain a fháil ar thacair sonraí príobháideacha go bhfuil siad údaraithe chun rochtain a fháil.

Chun logáil isteach:

1. Cliceáil ar an logáil isteach sa nasc ar chlé uachtair ar bith ERDDAP™ leathanach gréasáin.
Má tá aon logáil isteach nasc, an ERDDAP™ Ní shuiteáil bhfuil fíordheimhnithe ar chumas agus níl aon tacar sonraí príobháideacha.
     
2. Cliceáil ar an Comharthaí i gcnaipe a shíniú isteach i do chuntas Google.
Ba chóir téacs an chnaipe a athrú go dtí "Signed in".
     
3. Cliceáil ar an Logáil isteach ERDDAP cnaipe.
Ba chóir an leathanach gréasáin athrú a rá Tá tú logáilte isteach mar *do chuid féin Naisc ábhartha eile* .
Mura ndéanann sé, fanacht 5 soicind agus cliceáil ar an Logáil isteach ERDDAP cnaipe arís.
I gcásanna tromchúiseacha, b'fhéidir go mbeadh ort fanacht agus ansin déan iarracht arís cúpla uair.
     
4. Ná bain úsáid as cnaipe Ar ais do bhrabhsálaí. Bain úsáid as an " ERDDAP " nasc ag barr an méid thuas, úsáid ansin naisc eile chun dul go dtí ERDDAP™ leathanaigh go bhfuil suim agat i. Má deir leathanach gréasáin i dtaisce nach bhfuil tú logáilte isteach, athlódáil an leathanach.
     

## Scripteanna{#scripts} 

 \\[ Tá sé seo beagán modhnaithe ó fhaisnéis a sholáthraíonn Lynn DeWitt, a rinne an post crua de figuring seo amach. Lynn, go raibh maith agat go mór&#33;
Má tá tú ceartúcháin nó moltaí, le do thoil ríomhphost erd.data @ noaa.gov . \\] 

Is féidir freisin logáil isteach ERDDAP™ agus rochtain tacar sonraí príobháideacha trí script. Seo sampla a úsáideann curl :

1. Glacann na treoracha seo go bhfuil tú ag baint úsáide as seoladh ríomhphoist nuair nach bhfuil fíordheimhniú 2-fachtóir iompaithe ar. Má tá fíordheimhniú 2-fachtóir ag do phríomhsheoladh gmail, smaoinigh ar sheoladh gmail eile a chruthú le fíordheimhniú 2-fachtóra.
     
2. Logáil isteach ERDDAP™ de láimh leis an seoladh gmail mian leat a úsáid i do script agus glacadh le haon cheadanna ag teastáil, ansin logáil go hiomlán ar ais amach.
     
3. Oscail an bhrabhsálaí Uirlisí Forbróir, agus téigh go dtí an cluaisín Líonra.
     
4. Cliceáil ar an ERDDAP™ "log i" nasc, ansin an "Sign in" cnaipe agus roghnaigh an seoladh ríomhphoist cuí má spreagtar é.
     
5. Tar éis na "Sign in" athruithe cnaipe a "Signed i", beidh an Uirlisí Líonra Forbróir tab thaispeáint dhá iontrálacha a cuma mhaith an méid seo a leanas (sampla ó Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Bain úsáid as an luch ceart-cliceáil roghchlár comhthéacs a "cóip mar cURL" an dá de na URLanna agus greamaigh iad i eagarthóir téacs plain
     
6. Cliceáil ar an "Log isteach ERDDAP " cnaipe agus "cóip mar cURL" an nasc a bhreathnaíonn ar nós:
```
    login.html  
```
agus greamaigh an tríú curl ordú isteach an comhad téacs.
     
7. Sa chomhad téacs, beidh ort anois 3 línte mar seo a leanas, áit a bhfuil tú logáilte isteach ERDDAP™ freastalaí ag ' *https://host.somewhere.com/erddap* '. An chéad curl ordú faigheann do phróifíl úsáideora i "login \\_hint" agus gineann "id\\_token". Úsáideann an dara an id\\_token chun logáil isteach Google, agus an tríú logs ansin i go ERDDAP .
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. An thuas 3 línte, nuair a reáchtáil seicheamhach ó líne ordú, beidh logáil tú isteach ERDDAP . D'fhonn iad seo a úsáid i script is gá duit an id\\_token a ghabháil ón gcéad líne, é a bheathú leis an dara líne, agus fianán a scríobh le léamh ag línte ina dhiaidh sin.
     
9. A fhorbairt script, reáchtáil an chéad (''https://accounts.google.com)   curl líne díreach mar a chóipeáil sé ó na huirlisí forbróir, agus a ghabháil leis an freagra (is féidir leat a fháil curl earráid mar gheall ar an bhratach "--2.0" ach é a bhaint) . I php tá sé cosúil leis an méid seo a leanas:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Logáil isteach go dtí Google trí fhorghníomhú an dara líne ag baint úsáide as $id\\_token, a bhaint ar dtús leis an "-H 'Cookie: stuif' paraiméadar agus ina ionad sin ag insint curl fianán a scríobh:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
Logáil isteach ERDDAP™ , arís ag baint úsáide as an "-H 'Cookie: stuif' paraiméadar, agus ag baint úsáide as an bhfianán scríofa roimhe seo:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Ba chóir duit a bheith in ann sonraí a iarraidh ón bhfreastalaí, ag baint úsáide as an bhfianán céanna:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
