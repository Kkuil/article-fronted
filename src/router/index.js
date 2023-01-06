import { Routes, Route, Navigate } from "react-router-dom"

import CompLazy from '@/utils/CompLazy.js'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/article"/>}></Route>
            <Route path="/login" element={<CompLazy path="/Login"/>}></Route>
            <Route path="/article" element={<CompLazy path="/Article"/>}></Route>
            <Route path="/find_pw" element={<CompLazy path="/FindPw"/>}></Route>
            <Route path="/register" element={<CompLazy path="/Register"/>}></Route>
        </Routes>
    )
}
