<template>
    <div class="unlogin_tips_com">
        <div class="top_box">
            <img class="user_avatar" src="/img/userIcon.png" alt="">
            <span>
                {{ $t('mobile_loginBtn') }}
            </span>
        </div>
        <div class="bottom_box">
            <div class="setting_item" @mouseenter="showLanguageSetting" @mouseleave="hideLanguageSetting">
                <span>
                    {{ $t('languageSetting') }}
                </span>
                <img :src="settingRightArrow" alt="">
                <languageSelect v-show="isShowLanguageSelect" class="language_select_position" />
            </div>
            <img src="/img/loginTipsBg.png" alt="">
        </div>
    </div>
</template>

<script lang="ts" setup>
    import settingRightArrow from '/img/lunarRArrow.png'
    import languageSelect from '../language/languageSelect.vue'

    const isShowLanguageSelect = ref<boolean>(false)

    const showLanguageSetting = () => {
        isShowLanguageSelect.value = true
        console.log('showLanguageSetting')
    }

    const hideLanguageSetting = () => {
        isShowLanguageSelect.value = false
        // console.log('hideLanguageSetting')
    }
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
            position: relative;

            .setting_item {
                position: absolute;
                top: 0;
                left: 0;
                min-width: 100%;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                padding: 0 16px;

                &:hover {
                    background: #F7F6FA;
                }

                .language_select_position {
                    position: absolute;
                    top: 0px;
                    left: -190px;
                }

                span {
                    font-family: PingFang SC, PingFang SC;
                    font-weight: 500;
                    font-size: 14px;
                    color: #333333;
                }

                img {
                    width: 12px;
                    height: 12px;
                }
            }

            img {


                width: 100%;
                height: 100%;
            }
        }

    }
</style>