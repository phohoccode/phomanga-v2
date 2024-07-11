import { useContext, useRef } from "react";

import Context from "../../state/Context";

function DiaLog(props) {
    const { setIsOpenDiaLog } = useContext(Context)
    const mainRef = useRef()

    const handleOkClick = () => {
        // ?.() nếu có thì gọi
        props.onDeleteComment?.()
        props.onDeleteArchive?.()
        props.onDeleteHistory?.()
        props.onDeleteComic?.()
        props.onDeleteActivity?.()
        setIsOpenDiaLog(false)
    }

    const handleWrapperClick = (event) => {
        if (mainRef.current && !mainRef.current.contains(event.target)) {
            setIsOpenDiaLog(false)
        }
    }

    return (
        <div onClick={handleWrapperClick} className="fixed inset-0 flex items-center justify-center z-[9999]">
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] animate-fade-in"></div>
            <div ref={mainRef} className="bg-[#fff] dark:bg-[#282828] dark:text-[#fff] rounded-[16px] max-w-[80vw] absolute z-[1] w-[600px] shadow-custom animate-scale-in">
                <div className="flex items-center justify-between p-[16px] border-b-2 border-solid border-[rgba(0,0,0,.1)] dark:border-[rgba(255,255,255,0.1)]">
                    <h4 className="text-2xl font-[900]">Thông báo!</h4>
                    <button onClick={() => setIsOpenDiaLog(false)} className="text-2xl opacity-[.8] transition-all hover:opacity-[1]">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="p-[16px]">
                    <p className="mb-[24px] font-[600] text-lg">{props?.text}</p>
                    <div className="flex justify-end gap-[12px]">
                        <button onClick={() => setIsOpenDiaLog(false)} className="px-[8px] py-[4px] bg-[#d90429] font-[600] rounded-[8px] text-lg transition-all hover:scale-[1.05] text-[#fff]">
                            Huỷ bỏ
                        </button>
                        <button onClick={handleOkClick} className="px-[8px] py-[4px] bg-[#10b981] text-[#fff] rounded-[8px] text-lg transition-all hover:scale-[1.05] font-[600]">
                            Đồng ý
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiaLog;