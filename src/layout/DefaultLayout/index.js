import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Context from "../../state/Context";
import { scrollToTop } from "../../utils";
import Footer from "../DefaultLayout/Footer";

function DefaultLayout({ children }) {
    const { width } = useContext(Context)
    const params = useParams()
    const [isShowButtonScroll, setIsShowButtonScroll] = useState(false)

    useEffect(() => {
        scrollToTop()
    }, [params])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 1000) {
                setIsShowButtonScroll(true)
            } else {
                setIsShowButtonScroll(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="bg-[#fff] dark:bg-[#282828] min-h-[100vh]">
            <NavBar />
            <div className="flex mt-[32px] mobile:mt-[16px] pl-[16px] pr-[32px] mobile:pr-[16px] gap-[32px]">
                {width > 1024 && <SideBar />}
                <div className="flex-1">
                    {children}
                </div>
            </div>
            <Footer/>
            <div>
                <Toaster
                    position="top-center"
                    reverseOrder={true}
                    toastOptions={{
                        className: '',
                        duration: 2000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                    }}
                />
            </div>
            {isShowButtonScroll &&
                <button
                    title="Cuộn lên đầu trang"
                    onClick={scrollToTop} 
                    className='w-[40px] flex items-center justify-center h-[40px] rounded-[8px] bg-[#10b981] fixed lg:bottom-[32px] lg:left-[32px] mobile:bottom-[16px] mobile:left-[16px] text-[#fff] animate-fade-in cursor-pointer hover:scale-[1.05] duration-300'>
                    <i className="fa-solid fa-arrow-up"></i>
                </button>
            }
        </div>
    );
}

export default DefaultLayout;