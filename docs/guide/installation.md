# Встановлення

Детальні інструкції з встановлення AgencyOS.

## Системні вимоги

### Мінімальні вимоги

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.6.0
- **PostgreSQL**: >= 12.0 (для Directus)

### Рекомендовані версії

- **Node.js**: 20.x LTS
- **pnpm**: 9.x
- **PostgreSQL**: 15.x

## Встановлення Directus

### Варіант 1: Directus Cloud (рекомендовано)

1. Перейдіть на [Directus Cloud](https://directus.cloud/register)
2. Створіть новий акаунт або увійдіть
3. Натисніть **Create Project**
4. Виберіть регіон та план
5. Дочекайтеся створення проекту (1-2 хвилини)
6. Скопіюйте URL проекту

**Примітка:** Після 14-денного trial потрібна оплата. [Деталі ціноутворення](https://directus.io/pricing/cloud)

### Варіант 2: Self-hosted з Docker

#### Передумови

- Docker та Docker Compose встановлені
- Порту 8055 доступний

#### Встановлення

```bash
# Перейти в директорію .directus
cd .directus

# Запустити Docker Compose
docker compose up -d

# Перевірити статус
docker compose ps
```

Directus буде доступний на `http://localhost:8055`

#### Перший запуск

1. Відкрийте `http://localhost:8055`
2. Створіть admin користувача
3. Заповніть необхідні поля
4. Збережіть

#### Зупинка

```bash
docker compose down
```

#### Оновлення

```bash
docker compose pull
docker compose up -d
```

### Варіант 3: Self-hosted без Docker

Дотримуйтесь [офіційної документації Directus](https://docs.directus.io/self-hosted/installation.html).

**Важливо:** Для self-hosted без Enterprise ліцензії підтримка не надається.

## Встановлення Frontend

### 1. Клонування репозиторію

```bash
git clone https://github.com/directus-community/agency-os.git
cd agency-os
```

Або використовуйте [GitHub Template](https://github.com/directus-community/agency-os/generate).

### 2. Встановлення залежностей

```bash
pnpm install
```

Якщо pnpm не встановлений:

```bash
npm install -g pnpm
```

### 3. Налаштування змінних оточення

Створіть файл `.env` на основі `.env.example`:

```bash
cp .env.example .env
```

Відредагуйте `.env`:

```txt
# Directus Configuration
DIRECTUS_URL="https://your-instance.directus.app"
DIRECTUS_SERVER_TOKEN="your_static_token_here"
SITE_URL="http://localhost:3000"

# Stripe Configuration (опціонально)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_xxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxx
```

### 4. Застосування шаблону Directus

```bash
npx directus-template-cli@latest apply
```

Виберіть:
1. `Agency OS` template
2. URL вашого Directus інстансу
3. Static token admin користувача

### 5. Запуск

#### Development

```bash
pnpm dev
```

Сайт буде доступний на `http://localhost:3000`

#### Production

```bash
# Збірка
pnpm build

# Запуск
pnpm start
```

#### Static Generation

```bash
pnpm generate
```

## Перевірка встановлення

### 1. Перевірка Directus

- Відкрийте Directus Admin Panel
- Перевірте наявність колекцій (pages, posts, os_projects, тощо)
- Перевірте наявність navigation та globals

### 2. Перевірка Frontend

- Відкрийте `http://localhost:3000`
- Перевірте консоль браузера на помилки
- Перевірте Network tab на успішні запити до Directus

### 3. Перевірка автентифікації

- Спробуйте авторизуватися
- Перевірте redirect після логіну
- Перевірте доступ до `/portal`

## Налаштування Stripe (опціонально)

Якщо потрібна інтеграція з Stripe для білінгу:

1. Створіть акаунт на [Stripe](https://stripe.com)
2. Отримайте API ключі з Dashboard
3. Налаштуйте Webhook endpoint: `https://your-site.com/api/stripe/webhooks`
4. Додайте ключі в `.env`

## Наступні кроки

- [Конфігурація](/guide/configuration) — детальне налаштування
- [Архітектура](/architecture/) — розуміння структури
- [Розгортання](/deployment/) — деплой проекту
