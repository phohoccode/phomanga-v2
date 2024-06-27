import useFetch from "../../hooks/UseFetch";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Comic from "./Comic";

function Comics({ api }) {
    const [data] = useFetch(api)
    const [comics, setComics] = useState([])

    useEffect(() => {
        if (data) {
            setComics(data?.data?.items || [])
        }
    }, [data])

    return (
        <div className="mt-[64px]">
            {data &&
                <div className="flex justify-between items-center mb-[24px]">
                    <h4 className="lg:text-3xl font-[900] mobile:text-xl">
                        <i className="mr-[8px] fa-solid fa-book-open"></i>
                        {data?.data?.titlePage}
                    </h4>
                    <Link
                        to={`/detail${data?.data?.breadCrumb[0]?.slug}`}
                        className='block lg:py-[8px] mobile:py-[4px] lg:px-[16px] mobile:px-[8px] rounded-[8px] bg-[#10b981] text-[#fff] font-[500]'>
                        Xem thêm
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