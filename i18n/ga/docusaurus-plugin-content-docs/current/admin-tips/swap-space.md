Tá an t-ábhar seo bunaithe ar [teachtaireacht ó Roy Mendelssohn go dtí an ERDDAP web development](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) .

A lán de na hiarratais cabhrach a fháil againn i gceist fadhbanna le húsáid chuimhne i ERDDAP™ . Tagann cuid de seo ó athruithe i mbainistíocht chuimhne i Java , agus idirghníomhaíochtaí le bainistíocht cuimhne Linux OS. Ag tosú Creidim i Java 17, Java Úsáideann cuimhne níos mó ná an méid atá curtha síos i suímh gcarn. Is féidir leat é seo a fheiceáil má fhéachann tú ar do suímh gcarn agus ansin orduithe a úsáid ar nós barr, barr, nó btop a sheiceáil an úsáid chuimhne na n-iarratas. Mar sin, mar shampla ár n-úsáid go mór ERDDAP™ Tá spás gcarn leagtha ag 21GB, ach i ndáiríre is féidir úsáid chuimhne a reáchtáil go 28GB-30GB, uaireanta níos airde. Is féidir leis an luach seo spike má tá a lán iarrataí móra comhuaineacha ar an gcóras.

Ar an chuid is mó córais Linux, nuair a fhaigheann úsáid chuimhne os cionn thart ar 50%, beidh an OS tús swapping amach cuimhne. Thairis sin, le haghaidh an chuid is mó de na córais nach bhfuil spás swap truflais a bailíodh go dtí go fíor is gá, a le haghaidh ERDDAP™ Tá sé ró-dhéanach, agus is féidir a chur faoi deara ERDDAP™ a reo. Agus tá spás swap mall, a bhfuil do mhór datasets.xml Is féidir a chur faoi deara nuashonruithe mór gan a chur i gcrích, a cumaisc ansin na fadhbanna.

Cad is féidir leat a dhéanamh faoi seo. Ar dtús, a fháil amach an úsáid chuimhne fíor nó do chóras, agus tá go leor RAM ionas nach bhfuil an úsáid chuimhne níos mó ná 50%. Ach tá dhá shuíomh ann freisin ar féidir leis an iompar seo a athrú, vm.swappiness. agus vm.vfs_cache_pressure.

vm.swappiness rialuithe conas aggressively úsáideann an eithne Linux spás swap. Is féidir leat a luach reatha a sheiceáil le:

> cat /proc/sys/vm/swappiness
>
• • Tá locht de ghnáth 60 (ar scála ó 0 go 100) .
• • Déanann luachanna níos ísle an córas níos lú seans go swap.
• • Tá luach 10 nó 1 a úsáidtear go minic le haghaidh córais le neart RAM.


A athrú ar an luach go dtí reboot, a rá go 10:

> sudo sysctl vm.swappiness=10
>

Agus a athrú go buan:

> sudo nano /etc/sysctl.conf
>

Agus in eagar an luach le haghaidh vm.swappiness. Ansin an t-athrú a chur i bhfeidhm:

> sudo sysctl -p
>

vm.vfs_cache_pressure. Insíonn an córas conas ionsaitheach a bheith i gcuimhne reclaiming. Luachanna níos airde. (100 nó níos mó) inis an córas a bheith níos ionsaitheach, Chun an luach reatha a sheiceáil:

> cat /proc/sys/vm/vfs_cache_pressure
>

A athrú ar an luach till an chéad reboot eile:

> sudo sysctl vm.vfs_cache_pressure=150
>

Chun an luach a athrú go buan:

> sudo nano /etc/sysctl.conf
>

Agus ansin cuir nó an líne a nuashonrú:

> vm.vfs_cache_pressure = 100
>

Agus ansin cuir an t-athrú i bhfeidhm:

> sudo sysctl -p
>


Cad is féidir leat a dhéanamh má dhéanann tú monatóireacht ar do úsáid spás swap agus tú faoi deara go bhfuil úsáid swap tús a mhéadú? Tá ordú go mbeidh spás swap folamh agus an t-ábhar a bhogadh chun cuimhne. Roimh úsáid seo, ní mór duit a dhéanamh cinnte go bhfuil cuimhne ar fáil níos mó ná úsáid swap. Deirim cuimhne ar fáil mar gheall ar i gcórais Linux le úsáid dhiosca trom "chuimhne cached" Is féidir a bheith ard go leor, mar sin beidh "chuimhne saor in aisce" a thaispeáint mar a bheith an-íseal, ach beidh "chuimhne cache" a chur ar fáil más gá le haghaidh orduithe mar seo.

> sudo swapoff -a && sudo swapon -a
>

Just a bheith cinnte Is maith liom a chur i bhfeidhm bailiúchán truflais freisin tar éis é seo a dhéanamh:

> sudo jcmd $(pgrep java) GC.run
>

Arís tá súil agam roinnt daoine teacht ar an eolas seo úsáideach. Ba mhaith linn a dhéanamh ERDDAP™ chomh láidir agus is féidir, agus a bheith ag obair chomh seamlessly agus is féidir leis an gcaoi a n-oibríonn daoine i ndáiríre.
