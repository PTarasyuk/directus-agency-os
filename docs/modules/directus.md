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

### Керування дизайном через Directus (themes, layout)

Через сінглтон `globals` (або окремі колекції) можна керувати дизайном Nuxt‑фронтенду:

- **Теми (design tokens)**
  - У Directus створюється колекція `themes` з полями `key`, `label`, `tokens`, `is_default`;
  - У `globals` зберігається посилання на вибрану тему (`current_theme`) або вбудований обʼєкт `theme_tokens`;
  - На рівні Nuxt плагін читає ці токени та мапить їх у CSS‑змінні (`--font-sans`, `--border-radius-card`, кольорові змінні), які вже використовує `tailwind.config.ts`.

- **Layout / UI‑налаштування**
  - У `globals` можна зберігати додаткові поля: `layout_mode` (`wide | boxed | compact`), `header_style` (`solid | transparent | sticky`), `footer_variant` тощо;
  - Layout‑компоненти (`layouts/*.vue`, `TheHeader`, `TheFooter`) читають `globals` через `useAppConfig()` і обирають потрібний варіант відображення.

- **Варіанти блоків (Page Builder)**
  - У block‑колекціях (`block_hero`, `block_cta`, ...) можна додати поле `variant` (`string/enum`), яке визначає layout компонента;
  - У Vue‑компонентах `components/blocks/*.vue` `props.data.variant` використовується для перемикання між варіантами (через `v-if`/`v-else-if` або окремі субкомпоненти).

Таким чином Directus стає «панеллю керування дизайном»: адміністратор може змінити тему, варіанти блоків і layout‑налаштування без змін коду, а Nuxt застосовує ці зміни через токени та компоненти.

#### Рівні керованості стилями з Directus

Щоб було зрозуміло, **де закінчуються дані й починається код**, виділяємо три рівні:

1. **Базовий рівень (вже реалізований)**
   - Directus керує контентом блоків (`title`, `headline`, тексти, зображення) та простими параметрами (`image_position`, `alignment`, `hide_block`);
   - код AgencyOS інтерпретує ці поля як налаштування всередині одного стилю компонента.

2. **Керовані варіанти (рекомендований підхід)**
   - ми вводимо поля `variant` у block‑колекціях, а в Nuxt‑коді реалізуємо обмежений набір layoutʼів/стилів для кожного типу блоку;
   - контент‑автор у Directus обирає потрібний `variant` із фіксованого списку (enum), не ламаючи дизайн‑систему;
   - **зміни коду необхідні один раз**:
     - розширити схему (темплейт Directus) полями `variant`;
     - оновити типи в `types/blocks/*.ts`;
     - додати логіку обробки `variant` у `components/blocks/*.vue`.

3. **Повністю динамічні стилі (небажаний підхід)**
   - Directus міг би зберігати «сирі» класи/стилі (наприклад, Tailwind‑класи) і передавати їх напряму у Vue;
   - це дає максимальну гнучкість, але **руйнує контроль дизайн‑системи**, ускладнює типізацію й може призвести до неконсистентного UI;
   - тому ми навмисно не рекомендуємо цей підхід у рамках AgencyOS: усі стилі мають проходити через дизайн‑токени та контрольовані варіанти.

### Можливі покращення (server-side, multi-tenant, registry)

Декілька напрямів розвитку інтеграції дизайну:

- **Multi-tenant / per-site дизайн**
  - додати колекцію `sites` або використовувати наявні `organizations`, де кожен запис матиме поле `theme` (rel до `themes`) та опційно `layout_profile`;
  - на server-side (у `server/middleware` або `server/api`) визначати поточний site/tenant за доменом/шляхом і відповідно завантажувати тему + globals;
  - при SSR передавати обрані токени/налаштування в `appConfig`, щоб сторінка рендерилась вже з правильною темою.

- **Реєстр блоків (Page Builder registry)**
  - описати у коді єдиний реєстр блоків (`componentMap` + метадані), де для кожного `BlockType` зберігаються доступні `variant` + технічні обмеження;
  - у Directus використовувати цей реєстр як джерело правди для fixed‑options (варіантів) полів `variant` у block‑колекціях;
  - опційно додати колекцію `block_presets`, що дозволяє контент‑авторам створювати «пресети» блоків (заповнені конфіги), які легко перевикористовувати.

- **Server-side валідація дизайну**
  - у `server/api` або окремих утилітах додати перевірки (lint) даних з Directus: чи всі `variant` відомі коду, чи не відсутні обовʼязкові токени для обраної теми;
  - у CI/CD (перед деплоєм) викликати такі перевірки, щоб не викочувати неконсистентні зміни схеми/дизайну.

Ці покращення потребують зміни коду (розширення схеми Directus, додаткові middleware/утиліти в Nuxt), але дають можливість значно гнучкіше керувати дизайном на рівні платформи.

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

