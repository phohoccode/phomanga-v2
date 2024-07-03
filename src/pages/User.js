import { useContext } from 'react';
import backgroundImage from '../assets/background.jpg';
import Context from '../state/Context';

function User() {
    const { user } = useContext(Context)

    return (
        <div className='relative'>
            <div
                style={{ backgroundImage: `url(${backgroundImage})` }}
                className='bg-center bg-no-repeat bg-cover 2xl:h-[400px] mobile:h-[200px] rounded-[16px]'></div>
            <div className='absolute 2xl:bottom-[-70px] 2xl:left-[80px] 2xl:translate-x-0 mobile:left-[50%] mobile:translate-x-[-50%] mobile:bottom-[-110px]'>
                <div className='flex gap-[12px] 2xl:flex-row items-end justify-center mobile:flex-col '>
                    <figure className='rounded-full overflow-hidden 2xl:w-[172px] 2xl:h-[172px] mobile:w-[128px] h-[128px] bg-[#fff] flex items-center justify-center'>
                        <img src={user?.picture} alt={user?.name} />
                    </figure>
                    <h4 className='text-2xl font-[900] mb-[24px] dark:text-[#fff]'>{user?.name}</h4>
                </div>
            </div>
        </div>
    );
}

export default User;