import { Fragment, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { detail } from '../api';
import useFetch from '../hooks/UseFetch';
import { scrollToTop } from '../utils';
import Context from '../state/Context';
import Comic from '../layout/components/Comic';
import Pagination from '../layout/components/Pagination';

function Detail() {
    const { width } = useContext(Context)
    const params = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [data] = useFetch(
        `${detail}/${params.describe}/${params.slug}?page=${currentPage}`)
    const [comics, setComics] = useState([])
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        if (data) {
            const totalItems =
                data?.data?.params?.pagination?.totalItems
            const totalItemsPerPage =
                data?.data?.params?.pagination?.totalItemsPerPage
            setComics(data?.data?.items || [])
            totalItems > totalItemsPerPage ?
                setTotalPage(Math.round(totalItems / totalItemsPerPage)) :
                setTotalPage(1)
        }
    }, [data])

    useEffect(() => {
        setCurrentPage(1)
    }, [params.slug, params.describe])

    useEffect(() => {
        scrollToTop()
    }, [currentPage])

    return (
        <Fragment>
            {!data && <h4 className='lg:text-2xl mobile:text-xl font-[600] dark:text-[#fff]'>Đang tải dữ liệu...</h4>}
            {data?.status === 'success' &&
                <Fragment>
                    <h4 className='mb-[32px] text-center lg:text-2xl mobile:text-xl font-[600] text-[#10b981] dark:text-[#fff] p-[8px] rounded-[8px] border-2 border-solid border-[#10b981] dark:border-[#636363] bg-[rgba(16,185,129,0.15)] dark:bg-[rgba(204,204,204,0.2)]'>
                        <i className="mr-[8px] fa-solid fa-book-open"></i>
                        {data?.data?.breadCrumb?.[0]?.name} ({data?.data?.params?.pagination?.totalItems} truyện)
                    </h4>
                    <div className='flex mx-[-8px] flex-wrap gap-y-[24px]'>
                        {comics.map((comic, index) => (
                            <Comic key={index} data={comic} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPage={totalPage}
                        itemsPerPage={width > 786 ? 10 : 3}
                        setCurrentPage={setCurrentPage}
                    />
                </Fragment>}
        </Fragment>
    );
}

export default Detail;