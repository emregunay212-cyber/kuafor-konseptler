/**
 * Aura Beauty — Tema 01 "Rose Atelier"
 * Tüm dinamik içerik TEK kaynaktan (content.js) okunur ve DOM'a basılır.
 */
import { SITE, img, waUrl, telUrl, mapEmbedUrl, IMAGE_POOL } from '/src/data/content.js'
import { initReveal } from '/src/shared/reveal.js'
import { initLightbox } from '/src/shared/lightbox.js'

/* ---------- Küçük yardımcılar ---------- */
const $ = (sel, root = document) => root.querySelector(sel)
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))

/** Güvenli textContent ataması (null-guard). */
function setText(sel, value) {
  $$(sel).forEach((el) => {
    el.textContent = value
  })
}

/** stars sayısından yıldız dizisi (erişilebilir etiketle). */
function starString(count) {
  const n = Math.max(0, Math.min(5, Number(count) || 0))
  return '★'.repeat(n) + '☆'.repeat(5 - n)
}

/* ---------- Belge başlığı & marka ---------- */
function initBrand() {
  document.title = `${SITE.brand} — ${SITE.brandTagline}`
  setText('[data-brand]', SITE.brand)
  setText('[data-brand-mark]', (SITE.brandShort || SITE.brand || '').trim().charAt(0).toUpperCase())
  setText('[data-tagline]', SITE.brandTagline)
  setText('[data-slogan]', SITE.slogan)
  setText('[data-intro]', SITE.intro)
  setText('[data-about]', SITE.about)
  setText('[data-hours-summary]', SITE.hoursSummary)

  const brandLink = $('.brand')
  if (brandLink) brandLink.setAttribute('aria-label', `${SITE.brand} ana sayfa`)

  const meta = $('meta[name="description"]')
  if (meta) meta.setAttribute('content', `${SITE.brand} — ${SITE.brandTagline}. ${SITE.intro}`)
}

/* ---------- Navigasyon ---------- */
function buildNav() {
  const desktop = $('[data-nav]')
  const mobile = $('[data-mobile-nav]')
  const footer = $('[data-footer-nav]')

  SITE.nav.forEach((item) => {
    if (desktop) {
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.href = item.href
      a.textContent = item.label
      li.appendChild(a)
      desktop.appendChild(li)
    }
    if (mobile) {
      const a = document.createElement('a')
      a.href = item.href
      a.textContent = item.label
      a.setAttribute('data-mobile-link', '')
      mobile.appendChild(a)
    }
    if (footer) {
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.href = item.href
      a.textContent = item.label
      li.appendChild(a)
      footer.appendChild(li)
    }
  })
}

/* ---------- CTA linkleri ---------- */
function initCtas() {
  const appointmentUrl = waUrl(`Merhaba! ${SITE.brand}'den randevu almak istiyorum.`)
  const whatsappUrl = waUrl()

  const map = {
    '[data-cta-header]': { href: appointmentUrl, label: SITE.ctaPrimary.label },
    '[data-cta-mobile]': { href: appointmentUrl, label: SITE.ctaPrimary.label },
    '[data-cta-primary]': { href: appointmentUrl, label: SITE.ctaPrimary.label },
    '[data-cta-whatsapp]': { href: whatsappUrl, label: SITE.ctaSecondary.label },
    '[data-cta-contact]': { href: appointmentUrl, label: null },
  }

  Object.entries(map).forEach(([sel, cfg]) => {
    $$(sel).forEach((el) => {
      el.href = cfg.href
      if (cfg.label) el.textContent = cfg.label
    })
  })
}

/* ---------- Hero görseli & rozet ---------- */
function initHeroVisual() {
  const heroImg = $('[data-hero-img]')
  if (heroImg) {
    heroImg.src = img(SITE.images.hero[0], { w: 760, h: 980, q: 80 })
    heroImg.alt = `${SITE.brand} stüdyosundan zarif bir portre`
    heroImg.loading = 'eager'
    heroImg.setAttribute('fetchpriority', 'high')
  }

  // Rozet: yıl deneyimi istatistiğinden değer çek (varsa).
  const yearsStat = SITE.stats.find((s) => /yıl/i.test(s.label))
  const badge = $('[data-badge-years]')
  if (badge) badge.textContent = yearsStat ? yearsStat.value : SITE.stats[0].value
}

/* ---------- İstatistik şeridi ---------- */
function buildStats() {
  const wrap = $('[data-stats]')
  if (!wrap) return
  wrap.innerHTML = ''
  SITE.stats.forEach((stat) => {
    const li = document.createElement('li')
    li.className = 'stat'
    li.innerHTML = `<span class="stat-value"></span><span class="stat-label"></span>`
    li.querySelector('.stat-value').textContent = stat.value
    li.querySelector('.stat-label').textContent = stat.label
    wrap.appendChild(li)
  })
}

/* ---------- Hizmetler ---------- */
function buildServices() {
  const wrap = $('[data-services]')
  if (!wrap) return
  wrap.innerHTML = ''

  SITE.serviceCategories.forEach((cat, i) => {
    const card = document.createElement('article')
    card.className = 'service-card'
    card.setAttribute('data-reveal', '')
    card.style.setProperty('--reveal-delay', `${(i % 3) * 90}ms`)

    const head = document.createElement('div')
    head.className = 'service-cat-head'
    head.innerHTML = `
      <span class="service-icon" aria-hidden="true"></span>
      <span>
        <span class="service-cat-name"></span>
        <span class="service-cat-blurb"></span>
      </span>`
    head.querySelector('.service-icon').textContent = cat.icon
    head.querySelector('.service-cat-name').textContent = cat.name
    head.querySelector('.service-cat-blurb').textContent = cat.blurb
    card.appendChild(head)

    const list = document.createElement('div')
    list.className = 'service-items'
    cat.services.forEach((svc) => {
      const item = document.createElement('div')
      item.className = 'service-item'
      item.innerHTML = `
        <span class="service-name"></span>
        <span class="service-price"></span>
        <span class="service-desc"></span>
        <span class="service-duration"></span>`
      item.querySelector('.service-name').textContent = svc.name
      item.querySelector('.service-price').textContent = svc.price
      item.querySelector('.service-desc').textContent = svc.desc
      item.querySelector('.service-duration').textContent = svc.duration
      list.appendChild(item)
    })
    card.appendChild(list)
    wrap.appendChild(card)
  })
}

/* ---------- Galeri ---------- */
function buildGallery() {
  const wrap = $('[data-gallery]')
  if (!wrap) return
  wrap.innerHTML = ''

  const ids = IMAGE_POOL.slice(0, 9)
  ids.forEach((id, i) => {
    const fig = document.createElement('figure')
    fig.className = 'gallery-item'
    fig.setAttribute('data-reveal', '')
    fig.style.setProperty('--reveal-delay', `${(i % 3) * 80}ms`)

    const image = document.createElement('img')
    image.src = img(id, { w: 700, h: 933, q: 75 })
    image.setAttribute('data-full', img(id, { w: 1400, q: 82 }))
    image.setAttribute('data-lightbox', '')
    image.width = 700
    image.height = 933
    image.loading = 'lazy'
    image.alt = `${SITE.brand} galerisinden çalışma ${i + 1}`

    fig.appendChild(image)
    wrap.appendChild(fig)
  })
}

/* ---------- Hakkımızda görseli & değerler ---------- */
function buildAbout() {
  const aboutImg = $('[data-about-img]')
  if (aboutImg) {
    const id = (SITE.images.salon && SITE.images.salon[0]) || SITE.images.hero[1]
    aboutImg.src = img(id, { w: 680, h: 850, q: 78 })
    aboutImg.alt = `${SITE.brand} salonundan bir an`
  }

  const wrap = $('[data-values]')
  if (!wrap) return
  wrap.innerHTML = ''
  SITE.values.forEach((val, i) => {
    const card = document.createElement('li')
    card.className = 'value-card'
    card.setAttribute('data-reveal', '')
    card.style.setProperty('--reveal-delay', `${(i % 2) * 90}ms`)
    card.innerHTML = `
      <span class="value-icon" aria-hidden="true"></span>
      <h3 class="value-title"></h3>
      <p class="value-text"></p>`
    card.querySelector('.value-icon').textContent = val.icon
    card.querySelector('.value-title').textContent = val.title
    card.querySelector('.value-text').textContent = val.text
    wrap.appendChild(card)
  })
}

/* ---------- Yorumlar ---------- */
function buildTestimonials() {
  const wrap = $('[data-testimonials]')
  if (!wrap) return
  wrap.innerHTML = ''

  SITE.testimonials.forEach((t, i) => {
    const card = document.createElement('article')
    card.className = 'testi-card'
    card.setAttribute('data-reveal', '')
    card.style.setProperty('--reveal-delay', `${(i % 3) * 90}ms`)
    card.innerHTML = `
      <div class="testi-stars" role="img"></div>
      <p class="testi-text"></p>
      <div class="testi-foot">
        <span class="testi-name"></span>
        <span class="testi-meta"></span>
      </div>`
    const stars = card.querySelector('.testi-stars')
    stars.textContent = starString(t.stars)
    stars.setAttribute('aria-label', `${t.stars} / 5 yıldız`)
    card.querySelector('.testi-text').textContent = t.text
    card.querySelector('.testi-name').textContent = t.name
    card.querySelector('.testi-meta').textContent = t.meta
    wrap.appendChild(card)
  })
}

/* ---------- İletişim ---------- */
function buildContact() {
  setText('[data-address]', SITE.address)
  setText('[data-district]', SITE.district)
  setText('[data-city]', SITE.city)

  $$('[data-phone]').forEach((el) => {
    el.textContent = SITE.phoneDisplay
    el.href = telUrl()
  })

  $$('[data-instagram]').forEach((el) => {
    el.textContent = `@${SITE.instagram}`
    el.href = SITE.instagramUrl
  })

  const hours = $('[data-hours]')
  if (hours) {
    hours.innerHTML = ''
    SITE.hours.forEach((h) => {
      const li = document.createElement('li')
      const day = document.createElement('span')
      day.className = 'day'
      day.textContent = h.day
      const time = document.createElement('span')
      if (h.closed) {
        time.className = 'time closed'
        time.textContent = 'Kapalı'
      } else {
        time.className = 'time'
        time.textContent = `${h.open} – ${h.close}`
      }
      li.append(day, time)
      hours.appendChild(li)
    })
  }

  const map = $('[data-map]')
  if (map) {
    map.src = mapEmbedUrl()
    map.title = `${SITE.brand} konum haritası`
  }
}

/* ---------- Footer telif ---------- */
function initFooter() {
  setText('[data-copyright]', `© ${new Date().getFullYear()} ${SITE.brand}. Tüm hakları saklıdır.`)
}

/* ---------- Mobil menü ---------- */
function initMobileMenu() {
  const toggle = $('#navToggle')
  const drawer = $('#mobileNav')
  if (!toggle || !drawer) return

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç')
    drawer.classList.toggle('is-open', open)
    drawer.hidden = !open
  }

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true')
  })

  drawer.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false)
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false)
  })
}

/* ---------- Sticky header gölge ---------- */
function initHeaderScroll() {
  const header = $('#siteHeader')
  if (!header) return
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

/* ---------- Başlat ---------- */
function init() {
  initBrand()
  buildNav()
  initCtas()
  initHeroVisual()
  buildStats()
  buildServices()
  buildGallery()
  buildAbout()
  buildTestimonials()
  buildContact()
  initFooter()
  initMobileMenu()
  initHeaderScroll()

  // İçerik basıldıktan SONRA reveal + lightbox bağla.
  initReveal()
  initLightbox('[data-lightbox]')
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
