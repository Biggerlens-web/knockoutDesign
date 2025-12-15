<template>
    <div class="projects_page">
        <homeHeaderCom class="header_position" :isShowHeaderSearch="true" />
        <div class="main_content">
            <navCom />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import navCom from '~/components/projects/navCom.vue';
</script>

<style lang="scss" scoped>
    .projects_page {
        padding: 0 32px;
        box-sizing: border-box;
        background-color: #fff;
        position: relative;

        .header_position {
            position: sticky;
            top: 0;
            left: 0;
            z-index: 20;
        }

        .main_content {
            padding-top: 20px;
        }
    }
</style>