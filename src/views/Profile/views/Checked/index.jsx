import React, { useEffect, useState } from 'react'
import { GetCheckedArticles } from "@/api/check_article"
import { connect } from 'react-redux'
import { CaretRightOutlined } from '@ant-design/icons'
import { Collapse, Empty, theme } from 'antd'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const StyleArticle = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    border-radius: 10px;
    transition: all .3s;
    padding: 0 5px;
    &:hover {
        background-color: rgba(204, 204, 204, 0.6);
    }
`

const { Panel } = Collapse
function Checked({ user }) {
    const navigateTo = useNavigate()
    const { token } = theme.useToken()
    const panelStyle = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    }
    const [articles, setArticles] = useState({
        recommend: [],
        newest: [],
        hottest: []
    })
    useEffect(() => {
        async function fetchData() {
            const { data } = await GetCheckedArticles({ username: user.username })
            setArticles({
                ...data
            })
        }
        // 推入异步处理
        setTimeout(() => {
            fetchData()
        }, 500)
    }, [])
    return (
        <div
            style={{
                padding: "10px"
            }}
        >
            {
                articles.recommend.length || articles.newest.length || articles.hottest.length
                    ? <Collapse
                        bordered={false}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        style={{
                            background: token.colorBgContainer,
                        }}
                    >
                        {
                            articles.newest.length
                            &&
                            <Panel header="最新发布" key="1" style={panelStyle}>
                                {
                                    articles.newest.map(item => (
                                        <StyleArticle 
                                        onClick={() => {
                                            navigateTo("/article/details", {
                                                state: {
                                                    type: "recommend",
                                                    article_id: item.article_id
                                                }
                                            })
                                        }}
                                        key={item.article_id}
                                        >
                                            <span>{item.content}</span>
                                            <span>{item.publish_time}</span>
                                        </StyleArticle>
                                    ))
                                }
                            </Panel>
                        }
                        {
                            articles.recommend.length
                            &&
                            <Panel header="已上推荐" key="2" style={panelStyle}>
                                {
                                    articles.recommend.map(item => (
                                        <StyleArticle 
                                        onClick={() => {
                                            navigateTo("/article/details", {
                                                state: {
                                                    type: "recommend",
                                                    article_id: item.article_id
                                                }
                                            })
                                        }}
                                        key={item.article_id}
                                        >
                                            <span>{item.content}</span>
                                            <span>{item.publish_time}</span>
                                        </StyleArticle>
                                    ))
                                }
                            </Panel>
                        }
                        {
                            articles.hottest.length
                            &&
                            <Panel header="已上热门" key="3" style={panelStyle}>
                                {
                                    articles.hottest.map(item => (
                                        <StyleArticle 
                                        onClick={() => {
                                            navigateTo("/article/details", {
                                                state: {
                                                    type: "recommend",
                                                    article_id: item.article_id
                                                }
                                            })
                                        }}
                                        key={item.article_id}
                                        >
                                            <span>{item.content}</span>
                                            <span>{item.publish_time}</span>
                                        </StyleArticle>
                                    ))
                                }
                            </Panel>
                        }
                    </Collapse>
                    : <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
            }
        </div>
    )
}

const mapStateToProps = ({ user: { user } }) => {
    return {
        user
    }
}

export default connect(mapStateToProps)(Checked)
