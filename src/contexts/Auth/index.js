import { createContext, useState, useContext, useEffect } from 'react'
import { setCookie, destroyCookie, parseCookies } from 'nookies'
import { useHistory } from 'react-router-dom'

import { api } from '../../services/api'

import { getNow } from '../../utils/getNow'

const AuthContext = createContext([])

export function AuthProvider({ children }) {
    const [user, setUser] = useState(undefined)
    const [historicJWT, setHistoricJWT] = useState([])

    const history = useHistory()

    useEffect(() => {
        const cookies = parseCookies()

        const { "JWT_Auth.token": token } = cookies
        const { "JWT_Auth.refreshToken": refreshToken } = cookies
        const { "JWT_Auth.user": user } = cookies

        if (token && refreshToken && user) {
            setUser(user)

            newHistoricEvent({
                time: getNow(),
                token,
                refreshToken: { id: refreshToken },
                message: "Seu token foi recuperado dos cookies."
            })

            api.defaults.headers.common['authorization'] = `Bearer ${token}`
        }

    }, [])

    function signIn(data) {
        const { token, refreshToken, user } = data

        setUser(user)

        api.defaults.headers.common['authorization'] = `Bearer ${token}`

        setCookie(null, 'JWT_Auth.token', token)
        setCookie(null, 'JWT_Auth.refreshToken', refreshToken.id)
        setCookie(null, 'JWT_Auth.user', user)

        newHistoricEvent({
            time: getNow(),
            token: data.token,
            refreshToken: data.refreshToken,
            message: "Você foi autenticado com sucesso!"
        })

        history.push('/dashboard')
    }

    function signOut() {
        destroyCookie(null, 'JWT_Auth.token')
        destroyCookie(null, 'JWT_Auth.refreshToken')
        destroyCookie(null, 'JWT_Auth.user')

        setUser(undefined)

        setHistoricJWT([])
    }

    function newHistoricEvent(newEventJWT) {
        setHistoricJWT(historicJWT => [...historicJWT, newEventJWT])
    }

    return (
        <AuthContext.Provider value={{
            historicJWT,
            newHistoricEvent,
            signIn,
            signOut,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useHistoricJWTEvent must be used within a AuthProvider")
    }

    const { historicJWT, newHistoricEvent, signIn, signOut, user } = context

    return { historicJWT, newHistoricEvent, signIn, signOut, user }
}