<template>
    <div class="empty_com">
        <img src="/img/noProjects.png" alt="">
        <p>
            {{ $t('noProjects') }}
        </p>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
    .empty_com {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        row-gap: 16px;
        flex: 1;

        img {
            width: 120px;
            height: 120px;
        }

        p {
            font-family: Source Han Sans SC, Source Han Sans SC;
            font-weight: 400;
            font-size: 12px;
            color: #666666;
        }
    }
</style>