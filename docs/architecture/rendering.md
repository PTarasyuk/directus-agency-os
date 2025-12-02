# Рендеринг

AgencyOS підтримує різні стратегії рендерингу.

## SSR (Server-Side Rendering)

За замовчуванням всі сторінки рендеряться на сервері.

### Переваги

- SEO оптимізація
- Швидший перший рендер
- Доступ до server-side API

### Використання

```typescript
// nuxt.config.ts
routeRules: {
  '/**': { ssr: true }  // За замовчуванням
}
```

## SPA (Single Page Application)

Деякі маршрути використовують SPA режим.

### Переваги

- Швидша навігація
- Менше навантаження на сервер
- Краща UX для додатків

### Використання

```typescript
// nuxt.config.ts
routeRules: {
  '/portal/**': { ssr: false }  // SPA режим
}
```

### В AgencyOS

SPA режим використовується для:
- `/portal/**` — клієнтський портал
- `/auth/**` — автентифікація

## SSG (Static Site Generation)

Можливе для статичних сторінок.

### Переваги

- Найшвидше завантаження
- Можна хостити на CDN
- Немає навантаження на сервер

### Використання

```typescript
// nuxt.config.ts
routeRules: {
  '/**': { prerender: true }
}
```

### Генерація

```bash
pnpm generate
```

## Hybrid Rendering

Можна комбінувати різні стратегії:

```typescript
// nuxt.config.ts
routeRules: {
  '/': { prerender: true },           // Static
  '/posts/**': { ssr: true },         // SSR
  '/portal/**': { ssr: false },       // SPA
  '/api/**': { cors: true },          // API
}
```

## ISR (Incremental Static Regeneration)

Можливе з Nuxt 3:

```typescript
routeRules: {
  '/posts/**': { 
    isr: 3600  // Регенерація кожну годину
  }
}
```

## Вибір стратегії

### Публічні сторінки

Використовуйте SSR або SSG:
- Краще для SEO
- Швидше завантаження
- Доступ до server-side даних

### Додатки

Використовуйте SPA:
- Швидша навігація
- Краща UX
- Менше навантаження

### Статичний контент

Використовуйте SSG:
- Найшвидше завантаження
- Можна хостити на CDN

## Наступні розділи

- [File-based Routing](/architecture/routing) — маршрутизація
- [Auto-imports](/architecture/auto-imports) — автоматичний імпорт
