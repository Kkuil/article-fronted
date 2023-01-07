import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Pubsub from 'pubsub-js'

import KSteps from '@/components/KSteps'
import BackLogin from '@/components/BackLogin'
import TSecsNaviLogin from '@/components/TSecsNaviLogin'

import Identify from './components/Identify'
import ChangePw from './components/ChangePw'

const StyleFindPw = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
`
const steps = [
    {
        title: '身份验证',
        content: setCurrent => <Identify setCurrent={setCurrent}/>
    },
    {
        title: '更换密码',
        content: (setCurrent, phone_number) => <ChangePw setCurrent={setCurrent} phone_number={phone_number}/>
    },
    {
        title: '找回成功',
        content: () => <TSecsNaviLogin sentence="修改成功"/>
    },
];

var sid = null
export default function FindPw() {
    const [current, setCurrent] = useState(2)
    let [phoneNumber, setPhoneNumber] = useState('')
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }))
    useEffect(() => {
        sid = Pubsub.subscribe('get_phone_number', (_, phone_number) => {
            setPhoneNumber(phone_number)
        })
        return () => {
            sid && Pubsub.unsubscribe(sid)
        }
    }, [])
    return (
        <StyleFindPw className='find_pw flex_center'>
            <BackLogin />
            <KSteps current={current} items={items}>
                {steps[current].content(setCurrent, phoneNumber)}
            </KSteps>
        </StyleFindPw>
    )
}