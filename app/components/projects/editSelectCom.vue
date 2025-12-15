<template>
    <ul class="edit_select_com">
        <li class="edit_select_com_item" v-for="item in editList" :key="item.value">
            <img src="" alt="">
            <span :class="{ 'delete': item.value === 'delete' }">{{ item.name }}</span>
        </li>
    </ul>
</template>

<script lang="ts" setup>
    const editList = reactive([
        {
            name: '重命名',
            value: 'edit',
            icon: 'edit'
        },
        {
            name: '删除',
            value: 'delete',
            icon: 'delete'
        }
    ])

</script>

<style lang="scss" scoped>
    .edit_select_com {
        width: max-content;
        min-width: 120px;
        padding: 10px 0;
        border-radius: 10px 10px 10px 10px;
        background: #FFFFFF;
        box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);

        .edit_select_com_item {
            padding: 0 16px;
            height: 32px;
            display: flex;
            align-items: center;
            column-gap: 12px;
            cursor: pointer;

            img {
                width: 20px;
                height: 20px;
            }

            span {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 14px;
                color: #666666;
            }

            .delete {
                color: #EC1C1C;
            }
        }
    }
</style>