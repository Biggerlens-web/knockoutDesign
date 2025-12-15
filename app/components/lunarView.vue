<template>
    <div class="lunar_wrap">
        <div class="under_line"></div>
        <div class="scroll_btn prev_btn" @click="scrollTo('prev')">&lt;</div>
        <div class="scroll_btn next_btn" @click="scrollTo('next')">&gt;</div>
        <div class="lunar_view" ref="lunarViewRef">
            <div class="date_item" v-for="item in datesView" :key="item.date" @click="selectDate(item)"
                :class="{ 'active': item.id === activeId }" :style="{ marginLeft: item.marginLeft + 'px' }">
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
                        {{ dateCount(item.date) === 0 ? $t('today') : $t('daysLater', { n: dateCount(item.date) }) }}
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
        </div>
    </div>
</template>

<script lang="ts" setup>
    import dayjs from 'dayjs'
    import { getLunarResult } from '../utils/lunar'


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
        return list.map((item: any, index: number) => {
            let marginLeft = 0
            if (index > 0) {
                const prevDate = dayjs(list[index - 1].date)
                const currDate = dayjs(item.date)
                const diff = currDate.diff(prevDate, 'day')
                if (diff >= 1) {
                    marginLeft = 10 + (diff - 1) * 20
                }
            }
            return {
                ...item,
                marginLeft
            }
        })
    })

    const dateCount = (date: string) => {
        const diff = dayjs(date).startOf('day').diff(dayjs().startOf('day'), 'day')
        return diff
    }



    const activeId = ref<string>('')

    const isFisrtMonth = ref<boolean>(false)
    const isLastMonth = ref<boolean>(false)



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
        const days = dayjs().endOf('month').diff(dayjs(), 'day') + 1
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
        activeId.value = datesList.value[0].id



    }

    watch(locale, () => {
        initDate()
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
        console.log('模板类型', templateTypes.value);
    }

    onMounted(() => {
        initDate()
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
    }

    .lunar_view {
        display: flex;
        align-items: stretch;
        // column-gap: 10px;
        width: 100%;
        overflow-x: scroll;
        position: relative;

        &::-webkit-scrollbar {
            display: none;
        }

        .scroll_btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 28px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid #e5e7eb;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            cursor: pointer;
            z-index: 20;
            user-select: none;
        }

        .scroll_btn.prev_btn {
            left: 0;
        }

        .scroll_btn.next_btn {
            right: 0;
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
