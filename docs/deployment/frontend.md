# Розгортання Frontend

Детальні інструкції з розгортання Nuxt frontend.

## Vercel (рекомендовано)

### 1. Підключення репозиторію

1. Перейдіть на [Vercel](https://vercel.com)
2. Натисніть **New Project**
3. Підключіть GitHub репозиторій
4. Виберіть проект

### 2. Налаштування

**Framework Preset:** Nuxt.js  
**Build Command:** `pnpm build`  
**Output Directory:** `.output`  
**Install Command:** `pnpm install`

### 3. Environment Variables

Додайте змінні оточення:

```
DIRECTUS_URL=https://your-instance.directus.app
DIRECTUS_SERVER_TOKEN=your_static_token
NUXT_PUBLIC_SITE_URL=https://your-site.vercel.app
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 4. Deploy

Натисніть **Deploy**

## Netlify

### 1. Підключення

1. Перейдіть на [Netlify](https://netlify.com)
2. Натисніть **Add new site**
3. Підключіть GitHub репозиторій

### 2. Налаштування

**Build command:** `pnpm build`  
**Publish directory:** `.output/public`

### 3. Environment Variables

Додайте через Netlify Dashboard → Site settings → Environment variables

### 4. Deploy

Натисніть **Deploy site**

**Примітка:** Можливі проблеми з пам'яттю під час збірки.

## Self-hosted

### 1. Збірка

```bash
pnpm install
pnpm build
```

### 2. Запуск

```bash
pnpm start
```

### 3. З PM2

```bash
# Встановлення PM2
npm install -g pm2

# Запуск
pm2 start ecosystem.config.js

# Автозапуск
pm2 startup
pm2 save
```

### ecosystem.config.js

```javascript
module.exports = {
  apps: [{
    name: 'agencyos',
    script: '.output/server/index.mjs',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

### 4. З Nginx

```nginx
server {
  listen 80;
  server_name your-site.com;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

## Docker

### Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DIRECTUS_URL=${DIRECTUS_URL}
      - DIRECTUS_SERVER_TOKEN=${DIRECTUS_SERVER_TOKEN}
      - NUXT_PUBLIC_SITE_URL=${NUXT_PUBLIC_SITE_URL}
```

## Наступні розділи

- [Backend](/deployment/backend) — розгортання Directus
- [Environment Variables](/deployment/environment) — налаштування змінних

