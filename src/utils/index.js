export default {
    get(key, type) {
        return JSON.parse(localStorage.getItem(key)) || type
    },
    set(key, data) {
        return localStorage.setItem(key, JSON.stringify(data))
    }
}

export function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatTime(time) {
    const currentTime = new Date()
    const storageTime = new Date(time)
    const diff = Math.floor((currentTime - storageTime) / 1000)

    if (diff < 60) {
        return `Vừa xong`;
    } else if (diff < 3600) {
        return `${Math.floor(diff / 60)} phút trước`;
    } else if (diff < 86400) {
        return `${Math.floor(diff / 3600)} giờ trước`;
    } else if (diff < 86400 * 30) {
        return `${Math.floor(diff / 86400)} ngày trước`;
    } else {
        const day = storageTime.getDate();
        const month = storageTime.getMonth() + 1;
        const year = storageTime.getFullYear();
        return `${day}/${month}/${year}`;
    }
}

// hàm này dùng để điều chỉnh con trỏ phía cuối nội dung
export function handleSelectedFocus(ref) {
    if (ref) {
        ref.focus()
        const length = ref.value.length
        ref.setSelectionRange(length, length)
    }
}

export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function scrollToBottom() {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
}


export function isUrlWithValidDomainSuffix(url) {
    const urlPattern =
        /^(http|https):\/\/[^\/]*\.(com|vn|org|net|edu|gov|mil|app|shop|blog|tech|online|io|co|ai|xyz)(\/.*)?$/i;
    return urlPattern.test(url)
}

export function setScrollDocument(isShow) {
    isShow ?
        document.body.style.overflowY = 'hidden' :
        document.body.style.overflowY = 'auto'
}

export function setScrollAuto() {
    document.body.style.overflow = 'auto'
}

export function setScrollHidden() {
    document.body.style.overflow = 'hidden'
}

export function handleSetActivity(user, data, type) {
    const recentActivity = JSON.parse(localStorage.getItem('recent-activity')) || {}
    let newData = ''

    switch (type) {
        case 'addComic': {
            newData = `Thêm truyện ${data?.data?.item?.name} vào kho lưu trữ`
            break
        }
        case 'removeComic': {
            newData = `Xoá truyện ${data?.data?.item?.name} khỏi kho lưu trữ`
            break
        }
        case 'readComic': {
            newData = `Đọc truyện ${data?.data?.item?.comic_name} - Chương ${data?.data?.item?.chapter_name}`
            break
        }
        case 'search': {
            newData = `Tìm kiếm từ khoá "${data}"`
            break
        }
        case 'archive': {
            newData = 'Xoá tất cả truyện khỏi kho lưu trữ'
            break
        }
        case 'history': {
            newData = 'Xoá lịch sử đọc truyện'
            break
        }
        case 'changeAvartar': {
            newData = 'Thay đổi ảnh đại diện'
            break
        }
        case 'changeBackground': {
            newData = 'Thay đổi ảnh bìa'
            break
        }
        case 'addComment': {
            const { dataChapter, valueComment } = data
            const comicName = dataChapter?.data?.item?.comic_name
            const chapterName = dataChapter?.data?.item?.chapter_name

            newData = `Bình luận "${valueComment}" tại truyện ${comicName} - Chương ${chapterName}`
            break
        }
        case 'removeComment': {
            const { dataChapter, valueComment } = data
            const comicName = dataChapter?.data?.item?.comic_name
            const chapterName = dataChapter?.data?.item?.chapter_name

            newData = `Xoá bình luận "${valueComment}" tại truyện ${comicName} - Chương ${chapterName}`
            break
        }
        case 'editComment': {
            const { dataChapter, valueComment, valueEditComment } = data
            const comicName = dataChapter?.data?.item?.comic_name
            const chapterName = dataChapter?.data?.item?.chapter_name

            newData = `Sửa bình luận "${valueComment}" thành "${valueEditComment}" tại truyện ${comicName} - Chương ${chapterName}`
            break
        }
        case 'deleteChapter': {
            const { historyStorage, slug, index } = data
            const chapterName = historyStorage[user?.email][slug][index]?.data?.item?.chapter_name
            const comicName = historyStorage[user?.email][slug][index]?.data?.item?.comic_name

            newData = `Xoá chương ${chapterName} truyện ${comicName} khỏi lịch sử đã xem`
            break
        }
        default: {
            console.log('Không có type phù hợp!');
        }
    }

    const newActivity = {
        value: newData,
        time: new Date()
    }

    if (!recentActivity[user?.email]) {
        recentActivity[user?.email] = []
    }

    recentActivity[user?.email] = [
        ...recentActivity[user?.email], newActivity
    ]

    localStorage.setItem('recent-activity', JSON.stringify(recentActivity))
}



