---
title: "ERDDAP™ and the Cloud"
---
#  ERDDAP™ at ang Ulap

## Ang Cloud

Ang pinakasimpleng kahulugan ay hindi mga lokal na server. Ito ay napakalawak at maaaring mangahulugan ng maraming iba't ibang setup. Halimbawa, ito ay maaaring isang dedikadong pisikal na server sa isang sentro ng datos, isang Virtual Private Server, isang kabahaging server, server, o iba pang bagay.

### Kung Bakit Ulap

Maraming dahilan kung bakit nais ng mga organisasyon na lumipat sa ulap. Ang pinakamahalaga ay ang pag-aangkop na ibinibigay nito para sa mga pangangailangang compute/stolage kumpara sa pagbili ng pisikal na hardware.

Inaalis nito ang pangangailangang mapanatili ang isang silid ng datacenter/server. Ito'y nagpapahintulot din ng pag - aalis ng malaking halaga sa iyong kasalukuyang mga pangangailangan. Kung paanong ang ulap ay maaaring mangahulugan ng maraming iba't ibang bagay, gayundin naman ang pagkalupkop sa iyong yaman. Maaaring mangahulugan ito ng pagbabayad ng higit pa (o mas mababa) Walang silbi. Maaari itong mangahulugan ng paglipat mula sa kabahaging server tungo sa isang pribadong server. Maaari itong mangahulugan ng pag - abot sa isang mas malaking nakaalay na pisikal na server.

## Kaya ERDDAP™ tumatakbo sa ulap?

Mayroon.

 ERDDAP™ ay dinisenyo upang tumakbo sa loob ng Tomcat na maaaring patakbuhin sa lokal o sa maulap na kapaligiran. Ang opisyal na larawan ng Docker ay makukuha sa [Hub ng Docker](https://hub.docker.com/r/erddap/erddap) . Ang `erddap:alpha-latest` Ang tag ay isang gusali batay sa pinakabagong mga pagbabago (tulad ng 'nightly' release', [Mga detalye ng alpha-latest](https://hub.docker.com/layers/erddap/erddap/alpha-latest/) ) , habang `erddap:latest` ang pinakabagong sinubok na paglabas ( [pinakabagong mga detalye](https://hub.docker.com/layers/erddap/erddap/latest/) ) . Maaari mo ring i - browse ang mga release ng container ng GitHub [Mga Package ng GitHub](https://github.com/ERDDAP/erddap/pkgs/container/erddap) . Marami ka pang mababasa tungkol sa paggamit ERDDAP™ kasama [Docker](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .

Para sa mga pagpopondo ng Kubernetes, tingnan ang mga bagong proposed-kubernetes [Mga dokumento](https://erddap.github.io/docs/server-admin/admin-tips/deploy-kubernetes) .

Sinabi niya, ERDDAP™ ay dinisenyo sa panahon na ang dedikadong mga server ay pangkaraniwan. Hindi ito walang - silbi, at magiging napakahirap kung hindi man imposibleng gawin itong walang - silbi.

### Kaya ERDDAP™ laki?

Pag - iiski ERDDAP™ ay mas masalimuot kaysa sa paggamit lamang ng mas maraming magagamit na server. Mayroon kaming ilang dakilang dokumento tungkol sa [kung paano aabot ERDDAP™ ](https://erddap.github.io/docs/server-admin/scaling) . Ginagawa itong mas madaling sukatin ERDDAP™ ay isang bagay na gustung - gusto natin.

### Ano ang humahadlang sa pag - aayos ng kotse?

 ERDDAP™ ay gumagawa ng maraming bagay kabilang na ang pag - iingat ng mga dataset hanggang sa kasalukuyan, pagbibigay - alam sa mga sumasang - ayon ng mga pagbabago sa datasets, caching data, pangangasiwa sa mga kahilingan ng gumagamit, at higit pa. Para sa sapat na laki ERDDAP™ server na gaya ng [Bantayog sa Baybayin](https://coastwatch.pfeg.noaa.gov/erddap/index.html) , ito ay nangangahulugan na ito ay patuloy na paggawa ng isang bagay. Sa katunayan ang patuloy na paggamit ay isang napakamahal na kalagayan para sa walang - silbing mga mapagpipilian (malaking halaga ang ibinabayad mo para sa comute kapag ginagawa mo ang walang serbisyo at sa gayo'y ang pangunahing bentaha ay kapag paminsan - minsan ka lamang tumawag) . Karagdagan pa, sinisikap na ilipat ang lahat ng ERDDAP™ Ang paggamit ng iba't ibang functionality sa mga bersyong serverless ay hahantong sa mas komplikadong setup na kinakailangan para sa mga admin.

### Kaya ERDDAP™ Gamitin ang Cloud Storage?

Mayroon.

 ERDDAP™ ay sumusuporta sa imbakan ng ulap (kasama ang WAS S3) at pagbutihin ang suportang ito (halimbawa ng non-AWS S3) ay isang pangunahing bagay ERDDAP™ development roadmap. ERDDAP™ ay may kakayahan din sa paghila ng datos mula sa maraming umiiral na online services. Para sa higit pang impormasyon iminumungkahi ko na suriin ang aming kalagayan [datos ng dokumento ng tipo ng titik](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) .
