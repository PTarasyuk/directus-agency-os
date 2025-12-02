# Компоненти

Огляд компонентної системи AgencyOS.

## Структура компонентів

```
components/
├── base/              # Базові UI компоненти
├── blocks/            # Блоки для Page Builder
├── navigation/        # Навігація
├── post/              # Компоненти постів
├── typography/        # Типографіка
├── PageBuilder.vue    # Основний Page Builder
└── PageContainer.vue  # Контейнер сторінки
```

## Auto-import

Всі компоненти автоматично імпортуються Nuxt, не потрібен явний імпорт.

```vue
<!-- Не потрібно імпортувати -->
<template>
  <VAlert type="success" />
  <BlocksHero :data="heroData" />
</template>
```

## Базові компоненти

Компоненти з `components/base/` доступні без префіксу.

### Доступні компоненти

- `LoginForm` — форма автентифікації
- `VAlert` — алерти
- `VAvatar` — аватар користувача
- `VBreadcrumbs` — навігаційні хлібні крихти
- `VGallery` — галерея зображень
- `VLoading` — індикатор завантаження
- `VUpload` — завантаження файлів
- `VVideo` — відео плеєр
- `VText` — текстовий компонент
- `VLabel` — мітка
- `VSignature` — підпис

Детальніше: [Базові компоненти](/components/base)

## Блоки Page Builder

Компоненти з `components/blocks/` використовуються в Page Builder.

### Доступні блоки

- `BlocksHero` — hero секція
- `BlocksRichText` — багатий текст
- `BlocksColumns` — колонки
- `BlocksCta` — call-to-action
- `BlocksForm` — динамічні форми
- `BlocksGallery` — галерея
- `BlocksFaqs` — FAQ
- `BlocksTestimonials` — відгуки
- `BlocksTeam` — команда
- `BlocksVideo` — відео
- `BlocksSteps` — кроки
- `BlocksQuote` — цитата
- `BlocksLogoCloud` — хмара логотипів
- `BlocksDivider` — розділювач
- `BlocksRawHtml` — сирий HTML

Детальніше: [Блоки Page Builder](/components/blocks)

## Page Builder

Основний компонент для побудови сторінок.

### Використання

```vue
<script setup>
const page = await useDirectus(readItem('pages', pageId, {
  fields: ['*', { blocks: ['*'] }]
}))
</script>

<template>
  <PageBuilder :page="page" />
</template>
```

Детальніше: [Page Builder](/components/page-builder)

## Навігація

Компоненти для навігації сайту.

- `TheHeader` — головне меню
- `TheFooter` — футер
- `MobileMenu` — мобільне меню
- `MenuItem` — пункт меню

Детальніше: [Навігація](/components/navigation)

## Наступні розділи

- [Базові компоненти](/components/base) — детальний опис базових компонентів
- [Блоки Page Builder](/components/blocks) — блоки для побудови сторінок
- [Page Builder](/components/page-builder) — як працює Page Builder
- [Навігація](/components/navigation) — компоненти навігації
