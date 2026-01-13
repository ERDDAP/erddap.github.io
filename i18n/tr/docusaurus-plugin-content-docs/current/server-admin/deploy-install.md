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
Docker Boşluk ve izleme kurmak için kolay yollar sunuyoruz, daha fazlasını okuyun [Docker belgeleri](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Docker kullanıyorsanız, muhtemelen Docker versiyonunu tercih edersiniz.
Bulut hizmetleri üzerinde koşmak arıyorsanız muhtemelen Docker versiyonunu tercih edeceksiniz.
*  **Amazon Amazon Amazon** – Eğer yükleniyorsanız ERDDAP™ Amazon Web Services EC2 örneğinde, bunu görün [Amazon Web Services Genel Bakış](/docs/server-admin/additional-information#amazon) İlk olarak.
*  **Linux ve Macs** – ERDDAP™ Linux ve Mac bilgisayarlarında harika çalışır. Aşağıdaki talimatları görün.
*  **Windows Windows Windows** – Windows test için iyi ERDDAP™ Ve kişisel kullanım için (Aşağıdaki talimatları görmek) ,
Ancak bunu halk için kullanmayı önermiyoruz ERDDAP™ Dağıtımlar. Koşu Koşu ERDDAP™ Windows'da sorunlar olabilir:
Özellikle, özellikle, ERDDAP™ dosyaları çabucak silemez ve / veya yeniden adlandırmayabilir. Bu muhtemelen antivirüs yazılımı nedeniyle
   (E.g., McAfee ve Norton) Hangi dosyaları virüsler için kontrol eder. Eğer bu sorunla karşılaşırsanız
(bu, hata mesajları tarafından görülebilir [Giriş.txt](/docs/server-admin/additional-information#log) Dosya gibi dosya
“Unable to delete...”) antivirüs yazılımının ayarlarını değiştirmek kısmen sorunu hafifletebilir. Ya da bunun yerine bir Linux veya Mac sunucusu kullanmayı düşünün.

 **Standart standart ERDDAP™ Linux, Macs ve Windows bilgisayarlar için yükleme talimatları:** 

0. Herhangi bir bağımlılıkların kurulu olduğundan emin olun. Windows makinelerinde (Linux ve Mac) , csh'e ihtiyacınız var.

##  Java  {#java} 

1.  [For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For ERDDAP™ v2.29.0+, set up Java 25.](#java) 
Güvenlik nedenleri için, neredeyse her zaman en son sürümünü kullanmak en iyisidir Java 25.
Lütfen indirmek ve en son sürümü yüklemek
    [Kabulium'un AçıkJDK (Temin) 25 (LTS) ](https://adoptium.net/temurin/releases/?version=25) .
Yüklemeyi doğrulamak için, koşmak `/javaJreBin Yönetmeni /java -` Örneğin,
    `/usr/local/jdk-25.0.1+8/jre/bin/javavava -` .

    ERDDAP™ İşlerle birlikte çalışır Java Diğer kaynaklardan, ama biz Kabulium'u öneriyoruz çünkü ana, topluluk destekli,
ücretsiz ücretsiz ücretsiz ücretsiz (Bira ve konuşma olarak) versiyonu Java 25, Long Term Support (Uzun yıllar boyunca ücretsiz yükseltmeler, ilk sürüm) .
Güvenlik nedenleri için lütfen güncellemenizi ERDDAP 's version of' Java periyodik olarak yeni versiyonları olarak Java 25 Buyium'dan kullanılabilir.

    ERDDAP™ 25, diğer versiyonlarla yaygın olarak test edildi ve yaygın olarak kullanıldı. Çeşitli nedenlerle, diğer versiyonlarını test etmiyoruz veya diğer sürümlerini desteklemiyoruz Java .
     
## Tomcat{#tomcat} 

2.  [Set up up](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat en yaygın kullanılan Java Uygulama Server,
hangisidir Java İşletim sistemi ağ hizmetleri ve ağ hizmetleri arasında duran yazılımlar Java sunucu yazılımı gibi ERDDAP™ .
Free ve Open Source Software (FOSS) .

Başkasını kullanabilirsiniz Java Uygulama Server (E.g., Jetty) Ama sadece Tomcat ile test ediyoruz ve destekliyoruz.

   * Tomcat'ı indirin ve sunucunuzda veya PC'de paketlenme.
Güvenlik nedenleri için, Tomcat 10'un son versiyonunu kullanmak neredeyse her zaman en iyisidir (9 ve aşağıda kabul edilemez) 
Hangi ile çalışmak için tasarlanmıştır Java 25 veya yeni. Aşağıda, Tomcat rehberi olarak adlandırılacaktır `tomcat` .

__Warning&#33;__ Zaten bir Tomcat başka bir web uygulaması çalıştırıyorsanız (Özellikle THREDDS) , yüklemenizi tavsiye ediyoruz ERDDAP™ in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in
      [ikinci bir Tomcat](/docs/server-admin/additional-information#second-tomcat) Çünkü ERDDAP™ Farklı Tomcat ayarlarına ihtiyaç vardır
Ve hafıza için diğer uygulamalarla uğraşmak zorunda olmamalıdır.

     * Linux'ta, ["Core" indir .gz " Tomcat dağıtım](https://tomcat.apache.org/download-10.cgi) Ve onu paketle.
Bunu paketlememizi tavsiye ederiz `/usr/local` .
     * Mac'te, Tomcat muhtemelen zaten kuruldu `/Tom / Tomcat` Ama bunu Tomcat 10'un son versiyonuna güncellemeli.
Eğer indirseniz, ["Core" indir .gz " Tomcat dağıtım](https://tomcat.apache.org/download-10.cgi) Ve onu paketsiz `/Tom / Tomcat` .
     * Windows'da, Windows'da yapabilirsiniz ["Core" "zip" Tomcat dağıtımını indirin](https://tomcat.apache.org/download-10.cgi) 
        (Bu, Windows kayıt ile dağınık değildir ve bir DOS komut satırından hangi kontrol edersiniz) ve uygun bir dizide paketlenme.
        (Geliştirme için, "Core" "zip" dağıtımını kullanıyoruz. Biz bir şey yapıyoruz `/ programlar` Rehber ve orada paketin.) 
Ya da daha fazla özellik içeren "Core" "64-bit Windows zip" dağıtımını indirebilirsiniz.
Eğer dağıtım bir Windows installer ise, muhtemelen Tomcat'ı koymak olacaktır, örneğin, `/Program Files /apache-tomcat-10.0.23` .
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - In the `tomcat/conf /server.xml` Dosya, her iki değişiklik yapmanız gereken iki değişiklik var ` <Connector> ` etiketler
   (Bir kişi için `&lt;Connector port="80"` Ve biri için `&lt;Conector port="8443"` ) .
   1.  (Önerilen önerilen önerilen önerilen) Arttırmayı artırın `bağlantı bağlantısı Timeout` parametre değeri, belki 300000 (milisans, 5 dakika) .
   2.  (Önerilen önerilen önerilen önerilen) Yeni bir parametre ekleyin: `RahatQueryChars="[] | " " ""` . Bu Seçmeli ve biraz daha az güvenli,
Ancak kullanıcılar için bu karakterleri bir kullanıcının isteği URL'sinin parametrelerinde gerçekleştiğinde ortadan kaldırır.
             
### İçerik.xml{#contentxml} 

* bağlam.xml – Kaynaklar `tomcat /conf /context.xml` Sağdan önce ` </Context> ` etiket, Kaynaklar etiketini değiştirin
   (veya ekle, zaten orada değilse) Önbelleği ayarlamak için MaxSize parametre 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Bu, katalina'da birçok uyarıdan kaçınır. Tüm bunların hepsiyle başlıyoruz
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache Timeoutout{#apache-timeout} 

* Linux bilgisayarlarda, Apache zamanout ayarlarını değiştirir, böylece o zaman alıcı kullanıcı istekleri zaman tükenmez
   (Sık sık "Proxy" veya "Bad Gateway" hatası olarak görünen şeyle) . Kök kullanıcı olarak:
  * Apache'yi Değiştirin ` http d.conf` Dosya dosyası (Genellikle genellikle içeride `/ http d/conf /` ) :
    * Mevcut değişikliği değiştir ` <Timeout> ` ayar ayar ayar ayarı ayar ayar ayar ayar ayarı ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayarı ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar (veya dosyayı sonunda bir tane ekleyin) 3600 (saniye saniye saniye saniye saniye) Ancak varsayılan 60 veya 120 saniye yerine.
    * Mevcut değişikliği değiştir ` <ProxyTimeout> ` ayar ayar ayar ayarı ayar ayar ayar ayar ayarı ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayarı ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar (veya dosyayı sonunda bir tane ekleyin) 3600 (saniye saniye saniye saniye saniye) Ancak varsayılan 60 veya 120 saniye yerine.
  * Restart Apache: `/usr/sbin/apachectl -k lütufkâr`   (Ama bazen farklı bir dizide) .

### Güvenlik Güvenliği{#security} 
         
* Güvenlik tavsiyesi: See See See See [Bu talimatlar](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) Güvenliği artırmak için
Tomcat kurulumunuz, özellikle halk sunucular için.
         
* Halk için ERDDAP™ Linux ve Macs üzerinde yüklemeler, Tomcat kurmak en iyisidir (Program programı) Kullanıcıya ait olarak `tomcat` 
   (Sınırlı izni olan ayrı bir kullanıcı ve hangisi [Şifre yok](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Böylece, sadece süper kullanıcı kullanıcı kullanıcı olarak hareket edebilir `tomcat` . Bu, hackerların sunucunuza kullanıcı olarak giriş yapmak için imkansız hale getiriyor `tomcat` .
Ve herhangi bir durumda, bunu yapmalısın, böylece `tomcat` Kullanıcı, sunucunun dosya sistemi üzerinde çok sınırlı izinlere sahiptir (read+write+execute ayrıcalıklar
Çünkü `apache-tomcat` Rehber ağacı ve ` <bigParentDirectory> ` ve sadece yönetmenler için ayrıcalıklar, verilerle ERDDAP™ erişime ihtiyaç vardır).
  * Yaratabilirsiniz `tomcat` kullanıcı hesabı (Hangi şifreye sahip değil) Komutanı kullanarak:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Kullanıcı olarak çalışmaya geçebilirsin `tomcat` Kur'an'ı kullanarak
    ```
    sudo su - tomcat
    ```
     (Bunu yapmak için izin için süper kullanıcı şifresini size soracaktır.) 
    * komutunu kullanarak kullanıcı tomcat olarak çalışmayı durdurabilirsiniz
    ```
    exit
    ````
    * Tomcat'ın geri kalanının çoğunu yapın ve ERDDAP™ Kullanıcı olarak kurulum talimatları `tomcat` . Daha sonra, koş `startup.sh` ve `kapatma. sh` Kullanıcı olarak senaryolar `tomcat` 
Bu yüzden Tomcat, günlük dosyalarına yazma iznine sahiptir.
    * Tomcat'tan sonra, ebeveyninden `apache-tomcat` rehberi:
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
Bir dosya oluşturun `tomcat/bin/setenv.sh`   (veya Red Hat Enterprise Linux'ta \\[ REL \\] , düzenlemek `~tomcat /conf /tomcat10.conf` ) Tomcat'ın çevre değişkenlerini belirlemek.
Bu dosya tarafından kullanılacak `tomcat/bin/startup.sh` ve `kapatma. sh` . Dosya gibi bir şey içermelidir:
  ```
  export JAVA_HOME=/usr/local/jdk-25.0.1+8
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (Ancak dizin isimlerini bilgisayarınızın dışına çıkarın) .
   (Daha önce ayarlarsanız `JRE_HOME` Bunu kaldırabilirsiniz.) 
Macs'te, muhtemelen ayarlamanız gerekmez `JAVA_HOME` .

* Windows'da:
Bir dosya oluşturun `tomcat\bin\\setenv.bat` Tomcat'ın çevre değişkenlerini belirlemek.
Bu dosya tarafından kullanılacak `tomcat\bin'in başlangıcı.bat` ve ` shutdown.bat ` .
Dosya gibi bir şey içermelidir:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-25.0.1+8"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (Ancak dizin isimlerini bilgisayarınızın dışına çıkarın) .
Eğer bu sadece yerel test için ise, "-server".
   (Daha önce ayarlarsanız `JRE_HOME` Bunu kaldırabilirsiniz.) 

The The The The The The The The `-Xmx` ve `-Xms` hafıza ayarları önemlidir çünkü ERDDAP™ Daha fazla hafıza ile daha iyi çalışır.
Her zaman ayarlandığında `-Xms` Aynı değere aynı değer `-Xmx` .

* 32 bit İşletim Sistemleri ve 32 bit Java :
64 bit Java 32 bitten daha iyi Java Ama 32 biraz Java Sunucu gerçekten meşgul olmadığı sürece çalışacak.
Sunucudaki daha fiziksel hafıza daha iyi: 4+ GB gerçekten iyi, 2 GB tamam, daha az tavsiye edilmez.
32 bit Java Hatta bol fiziksel hafıza, Tomcat ve Java ayarlamaya çalışırsanız koşmaz `-Xmx` 1500M'in üzerinde çok fazla (1200M Bazı bilgisayarlarda) .
Eğer sunucunuz 2GB'den daha az hafızaya sahipse, azalır `-Xmx` değer değeri değer değeri ('M'egaBytes) Bilgisayarın fiziksel hafızasının 1/2'ine.

* 64 bit İşletim Sistemleri ve 64 bit Java :
64 bit Java Sadece 64 bit işletim sistemi üzerinde çalışacak.
  * With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With Java 8, eklemek zorundasınız `-d64` Tomcat'a `CATALINA_OPTS` parametre içinde parametre `Setenv.bat` .
  * With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With Java 21, 64 bit seçtiğiniz Java Bir versiyonunu indirdiğinizde Java "64 bit" işaret etti.

64 bit Java Tomcat ve Java Çok yüksek kullanabilir `-Xmx` ve `-Xms` ayarlar. Sunucudaki daha fiziksel hafıza daha iyi.
Basit bir öneri olarak: ayarladığınızı öneriyoruz `-Xmx` ve `-Xms` toklanmak için ('M'egaBytes) 1/2 (veya daha az) Bilgisayarın fiziksel hafızasından.
Tomcat'ı görebileceksin, Java Ve ERDDAP™ Aslında 64 bit modunda “küçük” aramakla çalışıyor ERDDAP 'The Daily Report email
veya `BüyükParentYönetmen /loglar / [Giriş.txt](/docs/server-admin/additional-information#log) ` Dosya dosyası ( `Büyük Parent Yönetmeny` belirtilmiştir. [Kurulum.xml](#setupxml) ) .

#### Garbage Collection{#garbage-collection} 

* In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In ERDDAP™ " [Giriş.txt](/docs/server-admin/additional-information#log) Dosya, birçok "GC" göreceksiniz (Allocation Başarısızlık) " mesajları.
Bu genellikle bir problem değildir. Normalde ameliyattan sık sık bir mesajdır Java Sadece küçük bir çöpü bitirdiğini söylüyor
koleksiyon çünkü Eden Odadan çıktı (Bölüm Java Çok genç nesneler için) . Genellikle mesaj sizi gösterir
   `memoryUse before-&gt;memoryUse After-&gt;` . Bu iki sayı birbirine yakınsa, çöp toplamanın üretken olmadığı anlamına gelir.
Mesaj sadece çok sık rastlanırsa bir sorun işaretidir. (Her birkaç saniye) Ancak üretken değil ve sayılar büyük ve büyümez,
Birlikte hangisinin bunu gösterir Java Daha fazla hafızaya ihtiyaç duyar, hafızayı serbest bırakmak için mücadele eder ve hafızayı serbest bırakamaz.
Bu stresli bir süre içinde olabilir, sonra uzaklaş. Ama devam ederse, bu bir sorun işareti.
* Görseniz `java.lang.OutOfMemoryError` s içinde ERDDAP™ " [Giriş.txt](/docs/server-admin/additional-information#log) Dosya, dosya,
see see see see see see [OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror) Problemleri nasıl teşhis edip çözme konusunda ipuçları için.
         
### İzinler{#permissions} 

*  [Linux ve Macs'te, izinleri değiştirin](#permissions) Tüm bunların hepsi `*.shsh` dosyaları içinde dosyalar `tomcat /bin /` Sahibi tarafından yönetilebilir olmak:
  ```
  chmod +x *.sh
  ```

### Fonts Fonts{#fonts} 

*  [Görüntüler için Fonts:](#fonts) Özgürü güçlü bir şekilde tercih ediyoruz [DejaVu fontları](https://dejavu-fonts.github.io/) Diğerine Java fontlar.
Bu fontları kullanmak şiddetle tavsiye edilir ancak gerekli değildir.

DejaVu fontlarını kullanmamayı tercih ederseniz, fontFamily kurulumda ayarlamanız gerekir.xml to use the DejaVu fonts, you need to change the typeFamily setting in installation.xml to order.xml to order.xml to use the DejaVu fonts ` <fontFamily> SansSerif </fontFamily> ` ,
Tüm bunlar ile kullanılabilir Java Dağıtımlar. Eğer ayarlarsanız ` <fontFamily> ` Mevcut olmayan bir yazının adına, ERDDAP™ Yüklemeyecek
Ve mevcut fontların bir listesini yazdıracak `Giriş.txt` Dosya. Bu fontlardan birini kullanmalısınız.

DejaVu fontlarını kullanmayı seçerseniz lütfen emin olun ` <fontFamily> ` Kurulumda ayarlanır.xml is setting in installation.xml is setting in setting.xml.xml is setting ` <fontFamily> DejaVu Sans </fontFamily> ` .

DejaVu fontlarını yüklemek için lütfen indirme [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5.522,795 bytes, MD5=33E1E61FAB06A547851ED308B4FFEF42) 
ve font dosyaları geçici bir diziye gönderme.

  * Linux'ta:
    * Linux için Java Dağıtımlar, bakınız [Bu talimatlar](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Diğerleriyle Java Dağıtımlar: As the As the `tomcat` Kullanıcı, font dosyalarını kopyalayın `$JAVA_HOME/lib/fonts` Bu yüzden Java fontları bulabilir.
Unutmayın: Eğer / daha sonra yeni bir sürüme yükseltdiğinizde Java Bu fontları yeniden yüklemeniz gerekiyor.
  * Macs'te: her font dosyası için çift tıklayın ve sonra Yükleme Font'e tıklayın.
  * Windows 7 ve 10: Windows Explorer'da tüm font dosyalarını seçin. Doğru tıklama. Yüklemeye tıklayın.
             
### Test Tomcat{#test-tomcat} 

* Tomcat kurulumunuzu test edin.
  * Linux:
    * Kullanıcı "tomcat" olarak, koşmak `tomcat/bin/startup.sh` .
    * URL + ":8080 /" tarayıcınızda (E.g., [ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac Mac Mac (Sistem yöneticisi kullanıcı olarak tomcat çalıştırın) :
    * Run Run Run `tomcat/bin/startup.sh` .
    * URL + ":8080 /" tarayıcınızda (E.g., [ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Varsayılan olarak, Tomcatınız sadece sizin tarafınızdan erişilebilir. Açık olarak erişilebilir değildir.
  * Windows yerelhost:
    * Sistem tepsisindeki Tomcat ikonuna doğru tıklayın ve "Start service" seçeneğini seçin.
    * View View View View [ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/) Ya da belki [ http://localhost:8080/ ](http://localhost:8080/) Tarayıcınızda. Varsayılan olarak, Tomcatınız sadece sizin tarafınızdan erişilebilir. Açık olarak erişilebilir değildir.

Tomcat "Congratulations" sayfasını görmeniz gerekir.

Sorun varsa, Tomcat log dosyasını görmek `tomcat/logs/catalina.out` .

### Tomcat kurulumu ile sorun?{#troubles-with-the-tomcat-installation} 

* Linux ve Mac'te, Tomcat'a ulaşamıyorsanız veya ERDDAP™   (Ya da belki sadece güvenlik duvarınızın dışındaki bir bilgisayardan ulaşamazsınız) ,
Tomcat 8080 port dinliyorsa test edebilirsiniz, by tiping (Kök olarak) Sunucunun bir komut satırında:

  ```
  netstat -tuplen | grep 8080
  ```

Böyle bir şeyle bir çizgi geri dönmeli:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede? `# # # #` Bazı sayısal) Bunun üzerine yemin ederim ki `java` süreç süreci (Muhtemelen Tomcat) "tcp" trafiği için port "80" üzerinde dinliyor.
Hiçbir satır iade edilmediyse, çizgi geri döndüyse veya iki veya daha fazla çizgi geri döndüyse, o zaman liman ayarları ile bir sorun olabilir.

* Tomcat log dosyasını görün `tomcat/logs/catalina.out` . Tomcat sorunları ve bazıları ERDDAP™ Başlangıç sorunları neredeyse her zaman orada belirtilmiştir.
Bu ilk ayarlandığında yaygındır ERDDAP™ .

* Görün bakalım, [Tomcat](https://tomcat.apache.org/) Web sitesi veya yardım için web'i arayın, ancak lütfen sahip olduğunuz sorunları ve bulduğunuz çözümleri bize bildirin.

* Görmemize bakın [Bölüm almak için ek destek](/docs/intro#support) .
             
###  ERDDAP™ Content Content Content{#erddap-content} 
3.   [Set up the the `tomcat/content/erddap` konfigürasyon dosyaları.](#erddap-content) 
Linux, Mac ve Windows üzerinde, indir [HeddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip) 
Ve bunu kabul etme `tomcat` Rehber, oluşturmak `tomcat/content/erddap` .

__Version 1.0.1, 20683 bytes, MD5=98a8099e7e674da59fe35e9c96efa7b5, 2025-06

Bazı önceki versiyonlar da mevcuttur:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, 2022-02-16) 
    *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, 2022-10-09-09-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, 2022-12-08-08--08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, 2023-02-27) 

#### Diğer Rehber{#other-directory} 

Red Hat Enterprise Linux için (REL) Ya da Tomcat directory'i değiştirmenize izin verilmediğiniz başka durumlar için ya da istediğiniz yerde /ned
 the ERDDAP™ Başka bir nedenden dolayı başka bir yerde içerik rehberi (Örneğin, Tomcat yerine Jetty kullanıyorsanız) ,
Unzip `HeddapContent .zip ` İstenen dizinin içine (Sadece hangisine `tomcat` Kullanıcı erişimine sahiptir) Ve ayarlayın ` erddapContentDirectory ` sistem mülk sistemi
 (E.g. ` erddapContentDirectory  =~tomcat/content/erddap ` ) Bu yüzden ERDDAP™ Bu yeni içerik rehberi bulabilir.

### Kurulum.xml{#setupxml} 

*  [Yorumları okuyun `tomcat/content/erddap/setup.xml` ](#setupxml) İstenen değişiklikleri yapın. Kurulum.xml, ayarladığınız tüm ayarlarla dosyadır. ERDDAP™ Davranışlar.

İlk kurulum için, bu ayarları en azından değiştirebilirsiniz:
      *  ` <bigParentDirectory> ` 
      *  ` <emailEverythingTo> ` 
      *  ` <baseUrl> ` 
      *  ` <email...> ` ayarlar
      *  ` <admin...> ` ayarlar
      *  ` <baseHttpsUrl> `   (Ne zaman ayağa kalktın https ) 

BüyükParentYönetmeni yaratırken, büyük aile müdürlüğü ana rehberinden:

    * Make the the `tomcat` Kullanıcının sahibi `Büyük Parent Yönetmeny` :
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
in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in ERDDAP™ Özel veri kümeleri hakkında bilgi ile giriş dosyaları ve dosyaları.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Çevre Değişkenleri{#environment-variables} 

Starting with with ERDDAP™ v2.13, ERDDAP™ Yöneticiler, bir ortam değişkeni değişkeni belirterek kurulumda herhangi bir değere sahip olabilirler.xml
Adının adı ` ERDDAP _valueName` Daha önce koşmadan önce ERDDAP™ . Örneğin, kullanın ` ERDDAP _baseUrl` Overrides the ` <baseUrl> ` değer.
Bu, dağıtma yaparken el ele alınabilir ERDDAP™ Docker gibi bir konteynerle, kurulumda standart ayarlar koyabileceğiniz gibi.xml
Ve sonra çevre değişkenleri aracılığıyla özel ayarlar tedarik edin. Gizli bilgi tedarik ederseniz ERDDAP™ Bu yöntem aracılığıyla,
Bilginin gizli kalacağını kontrol ettiğinizden emin olun. ERDDAP™ Sadece başlangıç başına bir kez çevre değişkenlerini okur,
Başlangıcın ilk ikincisinde, bunu kullanmak için bir yol: çevre değişkenlerini kurmak, başlayın ERDDAP ,
bekleye kadar bekleyelim ERDDAP™ Başladı, sonra çevre değişkenlerini unset.

###  datasets.xml  {#datasetsxml} 

* Yorumları okuyun [ **Çalışmak ile çalışmak datasets.xml Dosya** ](/docs/server-admin/datasets) . Daha sonra, aldıktan sonra ERDDAP™ running running running running
İlk defa (Genellikle sadece varsayılan datasets ile) , XML'i XML'i değiştireceksiniz `tomcat/content/erddap / datasets.xml ` 
İstediğiniz tüm veri kümelerini belirtmek için ERDDAP™ Hizmet etmek için. Bu, zamanınızın büyük kısmını geçireceksiniz
Uyanırken ERDDAP™ ve daha sonra da devam ederken ERDDAP™ .

Bir örnek görebilirsiniz [ datasets.xml GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (aksine) Şimdi veya Şimdi (Biraz daha muhtemel) Gelecekte, erddap'ın CSS dosyasını değiştirmek istiyorsanız, kopya
   `tomcat/content/erddap/images/erddapStart2.css` toklanmak için `tomcat/content/erddap/images/erddap2.css` Ve sonra ona değişiklikler yapın.
Değişikliklerin değişmesi `erddap2.css` Sadece etki alır zaman ERDDAP™ Yeniden başlatılır ve genellikle kullanıcının tarayıcının önbellek dosyalarını temizlemek gerekir.
     
 ERDDAP™ Kurulum.xml veya kurulumu doğru şekilde çalışmayacaktır. datasets.xml Dosya iyi bilgilendirilmiş bir XML dosyası değildir. Bu dosyaları düzenlemeden sonra,
Sonuç XML metnini bir XML çekerine geçmiş olarak iyi bilgilendirilmiş XML olduğunu doğrulamak için iyi bir fikirdir. [xmlvalidation](https://www.xmlvalidation.com/) .
     
### Erddap'ı yükleyin. Savaş dosyası{#install-the-erddapwar-file} 

4. Linux, Mac ve Windows, __download [Heddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) __ into __ into __ `tomcat /webapps` :

__Version 2.29.0, 706,788,135 bytes, MD5=A5ED0DCC8D46CA27640FFEB8CE4A8560 12-15-2025__

Savaş dosyası büyük çünkü harita oluşturmak için gereken yüksek çözünürlüklü, sınır ve yükseklik verileri içeriyor.

Bazı önceki versiyonlar da mevcuttur.

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 bytes, MD5=461325E97E7577EC671D50246CCFB8B, 2022-02-23) 
   *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 bytes, MD5=F2CFF805893146E932E498FDDBD519B6, 2022-10-09-09-06) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, 2022-12-08-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, 2023-03-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, 2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, 2024-11-07-07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 bytes, MD5=99a725108b37708e5420986c16a119, 2025-03-31) 
   *  [2.27.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 bytes, MD5=3b2086c659eeee4145ca2dff447bf4ef7, 2025-06-11-11) 
   *  [2.28.1](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war)   (622,676,238 bytes, MD5=48b4226045f950c8a8d69ef9521b9bc9) 

### Configure proxy (Belirli dağıtım belirli)  {#proxy} 

 ERDDAP™ Genellikle, standart HTTP limanlarında servis edilmesine izin vermek için bir webserver tersin arkasında kullanılır (80 ve 443) .
SSL/TLS sonlandırma, webserver katmanında da sık sık ifade edilir. Özeller her bir dağıtım gereksinimlerine bağlıdır.

#### Apache Apache{#apache} 

1. Bunu sağlamak için emin olun. `mod_proxy` ve `mod_proxy_ http ` Yükleniyor:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Mevcutları Değiştirin ` <VirtualHost> ` etiket (Eğer bir tane varsa) Dosyanın sonunda bir tane ekleyin:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

If if if if if if if if if if if if if if if if if if if if if if if if if if if if if ERDDAP™ Diğer bir yolda servis edilir `/erddap` Ayrıca set the `X-Forwarded-Prefix` Başlara
Yol segmenti _ before_ `/erddap` . Bu ayar bir an için uygun olacaktır ERDDAP™ Serviste servis edilende servise
 `/subpath/erddap` :

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Sonra Apache'yi yeniden başlatın: `/usr/sbin/apachectl -k lütufkâr`   (Ama bazen farklı bir dizide) .
         
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

If if if if if if if if if if if if if if if if if if if if if if if if if if if if if ERDDAP™ Diğer bir yolda servis edilir `/erddap` Ayrıca set the `X-Forwarded-Prefix` Başlara
Yol segmenti _ before_ `/erddap` . Bu ayar bir an için uygun olacaktır ERDDAP™ Serviste servis edilende servise
 `/subpath/erddap` :

```
proxy_set_header X-Forwarded-Prefix /subpath
```


NGINX almak için ve ERDDAP™ Doğru şekilde çalışmakla https Tomcat sunucusunun aşağıdaki parçaları koymanız gerekir.xml ` <Host> ` Blok: blok:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Start Tomcat{#start-tomcat} 

*  (Tomcat Web Application Manager'ı kullanmayı önermiyorum. Tomcat'ı tamamen kapatıp başlatmadıysanız, er ya da geç PermGen hafıza sorunlarınız olacak.) 
*  (Linux veya Mac OS'de, Tomcat'ı çalıştırmak için özel bir kullanıcı yarattıysanız, e.g., tomcat, bu kullanıcı olarak aşağıdaki adımları yapmayı unutmayın.) 
* Tomcat zaten çalışıyorsa, Tomcat'ı kapat (Linux veya Mac OS)   `tomcat/bin/shutdown.sh` 
veya (Windows in Windows)   `tomcat\bin\bin\\ shutdown.bat ` 

Linux'ta, kullanın `ps -ef | Grep tomcat` Daha önce ve sonra `kapatma. sh` Tomcat sürecinin durduğından emin olmak.
Süreç kapanmadan önce listelenmelidir ve sonunda kapatmadan sonra listelenmemelidir.
Bir dakika veya iki dakika sürebilir ERDDAP™ Tamamen kapat. Sabırlı olun. Ya da kendi başına durmayacak gibi görünüyorsa, kullanın:
   `Kill -9 <processID> ` 
* Tomcat'a başlayın (Linux veya Mac OS)   `tomcat/bin/startup.sh` veya (Windows in Windows)   `tomcat\bin'in başlangıcı.bat` 

## Is Is Is Is Is Is Is Is Is Is Is Is Is ERDDAP™ koşmak?{#is-erddap-running} 

Görmeye çalışmak için bir tarayıcı kullanın http://www.YourServer.org/erddap/status.html.
 
 ERDDAP™ Herhangi bir veri setleri yüklenmeden başlar. Datasets bir arka planda yüklenir ve bu yüzden bir tane -bir tane kullanılabilir.

### Sorun Giderme{#troubleshooting} 

* Bir kullanıcıdan bir istek geldiğinde, Apache'ye gider (Linux ve Mac OS bilgisayarları) Sonra Tomcat, sonra ERDDAP™ .
* Apache’ye ne geldiğini görebilirsiniz (Ve ilgili hatalar) Apache log dosyalarında.
*    [You You You You You](/docs/server-admin/additional-information#tomcat-logs) Tomcat'a ne geldiğini görebilir (Ve ilgili hatalar) 
Tomcat log dosyalarında ( `tomcat/logs/catalina.out` Ve bu dizinin diğer dosyaları) .
*    [You You You You You](/docs/server-admin/additional-information#log) Bakalım ne geliyor ERDDAP , teşhis mesajları ERDDAP ,
ve hata mesajları ERDDAP Ama içinde ERDDAP™   ` <bigParentDirectory> /loglar /log.txt` Dosya.
* Tomcat başlamaz ERDDAP™ Tomcat'a kadar bir istek alır ERDDAP™ . Bu yüzden Tomcat log dosyalarında görebilirsiniz eğer öyleyse
Başlamaya başladı ERDDAP™ Ya da bu girişimle ilgili bir hata mesajı varsa.
* When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When ERDDAP™ Başlıyor, eskileri yeniden adlandırıyor ERDDAP™ log.txt file ( `LogArchivedAt <CurrentTime> .txt` ) Ve yeni bir log.txt dosyası yaratır.
Eğer öyleyse `Giriş.txt` Dosya eskidir, bir işarettir ki ERDDAP™ Son zamanlarda yeniden başlamadı. ERDDAP™ Bir buffer için günlük bilgi yazın
Ve sadece düzenli olarak giriş dosyasına buffer yazar, ancak zorlayabilirsiniz ERDDAP™ Buffer'ı ziyaret ederek log dosyasına yazın
     ` /erddap/status.html ` .

### Sorun: Eski Sürümü Java  {#trouble-old-version-of-java} 

Bir versiyonunu kullanıyorsanız Java Bu çok yaşlı çünkü ERDDAP , ERDDAP™ Koşmayacak ve Tomcat'ın log dosyasında bir hata mesajı göreceksiniz

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Çözüm, en son sürümüne güncellemek Java Tomcat'ın onu kullandığından emin olun.

### Sorun: Yavaş Startup First Time{#trouble-slow-startup-first-time} 

Tomcat ilk kez bir uygulama yapmak zorunda ERDDAP™ Başlanır; özellikle de, paketlenmemelidir `Heddap.war` Dosya dosyası
 (Hangi gibi .zip Dosya dosyası) . Bazı sunucularda, ilk görüş ERDDAP™ tezgahlar (30 saniye?) Bu çalışma bitinceye kadar.
Diğer sunucularda, ilk deneme hemen başarısız olacaktır. Ama 30 saniye beklerseniz ve tekrar deneyin, başarılı olacaktır ERDDAP™ Doğru olarak kuruldu.

Bunun için bir düzeltme yoktur. Bu sadece Tomcat nasıl çalışır. Ama sadece yeni bir versiyon yükledikten sonra ilk kez meydana gelir ERDDAP™ .

## Shut down and restart{#shut-down-and-restart} 

Gelecekte, kapatılması için (Ve yeniden başlayın)   ERDDAP™ gör [How to Shut Down and Restart Tomcat and ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Sorun?{#trouble} 

Sorunlar Tomcat veya ERDDAP™ ?? Görmemize bakın [Bölüm almak için ek destek](/docs/intro#support) .

## Yeni Sürümlerin E-posta Bildirimi ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Yeni bir versiyon ne zaman bir e-posta almak istiyorsanız ERDDAP™ Mevcut veya diğer önemli ERDDAP™ duyurular,
Katılabilirsiniz ERDDAP™ duyurular listesi [İşte burada burada](https://groups.google.com/g/erddap-announce) . Bu liste her üç ayda yaklaşık bir e-postadır.

## Özelleştirin{#customize} 

*  [özelleştirin your your your your ERDDAP™ Organizasyonunuzu vurgulamak için (Değil değil NOAA   ERD ) .](#customize) 
* Tüm en üstteki görünen bayrağı değiştir ERDDAP™ .html sayfaları düzenleme yoluyla ` <startBodyHtml5> ` Senin için etiket ` datasets.xml ` Dosya.
(Bir tane değilse, varsayılanı kopyalayın ERDDAP™ " `tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messajlar.xml` Dosya dosyası
içine ` datasets.xml ` Ve bunu düzenler.) Örneğin, yapabilirsiniz:
  * Farklı bir görüntü kullanın (i.e., organizasyonunuzun logosu) .
  * Arka rengini değiştirin.
  * Değişim " ERDDAP™ " / YourOrganization_'s ERDDAP™ " " ""
  * "Easier bilimsel verilere erişim", "Easier access to _ YourOrganization_'s data" için değiştirin.
  * "Seninle bağlantı kurmak" bağlantılarınızı kuruluş ve finansman kaynaklarınıza bağlar.
* Ev sayfasının sol tarafında bilgileri düzenleme ile değiştirin ` <theShortDescriptionHtml> ` Senin için etiket ` datasets.xml ` Dosya.
(Bir tane değilse, varsayılanı kopyalayın ERDDAP™ " `tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messajlar.xml` Dosya dosyası
içine ` datasets.xml ` Ve bunu düzenler.) Örneğin, yapabilirsiniz:
  * Organizasyonunuzun ve/veya grubun ne yaptığını açıklayın.
  * Ne tür bir veriyi bu şekilde açıklayın ERDDAP™ Var.
  * Tarayıcı sekmelerinde görünen ikonu değiştirmek için, kuruluşunuzun faviconunu koyun. ico in `tomcat/content/erddap/images /` .
See See See See https://en.wikipedia.org/wiki/Favicon.
 
