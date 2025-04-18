"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7009],{28453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>l});var i=t(96540);const r={},s=i.createContext(r);function a(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),i.createElement(s.Provider,{value:n},e.children)}},38046:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"server-admin/display-info","title":"displayInfo and displayAttribute","description":"Vertaling: Tags","source":"@site/i18n/nl/docusaurus-plugin-content-docs/current/server-admin/display-info.md","sourceDirName":"server-admin","slug":"/server-admin/display-info","permalink":"/nl/docs/server-admin/display-info","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/server-admin/display-info.md","tags":[],"version":"current","sidebarPosition":7,"frontMatter":{"title":"displayInfo and displayAttribute","sidebar_position":7},"sidebar":"docSidebar","previous":{"title":"EDDTableFromEML","permalink":"/nl/docs/server-admin/EDDTableFromEML"},"next":{"title":"Contributing","permalink":"/nl/docs/category/contributing"}}');var r=t(74848),s=t(28453);const a={title:"displayInfo and displayAttribute",sidebar_position:7},l=void 0,d={},o=[{value:"Vertaling: Tags",id:"vertaling-tags",level:2},{value:"Omschrijving",id:"omschrijving",level:3},{value:"Gebruiksinstructies",id:"gebruiksinstructies",level:3},{value:"Hoe het werkt",id:"hoe-het-werkt",level:3},{value:"Voorbeeld",id:"voorbeeld",level:3},{value:"Dataset Global Attributen Voorbeeld:",id:"dataset-global-attributen-voorbeeld",level:4},{value:"UI-gedrag:",id:"ui-gedrag",level:4},{value:"Opmerkingen",id:"opmerkingen",level:3}];function c(e){const n={code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"vertaling-tags",children:"Vertaling: Tags"}),"\n",(0,r.jsx)(n.h3,{id:"omschrijving",children:"Omschrijving"}),"\n",(0,r.jsx)(n.p,{children:"Deze functie stelt u in staat om globale attributen van uw keuze weer te geven op de datasets pagina in de rij Informatie."}),"\n",(0,r.jsx)(n.h3,{id:"gebruiksinstructies",children:"Gebruiksinstructies"}),"\n",(0,r.jsx)(n.p,{children:"Deze tags kunnen alleen gebruikt worden met de Sax parser. Volg deze stappen om ze in te schakelen en te gebruiken:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"De SAX-parser inschakelen"})," :\nVoeg de volgende regel toe aan uw bestand:"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-xml",children:"<useSaxParser>true</useSaxParser>\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"2",children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Tags toevoegen aandatasets.xmlWat?"})," :\nIn dedatasets.xmlHet bestand bevat twee top-level tags:"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-xml",children:"<displayInfo></displayInfo>\n<displayAttribute></displayAttribute>\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"3",children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Standaardgedrag"})," :"]}),"\n"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Als deze tags niet zijn toegevoegd of leeg gelaten in de datasets.xmlDe standaardwaarden worden als volgt toegepast:","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Vertaling: Samenvatting,Licentie Wat?"}),"\n",(0,r.jsx)(n.li,{children:"DisplayAttribuutExterne links: Wat?"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.ol,{start:"4",children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Consistentie garanderen"})," :\nHet aantal door komma's gescheiden waarden in zowel displayInfo"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"hoe-het-werkt",children:"Hoe het werkt"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:'De <Wat?addAttributesVoor elke dataset wordt een "tag" getoond.'}),"\n",(0,r.jsx)(n.li,{children:"De corresponderende waarden in de"}),"\n",(0,r.jsx)(n.li,{children:"Wanneer de gebruiker over de getoonde labels zweeft, verschijnt er een tooltip die de waarde van het globale attribuut toont."}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"voorbeeld",children:"Voorbeeld"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-xml",children:"<displayInfo>Display1,Display2</displayInfo>\n<displayAttribute>att1,att2</displayAttribute>\n"})}),"\n",(0,r.jsx)(n.h4,{id:"dataset-global-attributen-voorbeeld",children:"Dataset Global Attributen Voorbeeld:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-xml",children:'<att name="att1">This is att1</att>\n<att name="att2">This is att2</att>\n'})}),"\n",(0,r.jsx)(n.h4,{id:"ui-gedrag",children:"UI-gedrag:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:'De woorden "Display1" en "Display2" worden weergegeven in de rij "Informatie" op de UI.'}),"\n",(0,r.jsxs)(n.li,{children:["Als de tooltips worden getild, zullen de bijbehorende attribuutwaarden worden weergegeven:","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Display1"}),"\n",(0,r.jsx)(n.li,{children:"Display2"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"opmerkingen",children:"Opmerkingen"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Zorg ervoor dat de attribuutnamen die zijn opgegeven in de displayAttribuute"}),"\n",(0,r.jsx)(n.li,{children:"Onjuiste of ontbrekende attributen zullen foutmeldingen loggen."}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:'Door deze stappen te volgen, kunt u de rij "Informatie" op de datasets pagina aanpassen om relevante globale attributen weer te geven met bijbehorende tooltips.'})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}}}]);