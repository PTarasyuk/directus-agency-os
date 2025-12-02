# Архітектура головного сайту (Marketing Site)

Цей розділ описує, як AgencyOS будує та рендерить **головний публічний сайт** (маркетингову частину), **без** урахування Portal та Proposals Layers.

## 1. Роутинг та основна сторінка

### Catch‑all сторінка

- **Файл:** `pages/[...permalink].vue`
- **Маршрути, які вона обробляє:**
  - `/` — головна
  - `/about`, `/services`, `/articles/...` тощо
  - будь‑який інший публічний URL, який не належить до `/portal/**` або `/proposals/**`

Логіка:

1. Через `useRoute()` читається поточний `path`.
2. Нормалізується `permalink` (видаляються зайві слеші, окрема обробка `/`).
3. Робиться запит до Directus колекції `pages` з фільтром по `permalink`.

Спрощено в коді:

```ts
const { path } = useRoute()

const pageFilter = computed(() => ({
  permalink: { _eq: normalisedPath(path) }
}))

const { data: page } = await useAsyncData(path, () =>
  useDirectus(
    readItems('pages', {
      filter: unref(pageFilter),
      fields: [/* основні поля, seo, blocks */],
      limit: 1,
    })
  )
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
```

## 2. Дані з Directus: `pages`, `pages_blocks` та SEO

Основні колекції для сайту:

- **`pages`** — опис сторінки (title, summary, permalink, статус, SEO тощо)
- **`pages_blocks`** — звʼязок сторінок із контентними блоками
- **`seo`** — SEO‑налаштування (title, description, canonical, Open Graph тощо)

У `pages/[...permalink].vue` через `fields: [...]` завантажуються:

- основні поля сторінки (`title`, `summary`, `permalink` тощо);
- звʼязаний запис `seo`;
- масив `blocks` з вкладеними структурами:
  - `block_hero`, `block_faqs`, `block_richtext`, `block_testimonials`,
  - `block_quote`, `block_cta`, `block_form`, `block_logocloud`,
  - `block_gallery`, `block_steps`, `block_columns`,
  - `block_divider`, `block_team`, `block_html`, `block_video`, `block_cardgroup` тощо.

Це дозволяє **одним запитом** отримати всю інформацію для рендерингу сторінки.

Докладніше про схему даних: [Data Schema](/architecture/data-schema).

## 3. Рендеринг через `PageBuilder`

### Компонент `PageBuilder`

- **Файл:** `components/PageBuilder.vue`
- **Завдання:** прийняти обʼєкт `page` з Directus та відрендерити **послідовність блоків** відповідними Vue‑компонентами.

Типовий виклик у `pages/[...permalink].vue`:

```vue
<PageBuilder v-if="page" :page="page as Page" />
```

Всередині `PageBuilder`:

1. Ітерується по `page.blocks`.
2. Для кожного елемента читається `collection` (тип блоку) та `item` (дані блоку).
3. На основі `collection` обирається Vue‑компонент із `components/blocks/*.vue`.
4. Дані `item` передаються як `props` в обраний компонент блоку.

Напрямок звʼязку:

```
Directus: pages + pages_blocks + block_*  →  PageBuilder  →  components/blocks/*
```

Докладніше:

- [Компоненти / Page Builder](/components/page-builder)
- [Компоненти / Blocks](/components/blocks)

## 4. Глобальна конфігурація сайту (`globals`)

Для брендингу, логотипів та соціальних посилань використовується singleton‑колекція **`globals`** у Directus.

- Під час запуску Nuxt модуль Directus робить server‑side запит `readSingleton('globals')`.
- Отримані дані додаються в `appConfig.globals`.
- Через `useAppConfig()` ці дані доступні в будь‑якому компоненті.

Приклади використання:

- У `app.vue` для JSON‑LD `Organization` (назва, логотип, соцмережі).
- У компонентах навігації (`TheHeader.vue`, `TheFooter.vue`) для відображення логотипів та соц. посилань.

Докладніше:

- [Modules / Directus](/modules/directus)
- [Architecture / Key Files](/architecture/key-files)

## 5. SEO, OG‑зображення та Schema.org

У `pages/[...permalink].vue` після завантаження сторінки обчислюється `metadata` на основі:

- полів `page.seo` (title, meta description, canonical, OG image),
- fallback до базових полів сторінки (`title`, `summary`),
- глобальних налаштувань (`globals` → оголошене OG‑зображення за замовчуванням).

Далі виконується:

- **`useHead`** — встановлює `<title>` та canonical‑посилання;
- **`useServerSeoMeta`** — генерує meta‑та OG‑теги;
- **`defineOgImageComponent('OgImageTemplate', { ... })`** — підключає динамічний компонент OG‑зображення `components/OgImage/Template.vue`;
- **`useSchemaOrg(defineWebPage(...))`** — додає JSON‑LD для сторінки.

Таким чином, кожна сторінка, зібрана через Page Builder, автоматично має коректні SEO‑теги та OG‑зображення.

Докладніше:

- [API / Server API](/api/server-api)
- Nuxt SEO: [`https://nuxtseo.com`](https://nuxtseo.com)

## 6. Глобальний пошук

Глобальний пошук по сайту реалізовано через:

- фронтенд‑компонент `components/GlobalSearch.vue`,
- серверний endpoint `server/api/search.get.ts`, який використовує `directusServer` і колекції `pages`, `posts`, `help_articles` тощо.

Потік:

1. Користувач вводить запит у `GlobalSearch`.
2. Компонент викликає `/api/search?collections=pages,posts,help_articles&search=...`.
3. `server/api/search.get.ts` через `directusServer.request(readItems(...))` шукає по відповідних колекціях.
4. Результати приводяться до єдиного формату та повертаються в UI.

Докладніше: [API / Endpoints](/api/endpoints).

## 7. Форми та інші блоки

### Форми

Форми на сайті (контактні, запит проекту тощо) будуються з Directus через блок `block_form`:

- у Directus конфігурується форма та її поля;
- фронтенд через `block_form` отримує схему та передає її до власних form‑компонентів (`UForm`, `FormCustom`, утиліти `utils/formkit.ts`).

### Інші блоки

Кожен `block_*` (Hero, FAQ, Gallery, Steps, Team, CTA тощо) має власний Vue‑компонент у `components/blocks/`.

- Дані для блоку приходять з Directus через Page Builder.
- Компонент відповідає за layout та візуалізацію, не за бізнес‑логіку.

Докладніше: [Компоненти / Blocks](/components/blocks).

## 8. Підсумок

Головний сайт AgencyOS працює за таким принципом:

1. **Nuxt Router** віддає всі публічні URL у `pages/[...permalink].vue`.
2. **Directus** зберігає структуру сторінок (`pages` + `pages_blocks` + `block_*`) та SEO‑дані.
3. **PageBuilder** перетворює структуру блоків на Vue‑компоненти.
4. **Globals + SEO + OG + Schema.org** відповідають за бренд, метадані та відображення в пошукових системах.
5. Додаткові фічі (глобальний пошук, форми, редіректи) розширюють маркетингову частину без зміни базової моделі.

Це дозволяє змінювати сайт переважно через Directus (контент і структуру), мінімально торкаючись коду Nuxt.
