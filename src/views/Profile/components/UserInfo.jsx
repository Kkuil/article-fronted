import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Avatar, Tabs } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const StyleUser = styled.div`
    height: calc(100vh - 70px);
    transition: all .3s;
    transform: translateY(-50px);
    opacity: 0;
    padding: 20px 0;
    animation: downGradient 0.5s linear forwards;
    .user_info {
        width: 900px;
        height: 600px;
        background-color: #fff;
        margin: 0 auto;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 2px 1px #ccc;
        .top {
            position: relative;
            height: 200px;
            background: url(https://w.wallhaven.cc/full/5w/wallhaven-5wkjl8.jpg);
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            > div {
                position: absolute;
            }
            .avatar {
                bottom: 30px;
                left: 30px;
                .outline {
                    transform: scale(1.8);
                }
            }
            .username {
                left: 95px;
                bottom: 55px;
                font-size: 25px;
                font-weight: bold;
            }
            .id {
                cursor: pointer;
                width: 150px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                left: 95px;
                bottom: 35px;
                transition: border .3s;
                border: 1px solid transparent;
                padding: 0 2px;
                &:hover {
                    border-color: #000;
                }
            }
            .phone_number {
                left: 95px;
                bottom: 15px;
            }
        }
        .content {
            .tab_bar {
                height: 46px;
                padding: 0 10px;
            }
        }
    }
    @keyframes downGradient {
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`

const items = [
    {
        key: "/profile/index",
        label: (
            <NavLink to="/profile/index">
                <span>首页</span>
            </NavLink>
        )
    },
    {
        key: "/profile/like",
        label: (
            <NavLink to="/profile/like">
                <span>喜欢的作品</span>
            </NavLink>
        )
    },
    {
        key: "/profile/checking",
        label: (
            <NavLink to="/profile/checking">
                <span>待审核作品</span>
            </NavLink>
        )
    },
    {
        key: "/profile/checked",
        label: (
            <NavLink to="/profile/checked">
                <span>已发布作品</span>
            </NavLink>
        )
    },
]

function UserInfo({ user }) {
    return (
        <StyleUser>
            <div className="user_info">
                <div className="top">
                    <div className="avatar">
                        {
                            user.avatar
                                ? <img src={user.avatar} alt="" title={user.username} />
                                : <Avatar className="outline" size="large" icon={<UserOutlined />} title={user.username} />
                        }
                    </div>
                    <div className="username">{user.username}</div>
                    <div className="id">{user.id}</div>
                    <div className="phone_number">{user.phone_number}</div>
                </div>
                <div className="content">
                    <div className="tab_bar">
                        <Tabs
                            defaultActiveKey="2"
                            items={items}
                        />
                    </div>
                    <div className="content">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </StyleUser>
    )
}

const mapStateToProps = ({ user: { user } }) => {
    return {
        user
    }
}

export default connect(mapStateToProps)(UserInfo)
