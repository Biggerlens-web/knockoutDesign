<template>
    <el-upload drag action="#" :show-file-list="false" accept="image/*" :auto-upload="false" :on-change="handleChange">
        <div class="upload_box">
            <div class="upload_btn">
                <img src="" alt="">
                <span>
                    {{ $t('upload_btn_text') }}
                </span>
            </div>
            <p class="upload_text">
                {{ $t('upload_text') }}
            </p>
        </div>
    </el-upload>

</template>

<script lang="ts" setup>
    import fileToBase64 from '@/utils/fileToBase64'
    const stores = useMainStore()
    const { imageEditUploadFile } = storeToRefs(stores)






    const handleChange = async (file: any) => {
        console.log('file', file);
        try {
            const base64 = await fileToBase64(file.raw)
            imageEditUploadFile.value = base64
            console.log('base64', base64);
        } catch (error) {
            console.error('File to Base64 conversion failed', error)
        }
    }

</script>

<style lang="scss" scoped>

    :deep(.el-upload-dragger) {
        padding: 0;
        border: none;
    }

    .upload_box {
        width: 776px;
        height: 378px;
        background: #FFFFFF;
        border-radius: 36px 36px 36px 36px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        row-gap: 20px;

        .upload_btn {
            display: flex;
            align-items: center;
            height: 46px;
            background: #6B42F2;
            border-radius: 8px 8px 8px 8px;
            padding: 0 27px;
            column-gap: 10px;
            cursor: pointer;

            img {
                width: 24px;
                height: 24px;
            }

            span {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 18px;
                color: #FFFFFF;
            }
        }

        .upload_text {
            font-family: Source Han Sans SC, Source Han Sans SC;
            font-weight: 400;
            font-size: 14px;
            color: #999999;
        }
    }
</style>