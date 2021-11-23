import axios from 'axios'
import { parseCookies, setCookie } from 'nookies'

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {}
})

api.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status === 401) {
        if (error.response.data.message === "Seu token expirou!") {

            const cookies = parseCookies();

            const { "JWT_Auth.refreshToken": refreshToken } = cookies

            return api.post('/refresh-token', { refreshToken }).then((res) => {
                const { token } = res.data

                setCookie(null, 'JWT_Auth.token', token)

                return new Promise((resolve, reject) => {
                    const originalConfig = error.config

                    api.defaults.headers.common['authorization'] = `Bearer ${token}`
                    originalConfig.headers['authorization'] = `Bearer ${token}`

                    resolve(api(originalConfig).then(res => {
                        res.data.tokenWasRefreshed = true

                        return res
                    }))
                })

            }).catch((err) => {
                return err
            })
        }
    }

    return Promise.reject(error)

})

