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
            imageEditUploadFile
        }
    },
    {
        persist: {
            storage: piniaPluginPersistedstate.sessionStorage()
        }
    }
)
