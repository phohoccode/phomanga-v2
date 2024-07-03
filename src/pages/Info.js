import useFetch from "../hooks/UseFetch";
import { useParams } from "react-router-dom";
import { comic } from "../api";
import { useEffect, useState, Fragment, useContext } from "react";
import storage, { formatDate, setScrollAuto, setScrollHidden } from '../utils'
import { Link } from "react-router-dom";
import ComicsSuggestions from "../layout/components/ComicsSuggestions";
import toast from "react-hot-toast";
import DiaLog from "../layout/components/Dialog";
import Context from "../state/Context";

function Info() {
    const { width, isOpenDiaLog, setIsOpenDiaLog, setQuantityComicArchive } = useContext(Context)
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
    const [isCollapse, setIsCollapse] = useState(true)

    useEffect(() => {
        console.log(data);
    }, [data])

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
            const comic = historyStorage[params.slug]
            const chapters = data?.data?.item?.chapters?.[0]?.server_data || []
            setInfoComic(data?.data?.item || [])
            setAuthor(data?.data?.item?.author || [])
            setCategory(data?.data?.item?.category || [])
            setChapters(chapters.slice(0, 39))
            setIdStorage(handleSetIdStorage(comic))
            setIdRecently(handleSetIdRecently(chapters, comic))
        }
    }, [data, params.slug])

    useEffect(() => {
        const chapters = data?.data?.item?.chapters?.[0]?.server_data || []
        setChapters(!isCollapse ? chapters : chapters.slice(0, 39))
        setValueSearchChapter('')
    }, [isCollapse])

    useEffect(() => {
        const comicStorage = storage.get('comic-storage', [])
        const isSave = comicStorage.some(
            comic => comic?.slug === params.slug)
        setIsSave(isSave)
    }, [params.slug])

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
        setChapters(!isCollapse ? filterChapters : filterChapters.slice(0, 39))
    }

    const handleSaveComic = () => {
        const comicStorage = storage.get('comic-storage', [])
        const newComicStorage = [...comicStorage, data?.data?.item]
        storage.set('comic-storage', newComicStorage)
        setIsSave(!isSave)
        width > 1023 && setQuantityComicArchive(newComicStorage.length)
        toast.success('Lưu truyện thành công!', { duration: 1000 })
    }

    const handleDeleteComic = () => {
        const comicStorage = storage.get('comic-storage', [])
        const newComic = comicStorage.filter(
            comic => comic?.slug !== params.slug)
        storage.set('comic-storage', newComic)
        width > 1023 && setQuantityComicArchive(newComic.length)
        setIsSave(!isSave)
        toast.success('Xoá truyện thành công!', { duration: 1000 })
        setIsOpenDiaLog(true)
    }

    const handleSortComic = () => {
        const chapters =
            data?.data?.item?.chapters?.[0]?.server_data || []
        setIsSort(!isSort)
        setChapters(
            !isCollapse ? chapters.reverse() : chapters.reverse().slice(0, 39))
        setValueSearchChapter('')
        isSort ?
            toast('Chương được sắp xếp tăng dần', { duration: 2000 }) :
            toast('Chương được sắp xếp giảm dần', { duration: 2000 })
    }

    return (
        <Fragment>
            {!data && <h4 className='text-2xl font-[600] dark:text-[#fff]'>Đang tải dữ liệu...</h4>}
            {data &&
                <Fragment>
                    <div className='lg:flex lg:flex-row mobile:flex-col mobile:gap-[12px] p-[16px] bg-[rgba(16,185,129,0.15)] rounded-[8px] dark:bg-[#ccc]'>
                        <figure className="flex-shrink-0 lg:w-[200px] mobile:w-full lg:h-[300px] mobile:h-auto overflow-hidden rounded-[8px]">
                            <img
                                src={`https://otruyenapi.com/uploads/comics/${infoComic?.thumb_url}`}
                                alt={infoComic?.name}
                            />
                        </figure>
                        <div className='overflow-hidden flex flex-col gap-[4px] flex-1 lg:pl-[32px]'>
                            <h4 className="text-3xl font-[600] lg:mt-0 mobile:mt-[16px]">{infoComic?.name}</h4>
                            <div className='flex gap-[12px] my-[12px]'>
                                {!isSave ? (
                                    <button
                                        onClick={handleSaveComic}
                                        className='py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg transition-all hover:scale-[1.05] bg-[#10b981] text-[#fff]'>
                                        <i className="mr-[8px] fa-solid fa-bookmark"></i>
                                        Lưu truyện
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsOpenDiaLog(true)}
                                        className='py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg transition-all hover:scale-[1.05] bg-[#d90429] text-[#fff]'
                                    >
                                        <i className="mr-[8px] fa-solid fa-trash"></i>
                                        Xoá truyện
                                    </button>
                                )}
                                <button>
                                    <Link className="py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg transition-all hover:scale-[1.05] bg-[#3b82f6] text-[#fff]" to={`/read/${params.slug}/${idRecently}`}>
                                        <i className="mr-[8px] fa-regular fa-eye"></i>
                                        Đọc tiếp
                                    </Link>
                                </button>
                            </div>

                            <ul className='flex gap-[12px] text-lg'>
                                <b className="text-[#10b981]">Tác giả: </b>
                                {author.map((author, index) => (
                                    <li className={('text')} key={index}>
                                        {author || 'Chưa cập nhật'}
                                    </li>
                                ))}
                            </ul>
                            <div className='flex gap-[12px] text-lg'>
                                <b className="text-[#10b981]">Ngày cập nhật:</b>
                                <span className={('text')}>{formatDate(infoComic?.updatedAt)}</span>
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
                                    dangerouslySetInnerHTML={{ __html: infoComic?.content }}>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='mt-[32px]'>
                        <div className='flex items-center justify-between'>
                            <h4 className="text-2xl font-[600] dark:text-[#fff]">
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
                        <p className="my-[12px] font-[600] dark:text-[#fff]">
                            Gợi ý: Bạn có thể cuộn con lăn chuột để chọn chương
                        </p>
                        <div className='flex items-center w-full px-[12px] rounded-[8px] border-2 border-solid border-[#ccc] focus-within:border-[#10b981] mt-[12px] mb-[24px] dark:text-[#fff]'>
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
                        <ul className='flex flex-wrap gap-[12px]'>
                            {chapters.length > 0 ?
                                <Fragment>
                                    {isSort ? (
                                        <li className="lg:w-chapter-desktop mobile:w-chapter-mobile">
                                            <Link
                                                className="py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-sm transition-all hover:scale-[1.05] bg-[#10b981] text-[#fff] text-center"
                                                to={`/read/${params.slug}/${chapters[chapters.length - 1]?.chapter_api_data
                                                    .split('/').pop()}`}>
                                                Đọc từ đầu
                                            </Link>
                                        </li>
                                    ) : (
                                        <li className='lg:w-chapter-desktop mobile:w-chapter-mobile'>
                                            <Link
                                                className="py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-sm transition-all hover:scale-[1.05] bg-[#10b981] text-[#fff] text-center"
                                                to={`/read/${params.slug}/${chapters[chapters.length - 1]?.chapter_api_data
                                                    .split('/').pop()}`}>
                                                Chương mới
                                            </Link>
                                        </li>
                                    )}
                                    {chapters.map((chapter, index) => (
                                        <li
                                            className={` transition-all hover:scale-[1.05] rounded-[8px] lg:w-chapter-desktop mobile:w-chapter-mobile ${idStorage.includes(chapter?.chapter_api_data.split('/').pop()) ? 'bg-[#10b981b3]' : 'bg-[#10b981]'}`}
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
                        {chapters.length >= 39 &&
                            <div className="flex justify-center mt-[16px] ">
                                <span
                                    className="text-[#10b981] font-[900] cursor-pointer text-lg"
                                    onClick={() => setIsCollapse(!isCollapse)}>
                                    {isCollapse ? (
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
                    text='Truyện sẽ được xoá khỏi kho lưu trữ!'
                />}
        </Fragment>

    );
}

export default Info;