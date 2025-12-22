<template>
    <div class="image_list">
        <ul class="nav_bar" ref="navRef">
            <li v-for="item in imageTypeList" :key="item.value" :class="{ 'active': activeType === item.value }"
                @click="activeType = item.value">
                {{ item.label }}
            </li>
        </ul>
        <ul class="images">
            <li v-for="image in imageList" :key="image.id" :class="{ 'active': activeType === image.type }">
                <NuxtImg class="view_img" :class="{ 'loadingSize': image.loading }" :src="image.url" alt=""
                    loading="lazy" placeholder="/img/imageLoading.png" @load="loadingFn(image)" />
            </li>
        </ul>
    </div>

</template>

<script lang="ts" setup>



    const activeType = ref<string>('all')

    const imageTypeList = ref<{
        label: string,
        value: string,
    }[]>([

        {
            label: '全部',
            value: 'all',
        },
        {
            label: '最近使用',
            value: 'recent',
        },
        {
            label: '商品',
            value: 'product',
        },
        {
            label: '文章',
            value: 'article',
        },
    ])
    interface ImageItem {
        id: number,
        url: string,
        type: string,
        loading: boolean,
    }

    const imageList = ref<ImageItem[]>([
        {
            id: 1,
            url: 'https://knockout.oss.biggerlens.com/template/covers/B32E7C30-ED8C-40DD-AC7A-C92F3B3034ED',
            type: 'product',
            loading: true
        },
        {
            id: 2,
            url: 'https://img.knockoutdesign.com/2023/08/10/1691724200000.jpg',
            type: 'article',
            loading: true
        },
        {
            id: 3,
            url: 'https://img.knockoutdesign.com/2023/08/10/1691724200000.jpg',
            type: 'product',
            loading: true
        },

    ])
    const loadingFn = (image: ImageItem) => {
        image.loading = false
    }


</script>

<style lang="scss" scoped>
    .image_list {
        display: flex;
        flex-direction: column;
        height: 100%;

        .nav_bar {
            display: flex;
            column-gap: 16px;
            row-gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 20px;
            height: max-content;

            li {
                cursor: pointer;
                height: 30px;
                background: #F7F6FA;
                border-radius: 10px 10px 10px 10px;
                box-sizing: border-box;
                padding: 0px 16px;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #666666;
                line-height: 30px;
            }

            .active {
                background: #6B42F2;
                color: #FFFFFF;
            }
        }

        .images {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-gap: 12px;
            flex: 1;
            min-height: 0;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                display: none;
            }

            li {
                height: 120px;
                background: #FAFAFA;
                border-radius: 16px 16px 16px 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                overflow: hidden;

                .view_img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .loadingSize {
                    width: 60px;
                    height: 60px;
                    object-fit: contain;
                }
            }
        }

    }
</style>
