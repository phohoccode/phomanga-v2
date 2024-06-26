import useFetch from "../../hooks/UseFetch";
import { useEffect, useState, useRef } from 'react'
import Slide from "./Slide";

function Slides({ api }) {
    const [data] = useFetch(api)
    const [slides, setSlides] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const slideInnerRef = useRef()
    const idInterval = useRef()
    const isGrabbing = useRef(false)
    const startPos = useRef(null)
    const currentTranslate = useRef(0)

    useEffect(() => {
        if (data) {
            setSlides(data?.data?.items || [])
        }
    }, [data])

    return (
        <div className='relative'>
            <div className="w-full overflow-hidden rounded-[8px]">
                <div className="flex transition-all duration-[800ms]">
                    {slides.slice(0, 10).map((slide, index) => (
                        <Slide
                            key={index}
                            data={slide}
                        />
                    ))}
                </div>
            </div>
            {data &&
                <div className="flex absolute right-[12px] bottom-[12px] gap-[12px]">
                    <button className="px-[14px] py-[8px] text-xl rounded-full bg-[#3f3f3f]">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button className="px-[14px] py-[8px] text-xl rounded-full bg-[#3f3f3f]">
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>}
            <ul className="flex gap-[12px] absolute bottom-[-30px] left-0">
                {slides.slice(0, 10).map((_, index) => (
                    <li className="w-[32px] h-[8px] rounded-full bg-[#dce0e3] transition-all duration-300 cursor-pointer" key={index}></li>
                ))}
            </ul>
        </div>
    );
}

export default Slides;