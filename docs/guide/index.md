# Що таке AgencyOS?

**AgencyOS** — це open-source операційна система для управління цифровими агентствами, побудована на базі **Nuxt 3** (frontend) та **Directus** (backend/CMS).

## Основні можливості

### 🌐 Веб-сайт

- **Динамічний Page Builder** з live preview
- **Блог** з категоріями та постами
- **Динамічна генерація форм** з валідацією
- **Динамічна генерація OG зображень**
- **Повна підтримка SEO** (meta теги, sitemap, redirects, JSON-LD)
- **Глобальний пошук**
- **Підтримка темної теми**

### 💼 CRM / Project Tracker

- Організації та контакти
- Sales pipeline та активності
- Динамічний builder пропозицій
- Управління проектами та задачами
- Кастомізовані шаблони проектів
- Інвойсинг та відстеження витрат
- Кастомізовані дашборди без коду
- Автоматизація через Directus Flows

### 🏢 Клієнтський портал

- Приватний автентифікований портал для клієнтів
- Перегляд проектів, задач та файлів
- Оплата інвойсів через Stripe
- Призначення задач клієнтам

## Технологічний стек

### Core Framework
- **Nuxt 3** (v3.16.1) — Vue.js фреймворк з SSR
- **Vue 3** — реактивний UI фреймворк
- **TypeScript** (v5.8.2) — типізація

### Backend & CMS
- **Directus** (v19.1.0) — Headless CMS та API
- **PostgreSQL** — рекомендована БД

### UI/UX
- **Nuxt UI** (v2.18.2) — компонентна бібліотека
- **Tailwind CSS** (v6.13.2) — utility-first CSS
- **Headless UI** (v1.7.23) — доступні компоненти
- **FormKit** — бібліотека форм
- **@nuxt/icon** — іконки (Iconify)

### Додаткові бібліотеки
- **VueUse** (v13.0.0) — композабли та утиліти
- **VueUse Motion** (v3.0.3) — анімації
- **Stripe** (v17.7.0) — платіжна система
- **@nuxtjs/seo** (v3.0.1) — SEO оптимізація
- **@nuxt/image** (v1.10.0) — оптимізація зображень

Повний список усіх залежностей (основних та dev‑інструментів) дивіться в розділі:  
- [Зовнішні залежності](/guide/dependencies)

## Структура проекту

```
directus-agency-os/
├── components/          # Vue компоненти
├── composables/        # Vue композабли
├── layouts/            # Layout компоненти
├── layers/             # Nuxt Layers (Portal, Proposals)
├── middleware/         # Route middleware
├── modules/            # Кастомні Nuxt модулі
├── pages/              # File-based routing
├── plugins/            # Nuxt плагіни
├── server/             # Server-side код
├── types/              # TypeScript типи
└── utils/              # Утиліти
```

Детальніше про структуру: [Структура проекту](/guide/project-structure)

## Наступні кроки

- [Початок роботи](/guide/getting-started) — швидкий старт
- [Встановлення](/guide/installation) — детальні інструкції
- [Конфігурація](/guide/configuration) — налаштування проекту
- [Архітектура](/architecture/) — розуміння архітектури
