import { useEffect, useState } from "react";
import Context from "./Context";
import { googleLogout } from "@react-oauth/google";

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
        setUser,
        setIsLogin,
        handleLogout,
        setTheme
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export default Provider;