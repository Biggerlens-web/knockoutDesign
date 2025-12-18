<template>
    <ul class="projects_list_com">
        <li class="project_item" v-for="item in projects" :key="item.value">

            <div class="view_box" @mouseenter="showEditBox(item)" @mouseleave="hideEditBox(item)">

                <div class="hover_mask" v-show="item.showEditBox">

                </div>
                <div class="edit_box" v-show="item.showEditBox" @click="editProject($event, item)">

                </div>
                <img src="/img/noProjects.png" alt="">
            </div>

            <p>
                {{ item.title }}
            </p>
        </li>
    </ul>
</template>

<script lang="ts" setup>
    const stores = useMainStore()
    const { projectEditTop, projectEditLeft, isShowEditBox } = storeToRefs(stores)
    const projects = ref<any>([
        {
            title: '项目1',
            value: 'project1',
            i18nkey: 'project1',
        },
        {
            title: '项目2',
            value: 'project2',
            i18nkey: 'project2',
        },
        {
            title: '项目3',
            value: 'project3',
            i18nkey: 'project3',
        }
    ])


    const showEditBox = (item: any) => {
        item.showEditBox = true
    }

    const hideEditBox = (item: any) => {
        item.showEditBox = false
    }

    const editProject = (e: any, item: any) => {


        e.stopPropagation()
        const target = e.target as HTMLElement

        // 计算项目编辑框距离顶部距离
        const Top = e.target.parentElement.parentElement.offsetTop + target.offsetTop
        // 计算项目编辑框距离左侧距离
        const Left = e.target.parentElement.parentElement.offsetLeft + target.offsetLeft

        // 赋值项目编辑框距离顶部距离
        projectEditTop.value = Top
        // 赋值项目编辑框距离左侧距离
        projectEditLeft.value = Left
        // 赋值是否显示项目编辑框
        isShowEditBox.value = true



    }
</script>

<style lang="scss" scoped>
    .projects_list_com {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 24px;

        .project_item {

            .view_box {
                height: 216px;
                background: #F7F6FA;
                border-radius: 16px 16px 16px 16px;
                cursor: pointer;
                box-sizing: border-box;
                padding: 8px;
                position: relative;
                display: flex;

                align-items: center;
                justify-content: center;


                img {
                    height: 200px;
                    width: auto;
                }

                .edit_box {
                    position: absolute;
                    width: 32px;
                    height: 32px;
                    background: rgba(255, 255, 255, 0.8);
                    box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);
                    border-radius: 10px 10px 10px 10px;
                    bottom: 10px;
                    right: 10px;
                    z-index: 3;
                }

                .hover_mask {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 16px 16px 16px 16px;
                    background: rgba(0, 0, 0, 0.2);
                    z-index: 2;
                }
            }

            p {
                margin-top: 10px;
                text-align: center;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #666666;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

        }
    }
</style>