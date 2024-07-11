import { useParams } from "react-router-dom";
import { useState, useEffect, Fragment, useContext } from "react";

import useFetch from "../hooks/UseFetch";
import Comic from "../layout/components/Comic";
import { search } from "../api";
import Pagination from "../layout/components/Pagination";
import Context from "../state/Context";
import { handleSetActivity } from "../utils";
import searchNotFoundImage from '../assets/searchNotFound.png'

function Search() {
    const { user } = useContext(Context)
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
        handleSetActivity(user, params?.keyword, 'search')
    }, [params.keyword])

    return (
        <div className=''>
            {!data && <h4 className='lg:text-2xl mobile:text-xl font-[600] dark:text-[#fff]'>Đang tìm kiếm truyện phù hợp...</h4>}
            {data &&
                <Fragment>
                    <h4 className="mb-[32px] lg:text-2xl mobile:text-xl font-[600] text-[#10b981] dark:text-[#fff] p-[8px] rounded-[8px] border-2 border-solid border-[#10b981] dark:border-[#636363] bg-[rgba(16,185,129,0.15)] dark:bg-[rgba(204,204,204,0.2)]">
                        {result.length > 0 ?
                            `Tìm kiếm được 
                                ${data?.data?.params?.pagination?.totalItems} 
                                truyện phù hợp cho từ khoá ''${params.keyword}''` :
                            `Không tìm kiếm được truyện phù hợp cho từ khoá ''${params.keyword}''`
                        }
                    </h4>
                    {result.length > 0 ? (<div className='flex mx-[-8px] flex-wrap gap-y-[24px]'>
                        {result.map((comic, index) => (
                            <Comic key={index} data={comic} />
                        ))}
                    </div>) : (
                        <div className="flex items-center justify-center">
                            <div
                                style={{ backgroundImage: `url(${searchNotFoundImage})` }} className="lg:w-[30vw] lg:h-[420px] sm:w-[40vw] sm:h-[360px] mobile:w-[50vw] h-[300px] bg-cover bg-repeat bg-center "></div>
                        </div>
                    )}
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