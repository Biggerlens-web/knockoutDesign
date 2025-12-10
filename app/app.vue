<template>
  <div>
    <header id="header_box">
      <div class="header_content">
        <div class="left_box">
          <img class="logo_img" src="" alt="logo">
          <span class="page_title">
            {{ $t('pageTitle') }}
          </span>
        </div>
        <div class="mid_box">
          <input type="text" @focus="isFocusSearch = true" @blur="isFocusSearch = false" placeholder="Search"
            v-model="searchText">
          <div class="clear_btn" v-show="searchText" @click="searchText = ''">
            删除
          </div>
          <SearchHistory class="search_history_box" v-show="isFocusSearch" />
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
    <main id="main_box">
      <div class="main_content">
        <NuxtPage />
      </div>

    </main>

    <footer id="footer_box">
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
    <!-- 登录弹窗 -->
    <LoginDialog v-model:visible="isLoginDialogVisible" />
  </div>
</template>

<script lang="ts" setup>
  import SearchHistory from '@/components/home/search/searchHistory.vue'
  import LoginDialog from '@/components/login/loginDialog.vue'
  const { locales, locale, setLocale } = useI18n()

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
      max-width: 1440px;
      min-width: 1000px;
      height: 100%;
      margin: 0 auto;
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
          font-size: 24px;
          font-weight: 600;
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
  }

  #main_box {
    width: 100%;
    // height: 100vh;


    .main_content {

      height: 100%;
      max-width: 1440px;
      min-width: 1000px;
      margin: 0 auto;
    }
  }

  #footer_box {
    // min-height: 500px;
    width: 100%;

    background: #f2f2f2;

    .footer_content {
      max-width: 1440px;
      min-width: 1000px;
      // min-height: 500px;
      margin: 0 auto;

    }
  }
</style>
