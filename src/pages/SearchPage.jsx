import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { searchMovies } from '../services/tmdb'
import MovieCard from '../components/movie/MovieCard'
import SkeletonCard from '../components/ui/SkeletonCard'
import ErrorBanner from '../components/ui/ErrorBanner'
import useDebounce from '../hooks/useDebounce'
import styles from './SearchPage.module.css'

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalResults, setTotalResults] = useState(0)

  const debouncedQuery = useDebounce(query, 400)

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setSearchParams({ q: debouncedQuery.trim() })
      fetchResults(debouncedQuery.trim())
    } else {
      setResults([])
      setTotalResults(0)
      setSearchParams({})
    }
  }, [debouncedQuery])

  const fetchResults = async (q) => {
    try {
      setLoading(true)
      setError(null)
      const data = await searchMovies(q)
      setResults(data.results || [])
      setTotalResults(data.total_results || 0)
    } catch (err) {
      setError('Search failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setTotalResults(0)
    setSearchParams({})
  }

  return (
    <div className={styles.searchPage}>

      {/* Search Header */}
      <div className={styles.searchHeader}>
        <h1 className={styles.heading}>Search Movies</h1>
        <div className={styles.searchBar}>
          <FiSearch className={styles.searchIcon} size={20} />
          <input
            id="search-input"
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={handleInputChange}
            className={styles.searchInput}
            autoFocus
          />
          {query && (
            <button onClick={handleClear} className={styles.clearBtn}>✕</button>
          )}
        </div>
      </div>

      {/* Results count */}
      {!loading && debouncedQuery && results.length > 0 && (
        <p className={styles.resultsCount}>
          Found <span>{totalResults.toLocaleString()}</span> results for "{debouncedQuery}"
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div className={styles.grid}>
          {Array(12).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* Error */}
      {error && <ErrorBanner message={error} onRetry={() => fetchResults(debouncedQuery)} />}

      {/* Results */}
      {!loading && !error && results.length > 0 && (
        <div className={styles.grid}>
          {results.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {/* No results */}
      {!loading && !error && debouncedQuery && results.length === 0 && (
        <div className={styles.emptyState}>
          <p className={styles.emptyIcon}>🎬</p>
          <h2 className={styles.emptyTitle}>No results found</h2>
          <p className={styles.emptyText}>
            We couldn't find any movies for "{debouncedQuery}". Try a different search.
          </p>
        </div>
      )}

      {/* Initial state */}
      {!debouncedQuery && !loading && (
        <div className={styles.emptyState}>
          <p className={styles.emptyIcon}>🔍</p>
          <h2 className={styles.emptyTitle}>Find your next movie</h2>
          <p className={styles.emptyText}>
            Search for any movie by title, actor, or genre.
          </p>
        </div>
      )}

    </div>
  )
}

export default SearchPage