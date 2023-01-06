import React, { useMemo, useState } from 'react'
import { Button, message } from 'antd'
import StatusIcon from '@/components/StatusIcon.jsx'
import styled from 'styled-components'
import Pubsub from 'pubsub-js'
import { find } from '@/api/user'

const StyleInput = styled.input`
    @keyframes shake {
        from {
            transform: translateX(-5px);
        }
        to {
            transform: translateX(5px);
        }
    }
`
var timer = null
export default function RegInfo({ setCurrent }) {
    const [$message, contextHolder] = message.useMessage({
        duration: 2
    })
    const [status, setStatus] = useState({
        uname: {
            isUnameInput: false,
            status: 1,
            isShake: false
        },
        fPw: {
            isFPwInput: false,
            status: 1,
            isShake: false
        },
        sPw: {
            isSPwInput: false,
            status: 1,
            isShake: false
        }
    })
    const [regInfo, setRegInfo] = useState({
        username: localStorage.getItem('local_uname') ? localStorage.getItem('local_uname') : '',
        fPassword: '',
        sPassword: ''
    })
    async function getUname(e) {
        setStatus({
            ...status,
            uname: {
                ...status.uname,
                isUnameInput: true,
                status: 2
            }
        })
        if (!timer) {
            const uReg = /\w/g
            const isPass = uReg.test(e.target.value)
            const { isExisted } = await find({ username: e.target.value })
            if(isExisted) {
                $message.error('该用户名已被占用')
                return 
            }
            setStatus({
                ...status,
                uname: {
                    ...status.uname,
                    isUnameInput: true,
                    status: isPass && !isExisted ? 0 : 1
                }
            })
            timer = setTimeout(() => {
                timer = null
            }, 500)
        }
        setRegInfo({
            ...regInfo,
            username: e.target.value
        })
    }
    function getFPw(e) {
        setStatus({
            ...status,
            fPw: {
                ...status.fPw,
                isFPwInput: true,
                status: 2
            }
        })
        if (!timer) {
            const uReg = /\w/g
            const isPass = uReg.test(e.target.value)
            setStatus({
                ...status,
                fPw: {
                    ...status.fPw,
                    isFPwInput: true,
                    status: isPass ? 0 : 1
                }
            })
            timer = setTimeout(() => {
                timer = null
            }, 500)
        }
        setRegInfo({
            ...regInfo,
            fPassword: e.target.value
        })
    }
    function getSPw(e) {
        setStatus({
            ...status,
            sPw: {
                ...status.sPw,
                isSPwInput: true,
                status: 2
            }
        })
        if (!timer) {
            const uReg = /\w/g
            const isPass = uReg.test(e.target.value) && e.target.value === regInfo.fPassword
            setStatus({
                ...status,
                sPw: {
                    ...status.sPw,
                    isSPwInput: true,
                    status: isPass ? 0 : 1
                }
            })
            timer = setTimeout(() => {
                timer = null
            }, 500)
        }
        setRegInfo({
            ...regInfo,
            sPassword: e.target.value
        })
    }
    function verifyPhone() {
        for (const key in status) {
            if (status[key].status) {
                setStatus({
                    ...status,
                    [key]: {
                        ...status[key],
                        isShake: true
                    }
                })
                return
            }
        }
        Pubsub.publish('sendInfo', { 
            username: regInfo.username, 
            password: regInfo.sPassword
        })
        localStorage.setItem('local_uname', regInfo.username)
        setCurrent(1)
    }
    return (
        <div className='info'>
            { contextHolder }
            <div className="username">
                <i style={{ color: 'red', marginRight: '10px' }}>*</i>
                <StyleInput
                    type="text"
                    value={regInfo.username}
                    placeholder='username'
                    onInput={getUname}
                    onChange={e => {
                        setRegInfo({
                            ...regInfo,
                            username: e.target.value
                        })
                    }}
                    style={{ animation: status.uname.isShake && 'shake 0.1s 3' }}
                />
                {status.uname.isUnameInput && <StatusIcon status={status.uname.status} />}
            </div>
            <div className="first_password">
                <i style={{ color: 'red', marginRight: '10px' }}>*</i>
                <StyleInput type="password" placeholder='password' onInput={getFPw} style={{ animation: status.fPw.isShake && 'shake 0.1s 3' }} />
                {status.fPw.isFPwInput && <StatusIcon status={status.fPw.status} />}
            </div>
            <div className="second_password">
                <i style={{ color: 'red', marginRight: '10px' }}>*</i>
                <StyleInput type="password" placeholder='password again' onInput={getSPw} style={{ animation: status.sPw.isShake && 'shake 0.1s 3' }} />
                {status.sPw.isSPwInput && <StatusIcon status={status.sPw.status} />}
            </div>
            <Button type='primary' size='large' className="go_verify_phone" onClick={verifyPhone}>验证手机号</Button>
        </div>
    )
}
