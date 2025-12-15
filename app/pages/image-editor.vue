<template>
    <div class="image_cropping_page">

        <asideLeftBox />
        <main class="main_box">
            <uploadFile class="upload_file_box" v-if="!imageEditUploadFile" />
        </main>
        <asideRightBox />
    </div>
</template>

<script lang="ts" setup>
    import asideLeftBox from '../components/imageCropping/asideLeftBox.vue'
    import uploadFile from '../components/imageCropping/uploadFile.vue'
    import asideRightBox from '../components/imageCropping/asideRightBox.vue'

    const stores = useMainStore()
    const { imageEditUploadFile } = storeToRefs(stores)


    onMounted(() => {
        imageEditUploadFile.value = ''
        console.log('imageEditUploadFile.value', imageEditUploadFile.value);
    })

</script>

<style lang="scss" scoped>
    .image_cropping_page {
        height: calc(100vh - 70px);
        position: relative;
        display: flex;
        align-items: center;

        .main_box {
            flex: 1;
            height: 100%;
            position: relative;

            background-color: #f7f6fa;

            .upload_file_box {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }

</style>