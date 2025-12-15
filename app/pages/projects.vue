<template>
    <div class="projects_page">
        <homeHeaderCom class="header_position" :isShowHeaderSearch="true" />
        <div class="main_content">
            <navCom v-model:active-nav="activeNav" />
            <div class="content">
                <editSelectCom class="edit_select_postion"
                    :style="{ top: projectEditTop + 'px', left: projectEditLeft + 'px' }" v-show="isShowEditBox" />
                <component :is="components[activeNav]" />
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
    import navCom from '~/components/projects/navCom.vue';
    import mySpaceCom from '~/components/projects/mySpaceCom.vue';

    import recentlyOpenCom from '~/components/projects/recentlyOpenCom.vue';
    import draftBoxCom from '~/components/projects/draftBoxCom.vue';
    import recycleBinCom from '~/components/projects/recycleBinCom.vue';
    import editSelectCom from '~/components/projects/editSelectCom.vue';

    const stores = useMainStore()
    const { projectEditTop, projectEditLeft, isShowEditBox } = storeToRefs(stores)

    const activeNav = ref<string>('mySpaceCom')
    const components: any = {
        mySpaceCom: mySpaceCom,
        recentlyOpen: recentlyOpenCom,
        draftBox: draftBoxCom,
        recycleBin: recycleBinCom,
    }


    const hideEditBox = (e: any) => {
        if (e.target.classList.contains('edit_box')) {
            return
        }
        isShowEditBox.value = false
    }


    onMounted(() => {
        document.addEventListener('click', hideEditBox)
    })

    onUnmounted(() => {
        document.removeEventListener('click', hideEditBox)
    })
</script>

<style lang="scss" scoped>
    .projects_page {
        padding: 0 32px;
        box-sizing: border-box;
        background-color: #fff;
        position: relative;
        min-height: 100vh;
        display: flex;
        flex-direction: column;

        .header_position {
            position: sticky;
            top: 0;
            left: 0;
            z-index: 20;
        }

        .main_content {
            padding-top: 20px;
            display: flex;
            flex-direction: column;
            flex: 1;

            .content {
                margin-top: 16px;
                flex: 1;
                display: flex;
                flex-direction: column;
                position: relative;

                .edit_select_postion {
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 10;
                }
            }

        }
    }
</style>