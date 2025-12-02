# Блоки Page Builder

Блоки для динамічного Page Builder в `components/blocks/`.

## Доступні блоки

### Hero

Hero секція з заголовком, описом та зображенням.

**Компонент:** `BlocksHero`

**Поля:**
- `title` — заголовок
- `headline` — підзаголовок
- `content` — контент
- `image` — зображення
- `image_position` — позиція (left/right)
- `button_group` — група кнопок

### RichText

Багатий текст з форматуванням.

**Компонент:** `BlocksRichText`

**Поля:**
- `title` — заголовок
- `headline` — підзаголовок
- `content` — контент (Markdown)
- `alignment` — вирівнювання (left/center)

### CTA

Call-to-action секція.

**Компонент:** `BlocksCta`

**Поля:**
- `title` — заголовок
- `headline` — підзаголовок
- `content` — контент
- `button_group` — група кнопок

### Form

Динамічна форма з Directus.

**Компонент:** `BlocksForm`

**Поля:**
- `title` — заголовок
- `headline` — підзаголовок
- `form` — форма з Directus

### Gallery

Галерея зображень.

**Компонент:** `BlocksGallery`

**Поля:**
- `title` — заголовок
- `headline` — підзаголовок
- `gallery_items` — масив зображень

### FAQs

Секція з питаннями та відповідями.

**Компонент:** `BlocksFaqs`

**Поля:**
- `title` — заголовок
- `headline` — підзаголовок
- `faqs` — масив FAQ

### Testimonials

Відгуки клієнтів.

**Компонент:** `BlocksTestimonials`

**Поля:**
- `title` — заголовок
- `headline` — підзаголовок
- `testimonials` — масив відгуків

### Team

Команда.

**Компонент:** `BlocksTeam`

**Поля:**
- `title` — заголовок
- `team` — масив членів команди

### Steps

Кроки/етапи.

**Компонент:** `BlocksSteps`

**Поля:**
- `title` — заголовок
- `headline` — підзаголовок
- `steps` — масив кроків
- `show_step_numbers` — показувати номери
- `alternate_image_position` — чергування позиції

### Columns

Колонки контенту.

**Компонент:** `BlocksColumns`

**Поля:**
- `title` — заголовок
- `headline` — підзаголовок
- `rows` — масив рядків (колонок)

### Video

Відео.

**Компонент:** `BlocksVideo`

**Поля:**
- `title` — заголовок
- `video_url` — URL відео
- `autoplay` — автопрогравання

### Quote

Цитата.

**Компонент:** `BlocksQuote`

**Поля:**
- `title` — заголовок
- `subtitle` — підзаголовок
- `content` — контент

### LogoCloud

Хмара логотипів.

**Компонент:** `BlocksLogoCloud`

**Поля:**
- `title` — заголовок
- `headline` — підзаголовок
- `logos` — масив логотипів

### Divider

Розділювач.

**Компонент:** `BlocksDivider`

**Поля:**
- `title` — заголовок (опціонально)

### RawHtml

Сирий HTML.

**Компонент:** `BlocksRawHtml`

**Поля:**
- `html` — HTML контент

## Структура блоку

Кожен блок має стандартну структуру:

```vue
<script setup lang="ts">
import type { BlockHero } from '~/types'

defineProps<{
  data: BlockHero
}>()
</script>

<template>
  <BlockContainer>
    <!-- Контент блоку -->
  </BlockContainer>
</template>
```

**Важливо:**
- Використовуйте `BlockContainer` для обгортки
- Типізуйте props через TypeScript
- Назва компонента повинна відповідати `Blocks{Name}`

## Приклад: Hero блок

```vue
<script setup lang="ts">
import type { BlockHero, BlockButtonGroup } from '~/types'

defineProps<{
  data: BlockHero
}>()
</script>

<template>
  <BlockContainer class="relative grid gap-12 md:grid-cols-3">
    <!-- Content -->
    <div class="md:pt-12 md:col-span-2">
      <TypographyTitle v-if="data.title">
        {{ data.title }}
      </TypographyTitle>
      <TypographyHeadline 
        v-if="data.headline" 
        :content="data.headline" 
        size="title" 
        as="h1" 
      />
      <TypographyProse 
        v-if="data.content" 
        :content="data.content" 
        size="lg" 
        class="py-6 font-display" 
      />
      <BlocksButtonGroup 
        v-if="data.button_group" 
        :data="data.button_group as BlockButtonGroup" 
      />
    </div>
    
    <!-- Image -->
    <div
      v-if="data.image"
      class="overflow-hidden border rounded-card"
      :class="data.image_position === 'left' ? 'order-first' : ''"
    >
      <NuxtImg
        :src="data.image as string"
        alt=""
        class="w-full h-full object-cover rounded-card"
      />
    </div>
  </BlockContainer>
</template>
```

## Реєстрація блоку

Блок автоматично реєструється в `PageBuilder.vue`:

```typescript
// components/PageBuilder.vue
const componentMap: Record<BlockType, any> = {
  block_hero: resolveComponent('BlocksHero'),
  block_richtext: resolveComponent('BlocksRichText'),
  // ... інші блоки
}
```

**Щоб додати новий блок:**

1. Створіть компонент в `components/blocks/YourBlock.vue`
2. Додайте тип в `types/blocks/block-your-block.ts`
3. Зареєструйте в `PageBuilder.vue`:
   ```typescript
   block_your_block: resolveComponent('BlocksYourBlock'),
   ```
4. Додайте в схему запиту в `pages/[...permalink].vue`:
   ```typescript
   block_your_block: ['id', 'title', 'headline', /* інші поля */],
   ```

## Типи блоків

Всі блоки типізовані в `types/blocks/`:

```typescript
// types/blocks/block-hero.ts
export interface BlockHero {
  id: string
  title?: string
  headline?: string
  content?: string
  image?: string | File
  image_position?: 'left' | 'right'
  button_group?: BlockButtonGroup
}
```

## Завантаження даних блоку

Дані блоку завантажуються разом зі сторінкою:

```typescript
// pages/[...permalink].vue
const { data: page } = await useDirectus(
  readItems('pages', {
    fields: [
      '*',
      {
        blocks: [
          'id',
          'collection',
          {
            item: {
              block_hero: ['*'], // Всі поля Hero блоку
              block_richtext: ['*'],
              // ...
            }
          }
        ]
      }
    ]
  })
)
```

## Приховати блок

Блоки можна приховати через поле `hide_block`:

```typescript
// В Directus встановіть hide_block = true
// Блок не буде відображений на сторінці
```

## Наступні кроки

- [Page Builder](/components/page-builder) — як працює Page Builder
- [Базові компоненти](/components/base) — базові UI компоненти
- [Типи даних](/architecture/data-schema) — структура даних

