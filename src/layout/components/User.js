import { useContext, useRef, useState, useEffect } from "react";
import Context from "../../state/Context";
import { Link } from "react-router-dom";

function User() {
    const { user, handleLogout } = useContext(Context)
    const [isShowUser, setIsShowUser] = useState(false)

    return (
        <div className="relative">
            <figure
                onClick={() => setIsShowUser(!isShowUser)}
                className="w-[30px] h-[30px] rounded-full overflow-hidden cursor-pointer">
                <img src={user?.picture} act='logo' />
            </figure>
            {isShowUser &&
                <div className="absolute z-[9999] right-0 top-[130%] shadow-custom bg-[#fff] min-w-[230px] max-w-[300px] p-[16px] rounded-[8px]">
                    <div
                        onClick={() => setIsShowUser(false)}
                        className="absolute right-[8px] top-0 p-[8px] cursor-pointer">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <div className="flex items-center gap-[12px]">
                        <figure className="w-[50px] h-[50px] rounded-full overflow-hidden flex-shrink-0">
                            <img src={user?.picture} />
                        </figure>
                        <span className="flex-1 font-[500]">{user?.name}</span>
                    </div>
                    <div className="w-full h-[1px] bg-[#eee] my-[12px]"></div>
                    <Link
                        onClick={() => setIsShowUser(false)}
                        to='/user'>
                        Trang cá nhân
                    </Link>
                    <div className="mt-[8px] cursor-pointer" onClick={handleLogout}>Đăng xuất</div>
                </div>}
        </div>
    );
}

export default User;