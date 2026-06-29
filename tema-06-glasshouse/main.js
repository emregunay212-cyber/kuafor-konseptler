/**
 * AURA BEAUTY — "Glasshouse" tema
 * Tüm dinamik içerik TEK kaynaktan (/src/data/content.js) okunur ve DOM'a basılır.
 */
import { SITE, img, waUrl, telUrl, mapEmbedUrl, IMAGE_POOL } from '/src/data/content.js'
import { initReveal } from '/src/shared/reveal.js'
import { initLightbox } from '/src/shared/lightbox.js'

/* — Küçük yardımcılar — */
const $ = (sel, root = document) => root.querySelector(sel)
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))
const stars = (n) => '★★★★★'.slice(0, Math.max(0, Math.min(5, n))).padEnd(5, '☆')
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

/* ── Belge başlığı ── */
document.title = `${SITE.brand} — ${SITE.brandTagline}`

/* ── Marka & metin alanları ── */
function fillText() {
  $$('[data-brand]').forEach((el) => (el.textContent = SITE.brand))
  setText('[data-brand-tagline]', SITE.brandTagline)
  setText('[data-slogan]', SITE.slogan)
  setText('[data-intro]', SITE.intro)
  setText('[data-about]', SITE.about)
  setText('[data-footer-intro]', SITE.intro)
}
function setText(sel, value) {
  const el = $(sel)
  if (el) el.textContent = value
}

/* ── CTA linkleri (WhatsApp) ── */
function fillCtas() {
  const wa = waUrl()
  $$('[data-cta-header], [data-cta-randevu]').forEach((el) => (el.href = wa))
  $$('[data-cta-whatsapp]').forEach((el) => (el.href = waUrl('Merhaba! Randevu almak istiyorum.')))
}

/* ── Navigasyon (masaüstü + mobil + footer) ── */
function buildNav() {
  const itemsHtml = SITE.nav.map((n) => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`).join('')
  const desktop = $('[data-nav]')
  if (desktop) desktop.innerHTML = itemsHtml

  const mobile = $('[data-nav-mobile]')
  if (mobile) mobile.innerHTML = itemsHtml

  const footer = $('[data-nav-footer]')
  if (footer) footer.innerHTML = itemsHtml
}

/* ── İstatistik şeridi ── */
function buildStats() {
  const wrap = $('[data-stats]')
  if (!wrap) return
  wrap.innerHTML = SITE.stats
    .map(
      (s) => `
      <li class="stats__item">
        <span class="stats__value">${esc(s.value)}</span>
        <span class="stats__label">${esc(s.label)}</span>
      </li>`
    )
    .join('')
}

/* ── Hero görselleri ── */
function buildHeroImages() {
  const main = $('[data-hero-main]')
  const float = $('[data-hero-float]')
  const heroIds = SITE.images.hero
  if (main && heroIds[0]) main.src = img(heroIds[0], { w: 720, h: 900, q: 78 })
  if (float) {
    const salonId = (SITE.images.salon && SITE.images.salon[0]) || heroIds[1] || heroIds[0]
    float.src = img(salonId, { w: 360, h: 440, q: 76 })
  }
}

/* ── Hizmetler: kategori sekmeleri + paneller ── */
function buildServices() {
  const tabsWrap = $('[data-service-tabs]')
  const panelsWrap = $('[data-service-panels]')
  if (!tabsWrap || !panelsWrap) return

  const cats = SITE.serviceCategories
  tabsWrap.innerHTML = cats
    .map(
      (c, i) => `
      <button class="tab" role="tab" id="tab-${esc(c.key)}"
        aria-controls="panel-${esc(c.key)}" aria-selected="${i === 0 ? 'true' : 'false'}"
        tabindex="${i === 0 ? '0' : '-1'}">
        <span class="tab__ico" aria-hidden="true">${esc(c.icon)}</span>${esc(c.name)}
      </button>`
    )
    .join('')

  panelsWrap.innerHTML = cats
    .map(
      (c, i) => `
      <div class="service-panel ${i === 0 ? 'is-active' : ''}" role="tabpanel"
        id="panel-${esc(c.key)}" aria-labelledby="tab-${esc(c.key)}" ${i === 0 ? '' : 'hidden'}>
        <p class="panel__blurb">${esc(c.blurb)}</p>
        <div class="service-grid">
          ${c.services
            .map(
              (s) => `
            <article class="service-card">
              <div class="service-card__top">
                <h3 class="service-card__name">${esc(s.name)}</h3>
                <span class="service-card__price">${esc(s.price)}</span>
              </div>
              <p class="service-card__desc">${esc(s.desc)}</p>
              <span class="service-card__dur"><span aria-hidden="true">⏱</span> ${esc(s.duration)}</span>
            </article>`
            )
            .join('')}
        </div>
      </div>`
    )
    .join('')

  wireTabs(tabsWrap, panelsWrap)
}

function wireTabs(tabsWrap, panelsWrap) {
  const tabs = $$('.tab', tabsWrap)
  const panels = $$('.service-panel', panelsWrap)

  const activate = (idx) => {
    tabs.forEach((t, i) => {
      const on = i === idx
      t.setAttribute('aria-selected', on ? 'true' : 'false')
      t.tabIndex = on ? 0 : -1
    })
    panels.forEach((p, i) => {
      const on = i === idx
      p.classList.toggle('is-active', on)
      p.hidden = !on
    })
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(i))
    tab.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
      e.preventDefault()
      const next = e.key === 'ArrowRight' ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length
      activate(next)
      tabs[next].focus()
    })
  })
}

/* ── Galeri ── */
function buildGallery() {
  const wrap = $('[data-gallery]')
  if (!wrap) return
  // Çeşitlilik için havuzdan 9 görsel seç; bento için bazı kartlara span ver.
  const ids = IMAGE_POOL.slice(0, 9)
  const spanClass = { 0: 'gallery__item--wide', 4: 'gallery__item--tall' }
  wrap.innerHTML = ids
    .map((id, i) => {
      const wide = spanClass[i] === 'gallery__item--wide'
      const w = wide ? 1000 : 600
      const h = spanClass[i] === 'gallery__item--tall' ? 880 : 460
      return `
      <figure class="gallery__item ${spanClass[i] || ''}">
        <img data-lightbox src="${img(id, { w, h, q: 74 })}"
          data-full="${img(id, { w: 1400, q: 82 })}"
          loading="lazy" width="${w}" height="${h}" alt="Aura Beauty galeri görseli ${i + 1}" />
      </figure>`
    })
    .join('')
}

/* ── Hakkımızda görseli + değerler ── */
function buildAbout() {
  const aboutImg = $('[data-about-img]')
  if (aboutImg) {
    const id = (SITE.images.salon && SITE.images.salon[0]) || IMAGE_POOL[0]
    aboutImg.src = img(id, { w: 720, h: 810, q: 78 })
  }

  const valWrap = $('[data-values]')
  if (valWrap) {
    valWrap.innerHTML = SITE.values
      .map(
        (v) => `
      <li class="value-card">
        <span class="value-card__icon" aria-hidden="true">${esc(v.icon)}</span>
        <h3 class="value-card__title">${esc(v.title)}</h3>
        <p class="value-card__text">${esc(v.text)}</p>
      </li>`
      )
      .join('')
  }
}

/* ── Yorumlar ── */
function buildTestimonials() {
  const wrap = $('[data-testimonials]')
  if (!wrap) return
  wrap.innerHTML = SITE.testimonials
    .map(
      (t) => `
    <figure class="testimonial">
      <span class="testimonial__stars" aria-label="${t.stars} / 5 yıldız">${stars(t.stars)}</span>
      <blockquote class="testimonial__text">"${esc(t.text)}"</blockquote>
      <figcaption class="testimonial__foot">
        <span class="testimonial__name">${esc(t.name)}</span>
        <span class="testimonial__meta">${esc(t.meta)}</span>
      </figcaption>
    </figure>`
    )
    .join('')
}

/* ── İletişim ── */
function buildContact() {
  setText('[data-address]', SITE.address)

  const tel = $('[data-tel]')
  if (tel) {
    tel.href = telUrl()
    tel.textContent = SITE.phoneDisplay
  }
  const wa = $('[data-wa]')
  if (wa) wa.href = waUrl()

  const insta = $('[data-insta]')
  if (insta) {
    insta.href = SITE.instagramUrl
    insta.textContent = `@${SITE.instagram}`
  }

  const hoursWrap = $('[data-hours]')
  if (hoursWrap) {
    hoursWrap.innerHTML = SITE.hours
      .map((h) => {
        const time = h.closed
          ? '<span class="hours__time hours__time--closed">Kapalı</span>'
          : `<span class="hours__time">${esc(h.open)} – ${esc(h.close)}</span>`
        return `<li><span class="hours__day">${esc(h.day)}</span>${time}</li>`
      })
      .join('')
  }

  const map = $('[data-map]')
  if (map) map.src = mapEmbedUrl()
}

/* ── Footer (sosyal + telif) ── */
function buildFooter() {
  const instaFoot = $('[data-insta-foot]')
  if (instaFoot) instaFoot.href = SITE.instagramUrl
  const waFoot = $('[data-wa-foot]')
  if (waFoot) waFoot.href = waUrl()
  setText('[data-copyright]', `© ${new Date().getFullYear()} ${SITE.brand}. Tüm hakları saklıdır.`)
}

/* ── Mobil menü ── */
function wireMobileNav() {
  const toggle = $('#navToggle')
  const menu = $('#mobileNav')
  if (!toggle || !menu) return

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç')
    menu.hidden = !open
  }

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'))
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false)
  })
}

/* ── Header scroll durumu ── */
function wireHeaderScroll() {
  const header = $('#siteHeader')
  if (!header) return
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

/* ── Başlat ── */
function init() {
  fillText()
  fillCtas()
  buildNav()
  buildStats()
  buildHeroImages()
  buildServices()
  buildGallery()
  buildAbout()
  buildTestimonials()
  buildContact()
  buildFooter()
  wireMobileNav()
  wireHeaderScroll()

  initLightbox('[data-lightbox]')
  initReveal()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
