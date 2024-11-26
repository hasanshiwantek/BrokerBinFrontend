import{ah as commonjsGlobal,r as reactExports,j as jsxRuntimeExports}from"./index-SDeZWYlL.js";import{d as css,M as MapContainer,T as TileLayer}from"./Map.module-Ke-45zeV.js";var dist={exports:{}},jquery={exports:{}};/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */var hasRequiredJquery;function requireJquery(){return hasRequiredJquery||(hasRequiredJquery=1,function(W){(function(w,J){W.exports=w.document?J(w,!0):function(Q){if(!Q.document)throw new Error("jQuery requires a window with a document");return J(Q)}})(typeof window<"u"?window:commonjsGlobal,function(w,J){var Q=[],$e=Object.getPrototypeOf,ne=Q.slice,Un=Q.flat?function(e){return Q.flat.call(e)}:function(e){return Q.concat.apply([],e)},en=Q.push,fe=Q.indexOf,nn={},Nn=nn.toString,Ne=nn.hasOwnProperty,Wn=Ne.toString,Dt=Wn.call(Object),B={},I=function(n){return typeof n=="function"&&typeof n.nodeType!="number"&&typeof n.item!="function"},Se=function(n){return n!=null&&n===n.window},D=w.document,Bt={type:!0,src:!0,nonce:!0,noModule:!0};function Vn(e,n,t){t=t||D;var r,a,s=t.createElement("script");if(s.text=e,n)for(r in Bt)a=n[r]||n.getAttribute&&n.getAttribute(r),a&&s.setAttribute(r,a);t.head.appendChild(s).parentNode.removeChild(s)}function je(e){return e==null?e+"":typeof e=="object"||typeof e=="function"?nn[Nn.call(e)]||"object":typeof e}var Kn="3.7.1",It=/HTML$/i,i=function(e,n){return new i.fn.init(e,n)};i.fn=i.prototype={jquery:Kn,constructor:i,length:0,toArray:function(){return ne.call(this)},get:function(e){return e==null?ne.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var n=i.merge(this.constructor(),e);return n.prevObject=this,n},each:function(e){return i.each(this,e)},map:function(e){return this.pushStack(i.map(this,function(n,t){return e.call(n,t,n)}))},slice:function(){return this.pushStack(ne.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(i.grep(this,function(e,n){return(n+1)%2}))},odd:function(){return this.pushStack(i.grep(this,function(e,n){return n%2}))},eq:function(e){var n=this.length,t=+e+(e<0?n:0);return this.pushStack(t>=0&&t<n?[this[t]]:[])},end:function(){return this.prevObject||this.constructor()},push:en,sort:Q.sort,splice:Q.splice},i.extend=i.fn.extend=function(){var e,n,t,r,a,s,o=arguments[0]||{},c=1,u=arguments.length,d=!1;for(typeof o=="boolean"&&(d=o,o=arguments[c]||{},c++),typeof o!="object"&&!I(o)&&(o={}),c===u&&(o=this,c--);c<u;c++)if((e=arguments[c])!=null)for(n in e)r=e[n],!(n==="__proto__"||o===r)&&(d&&r&&(i.isPlainObject(r)||(a=Array.isArray(r)))?(t=o[n],a&&!Array.isArray(t)?s=[]:!a&&!i.isPlainObject(t)?s={}:s=t,a=!1,o[n]=i.extend(d,s,r)):r!==void 0&&(o[n]=r));return o},i.extend({expando:"jQuery"+(Kn+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var n,t;return!e||Nn.call(e)!=="[object Object]"?!1:(n=$e(e),n?(t=Ne.call(n,"constructor")&&n.constructor,typeof t=="function"&&Wn.call(t)===Dt):!0)},isEmptyObject:function(e){var n;for(n in e)return!1;return!0},globalEval:function(e,n,t){Vn(e,{nonce:n&&n.nonce},t)},each:function(e,n){var t,r=0;if(fn(e))for(t=e.length;r<t&&n.call(e[r],r,e[r])!==!1;r++);else for(r in e)if(n.call(e[r],r,e[r])===!1)break;return e},text:function(e){var n,t="",r=0,a=e.nodeType;if(!a)for(;n=e[r++];)t+=i.text(n);return a===1||a===11?e.textContent:a===9?e.documentElement.textContent:a===3||a===4?e.nodeValue:t},makeArray:function(e,n){var t=n||[];return e!=null&&(fn(Object(e))?i.merge(t,typeof e=="string"?[e]:e):en.call(t,e)),t},inArray:function(e,n,t){return n==null?-1:fe.call(n,e,t)},isXMLDoc:function(e){var n=e&&e.namespaceURI,t=e&&(e.ownerDocument||e).documentElement;return!It.test(n||t&&t.nodeName||"HTML")},merge:function(e,n){for(var t=+n.length,r=0,a=e.length;r<t;r++)e[a++]=n[r];return e.length=a,e},grep:function(e,n,t){for(var r,a=[],s=0,o=e.length,c=!t;s<o;s++)r=!n(e[s],s),r!==c&&a.push(e[s]);return a},map:function(e,n,t){var r,a,s=0,o=[];if(fn(e))for(r=e.length;s<r;s++)a=n(e[s],s,t),a!=null&&o.push(a);else for(s in e)a=n(e[s],s,t),a!=null&&o.push(a);return Un(o)},guid:1,support:B}),typeof Symbol=="function"&&(i.fn[Symbol.iterator]=Q[Symbol.iterator]),i.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,n){nn["[object "+n+"]"]=n.toLowerCase()});function fn(e){var n=!!e&&"length"in e&&e.length,t=je(e);return I(e)||Se(e)?!1:t==="array"||n===0||typeof n=="number"&&n>0&&n-1 in e}function K(e,n){return e.nodeName&&e.nodeName.toLowerCase()===n.toLowerCase()}var Tt=Q.pop,Lt=Q.sort,Ot=Q.splice,N="[\\x20\\t\\r\\n\\f]",We=new RegExp("^"+N+"+|((?:^|[^\\\\])(?:\\\\.)*)"+N+"+$","g");i.contains=function(e,n){var t=n&&n.parentNode;return e===t||!!(t&&t.nodeType===1&&(e.contains?e.contains(t):e.compareDocumentPosition&&e.compareDocumentPosition(t)&16))};var Rt=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;function Pt(e,n){return n?e==="\0"?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e}i.escapeSelector=function(e){return(e+"").replace(Rt,Pt)};var me=D,mn=en;(function(){var e,n,t,r,a,s=mn,o,c,u,d,_,A=i.expando,f=0,v=0,S=cn(),P=cn(),T=cn(),Y=cn(),F=function(l,p){return l===p&&(a=!0),0},ue="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ce="(?:\\\\[\\da-fA-F]{1,6}"+N+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",R="\\["+N+"*("+ce+")(?:"+N+"*([*^$|!~]?=)"+N+`*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(`+ce+"))|)"+N+"*\\]",ke=":("+ce+`)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|`+R+")*)|.*)\\)|)",q=new RegExp(N+"+","g"),H=new RegExp("^"+N+"*,"+N+"*"),ze=new RegExp("^"+N+"*([>+~]|"+N+")"+N+"*"),In=new RegExp(N+"|>"),pe=new RegExp(ke),Xe=new RegExp("^"+ce+"$"),de={ID:new RegExp("^#("+ce+")"),CLASS:new RegExp("^\\.("+ce+")"),TAG:new RegExp("^("+ce+"|[*])"),ATTR:new RegExp("^"+R),PSEUDO:new RegExp("^"+ke),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+N+"*(even|odd|(([+-]|)(\\d*)n|)"+N+"*(?:([+-]|)"+N+"*(\\d+)|))"+N+"*\\)|)","i"),bool:new RegExp("^(?:"+ue+")$","i"),needsContext:new RegExp("^"+N+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+N+"*((?:-\\d)?\\d*)"+N+"*\\)|)(?=[^-]|$)","i")},ye=/^(?:input|select|textarea|button)$/i,be=/^h\d$/i,re=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Tn=/[+~]/,Ae=new RegExp("\\\\[\\da-fA-F]{1,6}"+N+"?|\\\\([^\\r\\n\\f])","g"),ve=function(l,p){var h="0x"+l.slice(1)-65536;return p||(h<0?String.fromCharCode(h+65536):String.fromCharCode(h>>10|55296,h&1023|56320))},Ir=function(){Ee()},Tr=dn(function(l){return l.disabled===!0&&K(l,"fieldset")},{dir:"parentNode",next:"legend"});function Lr(){try{return o.activeElement}catch{}}try{s.apply(Q=ne.call(me.childNodes),me.childNodes),Q[me.childNodes.length].nodeType}catch{s={apply:function(p,h){mn.apply(p,ne.call(h))},call:function(p){mn.apply(p,ne.call(arguments,1))}}}function U(l,p,h,m){var g,y,b,M,E,L,C,j=p&&p.ownerDocument,O=p?p.nodeType:9;if(h=h||[],typeof l!="string"||!l||O!==1&&O!==9&&O!==11)return h;if(!m&&(Ee(p),p=p||o,u)){if(O!==11&&(E=re.exec(l)))if(g=E[1]){if(O===9)if(b=p.getElementById(g)){if(b.id===g)return s.call(h,b),h}else return h;else if(j&&(b=j.getElementById(g))&&U.contains(p,b)&&b.id===g)return s.call(h,b),h}else{if(E[2])return s.apply(h,p.getElementsByTagName(l)),h;if((g=E[3])&&p.getElementsByClassName)return s.apply(h,p.getElementsByClassName(g)),h}if(!Y[l+" "]&&(!d||!d.test(l))){if(C=l,j=p,O===1&&(In.test(l)||ze.test(l))){for(j=Tn.test(l)&&Ln(p.parentNode)||p,(j!=p||!B.scope)&&((M=p.getAttribute("id"))?M=i.escapeSelector(M):p.setAttribute("id",M=A)),L=Ze(l),y=L.length;y--;)L[y]=(M?"#"+M:":scope")+" "+pn(L[y]);C=L.join(",")}try{return s.apply(h,j.querySelectorAll(C)),h}catch{Y(l,!0)}finally{M===A&&p.removeAttribute("id")}}}return jt(l.replace(We,"$1"),p,h,m)}function cn(){var l=[];function p(h,m){return l.push(h+" ")>n.cacheLength&&delete p[l.shift()],p[h+" "]=m}return p}function se(l){return l[A]=!0,l}function qe(l){var p=o.createElement("fieldset");try{return!!l(p)}catch{return!1}finally{p.parentNode&&p.parentNode.removeChild(p),p=null}}function Or(l){return function(p){return K(p,"input")&&p.type===l}}function Rr(l){return function(p){return(K(p,"input")||K(p,"button"))&&p.type===l}}function Ct(l){return function(p){return"form"in p?p.parentNode&&p.disabled===!1?"label"in p?"label"in p.parentNode?p.parentNode.disabled===l:p.disabled===l:p.isDisabled===l||p.isDisabled!==!l&&Tr(p)===l:p.disabled===l:"label"in p?p.disabled===l:!1}}function Ce(l){return se(function(p){return p=+p,se(function(h,m){for(var g,y=l([],h.length,p),b=y.length;b--;)h[g=y[b]]&&(h[g]=!(m[g]=h[g]))})})}function Ln(l){return l&&typeof l.getElementsByTagName<"u"&&l}function Ee(l){var p,h=l?l.ownerDocument||l:me;return h==o||h.nodeType!==9||!h.documentElement||(o=h,c=o.documentElement,u=!i.isXMLDoc(o),_=c.matches||c.webkitMatchesSelector||c.msMatchesSelector,c.msMatchesSelector&&me!=o&&(p=o.defaultView)&&p.top!==p&&p.addEventListener("unload",Ir),B.getById=qe(function(m){return c.appendChild(m).id=i.expando,!o.getElementsByName||!o.getElementsByName(i.expando).length}),B.disconnectedMatch=qe(function(m){return _.call(m,"*")}),B.scope=qe(function(){return o.querySelectorAll(":scope")}),B.cssHas=qe(function(){try{return o.querySelector(":has(*,:jqfake)"),!1}catch{return!0}}),B.getById?(n.filter.ID=function(m){var g=m.replace(Ae,ve);return function(y){return y.getAttribute("id")===g}},n.find.ID=function(m,g){if(typeof g.getElementById<"u"&&u){var y=g.getElementById(m);return y?[y]:[]}}):(n.filter.ID=function(m){var g=m.replace(Ae,ve);return function(y){var b=typeof y.getAttributeNode<"u"&&y.getAttributeNode("id");return b&&b.value===g}},n.find.ID=function(m,g){if(typeof g.getElementById<"u"&&u){var y,b,M,E=g.getElementById(m);if(E){if(y=E.getAttributeNode("id"),y&&y.value===m)return[E];for(M=g.getElementsByName(m),b=0;E=M[b++];)if(y=E.getAttributeNode("id"),y&&y.value===m)return[E]}return[]}}),n.find.TAG=function(m,g){return typeof g.getElementsByTagName<"u"?g.getElementsByTagName(m):g.querySelectorAll(m)},n.find.CLASS=function(m,g){if(typeof g.getElementsByClassName<"u"&&u)return g.getElementsByClassName(m)},d=[],qe(function(m){var g;c.appendChild(m).innerHTML="<a id='"+A+"' href='' disabled='disabled'></a><select id='"+A+"-\r\\' disabled='disabled'><option selected=''></option></select>",m.querySelectorAll("[selected]").length||d.push("\\["+N+"*(?:value|"+ue+")"),m.querySelectorAll("[id~="+A+"-]").length||d.push("~="),m.querySelectorAll("a#"+A+"+*").length||d.push(".#.+[+~]"),m.querySelectorAll(":checked").length||d.push(":checked"),g=o.createElement("input"),g.setAttribute("type","hidden"),m.appendChild(g).setAttribute("name","D"),c.appendChild(m).disabled=!0,m.querySelectorAll(":disabled").length!==2&&d.push(":enabled",":disabled"),g=o.createElement("input"),g.setAttribute("name",""),m.appendChild(g),m.querySelectorAll("[name='']").length||d.push("\\["+N+"*name"+N+"*="+N+`*(?:''|"")`)}),B.cssHas||d.push(":has"),d=d.length&&new RegExp(d.join("|")),F=function(m,g){if(m===g)return a=!0,0;var y=!m.compareDocumentPosition-!g.compareDocumentPosition;return y||(y=(m.ownerDocument||m)==(g.ownerDocument||g)?m.compareDocumentPosition(g):1,y&1||!B.sortDetached&&g.compareDocumentPosition(m)===y?m===o||m.ownerDocument==me&&U.contains(me,m)?-1:g===o||g.ownerDocument==me&&U.contains(me,g)?1:r?fe.call(r,m)-fe.call(r,g):0:y&4?-1:1)}),o}U.matches=function(l,p){return U(l,null,null,p)},U.matchesSelector=function(l,p){if(Ee(l),u&&!Y[p+" "]&&(!d||!d.test(p)))try{var h=_.call(l,p);if(h||B.disconnectedMatch||l.document&&l.document.nodeType!==11)return h}catch{Y(p,!0)}return U(p,o,null,[l]).length>0},U.contains=function(l,p){return(l.ownerDocument||l)!=o&&Ee(l),i.contains(l,p)},U.attr=function(l,p){(l.ownerDocument||l)!=o&&Ee(l);var h=n.attrHandle[p.toLowerCase()],m=h&&Ne.call(n.attrHandle,p.toLowerCase())?h(l,p,!u):void 0;return m!==void 0?m:l.getAttribute(p)},U.error=function(l){throw new Error("Syntax error, unrecognized expression: "+l)},i.uniqueSort=function(l){var p,h=[],m=0,g=0;if(a=!B.sortStable,r=!B.sortStable&&ne.call(l,0),Lt.call(l,F),a){for(;p=l[g++];)p===l[g]&&(m=h.push(g));for(;m--;)Ot.call(l,h[m],1)}return r=null,l},i.fn.uniqueSort=function(){return this.pushStack(i.uniqueSort(ne.apply(this)))},n=i.expr={cacheLength:50,createPseudo:se,match:de,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(l){return l[1]=l[1].replace(Ae,ve),l[3]=(l[3]||l[4]||l[5]||"").replace(Ae,ve),l[2]==="~="&&(l[3]=" "+l[3]+" "),l.slice(0,4)},CHILD:function(l){return l[1]=l[1].toLowerCase(),l[1].slice(0,3)==="nth"?(l[3]||U.error(l[0]),l[4]=+(l[4]?l[5]+(l[6]||1):2*(l[3]==="even"||l[3]==="odd")),l[5]=+(l[7]+l[8]||l[3]==="odd")):l[3]&&U.error(l[0]),l},PSEUDO:function(l){var p,h=!l[6]&&l[2];return de.CHILD.test(l[0])?null:(l[3]?l[2]=l[4]||l[5]||"":h&&pe.test(h)&&(p=Ze(h,!0))&&(p=h.indexOf(")",h.length-p)-h.length)&&(l[0]=l[0].slice(0,p),l[2]=h.slice(0,p)),l.slice(0,3))}},filter:{TAG:function(l){var p=l.replace(Ae,ve).toLowerCase();return l==="*"?function(){return!0}:function(h){return K(h,p)}},CLASS:function(l){var p=S[l+" "];return p||(p=new RegExp("(^|"+N+")"+l+"("+N+"|$)"))&&S(l,function(h){return p.test(typeof h.className=="string"&&h.className||typeof h.getAttribute<"u"&&h.getAttribute("class")||"")})},ATTR:function(l,p,h){return function(m){var g=U.attr(m,l);return g==null?p==="!=":p?(g+="",p==="="?g===h:p==="!="?g!==h:p==="^="?h&&g.indexOf(h)===0:p==="*="?h&&g.indexOf(h)>-1:p==="$="?h&&g.slice(-h.length)===h:p==="~="?(" "+g.replace(q," ")+" ").indexOf(h)>-1:p==="|="?g===h||g.slice(0,h.length+1)===h+"-":!1):!0}},CHILD:function(l,p,h,m,g){var y=l.slice(0,3)!=="nth",b=l.slice(-4)!=="last",M=p==="of-type";return m===1&&g===0?function(E){return!!E.parentNode}:function(E,L,C){var j,O,k,V,ee,G=y!==b?"nextSibling":"previousSibling",ie=E.parentNode,he=M&&E.nodeName.toLowerCase(),Ue=!C&&!M,z=!1;if(ie){if(y){for(;G;){for(k=E;k=k[G];)if(M?K(k,he):k.nodeType===1)return!1;ee=G=l==="only"&&!ee&&"nextSibling"}return!0}if(ee=[b?ie.firstChild:ie.lastChild],b&&Ue){for(O=ie[A]||(ie[A]={}),j=O[l]||[],V=j[0]===f&&j[1],z=V&&j[2],k=V&&ie.childNodes[V];k=++V&&k&&k[G]||(z=V=0)||ee.pop();)if(k.nodeType===1&&++z&&k===E){O[l]=[f,V,z];break}}else if(Ue&&(O=E[A]||(E[A]={}),j=O[l]||[],V=j[0]===f&&j[1],z=V),z===!1)for(;(k=++V&&k&&k[G]||(z=V=0)||ee.pop())&&!((M?K(k,he):k.nodeType===1)&&++z&&(Ue&&(O=k[A]||(k[A]={}),O[l]=[f,z]),k===E)););return z-=g,z===m||z%m===0&&z/m>=0}}},PSEUDO:function(l,p){var h,m=n.pseudos[l]||n.setFilters[l.toLowerCase()]||U.error("unsupported pseudo: "+l);return m[A]?m(p):m.length>1?(h=[l,l,"",p],n.setFilters.hasOwnProperty(l.toLowerCase())?se(function(g,y){for(var b,M=m(g,p),E=M.length;E--;)b=fe.call(g,M[E]),g[b]=!(y[b]=M[E])}):function(g){return m(g,0,h)}):m}},pseudos:{not:se(function(l){var p=[],h=[],m=qn(l.replace(We,"$1"));return m[A]?se(function(g,y,b,M){for(var E,L=m(g,null,M,[]),C=g.length;C--;)(E=L[C])&&(g[C]=!(y[C]=E))}):function(g,y,b){return p[0]=g,m(p,null,b,h),p[0]=null,!h.pop()}}),has:se(function(l){return function(p){return U(l,p).length>0}}),contains:se(function(l){return l=l.replace(Ae,ve),function(p){return(p.textContent||i.text(p)).indexOf(l)>-1}}),lang:se(function(l){return Xe.test(l||"")||U.error("unsupported lang: "+l),l=l.replace(Ae,ve).toLowerCase(),function(p){var h;do if(h=u?p.lang:p.getAttribute("xml:lang")||p.getAttribute("lang"))return h=h.toLowerCase(),h===l||h.indexOf(l+"-")===0;while((p=p.parentNode)&&p.nodeType===1);return!1}}),target:function(l){var p=w.location&&w.location.hash;return p&&p.slice(1)===l.id},root:function(l){return l===c},focus:function(l){return l===Lr()&&o.hasFocus()&&!!(l.type||l.href||~l.tabIndex)},enabled:Ct(!1),disabled:Ct(!0),checked:function(l){return K(l,"input")&&!!l.checked||K(l,"option")&&!!l.selected},selected:function(l){return l.parentNode&&l.parentNode.selectedIndex,l.selected===!0},empty:function(l){for(l=l.firstChild;l;l=l.nextSibling)if(l.nodeType<6)return!1;return!0},parent:function(l){return!n.pseudos.empty(l)},header:function(l){return be.test(l.nodeName)},input:function(l){return ye.test(l.nodeName)},button:function(l){return K(l,"input")&&l.type==="button"||K(l,"button")},text:function(l){var p;return K(l,"input")&&l.type==="text"&&((p=l.getAttribute("type"))==null||p.toLowerCase()==="text")},first:Ce(function(){return[0]}),last:Ce(function(l,p){return[p-1]}),eq:Ce(function(l,p,h){return[h<0?h+p:h]}),even:Ce(function(l,p){for(var h=0;h<p;h+=2)l.push(h);return l}),odd:Ce(function(l,p){for(var h=1;h<p;h+=2)l.push(h);return l}),lt:Ce(function(l,p,h){var m;for(h<0?m=h+p:h>p?m=p:m=h;--m>=0;)l.push(m);return l}),gt:Ce(function(l,p,h){for(var m=h<0?h+p:h;++m<p;)l.push(m);return l})}},n.pseudos.nth=n.pseudos.eq;for(e in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})n.pseudos[e]=Or(e);for(e in{submit:!0,reset:!0})n.pseudos[e]=Rr(e);function St(){}St.prototype=n.filters=n.pseudos,n.setFilters=new St;function Ze(l,p){var h,m,g,y,b,M,E,L=P[l+" "];if(L)return p?0:L.slice(0);for(b=l,M=[],E=n.preFilter;b;){(!h||(m=H.exec(b)))&&(m&&(b=b.slice(m[0].length)||b),M.push(g=[])),h=!1,(m=ze.exec(b))&&(h=m.shift(),g.push({value:h,type:m[0].replace(We," ")}),b=b.slice(h.length));for(y in n.filter)(m=de[y].exec(b))&&(!E[y]||(m=E[y](m)))&&(h=m.shift(),g.push({value:h,type:y,matches:m}),b=b.slice(h.length));if(!h)break}return p?b.length:b?U.error(l):P(l,M).slice(0)}function pn(l){for(var p=0,h=l.length,m="";p<h;p++)m+=l[p].value;return m}function dn(l,p,h){var m=p.dir,g=p.next,y=g||m,b=h&&y==="parentNode",M=v++;return p.first?function(E,L,C){for(;E=E[m];)if(E.nodeType===1||b)return l(E,L,C);return!1}:function(E,L,C){var j,O,k=[f,M];if(C){for(;E=E[m];)if((E.nodeType===1||b)&&l(E,L,C))return!0}else for(;E=E[m];)if(E.nodeType===1||b)if(O=E[A]||(E[A]={}),g&&K(E,g))E=E[m]||E;else{if((j=O[y])&&j[0]===f&&j[1]===M)return k[2]=j[2];if(O[y]=k,k[2]=l(E,L,C))return!0}return!1}}function On(l){return l.length>1?function(p,h,m){for(var g=l.length;g--;)if(!l[g](p,h,m))return!1;return!0}:l[0]}function Pr(l,p,h){for(var m=0,g=p.length;m<g;m++)U(l,p[m],h);return h}function hn(l,p,h,m,g){for(var y,b=[],M=0,E=l.length,L=p!=null;M<E;M++)(y=l[M])&&(!h||h(y,m,g))&&(b.push(y),L&&p.push(M));return b}function Rn(l,p,h,m,g,y){return m&&!m[A]&&(m=Rn(m)),g&&!g[A]&&(g=Rn(g,y)),se(function(b,M,E,L){var C,j,O,k,V=[],ee=[],G=M.length,ie=b||Pr(p||"*",E.nodeType?[E]:E,[]),he=l&&(b||!p)?hn(ie,V,l,E,L):ie;if(h?(k=g||(b?l:G||m)?[]:M,h(he,k,E,L)):k=he,m)for(C=hn(k,ee),m(C,[],E,L),j=C.length;j--;)(O=C[j])&&(k[ee[j]]=!(he[ee[j]]=O));if(b){if(g||l){if(g){for(C=[],j=k.length;j--;)(O=k[j])&&C.push(he[j]=O);g(null,k=[],C,L)}for(j=k.length;j--;)(O=k[j])&&(C=g?fe.call(b,O):V[j])>-1&&(b[C]=!(M[C]=O))}}else k=hn(k===M?k.splice(G,k.length):k),g?g(null,M,k,L):s.apply(M,k)})}function Pn(l){for(var p,h,m,g=l.length,y=n.relative[l[0].type],b=y||n.relative[" "],M=y?1:0,E=dn(function(j){return j===p},b,!0),L=dn(function(j){return fe.call(p,j)>-1},b,!0),C=[function(j,O,k){var V=!y&&(k||O!=t)||((p=O).nodeType?E(j,O,k):L(j,O,k));return p=null,V}];M<g;M++)if(h=n.relative[l[M].type])C=[dn(On(C),h)];else{if(h=n.filter[l[M].type].apply(null,l[M].matches),h[A]){for(m=++M;m<g&&!n.relative[l[m].type];m++);return Rn(M>1&&On(C),M>1&&pn(l.slice(0,M-1).concat({value:l[M-2].type===" "?"*":""})).replace(We,"$1"),h,M<m&&Pn(l.slice(M,m)),m<g&&Pn(l=l.slice(m)),m<g&&pn(l))}C.push(h)}return On(C)}function qr(l,p){var h=p.length>0,m=l.length>0,g=function(y,b,M,E,L){var C,j,O,k=0,V="0",ee=y&&[],G=[],ie=t,he=y||m&&n.find.TAG("*",L),Ue=f+=ie==null?1:Math.random()||.1,z=he.length;for(L&&(t=b==o||b||L);V!==z&&(C=he[V])!=null;V++){if(m&&C){for(j=0,!b&&C.ownerDocument!=o&&(Ee(C),M=!u);O=l[j++];)if(O(C,b||o,M)){s.call(E,C);break}L&&(f=Ue)}h&&((C=!O&&C)&&k--,y&&ee.push(C))}if(k+=V,h&&V!==k){for(j=0;O=p[j++];)O(ee,G,b,M);if(y){if(k>0)for(;V--;)ee[V]||G[V]||(G[V]=Tt.call(E));G=hn(G)}s.apply(E,G),L&&!y&&G.length>0&&k+p.length>1&&i.uniqueSort(E)}return L&&(f=Ue,t=ie),ee};return h?se(g):g}function qn(l,p){var h,m=[],g=[],y=T[l+" "];if(!y){for(p||(p=Ze(l)),h=p.length;h--;)y=Pn(p[h]),y[A]?m.push(y):g.push(y);y=T(l,qr(g,m)),y.selector=l}return y}function jt(l,p,h,m){var g,y,b,M,E,L=typeof l=="function"&&l,C=!m&&Ze(l=L.selector||l);if(h=h||[],C.length===1){if(y=C[0]=C[0].slice(0),y.length>2&&(b=y[0]).type==="ID"&&p.nodeType===9&&u&&n.relative[y[1].type]){if(p=(n.find.ID(b.matches[0].replace(Ae,ve),p)||[])[0],p)L&&(p=p.parentNode);else return h;l=l.slice(y.shift().value.length)}for(g=de.needsContext.test(l)?0:y.length;g--&&(b=y[g],!n.relative[M=b.type]);)if((E=n.find[M])&&(m=E(b.matches[0].replace(Ae,ve),Tn.test(y[0].type)&&Ln(p.parentNode)||p))){if(y.splice(g,1),l=m.length&&pn(y),!l)return s.apply(h,m),h;break}}return(L||qn(l,C))(m,p,!u,h,!p||Tn.test(l)&&Ln(p.parentNode)||p),h}B.sortStable=A.split("").sort(F).join("")===A,Ee(),B.sortDetached=qe(function(l){return l.compareDocumentPosition(o.createElement("fieldset"))&1}),i.find=U,i.expr[":"]=i.expr.pseudos,i.unique=i.uniqueSort,U.compile=qn,U.select=jt,U.setDocument=Ee,U.tokenize=Ze,U.escape=i.escapeSelector,U.getText=i.text,U.isXML=i.isXMLDoc,U.selectors=i.expr,U.support=i.support,U.uniqueSort=i.uniqueSort})();var De=function(e,n,t){for(var r=[],a=t!==void 0;(e=e[n])&&e.nodeType!==9;)if(e.nodeType===1){if(a&&i(e).is(t))break;r.push(e)}return r},Hn=function(e,n){for(var t=[];e;e=e.nextSibling)e.nodeType===1&&e!==n&&t.push(e);return t},Fn=i.expr.match.needsContext,Qn=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function _n(e,n,t){return I(n)?i.grep(e,function(r,a){return!!n.call(r,a,r)!==t}):n.nodeType?i.grep(e,function(r){return r===n!==t}):typeof n!="string"?i.grep(e,function(r){return fe.call(n,r)>-1!==t}):i.filter(n,e,t)}i.filter=function(e,n,t){var r=n[0];return t&&(e=":not("+e+")"),n.length===1&&r.nodeType===1?i.find.matchesSelector(r,e)?[r]:[]:i.find.matches(e,i.grep(n,function(a){return a.nodeType===1}))},i.fn.extend({find:function(e){var n,t,r=this.length,a=this;if(typeof e!="string")return this.pushStack(i(e).filter(function(){for(n=0;n<r;n++)if(i.contains(a[n],this))return!0}));for(t=this.pushStack([]),n=0;n<r;n++)i.find(e,a[n],t);return r>1?i.uniqueSort(t):t},filter:function(e){return this.pushStack(_n(this,e||[],!1))},not:function(e){return this.pushStack(_n(this,e||[],!0))},is:function(e){return!!_n(this,typeof e=="string"&&Fn.test(e)?i(e):e||[],!1).length}});var Jn,qt=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,Ut=i.fn.init=function(e,n,t){var r,a;if(!e)return this;if(t=t||Jn,typeof e=="string")if(e[0]==="<"&&e[e.length-1]===">"&&e.length>=3?r=[null,e,null]:r=qt.exec(e),r&&(r[1]||!n))if(r[1]){if(n=n instanceof i?n[0]:n,i.merge(this,i.parseHTML(r[1],n&&n.nodeType?n.ownerDocument||n:D,!0)),Qn.test(r[1])&&i.isPlainObject(n))for(r in n)I(this[r])?this[r](n[r]):this.attr(r,n[r]);return this}else return a=D.getElementById(r[2]),a&&(this[0]=a,this.length=1),this;else return!n||n.jquery?(n||t).find(e):this.constructor(n).find(e);else{if(e.nodeType)return this[0]=e,this.length=1,this;if(I(e))return t.ready!==void 0?t.ready(e):e(i)}return i.makeArray(e,this)};Ut.prototype=i.fn,Jn=i(D);var Nt=/^(?:parents|prev(?:Until|All))/,Wt={children:!0,contents:!0,next:!0,prev:!0};i.fn.extend({has:function(e){var n=i(e,this),t=n.length;return this.filter(function(){for(var r=0;r<t;r++)if(i.contains(this,n[r]))return!0})},closest:function(e,n){var t,r=0,a=this.length,s=[],o=typeof e!="string"&&i(e);if(!Fn.test(e)){for(;r<a;r++)for(t=this[r];t&&t!==n;t=t.parentNode)if(t.nodeType<11&&(o?o.index(t)>-1:t.nodeType===1&&i.find.matchesSelector(t,e))){s.push(t);break}}return this.pushStack(s.length>1?i.uniqueSort(s):s)},index:function(e){return e?typeof e=="string"?fe.call(i(e),this[0]):fe.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,n){return this.pushStack(i.uniqueSort(i.merge(this.get(),i(e,n))))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}});function Yn(e,n){for(;(e=e[n])&&e.nodeType!==1;);return e}i.each({parent:function(e){var n=e.parentNode;return n&&n.nodeType!==11?n:null},parents:function(e){return De(e,"parentNode")},parentsUntil:function(e,n,t){return De(e,"parentNode",t)},next:function(e){return Yn(e,"nextSibling")},prev:function(e){return Yn(e,"previousSibling")},nextAll:function(e){return De(e,"nextSibling")},prevAll:function(e){return De(e,"previousSibling")},nextUntil:function(e,n,t){return De(e,"nextSibling",t)},prevUntil:function(e,n,t){return De(e,"previousSibling",t)},siblings:function(e){return Hn((e.parentNode||{}).firstChild,e)},children:function(e){return Hn(e.firstChild)},contents:function(e){return e.contentDocument!=null&&$e(e.contentDocument)?e.contentDocument:(K(e,"template")&&(e=e.content||e),i.merge([],e.childNodes))}},function(e,n){i.fn[e]=function(t,r){var a=i.map(this,n,t);return e.slice(-5)!=="Until"&&(r=t),r&&typeof r=="string"&&(a=i.filter(r,a)),this.length>1&&(Wt[e]||i.uniqueSort(a),Nt.test(e)&&a.reverse()),this.pushStack(a)}});var oe=/[^\x20\t\r\n\f]+/g;function Vt(e){var n={};return i.each(e.match(oe)||[],function(t,r){n[r]=!0}),n}i.Callbacks=function(e){e=typeof e=="string"?Vt(e):i.extend({},e);var n,t,r,a,s=[],o=[],c=-1,u=function(){for(a=a||e.once,r=n=!0;o.length;c=-1)for(t=o.shift();++c<s.length;)s[c].apply(t[0],t[1])===!1&&e.stopOnFalse&&(c=s.length,t=!1);e.memory||(t=!1),n=!1,a&&(t?s=[]:s="")},d={add:function(){return s&&(t&&!n&&(c=s.length-1,o.push(t)),function _(A){i.each(A,function(f,v){I(v)?(!e.unique||!d.has(v))&&s.push(v):v&&v.length&&je(v)!=="string"&&_(v)})}(arguments),t&&!n&&u()),this},remove:function(){return i.each(arguments,function(_,A){for(var f;(f=i.inArray(A,s,f))>-1;)s.splice(f,1),f<=c&&c--}),this},has:function(_){return _?i.inArray(_,s)>-1:s.length>0},empty:function(){return s&&(s=[]),this},disable:function(){return a=o=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=o=[],!t&&!n&&(s=t=""),this},locked:function(){return!!a},fireWith:function(_,A){return a||(A=A||[],A=[_,A.slice?A.slice():A],o.push(A),n||u()),this},fire:function(){return d.fireWith(this,arguments),this},fired:function(){return!!r}};return d};function Be(e){return e}function tn(e){throw e}function Gn(e,n,t,r){var a;try{e&&I(a=e.promise)?a.call(e).done(n).fail(t):e&&I(a=e.then)?a.call(e,n,t):n.apply(void 0,[e].slice(r))}catch(s){t.apply(void 0,[s])}}i.extend({Deferred:function(e){var n=[["notify","progress",i.Callbacks("memory"),i.Callbacks("memory"),2],["resolve","done",i.Callbacks("once memory"),i.Callbacks("once memory"),0,"resolved"],["reject","fail",i.Callbacks("once memory"),i.Callbacks("once memory"),1,"rejected"]],t="pending",r={state:function(){return t},always:function(){return a.done(arguments).fail(arguments),this},catch:function(s){return r.then(null,s)},pipe:function(){var s=arguments;return i.Deferred(function(o){i.each(n,function(c,u){var d=I(s[u[4]])&&s[u[4]];a[u[1]](function(){var _=d&&d.apply(this,arguments);_&&I(_.promise)?_.promise().progress(o.notify).done(o.resolve).fail(o.reject):o[u[0]+"With"](this,d?[_]:arguments)})}),s=null}).promise()},then:function(s,o,c){var u=0;function d(_,A,f,v){return function(){var S=this,P=arguments,T=function(){var F,ue;if(!(_<u)){if(F=f.apply(S,P),F===A.promise())throw new TypeError("Thenable self-resolution");ue=F&&(typeof F=="object"||typeof F=="function")&&F.then,I(ue)?v?ue.call(F,d(u,A,Be,v),d(u,A,tn,v)):(u++,ue.call(F,d(u,A,Be,v),d(u,A,tn,v),d(u,A,Be,A.notifyWith))):(f!==Be&&(S=void 0,P=[F]),(v||A.resolveWith)(S,P))}},Y=v?T:function(){try{T()}catch(F){i.Deferred.exceptionHook&&i.Deferred.exceptionHook(F,Y.error),_+1>=u&&(f!==tn&&(S=void 0,P=[F]),A.rejectWith(S,P))}};_?Y():(i.Deferred.getErrorHook?Y.error=i.Deferred.getErrorHook():i.Deferred.getStackHook&&(Y.error=i.Deferred.getStackHook()),w.setTimeout(Y))}}return i.Deferred(function(_){n[0][3].add(d(0,_,I(c)?c:Be,_.notifyWith)),n[1][3].add(d(0,_,I(s)?s:Be)),n[2][3].add(d(0,_,I(o)?o:tn))}).promise()},promise:function(s){return s!=null?i.extend(s,r):r}},a={};return i.each(n,function(s,o){var c=o[2],u=o[5];r[o[1]]=c.add,u&&c.add(function(){t=u},n[3-s][2].disable,n[3-s][3].disable,n[0][2].lock,n[0][3].lock),c.add(o[3].fire),a[o[0]]=function(){return a[o[0]+"With"](this===a?void 0:this,arguments),this},a[o[0]+"With"]=c.fireWith}),r.promise(a),e&&e.call(a,a),a},when:function(e){var n=arguments.length,t=n,r=Array(t),a=ne.call(arguments),s=i.Deferred(),o=function(c){return function(u){r[c]=this,a[c]=arguments.length>1?ne.call(arguments):u,--n||s.resolveWith(r,a)}};if(n<=1&&(Gn(e,s.done(o(t)).resolve,s.reject,!n),s.state()==="pending"||I(a[t]&&a[t].then)))return s.then();for(;t--;)Gn(a[t],o(t),s.reject);return s.promise()}});var Kt=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;i.Deferred.exceptionHook=function(e,n){w.console&&w.console.warn&&e&&Kt.test(e.name)&&w.console.warn("jQuery.Deferred exception: "+e.message,e.stack,n)},i.readyException=function(e){w.setTimeout(function(){throw e})};var gn=i.Deferred();i.fn.ready=function(e){return gn.then(e).catch(function(n){i.readyException(n)}),this},i.extend({isReady:!1,readyWait:1,ready:function(e){(e===!0?--i.readyWait:i.isReady)||(i.isReady=!0,!(e!==!0&&--i.readyWait>0)&&gn.resolveWith(D,[i]))}}),i.ready.then=gn.then;function rn(){D.removeEventListener("DOMContentLoaded",rn),w.removeEventListener("load",rn),i.ready()}D.readyState==="complete"||D.readyState!=="loading"&&!D.documentElement.doScroll?w.setTimeout(i.ready):(D.addEventListener("DOMContentLoaded",rn),w.addEventListener("load",rn));var _e=function(e,n,t,r,a,s,o){var c=0,u=e.length,d=t==null;if(je(t)==="object"){a=!0;for(c in t)_e(e,n,c,t[c],!0,s,o)}else if(r!==void 0&&(a=!0,I(r)||(o=!0),d&&(o?(n.call(e,r),n=null):(d=n,n=function(_,A,f){return d.call(i(_),f)})),n))for(;c<u;c++)n(e[c],t,o?r:r.call(e[c],c,n(e[c],t)));return a?e:d?n.call(e):u?n(e[0],t):s},Ht=/^-ms-/,Ft=/-([a-z])/g;function Qt(e,n){return n.toUpperCase()}function le(e){return e.replace(Ht,"ms-").replace(Ft,Qt)}var Ve=function(e){return e.nodeType===1||e.nodeType===9||!+e.nodeType};function Ke(){this.expando=i.expando+Ke.uid++}Ke.uid=1,Ke.prototype={cache:function(e){var n=e[this.expando];return n||(n={},Ve(e)&&(e.nodeType?e[this.expando]=n:Object.defineProperty(e,this.expando,{value:n,configurable:!0}))),n},set:function(e,n,t){var r,a=this.cache(e);if(typeof n=="string")a[le(n)]=t;else for(r in n)a[le(r)]=n[r];return a},get:function(e,n){return n===void 0?this.cache(e):e[this.expando]&&e[this.expando][le(n)]},access:function(e,n,t){return n===void 0||n&&typeof n=="string"&&t===void 0?this.get(e,n):(this.set(e,n,t),t!==void 0?t:n)},remove:function(e,n){var t,r=e[this.expando];if(r!==void 0){if(n!==void 0)for(Array.isArray(n)?n=n.map(le):(n=le(n),n=n in r?[n]:n.match(oe)||[]),t=n.length;t--;)delete r[n[t]];(n===void 0||i.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var n=e[this.expando];return n!==void 0&&!i.isEmptyObject(n)}};var x=new Ke,X=new Ke,Jt=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Yt=/[A-Z]/g;function Gt(e){return e==="true"?!0:e==="false"?!1:e==="null"?null:e===+e+""?+e:Jt.test(e)?JSON.parse(e):e}function zn(e,n,t){var r;if(t===void 0&&e.nodeType===1)if(r="data-"+n.replace(Yt,"-$&").toLowerCase(),t=e.getAttribute(r),typeof t=="string"){try{t=Gt(t)}catch{}X.set(e,n,t)}else t=void 0;return t}i.extend({hasData:function(e){return X.hasData(e)||x.hasData(e)},data:function(e,n,t){return X.access(e,n,t)},removeData:function(e,n){X.remove(e,n)},_data:function(e,n,t){return x.access(e,n,t)},_removeData:function(e,n){x.remove(e,n)}}),i.fn.extend({data:function(e,n){var t,r,a,s=this[0],o=s&&s.attributes;if(e===void 0){if(this.length&&(a=X.get(s),s.nodeType===1&&!x.get(s,"hasDataAttrs"))){for(t=o.length;t--;)o[t]&&(r=o[t].name,r.indexOf("data-")===0&&(r=le(r.slice(5)),zn(s,r,a[r])));x.set(s,"hasDataAttrs",!0)}return a}return typeof e=="object"?this.each(function(){X.set(this,e)}):_e(this,function(c){var u;if(s&&c===void 0)return u=X.get(s,e),u!==void 0||(u=zn(s,e),u!==void 0)?u:void 0;this.each(function(){X.set(this,e,c)})},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){X.remove(this,e)})}}),i.extend({queue:function(e,n,t){var r;if(e)return n=(n||"fx")+"queue",r=x.get(e,n),t&&(!r||Array.isArray(t)?r=x.access(e,n,i.makeArray(t)):r.push(t)),r||[]},dequeue:function(e,n){n=n||"fx";var t=i.queue(e,n),r=t.length,a=t.shift(),s=i._queueHooks(e,n),o=function(){i.dequeue(e,n)};a==="inprogress"&&(a=t.shift(),r--),a&&(n==="fx"&&t.unshift("inprogress"),delete s.stop,a.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,n){var t=n+"queueHooks";return x.get(e,t)||x.access(e,t,{empty:i.Callbacks("once memory").add(function(){x.remove(e,[n+"queue",t])})})}}),i.fn.extend({queue:function(e,n){var t=2;return typeof e!="string"&&(n=e,e="fx",t--),arguments.length<t?i.queue(this[0],e):n===void 0?this:this.each(function(){var r=i.queue(this,e,n);i._queueHooks(this,e),e==="fx"&&r[0]!=="inprogress"&&i.dequeue(this,e)})},dequeue:function(e){return this.each(function(){i.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var t,r=1,a=i.Deferred(),s=this,o=this.length,c=function(){--r||a.resolveWith(s,[s])};for(typeof e!="string"&&(n=e,e=void 0),e=e||"fx";o--;)t=x.get(s[o],e+"queueHooks"),t&&t.empty&&(r++,t.empty.add(c));return c(),a.promise(n)}});var Xn=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,He=new RegExp("^(?:([+-])=|)("+Xn+")([a-z%]*)$","i"),ge=["Top","Right","Bottom","Left"],Me=D.documentElement,Ie=function(e){return i.contains(e.ownerDocument,e)},zt={composed:!0};Me.getRootNode&&(Ie=function(e){return i.contains(e.ownerDocument,e)||e.getRootNode(zt)===e.ownerDocument});var an=function(e,n){return e=n||e,e.style.display==="none"||e.style.display===""&&Ie(e)&&i.css(e,"display")==="none"};function Zn(e,n,t,r){var a,s,o=20,c=r?function(){return r.cur()}:function(){return i.css(e,n,"")},u=c(),d=t&&t[3]||(i.cssNumber[n]?"":"px"),_=e.nodeType&&(i.cssNumber[n]||d!=="px"&&+u)&&He.exec(i.css(e,n));if(_&&_[3]!==d){for(u=u/2,d=d||_[3],_=+u||1;o--;)i.style(e,n,_+d),(1-s)*(1-(s=c()/u||.5))<=0&&(o=0),_=_/s;_=_*2,i.style(e,n,_+d),t=t||[]}return t&&(_=+_||+u||0,a=t[1]?_+(t[1]+1)*t[2]:+t[2],r&&(r.unit=d,r.start=_,r.end=a)),a}var $n={};function Xt(e){var n,t=e.ownerDocument,r=e.nodeName,a=$n[r];return a||(n=t.body.appendChild(t.createElement(r)),a=i.css(n,"display"),n.parentNode.removeChild(n),a==="none"&&(a="block"),$n[r]=a,a)}function Te(e,n){for(var t,r,a=[],s=0,o=e.length;s<o;s++)r=e[s],r.style&&(t=r.style.display,n?(t==="none"&&(a[s]=x.get(r,"display")||null,a[s]||(r.style.display="")),r.style.display===""&&an(r)&&(a[s]=Xt(r))):t!=="none"&&(a[s]="none",x.set(r,"display",t)));for(s=0;s<o;s++)a[s]!=null&&(e[s].style.display=a[s]);return e}i.fn.extend({show:function(){return Te(this,!0)},hide:function(){return Te(this)},toggle:function(e){return typeof e=="boolean"?e?this.show():this.hide():this.each(function(){an(this)?i(this).show():i(this).hide()})}});var Fe=/^(?:checkbox|radio)$/i,et=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,nt=/^$|^module$|\/(?:java|ecma)script/i;(function(){var e=D.createDocumentFragment(),n=e.appendChild(D.createElement("div")),t=D.createElement("input");t.setAttribute("type","radio"),t.setAttribute("checked","checked"),t.setAttribute("name","t"),n.appendChild(t),B.checkClone=n.cloneNode(!0).cloneNode(!0).lastChild.checked,n.innerHTML="<textarea>x</textarea>",B.noCloneChecked=!!n.cloneNode(!0).lastChild.defaultValue,n.innerHTML="<option></option>",B.option=!!n.lastChild})();var te={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};te.tbody=te.tfoot=te.colgroup=te.caption=te.thead,te.th=te.td,B.option||(te.optgroup=te.option=[1,"<select multiple='multiple'>","</select>"]);function Z(e,n){var t;return typeof e.getElementsByTagName<"u"?t=e.getElementsByTagName(n||"*"):typeof e.querySelectorAll<"u"?t=e.querySelectorAll(n||"*"):t=[],n===void 0||n&&K(e,n)?i.merge([e],t):t}function An(e,n){for(var t=0,r=e.length;t<r;t++)x.set(e[t],"globalEval",!n||x.get(n[t],"globalEval"))}var Zt=/<|&#?\w+;/;function tt(e,n,t,r,a){for(var s,o,c,u,d,_,A=n.createDocumentFragment(),f=[],v=0,S=e.length;v<S;v++)if(s=e[v],s||s===0)if(je(s)==="object")i.merge(f,s.nodeType?[s]:s);else if(!Zt.test(s))f.push(n.createTextNode(s));else{for(o=o||A.appendChild(n.createElement("div")),c=(et.exec(s)||["",""])[1].toLowerCase(),u=te[c]||te._default,o.innerHTML=u[1]+i.htmlPrefilter(s)+u[2],_=u[0];_--;)o=o.lastChild;i.merge(f,o.childNodes),o=A.firstChild,o.textContent=""}for(A.textContent="",v=0;s=f[v++];){if(r&&i.inArray(s,r)>-1){a&&a.push(s);continue}if(d=Ie(s),o=Z(A.appendChild(s),"script"),d&&An(o),t)for(_=0;s=o[_++];)nt.test(s.type||"")&&t.push(s)}return A}var rt=/^([^.]*)(?:\.(.+)|)/;function Le(){return!0}function Oe(){return!1}function vn(e,n,t,r,a,s){var o,c;if(typeof n=="object"){typeof t!="string"&&(r=r||t,t=void 0);for(c in n)vn(e,c,t,r,n[c],s);return e}if(r==null&&a==null?(a=t,r=t=void 0):a==null&&(typeof t=="string"?(a=r,r=void 0):(a=r,r=t,t=void 0)),a===!1)a=Oe;else if(!a)return e;return s===1&&(o=a,a=function(u){return i().off(u),o.apply(this,arguments)},a.guid=o.guid||(o.guid=i.guid++)),e.each(function(){i.event.add(this,n,a,r,t)})}i.event={global:{},add:function(e,n,t,r,a){var s,o,c,u,d,_,A,f,v,S,P,T=x.get(e);if(Ve(e))for(t.handler&&(s=t,t=s.handler,a=s.selector),a&&i.find.matchesSelector(Me,a),t.guid||(t.guid=i.guid++),(u=T.events)||(u=T.events=Object.create(null)),(o=T.handle)||(o=T.handle=function(Y){return typeof i<"u"&&i.event.triggered!==Y.type?i.event.dispatch.apply(e,arguments):void 0}),n=(n||"").match(oe)||[""],d=n.length;d--;)c=rt.exec(n[d])||[],v=P=c[1],S=(c[2]||"").split(".").sort(),v&&(A=i.event.special[v]||{},v=(a?A.delegateType:A.bindType)||v,A=i.event.special[v]||{},_=i.extend({type:v,origType:P,data:r,handler:t,guid:t.guid,selector:a,needsContext:a&&i.expr.match.needsContext.test(a),namespace:S.join(".")},s),(f=u[v])||(f=u[v]=[],f.delegateCount=0,(!A.setup||A.setup.call(e,r,S,o)===!1)&&e.addEventListener&&e.addEventListener(v,o)),A.add&&(A.add.call(e,_),_.handler.guid||(_.handler.guid=t.guid)),a?f.splice(f.delegateCount++,0,_):f.push(_),i.event.global[v]=!0)},remove:function(e,n,t,r,a){var s,o,c,u,d,_,A,f,v,S,P,T=x.hasData(e)&&x.get(e);if(!(!T||!(u=T.events))){for(n=(n||"").match(oe)||[""],d=n.length;d--;){if(c=rt.exec(n[d])||[],v=P=c[1],S=(c[2]||"").split(".").sort(),!v){for(v in u)i.event.remove(e,v+n[d],t,r,!0);continue}for(A=i.event.special[v]||{},v=(r?A.delegateType:A.bindType)||v,f=u[v]||[],c=c[2]&&new RegExp("(^|\\.)"+S.join("\\.(?:.*\\.|)")+"(\\.|$)"),o=s=f.length;s--;)_=f[s],(a||P===_.origType)&&(!t||t.guid===_.guid)&&(!c||c.test(_.namespace))&&(!r||r===_.selector||r==="**"&&_.selector)&&(f.splice(s,1),_.selector&&f.delegateCount--,A.remove&&A.remove.call(e,_));o&&!f.length&&((!A.teardown||A.teardown.call(e,S,T.handle)===!1)&&i.removeEvent(e,v,T.handle),delete u[v])}i.isEmptyObject(u)&&x.remove(e,"handle events")}},dispatch:function(e){var n,t,r,a,s,o,c=new Array(arguments.length),u=i.event.fix(e),d=(x.get(this,"events")||Object.create(null))[u.type]||[],_=i.event.special[u.type]||{};for(c[0]=u,n=1;n<arguments.length;n++)c[n]=arguments[n];if(u.delegateTarget=this,!(_.preDispatch&&_.preDispatch.call(this,u)===!1)){for(o=i.event.handlers.call(this,u,d),n=0;(a=o[n++])&&!u.isPropagationStopped();)for(u.currentTarget=a.elem,t=0;(s=a.handlers[t++])&&!u.isImmediatePropagationStopped();)(!u.rnamespace||s.namespace===!1||u.rnamespace.test(s.namespace))&&(u.handleObj=s,u.data=s.data,r=((i.event.special[s.origType]||{}).handle||s.handler).apply(a.elem,c),r!==void 0&&(u.result=r)===!1&&(u.preventDefault(),u.stopPropagation()));return _.postDispatch&&_.postDispatch.call(this,u),u.result}},handlers:function(e,n){var t,r,a,s,o,c=[],u=n.delegateCount,d=e.target;if(u&&d.nodeType&&!(e.type==="click"&&e.button>=1)){for(;d!==this;d=d.parentNode||this)if(d.nodeType===1&&!(e.type==="click"&&d.disabled===!0)){for(s=[],o={},t=0;t<u;t++)r=n[t],a=r.selector+" ",o[a]===void 0&&(o[a]=r.needsContext?i(a,this).index(d)>-1:i.find(a,this,null,[d]).length),o[a]&&s.push(r);s.length&&c.push({elem:d,handlers:s})}}return d=this,u<n.length&&c.push({elem:d,handlers:n.slice(u)}),c},addProp:function(e,n){Object.defineProperty(i.Event.prototype,e,{enumerable:!0,configurable:!0,get:I(n)?function(){if(this.originalEvent)return n(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[i.expando]?e:new i.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var n=this||e;return Fe.test(n.type)&&n.click&&K(n,"input")&&sn(n,"click",!0),!1},trigger:function(e){var n=this||e;return Fe.test(n.type)&&n.click&&K(n,"input")&&sn(n,"click"),!0},_default:function(e){var n=e.target;return Fe.test(n.type)&&n.click&&K(n,"input")&&x.get(n,"click")||K(n,"a")}},beforeunload:{postDispatch:function(e){e.result!==void 0&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}};function sn(e,n,t){if(!t){x.get(e,n)===void 0&&i.event.add(e,n,Le);return}x.set(e,n,!1),i.event.add(e,n,{namespace:!1,handler:function(r){var a,s=x.get(this,n);if(r.isTrigger&1&&this[n]){if(s)(i.event.special[n]||{}).delegateType&&r.stopPropagation();else if(s=ne.call(arguments),x.set(this,n,s),this[n](),a=x.get(this,n),x.set(this,n,!1),s!==a)return r.stopImmediatePropagation(),r.preventDefault(),a}else s&&(x.set(this,n,i.event.trigger(s[0],s.slice(1),this)),r.stopPropagation(),r.isImmediatePropagationStopped=Le)}})}i.removeEvent=function(e,n,t){e.removeEventListener&&e.removeEventListener(n,t)},i.Event=function(e,n){if(!(this instanceof i.Event))return new i.Event(e,n);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.defaultPrevented===void 0&&e.returnValue===!1?Le:Oe,this.target=e.target&&e.target.nodeType===3?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,n&&i.extend(this,n),this.timeStamp=e&&e.timeStamp||Date.now(),this[i.expando]=!0},i.Event.prototype={constructor:i.Event,isDefaultPrevented:Oe,isPropagationStopped:Oe,isImmediatePropagationStopped:Oe,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Le,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Le,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Le,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},i.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},i.event.addProp),i.each({focus:"focusin",blur:"focusout"},function(e,n){function t(r){if(D.documentMode){var a=x.get(this,"handle"),s=i.event.fix(r);s.type=r.type==="focusin"?"focus":"blur",s.isSimulated=!0,a(r),s.target===s.currentTarget&&a(s)}else i.event.simulate(n,r.target,i.event.fix(r))}i.event.special[e]={setup:function(){var r;if(sn(this,e,!0),D.documentMode)r=x.get(this,n),r||this.addEventListener(n,t),x.set(this,n,(r||0)+1);else return!1},trigger:function(){return sn(this,e),!0},teardown:function(){var r;if(D.documentMode)r=x.get(this,n)-1,r?x.set(this,n,r):(this.removeEventListener(n,t),x.remove(this,n));else return!1},_default:function(r){return x.get(r.target,e)},delegateType:n},i.event.special[n]={setup:function(){var r=this.ownerDocument||this.document||this,a=D.documentMode?this:r,s=x.get(a,n);s||(D.documentMode?this.addEventListener(n,t):r.addEventListener(e,t,!0)),x.set(a,n,(s||0)+1)},teardown:function(){var r=this.ownerDocument||this.document||this,a=D.documentMode?this:r,s=x.get(a,n)-1;s?x.set(a,n,s):(D.documentMode?this.removeEventListener(n,t):r.removeEventListener(e,t,!0),x.remove(a,n))}}}),i.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,n){i.event.special[e]={delegateType:n,bindType:n,handle:function(t){var r,a=this,s=t.relatedTarget,o=t.handleObj;return(!s||s!==a&&!i.contains(a,s))&&(t.type=o.origType,r=o.handler.apply(this,arguments),t.type=n),r}}}),i.fn.extend({on:function(e,n,t,r){return vn(this,e,n,t,r)},one:function(e,n,t,r){return vn(this,e,n,t,r,1)},off:function(e,n,t){var r,a;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,i(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if(typeof e=="object"){for(a in e)this.off(a,n,e[a]);return this}return(n===!1||typeof n=="function")&&(t=n,n=void 0),t===!1&&(t=Oe),this.each(function(){i.event.remove(this,e,t,n)})}});var $t=/<script|<style|<link/i,er=/checked\s*(?:[^=]|=\s*.checked.)/i,nr=/^\s*<!\[CDATA\[|\]\]>\s*$/g;function it(e,n){return K(e,"table")&&K(n.nodeType!==11?n:n.firstChild,"tr")&&i(e).children("tbody")[0]||e}function tr(e){return e.type=(e.getAttribute("type")!==null)+"/"+e.type,e}function rr(e){return(e.type||"").slice(0,5)==="true/"?e.type=e.type.slice(5):e.removeAttribute("type"),e}function at(e,n){var t,r,a,s,o,c,u;if(n.nodeType===1){if(x.hasData(e)&&(s=x.get(e),u=s.events,u)){x.remove(n,"handle events");for(a in u)for(t=0,r=u[a].length;t<r;t++)i.event.add(n,a,u[a][t])}X.hasData(e)&&(o=X.access(e),c=i.extend({},o),X.set(n,c))}}function ir(e,n){var t=n.nodeName.toLowerCase();t==="input"&&Fe.test(e.type)?n.checked=e.checked:(t==="input"||t==="textarea")&&(n.defaultValue=e.defaultValue)}function Re(e,n,t,r){n=Un(n);var a,s,o,c,u,d,_=0,A=e.length,f=A-1,v=n[0],S=I(v);if(S||A>1&&typeof v=="string"&&!B.checkClone&&er.test(v))return e.each(function(P){var T=e.eq(P);S&&(n[0]=v.call(this,P,T.html())),Re(T,n,t,r)});if(A&&(a=tt(n,e[0].ownerDocument,!1,e,r),s=a.firstChild,a.childNodes.length===1&&(a=s),s||r)){for(o=i.map(Z(a,"script"),tr),c=o.length;_<A;_++)u=a,_!==f&&(u=i.clone(u,!0,!0),c&&i.merge(o,Z(u,"script"))),t.call(e[_],u,_);if(c)for(d=o[o.length-1].ownerDocument,i.map(o,rr),_=0;_<c;_++)u=o[_],nt.test(u.type||"")&&!x.access(u,"globalEval")&&i.contains(d,u)&&(u.src&&(u.type||"").toLowerCase()!=="module"?i._evalUrl&&!u.noModule&&i._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")},d):Vn(u.textContent.replace(nr,""),u,d))}return e}function st(e,n,t){for(var r,a=n?i.filter(n,e):e,s=0;(r=a[s])!=null;s++)!t&&r.nodeType===1&&i.cleanData(Z(r)),r.parentNode&&(t&&Ie(r)&&An(Z(r,"script")),r.parentNode.removeChild(r));return e}i.extend({htmlPrefilter:function(e){return e},clone:function(e,n,t){var r,a,s,o,c=e.cloneNode(!0),u=Ie(e);if(!B.noCloneChecked&&(e.nodeType===1||e.nodeType===11)&&!i.isXMLDoc(e))for(o=Z(c),s=Z(e),r=0,a=s.length;r<a;r++)ir(s[r],o[r]);if(n)if(t)for(s=s||Z(e),o=o||Z(c),r=0,a=s.length;r<a;r++)at(s[r],o[r]);else at(e,c);return o=Z(c,"script"),o.length>0&&An(o,!u&&Z(e,"script")),c},cleanData:function(e){for(var n,t,r,a=i.event.special,s=0;(t=e[s])!==void 0;s++)if(Ve(t)){if(n=t[x.expando]){if(n.events)for(r in n.events)a[r]?i.event.remove(t,r):i.removeEvent(t,r,n.handle);t[x.expando]=void 0}t[X.expando]&&(t[X.expando]=void 0)}}}),i.fn.extend({detach:function(e){return st(this,e,!0)},remove:function(e){return st(this,e)},text:function(e){return _e(this,function(n){return n===void 0?i.text(this):this.empty().each(function(){(this.nodeType===1||this.nodeType===11||this.nodeType===9)&&(this.textContent=n)})},null,e,arguments.length)},append:function(){return Re(this,arguments,function(e){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var n=it(this,e);n.appendChild(e)}})},prepend:function(){return Re(this,arguments,function(e){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var n=it(this,e);n.insertBefore(e,n.firstChild)}})},before:function(){return Re(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Re(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,n=0;(e=this[n])!=null;n++)e.nodeType===1&&(i.cleanData(Z(e,!1)),e.textContent="");return this},clone:function(e,n){return e=e??!1,n=n??e,this.map(function(){return i.clone(this,e,n)})},html:function(e){return _e(this,function(n){var t=this[0]||{},r=0,a=this.length;if(n===void 0&&t.nodeType===1)return t.innerHTML;if(typeof n=="string"&&!$t.test(n)&&!te[(et.exec(n)||["",""])[1].toLowerCase()]){n=i.htmlPrefilter(n);try{for(;r<a;r++)t=this[r]||{},t.nodeType===1&&(i.cleanData(Z(t,!1)),t.innerHTML=n);t=0}catch{}}t&&this.empty().append(n)},null,e,arguments.length)},replaceWith:function(){var e=[];return Re(this,arguments,function(n){var t=this.parentNode;i.inArray(this,e)<0&&(i.cleanData(Z(this)),t&&t.replaceChild(n,this))},e)}}),i.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,n){i.fn[e]=function(t){for(var r,a=[],s=i(t),o=s.length-1,c=0;c<=o;c++)r=c===o?this:this.clone(!0),i(s[c])[n](r),en.apply(a,r.get());return this.pushStack(a)}});var yn=new RegExp("^("+Xn+")(?!px)[a-z%]+$","i"),bn=/^--/,on=function(e){var n=e.ownerDocument.defaultView;return(!n||!n.opener)&&(n=w),n.getComputedStyle(e)},ot=function(e,n,t){var r,a,s={};for(a in n)s[a]=e.style[a],e.style[a]=n[a];r=t.call(e);for(a in n)e.style[a]=s[a];return r},ar=new RegExp(ge.join("|"),"i");(function(){function e(){if(d){u.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",d.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",Me.appendChild(u).appendChild(d);var _=w.getComputedStyle(d);t=_.top!=="1%",c=n(_.marginLeft)===12,d.style.right="60%",s=n(_.right)===36,r=n(_.width)===36,d.style.position="absolute",a=n(d.offsetWidth/3)===12,Me.removeChild(u),d=null}}function n(_){return Math.round(parseFloat(_))}var t,r,a,s,o,c,u=D.createElement("div"),d=D.createElement("div");d.style&&(d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",B.clearCloneStyle=d.style.backgroundClip==="content-box",i.extend(B,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),s},pixelPosition:function(){return e(),t},reliableMarginLeft:function(){return e(),c},scrollboxSize:function(){return e(),a},reliableTrDimensions:function(){var _,A,f,v;return o==null&&(_=D.createElement("table"),A=D.createElement("tr"),f=D.createElement("div"),_.style.cssText="position:absolute;left:-11111px;border-collapse:separate",A.style.cssText="box-sizing:content-box;border:1px solid",A.style.height="1px",f.style.height="9px",f.style.display="block",Me.appendChild(_).appendChild(A).appendChild(f),v=w.getComputedStyle(A),o=parseInt(v.height,10)+parseInt(v.borderTopWidth,10)+parseInt(v.borderBottomWidth,10)===A.offsetHeight,Me.removeChild(_)),o}}))})();function Qe(e,n,t){var r,a,s,o,c=bn.test(n),u=e.style;return t=t||on(e),t&&(o=t.getPropertyValue(n)||t[n],c&&o&&(o=o.replace(We,"$1")||void 0),o===""&&!Ie(e)&&(o=i.style(e,n)),!B.pixelBoxStyles()&&yn.test(o)&&ar.test(n)&&(r=u.width,a=u.minWidth,s=u.maxWidth,u.minWidth=u.maxWidth=u.width=o,o=t.width,u.width=r,u.minWidth=a,u.maxWidth=s)),o!==void 0?o+"":o}function lt(e,n){return{get:function(){if(e()){delete this.get;return}return(this.get=n).apply(this,arguments)}}}var ut=["Webkit","Moz","ms"],ct=D.createElement("div").style,pt={};function sr(e){for(var n=e[0].toUpperCase()+e.slice(1),t=ut.length;t--;)if(e=ut[t]+n,e in ct)return e}function En(e){var n=i.cssProps[e]||pt[e];return n||(e in ct?e:pt[e]=sr(e)||e)}var or=/^(none|table(?!-c[ea]).+)/,lr={position:"absolute",visibility:"hidden",display:"block"},dt={letterSpacing:"0",fontWeight:"400"};function ht(e,n,t){var r=He.exec(n);return r?Math.max(0,r[2]-(t||0))+(r[3]||"px"):n}function Mn(e,n,t,r,a,s){var o=n==="width"?1:0,c=0,u=0,d=0;if(t===(r?"border":"content"))return 0;for(;o<4;o+=2)t==="margin"&&(d+=i.css(e,t+ge[o],!0,a)),r?(t==="content"&&(u-=i.css(e,"padding"+ge[o],!0,a)),t!=="margin"&&(u-=i.css(e,"border"+ge[o]+"Width",!0,a))):(u+=i.css(e,"padding"+ge[o],!0,a),t!=="padding"?u+=i.css(e,"border"+ge[o]+"Width",!0,a):c+=i.css(e,"border"+ge[o]+"Width",!0,a));return!r&&s>=0&&(u+=Math.max(0,Math.ceil(e["offset"+n[0].toUpperCase()+n.slice(1)]-s-u-c-.5))||0),u+d}function ft(e,n,t){var r=on(e),a=!B.boxSizingReliable()||t,s=a&&i.css(e,"boxSizing",!1,r)==="border-box",o=s,c=Qe(e,n,r),u="offset"+n[0].toUpperCase()+n.slice(1);if(yn.test(c)){if(!t)return c;c="auto"}return(!B.boxSizingReliable()&&s||!B.reliableTrDimensions()&&K(e,"tr")||c==="auto"||!parseFloat(c)&&i.css(e,"display",!1,r)==="inline")&&e.getClientRects().length&&(s=i.css(e,"boxSizing",!1,r)==="border-box",o=u in e,o&&(c=e[u])),c=parseFloat(c)||0,c+Mn(e,n,t||(s?"border":"content"),o,r,c)+"px"}i.extend({cssHooks:{opacity:{get:function(e,n){if(n){var t=Qe(e,"opacity");return t===""?"1":t}}}},cssNumber:{animationIterationCount:!0,aspectRatio:!0,borderImageSlice:!0,columnCount:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,scale:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeMiterlimit:!0,strokeOpacity:!0},cssProps:{},style:function(e,n,t,r){if(!(!e||e.nodeType===3||e.nodeType===8||!e.style)){var a,s,o,c=le(n),u=bn.test(n),d=e.style;if(u||(n=En(c)),o=i.cssHooks[n]||i.cssHooks[c],t!==void 0){if(s=typeof t,s==="string"&&(a=He.exec(t))&&a[1]&&(t=Zn(e,n,a),s="number"),t==null||t!==t)return;s==="number"&&!u&&(t+=a&&a[3]||(i.cssNumber[c]?"":"px")),!B.clearCloneStyle&&t===""&&n.indexOf("background")===0&&(d[n]="inherit"),(!o||!("set"in o)||(t=o.set(e,t,r))!==void 0)&&(u?d.setProperty(n,t):d[n]=t)}else return o&&"get"in o&&(a=o.get(e,!1,r))!==void 0?a:d[n]}},css:function(e,n,t,r){var a,s,o,c=le(n),u=bn.test(n);return u||(n=En(c)),o=i.cssHooks[n]||i.cssHooks[c],o&&"get"in o&&(a=o.get(e,!0,t)),a===void 0&&(a=Qe(e,n,r)),a==="normal"&&n in dt&&(a=dt[n]),t===""||t?(s=parseFloat(a),t===!0||isFinite(s)?s||0:a):a}}),i.each(["height","width"],function(e,n){i.cssHooks[n]={get:function(t,r,a){if(r)return or.test(i.css(t,"display"))&&(!t.getClientRects().length||!t.getBoundingClientRect().width)?ot(t,lr,function(){return ft(t,n,a)}):ft(t,n,a)},set:function(t,r,a){var s,o=on(t),c=!B.scrollboxSize()&&o.position==="absolute",u=c||a,d=u&&i.css(t,"boxSizing",!1,o)==="border-box",_=a?Mn(t,n,a,d,o):0;return d&&c&&(_-=Math.ceil(t["offset"+n[0].toUpperCase()+n.slice(1)]-parseFloat(o[n])-Mn(t,n,"border",!1,o)-.5)),_&&(s=He.exec(r))&&(s[3]||"px")!=="px"&&(t.style[n]=r,r=i.css(t,n)),ht(t,r,_)}}}),i.cssHooks.marginLeft=lt(B.reliableMarginLeft,function(e,n){if(n)return(parseFloat(Qe(e,"marginLeft"))||e.getBoundingClientRect().left-ot(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),i.each({margin:"",padding:"",border:"Width"},function(e,n){i.cssHooks[e+n]={expand:function(t){for(var r=0,a={},s=typeof t=="string"?t.split(" "):[t];r<4;r++)a[e+ge[r]+n]=s[r]||s[r-2]||s[0];return a}},e!=="margin"&&(i.cssHooks[e+n].set=ht)}),i.fn.extend({css:function(e,n){return _e(this,function(t,r,a){var s,o,c={},u=0;if(Array.isArray(r)){for(s=on(t),o=r.length;u<o;u++)c[r[u]]=i.css(t,r[u],!1,s);return c}return a!==void 0?i.style(t,r,a):i.css(t,r)},e,n,arguments.length>1)}});function $(e,n,t,r,a){return new $.prototype.init(e,n,t,r,a)}i.Tween=$,$.prototype={constructor:$,init:function(e,n,t,r,a,s){this.elem=e,this.prop=t,this.easing=a||i.easing._default,this.options=n,this.start=this.now=this.cur(),this.end=r,this.unit=s||(i.cssNumber[t]?"":"px")},cur:function(){var e=$.propHooks[this.prop];return e&&e.get?e.get(this):$.propHooks._default.get(this)},run:function(e){var n,t=$.propHooks[this.prop];return this.options.duration?this.pos=n=i.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=n=e,this.now=(this.end-this.start)*n+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),t&&t.set?t.set(this):$.propHooks._default.set(this),this}},$.prototype.init.prototype=$.prototype,$.propHooks={_default:{get:function(e){var n;return e.elem.nodeType!==1||e.elem[e.prop]!=null&&e.elem.style[e.prop]==null?e.elem[e.prop]:(n=i.css(e.elem,e.prop,""),!n||n==="auto"?0:n)},set:function(e){i.fx.step[e.prop]?i.fx.step[e.prop](e):e.elem.nodeType===1&&(i.cssHooks[e.prop]||e.elem.style[En(e.prop)]!=null)?i.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},$.propHooks.scrollTop=$.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},i.easing={linear:function(e){return e},swing:function(e){return .5-Math.cos(e*Math.PI)/2},_default:"swing"},i.fx=$.prototype.init,i.fx.step={};var Pe,ln,ur=/^(?:toggle|show|hide)$/,cr=/queueHooks$/;function wn(){ln&&(D.hidden===!1&&w.requestAnimationFrame?w.requestAnimationFrame(wn):w.setTimeout(wn,i.fx.interval),i.fx.tick())}function mt(){return w.setTimeout(function(){Pe=void 0}),Pe=Date.now()}function un(e,n){var t,r=0,a={height:e};for(n=n?1:0;r<4;r+=2-n)t=ge[r],a["margin"+t]=a["padding"+t]=e;return n&&(a.opacity=a.width=e),a}function _t(e,n,t){for(var r,a=(ae.tweeners[n]||[]).concat(ae.tweeners["*"]),s=0,o=a.length;s<o;s++)if(r=a[s].call(t,n,e))return r}function pr(e,n,t){var r,a,s,o,c,u,d,_,A="width"in n||"height"in n,f=this,v={},S=e.style,P=e.nodeType&&an(e),T=x.get(e,"fxshow");t.queue||(o=i._queueHooks(e,"fx"),o.unqueued==null&&(o.unqueued=0,c=o.empty.fire,o.empty.fire=function(){o.unqueued||c()}),o.unqueued++,f.always(function(){f.always(function(){o.unqueued--,i.queue(e,"fx").length||o.empty.fire()})}));for(r in n)if(a=n[r],ur.test(a)){if(delete n[r],s=s||a==="toggle",a===(P?"hide":"show"))if(a==="show"&&T&&T[r]!==void 0)P=!0;else continue;v[r]=T&&T[r]||i.style(e,r)}if(u=!i.isEmptyObject(n),!(!u&&i.isEmptyObject(v))){A&&e.nodeType===1&&(t.overflow=[S.overflow,S.overflowX,S.overflowY],d=T&&T.display,d==null&&(d=x.get(e,"display")),_=i.css(e,"display"),_==="none"&&(d?_=d:(Te([e],!0),d=e.style.display||d,_=i.css(e,"display"),Te([e]))),(_==="inline"||_==="inline-block"&&d!=null)&&i.css(e,"float")==="none"&&(u||(f.done(function(){S.display=d}),d==null&&(_=S.display,d=_==="none"?"":_)),S.display="inline-block")),t.overflow&&(S.overflow="hidden",f.always(function(){S.overflow=t.overflow[0],S.overflowX=t.overflow[1],S.overflowY=t.overflow[2]})),u=!1;for(r in v)u||(T?"hidden"in T&&(P=T.hidden):T=x.access(e,"fxshow",{display:d}),s&&(T.hidden=!P),P&&Te([e],!0),f.done(function(){P||Te([e]),x.remove(e,"fxshow");for(r in v)i.style(e,r,v[r])})),u=_t(P?T[r]:0,r,f),r in T||(T[r]=u.start,P&&(u.end=u.start,u.start=0))}}function dr(e,n){var t,r,a,s,o;for(t in e)if(r=le(t),a=n[r],s=e[t],Array.isArray(s)&&(a=s[1],s=e[t]=s[0]),t!==r&&(e[r]=s,delete e[t]),o=i.cssHooks[r],o&&"expand"in o){s=o.expand(s),delete e[r];for(t in s)t in e||(e[t]=s[t],n[t]=a)}else n[r]=a}function ae(e,n,t){var r,a,s=0,o=ae.prefilters.length,c=i.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var A=Pe||mt(),f=Math.max(0,d.startTime+d.duration-A),v=f/d.duration||0,S=1-v,P=0,T=d.tweens.length;P<T;P++)d.tweens[P].run(S);return c.notifyWith(e,[d,S,f]),S<1&&T?f:(T||c.notifyWith(e,[d,1,0]),c.resolveWith(e,[d]),!1)},d=c.promise({elem:e,props:i.extend({},n),opts:i.extend(!0,{specialEasing:{},easing:i.easing._default},t),originalProperties:n,originalOptions:t,startTime:Pe||mt(),duration:t.duration,tweens:[],createTween:function(A,f){var v=i.Tween(e,d.opts,A,f,d.opts.specialEasing[A]||d.opts.easing);return d.tweens.push(v),v},stop:function(A){var f=0,v=A?d.tweens.length:0;if(a)return this;for(a=!0;f<v;f++)d.tweens[f].run(1);return A?(c.notifyWith(e,[d,1,0]),c.resolveWith(e,[d,A])):c.rejectWith(e,[d,A]),this}}),_=d.props;for(dr(_,d.opts.specialEasing);s<o;s++)if(r=ae.prefilters[s].call(d,e,_,d.opts),r)return I(r.stop)&&(i._queueHooks(d.elem,d.opts.queue).stop=r.stop.bind(r)),r;return i.map(_,_t,d),I(d.opts.start)&&d.opts.start.call(e,d),d.progress(d.opts.progress).done(d.opts.done,d.opts.complete).fail(d.opts.fail).always(d.opts.always),i.fx.timer(i.extend(u,{elem:e,anim:d,queue:d.opts.queue})),d}i.Animation=i.extend(ae,{tweeners:{"*":[function(e,n){var t=this.createTween(e,n);return Zn(t.elem,e,He.exec(n),t),t}]},tweener:function(e,n){I(e)?(n=e,e=["*"]):e=e.match(oe);for(var t,r=0,a=e.length;r<a;r++)t=e[r],ae.tweeners[t]=ae.tweeners[t]||[],ae.tweeners[t].unshift(n)},prefilters:[pr],prefilter:function(e,n){n?ae.prefilters.unshift(e):ae.prefilters.push(e)}}),i.speed=function(e,n,t){var r=e&&typeof e=="object"?i.extend({},e):{complete:t||!t&&n||I(e)&&e,duration:e,easing:t&&n||n&&!I(n)&&n};return i.fx.off?r.duration=0:typeof r.duration!="number"&&(r.duration in i.fx.speeds?r.duration=i.fx.speeds[r.duration]:r.duration=i.fx.speeds._default),(r.queue==null||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){I(r.old)&&r.old.call(this),r.queue&&i.dequeue(this,r.queue)},r},i.fn.extend({fadeTo:function(e,n,t,r){return this.filter(an).css("opacity",0).show().end().animate({opacity:n},e,t,r)},animate:function(e,n,t,r){var a=i.isEmptyObject(e),s=i.speed(n,t,r),o=function(){var c=ae(this,i.extend({},e),s);(a||x.get(this,"finish"))&&c.stop(!0)};return o.finish=o,a||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,t){var r=function(a){var s=a.stop;delete a.stop,s(t)};return typeof e!="string"&&(t=n,n=e,e=void 0),n&&this.queue(e||"fx",[]),this.each(function(){var a=!0,s=e!=null&&e+"queueHooks",o=i.timers,c=x.get(this);if(s)c[s]&&c[s].stop&&r(c[s]);else for(s in c)c[s]&&c[s].stop&&cr.test(s)&&r(c[s]);for(s=o.length;s--;)o[s].elem===this&&(e==null||o[s].queue===e)&&(o[s].anim.stop(t),a=!1,o.splice(s,1));(a||!t)&&i.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var n,t=x.get(this),r=t[e+"queue"],a=t[e+"queueHooks"],s=i.timers,o=r?r.length:0;for(t.finish=!0,i.queue(this,e,[]),a&&a.stop&&a.stop.call(this,!0),n=s.length;n--;)s[n].elem===this&&s[n].queue===e&&(s[n].anim.stop(!0),s.splice(n,1));for(n=0;n<o;n++)r[n]&&r[n].finish&&r[n].finish.call(this);delete t.finish})}}),i.each(["toggle","show","hide"],function(e,n){var t=i.fn[n];i.fn[n]=function(r,a,s){return r==null||typeof r=="boolean"?t.apply(this,arguments):this.animate(un(n,!0),r,a,s)}}),i.each({slideDown:un("show"),slideUp:un("hide"),slideToggle:un("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,n){i.fn[e]=function(t,r,a){return this.animate(n,t,r,a)}}),i.timers=[],i.fx.tick=function(){var e,n=0,t=i.timers;for(Pe=Date.now();n<t.length;n++)e=t[n],!e()&&t[n]===e&&t.splice(n--,1);t.length||i.fx.stop(),Pe=void 0},i.fx.timer=function(e){i.timers.push(e),i.fx.start()},i.fx.interval=13,i.fx.start=function(){ln||(ln=!0,wn())},i.fx.stop=function(){ln=null},i.fx.speeds={slow:600,fast:200,_default:400},i.fn.delay=function(e,n){return e=i.fx&&i.fx.speeds[e]||e,n=n||"fx",this.queue(n,function(t,r){var a=w.setTimeout(t,e);r.stop=function(){w.clearTimeout(a)}})},function(){var e=D.createElement("input"),n=D.createElement("select"),t=n.appendChild(D.createElement("option"));e.type="checkbox",B.checkOn=e.value!=="",B.optSelected=t.selected,e=D.createElement("input"),e.value="t",e.type="radio",B.radioValue=e.value==="t"}();var gt,Je=i.expr.attrHandle;i.fn.extend({attr:function(e,n){return _e(this,i.attr,e,n,arguments.length>1)},removeAttr:function(e){return this.each(function(){i.removeAttr(this,e)})}}),i.extend({attr:function(e,n,t){var r,a,s=e.nodeType;if(!(s===3||s===8||s===2)){if(typeof e.getAttribute>"u")return i.prop(e,n,t);if((s!==1||!i.isXMLDoc(e))&&(a=i.attrHooks[n.toLowerCase()]||(i.expr.match.bool.test(n)?gt:void 0)),t!==void 0){if(t===null){i.removeAttr(e,n);return}return a&&"set"in a&&(r=a.set(e,t,n))!==void 0?r:(e.setAttribute(n,t+""),t)}return a&&"get"in a&&(r=a.get(e,n))!==null?r:(r=i.find.attr(e,n),r??void 0)}},attrHooks:{type:{set:function(e,n){if(!B.radioValue&&n==="radio"&&K(e,"input")){var t=e.value;return e.setAttribute("type",n),t&&(e.value=t),n}}}},removeAttr:function(e,n){var t,r=0,a=n&&n.match(oe);if(a&&e.nodeType===1)for(;t=a[r++];)e.removeAttribute(t)}}),gt={set:function(e,n,t){return n===!1?i.removeAttr(e,t):e.setAttribute(t,t),t}},i.each(i.expr.match.bool.source.match(/\w+/g),function(e,n){var t=Je[n]||i.find.attr;Je[n]=function(r,a,s){var o,c,u=a.toLowerCase();return s||(c=Je[u],Je[u]=o,o=t(r,a,s)!=null?u:null,Je[u]=c),o}});var hr=/^(?:input|select|textarea|button)$/i,fr=/^(?:a|area)$/i;i.fn.extend({prop:function(e,n){return _e(this,i.prop,e,n,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[i.propFix[e]||e]})}}),i.extend({prop:function(e,n,t){var r,a,s=e.nodeType;if(!(s===3||s===8||s===2))return(s!==1||!i.isXMLDoc(e))&&(n=i.propFix[n]||n,a=i.propHooks[n]),t!==void 0?a&&"set"in a&&(r=a.set(e,t,n))!==void 0?r:e[n]=t:a&&"get"in a&&(r=a.get(e,n))!==null?r:e[n]},propHooks:{tabIndex:{get:function(e){var n=i.find.attr(e,"tabindex");return n?parseInt(n,10):hr.test(e.nodeName)||fr.test(e.nodeName)&&e.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),B.optSelected||(i.propHooks.selected={get:function(e){var n=e.parentNode;return n&&n.parentNode&&n.parentNode.selectedIndex,null},set:function(e){var n=e.parentNode;n&&(n.selectedIndex,n.parentNode&&n.parentNode.selectedIndex)}}),i.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){i.propFix[this.toLowerCase()]=this});function we(e){var n=e.match(oe)||[];return n.join(" ")}function xe(e){return e.getAttribute&&e.getAttribute("class")||""}function xn(e){return Array.isArray(e)?e:typeof e=="string"?e.match(oe)||[]:[]}i.fn.extend({addClass:function(e){var n,t,r,a,s,o;return I(e)?this.each(function(c){i(this).addClass(e.call(this,c,xe(this)))}):(n=xn(e),n.length?this.each(function(){if(r=xe(this),t=this.nodeType===1&&" "+we(r)+" ",t){for(s=0;s<n.length;s++)a=n[s],t.indexOf(" "+a+" ")<0&&(t+=a+" ");o=we(t),r!==o&&this.setAttribute("class",o)}}):this)},removeClass:function(e){var n,t,r,a,s,o;return I(e)?this.each(function(c){i(this).removeClass(e.call(this,c,xe(this)))}):arguments.length?(n=xn(e),n.length?this.each(function(){if(r=xe(this),t=this.nodeType===1&&" "+we(r)+" ",t){for(s=0;s<n.length;s++)for(a=n[s];t.indexOf(" "+a+" ")>-1;)t=t.replace(" "+a+" "," ");o=we(t),r!==o&&this.setAttribute("class",o)}}):this):this.attr("class","")},toggleClass:function(e,n){var t,r,a,s,o=typeof e,c=o==="string"||Array.isArray(e);return I(e)?this.each(function(u){i(this).toggleClass(e.call(this,u,xe(this),n),n)}):typeof n=="boolean"&&c?n?this.addClass(e):this.removeClass(e):(t=xn(e),this.each(function(){if(c)for(s=i(this),a=0;a<t.length;a++)r=t[a],s.hasClass(r)?s.removeClass(r):s.addClass(r);else(e===void 0||o==="boolean")&&(r=xe(this),r&&x.set(this,"__className__",r),this.setAttribute&&this.setAttribute("class",r||e===!1?"":x.get(this,"__className__")||""))}))},hasClass:function(e){var n,t,r=0;for(n=" "+e+" ";t=this[r++];)if(t.nodeType===1&&(" "+we(xe(t))+" ").indexOf(n)>-1)return!0;return!1}});var mr=/\r/g;i.fn.extend({val:function(e){var n,t,r,a=this[0];return arguments.length?(r=I(e),this.each(function(s){var o;this.nodeType===1&&(r?o=e.call(this,s,i(this).val()):o=e,o==null?o="":typeof o=="number"?o+="":Array.isArray(o)&&(o=i.map(o,function(c){return c==null?"":c+""})),n=i.valHooks[this.type]||i.valHooks[this.nodeName.toLowerCase()],(!n||!("set"in n)||n.set(this,o,"value")===void 0)&&(this.value=o))})):a?(n=i.valHooks[a.type]||i.valHooks[a.nodeName.toLowerCase()],n&&"get"in n&&(t=n.get(a,"value"))!==void 0?t:(t=a.value,typeof t=="string"?t.replace(mr,""):t??"")):void 0}}),i.extend({valHooks:{option:{get:function(e){var n=i.find.attr(e,"value");return n??we(i.text(e))}},select:{get:function(e){var n,t,r,a=e.options,s=e.selectedIndex,o=e.type==="select-one",c=o?null:[],u=o?s+1:a.length;for(s<0?r=u:r=o?s:0;r<u;r++)if(t=a[r],(t.selected||r===s)&&!t.disabled&&(!t.parentNode.disabled||!K(t.parentNode,"optgroup"))){if(n=i(t).val(),o)return n;c.push(n)}return c},set:function(e,n){for(var t,r,a=e.options,s=i.makeArray(n),o=a.length;o--;)r=a[o],(r.selected=i.inArray(i.valHooks.option.get(r),s)>-1)&&(t=!0);return t||(e.selectedIndex=-1),s}}}}),i.each(["radio","checkbox"],function(){i.valHooks[this]={set:function(e,n){if(Array.isArray(n))return e.checked=i.inArray(i(e).val(),n)>-1}},B.checkOn||(i.valHooks[this].get=function(e){return e.getAttribute("value")===null?"on":e.value})});var Ye=w.location,At={guid:Date.now()},kn=/\?/;i.parseXML=function(e){var n,t;if(!e||typeof e!="string")return null;try{n=new w.DOMParser().parseFromString(e,"text/xml")}catch{}return t=n&&n.getElementsByTagName("parsererror")[0],(!n||t)&&i.error("Invalid XML: "+(t?i.map(t.childNodes,function(r){return r.textContent}).join(`
`):e)),n};var vt=/^(?:focusinfocus|focusoutblur)$/,yt=function(e){e.stopPropagation()};i.extend(i.event,{trigger:function(e,n,t,r){var a,s,o,c,u,d,_,A,f=[t||D],v=Ne.call(e,"type")?e.type:e,S=Ne.call(e,"namespace")?e.namespace.split("."):[];if(s=A=o=t=t||D,!(t.nodeType===3||t.nodeType===8)&&!vt.test(v+i.event.triggered)&&(v.indexOf(".")>-1&&(S=v.split("."),v=S.shift(),S.sort()),u=v.indexOf(":")<0&&"on"+v,e=e[i.expando]?e:new i.Event(v,typeof e=="object"&&e),e.isTrigger=r?2:3,e.namespace=S.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+S.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=t),n=n==null?[e]:i.makeArray(n,[e]),_=i.event.special[v]||{},!(!r&&_.trigger&&_.trigger.apply(t,n)===!1))){if(!r&&!_.noBubble&&!Se(t)){for(c=_.delegateType||v,vt.test(c+v)||(s=s.parentNode);s;s=s.parentNode)f.push(s),o=s;o===(t.ownerDocument||D)&&f.push(o.defaultView||o.parentWindow||w)}for(a=0;(s=f[a++])&&!e.isPropagationStopped();)A=s,e.type=a>1?c:_.bindType||v,d=(x.get(s,"events")||Object.create(null))[e.type]&&x.get(s,"handle"),d&&d.apply(s,n),d=u&&s[u],d&&d.apply&&Ve(s)&&(e.result=d.apply(s,n),e.result===!1&&e.preventDefault());return e.type=v,!r&&!e.isDefaultPrevented()&&(!_._default||_._default.apply(f.pop(),n)===!1)&&Ve(t)&&u&&I(t[v])&&!Se(t)&&(o=t[u],o&&(t[u]=null),i.event.triggered=v,e.isPropagationStopped()&&A.addEventListener(v,yt),t[v](),e.isPropagationStopped()&&A.removeEventListener(v,yt),i.event.triggered=void 0,o&&(t[u]=o)),e.result}},simulate:function(e,n,t){var r=i.extend(new i.Event,t,{type:e,isSimulated:!0});i.event.trigger(r,null,n)}}),i.fn.extend({trigger:function(e,n){return this.each(function(){i.event.trigger(e,n,this)})},triggerHandler:function(e,n){var t=this[0];if(t)return i.event.trigger(e,n,t,!0)}});var _r=/\[\]$/,bt=/\r?\n/g,gr=/^(?:submit|button|image|reset|file)$/i,Ar=/^(?:input|select|textarea|keygen)/i;function Cn(e,n,t,r){var a;if(Array.isArray(n))i.each(n,function(s,o){t||_r.test(e)?r(e,o):Cn(e+"["+(typeof o=="object"&&o!=null?s:"")+"]",o,t,r)});else if(!t&&je(n)==="object")for(a in n)Cn(e+"["+a+"]",n[a],t,r);else r(e,n)}i.param=function(e,n){var t,r=[],a=function(s,o){var c=I(o)?o():o;r[r.length]=encodeURIComponent(s)+"="+encodeURIComponent(c??"")};if(e==null)return"";if(Array.isArray(e)||e.jquery&&!i.isPlainObject(e))i.each(e,function(){a(this.name,this.value)});else for(t in e)Cn(t,e[t],n,a);return r.join("&")},i.fn.extend({serialize:function(){return i.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=i.prop(this,"elements");return e?i.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!i(this).is(":disabled")&&Ar.test(this.nodeName)&&!gr.test(e)&&(this.checked||!Fe.test(e))}).map(function(e,n){var t=i(this).val();return t==null?null:Array.isArray(t)?i.map(t,function(r){return{name:n.name,value:r.replace(bt,`\r
`)}}):{name:n.name,value:t.replace(bt,`\r
`)}}).get()}});var vr=/%20/g,yr=/#.*$/,br=/([?&])_=[^&]*/,Er=/^(.*?):[ \t]*([^\r\n]*)$/mg,Mr=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,wr=/^(?:GET|HEAD)$/,xr=/^\/\//,Et={},Sn={},Mt="*/".concat("*"),jn=D.createElement("a");jn.href=Ye.href;function wt(e){return function(n,t){typeof n!="string"&&(t=n,n="*");var r,a=0,s=n.toLowerCase().match(oe)||[];if(I(t))for(;r=s[a++];)r[0]==="+"?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(t)):(e[r]=e[r]||[]).push(t)}}function xt(e,n,t,r){var a={},s=e===Sn;function o(c){var u;return a[c]=!0,i.each(e[c]||[],function(d,_){var A=_(n,t,r);if(typeof A=="string"&&!s&&!a[A])return n.dataTypes.unshift(A),o(A),!1;if(s)return!(u=A)}),u}return o(n.dataTypes[0])||!a["*"]&&o("*")}function Dn(e,n){var t,r,a=i.ajaxSettings.flatOptions||{};for(t in n)n[t]!==void 0&&((a[t]?e:r||(r={}))[t]=n[t]);return r&&i.extend(!0,e,r),e}function kr(e,n,t){for(var r,a,s,o,c=e.contents,u=e.dataTypes;u[0]==="*";)u.shift(),r===void 0&&(r=e.mimeType||n.getResponseHeader("Content-Type"));if(r){for(a in c)if(c[a]&&c[a].test(r)){u.unshift(a);break}}if(u[0]in t)s=u[0];else{for(a in t){if(!u[0]||e.converters[a+" "+u[0]]){s=a;break}o||(o=a)}s=s||o}if(s)return s!==u[0]&&u.unshift(s),t[s]}function Cr(e,n,t,r){var a,s,o,c,u,d={},_=e.dataTypes.slice();if(_[1])for(o in e.converters)d[o.toLowerCase()]=e.converters[o];for(s=_.shift();s;)if(e.responseFields[s]&&(t[e.responseFields[s]]=n),!u&&r&&e.dataFilter&&(n=e.dataFilter(n,e.dataType)),u=s,s=_.shift(),s){if(s==="*")s=u;else if(u!=="*"&&u!==s){if(o=d[u+" "+s]||d["* "+s],!o){for(a in d)if(c=a.split(" "),c[1]===s&&(o=d[u+" "+c[0]]||d["* "+c[0]],o)){o===!0?o=d[a]:d[a]!==!0&&(s=c[0],_.unshift(c[1]));break}}if(o!==!0)if(o&&e.throws)n=o(n);else try{n=o(n)}catch(A){return{state:"parsererror",error:o?A:"No conversion from "+u+" to "+s}}}}return{state:"success",data:n}}i.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ye.href,type:"GET",isLocal:Mr.test(Ye.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Mt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":i.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,n){return n?Dn(Dn(e,i.ajaxSettings),n):Dn(i.ajaxSettings,e)},ajaxPrefilter:wt(Et),ajaxTransport:wt(Sn),ajax:function(e,n){typeof e=="object"&&(n=e,e=void 0),n=n||{};var t,r,a,s,o,c,u,d,_,A,f=i.ajaxSetup({},n),v=f.context||f,S=f.context&&(v.nodeType||v.jquery)?i(v):i.event,P=i.Deferred(),T=i.Callbacks("once memory"),Y=f.statusCode||{},F={},ue={},ce="canceled",R={readyState:0,getResponseHeader:function(q){var H;if(u){if(!s)for(s={};H=Er.exec(a);)s[H[1].toLowerCase()+" "]=(s[H[1].toLowerCase()+" "]||[]).concat(H[2]);H=s[q.toLowerCase()+" "]}return H==null?null:H.join(", ")},getAllResponseHeaders:function(){return u?a:null},setRequestHeader:function(q,H){return u==null&&(q=ue[q.toLowerCase()]=ue[q.toLowerCase()]||q,F[q]=H),this},overrideMimeType:function(q){return u==null&&(f.mimeType=q),this},statusCode:function(q){var H;if(q)if(u)R.always(q[R.status]);else for(H in q)Y[H]=[Y[H],q[H]];return this},abort:function(q){var H=q||ce;return t&&t.abort(H),ke(0,H),this}};if(P.promise(R),f.url=((e||f.url||Ye.href)+"").replace(xr,Ye.protocol+"//"),f.type=n.method||n.type||f.method||f.type,f.dataTypes=(f.dataType||"*").toLowerCase().match(oe)||[""],f.crossDomain==null){c=D.createElement("a");try{c.href=f.url,c.href=c.href,f.crossDomain=jn.protocol+"//"+jn.host!=c.protocol+"//"+c.host}catch{f.crossDomain=!0}}if(f.data&&f.processData&&typeof f.data!="string"&&(f.data=i.param(f.data,f.traditional)),xt(Et,f,n,R),u)return R;d=i.event&&f.global,d&&i.active++===0&&i.event.trigger("ajaxStart"),f.type=f.type.toUpperCase(),f.hasContent=!wr.test(f.type),r=f.url.replace(yr,""),f.hasContent?f.data&&f.processData&&(f.contentType||"").indexOf("application/x-www-form-urlencoded")===0&&(f.data=f.data.replace(vr,"+")):(A=f.url.slice(r.length),f.data&&(f.processData||typeof f.data=="string")&&(r+=(kn.test(r)?"&":"?")+f.data,delete f.data),f.cache===!1&&(r=r.replace(br,"$1"),A=(kn.test(r)?"&":"?")+"_="+At.guid+++A),f.url=r+A),f.ifModified&&(i.lastModified[r]&&R.setRequestHeader("If-Modified-Since",i.lastModified[r]),i.etag[r]&&R.setRequestHeader("If-None-Match",i.etag[r])),(f.data&&f.hasContent&&f.contentType!==!1||n.contentType)&&R.setRequestHeader("Content-Type",f.contentType),R.setRequestHeader("Accept",f.dataTypes[0]&&f.accepts[f.dataTypes[0]]?f.accepts[f.dataTypes[0]]+(f.dataTypes[0]!=="*"?", "+Mt+"; q=0.01":""):f.accepts["*"]);for(_ in f.headers)R.setRequestHeader(_,f.headers[_]);if(f.beforeSend&&(f.beforeSend.call(v,R,f)===!1||u))return R.abort();if(ce="abort",T.add(f.complete),R.done(f.success),R.fail(f.error),t=xt(Sn,f,n,R),!t)ke(-1,"No Transport");else{if(R.readyState=1,d&&S.trigger("ajaxSend",[R,f]),u)return R;f.async&&f.timeout>0&&(o=w.setTimeout(function(){R.abort("timeout")},f.timeout));try{u=!1,t.send(F,ke)}catch(q){if(u)throw q;ke(-1,q)}}function ke(q,H,ze,In){var pe,Xe,de,ye,be,re=H;u||(u=!0,o&&w.clearTimeout(o),t=void 0,a=In||"",R.readyState=q>0?4:0,pe=q>=200&&q<300||q===304,ze&&(ye=kr(f,R,ze)),!pe&&i.inArray("script",f.dataTypes)>-1&&i.inArray("json",f.dataTypes)<0&&(f.converters["text script"]=function(){}),ye=Cr(f,ye,R,pe),pe?(f.ifModified&&(be=R.getResponseHeader("Last-Modified"),be&&(i.lastModified[r]=be),be=R.getResponseHeader("etag"),be&&(i.etag[r]=be)),q===204||f.type==="HEAD"?re="nocontent":q===304?re="notmodified":(re=ye.state,Xe=ye.data,de=ye.error,pe=!de)):(de=re,(q||!re)&&(re="error",q<0&&(q=0))),R.status=q,R.statusText=(H||re)+"",pe?P.resolveWith(v,[Xe,re,R]):P.rejectWith(v,[R,re,de]),R.statusCode(Y),Y=void 0,d&&S.trigger(pe?"ajaxSuccess":"ajaxError",[R,f,pe?Xe:de]),T.fireWith(v,[R,re]),d&&(S.trigger("ajaxComplete",[R,f]),--i.active||i.event.trigger("ajaxStop")))}return R},getJSON:function(e,n,t){return i.get(e,n,t,"json")},getScript:function(e,n){return i.get(e,void 0,n,"script")}}),i.each(["get","post"],function(e,n){i[n]=function(t,r,a,s){return I(r)&&(s=s||a,a=r,r=void 0),i.ajax(i.extend({url:t,type:n,dataType:s,data:r,success:a},i.isPlainObject(t)&&t))}}),i.ajaxPrefilter(function(e){var n;for(n in e.headers)n.toLowerCase()==="content-type"&&(e.contentType=e.headers[n]||"")}),i._evalUrl=function(e,n,t){return i.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(r){i.globalEval(r,n,t)}})},i.fn.extend({wrapAll:function(e){var n;return this[0]&&(I(e)&&(e=e.call(this[0])),n=i(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&n.insertBefore(this[0]),n.map(function(){for(var t=this;t.firstElementChild;)t=t.firstElementChild;return t}).append(this)),this},wrapInner:function(e){return I(e)?this.each(function(n){i(this).wrapInner(e.call(this,n))}):this.each(function(){var n=i(this),t=n.contents();t.length?t.wrapAll(e):n.append(e)})},wrap:function(e){var n=I(e);return this.each(function(t){i(this).wrapAll(n?e.call(this,t):e)})},unwrap:function(e){return this.parent(e).not("body").each(function(){i(this).replaceWith(this.childNodes)}),this}}),i.expr.pseudos.hidden=function(e){return!i.expr.pseudos.visible(e)},i.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},i.ajaxSettings.xhr=function(){try{return new w.XMLHttpRequest}catch{}};var Sr={0:200,1223:204},Ge=i.ajaxSettings.xhr();B.cors=!!Ge&&"withCredentials"in Ge,B.ajax=Ge=!!Ge,i.ajaxTransport(function(e){var n,t;if(B.cors||Ge&&!e.crossDomain)return{send:function(r,a){var s,o=e.xhr();if(o.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(s in e.xhrFields)o[s]=e.xhrFields[s];e.mimeType&&o.overrideMimeType&&o.overrideMimeType(e.mimeType),!e.crossDomain&&!r["X-Requested-With"]&&(r["X-Requested-With"]="XMLHttpRequest");for(s in r)o.setRequestHeader(s,r[s]);n=function(c){return function(){n&&(n=t=o.onload=o.onerror=o.onabort=o.ontimeout=o.onreadystatechange=null,c==="abort"?o.abort():c==="error"?typeof o.status!="number"?a(0,"error"):a(o.status,o.statusText):a(Sr[o.status]||o.status,o.statusText,(o.responseType||"text")!=="text"||typeof o.responseText!="string"?{binary:o.response}:{text:o.responseText},o.getAllResponseHeaders()))}},o.onload=n(),t=o.onerror=o.ontimeout=n("error"),o.onabort!==void 0?o.onabort=t:o.onreadystatechange=function(){o.readyState===4&&w.setTimeout(function(){n&&t()})},n=n("abort");try{o.send(e.hasContent&&e.data||null)}catch(c){if(n)throw c}},abort:function(){n&&n()}}}),i.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),i.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return i.globalEval(e),e}}}),i.ajaxPrefilter("script",function(e){e.cache===void 0&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),i.ajaxTransport("script",function(e){if(e.crossDomain||e.scriptAttrs){var n,t;return{send:function(r,a){n=i("<script>").attr(e.scriptAttrs||{}).prop({charset:e.scriptCharset,src:e.url}).on("load error",t=function(s){n.remove(),t=null,s&&a(s.type==="error"?404:200,s.type)}),D.head.appendChild(n[0])},abort:function(){t&&t()}}}});var kt=[],Bn=/(=)\?(?=&|$)|\?\?/;i.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=kt.pop()||i.expando+"_"+At.guid++;return this[e]=!0,e}}),i.ajaxPrefilter("json jsonp",function(e,n,t){var r,a,s,o=e.jsonp!==!1&&(Bn.test(e.url)?"url":typeof e.data=="string"&&(e.contentType||"").indexOf("application/x-www-form-urlencoded")===0&&Bn.test(e.data)&&"data");if(o||e.dataTypes[0]==="jsonp")return r=e.jsonpCallback=I(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,o?e[o]=e[o].replace(Bn,"$1"+r):e.jsonp!==!1&&(e.url+=(kn.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return s||i.error(r+" was not called"),s[0]},e.dataTypes[0]="json",a=w[r],w[r]=function(){s=arguments},t.always(function(){a===void 0?i(w).removeProp(r):w[r]=a,e[r]&&(e.jsonpCallback=n.jsonpCallback,kt.push(r)),s&&I(a)&&a(s[0]),s=a=void 0}),"script"}),B.createHTMLDocument=function(){var e=D.implementation.createHTMLDocument("").body;return e.innerHTML="<form></form><form></form>",e.childNodes.length===2}(),i.parseHTML=function(e,n,t){if(typeof e!="string")return[];typeof n=="boolean"&&(t=n,n=!1);var r,a,s;return n||(B.createHTMLDocument?(n=D.implementation.createHTMLDocument(""),r=n.createElement("base"),r.href=D.location.href,n.head.appendChild(r)):n=D),a=Qn.exec(e),s=!t&&[],a?[n.createElement(a[1])]:(a=tt([e],n,s),s&&s.length&&i(s).remove(),i.merge([],a.childNodes))},i.fn.load=function(e,n,t){var r,a,s,o=this,c=e.indexOf(" ");return c>-1&&(r=we(e.slice(c)),e=e.slice(0,c)),I(n)?(t=n,n=void 0):n&&typeof n=="object"&&(a="POST"),o.length>0&&i.ajax({url:e,type:a||"GET",dataType:"html",data:n}).done(function(u){s=arguments,o.html(r?i("<div>").append(i.parseHTML(u)).find(r):u)}).always(t&&function(u,d){o.each(function(){t.apply(this,s||[u.responseText,d,u])})}),this},i.expr.pseudos.animated=function(e){return i.grep(i.timers,function(n){return e===n.elem}).length},i.offset={setOffset:function(e,n,t){var r,a,s,o,c,u,d,_=i.css(e,"position"),A=i(e),f={};_==="static"&&(e.style.position="relative"),c=A.offset(),s=i.css(e,"top"),u=i.css(e,"left"),d=(_==="absolute"||_==="fixed")&&(s+u).indexOf("auto")>-1,d?(r=A.position(),o=r.top,a=r.left):(o=parseFloat(s)||0,a=parseFloat(u)||0),I(n)&&(n=n.call(e,t,i.extend({},c))),n.top!=null&&(f.top=n.top-c.top+o),n.left!=null&&(f.left=n.left-c.left+a),"using"in n?n.using.call(e,f):A.css(f)}},i.fn.extend({offset:function(e){if(arguments.length)return e===void 0?this:this.each(function(a){i.offset.setOffset(this,e,a)});var n,t,r=this[0];if(r)return r.getClientRects().length?(n=r.getBoundingClientRect(),t=r.ownerDocument.defaultView,{top:n.top+t.pageYOffset,left:n.left+t.pageXOffset}):{top:0,left:0}},position:function(){if(this[0]){var e,n,t,r=this[0],a={top:0,left:0};if(i.css(r,"position")==="fixed")n=r.getBoundingClientRect();else{for(n=this.offset(),t=r.ownerDocument,e=r.offsetParent||t.documentElement;e&&(e===t.body||e===t.documentElement)&&i.css(e,"position")==="static";)e=e.parentNode;e&&e!==r&&e.nodeType===1&&(a=i(e).offset(),a.top+=i.css(e,"borderTopWidth",!0),a.left+=i.css(e,"borderLeftWidth",!0))}return{top:n.top-a.top-i.css(r,"marginTop",!0),left:n.left-a.left-i.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent;e&&i.css(e,"position")==="static";)e=e.offsetParent;return e||Me})}}),i.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var t=n==="pageYOffset";i.fn[e]=function(r){return _e(this,function(a,s,o){var c;if(Se(a)?c=a:a.nodeType===9&&(c=a.defaultView),o===void 0)return c?c[n]:a[s];c?c.scrollTo(t?c.pageXOffset:o,t?o:c.pageYOffset):a[s]=o},e,r,arguments.length)}}),i.each(["top","left"],function(e,n){i.cssHooks[n]=lt(B.pixelPosition,function(t,r){if(r)return r=Qe(t,n),yn.test(r)?i(t).position()[n]+"px":r})}),i.each({Height:"height",Width:"width"},function(e,n){i.each({padding:"inner"+e,content:n,"":"outer"+e},function(t,r){i.fn[r]=function(a,s){var o=arguments.length&&(t||typeof a!="boolean"),c=t||(a===!0||s===!0?"margin":"border");return _e(this,function(u,d,_){var A;return Se(u)?r.indexOf("outer")===0?u["inner"+e]:u.document.documentElement["client"+e]:u.nodeType===9?(A=u.documentElement,Math.max(u.body["scroll"+e],A["scroll"+e],u.body["offset"+e],A["offset"+e],A["client"+e])):_===void 0?i.css(u,d,c):i.style(u,d,_,c)},n,o?a:void 0,o)}})}),i.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,n){i.fn[n]=function(t){return this.on(n,t)}}),i.fn.extend({bind:function(e,n,t){return this.on(e,null,n,t)},unbind:function(e,n){return this.off(e,null,n)},delegate:function(e,n,t,r){return this.on(n,e,t,r)},undelegate:function(e,n,t){return arguments.length===1?this.off(e,"**"):this.off(n,e||"**",t)},hover:function(e,n){return this.on("mouseenter",e).on("mouseleave",n||e)}}),i.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){i.fn[n]=function(t,r){return arguments.length>0?this.on(n,null,t,r):this.trigger(n)}});var jr=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;i.proxy=function(e,n){var t,r,a;if(typeof n=="string"&&(t=e[n],n=e,e=t),!!I(e))return r=ne.call(arguments,2),a=function(){return e.apply(n||this,r.concat(ne.call(arguments)))},a.guid=e.guid=e.guid||i.guid++,a},i.holdReady=function(e){e?i.readyWait++:i.ready(!0)},i.isArray=Array.isArray,i.parseJSON=JSON.parse,i.nodeName=K,i.isFunction=I,i.isWindow=Se,i.camelCase=le,i.type=je,i.now=Date.now,i.isNumeric=function(e){var n=i.type(e);return(n==="number"||n==="string")&&!isNaN(e-parseFloat(e))},i.trim=function(e){return e==null?"":(e+"").replace(jr,"$1")};var Dr=w.jQuery,Br=w.$;return i.noConflict=function(e){return w.$===i&&(w.$=Br),e&&w.jQuery===i&&(w.jQuery=Dr),i},typeof J>"u"&&(w.jQuery=w.$=i),i})}(jquery)),jquery.exports}(function(module,exports){(function(w,J){module.exports=J(requireJquery(),reactExports)})(self,function(__WEBPACK_EXTERNAL_MODULE_jquery__,__WEBPACK_EXTERNAL_MODULE_react__){return(()=>{var __webpack_modules__={"./src/components/MapContainer/MapContainer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapContainer": () => (/* binding */ MapContainer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/MapContainer/styles.module.scss");



const MapContainer = ({
  containerRef,
  className,
  style
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  style: style,
  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(_styles_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].root, className),
  ref: containerRef
});

//# sourceURL=webpack://@react-jvectormap/core/./src/components/MapContainer/MapContainer.tsx?`)},"./src/components/MapContainer/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapContainer": () => (/* reexport safe */ _MapContainer__WEBPACK_IMPORTED_MODULE_0__.MapContainer)
/* harmony export */ });
/* harmony import */ var _MapContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapContainer */ "./src/components/MapContainer/MapContainer.tsx");


//# sourceURL=webpack://@react-jvectormap/core/./src/components/MapContainer/index.ts?`)},"./src/components/MultiMap/MultiMap.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultiMap": () => (/* binding */ MultiMap)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MapContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MapContainer */ "./src/components/MapContainer/index.ts");



const MultiMap = ({
  mapRef,
  style,
  className,
  ...props
}) => {
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    const mapContainer = containerRef.current;
    const {
      main,
      ...rest
    } = props;
    const {
      map: {
        name,
        content
      },
      ...restMain
    } = main;
    jquery__WEBPACK_IMPORTED_MODULE_1___default().fn.vectorMap("addMap", name, content);

    if (mapContainer) {
      jquery__WEBPACK_IMPORTED_MODULE_1___default()(mapContainer).multiMap({
        main: { ...restMain,
          map: name
        },
        ...rest
      });
    }
  }, [mapRef, props]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_MapContainer__WEBPACK_IMPORTED_MODULE_2__.MapContainer, {
    style: style,
    className: className,
    containerRef: containerRef
  });
};

//# sourceURL=webpack://@react-jvectormap/core/./src/components/MultiMap/MultiMap.tsx?`)},"./src/components/MultiMap/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultiMap": () => (/* reexport safe */ _MultiMap__WEBPACK_IMPORTED_MODULE_0__.MultiMap)
/* harmony export */ });
/* harmony import */ var _MultiMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MultiMap */ "./src/components/MultiMap/MultiMap.tsx");


//# sourceURL=webpack://@react-jvectormap/core/./src/components/MultiMap/index.ts?`)},"./src/components/VectorMap/VectorMap.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VectorMap": () => (/* binding */ VectorMap)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MapContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MapContainer */ "./src/components/MapContainer/index.ts");



const VectorMap = ({
  map,
  mapRef,
  style,
  className,
  series,
  ...props
}) => {
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    const mapContainer = containerRef.current;

    if (!map) {
      console.error("[react-jvectormap]: no map was loaded!");
    }

    const {
      name,
      content
    } = map;
    jquery__WEBPACK_IMPORTED_MODULE_1___default().fn.vectorMap("addMap", name, content);

    if (mapContainer) {
      jquery__WEBPACK_IMPORTED_MODULE_1___default()(mapContainer).vectorMap({
        map: name,
        series,
        ...props
      });

      if (map && (mapRef === null || mapRef === void 0 ? void 0 : mapRef.current) === null) {
        mapRef.current = jquery__WEBPACK_IMPORTED_MODULE_1___default()(mapContainer).vectorMap("get", "mapObject");
      }
    }
  }, [map, mapRef, props, series]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const mapContainer = containerRef.current;

    if (series && mapContainer) {
      const map = jquery__WEBPACK_IMPORTED_MODULE_1___default()(mapContainer).vectorMap("get", "mapObject");
      const {
        markers = [],
        regions = []
      } = series;
      regions.forEach(({
        values
      }, index) => {
        var _map$series;

        if (values && (_map$series = map.series) !== null && _map$series !== void 0 && _map$series.regions) {
          var _map$series2, _map$series2$regions$;

          (_map$series2 = map.series) === null || _map$series2 === void 0 ? void 0 : (_map$series2$regions$ = _map$series2.regions[index]) === null || _map$series2$regions$ === void 0 ? void 0 : _map$series2$regions$.clearAndSet(values);
        }
      });
      markers.forEach(({
        values
      }, index) => {
        var _map$series3;

        if (values && (_map$series3 = map.series) !== null && _map$series3 !== void 0 && _map$series3.markers) {
          var _map$series4, _map$series4$markers$;

          (_map$series4 = map.series) === null || _map$series4 === void 0 ? void 0 : (_map$series4$markers$ = _map$series4.markers[index]) === null || _map$series4$markers$ === void 0 ? void 0 : _map$series4$markers$.clearAndSet(values);
        }
      });
    }
  }, [series]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_MapContainer__WEBPACK_IMPORTED_MODULE_2__.MapContainer, {
    className: className,
    style: style,
    containerRef: containerRef
  });
};

//# sourceURL=webpack://@react-jvectormap/core/./src/components/VectorMap/VectorMap.tsx?`)},"./src/components/VectorMap/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VectorMap": () => (/* reexport safe */ _VectorMap__WEBPACK_IMPORTED_MODULE_0__.VectorMap)
/* harmony export */ });
/* harmony import */ var _VectorMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VectorMap */ "./src/components/VectorMap/VectorMap.tsx");


//# sourceURL=webpack://@react-jvectormap/core/./src/components/VectorMap/index.ts?`)},"./src/components/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VectorMap": () => (/* reexport safe */ _VectorMap__WEBPACK_IMPORTED_MODULE_0__.VectorMap),
/* harmony export */   "MultiMap": () => (/* reexport safe */ _MultiMap__WEBPACK_IMPORTED_MODULE_1__.MultiMap)
/* harmony export */ });
/* harmony import */ var _VectorMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VectorMap */ "./src/components/VectorMap/index.ts");
/* harmony import */ var _MultiMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MultiMap */ "./src/components/MultiMap/index.ts");



//# sourceURL=webpack://@react-jvectormap/core/./src/components/index.ts?`)},"./src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultiMap": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_2__.MultiMap),
/* harmony export */   "VectorMap": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_2__.VectorMap),
/* harmony export */   "AttributeSeriesBuilder": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.AttributeSeriesBuilder),
/* harmony export */   "LabelsBuilder": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.LabelsBuilder),
/* harmony export */   "LabelsPropsBuilder": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.LabelsPropsBuilder),
/* harmony export */   "MarkerBuilder": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.MarkerBuilder),
/* harmony export */   "MultiMapBuilder": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.MultiMapBuilder),
/* harmony export */   "SeriesBuilder": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.SeriesBuilder),
/* harmony export */   "StyleBuilder": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.StyleBuilder),
/* harmony export */   "VectorMapBuilder": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.VectorMapBuilder)
/* harmony export */ });
/* harmony import */ var _react_jvectormap_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @react-jvectormap/lib */ "../jvectormap/index.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components */ "./src/components/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/utils/index.ts");




(0,_react_jvectormap_lib__WEBPACK_IMPORTED_MODULE_0__.loadJVectorMap)((jquery__WEBPACK_IMPORTED_MODULE_1___default()));

//# sourceURL=webpack://@react-jvectormap/core/./src/index.ts?`)},"./src/utils/builders/AttributeSeriesBuilder.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttributeSeriesBuilder": () => (/* binding */ AttributeSeriesBuilder)
/* harmony export */ });
class AttributeSeriesBuilder {
  constructor(attribute) {
    this.attribute = attribute;
  }
  /**
   *
   * @param value
   */


  setAttribute(value) {
    this.attribute = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setScale(value) {
    this.scale = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setValues(value) {
    this.values = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setNormalizeFunction(value) {
    this.normalizeFunction = value;
    return this;
  }

  build() {
    return {
      scale: this.scale,
      values: this.values,
      attribute: this.attribute,
      normalizeFunction: this.normalizeFunction
    };
  }

}

//# sourceURL=webpack://@react-jvectormap/core/./src/utils/builders/AttributeSeriesBuilder.ts?`)},"./src/utils/builders/LabelsBuilder.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LabelsBuilder": () => (/* binding */ LabelsBuilder)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils/builders/utils.ts");

class LabelsBuilder {
  /**
   *
   * @param values
   */
  addMarkersLabelProps(...values) {
    if (!this.markers) {
      this.markers = [];
    }

    this.markers.push(...values);
    return this;
  }
  /**
   *
   * @param values
   */


  addRegionsLabelProps(...values) {
    if (!this.regions) {
      this.regions = [];
    }

    this.regions.push(...values);
    return this;
  }

  build() {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.stripUndefinedValues)({
      markers: this.markers,
      regions: this.regions
    });
  }

}

//# sourceURL=webpack://@react-jvectormap/core/./src/utils/builders/LabelsBuilder.ts?`)},"./src/utils/builders/LabelsPropsBuilder.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LabelsPropsBuilder": () => (/* binding */ LabelsPropsBuilder)
/* harmony export */ });
class LabelsPropsBuilder {
  constructor(render, offsets) {
    this.render = render;
    this.offsets = offsets;
  }
  /**
   *
   * @param render
   */


  setRender(render) {
    this.render = render;
    return this;
  }
  /**
   *
   * @param offsets
   */


  setOffsets(offsets) {
    this.offsets = offsets;
    return this;
  }
  /**
   *
   */


  build() {
    return {
      render: this.render,
      offsets: this.offsets
    };
  }

}

//# sourceURL=webpack://@react-jvectormap/core/./src/utils/builders/LabelsPropsBuilder.ts?`)},"./src/utils/builders/MarkerBuilder.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MarkerBuilder": () => (/* binding */ MarkerBuilder)
/* harmony export */ });
class MarkerBuilder {
  constructor(value) {
    this.name = value;
  }
  /**
   *
   * @param value
   */


  setName(value) {
    this.name = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setCoords(value) {
    this.latLng = undefined;
    this.coords = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setLatLng(value) {
    this.coords = undefined;
    this.latLng = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setStyle(value) {
    this.style = value;
    return this;
  }
  /**
   *
   */


  build() {
    const commonProps = {
      name: this.name,
      style: this.style
    };

    if (this.coords) {
      return { ...commonProps,
        coords: this.coords
      };
    } else if (this.latLng) {
      return { ...commonProps,
        latLng: this.latLng
      };
    }

    return { ...commonProps,
      latLng: [0, 0]
    };
  }

}

//# sourceURL=webpack://@react-jvectormap/core/./src/utils/builders/MarkerBuilder.ts?`)},"./src/utils/builders/MultiMapBuilder.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultiMapBuilder": () => (/* binding */ MultiMapBuilder)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils/builders/utils.ts");

class MultiMapBuilder {
  constructor(mainMap, maxLevel = 1) {
    this.main = {
      map: mainMap
    };
    this.maxLevel = maxLevel;
  }
  /**
   *
   * @param value
   */


  setMainMap(value) {
    this.main.map = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setMaxLevel(value) {
    this.maxLevel = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setMapNameByCode(value) {
    this.mapNameByCode = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setUrlByCode(value) {
    this.mapUrlByCode = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setGetDrillDownMap(value) {
    this.getDrillDownMap = value;
    return this;
  }

  build() {
    const baseProps = {
      main: this.main,
      maxLevel: this.maxLevel
    };
    return { ...baseProps,
      ...(0,_utils__WEBPACK_IMPORTED_MODULE_0__.stripUndefinedValues)({
        mapNameByCode: this.mapNameByCode,
        mapUrlByCode: this.mapUrlByCode,
        getDrillDownMap: this.getDrillDownMap
      })
    };
  }

}

//# sourceURL=webpack://@react-jvectormap/core/./src/utils/builders/MultiMapBuilder.ts?`)},"./src/utils/builders/SeriesBuilder.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SeriesBuilder": () => (/* binding */ SeriesBuilder)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils/builders/utils.ts");

class SeriesBuilder {
  /**
   *
   * @param values
   */
  addMarkersSeries(...values) {
    if (!this.markers) {
      this.markers = [];
    }

    this.markers.push(...values);
    return this;
  }
  /**
   *
   * @param values
   */


  addRegionsSeries(...values) {
    if (!this.regions) {
      this.regions = [];
    }

    this.regions.push(...values);
    return this;
  }

  build() {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.stripUndefinedValues)({
      markers: this.markers,
      regions: this.regions
    });
  }

}

//# sourceURL=webpack://@react-jvectormap/core/./src/utils/builders/SeriesBuilder.ts?`)},"./src/utils/builders/StyleBuilder.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyleBuilder": () => (/* binding */ StyleBuilder)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils/builders/utils.ts");

class StyleBuilder {
  /**
   *
   * @param value
   */
  setInitial(value) {
    this.initial = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setSelected(value) {
    this.selected = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setHover(value) {
    this.hover = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setSelectedHover(value) {
    this.selectedHover = value;
    return this;
  }

  build() {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.stripUndefinedValues)({
      selected: this.selected,
      selectedHover: this.selectedHover,
      hover: this.hover,
      initial: this.initial
    });
  }

}

//# sourceURL=webpack://@react-jvectormap/core/./src/utils/builders/StyleBuilder.ts?`)},"./src/utils/builders/VectorMapBuilder.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VectorMapBuilder": () => (/* binding */ VectorMapBuilder)
/* harmony export */ });
class VectorMapBuilder {
  selectedRegions = [];

  constructor(map) {
    this.map = map;
  }
  /**
   *
   * @param value
   */


  setMap(value) {
    this.map = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setBackgroundColor(value) {
    this.backgroundColor = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setZoomMin(value) {
    this.zoomMin = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setZoomMax(value) {
    this.zoomMax = value;
    return this;
  }
  /**
   *
   * @param marker
   */


  addMarker(marker) {
    if (!this.markers) {
      this.markers = [];
    }

    this.markers.push(marker);
    return this;
  }
  /**
   *
   * @param value
   */


  setMarkerStyle(value) {
    this.markerStyle = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setRegionStyle(value) {
    this.regionStyle = value;
    return this;
  }
  /**
   *
   * @param value
   * @private
   */


  setMarkersSelectable(value) {
    this.markersSelectable = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setMarkers(value) {
    this.markers = value;
    return this;
  }
  /**
   *
   * @private
   * @param value
   */


  setRegionsSelectable(value) {
    this.regionsSelectable = value;
    return this;
  }
  /**
   *
   * @private
   * @param value
   */


  setOnRegionTipShow(value) {
    this.onRegionTipShow = value;
    return this;
  }
  /**
   *
   * @param value
   */


  setSeries(value) {
    this.series = value;
    return this;
  }
  /**
   *
   * @param values
   */


  setLabels(values) {
    this.labels = values;
    return this;
  }
  /**
   *
   * @param value
   */


  setSelectedRegions(value) {
    this.selectedRegions = value;
    return this;
  }
  /**
   *
   */


  build() {
    return {
      map: this.map,
      series: this.series,
      backgroundColor: this.backgroundColor,
      zoomMax: this.zoomMax,
      zoomMin: this.zoomMin,
      markerStyle: this.markerStyle,
      regionStyle: this.regionStyle,
      markersSelectable: this.markersSelectable,
      regionsSelectable: this.regionsSelectable,
      markers: this.markers,
      labels: this.labels,
      selectedRegions: this.selectedRegions
    };
  }

}

//# sourceURL=webpack://@react-jvectormap/core/./src/utils/builders/VectorMapBuilder.ts?`)},"./src/utils/builders/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VectorMapBuilder": () => (/* reexport safe */ _VectorMapBuilder__WEBPACK_IMPORTED_MODULE_0__.VectorMapBuilder),
/* harmony export */   "MarkerBuilder": () => (/* reexport safe */ _MarkerBuilder__WEBPACK_IMPORTED_MODULE_1__.MarkerBuilder),
/* harmony export */   "StyleBuilder": () => (/* reexport safe */ _StyleBuilder__WEBPACK_IMPORTED_MODULE_2__.StyleBuilder),
/* harmony export */   "AttributeSeriesBuilder": () => (/* reexport safe */ _AttributeSeriesBuilder__WEBPACK_IMPORTED_MODULE_3__.AttributeSeriesBuilder),
/* harmony export */   "SeriesBuilder": () => (/* reexport safe */ _SeriesBuilder__WEBPACK_IMPORTED_MODULE_4__.SeriesBuilder),
/* harmony export */   "LabelsBuilder": () => (/* reexport safe */ _LabelsBuilder__WEBPACK_IMPORTED_MODULE_5__.LabelsBuilder),
/* harmony export */   "LabelsPropsBuilder": () => (/* reexport safe */ _LabelsPropsBuilder__WEBPACK_IMPORTED_MODULE_6__.LabelsPropsBuilder),
/* harmony export */   "MultiMapBuilder": () => (/* reexport safe */ _MultiMapBuilder__WEBPACK_IMPORTED_MODULE_7__.MultiMapBuilder)
/* harmony export */ });
/* harmony import */ var _VectorMapBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VectorMapBuilder */ "./src/utils/builders/VectorMapBuilder.ts");
/* harmony import */ var _MarkerBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MarkerBuilder */ "./src/utils/builders/MarkerBuilder.ts");
/* harmony import */ var _StyleBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StyleBuilder */ "./src/utils/builders/StyleBuilder.ts");
/* harmony import */ var _AttributeSeriesBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AttributeSeriesBuilder */ "./src/utils/builders/AttributeSeriesBuilder.ts");
/* harmony import */ var _SeriesBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SeriesBuilder */ "./src/utils/builders/SeriesBuilder.ts");
/* harmony import */ var _LabelsBuilder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LabelsBuilder */ "./src/utils/builders/LabelsBuilder.ts");
/* harmony import */ var _LabelsPropsBuilder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./LabelsPropsBuilder */ "./src/utils/builders/LabelsPropsBuilder.ts");
/* harmony import */ var _MultiMapBuilder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MultiMapBuilder */ "./src/utils/builders/MultiMapBuilder.ts");









//# sourceURL=webpack://@react-jvectormap/core/./src/utils/builders/index.ts?`)},"./src/utils/builders/utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stripUndefinedValues": () => (/* binding */ stripUndefinedValues)
/* harmony export */ });
/**
 * remove undefined values from object
 * @param object
 */
const stripUndefinedValues = object => Object.fromEntries(Object.entries(object).filter(entry => entry[1] !== undefined));

//# sourceURL=webpack://@react-jvectormap/core/./src/utils/builders/utils.ts?`)},"./src/utils/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttributeSeriesBuilder": () => (/* reexport safe */ _builders__WEBPACK_IMPORTED_MODULE_0__.AttributeSeriesBuilder),
/* harmony export */   "LabelsBuilder": () => (/* reexport safe */ _builders__WEBPACK_IMPORTED_MODULE_0__.LabelsBuilder),
/* harmony export */   "LabelsPropsBuilder": () => (/* reexport safe */ _builders__WEBPACK_IMPORTED_MODULE_0__.LabelsPropsBuilder),
/* harmony export */   "MarkerBuilder": () => (/* reexport safe */ _builders__WEBPACK_IMPORTED_MODULE_0__.MarkerBuilder),
/* harmony export */   "MultiMapBuilder": () => (/* reexport safe */ _builders__WEBPACK_IMPORTED_MODULE_0__.MultiMapBuilder),
/* harmony export */   "SeriesBuilder": () => (/* reexport safe */ _builders__WEBPACK_IMPORTED_MODULE_0__.SeriesBuilder),
/* harmony export */   "StyleBuilder": () => (/* reexport safe */ _builders__WEBPACK_IMPORTED_MODULE_0__.StyleBuilder),
/* harmony export */   "VectorMapBuilder": () => (/* reexport safe */ _builders__WEBPACK_IMPORTED_MODULE_0__.VectorMapBuilder)
/* harmony export */ });
/* harmony import */ var _builders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./builders */ "./src/utils/builders/index.ts");


//# sourceURL=webpack://@react-jvectormap/core/./src/utils/index.ts?`)},"../../node_modules/classnames/index.js":(module,exports)=>{eval(`var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


//# sourceURL=webpack://@react-jvectormap/core/../../node_modules/classnames/index.js?`)},"../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./src/components/MapContainer/styles.module.scss":(module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "../../node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! data:image/gif;base64,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 */ "data:image/gif;base64,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"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".jvectormap-tip {\\n  position: absolute;\\n  display: none;\\n  border: solid 1px #cdcdcd;\\n  border-radius: 3px;\\n  background: #292929;\\n  color: white;\\n  font-family: sans-serif, Verdana;\\n  font-size: smaller;\\n  padding: 3px;\\n}\\n\\n._u5cITtZnGk9D_6uoElx {\\n  height: 100%;\\n  width: 100%;\\n}\\n._u5cITtZnGk9D_6uoElx svg {\\n  touch-action: none;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-container {\\n  width: 100%;\\n  height: 100%;\\n  position: relative;\\n  overflow: hidden;\\n  touch-action: none;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-zoomin {\\n  position: absolute;\\n  left: 10px;\\n  border-radius: 3px;\\n  background: #292929;\\n  padding: 3px;\\n  color: white;\\n  cursor: pointer;\\n  line-height: 10px;\\n  text-align: center;\\n  box-sizing: content-box;\\n  width: 10px;\\n  height: 10px;\\n  top: 10px;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-zoomout {\\n  position: absolute;\\n  left: 10px;\\n  border-radius: 3px;\\n  background: #292929;\\n  padding: 3px;\\n  color: white;\\n  cursor: pointer;\\n  line-height: 10px;\\n  text-align: center;\\n  box-sizing: content-box;\\n  width: 10px;\\n  height: 10px;\\n  top: 30px;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-goback {\\n  position: absolute;\\n  left: 10px;\\n  border-radius: 3px;\\n  background: #292929;\\n  color: white;\\n  cursor: pointer;\\n  line-height: 10px;\\n  text-align: center;\\n  box-sizing: content-box;\\n  bottom: 10px;\\n  z-index: 1000;\\n  padding: 6px;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-spinner {\\n  position: absolute;\\n  left: 0;\\n  top: 0;\\n  right: 0;\\n  bottom: 0;\\n  background: center no-repeat url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-legend-title {\\n  font-weight: bold;\\n  font-size: 14px;\\n  text-align: center;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-legend-cnt {\\n  position: absolute;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-legend-cnt-h {\\n  bottom: 0;\\n  right: 0;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-legend-cnt-h .jvectormap-legend {\\n  float: left;\\n  margin: 0 10px 10px 0;\\n  padding: 3px 3px 1px 3px;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-legend-cnt-h .jvectormap-legend .jvectormap-legend-tick {\\n  float: left;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-legend-cnt-h .jvectormap-legend-tick {\\n  width: 40px;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-legend-cnt-h .jvectormap-legend-tick-sample {\\n  height: 15px;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-legend-cnt-h .jvectormap-legend-tick-text {\\n  text-align: center;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-legend-cnt-v {\\n  top: 0;\\n  right: 0;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-legend-cnt-v .jvectormap-legend {\\n  margin: 10px 10px 0 0;\\n  padding: 3px;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-legend-cnt-v .jvectormap-legend-tick-sample {\\n  height: 20px;\\n  width: 20px;\\n  display: inline-block;\\n  vertical-align: middle;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-legend-cnt-v .jvectormap-legend-tick-text {\\n  display: inline-block;\\n  vertical-align: middle;\\n  line-height: 20px;\\n  padding-left: 3px;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-legend {\\n  background: black;\\n  color: white;\\n  border-radius: 3px;\\n}\\n._u5cITtZnGk9D_6uoElx .jvectormap-legend-tick-text {\\n  font-size: 12px;\\n}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"root": "_u5cITtZnGk9D_6uoElx"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


//# sourceURL=webpack://@react-jvectormap/core/./src/components/MapContainer/styles.module.scss?../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js`)},"../../node_modules/css-loader/dist/runtime/api.js":module=>{eval(`

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var _i = 0; _i < this.length; _i++) {
        var id = this[_i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i2 = 0; _i2 < modules.length; _i2++) {
      var item = [].concat(modules[_i2]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

//# sourceURL=webpack://@react-jvectormap/core/../../node_modules/css-loader/dist/runtime/api.js?`)},"../../node_modules/css-loader/dist/runtime/getUrl.js":module=>{eval(`

module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {
    return "\\"".concat(url.replace(/"/g, '\\\\"').replace(/\\n/g, "\\\\n"), "\\"");
  }

  return url;
};

//# sourceURL=webpack://@react-jvectormap/core/../../node_modules/css-loader/dist/runtime/getUrl.js?`)},"../../node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{eval(`

module.exports = function (i) {
  return i[1];
};

//# sourceURL=webpack://@react-jvectormap/core/../../node_modules/css-loader/dist/runtime/noSourceMaps.js?`)},"./src/components/MapContainer/styles.module.scss":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/dist/cjs.js!./styles.module.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./src/components/MapContainer/styles.module.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


//# sourceURL=webpack://@react-jvectormap/core/./src/components/MapContainer/styles.module.scss?`)},"../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":module=>{eval(`

var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

//# sourceURL=webpack://@react-jvectormap/core/../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?`)},"../../node_modules/style-loader/dist/runtime/insertBySelector.js":module=>{eval(`

var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

//# sourceURL=webpack://@react-jvectormap/core/../../node_modules/style-loader/dist/runtime/insertBySelector.js?`)},"../../node_modules/style-loader/dist/runtime/insertStyleElement.js":module=>{eval(`

/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

//# sourceURL=webpack://@react-jvectormap/core/../../node_modules/style-loader/dist/runtime/insertStyleElement.js?`)},"../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval(`

/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

//# sourceURL=webpack://@react-jvectormap/core/../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?`)},"../../node_modules/style-loader/dist/runtime/styleDomAPI.js":module=>{eval(`

/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

//# sourceURL=webpack://@react-jvectormap/core/../../node_modules/style-loader/dist/runtime/styleDomAPI.js?`)},"../../node_modules/style-loader/dist/runtime/styleTagTransform.js":module=>{eval(`

/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

//# sourceURL=webpack://@react-jvectormap/core/../../node_modules/style-loader/dist/runtime/styleTagTransform.js?`)},"../jquery-mousewheel/jquery.mousewheel.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadJQueryMouseWheel": () => (/* binding */ loadJQueryMouseWheel)
/* harmony export */ });
/*!
 * jQuery Mousewheel 3.1.13
 * Copyright OpenJS Foundation and other contributors
 */

const loadJQueryMouseWheel = ($) =>
  (function (factory) {
    factory($);
  })(function ($) {
    var toFix = [
        "wheel",
        "mousewheel",
        "DOMMouseScroll",
        "MozMousePixelScroll",
      ],
      toBind =
        "onwheel" in window.document || window.document.documentMode >= 9
          ? ["wheel"]
          : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
      slice = Array.prototype.slice,
      nullLowestDeltaTimeout,
      lowestDelta;

    if ($.event.fixHooks) {
      for (var i = toFix.length; i; ) {
        $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
      }
    }

    var special = ($.event.special.mousewheel = {
      version: "3.1.12",

      setup: function () {
        if (this.addEventListener) {
          for (var i = toBind.length; i; ) {
            this.addEventListener(toBind[--i], handler, false);
          }
        } else {
          this.onmousewheel = handler;
        }

        // Store the line height and page height for this particular element
        $.data(this, "mousewheel-line-height", special.getLineHeight(this));
        $.data(this, "mousewheel-page-height", special.getPageHeight(this));
      },

      teardown: function () {
        if (this.removeEventListener) {
          for (var i = toBind.length; i; ) {
            this.removeEventListener(toBind[--i], handler, false);
          }
        } else {
          this.onmousewheel = null;
        }

        // Clean up the data we added to the element
        $.removeData(this, "mousewheel-line-height");
        $.removeData(this, "mousewheel-page-height");
      },

      getLineHeight: function (elem) {
        var $elem = $(elem),
          $parent = $elem["offsetParent" in $.fn ? "offsetParent" : "parent"]();
        if (!$parent.length) {
          $parent = $("body");
        }
        return (
          parseInt($parent.css("fontSize"), 10) ||
          parseInt($elem.css("fontSize"), 10) ||
          16
        );
      },

      getPageHeight: function (elem) {
        return $(elem).height();
      },

      settings: {
        adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
        normalizeOffset: true, // calls getBoundingClientRect for each event
      },
    });

    $.fn.extend({
      mousewheel: function (fn) {
        return fn ? this.on("mousewheel", fn) : this.trigger("mousewheel");
      },

      unmousewheel: function (fn) {
        return this.off("mousewheel", fn);
      },
    });

    function handler(event) {
      var orgEvent = event || window.event,
        args = slice.call(arguments, 1),
        delta = 0,
        deltaX = 0,
        deltaY = 0,
        absDelta = 0;
      event = $.event.fix(orgEvent);
      event.type = "mousewheel";

      // Old school scrollwheel delta
      if ("detail" in orgEvent) {
        deltaY = orgEvent.detail * -1;
      }
      if ("wheelDelta" in orgEvent) {
        deltaY = orgEvent.wheelDelta;
      }
      if ("wheelDeltaY" in orgEvent) {
        deltaY = orgEvent.wheelDeltaY;
      }
      if ("wheelDeltaX" in orgEvent) {
        deltaX = orgEvent.wheelDeltaX * -1;
      }

      // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
      if ("axis" in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
        deltaX = deltaY * -1;
        deltaY = 0;
      }

      // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
      delta = deltaY === 0 ? deltaX : deltaY;

      // New school wheel delta (wheel event)
      if ("deltaY" in orgEvent) {
        deltaY = orgEvent.deltaY * -1;
        delta = deltaY;
      }
      if ("deltaX" in orgEvent) {
        deltaX = orgEvent.deltaX;
        if (deltaY === 0) {
          delta = deltaX * -1;
        }
      }

      // No change actually happened, no reason to go any further
      if (deltaY === 0 && deltaX === 0) {
        return;
      }

      // Need to convert lines and pages to pixels if we aren't already in pixels
      // There are three delta modes:
      //   * deltaMode 0 is by pixels, nothing to do
      //   * deltaMode 1 is by lines
      //   * deltaMode 2 is by pages
      if (orgEvent.deltaMode === 1) {
        var lineHeight = $.data(this, "mousewheel-line-height");
        delta *= lineHeight;
        deltaY *= lineHeight;
        deltaX *= lineHeight;
      } else if (orgEvent.deltaMode === 2) {
        var pageHeight = $.data(this, "mousewheel-page-height");
        delta *= pageHeight;
        deltaY *= pageHeight;
        deltaX *= pageHeight;
      }

      // Store lowest absolute delta to normalize the delta values
      absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

      if (!lowestDelta || absDelta < lowestDelta) {
        lowestDelta = absDelta;

        // Adjust older deltas if necessary
        if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
          lowestDelta /= 40;
        }
      }

      // Adjust older deltas if necessary
      if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
        // Divide all the things by 40!
        delta /= 40;
        deltaX /= 40;
        deltaY /= 40;
      }

      // Get a whole, normalized value for the deltas
      delta = Math[delta >= 1 ? "floor" : "ceil"](delta / lowestDelta);
      deltaX = Math[deltaX >= 1 ? "floor" : "ceil"](deltaX / lowestDelta);
      deltaY = Math[deltaY >= 1 ? "floor" : "ceil"](deltaY / lowestDelta);

      // Normalise offsetX and offsetY properties
      if (special.settings.normalizeOffset && this.getBoundingClientRect) {
        var boundingRect = this.getBoundingClientRect();
        event.offsetX = event.clientX - boundingRect.left;
        event.offsetY = event.clientY - boundingRect.top;
      }

      // Add information to the event object
      event.deltaX = deltaX;
      event.deltaY = deltaY;
      event.deltaFactor = lowestDelta;

      // Go ahead and set deltaMode to 0 since we converted to pixels
      // Although this is a little odd since we overwrite the deltaX/Y
      // properties with normalized deltas.
      event.deltaMode = 0;

      // Add event and delta to the front of the arguments
      args.unshift(event, delta, deltaX, deltaY);

      // Clearout lowestDelta after sometime to better
      // handle multiple device types that give different
      // a different lowestDelta
      // Ex: trackpad = 3 and mouse wheel = 120
      if (nullLowestDeltaTimeout) {
        window.clearTimeout(nullLowestDeltaTimeout);
      }
      nullLowestDeltaTimeout = window.setTimeout(nullLowestDelta, 200);

      return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
      lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
      // If this is an older event and the delta is divisable by 120,
      // then we are assuming that the browser is treating this as an
      // older mouse wheel event and that we should divide the deltas
      // by 40 to try and get a more usable deltaFactor.
      // Side note, this actually impacts the reported scroll distance
      // in older browsers and can cause scrolling to be slower than native.
      // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
      return (
        special.settings.adjustOldDeltas &&
        orgEvent.type === "mousewheel" &&
        absDelta % 120 === 0
      );
    }
  });


//# sourceURL=webpack://@react-jvectormap/core/../jquery-mousewheel/jquery.mousewheel.js?`)},"../jvectormap/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadJVectorMap": () => (/* reexport safe */ _jquery_jvectormap_min__WEBPACK_IMPORTED_MODULE_0__.loadJVectorMap)
/* harmony export */ });
/* harmony import */ var _jquery_jvectormap_min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jquery.jvectormap.min */ "../jvectormap/jquery.jvectormap.min.js");



//# sourceURL=webpack://@react-jvectormap/core/../jvectormap/index.js?`)},"../jvectormap/jquery.jvectormap.min.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadJVectorMap": () => (/* binding */ loadJVectorMap)
/* harmony export */ });
/* harmony import */ var _react_jvectormap_jquery_mousewheel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @react-jvectormap/jquery-mousewheel */ "../jquery-mousewheel/jquery.mousewheel.js");


/**
 * jVectorMap version 2.0.5
 *
 * Copyright 2011-2014, Kirill Lebedev
 *
 * inspired from: https://github.com/alex-pex/jvectormap/blob/master/jvectormap-next/src/jquery-jvectormap.js
 */
const loadJVectorMap = ($) =>
  (function (factory) {
    factory($);
  })(function ($) {
    (0,_react_jvectormap_jquery_mousewheel__WEBPACK_IMPORTED_MODULE_0__.loadJQueryMouseWheel)($);
    jvm.$ = $;
    window.jvm = jvm;

    const apiParams = {
      set: {
        colors: 1,
        values: 1,
        backgroundColor: 1,
        scaleColors: 1,
        normalizeFunction: 1,
        focus: 1,
      },
      get: {
        selectedRegions: 1,
        selectedMarkers: 1,
        mapObject: 1,
        regionName: 1,
      },
    };

    $.fn.multiMap = function (options) {
      options.container = this;
      new jvm.MultiMap(options);
      return this;
    };

    $.fn.vectorMap = function (options) {
      let map, methodName;
      map = this.children(".jvectormap-container").data("mapObject");
      if (options === "remove") {
        this.remove();
      } else if (options === "addMap") {
        jvm.Map.maps[arguments[1]] = arguments[2];
      } else if (
        (options === "set" || options === "get") &&
        apiParams[options][arguments[1]]
      ) {
        methodName =
          arguments[1].charAt(0).toUpperCase() + arguments[1].substr(1);
        return map[options + methodName].apply(
          map,
          Array.prototype.slice.call(arguments, 2),
        );
      } else if (!map) {
        options = options || {};
        options.container = this;
        map = new jvm.Map(options);
      }

      return this;
    };
  });
/**
 * @namespace jvm Holds core methods and classes used by jVectorMap.
 */
var jvm = {
  /**
   * Inherits child's prototype from the parent's one.
   * @param {Function} child
   * @param {Function} parent
   */
  inherits: function (child, parent) {
    function temp() {}
    temp.prototype = parent.prototype;
    child.prototype = new temp();
    child.prototype.constructor = child;
    child.parentClass = parent;
  },

  /**
   * Mixes in methods from the source constructor to the target one.
   * @param {Function} target
   * @param {Function} source
   */
  mixin: function (target, source) {
    var prop;

    for (prop in source.prototype) {
      if (source.prototype.hasOwnProperty(prop)) {
        target.prototype[prop] = source.prototype[prop];
      }
    }
  },

  min: function (values) {
    var min = Number.MAX_VALUE,
      i;

    if (values instanceof Array) {
      for (i = 0; i < values.length; i++) {
        if (values[i] < min) {
          min = values[i];
        }
      }
    } else {
      for (i in values) {
        if (values[i] < min) {
          min = values[i];
        }
      }
    }
    return min;
  },

  max: function (values) {
    var max = Number.MIN_VALUE,
      i;

    if (values instanceof Array) {
      for (i = 0; i < values.length; i++) {
        if (values[i] > max) {
          max = values[i];
        }
      }
    } else {
      for (i in values) {
        if (values[i] > max) {
          max = values[i];
        }
      }
    }
    return max;
  },

  keys: function (object) {
    var keys = [],
      key;

    for (key in object) {
      keys.push(key);
    }
    return keys;
  },

  values: function (object) {
    var values = [],
      key,
      i;

    for (i = 0; i < arguments.length; i++) {
      object = arguments[i];
      for (key in object) {
        values.push(object[key]);
      }
    }
    return values;
  },

  whenImageLoaded: function (url) {
    var deferred = new jvm.$.Deferred(),
      img = jvm.$("<img/>");

    img
      .on("error", function () {
        deferred.reject();
      })
      .on("load", function () {
        deferred.resolve(img);
      });
    img.attr("src", url);

    return deferred;
  },

  isImageUrl: function (s) {
    return /\\.\\w{3,4}$/.test(s);
  },
};

/**
 * indexOf polyfill for IE < 9
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 */
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement, fromIndex) {
    var k;

    // 1. Let O be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of O with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}
/**
 * Basic wrapper for DOM element.
 * @constructor
 * @param {String} name Tag name of the element
 * @param {Object} config Set of parameters to initialize element with
 */
jvm.AbstractElement = function(name, config){
  /**
   * Underlying DOM element
   * @type {DOMElement}
   * @private
   */
  this.node = this.createElement(name);

  /**
   * Name of underlying element
   * @type {String}
   * @private
   */
  this.name = name;

  /**
   * Internal store of attributes
   * @type {Object}
   * @private
   */
  this.properties = {};

  if (config) {
    this.set(config);
  }
};

/**
 * Set attribute of the underlying DOM element.
 * @param {String} name Name of attribute
 * @param {Number|String} config Set of parameters to initialize element with
 */
jvm.AbstractElement.prototype.set = function(property, value){
  var key;

  if (typeof property === 'object') {
    for (key in property) {
      this.properties[key] = property[key];
      this.applyAttr(key, property[key]);
    }
  } else {
    this.properties[property] = value;
    this.applyAttr(property, value);
  }
};

/**
 * Returns value of attribute.
 * @param {String} name Name of attribute
 */
jvm.AbstractElement.prototype.get = function(property){
  return this.properties[property];
};

/**
 * Applies attribute value to the underlying DOM element.
 * @param {String} name Name of attribute
 * @param {Number|String} config Value of attribute to apply
 * @private
 */
jvm.AbstractElement.prototype.applyAttr = function(property, value){
  if (!Number.isNaN(value)) {
    this.node.setAttribute(property, value);
  }
};

jvm.AbstractElement.prototype.remove = function(){
  jvm.$(this.node).remove();
};/**
 * Implements abstract vector canvas.
 * @constructor
 * @param {HTMLElement} container Container to put element to.
 * @param {Number} width Width of canvas.
 * @param {Number} height Height of canvas.
 */
jvm.AbstractCanvasElement = function(container, width, height){
  this.container = container;
  this.setSize(width, height);
  this.rootElement = new jvm[this.classPrefix+'GroupElement']();
  this.node.appendChild( this.rootElement.node );
  this.container.appendChild(this.node);
}

/**
 * Add element to the certain group inside of the canvas.
 * @param {HTMLElement} element Element to add to canvas.
 * @param {HTMLElement} group Group to add element into or into root group if not provided.
 */
jvm.AbstractCanvasElement.prototype.add = function(element, group){
  group = group || this.rootElement;
  group.add(element);
  element.canvas = this;
}

/**
 * Create path and add it to the canvas.
 * @param {Object} config Parameters of path to create.
 * @param {Object} style Styles of the path to create.
 * @param {HTMLElement} group Group to add path into.
 */
jvm.AbstractCanvasElement.prototype.addPath = function(config, style, group){
  var el = new jvm[this.classPrefix+'PathElement'](config, style);

  this.add(el, group);
  return el;
};

/**
 * Create circle and add it to the canvas.
 * @param {Object} config Parameters of path to create.
 * @param {Object} style Styles of the path to create.
 * @param {HTMLElement} group Group to add circle into.
 */
jvm.AbstractCanvasElement.prototype.addCircle = function(config, style, group){
  var el = new jvm[this.classPrefix+'CircleElement'](config, style);

  this.add(el, group);
  return el;
};

/**
 * Create circle and add it to the canvas.
 * @param {Object} config Parameters of path to create.
 * @param {Object} style Styles of the path to create.
 * @param {HTMLElement} group Group to add circle into.
 */
jvm.AbstractCanvasElement.prototype.addImage = function(config, style, group){
  var el = new jvm[this.classPrefix+'ImageElement'](config, style);

  this.add(el, group);
  return el;
};

/**
 * Create text and add it to the canvas.
 * @param {Object} config Parameters of path to create.
 * @param {Object} style Styles of the path to create.
 * @param {HTMLElement} group Group to add circle into.
 */
jvm.AbstractCanvasElement.prototype.addText = function(config, style, group){
  var el = new jvm[this.classPrefix+'TextElement'](config, style);

  this.add(el, group);
  return el;
};

/**
 * Add group to the another group inside of the canvas.
 * @param {HTMLElement} group Group to add circle into or root group if not provided.
 */
jvm.AbstractCanvasElement.prototype.addGroup = function(parentGroup){
  var el = new jvm[this.classPrefix+'GroupElement']();

  if (parentGroup) {
    parentGroup.node.appendChild(el.node);
  } else {
    this.node.appendChild(el.node);
  }
  el.canvas = this;
  return el;
};/**
 * Abstract shape element. Shape element represents some visual vector or raster object.
 * @constructor
 * @param {String} name Tag name of the element.
 * @param {Object} config Set of parameters to initialize element with.
 * @param {Object} style Object with styles to set on element initialization.
 */
jvm.AbstractShapeElement = function(name, config, style){
  this.style = style || {};
  this.style.current = this.style.current || {};
  this.isHovered = false;
  this.isSelected = false;
  this.updateStyle();
};

/**
 * Set element's style.
 * @param {Object|String} property Could be string to set only one property or object to set several style properties at once.
 * @param {String} value Value to set in case only one property should be set.
 */
jvm.AbstractShapeElement.prototype.setStyle = function(property, value){
  var styles = {};

  if (typeof property === 'object') {
    styles = property;
  } else {
    styles[property] = value;
  }
  jvm.$.extend(this.style.current, styles);
  this.updateStyle();
};


jvm.AbstractShapeElement.prototype.updateStyle = function(){
  var attrs = {};

  jvm.AbstractShapeElement.mergeStyles(attrs, this.style.initial);
  jvm.AbstractShapeElement.mergeStyles(attrs, this.style.current);
  if (this.isHovered) {
    jvm.AbstractShapeElement.mergeStyles(attrs, this.style.hover);
  }
  if (this.isSelected) {
    jvm.AbstractShapeElement.mergeStyles(attrs, this.style.selected);
    if (this.isHovered) {
      jvm.AbstractShapeElement.mergeStyles(attrs, this.style.selectedHover);
    }
  }
  this.set(attrs);
};

jvm.AbstractShapeElement.mergeStyles = function(styles, newStyles){
  var key;

  newStyles = newStyles || {};
  for (key in newStyles) {
    if (newStyles[key] === null) {
      delete styles[key];
    } else {
      styles[key] = newStyles[key];
    }
  }
}/**
 * Wrapper for SVG element.
 * @constructor
 * @extends jvm.AbstractElement
 * @param {String} name Tag name of the element
 * @param {Object} config Set of parameters to initialize element with
 */

jvm.SVGElement = function(name, config){
  jvm.SVGElement.parentClass.apply(this, arguments);
}

jvm.inherits(jvm.SVGElement, jvm.AbstractElement);

jvm.SVGElement.svgns = "http://www.w3.org/2000/svg";

/**
 * Creates DOM element.
 * @param {String} tagName Name of element
 * @private
 * @returns DOMElement
 */
jvm.SVGElement.prototype.createElement = function( tagName ){
  return document.createElementNS( jvm.SVGElement.svgns, tagName );
};

/**
 * Adds CSS class for underlying DOM element.
 * @param {String} className Name of CSS class name
 */
jvm.SVGElement.prototype.addClass = function( className ){
  this.node.setAttribute('class', className);
};

/**
 * Returns constructor for element by name prefixed with 'VML'.
 * @param {String} ctr Name of basic constructor to return
 * proper implementation for.
 * @returns Function
 * @private
 */
jvm.SVGElement.prototype.getElementCtr = function( ctr ){
  return jvm['SVG'+ctr];
};

jvm.SVGElement.prototype.getBBox = function(){
  return this.node.getBBox();
};jvm.SVGGroupElement = function(){
  jvm.SVGGroupElement.parentClass.call(this, 'g');
}

jvm.inherits(jvm.SVGGroupElement, jvm.SVGElement);

jvm.SVGGroupElement.prototype.add = function(element){
  this.node.appendChild( element.node );
};jvm.SVGCanvasElement = function (container, width, height) {
  this.classPrefix = "SVG";
  jvm.SVGCanvasElement.parentClass.call(this, "svg");

  this.defsElement = new jvm.SVGElement("defs");
  this.node.appendChild(this.defsElement.node);

  jvm.AbstractCanvasElement.apply(this, arguments);
};

jvm.inherits(jvm.SVGCanvasElement, jvm.SVGElement);
jvm.mixin(jvm.SVGCanvasElement, jvm.AbstractCanvasElement);

jvm.SVGCanvasElement.prototype.setSize = function (width, height) {
  this.width = width;
  this.height = height;
  this.node.setAttribute("width", width);
  this.node.setAttribute("height", height);
};

jvm.SVGCanvasElement.prototype.applyTransformParams = function (
  scale,
  transX,
  transY,
) {
  this.scale = scale;
  this.transX = transX;
  this.transY = transY;
  if (!isNaN(transX) && !isNaN(transY) && !isNaN(scale)) {
    this.rootElement.node.setAttribute(
      "transform",
      "scale(" + scale + ") translate(" + transX + ", " + transY + ")",
    );
  }
};
jvm.SVGShapeElement = function(name, config, style){
  jvm.SVGShapeElement.parentClass.call(this, name, config);
  jvm.AbstractShapeElement.apply(this, arguments);
};

jvm.inherits(jvm.SVGShapeElement, jvm.SVGElement);
jvm.mixin(jvm.SVGShapeElement, jvm.AbstractShapeElement);

jvm.SVGShapeElement.prototype.applyAttr = function(attr, value){
  var patternEl,
      imageEl,
      that = this;

  if (attr === 'fill' && jvm.isImageUrl(value)) {
    if (!jvm.SVGShapeElement.images[value]) {
      jvm.whenImageLoaded(value).then(function(img){
        imageEl = new jvm.SVGElement('image');
        imageEl.node.setAttributeNS('http://www.w3.org/1999/xlink', 'href', value);
        imageEl.applyAttr('x', '0');
        imageEl.applyAttr('y', '0');
        imageEl.applyAttr('width', img[0].width);
        imageEl.applyAttr('height', img[0].height);

        patternEl = new jvm.SVGElement('pattern');
        patternEl.applyAttr('id', 'image'+jvm.SVGShapeElement.imageCounter);
        patternEl.applyAttr('x', 0);
        patternEl.applyAttr('y', 0);
        patternEl.applyAttr('width', img[0].width / 2);
        patternEl.applyAttr('height', img[0].height / 2);
        patternEl.applyAttr('viewBox', '0 0 '+img[0].width+' '+img[0].height);
        patternEl.applyAttr('patternUnits', 'userSpaceOnUse');
        patternEl.node.appendChild( imageEl.node );

        that.canvas.defsElement.node.appendChild( patternEl.node );

        jvm.SVGShapeElement.images[value] = jvm.SVGShapeElement.imageCounter++;

        that.applyAttr('fill', 'url(#image'+jvm.SVGShapeElement.images[value]+')');
      });
    } else {
      this.applyAttr('fill', 'url(#image'+jvm.SVGShapeElement.images[value]+')');
    }
  } else {
    jvm.SVGShapeElement.parentClass.prototype.applyAttr.apply(this, arguments);
  }
};

jvm.SVGShapeElement.imageCounter = 1;
jvm.SVGShapeElement.images = {};jvm.SVGPathElement = function(config, style){
  jvm.SVGPathElement.parentClass.call(this, 'path', config, style);
  this.node.setAttribute('fill-rule', 'evenodd');
}

jvm.inherits(jvm.SVGPathElement, jvm.SVGShapeElement);jvm.SVGCircleElement = function(config, style){
  jvm.SVGCircleElement.parentClass.call(this, 'circle', config, style);
};

jvm.inherits(jvm.SVGCircleElement, jvm.SVGShapeElement);jvm.SVGImageElement = function(config, style){
  jvm.SVGImageElement.parentClass.call(this, 'image', config, style);
};

jvm.inherits(jvm.SVGImageElement, jvm.SVGShapeElement);

jvm.SVGImageElement.prototype.applyAttr = function(attr, value){
  var that = this,
      imageOffset,
      imageUrl;

  if (attr == 'image') {
    if (typeof value == 'object') {
      imageUrl = value.url;
      this.offset = value.offset;
    } else {
      imageUrl = value;
      this.offset = [0, 0];
    }

    jvm.whenImageLoaded(imageUrl).then(function(img){
      that.node.setAttributeNS('http://www.w3.org/1999/xlink', 'href', imageUrl);
      that.width = img[0].width;
      that.height = img[0].height;
      that.applyAttr('width', that.width);
      that.applyAttr('height', that.height);

      that.applyAttr('x', that.cx - that.width / 2 + that.offset[0]);
      that.applyAttr('y', that.cy - that.height / 2 + that.offset[1]);

      jvm.$(that.node).trigger('imageloaded', [img]);
    });
  } else if(attr == 'cx') {
    this.cx = value;
    if (this.width) {
      this.applyAttr('x', value - this.width / 2 + this.offset[0]);
    }
  } else if(attr == 'cy') {
    this.cy = value;
    if (this.height) {
      this.applyAttr('y', value - this.height / 2 + this.offset[1]);
    }
  } else {
    jvm.SVGImageElement.parentClass.prototype.applyAttr.apply(this, arguments);
  }
};jvm.SVGTextElement = function(config, style){
  jvm.SVGTextElement.parentClass.call(this, 'text', config, style);
}

jvm.inherits(jvm.SVGTextElement, jvm.SVGShapeElement);

jvm.SVGTextElement.prototype.applyAttr = function(attr, value){
  if (attr === 'text') {
    this.node.textContent = value;
  } else {
    jvm.SVGTextElement.parentClass.prototype.applyAttr.apply(this, arguments);
  }
};/**
 * Wrapper for VML element.
 * @constructor
 * @extends jvm.AbstractElement
 * @param {String} name Tag name of the element
 * @param {Object} config Set of parameters to initialize element with
 */

jvm.VMLElement = function(name, config){
  if (!jvm.VMLElement.VMLInitialized) {
    jvm.VMLElement.initializeVML();
  }

  jvm.VMLElement.parentClass.apply(this, arguments);
};

jvm.inherits(jvm.VMLElement, jvm.AbstractElement);

/**
 * Shows if VML was already initialized for the current document or not.
 * @static
 * @private
 * @type {Boolean}
 */
jvm.VMLElement.VMLInitialized = false;

/**
 * Initializes VML handling before creating the first element
 * (adds CSS class and creates namespace). Adds one of two forms
 * of createElement method depending of support by browser.
 * @static
 * @private
 */

 // The following method of VML handling is borrowed from the
 // Raphael library by Dmitry Baranovsky.

jvm.VMLElement.initializeVML = function(){
  try {
    if (!document.namespaces.rvml) {
      document.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
    }
    /**
     * Creates DOM element.
     * @param {String} tagName Name of element
     * @private
     * @returns DOMElement
     */
    jvm.VMLElement.prototype.createElement = function (tagName) {
      return document.createElement('<rvml:' + tagName + ' class="rvml">');
    };
  } catch (e) {
    /**
     * @private
     */
    jvm.VMLElement.prototype.createElement = function (tagName) {
      return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
    };
  }
  document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
  jvm.VMLElement.VMLInitialized = true;
};

/**
 * Returns constructor for element by name prefixed with 'VML'.
 * @param {String} ctr Name of basic constructor to return
 * proper implementation for.
 * @returns Function
 * @private
 */
jvm.VMLElement.prototype.getElementCtr = function( ctr ){
  return jvm['VML'+ctr];
};

/**
 * Adds CSS class for underlying DOM element.
 * @param {String} className Name of CSS class name
 */
jvm.VMLElement.prototype.addClass = function( className ){
  jvm.$(this.node).addClass(className);
};

/**
 * Applies attribute value to the underlying DOM element.
 * @param {String} name Name of attribute
 * @param {Number|String} config Value of attribute to apply
 * @private
 */
jvm.VMLElement.prototype.applyAttr = function( attr, value ){
  this.node[attr] = value;
};

/**
 * Returns boundary box for the element.
 * @returns {Object} Boundary box with numeric fields: x, y, width, height
 * @override
 */
jvm.VMLElement.prototype.getBBox = function(){
  var node = jvm.$(this.node);

  return {
    x: node.position().left / this.canvas.scale,
    y: node.position().top / this.canvas.scale,
    width: node.width() / this.canvas.scale,
    height: node.height() / this.canvas.scale
  };
};jvm.VMLGroupElement = function(){
  jvm.VMLGroupElement.parentClass.call(this, 'group');

  this.node.style.left = '0px';
  this.node.style.top = '0px';
  this.node.coordorigin = "0 0";
};

jvm.inherits(jvm.VMLGroupElement, jvm.VMLElement);

jvm.VMLGroupElement.prototype.add = function(element){
  this.node.appendChild( element.node );
};jvm.VMLCanvasElement = function(container, width, height){
  this.classPrefix = 'VML';
  jvm.VMLCanvasElement.parentClass.call(this, 'group');
  jvm.AbstractCanvasElement.apply(this, arguments);
  this.node.style.position = 'absolute';
};

jvm.inherits(jvm.VMLCanvasElement, jvm.VMLElement);
jvm.mixin(jvm.VMLCanvasElement, jvm.AbstractCanvasElement);

jvm.VMLCanvasElement.prototype.setSize = function(width, height){
  var paths,
      groups,
      i,
      l;

  this.width = width;
  this.height = height;
  this.node.style.width = width + "px";
  this.node.style.height = height + "px";
  this.node.coordsize = width+' '+height;
  this.node.coordorigin = "0 0";
  if (this.rootElement) {
    paths = this.rootElement.node.getElementsByTagName('shape');
    for(i = 0, l = paths.length; i < l; i++) {
      paths[i].coordsize = width+' '+height;
      paths[i].style.width = width+'px';
      paths[i].style.height = height+'px';
    }
    groups = this.node.getElementsByTagName('group');
    for(i = 0, l = groups.length; i < l; i++) {
      groups[i].coordsize = width+' '+height;
      groups[i].style.width = width+'px';
      groups[i].style.height = height+'px';
    }
  }
};

jvm.VMLCanvasElement.prototype.applyTransformParams = function(scale, transX, transY) {
  this.scale = scale;
  this.transX = transX;
  this.transY = transY;
  this.rootElement.node.coordorigin = (this.width-transX-this.width/100)+','+(this.height-transY-this.height/100);
  this.rootElement.node.coordsize = this.width/scale+','+this.height/scale;
};jvm.VMLShapeElement = function(name, config){
  jvm.VMLShapeElement.parentClass.call(this, name, config);

  this.fillElement = new jvm.VMLElement('fill');
  this.strokeElement = new jvm.VMLElement('stroke');
  this.node.appendChild(this.fillElement.node);
  this.node.appendChild(this.strokeElement.node);
  this.node.stroked = false;

  jvm.AbstractShapeElement.apply(this, arguments);
};

jvm.inherits(jvm.VMLShapeElement, jvm.VMLElement);
jvm.mixin(jvm.VMLShapeElement, jvm.AbstractShapeElement);

jvm.VMLShapeElement.prototype.applyAttr = function(attr, value){
  switch (attr) {
    case 'fill':
      this.node.fillcolor = value;
      break;
    case 'fill-opacity':
      this.fillElement.node.opacity = Math.round(value*100)+'%';
      break;
    case 'stroke':
      if (value === 'none') {
        this.node.stroked = false;
      } else {
        this.node.stroked = true;
      }
      this.node.strokecolor = value;
      break;
    case 'stroke-opacity':
      this.strokeElement.node.opacity = Math.round(value*100)+'%';
      break;
    case 'stroke-width':
      if (parseInt(value, 10) === 0) {
        this.node.stroked = false;
      } else {
        this.node.stroked = true;
      }
      this.node.strokeweight = value;
      break;
    case 'd':
      this.node.path = jvm.VMLPathElement.pathSvgToVml(value);
      break;
    default:
      jvm.VMLShapeElement.parentClass.prototype.applyAttr.apply(this, arguments);
  }
};jvm.VMLPathElement = function(config, style){
  var scale = new jvm.VMLElement('skew');

  jvm.VMLPathElement.parentClass.call(this, 'shape', config, style);

  this.node.coordorigin = "0 0";

  scale.node.on = true;
  scale.node.matrix = '0.01,0,0,0.01,0,0';
  scale.node.offset = '0,0';

  this.node.appendChild(scale.node);
};

jvm.inherits(jvm.VMLPathElement, jvm.VMLShapeElement);

jvm.VMLPathElement.prototype.applyAttr = function(attr, value){
  if (attr === 'd') {
    this.node.path = jvm.VMLPathElement.pathSvgToVml(value);
  } else {
    jvm.VMLShapeElement.prototype.applyAttr.call(this, attr, value);
  }
};

jvm.VMLPathElement.pathSvgToVml = function(path) {
  var cx = 0, cy = 0, ctrlx, ctrly;

  path = path.replace(/(-?\\d+)e(-?\\d+)/g, '0');
  return path.replace(/([MmLlHhVvCcSs])\\s*((?:-?\\d*(?:\\.\\d+)?\\s*,?\\s*)+)/g, function(segment, letter, coords, index){
    coords = coords.replace(/(\\d)-/g, '$1,-')
            .replace(/^\\s+/g, '')
            .replace(/\\s+$/g, '')
            .replace(/\\s+/g, ',').split(',');
    if (!coords[0]) coords.shift();
    for (var i=0, l=coords.length; i<l; i++) {
      coords[i] = Math.round(100*coords[i]);
    }
    switch (letter) {
      case 'm':
        cx += coords[0];
        cy += coords[1];
        return 't'+coords.join(',');
      case 'M':
        cx = coords[0];
        cy = coords[1];
        return 'm'+coords.join(',');
      case 'l':
        cx += coords[0];
        cy += coords[1];
        return 'r'+coords.join(',');
      case 'L':
        cx = coords[0];
        cy = coords[1];
        return 'l'+coords.join(',');
      case 'h':
        cx += coords[0];
        return 'r'+coords[0]+',0';
      case 'H':
        cx = coords[0];
        return 'l'+cx+','+cy;
      case 'v':
        cy += coords[0];
        return 'r0,'+coords[0];
      case 'V':
        cy = coords[0];
        return 'l'+cx+','+cy;
      case 'c':
        ctrlx = cx + coords[coords.length-4];
        ctrly = cy + coords[coords.length-3];
        cx += coords[coords.length-2];
        cy += coords[coords.length-1];
        return 'v'+coords.join(',');
      case 'C':
        ctrlx = coords[coords.length-4];
        ctrly = coords[coords.length-3];
        cx = coords[coords.length-2];
        cy = coords[coords.length-1];
        return 'c'+coords.join(',');
      case 's':
        coords.unshift(cy-ctrly);
        coords.unshift(cx-ctrlx);
        ctrlx = cx + coords[coords.length-4];
        ctrly = cy + coords[coords.length-3];
        cx += coords[coords.length-2];
        cy += coords[coords.length-1];
        return 'v'+coords.join(',');
      case 'S':
        coords.unshift(cy+cy-ctrly);
        coords.unshift(cx+cx-ctrlx);
        ctrlx = coords[coords.length-4];
        ctrly = coords[coords.length-3];
        cx = coords[coords.length-2];
        cy = coords[coords.length-1];
        return 'c'+coords.join(',');
    }
    return '';
  }).replace(/z/g, 'e');
};jvm.VMLCircleElement = function(config, style){
  jvm.VMLCircleElement.parentClass.call(this, 'oval', config, style);
};

jvm.inherits(jvm.VMLCircleElement, jvm.VMLShapeElement);

jvm.VMLCircleElement.prototype.applyAttr = function(attr, value){
  switch (attr) {
    case 'r':
      this.node.style.width = value*2+'px';
      this.node.style.height = value*2+'px';
      this.applyAttr('cx', this.get('cx') || 0);
      this.applyAttr('cy', this.get('cy') || 0);
      break;
    case 'cx':
      if (!value) return;
      this.node.style.left = value - (this.get('r') || 0) + 'px';
      break;
    case 'cy':
      if (!value) return;
      this.node.style.top = value - (this.get('r') || 0) + 'px';
      break;
    default:
      jvm.VMLCircleElement.parentClass.prototype.applyAttr.call(this, attr, value);
  }
};/**
 * Class for vector images manipulations.
 * @constructor
 * @param {DOMElement} container to place canvas to
 * @param {Number} width
 * @param {Number} height
 */
jvm.VectorCanvas = function(container, width, height) {
  this.mode = window.SVGAngle ? 'svg' : 'vml';

  if (this.mode == 'svg') {
    this.impl = new jvm.SVGCanvasElement(container, width, height);
  } else {
    this.impl = new jvm.VMLCanvasElement(container, width, height);
  }
  this.impl.mode = this.mode;
  return this.impl;
};jvm.SimpleScale = function(scale){
  this.scale = scale;
};

jvm.SimpleScale.prototype.getValue = function(value){
  return value;
};jvm.OrdinalScale = function(scale){
  this.scale = scale;
};

jvm.OrdinalScale.prototype.getValue = function(value){
  return this.scale[value];
};

jvm.OrdinalScale.prototype.getTicks = function(){
  var ticks = [],
      key;

  for (key in this.scale) {
    ticks.push({
      label: key,
      value: this.scale[key]
    });
  }

  return ticks;
};jvm.NumericScale = function(scale, normalizeFunction, minValue, maxValue) {
  this.scale = [];

  normalizeFunction = normalizeFunction || 'linear';

  if (scale) this.setScale(scale);
  if (normalizeFunction) this.setNormalizeFunction(normalizeFunction);
  if (typeof minValue !== 'undefined' ) this.setMin(minValue);
  if (typeof maxValue !== 'undefined' ) this.setMax(maxValue);
};

jvm.NumericScale.prototype = {
  setMin: function(min) {
    this.clearMinValue = min;
    if (typeof this.normalize === 'function') {
      this.minValue = this.normalize(min);
    } else {
      this.minValue = min;
    }
  },

  setMax: function(max) {
    this.clearMaxValue = max;
    if (typeof this.normalize === 'function') {
      this.maxValue = this.normalize(max);
    } else {
      this.maxValue = max;
    }
  },

  setScale: function(scale) {
    var i;

    this.scale = [];
    for (i = 0; i < scale.length; i++) {
      this.scale[i] = [scale[i]];
    }
  },

  setNormalizeFunction: function(f) {
    if (f === 'polynomial') {
      this.normalize = function(value) {
        return Math.pow(value, 0.2);
      }
    } else if (f === 'linear') {
      delete this.normalize;
    } else {
      this.normalize = f;
    }
    this.setMin(this.clearMinValue);
    this.setMax(this.clearMaxValue);
  },

  getValue: function(value) {
    var lengthes = [],
        fullLength = 0,
        l,
        i = 0,
        c;

    if (typeof this.normalize === 'function') {
      value = this.normalize(value);
    }
    for (i = 0; i < this.scale.length-1; i++) {
      l = this.vectorLength(this.vectorSubtract(this.scale[i+1], this.scale[i]));
      lengthes.push(l);
      fullLength += l;
    }

    c = (this.maxValue - this.minValue) / fullLength;
    for (i=0; i<lengthes.length; i++) {
      lengthes[i] *= c;
    }

    i = 0;
    value -= this.minValue;
    while (value - lengthes[i] >= 0) {
      value -= lengthes[i];
      i++;
    }

    if (i == this.scale.length - 1) {
      value = this.vectorToNum(this.scale[i])
    } else {
      value = (
        this.vectorToNum(
          this.vectorAdd(this.scale[i],
            this.vectorMult(
              this.vectorSubtract(this.scale[i+1], this.scale[i]),
              (value) / (lengthes[i])
            )
          )
        )
      );
    }

    return value;
  },

  vectorToNum: function(vector) {
    var num = 0,
        i;

    for (i = 0; i < vector.length; i++) {
      num += Math.round(vector[i])*Math.pow(256, vector.length-i-1);
    }
    return num;
  },

  vectorSubtract: function(vector1, vector2) {
    var vector = [],
        i;

    for (i = 0; i < vector1.length; i++) {
      vector[i] = vector1[i] - vector2[i];
    }
    return vector;
  },

  vectorAdd: function(vector1, vector2) {
    var vector = [],
        i;

    for (i = 0; i < vector1.length; i++) {
      vector[i] = vector1[i] + vector2[i];
    }
    return vector;
  },

  vectorMult: function(vector, num) {
    var result = [],
        i;

    for (i = 0; i < vector.length; i++) {
      result[i] = vector[i] * num;
    }
    return result;
  },

  vectorLength: function(vector) {
    var result = 0,
        i;
    for (i = 0; i < vector.length; i++) {
      result += vector[i] * vector[i];
    }
    return Math.sqrt(result);
  },

  /* Derived from d3 implementation https://github.com/mbostock/d3/blob/master/src/scale/linear.js#L94 */
  getTicks: function(){
    var m = 5,
        extent = [this.clearMinValue, this.clearMaxValue],
        span = extent[1] - extent[0],
        step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)),
        err = m / span * step,
        ticks = [],
        tick,
        v;

    if (err <= .15) step *= 10;
    else if (err <= .35) step *= 5;
    else if (err <= .75) step *= 2;

    extent[0] = Math.floor(extent[0] / step) * step;
    extent[1] = Math.ceil(extent[1] / step) * step;

    tick = extent[0];
    while (tick <= extent[1]) {
      if (tick == extent[0]) {
        v = this.clearMinValue;
      } else if (tick == extent[1]) {
        v = this.clearMaxValue;
      } else {
        v = tick;
      }
      ticks.push({
        label: tick,
        value: this.getValue(v)
      });
      tick += step;
    }

    return ticks;
  }
};
jvm.ColorScale = function(colors, normalizeFunction, minValue, maxValue) {
  jvm.ColorScale.parentClass.apply(this, arguments);
}

jvm.inherits(jvm.ColorScale, jvm.NumericScale);

jvm.ColorScale.prototype.setScale = function(scale) {
  var i;

  for (i = 0; i < scale.length; i++) {
    this.scale[i] = jvm.ColorScale.rgbToArray(scale[i]);
  }
};

jvm.ColorScale.prototype.getValue = function(value) {
  return jvm.ColorScale.numToRgb(jvm.ColorScale.parentClass.prototype.getValue.call(this, value));
};

jvm.ColorScale.arrayToRgb = function(ar) {
  var rgb = '#',
      d,
      i;

  for (i = 0; i < ar.length; i++) {
    d = ar[i].toString(16);
    rgb += d.length == 1 ? '0'+d : d;
  }
  return rgb;
};

jvm.ColorScale.numToRgb = function(num) {
  num = num.toString(16);

  while (num.length < 6) {
    num = '0' + num;
  }

  return '#'+num;
};

jvm.ColorScale.rgbToArray = function(rgb) {
  rgb = rgb.substr(1);
  return [parseInt(rgb.substr(0, 2), 16), parseInt(rgb.substr(2, 2), 16), parseInt(rgb.substr(4, 2), 16)];
};/**
 * Represents map legend.
 * @constructor
 * @param {Object} params Configuration parameters.
 * @param {String} params.cssClass Additional CSS class to apply to legend element.
 * @param {Boolean} params.vertical If <code>true</code> legend will be rendered as vertical.
 * @param {String} params.title Legend title.
 * @param {Function} params.labelRender Method to convert series values to legend labels.
 */
jvm.Legend = function(params) {
  this.params = params || {};
  this.map = this.params.map;
  this.series = this.params.series;
  this.body = jvm.$('<div/>');
  this.body.addClass('jvectormap-legend');
  if (this.params.cssClass) {
    this.body.addClass(this.params.cssClass);
  }

  if (params.vertical) {
    this.map.legendCntVertical.append( this.body );
  } else {
    this.map.legendCntHorizontal.append( this.body );
  }

  this.render();
}

jvm.Legend.prototype.render = function(){
  var ticks = this.series.scale.getTicks(),
      i,
      inner = jvm.$('<div/>').addClass('jvectormap-legend-inner'),
      tick,
      sample,
      label;

  this.body.html('');
  if (this.params.title) {
    this.body.append(
      jvm.$('<div/>').addClass('jvectormap-legend-title').html(this.params.title)
    );
  }
  this.body.append(inner);

  for (i = 0; i < ticks.length; i++) {
    tick = jvm.$('<div/>').addClass('jvectormap-legend-tick');
    sample = jvm.$('<div/>').addClass('jvectormap-legend-tick-sample');

    switch (this.series.params.attribute) {
      case 'fill':
        if (jvm.isImageUrl(ticks[i].value)) {
          sample.css('background', 'url('+ticks[i].value+')');
        } else {
          sample.css('background', ticks[i].value);
        }
        break;
      case 'stroke':
        sample.css('background', ticks[i].value);
        break;
      case 'image':
        sample.css('background', 'url('+(typeof ticks[i].value === 'object' ? ticks[i].value.url : ticks[i].value)+') no-repeat center center');
        break;
      case 'r':
        jvm.$('<div/>').css({
          'border-radius': ticks[i].value,
          border: this.map.params.markerStyle.initial['stroke-width']+'px '+
                  this.map.params.markerStyle.initial['stroke']+' solid',
          width: ticks[i].value * 2 + 'px',
          height: ticks[i].value * 2 + 'px',
          background: this.map.params.markerStyle.initial['fill']
        }).appendTo(sample);
        break;
    }
    tick.append( sample );
    label = ticks[i].label;
    if (this.params.labelRender) {
      label = this.params.labelRender(label);
    }
    tick.append( jvm.$('<div>'+label+' </div>').addClass('jvectormap-legend-tick-text') );
    inner.append(tick);
  }
  inner.append( jvm.$('<div/>').css('clear', 'both') );
}/**
 * Creates data series.
 * @constructor
 * @param {Object} params Parameters to initialize series with.
 * @param {Array} params.values The data set to visualize.
 * @param {String} params.attribute Numeric, color or image attribute to use for data visualization. This could be: <code>fill</code>, <code>stroke</code>, <code>fill-opacity</code>, <code>stroke-opacity</code> for markers and regions and <code>r</code> (radius) or <code>image</code> for markers only.
 * @param {Array} params.scale Values used to map a dimension of data to a visual representation. The first value sets visualization for minimum value from the data set and the last value sets visualization for the maximum value. There also could be intermidiate values. Default value is <code>['#C8EEFF', '#0071A4']</code>.
 * @param {Function|String} params.normalizeFunction The function used to map input values to the provided scale. This parameter could be provided as function or one of the strings: <code>'linear'</code> or <code>'polynomial'</code>, while <code>'linear'</code> is used by default. The function provided takes value from the data set as an input and returns corresponding value from the scale.
 * @param {Number} params.min Minimum value of the data set. Could be calculated automatically if not provided.
 * @param {Number} params.max Maximum value of the data set. Could be calculated automatically if not provided.
 */
jvm.DataSeries = function (params, elements, map) {
  var scaleConstructor;

  params = params || {};
  params.attribute = params.attribute || "fill";

  this.elements = elements;
  this.params = params;
  this.map = map;

  if (params.attributes) {
    this.setAttributes(params.attributes);
  }

  if (jvm.$.isArray(params.scale)) {
    scaleConstructor =
      params.attribute === "fill" || params.attribute === "stroke"
        ? jvm.ColorScale
        : jvm.NumericScale;
    this.scale = new scaleConstructor(
      params.scale,
      params.normalizeFunction,
      params.min,
      params.max,
    );
  } else if (params.scale) {
    this.scale = new jvm.OrdinalScale(params.scale);
  } else {
    this.scale = new jvm.SimpleScale(params.scale);
  }

  this.values = params.values || {};
  this.setValues(this.values);

  if (this.params.legend) {
    this.legend = new jvm.Legend(
      jvm.$.extend(
        {
          map: this.map,
          series: this,
        },
        this.params.legend,
      ),
    );
  }
};

jvm.DataSeries.prototype = {
  setAttributes: function (key, attr) {
    var attrs = key,
      code;

    if (typeof key == "string") {
      if (this.elements[key]) {
        this.elements[key].setStyle(this.params.attribute, attr);
      }
    } else {
      for (code in attrs) {
        if (this.elements[code]) {
          this.elements[code].element.setStyle(
            this.params.attribute,
            attrs[code],
          );
        }
      }
    }
  },

  /**
   * Set values for the data set.
   * @param {Object} values Object which maps codes of regions or markers to values.
   */
  setValues: function (values) {
    var max = -Number.MAX_VALUE,
      min = Number.MAX_VALUE,
      val,
      cc,
      attrs = {};

    if (
      !(this.scale instanceof jvm.OrdinalScale) &&
      !(this.scale instanceof jvm.SimpleScale)
    ) {
      // we have a color scale as an array
      if (
        typeof this.params.min === "undefined" ||
        typeof this.params.max === "undefined"
      ) {
        // min and/or max are not defined, so calculate them
        for (cc in values) {
          val = parseFloat(values[cc]);
          if (val > max) max = val;
          if (val < min) min = val;
        }
      }

      if (typeof this.params.min === "undefined") {
        this.scale.setMin(min);
        this.params.min = min;
      } else {
        this.scale.setMin(this.params.min);
      }

      if (typeof this.params.max === "undefined") {
        this.scale.setMax(max);
        this.params.max = max;
      } else {
        this.scale.setMax(this.params.max);
      }

      for (cc in values) {
        if (cc != "indexOf") {
          val = parseFloat(values[cc]);
          if (!isNaN(val)) {
            attrs[cc] = this.scale.getValue(val);
          } else {
            attrs[cc] =
              this.elements[cc].element.style.initial[this.params.attribute];
          }
        }
      }
    } else {
      for (cc in values) {
        if (values[cc]) {
          attrs[cc] = this.scale.getValue(values[cc]);
        } else {
          attrs[cc] =
            this.elements[cc].element.style.initial[this.params.attribute];
        }
      }
    }

    this.setAttributes(attrs);
    jvm.$.extend(this.values, values);
  },

  clear: function () {
    var key,
      attrs = {};

    for (key in this.values) {
      if (this.elements[key]) {
        attrs[key] =
          this.elements[key].element.shape.style.initial[this.params.attribute];
      }
    }
    this.setAttributes(attrs);
    this.values = {};
  },

  clearAndSet: function (values) {
    this.clear();
    this.setValues(values);
  },

  /**
   * Set scale of the data series.
   * @param {Array} scale Values representing scale.
   */
  setScale: function (scale) {
    this.scale.setScale(scale);
    if (this.values) {
      this.setValues(this.values);
    }
  },

  /**
   * Set normalize function of the data series.
   * @param {Function|String} f Normalize function.
   */
  setNormalizeFunction: function (f) {
    this.scale.setNormalizeFunction(f);
    if (this.values) {
      this.setValues(this.values);
    }
  },
};
/**
 * Contains methods for transforming point on sphere to
 * Cartesian coordinates using various projections.
 * @class
 */
jvm.Proj = {
  degRad: 180 / Math.PI,
  radDeg: Math.PI / 180,
  radius: 6381372,

  sgn: function(n){
    if (n > 0) {
      return 1;
    } else if (n < 0) {
      return -1;
    } else {
      return n;
    }
  },

  /**
   * Converts point on sphere to the Cartesian coordinates using Miller projection
   * @param {Number} lat Latitude in degrees
   * @param {Number} lng Longitude in degrees
   * @param {Number} c Central meridian in degrees
   */
  mill: function(lat, lng, c){
    return {
      x: this.radius * (lng - c) * this.radDeg,
      y: - this.radius * Math.log(Math.tan((45 + 0.4 * lat) * this.radDeg)) / 0.8
    };
  },

  /**
   * Inverse function of mill()
   * Converts Cartesian coordinates to point on sphere using Miller projection
   * @param {Number} x X of point in Cartesian system as integer
   * @param {Number} y Y of point in Cartesian system as integer
   * @param {Number} c Central meridian in degrees
   */
  mill_inv: function(x, y, c){
    return {
      lat: (2.5 * Math.atan(Math.exp(0.8 * y / this.radius)) - 5 * Math.PI / 8) * this.degRad,
      lng: (c * this.radDeg + x / this.radius) * this.degRad
    };
  },

  /**
   * Converts point on sphere to the Cartesian coordinates using Mercator projection
   * @param {Number} lat Latitude in degrees
   * @param {Number} lng Longitude in degrees
   * @param {Number} c Central meridian in degrees
   */
  merc: function(lat, lng, c){
    return {
      x: this.radius * (lng - c) * this.radDeg,
      y: - this.radius * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360))
    };
  },

  /**
   * Inverse function of merc()
   * Converts Cartesian coordinates to point on sphere using Mercator projection
   * @param {Number} x X of point in Cartesian system as integer
   * @param {Number} y Y of point in Cartesian system as integer
   * @param {Number} c Central meridian in degrees
   */
  merc_inv: function(x, y, c){
    return {
      lat: (2 * Math.atan(Math.exp(y / this.radius)) - Math.PI / 2) * this.degRad,
      lng: (c * this.radDeg + x / this.radius) * this.degRad
    };
  },

  /**
   * Converts point on sphere to the Cartesian coordinates using Albers Equal-Area Conic
   * projection
   * @see <a href="http://mathworld.wolfram.com/AlbersEqual-AreaConicProjection.html">Albers Equal-Area Conic projection</a>
   * @param {Number} lat Latitude in degrees
   * @param {Number} lng Longitude in degrees
   * @param {Number} c Central meridian in degrees
   */
  aea: function(lat, lng, c){
    var fi0 = 0,
        lambda0 = c * this.radDeg,
        fi1 = 29.5 * this.radDeg,
        fi2 = 45.5 * this.radDeg,
        fi = lat * this.radDeg,
        lambda = lng * this.radDeg,
        n = (Math.sin(fi1)+Math.sin(fi2)) / 2,
        C = Math.cos(fi1)*Math.cos(fi1)+2*n*Math.sin(fi1),
        theta = n*(lambda-lambda0),
        ro = Math.sqrt(C-2*n*Math.sin(fi))/n,
        ro0 = Math.sqrt(C-2*n*Math.sin(fi0))/n;

    return {
      x: ro * Math.sin(theta) * this.radius,
      y: - (ro0 - ro * Math.cos(theta)) * this.radius
    };
  },

  /**
   * Converts Cartesian coordinates to the point on sphere using Albers Equal-Area Conic
   * projection
   * @see <a href="http://mathworld.wolfram.com/AlbersEqual-AreaConicProjection.html">Albers Equal-Area Conic projection</a>
   * @param {Number} x X of point in Cartesian system as integer
   * @param {Number} y Y of point in Cartesian system as integer
   * @param {Number} c Central meridian in degrees
   */
  aea_inv: function(xCoord, yCoord, c){
    var x = xCoord / this.radius,
        y = yCoord / this.radius,
        fi0 = 0,
        lambda0 = c * this.radDeg,
        fi1 = 29.5 * this.radDeg,
        fi2 = 45.5 * this.radDeg,
        n = (Math.sin(fi1)+Math.sin(fi2)) / 2,
        C = Math.cos(fi1)*Math.cos(fi1)+2*n*Math.sin(fi1),
        ro0 = Math.sqrt(C-2*n*Math.sin(fi0))/n,
        ro = Math.sqrt(x*x+(ro0-y)*(ro0-y)),
        theta = Math.atan( x / (ro0 - y) );

    return {
      lat: (Math.asin((C - ro * ro * n * n) / (2 * n))) * this.degRad,
      lng: (lambda0 + theta / n) * this.degRad
    };
  },

  /**
   * Converts point on sphere to the Cartesian coordinates using Lambert conformal
   * conic projection
   * @see <a href="http://mathworld.wolfram.com/LambertConformalConicProjection.html">Lambert Conformal Conic Projection</a>
   * @param {Number} lat Latitude in degrees
   * @param {Number} lng Longitude in degrees
   * @param {Number} c Central meridian in degrees
   */
  lcc: function(lat, lng, c){
    var fi0 = 0,
        lambda0 = c * this.radDeg,
        lambda = lng * this.radDeg,
        fi1 = 33 * this.radDeg,
        fi2 = 45 * this.radDeg,
        fi = lat * this.radDeg,
        n = Math.log( Math.cos(fi1) * (1 / Math.cos(fi2)) ) / Math.log( Math.tan( Math.PI / 4 + fi2 / 2) * (1 / Math.tan( Math.PI / 4 + fi1 / 2) ) ),
        F = ( Math.cos(fi1) * Math.pow( Math.tan( Math.PI / 4 + fi1 / 2 ), n ) ) / n,
        ro = F * Math.pow( 1 / Math.tan( Math.PI / 4 + fi / 2 ), n ),
        ro0 = F * Math.pow( 1 / Math.tan( Math.PI / 4 + fi0 / 2 ), n );

    return {
      x: ro * Math.sin( n * (lambda - lambda0) ) * this.radius,
      y: - (ro0 - ro * Math.cos( n * (lambda - lambda0) ) ) * this.radius
    };
  },

  /**
   * Converts Cartesian coordinates to the point on sphere using Lambert conformal conic
   * projection
   * @see <a href="http://mathworld.wolfram.com/LambertConformalConicProjection.html">Lambert Conformal Conic Projection</a>
   * @param {Number} x X of point in Cartesian system as integer
   * @param {Number} y Y of point in Cartesian system as integer
   * @param {Number} c Central meridian in degrees
   */
  lcc_inv: function(xCoord, yCoord, c){
    var x = xCoord / this.radius,
        y = yCoord / this.radius,
        fi0 = 0,
        lambda0 = c * this.radDeg,
        fi1 = 33 * this.radDeg,
        fi2 = 45 * this.radDeg,
        n = Math.log( Math.cos(fi1) * (1 / Math.cos(fi2)) ) / Math.log( Math.tan( Math.PI / 4 + fi2 / 2) * (1 / Math.tan( Math.PI / 4 + fi1 / 2) ) ),
        F = ( Math.cos(fi1) * Math.pow( Math.tan( Math.PI / 4 + fi1 / 2 ), n ) ) / n,
        ro0 = F * Math.pow( 1 / Math.tan( Math.PI / 4 + fi0 / 2 ), n ),
        ro = this.sgn(n) * Math.sqrt(x*x+(ro0-y)*(ro0-y)),
        theta = Math.atan( x / (ro0 - y) );

    return {
      lat: (2 * Math.atan(Math.pow(F/ro, 1/n)) - Math.PI / 2) * this.degRad,
      lng: (lambda0 + theta / n) * this.degRad
    };
  }
};jvm.MapObject = function(config){};

jvm.MapObject.prototype.getLabelText = function(key){
  var text;

  if (this.config.label) {
    if (typeof this.config.label.render === 'function') {
      text = this.config.label.render(key);
    } else {
      text = key;
    }
  } else {
    text = null;
  }
  return text;
}

jvm.MapObject.prototype.getLabelOffsets = function(key){
  var offsets;

  if (this.config.label) {
    if (typeof this.config.label.offsets === 'function') {
      offsets = this.config.label.offsets(key);
    } else if (typeof this.config.label.offsets === 'object') {
      offsets = this.config.label.offsets[key];
    }
  }
  return offsets || [0, 0];
}

/**
 * Set hovered state to the element. Hovered state means mouse cursor is over element. Styles will be updates respectively.
 * @param {Boolean} isHovered <code>true</code> to make element hovered, <code>false</code> otherwise.
 */
jvm.MapObject.prototype.setHovered = function(isHovered){
  if (this.isHovered !== isHovered) {
    this.isHovered = isHovered;
    this.shape.isHovered = isHovered;
    this.shape.updateStyle();
    if (this.label) {
      this.label.isHovered = isHovered;
      this.label.updateStyle();
    }
  }
};

/**
 * Set selected state to the element. Styles will be updates respectively.
 * @param {Boolean} isSelected <code>true</code> to make element selected, <code>false</code> otherwise.
 */
jvm.MapObject.prototype.setSelected = function(isSelected){
  if (this.isSelected !== isSelected) {
    this.isSelected = isSelected;
    this.shape.isSelected = isSelected;
    this.shape.updateStyle();
    if (this.label) {
      this.label.isSelected = isSelected;
      this.label.updateStyle();
    }
    jvm.$(this.shape).trigger('selected', [isSelected]);
  }
};

jvm.MapObject.prototype.setStyle = function(){
	this.shape.setStyle.apply(this.shape, arguments);
};

jvm.MapObject.prototype.remove = function(){
  this.shape.remove();
  if (this.label) {
    this.label.remove();
  }
};jvm.Region = function(config){
  var bbox,
      text,
      offsets,
      labelDx,
      labelDy;

  this.config = config;
  this.map = this.config.map;

  this.shape = config.canvas.addPath({
    d: config.path,
    'data-code': config.code
  }, config.style, config.canvas.rootElement);
  this.shape.addClass('jvectormap-region jvectormap-element');

  bbox = this.shape.getBBox();

  text = this.getLabelText(config.code);
  if (this.config.label && text) {
    offsets = this.getLabelOffsets(config.code);
    this.labelX = bbox.x + bbox.width / 2 + offsets[0];
    this.labelY = bbox.y + bbox.height / 2 + offsets[1];
    this.label = config.canvas.addText({
      text: text,
      'text-anchor': 'middle',
      'alignment-baseline': 'central',
      x: this.labelX,
      y: this.labelY,
      'data-code': config.code
    }, config.labelStyle, config.labelsGroup);
    this.label.addClass('jvectormap-region jvectormap-element');
  }
};

jvm.inherits(jvm.Region, jvm.MapObject);

jvm.Region.prototype.updateLabelPosition = function(){
  if (this.label) {
    this.label.set({
      x: this.labelX * this.map.scale + this.map.transX * this.map.scale,
      y: this.labelY * this.map.scale + this.map.transY * this.map.scale
    });
  }
};jvm.Marker = function(config){
  var text,
      offsets;

  this.config = config;
  this.map = this.config.map;

  this.isImage = !!this.config.style.initial.image;
  this.createShape();

  text = this.getLabelText(config.index);
  if (this.config.label && text) {
    this.offsets = this.getLabelOffsets(config.index);
    this.labelX = config.cx / this.map.scale - this.map.transX;
    this.labelY = config.cy / this.map.scale - this.map.transY;
    this.label = config.canvas.addText({
      text: text,
      'data-index': config.index,
      dy: "0.6ex",
      x: this.labelX,
      y: this.labelY
    }, config.labelStyle, config.labelsGroup);

    this.label.addClass('jvectormap-marker jvectormap-element');
  }
};

jvm.inherits(jvm.Marker, jvm.MapObject);

jvm.Marker.prototype.createShape = function(){
  var that = this;

  if (this.shape) {
    this.shape.remove();
  }
  this.shape = this.config.canvas[this.isImage ? 'addImage' : 'addCircle']({
    "data-index": this.config.index,
    cx: this.config.cx,
    cy: this.config.cy
  }, this.config.style, this.config.group);

  this.shape.addClass('jvectormap-marker jvectormap-element');

  if (this.isImage) {
    jvm.$(this.shape.node).on('imageloaded', function(){
      that.updateLabelPosition();
    });
  }
};

jvm.Marker.prototype.updateLabelPosition = function(){
  if (this.label) {
    this.label.set({
      x: this.labelX * this.map.scale + this.offsets[0] +
         this.map.transX * this.map.scale + 5 + (this.isImage ? (this.shape.width || 0) / 2 : this.shape.properties.r),
      y: this.labelY * this.map.scale + this.map.transY * this.map.scale + this.offsets[1]
    });
  }
};

jvm.Marker.prototype.setStyle = function(property, value){
  var isImage;

  jvm.Marker.parentClass.prototype.setStyle.apply(this, arguments);

  if (property === 'r') {
    this.updateLabelPosition();
  }

  isImage = !!this.shape.get('image');
  if (isImage != this.isImage) {
    this.isImage = isImage;
    this.config.style = jvm.$.extend(true, {}, this.shape.style);
    this.createShape();
  }
};/**
 * Creates map, draws paths, binds events.
 * @constructor
 * @param {Object} params Parameters to initialize map with.
 * @param {String} params.map Name of the map in the format <code>territory_proj_lang</code> where <code>territory</code> is a unique code or name of the territory which the map represents (ISO 3166 standard is used where possible), <code>proj</code> is a name of projection used to generate representation of the map on the plane (projections are named according to the conventions of proj4 utility) and <code>lang</code> is a code of the language, used for the names of regions.
 * @param {String} params.backgroundColor Background color of the map in CSS format.
 * @param {Boolean} params.zoomOnScroll When set to true map could be zoomed using mouse scroll. Default value is <code>true</code>.
 * @param {Number} params.zoomOnScrollSpeed Mouse scroll speed. Number from 1 to 10. Default value is <code>3</code>.
 * @param {Boolean} params.panOnDrag When set to true, the map pans when being dragged. Default value is <code>true</code>.
 * @param {Number} params.zoomMax Indicates the maximum zoom ratio which could be reached zooming the map. Default value is <code>8</code>.
 * @param {Number} params.zoomMin Indicates the minimum zoom ratio which could be reached zooming the map. Default value is <code>1</code>.
 * @param {Number} params.zoomStep Indicates the multiplier used to zoom map with +/- buttons. Default value is <code>1.6</code>.
 * @param {Boolean} params.zoomAnimate Indicates whether or not to animate changing of map zoom with zoom buttons.
 * @param {Boolean} params.regionsSelectable When set to true regions of the map could be selected. Default value is <code>false</code>.
 * @param {Boolean} params.regionsSelectableOne Allow only one region to be selected at the moment. Default value is <code>false</code>.
 * @param {Boolean} params.markersSelectable When set to true markers on the map could be selected. Default value is <code>false</code>.
 * @param {Boolean} params.markersSelectableOne Allow only one marker to be selected at the moment. Default value is <code>false</code>.
 * @param {Object} params.regionStyle Set the styles for the map's regions. Each region or marker has four states: <code>initial</code> (default state), <code>hover</code> (when the mouse cursor is over the region or marker), <code>selected</code> (when region or marker is selected), <code>selectedHover</code> (when the mouse cursor is over the region or marker and it's selected simultaneously). Styles could be set for each of this states. Default value for that parameter is:
<pre>{
  initial: {
    fill: 'white',
    "fill-opacity": 1,
    stroke: 'none',
    "stroke-width": 0,
    "stroke-opacity": 1
  },
  hover: {
    "fill-opacity": 0.8,
    cursor: 'pointer'
  },
  selected: {
    fill: 'yellow'
  },
  selectedHover: {
  }
}</pre>
* @param {Object} params.regionLabelStyle Set the styles for the regions' labels. Each region or marker has four states: <code>initial</code> (default state), <code>hover</code> (when the mouse cursor is over the region or marker), <code>selected</code> (when region or marker is selected), <code>selectedHover</code> (when the mouse cursor is over the region or marker and it's selected simultaneously). Styles could be set for each of this states. Default value for that parameter is:
<pre>{
  initial: {
    'font-family': 'Verdana',
    'font-size': '12',
    'font-weight': 'bold',
    cursor: 'default',
    fill: 'black'
  },
  hover: {
    cursor: 'pointer'
  }
}</pre>
 * @param {Object} params.markerStyle Set the styles for the map's markers. Any parameter suitable for <code>regionStyle</code> could be used as well as numeric parameter <code>r</code> to set the marker's radius. Default value for that parameter is:
<pre>{
  initial: {
    fill: 'grey',
    stroke: '#505050',
    "fill-opacity": 1,
    "stroke-width": 1,
    "stroke-opacity": 1,
    r: 5
  },
  hover: {
    stroke: 'black',
    "stroke-width": 2,
    cursor: 'pointer'
  },
  selected: {
    fill: 'blue'
  },
  selectedHover: {
  }
}</pre>
You can also use <code>image</code> style attribute for markers. By default marker images are centered with the target point on map. To supply a custom offset please use the following format:
<pre>{
  url: 'image/url',
  offset: [-10, 5]
}</pre>
 * @param {Object} params.markerLabelStyle Set the styles for the markers' labels. Default value for that parameter is:
<pre>{
  initial: {
    'font-family': 'Verdana',
    'font-size': '12',
    'font-weight': 'bold',
    cursor: 'default',
    fill: 'black'
  },
  hover: {
    cursor: 'pointer'
  }
}</pre>
 * @param {Object|Array} params.markers Set of markers to add to the map during initialization. In case of array is provided, codes of markers will be set as string representations of array indexes. Each marker is represented by <code>latLng</code> (array of two numeric values), <code>name</code> (string which will be show on marker's tip) and any marker styles.
 * @param {Object} params.series Object with two keys: <code>markers</code> and <code>regions</code>. Each of which is an array of series configs to be applied to the respective map elements. See <a href="jvm.DataSeries.html">DataSeries</a> description for a list of parameters available.
 * @param {Object|String} params.focusOn This parameter sets the initial position and scale of the map viewport. See <code>setFocus</code> docuemntation for possible parameters.
 * @param {Object} params.labels Defines parameters for rendering static labels. Object could contain two keys: <code>regions</code> and <code>markers</code>. Each key value defines configuration object with the following possible options:
<ul>
  <li><code>render {Function}</code> - defines method for converting region code or marker index to actual label value.</li>
  <li><code>offsets {Object|Function}</code> - provides method or object which could be used to define label offset by region code or marker index.</li>
</ul>
<b>Plase note: static labels feature is not supported in Internet Explorer 8 and below.</b>
 * @param {Array|Object|String} params.selectedRegions Set initially selected regions.
 * @param {Array|Object|String} params.selectedMarkers Set initially selected markers.
 * @param {Function} params.onRegionTipShow <code>(Event e, Object tip, String code)</code> Will be called right before the region tip is going to be shown.
 * @param {Function} params.onRegionOver <code>(Event e, String code)</code> Will be called on region mouse over event.
 * @param {Function} params.onRegionOut <code>(Event e, String code)</code> Will be called on region mouse out event.
 * @param {Function} params.onRegionClick <code>(Event e, String code)</code> Will be called on region click event.
 * @param {Function} params.onRegionSelected <code>(Event e, String code, Boolean isSelected, Array selectedRegions)</code> Will be called when region is (de)selected. <code>isSelected</code> parameter of the callback indicates whether region is selected or not. <code>selectedRegions</code> contains codes of all currently selected regions.
 * @param {Function} params.onMarkerTipShow <code>(Event e, Object tip, String code)</code> Will be called right before the marker tip is going to be shown.
 * @param {Function} params.onMarkerOver <code>(Event e, String code)</code> Will be called on marker mouse over event.
 * @param {Function} params.onMarkerOut <code>(Event e, String code)</code> Will be called on marker mouse out event.
 * @param {Function} params.onMarkerClick <code>(Event e, String code)</code> Will be called on marker click event.
 * @param {Function} params.onMarkerSelected <code>(Event e, String code, Boolean isSelected, Array selectedMarkers)</code> Will be called when marker is (de)selected. <code>isSelected</code> parameter of the callback indicates whether marker is selected or not. <code>selectedMarkers</code> contains codes of all currently selected markers.
 * @param {Function} params.onViewportChange <code>(Event e, Number scale)</code> Triggered when the map's viewport is changed (map was panned or zoomed).
 */
jvm.Map = function (params) {
  var map = this,
    e;

  this.params = jvm.$.extend(true, {}, jvm.Map.defaultParams, params);

  if (!jvm.Map.maps[this.params.map]) {
    throw new Error(
      "Attempt to use map which was not loaded: " + this.params.map,
    );
  }

  this.mapData = jvm.Map.maps[this.params.map];
  this.markers = {};
  this.regions = {};
  this.regionsColors = {};
  this.regionsData = {};

  this.container = jvm.$("<div>").addClass("jvectormap-container");
  if (this.params.container) {
    this.params.container.append(this.container);
  }
  this.container.data("mapObject", this);

  this.defaultWidth = this.mapData.width;
  this.defaultHeight = this.mapData.height;

  this.setBackgroundColor(this.params.backgroundColor);

  this.onResize = function () {
    map.updateSize();
  };
  jvm.$(window).resize(this.onResize);

  for (e in jvm.Map.apiEvents) {
    if (this.params[e]) {
      this.container.bind(jvm.Map.apiEvents[e] + ".jvectormap", this.params[e]);
    }
  }

  this.canvas = new jvm.VectorCanvas(
    this.container[0],
    this.width,
    this.height,
  );

  if (this.params.bindTouchEvents) {
    if (
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof DocumentTouch)
    ) {
      this.bindContainerTouchEvents();
    } else if (window.MSGesture) {
      this.bindContainerPointerEvents();
    }
  }
  this.bindContainerEvents();
  this.bindElementEvents();
  this.createTip();
  if (this.params.zoomButtons) {
    this.bindZoomButtons();
  }

  this.createRegions();
  this.createMarkers(this.params.markers || {});

  this.updateSize();

  if (this.params.focusOn) {
    if (typeof this.params.focusOn === "string") {
      this.params.focusOn = { region: this.params.focusOn };
    } else if (jvm.$.isArray(this.params.focusOn)) {
      this.params.focusOn = { regions: this.params.focusOn };
    }
    this.setFocus(this.params.focusOn);
  }

  if (this.params.selectedRegions) {
    this.setSelectedRegions(this.params.selectedRegions);
  }
  if (this.params.selectedMarkers) {
    this.setSelectedMarkers(this.params.selectedMarkers);
  }

  this.legendCntHorizontal = jvm
    .$("<div/>")
    .addClass("jvectormap-legend-cnt jvectormap-legend-cnt-h");
  this.legendCntVertical = jvm
    .$("<div/>")
    .addClass("jvectormap-legend-cnt jvectormap-legend-cnt-v");
  this.container.append(this.legendCntHorizontal);
  this.container.append(this.legendCntVertical);

  if (this.params.series) {
    this.createSeries();
  }
};

jvm.Map.prototype = {
  transX: 0,
  transY: 0,
  scale: 1,
  baseTransX: 0,
  baseTransY: 0,
  baseScale: 1,

  width: 0,
  height: 0,

  /**
   * Set background color of the map.
   * @param {String} backgroundColor Background color in CSS format.
   */
  setBackgroundColor: function (backgroundColor) {
    this.container.css("background-color", backgroundColor);
  },

  resize: function () {
    var curBaseScale = this.baseScale;
    if (this.width / this.height > this.defaultWidth / this.defaultHeight) {
      this.baseScale = this.height / this.defaultHeight;
      this.baseTransX =
        Math.abs(this.width - this.defaultWidth * this.baseScale) /
        (2 * this.baseScale);
    } else {
      this.baseScale = this.width / this.defaultWidth;
      this.baseTransY =
        Math.abs(this.height - this.defaultHeight * this.baseScale) /
        (2 * this.baseScale);
    }
    this.scale *= this.baseScale / curBaseScale;
    this.transX *= this.baseScale / curBaseScale;
    this.transY *= this.baseScale / curBaseScale;
  },

  /**
   * Synchronize the size of the map with the size of the container. Suitable in situations where the size of the container is changed programmatically or container is shown after it became visible.
   */
  updateSize: function () {
    this.width = this.container.width();
    this.height = this.container.height();
    this.resize();
    this.canvas.setSize(this.width, this.height);
    this.applyTransform();
  },

  /**
   * Reset all the series and show the map with the initial zoom.
   */
  reset: function () {
    var key, i;

    for (key in this.series) {
      for (i = 0; i < this.series[key].length; i++) {
        this.series[key][i].clear();
      }
    }
    this.scale = this.baseScale;
    this.transX = this.baseTransX;
    this.transY = this.baseTransY;
    this.applyTransform();
  },

  applyTransform: function () {
    var maxTransX, maxTransY, minTransX, minTransY;

    if (this.defaultWidth * this.scale <= this.width) {
      maxTransX =
        (this.width - this.defaultWidth * this.scale) / (2 * this.scale);
      minTransX =
        (this.width - this.defaultWidth * this.scale) / (2 * this.scale);
    } else {
      maxTransX = 0;
      minTransX = (this.width - this.defaultWidth * this.scale) / this.scale;
    }

    if (this.defaultHeight * this.scale <= this.height) {
      maxTransY =
        (this.height - this.defaultHeight * this.scale) / (2 * this.scale);
      minTransY =
        (this.height - this.defaultHeight * this.scale) / (2 * this.scale);
    } else {
      maxTransY = 0;
      minTransY = (this.height - this.defaultHeight * this.scale) / this.scale;
    }

    if (this.transY > maxTransY) {
      this.transY = maxTransY;
    } else if (this.transY < minTransY) {
      this.transY = minTransY;
    }
    if (this.transX > maxTransX) {
      this.transX = maxTransX;
    } else if (this.transX < minTransX) {
      this.transX = minTransX;
    }

    this.canvas.applyTransformParams(this.scale, this.transX, this.transY);

    if (this.markers) {
      this.repositionMarkers();
    }

    this.repositionLabels();

    this.container.trigger("viewportChange", [
      this.scale / this.baseScale,
      this.transX,
      this.transY,
    ]);
  },

  bindContainerEvents: function () {
    var mouseDown = false,
      oldPageX,
      oldPageY,
      map = this;

    if (this.params.panOnDrag) {
      this.container
        .mousemove(function (e) {
          if (mouseDown) {
            map.transX -= (oldPageX - e.pageX) / map.scale;
            map.transY -= (oldPageY - e.pageY) / map.scale;

            map.applyTransform();

            oldPageX = e.pageX;
            oldPageY = e.pageY;
          }
          return false;
        })
        .mousedown(function (e) {
          mouseDown = true;
          oldPageX = e.pageX;
          oldPageY = e.pageY;
          return false;
        });

      this.onContainerMouseUp = function () {
        mouseDown = false;
      };
      jvm.$("body").mouseup(this.onContainerMouseUp);
    }

    if (this.params.zoomOnScroll) {
      this.container.mousewheel(function (event, delta, deltaX, deltaY) {
        var offset = jvm.$(map.container).offset(),
          centerX = event.pageX - offset.left,
          centerY = event.pageY - offset.top,
          zoomStep = Math.pow(
            1 + map.params.zoomOnScrollSpeed / 1000,
            event.deltaFactor * event.deltaY,
          );

        map.tip.hide();

        map.setScale(map.scale * zoomStep, centerX, centerY);
        event.preventDefault();
      });
    }
  },

  bindContainerTouchEvents: function () {
    var touchStartScale,
      touchStartDistance,
      map = this,
      touchX,
      touchY,
      centerTouchX,
      centerTouchY,
      lastTouchesLength,
      handleTouchEvent = function (e) {
        var touches = e.originalEvent.touches,
          offset,
          scale,
          transXOld,
          transYOld;

        if (e.type == "touchstart") {
          lastTouchesLength = 0;
        }

        if (touches.length == 1) {
          if (lastTouchesLength == 1) {
            transXOld = map.transX;
            transYOld = map.transY;
            map.transX -= (touchX - touches[0].pageX) / map.scale;
            map.transY -= (touchY - touches[0].pageY) / map.scale;
            map.applyTransform();
            map.tip.hide();
            if (transXOld != map.transX || transYOld != map.transY) {
              e.preventDefault();
            }
          }
          touchX = touches[0].pageX;
          touchY = touches[0].pageY;
        } else if (touches.length == 2) {
          if (lastTouchesLength == 2) {
            scale =
              Math.sqrt(
                Math.pow(touches[0].pageX - touches[1].pageX, 2) +
                  Math.pow(touches[0].pageY - touches[1].pageY, 2),
              ) / touchStartDistance;
            map.setScale(touchStartScale * scale, centerTouchX, centerTouchY);
            map.tip.hide();
            e.preventDefault();
          } else {
            offset = jvm.$(map.container).offset();
            if (touches[0].pageX > touches[1].pageX) {
              centerTouchX =
                touches[1].pageX + (touches[0].pageX - touches[1].pageX) / 2;
            } else {
              centerTouchX =
                touches[0].pageX + (touches[1].pageX - touches[0].pageX) / 2;
            }
            if (touches[0].pageY > touches[1].pageY) {
              centerTouchY =
                touches[1].pageY + (touches[0].pageY - touches[1].pageY) / 2;
            } else {
              centerTouchY =
                touches[0].pageY + (touches[1].pageY - touches[0].pageY) / 2;
            }
            centerTouchX -= offset.left;
            centerTouchY -= offset.top;
            touchStartScale = map.scale;
            touchStartDistance = Math.sqrt(
              Math.pow(touches[0].pageX - touches[1].pageX, 2) +
                Math.pow(touches[0].pageY - touches[1].pageY, 2),
            );
          }
        }

        lastTouchesLength = touches.length;
      };

    jvm.$(this.container).bind("touchstart", handleTouchEvent);
    jvm.$(this.container).bind("touchmove", handleTouchEvent);
  },

  bindContainerPointerEvents: function () {
    var map = this,
      gesture = new MSGesture(),
      element = this.container[0],
      handlePointerDownEvent = function (e) {
        gesture.addPointer(e.pointerId);
      },
      handleGestureEvent = function (e) {
        var offset, scale, transXOld, transYOld;

        if (e.translationX != 0 || e.translationY != 0) {
          transXOld = map.transX;
          transYOld = map.transY;
          map.transX += e.translationX / map.scale;
          map.transY += e.translationY / map.scale;
          map.applyTransform();
          map.tip.hide();
          if (transXOld != map.transX || transYOld != map.transY) {
            e.preventDefault();
          }
        }
        if (e.scale != 1) {
          map.setScale(map.scale * e.scale, e.offsetX, e.offsetY);
          map.tip.hide();
          e.preventDefault();
        }
      };

    gesture.target = element;
    element.addEventListener("MSGestureChange", handleGestureEvent, false);
    element.addEventListener("pointerdown", handlePointerDownEvent, false);
  },

  bindElementEvents: function () {
    var map = this,
      pageX,
      pageY,
      mouseMoved;

    this.container.mousemove(function (e) {
      if (Math.abs(pageX - e.pageX) + Math.abs(pageY - e.pageY) > 2) {
        mouseMoved = true;
      }
    });

    /* Can not use common class selectors here because of the bug in jQuery
       SVG handling, use with caution. */
    this.container.delegate(
      "[class~='jvectormap-element']",
      "mouseover mouseout",
      function (e) {
        var baseVal =
            jvm.$(this).attr("class").baseVal || jvm.$(this).attr("class"),
          type =
            baseVal.indexOf("jvectormap-region") === -1 ? "marker" : "region",
          code =
            type == "region"
              ? jvm.$(this).attr("data-code")
              : jvm.$(this).attr("data-index"),
          element =
            type == "region"
              ? map.regions[code].element
              : map.markers[code].element,
          tipText =
            type == "region"
              ? map.mapData.paths[code].name
              : map.markers[code].config.name || "",
          tipShowEvent = jvm.$.Event(type + "TipShow.jvectormap"),
          overEvent = jvm.$.Event(type + "Over.jvectormap");

        if (e.type == "mouseover") {
          map.container.trigger(overEvent, [code]);
          if (!overEvent.isDefaultPrevented()) {
            element.setHovered(true);
          }

          map.tip.text(tipText);
          map.container.trigger(tipShowEvent, [map.tip, code]);
          if (!tipShowEvent.isDefaultPrevented()) {
            map.tip.show();
            map.tipWidth = map.tip.width();
            map.tipHeight = map.tip.height();
          }
        } else {
          element.setHovered(false);
          map.tip.hide();
          map.container.trigger(type + "Out.jvectormap", [code]);
        }
      },
    );

    /* Can not use common class selectors here because of the bug in jQuery
       SVG handling, use with caution. */
    this.container.delegate(
      "[class~='jvectormap-element']",
      "mousedown",
      function (e) {
        pageX = e.pageX;
        pageY = e.pageY;
        mouseMoved = false;
      },
    );

    /* Can not use common class selectors here because of the bug in jQuery
       SVG handling, use with caution. */
    this.container.delegate(
      "[class~='jvectormap-element']",
      "mouseup",
      function () {
        var baseVal = jvm.$(this).attr("class").baseVal
            ? jvm.$(this).attr("class").baseVal
            : jvm.$(this).attr("class"),
          type =
            baseVal.indexOf("jvectormap-region") === -1 ? "marker" : "region",
          code =
            type == "region"
              ? jvm.$(this).attr("data-code")
              : jvm.$(this).attr("data-index"),
          clickEvent = jvm.$.Event(type + "Click.jvectormap"),
          element =
            type == "region"
              ? map.regions[code].element
              : map.markers[code].element;

        if (!mouseMoved) {
          map.container.trigger(clickEvent, [code]);
          if (
            (type === "region" && map.params.regionsSelectable) ||
            (type === "marker" && map.params.markersSelectable)
          ) {
            if (!clickEvent.isDefaultPrevented()) {
              if (map.params[type + "sSelectableOne"]) {
                map.clearSelected(type + "s");
              }
              element.setSelected(!element.isSelected);
            }
          }
        }
      },
    );
  },

  bindZoomButtons: function () {
    var map = this;

    jvm
      .$("<div/>")
      .addClass("jvectormap-zoomin")
      .text("+")
      .appendTo(this.container);
    jvm
      .$("<div/>")
      .addClass("jvectormap-zoomout")
      .html("&#x2212;")
      .appendTo(this.container);

    this.container.find(".jvectormap-zoomin").click(function () {
      map.setScale(
        map.scale * map.params.zoomStep,
        map.width / 2,
        map.height / 2,
        false,
        map.params.zoomAnimate,
      );
    });
    this.container.find(".jvectormap-zoomout").click(function () {
      map.setScale(
        map.scale / map.params.zoomStep,
        map.width / 2,
        map.height / 2,
        false,
        map.params.zoomAnimate,
      );
    });
  },

  createTip: function () {
    var map = this;

    this.tip = jvm
      .$("<div/>")
      .addClass("jvectormap-tip")
      .appendTo(jvm.$("body"));

    this.container.mousemove(function (e) {
      var left = e.pageX - 15 - map.tipWidth,
        top = e.pageY - 15 - map.tipHeight;

      if (left < 5) {
        left = e.pageX + 15;
      }
      if (top < 5) {
        top = e.pageY + 15;
      }

      map.tip.css({
        left: left,
        top: top,
      });
    });
  },

  setScale: function (scale, anchorX, anchorY, isCentered, animate) {
    var viewportChangeEvent = jvm.$.Event("zoom.jvectormap"),
      interval,
      that = this,
      i = 0,
      count = Math.abs(
        Math.round(((scale - this.scale) * 60) / Math.max(scale, this.scale)),
      ),
      scaleStart,
      scaleDiff,
      transXStart,
      transXDiff,
      transYStart,
      transYDiff,
      transX,
      transY,
      deferred = new jvm.$.Deferred();

    if (scale > this.params.zoomMax * this.baseScale) {
      scale = this.params.zoomMax * this.baseScale;
    } else if (scale < this.params.zoomMin * this.baseScale) {
      scale = this.params.zoomMin * this.baseScale;
    }

    if (typeof anchorX != "undefined" && typeof anchorY != "undefined") {
      const zoomStep = scale / this.scale;
      if (isCentered) {
        transX =
          anchorX +
          (this.defaultWidth * (this.width / (this.defaultWidth * scale))) / 2;
        transY =
          anchorY +
          (this.defaultHeight * (this.height / (this.defaultHeight * scale))) /
            2;
      } else {
        transX = this.transX - ((zoomStep - 1) / scale) * anchorX;
        transY = this.transY - ((zoomStep - 1) / scale) * anchorY;
      }
    }

    if (animate && count > 0) {
      scaleStart = this.scale;
      scaleDiff = (scale - scaleStart) / count;
      transXStart = this.transX * this.scale;
      transYStart = this.transY * this.scale;
      transXDiff = (transX * scale - transXStart) / count;
      transYDiff = (transY * scale - transYStart) / count;
      interval = setInterval(function () {
        i += 1;
        that.scale = scaleStart + scaleDiff * i;
        that.transX = (transXStart + transXDiff * i) / that.scale;
        that.transY = (transYStart + transYDiff * i) / that.scale;
        that.applyTransform();
        if (i == count) {
          clearInterval(interval);
          that.container.trigger(viewportChangeEvent, [scale / that.baseScale]);
          deferred.resolve();
        }
      }, 10);
    } else {
      this.transX = transX;
      this.transY = transY;
      this.scale = scale;
      this.applyTransform();
      this.container.trigger(viewportChangeEvent, [scale / this.baseScale]);
      deferred.resolve();
    }

    return deferred;
  },

  /**
   * Set the map's viewport to the specific point and set zoom of the map to the specific level. Point and zoom level could be defined in two ways: using the code of some region to focus on or a central point and zoom level as numbers.
   * @param This method takes a configuration object as the single argument. The options passed to it are the following:
   * @param {Array} params.regions Array of region codes to zoom to.
   * @param {String} params.region Region code to zoom to.
   * @param {Number} params.scale Map scale to set.
   * @param {Number} params.lat Latitude to set viewport to.
   * @param {Number} params.lng Longitude to set viewport to.
   * @param {Number} params.x Number from 0 to 1 specifying the horizontal coordinate of the central point of the viewport.
   * @param {Number} params.y Number from 0 to 1 specifying the vertical coordinate of the central point of the viewport.
   * @param {Boolean} params.animate Indicates whether or not to animate the scale change and transition.
   */
  setFocus: function (config) {
    var bbox, itemBbox, newBbox, codes, i, point;

    config = config || {};

    if (config.region) {
      codes = [config.region];
    } else if (config.regions) {
      codes = config.regions;
    }

    if (codes) {
      for (i = 0; i < codes.length; i++) {
        if (this.regions[codes[i]]) {
          itemBbox = this.regions[codes[i]].element.shape.getBBox();
          if (itemBbox) {
            if (typeof bbox == "undefined") {
              bbox = itemBbox;
            } else {
              newBbox = {
                x: Math.min(bbox.x, itemBbox.x),
                y: Math.min(bbox.y, itemBbox.y),
                width:
                  Math.max(bbox.x + bbox.width, itemBbox.x + itemBbox.width) -
                  Math.min(bbox.x, itemBbox.x),
                height:
                  Math.max(bbox.y + bbox.height, itemBbox.y + itemBbox.height) -
                  Math.min(bbox.y, itemBbox.y),
              };
              bbox = newBbox;
            }
          }
        }
      }
      return this.setScale(
        Math.min(this.width / bbox.width, this.height / bbox.height),
        -(bbox.x + bbox.width / 2),
        -(bbox.y + bbox.height / 2),
        true,
        config.animate,
      );
    } else {
      if (config.lat !== undefined && config.lng !== undefined) {
        point = this.latLngToPoint(config.lat, config.lng);
        config.x = this.transX - point.x / this.scale;
        config.y = this.transY - point.y / this.scale;
      } else if (config.x && config.y) {
        config.x *= -this.defaultWidth;
        config.y *= -this.defaultHeight;
      }
      return this.setScale(
        config.scale * this.baseScale,
        config.x,
        config.y,
        true,
        config.animate,
      );
    }
  },

  getSelected: function (type) {
    var key,
      selected = [];

    for (key in this[type]) {
      if (this[type][key].element.isSelected) {
        selected.push(key);
      }
    }
    return selected;
  },

  /**
   * Return the codes of currently selected regions.
   * @returns {Array}
   */
  getSelectedRegions: function () {
    return this.getSelected("regions");
  },

  /**
   * Return the codes of currently selected markers.
   * @returns {Array}
   */
  getSelectedMarkers: function () {
    return this.getSelected("markers");
  },

  setSelected: function (type, keys) {
    var i;

    if (typeof keys != "object") {
      keys = [keys];
    }

    if (jvm.$.isArray(keys)) {
      for (i = 0; i < keys.length; i++) {
        this[type][keys[i]].element.setSelected(true);
      }
    } else {
      for (i in keys) {
        this[type][i].element.setSelected(!!keys[i]);
      }
    }
  },

  /**
   * Set or remove selected state for the regions.
   * @param {String|Array|Object} keys If <code>String</code> or <code>Array</code> the region(s) with the corresponding code(s) will be selected. If <code>Object</code> was provided its keys are  codes of regions, state of which should be changed. Selected state will be set if value is true, removed otherwise.
   */
  setSelectedRegions: function (keys) {
    this.setSelected("regions", keys);
  },

  /**
   * Set or remove selected state for the markers.
   * @param {String|Array|Object} keys If <code>String</code> or <code>Array</code> the marker(s) with the corresponding code(s) will be selected. If <code>Object</code> was provided its keys are  codes of markers, state of which should be changed. Selected state will be set if value is true, removed otherwise.
   */
  setSelectedMarkers: function (keys) {
    this.setSelected("markers", keys);
  },

  clearSelected: function (type) {
    var select = {},
      selected = this.getSelected(type),
      i;

    for (i = 0; i < selected.length; i++) {
      select[selected[i]] = false;
    }

    this.setSelected(type, select);
  },

  /**
   * Remove the selected state from all the currently selected regions.
   */
  clearSelectedRegions: function () {
    this.clearSelected("regions");
  },

  /**
   * Remove the selected state from all the currently selected markers.
   */
  clearSelectedMarkers: function () {
    this.clearSelected("markers");
  },

  /**
   * Return the instance of Map. Useful when instantiated as a jQuery plug-in.
   * @returns {Map}
   */
  getMapObject: function () {
    return this;
  },

  /**
   * Return the name of the region by region code.
   * @returns {String}
   */
  getRegionName: function (code) {
    return this.mapData.paths[code].name;
  },

  createRegions: function () {
    var key,
      region,
      map = this;

    this.regionLabelsGroup = this.regionLabelsGroup || this.canvas.addGroup();

    for (key in this.mapData.paths) {
      const regionStyle =
        typeof this.params.regionStyle === "function"
          ? {
              ...jvm.Map.defaultParams.regionStyle,
              ...this.params.regionStyle(key),
            }
          : this.params.regionStyle;
      region = new jvm.Region({
        map: this,
        path: this.mapData.paths[key].path,
        code: key,
        style: jvm.$.extend(true, {}, regionStyle),
        labelStyle: jvm.$.extend(true, {}, this.params.regionLabelStyle),
        canvas: this.canvas,
        labelsGroup: this.regionLabelsGroup,
        label:
          this.canvas.mode != "vml"
            ? this.params.labels && this.params.labels.regions
            : null,
      });

      jvm.$(region.shape).bind("selected", function (e, isSelected) {
        map.container.trigger("regionSelected.jvectormap", [
          jvm.$(this.node).attr("data-code"),
          isSelected,
          map.getSelectedRegions(),
        ]);
      });
      this.regions[key] = {
        element: region,
        config: this.mapData.paths[key],
      };
    }
  },

  createMarkers: function (markers) {
    var i,
      marker,
      point,
      markerConfig,
      markersArray,
      map = this;

    this.markersGroup = this.markersGroup || this.canvas.addGroup();
    this.markerLabelsGroup = this.markerLabelsGroup || this.canvas.addGroup();

    if (jvm.$.isArray(markers)) {
      markersArray = markers.slice();
      markers = {};
      for (i = 0; i < markersArray.length; i++) {
        markers[i] = markersArray[i];
      }
    }

    for (i in markers) {
      markerConfig =
        markers[i] instanceof Array ? { latLng: markers[i] } : markers[i];
      point = this.getMarkerPosition(markerConfig);

      if (point !== false) {
        marker = new jvm.Marker({
          map: this,
          style: jvm.$.extend(true, {}, this.params.markerStyle, {
            initial: markerConfig.style || {},
          }),
          labelStyle: jvm.$.extend(true, {}, this.params.markerLabelStyle),
          index: i,
          cx: point.x,
          cy: point.y,
          group: this.markersGroup,
          canvas: this.canvas,
          labelsGroup: this.markerLabelsGroup,
          label:
            this.canvas.mode != "vml"
              ? this.params.labels && this.params.labels.markers
              : null,
        });

        jvm.$(marker.shape).bind("selected", function (e, isSelected) {
          map.container.trigger("markerSelected.jvectormap", [
            jvm.$(this.node).attr("data-index"),
            isSelected,
            map.getSelectedMarkers(),
          ]);
        });
        if (this.markers[i]) {
          this.removeMarkers([i]);
        }
        this.markers[i] = { element: marker, config: markerConfig };
      }
    }
  },

  repositionMarkers: function () {
    var i, point;

    for (i in this.markers) {
      point = this.getMarkerPosition(this.markers[i].config);
      if (point !== false) {
        this.markers[i].element.setStyle({ cx: point.x, cy: point.y });
      }
    }
  },

  repositionLabels: function () {
    var key;

    for (key in this.regions) {
      this.regions[key].element.updateLabelPosition();
    }

    for (key in this.markers) {
      this.markers[key].element.updateLabelPosition();
    }
  },

  getMarkerPosition: function (markerConfig) {
    if (jvm.Map.maps[this.params.map].projection) {
      return this.latLngToPoint.apply(this, markerConfig.latLng || [0, 0]);
    } else {
      return {
        x: markerConfig.coords[0] * this.scale + this.transX * this.scale,
        y: markerConfig.coords[1] * this.scale + this.transY * this.scale,
      };
    }
  },

  /**
   * Add one marker to the map.
   * @param {String} key Marker unique code.
   * @param {Object} marker Marker configuration parameters.
   * @param {Array} seriesData Values to add to the data series.
   */
  addMarker: function (key, marker, seriesData) {
    var markers = {},
      data = [],
      values,
      i,
      seriesData = seriesData || [];

    markers[key] = marker;

    for (i = 0; i < seriesData.length; i++) {
      values = {};
      if (typeof seriesData[i] !== "undefined") {
        values[key] = seriesData[i];
      }
      data.push(values);
    }
    this.addMarkers(markers, data);
  },

  /**
   * Add set of marker to the map.
   * @param {Object|Array} markers Markers to add to the map. In case of array is provided, codes of markers will be set as string representations of array indexes.
   * @param {Array} seriesData Values to add to the data series.
   */
  addMarkers: function (markers, seriesData) {
    var i;

    seriesData = seriesData || [];

    this.createMarkers(markers);
    for (i = 0; i < seriesData.length; i++) {
      this.series.markers[i].setValues(seriesData[i] || {});
    }
  },

  /**
   * Remove some markers from the map.
   * @param {Array} markers Array of marker codes to be removed.
   */
  removeMarkers: function (markers) {
    var i;

    for (i = 0; i < markers.length; i++) {
      this.markers[markers[i]].element.remove();
      delete this.markers[markers[i]];
    }
  },

  /**
   * Remove all markers from the map.
   */
  removeAllMarkers: function () {
    var i,
      markers = [];

    for (i in this.markers) {
      markers.push(i);
    }
    this.removeMarkers(markers);
  },

  /**
   * Converts coordinates expressed as latitude and longitude to the coordinates in pixels on the map.
   * @param {Number} lat Latitide of point in degrees.
   * @param {Number} lng Longitude of point in degrees.
   */
  latLngToPoint: function (lat, lng) {
    var point,
      proj = jvm.Map.maps[this.params.map].projection,
      centralMeridian = proj.centralMeridian,
      inset,
      bbox;

    if (lng < -180 + centralMeridian) {
      lng += 360;
    }

    point = jvm.Proj[proj.type](lat, lng, centralMeridian);

    inset = this.getInsetForPoint(point.x, point.y);
    if (inset) {
      bbox = inset.bbox;

      point.x =
        ((point.x - bbox[0].x) / (bbox[1].x - bbox[0].x)) *
        inset.width *
        this.scale;
      point.y =
        ((point.y - bbox[0].y) / (bbox[1].y - bbox[0].y)) *
        inset.height *
        this.scale;

      return {
        x: point.x + this.transX * this.scale + inset.left * this.scale,
        y: point.y + this.transY * this.scale + inset.top * this.scale,
      };
    } else {
      return false;
    }
  },

  /**
   * Converts cartesian coordinates into coordinates expressed as latitude and longitude.
   * @param {Number} x X-axis of point on map in pixels.
   * @param {Number} y Y-axis of point on map in pixels.
   */
  pointToLatLng: function (x, y) {
    var proj = jvm.Map.maps[this.params.map].projection,
      centralMeridian = proj.centralMeridian,
      insets = jvm.Map.maps[this.params.map].insets,
      i,
      inset,
      bbox,
      nx,
      ny;

    for (i = 0; i < insets.length; i++) {
      inset = insets[i];
      bbox = inset.bbox;

      nx = x - (this.transX * this.scale + inset.left * this.scale);
      ny = y - (this.transY * this.scale + inset.top * this.scale);

      nx =
        (nx / (inset.width * this.scale)) * (bbox[1].x - bbox[0].x) + bbox[0].x;
      ny =
        (ny / (inset.height * this.scale)) * (bbox[1].y - bbox[0].y) +
        bbox[0].y;

      if (
        nx > bbox[0].x &&
        nx < bbox[1].x &&
        ny > bbox[0].y &&
        ny < bbox[1].y
      ) {
        return jvm.Proj[proj.type + "_inv"](nx, -ny, centralMeridian);
      }
    }

    return false;
  },

  getInsetForPoint: function (x, y) {
    var insets = jvm.Map.maps[this.params.map].insets,
      i,
      bbox;

    for (i = 0; i < insets.length; i++) {
      bbox = insets[i].bbox;
      if (x > bbox[0].x && x < bbox[1].x && y > bbox[0].y && y < bbox[1].y) {
        return insets[i];
      }
    }
  },

  createSeries: function () {
    var i, key;

    this.series = {
      markers: [],
      regions: [],
    };

    for (key in this.params.series) {
      for (i = 0; i < this.params.series[key].length; i++) {
        this.series[key][i] = new jvm.DataSeries(
          this.params.series[key][i],
          this[key],
          this,
        );
      }
    }
  },

  /**
   * Gracefully remove the map and and all its accessories, unbind event handlers.
   */
  remove: function () {
    this.tip.remove();
    this.container.remove();
    jvm.$(window).unbind("resize", this.onResize);
    jvm.$("body").unbind("mouseup", this.onContainerMouseUp);
  },
};

jvm.Map.maps = {};
jvm.Map.defaultParams = {
  map: "world_mill_en",
  backgroundColor: "#505050",
  zoomButtons: true,
  zoomOnScroll: true,
  zoomOnScrollSpeed: 3,
  panOnDrag: true,
  zoomMax: 8,
  zoomMin: 1,
  zoomStep: 1.6,
  zoomAnimate: true,
  regionsSelectable: false,
  markersSelectable: false,
  bindTouchEvents: true,
  regionStyle: {
    initial: {
      fill: "white",
      "fill-opacity": 1,
      stroke: "none",
      "stroke-width": 0,
      "stroke-opacity": 1,
    },
    hover: {
      "fill-opacity": 0.8,
      cursor: "pointer",
    },
    selected: {
      fill: "yellow",
    },
    selectedHover: {},
  },
  regionLabelStyle: {
    initial: {
      "font-family": "Verdana",
      "font-size": "12",
      "font-weight": "bold",
      cursor: "default",
      fill: "black",
    },
    hover: {
      cursor: "pointer",
    },
  },
  markerStyle: {
    initial: {
      fill: "grey",
      stroke: "#505050",
      "fill-opacity": 1,
      "stroke-width": 1,
      "stroke-opacity": 1,
      r: 5,
    },
    hover: {
      stroke: "black",
      "stroke-width": 2,
      cursor: "pointer",
    },
    selected: {
      fill: "blue",
    },
    selectedHover: {},
  },
  markerLabelStyle: {
    initial: {
      "font-family": "Verdana",
      "font-size": "12",
      "font-weight": "bold",
      cursor: "default",
      fill: "black",
    },
    hover: {
      cursor: "pointer",
    },
  },
};
jvm.Map.apiEvents = {
  onRegionTipShow: "regionTipShow",
  onRegionOver: "regionOver",
  onRegionOut: "regionOut",
  onRegionClick: "regionClick",
  onRegionSelected: "regionSelected",
  onMarkerTipShow: "markerTipShow",
  onMarkerOver: "markerOver",
  onMarkerOut: "markerOut",
  onMarkerClick: "markerClick",
  onMarkerSelected: "markerSelected",
  onViewportChange: "viewportChange",
};
/**
 * Creates map with drill-down functionality.
 * @constructor
 * @param {Object} params Parameters to initialize map with.
 * @param {Number} params.maxLevel Maximum number of levels user can go through
 * @param {Object} params.main Config of the main map. See <a href="./jvm-map/">jvm.Map</a> for more information.
 * @param {Function} params.mapNameByCode Function to generate map name by region code. Default value is:
<pre>
function(code, multiMap) {
  return code.toLowerCase()+'_'+
         multiMap.defaultProjection+'_en';
}
</pre>
 * @param {Function} params.mapUrlByCode Function to generate map url by region code. Default value is:
<pre>
function(code, multiMap){
  return 'jquery-jvectormap-data-'+
         code.toLowerCase()+'-'+
         multiMap.defaultProjection+'-en.js';
}
</pre>
 */
jvm.MultiMap = function (params) {
  var that = this;

  this.maps = {};
  this.params = jvm.$.extend(true, {}, jvm.MultiMap.defaultParams, params);
  this.params.maxLevel = this.params.maxLevel || Number.MAX_VALUE;
  this.params.main = this.params.main || {};
  this.params.main.multiMapLevel = 0;
  this.history = [this.addMap(this.params.main.map, this.params.main)];
  this.defaultProjection = this.history[0].mapData.projection.type;
  this.mapsLoaded = {};
  this.mapsLoadedData = {};

  this.params.container.css({ position: "relative" });
  this.backButton = jvm
    .$("<div/>")
    .addClass("jvectormap-goback")
    .text("Back")
    .appendTo(this.params.container);
  this.backButton.hide();
  this.backButton.click(function () {
    that.goBack();
  });

  this.spinner = jvm
    .$("<div/>")
    .addClass("jvectormap-spinner")
    .appendTo(this.params.container);
  this.spinner.hide();
};

jvm.MultiMap.prototype = {
  addMap: function (name, config) {
    var cnt = jvm.$("<div/>").css({
      width: "100%",
      height: "100%",
    });

    this.params.container.append(cnt);

    this.maps[name] = new jvm.Map(jvm.$.extend(config, { container: cnt }));
    if (this.params.maxLevel > config.multiMapLevel) {
      this.maps[name].container.on(
        "regionClick.jvectormap",
        { scope: this },
        function (e, code) {
          var multimap = e.data.scope,
            mapName = multimap.params.mapNameByCode(code, multimap);

          if (
            !multimap.drillDownPromise ||
            multimap.drillDownPromise.state() !== "pending"
          ) {
            multimap.drillDown(mapName, code);
          }
        },
      );
    }

    return this.maps[name];
  },

  downloadMap: function (code) {
    var that = this,
      deferred = jvm.$.Deferred();
    const { getDrillDownMap } = this.params;

    const handleMapData = function (data) {
      that.mapsLoaded[code] = true;
      that.mapsLoadedData[code] = data;
      deferred.resolve();
    };

    if (!this.mapsLoaded[code]) {
      if (getDrillDownMap && typeof getDrillDownMap === "function") {
        const result = getDrillDownMap(code);
        if (result && typeof result.then === "function") {
          result
            .then((data) => {
              handleMapData(data);
            })
            .catch(() => {
              deferred.reject();
            });
        } else {
          handleMapData(result);
        }
        return deferred;
      }
      jvm.$.get(this.params.mapUrlByCode(code, this)).then(
        function (data) {
          handleMapData(data);
        },
        function () {
          deferred.reject();
        },
      );
    } else {
      deferred.resolve();
    }
    return deferred;
  },

  drillDown: function (name, code) {
    var currentMap = this.history[this.history.length - 1],
      that = this,
      focusPromise = currentMap.setFocus({ region: code, animate: true }),
      downloadPromise = this.downloadMap(code);

    focusPromise.then(function () {
      if (downloadPromise.state() === "pending") {
        that.spinner.show();
      }
    });
    downloadPromise.always(function () {
      that.spinner.hide();
    });
    this.drillDownPromise = jvm.$.when(downloadPromise, focusPromise);
    this.drillDownPromise.then(function () {
      const { content } = that.mapsLoadedData[code];
      currentMap.params.container.hide();
      if (!that.maps[name]) {
        jvm.$.fn.vectorMap("addMap", name, content);
        that.addMap(name, {
          map: name,
          multiMapLevel: currentMap.params.multiMapLevel + 1,
        });
      } else {
        that.maps[name].params.container.show();
      }
      that.history.push(that.maps[name]);
      that.backButton.show();
    });
  },

  goBack: function () {
    var currentMap = this.history.pop(),
      prevMap = this.history[this.history.length - 1],
      that = this;

    currentMap
      .setFocus({ scale: 1, x: 0.5, y: 0.5, animate: true })
      .then(function () {
        currentMap.params.container.hide();
        prevMap.params.container.show();
        prevMap.updateSize();
        if (that.history.length === 1) {
          that.backButton.hide();
        }
        prevMap.setFocus({ scale: 1, x: 0.5, y: 0.5, animate: true });
      });
  },
};

jvm.MultiMap.defaultParams = {
  mapNameByCode: function (code, multiMap) {
    return code.toLowerCase() + "_" + multiMap.defaultProjection + "_en";
  },
  mapUrlByCode: function (code, multiMap) {
    return (
      "jquery-jvectormap-data-" +
      code.toLowerCase() +
      "-" +
      multiMap.defaultProjection +
      "-en.js"
    );
  },
};


//# sourceURL=webpack://@react-jvectormap/core/../jvectormap/jquery.jvectormap.min.js?`)},"data:image/gif;base64,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":module=>{eval(`module.exports = "data:image/gif;base64,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";

//# sourceURL=webpack://@react-jvectormap/core/data:image/gif;base64,R0lGODlhIAAgAPMAAP///wAAAMbGxoSEhLa2tpqamjY2NlZWVtjY2OTk5Ly8vB4eHgQEBAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHRLYKhKP1oZmADdEAAAh+QQJCgAAACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY/CZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB+A4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6+Ho7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq+B6QDtuetcaBPnW6+O7wDHpIiK9SaVK5GgV543tzjgGcghAgAh+QQJCgAAACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK++G+w48edZPK+M6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkECQoAAAAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE+G+cD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm+FNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk+aV+oJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkECQoAAAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0/VNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAkKAAAALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc+XiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30/iI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE/jiuL04RGEBgwWhShRgQExHBAAh+QQJCgAAACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR+ipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY+Yip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd+MFCN6HAAIKgNggY0KtEBAAh+QQJCgAAACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1+vsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d+jYUqfAhhykOFwJWiAAAIfkECQoAAAAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg+ygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0+bm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h+Kr0SJ8MFihpNbx+4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX+BP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA==?`)},jquery:W=>{W.exports=__WEBPACK_EXTERNAL_MODULE_jquery__},react:W=>{W.exports=__WEBPACK_EXTERNAL_MODULE_react__}},__webpack_module_cache__={};function __webpack_require__(W){var w=__webpack_module_cache__[W];if(w!==void 0)return w.exports;var J=__webpack_module_cache__[W]={id:W,exports:{}};return __webpack_modules__[W](J,J.exports,__webpack_require__),J.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.n=W=>{var w=W&&W.__esModule?()=>W.default:()=>W;return __webpack_require__.d(w,{a:w}),w},__webpack_require__.d=(W,w)=>{for(var J in w)__webpack_require__.o(w,J)&&!__webpack_require__.o(W,J)&&Object.defineProperty(W,J,{enumerable:!0,get:w[J]})},__webpack_require__.o=(W,w)=>Object.prototype.hasOwnProperty.call(W,w),__webpack_require__.r=W=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(W,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(W,"__esModule",{value:!0})},__webpack_require__.b=document.baseURI||self.location.href;var __webpack_exports__=__webpack_require__("./src/index.ts");return __webpack_exports__})()})})(dist);var distExports=dist.exports;const MyWorldMap=()=>{const[W,w]=reactExports.useState(null),J=(Q,$e)=>{w($e)};return jsxRuntimeExports.jsx("div",{style:{width:500,height:500},children:W?jsxRuntimeExports.jsx(MapContainer,{zoom:5,style:{height:500,width:"100%"},children:jsxRuntimeExports.jsx(TileLayer,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"})}):jsxRuntimeExports.jsx(distExports.VectorMap,{map:distExports.worldMill,className:css.MyWorldMap,onRegionClick:J})})};export{MyWorldMap as default};
