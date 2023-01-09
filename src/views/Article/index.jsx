import React, { createRef, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import style from './article.module.scss'

import TopMenu from './components/TopMenu'
import ToolKits from './components/ToolKits'

export default function Article() {
  return (
    <div className={style.article}>
      <TopMenu />
      <div className={`${style.views} views`}>
        <Outlet></Outlet>
      </div>
      <ToolKits />
    </div>
  )
}