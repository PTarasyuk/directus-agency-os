# Portal Layer

Portal Layer (`layers/portal/`) надає повнофункціональний клієнтський портал для клієнтів агентства.

## Огляд

Portal Layer включає:
- Автентифікований доступ для клієнтів
- Управління проектами
- Білінг та оплата через Stripe
- Управління файлами
- Задачі та етапи проекту
- Повідомлення та комунікації

## Структура

```
layers/portal/
├── components/
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
├── composables/
│   └── useStripe.ts
├── pages/
│   ├── auth.vue
│   └── portal/
│       ├── index.vue
│       ├── account/
│       ├── billing/
│       ├── files/
│       ├── help/
│       └── projects/
└── server/
    └── api/
        ├── portal/
        └── stripe/
```

## Сторінки

### Головна панель

**Маршрут:** `/portal`

**Файл:** `layers/portal/pages/portal/index.vue`

**Функціональність:**
- Статистика проектів
- Останні активності
- Швидкі посилання

### Проекти

**Маршрути:**
- `/portal/projects` — список проектів
- `/portal/projects/[id]` — деталі проекту
- `/portal/projects/[id]/tasks` — задачі проекту
- `/portal/projects/[id]/files` — файли проекту
- `/portal/projects/[id]/billing` — білінг проекту

**Функціональність:**
- Перегляд всіх проектів клієнта
- Деталі проекту з задачами та файлами
- Етапи проекту (milestones)
- Активності проекту

### Білінг

**Маршрути:**
- `/portal/billing` — список інвойсів
- `/portal/billing/invoices` — всі інвойси
- `/portal/billing/invoices/[id]` — деталі інвойсу

**Функціональність:**
- Перегляд інвойсів
- Оплата через Stripe
- Історія платежів

### Файли

**Маршрути:**
- `/portal/files` — всі файли
- `/portal/files/folders/[id]` — файли в папці

**Функціональність:**
- Перегляд файлів проекту
- Завантаження файлів
- Організація в папки

### Акаунт

**Маршрут:** `/portal/account`

**Функціональність:**
- Налаштування профілю
- Зміна паролю
- Налаштування сповіщень

## Компоненти

### FileCard, FilesView

Компоненти для роботи з файлами:

```vue
<template>
  <FilesView :project-id="projectId" />
</template>
```

**Props:**
- `projectId` — ID проекту

### InvoiceWidget

Віджет для відображення інвойсів:

```vue
<template>
  <InvoiceWidget :invoice="invoice" />
</template>
```

**Props:**
- `invoice` — об'єкт інвойсу

### TaskList, Task

Компоненти для управління задачами:

```vue
<template>
  <TaskList :tasks="tasks" />
</template>
```

**Props:**
- `tasks` — масив задач

### ProjectMilestones

Відображення етапів проекту:

```vue
<template>
  <ProjectMilestones :project-id="projectId" />
</template>
```

## Композабли

### useStripe

Робота з Stripe для оплати:

```typescript
const {
  createCheckoutSession,
  createPortalLink
} = useStripe()

// Створення сесії оплати
const session = await createCheckoutSession({
  invoiceId: 'invoice-id',
  returnUrl: '/portal/billing',
})

// Створення посилання на портал
const portalLink = await createPortalLink({
  returnUrl: '/portal/billing',
})
```

## API Endpoints

### Portal Search

**Маршрут:** `/api/portal/search`

**Метод:** GET

**Параметри:**
- `q` — пошуковий запит

**Відповідь:**
```json
{
  "projects": [...],
  "tasks": [...],
  "files": [...]
}
```

### Stripe Endpoints

#### Create Checkout Session

**Маршрут:** `/api/stripe/create-checkout-session`

**Метод:** POST

**Body:**
```json
{
  "invoiceId": "invoice-id",
  "returnUrl": "/portal/billing"
}
```

#### Create Portal Link

**Маршрут:** `/api/stripe/create-portal-link`

**Метод:** POST

**Body:**
```json
{
  "returnUrl": "/portal/billing"
}
```

#### Webhooks

**Маршрут:** `/api/stripe/webhooks`

**Метод:** POST

Обробляє події від Stripe (payment succeeded, invoice paid, тощо).

## Автентифікація

Portal використовує автентифікацію через Directus:

```vue
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
```

**Особливості:**
- Тільки автентифіковані користувачі можуть отримати доступ
- Автоматичний редирект на `/auth/signin` для неавтентифікованих
- Ролі та permissions налаштовуються в Directus

## Permissions

Налаштування permissions в Directus:

1. **Client Role** — роль для клієнтів
2. **Permissions** — налаштування доступу до:
   - `os_projects` — тільки свої проекти
   - `os_tasks` — тільки задачі своїх проектів
   - `os_invoices` — тільки свої інвойси
   - `os_project_files` — тільки файли своїх проектів

## Налаштування

### Environment Variables

```txt
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Nuxt Config

```typescript
// layers/portal/nuxt.config.ts
export default defineNuxtConfig({
  // Конфігурація для portal layer
})
```

## Наступні кроки

- [Proposals Layer](/modules/proposals) — система пропозицій
- [API](/api/) — робота з API

