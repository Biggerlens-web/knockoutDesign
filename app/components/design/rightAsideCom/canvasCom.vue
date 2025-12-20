<template>
    <div class="canvas_box">
        <p class="title">
            {{ $t('canvas') }}
        </p>
        <canvasSizeCom></canvasSizeCom>
        <canvasBackgroundCom class="canvas_background_position"></canvasBackgroundCom>
    </div>
</template>

<script lang="ts" setup>
    import canvasSizeCom from '../rightAsideCom/canvasCom/canvasSizeCom.vue';
    import canvasBackgroundCom from '../rightAsideCom/canvasCom/canvasBackgroundCom.vue';

</script>

<style lang="scss" scoped>


    .canvas_box {
        .title {
            height: 40px;

            background: #FFFFFF;
            box-shadow: inset 0px -1px 1px 0px #EEEEEE;
            border-radius: 0px 0px 0px 0px;
            box-sizing: border-box;
            padding: 0 12px;
            font-family: Source Han Sans SC, Source Han Sans SC;
            font-weight: 500;
            font-size: 14px;
            color: #333333;
            line-height: 40px;
        }

        .canvas_background_position {
            margin-top: 24px;
        }
    }
</style>