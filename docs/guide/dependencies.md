## Зовнішні залежності

У цьому розділі зібрані **всі основні та другорядні пакети**, які використовує AgencyOS, з коротким описом та посиланнями на офіційну документацію.

> **Примітка:** версії вказані орієнтовно; актуальні значення дивіться у `package.json`.

---

## Runtime

- **Node.js**  
  Runtime середовище для виконання JavaScript/TypeScript.  
  Документація: [`https://nodejs.org`](https://nodejs.org)

- **pnpm**  
  Швидкий менеджер пакетів з підтримкою монорепозиторіїв.  
  Документація: [`https://pnpm.io`](https://pnpm.io)

---

## Core Framework

- **nuxt**  
  Nuxt 3 — фреймворк поверх Vue 3 з SSR, SSG та повним стеком для побудови веб‑додатків.  
  Документація: [`https://nuxt.com`](https://nuxt.com)

- **vue 3** (як частина Nuxt)  
  Реактивний фронтенд‑фреймворк.  
  Документація: [`https://vuejs.org`](https://vuejs.org)

- **typescript**  
  Типізований супермножина JavaScript, використовується по всьому проєкту.  
  Документація: [`https://www.typescriptlang.org/docs`](https://www.typescriptlang.org/docs)

- **vue-tsc**  
  Перевірка типів Vue SFC (CLI для TypeScript + Vue).  
  Документація: [`https://github.com/vuejs/language-tools`](https://github.com/vuejs/language-tools)

---

## Directus & дані

- **@directus/sdk**  
  Офіційний SDK для роботи з Directus (REST).  
  Документація: [`https://docs.directus.io/reference/sdk`](https://docs.directus.io/reference/sdk)

- **vue-dompurify-html**  
  Vue‑обгортка над DOMPurify для безпечного рендерингу HTML з Directus.  
  Документація: [`https://github.com/LeSuisse/vue-dompurify-html`](https://github.com/LeSuisse/vue-dompurify-html)

- **uuid / @types/uuid**  
  Генерація UUID, типи для UUID в TypeScript.  
  Документація: [`https://github.com/uuidjs/uuid`](https://github.com/uuidjs/uuid)

---

## Nuxt‑модулі (офіційні / спільноти)

- **@nuxt/ui**  
  Компонентна бібліотека Nuxt UI (карти, кнопки, модальні вікна, форми тощо).  
  Документація: [`https://ui.nuxt.com`](https://ui.nuxt.com)

- **@nuxt/icon**  
  Уніфікований модуль для підключення іконок (Iconify, SVG, кастомні).  
  Документація: [`https://github.com/nuxt-modules/icon`](https://github.com/nuxt-modules/icon)

- **@nuxt/image**  
  Модуль оптимізації зображень (lazy‑load, формати, CDN).  
  Документація: [`https://image.nuxt.com`](https://image.nuxt.com)

- **@nuxtjs/color-mode**  
  Управління кольоровим режимом (light/dark/system) через класи та cookies.  
  Документація: [`https://color-mode.nuxtjs.org`](https://color-mode.nuxtjs.org)

- **@nuxtjs/google-fonts**  
  Автоматичне підключення Google Fonts з кешуванням і preload.  
  Документація: [`https://google-fonts.nuxtjs.org`](https://google-fonts.nuxtjs.org)

- **@nuxtjs/seo**  
  Комплексний SEO‑модуль (meta, OG, sitemap, robots, schema.org, og-image).  
  Документація: [`https://nuxtseo.com`](https://nuxtseo.com)

- **@vueuse/nuxt**  
  Nuxt‑обгортка для VueUse (auto‑import composables).  
  Документація: [`https://vueuse.org/guide/#nuxt`](https://vueuse.org/guide/#nuxt)

---

## UI / UX та анімації

- **Tailwind CSS** (через `@nuxtjs/tailwindcss`)  
  Utility‑first CSS фреймворк для стилізації інтерфейсу.  
  Документація: [`https://tailwindcss.com`](https://tailwindcss.com)

- **@nuxtjs/tailwindcss**  
  Nuxt‑модуль для інтеграції Tailwind CSS.  
  Документація: [`https://tailwindcss.com/docs/guides/nuxtjs`](https://tailwindcss.com/docs/guides/nuxtjs)

- **@tailwindcss/forms**  
  Офіційний Tailwind плагін для стилізації форм.  
  Документація: [`https://github.com/tailwindlabs/tailwindcss-forms`](https://github.com/tailwindlabs/tailwindcss-forms)

- **@tailwindcss/typography**  
  Tailwind Typography (prose‑класи) для контенту/блогів.  
  Документація: [`https://github.com/tailwindlabs/tailwindcss-typography`](https://github.com/tailwindlabs/tailwindcss-typography)

- **@headlessui/vue**  
  Headless UI компоненти (модальні, меню, списки) з підтримкою а11y.  
  Документація: [`https://headlessui.com`](https://headlessui.com)

- **@formkit/auto-animate**  
  Простий auto‑animate для плавних переходів в списках/формах.  
  Документація: [`https://auto-animate.formkit.com`](https://auto-animate.formkit.com)

- **@vueuse/core**  
  Набір готових Vue composables (таймери, сенсори, хелпери для браузера тощо).  
  Документація: [`https://vueuse.org`](https://vueuse.org)

- **@vueuse/motion**  
  Анімації та motion‑примітиви на базі Motion One.  
  Документація: [`https://motion.vueuse.org`](https://motion.vueuse.org)

- **v-perfect-signature**  
  Компонент для захоплення рукописного підпису (canvas). Використовується в пропозиціях.  
  Репозиторій: [`https://github.com/maxios666/v-perfect-signature`](https://github.com/maxios666/v-perfect-signature)

---

## Платежі та Stripe

- **stripe**  
  Офіційна Node.js бібліотека Stripe (server‑side API).  
  Документація: [`https://stripe.com/docs/libraries/node`](https://stripe.com/docs/libraries/node)

- **@stripe/stripe-js**  
  Stripe.js для клієнта (checkout, payment elements, billing portal).  
  Документація: [`https://stripe.com/docs/js`](https://stripe.com/docs/js)

---

## Маркдаун та контент

- **micromark**  
  Низькорівневий Markdown‑парсер, використовується для обробки контенту.  
  Документація: [`https://github.com/micromark/micromark`](https://github.com/micromark/micromark)

- **micromark-extension-gfm**  
  Розширення micromark для GitHub‑flavored Markdown (таблиці, task‑листи тощо).  
  Документація: [`https://github.com/micromark/micromark-extension-gfm`](https://github.com/micromark/micromark-extension-gfm)

---

## Іконки

- **@iconify-json/material-symbols**  
  JSON‑набір іконок Material Symbols для Iconify.  
  Документація: [`https://iconify.design`](https://iconify.design)

- **@iconify-json/mdi**  
  JSON‑набір іконок Material Design Icons для Iconify.  
  Документація: [`https://iconify.design`](https://iconify.design)

---

## Якість коду та інструменти розробки

- **eslint**  
  Лінтер для JavaScript/TypeScript/Vue.  
  Документація: [`https://eslint.org`](https://eslint.org)

- **eslint-plugin-vue**  
  Правила ESLint для Vue 3 / SFC.  
  Документація: [`https://eslint.vuejs.org`](https://eslint.vuejs.org)

- **@nuxtjs/eslint-module**  
  Інтеграція ESLint у Nuxt (lint під час розробки/білду).  
  Документація: [`https://eslint.nuxtjs.org`](https://eslint.nuxtjs.org)

- **@nuxtjs/eslint-config-typescript**  
  Готовий ESLint конфіг для Nuxt + TypeScript.  
  Документація: [`https://github.com/nuxt/eslint-config`](https://github.com/nuxt/eslint-config)

- **prettier**  
  Форматер коду (JS/TS/Vue/Markdown/YAML).  
  Документація: [`https://prettier.io`](https://prettier.io)

- **eslint-config-prettier**  
  Вимикає конфліктні ESLint‑правила, щоб не дублювати роботу Prettier.  
- **eslint-plugin-prettier**  
  Запускає Prettier як ESLint‑rule.  
  Документація: [`https://github.com/prettier/eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier)

---

## Підсумок

Цей список охоплює **усі основні (runtime) та другорядні (dev‑tooling) залежності** з `package.json`.  
Для деталей по конфігурації дивіться також:

- [Конфігурація](/guide/configuration)
- [Архітектура / Ключові файли](/architecture/key-files)


