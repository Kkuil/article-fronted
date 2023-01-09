import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function ArticleType() {
    const { type } = useParams()
    useEffect(() => {
        console.log(type);
    }, [type])
    return (
        <div>{ type }</div>
    )
}
