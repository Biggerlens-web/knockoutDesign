<template>
    <div class="calendar_template">

        <div class="title_box">
            <div class="title">

                <span class="title_name">{{ $t('calendarTitle') }}</span>
            </div>
            <div class="more_text">
                {{ $t('moreText') }}
            </div>
        </div>
        <lunarView class="lunar_view" @selectDate="selectDate" />
        <templateView />
    </div>
</template>

<script lang="ts" setup>
    import templateView from './templateView.vue';
    import lunarView from '~/components/lunarView.vue';
    import { ref } from 'vue'
    const props = defineProps({
        templateList: {
            type: Array,
            default: () => []
        }
    })


    const selectDate = (date: string) => {
        console.log('选择的日期', date)
    }


</script>

<style lang="scss" scoped>
    .calendar_template {
        .title_box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;

            .title {
                display: flex;
                align-items: center;

                .title_name {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: bold;
                    font-size: 18px;
                    color: #333333;
                }
            }

            .more_text {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 12px;
                color: #6B42F2;
                cursor: pointer;
            }
        }

        .lunar_view {
            margin-bottom: 10px;
        }
    }
</style>