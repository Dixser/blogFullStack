import axios from 'axios'
const baseUrl = '/api/blogs'

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

let token = null

const setToken = (newToken) => {
  return (token = `Bearer ${newToken}`)
}

export const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export const update = async (newObject) => {
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return request.then((response) => response.data)
}

export const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, remove, setToken }
