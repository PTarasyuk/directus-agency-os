# Proposals Layer

Система створення та управління пропозиціями.

## Огляд

Proposals Layer надає систему для створення, перегляду та підписання пропозицій для клієнтів.

## Структура

```
layers/proposals/
├── components/          # Компоненти пропозицій
│   ├── blocks/
│   │   ├── Acceptance.vue
│   │   ├── Hero.vue
│   │   └── Pricing.vue
│   └── Header.vue
├── composables/         # Композабли
│   └── useProposals.ts
├── pages/               # Сторінки
│   └── proposals/
│       └── [id].vue
└── nuxt.config.ts       # Конфігурація
```

## Конфігурація

```typescript
// layers/proposals/nuxt.config.ts
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

## Особливості

### 1. SSR режим

Пропозиції рендеряться на сервері для SEO оптимізації.

### 2. Префікс компонентів

Компоненти мають префікс `Proposals`:

```vue
<ProposalsHeader :proposal="proposal" />
<ProposalsBlocksHero :data="heroData" />
```

### 3. Підписання

Підтримка підписання пропозицій через `v-perfect-signature`.

## Сторінки

### `/proposals/[id]`

Перегляд пропозиції з:
- Заголовком
- Блоками пропозиції
- Ціноутворенням
- Формою підписання

## Компоненти

### ProposalsHeader

Заголовок пропозиції.

```vue
<ProposalsHeader :proposal="proposal" />
```

### ProposalsBlocksHero

Hero блок пропозиції.

```vue
<ProposalsBlocksHero :data="heroData" />
```

### ProposalsBlocksPricing

Блок ціноутворення.

```vue
<ProposalsBlocksPricing :data="pricingData" />
```

### ProposalsBlocksAcceptance

Форма прийняття пропозиції з підписом.

```vue
<ProposalsBlocksAcceptance :proposal="proposal" />
```

## Композабли

### useProposals()

Робота з пропозиціями.

```typescript
const { proposal, acceptProposal } = useProposals(proposalId)

// Прийняття пропозиції
await acceptProposal({
  signature: signatureData,
  contact_id: 'contact-id'
})
```

## Структура пропозиції

```typescript
interface OsProposal {
  id: string
  title: string
  status: 'draft' | 'sent' | 'accepted' | 'rejected'
  blocks: ProposalBlock[]
  pricing: PricingData
  contacts: Contact[]
}
```

## Наступні розділи

- [Portal Layer](/layers/portal) — клієнтський портал
- [Proposals (архітектура)](/architecture/proposals) — детальна архітектура системи пропозицій

