import { useCallback, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiPlay, FiPlus, FiCheck, FiArrowLeft } from 'react-icons/fi'
import { useWatchlist } from '../context/WatchlistContext'
import useFetch from '../hooks/useFetch'
import { getMovieDetails, getRecommendations } from '../services/tmdb'
import HorizontalScrollRow from '../components/movie/HorizontalScrollRow'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorBanner from '../components/ui/ErrorBanner'
import styles from './MovieDetailPage.module.css'

const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE

const MovieDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()
  const [playLoading, setPlayLoading] = useState(false)

  const fetchDetails = useCallback(() => getMovieDetails(id), [id])
  const fetchRecommendations = useCallback(() => getRecommendations(id), [id])

  const { data: movie, loading, error, refetch } = useFetch(fetchDetails)
  const { data: recommendations, loading: recLoading } = useFetch(fetchRecommendations)

  const inWatchlist = movie ? isInWatchlist(movie.id) : false

  const handlePlay = () => {
    setPlayLoading(true)
    setTimeout(() => {
      navigate(`/watch/${id}`)
    }, 1500)
  }

  const handleWatchlist = () => {
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

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorBanner message={error} onRetry={refetch} />
  if (!movie) return null

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE}/original${movie.backdrop_path}`
    : null

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE}/w500${movie.poster_path}`
    : '/no-poster.png'

  const trailer = movie.videos?.results?.find(
    v => v.type === 'Trailer' && v.site === 'YouTube'
  )

  const cast = movie.credits?.cast?.slice(0, 12) || []

  const hours = Math.floor(movie.runtime / 60)
  const mins = movie.runtime % 60
  const runtime = movie.runtime ? `${hours}h ${mins}m` : ''

  return (
    <div className={styles.detailPage}>

      {/* Backdrop */}
      <div className={styles.backdropSection}>
        {backdropUrl && (
          <>
            <img src={backdropUrl} alt={movie.title} className={styles.backdrop} />
            <div className={styles.backdropGradient} />
          </>
        )}
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <FiArrowLeft size={20} />
          Back
        </button>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.posterWrapper}>
          <img src={posterUrl} alt={movie.title} className={styles.poster} />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{movie.title}</h1>

          <div className={styles.meta}>
            {movie.vote_average > 0 && (
              <span className={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</span>
            )}
            {movie.release_date && (
              <span className={styles.metaItem}>{movie.release_date.slice(0, 4)}</span>
            )}
            {runtime && <span className={styles.metaItem}>{runtime}</span>}
            {movie.adult && <span className={styles.badge18}>18+</span>}
          </div>

          <div className={styles.genres}>
            {movie.genres?.map(g => (
              <span key={g.id} className={styles.genre}>{g.name}</span>
            ))}
          </div>

          <p className={styles.overview}>{movie.overview}</p>

          <div className={styles.actions}>
            <button
              onClick={handlePlay}
              className={styles.playBtn}
              disabled={playLoading}
            >
              {playLoading ? (
                <span className={styles.btnSpinner} />
              ) : (
                <FiPlay size={18} fill="white" />
              )}
              {playLoading ? 'Loading...' : 'Play'}
            </button>

            <button onClick={handleWatchlist} className={styles.watchlistBtn}>
              {inWatchlist ? <FiCheck size={18} /> : <FiPlus size={18} />}
              {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </button>
          </div>

          {movie.credits?.crew && (
            <div className={styles.crew}>
              {movie.credits.crew.find(c => c.job === 'Director') && (
                <p className={styles.crewItem}>
                  <span className={styles.crewLabel}>Director: </span>
                  {movie.credits.crew.find(c => c.job === 'Director').name}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cast */}
      {cast.length > 0 && (
        <div className={styles.castSection}>
          <h2 className={styles.sectionTitle}>Cast</h2>
          <div className={styles.castRow}>
            {cast.map(actor => (
              <div key={actor.id} className={styles.castCard}>
                <img
                  src={actor.profile_path
                    ? `${IMAGE_BASE}/w185${actor.profile_path}`
                    : '/no-avatar.png'
                  }
                  alt={actor.name}
                  className={styles.castPhoto}
                />
                <p className={styles.castName}>{actor.name}</p>
                <p className={styles.castCharacter}>{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trailer */}
      {trailer && (
        <div className={styles.trailerSection}>
          <h2 className={styles.sectionTitle}>Trailer</h2>
          <div className={styles.trailerWrapper}>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              allowFullScreen
              className={styles.trailer}
            />
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className={styles.recommendations}>
        <HorizontalScrollRow
          title="More Like This"
          movies={recommendations}
          loading={recLoading}
        />
      </div>

    </div>
  )
}

export default MovieDetailPage