import { useState, useEffect, useRef } from "react"
import toast from "react-hot-toast"

function Pagination({ currentPage, totalPage, itemsPerPage, setCurrentPage }) {
    const [pageNumbers, setPageNumbers] = useState([])
    const start = useRef(0)
    const end = useRef(0)

    useEffect(() => {
        start.current = currentPage === 1 ? 1 : currentPage

        if (totalPage !== 1) {
            if (totalPage > itemsPerPage) {
                end.current = currentPage === 1 ?
                    itemsPerPage :
                    Math.min(currentPage + itemsPerPage - 1, totalPage)
            } else {
                end.current = currentPage === 1 ?
                    totalPage :
                    Math.min(currentPage + itemsPerPage - 1, totalPage)
            }
        } else {
            end.current = 1
        }

        const pagination = []
        for (let i = start.current; i <= end.current; i++) {
            pagination.push(i)
        }
        setPageNumbers(pagination)
    }, [currentPage, totalPage, itemsPerPage])


    useEffect(() => {
        toast(`Bạn đang ở trang ${currentPage}`, { duration: 1000 })
    }, [currentPage])

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPage) {
            setCurrentPage(prev => prev + 1)
        }
    }

    return (
        <div className="flex justify-center my-[64px]">
            <ul className="flex gap-[4px] flex-wrap">
                <li
                    onClick={() => setCurrentPage(1)}
                    className={`text-lg transition-all hover:bg-[#ccc] rounded-[4px] border border-solid border-[#ccc] px-[8px] py-[4px] font-[600] min-w-[40px] text-center cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-[.4] dark:text-[#fff] dark:opacity-[1]' : 'pointer-events-auto bg-[#fff]'}`}>
                    <i className="fa-solid fa-angles-left"></i>
                </li>
                <li
                    onClick={handlePrev}
                    className={`text-lg transition-all hover:bg-[#ccc] rounded-[4px] border border-solid border-[#ccc] px-[8px] py-[4px] font-[600] min-w-[40px] text-center cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-[.4] dark:text-[#fff] dark:opacity-[1]' : 'pointer-events-auto bg-[#fff]'}`}>
                    <i className="fa-solid fa-angle-left"></i>
                </li>
                {pageNumbers.map((page, index) => (
                    <li
                        onClick={() => setCurrentPage(page)}
                        key={index}
                        className={`text-lg transition-all hover:bg-[#ccc] rounded-[4px] border border-solid border-[#ccc] px-[8px] py-[4px] font-[600] min-w-[40px] text-center cursor-pointer select-none ${page === currentPage ? 'bg-[#ccc]' : 'bg-[#fff]'}`}>{page}</li>
                ))}
                <li
                    onClick={handleNext}
                    className={`text-lg transition-all hover:bg-[#ccc] rounded-[4px] border border-solid border-[#ccc] px-[8px] py-[4px] font-[600] min-w-[40px] text-center cursor-pointer ${currentPage === totalPage ? 'pointer-events-none opacity-[.4] dark:text-[#fff] dark:opacity-[1]' : 'pointer-events-auto bg-[#fff]'}`}>
                    <i className="fa-solid fa-angle-right"></i>
                </li>
                <li
                    onClick={() => setCurrentPage(totalPage)} className={`text-lg transition-all hover:bg-[#ccc] rounded-[4px] border border-solid border-[#ccc] px-[8px] py-[4px] font-[600] min-w-[40px] text-center cursor-pointer ${currentPage === totalPage ? 'pointer-events-none opacity-[.4] dark:text-[#fff] dark:opacity-[1]' : 'pointer-events-auto bg-[#fff]'}`}>
                    <i className="fa-solid fa-angles-right"></i>
                </li>
            </ul>
        </div>
    );
}

export default Pagination;