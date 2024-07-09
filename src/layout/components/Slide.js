import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Context from "../../state/Context";

function Slide({ data }) {
    const [chapterApi, setChapterApi] = useState('')
    const { width } = useContext(Context)

    useEffect(() => {
        if (data) {
            setChapterApi(data?.chaptersLatest?.[0]?.chapter_api_data.split('/').pop())
        }
    }, [data])
    return (
        <Fragment>
            {data &&
                <div
                    style={{
                        backgroundImage: `url(https://otruyenapi.com/uploads/comics/${data?.thumb_url})`,
                    }}
                    className="border border-solid border-[#e3e3e3] dark:border-[#636363] flex-shrink-0 w-full lg:h-[320px] h-[500px] flex lg:items-center mobile:items-start bg-cover bg-repeat bg-center text-[#fff] bg-[#00000099] relative lg:after:content-[''] after:absolute after:inset-0 after:w-full after:h-full after:bg-image-inherit after:z-[1] after:blur-[8px] after:bg-cover after:bg-center mobile:after:content-none">
                    <div className="w-full flex gap-[32px] absolute z-[2] lg:left-[64px] left-[16px]">
                        {width > 1024 &&
                            <figure className="w-[180px] h-[250px] rounded-[8px] overflow-hidden">
                                <img loading="lazy" src={`https://otruyenapi.com/uploads/comics/${data?.thumb_url}`}
                                    alt={data?.chaptersLatest?.[0]?.chapter_name} />
                            </figure>}
                        <div className="lg:w-desktop w-mobile mobile:mt-[16px]">
                            <h4 className="lg:text-3xl mobile:text-lg font-[600] text-[#fff] text-shadow">
                                {data?.chaptersLatest ?
                                    `Chương ${data?.chaptersLatest?.[0]?.chapter_name}` :
                                    'Truyện đang gặp lỗi!'
                                }
                            </h4>
                            <h2 className="text-shadow lg:text-4xl mobile:text-xl font-[600] truncate text-[#10b981] my-[12px]">{data?.name}</h2>
                            <ul className='flex flex-wrap gap-[12px] mt-[16px]'>
                                {data?.category.map((category, index) => (
                                    <li className="" key={index}>
                                        <Link className="block text-base font-[600] px-[8px] py-[2px] rounded-[8px] border-2 border-solid border-[#fff] bg-transparent transition-all select-none hover:text-[#10b981] hover:border-[#10b981]" to={`/detail/the-loai/${category?.slug}`}>{category?.name}</Link>
                                    </li>
                                ))}
                            </ul>
                            {data?.chaptersLatest &&
                                <div className="flex gap-[12px] mt-[16px] select-none">
                                    <Link
                                        className="py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg transition-all hover:scale-[1.05] bg-[#10b981]"
                                        to={`/read/${data?.slug}/${chapterApi}`}
                                    >
                                        <i className="mr-[8px] fa-regular fa-eye"></i>
                                        Đọc ngay
                                    </Link>
                                    <Link className="py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg transition-all bg-[#fff] hover:scale-[1.05] text-[#000]" to={`/info/${data?.slug}`}>
                                        <i className="mr-[8px] fa-solid fa-circle-info"></i>
                                        Chi tiết
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>}
        </Fragment>
    );
}

export default Slide;