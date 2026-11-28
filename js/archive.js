(()=>{const E=document.getElementById("arSide"),g=document.getElementById("arMain");if(!E||!g)return;const h=s=>String(s).replace(/[&<>"]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[n]),o=(s,n)=>`<span class="t-en">${h(s)}</span><span class="t-zh">${h(n)}</span>`,w=[...ARCHIVE_ITEMS].sort((s,n)=>s.date<n.date?1:s.date>n.date?-1:0),v=s=>w.filter(n=>n.path===s||n.path.startsWith(s+"/")),y=s=>s.href||`archive/${s.slug}.html`,$={};(function s(n,e,a){n.forEach(l=>{const r=e?`${e}/${l.id}`:l.id;$[r]={...l,path:r,trail:[...a,l]},l.children&&s(l.children,r,[...a,l])})})(ARCHIVE_TREE,"",[]);const f=new Set;let _="";function z(s,n,e){return`<ul class="ar-tree ar-tree--${e}">`+s.map(a=>{const l=n?`${n}/${a.id}`:a.id,r=a.children&&a.children.length,t=v(l).length,d=f.has(l);return`<li class="${d?"is-open":""}">
        <button type="button" class="ar-node${_===l?" is-current":""}${t?"":" is-empty"}" data-path="${l}" ${r?`aria-expanded="${d}"`:""}>
          ${r?'<span class="ar-node__caret" aria-hidden="true">›</span>':""}
          <span class="ar-node__label">${o(a.en,a.zh)}</span>
          <span class="ar-node__count">${t||""}</span>
        </button>
        ${r?z(a.children,l,e+1):""}
      </li>`}).join("")+"</ul>"}const j=s=>'<ul class="posts ar-list">'+s.map(n=>`
    <li><a href="${h(y(n))}"><span class="posts__date">${o(n.month.en,n.month.zh)}</span><span class="posts__title">${h(n.title)}</span><span class="posts__arrow">→</span></a></li>`).join("")+"</ul>",C=typeof ARCHIVE_SECTIONS!="undefined"?ARCHIVE_SECTIONS:{},m=s=>String(s).padStart(2,"0"),T=s=>`
    <a class="bcard" href="${h(y(s))}">
      <span class="bcard__img">${s.cover?`<img src="${h(s.cover)}" alt="" loading="lazy" />`:""}</span>
      <span class="bcard__body">
        <span class="bcard__meta">${o(s.month.en,s.month.zh)}</span>
        <span class="bcard__title">${h(s.title)}</span>
        ${s.excerpt?`<span class="bcard__excerpt">${o(s.excerpt.en,s.excerpt.zh||s.excerpt.en)}</span>`:""}
      </span>
      <span class="bcard__arrow" aria-hidden="true">↗</span>
    </a>`,x=s=>`
    <div class="bcard bcard--slot" aria-hidden="true">
      <span class="bcard__img"><span class="bcard__num">${m(s)}</span></span>
      <span class="bcard__body">
        <span class="bcard__meta">${o("coming soon","即将更新")}</span>
        <span class="slot-line"></span><span class="slot-line slot-line--desc slot-line--short"></span>
      </span>
    </div>`,H=(s,n)=>`
    <a class="ncard" href="${h(y(s))}">
      <span class="ncard__num">${m(n)}</span>
      <span class="ncard__body">
        <span class="ncard__meta">${o(s.month.en,s.month.zh)}</span>
        <span class="ncard__title">${h(s.title)}</span>
        ${s.excerpt?`<span class="ncard__excerpt">${o(s.excerpt.en,s.excerpt.zh||s.excerpt.en)}</span>`:""}
        <span class="ncard__more">${o("read","阅读")} <i aria-hidden="true">→</i></span>
      </span>
    </a>`,R=s=>`
    <div class="ncard ncard--slot" aria-hidden="true">
      <span class="ncard__num">${m(s)}</span>
      <span class="ncard__body">
        <span class="ncard__meta">${o("coming soon","即将更新")}</span>
        <span class="slot-line"></span><span class="slot-line slot-line--desc"></span><span class="slot-line slot-line--desc slot-line--short"></span>
      </span>
    </div>`;function L(s,n){const e=s.style!=="cards",a=s.perSection||4,l=s.sections.map((t,d)=>`<a href="#sec-${t.id}" class="ar-toc__item" data-sec="${t.id}"><b class="ar-toc__n">${m(d+1)}</b>${o(t.en,t.zh)}</a>`).join(""),r=s.sections.map((t,d)=>{const u=n.filter(c=>c.section===t.id).sort((c,i)=>c.date<i.date?-1:c.date>i.date?1:0),p=new Array(Math.max(a,u.length)).fill(null);u.filter(c=>c.slot).forEach(c=>{const i=c.slot-1;i>=p.length&&(p.length=i+1),p[i]||(p[i]=c)}),u.filter(c=>!p.includes(c)).forEach(c=>{let i=p.indexOf(null);i<0&&(i=p.length),p[i]=c});for(let c=0;c<p.length;c++)p[c]===void 0&&(p[c]=null);const A=p.map((c,i)=>c?e?H(c,i+1):T(c):e?R(i+1):x(i+1));return`<section class="ar-sec" id="sec-${t.id}">
        <header class="ar-sec__head">
          <span class="ar-sec__num">${m(d+1)}</span>
          <h3 class="ar-sec__title">${o(t.en,t.zh)}</h3>
          <span class="ar-sec__count">${u.length} / ${a}</span>
          ${t.note?`<p class="ar-sec__note">${o(t.note.en,t.note.zh||t.note.en)}</p>`:""}
        </header>
        <div class="ar-sec__grid${e?" ar-sec__grid--notes":""}">${A.join("")}</div>
      </section>`}).join("");return`<nav class="ar-toc" aria-label="sections">${l}</nav>${r}`}const M=()=>`<p class="pj-empty ar-empty">${o("nothing here yet — stay tuned.","这里暂时还空着，敬请期待")}</p>`;function k(){const s=$[_],n=s.trail.map((l,r)=>{const t=s.trail.slice(0,r+1).map(d=>d.id).join("/");return r===s.trail.length-1?`<span>${o(l.en,l.zh)}</span>`:`<a href="#${t}">${o(l.en,l.zh)}</a>`}).join("<span>/</span>"),e=v(_);let a="";return C[_]?a=L(C[_],e):e.length?!s.children||!s.children.length?a=j(e):a=Object.values($).filter(r=>r.path.startsWith(_+"/")&&!(r.children&&r.children.length)).map(r=>{const t=v(r.path);if(!t.length)return"";const d=r.trail.slice(s.trail.length);return`<section class="ar-group">
          <h3 class="ar-group__title"><a href="#${r.path}">${d.map(u=>o(u.en,u.zh)).join(" · ")}</a><span class="pj-group__count">${t.length}</span></h3>
          ${j(t)}
        </section>`}).join(""):a=M(),`<p class="ar-crumb">${n}</p>
      <h2 class="ar-title">${o(s.en,s.zh)} <span class="pj-group__count">${e.length||""}</span></h2>
      ${a}`}function I(){E.innerHTML=z(ARCHIVE_TREE,"",0),g.innerHTML=k()}function S(s){f.clear();const n=s.split("/");for(let e=1;e<=n.length;e++)f.add(n.slice(0,e).join("/"))}function b(s,n){$[s]||(s="ug"),_=s,S(s),n&&location.hash.slice(1)!==s&&history.pushState(null,"","#"+s),I()}E.addEventListener("click",s=>{const n=s.target.closest(".ar-node");if(!n)return;const e=n.dataset.path,a=$[e];_===e&&a.children&&a.children.length?(f.has(e)?f.delete(e):S(e),I()):b(e,!0),window.innerWidth<=820&&g.scrollIntoView({behavior:"smooth",block:"start"})}),g.addEventListener("click",s=>{const n=s.target.closest(".ar-toc__item");if(n){s.preventDefault();const a=document.getElementById("sec-"+n.dataset.sec);a&&window.scrollTo({top:a.getBoundingClientRect().top+scrollY-96,behavior:"smooth"});return}const e=s.target.closest('a[href^="#"]');e&&(s.preventDefault(),b(e.getAttribute("href").slice(1),!0))}),window.addEventListener("popstate",()=>b(decodeURIComponent(location.hash.slice(1))||"ug",!1)),b(decodeURIComponent(location.hash.slice(1))||"ug",!1)})();
