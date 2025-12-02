# Nuxt Layers

AgencyOS використовує **Nuxt Layers** для модульності та розділення функціоналу.

## Що таке Nuxt Layers?

Nuxt Layers дозволяють розширювати Nuxt конфігурацію, компоненти, сторінки та інші частини з інших директорій або репозиторіїв.

## Структура Layers в AgencyOS

```
directus-agency-os/
├── nuxt.config.ts          # Base layer
├── layers/
│   ├── portal/            # Portal layer
│   └── proposals/         # Proposals layer
```

## Base Layer

Основний layer проекту. Містить:
- Базову конфігурацію Nuxt
- Загальні компоненти
- Утиліти
- Типи

### Реєстрація Layers

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    './layers/proposals',
    './layers/portal',
  ],
})
```

## Portal Layer

**Призначення:** Клієнтський портал для клієнтів агентства.

**Розташування:** `layers/portal/`

### Структура

```
layers/portal/
├── components/          # Компоненти порталу
│   ├── FileCard.vue
│   ├── InvoiceWidget.vue
│   ├── TaskList.vue
│   └── ...
├── composables/         # Композабли порталу
│   └── useStripe.ts
├── pages/               # Сторінки порталу
│   ├── portal/
│   │   ├── index.vue
│   │   ├── projects/
│   │   ├── billing/
│   │   └── ...
│   └── auth.vue
├── server/              # Server API
│   └── api/
│       ├── portal/
│       └── stripe/
└── nuxt.config.ts       # Конфігурація layer
```

### Конфігурація

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
  },
})
```

### Особливості

1. **SPA режим** для `/portal/**` маршрутів
2. **Префікс компонентів** `Portal` для уникнення конфліктів
3. **Stripe інтеграція** для білінгу
4. **Автентифікація** через Directus

### Сторінки

- `/portal` — головна панель
- `/portal/projects` — список проектів
- `/portal/projects/[id]` — деталі проекту
- `/portal/billing` — білінг
- `/portal/files` — файли
- `/portal/account` — налаштування акаунту

## Proposals Layer

**Призначення:** Система створення та управління пропозиціями.

**Розташування:** `layers/proposals/`

### Структура

```
layers/proposals/
├── components/          # Компоненти пропозицій
│   ├── blocks/
│   │   ├── Hero.vue
│   │   ├── Pricing.vue
│   │   └── Acceptance.vue
│   └── Header.vue
├── composables/         # Композабли пропозицій
│   └── useProposals.ts
├── pages/               # Сторінки пропозицій
│   └── proposals/
│       └── [id].vue
└── nuxt.config.ts       # Конфігурація layer
```

### Конфігурація

```typescript
// layers/proposals/nuxt.config.ts
export default defineNuxtConfig({
  components: [{ path: './components/', prefix: 'Proposals' }],
  routeRules: {
    '/proposals/**': { ssr: true },
  },
})
```

### Особливості

1. **SSR режим** для SEO оптимізації
2. **Префікс компонентів** `Proposals`
3. **Динамічний builder** пропозицій
4. **Підписання** через v-perfect-signature

## Як працюють Layers

### 1. Об'єднання конфігурацій

Nuxt об'єднує конфігурації з усіх layers:

```typescript
// Base: nuxt.config.ts
modules: ['@nuxt/ui']

// Portal: layers/portal/nuxt.config.ts
components: [{ path: './components/', prefix: 'Portal' }]

// Результат: об'єднана конфігурація
```

### 2. Компоненти

Компоненти з layers автоматично імпортуються:

```vue
<!-- Використання компонента з Portal layer -->
<PortalFileCard :file="file" />

<!-- Використання компонента з Proposals layer -->
<ProposalsHeader :proposal="proposal" />
```

### 3. Сторінки

Сторінки з layers додаються до роутингу:

```
Base: pages/index.vue → /
Portal: layers/portal/pages/portal/index.vue → /portal
Proposals: layers/proposals/pages/proposals/[id].vue → /proposals/:id
```

### 4. Композабли

Композабли з layers доступні глобально:

```typescript
// layers/portal/composables/useStripe.ts
export default function useStripe() {
  // ...
}

// Використання в будь-якому компоненті
const { createCheckout } = useStripe()
```

## Переваги Layers

1. **Модульність** — кожен layer незалежний
2. **Повторне використання** — layers можна використовувати в інших проектах
3. **Організація** — чітке розділення функціоналу
4. **Тестування** — легше тестувати окремі layers

## Додавання нового Layer

1. Створіть директорію `layers/my-layer/`
2. Створіть `nuxt.config.ts`:

```typescript
// layers/my-layer/nuxt.config.ts
export default defineNuxtConfig({
  components: [{ path: './components/', prefix: 'MyLayer' }],
})
```

3. Додайте в `nuxt.config.ts`:

```typescript
extends: [
  './layers/proposals',
  './layers/portal',
  './layers/my-layer',  // Новий layer
],
```

## Наступні розділи

- [File-based Routing](/architecture/routing) — маршрутизація
- [Auto-imports](/architecture/auto-imports) — автоматичний імпорт
- [Рендеринг](/architecture/rendering) — стратегії рендерингу
