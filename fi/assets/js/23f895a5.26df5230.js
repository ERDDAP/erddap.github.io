"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5480],{11897:(t,a,i)=>{i.r(a),i.d(a,{assets:()=>r,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>e,toc:()=>k});const e=JSON.parse('{"id":"server-admin/EDDTableFromEML","title":"EDDTableFromEML","description":"\\\\\\\\[T\xe4m\xe4 sivu kiinnostaa vainERDDAP\u2122J\xe4rjest\xe4j\xe4t, jotka ty\xf6skentelev\xe4t EML-tiedostojen kanssa.","source":"@site/i18n/fi/docusaurus-plugin-content-docs/current/server-admin/EDDTableFromEML.md","sourceDirName":"server-admin","slug":"/server-admin/EDDTableFromEML","permalink":"/fi/docs/server-admin/EDDTableFromEML","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/server-admin/EDDTableFromEML.md","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"title":"EDDTableFromEML","sidebar_position":6},"sidebar":"docSidebar","previous":{"title":"Scaling","permalink":"/fi/docs/server-admin/scaling"},"next":{"title":"displayInfo and displayAttribute","permalink":"/fi/docs/server-admin/display-info"}}');var s=i(74848),n=i(28453);const o={title:"EDDTableFromEML",sidebar_position:6},l="EDDTableFromEML ja EDDTableFromEMLBatch Vaihtoehtoja GenerateDatasets XM",r={},k=[{value:"Kysymyksi\xe4",id:"questions",level:2},{value:"Design yksityiskohdat",id:"design-details",level:2},{value:"Yksi taulukko on yksiERDDAP\u2122Dataa",id:"one-datatable-becomes-one-erddap-dataset",level:3},{value:"EML vs. CF+ACDD",id:"eml-versus-cfacdd",level:3},{value:"Pieni\xe4 muutoksia",id:"small-changes",level:3},{value:"DocBook",id:"docbook",level:3},{value:"Datatiedostot",id:"data-files",level:3},{value:".zipD Data Files",id:"zipd-data-files",level:3},{value:"Varastointityyppi",id:"storagetype",level:3},{value:"Yksik\xf6t",id:"units",level:3},{value:"EML-versio 2.1.1",id:"eml-version-211",level:3},{value:"EML-tiedostojen ongelmat",id:"issues-with-the-eml-files",level:2},{value:"Erilliset p\xe4iv\xe4m\xe4\xe4r\xe4t ja aikasarakkeet",id:"separate-date-and-time-columns",level:3},{value:"Ep\xe4johdonmukainen nimi",id:"inconsistent-column-names",level:3},{value:"Erilainen sarake",id:"different-column-order",level:3},{value:"V\xe4\xe4r\xe4 numHeaderLines",id:"incorrect-numheaderlines",level:3},{value:"NumHeaderLines = 0",id:"numheaderlines--0",level:3},{value:"DateTime Format Strings",id:"datetime-format-strings",level:3},{value:"P\xe4iv\xe4m\xe4\xe4r\xe4, mutta ei aikaa",id:"datetime-but-no-time-zone",level:3},{value:"Kadonnutmissing\\_value",id:"missing-missing_value",level:3},{value:"Pieni\xe4 ongelmia",id:"small-problems",level:3},{value:"Unicode-ominaisuudet",id:"invalid-unicode-characters",level:3},{value:"Erilaiset sarakkeet) (#differentColumnUnits)",id:"different-column-unitsdifferentcolumnunits",level:3},{value:"EML eri versiot",id:"different-versions-of-eml",level:3},{value:"Ongelma datatiedoston parissa",id:"trouble-parsing-the-data-file",level:3}];function d(t){const a={a:"a",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,n.R)(),...t.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a.header,{children:(0,s.jsx)(a.h1,{id:"eddtablefromeml-ja-eddtablefromemlbatch-vaihtoehtoja-generatedatasets-xm",children:"EDDTableFromEML ja EDDTableFromEMLBatch Vaihtoehtoja GenerateDatasets XM"})}),"\n",(0,s.jsx)(a.p,{children:"\\[T\xe4m\xe4 sivu kiinnostaa vainERDDAP\u2122J\xe4rjest\xe4j\xe4t, jotka ty\xf6skentelev\xe4t EML-tiedostojen kanssa.\nT\xe4m\xe4 asiakirja on alun perin luotu vuonna 2016. Se julkaistiin viimeksi vuosina 2020-11-30.\\]"}),"\n",(0,s.jsxs)(a.p,{children:[(0,s.jsxs)(a.a,{href:"https://coastwatch.pfeg.noaa.gov/erddap/index.html",children:[" ",(0,s.jsx)(a.strong,{children:"ERDDAP\u2122"})," "]}),"Tietopalvelin, joka antaa k\xe4ytt\xe4jille yksinkertaisen, johdonmukaisen tavan ladata verkko- ja tabulaarisia tieteellisi\xe4 tietoaineistoja yhteisiss\xe4 tiedostomuodoissa ja tehd\xe4 kaavioita ja karttoja.ERDDAP\u2122toimii tietyll\xe4 tietoaineistolla joko moniulotteisten muuttujien ryhm\xe4n\xe4 (esimerkiksi satelliitti- tai mallitiedot) Tietokannan kaltainen taulukko (jokaiselle tietotyypille ja rivi jokaiselle havainnolle) .ERDDAP\u2122Se on vapaa ja avoin l\xe4hdekoodi, joten kuka tahansa voi",(0,s.jsx)(a.a,{href:"/docs/server-admin/deploy-install",children:"Lataa ja asennaERDDAP\u2122"}),"palvellakseen tietojaan."]}),"\n",(0,s.jsxs)(a.p,{children:["Lis\xe4t\xe4\xe4n tietoaineisto yhdelleERDDAP\u2122Asennus,ERDDAP\u2122Hallinnoitsijan on lis\xe4tt\xe4v\xe4 XML",":n"," merkki, joka kuvaa tietoaineistoa tiedostoon, jota kutsutaan nimell\xe4 tiedosto.datasets.xml. (On olemassa",(0,s.jsx)(a.a,{href:"/docs/server-admin/datasets",children:"perusteellinen dokumentointidatasets.xml"}),".) Vaikka XML:\xe4\xe4 voidaan tuottaadatasets.xmlkokonaan k\xe4sin,ERDDAP\u2122Sis\xe4lt\xe4\xe4 ty\xf6kalun, jota kutsutaan",(0,s.jsxs)(a.a,{href:"/docs/server-admin/datasets#tools",children:[" ",(0,s.jsx)(a.strong,{children:"GenerateDatasetsXml"})," "]}),"jotka voivat luoda karkean XML",":n"," luonnoksen, jota tarvitaan tiettyyn tietoaineistoon, joka perustuu johonkin tietol\xe4hteeseen."]}),"\n",(0,s.jsxs)(a.p,{children:["Ensimm\xe4inen GenerateDatasets Xml kysyy, millaista dataa haluat luoda. GenerateDatasets XML on erityinen vaihtoehto. ",(0,s.jsx)(a.strong,{children:"EDDTableFromEML"})," joka k\xe4ytt\xe4\xe4 tietoja er\xe4\xe4ss\xe4",(0,s.jsx)(a.a,{href:"https://knb.ecoinformatics.org/external//emlparser/docs/index.html",children:"Ekologinen kieli (EML) "}),"XML-tiedoston luominen XML-levylledatasets.xmlluodaan",(0,s.jsx)(a.a,{href:"/docs/server-admin/datasets#eddtablefromasciifiles",children:"EDDTableFromAsciiFiles"}),"Tiedot kustakin taulukosta EML-tiedostossa. T\xe4m\xe4 toimii hyvin useimmille EML-tiedostoille, l\xe4hinn\xe4 siksi, ett\xe4 EML-tiedostot tekev\xe4t erinomaista ty\xf6t\xe4 kaikkien tarvittavien metatietojen tallentamiseksi tietoaineistoon helppok\xe4ytt\xf6isess\xe4 muodossa. Tiedot, jotka GenerateDatasetsXml",":n"," on luotava tietoaineistot, ovat EML-tiedostossa, mukaan lukien URL-osoite tietotiedostolle, jonka GenerateDatasetsXml lataa, pakkaa ja vertailee EML-tiedoston kuvausta. (Monet ryhm\xe4t voisivat siirty\xe4 EML:\xe4\xe4n, mik\xe4 on hyv\xe4 j\xe4rjestelm\xe4, jolla dokumentoidaan mit\xe4 tahansa tabulaarista tieteellist\xe4 tietoa, ei vain ekologista tietoa. Ja monet ryhm\xe4t, jotka luovat XML-rakenteita, voisivat k\xe4ytt\xe4\xe4 EML:\xe4\xe4 selke\xe4n XML-rakenteen tapaustutkimuksena. (Liikaa tasoja) Ihmisille ja tietokoneille on helppo ty\xf6skennell\xe4.)"]}),"\n",(0,s.jsx)(a.h2,{id:"questions",children:"Kysymyksi\xe4"}),"\n",(0,s.jsx)(a.p,{children:"T\xe4ss\xe4 kaikki kysymykset GenerateDatasets Xml kysyy kommentteja siit\xe4, miten sinun pit\xe4isi vastata, jos haluat k\xe4sitell\xe4 vain yhden EML-tiedoston tai EML-tiedostojen er\xe4n:"}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Mik\xe4 EDDType?\nJos haluat k\xe4sitell\xe4 vain yhden tiedoston, vastaa: EDDTableFromEML\nJos haluat k\xe4sitell\xe4 ryhm\xe4n tiedostoja, vastaa: EDDTableFromEMLBatch"}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Ohjaus tiedostojen tallentamiseen?\nKirjoita hakemiston nimi, jota k\xe4ytet\xe4\xe4n ladattujen EML- ja/tai tietotiedostojen tallentamiseen.\nJos hakemistoa ei ole, se luodaan."}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"(EDDTableFromEML Vain vain vain) EML URL tai paikallinen tiedostonimi?\nKirjoita EML-tiedoston URL-osoite tai paikallinen tiedostonimi."}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:["(Vain EDDTableFromEMLBatch) EML likainen (URL tai paikallinen) ??\nKirjoita hakemiston nimi EML-tiedostoilla (URL tai paikallinen lika) .\nEsimerkiksi: ",(0,s.jsx)(a.a,{href:"http://sbc.lternet.edu/data/eml/files/",children:"http://sbc.lternet.edu/data/eml/files/"})]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"(Vain EDDTableFromEMLBatch) Filename Regex?\nSy\xf6t\xe4 s\xe4\xe4nn\xf6llinen ilmaisu, jota k\xe4ytet\xe4\xe4n EML-hakemiston haluttujen EML-tiedostojen tunnistamiseen.\nEsimerkiksi knb-lter-sbc. +"}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"K\xe4yt\xe4 paikallisia tiedostoja, jos (Todellista|V\xe4\xe4rin v\xe4\xe4r\xe4) ??\nSy\xf6t\xe4 aitoa k\xe4ytt\xe4\xe4 olemassa olevia paikallisia EML-tiedostoja ja datatiedostoja, jos niit\xe4 on.\nSy\xf6t\xe4 v\xe4\xe4rennettyj\xe4, jotta voit aina ladata EML-tiedostoja ja/tai datatiedostoja uudelleen."}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:['Saatavuus To?\nJos haluat, ett\xe4 uudet tietoaineistot ovat yksityisi\xe4 tietoaineistojaERDDAPm\xe4\xe4ritt\xe4\xe4 ryhm\xe4n nimi (s) T\xe4m\xe4 on sallittua p\xe4\xe4sy\xe4.\nSuositellaan LTER-ryhmille: Yhdist\xe4 "Lter" ja ryhm\xe4, esim. Sbc.\nJos tulet "null", ei ole<Saatavuus To &gt: Tag in the output.\nN\xe4yt\xe4',(0,s.jsx)(a.a,{href:"/docs/server-admin/datasets#accessibleto",children:"Saatavuus To"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:["Paikallinen Aikavy\xf6hyke (Yhdysvallat/Tyynenmeren alue) ??\nJos aikamuuttuja osoittaa, ett\xe4 sill\xe4 on paikallisia aika-arvoja, t\xe4m\xe4 aikavy\xf6hyke m\xe4\xe4ritet\xe4\xe4n.\nT\xe4m\xe4n on oltava arvoa",(0,s.jsx)(a.a,{href:"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",children:"TZ-sarakkeiden luettelo aikavy\xf6hykkeiden nimist\xe4"}),'.\nHuomaa kaikki helppok\xe4ytt\xf6iset "US/..."-nimet listan lopussa.\nJos my\xf6hemmin huomaat, ett\xe4 se on v\xe4\xe4rin, voit muuttaatime\\_zoneS\xe4velt\xe4j\xe4 The Chunk ofdatasets.xml.']}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(a.p,{children:["EML plusERDDAP\u2122Se on hyv\xe4 yhdistelm\xe4, koskaERDDAP\u2122Se voi antaa k\xe4ytt\xe4jille enemm\xe4n suoraa p\xe4\xe4sy\xe4 varallisuuteen.",(0,s.jsx)(a.a,{href:"https://knb.ecoinformatics.org/",children:"Biokompleksisuuden osaamisverkosto (KNB) "}),"ja",(0,s.jsx)(a.a,{href:"https://lternet.edu/",children:"Pitk\xe4aikainen ekologinen tutkimus (L\xe4hteet) "}),"Tutustu ja auta n\xe4it\xe4 hankkeita USA",":n"," hallituksen",(0,s.jsx)(a.a,{href:"https://nosc.noaa.gov/EDMC/PD.DSP.php",children:"Julkinen p\xe4\xe4sy tutkimustuloksiin (Paar) Vaatimukset"}),"asettamalla tiedot saataville verkkopalvelun kautta. EML plusERDDAP\u2122N\xe4ytt\xe4\xe4 olevan suuri silta tiedemiesten v\xe4lill\xe4 akateemisessa / NSF-rahoitetussa maailmassa ja tiedemiehet liittovaltion virastossa. (NOAANasa, USGS) todellisuutta."]}),"\n",(0,s.jsxs)(a.p,{children:["Katso meid\xe4n",(0,s.jsx)(a.a,{href:"/docs/intro#support",children:"Lis\xe4tuen saaminen"}),".\n\xa0"]}),"\n",(0,s.jsx)(a.h2,{id:"design-details",children:"Design yksityiskohdat"}),"\n",(0,s.jsxs)(a.p,{children:["T\xe4ss\xe4 ovat EDDTableFromEML-vaihtoehdon suunnittelutiedot GenerateDatasetsXml.\nJotkin ovat yhteydess\xe4 EML",":n"," jaERDDAP\u2122Tee asioita ja miten GenerateDatasets XML k\xe4sittelee n\xe4it\xe4 ongelmia."]}),"\n",(0,s.jsx)(a.h3,{id:"one-datatable-becomes-one-erddap-dataset",children:"Yksi taulukko on yksiERDDAP\u2122Dataa"}),"\n",(0,s.jsxs)(a.p,{children:["Yksi EML-tiedosto voi olla useita<Datatiedot Table >s.ERDDAP\u2122tekee yhdenERDDAP\u2122tietoja EML-tietotaulukosta. ThedatasetIDKoska aineisto on\n",(0,s.jsx)(a.em,{children:"EMLName"})," t ",(0,s.jsx)(a.em,{children:"P\xf6yt\xe4numero"}),"   (Kun EMLname on teksti) tai tai\n",(0,s.jsx)(a.em,{children:"J\xe4rjestelm\xe4"})," t ",(0,s.jsx)(a.em,{children:"P\xf6yt\xe4numero"}),"   (Kun EML-nimi on numero) .\nEsimerkiksi taulukko #1 tiedostossa knb-lter-sbc.28, tuleeERDDAP\u2122 datasetID= knb \\ t1,\n\xa0"]}),"\n",(0,s.jsx)(a.h3,{id:"eml-versus-cfacdd",children:"EML vs. CF+ACDD"}),"\n",(0,s.jsxs)(a.p,{children:["L\xe4hes kaikki EML-tiedostojen metatiedot p\xe4\xe4sev\xe4tERDDAPmutta eri muodossa.ERDDAP\u2122k\xe4ytt\xe4\xe4",(0,s.jsx)(a.a,{href:"https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html",children:"CF"}),"ja",(0,s.jsx)(a.a,{href:"https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3",children:"ACDD"}),"Metatiedot. Ne ovat t\xe4ydent\xe4vi\xe4 metatietoj\xe4rjestelmi\xe4, jotka k\xe4ytt\xe4v\xe4t globaaleihin metatietoihin ja kunkin muuttujan metatietoja.\nKyll\xe4, metatietojen EML-edustus on kauniimpi kuin CF+ACD. En suosittele CF+ACDD",":n"," korvaamista. Ajattele CF+ACD",":t","\xe4 osana EML-maailman siltaa.OPeNDAPCF/ACDD-maailma.\n\xa0"]}),"\n",(0,s.jsx)(a.h3,{id:"small-changes",children:"Pieni\xe4 muutoksia"}),"\n",(0,s.jsx)(a.p,{children:"ERDDAP\u2122tekee paljon pieni\xe4 muutoksia. Esimerkiksi,ERDDAP\u2122EML ei-DOIVaihtoehtoinen Identifioija ja datataulukkonumeroERDDAP\u2122 datasetIDMuutos hieman vaihtuu Tunniste, joka tekee siit\xe4 p\xe4tev\xe4n muuttujanimen useimmilla tietokonekielill\xe4, esim. knb-lter-sbc.33 Taulukko #1 muuttuu knb \\ t1.\n\xa0"}),"\n",(0,s.jsx)(a.h3,{id:"docbook",children:"DocBook"}),"\n",(0,s.jsx)(a.p,{children:"EML k\xe4ytt\xe4\xe4 DocBookin merkint\xe4j\xe4rjestelm\xe4\xe4 tarjotakseen rakenteita tekstin est\xe4miseksi EML-tiedostoissa. CF ja ACDD edellytt\xe4v\xe4t, ett\xe4 metatiedot ovat yksinkertaisia. GenerateDatasets Xml muuntaa merkityn tekstin selke\xe4ksi tekstiksi, joka n\xe4ytt\xe4\xe4 tekstin muotoiluversiolta. Inline-tunnisteet on sanitoitu neli\xf6pusseilla, esim.\\[korostaa\\]ja j\xe4tetty tekstiin.\n\xa0"}),"\n",(0,s.jsx)(a.h3,{id:"data-files",children:"Datatiedostot"}),"\n",(0,s.jsx)(a.p,{children:"Koska EML-tietotaulukko sis\xe4lt\xe4\xe4 todellisen datatiedoston URL-osoitteen, GenerateDatasets XML tulee:"}),"\n",(0,s.jsxs)(a.ol,{children:["\n",(0,s.jsx)(a.li,{children:"Lataa datatiedosto."}),"\n",(0,s.jsx)(a.li,{children:"S\xe4ilyt\xe4 se samassa hakemistossa kuin EML-tiedosto."}),"\n",(0,s.jsx)(a.li,{children:"Lue tiedot."}),"\n",(0,s.jsxs)(a.li,{children:["Vertaa EML",":n"," tietojen kuvausta tiedoston todellisiin tietoihin."]}),"\n",(0,s.jsx)(a.li,{children:"Jos generaattorit Xml l\xf6yt\xe4\xe4 eroja, k\xe4sittelee niit\xe4 tai kysyy operaattorilta, onko erot kunnossa tai palauttaa virheilmoituksen. Yksityiskohdat ovat eri alla.\n\xa0"}),"\n"]}),"\n",(0,s.jsx)(a.h3,{id:"zipd-data-files",children:".zipD Data Files"}),"\n",(0,s.jsxs)(a.p,{children:["Jos mainitut tiedot ovat.ziptiedosto, sen t\xe4ytyy sis\xe4lt\xe4\xe4 vain yksi tiedosto. T\xe4t\xe4 tiedostoa k\xe4ytet\xe4\xe4nERDDAP\u2122Dataa. Jos tiedostoja on enemm\xe4n kuin yksi.ERDDAP\u2122hylk\xe4\xe4v\xe4t t\xe4m\xe4n tietoaineiston. Tarvittaessa sit\xe4 voidaan muuttaa. (K\xe4yt\xe4nn\xf6ss\xe4 kaikilla SBC LTER -lis\xe4tiedostoilla on vain yksi tietotiedosto.)",(0,s.jsx)(a.br,{}),"\n","\xa0"]}),"\n",(0,s.jsx)(a.h3,{id:"storagetype",children:"Varastointityyppi"}),"\n",(0,s.jsx)(a.p,{children:"Jos sarakkeen tallennus Tyyppi ei ole m\xe4\xe4ritelty,ERDDAP\u2122Paras arvaus perustuu datatiedoston tietoihin. T\xe4m\xe4 toimii melko hyvin.\n\xa0"}),"\n",(0,s.jsx)(a.h3,{id:"units",children:"Yksik\xf6t"}),"\n",(0,s.jsxs)(a.p,{children:["ERDDAP\u2122k\xe4ytt\xe4\xe4",(0,s.jsx)(a.a,{href:"https://www.unidata.ucar.edu/software/udunits/",children:"UDUNITSYksik\xf6iden muotoilu"}),'. GenerateDatasets Xml muuntaa EML-yksik\xf6tUDUNITSNoin 95 prosenttia ajasta. J\xe4ljelle j\xe4\xe4v\xe4 5% johtaa luettavaan kuvaukseen yksik\xf6ist\xe4, esim. "biomassDensityUnitPerAbundanceUnit" EML',":ss",'\xe4 muuttuu "biomass tiheysyksikk\xf6 per runsausyksikk\xf6".ERDDAP. Teknisesti t\xe4m\xe4 ei ole sallittua. En usko, ett\xe4 se on niin paha olosuhteissa.\\[Tarvittaessa yksik\xf6it\xe4, joita ei voi tehd\xe4UDUNITSYhteensopiva voidaan siirt\xe4\xe4 muuttujan kommentin ominaisuuteen.\\]',(0,s.jsx)(a.br,{}),"\n","\xa0"]}),"\n",(0,s.jsx)(a.h3,{id:"eml-version-211",children:"EML-versio 2.1.1"}),"\n",(0,s.jsxs)(a.p,{children:["T\xe4m\xe4 EML v2.1.1 -tiedostojen tuki lis\xe4ttiin GenerateDatasetsille. Vuonna 2016 Xml toivoi, ett\xe4 EML-yhteis\xf6ss\xe4 olisi jotain. Vuoteen 2020 menness\xe4 n\xe4in ei ole tapahtunut. TheERDDAP\u2122Kehitt\xe4j\xe4t voisivat mielell\xe4\xe4n lis\xe4t\xe4 EML",":n"," uusimpien versioiden tukemista, mutta vain jos uusia ominaisuuksia k\xe4ytet\xe4\xe4n. S\xe4hk\xf6postiaerd.data at noaa.govJos haluat tukea uusimpia versioita EML",":st","\xe4 ja k\xe4yt\xe4t t\xe4t\xe4 ominaisuutta.\n\xa0"]}),"\n",(0,s.jsx)(a.h2,{id:"issues-with-the-eml-files",children:"EML-tiedostojen ongelmat"}),"\n",(0,s.jsx)(a.p,{children:"On joitakin ongelmia / ongelmia EML-tiedostoja, jotka aiheuttavat ongelmia, kun ohjelmiston asiakas (EDDTableFromEML vaihtoehto GenerateDatasetsXML) EML-tiedostojen tulkinta/k\xe4sittely."}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsx)(a.li,{children:"Vaikka listalla on useita ongelmia, ne ovat p\xe4\xe4osin pieni\xe4 ja ratkaisevia ongelmia. Yleisesti ottaen EML on hyv\xe4 j\xe4rjestelm\xe4 ja on ollut ilo ty\xf6skennell\xe4 sen kanssa."}),"\n",(0,s.jsx)(a.li,{children:"N\xe4m\xe4 ovat suunnilleen pahimpia / yleisimpi\xe4 huonoja / v\xe4hemm\xe4n yleisi\xe4."}),"\n",(0,s.jsxs)(a.li,{children:["Useimmat liittyv\xe4t pieniin ongelmiin tietyiss\xe4 EML-tiedostoissa. (Mik\xe4 ei ole EML",":n"," vika) ."]}),"\n",(0,s.jsx)(a.li,{children:"Useimmat voidaan korjata yksinkertaisilla muutoksilla EML-tiedostoon tai datatiedostoon."}),"\n",(0,s.jsx)(a.li,{children:"Koska LTER-ihmiset rakentavat EML-tarkastajaa testaamaan EML-tiedostojen p\xe4tevyytt\xe4, olen lis\xe4nnyt joitakin alla olevia ehdotuksia koskien ominaisuuksia, jotka voidaan lis\xe4t\xe4 tarkistimeen."}),"\n"]}),"\n",(0,s.jsx)(a.p,{children:"T\xe4ss\xe4 ovat ongelmat:"}),"\n",(0,s.jsx)(a.h3,{id:"separate-date-and-time-columns",children:"Erilliset p\xe4iv\xe4m\xe4\xe4r\xe4t ja aikasarakkeet"}),"\n",(0,s.jsx)(a.p,{children:"Joissakin tiedostoissa on erillisi\xe4 sarakkeita ajantasaisesti, mutta ei yhten\xe4ist\xe4 p\xe4iv\xe4m\xe4\xe4r\xe4\xe4 + ajan saraketta. T\xe4ll\xe4 hetkell\xe4 GenerateDatasets Xml luo aineiston n\xe4iden erillisten sarakkeiden kanssa, mutta se ei ole ihanteellinen, koska:"}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsx)(a.li,{children:'On parempi, jos tiedostotERDDAP\u2122yhdistetty p\xe4iv\xe4m\xe4\xe4r\xe4 + aika kolumni, jota kutsutaan"time".'}),"\n",(0,s.jsx)(a.li,{children:'Usein aineisto ei lataudu sis\xe4\xe4nERDDAP\u2122Koska"time"Sarakkeella ei ole p\xe4iv\xe4m\xe4\xe4r\xe4\xe4+aikaa.'}),"\n"]}),"\n",(0,s.jsx)(a.p,{children:"Mahdollisia ratkaisuja on kaksi:"}),"\n",(0,s.jsxs)(a.ol,{children:["\n",(0,s.jsxs)(a.li,{children:["Muokkaa l\xe4hdetiedostoa lis\xe4t\xe4ksesi uuden sarakkeen datatiedostoon (Kuvaile sit\xe4 EML",":ss","\xe4) kun p\xe4iv\xe4m\xe4\xe4r\xe4 ja kellonaika yhdistet\xe4\xe4n yhteen sarakkeeseen. Return GenerateDatasets XML l\xf6yt\xe4\xe4 uuden kolumnin."]}),"\n",(0,s.jsxs)(a.li,{children:["K\xe4yt\xe4",(0,s.jsx)(a.a,{href:"/docs/server-admin/datasets#script-sourcenamesderived-variables",children:"Johdettuja muuttujia"}),"OminaisuusERDDAP\u2122m\xe4\xe4ritell\xe4 uusi muuttujadatasets.xmljoka luodaan yhdist\xe4m\xe4ll\xe4 p\xe4iv\xe4m\xe4\xe4r\xe4 ja aika sarakkeet. Yksi esimerkki k\xe4sittelee erityisesti t\xe4t\xe4 tilannetta.\n\xa0"]}),"\n"]}),"\n",(0,s.jsx)(a.h3,{id:"inconsistent-column-names",children:"Ep\xe4johdonmukainen nimi"}),"\n",(0,s.jsx)(a.p,{children:'EML-tiedostot listaavat datatiedoston sarakkeet ja niiden nimet. Valitettavasti ne eroavat usein varsinaisen datatiedoston sarakkeiden nimist\xe4. Normaalisti EML-tiedoston saraketilaus on sama kuin datatiedoston saraketilaus, vaikka nimet vaihtelevat hieman, mutta eiv\xe4t aina. GenerateDatasets Xml pyrkii vastaamaan sarakkeen nimi\xe4. Kun se ei voi (Mik\xe4 on yhteinen) , se pys\xe4htyy, n\xe4ytt\xe4\xe4 sinulle EML/data-tiedostonimi parit ja kysy, ovatko ne oikeassa linjassa. Jos sy\xf6t\xe4t "s" ohittaa p\xf6yd\xe4n, GeneratedDatasetsXml tulostaa virheviestin ja siirtyy seuraavaan taulukkoon.\nRatkaisu on muuttaa EML-tiedoston virheellisi\xe4 sarakkeiden nimi\xe4 vastaamaan datatiedoston sarakkeiden nimi\xe4.\n\xa0'}),"\n",(0,s.jsx)(a.h3,{id:"different-column-order",children:"Erilainen sarake"}),"\n",(0,s.jsx)(a.p,{children:"On olemassa useita tapauksia, joissa EML m\xe4\xe4ritt\xe4\xe4 sarakkeet eri j\xe4rjestyksess\xe4 kuin ne ovat tietotiedostossa. GenerateDatasets Xml pys\xe4htyy ja kysyy operaattorilta, ovatko ottelut kunnossa vai pit\xe4isik\xf6 tietoaineisto ohittaa. Jos se on ohitettu, tulostiedostossa on virheilmoitus, esimerkiksi:"}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{children:"      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\n      datasetID=knb\\\\_lter\\\\_sbc\\\\_17\\\\_t1\n      dataFile=all\\\\_fish\\\\_all\\\\_years\\\\_20140903.csv\n      The data file and EML file have different column names.\n      ERDDAP\u2122 would like to equate these pairs of names:\n        SURVEY\\\\_TIMING        = notes\n        NOTES                = survey\\\\_timing\n      --&gt;\n"})}),"\n",(0,s.jsx)(a.p,{children:"Ratkaisuna on korjata saraketilaus n\xe4iss\xe4 EML-tiedostoissa, jotta ne vastaavat tilausta datatiedostoissa."}),"\n",(0,s.jsx)(a.p,{children:"Olisi kiva, jos EML-tarkastaja tarkistaisi, ett\xe4 l\xe4hdetiedoston sarakkeet ja saraketilaus vastaavat EML-tiedoston sarakkeita ja saraketilausta."}),"\n",(0,s.jsx)(a.h3,{id:"incorrect-numheaderlines",children:"V\xe4\xe4r\xe4 numHeaderLines"}),"\n",(0,s.jsx)(a.p,{children:"Useita tietoja P\xf6yd\xe4t ovat virheellisesti merkittyj\xe4 nimi\xe4 HeaderLines=1, esim....sbc.4011. T\xe4m\xe4 aiheuttaaERDDAP\u2122Lue ensimm\xe4inen tietolinja sarakkeen nimin\xe4. Yritin manuaalisesti poistaa kaikki n\xe4m\xe4 taulukot. Ne ovat ilmeisi\xe4, koska vertaansa vailla olevat col-nimet ovat kaikki tietoarvoja. Ja jos on tiedostoja, joilla on virheellisesti numHeaderLines = 0, j\xe4rjestelm\xe4 ei tee siit\xe4 itsest\xe4\xe4n selv\xe4\xe4. T\xe4ss\xe4 on esimerkki SBC LTER -virhetiedostosta:"}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{children:"      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\n       datasetID=knb\\\\_lter\\\\_sbc\\\\_3017\\\\_t1\n      dataFile=MC06\\\\_allyears\\\\_2012-03-03.txt\n      The data file and EML file have different column names.\n      ERDDAP\u2122 would like to equate these pairs of names:\n        2008-10-01T00:00     = timestamp\\\\_local\n        2008-10-01T07:00     = timestamp\\\\_UTC\n        2.27                 = discharge\\\\_lps\n        -999.0               = water\\\\_temperature\\\\_celsius\n      --&gt;\n"})}),"\n",(0,s.jsx)(a.p,{children:"Virhe voi ilmet\xe4 kuin GenerateDatasets Xml uskoo, ett\xe4 ensimm\xe4inen linkki tiedoston tietoihin (Esimerkiksi 2008-10-01T00:00 jne.) Linja sarakkeen nimill\xe4 (Aivan kuin vuosi 2008-10-01T00 olisi sarakkeen nimi.) ."}),"\n",(0,s.jsx)(a.p,{children:"Olisi kiva, jos EML-tarkastaja tarkistaisi numHeaderLines-arvon."}),"\n",(0,s.jsx)(a.h3,{id:"numheaderlines--0",children:"NumHeaderLines = 0"}),"\n",(0,s.jsx)(a.p,{children:"Joillakin tiedostoilla ei ole sarakkeiden nimi\xe4.ERDDAP\u2122Jos EML kuvaa samaa saraketta."}),"\n",(0,s.jsx)(a.p,{children:"Mielest\xe4ni t\xe4m\xe4 tuntuu eritt\xe4in vaaralliselta. Sarakkeita voi olla eri j\xe4rjestyksess\xe4 tai eri yksik\xf6ill\xe4. (Katso alapuolelta) Ei ole mit\xe4\xe4n keinoa ratkaista n\xe4it\xe4 ongelmia. On paljon parempi, jos kaikilla ASCII-tiedostoilla on rivi sarakkeen nimill\xe4."}),"\n",(0,s.jsx)(a.h3,{id:"datetime-format-strings",children:"DateTime Format Strings"}),"\n",(0,s.jsxs)(a.p,{children:["EML",":ll","\xe4 on vakiomuotoinen tapa kuvata p\xe4iv\xe4m\xe4\xe4r\xe4muotoja. EML-tiedostoissa on huomattavaa vaihtelua. (Olin aiemmin v\xe4\xe4r\xe4ss\xe4 t\xe4ss\xe4 asiassa. N\xe4en EML-dokumentaatiomuodon, joka n\xe4ytt\xe4\xe4 vastaavan",(0,s.jsx)(a.a,{href:"https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html",children:"JavaDateTimeFormatter spesifikaatio"}),", mutta josta puuttuu t\xe4rke\xe4t k\xe4ytt\xf6ohjeet, jolloin formatString on usein/tavallisesti v\xe4\xe4rin k\xe4ytetty.) On olemassa useita tapauksia, joissa on virheellinen tapaus, ja / tai virheellinen p\xe4\xe4llekk\xe4isyys kirjeen ja / tai ei-standardi muotoilu. T\xe4m\xe4 aiheuttaa kohtuuttoman taakan asiakkaille, erityisesti ohjelmistoasiakkaille, kuten GenerateDatasetsXml. GenerateDatasets Xml yritt\xe4\xe4 muuntaa EML-tiedostojen virheellisesti m\xe4\xe4ritellyt muodot\n",(0,s.jsx)(a.a,{href:"/docs/server-admin/datasets#string-time-units",children:"P\xe4iv\xe4m\xe4\xe4r\xe4/aikamuoto, jonkaERDDAP\u2122Vaatii"}),"joka on l\xe4hes identtinenJavaJoda-aikamuodon m\xe4\xe4rittely, mutta se on hieman anteeksiantavampaa."]}),"\n",(0,s.jsx)(a.p,{children:"Olisi kiva, jos EML-tarkastaja vaatisi tiukkaa noudattamista.Java/Joda/ERDDAPaikayksik\xf6iden m\xe4\xe4rittely ja todennettu, ett\xe4 p\xe4iv\xe4m\xe4\xe4r\xe4n arvot taulukossa voidaan parjata oikein m\xe4\xe4ritellyn muodon kanssa."}),"\n",(0,s.jsx)(a.h3,{id:"datetime-but-no-time-zone",children:"P\xe4iv\xe4m\xe4\xe4r\xe4, mutta ei aikaa"}),"\n",(0,s.jsx)(a.p,{children:"GenerateDatasets Xml etsii kolumnia p\xe4iv\xe4m\xe4\xe4r\xe4ll\xe4 Aika ja tietty aikavy\xf6hyke (jokoZuluc) aikayksik\xf6t, jotka p\xe4\xe4tyv\xe4t \u2019Z\u2019 tai sarakkeen nimi tai attribuuttim\xe4\xe4ritelm\xe4, joka sis\xe4lt\xe4\xe4 \u2019gmt\u2019 tai \u2019utc\u2019 tai paikallista: \u2019paikallisesta\u2019 sarakkeen nimess\xe4 tai attribuuttim\xe4\xe4ritelm\xe4ss\xe4) . Hyv\xe4ksytt\xe4v\xe4 on my\xf6s tiedosto, jossa on p\xe4iv\xe4sarake, mutta ei aikaa. Hyv\xe4ksytt\xe4v\xe4 on my\xf6s tiedosto, jolla ei ole p\xe4iv\xe4m\xe4\xe4r\xe4- tai aikatietoja."}),"\n",(0,s.jsx)(a.p,{children:'GenerateDatasets Xml kohtelee kaikkia "paikallisia" aikoja aikavy\xf6hykkeelt\xe4, jonka voit m\xe4\xe4ritt\xe4\xe4 tietylle tiedostoer\xe4lle, esim. SBC LTERille, k\xe4yt\xe4 US/Pacificia. Tiedot ovat joskus kommentteja, mutta ei muodossa, joka on helppoa tietokoneohjelman selvitt\xe4\xe4.'}),"\n",(0,s.jsx)(a.p,{children:'Tiedostot, jotka eiv\xe4t t\xe4yt\xe4 n\xe4it\xe4 kriteerej\xe4, hyl\xe4t\xe4\xe4n viestill\xe4 "Ei hyv\xe4\xe4 p\xe4iv\xe4\xe4". (Aikaa) V\xe4kivaltainen.\u201d Yleisi\xe4 ongelmia ovat:'}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsx)(a.li,{children:"On sarake, jossa on p\xe4iv\xe4m\xe4\xe4r\xe4t ja sarake, jossa on ajat, mutta ei p\xe4iv\xe4m\xe4\xe4r\xe4. Aika kolumni."}),"\n",(0,s.jsx)(a.li,{children:"Aikavy\xf6hykkeit\xe4 on, mutta aikavy\xf6hykett\xe4 ei ole m\xe4\xe4ritelty."}),"\n"]}),"\n",(0,s.jsxs)(a.p,{children:['Muut kommentit:\nJos aikavy\xf6hykkeen sarakkeella on hyv\xe4 p\xe4iv\xe4m\xe4\xe4r\xe4 + aikavy\xf6hyke, sarake nimet\xe4\xe4n."time"Sis\xe4ll\xe4ERDDAP.ERDDAP\u2122edellytt\xe4\xe4, ett\xe4 saraketiedot ovat ymm\xe4rrett\xe4vi\xe4/muunnettavissaZuluUTC/GMT aikavy\xf6hyke p\xe4iv\xe4m\xe4\xe4r\xe4.\\[Ajatukseni on, ett\xe4 k\xe4yt\xe4n paikallisia aikoja ja erilaisia p\xe4iv\xe4m\xe4\xe4ri\xe4/aikamuotoja. (2-numeroiset vuodet! mm/dd/yy vs. dd/mm/yy) Datatiedostoissa pakottaa loppuk\xe4ytt\xe4j\xe4n tekem\xe4\xe4n monimutkaisia muunnoksiaZuluaika vertailla tietoja yhdest\xe4 tietoaineistosta toisesta. Niinp\xe4ERDDAP\u2122Standardoi kaikki aikatiedot: ajoaikoja,ERDDAP\u2122K\xe4ytt\xe4\xe4 ISO 8601:2004 (E) vakiomuotoinen muoto, esimerkiksi 1985-01-02T00:00:00. Numeeriset ajat,ERDDAP\u2122K\xe4yt\xe4 aina"seconds since 1970-01-01T00:00:00Z".ERDDAP\u2122K\xe4yt\xe4 ainaZulu  (UTC, GMT) aikavy\xf6hyke, jonka tarkoituksena on poistaa vaikeudet ty\xf6skennell\xe4 eri aikavy\xf6hykkeiden ja vakio-ajan kanssa ja s\xe4\xe4st\xe4\xe4 aikaa. GenerateDatasets Xml etsii EML-tietotaulukkoa p\xe4iv\xe4m\xe4\xe4r\xe4ll\xe4+Zulu. T\xe4m\xe4 on vaikeaa, koska EML ei k\xe4yt\xe4 virallista sanastoa. (kuin',(0,s.jsx)(a.a,{href:"https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html",children:"JavaJoda Time formaatti"}),') Tietojen m\xe4\xe4ritt\xe4miseksi Aikamuoto:\nJos on col, jossa on numeerisia aika-arvoja (esim.MatlabKertoja) jaZuluAikavy\xf6hyke (tai vain p\xe4iv\xe4m\xe4\xe4ri\xe4 ilman aikakoloja) Sit\xe4 k\xe4ytet\xe4\xe4n kuten"time".\nJos k\xe4yt\xf6ss\xe4 on p\xe4iv\xe4m\xe4\xe4r\xe4- ja aikatiedot, k\xe4yt\xe4ZuluAikavy\xf6hyke, jota k\xe4ytet\xe4\xe4n"time"Kaikki muut p\xe4iv\xe4m\xe4\xe4r\xe4t tai kellonaika poistetaan.\nMuussa tapauksessa, jos viina, jolla on vain p\xe4iv\xe4m\xe4\xe4r\xe4tiedot, sit\xe4 k\xe4ytet\xe4\xe4n"time"Muuttuva (Ei aikavy\xf6hykkeit\xe4) .\nJos on datasarake ja aikasarake, eik\xe4 yhdistetty\xe4 p\xe4iv\xe4m\xe4\xe4r\xe4\xe4 Ajan sarake, tietoaineisto on REJECTED - mutta tietoaineistoa voidaan k\xe4ytt\xe4\xe4 lis\xe4\xe4m\xe4ll\xe4 yhdistetty p\xe4iv\xe4m\xe4\xe4r\xe4. Aika kolumni (mieluiten,ZuluAikavy\xf6hyke) tietotiedostoon ja lis\xe4\xe4 sen kuvaus EML-tiedostoon.\nL\xe4hteet: SBC LTER:',(0,s.jsx)(a.a,{href:"https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/",children:" https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ "}),"Tietokanta #2."]}),"\n",(0,s.jsxs)(a.p,{children:["Olisi kiva, jos EML/LTER vaatisi sarakkeen sis\xe4llytt\xe4mist\xe4Zulu  (UTC, GMT) aikavy\xf6hykkeit\xe4 kaikissa asiaankuuluvissa tietotiedostoissa. Parasta on lis\xe4t\xe4 j\xe4rjestelm\xe4 EML:\xe4\xe4n m\xe4\xe4ritt\xe4m\xe4\xe4ntime\\_zoneStandardi nimi\xe4 k\xe4ytt\xe4en (From the",(0,s.jsx)(a.a,{href:"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",children:"TZ kolumni"}),") ."]}),"\n",(0,s.jsx)(a.h3,{id:"missing-missing_value",children:"Kadonnutmissing\\_value"}),"\n",(0,s.jsxs)(a.p,{children:["Jotkut sarakkeet k\xe4ytt\xe4v\xe4tmissing\\_valueMutta \xe4l\xe4 lue sit\xe4 EML-metadatassa, esim. sadem\xe4\xe4r\xe4 | knb-lter-sbc.5011 k\xe4ytt\xe4\xe4 -999. Jos EML",":ss","\xe4 ei m\xe4\xe4ritet\xe4 puuttuvaa arvoa, GenerateDatasetsXml hakee automaattisesti yhteisi\xe4 puuttuvia arvoja. (esim. 99, -99, 999, -999, 9999, -9999 jne.) Se luo metadataa. Muut puuttuvatmissing\\_values ei j\xe4\xe4 kiinni."]}),"\n",(0,s.jsx)(a.p,{children:"Olisi kiva, jos EML-tarkastaja etsisi kadonnutta.missing\\_values."}),"\n",(0,s.jsx)(a.h3,{id:"small-problems",children:"Pieni\xe4 ongelmia"}),"\n",(0,s.jsx)(a.p,{children:"Pieni\xe4 ongelmia on paljon. (loitsu, t\xe4sm\xe4llisyys) T\xe4m\xe4 on todenn\xe4k\xf6isesti vain henkil\xf6, joka tarkastaa jokaisen aineiston."}),"\n",(0,s.jsx)(a.p,{children:"Olisi hienoa, jos EML-tarkastaja etsisi loitsuja ja kieliopillisia virheit\xe4. T\xe4m\xe4 on vaikea ongelma, koska tieteen sanat ovat usein loitsun tarkistus. Inhimillist\xe4 editointia tarvitaan todenn\xe4k\xf6isesti."}),"\n",(0,s.jsx)(a.h3,{id:"invalid-unicode-characters",children:"Unicode-ominaisuudet"}),"\n",(0,s.jsx)(a.p,{children:"Osa EML-sis\xe4ll\xf6st\xe4 sis\xe4lt\xe4\xe4 mit\xe4tt\xf6mi\xe4 Unicode-hahmoja. N\xe4m\xe4 ovat todenn\xe4k\xf6isesti Windows-kartan hahmoja, jotka on kopioitu v\xe4\xe4rin ja liitetty UTF-8 EML-tiedostoihin. GenerateDatasets Xml sanitizes n\xe4m\xe4 hahmot esim.\\[#128\\]Niit\xe4 on helppo etsi\xe4ERDDAP\u2122 datasets.xmltiedosto."}),"\n",(0,s.jsx)(a.p,{children:"Olisi kiva, jos EML-tarkastaja tarkisti t\xe4m\xe4n. Se on helppo l\xf6yt\xe4\xe4 ja helppo korjata."}),"\n",(0,s.jsx)(a.h3,{id:"different-column-unitsdifferentcolumnunits",children:"Erilaiset sarakkeet) (#differentColumnUnits)"}),"\n",(0,s.jsx)(a.p,{children:'Joissakin EML-tietotaulukoissa m\xe4\xe4ritell\xe4\xe4n sarakkeet, jotka ovat ristiriidassa tietotiedoston sarakkeiden kanssa, erityisesti siksi, ett\xe4 niill\xe4 on erilaiset yksik\xf6t. GenerateDatasets XML liputtaa n\xe4m\xe4. Operaattorin teht\xe4v\xe4n\xe4 on p\xe4\xe4tt\xe4\xe4, ovatko erot kunnossa vai eiv\xe4t. N\xe4m\xe4 n\xe4kyv\xe4t ep\xe4onnistumistiedostossa "SKIPPED"-tietotaulukoina. SBC LTER -virhetiedosto:'}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{children:"      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\n       datasetID=knb\\\\_lter\\\\_sbc\\\\_3\\\\_t1\n      dataFile=SBCFC\\\\_Precip\\\\_Daily\\\\_active\\\\_logger.csv\n      The data file and EML file have different column names.\n      ERDDAP\u2122 would like to equate these pairs of names:\n        Daily\\\\_Precipitation\\\\_Total\\\\_mm = Daily\\\\_Precipitation\\\\_Total\\\\_inch\n        Flag\\\\_Daily\\\\_Precipitation\\\\_Total\\\\_mm = Flag\\\\_Daily\\\\_Precipitation\\\\_Total\\\\_inch\n      --\x3e\n"})}),"\n",(0,s.jsx)(a.p,{children:"Olisi kiva, jos EML-tarkastaja tarkistaisi, ett\xe4 yksikk\xf6 vastaa. Valitettavasti t\xe4m\xe4 on todenn\xe4k\xf6isesti mahdotonta saada kiinni ja sitten mahdotonta ratkaista ottamatta yhteytt\xe4 tietoaineiston luojaan, koska l\xe4hdetiedosto ei sis\xe4ll\xe4 yksik\xf6it\xe4. Edell\xe4 esitetyn esimerkin ristiriita oli havaittavissa vain, koska yksik\xf6t sis\xe4ltyiv\xe4t l\xe4hdesarakkeeseen ja EML-sarakkeeseen. Kuinka monella muulla taulukolla on t\xe4m\xe4 ongelma, mutta ei ole havaittavissa?"}),"\n",(0,s.jsxs)(a.h3,{id:"different-versions-of-eml",children:["EML",":n"," eri versiot"]}),"\n",(0,s.jsxs)(a.p,{children:["GenerateDatasets Xml on suunniteltu toimimaan EML 2.1.1",":n"," kanssa. Muut versiot EML toimii siin\xe4 m\xe4\xe4rin kuin ne vastaavat 2.1.1 tai GenerateDatasetsXml on erityinen koodi k\xe4sitell\xe4 sit\xe4. T\xe4m\xe4 on harvinainen ongelma. Kun se tapahtuu, ratkaisu on muuntaa tiedostot EML 2.1.1 tai l\xe4hett\xe4\xe4 EML-tiedoston.erd.data at noaa.govVoin tehd\xe4 muutoksia GenerateDatasets XML k\xe4sittelee eroja."]}),"\n",(0,s.jsxs)(a.p,{children:["Bob lis\xe4si tukea EML-tiedostoille GenerateDatasetsille Vuonna 2016 Xml toivoi, ett\xe4 EML-yhteis\xf6ss\xe4 olisi jonkinlainen k\xe4ytt\xf6\xf6notto. Vuoteen 2020 menness\xe4 n\xe4in ei ole tapahtunut. Bob tukee mielell\xe4\xe4n EML",":n"," uusimpia versioita, mutta vain jos uusia ominaisuuksia k\xe4ytet\xe4\xe4n. S\xe4hk\xf6postiaerd.data at noaa.govJos haluat tukea uusimpia versioita EML",":st","\xe4 ja k\xe4yt\xe4t t\xe4t\xe4 ominaisuutta."]}),"\n",(0,s.jsx)(a.h3,{id:"trouble-parsing-the-data-file",children:"Ongelma datatiedoston parissa"}),"\n",(0,s.jsxs)(a.p,{children:['Hyvin harvoin datataulukko voidaan hyl\xe4t\xe4 virheell\xe4 "ei-odotettu m\xe4\xe4r\xe4 kohteita linjassa #120. (52, odotettu = 50) """ T\xe4llainen virhesanoma tarkoittaa sit\xe4, ett\xe4 datatiedostossa oli erilainen m\xe4\xe4r\xe4 kuin muilla riveill\xe4. Se voi olla ongelmaERDDAP\u2122  (Esim. tiedoston lataaminen oikein) Tai tiedostossa. L\xe4hteet: SBC LTER:\n',(0,s.jsx)(a.a,{href:"https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/",children:" https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ "}),"Datataulukko #3, ks. datafile = LT _monthly \\bottleda \\registered \\ txt"]})]})}function m(t={}){const{wrapper:a}={...(0,n.R)(),...t.components};return a?(0,s.jsx)(a,{...t,children:(0,s.jsx)(d,{...t})}):d(t)}},28453:(t,a,i)=>{i.d(a,{R:()=>o,x:()=>l});var e=i(96540);const s={},n=e.createContext(s);function o(t){const a=e.useContext(n);return e.useMemo((function(){return"function"==typeof t?t(a):{...a,...t}}),[a,t])}function l(t){let a;return a=t.disableParentContext?"function"==typeof t.components?t.components(s):t.components||s:o(t.components),e.createElement(n.Provider,{value:a},t.children)}}}]);