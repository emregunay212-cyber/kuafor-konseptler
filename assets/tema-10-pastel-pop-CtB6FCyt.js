import{S as n,w as p,i as m,I as v,t as h,m as g}from"./content-BsmWQ5DW.js";import{i as b,a as _}from"./lightbox-D1FkXsxL.js";const c=(t,a=document)=>a.querySelector(t),d=(t,a=document)=>Array.from(a.querySelectorAll(t));function r(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function l(t,a){const e=c(t);e&&(e.textContent=a)}function $(){document.title=`${n.brand} — ${n.brandTagline}`,d("[data-brand-name]").forEach(t=>{t.textContent=n.brandShort}),l("[data-slogan]",n.slogan),l("[data-intro]",n.intro),l("[data-about]",n.about),l("[data-footer-tag]",n.intro),l("[data-copy]",`© ${new Date().getFullYear()} ${n.brand} · Tüm hakları saklıdır.`)}function y(){const t=`Merhaba ${n.brand}! Randevu almak istiyorum.`;d("[data-cta-primary]").forEach(a=>{a.href=p(t),a.textContent=n.ctaPrimary.label}),d("[data-cta-secondary]").forEach(a=>{a.href=p(`Merhaba! ${n.brand} hakkında bilgi almak istiyorum.`)})}function M(){const t=c("[data-nav]"),a=c("[data-mobile-nav]"),e=c("[data-footer-nav]"),i=n.nav.map(s=>`<li><a href="${r(s.href)}">${r(s.label)}</a></li>`).join("");t&&(t.innerHTML=i),a&&(a.innerHTML=i),e&&(e.innerHTML=i)}function L(){const t=c("[data-hero-img]");if(t){const e=n.images.hero[0];t.src=m(e,{w:900,h:1125,q:80}),t.width=900,t.height=1125,t.alt=`${n.brand} — güzellik salonundan bir portre`}const a=c("[data-stats]");a&&(a.innerHTML=n.stats.map(e=>`<li><span class="stat__value">${r(e.value)}</span><span class="stat__label">${r(e.label)}</span></li>`).join(""))}function w(){const t=c("[data-services]");t&&(t.innerHTML=n.serviceCategories.map(a=>{const e=a.services.map(i=>`
          <li class="service-item">
            <div class="service-item__top">
              <span class="service-item__name">${r(i.name)}</span>
              <span class="service-item__price">${r(i.price)}</span>
            </div>
            <p class="service-item__desc">${r(i.desc)}</p>
            <span class="service-item__dur">${r(i.duration)}</span>
          </li>`).join("");return`
        <article class="cat-card" data-reveal>
          <div class="cat-card__head">
            <span class="cat-card__icon" aria-hidden="true">${r(a.icon)}</span>
            <div>
              <h3 class="cat-card__name">${r(a.name)}</h3>
              <p class="cat-card__blurb">${r(a.blurb)}</p>
            </div>
          </div>
          <ul class="service-list">${e}</ul>
        </article>`}).join(""))}function x(){const t=c("[data-gallery]");if(!t)return;const a=v.slice(0,9);t.innerHTML=a.map((e,i)=>{const s=m(e,{w:700,h:700,q:75}),o=m(e,{w:1400,q:80});return`
        <figure data-reveal style="--reveal-delay:${i%3*90}ms">
          <img
            src="${s}"
            data-full="${o}"
            data-lightbox
            width="700" height="700"
            loading="lazy"
            alt="${r(n.brand)} galeri görseli ${i+1}"
          />
        </figure>`}).join("")}function E(){const t=c("[data-about-img]");if(t){const e=n.images.salon[0]||n.images.hero[1];t.src=m(e,{w:760,h:950,q:80}),t.width=760,t.height=950,t.alt=`${n.brand} salonundan bir kare`}const a=c("[data-values]");a&&(a.innerHTML=n.values.map(e=>`
        <li class="value-card" data-reveal>
          <span class="value-card__icon" aria-hidden="true">${r(e.icon)}</span>
          <h3 class="value-card__title">${r(e.title)}</h3>
          <p class="value-card__text">${r(e.text)}</p>
        </li>`).join(""))}function T(){const t=c("[data-testimonials]");t&&(t.innerHTML=n.testimonials.map(a=>{const e="★".repeat(Math.max(0,Math.min(5,a.stars)))+"☆".repeat(Math.max(0,5-a.stars)),i=(a.name||"?").trim().charAt(0);return`
        <article class="testi-card" data-reveal>
          <div class="testi-card__stars" aria-label="${r(a.stars)} / 5 yıldız">${e}</div>
          <p class="testi-card__text">“${r(a.text)}”</p>
          <div class="testi-card__foot">
            <span class="testi-card__avatar" aria-hidden="true">${r(i)}</span>
            <div>
              <div class="testi-card__name">${r(a.name)}</div>
              <div class="testi-card__meta">${r(a.meta)}</div>
            </div>
          </div>
        </article>`}).join(""))}function k(){l("[data-address]",n.address);const t=c("[data-phone]");t&&(t.href=h(),t.textContent=n.phoneDisplay);const a=c("[data-whatsapp]");a&&(a.href=p()),d("[data-instagram]").forEach(s=>{s.href=n.instagramUrl,(!s.textContent.trim()||s.classList.contains("footer__ig"))&&(s.textContent=s.classList.contains("footer__ig")?"Instagram":`@${n.instagram}`)});const e=c("[data-hours]");e&&(e.innerHTML=n.hours.map(s=>{const o=s.closed?'<span class="is-closed">Kapalı</span>':`<span>${r(s.open)} – ${r(s.close)}</span>`;return`<li><span class="hours__day">${r(s.day)}</span>${o}</li>`}).join(""));const i=c("[data-map]");i&&(i.src=g())}function H(){const t=c("#siteHeader");if(t){const i=()=>t.classList.toggle("is-scrolled",window.scrollY>8);i(),window.addEventListener("scroll",i,{passive:!0})}const a=c("#hamburger"),e=c("#mobileMenu");if(a&&e){const i=s=>{a.setAttribute("aria-expanded",String(s)),a.setAttribute("aria-label",s?"Menüyü kapat":"Menüyü aç"),e.hidden=!s};a.addEventListener("click",()=>i(a.getAttribute("aria-expanded")!=="true")),e.addEventListener("click",s=>{s.target.closest("a")&&i(!1)})}I()}function I(){const t=d("[data-nav] a");if(!t.length||!("IntersectionObserver"in window))return;const a=new Map;if(t.forEach(i=>{var u;const s=(u=i.getAttribute("href"))==null?void 0:u.replace("#",""),o=s&&document.getElementById(s);o&&a.set(o,i)}),!a.size)return;const e=new IntersectionObserver(i=>{i.forEach(s=>{var o;s.isIntersecting&&(t.forEach(u=>u.classList.remove("is-active")),(o=a.get(s.target))==null||o.classList.add("is-active"))})},{rootMargin:"-45% 0px -50% 0px"});a.forEach((i,s)=>e.observe(s))}function f(){$(),y(),M(),L(),w(),x(),E(),T(),k(),H(),b(),_("[data-lightbox]")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",f):f();
