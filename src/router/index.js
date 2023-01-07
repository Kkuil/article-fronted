import { Routes, Route, Navigate, redirect } from "react-router-dom"
import CompLazy from '@/utils/CompLazy.js'
import { message } from 'antd'

import NotFound from '@/views/NotFound'

const AuthLoader = async () => {
    // 验证token
    const user_token = localStorage.getItem('USER_TOKEN')
    if (user_token) {
        console.log('验证token')
    } else {
        message.error('您还未登陆，请先登录', 2, () => {
            redirect('/login')
        })
    }
}

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/article" />}></Route>
            <Route path="/login" element={<CompLazy path="/Login" />}></Route>
            <Route path="/article" element={<CompLazy path="/Article" />}></Route>
            <Route path="/find_pw" element={<CompLazy path="/FindPw" />}></Route>
            <Route path="/register" element={<CompLazy path="/Register" />}></Route>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
}
