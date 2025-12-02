# Модуль Directus

Кастомний Nuxt модуль для інтеграції з Directus.

## Огляд

Модуль `modules/directus/` надає:
- Автоматичний імпорт команд Directus SDK
- Автентифікацію користувачів
- Композабли для роботи з Directus
- Плагіни для ініціалізації
- Middleware для автентифікації

## Структура модуля

```
modules/directus/
├── index.ts                    # Конфігурація модуля
└── runtime/
    ├── composables/           # Композабли
    │   ├── useDirectus.ts
    │   ├── useDirectusAuth.ts
    │   └── useFiles.ts
    ├── plugins/               # Плагіни
    │   ├── directus.ts
    │   └── auth.ts
    ├── middleware/            # Middleware
    │   ├── auth.ts
    │   ├── common.ts
    │   └── guest.ts
    └── types/                 # Типи
        └── modules.d.ts
```

## Конфігурація

### В `nuxt.config.ts`

```typescript
directus: {
  rest: {
    baseUrl: process.env.DIRECTUS_URL || 'http://localhost:8055',
    nuxtBaseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  auth: {
    enabled: true,
    enableGlobalAuthMiddleware: false,
    userFields: ['*', { contacts: ['*'] }],
    redirect: {
      login: '/auth/signin',
      logout: '/',
      home: '/portal',
      resetPassword: '/auth/reset-password',
      callback: '/auth/callback',
    },
  },
}
```

### Параметри

#### `rest.baseUrl`
URL вашого Directus інстансу.

#### `rest.nuxtBaseUrl`
Базовий URL Nuxt додатку.

#### `auth.enabled`
Увімкнути автентифікацію.

#### `auth.enableGlobalAuthMiddleware`
Застосовувати auth middleware на всіх сторінках.

#### `auth.userFields`
Поля користувача для завантаження.

#### `auth.redirect`
Маршрути для redirect після автентифікації.

## Що робить модуль

### 1. Автоматичний імпорт команд SDK

Модуль автоматично імпортує команди Directus SDK:

```typescript
// Доступні глобально без імпорту
const pages = await readItems('pages')
const page = await readItem('pages', 'id')
const user = await readMe()
// ...
```

### 2. Ініціалізація Directus клієнта

Створює Directus клієнт через плагін:

```typescript
// plugins/directus.ts
const directus = createDirectus<Schema>(baseUrl)
  .with(authentication('session'))
  .with(rest())
```

### 3. Завантаження Redirects

Під час збірки завантажує redirects з Directus:

```typescript
const redirects = await directus.request(readItems('redirects'))
// Додає в routeRules
```

### 4. Завантаження Globals

Завантажує globals в appConfig:

```typescript
const globals = await directus.request(readSingleton('globals'))
nuxt.options.appConfig.globals = globals
```

## Наступні розділи

- [Конфігурація](/modules/configuration) — детальна конфігурація
- [Композабли](/modules/composables) — використання композаблів
- [Плагіни](/modules/plugins) — як працюють плагіни
- [Middleware](/modules/middleware) — автентифікація та захист маршрутів
