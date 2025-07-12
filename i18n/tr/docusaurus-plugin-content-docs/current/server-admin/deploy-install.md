---
sidebar_position: 1
---

# Yükleme
İlk Kurulum Nasıl YapılırERDDAP™Your Server


ERDDAP™Desteklenen herhangi bir sunucuda çalıştırılabilirJavaTomcat ve (Ve Jetty gibi diğer uygulama sunucuları, ama onları desteklemiyoruz) .ERDDAP™Linux üzerinde test edilmiştir (Amazon'un AWS'sinde de dahil olmak üzere) Mac ve Windows bilgisayarları.
*    **Docker** – Biz sunuyoruz[ERDDAP™Bir Docker konteynerinde](https://hub.docker.com/r/erddap/erddap)Ve IOOS şimdi bir teklif sunuyor[Hızlı Başlangıç Kılavuzu içinERDDAP™Bir Docker Konteyner](https://ioos.github.io/erddap-gold-standard/index.html).
StandartERDDAP™kurulum, bir Docker konteynerinde.
Docker Boşluk ve izleme kurmak için kolay yollar sunuyoruz, daha fazlasını okuyun[Docker belgeleri](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md).
Docker kullanıyorsanız, muhtemelen Docker versiyonunu tercih edersiniz.
Bulut hizmetleri üzerinde koşmak arıyorsanız muhtemelen Docker versiyonunu tercih edeceksiniz.
*    **Amazon Amazon Amazon** – Eğer yükleniyorsanızERDDAP™Amazon Web Services EC2 örneğinde, bunu görün[Amazon Web Services Genel Bakış](/docs/server-admin/additional-information#amazon)İlk olarak.
*    **Linux ve Macs** –ERDDAP™Linux ve Mac bilgisayarlarında harika çalışır. Aşağıdaki talimatları görün.
*    **Windows Windows Windows** – Windows test için iyiERDDAP™Ve kişisel kullanım için (Aşağıdaki talimatları görmek) Ama bunu halk için kullanmayı önermiyoruzERDDAPs. Koşu KoşuERDDAP™Windows'da sorunlar olabilir: özellikle,ERDDAP™dosyaları çabucak silemez ve / veya yeniden adlandırmayabilir. Bu muhtemelen antivirüs yazılımı nedeniyle (E.g., McAfee ve Norton) Hangi dosyaları virüsler için kontrol eder. Eğer bu sorunla karşılaşırsanız (Hangi hata mesajları tarafından görülebilir[Giriş.txt](/docs/server-admin/additional-information#log)"Unable to delete ..." gibi dosya) Ancak antivirüs yazılımının ayarlarını değiştirmek kısmen sorunu hafifletebilir. Ya da bunun yerine bir Linux veya Mac sunucusu kullanmayı düşünün.

 **Standart standartERDDAP™Linux, Macs ve Windows bilgisayarlar için yükleme talimatları:** 

0. Herhangi bir bağımlılıkların kurulu olduğundan emin olun. Windows makinelerinde (Linux ve Mac) , csh'e ihtiyacınız var.
## Java {#java} 
1.  [For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For ForERDDAP™v2.19+, yukarı yukarıJava21.](#java)
Güvenlik nedenleri için, neredeyse her zaman en son sürümünü kullanmak en iyisidirJava21.
Lütfen indirmek ve en son sürümü yüklemek
    [Kabulium'un AçıkJDK (Temin) 21 21 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21). Yüklemeyi doğrulamak için, tip " /_javaJreBin Yönetmeny_/java -vers", örneğin
/usr/local/jdk-21.0.3+9/jre/bin/javavava -
    
    ERDDAP™İşlerle birlikte çalışırJavaDiğer kaynaklardan, ancak Impium'u tavsiye ediyoruz çünkü ana, topluluk destekli, ücretsiz (Bira ve konuşma olarak) versiyonuJava21, Long Term Support (Uzun yıllar boyunca ücretsiz yükseltmeler, ilk sürüm) . Güvenlik nedenleri için lütfen güncellemeniziERDDAP's version of'Javaperiyodik olarak yeni versiyonları olarakJava21 Buyium'dan kullanılabilir.
    
    ERDDAP™21 ile yoğun olarak test edildi ve başka versiyonlarla kullanılmadı. Çeşitli nedenlerle, diğer versiyonlarını test etmiyoruz veya diğer sürümlerini desteklemiyoruzJava.
     
## Tomcat{#tomcat} 
2.  [Set up up](#tomcat) [Tomcat](https://tomcat.apache.org).
Tomcat en yaygın kullanılanJavaUygulama Server, hangisidirJavaİşletim sistemi ağ hizmetleri ve ağ hizmetleri arasında duran yazılımlarJavasunucu yazılımı gibiERDDAP™. Free ve Open Source Software (FOSS) .
    
Başkasını kullanabilirsinizJavaUygulama Server (E.g., Jetty) Ama sadece Tomcat ile test ediyoruz ve destekliyoruz.
     
    
    * Tomcat'ı indirin ve sunucunuzda veya PC'de paketlenme.
Güvenlik nedenleri için, Tomcat 10'un son versiyonunu kullanmak neredeyse her zaman en iyisidir (9 ve aşağıda kabul edilemez) Hangi ile çalışmak için tasarlanmıştırJava21 veya yeni. Aşağıda, Tomcat rehberi _tomcat_ olarak adlandırılacaktır.
        
Uyarı&#33; Zaten bir Tomcat başka bir web uygulaması çalıştırıyorsanız (Özellikle THREDDS) , yüklemenizi tavsiye ediyoruzERDDAP™in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in[ikinci bir Tomcat](/docs/server-admin/additional-information#second-tomcat)ÇünküERDDAP™Farklı Tomcat ayarlarına ihtiyaç duyar ve hafıza için diğer uygulamalarla uğraşmak zorunda kalmamalıdır.
        
        * Linux'ta,["Core" indir.gz" Tomcat dağıtım](https://tomcat.apache.org/download-10.cgi)Ve onu paketle. Bunu /usr/yerel'de paketlememizi tavsiye ederiz.
        * Bir Mac'te, Tomcat muhtemelen /Tom /Tomcat'ta kuruldu, ancak Tomcat 10'un son sürümüne güncellemeli.
Eğer indirseniz,["Core" indir.gz" Tomcat dağıtım](https://tomcat.apache.org/download-10.cgi)ve onu /Tom / Tomcat'da paketle.
        * Windows'da, Windows'da yapabilirsiniz["Core" "zip" Tomcat dağıtımını indirin](https://tomcat.apache.org/download-10.cgi)  (Bu, Windows kayıt ile dağınık değildir ve bir DOS komut satırından hangi kontrol edersiniz) ve uygun bir dizide paketlenme. (Geliştirme için, "Core" "zip" dağıtımını kullanıyoruz. Biz orada bir / programlayıcı ve paketi yapıyoruz.) Ya da daha fazla özellik içeren "Core" "64-bit Windows zip" dağıtımını indirebilirsiniz. Dağıtım bir Windows installer ise, muhtemelen Tomcat'ı, örneğin /Program Files /apache-tomcat-10.0.23 .
             
### server.xml{#serverxml} 
*   [server.xml](#serverxml)- _tomcat_/conf /server.xml dosyasında, her ikiniz için yapmanız gereken iki değişiklik vardır.&lt;Links&gt; etiketler – biri için
```
        <Connector port="8080" 
```
Ve biri için
```
        <Conector port="8443"
```
    1.   (Önerilen önerilen önerilen önerilen) BağlantıTimeout parametre değerini artırmak, belki 300000 (milisaniyeler)   (hangisi 5 dakika) .
    2.   (Önerilen önerilen önerilen önerilen) Yeni bir parametre ekleyin: rahatQueryChars="\\[\\]|" " "" Bu isteğe bağlı ve biraz daha az güvenlidir, ancak kullanıcıların bu karakterleri bir kullanıcının isteği URL'sinin parametrelerinde gerçekleştiğinde yüzde-encode'a ihtiyacı ortadan kaldırır.
             
### İçerik.xml{#contentxml} 
* bağlam.xml - Kaynaklar Cache - _tomcat_/conf /context.xml, hemen önce&lt;/Context&gt; tag, the Resources tag (veya ekle, zaten orada değilse) Önbelleği ayarlamak için MaxSize parametre 80000:
    &lt;Kaynakların tüm borçlu=" true" önbellSize="80000" /&gt;
Bu, katalina'da birçok uyarıdan kaçınır. Tüm bunların hepsiyle başlıyoruz
"WARNING\\[main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main main\\]org.apache.catalina.webresources.Cache.getResources. Kaynağı eklemek için kullanılamaz\\[/WEB-INF/classes/...]
         
### Apache Timeoutout{#apache-timeout} 
* Linux bilgisayarlarda, Apache zamanout ayarlarını değiştirir, böylece o zaman alıcı kullanıcı istekleri zaman tükenmez (Sık sık "Proxy" veya "Bad Gateway" hatası olarak görünen şeyle) . Kök kullanıcı olarak:
    1. Apache'yi Değiştirinhttpd.conf file (Genellikle / etc /httpd/conf /) :
Mevcut değişikliği değiştir&lt;Zamanout&gt; ayarlayın (veya dosyayı sonunda bir tane ekleyin) 3600 (saniye saniye saniye saniye saniye) Ancak varsayılan 60 veya 120 saniye yerine.
Mevcut değişikliği değiştir&lt;ProxyTimeout&gt; ayarlayın (veya dosyayı sonunda bir tane ekleyin) 3600 (saniye saniye saniye saniye saniye) Ancak varsayılan 60 veya 120 saniye yerine.
    2. Restart Apache: /usr /sbin /apachectl -k lütufkâr (Ama bazen farklı bir dizide) .
             
    * Güvenlik tavsiyesi: See See See See[Bu talimatlar](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)Tomcat kurulumunuzun güvenliğini artırmak için, özellikle halk sunucular için.
         
    * Halk içinERDDAP™Linux ve Macs üzerinde yüklemeler, Tomcat kurmak en iyisidir (Program programı) Kullanıcıya ait olarak "tomcat" (Sınırlı izni olan ayrı bir kullanıcı ve hangisi[Şifre yok](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) . Böylece, sadece süper kullanıcı, kullanıcı tomcat olarak hareket etmeye geçebilir. Bu, hackerların sunucunuza kullanıcı tomcat olarak girişlerini imkansız kılar. Ve herhangi bir durumda, tomcat kullanıcının sunucunun dosya sistemi üzerinde çok sınırlı izinlere sahip olması gerekir (read+write+execute ayrıcalıkları apache-tomcat directory ağacı ve apache-tomcat directory ağacı için ve&lt;BüyükParent Yönetmeny&gt; ve sadece yönetmenler için ayrıcalıklar okudumERDDAP™erişime ihtiyaç vardır).
        * Tomcat kullanıcı hesabı oluşturabilirsiniz (Hangi şifreye sahip değil) Kur'an'ı kullanarak
Sudo kullanıcısı tomcat -s /bin /bash -p '\\* ‘ ‘ ‘
        * komutunu kullanarak kullanıcı tomcat olarak çalışmaya geçiş yapabilirsiniz
Sudo - tomcat
             (Bunu yapmak için izin için süper kullanıcı şifresini size soracaktır.) 
        * komutunu kullanarak kullanıcı tomcat olarak çalışmayı durdurabilirsiniz
çıkış çıkış çıkış çıkış çıkışı
        * Tomcat'ın geri kalanının çoğunu yapın veERDDAP™Kullanıcı "tomcat" olarak ayar talimatları. Daha sonra, başlangıç.sh ve kapanış.sh senaryolarını kullanıcı "tomcat" olarak çalıştırın, böylece Tomcat'ın günlük dosyalarına yazma izni vardır.
        * Tomcat'ı paketledikten sonra, apache-tomcat rehberinin ebeveyninden:
            
            * Apache-tomcat directory ağacını tomcat kullanıcısına değiştirin.
chown -R tomcat apache-tomcat-_10.0.23_
                 (Ama tomcat directory'in gerçek adını yerine) .
            * Tomcat, kullanıcı adınız veya tomcat içeren küçük bir grubun adı ve Tomcat / Tomcat / tüm yöneticileriERDDAPE.g.,
chgrp -R _your UserName_ apache-tomcat-_10.0.23_
            * Change permissions so that tomcat and the group have read, write, execute privileges, e.g.
chmod -R ug+rwx apache-tomcat-_10.0.23_
            * "Diğer" kullanıcı izinlerini okumak, yazmak veya uygulamak için çıkarın:
chmod -R o-rwx apache-tomcat-_10.0.23_
Bu önemlidir, çünkü diğer kullanıcıların muhtemelen hassas bilgileri okumaktan alıkoymasını engellerERDDAP™Kurulum dosyaları.
            
              
### Hafıza{#memory} 
* Set Tomcat'ın Çevre Değişkenleri
    
Linux ve Macs:
Bir dosya oluşturun _tomcat_/bin/setenv.sh (veya Red Hat Enterprise Linux'ta\\[REL\\], edit -tomcat /conf /tomcat10.conf) Tomcat'ın çevre değişkenlerini belirlemek. Bu dosya, _tomcat_/bin/startup.sh ve kapanış.sh tarafından kullanılacaktır. Dosya gibi bir şey içermelidir:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (Ancak dizin isimlerini bilgisayarınızın dışına çıkarın) .
 (Daha önce JRE\\_HOME ayarladıysanız, bunu kaldırabilirsiniz.)   
Macs'te, muhtemelen JAVA\\_HOME ayarlamanız gerekmez.

Windows'da:
Bir dosya oluşturun _tomcat_ Tianbinasetenv.bat to set Tomcat's environment variables. Bu dosya, _tomcat_MarkbinLostartup tarafından kullanılacaktır.bat veshutdown.bat. Dosya gibi bir şey içermelidir:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (Ancak dizin isimlerini bilgisayarınızın dışına çıkarın) .
Eğer bu sadece yerel test için ise, "-server".
 (Daha önce JRE\\_HOME ayarladıysanız, bunu kaldırabilirsiniz.) 

-Xmx ve -Xms bellek ayarları önemlidir çünküERDDAP™Daha fazla hafıza ile daha iyi çalışır. Her zaman set -Xms aynı değere -Xmx.

* 32 bit İşletim Sistemleri ve 32 bitJava:
64 bitJava32 bitten daha iyiJavaAma 32 birazJavaSunucu gerçekten meşgul olmadığı sürece çalışacak. Sunucudaki daha fiziksel hafıza daha iyi: 4+ GB gerçekten iyi, 2 GB tamam, daha az tavsiye edilmez. 32 bitJavaHatta bol fiziksel hafıza, Tomcat veJavaSet etmeye çalışırsanız - 1500M'nin üzerinde çok fazla (1200M Bazı bilgisayarlarda) . Eğer sunucunuz 2GB bellekten daha azsa, -Xmx değerini azaltır ('M'egaBytes) Bilgisayarın fiziksel hafızasının 1/2'ine.
* 64 bit İşletim Sistemleri ve 64 bitJava:
64 bitJavaSadece 64 bit işletim sistemi üzerinde çalışacak.
    
    * With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With WithJava8, setenv.batta Tomcat CATALINA\\_OPTS parametresine \\-d64 eklemek zorundasınız.
    * With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With WithJava21, 64 bit seçtiğinizJavaBir versiyonunu indirdiğinizdeJava"64 bit" işaret etti.
    
64 bitJavaTomcat veJavaÇok yüksek kullanabilir -Xmx ve -Xms ayarları. Sunucudaki daha fiziksel hafıza daha iyi. Basit bir öneri olarak: belirlemenizi öneririz -Xmx ve -Xms to ('M'egaBytes) 1/2 (veya daha az) Bilgisayarın fiziksel hafızasından. Tomcat'ı görebileceksin,JavaVeERDDAP™Aslında 64 bit modunda “küçük” aramakla çalışıyorERDDAP'The Daily Report email or in the _bigParent Yöneticiy_/logs /[Giriş.txt](/docs/server-admin/additional-information#log)Dosya dosyası (_bigParent Yönetmeny_ belirtilir[Kurulum.xml](#setupxml)) .
#### Garbage Collection{#garbage-collection} 
* In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In InERDDAP™"[Giriş.txt](/docs/server-admin/additional-information#log)Dosya, birçok "GC" göreceksiniz (Allocation Başarısızlık) " mesajları.
Bu genellikle bir problem değildir. Normalde ameliyattan sık sık bir mesajdırJavaSadece küçük bir çöp koleksiyonu bitirdiğini söylüyor çünkü Eden Odadan kaçtı (BölümJavaÇok genç nesneler için) . Genellikle mesaj size _memoryUse before_\\-&gt;_memoryUse After_. Bu iki sayı birbirine yakınsa, çöp toplamanın üretken olmadığı anlamına gelir. Mesaj sadece çok sık rastlanırsa bir sorun işaretidir. (Her birkaç saniye) Ancak üretken değil ve sayılar büyük ve büyümez, bu birlikte gösteriyor ki,JavaDaha fazla hafızaya ihtiyaç duyar, hafızayı serbest bırakmak için mücadele eder ve hafızayı serbest bırakamaz. Bu stresli bir süre içinde olabilir, sonra uzaklaş. Ama devam ederse, bu bir sorun işareti.
* Eğer java.lang.OutOfMemoryError'u görürsenizERDDAP™"[Giriş.txt](/docs/server-admin/additional-information#log)Dosya, bakınız[OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror)Problemleri nasıl teşhis edip çözme konusunda ipuçları için.
         
### İzinler{#permissions} 
*   [Linux ve Macs'te, izinleri değiştirin](#permissions)Tüm bunların hepsi\\*.sh_tomcat_/bin/'deki dosyalar, sahibi tarafından, e.g. tarafından yönetilebilir.
```
    chmod +x \\*.sh  
```
### Fonts Fonts{#fonts} 
*   [Görüntüler için Fonts:](#fonts)Özgürü güçlü bir şekilde tercih ediyoruz[DejaVu fontları](https://dejavu-fonts.github.io/)DiğerineJavafontlar. Bu fontları kullanmak şiddetle tavsiye edilir ancak gerekli değildir.
    
DejaVu fontlarını kullanmamayı tercih ederseniz, fontFamily kurulumda ayarlamanız gerekir.xml to use the DejaVu fonts, you need to change the typeFamily setting in installation.xml to order.xml to order.xml to use the DejaVu fonts&lt;fontFamily&gt;SansSerif&lt;/fontFamily&gt; hepsi ile mevcut olanJavaDağıtımlar. Eğer fontFamily'yi mevcut olmayan bir yazıya ayarlarsanız,ERDDAP™Yüklemeyecek ve giriş.txt dosyasında mevcut fontların listesini yazdıracak. Bu fontlardan birini kullanmalısınız.
    
DejaVu fontlarını kullanmayı seçerseniz, lütfen fontFamily kurulumda ayarlandığından emin olun.xml is is.xml.&lt;font font Aile&gt;DejaVu Sans&lt;/fontFamily&gt;
    
DejaVu fontlarını yüklemek için lütfen indirme[DejaVuFonts.zip](/DejaVuFonts.zip)  (5.522,795 bytes, MD5=33E1E61FAB06A547851ED308B4FFEF42) ve font dosyaları geçici bir diziye gönderme.
    
    * Linux'ta:
        * Linux içinJavaDağıtımlar, bakınız[Bu talimatlar](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/).
        * DiğerleriyleJavaDağıtımlar: Tomcat kullanıcısı olarak, font dosyalarını _JAVA\\_HOME_/lib/fonts'e kopyalayınJavafontları bulabilir. Unutmayın: Eğer / daha sonra yeni bir sürüme yükseltdiğinizdeJavaBu fontları yeniden yüklemeniz gerekiyor.
    * Macs'te: her font dosyası için çift tıklayın ve sonra Yükleme Font'e tıklayın.
    * Windows 7 ve 10: Windows Explorer'da tüm font dosyalarını seçin. Doğru tıklama. Yüklemeye tıklayın.
             
### Test Tomcat{#test-tomcat} 
* Tomcat kurulumunuzu test edin.
    * Linux:
        * Kullanıcı "tomcat" olarak, _tomcat_/bin/startup.sh
        * URL + ":8080 /" tarayıcınızda (E.g.,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .
        * Tomcat "Congratulations" sayfasını görmeniz gerekir.
Sorun varsa, Tomcat log dosyasını _tomcat_/logs/catalina.out.
    * Mac Mac Mac (Sistem yöneticisi kullanıcı olarak tomcat çalıştırın) :
        * Run _tomcat_/bin/startup.sh
        * URL + ":8080 /" tarayıcınızda (E.g.,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) . Varsayılan olarak, Tomcatınız sadece sizin tarafınızdan erişilebilir. Açık olarak erişilebilir değildir.
        * Tomcat "Congratulations" sayfasını görmeniz gerekir.
Sorun varsa, Tomcat log dosyasını _tomcat_/logs/catalina.out.
    * Windows yerelhost:
        
        * Sistem tepsisindeki Tomcat ikonuna doğru tıklayın ve "Start service" seçeneğini seçin.
        * View View View View[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/)Ya da belki[ http://localhost:8080/ ](http://localhost:8080/)Tarayıcınızda. Varsayılan olarak, Tomcatınız sadece sizin tarafınızdan erişilebilir. Açık olarak erişilebilir değildir.
        * Tomcat "Congratulations" sayfasını görmeniz gerekir.
Sorun varsa, Tomcat log dosyasını _tomcat_/logs/catalina.out.
            
### Tomcat kurulumu ile sorun?{#troubles-with-the-tomcat-installation} 
* Linux ve Mac'te, Tomcat'a ulaşamıyorsanız veyaERDDAP™  (Ya da belki sadece güvenlik duvarınızın dışındaki bir bilgisayardan ulaşamazsınız) , Tomcat 8080 port dinliyorsa test edebilirsiniz, by tiping (Kök olarak) Sunucunun bir komut satırında:
```  
    netstat -tuplen | grep 8080  
```
Böyle bir şeyle bir çizgi geri dönmeli:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     ("#" bazı sayısal) , bir "java" sürecinin (Muhtemelen Tomcat) "tcp" trafiği için port "80" üzerinde dinliyor. Hiçbir satır iade edilmediyse, çizgi geri döndüyse veya iki veya daha fazla çizgi geri döndüyse, o zaman liman ayarları ile bir sorun olabilir.
* Tomcat log dosyasını gör _tomcat_/logs/catalina.out. Tomcat sorunları ve bazılarıERDDAP™Başlangıç sorunları neredeyse her zaman orada belirtilmiştir. Bu ilk ayarlandığında yaygındırERDDAP™.
* Görün bakalım,[Tomcat](https://tomcat.apache.org/)Web sitesi veya yardım için web'i arayın, ancak lütfen sahip olduğunuz sorunları ve bulduğunuz çözümleri bize bildirin.
* Görmemize bakın[Bölüm almak için ek destek](/docs/intro#support).
             
### ERDDAP™Content Content Content{#erddap-content} 
3.  [Set up the the_tomcat_/content/erddapkonfigürasyon dosyaları.](#erddap-content)  
Linux, Mac ve Windows üzerinde, indir[HeddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, 2024-10-14) Ve bunu _tomcat_'a dönüştürdüm, yaratmak_tomcat_/content/erddap.

    \\[Bazı önceki versiyonlar da mevcuttur:
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, 2022-02-16)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, 2022-10-09-09-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, 2022-12-08-08--08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, 2023-02-27) 
Ve bunu _tomcat_'a dönüştürdüm, yaratmak_tomcat_/content/erddap.\\]
    
#### Diğer Rehber{#other-directory} 
Red Hat Enterprise Linux için (REL) Ya da Tomcat dizisini değiştirmenize izin verilmediğin başka durumlar için veya istediğiniz yere / koymak için nereye izin verilmez?ERDDAP™Başka bir nedenden dolayı başka bir yerde içerik rehberi (Örneğin, Tomcat yerine Jetty kullanıyorsanız) , unzip erddapContent.zipİstenen dizinin içine (Sadece kullanıcı=tomcat'ın erişimi vardır) Ve ayarlayınerddapContentDirectorysistem mülk sistemi (E.g.,erddapContentDirectory=~tomcat/content/erddap) Bu yüzdenERDDAP™Bu yeni içerik rehberi bulabilir.
    
### Kurulum.xml{#setupxml} 
*   [Yorumları okuyun_tomcat_/content/erddap/ **Kurulum.xml** ](#setupxml)İstenen değişiklikleri yapın. Kurulum.xml, ayarladığınız tüm ayarlarla dosyadır.ERDDAP™Davranışlar.
İlk kurulum için, bu ayarları en azından değiştirebilirsiniz:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
BüyükParentYönetmeni yaratırken, büyük aile müdürlüğü ana rehberinden:
    
    * Kullanıcı = BüyükParent Yöneticisinin sahibini, e.g.,
```
        chown -R tomcat _bigParentDirectory_
```
    * Tomcat, kullanıcı adınız veya tomcat içeren küçük bir grubun adı ve Tomcat / Tomcat / tüm yöneticileriERDDAPE.g.,
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Change permissions so that tomcat and the group have read, write, execute privileges, e.g.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * "Diğer" kullanıcı izinlerini okumak, yazmak veya uygulamak için çıkarın. Bu, muhtemelen hassas bilgileri okumak için önemlidirERDDAP™Özel veri kümeleri hakkında bilgi ile giriş dosyaları ve dosyaları.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Çevre Değişkenleri{#environment-variables} 
Starting with withERDDAP™v2.13,ERDDAP™Yöneticiler kurulumda herhangi bir değer katabilir.xml, adında bir ortam değişkeni belirterekERDDAP\\__valueName_ before runningERDDAP™. Örneğin, kullanınERDDAP\\_baseUrl overrides the&lt;BaseUrl&gt; değer. Bu, dağıtma yaparken el olabilirERDDAP™Docker gibi bir konteynerle, kurulum.xml'de standart ayarlar koyabilir ve sonra çevre değişkenleri aracılığıyla özel ayarlar tedarik edebilirsiniz. Gizli bilgi tedarik edersenizERDDAP™Bu yöntem aracılığıyla, bilginin gizli kalacağını kontrol ettiğinizden emin olun.ERDDAP™Sadece başlangıç başına bir kez çevre değişkenlerini okur, ilk ikinci başlangıçta, bu yüzden bunu kullanmak için bir yol: çevre değişkenlerini kurmak, başlayınERDDAP, bekleye kadar bekleyinERDDAP™Başladı, sonra çevre değişkenlerini unset.
    
### datasets.xml {#datasetsxml} 
* Yorumları okuyun[ **Çalışmak ile çalışmakdatasets.xmlDosya** ](/docs/server-admin/datasets). Daha sonra, aldıktan sonraERDDAP™İlk kez koşmak (Genellikle sadece varsayılan datasets ile) , XML'i XML'i değiştireceksiniz_tomcat_/content/erddap/ **datasets.xml** İstediğiniz tüm veri kümelerini belirtmek içinERDDAP™Hizmet etmek için. Bu, zamanınızın büyük kısmını harcayacak, ayarlandığındaERDDAP™ve daha sonra da devam ederkenERDDAP™.

Bir örnek görebilirsiniz[datasets.xmlGitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).
     
*    (aksine) Şimdi veya Şimdi (Biraz daha muhtemel) Gelecekte, erddap'ın CSS dosyasını değiştirmek istiyorsanız, bir kopyasını yapın_tomcat_/content/erddap/ Images/erddapStart2.css, erddap2.css olarak adlandırılır ve sonra ona değişiklikler yapar. erddap2.css için değişiklikler sadece etkisini alırERDDAP™Yeniden başlatılır ve genellikle kullanıcının tarayıcının önbellek dosyalarını temizlemek gerekir.
     
ERDDAP™Kurulum.xml veya kurulumu doğru şekilde çalışmayacaktır.datasets.xmlDosya iyi bilgilendirilmiş bir XML dosyası değildir. Yani, bu dosyaları düzenlemeden sonra, sonucun XML metnini bir XML çekerine geçmişken iyi bilgilendirilmiş bir XML hesabı olduğunu doğrulamak için iyi bir fikirdir.[xmlvalidation](https://www.xmlvalidation.com/).
     
### Seddap.war dosyasını yükleyin{#install-the-erddapwar-file} 
4. Linux, Mac ve Windows üzerinde, indir[Heddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)_tomcat_/webapps .
     (2.27.0, 620,554,403 bytes, MD5=3b2086c659eee4145ca2dff447bf4ef7, tarihli, 06-11-2025) 
    
Savaş dosyası büyük çünkü harita oluşturmak için gereken yüksek çözünürlüklü, sınır ve yükseklik verileri içeriyor.
    
    \\[Bazı önceki versiyonlar da mevcuttur.
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245 bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069,844 bytes, MD5=461325E97E7577EC671D50246CCFB8B, 2022-02-23)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 bytes, MD5=F2CFF805893146E932E498FDDBD519B6, 2022-10-09-09-06)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765 bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, 2022-12-08-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, 2023-03-03-03) 
    [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, 2024-06-07) 
    [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, 2024-11-07-07) 
    [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)  (607,404,032 bytes, MD5=99a725108b37708e5420986c16a119, 2025-03-31) 
    \\]
    
#### ProxyPass{#proxypass} 
5. Proxy Use Proxy Bu yüzden kullanıcılar port numarasını, e.g., :8080, URL'de koymak zorunda değildir.
Linux bilgisayarlarda, eğer Tomcat Apache'de çalışıyorsa, lütfen Apache'yi değiştirinhttpd.conf file (Genellikle / etc /httpd/conf /) HTTP trafiğinin /ERDDAP™port numarasını gerektirmeden e.g.:808080, URL'de. Kök kullanıcı olarak:
    1. Mevcutları Değiştirin&lt;VirtualHost&gt; tag (Eğer bir tane varsa) Dosyanın sonunda bir tane ekleyin:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Sonra Apache'yi yeniden başlatın: /usr/sbin/apachectl -k lütufkâr (Ama bazen farklı bir dizide) .
         
### NGINX{#nginx} 
 (U U UNCOMMON) Eğer kullanıyorsanız[NGINX](https://www.nginx.com/)  (Bir web sunucusu ve yük dengesi) :
NGINX almak için veERDDAP™Doğru şekilde çalışmaklahttpsTomcat sunucusunun aşağıdaki parçaları koymanız gerekir.xml&lt;Host&gt; blok:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
Ve nginx yapılandırma dosyasında, bu başlıkları ayarlamanız gerekir:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Kyle Wilcox sayesinde.)   
     
### Start Tomcat{#start-tomcat} 
*    (Tomcat Web Application Manager'ı kullanmayı önermiyorum. Tomcat'ı tamamen kapatıp başlatmadıysanız, er ya da geç PermGen hafıza sorunlarınız olacak.)   
     
*    (Linux veya Mac OS'de, Tomcat'ı çalıştırmak için özel bir kullanıcı yarattıysanız, e.g., tomcat, bu kullanıcı olarak aşağıdaki adımları yapmayı unutmayın.)   
     
* Tomcat zaten çalışıyorsa, Tomcat'ı kapat (Linux veya Mac OS) _tomcat_/bin/shutdown.sh
veya (Windows in Windows) _tomcat_Lobinshutdown.bat
    
Linux'ta ps -ef kullanın|Grep tomcat daha önce ve kapanmadan sonra.sh tomcat sürecinin durduğından emin olmak için. Süreç kapanmadan önce listelenmelidir ve sonunda kapatmadan sonra listelenmemelidir. Bir dakika veya iki dakika sürebilirERDDAP™Tamamen kapat. Sabırlı olun. Ya da kendi başına durmayacak gibi görünüyorsa, kullanın:
Kill -9 _ processingID_
    
* Tomcat'a başlayın (Linux veya Mac OS) _tomcat_/bin/startup.sh
veya (Windows in Windows) _tomcat_SanbinLostartup.bat

## Is Is Is Is Is Is Is Is Is Is Is Is IsERDDAP™koşmak?{#is-erddap-running} 
Görmeye çalışmak için bir tarayıcı kullanın http://_www.YourServer.org_/erddap/status.html   
ERDDAP™Herhangi bir veri setleri yüklenmeden başlar. Datasets bir arka planda yüklenir ve bu yüzden bir tane -bir tane kullanılabilir.

### Sorun Giderme{#troubleshooting} 
* Bir kullanıcıdan bir istek geldiğinde, Apache'ye gider (Linux ve Mac OS bilgisayarları) Sonra Tomcat, sonraERDDAP™.
* Apache’ye ne geldiğini görebilirsiniz (Ve ilgili hatalar) Apache log dosyalarında.
*   [You You You You You](/docs/server-admin/additional-information#tomcat-logs)Tomcat'a ne geldiğini görebilir (Ve ilgili hatalar) Tomcat log dosyalarında (_tomcat_/logs/catalina.out and other files in that directory) .
*   [You You You You You](/docs/server-admin/additional-information#log)Bakalım ne geliyorERDDAP, teşhis mesajlarıERDDAPVe hata mesajlarıERDDAPAma içindeERDDAP™ &lt;BüyükParent Yönetmeny&gt;loglar/log.txt dosyası.
* Tomcat başlamazERDDAP™Tomcat'a kadar bir istek alırERDDAP™. Böylece başladıysa Tomcat log dosyalarında görebilirsinizERDDAP™Ya da bu girişimle ilgili bir hata mesajı varsa.
* When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When WhenERDDAP™Başlıyor, eskileri yeniden adlandırıyorERDDAP™log.txt file (LogArchivedAt_CurrentTime_.txt) Ve yeni bir log.txt dosyası yaratır. Yani eğer giriş. txt dosyası eski, bu bir işarettir kiERDDAP™Son zamanlarda yeniden başlamadı.ERDDAP™Bir tampona log bilgileri yazın ve sadece buffer'ı periyodik olarak log dosyasına yazar, ancak zorlayabilirsiniz.ERDDAP™Bufferı ziyaret ederek log dosyasına yazmak için .../erddap/status.html.

### Sorun: Eski SürümüJava {#trouble-old-version-of-java} 
Bir versiyonunu kullanıyorsanızJavaBu çok yaşlı çünküERDDAP,ERDDAP™Koşmayacak ve Tomcat'ın log dosyasında bir hata mesajı göreceksiniz
thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Desteksiz büyük.minor versiyonu _someNumber_
Çözüm, en son sürümüne güncellemekJavaTomcat'ın onu kullandığından emin olun.

### Sorun: Yavaş Startup First Time{#trouble-slow-startup-first-time} 
Tomcat ilk kez bir uygulama yapmak zorundaERDDAP™Başlanır; özellikle de, erddap'ı paketlememelidir. Savaş dosyası (Hangi gibi.zipDosya dosyası) . Bazı sunucularda, ilk görüşERDDAP™tezgahlar (30 saniye?) Bu çalışma bitinceye kadar. Diğer sunucularda, ilk deneme hemen başarısız olacaktır. Ama 30 saniye beklerseniz ve tekrar deneyin, başarılı olacaktırERDDAP™Doğru olarak kuruldu.
Bunun için bir düzeltme yoktur. Bu sadece Tomcat nasıl çalışır. Ama sadece yeni bir versiyon yükledikten sonra ilk kez meydana gelirERDDAP™.

## Shut down and restart{#shut-down-and-restart} 
Gelecekte, kapatılması için (Ve yeniden başlayın)  ERDDAPgör[How to Shut Down and Restart Tomcat andERDDAP](/docs/server-admin/additional-information#shut-down-and-restart).
## Sorun?{#trouble} 
Sorunlar Tomcat veyaERDDAP?? Görmemize bakın[Bölüm almak için ek destek](/docs/intro#support).
## Yeni Sürümlerin E-posta BildirimiERDDAP {#email-notification-of-new-versions-of-erddap} 
Yeni bir versiyon ne zaman bir e-posta almak istiyorsanızERDDAP™Mevcut veya diğer önemliERDDAP™duyurular, katılabilirsinizERDDAP™duyurular listesi[İşte burada burada](https://groups.google.com/g/erddap-announce). Bu liste her üç ayda yaklaşık bir e-postadır.
## Özelleştirin{#customize} 
[özelleştirin your your your yourERDDAP™Organizasyonunuzu vurgulamak için (Değil değilNOAA ERD) .](#customize)
    * Tüm en üstteki görünen bayrağı değiştirERDDAP™.html sayfaları düzenleme yoluyla&lt;BaşlangıçBodyHtml5&gt; etiketinizidatasets.xmlDosya. (Bir tane değilse, varsayılanı kopyalayınERDDAP"
        \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messajlar.xml dosyası içinedatasets.xmlVe bunu düzenler.) Örneğin, yapabilirsiniz:
        * Farklı bir görüntü kullanın (i.e., organizasyonunuzun logosu) .
        * Arka rengini değiştirin.
        * Değişim "ERDDAP" / YourOrganization_'sERDDAP" " ""
        * "Easier bilimsel verilere erişim", "Easier access to _ YourOrganization_'s data" için değiştirin.
        * "Seninle bağlantı kurmak" bağlantılarınızı kuruluş ve finansman kaynaklarınıza bağlar.
    * Ev sayfasının sol tarafında bilgileri düzenleme ile değiştirin&lt;TheShortDescriptionHt ml&gt; tag in yourdatasets.xmlDosya. (Bir tane değilse, varsayılanı kopyalayınERDDAP"
        \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messajlar.xml dosyası içinedatasets.xmlVe bunu düzenler.) Örneğin, yapabilirsiniz:
        * Organizasyonunuzun ve/veya grubun ne yaptığını açıklayın.
        * Ne tür bir veriyi bu şekilde açıklayınERDDAP™Var.
    * Tarayıcı sekmelerinde görünen ikonu değiştirmek için, kuruluşunuzun faviconunu koyun. ico in_tomcat_/content/erddap/ görüntüleri / . See See See See[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon).
