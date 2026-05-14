import { useRef } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import MovieCard from './MovieCard'
import SkeletonCard from '../ui/SkeletonCard'
import styles from './HorizontalScrollRow.module.css'

const HorizontalScrollRow = ({ title, movies, loading }) => {
  const rowRef = useRef(null)

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = 500
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className={styles.rowContainer}>
      <h2 className={styles.rowTitle}>{title}</h2>
      <div className={styles.rowWrapper}>
        <button
          className={`${styles.scrollBtn} ${styles.scrollLeft}`}
          onClick={() => scroll('left')}
        >
          <FiChevronLeft size={24} />
        </button>

        <div className={styles.row} ref={rowRef}>
          {loading
            ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : movies?.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))
          }
        </div>

        <button
          className={`${styles.scrollBtn} ${styles.scrollRight}`}
          onClick={() => scroll('right')}
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

export default HorizontalScrollRow