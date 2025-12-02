# File-based Routing

Nuxt використовує file-based routing для автоматичного створення маршрутів.

## Як працює

Nuxt автоматично створює маршрути на основі структури `pages/`:

```
pages/
├── index.vue              → /
├── about.vue               → /about
├── posts/
│   ├── index.vue          → /posts
│   └── [slug].vue         → /posts/:slug
└── [...permalink].vue     → /* (catch-all)
```

## Типи маршрутів

### Статичні маршрути

```vue
<!-- pages/about.vue -->
<template>
  <div>About</div>
</template>
```

Створює маршрут: `/about`

### Динамічні маршрути

```vue
<!-- pages/posts/[slug].vue -->
<script setup>
const route = useRoute()
const slug = route.params.slug
</script>
```

Створює маршрут: `/posts/:slug`

### Catch-all маршрути

```vue
<!-- pages/[...permalink].vue -->
<script setup>
const route = useRoute()
const permalink = route.params.permalink
</script>
```

Створює маршрут: `/*` (всі маршрути)

## Маршрути в AgencyOS

### Публічні сторінки

- `/` — головна сторінка
- `/posts` — блог
- `/posts/[slug]` — пост блогу
- `/[...permalink]` — динамічні сторінки з Directus

### Автентифікація

- `/auth/signin` — логін
- `/auth/logout` — логout

### Portal

- `/portal` — головна панель
- `/portal/projects` — проекти
- `/portal/projects/[id]` — деталі проекту
- `/portal/billing` — білінг
- `/portal/files` — файли
- `/portal/account` — акаунт

### Proposals

- `/proposals/[id]` — перегляд пропозиції

## Навігація

### Programmatic Navigation

```typescript
// Перехід на сторінку
await navigateTo('/posts/my-post')

// З query параметрами
await navigateTo({
  path: '/posts',
  query: { page: 1 }
})
```

### NuxtLink

```vue
<NuxtLink to="/posts">Блог</NuxtLink>
<NuxtLink :to="{ name: 'posts-slug', params: { slug: 'my-post' } }">
  Пост
</NuxtLink>
```

## Route Meta

### definePageMeta

```vue
<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'portal',
  title: 'Моя сторінка'
})
</script>
```

### Доступні опції

- `middleware` — middleware для сторінки
- `layout` — layout для сторінки
- `title` — заголовок сторінки
- `auth` — чи потрібна автентифікація

## Route Rules

Налаштування правил для маршрутів в `nuxt.config.ts`:

```typescript
routeRules: {
  '/portal/**': { ssr: false },      // SPA режим
  '/proposals/**': { ssr: true },     // SSR режим
  '/**': { prerender: true },        // Static generation
}
```

## Наступні розділи

- [Auto-imports](/architecture/auto-imports) — автоматичний імпорт
- [Рендеринг](/architecture/rendering) — стратегії рендерингу
