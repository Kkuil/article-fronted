import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { findWithLogin } from '@/api/user'
import LoginInput from '@/components/LoginInput'
import { message } from 'antd'

import LoginWriting1 from '@/assets/svg/LoginWriting1'
import LoginWriting2 from '@/assets/svg/LoginWriting2'
import LoginArticle from '@/assets/svg/LoginArticle'
import LoginWave from '@/assets/svg/LoginWave'
import LoginAvatar from '@/assets/svg/LoginAvatar'

import style from './login.module.scss'

const StyleWords = styled.span`
    position: absolute;
    top: 80px;
    left: 100px;
    .title {
        font-size: 50px;
        font-weight: bold;
    }
    p {
        margin: 5px 0;
    }
`

const StyleAccForPw = styled.div`
    width: 240px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    color: #ccc;
    font-size: 13px;
    font-weight: bold;
    > span {
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`

const StyleLogin = styled.button`
    margin-top: 15px;
    cursor: pointer;
    width: 240px;
    height: 45px;
    border: 0;
    font-weight: bold;
    color: #fff;
    background-color: #0094ff;
    font-size: 17px;
    border-radius: 10px;
    transition: all .3s;
    &:hover {
        transform: scale(1.05);
    }
    &:active {
        transform: scale(0.95);
    }
`

export default function Login() {
    const navigateTo = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const login = async () => {
        const { isAuth } = await findWithLogin({ username, password })
        if(isAuth) {
            message.success('登录成功', 2)
            navigateTo('/article')
        } else {
            message.error('请检查输入的用户名密码是否正确', 2)
        }
    }
    return (
        <div id="login" className={style.login}>
            <div className={style.left}>
                <LoginWriting1 />
                <LoginWriting2 />
                <LoginWave />
                <StyleWords className="words">
                    <span className="title">Ky客</span>
                    <p className="descriptions">
                        This is a fronted-project based on React, React-router-dom and other modules.
                    </p>
                    <p className="introduction">
                        You can write down your ideas in here.
                    </p>
                </StyleWords>
            </div>
            <div className={style.right}>
                <LoginAvatar />
                <LoginArticle />
                <LoginInput icon="icon-user" value={setUsername} type="text" placeholder="username" />
                <LoginInput icon="icon-password" value={setPassword} type="password" placeholder="password" />
                <StyleAccForPw>
                    <span onClick={() => navigateTo('/register')}>Account</span>
                    <span onClick={() => navigateTo('/find_pw')}>Forget password?</span>
                </StyleAccForPw>
                <StyleLogin className='login' onClick={login}>登录</StyleLogin>
            </div>
        </div>
    )
}
