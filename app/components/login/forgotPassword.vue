<template>
    <div class="code_form">
        <div class="input_box" :class="{ 'input_box_areaCode': !isRegion }">
            <div class="numbersle" @click="showAreaCode" v-if="!isRegion">
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
            <div class="confirm_btn" @click="nextStep">
                {{ $t('mobile_nextStep') }}
            </div>
            <div class="back_login" @click="emit('forgotPasswordBack')">
                {{ $t('mobile_back') }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const { $crypto } = useNuxtApp()
    import { useMemberReq } from '~/request/memberReq'
    import { getCdnBaseUrl } from '~/utils/cdnBaseUrl'
    const memberReq = useMemberReq()
    const stores = useMainStore()
    const { resetPasswordAccount, resetPasswordMobileCode, resetPasswordCode } = storeToRefs(stores)
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

    const getCodeReq = async () => {
        try {
            const params: any = {
                timestamp: Date.now(),
                sendType: 3 //重置密码

            }
            if (siteTarget === 'EN') {
                params.type = 'email_code'
                params.email = accountInput.value
            } else {
                params.mobileCode = areaCode.value
                params.mobile = accountInput.value
                params.type = 'mobile_code'
            }


            console.log('发送验证码', params);
            const enData: string = $crypto.encryptDES(JSON.stringify(params))


            const res = await memberReq.post('/api/passport/sendCode', {
                enData
            }, {
                headers: {
                    language: siteTarget === 'EN' ? 'en' : 'zh'
                }
            })



            const data = JSON.parse($crypto.decryptDES(res.data))
            console.log('获取验证码', data);
        } catch (error) {
            console.log('获取验证码失败', error)
        }
    }


    let timer: any = null
    const getCode = async () => {


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
        await getCodeReq()

    }


    const nextStep = async () => {
        try {
            const params: any = {
                timestamp: Date.now(),
                type: siteTarget === 'EN' ? 'email_code' : 'mobile_code',
                code: codeInput.value,
                sendType: 3 //重置密码
            }
            if (siteTarget === 'EN') {
                params.email = accountInput.value
            } else {
                params.mobileCode = areaCode.value
                params.mobile = accountInput.value
            }

            console.log('验证码验证参数', params);
            const enData: string = $crypto.encryptDES(JSON.stringify(params))

            const res = await memberReq.post('/api/passport/checkCode', {
                enData
            })



            const data = JSON.parse($crypto.decryptDES(res.data))

            console.log('验证码验证结果', data);
            if (data.code === 0) {
                resetPasswordAccount.value = accountInput.value
                resetPasswordMobileCode.value = areaCode.value
                resetPasswordCode.value = codeInput.value
                emit('forgotPasswordNextStep')
            } else if (data.code === 1014) {
                ElMessage.error(t(`verifyCodeErrorTipe`))
            }



        } catch (err) {
            console.log('下一步失败', err)
        }

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