<template>
    <div class="my_space_box">
        <emtyCom v-if="false"></emtyCom>
        <projectsListCom></projectsListCom>
    </div>
</template>

<script lang="ts" setup>
    import emtyCom from './emtyCom.vue';
    import projectsListCom from './projectsListCom.vue';
</script>

<style lang="scss" scoped>
    .my_space_box {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
</style>