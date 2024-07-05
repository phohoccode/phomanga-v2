import { useContext, useEffect, useState } from 'react';
import Context from '../state/Context';
import storage from '../utils'
import toast from 'react-hot-toast';

function User() {
    const { user, setUser, width } = useContext(Context)
    const [avartar, setAvartar] = useState(user?.picture)
    const [background, setBackground] = useState(user?.background)

    useEffect(() => {
        setAvartar(user?.picture)
    }, [user])

    const handleUploadImage = (event, type) => {
        const file = event.target.files[0]
        if (file) {
            const user = storage.get('user', null)
            const reader = new FileReader()
            reader.onloadend = () => {
                if (type === 'avartar') {
                    user.picture = reader.result
                    storage.set('user', user)
                    setAvartar(reader.result);
                    setUser(user)
                    toast.success('Thay đổi ảnh đại diện thành công!', { duration: 1000 })
                } else if (type === 'background') {
                    user.background = reader.result
                    storage.set('user', user)
                    setBackground(reader.result);
                    setUser(user)
                    toast.success('Thay đổi ảnh bìa thành công!', { duration: 1000 })
                }
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className='relative'>
            <div
                style={{ backgroundImage: `url(${background})` }}
                className='bg-center bg-no-repeat bg-cover lg:h-[400px] mobile:h-[200px] rounded-[16px] relative border border-solid border-[#e3e3e3] dark:border-[#636363]'>
                <input className='absolute opacity-0 pointer-events-none' onChange={(event) => handleUploadImage(event, 'background')} type='file' id='background' accept='image/*' />
                <label htmlFor='background' className='absolute bottom-[12px] right-[12px] flex items-center justify-center bg-[#e3e3e3e3] dark:bg-[#636363] py-[6px] px-[12px] rounded-[8px] cursor-pointer gap-[8px] dark:text-[#fff] duration-300 active:scale-[0.95] select-none font-[600]'>
                    <i className="fa-solid fa-camera"></i>
                    {width > 1023 && <span>Chỉnh sửa ảnh bìa</span>}
                </label>
            </div>
            <div className='flex gap-[12px] lg:flex-row lg:items-end justify-center mobile:flex-col mobile:items-center absolute lg:bottom-[-80px] lg:left-[80px] lg:translate-x-0 mobile:left-[50%] mobile:translate-x-[-50%] mobile:bottom-[-110px]'>
                <div className='relative'>
                    <figure className='rounded-full overflow-hidden lg:w-[164px] lg:h-[164px] mobile:w-[128px] h-[128px] bg-[#fff] flex items-center justify-center border-4 border-solid border-[#fff]'>
                        <img src={avartar} alt={user?.name} />
                    </figure>
                    <input className='absolute opacity-0 pointer-events-none' onChange={(event) => handleUploadImage(event, 'avartar')} type='file' id='avartar' accept='image/*' />
                    <label htmlFor='avartar' className='absolute lg:bottom-[12px] lg:right-[12px] mobile:bottom-[12px] mobile:right-[4px] flex items-center justify-center w-[32px] h-[32px] bg-[#e3e3e3] dark:bg-[#636363] dark:text-[#fff] rounded-full cursor-pointer duration-300 active:scale-[0.9]'>
                        <i className="fa-solid fa-camera"></i>
                    </label>
                </div>
                <h4 className='text-2xl font-[900] mb-[24px] dark:text-[#fff]'>{user?.name}</h4>
            </div>
        </div>
    );
}

export default User;