import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const StyleBL = styled.div`
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 50px;
    i {
        font-size: 25px;
        transition: all .3s;
        &:hover {
            background-color: rgba(0, 0, 0, 0.3);
        }
    }
`

export default function BackLogin() {
    const navigateTo = useNavigate()
    return (
        <StyleBL className="back_login flex_center" onClick={() => navigateTo('/login')}>
            <i className="iconfont icon-leftarrow1f"></i>
            <span>返回登录</span>
        </StyleBL>
    )
}
