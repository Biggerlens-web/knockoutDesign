<template>
    <div class="image_com">
        <div class="uploadImage_box">
            <p class="uploadImage_title">
                {{ $t('image') }}
            </p>
            <div class="uploadImage_btn_content">
                <div class="uploadImage_btn" @click="showUploadDialog">
                    {{ $t('upload_btn_text') }}
                </div>
            </div>
        </div>
        <ul class="image_list_box">
            <p class="image_list_title">
                {{ $t('baseStyle') }}
            </p>
            <image-type-nav :items="imageTypeList" v-model="activeTypeIndex" />
            <ul class="image_list">
                <li v-for="item in 7" :key="item" class="image_item">
                    <img src="" alt="">
                </li>
            </ul>
        </ul>
    </div>


</template>

<script lang="ts" setup>
    const stores = useMainStore()
    const { isShowUploadFileDialog } = storeToRefs(stores)

    import ImageTypeNav from './imageTypeNav.vue'

    const showUploadDialog = () => {
        isShowUploadFileDialog.value = true
    }



    const activeTypeIndex = ref<number>(0)

    const imageTypeList = ref<any>([
        {
            name: '清新'
        },
        {
            name: '清新清新'
        },
        {
            name: '清新'
        },
        {
            name: '清新'
        },
        {
            name: "清新"
        },
        {
            name: '清新'
        },
        {
            name: "清新"
        }
        ,
        {
            name: "清新"
        }
        ,
        {
            name: "清新"
        }
        ,
        {
            name: "清新"
        },
        {
            name: "清新"
        }
        ,
        {
            name: "清新"
        }
    ])

    const handleClick = (index: number) => {
        activeTypeIndex.value = index
    }
</script>

<style lang="scss" scoped>


    .image_com {
        box-sizing: border-box;
        padding: 16px 0px;

        .uploadImage_box {
            .uploadImage_title {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 14px;
                color: #333333;
                margin-bottom: 12px;
            }

            .uploadImage_btn_content {
                width: 100%;
                height: 64px;
                background: #F7F6FA;
                border-radius: 6px 6px 6px 6px;
                display: flex;
                align-items: center;
                justify-content: center;

                .uploadImage_btn {
                    width: 156px;
                    height: 32px;
                    background: #6B42F2;
                    border-radius: 6px 6px 6px 6px;
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 500;
                    font-size: 12px;
                    color: #FFFFFF;
                    line-height: 32px;
                    text-align: center;
                    cursor: pointer;
                }
            }
        }

        .image_list_box {
            margin-top: 20px;

            .image_list_title {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 14px;
                color: #333333;
                margin-bottom: 12px;
            }

            .image_list {
                margin-top: 12px;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                column-gap: 9px;
                row-gap: 8px;

                .image_item {
                    height: 66px;
                    border-radius: 12px 12px 12px 12px;
                    background: #F7F6FA;
                    cursor: pointer;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

            }


        }
    }
</style>
