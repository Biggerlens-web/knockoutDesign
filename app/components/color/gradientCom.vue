<template>
    <div class="gradient_box">
        <div class="gradient_num_box">
            <p class="gradient_num_title">
                {{ $t("gradientNum") }}
            </p>
            <div class="gradient_num_input_box">
                <div class="num_box">
                    <input type="number" v-model="gradientNum" />
                </div>
                <div class="deg_box">
                    <input type="number" v-model="deg" />
                    <span>°</span>
                </div>
            </div>

            <div class="gradient_color_edit">
                <div class="gradient_point" :class="{ 'active': activePoint === point.id }"
                    v-for="point in gradientPointList" :key="point.id" @click="handleClickPoint(point)"
                    :style="{ left: `${pointCursorLeft(point)}%`, '--gradient-point-color': point.color }"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import generateGradientId from '@/utils/generateId'
    const gradientNum = ref<number>(2)
    const deg = ref<number>(90)







    interface GradientPoint {
        color: string
        position: number
        active: boolean
        id: string
    }


    const activePoint = ref<string>('')
    const gradientPointList = ref<GradientPoint[]>([
        {
            color: "#fd2021",
            position: 0,
            active: false,
            id: generateGradientId()
        },
        {
            color: "#B65FE6",
            position: 50,
            active: false,
            id: generateGradientId()
        }
    ])


    const pointCursorLeft = (point: GradientPoint) => {
        const base = (point.position)
        const min = 4
        const max = 96
        if (base < min) {
            return min
        }
        if (base > max) {
            return max
        }
        return base
    }

    const handleClickPoint = (point: GradientPoint) => {
        activePoint.value = point.id

    }

</script>

<style lang="scss" scoped>

    .gradient_box {

        .gradient_num_box {
            .gradient_num_title {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #333333;
                margin-bottom: 10px;
            }

            .gradient_num_input_box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 12px;

                .num_box {
                    width: 80px;
                    height: 26px;
                    background: #F7F6FA;
                    border-radius: 6px 6px 6px 6px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    box-sizing: border-box;
                    padding: 0 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: #000000;

                    input {
                        width: 80px;
                        min-width: 0;
                        outline: none;
                        border: none;
                        background: transparent;

                        &::-webkit-inner-spin-button {
                            -webkit-appearance: none;
                        }
                    }
                }

                .deg_box {
                    width: 60px;
                    height: 26px;
                    background: #F7F6FA;
                    border-radius: 6px 6px 6px 6px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 12px;
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: #000000;

                    input {
                        width: 30px;
                        min-width: 0;
                        outline: none;
                        border: none;
                        background: transparent;
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 400;
                        font-size: 12px;
                        color: #000000;
                        text-align: center;


                        &::-webkit-inner-spin-button {
                            -webkit-appearance: none;
                        }
                    }
                }
            }

            .gradient_color_edit {
                width: 100%;
                height: 20px;
                background: linear-gradient(90deg, #E5D2F7 0%, #B65FE6 100%);
                border-radius: 6px 6px 6px 6px;
                position: relative;

                .gradient_point {
                    position: absolute;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 20px;
                    height: 20px;
                    border-radius: 6px;
                    box-sizing: border-box;
                    border: 4px solid #ffffff;
                    background-color: rgba(0, 0, 0, 0.6);
                    cursor: pointer;
                    overflow: hidden;

                    &::after {
                        content: '';
                        position: absolute;
                        inset: -5px;
                        border-radius: 4px;
                        background-color: var(--gradient-point-color);
                    }

                    &.active {
                        box-shadow: 0 0 0 2px #4C3FFE;
                    }
                }
            }
        }
    }
</style>
