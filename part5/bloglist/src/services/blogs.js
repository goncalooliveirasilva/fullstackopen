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
    // console.log('token:', token)
    const response = await axios.post(baseUrl, newBlog, {
        headers: {
            Authorization: token
        }
    })
    // console.log(response.data)
    return response.data
}

const update = async (updtatedBlog) => {
    const response = await axios.put(`${baseUrl}/${updtatedBlog.id}`, updtatedBlog, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}

const remove = async (blogId) => {
    const response = await axios.delete(`${baseUrl}/${blogId}`, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}

export default { getAll, add, setToken, update, remove }