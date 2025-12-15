<template>
    <ul class="nav_com">
        <li class="nav_item" v-for="item in navList" :key="item.value">
            {{ $t(item.i18nkey) }}
        </li>
    </ul>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'

    const navList = ref<any>([
        {
            title: '我的空间',
            value: 'all',
            i18nkey: 'mySpace',

        },
        {
            title: '最近打开',
            value: 'design',
            i18nkey: 'recentlyOpen',
        },
        {
            title: '草稿箱',
            value: 'ui',
            i18nkey: 'draftBox',
        },
        {
            title: '回收站',
            value: 'recycleBin',
            i18nkey: 'recycleBin',
        }
    ])

</script>

<style lang="scss" scoped>
    .nav_com {
        display: flex;
        align-items: center;

        padding-bottom: 16px;
        column-gap: 40px;

        .nav_item {
            padding-bottom: 2px;
            border-bottom: 2px solid transparent;
            font-family: Source Han Sans SC, Source Han Sans SC;
            font-weight: 400;
            font-size: 18px;
            color: #666666;
            cursor: pointer;
        }
    }
</style>