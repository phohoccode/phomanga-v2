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
    const [isShowCategory, setIsShowCategory] = useState(false)

    useEffect(() => {
        const handleReSize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleReSize)
        return () => document.removeEventListener('resize', handleReSize)
    }, [])

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
        isShowCategory,
        setUser,
        setIsLogin,
        handleLogout,
        setIsShowCategory
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export default Provider;