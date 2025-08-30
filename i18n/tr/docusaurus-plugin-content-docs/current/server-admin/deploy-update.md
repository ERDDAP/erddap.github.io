---
sidebar_position: 2
---
# Update Update Update Update Update Update Update
Bir Varan Güncelleme Nasıl YapılırERDDAP™Your Server

## Değişiklikler Değişiklikler Değişiklikler{#changes} 
1. listelenen değişiklikleri yapın[Değişiklikler Değişiklikler Değişiklikler](/changes)Bölümde "ThingsERDDAP™Yöneticilerin Bilmeniz ve Yapması Gerekiyor”ERDDAP™Kullandığınız sürümden beri sürümler.
     
## Java {#java} 
2. Eğer yükseltme yapıyorsanızERDDAP™2.18 veya aşağıda, geçmek zorundasınızJava21 21 21 (veya yeni) Ve ilgili Tomcat 10. Düzenli olarak bakınızERDDAP™yükleme talimatları için yükleme talimatları[Java](/docs/server-admin/deploy-install#java)ve[Tomcat](/docs/server-admin/deploy-install#tomcat). Ayrıca kopyasını kopyalamanız gerekecek_tomcat_/content/erddapEski Tomcat kurulumunuzdan yeni Tomcat kurulumuna dizin.

## Download Download Download Download Download{#download} 
3. Download Download Download Download Download[Heddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war)_tomcat_/webapps .
     (Versiyon 2.28.0, 620,824,288 bytes, MD5=f948b2ba603f65a83ac67af43da9e4c2, 08-29-2025) 
     
## mesajlar.xml{#messagesxml} 
4. 
    * Ortak: Eğer yükseltme yapıyorsanızERDDAP™1.46 (veya yukarıdan aşağıya veya) Ve sadece standart mesajları kullanırsınız, yeni standart mesajlar.xml otomatik olarak kurulacaktır. (.class dosyaları arasında erddap. Savaş savaşı) .
         
    * Nadir: Eğer yükseltme yapıyorsanızERDDAP™1.44 (veya aşağıda veya aşağıda) ,
Eski mesajları silebilirsiniz.xml dosyası:
        _tomcat_/content/erddap/messajlar.xml .
Yeni standart mesajlar.xml otomatik olarak kurulacak (.class dosyaları arasında erddap. Savaş savaşı) .
         
    * Nadir: Her zaman standart mesajlara değişiklikler yaparsanız.xml dosyası (yerinde) ,
Bu değişiklikleri yeni mesajlar için yapmanız gerekir.xml dosyası (bu da bu)
WEB-INF/classes/gov/noaa/pfel/erddap/util/messajlar.xml after erddap.war is decomed by Tomcat.
         
    * Nadir: Özel bir mesaj tutarsanız.xml dosyasında_tomcat_/content/erddap/,
Anlamanız gerekir (Diff) Varsayılan mesajlar için hangi değişiklikler yapılmıştır.xml (bu yeni hatada. Savaş olarak savaş
WEB-INF/classes/gov/noaa/pfel/erddap/util/messajlar.xml) ve özel mesajlarınızı değiştirir.xml dosyasını buna göre.
         
## Yükleme{#install} 
5. Yeni yüklemeERDDAP™Tomcat:
\\* Tomcat Manager'ı kullanmayın. Er ya da geç PermGen hafıza sorunları olacak. Gerçekten kapanmak ve Tomcat başlatmak daha iyidir.
\\* Bilgisayarınızda gerçek Tomcat rehberi ile aşağıda _tomcat_ için referansları değiştirin.
     
### Linux ve Macs{#linux-and-macs} 
1. Shutdown Tomcat: Bir komut satırından: _tomcat_/bin/shutdown.sh
Ve ps kullanır -ef|Grep tomcat, eğer / işlem durdurululduğunda görmek için. (Bir dakika veya iki sürebilir.) 
2. DecomedERDDAP™Kurulum: _tomcat_/webapps, use
rm -rf erddap
3. Eski erddapı delete. Savaş dosyası: _tomcat_/webapps içinde, rm erddap kullanın. Savaş savaşı
4. Yeni hatayı kopyalayın. _tomcat_/webapps için geçici diziden savaş dosyası
5. Tomcat ve Restart TomcatERDDAP: _tomcat_/bin/startup.sh
6. View View View ViewERDDAP™Tarayıcınızda yeniden başlatmanın başarılı olduğunu kontrol edin.
     (Genellikle, birkaç kez denemek ve gördüğünüzden bir dakika beklemek zorundasınızERDDAP™.)   
             
### Windows Windows Windows{#windows} 
1. Shutdown Tomcat: Bir komut satırından, kullanın: _tomcat_bin 48shutdown.bat
2. DecomedERDDAP™Kurulum: _tomcat_/webapps, use
del /S /Q erddap
3. Eski erddapı delete. Savaş dosyası: _tomcat_Sanwebapps, del erddap kullanın. Savaş savaşı
4. Yeni hatayı kopyalayın. _tomcat_webGapps için geçici diziden savaş dosyası
5. Tomcat ve Restart TomcatERDDAP: _tomcat_Monbin Oakstartup.bat
6. View View View ViewERDDAP™Tarayıcınızda yeniden başlatmanın başarılı olduğunu kontrol edin.
     (Genellikle, birkaç kez denemek ve gördüğünüzden bir dakika beklemek zorundasınızERDDAP™.) 

Sorunlar GüncellemelerERDDAP?? Görmemize bakın[Bölüm almak için ek destek](/docs/intro#support).
