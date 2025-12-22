<template>


    <el-upload drag action="#" :show-file-list="false" accept="image/*" :auto-upload="false" :on-change="handleChange">
        <div class="upload_box">
            <div class="upload_content_box">
                <div class="upload_btn">
                    {{ $t('upload_btn_text') }}
                </div>
                <p class="download_tips">
                    {{ $t('upload_text') }}
                </p>
            </div>
        </div>

    </el-upload>

</template>

<script lang="ts" setup>

    const handleChange = (file: any) => {
        console.log(file)
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
        background: #F7F6FA;
        border-radius: 6px 6px 6px 6px;
        display: flex;
        align-items: center;
        justify-content: center;

        .upload_content_box {
            display: flex;
            flex-direction: column;
            row-gap: 20px;
            align-items: center;

            .upload_btn {
                cursor: pointer;
                height: 40px;
                background: #6B42F2;
                border-radius: 6px 6px 6px 6px;
                text-align: center;
                line-height: 40px;
                box-sizing: border-box;
                padding: 0 40px;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 14px;
                color: #FFFFFF;
            }

            .download_tips {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #999999;
            }

        }
    }
</style>