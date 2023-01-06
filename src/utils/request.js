import axios from 'axios'

const request = axios.create({
    baseURL: 'http://127.0.0.1:9827',
    timeout: 5000
})

request.interceptors.request.use(config => {
    return config
}, err => {
    Promise.reject(err)
})

request.interceptors.response.use(config => {
    return config
}, err => {
    Promise.reject(err)
})

export default request