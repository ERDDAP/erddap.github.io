---
sidebar_position: 3
---
#  ERDDAP™ Yayın Süreci
* Görüntü karşılaştırma dosyalarının mevcut olduğundan emin olun (Bu, koşmak anlamına gelebilir `mvn doğrulama` Ancak, sadece ImageComparison grubuna kısıtlamak istiyorsanız, Jetty testlerini hala çalıştırmayı gerektiren notlar olsa da,) 
* Güncelleme bağımlılıkları
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Update plugins
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Bağımlılık güncelleştirmelerinin tüm büyük konfigürasyonlar için hiçbir şeyi bozmadığından emin olmak için testler (Datasets özellikle parsing, başka herhangi bir önemli ayarlar da olsa) . Dış test paketinin çok flaky olabileceğini unutmayın. YavaşAWS testi paketi çok uzun bir süre alabilir.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* TranslateMessages kullanın.translate () Gerekirse çevirileri güncellemek için
* EDStatic.java gelişim kurdu Sahte mod, sürüm numarasını değiştirin ve sürüm tarihini belirtin.
* Yapın
```
mvn clean
mvn compile
mvn package
```
## Canary Canary
Sahilwatch sunucusunda dağıtım için savaş dosyasını gönderin veya veri setlerinin çoğunu kullanan başka bir sunucu gönderin ve çok fazla trafik alın.
Yapının daha geniş dağılımından önce hataları bulmaya çalışmak istiyoruz.

Yeni bir sürüm hakkında konuşurken mesaj ekleyin.

Standart prosedürdür:
* Sahilwatch için savaş dosyasını yükleyin \\[ tomcat \\] /content/erddap /
* kullanıcı=tomcat olarak:
  * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In \\[ tomcat \\] /bin / :
. /shutdown.sh //use "ps -fu tomcat" durdurulmasını sağlamak için
  * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In \\[ tomcat \\] /webapps / :
rm -rf erddap
rm erddap. Savaş savaşı
cp ../content/erddap/erddap2.22.war erddap.war //or sayı ne olursa olsun
  * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In \\[ tomcat \\] /bin / :
./startup.sh
  * Daha sonra ERDDAP Bir web sayfasına geri döndü, içinde \\[ tomcat \\] /webapps / :
chgrp -R erddap erddap
chmod -R g+rw erddap
chmod -R o-rwx erddap

## GitHub Release
GitHub serbest bırakılmasını hazırlamak, erddap.war ve erddapContent .zip   (Hiçbir sürüm numarası yok) 

title: The official v2.25 version
Açıklama: Değişiklikler listesine bakın
      https://erddap.github.io/changes#version-225

## Dokümantasyon Update Update
* Docusaurus'taki sürüm numarasını güncelleyin. yapılandırılmış.ts file (Ayak bölümünde) .
* Belge sayfaları (Dağıtım.md ve dağıtım tarihi.md) .
  * Arama için \\[ Heddap.war \\]  
  * Mevcut bilgileri kopyalayın (Biraz reformcu) Önceki yüklemelerin listesine 2.
  * Mevcut sürüm bilgilerini erddap için değiştirin. Savaşta Savaş \\[ Heddap.war \\] 
* Belge sitesi için çevirileri çalıştırın.
* Bir çekme isteği yapın ve değişiklikleri birleştirin.
* Doküman siteyi çalıştırın (oku) .

## Diğer geri yüklemenin gerekli olduğu tarihe kadar olduğundan emin olun
Mainly this, ErddapContent ve ErddapTest anlamına gelir, ancak gelişim değişiklikleri sırasında tarihe kadar tutulmalıdır.

## Kullanıcılar
İlk önce istenen değişiklikleri talep eden herhangi bir kullanıcıyı bilgilendirin (veya hangi böcekler düzeltildi) . Değişiklikleri doğrulamak ve / veya sorunları yükseltmek için onlara zaman verin.

 ERDDAP 2.25 şimdi mevcuttur&#33;

Değişiklikler hakkında okuyabilirsiniz
https://erddap.github.io/changes#version-225

Bazı değişiklikler önerilen değişikliklerdir. Önerileriniz için çok teşekkür ederiz. Ayrıntıları görmek için değişiklikler listesindeki adınız için arayın. Yakında yeni özellikleri deneyebilirseniz harika olurdu, bu yeni sürümü daha geniş bir izleyiciye duyurmadan önce.

Eğer biriniz varsa ERDDAP Yönetici, yükseltme talimatları atılır
https://erddap.github.io/docs/server-admin/deploy-update

Herhangi bir probleminiz varsa, sorular, öneriler, lütfen e-posta ver.

Kullandığınız için teşekkür ederiz ERDDAP .

### Duyuru
Duyurular Mailing listesine bir duyuru gönderin.
