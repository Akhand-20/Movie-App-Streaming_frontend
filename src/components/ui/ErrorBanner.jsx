import styles from './ErrorBanner.module.css'

const ErrorBanner = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className={styles.banner}>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className={styles.retryBtn}>
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorBanner