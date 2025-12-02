# Portal Layer

Клієнтський портал для клієнтів агентства.

## Огляд

Portal Layer надає повнофункціональний клієнтський портал з:
- Управлінням проектами
- Задачами
- Файлами
- Білінгом (Stripe)
- Повідомленнями

## Структура

```
layers/portal/
├── components/          # Компоненти порталу
│   ├── FileCard.vue
│   ├── FilesView.vue
│   ├── FileUploadModal.vue
│   ├── InvoiceWidget.vue
│   ├── MessageList.vue
│   ├── PageContainer.vue
│   ├── PageHeader.vue
│   ├── PortalSearch.vue
│   ├── ProjectActivity.vue
│   ├── ProjectMilestone.vue
│   ├── ProjectMilestones.vue
│   ├── Stats.vue
│   ├── Task.vue
│   ├── TaskList.vue
│   └── TaskWidget.vue
├── composables/         # Композабли
│   └── useStripe.ts
├── pages/               # Сторінки
│   ├── auth.vue
│   └── portal/
│       ├── index.vue
│       ├── account/
│       ├── billing/
│       ├── files/
│       ├── help/
│       └── projects/
├── server/              # Server API
│   └── api/
│       ├── portal/
│       └── stripe/
└── nuxt.config.ts       # Конфігурація
```

## Конфігурація

```typescript
// layers/portal/nuxt.config.ts
export default defineNuxtConfig({
  components: [
    { path: './components/', prefix: 'Portal' },
  ],
  routeRules: {
    '/auth/**': { ssr: false },
    '/portal/**': { ssr: false, index: false },
  },
  runtimeConfig: {
    public: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    },
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
})
```

## Особливості

### 1. SPA режим

Всі маршрути `/portal/**` використовують SPA режим для кращої UX.

### 2. Префікс компонентів

Компоненти мають префікс `Portal` для уникнення конфліктів:

```vue
<PortalFileCard :file="file" />
<PortalTaskList :tasks="tasks" />
```

### 3. Stripe інтеграція

Повна інтеграція з Stripe для:
- Оплати інвойсів
- Управління підписками
- Customer portal

## Сторінки

### `/portal`

Головна панель порталу з:
- Статистикою проектів
- Останніми задачами
- Останніми файлами
- Останніми повідомленнями

### `/portal/projects`

Список проектів користувача.

### `/portal/projects/[id]`

Деталі проекту з:
- Інформацією про проект
- Задачами
- Файлами
- Повідомленнями
- Білінгом

### `/portal/billing`

Білінг з:
- Списком інвойсів
- Історією платежів
- Підписками

### `/portal/files`

Управління файлами з:
- Завантаженням
- Організацією в папки
- Переглядом

### `/portal/account`

Налаштування акаунту.

## Компоненти

### PortalFileCard

Відображення файлу.

```vue
<PortalFileCard :file="file" />
```

### PortalTaskList

Список задач.

```vue
<PortalTaskList :tasks="tasks" />
```

### PortalInvoiceWidget

Віджет інвойсу з можливістю оплати.

```vue
<PortalInvoiceWidget :invoice="invoice" />
```

### PortalProjectMilestones

Етапи проекту.

```vue
<PortalProjectMilestones :project="project" />
```

## Композабли

### useStripe()

Робота з Stripe.

```typescript
const { createCheckout, createPortalLink } = useStripe()

// Створення checkout сесії
const session = await createCheckout({
  invoice_id: 'invoice-id',
  return_url: '/portal/billing'
})

// Створення посилання на customer portal
const portalLink = await createPortalLink()
```

## API

### `/api/portal/search`

Пошук в порталі.

### `/api/stripe/create-checkout-session`

Створення Stripe checkout сесії.

### `/api/stripe/create-portal-link`

Створення посилання на Stripe customer portal.

### `/api/stripe/webhooks`

Обробка Stripe webhooks.

## Налаштування Stripe

1. Створіть акаунт на Stripe
2. Отримайте API ключі
3. Налаштуйте webhook endpoint
4. Додайте ключі в `.env`

```txt
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Наступні розділи

- [Proposals Layer](/layers/proposals) — система пропозицій
- [Portal (архітектура)](/architecture/portal) — глибше про архітектуру порталу

