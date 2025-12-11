---
title: "Access to Private Datasets"
---
# Özel Veri kümelerine erişim ERDDAP™ 

Pek çok ERDDAP™ Kurulumlar etkinleştirilmez ve böylece kullanıcıların giriş için herhangi bir yol sağlamaz, ne de özel veri setleri vardır.

Bazı bazıları ERDDAP™ Kurulumlar etkinleştirilen doğrulamaya sahiptir. Şu anda, ERDDAP™ Sadece Google-managed e-posta hesapları aracılığıyla kimlik doğrulamalarını destekler, bu da e-posta hesaplarını içerir NOAA Ve birçok üniversite. Eğer bir ERDDAP™ Kimlik doğrulama etkinleştirdi, Google tarafından yönetilen bir e-posta hesabı olan herkes giriş yapabilir, ancak sadece özel veri setlerine erişimleri olacaktır. ERDDAP™ Yönetici onlara erişim için açıkça yetki verdi.

## Güncelleme talimatları{#updated-instructions} 

Aşağıdaki bilgilerin bazıları tarih dışındadır. Bu güncel olana kadar, kullanabilirsiniz [Bu blog yazısı](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html) Son adımlar için, senaryolarla özel bir veri setinden veri almak.

## Tarayıcılarla İnsanlar{#humans-with-browsers} 

İnsan kullanıcıları ERDDAP™ Giriş yapabilir ERDDAP™ Özel veri setlerine erişmek için bir tarayıcıda, erişmek için yetkili olduklarını.

Giriş yapmak için:

1. Üstteki herhangi bir şeyin solunda bağlantıya tıklayın ERDDAP™ Web sayfası.
Eğer bağlantıda bir giriş yoksa, bağlantıda ERDDAP™ Kurulum etkinleştirilmedi ve özel veri setleri yoktur.
     
2. Google hesabınızı imzalamak için düğmeye tıklayın.
Düğmenin metni "Kaydetilmiş" olarak değiştirilmelidir.
     
3. Log'e tıklayın ERDDAP düğme.
Web sayfası söylemek için değişmeli You are login in as as *Senin E-posta* .
Değilse, 5 saniye bekleyin ve Girişe Girin ERDDAP Tekrar düğme.
Aşırı durumlarda, beklemeniz gerekebilir ve sonra birkaç kez tekrar deneyin.
     
4. Tarayıcınızın Back düğmesine kullanmayın. "Use the " ERDDAP Yukarıdakilerin üst kısmında bağlantı, sonra gitmek için diğer bağlantıları kullanın ERDDAP™ İlgilendiğiniz sayfalar. Önbelli bir web sayfası giriş olmadığını söylüyorsa, sayfayı yeniden yükleyin.
     

## Senaryolar{#scripts} 

 \\[ Bu, Lynn DeWitt tarafından sağlanan bilgilerden biraz değiştirilebilir, bunu yapılandıran zor işi kim yaptı. Lynn, çok teşekkür ederim&#33;
Düzeltmeler veya önerileriniz varsa, lütfen e-posta erd.data @ noaaa.gov . \\] 

Ayrıca giriş yapmak da mümkündür. ERDDAP™ Ve bir senaryo aracılığıyla özel veri setlerine erişim. İşte kullanılan bir örnek curl :

1. Bu talimatlar, 2 faktör doğrulamanın yayınlanmadığı bir gmail adresini kullandığınızı varsayıyor. Ana gmail adresiniziz 2 faktör doğrulama çıktıysa, 2 faktör doğrulama ile başka bir gmail adresi oluşturmayı düşünün.
     
2. Giriş yapın ERDDAP™ Senaryonuzda kullanmak istediğiniz gmail adresi ile ve gerekli herhangi bir izni kabul edin, sonra tamamen geri girin.
     
3. Tarayıcı Geliştirici Araçları açın ve Ağ sekmesine gidin.
     
4. Click on the the the ERDDAP™ "log in" linki, sonra "Sign in" düğmesine tıklayın ve talep edilirse uygun e-posta adresini seçin.
     
5. "Sign in" butonuna değişikliklerden sonra, Geliştirici Araçları Ağı sekmesi aşağıdaki gibi görünen iki giriş gösterecektir. (Örneğin, Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Bu URL'lerin her ikisine de fare doğru tıklama bağlam menüsünü kullanın ve onları basit bir metin editörü editörüne yapıştırın.
     
6. "Log into the ERDDAP " düğme ve "copy as cURL" gibi görünen bağlantı:
```
    login.html  
```
Ve bu üçüncülüğü yapıştırın curl metin dosyasına komuta edin.
     
7. Metin dosyasında, şu anda aşağıdaki gibi 3 çizgiye sahip olacaksınız, nerede giriş yapmışsınız ERDDAP™ server at ' *https://host.somewhere.com/erddap* ". İlk önce The first the first curl komut kullanıcı profilinizi "login\\_hint" olarak alır ve "id\\_token" yaratır. İkincisi, Google'a giriş yapmak için id\\_token'i kullanır ve üçüncü o zaman girişleri giriş yapar. ERDDAP .
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. Yukarıdaki 3 satır, bir komut satırından kesin olarak çalıştırırken, sizi bir komut satırına girişecektir. ERDDAP . Buları bir senaryoda kullanmak için, ilk çizgiden id\\_token yakalamanız gerekir, ikinci çizgiye besleyin ve bir kurabiye daha sonraki hatlarla okumak için yazın.
     
9. Bir senaryo geliştirmek için, ilk önce çalıştırın (‘ ‘ ‘https://accounts.google.com)   curl Tam olarak geliştirici araçlardan kopyalandığı gibi ve cevabı yakalamak (Bir alabildiğin curl Bayrak hakkında hata "-2.0" sadece onu kaldır) . php'de aşağıdaki gibi görünüyor:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Google'a ikinci çizgiyi $id\\_token kullanarak giriş yapın, ilk önce "-H 'Cookie: Things' parametresini ortadan kaldırır ve bunun yerine " şeyler" parametresini ortadan kaldırırsınız. curl Bir kurabiye yazmak için:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
Giriş yapın ERDDAP™ Tekrar "-H 'Cookie: şeyler' parametresini ortadan kaldırır ve daha önce yazılmış kurabiyeyi kullanır:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Artık aynı kurabiyeyi kullanarak sunucudan veri talep edebilirsiniz:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
