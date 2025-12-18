<template>
    <div class="lunar_wrap">
        <div class="under_line"></div>
        <div class="scroll_btn prev_btn" @click="scrollTo('prev')" v-show="showPrevBtn">
            <img :src="leftArrow" alt="">

        </div>
        <div class="scroll_mask left_mask" v-show="showPrevBtn"></div>
        <div class="lunar_scroll_view" ref="lunarViewRef" @scroll="handleScroll">
            <template v-for="item in datesView" :key="item.id">
                <div class="month_item" v-if="item.nowMonth"
                    :class="{ 'current_month': item.isCurrentMonth, 'normal_month': !item.isCurrentMonth }">
                    <template v-if="!item.isCurrentMonth">
                        <img class="current_icon" src="" alt="">
                        <div class="current_text_box">
                            <span class="current_text">
                                {{ item.nowMonth }}月
                            </span>
                        </div>
                    </template>
                    <template v-else>

                        <img class="current_icon" src="" alt="">
                        <span class="current_text">
                            {{ item.nowMonth }}月
                        </span>

                    </template>

                </div>
                <div class="date_item" v-else @click="selectDate(item)" :class="{ 'active': item.id === activeId }"
                    :style="{ marginLeft: item.marginLeft + 'px', marginRight: (item.marginRight || 0) + 'px' }">
                    <div class="top_box">
                        <div class="festival_name">
                            <span v-for="festival in item.solarFestivals" :key="festival">
                                {{ festival }}
                            </span>
                            <span v-for="festival in item.lunarFestivals" :key="festival">
                                {{ festival }}
                            </span>
                            <span v-if="item.exactJieQi">
                                {{ item.exactJieQi }}
                            </span>

                        </div>
                        <div class="date_diff">
                            {{ dateCount(item.date) === 0 ? $t('today') : $t('daysLater', { n: dateCount(item.date) })
                            }}
                        </div>
                    </div>
                    <div class="date_view">
                        <span class="date_text">
                            {{ item.date }}
                        </span>
                        &nbsp;
                        <span class="date_week">
                            {{ item.week }}
                        </span>
                    </div>

                </div>
            </template>
        </div>
        <div class="scroll_mask right_mask" v-show="showNextBtn"></div>
        <div class="scroll_btn next_btn" @click="scrollTo('next')" v-show="showNextBtn">
            <img :src="rightArrow" alt="">
        </div>
    </div>
</template>

<script lang="ts" setup>
    import dayjs from 'dayjs'
    import { getLunarResult } from '../utils/lunar'
    import leftArrow from '/img/lunarLArrow.png'
    import rightArrow from '/img/lunarRArrow.png'

    const { locale } = useI18n()
    const emit = defineEmits<{
        (e: 'selectDate', date: string): void
    }>()
    const stores = useMainStore()
    const { templateTypes } = storeToRefs(stores)


    const lunarViewRef = ref<HTMLElement | null>(null)
    const datesList = ref<any>([])
    const datesView = computed(() => {
        const list = datesList.value.filter((item: any) => {
            return item.date === dayjs().format('YYYY-MM-DD') || item.lunarFestivals.length > 0 || item.solarFestivals.length > 0 || item.exactJieQi
        })
        const result: any = []
        list.forEach((item: any, index: number) => {
            let marginLeft = 0
            if (index > 0) {
                const prevDate = dayjs(list[index - 1].date)
                const currDate = dayjs(item.date)
                const diff = currDate.diff(prevDate, 'day')
                if (diff >= 1) {
                    marginLeft = 10 + (diff - 1) * 20
                }
                if (currDate.month() !== prevDate.month()) {
                    const nextMonthFirst = currDate.startOf('month')
                    const daysToNextMonth = nextMonthFirst.diff(prevDate, 'day')
                    if (daysToNextMonth >= 1 && result.length > 0) {
                        const lastItem = result[result.length - 1]
                        lastItem.marginRight = (daysToNextMonth - 1) * 20
                    }

                    result.push({
                        nowMonth: currDate.month() + 1,
                        id: 'month' + item.date
                    })
                    const daysFromMonthStart = currDate.diff(nextMonthFirst, 'day')
                    marginLeft = daysFromMonthStart * 20
                }
            }
            result.push({
                ...item,
                marginLeft
            })
        })
        result.unshift({
            nowMonth: dayjs().month() + 1,
            id: 'month' + dayjs().format('YYYY-MM'),
            isCurrentMonth: true
        })
        return result
    })

    const dateCount = (date: string) => {
        const diff = dayjs(date).startOf('day').diff(dayjs().startOf('day'), 'day')
        return diff
    }



    const activeId = ref<string>('')

    const isFisrtMonth = ref<boolean>(false)
    const isLastMonth = ref<boolean>(false)

    const showPrevBtn = ref(false)
    const showNextBtn = ref(true)

    const handleScroll = () => {
        const el = lunarViewRef.value
        if (!el) return
        showPrevBtn.value = el.scrollLeft > 0
        // Use 1px tolerance
        showNextBtn.value = Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth
    }



    const initDate = () => {
        if (dayjs().month() === 0) {
            isFisrtMonth.value = true
        }
        if (dayjs().month() === 11) {
            isLastMonth.value = true
        }

        console.log('是否一月', isFisrtMonth.value);
        console.log('是否十二月', isLastMonth.value);
        const date = dayjs().format('YYYY-MM-DD')
        const days = 60
        const dateArray = [date]
        for (let i = 1; i < days; i++) {
            const date = dayjs().add(i, 'day').format('YYYY-MM-DD')
            dateArray.push(date)
        }



        const lunarDateArray: any = []
        const weekArray = locale.value === 'en'
            ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            : ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

        dateArray.forEach((item) => {
            const lunarDate = getLunarResult(item, locale.value)

            const lunarObj = {
                id: Math.random().toString(36).substr(2, 9),
                date: item,
                lunarText: lunarDate.lunarText,
                lunarFestivals: lunarDate.lunarFestivals,
                solarFestivals: lunarDate.solarFestivals,
                exactJieQi: lunarDate.exactJieQi,
                currentJieQi: lunarDate.currentJieQi,
                week: weekArray[lunarDate.week],
                weelNum: lunarDate.week,
            }
            lunarDateArray.push(lunarObj)

        })
        datesList.value = lunarDateArray
        console.log('datesList.value', datesList.value);
        activeId.value = datesList.value[0].id



    }

    watch(locale, () => {
        initDate()
        nextTick(() => {
            handleScroll()
        })
    })



    const scrollTo = (direction: string) => {
        const el = lunarViewRef.value
        if (!el) return
        const delta = direction === 'next' ? 160 : -160
        el.scrollTo({ left: el.scrollLeft + delta, behavior: 'smooth' })
    }



    //选择日期
    const selectDate = (date: any) => {
        console.log('选择日期', date);
        activeId.value = date.id

    }

    onMounted(() => {
        initDate()
        nextTick(() => {
            handleScroll()
        })
    })

</script>

<style lang="scss" scoped>

    .lunar_wrap {
        position: relative;
        max-width: 100%;

        .under_line {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            width: 100%;
            height: 2px;
            background: #999999;
        }

        .scroll_btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 32px;
            height: 24px;
            background: #F7F6FA;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 20;
            transition: all 0.3s;

            img {
                width: 12px;
                height: 12px;
            }

            &:hover {
                background: #E8E8E8;
            }
        }

        .prev_btn {
            left: -30px;
        }

        .next_btn {
            right: -30px;
        }

        .scroll_mask {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 160px;
            height: 76px;
            pointer-events: none;
            z-index: 10;
        }

        .left_mask {
            left: 0;
            background: linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
        }

        .right_mask {
            right: 0;
            background: linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
        }
    }

    .lunar_scroll_view {
        display: flex;
        align-items: stretch;
        width: 100%;
        overflow-x: scroll;
        position: relative;
        padding-bottom: 5px; // 预留滚动条空间，如果需要隐藏滚动条可以用其他方式
        scrollbar-width: none; // Firefox 隐藏滚动条
        -ms-overflow-style: none; // IE 10+ 隐藏滚动条

        &::-webkit-scrollbar {
            display: none; // Chrome Safari 隐藏滚动条
        }

        .month_item {

            margin-right: 10px;
        }

        .normal_month {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            row-gap: 8px;
            transform: translateY(5px);

            .current_icon {
                width: 16px;
                height: 16px;
            }

            .current_text_box {
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 64px;
                height: 24px;
                background: #F7F6FA;
                border-radius: 12px 12px 12px 12px;
                padding: 0 10px;
                box-sizing: border-box;

                .current_text {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: #666666;
                }
            }
        }

        .current_month {
            min-width: 64px;
            height: 24px;
            background: #F7F6FA;
            border-radius: 12px 12px 12px 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
            box-sizing: border-box;
            transform: translateY(18px);

            .current_icon {
                width: 16px;
                height: 16px;
            }

            .current_text {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #666666;
            }

        }

        .date_item {

            min-width: 160px;
            height: 56px;
            background: #FFFFFF;
            border-radius: 100px 100px 100px 100px;
            border: 1px solid #999999;
            box-sizing: border-box;
            padding: 10px 20px;
            cursor: pointer;

            .top_box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 5px;

                .festival_name {
                    display: flex;
                    align-items: center;
                    column-gap: 4px;

                    span {
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 500;
                        font-size: 12px;
                        color: #333333;
                    }
                }

                .date_diff {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: rgba(51, 51, 51, 0.6);
                }
            }

            .date_view {
                display: flex;
                align-items: center;

                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 10px;
                color: rgba(51, 51, 51, 0.6);

            }

            &:first-of-type {
                margin-left: 30px !important;
            }
        }

        .active {
            background: #6B42F2;

            .top_box {
                .festival_name {
                    span {
                        color: #FFFFFF;
                    }

                }

                .date_diff {
                    color: rgba(255, 255, 255, 0.6);
                }
            }

            .date_view {
                color: rgba(255, 255, 255, 0.6);
            }
        }








    }
</style>
