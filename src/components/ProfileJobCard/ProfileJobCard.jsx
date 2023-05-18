//npm modules
import { Link } from 'react-router-dom'

//components
import Icon from '../Icon/Icon'

//css
import styles from './ProfileJobCard.module.css'


const ProfileJobCard = ({job}) => {
  const currOpts = { style: 'currency', currency: 'USD', notation: 'compact'}
  const currFormat = new Intl.NumberFormat('en-US', currOpts)
  const priority = job.priority.toLowerCase().replaceAll(' ','-')
  const listing = job.jobListing

  return (
    <div>
      <div className={`${styles.job}`}>
        <span>
        </span>
        <div className={styles.date}>
          <p>{new Date(job.createdAt).toLocaleDateString()}</p>
        </div>
        <div className={styles.title}>
          <p><Link to={`/jobs`} state={job}>{job.title}</Link></p>
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
          <p className={styles[priority]}>{job.priority}</p>
        </div>
        <div className={styles.jobListing}>
          <p><a href={listing} target="blank"><Icon category="Link" /></a></p>
        </div>
      </div>
    </div>
  )
}

export default ProfileJobCard;