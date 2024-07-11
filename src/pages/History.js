import { useState, useContext, useEffect, Fragment } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

import Context from "../state/Context"
import storage, { handleSetActivity } from '../utils'
import DiaLog from "../layout/components/Dialog"

function History() {
    const {
        setIsOpenDiaLog,
        isOpenDiaLog,
        setQuantityComicHistory,
        user,
        width } = useContext(Context)
    const [comics, setComics] = useState({})
    const [slugs, setSlugs] = useState([])

    useEffect(() => {
        const historyStorage = storage.get('history-storage', {})
        if (!historyStorage[user?.email]) {
            historyStorage[user?.email] = {}
        }
        const slugs = Object.keys(historyStorage[user?.email])
        setComics(historyStorage[user?.email])
        setSlugs(slugs)
    }, [user])

    const handleDeleteHistory = () => {
        const historyStorage = storage.get('history-storage', {})
        historyStorage[user?.email] = {}
        setSlugs([])
        setComics({})
        setQuantityComicHistory(0)
        storage.set('history-storage', historyStorage)
        toast.success('Xoá lịch sử thành công!')
        handleSetActivity(user, [], 'history')
    }

    const handleDeleteComicOutHistory = (slug, index) => {
        const historyStorage = storage.get('history-storage', {})
        handleSetActivity(user, { historyStorage, slug, index }, 'deleteChapter')
        historyStorage[user?.email][slug].splice(index, 1)

        if (historyStorage[user?.email][slug].length === 0) {
            delete historyStorage[user?.email][slug]
            width > 1023 &&
                setQuantityComicHistory(Object.keys(historyStorage[user?.email]).length)
        }

        setComics(historyStorage[user?.email])
        setSlugs(Object.keys(historyStorage[user?.email]))
        storage.set('history-storage', historyStorage)
        toast.success('Xoá thành công!', { duration: 1000 })
    }

    return (
        <Fragment>
            <div>
                <div className='flex items-center justify-between mb-[24px]'>
                    <h4 className="lg:text-2xl mobile:text-xl font-[600] dark:text-[#fff]">
                        <i className="mr-[8px] fa-solid fa-clock-rotate-left"></i>
                        {slugs.length > 0 ?
                            `Lịch sử đã xem (${slugs.length})` :
                            'Lịch sử xem trống!'}
                    </h4>
                    {slugs.length > 0 &&
                        <button
                            className='py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-base transition-all hover:scale-[1.05] font-[600] bg-[#d90429] text-[#fff]'
                            onClick={() => setIsOpenDiaLog(true)}>
                            Xoá tất cả
                        </button>
                    }
                </div>
                {slugs.map(slug => (
                    <div key={slug} className="">
                        <h4 className="lg:text-xl mobile:text-lg dark:text-[#fff] capitalize font-[600] my-[24px]">
                            {`${comics?.[slug]?.[0]?.data?.item?.comic_name} (${comics?.[slug]?.length} chương đã xem)`}
                        </h4>
                        <ul key={slug} className='flex mx-[-8px] flex-wrap gap-y-[24px]'>
                            {comics?.[slug]?.map((comic, index) => (
                                <li key={index} className='lg:w-[12.5%] md:w-[16.66667%] sm:w-[25%] mobile:w-[50%] flex-shrink-0 px-[8px] transition-all relative overflow-hidden group hover:translate-y-[-8px] duration-300'>
                                    <Link to={`/read/${slug}/${comic?.data?.item?._id}`}>
                                        <figure className="h-[260px] rounded-[8px] overflow-hidden transition-all border border-solid border-[#e3e3e3] dark:border-[#636363] group-hover:hover:shadow-comic select-none hover:animate-pulse">
                                            <img
                                                loading="lazy"
                                                src={`https://sv1.otruyencdn.com/${comic?.data?.item?.chapter_path}/${comic?.data?.item?.chapter_image[index]?.image_file}`}
                                                alt={comic?.data?.item?.comic_name}
                                            />
                                        </figure>
                                        <h4 className="mt-[12px] transition-all duration-300 group-hover:text-[#10b981] font-[600] dark:text-[#fff]">
                                            {`Chương ${comic?.data?.item?.chapter_name}`}
                                        </h4>
                                    </Link>
                                    <button
                                        title="Xoá chương khỏi lịch sử xem"
                                        onClick={() => handleDeleteComicOutHistory(slug, index)} className="absolute top-0 right-[8px] text-base py-[6px] px-[12px] bg-[rgba(16,185,129,1)] text-[#fff] rounded-bl-[8px] rounded-tr-[8px] duration-300 hover:px-[16px] hover:py-[12px] hover:text-xl">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            {isOpenDiaLog &&
                <DiaLog
                    onDeleteHistory={handleDeleteHistory}
                    text={'Lịch sử xem hiện tại sẽ bị xoá vĩnh viễn?'}
                />
            }
        </Fragment>
    );
}

export default History;