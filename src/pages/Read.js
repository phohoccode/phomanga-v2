import { useState, useEffect, Fragment, useContext, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';

import useFetch from '../hooks/UseFetch';
import storage, { setScrollDocument, scrollToBottom, scrollToTop, handleSetActivity } from '../utils'
import Comment from '../layout/components/Comment';
import Context from '../state/Context';
import { comic, comicImage } from '../api';

function Read() {
    const { setQuantityComicHistory, width, isLogin, user } = useContext(Context)
    const navigate = useNavigate()
    const params = useParams()
    const [data] = useFetch(`${comic}/${params?.slug}`)
    const [dataChapter] = useFetch(`${comicImage}/${params?.id}`)
    const [images, setImages] = useState([])
    const [chapter, setChapter] = useState([])
    const [selectedChapter, setSelectedChapter] = useState(params?.id);
    const [chapterPath, setChapterPath] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isScroll, setIsScroll] = useState(false)
    const [isShowMessage, setIsShowMessage] = useState(false)
    const [isShowTools, setIsShowTools] = useState(false)
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
            setSelectedChapter(params?.id)

            const historyStorage = storage.get('history-storage', {})

            if (!historyStorage[user?.email]) {
                historyStorage[user?.email] = {}
            }

            if (!historyStorage[user?.email][params?.slug]) {
                historyStorage[user?.email][params?.slug] = []
            }

            const isExistComic =
                historyStorage[user?.email][params?.slug]?.some(comic =>
                    comic?.data?.item?._id === params?.id || false)

            if (!isExistComic) {
                historyStorage[user?.email][params?.slug] = [
                    ...(historyStorage[user?.email][params?.slug]), dataChapter
                ]
                storage.set('history-storage', historyStorage)
                width > 1023 &&
                    setQuantityComicHistory(Object.keys(historyStorage[user?.email]).length)
            }

            toast(`Bạn đang ở chương ${dataChapter?.data?.item?.chapter_name}`, { duration: 2000 })

            handleSetActivity(user, dataChapter, 'readComic')
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

    const handleChangeSelectedChapter = (event) => {
        setSelectedChapter(event.target.value)
        handleChangeChapter(event.target.selectedIndex)
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
                    <h4 className='text-2xl font-[600] dark:text-[#fff]'>Đang tải dữ liệu...</h4>}
                {data && dataChapter &&
                    <div className='bg-[rgba(16,185,129,0.15)] dark:bg-[rgba(204,204,204,0.2)] w-full p-[16px] rounded-[8px]'>
                        <div className='flex justify-center items-center flex-col gap-[16px] dark:text-[#fff]'>
                            <h4 className='lg:text-3xl mobile:text-xl font-[600] text-center'>
                                {`${data?.data?.item?.name} - Chương ${dataChapter?.data?.item?.chapter_name}`}
                            </h4>
                            {width > 1023 &&
                                <p className='text-xl text-center font-[600]'>
                                    Gợi ý: Bạn có thể sử dụng nút
                                    <i className="mx-[4px] fa-solid fa-arrow-left"></i> hoặc
                                    <i className="mx-[4px] fa-solid fa-arrow-right"></i> từ bàn phím để chuyển chương.
                                    <i className="mx-[4px] fa-solid fa-arrow-down"></i> để tự động cuộn trang sau 6 giây.
                                </p>}
                            <span className='text-lg font-[600] text-center text-[#d90429] dark:text-[#fff]'>Nếu truyện bị lỗi vui lòng liên hệ qua Telegram:
                                <a href="https://t.me/phomanga" target="_blank" rel="noopener" className='ml-[12px] underline'>phomanga-v2</a>
                            </span>
                        </div>
                        <div className='flex gap-[8px] justify-center mt-[24px]'>
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
                    </div>
                }
                <ul className='flex flex-col'>
                    {images.map((image, index) => (
                        <li
                            className='lg:w-[800px] h-full mobile:w-full'
                            key={index}>
                            <img
                                loading='lazy'
                                src={`https://sv1.otruyencdn.com/${chapterPath}/${image.image_file}`}
                                alt='image' />
                        </li>
                    ))}
                </ul>
                {data && dataChapter &&
                    <Fragment>
                        {!isShowTools ? (
                            <button
                                onClick={() => setIsShowTools(true)}
                                className='select-none py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg transition-all hover:scale-[1.05] bg-[#10b981] text-[#fff] fixed lg:bottom-[32px] lg:right-[32px] mobile:right-[16px] mobile:bottom-[16px]'>
                                <i className="mr-[8px] fa-solid fa-screwdriver-wrench"></i>
                                Hộp công cụ
                            </button>
                        ) : (
                            <Fragment>
                                <div onClick={() => setIsShowTools(false)} className='fixed inset-0 z-[9998]'></div>
                                <div className='fixed z-[9999] max-w-[300px] min-w-[50px] lg:right-[32px] lg:bottom-[32px] mobile:right-[16px] mobile:bottom-[16px] flex flex-col gap-[12px] lg:p-[16px] mobile:p-[8px] rounded-[16px] shadow-sm bg-[rgba(16,185,129,0.15)] dark:bg-[rgba(204,204,204,.2)]'>
                                    <select
                                        value={selectedChapter}
                                        onChange={(event) => handleChangeSelectedChapter(event)}
                                        className='min-h-[36px] select-none py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg bg-[#10b981] text-[#fff] outline-none cursor-pointer'>
                                        {data?.data?.item?.chapters?.[0]?.server_data?.map((chapter, index) => (
                                            <option
                                                className='bg-[#fff] text-[#000] cursor-pointer text-lg'
                                                key={index}
                                                value={chapter?.chapter_api_data.split('/').pop()}>
                                                Chương {chapter?.chapter_name}
                                            </option>
                                        ))}
                                    </select>
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
                                        className={`select-none py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg transition-all hover:scale-[1.05] bg-[#10b981] text-[#fff] ${isScroll && 'animate-pulse'}`}
                                        onClick={handleScroll}>
                                        <i className="mr-[8px] fa-solid fa-robot"></i>
                                        {!isScroll ? (<span>Tự động cuộn</span>) : (<span>Đang cuộn</span>)}
                                    </button>
                                    <button
                                        className='select-none py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg transition-all hover:scale-[1.05] bg-[#10b981] text-[#fff]'
                                        onClick={scrollToTop}>
                                        <i className="mr-[8px] fa-solid fa-arrow-up"></i>
                                        <span>Cuộn đầu trang</span>
                                    </button>
                                    <button
                                        className='select-none py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg transition-all hover:scale-[1.05] bg-[#10b981] text-[#fff]'
                                        onClick={scrollToBottom}>
                                        <i className="mr-[8px] fa-solid fa-arrow-down"></i>
                                        <span>Cuộn cuối trang</span>
                                    </button>
                                </div>
                            </Fragment>
                        )}
                    </Fragment>}
            </div>
            {isShowMessage &&
                <Comment
                    dataChapter={dataChapter}
                    id={params.id}
                    slug={params.slug}
                    setIsShowMessage={setIsShowMessage}
                />
            }
        </Fragment >
    );
}

export default Read;