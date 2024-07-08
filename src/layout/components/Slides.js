import { useEffect, useState, useRef, useContext } from 'react'

import useFetch from "../../hooks/UseFetch";
import Slide from "./Slide";
import Context from "../../state/Context";

function Slides({ api }) {
    const { width } = useContext(Context)
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


    useEffect(() => {
        slideInnerRef.current.style.transform =
            `translateX(-${currentIndex * slideInnerRef.current.clientWidth}px)`
    }, [currentIndex])

    const startAutoSlides = () => {
        clearInterval(idInterval.current)
        idInterval.current = setInterval(handleNext, 7000)
    }

    useEffect(() => {
        startAutoSlides()
    }, [currentIndex])


    const stopAutoSlides = () => {
        clearInterval(idInterval.current)
    }

    const handlePrev = () => {
        setCurrentIndex(prevIndex =>
            (prevIndex === 0 ? slides.slice(0, 10).length - 1 : prevIndex - 1))
    }

    const handleNext = () => {
        setCurrentIndex(prevIndex =>
            (prevIndex === slides.slice(0, 10).length - 1 ? 0 : prevIndex + 1))
    }

    const getClientX = (event) => {
        return event.type.startsWith('touch') ?
            event.touches[0].clientX :
            event.clientX
    }

    const handleDragStart = (event) => {
        stopAutoSlides()
        if (event.type.startsWith('mouse')) {
            event.preventDefault()
        }
        const clientX = getClientX(event)
        startPos.current = clientX
        currentTranslate.current = 0
        isGrabbing.current = true
        slideInnerRef.current.style.transition = 'unset'
    }

    const handleDragMove = (event) => {
        if (isGrabbing.current) {
            const clientX = getClientX(event)
            currentTranslate.current = clientX - startPos.current
            slideInnerRef.current.style.transform =
                `translateX(${currentTranslate.current -
                (currentIndex * slideInnerRef.current.clientWidth)}px)`
        }
    }

    const handleDragEnd = () => {
        if (Math.abs(currentTranslate.current) > slideInnerRef.current.clientWidth / 3) {
            currentTranslate.current > 0 ? handlePrev() : handleNext()
        } else {
            slideInnerRef.current.style.transform =
                `translateX(-${currentIndex * slideInnerRef.current.clientWidth}px)`
        }
        isGrabbing.current = false
        startPos.current = null
        currentTranslate.current = 0
        slideInnerRef.current.style.transition = 'all .8s ease 0s'
        startAutoSlides()
    }

    return (
        <div className='relative'>
            <div className="w-full overflow-hidden rounded-[8px]">
                <div
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseLeave={handleDragEnd}
                    onMouseUp={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                    ref={slideInnerRef}
                    className="flex transition-all duration-700">
                    {slides.slice(0, 10).map((slide, index) => (
                        <Slide
                            key={index}
                            data={slide}
                        />
                    ))}
                </div>
            </div>
            {data && width > 1024 &&
                <div className="flex absolute right-[12px] bottom-[12px] gap-[12px]">
                    <button onClick={handlePrev} className="px-[14px] w-[40px] h-[40px] text-[#fff] text-xl rounded-[8px] bg-[#3f3f3f] transition-all hover:scale-[1.05]">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button onClick={handleNext} className="px-[14px] w-[40px] h-[40px] text-[#fff] text-xl rounded-[8px] bg-[#3f3f3f] transition-all hover:scale-[1.05]">
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>}
            <ul className="flex gap-[12px] absolute bottom-[-30px] left-0">
                {slides.slice(0, 10).map((_, index) => (
                    <li onClick={() => setCurrentIndex(index)} className={`flex gap-[12px] lg:w-[32px] w-[18px] h-[8px] rounded-[8px] transition-all duration-300 cursor-pointer ${index === currentIndex ? 'lg:w-[50px] mobile:w-[32px] bg-[#9aa6af]' : 'lg:w-[32px] mobile:w-[18px] bg-[#dce0e3]'} `} key={index}></li>
                ))}
            </ul>
        </div >
    );
}

export default Slides;