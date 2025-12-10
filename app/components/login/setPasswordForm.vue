<template>
    <div class="set_password_box">
        <div class="input_box input_box_password">
            <input v-model="passwordInput" :type="isShowPassword1 ? 'text' : 'password'"
                :placeholder="$t('placehoder_password')">
            <img :src="showPasswordImg1" alt="" @click="isShowPassword1 = !isShowPassword1">
        </div>
        <div class="input_box input_box_password">
            <input v-model="confirmPasswordInput" :type="isShowPassword2 ? 'text' : 'password'"
                :placeholder="$t('placehoder_PW2')">
            <img :src="showPasswordImg2" alt="" @click="isShowPassword2 = !isShowPassword2">
        </div>

        <div class="confirm_btn">
            {{ $t('confirm') }}
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { getCdnBaseUrl } from '@/utils/cdnBaseUrl';

    const isShowPassword1 = ref(false)
    const showPasswordImg1 = computed(() => {
        return isShowPassword1.value ? `${getCdnBaseUrl()}/show_eyes.png` : `${getCdnBaseUrl()}/isshow_eyes.png`
    })
    const isShowPassword2 = ref(false)
    const showPasswordImg2 = computed(() => {
        return isShowPassword2.value ? `${getCdnBaseUrl()}/show_eyes.png` : `${getCdnBaseUrl()}/isshow_eyes.png`
    })



    const passwordInput = ref<string>('')
    const confirmPasswordInput = ref<string>('')

</script>

<style lang="scss" scoped>

    .set_password_box {
        display: flex;
        flex-direction: column;
        row-gap: 8px;

        .input_box {
            width: 100%;
            height: 52px;
            border-radius: 12px;
            border: 1px solid #cbcbcb;
            box-sizing: border-box;
            padding: 16px 20px;
            display: flex;
            align-items: center;

            input {
                border: none;
                outline: none;
                width: 100%;
                font-size: 14px;
            }
        }



        .input_box_password {
            img {
                cursor: pointer;
                width: 24px;
                height: 24px;
            }
        }

        .confirm_btn {
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #6b54fe;
            height: 52px;
            cursor: pointer;
            border-radius: 12px;
            color: #fff;
            font-family: PingFang SC;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 19px;

        }
    }

</style>