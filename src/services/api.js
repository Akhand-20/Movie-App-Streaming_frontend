import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const registerUser = async (name, email, password) => {
  const { data } = await api.post('/auth/register', { name, email, password })
  return data
}

export const loginUser = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}

export const getProfile = async () => {
  const { data } = await api.get('/auth/me')
  return data
}

export const getBackendWatchlist = async () => {
  const { data } = await api.get('/watchlist')
  return data
}

export const addToBackendWatchlist = async (movieData) => {
  const { data } = await api.post('/watchlist', movieData)
  return data
}

export const removeFromBackendWatchlist = async (tmdbId) => {
  const { data } = await api.delete(`/watchlist/${tmdbId}`)
  return data
}

export default api