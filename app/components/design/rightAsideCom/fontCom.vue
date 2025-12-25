<template>
    <div class="font_box">
        <div class="header_box">
            <div class="view_box">
                T
            </div>
            <div class="info_box">
                <p class="name">
                    {{ $t('text') }}
                </p>
                <ul class="action_box">

                    <el-tooltip v-for="item in actionList" :key="item.value" :content="item.toolTips">
                        <li :class="{ 'active': item.active }">
                            <i :class="item.icon"></i>
                        </li>
                    </el-tooltip>

                </ul>
            </div>
        </div>
        <div class="font_edit_box">
            <div class="font_edit_item">
                <p class="font_edit_item_title">
                    {{ $t('fontFamliy') }}
                </p>

                <el-select style="width: 158px;" v-model="fontFamliy" placeholder="请选择字体">
                    <el-option v-for="item in fontList" :key="item.url" :label="item.name"
                        :value="item.fontUrl"></el-option>
                </el-select>

            </div>
            <div class="font_edit_item">
                <p class="font_edit_item_title">
                    {{ $t('fontSize') }}
                </p>

                <div class="font_size_box">
                    <div class="font_size_input_box">
                        <img class="font_size_up" :src="fontSizeUp" alt="" @click="fontSizeUpClick">
                        <img class="font_size_down" :src="fontSizeDown" alt="" @click="fontSizeDownClick">
                        <input class="font_size_input" type="number" v-model="fontSize" placeholder="请输入字号">
                    </div>

                    <p class="font_color">
                        <span class="color_bar" :style="{ background: fontColor }">

                        </span>
                    </p>
                </div>

            </div>
            <div class="font_edit_item">
                <p class="font_edit_item_title">
                    {{ $t('fontStyle') }}
                </p>
                <ul class="fontStyleList">
                    <li v-for="item in fontStyleList" :key="item.value" :class="{ 'active': item.active }">
                        <img :src="item.active ? item.activeIcon : item.icon" alt=""></img>
                    </li>
                </ul>



            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import fontSizeUp from '/img/fontsizeUp.png'
    import fontSizeDown from '/img/fontsizeDown.png'
    import strongIcon from '/img/strongIcon.png'
    import italicIcon from '/img/illIcon.png'
    import underlineIcon from '/img/underlineIcon.png'
    import strikethroughIcon from '/img/throngLineIcon.png'
    import strongIconActive from '/img/strongIcon_active.png'
    import italicIconActive from '/img/illIcon_active.png'
    import underlineIconActive from '/img/underlineIcon_active.png'
    import strikethroughIconActive from '/img/throngLineIcon_active.png'

    const stores = useMainStore()
    const { fontList } = storeToRefs(stores)



    const { t } = useI18n()
    const actionList = ref<any>([
        {
            icon: '',
            active: false,
            value: 'locked',
            toolTips: t('lock')
        },
        {
            icon: '',
            active: false,
            value: 'index',
            toolTips: t('layer')
        },
        {
            icon: '',
            active: false,
            value: 'copy',
            toolTips: t('copy')
        },
        {
            icon: '',
            active: false,
            value: 'delete',
            toolTips: t('delete')
        }
    ])


    //字号增加
    const fontSizeUpClick = () => {
        fontSize.value += 1
    }

    //字号减少
    const fontSizeDownClick = () => {
        fontSize.value -= 1
    }




    //字体样式
    const activeFontStyle = ref<string[]>([])
    const fontStyleList = ref<any>([
        {
            icon: strongIcon,
            activeIcon: strongIconActive,
            value: 'strong',

        },
        {
            icon: italicIcon,
            activeIcon: italicIconActive,
            value: 'italic',

        },
        {
            icon: underlineIcon,
            activeIcon: underlineIconActive,
            value: 'underline',

        },
        {
            icon: strikethroughIcon,
            activeIcon: strikethroughIconActive,
            value: 'strikethrough',
        }
    ])

    //选择的字体
    const fontFamliy = ref<string>('')
    //选择的字号
    const fontSize = ref<number>(12)
    //选择的字体颜色
    const fontColor = ref<string>('#000000')
</script>

<style lang="scss" scoped>

    :deep(.el-select__wrapper) {
        background: #F5F5F5;
        border-radius: 6px 6px 6px 6px;
        padding: 0 12px;
        font-family: Source Han Sans SC, Source Han Sans SC;
        font-weight: 500;
        font-size: 12px;
        color: #333333;
        border: none;
        box-shadow: none
    }

    .font_box {
        .header_box {
            box-sizing: border-box;
            padding: 12px;
            display: flex;
            align-items: center;
            column-gap: 12px;
            box-shadow: inset 0px -1px 1px 0px #EEEEEE;

            .view_box {
                width: 52px;
                height: 52px;
                background: #F5F5F5;
                border-radius: 6px 6px 6px 6px;
                text-align: center;
                line-height: 52px;
                font-family: Georgia, 'Times New Roman', Times, serif;
                font-size: 32px;
            }

            .info_box {
                .name {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 500;
                    font-size: 14px;
                    color: #333333;
                    margin-bottom: 8px;
                }

                .action_box {
                    display: flex;
                    align-items: center;
                    column-gap: 6px;

                    li {
                        width: 24px;
                        height: 24px;
                        background: #F7F6FA;
                        border-radius: 5px 5px 5px 5px;
                    }
                }
            }
        }

        .font_edit_box {
            box-sizing: border-box;
            padding: 16px 12px;

            display: flex;
            flex-direction: column;
            row-gap: 16px;

            .font_edit_item {
                display: flex;
                align-items: center;
                column-gap: 10px;

                .font_edit_item_title {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 500;
                    font-size: 14px;
                    color: #666666;
                }

                .font_size_box {
                    display: flex;
                    align-items: center;
                    column-gap: 6px;

                    .font_size_input_box {
                        display: flex;
                        align-items: center;
                        width: 76px;
                        height: 36px;
                        background: #F5F5F5;
                        border-radius: 6px 6px 6px 6px;
                        position: relative;

                        .font_size_up {
                            position: absolute;
                            top: 5px;
                            right: 12px;
                            width: 12px;
                            height: 12px;
                            cursor: pointer;
                        }

                        .font_size_down {
                            position: absolute;
                            bottom: 5px;
                            right: 12px;
                            width: 12px;
                            height: 12px;
                            cursor: pointer;

                        }

                        .font_size_input {
                            width: 76px;
                            height: 36px;
                            box-sizing: border-box;
                            padding-left: 12px;
                            padding-right: 20px;
                            border: none;
                            outline: none;
                            background-color: transparent;

                            &::-webkit-inner-spin-button {
                                -webkit-appearance: none;
                            }

                        }



                    }

                    .font_color {
                        width: 76px;
                        height: 36px;
                        background: #F5F5F5;
                        border-radius: 6px 6px 6px 6px;
                        box-sizing: border-box;
                        padding: 4px;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        .color_bar {
                            display: inline-block;
                            width: 100%;
                            height: 100%;

                            border-radius: 4px 4px 4px 4px;
                        }
                    }

                }

                .fontStyleList {
                    width: 158px;
                    height: 36px;
                    background: #F5F5F5;
                    border-radius: 6px 6px 6px 6px;
                }
            }
        }
    }






</style>
