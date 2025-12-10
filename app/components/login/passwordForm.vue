<template>
    <div class="password_form">
        <div class="input_box" :class="{ 'input_box_areaCode': !isRegion }">
            <div class="numbersle" @click="showAreaCode">
                <span>{{ `+${areaCode}` }}</span>
                <img :src="`${getCdnBaseUrl()}/phoneicon.png`" alt="">
            </div>
            <input v-model="accountInput" type="text" :placeholder="accountInputPlaceholder">
        </div>
        <div class="input_box input_box_password">
            <input v-model="passwordInput" :type="isShowPassword ? 'text' : 'password'"
                :placeholder="$t('placehoder_password')">
            <img :src="showPasswordImg" alt="" @click="isShowPassword = !isShowPassword">
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { getCdnBaseUrl } from '~/utils/cdnBaseUrl'
    const { t } = useI18n()
    const siteTarget = useRuntimeConfig().public.siteTarget
    const emit = defineEmits<{
        (e: 'selectAreaCode'): void
    }>()
    const areaCode = defineModel('areaCode', {
        type: String,
        default: '86'
    })
    const isRegion = computed(() => {
        return siteTarget === 'EN'
    })
    const accountInputPlaceholder = computed(() => {
        return siteTarget === 'EN' ? t('placehoder_email') : t('placehoder_phonenum')
    })

    const accountInput = defineModel('accountInput', {
        type: String,
        default: ''
    })

    const passwordInput = defineModel('passwordInput', {
        type: String,
        default: ''
    })



    const showAreaCode = () => {
        emit('selectAreaCode')
    }



    const isShowPassword = ref(false)
    const showPasswordImg = computed(() => {
        return isShowPassword.value ? `${getCdnBaseUrl()}/show_eyes.png` : `${getCdnBaseUrl()}/isshow_eyes.png`
    })

</script>

<style lang="scss" scoped>

    .password_form {
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

        .input_box_areaCode {

            display: flex;
            align-items: center;
            column-gap: 10px;

            .numbersle {

                display: flex;
                align-items: center;
                white-space: nowrap;
                cursor: pointer;
                column-gap: 4px;

                span {
                    font-family: PingFang SC, PingFang SC;
                    font-weight: 500;
                    font-size: 14px;
                    color: #333333;
                    line-height: 14px;
                }
            }
        }

        .input_box_password {
            img {
                cursor: pointer;
                width: 24px;
                height: 24px;
            }
        }
    }
</style>