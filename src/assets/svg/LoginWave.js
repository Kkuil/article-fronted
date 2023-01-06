import React from 'react'
import Icon from '@ant-design/icons'
import styled from 'styled-components'

const StyleWave = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 900px;
    height: 100%;
`

export default function LoginWriting() {
    const wave = () => <svg width="900px" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#0094FF" d="M36.4,-61.6C42.4,-52.8,39.3,-34.6,42.4,-21.3C45.4,-8,54.7,0.6,53.9,7.9C53.1,15.2,42.3,21.3,35.2,31.6C28,42,24.5,56.7,16.4,62C8.2,67.2,-4.5,62.9,-13.2,55.5C-21.9,48.1,-26.5,37.6,-28.9,28.5C-31.3,19.5,-31.5,12,-33.1,4.5C-34.6,-3.1,-37.5,-10.8,-35.2,-16.1C-32.8,-21.4,-25.2,-24.3,-18.4,-32.8C-11.7,-41.4,-5.8,-55.4,4.7,-62.7C15.2,-70,30.4,-70.4,36.4,-61.6Z" transform="scale(3.5)" />
    </svg>
    return (
        <StyleWave className="wave">
            <Icon component={wave} />
        </StyleWave>
    )
}