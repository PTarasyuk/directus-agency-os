# Composables

Vue композабли для роботи з даними та функціональністю.

## useDirectus

Wrapper для Directus запитів.

**Файл:** `modules/directus/runtime/composables/useDirectus.ts`

**Використання:**

```typescript
const pages = await useDirectus(
  readItems('pages', {
    fields: ['*'],
  })
)
```

**Особливості:**
- Автоматична обробка помилок
- TypeScript підтримка
- SSR підтримка

## useDirectusAuth

Автентифікація користувачів.

**Файл:** `modules/directus/runtime/composables/useDirectusAuth.ts`

**API:**

```typescript
const {
  user,           // Ref<User | null>
  login,          // (email, password) => Promise
  logout,         // () => Promise
  fetchUser,      // () => Promise
  isAuthenticated // Computed<boolean>
} = useDirectusAuth()
```

**Приклади:**

```typescript
// Логін
await login('user@example.com', 'password')

// Логout
await logout()

// Перевірка
if (isAuthenticated.value) {
  console.log(user.value)
}
```

## useFiles

Робота з файлами.

**Файл:** `modules/directus/runtime/composables/useFiles.ts`

**API:**

```typescript
const { fileUrl } = useFiles()

// Отримати URL файлу
const url = fileUrl(fileId)
```

**Приклад:**

```vue
<template>
  <img :src="fileUrl(imageId)" alt="Image" />
</template>
```

## useStripe

Робота з Stripe (Portal Layer).

**Файл:** `layers/portal/composables/useStripe.ts`

**API:**

```typescript
const {
  createCheckoutSession,
  createPortalLink
} = useStripe()

// Створення сесії оплати
const session = await createCheckoutSession({
  invoiceId: 'invoice-id',
  returnUrl: '/portal/billing',
})
```

## useProposals

Робота з пропозиціями (Proposals Layer).

**Файл:** `layers/proposals/composables/useProposals.ts`

**API:**

```typescript
const {
  getProposal,
  approveProposal,
  rejectProposal
} = useProposals()
```

## useScroll

Робота зі скролом.

**Файл:** `composables/useScroll.ts`

**Використання:**

```typescript
const { scrollY, scrollTo } = useScroll()
```

## Кастомні композабли

Створення власного композаблу:

```typescript
// composables/useMyComposable.ts
export const useMyComposable = () => {
  const state = ref(null)
  
  const fetchData = async () => {
    // Логіка
  }
  
  return {
    state,
    fetchData,
  }
}
```

**Використання:**

```vue
<script setup>
const { state, fetchData } = useMyComposable()
</script>
```

## Best Practices

### 1. Використовуйте композабли для логіки

```typescript
// ✅ Добре
const { user } = useDirectusAuth()

// ❌ Погано
const user = useState('user')
```

### 2. Обробляйте помилки

```typescript
try {
  const data = await useDirectus(readItems('pages'))
} catch (error) {
  console.error(error)
}
```

### 3. Використовуйте computed для реактивності

```typescript
const isAuthenticated = computed(() => !!user.value)
```

## Наступні кроки

- [API](/api/) — огляд API
- [Автентифікація](/api/authentication) — детальний опис

