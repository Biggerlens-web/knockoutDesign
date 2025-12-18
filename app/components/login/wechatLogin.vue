<template>
    <div class="wechat_login_box">
        <div class="qrCode_view_box">
            <div class="uncheck_mask" v-show="!isCheck">
                <img class="mask_img" :src="wechatmaskBg" alt="">
                <p>
                    请先同意并勾选 许可协议和隐私政策
                </p>
            </div>
            <img class="qrcode_img" src="" alt="">
        </div>
        <div class="refresh_btn">
            <span>扫码登录遇到问题？</span>
            <span class="refresh_btn_text">
                点击刷新
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import wechatmaskBg from '/img/wechatMask.png'

    interface WechatLoginProps {
        isCheck: boolean
    }
    const props = defineProps<WechatLoginProps>()


</script>

<style lang="scss" scoped>
    .wechat_login_box {
        display: flex;
        flex-direction: column;
        align-items: center;

        .qrCode_view_box {
            width: 164px;
            height: 164px;
            background: #FFFFFF;
            border-radius: 17px 17px 17px 17px;
            border: 1px solid #EEEEEE;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            .uncheck_mask {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                border-radius: 17px 17px 17px 17px;

                img {
                    width: 100%;
                    height: 100%;
                }

                p {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 108px;
                    font-family: PingFang SC, PingFang SC;
                    font-weight: 500;
                    font-size: 12px;
                    color: #333333;
                    text-align: center;
                }
            }

            .qrcode_img {
                width: 131px;
                height: 131px;
            }
        }

        .refresh_btn {
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: 14px;
            color: #666666;
            margin-bottom: 32px;

            .refresh_btn_text {
                cursor: pointer;
                color: #6B42F2
            }
        }
    }
</style>