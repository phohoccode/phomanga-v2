import { Fragment, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Context from '../../state/Context'

function Category({ data }) {
    const { width, setIsShowCategory, isShowCategory } = useContext(Context)
    const containerRef = useRef()
    const modalRef = useRef()

    useEffect(() => {
        console.log(data);
    }, [data])


    const handleCloseModal = () => {
        if ((modalRef.current && containerRef.current)) {
            modalRef.current.classList.add('animate-scale-out')
            containerRef.current.classList.add('animate-fade-out')
            setTimeout(() => {
                setIsShowCategory(false)
            }, 400)
        }
    }

    const handleWrapperClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal()
        }
    };

    return (
        <Fragment>
            {width > 1024 ? (<div
                onClick={handleWrapperClick}
                ref={containerRef}
                className="fixed inset-0 bg-[#0000004d] animate-fade-in z-[999]">
                <div ref={modalRef} className="absolute bg-[#fff] shadow-custom top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%] rounded-[16px] max-w-[700px] p-[16px] h-[50vh] overflow-y-auto animate-scale-in">
                    <button
                        onClick={handleCloseModal}
                        className="flex ml-auto">
                        <i className="text-[30px] fa-solid fa-xmark"></i>
                    </button>
                    <ul className="flex flex-wrap gap-[12px]">
                        {data?.data?.items.map((category, index) => (
                            <li
                                onClick={handleCloseModal}
                                className="flex-auto" key={index}>
                                <Link className="block p-[8px]  rounded-full transition-all hover:bg-[#10b981] hover:text-[#fff] text-center cursor-pointer" to={`/detail/the-loai/${category?.slug}`}>{category?.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>) : (
                <ul className='animate-height-in transition-all overflow-y-auto h-[60vh] ml-[12px]'>
                    {data?.data?.items.map((category, index) => (
                        <li key={index}>
                            <Link className="py-[8px] block" to={category?.slug}>{category?.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </Fragment>
    );
}

export default Category;