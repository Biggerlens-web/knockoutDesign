<template>
    <div class="text_material_edit_com">
        <div class="font_view">
            <div class="view_box">

            </div>
            <div class="right_box">
                <p class="font_name">
                    {{ $t('font') }}
                </p>
                <ul class="font_edit_list">
                    <li class="font_edit_item">

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>


    const fontEditList = reactive<any>([
        {
            icon: '',
            value: 'lock'
        },
        {
            icon: '',
            value: 'index'
        },
        {
            icon: '',
            value: 'copy'
        },
        {
            icon: '',
            value: 'delete'
        }
    ])

</script>

<style lang="scss" scoped></style>