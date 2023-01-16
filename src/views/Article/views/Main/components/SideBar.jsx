import React, { useEffect, useState } from 'react'
import style from '../../../article.module.scss'
import Pubsub from 'pubsub-js'
import { connect } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment/moment'

const Welcome = styled.div`
    height: 130px;
    background-color: #fff;
    padding: 20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    box-shadow: 0 0 2px 1px #ccc;
    .cur_time {
        font-size: 13px;
    }
`
const Advertisement = styled.div`
    height: 220px;
    background-color: pink;
    margin: 25px 0;
    box-shadow: 0 0 2px 1px #ccc;
`
const Sentence = styled.div`
    height: 130px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #0094ff;
    box-shadow: 0 0 2px 1px #ccc;
`

var sid = null
var timerId = null
function SideBar({ user }) {
    const [isChangeScrollTop, setIsChangeScrollTop] = useState(false)
    const [curTime, setCurTime] = useState(moment().format("HH:mm:ss"))
    useEffect(() => {
        sid = Pubsub.subscribe('changeScrollTop', (_, bool) => {
            setIsChangeScrollTop(bool)
        })
        return () => {
            Pubsub.unsubscribe(sid)
        }
    }, [])
    useEffect(() => {
        timerId = setInterval(() => {
            setCurTime(moment().format("HH:mm:ss"))
        }, 1000)
        return () => {
            clearInterval(timerId)
        }
    }, [curTime])
    return (
        <div
            style={{
                transform: `
                    ${isChangeScrollTop ? 'translateY(-40px)' : 'translateY(0)'}
                `
            }}
            className={style.side_bar}
        >
            <Welcome>
                <h2>
                    <span>{ user.username }</span>
                    <span>, 晚上好</span>
                </h2>
                <span className='cur_time'>
                    <span>当前时间：</span>
                    <span>{ curTime }</span>
                </span>
            </Welcome>
            <Advertisement>
                advertisement
            </Advertisement>
            <Sentence>
                Sentence
            </Sentence>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(SideBar)
