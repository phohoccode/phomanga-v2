import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Category from "../components/Category";
import useFetch from '../../hooks/UseFetch'
import { category } from "../../api";
import Context from "../../state/Context";

function SideBar() {
    const { quantityComicArchive, quantityComicHistory } = useContext(Context)
    const [isShowCategory, setIsShowCategory] = useState(false)
    const { pathname } = useLocation()
    const [data] = useFetch(category)

    useEffect(() => {
        isShowCategory ?
            document.body.style.overflowY = 'hidden' :
            document.body.style.overflowY = 'auto'
    }, [isShowCategory])

    return (
        <div className="flex-shrink-0">
            <ul className="sticky top-[76px] flex flex-col gap-y-[6px]">
                <li>
                    <NavLink
                        to='/'
                        className={`flex flex-col items-center justify-center w-[80px] h-[80px] gap-[8px]  select-none rounded-[16px] hover:bg-[#e8ebed] dark:hover:bg-[rgba(204,204,204,0.2)] dark:hover:text-[#fff] ${pathname === '/' ? 'bg-[#e8ebed] dark:bg-[rgba(204,204,204,0.2)] dark:text-[#fff]' : 'bg-[#fff] dark:bg-transparent dark:text-[#fff]'}`}>
                        <i className="text-[20px] fa-solid fa-house"></i>
                        <span className="text-xs font-[500]">Trang chủ</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/detail/danh-sach/truyen-moi'
                        className={`flex flex-col items-center justify-center w-[80px] h-[80px] gap-[8px]  select-none rounded-[16px] hover:bg-[#e8ebed] dark:hover:bg-[rgba(204,204,204,0.2)] dark:hover:text-[#fff] ${pathname === '/detail/danh-sach/truyen-moi' ? 'bg-[#e8ebed] dark:bg-[rgba(204,204,204,0.2)] dark:text-[#fff]' : 'bg-[#fff] dark:bg-transparent dark:text-[#fff]'}`}>
                        <i className="text-[20px] fa-solid fa-rotate"></i>
                        <span className="text-xs font-[500]">Mới nhất</span>
                    </NavLink>
                </li>
                <li className="relative">
                    <NavLink
                        to='/archive'
                        className={`flex flex-col items-center justify-center w-[80px] h-[80px] gap-[8px]  select-none rounded-[16px] hover:bg-[#e8ebed] dark:hover:bg-[rgba(204,204,204,0.2)] dark:hover:text-[#fff] ${pathname === '/archive' ? 'bg-[#e8ebed] dark:bg-[rgba(204,204,204,0.2)] dark:text-[#fff]' : 'bg-[#fff] dark:bg-transparent dark:text-[#fff]'}`}>
                        <i className="text-[20px] fa-regular fa-bookmark"></i>
                        <span className="text-xs font-[500]">Kho lưu trữ</span>
                    </NavLink>
                    {quantityComicArchive > 0 &&
                        <div className="absolute right-[-4px] top-[-4px] flex items-center justify-center">
                            <span className="w-[20px] h-[20px] bg-[#10b9817a] rounded-full animate-ping"></span>
                            <span className="absolute rounded-full w-[20px] h-[20px] flex items-center shadow-sm justify-center bg-[#10b981] text-[#fff] text-xs">{quantityComicArchive}</span>
                        </div>}
                </li>
                <li className="relative">
                    <NavLink
                        to='/history'
                        className={`flex flex-col items-center justify-center w-[80px] h-[80px] gap-[8px]  select-none rounded-[16px] hover:bg-[#e8ebed] dark:hover:bg-[rgba(204,204,204,0.2)] dark:hover:text-[#fff] ${pathname === '/history' ? 'bg-[#e8ebed] dark:bg-[rgba(204,204,204,0.2)] dark:text-[#fff]' : 'bg-[#fff] dark:bg-transparent dark:text-[#fff]'}`}>
                        <i className="text-[20px] fa-solid fa-clock-rotate-left"></i>
                        <span className="text-xs font-[500]">Lịch sử</span>
                    </NavLink>
                    {quantityComicHistory > 0 &&
                        <div className="absolute right-[-4px] top-[-4px] flex items-center justify-center">
                            <span className="w-[20px] h-[20px] bg-[#10b9817a] rounded-full animate-ping"></span>
                            <span className="absolute rounded-full w-[20px] h-[20px] flex items-center shadow-sm justify-center bg-[#10b981] text-[#fff] text-xs">{quantityComicHistory}</span>
                        </div>}
                </li>
                <li onClick={() => setIsShowCategory(true)}>
                    <div className='cursor-pointer flex flex-col items-center justify-center w-[80px] h-[80px] rounded-[16px] overflow-hidden hover:bg-[#e8ebed] dark:hover:bg-[rgba(204,204,204,0.2)] dark:hover:text-[#fff] select-none bg-[#fff] dark:bg-transparent dark:text-[#fff] gap-[8px]'>
                        <i className="text-[20px] fa-solid fa-table-cells-large"></i>
                        <span className="text-xs font-[500]">Thể loại</span>
                    </div>
                </li>
            </ul>
            {isShowCategory &&
                <Category
                    isShowCategory={isShowCategory}
                    setIsShowCategory={setIsShowCategory}
                    data={data && data}
                />}
        </div>
    );
}

export default SideBar;