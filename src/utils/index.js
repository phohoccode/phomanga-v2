
export const handleCloseModal = (wrapperRef, modalRef, setIsShow, classWrapper, classModal) => {
    if (modalRef.current && wrapperRef.current) {
        modalRef.current.classList.add(classModal)
        wrapperRef.current.classList.add(classWrapper)
        setTimeout(() => {
            setIsShow(false)
        }, 400)
    }
}

export const handleWrapperClick = (event, modalRef) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal()
    }
};
