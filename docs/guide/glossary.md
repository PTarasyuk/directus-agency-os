## Словник термінів

У цьому розділі зібрані **специфічні терміни**, які часто зустрічаються в документації AgencyOS.

> Порада: при першій появі терміна в тексті документації можна робити посилання на відповідний розділ цього словника, наприклад:  
> `див. [Композабли](/guide/glossary#композабли-composables)`.

---

### Композабли (Composables)

**Що це:**  
Функції `useSomething()`, які інкапсулюють повторювану логіку (стан, запити до API, роботу з браузером тощо) і можуть повторно використовуватись у різних компонентах.

**Де використовуються в проекті:**  
- Директорія `composables/` (глобальні композабли, напр. `useScroll`)  
- `modules/directus/runtime/composables/` (робота з Directus: `useDirectus`, `useDirectusAuth`, `useFiles`)  
- `layers/portal/composables/`, `layers/proposals/composables/`

**Документація:**  
- Vue Composables: [`https://vuejs.org/guide/reusability/composables.html`](https://vuejs.org/guide/reusability/composables.html)  
- VueUse: [`https://vueuse.org`](https://vueuse.org)  
- AgencyOS: [Модулі / Composables](/modules/composables)

---

### Nuxt Layer (Layer, Nuxt Layers)

**Що це:**  
Модульна надбудова Nuxt, яка дозволяє розбивати проект на “шари” з власними сторінками, компонентами, конфігурацією (`nuxt.config.ts`) і навіть модулями.

**Приклади в AgencyOS:**  
- `layers/portal/` — клієнтський портал  
- `layers/proposals/` — система пропозицій (proposals)

**Документація:**  
- Nuxt Layers: [`https://nuxt.com/docs/guide/going-further/layers`](https://nuxt.com/docs/guide/going-further/layers)  
- AgencyOS: [Архітектура / Layers](/architecture/layers)

---

### Page Builder (PageBuilder)

**Що це:**  
Компонент, який збирає сторінку з набору блоків (Hero, FAQ, Gallery тощо), збережених у Directus. Дозволяє редагувати структуру сторінок без змін у коді.

**Де дивитись:**  
- Компонент: `components/PageBuilder.vue`  
- Документація: [Компоненти / Page Builder](/components/page-builder)

---

### Блок (Block, Content Block)

**Що це:**  
Повторно використовувана секція сторінки (Hero, CTA, Testimonials, Steps…), яка зберігається як запис у Directus та рендериться через Page Builder.

**Приклади:**  
- `components/blocks/Hero.vue`  
- `components/blocks/Faqs.vue`  
- `components/blocks/Steps.vue`

**Документація:**  
- [Компоненти / Blocks](/components/blocks)

---

### Колекція Directus (Collection)

**Що це:**  
Таблиця в базі даних, керована Directus. Кожна колекція відповідає певному типу сутності: `pages`, `posts`, `os_projects`, `os_proposals` тощо.

**Де дивитись:**  
- Directus Admin → Collections  
- AgencyOS: [Архітектура / Data Schema](/architecture/data-schema)

Офіційна документація Directus:  
[`https://docs.directus.io`](https://docs.directus.io)

---

### Singleton (Directus Singleton)

**Що це:**  
Спеціальний тип колекції Directus, яка містить **один запис** (глобальні налаштування, SEO‑параметри тощо).

**Приклади в AgencyOS:**  
- `globals` — глобальні налаштування сайту

**Документація:**  
- Directus Singletons: [`https://docs.directus.io/app/data-model/singletons.html`](https://docs.directus.io/app/data-model/singletons.html)

---

### Portal (Клієнтський портал)

**Що це:**  
Автентифікований інтерфейс для клієнтів, де вони можуть переглядати проекти, задачі, файли, інвойси та виконувати оплати.

**Де дивитись:**  
- Код: `layers/portal/`  
- Документація: [Layers / Portal](/layers/portal) та [Modules / Portal](/modules/portal)

---

### Proposal (Пропозиція)

**Що це:**  
Комерційна пропозиція/оферта для клієнта з блоками контенту, цінами, секцією підпису (e‑signature).

**Де дивитись:**  
- Код: `types/os/os-proposal.ts`, `layers/proposals/`  
- Документація: [Layers / Proposals](/layers/proposals) та [Modules / Proposals](/modules/proposals)

---

### SEO (Search Engine Optimization)

**Що це:**  
Набір практик та налаштувань (meta‑теги, OG, sitemap, JSON‑LD, canonical), які покращують видимість сайту в пошукових системах.

**В AgencyOS:**  
- Модуль `@nuxtjs/seo`  
- Колекція `seo` в Directus  
- Автоматичне генерування OG‑зображень (`components/OgImage/Template.vue`)

**Документація:**  
- Nuxt SEO: [`https://nuxtseo.com`](https://nuxtseo.com)  
- AgencyOS: [API / SEO та Server API](/api/server-api)

---

### OG Image (Open Graph Image)

**Що це:**  
Зображення, яке відображається при поширенні сторінки в соцмережах (Facebook, LinkedIn, X). Генерується динамічно на основі контенту сторінки.

**В AgencyOS:**  
- Компонент: `components/OgImage/Template.vue`  
- Конфігурація: `ogImage` в `nuxt.config.ts`

Документація Nuxt OG Image:  
[`https://nuxtseo.com/og-image`](https://nuxtseo.com/og-image)

---

### CRM (Customer Relationship Management)

**Що це:**  
Модуль для управління організаціями, контактами, угодами (deals), задачами та активностями.

**В AgencyOS:**  
- Колекції `organizations`, `contacts`, `os_deals`, `os_tasks`, `os_activity`  
- Інтерфейси в Directus + Portal

Документація по структурі даних:  
- [Архітектура / Data Schema](/architecture/data-schema)  
- [OS / Collections](/layers/portal) (опис проектів, задач, інвойсів)


