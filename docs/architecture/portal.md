# Архітектура Portal (Client Portal)

Цей розділ описує, як працює **Portal Layer** — автентифікований клієнтський портал на маршрутах `/portal/**`.

На відміну від маркетингового сайту (SSR), портал працює як **SPA‑додаток**, орієнтований на щоденну роботу клієнтів з проектами, задачами, файлами та білінгом.

## 1. Роутинг та режим рендерингу

- **Файл конфігурації:** `layers/portal/nuxt.config.ts`
- **Основні маршрути:**
  - `/auth/**` — екрани авторизації
  - `/portal/**` — весь клієнтський портал

```ts
export default defineNuxtConfig({
  components: [{ path: './components/', prefix: 'Portal' }],
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

**Ключові моменти:**

- `ssr: false` для `/portal/**` — портал працює як SPA (краща UX для аплікаційних сценаріїв).
- `index: false` — сторінки порталу не індексуються пошуковими системами.

## 2. Структура файлів Portal Layer

```text
layers/portal/
├── components/          # Компоненти порталу
│   ├── FileCard.vue
│   ├── FilesView.vue
│   ├── InvoiceWidget.vue
│   ├── MessageList.vue
│   ├── PageContainer.vue
│   ├── PageHeader.vue
│   ├── PortalSearch.vue
│   ├── ProjectActivity.vue
│   ├── ProjectMilestones.vue
│   ├── Stats.vue
│   ├── Task.vue
│   ├── TaskList.vue
│   └── TaskWidget.vue
├── composables/
│   └── useStripe.ts     # Робота з Stripe
├── pages/
│   ├── auth.vue         # Layout для сторінок авторизації
│   └── portal/
│       ├── index.vue    # Головна панель порталу
│       ├── account/     # Налаштування акаунту
│       ├── billing/     # Білінг
│       ├── files/       # Файли
│       ├── help/        # Довідка
│       └── projects/    # Проекти та задачі
├── server/
│   └── api/
│       ├── portal/      # API порталу (пошук)
│       └── stripe/      # Stripe endpoints
└── nuxt.config.ts
```

Докладніше про компоненти та сторінки: [Layers / Portal](/layers/portal).

## 3. Джерела даних (Directus)

Портал використовує ті самі Directus‑колекції, що і основний OS‑шар:

- **Проекти та задачі:**
  - `os_projects` — проекти
  - `os_tasks` — задачі
- **Фінанси:**
  - `os_invoices`, `os_items`, `os_tax_rates`, `os_payments` — інвойси, позиції, податки, платежі
- **Клієнти:**
  - `organizations`, `organization_addresses`, `organization_contacts`
  - `contacts`

Доступ до даних здійснюється двома шляхами:

- **На клієнті:** через `useDirectus(readItems(...))` з сесійними куками (автентифікований користувач).
- **На сервері (Portal API):** через `directusServer` у `layers/portal/server/api/portal/*.ts` та `stripe/*.ts` (повний доступ зі static token).

Докладніше про структуру колекцій: [Data Schema](/architecture/data-schema).

## 4. Сторінки порталу та їх логіка

### `/portal`

Головна панель:

- статистика по проектах,
- останні задачі,
- останні файли,
- останні повідомлення.

Збирає дані з `os_projects`, `os_tasks`, `directus_files` (та при потребі з додаткових колекцій).

### `/portal/projects` та `/portal/projects/[id]`

- `/portal/projects`:
  - список проектів, доступних поточному користувачу;
  - фільтрація по ролі/організації (через Directus permissions або фільтри в запитах).

- `/portal/projects/[id]`:
  - деталі конкретного проекту (`os_projects`);
  - вкладки з задачами (`os_tasks`), файлами (`directus_files`), активностями, білінгом тощо;
  - використовує Portal‑компоненти: `PortalTaskList`, `PortalFilesView`, `PortalProjectMilestones`, `PortalInvoiceWidget` тощо.

### `/portal/billing`

Білінгова секція:

- список інвойсів (`os_invoices`);
- історія платежів (`os_payments`);
- підписки (`os_subscriptions`, якщо використовується).

Тут же відображаються кнопки “Оплатити” / “Керувати підпискою”, які взаємодіють зі Stripe.

### `/portal/files`

Файловий менеджер:

- перегляд файлів (`directus_files`);
- завантаження нових файлів (через Directus Files API);
- привʼязка файлів до проектів.

### `/portal/account`

Налаштування акаунту користувача (поля з `directus_users` та повʼязаних колекцій, наприклад `contacts`).

## 5. Stripe та білінг

### Composable `useStripe`

- Файл: `layers/portal/composables/useStripe.ts`
- Функції:
  - `createCheckoutSession` — створити checkout‐сесію для оплати інвойсу;
  - `createPortalLink` — створити посилання на Stripe Customer Portal.

### Server API для Stripe

У `layers/portal/server/api/stripe/` реалізовані:

- `/api/stripe/create-checkout-session` — створення checkout session;
- `/api/stripe/create-portal-link` — лінк в customer portal;
- `/api/stripe/webhooks` — обробка webhook‑ів та оновлення статусів в `os_invoices` / `os_payments`.

Потік для оплати інвойсу:

1. У віджеті `PortalInvoiceWidget` користувач натискає “Оплатити”.
2. Компонент викликає `useStripe().createCheckoutSession({ invoice_id, return_url })`.
3. Endpoint на сервері звертається до Stripe через `stripe` SDK.
4. Користувача редіректить на Stripe Checkout.
5. Після оплати Stripe викликає webhook, який оновлює записи в Directus.

Докладніше: [API / Endpoints](/api/endpoints) та [Layers / Portal](/layers/portal).

## 6. Автентифікація та безпека

Портал побудований навколо Directus Auth:

- Користувач логіниться через `useDirectusAuth().login()` (на публічному сайті).
- Сесія зберігається в cookie (session‑based auth).
- Портальні маршрути перевіряють автентифікацію через middleware (див. модуль Directus).
- Дані фільтруються за користувачем / організацією на рівні Directus permissions та/або фільтрів у запитах.

Докладніше:

- [Modules / Directus](/modules/directus)
- [API / Authentication](/api/authentication)

## 7. Типовий сценарій роботи користувача (walkthrough)

Приклад щоденного флоу клієнта в порталі:

1. Клієнт логіниться через `/auth/signin` (модуль Directus створює сесію).
2. Потрапляє на `/portal`, де бачить:
   - активні проекти,
   - останні задачі,
   - останні файли та повідомлення.
3. Переходить на `/portal/projects/[id]`, щоб:
   - перевірити статус задач,
   - завантажити/переглянути файли,
   - переглянути етапи (`PortalProjectMilestones`).
4. Відкриває `/portal/billing`, щоб:
   - переглянути список інвойсів (`os_invoices`),
   - оплатити відкритий інвойс через Stripe,
   - переглянути історію платежів (`os_payments`).
5. За потреби переходить на `/portal/account`, щоб оновити свої дані.

Цей флоу повністю базується на даних з Directus (OS‑колекції) та permission‑ах, налаштованих для клієнтської ролі.

## 8. Взаємодія з Marketing Site та Proposals

- Портал використовує ті ж `organizations`, `contacts`, `os_projects`, `os_invoices`, що і основний OS‑шар.
- Пропозиції (Proposals) можуть створюватися з угод/проектів і в подальшому конвертуватися в інвойси, які видно у порталі.

Для повної картини:

- [Marketing Site](/architecture/marketing-site)
- [Proposals](/architecture/proposals)
- [Data Schema](/architecture/data-schema)



