/**
 * animations.js — Scroll reveal + subtle hero glitch effect
 */

// ── Scroll reveal via IntersectionObserver ──
export function initReveal() {
  const els = document.querySelectorAll('.reveal')

  // Fallback: if IntersectionObserver not supported, show everything
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'))
    return
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const siblings = [...e.target.parentElement.querySelectorAll('.reveal')]
        const idx = siblings.indexOf(e.target)
        e.target.style.transitionDelay = `${Math.min(idx * 60, 300)}ms`
        e.target.classList.add('visible')
        io.unobserve(e.target)
      }
    })
  }, {
    threshold: 0,           // fire as soon as 1px is visible
    rootMargin: '0px 0px -40px 0px'  // trigger 40px before bottom of viewport
  })

  els.forEach(el => io.observe(el))
}

// ── Hero title: occasional glitch ──
export function initHeroGlitch() {
  const title = document.getElementById('heroTitle')
  if (!title) return

  const original = title.innerHTML

  function glitch() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ█▓▒░'

    // Brief scramble
    let count = 0
    const interval = setInterval(() => {
      if (count > 6) {
        title.innerHTML = original
        clearInterval(interval)
        return
      }
      const scrambled = original.replace(/[A-Z]/g, (c) => {
        return Math.random() > 0.6
          ? chars[Math.floor(Math.random() * chars.length)]
          : c
      })
      title.innerHTML = scrambled
      count++
    }, 60)
  }

  // Trigger glitch randomly every 6–14 seconds
  function schedule() {
    const delay = 6000 + Math.random() * 8000
    setTimeout(() => {
      glitch()
      schedule()
    }, delay)
  }

  // Start after page load animation completes
  setTimeout(schedule, 2000)
}

// ── Parallax on hero + hide scroll hint ──
export function initParallax() {
  const hero      = document.querySelector('.hero-title')
  const scrollHint = document.querySelector('.hero-scroll-hint')

  window.addEventListener('scroll', () => {
    const y = window.scrollY

    // Hide scroll hint as soon as user scrolls
    if (scrollHint) {
      scrollHint.classList.toggle('hidden', y > 40)
    }

    // Parallax title (only if reduced motion not preferred)
    if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (y < window.innerHeight) {
        hero.style.transform = `translateY(${y * 0.12}px)`
        hero.style.opacity = 1 - (y / (window.innerHeight * 0.7))
      }
    }
  }, { passive: true })
}
