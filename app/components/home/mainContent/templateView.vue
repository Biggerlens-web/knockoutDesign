<template>
    <ul class="template_view" ref="templateViewRef">
        <li class="move_btn prev_btn" @click="scrollTemplateList('prev')">
            &lt;
        </li>
        <li v-for="item in templateList" :key="item.title" class="template_item">
            <img src="" alt="">
            <span class="title_name">{{ item.title }}</span>
        </li>
        <li class="move_btn next_btn" @click="scrollTemplateList('next')">
            &gt;
        </li>
    </ul>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    interface TemplateItem {
        title: string
        path: string
        icon: string
    }
    const templateList = reactive<TemplateItem[]>([
        {
            title: '模板1',
            path: '/template1',
            icon: 'icon1',
        },
        {
            title: '模板2',
            path: '/template2',
            icon: 'icon2',
        },
        {
            title: '模板3',
            path: '/template3',
            icon: 'icon3',
        },
        {
            title: '模板4',
            path: '/template1',
            icon: 'icon1',
        },
        {
            title: '模板5',
            path: '/template2',
            icon: 'icon2',
        },
        {
            title: '模板6',
            path: '/template3',
            icon: 'icon3',
        },
        {
            title: '模板7',
            path: '/template1',
            icon: 'icon1',
        },
        {
            title: '模板8',
            path: '/template2',
            icon: 'icon2',
        },
        {
            title: '模板9',
            path: '/template3',
            icon: 'icon3',
        },
    ])


    const templateViewRef = ref<HTMLElement | null>(null)

    //单位模板宽度
    const templateItemWidth = 222;

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



</script>

<style lang="scss" scoped>
    .template_view {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        // padding: 0 25px;
        position: relative;
        column-gap: 20px;

        max-width: 1200px;
        overflow-x: scroll;

        &::-webkit-scrollbar {
            display: none;
        }

        li {
            height: 300px;
        }


        .template_item {

            flex-shrink: 0;
            width: 200px;
            height: 300px;
            border: 1px solid #000;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            row-gap: 10px;


        }

        .move_btn {
            flex-shrink: 0;
            box-sizing: border-box;
            width: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 20px;
            font-weight: 600;
            color: #000;
            border: 1px solid #000;
            background-color: aliceblue;
            cursor: pointer;
            z-index: 10;
            position: sticky;
        }

        .prev_btn {
            left: 0;
        }

        .next_btn {
            right: 0;
        }
    }
</style>
