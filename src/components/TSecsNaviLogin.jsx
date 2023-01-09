import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

var timer = null
export default function TSecsNaviLogin({ sentence }) {
    const navigateTo = useNavigate()
    let [remainSec, setRemainSec] = useState(3)
    useEffect(() => {
        if (remainSec) {
            timer = setInterval(() => {
                setRemainSec(remainSec - 1)
            }, 1000)
        } else {
            clearInterval(timer)
            navigateTo('/login')
        }
        return () => {
            clearInterval(timer)
        }
    }, [remainSec, navigateTo])
    return (
        <div className='secs'>
            <i className="iconfont icon-duigou" style={{ color: '#7ee784', fontSize: '20px' }}></i>
            <span>{sentence}</span><br />
            <span style={{ fontSize: '12px' }}>{remainSec}秒后跳转登录页面</span>
        </div>
    )
}
