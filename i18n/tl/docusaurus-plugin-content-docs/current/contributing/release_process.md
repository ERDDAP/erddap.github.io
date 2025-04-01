---
sidebar_position: 3
---
# ERDDAP™Proseso ng Pagpapalaya
* Tiyaking may makukuhang mga talaksan ng paghahambing ng larawan (Maaaring mangahulugan ito ng pagtakbo ng `mvn tortruct`, kung nais mong pabilisin ang paghihigpit sa grupong ImageComparison lamang bagaman pansinin na kailangan pa rin ang pagtakbo ng Jetty tests) 
* Updated dependencies
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Makabagong mga plin
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Tumatakbo ng mga pagsubok upang gumawa ng tiyak na mga update para sa dependensiya (partikular na ang mga datasets parping, bagaman may iba pang mahahalagang setting) 
```
mvn verify
```
* Gumamit ng mga TranslateMesage. () upang i - update ang mga salin kung kinakailangan
* Ang EDStatic.java ang nagtakda ng pag-unlad Mode to false, palitan ang version number at magtakda ng petsa ng release.
* Gawin ang gusali
```
mvn clean
mvn compile
mvn package
```
## Canary
Ipadala ang talaksang pandigma para sa distribusyon sa Coastwatch server o iba pang server na gumagamit ng karamihan sa mga uri ng dataset at tumatanggap ng maraming trapiko.
Nais nating hanapin ang mga pagkakamali bago ang mas malawak na pamamahagi ng gusali.

Isama ang mensahe kapag sinasabi ang tungkol sa isang bagong release.

Ang pamantayang pamamaraan ay:
* Itaas ang talaksang .war sa coastwatch\\[tomcat\\]/content/erddap/
* Bilang gumagamit=tomcat:
  * Sa loob\\[tomcat\\]/bin/ :
./shutdown.sh //use "ps -fu tomcat" upang matiyak na ito ay tumigil
  * Sa loob\\[tomcat\\]/webapps/ :
erddap ng rm -rf
rm erddap. digmaan
cp ../content/erddap/erddap2.22.war erddap.war //o anuman ang bilang
  * Sa loob\\[tomcat\\]/bin/ :
./startup.sh
  * Pagkatapos ngERDDAPay nagbalik ng isang web page, sa\\[tomcat\\]/webapps/ :
Erddap erddap chgrp–R
chmod -R g+rw erddap
chmod -R o-rwx erddap

## Paglaya sa GitHub
Draft the GitHub release, isama ang erddap.war at erddapContent.zip  (walang numero ng bersyon) 

title: The official v2.25 version
paglalarawan: Tingnan ang listahan ng mga pagbabago sa
       https://erddap.github.io/changes#version-225
 

## Talaan ng mga Nilalaman
* Update ang bilang ng bersyon sa docusaurus.config.ts file (sa bahaging footer) .
* Baguhin ang mga pahina ng dokumento (Ilagay-install.md at i-set-update.md) .
  * Paghahanap\\[erddap.war\\] 
  * Kopyahin ang umiiral na impormasyon (bahagyang reporma) sa talaan ng mga naunang instalasyon 2.
  * Palitan ang kasalukuyang impormasyon para sa erddap. digmaan sa\\[erddap.war\\]
* Itakbo ang mga salin para sa lugar ng dokumento.
* Gumawa ng kahilingan at pagsamahin ang mga pagbabago.
* Itapon ang lugar ng dokumentasyon (tingnan ang Readme) .

## Ang iba pang repos ay nasa petsa na kung kinakailangan
Pangunahing ibig sabihin nito ay ErddapContent at ErddapTest, ngunit dapat itong panatilihin hanggang sa kasalukuyan sa panahon ng mga pagbabago sa pag-unlad.

## Bigyang - Pansin ang mga Gumagamit
Bigyang - pansin muna ang sinumang gumagamit na humihiling ng mga pagbabago (o kung kaninong mga insekto ang nakapirme) . Bigyan sila ng panahon upang matiyak ang mga pagbabago at/o magbangon ng mga isyu.

ERDDAPbersyon 2.25 ay makukuha na ngayon&#33;

Mababasa mo ang tungkol sa mga pagbabago sa
 https://erddap.github.io/changes#version-225
 

Ang ilan sa mga pagbabago ay mga pagbabagong iminungkahi ninyo. Maraming salamat sa inyong mga mungkahi. Hanapin ang iyong pangalan sa listahan ng mga pagbabago upang makita ang mga detalye. Maganda sana kung masubukan mo agad ang bagong mga bahagi, bago ko ipatalastas ang bagong bersiyong ito sa mas maraming tagapakinig.

Kung ikaw ay isang SaksiERDDAPadministrador, ang mga tagubilin para sa pag - asenso ay nasa
 https://erddap.github.io/docs/server-admin/deploy-update
 

Kung ikaw ay may anumang problema, tanong, mungkahi, pakisuyong mag - email ka.

Salamat sa paggamitERDDAP.

### Walang - tigil na paglaya
Magpadala ng patalastas sa talaan ng Announcements Mailing.
