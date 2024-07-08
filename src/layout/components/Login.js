import { useGoogleLogin } from '@react-oauth/google';
import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

import Context from '../../state/Context';
import storage from '../../utils'
import backgroundImage from '../../assets/background.jpg'

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
            userInfo['background'] = backgroundImage
            setUser(userInfo)
            setIsLogin(true)
            storage.set('user', userInfo)
            toast.success(`Xin chào! ${userInfo?.name}`, { duration: 1500 })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={handleLogin} className="bg-[#10b981] text-sm px-[16px] py-[8px] rounded-[8px] text-[#fff] font-[600] transition-all hover:opacity-[.8]">Đăng nhập</button>
    );
}

export default Login;