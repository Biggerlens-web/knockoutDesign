<template>
    <div class="layer_com_manager" v-show="showLayerCom">
        <div class="header_box">
            <div class="left">
                <p class="layer_title" v-if="activeLayerIndex === 0">
                    {{ $t('canvas') }}
                </p>
                <div class="back_box" v-else @click="backLayerFirstIndex">
                    <img class="back_icon" :src="backIcon" alt="">

                    <span>{{ $t('return') }}</span>
                </div>
            </div>
            <img class="close_icon" :src="closeIcon" alt="" @click="closeLayerCom">
        </div>
        <draggable tag="ul" v-model="layerList" item-key="id" class="layer_list" handle=".drag-handle" :animation="200">
            <li v-for="item in layerList" :key="item.id" class="layer_item" @click="selectLayer(item)">
                <div class="left">
                    <img class="drag-handle" src="" alt="">
                    <div class="layer_img">
                        <img src="" alt="">
                        <div class="child_num" v-if="item.child">
                            {{ item.child.length }}
                        </div>
                    </div>
                    <span class="layer_name">{{ item.name }}</span>
                </div>
                <img class="delete_icon" src="" alt="">
            </li>

        </draggable>
        <div class="main_layer_item">
            <div class="left">
                <img class="drag-handle" src="" alt="" style="opacity: 0;">
                <div class="layer_img">
                    <img src="" alt="">
                    <div class="child_num" v-if="mainLayer.child">
                        {{ mainLayer.child.length }}
                    </div>
                </div>
                <span class="layer_name">{{ mainLayer.name }}</span>
            </div>
            <img class="delete_icon" src="" alt="">
        </div>
    </div>
</template>

<script lang="ts" setup>
    import closeIcon from '/img/closeImg.png'
    import backIcon from '/img/backIcon.png'
    import { VueDraggableNext as draggable } from 'vue-draggable-next'
    const { t } = useI18n()
    const stores = useMainStore()
    const { showLayerCom } = storeToRefs(stores)


    const generateLayerId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substring(2, 10)
    }

    const originalLayerList = ref<any>([
        {
            id: generateLayerId(),
            name: t('combine'),
            type: 'group',
            img: '',
            child: [
                {
                    id: generateLayerId(),
                    name: 'layer1-1',
                    type: 'solo',
                    img: ''
                }
            ]
        },
        {
            id: generateLayerId(),
            name: t('graphic'),
            type: 'solo',
            img: ''
        },
        {
            id: generateLayerId(),
            name: t('font'),
            type: 'solo',
            img: ''
        }
    ])



    //关闭图层
    const closeLayerCom = () => {
        showLayerCom.value = false
    }


    const layerList = ref<any>()

    const mainLayer = ref<any>({
        id: generateLayerId(),
        name: t('mainImage'),
        type: 'solo',
        img: ''
    })





    //返回一层
    const backLayerFirstIndex = () => {
        layerList.value = originalLayerList.value
        activeLayerIndex.value = 0
    }
    //选择图层
    const activeLayerIndex = ref<number>(0)
    const selectLayer = (item: any) => {
        console.log('item', item);
        if (item.child && item.child.length > 0) {
            layerList.value = item.child
            activeLayerIndex.value = 1
        }
    }



    watch(showLayerCom, (newVal) => {
        if (newVal) {
            layerList.value = originalLayerList.value
        }
    }, {
        immediate: true
    })
</script>

<style lang="scss" scoped>
    .layer_com_manager {
        width: 200px;

        height: auto;
        background: #FFFFFF;
        box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);
        border-radius: 12px 12px 12px 12px;
        box-sizing: border-box;
        padding: 16px 12px;


        .header_box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 9px;

            .left {
                .layer_title {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 500;
                    font-size: 14px;
                    color: #333333;
                }

                .back_box {
                    display: flex;
                    align-items: center;
                    column-gap: 8px;
                    cursor: pointer;

                    .back_icon {
                        width: 20px;
                        height: 20px;
                    }

                    span {
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 500;
                        font-size: 14px;
                        color: #333333;
                    }

                }
            }

            .close_icon {
                width: 20px;
                height: 20px;
                cursor: pointer;
            }
        }

        .layer_list {
            display: flex;
            flex-direction: column;
            row-gap: 6px;
            margin-top: 9px;
        }

        .layer_item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 50px;
            background: #FAFAFA;
            border-radius: 12px 12px 12px 12px;
            box-sizing: border-box;
            padding-left: 6px;
            padding-right: 12px;
            cursor: pointer;



            .left {
                display: flex;
                align-items: center;

                .drag-handle {
                    width: 16px;
                    height: 16px;
                    margin-right: 2px;
                    cursor: move;
                }

                .layer_img {
                    width: 30px;
                    height: 30px;
                    background: #FFFFFF;
                    border-radius: 6px 6px 6px 6px;
                    border: 1px solid #EEEEEE;
                    box-sizing: border-box;
                    position: relative;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .child_num {
                        width: 16px;
                        height: 16px;
                        top: 0;
                        right: 0;
                        position: absolute;
                        border-radius: 0 6px 0 6px;
                        background: #E3DDFC;
                        text-align: center;
                        line-height: 16px;
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 500;
                        font-size: 10px;
                        color: #6B42F2;
                    }
                }

                .layer_name {
                    margin-left: 10px;
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 500;
                    font-size: 12px;
                    color: #666666;
                }

            }

            .delete_icon {
                width: 16px;
                height: 16px;

                cursor: pointer;
            }
        }

        .main_layer_item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 50px;
            background: #FAFAFA;
            border-radius: 12px 12px 12px 12px;
            box-sizing: border-box;
            padding-left: 6px;
            padding-right: 12px;



            .left {
                display: flex;
                align-items: center;

                .drag-handle {
                    width: 16px;
                    height: 16px;
                    margin-right: 2px;
                    cursor: default;
                }

                .layer_img {
                    width: 30px;
                    height: 30px;
                    background: #FFFFFF;
                    border-radius: 6px 6px 6px 6px;
                    border: 1px solid #EEEEEE;
                    box-sizing: border-box;
                    position: relative;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .child_num {
                        width: 16px;
                        height: 16px;
                        top: 0;
                        right: 0;
                        position: absolute;
                        border-radius: 0 6px 0 6px;
                        background: #E3DDFC;
                        text-align: center;
                        line-height: 16px;
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 500;
                        font-size: 10px;
                        color: #6B42F2;
                    }
                }

                .layer_name {
                    margin-left: 10px;
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 500;
                    font-size: 12px;
                    color: #666666;
                }

            }

            .delete_icon {
                width: 16px;
                height: 16px;

                cursor: default;
                opacity: 0;
            }
        }
    }
</style>
