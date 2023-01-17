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
    .box {
        margin-top: 25px;
        height: 25px;
        overflow: hidden;
        .container {
            height: 100%;
            transition: all .3s;
            .beautiful {
                height: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }
    }
`
const Advertisement = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 320px;
    margin: 25px 0;
    box-shadow: 0 0 2px 1px #ccc;
    img {
        width: 100%;
    }
`
const Sentence = styled.div`
    height: 130px;
    padding: 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #f4f4f4;
    box-shadow: 0 0 2px 1px #ccc;
    h5 {
        color: #0094ff;
    }
    .share {
        div {
            width: 100%;
            margin: 5px 0;
            font-size: 13px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
`

var sid = null
var timerId = null
var transId = null
const sentences = [
    '路漫漫其修远兮, 吾将上下而求索',
    '不能站在现在的角度来批判当年的自己多么的无知，因为如果当年的自己有现在的你的高度，也不会做出那样的选择，当然就要顺其自然',
    '每天一遍Hello World, 鼓励正在攀登的自己',
    '别质疑，你真的很棒',
]
function SideBar({ user }) {
    const [isChangeScrollTop, setIsChangeScrollTop] = useState(false)
    const [curTime, setCurTime] = useState(moment().format("HH:mm:ss"))
    const [translateY, setTranslateY] = useState(0)
    const [wlcWrd, setWlcWrd] = useState("上午好")
    // 修改scrollTop
    useEffect(() => {
        sid = Pubsub.subscribe('changeScrollTop', (_, bool) => {
            setIsChangeScrollTop(bool)
        })
        return () => {
            Pubsub.unsubscribe(sid)
        }
    }, [])
    // 计时
    useEffect(() => {
        timerId = setInterval(() => {
            setCurTime(moment().format("HH:mm:ss"))
        }, 1000)
        return () => {
            clearInterval(timerId)
        }
    }, [curTime])
    // 滚动播放
    useEffect(() => {
        transId = setInterval(() => {
            setTranslateY(translateY > -(sentences.length - 1) * 25 ? translateY - 25 : 0)
        }, 5000)
        return () => {
            clearInterval(transId)
        }
    }, [translateY])
    // 修改问候语
    useEffect(() => {
        const cur_hour = new Date().getHours()
        if(cur_hour <= 6) setWlcWrd("凌晨好")
        else if(cur_hour <= 11) setWlcWrd("上午好")
        else if(cur_hour <= 13) setWlcWrd("中午好")
        else if(cur_hour <= 17) setWlcWrd("下午好")
        else if(cur_hour <= 21) setWlcWrd("晚上好")
        else setWlcWrd("夜深了")
    }, [wlcWrd])
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
                <h2 className='title'>
                    <span>{user.username}</span>
                    <span>, { wlcWrd }</span>
                </h2>
                <span className='cur_time'>
                    <span>当前时间：</span>
                    <span>{curTime}</span>
                </span>
                <div className="box">
                    <div
                        className="container"
                        style={{
                            transform: `translateY(${translateY}px)`
                        }}
                    >
                        {
                            sentences.map(s => (
                                <h5 className="beautiful" title={s} key={s}>{s}</h5>
                            ))
                        }
                    </div>
                </div>
            </Welcome>
            <Advertisement>
                <img src="https://w.wallhaven.cc/full/1p/wallhaven-1pk2yv.png" alt="spider-man" />
                <img src="https://w.wallhaven.cc/full/pk/wallhaven-pkmpmm.jpg" alt="spider-man" />
            </Advertisement>
            <Sentence>
                <h5>今日美句分享：</h5>
                <div className='share'>
                    {
                        sentences.map(s => (
                            <div key={s}>{s}</div>
                        ))
                    }
                </div>
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
