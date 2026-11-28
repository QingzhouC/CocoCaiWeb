(()=>{const b=document.getElementById("arSide"),m=document.getElementById("arMain");if(!b||!m)return;const p=s=>String(s).replace(/[&<>"]/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[a]),l=(s,a)=>`<span class="t-en">${p(s)}</span><span class="t-zh">${p(a)}</span>`,S=[...ARCHIVE_ITEMS].sort((s,a)=>s.date<a.date?1:s.date>a.date?-1:0),v=s=>S.filter(a=>a.path===s||a.path.startsWith(s+"/")),E=s=>s.href||`archive/${s.slug}.html`,_={};(function s(a,e,n){a.forEach(c=>{const r=e?`${e}/${c.id}`:c.id;_[r]={...c,path:r,trail:[...n,c]},c.children&&s(c.children,r,[...n,c])})})(ARCHIVE_TREE,"",[]);const u=new Set;let d="";function y(s,a,e){return`<ul class="ar-tree ar-tree--${e}">`+s.map(n=>{const c=a?`${a}/${n.id}`:n.id,r=n.children&&n.children.length,t=v(c).length,i=u.has(c);return`<li class="${i?"is-open":""}">
        <button type="button" class="ar-node${d===c?" is-current":""}${t?"":" is-empty"}" data-path="${c}" ${r?`aria-expanded="${i}"`:""}>
          ${r?'<span class="ar-node__caret" aria-hidden="true">›</span>':""}
          <span class="ar-node__label">${l(n.en,n.zh)}</span>
          <span class="ar-node__count">${t||""}</span>
        </button>
        ${r?y(n.children,c,e+1):""}
      </li>`}).join("")+"</ul>"}const z=s=>'<ul class="posts ar-list">'+s.map(a=>`
    <li><a href="${p(E(a))}"><span class="posts__date">${l(a.month.en,a.month.zh)}</span><span class="posts__title">${p(a.title)}</span><span class="posts__arrow">→</span></a></li>`).join("")+"</ul>",j=typeof ARCHIVE_SECTIONS!="undefined"?ARCHIVE_SECTIONS:{},$=s=>String(s).padStart(2,"0"),w=s=>`
    <a class="bcard" href="${p(E(s))}">
      <span class="bcard__img">${s.cover?`<img src="${p(s.cover)}" alt="" loading="lazy" />`:""}</span>
      <span class="bcard__body">
        <span class="bcard__meta">${l(s.month.en,s.month.zh)}</span>
        <span class="bcard__title">${p(s.title)}</span>
        ${s.excerpt?`<span class="bcard__excerpt">${l(s.excerpt.en,s.excerpt.zh||s.excerpt.en)}</span>`:""}
      </span>
      <span class="bcard__arrow" aria-hidden="true">↗</span>
    </a>`,T=s=>`
    <div class="bcard bcard--slot" aria-hidden="true">
      <span class="bcard__img"><span class="bcard__num">${$(s)}</span></span>
      <span class="bcard__body">
        <span class="bcard__meta">${l("coming soon","即将更新")}</span>
        <span class="slot-line"></span><span class="slot-line slot-line--desc slot-line--short"></span>
      </span>
    </div>`,H=(s,a)=>`
    <a class="ncard" href="${p(E(s))}">
      <span class="ncard__num">${$(a)}</span>
      <span class="ncard__body">
        <span class="ncard__meta">${l(s.month.en,s.month.zh)}</span>
        <span class="ncard__title">${p(s.title)}</span>
        ${s.excerpt?`<span class="ncard__excerpt">${l(s.excerpt.en,s.excerpt.zh||s.excerpt.en)}</span>`:""}
        <span class="ncard__more">${l("read","阅读")} <i aria-hidden="true">→</i></span>
      </span>
    </a>`,R=s=>`
    <div class="ncard ncard--slot" aria-hidden="true">
      <span class="ncard__num">${$(s)}</span>
      <span class="ncard__body">
        <span class="ncard__meta">${l("coming soon","即将更新")}</span>
        <span class="slot-line"></span><span class="slot-line slot-line--desc"></span><span class="slot-line slot-line--desc slot-line--short"></span>
      </span>
    </div>`;function x(s,a){const e=s.style!=="cards",n=s.perSection||4,c=s.sections.map((t,i)=>`<a href="#sec-${t.id}" class="ar-toc__item" data-sec="${t.id}"><b class="ar-toc__n">${$(i+1)}</b>${l(t.en,t.zh)}</a>`).join(""),r=s.sections.map((t,i)=>{const h=a.filter(o=>o.section===t.id).sort((o,f)=>o.date<f.date?-1:o.date>f.date?1:0),I=h.map((o,f)=>e?H(o,f+1):w(o));for(let o=h.length;o<n;o++)I.push(e?R(o+1):T(o+1));return`<section class="ar-sec" id="sec-${t.id}">
        <header class="ar-sec__head">
          <span class="ar-sec__num">${$(i+1)}</span>
          <h3 class="ar-sec__title">${l(t.en,t.zh)}</h3>
          <span class="ar-sec__count">${h.length} / ${n}</span>
          ${t.note?`<p class="ar-sec__note">${l(t.note.en,t.note.zh||t.note.en)}</p>`:""}
        </header>
        <div class="ar-sec__grid${e?" ar-sec__grid--notes":""}">${I.join("")}</div>
      </section>`}).join("");return`<nav class="ar-toc" aria-label="sections">${c}</nav>${r}`}const L=()=>`<p class="pj-empty ar-empty">${l("nothing here yet — stay tuned.","这里暂时还空着，敬请期待")}</p>`;function k(){const s=_[d],a=s.trail.map((c,r)=>{const t=s.trail.slice(0,r+1).map(i=>i.id).join("/");return r===s.trail.length-1?`<span>${l(c.en,c.zh)}</span>`:`<a href="#${t}">${l(c.en,c.zh)}</a>`}).join("<span>/</span>"),e=v(d);let n="";return j[d]?n=x(j[d],e):e.length?!s.children||!s.children.length?n=z(e):n=Object.values(_).filter(r=>r.path.startsWith(d+"/")&&!(r.children&&r.children.length)).map(r=>{const t=v(r.path);if(!t.length)return"";const i=r.trail.slice(s.trail.length);return`<section class="ar-group">
          <h3 class="ar-group__title"><a href="#${r.path}">${i.map(h=>l(h.en,h.zh)).join(" · ")}</a><span class="pj-group__count">${t.length}</span></h3>
          ${z(t)}
        </section>`}).join(""):n=L(),`<p class="ar-crumb">${a}</p>
      <h2 class="ar-title">${l(s.en,s.zh)} <span class="pj-group__count">${e.length||""}</span></h2>
      ${n}`}function C(){b.innerHTML=y(ARCHIVE_TREE,"",0),m.innerHTML=k()}function g(s,a){_[s]||(s="ug"),d=s;const e=s.split("/");for(let n=1;n<=e.length;n++)u.add(e.slice(0,n).join("/"));a&&location.hash.slice(1)!==s&&history.pushState(null,"","#"+s),C()}b.addEventListener("click",s=>{const a=s.target.closest(".ar-node");if(!a)return;const e=a.dataset.path,n=_[e];d===e&&n.children&&n.children.length?(u.has(e)?u.delete(e):u.add(e),C()):g(e,!0),window.innerWidth<=820&&m.scrollIntoView({behavior:"smooth",block:"start"})}),m.addEventListener("click",s=>{const a=s.target.closest(".ar-toc__item");if(a){s.preventDefault();const n=document.getElementById("sec-"+a.dataset.sec);n&&window.scrollTo({top:n.getBoundingClientRect().top+scrollY-96,behavior:"smooth"});return}const e=s.target.closest('a[href^="#"]');e&&(s.preventDefault(),g(e.getAttribute("href").slice(1),!0))}),window.addEventListener("popstate",()=>g(decodeURIComponent(location.hash.slice(1))||"ug",!1)),g(decodeURIComponent(location.hash.slice(1))||"ug",!1)})();
