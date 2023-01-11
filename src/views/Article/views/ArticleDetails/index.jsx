import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ArticleDetail() {
    const { article_id } = useLocation().state
    useEffect(() => {
        console.log(article_id)
    }, [article_id])
    return (
        <div>{ article_id }</div>
    )
}