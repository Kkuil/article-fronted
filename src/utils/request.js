import axios from 'axios'

const request = axios.create({
    baseURL: 'http://127.0.0.1:9827',
    timeout: 5000
})

const CancelToken = axios.CancelToken
const source = CancelToken.source()

const NotVerifyToken = [
    '/user/find',
    '/user/add',
    '/captcha/send',
    '/captcha/verify'
]
request.interceptors.request.use(config => {
    if(!NotVerifyToken.includes(config.url)) {
        const user_token = localStorage.getItem('USER_TOKEN')
        user_token ? config.headers['USER_TOKEN'] = user_token : source.cancel('USER_TOKEN已失效')    
    }
    return config
}, err => {
    Promise.reject(err)
})

request.interceptors.response.use(res => {
    if(res.config.url == '/user/find' && res.config.method == 'post') {
        const { user_token } = res.headers
        localStorage.setItem('USER_TOKEN', user_token)
    }
    return res
}, err => {
    Promise.reject(err)
})

export default request