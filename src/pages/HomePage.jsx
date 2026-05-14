import { useCallback } from 'react'
import Banner from '../components/movie/Banner'
import HorizontalScrollRow from '../components/movie/HorizontalScrollRow'
import useFetch from '../hooks/useFetch'
import {
  getTrending,
  getTopRated,
  getByGenre
} from '../services/tmdb'
import styles from './HomePage.module.css'

const HomePage = () => {
  const fetchTrending = useCallback(() => getTrending(), [])
  const fetchTopRated = useCallback(() => getTopRated(), [])
  const fetchAction = useCallback(() => getByGenre(28), [])
  const fetchComedy = useCallback(() => getByGenre(35), [])
  const fetchHorror = useCallback(() => getByGenre(27), [])

  const { data: trending, loading: trendingLoading } = useFetch(fetchTrending)
  const { data: topRated, loading: topRatedLoading } = useFetch(fetchTopRated)
  const { data: action, loading: actionLoading } = useFetch(fetchAction)
  const { data: comedy, loading: comedyLoading } = useFetch(fetchComedy)
  const { data: horror, loading: horrorLoading } = useFetch(fetchHorror)

  const featuredMovie = trending?.[0] || null

  return (
    <div className={styles.homePage}>
      <Banner movie={featuredMovie} />

      <div className={styles.rows}>
        <HorizontalScrollRow
          title="🔥 Trending This Week"
          movies={trending}
          loading={trendingLoading}
        />
        <HorizontalScrollRow
          title="⭐ Top Rated"
          movies={topRated}
          loading={topRatedLoading}
        />
        <HorizontalScrollRow
          title="💥 Action"
          movies={action}
          loading={actionLoading}
        />
        <HorizontalScrollRow
          title="😂 Comedy"
          movies={comedy}
          loading={comedyLoading}
        />
        <HorizontalScrollRow
          title="👻 Horror"
          movies={horror}
          loading={horrorLoading}
        />
      </div>
    </div>
  )
}

export default HomePage