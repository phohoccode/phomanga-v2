import { useState, useEffect } from "react";
import { category } from "../../api";
import Comics from "../components/Comics";

function ComicsSuggestions({ data }) {
    const [categorys, setCategorys] = useState([])
    const [currentApi, setCurrentApi] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        setCategorys(data?.item?.category || [])
        setCurrentApi(
            `${category}/${data?.item?.category[0].slug}` || '')
        setCurrentIndex(0)
    }, [data])

    const handleSetApi = (slug, index) => {
        setCurrentIndex(index)
        setCurrentApi(`${category}/${slug}`)
    }

    return (
        <div className='mt-[32px]'>
            <div className='flex justify-between items-center mb-[-32px]'>
                <h4 className="flex-shrink-0 text-2xl font-[600]">
                    <i className="mr-[8px] fa-solid fa-wand-magic-sparkles"></i>
                    Gợi ý truyện
                </h4>
                <ul className='flex items-center gap-[12px] flex-wrap'>
                    {categorys.map((category, index) => (
                        <li
                            className={`flex-auto py-[2px] px-[6px] mobile:px-[8px] rounded-[8px] block text-lg transition-all text-[#fff] text-center ${currentIndex === index ? 'bg-[#3b82f6] cursor-default' : 'bg-[#3b83f688] cursor-pointer hover:scale-[1.05]'} `}
                            onClick={() => handleSetApi(category?.slug, index)}
                            key={index}>{category?.name}</li>
                    ))}
                </ul>
            </div>
            {currentApi && <Comics api={currentApi} />}
        </div>
    );
}

export default ComicsSuggestions;