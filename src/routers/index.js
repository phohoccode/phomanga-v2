import Home from "../pages/Home.js"
import Detail from "../pages/Detail.js"
import Info from "../pages/Info.js"
import Read from "../pages/Read.js"
import Search from "../pages/Search.js"
import History from "../pages/History.js"
import Archive from "../pages/Archive.js"
import NotFound from "../pages/NotFound.js"
import User from "../pages/User.js"

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/detail/:describe/:slug', component: Detail },
    { path: '/info/:slug', component: Info },
    { path: '/archive', component: Archive },
    { path: '/history', component: History },
    { path: '/search/:keyword', component: Search },
    { path: '/read/:slug/:id', component: Read },
    { path: '/user', component: User },
    { path: '/notfound', component: NotFound },
    { path: '*', component: NotFound },
]

export default publicRoutes