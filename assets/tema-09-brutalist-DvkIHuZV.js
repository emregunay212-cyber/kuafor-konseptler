import{S as t,w as d,i as m,I as f,t as u,m as b}from"./content-BsmWQ5DW.js";import{i as h,a as g}from"./lightbox-D1FkXsxL.js";const r=(e,a=document)=>a.querySelector(e),c=(e,a=document)=>Array.from(a.querySelectorAll(e));function l(e,a,s=document){c(e,s).forEach(n=>{n.textContent=a})}function v(e){const a=Math.max(0,Math.min(5,Number(e)||0));return"★".repeat(a)+"☆".repeat(5-a)}function $(){document.title=`${t.brand} — ${t.brandTagline}`,l("[data-brand]",t.brand),l("[data-brand-tagline]",t.brandTagline),l("[data-slogan]",t.slogan),l("[data-intro]",t.intro),l("[data-about]",t.about),l("[data-address]",t.address),l("[data-footer-intro]",t.intro);const e=(t.brand.trim()[0]||"A").toLocaleUpperCase("tr");l("[data-brand-mark]",e),l("[data-brand-badge]",`EST. ${t.brandShort.toLocaleUpperCase("tr")}`),c("[data-brand-link]").forEach(i=>i.setAttribute("aria-label",`${t.brand} ana sayfa`)),c("[data-map-title]").forEach(i=>i.setAttribute("title",`${t.brand} harita konumu`));const a=r("[data-hero-img]");a&&(a.alt=`${t.brand} salonundan profesyonel bir görünüm`);const s=r("[data-about-img]");s&&(s.alt=`${t.brand} ekibi ve atmosferi`);const n=new Date().getFullYear();l("[data-copyright]",`© ${n} ${t.brand}. Tüm hakları saklıdır.`)}function _(){const e=d();c("[data-cta-primary]").forEach(a=>{a.textContent=t.ctaPrimary.label,a.href=e}),c("[data-cta-secondary]").forEach(a=>{a.textContent=t.ctaSecondary.label,a.href=d(`Merhaba! ${t.brand} için WhatsApp üzerinden randevu almak istiyorum.`)})}function y(e){return t.nav.map(a=>`<li><a href="${a.href}">${a.label}</a></li>`).join("")}function k(){const e=y(),a=r("[data-nav]"),s=r("[data-nav-mobile]"),n=r("[data-nav-footer]");a&&(a.innerHTML=e),n&&(n.innerHTML=e),s&&(s.innerHTML=e)}function M(){const e=r(".nav-toggle"),a=r("#mobile-nav");if(!e||!a)return;const s=n=>{e.setAttribute("aria-expanded",String(n)),e.setAttribute("aria-label",n?"Menüyü kapat":"Menüyü aç"),n?a.hidden=!1:a.hidden=!0};e.addEventListener("click",()=>{s(e.getAttribute("aria-expanded")!=="true")}),a.addEventListener("click",n=>{n.target.closest("a")&&s(!1)}),window.matchMedia("(min-width: 861px)").addEventListener("change",n=>{n.matches&&s(!1)})}function L(){const e=r("[data-hero-img]");if(e){const n=t.images.hero[0];e.src=m(n,{w:700,h:860,q:80}),e.setAttribute("fetchpriority","high")}const a=r("[data-stats]");a&&(a.innerHTML=t.stats.map(n=>`
        <li class="stat">
          <span class="stat__value">${n.value}</span>
          <span class="stat__label">${n.label}</span>
        </li>`).join(""));const s=r("[data-marquee]");if(s){const i=[t.slogan,...t.serviceCategories.map(o=>o.name),t.brandTagline].map(o=>`<span>${o}</span><span class="dot">✦</span>`).join("");s.innerHTML=i+i}}function w(){const e=r("[data-services]");e&&(e.innerHTML=t.serviceCategories.map(a=>{const s=a.services.map(n=>`
        <li class="svc-item">
          <span class="svc-item__name">${n.name}</span>
          <span class="svc-item__price">${n.price}</span>
          <span class="svc-item__desc">${n.desc}</span>
          <span class="svc-item__dur">${n.duration}</span>
        </li>`).join("");return`
      <article class="svc-card" data-reveal>
        <div class="svc-card__head">
          <span class="svc-card__icon" aria-hidden="true">${a.icon}</span>
          <h3 class="svc-card__name">${a.name}</h3>
        </div>
        <p class="svc-card__blurb">${a.blurb}</p>
        <ul class="svc-list">${s}</ul>
      </article>`}).join(""))}function T(){const e=r("[data-gallery]");if(!e)return;const a=f.slice(0,9);e.innerHTML=a.map((s,n)=>{const i=m(s,{w:700,h:700,q:70}),o=m(s,{w:1400,q:82});return`
      <figure class="gallery-item" data-reveal style="--reveal-delay:${n%3*80}ms">
        <img
          src="${i}"
          data-full="${o}"
          data-lightbox
          loading="lazy"
          width="700"
          height="700"
          alt="${t.brand} galeri görseli ${n+1}"
        />
      </figure>`}).join("")}function E(){const e=r("[data-about-img]");if(e){const s=t.images.salon[0]||t.images.hero[1];e.src=m(s,{w:640,h:760,q:80})}const a=r("[data-values]");a&&(a.innerHTML=t.values.map((s,n)=>`
      <li class="value-card" data-reveal style="--reveal-delay:${n%2*90}ms">
        <span class="value-card__icon" aria-hidden="true">${s.icon}</span>
        <h3 class="value-card__title">${s.title}</h3>
        <p class="value-card__text">${s.text}</p>
      </li>`).join(""))}function x(){const e=r("[data-testimonials]");e&&(e.innerHTML=t.testimonials.map((a,s)=>`
    <blockquote class="review-card" data-reveal style="--reveal-delay:${s%3*80}ms">
      <div class="review-stars" aria-label="${a.stars} / 5 yıldız">${v(a.stars)}</div>
      <p class="review-text">“${a.text}”</p>
      <footer class="review-foot">
        <cite class="review-name">${a.name}</cite>
        <span class="review-meta">${a.meta}</span>
      </footer>
    </blockquote>`).join(""))}function A(){const e=r("[data-contact-links]");e&&(e.innerHTML=`
      <a class="contact-link contact-link--wa" href="${d()}" target="_blank" rel="noopener">
        <span class="contact-link__icon" aria-hidden="true">💬</span> WhatsApp ile Randevu
      </a>
      <a class="contact-link contact-link--tel" href="${u()}">
        <span class="contact-link__icon" aria-hidden="true">📞</span> ${t.phoneDisplay}
      </a>
      <a class="contact-link contact-link--ig" href="${t.instagramUrl}" target="_blank" rel="noopener">
        <span class="contact-link__icon" aria-hidden="true">📸</span> @${t.instagram}
      </a>`);const a=r("[data-hours]");a&&(a.innerHTML=t.hours.map(n=>{const i=n.closed?'<span class="closed">Kapalı</span>':`<span class="time">${n.open} – ${n.close}</span>`;return`<li><span class="day">${n.day}</span>${i}</li>`}).join(""));const s=r("[data-map]");s&&(s.src=b())}function H(){const e=r("[data-social]");e&&(e.innerHTML=`
    <a href="${t.instagramUrl}" target="_blank" rel="noopener">📸 Instagram</a>
    <a href="${d()}" target="_blank" rel="noopener">💬 WhatsApp</a>
    <a href="${u()}">📞 ${t.phoneDisplay}</a>`)}function p(){$(),_(),k(),L(),w(),T(),E(),x(),A(),H(),M(),h(),g("[data-lightbox]")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",p):p();
