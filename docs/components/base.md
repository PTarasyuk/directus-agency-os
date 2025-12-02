# Базові компоненти

Базові UI компоненти в `components/base/` для побудови інтерфейсу.

## Доступні компоненти

### LoginForm

Форма автентифікації.

**Файл:** `components/base/LoginForm.vue`

**Використання:**

```vue
<template>
  <LoginForm />
</template>
```

**Особливості:**
- Автоматична валідація
- Обробка помилок
- Loading стан

### VAlert

Алерти для відображення повідомлень.

**Файл:** `components/base/VAlert.vue`

**Використання:**

```vue
<template>
  <VAlert type="error">Error message</VAlert>
  <VAlert type="success">Success message</VAlert>
  <VAlert type="warning">Warning message</VAlert>
  <VAlert type="info">Info message</VAlert>
</template>
```

**Props:**
- `type` — тип алерту (error, success, warning, info)

### VAvatar

Аватар користувача.

**Файл:** `components/base/VAvatar.vue`

**Використання:**

```vue
<template>
  <VAvatar :src="user.avatar" :name="user.name" />
</template>
```

**Props:**
- `src` — URL зображення
- `name` — ім'я користувача (для fallback)

### VBreadcrumbs

Навігаційні хлібні крихти.

**Файл:** `components/base/VBreadcrumbs.vue`

**Використання:**

```vue
<template>
  <VBreadcrumbs :items="breadcrumbs" />
</template>

<script setup>
const breadcrumbs = [
  { label: 'Home', to: '/' },
  { label: 'Posts', to: '/posts' },
  { label: 'My Post' },
]
</script>
```

### VGallery

Галерея зображень.

**Файл:** `components/base/VGallery.vue`

**Використання:**

```vue
<template>
  <VGallery :images="images" />
</template>
```

### VLoading

Індикатор завантаження.

**Файл:** `components/base/VLoading.vue`

**Використання:**

```vue
<template>
  <VLoading v-if="loading" />
</template>
```

### VUpload

Завантаження файлів.

**Файл:** `components/base/VUpload.vue`

**Використання:**

```vue
<template>
  <VUpload @upload="handleUpload" />
</template>
```

## Наступні кроки

- [Блоки Page Builder](/components/blocks) — блоки для Page Builder
- [Page Builder](/components/page-builder) — як працює Page Builder

