import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

export const getTrending = async () => {
  const { data } = await api.get('/movies/trending')
  return data.data.results
}

export const getTopRated = async () => {
  const { data } = await api.get('/movies/top-rated')
  return data.data.results
}

export const getByGenre = async (genreId) => {
  const { data } = await api.get(`/movies/genre/${genreId}`)
  return data.data.results
}

export const getMovieDetails = async (id) => {
  const { data } = await api.get(`/movies/${id}`)
  return data.data
}

export const getMovieTrailer = async (id) => {
  const { data } = await api.get(`/movies/${id}/videos`)
  return data.data
}

export const searchMovies = async (query, page = 1) => {
  const { data } = await api.get(`/movies/search`, {
    params: { q: query, page }
  })
  return data.data
}

export const getRecommendations = async (id) => {
  const { data } = await api.get(`/movies/${id}/recommendations`)
  return data.data.results
}

export default api