<template>
    <div class="templates_box" v-loading="isLoadingTem">
        <div class="title_box">
            <div class="title">
                <span class="title_name">
                    {{ title }}
                </span>
            </div>
            <NuxtLink to="/templates" class="more_link">
                <div class="more_text">
                    {{ $t('moreText') }}
                </div>
            </NuxtLink>

        </div>
        <ul class="template_list">
            <li v-for="item in templateList" :key="item.index" class="template_item"
                @click="selectTemplateType(item.en)" :class="{ 'active': activeItem === item.en }">
                {{ isEN ? item.en : item.ch }}
            </li>
        </ul>
        <templateView :templates="templates" @imagesLoaded="isLoadingTem = false" />
    </div>
</template>

<script lang="ts" setup>
    import templateView from './templateView.vue';
    import { useTemplateReq } from '~/request/templateReq';


    const isLoadingTem = ref<boolean>(true)

    const templateReq = useTemplateReq();
    interface Props {
        templateList: any[]
        title: string
    }


    const siteTarget = useRuntimeConfig().public.siteTarget
    const isEN = computed(() => {
        return siteTarget === 'EN'
    })
    const props = defineProps<Props>()


    //选择模板类型
    const templates = ref<any[]>([])
    const activeItem = ref<string>('')
    const getTemplateType = async (type: string) => {
        try {


            if (isLoadingTem.value) return
            isLoadingTem.value = true
            const res = await templateReq.post(`/templateUp/findTemplateJson?appName=knockout&region=domestic&fields=${encodeURIComponent(type)}`, {}, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            console.log('获取模板成功', res);
            let data = res.data
            if (typeof data === 'string') {
                data = JSON.parse(data)
            }
            const lowerType = type.toLowerCase()
            templates.value = data.data?.[lowerType] || []
            // console.log("🚀 ~ getTemplateType ~ templates:", templates.value)

        } catch (err) {
            console.log('获取模板失败', err);
            isLoadingTem.value = false // Error case: stop loading immediately
        }
        // Finally block removed: we wait for image load event instead
    }
    const selectTemplateType = (type: string) => {
        console.log("🚀 ~ selectTemplateType ~ type:", type)
        activeItem.value = type
        getTemplateType(activeItem.value)
    }

    watch(() => props.templateList, (newVal) => {
        if (newVal) {
            console.log('更新模板');
            isLoadingTem.value = false // Removed as it should be controlled by image loading
            activeItem.value = newVal[0].en
            selectTemplateType(activeItem.value)
        }
    })

</script>

<style lang="scss" scoped>

    .templates_box {

        width: 100%;

        .title_box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;

            .title {
                display: flex;
                align-items: center;

                .title_name {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: bold;
                    font-size: 18px;
                    color: #333333;
                }
            }

            .more_text {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 12px;
                color: #6B42F2;
                cursor: pointer;
            }
        }

        .template_list {
            display: flex;
            flex-wrap: wrap;
            column-gap: 16px;
            row-gap: 16px;

            width: 100%;
            margin-bottom: 16px;

            .template_item {
                flex-shrink: 0;
                width: max-content;
                padding: 0 16px;
                height: 30px;
                line-height: 30px;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #666666;
                background: #F7F6FA;
                border-radius: 10px 10px 10px 10px;
                cursor: pointer;
            }

            .active {
                color: #FFFFFF;
                background: #6B42F2;
            }
        }
    }
</style>