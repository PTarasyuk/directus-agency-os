# Компоненти навігації

Компоненти навігації забезпечують структуру та переміщення по сайту.

## TheHeader.vue

**Шлях:** `components/navigation/TheHeader.vue`

**Призначення:** Головне меню сайту

**Функціональність:**
- Відображення навігаційних пунктів з Directus
- Мобільне меню
- Пошук
- Перемикач теми (світла/темна)
- Автентифікація користувача

**Структура:**

```vue
<template>
  <header>
    <!-- Logo -->
    <Logo />
    
    <!-- Desktop Navigation -->
    <nav>
      <MenuItem 
        v-for="item in navigation" 
        :key="item.id"
        :item="item"
      />
    </nav>
    
    <!-- Actions -->
    <div>
      <GlobalSearch />
      <DarkModeToggle />
      <UserBadge v-if="user" />
    </div>
  </header>
</template>

<script setup>
const { data: navigation } = await useDirectus(
  readItems('navigation', {
    filter: { status: { _eq: 'published' } },
    sort: ['sort'],
  })
)
</script>
```

**Особливості:**
- Завантажує навігацію з Directus
- Підтримує різні типи пунктів (page, url)
- Адаптивний дизайн

## TheFooter.vue

**Шлях:** `components/navigation/TheFooter.vue`

**Призначення:** Футер сайту

**Містить:**
- Навігаційні посилання
- Соціальні мережі
- Копірайт
- Додаткову інформацію

## MobileMenu.vue

**Шлях:** `components/navigation/MobileMenu.vue`

**Призначення:** Мобільне меню

**Функціональність:**
- Гамбургер меню
- Випадаюче меню на мобільних пристроях
- Закриття при кліку поза меню

**Використання:**

```vue
<template>
  <MobileMenu :items="navigation" />
</template>
```

## MenuItem.vue

**Шлях:** `components/navigation/MenuItem.vue`

**Призначення:** Окремий пункт меню

**Підтримує:**
- Вкладені меню (dropdown)
- Різні типи посилань (page, url)
- Активний стан
- Іконки

**Структура NavigationItem:**

```typescript
interface NavigationItem {
  id: string
  title: string
  type: 'page' | 'url'
  page?: Page
  url?: string
  children?: NavigationItem[]
  icon?: string
}
```

## Використання навігації

### Отримання навігації

```vue
<script setup>
const { data: navigation } = await useDirectus(
  readItems('navigation', {
    filter: { 
      status: { _eq: 'published' },
      parent: { _null: true } // Тільки кореневі елементи
    },
    sort: ['sort'],
    fields: [
      '*',
      { page: ['permalink', 'title'] },
      { children: ['*', { page: ['permalink'] }] }
    ]
  })
)
</script>
```

### Генерація URL

```typescript
import { getNavItemUrl } from '~/utils/navigation'

const url = getNavItemUrl(navItem)
// Повертає permalink або url
```

### Активний пункт меню

```vue
<script setup>
const route = useRoute()

const isActive = (item: NavigationItem) => {
  const url = getNavItemUrl(item)
  return route.path === url
}
</script>

<template>
  <a 
    :href="getNavItemUrl(item)"
    :class="{ 'active': isActive(item) }"
  >
    {{ item.title }}
  </a>
</template>
```

## Кастомізація

### Додавання нового типу пункту меню

1. Оновіть тип `NavigationItem` в `types/meta/navigation.ts`
2. Додайте обробку в `getNavItemUrl()`
3. Оновіть компонент `MenuItem.vue`

### Стилізація

Навігація використовує Tailwind CSS. Кастомізуйте через:

```vue
<style scoped>
.nav-item {
  @apply px-4 py-2 hover:bg-gray-100;
}
</style>
```

## Наступні кроки

- [Базові компоненти](/components/base) - інші UI компоненти
- [Page Builder](/components/page-builder) - динамічні сторінки

