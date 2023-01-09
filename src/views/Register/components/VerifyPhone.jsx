import React, { createRef, useCallback, useState } from 'react'
import { message, Button } from 'antd'
import { find } from '@/api/user'
import { send, verify } from '@/api/captcha'
import { add } from '@/api/user'

var timer = null
export default function VerifyPhone({ setCurrent, username, password }) {
    const [$message, contextHolder] = message.useMessage({
        duration: 2,
    })
    let [isSending, setIsSending] = useState(false)
    let [remainSec, setRemainSec] = useState(60)
    let [isLoading, setIsLoading] = useState(false)
    const phone_number = createRef()
    const code = createRef()
    const sendCode = useCallback(async () => {
        if (!timer) {
            const regPhone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
            if (regPhone.test(phone_number.current.value)) {
                // 验证手机号是否已注册
                const { isExisted } = await find({
                    phone_number: phone_number.current.value
                })
                if(isExisted) {
                    $message.info('该手机号已经被使用了，如忘记密码，点此找回密码')
                    return 
                }
                // 发送验证码
                send(phone_number.current.value)
                !isSending && setIsSending(true)
                $message.success('发送成功')
                timer = setInterval(() => {
                    if (remainSec) setRemainSec(remainSec--)
                    else {
                        setIsSending(false)
                        setRemainSec(60)
                        clearInterval(timer)
                    }
                }, 1000)
            } else $message.error('手机号输入有误，发送失败')
        } else {
            setIsSending(false)
        }
    }, [$message, isSending, phone_number, remainSec])
    const verifyCode = async () => {
        const Phone = phone_number.current.value
        const Code = code.current.value
        setIsLoading(true)
        if(Phone && Code) {
            const { status } = await verify({
                phone: Phone,
                code:Code
            })
            if(status === 200) {
                await add({
                    username,
                    password,
                    phone_number: Phone
                })
                $message.success('注册成功')
                setCurrent(2)
            } else {
                $message.error('验证码错误或已失效')
            }
        } else {
            $message.error('注册失败，请检查输入是否有误')
        }
        setIsLoading(false)
    }
    return (
        <>
            {contextHolder}
            <div className='verify_phone'>
                <input type="text" className='account_input' placeholder='phone number' ref={phone_number} />
                <div className="verify_code">
                    <input type="text" className='account_input' placeholder='code' ref={code}/>
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
                    <button className="change_info" onClick={() => setCurrent(0)}>更改信息</button>
                    <Button loading={isLoading} className="reg" onClick={verifyCode}>注册</Button>
                </div>
            </div>
        </>
    )
}
