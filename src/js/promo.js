/**
 * promo.js — Free drink promo code reveal
 *
 * How it works:
 *  - Code is blurred on load
 *  - User clicks "tap to reveal" → glitch animation → code appears
 *  - Copy button copies code to clipboard
 *  - Change PROMO_CODE below to update the code anytime
 */

const PROMO_CODE = 'WEAREHERE'

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
      // Fallback for older browsers
      const ta = document.createElement('textarea')
      ta.value = PROMO_CODE
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      copyBtn.textContent = 'copied ✓'
      setTimeout(() => { copyBtn.textContent = 'copy' }, 2500)
    })
  })

  // Keyboard support for copy button
  copyBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') copyBtn.click()
  })
}
