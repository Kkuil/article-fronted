import React, { createRef, useState } from 'react'
import styled from 'styled-components'

const StyleLogin = styled.div`
    position: relative;
    display: flex;
    overflow: hidden;
    margin-top: 15px;
    i {
        width: 30px;
        padding-top: 15px;
        font-size: 25px;
    }
    input {
        z-index: 2;
        background-color: transparent;
        width: 210px;
        height: 45px;
        border: 0;
        font-size: 20px;
        padding: 15px 0 0 5px;
        font-weight: bold;
        border-bottom: 1px solid #ccc;
    }
    .placeholder {
        z-index: 1;
        transition: all .3s;
        position: absolute;
        color: #ccc;
        font-size: 18px;
    }
    @keyframes moveUp {
        from {
            transform: translate(35px, 15px) scale(1);
        }
        to {
            transform: translate(-5px, -8px) scale(0.8);
            color: #0094ff;
        }
    }
    @keyframes moveDown {
        to {
            transform: translate(35px, 15px) scale(1);
        }
    }
`

export default function LoginInput({ icon, type, placeholder, value }) {
    const text = createRef()
    const [isFocus, setIsFocus] = useState(false)
    function focus() {
        setIsFocus(true)
    }
    function blur() {
        setIsFocus(text.current.value)
    }
    return (
        <StyleLogin className='login'>
            <i className={`iconfont ${icon}`} style={{color: isFocus && '#0094ff'}}></i>
            <input type={type} ref={text} onFocus={focus} onBlur={blur} onInput={() => value(text.current.value)} style={{borderColor: isFocus && '#0094ff'}}/>
            <span className='placeholder' style={{ animation: isFocus ? 'moveUp 0.2s linear forwards' : 'moveDown 0.2s linear forwards' }}>{placeholder}</span>
        </StyleLogin>
    )
}