<template>
    <div class="download_select" v-show="visible">
        <p class="title_box">
            <span>
                {{ $t('download') }}
            </span>
            <img :src="`${getCdnBaseUrl()}/close.png`" alt="" @click="visible = false">
        </p>
        <div class="filter_box">
            <p class="filter_title">
                {{ $t('download_type') }}
            </p>


            <div class="filter_input" @click="toggleFileType($event)">


                <div class="input_left">
                    <span class="selected_type_name">
                        {{ selectTypeViewText }}
                    </span>
                    <span class="recommend_tips" v-if="isRecommend">
                        {{ $t('recommendTips') }}
                    </span>


                </div>
                <img class="downArrow" src="/img/downArrow.png" alt="">






                <ul class="filter_items" v-show="isShowFileType">
                    <li class="filter_item" v-for="item in fileTypeList" :key="item.type"
                        :class="{ 'active': selectedType === item.value }"
                        @click="handleSelectType(item.value, $event)">
                        <div class="left_box">
                            <p class="type_name">
                                {{ item.type }}
                            </p>
                            <p class="type_desc">
                                {{ item.desc }}
                            </p>
                        </div>
                        <img class="selected_icon" v-if="selectedType === item.value" src="/img/selectedIcon.png"
                            alt="">
                    </li>
                </ul>

            </div>
            <div class="filter_input" @click="toggleCompressLevel($event)">


                <div class="input_left">
                    <span class="selected_type_name">
                        {{ compressSelectTypeViewText }}
                    </span>
                    <span class="recommend_tips" v-if="compressIsRecommend">
                        {{ $t('noCompress') }}
                    </span>


                </div>
                <img class="downArrow" src="/img/downArrow.png" alt="">






                <ul class="filter_items" v-show="isShowCompressLevel">
                    <li class="filter_item" v-for="item in compressLevelList" :key="item.type"
                        :class="{ 'active': compressSelectedType === item.value }"
                        @click="handleSelectCompressLevel(item.value, $event)">
                        <div class="left_box">
                            <p class="type_name">
                                {{ item.type }}
                            </p>
                            <p class="type_desc">
                                {{ item.desc }}
                            </p>
                        </div>
                        <img class="selected_icon" v-if="compressSelectedType === item.value"
                            src="/img/selectedIcon.png" alt="">
                    </li>
                </ul>

            </div>
            <div class="download_btn" @click="handleDownload">
                {{ $t('download') }}
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
    const { t } = useI18n()
    const visible = defineModel('visible', {
        type: Boolean,
        default: false
    })
    interface FileType {
        type: string
        desc: string
        value: string
        isRecommend: boolean
    }


    const selectedType = ref<string>('jpg')
    const isRecommend = computed(() => {
        return fileTypeList.find(item => item.value === selectedType.value)?.isRecommend
    })
    const selectTypeViewText = computed(() => {
        return fileTypeList.find(item => item.value === selectedType.value)?.type
    })
    const fileTypeList = reactive<FileType[]>([
        {
            type: 'PNG',
            desc: t('pngDesc'),
            value: 'png',
            isRecommend: false
        },
        {
            type: 'JPG',
            desc: t('jpgDesc'),
            value: 'jpg',
            isRecommend: true
        }
    ])





    //压缩程度列表
    const compressLevelList = reactive<FileType[]>([
        {
            type: '100%',
            desc: '',
            value: '100',
            isRecommend: true
        },
        {
            type: '80%',
            desc: '',
            value: '80',
            isRecommend: false
        },
        {
            type: '50%',
            desc: '',
            value: '50',
            isRecommend: false
        },

    ])

    //显示压缩程度
    const isShowCompressLevel = ref<boolean>(false)
    const compressSelectedType = ref<string>('100')
    const compressIsRecommend = computed(() => {
        return compressLevelList.find(item => item.value === compressSelectedType.value)?.isRecommend
    })
    const compressSelectTypeViewText = computed(() => {
        return compressLevelList.find(item => item.value === compressSelectedType.value)?.type
    })

    //压缩程度选择
    const handleSelectCompressLevel = (type: string, event: Event) => {
        event.stopPropagation()
        compressSelectedType.value = type
        isShowCompressLevel.value = false
    }



    //显示文件类型
    const isShowFileType = ref<boolean>(false)
    const toggleFileType = (event: Event) => {
        event.stopPropagation()
        if (isShowFileType.value) {
            isShowFileType.value = false
        } else {
            isShowFileType.value = true
            isShowCompressLevel.value = false
        }
    }


    //压缩程度选择
    const toggleCompressLevel = (event: Event) => {
        event.stopPropagation()
        if (isShowCompressLevel.value) {
            isShowCompressLevel.value = false
        } else {
            isShowCompressLevel.value = true
            isShowFileType.value = false
        }
    }

    onMounted(() => {
        window.addEventListener('click', () => {
            isShowFileType.value = false
            isShowCompressLevel.value = false
        })
    })

    onUnmounted(() => {
        window.removeEventListener('click', () => {
            isShowFileType.value = false
            isShowCompressLevel.value = false
        })
    })


    //选择文件类型
    const handleSelectType = (type: string, event: Event) => {
        event.stopPropagation()
        selectedType.value = type
        // hoverFileType(false)
        isShowFileType.value = false
    }




    //下载文件
    const handleDownload = () => {
        visible.value = false
    }
</script>

<style lang="scss" scoped>
    .download_select {
        min-width: 270px;

        background: #FFFFFF;
        box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);
        border-radius: 16px 16px 16px 16px;
        box-sizing: border-box;
        padding: 12px 0px;
        padding-bottom: 8px;
        cursor: default;

        .title_box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0px 12px;
            height: 40px;
            box-sizing: border-box;
            box-shadow: inset 0px -1px 1px 0px #EEEEEE;

            span {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 14px;
                color: #333333;
            }

            img {
                width: 10px;
                height: 10px;
                cursor: pointer;
            }
        }

        .filter_box {
            margin-top: 16px;
            box-sizing: border-box;
            padding: 0 12px;

            .filter_title {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #999999;
                margin-bottom: 12px;
            }

            .filter_input {
                min-width: 246px;
                height: 36px;
                width: max-content;
                background: #F5F5F5;
                border-radius: 6px 6px 6px 6px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;

                box-sizing: border-box;
                padding: 0 12px;


                &:not(:last-of-type) {
                    margin-bottom: 10px;
                }

                .input_left {
                    display: flex;
                    align-items: center;
                    column-gap: 10px;

                    .selected_type_name {
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 400;
                        font-size: 12px;
                        color: #000000;
                    }

                    .recommend_tips {
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 400;
                        font-size: 10px;
                        color: #999999;
                    }
                }

                .downArrow {
                    width: 12px;
                    height: 12px;
                }

                .filter_items {
                    position: absolute;
                    top: 120%;
                    left: 0;
                    width: 100%;
                    background: #FFFFFF;
                    box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);
                    border-radius: 6px 6px 6px 6px;
                    box-sizing: border-box;
                    padding: 6px 0;

                    z-index: 2;

                    .filter_item {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        height: 56px;
                        box-sizing: border-box;
                        padding: 0 12px;
                        cursor: pointer;

                        .left_box {
                            display: flex;
                            flex-direction: column;
                            row-gap: 5px;

                            .type_name {
                                font-family: Source Han Sans SC, Source Han Sans SC;
                                font-weight: 400;
                                font-size: 12px;
                                color: #000000;
                            }

                            .type_desc {
                                font-family: Source Han Sans SC, Source Han Sans SC;
                                font-weight: 400;
                                font-size: 10px;
                                color: #999999;
                            }
                        }

                        .selected_icon {
                            width: 24px;
                            height: 24px;
                        }
                    }

                    .active {
                        background: #F5F5F5;
                    }

                }


            }

            .download_btn {
                height: 32px;
                background: #6B42F2;
                border-radius: 6px 6px 6px 6px;
                text-align: center;
                line-height: 32px;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 12px;
                color: #FFFFFF;
                cursor: pointer;
            }
        }

    }
</style>