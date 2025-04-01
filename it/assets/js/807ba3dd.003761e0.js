"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2684],{28453:(i,e,n)=>{n.d(e,{R:()=>a,x:()=>r});var t=n(96540);const s={},l=t.createContext(s);function a(i){const e=t.useContext(l);return t.useMemo((function(){return"function"==typeof i?i(e):{...e,...i}}),[e,i])}function r(i){let e;return e=i.disableParentContext?"function"==typeof i.components?i.components(s):i.components||s:a(i.components),t.createElement(l.Provider,{value:e},i.children)}},81189:(i,e,n)=>{n.r(e),n.d(e,{assets:()=>o,contentTitle:()=>r,default:()=>u,frontMatter:()=>a,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"server-admin/display-info","title":"displayInfo and displayAttribute","description":"displayInfo e displayAttribute Tags","source":"@site/i18n/it/docusaurus-plugin-content-docs/current/server-admin/display-info.md","sourceDirName":"server-admin","slug":"/server-admin/display-info","permalink":"/it/docs/server-admin/display-info","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/server-admin/display-info.md","tags":[],"version":"current","sidebarPosition":7,"frontMatter":{"title":"displayInfo and displayAttribute","sidebar_position":7},"sidebar":"docSidebar","previous":{"title":"EDDTableFromEML","permalink":"/it/docs/server-admin/EDDTableFromEML"},"next":{"title":"Contributing","permalink":"/it/docs/category/contributing"}}');var s=n(74848),l=n(28453);const a={title:"displayInfo and displayAttribute",sidebar_position:7},r=void 0,o={},d=[{value:"<code>displayInfo</code> e <code>displayAttribute</code> Tags",id:"displayinfo-e-displayattribute-tags",level:2},{value:"Descrizione",id:"descrizione",level:3},{value:"Istruzioni d&#39;uso",id:"istruzioni-duso",level:3},{value:"Come funziona",id:"come-funziona",level:3},{value:"Esempio",id:"esempio",level:3},{value:"Dataset Attributi globali Esempio:",id:"dataset-attributi-globali-esempio",level:4},{value:"UI Behavior:",id:"ui-behavior",level:4},{value:"Note",id:"note",level:3}];function c(i){const e={code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...i.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(e.h2,{id:"displayinfo-e-displayattribute-tags",children:[(0,s.jsx)(e.code,{children:"displayInfo"})," e ",(0,s.jsx)(e.code,{children:"displayAttribute"})," Tags"]}),"\n",(0,s.jsx)(e.h3,{id:"descrizione",children:"Descrizione"}),"\n",(0,s.jsxs)(e.p,{children:["Questa funzione consente di visualizzare gli attributi globali di vostra scelta nella pagina dei set di dati nella riga ",(0,s.jsx)(e.code,{children:"Information"}),"."]}),"\n",(0,s.jsx)(e.h3,{id:"istruzioni-duso",children:"Istruzioni d'uso"}),"\n",(0,s.jsxs)(e.p,{children:["Questi tag possono essere utilizzati solo con il ",(0,s.jsx)(e.code,{children:"Sax parser"}),". Per abilitarli e utilizzarli, seguire questi passaggi:"]}),"\n",(0,s.jsxs)(e.ol,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Abilitare il SAX Parser"})," :\r\nAggiungi la seguente riga al file ",(0,s.jsx)(e.code,{children:"setup.xml"}),":"]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-xml",children:"<useSaxParser>true</useSaxParser>\n"})}),"\n",(0,s.jsxs)(e.ol,{start:"2",children:["\n",(0,s.jsxs)(e.li,{children:["**Aggiungi tag in ",(0,s.jsx)(e.code,{children:"datasets.xml#** : Nel "}),"datasets.xml` file, includere due tag di primo livello:"]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-xml",children:"<displayInfo></displayInfo>\r\n<displayAttribute></displayAttribute>\n"})}),"\n",(0,s.jsxs)(e.ol,{start:"3",children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Comportamento predefinito"})," :"]}),"\n"]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Se questi tag non vengono aggiunti o lasciati vuoti nel ",(0,s.jsx)(e.code,{children:"datasets.xml"})," file, i valori predefiniti vengono applicati come segue:","\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"displayInfo"}),': "Summary, License #']}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"displayAttributi"}),": `sommario, licenza #"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.ol,{start:"4",children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Assicurare la coerenza"})," :\r\nIl numero di valori separati da virgola in entrambi i tag ",(0,s.jsx)(e.code,{children:"displayInfo"})," e ",(0,s.jsx)(e.code,{children:"displayAttribute"})," deve essere lo stesso."]}),"\n"]}),"\n",(0,s.jsx)(e.h3,{id:"come-funziona",children:"Come funziona"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Il tag ",(0,s.jsx)(e.code,{children:"displayAttribute"})," specifica gli attributi globali (definiti all'interno del<#addAttributes`> tag) da visualizzare per ogni dataset."]}),"\n",(0,s.jsxs)(e.li,{children:["I valori corrispondenti nel tag ",(0,s.jsx)(e.code,{children:"displayInfo"})," vengono visualizzati come etichette nella riga ",(0,s.jsx)(e.code,{children:"Information"})," dell'interfaccia utente."]}),"\n",(0,s.jsx)(e.li,{children:"Quando l'utente supera le etichette visualizzate, apparir\xe0 un tooltip, mostrando il valore dell'attributo globale."}),"\n"]}),"\n",(0,s.jsx)(e.h3,{id:"esempio",children:"Esempio"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-xml",children:"<displayInfo>Display1,Display2</displayInfo>\r\n<displayAttribute>att1,att2</displayAttribute>\n"})}),"\n",(0,s.jsx)(e.h4,{id:"dataset-attributi-globali-esempio",children:"Dataset Attributi globali Esempio:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-xml",children:'<att name="att1">This is att1</att>\r\n<att name="att2">This is att2</att>\n'})}),"\n",(0,s.jsx)(e.h4,{id:"ui-behavior",children:"UI Behavior:"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Le parole ",(0,s.jsx)(e.code,{children:"Display1"})," e ",(0,s.jsx)(e.code,{children:"Display2"})," saranno visualizzate nella riga ",(0,s.jsx)(e.code,{children:"Information"})," sull'interfaccia utente."]}),"\n",(0,s.jsxs)(e.li,{children:["Quando hovered, i tooltips visualizzeranno i valori di attributo corrispondenti:","\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"Display1"}),": mostra Tooltip _ Questo \xe8 att1_"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"Display2"}),": mostra Tooltip _ Questo \xe8 att2_"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.h3,{id:"note",children:"Note"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Assicurare i nomi degli attributi specificati nel tag ",(0,s.jsx)(e.code,{children:"displayAttribute"})," corrispondono agli attributi globali definiti nel dataset."]}),"\n",(0,s.jsx)(e.li,{children:"Gli attributi non corretti o mancanti registrano i messaggi di errore."}),"\n"]}),"\n",(0,s.jsxs)(e.p,{children:["Seguendo questi passaggi, \xe8 possibile personalizzare la riga ",(0,s.jsx)(e.code,{children:"Information"})," nella pagina dei set di dati per visualizzare gli attributi globali rilevanti con i corrispondenti tooltips."]})]})}function u(i={}){const{wrapper:e}={...(0,l.R)(),...i.components};return e?(0,s.jsx)(e,{...i,children:(0,s.jsx)(c,{...i})}):c(i)}}}]);