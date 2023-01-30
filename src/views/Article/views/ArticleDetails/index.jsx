import React, { useEffect, createRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { findArticle } from "@/api/article"
import styled from 'styled-components'
import { Avatar, Button, Empty, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { modify } from "@/store/modules/article"
import { connect } from 'react-redux'
import moment from 'moment'

import { updateArticle } from "@/api/article"
import { findIsLike, likeArticle } from "@/api/user_article"
import { useState } from 'react'
import _ from 'lodash'

const Details = styled.div`
    width: 650px;
    box-shadow: 0 0 2px 1px #ccc;
    > .username {
        display: flex;
        align-items: center;
        padding: 0 10px;
        height: 60px;
        border-bottom: 1px solid #ccc;
        .uname {
            margin-left: 10px;
        }
    }
    > .content {
        min-height: 490px;
        border-bottom: 1px solid #ccc;
        padding: 20px;
        .content {
            margin-top: 10px;
            max-height: 600px;
            overflow: auto;
        }
        .title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .comments {
        .writeSomething {
            position: relative;
            height: 50px;
            border-bottom: 1px solid #ccc;
            input {
                width: 300px;
                height: 65%;
                border-radius: 30px;
                padding-left: 10px;
                font-size: 16px;
                border: 2px solid #ccc;
                margin-right: 15px;
                transition: width .3s,  color .3s;
                &:focus {
                    width: 370px;
                    border-color: #0094f;
                }
            }
            i {
                cursor: pointer;
                position: absolute;
                right: 20px;
                top: 50%;
                width: 30px;
                height: 30px;
                border-radius: 15px;
                box-shadow: 0 0 1px 1px #ccc;
                transform: translateY(-50%);
                font-size: 18px;
                transition: all .3s;
                &:hover {
                    color: #fff;
                    background-color: #0094ff;
                }
                &:active {
                    transform: translateY(-50%) scale(0.9);
                }
            }
        }
        .commentsContent {
            padding: 15px;
            .comments {
                padding: 15px;
                .item {
                    padding: 5px;
                    min-height: 130px;
                    max-height: 200px;
                    border-bottom: 1px solid #ccc;
                    :last-child {
                        border: 0;
                    }
                    .writer {
                        height: 45px;
                        display: flex;
                        align-items: center;
                        .username {
                            margin-left: 10px;
                        }
                    }
                    .content {
                        min-height: 60px;
                    }
                    .wtime {
                        font-size: 12px;
                        opacity: 0.8;
                    }
                }
            }
        }
    }
`

function ArticleDetail({ article, modify, user }) {
    const comment = createRef()
    const navigateTo = useNavigate()
    const location = useLocation()
    const [isLike, setIsLike] = useState(false)
    // 初始化展示
    useEffect(() => {
        if (!location.state?.article_id || !location.state?.type) {
            navigateTo("/404NF")
            return
        }
        async function fetchData() {
            const data = await findArticle({
                article_type: location.state.type,
                article_id: location.state.article_id
            })
            modify(data.article)
        }
        fetchData()
    }, [location])
    // 用户是否点赞
    useEffect(() => {
        async function fetchData() {
            const { status, like } = await findIsLike({
                id: user.id,
                article_id: article.article_id
            })
            if (status === 200) {
                setIsLike(like)
            }
        }
        user.id && article.article_id && fetchData()
    }, [user, article])
    const issue = async e => {
        if ((e.type === "keyup" && e.keyCode === 13) || e.type === "click") {
            const value = comment.current.value
            if (!value) {
                message.info("评论不能为空", 3)
                return
            }
            // 实时更新
            const oriComments = JSON.parse(article.comments)
            const curComment = {
                wtime: moment().format("YYYY-MM-DD hh:mm:ss"),
                writer: user.username,
                content: value
            }
            const newValue = JSON.stringify([...oriComments, curComment])
            modify({
                comments: newValue
            })
            comment.current.value = ""
            // 更新数据库
            const { status } = await updateArticle({
                article_type: location.state.type,
                article_id: location.state.article_id,
                prop: "comments",
                value: newValue
            })
            if (status === 200) {
                message.success("发表成功", 3)
            } else {
                message.error("发表失败", 3)
            }
        }
    }
    const like = _.throttle(async () => {
        const { status } = await likeArticle({
            id: user.id,
            article_id: article.article_id,
            article_type: location.state?.type,
            isLike: !isLike
        })
        if(status === 200) {
            message.success(isLike ? "取消点赞成功" : "点赞成功", 2)
            setIsLike(!isLike)
        } else {
            message.error(isLike ? "取消点赞失败" : "点赞失败", 2)
        }
    }, 1000)
    return (
        <div
            className='flex_center'
            style={{
                padding: 20
            }}
        >
            <Details>
                <div className="username">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <span className='uname'>{article.uname}</span>
                </div>
                <div className="content">
                    <h2 className="title">{article.title}</h2>
                    <div className="content" dangerouslySetInnerHTML={{ __html: article.content }}></div>
                </div>
                <div className="comments">
                    <div className="writeSomething flex_center">
                        <input type="text" ref={comment} placeholder='发表一下你的观点吧！' onKeyUp={issue} />
                        <Button
                            type="primary"
                            onClick={issue}
                        >发表</Button>
                        <i
                            className="iconfont icon-dianzan flex_center"
                            style={{
                                backgroundColor: !isLike || "#0094ff",
                                color: !isLike || "#fff"
                            }}
                            onClick={like}
                        ></i>
                    </div>
                    <div className="commentsContent">
                        {
                            JSON.parse(article.comments).length
                                ? <div className='comments'>
                                    {
                                        JSON.parse(article.comments).map(c => {
                                            return (
                                                <div className="item" key={c.wtime}>
                                                    <div className="writer">
                                                        <Avatar size="default" icon={<UserOutlined />} />
                                                        <span className='username'>{c.writer}</span>
                                                    </div>
                                                    <div className="content">{c.content}</div>
                                                    <div className="wtime">{c.wtime}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                : <Empty description="暂无评论，快来抢占沙发吧！" />
                        }
                    </div>
                </div>
            </Details>
        </div>
    )
}

const mapStateToProps = ({ article: { article }, user: { user } }) => {
    return {
        article,
        user
    }
}

const mapDispatchToProps = {
    modify
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail)
