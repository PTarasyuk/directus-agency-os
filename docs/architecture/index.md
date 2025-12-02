# Огляд архітектури

AgencyOS побудований на базі **Nuxt 3** з використанням **Directus** як headless CMS та backend.

## Загальна архітектура

```
┌─────────────────────────────────────┐
│         Nuxt 3 Application          │
│                                     │
│  ┌─────────────┐  ┌──────────────┐  │
│  │   Frontend  │  │   Server     │  │
│  │   (SSR/SPA) │  │   (API)      │  │
│  └──────┬──────┘  └──────┬───────┘  │
│         │                │          │
└─────────┼────────────────┼──────────┘
          │                │
          │ REST API       │ Proxy
          │                │
┌─────────▼────────────────▼──────────┐
│         Directus Backend            │
│  ┌──────────┐  ┌─────────────────┐  │
│  │   CMS    │  │   Database      │  │
│  │  (Admin) │  │  (PostgreSQL)   │  │
│  └──────────┘  └─────────────────┘  │
└─────────────────────────────────────┘
```

## Ключові принципи

### 1. Модульність через Nuxt Layers

Проект розділений на незалежні layers:
- **Base Layer** — основна конфігурація
- **Portal Layer** — клієнтський портал
- **Proposals Layer** — система пропозицій

### 2. File-based Routing

Nuxt автоматично створює маршрути на основі структури `pages/`:
- `pages/index.vue` → `/`
- `pages/posts/[slug].vue` → `/posts/:slug`
- `pages/[...permalink].vue` → catch-all для динамічних сторінок

### 3. Auto-imports

Nuxt автоматично імпортує:
- Компоненти з `components/`
- Композабли з `composables/`
- Утиліти з `utils/`
- Команди Directus SDK

### 4. TypeScript First

Весь проект типізований через TypeScript з використанням типів Directus схеми.

## Потік даних

### 1. Завантаження сторінки

```
Browser Request
    ↓
Nuxt Server (SSR)
    ↓
Directus API (REST)
    ↓
PostgreSQL Database
    ↓
Response → Nuxt → Browser
```

### 2. Client-side навігація

```
User Click
    ↓
Nuxt Router
    ↓
Component Load
    ↓
useDirectus() composable
    ↓
Directus API (через proxy)
    ↓
Update UI
```

### 3. Автентифікація

```
User Login
    ↓
useDirectusAuth().login()
    ↓
Directus Auth API
    ↓
Session Cookie
    ↓
Middleware Check
    ↓
Protected Route
```

## Рендеринг

### SSR (Server-Side Rendering)

За замовчуванням всі сторінки рендеряться на сервері.

**Переваги:**
- SEO оптимізація
- Швидший перший рендер
- Доступ до server-side API

### SPA (Single Page Application)

Деякі маршрути (наприклад, `/portal/**`) використовують SPA режим:

```typescript
routeRules: {
  '/portal/**': { ssr: false },
}
```

**Переваги:**
- Швидша навігація
- Менше навантаження на сервер
- Краща UX для додатків

### SSG (Static Site Generation)

Можливе для статичних сторінок:

```typescript
routeRules: {
  '/**': { prerender: true },
}
```

## Комунікація з Directus

### Client-side

```typescript
// Через composable
const data = await useDirectus(readItems('pages'))

// Через plugin
const $directus = useNuxtApp().$directus
const data = await $directus.request(readItems('pages'))
```

### Server-side

```typescript
// Через server utils
import { directusServer, readItems } from '~/server/utils/directus-server'
const data = await directusServer.request(readItems('pages'))
```

### Proxy

Клієнтські запити проходять через `/api/proxy` для:
- CORS обробки
- Автентифікації
- Кешування

## Структура даних

### Directus Колекції

```
pages              → Сторінки сайту
pages_blocks       → Блоки сторінок
posts              → Блог пости
os_projects        → Проекти
os_tasks           → Задачі
os_invoices        → Інвойси
contacts           → Контакти
organizations      → Організації
...
```

### Типи

Всі колекції типізовані в `types/schema.ts`:

```typescript
export interface Schema {
  pages: Page[];
  posts: Post[];
  os_projects: OsProject[];
  // ...
}
```

## Наступні розділи

- [Marketing Site](/architecture/marketing-site) — як будується публічний сайт
- [Portal](/architecture/portal) — архітектура клієнтського порталу
- [Proposals](/architecture/proposals) — архітектура пропозицій
- [CRM / OS Flow](/architecture/os-crm-flow) — бізнес‑флоу від ліда до інвойсів
- [Data Schema](/architecture/data-schema) — детальний опис колекцій Directus та типів
- [Nuxt Layers](/architecture/layers) — детальний опис layers
- [File-based Routing](/architecture/routing) — маршрутизація
- [Auto-imports](/architecture/auto-imports) — автоматичний імпорт
- [Рендеринг](/architecture/rendering) — стратегії рендерингу
