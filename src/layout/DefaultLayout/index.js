import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { useContext, useEffect, useState } from "react";
import Context from "../../state/Context";
import { useParams } from "react-router-dom";
import { scrollToTop } from "../../utils";
import { Toaster } from "react-hot-toast";
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
            if (window.scrollY >= 2000) {
                setIsShowButtonScroll(true)
            } else {
                setIsShowButtonScroll(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div>
            <NavBar />
            <div className="flex mt-[24px] mobile:mt-[16px] pl-[16px] pr-[32px] mobile:pr-[16px] gap-[32px]">
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
                        duration: 5000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                    }}
                />
            </div>
            {isShowButtonScroll &&
                <div
                    onClick={scrollToTop} 
                    className='w-[40px] flex items-center justify-center h-[40px] rounded-[8px] bg-[#10b981] fixed bottom-[32px] left-[32px] text-[#fff] animate-fade-in cursor-pointer'>
                    <i className="fa-solid fa-arrow-up"></i>
                </div>
            }
        </div>
    );
}

export default DefaultLayout;