<template>
    <div class="font_box">
        <div class="header_box">
            <div class="view_box">
                T
            </div>
            <div class="info_box">
                <p class="name">
                    {{ $t('text') }}
                </p>
                <ul class="action_box">

                    <el-tooltip v-for="item in actionList" :key="item.value" :content="item.toolTips">
                        <li :class="{ 'active': item.active }">
                            <i :class="item.icon"></i>
                        </li>
                    </el-tooltip>

                </ul>
            </div>
        </div>
        <div class="font_edit_box">

        </div>
    </div>
</template>

<script lang="ts" setup>
    const stores=useMainStore()
    

    const { t } = useI18n()
    const actionList = ref<any>([
        {
            icon: '',
            active: false,
            value: 'locked',
            toolTips: t('lock')
        },
        {
            icon: '',
            active: false,
            value: 'index',
            toolTips: t('layer')
        },
        {
            icon: '',
            active: false,
            value: 'copy',
            toolTips: t('copy')
        },
        {
            icon: '',
            active: false,
            value: 'delete',
            toolTips: t('delete')
        }
    ])

</script>

<style lang="scss" scoped>


    .font_box {
        .header_box {
            box-sizing: border-box;
            padding: 12px;
            display: flex;
            align-items: center;
            column-gap: 12px;
            box-shadow: inset 0px -1px 1px 0px #EEEEEE;

            .view_box {
                width: 52px;
                height: 52px;
                background: #F5F5F5;
                border-radius: 6px 6px 6px 6px;
                text-align: center;
                line-height: 52px;
                font-family: Georgia, 'Times New Roman', Times, serif;
                font-size: 32px;
            }

            .info_box {
                .name {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 500;
                    font-size: 14px;
                    color: #333333;
                    margin-bottom: 8px;
                }

                .action_box {
                    display: flex;
                    align-items: center;
                    column-gap: 6px;

                    li {
                        width: 24px;
                        height: 24px;
                        background: #F7F6FA;
                        border-radius: 5px 5px 5px 5px;
                    }
                }
            }
        }
    }






</style>
