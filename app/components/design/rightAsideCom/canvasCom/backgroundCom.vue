<template>
    <div class="edit_background_img_box">
        <div class="add_box" v-if="!uploadImgRes">
            <div class="upload_btn" @click="handleUploadClick">
                {{ $t('upload_btn_text') }}

            </div>
            <div class="select_btn" @click="showImageLibrary = true">
                {{ $t('selectFromLibrary') }}
            </div>
        </div>
        <div class="upload_img_viewbox" v-else @mouseenter="showHoverBox" @mouseleave="hideHoverBox">
            <img class="upload_img" :src="uploadImgRes" alt="">
            <div class="hover_box" v-show="isHoverBoxVisible">
                <div class="replace_bg_btn" @click="handleReplaceClick">
                    {{ $t('replaceBackground') }}
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>

    const stores = useMainStore()
    const { showImageLibrary } = storeToRefs(stores)

    //上传图片
    const uploadImgRes = ref<string>('')
    const handleUploadClick = () => {
        console.log('上传点击事件')
        // 处理上传逻辑
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.click();
        input.addEventListener('change', (e) => {

            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                // 处理上传的文件
                console.log('上传的文件:', file);

                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    if (reader.result) {
                        // 处理上传的文件数据
                        // console.log('上传的文件数据:', reader.result);
                        uploadImgRes.value = reader.result as string
                    }
                };
            }
        });



    }


    // 显示hover_box
    const isHoverBoxVisible = ref<boolean>(false);
    const showHoverBox = () => {
        isHoverBoxVisible.value = true;
    }

    // 隐藏hover_box
    const hideHoverBox = () => {
        isHoverBoxVisible.value = false;
    }


    // 替换背景图片
    const handleReplaceClick = () => {
        console.log('替换背景图片点击事件')
        // 处理替换背景图片逻辑
        if (uploadImgRes.value) {
            handleUploadClick()

        }
    }



</script>

<style lang="scss" scoped>
    .edit_background_img_box {
        margin-top: 16px;
        width: 196px;
        height: 190px;
        background: #F7F6FA;
        border-radius: 6px 6px 6px 6px;
        display: flex;
        align-items: center;
        justify-content: center;

        .add_box {
            display: flex;
            flex-direction: column;
            row-gap: 12px;
            align-items: center;

            .upload_btn {
                min-width: 116px;
                max-width: 196px;
                width: max-content;
                height: 32px;
                background: #6B42F2;
                border-radius: 6px 6px 6px 6px;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 12px;
                color: #FFFFFF;
                text-align: center;
                line-height: 32px;
                cursor: pointer;
            }

            .select_btn {
                min-width: 116px;
                max-width: 196px;
                width: max-content;
                height: 32px;
                background: #FFFFFF;
                border-radius: 6px 6px 6px 6px;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #666666;
                text-align: center;
                line-height: 32px;
                cursor: pointer;
            }
        }

        .upload_img_viewbox {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 6px 6px 6px 6px;

            .hover_box {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 6px 6px 6px 6px;
                background: rgba(0, 0, 0, 0.5);
                z-index: 2;

                .replace_bg_btn {
                    min-width: 116px;
                    max-width: 196px;
                    width: max-content;
                    height: 32px;
                    background: #6B42F2;
                    border-radius: 6px 6px 6px 6px;
                    text-align: center;
                    line-height: 32px;
                    cursor: pointer;
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 500;
                    font-size: 12px;
                    color: #FFFFFF;
                }
            }

            .upload_img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: block;
            }
        }

    }
</style>
