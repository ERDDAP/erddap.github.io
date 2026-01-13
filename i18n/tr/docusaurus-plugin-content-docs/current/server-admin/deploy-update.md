---
sidebar_position: 2
---
# Update Update Update Update Update Update Update
Bir Varan Güncelleme Nasıl Yapılır ERDDAP™ Your Server

## Değişiklikler Değişiklikler Değişiklikler{#changes} 
1. listelenen değişiklikleri yapın [Değişiklikler Değişiklikler Değişiklikler](/changes) Bölümde "Things ERDDAP™ Yöneticilerin Bilmeniz ve Yapması Gerekiyor” ERDDAP™ Kullandığınız sürümden beri sürümler.
     
##  Java  {#java} 
2. Eğer yükseltme yapıyorsanız ERDDAP™ 2.18 veya aşağıda, geçmek zorundasınız Java 25 (veya yeni) Ve ilgili Tomcat 10. Düzenli olarak bakınız ERDDAP™ yükleme talimatları için yükleme talimatları [ Java ](/docs/server-admin/deploy-install#java) ve [Tomcat](/docs/server-admin/deploy-install#tomcat) . Ayrıca kopyasını kopyalamanız gerekecek _tomcat_/content/erddap Eski Tomcat kurulumunuzdan yeni Tomcat kurulumuna dizin.

## Download Download Download Download Download{#download} 
3. Download Download Download Download Download [Heddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) _tomcat_/webapps .
     (2.29.0, 706,788,135 bytes, MD5=A5ED0DCC8D46CA27640FFEB8CE4A8560, 12-15-2025) 
     
## mesajlar.xml{#messagesxml} 
4. 
    * Ortak: Eğer yükseltme yapıyorsanız ERDDAP™ 1.46 (veya yukarıdan aşağıya veya) Ve sadece standart mesajları kullanırsınız, yeni standart mesajlar.xml otomatik olarak kurulacaktır. (.class dosyaları arasında erddap. Savaş savaşı) .
         
    * Nadir: Eğer yükseltme yapıyorsanız ERDDAP™ 1.44 (veya aşağıda veya aşağıda) ,
Eski mesajları silebilirsiniz.xml dosyası:
         _tomcat_/content/erddap /messajlar.xml .
Yeni standart mesajlar.xml otomatik olarak kurulacak (.class dosyaları arasında erddap. Savaş savaşı) .
         
    * Nadir: Her zaman standart mesajlara değişiklikler yaparsanız.xml dosyası (yerinde) ,
Bu değişiklikleri yeni mesajlar için yapmanız gerekir.xml dosyası (bu da bu)
WEB-INF/classes/gov/noaa/pfel/erddap/util/messajlar.xml after erddap.war is decomed by Tomcat.
         
    * Nadir: Özel bir mesaj tutarsanız.xml dosyasında _tomcat_/content/erddap /,
Anlamanız gerekir (Diff) Varsayılan mesajlar için hangi değişiklikler yapılmıştır.xml (bu yeni hatada. Savaş olarak savaş
WEB-INF/classes/gov/noaa/pfel/erddap/util/messajlar.xml) ve özel mesajlarınızı değiştirir.xml dosyasını buna göre.
         
## Yükleme{#install} 
5. Yeni yükleme ERDDAP™ Tomcat:
\\* Tomcat Manager'ı kullanmayın. Er ya da geç PermGen hafıza sorunları olacak. Gerçekten kapanmak ve Tomcat başlatmak daha iyidir.
\\* Bilgisayarınızda gerçek Tomcat rehberi ile aşağıda _tomcat_ için referansları değiştirin.
     
### Linux ve Macs{#linux-and-macs} 
1. Shutdown Tomcat: Bir komut satırından: _tomcat_/bin/shutdown.sh
Ve ps kullanır -ef | Grep tomcat, eğer / işlem durdurululduğunda görmek için. (Bir dakika veya iki sürebilir.) 
2. Decomed ERDDAP™ Kurulum: _tomcat_/webapps, use
rm -rf erddap
3. Eski erddapı delete. Savaş dosyası: _tomcat_/webapps içinde, rm erddap kullanın. Savaş savaşı
4. Yeni hatayı kopyalayın. _tomcat_/webapps için geçici diziden savaş dosyası
5. Tomcat ve Restart Tomcat ERDDAP : _tomcat_/bin/startup.sh
6. View View View View ERDDAP™ Tarayıcınızda yeniden başlatmanın başarılı olduğunu kontrol edin.
     (Genellikle, birkaç kez denemek ve gördüğünüzden bir dakika beklemek zorundasınız ERDDAP™ .)   
             
### Windows Windows Windows{#windows} 
1. Shutdown Tomcat: Bir komut satırından, kullanın: _tomcat_bin 48 shutdown.bat 
2. Decomed ERDDAP™ Kurulum: _tomcat_/webapps, use
del /S /Q erddap
3. Eski erddapı delete. Savaş dosyası: _tomcat_Sanwebapps, del erddap kullanın. Savaş savaşı
4. Yeni hatayı kopyalayın. _tomcat_webGapps için geçici diziden savaş dosyası
5. Tomcat ve Restart Tomcat ERDDAP : _tomcat_Monbin Oakstartup.bat
6. View View View View ERDDAP™ Tarayıcınızda yeniden başlatmanın başarılı olduğunu kontrol edin.
     (Genellikle, birkaç kez denemek ve gördüğünüzden bir dakika beklemek zorundasınız ERDDAP™ .) 

Sorunlar Güncellemeler ERDDAP ?? Görmemize bakın [Bölüm almak için ek destek](/docs/intro#support) .
