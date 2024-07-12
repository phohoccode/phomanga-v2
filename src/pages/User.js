import { Fragment, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Context from '../state/Context';
import storage, { formatTime, handleSetActivity } from '../utils'
import DiaLog from '../layout/components/Dialog';

function User() {
    const { user, setUser, setIsOpenDiaLog, isOpenDiaLog } = useContext(Context)
    const [avartar, setAvartar] = useState(user?.picture)
    const [background, setBackground] = useState(user?.background)
    const [recentActivity, setRecentActivity] = useState(() => {
        const recentActivity = 
            storage.get('recent-activity', {})
        return recentActivity?.[user?.email] || []
    })

    useEffect(() => {
        setAvartar(user?.picture)
        setBackground(user?.background)
        setRecentActivity(() => {
            const recentActivity = 
                storage.get('recent-activity', {})
            return recentActivity?.[user?.email]?.reverse() || []
        })
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
                    handleSetActivity(user, '', 'changeAvartar')
                } else if (type === 'background') {
                    user.background = reader.result
                    storage.set('user', user)
                    setBackground(reader.result);
                    setUser(user)
                    toast.success('Thay đổi ảnh bìa thành công!', { duration: 1000 })
                    handleSetActivity(user, '', 'changeBackground')
                }
            }
            reader.readAsDataURL(file);
        }
    }

    const handleDeleteActivity = () => {
        setRecentActivity([])
        storage.set('recent-activity', {})
        toast.success('Đã xoá hoạt động thành công!', { duration: 1000 })
    }

    return (
        <Fragment>
            <div className='relative'>
                <div
                    style={{ backgroundImage: `url(${background})` }}
                    className='bg-center bg-no-repeat bg-cover lg:h-[400px] mobile:h-[240px] rounded-[16px] relative border border-solid border-[#e3e3e3] dark:border-[#636363]'>
                    <input className='absolute opacity-0 pointer-events-none' onChange={(event) => handleUploadImage(event, 'background')} type='file' id='background' accept='image/*' />
                    <label htmlFor='background' className='absolute lg:top-auto lg:bottom-[12px] lg:right-[12px] mobile:right-[12px] mobile:top-[12px] mobile:bottom-auto flex items-center justify-center bg-[#e3e3e3e3] dark:bg-[#636363] py-[6px] px-[12px] rounded-[8px] cursor-pointer gap-[8px] dark:text-[#fff] duration-300 active:scale-[0.95] select-none font-[600]'>
                        <i className="fa-solid fa-camera"></i>
                        <span>Chỉnh sửa ảnh bìa</span>
                    </label>
                </div>
                <div className='absolute lg:bottom-[-120px] lg:left-[80px]  mobile:left-[32px] mobile:bottom-[-80px]'>
                    <div className='relative lg:w-[164px] lg:h-[164px] mobile:w-[128px] h-[128px]'>
                        <figure className='rounded-full overflow-hidden bg-[#fff] flex items-center w-full h-full justify-center border-4 border-solid border-[#fff]'>
                            <img src={avartar} alt={user?.name} />
                        </figure>
                        <input className='absolute opacity-0 pointer-events-none' onChange={(event) => handleUploadImage(event, 'avartar')} type='file' id='avartar' accept='image/*' />
                        <label htmlFor='avartar' className='absolute lg:bottom-[12px] lg:right-[12px] mobile:bottom-[12px] mobile:right-[0] flex items-center justify-center w-[32px] h-[32px] bg-[#e3e3e3] dark:bg-[#636363] dark:text-[#fff] rounded-full cursor-pointer duration-300 active:scale-[0.9]'>
                            <i className="fa-solid fa-camera"></i>
                        </label>
                    </div>
                    <h4 className='text-center block text-2xl mt-[12px] font-[900] lg:mb-[24px] dark:text-[#fff]'>{user?.name}</h4>
                </div>
            </div>
            <div className='mt-[120px] flex gap-[12px] lg:flex-row mobile:flex-col mb-[24px] lg:px-[24px]'>
                <div className='rounded-[16px] p-[16px] border border-solid border-[#e3e3e3] dark:border-[#636363] dark:text-[#fff] flex-1 h-full'>
                    <h4 className='lg:text-2xl mobile:text-base font-[600]'>Giới thiệu</h4>
                    <div className='mt-[12px] flex gap-[12px] items-center'>
                        <span className='font-[600] text-[#10b981]'>Tên người dùng:</span>
                        <span className='font-[600]'>{user?.name}</span>
                    </div>
                    <div className='mt-[12px] flex gap-[12px] items-center'>
                        <span className='font-[600] text-[#10b981]'>Email:</span>
                        <span className='font-[600] break-word'>{user?.email}</span>
                    </div>
                </div>
                <div className='rounded-[16px] p-[16px] border border-solid border-[#e3e3e3] dark:border-[#636363] dark:text-[#fff] flex-[2] h-full'>
                    <div className='flex justify-between items-center mb-[16px]'>
                        <h4 className='lg:text-2xl mobile:text-base font-[600]'>
                            Hoạt động gần đây ({recentActivity.length})
                        </h4>
                        {recentActivity.length > 0 &&
                            <button
                                onClick={() => setIsOpenDiaLog(true)}
                                className='py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-base duration-300 hover:scale-[1.05] bg-[#d90429] text-[#fff]'>Xoá hoạt động
                            </button>}
                    </div>
                    {recentActivity.length > 0 ? (
                        <ul className='flex flex-col gap-[8px]'>
                            {recentActivity.map((activity, index) => (
                                <li key={index} className='flex gap-[12px] items-center break-word'>
                                    <p>{activity?.value}</p>
                                    <span>·</span>
                                    <span className='text-sm whitespace-nowrap text-[#969696]'>{formatTime(activity?.time)}</span>
                                </li>
                            ))}
                        </ul>) : (
                        <span className='font-[600]'>Chưa có hoạt động gần đây</span>
                    )}
                </div>
            </div>

            {isOpenDiaLog &&
                <DiaLog
                    onDeleteActivity={handleDeleteActivity}
                    text='Hoạt động gần đây sẽ bị xoá vĩnh viễn?'
                />}
        </Fragment>
    );
}

export default User;