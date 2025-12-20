<template>
    <div class="canvas_background_color_box">
        <p class="title">
            {{ $t('customColor') }}
        </p>
        <div class="color_box">
            <div class="color_item" :style="{ 'background': backgroundColor }">

            </div>
        </div>
        <div class="default_color_box">
            <p class="title">
                {{ $t('commonColor') }}
            </p>
            <ul class="default_color_list">
                <li v-for="item in commonColorList" :key="item" :style="{ 'background': item }"
                    class="default_color_item"></li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>

    const stores = useMainStore()
    const { backgroundColor } = storeToRefs(stores)




    const commonColorList = ref<string[]>([
        'transparent',
        '#ffffff',
        '#000000',
        '#656565',
        '#a7a7a7',
        '#d9d9d9',
        '#ff2021',
        '#ffbc4b',
        '#fef952',
        '#98e165',
        '#2fb5ff',
        '#5371ff',
        '#b65fe6',
        '#ffced2',
        '#ffe8bf',
        '#fcf2d6',
        '#d1ecda',
        '#ddefff',
        '#e5d2f7'
    ])
</script>

<style lang="scss" scoped>

    .canvas_background_color_box {
        margin-top: 24px;

        .title {
            font-family: Source Han Sans SC, Source Han Sans SC;
            font-weight: 400;
            font-size: 12px;
            color: #333333;
            margin-bottom: 10px;
        }

        .color_box {
            width: 196px;
            height: 30px;
            background: #F7F6FA;
            border-radius: 6px 6px 6px 6px;
            box-sizing: border-box;
            padding: 4px;
            cursor: pointer;

            .color_item {
                width: 100%;
                height: 100%;
                border-radius: 4px 4px 4px 4px;

            }
        }

        .default_color_box {
            margin-top: 24px;

            .title {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #333333;
                margin-bottom: 10px;
            }

            .default_color_list {
                display: grid;

                grid-template-columns: repeat(6, 1fr);
                box-sizing: border-box;
                gap: 8px;

                .default_color_item {
                    cursor: pointer;
                    height: 26px;
                    border-radius: 6px 6px 6px 6px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }
            }
        }
    }
</style>