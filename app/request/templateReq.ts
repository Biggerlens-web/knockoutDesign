import axios from 'axios'
import type {AxiosInstance} from 'axios'
export const useTemplateReq = (): AxiosInstance => {
    const templateReq = axios.create({
        baseURL: 'https://privacy.biggerlens.cn',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    templateReq.interceptors.request.use(
        config => {
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )
    templateReq.interceptors.response.use(
        response => {
            return response
        },
        error => {
            return Promise.reject(error)
        }
    )

    return templateReq
}
