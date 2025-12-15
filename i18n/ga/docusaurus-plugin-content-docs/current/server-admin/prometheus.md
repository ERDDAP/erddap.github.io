---
sidebar_position: 9
---
# Táirgí gaolmhara

 [méadracht Prometheus](https://prometheus.io/) ar fáil ag /erddap / méadracht. JVM croí méadracht cuireadh i 2.25 le go leor ERDDAP™ méadracht leanas i leagan 2.26. Más mian leat a bhaint as an méadracht a dhéanamh cinnte go bhfuil tú i leagan ar a laghad 2.26. réamhshocraithe siad a chumasú, is féidir leat iad a dhíchumasú trí chur
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
le do thus.xml.

Tá na méadrachta deartha chun a bheith inléite meaisín. Cé gur féidir leat an leathanach méadrachta a sheiceáil de láimh, le haghaidh monatóireachta doimhneachta moltar freastalaí Prometheus a úsáid. Beidh freastalaí Prometheus stóráil méadracht stairiúil a chuireann ar chumas níos mó i monatóireacht doimhneacht (cosúil le rátaí agus athruithe ó luachanna anuas) , agus is minic a reáchtáiltear é le freastalaí Grafana. Soláthraímid roinnt Painéal na nIonstraimí réamhthógtha a d'fhéadfadh admins a fháil úsáideach le haghaidh dul thosaigh monatóireacht a dhéanamh ar a gcuid freastalaithe.

## Rith freastalaí Prometheus

An doiciméadú is fearr le haghaidh reáchtáil an chairn monatóireachta (Táirgí gaolmhara) Tá sa Prometheus [Léigh níos mó](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md) .

##  ERDDAP™ méadracht

### JVM

 ERDDAP™ onnmhairí roinnt méadrachta gur féidir leat a fháil úsáideach (ag tosú i ERDDAP™ 2.25) . Le haghaidh monatóireacht ghinearálta ar shláinte an JVM úsáidimid na méadrachta a bhailíonn an cliant Prometheus. Áirítear leis seo sonraí faoi bhailiú truflais, úsáid chuimhne, snáitheanna, agus níos mó. Le haghaidh tuilleadh eolais féach ar an [Táirgí gaolmhara Java Cliant JVM doiciméadú](https://prometheus.github.io/client_java/instrumentation/jvm/) .

###  ERDDAP™ ar leith

Táimid ag onnmhairiú freisin roinnt ERDDAP™ méadracht ar leith (ag tosú i ERDDAP™ Déan teagmháil anois) . Más mian leat a tochailt isteach sa chód, is féidir leat teacht ar an méadracht a bailíodh i [riachtanais uisce: measartha](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java) .

####  ERDDAP Déan Teagmháil Linn

Níl an Tweet seo ar fáil ERDDAP™ freastalaí. Cuimsíonn sé leagan (riachtanais uisce: measartha) , leagan_full (mór.minor.pat) agus imscaradh_info (a úsáidtear a chur in iúl conas a úsáidtear an freastalaí, cosúil le 'Docker '') .

#### Uirlisí ilchuspóireacha

Is é seo an méadrach info a léiríonn an staid reatha na bratacha gné. Tá an chuid is mó roghanna cumraíochta boolean mheas bratacha gné.

#### a mhaolú Amharc ar gach eolas

Is méadrach info é seo a léiríonn an bhfuil luasghéarú grafaicí ar fáil.

####  http Déan staidéar

Is é seo an histeagram na réanna freagartha a iarraidh i soicind. Is iad na lipéid a iarraidh_type (mar shampla griddap, tabledap , comhaid, wms) , dataset_id (más infheidhme, an cineál iarrata arís ar shlí eile) , file_type (formáid aschur d'iarraidh e.g. '.html', '.csv', '.iso19115 '') , lang_code (teanga don iarratas, nó teaghrán folamh má réamhshocraithe) , status_code ( http cód stádais na hiarrata e.g. 200, 302, 404) .

Is féidir é seo a úsáid chun iarratais a rianú ag dataset id chun a chinneadh an fhreastalaí ar tacar sonraí tóir. Is féidir leis cabhrú freisin a aithint má tá cineálacha áirithe na n-iarratas atá mall ar do fhreastalaí.

#### Cur síos ar an Táirge

A histeagram na ré tasc snáithe dteagmháil. Tá siad lipéadaithe le rath (fíor / bréagach) .

#### Cur síos ar an Táirge

A histeagram de ré snáithe tasc. Tá siad lipéadaithe le rath (fíor / bréagach) agus tasc_type (taiseachas aeir: fliuch) .

#### Uirlisí ilchuspóireacha

A histeagram na ré le haghaidh tascanna a leagtar sonraí ualach. Tá siad lipéadaithe le mór (fíor / bréagach) .

#### Seol do theachtaireacht a chur chugainn

A histeagram de réanna tasc snáithe r-phost. Tá siad lipéadaithe le rath (fíor / bréagach) .

#### r-phost_count_distribution

A histeagram de ríomhphoist in aghaidh an tasc.

#### dataset_count

A thomhas de na tacair sonraí, a leagtar tar éis gach tacar sonraí ualach glaoch. Níl an Tweet seo ar fáil (greille, tábla) .

#### dataset_failed_load_count

A thomhas de na tacair sonraí a theip a luchtú, a leagtar tar éis gach tacar sonraí ualach glaoch.

#### Bhí an t-eolas úsáideach

Counter na n-iarratas a bhí chaillfidh. Beidh an freastalaí a chaillfidh iarratas nuair a chreideann sé go bhfuil an freastalaí íseal ar chuimhne (RAM) agus go mbeadh an iarraidh ina chúis le fadhbanna. Ní chuireann sé seo san áireamh iarrataí go earráid mar gheall ar RAM íseal nó spás diosca le linn láimhseáil na hiarrata.

#### Bhí an t-eolas mícheart nó as dáta

Counter na n-amanna iarrachtaí an fhreastalaí a sheoladh r-phost chuig an admin go bhfuil cuimhne contúirteach íseal.

#### Táirgí gaolmhara

Counter na n-iarratas a theip mar gheall ar an meaisín ag rith as cuimhne. Is minic go bhfuil sé seo toisc go bhfuil an meaisín ag fáil a lán de na hiarratais daor nó go raibh an t-iarratas ar leith thar a bheith mór.

#### Déan teagmháil linn

Iarratais ar shonraí topo a chomhrac. Níl an Tweet seo ar fáil (taisce / not_cached) .

#### Frithghníomhartha Teorann

Tá bailiúchán de cuntair ann freisin le haghaidh iarrataí ar theorainneacha:

 - national_boundaries_request_total
 - Chuir an t-eolas mearbhall orm
 - Amharc ar gach eolas
 - Déan teagmháil linn

Tá siad lipéadaithe le stádas (garbh, rath, tossed) .
