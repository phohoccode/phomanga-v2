import { useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";

import storage, { setScrollDocument } from '../utils'
import Context from "./Context";

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
        const comicStorage = storage.get('comic-storage', {})
        return comicStorage[user?.email]?.length
    })
    const [quantityComicHistory, setQuantityComicHistory] = useState(() => {
        const historyStorage = storage.get('history-storage', {})
        if (!historyStorage[user?.email]) {
            historyStorage[user?.email] = {}
        }
        return Object.keys(historyStorage[user?.email])?.length
    })

    useEffect(() => {
        setQuantityComicArchive(() => {
            const comicStorage = storage.get('comic-storage', {})
            return comicStorage[user?.email]?.length
        })
        setQuantityComicHistory(() => {
            const historyStorage = storage.get('history-storage', {})
            if (!historyStorage[user?.email]) {
                historyStorage[user?.email] = {}
            }
            return Object.keys(historyStorage[user?.email]).length
        })
    }, [user])

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

    useEffect(() => {
        setScrollDocument(isOpenDiaLog)
    }, [isOpenDiaLog])

    const handleLogout = () => {
        googleLogout()
        setUser(null)
        setIsLogin(false)
        window.location.href = '/'
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