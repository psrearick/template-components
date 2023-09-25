/*! modernizr 3.11.2 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssanimations-csscolumns-customelements-flexbox-history-picture-pointerevents-postmessage-sizes-srcset-webgl-websockets-webworkers-addtest-domprefixes-hasevent-mq-prefixedcssvalue-prefixes-setclasses-testallprops-testprop-teststyles !*/!function(e,t,n,r){function o(e,t){return typeof e===t}function i(e){var t=b.className,n=w._config.classPrefix||"";if(S&&(t=t.baseVal),w._config.enableJSClass){var r=RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}w._config.enableClasses&&(e.length>0&&(t+=" "+n+e.join(" "+n)),S?b.className.baseVal=t:b.className=t)}function s(e,t){if("object"==typeof e)for(var n in e)v(e,n)&&s(n,e[n]);else{var r=(e=e.toLowerCase()).split("."),o=w[r[0]];if(2===r.length&&(o=o[r[1]]),void 0!==o)return w;t="function"==typeof t?t():t,1===r.length?w[r[0]]=t:(!w[r[0]]||w[r[0]]instanceof Boolean||(w[r[0]]=new Boolean(w[r[0]])),w[r[0]][r[1]]=t),i([(t&&!1!==t?"":"no-")+r.join("-")]),w._trigger(e,t)}return w}function a(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):S?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function l(e,t,r,o){var i,s,l,u,f,d="modernizr",c=a("div"),p=((i=n.body)||((i=a(S?"svg":"body")).fake=!0),i);if(parseInt(r,10))for(;r--;)(u=a("div")).id=o?o[r]:d+(r+1),c.appendChild(u);return(s=a("style")).type="text/css",s.id="s"+d,(p.fake?p:c).appendChild(s),p.appendChild(c),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),c.id=d,p.fake&&(p.style.background="",p.style.overflow="hidden",f=b.style.overflow,b.style.overflow="hidden",b.appendChild(p)),l=t(c,e),p.fake?(p.parentNode.removeChild(p),b.style.overflow=f,b.offsetHeight):c.parentNode.removeChild(c),!!l}function u(e,n,r){var o;if("getComputedStyle"in t){o=getComputedStyle.call(t,e,n);var i=t.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(i){var s=i.error?"error":"log";i[s].call(i,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!n&&e.currentStyle&&e.currentStyle[r];return o}function f(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function d(e,n,i,s){function d(){p&&(delete z.style,delete z.modElem)}if(s=!o(s,"undefined")&&s,!o(i,"undefined")){var c=function(e,n){var o=e.length;if("CSS"in t&&"supports"in t.CSS){for(;o--;)if(t.CSS.supports(f(e[o]),n))return!0;return!1}if("CSSSupportsRule"in t){for(var i=[];o--;)i.push("("+f(e[o])+":"+n+")");return l("@supports ("+(i=i.join(" or "))+") { #modernizr { position: absolute; } }",function(e){return"absolute"===u(e,null,"position")})}return r}(e,i);if(!o(c,"undefined"))return c}for(var p,m,h,A,v,g=["modernizr","tspan","samp"];!z.style&&g.length;)p=!0,z.modElem=a(g.shift()),z.style=z.modElem.style;for(h=e.length,m=0;m<h;m++)if(A=e[m],v=z.style[A],~(""+A).indexOf("-")&&(A=A.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")),z.style[A]!==r){if(s||o(i,"undefined"))return d(),"pfx"!==n||A;try{z.style[A]=i}catch(e){}if(z.style[A]!==v)return d(),"pfx"!==n||A}return d(),!1}function c(e,t,n,r,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+B.join(s+" ")+s).split(" ");return o(t,"string")||o(t,"undefined")?d(a,t,r,i):function(e,t,n){var r;for(var i in e)if(e[i]in t)return!1===n?e[i]:o(r=t[e[i]],"function")?function(e,t){return function(){return e.apply(t,arguments)}}(r,n||t):r;return!1}(a=(e+" "+_.join(s+" ")+s).split(" "),t,n)}function p(e,t,n){return c(e,r,r,t,n)}var m,h,A,v,g=[],y={_version:"3.11.2",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){g.push({name:e,fn:t,options:n})},addAsyncTest:function(e){g.push({name:null,fn:e})}},w=function(){};w.prototype=y,w=new w;var C=[],b=n.documentElement,S="svg"===b.nodeName.toLowerCase(),x="Moz O ms Webkit",_=y._config.usePrefixes?x.toLowerCase().split(" "):[];y._domPrefixes=_;var T=y._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];y._prefixes=T,v=o(m=({}).hasOwnProperty,"undefined")||o(m.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(e,t){return m.call(e,t)},y._l={},y.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),w.hasOwnProperty(e)&&setTimeout(function(){w._trigger(e,w[e])},0)},y._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e;for(e=0;e<n.length;e++)(0,n[e])(t)},0),delete this._l[e]}},w._q.push(function(){y.addTest=s});var P=(h=!("onblur"in b),function(e,t){var n;return!!e&&(t&&"string"!=typeof t||(t=a(t||"div")),(n=(e="on"+e)in t)||!h||(t.setAttribute||(t=a("div")),t.setAttribute(e,""),n="function"==typeof t[e],t[e]!==r&&(t[e]=r),t.removeAttribute(e)),n)});y.hasEvent=P;var k=(A=t.matchMedia||t.msMatchMedia)?function(e){var t=A(e);return t&&t.matches||!1}:function(e){var t=!1;return l("@media "+e+" { #modernizr { position: absolute; } }",function(e){t="absolute"===u(e,null,"position")}),t};y.mq=k,y.prefixedCSSValue=function(e,t){var n=!1,r=a("div").style;if(e in r){var o=_.length;for(r[e]=t,n=r[e];o--&&!n;)r[e]="-"+_[o]+"-"+t,n=r[e]}return""===n&&(n=!1),n};var B=y._config.usePrefixes?x.split(" "):[];y._cssomPrefixes=B;var E={elem:a("modernizr")};w._q.push(function(){delete E.elem});var z={style:E.elem.style};w._q.unshift(function(){delete z.style}),y.testAllProps=c,y.testAllProps=p,y.testProp=function(e,t,n){return d([e],r,t,n)},y.testStyles=l,w.addTest("customelements","customElements"in t),w.addTest("history",function(){var e=navigator.userAgent;return!!e&&(-1===e.indexOf("Android 2.")&&-1===e.indexOf("Android 4.0")||-1===e.indexOf("Mobile Safari")||-1!==e.indexOf("Chrome")||-1!==e.indexOf("Windows Phone")||"file:"===location.protocol)&&t.history&&"pushState"in t.history});var O=[""].concat(_);y._domPrefixesAll=O,w.addTest("pointerevents",function(){for(var e=0,t=O.length;e<t;e++)if(P(O[e]+"pointerdown"))return!0;return!1});var L=!0;try{t.postMessage({toString:function(){L=!1}},"*")}catch(e){}w.addTest("postmessage",new Boolean("postMessage"in t)),w.addTest("postmessage.structuredclones",L),w.addTest("webgl",function(){return"WebGLRenderingContext"in t});var N=!1;try{N="WebSocket"in t&&2===t.WebSocket.CLOSING}catch(e){}w.addTest("websockets",N),w.addTest("cssanimations",p("animationName","a",!0)),function(){w.addTest("csscolumns",function(){var e=!1,t=p("columnCount");try{(e=!!t)&&(e=new Boolean(e))}catch(e){}return e});for(var e,t,n=["Width","Span","Fill","Gap","Rule","RuleColor","RuleStyle","RuleWidth","BreakBefore","BreakAfter","BreakInside"],r=0;r<n.length;r++)e=n[r].toLowerCase(),t=p("column"+n[r]),"breakbefore"!==e&&"breakafter"!==e&&"breakinside"!==e||(t=t||p(n[r])),w.addTest("csscolumns."+e,t)}(),w.addTest("flexbox",p("flexBasis","1px",!0)),w.addTest("picture","HTMLPictureElement"in t),w.addAsyncTest(function(){var e,t,n=a("img"),r="sizes"in n;!r&&"srcset"in n?(e="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",t=function(){s("sizes",2===n.width)},n.onload=t,n.onerror=t,n.setAttribute("sizes","9px"),n.srcset=e+" 1w,data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw== 8w",n.src=e):s("sizes",r)}),w.addTest("srcset","srcset"in a("img")),w.addTest("webworkers","Worker"in t),function(){var e,t,n,r,i,s;for(var a in g)if(g.hasOwnProperty(a)){if(e=[],(t=g[a]).name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(r=o(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)1===(s=e[i].split(".")).length?w[s[0]]=r:(w[s[0]]&&(!w[s[0]]||w[s[0]]instanceof Boolean)||(w[s[0]]=new Boolean(w[s[0]])),w[s[0]][s[1]]=r),C.push((r?"":"no-")+s.join("-"))}}(),i(C),delete y.addTest,delete y.addAsyncTest;for(var j=0;j<w._q.length;j++)w._q[j]();e.Modernizr=w}(window,window,document);//# sourceMappingURL=playground.c6c271ac.js.map

//# sourceMappingURL=playground.c6c271ac.js.map
