# Конфігурація

Детальне опис налаштувань AgencyOS.

## Файли конфігурації

### `nuxt.config.ts`

Основний файл конфігурації Nuxt.

```typescript
export default defineNuxtConfig({
  // Розширення через Layers
  extends: [
    './layers/proposals',
    './layers/portal',
  ],

  // Компоненти
  components: [
    { path: '~/components/base', pathPrefix: false },
    '~/components',
  ],

  // CSS
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],

  // Модулі
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxtjs/seo',
    '@formkit/auto-animate/nuxt',
    '@vueuse/motion/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon',
  ],
})
```

### `app.config.ts`

Конфігурація UI теми та компонентів.

```typescript
export default defineAppConfig({
  theme,
  ui: {
    strategy: 'override',
    primary: theme.primary,
    gray: theme.gray,
    // ...
  },
})
```

### `theme.ts`

Налаштування теми проекту.

```typescript
export const theme = {
  primary: 'violet',      // Основний колір
  gray: 'slate',          // Сірий колір
  borderRadius: 'lg',     // Радіус заокруглення
  googleFonts: {
    Inter: true,
    'Fira Code': true,
    Poppins: [400, 500, 600, 700, 800, 900],
  },
  fonts: {
    display: 'Poppins',
    sans: 'Inter',
    code: 'Fira Code',
  },
}
```

## Конфігурація Directus

### Модуль Directus

```typescript
// nuxt.config.ts
directus: {
  rest: {
    baseUrl: process.env.DIRECTUS_URL || 'http://localhost:8055',
    nuxtBaseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  auth: {
    enabled: true,
    enableGlobalAuthMiddleware: false,
    userFields: ['*', { contacts: ['*'] }],
    redirect: {
      login: '/auth/signin',
      logout: '/',
      home: '/portal',
      resetPassword: '/auth/reset-password',
      callback: '/auth/callback',
    },
  },
}
```

### Параметри

#### `rest.baseUrl`
URL вашого Directus інстансу.

#### `rest.nuxtBaseUrl`
Базовий URL Nuxt додатку (для генерації посилань).

#### `auth.enabled`
Увімкнути автентифікацію.

#### `auth.enableGlobalAuthMiddleware`
Застосовувати auth middleware на всіх сторінках.

#### `auth.userFields`
Поля користувача для завантаження.

#### `auth.redirect`
Маршрути для redirect після автентифікації.

## Змінні оточення

### `.env`

```txt
# Directus
DIRECTUS_URL="https://your-instance.directus.app"
DIRECTUS_SERVER_TOKEN="your_static_token"
SITE_URL="http://localhost:3000"

# Stripe (опціонально)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_xxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxx
```

### Runtime Config

```typescript
// nuxt.config.ts
runtimeConfig: {
  public: {
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  // Приватні змінні (тільки на server)
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
}
```

## Конфігурація модулів

### Nuxt Image

```typescript
image: {
  provider: 'directus',
  directus: {
    baseURL: `${process.env.DIRECTUS_URL}/assets/`,
  },
}
```

### Google Fonts

```typescript
googleFonts: {
  families: theme.googleFonts,
  display: 'swap',
  download: true,
}
```

### SEO

```typescript
// Автоматично налаштовується через @nuxtjs/seo
ogImage: {
  defaults: {
    component: 'OgImageTemplate',
    width: 1200,
    height: 630,
  },
}

sitemap: {
  sources: ['/api/_sitemap-urls'],
}
```

## Конфігурація Layers

### Portal Layer

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

### Proposals Layer

```typescript
// layers/proposals/nuxt.config.ts
export default defineNuxtConfig({
  components: [{ path: './components/', prefix: 'Proposals' }],
  routeRules: {
    '/proposals/**': { ssr: true },
  },
})
```

## Кастомізація теми

### Зміна кольорів

```typescript
// theme.ts
export const theme = {
  primary: 'blue',  // Змінити на blue, green, red, тощо
  gray: 'zinc',     // Змінити на zinc, gray, neutral, тощо
}
```

### Зміна шрифтів

```typescript
// theme.ts
googleFonts: {
  'Roboto': true,
  'Open Sans': [400, 600, 700],
}

fonts: {
  display: 'Roboto',
  sans: 'Open Sans',
}
```

### Зміна border radius

```typescript
// theme.ts
borderRadius: 'xl',  // none, sm, base, md, lg, xl, full
```

## Route Rules

Налаштування правил для маршрутів.

```typescript
// nuxt.config.ts
routeRules: {
  '/portal/**': { ssr: false },      // SPA режим
  '/proposals/**': { ssr: true },     // SSR режим
  '/**': { prerender: true },        // Static generation
}
```

## Налаштування Tailwind

```typescript
// tailwind.config.ts
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      // Кастомні налаштування
    },
  },
}
```

## Наступні кроки

- [Архітектура](/architecture/) — розуміння структури
- [Модулі](/modules/) — робота з модулями
- [Розгортання](/deployment/) — деплой проекту
