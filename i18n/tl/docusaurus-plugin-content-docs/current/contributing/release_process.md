---
sidebar_position: 3
---
#  ERDDAP™ Proseso ng Pagpapalaya
* Tiyaking may makukuhang mga talaksan ng paghahambing ng larawan (ito ay maaaring mangahulugan ng pagtakbo `Mavn kumpirmasyon` , kung nais mong pabilisin ang paghihigpit sa grupong ImageCommarson lamang bagaman pansinin na nangangailangan pa rin ng pagtakbo ng Jetty tests) 
* Updated dependencies
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Mga plin na ginawa noong unang panahon
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Tatakbo ang mga pagsubok upang gumawa ng tiyak na mga update para sa dependensiya (ang mga datasets na naka-scripting lalo na, bagaman may iba pang mahahalagang setting) . Pansinin na ang panlabas na pagsubok ay maaaring maging napakalabo. Ang slowAWS test suite ay maaaring kumuha ng napakahabang panahon.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Gamitin `python translation/salin.py` upang i - update ang mga salin kung kinakailangan.
* Ang EDStatic.java ang nagtakda ng pag-unlad Mode to false, baguhin ang version number at magtakda ng petsa ng release.
* Gawin ang gusali.
```
mvn clean
mvn compile
mvn package
```
## Canary
Ipadala ang talaksang pandigma para sa pamamahagi sa Coastwatch server o sa iba pang server na gumagamit ng karamihan sa mga uri ng dataset at tumatanggap ng maraming trapiko.
Nais nating hanapin ang mga pagkakamali bago ang mas malawak na pamamahagi ng gusali.

Isama ang mensahe kapag sinasabi ang tungkol sa isang bagong release.

Ang pamantayang pamamaraan ay:
* I-upload ang talaksang .war sa coastwatch \\[ tomcat \\] /content/erdap/
* Bilang gumagamit=tomcat:
  * Nasa \\[ tomcat \\] /bin/ :
./shutdown.sh //use "ps -fu tomcat" upang matiyak na ito ay tumigil na
  * Nasa \\[ tomcat \\] /webats/ :
erddap ng rm -rf
rm erddap. digmaan
cp ../content/erddap/erddap2.22.war erddap.war //o anuman ang bilang
  * Nasa \\[ tomcat \\] /bin/ :
./startup.sh
  * Pagkatapos ng ERDDAP ay nagbalik ng isang web page, sa \\[ tomcat \\] /webats/ :
Erddap erddap chgrp–R
chmod -R g+rw erddap
chmod -R o-rwx erddap

## Paglaya sa GitHub
Draft the GitHub release, isama ang erddap.war at erddapContent .zip   (walang numero ng bersyon) 

title: The official v2.25 version
paglalarawan: Tingnan ang listahan ng mga pagbabago sa
       https://erddap.github.io/changes#version-225
 

## Talaan ng mga Nilalaman
* I-update ang numero ng bersyon sa docusaurus.config.ts file (sa bahaging footer) .
* Baguhin ang mga pahina ng dokumento (Ilagay-install.md at i-set-update.md) .
  * Paghahanap \\[ erddap.war \\]  
  * Kopyahin ang umiiral na impormasyon (bahagyang reporma) sa talaan ng mga naunang instalasyon 2.
  * Palitan ang kasalukuyang impormasyon para sa erddap. digmaan sa \\[ erddap.war \\] 
* Ipatupad ang mga salin para sa lugar ng dokumento.
* Gumawa ng isang kahilingan at pagsamahin ang mga pagbabago.
* Itapon ang lugar ng dokumentasyon (tingnan ang basahin) .

## Magtakda ng ibang mga repos kung kailan ito kailangan
Pangunahing ibig sabihin nito ay ErddapContent at ErddapTest, ngunit dapat panatilihin hanggang sa kasalukuyan sa panahon ng mga pagbabago sa pag-unlad.

## Bigyang - Pansin ang mga Gumagamit
Bigyang - pansin muna ang sinumang gumagamit na humihiling ng mga pagbabago (o kung kaninong mga insekto ang nakapirme) . Bigyan sila ng panahon upang matiyak ang mga pagbabago at/o magbangon ng mga isyu.

 ERDDAP bersyon 2.25 ay makukuha na ngayon&#33;

Mababasa mo ang tungkol sa mga pagbabago sa
 https://erddap.github.io/changes#version-225
 

Ang ilan sa mga pagbabago ay mga pagbabagong iminungkahi ninyo. Maraming salamat sa inyong mga mungkahi. Hanapin ang iyong pangalan sa listahan ng mga pagbabago upang makita ang mga detalye. Maganda sana kung masubukan mo agad ang bagong mga bahagi, bago ko ipatalastas ang bagong bersiyong ito sa mas maraming tagapakinig.

Kung ikaw ay isang Saksi ERDDAP administrador, ang mga tagubilin para sa pag - asenso ay nasa
 https://erddap.github.io/docs/server-admin/deploy-update
 

Kung ikaw ay may anumang problema, tanong, mungkahi, pakisuyong mag - email ka.

Salamat sa paggamit ERDDAP .

### Walang - bayad na paglaya
Magpadala ng patalastas sa talaan ng Announcements Mailing.
