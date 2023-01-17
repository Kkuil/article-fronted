import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ToolKits from './ToolKits'

const StyleStudy = styled.div`
    position: relative;
    height: 100%;
    font-size: 80px;
    font-weight: bold;
    color: #fff;
    .tool_kits {
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        i {
            margin: 5px 0;
            cursor: pointer;
            width: 50px;
            height: 50px;
            font-size: 25px;
            border-radius: 50%;
            background-color: #0094ff;
            color: #fff;
            transition: all .3s;
            &:hover {
                opacity: 0.87;
            }
            &:active {
                transform: scale(0.9);
            }
        }
    }
`

function Study({ study_time }) {
    return (
        <StyleStudy className='study flex_center'>
            <div className="time">{study_time}</div>
            <ToolKits />
        </StyleStudy>
    )
}

const mapStateToProps = state => {
    return {
        study_time: state.studyTime.study_time
    }
}

export default connect(mapStateToProps)(Study)