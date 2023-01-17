import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { upload } from "@/api/check_article"
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

const StyleTopMenu = styled.div`
    height: 50px;
    >button {
        cursor: pointer;
        margin: 0 5px;
        padding: 5px 10px;
        border-radius: 5px;
        border: 0;
        transition: all .3s;
        &:hover {
            transform: scale(1.05);
        }
        &:active {
            transform: scale(0.95);
        }
    }
    .publish {
        background-color: #0094ff;
        color: #fff;
    }
`
var sid = null
function TopMenu({ username }) {
    const navigateTo = useNavigate()
    const [info, setInfo] = useState({
        title: '',
        content: ''
    })
    async function upload_article() {
        PubSub.publish('tmpBridge')
        console.log(info)
        if(!username) {
            message.error("您还未登录，请先登录吧", 3)
            navigateTo("/login")
            return
        } else if(!info.title) {
            message.error("标题不能为空", 3)
            return
        } else if(!info.content) {
            message.error("内容不能为空", 3)
            return
        }
        const { status, msg } = await upload({
            username,
            title: info.title,
            content: info.content
        })
        message[status === 200 ? "success" : "error"](msg, 3)
        navigateTo("/article")
    }
    useEffect(() => {
        sid = PubSub.subscribe('getContent', (_, { title, content }) => {
            setInfo({
                title, 
                content
            })
        })
        return () => {
            PubSub.unsubscribe(sid)
        }
    }, [])
    return (
        <StyleTopMenu className='flex_center'>
            <button className="publish" onClick={upload_article}>发布</button>
            <button className="save">暂存</button>
        </StyleTopMenu>
    )
}

const mapStateToProps = state => {
    return {
        username: state.user.user.username
    }
}

export default connect(mapStateToProps)(TopMenu)
