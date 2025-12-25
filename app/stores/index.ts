import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useMainStore = defineStore(
    'main',
    () => {
        const count = ref(0)

        const userInfo = ref({
            userName: '',
            userNo: ''
        })
        const isLoginDialogVisible = ref<boolean>(false) //是否显示登录弹窗
        const templateTypes = ref<any[]>([]) ///模板类型
        const fontList = ref<any[]>([]) ///字体列表
        const canvasWidth = ref(500) //模板宽度
        const canvasHeight = ref(500) //模板高度
        const scaleView = ref<number>(100) //缩放比例
        const projectEditTop = ref<number>(0) //项目编辑框距离顶部距离
        const projectEditLeft = ref<number>(0) //项目编辑框距离左侧距离
        const isShowEditBox = ref<boolean>(false) //是否显示项目编辑框

        const imageEditUploadFile = ref<any>() //图片编辑上传文件

        const isStartCreateDialogVisible = ref<boolean>(false) //是否显示创建设计弹窗

        const templateTypeSelectX = ref<number>(0) //模板分类选择框距离左侧距离
        const templateTypeSelectY = ref<number>(0) //模板分类选择框距离顶部距离
        const isShowTemplateTypeSelect = ref<boolean>(false) //是否显示模板分类选择框

        const isShowUploadFileDialog = ref<boolean>(false) //是否显示上传文件弹窗

        const backgroundColor = ref<string>('#ffffff') //背景颜色

        const showImageLibrary = ref<boolean>(false) //是否显示图片库弹窗

        const resetPasswordAccount = ref('') //重置密码账号
        const resetPasswordMobileCode = ref('') //重置密码手机区号
        const resetPasswordCode = ref('') //重置密码验证码

        const showColorEdit = ref<boolean>(false) //是否显示颜色编辑弹窗
        const colorEditLeft = ref<number>(0) //颜色编辑弹窗距离左侧距离
        const colorEditTop = ref<number>(0) //颜色编辑弹窗距离顶部距离

        const gradientPointColor = ref<string>('') //渐变点颜色
        const gradientBackgroundStyle = ref<string>('') //渐变背景样式
        const colorEditActiveItem = ref<'solidColor' | 'gradient'>('solidColor') //当前激活的颜色编辑项
        const clickColorComDefaultColor = ref<boolean>(false) //点击颜色组件默认颜色显示组件

        const isUpdateFrameSize = ref<boolean>(false) //是否更新框架大小
        return {
            count,
            userInfo,
            templateTypes,
            fontList,
            canvasWidth,
            canvasHeight,
            scaleView,
            projectEditTop,
            projectEditLeft,
            isShowEditBox,
            isLoginDialogVisible,
            imageEditUploadFile,
            isStartCreateDialogVisible,
            templateTypeSelectX,
            templateTypeSelectY,
            isShowTemplateTypeSelect,
            isShowUploadFileDialog,
            backgroundColor,
            showImageLibrary,
            resetPasswordAccount,
            resetPasswordMobileCode,
            resetPasswordCode,
            showColorEdit,
            colorEditLeft,
            colorEditTop,
            gradientPointColor,
            gradientBackgroundStyle,
            colorEditActiveItem,
            clickColorComDefaultColor,
            isUpdateFrameSize
        }
    },
    {
        persist: {
            storage: piniaPluginPersistedstate.sessionStorage()
        }
    }
)
