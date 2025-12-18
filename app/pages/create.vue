<template>
    <div class="design_page">
        <AsideLeftBox />
        <MainDesign class="design_component" />
        <AsideRightBox />
    </div>
</template>

<script lang="ts" setup>
    import AsideLeftBox from '../components/design/asideLeftBox.vue'
    import AsideRightBox from '../components/design/asideRightBox.vue'
    import MainDesign from '../components/design/mainDesign.vue'

    import { useTemplateReq } from '~/request/templateReq';
    const templateReq = useTemplateReq()
    const stores = useMainStore()
    const { fontList } = storeToRefs(stores)

    const route = useRoute()
    //获取模板素材
    const getTemplateMaterial = async () => {
        try {

            const fields: string = route.query.fields as string
            if (!fields) return
            const res = await templateReq.post(`/templateUp/findTemplateJson?appName=knockout&os=ios&region=domestic&fields=${fields}`)
            console.log('获取素材', res);
        } catch (err) {
            console.log('获取模板素材失败', err)
        }
    }



    //获取字体列表
    const getFontList = async () => {
        try {
            const res = await templateReq.post(`/font/findFontJson?appName=knockout&region=domestic&fontLanguage=zh`)
            console.log('获取字体列表', res);
            fontList.value = res.data?.data || []
        } catch (err) {
            console.log('获取字体列表失败', err)
        }
    }

    onMounted(async () => {
        await getFontList()
        await getTemplateMaterial()

    })
</script>

<style lang="scss" scoped>
    .design_page {
        height: calc(100vh - 70px);
        position: relative;
        display: flex;
        align-items: center;

        .design_component {
            flex-grow: 1;
        }
    }

</style>