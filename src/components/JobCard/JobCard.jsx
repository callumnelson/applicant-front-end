// npm modules
import { useState } from "react"

// css
import styles from './JobCard.module.css'

const JobCard = ({selectedJob, job, setSelectedJob}) => {
  const selected = selectedJob && selectedJob._id === job._id
  
  const handleSelect = () => {
    if(selected) setSelectedJob(null)
    else setSelectedJob(job)
  }

  return (
    <>
      <div
        className={
            `${styles.job} ${selected ? styles.selected : ''}`
          }>
        <span>
          <p
            className={styles.dropdown}
            onClick={handleSelect}
          >
            {selected ? "⬆️": "⬇️"}
          </p>
        </span>
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
      {
        selected &&
        <div className={styles.details}>
          <h1>Look at my details!!</h1>
        </div>
      }
    </>
  )
}
 
export default JobCard