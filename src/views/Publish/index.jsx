import { useEffect } from 'react'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

import RichText from './components/RichText'
import TopMenu from './components/TopMenu'
import { auth } from '@/api/user'

export default function Publish() {
    const navigateTo = useNavigate()
    // Auth
    useEffect(() => {
        async function Auth() {
            const { status } = await auth()
            if (status !== 200) {
                message.error('您还未登录，请先去登录吧', 2)
                navigateTo('/login')
            }
        }
        Auth()
    }, [navigateTo])
    return (
        <div className="publish">
            <TopMenu />
            <RichText />
        </div>
    )
}
