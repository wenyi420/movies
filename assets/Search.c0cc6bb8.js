import{_ as H,T as R,U as y,a4 as U,r as w,G as V,X as A,Y as P,W as b,Z as W,$,a0 as z,a1 as x,o as c,h as l,j as h,F as C,l as D,i as d,t as j,k as G,x as Z,a2 as J,p as K,m as Q,a5 as ee,a3 as te}from"./index.ba03522e.js";const se=f=>(K("data-v-2cbdbac7"),f=f(),Q(),f),oe={class:"myMovies-wrapper"},ae=se(()=>d("div",{class:"myMovies-wrapper-title"},null,-1)),ie={key:0},re=["data-movie-index"],ne=["data-src"],ce=["src"],le={key:1,style:{width:"100%"}},de={style:{"font-size":"24px"}},fe={id:"triggerModal",ref:"triggerModal"},ue={setup(f){const I=R();y(I);const k=U(),{searchText:v}=y(k);let _=null;const u=w([]),g=w(null),m=w(!1);V(v,e=>{e&&ee(e).then(s=>{console.log("search res",s);let t=s.data.results;O(t)})});async function O(e=[]){if(!e.length)return m.value=!0,u.value=e;u.value=e.map(s=>({id:s.id,url:s.backdrop_path,title:s.title?s.title:s.name,score:s.vote_average,movie:s,isNetflix:!1})),m.value=!1,await b(),S()}function S(){const e=g.value.querySelectorAll("a.movie-item"),s={root:document.querySelector(".myMovies-wrapper"),rootMargin:"100px"},t=new IntersectionObserver(o=>{o.forEach(a=>{if(a.isIntersecting){let r;a.target.dataset.src?r=`url(https://image.tmdb.org/t/p/w300${a.target.dataset.src})`:r=`url(${te})`,a.target.style.backgroundImage=r,setTimeout(()=>{a.target.classList.add("active")},800),t.unobserve(a.target)}})},s);e.forEach(o=>t.observe(o))}let n=null;A(()=>n==null?void 0:n()),P(()=>{M()});function M(){let e=g.value;b(()=>{e.querySelectorAll(".movies-list").forEach(t=>{t.addEventListener("mouseover",L),t.addEventListener("mouseleave",E)})}),document.body.addEventListener("mouseover",T)}function L(e){_=setTimeout(()=>{var t,o;const s=e.target.parentElement;if((t=s==null?void 0:s.dataset)!=null&&t.movieIndex){let a=s.dataset.movieIndex,r=u.value[a];const{x:i,y:F,width:p,height:q}=B(e.target,"center"),N=(o=document.body.getBoundingClientRect())==null?void 0:o.width;Y({x:i,y:F,width:p,height:q,movie:r,isFirstItem:i-p<0,isLastItem:i+p>N})}},500)}function E(){clearTimeout(_)}function T(e){let s=e.target,t=document.querySelector("#triggerModal");if(!!t&&s!==t&&!t.contains(e.target)){let o=t.querySelector(".previewMovie-wrapper");o&&(o.classList.remove("active"),setTimeout(()=>{n==null||n()},295))}}const{appContext:X}=W(),Y=async e=>{n==null||n(),n=$({el:"#triggerModal",component:(await z(()=>import("./PreviewSlideMovie.812b6b7b.js"),["assets/PreviewSlideMovie.812b6b7b.js","assets/PreviewSlideMovie.c718a2d2.css","assets/index.ba03522e.js","assets/index.516f0aaf.css"])).default,props:{key:e.movie.id,movie:e.movie,left:e.x,top:e.y,width:e.width,height:e.height,imgurl:e.movie.url,imgbox:x,isFirstItem:e.isFirstItem,isLastItem:e.isLastItem},appContext:X})};function B(e,s){const{top:t,left:o,width:a,height:r}=e.getBoundingClientRect();let i;switch(s){case"top left":i={x:o+window.pageXOffset,y:t+window.pageYOffset};break;case"top center":i={x:o+a/2+window.pageXOffset,y:t+window.pageYOffset};break;case"top right":i={x:o+a+window.pageXOffset,y:t+window.pageYOffset};break;case"center left":i={x:o+window.pageXOffset,y:t+r/2+window.pageYOffset};break;case"center":i={x:o+a/2+window.pageXOffset,y:t+r/2+window.pageYOffset};break;case"center right":i={x:o+a+window.pageXOffset,y:t+r/2+window.pageYOffset};break;case"bottom left":i={x:o+window.pageXOffset,y:t+r+window.pageYOffset};break;case"bottom center":i={x:o+a/2+window.pageXOffset,y:t+r+window.pageYOffset};break;case"bottom right":i={x:o+a+window.pageXOffset,y:t+r+window.pageYOffset};break}return i.width=a,i.height=r,i}return(e,s)=>(c(),l("div",oe,[ae,h(v)?(c(),l("div",ie,[m.value?(c(),l("div",le,[d("h3",de," \u627E\u4E0D\u5230\u7B26\u5408\u300C"+j(h(v))+"\u300D\u7684\u641C\u5C0B\u7D50\u679C\u3002 ",1)])):(c(),l("div",{key:0,class:"movies-content",ref_key:"moviesEl",ref:g},[(c(!0),l(C,null,D(u.value,(t,o)=>(c(),l("div",{class:"movies-list",key:o,"data-movie-index":o},[d("a",{class:"movie-item","data-src":t.url},[d("img",{src:h(x),alt:""},null,8,ce)],8,ne)],8,re))),128))],512))])):G("",!0),d("div",fe,null,512),Z(J,{ref:"modal"},null,512)]))}};var ge=H(ue,[["__scopeId","data-v-2cbdbac7"]]);export{ge as default};
//# sourceMappingURL=Search.c0cc6bb8.js.map