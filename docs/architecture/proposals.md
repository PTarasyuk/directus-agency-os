# Архітектура Proposals (Пропозиції)

Цей розділ описує, як працює **Proposals Layer** — публічні сторінки пропозицій на `/proposals/[id]` з підтримкою e‑signature.

## 1. Роутинг та layout

- **Файл сторінки:** `layers/proposals/pages/proposals/[id].vue`
- **Маршрут:** `/proposals/:id`
- **Layout:** `proposal` (через `definePageMeta({ layout: 'proposal' })`)

Спрощена логіка завантаження пропозиції:

```ts
const { params, path } = useRoute()

const {
  data: proposal,
  pending,
  error,
} = await useAsyncData(path, () =>
  useDirectus(
    readItem('os_proposals', params.id as string, {
      fields: [
        'name',
        {
          organization: ['name', 'logo', 'brand_color'],
          owner: ['first_name', 'last_name', 'avatar', 'title'],
          blocks: [
            'collection',
            {
              item: {
                block_hero: ['id', 'title', 'headline', 'content', 'image', 'buttons', 'image_position'],
                // ...інші block_*
              },
            },
          ],
        },
      ],
    }),
  ),
)

if (!proposal.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
```

## 2. Структура даних (Directus)

Основні колекції для пропозицій:

- **`os_proposals`** — основна сутність пропозиції:
  - `name`, `status`, `expiration_date`, `organization`, `deal`, `owner`
  - `blocks` — контентні блоки пропозиції
  - `approvals` — звʼязані підписи/погодження
- **`os_proposal_blocks`** — блоки пропозиції:
  - `os_proposals_id` — посилання на пропозицію
  - `collection`, `item` — структура блоків (Hero, текст, FAQ, ціни тощо)
- **`os_proposal_approvals`** — підписи:
  - `first_name`, `last_name`, `email`, `organization`
  - `signature_text`, `signature_image`, `signature_type`
  - `proposal`, `contact`, `status`, `ip_address`, `metadata`
- **Повʼязані колекції:**
  - `organizations`, `contacts`
  - `directus_files` — зображення, логотипи, файли

Типи описані в:

- `types/os/os-proposal.ts`
- `types/os/organization.ts`
- `types/os/os-deal.ts`, `os-project.ts` (залежно від звʼязків)

Докладніше: [Data Schema](/architecture/data-schema).

## 3. Рендеринг пропозиції

Сторінка пропозиції рендерить кілька основних блоків:

- **`ProposalsHeader`** — шапка пропозиції:
  - логотип, назва пропозиції, назва організації;
  - кнопки “Accept Proposal”, “Chat” (майбутній функціонал).
- **`ProposalsBlocksHero`** — hero‑секція:
  - назва пропозиції;
  - для кого підготовлено (організація);
  - ким підготовлено (owner).
- **`PageBuilder`** — контент пропозиції:
  - використовує той самий підхід, що й маркетинговий сайт,
  - але працює з `os_proposals.blocks` замість `pages.blocks`.
- **`ProposalsBlocksAcceptance`** — секція прийняття:
  - форма з даними підписанта;
  - поле для підпису (через `v-perfect-signature`);
  - створення запису в `os_proposal_approvals`.

Потік даних:

```
Directus: os_proposals + os_proposal_blocks + os_proposal_approvals
  ↓
Nuxt (Proposals Layer)
  ↓
Презентація:
  ProposalsHeader
  ProposalsBlocksHero
  PageBuilder (контентні блоки)
  ProposalsBlocksAcceptance (підписання)
```

Докладніше: [Layers / Proposals](/layers/proposals) та [Компоненти / Page Builder](/components/page-builder).

## 4. E‑signature та approvals

Компонент `ProposalsBlocksAcceptance` виконує кілька завдань:

- Зчитує query‑параметри (наприклад, `approver`) і prefillʼить форму даними контакту з `contacts`.
- Показує форму, де користувач:
  - вводить ПІБ, email, організацію;
  - ставить галочку e‑signature agreement;
  - залишає підпис:
    - як текст (`signature_text`),
    - як картинку (`signature_image`, що завантажується як файл у Directus).
- При сабміті:
  - завантажує файл підпису в `directus_files` (якщо є);
  - створює запис у `os_proposal_approvals` з усіма даними;
  - звʼязує approval з конкретною пропозицією (`proposal`) та, за потреби, з контактом (`contact`).

Типовий сценарій:

1. Клієнт отримує лінк `https://.../proposals/:id?approver=<contact-id>`.
2. Відкриває сторінку, бачить пропозицію та форму прийняття.
3. Заповнює форму та підписує документ.
4. У Directus зʼявляється запис в `os_proposal_approvals`, статус пропозиції може змінитися на `accepted`.

## 5. SSR та публічний доступ

Proposals Layer використовує **SSR** для `/proposals/**`:

- краща SEO‑підтримка, якщо пропозиції потрібно індексувати (або принаймні коректно превʼювати у месенджерах);
- швидший перший рендер для отримувача пропозиції.

Конфігурація:

```ts
export default defineNuxtConfig({
  components: [{ path: './components/', prefix: 'Proposals' }],
  routeRules: {
    '/proposals/**': { ssr: true },
  },
  build: {
    transpile: ['v-perfect-signature'],
  },
})
```

**Доступ:**

- Типово пропозиції доступні по прямому лінку (права налаштовуються в Directus для `os_proposals` / `os_proposal_approvals`).
- За потреби можна обмежити доступ (наприклад, через додаткові токени, статуси, middleware на Nuxt‑боці).

## 6. Типовий сценарій для отримувача пропозиції

1. Менеджер в агентстві створює `os_proposal` у Directus (через UI або кастомний інтерфейс) та заповнює блоки контенту.
2. Клієнту відправляється лінк виду `https://.../proposals/:id?approver=<contact-id>`.
3. Клієнт відкриває сторінку:
   - бачить брендинг агентства (логотип, кольори з `organization`),
   - читає структуру пропозиції (блоки контенту, ціноутворення, FAQ тощо).
4. У секції `ProposalsBlocksAcceptance` клієнт:
   - заповнює свої дані (якщо потрібно),
   - ставить галочку e‑signature agreement,
   - залишає підпис (текстом або малюнком).
5. Після сабміту:
   - створюється запис в `os_proposal_approvals`,
   - статус пропозиції може оновитися на `accepted`,
   - тригериться подальший флоу (створення проекту, інвойсів тощо).

## 7. Взаємодія з Portal та CRM

- Пропозиції звʼязуються з `organizations`, `contacts`, `os_deals`, `os_projects`.
- Прийняті пропозиції можуть далі конвертуватися в інвойси (`os_invoices`) та проекти (`os_projects`), які вже відображаються у Portal.

Для повної картини дивіться:

- [Portal](/architecture/portal)
- [Marketing Site](/architecture/marketing-site)
- [CRM / OS Flow](/architecture/os-crm-flow)
- [Data Schema](/architecture/data-schema)

