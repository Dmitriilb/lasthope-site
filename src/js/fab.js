/**
 * fab.js — Floating action button (Maps, Instagram, Telegram, Zalo)
 */

const ICON_CHAT = `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
const ICON_CLOSE = `<line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`

export function initFab() {
  const fabBtn  = document.getElementById('fabBtn')
  const fabMenu = document.getElementById('fabMenu')
  const fabSvg  = fabBtn?.querySelector('svg')

  if (!fabBtn || !fabMenu) return

  let isOpen = false

  function open() {
    isOpen = true
    fabMenu.classList.add('open')
    fabBtn.classList.add('open')
    fabBtn.setAttribute('aria-expanded', 'true')
    fabMenu.setAttribute('aria-hidden', 'false')
    if (fabSvg) fabSvg.innerHTML = ICON_CLOSE
  }

  function close() {
    isOpen = false
    fabMenu.classList.remove('open')
    fabBtn.classList.remove('open')
    fabBtn.setAttribute('aria-expanded', 'false')
    fabMenu.setAttribute('aria-hidden', 'true')
    if (fabSvg) fabSvg.innerHTML = ICON_CHAT
  }

  fabBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    isOpen ? close() : open()
  })

  document.addEventListener('click', (e) => {
    if (isOpen && !e.target.closest('.fab')) close()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) close()
  })
}
