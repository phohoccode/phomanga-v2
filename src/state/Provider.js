import { useEffect, useState } from "react";
import Context from "./Context";
import { googleLogout } from "@react-oauth/google";
import storage from '../utils'

function Provider({ children }) {
    const [width, setWidth] = useState(window.innerWidth)
    const [isOpenDiaLog, setIsOpenDiaLog] = useState(false)
    const [isLogin, setIsLogin] = useState(() => {
        const isLogin = storage.get('user', false)
        return !!isLogin
    })
    const [user, setUser] = useState(() => {
        return storage.get('user', null)
    })
    const [theme, setTheme] = useState(() => {
        return storage.get('theme', 'light')
    })
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
        storage.set('theme', theme)
        document.documentElement.classList.remove('light', 'dark')
        theme === 'light' ? 
            document.documentElement.classList.toggle('light') :
            document.documentElement.classList.toggle('dark')
    }, [theme])

    const handleLogout = () => {
        googleLogout()
        setUser(null)
        setIsLogin(false)
        localStorage.removeItem('user')
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