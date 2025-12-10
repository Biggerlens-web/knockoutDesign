import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useMainStore = defineStore(
    'main',
    () => {
        const count = ref(0)

        return {count}
    },
    {
        persist: {
            storage: piniaPluginPersistedstate.sessionStorage()
        }
    }
)
