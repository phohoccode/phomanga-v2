import { NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
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
            <div ref={modalRef} className="p-[16px] relative w-[80%] bg-[#fff] dark:bg-[#282828] dark:text-[#fff] h-full left-0 overflow-y-auto overscroll-y-none animate-slide-in">
                <div className="flex p-[16px] items-center justify-between absolute top-0 left-0 right-0">
                    <button
                        onClick={handleCloseModal}
                        className="text-[30px]">
                        <i className="fa-solid fa-xmark"></i>
                    </button >
                    <div onClick={handleSetTheme} className="w-[30px] h-[30px] cursor-pointer">
                        <i className="text-[30px] fa-solid fa-circle-half-stroke"></i>
                    </div>
                </div>
                <div className="h-[40px] flex items-center px-[8px] py-[4px] border-2 border-solid border-[#ccc] rounded-[8px] transition-all w-full focus-within:border-[#10b981] mt-[64px]">
                    <input
                        value={valueSearch}
                        onChange={e => setValueSearch(e.target.value)}
                        onKeyDown={(e) => handleSearch(e, valueSearch)}
                        className="outline-none w-full ml-[12px] bg-[#fff] color-[#000] bg-transparent"
                        placeholder="Tìm kiếm..."
                    />
                    <NavLink className={`px-[8px] transition-all hover:color-[#10b981] ${valueSearch !== '' ? 'pointer-events-auto' : 'pointer-events-none'}`} to={`/search/${valueSearch}`}>
                        <i className="text-inherit fa-solid fa-magnifying-glass"></i>
                    </NavLink>
                </div>
                <ul className="mt-[12px]">
                    <li onClick={handleCloseModal}>
                        <NavLink to='/' className={`block text-lg hover:text-[#10b981] transition-all py-[8px] ${pathname === '/' ? 'text-[#10b981] font-[900]' : 'text-[#000] dark:text-[#fff]'}`}>Trang chủ</NavLink>
                    </li>
                    <li onClick={handleCloseModal}>
                        <NavLink to='/archive' className={`block text-lg hover:text-[#10b981] transition-all py-[8px] ${pathname === '/archive' ? 'text-[#10b981] font-[900]' : 'text-[#000] dark:text-[#fff]'}`}>Kho lưu trữ</NavLink>
                    </li>
                    <li onClick={handleCloseModal}>
                        <NavLink to='history' className={`block text-lg hover:text-[#10b981] transition-all py-[8px] ${pathname === '/history' ? 'text-[#10b981] font-[900]' : 'text-[#000] dark:text-[#fff]'}`} >Lịch sử đã xem</NavLink>
                    </li>
                    <li>
                        <div onClick={() => setIsShowCategory(!isShowCategory)} className="flex items-center text-lg gap-[8px] py-[8px]">
                            <span>Thể loại</span>
                            <i className="fa-solid fa-angle-right"></i>
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