import { useNavigate } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.page}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Page not found</p>
      <button onClick={() => navigate('/')} className={styles.btn}>
        Go Home
      </button>
    </div>
  )
}

export default NotFoundPage