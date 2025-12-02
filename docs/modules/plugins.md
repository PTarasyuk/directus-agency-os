# Плагіни модуля Directus

Модуль надає два плагіни для ініціалізації Directus та автентифікації.

## directus.ts

Плагін для ініціалізації Directus клієнта.

### Розташування

`modules/directus/runtime/plugins/directus.ts`

### Що робить

1. Створює Directus клієнт
2. Налаштовує автентифікацію через session
3. Додає підтримку live preview
4. Надає клієнт через `$directus`

### Код

```typescript
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  // Створення клієнта з proxy для CORS
  const directus = createDirectus<Schema>(
    joinURL(config.public.siteUrl, '/api/proxy'),
    { globals: { fetch: $fetch } }
  )
    .with(authentication('session'))
    .with(rest())
  
  // Live Preview підтримка
  const preview = route.query.preview === 'true'
  const token = route.query.token as string | undefined
  
  if (preview && token) {
    directus.setToken(token)
    nuxtApp.hook('page:finish', () => {
      refreshNuxtData()
    })
  }
  
  return {
    provide: {
      directus,
    },
  }
})
```

### Використання

```vue
<script setup>
const { $directus } = useNuxtApp()

// Пряме використання клієнта
const data = await $directus.request(readItems('pages'))
</script>
```

## auth.ts

Плагін для ініціалізації автентифікації.

### Розташування

`modules/directus/runtime/plugins/auth.ts`

### Що робить

1. Реєструє middleware (auth, guest, common)
2. Ініціалізує автентифікацію при завантаженні
3. Завантажує дані користувача якщо автентифікований
4. Встановлює статус автентифікації в localStorage

### Код

```typescript
export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig().public.directus
  
  // Реєстрація middleware
  addRouteMiddleware('common', common, { global: true })
  addRouteMiddleware('auth', auth, {
    global: config.auth.enableGlobalAuthMiddleware,
  })
  addRouteMiddleware('guest', guest)
  
  // Ініціалізація автентифікації
  const initialized = useState('directus-auth-initialized', () => false)
  const { _loggedIn, fetchUser, user } = useDirectusAuth()
  
  if (!initialized.value) {
    await fetchUser({})
    initialized.value = true
  }
  
  // Встановлення статусу
  if (user.value) {
    _loggedIn.set(true)
  } else {
    _loggedIn.set(false)
  }
})
```

### Автоматична ініціалізація

Плагін автоматично:
- Перевіряє наявність сесії
- Завантажує дані користувача
- Встановлює статус автентифікації

## Live Preview

Підтримка live preview для Directus.

### Як працює

1. Додайте `?preview=true&token=YOUR_TOKEN` до URL
2. Плагін встановлює token для запитів
3. Оновлює дані при навігації

### Приклад

```
http://localhost:3000/page?preview=true&token=abc123
```

## Наступні розділи

- [Middleware](/modules/middleware) — автентифікація та захист маршрутів
- [Композабли](/modules/composables) — використання композаблів

