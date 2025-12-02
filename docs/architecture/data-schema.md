# Схема даних

Схема даних визначає структуру всіх колекцій Directus та їх типізацію в TypeScript.

## Головна схема

**Файл:** `types/schema.ts`

Головна схема визначає всі колекції Directus:

```typescript
export interface Schema {
  // Сторінки
  pages: Page[]
  pages_blocks: PageBlock[]
  
  // Контент
  posts: Post[]
  categories: Category[]
  forms: Form[]
  team: Team[]
  testimonials: Testimonial[]
  
  // Блоки
  block_hero: BlockHero[]
  block_richtext: BlockRichText[]
  block_cta: BlockCta[]
  // ... інші блоки
  
  // OS (операційна система)
  os_projects: OsProject[]
  os_tasks: OsTask[]
  os_invoices: OsInvoice[]
  os_proposals: OsProposal[]
  // ... інші OS колекції
  
  // Системні
  directus_users: User[]
  directus_files: File[]
  
  // Мета
  globals: Globals
  navigation: Navigation[]
  redirects: Redirect[]
  seo: SEO[]
}
```

## Типи контенту

### Page

**Колекція:** `pages`

**Структура:**

```typescript
interface Page {
  id: string
  title: string
  permalink: string
  summary?: string
  status: 'draft' | 'published' | 'archived'
  blocks?: PageBlock[]
  seo?: SEO
  date_created: string
  date_updated: string
}
```

**Використання:**

```typescript
const { data: page } = await useDirectus(
  readItem('pages', pageId, {
    fields: ['*', { blocks: ['*'], seo: ['*'] }]
  })
)
```

### Post

**Колекція:** `posts`

**Структура:**

```typescript
interface Post {
  id: string
  title: string
  slug: string
  summary?: string
  content?: string
  image?: string | File
  category?: Category
  status: 'draft' | 'published'
  date_created: string
  date_updated: string
}
```

### Category

**Колекція:** `categories`

**Структура:**

```typescript
interface Category {
  id: string
  title: string
  slug: string
  description?: string
  image?: string | File
  posts?: Post[]
}
```

## Типи блоків

### BlockHero

**Колекція:** `block_hero`

**Структура:**

```typescript
interface BlockHero {
  id: string
  title?: string
  headline?: string
  content?: string
  image?: string | File
  image_position?: 'left' | 'right'
  button_group?: BlockButtonGroup
}
```

### BlockRichText

**Колекція:** `block_richtext`

**Структура:**

```typescript
interface BlockRichText {
  id: string
  title?: string
  headline?: string
  content?: string
  alignment?: 'left' | 'center' | 'right'
}
```

### BlockForm

**Колекція:** `block_form`

**Структура:**

```typescript
interface BlockForm {
  id: string
  title?: string
  headline?: string
  form?: Form
}
```

## OS типи (Операційна система)

### OsProject

**Колекція:** `os_projects`

**Структура:**

```typescript
interface OsProject {
  id: string
  title: string
  description?: string
  status: 'draft' | 'active' | 'completed' | 'archived'
  organization?: Organization
  contacts?: Contact[]
  tasks?: OsTask[]
  invoices?: OsInvoice[]
  files?: OsProjectFile[]
  date_created: string
  date_updated: string
}
```

### OsTask

**Колекція:** `os_tasks`

**Структура:**

```typescript
interface OsTask {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'completed'
  project?: OsProject
  assigned_to?: User
  due_date?: string
  date_created: string
  date_updated: string
}
```

### OsInvoice

**Колекція:** `os_invoices`

**Структура:**

```typescript
interface OsInvoice {
  id: string
  invoice_number: string
  project?: OsProject
  organization?: Organization
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  amount: number
  currency: string
  items?: OsInvoiceItem[]
  payment_terms?: OsPaymentTerm
  date_created: string
  due_date?: string
}
```

### OsProposal

**Колекція:** `os_proposals`

**Структура:**

```typescript
interface OsProposal {
  id: string
  title: string
  organization?: Organization
  contacts?: Contact[]
  status: 'draft' | 'sent' | 'accepted' | 'rejected'
  blocks?: OsProposalBlock[]
  approvals?: OsProposalApproval[]
  date_created: string
  date_updated: string
}
```

## Системні типи

### User

**Колекція:** `directus_users`

**Структура:**

```typescript
interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  avatar?: string | File
  role?: Role
  status: 'active' | 'invited' | 'draft' | 'suspended'
  // ... інші поля
}
```

### File

**Колекція:** `directus_files`

**Структура:**

```typescript
interface File {
  id: string
  title?: string
  description?: string
  filename_download: string
  type: string
  filesize: number
  // ... інші поля
}
```

## Мета типи

### Globals

**Колекція:** `globals` (singleton)

**Структура:**

```typescript
interface Globals {
  id: string
  title: string
  description?: string
  logo_on_light_bg?: string | File
  logo_on_dark_bg?: string | File
  og_image?: string | File
  social_links?: SocialLink[]
}
```

**Використання:**

```typescript
const { globals } = useAppConfig()
// Або
const { data: globals } = await useDirectus(
  readSingleton('globals')
)
```

### Navigation

**Колекція:** `navigation`

**Структура:**

```typescript
interface Navigation {
  id: string
  title: string
  type: 'page' | 'url'
  page?: Page
  url?: string
  parent?: Navigation
  children?: Navigation[]
  sort?: number
  status: 'draft' | 'published'
}
```

### SEO

**Колекція:** `seo`

**Структура:**

```typescript
interface SEO {
  id: string
  title?: string
  meta_description?: string
  canonical_url?: string
  og_title?: string
  og_description?: string
  og_image?: string | File
  // ... інші SEO поля
}
```

## Відносини (Relations)

### One-to-Many

```typescript
// Page має багато блоків
interface Page {
  blocks?: PageBlock[]
}

// Project має багато задач
interface OsProject {
  tasks?: OsTask[]
}
```

### Many-to-One

```typescript
// Блок належить одній сторінці
interface PageBlock {
  page?: Page
}

// Задача належить одному проекту
interface OsTask {
  project?: OsProject
}
```

### Many-to-Many

```typescript
// Project має багато контактів
interface OsProject {
  contacts?: Contact[]
}

// Через проміжну таблицю os_project_contacts
```

## Запити з відносинами

### Завантаження вкладених даних

```typescript
const { data: project } = await useDirectus(
  readItem('os_projects', projectId, {
    fields: [
      '*',
      {
        tasks: [
          '*',
          { assigned_to: ['id', 'first_name', 'last_name'] }
        ],
        contacts: [
          '*',
          { contacts_id: ['*'] }
        ],
        organization: ['*']
      }
    ]
  })
)
```

### Фільтрація по відносинах

```typescript
const { data: tasks } = await useDirectus(
  readItems('os_tasks', {
    filter: {
      project: { 
        id: { _eq: projectId },
        status: { _eq: 'active' }
      }
    }
  })
)
```

## Типізація в компонентах

### Використання типів

```vue
<script setup lang="ts">
import type { BlockHero, Page } from '~/types'

// Props
defineProps<{
  data: BlockHero
  page?: Page
}>()

// Computed
const title = computed(() => props.data.title)
</script>
```

### Типізація Directus запитів

```typescript
import type { Schema } from '~/types/schema'

const directus = createDirectus<Schema>(url)

// Тепер всі команди типізовані
const pages = await directus.request(
  readItems('pages') // ✅ Автодоповнення
)
```

## Наступні кроки

- [Архітектура](/architecture/) - загальна архітектура
- [API](/api/) - робота з API
- [Компоненти](/components/) - компоненти проекту
