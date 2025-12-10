// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    ssr: true,
    devServer: {
        port: 18807
    },
    plugins: [],
    modules: ['@nuxtjs/i18n', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@element-plus/nuxt'],
    i18n: {
        defaultLocale: import.meta.env.SITE_TARGET === 'EN' ? 'en' : 'zh',
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
            siteTarget: process.env.SITE_TARGET || 'CN'
        }
    },
    app: {
        head: {}
    },
    css: ['/assets/css/init.scss']
})
