import { useParams, Link } from "react-router-dom";
import { useEffect, useState, Fragment, useContext } from "react";
import toast from "react-hot-toast";

import useFetch from "../hooks/UseFetch";
import { comic } from "../api";
import storage, { formatDate, setScrollAuto, setScrollHidden, handleSetActivity } from '../utils'
import ComicsSuggestions from "../layout/components/ComicsSuggestions";
import DiaLog from "../layout/components/Dialog";
import Context from "../state/Context";

function Info() {
    const {
        width,
        isOpenDiaLog,
        setIsOpenDiaLog,
        setQuantityComicArchive,
        user } = useContext(Context)
    const params = useParams()
    const [data] = useFetch(`${comic}/${params.slug}`)
    const [valueSearchChapter, setValueSearchChapter] = useState('')
    const [infoComic, setInfoComic] = useState([])
    const [author, setAuthor] = useState([])
    const [category, setCategory] = useState([])
    const [chapters, setChapters] = useState([])
    const [idStorage, setIdStorage] = useState([])
    const [idRecently, setIdRecently] = useState('')
    const [isSave, setIsSave] = useState(false)
    const [isSort, setIsSort] = useState(false)
    const [isCollapse, setIsCollapse] = useState(false)
    const chapterInDesktop = 39
    const chapterInMobile = 14

    const handleSetIdRecently = (chapters, comic) => {
        if (!comic && !isSort) {
            return chapters[0]?.chapter_api_data.split('/').pop()
        } else if (!comic && isSort) {
            return chapters[chapters.length - 1]?.chapter_api_data.split('/').pop()
        } else {
            return comic[comic.length - 1]?.data?.item?._id
        }
    }

    const handleSetIdStorage = (comic) => {
        const chapterIds = comic?.map(
            chapter => chapter?.data?.item?._id) || []
        return chapterIds
    }

    useEffect(() => {
        if (data) {
            const historyStorage = storage.get('history-storage', {})
            const comic = historyStorage[user?.email]?.[params?.slug]
            const chapters = data?.data?.item?.chapters?.[0]?.server_data || []

            setInfoComic(data?.data?.item || [])
            setAuthor(data?.data?.item?.author || [])
            setCategory(data?.data?.item?.category || [])
            setChapters(
                width > 1024 ?
                    chapters.slice(0, chapterInDesktop) :
                    chapters.slice(0, chapterInMobile)
            )
            setIdStorage(handleSetIdStorage(comic))
            setIdRecently(handleSetIdRecently(chapters, comic))
        }
    }, [data, params.slug, width])

    useEffect(() => {
        const chapters =
            data?.data?.item?.chapters?.[0]?.server_data || []

        setChapters(
            isCollapse ?
                chapters : (
                    width > 1024 ?
                        chapters.slice(0, chapterInDesktop) :
                        chapters.slice(0, chapterInMobile))
        )
        setValueSearchChapter('')
    }, [isCollapse])

    useEffect(() => {
        const comicStorage = storage.get('comic-storage', {})
        const isSave = comicStorage[user?.email]?.some(
            comic => comic?.slug === params?.slug)

        setIsSave(isSave)
    }, [params.slug, user])

    const handleSearchChapter = (event) => {
        setValueSearchChapter(event.target.value)
        const dataChapter =
            data?.data?.item?.chapters?.[0]?.server_data || []
        const filterChapters =
            dataChapter.filter(
                chapter =>
                    chapter?.chapter_name
                        .toLowerCase()
                        .includes(event.target.value.toLowerCase())
            )
        setChapters(
            isCollapse ? filterChapters : (
                width > 1024 ?
                    filterChapters.slice(0, chapterInDesktop) :
                    filterChapters.slice(0, chapterInMobile))
        )
    }

    const handleSaveComic = () => {
        if (!user) {
            toast.error('Bạn cần đăng nhập để lưu truyện!', { duration: 2000 })
            return
        }

        const comicStorage = storage.get('comic-storage', {})

        if (!comicStorage[user?.email]) {
            comicStorage[user?.email] = []
        }

        comicStorage[user?.email] = [
            ...comicStorage[user?.email], data?.data?.item
        ]
        storage.set('comic-storage', comicStorage)
        width > 1023 &&
            setQuantityComicArchive(comicStorage[user?.email].length)
        setIsSave(true)
        toast.success('Lưu truyện thành công!', { duration: 1000 })
        handleSetActivity(user, data, 'addComic')
    }

    const handleDeleteComic = () => {
        const comicStorage = storage.get('comic-storage', {})

        comicStorage[user?.email] =
            comicStorage[user?.email].filter(
                comic => comic?.slug !== params?.slug)
        storage.set('comic-storage', comicStorage)
        setIsSave(false)
        width > 1023 &&
            setQuantityComicArchive(comicStorage[user?.email].length)
        toast.success('Xoá truyện thành công!', { duration: 1000 })
        handleSetActivity(user, data, 'removeComic')
    }

    const handleSortComic = () => {
        const chapters =
            data?.data?.item?.chapters?.[0]?.server_data || []
        setIsSort(!isSort)
        setChapters(
            isCollapse ? chapters.reverse() : (
                width > 1023 ?
                    chapters.reverse().slice(0, chapterInDesktop) :
                    chapters.reverse().slice(0, chapterInMobile)
            ))
        setValueSearchChapter('')
        isSort ?
            toast('Chương được sắp xếp tăng dần', { duration: 1000 }) :
            toast('Chương được sắp xếp giảm dần', { duration: 1000 })
    }

    return (
        <Fragment>
            {!data && <h4 className='lg:text-2xl mobile:text-xl font-[600] dark:text-[#fff]'>Đang tải dữ liệu...</h4>}
            {data &&
                <Fragment>
                    <div className='lg:flex lg:flex-row mobile:flex-col mobile:gap-[12px] p-[16px] bg-[rgba(16,185,129,0.15)] rounded-[8px] dark:bg-[rgba(204,204,204,0.2)]'>
                        <figure className="flex-shrink-0 lg:w-[200px] mobile:w-full lg:h-[300px] mobile:h-auto overflow-hidden rounded-[8px]">
                            <img
                                src={`https://otruyenapi.com/uploads/comics/${infoComic?.thumb_url}`}
                                alt={infoComic?.name}
                            />
                        </figure>
                        <div className='overflow-hidden flex flex-col gap-[4px] flex-1 lg:pl-[32px]'>
                            <h4 className="lg:text-3xl mobile:text-lg font-[600] lg:mt-0 mobile:mt-[16px] dark:text-[#fff]">{infoComic?.name}</h4>
                            <div className='flex gap-[12px] my-[12px] select-none'>
                                {!isSave ? (
                                    <button
                                        onClick={handleSaveComic}
                                        className='py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg duration-300 font-[600] hover:scale-[1.05] bg-[#10b981] text-[#fff]'>
                                        <i className="mr-[8px] fa-solid fa-bookmark"></i>
                                        Lưu truyện
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsOpenDiaLog(true)}
                                        className='py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg duration-300 font-[600] hover:scale-[1.05] bg-[#d90429] text-[#fff]'
                                    >
                                        <i className="mr-[8px] fa-solid fa-trash"></i>
                                        Xoá truyện
                                    </button>
                                )}
                                <Link className={`py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg font-[600] transition-all hover:scale-[1.05] text-[#fff] ${chapters.length > 0 ? 'bg-[#3b82f6] pointer-events-auto' : 'bg-[rgba(59,131,246,0.43)] pointer-events-none cursor-none'}`} to={`/read/${params.slug}/${idRecently}`}>
                                    <i className="mr-[8px] fa-regular fa-eye"></i>
                                    Đọc tiếp
                                </Link>
                            </div>

                            <ul className='flex gap-[12px] text-lg flex-wrap'>
                                <b className="text-[#10b981]">Tác giả: </b>
                                {author.map((author, index) => (
                                    <li className='dark:text-[#fff] ' key={index}>
                                        {author || 'Chưa cập nhật'}
                                    </li>
                                ))}
                            </ul>
                            <div className='flex gap-[12px] text-lg'>
                                <b className="text-[#10b981]">Ngày cập nhật:</b>
                                <span className='dark:text-[#fff]'>{formatDate(infoComic?.updatedAt)}</span>
                            </div>
                            <ul className='flex gap-[12px] text-lg flex-wrap'>
                                <b className="text-[#10b981]">Thể loại: </b>
                                {category.map((category, index) => (
                                    <li key={index} className='transition-all hover:scale-[1.05]'>
                                        <Link className="px-[6px] py-[4px] bg-[#10b981] rounded-[8px] text-sm text-[#fff]" to={`/detail/the-loai/${category?.slug}`}>
                                            {category?.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div>
                                <b className="text-[#10b981] text-lg">Nội dung: </b>
                                <p
                                    className="dark:text-[#fff]"
                                    dangerouslySetInnerHTML={{ __html: infoComic?.content }}>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='mt-[32px]'>
                        <div className='flex items-center justify-between'>
                            <h4 className="lg:text-2xl mobile:text-xl font-[600] dark:text-[#fff]">
                                <i className="mr-[8px] fa-regular fa-rectangle-list"></i>
                                Danh sách chương
                            </h4>
                            {chapters.length > 0 &&
                                <button
                                    title={!isSort ? 'Tăng dần' : 'Giảm dần'}
                                    onClick={handleSortComic}
                                    className='text-lg py-[6px] px-[12px] rounded-[8px] bg-[#10b981] text-[#fff] transition-all hover:scale-[1.05]'
                                >
                                    {isSort ? (
                                        <i className="fa-solid fa-arrow-down-9-1"></i>
                                    ) : (
                                        <i className="fa-solid fa-arrow-up-1-9"></i>
                                    )}
                                </button>}
                        </div>
                        {width > 1024 &&
                            <p className="my-[16px] font-[600] text-[#10b981]">
                                Gợi ý: Bạn có thể cuộn con lăn chuột để chọn chương
                            </p>}
                        <div className='flex items-center w-full px-[12px] rounded-[8px] border-2 border-solid border-[#ccc] focus-within:border-[#10b981] my-[12px] dark:text-[#fff]'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="number"
                                className="w-full h-[40px] pl-[12px] text-base outline-none font-[600] bg-transparent"
                                value={valueSearchChapter}
                                placeholder='Nhập số chương cần tìm...'
                                onChange={handleSearchChapter}
                                onFocus={setScrollHidden}
                                onBlur={setScrollAuto}
                            />
                        </div>
                        <div className="mb-[24px] flex gap-[16px] dark:text-[#fff]">
                            <span className="font-[600]">Chú thích:</span>
                            <div className="flex gap-[12px] items-center">
                                <div className="w-[40px] h-[20px] rounded-[6px] bg-[#10b981]"></div>
                                <span>Chưa đọc</span>
                            </div>
                            <div className="flex gap-[12px] items-center">
                                <div className="w-[40px] h-[20px] rounded-[6px] bg-[#10b981b3]"></div>
                                <span>Đã đọc</span>
                            </div>
                        </div>
                        <ul className='flex flex-wrap gap-[12px]'>
                            {chapters.length > 0 ?
                                <Fragment>
                                    {isSort ? (
                                        <li className="xl:w-chapter-desktop lg:w-chapter-table mobile:w-chapter-mobile">
                                            <Link
                                                className="py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-sm transition-all hover:scale-[1.05] bg-[#10b981] text-[#fff] text-center"
                                                to={`/read/${params.slug}/${data?.data?.item?.chapters?.[0]?.server_data[data?.data?.item?.chapters?.[0]?.server_data.length - 1]?.chapter_api_data
                                                    .split('/').pop()}`}>
                                                Đọc từ đầu
                                            </Link>
                                        </li>
                                    ) : (
                                        <li className='xl:w-chapter-desktop lg:w-chapter-table mobile:w-chapter-mobile'>
                                            <Link
                                                className="py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-sm transition-all hover:scale-[1.05] bg-[#10b981] text-[#fff] text-center"
                                                to={`/read/${params.slug}/${data?.data?.item?.chapters?.[0]?.server_data[data?.data?.item?.chapters?.[0]?.server_data.length - 1]?.chapter_api_data
                                                    .split('/').pop()}`}>
                                                Đọc mới nhất
                                            </Link>
                                        </li>
                                    )}
                                    {chapters.map((chapter, index) => (
                                        <li
                                            className={` transition-all hover:scale-[1.05] rounded-[8px] xl:w-chapter-desktop   lg:w-chapter-table mobile:w-chapter-mobile relative ${idStorage.includes(chapter?.chapter_api_data.split('/').pop()) ? "bg-[#10b981b3]" : 'bg-[#10b981]'}`}
                                            key={index}>
                                            <Link
                                                className="py-[4px] px-[12px] mobile:px-[8px]  block text-sm  text-[#fff] text-center"
                                                to={`/read/${params.slug}/${chapter
                                                    ?.chapter_api_data
                                                    .split('/').pop()}`}>
                                                Chương {chapter?.chapter_name}
                                            </Link>
                                        </li>
                                    ))}
                                </Fragment> : (
                                    <span className="font-[600] text-xl text-[#d90429]">Không có dữ liệu!</span>
                                )
                            }
                        </ul>
                        {(width > 1024 ?
                            chapters.length >= chapterInDesktop :
                            chapters.length >= chapterInMobile) &&
                            <div className="flex justify-center mt-[16px]">
                                <span
                                    className="text-[#10b981] font-[900] cursor-pointer text-lg select-none"
                                    onClick={() => setIsCollapse(!isCollapse)}>
                                    {!isCollapse ? (
                                        <Fragment>
                                            Xem thêm
                                            <i className="ml-[4px] fa-solid fa-angle-down"></i>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            Thu gọn
                                            <i className="ml-[4px] fa-solid fa-angle-up"></i>
                                        </Fragment>
                                    )}
                                </span>
                            </div>}
                    </div>
                </Fragment>
            }
            {data?.data && <ComicsSuggestions data={data?.data} />}
            {isOpenDiaLog &&
                <DiaLog
                    onDeleteComic={handleDeleteComic}
                    text='Truyện sẽ được xoá khỏi kho lưu trữ?'
                />}
        </Fragment>

    );
}

export default Info;