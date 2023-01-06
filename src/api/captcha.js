import request from '@/utils/request'

export const send = async phone => {
    const { data } = await request({
        url: '/captcha/send',
        method: 'POST',
        data: {
            phone
        }
    })
    return data
}

export const verify = async ({ phone, code }) => {
    const { data } = await request({
        url: '/captcha/verify',
        method: 'POST',
        data: {
            phone,
            code
        }
    })
    return data
}