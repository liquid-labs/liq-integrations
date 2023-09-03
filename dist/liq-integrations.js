"use strict"
Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"})
const t=require("node:path"),e=require("@liquid-labs/liq-defaults"),r=require("@liquid-labs/liq-plugins-lib"),n=require("find-plugins")
function o(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}})
if(t)for(const r in t)if("default"!==r){const n=Object.getOwnPropertyDescriptor(t,r)
Object.defineProperty(e,r,n.get?n:{enumerable:!0,get:()=>t[r]})}return e.default=t,Object.freeze(e)}const i=o(t)
var a=function(t){return t.app.ext.serverVersion},u="integrations",l="integrations",s=r.addPluginsSetup({hostVersionRetriever:a,pluginsDesc:l,pluginType:u}),c=s.help,f=s.method,p=s.parameters,h=i.join(e.LIQ_HOME,"plugins","integrations"),g=r.addPluginsHandler({hostVersionRetriever:a,installedPluginsRetriever:function(t){return t.app.ext.integrations.listPlugins()},pluginsDesc:l,pluginPkgDirRetriever:h,pluginType:u})
const v=Object.freeze(Object.defineProperty({__proto__:null,func:g,help:c,method:f,parameters:p,path:["server","plugins","integrations","add"]},Symbol.toStringTag,{value:"Module"}))
var d=r.detailsPluginSetup({pluginsDesc:"integrations"}),y=d.help,m=d.method,b=d.parameters,w=r.detailsPluginHandler({installedPluginsRetriever:function(t){return t.app.ext.integrations.listPlugins()}})
const x=Object.freeze(Object.defineProperty({__proto__:null,func:w,help:y,method:m,parameters:b,path:["server","plugins","integrations",":integrationPluginName","details"]},Symbol.toStringTag,{value:"Module"}))
var _=r.listPluginsSetup({pluginsDesc:"sever endpoint"}),P=_.help,j=_.method,S=_.parameters,O=r.listPluginsHandler({hostVersionRetriever:function(t){return t.app.ext.serverVersion},installedPluginsRetriever:function(t){return t.app.ext.integrations.listPlugins()},pluginType:"integrations"})
const E=Object.freeze(Object.defineProperty({__proto__:null,func:O,help:P,method:j,parameters:S,path:["server","plugins","integrations","list"]},Symbol.toStringTag,{value:"Module"}))
var L=r.removePluginsSetup({pluginsDesc:"sever endpoint"}),k=L.help,T=L.method,N=L.parameters,M=i.join(e.LIQ_HOME,"plugins","integrations"),I=r.removePluginsHandler({installedPluginsRetriever:function(t){return t.app.ext.integrations.listPlugins()},nameKey:"handlerPluginName",pluginPkgDirRetriever:M})
var A=[v,x,E,Object.freeze(Object.defineProperty({__proto__:null,func:I,help:k,method:T,parameters:N,path:["server","plugins","integrations",":integrationPluginName","remove"]},Symbol.toStringTag,{value:"Module"}))]
function R(t,e,r,n,o,i,a){try{var u=t[i](a),l=u.value}catch(t){return void r(t)}u.done?e(l):Promise.resolve(l).then(n,o)}function G(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var q={exports:{}},F={exports:{}}
!function(t){function e(r){return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,e(r)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports}(F)
var H=F.exports
!function(t){var e=H.default
function r(){t.exports=r=function(){return o},t.exports.__esModule=!0,t.exports.default=t.exports
var n,o={},i=Object.prototype,a=i.hasOwnProperty,u=Object.defineProperty||function(t,e,r){t[e]=r.value},l="function"==typeof Symbol?Symbol:{},s=l.iterator||"@@iterator",c=l.asyncIterator||"@@asyncIterator",f=l.toStringTag||"@@toStringTag"
function p(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{p({},"")}catch(n){p=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var o=e&&e.prototype instanceof w?e:w,i=Object.create(o.prototype),a=new I(n||[])
return u(i,"_invoke",{value:k(t,r,a)}),i}function g(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}o.wrap=h
var v="suspendedStart",d="suspendedYield",y="executing",m="completed",b={}
function w(){}function x(){}function _(){}var P={}
p(P,s,(function(){return this}))
var j=Object.getPrototypeOf,S=j&&j(j(A([])))
S&&S!==i&&a.call(S,s)&&(P=S)
var O=_.prototype=w.prototype=Object.create(P)
function E(t){["next","throw","return"].forEach((function(e){p(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,r){function n(o,i,u,l){var s=g(t[o],t,i)
if("throw"!==s.type){var c=s.arg,f=c.value
return f&&"object"==e(f)&&a.call(f,"__await")?r.resolve(f.__await).then((function(t){n("next",t,u,l)}),(function(t){n("throw",t,u,l)})):r.resolve(f).then((function(t){c.value=t,u(c)}),(function(t){return n("throw",t,u,l)}))}l(s.arg)}var o
u(this,"_invoke",{value:function(t,e){function i(){return new r((function(r,o){n(t,e,r,o)}))}return o=o?o.then(i,i):i()}})}function k(t,e,r){var o=v
return function(i,a){if(o===y)throw new Error("Generator is already running")
if(o===m){if("throw"===i)throw a
return{value:n,done:!0}}for(r.method=i,r.arg=a;;){var u=r.delegate
if(u){var l=T(u,r)
if(l){if(l===b)continue
return l}}if("next"===r.method)r.sent=r._sent=r.arg
else if("throw"===r.method){if(o===v)throw o=m,r.arg
r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg)
o=y
var s=g(t,e,r)
if("normal"===s.type){if(o=r.done?m:d,s.arg===b)continue
return{value:s.arg,done:r.done}}"throw"===s.type&&(o=m,r.method="throw",r.arg=s.arg)}}}function T(t,e){var r=e.method,o=t.iterator[r]
if(o===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=n,T(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),b
var i=g(o,t.iterator,e.arg)
if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,b
var a=i.arg
return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,b):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,b)}function N(t){var e={tryLoc:t[0]}
1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function M(t){var e=t.completion||{}
e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(N,this),this.reset(!0)}function A(t){if(t||""===t){var r=t[s]
if(r)return r.call(t)
if("function"==typeof t.next)return t
if(!isNaN(t.length)){var o=-1,i=function e(){for(;++o<t.length;)if(a.call(t,o))return e.value=t[o],e.done=!1,e
return e.value=n,e.done=!0,e}
return i.next=i}}throw new TypeError(e(t)+" is not iterable")}return x.prototype=_,u(O,"constructor",{value:_,configurable:!0}),u(_,"constructor",{value:x,configurable:!0}),x.displayName=p(_,f,"GeneratorFunction"),o.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor
return!!e&&(e===x||"GeneratorFunction"===(e.displayName||e.name))},o.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,_):(t.__proto__=_,p(t,f,"GeneratorFunction")),t.prototype=Object.create(O),t},o.awrap=function(t){return{__await:t}},E(L.prototype),p(L.prototype,c,(function(){return this})),o.AsyncIterator=L,o.async=function(t,e,r,n,i){void 0===i&&(i=Promise)
var a=new L(h(t,e,r,n),i)
return o.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},E(O),p(O,f,"Generator"),p(O,s,(function(){return this})),p(O,"toString",(function(){return"[object Generator]"})),o.keys=function(t){var e=Object(t),r=[]
for(var n in e)r.push(n)
return r.reverse(),function t(){for(;r.length;){var n=r.pop()
if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},o.values=A,I.prototype={constructor:I,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(M),!t)for(var e in this)"t"===e.charAt(0)&&a.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0
var t=this.tryEntries[0].completion
if("throw"===t.type)throw t.arg
return this.rval},dispatchException:function(t){if(this.done)throw t
var e=this
function r(r,o){return u.type="throw",u.arg=t,e.next=r,o&&(e.method="next",e.arg=n),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],u=i.completion
if("root"===i.tryLoc)return r("end")
if(i.tryLoc<=this.prev){var l=a.call(i,"catchLoc"),s=a.call(i,"finallyLoc")
if(l&&s){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)
if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(l){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally")
if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r]
if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n
break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null)
var i=o?o.completion:{}
return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,b):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg
return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),b},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e]
if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),M(r),b}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e]
if(r.tryLoc===t){var n=r.completion
if("throw"===n.type){var o=n.arg
M(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:A(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),b}},o}t.exports=r,t.exports.__esModule=!0,t.exports.default=t.exports}(q)
var D=(0,q.exports)(),z=D
try{regeneratorRuntime=D}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=D:Function("r","regeneratorRuntime = r")(D)}const V=G(z)
function Q(t){return Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Q(t)}function C(t){var e=function(t,e){if("object"!==Q(t)||null===t)return t
var r=t[Symbol.toPrimitive]
if(void 0!==r){var n=r.call(t,e||"default")
if("object"!==Q(n))return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string")
return"symbol"===Q(e)?e:String(e)}function U(t,e){for(var r=0;r<e.length;r++){var n=e[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,C(n.key),n)}}function Y(t,e){var r=function(t,e,r){if(!e.has(t))throw new TypeError("attempted to "+r+" private field on non-instance")
return e.get(t)}(t,e,"get")
return function(t,e){return e.get?e.get.call(t):e.value}(t,r)}var K
function W(t,e,r){!function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(t,e),e.set(t,r)}var $=(K=new WeakMap,function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),W(this,K,{writable:!0,value:{}})}var e,r,n
return e=t,r=[{key:"callHook",value:function(t){var e=t.providerFor,r=t.providerArgs,n=t.hook,o=t.hookArgs,i=Y(this,K)[e]
if(void 0===i)throw new Error("No such provider class '".concat(e,"'."))
var a=i.filter((function(t){return t.providerTest(r)}))
if(0===a.length)throw new Error("No provider found for '".concat(e,"'."))
if(a.length>1)throw new Error("Ambiguous multiple providers found for '".concat(e,"'."))
var u=a[0],l=u.name,s=u.hooks[n]
if(void 0===s)throw new Error("No such hook '".concat(n,"' found for provider '").concat(l,"' (of class '").concat(e,"'."))
return s(o)}},{key:"register",value:function(t){var e=t.hooks,r=t.name,n=t.providerFor,o=t.providerTest
n in Y(this,K)||(Y(this,K)[n]=[]),Y(this,K)[n].push({hooks:e,name:r,providerTest:o})}}],r&&U(e.prototype,r),n&&U(e,n),Object.defineProperty(e,"prototype",{writable:!1}),t}())
function B(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"]
if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return
if("string"==typeof t)return J(t,e)
var r=Object.prototype.toString.call(t).slice(8,-1)
"Object"===r&&t.constructor&&(r=t.constructor.name)
if("Map"===r||"Set"===r)return Array.from(t)
if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return J(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r)
var n=0,o=function(){}
return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,u=!1
return{s:function(){r=r.call(t)},n:function(){var t=r.next()
return a=t.done,t},e:function(t){u=!0,i=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw i}}}}function J(t,e){(null==e||e>t.length)&&(e=t.length)
for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r]
return n}var X=function(){var t,r=(t=V.mark((function t(r){var o,a,u,l,s,c,f,p,h,g,v,d,y,m,b,w,x
return V.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:o=r.app,a=r.model,u=r.reporter,o.ext.integrations=new $,l=process.env.LIQ_INTEGRATION_PLUGINS_PATH||i.join(e.LIQ_HOME,"plugins","integrations"),s=path.join(l,"package.json"),c=path.join(l,"node_modules"),u.log("Searching for handler plugins (in ".concat(path.dirname(c),")...")),f=n({pkg:s,dir:c,filter:function(){return!0}}),u.log(0===f.length?"No plugins found.":"Found ".concat(f.length," plugins.")),p=B(f),t.prev=10,p.s()
case 12:if((h=p.n()).done){t.next=33
break}return g=h.value,v=g.dir,d=g.pkg,y=d.main,m=d.name,d.version,t.next=17,import("".concat(v,"/").concat(y))
case 17:if(t.t0=t.sent,t.t0){t.next=20
break}t.t0={}
case 20:if((b=t.t0).name,w=b.registerIntegrationPlugins,b.summary,void 0!==w){t.next=27
break}throw new Error("'liq-integrations' plugin from '".concat(m,"' does not export 'registerIntegrationPlugins'; bailing out."))
case 27:if(void 0===(x=w({app:o,model:a,reporter:u})).then){t.next=31
break}return t.next=31,x
case 31:t.next=12
break
case 33:t.next=38
break
case 35:t.prev=35,t.t1=t.catch(10),p.e(t.t1)
case 38:return t.prev=38,p.f(),t.finish(38)
case 41:case"end":return t.stop()}}),t,null,[[10,35,38,41]])})),function(){var e=this,r=arguments
return new Promise((function(n,o){var i=t.apply(e,r)
function a(t){R(i,n,o,a,u,"next",t)}function u(t){R(i,n,o,a,u,"throw",t)}a(void 0)}))})
return function(t){return r.apply(this,arguments)}}()
exports.handlers=A,exports.name="integrations",exports.setup=X,exports.summary="Manages integration plugins."
//# sourceMappingURL=liq-integrations.js.map
