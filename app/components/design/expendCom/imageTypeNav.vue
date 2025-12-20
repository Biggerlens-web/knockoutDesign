<template>
    <div class="scroll_content">
        <div class="pre_btn" v-if="!isAtStart" @click="handleScrollPrev">
            <img :src="leftArrow" alt="">
        </div>
        <div class="image_navBar" ref="navBarRef">
            <ul class="image_type_list">
                <li v-for="(item, index) in items" :key="index" class="image_type_item"
                    :class="{ 'active': modelValue === index }" @click="handleItemClick(index)">
                    {{ item.name }}
                </li>
            </ul>
        </div>
        <div class="next_btn" v-if="!isAtEnd" @click="handleScrollNext">
            <img :src="rightArrow" alt="">
        </div>
    </div>
</template>

<script lang="ts" setup>
    import leftArrow from '/img/lunarLArrow.png'
    import rightArrow from '/img/lunarRArrow.png'

    interface ImageTypeItem {
        name: string
    }

    const props = defineProps<{ items: ImageTypeItem[]; modelValue: number }>()
    const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

    const navBarRef = ref<HTMLElement | null>(null)
    const isAtStart = ref(true)
    const isAtEnd = ref(false)

    const handleItemClick = (index: number) => {
        emit('update:modelValue', index)
    }

    const updateScrollState = () => {
        const element = navBarRef.value
        if (!element) return
        const maxScrollLeft = element.scrollWidth - element.clientWidth
        isAtStart.value = element.scrollLeft <= 0
        isAtEnd.value = element.scrollLeft >= maxScrollLeft - 1
    }

    const handleScrollPrev = () => {
        const element = navBarRef.value
        if (!element) return
        const scrollAmount = element.clientWidth || 100
        element.scrollTo({ left: Math.max(0, element.scrollLeft - scrollAmount), behavior: 'smooth' })
    }

    const handleScrollNext = () => {
        const element = navBarRef.value
        if (!element) return
        const scrollAmount = element.clientWidth || 100
        const maxScrollLeft = element.scrollWidth - element.clientWidth
        element.scrollTo({ left: Math.min(maxScrollLeft, element.scrollLeft + scrollAmount), behavior: 'smooth' })
    }

    onMounted(() => {
        const element = navBarRef.value
        if (!element) return
        element.addEventListener('scroll', updateScrollState)
        updateScrollState()
    })

    onUnmounted(() => {
        const element = navBarRef.value
        if (!element) return
        element.removeEventListener('scroll', updateScrollState)
    })
</script>

<style lang="scss" scoped>
    .scroll_content {
        position: relative;

        .pre_btn,
        .next_btn {
            top: -2.5px;
            position: absolute;
            width: 30px;
            height: 24px;
            display: flex;
            align-items: center;
            flex-shrink: 0;
            cursor: pointer;

            img {
                width: 12px;
                height: 12px;
            }
        }

        .pre_btn {
            left: 0;
            justify-content: flex-start;
            background: linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
        }

        .next_btn {
            right: 0;
            justify-content: flex-end;
            background: linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
        }

        .image_navBar {
            width: 100%;
            overflow-x: auto;

            &::-webkit-scrollbar {
                display: none;
            }

            .image_type_list {
                flex: 1;
                display: flex;
                flex-wrap: nowrap;
                column-gap: 16px;

                .image_type_item {
                    cursor: pointer;
                    flex-shrink: 0;
                    width: max-content;
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: #666666;
                    box-sizing: border-box;
                    padding-bottom: 4px;
                    border-bottom: 2px solid transparent;
                }

                .active {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 500;
                    font-size: 12px;
                    color: #6B42F2;
                    border-color: #6B42F2;
                }
            }
        }
    }
</style>

