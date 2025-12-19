<template>
    <div class="aside_left_expend_box">
        <component :is="componentList[activeCom]" />
    </div>
</template>

<script lang="ts" setup>
    import templateCom from './expendCom/templateCom.vue';
    import materialCom from './expendCom/matiralCom.vue';

    interface Prop {
        activeCom: string
    }
    const props = defineProps<Prop>()

    const componentList: any = {
        templateCom,
        materialCom,
    }

</script>

<style lang="scss" scoped>
    .aside_left_expend_box {
        width: 240px;
        height: 100%;
        background: #FFFFFF;
        box-sizing: border-box;
        padding: 0px 12px;
    }
</style>
