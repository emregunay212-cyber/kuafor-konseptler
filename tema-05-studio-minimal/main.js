/**
 * AURA BEAUTY — Tema 05 "Studio Minimal"
 * Tüm dinamik içerik TEK kaynaktan (content.js) okunup DOM'a basılır.
 */
import { SITE, img, waUrl, telUrl, mapEmbedUrl, IMAGE_POOL } from '/src/data/content.js'
import { initReveal } from '/src/shared/reveal.js'
import { initLightbox } from '/src/shared/lightbox.js'

/* ---------- Küçük yardımcılar ---------- */
const $ = (sel, root = document) => root.querySelector(sel)
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))

/** Güvenli metin atama (null-guard'lı, tüm eşleşmelere). */
function setText(sel, value) {
  $$(sel).forEach((el) => {
    el.textContent = value
  })
}

/** Güvenli attribute atama (tüm eşleşmelere). */
function setAttr(sel, attr, value) {
  $$(sel).forEach((el) => {
    el.setAttribute(attr, value)
  })
}

const el = (tag, className, html) => {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (html != null) node.innerHTML = html
  return node
}

const stars = (n) => '★'.repeat(n) + '☆'.repeat(Math.max(0, 5 - n))

/* ---------- Başlık & marka ---------- */
document.title = SITE.brand

function renderBrand() {
  setText('[data-brand]', SITE.brand)
  setText('[data-brand-tagline]', SITE.brandTagline)
  setText('[data-intro]', SITE.intro)
  setText('[data-about]', SITE.about)
  setText('[data-slogan]', SITE.slogan)

  // Hero başlığı: slogan'ı zarif iki parçaya böl (son kelime aksanlı)
  const heroTitle = $('#hero-heading')
  if (heroTitle) {
    const words = SITE.slogan.trim().split(/\s+/)
    const last = words.pop()
    heroTitle.innerHTML = `${words.join(' ')} <span class="accent">${last}</span>`
  }
}

/* ---------- Navigasyon ---------- */
function renderNav() {
  const mobile = $('[data-nav-mobile]')

  // Header + footer ikisi de [data-nav] kullanıyor -> tüm eşleşmeleri doldur
  $$('[data-nav]').forEach((list) => {
    list.innerHTML = ''
    SITE.nav.forEach((item) => {
      const li = el('li')
      const a = el('a', null, item.label)
      a.href = item.href
      li.appendChild(a)
      list.appendChild(li)
    })
  })

  if (mobile) {
    mobile.innerHTML = ''
    SITE.nav.forEach((item) => {
      const li = el('li')
      const a = el('a', null, item.label)
      a.href = item.href
      a.addEventListener('click', closeMobileNav)
      li.appendChild(a)
      mobile.appendChild(li)
    })
  }
}

/* ---------- CTA linkleri ---------- */
function renderCtas() {
  const randevuMsg = `Merhaba! ${SITE.brand} için randevu almak istiyorum.`
  const waMsg = `Merhaba! ${SITE.brand} hakkında bilgi almak istiyorum.`

  setAttr('[data-cta-primary]', 'href', waUrl(randevuMsg))
  setText('[data-cta-primary]', SITE.ctaPrimary.label)

  setAttr('[data-cta-randevu]', 'href', waUrl(randevuMsg))
  setText('[data-cta-randevu]', SITE.ctaPrimary.label)

  setAttr('[data-cta-whatsapp]', 'href', waUrl(waMsg))
  setText('[data-cta-whatsapp]', SITE.ctaSecondary.label)
}

/* ---------- Hero görsel + istatistikler ---------- */
function renderHero() {
  const heroImg = $('.hero-img')
  if (heroImg) {
    const id = SITE.images.hero[0]
    heroImg.src = img(id, { w: 1000, h: 1250, q: 80 })
    heroImg.width = 1000
    heroImg.height = 1250
    heroImg.loading = 'eager'
    heroImg.fetchPriority = 'high'
    heroImg.alt = `${SITE.brand} salonundan bir an`
  }

  const statsBox = $('[data-stats]')
  if (statsBox) {
    statsBox.innerHTML = ''
    SITE.stats.forEach((s) => {
      const group = el('div')
      group.appendChild(el('dd', null, s.value))
      group.appendChild(el('dt', null, s.label))
      statsBox.appendChild(group)
    })
  }
}

/* ---------- Hizmetler ---------- */
function renderServices() {
  const wrap = $('[data-services]')
  if (!wrap) return
  wrap.innerHTML = ''

  SITE.serviceCategories.forEach((cat, i) => {
    const block = el('div', 'service-cat')
    block.setAttribute('data-reveal', '')
    if (i > 0) block.style.setProperty('--reveal-delay', '60ms')

    const head = el('div', 'cat-head')
    head.innerHTML = `
      <span class="cat-icon" aria-hidden="true">${cat.icon}</span>
      <h3 class="cat-name">${cat.name}</h3>
      <p class="cat-blurb">${cat.blurb}</p>`

    const list = el('div', 'cat-services')
    cat.services.forEach((s) => {
      const item = el('div', 'service-item')
      item.innerHTML = `
        <span class="service-name">${s.name}</span>
        <span class="service-price">${s.price}</span>
        <p class="service-desc">${s.desc}</p>
        <span class="service-duration">${s.duration}</span>`
      list.appendChild(item)
    })

    block.append(head, list)
    wrap.appendChild(block)
  })
}

/* ---------- Galeri ---------- */
function renderGallery() {
  const grid = $('[data-gallery]')
  if (!grid) return
  grid.innerHTML = ''

  // Hero'da kullanılan portre (IMAGE_POOL[0]) galeride tekrar etmesin —
  // tek güçlü hero görseli benzersiz kalsın.
  const heroId = SITE.images.hero[0]
  const ids = IMAGE_POOL.filter((id) => id !== heroId).slice(0, 9)
  ids.forEach((id, i) => {
    const fig = el('figure', 'gallery-item')
    fig.setAttribute('data-reveal', '')
    fig.style.setProperty('--reveal-delay', `${(i % 3) * 70}ms`)

    const image = el('img')
    image.src = img(id, { w: 700, h: 700, q: 75 })
    image.setAttribute('data-full', img(id, { w: 1400, q: 85 }))
    image.setAttribute('data-lightbox', '')
    image.width = 700
    image.height = 700
    image.loading = 'lazy'
    image.alt = `${SITE.brand} galeri görseli ${i + 1}`

    fig.appendChild(image)
    grid.appendChild(fig)
  })

  initLightbox('[data-lightbox]')
}

/* ---------- Hakkımızda ---------- */
function renderAbout() {
  const aboutImg = $('.about-img')
  if (aboutImg) {
    const id = SITE.images.salon[0] || SITE.images.hero[1]
    aboutImg.src = img(id, { w: 760, h: 1010, q: 80 })
    aboutImg.width = 760
    aboutImg.height = 1010
    aboutImg.loading = 'lazy'
    aboutImg.alt = `${SITE.brand} salon iç mekânı`
  }

  const vals = $('[data-values]')
  if (vals) {
    vals.innerHTML = ''
    SITE.values.forEach((v) => {
      const li = el('li', 'value-card')
      li.innerHTML = `
        <span class="value-icon" aria-hidden="true">${v.icon}</span>
        <h4 class="value-title">${v.title}</h4>
        <p class="value-text">${v.text}</p>`
      vals.appendChild(li)
    })
  }
}

/* ---------- Yorumlar ---------- */
function renderTestimonials() {
  const grid = $('[data-testimonials]')
  if (!grid) return
  grid.innerHTML = ''

  SITE.testimonials.forEach((t, i) => {
    const card = el('article', 'testimonial')
    card.setAttribute('data-reveal', '')
    card.style.setProperty('--reveal-delay', `${(i % 2) * 80}ms`)
    card.innerHTML = `
      <div class="t-stars" aria-label="${t.stars} / 5 yıldız">${stars(t.stars)}</div>
      <p class="t-text">${t.text}</p>
      <footer class="t-foot">
        <span class="t-name">${t.name}</span>
        <span class="t-meta">${t.meta}</span>
      </footer>`
    grid.appendChild(card)
  })
}

/* ---------- İletişim ---------- */
function renderContact() {
  setText('[data-address]', SITE.address)

  setText('[data-phone]', SITE.phoneDisplay)
  setAttr('[data-phone]', 'href', telUrl())

  setAttr('[data-whatsapp]', 'href', waUrl())

  setText('[data-instagram]', `@${SITE.instagram}`)
  setAttr('[data-instagram]', 'href', SITE.instagramUrl)

  setText('[data-hours-summary]', SITE.hoursSummary)

  $$('[data-hours]').forEach((list) => {
    list.innerHTML = ''
    SITE.hours.forEach((h) => {
      const li = el('li', `hours-row${h.closed ? ' is-closed' : ''}`)
      const time = h.closed ? 'Kapalı' : `${h.open} – ${h.close}`
      li.innerHTML = `<span class="hours-day">${h.day}</span><span class="hours-time">${time}</span>`
      list.appendChild(li)
    })
  })

  const map = $('.map-frame')
  if (map) map.src = mapEmbedUrl()
}

/* ---------- Footer ---------- */
function renderFooter() {
  setText('[data-copyright]', `© ${new Date().getFullYear()} ${SITE.brand}`)
}

/* ---------- Mobil menü davranışı ---------- */
const toggle = $('.nav-toggle')
const mobileNav = $('#mobile-nav')

function openMobileNav() {
  if (!toggle || !mobileNav) return
  mobileNav.hidden = false
  toggle.setAttribute('aria-expanded', 'true')
  toggle.setAttribute('aria-label', 'Menüyü kapat')
}
function closeMobileNav() {
  if (!toggle || !mobileNav) return
  mobileNav.hidden = true
  toggle.setAttribute('aria-expanded', 'false')
  toggle.setAttribute('aria-label', 'Menüyü aç')
}
function initMobileNav() {
  if (!toggle) return
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true'
    open ? closeMobileNav() : openMobileNav()
  })
  // Geniş ekrana geçince menüyü kapat
  window.matchMedia('(min-width: 881px)').addEventListener('change', (e) => {
    if (e.matches) closeMobileNav()
  })
}

/* ---------- Header gölge/çizgi (scroll) ---------- */
function initHeaderScroll() {
  const header = $('#site-header')
  if (!header) return
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

/* ---------- Başlat ---------- */
function init() {
  renderBrand()
  renderNav()
  renderCtas()
  renderHero()
  renderServices()
  renderGallery()
  renderAbout()
  renderTestimonials()
  renderContact()
  renderFooter()

  initMobileNav()
  initHeaderScroll()
  initReveal()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
