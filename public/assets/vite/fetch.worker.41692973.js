import{s as g}from"./semver-Zyv2pDaP.js";const v=new TextEncoder,h="_stackblitz_app_id_",E=1;function y(n,e=!1){const t=new AbortController;return{promise:A(n,e,t.signal),unsubscribe:()=>t.abort()}}async function A(n,e,t){const r=await S(n,e),o=`${O(n.slug).substring(0,e?10:30)}-${r}`;return t.aborted?new Promise(()=>{}):await _(o,t)}async function S(n,e){const{slug:t,application:r,...o}=n,s=Object.entries(o);s.sort(([u],[l])=>u===l?0:u<l?-1:1),typeof location<"u"&&s.unshift(["d",location.origin]),s.unshift(["a",r]),s.unshift(["s",t]),s.unshift(["v",String(E)]);const a=v.encode(JSON.stringify(s)),i=await I(a),c=x(i[0],i[1],i[2],i[3]);return e?c:c.slice(0,4)}function _(n,e){const t=D(n);return t??new Promise(r=>{b(`app-id-lock/${n}`,e,o=>{if(e.aborted)return;const s=o?n:N(n);s!==n&&P(n,s),r(s)})})}function b(n,e,t){const r=globalThis.navigator?.locks;if(r==null){t(!1);return}r.request(n,{ifAvailable:!0},o=>{const s=o!=null;if(t(s),!(!s&&e.aborted))return new Promise(a=>{e.addEventListener("abort",()=>a())})}).catch(()=>{t(!1)})}async function I(n){try{return await T(n)}catch{}return $(n)}async function T(n){const e=await globalThis.crypto.subtle.digest("SHA-1",n);return new Uint8Array(e)}function $(n){let e=5381;const t=4294967295;for(const o of n)e=(e<<5)+e+o&t;const r=new Uint8Array(4);return new DataView(r.buffer).setUint32(0,e),r}function x(n,e,t,r){const o=n>>3,s=(n&7)<<2|(e&192)>>6,a=e>>1&31,i=e%2<<4|(t&240)>>4,c=(t&15)<<1|(r&128)>>7,u=r>>2&31;return[o,s,a,i,c,u].map(l=>L(l)).join("")}function L(n){return n<26?String.fromCharCode(n+97):String.fromCharCode(n-26+48)}function O(n){return n.replace(/[^a-zA-Z0-9]/g,"")}function P(n,e){try{sessionStorage.setItem(`${h}/${n}`,e)}catch{}}function D(n){try{return sessionStorage.getItem(`${h}/${n}`)}catch{return null}}function N(n){return`${n}-${Math.random().toString(36).slice(2,10)}`}const U=1;function M(n){n.addLazyFileHandler({type:U},async(e,t,r)=>{if(r==null)return console.error(`Unexpected missing metadata for "${e}" request`),new ArrayBuffer(0);const o=r.lastIndexOf("@");if(o===-1)return console.error(`Malformed metadata for "${e}": "${r}"`),new ArrayBuffer(0);const s=r.slice(0,o),a=e.slice(e.lastIndexOf("node_modules")+13+s.length),i=`${n.runtimeInfo.turboURL}/f`;return(await fetch(`${i}/${r}${a}`)).arrayBuffer()})}function R(n,e,t){n.addLazyFileHandler({pattern:/usr\/local\/lib\/node_modules\/(?:pnpm|yarn)/},async r=>{let o=e.baseUrl?e.baseUrl:"",s=!0;if(r.includes("yarn.js"))o+="/yarn_index";else{const c=await C(n,t)??n.runtimeInfo.packageManagers.pnpm.at(-1).index;s=!1,o+=`/${c}`}t.environment!=="DEV_STANDALONE"&&t.version&&s&&(o+=`.${t.version}`);const i=await(await fetch(o,{credentials:"same-origin",mode:"cors"})).arrayBuffer();await n.loadFiles(new Uint8Array(i))})}let p=null;async function C(n,e){return p==null&&(p=F(n,e).catch(t=>{console.log(t)})),p}async function F(n,e){const{project:t,semver:r}=e;if(t==null||r==null)return;const o=await t.home,s=await n.readFile(o.replace(/\/$/,"")+"/package.json",void 0,"utf8"),a=JSON.parse(s),i=a.packageManager?.match(/^pnpm@(.*)$/)?.[1],c=a?.engines?.pnpm,u=i??c;if(u==null)return;const l=[...n.runtimeInfo.packageManagers.pnpm],w=(f,d)=>r.satisfies(f,d)||r.ltr(f,d);for(const{version:f,index:d}of l.reverse())if(w(f,u))return d}const V={NEXT_TELEMETRY_DISABLED:"1",ASTRO_TELEMETRY_DISABLED:"1",__NEXT_DISABLE_MEMORY_WATCHER:"1",NG_CLI_ANALYTICS:"false"},k={...V,EDITOR:"code"},B=async()=>{const n=m();return n??(await new Promise(e=>{window.addEventListener("load",()=>e())}),m())},m=()=>JSON.parse(document.querySelector("#webcontainer-context")?.textContent??"null");async function H(){const n=await B(),e=window.WebContainer,t=window.WebContainerAPIServer,o=new URL(location.href).searchParams.get("version")??void 0;new t({defaultEnv:k,endpoint:window.parent,origin:n.embedder,version:o,async factory({webcontainerOptions:a,ready:i}){const c=await y({slug:n.embedder,application:"headless"},n.shortAppId).promise,u=new e({...n.options,...a,systemBinaries:{git:!1},initOptions:{...n.options.initOptions,appId:c,isolationPolicy:n.options.initOptions.isolationPolicy??void 0},onError(l){}});return R(u,n.options,{version:n.options.initOptions.version,project:{home:i.then(({cwd:l})=>l)},semver:{satisfies:g.satisfies,ltr:g.ltr}}),M(u),{instance:u,appId:c}}}).listen()}const j=window.parent!==window;j&&H();