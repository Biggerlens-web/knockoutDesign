<template>
    <div class="filter_com">
        <div v-for="item in labels" :key="item.value" class="filter_big_class">
            <p class="filter_big_title">
                {{ item.title }}:
            </p>
            <ul class="filter_small_class">
                <li @click="item.activeSmall = l.value" class="filter_small_item" v-for="l in item.labels"
                    :key="l.value" :class="{ 'active': l.value === item.activeSmall }">{{ l.title }}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>


    const labels = ref<any>([
        {
            labels: [
                {
                    title: '全部',
                    value: 'all',

                },
                {
                    title: '设计模板',
                    value: 'design',
                },
                {
                    title: 'UI模板',
                    value: 'ui',
                }
            ],
            title: '模板类型',
            value: 'all',
            activeSmall: 'all',
        },
        {
            title: '设计模板',
            value: 'design',
            labels: [
                {
                    title: '全部',
                    value: 'all',
                },
                {
                    title: '设计模板',
                    value: 'design',
                },
            ],
            activeSmall: 'all',
        },
        {
            title: 'UI模板',
            value: 'ui',
            labels: [
                {
                    title: '全部',
                    value: 'all',
                },
                {
                    title: 'UI模板',
                    value: 'ui',
                },
            ],
            activeSmall: 'all',
        },
    ])

</script>

<style lang="scss" scoped>
    .filter_com {
        display: flex;
        flex-direction: column;
        row-gap: 18px;


        .filter_big_class {

            display: flex;
            column-gap: 16px;

            .filter_big_title {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 14px;
                color: #666666;
                padding-top: 4px;
            }

            .filter_small_class {
                display: flex;
                align-items: center;
                column-gap: 12px;
                row-gap: 10px;
                flex-wrap: wrap;

                .filter_small_item {
                    height: 30px;
                    background: #F7F6FA;
                    border-radius: 10px 10px 10px 10px;
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: #666666;
                    line-height: 30px;
                    padding: 0 12px;
                    cursor: pointer;
                }

                .active {
                    background: #6B42F2;
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: #FFFFFF;
                }
            }
        }
    }

</style>