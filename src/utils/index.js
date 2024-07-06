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
            newData = `Đã thêm truyện ${data?.data?.item?.name} vào kho lưu trữ`
            break
        }
        case 'removeComic': {
            newData = `Đã xoá truyện ${data?.data?.item?.name} khỏi kho lưu trữ`
            break
        }
        case 'readComic': {
            newData = `Đã đọc truyện ${data?.data?.item?.comic_name} - Chương ${data?.data?.item?.chapter_name}`
            break
        }
        case 'search': {
            newData = `Đã tìm kiến từ khoá "${data}"`
            break
        }
        case 'archive': {
            newData = 'Đã xoá tất cả truyện khỏi kho lưu trữ'
            break
        }
        case 'history': {
            newData = 'Đã xoá lịch sử đọc truyện'
            break
        }
        case 'changeAvartar': {
            newData = 'Đã thay đổi ảnh đại diện'
            break
        }
        case 'changeBackground': {
            newData = 'Đã thay đổi ảnh bìa'
            break
        }
        case 'addComment': {
            newData = `Đã bình luận "${data?.valueComment}" tại truyện ${data?.dataChapter?.data?.item?.comic_name} - Chương ${data?.dataChapter?.data?.item?.chapter_name}`
            break
        }
        case 'removeComment': {
            newData = `Đã xoá bình luận "${data?.valueComment}" tại truyện ${data?.dataChapter?.data?.item?.comic_name} - Chương ${data?.dataChapter?.data?.item?.chapter_name}`
            break
        }
        case 'editComment': {
            newData = `Đã sửa bình luận "${data?.valueComment}" thành "${data?.valueEditComment}" tại truyện ${data?.dataChapter?.data?.item?.comic_name} - Chương ${data?.dataChapter?.data?.item?.chapter_name}`
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



