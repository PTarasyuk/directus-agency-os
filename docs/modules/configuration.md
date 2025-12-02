# Конфігурація модуля Directus

Детальний опис всіх параметрів конфігурації модуля.

## Базова конфігурація

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  directus: {
    rest: {
      baseUrl: string,
      nuxtBaseUrl: string,
    },
    auth: {
      enabled: boolean,
      enableGlobalAuthMiddleware: boolean,
      userFields: string[] | object[],
      redirect: {
        login: string,
        logout: string,
        home: string,
        resetPassword: string,
        callback: string,
      },
    },
  },
})
```

## Параметри REST

### `rest.baseUrl`

**Тип:** `string`
**Обов'язковий:** Так
**За замовчуванням:** `'http://localhost:8055'`

URL вашого Directus інстансу.

```typescript
rest: {
  baseUrl: process.env.DIRECTUS_URL || 'http://localhost:8055',
}
```

### `rest.nuxtBaseUrl`

**Тип:** `string`
**Обов'язковий:** Ні
**За замовчуванням:** `'http://localhost:3000'`

Базовий URL Nuxt додатку. Використовується для генерації посилань.

```typescript
rest: {
  nuxtBaseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
}
```

## Параметри Auth

### `auth.enabled`

**Тип:** `boolean`
**Обов'язковий:** Ні
**За замовчуванням:** `true`

Увімкнути автентифікацію.

```typescript
auth: {
  enabled: true,
}
```

### `auth.enableGlobalAuthMiddleware`

**Тип:** `boolean`
**Обов'язковий:** Ні
**За замовчуванням:** `false`

Застосовувати auth middleware на всіх сторінках.

```typescript
auth: {
  enableGlobalAuthMiddleware: false,  // Тільки на сторінках з middleware: 'auth'
  // або
  enableGlobalAuthMiddleware: true,   // На всіх сторінках
}
```

### `auth.userFields`

**Тип:** `string[] | object[]`
**Обов'язковий:** Ні
**За замовчуванням:** `['*']`

Поля користувача для завантаження.

```typescript
auth: {
  userFields: ['*'],  // Всі поля
  // або
  userFields: ['id', 'email', 'first_name', 'last_name'],
  // або з зв'язками
  userFields: ['*', { contacts: ['*'] }],
}
```

### `auth.redirect`

**Тип:** `object`
**Обов'язковий:** Ні

Маршрути для redirect після автентифікації.

#### `redirect.login`

**Тип:** `string`
**За замовчуванням:** `'/auth/signin'`

Маршрут для redirect коли потрібна автентифікація.

#### `redirect.logout`

**Тип:** `string`
**За замовчуванням:** `'/'`

Маршрут для redirect після logout.

#### `redirect.home`

**Тип:** `string`
**За замовчуванням:** `'/portal'`

Маршрут для redirect після успішного логіну.

#### `redirect.resetPassword`

**Тип:** `string`
**За замовчуванням:** `'/auth/reset-password'`

Маршрут для reset password.

#### `redirect.callback`

**Тип:** `string`
**За замовчуванням:** `'/auth/callback'`

Маршрут для callback після OAuth логіну.

### Повний приклад

```typescript
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

## Змінні оточення

### `.env`

```txt
# Directus
DIRECTUS_URL="https://your-instance.directus.app"
DIRECTUS_SERVER_TOKEN="your_static_token"
NUXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### Runtime Config

Модуль автоматично додає конфігурацію в runtime config:

```typescript
// Доступно в компонентах
const config = useRuntimeConfig()
const directusUrl = config.public.directus.rest.baseUrl
```

## Налаштування для різних середовищ

### Development

```typescript
directus: {
  rest: {
    baseUrl: 'http://localhost:8055',
    nuxtBaseUrl: 'http://localhost:3000',
  },
}
```

### Production

```typescript
directus: {
  rest: {
    baseUrl: process.env.DIRECTUS_URL,
    nuxtBaseUrl: process.env.NUXT_PUBLIC_SITE_URL,
  },
}
```

## Наступні розділи

- [Композабли](/modules/composables) — використання композаблів
- [Плагіни](/modules/plugins) — як працюють плагіни
- [Middleware](/modules/middleware) — автентифікація та захист маршрутів

