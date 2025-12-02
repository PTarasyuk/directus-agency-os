# API

Огляд API endpoints та server-side функціоналу.

## Структура API

```
server/
├── api/                    # API endpoints
│   ├── _sitemap-urls.ts   # Генерація sitemap
│   ├── feedback.post.ts   # Feedback API
│   ├── search.get.ts      # Пошук
│   └── proxy/             # Proxy endpoints
└── utils/                 # Server утиліти
    └── directus-server.ts # Directus клієнт (server)
```

## Client-side API

### `/api/_sitemap-urls`

Генерація URL для sitemap.

**Метод:** GET  
**Повертає:** Масив URL для sitemap

### `/api/search`

Глобальний пошук по сайту.

**Метод:** GET  
**Параметри:**
- `q` — пошуковий запит

**Повертає:** Результати пошуку

### `/api/feedback`

Відправка feedback.

**Метод:** POST  
**Body:**
```json
{
  "message": "Текст повідомлення",
  "email": "email@example.com"
}
```

## Proxy API

### `/api/proxy`

Proxy для запитів до Directus. Використовується для:
- Обробки CORS
- Автентифікації
- Кешування

## Portal API

### `/api/portal/search`

Пошук в порталі.

**Метод:** GET  
**Параметри:**
- `q` — пошуковий запит

### `/api/stripe/create-checkout-session`

Створення Stripe checkout сесії.

**Метод:** POST  
**Body:**
```json
{
  "invoice_id": "invoice-id",
  "return_url": "https://site.com/portal/billing"
}
```

### `/api/stripe/create-portal-link`

Створення посилання на Stripe customer portal.

**Метод:** POST

### `/api/stripe/webhooks`

Stripe webhooks endpoint.

**Метод:** POST

## Server Utils

### `directus-server.ts`

Server-side Directus клієнт з static token.

```typescript
import { directusServer, readItems } from '~/server/utils/directus-server'

const data = await directusServer.request(readItems('pages'))
```

**Важливо:** Використовується тільки на server-side, має доступ до всіх даних через static token.

## Наступні розділи

- [Автентифікація](/api/authentication) — автентифікація API
- [Endpoints](/api/endpoints) — детальний опис endpoints
- [Server Utils](/api/server-utils) — server-side утиліти
