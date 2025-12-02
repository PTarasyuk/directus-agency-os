# Автентифікація API

Як працює автентифікація в AgencyOS.

## Огляд

AgencyOS використовує Directus для автентифікації через session-based автентифікацію.

## Client-side автентифікація

### Логін

```typescript
const { login } = useDirectusAuth()

await login(email, password)
```

### Логout

```typescript
const { logout } = useDirectusAuth()

await logout()
```

### Перевірка автентифікації

```typescript
const { user, isAuthenticated } = useDirectusAuth()

if (isAuthenticated.value) {
  // Користувач автентифікований
}
```

## Server-side автентифікація

### Static Token

Для server-side запитів використовується static token:

```typescript
// server/utils/directus-server.ts
const directusServer = createDirectus<Schema>(directusUrl)
  .with(rest())
  .with(staticToken(process.env.DIRECTUS_SERVER_TOKEN))
```

### Використання

```typescript
import { directusServer, readItems } from '~/server/utils/directus-server'

// Автоматично використовує static token
const data = await directusServer.request(readItems('pages'))
```

## Session Management

### Зберігання сесії

Сесія зберігається в:
- **Cookie** — для server-side
- **localStorage** — для client-side (статус автентифікації)

### Оновлення сесії

Сесія автоматично оновлюється при:
- Завантаженні сторінки
- Виконанні запитів до Directus
- Виклику `fetchUser()`

## Захист маршрутів

### Middleware

```vue
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
```

### Глобальний middleware

```typescript
// nuxt.config.ts
directus: {
  auth: {
    enableGlobalAuthMiddleware: true
  }
}
```

## Live Preview

Підтримка live preview через query параметри:

```
?preview=true&token=YOUR_TOKEN
```

## Наступні розділи

- [Endpoints](/api/endpoints) — детальний опис endpoints
- [Server Utils](/api/server-utils) — server-side утиліти
