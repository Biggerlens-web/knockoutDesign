<template>
    <div class="aside_left_expend_box" :class="{ 'pageComStyle': activeCom === 'pageCom' }">
        <component :is="componentList[activeCom]" />
    </div>
</template>

<script lang="ts" setup>
    import templateCom from './expendCom/templateCom.vue';
    import materialCom from './expendCom/matiralCom.vue';
    import fontCom from './expendCom/fontCom.vue';
    import imageCom from './expendCom/imageCom.vue';
    import pageCom from './expendCom/pageCom.vue';
    interface Prop {
        activeCom: string
    }
    const props = defineProps<Prop>()

    const componentList: any = {
        templateCom,
        materialCom,
        fontCom,
        imageCom,
        pageCom,
    }
    watch(() => props.activeCom, (newV) => {
        console.log('newV', newV);
    })

</script>

<style lang="scss" scoped>
    .aside_left_expend_box {
        width: 240px;
        height: 100%;
        background: #FFFFFF;
        box-sizing: border-box;
        padding: 0px 12px;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            width: 5px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #9c9797;
            border-radius: 10px;
        }
    }

    .pageComStyle {
        padding: 0 !important;
        overflow-y: visible !important;
    }
</style>
