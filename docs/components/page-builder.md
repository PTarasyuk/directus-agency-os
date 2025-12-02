# Page Builder

Page Builder дозволяє динамічно будувати сторінки з блоків.

## Огляд

Page Builder — це система, яка дозволяє створювати сторінки з готових блоків без написання коду.

## Як працює

### 1. Структура даних

Сторінка містить масив блоків:

```typescript
interface Page {
  id: string
  title: string
  blocks: PageBlock[]
}

interface PageBlock {
  id: string
  collection: BlockType  // 'block_hero', 'block_richtext', тощо
  item: BlockData       // Дані блоку
  hide_block?: boolean  // Приховати блок
}
```

### 2. Компонент PageBuilder

```vue
<!-- components/PageBuilder.vue -->
<script setup lang="ts">
import type { Page, PageBlock, BlockType } from '~/types'

// Мапа компонентів
const componentMap: Record<BlockType, any> = {
  block_hero: resolveComponent('BlocksHero'),
  block_richtext: resolveComponent('BlocksRichText'),
  block_cta: resolveComponent('BlocksCta'),
  // ...
}

const props = defineProps<{
  page: Page
}>()

// Фільтрація прихованих блоків
const blocks = computed(() => {
  return props.page?.blocks?.filter((block) => {
    return block.hide_block !== true
  })
})
</script>

<template>
  <div id="content" class="mx-auto">
    <template v-for="block in blocks" :key="block.id">
      <component 
        :is="componentMap[block.collection]" 
        v-if="block && block.collection" 
        :data="block.item" 
      />
    </template>
  </div>
</template>
```

### 3. Використання

```vue
<!-- pages/[...permalink].vue -->
<script setup>
const route = useRoute()

// Завантаження сторінки
const page = await useDirectus(readItem('pages', route.params.permalink, {
  fields: ['*', { 
    blocks: ['*', {
      item: ['*']
    }]
  }]
}))
</script>

<template>
  <PageContainer>
    <PageBuilder :page="page" />
  </PageContainer>
</template>
```

## Створення нового блоку

### 1. Створіть компонент

```vue
<!-- components/blocks/MyBlock.vue -->
<script setup>
const props = defineProps<{
  data: {
    title: string
    content: string
  }
}>()
</script>

<template>
  <section class="my-block">
    <h2>{{ data.title }}</h2>
    <div v-html="data.content" />
  </section>
</template>
```

### 2. Додайте в мапу

```typescript
// components/PageBuilder.vue
const componentMap: Record<BlockType, any> = {
  // ...
  block_myblock: resolveComponent('BlocksMyBlock'),
}
```

### 3. Створіть тип

```typescript
// types/blocks/block-myblock.ts
export interface BlockMyBlock {
  title: string
  content: string
}
```

### 4. Додайте в схему

```typescript
// types/schema.ts
export interface Schema {
  // ...
  block_myblock: BlockMyBlock[]
}
```

## Доступні блоки

### Hero

```vue
<BlocksHero :data="{
  title: 'Заголовок',
  subtitle: 'Підзаголовок',
  image: 'file-id',
  cta: { text: 'Кнопка', link: '/page' }
}" />
```

### Rich Text

```vue
<BlocksRichText :data="{
  content: '<p>HTML контент</p>'
}" />
```

### Columns

```vue
<BlocksColumns :data="{
  columns: [
    { content: 'Колонка 1' },
    { content: 'Колонка 2' },
    { content: 'Колонка 3' }
  ]
}" />
```

### CTA

```vue
<BlocksCta :data="{
  title: 'Заголовок',
  text: 'Текст',
  button: { text: 'Кнопка', link: '/page' }
}" />
```

### Form

```vue
<BlocksForm :data="{
  form_id: 'form-id'
}" />
```

### Gallery

```vue
<BlocksGallery :data="{
  images: ['file-id-1', 'file-id-2']
}" />
```

### FAQs

```vue
<BlocksFaqs :data="{
  faqs: [
    { question: 'Питання?', answer: 'Відповідь' }
  ]
}" />
```

### Testimonials

```vue
<BlocksTestimonials :data="{
  testimonials: [
    { name: 'Ім\'я', text: 'Відгук', avatar: 'file-id' }
  ]
}" />
```

### Team

```vue
<BlocksTeam :data="{
  members: [
    { name: 'Ім\'я', role: 'Роль', avatar: 'file-id' }
  ]
}" />
```

### Video

```vue
<BlocksVideo :data="{
  video_url: 'https://youtube.com/watch?v=...',
  thumbnail: 'file-id'
}" />
```

### Steps

```vue
<BlocksSteps :data="{
  steps: [
    { title: 'Крок 1', description: 'Опис' }
  ]
}" />
```

### Quote

```vue
<BlocksQuote :data="{
  quote: 'Цитата',
  author: 'Автор'
}" />
```

### Logo Cloud

```vue
<BlocksLogoCloud :data="{
  logos: ['file-id-1', 'file-id-2']
}" />
```

### Divider

```vue
<BlocksDivider :data="{
  style: 'solid' | 'dashed' | 'dotted'
}" />
```

### Raw HTML

```vue
<BlocksRawHtml :data="{
  html: '<div>HTML код</div>'
}" />
```

## Приховання блоків

Блоки можна приховати через поле `hide_block`:

```typescript
{
  id: 'block-id',
  collection: 'block_hero',
  item: { ... },
  hide_block: true  // Блок не відобразиться
}
```

## Наступні розділи

- [Базові компоненти](/components/base) — базові UI компоненти
- [Блоки Page Builder](/components/blocks) — детальний опис блоків
- [Навігація](/components/navigation) — компоненти навігації
- [Marketing Site](/architecture/marketing-site) — як Page Builder використовується на публічному сайті
- [Proposals](/architecture/proposals) — використання Page Builder в пропозиціях
