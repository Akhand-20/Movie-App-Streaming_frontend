import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { getMovieTrailer, getMovieDetails } from '../services/tmdb'
import useFetch from '../hooks/useFetch'
import styles from './WatchPage.module.css'

const WatchPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showControls, setShowControls] = useState(true)
  const hideTimer = useRef(null)

  const fetchDetails = useCallback(() => getMovieDetails(id), [id])
  const { data: movie } = useFetch(fetchDetails)

  const trailer = movie?.videos?.results?.find(
    v => v.type === 'Trailer' && v.site === 'YouTube'
  )

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    startHideTimer()
    return () => clearTimeout(hideTimer.current)
  }, [])

  const startHideTimer = () => {
    clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }

  const handleMouseMove = () => {
    setShowControls(true)
    startHideTimer()
  }

  return (
    <div
      className={styles.watchPage}
      onMouseMove={handleMouseMove}
    >
      {/* Exit Button */}
      <div className={`${styles.controls} ${showControls ? styles.visible : styles.hidden}`}>
        <button onClick={() => navigate(-1)} className={styles.exitBtn}>
          <FiArrowLeft size={20} />
          <span>Exit</span>
        </button>
        {movie && (
          <span className={styles.movieTitle}>{movie.title}</span>
        )}
      </div>

      {/* Video */}
      <div className={styles.videoWrapper}>
        {trailer ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`}
            title={movie?.title}
            allowFullScreen
            allow="autoplay; fullscreen"
            className={styles.iframe}
          />
        ) : (
          <div className={styles.noTrailer}>
            <p className={styles.noTrailerText}>
              {movie ? `No trailer available for "${movie.title}"` : 'Loading...'}
            </p>
            <button onClick={() => navigate(-1)} className={styles.goBackBtn}>
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WatchPage