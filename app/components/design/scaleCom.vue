<template>
    <div class="scale_com_manager">
        <img class="layer_icon" :src="layerIcon" alt="">
        <div class="mid_line"></div>
        <div class="scale_com">
            <img @click="scaleAdd" :src="scaleAddIcon" alt="">
            <span class="scale_com_text">{{ scaleView }}%</span>
            <img @click="scaleReduce" :src="scaleReduceIcon" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">

    import scaleAddIcon from '/img/scaleAddIcon.png'
    import scaleReduceIcon from '/img/scaleReduceIcon.png'
    import layerIcon from '/img/layerIcon.png'
    const stores = useMainStore()
    const { scaleView } = storeToRefs(stores)

    const setViewScalePercent = (window as any).setViewScalePercent as ((percent: number) => void) | undefined
    const SCALE_PERCENT_STEP = 10

    const scaleAdd = () => {
        const nextPercent = Math.min(400, scaleView.value + SCALE_PERCENT_STEP)
        scaleView.value = nextPercent
        if (setViewScalePercent) setViewScalePercent(nextPercent)
    }

    const scaleReduce = () => {
        const nextPercent = Math.max(20, scaleView.value - SCALE_PERCENT_STEP)
        scaleView.value = nextPercent
        if (setViewScalePercent) setViewScalePercent(nextPercent)
    }

</script>

<style lang="scss" scoped>
    .scale_com_manager {
        width: 150px;
        height: 32px;
        background: #FFFFFF;
        box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);
        border-radius: 6px 6px 6px 6px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px;

        .layer_icon {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }

        .mid_line {
            width: 0px;
            height: 12px;
            border-radius: 0px 0px 0px 0px;
            border: 1px solid #CCCCCC;
            margin: 0 10px
        }

        .scale_com {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex: 1;

            img {
                width: 20px;
                height: 20px;
                cursor: pointer;
            }

            .scale_com_text {

                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 10px;
                color: #666666;
            }
        }
    }
</style>
