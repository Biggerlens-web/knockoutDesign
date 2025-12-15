<template>
    <div class="aside_left_expend_box">
        <component v-if="props.isExpend && !props.isAnimating" :is="comList[activeCom]" />
    </div>
</template>

<script lang="ts" setup>
    import SizeEditCom from '../imageCropping/expendCom/sizeEditCom.vue'
    import MaterialEditCom from '../imageCropping/expendCom/materialEditCom.vue'
    import TextEditCom from '../imageCropping/expendCom/textEditCom.vue'

    interface Prop {
        isExpend: boolean
        isAnimating: boolean
        activeCom: string
    }
    const props = defineProps<Prop>()


    const comList = reactive<any>({
        sizeEditCom: SizeEditCom,
        materialEditCom: MaterialEditCom,
        textEditCom: TextEditCom

    })




</script>

<style lang="scss" scoped>
    .aside_left_expend_box {
        width: 240px;
        height: 100%;
        background-color: #ffffff;

    }
</style>
