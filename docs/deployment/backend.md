# Розгортання Backend

Детальні інструкції з розгортання Directus.

## Directus Cloud (рекомендовано)

### 1. Створення проекту

1. Перейдіть на [Directus Cloud](https://directus.cloud)
2. Натисніть **Create Project**
3. Виберіть регіон та план
4. Дочекайтеся створення (1-2 хвилини)

### 2. Налаштування

1. Відкрийте Admin Panel
2. Згенеруйте static token для admin користувача
3. Застосуйте AgencyOS template (через `directus-template-cli` або локальний темплейт з `./directus/template`, див. [Directus Template](/guide/directus-template))

### 3. Переваги

- Швидке налаштування
- Автоматичні оновлення
- Масштабування
- Backup

## Self-hosted з Docker

### 1. Docker Compose

```yaml
version: '3.8'

services:
  directus:
    image: directus/directus:latest
    ports:
      - "8055:8055"
    environment:
      KEY: your-secret-key
      SECRET: your-secret-secret
      DB_CLIENT: pg
      DB_HOST: db
      DB_PORT: 5432
      DB_DATABASE: directus
      DB_USER: directus
      DB_PASSWORD: directus
      ADMIN_EMAIL: admin@example.com
      ADMIN_PASSWORD: password
    volumes:
      - ./uploads:/directus/uploads
      - ./extensions:/directus/extensions
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: directus
      POSTGRES_PASSWORD: directus
      POSTGRES_DB: directus
    volumes:
      - ./data:/var/lib/postgresql/data
```

### 2. Запуск

```bash
docker compose up -d
```

### 3. Доступ

Directus буде доступний на `http://localhost:8055`

## Self-hosted без Docker

Дотримуйтесь [офіційної документації](https://docs.directus.io/self-hosted/installation.html).

## Налаштування CORS

### В Directus

1. Відкрийте Settings → API
2. Додайте ваш домен в CORS:

```
https://your-site.com
http://localhost:3000
```

## Налаштування Email

### SMTP

1. Відкрийте Settings → Email
2. Налаштуйте SMTP:
   - Host
   - Port
   - User
   - Password
   - From email

## Backup

### PostgreSQL

```bash
# Backup
pg_dump -U directus directus > backup.sql

# Restore
psql -U directus directus < backup.sql
```

### Files

```bash
# Backup uploads
tar -czf uploads-backup.tar.gz ./uploads
```

## Оновлення

### Directus Cloud

Автоматичні оновлення.

### Self-hosted

```bash
# Оновлення Docker image
docker compose pull
docker compose up -d
```

## Наступні розділи

- [Frontend](/deployment/frontend) — розгортання Nuxt
- [Environment Variables](/deployment/environment) — налаштування змінних

