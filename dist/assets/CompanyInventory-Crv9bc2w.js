import{b as P,a as C,k as f,u as N,c as I,r as S,at as k,j as e,L as c}from"./index-SDeZWYlL.js";import{c as a}from"./TopSearches.module-B1l8CGlK.js";import{s as o}from"./Company.module-DRO5cVpv.js";const L=()=>{const d=P.get("token"),l=C(),p=f(),h=N(),{searchedCompanyInventory:u,pageSize:g,totalCount:y,loading:m,error:x}=I(s=>s.reports),j=new URLSearchParams(p.search),n=parseInt(j.get("id"))||"",t=parseInt(j.get("page"))||1,i=Math.ceil(y/g);console.log("Id: "+n),console.log("Page: "+t),console.log("Total pages: "+i),S.useEffect(()=>{l(k({token:d,id:n,page:t}))},[d,t,l]);const b=()=>{const s=t-1,r=`/reports/companyInventory?id=${n}&page=${s}`;h(r,{replace:!0})},v=()=>{const s=t+1,r=`/reports/companyInventory?id=${n}&page=${s}`;h(r,{replace:!0})};return m?e.jsx("p",{children:"Loading..."}):x?e.jsxs("p",{children:["Error: ",x.message]}):e.jsxs("div",{className:a.container,style:{margin:"1rem"},children:[e.jsx("div",{className:o.navTabs,children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(c,{to:"/reports/Company",children:"Company"})}),e.jsx("li",{children:e.jsx(c,{to:"/reports/sitewide",children:"Site Wide"})}),e.jsx("li",{children:e.jsx(c,{to:"/reports/email",children:"Email"})}),e.jsx("li",{children:e.jsx(c,{to:"/reports/serviceStats",children:"Stats"})})]})}),e.jsxs("div",{className:a.topSearches,children:[e.jsx("h3",{children:"Company Inventory"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"cart"}),e.jsx("th",{children:"Part/Model"}),e.jsx("th",{children:"Company"}),e.jsx("th",{children:"Cond"}),e.jsx("th",{children:"Price"}),e.jsx("th",{children:"Qty"}),e.jsx("th",{children:"Mfg"}),e.jsx("th",{children:"Age"}),e.jsx("th",{children:"Description/Notes"})]})}),e.jsx("tbody",{children:u.map((s,r)=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("input",{type:"checkbox",name:s.id,id:s.id})}),e.jsx("td",{children:s.partModel}),e.jsx("td",{children:s.addedBy.company.name}),e.jsx("td",{children:s.cond}),e.jsx("td",{children:s.price}),e.jsx("td",{children:s.quantity}),e.jsx("td",{children:s.mfg}),e.jsx("td",{children:s.age}),e.jsx("td",{children:s.productDescription})]},s.id))}),e.jsx("tfoot",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"cart"}),e.jsx("th",{children:"Part/Model"}),e.jsx("th",{children:"Company"}),e.jsx("th",{children:"Cond"}),e.jsx("th",{children:"Price"}),e.jsx("th",{children:"Qty"}),e.jsx("th",{children:"Mfg"}),e.jsx("th",{children:"Age"}),e.jsx("th",{children:"Description/Notes"})]})})]}),e.jsxs("div",{className:a.topSearchButtons,children:[e.jsx("button",{type:"button",className:o.basicButton,children:"Add To Part Cart"}),e.jsx("button",{type:"button",className:o.basicButton,children:"View Part Cart"})]})]}),e.jsxs("div",{className:a.tablePagination,children:[e.jsx("button",{type:"button",onClick:b,disabled:t===1,children:"⬅️"}),e.jsxs("span",{children:[t,"/",i]}),e.jsx("button",{type:"button",onClick:v,disabled:t===i,children:"➡️"})]})]})};export{L as default};