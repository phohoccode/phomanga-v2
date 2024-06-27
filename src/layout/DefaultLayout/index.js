import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { useContext } from "react";
import Context from "../../state/Context";

function DefaultLayout({ children }) {
    const { width } = useContext(Context)

    return (
        <div className="">
            <NavBar />
            <div className="flex mt-[24px] mobile:mt-[16px] pl-[16px] pr-[32px] mobile:pr-[16px] gap-[32px]">
                {width > 1024 && <SideBar />}
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;