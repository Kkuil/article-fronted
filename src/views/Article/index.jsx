import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import style from './article.module.scss'
import { message } from 'antd'
import PubSub from 'pubsub-js'
import { modify } from '@/store/modules/user'

import { auth } from '@/api/user'
import TopMenu from './components/TopMenu'
import ToolKits from './components/ToolKits'
import { connect } from 'react-redux'

function Article({ userInfo, modify }) {
    const [isStudying, setIsStudying] = useState(false)
    useEffect(() => {
        async function Auth() {
            const { status, msg, user } = await auth()
            if (status === 200) {
                modify(user)
            } else {
                message.error(msg, 3)
            }
        }
        Auth()
    }, [modify])
    useEffect(() => {
        PubSub.subscribe('studying', (_, bool) => {
            setIsStudying(bool)
        })
    }, [])
    return (
        <div
            className={style.article}
            style={{
                height: `${isStudying ? '100vh' : ''}`,
                overflow: `${isStudying ? 'hidden' : ''}`
            }}
        >
            <TopMenu user={userInfo} />
            <div
                className={`${style.views} views`}
            >
                <Outlet></Outlet>
            </div>
            <ToolKits />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.user
    }
}

const mapDispatchToProps = {
    modify
}

export default connect(mapStateToProps,mapDispatchToProps)(Article)
