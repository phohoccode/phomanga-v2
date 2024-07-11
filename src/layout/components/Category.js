import { Fragment, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import Context from '../../state/Context'

function Category({ data, setIsShowCategory, onCloseModalMobile }) {
    const { width } = useContext(Context)
    const { pathname } = useLocation()
    const containerRef = useRef()
    const modalRef = useRef()

    const handleCloseModal = () => {
        if ((modalRef.current && containerRef.current)) {
            setIsShowCategory(false)
        }
    }

    const handleWrapperClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal()
        }
    };

    return (
        <Fragment>
            {width > 1024 ? (
                <div
                    onClick={handleWrapperClick}
                    ref={containerRef}
                    className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[999] animate-fade-in">
                    <div
                        ref={modalRef}
                        className="absolute bg-[#fff] dark:bg-[#2f2f2f] shadow-custom top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%] rounded-[16px] min-w-[60%] h-auto border border-solid border-[#e3e3e3] dark:border-[#636363]">
                        <div className="flex justify-between p-[12px] items-center border-b-[1px] border-solid border-[#e3e3e3] dark:border-[#636363]">
                            <h4 className="lg:text-2xl mobile:text-xl font-[600] dark:text-[#fff]">Thể loại</h4>
                            <button className="flex items-center justify-center w-[44px] h-[44px] rounded-full duration-300 hover:bg-[#e3e3e3] dark:hover:bg-[#636363]" onClick={handleCloseModal}>
                                <i className="dark:text-[#fff] text-[24px] fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <ul className="flex flex-wrap gap-[12px] p-[16px]">
                            {data?.data?.items.map((category, index) => (
                                <li
                                    onClick={handleCloseModal}
                                    className="flex-auto" key={index}>
                                    <Link
                                        className={`block p-[8px]  rounded-[8px] transition-all hover:bg-[#10b981] hover:text-[#fff] text-center cursor-pointer select-none ${pathname === `/detail/the-loai/${category?.slug}` ? 'text-[#10b981] font-[900]' : 'text-[#000] dark:text-[#fff]'}`}
                                        to={`/detail/the-loai/${category?.slug}`}>
                                            {category?.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>) : (
                <ul className='animate-height-in duration-300 overflow-y-auto h-[45vh] overscroll-y-none ml-[12px]'>
                    {data?.data?.items.map((category, index) => (
                        <li key={index}>
                            <Link
                                onClick={onCloseModalMobile}
                                className={`py-[8px] block ${pathname === `/detail/the-loai/${category?.slug}` ? 'text-[#10b981] font-[900]' : 'text-[#000] dark:text-[#fff]'}`}
                                to={`/detail/the-loai/${category?.slug}`}>
                                {category?.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </Fragment>
    );
}

export default Category;