import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import style from './article.module.scss'
import { message } from 'antd'

import { auth } from '@/api/user'
import TopMenu from './components/TopMenu'
import ToolKits from './components/ToolKits'

var bannedDouble = false
export default function Article() {
  let [user, setUser] = useState({
    username: '未登录',
    avatar: ''
  })
  useEffect(() => {
    if (!bannedDouble) {
      async function Auth() {
        const { status, msg, user } = await auth()
        if (status === 200) {
          setUser(user)
        } else {
          message.error(msg, 3)
        }
      }
      Auth()
      bannedDouble = true
    }
    return () => {
      bannedDouble = false
    }
  }, [])
  return (
    <div className={style.article}>
      <TopMenu user={user} />
      <div className={`${style.views} views`}>
        <Outlet></Outlet>
      </div>
      <ToolKits />
    </div>
  )
}