import React, { useState, useEffect, createRef, useCallback } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Avatar } from 'antd'
import _ from 'lodash'
import Pubsub from 'pubsub-js'

import CollapseNav from "./CollapseNav"

const StyleTM = styled.div`
    z-index: 2;
    position: sticky;
    top: 0;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 0 80px;
    border-bottom: 1px solid #ccc;
    transition: all 0.6s;
    background-color: #fff;
    > div {
        display: flex;
        align-items: center;
        height: 100%;
    }
    .logo {
        cursor: pointer;
        width: 80px;
        background-color: #fff;
        img {
            width: 80px;
        }
    }
    .nav {
        cursor: pointer;
        display: flex;
        position: relative;
        justify-content: center;
        width: 400px;
        a {
            width: 70px;
            font-size: 16px;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
    }
    .collapse_nav {
        cursor: pointer;
        display: none;
        i {
            font-size: 22px;
        }
    }
    .advertise {
        width: 200px;
        height: 100%;
        padding: 0 10px;
        img {
            height: 100%;
        }
    }
    .search {
        cursor: pointer;
        overflow: hidden;
        width: 200px;
        height: 40px;
        padding: 0 10px;
        margin-left: 10px;
        border: 2px solid #777;
        border-radius: 20px;
        i{
            font-size: 18px;
        }
        input {
            width: 140px;
            border: 0;
            margin-left: 10px;
            border-bottom: 1px solid transparent;
            transition: all .3s;
            &:hover {
                border-bottom-color: #0094ff;
            }
            &:focus {
                border-bottom-color: #0094ff;
            }
        }
        &:hover {
            border: 2px solid #0094ff;
        }
    }
    .publish_article {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-left: 10px;
        .publish {
            overflow: hidden;
            cursor: pointer;
            display: flex;
            align-items: center;
            width: 110px;
            height: 40px;
            border-radius: 20px;
            color: #fff;
            background-color: #0094ff;
            border: 0;
            transition: all .3s;
            i { 
                padding-top: 10px;
                width: 30%;
                height: 100%;
                border-right: 1px solid #ccc;
                font-size: 20px;
                background-color: rgba(0, 148, 255, 0.8);
            }
            span {
                padding-left: 10px;
                font-size: 17px;
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            }
            &:hover {
                background-color: rgba(0, 148, 255, 0.8);
            }
        }
    }
    .profile {
        position: relative;
        margin-left: 10px;
        cursor: pointer;
        .username {
            margin-right: 5px;
        }
    }
    @media screen and (max-width: 380px) {
        .publish_article {
            .publish {
                width: 40px;
                i {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    border: 0;
                    padding: 0;
                }
                span {
                    display: none;
                }
            }
        }
        .search {
            width: 40px;
            padding: 0;
            i {
                padding-left: 9px;
            }
            input {
                display: none;
            }
        }
        .profile {
            .username {
                display: none;
            }
        }
    }
    @media screen and (max-width: 1050px) {
        padding: 0;
        .nav {
            display: none;
        }
        .collapse_nav {
            display: flex;
        }
    }
    @media screen and (max-width: 1000px) {
        .advertise {
            display: none;
        }
    }    
`

const activeStyle = {
    color: '#0094ff',
    borderBottom: '2px solid #0094ff'
}

const getDropItems = (navigateTo, isLogin) => {
    const menu = [
        {
            key: "my",
            label: (
                <span>
                    <i className="iconfont icon-wode"></i>
                    <span onClick={() => navigateTo("/profile")}>我的</span>
                </span>
            )
        },
        {
            key: "logout",
            label: <span
                onClick={() => {
                    const USER_TOKEN = localStorage.getItem("USER_TOKEN")
                    USER_TOKEN && localStorage.removeItem("USER_TOKEN")
                    navigateTo("/login")
                }}
            >
                <i className="iconfont icon-dingbudaohang-zhangh"></i>
                <span>{isLogin ? "退出登录" : "去登录"}</span>
            </span>
        },
    ]
    return isLogin ? menu : menu.slice(1)
}

const activeFunc = ({ isActive }) => isActive ? activeStyle : undefined
const indexMap = ["/article/recommend", "/article/newest", "/article/hottest"]

var sidR = null
var sidS = null
export default function TopMenu({ user }) {
    const navigateTo = useNavigate()
    let [isFocus, setIsFocus] = useState(false)
    const location = useLocation()
    const top_menu = createRef()
    // 上一次滚动位置
    let [preScrollY, setPreScrollY] = useState(0)
    const scrollEvent = useCallback(() => {
        Pubsub.publish('hideKits')
        if (window.scrollY > 100 && !(window.scrollY - preScrollY < 0)) {
            top_menu.current.style.transform = 'translateY(-100%)'
            Pubsub.publish('changeScrollTop', true)
        }
        if (window.scrollY > 100 && (window.scrollY - preScrollY < 0 || window.scrollY < 100)) {
            top_menu.current.style.transform = `translateY(0)`
            Pubsub.publish('changeScrollTop', false)
        }
        setPreScrollY(window.scrollY)
        if (window.scrollY > 500) {
            Pubsub.publish('showRTop', true)
        } else {
            Pubsub.publish('showRTop', false)
        }
    }, [top_menu, preScrollY])
    useEffect(() => {
        window.onscroll = _.throttle(scrollEvent, 100)
        sidR = Pubsub.subscribe('recover', () => {
            top_menu.current.style.transform = 'translateY(0)'
            // window.onscroll = null
            // window.onscroll = _.throttle(scrollEvent, 100)
        })
        sidS = Pubsub.subscribe('studying', (_, bool) => {
            top_menu.current.style.transform = bool ? 'translateY(-100%)' : 'translateY(0)'
        })
        return () => {
            sidR && Pubsub.unsubscribe(sidR)
            sidS && Pubsub.unsubscribe(sidS)
            window.onscroll = null
        }
    }, [scrollEvent, top_menu])
    return (
        <StyleTM className='top_menu' ref={top_menu}>
            <div className="logo" onClick={() => navigateTo('/article')}>
                <img src="/image/logo.png" alt="Ky" title='Ky客' />
            </div>
            <>
                <div className="nav">
                    <NavLink to={indexMap.includes(location.pathname) ? location.pathname : "/article/recommend"} style={activeFunc}>首页</NavLink>
                    <NavLink to='/article/studying' style={activeFunc}>学习</NavLink>
                    <NavLink to='/article/life' style={activeFunc}>生活</NavLink>
                    <NavLink to='/article/coding' style={activeFunc}>Coding</NavLink>
                    <NavLink to='/article/clothes' style={activeFunc}>服饰</NavLink>
                    <NavLink to='/article/foods' style={activeFunc}>美食</NavLink>
                </div>
                <div className="collapse_nav">
                    <CollapseNav />
                </div>
            </>
            <div className="advertise flex_center">
                <img src="/image/advertise.png" alt="" title='advertise' />
            </div>
            <div className="search" style={{ borderColor: isFocus && '#0094ff' }}>
                <i className="iconfont icon-search" style={{ color: isFocus && '#0094ff' }}></i>
                <input type="text" placeholder='search' onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} />
            </div>
            <div className="publish_article">
                <button
                    className='publish'
                    title='发文章'
                    onClick={() => navigateTo('/publish')}
                >
                    <i className="iconfont icon-Writing"></i>
                    <span>发文章</span>
                </button>
            </div>
            <div className="profile flex_center">
                <span className='username'>{user.username}</span>
                {
                    user.avatar
                        ? <img src={user.avatar} alt="" title={user.username} />
                        : <Avatar size='large' icon={<UserOutlined />} />
                }
                <Dropdown
                    menu={{
                        items: getDropItems(navigateTo, user.isLogin)
                    }}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <i
                        className="iconfont icon-arrow-down-filling"
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            fontSize: 70,
                            color: "transparent"
                        }}
                    ></i>
                </Dropdown>
            </div>
        </StyleTM>
    )
}
