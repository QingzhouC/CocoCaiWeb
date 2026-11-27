(()=>{const f=document.getElementById("arSide"),m=document.getElementById("arMain");if(!f||!m)return;const i=s=>String(s).replace(/[&<>"]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[n]),r=(s,n)=>`<span class="t-en">${i(s)}</span><span class="t-zh">${i(n)}</span>`,I=[...ARCHIVE_ITEMS].sort((s,n)=>s.date<n.date?1:-1),b=s=>I.filter(n=>n.path===s||n.path.startsWith(s+"/")),v=s=>s.href||`archive/${s.slug}.html`,_={};(function s(n,e,a){n.forEach(c=>{const l=e?`${e}/${c.id}`:c.id;_[l]={...c,path:l,trail:[...a,c]},c.children&&s(c.children,l,[...a,c])})})(ARCHIVE_TREE,"",[]);const u=new Set;let d="";function E(s,n,e){return`<ul class="ar-tree ar-tree--${e}">`+s.map(a=>{const c=n?`${n}/${a.id}`:a.id,l=a.children&&a.children.length,t=b(c).length,o=u.has(c);return`<li class="${o?"is-open":""}">
        <button type="button" class="ar-node${d===c?" is-current":""}${t?"":" is-empty"}" data-path="${c}" ${l?`aria-expanded="${o}"`:""}>
          ${l?'<span class="ar-node__caret" aria-hidden="true">›</span>':""}
          <span class="ar-node__label">${r(a.en,a.zh)}</span>
          <span class="ar-node__count">${t||""}</span>
        </button>
        ${l?E(a.children,c,e+1):""}
      </li>`}).join("")+"</ul>"}const y=s=>'<ul class="posts ar-list">'+s.map(n=>`
    <li><a href="${i(v(n))}"><span class="posts__date">${r(n.month.en,n.month.zh)}</span><span class="posts__title">${i(n.title)}</span><span class="posts__arrow">→</span></a></li>`).join("")+"</ul>",z=typeof ARCHIVE_SECTIONS!="undefined"?ARCHIVE_SECTIONS:{},$=s=>String(s).padStart(2,"0"),S=s=>`
    <a class="bcard" href="${i(v(s))}">
      <span class="bcard__img">${s.cover?`<img src="${i(s.cover)}" alt="" loading="lazy" />`:""}</span>
      <span class="bcard__body">
        <span class="bcard__meta">${r(s.month.en,s.month.zh)}</span>
        <span class="bcard__title">${i(s.title)}</span>
        ${s.excerpt?`<span class="bcard__excerpt">${r(s.excerpt.en,s.excerpt.zh||s.excerpt.en)}</span>`:""}
      </span>
      <span class="bcard__arrow" aria-hidden="true">↗</span>
    </a>`,w=s=>`
    <div class="bcard bcard--slot" aria-hidden="true">
      <span class="bcard__img"><span class="bcard__num">${$(s)}</span></span>
      <span class="bcard__body">
        <span class="bcard__meta">${r("coming soon","即将更新")}</span>
        <span class="slot-line"></span><span class="slot-line slot-line--desc slot-line--short"></span>
      </span>
    </div>`,T=(s,n)=>`
    <a class="ncard" href="${i(v(s))}">
      <span class="ncard__num">${$(n)}</span>
      <span class="ncard__body">
        <span class="ncard__meta">${r(s.month.en,s.month.zh)}</span>
        <span class="ncard__title">${i(s.title)}</span>
        ${s.excerpt?`<span class="ncard__excerpt">${r(s.excerpt.en,s.excerpt.zh||s.excerpt.en)}</span>`:""}
        <span class="ncard__more">${r("read","阅读")} <i aria-hidden="true">→</i></span>
      </span>
    </a>`,H=s=>`
    <div class="ncard ncard--slot" aria-hidden="true">
      <span class="ncard__num">${$(s)}</span>
      <span class="ncard__body">
        <span class="ncard__meta">${r("coming soon","即将更新")}</span>
        <span class="slot-line"></span><span class="slot-line slot-line--desc"></span><span class="slot-line slot-line--desc slot-line--short"></span>
      </span>
    </div>`;function R(s,n){const e=s.style!=="cards",a=s.perSection||4,c=s.sections.map((t,o)=>`<a href="#sec-${t.id}" class="ar-toc__item" data-sec="${t.id}"><b class="ar-toc__n">${$(o+1)}</b>${r(t.en,t.zh)}</a>`).join(""),l=s.sections.map((t,o)=>{const h=n.filter(p=>p.section===t.id),C=h.map((p,k)=>e?T(p,k+1):S(p));for(let p=h.length;p<a;p++)C.push(e?H(p+1):w(p+1));return`<section class="ar-sec" id="sec-${t.id}">
        <header class="ar-sec__head">
          <span class="ar-sec__num">${$(o+1)}</span>
          <h3 class="ar-sec__title">${r(t.en,t.zh)}</h3>
          <span class="ar-sec__count">${h.length} / ${a}</span>
          ${t.note?`<p class="ar-sec__note">${r(t.note.en,t.note.zh||t.note.en)}</p>`:""}
        </header>
        <div class="ar-sec__grid${e?" ar-sec__grid--notes":""}">${C.join("")}</div>
      </section>`}).join("");return`<nav class="ar-toc" aria-label="sections">${c}</nav>${l}`}const x=()=>`<p class="pj-empty ar-empty">${r("nothing here yet — stay tuned.","这里暂时还空着，敬请期待")}</p>`;function L(){const s=_[d],n=s.trail.map((c,l)=>{const t=s.trail.slice(0,l+1).map(o=>o.id).join("/");return l===s.trail.length-1?`<span>${r(c.en,c.zh)}</span>`:`<a href="#${t}">${r(c.en,c.zh)}</a>`}).join("<span>/</span>"),e=b(d);let a="";return z[d]?a=R(z[d],e):e.length?!s.children||!s.children.length?a=y(e):a=Object.values(_).filter(l=>l.path.startsWith(d+"/")&&!(l.children&&l.children.length)).map(l=>{const t=b(l.path);if(!t.length)return"";const o=l.trail.slice(s.trail.length);return`<section class="ar-group">
          <h3 class="ar-group__title"><a href="#${l.path}">${o.map(h=>r(h.en,h.zh)).join(" · ")}</a><span class="pj-group__count">${t.length}</span></h3>
          ${y(t)}
        </section>`}).join(""):a=x(),`<p class="ar-crumb">${n}</p>
      <h2 class="ar-title">${r(s.en,s.zh)} <span class="pj-group__count">${e.length||""}</span></h2>
      ${a}`}function j(){f.innerHTML=E(ARCHIVE_TREE,"",0),m.innerHTML=L()}function g(s,n){_[s]||(s="ug"),d=s;const e=s.split("/");for(let a=1;a<=e.length;a++)u.add(e.slice(0,a).join("/"));n&&location.hash.slice(1)!==s&&history.pushState(null,"","#"+s),j()}f.addEventListener("click",s=>{const n=s.target.closest(".ar-node");if(!n)return;const e=n.dataset.path,a=_[e];d===e&&a.children&&a.children.length?(u.has(e)?u.delete(e):u.add(e),j()):g(e,!0),window.innerWidth<=820&&m.scrollIntoView({behavior:"smooth",block:"start"})}),m.addEventListener("click",s=>{const n=s.target.closest(".ar-toc__item");if(n){s.preventDefault();const a=document.getElementById("sec-"+n.dataset.sec);a&&window.scrollTo({top:a.getBoundingClientRect().top+scrollY-96,behavior:"smooth"});return}const e=s.target.closest('a[href^="#"]');e&&(s.preventDefault(),g(e.getAttribute("href").slice(1),!0))}),window.addEventListener("popstate",()=>g(decodeURIComponent(location.hash.slice(1))||"ug",!1)),g(decodeURIComponent(location.hash.slice(1))||"ug",!1)})();
