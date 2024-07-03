import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png'
import Login from "../components/Login";
import { useContext, useEffect, useState } from "react";
import Context from "../../state/Context";
import User from "../components/User";
import NavBarMobile from "./NavBarMobile";
import useFetch from "../../hooks/UseFetch";
import { category } from "../../api";
import { Light, Dark } from "../../assets";
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
        <div className="flex items-center justify-between sticky top-0 left-0 right-0 h-[60px] bg-[#fff] text-[#000] z-[999] lg:px-[32px] md:px-[23px] px-[16px] border-b border-slate-900/10 dark:bg-[#282828]">
            {width < 1024 &&
                <div
                    onClick={() => setIsShowNavBarMobile(true)}
                    className="text-[30px] cursor-pointer dark:text-[#fff]">
                    <i className="fa-solid fa-bars"></i>
                </div>}
            <div className="flex gap-[12px] items-center">
                {width > 1024 &&
                    <NavLink className={'flex-shrink-0 w-[40px] h-[40px] rounded-[8px] overflow-hidden'} to='/'>
                        <img className="" src={logo} />
                    </NavLink>}
                <h4 className="text-2xl text-[#10b981] font-[900]">PHOMANGA-V2</h4>
            </div>
            {width > 1024 &&
                <div className="h-[40px] flex items-center p-[4px] border-2 border-solid border-[#ccc] rounded-[8px] transition-all ml-[12px] w-[420px] focus-within:border-[#10b981] shadow-sm hover:border-[#10b981]">
                    <input
                        value={valueSearch}
                        onChange={e => setValueSearch(e.target.value)}
                        onKeyDown={(event) => handleKeyDownSearch(event, valueSearch)}
                        className="outline-none w-full ml-[12px] bg-[#fff] color-[#000] font-[600] bg-transparent dark:text-[#fff]"
                        placeholder="Tìm kiếm..."
                    />
                    {valueSearch.length > 0 &&
                        <button className="dark:text-[#fff]" onClick={() => setValueSearch("")}>
                            <i className="fa-solid fa-xmark p-[8px]"></i>
                        </button>}
                    <NavLink
                        className={`px-[8px] transition-all hover:text-[#10b981] dark:text-[#fff] ${valueSearch !== '' ? 'pointer-events-auto' : 'pointer-events-none'}`}
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