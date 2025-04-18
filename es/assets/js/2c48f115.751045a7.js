"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1491],{2102:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>c,contentTitle:()=>d,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>t});const o=JSON.parse('{"type":"mdx","permalink":"/es/cloud","source":"@site/i18n/es/docusaurus-plugin-content-pages/cloud.md","title":"ERDDAP\u2122 and the Cloud","description":"\xbfQu\xe9 es la nube?","frontMatter":{"title":"ERDDAP\u2122 and the Cloud"},"unlisted":false}');var s=n(74848),r=n(28453);const i={title:"ERDDAP\u2122 and the Cloud"},d="ERDDAP\u2122y la nube",c={},t=[{value:"\xbfQu\xe9 es la nube?",id:"qu\xe9-es-la-nube",level:2},{value:"Por qu\xe9 Cloud",id:"por-qu\xe9-cloud",level:3},{value:"CanERDDAP\u2122correr en la nube?",id:"canerddapcorrer-en-la-nube",level:2},{value:"CanERDDAP\u2122\xbfLa escala?",id:"canerddapla-escala",level:3},{value:"\xbfQu\xe9 evita el autoescalamiento?",id:"qu\xe9-evita-el-autoescalamiento",level:3},{value:"CanERDDAP\u2122\xbfUtilizar Cloud Storage?",id:"canerddaputilizar-cloud-storage",level:3}];function l(e){const a={a:"a",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a.header,{children:(0,s.jsx)(a.h1,{id:"erddapy-la-nube",children:"ERDDAP\u2122y la nube"})}),"\n",(0,s.jsx)(a.h2,{id:"qu\xe9-es-la-nube",children:"\xbfQu\xe9 es la nube?"}),"\n",(0,s.jsx)(a.p,{children:"La definici\xf3n m\xe1s simple no es servidores locales. Esto es muy amplio y puede significar muchas configuraciones diferentes. Por ejemplo, podr\xeda ser un servidor f\xedsico dedicado en un centro de datos, un servidor privado virtual, un servidor compartido, sin servidor o algo m\xe1s."}),"\n",(0,s.jsx)(a.h3,{id:"por-qu\xe9-cloud",children:"Por qu\xe9 Cloud"}),"\n",(0,s.jsx)(a.p,{children:"Hay muchas razones por las que las organizaciones quieren mudarse a la nube. La m\xe1s importante es la flexibilidad que proporciona para las necesidades de c\xe1lculo / almacenamiento en comparaci\xf3n con la compra de hardware f\xedsico."}),"\n",(0,s.jsx)(a.p,{children:"Esto elimina la necesidad de mantener un centro de datos/servidor. Tambi\xe9n permite escalar los recursos inform\xe1ticos a sus necesidades actuales. Al igual que la nube puede significar muchas cosas diferentes, ser capaz de escalar sus recursos tambi\xe9n. Podr\xeda significar pagar por m\xe1s (o menos) Recursos sin servidor. Podr\xeda significar pasar de un servidor compartido a un servidor privado. Podr\xeda significar actualizar a un servidor f\xedsico dedicado m\xe1s grande."}),"\n",(0,s.jsx)(a.h2,{id:"canerddapcorrer-en-la-nube",children:"CanERDDAP\u2122correr en la nube?"}),"\n",(0,s.jsx)(a.p,{children:"S\xed."}),"\n",(0,s.jsxs)(a.p,{children:["ERDDAP\u2122est\xe1 dise\xf1ado para funcionar dentro de Tomcat que se puede ejecutar localmente o en entornos de nubes. Hay apoyo comunitario para correr en Docker y hay",(0,s.jsx)(a.a,{href:"https://github.com/ERDDAP/erddap/blob/main/DOCKER.md",children:"funcionario Apoyo Docker pronto"}),"."]}),"\n",(0,s.jsxs)(a.p,{children:["Eso dijo",":ERDDAP","\u2122fue dise\xf1ado en un momento en que servidores dedicados eran la norma. No es sin servidor, y ser\xeda extremadamente dif\xedcil si no imposible hacerlo sin servidor."]}),"\n",(0,s.jsx)(a.h3,{id:"canerddapla-escala",children:"CanERDDAP\u2122\xbfLa escala?"}),"\n",(0,s.jsxs)(a.p,{children:["EscaladaERDDAP\u2122es m\xe1s complicado que usar m\xe1s recursos sin servidor. Tenemos una gran documentaci\xf3n sobre",(0,s.jsx)(a.a,{href:"https://erddap.github.io/docs/server-admin/scaling",children:"c\xf3mo escalarERDDAP\u2122"}),". Haciendo m\xe1s f\xe1cil escalarERDDAP\u2122es algo que nos interesa."]}),"\n",(0,s.jsx)(a.h3,{id:"qu\xe9-evita-el-autoescalamiento",children:"\xbfQu\xe9 evita el autoescalamiento?"}),"\n",(0,s.jsxs)(a.p,{children:["ERDDAP\u2122est\xe1 haciendo muchas cosas, incluyendo mantener los conjuntos de datos actualizados, notificando a los suscriptores de cambios en los conjuntos de datos, datos de cach\xe9, tramitar solicitudes de usuario, y m\xe1s. Para un suficientemente grandeERDDAP\u2122servidor",(0,s.jsx)(a.a,{href:"https://coastwatch.pfeg.noaa.gov/erddap/index.html",children:"CoastWatch"}),"Esto significa que continuamente est\xe1 haciendo algo. El uso continuo es en realidad una situaci\xf3n extremadamente costosa para las opciones sin servidor (pagas una gran prima por compute cuando haces sin servidor y por lo tanto la ventaja principal es cuando s\xf3lo ocasionalmente haces llamadas) . Adem\xe1s, tratando de mover todoERDDAP\u2122\u2019s varias funcionalidad a versiones sin servidor terminar\xeda con una configuraci\xf3n significativamente m\xe1s complicada requerida para los administradores."]}),"\n",(0,s.jsx)(a.h3,{id:"canerddaputilizar-cloud-storage",children:"CanERDDAP\u2122\xbfUtilizar Cloud Storage?"}),"\n",(0,s.jsx)(a.p,{children:"S\xed."}),"\n",(0,s.jsxs)(a.p,{children:["ERDDAP\u2122soporta almacenamiento en la nube (incluido AWS S3) y mejora de este apoyo (for example non-AWS S3) es una alta prioridad enERDDAP\u2122hoja de ruta para el desarrollo.ERDDAP\u2122tambi\xe9n es capaz de extraer datos de muchos servicios en l\xednea existentes. Para m\xe1s informaci\xf3n recomiendo buscar a trav\xe9s de nuestra",(0,s.jsx)(a.a,{href:"https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types",children:"Tipo de archivo de documentaci\xf3n"}),"."]})]})}function u(e={}){const{wrapper:a}={...(0,r.R)(),...e.components};return a?(0,s.jsx)(a,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},28453:(e,a,n)=>{n.d(a,{R:()=>i,x:()=>d});var o=n(96540);const s={},r=o.createContext(s);function i(e){const a=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function d(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),o.createElement(r.Provider,{value:a},e.children)}}}]);