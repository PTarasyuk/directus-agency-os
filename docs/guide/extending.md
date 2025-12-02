# Розширення AgencyOS

Цей розділ показує, як розширювати AgencyOS як full‑stack розробнику: додавати нові блоки Page Builder, сторінки в порталі та OS‑колекції в Directus.

## 1. Додавання нового блоку Page Builder

Мета: створити новий контентний блок (наприклад, `block_feature`) для маркетингового сайту та/або пропозицій.

### Крок 1: Додати колекцію в Directus

1. У Directus Admin відкрийте **Data Model**.
2. Створіть нову колекцію, наприклад `block_feature`.
3. Додайте потрібні поля (title, description, image тощо).
4. За потреби додайте звʼязки з іншими колекціями.

> Якщо ви працюєте з шаблоном, переконайтеся, що зміни збережені в експорті схеми (якщо ви його використовуєте).

### Крок 2: Додати типи в `types/blocks` та `types/schema.ts`

1. Додайте інтерфейс у відповідний файл `types/blocks/block-feature.ts`:

```ts
export interface BlockFeature {
  id: string
  title?: string
  description?: string
  image?: string | File
}
```

2. Оновіть `types/index.ts` (якщо потрібно) та `types/schema.ts`, додавши `block_feature` до схеми:

```ts
export interface Schema {
  // ...
  block_feature: BlockFeature[]
}
```

### Крок 3: Додати Vue‑компонент блоку

1. Створіть компонент, наприклад `components/blocks/Feature.vue`:

```vue
<script setup lang="ts">
import type { BlockFeature } from '~/types'

defineProps<{
  data: BlockFeature
}>()
</script>

<template>
  <section class="py-16">
    <h2 class="text-3xl font-bold">{{ data.title }}</h2>
    <p class="mt-2 text-gray-600">{{ data.description }}</p>
    <!-- зображення / інший контент -->
  </section>
</template>
```

### Крок 4: Підключити блок у Page Builder

1. Знайдіть `components/PageBuilder.vue`.
2. Додайте мапінг нового `collection` (наприклад, `block_feature`) на компонент:

```ts
const componentMap = {
  // ...
  block_feature: Feature,
}
```

3. Переконайтеся, що в запиті в `pages/[...permalink].vue` (і, за потреби, в Proposals) додано `block_feature` у `fields.item`.

Після цього новий блок стане доступним в Directus, і редактори зможуть додавати його до сторінок.

---

## 2. Додавання нової сторінки в Portal

Мета: додати, наприклад, сторінку `/portal/reports` з власним UI та даними.

### Крок 1: Створити сторінку

1. Створіть файл `layers/portal/pages/portal/reports.vue`:

```vue
<script setup lang="ts">
definePageMeta({
  layout: 'portal',
  middleware: 'auth',
})

// Завантаження даних, наприклад, через useDirectus або власний endpoint
</script>

<template>
  <PortalPageContainer>
    <PortalPageHeader title="Reports" />
    <!-- Ваш контент -->
  </PortalPageContainer>
</template>
```

### Крок 2: Додати доступ до даних

- **Простий варіант:** використовувати `useDirectus(readItems(...))` прямо в сторінці.
- **Більш контрольований варіант:** створити server endpoint у `layers/portal/server/api/portal/`, який:
  - працює через `directusServer` з static token;
  - повертає агреговані дані для звітів;
  - викликається з фронтенду через `$fetch('/api/portal/reports')`.

### Крок 3: Додати пункт навігації

1. Додайте посилання в компонент навігації порталу (`layers/portal/components/...`, наприклад, sidebar/header).
2. За потреби оновіть права доступу в Directus, щоб користувачі бачили потрібні дані.

---

## 3. Додавання нової OS‑колекції

Мета: додати нову “бізнес‑сутність” (наприклад, `os_retainers` для ретейнерних договорів).

### Крок 1: Створити колекцію в Directus

1. У Directus Data Model створіть колекцію `os_retainers`.
2. Додайте поля (name, organization, amount, currency, billing_cycle, status тощо).
3. Налаштуйте звʼязки:
   - до `organizations`;
   - до `os_projects` або `os_invoices` (залежно від бізнес‑логіки).

### Крок 2: Оновити TypeScript типи

1. Додайте інтерфейс в `types/os/os-retainer.ts`:

```ts
export interface OsRetainer {
  id: string
  name: string
  organization?: string | Organization
  amount: number
  currency: string
  status: 'active' | 'paused' | 'cancelled'
  // ...
}
```

2. Додайте колекцію в `types/schema.ts`:

```ts
export interface Schema {
  // ...
  os_retainers: OsRetainer[]
}
```

### Крок 3: Відобразити в Portal

1. Додайте сторінку/виджет у Portal для роботи з ретейнерами (`layers/portal/pages/portal/retainers.vue` + компонент у `layers/portal/components`).
2. Читайте дані через `useDirectus` або server endpoint.
3. За потреби, інтегруйте з білінгом (Stripe) через існуючу інфраструктуру payment/invoices.

---

## 4. Корисні розділи

Для детального розширення дивіться також:

- [Data Schema](/architecture/data-schema) — повний опис колекцій та типів
- [Marketing Site](/architecture/marketing-site) — як рендеряться публічні сторінки
- [Portal](/architecture/portal) — архітектура порталу
- [Proposals](/architecture/proposals) — архітектура пропозицій
- [Модуль Directus](/modules/directus) — інтеграція з Directus, composables, middleware\n*** End Patch"}]}-->

