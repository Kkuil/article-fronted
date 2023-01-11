import React, { useEffect, useState } from 'react'
import { Empty, Skeleton, message } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { findArticle } from '@/api/article'
import styled from 'styled-components'

const StyleArticleType = styled.div`
    min-height: 600px;
    .articles {
        padding: 10px 20px;
        .item {
            cursor: pointer;
            display: flex;
            padding: 10px 0px;
            border-bottom: 1px solid #ccc;
            :last-child {
                border: 0;
            }
            &:hover {
                background-color: #fafafa;
            }
            .main {
                width: 80%;
                height: 100%;
                .top {
                    span {
                        font-size: 14px;
                        margin: 0 3px;
                        opacity: 0.8;
                    }
                }
                .title {
                    width: 100%;
                    font-size: 20px;
                    margin: 5px 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .content {
                    width: 100%;
                    height: 45px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2; 
                }
                .view_like_comment {
                    margin-top: 10px;
                    > span {
                        margin: 0 8px;
                        > i {
                            font-size: 18px;
                            margin-right: 3px;
                        }
                    }
                }
            }
        }
    },
    .no_articles {
        height: 600px;
    }
`

export default function ArticleType() {
    const navigateTo = useNavigate()
    const { type } = useParams()
    let [articles, setArticles] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    function mapArticles() {
        return articles.map(item => {
            return (
                <div
                    className="item" key={item.article_id}
                    onClick={() => navigateTo(`/article/article_details`, {
                        state: {
                            article_id: item.article_id
                        }
                    })}
                >
                    <main className="main">
                        <div className="top">
                            <span className="uname">{item.uname}</span>
                            <span> | </span>
                            <span className="publish_time">{item.publish_time}</span>
                        </div>
                        <h1 className="title">{item.title}</h1>
                        <div className="content">{item.content}</div>
                        <div className="view_like_comment">
                            <span>
                                <i className="iconfont icon-eye"></i>
                                <span>{item.views}</span>
                            </span>
                            <span>
                                <i className="iconfont icon-dianzan"></i>
                                <span>{item.like}</span>
                            </span>
                            <span>
                                <i className="iconfont icon-comments"></i>
                                <span>{item.comments}</span>
                            </span>
                        </div>
                    </main>
                    <img src="" alt="" className="cover" />
                </div>
            )
        })
    }
    useEffect(() => {
        async function getData() {
            const { articles, err } = await findArticle({ article_type: type })
            setIsLoading(false)
            if(err) {
                message.error(err.name, 3)
                return 
            }
            setArticles(articles)
        }
        getData()
    }, [type])
    return (
        <StyleArticleType className='article_type'>
            {
                isLoading
                    ? (
                        <div className="loading">
                            <Skeleton active loading={isLoading} />
                            <Skeleton active loading={isLoading} />
                            <Skeleton active loading={isLoading} />
                            <Skeleton active loading={isLoading} />
                            <Skeleton active loading={isLoading} />
                        </div>
                    )
                    : articles.length
                        ? <div className="articles">{mapArticles()}</div>
                        : (
                            <div className="no_articles flex_center">
                                <Empty />
                            </div>
                        )
            }
        </StyleArticleType>
    )
}
