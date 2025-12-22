<template>
    <div class="canvas_background_box">
        <div class="title">
            <span class="title_text">
                {{ $t('canvasBackground') }}
            </span>
            <span class="clear_background">
                {{ $t('clearBackground') }}
            </span>
        </div>
        <div class="switch_navbar">
            <div class="switch_navbar_slider" :style="sliderStyle"></div>
            <div v-for="item in switchNavbarList" :key="item.value" class="switch_navbar_item"
                :class="{ 'active': item.value === activeNavbar }" @click="handleSwitchNavbar(item.value)">
                {{ item.name }}
            </div>
        </div>

        <keep-alive>
            <component :is="components[activeCanvasBackground]"></component>
        </keep-alive>


    </div>
</template>

<script lang="ts" setup>

    import colorCom from './colorCom.vue'
    import backgroundCom from './backgroundCom.vue'

    const { t } = useI18n()


    const components: any = {
        colorCom,
        backgroundCom,
    }



    const activeCanvasBackground = ref('colorCom')


    interface SwitchNavbarItem {
        name: string
        value: string
    }

    const activeNavbar = ref('color')
    const switchNavbarList = ref<SwitchNavbarItem[]>([
        {
            name: t('color'),
            value: 'color',
        },
        {
            name: t('canvasBackgroundImage'),
            value: 'background',
        },
    ])

    const activeIndex = computed(() => switchNavbarList.value.findIndex((item) => item.value === activeNavbar.value))

    const sliderStyle = computed(() => {
        const count = switchNavbarList.value.length || 1
        const index = activeIndex.value < 0 ? 0 : activeIndex.value
        return {
            width: `calc((100% - 4px) / ${count})`,
            transform: `translateX(${index * 100}%)`,
        }
    })

    const handleSwitchNavbar = (value: string) => {
        activeNavbar.value = value
        activeCanvasBackground.value = `${value}Com`

    }

</script>

<style lang="scss" scoped>
    .canvas_background_box {
        box-sizing: border-box;
        padding: 0 12px;

        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;

            .title_text {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #333333;

            }

            .clear_background {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 10px;
                color: #999999;
                cursor: pointer;
            }
        }

        .switch_navbar {
            width: 196px;
            height: 30px;
            background: #F7F6FA;
            border-radius: 6px 6px 6px 6px;
            box-sizing: border-box;
            padding: 2px;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;

            .switch_navbar_slider {
                position: absolute;
                top: 2px;
                bottom: 2px;
                left: 2px;
                background: #FFFFFF;
                border-radius: 4px;
                transition: transform 0.2s ease, width 0.2s ease;
            }

            .switch_navbar_item {
                flex: 1;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 10px;
                color: #666666;
                text-align: center;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                z-index: 1;
                cursor: pointer;
                transition: color 0.2s ease;
            }

            .switch_navbar_item.active {
                color: #333333;
                font-weight: 500;
            }
        }
    }
</style>
