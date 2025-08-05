import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const add = async (newBlog) => {
    console.log('token:', token)
    const response = await axios.post(baseUrl, newBlog, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}

export default { getAll, add, setToken }