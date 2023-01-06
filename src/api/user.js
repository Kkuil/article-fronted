import request from '@/utils/request'
import crypto from 'crypto-js'

export const find = async ({ username, phone_number }) => {
    if (username) {
        var { data } = await request({
            url: '/user/find',
            method: 'GET',
            params: {
                username,
                phone_number: ''
            }
        })
    } else {
        var { data } = await request({
            url: '/user/find',
            method: 'GET',
            params: {
                username: '',
                phone_number
            }
        })
    }
    return data
}

export const findWithLogin = async ({ username, password }) => {
    const { data } = await request({
        url: '/user/find',
        method: 'POST',
        data: {
            username,
            password: crypto.AES.encrypt(password, 'Kkuil').toString()
        }
    })
    return data
}

export const add = async ({ username, password, phone_number }) => {
    const { data } = await request({
        url: '/user/add',
        method: 'POST',
        data: {
            username,
            password: crypto.AES.encrypt(password, 'Kkuil').toString(),
            phone_number
        }
    })
    return data
}