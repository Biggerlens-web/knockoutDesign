<template>
    <div class="aside_right_box">
        <component :is="components[activeCom]"></component>
    </div>
</template>

<script lang="ts" setup>
    import textMaterialEditCom from './textMaterialEditCom.vue'


    const activeCom = ref<string>('textMaterialEditCom')
    const components: any = {
        textMaterialEditCom
    }

</script>

<style lang="scss" scoped>
    .aside_right_box {
        width: 220px;
        height: 100%;
        background-color: #ffffff;
    }
</style>