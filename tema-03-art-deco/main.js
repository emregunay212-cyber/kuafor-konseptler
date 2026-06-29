/**
 * AURA BEAUTY — Tema 03 "Art Deco Glam"
 * Tüm dinamik içerik TEK kaynaktan (content.js) okunur ve DOM'a basılır.
 */
import { SITE, img, waUrl, telUrl, mapEmbedUrl, IMAGE_POOL } from '/src/data/content.js'
import { initReveal } from '/src/shared/reveal.js'
import { initLightbox } from '/src/shared/lightbox.js'

/* ---------- Küçük yardımcılar ---------- */
const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

const $ = (sel, root = document) => root.querySelector(sel)

const stars = (n = 5) => '★'.repeat(n) + '☆'.repeat(Math.max(0, 5 - n))

const waBook = (svc) =>
  waUrl(
    svc
      ? `Merhaba! ${SITE.brand} — "${svc}" için randevu almak istiyorum.`
      : `Merhaba! ${SITE.brand} için randevu almak istiyorum.`
  )

/* ---------- Art Deco sunburst (inline SVG) ---------- */
function sunburstSVG() {
  const cx = 500
  const cy = 500
  const rays = 48
  let beams = ''
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2
    const x = cx + Math.cos(a) * 760
    const y = cy + Math.sin(a) * 760
    const w = i % 2 === 0 ? 1.4 : 0.6
    beams += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="url(#rayGrad)" stroke-width="${w}"/>`
  }
  let rings = ''
  ;[120, 200, 290].forEach((r, idx) => {
    rings += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#c8a24b" stroke-width="${idx === 1 ? 1.4 : 0.7}" opacity="${0.7 - idx * 0.18}"/>`
  })
  // Yelpaze (fan) merkez deseni
  let fan = ''
  for (let i = 0; i <= 12; i++) {
    const a = (-Math.PI / 2) + ((i / 12) * Math.PI - Math.PI / 2) * 0 + (i / 12) * Math.PI * 2
    const x = cx + Math.cos(a) * 95
    const y = cy + Math.sin(a) * 95
    fan += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#e3c074" stroke-width="1" opacity="0.8"/>`
  }
  return `
  <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="rayGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#e3c074" stop-opacity="0.9"/>
        <stop offset="55%" stop-color="#c8a24b" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#c8a24b" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <g>${beams}</g>
    <g>${rings}</g>
    <g>${fan}</g>
    <circle cx="${cx}" cy="${cy}" r="9" fill="#e3c074"/>
  </svg>`
}

/* ---------- HEADER ---------- */
function renderHeader(host) {
  const links = SITE.nav
    .map((n) => `<li><a class="nav__link" href="${esc(n.href)}" data-nav>${esc(n.label)}</a></li>`)
    .join('')
  const mobileLinks =
    links +
    `<li><a class="nav__link nav__link--cta" href="${waBook()}" target="_blank" rel="noopener" data-nav>${esc(SITE.ctaPrimary.label)}</a></li>`

  host.innerHTML = `
    <nav class="nav wrap" aria-label="Ana menü">
      <a class="brand" href="#top" aria-label="${esc(SITE.brand)} ana sayfa">
        <span class="brand__name">${esc(SITE.brand)}</span>
        <span class="brand__tag">${esc(SITE.brandTagline)}</span>
      </a>
      <ul class="nav__links" id="navLinks">${mobileLinks}</ul>
      <div class="nav__actions">
        <a class="btn btn--framed nav__cta" href="${waBook()}" target="_blank" rel="noopener">${esc(SITE.ctaPrimary.label)}</a>
        <button class="hamburger" id="hamburger" aria-label="Menüyü aç" aria-expanded="false" aria-controls="navLinks">
          <span></span>
        </button>
      </div>
    </nav>
    <div class="nav-backdrop" id="navBackdrop" hidden></div>`

  const header = host
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  const burger = $('#hamburger', host)
  const navLinks = $('#navLinks', host)
  const backdrop = $('#navBackdrop', host)
  const setMenu = (open) => {
    navLinks.classList.toggle('is-open', open)
    backdrop.classList.toggle('is-open', open)
    backdrop.hidden = !open
    burger.setAttribute('aria-expanded', String(open))
    burger.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç')
    document.body.style.overflow = open ? 'hidden' : ''
  }
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'))
  backdrop.addEventListener('click', () => setMenu(false))
  navLinks.querySelectorAll('[data-nav]').forEach((a) => a.addEventListener('click', () => setMenu(false)))
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false)
  })
}

/* ---------- HERO ---------- */
function renderHero(host) {
  const heroId = SITE.images.hero[0]
  const brandHtml = esc(SITE.brand).replace(/\s+(\S+)$/, ' <span class="accent">$1</span>')
  const statsHtml = SITE.stats
    .map(
      (s, i) => `
      <div class="stat" data-reveal style="--reveal-delay:${i * 90}ms">
        <div class="stat__value">${esc(s.value)}</div>
        <div class="stat__label">${esc(s.label)}</div>
      </div>`
    )
    .join('')

  host.innerHTML = `
    <div class="hero__bg">
      <img src="${img(heroId, { w: 1600, h: 1000, q: 70 })}" alt="" loading="eager" fetchpriority="high" width="1600" height="1000" />
    </div>
    <div class="hero__sunburst">${sunburstSVG()}</div>
    <div class="hero__inner">
      <div class="hero__frame">
        <p class="eyebrow center">${esc(SITE.brandTagline)}</p>
        <h1 class="hero__brand" id="hero-title">${brandHtml}</h1>
        <p class="hero__slogan">${esc(SITE.slogan)}</p>
        <p class="hero__intro">${esc(SITE.intro)}</p>
        <div class="hero__cta">
          <a class="btn btn--framed" href="${waBook()}" target="_blank" rel="noopener">${esc(SITE.ctaPrimary.label)}</a>
          <a class="btn btn--ghost" href="${waUrl()}" target="_blank" rel="noopener" aria-label="WhatsApp ile yazın">WhatsApp</a>
        </div>
        <div class="hero__stats">${statsHtml}</div>
      </div>
    </div>`
}

/* ---------- HİZMETLER ---------- */
function renderServices(host) {
  const cats = SITE.serviceCategories
  const tabs = cats
    .map(
      (c, i) => `
      <button class="cat-tab ${i === 0 ? 'is-active' : ''}" role="tab"
        id="tab-${esc(c.key)}" aria-controls="panel-${esc(c.key)}" aria-selected="${i === 0}" data-cat="${esc(c.key)}">
        <span class="ico" aria-hidden="true">${c.icon}</span> ${esc(c.name)}
      </button>`
    )
    .join('')

  const panels = cats
    .map((c, i) => {
      const cards = c.services
        .map(
          (s, j) => `
        <article class="svc-card" data-reveal style="--reveal-delay:${j * 70}ms">
          <div class="svc-card__top">
            <h3 class="svc-card__name">${esc(s.name)}</h3>
            <span class="svc-card__price">${esc(s.price)}</span>
          </div>
          <p class="svc-card__desc">${esc(s.desc)}</p>
          <div class="svc-card__meta"><span aria-hidden="true">⏱</span> ${esc(s.duration)}</div>
        </article>`
        )
        .join('')
      return `
        <div class="cat-panel ${i === 0 ? 'is-active' : ''}" role="tabpanel" id="panel-${esc(c.key)}"
          aria-labelledby="tab-${esc(c.key)}" ${i === 0 ? '' : 'hidden'}>
          <div class="cat-panel__head">
            <h3 class="section-title" style="font-size:var(--text-h3);letter-spacing:.12em">${c.icon} ${esc(c.name)}</h3>
            <p class="cat-panel__blurb">${esc(c.blurb)}</p>
          </div>
          <div class="svc-grid">${cards}</div>
        </div>`
    })
    .join('')

  host.innerHTML = `
    <div class="wrap">
      <div class="section-head" data-reveal>
        <span class="eyebrow center">Menümüz</span>
        <h2 class="section-title" id="services-title">Hizmetlerimiz</h2>
        <div class="deco-rule"><span class="bar"></span><span class="lozenge"></span><span class="bar"></span></div>
        <p class="section-sub">Saçtan cilde, makyajdan tırnağa — her detayda zarafet.</p>
      </div>
      <div class="cat-tabs" role="tablist" aria-label="Hizmet kategorileri">${tabs}</div>
      <div class="cat-panels">${panels}</div>
    </div>`

  const tabEls = Array.from(host.querySelectorAll('.cat-tab'))
  const panelEls = Array.from(host.querySelectorAll('.cat-panel'))
  tabEls.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.cat
      tabEls.forEach((t) => {
        const on = t === tab
        t.classList.toggle('is-active', on)
        t.setAttribute('aria-selected', String(on))
      })
      panelEls.forEach((p) => {
        const on = p.id === `panel-${key}`
        p.classList.toggle('is-active', on)
        p.hidden = !on
      })
    })
  })
}

/* ---------- GALERİ ---------- */
function renderGallery(host) {
  // Çeşitlilik için kategorilerden derlenmiş, tema-uygun bir seçki
  const picks = [
    SITE.images.sac[0],
    SITE.images.makyaj[0],
    SITE.images.cilt[0],
    SITE.images.salon[0],
    SITE.images.sac[2],
    SITE.images.tirnak[0],
    SITE.images.makyaj[2],
    SITE.images.cilt[3],
    SITE.images.hero[2],
  ].filter(Boolean)
  // boş kalırsa havuzdan tamamla
  while (picks.length < 9 && IMAGE_POOL.length) picks.push(IMAGE_POOL[picks.length % IMAGE_POOL.length])

  const wideAt = new Set([0, 5]) // gridi kır: bazı kareler geniş
  const figs = picks
    .slice(0, 9)
    .map((id, i) => {
      const wide = wideAt.has(i)
      const w = wide ? 1100 : 700
      const h = wide ? 680 : 880
      return `
      <figure class="${wide ? 'is-wide' : ''}" data-reveal style="--reveal-delay:${(i % 3) * 80}ms">
        <img src="${img(id, { w, h, q: 72 })}" alt="${esc(SITE.brand)} çalışma örneği ${i + 1}"
          width="${w}" height="${h}" loading="lazy" data-lightbox
          data-full="${img(id, { w: 1500, q: 80 })}" />
      </figure>`
    })
    .join('')

  host.innerHTML = `
    <div class="wrap">
      <div class="section-head" data-reveal>
        <span class="eyebrow center">Galeri</span>
        <h2 class="section-title" id="gallery-title">İmza Çalışmalarımız</h2>
        <div class="deco-rule"><span class="bar"></span><span class="lozenge"></span><span class="bar"></span></div>
      </div>
      <div class="gallery-grid">${figs}</div>
    </div>`
}

/* ---------- HAKKIMIZDA ---------- */
function renderAbout(host) {
  const aboutImg = SITE.images.salon[0] || SITE.images.hero[1]
  const exp = SITE.stats.find((s) => /yıl/i.test(s.label)) || SITE.stats[1] || { value: '12+', label: 'Yıl Deneyim' }
  const values = SITE.values
    .map(
      (v, i) => `
      <div class="value-card" data-reveal style="--reveal-delay:${i * 80}ms">
        <span class="ico" aria-hidden="true">${v.icon}</span>
        <h3>${esc(v.title)}</h3>
        <p>${esc(v.text)}</p>
      </div>`
    )
    .join('')

  host.innerHTML = `
    <div class="wrap about__grid">
      <div class="about__media" data-reveal>
        <img src="${img(aboutImg, { w: 760, h: 950, q: 74 })}" alt="${esc(SITE.brand)} salon ortamı"
          width="760" height="950" loading="lazy" />
        <div class="badge"><b>${esc(exp.value)}</b><span>${esc(exp.label)}</span></div>
      </div>
      <div class="about__text" data-reveal style="--reveal-delay:120ms">
        <span class="eyebrow">Hakkımızda</span>
        <h2 class="section-title" id="about-title" style="text-align:left">Zarafet, Bir Detaydır</h2>
        <p>${esc(SITE.about)}</p>
        <div class="about__values">${values}</div>
      </div>
    </div>`
}

/* ---------- YORUMLAR ---------- */
function renderTestimonials(host) {
  const cards = SITE.testimonials
    .map(
      (t, i) => `
      <article class="tst-card" data-reveal style="--reveal-delay:${(i % 3) * 90}ms">
        <span class="tst-card__quote" aria-hidden="true">&ldquo;</span>
        <div class="tst-card__stars" aria-label="${t.stars} / 5 yıldız">${stars(t.stars)}</div>
        <p class="tst-card__text">${esc(t.text)}</p>
        <div class="tst-card__foot">
          <div class="tst-card__name">${esc(t.name)}</div>
          <div class="tst-card__meta">${esc(t.meta)}</div>
        </div>
      </article>`
    )
    .join('')

  host.innerHTML = `
    <div class="wrap">
      <div class="section-head" data-reveal>
        <span class="eyebrow center">Görüşler</span>
        <h2 class="section-title" id="testimonials-title">Müşterilerimiz Anlatıyor</h2>
        <div class="deco-rule"><span class="bar"></span><span class="lozenge"></span><span class="bar"></span></div>
      </div>
      <div class="tst-grid">${cards}</div>
    </div>`
}

/* ---------- İLETİŞİM ---------- */
function renderContact(host) {
  const todayIdx = (new Date().getDay() + 6) % 7 // Pazartesi=0
  const rows = SITE.hours
    .map((h, i) => {
      const today = i === todayIdx ? 'today' : ''
      const closed = h.closed ? 'closed' : ''
      const val = h.closed ? 'Kapalı' : `${esc(h.open)} – ${esc(h.close)}`
      return `<tr class="${today} ${closed}"><th scope="row">${esc(h.day)}</th><td>${val}</td></tr>`
    })
    .join('')

  host.innerHTML = `
    <div class="wrap">
      <div class="section-head" data-reveal>
        <span class="eyebrow center">İletişim</span>
        <h2 class="section-title" id="contact-title">Bize Ulaşın</h2>
        <div class="deco-rule"><span class="bar"></span><span class="lozenge"></span><span class="bar"></span></div>
      </div>
      <div class="contact__grid">
        <div class="contact__info" data-reveal>
          <div class="info-row">
            <span class="ico" aria-hidden="true">⚲</span>
            <div><div class="info-row__label">Adres</div>
              <div class="info-row__value">${esc(SITE.address)}<br>${esc(SITE.district)} / ${esc(SITE.city)}</div></div>
          </div>
          <div class="info-row">
            <span class="ico" aria-hidden="true">☎</span>
            <div><div class="info-row__label">Telefon</div>
              <div class="info-row__value"><a href="${telUrl()}">${esc(SITE.phoneDisplay)}</a></div></div>
          </div>
          <div class="info-row">
            <span class="ico" aria-hidden="true">◷</span>
            <div><div class="info-row__label">Çalışma Saatleri</div>
              <div class="info-row__value">
                <table class="hours-table"><tbody>${rows}</tbody></table>
              </div></div>
          </div>
          <div class="contact__cta">
            <a class="btn btn--framed" href="${waBook()}" target="_blank" rel="noopener">${esc(SITE.ctaPrimary.label)}</a>
            <a class="btn btn--ghost" href="${SITE.instagramUrl}" target="_blank" rel="noopener">Instagram</a>
          </div>
        </div>
        <div class="contact__map" data-reveal style="--reveal-delay:120ms">
          <iframe src="${mapEmbedUrl()}" title="${esc(SITE.brand)} harita konumu"
            loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        </div>
      </div>
    </div>`
}

/* ---------- FOOTER ---------- */
function renderFooter(host) {
  const year = new Date().getFullYear()
  const navCols = SITE.nav
    .map((n) => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`)
    .join('')

  host.innerHTML = `
    <div class="wrap">
      <div class="footer__grid">
        <div class="footer__brand">
          <span class="brand__name">${esc(SITE.brand)}</span>
          <p class="footer__desc">${esc(SITE.slogan)} — ${esc(SITE.brandTagline)}. ${esc(SITE.district)} / ${esc(SITE.city)}.</p>
          <div class="footer__social">
            <a href="${waUrl()}" target="_blank" rel="noopener" aria-label="WhatsApp">✆</a>
            <a href="${SITE.instagramUrl}" target="_blank" rel="noopener" aria-label="Instagram">◎</a>
            <a href="mailto:${esc(SITE.email)}" aria-label="E-posta">✉</a>
          </div>
        </div>
        <div class="footer__col">
          <h4>Keşfet</h4>
          <ul>${navCols}</ul>
        </div>
        <div class="footer__col">
          <h4>İletişim</h4>
          <ul>
            <li><a href="${telUrl()}">${esc(SITE.phoneDisplay)}</a></li>
            <li><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></li>
            <li><a href="#iletisim">${esc(SITE.address)}</a></li>
            <li>${esc(SITE.hoursSummary)}</li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© ${year} ${esc(SITE.brand)}. Tüm hakları saklıdır.</span>
        <span>Art Deco Glam · Konsept Tasarım</span>
      </div>
    </div>`
}

/* ---------- Bootstrap ---------- */
function mount() {
  document.title = `${SITE.brand} — ${SITE.brandTagline}`

  const headerEl = $('[data-header]')
  const heroEl = $('[data-hero]')
  const servicesEl = $('[data-services]')
  const galleryEl = $('[data-gallery]')
  const aboutEl = $('[data-about]')
  const testimonialsEl = $('[data-testimonials]')
  const contactEl = $('[data-contact]')
  const footerEl = $('[data-footer]')

  if (headerEl) renderHeader(headerEl)
  if (heroEl) renderHero(heroEl)
  if (servicesEl) renderServices(servicesEl)
  if (galleryEl) renderGallery(galleryEl)
  if (aboutEl) renderAbout(aboutEl)
  if (testimonialsEl) renderTestimonials(testimonialsEl)
  if (contactEl) renderContact(contactEl)
  if (footerEl) renderFooter(footerEl)

  // Hareket + lightbox (DOM hazır olduktan sonra)
  initReveal()
  if (galleryEl) initLightbox('#galeri [data-lightbox]')
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount)
} else {
  mount()
}
