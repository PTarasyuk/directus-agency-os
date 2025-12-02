# Best Practices та Common Patterns

Цей розділ описує найкращі практики та загальні патерни, які використовуються в проекті.

## Робота з Directus

### Використання полів (fields)

**✅ Добре:**
```typescript
const { data: pages } = await useDirectus(
  readItems('pages', {
    fields: ['id', 'title', 'permalink', 'summary'],
    // Тільки необхідні поля
  })
)
```

**❌ Погано:**
```typescript
const { data: pages } = await useDirectus(
  readItems('pages', {
    fields: ['*'], // Завантажує всі поля, навіть непотрібні
  })
)
```

**Чому:**
- Менше даних = швидший запит
- Менше трафіку
- Краща продуктивність

### Обробка відносин (relations)

**✅ Добре:**
```typescript
const { data: page } = await useDirectus(
  readItem('pages', pageId, {
    fields: [
      '*',
      {
        blocks: [
          'id',
          'collection',
          {
            item: {
              block_hero: ['*'],
              block_richtext: ['*'],
            }
          }
        ]
      }
    ]
  })
)
```

**❌ Погано:**
```typescript
// Окремий запит для кожного блоку
const page = await useDirectus(readItem('pages', pageId))
const blocks = await useDirectus(readItems('pages_blocks', {
  filter: { page: { _eq: pageId } }
}))
// Потім окремо для кожного блоку...
```

**Чому:**
- Менше запитів до API
- Атомарність даних
- Краща продуктивність

### Кешування даних

**✅ Добре:**
```typescript
const { data: page } = await useAsyncData(
  `page-${pageId}`,
  () => useDirectus(readItem('pages', pageId)),
  {
    getCachedData: (key) => {
      // Використовує кеш, якщо доступний
      return nuxtApp.payload.data[key]
    }
  }
)
```

**Чому:**
- Менше запитів
- Швидший рендеринг
- Кращий UX

## Компоненти

### Props та типи

**✅ Добре:**
```vue
<script setup lang="ts">
import type { BlockHero } from '~/types'

defineProps<{
  data: BlockHero
  title?: string
}>()
</script>
```

**❌ Погано:**
```vue
<script setup>
defineProps({
  data: Object, // Немає типізації
  title: String,
})
</script>
```

**Чому:**
- TypeScript перевірка типів
- Автодоповнення в IDE
- Менше помилок

### Computed properties

**✅ Добре:**
```vue
<script setup>
const props = defineProps<{ items: Item[] }>()

const filteredItems = computed(() => {
  return props.items.filter(item => item.active)
})
</script>
```

**❌ Погано:**
```vue
<script setup>
const props = defineProps<{ items: Item[] }>()

// Фільтрація в template
</script>
<template>
  <div v-for="item in items.filter(i => i.active)">
    <!-- Погано: фільтрація виконується при кожному рендері -->
  </div>
</template>
```

**Чому:**
- Computed кешується
- Виконується тільки при зміні залежностей
- Краща продуктивність

### Error handling

**✅ Добре:**
```vue
<script setup>
const { data: page, error } = await useDirectus(
  readItem('pages', pageId)
)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found'
  })
}
</script>
```

**❌ Погано:**
```vue
<script setup>
const page = await useDirectus(readItem('pages', pageId))
// Немає обробки помилок
</script>
```

## Роутинг

### Catch-all routes

**✅ Добре:**
```vue
<!-- pages/[...permalink].vue -->
<script setup>
const { path } = useRoute()
const pageFilter = computed(() => ({
  permalink: { _eq: path }
}))

const { data: page } = await useAsyncData(
  path,
  () => useDirectus(readItems('pages', {
    filter: unref(pageFilter),
    limit: 1
  }))
)
</script>
```

**Особливості:**
- Обробляє всі динамічні сторінки
- SEO-friendly URLs
- Гнучкість

### Error pages

**✅ Добре:**
```vue
<!-- error.vue -->
<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.statusMessage }}</p>
    <button @click="handleError">Go Home</button>
  </div>
</template>

<script setup>
const props = defineProps<{
  error: { statusCode: number; statusMessage: string }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>
```

## Server API

### Валідація запитів

**✅ Добре:**
```typescript
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  if (!query.id || typeof query.id !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing or invalid id parameter'
    })
  }
  
  // Обробка запиту
})
```

### Кешування

**✅ Добре:**
```typescript
export default cachedEventHandler(
  async (event) => {
    // Логіка
  },
  {
    maxAge: 60 * 5, // 5 хвилин
    name: 'my-endpoint',
    getKey: (event) => {
      const query = getQuery(event)
      return `my-endpoint-${query.id}`
    }
  }
)
```

## TypeScript

### Типи для Directus

**✅ Добре:**
```typescript
import type { Schema } from '~/types/schema'

const directus = createDirectus<Schema>(url)
// Всі команди типізовані
```

### Типи для компонентів

**✅ Добре:**
```typescript
// types/blocks/block-hero.ts
export interface BlockHero {
  id: string
  title: string
  headline: string
  content: string
  image: string | File
  image_position: 'left' | 'right'
  button_group?: BlockButtonGroup
}
```

## Стилізація

### Tailwind CSS

**✅ Добре:**
```vue
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
      Title
    </h1>
  </div>
</template>
```

**❌ Погано:**
```vue
<template>
  <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
    <!-- Inline styles -->
  </div>
</template>
```

**Чому:**
- Консистентність
- Легше підтримувати
- Підтримка темної теми

### Кастомні класи

**✅ Добре:**
```vue
<style scoped>
.card {
  @apply rounded-lg shadow-md p-6 bg-white dark:bg-gray-800;
}
</style>
```

## Безпека

### Sanitization

**✅ Добре:**
```vue
<template>
  <div v-dompurify-html="htmlContent" />
</template>
```

**Чому:**
- Захист від XSS
- Очищення небезпечного HTML

### Валідація форм

**✅ Добре:**
```vue
<script setup>
const schema = {
  email: 'required|email',
  password: 'required|min:8',
}

const form = useForm({
  validationSchema: schema
})
</script>
```

## Продуктивність

### Lazy loading

**✅ Добре:**
```vue
<template>
  <LazyHeavyComponent v-if="show" />
</template>
```

### Image optimization

**✅ Добре:**
```vue
<template>
  <NuxtImg
    :src="image"
    width="800"
    height="600"
    loading="lazy"
    format="webp"
  />
</template>
```

### Code splitting

**✅ Добре:**
```typescript
// Динамічний імпорт
const HeavyComponent = () => import('~/components/Heavy.vue')
```

## Тестування

### Unit tests

**✅ Добре:**
```typescript
import { describe, it, expect } from 'vitest'
import { getNavItemUrl } from '~/utils/navigation'

describe('getNavItemUrl', () => {
  it('should return page permalink', () => {
    const item = { type: 'page', page: { permalink: '/about' } }
    expect(getNavItemUrl(item)).toBe('/about')
  })
})
```

## Наступні кроки

- [Структура проекту](/guide/project-structure) - детальна структура
- [API](/api/) - робота з API
- [Компоненти](/components/) - компоненти проекту

