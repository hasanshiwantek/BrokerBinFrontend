import{b as m,a as y,k as b,u as f,c as g,r as v,au as d,j as s,L as r}from"./index-SDeZWYlL.js";import{c as n}from"./TopSearches.module-B1l8CGlK.js";import{s as a}from"./Company.module-DRO5cVpv.js";const C=()=>{const i=m.get("token"),h=y(),x=b(),j=f(),{topSearchData:p,loading:u,error:l}=g(e=>e.reports),o=new URLSearchParams(x.search).get("query")||"";v.useEffect(()=>{h(d({token:i,parameter:o}))},[]);const c=(e,t)=>{e.preventDefault(),h(d({token:i,parameter:t})),j(`/reports/topSearches?query=${t}`,{replace:!0})};return u?s.jsx("p",{children:"Loading..."}):l?s.jsxs("p",{children:["Error: ",l.message]}):s.jsxs("div",{className:n.container,children:[s.jsx("div",{className:a.navTabs,children:s.jsxs("ul",{children:[s.jsx("li",{children:s.jsx(r,{to:"/reports/Company",children:"Company"})}),s.jsx("li",{children:s.jsx(r,{to:"/reports/sitewide",children:"Site Wide"})}),s.jsx("li",{children:s.jsx(r,{to:"/reports/email",children:"Email"})}),s.jsx("li",{children:s.jsx(r,{to:"/reports/serviceStats",children:"Stats"})})]})}),s.jsxs("div",{className:n.topSearches,children:[s.jsxs("h3",{children:["Top 200 Searches ",o,":"]}),s.jsxs("table",{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"rank"}),s.jsx("th",{children:"# of hits"}),s.jsx("th",{children:"Part #/HECI"}),s.jsx("th",{children:"Mfg"}),s.jsx("th",{children:"Qty Available"}),s.jsx("th",{children:"Avg Price"}),s.jsx("th",{children:"Description (Random)"})]})}),s.jsx("tbody",{children:p.map((e,t)=>s.jsxs("tr",{children:[s.jsx("td",{children:t+1}),s.jsx("td",{children:e.search_count}),s.jsx("td",{children:e.partModel}),s.jsx("td",{children:e.mfg}),s.jsx("td",{children:e.quantity}),s.jsx("td",{children:e.price}),s.jsx("td",{children:e.productDescription})]},e.id))}),s.jsx("tfoot",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"rank"}),s.jsx("th",{children:"# of hits"}),s.jsx("th",{children:"Part #/HECI"}),s.jsx("th",{children:"Mfg"}),s.jsx("th",{children:"Qty Available"}),s.jsx("th",{children:"Avg Price"}),s.jsx("th",{children:"Description (Random)"})]})})]}),s.jsxs("div",{className:n.topSearchButtons,children:[s.jsx("button",{type:"button",className:a.basicButton,onClick:e=>c(e,"last_month"),children:"Last 30 Days"}),s.jsx("button",{type:"button",className:a.basicButton,onClick:e=>c(e,"last_7_days"),children:"Last 7 Days"}),s.jsx("button",{type:"button",className:a.basicButton,onClick:e=>c(e,"yesterday"),children:"Yesterday"})]})]})]})};export{C as default};
