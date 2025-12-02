import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // Layout slots можна додати тут
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Додаткові налаштування можна додати тут
  }
}


