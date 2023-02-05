import request from '@/utils/request'

// 查找文章
export const findArticle = async ({ limit, article_type, article_id }) => {
    const { data } = await request({
        url: '/article/find',
        method: 'GET',
        params: {
            limit,
            article_type,
            article_id
        }
    })
    return data
}

// 更新文章
export const updateArticle = async ({ article_type="recommend", article_id, prop, value }) => {
    const { data } = await request({
        url: "/article/update",
        method: "PUT",
        data: {
            article_type, 
            article_id, 
            prop, 
            value
        }
    })
    return data
}