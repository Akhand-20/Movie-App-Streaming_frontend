import { useNavigate } from 'react-router-dom'
import { FiTrash2, FiPlay } from 'react-icons/fi'
import { useWatchlist } from '../context/WatchlistContext'
import styles from './WatchlistPage.module.css'

const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE

const WatchlistPage = () => {
  const { watchlist, removeFromWatchlist, clearWatchlist } = useWatchlist()
  const navigate = useNavigate()

  if (watchlist.length === 0) {
    return (
      <div className={styles.emptyPage}>
        <p className={styles.emptyIcon}>🎬</p>
        <h2 className={styles.emptyTitle}>Your watchlist is empty</h2>
        <p className={styles.emptyText}>
          Add movies you want to watch by clicking the bookmark icon on any movie.
        </p>
        <button
          onClick={() => navigate('/')}
          className={styles.browseBtn}
        >
          Browse Movies
        </button>
      </div>
    )
  }

  return (
    <div className={styles.watchlistPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>My Watchlist</h1>
          <p className={styles.count}>{watchlist.length} movie{watchlist.length !== 1 ? 's' : ''} saved</p>
        </div>
        <button onClick={clearWatchlist} className={styles.clearBtn}>
          Clear All
        </button>
      </div>

      <div className={styles.grid}>
        {watchlist.map(movie => (
          <div key={movie.id} className={styles.card}>
            <div
              className={styles.posterWrapper}
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img
                src={movie.poster_path
                  ? `${IMAGE_BASE}/w300${movie.poster_path}`
                  : '/no-poster.png'
                }
                alt={movie.title}
                className={styles.poster}
                loading="lazy"
              />
              <div className={styles.overlay}>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/watch/${movie.id}`)
                  }}
                  className={styles.playBtn}
                >
                  <FiPlay size={20} fill="white" />
                </button>
              </div>
              {movie.vote_average > 0 && (
                <div className={styles.rating}>
                  {movie.vote_average.toFixed(1)}
                </div>
              )}
            </div>

            <div className={styles.info}>
              <h3
                className={styles.title}
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                {movie.title}
              </h3>
              <div className={styles.meta}>
                <span className={styles.year}>
                  {movie.release_date?.slice(0, 4) || 'N/A'}
                </span>
                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className={styles.removeBtn}
                  title="Remove from watchlist"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WatchlistPage