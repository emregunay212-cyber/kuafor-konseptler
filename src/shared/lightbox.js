/**
 * Minimal, erişilebilir lightbox. Galeri görsellerine tıklanınca tam ekran açar.
 * Tema-nötr: kendi stilini enjekte eder, tema CSS'iyle çakışmaz.
 *
 * Kullanım:
 *   import { initLightbox } from '/src/shared/lightbox.js'
 *   initLightbox('#galeri img')   // veya '[data-lightbox]'
 * Büyük sürüm için img'e data-full="<url>" ekleyebilirsin; yoksa src kullanılır.
 */
let injected = false
function injectStyles() {
  if (injected) return
  injected = true
  const css = `
  .lb-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;
    background:rgba(12,10,12,.86);backdrop-filter:blur(6px);opacity:0;transition:opacity .25s ease;padding:24px}
  .lb-overlay.is-open{opacity:1}
  .lb-overlay img{max-width:92vw;max-height:88vh;border-radius:10px;box-shadow:0 30px 80px rgba(0,0,0,.5);
    transform:scale(.96);transition:transform .25s ease}
  .lb-overlay.is-open img{transform:scale(1)}
  .lb-close{position:absolute;top:18px;right:22px;width:44px;height:44px;border-radius:50%;border:none;cursor:pointer;
    background:rgba(255,255,255,.12);color:#fff;font-size:22px;line-height:44px;text-align:center}
  .lb-close:hover{background:rgba(255,255,255,.24)}
  .lb-nav{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;border:none;cursor:pointer;
    background:rgba(255,255,255,.12);color:#fff;font-size:26px;border-radius:50%}
  .lb-nav:hover{background:rgba(255,255,255,.24)}
  .lb-prev{left:18px}.lb-next{right:18px}
  @media (max-width:640px){.lb-nav{display:none}}
  @media (prefers-reduced-motion:reduce){.lb-overlay,.lb-overlay img{transition:none}}
  `
  const style = document.createElement('style')
  style.textContent = css
  document.head.appendChild(style)
}

export function initLightbox(selector = '[data-lightbox]') {
  const imgs = Array.from(document.querySelectorAll(selector))
  if (!imgs.length) return
  injectStyles()

  const sources = imgs.map((el) => el.getAttribute('data-full') || el.currentSrc || el.src)
  let index = 0

  const overlay = document.createElement('div')
  overlay.className = 'lb-overlay'
  overlay.setAttribute('role', 'dialog')
  overlay.setAttribute('aria-modal', 'true')
  overlay.setAttribute('aria-label', 'Görsel önizleme')
  overlay.innerHTML = `
    <button class="lb-close" aria-label="Kapat">×</button>
    <button class="lb-nav lb-prev" aria-label="Önceki">‹</button>
    <img alt="">
    <button class="lb-nav lb-next" aria-label="Sonraki">›</button>`
  const imgEl = overlay.querySelector('img')

  function show(i) {
    index = (i + sources.length) % sources.length
    imgEl.src = sources[index]
  }
  function open(i) {
    show(i)
    document.body.appendChild(overlay)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => overlay.classList.add('is-open'))
    document.addEventListener('keydown', onKey)
  }
  function close() {
    overlay.classList.remove('is-open')
    document.removeEventListener('keydown', onKey)
    setTimeout(() => {
      overlay.remove()
      document.body.style.overflow = ''
    }, 250)
  }
  function onKey(e) {
    if (e.key === 'Escape') close()
    else if (e.key === 'ArrowRight') show(index + 1)
    else if (e.key === 'ArrowLeft') show(index - 1)
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close()
  })
  overlay.querySelector('.lb-close').addEventListener('click', close)
  overlay.querySelector('.lb-next').addEventListener('click', () => show(index + 1))
  overlay.querySelector('.lb-prev').addEventListener('click', () => show(index - 1))

  imgs.forEach((el, i) => {
    el.style.cursor = 'zoom-in'
    el.addEventListener('click', () => open(i))
  })
}
