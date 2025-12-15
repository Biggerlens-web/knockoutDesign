<template>
    <div class="sort_box">
        <div class="sort_item" v-for="item in sortList" :key="item.value"
            :class="{ 'active': activeSort === item.value }" @click="handleSort(item)">
            {{ $t(item.i18nKey) }}
        </div>
    </div>
</template>

<script lang="ts" setup>
    const activeSort = ref<string>('all')
    const sortList = ref<any>([
        {
            title: '全部',
            value: 'all',
            i18nKey: 'sortTitle',
        },
        {
            title: '最新',
            value: 'new',
            i18nKey: 'sortNew',
        },
        {
            title: '最热',
            value: 'hot',
            i18nKey: 'sortHot',
        }
    ])


    const handleSort = (item: any) => {
        activeSort.value = item.value
    }

</script>

<style lang="scss" scoped>
    .sort_box {
        padding-top: 20px;
        display: flex;
        align-items: center;
        column-gap: 40px;
        padding-bottom: 16px;

        .sort_item {
            font-family: Source Han Sans SC, Source Han Sans SC;
            font-weight: 400;
            font-size: 18px;
            color: #666666;
            cursor: pointer;
            padding-bottom: 2px;
            border-bottom: 2px solid transparent;
        }

        .active {
            font-weight: 500;
            font-size: 18px;
            color: #6B42F2;
            border-bottom: 2px solid #6B42F2;
        }
    }
</style>