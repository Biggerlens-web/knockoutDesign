<template>
    <div class="image_cropping_page">

        <asideLeftBox />
    </div>
</template>

<script lang="ts" setup>
    import asideLeftBox from '../components/imageCropping/asideLeftBox.vue'

</script>

<style lang="scss" scoped>
    .image_cropping_page {
        height: calc(100vh - 70px);
        position: relative;
        display: flex;
        align-items: center;
    }

</style>