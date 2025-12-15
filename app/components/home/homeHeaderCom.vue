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
            <div class="member_btn">
                <img class="vip_icon" src="" alt="">
                <span>
                    {{ $t('openVip') }}
                </span>
            </div>
            <div class="user_info">
                <img class="user_avatar" src="/img/userIcon.png" alt="">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

    import searchHistory from './search/searchHistory.vue';

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

                .user_avatar {
                    width: 100%;
                    height: 100%;
                    cursor: pointer;

                }
            }
        }
    }

    .home_header_top_color {
        background-color: transparent;
    }

</style>