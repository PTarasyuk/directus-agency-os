# Початок роботи

Цей посібник допоможе вам швидко розпочати роботу з AgencyOS.

## Передумови

- **Node.js** >= 18.0.0
- **pnpm** >= 8.6.0
- **Docker** (для локального Directus) або **Directus Cloud** акаунт
- **PostgreSQL** (для self-hosted Directus)

## Крок 1: Налаштування Directus

### Варіант A: Directus Cloud (рекомендовано)

1. Зареєструйтеся на [Directus Cloud](https://directus.cloud/register)
2. Створіть новий проект
3. Скопіюйте URL та згенеруйте static token для admin користувача

**Переваги:**
- Швидке налаштування (2 хвилини)
- Не потрібно налаштовувати сервер
- Автоматичні оновлення

### Варіант B: Self-hosted

```bash
cd .directus
docker compose up
```

Directus буде доступний на `http://localhost:8055`

**Важливо:** Для self-hosted без Enterprise ліцензії підтримка не надається.

## Крок 2: Генерація Static Token

1. Відкрийте Directus Admin Panel
2. Перейдіть до **User Directory**
3. Виберіть **Administrative User**
4. Прокрутіть до поля **Token**
5. Натисніть **Generate token** та скопіюйте його
6. **Обов'язково збережіть** користувача (кнопка Save)

## Крок 3: Застосування шаблону AgencyOS

Ви можете застосувати схемe даних двома способами:

### Варіант A: Віддалений темплейт через `directus-template-cli`

```bash
npx directus-template-cli@latest apply
```

1. Виберіть `Agency OS` template
2. Вставте URL вашого Directus інстансу
3. Вставте static token admin користувача
4. Дочекайтеся завершення (може зайняти кілька хвилин)

### Варіант B: Локальний темплейт з репозиторію

У цьому репозиторії темплейт Directus знаходиться в директорії `./directus/template`.  
Його можна імпортувати до вашого Directus інстансу згідно з офіційною документацією Directus (CLI або UI).

Детальніше про вміст та структуру темплейту: [Directus Template](/guide/directus-template).

В обох випадках це створить всі необхідні колекції, поля та зв'язки в Directus.

## Крок 4: Налаштування Frontend

### Клонування репозиторію

```bash
git clone https://github.com/directus-community/agency-os.git
cd agency-os
```

### Встановлення залежностей

```bash
pnpm install
```

### Налаштування змінних оточення

```bash
cp .env.example .env
```

Відредагуйте `.env` файл:

```txt
# Directus Setup
DIRECTUS_URL="https://your-instance.directus.app"
DIRECTUS_SERVER_TOKEN="your_static_token_here"
SITE_URL="http://localhost:3000"

# Stripe Setup (опціонально, для білінгу)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_xxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxx
```

## Крок 5: Запуск проекту

### Development сервер

```bash
pnpm dev
```

Відкрийте [http://localhost:3000](http://localhost:3000)

### Production збірка

```bash
pnpm build
pnpm start
```

## Перевірка встановлення

1. Відкрийте `http://localhost:3000`
2. Перевірте, що сайт завантажується
3. Спробуйте авторизуватися (якщо налаштовано)
4. Перевірте консоль на наявність помилок

## Наступні кроки

- [Конфігурація](/guide/configuration) — детальне налаштування
- [Архітектура](/architecture/) — розуміння структури
- [Компоненти](/components/) — робота з компонентами
- [API](/api/) — робота з API

## Вирішення проблем

### Помилка "Invalid token"

- Перевірте, чи збережено користувача після генерації token
- Перевірте правильність token в `.env`
- Переконайтеся, що token має права admin

### Помилка підключення до Directus

- Перевірте `DIRECTUS_URL` в `.env`
- Переконайтеся, що Directus інстанс доступний
- Перевірте CORS налаштування в Directus

### Помилки під час збірки

- Очистіть кеш: `rm -rf .nuxt node_modules/.cache`
- Перевстановіть залежності: `rm -rf node_modules && pnpm install`
