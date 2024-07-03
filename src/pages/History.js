import { useState, useContext, useEffect, Fragment } from "react"
import Context from "../state/Context"
import storage, { setScrollDocument } from '../utils'
import toast from "react-hot-toast"
import DiaLog from "../layout/components/Dialog"
import { Link } from "react-router-dom"

function History() {
    const {
        setIsOpenDiaLog,
        isOpenDiaLog,
        setQuantityComicHistory } = useContext(Context)
    const [comics, setComics] = useState({})
    const [slugs, setSlugs] = useState([])

    useEffect(() => {
        const historyStorage = storage.get('history-storage', {})
        const slugs = Object.keys(historyStorage)
        setComics(historyStorage)
        setSlugs(slugs)
    }, [])

    useEffect(() => {
        setScrollDocument(isOpenDiaLog)
    }, [isOpenDiaLog])

    const handleDeleteAll = () => {
        setSlugs([])
        setComics({})
        setQuantityComicHistory(0)
        storage.set('history-storage', {})
        toast.success('Xoá lịch sử thành công!')
    }

    return (
        <Fragment>
            <div>
                <div className='flex items-center justify-between mb-[24px]'>
                    <h4 className="text-2xl font-[600] dark:text-[#fff]">
                        <i className="mr-[8px] fa-solid fa-clock-rotate-left"></i>
                        {slugs.length > 0 ?
                            `Lịch sử đã xem (${slugs.length})` :
                            'Lịch sử xem trống!'}
                    </h4>
                    {slugs.length > 0 &&
                        <button
                            className='py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg transition-all hover:scale-[1.05] bg-[#d90429] text-[#fff]'
                            onClick={() => setIsOpenDiaLog(true)}>
                            Xoá tất cả
                        </button>
                    }
                </div>
                {slugs.map(slug => (
                    <div key={slug} className="">
                        <h4 className="text-2xl text-[#10b981] capitalize font-[600] my-[24px]">{`${slug} (${comics[slug].length} chương đã xem)`}</h4>
                        <ul key={slug} className='flex mx-[-8px] flex-wrap gap-y-[24px]'>
                            {comics[slug].map((comic, index) => (
                                <li key={index} className='lg:w-[12.5%] mobile:w-[50%] flex-shrink-0 px-[8px] transition-all relative overflow-hidden group hover:translate-y-[-8px] duration-300'>
                                    <Link to={`/read/${slug}/${comic?.data?.item?._id}`}>
                                        <figure className="h-[260px] rounded-[8px] overflow-hidden transition-all border border-solid border-[#e2e2e2] group-hover:hover:shadow-comic select-none hover:animate-pulse">
                                            <img
                                                src={`https://sv1.otruyencdn.com/${comic?.data?.item?.chapter_path}/${comic?.data?.item?.chapter_image[index]?.image_file}`}
                                                alt={comic?.data?.item?.comic_name}
                                            />
                                        </figure>
                                        <h4 className="mt-[12px] transition-all duration-300 group-hover:text-[#10b981] font-[600] dark:text-[#fff]">
                                            {`Chương ${comic?.data?.item?.chapter_name}`}
                                        </h4>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            {isOpenDiaLog &&
                <DiaLog
                    onDeleteAll={handleDeleteAll}
                    text={'Lịch sử hiện tại sẽ bị xoá vĩnh viễn!'}
                />
            }
        </Fragment>
    );
}

export default History;