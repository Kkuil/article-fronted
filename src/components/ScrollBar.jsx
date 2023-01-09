import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const StyleScrollBar = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    width: 12px;
    height: 100%;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.3);
    .bar {
        width: 100%;
        height: 30%;
        border-radius: 6px;
        background-color: #ccc;
        opacity: 0.5;
    }
`

export default function ScrollBar({ children }) {
    return (
        <div>
            <div className="children">{children}</div>
            {
                createPortal(
                    (
                        <StyleScrollBar>
                            <div className="bar"></div>
                        </StyleScrollBar>
                    )
                    , document.body
                )
            }
        </div>
    )

}
