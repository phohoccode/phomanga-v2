import { Link } from 'react-router-dom';
import { useContext } from 'react';

import notfound from '../assets/notfound.jpg'
import notfound1 from '../assets/notfound.png'
import Context from '../state/Context';

function NotFound() {
    const theme = useContext(Context)

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='lg:w-[50vw] lg:h-[420px] mobile:w-full h-[300px] bg-cover bg-repeat bg-center ' style={{ backgroundImage: `url(${theme === 'light' ? notfound : notfound1})` }}></div>
            <p className='dark:text-[#fff] text-center text-3xl font-[900]'>Không tìm thấy nội dung!</p>
            <p className='dark:text-[#fff] text-center text-lg mt-[8px]'>URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.</p>
            <p className='dark:text-[#fff] text-center text-lg mt-[8px]'> Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì dùng URL đã lưu.</p>
            <Link to='/' className='mt-[24px] py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg transition-all hover:scale-[1.05] bg-[#10b981] text-[#fff]'>Về trang chủ</Link>
        </div>
    );
}

export default NotFound;