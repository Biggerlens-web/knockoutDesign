export function getCdnBaseUrl() {
    const {
        public: { siteTarget }
    } = useRuntimeConfig()
    return siteTarget === 'EN'
        ? 'https://knockout-en.oss.biggerlens.com/knockout'
        : 'https://knockout.oss.biggerlens.com/knockout'
}
