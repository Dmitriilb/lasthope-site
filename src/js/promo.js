import promoData from '../data/promo.json'

const PROMO_CODE = promoData.promo.code || 'WEAREHERE'

export function initPromo() {
  const revealBtn  = document.getElementById('promoRevealBtn')
  const blurOverlay = document.getElementById('promoBlur')
  const codeEl     = document.getElementById('promoCode')
  const subEl      = document.getElementById('promoSub')
  const copyBtn    = document.getElementById('promoCopyBtn')

  if (!revealBtn || !codeEl) return

  // Set code text (single source of truth)
  codeEl.textContent = PROMO_CODE

  let revealed = false

  // ── Reveal ──
  function reveal() {
    if (revealed) return
    revealed = true

    // Hide overlay
    blurOverlay.classList.add('hidden')

    // Animate code
    codeEl.classList.remove('blurred')
    codeEl.classList.add('revealed')

    // Show subtitle
    subEl.classList.add('visible')

    // Brief haptic on mobile
    if (navigator.vibrate) navigator.vibrate(40)
  }

  revealBtn.addEventListener('click', reveal)

  // ── Copy to clipboard ──
  copyBtn.addEventListener('click', () => {
    if (!revealed) {
      reveal()
      return
    }
    navigator.clipboard.writeText(PROMO_CODE).then(() => {
      copyBtn.textContent = 'copied ✓'
      copyBtn.classList.add('copied')
      setTimeout(() => {
        copyBtn.textContent = 'copy'
        copyBtn.classList.remove('copied')
      }, 2500)
    }).catch(() => {
      const ta = document.createElement('textarea')
      ta.value = PROMO_CODE
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      copyBtn.textContent = 'copied ✓'
      setTimeout(() => {
        copyBtn.textContent = 'copy'
        copyBtn.classList.remove('copied')
      }, 2500)
    })
  })

  copyBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') copyBtn.click()
  })
}
