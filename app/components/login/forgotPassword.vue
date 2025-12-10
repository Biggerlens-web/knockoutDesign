<template>
    <div class="code_form">
        <div class="input_box" :class="{ 'input_box_areaCode': !isRegion }">
            <div class="numbersle" @click="showAreaCode">
                <span>{{ `+${areaCode}` }}</span>
                <img :src="`${getCdnBaseUrl()}/phoneicon.png`" alt="">
            </div>
            <input v-model="accountInput" type="text" :placeholder="accountInputPlaceholder">
        </div>
        <div class="input_box input_box_password">
            <input v-model="codeInput" type="text" :placeholder="$t('placehoder_code')">
            <span class="get_code_text" @click="getCode">{{ getCodeText }}</span>
        </div>

        <div class="btn_box">
            <div class="confirm_btn" @click="emit('forgotPasswordNextStep')">
                {{ $t('mobile_nextStep') }}
            </div>
            <div class="back_login" @click="emit('forgotPasswordBack')">
                {{ $t('mobile_back') }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { getCdnBaseUrl } from '~/utils/cdnBaseUrl'
    const { t } = useI18n()
    const siteTarget = useRuntimeConfig().public.siteTarget
    const emit = defineEmits<{
        (e: 'selectAreaCode'): void
        (e: 'forgotPasswordBack'): void
        (e: 'forgotPasswordNextStep'): void
    }>()


    const countDown = ref(0)
    const getCodeText = computed(() => {
        return countDown.value <= 0 ? $t('getCode') : `${countDown.value}s`
    })


    let timer: any = null
    const getCode = () => {


        if (timer) {
            return
        }
        countDown.value = 60
        timer = setInterval(() => {
            countDown.value--
            if (countDown.value <= 0) {
                clearInterval(timer)
                timer = null
            }
        }, 1000)

    }


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


    const codeInput = defineModel('codeInput', {
        type: String,
        default: ''
    })


    const showAreaCode = () => {
        emit('selectAreaCode')
    }




</script>

<style lang="scss" scoped>

    .code_form {
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
            .get_code_text {
                flex-shrink: 0;
                font-family: PingFang SC, PingFang SC;
                font-weight: 500;
                font-size: 14px;
                color: #6b54fe;
                cursor: pointer;
            }
        }

        .btn_box {
            margin-top: 20px;

            .confirm_btn {
                height: 53px;
                background: #6b54fe;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: PingFang SC, PingFang SC;
                font-weight: 500;
                font-size: 16px;
                color: #fff;
                line-height: 19px;
                cursor: pointer;

            }

            .back_login {
                margin-top: 12px;
                height: 53px;
                border: 1px solid #6b54fe;
                border-radius: 12px;
                background: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                font-family: PingFang SC, PingFang SC;
                font-weight: 500;
                color: #6b54fe;
                font-size: 16px;
                line-height: 19px;
            }
        }
    }
</style>