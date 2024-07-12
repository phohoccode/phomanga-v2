import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import logo from '../../assets/logo.png'
import Login from "../components/Login";
import Context from "../../state/Context";
import User from "../components/User";
import NavBarMobile from "./NavBarMobile";
import useFetch from "../../hooks/UseFetch";
import { category } from "../../api";
import { setScrollDocument } from "../../utils";

function NavBar() {
    const navigate = useNavigate()
    const { isLogin, width, theme, setTheme } = useContext(Context)
    const [valueSearch, setValueSearch] = useState('')
    const [isShowNavBarMobile, setIsShowNavBarMobile] = useState(false)
    const [data] = useFetch(category)

    const handleKeyDownSearch = (event, value) => {
        if (event.key === 'Enter' && value !== '') {
            navigate(`/search/${value}`)
        }
    }

    useEffect(() => {
        setScrollDocument(isShowNavBarMobile)
    }, [isShowNavBarMobile])

    return (
        <div className="flex items-center justify-between sticky top-0 left-0 right-0 h-[60px] bg-[#fff] text-[#000] z-[999] lg:px-[32px] md:px-[23px] px-[16px] border-b border-slate-900/10 dark:bg-[#282828] dark:border-[#cccccc5b]">
            {width < 1024 &&
                <button
                    onClick={() => setIsShowNavBarMobile(true)}
                    className="text-[30px] flex items-center justify-center dark:text-[#fff] w-[60px] h-[60px] ml-[-16px]">
                    <i className="fa-solid fa-bars"></i>
                </button>}
            <div className="flex gap-[12px] items-center">
                {width > 1024 &&
                    <NavLink className={'flex-shrink-0 w-[40px] h-[40px] rounded-[8px] overflow-hidden'} to='/'>
                        <img src={logo} alt="logo"/>
                    </NavLink>}
                <NavLink to='/' className="lg:text-2xl mobile:text-xl text-[#10b981] font-[900]">
                    PHOMANGA-V2
                </NavLink>
            </div>
            {width > 1024 &&
                <div className="h-[40px] flex items-center p-[4px] border-2 border-solid border-[#ccc] dark:border-[#636363] rounded-[8px] ml-[12px] w-[420px] focus-within:border-[#10b981] shadow-sm hover:border-[rgb(16,185,129)] dark:hover:border-[#808080] dark:focus-within:border-[#808080]">
                    <input
                        value={valueSearch}
                        onChange={e => setValueSearch(e.target.value)}
                        onKeyDown={(event) => handleKeyDownSearch(event, valueSearch)}
                        className="outline-none w-full ml-[12px] bg-[#fff] color-[#000] font-[600] bg-transparent dark:text-[#fff]"
                        placeholder="Tìm kiếm truyện..."
                    />
                    {valueSearch.length > 0 &&
                        <button
                            title="Xoá nội dung"
                            className="dark:text-[#fff] duration-300 hover:text-[#10b981]" onClick={() => setValueSearch("")}>
                            <i className="fa-solid fa-xmark p-[8px]"></i>
                        </button>}
                    <NavLink
                        className={`px-[8px] dark:text-[#fff] ${valueSearch !== '' ? 'pointer-events-auto' : 'pointer-events-none'}`}
                        to={`/search/${valueSearch}`}>
                        <i className="text-inherit fa-solid fa-magnifying-glass"></i>
                    </NavLink>
                </div>}
            <div className="flex gap-[12px] items-center">
                {width > 1024 && (theme === 'light' ?
                    <Light setTheme={setTheme} /> :
                    <Dark setTheme={setTheme} />)}
                {isLogin ? <User /> : <Login />}
            </div>
            {width < 1024 && isShowNavBarMobile && data &&
                <NavBarMobile
                    width={width}
                    category={data}
                    setIsShowNavBarMobile={setIsShowNavBarMobile}
                    handleKeyDownSearch={handleKeyDownSearch}
                />}
        </div>
    );
}

export default NavBar;

const Light = ({ setTheme }) => {
    return (
        <svg onClick={() => setTheme('dark')} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[30px] h-[30px] mr-[12px] cursor-pointer"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" className="stroke-[#000]"></path><path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836" className="stroke-[#000] dark:stroke-[#fff]"></path></svg>
    )
}

const Dark = ({ setTheme }) => {
    return (
        <svg onClick={() => setTheme('light')} viewBox="0 0 24 24" fill="none" className="w-[30px] h-[30px] mr-[12px] cursor-pointer"><path fillRule="evenodd" clipRule="evenodd" d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"></path><path d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z" className="fill-[#fff]"></path><path fillRule="evenodd" clipRule="evenodd" d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z" className="fill-[#fff]"></path></svg>
    )
}