(()=>{const g=document.getElementById("arSide"),$=document.getElementById("arMain");if(!g||!$)return;const p=s=>String(s).replace(/[&<>"]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[n]),r=(s,n)=>`<span class="t-en">${p(s)}</span><span class="t-zh">${p(n)}</span>`,z=[...ARCHIVE_ITEMS].sort((s,n)=>s.date<n.date?1:-1),f=s=>z.filter(n=>n.path===s||n.path.startsWith(s+"/")),E=s=>s.href||`archive/${s.slug}.html`,d={};(function s(n,t,a){n.forEach(c=>{const e=t?`${t}/${c.id}`:c.id;d[e]={...c,path:e,trail:[...a,c]},c.children&&s(c.children,e,[...a,c])})})(ARCHIVE_TREE,"",[]);const h=new Set;let i="";function v(s,n,t){return`<ul class="ar-tree ar-tree--${t}">`+s.map(a=>{const c=n?`${n}/${a.id}`:a.id,e=a.children&&a.children.length,l=f(c).length,o=h.has(c);return`<li class="${o?"is-open":""}">
        <button type="button" class="ar-node${i===c?" is-current":""}${l?"":" is-empty"}" data-path="${c}" ${e?`aria-expanded="${o}"`:""}>
          ${e?'<span class="ar-node__caret" aria-hidden="true">›</span>':""}
          <span class="ar-node__label">${r(a.en,a.zh)}</span>
          <span class="ar-node__count">${l||""}</span>
        </button>
        ${e?v(a.children,c,t+1):""}
      </li>`}).join("")+"</ul>"}const y=s=>'<ul class="posts ar-list">'+s.map(n=>`
    <li><a href="${p(E(n))}"><span class="posts__date">${r(n.month.en,n.month.zh)}</span><span class="posts__title">${p(n.title)}</span><span class="posts__arrow">→</span></a></li>`).join("")+"</ul>",j=typeof ARCHIVE_SECTIONS!="undefined"?ARCHIVE_SECTIONS:{},b=s=>String(s).padStart(2,"0"),C=s=>`
    <a class="bcard" href="${p(E(s))}">
      <span class="bcard__img">${s.cover?`<img src="${p(s.cover)}" alt="" loading="lazy" />`:""}</span>
      <span class="bcard__body">
        <span class="bcard__meta">${r(s.month.en,s.month.zh)}</span>
        <span class="bcard__title">${p(s.title)}</span>
        ${s.excerpt?`<span class="bcard__excerpt">${r(s.excerpt.en,s.excerpt.zh||s.excerpt.en)}</span>`:""}
      </span>
      <span class="bcard__arrow" aria-hidden="true">↗</span>
    </a>`,S=s=>`
    <div class="bcard bcard--slot" aria-hidden="true">
      <span class="bcard__img"><span class="bcard__num">${b(s)}</span></span>
      <span class="bcard__body">
        <span class="bcard__meta">${r("coming soon","即将更新")}</span>
        <span class="slot-line"></span><span class="slot-line slot-line--desc slot-line--short"></span>
      </span>
    </div>`;function w(s,n){const t=s.perSection||4,a=s.sections.map((e,l)=>`<a href="#sec-${e.id}" class="ar-toc__item" data-sec="${e.id}"><b class="ar-toc__n">${b(l+1)}</b>${r(e.en,e.zh)}</a>`).join(""),c=s.sections.map((e,l)=>{const o=n.filter(_=>_.section===e.id),u=o.map(C);for(let _=o.length;_<t;_++)u.push(S(_+1));return`<section class="ar-sec" id="sec-${e.id}">
        <header class="ar-sec__head">
          <span class="ar-sec__num">${b(l+1)}</span>
          <h3 class="ar-sec__title">${r(e.en,e.zh)}</h3>
          <span class="ar-sec__count">${o.length} / ${t}</span>
          ${e.note?`<p class="ar-sec__note">${r(e.note.en,e.note.zh||e.note.en)}</p>`:""}
        </header>
        <div class="ar-sec__grid">${u.join("")}</div>
      </section>`}).join("");return`<nav class="ar-toc" aria-label="sections">${a}</nav>${c}`}const T=()=>`<p class="pj-empty ar-empty">${r("nothing here yet — stay tuned.","这里暂时还空着，敬请期待")}</p>`;function H(){const s=d[i],n=s.trail.map((c,e)=>{const l=s.trail.slice(0,e+1).map(o=>o.id).join("/");return e===s.trail.length-1?`<span>${r(c.en,c.zh)}</span>`:`<a href="#${l}">${r(c.en,c.zh)}</a>`}).join("<span>/</span>"),t=f(i);let a="";return j[i]?a=w(j[i],t):t.length?!s.children||!s.children.length?a=y(t):a=Object.values(d).filter(e=>e.path.startsWith(i+"/")&&!(e.children&&e.children.length)).map(e=>{const l=f(e.path);if(!l.length)return"";const o=e.trail.slice(s.trail.length);return`<section class="ar-group">
          <h3 class="ar-group__title"><a href="#${e.path}">${o.map(u=>r(u.en,u.zh)).join(" · ")}</a><span class="pj-group__count">${l.length}</span></h3>
          ${y(l)}
        </section>`}).join(""):a=T(),`<p class="ar-crumb">${n}</p>
      <h2 class="ar-title">${r(s.en,s.zh)} <span class="pj-group__count">${t.length||""}</span></h2>
      ${a}`}function I(){g.innerHTML=v(ARCHIVE_TREE,"",0),$.innerHTML=H()}function m(s,n){d[s]||(s="ug"),i=s;const t=s.split("/");for(let a=1;a<=t.length;a++)h.add(t.slice(0,a).join("/"));n&&location.hash.slice(1)!==s&&history.pushState(null,"","#"+s),I()}g.addEventListener("click",s=>{const n=s.target.closest(".ar-node");if(!n)return;const t=n.dataset.path,a=d[t];i===t&&a.children&&a.children.length?(h.has(t)?h.delete(t):h.add(t),I()):m(t,!0),window.innerWidth<=820&&$.scrollIntoView({behavior:"smooth",block:"start"})}),$.addEventListener("click",s=>{const n=s.target.closest(".ar-toc__item");if(n){s.preventDefault();const a=document.getElementById("sec-"+n.dataset.sec);a&&window.scrollTo({top:a.getBoundingClientRect().top+scrollY-96,behavior:"smooth"});return}const t=s.target.closest('a[href^="#"]');t&&(s.preventDefault(),m(t.getAttribute("href").slice(1),!0))}),window.addEventListener("popstate",()=>m(decodeURIComponent(location.hash.slice(1))||"ug",!1)),m(decodeURIComponent(location.hash.slice(1))||"ug",!1)})();
