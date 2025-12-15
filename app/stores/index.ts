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
        const templateTypes = ref<any[]>([]) ///模板类型
        const fontList = ref<any[]>([]) ///字体列表
        const canvasWidth = ref(500) //模板宽度
        const canvasHeight = ref(500) //模板高度
        const scaleView = ref<number>(100) //缩放比例
        return {
            count,
            userInfo,
            templateTypes,
            fontList,
            canvasWidth,
            canvasHeight,
            scaleView
        }
    },
    {
        persist: {
            storage: piniaPluginPersistedstate.sessionStorage()
        }
    }
)
