import React from 'react'
import styled from 'styled-components'

const StyleTopMenu = styled.div`
    height: 50px;
    >button {
        cursor: pointer;
        margin: 0 5px;
        padding: 5px 10px;
        border-radius: 5px;
        border: 0;
        transition: all .3s;
        &:hover {
            transform: scale(1.05);
        }
        &:active {
            transform: scale(0.95);
        }
    }
    .publish {
        background-color: #0094ff;
        color: #fff;
    }
`

export default function TopMenu() {
    return (
        <StyleTopMenu className='flex_center'>
            <button className="publish">发布</button>
            <button className="save">暂存</button>
        </StyleTopMenu>
    )
}
