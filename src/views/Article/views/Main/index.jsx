import React from 'react'

import style from '../../article.module.scss'
import SideBar from './components/SideBar'
import Articles from './components/Articles'

export default function Main() {
    return (
        <div className={style.main}>
            <Articles />
            <SideBar />
        </div>
    )
}
