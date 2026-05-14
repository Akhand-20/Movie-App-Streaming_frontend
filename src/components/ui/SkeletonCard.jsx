import styles from './SkeletonCard.module.css'

const SkeletonCard = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.poster} />
      <div className={styles.titleLine} />
      <div className={styles.yearLine} />
    </div>
  )
}

export default SkeletonCard