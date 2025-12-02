# Server Utils

Server-side утиліти для роботи з Directus.

## directus-server.ts

Server-side Directus клієнт з static token.

### Розташування

`server/utils/directus-server.ts`

### Код

```typescript
import {
  createDirectus,
  rest,
  staticToken,
} from '@directus/sdk'
import type { Schema } from '~/types/schema'

const directusUrl = process.env.DIRECTUS_URL as string

const directusServer = createDirectus<Schema>(directusUrl)
  .with(rest())
  .with(staticToken(process.env.DIRECTUS_SERVER_TOKEN as string))

export { directusServer }
```

### Використання

```typescript
// server/api/my-endpoint.get.ts
import { directusServer, readItems } from '~/server/utils/directus-server'

export default defineEventHandler(async (event) => {
  // Автоматично використовує static token
  const data = await directusServer.request(readItems('pages'))

  return data
})
```

## Переваги

### 1. Повний доступ

Static token має повний доступ до всіх даних, незалежно від прав користувача.

### 2. Безпека

Token не доступний на клієнті, тільки на сервері.

### 3. Продуктивність

Не потрібна автентифікація для кожного запиту.

## Експортовані функції

### directusServer

Основний клієнт для запитів.

### readItem, readItems

Читання даних.

### createItem, createItems

Створення даних.

### updateItem, updateItems

Оновлення даних.

### deleteItem, deleteItems

Видалення даних.

### readSingleton, updateSingleton

Робота з singleton.

### withToken

Використання з іншим token.

## Приклади

### Читання даних

```typescript
import { directusServer, readItems } from '~/server/utils/directus-server'

const pages = await directusServer.request(readItems('pages', {
  fields: ['*', { blocks: ['*'] }]
}))
```

### Створення даних

```typescript
import { directusServer, createItem } from '~/server/utils/directus-server'

const newPage = await directusServer.request(createItem('pages', {
  title: 'Нова сторінка',
  status: 'published'
}))
```

### Оновлення даних

```typescript
import { directusServer, updateItem } from '~/server/utils/directus-server'

const updated = await directusServer.request(updateItem('pages', pageId, {
  title: 'Оновлена назва'
}))
```

### З користувацьким token

```typescript
import { directusServer, withToken, readItems } from '~/server/utils/directus-server'

const client = withToken(directusServer, userToken)
const data = await client.request(readItems('pages'))
```

## Налаштування

### Environment Variable

```txt
DIRECTUS_SERVER_TOKEN=your_static_token_here
```

### Генерація Token

1. Відкрийте Directus Admin Panel
2. Перейдіть до User Directory
3. Виберіть Administrative User
4. Згенеруйте static token
5. Додайте в `.env`

## Наступні розділи

- [Endpoints](/api/endpoints) — детальний опис endpoints
- [Автентифікація](/api/authentication) — автентифікація API

