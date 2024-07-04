import useFetch from "../../hooks/UseFetch";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Comic from "./Comic";

function Comics({ api }) {
    const [data] = useFetch(api)
    const [comics, setComics] = useState([])

    useEffect(() => {
        data && setComics(data?.data?.items || [])
    }, [data])

    return (
        <div className="mt-[64px]">
            {data &&
                <div className="flex justify-between items-center mb-[24px]">
                    <h4 className="lg:text-2xl font-[900] mobile:text-xl dark:text-[#fff]">
                        <i className="mr-[8px] fa-solid fa-book-open"></i>
                        {data?.data?.titlePage}
                    </h4>
                    <Link
                        to={`/detail${data?.data?.breadCrumb[0]?.slug}`}
                        className='block text-[#10b981] font-[600] transition-all hover:underline group text-lg'>
                        Xem thêm
                        <i className="ml-[4px] group-hover:translate-x-[2px] transition-all fa-solid fa-angle-right"></i>
                    </Link>
                </div>}
            <div className="flex mx-[-8px] flex-wrap gap-y-[24px]">
                {comics.map((comic, index) => (
                    <Comic key={index} data={comic} />
                ))}
            </div>
        </div>
    );
}

export default Comics;