/**
 * render.js — Inject dynamic content into the DOM
 * Checks localStorage for admin overrides first, falls back to data.js defaults.
 */

import { drinks as defaultDrinks, events as defaultEvents, reviews as defaultReviews, galleryItems } from './data.js'

// ── Load data: localStorage override or default ──
function loadData(key, fallback) {
  try {
    const stored = localStorage.getItem(`lh_${key}`)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

// ── Drinks ──
export function renderDrinks() {
  const grid = document.getElementById('drinksGrid')
  if (!grid) return
  const drinks = loadData('drinks', defaultDrinks)
  grid.innerHTML = drinks.map((d, i) => `
    <article class="drink-card" role="listitem" data-num="${String(i + 1).padStart(2, '0')}">
      <p class="drink-cat">${d.category}</p>
      <h3 class="drink-name">${d.name}</h3>
      <p class="drink-desc">${d.desc}</p>
      <p class="drink-price">${d.price}</p>
    </article>
  `).join('')
}

// ── Events ──
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAYS_SHORT   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

export function renderEvents() {
  const list = document.getElementById('eventsList')
  if (!list) return

  // Try new events_v2 format (from events.html panel)
  let events = null
  try {
    const v2 = localStorage.getItem('lh_events_v2')
    if (v2) {
      const parsed = JSON.parse(v2)
      if (Array.isArray(parsed) && parsed.length) {
        // Sort by datetime, filter out events older than 6 hours
        const cutoff = Date.now() - 1000 * 60 * 60 * 6
        events = parsed
          .filter(e => new Date(e.datetime).getTime() > cutoff)
          .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
      }
    }
  } catch {}

  // Fallback to old format or data.js defaults
  if (!events) {
    events = loadData('events', defaultEvents)
    // Old format: render as-is
    list.innerHTML = events.map(e => `
      <article class="event-item reveal">
        <div class="event-day">${e.day}</div>
        <div>
          <h3 class="event-name">${e.name}</h3>
          <p class="event-desc">${e.desc || ''}</p>
        </div>
        <div class="event-time">${e.time}</div>
      </article>
    `).join('')
    return
  }

  if (!events.length) {
    list.innerHTML = `
      <article class="event-item reveal" style="opacity:0.4">
        <div class="event-day" style="font-size:11px">TBD</div>
        <div><h3 class="event-name">No upcoming events</h3>
        <p class="event-desc">Check our Instagram for updates</p></div>
      </article>`
    return
  }

  list.innerHTML = events.map(e => {
    const d    = new Date(e.datetime)
    const day  = DAYS_SHORT[d.getDay()]
    const date = d.getDate()
    const mon  = MONTHS_SHORT[d.getMonth()]
    const h    = d.getHours().toString().padStart(2,'0')
    const m    = d.getMinutes().toString().padStart(2,'0')
    const timeStr = e.endTime ? `${h}:${m} — ${e.endTime}` : `${h}:${m}`

    // Is today?
    const isToday = new Date().toDateString() === d.toDateString()

    return `
      <article class="event-item reveal">
        <div class="event-day">${day}<br><span style="font-size:18px;font-family:var(--ff-display)">${date}</span><br><span style="font-size:9px">${mon}</span></div>
        <div>
          <h3 class="event-name">${e.name}${isToday ? ' <span style="font-size:10px;color:#4caf7d;letter-spacing:2px">TONIGHT</span>' : ''}</h3>
          <p class="event-desc">Starts ${timeStr}</p>
        </div>
        <div class="event-time">${timeStr}</div>
      </article>
    `
  }).join('')
}

// ── Reviews ──
export function renderReviews() {
  const wall = document.getElementById('reviewsWall')
  if (!wall) return
  const reviews = loadData('reviews', defaultReviews)
  wall.innerHTML = reviews.map(r => `
    <div class="review-card reveal">
      <p class="review-text">${r.text}</p>
      <p class="review-meta">${r.source}</p>
    </div>
  `).join('')
}

// ── Hours (update DOM if admin saved custom hours) ──
export function renderHours() {
  try {
    const stored = localStorage.getItem('lh_hours')
    if (!stored) return
    const h = JSON.parse(stored)
    const rows = document.querySelectorAll('.hours-row')
    if (rows[0]) rows[0].querySelector('span:last-child').textContent = h.monThu || ''
    if (rows[1]) rows[1].querySelector('span:last-child').textContent = h.friSat || ''
    if (rows[2]) rows[2].querySelector('span:last-child').textContent = h.sun    || ''
    const happyTag = document.querySelector('.happy-hour-tag')
    if (happyTag && h.happy) happyTag.textContent = `HAPPY HOUR: ${h.happy}`
  } catch {}
}
export function renderGallery() {
  const mosaic = document.getElementById('galleryMosaic')
  if (!mosaic) return
  mosaic.innerHTML = galleryItems.map(item => `
    <div class="gallery-item reveal">
      <img
        src="${item.src}"
        alt="${item.alt}"
        loading="lazy"
        onerror="this.style.display='none'"
      />
      <span class="gallery-item-label">${item.label}</span>
    </div>
  `).join('')
}
