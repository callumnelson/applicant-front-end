// components
import NotesCategoryButton from '../NotesCategoryButton/NotesCategoryButton'

// css
import styles from './JobCard.module.css'

const JobCard = ({selectedJob, job, setSelectedJob, setEditedJob, handleDeleteJob, notesCategory, setNotesCategory}) => {
  const selected = selectedJob && selectedJob._id === job._id
  const notesCategories = ['Resume', 'Interview Qs', 'Skills', 'To-Do', 'Networking', 'General']
  
  const handleSelectJob = () => {
    if(selected) setSelectedJob(null)
    else setSelectedJob(job)
    setNotesCategory("Resume")
  }

  const handleChangeEditedJob = () => {
    setEditedJob(job)
    setSelectedJob(null)
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
            onClick={handleChangeEditedJob}
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
          {notesCategories.map(category => (
            <NotesCategoryButton 
              key={category}
              notesCategory={notesCategory}
              category={category}
              handleNoteCategoryChange={handleNoteCategoryChange}
            />
          ))}
        </div>
        </>
      }
    </>
  )
}
 
export default JobCard