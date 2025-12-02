# Environment Variables

Налаштування змінних оточення для AgencyOS.

## Frontend Variables

### Обов'язкові

```ini
# Directus
DIRECTUS_URL=https://your-instance.directus.app
DIRECTUS_SERVER_TOKEN=your_static_token
NUXT_PUBLIC_SITE_URL=https://your-site.com
```

### Опціональні (Stripe)

```ini
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxx
```

## Backend Variables (Directus)

### Обов'язкові

```ini
KEY=your-secret-key
SECRET=your-secret-secret
DB_CLIENT=pg
DB_HOST=db
DB_PORT=5432
DB_DATABASE=directus
DB_USER=directus
DB_PASSWORD=directus
```

### Опціональні

```ini
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=password
PUBLIC_URL=https://your-instance.directus.app
```

## Development

### `.env`

```ini
# Directus
DIRECTUS_URL=http://localhost:8055
DIRECTUS_SERVER_TOKEN=your_local_token
NUXT_PUBLIC_SITE_URL=http://localhost:3000

# Stripe (test)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxx
```

## Production

### Vercel

Додайте через Vercel Dashboard → Settings → Environment Variables

### Netlify

Додайте через Netlify Dashboard → Site settings → Environment variables

### Self-hosted

```bash
# .env.production
DIRECTUS_URL=https://your-instance.directus.app
DIRECTUS_SERVER_TOKEN=your_production_token
NUXT_PUBLIC_SITE_URL=https://your-site.com

STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxx
```

## Безпека

### ⚠️ Ніколи не комітьте `.env`

Додайте в `.gitignore`:

```
.env
.env.local
.env.production
```

### Генерація Secret Keys

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Перевірка

### Перевірка змінних

```typescript
// В компоненті
const config = useRuntimeConfig()
console.log(config.public.siteUrl)  // Публічні змінні
// config.stripeSecretKey  // Приватні (тільки server)
```

## Наступні розділи

- [Frontend](/deployment/frontend) — розгортання Nuxt
- [Backend](/deployment/backend) — розгортання Directus
