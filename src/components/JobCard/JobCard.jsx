// npm modules
import { useState } from "react"

// css
import styles from './JobCard.module.css'

const JobCard = ({selectedJob, job, setSelectedJob, setEditedJob, handleDeleteJob, notesCategory, setNotesCategory}) => {
  const selected = selectedJob && selectedJob._id === job._id
  
  const handleSelectJob = () => {
    if(selected) setSelectedJob(null)
    else setSelectedJob(job)
  }

  const handleNoteCategoryChange = (e) => {
    setNotesCategory(e.target.value)
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
            onClick={handleSelectJob}
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
        <div className={styles.jobListing}>
          <p>{job.jobListing}</p>
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
        <span>
          <p className={styles.edit}
            onClick={() => setEditedJob(job)}
          >
            ✏️
          </p>
        </span>
        <span>
          <p className={styles.delete}
            onClick={() => handleDeleteJob(job)}
          >
            🗑️
          </p>
        </span>
      </div>
      {
        selected &&
        <>
        <div className={styles.details}>
          <div className={styles.resume}>
            <p>{job.resume}</p>
          </div>
          <div className={styles.coverLetter}>
            <p>{job.coverLetter}</p>
          </div>
          <div className={styles.contactName}>
            <p>{job.contactName}</p>
          </div>
          <div className={styles.contactEmail}>
            <p>{job.contactEmail}</p>
          </div>
        </div>
        <div className={styles.notebuttons}>
          <button
            className={notesCategory==="All" ? styles.selectednote : ''}
            onClick={handleNoteCategoryChange}
            value={"All"}
          >
            All
          </button>
          <button
            className={notesCategory==="Resume" ? styles.selectednote : ''}
            onClick={handleNoteCategoryChange}
            value={"Resume"}
          >
            Resume
          </button>
          <button
            className={notesCategory==="Interview Qs" ? styles.selectednote : ''}
            onClick={handleNoteCategoryChange}
            value={"Interview Qs"}
          >
            Interview Qs
          </button>
          <button
            className={notesCategory==="Skills" ? styles.selectednote : ''}
            onClick={handleNoteCategoryChange}
            value={"Skills"}
          >
            Skills
          </button>
          <button
            className={notesCategory==="To-Dos" ? styles.selectednote : ''}
            onClick={handleNoteCategoryChange}
            value={"To-Dos"}
          >
            To-Dos
          </button>
          <button
            className={notesCategory==="Networking" ? styles.selectednote : ''}
            onClick={handleNoteCategoryChange}
            value={"Networking"}
          >
            Networking
          </button>
          <button
            className={notesCategory==="General" ? styles.selectednote : ''}
            onClick={handleNoteCategoryChange}
            value={"General"}
          >
            General
          </button>
        </div>
        </>
      }
    </>
  )
}
 
export default JobCard