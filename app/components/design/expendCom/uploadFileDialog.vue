<template>
    <el-dialog v-model="visible" :show-close="false" width="0" style="padding: 0;">
        <div class="uploadFile_box">
            <div class="uploadFile_title">
                <span>
                    {{ $t('upload_btn_text') }}
                </span>

                <img class="close_btn" @click="isShowUploadFileDialog = false" :src="`${getCdnBaseUrl()}/close.png`"
                    alt="close">

            </div>
            <el-upload class="avatar-uploader" action="" :show-file-list="false" drag accept="image/*"
                :on-change="handleImageChange">
                <div class="uploadFile_content">
                    <div class="uploadFile_btn">
                        {{ $t('upload_btn_text') }}
                    </div>
                    <p class="uplaod_tips">
                        {{ $t('upload_text') }}
                    </p>
                </div>
            </el-upload>

        </div>
    </el-dialog>
</template>

<script lang="ts" setup>


    const stores = useMainStore()
    const { isShowUploadFileDialog } = storeToRefs(stores)
    const visible = defineModel('visible', {
        type: Boolean,
        default: false
    })



    const handleImageChange = (file: any) => {
        console.log(file)
    }

</script>

<style lang="scss" scoped>


    .uploadFile_box {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 840px;
        height: 500px;
        background: #FFFFFF;
        border-radius: 16px 16px 16px 16px;
        box-sizing: border-box;
        padding: 32px;

        .uploadFile_title {
            display: flex;
            align-items: center;
            justify-content: space-between;

            span {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 18px;
                color: #333333;
            }

            .close_btn {
                width: 13px;
                height: 13px;
                cursor: pointer;
            }
        }

        :deep(.el-upload-dragger) {
            padding: 0;
            border: none;
        }

        .uploadFile_content {
            margin-top: 32px;
            width: 776px;
            height: 378px;
            background: #F7F6FA;
            border-radius: 6px 6px 6px 6px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            row-gap: 20px;

            .uploadFile_btn {
                width: max-content;
                box-sizing: border-box;
                min-width: 136px;
                height: 40px;
                background: #6B42F2;
                border-radius: 6px 6px 6px 6px;
                line-height: 40px;
                padding: 0 40px;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 14px;
                color: #FFFFFF;
                cursor: pointer;
            }

            .uplaod_tips {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #999999;
            }
        }
    }
</style>