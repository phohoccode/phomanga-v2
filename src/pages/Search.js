import { useParams } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import { useState, useEffect, Fragment } from "react";
import Comic from "../layout/components/Comic";
import { search } from "../api";
import Pagination from "../layout/components/Pagination";

function Search() {
    const params = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [data] = useFetch(
        `${search}${params.keyword}&page=${currentPage}`)
    const [result, setResult] = useState([])
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        if (data) {
            const totalItems =
                data?.data?.params?.pagination?.totalItems
            const totalItemsPerPage =
                data?.data?.params?.pagination?.totalItemsPerPage
            setResult(data?.data?.items || [])
            totalItems > totalItemsPerPage ?
                setTotalPage(Math.round(totalItems / totalItemsPerPage)) :
                setTotalPage(1)
        }
    }, [data])

    useEffect(() => {
        setCurrentPage(1)
    }, [params.keyword])

    return (
        <div className=''>
            {!data && <h4 className='text-2xl font-[600] dark:text-[#fff]'>Đang tìm kiếm truyện phù hợp...</h4>}
            {data &&
                <Fragment>
                    <h4 className="mb-[32px] text-2xl font-[600] dark:text-[#fff]">
                        {result.length > 0 ?
                            `Tìm kiếm được 
                                ${data?.data?.params?.pagination?.totalItems} 
                                truyện phù hợp cho từ khoá ''${params.keyword}''` :
                            `Không tìm kiếm được truyện phù hợp cho từ khoá ''${params.keyword}''`
                        }
                    </h4>
                    <div className='flex mx-[-8px] flex-wrap gap-y-[24px]'>
                        {result.map((comic, index) => (
                            <Comic key={index} data={comic} />
                        ))}
                    </div>
                </Fragment>}
            {result.length > 0 &&
                <Pagination
                    currentPage={currentPage}
                    totalPage={totalPage}
                    itemsPerPage={window.innerWidth > 786 ? 10 : 4}
                    setCurrentPage={setCurrentPage}
                />}
        </div>
    );
}

export default Search;