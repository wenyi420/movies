import{_ as $,u as C,a as E,r as y,b as R,c as V,d as Y,e as B,f as F,g as U,o as i,h as l,i as t,t as n,j as c,n as j,k as f,F as w,l as z,p as A,m as H,q as M}from"./index.ba03522e.js";const m=_=>(A("data-v-003817f6"),_=_(),H(),_),L={class:"movieSection"},q={class:"info"},P={class:"info-metadata"},W={class:"info-metadata-year"},J=m(()=>t("span",{class:"info-spacer"}," | ",-1)),K={key:0,class:"info-time info-spacer"},O={key:1,class:"info-time info-spacer"},Q=m(()=>t("span",{class:"info-spacer"}," | ",-1)),X={class:"info-time info-spacer"},Z={class:"info-desc"},ee={class:"img-box"},te={key:0,class:"nmtitle-section"},se={class:"section-header"},ae=m(()=>t("h2",{class:"section-header-text"},"\u5F71\u7247",-1)),oe={class:"section-subheader-text"},ie={key:0,style:{margin:"16px 0"}},le=["src"],ne={key:1,class:"nmtitle-section"},ce=m(()=>t("div",{class:"section-header"},[t("h2",{class:"section-header-text"},"\u985E\u4F3C\u5F71\u7247")],-1)),re={class:"section-body"},de={class:"similarMovies"},ue={key:0,class:"similarMovies-item"},_e=["onClick"],he=["src"],pe={class:"title"},ve={setup(_){const x=C(),b=E(),r=b.params.id,d=!!b.path.includes("netflix"),a=y({}),h=y({}),p=y([]);r?d?(R(r).then(e=>{console.log("res",e),a.value=e.data,k(e.data.genres)}),V(r).then(e=>{console.log("trailer",e.data),h.value=e.data})):(Y(r).then(e=>{console.log("res",e),a.value=e.data,k(e.data.genres)}),B(r).then(e=>{console.log("trailer",e.data),h.value=e.data})):alert("error");const g=F(()=>{var o;let e=(o=h.value.results)!=null&&o.length?h.value.results[0]:null,s=!1;return e&&e.site.toLowerCase()==="youtube"&&e.key&&(s=!0),s?e.key:null}),T=e=>{if(e){let s;return M.global.locale==="zh-TW"&&(s="\u3002"),M.global.locale==="en"&&(s="."),e.split(s)[0]+s}return""},I=function(e){if(e)return e.split("-")[0]},N=e=>{if(e){let s="";const u=Math.floor(e/60),v=Math.floor(e%60);return u&&(s+=`${u} \u5C0F\u6642 `),v&&(s+=`${v} \u5206\u9418`),s}},S=e=>{if(e&&Array.isArray(e)&&e.length)return e[0].name},G=e=>`\u7B2C ${e} \u5B63`,k=e=>{if(e&&e.length){let s;d?s=e[0]._id:s=e.map(o=>o.id).join(),U(1,s).then(o=>{let u=o.data.results;p.value=u.filter(v=>v.id!==a.value.id)})}};function D(e){x.push({path:`/movie/${e}`})}return(e,s)=>(i(),l(w,null,[t("div",L,[t("div",q,[t("h1",null,n(c(d)?a.value.name:a.value.title),1),t("div",P,[t("span",W,n(I(c(d)?a.value.first_air_date:a.value.release_date)),1),J,c(d)?(i(),l("span",K,n(G(a.value.number_of_seasons)),1)):(i(),l("span",O,n(N(a.value.runtime)),1)),Q,t("span",X,n(S(a.value.genres)),1)]),t("div",Z,n(T(a.value.overview)),1)]),t("div",ee,[t("div",{class:"img-bg",style:j({"background-image":"url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/"+a.value.backdrop_path+")"})},null,4)])]),c(g)?(i(),l("div",te,[t("div",se,[ae,t("h2",oe,n(a.value.title),1)]),c(g)?(i(),l("div",ie,[t("iframe",{class:"youtube-iframe",src:"https://www.youtube.com/embed/"+c(g),title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""},null,8,le)])):f("",!0)])):f("",!0),p.value&&p.value.length?(i(),l("div",ne,[ce,t("div",re,[t("div",de,[(i(!0),l(w,null,z(p.value,o=>(i(),l("div",{key:o.id},[o.backdrop_path?(i(),l("div",ue,[t("a",{onClick:u=>D(o.id)},[t("img",{src:"https://image.tmdb.org/t/p/w250_and_h141_face"+o.backdrop_path,alt:""},null,8,he),t("span",pe,n(o.title),1)],8,_e)])):f("",!0)]))),128))])])])):f("",!0)],64))}};var me=$(ve,[["__scopeId","data-v-003817f6"]]);export{me as default};
//# sourceMappingURL=MovieInfoView.03806300.js.map
