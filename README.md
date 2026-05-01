# Last Hope Bar & Cafe — Гайд по сайту

> Этот документ написан для человека, которому frontend не родная тема.
> Здесь всё: что где лежит, что редактировать, когда что-то сломалось и как работает admin-панель.

---

## Содержание

1. [Структура проекта](#1-структура-проекта)
2. [Как работает сайт — кратко](#2-как-работает-сайт--кратко)
3. [Что и где менять — тексты, данные, фото](#3-что-и-где-менять)
4. [JavaScript — какой файл за что отвечает](#4-javascript--какой-файл-за-что-отвечает)
5. [Admin-панель (Decap CMS)](#5-admin-панель-decap-cms)
6. [SEO и поиск — что уже есть и что делать](#6-seo-и-поиск)
7. [SEO для AI-агентов](#7-seo-для-ai-агентов)
8. [Деплой и сборка](#8-деплой-и-сборка)
9. [Частые проблемы и как чинить](#9-частые-проблемы-и-как-чинить)

---

## 1. Структура проекта

```
last-hope/
│
├── index.html                  ← Главная страница (HTML-скелет + SEO-теги)
├── vite.config.js              ← Настройки сборщика (не трогать)
├── package.json                ← Зависимости (не трогать)
├── .env.example                ← Шаблон переменных окружения
│
├── public/                     ← Файлы, которые идут на сервер AS IS
│   ├── robots.txt              ← Правила для поисковых роботов и AI
│   ├── sitemap.xml             ← Карта сайта для Google
│   ├── site.webmanifest        ← PWA-манифест (иконки для телефона)
│   ├── favicon.svg             ← Иконка во вкладке браузера (SVG)
│   ├── icon-192.png            ← Иконка для Android / Google Search
│   ├── icon-512.png            ← Иконка для PWA
│   ├── apple-touch-icon.png    ← Иконка для iPhone (и Google Search!)
│   ├── og-image.jpg            ← ⚠️ НУЖНО ДОБАВИТЬ — фото 1200×630px для превью
│   ├── photos/                 ← Фотографии бара
│   │   ├── interior-1.jpg
│   │   ├── neon.jpg
│   │   └── ...
│   └── admin/                  ← Admin-панель (Decap CMS)
│       ├── index.html          ← Интерфейс CMS (не трогать)
│       └── config.yml          ← Конфиг CMS — что редактируется в панели
│
└── src/                        ← Исходный код
    ├── css/
    │   └── main.css            ← Все стили сайта
    ├── assets/
    │   └── photo-placeholder.svg
    ├── data/                   ← ВСЕ ДАННЫЕ САЙТА в JSON-файлах
    │   ├── barInfo.json        ← Название, адрес, координаты, соцсети
    │   ├── drinks.json         ← Меню напитков
    │   ├── events.json         ← События/расписание
    │   ├── reviews.json        ← Отзывы
    │   ├── galleryItems.json   ← Галерея (список фото и подписи)
    │   ├── hours.json          ← Часы работы
    │   ├── promo.json          ← Промо-код и описание акции
    │   └── aboutPhoto.json     ← Фото в секции About
    └── js/
        ├── main.js             ← Точка входа — запускает всё остальное
        ├── render.js           ← Берёт данные из /data/ и вставляет в HTML
        ├── nav.js              ← Навигация, бургер-меню, активные ссылки
        ├── fab.js              ← Плавающая кнопка (Maps/Instagram/Telegram)
        ├── animations.js       ← Анимации: появление при скролле, глитч заголовка
        ├── promo.js            ← Логика промо-блока (кнопка reveal + копирование)
        └── popup.js            ← Всплывающее окно при первом открытии сайта
```

---

## 2. Как работает сайт — кратко

Сайт — **статический** (без бэкенда, без базы данных). Работает так:

1. Браузер открывает `index.html` — это скелет страницы с HTML-структурой
2. Vite собирает все JS-файлы в один бандл
3. При загрузке `main.js` запускает все модули по очереди:
   - `render.js` читает JSON-файлы из `src/data/` и вставляет напитки, события, отзывы и галерею в нужные места в HTML
   - `nav.js` делает навигацию рабочей (бургер на мобиле, подсветка активного раздела)
   - `fab.js` делает кнопку связи внизу справа
   - `animations.js` — плавное появление элементов при скролле
   - `promo.js` — кнопка "reveal" на промо-блоке
   - `popup.js` — всплывашка при первом открытии

**Итог:** чтобы поменять текст на сайте — нужно поменять либо JSON-файл в `src/data/`, либо HTML в `index.html`. JS трогать не нужно почти никогда.

---

## 3. Что и где менять

### Тексты главной страницы (hero, about, заголовки секций)

Файл: `index.html`

```
Строка 125: <p class="hero-eyebrow">// Đà Nẵng, Vietnam //</p>
            ↑ Маленький текст над заголовком LAST HOPE

Строка 126: <h1 class="hero-title">LAST<br>HOPE</h1>
            ↑ Главный заголовок (LAST HOPE). <br> — перенос строки.

Строка 128: <p class="hero-tagline">"We Are Here"</p>
            ↑ Слоган под заголовком

Строка 145: <h2>A place<br>that <em>exists</em></h2>
            ↑ Заголовок секции About. <em> делает курсив.

Строки 147–153: <p class="about-body">...</p>
            ↑ Два абзаца описания бара в секции About
```

**Как редактировать:**
Открой `index.html` в любом текстовом редакторе (VS Code, Notepad++).
Найди нужный текст через Ctrl+F и замени. Не трогай HTML-теги (`<p>`, `<h1>` и т.д.) — только текст между ними.

---

### Напитки (меню)

Файл: `src/data/drinks.json`

```json
{
  "drinks": [
    {
      "category": "Signature",
      "name": "Last Hope Negroni",
      "desc": "Dry gin · sweet vermouth · Campari · orange zest",
      "price": "135,000 ₫"
    }
  ]
}
```

Чтобы добавить напиток — скопируй один блок `{ ... }` и вставь после, разделив запятой.
Чтобы удалить — удали весь блок вместе с запятой.

---

### События / расписание

Файл: `src/data/events.json`

```json
{
  "events": [
    {
      "day": "FRIDAY",
      "name": "Open Mic Night",
      "desc": "Bring your guitar...",
      "time": "9 PM"
    }
  ]
}
```

Если `events` — пустой массив `[]`, сайт покажет "No upcoming events. Check our Instagram."

---

### Отзывы

Файл: `src/data/reviews.json`

```json
{
  "reviews": [
    {
      "text": "\"The kind of bar that makes you forget you have a flight.\"",
      "source": "TripAdvisor — ★★★★★"
    }
  ]
}
```

Обрати внимание: кавычки внутри текста нужно экранировать как `\"`.

---

### Часы работы

Файл: `src/data/hours.json`

```json
{
  "hours": {
    "monThu": "5 PM — 2 AM",
    "friSat": "5 PM — 4 AM",
    "sun": "3 PM — 1 AM",
    "happy": "Every day 5–7 PM"
  }
}
```

---

### Промо-код

Файл: `src/data/promo.json`

```json
{
  "promo": {
    "code": "HEREWEARE",
    "deal": "2 beers, pay for 1 — any night",
    "body": "Show up, say the code to the bartender.\nFirst drink is on us."
  }
}
```

---

### Фотографии галереи

Файл: `src/data/galleryItems.json`

```json
{
  "galleryItems": [
    {
      "label": "Interior",
      "src": "/photos/interior-1.jpg",
      "alt": "Last Hope Bar interior..."
    }
  ]
}
```

Файлы фото кладутся в `public/photos/`. Имя файла в JSON должно точно совпадать с именем файла.

---

### Фото в секции About (большое фото слева)

Файл: `src/data/aboutPhoto.json`

```json
{
  "aboutPhoto": {
    "src": "/photos/interior-1.jpg",
    "alt": "Last Hope Bar interior",
    "label": "Interior — Last Hope"
  }
}
```

---

### Информация о баре (адрес, соцсети, координаты)

Файл: `src/data/barInfo.json`

```json
{
  "barInfo": {
    "name": "Last Hope Bar & Cafe",
    "address": "111 Châu Thị Vĩnh Tế, Ngũ Hành Sơn, Đà Nẵng 550000",
    "lat": 16.0493625,
    "lng": 108.2409343,
    "placeId": "0x3142...",
    "mapsUrl": "https://...",
    "instagram": "lasthope.247",
    "telegram": "placeholder"
  }
}
```

---

### SEO-данные

Файл: `index.html`, строки 13–80

```html
<title>Last Hope Bar & Cafe — Đà Nẵng, Vietnam</title>
↑ Заголовок вкладки и в Google (до ~60 символов!)

<meta name="description" content="...">
↑ Описание под заголовком в Google (до ~160 символов)

<meta property="og:image" content="https://lasthope.bar/og-image.jpg">
↑ Фото для превью при шаринге — файл public/og-image.jpg
```

---

## 4. JavaScript — какой файл за что отвечает

Тебе скорее всего не придётся трогать JS. Но если что-то сломалось — вот карта:

| Файл | Что делает | Когда трогать |
|------|-----------|---------------|
| `main.js` | Точка входа — вызывает все модули | Никогда |
| `render.js` | Берёт JSON и вставляет в HTML (напитки, события, отзывы, галерея) | Если нужно изменить HTML-шаблон карточки |
| `nav.js` | Навигация: бургер-меню, подсветка раздела при скролле | Если сломалась навигация |
| `fab.js` | Плавающая кнопка (иконка чата) → меню Maps/Instagram/Telegram | Если нужно добавить/убрать кнопку из меню |
| `animations.js` | (1) Элементы появляются при скролле; (2) глитч-эффект на заголовке LAST HOPE | Если анимации мешают или нужно убрать глитч |
| `promo.js` | Кнопка "Tap to reveal code" → показывает код → кнопка копирования | Если сломался промо-блок |
| `popup.js` | Всплывашка при первом открытии (раз в сессию) | Если нужно изменить задержку или отключить |

### Как JS связан с HTML

В `index.html` у элементов есть `id` — это "якоря" для JS. Если удалишь `id` — JS перестанет находить элемент:

```
id="drinksGrid"     ← render.js вставляет сюда карточки напитков
id="eventsList"     ← render.js вставляет сюда события
id="reviewsWall"    ← render.js вставляет сюда отзывы
id="galleryMosaic"  ← render.js вставляет сюда галерею
id="heroTitle"      ← animations.js вешает на него глитч-эффект
id="fabBtn"         ← fab.js вешает на него клик (открыть/закрыть меню)
id="popupOverlay"   ← фон всплывашки
id="promoRevealBtn" ← кнопка раскрытия промо-кода
```

---

## 5. Admin-панель (Decap CMS)

### Что это

Admin-панель (`/admin`) — Decap CMS. Визуальный интерфейс для редактирования JSON-файлов без написания кода. Каждое сохранение в панели делает коммит в Git и запускает деплой.

### Как попасть

URL: `https://lasthope.bar/admin`

Требует авторизации через Netlify Identity (настраивается в Netlify Dashboard → Identity).

### Что можно редактировать в панели

| Раздел в панели | Файл | Что там |
|-----------------|------|---------|
| **Bar info** | `src/data/barInfo.json` | Адрес, координаты, Instagram, Telegram |
| **About photo** | `src/data/aboutPhoto.json` | Фото в секции About |
| **Drinks** | `src/data/drinks.json` | Всё меню |
| **Events** | `src/data/events.json` | Расписание событий |
| **Reviews** | `src/data/reviews.json` | Отзывы |
| **Gallery** | `src/data/galleryItems.json` | Список фото и подписи |
| **Promo** | `src/data/promo.json` | Промо-код и текст акции |
| **Hours** | `src/data/hours.json` | Часы работы |

### Как менять отображение панели

Всё, что видишь в панели — определяется в `public/admin/config.yml`.

Пример — добавить новое поле в напиток:

```yaml
# в config.yml, блок drinks → fields → добавить:
- { label: "Алкогольный?", name: "alcoholic", widget: "boolean" }
```

После этого в панели появится чекбокс. Чтобы значение появилось на сайте — нужно также обновить шаблон в `src/js/render.js`.

### Типы виджетов в config.yml

| widget | Что показывает | Для чего |
|--------|---------------|---------|
| `string` | Однострочный инпут | Название, цена, время |
| `text` | Многострочный текст | Описание, отзыв |
| `image` | Загрузка фото | Фото бара |
| `boolean` | Чекбокс (да/нет) | Флаги |
| `number` | Числовое поле | Координаты |
| `object` | Группа полей | Вложенные данные |
| `list` | Список (добавить/удалить) | Массив напитков/событий |

---

## 6. SEO и поиск

### Что уже настроено

| Что | Где | Статус |
|-----|-----|--------|
| Title + description | `index.html` | ✅ |
| Open Graph (превью при шаринге) | `index.html` | ✅ (нужен `og-image.jpg`) |
| Twitter Card | `index.html` | ✅ |
| Schema.org BarOrPub | `index.html` | ✅ |
| Канонический URL | `index.html` | ✅ |
| Геотеги | `index.html` | ✅ |
| Hreflang en/vi | `index.html` | ✅ |
| Sitemap | `public/sitemap.xml` | ✅ |
| Robots.txt | `public/robots.txt` | ✅ |
| Иконка в Google Search | `public/apple-touch-icon.png` | ✅ |
| og-image.jpg | `public/og-image.jpg` | ❌ НУЖНО ДОБАВИТЬ |

### Что сделать после деплоя

1. **Добавить `og-image.jpg`** — фото бара 1200×630px в папку `public/`. Это фото показывается когда ссылкой делишься в Telegram/соцсетях.

2. **Google Business Profile** — [business.google.com](https://business.google.com). Это самое важное для локального поиска "bar da nang". Здесь же появляется бар на Картах.

3. **Google Search Console** — [search.google.com/search-console](https://search.google.com/search-console). Добавить сайт, отправить `https://lasthope.bar/sitemap.xml` через Sitemaps. Ускоряет индексирование.

4. **Обновлять `<lastmod>` в sitemap** при больших изменениях — файл `public/sitemap.xml`.

### Правила для title и description

- **Title** — до 60 символов, Google обрежет длиннее
- **Description** — до 160 символов

---

## 7. SEO для AI-агентов

AI-поисковики (Perplexity, ChatGPT Search, Google AI Overview) и LLM-боты сканируют сайты.

### Что уже сделано

В `public/robots.txt` прописаны все основные AI-боты с разрешением:
- `GPTBot` (OpenAI)
- `ChatGPT-User` (OpenAI browsing)
- `Google-Extended` (Gemini)
- `anthropic-ai` + `ClaudeBot` (Claude)
- `PerplexityBot`
- `CCBot` (Common Crawl — датасет для обучения LLM)
- `YouBot`, `Bytespider`

### Как AI читает сайт

AI-агенты смотрят на:
1. **Schema.org** в `<script type="application/ld+json">` — машиночитаемое описание: тип заведения, адрес, часы, координаты. Уже заполнено.
2. **Текст страницы** — чёткий, с реальным адресом и городом. Уже есть.
3. **`robots.txt`** — разрешение/запрет на сканирование. Уже есть.

### Если хочешь ЗАПРЕТИТЬ использование для обучения AI

В `public/robots.txt` замени `Allow: /` на `Disallow: /` для нужных ботов. Большинство честных ботов это соблюдают.

---

## 8. Деплой и сборка

### Локальная разработка

```bash
cd last-hope
npm install       # первый раз
npm run dev       # запускает на http://localhost:3000
```

### Сборка для продакшена

```bash
npm run build     # создаёт папку dist/
npm run preview   # посмотреть production-билд локально
```

### Деплой на Netlify

**Через Git (рекомендуется):** пуш в GitHub → Netlify автоматически собирает и публикует.

**Вручную:** `npm run build` → перетащить папку `dist/` в Netlify Dashboard → Deploys.

### Переменные окружения (Netlify Dashboard → Environment variables)

| Переменная | Что это |
|-----------|---------|
| `ADMIN_PASSWORD_HASH` | SHA-256 хэш пароля для admin-панели |

Сгенерировать хэш нового пароля:
```bash
node -e "const c=require('crypto');console.log(c.createHash('sha256').update('ВАШ_ПАРОЛЬ').digest('hex'))"
```

---

## 9. Частые проблемы и как чинить

### "Поменял JSON, но на сайте ничего не изменилось"

Жёсткая перезагрузка: `Ctrl+Shift+R`. При деплое на Netlify — подожди 1–2 минуты.

---

### "Сломалась навигация / бургер не открывается"

Проверь что в `index.html` есть элементы с id: `nav`, `navLinks`, `burgerBtn`. Если переименовал — верни обратно.

---

### "Не показываются напитки / события / отзывы"

**Причина 1 — ошибка в JSON.** Проверить: [jsonlint.com](https://jsonlint.com) — вставь файл, нажми Validate.

**Причина 2 — удалён id-контейнер в HTML.** render.js ищет: `drinksGrid`, `eventsList`, `reviewsWall`, `galleryMosaic`.

---

### "Фото не отображаются"

1. Файл лежит в `public/photos/`?
2. Имя в JSON (`"src": "/photos/ИМЯ.jpg"`) совпадает с реальным (регистр важен)?
3. Формат — jpg, webp или png?

---

### "Всплывашка показывается каждый раз"

Нормально при разработке. Сбросить: F12 → Application → Session Storage → удали ключ `lh_popup_seen`.

---

### "Сайт не индексируется Google"

1. Проверь `<meta name="robots" content="index, follow">` в `index.html`
2. Google Search Console → URL inspection → Request indexing
3. Убедись что sitemap.xml отправлен в Search Console
4. Google индексирует новые сайты 1–4 недели

---

### "Admin-панель не открывается"

Токен сессии живёт 8 часов. Просто введи пароль снова.
Если пароль забыт — обнови `ADMIN_PASSWORD_HASH` в Netlify и сделай redeploy.

---

### Как читать ошибки браузера

`F12` → вкладка **Console** → красные строки = ошибки JS. Там будет имя файла и номер строки — это самый быстрый способ понять что не так.

---

## Полезные ссылки

| Что | Ссылка |
|-----|--------|
| Проверить JSON | [jsonlint.com](https://jsonlint.com) |
| Проверить Schema.org | [search.google.com/test/rich-results](https://search.google.com/test/rich-results) |
| Проверить Open Graph | [opengraph.xyz](https://opengraph.xyz) |
| Google Search Console | [search.google.com/search-console](https://search.google.com/search-console) |
| Google Business Profile | [business.google.com](https://business.google.com) |
| Документация Decap CMS | [decapcms.org/docs](https://decapcms.org/docs) |

---

*Last updated: 2026 · Last Hope Bar & Cafe · Đà Nẵng, Vietnam*
