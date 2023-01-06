import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Spin } from 'antd'

const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
)

const StyleIcon = styled.div`
    position: absolute;
    top: 10%;
    right: -35px;
    i {
        font-size: 30px;
    }
    .icon-duigou {
        color: #7ee778;
    }
    .icon-cuo {
        color: red;
    }
`
export default function StatusIcon({ status }) {
    const mapStatus = {
        0: (
            <i className="iconfont icon-duigou"></i>
        ),
        1: (
            <i className="iconfont icon-cuo"></i>
        ),
        2: (
            <Spin indicator={antIcon} />
        )
    }
    return (
        <StyleIcon className='status_icon'>
            {mapStatus[status]}
        </StyleIcon>
    )
}