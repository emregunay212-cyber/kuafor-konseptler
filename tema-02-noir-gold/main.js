/**
 * AURA BEAUTY — Tema 02 "Noir & Gold"
 * Tum dinamik icerik content.js'ten okunur, DOM'a basilir.
 * Statik dekoratif basliklar HTML'de kalir.
 */
import { SITE, img, waUrl, telUrl, mapEmbedUrl, IMAGE_POOL } from '/src/data/content.js'
import { initReveal } from '/src/shared/reveal.js'
import { initLightbox } from '/src/shared/lightbox.js'

/** Kucuk yardimci: tek dugumu guvenle sec. */
const $ = (sel, root = document) => root.querySelector(sel)
/** Tum dugumler. */
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))

/** Metni dugume yaz (varsa). */
function setText(sel, text) {
  const el = $(sel)
  if (el) el.textContent = text
}

/** wa.me randevu mesaji. */
const bookingMsg = `Merhaba ${SITE.brand}! Randevu almak istiyorum.`

/* ---------------------------------------------------------
   1) Marka, baslik, meta
--------------------------------------------------------- */
function hydrateBrand() {
  document.title = `${SITE.brand} — ${SITE.brandTagline}`
  $$('[data-brand]').forEach((el) => (el.textContent = SITE.brand))
  setText('[data-tagline]', SITE.brandTagline)
  setText('[data-slogan]', SITE.slogan)
  setText('[data-intro]', SITE.intro)
}

/* ---------------------------------------------------------
   2) Navigasyon (masaustu + mobil)
--------------------------------------------------------- */
function renderNavInto(container, mobile = false) {
  if (!container) return
  container.innerHTML = ''
  SITE.nav.forEach(({ label, href }) => {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = href
    a.textContent = label
    if (mobile) a.dataset.mobileLink = ''
    li.appendChild(a)
    container.appendChild(li)
  })
}

function hydrateNav() {
  renderNavInto($('[data-nav]'))
  renderNavInto($('[data-mobile-nav-list]'), true)
}

/* ---------------------------------------------------------
   3) Mobil menu davranisi
--------------------------------------------------------- */
function initMobileMenu() {
  const toggle = $('[data-nav-toggle]')
  const panel = $('[data-mobile-nav]')
  if (!toggle || !panel) return

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç')
    if (open) panel.removeAttribute('hidden')
    else panel.setAttribute('hidden', '')
  }

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true'
    setOpen(!open)
  })

  $$('[data-mobile-link]', panel).forEach((a) =>
    a.addEventListener('click', () => setOpen(false))
  )

  // Mobil CTA tiklayinca da kapat
  const mobileCta = $('[data-cta-mobile]')
  if (mobileCta) mobileCta.addEventListener('click', () => setOpen(false))
}

/* ---------------------------------------------------------
   4) Sticky header golge
--------------------------------------------------------- */
function initStickyHeader() {
  const header = $('[data-header]')
  if (!header) return
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

/* ---------------------------------------------------------
   5) CTA linkleri (WhatsApp)
--------------------------------------------------------- */
function hydrateCtas() {
  const booking = waUrl(bookingMsg)
  ;[
    '[data-cta-header]',
    '[data-cta-mobile]',
    '[data-cta-primary]',
    '[data-cta-contact]',
  ].forEach((sel) => {
    const el = $(sel)
    if (el) el.href = booking
  })

  const wa = $('[data-cta-whatsapp]')
  if (wa) wa.href = waUrl()

  const insta = $('[data-cta-insta]')
  if (insta) {
    insta.href = SITE.instagramUrl
    insta.textContent = `@${SITE.instagram}`
  }
}

/* ---------------------------------------------------------
   6) Hero gorseli + stats
--------------------------------------------------------- */
function hydrateHero() {
  const heroImg = $('[data-hero-img]')
  if (heroImg && SITE.images.hero.length) {
    heroImg.src = img(SITE.images.hero[0], { w: 1600, h: 1100, q: 78 })
    heroImg.alt = `${SITE.brand} — güzellik portresi`
  }

  const stats = $('[data-stats]')
  if (stats) {
    stats.innerHTML = ''
    SITE.stats.forEach(({ value, label }) => {
      const li = document.createElement('li')
      li.innerHTML = `<span class="stat-value">${value}</span><span class="stat-label">${label}</span>`
      stats.appendChild(li)
    })
  }
}

/* ---------------------------------------------------------
   7) Hizmetler (sekmeli)
--------------------------------------------------------- */
function hydrateServices() {
  const tabsWrap = $('[data-service-tabs]')
  const panelsWrap = $('[data-service-panels]')
  if (!tabsWrap || !panelsWrap) return

  tabsWrap.innerHTML = ''
  panelsWrap.innerHTML = ''

  SITE.serviceCategories.forEach((cat, i) => {
    const panelId = `svc-panel-${cat.key}`
    const tabId = `svc-tab-${cat.key}`
    const active = i === 0

    // Sekme
    const tab = document.createElement('button')
    tab.type = 'button'
    tab.className = `service-tab${active ? ' is-active' : ''}`
    tab.id = tabId
    tab.setAttribute('role', 'tab')
    tab.setAttribute('aria-selected', String(active))
    tab.setAttribute('aria-controls', panelId)
    tab.innerHTML = `<span class="tab-icon" aria-hidden="true">${cat.icon}</span>${cat.name}`
    tabsWrap.appendChild(tab)

    // Panel
    const panel = document.createElement('div')
    panel.className = `service-panel${active ? ' is-active' : ''}`
    panel.id = panelId
    panel.setAttribute('role', 'tabpanel')
    panel.setAttribute('aria-labelledby', tabId)
    if (!active) panel.hidden = true

    const rows = cat.services
      .map(
        (s) => `
        <div class="service-row">
          <div class="service-row-main">
            <h3 class="service-name">${s.name}</h3>
            <p class="service-desc">${s.desc}</p>
          </div>
          <div class="service-meta">
            <span class="service-price">${s.price}</span>
            <span class="service-duration">${s.duration}</span>
          </div>
        </div>`
      )
      .join('')

    panel.innerHTML = `
      <p class="panel-blurb">${cat.blurb}</p>
      <div class="service-list">${rows}</div>`
    panelsWrap.appendChild(panel)

    tab.addEventListener('click', () => activateService(cat.key))
  })
}

function activateService(key) {
  $$('.service-tab').forEach((t) => {
    const on = t.id === `svc-tab-${key}`
    t.classList.toggle('is-active', on)
    t.setAttribute('aria-selected', String(on))
  })
  $$('.service-panel').forEach((p) => {
    const on = p.id === `svc-panel-${key}`
    p.classList.toggle('is-active', on)
    p.hidden = !on
  })
}

/* ---------------------------------------------------------
   8) Galeri (gridi kiran kompozisyon, 9 gorsel)
--------------------------------------------------------- */
function hydrateGallery() {
  const grid = $('[data-gallery]')
  if (!grid) return
  grid.innerHTML = ''

  const ids = IMAGE_POOL.slice(0, 9)
  ids.forEach((id, i) => {
    const big = i === 0
    const fig = document.createElement('figure')
    fig.className = 'gallery-item'
    const image = document.createElement('img')
    image.src = img(id, big ? { w: 900, h: 900, q: 76 } : { w: 700, h: 600, q: 74 })
    image.alt = `${SITE.brand} galeri görseli ${i + 1}`
    image.loading = 'lazy'
    image.setAttribute('data-lightbox', '')
    image.setAttribute('data-full', img(id, { w: 1500, q: 82 }))
    fig.appendChild(image)
    grid.appendChild(fig)
  })
}

/* ---------------------------------------------------------
   9) Hakkimizda
--------------------------------------------------------- */
function hydrateAbout() {
  setText('[data-about]', SITE.about)

  const aboutImg = $('[data-about-img]')
  if (aboutImg) {
    const pool = SITE.images.salon.length ? SITE.images.salon : IMAGE_POOL
    aboutImg.src = img(pool[0], { w: 760, h: 950, q: 78 })
    aboutImg.alt = `${SITE.brand} salon atmosferi`
  }

  const values = $('[data-values]')
  if (values) {
    values.innerHTML = ''
    SITE.values.forEach(({ icon, title, text }, i) => {
      const li = document.createElement('li')
      li.className = 'value-card'
      li.setAttribute('data-reveal', '')
      li.style.setProperty('--reveal-delay', `${i * 90}ms`)
      li.innerHTML = `
        <span class="value-icon" aria-hidden="true">${icon}</span>
        <h3 class="value-title">${title}</h3>
        <p class="value-text">${text}</p>`
      values.appendChild(li)
    })
  }
}

/* ---------------------------------------------------------
   10) Yorumlar
--------------------------------------------------------- */
function hydrateTestimonials() {
  const wrap = $('[data-testimonials]')
  if (!wrap) return
  wrap.innerHTML = ''

  SITE.testimonials.forEach((t, i) => {
    const stars = '★'.repeat(Math.max(0, Math.min(5, t.stars)))
    const article = document.createElement('article')
    article.className = 'testimonial'
    article.setAttribute('data-reveal', '')
    article.style.setProperty('--reveal-delay', `${(i % 2) * 90}ms`)
    article.innerHTML = `
      <div class="testimonial-stars" aria-label="${t.stars} / 5 yıldız">${stars}</div>
      <p class="testimonial-text">${t.text}</p>
      <div class="testimonial-foot">
        <span class="testimonial-name">${t.name}</span>
        <span class="testimonial-meta">${t.meta}</span>
      </div>`
    wrap.appendChild(article)
  })
}

/* ---------------------------------------------------------
   11) Iletisim: bilgiler, saatler, harita
--------------------------------------------------------- */
function hydrateContact() {
  const list = $('[data-contact-list]')
  if (list) {
    const rows = [
      { icon: '📍', label: 'Adres', value: SITE.address },
      { icon: '📞', label: 'Telefon', value: SITE.phoneDisplay, href: telUrl() },
      { icon: '💬', label: 'WhatsApp', value: 'Randevu için yazın', href: waUrl(bookingMsg) },
      { icon: '✉️', label: 'E-posta', value: SITE.email, href: `mailto:${SITE.email}` },
      { icon: '◎', label: 'Instagram', value: `@${SITE.instagram}`, href: SITE.instagramUrl },
    ]
    list.innerHTML = ''
    rows.forEach(({ icon, label, value, href }) => {
      const li = document.createElement('li')
      li.className = 'contact-row'
      const valueHtml = href
        ? `<a class="contact-row-value" href="${href}"${href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${value}</a>`
        : `<span class="contact-row-value">${value}</span>`
      li.innerHTML = `
        <span class="contact-row-icon" aria-hidden="true">${icon}</span>
        <span>
          <span class="contact-row-label">${label}</span>
          ${valueHtml}
        </span>`
      list.appendChild(li)
    })
  }

  const hours = $('[data-hours]')
  if (hours) {
    hours.innerHTML = ''
    SITE.hours.forEach((h) => {
      const li = document.createElement('li')
      li.className = `hours-row${h.closed ? ' is-closed' : ''}`
      const time = h.closed ? 'Kapalı' : `${h.open} – ${h.close}`
      li.innerHTML = `<span class="hours-day">${h.day}</span><span class="hours-time">${time}</span>`
      hours.appendChild(li)
    })
  }

  const map = $('[data-map]')
  if (map) map.src = mapEmbedUrl()
}

/* ---------------------------------------------------------
   12) Footer
--------------------------------------------------------- */
function hydrateFooter() {
  setText('[data-footer-about]', SITE.intro)

  renderNavInto($('[data-footer-nav]'))

  const fc = $('[data-footer-contact]')
  if (fc) {
    fc.innerHTML = ''
    const items = [
      { value: SITE.address },
      { value: SITE.phoneDisplay, href: telUrl() },
      { value: SITE.email, href: `mailto:${SITE.email}` },
      { value: `@${SITE.instagram}`, href: SITE.instagramUrl },
    ]
    items.forEach(({ value, href }) => {
      const li = document.createElement('li')
      li.innerHTML = href
        ? `<a href="${href}"${href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${value}</a>`
        : value
      fc.appendChild(li)
    })
  }

  setText('[data-copyright]', `© ${new Date().getFullYear()} ${SITE.brand}`)
}

/* ---------------------------------------------------------
   Baslat
--------------------------------------------------------- */
function init() {
  hydrateBrand()
  hydrateNav()
  hydrateCtas()
  hydrateHero()
  hydrateServices()
  hydrateGallery()
  hydrateAbout()
  hydrateTestimonials()
  hydrateContact()
  hydrateFooter()

  initMobileMenu()
  initStickyHeader()

  // Dinamik dugumler basildiktan sonra reveal + lightbox
  initReveal()
  initLightbox('[data-lightbox]')
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
