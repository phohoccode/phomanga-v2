import { NavLink, useLocation } from "react-router-dom";
import { useContext, useRef, useState } from "react";

import Category from "../components/Category";
import Context from "../../state/Context";

function NavBarMobile({ setIsShowNavBarMobile, category, handleKeyDownSearch }) {
    const { setTheme } = useContext(Context)
    const { pathname } = useLocation()
    const [isShowCategory, setIsShowCategory] = useState(false)
    const [valueSearch, setValueSearch] = useState('')
    const containerRef = useRef()
    const modalRef = useRef()

    const handleCloseModal = () => {
        if ((modalRef.current && containerRef.current)) {
            modalRef.current.classList.add('animate-slide-out')
            containerRef.current.classList.add('animate-fade-out')
            setTimeout(() => {
                setIsShowNavBarMobile(false)
            }, 200)
        }
    }

    const handleWrapperClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal()
        }
    };

    const handleSearch = (e, valueSearch) => {
        handleKeyDownSearch(e, valueSearch)
        if (e.key === 'Enter') {
            handleCloseModal()
        }
    }

    const handleSetTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
        handleCloseModal()
    }

    return (
        <div
            ref={containerRef}
            onClick={handleWrapperClick}
            className="fixed inset-0 bg-[#0000004d] min-h-[100%] animate-fade-in">
            <div ref={modalRef} className="relative w-[80%] bg-[#fff] dark:bg-[#2f2f2f] dark:text-[#fff rounded-r-[16px] h-full left-0 animate-slide-in p-[16px]">
                <div className="flex items-center justify-between absolute top-0 left-0 right-0 dark:text-[#fff]">
                    <button
                        onClick={handleSetTheme}
                        className="cursor-pointer w-[60px] flex items-center justify-center h-[60px]">
                        <i className="text-[30px] fa-solid fa-circle-half-stroke"></i>
                    </button>
                    <button
                        onClick={handleCloseModal}
                        className="text-[30px] w-[60px] flex items-center justify-center h-[60px]">
                        <i className="fa-solid fa-xmark"></i>
                    </button >
                </div>
                <div className="h-[40px] flex items-center px-[8px] py-[4px] border-2 border-solid border-[#ccc] rounded-[8px] transition-all w-full focus-within:border-[#10b981] mt-[64px]">
                    <input
                        value={valueSearch}
                        onChange={e => setValueSearch(e.target.value)}
                        onKeyDown={(e) => handleSearch(e, valueSearch)}
                        className="outline-none w-full ml-[6px] bg-[#fff] dark:text-[#fff] bg-transparent"
                        placeholder="Tìm kiếm truyện..."
                    />
                    <NavLink onClick={handleCloseModal} className={`px-[8px] transition-all dark:text-[#fff] hover:text-[#10b981] ${valueSearch !== '' ? 'pointer-events-auto' : 'pointer-events-none'}`} to={`/search/${valueSearch}`}>
                        <i className="text-inherit fa-solid fa-magnifying-glass"></i>
                    </NavLink>
                </div>
                <ul className="mt-[12px]">
                    <li onClick={handleCloseModal}>
                        <NavLink to='/' className={`block text-lg hover:text-[#10b981] transition-all py-[8px] ${pathname === '/' ? 'text-[#10b981] font-[900]' : 'text-[#000] dark:text-[#fff]'}`}>Trang chủ</NavLink>
                    </li>
                    <li onClick={handleCloseModal}>
                        <NavLink to='/detail/danh-sach/truyen-moi' className={`block text-lg hover:text-[#10b981] transition-all py-[8px] ${pathname === '/detail/danh-sach/truyen-moi' ? 'text-[#10b981] font-[900]' : 'text-[#000] dark:text-[#fff]'}`}>Truyện mới nhất</NavLink>
                    </li>
                    <li onClick={handleCloseModal}>
                        <NavLink to='/archive' className={`block text-lg hover:text-[#10b981] transition-all py-[8px] ${pathname === '/archive' ? 'text-[#10b981] font-[900]' : 'text-[#000] dark:text-[#fff]'}`}>Kho lưu trữ</NavLink>
                    </li>
                    <li onClick={handleCloseModal}>
                        <NavLink to='/history' className={`block text-lg hover:text-[#10b981] transition-all py-[8px] ${pathname === '/history' ? 'text-[#10b981] font-[900]' : 'text-[#000] dark:text-[#fff]'}`} >Lịch sử đã xem</NavLink>
                    </li>
                    <li>
                        <div onClick={() => setIsShowCategory(!isShowCategory)} className="flex items-center text-lg gap-[8px] py-[8px] dark:text-[#fff]">
                            <span>Thể loại</span>
                            {!isShowCategory ? (<i className="fa-solid fa-angle-right"></i>) : (
                                <i className="fa-solid fa-angle-down"></i>
                            )}
                        </div>
                        {isShowCategory &&
                            <Category
                                data={category}
                                onCloseModalMobile={handleCloseModal}
                            />}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBarMobile;