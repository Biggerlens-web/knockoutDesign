<template>
    <div class="templates_box">
        <div class="title_box">
            <div class="title">
                <img src="" alt="">
                <span class="title_name">畅想中心</span>
            </div>
            <div class="more_text">
                更多
            </div>
        </div>
        <ul class="template_list">
            <li v-for="item in templateList" :key="item.id" class="template_item">
                {{ item.title }}
            </li>
        </ul>
        <templateView />
    </div>
</template>

<script lang="ts" setup>
    import templateView from './templateView.vue';
    interface TemplateItem {
        title: string
        id: string
    }
    const templateList = reactive<TemplateItem[]>([
        {
            title: '模板1',
            id: 'template1',

        },
        {
            title: '模板2',
            id: 'template2',

        },
        {
            title: '模板3',
            id: 'template3',
        },
    ])
</script>

<style lang="scss" scoped>

    .templates_box {
        margin-bottom: 20px;

        .title_box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;

            .title {
                display: flex;
                column-gap: 10px;

                img {
                    width: 20px;
                    height: 20px;
                }

                .title_name {
                    font-size: 16px;
                    font-weight: 600;
                    color: #000;
                }
            }

            .more_text {
                font-size: 16px;
                font-weight: 600;
                color: #000;
                cursor: pointer;
            }
        }

        .template_list {
            display: flex;
            flex-wrap: wrap;
            column-gap: 20px;
            row-gap: 20px;

            .template_item {
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                font-weight: 600;
                color: #000;
                cursor: pointer;
            }
        }
    }
</style>