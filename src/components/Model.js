import React from 'react'
import styled from "styled-components";
const StyleModel = styled.div`
    position: relative;
    z-index: 9999;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
`
export default function Model(props) {
    return (
        <StyleModel className="model flex_center">
            {props.children}
        </StyleModel>
    )
}
