import { useState, useEffect, useContext, Fragment } from "react";
import Context from "../state/Context";
import storage, { setScrollDocument } from '../utils'
import toast from "react-hot-toast";
import Comic from "../layout/components/Comic";
import DiaLog from "../layout/components/Dialog";

function Archive() {
    const {
        setIsOpenDiaLog,
        isOpenDiaLog,
        setQuantityComicArchive } = useContext(Context)
    const [comics, setComics] = useState([])

    useEffect(() => {
        const comicStorage = storage.get('comic-storage', [])
        setComics(comicStorage)
    }, [])

    useEffect(() => {
        setScrollDocument(isOpenDiaLog)
    }, [isOpenDiaLog])

    useEffect(() => {
        isOpenDiaLog ?
            document.body.style.overflowY = 'hidden' :
            document.body.style.overflowY = 'auto'
    }, [isOpenDiaLog])

    const handleDeleteAll = () => {
        setComics([])
        setQuantityComicArchive(0)
        storage.set('comic-storage', [])
        toast.success('Xoá tất cả thành công!')
    }

    return (
        <Fragment>
            <div className=''>
                <div className='flex items-center justify-between mb-[24px]'>
                    <h4 className="text-2xl font-[600]">
                        <i className="mr-[8px] fa-regular fa-bookmark"></i>
                        {comics.length > 0 ?
                            `Kho lưu trữ (${comics.length})` :
                            'Kho lưu trữ trống!'}
                    </h4>
                    {comics.length > 0 &&
                        <button
                            className='py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] block text-lg transition-all hover:scale-[1.05] bg-[#d90429] text-[#fff]'
                            onClick={() => setIsOpenDiaLog(true)}>
                            Xoá tất cả
                        </button>
                    }
                </div>
                <div className='flex mx-[-8px] flex-wrap gap-y-[24px]'>
                    {comics.map((comic, index) => (
                        <Comic key={index} data={comic} />
                    ))}
                </div>
            </div>
            {isOpenDiaLog &&
                <DiaLog
                    onDeleteAll={handleDeleteAll}
                    text='Tất cả truyện trong kho lưu trữ sẽ bị xoá vĩnh viễn!'
                />
            }
        </Fragment>
    );
}

export default Archive;