import { Button } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const StyleTop = styled.div`
    position: relative;
    height: 70px;
    background-color: #0094ff;
    font-size: 30px;
    font-weight: bold;
    transition: all .3s;
    transform: translateY(-80px);
    animation: down 0.5s ease-in-out forwards;
    @keyframes down {
        to {
            transform: translateY(0);
        }
    }
    button {
        position: absolute;
        top: 50%;
        left: 30px;
        transform: translateY(-50%);
    }
`

function Top({ user }) {
    const navigateTo = useNavigate()
    return (
        <StyleTop className='flex_center'>
            <Button
                onClick={() => navigateTo("/")}
            >回到主页</Button>
            <span className='title'>{user.username}的个人中心</span>
        </StyleTop>
    )
}

const mapStateToProps = ({ user: { user } }) => {
    return {
        user
    }
}

export default connect(mapStateToProps)(Top)
