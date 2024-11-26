import{r as h,j as t}from"./index-SDeZWYlL.js";import{a as L}from"./index-CJjz7ulA.js";import{b as d,c as m,o as b,d as v}from"./tableData-Dg4l-e4e.js";import"./iconBase-DNWruYMs.js";const g="_mainLayout_13atx_9",f="_cartListLayout_13atx_23",N="_cartList_13atx_23",P="_cartList_list_13atx_1",C="_cartList_list_btn_13atx_1",S="_cartList_key_details_13atx_1",k="_cartList_key_details_pp_13atx_1",B="_cartList_action_13atx_1",w="_cartList_action_select_13atx_1",M="_cartList_parts_scroll_13atx_1",T="_cartLay_13atx_177",R="_cartLayout_13atx_183",F="_cartLayout_options_13atx_1",A="_cartLayout_filter_13atx_1",O="_cartLayout_info_13atx_1",V="_cartLayout_info_btn_13atx_1",e={mainLayout:g,cartListLayout:f,cartList:N,cartList_list:P,cartList_list_btn:C,cartList_key_details:S,cartList_key_details_pp:k,cartList_action:B,cartList_action_select:w,cartList_parts_scroll:M,cartLay:T,cartLayout:R,cartLayout_options:F,cartLayout_filter:A,cartLayout_info:O,cartLayout_info_btn:V},Q="_accordion_1boz8_1",z="_accordionPanel_1boz8_17",D="_accordionTrigger_1boz8_43",E="_accordionBtnToggle_1boz8_83",$="_accordionContent_1boz8_99",n={accordion:Q,accordionPanel:z,accordionTrigger:D,accordionBtnToggle:E,accordionContent:$},H=({panels:s,organizedByCountryAndCompany:i})=>{const[r,x]=h.useState(null),j=o=>{x(r===o?null:o)};return t.jsx("div",{className:n.accordion,children:s.map((o,a)=>t.jsxs("div",{className:n.accordionPanel,children:[t.jsx("h2",{id:`panel${a+1}-title`,children:t.jsxs("button",{className:n.accordionTrigger,"aria-controls":`panel${a+1}-content`,onClick:()=>j(a),children:[o.title,t.jsx(L,{className:n.accordionBtnToggle,"aria-expanded":r===a})]})}),t.jsx("div",{className:n.accordionContent,role:"region","aria-labelledby":`panel${a+1}-title`,"aria-hidden":r!==a,id:`panel${a+1}-content`,children:t.jsxs("div",{children:[t.jsx("button",{type:"button",children:"check All"}),t.jsx("button",{type:"button",children:"remove All"}),t.jsxs("table",{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"cart"}),t.jsx("th",{children:"company"}),t.jsx("th",{children:"part#"}),t.jsx("th",{children:"mfg"}),t.jsx("th",{children:"cond"}),t.jsx("th",{children:"price"}),t.jsx("th",{children:"qty"}),t.jsx("th",{children:"age"}),t.jsx("th",{children:"description"})]})}),t.jsx("tbody",{children:Object.entries(i).map(([q,_])=>Object.entries(_).map(([u,p])=>p.map((c,y)=>t.jsxs("tr",{children:[t.jsx("td",{children:t.jsx("input",{type:"checkbox",name:"addToCart",id:"addToCart"})}),t.jsx("td",{children:u}),t.jsx("td",{children:c.model}),t.jsx("td",{children:c.mfg}),t.jsx("td",{children:c.cond}),t.jsx("td",{children:c.price.toFixed(2)}),t.jsx("td",{children:c.quantity}),t.jsx("td",{children:c.age}),t.jsx("td",{children:c.description})]},y))))})]}),t.jsx("button",{type:"button",children:"expand all"})]})})]},a))})},U=()=>{const[s,i]=h.useState(!0);return t.jsxs("div",{children:[t.jsx("button",{type:"button",className:e.cartLayout_info_btn,onClick:()=>i(r=>!r),children:"learn more"}),s&&t.jsxs("div",{className:e.cartLayout_info,children:[t.jsx("strong",{children:"What is the Part Cart / BOM Utility?"}),t.jsx("p",{children:"The Part Cart / BOM Utility is a Search Summary/ System Configuration Utility."}),t.jsx("strong",{children:"How to use the Part Cart?"}),t.jsxs("ol",{children:[t.jsx("li",{children:"1. Enter Part Number(s) in standard Product Search."}),t.jsx("li",{children:"2. Select (use check box) items of interest, click Add."}),t.jsx("li",{children:"3. View, modify, send RFQs or export Parts List Or Search and load more items!"})]}),t.jsx("strong",{children:"How to use the BOM Utility"}),t.jsxs("ol",{children:[t.jsx("li",{children:"1. Enter Part Number(s) in multi-search or load BOM list."}),t.jsx("li",{children:"2. Select headings, filter, then process."}),t.jsx("li",{children:"3. View, modify, send RFQs or export Parts List Or Search and load more items!"})]})]})]})},l=()=>t.jsxs("svg",{viewBox:"0 -0.5 25 25",fill:"none",children:[t.jsx("g",{id:"SVGRepo_bgCarrier"}),t.jsx("g",{id:"SVGRepo_tracerCarrier"}),t.jsx("g",{id:"SVGRepo_iconCarrier",children:t.jsx("path",{d:"M5.5 12.5L10.167 17L19.5 8",stroke:"#000000"})})]}),K=()=>t.jsx(t.Fragment,{children:t.jsxs("div",{className:e.mainLayout,children:[t.jsxs("div",{className:e.cartListLayout,children:[t.jsx("a",{href:"#",children:"part list"}),t.jsx("a",{href:"#",children:"Saved list(s)"}),t.jsxs("div",{className:e.cartList,children:[t.jsxs("div",{className:e.cartList_list,children:[t.jsx("h1",{children:"Part List (110 items listed)"}),t.jsxs("span",{className:e.cartList_list_btn,children:[t.jsx("button",{type:"button",children:"PDF"}),t.jsx("button",{type:"button",children:"save"})]})]}),t.jsxs("div",{className:e.cartList_key,children:[t.jsx("h1",{children:"key"}),t.jsxs("div",{className:e.cartList_key_details,children:[t.jsxs("div",{children:[t.jsxs("div",{children:[t.jsx(l,{}),"RFQ sent"]}),t.jsx("span",{children:"(0)"})]}),t.jsxs("div",{children:[t.jsxs("div",{children:[t.jsx(l,{}),"broadcast sent"]}),t.jsx("span",{children:"(0)"})]}),t.jsxs("div",{children:[t.jsxs("div",{children:[t.jsx(l,{}),"action needed"]}),t.jsx("span",{children:"(110)"})]})]}),t.jsx("div",{className:e.cartList_key_details_pp,children:"Problem Parts"})]}),t.jsx("h1",{children:"action"}),t.jsxs("div",{className:e.cartList_action,children:[t.jsx("p",{children:"with selected"}),t.jsxs("select",{className:e.cartList_action_select,children:[t.jsx("option",{value:"",defaultValue:"Choose an action",children:"Choose an action"}),t.jsx("option",{value:"newbom",children:"New BOM"}),t.jsx("option",{value:"partsearch",children:"Part# Search"}),t.jsx("option",{value:"remove",children:"Remove Selected"}),t.jsx("option",{value:"onlythese",children:"Remove Non-Selected"})]})]}),t.jsxs("div",{className:e.cartList_parts,children:[t.jsx("h1",{children:"parts"}),t.jsx("div",{className:e.cartList_parts_scroll,children:t.jsxs("table",{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Part#"}),t.jsx("th",{children:"Mfg"}),t.jsx("th",{children:"Cond"}),t.jsx("th",{children:"Qty"}),t.jsx("th",{children:"Age"})]})}),t.jsx("tbody",{children:d.map((s,i)=>t.jsxs("tr",{className:"tableData",children:[t.jsxs("td",{children:[t.jsx("input",{type:"checkbox",name:"addToCart",id:"addToCart"}),s.model]}),t.jsx("td",{children:s.mfg}),t.jsx("td",{children:s.cond}),t.jsx("td",{children:s.quantity}),t.jsx("td",{children:s.age})]},i))})]})})]}),t.jsx("h1",{children:"action"}),t.jsxs("div",{className:e.cartList_action,children:[t.jsx("p",{children:"with selected"}),t.jsxs("select",{className:e.cartList_action_select,children:[t.jsx("option",{value:"",defaultValue:"Choose an action",children:"Choose an action"}),t.jsx("option",{value:"newbom",children:"New BOM"}),t.jsx("option",{value:"partsearch",children:"Part# Search"}),t.jsx("option",{value:"remove",children:"Remove Selected"}),t.jsx("option",{value:"onlythese",children:"Remove Non-Selected"})]})]}),t.jsx("div",{className:e.cartList_action})]})]}),t.jsxs("div",{className:e.cartLay,children:[t.jsxs("div",{className:e.cartLayout,children:[t.jsxs("div",{className:e.cartLayout_options,children:[t.jsx("button",{type:"button",children:"remove"}),t.jsx("button",{type:"button",children:"create RQF"}),t.jsx("button",{type:"button",children:"add note"}),t.jsxs("div",{className:e.cartLayout_filter,children:[t.jsx("h1",{children:" Filter By:"}),t.jsxs("select",{children:[t.jsx("option",{value:"cnt_DESC",defaultValue:"Max Parts",children:"Max Parts"}),t.jsx("option",{value:"cnt_ASC",children:"Min Parts"}),t.jsx("option",{value:"shield",children:"Shield of Quality"}),t.jsx("option",{value:"bestmatch",children:"** Best Match"}),t.jsx("option",{value:"maxprice",children:"Highest Price"}),t.jsx("option",{value:"lowestprice",children:"Lowest Price"})]})]}),t.jsx("button",{type:"button",children:"PDF"}),t.jsx("button",{type:"button",children:"export"}),t.jsx("button",{type:"button",children:"clear all"})]}),t.jsx(H,{panels:m,partList:d,organizedByCountry:b,organizedByCountryAndCompany:v}),t.jsxs("div",{className:e.cartLayout_options,children:[t.jsx("button",{type:"button",children:"remove"}),t.jsx("button",{type:"button",children:"create RQF"}),t.jsx("button",{type:"button",children:"add note"}),t.jsxs("div",{className:e.cartLayout_filter,children:[t.jsx("h1",{children:" Filter By:"}),t.jsxs("select",{children:[t.jsx("option",{value:"cnt_DESC",defaultValue:"Max Parts",children:"Max Parts"}),t.jsx("option",{value:"cnt_ASC",children:"Min Parts"}),t.jsx("option",{value:"shield",children:"Shield of Quality"}),t.jsx("option",{value:"bestmatch",children:"** Best Match"}),t.jsx("option",{value:"maxprice",children:"Highest Price"}),t.jsx("option",{value:"lowestprice",children:"Lowest Price"})]})]}),t.jsx("button",{type:"button",children:"PDF"}),t.jsx("button",{type:"button",children:"export"}),t.jsx("button",{type:"button",children:"clear all"})]})]}),t.jsx(U,{})]})]})});export{K as default};
