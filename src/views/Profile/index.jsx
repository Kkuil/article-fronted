import React, { useEffect } from 'react'
import { modify } from '@/store/modules/user'
import { message } from 'antd'
import { auth } from '@/api/user'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import Top from "./components/Top"
import UserInfo from "./components/UserInfo"

function Profile({ modify }) {
    const navigateTo = useNavigate()
    useEffect(() => {
        async function Auth() {
            const { status, msg, user } = await auth()
            if (status === 200) {
                modify(user)
            } else {
                message.info(msg, 3)
                navigateTo("/login")
            }
        }
        Auth()
    }, [modify])
    return (
        <div>
            <Top></Top>
            <UserInfo />
        </div>
    )
}

const mapStateToProps = ({ user: { user } }) => {
    return {
        user
    }
}

const mapDispatchToProps = {
    modify
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)
