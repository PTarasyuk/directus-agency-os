import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AgencyOS Docs',
  description: 'Технічна документація для AgencyOS - операційної системи для цифрових агентств',

  // Базовий URL для деплою (GitHub Pages для репозиторію ptarasyuk/directus-agency-os)
  base: '/directus-agency-os/',

  // Мова
  lang: 'uk',

  // Тема
  themeConfig: {
    logo: '/logos/agencyos.png',

    // Навігація
    nav: [
      { text: 'Головна', link: '/' },
      { text: 'Посібник', link: '/guide/' },
      { text: 'Архітектура', link: '/architecture/' },
      { text: 'Модулі', link: '/modules/' },
      { text: 'Компоненти', link: '/components/' },
      { text: 'Layers', link: '/layers/' },
      { text: 'API', link: '/api/' },
      { text: 'Розгортання', link: '/deployment/' },
    ],

    // Сайдбар
    sidebar: {
      '/guide/': [
        {
          text: 'Вступ',
          items: [
            { text: 'Що таке AgencyOS?', link: '/guide/' },
            { text: 'Початок роботи', link: '/guide/getting-started' },
            { text: 'Встановлення', link: '/guide/installation' },
            { text: 'Конфігурація', link: '/guide/configuration' },
            { text: 'Структура проекту', link: '/guide/project-structure' },
            { text: 'Directus Template', link: '/guide/directus-template' },
            { text: 'Розширення AgencyOS', link: '/guide/extending' },
            { text: 'Словник термінів', link: '/guide/glossary' },
          ]
        }
      ],
      '/architecture/': [
        {
          text: 'Архітектура',
          items: [
            { text: 'Огляд архітектури', link: '/architecture/' },
            { text: 'Marketing Site', link: '/architecture/marketing-site' },
            { text: 'Portal', link: '/architecture/portal' },
            { text: 'Proposals', link: '/architecture/proposals' },
            { text: 'CRM / OS Flow', link: '/architecture/os-crm-flow' },
            { text: 'Data Schema', link: '/architecture/data-schema' },
            { text: 'Nuxt Layers', link: '/architecture/layers' },
            { text: 'File-based Routing', link: '/architecture/routing' },
            { text: 'Auto-imports', link: '/architecture/auto-imports' },
            { text: 'Рендеринг', link: '/architecture/rendering' },
          ]
        }
      ],
      '/modules/': [
        {
          text: 'Модуль Directus',
          items: [
            { text: 'Огляд модуля', link: '/modules/' },
            { text: 'Конфігурація', link: '/modules/configuration' },
            { text: 'Композабли', link: '/modules/composables' },
            { text: 'Плагіни', link: '/modules/plugins' },
            { text: 'Middleware', link: '/modules/middleware' },
          ]
        }
      ],
      '/components/': [
        {
          text: 'Компоненти',
          items: [
            { text: 'Огляд компонентів', link: '/components/' },
            { text: 'Базові компоненти', link: '/components/base' },
            { text: 'Блоки Page Builder', link: '/components/blocks' },
            { text: 'Page Builder', link: '/components/page-builder' },
            { text: 'Навігація', link: '/components/navigation' },
          ]
        }
      ],
      '/layers/': [
        {
          text: 'Nuxt Layers',
          items: [
            { text: 'Огляд Layers', link: '/layers/' },
            { text: 'Portal Layer', link: '/layers/portal' },
            { text: 'Proposals Layer', link: '/layers/proposals' },
          ]
        }
      ],
      '/api/': [
        {
          text: 'API',
          items: [
            { text: 'Огляд API', link: '/api/' },
            { text: 'Автентифікація', link: '/api/authentication' },
            { text: 'Endpoints', link: '/api/endpoints' },
            { text: 'Server Utils', link: '/api/server-utils' },
          ]
        }
      ],
      '/deployment/': [
        {
          text: 'Розгортання',
          items: [
            { text: 'Огляд', link: '/deployment/' },
            { text: 'Frontend', link: '/deployment/frontend' },
            { text: 'Backend', link: '/deployment/backend' },
            { text: 'Environment Variables', link: '/deployment/environment' },
          ]
        }
      ],
    },

    // Соціальні посилання
    socialLinks: [
      { icon: 'github', link: 'https://github.com/directus-community/agency-os' }
    ],

    // Пошук
    search: {
      provider: 'local'
    },

    // Footer
    footer: {
      message: 'Випущено під відкритою ліцензією',
      copyright: 'Copyright © 2024 AgencyOS'
    },

    // Редагування на GitHub
    editLink: {
      pattern: 'https://github.com/directus-community/agency-os/edit/main/docs/:path',
      text: 'Редагувати на GitHub'
    },

    // Останні оновлення
    lastUpdated: {
      text: 'Останнє оновлення',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  },

  // Markdown налаштування
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

	ignoreDeadLinks: [
		'http://localhost:5173',
		'http://localhost:3000'
	]
})
