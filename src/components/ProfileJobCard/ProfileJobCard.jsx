import styles from './ProfileJobCard.module.css'

const ProfileJobCard = ({job}) => {
  const currOpts = { style: 'currency', currency: 'USD', notation: 'compact'}
  const currFormat = new Intl.NumberFormat('en-US', currOpts)


  return (
    <div>
      <div className={`${styles.job}`}>
        <span>
        </span>
        <div className={styles.title}>
          <p>{new Date(job.createdAt).toLocaleDateString()}</p>
        </div>
        <div className={styles.title}>
          <p>{job.title}</p>
        </div>
        <div className={styles.company}>
          <p>{job.company}</p>
        </div>
        <div className={styles.salary}>
          <p>{currFormat.format(job.salary)}</p>
        </div>
        <div className={styles.status}>
          <p>{job.status}</p>
        </div>
        <div className={styles.priority}>
          <p className={styles[job.priority.toLowerCase().replaceAll(' ','-')]}>{job.priority}</p>
        </div>
        <div className={styles.jobListing}>
          <p>{job.jobListing}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileJobCard;