<template>
    <div class="aside_right_box">
        <component :is="components[activeComponent]"></component>
    </div>
</template>

<script lang="ts" setup>
    import canvasCom from './rightAsideCom/canvasCom.vue';
    import fontCom from './rightAsideCom/fontCom.vue';
    const activeComponent = ref<string>('fontCom')


    const components: any = {

        canvasCom,
        fontCom
    }
</script>

<style lang="scss" scoped>


    .aside_right_box {
        flex-shrink: 0;
        width: 220px;
        height: calc(100vh - 70px);
        background: #FFFFFF;
    }
</style>