/**
 * nav.js — Navigation: sticky scroll style, mobile burger, drawer
 */

export function initNav() {
  const nav = document.getElementById('nav')
  const burger = document.getElementById('burger')
  const drawer = document.getElementById('drawer')
  const overlay = document.getElementById('drawerOverlay')
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .drawer a[href^="#"]')

  // ── Sticky scroll tint ──
  let lastY = 0
  window.addEventListener('scroll', () => {
    const y = window.scrollY
    if (y > 60) {
      nav.style.borderBottomColor = 'rgba(242,240,235,0.15)'
    } else {
      nav.style.borderBottomColor = 'rgba(242,240,235,0.08)'
    }
    lastY = y
  }, { passive: true })

  // ── Burger / drawer ──
  function openDrawer() {
    drawer.classList.add('open')
    overlay.classList.add('visible')
    burger.classList.add('open')
    burger.setAttribute('aria-expanded', 'true')
    document.body.style.overflow = 'hidden'
  }
  function closeDrawer() {
    drawer.classList.remove('open')
    overlay.classList.remove('visible')
    burger.classList.remove('open')
    burger.setAttribute('aria-expanded', 'false')
    document.body.style.overflow = ''
  }

  burger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer()
  })
  overlay.addEventListener('click', closeDrawer)

  // Close drawer on nav link click
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeDrawer)
  })

  // ── Active link on scroll ──
  const sections = document.querySelectorAll('section[id]')
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]')

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`)
        })
      }
    })
  }, { rootMargin: '-40% 0px -55% 0px' })

  sections.forEach(s => io.observe(s))
}
