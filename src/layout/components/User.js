import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Context from "../../state/Context";
import { setScrollDocument } from "../../utils";

function User() {
    const { user, handleLogout } = useContext(Context)
    const [isShowUser, setIsShowUser] = useState(false)

    useEffect(() => {
        setScrollDocument(isShowUser)
    }, [isShowUser])

    return (
        <div className="relative">
            <figure
                onClick={() => setIsShowUser(!isShowUser)}
                className="border border-solid border-[#e3e3e3] dark:border-[#636363] w-[30px] h-[30px] rounded-full overflow-hidden cursor-pointer select-none">
                <img src={user?.picture} alt='logo' />
            </figure>
            {isShowUser &&
                <Fragment>
                    <div onClick={() => setIsShowUser(false)} className="fixed inset-0 z-[9997]"></div>
                    <div className="absolute z-[9998] right-0 top-[130%] border border-solid border-[#e3e3e3] dark:border-[#636363] shadow-sm bg-[#fff] dark:bg-[#2f2f2f] dark:text-[#fff] min-w-[230px] max-w-[300px] rounded-[8px]">
                        <button onClick={() => setIsShowUser(false)} className="absolute top-[8px] right-[8px] flex items-center justify-center w-[32px] h-[32px] rounded-full duration-300 hover:bg-[#e3e3e3] dark:hover:bg-[#636363]">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <div className="flex items-center gap-[12px] px-[16px] mt-[32px]">
                            <figure className="border border-solid border-[#e3e3e3] dark:border-[#636363] w-[50px] h-[50px] rounded-full overflow-hidden flex-shrink-0">
                                <img src={user?.picture} alt={user?.name} />
                            </figure>
                            <span className="flex-1 font-[900]">{user?.name}</span>
                        </div>
                        <div className="w-full h-[1px] bg-[#e3e3e3] dark:bg-[#636363] mt-[12px]"></div>
                        <div className="px-[16px] py-[8px] select-none">
                            <Link
                                className="p-[8px] block mx-[-8px] font-[600] duration-300 rounded-[8px] hover:bg-[rgba(170,170,170,0.3)]"
                                onClick={() => setIsShowUser(false)}
                                to='/user'>
                                <i className="mr-[8px] fa-regular fa-user"></i>
                                Trang cá nhân
                            </Link>
                            <div
                                className="mt-[8px] cursor-pointer p-[8px] block mx-[-8px] font-[600] duration-300 rounded-[8px] hover:bg-[rgba(170,170,170,0.3)]"
                                onClick={handleLogout}>
                                <i className="mr-[8px] fa-solid fa-arrow-right-from-bracket"></i>
                                Đăng xuất
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </div>
    );
}

export default User;