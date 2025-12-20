<template>
    <div class="canvas_size_box">
        <p class="title">
            {{ $t('canvasSize') }}
        </p>

        <div class="canvas_size_box_content">
            <div class="input_box">
                <input type="number" v-model="canvasWidth">
                <span class="unit">
                    {{ $t('width') }}
                </span>
            </div>

            <div class="input_box">
                <input type="number" v-model="canvasHeight">
                <span class="unit">
                    {{ $t('height') }}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const stores = useMainStore()
    const { canvasWidth, canvasHeight } = storeToRefs(stores)

</script>

<style lang="scss" scoped>


    .canvas_size_box {
        box-sizing: border-box;
        padding: 0 12px;
        padding-top: 16px;


        .title {
            font-family: Source Han Sans SC, Source Han Sans SC;
            font-weight: 400;
            font-size: 12px;
            color: #333333;
            margin-bottom: 10px;
        }

        .canvas_size_box_content {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .input_box {
                width: 96px;
                height: 30px;
                background: #F7F6FA;
                border-radius: 6px 6px 6px 6px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                padding: 0 10px;

                input {
                    border: none;
                    outline: none;
                    width: 30px;
                    background-color: transparent;

                    &::-webkit-inner-spin-button,
                    &::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }

                    -moz-appearance: textfield;
                }

                .unit {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: #AAAAAA;
                }
            }
        }
    }
</style>