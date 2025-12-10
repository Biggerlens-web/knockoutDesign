<template>
    <div class="lunar_wrap">
        <div class="scroll_btn prev_btn" @click="scrollTo('prev')">&lt;</div>
        <div class="scroll_btn next_btn" @click="scrollTo('next')">&gt;</div>
        <div class="lunar_view" ref="lunarViewRef">
            <div class="date_item" v-for="item in datesView" :key="item.date">
                <div class="date_text">
                    {{ item.date }}
                </div>
                <div class="date_week">
                    {{ item.week }}
                </div>
                <div class="date_jieqi" v-if="item.exactJieQi">
                    <el-tag>
                        {{ item.exactJieQi }}
                    </el-tag>
                </div>
                <div class="solar_festival" v-if="item.solarFestivals.length > 0">
                    <el-tag v-for="festival in item.solarFestivals" :key="festival">
                        {{ festival }}
                    </el-tag>
                </div>
                <div class="lunar_festival" v-if="item.lunarFestivals.length > 0">
                    <el-tag v-for="festival in item.lunarFestivals" :key="festival">
                        {{ festival }}
                    </el-tag>
                </div>
                <div class="date_count">
                    {{ dateCount(item.date) === 0 ? '今天' : `${dateCount(item.date)}天后` }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import dayjs from 'dayjs'
    import { getLunarResult } from '../utils/lunar'
    const lunarViewRef = ref<HTMLElement | null>(null)
    const weekArray = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六',]
    const datesList = ref<any>([])
    const datesView = computed(() => {
        return datesList.value.filter((item: any) => {
            return item.date === dayjs().format('YYYY-MM-DD') || item.lunarFestivals.length > 0 || item.solarFestivals.length > 0 || item.exactJieQi
        })
    })

    const dateCount = (date: string) => {
        const diff = dayjs(date).startOf('day').diff(dayjs().startOf('day'), 'day')
        return diff
    }




    const initDate = () => {
        const date = dayjs().format('YYYY-MM-DD')
        const days = 60
        const dateArray = [date]
        for (let i = 1; i < days; i++) {
            const date = dayjs().add(i, 'day').format('YYYY-MM-DD')
            dateArray.push(date)
        }



        const lunarDateArray: any = []
        dateArray.forEach((item) => {
            const lunarDate = getLunarResult(item)

            const lunarObj = {
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



    }




    const scrollTo = (direction: string) => {
        const el = lunarViewRef.value
        if (!el) return
        const delta = direction === 'next' ? 160 : -160
        el.scrollTo({ left: el.scrollLeft + delta, behavior: 'smooth' })
    }

    onMounted(() => {
        initDate()
    })

</script>

<style lang="scss" scoped>

    .lunar_wrap {
        position: relative;
        max-width: 1200px;
    }

    .lunar_view {
        display: flex;
        align-items: stretch;
        column-gap: 10px;
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
            padding: 12px;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            background: #ffffff;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
            display: flex;
            flex-direction: column;
            row-gap: 8px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .date_item:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        }

        .date_text {
            font-size: 16px;
            font-weight: 600;
            color: #111827;
        }

        .date_week {
            font-size: 14px;
            color: #6b7280;
        }



        .date_count {
            font-size: 14px;
            color: #6b7280;
        }
    }
</style>
