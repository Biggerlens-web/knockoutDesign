<template>
    <div class="calendar_template">

        <div class="title_box">
            <div class="title">
                <img src="" alt="">
                <span class="title_name">热点日历</span>
            </div>
            <div class="more_text">
                更多
            </div>
        </div>
        <lunarView class="lunar_view" />
        <templateView />
    </div>
</template>

<script lang="ts" setup>
    import templateView from './templateView.vue';
    import lunarView from '~/components/lunarView.vue';
</script>

<style lang="scss" scoped>
    .calendar_template {
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

        .lunar_view {
            margin-bottom: 10px;
        }
    }
</style>