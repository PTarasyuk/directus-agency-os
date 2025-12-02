# Directus Template для AgencyOS

Цей розділ описує Directus‑темплейт, який постачається разом з проектом у директорії `./directus/template`.

Темплейт містить повну схему даних (колекції, поля, звʼязки), необхідну для роботи сайту та CRM‑частини AgencyOS.

## Де знаходиться темплейт

- **Шлях у репозиторії:** `./directus/template`
- **Призначення:** швидко розгорнути усю схему Directus, не створюючи колекції вручну

> Якщо ви використовуєте **Directus Cloud**, ви можете застосувати або віддалений темплейт через `directus-template-cli`, або локальний з цієї директорії (через імпорт у Directus чи CLI). Для self‑hosted сценаріїв локальний темплейт особливо зручний.

## Що входить у темплейт

Темплейт відображає схему, описану в розділі [Архітектура / Data Schema](/architecture/data-schema), і умовно поділяється на кілька блоків:

### 1. Веб‑сайт (Marketing Site)

Колекції для публічного сайту:

- **`pages` / `pages_blocks`** — динамічний Page Builder
- **`posts` / `categories`** — блог та категорії
- **`seo`** — SEO‑налаштування сторінок
- **`redirects`** — редіректи для старих URL

Докладніше: [Архітектура / Data Schema](/architecture/data-schema) та [Компоненти / Page Builder](/components/page-builder).

### 2. CRM / Agency OS

Колекції для операційної діяльності агентства:

- **`organizations` / `organization_addresses` / `organization_contacts`** — організації та їх контакти
- **`contacts`** — окремі контактні особи
- **`os_deals` / `os_activity`** — угоди та sales‑активності
- **`os_projects` / `os_tasks`** — проекти та задачі
- **`os_invoices` / `os_items` / `os_tax_rates` / `os_payments`** — інвойси, позиції, податкові ставки, платежі
- **`os_subscriptions`** — підписки (якщо використовується)

Докладніше: [Архітектура / Data Schema](/architecture/data-schema) та розділи про Portal Layer.

### 3. Proposals (Пропозиції)

Колекції для builderʼа пропозицій та e‑signature:

- **`os_proposals`** — основна сутність пропозиції
- **`os_proposal_blocks`** — блоки контенту всередині пропозиції
- **`os_proposal_approvals`** — підписи та статуси погодження

Ці колекції напряму використовуються в `layers/proposals/`. Докладніше: [Layers / Proposals](/layers/proposals).

### 4. Системні колекції

- **`globals`** — глобальні налаштування сайту (бренд, логотипи, соцмережі)
- **`help_articles` / `help_collections`** — база знань/довідка
- Інші допоміжні колекції, які розширюють стандартні `directus_*`

Докладніше: [Архітектура / Key Files](/architecture/key-files) та [API / Server Utils](/api/server-utils).

## Як застосувати темплейт

Є два основні сценарії:

### Варіант A: `directus-template-cli` (як і раніше)

Як описано в [Початок роботи](/guide/getting-started#крок-3-застосування-шаблону-agencyos):

```bash
npx directus-template-cli@latest apply
```

1. Оберіть `Agency OS` у списку темплейтів
2. Вкажіть URL Directus інстансу
3. Вставте static token admin‑користувача

### Варіант B: Локальний темплейт з `./directus/template`

Для випадків, коли темплейт вже знаходиться поруч з кодом (цей репозиторій):

1. Переконайтеся, що Directus інстанс запущений та доступний
2. Відкрийте адмінку Directus або скористайтеся CLI відповідно до офіційної документації Directus Templates
3. Імпортуйте темплейт з директорії `./directus/template` (наприклад, через `directus schema apply` або UI‑імпорт, залежно від вашого робочого процесу)

Офіційна документація Directus щодо темплейтів/схеми:

- [`https://docs.directus.io`](https://docs.directus.io)

> Конкретна команда імпорту може відрізнятися залежно від версії Directus та інструменту, який ви використовуєте. Орієнтуйтесь на офіційні гіди Directus та приклади у вашому CI/CD.

## Де дізнатись більше

- [Архітектура / Data Schema](/architecture/data-schema) — повний опис колекцій
- [Модулі / Directus](/modules/directus) — як Nuxt‑модуль підключається до Directus
- [Layers / Portal](/layers/portal) та [Layers / Proposals](/layers/proposals) — як шаблон використовують Portal & Proposals Layers

{
  "cells": [],
  "metadata": {
    "language_info": {
      "name": "python"
    }
  },
  "nbformat": 4,
  "nbformat_minor": 2
}