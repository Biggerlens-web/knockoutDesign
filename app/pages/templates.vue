<template>
    <div class="templates_page">
        <homeHeaderCom class="header_position" :isShowHeaderSearch="true" />
        <div class="templates_box">
            <filterCom />
        </div>
        <sortCom />
        <templateFloatCom />
    </div>
</template>

<script lang="ts" setup>
    import filterCom from '@/components/templates/filterCom.vue'
    import sortCom from '@/components/templates/sortCom.vue'
    import templateFloatCom from '@/components/templates/templateFloatCom.vue'
</script>

<style lang="scss" scoped>


    .templates_page {
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

        .templates_box {
            padding-bottom: 32px;
            border-bottom: 1px solid #DADADA;
        }
    }
</style>