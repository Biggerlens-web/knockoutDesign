// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    ssr: true,
    devServer: {
        port: 18807
    },
    plugins: [],
    modules: ['@nuxtjs/i18n', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@element-plus/nuxt', '@nuxt/image'],
    i18n: {
        strategy: 'no_prefix',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root'
        },
        defaultLocale: import.meta.env.VITE_SITE_TARGET === 'EN' ? 'en' : 'zh',
        locales: [
            {code: 'en', name: 'English', file: 'en.json'},
            {code: 'zh', name: '中文', file: 'zh.json'}
        ]
    },
    pinia: {
        storesDirs: ['stores']
    },
    runtimeConfig: {
        public: {
            siteTarget: process.env.VITE_SITE_TARGET || 'CN'
        }
    },
    app: {
        head: {}
    },
    css: ['animate.css', '/assets/css/init.scss']
})