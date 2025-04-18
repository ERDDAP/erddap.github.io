"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2465],{28453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>t});var s=i(96540);const r={},d=s.createContext(r);function l(e){const n=s.useContext(d);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),s.createElement(d.Provider,{value:n},e.children)}},51014:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>t,default:()=>a,frontMatter:()=>l,metadata:()=>s,toc:()=>o});const s=JSON.parse('{"id":"contributing/release_process","title":"ERDDAP\u2122\u0622\u0632\u0627\u062f\u06cc","description":"* \u062f\u0631\u0633\u062a \u062a\u0635\u0648\u06cc\u0631\u06cc \u0641\u0627\u0626\u0644\u06cc\u06ba \u062f\u0633\u062a\u06cc\u0627\u0628 \u06c1\u06cc\u06ba (\u0627\u0633 \u06a9\u0627 \u0645\u0637\u0644\u0628 \u06cc\u06c1 \u06c1\u0648 \u0633\u06a9\u062a\u0627 \u06c1\u06d2 \u06a9\u06c1 \'\u0645\u0646\u0679\u0646 \u062a\u0635\u062f\u06cc\u0642 \u06a9\u0631\u0646\u0627\'\u060c \u0627\u06af\u0631 \u0622\u067e \u062a\u06cc\u0632 \u06a9\u0631\u0646\u0627 \u0686\u0627\u06c1\u062a\u06d2 \u06c1\u06cc\u06ba \u06a9\u06c1 \u062a\u0635\u0648\u06cc\u0631\u06cc \u06af\u0631\u0648\u067e \u06a9\u0648 \u0645\u062d\u062f\u0648\u062f \u06a9\u0631\u0646\u06d2 \u06a9\u06d2 \u0644\u0626\u06d2)","source":"@site/i18n/ur/docusaurus-plugin-content-docs/current/contributing/release_process.md","sourceDirName":"contributing","slug":"/contributing/release_process","permalink":"/ur/docs/contributing/release_process","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/contributing/release_process.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3},"sidebar":"docSidebar","previous":{"title":"\u067e\u0631\u0648\u06af\u0631\u0627\u0645\u0631 \u06a9\u0627 \u06af\u0627\u0626\u06cc\u0688","permalink":"/ur/docs/contributing/programmer-guide"},"next":{"title":"index","permalink":"/ur/docs/dokka/"}}');var r=i(74848),d=i(28453);const l={sidebar_position:3},t="ERDDAP\u2122\u0622\u0632\u0627\u062f\u06cc",c={},o=[{value:"\u06a9\u06cc\u0646\u0631\u06cc",id:"\u06a9\u06cc\u0646\u0631\u06cc",level:2},{value:"\u062c\u06cc\u200c\u0646\u06c1\u06cc\u06ba \u06d4",id:"\u062c\u06cc\u0646\u06c1\u06cc\u06ba-",level:2},{value:"\u062f\u0633\u062a\u0627\u0648\u06cc\u0632\u0627\u062a \u06a9\u06cc \u062a\u062c\u062f\u06cc\u062f",id:"\u062f\u0633\u062a\u0627\u0648\u06cc\u0632\u0627\u062a-\u06a9\u06cc-\u062a\u062c\u062f\u06cc\u062f",level:2},{value:"\u062f\u06cc\u06af\u0631 \u0631\u062f \u0639\u0645\u0644 \u0636\u0631\u0648\u0631\u062a \u06a9\u06d2 \u0645\u0637\u0627\u0628\u0642 \u0622\u062c \u062a\u06a9 \u062c\u0627\u0631\u06cc \u06c1\u06cc\u06ba\u06d4",id:"\u062f\u06cc\u06af\u0631-\u0631\u062f-\u0639\u0645\u0644-\u0636\u0631\u0648\u0631\u062a-\u06a9\u06d2-\u0645\u0637\u0627\u0628\u0642-\u0622\u062c-\u062a\u06a9-\u062c\u0627\u0631\u06cc-\u06c1\u06cc\u06ba",level:2},{value:"\u0635\u0627_\u0631\u0641 \u06a9\u0627 \u0646\u0627\u0645 \u0646\u06c1\u06cc\u06ba \u062f\u06cc\u0627 \u06af\u06cc\u0627",id:"\u0635\u0627_\u0631\u0641-\u06a9\u0627-\u0646\u0627\u0645-\u0646\u06c1\u06cc\u06ba-\u062f\u06cc\u0627-\u06af\u06cc\u0627",level:2},{value:"\u0627\u0637\u0644\u0627\u0639 \u062f\u06d2 \u062f\u0648",id:"\u0627\u0637\u0644\u0627\u0639-\u062f\u06d2-\u062f\u0648",level:3}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,d.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"erddap\u0622\u0632\u0627\u062f\u06cc",children:"ERDDAP\u2122\u0622\u0632\u0627\u062f\u06cc"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u062f\u0631\u0633\u062a \u062a\u0635\u0648\u06cc\u0631\u06cc \u0641\u0627\u0626\u0644\u06cc\u06ba \u062f\u0633\u062a\u06cc\u0627\u0628 \u06c1\u06cc\u06ba (\u0627\u0633 \u06a9\u0627 \u0645\u0637\u0644\u0628 \u06cc\u06c1 \u06c1\u0648 \u0633\u06a9\u062a\u0627 \u06c1\u06d2 \u06a9\u06c1 '\u0645\u0646\u0679\u0646 \u062a\u0635\u062f\u06cc\u0642 \u06a9\u0631\u0646\u0627'\u060c \u0627\u06af\u0631 \u0622\u067e \u062a\u06cc\u0632 \u06a9\u0631\u0646\u0627 \u0686\u0627\u06c1\u062a\u06d2 \u06c1\u06cc\u06ba \u06a9\u06c1 \u062a\u0635\u0648\u06cc\u0631\u06cc \u06af\u0631\u0648\u067e \u06a9\u0648 \u0645\u062d\u062f\u0648\u062f \u06a9\u0631\u0646\u06d2 \u06a9\u06d2 \u0644\u0626\u06d2)"}),"\n",(0,r.jsx)(n.li,{children:"\u0637\u06d2\u0634\u062f\u06c1"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"mvn versions:display-dependency-updates   // (displays updates)\nmvn versions:use-latest-versions  // (updates dependencies, though sometimes we don\u2019t want to do all of them)\nmvn versions:update-properties // (updates versions in the property block)\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u0637\u06d2\u0634\u062f\u06c1"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"mvn versions:display-plugin-updates // (displays updates, need to manually update)\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u0686\u0644\u0627\u0646\u06d2 \u06a9\u06d2 \u0627\u0645\u062a\u062d\u0627\u0646\u0627\u062a \u06cc\u0642\u06cc\u0646\u06cc \u0637\u0648\u0631 \u067e\u0631 \u062a\u062c\u062f\u06cc\u062f \u06a9\u0631\u0646\u06d2 \u06a9\u06d2 \u0644\u0626\u06d2 \u062a\u0645\u0627\u0645 \u0628\u0691\u06d2 \u067e\u0631\u06cc\u0641\u06cc\u06a9\u0686\u0631 \u06a9\u06d2 \u0644\u0626\u06d2 \u06a9\u0686\u06be \u0646\u06c1\u06cc\u06ba \u062a\u0648\u0691 \u0633\u06a9\u06d2 (\u0627\u0639\u062f\u0627\u062f \u0648 \u0634\u0645\u0627\u0631 \u062e\u0627\u0635 \u0637\u0648\u0631 \u067e\u0631 \u06a9\u0633\u06cc \u0628\u06be\u06cc \u062f\u0648\u0633\u0631\u06cc \u0627\u06c1\u0645 \u062a\u0631\u062a\u06cc\u0628\u0627\u062a \u06a9\u06d2 \u0639\u0644\u0627\u0648\u06c1)"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"mvn verify\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u0628\u0631 \u0637\u0627 \u0644 \u0627\u0633\u062a\u0639\u0645\u0627\u0644 \u06a9\u0631\u064a\u06ba () \u0636\u0631\u0648\u0631\u062a \u067e\u0691\u0646\u06d2 \u067e\u0631 \u0627\u06af\u0631 \u062a\u0631\u062c\u0645\u06c1 \u062f\u0648\u0628\u0627\u0631\u06c1 \u0634\u0631\u0648\u0639 \u06a9\u06cc\u0627 \u062c\u0627\u0626\u06d2"}),"\n",(0,r.jsx)(n.li,{children:"\u0627\u06cc\u0633 . \u0627\u06d2 . \u062c\u06be\u0648\u0679\u06d2 \u0645\u0630\u06c1\u0628 \u067e\u0631\u060c \u0648\u0631\u0698\u0646 \u0646\u0645\u0628\u0631 \u062a\u0628\u062f\u06cc\u0644 \u06a9\u0631\u06a9\u06d2 \u0631\u06c1\u0627\u0626\u06cc \u06a9\u06cc \u062a\u0627\u0631\u06cc\u062e \u0645\u0639\u0644\u0648\u0645 \u06a9\u0631\u06cc\u06ba\u06d4"}),"\n",(0,r.jsx)(n.li,{children:"\u062a\u0639\u0645\u06cc\u0631"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"mvn clean\nmvn compile\nmvn package\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u06a9\u06cc\u0646\u0631\u06cc",children:"\u06a9\u06cc\u0646\u0631\u06cc"}),"\n",(0,r.jsx)(n.p,{children:"\u0622\u0626\u06cc\u0648\u0631\u06cc \u06a9\u0648\u0633\u0679 \u0633\u0631\u0648\u0631 \u06cc\u0627 \u06a9\u0686\u06be \u062f\u0648\u0633\u0631\u06d2 \u0633\u0631\u0648\u0631 \u067e\u0631 \u062a\u0642\u0633\u06cc\u0645 \u06a9\u06d2 \u0644\u06cc\u06d2 \u062c\u0646\u06af \u0641\u0627\u0626\u0644 \u0628\u06be\u06cc\u062c\u06cc\u06ba \u062c\u0648 \u0688\u06cc\u0679\u0627 \u0633\u06cc\u0679 \u06a9\u06cc \u0632\u06cc\u0627\u062f\u06c1 \u062a\u0631 \u0627\u0642\u0633\u0627\u0645 \u0627\u0633\u062a\u0639\u0645\u0627\u0644 \u06a9\u0631\u062a\u06d2 \u06c1\u06cc\u06ba \u0627\u0648\u0631 \u0628\u06c1\u062a \u0632\u06cc\u0627\u062f\u06c1 \u0679\u0631\u06cc\u0641\u06a9 \u062d\u0627\u0635\u0644 \u06a9\u0631\u062a\u06d2 \u06c1\u06cc\u06ba\u06d4\n\u06c1\u0645 \u0639\u0645\u0627\u0631\u062a \u06a9\u06cc \u0648\u0633\u06cc\u0639 \u062a\u0642\u0633\u06cc\u0645 \u0633\u06d2 \u067e\u06c1\u0644\u06d2 \u063a\u0644\u0637\u06cc\u0648\u06ba \u06a9\u0648 \u062a\u0644\u0627\u0634 \u06a9\u0631\u0646\u0627 \u0686\u0627\u06c1\u062a\u06d2 \u06c1\u06cc\u06ba\u06d4"}),"\n",(0,r.jsx)(n.p,{children:"\u0646\u0626\u06cc \u0631\u06cc\u0644\u06cc\u0632 \u06a9\u06cc \u0628\u0627\u0628\u062a \u0628\u062a\u0627\u0646\u06d2 \u0645\u06cc\u06ba \u067e\u06cc\u063a\u0627\u0645 \u0634\u0627\u0645\u0644 \u06a9\u0631\u06cc\u06ba \u06d4"}),"\n",(0,r.jsx)(n.p,{children:"\u0645\u0639\u06cc\u0627\u0631\u06cc \u0637\u0631\u06cc\u0642\u06c1 \u06cc\u06c1 \u06c1\u06d2:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"... \u062c\u0646\u06af\u06cc \u0641\u0627\u0626\u0644 \u06a9\u0648 \u0633\u0627\u062d\u0644\u06cc \u0631\u0627\u0633\u062a\u0648\u06ba \u067e\u0631 \u0627\u067e \u0644\u0648\u0688 \u06a9\u0631\u06cc\u06ba\\[\u0628\u0627\u0626\u0679\u0633\\]/\u0627\u062e\u062a\u06cc\u0627\u0631/\u06af/\u0631\u064f\u06a9/\u062a"}),"\n",(0,r.jsxs)(n.li,{children:["\u0628\u0637\u0648\u0631 \u0635\u0627\u0631\u0641=tomcat:","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:'\u0645\u06cc\u06ba\\[\u0628\u0627\u0626\u0679\u0633\\]/\u0628/\u0628 :\n./shutdown.sh //uses "ps -fomcat" \u06a9\u0648 \u06cc\u0642\u06cc\u0646\u06cc \u0628\u0646\u0627\u0646\u06d2 \u06a9\u06d2 \u0644\u06cc\u06d2'}),"\n",(0,r.jsx)(n.li,{children:"\u0645\u06cc\u06ba\\[\u0628\u0627\u0626\u0679\u0633\\]/ webapps/ :\n\u0631\u0645\u0632\u0650 \u0688\u0627\u06a9 (\u067e\u0648\u0633\u0679\u0644 \u06a9\u0648\u0688)\n\u0631\u0645 \u0627\u06cc\u0648\u0627\u0631\u0688. \u062c\u0646\u06af\n\u0633\u0645 ./conent/erdap/erddap2.22.war Erddap.war / / \u06cc\u0627 \u062c\u0648 \u0628\u06be\u06cc \u0639\u062f\u062f \u06c1\u0648\u062a\u0627 \u06c1\u06d2"}),"\n",(0,r.jsx)(n.li,{children:"\u0645\u06cc\u06ba\\[\u0628\u0627\u0626\u0679\u0633\\]/\u0628/\u0628 :\n./startup.sh"}),"\n",(0,r.jsx)(n.li,{children:"\u0628\u0639\u062fERDDAP\u0648\u06cc\u0628 \u0635\u0641\u062d\u06c1 \u0648\u0627\u067e\u0633 \u0622 \u06af\u06cc\u0627 \u06c1\u06d2\u060c \u0645\u06cc\u06ba\\[\u0628\u0627\u0626\u0679\u0633\\]/ webapps/ :\nChgrp - R Errddap erddap\nchmod -R G+rw erddap -\nchmod -Ro-rwx Erdddap -"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u062c\u06cc\u0646\u06c1\u06cc\u06ba-",children:"\u062c\u06cc\u200c\u0646\u06c1\u06cc\u06ba \u06d4"}),"\n",(0,r.jsx)(n.p,{children:"\u0688\u0631\u0627\u0641\u0679 \u062f\u06cc \u062c\u0679 \u06c1\u0628 \u0631\u06cc\u0644\u06cc\u0632\u060c \u0627\u0633 \u0645\u06cc\u06ba \u0627\u06cc\u0648\u0627\u0631\u0688\u0688\u067e\u06d4 \u0648\u0627\u0631 \u0627\u0648\u0631 \u0627\u06cc\u0648\u0627\u0631\u0688\u067e \u06a9\u0646\u0679\u0648\u0646\u0645\u0646\u0679 \u0634\u0627\u0645\u0644 \u06c1\u06cc\u06ba\u06d4.zip  (\u06a9\u0648\u0626\u06cc \u0648\u0631\u0698\u0646 \u0646\u0645\u0628\u0631 \u0646\u06c1\u06cc\u06ba)"}),"\n",(0,r.jsxs)(n.p,{children:["title: The official v2.25 version\n\u062a\u0641\u0635\u06cc\u0644 : \u062a\u0628\u062f\u06cc\u0644\u06cc\u0648\u06ba \u06a9\u06cc \u0641\u06c1\u0631\u0633\u062a \u062f\u06cc\u06a9\u06be\u06cc\u06ba\n",(0,r.jsx)(n.a,{href:"https://erddap.github.io/changes#version-225",children:"https://erddap.github.io/changes#version-225"})]}),"\n",(0,r.jsx)(n.h2,{id:"\u062f\u0633\u062a\u0627\u0648\u06cc\u0632\u0627\u062a-\u06a9\u06cc-\u062a\u062c\u062f\u06cc\u062f",children:"\u062f\u0633\u062a\u0627\u0648\u06cc\u0632\u0627\u062a \u06a9\u06cc \u062a\u062c\u062f\u06cc\u062f"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u0688\u0628\u0644\u0633 \u0645\u064a\u06ba \u0648\u0631\u0698\u0646 \u06a9\u0627 \u0646\u0645\u0628\u0631 \u0627\u0648\u067e\u0631\u064a \u0646\u0645\u0628\u0631 \u062a\u062c\u062f\u06cc\u062f \u06a9\u0631\u064a\u06ba (\u067e\u06cc\u0627\u062f\u06d2 \u062d\u0635\u06d2 \u0645\u06cc\u06ba) . ."}),"\n",(0,r.jsxs)(n.li,{children:["\u062f\u0633\u062a\u0627\u0648\u06cc\u0632\u0627\u062a \u06a9\u06d2 \u0635\u0641\u062d\u0627\u062a \u0645\u0631\u062a\u0628 \u06a9\u0631\u064a\u06ba (archive-date= (\u0645\u0639\u0627\u0648\u0646\u062a) \u0635\u064a\u0627\u0646\u0629 CS1: \u0644\u063a\u0629 \u063a\u064a\u0631 \u0645\u062f\u0639\u0648\u0645) . .","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u062a\u0644\u0627\u0634\\[\u0627\u06cc\u0648\u0627\u0631\u0688.war\\]"}),"\n",(0,r.jsx)(n.li,{children:"\u0645\u0648\u062c\u0648\u062f\u06c1 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0646\u0642\u0644 \u06a9\u0631\u064a\u06ba (\u062a\u06be\u0648\u0691\u06cc \u0627\u0635\u0644\u0627\u062d) \u0633\u0627\u0628\u0642\u06c1 \u062a\u0646\u0635\u06cc\u0628\u0627\u062a \u06a9\u06cc \u0641\u06c1\u0631\u0633\u062a \u0645\u06cc\u06ba \u06f2 \u06d4"}),"\n",(0,r.jsx)(n.li,{children:"\u0627\u06cc\u0648\u0627\u0631\u0688\u067e \u06a9\u06d2 \u0644\u06cc\u06d2 \u062d\u0627\u0644\u06cc\u06c1 \u0622\u0632\u0627\u062f \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u062a\u0628\u062f\u06cc\u0644 \u06a9\u0631\u06cc\u06ba \u062c\u0646\u06af\\[\u0627\u06cc\u0648\u0627\u0631\u0688.war\\]"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"\u062f\u0633\u062a\u0627\u0648\u06cc\u0632\u0627\u062a \u06a9\u06cc \u062c\u06af\u06c1 \u067e\u0631 \u062a\u0631\u062c\u0645\u06d2 \u0686\u0644\u0627\u0626\u06cc\u06ba \u06d4"}),"\n",(0,r.jsx)(n.li,{children:"\u0627\u06cc\u06a9 \u06a9\u0634\u0634 \u0637\u0644\u0628 \u06a9\u0631 \u06a9\u06d2 \u062a\u0628\u062f\u06cc\u0644\u06cc\u0648\u06ba \u06a9\u0648 \u0645\u0644\u0627 \u06a9\u0631."}),"\n",(0,r.jsx)(n.li,{children:"\u062f\u0633\u062a\u0627\u0648\u06cc\u0632\u0627\u062a \u06a9\u0627 \u0645\u062d\u0644\u0648\u0644 (\u0645\u062c\u06be\u06d2 \u067e\u0691\u06be\u06cc\u06ba) . ."}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u062f\u06cc\u06af\u0631-\u0631\u062f-\u0639\u0645\u0644-\u0636\u0631\u0648\u0631\u062a-\u06a9\u06d2-\u0645\u0637\u0627\u0628\u0642-\u0622\u062c-\u062a\u06a9-\u062c\u0627\u0631\u06cc-\u06c1\u06cc\u06ba",children:"\u062f\u06cc\u06af\u0631 \u0631\u062f \u0639\u0645\u0644 \u0636\u0631\u0648\u0631\u062a \u06a9\u06d2 \u0645\u0637\u0627\u0628\u0642 \u0622\u062c \u062a\u06a9 \u062c\u0627\u0631\u06cc \u06c1\u06cc\u06ba\u06d4"}),"\n",(0,r.jsx)(n.p,{children:"\u0628\u0646\u06cc\u0627\u062f\u06cc \u0637\u0648\u0631 \u067e\u0631 \u0627\u0633 \u06a9\u0627 \u0645\u0637\u0644\u0628 \u0627\u0631\u062f\u0627\u067e \u06a9\u0646\u0679\u0648\u0646\u0645\u0646\u0679 \u0627\u0648\u0631 \u0627\u0631\u062f\u0627\u067e \u0641\u0633\u0627\u062f\u0627\u062a \u06c1\u06cc\u06ba \u0644\u06cc\u06a9\u0646 \u062a\u0631\u0642\u06cc\u0627\u062a\u06cc \u062a\u0628\u062f\u06cc\u0644\u06cc\u0648\u06ba \u06a9\u06d2 \u062f\u0648\u0631\u0627\u0646 \u0627\u0646\u06c1\u06cc\u06ba \u0622\u062c \u062a\u06a9 \u0628\u0631\u0642\u0631\u0627\u0631 \u0631\u06a9\u06be\u0646\u0627 \u0686\u0627\u06c1\u06cc\u06d2\u06d4"}),"\n",(0,r.jsx)(n.h2,{id:"\u0635\u0627_\u0631\u0641-\u06a9\u0627-\u0646\u0627\u0645-\u0646\u06c1\u06cc\u06ba-\u062f\u06cc\u0627-\u06af\u06cc\u0627",children:"\u0635\u0627_\u0631\u0641 \u06a9\u0627 \u0646\u0627\u0645 \u0646\u06c1\u06cc\u06ba \u062f\u06cc\u0627 \u06af\u06cc\u0627"}),"\n",(0,r.jsx)(n.p,{children:"\u0633\u0628 \u0633\u06d2 \u067e\u06c1\u0644\u06d2 \u06a9\u0633\u06cc \u0628\u06be\u06cc \u0635\u0627\u0631\u0641\u06cc\u0646 \u06a9\u0648 \u062a\u0628\u062f\u06cc\u0644 \u06a9\u0631\u0646\u06d2 \u06a9\u06cc \u062f\u0631\u062e\u0648\u0627\u0633\u062a \u06a9\u06cc \u06af\u0626\u06cc (\u06cc\u0627 \u062c\u0633 \u06a9\u06cc \u0628\u06cc\u06af\u0645\u0627\u062a \u0645\u0642\u0631\u0631 \u06c1\u0648\u0626\u06cc\u06ba\u06d4) . . \u0627\u0646\u06c1\u06cc\u06ba \u062a\u0628\u062f\u06cc\u0644\u06cc\u0648\u06ba \u06a9\u06cc \u062a\u0635\u062f\u06cc\u0642 \u06a9\u0631\u0646\u06d2 \u0627\u0648\u0631/\u06cc\u0627 \u0645\u0639\u0627\u0645\u0644\u0627\u062a \u06a9\u0648 \u0627\u067e\u0644\u0648\u0688 \u06a9\u0631\u0646\u06d2 \u06a9\u06d2 \u0644\u06cc\u06d2 \u0648\u0642\u062a \u062f\u06cc\u06ba\u06d4"}),"\n",(0,r.jsx)(n.p,{children:"ERDDAP\u0627\u0628 \u0648\u0631\u0698\u0646 2,25 \u062f\u0633\u062a\u06cc\u0627\u0628 \u06c1\u06d2!"}),"\n",(0,r.jsxs)(n.p,{children:["\u0622\u067e \u0627\u0650\u0646 \u062a\u0628\u062f\u06cc\u0644\u06cc\u0648\u06ba \u06a9\u06d2 \u0628\u0627\u0631\u06d2 \u0645\u06cc\u06ba \u067e\u0691\u06be \u0633\u06a9\u062a\u06d2 \u06c1\u06cc\u06ba\n",(0,r.jsx)(n.a,{href:"https://erddap.github.io/changes#version-225",children:"https://erddap.github.io/changes#version-225"})]}),"\n",(0,r.jsx)(n.p,{children:"\u06a9\u0686\u06be \u062a\u0628\u062f\u06cc\u0644\u06cc\u0627\u06ba \u0627\u06cc\u0633\u06cc \u06c1\u0648\u062a\u06cc \u06c1\u06cc\u06ba \u062c\u0646 \u06a9\u06cc \u0622\u067e \u0646\u06d2 \u062a\u062c\u0648\u06cc\u0632 \u062f\u06cc \u06c1\u06d2\u06d4 \u0622\u067e \u06a9\u06cc \u062a\u062c\u0627\u0648\u06cc\u0632 \u06a9\u06cc\u0644\u0626\u06d2 \u0628\u06c1\u062a \u0634\u06a9\u0631\u06cc\u06c1 \u06d4 \u062a\u0641\u0635\u06cc\u0644\u0627\u062a \u06a9\u0648 \u062f\u06cc\u06a9\u06be\u0646\u06d2 \u06a9\u06d2 \u0644\u06cc\u06d2 \u062a\u0628\u062f\u06cc\u0644\u06cc\u0648\u06ba \u06a9\u06cc \u0641\u06c1\u0631\u0633\u062a \u0645\u06cc\u06ba \u0627\u067e\u0646\u0627 \u0646\u0627\u0645 \u062a\u0644\u0627\u0634 \u06a9\u0631\u0646\u0627\u06d4 \u0627\u06af\u0631 \u0622\u067e \u062c\u0644\u062f \u06c1\u06cc \u0646\u0626\u06cc \u062e\u0635\u0648\u0635\u06cc\u0627\u062a \u062c\u0627\u0646\u0646\u06d2 \u06a9\u06cc \u06a9\u0648\u0634\u0634 \u06a9\u0631 \u0633\u06a9\u062a\u06d2 \u06c1\u06cc\u06ba \u062a\u0648 \u06cc\u06c1 \u0628\u06c1\u062a \u0627\u0686\u06be\u0627 \u06c1\u0648\u06af\u0627\u060c \u0645\u06cc\u06ba \u0627\u0633 \u0646\u0626\u06d2 \u0648\u0631\u0698\u0646 \u06a9\u0627 \u0627\u0639\u0644\u0627\u0646 \u06a9\u0631\u0646\u06d2 \u0633\u06d2 \u067e\u06c1\u0644\u06d2"}),"\n",(0,r.jsxs)(n.p,{children:["\u0627\u06af\u0631 \u062a\u0645 \u0646\u06c1\u06cc\u06ba \u06c1\u0648ERDDAP\u0645\u0646\u062a\u0638\u0645\u060c \u0627\u067e \u06af\u0631\u06cc\u0688\u0646\u06af \u06a9\u06cc \u06c1\u062f\u0627\u06cc\u0627\u062a \u0645\u0648\u062c\u0648\u062f \u06c1\u06cc\u06ba\u06d4\n",(0,r.jsx)(n.a,{href:"https://erddap.github.io/docs/server-admin/deploy-update",children:"https://erddap.github.io/docs/server-admin/deploy-update"})]}),"\n",(0,r.jsx)(n.p,{children:"\u0627\u06af\u0631 \u0622\u067e \u06a9\u06d2 \u067e\u0627\u0633 \u06a9\u0648\u0626\u06cc \u0645\u0633\u0626\u0644\u06c1 \u06c1\u06d2\u060c \u0633\u0648\u0627\u0644\u0627\u062a\u060c \u062a\u062c\u0627\u0648\u06cc\u0632\u060c \u0645\u062c\u06be\u06d2 \u0627\u06cc \u0645\u06cc\u0644 \u06a9\u0631\u06cc\u06ba."}),"\n",(0,r.jsx)(n.p,{children:"\u0627\u0633\u062a\u0639\u0645\u0627\u0644 \u06a9\u06cc\u0644\u0626\u06d2 \u0622\u067e \u06a9\u0627 \u0634\u06a9\u0631\u06cc\u06c1ERDDAP. ."}),"\n",(0,r.jsx)(n.h3,{id:"\u0627\u0637\u0644\u0627\u0639-\u062f\u06d2-\u062f\u0648",children:"\u0627\u0637\u0644\u0627\u0639 \u062f\u06d2 \u062f\u0648"}),"\n",(0,r.jsx)(n.p,{children:"\u0627\u0650\u0633 \u0641\u06c1\u0631\u0633\u062a \u06a9\u06d2 \u0644\u06cc\u06d2 \u067e\u06cc\u063a\u0627\u0645 \u0628\u06be\u06cc\u062c\u06cc\u06ba"})]})}function a(e={}){const{wrapper:n}={...(0,d.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}}}]);