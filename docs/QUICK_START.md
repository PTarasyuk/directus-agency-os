# Швидкий старт з документацією

## Запуск документації

### 1. Встановлення залежностей

```bash
pnpm install
```

### 2. Запуск dev сервера

```bash
pnpm docs:dev
```

Документація буде доступна на [http://localhost:5173](http://localhost:5173)

### 3. Збірка для production

```bash
pnpm docs:build
```

### 4. Preview зібраної документації

```bash
pnpm docs:preview
```

## Структура документації

```
docs/
├── .vitepress/          # Конфігурація VitePress
├── guide/               # Посібник для початківців
├── architecture/        # Архітектура проекту
├── modules/             # Модуль Directus
├── components/          # Компоненти
├── layers/              # Nuxt Layers
├── api/                 # API endpoints
└── deployment/          # Розгортання
```

## Редагування документації

Всі файли документації знаходяться в `docs/` директорії у форматі Markdown.

### Формат файлів

- Використовуйте Markdown синтаксис
- Код блоки з підсвіткою синтаксису
- Посилання на інші сторінки через `/path/to/page`

### Додавання нової сторінки

1. Створіть `.md` файл в відповідній директорії
2. Додайте посилання в `docs/.vitepress/config.ts` в сайдбар

## Деплой документації

### Vercel

1. Підключіть репозиторій до Vercel
2. Налаштуйте Build Command: `pnpm docs:build`
3. Налаштуйте Output Directory: `docs/.vitepress/dist`
4. Deploy

### Netlify

1. Підключіть репозиторій до Netlify
2. Налаштуйте Build Command: `pnpm docs:build`
3. Налаштуйте Publish Directory: `docs/.vitepress/dist`
4. Deploy

## Додаткова інформація

- [VitePress Documentation](https://vitepress.dev/)
- [Markdown Guide](https://www.markdownguide.org/)

