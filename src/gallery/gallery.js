/* ====== AURA BEAUTY — SEÇİM GALERİSİ (vitrin) — etkileşim ====== */
import { SITE } from '/src/data/content.js'

// Marka adını tek kaynaktan senkronla
document.querySelectorAll('[data-brand]').forEach((el) => (el.textContent = SITE.brand))
document.title = `${SITE.brand} — Tasarım Konseptleri`

// Galeri sunum verisi (içerik değil, vitrin meta'sı)
const THEMES = [
  { n: '01', folder: 'tema-01-rose-atelier', name: 'Rose Atelier', dir: 'luks', tag: 'Lüks & zarif', desc: 'Tozlu pembe ve sıcak altın; krem zemin, kemerli portre çerçevesi. Yumuşak, feminen lüks.' },
  { n: '02', folder: 'tema-02-noir-gold', name: 'Noir & Gold', dir: 'luks', tag: 'Lüks & zarif', desc: 'Siyah üzerine şampanya altın, spot ışıklar. Dramatik, gece ışıltısı taşıyan VIP atmosfer.' },
  { n: '03', folder: 'tema-03-art-deco', name: 'Art Deco Glam', dir: 'luks', tag: 'Lüks & zarif', desc: 'Zümrüt ve altın geometri, simetrik süsleme. 1920’ler Gatsby zarafeti.' },
  { n: '04', folder: 'tema-04-editorial', name: 'Éditorial', dir: 'cesur', tag: 'Cesur & genç', desc: 'Siyah-beyaz dergi estetiği, devasa tipografi, asimetrik grid. Vogue enerjisi.' },
  { n: '05', folder: 'tema-05-studio-minimal', name: 'Studio Minimal', dir: 'modern', tag: 'Sade & modern', desc: 'Bol boşluk, ince çizgiler, dingin nötrler. İskandinav spa sükuneti.' },
  { n: '06', folder: 'tema-06-glasshouse', name: 'Glasshouse', dir: 'modern', tag: 'Sade & modern', desc: 'Buzlu cam paneller, canlı gradyan mesh, ferah ve aydınlık. Modern glassmorphism.' },
  { n: '07', folder: 'tema-07-botanica', name: 'Botanica', dir: 'dogal', tag: 'Sıcak & doğal', desc: 'Adaçayı yeşili, botanik motifler, organik kıvrımlar. Clean-beauty hissi.' },
  { n: '08', folder: 'tema-08-terracotta', name: 'Terracotta Boho', dir: 'dogal', tag: 'Sıcak & doğal', desc: 'Terracotta ve kil tonları, kemerler, sıcak doku. Samimi boho butik.' },
  { n: '09', folder: 'tema-09-brutalist', name: 'Neo-Brutalist', dir: 'cesur', tag: 'Cesur & genç', desc: 'Kalın kontrast, sert gölgeler, elektrik aksan. İddialı ve oynak.' },
  { n: '10', folder: 'tema-10-pastel-pop', name: 'Pastel Pop', dir: 'cesur', tag: 'Cesur & genç', desc: 'Pastel blob’lar, baloncuk butonlar, neşeli enerji. Genç ve samimi.' },
]

const grid = document.getElementById('grid')
const empty = document.getElementById('empty')

// Deploy kökü (Vite base). Root deploy'da '/', GitHub Pages alt-yolunda '/<repo>/'.
const BASE = import.meta.env.BASE_URL

// Mobil cihaz mı? (dar viewport) — mobilde "Masaüstü görünüm" ölçekli emülasyon açar.
const isMobile = () => window.matchMedia('(max-width: 860px)').matches

grid.innerHTML = THEMES.map((t) => {
  const url = `${BASE}${t.folder}/`
  return `
  <article class="card" data-dir="${t.dir}">
    <a class="preview" data-view="desk" data-url="${url}" data-name="${t.name}" href="${url}" target="_blank" rel="noopener" aria-label="${t.name} — masaüstü görünümde aç">
      <span class="preview-skeleton">yükleniyor…</span>
      <iframe data-src="${url}" loading="lazy" tabindex="-1" title="${t.name} önizleme" scrolling="no"></iframe>
      <span class="preview-hint">Büyüt ↗</span>
    </a>
    <div class="card-body">
      <div class="card-head">
        <h3>${t.name}</h3>
        <span class="num">${t.n}</span>
      </div>
      <span class="tag tag-${t.dir}">${t.tag}</span>
      <p class="desc">${t.desc}</p>
      <div class="actions">
        <a class="btn btn-primary" data-view="desk" data-url="${url}" data-name="${t.name}" href="${url}" target="_blank" rel="noopener" title="Masaüstü görünümde aç">Masaüstü görünüm</a>
        <button class="btn btn-ghost" data-view="mob" data-url="${url}" data-name="${t.name}" title="Mobil görünümde aç">Mobil görünüm</button>
      </div>
    </div>
  </article>`
}).join('')

const cards = Array.from(grid.querySelectorAll('.card'))

/* Önizleme ölçekleme: iframe 1600px referans, kart genişliğine göre scale */
const previews = Array.from(grid.querySelectorAll('.preview'))
function scalePreview(p) {
  const w = p.clientWidth
  if (w) p.style.setProperty('--s', (w / 1600).toFixed(4))
}
const ro = new ResizeObserver((entries) => entries.forEach((e) => scalePreview(e.target)))
previews.forEach((p) => { scalePreview(p); ro.observe(p) })

/* iframe'leri lazy yükle: kart görünür olunca src ata + reveal + skeleton kaldır */
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    const card = entry.target
    card.classList.add('revealed')
    const frame = card.querySelector('iframe[data-src]')
    if (frame && !frame.src) {
      frame.src = frame.dataset.src
      frame.addEventListener('load', () => {
        const sk = card.querySelector('.preview-skeleton')
        if (sk) sk.style.display = 'none'
      }, { once: true })
    }
    obs.unobserve(card)
  })
}, { rootMargin: '200px 0px' })
cards.forEach((c) => io.observe(c))

/* Filtreler */
const chips = Array.from(document.querySelectorAll('.chip'))
chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.remove('is-active'))
    chip.classList.add('is-active')
    const f = chip.dataset.filter
    let visible = 0
    cards.forEach((card) => {
      const show = f === 'all' || card.dataset.dir === f
      card.style.display = show ? '' : 'none'
      if (show) visible++
    })
    empty.hidden = visible > 0
  })
})

/* Mobil önizleme modalı */
const modal = document.getElementById('modal')
const phoneFrame = document.getElementById('phoneFrame')
const modalTitle = document.getElementById('modalTitle')
const modalOpen = document.getElementById('modalOpen')

function openModal(url, name) {
  modalTitle.textContent = `${name} — mobil görünüm`
  modalOpen.href = url
  phoneFrame.src = url
  modal.hidden = false
  document.body.style.overflow = 'hidden'
}
function closeModal() {
  modal.hidden = true
  phoneFrame.src = 'about:blank'
  document.body.style.overflow = ''
}
/* Masaüstü emülasyon: mobilde temayı 1280px masaüstü genişliğinde render edip
   ekrana sığacak şekilde ölçekler (gerçek masaüstü düzeni, kaydırılabilir).
   Geri tuşunda veya kapat'ta kapanır. */
const DESK_W = 1280
function openDesktopView(url, name) {
  const screenW = document.documentElement.clientWidth || window.innerWidth
  const scale = screenW / DESK_W

  const overlay = document.createElement('div')
  overlay.className = 'deskview'
  overlay.innerHTML = `
    <div class="deskview__bar">
      <span class="deskview__title">${name} — masaüstü görünüm</span>
      <a class="deskview__open" href="${url}" target="_blank" rel="noopener" aria-label="Yeni sekmede aç">↗</a>
      <button class="deskview__close" aria-label="Kapat">×</button>
    </div>
    <div class="deskview__stage">
      <div class="deskview__scaler">
        <iframe class="deskview__frame" title="${name} masaüstü önizleme"></iframe>
      </div>
    </div>`
  const scaler = overlay.querySelector('.deskview__scaler')
  const frame = overlay.querySelector('.deskview__frame')
  frame.style.width = DESK_W + 'px'
  frame.style.transformOrigin = 'top left'
  frame.style.transform = `scale(${scale})`
  scaler.style.width = screenW + 'px'

  const fit = () => {
    let h = 4000
    try {
      const d = frame.contentDocument
      h = Math.max(d.documentElement.scrollHeight, d.body.scrollHeight)
    } catch (_) {}
    frame.style.height = h + 'px'
    scaler.style.height = Math.ceil(h * scale) + 'px'
  }
  frame.addEventListener('load', () => { fit(); setTimeout(fit, 500); setTimeout(fit, 1400) })
  frame.src = url

  document.body.appendChild(overlay)
  document.body.style.overflow = 'hidden'
  requestAnimationFrame(() => overlay.classList.add('is-open'))

  let closed = false
  const onPop = () => doClose(true)
  function doClose(fromPop) {
    if (closed) return
    closed = true
    overlay.classList.remove('is-open')
    window.removeEventListener('popstate', onPop)
    setTimeout(() => { overlay.remove(); document.body.style.overflow = '' }, 240)
    if (!fromPop) history.back() // kapat → push'lanan state'i geri al
  }
  history.pushState({ deskview: true }, '')
  window.addEventListener('popstate', onPop)
  overlay.querySelector('.deskview__close').addEventListener('click', () => doClose(false))
}

/* Kart aksiyonları — cihaza göre yönlendir */
grid.addEventListener('click', (e) => {
  const el = e.target.closest('[data-view]')
  if (!el) return
  const { view, url, name } = el.dataset
  if (view === 'desk') {
    // Masaüstü görünüm: mobilde ölçekli emülasyon, masaüstünde yeni sekme (varsayılan <a>)
    if (isMobile()) { e.preventDefault(); openDesktopView(url, name) }
  } else {
    // Mobil görünüm: mobilde temayı doğal (yeni sekme), masaüstünde telefon çerçevesi
    e.preventDefault()
    if (isMobile()) window.open(url, '_blank', 'noopener')
    else openModal(url, name)
  }
})
modal.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-close')) closeModal()
})
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return
  if (!modal.hidden) closeModal()
  const dv = document.querySelector('.deskview .deskview__close')
  if (dv) dv.click()
})
