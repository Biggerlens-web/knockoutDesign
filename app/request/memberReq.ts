import axios from 'axios'
import type {AxiosInstance} from 'axios'

export const useMemberReq = (): AxiosInstance => {
    const siteTarget = import.meta.env.VITE_SITE_TARGET || 'CN'
    const token = useCookie('knockout_design_room_token')
    const {$crypto} = useNuxtApp()

    const memberReq = axios.create({
        baseURL: siteTarget === 'EN' ? 'https://inapp.v3.en.biggerlens.com' : 'https://inapp.v3.zh.biggerlens.com',
        headers: {
            'Content-Type': 'application/json',
            appId: 'KnockoutDesignStudio'
        }
    })

    memberReq.interceptors.request.use(
        config => {
            if (token.value) {
                config.headers['token'] = `${token.value}`
            }
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )

    memberReq.interceptors.response.use(
        response => {
            try {
                // Just logging for now to match original behavior
                if (response.data && typeof response.data === 'string') {
                    const data = JSON.parse($crypto.decryptDES(response.data))
                    console.log('🚀 ~ data:', data)
                    if (data.code == 3) {
                        const token = useCookie('knockout_design_room_token')
                        token.value = ''
                        window.location.reload()
                    }
                }
            } catch (e) {
                // ignore error if decryption fails (maybe not encrypted)
            }
            return response
        },
        error => {
            return Promise.reject(error)
        }
    )

    return memberReq
}
