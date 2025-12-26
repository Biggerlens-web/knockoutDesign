<template>
  <div>
    <header id="header_box" v-if="hideHeader">
      <div class="header_content">
        <div class="left_box">
          <div class="logo_box">
            <img class="logo_img" src="/favicon.ico" alt="logo">
            <span class="page_title">
              {{ $t('pageTitle') }}
            </span>
          </div>
          <div class="page_desc">
            {{ pageDesc }}
          </div>
          <div class="mid_line" v-if="pageDesc">
          </div>
          <editCanvasCom v-if="pageDesc" />

        </div>

        <div class="right_box">
          <!-- <button class="subscribe_btn">
            {{ $t('subscribe') }}
          </button> -->
          <div class="download_btn">
            <img class="download_img" src="" alt="">
            <span>
              {{ $t('download') }}
            </span>
          </div>
          <div class="user_box" @mouseenter="hoverUserBox(true)" @mouseleave="hoverUserBox(false)">
            <client-only>
              <img class="user_avatar" :src="isLogin ? `${getCdnBaseUrl()}/avatar.png` : `/img/userIcon.png`" alt="">
            </client-only>
            <unloginTipsCom class="unlogin_tips_position" v-show="isShowUnloginTips" @mouseenter="hoverUserBox(true)"
              @mouseleave="hoverUserBox(false)" @click="goLogin" />
            <useInfoCom class="unlogin_tips_position" v-show="isShowUserInfo" @mouseenter="hoverUserBox(true)"
              @mouseleave="hoverUserBox(false)" />
          </div>
        </div>
      </div>
    </header>
    <main id="main_box" :class="{ 'design_main': hideHeader }">
      <AsideContent v-if="!hideAside" />
      <div class="main_content" :class="{ 'design_main_content': hideAside }">
        <div class="content_box">
          <NuxtPage />
        </div>

        <footer id="footer_box" v-if="!hideFooter">
          <div class="footer_content">
            <div class="footer_left_box">
              <div class="footer_left_text">
                <img class="footer_logo" :src="footerLogo" alt="">
                <div class="text_box">
                  <p class="page_title">
                    {{ $t('pageTitle') }}
                  </p>
                  <p class="page_desc">
                    {{ $t('footerLogoDesc') }}
                  </p>
                </div>

              </div>
              <a href="">
                Copyright@BiggerLens 粤ICP备18010326号
              </a>
            </div>
            <div class="footer_right_box">

              <ul class="footer_right_list" v-for="(item, index) in footerList" :key="index">
                <li class="footer_right_list_title">
                  {{ $t('footer_right_list_title1') }}
                </li>
                <li class="footer_right_list_item" v-for="label in item.items" :key="label.title">
                  {{ label.title }}
                </li>
              </ul>

            </div>



          </div>

        </footer>
      </div>

    </main>


    <!-- 登录弹窗 -->
    <LoginDialog />
    <!-- 创建设计弹窗 -->
    <startCreateDialog />
    <!-- 图片库弹窗 -->
    <imageLibraryCom />

    <!-- 颜色编辑弹窗 -->
    <colorEditCom class="color_edit_position" :style="{ left: `${colorEditLeft}px`, top: `${colorEditTop}px` }" />
    <!-- 图层管理弹窗 -->
    <layerCom class="layer_com_position" />



  </div>
</template>

<script lang="ts" setup>
  import footerLogo from '/img/footerLogo.png'
  import LoginDialog from '@/components/login/loginDialog.vue'
  import AsideContent from '@/components/home/asideContent.vue'
  import useInfoCom from '@/components/home/useInfoCom.vue'
  import unloginTipsCom from './components/home/unloginTipsCom.vue'
  import startCreateDialog from './components/design/startCreateDialog.vue'
  import imageLibraryCom from './components/imageLibraryCom.vue'
  import colorEditCom from './components/color/colorEditCom.vue'
  import editCanvasCom from './components/editCanvasCom.vue'
  import layerCom from './components/design/layerCom.vue'

  const stores = useMainStore()
  const { isLoginDialogVisible, colorEditLeft, colorEditTop } = storeToRefs(stores)







  const token = useCookie('knockout_design_room_token')
  const isLogin = ref(false)
  watch(token, (val) => {
    isLogin.value = !!val
  }, { immediate: true })
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


  const footerList = reactive([
    {
      title: $t('footer_right_list_title1'),
      items: [
        {
          title: '电商',
          link: '/create',
        },
        {
          title: '生活娱乐',
          link: '/projects',
        },
        {
          title: '社交媒体',
          link: '/projects',
        },
        {
          title: '重要节日',
          link: '/projects',
        },
      ],
    },
    {
      title: $t('footer_right_list_title2'),
      items: [
        {
          title: 'Photo Retouch',
          link: '/mySpace',
        },
        {
          title: 'Pro Knockout',
          link: '/recentlyOpen',
        },
        {
          title: 'PPT',
          link: '/recentlyOpen',
        },
        {
          title: '表格大师',
          link: '/recentlyOpen',
        },
      ],
    },
  ])


  const { locales, locale, setLocale } = useI18n()

  const route = useRoute()



  const pageDesc = computed(() => {
    if (route.path === '/image-editor') {
      return $t('ImageCroppingPageDesc')
    } else if (route.path === '/create') {
      return $t('createPageDesc')
    }
  })

  const hideFooter = computed(() => {
    return route.path === '/create' || route.path === '/image-editor' || route.path === '/projects'
  })
  const hideAside = computed(() => {
    return route.path === '/create' || route.path === '/image-editor'
  })
  const hideHeader = computed(() => {
    return route.path === '/create' || route.path === '/image-editor'
  })






  onMounted(() => {
    isLogin.value = !!token.value

  })



  //登录
  const goLogin = () => {
    isLoginDialogVisible.value = true
  }


</script>
<style lang="scss" scoped>
  #header_box {
    height: 70px;
    width: 100%;
    position: sticky;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: #ffffff;
    box-shadow: inset 0px -1px 1px 0px #EEEEEE;

    .header_content {
      // max-width: 1440px;
      min-width: 1000px;
      height: 100%;
      box-sizing: border-box;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      align-items: center;

      .left_box {
        display: flex;
        align-items: center;
        // column-gap: 50px;

        .logo_box {
          display: flex;
          align-items: center;
          column-gap: 8px;

          .logo_img {
            width: 24px;
            height: 24px;
          }

          .page_title {
            font-weight: 400;
            font-size: 16px;
            color: #333333;
            font-family: "AaHouDiHei-Regular";
          }
        }

        .page_desc {
          margin-left: 50px;
          font-family: Source Han Sans SC, Source Han Sans SC;
          font-weight: 500;
          font-size: 14px;
          color: #333333;
        }

        .mid_line {
          width: 32px;
          height: 12px;
          border-right: 1px solid #D9D9D9;

        }



      }



      .right_box {
        display: flex;
        align-items: center;
        column-gap: 32px;

        .download_btn {
          height: 32px;
          background: #6B42F2;
          border-radius: 12px 12px 12px 12px;
          display: flex;
          align-items: center;
          padding: 0 28px;
          column-gap: 8px;
          cursor: pointer;

          img {
            width: 20px;
            height: 20px;
          }

          span {
            font-family: Source Han Sans SC, Source Han Sans SC;
            font-weight: 500;
            font-size: 14px;
            color: #FFFFFF;

          }
        }

        .subscribe_btn {
          width: 120px;
          height: 40px;
          border-radius: 20px;
          border: 1px solid #000;
          background-color: transparent;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        .user_box {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .unlogin_tips_position {
            position: absolute;
            top: 48px;
            right: 0;

          }
        }

      }
    }

    .design_header {
      max-width: none;

      width: 100%;
    }
  }

  #main_box {
    width: 100%;

    height: 100vh;

    background-color: #f6f7f9;
    display: flex;
    align-items: stretch;
    overflow: hidden; // 防止整个页面出现滚动条

    .main_content {
      width: 0; // 配合 flex: 1 使用，确保能够正确收缩和占满剩余空间

      flex: 1;
      height: 100%; // 占满高度
      overflow: auto; // 仅右侧内容区域出现滚动条

      .content_box {
        min-width: 1000px;
        background-color: #f6f7f9;
        height: max-content;
      }
    }

    .design_main_content {
      max-width: none;
      width: 100%;
      overflow: hidden; // 设计页面通常不需要滚动条（内部画板自己处理）
    }
  }

  .design_main {
    height: calc(100vh - 70px); // 固定高度，确保不超出视口
    min-height: calc(100vh - 70px);
    height: auto !important;
  }

  #footer_box {
    width: 100%;
    background: #F7F6FA;

    .footer_content {
      // max-width: 1440px;
      min-width: 1000px;
      box-sizing: border-box;
      padding: 50px 32px;
      padding-right: 106px;
      display: flex;
      align-items: stretch;
      justify-content: space-between;

      .footer_left_box {
        position: relative;

        .footer_left_text {
          display: flex;
          align-items: center;
          column-gap: 12px;

          .footer_logo {
            width: 50px;
            height: 50px;
          }


          .text_box {
            display: flex;
            flex-direction: column;
            row-gap: 5px;

            .page_title {
              font-weight: 400;
              font-size: 20px;
              color: #333333;
              font-family: "AaHouDiHei-Regular";
            }

            .page_desc {
              font-family: Source Han Sans SC, Source Han Sans SC;
              font-weight: 400;
              font-size: 12px;
              color: #666666;
              line-height: 18px;
            }
          }
        }

        a {
          position: absolute;
          bottom: 0;
          width: max-content;
          font-family: Arial, Arial;
          font-weight: 400;
          font-size: 14px;
          color: #666666;
          line-height: 21px;
        }
      }

      .footer_right_box {
        display: flex;
        column-gap: 115px;

        .footer_right_list {
          .footer_right_list_title {
            font-family: Source Han Sans SC, Source Han Sans SC;
            font-weight: 500;
            font-size: 16px;
            color: #333333;
            margin-bottom: 24px;
          }

          .footer_right_list_item {
            font-family: Source Han Sans SC, Source Han Sans SC;
            font-weight: 400;
            font-size: 14px;
            color: #666666;
            cursor: pointer;

            &:hover {
              color: #333333;
            }

            &:not(:last-child) {
              margin-bottom: 12px;
            }
          }
        }
      }
    }
  }

  .color_edit_position {
    position: fixed;

  }

  .layer_com_position {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
