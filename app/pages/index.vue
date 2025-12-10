<template>
    <div class="home_page">
        <AsideContent />
        <MainContent />
    </div>
</template>

<script lang="ts" setup>
    import AsideContent from '../components/home/asideContent.vue'
    import MainContent from '../components/home/mainContent.vue'
</script>

<style lang="scss" scoped>
    .home_page {
        display: flex;
        align-items: stretch;
    }
</style>
