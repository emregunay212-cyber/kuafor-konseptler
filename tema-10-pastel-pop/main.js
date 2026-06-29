/**
 * AURA BEAUTY — TEMA 10 "PASTEL POP"
 * Tüm dinamik içerik TEK kaynaktan (/src/data/content.js) okunur ve DOM'a basılır.
 */
import { SITE, img, waUrl, telUrl, mapEmbedUrl, IMAGE_POOL } from '/src/data/content.js'
import { initReveal } from '/src/shared/reveal.js'
import { initLightbox } from '/src/shared/lightbox.js'

/** Küçük yardımcı: güvenli querySelector + var olanı işle. */
const $ = (sel, root = document) => root.querySelector(sel)
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))

/** HTML kaçışı (kullanıcı/içerik metnini DOM'a güvenli basmak için). */
function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Bir öğenin metnini, öğe mevcutsa ayarla. */
function setText(sel, text) {
  const el = $(sel)
  if (el) el.textContent = text
}

/* ------------------------------------------------------------------ */
/* Marka / başlık / sayfa başlığı                                      */
/* ------------------------------------------------------------------ */
function fillBrand() {
  document.title = `${SITE.brand} — ${SITE.brandTagline}`
  $$('[data-brand-name]').forEach((el) => {
    el.textContent = SITE.brandShort || SITE.brand
  })
  setText('[data-slogan]', SITE.slogan)
  setText('[data-intro]', SITE.intro)
  setText('[data-about]', SITE.about)
  setText('[data-footer-tag]', SITE.intro)
  setText('[data-copy]', `© ${new Date().getFullYear()} ${SITE.brand} · Tüm hakları saklıdır.`)
}

/* ------------------------------------------------------------------ */
/* CTA linkleri (WhatsApp / tel)                                       */
/* ------------------------------------------------------------------ */
function fillCtas() {
  const primaryMsg = `Merhaba ${SITE.brand}! Randevu almak istiyorum.`
  $$('[data-cta-primary]').forEach((el) => {
    el.href = waUrl(primaryMsg)
    if (SITE.ctaPrimary?.label) el.textContent = SITE.ctaPrimary.label
  })
  $$('[data-cta-secondary]').forEach((el) => {
    el.href = waUrl(`Merhaba! ${SITE.brand} hakkında bilgi almak istiyorum.`)
  })
}

/* ------------------------------------------------------------------ */
/* Navigasyon (masaüstü + mobil)                                       */
/* ------------------------------------------------------------------ */
function buildNav() {
  const desktop = $('[data-nav]')
  const mobile = $('[data-mobile-nav]')
  const footer = $('[data-footer-nav]')

  const items = SITE.nav.map((n) => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`).join('')
  if (desktop) desktop.innerHTML = items
  if (mobile) mobile.innerHTML = items
  if (footer) footer.innerHTML = items
}

/* ------------------------------------------------------------------ */
/* Hero görselleri + istatistikler                                     */
/* ------------------------------------------------------------------ */
function fillHero() {
  const heroImg = $('[data-hero-img]')
  if (heroImg) {
    const id = SITE.images.hero[0]
    heroImg.src = img(id, { w: 900, h: 1125, q: 80 })
    heroImg.width = 900
    heroImg.height = 1125
    heroImg.alt = `${SITE.brand} — güzellik salonundan bir portre`
  }

  const stats = $('[data-stats]')
  if (stats) {
    stats.innerHTML = SITE.stats
      .map(
        (s) =>
          `<li><span class="stat__value">${esc(s.value)}</span><span class="stat__label">${esc(s.label)}</span></li>`
      )
      .join('')
  }
}

/* ------------------------------------------------------------------ */
/* Hizmetler                                                           */
/* ------------------------------------------------------------------ */
function buildServices() {
  const root = $('[data-services]')
  if (!root) return

  root.innerHTML = SITE.serviceCategories
    .map((cat) => {
      const services = cat.services
        .map(
          (s) => `
          <li class="service-item">
            <div class="service-item__top">
              <span class="service-item__name">${esc(s.name)}</span>
              <span class="service-item__price">${esc(s.price)}</span>
            </div>
            <p class="service-item__desc">${esc(s.desc)}</p>
            <span class="service-item__dur">${esc(s.duration)}</span>
          </li>`
        )
        .join('')

      return `
        <article class="cat-card" data-reveal>
          <div class="cat-card__head">
            <span class="cat-card__icon" aria-hidden="true">${esc(cat.icon)}</span>
            <div>
              <h3 class="cat-card__name">${esc(cat.name)}</h3>
              <p class="cat-card__blurb">${esc(cat.blurb)}</p>
            </div>
          </div>
          <ul class="service-list">${services}</ul>
        </article>`
    })
    .join('')
}

/* ------------------------------------------------------------------ */
/* Galeri                                                              */
/* ------------------------------------------------------------------ */
function buildGallery() {
  const root = $('[data-gallery]')
  if (!root) return

  const ids = IMAGE_POOL.slice(0, 9)
  root.innerHTML = ids
    .map((id, i) => {
      const src = img(id, { w: 700, h: 700, q: 75 })
      const full = img(id, { w: 1400, q: 80 })
      return `
        <figure data-reveal style="--reveal-delay:${(i % 3) * 90}ms">
          <img
            src="${src}"
            data-full="${full}"
            data-lightbox
            width="700" height="700"
            loading="lazy"
            alt="${esc(SITE.brand)} galeri görseli ${i + 1}"
          />
        </figure>`
    })
    .join('')
}

/* ------------------------------------------------------------------ */
/* Hakkımızda görseli + değerler                                       */
/* ------------------------------------------------------------------ */
function buildAbout() {
  const aboutImg = $('[data-about-img]')
  if (aboutImg) {
    const id = SITE.images.salon[0] || SITE.images.hero[1]
    aboutImg.src = img(id, { w: 760, h: 950, q: 80 })
    aboutImg.width = 760
    aboutImg.height = 950
    aboutImg.alt = `${SITE.brand} salonundan bir kare`
  }

  const values = $('[data-values]')
  if (values) {
    values.innerHTML = SITE.values
      .map(
        (v) => `
        <li class="value-card" data-reveal>
          <span class="value-card__icon" aria-hidden="true">${esc(v.icon)}</span>
          <h3 class="value-card__title">${esc(v.title)}</h3>
          <p class="value-card__text">${esc(v.text)}</p>
        </li>`
      )
      .join('')
  }
}

/* ------------------------------------------------------------------ */
/* Yorumlar                                                            */
/* ------------------------------------------------------------------ */
function buildTestimonials() {
  const root = $('[data-testimonials]')
  if (!root) return

  root.innerHTML = SITE.testimonials
    .map((t) => {
      const stars = '★'.repeat(Math.max(0, Math.min(5, t.stars))) + '☆'.repeat(Math.max(0, 5 - t.stars))
      const initial = (t.name || '?').trim().charAt(0)
      return `
        <article class="testi-card" data-reveal>
          <div class="testi-card__stars" aria-label="${esc(t.stars)} / 5 yıldız">${stars}</div>
          <p class="testi-card__text">“${esc(t.text)}”</p>
          <div class="testi-card__foot">
            <span class="testi-card__avatar" aria-hidden="true">${esc(initial)}</span>
            <div>
              <div class="testi-card__name">${esc(t.name)}</div>
              <div class="testi-card__meta">${esc(t.meta)}</div>
            </div>
          </div>
        </article>`
    })
    .join('')
}

/* ------------------------------------------------------------------ */
/* İletişim                                                            */
/* ------------------------------------------------------------------ */
function fillContact() {
  setText('[data-address]', SITE.address)

  const phone = $('[data-phone]')
  if (phone) {
    phone.href = telUrl()
    phone.textContent = SITE.phoneDisplay
  }

  const wa = $('[data-whatsapp]')
  if (wa) wa.href = waUrl()

  $$('[data-instagram]').forEach((el) => {
    el.href = SITE.instagramUrl
    if (!el.textContent.trim() || el.classList.contains('footer__ig')) {
      el.textContent = el.classList.contains('footer__ig') ? 'Instagram' : `@${SITE.instagram}`
    }
  })

  const hours = $('[data-hours]')
  if (hours) {
    hours.innerHTML = SITE.hours
      .map((h) => {
        const value = h.closed
          ? '<span class="is-closed">Kapalı</span>'
          : `<span>${esc(h.open)} – ${esc(h.close)}</span>`
        return `<li><span class="hours__day">${esc(h.day)}</span>${value}</li>`
      })
      .join('')
  }

  const map = $('[data-map]')
  if (map) map.src = mapEmbedUrl()
}

/* ------------------------------------------------------------------ */
/* Etkileşim: header scroll, mobil menü, aktif nav                      */
/* ------------------------------------------------------------------ */
function initInteractions() {
  const header = $('#siteHeader')
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  }

  const burger = $('#hamburger')
  const menu = $('#mobileMenu')
  if (burger && menu) {
    const setOpen = (open) => {
      burger.setAttribute('aria-expanded', String(open))
      burger.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç')
      menu.hidden = !open
    }
    burger.addEventListener('click', () => setOpen(burger.getAttribute('aria-expanded') !== 'true'))
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false)
    })
  }

  initActiveNav()
}

/** Görünür bölüme göre nav linkini vurgular. */
function initActiveNav() {
  const links = $$('[data-nav] a')
  if (!links.length || !('IntersectionObserver' in window)) return

  const map = new Map()
  links.forEach((a) => {
    const id = a.getAttribute('href')?.replace('#', '')
    const section = id && document.getElementById(id)
    if (section) map.set(section, a)
  })
  if (!map.size) return

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove('is-active'))
          map.get(entry.target)?.classList.add('is-active')
        }
      })
    },
    { rootMargin: '-45% 0px -50% 0px' }
  )
  map.forEach((_, section) => io.observe(section))
}

/* ------------------------------------------------------------------ */
/* Başlat                                                              */
/* ------------------------------------------------------------------ */
function init() {
  fillBrand()
  fillCtas()
  buildNav()
  fillHero()
  buildServices()
  buildGallery()
  buildAbout()
  buildTestimonials()
  fillContact()
  initInteractions()

  // Dinamik DOM basıldıktan SONRA reveal + lightbox bağla
  initReveal()
  initLightbox('[data-lightbox]')
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
