<template>
    <div class="main_box">
        <designTools />
        <templates />
        <calendarTemplate />


        <div class="more_btn">
            查看更多模板
        </div>
    </div>
</template>

<script lang="ts" setup>
    import designTools from './mainContent/designTools.vue';
    import templates from './mainContent/templates.vue';
    import calendarTemplate from './mainContent/calendarTemplate.vue';
</script>

<style lang="scss" scoped>
    .main_box {
        box-sizing: border-box;
        padding: 20px;
        flex: 1;
        background: #ffffff;

        .more_btn {

            width: max-content;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #000;
            border: 1px solid #000;
            border-radius: 20px;
            display: flex;
            align-items: center;
            column-gap: 10px;
            margin: 0 auto;
            padding: 0 10px;
            margin-top: 50px;
            cursor: pointer;
        }
    }
</style>