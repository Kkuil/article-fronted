import React, { useState, useEffect } from 'react';
import KSteps from '@/components/KSteps'
import Pubsub from 'pubsub-js'
import styled from 'styled-components';

import BackLogin from '@/components/BackLogin'
import RegInfo from './components/RegInfo';
import VerifyPhone from './components/VerifyPhone';
import RegSuc from './components/RegSuc';

const steps = [
    {
        title: '填写基本信息',
        content: setCurrent => <RegInfo setCurrent={setCurrent} />
    },
    {
        title: '验证手机号',
        content: (setCurrent, userInfo) => <VerifyPhone setCurrent={setCurrent} {...userInfo} />,
    },
    {
        title: '注册成功',
        content: () => <RegSuc />,
    },
];

const StyleRegister = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    .info {
        width: 40%;
        > div {
            position: relative;
            display: flex;
            justify-content: center;
            width: 100%;
            margin: 15px 0;
        }
        > button {
            display: block;
            margin: 20px auto 10px;
        }
    }
    .verify_phone {
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
            .change_info {
                width: 35%;
                background-color: #e6f4ff;
            }
            .reg {
                width: 60%;
                color: #fff;
                background-color: #1677ff;
            }
        }
    }
`
var sid = null
export default function Register() {
    const [current, setCurrent] = useState(0)
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    let [userInfo, setUserInfo] = useState({
        username: '',
        password: ''
    })
    useEffect(() => {
        sid = Pubsub.subscribe('sendInfo', (_, { username, password }) => {
            setUserInfo({
                username,
                password
            })
        })
        return () => {
            sid && Pubsub.unsubscribe(sid)
        }
    }, [userInfo])
    return (
        <StyleRegister className="flex_center">
            <BackLogin />
            <KSteps current={current} items={items}>
                {steps[current].content(setCurrent, userInfo)}
            </KSteps>
        </StyleRegister>
    );
}