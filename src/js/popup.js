import promoData from '../data/promo.json'

const PROMO_CODE = promoData.promo.code || 'WEAREHERE'
const PROMO_DEAL = promoData.promo.deal || '2 beers, pay for 1 — any night'
const PROMO_BODY = promoData.promo.body || 'Show up, say the code to the bartender.\nFirst drink is on us.'

const SHOW_DELAY  = 1800
const STORAGE_KEY = 'lh_popup_seen'

export function initPopup() {
  if (sessionStorage.getItem(STORAGE_KEY)) return

  const overlay   = document.getElementById('popupOverlay')
  const popup     = document.getElementById('popup')
  const closeBtn  = document.getElementById('popupClose')
  const revealBtn = document.getElementById('popupRevealBtn')
  const step1     = document.getElementById('popupStep1')
  const step2     = document.getElementById('popupStep2')
  const codeEl    = document.getElementById('popupCode')
  const copyBtn   = document.getElementById('popupCopyBtn')

  if (!overlay || !popup) return

  const dealEl = popup.querySelector('.popup-code-deal')
  if (codeEl) codeEl.textContent = PROMO_CODE
  if (dealEl)  dealEl.textContent = PROMO_DEAL
  const bodyEl = popup.querySelector('.popup-body')
  if (bodyEl)  bodyEl.innerHTML = PROMO_BODY.replace('\n', '<br>')

  function open() {
    overlay.removeAttribute('aria-hidden')
    overlay.classList.add('visible')
    document.body.style.overflow = 'hidden'
    setTimeout(() => closeBtn?.focus(), 400)
  }

  function close() {
    overlay.classList.remove('visible')
    overlay.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
    sessionStorage.setItem(STORAGE_KEY, '1')
  }

  function revealCode() {
    step1.classList.add('popup-step--hidden')
    step2.classList.remove('popup-step--hidden')
    if (navigator.vibrate) navigator.vibrate(40)
    if (codeEl) {
      codeEl.style.animation = 'none'
      codeEl.offsetHeight
      codeEl.style.animation = ''
    }
  }

  function copyCode() {
    navigator.clipboard.writeText(PROMO_CODE).then(() => {
      copyBtn.textContent = 'COPIED ✓'
      copyBtn.classList.add('copied')
      setTimeout(() => {
        copyBtn.textContent = 'COPY CODE'
        copyBtn.classList.remove('copied')
      }, 2500)
    }).catch(() => {
      const ta = document.createElement('textarea')
      ta.value = PROMO_CODE
      ta.style.cssText = 'position:fixed;opacity:0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      copyBtn.textContent = 'COPIED ✓'
      setTimeout(() => {
        copyBtn.textContent = 'COPY CODE'
        copyBtn.classList.remove('copied')
      }, 2500)
    })
  }

  closeBtn?.addEventListener('click', close)
  revealBtn?.addEventListener('click', revealCode)
  copyBtn?.addEventListener('click', copyCode)

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('visible')) close()
  })

  setTimeout(open, SHOW_DELAY)
}
