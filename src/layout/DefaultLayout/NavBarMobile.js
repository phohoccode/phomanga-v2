import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState, useContext } from "react";
import Category from "../components/Category";
import Context from "../../state/Context";
import useFetch from "../../hooks/UseFetch";
import { category } from "../../api";

function NavBarMobile({ setIsShowNavBarMobile }) {
    const [data] = useFetch(category)
    const { isShowCategory, setIsShowCategory } = useContext(Context)
    const [valueSearch, setValueSearch] = useState('')
    const containerRef = useRef()
    const modalRef = useRef()

    const handleCloseModal = () => {
        if ((modalRef.current && containerRef.current)) {
            modalRef.current.classList.add('animate-slide-out')
            containerRef.current.classList.add('animate-fade-out')
            setTimeout(() => {
                setIsShowNavBarMobile(false)
            }, 400)
        }
    }

    const handleWrapperClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal()
        }
    };

    return (
        <div
            ref={containerRef}
            onClick={handleWrapperClick}
            className="fixed inset-0 bg-[#0000004d] min-h-[100%] animate-fade-in">
            <div ref={modalRef} className="p-[16px] relative w-[80%] bg-[#fff] h-full left-0 overflow-y-auto overscroll-y-none animate-slide-in">
                <button
                    onClick={handleCloseModal}
                    className="flex ml-auto text-[30px] p-[16px] mt-[-16px] mr-[-16px]">
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="h-[40px] flex items-center px-[8px] py-[4px] border-2 border-solid border-[#ccc] rounded-[8px] transition-all w-full focus-within:border-[#10b981] mt-[12px]">
                    <input
                        value={valueSearch}
                        onChange={e => setValueSearch(e.target.value)}
                        className="outline-none w-full ml-[12px] bg-[#fff] color-[#000]"
                        placeholder="Tìm kiếm..."
                    />
                    <NavLink className='px-[8px] transition-all hover:color-[#10b981]' to='/search'>
                        <i className="text-inherit fa-solid fa-magnifying-glass"></i>
                    </NavLink>
                </div>
                <ul className="mt-[12px]">
                    <li onClick={handleCloseModal}>
                        <NavLink to='/' className='block hover:text-[#10b981] transition-all py-[8px]'>Trang chủ</NavLink>
                    </li>
                    <li onClick={handleCloseModal}>
                        <NavLink to='/archive' className='block hover:text-[#10b981] transition-all py-[8px]'>Kho lưu trữ</NavLink>
                    </li>
                    <li onClick={handleCloseModal}>
                        <NavLink to='history' className='block hover:text-[#10b981] transition-all py-[8px]' >Lịch sử đã xem</NavLink>
                    </li>
                    <li>
                        <div onClick={() => setIsShowCategory(!isShowCategory)} className="flex items-center gap-[8px] py-[8px]">
                            <span>Thể loại</span>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        {isShowCategory && <Category data={data && data}/>}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBarMobile;