---
sidebar_position: 1
---

# Yükleme
İlk Kurulum Nasıl Yapılır ERDDAP™ Your Server

 ERDDAP™ Desteklenen herhangi bir sunucuda çalıştırılabilir Java Tomcat ve (Ve Jetty gibi diğer uygulama sunucuları, ama onları desteklemiyoruz) .
 ERDDAP™ Linux üzerinde test edilmiştir (Amazon'un AWS'sinde de dahil olmak üzere) Mac ve Windows bilgisayarları.

*  **Docker** – Biz sunuyoruz [ ERDDAP™ Bir Docker konteynerinde](https://hub.docker.com/r/erddap/erddap) 
Ve IOOS şimdi bir teklif sunuyor [Hızlı Başlangıç Kılavuzu için ERDDAP™ Bir Docker Konteyner](https://ioos.github.io/erddap-gold-standard/index.html) .
Standart ERDDAP™ kurulum, bir Docker konteynerinde.
Docker Boşluk ve izleme kurmak için kolay yollar sunuyoruz, daha fazla oku [Docker belgeleri](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Docker kullanıyorsanız, muhtemelen Docker versiyonunu tercih edersiniz.
Bulut hizmetleri üzerinde koşmak arıyorsanız muhtemelen Docker versiyonunu tercih edeceksiniz.
*  **Amazon Amazon Amazon** – Eğer yükleniyorsanız ERDDAP™ Amazon Web Services EC2 örneğinde, bunu görün [Amazon Web Services Genel Bakış](/docs/server-admin/additional-information#amazon) İlk olarak.
*  **Linux ve Macs** – ERDDAP™ Linux ve Mac bilgisayarlar üzerinde harika çalışır. Aşağıdaki talimatları görün.
*  **Windows Windows Windows** – Windows test için iyi ERDDAP™ Ve kişisel kullanım için (Aşağıdaki talimatları görmek) ,
Ancak bunu halk için kullanmayı önermiyoruz ERDDAP™ Dağıtımlar. Koşu Koşu ERDDAP™ Windows'da sorunlar olabilir:
Özellikle, özellikle, ERDDAP™ dosyaları çabucak silemez ve / veya yeniden adlandırmayabilir. Bu muhtemelen antivirüs yazılımı nedeniyle
   (E.g., McAfee ve Norton) Hangi dosyaları virüsler için kontrol eder. Eğer bu sorunla karşılaşırsanız
(bu, hata mesajları tarafından görülebilir [Giriş.txt](/docs/server-admin/additional-information#log) Dosya gibi dosya
“Unable to delete...”) antivirüs yazılımının ayarlarını değiştirmek kısmen sorunu hafifletebilir. Ya da bunun yerine bir Linux veya Mac sunucusu kullanmayı düşünün.

 **Standart standart ERDDAP™ Linux, Macs ve Windows bilgisayarlar için yükleme talimatları:** 

0. Herhangi bir bağımlılıkların kurulu olduğundan emin olun. Windows makinelerinde (Linux ve Mac) Ama csh'e ihtiyacınız var.

##  Java  {#java} 

1.  [For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For ERDDAP™ v2.19+, yukarı yukarı Java 21.](#java) 
Güvenlik nedenleri için, neredeyse her zaman en son sürümünü kullanmak en iyisidir Java 21.
Lütfen indirmek ve en son sürümü yüklemek
    [Kabulium'un AçıkJDK (Temin) 21 21 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21) .
Yüklemeyi doğrulamak için, "/javaJreBinYönetmen /java -vers'i, örneğin
"/usr/local/jdk-21.0.3+9/jre/bin/javavava -vers'.

    ERDDAP™ İşlerle birlikte çalışır Java Diğer kaynaklardan, ancak Impium'u tavsiye ediyoruz çünkü ana, topluluk destekli,
ücretsiz ücretsiz ücretsiz ücretsiz (Bira ve konuşma gibi) versiyonu Java 21, Long Term Support (Uzun yıllar boyunca ücretsiz yükseltmeler, ilk sürüm) .
Güvenlik sebepleri için lütfen güncellemek ERDDAP 's version of' Java periyodik olarak yeni versiyonları olarak Java 21 Buyium'dan kullanılabilir.

    ERDDAP™ 21 ile yoğun olarak test edildi ve başka versiyonlarla kullanılmadı. Çeşitli nedenlerle, başka versiyonlarını test etmiyoruz veya desteklemiyoruz Java .
     
## Tomcat{#tomcat} 

2.  [Set up up](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat en yaygın kullanılan Java Uygulama Server,
hangisidir Java İşletim sistemi ağ hizmetleri ve ağ hizmetleri arasında duran yazılımlar Java sunucu yazılımı gibi ERDDAP™ .
Free ve Open Source Software (FOSS) .

Başkasını kullanabilirsiniz Java Uygulama Server (E.g., Jetty) Ama sadece Tomcat ile test ediyoruz ve destekliyoruz.

   * Tomcat'ı indirin ve sunucunuzda veya PC'de paketlenme.
Güvenlik nedenleri için, Tomcat 10'un son versiyonunu kullanmak neredeyse her zaman en iyisidir (9 ve aşağıda kabul edilemez) 
Hangi ile çalışmak için tasarlanmıştır Java 21 veya yeni. Aşağıda, Tomcat rehberi “tomcat” olarak adlandırılacaktır.

__Warning&#33;__ Zaten bir Tomcat başka bir web uygulaması çalıştırıyorsanız (Özellikle THREDDS) , yüklemeni tavsiye ediyoruz ERDDAP™ İçinde in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in
      [ikinci bir Tomcat](/docs/server-admin/additional-information#second-tomcat) Çünkü ERDDAP™ Farklı Tomcat ayarlarına ihtiyaç vardır
Ve hafıza için diğer uygulamalarla uğraşmak zorunda olmamalıdır.

     * Linux'ta, ["Core" indir .gz " Tomcat dağıtım](https://tomcat.apache.org/download-10.cgi) Ve onu paketle.
Bunu "/usr/yerel" olarak paketlememizi tavsiye ederiz.
     * Bir Mac'te, Tomcat muhtemelen zaten "/Tom/Tomcat'ta kuruldu, ancak Tomcat 10'un son sürümüne güncellemeli.
Eğer indirseniz, ["Core" indir .gz " Tomcat dağıtım](https://tomcat.apache.org/download-10.cgi) Ve onu "/Tom/Tomcat" olarak paketle.
     * Windows'da, Windows'da, yapabilirsiniz ["Core" "zip" Tomcat dağıtımını indirin](https://tomcat.apache.org/download-10.cgi) 
        (Bu, Windows kayıt ile dağınık değildir ve bir DOS komut satırından hangi kontrol edersiniz) ve uygun bir dizide paketlenme.
        (Geliştirme için, "Core" "zip" dağıtımını kullanıyoruz. Biz orada bir " /programlar" rehberi ve paketi yapıyoruz.) 
Ya da daha fazla özellik içeren "Core" "64-bit Windows zip" dağıtımını indirebilirsiniz.
Eğer dağıtım bir Windows installer ise, muhtemelen Tomcat'ı, örneğin, “/Program Files/apache-tomcat-10.0.23'ü koyacaktır.
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - "tomcat/conf /server.xml" dosyasında, iki "Her biri için yapmanız gereken iki değişiklik vardır " <Connector> “Arayın
   ("&lt;Connector port="808080" ve "&lt;Conector port="8443" için biri) .
   1.  (Önerilen önerilen önerilen önerilen önerilen) "connectionTimeout' parametre değerini artırmak, belki 300000 (milisans, 5 dakika) .
   2.  (Önerilen önerilen önerilen önerilen önerilen) Yeni bir parametre ekleyin: "relaxedQueryChars="[] | " Bu Seçmeli ve biraz daha az güvenli,
Ancak kullanıcılar için bu karakterleri bir kullanıcının isteği URL’sinin parametrelerinde meydana geldiğinden çıkarma ihtiyacını ortadan kaldırır.
             
### İçerik.xml{#contentxml} 

* bağlam.xml – Kaynaklar Cache - "tomcat/conf /context.xml", hemen önce " </Context> “ etiketi, Kaynaklar etiketini değiştirin
   (veya ekle, zaten orada değilse) Önbelleği ayarlamak için MaxSize parametre 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Bu, katalina'da birçok uyarıdan kaçınır. Tüm bunların hepsiyle başlıyoruz
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache Timeoutout{#apache-timeout} 

* Linux bilgisayarlarda, Apache zamanout ayarlarını değiştirin, böylece zaman alıcı kullanıcı istekleri zaman zamanlamayın
   (Sık sık "Proxy" veya "Bad Gateway" hatası olarak görünen şeyle) . Kök kullanıcı olarak:
  * Apache'yi Değiştirin http d.conf' dosyasını (Genellikle " / etc / http d/conf / ") :
    * Mevcut değişikliği değiştirin " <Timeout> " (veya dosyanın sonunda bir tane ekleyin) 3600 (saniye saniye saniye saniye saniye) Ancak varsayılan 60 veya 120 saniye yerine.
    * Mevcut değişikliği değiştirin " <ProxyTimeout> " (veya dosyanın sonunda bir tane ekleyin) 3600 (saniye saniye saniye saniye saniye) Ancak varsayılan 60 veya 120 saniye yerine.
  * Restart Apache: "/usr/sbin/apachectl -k lütufkâr " (Ama bazen farklı bir dizide) .

### Güvenlik Güvenliği{#security} 
         
* Güvenlik tavsiyesi: See See See See See [Bu talimatlar](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) Güvenliği artırmak için
Tomcat kurulumunuz, özellikle halk sunucular için.
         
* Halk için ERDDAP™ Linux ve Macs üzerinde yüklemeler, Tomcat kurmak en iyisidir (Program programı) Kullanıcıya ait olarak "tomcat "
   (Sınırlı izni olan ayrı bir kullanıcı ve hangisi [Şifre yok](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Böylece, sadece süper kullanıcı, kullanıcı olarak “tomcat” olarak hareket edebilir. Bu, hackerların sunucunuza kullanıcı olarak “tomcat” olarak girişlerini imkansız kılar.
Ve herhangi bir durumda, “tomcat’ın kullanıcının sunucunun dosya sistemi üzerinde çok sınırlı izinlere sahip olması gerekir (+Yaz+execute ayrıcalıkları hazır+
"apache-tomcat" rehberi ağacı ve " <bigParentDirectory> " ve sadece yönetmenler için ayrıcalıklar, verilerle ERDDAP™ erişime ihtiyaç vardır).
  * "tomcat" kullanıcı hesabı oluşturabilirsiniz (Hangi şifreye sahip değil) Komutanı kullanarak:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Kullanıcı olarak çalışmaya geçebilirsiniz "tomcat" Kur'an'ı kullanarak
    ```
    sudo su - tomcat
    ```
     (Bunu yapmak için izin için süper kullanıcı şifresini size soracaktır.) 
    * komutunu kullanarak kullanıcı tomcat olarak çalışmayı durdurabilirsiniz
    ```
    exit
    ````
    * Tomcat'ın geri kalanının çoğunu yapın ve ERDDAP™ Kullanıcı olarak talimatları "tomcat" olarak yapılandırın. Daha sonra, "startup.sh" ve "shutdown.sh" senaryolarını kullanıcı olarak "tomcat" olarak çalıştırın. "
Bu yüzden Tomcat, günlük dosyalarına yazma iznine sahiptir.
    * Tomcat'ı paketledikten sonra, "apache-tomcat" dizinin ebeveyninden:
      * Apache-tomcat directory ağacını tomcat kullanıcısına değiştirin.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (Ama tomcat directory'in gerçek adını yerine) .
      * Tomcat, kullanıcı adınız veya tomcat içeren küçük bir grubun adı ve Tomcat / Tomcat / tüm yöneticileri ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Change permissions so that tomcat and the group have read, write, execute ayrıcalıks:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * "Diğer" kullanıcı izinlerini okumak, yazmak veya uygulamak için çıkarın:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Bu önemlidir, çünkü diğer kullanıcıların muhtemelen hassas bilgileri okumaktan alıkoymasını engeller ERDDAP™ Kurulum dosyaları.

### Hafıza{#memory} 

Set Tomcat'ın Çevre Değişkenleri

* Linux ve Macs:
Bir dosya oluşturun “tomcat/bin/setenv.sh " (veya Red Hat Enterprise Linux'ta \\[ REL \\] "~tomcat /conf /tomcat10.conf ") Tomcat'ın çevre değişkenlerini belirlemek.
Bu dosya "tomcat/bin/startup.sh" ve "shutdown.sh" tarafından kullanılacaktır. Dosya gibi bir şey içermelidir:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (Ancak dizin isimlerini bilgisayarınızdan uzaklaştırın) .
   (Daha önce “JRE_HOME” ayarlarsanız, bunu kaldırabilirsiniz.) 
Macs'te, muhtemelen “JAVA_HOME” ayarlamanız gerekmez.

* Windows'da:
Bir dosya oluşturun "tomcat\bin\\setenv.bat" to set Tomcat's environment variables.
Bu dosya "tomcat\bin" ve " shutdown.bat “.
Dosya gibi bir şey içermelidir:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (Ancak dizin isimlerini bilgisayarınızdan uzaklaştırın) .
Eğer bu sadece yerel test için ise, "-server".
   (Daha önce “JRE_HOME” ayarlarsanız, bunu kaldırabilirsiniz.) 

"-Xmx" ve "-Xms' hafıza ayarları önemlidir çünkü ERDDAP™ Daha fazla hafıza ile daha iyi çalışır.
Her zaman “-Xms’i “-Xmx” olarak aynı değere ayarlar.

* 32 bit İşletim Sistemleri ve 32 bit Java :
64 bit Java 32 bitten daha iyi Java Ama 32 biraz Java Sunucu gerçekten meşgul olmadığı sürece çalışacak.
Sunucudaki daha fiziksel hafıza daha iyi: 4+ GB gerçekten iyi, 2 GB tamam, daha az tavsiye edilmez.
32 bit Java Hatta bol fiziksel hafıza, Tomcat ve Java 1500M'in üzerinde "-Xmx" ayarlamaya çalışırsanız koşmayın (1200M Bazı bilgisayarlarda) .
Eğer sunucunuz 2GB'den daha az hafızaya sahipse, "-Xmx" değerini azaltır ('M'egaBytes) Bilgisayarın fiziksel hafızasının 1/2'ine.

* 64 bit İşletim Sistemleri ve 64 bit Java :
64 bit Java Sadece 64 bit işletim sistemi üzerinde çalışacak.
  * With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With Java 8, "-d64" to the Tomcat "CATALINA_OPTS' parametresi "setenv.bat" .
  * With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With Java 21, 64 bit seçtiğiniz Java Bir versiyonunu indirdiğinizde Java "64 bit".

64 bit Java Tomcat ve Java Çok yüksek "-Xmx" ve "-Xms' ayarları kullanabilir. Sunucudaki daha fiziksel hafıza daha iyi.
Basit bir öneri olarak: “-Xmx” ve “-Xms” ayarlamanızı tavsiye ediyoruz ('M'egaBytes) 1/2 (veya daha az) Bilgisayarın fiziksel hafızasından.
Tomcat'ı görebileceksin, Java Ve ERDDAP™ Aslında 64 bit modunda “küçük” aramakla çalışıyor ERDDAP 'The Daily Report email
Ya da “Büyük Aile Yöneticisi /loglar / [Giriş.txt](/docs/server-admin/additional-information#log) " dosya" (“Büyük ParentYönetmeni” belirtilmektedir [Kurulum.xml](#setupxml) ) .

#### Garbage Collection{#garbage-collection} 

* İçinde In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In ERDDAP™ " [Giriş.txt](/docs/server-admin/additional-information#log) Dosya, birçok "GC" göreceksiniz (Allocation Başarısızlık) " mesajlar.
Bu genellikle bir problem değildir. Normal olarak çalışandan sık sık bir mesajdır Java Sadece küçük bir çöpü bitirdiğini söylüyor
koleksiyon çünkü Eden Odadan çıktı (Bölüm Java Çok genç nesneler için) . Genellikle mesaj sizi gösterir
"memoryUse before-&gt;memoryUse After" (İngilizce). Bu iki sayı birbirine yakınsa, çöp toplamanın üretken olmadığı anlamına gelir.
Mesaj sadece çok sık rastlanırsa bir sorun işaretidir. (Her birkaç saniye) Ancak üretken değil ve sayılar büyük ve büyümez,
Birlikte hangisinin bunu gösterir Java Daha fazla hafızaya ihtiyacı var, hafızayı serbest bırakmak için mücadele ediyor ve hafızayı serbest bırakmıyor.
Bu stresli bir süre içinde olabilir, sonra uzaklaş. Ama devam ederse, bu bir sorun işareti.
* Eğer “java.lang.OutOfMemoryError’un içinde olduğunu görürseniz ERDDAP™ " [Giriş.txt](/docs/server-admin/additional-information#log) Dosya, dosya,
see see see see see [OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror) Problemleri nasıl teşhis edip çözme konusunda ipuçları için.
         
### İzinler{#permissions} 

*  [Linux ve Macs'te, izinleri değiştirin](#permissions) Tüm "*.sh' dosyaları "tomcat/bin/" sahibi tarafından yönetilebilir:
  ```
  chmod +x *.sh
  ```

### Fonts Fonts{#fonts} 

*  [Görüntüler için Fonts:](#fonts) Özgürü güçlü bir şekilde tercih ediyoruz [DejaVu fontları](https://dejavu-fonts.github.io/) Diğerine Java fontlar.
Bu fontları kullanmak şiddetle tavsiye edilir ancak gerekli değildir.

DejaVu fontlarını kullanmamayı tercih ederseniz, fontFamily kurulumda ayarlamanız gerekir.xml to " <fontFamily> SansSerif </fontFamily> ",
Tüm bunlar ile kullanılabilir Java Dağıtımlar. Eğer "If you set" <fontFamily> “Mevcut olmayan bir yazıya, ERDDAP™ Yüklemeyecek
Ve "log.txt" dosyasında mevcut fontların bir listesini yazdıracak. Bu fontlardan birini kullanmalısınız.

DejaVu fontlarını kullanmayı seçerseniz, lütfen " <fontFamily> “ Kurulumda ayar.xml “ <fontFamily> DejaVu Sans </fontFamily> “.

DejaVu fontlarını yüklemek için lütfen indirme [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5.522,795 bytes, MD5=33E1E61FAB06A547851ED308B4FFEF42) 
ve font dosyaları geçici bir diziye gönderme.

  * Linux'ta:
    * Linux için Java Dağıtımlar, bakınız [Bu talimatlar](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Diğerleriyle Java Dağıtımlar: "tomcat" kullanıcısı olarak, font dosyalarını "$JAVA_HOME/lib/fonts" olarak kopyalayın Java fontları bulabilir.
Unutmayın: Eğer / daha sonra yeni bir sürüme yükseltdiğinizde Java Bu fontları yeniden yüklemeniz gerekiyor.
  * Macs'te: her font dosyası için, çift tıklayın ve sonra yükleme Font.
  * Windows 7 ve 10: Windows Explorer'da tüm font dosyalarını seçin. Doğru tıklayın. Yüklemeye tıklayın.
             
### Test Tomcat{#test-tomcat} 

* Tomcat kurulumunuzu test edin.
  * Linux:
    * Kullanıcı "tomcat" olarak, "tomcat/bin/startup.sh" çalıştırın.
    * URL + ":8080 /" tarayıcınızda (E.g., [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac Mac Mac (Sistem yöneticisi kullanıcı olarak tomcat çalıştırın) :
    * Run "tomcat/bin/startup.sh".
    * URL + ":8080 /" tarayıcınızda (E.g., [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Varsayılan olarak, Tomcatınız sadece sizin tarafınızdan erişilebilir. Açık olarak erişilebilir değildir.
  * Windows yerelhost:
    * Sistem tepsisindeki Tomcat ikonuna doğru tıklayın ve "Start service" seçeneğini seçin.
    * View View View View [http://127.0.0.1:8080/](http://127.0.0.1:8080/) Ya da belki [http://localhost:8080/](http://localhost:8080/) Tarayıcınızda. Varsayılan olarak, Tomcatınız sadece sizin tarafınızdan erişilebilir. Açık olarak erişilebilir değildir.

Tomcat "Congratulations" sayfasını görmeniz gerekir.

Sorun varsa, Tomcat log dosyasını "tomcat/logs/catalina.out'da görün.

### Tomcat kurulumu ile sorun?{#troubles-with-the-tomcat-installation} 

* Linux ve Mac'de, Tomcat'a ulaşamıyorsanız veya ERDDAP™   (Ya da belki de sadece güvenlik duvarınızın dışındaki bir bilgisayardan ulaşamazsınız) ,
Tomcat 8080 port dinliyorsa test edebilirsiniz, by tiping (Kök olarak) Sunucunun bir komut satırında:

  ```
  netstat -tuplen | grep 8080
  ```

Böyle bir şeyle bir çizgi geri dönmeli:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   ("#" bazı sayısal) Ama bir “java” sürecinin (Muhtemelen Tomcat) "tcp" trafiği için port "80" üzerinde dinliyor.
Hiçbir satır iade edilmediyse, çizgi geri dönüş önemli ölçüde farklısa veya iki veya daha fazla çizgi geri döndüyse, o zaman liman ayarları ile bir sorun olabilir.

* Tomcat log dosyasını "tomcat/logs/catalina.out" olarak görün. Tomcat sorunları ve bazıları ERDDAP™ Başlangıç sorunları neredeyse her zaman orada belirtilmiştir.
Bu ilk ayarlandığında yaygındır ERDDAP™ .

* Görmeyi gör [Tomcat](https://tomcat.apache.org/) Web sitesi veya yardım için web'i arayın, ancak lütfen sahip olduğunuz sorunları ve bulduğunuz çözümleri bize bildirin.

* Görmemize bakın [Bölüm almak için ek destek](/docs/intro#support) .
             
###  ERDDAP™ Content Content Content{#erddap-content} 
3.   [“tomcat/content/erddap’ konfigürasyon dosyalarını oluşturun.](#erddap-content) 
Linux, Mac ve Windows üzerinde, indir [HeddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
Ve onu "tomcat" dizinine, "tomcat/content/erddap" oluşturma.

__Version 1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5 2024-10-14__

Bazı önceki versiyonlar da mevcuttur:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, 2022-02-16) 
    *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, 2022-10-09-09-09362 tarihli,) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, 2022-12-08-06-08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, 2023-02-27) 

#### Diğer Rehber{#other-directory} 

Red Hat Enterprise Linux için (REL) Ya da Tomcat dizisini değiştirmenize izin verilmediğiniz başka durumlar için veya istediğiniz yerde /
 the ERDDAP™ Başka bir nedenden ötürü başka bir yerde içerik rehberi (Örneğin, Tomcat yerine Jetty kullanıyorsanız) ,
Unzip "erddapContent .zip " istenen diziye (Sadece "tomcat" kullanıcısının erişimi vardır) Ve " erddapContentDirectory “Sistem mülkü
 (E.g. " erddapContentDirectory  =~tomcat/content/erddap ") Bu yüzden ERDDAP™ Bu yeni içerik rehberi bulabilir.

### Kurulum.xml{#setupxml} 

*  ["tomcat/content/erddap/setup"daki yorumları okuyun.xml "](#setupxml) İstenen değişiklikleri yapın. Kurulum.xml, ayarladığınız tüm ayarlarla dosyadır. ERDDAP™ Davranışlar.

İlk kurulum için, bu ayarları en azından değiştirebilirsiniz:
      * " <bigParentDirectory> "
      * " <emailEverythingTo> "
      * " <baseUrl> "
      * " <email...> “ ayarları”
      * " <admin...> “ ayarları”
      * " <baseHttpsUrl> " (Ne zaman ayağa kalktın https ) 

BüyükParent müdürlüğü yarattığınızda, büyük aile müdürlüğü ana rehberinden:

    * “tomcat’ın kullanıcısını “büyükParent Yöneticisi”nin sahibi yapın:
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Tomcat, kullanıcı adınız veya tomcat içeren küçük bir grubun adı ve Tomcat / Tomcat / tüm yöneticileri ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Change permissions so that tomcat and the group have read, write, execute ayrıcalıks:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * "Diğer" kullanıcı izinlerini okumak, yazmak veya uygulamak için çıkarın. Bu, okumanın muhtemelen hassas bilgileri önlemek için önemlidir
İçinde in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in ERDDAP™ Özel veri kümeleri hakkında bilgi ile giriş dosyaları ve dosyaları.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Çevre Değişkenleri{#environment-variables} 

Starting with with ERDDAP™ v2.13, ERDDAP™ Yöneticiler, bir ortam değişkeni değişkeni belirterek kurulumda herhangi bir değeri üstlenebilir.xml
Adı " ERDDAP _valueName' before running ERDDAP™ . Örneğin, " ERDDAP _baseUrl' overrides the " <baseUrl> “ değer.
Bu, dağıtma yaparken el ele alınabilir ERDDAP™ Docker gibi bir konteynerle, kurulumda standart ayarlar koyabileceğiniz gibi.xml
Ve sonra çevre değişkenleri aracılığıyla özel ayarlar tedarik edin. Gizli bilgi tedarik ederseniz ERDDAP™ Bu yöntem aracılığıyla,
Bilginin gizli kalacağını kontrol ettiğinizden emin olun. ERDDAP™ Sadece başlangıç başına bir kez çevre değişkenlerini okur,
Başlangıçın ilk ikincisinde, bunu kullanmak için bir yol: çevre değişkenlerini kurmak, başlayın ERDDAP ,
bekleye kadar bekleyelim ERDDAP™ Başladı, sonra çevre değişkenlerini unset.

###  datasets.xml  {#datasetsxml} 

* Yorumları okuyun [ **Çalışmak ile çalışmak datasets.xml Dosya** ](/docs/server-admin/datasets) . Daha sonra, aldıktan sonra ERDDAP™ running running running running
İlk defa (Genellikle sadece varsayılan datasets ile) XML'i “tomcat/content/erddap / datasets.xml "
İstediğiniz tüm veri kümelerini belirtmek için ERDDAP™ Hizmet etmek için. Bu, zamanınızın büyük kısmını geçireceksiniz
Uyanırken ERDDAP™ ve daha sonra da devam ederken ERDDAP™ .

Bir örnek görebilirsiniz [ datasets.xml GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (aksine) Şimdi veya Şimdi (Biraz daha muhtemel) Gelecekte, erddap'ın CSS dosyasını değiştirmek istiyorsanız, kopya
"tomcat/content/erddap/images/erddapStart2.css" to "tomcat/content/erddap/images/erddap2.css" and then make changes to it.
"erddap2.css" için değişiklikler sadece etkisini alır ERDDAP™ Yeniden başlatılır ve genellikle kullanıcının tarayıcının önbellek dosyalarını temizlemek gerekir.
     
 ERDDAP™ Kurulum.xml veya kurulumu doğru şekilde çalışmayacaktır. datasets.xml Dosya iyi bilgilendirilmiş bir XML dosyası değildir. Bu dosyaları düzenlemeden sonra,
Sonuç XML metnini bir XML checker'e geçmiş olarak iyi bilgilendirilmiş XML olduğunu doğrulamak için iyi bir fikirdir. [xmlvalidation](https://www.xmlvalidation.com/) .
     
### Seddap'ı yükleyin. Savaş dosyası{#install-the-erddapwar-file} 

4. Linux, Mac ve Windows, __download [Heddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war) __ into "tomcat/webapps":

__Version 2.28.0, 620,824,288 bytes, MD5=f948b2ba603f65a83ac67af43da9e4c2, 2025-08-29______

Savaş dosyası büyük çünkü harita oluşturmak için gereken yüksek çözünürlüklü, sınır ve yükseklik verileri içeriyor.

Bazı önceki versiyonlar da mevcuttur.

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 bytes, MD5=461325E97E7577EC671D50246CCFB8B, 2022-02-23) 
   *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 bytes, MD5=F2CFF805893146E932E498FDDBD519B6, 2022-10-09-09-09-06) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, 2022-12-08-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, 2023-03-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, 2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, 2024-11-07-07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 bytes, MD5=99a725108b37708e5420986c16a119, 2025-03-31-31) 
   *  [2.27.07.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 bytes, MD5=3b2086c659eeee4145ca2dff447bf4ef7, 2025-06-11-11) 

### Configure proxy (Belirli dağıtım belirli)  {#proxy} 

 ERDDAP™ Genellikle bir webserver tersin arkasında standart HTTP limanlarında servis edilmesine izin vermek için kullanılır (80 ve 443) .
SSL/TLS sonlandırma, webserver katmanında da sık sık ifade edilir. Özeller her dağıtım gereksinimlerine bağlıdır.

#### Apache Apache{#apache} 

1. "mod_proxy" ve "mod_proxy_ http " yüklenir:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Mevcut olanı Değiştirin <VirtualHost> " etiketi" (Eğer bir tane varsa) Dosyanın sonunda bir tane ekleyin:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Eğer eğer ERDDAP™ “ /erddap’tan başka bir yol üzerinde servis edilir, aynı zamanda “X-Forwarded-Prefix’in başlığını da
Yol segmenti _ before_ '/erddap'. Bu ayar bir an için uygun olacaktır ERDDAP™ Serviste servis edilende servise
" /subpath/erddap":

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Sonra Apache'yi yeniden başlatın: "/usr/sbin/apachectl -k lütufkâr " (Ama bazen farklı bir dizide) .
         
#### NGINX{#nginx} 

nginx yapılandırma dosyasında, bu başlıkları belirledi:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Eğer eğer ERDDAP™ “ /erddap’tan başka bir yol üzerinde servis edilir, aynı zamanda “X-Forwarded-Prefix’in başlığını da
Yol segmenti _ before_ '/erddap'. Bu ayar bir an için uygun olacaktır ERDDAP™ Serviste servis edilende servise
" /subpath/erddap":

```
proxy_set_header X-Forwarded-Prefix /subpath
```


NGINX almak için ve ERDDAP™ Doğru şekilde çalışmakla https Tomcat sunucusunun aşağıdaki parçaları koymanız gerekir.xml “ <Host> “ blok:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Start Tomcat{#start-tomcat} 

*  (Tomcat Web Uygulama Yöneticisi'ni kullanmayı önermiyorum. Tomcat'ı tamamen kapatıp başlatmadıysanız, er ya da geç PermGen hafıza sorunlarınız olacak.) 
*  (Linux veya Mac OS'de, Tomcat'ı çalıştırmak için özel bir kullanıcı yarattıysanız, e.g., tomcat, bu kullanıcı olarak aşağıdaki adımları yapmayı unutmayın.) 
* Tomcat zaten çalışıyorsa, Tomcat'ı kapat (Linux veya Mac OS) "tomcat/bin/shutdown.sh"
veya (Windows'da) "tomcat\bin\bin\\ shutdown.bat "

Linux'ta, “ps –ef | Grep tomcat'ın daha önce ve sonra "shutdown.sh" tomcat sürecinin durduğından emin olmak için.
Süreç kapanmadan önce listelenmelidir ve sonunda kapatmadan sonra listelenmemelidir.
Bir dakika veya iki dakika sürebilir ERDDAP™ Tamamen kapat. Sabırlı olun. Ya da kendi başına durmayacak gibi görünüyorsa, kullanın:
"kill -9 <processID> "
* Tomcat'a başlayın (Linux veya Mac OS) "tomcat/bin/startup.sh" veya (Windows'da) "tomcat\bin\\startup.bat "

## Is Is Is Is Is Is Is Is Is Is Is Is Is ERDDAP™ koşmak?{#is-erddap-running} 

Görmeye çalışmak için bir tarayıcı kullanınhttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ Herhangi bir veri setleri yüklenmeden başlar. Datasets bir arka planda yüklenir ve bu yüzden bir tane -bir tane kullanılabilir.

### Sorun Giderme{#troubleshooting} 

* Bir kullanıcıdan bir istek geldiğinde, Apache'ye gider (Linux ve Mac OS bilgisayarları) Sonra Tomcat, sonra ERDDAP™ .
* Apache’ye ne geldiğini görebilirsiniz (Ve ilgili hatalar) Apache log dosyalarında.
*    [You You You You You](/docs/server-admin/additional-information#tomcat-logs) Tomcat'a ne geldiğini görebilir (Ve ilgili hatalar) 
Tomcat log dosyalarında ("tomcat/logs/catalina.out" ve bu dizinin diğer dosyaları) .
*    [You You You You You](/docs/server-admin/additional-information#log) Ne geldiğini görebilir ERDDAP , teşhis mesajları ERDDAP ,
ve hata mesajları ERDDAP Ama içinde ERDDAP™ " <bigParentDirectory> /loglar /log.txt' dosyası.
* Tomcat başlamaz ERDDAP™ Tomcat'a kadar bir istek alır ERDDAP™ . Bu yüzden Tomcat log dosyalarında görebilirsiniz eğer öyleyse
Başlamaya başladı ERDDAP™ Ya da bu girişimle ilgili bir hata mesajı varsa.
* When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When ERDDAP™ Başlıyor, eskileri yeniden adlandırıyor ERDDAP™ log.txt file ("logArchived At At At At At At At At At At At At At At At At At At At At At At At <CurrentTime> .txt') Ve yeni bir log.txt dosyası yaratır.
Yani “log.txt’ dosyası eskiyse, bu bir işarettir. ERDDAP™ Son zamanlarda yeniden başlamadı. ERDDAP™ Bir buffer için log bilgileri yazın
Ve sadece düzenli olarak giriş dosyasına buffer yazar, ancak zorlayabilirsiniz ERDDAP™ Buffer'ı ziyaret ederek log dosyasına yazın
" /erddap/status.html “.

### Sorun: Eski Sürümü Java  {#trouble-old-version-of-java} 

Bir versiyonunu kullanıyorsanız Java Bu çok yaşlı çünkü ERDDAP , ERDDAP™ Koşmayacak ve Tomcat'ın log dosyasında bir hata mesajı göreceksiniz

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Çözüm, en son sürümüne güncellemek Java Tomcat'ın onu kullandığından emin olun.

### Sorun: Yavaş Startup First Time{#trouble-slow-startup-first-time} 

Tomcat ilk kez bir uygulama yapmak zorunda ERDDAP™ Başlanır; özellikle de ‘erddap.war’ dosyasının paketlenmesi gerekir.
 (Hangi gibi .zip Dosya dosyası) . Bazı sunucularda, ilk görüş ERDDAP™ tezgahlar (30 saniye?) Bu çalışma bitinceye kadar.
Diğer sunucularda, ilk deneme hemen başarısız olacaktır. Ama 30 saniye beklerseniz ve tekrar deneyin, başarılı olacaktır ERDDAP™ Doğru şekilde kuruldu.

Bunun için bir düzeltme yoktur. Bu sadece Tomcat nasıl çalışır. Ama sadece yeni bir sürüm yükledikten sonra ilk kez meydana gelir ERDDAP™ .

## Shut down and restart{#shut-down-and-restart} 

Gelecekte, kapatılması için (Ve yeniden başlayın)   ERDDAP™ gör [How to Shut Down and Restart Tomcat and ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Sorun?{#trouble} 

Sorunlar Tomcat veya ERDDAP™ ?? Görmemize bakın [Bölüm almak için ek destek](/docs/intro#support) .

## Yeni Sürümlerin E-posta Bildirimi ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Yeni bir versiyon ne zaman bir e-posta almak istiyorsanız ERDDAP™ Mevcut veya diğer önemli ERDDAP™ duyurular,
Katılabilirsiniz ERDDAP™ duyurular listesi [İşte burada burada](https://groups.google.com/g/erddap-announce) . Bu liste her üç ayda yaklaşık bir e-postadır.

## Özelleştirin{#customize} 

*  [Özelleştirin ERDDAP™ Organizasyonunuzu vurgulamak için (Değil değil NOAA   ERD ) .](#customize) 
* Tüm en üstteki görünen bayrağı değiştir ERDDAP™ .html sayfalar "The" (İngilizce). <startBodyHtml5> “Senin içinde etiket datasets.xml “ Dosya.
(Bir tane değilse, varsayılanı kopyalayın ERDDAP™ 'Intomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml' Dosya dosyası
" datasets.xml “Ve onu düzenler.) Örneğin, yapabilirsiniz:
  * Farklı bir görüntü kullanın (i.e., organizasyonunuzun logosu) .
  * Arka rengini değiştirin.
  * Değişim " ERDDAP™ "To "_ YourOrganization_'s ERDDAP™ " " ""
  * "Easier bilimsel verilere erişim", "Easier access to _ YourOrganization_'s data".
  * "Seninle bağlantı kurmak" bağlantılarınızı kuruluş ve finansman kaynaklarınıza bağlar.
* Ev sayfasının sol tarafında “bilgiyi” ayarlayarak değiştirin. <theShortDescriptionHtml> “Senin içinde etiket datasets.xml “ Dosya.
(Bir tane değilse, varsayılanı kopyalayın ERDDAP™ 'Intomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml' Dosya dosyası
" datasets.xml “Ve onu düzenler.) Örneğin, yapabilirsiniz:
  * Organizasyonunuzun ve/veya grubun ne yaptığını açıklayın.
  * Ne tür bir veriyi bu şekilde açıklayın ERDDAP™ Var.
  * Tarayıcı sekmelerinde görünen ikonu değiştirmek için, kuruluşunuzun faviconunu koyun. ico in "tomcat/content/erddap/images/".
See See See See Seehttps://en.wikipedia.org/wiki/Favicon.
