import { useContext } from 'react';
import backgroundImage from '../assets/background.jpg';
import Context from '../state/Context';

function User() {
    const { user } = useContext(Context)

    return (
        <div className='relative'>
            <div
                style={{ backgroundImage: `url(${backgroundImage})` }}
                className='bg-center bg-no-repeat bg-cover h-[400px] rounded-[16px]'></div>
            <div className='absolute bottom-[-70px] left-[80px]'>
                <div className='flex gap-[12px] items-end justify-center'>
                    <figure className='rounded-full overflow-hidden w-[172px] h-[172px] bg-[#fff] flex items-center justify-center'>
                        <img src={user?.picture} alt={user?.name} />
                    </figure>
                    <h4 className='text-2xl font-[900] mb-[24px]'>{user?.name}</h4>
                </div>
            </div>
        </div>
    );
}

export default User;