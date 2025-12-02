---
layout: home

hero:
  name: "AgencyOS"
  text: "Документація"
  tagline: Операційна система для цифрових агентств
  image:
    src: /logos/agencyos.png
    alt: AgencyOS
  actions:
    - theme: brand
      text: Почати
      link: /guide/
    - theme: alt
      text: GitHub
      link: https://github.com/directus-community/agency-os

features:
  - icon: 🚀
    title: Швидкий старт
    details: Швидке встановлення та налаштування за кілька хвилин
  - icon: 🎨
    title: Гнучкий дизайн
    details: Повністю кастомізована тема та компоненти
  - icon: 🔧
    title: Модульна архітектура
    details: Легко розширюється через Nuxt Layers
  - icon: 📦
    title: Готові рішення
    details: CRM, білінг, клієнтський портал з коробки
  - icon: 🔐
    title: Безпека
    details: Автентифікація через Directus, Stripe інтеграція
  - icon: 📚
    title: Документація
    details: Повна технічна документація та приклади

---

## Швидкий старт

```bash
# Клонувати репозиторій
git clone https://github.com/directus-community/agency-os.git
cd agency-os

# Встановити залежності
pnpm install

# Налаштувати .env файл
cp .env.example .env

# Запустити dev сервер
pnpm dev
```

Детальні інструкції дивіться в розділі [Встановлення](/guide/installation).
