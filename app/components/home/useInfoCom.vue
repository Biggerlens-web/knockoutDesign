<template>
    <div class="user_info_com">
        <div class="user_info_box">
            <div class="user_info_avatar">
                <img src="" alt="">
            </div>
            <div class="user_info_name">
                <p class="name">
                    {{ userInfo.userName }}
                </p>
                <p class="vip_tips">
                    {{ $t('noVipTips') }}
                </p>
            </div>
        </div>
        <div class="sub_content">

            <div class="sub_desc">
                {{ $t('subDesc') }}
            </div>
            <div class="sub_now">
                {{ $t('subNow') }}
            </div>
        </div>
        <div class="setting_box">
            <div class="setting_item">
                {{ $t('accountSetting') }}
            </div>
            <div class="setting_item" @click="logout">
                {{ $t('logout') }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const stores = useMainStore()
    const { userInfo } = storeToRefs(stores)


    const logout = () => {
        const token = useCookie('knockout_design_room_token')
        token.value = ''
        window.location.reload()
    }
</script>

<style lang="scss" scoped>

    .user_info_com {
        min-width: 220px;
        padding: 16px;
        background: #FFFFFF;
        box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);
        border-radius: 12px 12px 12px 12px;

        .user_info_box {
            display: flex;
            align-items: center;
            column-gap: 12px;
            margin-bottom: 16px;

            .user_info_avatar {
                width: 40px;
                height: 40px;

                img {
                    width: 100%;
                    height: 100%;

                }
            }

            .user_info_name {


                .name {
                    font-family: PingFang SC, PingFang SC;
                    font-weight: 600;
                    font-size: 12px;
                    color: #333333;
                    line-height: 18px;
                    margin-bottom: 2px;
                }

                .vip_tips {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 10px;
                    color: #999999;
                }
            }
        }

        .sub_content {
            width: 100%;
            background: url('/img/userInfoBg.png') no-repeat;
            background-size: 100% 100%;
            box-sizing: border-box;
            padding: 12px 20px;
            margin-bottom: 24px;

            .sub_desc {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 10px;
                color: #333333;
                line-height: 15px;
                text-align: center;
                margin-bottom: 14px;
            }

            .sub_now {

                width: 100%;
                height: 28px;
                line-height: 28px;
                text-align: center;
                box-sizing: border-box;
                background: linear-gradient(90deg, #FFE9B7 0%, #FFD486 100%);
                border-radius: 6px 6px 6px 6px;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 10px;
                color: #3D2404;
                cursor: pointer;
            }


        }

        .setting_box {
            display: flex;
            flex-direction: column;
            row-gap: 20px;

            .setting_item {
                font-family: PingFang SC, PingFang SC;
                font-weight: 600;
                font-size: 14px;
                color: #333333;
                cursor: pointer;
            }
        }
    }
</style>