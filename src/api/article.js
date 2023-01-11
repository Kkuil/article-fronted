import request from '@/utils/request'

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