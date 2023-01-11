import React, { useEffect } from 'react'
import _ from 'lodash'
import { auth } from '@/api/user'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

var bannedDouble = false
export default function Publish() {
    const navigateTo = useNavigate()
    // Auth
    useEffect(() => {
        if (!bannedDouble) {
            async function Auth() {
                if (!bannedDouble) {
                    const { status } = await auth()
                    if (status !== 200) {
                        message.error('您还未登录，请先去登录吧', 2)
                        navigateTo('/login')
                    }
                }
            }
            Auth()
            bannedDouble = true
        }
        return () => {
            bannedDouble = false
        }
    }, [])
    return (
        <div>Publish</div>
    )
}
