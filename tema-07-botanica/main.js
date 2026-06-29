/**
 * AURA BEAUTY — Tema 07 "Botanica"
 * Tüm dinamik içerik /src/data/content.js (SITE) tek kaynağından gelir.
 * HTML'e elle marka/telefon/fiyat yazılmaz; her şey burada DOM'a basılır.
 */
import { SITE, img, waUrl, telUrl, mapEmbedUrl, IMAGE_POOL } from '/src/data/content.js'
import { initReveal } from '/src/shared/reveal.js'
import { initLightbox } from '/src/shared/lightbox.js'

/* ---------- yardımcılar ---------- */
const $ = (sel, root = document) => root.querySelector(sel)
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))

/** Metni güvenli şekilde tüm eşleşen düğümlere yazar. */
function setText(attr, value) {
  $$(`[data-${attr}]`).forEach((el) => {
    el.textContent = value
  })
}

/** href'i güvenli şekilde tüm eşleşen düğümlere yazar. */
function setHref(attr, value) {
  $$(`[data-${attr}]`).forEach((el) => {
    el.setAttribute('href', value)
  })
}

function el(tag, className, html) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (html != null) node.innerHTML = html
  return node
}

function stars(count) {
  const full = Math.max(0, Math.min(5, Number(count) || 0))
  return '★'.repeat(full) + '☆'.repeat(5 - full)
}

/* ---------- doküman başlığı + statik metinler ---------- */
function renderMeta() {
  document.title = `${SITE.brand} — ${SITE.brandTagline}`
  setText('brand', SITE.brand)
  setText('brand-tagline', SITE.brandTagline)
  setText('slogan', SITE.slogan)
  setText('intro', SITE.intro)
  setText('about', SITE.about)
  setText('hours-summary', SITE.hoursSummary)
  setText('footer-blurb', SITE.intro)
  setText('copyright', `© ${new Date().getFullYear()} ${SITE.brand}`)

  // kısa hero rozeti: özet metnin ilk parçası
  const shortHours = SITE.hoursSummary.split('·')[0].trim()
  setText('hours-summary-short', shortHours)
}

/* ---------- iletişim linkleri ---------- */
function renderContactLinks() {
  setText('address', SITE.address)

  setText('phone', SITE.phoneDisplay)
  setHref('phone', telUrl())

  setText('instagram', `@${SITE.instagram}`)
  setHref('instagram', SITE.instagramUrl)

  // CTA'lar (WhatsApp randevu)
  setHref('cta-appointment', waUrl())
  setHref('cta-appointment-mobile', waUrl())
  setHref('cta-whatsapp', waUrl('Merhaba! Randevu oluşturmak istiyorum.'))

  setText('cta-appointment-label', SITE.ctaPrimary.label)
  setText('cta-whatsapp-label', SITE.ctaSecondary.label)

  // CTA buton etiketleri (label'sız olanlara metin yaz)
  $$('[data-cta-appointment]').forEach((node) => {
    if (!$('[data-cta-appointment-label]', node) && !node.querySelector('.wa-icon')) {
      if (!node.textContent.trim()) node.textContent = SITE.ctaPrimary.label
    }
  })
  $$('[data-cta-appointment-mobile]').forEach((node) => {
    node.textContent = SITE.ctaPrimary.label
  })

  // harita
  const map = $('[data-map]')
  if (map) {
    map.setAttribute('src', mapEmbedUrl())
    map.setAttribute('title', `${SITE.brand} konum haritası`)
  }
}

/* ---------- navigasyon ---------- */
function renderNav() {
  const build = (target, mobile = false) => {
    if (!target) return
    target.innerHTML = ''
    SITE.nav.forEach((item) => {
      const li = el('li')
      const a = el('a', null, item.label)
      a.setAttribute('href', item.href)
      if (mobile) a.dataset.navClose = ''
      li.appendChild(a)
      target.appendChild(li)
    })
  }
  build($('[data-nav]'))
  build($('[data-nav-mobile]'), true)

  // footer nav (sade liste)
  const footer = $('[data-nav-footer]')
  if (footer) {
    footer.innerHTML = ''
    SITE.nav.forEach((item) => {
      const li = el('li')
      const a = el('a', null, item.label)
      a.setAttribute('href', item.href)
      li.appendChild(a)
      footer.appendChild(li)
    })
  }
}

/* ---------- hero görselleri + stats ---------- */
function renderHero() {
  const heroIds = SITE.images.hero
  const main = $('[data-hero-main]')
  if (main && heroIds[0]) {
    main.src = img(heroIds[0], { w: 760, h: 920 })
    main.alt = `${SITE.brand} salonundan bir portre`
  }
  const sub = $('[data-hero-sub]')
  if (sub && heroIds[1]) {
    sub.src = img(heroIds[1], { w: 360, h: 410 })
    sub.alt = 'Güzellik bakımı detayı'
  }

  const statsList = $('[data-stats]')
  if (statsList) {
    statsList.innerHTML = ''
    SITE.stats.forEach((s) => {
      const li = el('li')
      li.appendChild(el('span', 'stat-value', s.value))
      li.appendChild(el('span', 'stat-label', s.label))
      statsList.appendChild(li)
    })
  }
}

/* ---------- hizmetler (sekmeli) ---------- */
function renderServices() {
  const cats = $('[data-service-cats]')
  const panels = $('[data-service-panels]')
  if (!cats || !panels) return

  cats.innerHTML = ''
  panels.innerHTML = ''

  SITE.serviceCategories.forEach((cat, idx) => {
    const isFirst = idx === 0
    const panelId = `svc-panel-${cat.key}`
    const tabId = `svc-tab-${cat.key}`

    // sekme
    const chip = el('button', 'cat-chip')
    chip.type = 'button'
    chip.id = tabId
    chip.setAttribute('role', 'tab')
    chip.setAttribute('aria-selected', isFirst ? 'true' : 'false')
    chip.setAttribute('aria-controls', panelId)
    chip.innerHTML = `<span class="chip-icon" aria-hidden="true">${cat.icon}</span>${cat.name}`
    cats.appendChild(chip)

    // panel
    const panel = el('div', `service-panel${isFirst ? ' is-active' : ''}`)
    panel.id = panelId
    panel.setAttribute('role', 'tabpanel')
    panel.setAttribute('aria-labelledby', tabId)
    if (!isFirst) panel.hidden = true

    panel.appendChild(el('p', 'panel-blurb', cat.blurb))

    const list = el('div', 'service-list')
    cat.services.forEach((svc) => {
      const card = el('article', 'service-card')
      const head = el('div', 'sc-head')
      head.appendChild(el('h3', 'sc-name', svc.name))
      head.appendChild(el('span', 'sc-price', svc.price))
      card.appendChild(head)
      card.appendChild(el('p', 'sc-desc', svc.desc))
      card.appendChild(el('span', 'sc-duration', svc.duration))
      list.appendChild(card)
    })
    panel.appendChild(list)
    panels.appendChild(panel)
  })

  // sekme etkileşimi
  const chips = $$('.cat-chip', cats)
  chips.forEach((chip) => {
    chip.addEventListener('click', () => activateTab(chip, chips, panels))
    chip.addEventListener('keydown', (e) => handleTabKeys(e, chip, chips, panels))
  })
}

function activateTab(chip, chips, panels) {
  chips.forEach((c) => c.setAttribute('aria-selected', 'false'))
  chip.setAttribute('aria-selected', 'true')
  const targetId = chip.getAttribute('aria-controls')
  $$('.service-panel', panels).forEach((p) => {
    const active = p.id === targetId
    p.classList.toggle('is-active', active)
    p.hidden = !active
  })
}

function handleTabKeys(e, chip, chips, panels) {
  const i = chips.indexOf(chip)
  let next = null
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = chips[(i + 1) % chips.length]
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = chips[(i - 1 + chips.length) % chips.length]
  if (next) {
    e.preventDefault()
    activateTab(next, chips, panels)
    next.focus()
  }
}

/* ---------- galeri ---------- */
function renderGallery() {
  const grid = $('[data-gallery]')
  if (!grid) return
  grid.innerHTML = ''

  // havuzdan ilk 8 benzersiz görsel
  const ids = IMAGE_POOL.slice(0, 8)
  ids.forEach((id, i) => {
    const fig = el('figure', 'gallery-item')
    const image = el('img')
    image.src = img(id, { w: 700, h: 500 })
    image.setAttribute('data-full', img(id, { w: 1400 }))
    image.setAttribute('data-lightbox', '')
    image.setAttribute('loading', 'lazy')
    image.setAttribute('width', '700')
    image.setAttribute('height', '500')
    image.alt = `${SITE.brand} galeri görseli ${i + 1}`
    fig.appendChild(image)
    grid.appendChild(fig)
  })
}

/* ---------- hakkımızda görseli + değerler ---------- */
function renderAbout() {
  const aboutImg = $('[data-about-img]')
  if (aboutImg) {
    const id = SITE.images.salon[0] || SITE.images.hero[2]
    aboutImg.src = img(id, { w: 620, h: 720 })
    aboutImg.alt = `${SITE.brand} salon iç mekânı`
  }

  const values = $('[data-values]')
  if (values) {
    values.innerHTML = ''
    SITE.values.forEach((v) => {
      const li = el('li', 'value-card')
      li.appendChild(el('span', 'value-icon', v.icon))
      li.appendChild(el('h3', 'value-title', v.title))
      li.appendChild(el('p', 'value-text', v.text))
      values.appendChild(li)
    })
  }
}

/* ---------- yorumlar ---------- */
function renderTestimonials() {
  const grid = $('[data-testimonials]')
  if (!grid) return
  grid.innerHTML = ''
  SITE.testimonials.forEach((t) => {
    const card = el('article', 'testi-card')
    const starsRow = el('div', 'testi-stars', stars(t.stars))
    starsRow.setAttribute('aria-label', `${t.stars} / 5 yıldız`)
    card.appendChild(starsRow)
    card.appendChild(el('blockquote', 'testi-text', `“${t.text}”`))
    const meta = el('div', 'testi-meta')
    meta.appendChild(el('span', 'testi-name', t.name))
    meta.appendChild(el('span', 'testi-role', t.meta))
    card.appendChild(meta)
    grid.appendChild(card)
  })
}

/* ---------- çalışma saatleri ---------- */
function renderHours() {
  const list = $('[data-hours]')
  if (!list) return
  list.innerHTML = ''
  SITE.hours.forEach((h) => {
    const row = el('li', `hours-row${h.closed ? ' is-closed' : ''}`)
    row.appendChild(el('span', 'hours-day', h.day))
    const val = h.closed ? 'Kapalı' : `${h.open} – ${h.close}`
    row.appendChild(el('span', 'hours-val', val))
    list.appendChild(row)
  })
}

/* ---------- mobil menü ---------- */
function initMobileNav() {
  const toggle = $('#nav-toggle')
  const drawer = $('#mobile-nav')
  if (!toggle || !drawer) return

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç')
    drawer.hidden = !open
  }

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true')
  })

  drawer.addEventListener('click', (e) => {
    const link = e.target.closest('a')
    if (link) setOpen(false)
  })

  // ESC ile kapat
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false)
  })
}

/* ---------- header gölge (scroll) ---------- */
function initHeaderScroll() {
  const header = $('#site-header')
  if (!header) return
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

/* ---------- başlat ---------- */
function init() {
  renderMeta()
  renderContactLinks()
  renderNav()
  renderHero()
  renderServices()
  renderGallery()
  renderAbout()
  renderTestimonials()
  renderHours()
  initMobileNav()
  initHeaderScroll()
  initReveal()
  initLightbox('[data-lightbox]')
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
