---
title: "ERDDAP™ and the Cloud"
---
# ERDDAP™agus an Cloud

## Cad é an Cloud

Níl an sainmhíniú is simplí freastalaithe áitiúla. Tá sé seo an-leathan agus is féidir a chiallaíonn go leor setups éagsúla. Mar shampla, d'fhéadfadh sé a bheith ina freastalaí fisiciúil tiomnaithe in ionad sonraí, Freastalaí Príobháideacha Fíorúil, freastalaí roinnte, serverless, nó rud éigin eile.

### Cén fáth a bhfuil Cloud

Tá go leor cúiseanna eagraíochtaí ag iarraidh a bhogadh go dtí an scamall. Is é an ceann is tábhachtaí ná an tsolúbthacht a sholáthraíonn sé do riachtanais ríomh / stórála i gcomparáid le crua-earraí fisiceacha a cheannach.

Cuireann sé seo deireadh leis an ngá atá le seomra sonraí a choinneáil. Ligeann sé freisin acmhainní a ríomh chun do riachtanais reatha. Is féidir go leor cosúil leis an scamall a chiallaíonn go leor rudaí éagsúla, a bheith in ann a scála do acmhainní a dhéanann chomh maith. D'fhéadfadh sé a chiallaíonn íoc le haghaidh níos mó (nó níos lú) acmhainní freastalaí. D'fhéadfadh sé i gceist ag bogadh ó fhreastalaí roinnte le freastalaí príobháideach. D'fhéadfadh sé a chiallaíonn uasghrádú chun freastalaí fisiciúil níos tiomanta.

## An féidirERDDAP™reáchtáil sa scamall?

Tá.

ERDDAP™Tá sé deartha a reáchtáil laistigh Tomcat is féidir a reáchtáil go háitiúil nó i dtimpeallachtaí scamall. Tá tacaíocht pobail do reáchtáil i Docker agus tá[oifigiúla Tacaíocht Docker ag teacht go luath](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md).

Dúirt sé sin,ERDDAP™dearadh ag an am nuair a bhí freastalaithe tiomanta an norm. Níl sé gan fhreastalaí, agus bheadh sé thar a bheith deacair mura féidir é a dhéanamh gan fhreastalaí.

### An féidirERDDAP™scála?

ScalingERDDAP™Tá sé níos casta ná díreach ag baint úsáide as acmhainní níos mó gan fhreastalaí. Tá roinnt doiciméadú mór ar[conas a scálaERDDAP™](https://erddap.github.io/docs/server-admin/scaling). Ag déanamh níos éasca a scálaERDDAP™Is rud éigin go bhfuil suim againn i.

### Cad a chuireann cosc ar autoscaling?

ERDDAP™ag déanamh go leor rudaí lena n-áirítear a choinneáil datasets suas chun dáta, ag cur in iúl síntiúsóirí na n-athruithe ar datasets, sonraí caching, láimhseáil iarrataí úsáideora, agus níos mó. Le haghaidh sách mórERDDAP™freastalaí mhaith[Féach ar an bpróifíl](https://coastwatch.pfeg.noaa.gov/erddap/index.html), ciallaíonn sé seo go bhfuil sé ag déanamh go leanúnach rud éigin. Tá úsáid leanúnach i ndáiríre staid an-daor do roghanna freastalaí (íocann tú préimh mhór le haghaidh ríomh nuair a dhéanamh serverless agus mar sin tá an buntáiste is mó nuair a dhéanann tú ach ó am go chéile glaonna) . Ina theannta sin, ag iarraidh a bhogadh go léir deERDDAP™Bheadh feidhmiúlacht éagsúla chun leaganacha freastalaí deireadh suas le thus i bhfad níos casta ag teastáil le haghaidh admins.

### An féidirERDDAP™úsáid Stóráil Cloud?

Tá.

ERDDAP™tacú le stóráil scamall (S3 SWS san áireamh) agus feabhas a chur ar an tacaíocht seo (mar shampla S3 neamh-AWS) Is tosaíocht ard ar anERDDAP™forbairt treochlár.ERDDAP™Is féidir freisin sonraí a tharraingt ó go leor seirbhísí ar líne atá ann cheana féin. Chun tuilleadh eolais a fháil, molaim féachaint ar ár[data recovery type document](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types).
