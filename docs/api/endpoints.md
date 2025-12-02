# API Endpoints

Детальний опис всіх API endpoints.

## Client-side API

### GET `/api/_sitemap-urls`

Генерація URL для sitemap.

**Повертає:**
```json
[
  { "url": "/", "lastmod": "2024-01-01" },
  { "url": "/posts/my-post", "lastmod": "2024-01-02" }
]
```

### GET `/api/search`

Глобальний пошук по сайту.

**Параметри:**
- `q` (string) — пошуковий запит

**Повертає:**
```json
{
  "pages": [...],
  "posts": [...],
  "help_articles": [...]
}
```

### POST `/api/feedback`

Відправка feedback.

**Body:**
```json
{
  "message": "Текст повідомлення",
  "email": "email@example.com"
}
```

**Повертає:**
```json
{
  "success": true
}
```

## Portal API

### GET `/api/portal/search`

Пошук в порталі.

**Параметри:**
- `q` (string) — пошуковий запит

**Повертає:**
```json
{
  "projects": [...],
  "tasks": [...],
  "files": [...]
}
```

## Stripe API

### POST `/api/stripe/create-checkout-session`

Створення Stripe checkout сесії.

**Body:**
```json
{
  "invoice_id": "invoice-id",
  "return_url": "https://site.com/portal/billing"
}
```

**Повертає:**
```json
{
  "session_id": "cs_...",
  "url": "https://checkout.stripe.com/..."
}
```

### POST `/api/stripe/create-portal-link`

Створення посилання на Stripe customer portal.

**Body:**
```json
{
  "return_url": "https://site.com/portal/billing"
}
```

**Повертає:**
```json
{
  "url": "https://billing.stripe.com/..."
}
```

### POST `/api/stripe/webhooks`

Обробка Stripe webhooks.

**Headers:**
- `stripe-signature` — підпис Stripe

**Body:**
Stripe event object

## Proxy API

### `/api/proxy/**`

Proxy для запитів до Directus.

**Використання:**
Автоматично використовується клієнтським Directus клієнтом.

## Наступні розділи

- [Автентифікація](/api/authentication) — автентифікація API
- [Server Utils](/api/server-utils) — server-side утиліти

