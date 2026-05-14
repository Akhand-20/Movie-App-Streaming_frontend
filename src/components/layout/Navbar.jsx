import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiBookmark, FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'
import { useWatchlist } from '../../context/WatchlistContext'
import styles from './Navbar.module.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { theme, toggleTheme } = useTheme()
  const { watchlist } = useWatchlist()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>

        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>CINEMAX</span>
        </Link>

        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/search" className={styles.navLink}>Movies</Link>
        </div>

        <div className={styles.navActions}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <FiSearch className={styles.searchIcon} />
            <input
              id="search"
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </form>

          <Link to="/watchlist" className={styles.watchlistBtn}>
            <FiBookmark size={20} />
            {watchlist.length > 0 && (
              <span className={styles.badge}>{watchlist.length}</span>
            )}
          </Link>

          <button onClick={toggleTheme} className={styles.themeBtn}>
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar