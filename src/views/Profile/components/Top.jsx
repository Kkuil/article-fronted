import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const StyleTop = styled.div`
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
`

function Top({ user }) {
    return (
        <StyleTop className='flex_center'>
            <span className='title'>{ user.username }的个人中心</span>
        </StyleTop>
    )
}

const mapStateToProps = ({ user: { user } }) => {
    return {
        user
    }
}

export default connect(mapStateToProps)(Top)
