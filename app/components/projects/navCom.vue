<template>
    <ul class="nav_com">
        <li class="nav_item" v-for="item in navList" :key="item.value" :class="{ 'active': activeNav === item.value }"
            @click="selectNav(item)">
            {{ $t(item.i18nkey) }}
        </li>
    </ul>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'



    const activeNav = defineModel('active-nav', {
        type: String,
        default: 'all'
    })
    const selectNav = (item: any) => {
        activeNav.value = item.value
    }
    const navList = ref<any>([
        {
            title: '我的空间',
            value: 'mySpaceCom',
            i18nkey: 'mySpace',

        },
        {
            title: '最近打开',
            value: 'recentlyOpen',
            i18nkey: 'recentlyOpen',
        },
        {
            title: '草稿箱',
            value: 'draftBox',
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

        .active {
            font-weight: 500;
            font-size: 18px;
            color: #6B42F2;
            border-color: #6B42F2;
        }
    }
</style>