# Ключові файли проекту

Цей розділ описує найважливіші файли проекту та їх призначення. Розуміння цих файлів допоможе швидко орієнтуватися в коді.

## Конфігураційні файли

### `nuxt.config.ts`

**Призначення:** Головний конфігураційний файл Nuxt 3

**Ключові налаштування:**

```typescript
export default defineNuxtConfig({
  // Nuxt Layers - модульна архітектура
  extends: [
    './layers/proposals',
    './layers/portal',
  ],
  
  // Автоматичний імпорт компонентів
  components: [
    { path: '~/components/base', pathPrefix: false },
    '~/components',
  ],
  
  // Модулі
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    // ...
  ],
  
  // Конфігурація Directus
  directus: {
    rest: {
      baseUrl: process.env.DIRECTUS_URL,
    },
    auth: {
      enabled: true,
      redirect: {
        login: '/auth/signin',
        home: '/portal',
      },
    },
  },
})
```

**Що налаштовує:**
- Nuxt Layers для модульності
- Автоматичний імпорт компонентів
- Модулі та плагіни
- Конфігурацію Directus
- SEO налаштування
- Image optimization

### `app.config.ts`

**Призначення:** Конфігурація UI теми та компонентів Nuxt UI

**Структура:**

```typescript
export default defineAppConfig({
  theme,
  ui: {
    strategy: 'override',
    primary: theme.primary,
    gray: theme.gray,
    // Кастомізація компонентів
    button: {
      font: 'font-bold',
      rounded: 'rounded-button',
    },
    // ...
  },
})
```

**Що налаштовує:**
- Кольорову схему (primary, gray)
- Стилі компонентів Nuxt UI
- Border radius для різних елементів
- Іконки за замовчуванням

### `theme.ts`

**Призначення:** Визначення теми проекту

**Структура:**

```typescript
export const theme = {
  primary: 'violet',
  gray: 'slate',
  borderRadius: 'lg',
  googleFonts: {
    Inter: true,
    Poppins: [400, 500, 600, 700, 800, 900],
  },
  fonts: {
    display: 'Poppins',
    sans: 'Inter',
    code: 'Fira Code',
  },
}
```

**Що визначає:**
- Кольорову палітру
- Шрифти (Google Fonts)
- Border radius
- Типографіку

## Модуль Directus

### `modules/directus/index.ts`

**Призначення:** Головний файл кастомного Nuxt модуля для інтеграції Directus

**Ключові функції:**

1. **Автоматичний імпорт команд SDK:**
```typescript
const commands = [
  'readItems', 'createItem', 'updateItem', 'deleteItem',
  'readSingleton', 'updateSingleton',
  'readFiles', 'uploadFiles',
  'readUsers', 'createUser',
  // ... інші команди
];

for (const name of commands) {
  addImports({
    name,
    as: name,
    from: '@directus/sdk',
  });
}
```

2. **Завантаження redirects:**
```typescript
const redirects = await directus.request(readItems('redirects'));
// Додає redirects до route rules
```

3. **Завантаження globals:**
```typescript
const globals = await directus.request(readSingleton('globals'));
nuxt.options.appConfig.globals = globals;
```

**Що робить:**
- Реєструє Directus SDK команди для автоматичного імпорту
- Налаштовує плагіни та композабли
- Завантажує redirects та globals з Directus
- Ініціалізує автентифікацію

### `modules/directus/runtime/composables/useDirectusAuth.ts`

**Призначення:** Композабл для автентифікації користувачів

**API:**

```typescript
const { 
  user,        // Ref<User | null> - поточний користувач
  login,       // (email, password) => Promise<void>
  logout,      // () => Promise<void>
  fetchUser,   // () => Promise<void>
} = useDirectusAuth()
```

**Приклад використання:**

```vue
<script setup>
const { login, user, isAuthenticated } = useDirectusAuth();

async function handleLogin() {
  await login('user@example.com', 'password');
  // Після успішного логіну користувач перенаправляється
}

// Перевірка автентифікації
if (isAuthenticated.value) {
  console.log('Користувач автентифікований:', user.value);
}
</script>
```

**Внутрішня логіка:**
- Зберігає стан користувача в `useState('user')`
- Зберігає статус автентифікації в localStorage
- Автоматично перенаправляє після логіну/логауту
- Очищає дані при логауті

### `modules/directus/runtime/composables/useDirectus.ts`

**Призначення:** Композабл для виконання Directus запитів

**API:**

```typescript
const result = await useDirectus(
  readItems('pages', {
    fields: ['*'],
    filter: { status: { _eq: 'published' } }
  })
)
```

**Альтернатива:**

```typescript
const directus = useDirectus()
const pages = await directus.request(
  readItems('pages')
)
```

### `modules/directus/runtime/composables/useFiles.ts`

**Призначення:** Композабл для роботи з файлами Directus

**API:**

```typescript
const { fileUrl } = useFiles()

// Отримати URL файлу
const url = fileUrl('file-id-here')
// Повертає: https://directus.app/assets/file-id-here
```

**Приклад використання:**

```vue
<template>
  <img :src="fileUrl(page.hero_image)" alt="Hero" />
</template>

<script setup>
const { fileUrl } = useFiles()
</script>
```

## Компоненти

### `components/PageBuilder.vue`

**Призначення:** Основний компонент для рендерингу динамічних сторінок

**Структура:**

```vue
<script setup lang="ts">
// Мапа компонентів для блоків
const componentMap: Record<BlockType, any> = {
  block_hero: resolveComponent('BlocksHero'),
  block_richtext: resolveComponent('BlocksRichText'),
  block_cta: resolveComponent('BlocksCta'),
  // ...
}

const props = defineProps<{
  page: Page | OsProposal;
}>()

// Фільтрація прихованих блоків
const blocks = computed(() => {
  return props.page?.blocks?.filter(
    block => block.hide_block !== true
  )
})
</script>

<template>
  <div id="content">
    <component 
      v-for="block in blocks" 
      :key="block.id"
      :is="componentMap[block.collection]"
      :data="block.item"
    />
  </div>
</template>
```

**Як працює:**
1. Отримує сторінку з пропсами
2. Фільтрує блоки (прибирає приховані)
3. Рендерить кожен блок через динамічний компонент
4. Передає дані блоку через `:data` prop

**Використання:**

```vue
<template>
  <PageBuilder :page="page" />
</template>

<script setup>
const { data: page } = await useDirectus(
  readItem('pages', pageId)
)
</script>
```

### `components/base/LoginForm.vue`

**Призначення:** Форма автентифікації

**Особливості:**
- Використовує `useDirectusAuth()` для логіну
- Валідація через FormKit
- Обробка помилок
- Loading стан

**Структура:**

```vue
<script setup>
const { login } = useDirectusAuth()
const loading = ref(false)
const error = ref(null)

async function attemptLogin() {
  loading.value = true
  error.value = null
  
  try {
    await login(email.value, password.value)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
```

## Server-side файли

### `server/utils/directus-server.ts`

**Призначення:** Server-side Directus клієнт з static token

**Код:**

```typescript
import { createDirectus, rest, staticToken } from '@directus/sdk'
import type { Schema } from '~/types/schema'

const directusServer = createDirectus<Schema>(directusUrl)
  .with(rest())
  .with(staticToken(process.env.DIRECTUS_SERVER_TOKEN))

export { directusServer }
```

**Використання:**

```typescript
// server/api/my-endpoint.ts
import { directusServer, readItems } from '~/server/utils/directus-server'

export default defineEventHandler(async (event) => {
  const items = await directusServer.request(
    readItems('pages')
  )
  return items
})
```

**Важливо:**
- Використовує static token (не JWT)
- Працює тільки на server-side
- Має повний доступ до даних (bypass permissions)

## Типи

### `types/schema.ts`

**Призначення:** Головна схема TypeScript для всіх колекцій Directus

**Структура:**

```typescript
export interface Schema {
  // Сторінки
  pages: Page[]
  pages_blocks: PageBlock[]
  
  // Контент
  posts: Post[]
  categories: Category[]
  
  // OS (операційна система)
  os_projects: OsProject[]
  os_tasks: OsTask[]
  os_invoices: OsInvoice[]
  
  // Системні
  directus_users: User[]
  directus_files: File[]
}
```

**Використання:**
- Типізація Directus SDK
- Автодоповнення в IDE
- Перевірка типів під час компіляції

**Приклад:**

```typescript
import type { Schema } from '~/types/schema'

const directus = createDirectus<Schema>(url)
// Тепер всі команди типізовані
const pages = await directus.request(
  readItems('pages') // ✅ Автодоповнення
)
```

## Утиліти

### `utils/navigation.ts`

**Призначення:** Утиліти для роботи з навігацією

**Функції:**

```typescript
export function getNavItemUrl(item: NavigationItem): string | null {
  if (item.type === 'page' && item.page) {
    return item.page.permalink
  } else if (item.type === 'url' && item.url) {
    return item.url
  }
  return null
}
```

### `utils/strings.ts`

**Призначення:** Утиліти для роботи з рядками

**Функції:**
- `generateId()` - генерація унікальних ID
- Інші string утиліти

### `utils/relations.ts`

**Призначення:** Утиліти для роботи з відносинами Directus

**Використання:**
- Обробка nested relations
- Трансформація даних

## Layers

### `layers/portal/composables/useStripe.ts`

**Призначення:** Композабл для роботи з Stripe (Portal Layer)

**API:**

```typescript
const { 
  loading,
  handleCheckout,    // (invoiceId) => Promise<void>
  getPortalLink,     // (customerId) => Promise<void>
} = useStripe()
```

**Використання:**

```vue
<script setup>
const { handleCheckout, loading } = useStripe()

async function payInvoice(invoiceId: string) {
  await handleCheckout(invoiceId)
  // Перенаправляє на Stripe Checkout
}
</script>
```

## Middleware

### `middleware/session.global.ts`

**Призначення:** Глобальний middleware для створення сесії

**Код:**

```typescript
export default defineNuxtRouteMiddleware(() => {
  const session = useCookie('session')
  
  if (!session.value) {
    const newSession: Session = {
      id: generateId(),
      date_created: new Date().toISOString(),
    }
    session.value = JSON.stringify(newSession)
  }
})
```

**Що робить:**
- Створює унікальну сесію для кожного відвідувача
- Зберігає в cookies
- Використовується для відстеження feedback

## Плагіни

### `plugins/dompurify-html.ts`

**Призначення:** Плагін для sanitization HTML контенту

**Використання:**
- Очищення HTML перед відображенням
- Захист від XSS атак

## Наступні кроки

- [Компоненти](/components/) - детальний опис компонентів
- [API](/api/) - робота з API
- [Модулі](/modules/) - опис модулів

