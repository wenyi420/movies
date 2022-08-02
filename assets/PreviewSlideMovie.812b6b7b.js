import{_ as I,o as f,h as p,i,a6 as L,U as N,a7 as P,T as $,r as c,O as B,a8 as U,a9 as H,aa as F,ab as V,ac as z,w as l,n as g,x as d,H as w,K as y,t as b,k as O,J as R,g as j,ad as E,ae as G}from"./index.ba03522e.js";const J={},K={width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",class:"Hawkins-Icon Hawkins-Icon-Standard"},Z=i("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M19.293 7.29297L12.0001 14.5859L4.70718 7.29297L3.29297 8.70718L11.293 16.7072C11.4805 16.8947 11.7349 17.0001 12.0001 17.0001C12.2653 17.0001 12.5196 16.8947 12.7072 16.7072L20.7072 8.70718L19.293 7.29297Z",fill:"currentColor"},null,-1),Q=[Z];function W(e,t){return f(),p("svg",K,Q)}var X=I(J,[["render",W]]);const S=L(),{isShow:Y}=N(S),x=P({name:"previewSlideMovie",props:{movie:{type:Object,required:!0},left:{type:Number,required:!0},top:{type:Number,required:!0},imgurl:{type:String,required:!0},imgbox:{type:String,required:!0},width:{type:Number,required:!0},height:{type:Number,required:!0},isFirstItem:{type:Boolean,required:!0},isLastItem:{type:Boolean,required:!0}},setup(e){const t=e.movie.movie.id,u=e.movie.isNetflix;console.log("props.movie.movie",e.movie.movie);let _=$().getUserMovies();const a=c(!1);a.value=!!_.find(o=>o.toString().includes(t));const m=c(0),r=c(!1);B(()=>{let o=document.querySelector("#triggerModal");o.style.top=e.top+"px",o.style.left=e.left+"px",setTimeout(()=>{r.value=!0},20)}),U(()=>{r.value=!1});function M(o){return(o*10).toFixed(0)}const v=c([]);function h(){let o=e.movie.movie,n=o.genre_ids?o.genre_ids:o.genres;s(n)}const s=o=>{if(o&&o.length){let n=o[0]._id;j(1,n).then(T=>{let C=T.data.results;v.value=C.filter(D=>D.id!==e.movie.id);let q=e.movie.movie,A={name:e.movie.title,backdrop_path:e.imgurl,vote_average:e.movie.score,overview:q.overview,similarMovies:v.value,isNetflix:u,id:t};S.resetMovieData(A),Y.value=!0})}};return{count:m,isActive:r,getMovieScore:M,showMovieModal:h,isAddedMovie:a,addToMyMovies:async()=>{let o=u?"n"+t:t,n=await E(o);a.value=!!n},removeToMyMovies:async()=>{let o=await G(t);a.value=!o}}},components:{PlayIcon:H,CheckMark:F,Plus:V,ArrowDown:X,ThumbUp:z}}),ee={class:"info"},oe={class:"infoBtns-wrapper"},ie={class:"left"},te={class:"infoIcon-btn play"},se={class:"infoIcon-btn"},ae={class:"right"},re={class:"preview-info"},ne={class:"movie-title"},le={key:0,class:"score match-score"};function de(e,t,u,k,_,a){const m=l("PlayIcon"),r=l("CheckMark"),M=l("Plus"),v=l("ThumbUp"),h=l("ArrowDown");return f(),p("div",{class:R(["previewMovie-wrapper",{active:e.isActive,isFirstItem:e.isFirstItem,isLastItem:e.isLastItem}])},[i("div",{class:"movie-box",style:g({width:e.width+"px",height:e.height+"px"})},[i("a",{class:"movie-bg",style:g({"background-image":"url(https://image.tmdb.org/t/p/w300"+e.imgurl+")"})},null,4)],4),i("div",ee,[i("div",oe,[i("div",ie,[i("div",te,[d(m)]),w(i("div",{onClick:t[0]||(t[0]=(...s)=>e.removeToMyMovies&&e.removeToMyMovies(...s)),class:"infoIcon-btn"},[d(r)],512),[[y,e.isAddedMovie]]),w(i("div",{class:"infoIcon-btn",onClick:t[1]||(t[1]=(...s)=>e.addToMyMovies&&e.addToMyMovies(...s))},[d(M)],512),[[y,!e.isAddedMovie]]),i("div",se,[d(v)])]),i("div",ae,[i("div",{class:"infoIcon-btn",onClick:t[2]||(t[2]=(...s)=>e.showMovieModal&&e.showMovieModal(...s))},[d(h)])])]),i("div",re,[i("h3",ne,b(e.movie.title),1),e.movie.score?(f(),p("div",le,b(e.getMovieScore(e.movie.score))+"% \u9069\u5408\u4F60 ",1)):O("",!0)])])],2)}var me=I(x,[["render",de],["__scopeId","data-v-547ac786"]]);export{me as default};
//# sourceMappingURL=PreviewSlideMovie.812b6b7b.js.map