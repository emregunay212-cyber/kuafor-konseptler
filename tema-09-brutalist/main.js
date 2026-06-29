/**
 * AURA BEAUTY — Tema 09 · NEO-BRUTALIST
 * Tüm dinamik içerik SITE'tan okunur ve DOM'a basılır.
 * Hiçbir gerçek bilgi HTML'e elle yazılmaz.
 */
import { SITE, img, waUrl, telUrl, mapEmbedUrl, IMAGE_POOL } from '/src/data/content.js'
import { initReveal } from '/src/shared/reveal.js'
import { initLightbox } from '/src/shared/lightbox.js'

/* ---------- Küçük yardımcılar ---------- */
const $ = (sel, root = document) => root.querySelector(sel)
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))

/** Güvenli metin atama (null-guard). */
function setText(sel, value, root = document) {
  $$(sel, root).forEach((el) => {
    el.textContent = value
  })
}

/** Yıldız dizisi üret (dolu + boş, 5 üzerinden). */
function stars(n) {
  const full = Math.max(0, Math.min(5, Number(n) || 0))
  return '★'.repeat(full) + '☆'.repeat(5 - full)
}

/* =========================================================
   META / MARKA
   ========================================================= */
function renderMeta() {
  document.title = `${SITE.brand} — ${SITE.brandTagline}`
  setText('[data-brand]', SITE.brand)
  setText('[data-brand-tagline]', SITE.brandTagline)
  setText('[data-slogan]', SITE.slogan)
  setText('[data-intro]', SITE.intro)
  setText('[data-about]', SITE.about)
  setText('[data-address]', SITE.address)
  setText('[data-footer-intro]', SITE.intro)

  // Marka türevleri (tek kaynak: SITE.brand) — dekoratif rozet/işaret
  const initial = (SITE.brand.trim()[0] || 'A').toLocaleUpperCase('tr')
  setText('[data-brand-mark]', initial)
  setText('[data-brand-badge]', `EST. ${(SITE.brandShort || SITE.brand).toLocaleUpperCase('tr')}`)

  // Erişilebilir adlar / başlıklar
  $$('[data-brand-link]').forEach((el) => el.setAttribute('aria-label', `${SITE.brand} ana sayfa`))
  $$('[data-map-title]').forEach((el) => el.setAttribute('title', `${SITE.brand} harita konumu`))
  const heroImg = $('[data-hero-img]')
  if (heroImg) heroImg.alt = `${SITE.brand} salonundan profesyonel bir görünüm`
  const aboutImg = $('[data-about-img]')
  if (aboutImg) aboutImg.alt = `${SITE.brand} ekibi ve atmosferi`

  const year = new Date().getFullYear()
  setText('[data-copyright]', `© ${year} ${SITE.brand}. Tüm hakları saklıdır.`)
}

/* =========================================================
   CTA LİNKLERİ
   ========================================================= */
function renderCtas() {
  const primaryHref = waUrl()
  $$('[data-cta-primary]').forEach((el) => {
    el.textContent = SITE.ctaPrimary.label
    el.href = primaryHref
  })
  $$('[data-cta-secondary]').forEach((el) => {
    el.textContent = SITE.ctaSecondary.label
    el.href = waUrl(`Merhaba! ${SITE.brand} için WhatsApp üzerinden randevu almak istiyorum.`)
  })
}

/* =========================================================
   NAVİGASYON (desktop + mobil + footer)
   ========================================================= */
function navItems(list) {
  return SITE.nav
    .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
    .join('')
}

function renderNav() {
  const html = navItems()
  const desktop = $('[data-nav]')
  const mobile = $('[data-nav-mobile]')
  const footer = $('[data-nav-footer]')
  if (desktop) desktop.innerHTML = html
  if (footer) footer.innerHTML = html
  if (mobile) mobile.innerHTML = html
}

/* =========================================================
   MOBİL MENÜ DAVRANIŞI
   ========================================================= */
function initMobileNav() {
  const toggle = $('.nav-toggle')
  const panel = $('#mobile-nav')
  if (!toggle || !panel) return

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç')
    if (open) {
      panel.hidden = false
    } else {
      panel.hidden = true
    }
  }

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true')
  })

  // Link tıklanınca kapat
  panel.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false)
  })

  // Geniş ekrana geçince güvenli sıfırla
  window.matchMedia('(min-width: 861px)').addEventListener('change', (ev) => {
    if (ev.matches) setOpen(false)
  })
}

/* =========================================================
   HERO GÖRSEL + STATS + MARQUEE
   ========================================================= */
function renderHero() {
  const heroImg = $('[data-hero-img]')
  if (heroImg) {
    const id = SITE.images.hero[0]
    heroImg.src = img(id, { w: 700, h: 860, q: 80 })
    heroImg.setAttribute('fetchpriority', 'high')
  }

  const statsEl = $('[data-stats]')
  if (statsEl) {
    statsEl.innerHTML = SITE.stats
      .map(
        (s) => `
        <li class="stat">
          <span class="stat__value">${s.value}</span>
          <span class="stat__label">${s.label}</span>
        </li>`
      )
      .join('')
  }

  const marquee = $('[data-marquee]')
  if (marquee) {
    const words = [SITE.slogan, ...SITE.serviceCategories.map((c) => c.name), SITE.brandTagline]
    const seq = words
      .map((w) => `<span>${w}</span><span class="dot">✦</span>`)
      .join('')
    // İki kez tekrar -> kesintisiz kayan şerit (-50% translate ile)
    marquee.innerHTML = seq + seq
  }
}

/* =========================================================
   HİZMETLER
   ========================================================= */
function renderServices() {
  const grid = $('[data-services]')
  if (!grid) return

  grid.innerHTML = SITE.serviceCategories
    .map((cat) => {
      const items = cat.services
        .map(
          (s) => `
        <li class="svc-item">
          <span class="svc-item__name">${s.name}</span>
          <span class="svc-item__price">${s.price}</span>
          <span class="svc-item__desc">${s.desc}</span>
          <span class="svc-item__dur">${s.duration}</span>
        </li>`
        )
        .join('')

      return `
      <article class="svc-card" data-reveal>
        <div class="svc-card__head">
          <span class="svc-card__icon" aria-hidden="true">${cat.icon}</span>
          <h3 class="svc-card__name">${cat.name}</h3>
        </div>
        <p class="svc-card__blurb">${cat.blurb}</p>
        <ul class="svc-list">${items}</ul>
      </article>`
    })
    .join('')
}

/* =========================================================
   GALERİ
   ========================================================= */
function renderGallery() {
  const grid = $('[data-gallery]')
  if (!grid) return

  // Çeşitlilik için havuzdan 9 görsel seç (sıralı, tekrar yok)
  const ids = IMAGE_POOL.slice(0, 9)

  grid.innerHTML = ids
    .map((id, i) => {
      const small = img(id, { w: 700, h: 700, q: 70 })
      const full = img(id, { w: 1400, q: 82 })
      return `
      <figure class="gallery-item" data-reveal style="--reveal-delay:${(i % 3) * 80}ms">
        <img
          src="${small}"
          data-full="${full}"
          data-lightbox
          loading="lazy"
          width="700"
          height="700"
          alt="${SITE.brand} galeri görseli ${i + 1}"
        />
      </figure>`
    })
    .join('')
}

/* =========================================================
   HAKKIMIZDA — görsel + değerler
   ========================================================= */
function renderAbout() {
  const aboutImg = $('[data-about-img]')
  if (aboutImg) {
    const id = SITE.images.salon[0] || SITE.images.hero[1]
    aboutImg.src = img(id, { w: 640, h: 760, q: 80 })
  }

  const valuesEl = $('[data-values]')
  if (valuesEl) {
    valuesEl.innerHTML = SITE.values
      .map(
        (v, i) => `
      <li class="value-card" data-reveal style="--reveal-delay:${(i % 2) * 90}ms">
        <span class="value-card__icon" aria-hidden="true">${v.icon}</span>
        <h3 class="value-card__title">${v.title}</h3>
        <p class="value-card__text">${v.text}</p>
      </li>`
      )
      .join('')
  }
}

/* =========================================================
   YORUMLAR
   ========================================================= */
function renderTestimonials() {
  const grid = $('[data-testimonials]')
  if (!grid) return

  grid.innerHTML = SITE.testimonials
    .map(
      (t, i) => `
    <blockquote class="review-card" data-reveal style="--reveal-delay:${(i % 3) * 80}ms">
      <div class="review-stars" aria-label="${t.stars} / 5 yıldız">${stars(t.stars)}</div>
      <p class="review-text">“${t.text}”</p>
      <footer class="review-foot">
        <cite class="review-name">${t.name}</cite>
        <span class="review-meta">${t.meta}</span>
      </footer>
    </blockquote>`
    )
    .join('')
}

/* =========================================================
   İLETİŞİM — linkler, saatler, harita
   ========================================================= */
function renderContact() {
  const links = $('[data-contact-links]')
  if (links) {
    links.innerHTML = `
      <a class="contact-link contact-link--wa" href="${waUrl()}" target="_blank" rel="noopener">
        <span class="contact-link__icon" aria-hidden="true">💬</span> WhatsApp ile Randevu
      </a>
      <a class="contact-link contact-link--tel" href="${telUrl()}">
        <span class="contact-link__icon" aria-hidden="true">📞</span> ${SITE.phoneDisplay}
      </a>
      <a class="contact-link contact-link--ig" href="${SITE.instagramUrl}" target="_blank" rel="noopener">
        <span class="contact-link__icon" aria-hidden="true">📸</span> @${SITE.instagram}
      </a>`
  }

  const hoursEl = $('[data-hours]')
  if (hoursEl) {
    hoursEl.innerHTML = SITE.hours
      .map((h) => {
        const right = h.closed
          ? '<span class="closed">Kapalı</span>'
          : `<span class="time">${h.open} – ${h.close}</span>`
        return `<li><span class="day">${h.day}</span>${right}</li>`
      })
      .join('')
  }

  const map = $('[data-map]')
  if (map) map.src = mapEmbedUrl()
}

/* =========================================================
   FOOTER — sosyal
   ========================================================= */
function renderSocial() {
  const social = $('[data-social]')
  if (!social) return
  social.innerHTML = `
    <a href="${SITE.instagramUrl}" target="_blank" rel="noopener">📸 Instagram</a>
    <a href="${waUrl()}" target="_blank" rel="noopener">💬 WhatsApp</a>
    <a href="${telUrl()}">📞 ${SITE.phoneDisplay}</a>`
}

/* =========================================================
   BOOT
   ========================================================= */
function init() {
  renderMeta()
  renderCtas()
  renderNav()
  renderHero()
  renderServices()
  renderGallery()
  renderAbout()
  renderTestimonials()
  renderContact()
  renderSocial()

  initMobileNav()

  // Dinamik DOM hazır olduktan sonra reveal + lightbox bağla
  initReveal()
  initLightbox('[data-lightbox]')
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
