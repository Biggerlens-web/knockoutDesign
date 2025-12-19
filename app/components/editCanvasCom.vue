<template>
    <div class="edit_canvas_com">
        <div class="file_select" @click="showFileSelect($event)">
            <span class="file_select_text">
                {{ $t('fileSelect') }}
            </span>
            <img class="file_select_arrow" src="/img/downArrow.png" alt="">
            <downloadSelect class="download_select_position" v-model:visible="visibleFileSelect"></downloadSelect>
        </div>
        <div class="save_file_btn">
            {{ $t('save') }}
        </div>
        <div class="edit_items">
            <div v-for="item in editItems" :key="item.value" class="edit_item">
                <img src="" alt="">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import downloadSelect from './design/downloadSelect.vue'
    interface editItem {
        icon: string
        value: string
    }

    const editItems: editItem[] = [
        {
            icon: '',
            value: 'pre'
        },
        {
            icon: '',
            value: 'next'
        },
        {
            icon: '',
            value: 'refresh'
        }
    ]



    //显示文件选择框
    const visibleFileSelect = ref(false)

    //显示文件选择框
    const showFileSelect = (e: any) => {
        const classList = e.target.classList
        if (classList.contains('file_select') || classList.contains('file_select_text') || classList.contains('file_select_arrow')) {
            visibleFileSelect.value = true
        }
    }
</script>

<style lang="scss" scoped>
    .edit_canvas_com {
        padding-left: 32px;
        display: flex;
        align-items: center;

        .file_select {
            display: flex;
            align-items: center;
            column-gap: 8px;
            cursor: pointer;
            position: relative;

            .file_select_text {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 14px;
                color: #333333;
            }

            .file_select_arrow {
                width: 12px;
                height: 12px;
            }

            .download_select_position {
                position: absolute;
                top: 175%;
                left: -30px;
            }
        }

        .save_file_btn {
            margin-left: 40px;
            font-family: Source Han Sans SC, Source Han Sans SC;
            font-weight: 500;
            font-size: 14px;
            color: #333333;
            cursor: pointer;
        }

        .edit_items {
            margin-left: 50px;
            display: flex;
            align-items: center;
            column-gap: 24px;

            .edit_item {
                width: 24px;
                height: 24px;
                background-color: aqua;
                cursor: pointer;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>