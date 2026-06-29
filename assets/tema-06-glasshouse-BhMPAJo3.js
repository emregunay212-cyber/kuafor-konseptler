import{S as n,w as b,i as f,I as h,t as _,m as v}from"./content-BsmWQ5DW.js";import{a as $,i as w}from"./lightbox-D1FkXsxL.js";const r=(a,t=document)=>t.querySelector(a),m=(a,t=document)=>Array.from(t.querySelectorAll(a)),y=a=>"★★★★★".slice(0,Math.max(0,Math.min(5,a))).padEnd(5,"☆"),i=a=>String(a).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);document.title=`${n.brand} — ${n.brandTagline}`;function L(){m("[data-brand]").forEach(a=>a.textContent=n.brand),p("[data-brand-tagline]",n.brandTagline),p("[data-slogan]",n.slogan),p("[data-intro]",n.intro),p("[data-about]",n.about),p("[data-footer-intro]",n.intro)}function p(a,t){const e=r(a);e&&(e.textContent=t)}function T(){const a=b();m("[data-cta-header], [data-cta-randevu]").forEach(t=>t.href=a),m("[data-cta-whatsapp]").forEach(t=>t.href=b("Merhaba! Randevu almak istiyorum."))}function k(){const a=n.nav.map(o=>`<li><a href="${i(o.href)}">${i(o.label)}</a></li>`).join(""),t=r("[data-nav]");t&&(t.innerHTML=a);const e=r("[data-nav-mobile]");e&&(e.innerHTML=a);const s=r("[data-nav-footer]");s&&(s.innerHTML=a)}function x(){const a=r("[data-stats]");a&&(a.innerHTML=n.stats.map(t=>`
      <li class="stats__item">
        <span class="stats__value">${i(t.value)}</span>
        <span class="stats__label">${i(t.label)}</span>
      </li>`).join(""))}function M(){const a=r("[data-hero-main]"),t=r("[data-hero-float]"),e=n.images.hero;if(a&&e[0]&&(a.src=f(e[0],{w:720,h:900,q:78})),t){const s=n.images.salon&&n.images.salon[0]||e[1];t.src=f(s,{w:360,h:440,q:76})}}function E(){const a=r("[data-service-tabs]"),t=r("[data-service-panels]");if(!a||!t)return;const e=n.serviceCategories;a.innerHTML=e.map((s,o)=>`
      <button class="tab" role="tab" id="tab-${i(s.key)}"
        aria-controls="panel-${i(s.key)}" aria-selected="${o===0?"true":"false"}"
        tabindex="${o===0?"0":"-1"}">
        <span class="tab__ico" aria-hidden="true">${i(s.icon)}</span>${i(s.name)}
      </button>`).join(""),t.innerHTML=e.map((s,o)=>`
      <div class="service-panel ${o===0?"is-active":""}" role="tabpanel"
        id="panel-${i(s.key)}" aria-labelledby="tab-${i(s.key)}" ${o===0?"":"hidden"}>
        <p class="panel__blurb">${i(s.blurb)}</p>
        <div class="service-grid">
          ${s.services.map(l=>`
            <article class="service-card">
              <div class="service-card__top">
                <h3 class="service-card__name">${i(l.name)}</h3>
                <span class="service-card__price">${i(l.price)}</span>
              </div>
              <p class="service-card__desc">${i(l.desc)}</p>
              <span class="service-card__dur"><span aria-hidden="true">⏱</span> ${i(l.duration)}</span>
            </article>`).join("")}
        </div>
      </div>`).join(""),H(a,t)}function H(a,t){const e=m(".tab",a),s=m(".service-panel",t),o=l=>{e.forEach((c,d)=>{const u=d===l;c.setAttribute("aria-selected",u?"true":"false"),c.tabIndex=u?0:-1}),s.forEach((c,d)=>{const u=d===l;c.classList.toggle("is-active",u),c.hidden=!u})};e.forEach((l,c)=>{l.addEventListener("click",()=>o(c)),l.addEventListener("keydown",d=>{if(d.key!=="ArrowRight"&&d.key!=="ArrowLeft")return;d.preventDefault();const u=d.key==="ArrowRight"?(c+1)%e.length:(c-1+e.length)%e.length;o(u),e[u].focus()})})}function A(){const a=r("[data-gallery]");if(!a)return;const t=h.slice(0,9),e={0:"gallery__item--wide",4:"gallery__item--tall"};a.innerHTML=t.map((s,o)=>{const c=e[o]==="gallery__item--wide"?1e3:600,d=e[o]==="gallery__item--tall"?880:460;return`
      <figure class="gallery__item ${e[o]||""}">
        <img data-lightbox src="${f(s,{w:c,h:d,q:74})}"
          data-full="${f(s,{w:1400,q:82})}"
          loading="lazy" width="${c}" height="${d}" alt="Aura Beauty galeri görseli ${o+1}" />
      </figure>`}).join("")}function S(){const a=r("[data-about-img]");if(a){const e=n.images.salon&&n.images.salon[0]||h[0];a.src=f(e,{w:720,h:810,q:78})}const t=r("[data-values]");t&&(t.innerHTML=n.values.map(e=>`
      <li class="value-card">
        <span class="value-card__icon" aria-hidden="true">${i(e.icon)}</span>
        <h3 class="value-card__title">${i(e.title)}</h3>
        <p class="value-card__text">${i(e.text)}</p>
      </li>`).join(""))}function q(){const a=r("[data-testimonials]");a&&(a.innerHTML=n.testimonials.map(t=>`
    <figure class="testimonial">
      <span class="testimonial__stars" aria-label="${t.stars} / 5 yıldız">${y(t.stars)}</span>
      <blockquote class="testimonial__text">"${i(t.text)}"</blockquote>
      <figcaption class="testimonial__foot">
        <span class="testimonial__name">${i(t.name)}</span>
        <span class="testimonial__meta">${i(t.meta)}</span>
      </figcaption>
    </figure>`).join(""))}function j(){p("[data-address]",n.address);const a=r("[data-tel]");a&&(a.href=_(),a.textContent=n.phoneDisplay);const t=r("[data-wa]");t&&(t.href=b());const e=r("[data-insta]");e&&(e.href=n.instagramUrl,e.textContent=`@${n.instagram}`);const s=r("[data-hours]");s&&(s.innerHTML=n.hours.map(l=>{const c=l.closed?'<span class="hours__time hours__time--closed">Kapalı</span>':`<span class="hours__time">${i(l.open)} – ${i(l.close)}</span>`;return`<li><span class="hours__day">${i(l.day)}</span>${c}</li>`}).join(""));const o=r("[data-map]");o&&(o.src=v())}function C(){const a=r("[data-insta-foot]");a&&(a.href=n.instagramUrl);const t=r("[data-wa-foot]");t&&(t.href=b()),p("[data-copyright]",`© ${new Date().getFullYear()} ${n.brand}. Tüm hakları saklıdır.`)}function I(){const a=r("#navToggle"),t=r("#mobileNav");if(!a||!t)return;const e=s=>{a.setAttribute("aria-expanded",String(s)),a.setAttribute("aria-label",s?"Menüyü kapat":"Menüyü aç"),t.hidden=!s};a.addEventListener("click",()=>e(a.getAttribute("aria-expanded")!=="true")),t.addEventListener("click",s=>{s.target.closest("a")&&e(!1)})}function U(){const a=r("#siteHeader");if(!a)return;const t=()=>a.classList.toggle("is-scrolled",window.scrollY>12);t(),window.addEventListener("scroll",t,{passive:!0})}function g(){L(),T(),k(),x(),M(),E(),A(),S(),q(),j(),C(),I(),U(),$("[data-lightbox]"),w()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",g):g();
