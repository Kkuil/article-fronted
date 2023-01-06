import React, { useState, useEffect } from 'react';
import { Steps } from 'antd';
import styled from 'styled-components';

import RegInfo from './components/RegInfo';
import VerifyPhone from './components/VerifyPhone';
import RegSuc from './components/RegSuc';
import Pubsub from 'pubsub-js'

const steps = [
    {
        title: '填写基本信息',
        content: setCurrent => <RegInfo setCurrent={setCurrent} />
    },
    {
        title: '验证手机号',
        content: (setCurrent, userInfo) => <VerifyPhone setCurrent={setCurrent} {...userInfo}/>,
    },
    {
        title: '注册成功',
        content: () => <RegSuc />,
    },
];

const StyleRegister = styled.div`
    width: 100vw;
    height: 100vh;
    .register {
        width: 60%;
        height: 300px;
    }
    .steps_content {
        width: 100%;
        height: 270px;
        border-bottom: 1px solid #ccc;
        .info {
            width: 40%;
            > div {
                position: relative;
                display: flex;
                justify-content: center;
                width: 100%;
                margin: 15px 0;
                input {
                    width: 100%;
                    height: 35px;
                    font-size: 16px;
                    border-radius: 10px;
                    border: 1px solid #777;
                    padding-left: 10px;
                }
            }
            > button {
                display: block;
                margin: 20px auto 10px;
            }
        }
        .verify_phone {
            > input {
                width: 100%;
                height: 35px;
                font-size: 16px;
                border-radius: 10px;
                border: 1px solid #777;
                padding-left: 10px;
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
            console.log(username, password)
            setUserInfo({
                username,
                password
            })
        })
        return () => {
            sid && Pubsub.unsubscribe(sid)
        }
    }, [userInfo, sid])
    return (
        <StyleRegister className="flex_center">
            <div className='register'>
                <Steps current={current} items={items} />
                <div className="steps_content flex_center">{steps[current].content(setCurrent, userInfo)}</div>
            </div>
        </StyleRegister>
    );
}