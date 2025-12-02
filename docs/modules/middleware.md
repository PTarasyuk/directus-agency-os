# Middleware модуля Directus

Модуль надає три middleware для обробки автентифікації та маршрутів.

## auth.ts

Middleware для захисту маршрутів, що потребують автентифікації.

### Використання

```vue
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
```

### Що робить

1. Перевіряє чи користувач автентифікований
2. Якщо ні — redirect на `/auth/signin`
3. Додає `redirect` query параметр для повернення

### Код

```typescript
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useDirectusAuth()
  
  if (!isAuthenticated.value) {
    return navigateTo({
      path: '/auth/signin',
      query: {
        redirect: to.fullPath
      }
    })
  }
})
```

### Приклад

```vue
<!-- pages/portal/projects/index.vue -->
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
```

## guest.ts

Middleware для маршрутів, доступних тільки для неавтентифікованих користувачів.

### Використання

```vue
<script setup>
definePageMeta({
  middleware: 'guest'
})
</script>
```

### Що робить

1. Перевіряє чи користувач НЕ автентифікований
2. Якщо автентифікований — redirect на `/portal`

### Код

```typescript
export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useDirectusAuth()
  
  if (isAuthenticated.value) {
    return navigateTo('/portal')
  }
})
```

### Приклад

```vue
<!-- pages/auth/signin.vue -->
<script setup>
definePageMeta({
  middleware: 'guest'
})
</script>
```

## common.ts

Глобальний middleware для загальних перевірок.

### Використання

Автоматично застосовується до всіх маршрутів.

### Що робить

1. Перевіряє статус автентифікації
2. Оновлює дані користувача якщо потрібно
3. Обробляє помилки автентифікації

## Глобальний auth middleware

Можна увімкнути глобальний auth middleware для всіх сторінок:

```typescript
// nuxt.config.ts
directus: {
  auth: {
    enableGlobalAuthMiddleware: true,  // Увімкнути глобально
  },
}
```

**Увага:** Це захистить всі сторінки, окрім тих, що мають `middleware: 'guest'`.

## Комбінування middleware

Можна використовувати кілька middleware:

```vue
<script setup>
definePageMeta({
  middleware: ['auth', 'custom']
})
</script>
```

## Приклади використання

### Захищена сторінка

```vue
<!-- pages/portal/account/index.vue -->
<script setup>
definePageMeta({
  middleware: 'auth'
})

const { user } = useDirectusAuth()
</script>

<template>
  <div>
    <h1>Акаунт: {{ user?.first_name }}</h1>
  </div>
</template>
```

### Публічна сторінка

```vue
<!-- pages/index.vue -->
<script setup>
// Без middleware - публічна сторінка
</script>
```

### Сторінка логіну

```vue
<!-- pages/auth/signin.vue -->
<script setup>
definePageMeta({
  middleware: 'guest'  // Тільки для неавтентифікованих
})
</script>
```

## Наступні розділи

- [Композабли](/modules/composables) — використання композаблів
- [Конфігурація](/modules/configuration) — детальна конфігурація

