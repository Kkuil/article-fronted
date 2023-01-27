import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GetCheckingArticles } from "@/api/check_article"
import { connect } from 'react-redux'
import { Empty, message } from 'antd'

const Check = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    > div {
        position: relative;
        cursor: pointer;
        width: 250px;
        height: 150px;
        border-radius: 15px;
        border: 2px solid #ccc;
        margin: 0 18px;
        transition: border .3s;
        padding: 10px;
        > div {
            margin: 5px 0;
        }
        &:hover {
            border-color: #0094ff;
        }
        .title {
            font-size: 20px;
            font-weight: bold;
        }
        .content {
            width: 100%;
            font-size: 14px;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; 
        }
        .upload_time {
            position: absolute;
            bottom: 10px;
            left: 10px;
            margin: 0;
            font-size: 12px;
            opacity: 0.8;
        }
    }
`

function Checking({ user }) {
    const [articles, setArticles] = useState([])
    useEffect(() => {
        async function fetchData() {
            const { status, msg, articles } = await GetCheckingArticles({ username: user.username })
            console.log(articles)
            if (status === 200) {
                setArticles(articles)
                return
            }
            message.error(msg, 3)
        }
        // 推入异步处理
        setTimeout(() => {
            fetchData()
        })
    }, [])
    return (
        <>
            {
                articles.length
                    ? <Check>
                        {
                            articles.map(a => (
                                <div
                                    className="article"
                                    key={a.article_id}
                                >
                                    <div className="title">{a.title}</div>
                                    <div className="content">{a.content}</div>
                                    <div className="upload_time">{a.upload_time}</div>
                                </div>
                            ))
                        }
                    </Check>
                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </>

    )
}

const mapStateToProps = ({ user: { user } }) => {
    return {
        user
    }
}

export default connect(mapStateToProps)(Checking)
