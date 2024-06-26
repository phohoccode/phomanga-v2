import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Slide({ data }) {
    const [chapterApi, setChapterApi] = useState('')

    useEffect(() => {
        if (data) {
            setChapterApi(data?.chaptersLatest?.[0]?.chapter_api_data.split('/').pop())
        }
    }, [data])
    return (
        <div className="flex-shrink-0 w-full h-[320px] flex items-center bg-cover bg-repeat bg-center text-[#fff] bg-[#00000099] relative">
            <div className="w-full flex items-center gap-[32px] absolute z-[2] left-[64px]">
                <figure className="w-[180px] h-[250px] rounded-[8px] overflow-hidden">
                    <img src={`https://otruyenapi.com/uploads/comics/${data?.thumb_url}`}
                        alt={data?.chaptersLatest?.[0]?.chapter_name} />
                </figure>
                <div className="w-desktop">
                    <h4 className="text-3xl">
                        {data?.chaptersLatest ?
                            `Chương ${data?.chaptersLatest?.[0]?.chapter_name}` :
                            'Truyện đang gặp lỗi!'
                        }
                    </h4>
                    <h2 className="text-4xl truncate">{data?.name}</h2>
                    <ul className='flex flex-wrap gap-[12px] mt-[12px]'>
                        {data?.category.map((category, index) => (
                            <li className="" key={index}>
                                <Link className="block text-base font-[600] px-[8px] py-[2px] rounded-[8px] border-2 border-solid border-[#fff] bg-transparent transition-all select-none hover:text-[#10b981] hover:border-[#10b981]" to={`/detail/the-loai/${category?.slug}`}>{category?.name}</Link>
                            </li>
                        ))}
                    </ul>
                    {data?.chaptersLatest &&
                        <div className="">
                            <Link
                                className=''
                                to={`/read/${data?.slug}/${chapterApi}`}
                            >
                                <i className="fa-regular fa-eye"></i>
                                Đọc ngay
                            </Link>
                            <Link className="" to={`/info/${data?.slug}`}>
                                <i className="fa-solid fa-circle-info"></i>
                                Chi tiết
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Slide;