import React from 'react'
import { Steps } from 'antd'
import styled from 'styled-components'

const StyleSteps = styled.div`
    width: 60%;
    height: 300px;
    .steps_content {
        width: 100%;
        height: 270px;
        border-bottom: 1px solid #ccc;
    }
`

export default function KSteps({ current, items, children }) {
    return (
        <StyleSteps className='steps'>
            <Steps current={current} items={items} />
            <div className="steps_content flex_center">
                { children }
            </div>
        </StyleSteps>
    )
}
