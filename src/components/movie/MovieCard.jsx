import { useNavigate } from 'react-router-dom'
import { FiPlay, FiBookmark, FiBookmark as FiBookmarkFilled } from 'react-icons/fi'
import { useWatchlist } from '../../context/WatchlistContext'
import styles from './MovieCard.module.css'

const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()

  const inWatchlist = isInWatchlist(movie.id)
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE}/w300${movie.poster_path}`
    : '/no-poster.png'

  const handlePlay = (e) => {
    e.stopPropagation()
    navigate(`/watch/${movie.id}`)
  }

  const handleWatchlist = (e) => {
    e.stopPropagation()
    if (inWatchlist) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview,
      })
    }
  }

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.posterWrapper}>
        <img
          src={posterUrl}
          alt={movie.title}
          className={styles.poster}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <button onClick={handlePlay} className={styles.playBtn}>
            <FiPlay size={20} fill="white" />
          </button>
          <button
            onClick={handleWatchlist}
            className={`${styles.bookmarkBtn} ${inWatchlist ? styles.bookmarked : ''}`}
          >
            <FiBookmark size={16} />
          </button>
        </div>
        {movie.vote_average > 0 && (
          <div className={styles.rating}>
            {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.year}>
          {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}
        </p>
      </div>
    </div>
  )
}

export default MovieCard