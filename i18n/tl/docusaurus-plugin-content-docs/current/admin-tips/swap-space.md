Ang nilalamang ito ay batay sa isang [mensahe mula kay Roy Mendelssohn hanggang sa ERDDAP grupong gumagamit](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) .

Ang karamihan sa mga kahilingan sa atin ay nagsasangkot ng mga problema sa paggamit ng memorya ERDDAP™ . Ang ilan dito ay mula sa mga pagbabago sa pangangasiwa ng memorya sa Java , at mga interaksiyon din sa Linux OS memory management. Pagsisimula Naniniwala Ako Java 17, Java gumamit ng higit na memorya kaysa sa inilalagay sa bunton. Makikita mo ito kung titingnan mo ang iyong mga bunton at pagkatapos ay gagamit ka ng mga utos na gaya ng itaas, tuktok, o btop upang suriin ang paggamit sa memorya ng mga aplikasyon. Kaya halimbawa ang aming labis na gamit ERDDAP™ ay may puwang na itinakda sa 21GB, ngunit sa katunayan ang paggamit ng memorya ay maaaring tumakbo sa 28GB-30GB, kung minsan ay mas mataas pa. Ang halagang ito ay maaaring lumaki kung maraming sabay - sabay na malalaking kahilingan sa sistema.

Sa karamihan ng mga sistemang Linux, minsang ang paggamit ng memorya ay mahigit sa 50%, ang OS ay magsisimulang magpalitan ng memorya. Isa pa, sapagkat karamihan ng mga sistema ay nagpapalitan ng lugar ay hindi ang basurang natipon hanggang sa kailangang - kailangan, na para sa mga ito'y para sa ERDDAP™ ay huli na, at maaaring pagmulan ERDDAP™ upang matigil. At ang pagpapalitan ng espasyo ay mabagal, na sa kalakhan datasets.xml ay maaaring maging sanhi ng mga pangunahing update na hindi makompleto, na nagpapalubha sa mga problema.

Ano ang magagawa mo tungkol dito. Una, alamin ang tunay na paggamit ng memorya o ang iyong sistema, at magkaroon ng sapat na RAM upang ang paggamit ng memorya ay hindi lumampas sa 50%. Subalit mayroon ding dalawang setting na maaaring magbago sa gawi na ito, ang vm.swappy. at vm.vfs_cache_pressure.

Ang vm.swappy ang kumokontrol kung gaano katinding ginagamit ng Linux kernel ang lugar ng palitan. Maaari mong suriin ang kasalukuyang halaga nito sa pamamagitan ng:

> cat /proc/sys/vm/swappiness
>
• Ang default ay karaniwang 60 (0 hanggang 100) .
• Ang mas mababang mga pamantayan ay gumagawa sa sistema na hindi gaanong palitan.
• Ang halaga ng 10 o 1 ay kadalasang ginagamit para sa mga sistemang may maraming RAM.


Sabihin sa 10:

> sudo sysctl vm.swappiness=10
>

At upang permanenteng magbago:

> sudo nano /etc/sysctl.conf
>

At ayusin ang halaga ng vim.swappy. Pagkatapos ay ikapit ang pagbabago:

> sudo sysctl -p
>

vm.vfs_cache_pressure. ang sabi ng sistema kung gaano kabagsik ang magbalik ng memorya. Mas mataas na mga pamantayan. (100 o higit pa) Sabihin sa sistema na maging mas agresibo, upang suriin ang kasalukuyang halaga:

> cat /proc/sys/vm/vfs_cache_pressure
>

Upang baguhin ang halaga hanggang sa susunod na reboot:

> sudo sysctl vm.vfs_cache_pressure=150
>

Upang permanenteng baguhin ang halaga:

> sudo nano /etc/sysctl.conf
>

At pagkatapos ay idagdag o i-update ang linya:

> vm.vfs_cache_pressure = 100
>

Pagkatapos ay ikapit ang pagbabago:

> sudo sysctl -p
>


Ano ang maaari mong gawin kung susubaybayan mo ang paggamit mo ng lugar at mapapansin mo na ang pagpapalit ng gamit ay nagsisimulang dumami? May isang utos na mag - aalis ng laman sa lugar ng palitan at mag - aalis ng laman sa memorya. Bago gamitin ito, kailangan mong tiyakin na ang makukuhang memorya ay mas malaki kaysa sa pagpapalit ng gamit. Sabi ko na ang makukuhang memorya sapagkat sa mga sistema ng Linux na may mabigat na disk na gamit na “cached memoryific ay maaaring napakataas, kaya ang “free memoryific ay magpapakita bilang napakababa, ngunit ang “cache memoryić ay makukuha kung kinakailangan para sa mga utos na tulad nito.

> sudo swapoff -a && sudo swapon -a
>

Upang matiyak lamang Gusto ko ring pilitin ang pangongolekta ng basura pagkatapos kong gawin ito:

> sudo jcmd $(pgrep java) GC.run
>

Inaasahan ko na sana'y masumpungan ng ilang tao na kapaki - pakinabang ang impormasyong ito. Gusto nating gawin ERDDAP™ Hangga't maaari, maging matatag hangga't maaari sa aktuwal na pagtatrabaho ng mga tao.
