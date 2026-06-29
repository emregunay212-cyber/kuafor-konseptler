/**
 * AURA BEAUTY — Tema 04 "Editorial"
 * Tüm dinamik içerik TEK kaynaktan (content.js) okunur ve DOM'a basılır.
 */
import { SITE, img, waUrl, telUrl, mapEmbedUrl, IMAGE_POOL } from '/src/data/content.js'
import { initReveal } from '/src/shared/reveal.js'
import { initLightbox } from '/src/shared/lightbox.js'

/* ---------- Küçük yardımcılar ---------- */
const $ = (sel, root = document) => root.querySelector(sel)
const el = (tag, attrs = {}, html = '') => {
  const node = document.createElement(tag)
  Object.entries(attrs).forEach(([k, v]) => {
    if (v == null) return
    if (k === 'class') node.className = v
    else node.setAttribute(k, v)
  })
  if (html) node.innerHTML = html
  return node
}
const setText = (sel, text) => {
  const node = $(sel)
  if (node) node.textContent = text
}
const setAttr = (sel, attr, val) => {
  const node = $(sel)
  if (node) node.setAttribute(attr, val)
}

/* ---------- Sayfa başlığı & marka ---------- */
function initBrand() {
  document.title = `${SITE.brand} — ${SITE.brandTagline}`
  setText('#logoWord', SITE.brand)
  setText('#footerBrand', SITE.brand)
  setText('#heroEyebrow', SITE.brandTagline)
  setText('#footerTag', SITE.intro)
}

/* ---------- Ticker (üst marquee) ---------- */
function initTicker() {
  const track = $('#ticker')
  if (!track) return
  const words = [
    SITE.slogan,
    SITE.brandTagline,
    `${SITE.city} · ${SITE.district}`,
    SITE.hoursSummary,
    'Randevu · WhatsApp',
  ]
  // İki kopya: kusursuz döngü için (-50% translate)
  const buildSpan = () => {
    const s = el('span')
    s.textContent = words.join('   ✦   ')
    return s
  }
  track.append(buildSpan(), buildSpan())
}

/* ---------- Navigasyon ---------- */
function initNav() {
  const navList = $('#navList')
  const mobileList = $('#mobileNavList')
  const footerNav = $('#footerNav')

  SITE.nav.forEach((item) => {
    if (navList) navList.append(el('li', {}, `<a href="${item.href}">${item.label}</a>`))
    if (mobileList) mobileList.append(el('li', {}, `<a href="${item.href}">${item.label}</a>`))
    if (footerNav) footerNav.append(el('li', {}, `<a href="${item.href}">${item.label}</a>`))
  })

  // CTA linkleri
  const wa = waUrl()
  setAttr('#headerCta', 'href', wa)
  setText('#headerCta', SITE.ctaPrimary.label)
  setAttr('#mobileCta', 'href', wa)
  setText('#mobileCta', SITE.ctaPrimary.label)
}

/* ---------- Hamburger / mobil menü ---------- */
function initMobileMenu() {
  const burger = $('#hamburger')
  const menu = $('#mobileNav')
  if (!burger || !menu) return

  const setOpen = (open) => {
    burger.classList.toggle('is-active', open)
    menu.classList.toggle('is-open', open)
    burger.setAttribute('aria-expanded', String(open))
    burger.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç')
    menu.setAttribute('aria-hidden', String(!open))
  }

  burger.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')))
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)))
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false)
  })
}

/* ---------- Header gölge (scroll) ---------- */
function initHeaderScroll() {
  const header = $('#siteHeader')
  if (!header) return
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

/* ---------- Hero ---------- */
function initHero() {
  setText('#heroIntro', SITE.intro)

  const heroImage = $('#heroImg')
  if (heroImage) {
    const heroId = SITE.images.hero[0]
    heroImage.src = img(heroId, { w: 1100, h: 1360, q: 80 })
    heroImage.setAttribute('fetchpriority', 'high')
    heroImage.setAttribute('loading', 'eager')
  }

  // Stats şeridi
  const statsEl = $('#stats')
  if (statsEl) {
    SITE.stats.forEach((s) => {
      statsEl.append(
        el(
          'li',
          {},
          `<span class="stats__value">${s.value}</span><span class="stats__label">${s.label}</span>`
        )
      )
    })
  }

  // CTA'lar
  setAttr('#heroCtaPrimary', 'href', waUrl())
  setText('#heroCtaPrimary', SITE.ctaPrimary.label)
  setAttr(
    '#heroCtaWa',
    'href',
    waUrl(`Merhaba! ${SITE.brand} için randevu oluşturmak istiyorum.`)
  )
  setText('#heroCtaWa', SITE.ctaSecondary.label)
}

/* ---------- Hizmetler ---------- */
function initServices() {
  const list = $('#servicesList')
  if (!list) return

  SITE.serviceCategories.forEach((cat) => {
    const cardEl = el('article', { class: 'svc-cat', 'data-reveal': '' })

    const head = el('div', { class: 'svc-cat__head' })
    head.append(
      el('span', { class: 'svc-cat__icon', 'aria-hidden': 'true' }, cat.icon),
      el(
        'div',
        {},
        `<h3 class="svc-cat__name">${cat.name}</h3><p class="svc-cat__blurb">${cat.blurb}</p>`
      )
    )

    const items = el('div', { class: 'svc-items' })
    cat.services.forEach((svc) => {
      items.append(
        el(
          'div',
          { class: 'svc-item' },
          `<span class="svc-item__name">${svc.name}</span>` +
            `<span class="svc-item__price">${svc.price}</span>` +
            `<p class="svc-item__desc">${svc.desc} <span class="svc-item__dur">· ${svc.duration}</span></p>`
        )
      )
    })

    cardEl.append(head, items)
    list.append(cardEl)
  })
}

/* ---------- Galeri ---------- */
function initGallery() {
  const grid = $('#galleryGrid')
  if (!grid) return

  // Çeşitlilik için kategori bazlı seçim; tekrarsız 8 görsel
  const picks = [
    SITE.images.sac[0],
    SITE.images.makyaj[0],
    SITE.images.cilt[0],
    SITE.images.tirnak[0],
    SITE.images.sac[1],
    SITE.images.salon[0],
    SITE.images.makyaj[1],
    SITE.images.cilt[1],
  ].filter(Boolean)

  const ids = picks.length >= 6 ? picks : IMAGE_POOL.slice(0, 8)
  // Editöryel grid kırma: belirli indeksleri büyüt
  const modifier = { 0: 'gallery__item--tall', 3: 'gallery__item--wide' }

  ids.forEach((id, i) => {
    const figure = el('figure', { class: `gallery__item ${modifier[i] || ''}`.trim() })
    const tall = modifier[i] === 'gallery__item--tall'
    const wide = modifier[i] === 'gallery__item--wide'
    const w = wide ? 1000 : 760
    const h = tall ? 1100 : wide ? 560 : 760

    const image = el('img', {
      src: img(id, { w, h, q: 72 }),
      'data-lightbox': '',
      'data-full': img(id, { w: 1500, q: 82 }),
      loading: 'lazy',
      width: String(w),
      height: String(h),
      alt: `${SITE.brand} galeri görseli ${i + 1}`,
    })
    const num = el('span', { class: 'gallery__num', 'aria-hidden': 'true' }, `№${String(i + 1).padStart(2, '0')}`)
    figure.append(image, num)
    grid.append(figure)
  })
}

/* ---------- Hakkımızda ---------- */
function initAbout() {
  setText('#aboutText', SITE.about)

  const aboutImage = $('#aboutImg')
  if (aboutImage) {
    const id = SITE.images.salon[1] || SITE.images.salon[0] || SITE.images.hero[1]
    aboutImage.src = img(id, { w: 880, h: 1070, q: 78 })
  }

  const values = $('#valuesList')
  if (values) {
    SITE.values.forEach((v) => {
      values.append(
        el(
          'li',
          { class: 'value' },
          `<span class="value__icon" aria-hidden="true">${v.icon}</span>` +
            `<h3 class="value__title">${v.title}</h3>` +
            `<p class="value__text">${v.text}</p>`
        )
      )
    })
  }
}

/* ---------- Yorumlar ---------- */
function initReviews() {
  const grid = $('#reviewsGrid')
  if (!grid) return

  SITE.testimonials.forEach((t) => {
    const stars = '★'.repeat(t.stars) + '☆'.repeat(Math.max(0, 5 - t.stars))
    grid.append(
      el(
        'blockquote',
        { class: 'review', 'data-reveal': '' },
        `<div class="review__stars" aria-label="${t.stars} / 5 yıldız">${stars}</div>` +
          `<p class="review__text">“${t.text}”</p>` +
          `<footer><div class="review__name">${t.name}</div>` +
          `<div class="review__meta">${t.meta}</div></footer>`
      )
    )
  })
}

/* ---------- İletişim ---------- */
function initContact() {
  const lines = $('#contactLines')
  if (lines) {
    lines.append(
      el('li', {}, `<span class="lbl">Adres</span><span>${SITE.address}, ${SITE.city}</span>`)
    )
    lines.append(
      el(
        'li',
        {},
        `<span class="lbl">Telefon</span><a href="${telUrl()}">${SITE.phoneDisplay}</a>`
      )
    )
    lines.append(
      el(
        'li',
        {},
        `<span class="lbl">WhatsApp</span><a href="${waUrl()}" target="_blank" rel="noopener">Mesaj gönder</a>`
      )
    )
    lines.append(
      el(
        'li',
        {},
        `<span class="lbl">Instagram</span><a href="${SITE.instagramUrl}" target="_blank" rel="noopener">@${SITE.instagram}</a>`
      )
    )
  }

  const hours = $('#hoursList')
  if (hours) {
    SITE.hours.forEach((h) => {
      const value = h.closed
        ? '<span class="closed">Kapalı</span>'
        : `<span>${h.open} – ${h.close}</span>`
      hours.append(el('li', {}, `<span class="day">${h.day}</span>${value}`))
    })
  }

  setAttr('#mapFrame', 'src', mapEmbedUrl())
}

/* ---------- Footer ---------- */
function initFooter() {
  const social = $('#footerSocial')
  if (social) {
    social.append(
      el('a', { href: SITE.instagramUrl, target: '_blank', rel: 'noopener' }, 'Instagram')
    )
    social.append(el('a', { href: waUrl(), target: '_blank', rel: 'noopener' }, 'WhatsApp'))
  }
  setText('#copyright', `© ${new Date().getFullYear()} ${SITE.brand}. Tüm hakları saklıdır.`)
}

/* ---------- Başlat ---------- */
function init() {
  initBrand()
  initTicker()
  initNav()
  initMobileMenu()
  initHeaderScroll()
  initHero()
  initServices()
  initGallery()
  initAbout()
  initReviews()
  initContact()
  initFooter()

  // Hareket + lightbox (DOM dolduktan sonra)
  initReveal()
  initLightbox('#galeri [data-lightbox]')
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
