import api from '../utils/api'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
    const [auth, setAuth] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuth(true)
        }

    }, [])

    async function register(user) {
        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'success'

        try {
            const data = await api.post("/user/register", user).then((response) => {
                return response.data
            })

            await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }


    async function login(user) {
        let msgText = 'Login realizado com successo!'
        let msgType = 'success'

        try {
            const data = await api.post("/user/login", user).then((response) => {
                return response.data
            })

            await authUser(data)

            console.log(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
            console.log(error.response.data)
        }
        setFlashMessage(msgText, msgType)
    }

    async function authUser(data) {
        setAuth(true)

        localStorage.setItem('token', JSON.stringify(data.token))

        navigate('/')
    }

    function logout() {
        let msgText = 'Logout realizado com successo!'
        let msgType = 'success'

        setAuth(false)
        api.defaults.headers.Authorization = undefined
        localStorage.removeItem('token')
        navigate('/')

        setFlashMessage(msgText, msgType)
    }

    return { auth, register, logout, login }
}