import React from 'react'
import { useEffect } from 'react'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

import { modify } from "@/store/modules/user"

import RichText from './components/RichText'
import TopMenu from './components/TopMenu'
import { auth } from '@/api/user'
import { connect } from 'react-redux'

function Publish({ modify }) {
    const navigateTo = useNavigate()
    // Auth
    useEffect(() => {
        async function Auth() {
            const { user, status } = await auth()
            if (status !== 200) {
                message.error('您还未登录，请先去登录吧', 2)
                navigateTo('/login')
                return 
            }
            modify({
                ...user,
                isLogin: true
            })
        }
        Auth()
    }, [])
    return (
        <div className="publish">
            <TopMenu />
            <RichText />
        </div>
    )
}

const mapDispatchToProps = {
    modify
}

export default connect(() => ({}), mapDispatchToProps)(Publish)
