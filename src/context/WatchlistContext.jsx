import { createContext, useContext, useState, useEffect } from 'react'

const WatchlistContext = createContext()

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('watchlist')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  const addToWatchlist = (movie) => {
    setWatchlist(prev => {
      if (prev.some(m => m.id === movie.id)) return prev
      return [...prev, movie]
    })
  }

  const removeFromWatchlist = (movieId) => {
    setWatchlist(prev => prev.filter(m => m.id !== movieId))
  }

  const isInWatchlist = (movieId) => {
    return watchlist.some(m => m.id === movieId)
  }

  const clearWatchlist = () => setWatchlist([])

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
      clearWatchlist
    }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export const useWatchlist = () => {
  const context = useContext(WatchlistContext)
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider')
  }
  return context
}

export default WatchlistContext