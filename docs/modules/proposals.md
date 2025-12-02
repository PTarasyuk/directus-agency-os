# Proposals Layer

Proposals Layer (`layers/proposals/`) надає систему створення та управління пропозиціями для клієнтів.

## Огляд

Proposals Layer включає:
- Builder пропозицій
- Компоненти пропозицій
- Сторінки перегляду пропозицій
- Прийняття/відхилення пропозицій

## Структура

```
layers/proposals/
├── components/
│   ├── blocks/
│   │   ├── Acceptance.vue
│   │   ├── Hero.vue
│   │   └── Pricing.vue
│   └── Header.vue
├── composables/
│   └── useProposals.ts
└── pages/
    └── proposals/
        └── [id].vue
```

## Сторінки

### Перегляд пропозиції

**Маршрут:** `/proposals/[id]`

**Файл:** `layers/proposals/pages/proposals/[id].vue`

**Функціональність:**
- Перегляд деталей пропозиції
- Блоки пропозиції (Hero, Pricing, Acceptance)
- Прийняття/відхилення пропозиції

## Компоненти

### Acceptance

Компонент для прийняття/відхилення пропозиції:

```vue
<template>
  <BlocksAcceptance :proposal="proposal" />
</template>
```

**Props:**
- `proposal` — об'єкт пропозиції

**Функціональність:**
- Кнопки "Прийняти" / "Відхилити"
- Підтвердження дії
- Оновлення статусу пропозиції

### Hero

Hero секція пропозиції:

```vue
<template>
  <BlocksHero :data="proposal.hero" />
</template>
```

**Props:**
- `data` — дані hero блоку

### Pricing

Секція з цінами:

```vue
<template>
  <BlocksPricing :data="proposal.pricing" />
</template>
```

**Props:**
- `data` — дані pricing блоку

### Header

Заголовок пропозиції:

```vue
<template>
  <ProposalHeader :proposal="proposal" />
</template>
```

## Композабли

### useProposals

Робота з пропозиціями:

```typescript
const { 
  getProposal,
  approveProposal,
  rejectProposal 
} = useProposals()

// Отримати пропозицію
const proposal = await getProposal(proposalId)

// Прийняти пропозицію
await approveProposal(proposalId)

// Відхилити пропозицію
await rejectProposal(proposalId, { reason: '...' })
```

## Структура пропозиції

Пропозиція складається з блоків:

```typescript
interface OsProposal {
  id: string
  title: string
  status: 'draft' | 'sent' | 'accepted' | 'rejected'
  blocks: OsProposalBlock[]
  contacts: OsProposalContact[]
  // ...
}
```

### Блоки пропозиції

- **Hero** — заголовок та опис
- **Pricing** — ціни та пакети
- **Acceptance** — прийняття/відхилення

## Layout

Пропозиції використовують окремий layout:

```vue
<!-- layouts/proposal.vue -->
<template>
  <div class="proposal-layout">
    <slot />
  </div>
</template>
```

**Використання:**

```vue
<script setup>
definePageMeta({
  layout: 'proposal'
})
</script>
```

## Налаштування

### Nuxt Config

```typescript
// layers/proposals/nuxt.config.ts
export default defineNuxtConfig({
  // Конфігурація для proposals layer
})
```

## Наступні кроки

- [Компоненти](/components/) — опис компонентів
- [API](/api/) — робота з API

