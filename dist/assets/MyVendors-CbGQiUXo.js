import{b as k,r as t,a as L,c as A,al as F,j as s,am as I,an as B,ao as E,N as u,L as a,ap as R,aq as T}from"./index-SDeZWYlL.js";import{m as j}from"./MyProfile.module-Cdgpf7Z5.js";import{c as n}from"./MyVendors.module-BQPwKHZR.js";import{j as D}from"./tableData-Dg4l-e4e.js";import{d as w}from"./index-DF4zBA-v.js";import{q as C,s as M}from"./index-BgpzSwrX.js";import{n as H}from"./index-CbKpetUx.js";import{G as O}from"./iconBase-DNWruYMs.js";const P=()=>{const d=k.get("token"),[m,x]=t.useState(""),[_,c]=t.useState(!1),y=t.useRef(),h=t.useRef(),p=L(),{searchMyVendor:o,myVendor:f}=A(r=>r.toolsStore);function N(r,l){let i;return(...b)=>{clearTimeout(i),i=setTimeout(()=>r(...b),l)}}const v=N(r=>{r&&p(B({search:r,token:d}))},500);t.useEffect(()=>{m?v(m):p(F())},[m,p,d]),t.useEffect(()=>{const r=l=>{y.current&&!y.current.contains(l.target)&&h.current&&!h.current.contains(l.target)&&c(!1)};return document.addEventListener("mousedown",r),()=>document.removeEventListener("mousedown",r)},[]);const V=r=>{const l=r.target.value;x(l),c(!0)},S=r=>{const l={company_id:r.id};p(I({companyId:l,token:d})),x(r.name),c(!1)},e=()=>c(!0),g=()=>{setTimeout(()=>c(!1),200)};return s.jsxs(s.Fragment,{children:[s.jsx("span",{children:s.jsx("label",{htmlFor:"company",children:"Quick Add:"})}),s.jsx("br",{}),s.jsxs("span",{ref:y,children:[s.jsx("input",{type:"search",name:"company",id:"company",value:m,onChange:V,onFocus:e,onBlur:g,required:!0}),s.jsx("div",{className:n.compnaySearch,ref:h,children:_&&s.jsx("ul",{children:(o==null?void 0:o.length)>0?o.map(r=>s.jsxs("li",{onClick:()=>S(r),className:n.companyItem,children:[s.jsx("p",{children:r.name}),r.region&&r.region&&s.jsxs("p",{children:[s.jsxs("span",{children:[r.region,","]}),s.jsx("span",{children:r.country})]})]},r.id)):s.jsx("li",{children:"No results found"},"no-results")})})]})]})};function q(d){return O({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"g",attr:{id:"Square_Remove"},child:[{tag:"g",attr:{},child:[{tag:"path",attr:{d:"M18.437,20.937H5.563a2.5,2.5,0,0,1-2.5-2.5V5.563a2.5,2.5,0,0,1,2.5-2.5H18.437a2.5,2.5,0,0,1,2.5,2.5V18.437A2.5,2.5,0,0,1,18.437,20.937ZM5.563,4.063a1.5,1.5,0,0,0-1.5,1.5V18.437a1.5,1.5,0,0,0,1.5,1.5H18.437a1.5,1.5,0,0,0,1.5-1.5V5.563a1.5,1.5,0,0,0-1.5-1.5Z"},child:[]},{tag:"path",attr:{d:"M13.767,14.477a.5.5,0,0,0,.71-.71L12.707,12l1.77-1.77a.5.5,0,0,0-.71-.7L12,11.3l-1.77-1.77a.5.5,0,0,0-.7.7c.59.59,1.17,1.18,1.77,1.77l-1.77,1.77c-.46.45.25,1.16.7.71L12,12.707Z"},child:[]}]}]}]})(d)}const Y=()=>{const d=k.get("token");let[m,x]=t.useState(!1),[_,c]=t.useState(!0),[y,h]=t.useState(!1),[p,o]=t.useState(!1);const{myVendor:f,loading:N}=A(e=>e.toolsStore),v=L(),V=e=>{e.target.value==="company"?(x(!0),c(!1),h(!1),o(!1)):e.target.value==="show"?(x(!1),c(!0),h(!1),o(!1)):e.target.value==="country"?(x(!1),c(!1),h(!0),o(!1)):e.target.value==="state"&&(x(!1),c(!1),h(!1),o(!0))},S=e=>{v(T({companyId:{company_id:e},token:d}))};return t.useEffect(()=>{v(E({token:d}))},[]),N?s.jsx("p",{children:"Loading..."}):s.jsx(s.Fragment,{children:s.jsxs("div",{className:n.inventory,children:[s.jsx("div",{className:n.vendor_vanLink,children:s.jsx("div",{className:j.profileInfo_links,children:s.jsxs("ul",{children:[s.jsx("li",{children:s.jsx(u,{to:"/myprofile",end:!0,className:({isActive:e})=>e?j.active:"",children:s.jsx("span",{children:"Personal Info"})})}),s.jsx("li",{children:s.jsx(u,{to:"/myprofile/Options",className:({isActive:e})=>e?j.active:"",children:s.jsx("span",{children:"Options"})})}),s.jsx("li",{children:s.jsx(u,{to:"/myprofile/MyVendors",className:({isActive:e})=>e?j.active:"",children:s.jsx("span",{children:"My Vendors"})})}),s.jsx("li",{children:s.jsx(u,{to:"/myprofile/MyContact",className:({isActive:e})=>e?j.active:"",children:s.jsx("span",{children:"My Contacts"})})}),s.jsx("li",{children:s.jsx(u,{to:"/myprofile/broadcastfilter",className:({isActive:e})=>e?j.active:"",children:s.jsx("span",{children:"Broadcast Filters"})})})]})})}),s.jsx("div",{className:n.vendor_p,children:s.jsx("p",{children:"My Vendors"})}),s.jsxs("div",{className:n.vendor,children:[s.jsxs("div",{className:n.vendor_view,children:[s.jsx("div",{className:n.searchVendor,children:s.jsx("div",{className:n.searchVendor_search,children:s.jsx(P,{})})}),s.jsxs("div",{children:[s.jsx("p",{children:"view by"}),s.jsxs("select",{onChange:V,children:[s.jsx("option",{value:"show",children:"Display"}),s.jsx("option",{value:"company",children:"Company"}),s.jsx("option",{value:"country",children:"Country"}),s.jsx("option",{value:"state",children:"State"})]})]})]}),s.jsxs("div",{className:n.myVendor,children:[m&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:n.myVendor_link,children:s.jsxs("div",{children:[s.jsx(a,{to:"##",children:"#"}),s.jsx(a,{to:"#A",children:"A"}),s.jsx(a,{to:"#B",children:"B"}),s.jsx(a,{to:"#C",children:"C"}),s.jsx(a,{to:"#D",children:"D"}),s.jsx(a,{to:"#E",children:"E"}),s.jsx(a,{to:"#F",children:"F"}),s.jsx(a,{to:"#G",children:"G"}),s.jsx(a,{to:"#H",children:"H"}),s.jsx(a,{to:"#I",children:"I"}),s.jsx(a,{to:"#J",children:"J"}),s.jsx(a,{to:"#K",children:"K"}),s.jsx(a,{to:"#L",children:"L"}),s.jsx(a,{to:"#M",children:"M"}),s.jsx(a,{to:"#N",children:"N"}),s.jsx(a,{to:"#O",children:"O"}),s.jsx(a,{to:"#P",children:"P"}),s.jsx(a,{to:"#Q",children:"Q"}),s.jsx(a,{to:"#R",children:"R"}),s.jsx(a,{to:"#S",children:"S"}),s.jsx(a,{to:"#T",children:"T"}),s.jsx(a,{to:"#U",children:"U"}),s.jsx(a,{to:"#V",children:"V"}),s.jsx(a,{to:"#W",children:"W"}),s.jsx(a,{to:"#X",children:"X"}),s.jsx(a,{to:"#Y",children:"Y"}),s.jsx(a,{to:"#Z",children:"Z"})]})}),s.jsx("div",{className:n.myVendor_company,children:f==null?void 0:f.map(e=>s.jsx("div",{className:n.myVendor_company_list,children:s.jsxs("div",{className:n.myVendor_company_list_main,children:[s.jsxs("div",{className:n.myVendor_company_list_main_img,children:[s.jsx("img",{src:e.company.image,alt:"vendor logo"}),s.jsxs("span",{children:[s.jsx(w,{}),s.jsx("p",{children:e.company.name}),s.jsx(C,{})]})]}),s.jsxs("div",{className:n.myVendor_company_list_main_info,children:[s.jsxs("span",{children:[s.jsx("strong",{children:"company:"}),s.jsx("p",{children:e.company.name})]}),s.jsxs("span",{children:[s.jsx("strong",{children:"fax:"}),s.jsx("p",{children:e.company.phone_num})]}),s.jsxs("span",{children:[s.jsx("strong",{children:"phone:"}),s.jsx("p",{children:e.company.phone_num})]}),s.jsxs("span",{children:[s.jsx("strong",{children:"hours:"}),s.jsxs("p",{children:[e.company.open_timing," to"," ",e.company.close]})]}),s.jsxs("span",{children:[s.jsx("strong",{children:"ship by:"}),s.jsx("p",{children:"4pm"})]}),s.jsxs("span",{children:[s.jsx("strong",{children:"location:"}),s.jsx("p",{children:e.company.address})]})]}),s.jsxs("div",{className:n.myVendor_company_list_main_display,children:[s.jsx(H,{}),s.jsx("button",{type:"button",children:"never"})]}),s.jsxs("div",{className:n.myVendor_company_list_main_notes,children:[s.jsx("span",{children:s.jsx("strong",{children:"Notes:"})}),s.jsx("span",{children:s.jsx("textarea",{name:"notes",id:"notes",cols:10,rows:6})}),s.jsx("span",{children:s.jsx("button",{type:"button",children:"save"})})]}),s.jsxs("div",{className:n.myVendor_company_list_main_actions,children:[s.jsx(M,{}),s.jsx(q,{onClick:()=>S(e.company.id)})]})]})},e.company.id))})]}),_&&s.jsxs("div",{className:n.myVendor_company_display,children:[s.jsx("h1",{children:"Display: Normal"}),D.map((e,g)=>{const r=Object.keys(e)[0],l=e[r];return s.jsx("div",{className:n.myVendor_company_name,children:s.jsx("div",{className:n.myVendor_company_name_list,children:l.map((i,b)=>s.jsxs("section",{className:n.companyCard,children:[s.jsxs("div",{className:n.companyInfo,children:[s.jsxs("div",{className:n.companyLogo,children:[s.jsx("img",{src:i.img,alt:"company logo"}),s.jsxs("span",{style:{display:"flex",gap:"5px"},children:[s.jsx(w,{}),s.jsx("p",{children:i.name}),s.jsx(C,{})]})]}),s.jsxs("div",{className:n.companyDetails,children:[s.jsx("strong",{children:i.name}),s.jsx("p",{children:i.address}),s.jsxs("p",{children:[s.jsx("strong",{children:"Phone: "}),i.phone]}),s.jsxs("div",{className:n.myVendor_company_name_list_specified_feedback,children:[s.jsx("img",{src:i.feedbackImg,alt:"feedback"}),s.jsxs("span",{children:[s.jsxs("p",{children:[i.ratingCount[0],"%"]}),s.jsxs("p",{children:["(",i.ratingCount[1],")"]})]}),s.jsx("p",{children:i.ratingMember})]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Fax: "}),i.fax]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Hours: "}),i.hours]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Ship By: "}),i.shipBy]}),s.jsx("div",{className:n.rating,children:s.jsx("p",{children:i.membership})})]})]}),s.jsx("div",{className:n.companySec,children:s.jsxs("div",{className:n.companyAction,children:[s.jsx("img",{src:R,alt:"vendorIcon",srcset:"",style:{width:"30px"}}),s.jsx("button",{type:"button",className:n.firstButton,children:"First"})]})}),s.jsxs("div",{className:n.companyNotes,children:[s.jsx("label",{htmlFor:"notes",children:"My Notes:"}),s.jsx("textarea",{id:"notes",name:"notes",rows:"5",placeholder:"Enter your personal notes about this vendor here."}),s.jsx("button",{type:"button",className:n.saveButton,children:"Save"}),s.jsx(M,{})]})]}))})},g)})]})]})]})]})})};export{Y as default};
