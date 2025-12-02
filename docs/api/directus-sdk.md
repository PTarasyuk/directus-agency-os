# Directus SDK

Робота з Directus SDK в AgencyOS.

## Огляд

Directus SDK автоматично імпортується модулем Directus, надаючи доступ до всіх команд для роботи з даними.

## Автоматичний імпорт

Всі команди SDK автоматично доступні:

```typescript
// Не потрібно імпортувати
import { readItems, createItem, updateItem } from '@directus/sdk'
```

## Основні команди

### Items

#### readItems

Читання елементів:

```typescript
const pages = await useDirectus(
  readItems('pages', {
    fields: ['*'],
    filter: { status: { _eq: 'published' } },
    limit: 10,
    sort: ['-date_created'],
  })
)
```

#### createItem

Створення елемента:

```typescript
const newPage = await useDirectus(
  createItem('pages', {
    title: 'New Page',
    permalink: '/new-page',
    status: 'published',
  })
)
```

#### updateItem

Оновлення елемента:

```typescript
await useDirectus(
  updateItem('pages', pageId, {
    title: 'Updated Title',
  })
)
```

#### deleteItem

Видалення елемента:

```typescript
await useDirectus(deleteItem('pages', pageId))
```

### Singletons

#### readSingleton

Читання singleton:

```typescript
const globals = await useDirectus(
  readSingleton('globals', {
    fields: ['*'],
  })
)
```

#### updateSingleton

Оновлення singleton:

```typescript
await useDirectus(
  updateSingleton('globals', {
    title: 'New Title',
  })
)
```

### Files

#### readFiles

Читання файлів:

```typescript
const files = await useDirectus(
  readFiles({
    filter: { folder: { _eq: 'folder-id' } },
  })
)
```

#### uploadFiles

Завантаження файлів:

```typescript
const file = await useDirectus(
  uploadFiles({
    file: fileObject,
    folder: 'folder-id',
  })
)
```

### Users

#### readUsers

Читання користувачів:

```typescript
const users = await useDirectus(
  readUsers({
    fields: ['*'],
  })
)
```

#### readMe

Читання поточного користувача:

```typescript
const me = await useDirectus(
  readMe({
    fields: ['*', { contacts: ['*'] }],
  })
)
```

## Фільтрація

### Прості фільтри

```typescript
filter: {
  status: { _eq: 'published' }
}
```

### Складні фільтри

```typescript
filter: {
  _and: [
    { status: { _eq: 'published' } },
    { date_created: { _gte: '2024-01-01' } }
  ]
}
```

### Оператори

- `_eq` — дорівнює
- `_neq` — не дорівнює
- `_gt` — більше
- `_gte` — більше або дорівнює
- `_lt` — менше
- `_lte` — менше або дорівнює
- `_in` — в масиві
- `_nin` — не в масиві
- `_contains` — містить
- `_ncontains` — не містить

## Fields

### Всі поля

```typescript
fields: ['*']
```

### Конкретні поля

```typescript
fields: ['id', 'title', 'permalink']
```

### Relationships

```typescript
fields: [
  '*',
  {
    blocks: ['*', { item: ['*'] }]
  }
]
```

## Сортування

```typescript
sort: ['-date_created']  // За спаданням
sort: ['date_created']    // За зростанням
sort: ['title', '-date_created']  // Кілька полів
```

## Пагінація

```typescript
limit: 10,      // Кількість елементів
offset: 20,     // Зміщення
page: 2,        // Сторінка
```

## Агрегація

```typescript
const result = await useDirectus(
  aggregate('pages', {
    query: {
      aggregate: { count: '*' },
      groupBy: ['status'],
    },
  })
)
```

## Обробка помилок

```typescript
try {
  const pages = await useDirectus(readItems('pages'))
} catch (error) {
  console.error('Error:', error)
  // Обробка помилки
}
```

## Best Practices

### 1. Використовуйте fields

```typescript
// ✅ Добре
fields: ['id', 'title', 'permalink']

// ❌ Погано
fields: ['*']  // Завантажує всі поля
```

### 2. Використовуйте фільтри

```typescript
// ✅ Добре
filter: { status: { _eq: 'published' } }

// ❌ Погано
// Завантажує всі елементи, потім фільтрує на клієнті
```

### 3. Обмежуйте кількість

```typescript
// ✅ Добре
limit: 10

// ❌ Погано
// Завантажує всі елементи
```

## Наступні кроки

- [Server API](/api/server-api) — server-side endpoints
- [Composables](/api/composables) — композабли

