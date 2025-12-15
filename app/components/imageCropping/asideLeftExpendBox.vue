<template>
    <div class="aside_left_expend_box">
        <component v-if="props.isExpend && !props.isAnimating" :is="comList[activeCom]" />
    </div>
</template>

<script lang="ts" setup>
    import SizeEditCom from '../imageCropping/expendCom/sizeEditCom.vue'
    interface Prop {
        isExpend: boolean

        isAnimating: boolean
    }
    const props = defineProps<Prop>()

    const activeCom = ref<string>('sizeEditCom')
    const comList = reactive<any>({
        sizeEditCom: SizeEditCom


    })




</script>

<style lang="scss" scoped>
    .aside_left_expend_box {
        width: 300px;
        height: 100%;
        background-color: #7f798b;
    }
</style>
