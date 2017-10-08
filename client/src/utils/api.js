
const BASE_URL = 'http://localhost:3001'

const API_KEY = 'my-api-key'

const headers = {
  'Authorization': API_KEY,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

const api = (method, endpoint, data) => {
  const url = `${BASE_URL}/${endpoint}`
  const body = data ? { body: JSON.stringify(data) } : {}
  const options = {
    headers,
    method,
    ...body
  }
  return fetch(url, options)
    .then(res =>  res.json().then(json => {
      if (!res.ok) {
        return Promise.reject(json)
      } else {
        return Promise.resolve(json)
      }
    }))
}

export default api
