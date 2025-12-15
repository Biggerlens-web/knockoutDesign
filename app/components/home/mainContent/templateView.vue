<template>
    <div class="template_view_box">
        <div class="move_btn prev_btn" @click="scrollTemplateList('prev')" v-show="showPrevBtn">
            <img src="/img/templateListRigjt.png" alt="">

        </div>
        <ul class="template_view" ref="templateViewRef" @scroll="handleScroll">
            <li v-for="item in templates" :key="item.id" class="template_item" v-show="item.coverurl"
                @click="selectTemplate(item)">
                <img :src="`${TEMPLATE_BASE_URL}/${item.coverurl}`" alt="" @load="onImageLoad">
            </li>
        </ul>
        <div class="move_btn next_btn" @click="scrollTemplateList('next')" v-show="showNextBtn">
            <img src="/img/templateListRigjt.png" alt="">
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue'
    import TEMPLATE_BASE_URL from '~/utils/templateBaseUrl'

    interface Props {
        templates?: any[]
    }
    const props = withDefaults(defineProps<Props>(), {
        templates: () => []
    })
    const emit = defineEmits(['imagesLoaded'])

    const loadedCount = ref(0)

    // Reset count when templates change
    watch(() => props.templates, () => {
        loadedCount.value = 0
        if (props.templates.length === 0) {
            emit('imagesLoaded')
        }
    })




    const onImageLoad = () => {
        loadedCount.value++
        if (loadedCount.value === props.templates.length) {
            emit('imagesLoaded')
        }
    }


    const templateViewRef = ref<HTMLElement | null>(null)
    const showPrevBtn = ref(false)
    const showNextBtn = ref(true)

    //单位模板宽度
    const templateItemWidth = 222;

    //处理滚动事件
    const handleScroll = () => {
        const el = templateViewRef.value
        if (!el) return

        // 更新前向按钮显示状态
        showPrevBtn.value = el.scrollLeft > 0

        // 更新后向按钮显示状态
        // 使用 1px 的容差来处理可能的小数像素差异
        showNextBtn.value = Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth
    }

    //滚动模板列表
    const scrollTemplateList = (direction: string) => {
        const el = templateViewRef.value
        if (!el) return
        const delta = direction === 'prev' ? -templateItemWidth : templateItemWidth
        el.scrollTo({
            left: el.scrollLeft + delta,
            behavior: 'smooth'
        })
    }

    // 监听模板列表变化，重置滚动状态
    watch(() => props.templates, () => {
        // 等待 DOM 更新
        nextTick(() => {
            handleScroll()
        })
    })

    onMounted(() => {
        handleScroll()
    })




    //选择模板
    const selectTemplate = (item: any) => {
        console.log('选择模板', item);
    }

</script>

<style lang="scss" scoped>
    .template_view_box {
        position: relative;
        width: 100%;

        .template_view {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            position: relative;
            column-gap: 20px;
            height: 275px;
            max-width: 100%;
            overflow-x: scroll;

            &::-webkit-scrollbar {
                display: none;
            }

            li {
                height: 300px;
            }


            .template_item {

                flex-shrink: 0;
                width: max-content;
                height: 250px;
                border-radius: 16px 16px 16px 16px;


                img {
                    width: auto;
                    height: 250px;
                    border-radius: 16px 16px 16px 16px;
                }
            }
        }

        .move_btn {
            width: 24px;
            height: 50px;
            background: #F7F6FA;
            border-radius: 12px 12px 12px 12px;
            flex-shrink: 0;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;


            cursor: pointer;
            z-index: 10;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }

        .prev_btn {
            left: -30px;
        }

        .next_btn {
            right: -30px;
        }
    }
</style>
