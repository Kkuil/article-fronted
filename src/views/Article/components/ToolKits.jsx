import React, { useState, useEffect } from 'react'
import style from '../article.module.scss'
import styled from 'styled-components'
import Pubsub from 'pubsub-js'
import _ from 'lodash'

const StyleKits = styled.div`
    display: none;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    transition: all .3s;
    i {
        cursor: pointer;
        width: 40px;
        height: 40px;
        margin: 5px 0;
        border-radius: 20px;
        background-color: #fff;
        box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);
        transition: all .3s;
        &:hover {
            opacity: 0.5;
        }
    }
    .icon-31huidaodingbu {
        position: relative;
        a {
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    @keyframes show {
        from {
            transform: translateY(0);
            opacity: 0;
        }
        to {
            transform: translateY(-100%);
            opacity: 1;
        }
    }

    @keyframes hide {
        from {
            transform: translateY(-100%);
            opacity: 1;
        }
        to {
            transform: translateY(0);
            opacity: 0;
        }
    }
`
var sid1 = null
var sid2 = null
export default function ToolKits() {
    let [isShowKits, setIsShowKits] = useState(0)
    let [isShowRTop, setIsShowRTop] = useState(false)
    useEffect(() => {
        sid1 = Pubsub.subscribe('showRTop', (_, bool) => {
            setIsShowRTop(bool)
        })
        sid2 = Pubsub.subscribe('hideKits', _ => {
            setIsShowKits(2)
        })
        return () => {
            Pubsub.unsubscribe(sid1)
            Pubsub.unsubscribe(sid2)
        }
    }, [sid1, sid2])
    return (
        <div className={style.tool_kits}>
            <div className={`${style.arrow} flex_center`} onClick={() => setIsShowKits([0, 2].includes(isShowKits) ? 1 : 2)}>
                <i
                    className='iconfont icon-arrow-up-filling'
                    style={{
                        transform: `${![0, 2].includes(isShowKits) ? 'rotate(180deg)' : 'rotate(0deg)'}`
                    }}></i>
            </div>
            <StyleKits
                className="kits"
                style={{
                    display: `${[1, 2].includes(isShowKits) ? 'block' : ''}`,
                    animation: `
                    ${isShowKits === 1
                            ? 'show 0.6s forwards'
                            : isShowKits === 2
                                ? 'hide 0.6s forwards'
                                : ''
                        }
                    `
                }}
            >
                <i className="flex_center iconfont icon-qrcode" onClick={() => setIsShowKits(2)}></i>
                <i className="flex_center iconfont icon-kefu" onClick={() => setIsShowKits(2)}></i>
                {
                    isShowRTop
                    &&
                    <i className="flex_center iconfont icon-31huidaodingbu" onClick={() => setIsShowKits(2)}>
                        <a href="#" onClick={() => {
                            Pubsub.publish('recover')
                            setIsShowRTop(false)
                        }}></a>
                    </i>
                }
            </StyleKits>
        </div>
    )
}