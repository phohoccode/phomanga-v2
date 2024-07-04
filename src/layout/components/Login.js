import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useContext, useEffect, useState } from 'react';
import Context from '../../state/Context';
import toast from 'react-hot-toast';
import storage from '../../utils'

function Login() {
    const { setIsLogin, setUser } = useContext(Context)

    useEffect(() => {
        const savedUser = storage.get('user', null)
        savedUser && setUser(savedUser)
    }, [])

    const handleLogin = useGoogleLogin({
        onSuccess: credentialResponse => {
            const accessToken = credentialResponse.access_token
            fetchUserInfo(accessToken)
        },
        onError: () => {
            console.log('Login Failed!');
            toast.error('Đăng nhập thất bại!', { duration: 1000 })
        }
    })

    const fetchUserInfo = async (accessToken) => {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            const userInfo = await response.json()
            setUser(userInfo)
            setIsLogin(true)
            storage.set('user', userInfo)
            toast.success(`Xin chào! ${userInfo?.name}`, { duration: 1500 })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={handleLogin} className="bg-[#10b981] text-sm px-[16px] py-[8px] rounded-[8px] text-[#fff] transition-all hover:opacity-[.8] font-[500]">Đăng nhập</button>
    );
}

export default Login;