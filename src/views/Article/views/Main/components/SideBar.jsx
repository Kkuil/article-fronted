import React, { useEffect, useState } from 'react'
import style from '../../../article.module.scss'
import Pubsub from 'pubsub-js'

var sid = null
export default function SideBar() {
    const [isChangeScrollTop, setIsChangeScrollTop] = useState(false)
    useEffect(() => {
        sid = Pubsub.subscribe('changeScrollTop', (_, bool) => {
            setIsChangeScrollTop(bool)
        })
        return () => {
            Pubsub.unsubscribe(sid)
        }
    }, [])
    return (
        <div
            style={{
                transform: `
                    ${isChangeScrollTop ? 'translateY(-40px)' : 'translateY(0)'}
                `
            }}
            className={style.side_bar}
        >SideBar</div>
    )
}
