# Auto-imports

Nuxt автоматично імпортує компоненти, композабли, утиліти та команди.

## Компоненти

Всі компоненти з `components/` автоматично імпортуються.

```vue
<!-- Не потрібно імпортувати -->
<template>
  <VAlert type="success" />
  <BlocksHero :data="heroData" />
  <PortalFileCard :file="file" />
</template>
```

### Префікси

- Компоненти з `components/base/` — без префіксу
- Компоненти з `components/blocks/` — префікс `Blocks`
- Компоненти з `layers/portal/components/` — префікс `Portal`
- Компоненти з `layers/proposals/components/` — префікс `Proposals`

## Композабли

Всі композабли з `composables/` автоматично імпортуються.

```vue
<script setup>
// Не потрібно імпортувати
const { user } = useDirectusAuth()
const { fileUrl } = useFiles()
const data = await useDirectus(readItems('pages'))
</script>
```

## Утиліти

Всі утиліти з `utils/` автоматично імпортуються.

```vue
<script setup>
// Не потрібно імпортувати
const formatted = formatCurrency(100, 'USD')
const color = hexToRgb('#ff0000')
</script>
```

## Directus SDK команди

Команди Directus SDK автоматично імпортуються модулем.

```vue
<script setup>
// Не потрібно імпортувати
const pages = await readItems('pages')
const page = await readItem('pages', 'id')
const user = await readMe()
</script>
```

### Доступні команди

- `readItems`, `readItem` — читання
- `createItem`, `createItems` — створення
- `updateItem`, `updateItems` — оновлення
- `deleteItem`, `deleteItems` — видалення
- `readSingleton`, `updateSingleton` — singleton
- `readMe`, `updateMe` — поточний користувач
- `readUser`, `readUsers` — користувачі
- `readFiles`, `readFile` — файли
- `uploadFiles` — завантаження файлів
- `aggregate` — агрегація
- І багато інших...

## TypeScript підтримка

TypeScript автоматично розпізнає auto-imports:

```typescript
// TypeScript знає типи
const pages = await readItems<Page[]>('pages')
const user = useDirectusAuth<User>()
```

## Відключення auto-import

Якщо потрібно відключити auto-import:

```typescript
// nuxt.config.ts
components: {
  global: false  // Відключити глобальний auto-import
}
```

## Наступні розділи

- [File-based Routing](/architecture/routing) — маршрутизація
- [Рендеринг](/architecture/rendering) — стратегії рендерингу

