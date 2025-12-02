# Модуль Directus

Модуль `modules/directus/` забезпечує інтеграцію AgencyOS з Directus, надаючи автоматичний імпорт команд SDK, автентифікацію та композабли.

## Огляд

Модуль Directus:
- Автоматично імпортує команди Directus SDK
- Налаштовує автентифікацію
- Завантажує redirects та globals
- Надає композабли для роботи з Directus

## Конфігурація

### В nuxt.config.ts

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

### Environment Variables

```txt
DIRECTUS_URL="https://your-instance.directus.app"
DIRECTUS_SERVER_TOKEN="your_static_token"
```

## Структура модуля

```
modules/directus/
├── index.ts                    # Конфігурація модуля
└── runtime/
    ├── composables/
    │   ├── useDirectus.ts      # Directus клієнт
    │   ├── useDirectusAuth.ts  # Автентифікація
    │   └── useFiles.ts         # Робота з файлами
    ├── plugins/
    │   ├── directus.ts         # Ініціалізація Directus
    │   └── auth.ts             # Ініціалізація автентифікації
    ├── middleware/
    │   ├── auth.ts             # Auth middleware
    │   ├── common.ts           # Common middleware
    │   └── guest.ts            # Guest middleware
    └── types/
        └── modules.d.ts        # TypeScript типи
```

## Автоматичний імпорт команд SDK

Модуль автоматично імпортує всі необхідні команди Directus SDK:

```typescript
// Автоматично доступні:
import {
  readItems,
  createItem,
  updateItem,
  deleteItem,
  readSingleton,
  // ... інші команди
} from '@directus/sdk'
```

**Доступні команди:**

- **Items**: `readItems`, `createItem`, `updateItem`, `deleteItem`
- **Singletons**: `readSingleton`, `updateSingleton`
- **Files**: `readFiles`, `uploadFiles`, `deleteFiles`
- **Users**: `readUsers`, `createUser`, `updateUser`
- **Auth**: `login`, `logout`, `passwordReset`
- **Me**: `readMe`, `updateMe`

## Композабли

### useDirectus

Повертає Directus клієнт:

```typescript
const directus = useDirectus()

// Використання
const pages = await directus.request(
  readItems('pages')
)
```

**Альтернатива:**

```typescript
// Використовуйте useDirectus() wrapper
const pages = await useDirectus(
  readItems('pages', {
    fields: ['*'],
  })
)
```

### useDirectusAuth

Автентифікація користувачів:

```typescript
const {
  user,           // Ref<User | null>
  login,          // (email, password) => Promise
  logout,         // () => Promise
  fetchUser,      // () => Promise
  isAuthenticated // Computed<boolean>
} = useDirectusAuth()
```

**Приклад використання:**

```vue
<script setup>
const { login, logout, user, isAuthenticated } = useDirectusAuth()

// Логін
async function handleLogin() {
  await login('user@example.com', 'password')
}

// Логout
async function handleLogout() {
  await logout()
}

// Перевірка автентифікації
if (isAuthenticated.value) {
  console.log('User is logged in:', user.value)
}
</script>
```

### useFiles

Робота з файлами:

```typescript
const { fileUrl, thumbnailUrl } = useFiles()

// Отримати URL файлу
const url = fileUrl(fileId)

// Отримати thumbnail
const thumb = thumbnailUrl(fileId, { width: 200, height: 200 })
```

**Приклад:**

```vue
<template>
  <img :src="fileUrl(imageId)" alt="Image" />
</template>

<script setup>
const { fileUrl } = useFiles()
const imageId = 'file-id-here'
</script>
```

## Плагіни

### directus.ts

Ініціалізує Directus клієнт:

```typescript
// modules/directus/runtime/plugins/directus.ts
export default defineNuxtPlugin((nuxtApp) => {
  const directus = createDirectus<Schema>(baseUrl)
    .with(authentication('session'))
    .with(rest())

  nuxtApp.provide('directus', directus)
})
```

**Особливості:**

- Використовує session-based автентифікацію
- Підтримує live preview через query параметри
- Автоматично налаштовує proxy для CORS

### auth.ts

Ініціалізує автентифікацію:

```typescript
// modules/directus/runtime/plugins/auth.ts
export default defineNuxtPlugin(async () => {
  // Реєструє middleware
  addRouteMiddleware('auth', auth)
  addRouteMiddleware('guest', guest)

  // Завантажує користувача при старті
  await fetchUser()
})
```

## Middleware

### auth.ts

Захищає маршрути, вимагаючи автентифікації:

```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useDirectusAuth()

  if (!isAuthenticated.value) {
    return navigateTo('/auth/signin')
  }
})
```

**Використання:**

```vue
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
```

### guest.ts

Забороняє доступ автентифікованим користувачам:

```typescript
// middleware/guest.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useDirectusAuth()

  if (isAuthenticated.value) {
    return navigateTo('/portal')
  }
})
```

### common.ts

Глобальний middleware для загальної логіки.

## Завантаження даних при старті

### Redirects

Модуль автоматично завантажує redirects з Directus:

```typescript
// modules/directus/index.ts
const redirects = await directus.request(readItems('redirects'))

for (const redirect of redirects) {
  extendRouteRules(redirect.url_old, {
    redirect: {
      to: redirect.url_new,
      statusCode: redirect.response_code || 301,
    },
  })
}
```

### Globals

Глобальні налаштування завантажуються в `appConfig`:

```typescript
const globals = await directus.request(readSingleton('globals'))
nuxt.options.appConfig.globals = globals
```

**Використання:**

```vue
<script setup>
const { globals } = useAppConfig()
console.log(globals.title) // Назва сайту
</script>
```

## Server-side Directus

Для server-side запитів використовується окремий клієнт:

```typescript
// server/utils/directus-server.ts
const directusServer = createDirectus<Schema>(directusUrl)
  .with(rest())
  .with(staticToken(process.env.DIRECTUS_SERVER_TOKEN))
```

**Використання:**

```typescript
// server/api/posts.get.ts
import { directusServer, readItems } from '~/server/utils/directus-server'

export default defineEventHandler(async () => {
  return await directusServer.request(
    readItems('posts')
  )
})
```

## TypeScript підтримка

Модуль надає повну типізацію через `types/schema.ts`:

```typescript
import type { Schema } from '~/types/schema'

const directus = createDirectus<Schema>(url)
// Всі команди типізовані
```

## Best Practices

### 1. Використовуйте композабли

```typescript
// ✅ Добре
const { user } = useDirectusAuth()

// ❌ Погано
const user = useState('user')
```

### 2. Обробляйте помилки

```typescript
try {
  const pages = await useDirectus(readItems('pages'))
} catch (error) {
  console.error('Error loading pages:', error)
}
```

### 3. Використовуйте fields для оптимізації

```typescript
// ✅ Добре - завантажує тільки необхідні поля
const pages = await useDirectus(
  readItems('pages', {
    fields: ['id', 'title', 'permalink'],
  })
)

// ❌ Погано - завантажує всі поля
const pages = await useDirectus(readItems('pages'))
```

## Наступні кроки

- [API](/api/) — робота з API
- [Автентифікація](/api/authentication) — детальний опис автентифікації

