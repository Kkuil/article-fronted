import { Routes, Route, Navigate } from "react-router-dom"
import CompLazy from '@/utils/CompLazy.js'

import NotFound from '@/views/NotFound'
import ArticleType from '@/views/Article/views/Main/views/ArticleType'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/article/" />}></Route>
            <Route path="/login" element={<CompLazy path="/Login" />}></Route>
            <Route path="/article" element={<CompLazy path="/Article" />}>
                <Route path="/article" element={<CompLazy path="/Article/views/Main" />}>
                    <Route path=":type" element={<ArticleType />}></Route>
                </Route>
                <Route path="details" element={<CompLazy path="/Article/views/ArticleDetails" />}></Route>
                <Route path="studying" element={<CompLazy path="/Article/views/Studying" />}></Route>
                <Route path="life" element={<CompLazy path="/Article/views/Life" />}></Route>
                <Route path="coding" element={<CompLazy path="/Article/views/Coding" />}></Route>
                <Route path="clothes" element={<CompLazy path="/Article/views/Clothes" />}></Route>
                <Route path="foods" element={<CompLazy path="/Article/views/Foods" />}></Route>
            </Route>
            <Route path="/profile" element={<CompLazy path="/Profile" />}>
                <Route path="/profile" element={<Navigate to="/profile/index" />}></Route>
                <Route path="index" element={<CompLazy path="/Profile/views/Index" />}></Route>
                <Route path="like" element={<CompLazy path="/Profile/views/Like" />}></Route>
                <Route path="checking" element={<CompLazy path="/Profile/views/Checking" />}></Route>
                <Route path="checked" element={<CompLazy path="/Profile/views/Checked" />}></Route>
            </Route>
            <Route path="/find_pw" element={<CompLazy path="/FindPw" />}></Route>
            <Route path="/register" element={<CompLazy path="/Register" />}></Route>
            <Route path="/publish" element={<CompLazy path="/Publish" />}></Route>
            <Route path="/404NF" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
