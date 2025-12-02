# Розгортання

Інструкції з розгортання AgencyOS.

## Передумови

- Налаштований Directus інстанс
- Змінні оточення налаштовані
- Проект зібраний (`pnpm build`)

## Frontend (Nuxt)

### Vercel (рекомендовано)

1. Підключіть репозиторій до Vercel
2. Налаштуйте змінні оточення:
   - `DIRECTUS_URL`
   - `DIRECTUS_SERVER_TOKEN`
   - `NUXT_PUBLIC_SITE_URL`
   - `STRIPE_*` (якщо використовується)
3. Deploy

**Переваги:**
- Автоматичний деплой з GitHub
- Оптимізовано для Nuxt
- CDN та кешування

### Netlify

1. Підключіть репозиторій до Netlify
2. Налаштуйте змінні оточення
3. Build command: `pnpm build`
4. Publish directory: `.output/public`

**Примітка:** Можливі проблеми з пам'яттю під час збірки.

### Self-hosted

```bash
# Збірка
pnpm build

# Запуск
pnpm start
```

Або з PM2:

```bash
pm2 start ecosystem.config.js
```

## Backend (Directus)

### Directus Cloud

1. Створіть проект на [Directus Cloud](https://directus.cloud)
2. Налаштуйте колекції через template
3. Скопіюйте URL та token

### Self-hosted

#### Docker

```bash
cd .directus
docker compose up -d
```

#### Без Docker

Дотримуйтесь [офіційної документації](https://docs.directus.io/self-hosted/installation.html).

## Environment Variables

### Frontend

```txt
DIRECTUS_URL=https://your-instance.directus.app
DIRECTUS_SERVER_TOKEN=your_static_token
NUXT_PUBLIC_SITE_URL=https://your-site.com
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Backend (Directus)

Налаштуйте через Directus Admin Panel або environment variables.

## Налаштування Stripe Webhooks

1. Створіть webhook endpoint в Stripe Dashboard
2. URL: `https://your-site.com/api/stripe/webhooks`
3. Події:
   - `checkout.session.completed`
   - `invoice.paid`
   - `customer.subscription.updated`
4. Скопіюйте webhook secret

## Налаштування CORS

В Directus налаштуйте CORS для вашого домену:

```
https://your-site.com
```

## Наступні розділи

- [Frontend](/deployment/frontend) — детальне розгортання frontend
- [Backend](/deployment/backend) — детальне розгортання backend
- [Environment Variables](/deployment/environment) — налаштування змінних
