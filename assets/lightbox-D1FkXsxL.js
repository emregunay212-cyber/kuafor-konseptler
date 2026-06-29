function f(a="[data-reveal]",{threshold:n=.12,rootMargin:s="0px 0px -8% 0px"}={}){const o=Array.from(document.querySelectorAll(a));if(!o.length)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){o.forEach(r=>r.classList.add("is-visible"));return}const l=new IntersectionObserver((r,c)=>{r.forEach(i=>{i.isIntersecting&&(i.target.classList.add("is-visible"),c.unobserve(i.target))})},{threshold:n,rootMargin:s});o.forEach(r=>l.observe(r))}let b=!1;function p(){if(b)return;b=!0;const a=`
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
  `,n=document.createElement("style");n.textContent=a,document.head.appendChild(n)}function m(a="[data-lightbox]"){const n=Array.from(document.querySelectorAll(a));if(!n.length)return;p();const s=n.map(t=>t.getAttribute("data-full")||t.currentSrc||t.src);let o=0;const e=document.createElement("div");e.className="lb-overlay",e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-label","Görsel önizleme"),e.innerHTML=`
    <button class="lb-close" aria-label="Kapat">×</button>
    <button class="lb-nav lb-prev" aria-label="Önceki">‹</button>
    <img alt="">
    <button class="lb-nav lb-next" aria-label="Sonraki">›</button>`;const l=e.querySelector("img");function r(t){o=(t+s.length)%s.length,l.src=s[o]}function c(t){r(t),document.body.appendChild(e),document.body.style.overflow="hidden",requestAnimationFrame(()=>e.classList.add("is-open")),document.addEventListener("keydown",d)}function i(){e.classList.remove("is-open"),document.removeEventListener("keydown",d),setTimeout(()=>{e.remove(),document.body.style.overflow=""},250)}function d(t){t.key==="Escape"?i():t.key==="ArrowRight"?r(o+1):t.key==="ArrowLeft"&&r(o-1)}e.addEventListener("click",t=>{t.target===e&&i()}),e.querySelector(".lb-close").addEventListener("click",i),e.querySelector(".lb-next").addEventListener("click",()=>r(o+1)),e.querySelector(".lb-prev").addEventListener("click",()=>r(o-1)),n.forEach((t,u)=>{t.style.cursor="zoom-in",t.addEventListener("click",()=>c(u))})}export{m as a,f as i};
