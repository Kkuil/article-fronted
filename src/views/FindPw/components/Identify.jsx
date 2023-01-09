import React, { useState, createRef } from 'react'
import styled from 'styled-components'
import { message, Button } from 'antd'
import Pubsub from 'pubsub-js'

import { find } from '@/api/user'
import { send, verify } from '@/api/captcha'

const StyleIdentify = styled.div`
    .title {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }
    .verify_code {
        margin-top: 15px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        input {
            width: 48%;
            height: 35px;
            font-size: 16px;
            border-radius: 10px;
            border: 1px solid #777;
            padding-left: 10px;
        }
        button {
            cursor: pointer;
            width: 48%;
            height: 35px;
            border-radius: 10px;
            border: 0;
        }
    }
    .tips {
        margin-top: 5px;
        font-size: 12px;
    }
    .pre_next {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
            cursor: pointer;
            height: 35px;
            border-radius: 10px;
            border: 0;
        }
        .reg {
            width: 100%;
            color: #fff;
            background-color: #1677ff;
        }
    }
}
`
var timer = null

export default function Identify({ setCurrent }) {
    const [$message, contextHolder] = message.useMessage({
        duration: 2,
    })
    let [isSending, setIsSending] = useState(false)
    let [remainSec, setRemainSec] = useState(60)
    let [isLoading, setIsLoading] = useState(false)
    const phone_number = createRef()
    const code = createRef()
    const sendCode = async () => {
        if (!timer) {
            const regPhone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
            if (regPhone.test(phone_number.current.value)) {
                // 验证手机号是否已注册
                const { isExisted } = await find({
                    phone_number: phone_number.current.value
                })
                if (!isExisted) {
                    $message.info('该手机号还没有注册，快去注册吧！')
                    return
                }
                // 发送验证码
                send(phone_number.current.value)
                !isSending && setIsSending(true)
                $message.success('发送成功')
                timer = setInterval(() => {
                    if (remainSec) setRemainSec(remainSec--)
                    else {
                        clearInterval(timer)
                        setIsSending(false)
                        setRemainSec(60)
                    }
                }, 1000)
            } else $message.error('手机号输入有误，发送失败')
        } else {
            setIsSending(false)
        }
    }
    const verifyCode = async () => {
        try {
            const Phone = phone_number.current.value
            const Code = code.current.value
            setIsLoading(true)
            if (Phone && Code) {
                const { status } = await verify({
                    phone: Phone,
                    code: Code
                })
                if (status === 200) {
                    $message.success('验证成功')
                    Pubsub.publish('get_phone_number', Phone)
                    setCurrent(1)
                } else {
                    $message.error('验证码错误或已失效')
                }
            } else {
                $message.error('验证失败，请检查输入是否有误')
            }
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <StyleIdentify className='identify'>
            {contextHolder}
            <div className="title">请输入注册时的手机号</div>
            <input type="text" className='account_input' placeholder='phone' ref={phone_number} />
            <div className="verify_code">
                <input type="text" className='account_input' placeholder='code' ref={code} />
                <button disabled={isSending} onClick={sendCode}>
                    {
                        isSending
                            ? `${remainSec}秒后再发送`
                            : '发送验证码'
                    }
                </button>
            </div>
            <div className="tips" >注：验证码三分钟内有效</div>
            <div className="pre_next">
                <Button loading={isLoading} className="reg" onClick={verifyCode}>验证</Button>
            </div>
        </StyleIdentify>
    )
}
