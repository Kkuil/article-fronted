import React from 'react'

import { findLikeArticles } from '@/api/user_article'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'
import { Empty } from 'antd'
import styled from 'styled-components'

const StyleLike = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .item {
        width: 200px;
        height: 300px;
        border-radius: 10px;
        border: 2px solid #0094ff;
        box-shadow: 0 0 1px 1px #ccc;
        transition: .3s;
        margin: 10px 8px;
        &:hover {
            transform: translateY(-5px);
        }
    }
`

const iterator = (like) => {
    if (like.length) {
        return like.map(item => {
            return (
                <div className="item" key={item.article_id}>
                    <div className="item-id">文章编号：{ item.article_id }</div>
                    <div className="item-uname">发布者：{ item.uname }</div>
                    <div className="item-publish_time">发布时间：{ item.publish_time }</div>
                    <div className="item-title">标题：{ item.title }</div>
                    <div className="item-content">发布内容：{ item.content }</div>
                    <div className="item-views">访问数：{ item.views }</div>
                    <div className="item-like">喜欢数：{ item.like }</div>
                    <div className="item-comments">评论数：{ item.comments }</div>
                </div>
            )
        })
    } else {
        return (
            <div className="empty flex_center">
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    
                />
            </div>
        )
    }
}

function Like({ user }) {
    const [like, setLike] = useState([])
    useEffect(() => {
        async function fetchData() {
            const { status, data } = await findLikeArticles({ id: user.id })
            if (status === 200) {
                setLike(data)
            }
        }
        fetchData()
    }, [])
    return (
        <StyleLike>{iterator(like)}</StyleLike>
    )
}

const mapStateToProps = ({ user: { user } }) => {
    return {
        user
    }
}

export default connect(mapStateToProps)(Like)
