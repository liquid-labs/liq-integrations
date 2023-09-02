"use strict"
Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"})
const e=require("node:path"),t=require("@liquid-labs/liq-defaults"),r=require("@liquid-labs/liq-plugins-lib")
function n(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}})
if(e)for(const r in e)if("default"!==r){const n=Object.getOwnPropertyDescriptor(e,r)
Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:()=>e[r]})}return t.default=e,Object.freeze(t)}const i=n(e)
var o=function(e){return e.app.ext.serverVersion},a="integrations",l="integrations",s=r.addPluginsSetup({hostVersionRetriever:o,pluginsDesc:l,pluginType:a}),u=s.help,p=s.method,c=s.parameters,g=i.join(t.LIQ_HOME,"plugins","integrations"),f=r.addPluginsHandler({hostVersionRetriever:o,installedPluginsRetriever:function(e){return e.app.ext.integrations.listPlugins()},pluginsDesc:l,pluginPkgDirRetriever:g,pluginType:a})
const d=Object.freeze(Object.defineProperty({__proto__:null,func:f,help:u,method:p,parameters:c,path:["server","plugins","integrations","add"]},Symbol.toStringTag,{value:"Module"}))
var v=r.detailsPluginSetup({pluginsDesc:"integrations"}),m=v.help,h=v.method,b=v.parameters,y=r.detailsPluginHandler({installedPluginsRetriever:function(e){return e.app.ext.integrations.listPlugins()}})
const P=Object.freeze(Object.defineProperty({__proto__:null,func:y,help:m,method:h,parameters:b,path:["server","plugins","integrations",":integrationPluginName","details"]},Symbol.toStringTag,{value:"Module"}))
var S=r.listPluginsSetup({pluginsDesc:"sever endpoint"}),w=S.help,j=S.method,O=S.parameters,_=r.listPluginsHandler({hostVersionRetriever:function(e){return e.app.ext.serverVersion},installedPluginsRetriever:function(e){return e.app.ext.integrations.listPlugins()},pluginType:"integrations"})
const T=Object.freeze(Object.defineProperty({__proto__:null,func:_,help:w,method:j,parameters:O,path:["server","plugins","integrations","list"]},Symbol.toStringTag,{value:"Module"}))
var k=r.removePluginsSetup({pluginsDesc:"sever endpoint"}),x=k.help,E=k.method,M=k.parameters,R=i.join(t.LIQ_HOME,"plugins","integrations"),D=r.removePluginsHandler({installedPluginsRetriever:function(e){return e.app.ext.integrations.listPlugins()},nameKey:"handlerPluginName",pluginPkgDirRetriever:R})
var q,N=[d,P,T,Object.freeze(Object.defineProperty({__proto__:null,func:D,help:x,method:E,parameters:M,path:["server","plugins","integrations",":integrationPluginName","remove"]},Symbol.toStringTag,{value:"Module"}))]
function z(e){return z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},z(e)}function H(e){var t=function(e,t){if("object"!==z(e)||null===e)return e
var r=e[Symbol.toPrimitive]
if(void 0!==r){var n=r.call(e,t||"default")
if("object"!==z(n))return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string")
return"symbol"===z(t)?t:String(t)}function V(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,H(n.key),n)}}function A(e,t){var r=function(e,t,r){if(!t.has(e))throw new TypeError("attempted to "+r+" private field on non-instance")
return t.get(e)}(e,t,"get")
return function(e,t){return t.get?t.get.call(e):t.value}(e,r)}function C(e,t,r){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.set(e,r)}var F=(q=new WeakMap,function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),C(this,q,{writable:!0,value:{}})}var t,r,n
return t=e,r=[{key:"callPlugin",value:function(e){var t=e.providerFor,r=e.providerArgs,n=e.hook,i=e.hookArgs,o=A(this,q)[t]
if(void 0===o)throw new Error("No such provider class '".concat(t,"'."))
var a=o.filter((function(e){return e.providerTest(r)}))
if(0===a.length)throw new Error("No provider found for '".concat(t,"'."))
if(a.length>1)throw new Error("Ambiguous multiple providers found for '".concat(t,"'."))
var l=a[0],s=l.name,u=l.hooks[n]
if(void 0===u)throw new Error("No such hook '".concat(n,"' found for provider '").concat(s,"' (of class '").concat(t,"'."))
return u(i)}},{key:"register",value:function(e){var t=e.hooks,r=e.name,n=e.providerFor,i=e.providerTest
n in A(this,q)||(A(this,q)[n]=[]),A(this,q)[n].push({hooks:t,name:r,providerTest:i})}}],r&&V(t.prototype,r),n&&V(t,n),Object.defineProperty(t,"prototype",{writable:!1}),e}())
exports.handlers=N,exports.name="integrations",exports.setup=function(e){var t=e.app
e.model,e.reporter,t.ext.integrations=new F},exports.summary="Manages integration plugins."
//# sourceMappingURL=liq-integrations.js.map
