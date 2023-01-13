import React, { useState } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import PubSub from 'pubsub-js'

const StyleStudying = styled.div`
    transition: all .3s;
    .title {
        z-index: 2;
        position: relative;
        height: 80px;
        background-color: #0094ff;
        color: #fff;
        font-size: 20px;
        transition: all .3s;
        .studying {
            position: absolute;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            font-weight: bold;
            i {
                display: none;
            }
        }
        .svgIcon {
            position: relative;
            svg {
                position: absolute;
                top: 5px;
                left: -50px;
                width: 42px;
                height: 42px;
            }
        }
        .icon-arrow-down {
            cursor: pointer;
            position: absolute;
            bottom: -20px;
            left: 50%;
            width: 30px;
            height: 30px;
            font-weight: bold;
            font-size: 18px;
            border-radius: 50%;
            background-color: #fff;
            color: #000;
            transform: translateX(-50%) rotate(180deg);
            transition: all .3s;
            &:hover {
                opacity: 0.8;
            }
            &:active {
                transform: translateX(-50%) rotate(180deg) scale(0.9);
            }
        }
    }
    .content {
        .studying {
            height: 100vh;
            background-color: pink;
            transition: all .3s;
        }
    }

    @media screen and (max-width: 800px) {
        .title {
            .studying {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                span {
                    display: none;
                }
                i {
                    display: block;
                }
            }
        }
    }
`

export default function Studying() {
    const [isImmersiveStudying, setIsImmersiveStudying] = useState(false)
    const [isCollapseTitle, setIsCollapseTitle] = useState(false)
    function studying() {
        PubSub.publish('studying', !isImmersiveStudying)
        setIsImmersiveStudying(!isImmersiveStudying)
    }
    return (
        <StyleStudying
            style={{
                transform: isImmersiveStudying ? 'translateY(-60px)' : 'translateY(0)'
            }}
            className='studying'
        >
            <div
                className="title flex_center"
                style={{
                    transform: `${isCollapseTitle ? 'translateY(-80px)' : 'translateY(0)'}`
                }}
            >
                <h1>
                    {
                        isImmersiveStudying
                            ? <span className='svgIcon'>
                                <svg aria-hidden="true">
                                    <use xlinkHref="#icon--studying" />
                                </svg>
                                <span>沉浸式学习中...</span>
                            </span>
                            : <span>欢迎来到Ky-Studying专区</span>
                    }
                </h1>
                <Button
                    className='studying'
                    type='primary'
                    size='large'
                    onClick={studying}
                >
                    <span>{`${isImmersiveStudying ? '结束沉浸式学习' : '开始沉浸式学习'}`}</span>
                    <i className={`iconfont ${isImmersiveStudying ? 'icon-fullscreen-shrink' : 'icon-Magnify'}`}></i>
                </Button>
                {
                    isImmersiveStudying
                    &&
                    <i
                        className="iconfont icon-arrow-down flex_center"
                        onClick={() => {
                            setIsCollapseTitle(!isCollapseTitle)
                        }}
                        style={{
                            transform: `${isCollapseTitle ? 'translateX(-50%) rotate(0)' : 'translateX(-50%) rotate(180deg)'}`
                        }}
                    ></i>
                }
            </div>
            <div className="content">
                {
                    isImmersiveStudying
                        ? <div
                            className="studying"
                            style={{
                                transform: `${isCollapseTitle ? 'translateY(-80px)' : 'translateY(0)'}`,
                                height: `${isCollapseTitle ? '100vh' : 'calc(100vh - 80px)'}`
                            }}
                        >studying</div>
                        : <div className="plugins">plugins</div>
                }
            </div>
        </StyleStudying>
    )
}
