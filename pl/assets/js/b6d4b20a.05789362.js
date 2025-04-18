"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6186],{28453:(e,a,o)=>{o.d(a,{R:()=>c,x:()=>s});var n=o(96540);const i={},r=n.createContext(i);function c(e){const a=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function s(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),n.createElement(r.Provider,{value:a},e.children)}},55800:(e,a,o)=>{o.r(a),o.d(a,{assets:()=>t,contentTitle:()=>s,default:()=>z,frontMatter:()=>c,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"type":"mdx","permalink":"/pl/cloud","source":"@site/i18n/pl/docusaurus-plugin-content-pages/cloud.md","title":"ERDDAP\u2122 and the Cloud","description":"Czym jest chmura?","frontMatter":{"title":"ERDDAP\u2122 and the Cloud"},"unlisted":false}');var i=o(74848),r=o(28453);const c={title:"ERDDAP\u2122 and the Cloud"},s="ERDDAP\u2122i chmura",t={},d=[{value:"Czym jest chmura?",id:"czym-jest-chmura",level:2},{value:"Dlaczego chmura",id:"dlaczego-chmura",level:3},{value:"Mo\u017ceERDDAP\u2122biega\u0107 w chmurze?",id:"mo\u017ceerddapbiega\u0107-w-chmurze",level:2},{value:"Mo\u017ceERDDAP\u2122Skala?",id:"mo\u017ceerddapskala",level:3},{value:"Co zapobiega autoskalowaniu?",id:"co-zapobiega-autoskalowaniu",level:3},{value:"Mo\u017ceERDDAP\u2122u\u017cywa\u0107 Cloud Storage?",id:"mo\u017ceerddapu\u017cywa\u0107-cloud-storage",level:3}];function l(e){const a={a:"a",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.header,{children:(0,i.jsx)(a.h1,{id:"erddapi-chmura",children:"ERDDAP\u2122i chmura"})}),"\n",(0,i.jsx)(a.h2,{id:"czym-jest-chmura",children:"Czym jest chmura?"}),"\n",(0,i.jsx)(a.p,{children:"Najprostsz\u0105 definicj\u0105 nie s\u0105 serwery lokalne. Jest to bardzo szerokie i mo\u017ce oznacza\u0107 wiele r\xf3\u017cnych rozwi\u0105za\u0144. Na przyk\u0142ad, mo\u017ce to by\u0107 dedykowany serwer fizyczny w centrum danych, Virtual Private Server, serwer wsp\xf3\u0142dzielony, serverless lub co\u015b innego."}),"\n",(0,i.jsx)(a.h3,{id:"dlaczego-chmura",children:"Dlaczego chmura"}),"\n",(0,i.jsx)(a.p,{children:"Istnieje wiele powod\xf3w, dla kt\xf3rych organizacje chc\u0105 przenie\u015b\u0107 si\u0119 do chmury. Najwa\u017cniejsz\u0105 z nich jest elastyczno\u015b\u0107, jak\u0105 zapewnia dla potrzeb oblicze\u0144 / magazynowania w por\xf3wnaniu z zakupem sprz\u0119tu fizycznego."}),"\n",(0,i.jsx)(a.p,{children:"Eliminuje to potrzeb\u0119 utrzymywania serwera / centrum danych. Pozwala r\xf3wnie\u017c na skalowanie zasob\xf3w do aktualnych potrzeb. Podobnie jak chmura mo\u017ce oznacza\u0107 wiele r\xf3\u017cnych rzeczy, zdolno\u015b\u0107 do skalowania zasob\xf3w robi r\xf3wnie\u017c. To mo\u017ce oznacza\u0107 p\u0142acenie za wi\u0119cej. (lub mniej) bezsercowe zasoby. To mo\u017ce oznacza\u0107 przeniesienie z serwera dzielonego na serwer prywatny. To mo\u017ce oznacza\u0107 modernizacj\u0119 do wi\u0119kszego dedykowanego serwera fizycznego."}),"\n",(0,i.jsx)(a.h2,{id:"mo\u017ceerddapbiega\u0107-w-chmurze",children:"Mo\u017ceERDDAP\u2122biega\u0107 w chmurze?"}),"\n",(0,i.jsx)(a.p,{children:"Tak."}),"\n",(0,i.jsxs)(a.p,{children:["ERDDAP\u2122jest przeznaczony do dzia\u0142ania w obr\u0119bie Tomcat, kt\xf3re mog\u0105 by\u0107 prowadzone lokalnie lub w \u015brodowisku chmury. Istnieje wsparcie spo\u0142eczne dla biegania w Docker i jest",(0,i.jsx)(a.a,{href:"https://github.com/ERDDAP/erddap/blob/main/DOCKER.md",children:"urz\u0119dowy Wsparcie Dockera wkr\xf3tce"}),"."]}),"\n",(0,i.jsx)(a.p,{children:"To znaczy,ERDDAP\u2122zosta\u0142 zaprojektowany w czasie, gdy dedykowane serwery by\u0142y norm\u0105. Nie jest on bezsercowy, i by\u0142oby niezwykle trudne, je\u015bli nie niemo\u017cliwe, aby uczyni\u0107 go bezsercowy."}),"\n",(0,i.jsx)(a.h3,{id:"mo\u017ceerddapskala",children:"Mo\u017ceERDDAP\u2122Skala?"}),"\n",(0,i.jsxs)(a.p,{children:["SkalowanieERDDAP\u2122jest bardziej skomplikowane ni\u017c tylko u\u017cycie wi\u0119kszej ilo\u015bci bezsercowych zasob\xf3w. Mamy \u015bwietn\u0105 dokumentacj\u0119.",(0,i.jsx)(a.a,{href:"https://erddap.github.io/docs/server-admin/scaling",children:"jak skalowa\u0107ERDDAP\u2122"}),". U\u0142atwia skalowanieERDDAP\u2122Jeste\u015bmy zainteresowani."]}),"\n",(0,i.jsx)(a.h3,{id:"co-zapobiega-autoskalowaniu",children:"Co zapobiega autoskalowaniu?"}),"\n",(0,i.jsxs)(a.p,{children:["ERDDAP\u2122robi wiele rzeczy, w tym aktualizowanie zbior\xf3w danych, powiadamianie abonent\xf3w o zmianach w zbiorach danych, buforowanie danych, rozpatrywanie wniosk\xf3w u\u017cytkownik\xf3w i innych. Dla wystarczaj\u0105co du\u017cychERDDAP\u2122server like",(0,i.jsx)(a.a,{href:"https://coastwatch.pfeg.noaa.gov/erddap/index.html",children:"CoastWatch"}),"To znaczy, \u017ce ci\u0105gle co\u015b robi. Nieustanne korzystanie jest rzeczywi\u015bcie niezwykle kosztown\u0105 sytuacj\u0105 dla bezsercowych opcji (p\u0142acisz du\u017c\u0105 premi\u0119 za obliczenia podczas wykonywania bez serverless i wi\u0119c g\u0142\xf3wn\u0105 zalet\u0105 jest, gdy tylko okazjonalnie wykona\u0107 po\u0142\u0105czenia) . Dodatkowo, pr\xf3buje przenie\u015b\u0107 wszystkieERDDAP\u2122R\xf3\u017cnorodno\u015b\u0107 funkcjonalno\u015bci wersji bez serverless spowodowa\u0142aby znacznie bardziej skomplikowan\u0105 konfiguracj\u0119 wymagan\u0105 dla administrator\xf3w."]}),"\n",(0,i.jsx)(a.h3,{id:"mo\u017ceerddapu\u017cywa\u0107-cloud-storage",children:"Mo\u017ceERDDAP\u2122u\u017cywa\u0107 Cloud Storage?"}),"\n",(0,i.jsx)(a.p,{children:"Tak."}),"\n",(0,i.jsxs)(a.p,{children:["ERDDAP\u2122obs\u0142uguje pami\u0119\u0107 masow\u0105 w chmurze (w tym AWS S3) i poprawa tego wsparcia (na przyk\u0142ad non-AWS S3) jest wysokim priorytetem w zakresieERDDAP\u2122Plan dzia\u0142ania na rzecz rozwoju.ERDDAP\u2122jest r\xf3wnie\u017c zdolny do pobierania danych z wielu istniej\u0105cych us\u0142ug online. Aby uzyska\u0107 wi\u0119cej informacji polecam przegl\u0105danie naszych",(0,i.jsx)(a.a,{href:"https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types",children:"dokumentacja typu zbioru danych"}),"."]})]})}function z(e={}){const{wrapper:a}={...(0,r.R)(),...e.components};return a?(0,i.jsx)(a,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}}}]);