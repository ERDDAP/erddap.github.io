---
title: "ERDDAP™ and the Cloud"
---
# ERDDAP™at ang Ulap

## Ang Cloud

Ang pinakasimpleng kahulugan ay hindi mga lokal na server. Ito ay napakalawak at maaaring mangahulugan ng maraming iba't ibang setup. Halimbawa, ito ay maaaring isang dedikadong pisikal na server sa isang sentro ng datos, isang Virtual Private Server, isang kabahaging server, server, o iba pang bagay.

### Kung Bakit Ulap

Maraming dahilan kung bakit nais ng mga organisasyon na lumipat sa ulap. Ang pinakamahalaga ay ang pag-aangkop na ibinibigay nito para sa mga pangangailangang compute/stolage kumpara sa pagbili ng pisikal na hardware.

Inaalis nito ang pangangailangang mapanatili ang isang silid ng datacenter/server. Ito'y nagpapahintulot din ng pag - aalis ng malaking halaga sa iyong kasalukuyang mga pangangailangan. Kung paanong ang ulap ay maaaring mangahulugan ng maraming iba't ibang bagay, gayundin naman ang pagkalupkop sa iyong yaman. Maaaring mangahulugan ito ng pagbabayad ng higit pa (o mas mababa) Walang silbi. Maaari itong mangahulugan ng paglipat mula sa kabahaging server tungo sa isang pribadong server. Maaari itong mangahulugan ng pag - abot sa isang mas malaking nakaalay na pisikal na server.

## KayaERDDAP™tumatakbo sa ulap?

Mayroon.

ERDDAP™ay dinisenyo upang tumakbo sa loob ng Tomcat na maaaring patakbuhin sa lokal o sa maulap na kapaligiran. May suporta ng komunidad sa pagtakbo sa Docker at mayroon[opisyal Malapit nang dumating ang suporta ng Docker](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md).

Sinabi niya,ERDDAP™ay dinisenyo sa panahon na ang dedikadong mga server ay pangkaraniwan. Hindi ito walang - silbi, at magiging napakahirap kung hindi man imposibleng gawin itong walang - silbi.

### KayaERDDAP™laki?

Pag - iiskiERDDAP™ay mas masalimuot kaysa sa paggamit lamang ng mas maraming magagamit na server. Mayroon kaming ilang dakilang dokumento tungkol sa[kung paano aabotERDDAP™](https://erddap.github.io/docs/server-admin/scaling). Ginagawa itong mas madaling sukatinERDDAP™ay isang bagay na gustung - gusto natin.

### Ano ang humahadlang sa pag - aayos ng kotse?

ERDDAP™ay gumagawa ng maraming bagay kabilang na ang pag - iingat ng mga dataset hanggang sa kasalukuyan, pagbibigay - alam sa mga sumasang - ayon ng mga pagbabago sa datasets, caching data, pangangasiwa sa mga kahilingan ng gumagamit, at higit pa. Para sa sapat na lakiERDDAP™server na gaya ng[Bantayog sa Baybayin](https://coastwatch.pfeg.noaa.gov/erddap/index.html), ito ay nangangahulugan na ito ay patuloy na paggawa ng isang bagay. Sa katunayan ang patuloy na paggamit ay isang napakamahal na kalagayan para sa walang - silbing mga mapagpipilian (malaking halaga ang ibinabayad mo para sa comute kapag ginagawa mo ang walang serbisyo at sa gayo'y ang pangunahing bentaha ay kapag paminsan - minsan ka lamang tumawag) . Karagdagan pa, sinisikap na ilipat ang lahat ngERDDAP™Ang paggamit ng iba't ibang functionality sa mga bersyong serverless ay hahantong sa mas komplikadong setup na kinakailangan para sa mga admin.

### KayaERDDAP™Gamitin ang Cloud Storage?

Mayroon.

ERDDAP™ay sumusuporta sa imbakan ng ulap (kasama ang WAS S3) at pagbutihin ang suportang ito (halimbawa ng non-AWS S3) ay isang pangunahing bagayERDDAP™development roadmap.ERDDAP™ay may kakayahan din sa paghila ng datos mula sa maraming umiiral na online services. Para sa higit pang impormasyon iminumungkahi ko na suriin ang aming kalagayan[datos ng dokumento ng tipo ng titik](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types).
