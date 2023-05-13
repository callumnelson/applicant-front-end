// npm modules
import { useState } from "react"

// css
import styles from './JobCard.module.css'

const JobCard = ({selectedJob, job}) => {
  return (
    <div className={styles.job}>
      <div className={styles.title}>
        <p>{job.title}</p>
      </div>
      <div className={styles.company}>
        <p>{job.company}</p>
      </div>
      <div className={styles.listin}>
        <p>{job.listing}</p>
      </div>
      <div className={styles.status}>
        <p>{job.status}</p>
      </div>
      <div className={styles.priority}>
        <p>{job.priority}</p>
      </div>
      <div className={styles.salary}>
        <p>{job.salary}</p>
      </div>
    </div>
  )
}
 
export default JobCard