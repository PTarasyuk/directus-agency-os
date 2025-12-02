# CRM / OS Flow (Sales → Projects → Invoices)

Цей розділ описує високорівневий **бізнес‑флоу CRM / OS** в AgencyOS: від ліда та угоди до проектів, задач та інвойсів.

## 1. Основні сутності

Основні Directus‑колекції, які формують CRM / OS:

- **organizations** — компанії‑клієнти
- **contacts** — контактні особи
- **os_deals** — продажі / угоди (opportunities)
- **os_projects** — проекти
- **os_tasks** — задачі
- **os_proposals** — пропозиції
- **os_invoices**, **os_items**, **os_tax_rates**, **os_payments** — інвойси, позиції, податки, платежі

Докладна структура полів описана в [Data Schema](/architecture/data-schema).

## 2. Флоу: від ліда до угоди

1. **Лід / запит** потрапляє через форму на сайті або вручну вноситься в Directus.
2. Створюється **Organization** (якщо це новий клієнт) та один чи кілька **Contacts**.
3. Для конкретного запиту створюється **os_deal** (угода):
   - посилання на `organization` та ключові `contacts`;
   - оцінена вартість, статус (наприклад, `new`, `in_progress`, `won`, `lost`).
4. На базі угоди можна створити **os_proposal** (див. [Proposals](/architecture/proposals)).

## 3. Пропозиція → проект

Коли пропозиція погоджена:

1. У `os_proposals` статус змінюється на `accepted`.
2. На її основі створюється **os_project**:
   - організація та контакти копіюються з пропозиції/угоди;
   - базові дані (назва, опис, бюджет, дедлайни) — з пропозиції.
3. Проект стає основною сутністю для подальшої роботи в **Portal**:
   - клієнт бачить його в `/portal/projects`;
   - команда веде задачі, файли, білінг.

## 4. Проект → задачі

Всередині проекту:

- створюються **os_tasks** з привʼязкою до `os_projects`;
- задачі можуть бути призначені відповідальним (`assigned_to` → `directus_users` або `contacts`, залежно від моделі);
- у Portal задачі відображаються у вигляді списків/дошок (`PortalTaskList`, `TaskWidget` тощо).

Типовий запит (спрощено):

```ts
const { data: project } = await useDirectus(
  readItem('os_projects', projectId, {
    fields: [
      '*',
      {
        tasks: ['*'],
        organization: ['*'],
        contacts: ['*', { contacts_id: ['*'] }],
      },
    ],
  }),
)
```

## 5. Проект → інвойси та білінг

Для білінгу використовуються:

- **os_invoices** — інвойси,
- **os_items** — позиції інвойсу,
- **os_tax_rates** — податкові ставки,
- **os_payments** — платежі.

Флоу:

1. Для проекту створюється **інвойс** (`os_invoices`):
   - посилання на `project` та `organization`;
   - сума, валюта, статус (`draft`, `sent`, `paid`, `overdue`);
   - позиції (`os_items`) та податки (`os_tax_rates`).
2. У Portal інвойс відображається у білінг‑секції (`/portal/billing`, `PortalInvoiceWidget`).
3. Клієнт натискає “Оплатити” → Stripe Checkout → webhook оновлює `os_payments` та статус інвойсу.

Докладніше: [Portal](/architecture/portal) та [API / Endpoints](/api/endpoints).

## 6. Звʼязок з Portal

У Portal клієнт бачить вже “зібраний” флоу:

- на `/portal/projects` — усі активні проекти (з Directus `os_projects`);
- всередині проекту — задачі, файли, інвойси;
- на `/portal/billing` — всі інвойси та історія платежів;
- у майбутньому — звʼязок з пропозиціями (`os_proposals`) для повного аудиту.

Frontend‑портал не містить бізнес‑логіки CRM в собі — він працює поверх Directus, де зберігається весь стан.

## 7. Де редагувати / розширювати

- **Схему** (колекції, поля, звʼязки) — в Directus (Data Model) та у файлах `types/os/*.ts`, `types/schema.ts`.
- **Фронтенд‑логіку** — у:
  - Portal Layer (`layers/portal`),
  - Proposals Layer (`layers/proposals`),
  - загальних компонентах/композаблях (`components/`, `composables/`).

Корисні розділи:

- [Data Schema](/architecture/data-schema)
- [Marketing Site](/architecture/marketing-site)
- [Portal](/architecture/portal)
- [Proposals](/architecture/proposals)
- [Розширення AgencyOS](/guide/extending)
