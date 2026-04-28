/**
 * main.js — Entry point for Last Hope Bar landing page
 *
 * Modules:
 *  nav.js       — navigation, burger menu, active link
 *  render.js    — inject drinks, events, reviews, gallery from data.js
 *  fab.js       — floating contact button
 *  animations.js — scroll reveal, hero glitch, parallax
 */

import '../css/main.css'
import { initNav } from './nav.js'
import { renderDrinks, renderEvents, renderReviews, renderGallery, renderHours } from './render.js'
import { initFab } from './fab.js'
import { initReveal, initHeroGlitch, initParallax } from './animations.js'
import { initPromo } from './promo.js'
import { initPopup } from './popup.js'

document.addEventListener('DOMContentLoaded', () => {
  // Render dynamic content first (so reveal targets exist)
  renderDrinks()
  renderEvents()
  renderReviews()
  renderGallery()
  renderHours()

  // Add .reveal to all sections except hero
  document.querySelectorAll('.section, .promo-section').forEach(s => {
    if (!s.classList.contains('hero')) s.classList.add('reveal')
  })

  // Init behaviours
  initNav()
  initFab()
  initPromo()
  initPopup()
  initReveal()
  initHeroGlitch()
  initParallax()

  // Dynamic footer year
  const yearEl = document.getElementById('footerYear')
  if (yearEl) yearEl.textContent = new Date().getFullYear()

  console.log('%cLAST HOPE BAR', 'font-size:22px;font-weight:bold;color:#f2f0eb;background:#0a0a0a;padding:8px 16px;')
  console.log('%cDa Nang · Vietnam · Open nightly', 'font-size:12px;color:#888;background:#0a0a0a;padding:4px 16px 8px;')
})
