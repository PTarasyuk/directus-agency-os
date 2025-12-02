# Nuxt Layers

Огляд Layers в AgencyOS.

## Що таке Layers?

Nuxt Layers дозволяють розширювати Nuxt конфігурацію з інших директорій або репозиторіїв.

## Layers в AgencyOS

### Base Layer

Основний layer проекту.

**Розташування:** `/`

Містить:
- Базову конфігурацію Nuxt
- Загальні компоненти
- Утиліти
- Типи

### Portal Layer

Клієнтський портал для клієнтів агентства.

**Розташування:** `layers/portal/`

Детальніше: [Portal Layer](/layers/portal)

### Proposals Layer

Система створення та управління пропозиціями.

**Розташування:** `layers/proposals/`

Детальніше: [Proposals Layer](/layers/proposals)

## Реєстрація Layers

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    './layers/proposals',
    './layers/portal',
  ],
})
```

## Наступні розділи

- [Portal Layer](/layers/portal) — детальний опис Portal layer
- [Proposals Layer](/layers/proposals) — детальний опис Proposals layer

