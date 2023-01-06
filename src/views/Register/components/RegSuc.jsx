import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

var timer = null
export default function RegSuc() {
    const navigateTo = useNavigate()
    let [remainSec, setRemainSec] = useState(3)
    useEffect(() => {
        if(remainSec)  {
            timer = setInterval(() => {
                setRemainSec(remainSec-1)
            }, 1000)
        } else {
            clearInterval(timer)
            navigateTo('/login')
        }
    }, [remainSec])
    return (
        <div className='reg_suc'>
            <i className="iconfont icon-duigou" style={{color: '#7ee784', fontSize: '20px'}}></i>
            <span>恭喜你已经完成注册</span><br />
            <span style={{fontSize: '12px', marginLeft: '35px'}}>{remainSec}秒后跳转登录页面</span>
        </div>
    )
}
