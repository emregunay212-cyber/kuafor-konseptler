/**
 * AURA BEAUTY — Tema 08 "Terracotta Boho"
 * Tüm dinamik içerik SITE'tan okunur ve DOM'a basılır.
 */
import { SITE, img, waUrl, telUrl, mapEmbedUrl, IMAGE_POOL } from '/src/data/content.js'
import { initReveal } from '/src/shared/reveal.js'
import { initLightbox } from '/src/shared/lightbox.js'

/* — Yardımcılar — */
const $ = (sel, root = document) => root.querySelector(sel)
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))
const setText = (sel, text) => {
  const el = $(sel)
  if (el) el.textContent = text
}
const el = (tag, attrs = {}, html) => {
  const node = document.createElement(tag)
  Object.entries(attrs).forEach(([k, v]) => {
    if (v === false || v == null) return
    if (k === 'class') node.className = v
    else node.setAttribute(k, v === true ? '' : String(v))
  })
  if (html != null) node.innerHTML = html
  return node
}
const initials = (name) =>
  String(name || '')
    .trim()
    .charAt(0)
    .toUpperCase() || 'A'

/* — Başlık / marka — */
function initMeta() {
  document.title = `${SITE.brand} — ${SITE.brandTagline}`
  const desc = document.querySelector('meta[name="description"]')
  if (desc) desc.setAttribute('content', `${SITE.brand} — ${SITE.brandTagline}. ${SITE.intro}`)
  $$('[data-brand]').forEach((n) => (n.textContent = SITE.brand))
  $$('[data-brand-mark]').forEach((n) => (n.textContent = initials(SITE.brand)))
  const home = $('[data-brand-home]')
  if (home) home.setAttribute('aria-label', `${SITE.brand} ana sayfa`)
  setText('[data-tagline]', SITE.brandTagline)
  setText('[data-slogan]', SITE.slogan)
  setText('[data-intro]', SITE.intro)
  setText('[data-about]', SITE.about)
  setText('[data-footer-tagline]', SITE.intro)
}

/* — Navigasyon — */
function buildNav() {
  const desktop = $('[data-nav]')
  const mobile = $('[data-mobile-nav]')
  const footer = $('[data-footer-nav]')
  SITE.nav.forEach((item) => {
    if (desktop) desktop.appendChild(el('li', {}, `<a href="${item.href}">${item.label}</a>`))
    if (mobile) mobile.appendChild(el('li', {}, `<a href="${item.href}">${item.label}</a>`))
    if (footer) footer.appendChild(el('li', {}, `<a href="${item.href}">${item.label}</a>`))
  })
}

/* — CTA linkleri — */
function buildCtas() {
  const appUrl = waUrl(`Merhaba ${SITE.brand}, randevu almak istiyorum.`)
  $$('[data-cta-appointment]').forEach((a) => {
    a.href = appUrl
    a.textContent = SITE.ctaPrimary.label
  })
  const wa = $('[data-cta-whatsapp]')
  if (wa) wa.href = waUrl()
  setText('[data-cta-whatsapp-label]', SITE.ctaSecondary.label)
}

/* — Hero görselleri & istatistikler — */
function buildHero() {
  const a1 = $('[data-hero-arch]')
  const a2 = $('[data-hero-arch-2]')
  if (a1) {
    a1.appendChild(
      el('img', {
        src: img(SITE.images.hero[0], { w: 900, h: 1100, q: 80 }),
        alt: `${SITE.brand} salonundan portre`,
        width: 900,
        height: 1100,
        fetchpriority: 'high',
      })
    )
  }
  if (a2) {
    a2.appendChild(
      el('img', {
        src: img(SITE.images.hero[2], { w: 600, h: 800, q: 80 }),
        alt: 'Güzellik bakımı detayı',
        width: 600,
        height: 800,
        loading: 'lazy',
      })
    )
  }
  const stat0 = SITE.stats[0]
  if (stat0) {
    setText('[data-hero-badge-num]', stat0.value)
    setText('[data-hero-badge-text]', stat0.label)
  }

  const stats = $('[data-stats]')
  if (stats) {
    SITE.stats.forEach((s) => {
      stats.appendChild(
        el(
          'li',
          {},
          `<span class="stat-value">${s.value}</span><span class="stat-label">${s.label}</span>`
        )
      )
    })
  }
}

/* — Hizmetler (sekmeli) — */
function buildServices() {
  const tabs = $('[data-service-tabs]')
  const panels = $('[data-service-panels]')
  if (!tabs || !panels) return

  SITE.serviceCategories.forEach((cat, i) => {
    const tabId = `tab-${cat.key}`
    const panelId = `panel-${cat.key}`
    const active = i === 0

    const tab = el(
      'button',
      {
        class: 'service-tab',
        id: tabId,
        role: 'tab',
        type: 'button',
        'aria-selected': active ? 'true' : 'false',
        'aria-controls': panelId,
        tabindex: active ? '0' : '-1',
      },
      `<span class="tab-ic" aria-hidden="true">${cat.icon}</span><span>${cat.name}</span>`
    )
    tabs.appendChild(tab)

    const panel = el('div', {
      class: `service-panel${active ? ' is-active' : ''}`,
      id: panelId,
      role: 'tabpanel',
      'aria-labelledby': tabId,
      tabindex: '0',
    })
    panel.hidden = !active
    panel.appendChild(el('p', { class: 'panel-blurb' }, cat.blurb))

    const cards = el('div', { class: 'service-cards' })
    cat.services.forEach((svc) => {
      cards.appendChild(
        el(
          'article',
          { class: 'service-card', 'data-reveal': true },
          `<h3>${svc.name}</h3>
           <p class="desc">${svc.desc}</p>
           <div class="service-meta">
             <span class="service-price">${svc.price}</span>
             <span class="service-duration">${svc.duration}</span>
           </div>`
        )
      )
    })
    panel.appendChild(cards)
    panels.appendChild(panel)
  })

  const tabEls = $$('.service-tab', tabs)
  const panelEls = $$('.service-panel', panels)

  const activate = (idx) => {
    tabEls.forEach((t, i) => {
      const on = i === idx
      t.setAttribute('aria-selected', on ? 'true' : 'false')
      t.setAttribute('tabindex', on ? '0' : '-1')
    })
    panelEls.forEach((p, i) => {
      const on = i === idx
      p.classList.toggle('is-active', on)
      p.hidden = !on
    })
  }

  tabEls.forEach((tab, idx) => {
    tab.addEventListener('click', () => activate(idx))
    tab.addEventListener('keydown', (e) => {
      let next = null
      if (e.key === 'ArrowRight') next = (idx + 1) % tabEls.length
      else if (e.key === 'ArrowLeft') next = (idx - 1 + tabEls.length) % tabEls.length
      else if (e.key === 'Home') next = 0
      else if (e.key === 'End') next = tabEls.length - 1
      if (next != null) {
        e.preventDefault()
        activate(next)
        tabEls[next].focus()
      }
    })
  })
}

/* — Galeri — */
function buildGallery() {
  const grid = $('[data-gallery]')
  if (!grid) return
  const ids = IMAGE_POOL.slice(0, 8)
  ids.forEach((id, i) => {
    const big = i === 0 || i === 4
    const w = big ? 900 : 700
    const h = big ? 900 : 600
    const fig = el('button', {
      class: 'gallery-item',
      type: 'button',
      'aria-label': 'Galeri görselini büyüt',
    })
    fig.appendChild(
      el('img', {
        src: img(id, { w, h, q: 72 }),
        'data-full': img(id, { w: 1400, q: 82 }),
        'data-lightbox': true,
        alt: `${SITE.brand} galeri görseli ${i + 1}`,
        width: w,
        height: h,
        loading: 'lazy',
      })
    )
    grid.appendChild(fig)
  })
}

/* — Hakkımızda görseli & değerler — */
function buildAbout() {
  const arch = $('[data-about-arch]')
  if (arch) {
    arch.appendChild(
      el('img', {
        src: img(SITE.images.salon[0], { w: 800, h: 1000, q: 80 }),
        alt: `${SITE.brand} salon iç mekan`,
        width: 800,
        height: 1000,
        loading: 'lazy',
      })
    )
  }
  const values = $('[data-values]')
  if (values) {
    SITE.values.forEach((v) => {
      values.appendChild(
        el(
          'li',
          { class: 'value-card' },
          `<span class="value-ic" aria-hidden="true">${v.icon}</span>
           <h3>${v.title}</h3>
           <p>${v.text}</p>`
        )
      )
    })
  }
}

/* — Yorumlar — */
function buildTestimonials() {
  const grid = $('[data-testimonials]')
  if (!grid) return
  SITE.testimonials.forEach((t) => {
    const stars = '★'.repeat(t.stars) + '☆'.repeat(Math.max(0, 5 - t.stars))
    grid.appendChild(
      el(
        'figure',
        { class: 'testimonial-card', 'data-reveal': true },
        `<div class="stars" aria-label="${t.stars} / 5 yıldız">${stars}</div>
         <blockquote class="testimonial-text">${t.text}</blockquote>
         <figcaption class="testimonial-foot">
           <span class="testimonial-avatar" aria-hidden="true">${initials(t.name)}</span>
           <span>
             <span class="testimonial-name">${t.name}</span><br />
             <span class="testimonial-meta">${t.meta}</span>
           </span>
         </figcaption>`
      )
    )
  })
}

/* — İletişim — */
function buildContact() {
  setText('[data-address]', SITE.address)

  const phone = $('[data-phone]')
  if (phone) {
    phone.href = telUrl()
    phone.textContent = SITE.phoneDisplay
  }
  const wa = $('[data-whatsapp]')
  if (wa) wa.href = waUrl()

  const ig = $('[data-instagram]')
  if (ig) {
    ig.href = SITE.instagramUrl
    ig.textContent = `@${SITE.instagram}`
  }

  const hours = $('[data-hours]')
  if (hours) {
    SITE.hours.forEach((h) => {
      const time = h.closed ? 'Kapalı' : `${h.open} – ${h.close}`
      hours.appendChild(
        el(
          'li',
          {},
          `<span class="hours-day">${h.day}</span>
           <span class="hours-time${h.closed ? ' closed' : ''}">${time}</span>`
        )
      )
    })
  }

  const map = $('[data-map]')
  if (map) {
    map.src = mapEmbedUrl()
    map.setAttribute('title', `${SITE.brand} konum haritası`)
  }
}

/* — Footer sosyal & telif — */
function buildFooter() {
  const ig = $('[data-footer-instagram]')
  if (ig) {
    ig.href = SITE.instagramUrl
    ig.textContent = `Instagram @${SITE.instagram}`
  }
  const wa = $('[data-footer-whatsapp]')
  if (wa) wa.href = waUrl()
  setText('[data-copyright]', `© ${new Date().getFullYear()} ${SITE.brand}. Tüm hakları saklıdır.`)
}

/* — Mobil menü — */
function initMobileNav() {
  const toggle = $('.nav-toggle')
  const drawer = $('#mobile-nav')
  if (!toggle || !drawer) return

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
    toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç')
    drawer.hidden = !open
    drawer.classList.toggle('is-open', open)
  }

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true')
  })
  drawer.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false)
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false)
      toggle.focus()
    }
  })
}

/* — Header scroll gölgesi — */
function initHeaderScroll() {
  const header = $('#site-header')
  if (!header) return
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

/* — Başlat — */
function init() {
  initMeta()
  buildNav()
  buildCtas()
  buildHero()
  buildServices()
  buildGallery()
  buildAbout()
  buildTestimonials()
  buildContact()
  buildFooter()
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
