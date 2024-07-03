import { useState, useEffect, Fragment, useContext, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../hooks/UseFetch';
import toast from 'react-hot-toast';
import storage, { setScrollDocument } from '../utils'
import Comment from '../layout/components/Comment';
import Context from '../state/Context';
import { comic, comicImage } from '../api';

function Read() {
    const { setQuantityComicHistory, width, isLogin } = useContext(Context)
    const navigate = useNavigate()
    const params = useParams()
    const [data] = useFetch(`${comic}/${params.slug}`)
    const [dataChapter] = useFetch(`${comicImage}/${params.id}`)
    const [images, setImages] = useState([])
    const [chapter, setChapter] = useState([])
    const [chapterPath, setChapterPath] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isScroll, setIsScroll] = useState(false)
    const [isShowMessage, setIsShowMessage] = useState(false)
    const idScrollRef = useRef()

    useEffect(() => {
        setScrollDocument(isShowMessage)
    }, [isShowMessage])

    useEffect(() => {
        if (data) {
            const chaptersId =
                data?.data?.item?.chapters[0]?.server_data.map(
                    chapter => chapter?.chapter_api_data.split('/').pop()) || []
            const index = chaptersId.findIndex(id => id === params.id)
            setChapter(chaptersId)
            setCurrentIndex(index)
        }
    }, [data])

    useEffect(() => {
        if (dataChapter) {
            setImages(dataChapter?.data?.item?.chapter_image || [])
            setChapterPath(dataChapter?.data?.item?.chapter_path)

            const historyStorage = storage.get('history-storage', {})
            const isExistComic = historyStorage[params.slug]?.some(
                comic => comic?.data?.item?._id === params.id) || false

            if (!isExistComic) {
                historyStorage[params.slug] =
                    [...(historyStorage[params.slug] || []), dataChapter]
                storage.set('history-storage', historyStorage)
                width > 1023 &&
                    setQuantityComicHistory(Object.keys(historyStorage).length)
            }
            toast(`Bạn đang ở chương ${dataChapter?.data?.item?.chapter_name}`, { duration: 2000 })
        }
    }, [dataChapter])

    useEffect(() => {
        const handleAutoScroll = () => {
            if (isScroll) {
                idScrollRef.current = setInterval(() => {
                    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                        clearInterval(idScrollRef.current)
                        setIsScroll(!isScroll)
                        toast("Đã cuộn đến cuối trang!")
                    } else {
                        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
                    }
                }, 6000)
            } else {
                clearInterval(idScrollRef.current)
            }
        }
        handleAutoScroll()
        return () => clearInterval(idScrollRef.current)
    }, [isScroll])

    const handleUseKeyChangeChapter = (event) => {
        if (event.key === 'ArrowLeft') {
            handlePrevChapter()
        } else if (event.key === 'ArrowRight') {
            handleNextChapter()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleUseKeyChangeChapter)
        return () => window.removeEventListener('keydown', handleUseKeyChangeChapter)
    }, [currentIndex])

    const handleChangeChapter = (index) => {
        setCurrentIndex(index)
        navigate(`/read/${params.slug}/${chapter[index]}`)
    }

    const handlePrevChapter = () => {
        if (currentIndex > 0) {
            let index = currentIndex - 1
            handleChangeChapter(index)
        }
    }

    const handleNextChapter = () => {
        if (currentIndex < chapter.length - 1) {
            let index = currentIndex + 1
            handleChangeChapter(index)
        }
    }

    const handleOpenModal = () => {
        if (!isLogin) {
            toast.error('Bạn cần đăng nhập để bình luận!', { duration: 2000 })
            return
        }
        setIsShowMessage(!isShowMessage)
    }

    const handleScroll = () => {
        const newIsScroll = !isScroll
        newIsScroll ?
            toast('Đã bật chế độ tự động cuộn!', { duration: 1000 }) :
            toast('Đã tắt chế độ tự động cuộn!', { duration: 1000 })
        setIsScroll(newIsScroll)
    }

    return (
        <Fragment>
            <div className='flex flex-col gap-[24px] items-center justify-center'>
                {!data && !dataChapter &&
                    <h4 className='text-2xl font-[600]'>Đang tải dữ liệu...</h4>}
                {data && dataChapter &&
                    <Fragment>
                        <div className='flex justify-center items-center flex-col gap-[16px] dark:text-[#fff]'>
                            <h4 className='text-3xl font-[600] text-center'>
                                {`${data?.data?.item?.name} - Chương ${dataChapter?.data?.item?.chapter_name}`}
                            </h4>
                            {width > 1023 &&
                                <p className='text-xl text-center font-[600]'>
                                    Gợi ý: Bạn có thể sử dụng nút
                                    <i className="mx-[4px] fa-solid fa-arrow-left"></i> hoặc
                                    <i className="mx-[4px] fa-solid fa-arrow-right"></i> từ bàn phím để chuyển chương.
                                    <i className="mx-[4px] fa-solid fa-arrow-down"></i> để tự động cuộn trang sau 6 giây.
                                </p>}
                            <span className='text-lg font-[600] text-center text-[#d90429]'>Nếu truyện bị lỗi vui lòng liên hệ qua Telegram:
                                <a href="https://t.me/phomanga" target="_blank" rel="noopener" className='ml-[12px] underline'>phomanga-v2</a>
                            </span>
                        </div>
                        <div className='flex gap-[8px]'>
                            <button
                                onClick={handlePrevChapter}
                                className={`select-none py-[4px] px-[12px] mobile:px-[8px] rounded-l-[8px] block text-lg transition-all hover:scale-[1.05] text-[#fff] ${currentIndex === 0 ? 'pointer-events-none bg-[rgba(16,185,129,0.48)]' : 'pointer-events-auto bg-[#10b981]'}`}
                            >
                                <i className="mr-[8px] fa-solid fa-angle-left"></i>
                                Chương trước
                            </button>
                            <button
                                onClick={handleNextChapter}
                                className={`select-none py-[4px] px-[12px] mobile:px-[8px] rounded-r-[8px] block text-lg transition-all hover:scale-[1.05] text-[#fff] ${currentIndex === chapter.length - 1 ? 'pointer-events-none bg-[rgba(16,185,129,0.48)]' : 'pointer-events-auto bg-[#10b981]'}`}
                            >
                                Chương sau
                                <i className="ml-[8px] fa-solid fa-angle-right"></i>
                            </button>
                        </div>
                    </Fragment>
                }
                <ul className='flex flex-col'>
                    {images.map((image, index) => (
                        <li
                            className='lg:w-[800px] h-full mobile:w-full'
                            key={index}>
                            <img src={`https://sv1.otruyencdn.com/${chapterPath}/${image.image_file}`} alt='' />
                        </li>
                    ))}
                </ul>
                <div className='fixed max-w-[200px] min-w-[50px] right-[32px] bottom-[32px] flex flex-col gap-[12px]'>
                    <button
                        onClick={handlePrevChapter}
                        className={`select-none py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg transition-all hover:scale-[1.05] text-[#fff] ${currentIndex === 0 ? 'pointer-events-none bg-[rgba(16,185,129,0.48)]' : 'pointer-events-auto bg-[#10b981]'}`}
                    >
                        <i className="mr-[8px] fa-solid fa-angle-left"></i>
                        Chương trước
                    </button>
                    <button
                        onClick={handleNextChapter}
                        className={`select-none py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg transition-all hover:scale-[1.05] text-[#fff] ${currentIndex === chapter.length - 1 ? 'pointer-events-none bg-[rgba(16,185,129,0.48)]' : 'pointer-events-auto bg-[#10b981]'}`}
                    >
                        Chương sau
                        <i className="ml-[8px] fa-solid fa-angle-right"></i>
                    </button>
                    <button
                        className='select-none py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg transition-all hover:scale-[1.05] bg-[#10b981] text-[#fff]'
                        onClick={handleOpenModal}>
                        <i className="mr-[8px] fa-regular fa-comment-dots"></i>
                        <span>Bình luận</span>
                    </button>
                    <button
                        className='select-none py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg transition-all hover:scale-[1.05] bg-[#10b981] text-[#fff]'
                        onClick={handleScroll}>
                        <i className="mr-[8px] fa-solid fa-arrow-down"></i>
                        {!isScroll ? (<span>Tự động cuộn</span>) : (<span>Đang cuộn</span>)}
                    </button>
                </div>
            </div>
            {isShowMessage &&
                <Comment
                    id={params.id}
                    slug={params.slug}
                    setIsShowMessage={setIsShowMessage}
                />
            }
        </Fragment>
    );
}

export default Read;