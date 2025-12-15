<template>
    <div class="home_header" :class="{ 'home_header_top_color': isHome && isHomeScrollTop }">
        <div class="empty_box" v-show="!isShowHeaderSearch"></div>


        <div class="search_box" :class="{ 'focus': isFocus }" v-show="isShowHeaderSearch">
            <img class="search_icon" src="" alt="">
            <input class="search_input" type="text" placeholder="搜索模板" v-model="searchText" @focus="isFocus = true"
                @blur="isFocus = false" />
            <img class="search_del" src="" alt="" @click="searchText = ''">
            <searchHistory v-show="isFocus" class="search_history"></searchHistory>
        </div>
        <div class="user_box">
            <!-- <div class="member_btn">
                <img class="vip_icon" src="" alt="">
                <span>
                    {{ $t('openVip') }}
                </span>
            </div> -->
            <div class="user_info" @mouseenter="hoverUserBox(true)" @mouseleave="hoverUserBox(false)">
                <img class="user_avatar" src="/img/userIcon.png" alt="">
                <unloginTipsCom class="unlogin_tips_position" v-show="isShowUnloginTips"
                    @mouseenter="hoverUserBox(true)" @mouseleave="hoverUserBox(false)" @click="goLogin" />
                <useInfoCom class="unlogin_tips_position" v-show="isShowUserInfo" @mouseenter="hoverUserBox(true)"
                    @mouseleave="hoverUserBox(false)" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import useInfoCom from './useInfoCom.vue';
    import unloginTipsCom from './unloginTipsCom.vue';
    import searchHistory from './search/searchHistory.vue';
    import { useMainStore } from '@/stores/index'
    const stores = useMainStore()
    const { isLoginDialogVisible } = storeToRefs(stores)

    const isShowUserInfo = ref<boolean>(false)
    const isShowUnloginTips = ref<boolean>(false)

    let leavedBonce: any = null

    const hoverUserBox = (isHover: boolean) => {
        const token = useCookie('knockout_design_room_token')
        if (isHover) {
            if (leavedBonce) {
                clearTimeout(leavedBonce)
                leavedBonce = null
            }
            if (token.value) {
                isShowUserInfo.value = true
                isShowUnloginTips.value = false
            } else {
                isShowUserInfo.value = false
                isShowUnloginTips.value = true
            }
        } else {
            leavedBonce = setTimeout(() => {
                isShowUserInfo.value = false
                isShowUnloginTips.value = false
            }, 300)
        }
    }

    const goLogin = () => {
        isLoginDialogVisible.value = true
    }
    interface Prop {
        isShowHeaderSearch?: boolean
    }
    const props = withDefaults(defineProps<Prop>(), {
        isShowHeaderSearch: false
    })

    const route = useRoute()
    const isHome = computed(() => route.path === '/')
    const isHomeScrollTop = ref(true)

    onMounted(() => {
        if (process.client) {
            const mainContent = document.querySelector('.main_content')
            if (mainContent) {
                isHomeScrollTop.value = mainContent.scrollTop === 0
                mainContent.addEventListener('scroll', () => {
                    isHomeScrollTop.value = mainContent.scrollTop === 0

                })
            }
        }
    })
    onBeforeUnmount(() => {
        if (process.client) {
            const mainContent = document.querySelector('.main_content')
            if (mainContent) {
                mainContent.removeEventListener('scroll', () => {
                    isHomeScrollTop.value = mainContent.scrollTop === 0

                })
            }
        }
    })



    const searchText = ref<string>('')


    const isFocus = ref<boolean>(false)

</script>

<style lang="scss" scoped>

    .home_header {
        width: 100%;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;

        box-sizing: border-box;


        .search_box {
            display: flex;
            align-items: center;
            column-gap: 12px;
            width: 600px;
            height: 40px;
            background: #FFFFFF;
            border-radius: 100px 100px 100px 100px;
            border: 1px solid #EEEEEE;
            box-sizing: border-box;
            padding: 0 20px;
            position: relative;

            .search_icon {
                width: 24px;
                height: 24px;
                cursor: pointer;
            }

            .search_input {
                flex: 1;
                border: none;
                outline: none;
            }

            .search_del {
                width: 24px;
                height: 24px;
                cursor: pointer;
                position: absolute;
                right: 20px;
            }

            .search_history {
                position: absolute;
                top: 50px;
                left: 0;


            }
        }


        .focus {
            border: 1px solid #6B42F2;
        }

        .user_box {
            display: flex;
            align-items: center;
            column-gap: 32px;

            .member_btn {


                padding: 0 12px;
                height: 32px;
                background: linear-gradient(90deg, #FBEEDF 0%, #FEDCC1 100%);
                border-radius: 12px 12px 12px 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                column-gap: 8px;
                cursor: pointer;

                .vip_icon {
                    width: 24px;
                    height: 24px;
                }

                span {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 500;
                    font-size: 14px;
                    color: #6B3D1E;
                }
            }

            .user_info {
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;

                .user_avatar {
                    width: 100%;
                    height: 100%;
                    cursor: pointer;

                }

                .unlogin_tips_position {
                    position: absolute;
                    top: 48px;
                    right: 0;

                }
            }
        }
    }

    .home_header_top_color {
        background-color: transparent;
    }

</style>