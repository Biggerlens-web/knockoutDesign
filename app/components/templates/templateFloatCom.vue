<template>
    <ul class="template_float_com">
        <li class="template_item" v-for="item in templateList" :key="item.id">
            <img :src="`${TEMPLATE_BASE_URL}/${item.coverurl}`" alt="">
        </li>
    </ul>
</template>

<script lang="ts" setup>
    import TEMPLATE_BASE_URL from '~/utils/templateBaseUrl'
    import { useTemplateReq } from '~/request/templateReq';
    const templateReq = useTemplateReq()



    const templateList = ref<any>([])
    const getTemplates = async () => {
        const res = await templateReq.post(`/templateUp/findTemplateJson?appName=knockout&region=domestic&fields=${encodeURIComponent('Pintu')}`, {}, {
            headers: {
                'Content-Type': 'text/plain'
            }
        })
        console.log('🚀 ~ getTemplates ~ res:', res)
        templateList.value = res.data.data.pintu
    }

    onMounted(() => {
        getTemplates()
    })
</script>

<style lang="scss" scoped>

    .template_float_com {
        column-count: 7;
        column-gap: 16px;


        .template_item {
            border-radius: 16px;
            margin-bottom: 16px;
            break-inside: avoid;

            img {
                width: 100%;
                height: auto;
                border-radius: 16px;
                display: block;
            }
        }
    }
</style>