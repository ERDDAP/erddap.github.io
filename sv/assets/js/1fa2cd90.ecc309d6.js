"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[801],{28453:(e,n,r)=>{r.d(n,{R:()=>d,x:()=>s});var a=r(96540);const t={},i=a.createContext(t);function d(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),a.createElement(i.Provider,{value:n},e.children)}},76326:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>c,frontMatter:()=>d,metadata:()=>a,toc:()=>o});const a=JSON.parse('{"id":"contributing/release_process","title":"ERDDAP\u2122Release Process","description":"* Se till att bild j\xe4mf\xf6relse filer \xe4r tillg\xe4ngliga (Detta kan inneb\xe4ra att du k\xf6r \\"mvn verify\\", om du vill p\xe5skynda den upp restriktionen f\xf6r bara ImageComparison-gruppen men notera att det fortfarande kr\xe4ver att du k\xf6r Jetty-test.)","source":"@site/i18n/sv/docusaurus-plugin-content-docs/current/contributing/release_process.md","sourceDirName":"contributing","slug":"/contributing/release_process","permalink":"/sv/docs/contributing/release_process","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/contributing/release_process.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3},"sidebar":"docSidebar","previous":{"title":"Programmers guide","permalink":"/sv/docs/contributing/programmer-guide"},"next":{"title":"index","permalink":"/sv/docs/dokka/"}}');var t=r(74848),i=r(28453);const d={sidebar_position:3},s="ERDDAP\u2122Release Process",l={},o=[{value:"Kanarie\xf6arna",id:"kanarie\xf6arna",level:2},{value:"GitHub frig\xf6r",id:"github-frig\xf6r",level:2},{value:"Dokumentationsuppdatering",id:"dokumentationsuppdatering",level:2},{value:"Se till att andra repor \xe4r uppdaterade efter behov",id:"se-till-att-andra-repor-\xe4r-uppdaterade-efter-behov",level:2},{value:"Meddela anv\xe4ndare",id:"meddela-anv\xe4ndare",level:2},{value:"Announce release",id:"announce-release",level:3}];function p(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"erddaprelease-process",children:"ERDDAP\u2122Release Process"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:'Se till att bild j\xe4mf\xf6relse filer \xe4r tillg\xe4ngliga (Detta kan inneb\xe4ra att du k\xf6r "mvn verify", om du vill p\xe5skynda den upp restriktionen f\xf6r bara ImageComparison-gruppen men notera att det fortfarande kr\xe4ver att du k\xf6r Jetty-test.)'}),"\n",(0,t.jsx)(n.li,{children:"Uppdatera beroenden"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"mvn versions:display-dependency-updates   // (displays updates)\r\nmvn versions:use-latest-versions  // (updates dependencies, though sometimes we don\u2019t want to do all of them)\r\nmvn versions:update-properties // (updates versions in the property block)\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Uppdatera plugin"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"mvn versions:display-plugin-updates // (displays updates, need to manually update)\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"K\xf6r tester f\xf6r att se till att beroendeuppdateringar inte bryta n\xe5got f\xf6r alla st\xf6rre konfigurationer (datam\xe4ngder i synnerhet, \xe4ven om andra betydande inst\xe4llningar samt)"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"mvn verify\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Anv\xe4nd TranslateMessages.translate () uppdatera \xf6vers\xe4ttningar om det beh\xf6vs"}),"\n",(0,t.jsx)(n.li,{children:"EDStatic.java s\xe4tter utveckling \xc4ndra versionsnumret och ange lanseringsdatumet."}),"\n",(0,t.jsx)(n.li,{children:"G\xf6r bygget"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"mvn clean\r\nmvn compile\r\nmvn package\n"})}),"\n",(0,t.jsx)(n.h2,{id:"kanarie\xf6arna",children:"Kanarie\xf6arna"}),"\n",(0,t.jsx)(n.p,{children:"Skicka krigsfilen f\xf6r distribution p\xe5 Coastwatch-servern eller n\xe5gon annan server som anv\xe4nder de flesta datasettyperna och f\xe5r mycket trafik.\r\nVi vill f\xf6rs\xf6ka hitta fel innan bredare distribution av byggnaden."}),"\n",(0,t.jsx)(n.p,{children:"Inkludera meddelande n\xe4r du ber\xe4ttar om en ny release."}),"\n",(0,t.jsx)(n.p,{children:"Standardf\xf6rfarandet \xe4r:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Ladda upp .war-filen till kustwatch\\[Tomcat\\]/inneh\xe5ll/erddap/"}),"\n",(0,t.jsxs)(n.li,{children:["Som anv\xe4ndare=tomcat:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:'Inom\\[Tomcat\\]/bin/ :\r\n./shutdown.sh //use "ps-fu tomcat" f\xf6r att s\xe4kerst\xe4lla att den har stoppats'}),"\n",(0,t.jsx)(n.li,{children:"Inom\\[Tomcat\\]/webapps/ :\r\nRM -rf Erddap\r\nRm erddap. krig\r\ncp ../inneh\xe5ll/erddap/erddap2.22. Erddap.war //eller vad numret \xe4r"}),"\n",(0,t.jsx)(n.li,{children:"Inom\\[Tomcat\\]/bin/ :\r\nStartup.sh"}),"\n",(0,t.jsx)(n.li,{children:"EfterERDDAPhar \xe5terv\xe4nt en webbsida,\\[Tomcat\\]/webapps/ :\r\nchgrp -R erddap erddap\r\nchmod -R g+rw erddap\r\nchmod -R o-rwx erddap"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"github-frig\xf6r",children:"GitHub frig\xf6r"}),"\n",(0,t.jsx)(n.p,{children:"Draft GitHub release, inkluderar erddap.war och erddapContent.zip  (Inga versionsnummer)"}),"\n",(0,t.jsxs)(n.p,{children:["title: The official v2.25 version\r\nbeskriva: Se \xe4ndringslistan p\xe5\r\n",(0,t.jsx)(n.a,{href:"https://erddap.github.io/changes#version-225",children:"https://erddap.github.io/changes#version-225"})]}),"\n",(0,t.jsx)(n.h2,{id:"dokumentationsuppdatering",children:"Dokumentationsuppdatering"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Uppdatera versionsnummer i docusaurus.config.ts-filen (i sidosektionen) ."}),"\n",(0,t.jsxs)(n.li,{children:["Redigera dokumentationssidorna (deploy-install.md och deploy-update.md) .","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"S\xf6k efter\\[Erddap.war\\]"}),"\n",(0,t.jsx)(n.li,{children:"Kopiera befintlig information (Lite reformaterade) till listan \xf6ver tidigare installationer 2."}),"\n",(0,t.jsx)(n.li,{children:"\xc4ndra den aktuella releaseinformationen f\xf6r erddap. krig vid\\[Erddap.war\\]"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"K\xf6r \xf6vers\xe4ttningarna f\xf6r dokumentationswebbplatsen."}),"\n",(0,t.jsx)(n.li,{children:"G\xf6r en pull request och sl\xe5 samman \xe4ndringarna."}),"\n",(0,t.jsx)(n.li,{children:"Utplacera dokumentationswebbplatsen (Se Readme) ."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"se-till-att-andra-repor-\xe4r-uppdaterade-efter-behov",children:"Se till att andra repor \xe4r uppdaterade efter behov"}),"\n",(0,t.jsx)(n.p,{children:"Fr\xe4mst betyder detta ErddapContent och ErddapTest, men de b\xf6r h\xe5llas uppdaterade under utvecklingsf\xf6r\xe4ndringar."}),"\n",(0,t.jsx)(n.h2,{id:"meddela-anv\xe4ndare",children:"Meddela anv\xe4ndare"}),"\n",(0,t.jsx)(n.p,{children:"F\xf6rst meddela alla anv\xe4ndare som beg\xe4rde \xe4ndringar (eller vars buggar var fixerade) . Ge dem tid att verifiera f\xf6r\xe4ndringar och/eller h\xf6ja problem."}),"\n",(0,t.jsx)(n.p,{children:"ERDDAPversion 2.25 \xe4r nu tillg\xe4nglig!"}),"\n",(0,t.jsxs)(n.p,{children:["Du kan l\xe4sa om f\xf6r\xe4ndringarna p\xe5\r\n",(0,t.jsx)(n.a,{href:"https://erddap.github.io/changes#version-225",children:"https://erddap.github.io/changes#version-225"})]}),"\n",(0,t.jsx)(n.p,{children:"N\xe5gra av f\xf6r\xe4ndringarna \xe4r f\xf6r\xe4ndringar som du f\xf6reslog. Tack s\xe5 mycket f\xf6r dina f\xf6rslag. S\xf6k efter ditt namn i listan \xf6ver \xe4ndringar f\xf6r att se detaljerna. Det skulle vara bra om du kunde prova de nya funktionerna snart, innan jag tillk\xe4nnager denna nya version till en bredare publik."}),"\n",(0,t.jsxs)(n.p,{children:["Om du \xe4r enERDDAPadministrat\xf6r, instruktionerna f\xf6r uppgradering \xe4r p\xe5\r\n",(0,t.jsx)(n.a,{href:"https://erddap.github.io/docs/server-admin/deploy-update",children:"https://erddap.github.io/docs/server-admin/deploy-update"})]}),"\n",(0,t.jsx)(n.p,{children:"Om du har n\xe5gra problem, fr\xe5gor, f\xf6rslag, v\xe4nligen maila mig."}),"\n",(0,t.jsx)(n.p,{children:"Tack f\xf6r att du anv\xe4nderERDDAP."}),"\n",(0,t.jsx)(n.h3,{id:"announce-release",children:"Announce release"}),"\n",(0,t.jsx)(n.p,{children:"Skicka ett meddelande till Announcements Mailing-listan."})]})}function c(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}}}]);