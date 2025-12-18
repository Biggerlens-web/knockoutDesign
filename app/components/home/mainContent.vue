<template>
    <div class="main_box">
        <img class="homeTopBg" src="/img/homeTopBg.png" alt="">
        <homeHeaderCom class="header_position" :isShowHeaderSearch="isShowHeaderSearch" />
        <div ref="bigSearchComRef">
            <bigSearchCom />
        </div>
        <div class="tools_margin">
            <designTools />
        </div>
        <div class="tools_margin">
            <templates :templateList="TemplateCategory" :title="$t('templatesCenterTitle')" />
        </div>
        <div class="tools_margin">
            <calendarTemplate :templateList="TemplateCategory" />
        </div>
        <div class="tools_margin">
            <templates :templateList="TemplateCategory" :title="$t('ecommerce')" />
        </div>
        <nuxt-link to="/templates" class="more_btn">
            {{ $t('moreBtn') }}
            <img :src="moreBtnRightArrow" alt="">
        </nuxt-link>
    </div>
</template>

<script lang="ts" setup>
    import designTools from './mainContent/designTools.vue';
    import templates from './mainContent/templates.vue';
    import calendarTemplate from './mainContent/calendarTemplate.vue';
    import homeHeaderCom from './homeHeaderCom.vue'
    import bigSearchCom from './search/bigSearchCom.vue';
    import { useTemplateReq } from '../../request/templateReq'
    import moreBtnRightArrow from '/img/desginToolRArroww.png'
    const templateReq = useTemplateReq()
    const stores = useMainStore()
    const { templateTypes } = storeToRefs(stores)

    const TemplateCategory = ref<any[]>([])
    const getTemplate = async () => {
        try {

            const res = await templateReq.post('/templateUp/findClassJson?appName=knockout&region=domestic', {}, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            console.log('获取模板成功', res)
            TemplateCategory.value = res.data.data.TemplateCategory || []
            // console.log("🚀 ~ getTemplate ~ TemplateCategory:", TemplateCategory.value)
            templateTypes.value = TemplateCategory.value
        } catch (err) {
            console.log('获取模板失败', err)
        }
    }




    //显示顶部搜索
    const isShowHeaderSearch = ref<boolean>(false)
    const bigSearchComRef = ref<HTMLElement | null>(null)
    const { isInViewport } = useInViewport(bigSearchComRef)
    watch(isInViewport, (val) => {
        isShowHeaderSearch.value = !val
    })

    onMounted(() => {
        getTemplate()
    })
</script>

<style lang="scss" scoped>
    .main_box {
        box-sizing: border-box;
        padding: 32px;
        flex: 1;
        background: #ffffff;
        // max-width: calc(100% - 200px);
        border-radius: 24px 0 0 24px;
        padding-top: 0px;
        padding-bottom: 50px;
        position: relative;
        z-index: 0;


        .homeTopBg {
            position: absolute;
            left: 50%;

            transform: translateX(-50%);
            width: 823px;
            height: 320px;
            top: 0px;
            z-index: -1;
        }

        .header_position {
            position: sticky;
            top: 0;
            left: 0;
            z-index: 20;
        }

        .tools_margin {
            margin-bottom: 32px;
        }

        .more_btn {

            width: max-content;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #F7F6FA;
            box-sizing: border-box;
            padding: 0 24px;
            font-size: 12px;
            font-family: Source Han Sans SC, Source Han Sans SC;
            font-weight: 400;
            color: #000;
            border-radius: 10px;
            column-gap: 6px;
            margin: 0 auto;
            margin-top: 32px;
            cursor: pointer;

            img {
                width: 12px;
                height: 12px;
            }
        }
    }
</style>