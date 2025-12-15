<template>
    <div class="unlogin_tips_com">
        <div class="top_box">
            <img class="user_avatar" src="/img/userIcon.png" alt="">
            <span>
                {{ $t('mobile_loginBtn') }}
            </span>
        </div>
        <div class="bottom_box">
            <img src="/img/loginTipsBg.png" alt="">
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
    .unlogin_tips_com {
        min-width: 220px;
        height: 160px;
        background: #FFFFFF;
        box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
        border-radius: 12px 12px 12px 12px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        cursor: pointer;

        .top_box {
            display: flex;
            align-items: center;
            padding: 20px 16px;
            padding-bottom: 0;
            column-gap: 16px;

            .user_avatar {
                width: 40px;
                height: 40px;
            }

            span {
                font-family: PingFang SC, PingFang SC;
                font-weight: 600;
                font-size: 14px;
                color: #333333;
            }
        }

        .bottom_box {
            flex: 1;

            width: 100%;


            img {
                width: 100%;
                height: 100%;
            }
        }

    }
</style>