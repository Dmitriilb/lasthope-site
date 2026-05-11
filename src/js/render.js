/**
 * render.js — Inject dynamic content into the DOM
 */

import barInfoData from '../data/barInfo.json'
import drinksData from '../data/drinks.json'
import eventsData from '../data/events.json'
import reviewsData from '../data/reviews.json'
import galleryData from '../data/galleryItems.json'
import hoursData from '../data/hours.json'
import aboutPhotoData from '../data/aboutPhoto.json'

const defaultDrinks = drinksData.drinks
const defaultEvents = eventsData.events
const defaultReviews = reviewsData.reviews
const galleryItems = galleryData.galleryItems
const hours = hoursData.hours
const aboutPhoto = aboutPhotoData.aboutPhoto

const DRINKS_PREVIEW = 8

// ── Drinks ──
export function renderDrinks() {
  const grid = document.getElementById('drinksGrid')
  if (!grid) return

  grid.innerHTML = defaultDrinks.map((d, i) => `
    <article class="drink-card${d.photo ? ' drink-card--has-photo' : ''}${i >= DRINKS_PREVIEW ? ' drink-hidden' : ''}" role="listitem" data-num="${String(i + 1).padStart(2, '0')}">
      ${d.photo ? `<div class="drink-photo-wrap"><img class="drink-photo" src="${d.photo}" alt="${d.name}" loading="lazy" onerror="this.closest('.drink-photo-wrap').style.display='none'"></div>` : ''}
      <p class="drink-cat">${d.category}</p>
      <h3 class="drink-name">${d.name}</h3>
      <p class="drink-desc">${d.desc}</p>
      <p class="drink-price">${d.price}</p>
    </article>
  `).join('')

  // Render toggle button only if there are more than DRINKS_PREVIEW drinks
  const toggleWrap = document.getElementById('drinksToggleWrap')
  if (!toggleWrap) return

  if (defaultDrinks.length > DRINKS_PREVIEW) {
    const remaining = defaultDrinks.length - DRINKS_PREVIEW
    toggleWrap.innerHTML = `
      <button class="drinks-toggle-btn" aria-expanded="false">
        Full menu\u00a0(+${remaining})
      </button>
    `
    toggleWrap.querySelector('.drinks-toggle-btn').addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true'

      if (!expanded) {
        grid.querySelectorAll('.drink-hidden').forEach(card => card.classList.remove('drink-hidden'))
        this.setAttribute('aria-expanded', 'true')
        this.textContent = 'Show less'
      } else {
        Array.from(grid.children).forEach((card, i) => {
          if (i >= DRINKS_PREVIEW) card.classList.add('drink-hidden')
        })
        this.setAttribute('aria-expanded', 'false')
        this.textContent = `Full menu\u00a0(+${remaining})`
        document.getElementById('drinks').scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  } else {
    toggleWrap.innerHTML = ''
  }
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
  const block = document.getElementById('hoursRows')
  if (block && hours.schedule && hours.schedule.length) {
    block.innerHTML = hours.schedule.map(r =>
      `<div class="hours-row"><span>${r.days}</span><span>${r.time}</span></div>`
    ).join('')
  }
  const happyTag = document.querySelector('.happy-hour-tag')
  if (happyTag) {
    const h = hours.happy
    if (h && h.enabled && h.text) {
      happyTag.textContent = `HAPPY HOUR: ${h.text}`
      happyTag.style.display = ''
    } else {
      happyTag.style.display = 'none'
    }
  }
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

export function renderAboutPhoto() {
  const img = document.getElementById('aboutPhotoImg')
  const frame = document.getElementById('aboutPhotoFrame')
  if (!img || !frame) return
  if (aboutPhoto.src) img.src = aboutPhoto.src
  if (aboutPhoto.alt) img.alt = aboutPhoto.alt
  if (aboutPhoto.label) frame.dataset.label = aboutPhoto.label
}
