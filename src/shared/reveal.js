/**
 * Scroll-reveal — [data-reveal] olan öğeleri görünür olunca .is-visible yapar.
 * prefers-reduced-motion açıksa anında gösterir (animasyon yok).
 *
 * Kullanım:
 *   import { initReveal } from '/src/shared/reveal.js'
 *   initReveal()
 * CSS tarafında: [data-reveal]{opacity:0;transform:translateY(24px);transition:...}
 *                [data-reveal].is-visible{opacity:1;transform:none}
 * İsteğe bağlı kademe: <div data-reveal style="--reveal-delay:120ms">
 */
export function initReveal(selector = '[data-reveal]', { threshold = 0.12, rootMargin = '0px 0px -8% 0px' } = {}) {
  const els = Array.from(document.querySelectorAll(selector))
  if (!els.length) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'))
    return
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold, rootMargin }
  )
  els.forEach((el) => io.observe(el))
}
