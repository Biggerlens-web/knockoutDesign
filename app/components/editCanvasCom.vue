<template>
    <div class="edit_canvas_com">
        <div class="file_select">

        </div>
    </div>
</template>

<script lang="ts" setup>
    interface editItem {
        icon: string
        value: string
    }

    const editItems: editItem[] = [
        {
            icon: '项目名称',
            value: '项目名称'
        },
        {
            icon: '项目描述',
            value: '项目描述'
        }
    ]

</script>

<style lang="scss" scoped>
    .edit_canvas_com {}
</style>