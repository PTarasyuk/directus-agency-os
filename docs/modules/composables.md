# Композабли модуля Directus

Модуль надає три основні композабли для роботи з Directus.

## useDirectusAuth()

Композабл для автентифікації користувачів.

### Імпорт

Автоматично імпортується, не потрібен явний імпорт.

### API

```typescript
const {
  user,           // Ref<User | null> - поточний користувач
  login,          // (email: string, password: string) => Promise<void>
  logout,         // () => Promise<void>
  fetchUser,      // (params?: object) => Promise<void>
  isAuthenticated // Computed<boolean> - чи автентифікований
} = useDirectusAuth()
```

### Приклади використання

#### Логін

```vue
<script setup>
const { login, user } = useDirectusAuth()
const loading = ref(false)
const error = ref(null)

async function handleLogin(email: string, password: string) {
  loading.value = true
  error.value = null
  
  try {
    await login(email, password)
    // Автоматичний redirect на /portal
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
```

#### Логout

```vue
<script setup>
const { logout } = useDirectusAuth()

async function handleLogout() {
  await logout()
  // Автоматичний redirect на /
}
</script>
```

#### Перевірка автентифікації

```vue
<script setup>
const { user, isAuthenticated } = useDirectusAuth()

// Реактивна перевірка
watch(isAuthenticated, (auth) => {
  if (auth) {
    console.log('Користувач автентифікований')
  }
})

// Доступ до даних користувача
const userName = computed(() => user.value?.first_name)
</script>
```

#### Оновлення даних користувача

```vue
<script setup>
const { fetchUser } = useDirectusAuth()

async function refreshUser() {
  await fetchUser({
    fields: ['*', { contacts: ['*'] }]
  })
}
</script>
```

## useDirectus()

Композабл для виконання запитів до Directus.

### Імпорт

Автоматично імпортується.

### API

```typescript
const data = await useDirectus<Output>(command: RestCommand<Output, Schema>)
```

### Приклади використання

#### Читання колекції

```vue
<script setup>
const pages = await useDirectus(readItems('pages', {
  fields: ['*', { blocks: ['*'] }],
  filter: {
    status: { _eq: 'published' }
  }
}))
</script>
```

#### Читання одного елемента

```vue
<script setup>
const page = await useDirectus(readItem('pages', pageId, {
  fields: ['*', { blocks: ['*'] }]
}))
</script>
```

#### Читання singleton

```vue
<script setup>
const globals = await useDirectus(readSingleton('globals'))
</script>
```

#### Створення елемента

```vue
<script setup>
const newPage = await useDirectus(createItem('pages', {
  title: 'Нова сторінка',
  status: 'draft'
}))
</script>
```

#### Оновлення елемента

```vue
<script setup>
const updatedPage = await useDirectus(updateItem('pages', pageId, {
  title: 'Оновлена назва'
}))
</script>
```

#### Видалення елемента

```vue
<script setup>
await useDirectus(deleteItem('pages', pageId))
</script>
```

#### Агрегація

```vue
<script setup>
const stats = await useDirectus(aggregate('pages', {
  query: {
    aggregate: {
      count: '*',
      status: {
        groupBy: ['status']
      }
    }
  }
}))
</script>
```

## useFiles()

Композабл для роботи з файлами Directus.

### Імпорт

Автоматично імпортується.

### API

```typescript
const {
  fileUrl  // (fileId: string | File) => string | undefined
} = useFiles()
```

### Приклади використання

#### Отримання URL файлу

```vue
<script setup>
const { fileUrl } = useFiles()

const imageId = 'abc123'
const imageUrl = fileUrl(imageId)
// https://directus.app/assets/abc123
</script>

<template>
  <img :src="fileUrl(imageId)" alt="Image" />
</template>
```

#### З об'єктом File

```vue
<script setup>
const { fileUrl } = useFiles()

const file: File = {
  id: 'abc123',
  // ... інші поля
}

const url = fileUrl(file)
</script>
```

#### З перевіркою наявності

```vue
<script setup>
const { fileUrl } = useFiles()

const imageUrl = computed(() => {
  if (!imageId.value) return '/placeholder.png'
  return fileUrl(imageId.value) || '/placeholder.png'
})
</script>
```

## Комбінування композаблів

### Приклад: Завантаження даних з автентифікацією

```vue
<script setup>
const { user, isAuthenticated } = useDirectusAuth()
const { fileUrl } = useFiles()

// Завантажити дані тільки для автентифікованих користувачів
const projects = await useDirectus(readItems('os_projects', {
  filter: {
    contacts: {
      directus_users_id: { _eq: user.value?.id }
    }
  },
  fields: ['*', { 
    files: ['*'],
    contacts: ['*']
  }]
}))

// Використання fileUrl для відображення файлів
const projectImages = computed(() => {
  return projects.value.map(project => ({
    ...project,
    imageUrl: fileUrl(project.image)
  }))
})
</script>
```

## Обробка помилок

```vue
<script setup>
try {
  const data = await useDirectus(readItems('pages'))
} catch (error) {
  // Обробка помилки
  console.error('Помилка завантаження:', error)
  
  if (error.status === 401) {
    // Неавторизований
    await navigateTo('/auth/signin')
  }
}
</script>
```

## Наступні розділи

- [Плагіни](/modules/plugins) — як працюють плагіни
- [Middleware](/modules/middleware) — автентифікація та захист маршрутів
- [Конфігурація](/modules/configuration) — детальна конфігурація

