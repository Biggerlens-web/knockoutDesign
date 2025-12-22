<template>
    <el-dialog v-model="showImageLibrary" width="0" style="padding: 0;" :show-close="false">
        <div class="image_library">
            <div class="title_box">
                <ul class="tab_bar">
                    <li v-for="(item, index) in imageLibraryList" :class="{ 'active': activeIndex === index }"
                        :key="index" @click="activeIndex = index">{{ item }}</li>
                </ul>
                <img class="close_btn" @click="showImageLibrary = false" :src="`${getCdnBaseUrl()}/close.png`"
                    alt="close">
            </div>

            <div class="content_box">
                <keep-alive>
                    <component :is="navList[activeIndex]" />
                </keep-alive>

            </div>

        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
    import { getCdnBaseUrl } from '@/utils/cdnBaseUrl';
    import ImageListCom from './imageLibrary/imageListCom.vue';
    import ImageUploadCom from './imageLibrary/imageUploadCom.vue';
    const { t } = useI18n()
    const stores = useMainStore()
    const { showImageLibrary } = storeToRefs(stores)
    const navList = [
        ImageListCom,
        ImageUploadCom,
    ]


    const activeIndex = ref<number>(0)
    const imageLibraryList = ref<string[]>([
        t('imageLibraryTitle'),
        t('upload_btn_text'),
    ])
</script>

<style lang="scss" scoped>

    .image_library {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 840px;
        height: 500px;
        box-sizing: border-box;
        padding: 32px;
        background: #FFFFFF;
        border-radius: 16px 16px 16px 16px;
        box-sizing: border-box;
        padding-bottom: 0;

        .title_box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;

            .tab_bar {
                display: flex;
                align-items: center;
                column-gap: 32px;

                li {
                    cursor: pointer;
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 18px;
                    color: #666666;
                    padding-bottom: 2px;
                    border-bottom: 2px solid transparent;
                }

                .active {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 500;
                    font-size: 18px;
                    color: #6B42F2;
                    border-bottom: 2px solid #6B42F2;
                }

            }

            .close_btn {
                cursor: pointer;
            }
        }

        .content_box {
            height: 410px;
        }
    }


</style>