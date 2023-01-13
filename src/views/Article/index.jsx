import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import style from './article.module.scss'
import { message } from 'antd'
import PubSub from 'pubsub-js'

import { auth } from '@/api/user'
import TopMenu from './components/TopMenu'
import ToolKits from './components/ToolKits'

export default function Article() {
    let [user, setUser] = useState({
        username: '未登录',
        avatar: ''
    })
    const [isStudying, setIsStudying] = useState(false)
    useEffect(() => {
        async function Auth() {
            const { status, msg, user } = await auth()
            if (status === 200) {
                setUser(user)
            } else {
                message.error(msg, 3)
            }
        }
        Auth()
    }, [])
    useEffect(() => {
        PubSub.subscribe('studying', (_, bool) => {
            setIsStudying(bool)
        })
    }, [])
    return (
        <div
            className={style.article}
            style={{
                height: `${isStudying && '100vh'}`,
                overflow: `${isStudying && 'hidden'}`
            }}
        >
            <TopMenu user={user} />
            <div
                className={`${style.views} views`}
            >
                <Outlet></Outlet>
            </div>
            <ToolKits />
        </div>
    )
}