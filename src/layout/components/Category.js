import { Fragment, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Context from '../../state/Context'

function Category({ data, setIsShowCategory }) {
    const { width } = useContext(Context)
    const containerRef = useRef()
    const modalRef = useRef()

    const handleCloseModal = () => {
        if ((modalRef.current && containerRef.current)) {
            // modalRef.current.classList.add('animate-scale-out')
            // containerRef.current.classList.add('animate-fade-out')
            setTimeout(() => {
            }, 400)
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
            {width > 1024 ? (<div
                onClick={handleWrapperClick}
                ref={containerRef}
                className="fixed inset-0 bg-[#0000004d] z-[999] animate-fade-in">
                <div ref={modalRef} className="absolute bg-[#fff] shadow-custom top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%] rounded-[16px] min-w-[60%] p-[16px] h-auto">
                    <div className="flex justify-between items-center mb-[12px]">
                        <h4 className="text-3xl font-[600]">Thể loại</h4>
                        <button onClick={handleCloseModal}>
                            <i className="text-[30px] fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <ul className="flex flex-wrap gap-[12px]">
                        {data?.data?.items.map((category, index) => (
                            <li
                                onClick={handleCloseModal}
                                className="flex-auto" key={index}>
                                <Link className="block p-[8px]  rounded-[8px] transition-all hover:bg-[#10b981] hover:text-[#fff] text-center cursor-pointer select-none" to={`/detail/the-loai/${category?.slug}`}>{category?.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>) : (
                <ul className='animate-height-in transition-all overflow-y-auto h-[60vh] ml-[12px]'>
                    {data?.data?.items.map((category, index) => (
                        <li key={index}>
                            <Link
                                className="py-[8px] block"
                                to={category?.slug}>
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