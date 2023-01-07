import React, { createRef } from 'react'
import styled from 'styled-components'
import { update } from '@/api/user'
import { Button, message } from 'antd'

const StyleInput = styled.input`
    margin: 10px 0;
`

const StyleButtons = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        cursor: pointer;
        height: 35px;
        border-radius: 10px;
        border: 0;
    }
    .change_identify {
        width: 35%;
        background-color: #e6f4ff;
    }
    .confirm {
        width: 60%;
        color: #fff;
        background-color: #1677ff;
    }
`

export default function ChangePw({ setCurrent, phone_number }) {
    const fPw = createRef()
    const sPw = createRef()
    const confirm = async () => {
        const fPwVal = fPw.current.value
        const sPwVal = sPw.current.value
        if (fPwVal && sPwVal) {
            if (fPwVal === sPwVal) {
                const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                if(reg.test(fPwVal)) {
                    if(phone_number) {
                        await update({ phone_number, password: sPwVal })
                        message.success('修改成功')
                        setCurrent(2)
                    } else {
                        message.error('修改错误，请检查网络是否连接')
                    }
                } else {
                    message.warning('密码必须是包含数字、字母的至少8位的字符')
                }
            }
            else {
                message.error('两次密码不相等')
            }
        } else {
            message.warning('密码不能为空')
        }
    }
    return (
        <div className='change_pw'>
            <StyleInput type="text" className='account_input' disabled value={phone_number} style={{ cursor: 'not-allowed' }} /><br />
            <StyleInput type="password" className='account_input' placeholder='new password' ref={fPw} /><br />
            <StyleInput type="password" className='account_input' placeholder='new password again' ref={sPw} /><br />
            <StyleButtons className="pre_next">
                <button className='change_identify' onClick={() => {
                    setCurrent(0)
                }}>更改身份</button>
                <Button type='primary' className='confirm' onClick={confirm}>确认修改</Button>
            </StyleButtons>
        </div>
    )
}
