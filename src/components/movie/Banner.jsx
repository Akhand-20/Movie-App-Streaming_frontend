import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlay, FiPlus, FiCheck } from 'react-icons/fi'
import { useWatchlist } from '../../context/WatchlistContext'
import styles from './Banner.module.css'

const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE

const Banner = ({ movie }) => {
  const navigate = useNavigate()
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()
  const [inWatchlist, setInWatchlist] = useState(false)

  useEffect(() => {
    if (movie) setInWatchlist(isInWatchlist(movie.id))
  }, [movie, isInWatchlist])

  if (!movie) return <div className={styles.bannerSkeleton} />

  const backdropUrl = `${IMAGE_BASE}/original${movie.backdrop_path}`
  const overview = movie.overview?.length > 200
    ? movie.overview.slice(0, 200) + '...'
    : movie.overview

  const handlePlay = () => navigate(`/watch/${movie.id}`)

  const handleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id)
      setInWatchlist(false)
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview,
      })
      setInWatchlist(true)
    }
  }

  return (
    <div className={styles.banner}>
      <div className={styles.backdropWrapper}>
        <img
          src={backdropUrl}
          alt={movie.title}
          className={styles.backdrop}
        />
        <div className={styles.gradientOverlay} />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{movie.title}</h1>
        <div className={styles.meta}>
          <span className={styles.rating}>⭐ {movie.vote_average?.toFixed(1)}</span>
          <span className={styles.year}>{movie.release_date?.slice(0, 4)}</span>
        </div>
        <p className={styles.overview}>{overview}</p>

        <div className={styles.actions}>
          <button onClick={handlePlay} className={styles.playBtn}>
            <FiPlay size={18} fill="white" />
            Play
          </button>
          <button onClick={handleWatchlist} className={styles.watchlistBtn}>
            {inWatchlist ? <FiCheck size={18} /> : <FiPlus size={18} />}
            {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner