import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import style from '@/views/Article/article.module.scss'

const StyleNavBar = styled.div`
    position: relative;
    display: flex;
    height: 40px;
    border-bottom: 1px solid #ccc;
    .item {
        cursor: pointer;
        padding: 0 15px;
        height: 100%;
        border-bottom: 3px solid transparent;
        transition: color .3s;
        i {
            margin-right: 3px;
            font-size: 16px;
        }
        span {
            font-size: 15px;
        }
    }
    b {
        margin-top: 7px;
        color: #ccc;
    }
    .active {
        color: #0094ff;
        border-color: #0094ff;
    }
`
const availablePathname = [
    '/article/recommend',
    '/article/newest',
    '/article/hottest',
]
export default function Articles() {
    const navigateTo = useNavigate()
    const { pathname } = useLocation()
    function changeNav({ params }) {
        navigateTo(`/article/${params}`)
    }
    useEffect(() => {
        if(availablePathname.includes(pathname)) {
            navigateTo(pathname)
        } else {
            navigateTo('/article/recommend')
        }
    }, [pathname, navigateTo])
    return (
        <div className={style.articles}>
            <StyleNavBar className="nav_bar">
                <div 
                    className={`item flex_center ${pathname === '/article/recommend' ? 'active' : ''}`}
                    onClick={() => changeNav({ params: 'recommend' })}
                >
                    <i className="iconfont icon-tuijian"></i>
                    <span>推荐</span>
                </div>
                <b>|</b>
                <div 
                    className={`item flex_center ${pathname === '/article/newest' ? 'active' : ''}`}
                    onClick={() => changeNav({ params: 'newest' })}
                >
                    <i className="iconfont icon-zuixinzixun-10"></i>
                    <span>最新</span>
                </div>
                <b>|</b>
                <div 
                    className={`item flex_center ${pathname === '/article/hottest' ? 'active' : ''}`}
                    onClick={() => changeNav({ params: 'hottest' })}
                >
                    <i className="iconfont icon-remen"></i>
                    <span>最热</span>
                </div>
            </StyleNavBar>
            <Outlet></Outlet>
        </div>
    )
}
