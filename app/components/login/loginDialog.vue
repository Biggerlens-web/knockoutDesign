<template>
    <el-dialog v-model="visible" width="0" :show-close="false" style="padding: 0;" :z-index="1000">
        <div class="login_dialog">
            <div class="login_desc">
                <p>
                    <img :src="`${getCdnBaseUrl()}/bg_firstloginbox_title.png`" alt="knockout">
                </p>
                <ul class="login_desc_list">
                    <li v-for="item in loginDescList" :key="item.i18n">
                        <img :src="`${getCdnBaseUrl()}/${item.iconUrl}`" :alt="$t(item.i18n)">
                        <p>{{ $t(item.i18n) }}</p>
                    </li>
                </ul>
            </div>
            <div class="login_form">
                <div class="login_way_box">
                    <span class="login_way_title">
                        {{ loginWayText }}
                    </span>
                    <img class="close_btn" @click="visible = false" :src="`${getCdnBaseUrl()}/close.png`" alt="close">
                </div>
                <div>

                    <keep-alive :include="['codeForm', 'passwordForm']">
                        <component :is="loginFormList[activeLoginForm]" v-model:accountInput="accountInput"
                            v-model:passwordInput="passwordInput" v-model:codeInput="codeInput"
                            @selectAreaCode="selectAreaCode" :areaCode="areaCode"
                            @forgotPasswordBack="activeLoginForm = 'passwordForm'"
                            @forgotPasswordNextStep="activeLoginForm = 'setPasswordForm'" />
                    </keep-alive>


                </div>
                <div class="form_btn"
                    v-if="activeLoginForm !== 'forgotPassword' && activeLoginForm !== 'setPasswordForm'">
                    <div class="login_btn" @click="handleLogin" v-loading="isLoging">
                        {{ $t('mobile_loginBtn') }}
                    </div>
                    <div class="switch_login_way">
                        <div @click="activeLoginForm = 'forgotPassword'">
                            {{ activeLoginForm === 'passwordForm' ? $t('forgetPassword') : ''
                            }}
                        </div>
                        <div @click="switchLoginWay">
                            {{ switchLoginWayText }}
                        </div>
                    </div>
                </div>
                <div class="other_way"
                    v-if="activeLoginForm !== 'forgotPassword' && activeLoginForm !== 'setPasswordForm'">
                    <div class="line">

                        <span>
                            {{ $t('otherLogin') }}
                        </span>
                    </div>
                    <div class="way_icon_box">
                        <img :src="`${getCdnBaseUrl()}/wechart.svg`">
                    </div>
                </div>
                <div class="login_tips_box"
                    v-if="activeLoginForm !== 'forgotPassword' && activeLoginForm !== 'setPasswordForm'">
                    <div class="tips_text">
                        <img :src="checkImg" alt="" @click="isCheck = !isCheck">
                        <p class="check_title">
                            {{ $t('checktitle1') }}<span @click="handeleagreement">{{ $t('checktitle2')
                            }}</span>{{
                                    $t('checktitle3') }}<span @click="handeleagreement2">{{ $t('checktitle4')
                            }}</span>{{
                                    $t('checktitle5') }}
                        </p>
                    </div>
                    <div class="Titpsbox" v-show="!isCheck" :class="{ 'shake': shaking }">
                        <span>{{ $t('checkagreementTips') }}</span>
                    </div>
                </div>
            </div>

        </div>
        <phoneNumber v-model:visible="isShowAreaCode" @getAreaCode="getAreaCode" />
    </el-dialog>
</template>

<script lang="ts" setup>
    import { getCdnBaseUrl } from '@/utils/cdnBaseUrl.js'
    import phoneNumber from '@/components/login/phonenumber.vue'
    import passwordForm from './passwordForm.vue'
    import forgotPassword from './forgotPassword.vue'
    import setPasswordForm from './setPasswordForm.vue'
    import codeForm from './codeForm.vue'
    import { useMemberReq } from '~/request/memberReq'
    import { ElMessage } from 'element-plus'
    const { t, locale } = useI18n()
    const stores = useMainStore()
    const { userInfo } = storeToRefs(stores)
    const { $crypto } = useNuxtApp()
    const memberReq = useMemberReq()
    const visible = defineModel('visible', {
        type: Boolean,
        default: false
    })


    const siteTarget = useRuntimeConfig().public.siteTarget

    const activeLoginForm = ref<string>('codeForm')

    watch(() => visible.value, () => {
        if (visible.value) {
            activeLoginForm.value = 'codeForm'
            accountInput.value = ''
            passwordInput.value = ''
            codeInput.value = ''

        }
    })

    const loginFormList = reactive<any>({
        passwordForm,
        codeForm,
        forgotPassword,
        setPasswordForm
    })

    //账号
    const accountInput = ref<string>('')
    //密码
    const passwordInput = ref<string>('')
    //验证码
    const codeInput = ref<string>('')


    const loginWayText = computed(() => {



        if (activeLoginForm.value === 'passwordForm') {
            return t('mobile_loginType1')
        } else if (activeLoginForm.value === 'codeForm') {
            return t('mobile_loginType2')
        } else if (activeLoginForm.value === 'forgotPassword') {
            return t('forgetPassword')
        } else if (activeLoginForm.value === 'setPasswordForm') {
            return t('initPW')
        }

    })



    const switchLoginWayText = computed(() => {
        return activeLoginForm.value === 'passwordForm' ? t('mobile_loginType2') : t('mobile_loginType1')
    })
    const switchLoginWay = () => {
        activeLoginForm.value = activeLoginForm.value === 'passwordForm' ? 'codeForm' : 'passwordForm'
    }


    interface LoginDescItem {

        desc: string
        i18n: string
        iconUrl: string
    }
    const loginDescList = reactive<LoginDescItem[]>([
        {
            desc: '专业工具 轻松创作',
            i18n: 'loginDesc1',
            iconUrl: 'firstloginbox1.png'
        },
        {
            desc: '海量素材 持续更新',
            i18n: 'loginDesc2',
            iconUrl: 'firstloginbox2.png'
        },
        {
            desc: '安全无广 放心使用',
            i18n: 'loginDesc3',
            iconUrl: 'firstloginbox3.png'
        },
        {
            desc: '多平台统一会员服务',
            i18n: 'loginDesc4',
            iconUrl: 'firstloginbox4.png'
        },

    ])




    //选择区号
    const areaCode = ref<string>('86')
    const isShowAreaCode = ref<boolean>(false)
    const selectAreaCode = () => {
        isShowAreaCode.value = true
    }
    const getAreaCode = (code: string) => {
        console.log(code)
        areaCode.value = code
        isShowAreaCode.value = false
    }


    //已读协议
    const isCheck = ref<boolean>(false)
    const checkImg = computed(() => {
        return isCheck.value ? `${getCdnBaseUrl()}/isuncheck.png` : `${getCdnBaseUrl()}/ischeck.png`
    })


    //点击跳转的许可协议和
    const handeleagreement = () => {
        const url = 'https://privacy.biggerlens.cn/app/userAgreement?name=knockout&os=android&language=zh'
        if (locale.value === 'zh') {
            window.open(url)
        } else {
            window.open(url.replace('zh', 'en'))
        }
    }

    const handeleagreement2 = () => {
        const url = 'https://privacy.biggerlens.cn/app/privacy?name=knockout&os=android&language=zh'

        if (locale.value === 'zh') {
            window.open(url)
        } else {
            window.open(url.replace('zh', 'en'))
        }
    }


    //登录
    const shaking = ref<boolean>(false)
    const isLoging = ref<boolean>(false)
    const handleLogin = async () => {
        if (shaking.value) return
        if (!isCheck.value) {
            shaking.value = true
            setTimeout(() => {
                shaking.value = false
            }, 500)
            return
        }

        if (isLoging.value) return
        isLoging.value = true
        try {

            const params: any = {
                timestamp: Date.now()
            }
            if (activeLoginForm.value === 'passwordForm') {

                params.password = $crypto.md5(passwordInput.value)
                if (siteTarget === 'EN') {
                    params.type = 'email'
                    params.email = accountInput.value
                } else {
                    params.type = 'mobile'
                    params.mobile = accountInput.value
                    params.mobileCode = areaCode.value
                }
                console.log('登录参数', params);


                const enData = $crypto.encryptDES(JSON.stringify(params))
                const res = await memberReq.post('/api/passport/localLogin', {
                    enData
                })


                const data = JSON.parse($crypto.decryptDES(res.data))
                console.log('登录成功', data);
                if (data.code == 0) {
                    ElMessage({ type: 'success', message: t('Loginsuccess'), zIndex: 10000 })
                    const token = useCookie('knockout_design_room_token')
                    token.value = data.data.token
                    userInfo.value.userName = data.data.userName
                    userInfo.value.userNo = data.data.userNo
                    window.location.reload()

                } else if (data.code == 1011) {
                    ElMessage({ type: 'error', message: t('PWErrorTip'), zIndex: 10000 })
                }

            } else if (activeLoginForm.value === 'codeForm') {
                params.type = 'mobile_code'
                params.code = codeInput.value

                if (siteTarget === 'EN') {
                    params.email = accountInput.value
                } else {
                    params.mobileCode = areaCode.value
                    params.mobile = accountInput.value
                }
                console.log('登录参数', params);
                const enData = $crypto.encryptDES(JSON.stringify(params))
                const res = await memberReq.post('/api/passport/registerAndLogin', {
                    enData
                }, {
                    headers: {
                        language: siteTarget === 'EN' ? 'en' : 'zh'
                    }
                })


                const data = JSON.parse($crypto.decryptDES(res.data))
                console.log('登录成功', data);
                if (data.code == 0) {
                    ElMessage({ type: 'success', message: t('Loginsuccess'), zIndex: 10000 })
                    const token = useCookie('knockout_design_room_token')
                    token.value = data.data.token
                    userInfo.value.userName = data.data.userName
                    userInfo.value.userNo = data.data.userNo
                    window.location.reload()

                } else if (data.code == 1014) {
                    ElMessage({ type: 'error', message: t('verifyCodeErrorTipe'), zIndex: 10000 })
                }
            }




        } catch (err) {
            console.log('登录失败', err);
        } finally {
            isLoging.value = false
        }
    }
</script>

<style lang="scss" scoped>



    .login_dialog {
        height: 460px;
        width: 660px;
        background-color: #fff;
        border-radius: 10px;

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: space-between;

        .login_desc {
            box-sizing: border-box;
            width: 260px;
            height: 100%;
            background: url('bg_firstloginbox.png');
            background-size: 105% 100%;
            background-position: -10px 0px;
            border-radius: 10px 0 0 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 70px;

            .login_desc_list {
                margin-top: 80px;
                display: flex;
                flex-direction: column;
                row-gap: 24px;
                box-sizing: border-box;
                padding: 0 10px;

                li {
                    display: flex;
                    align-items: center;
                    column-gap: 6px;

                    img {
                        width: 32px;
                        height: 32px;
                    }

                    p {
                        font-family: PingFang SC, PingFang SC;
                        font-weight: 500;
                        font-size: 16px;
                        color: #fff;
                        line-height: 19px;
                    }
                }
            }
        }

        .login_form {
            flex: 1;
            height: 100%;
            background-color: #fff;
            border-radius: 0 10px 10px 0;
            box-sizing: border-box;
            padding-top: 32px;
            padding-left: 40px;
            padding-right: 40px;

            .login_way_box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;

                .login_way_title {
                    font-family: PingFang SC, PingFang SC;
                    font-weight: 600;
                    font-size: 26px;
                    color: #000000;
                    line-height: 30px;
                }

                .close_btn {
                    cursor: pointer;
                    width: 12px;
                    height: 12px;
                    transition: all 0.5s ease-in-out;

                    &:hover {
                        transform: rotate(180deg);
                    }
                }
            }

            .form_btn {
                margin-top: 20px;

                .login_btn {
                    width: 100%;
                    height: 52px;
                    background: #6b54fe;
                    border-radius: 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    font-family: PingFang SC, PingFang SC;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 19px;
                    color: #fff;
                }

                .switch_login_way {
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    div {
                        font-family: PingFang SC, PingFang SC;
                        font-weight: 500;
                        font-size: 14px;
                        color: #6b54fe;
                        line-height: 16px;
                        cursor: pointer;
                    }
                }
            }

            .other_way {
                margin-top: 12px;

                .line {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    span {
                        font-size: 12px;
                        color: #666;
                        font-weight: 400;
                        line-height: 14px;
                        margin: 0 6px;
                    }

                    &::after {
                        content: '';
                        flex: 1;
                        border-bottom: 1px solid #ccc;
                    }

                    &::before {
                        flex: 1;
                        content: '';
                        border-bottom: 1px solid #ccc;
                    }
                }

                .way_icon_box {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 12px;

                    img {
                        cursor: pointer;
                        width: 26px;
                        height: 26px;
                    }
                }
            }

            .login_tips_box {
                position: relative;

                .tips_text {
                    display: flex;
                    align-items: center;
                    column-gap: 6px;
                    margin-top: 12px;

                    img {
                        cursor: pointer;
                    }

                    .check_title {
                        line-height: 12px;
                        font-family: PingFang SC, PingFang SC;
                        font-weight: 400;
                        font-size: 10px;
                        color: #666666;

                        span {
                            color: #6b54fe;
                            cursor: pointer;
                        }

                    }
                }

                .Titpsbox {
                    position: absolute;
                    top: 30px;
                    left: -20px;
                    width: max-content;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-width: 130px;
                    height: 33px;
                    padding: 0 6px;
                    background-color: rgba(0, 0, 0, 0.7);
                    font-size: 10px;
                    color: #fff;
                    font-family: PingFang SC, PingFang SC;
                    font-weight: 400;
                    line-height: 16px;

                    &::after {
                        content: '';
                        position: absolute;
                        border-width: 5px;
                        border-style: solid;
                        border-color: transparent transparent rgba(0, 0, 0, 0.7) transparent;
                        bottom: 100%;
                        left: 26px;
                        margin-left: -5px;
                    }
                }

                .shake {
                    animation: shake .5s ease-in-out;
                }

                @keyframes shake {
                    0% {
                        transform: translateX(0);
                    }

                    25% {
                        transform: translateX(-5px);
                    }

                    50% {
                        transform: translateX(5px);
                    }

                    75% {
                        transform: translateX(-5px);
                    }

                    100% {
                        transform: translateX(0);
                    }
                }
            }
        }
    }



</style>
