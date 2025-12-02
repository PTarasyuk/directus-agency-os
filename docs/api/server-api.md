# Server API

Server-side API endpoints в AgencyOS.

## Огляд

Server API endpoints знаходяться в `server/api/` та автоматично стають доступними на `/api/*`.

## Структура

```
server/
├── api/
│   ├── _sitemap-urls.ts
│   ├── feedback.post.ts
│   ├── proxy/
│   └── search.get.ts
└── utils/
    └── directus-server.ts
```

## Створення endpoint

### GET Endpoint

```typescript
// server/api/posts.get.ts
import { directusServer, readItems } from '~/server/utils/directus-server'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  return await directusServer.request(
    readItems('posts', {
      fields: ['*'],
      limit: query.limit ? parseInt(query.limit as string) : 10,
    })
  )
})
```

**Використання:**

```typescript
const posts = await $fetch('/api/posts?limit=20')
```

### POST Endpoint

```typescript
// server/api/feedback.post.ts
import { directusServer, createItem } from '~/server/utils/directus-server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  return await directusServer.request(
    createItem('help_feedback', {
      article: body.articleId,
      helpful: body.helpful,
      comment: body.comment,
    })
  )
})
```

**Використання:**

```typescript
await $fetch('/api/feedback', {
  method: 'POST',
  body: {
    articleId: 'article-id',
    helpful: true,
    comment: 'Great article!',
  },
})
```

## Доступні endpoints

### Search

**Маршрут:** `/api/search`

**Метод:** GET

**Параметри:**
- `q` — пошуковий запит

**Відповідь:**

```json
{
  "pages": [...],
  "posts": [...],
  "help_articles": [...]
}
```

### Feedback

**Маршрут:** `/api/feedback`

**Метод:** POST

**Body:**

```json
{
  "articleId": "article-id",
  "helpful": true,
  "comment": "Comment text"
}
```

### Sitemap URLs

**Маршрут:** `/api/_sitemap-urls`

**Метод:** GET

**Відповідь:**

```json
[
  "/",
  "/about",
  "/posts/my-post"
]
```

## Directus Server Client

Для server-side запитів використовується окремий клієнт:

```typescript
// server/utils/directus-server.ts
import { createDirectus, rest, staticToken } from '@directus/sdk'
import type { Schema } from '~/types/schema'

const directusUrl = process.env.DIRECTUS_URL as string

const directusServer = createDirectus<Schema>(directusUrl)
  .with(rest())
  .with(staticToken(process.env.DIRECTUS_SERVER_TOKEN as string))

export { directusServer }
```

**Особливості:**
- Використовує static token
- Доступний тільки на server-side
- Не має обмежень CORS

## Кешування

### defineCachedEventHandler

```typescript
export default defineCachedEventHandler(async () => {
  return await directusServer.request(readItems('posts'))
}, {
  maxAge: 60 * 60, // 1 година
  name: 'posts',
})
```

## Обробка помилок

```typescript
export default defineEventHandler(async (event) => {
  try {
    return await directusServer.request(readItems('posts'))
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load posts',
    })
  }
})
```

## Валідація

```typescript
import { z } from 'zod'

const schema = z.object({
  articleId: z.string(),
  helpful: z.boolean(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const validated = schema.parse(body)
  
  // Використання validated
})
```

## Best Practices

### 1. Використовуйте server client

```typescript
// ✅ Добре
import { directusServer } from '~/server/utils/directus-server'

// ❌ Погано
import { useDirectus } from '#imports'  // Не працює на server
```

### 2. Кешуйте запити

```typescript
// ✅ Добре
defineCachedEventHandler(...)

// ❌ Погано
// Кожен запит робить новий запит до Directus
```

### 3. Валідуйте дані

```typescript
// ✅ Добре
const validated = schema.parse(body)

// ❌ Погано
// Використання невалідованих даних
```

## Наступні кроки

- [Composables](/api/composables) — композабли
- [Автентифікація](/api/authentication) — автентифікація

