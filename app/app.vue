<template>
  <div>
    <header id="header_box" v-if="hideFooter">
      <div class="header_content">
        <div class="left_box">
          <img class="logo_img" src="" alt="logo">
          <span class="page_title">
            {{ $t('pageTitle') }}
          </span>
        </div>

        <div class="right_box">
          <button class="subscribe_btn">
            {{ $t('subscribe') }}
          </button>
          <div class="user_box" @click="goLogin">

          </div>
        </div>
      </div>
    </header>
    <main id="main_box" :class="{ 'design_main': hideFooter }">
      <AsideContent v-if="!hideFooter" />
      <div class="main_content" :class="{ 'design_main_content': hideFooter }">
        <div class="content_box">
          <NuxtPage />
        </div>

        <footer id="footer_box" v-if="!hideFooter">
          <div class="footer_content">
            <div class="logo_box">
              <img src="" alt="">
            </div>
            <div>


              <div class="language_box">
                {{ languageText }}
                <ul>
                  <li v-for="item in locales" :key="item.code" @click="setLocale(item.code)">
                    {{ item.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>

    </main>


    <!-- 登录弹窗 -->
    <LoginDialog v-model:visible="isLoginDialogVisible" />
  </div>
</template>

<script lang="ts" setup>

  import LoginDialog from '@/components/login/loginDialog.vue'
  import AsideContent from '@/components/home/asideContent.vue'


  const { locales, locale, setLocale } = useI18n()

  const route = useRoute()

  const hideFooter = computed(() => {
    return route.path === '/design' || route.path === '/ImageCroppingPage'
  })
  //语言选择
  const languageText = computed(() => {
    const activeItem = locales.value.find(item => item.code === locale.value)
    return activeItem?.name || '中文'
  })




  //搜索
  const searchText = ref<string>('')
  const isFocusSearch = ref<boolean>(false)
  onMounted(() => {

  })



  //登录
  const isLoginDialogVisible = ref<boolean>(false)
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

    .header_content {
      // max-width: 1440px;
      min-width: 1000px;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: space-between;
      align-items: center;

      .left_box {
        display: flex;
        align-items: center;
        column-gap: 10px;

        .logo_img {
          width: 34px;
          height: 34px;
        }

        .page_title {
          font-weight: 400;
          font-size: 16px;
          color: #333333;
          font-family: "AaHouDiHei-Regular";
        }
      }

      .mid_box {
        width: 600px;
        height: 40px;
        border-radius: 20px;
        border: 1px solid #000;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 10px;
        position: relative;

        input {
          width: 500px;
          height: 40px;
          border: none;
          outline: none;
        }

        .clear_btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 20px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
        }

        .search_history_box {
          position: absolute;
          top: 55px;
          left: 0;

        }
      }

      .right_box {
        display: flex;
        align-items: center;
        column-gap: 10px;

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
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #000;
          background-color: transparent;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
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
      overflow-y: auto; // 仅右侧内容区域出现滚动条

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
    background: #f2f2f2;

    .footer_content {
      // max-width: 1440px;
      min-width: 1000px;
    }
  }
</style>
