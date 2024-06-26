import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useContext, useEffect, useState } from 'react';
import Context from '../../state/Context';

function Login() {
    const { setIsLogin, setUser } = useContext(Context)

    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        savedUser && setUser(JSON.parse(savedUser))
    }, [])

    const handleLogin = useGoogleLogin({
        onSuccess: credentialResponse => {
            const accessToken = credentialResponse.access_token
            fetchUserInfo(accessToken)
        },
        onError: () => {
            console.log('Login Failed!');
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
            console.log(userInfo);
            localStorage.setItem('user', JSON.stringify(userInfo))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={handleLogin} className="bg-[#10b981] text-sm px-[16px] py-[8px] rounded-full text-[#fff] transition-all hover:opacity-[.8] font-[500]">Đăng nhập</button>
    );
}

export default Login;