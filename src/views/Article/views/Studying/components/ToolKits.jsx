import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import { changeTime, setPlay, restart } from '@/store/modules/studyTime'
import styled from 'styled-components'
import _ from 'lodash'

const StyleToolKits = styled.div`
    @keyframes restart {
        to {
            transform: rotate(360deg)
        }
    }
`

var timerId = null
function ToolKits({ isPlay, changeTime, setPlay, restart }) {
    const [rs, setRs] = useState(false)
    useEffect(() => {
        timerId = setInterval(() => {
            changeTime()
        }, 1000)
        return () => {
            timerId && clearInterval(timerId)
        }
    }, [changeTime])

    return (
        <StyleToolKits className="tool_kits">
            <i
                title={
                    isPlay
                        ? '暂停'
                        : '播放'
                }
                className={`iconfont ${isPlay ? 'icon-pause' : 'icon-playfill'} flex_center`}
                onClick={_.throttle(() => {
                    setPlay()
                    if (timerId) {
                        clearInterval(timerId)
                        timerId = null
                        message.info('已暂停', 3)
                    } else {
                        timerId = setInterval(() => {
                            changeTime()
                        }, 1000)
                        message.success('欢迎回来', 3)
                    }
                }, 1000)}
            ></i>
            <i
                title="重新计时"
                className="iconfont icon-restart-line flex_center"
                onClick={_.throttle(() => {
                    restart()
                    setRs(true)
                    setTimeout(() => setRs(false), 500)
                    message.info('重新计时', 3)
                }, 1000)}
                style={{
                    transition: 'all .3s',
                    animation: `${rs && 'restart 0.5s linear'}`
                }}
            ></i>
        </StyleToolKits>
    )
}

const mapStateToProps = state => {
    return {
        isPlay: state.studyTime.isPlay
    }
}

const mapDispatchToProps = {
    changeTime,
    setPlay,
    restart
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolKits)