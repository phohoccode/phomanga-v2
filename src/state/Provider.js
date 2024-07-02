import { useEffect, useState } from "react";
import Context from "./Context";
import { googleLogout } from "@react-oauth/google";
import storage from '../utils'

function Provider({ children }) {
    const [isLogin, setIsLogin] = useState(() => {
        const isLogin = JSON.parse(localStorage.getItem('user'))
        return isLogin ? true : false
    })
    const [user, setUser] = useState(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        return user ? user : null
    })
    const [width, setWidth] = useState(window.innerWidth)
    const [theme, setTheme] = useState(() => {
        return JSON.parse(localStorage.getItem('theme')) || 'light'
    })
    const [isOpenDiaLog, setIsOpenDiaLog] = useState(false)
    const [quantityComicArchive, setQuantityComicArchive] = useState(() => {
        return storage.get('comic-storage', []).length
    })
    const [quantityComicHistory, setQuantityComicHistory] = useState(() => {
        const historyStorage = storage.get('history-storage', {})
        return Object.keys(historyStorage).length
    })

    useEffect(() => {
        const handleReSize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleReSize)
        return () => document.removeEventListener('resize', handleReSize)
    }, [])

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme))
    }, [theme])

    const handleLogout = () => {
        googleLogout()
        setUser(null)
        localStorage.removeItem('user')
        setIsLogin(false)

    }

    const value = {
        isLogin,
        user,
        width,
        theme,
        isOpenDiaLog,
        quantityComicArchive,
        quantityComicHistory,
        setUser,
        setIsLogin,
        handleLogout,
        setTheme,
        setIsOpenDiaLog,
        setQuantityComicArchive,
        setQuantityComicHistory
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export default Provider;