import { useState, useEffect, useContext, Fragment } from "react";
import toast from "react-hot-toast";

import Context from "../state/Context";
import storage, { handleSetActivity } from '../utils'
import Comic from "../layout/components/Comic";
import DiaLog from "../layout/components/Dialog";

function Archive() {
    const {
        setIsOpenDiaLog,
        isOpenDiaLog,
        setQuantityComicArchive,
        user } = useContext(Context)
    const [comics, setComics] = useState([])

    useEffect(() => {
        const comicStorage = storage.get('comic-storage', [])
        setComics(comicStorage[user?.email] || [])
    }, [user])

    const handleDeleteArchive = () => {
        const comicStorage = storage.get('comic-storage', {})
        comicStorage[user?.email] = []
        setComics([])
        setQuantityComicArchive(0)
        storage.set('comic-storage', comicStorage)
        toast.success('Xoá tất cả thành công!')
        handleSetActivity(user, [], 'archive')
    }

    return (
        <Fragment>
            <div className='flex items-center justify-between mb-[24px]'>
                <h4 className="lg:text-2xl mobile:text-xl font-[600] dark:text-[#fff]">
                    <i className="mr-[8px] fa-regular fa-bookmark"></i>
                    {comics.length > 0 ?
                        `Kho lưu trữ (${comics.length})` :
                        'Kho lưu trữ trống!'}
                </h4>
                {comics.length > 0 &&
                    <button
                        className='py-[4px] px-[12px] font-[600] mobile:px-[8px] rounded-[8px] block text-base transition-all hover:scale-[1.05] bg-[#d90429] text-[#fff]'
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
            {isOpenDiaLog &&
                <DiaLog
                    onDeleteArchive={handleDeleteArchive}
                    text='Tất cả truyện trong kho lưu trữ sẽ bị xoá vĩnh viễn?'
                />
            }
        </Fragment>
    );
}

export default Archive;