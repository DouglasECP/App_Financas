import axios from 'axios'

const api = axios.create({
//baseURL:'http://localhost:3333/' //React não permite http apenas https

baseURL:'http://192.168.0.125:3333/' //ipv4=192.168.0.125

})

export default api;