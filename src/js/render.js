/**
 * render.js — Inject dynamic content into the DOM
 */

import barInfoData from '../data/barInfo.json'
import drinksData from '../data/drinks.json'
import eventsData from '../data/events.json'
import reviewsData from '../data/reviews.json'
import galleryData from '../data/galleryItems.json'
import hoursData from '../data/hours.json'

const defaultDrinks = drinksData.drinks
const defaultEvents = eventsData.events
const defaultReviews = reviewsData.reviews
const galleryItems = galleryData.galleryItems
const hours = hoursData.hours

// ── Drinks ──
export function renderDrinks() {
  const grid = document.getElementById('drinksGrid')
  if (!grid) return
  grid.innerHTML = defaultDrinks.map((d, i) => `
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
const DAYS_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

export function renderEvents() {
  const list = document.getElementById('eventsList')
  if (!list) return

  const events = defaultEvents
  if (!events.length) {
    list.innerHTML = `
      <article class="event-item reveal" style="opacity:0.4">
        <div class="event-day" style="font-size:11px">TBD</div>
        <div><h3 class="event-name">No upcoming events</h3>
        <p class="event-desc">Check our Instagram for updates</p></div>
      </article>`
    return
  }

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
}

// ── Reviews ──
export function renderReviews() {
  const wall = document.getElementById('reviewsWall')
  if (!wall) return
  wall.innerHTML = defaultReviews.map(r => `
    <div class="review-card reveal">
      <p class="review-text">${r.text}</p>
      <p class="review-meta">${r.source}</p>
    </div>
  `).join('')
}

// ── Hours ──
export function renderHours() {
  const rows = document.querySelectorAll('.hours-row')
  if (rows[0]) rows[0].querySelector('span:last-child').textContent = hours.monThu || ''
  if (rows[1]) rows[1].querySelector('span:last-child').textContent = hours.friSat || ''
  if (rows[2]) rows[2].querySelector('span:last-child').textContent = hours.sun || ''
  const happyTag = document.querySelector('.happy-hour-tag')
  if (happyTag && hours.happy) happyTag.textContent = `HAPPY HOUR: ${hours.happy}`
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
