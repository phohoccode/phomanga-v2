import { useEffect, useRef, useState, useContext, Fragment } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';

import Context from '../../state/Context';
import DiaLog from '../components/Dialog';
import storage, { handleSelectedFocus, isUrlWithValidDomainSuffix, formatTime, handleSetActivity, setScrollAuto } from '../../utils'

function Comment({ setIsShowMessage, slug, id, dataChapter }) {
    const { setIsOpenDiaLog, isOpenDiaLog, user } = useContext(Context)
    const [valueComment, setValueComment] = useState('')
    const [valueEditComment, setValueEditComment] = useState('')
    const [comments, setComments] = useState(() => {
        const commentStorage = storage.get('comments', {})
        return commentStorage?.[user?.email]?.[slug]?.[id] || []
    })
    const [indexDelete, setIndexDelete] = useState(-1)
    const [indexEdit, setIndexEdit] = useState(-1)
    const wrapperRef = useRef()
    const modalRef = useRef()
    const commentEditRef = useRef()

    useEffect(() => {
        handleSelectedFocus(commentEditRef.current)
    }, [indexEdit])

    const handleCloseModal = () => {
        if (modalRef.current && wrapperRef.current) {
            modalRef.current.classList.add('animate-from-rigth-out')
            wrapperRef.current.classList.add('animate-fade-out')
            setTimeout(() => {
                setIsShowMessage(false)
            }, 200)
        }
    }

    const handleWrapperClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal()
        }
    }

    const handleAddComment = () => {
        if (valueComment !== '') {
            const commentStorage = storage.get('comments', {})
            const newComment = {
                value: valueComment,
                time: new Date()
            }

            if (!commentStorage[user?.email]) {
                commentStorage[user?.email] = {}
            }
            if (!commentStorage[user?.email][slug]) {
                commentStorage[user?.email][slug] = {}
            }
            if (!commentStorage[user?.email][slug][id]) {
                commentStorage[user?.email][slug][id] = []
            }
            commentStorage[user?.email][slug][id] = [
                ...commentStorage[user?.email][slug][id], newComment
            ]
            storage.set('comments', commentStorage)
            setComments(commentStorage[user?.email][slug][id] || [])
            setValueComment('')
            toast.success('Thêm bình luận thành công!')
            handleSetActivity(user, { dataChapter, valueComment }, 'addComment')
        }
    }

    const handleDeleteComment = () => {
        const commentStorage = storage.get('comments', {})
        const valueComment = commentStorage[user?.email][slug][id][indexDelete]?.value
        commentStorage[user?.email][slug][id].splice(indexDelete, 1)
        storage.set('comments', commentStorage)
        setComments(commentStorage[user?.email][slug][id])
        setIndexEdit(-1)
        toast.success('Xoá bình luận thành công')
        handleSetActivity(user, { dataChapter, valueComment }, 'removeComment')
    }

    const handleEditComment = (index) => {
        setIndexEdit(index)
        setValueEditComment(comments[index].value)
    }

    const handleSaveEditComment = () => {
        const commentStorage = storage.get('comments', {})
        const valueComment =
            commentStorage[user?.email][slug][id][indexEdit].value
        commentStorage[user?.email][slug][id][indexEdit].value = valueEditComment
        storage.set('comments', commentStorage)
        setComments(commentStorage[user?.email][slug][id])
        setIndexEdit(-1)
        toast.success('Sửa bình luận thành công')
        handleSetActivity(user, { dataChapter, valueComment, valueEditComment }, 'editComment')
    }

    const handleOpenDiaLog = (index) => {
        setIndexDelete(index)
        setIsOpenDiaLog(true)
    }

    return (
        <Fragment>
            <div
                ref={wrapperRef}
                className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-end animate-fade-in z-[9999]'
                onClick={handleWrapperClick}
            >
                <div ref={modalRef} className='lg:w-[50%] mobile:w-full bg-[#fff] dark:bg-[#282828] dark:text-[#fff] lg:pl-[32px] lg:pr-[32px] lg:pt-0 lg:pb-[32px] mobile:p-[16px] relative max-h-[100vh] overflow-y-auto overscroll-y-none animate-from-rigth-in'>
                    <button
                        onClick={handleCloseModal}
                        className='fixed top-0 right-0 text-2xl ml-auto p-[16px] duration-300 opacity-[.6] hover:opacity-[1]'
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className='mt-[64px]'>
                        <div className='nt-[24px]'>
                            <h4 className='text-2xl font-[600]'>{comments.length} bình luận</h4>
                            <p className='my-[8px] text-[#666] text-base dark:text-[#fff]'>Không bình luận tiêu cực, hãy là độc giả văn minh!</p>
                        </div>
                        <div className='mt-[32px] mb-[64px]'>
                            <textarea
                                className='p-[16px] min-h-[160px] w-full mb-[12px] border-2 border-solid border-[#ccc] duration-300 bg-transparent text-base focus:border-[#10b981] outline-none rounded-[8px]'
                                value={valueComment}
                                onChange={e => setValueComment(e.target.value)}
                                placeholder='Nhập nội dung bình luận...'>
                            </textarea>
                            <button
                                className={`flex ml-auto py-[4px] px-[12px] mobile:px-[8px] rounded-[8px] text-lg transition-all hover:scale-[1.05] text-[#fff] select-none ${valueComment !== '' ? 'bg-[#10b981] pointer-events-auto' : 'bg-[rgba(16,185,129,0.45)] pointer-events-none'}`}
                                onClick={handleAddComment}>Bình luận</button>
                        </div>
                        <ul className='flex flex-col gap-[32px] h-full'>
                            {comments.map((comment, index) => (
                                <li className='flex gap-[16px]' key={index}>
                                    <Link
                                        onClick={setScrollAuto}
                                        to='/user'
                                        className='flex-shrink-0 border border-solid border-[#ccc] overflow-hidden rounded-full w-[50px] h-[50px] hover:animate-pulse'>
                                        <img
                                            src={user?.picture}
                                            alt='avartar' />
                                    </Link>
                                    <div className='w-full h-full p-[12px] rounded-[8px] bg-[#f2f3f5] dark:bg-[rgba(204,204,204,0.2)]'>
                                        <div className=''>
                                            {index !== indexEdit &&
                                                <Fragment>
                                                    <h5 className='text-lg font-[600]'>{user?.name}</h5>
                                                    {<p className='text-base break-word'>
                                                        {comment?.value.split(' ').map((cmt, index) => (
                                                            <Fragment key={index}>{
                                                                !isUrlWithValidDomainSuffix(cmt) ? ` ${cmt} ` : (
                                                                    <a
                                                                        className='font-[600] text-[#10b981] hover:underline'
                                                                        href={cmt}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        {cmt}
                                                                    </a>
                                                                )
                                                            }</Fragment>
                                                        ))}
                                                    </p>}
                                                </Fragment>
                                            }
                                            {index === indexEdit &&
                                                <textarea
                                                    className='lg:p-[16px] mobile:p-[8px] min-h-[160px] w-full mb-[12px] border-2 border-solid border-[#ccc] duration-300 text-base focus:border-[#10b981] outline-none rounded-[8px]  dark:bg-transparent dark:text-[#fff]'
                                                    ref={commentEditRef}
                                                    value={valueEditComment}
                                                    onChange={e => setValueEditComment(e.target.value)}>
                                                </textarea>
                                            }
                                        </div>
                                        <div className='w-full h-[1px] bg-[#ddd] my-[12px]'></div>
                                        <div className='flex justify-end items-center gap-[12px]'>
                                            {index !== indexEdit &&
                                                <Fragment>
                                                    <span
                                                        onClick={() => handleOpenDiaLog(index)}
                                                        className='text-[#10b981] font-[600] cursor-pointer select-none text-base duration-300 hover:underline'>Xoá</span>
                                                    <span className=''> · </span>
                                                    <span
                                                        onClick={() => handleEditComment(index)}
                                                        className='text-[#10b981] font-[600] cursor-pointer select-none text-base duration-300 hover:underline'>Chỉnh sửa</span>
                                                    <span className=''> · </span>
                                                </Fragment>
                                            }
                                            {index === indexEdit &&
                                                <Fragment>
                                                    <span
                                                        onClick={() => setIndexEdit(-1)}
                                                        className='text-[#10b981] font-[600] cursor-pointer select-none text-base duration-300 hover:underline'>Huỷ</span>
                                                    <span className=''> · </span>
                                                    <span
                                                        onClick={handleSaveEditComment}
                                                        className='text-[#10b981] font-[600] cursor-pointer select-none text-base duration-300 hover:underline'>Lưu</span>
                                                    <span className=''> · </span>
                                                </Fragment>
                                            }
                                            <span className='text-base text-[#969696] dark:text-[#fff]'>
                                                {formatTime(comment?.time)}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {isOpenDiaLog &&
                <DiaLog
                    onDeleteComment={handleDeleteComment}
                    text='Bạn chắc chắn muốn xoá bình luận này?'
                />
            }
        </Fragment>
    );
}

export default Comment;