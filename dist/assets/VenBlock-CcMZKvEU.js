import{r as t,j as s}from"./index-SDeZWYlL.js";import{c as e}from"./Inventory.module-DIToDVM4.js";import{j}from"./tableData-Dg4l-e4e.js";import{d as o}from"./index-DF4zBA-v.js";import{q as m,m as v}from"./index-BgpzSwrX.js";import"./iconBase-DNWruYMs.js";const A=()=>{let[_,l]=t.useState(!0),[f,c]=t.useState(!1),[u,r]=t.useState(!1),[g,d]=t.useState(!1);const p=a=>{a.target.value==="company"?(l(!0),c(!1),r(!1),d(!1)):a.target.value==="show"?(l(!1),c(!0),r(!1),d(!1)):a.target.value==="country"?(l(!1),c(!1),r(!0),d(!1)):a.target.value==="state"&&(l(!1),c(!1),r(!1),d(!0))};return s.jsx(s.Fragment,{children:s.jsxs("div",{className:e.inventory,children:[s.jsxs("div",{className:e.vanBlock_vanLink,children:[s.jsx("a",{href:"/venprice",children:"Vendor Pricing"}),s.jsx("a",{href:"/venblock",children:"block inventory"})]}),s.jsx("div",{className:e.vanBlock_p,children:s.jsx("p",{children:"Block Inventory From Vendors"})}),s.jsxs("div",{className:e.vanBlock,children:[s.jsxs("div",{className:e.vanBlock_view,children:[s.jsx("h1",{children:"Inventory Blocking"}),s.jsxs("div",{children:[s.jsx("p",{children:"view by"}),s.jsxs("select",{onChange:p,children:[s.jsx("option",{value:"company",children:"Company"}),s.jsx("option",{value:"show",children:"Display"}),s.jsx("option",{value:"country",children:"Country"}),s.jsx("option",{value:"state",children:"State"})]})]})]}),s.jsxs("div",{className:e.vanBlockList,children:[_&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:e.vanBlockList_link,children:s.jsxs("div",{children:[s.jsx("a",{href:"##",children:"#"}),s.jsx("a",{href:"#A",children:"A"}),s.jsx("a",{href:"#B",children:"B"}),s.jsx("a",{href:"#C",children:"C"}),s.jsx("a",{href:"#D",children:"D"}),s.jsx("a",{href:"#E",children:"E"}),s.jsx("a",{href:"#F",children:"F"}),s.jsx("a",{href:"#G",children:"G"}),s.jsx("a",{href:"#H",children:"H"}),s.jsx("a",{href:"#I",children:"I"}),s.jsx("a",{href:"#J",children:"J"}),s.jsx("a",{href:"#K",children:"K"}),s.jsx("a",{href:"#L",children:"L"}),s.jsx("a",{href:"#M",children:"M"}),s.jsx("a",{href:"#N",children:"N"}),s.jsx("a",{href:"#O",children:"O"}),s.jsx("a",{href:"#P",children:"P"}),s.jsx("a",{href:"#Q",children:"Q"}),s.jsx("a",{href:"#R",children:"R"}),s.jsx("a",{href:"#S",children:"S"}),s.jsx("a",{href:"#T",children:"T"}),s.jsx("a",{href:"#U",children:"U"}),s.jsx("a",{href:"#V",children:"V"}),s.jsx("a",{href:"#W",children:"W"}),s.jsx("a",{href:"#X",children:"X"}),s.jsx("a",{href:"#Y",children:"Y"}),s.jsx("a",{href:"#Z",children:"Z"})]})}),s.jsx("div",{className:e.vanBlockList_company,children:j.map((a,h)=>{const n=Object.keys(a)[0],x=a[n];return s.jsxs("div",{className:e.vanBlockList_company_name,children:[s.jsx("a",{name:n.split(" ")[1],children:s.jsxs("h2",{children:[n.split(" ")[0],":"," ",n.split(" ")[1]]})}),s.jsx("div",{className:e.vanBlockList_company_name_list,children:x.map((i,k)=>s.jsxs("div",{className:e.vanBlockList_company_name_list_specified,children:[s.jsxs("div",{className:e.vanBlockList_company_name_list_specified_main,children:[s.jsxs("div",{className:e.vanBlockList_company_name_list_specified_img,children:[s.jsx("img",{src:i.img,alt:"company logo"}),s.jsxs("span",{children:[s.jsx(o,{}),s.jsx("p",{children:i.name}),s.jsx(m,{})]})]}),s.jsxs("div",{className:e.vanBlockList_company_name_list_specified_desc,children:[s.jsxs("div",{children:[s.jsxs("div",{children:[s.jsx("strong",{children:i.name}),s.jsx("p",{children:i.address})]}),s.jsxs("p",{children:[s.jsx("strong",{children:"phone: "}),i.phone]})]}),s.jsx("p",{children:i.description})]})]}),s.jsxs("div",{className:e.vanBlockList_company_name_list_specified_feedback,children:[s.jsx("img",{src:i.feedbackImg,alt:"feedback"}),s.jsxs("span",{children:[s.jsxs("p",{children:[i.ratingCount[0],"%"]}),s.jsxs("p",{children:["(",i.ratingCount[1],")"]})]}),s.jsx("p",{children:i.ratingMember})]}),s.jsx("div",{className:e.vanBlockList_company_name_list_specified_add,children:s.jsx(v,{})})]},i.name))})]},h)})})]}),f&&s.jsxs("div",{className:e.vanBlockList_company_display,children:[s.jsx("h1",{children:"Display: Normal"}),j.map((a,h)=>{const n=Object.keys(a)[0],x=a[n];return s.jsx("div",{className:e.vanBlockList_company_name,children:s.jsx("div",{className:e.vanBlockList_company_name_list,children:x.map((i,k)=>s.jsxs("div",{className:e.vanBlockList_company_name_list_specified,children:[s.jsxs("div",{className:e.vanBlockList_company_name_list_specified_main,children:[s.jsxs("div",{className:e.vanBlockList_company_name_list_specified_img,children:[s.jsx("img",{src:i.img,alt:"company logo"}),s.jsxs("span",{children:[s.jsx(o,{}),s.jsx("p",{children:i.name}),s.jsx(m,{})]})]}),s.jsxs("div",{className:e.vanBlockList_company_name_list_specified_desc,children:[s.jsxs("div",{children:[s.jsxs("div",{children:[s.jsx("strong",{children:i.name}),s.jsx("p",{children:i.address})]}),s.jsxs("p",{children:[s.jsx("strong",{children:"phone: "}),i.phone]})]}),s.jsx("p",{children:i.description})]})]}),s.jsxs("div",{className:e.vanBlockList_company_name_list_specified_feedback,children:[s.jsx("img",{src:i.feedbackImg,alt:"feedback"}),s.jsxs("span",{children:[s.jsxs("p",{children:[i.ratingCount[0],"%"]}),s.jsxs("p",{children:["(",i.ratingCount[1],")"]})]}),s.jsx("p",{children:i.ratingMember})]}),s.jsx("div",{className:e.vanBlockList_company_name_list_specified_add,children:s.jsx(v,{})})]},i.name))})},h)})]})]})]})]})})};export{A as default};
