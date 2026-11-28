(()=>{const E=document.getElementById("arSide"),g=document.getElementById("arMain");if(!E||!g)return;const h=s=>String(s).replace(/[&<>"]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[n]),o=(s,n)=>`<span class="t-en">${h(s)}</span><span class="t-zh">${h(n)}</span>`,S=[...ARCHIVE_ITEMS].sort((s,n)=>s.date<n.date?1:s.date>n.date?-1:0),v=s=>S.filter(n=>n.path===s||n.path.startsWith(s+"/")),y=s=>s.href||`archive/${s.slug}.html`,$={};(function s(n,a,e){n.forEach(l=>{const r=a?`${a}/${l.id}`:l.id;$[r]={...l,path:r,trail:[...e,l]},l.children&&s(l.children,r,[...e,l])})})(ARCHIVE_TREE,"",[]);const m=new Set;let _="";function z(s,n,a){return`<ul class="ar-tree ar-tree--${a}">`+s.map(e=>{const l=n?`${n}/${e.id}`:e.id,r=e.children&&e.children.length,t=v(l).length,p=m.has(l);return`<li class="${p?"is-open":""}">
        <button type="button" class="ar-node${_===l?" is-current":""}${t?"":" is-empty"}" data-path="${l}" ${r?`aria-expanded="${p}"`:""}>
          ${r?'<span class="ar-node__caret" aria-hidden="true">›</span>':""}
          <span class="ar-node__label">${o(e.en,e.zh)}</span>
          <span class="ar-node__count">${t||""}</span>
        </button>
        ${r?z(e.children,l,a+1):""}
      </li>`}).join("")+"</ul>"}const j=s=>'<ul class="posts ar-list">'+s.map(n=>`
    <li><a href="${h(y(n))}"><span class="posts__date">${o(n.month.en,n.month.zh)}</span><span class="posts__title">${h(n.title)}</span><span class="posts__arrow">→</span></a></li>`).join("")+"</ul>",C=typeof ARCHIVE_SECTIONS!="undefined"?ARCHIVE_SECTIONS:{},f=s=>String(s).padStart(2,"0"),w=s=>`
    <a class="bcard" href="${h(y(s))}">
      <span class="bcard__img">${s.cover?`<img src="${h(s.cover)}" alt="" loading="lazy" />`:""}</span>
      <span class="bcard__body">
        <span class="bcard__meta">${o(s.month.en,s.month.zh)}</span>
        <span class="bcard__title">${h(s.title)}</span>
        ${s.excerpt?`<span class="bcard__excerpt">${o(s.excerpt.en,s.excerpt.zh||s.excerpt.en)}</span>`:""}
      </span>
      <span class="bcard__arrow" aria-hidden="true">↗</span>
    </a>`,T=s=>`
    <div class="bcard bcard--slot" aria-hidden="true">
      <span class="bcard__img"><span class="bcard__num">${f(s)}</span></span>
      <span class="bcard__body">
        <span class="bcard__meta">${o("coming soon","即将更新")}</span>
        <span class="slot-line"></span><span class="slot-line slot-line--desc slot-line--short"></span>
      </span>
    </div>`,x=(s,n)=>`
    <a class="ncard" href="${h(y(s))}">
      <span class="ncard__num">${f(n)}</span>
      <span class="ncard__body">
        <span class="ncard__meta">${o(s.month.en,s.month.zh)}</span>
        <span class="ncard__title">${h(s.title)}</span>
        ${s.excerpt?`<span class="ncard__excerpt">${o(s.excerpt.en,s.excerpt.zh||s.excerpt.en)}</span>`:""}
        <span class="ncard__more">${o("read","阅读")} <i aria-hidden="true">→</i></span>
      </span>
    </a>`,H=s=>`
    <div class="ncard ncard--slot" aria-hidden="true">
      <span class="ncard__num">${f(s)}</span>
      <span class="ncard__body">
        <span class="ncard__meta">${o("coming soon","即将更新")}</span>
        <span class="slot-line"></span><span class="slot-line slot-line--desc"></span><span class="slot-line slot-line--desc slot-line--short"></span>
      </span>
    </div>`;function R(s,n){const a=s.style!=="cards",e=s.perSection||4,l=s.sections.map((t,p)=>`<a href="#sec-${t.id}" class="ar-toc__item" data-sec="${t.id}"><b class="ar-toc__n">${f(p+1)}</b>${o(t.en,t.zh)}</a>`).join(""),r=s.sections.map((t,p)=>{const u=n.filter(c=>c.section===t.id).sort((c,i)=>c.date<i.date?-1:c.date>i.date?1:0),d=new Array(Math.max(e,u.length)).fill(null);u.filter(c=>c.slot).forEach(c=>{const i=c.slot-1;i>=d.length&&(d.length=i+1),d[i]||(d[i]=c)}),u.filter(c=>!d.includes(c)).forEach(c=>{let i=d.indexOf(null);i<0&&(i=d.length),d[i]=c});for(let c=0;c<d.length;c++)d[c]===void 0&&(d[c]=null);const k=d.map((c,i)=>c?a?x(c,i+1):w(c):a?H(i+1):T(i+1));return`<section class="ar-sec" id="sec-${t.id}">
        <header class="ar-sec__head">
          <span class="ar-sec__num">${f(p+1)}</span>
          <h3 class="ar-sec__title">${o(t.en,t.zh)}</h3>
          <span class="ar-sec__count">${u.length} / ${e}</span>
          ${t.note?`<p class="ar-sec__note">${o(t.note.en,t.note.zh||t.note.en)}</p>`:""}
        </header>
        <div class="ar-sec__grid${a?" ar-sec__grid--notes":""}">${k.join("")}</div>
      </section>`}).join("");return`<nav class="ar-toc" aria-label="sections">${l}</nav>${r}`}const L=()=>`<p class="pj-empty ar-empty">${o("nothing here yet — stay tuned.","这里暂时还空着，敬请期待")}</p>`;function M(){const s=$[_],n=s.trail.map((l,r)=>{const t=s.trail.slice(0,r+1).map(p=>p.id).join("/");return r===s.trail.length-1?`<span>${o(l.en,l.zh)}</span>`:`<a href="#${t}">${o(l.en,l.zh)}</a>`}).join("<span>/</span>"),a=v(_);let e="";return C[_]?e=R(C[_],a):a.length?!s.children||!s.children.length?e=j(a):e=Object.values($).filter(r=>r.path.startsWith(_+"/")&&!(r.children&&r.children.length)).map(r=>{const t=v(r.path);if(!t.length)return"";const p=r.trail.slice(s.trail.length);return`<section class="ar-group">
          <h3 class="ar-group__title"><a href="#${r.path}">${p.map(u=>o(u.en,u.zh)).join(" · ")}</a><span class="pj-group__count">${t.length}</span></h3>
          ${j(t)}
        </section>`}).join(""):e=L(),`<p class="ar-crumb">${n}</p>
      <h2 class="ar-title">${o(s.en,s.zh)} <span class="pj-group__count">${a.length||""}</span></h2>
      ${e}`}function I(){E.innerHTML=z(ARCHIVE_TREE,"",0),g.innerHTML=M()}function b(s,n){$[s]||(s="ug"),_=s;const a=s.split("/");for(let e=1;e<=a.length;e++)m.add(a.slice(0,e).join("/"));n&&location.hash.slice(1)!==s&&history.pushState(null,"","#"+s),I()}E.addEventListener("click",s=>{const n=s.target.closest(".ar-node");if(!n)return;const a=n.dataset.path,e=$[a];_===a&&e.children&&e.children.length?(m.has(a)?m.delete(a):m.add(a),I()):b(a,!0),window.innerWidth<=820&&g.scrollIntoView({behavior:"smooth",block:"start"})}),g.addEventListener("click",s=>{const n=s.target.closest(".ar-toc__item");if(n){s.preventDefault();const e=document.getElementById("sec-"+n.dataset.sec);e&&window.scrollTo({top:e.getBoundingClientRect().top+scrollY-96,behavior:"smooth"});return}const a=s.target.closest('a[href^="#"]');a&&(s.preventDefault(),b(a.getAttribute("href").slice(1),!0))}),window.addEventListener("popstate",()=>b(decodeURIComponent(location.hash.slice(1))||"ug",!1)),b(decodeURIComponent(location.hash.slice(1))||"ug",!1)})();
