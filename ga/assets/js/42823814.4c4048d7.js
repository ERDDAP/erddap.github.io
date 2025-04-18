"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9973],{28453:(e,r,t)=>{t.d(r,{R:()=>n,x:()=>a});var o=t(96540);const s={},c=o.createContext(s);function n(e){const r=o.useContext(c);return o.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:n(e.components),o.createElement(c.Provider,{value:r},e.children)}},69293:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>a,default:()=>h,frontMatter:()=>n,metadata:()=>o,toc:()=>d});const o=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/guess-frac","title":"guess-frac","description":"//ERDDAP/com.cohort.util/ScriptMath2/guessFrac","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/guess-frac.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/guess-frac","permalink":"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/guess-frac","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/guess-frac.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"guess-frac-string","permalink":"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/guess-frac-string"},"next":{"title":"hi-div","permalink":"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/hi-div"}}');var s=t(74848),c=t(28453);const n={},a="guessFrac",i={},d=[];function l(e){const r={a:"a",br:"br",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,c.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(r.p,{children:["//",(0,s.jsx)(r.a,{href:"/ga/docs/dokka/",children:"ERDDAP"}),"/",(0,s.jsx)(r.a,{href:"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,s.jsx)(r.a,{href:"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/",children:"ScriptMath2"}),"/",(0,s.jsx)(r.a,{href:"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/guess-frac",children:"guessFrac"})]}),"\n",(0,s.jsx)(r.header,{children:(0,s.jsx)(r.h1,{id:"guessfrac",children:"guessFrac"})}),"\n",(0,s.jsxs)(r.p,{children:["[JVM]",(0,s.jsx)(r.br,{}),"\n","open fun ",(0,s.jsx)(r.a,{href:"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/guess-frac",children:"guessFrac"}),"(r: Double, int3: Array<Int>)"]}),"\n",(0,s.jsx)(r.p,{children:"Looks for a fraction very close to some decimal value."}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:["\n",(0,s.jsx)(r.p,{children:"Tries denominators 1..1000. So answer is at least accurate to within 1/1000th. For example, .33333 -> 1/3."}),"\n"]}),"\n",(0,s.jsxs)(r.li,{children:["\n",(0,s.jsx)(r.p,{children:"For example: -1.75 -> whole=-1, numerator=-3 denominator=4"}),"\n"]}),"\n",(0,s.jsxs)(r.li,{children:["\n",(0,s.jsx)(r.p,{children:"Results stored in int3[0=whole, 1=num, 2=den]."}),"\n"]}),"\n",(0,s.jsxs)(r.li,{children:["\n",(0,s.jsx)(r.p,{children:"Slow if no good match found, but this does a good approximate job that gcd() might miss. ```kotlin\nint ar[]=new int[3];\ndouble d=-1.75;\nint whole=guessFrac(d,ar);\n//results: ar[0]=-1, ar[1]=-3, ar[2]=4"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{})}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:r}={...(0,c.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}}}]);