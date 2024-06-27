import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import Category from "../components/Category";
import useFetch from '../../hooks/UseFetch'
import { category } from "../../api";

function SideBar() {
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
            <ul className="sticky top-[80px] flex flex-col gap-y-[6px]">
                <li className="bg-[#fff] overflow-hidden rounded-[16px] transition-all duration-300 hover:bg-[#e8ebed]">
                    <NavLink
                        to='/'
                        className={classNames('flex flex-col items-center justify-center w-[80px] h-[80px] gap-[8px]', {
                            'bg-[#e8ebed]': pathname === '/'
                        })}>
                        <i className="text-[20px] fa-solid fa-house"></i>
                        <span className="text-xs font-[500]">Trang chủ</span>
                    </NavLink>
                </li>
                <li className="bg-[#fff] overflow-hidden rounded-[16px] transition-all duration-300 hover:bg-[#e8ebed]">
                    <NavLink
                        to='/detail/danh-sach/truyen-moi'
                        className={classNames('flex flex-col items-center justify-center w-[80px] h-[80px] gap-[8px]', {
                            'bg-[#e8ebed]': pathname === '/detail/danh-sach/truyen-moi'
                        })}>
                        <i className="text-[20px] fa-solid fa-rotate"></i>
                        <span className="text-xs font-[500]">Mới nhất</span>
                    </NavLink>
                </li>
                <li className="bg-[#fff] overflow-hidden rounded-[16px] transition-all duration-300 hover:bg-[#e8ebed]">
                    <NavLink
                        to='/archive'
                        className={classNames('flex flex-col items-center justify-center w-[80px] h-[80px] gap-[8px]', {
                            'bg-[#e8ebed]': pathname === '/archive'
                        })}>
                        <i className="text-[20px] fa-regular fa-bookmark"></i>
                        <span className="text-xs font-[500]">Kho lưu trữ</span>
                    </NavLink>
                </li>
                <li className="bg-[#fff] overflow-hidden rounded-[16px] transition-all duration-300 hover:bg-[#e8ebed]">
                    <NavLink
                        to='/history'
                        className={classNames('flex flex-col items-center justify-center w-[80px] h-[80px] gap-[8px]', {
                            'bg-[#e8ebed]': pathname === '/history'
                        })}>
                        <i className="text-[20px] fa-solid fa-clock-rotate-left"></i>
                        <span className="text-xs font-[500]">Lịch sử</span>
                    </NavLink>
                </li>
                <li className="transition-all duration-300 rounded-[16px] overflow-hidden hover:bg-[#e8ebed]" onClick={() => setIsShowCategory(true)}>
                    <div className={classNames('cursor-pointer flex flex-col items-center justify-center w-[80px] h-[80px] rounded-[16px] gap-[8px]')}>
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