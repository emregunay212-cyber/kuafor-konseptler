import{S as s,i as b,w as _,I as m,t as f,m as y}from"./content-BsmWQ5DW.js";import{i as u,a as w}from"./lightbox-D1FkXsxL.js";const a=(t="")=>String(t).replace(/[&<>"']/g,r=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[r]),p=(t,r=document)=>r.querySelector(t),k=(t=5)=>"★".repeat(t)+"☆".repeat(Math.max(0,5-t)),$=t=>_(`Merhaba! ${s.brand} için randevu almak istiyorum.`);function x(){let n="";for(let e=0;e<48;e++){const i=e/48*Math.PI*2,v=500+Math.cos(i)*760,l=500+Math.sin(i)*760,h=e%2===0?1.4:.6;n+=`<line x1="500" y1="500" x2="${v.toFixed(1)}" y2="${l.toFixed(1)}" stroke="url(#rayGrad)" stroke-width="${h}"/>`}let c="";[120,200,290].forEach((e,i)=>{c+=`<circle cx="500" cy="500" r="${e}" fill="none" stroke="#c8a24b" stroke-width="${i===1?1.4:.7}" opacity="${.7-i*.18}"/>`});let o="";for(let e=0;e<=12;e++){const i=-Math.PI/2+(e/12*Math.PI-Math.PI/2)*0+e/12*Math.PI*2,v=500+Math.cos(i)*95,l=500+Math.sin(i)*95;o+=`<line x1="500" y1="500" x2="${v.toFixed(1)}" y2="${l.toFixed(1)}" stroke="#e3c074" stroke-width="1" opacity="0.8"/>`}return`
  <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="rayGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#e3c074" stop-opacity="0.9"/>
        <stop offset="55%" stop-color="#c8a24b" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#c8a24b" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <g>${n}</g>
    <g>${c}</g>
    <g>${o}</g>
    <circle cx="500" cy="500" r="9" fill="#e3c074"/>
  </svg>`}function L(t){const d=s.nav.map(l=>`<li><a class="nav__link" href="${a(l.href)}" data-nav>${a(l.label)}</a></li>`).join("")+`<li><a class="nav__link nav__link--cta" href="${$()}" target="_blank" rel="noopener" data-nav>${a(s.ctaPrimary.label)}</a></li>`;t.innerHTML=`
    <nav class="nav wrap" aria-label="Ana menü">
      <a class="brand" href="#top" aria-label="${a(s.brand)} ana sayfa">
        <span class="brand__name">${a(s.brand)}</span>
        <span class="brand__tag">${a(s.brandTagline)}</span>
      </a>
      <ul class="nav__links" id="navLinks">${d}</ul>
      <div class="nav__actions">
        <a class="btn btn--framed nav__cta" href="${$()}" target="_blank" rel="noopener">${a(s.ctaPrimary.label)}</a>
        <button class="hamburger" id="hamburger" aria-label="Menüyü aç" aria-expanded="false" aria-controls="navLinks">
          <span></span>
        </button>
      </div>
    </nav>
    <div class="nav-backdrop" id="navBackdrop" hidden></div>`;const n=t,c=()=>n.classList.toggle("is-scrolled",window.scrollY>24);c(),window.addEventListener("scroll",c,{passive:!0});const o=p("#hamburger",t),e=p("#navLinks",t),i=p("#navBackdrop",t),v=l=>{e.classList.toggle("is-open",l),i.classList.toggle("is-open",l),i.hidden=!l,o.setAttribute("aria-expanded",String(l)),o.setAttribute("aria-label",l?"Menüyü kapat":"Menüyü aç"),document.body.style.overflow=l?"hidden":""};o.addEventListener("click",()=>v(o.getAttribute("aria-expanded")!=="true")),i.addEventListener("click",()=>v(!1)),e.querySelectorAll("[data-nav]").forEach(l=>l.addEventListener("click",()=>v(!1))),document.addEventListener("keydown",l=>{l.key==="Escape"&&v(!1)})}function E(t){const r=s.images.hero[0],d=a(s.brand).replace(/\s+(\S+)$/,' <span class="accent">$1</span>'),n=s.stats.map((c,o)=>`
      <div class="stat" data-reveal style="--reveal-delay:${o*90}ms">
        <div class="stat__value">${a(c.value)}</div>
        <div class="stat__label">${a(c.label)}</div>
      </div>`).join("");t.innerHTML=`
    <div class="hero__bg">
      <img src="${b(r,{w:1600,h:1e3,q:70})}" alt="" loading="eager" fetchpriority="high" width="1600" height="1000" />
    </div>
    <div class="hero__sunburst">${x()}</div>
    <div class="hero__inner">
      <div class="hero__frame">
        <p class="eyebrow center">${a(s.brandTagline)}</p>
        <h1 class="hero__brand" id="hero-title">${d}</h1>
        <p class="hero__slogan">${a(s.slogan)}</p>
        <p class="hero__intro">${a(s.intro)}</p>
        <div class="hero__cta">
          <a class="btn btn--framed" href="${$()}" target="_blank" rel="noopener">${a(s.ctaPrimary.label)}</a>
          <a class="btn btn--ghost" href="${_()}" target="_blank" rel="noopener" aria-label="WhatsApp ile yazın">WhatsApp</a>
        </div>
        <div class="hero__stats">${n}</div>
      </div>
    </div>`}function M(t){const r=s.serviceCategories,d=r.map((e,i)=>`
      <button class="cat-tab ${i===0?"is-active":""}" role="tab"
        id="tab-${a(e.key)}" aria-controls="panel-${a(e.key)}" aria-selected="${i===0}" data-cat="${a(e.key)}">
        <span class="ico" aria-hidden="true">${e.icon}</span> ${a(e.name)}
      </button>`).join(""),n=r.map((e,i)=>{const v=e.services.map((l,h)=>`
        <article class="svc-card" data-reveal style="--reveal-delay:${h*70}ms">
          <div class="svc-card__top">
            <h3 class="svc-card__name">${a(l.name)}</h3>
            <span class="svc-card__price">${a(l.price)}</span>
          </div>
          <p class="svc-card__desc">${a(l.desc)}</p>
          <div class="svc-card__meta"><span aria-hidden="true">⏱</span> ${a(l.duration)}</div>
        </article>`).join("");return`
        <div class="cat-panel ${i===0?"is-active":""}" role="tabpanel" id="panel-${a(e.key)}"
          aria-labelledby="tab-${a(e.key)}" ${i===0?"":"hidden"}>
          <div class="cat-panel__head">
            <h3 class="section-title" style="font-size:var(--text-h3);letter-spacing:.12em">${e.icon} ${a(e.name)}</h3>
            <p class="cat-panel__blurb">${a(e.blurb)}</p>
          </div>
          <div class="svc-grid">${v}</div>
        </div>`}).join("");t.innerHTML=`
    <div class="wrap">
      <div class="section-head" data-reveal>
        <span class="eyebrow center">Menümüz</span>
        <h2 class="section-title" id="services-title">Hizmetlerimiz</h2>
        <div class="deco-rule"><span class="bar"></span><span class="lozenge"></span><span class="bar"></span></div>
        <p class="section-sub">Saçtan cilde, makyajdan tırnağa — her detayda zarafet.</p>
      </div>
      <div class="cat-tabs" role="tablist" aria-label="Hizmet kategorileri">${d}</div>
      <div class="cat-panels">${n}</div>
    </div>`;const c=Array.from(t.querySelectorAll(".cat-tab")),o=Array.from(t.querySelectorAll(".cat-panel"));c.forEach(e=>{e.addEventListener("click",()=>{const i=e.dataset.cat;c.forEach(v=>{const l=v===e;v.classList.toggle("is-active",l),v.setAttribute("aria-selected",String(l))}),o.forEach(v=>{const l=v.id===`panel-${i}`;v.classList.toggle("is-active",l),v.hidden=!l})})})}function z(t){const r=[s.images.sac[0],s.images.makyaj[0],s.images.cilt[0],s.images.salon[0],s.images.sac[2],s.images.tirnak[0],s.images.makyaj[2],s.images.cilt[3],s.images.hero[2]].filter(Boolean);for(;r.length<9&&m.length;)r.push(m[r.length%m.length]);const d=new Set([0,5]),n=r.slice(0,9).map((c,o)=>{const e=d.has(o),i=e?1100:700,v=e?680:880;return`
      <figure class="${e?"is-wide":""}" data-reveal style="--reveal-delay:${o%3*80}ms">
        <img src="${b(c,{w:i,h:v,q:72})}" alt="${a(s.brand)} çalışma örneği ${o+1}"
          width="${i}" height="${v}" loading="lazy" data-lightbox
          data-full="${b(c,{w:1500,q:80})}" />
      </figure>`}).join("");t.innerHTML=`
    <div class="wrap">
      <div class="section-head" data-reveal>
        <span class="eyebrow center">Galeri</span>
        <h2 class="section-title" id="gallery-title">İmza Çalışmalarımız</h2>
        <div class="deco-rule"><span class="bar"></span><span class="lozenge"></span><span class="bar"></span></div>
      </div>
      <div class="gallery-grid">${n}</div>
    </div>`}function A(t){const r=s.images.salon[0]||s.images.hero[1],d=s.stats.find(c=>/yıl/i.test(c.label))||s.stats[1]||{value:"12+",label:"Yıl Deneyim"},n=s.values.map((c,o)=>`
      <div class="value-card" data-reveal style="--reveal-delay:${o*80}ms">
        <span class="ico" aria-hidden="true">${c.icon}</span>
        <h3>${a(c.title)}</h3>
        <p>${a(c.text)}</p>
      </div>`).join("");t.innerHTML=`
    <div class="wrap about__grid">
      <div class="about__media" data-reveal>
        <img src="${b(r,{w:760,h:950,q:74})}" alt="${a(s.brand)} salon ortamı"
          width="760" height="950" loading="lazy" />
        <div class="badge"><b>${a(d.value)}</b><span>${a(d.label)}</span></div>
      </div>
      <div class="about__text" data-reveal style="--reveal-delay:120ms">
        <span class="eyebrow">Hakkımızda</span>
        <h2 class="section-title" id="about-title" style="text-align:left">Zarafet, Bir Detaydır</h2>
        <p>${a(s.about)}</p>
        <div class="about__values">${n}</div>
      </div>
    </div>`}function S(t){const r=s.testimonials.map((d,n)=>`
      <article class="tst-card" data-reveal style="--reveal-delay:${n%3*90}ms">
        <span class="tst-card__quote" aria-hidden="true">&ldquo;</span>
        <div class="tst-card__stars" aria-label="${d.stars} / 5 yıldız">${k(d.stars)}</div>
        <p class="tst-card__text">${a(d.text)}</p>
        <div class="tst-card__foot">
          <div class="tst-card__name">${a(d.name)}</div>
          <div class="tst-card__meta">${a(d.meta)}</div>
        </div>
      </article>`).join("");t.innerHTML=`
    <div class="wrap">
      <div class="section-head" data-reveal>
        <span class="eyebrow center">Görüşler</span>
        <h2 class="section-title" id="testimonials-title">Müşterilerimiz Anlatıyor</h2>
        <div class="deco-rule"><span class="bar"></span><span class="lozenge"></span><span class="bar"></span></div>
      </div>
      <div class="tst-grid">${r}</div>
    </div>`}function T(t){const r=(new Date().getDay()+6)%7,d=s.hours.map((n,c)=>{const o=c===r?"today":"",e=n.closed?"closed":"",i=n.closed?"Kapalı":`${a(n.open)} – ${a(n.close)}`;return`<tr class="${o} ${e}"><th scope="row">${a(n.day)}</th><td>${i}</td></tr>`}).join("");t.innerHTML=`
    <div class="wrap">
      <div class="section-head" data-reveal>
        <span class="eyebrow center">İletişim</span>
        <h2 class="section-title" id="contact-title">Bize Ulaşın</h2>
        <div class="deco-rule"><span class="bar"></span><span class="lozenge"></span><span class="bar"></span></div>
      </div>
      <div class="contact__grid">
        <div class="contact__info" data-reveal>
          <div class="info-row">
            <span class="ico" aria-hidden="true">⚲</span>
            <div><div class="info-row__label">Adres</div>
              <div class="info-row__value">${a(s.address)}<br>${a(s.district)} / ${a(s.city)}</div></div>
          </div>
          <div class="info-row">
            <span class="ico" aria-hidden="true">☎</span>
            <div><div class="info-row__label">Telefon</div>
              <div class="info-row__value"><a href="${f()}">${a(s.phoneDisplay)}</a></div></div>
          </div>
          <div class="info-row">
            <span class="ico" aria-hidden="true">◷</span>
            <div><div class="info-row__label">Çalışma Saatleri</div>
              <div class="info-row__value">
                <table class="hours-table"><tbody>${d}</tbody></table>
              </div></div>
          </div>
          <div class="contact__cta">
            <a class="btn btn--framed" href="${$()}" target="_blank" rel="noopener">${a(s.ctaPrimary.label)}</a>
            <a class="btn btn--ghost" href="${s.instagramUrl}" target="_blank" rel="noopener">Instagram</a>
          </div>
        </div>
        <div class="contact__map" data-reveal style="--reveal-delay:120ms">
          <iframe src="${y()}" title="${a(s.brand)} harita konumu"
            loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        </div>
      </div>
    </div>`}function H(t){const r=new Date().getFullYear(),d=s.nav.map(n=>`<li><a href="${a(n.href)}">${a(n.label)}</a></li>`).join("");t.innerHTML=`
    <div class="wrap">
      <div class="footer__grid">
        <div class="footer__brand">
          <span class="brand__name">${a(s.brand)}</span>
          <p class="footer__desc">${a(s.slogan)} — ${a(s.brandTagline)}. ${a(s.district)} / ${a(s.city)}.</p>
          <div class="footer__social">
            <a href="${_()}" target="_blank" rel="noopener" aria-label="WhatsApp">✆</a>
            <a href="${s.instagramUrl}" target="_blank" rel="noopener" aria-label="Instagram">◎</a>
            <a href="mailto:${a(s.email)}" aria-label="E-posta">✉</a>
          </div>
        </div>
        <div class="footer__col">
          <h4>Keşfet</h4>
          <ul>${d}</ul>
        </div>
        <div class="footer__col">
          <h4>İletişim</h4>
          <ul>
            <li><a href="${f()}">${a(s.phoneDisplay)}</a></li>
            <li><a href="mailto:${a(s.email)}">${a(s.email)}</a></li>
            <li><a href="#iletisim">${a(s.address)}</a></li>
            <li>${a(s.hoursSummary)}</li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© ${r} ${a(s.brand)}. Tüm hakları saklıdır.</span>
        <span>Art Deco Glam · Konsept Tasarım</span>
      </div>
    </div>`}function g(){document.title=`${s.brand} — ${s.brandTagline}`;const t=p("[data-header]"),r=p("[data-hero]"),d=p("[data-services]"),n=p("[data-gallery]"),c=p("[data-about]"),o=p("[data-testimonials]"),e=p("[data-contact]"),i=p("[data-footer]");t&&L(t),r&&E(r),d&&M(d),n&&z(n),c&&A(c),o&&S(o),e&&T(e),i&&H(i),u(),n&&w("#galeri [data-lightbox]")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",g):g();
