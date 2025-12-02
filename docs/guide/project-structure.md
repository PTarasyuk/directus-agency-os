# Структура проекту

Детальний опис структури директорій AgencyOS.

## Загальна структура

```
directus-agency-os/
├── app.config.ts              # Конфігурація додатку (UI тема)
├── app.vue                    # Корневий компонент
├── nuxt.config.ts             # Конфігурація Nuxt
├── theme.ts                   # Тема та стилі
├── package.json               # Залежності
├── tailwind.config.ts         # Конфігурація Tailwind
├── tsconfig.json              # TypeScript конфігурація
│
├── assets/                    # Статичні ресурси
│   ├── css/                   # Стилі
│   │   ├── tailwind.css      # Tailwind стилі
│   │   └── main.css          # Додаткові стилі
│   ├── illustrations/         # SVG ілюстрації
│   └── img/                   # Зображення
│
├── components/                # Vue компоненти
│   ├── base/                  # Базові UI компоненти
│   ├── blocks/                # Блоки для page builder
│   ├── navigation/            # Навігація
│   ├── post/                  # Компоненти постів
│   └── typography/            # Типографіка
│
├── composables/               # Vue композабли
│   └── useScroll.ts
│
├── layouts/                   # Layout компоненти
│   ├── app.vue               # Основний layout
│   ├── auth.vue              # Layout для автентифікації
│   ├── blank.vue             # Порожній layout
│   ├── default.vue           # Дефолтний layout
│   └── proposal.vue          # Layout для пропозицій
│
├── layers/                    # Nuxt Layers
│   ├── portal/               # Клієнтський портал
│   └── proposals/            # Система пропозицій
│
├── middleware/                # Route middleware
│   └── session.global.ts    # Глобальний middleware сесії
│
├── modules/                   # Кастомні Nuxt модулі
│   └── directus/            # Модуль інтеграції Directus
│
├── pages/                     # File-based routing
│   ├── [...permalink].vue   # Динамічні сторінки
│   ├── auth/                # Автентифікація
│   ├── help/                # Довідка
│   └── posts/               # Блог
│
├── plugins/                   # Nuxt плагіни
│   └── dompurify-html.ts    # Sanitization HTML
│
├── public/                    # Публічні файли
│   └── logos/               # Логотипи
│
├── server/                    # Server-side код
│   ├── api/                  # API endpoints
│   └── utils/               # Server утиліти
│
├── types/                     # TypeScript типи
│   ├── api/                  # API типи
│   ├── blocks/               # Типи блоків
│   ├── content/              # Типи контенту
│   ├── meta/                 # Мета-типи
│   ├── os/                   # Типи OS
│   └── schema.ts             # Головна схема
│
└── utils/                     # Утиліти
    ├── color.ts
    ├── currency.ts
    ├── navigation.ts
    └── ...
```

## Детальний опис директорій

### `/components`

Vue компоненти проекту.

#### `base/`
Базові UI компоненти:
- `LoginForm.vue` — форма автентифікації
- `VAlert.vue` — алерти
- `VAvatar.vue` — аватар
- `VBreadcrumbs.vue` — навігаційні хлібні крихти
- `VGallery.vue` — галерея
- `VLoading.vue` — індикатор завантаження
- `VUpload.vue` — завантаження файлів

#### `blocks/`
Блоки для Page Builder:
- `Hero.vue` — hero секція
- `RichText.vue` — багатий текст
- `Columns.vue` — колонки
- `Cta.vue` — call-to-action
- `Form.vue` — динамічні форми
- `Gallery.vue` — галерея
- `Faqs.vue` — FAQ
- `Testimonials.vue` — відгуки
- `Team.vue` — команда
- `Video.vue` — відео
- `Steps.vue` — кроки
- `Quote.vue` — цитата
- `LogoCloud.vue` — хмара логотипів
- `Divider.vue` — розділювач
- `RawHtml.vue` — сирий HTML

#### `navigation/`
Компоненти навігації:
- `TheHeader.vue` — головне меню
- `TheFooter.vue` — футер
- `MobileMenu.vue` — мобільне меню
- `MenuItem.vue` — пункт меню

### `/composables`

Vue композабли (auto-import).

### `/layouts`

Layout компоненти для різних типів сторінок.

### `/layers`

Nuxt Layers для модульності.

#### `portal/`
Клієнтський портал:
- `components/` — компоненти порталу
- `composables/` — композабли порталу
- `pages/` — сторінки порталу
- `server/` — server API порталу

#### `proposals/`
Система пропозицій:
- `components/` — компоненти пропозицій
- `composables/` — композабли пропозицій
- `pages/` — сторінки пропозицій

### `/modules`

Кастомні Nuxt модулі.

#### `directus/`
Модуль інтеграції Directus:
- `index.ts` — конфігурація модуля
- `runtime/` — runtime логіка
  - `composables/` — композабли
  - `plugins/` — плагіни
  - `middleware/` — middleware

### `/pages`

File-based routing для сторінок.

### `/server`

Server-side код.

#### `api/`
API endpoints:
- `_sitemap-urls.ts` — генерація sitemap
- `feedback.post.ts` — feedback API
- `search.get.ts` — пошук
- `proxy/` — proxy endpoints

#### `utils/`
Server утиліти:
- `directus-server.ts` — Directus клієнт (server)

### `/types`

TypeScript типи для Directus схеми.

#### `blocks/`
Типи для блоків page builder.

#### `content/`
Типи для контенту (pages, posts, тощо).

#### `os/`
Типи для OS (проекти, інвойси, тощо).

#### `schema.ts`
Головна схема Directus.

### `/utils`

Утиліти для роботи з даними:
- `color.ts` — робота з кольорами
- `currency.ts` — форматування валют
- `navigation.ts` — навігація
- `strings.ts` — робота з рядками
- `time.ts` — робота з часом
- `user-name.ts` — імена користувачів

## Auto-imports

Nuxt автоматично імпортує:

- **Компоненти** з `components/`
- **Композабли** з `composables/`
- **Утиліти** з `utils/`
- **Команди Directus SDK** з `@directus/sdk`

## Наступні кроки

- [Архітектура](/architecture/) — розуміння архітектури
- [Модулі](/modules/) — робота з модулями
- [Компоненти](/components/) — робота з компонентами
